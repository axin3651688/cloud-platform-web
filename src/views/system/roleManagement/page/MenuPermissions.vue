<template>
  <div class="wrapper">
    <a-row :gutter="16">
      <a-col :md="6" :sm="24">
        <!--角色树-->
        <left-tree :treeData="roleTreeData" :show-menu="false" @select="onRoleSelect">
        </left-tree>
      </a-col>
      <a-col :md="18" :sm="24">
        <a-row :gutter="8">
          <a-col :md="24" :sm="24">
            <div class="banner"></div>
          </a-col>
          <a-col :md="8" :sm="24">
            <left-tree
              class="menuTree"
              :tree-data="menuTreeData"
              :show-menu="false"
              @select="onMenuSelect"
              :checkable="true"
              :checkStrictly="true"
              :checkedKeys="curRoleMenuIds"
              @check="onMenuCheck"
              :select-keys="menuSelectedKey"></left-tree>
          </a-col>
          <a-col :md="16" :sm="24">
            <!--check组件-->
            <check-box-nodes
              :title="'管理权限'"
              :nodes="nodes"
              :checkedNodes="curRoleMenuActions"
              @check="onActionCheck"></check-box-nodes>
          </a-col>
        </a-row>
      </a-col>
      <a-button type="primary" @click="onSave">确定</a-button>
    </a-row>
  </div>
</template>

<script>
import ARow from 'ant-design-vue/es/grid/Row'
import LeftTree from '../../memberManagement/page/Module/LeftTree'
import { getAllRoleTree } from '@/api/role'
import { getAllMenuTree, getMenuAction } from '@/api/resource'
import { findRoleResource, updateRoleResource } from '@/api/roleResource'
import ACol from 'ant-design-vue/es/grid/Col'
import CheckBoxNodes from './Module/CheckBoxNodes'
import avril from '@/utils/avrcollectionUtil'

export default {
  name: 'MenuPermissions',
  components: { CheckBoxNodes, ACol, LeftTree, ARow },
  data () {
    return {
      roleTreeData: [],
      curRoleId: undefined,
      menuTreeData: [],
      // 当前菜单Id
      curMenuId: undefined,
      // 当前菜单code
      curMenuCode: undefined,
      // 当前角色所拥有的所有资源
      curRoleResources: [],
      // 当前角色所拥有的菜单资源Id
      curRoleMenuIds: [],
      // 当前角色所拥有的当前菜单的操作资源
      curRoleMenuActions: [],
      // 当前菜单所拥有的操作资源
      nodes: [],
      // 当前菜单被选中的key
      menuSelectedKey: []
    }
  },
  methods: {
    onSave: function (e) {
      const _this = this
      // 当前角色所有资源 = 当前角色的菜单资源 + 当前角色的操作资源
      // 当前角色的操作资源 = 当前角色的所有操作资源 - 当前菜单的操作资源 + 当前角色菜单的操作资源
      // 当前角色的所有操作资源
      const curRoleAllActionResourcesIds = this.curRoleResources.filter(function (ele) {
        return ele.type === 3
      }).map(function (ele) {
        return ele.id
      })
      // 当前菜单的操作资源
      const curMenuActionResourceIds = this.nodes.map(function (ele) {
        return ele.id
      })
      // 计算当前角色的操作资源
      const diffArr = avril.getDifferenceArr(curRoleAllActionResourcesIds, curMenuActionResourceIds)
      const curRoleActionResourceIds = avril.getSumArr(diffArr, this.curRoleMenuActions)
      // 再加上当前角色的菜单资源
      const allResources = avril.getSumArr(curRoleActionResourceIds, this.curRoleMenuIds)
      updateRoleResource({ roleId: this.curRoleId }, allResources).then(function (res) {
        if (res.code === 200) {
          _this.$message.success('保存成功')
          _this.reloadRole()
        } else {
          _this.$message.error('保存失败')
        }
      })
    },
    onRoleSelect: async function (selectKeys) {
      this.menuSelectedKey = []
      this.clearRole()
      if (selectKeys.length > 0) {
        this.curRoleId = parseInt(selectKeys[0])
        await this.renderMenu()
        this.renderRoleMenu()
      }
    },
    clearRole: function () {
      this.curRoleId = undefined
      this.menuTreeData = []
      this.curRoleResources = []
      this.curRoleMenuIds = []
      this.clearMenu()
    },
    clearMenu: function () {
      this.curMenuId = undefined
      this.curMenuCode = undefined
      this.nodes = []
      this.curRoleMenuActions = []
    },
    onMenuSelect: async function (selectKeys) {
      this.menuSelectedKey = selectKeys
      this.clearMenu()
      if (selectKeys.length > 0) {
        this.curMenuId = selectKeys[0]
        this.setCurMenuCode(this.menuTreeData)
        await this.renderMenuActions()
        this.renderRoleMenuActions()
      }
    },
    onMenuCheck: function (checkedKeys) {
      this.curRoleMenuIds = checkedKeys.checked
    },
    onActionCheck: function (checkedValues) {
      this.curRoleMenuActions = checkedValues
    },
    async reloadRole () {
      await this.renderRoleMenu()
      this.renderRoleMenuActions()
    },
    setCurMenuCode (menuTreeData) {
      const _this = this
      for (let i = 0; i < menuTreeData.length; i++) {
        const ele = menuTreeData[i]
        // 注意这是key
        if (ele.key === this.curMenuId) {
          _this.curMenuCode = ele.code
          break
        }
        if (Array.isArray(ele.children)) {
          _this.setCurMenuCode(ele.children)
        }
      }
    },
    renderMenuActions () {
      const _this = this

      getMenuAction({ code: this.curMenuCode }).then(function (data) {
        data.forEach(function (ele) {
          ele.key = ele.id
        })
        _this.nodes = data
      })
    },
    renderRoleMenuActions () {
      const _this = this
      _this.curRoleMenuActions = this.curRoleResources.filter(function (ele) {
        return ele.type === 3 && ele.pcode === _this.curMenuCode
      }).map(function (ele) {
        return ele.id
      })
    },
    renderRoleMenu () {
      const _this = this
      return findRoleResource({ roleId: this.curRoleId }).then(function (res) {
        if (res.code === 200) {
          const resources = res.data
          _this.curRoleResources = resources
          _this.curRoleMenuIds = resources.filter(function (ele) {
            return ele.type === 1
          }).map(function (ele) {
            return ele.id
          })
        }
      })
    },
    renderRole () {
      const _this = this
      return getAllRoleTree().then(function (treeData) {
        _this.roleTreeData = treeData
      })
    },
    renderMenu () {
      const _this = this
      return getAllMenuTree().then(function (treeData) {
        _this.menuTreeData = treeData
      })
    },
    renderTree () {
      this.renderRole()
    }
  },
  created () {
    this.renderTree()
  }
}
</script>

<style lang="less" scoped>
  .menuTree {
    /deep/ li[role='treeitem'] {
      .ant-tree-node-content-wrapper {
        width: calc(100% - 44px);
      }
    }
  }
</style>
