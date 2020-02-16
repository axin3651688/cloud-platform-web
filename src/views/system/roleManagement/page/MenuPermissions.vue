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
          <div class="right-panel">
            <desc-header :title="title" :desc="desc" class="table-header"></desc-header>
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
          </div>
        </a-row>
      </a-col>
    </a-row>
    <a-button style="float: right;" type="primary" @click="onSave">授权</a-button>
  </div>
</template>

<script>
import ARow from 'ant-design-vue/es/grid/Row'
import LeftTree from '../../memberManagement/page/Module/LeftTree'
import { findAllRole } from '@/api/role'
import { getAllMenuTree, getMenuAction } from '@/api/resource'
import { findRoleResource, updateRoleResource } from '@/api/roleResource'
// 标题
import DescHeader from '@/components/system/DescHeader'
import ACol from 'ant-design-vue/es/grid/Col'
import CheckBoxNodes from './Module/CheckBoxNodes'
import avril from '@/utils/avrcollectionUtil'
import { listToTreeNode } from '@/utils/treeUtil'
import StringUtil from '@/utils/commonUtil/StringUtil'

export default {
  name: 'MenuPermissions',
  components: { CheckBoxNodes, ACol, LeftTree, ARow, DescHeader },
  data () {
    return {
      // 角色树数据
      roleTreeData: [],
      // 角色Map数据
      roleMapData: {},
      // 当前角色Id
      curRoleId: undefined,
      // 菜单树数据
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
  computed: {
    /**
     * 标题
     * @return {string|*}
     */
    title: function () {
      if (this.curRoleId) {
        return this.roleMapData[this.curRoleId].text
      }
      return ' '
    },
    /**
     * 描述
     * @return {string}
     */
    desc: function () {
      if (this.curRoleId) {
        let desc = this.roleMapData[this.curRoleId].desc
        if (!StringUtil.isNotBlank(desc)) {
          desc = ''
        } else {
          desc += ','
        }
        const title = this.roleMapData[this.curRoleId].text
        return desc + '可在此添加成员为' + title + '，并设置其功能权限和数据可见范围'
      }
      return ' '
    }
  },
  methods: {
    /**
     * 保存事件
     * @param e
     */
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
    /**
     * 角色选择事件
     * @param selectKeys
     * @return {Promise<void>}
     */
    onRoleSelect: async function (selectKeys) {
      this.menuSelectedKey = []
      this.clearRole()
      if (selectKeys.length > 0) {
        this.curRoleId = parseInt(selectKeys[0])
        await this.renderMenu()
        this.renderRoleMenu()
      }
    },
    /**
     * 清除角色
     */
    clearRole: function () {
      this.curRoleId = undefined
      this.menuTreeData = []
      this.curRoleResources = []
      this.curRoleMenuIds = []
      this.clearMenu()
    },
    /**
     * 清除菜单
     */
    clearMenu: function () {
      this.curMenuId = undefined
      this.curMenuCode = undefined
      this.nodes = []
      this.curRoleMenuActions = []
    },
    /**
     * 菜单选择事件
     * @param selectKeys
     * @return {Promise<void>}
     */
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
    /**
     * 菜单check事件
     * @param checkedKeys
     */
    onMenuCheck: function (checkedKeys) {
      this.curRoleMenuIds = checkedKeys.checked
    },
    /**
     * 菜单操作check事件
     * @param checkedValues
     */
    onActionCheck: function (checkedValues) {
      this.curRoleMenuActions = checkedValues
    },
    /**
     * 角色重新加载
     * @return {Promise<void>}
     */
    async reloadRole () {
      await this.renderRoleMenu()
      this.renderRoleMenuActions()
    },
    /**
     * 设置当前菜单编码
     * @param menuTreeData
     */
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
    /**
     * 渲染菜单操作
     */
    renderMenuActions () {
      const _this = this

      getMenuAction({ code: this.curMenuCode }).then(function (data) {
        data.forEach(function (ele) {
          ele.key = ele.id
        })
        _this.nodes = data
      })
    },
    /**
     * 渲染角色菜单操作
     */
    renderRoleMenuActions () {
      const _this = this
      _this.curRoleMenuActions = this.curRoleResources.filter(function (ele) {
        return ele.type === 3 && ele.pcode === _this.curMenuCode
      }).map(function (ele) {
        return ele.id
      })
    },
    /**
     * 渲染角色菜单
     * @return {*}
     */
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
    /**
     * 渲染角色
     * @return {*}
     */
    renderRole () {
      const _this = this
      return findAllRole().then(function (result) {
        if (Array.isArray(result.data)) {
          result.data.forEach(function (ele) {
            ele.pid = 0
            ele.isLeaf = '1'
          })
          _this.transformRoleMapData(result.data)
          _this.roleTreeData = listToTreeNode({ data: result.data, rootPid: 0 })
        } else {
          _this.roleTreeData = []
        }
      })
    },
    /**
     * 渲染菜单
     * @return {*}
     */
    renderMenu () {
      const _this = this
      return getAllMenuTree().then(function (treeData) {
        _this.menuTreeData = treeData
      })
    },
    /**
     * 渲染角色
     */
    renderTree () {
      this.renderRole()
    },
    /**
     * 转换角色为Map
     * @param list
     * @return {{}}
     */
    transformRoleMapData (list) {
      const _this = this
      if (!Array.isArray(list)) {
        return {}
      }
      _this.roleMapData = {}
      list.forEach(function (ele) {
        _this.roleMapData[ele.id] = ele
      })
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
  .right-panel {
    margin-left: 4px;
    margin-right: 4px;
    .table-header {
      background-color: #fff;
      margin-left: 4px;
      /deep/ &>span.title {
        // padding: 0 !important;
        padding-left: 0px;
        margin-left: 4px;
      }
    }
  }

</style>
