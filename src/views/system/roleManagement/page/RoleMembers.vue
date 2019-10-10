<template>
  <div>
    <a-row :gutter="16">
      <a-col :md="6" :sm="24" class="left-panel">
        <!--左边树-->
        <left-tree :treeData="roleTreeData" :show-menu="true" @select="onRoleSelect" class="left-role-tree">
          <!--插槽，插入需要的列表-->
          <template slot="menu" slot-scope="item">
            <a-menu-item key="1" @click="onRoleEdit(item.data)" v-action:editRole><a-icon type="edit"/>修改</a-menu-item>
            <a-menu-item key="2" @click="onDelete(item.data)" v-action:delRole><a-icon type="delete"/>删除</a-menu-item>
          </template>
        </left-tree>
        <div class="add-role-btn">
          <a-button
            size="small"
            type="primary"
            icon="plus"
            @click="onAdd"
            class="btn1"
            v-action:addRole>添加角色</a-button>&nbsp;&nbsp;
        </div>
      </a-col>
      <!--右边表，封装一下-->
      <a-col :md="18" :sm="24" class="right-table">
        <div style="background-color: #fff">
          <div class="right-header">
            <desc-header :title="title" :desc="desc" class="table-header"></desc-header>
            <a-button
              class="add-role-user-btn"
              size="large"
              type="primary"
              icon="usergroup-add"
              @click="addRoleUser"
              v-action:addRoleUser>添加成员</a-button>
          </div>
          <!-- <span class="anse" v-if="pid=0">+  如需更换企业所有者,请到【企业设置】页面,点击【转让企业】来更换所有者,设置完成后信息目动同步。<a-button type="primary" style="font-size:12px;">跳转至转让企业</a-button></span> -->
          <user-table
            ref="userTable"
            :roleId="curRoleId"
            :show-action="true"
            class="utable">
            <template slot="dropdown" slot-scope="item">
              <a-menu-item>
                <a href="javascript:;" @click="remove(item.record)">移除</a>
              </a-menu-item>
            </template>
          </user-table>
        </div>
      </a-col>
      <role-modal ref="roleModal" @back="renderTree"></role-modal>
      <add-role-user-modal ref="addRoleUserModal" :role-id="curRoleId" @back="renderTable"></add-role-user-modal>
    </a-row>
  </div>
</template>

<script>
import { deleteRole, findAllRole } from '@/api/role'
import { deleteUserRole } from '@/api/userRole'
import RoleModal from '../page/Module/RoleModal'
import DescHeader from '@/components/system/DescHeader'
import LeftTree from '../../memberManagement/page/Module/LeftTree'
import ACol from 'ant-design-vue/es/grid/Col'
import UserTable from '../../memberManagement/page/Module/UserTable'
import { minxinModal } from '@/utils/mixin.js'
import AddRoleUserModal from './Module/AddRoleUserModal'
import { listToTreeNode } from '@/utils/treeUtil'
import StringUtil from '@/utils/commonUtil/StringUtil'

export default {
  name: 'RoleMembers',
  components: { AddRoleUserModal, UserTable, ACol, LeftTree, DescHeader, RoleModal },
  data () {
    return {
      roleTreeData: [],
      roleMapData: {},
      // 用数字标示
      curRoleId: undefined
    }
  },
  computed: {
    title: function () {
      if (this.curRoleId) {
        return this.roleMapData[this.curRoleId].text
      }
      return ' '
    },
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
  mixins: [minxinModal],
  methods: {
    onRoleSelect (selectKeys) {
      if (selectKeys.length === 0) {
        this.curRoleId = undefined
      } else {
        this.curRoleId = parseInt(selectKeys[0])
      }
    },
    onRoleEdit (record) {
      // alert('修改空方法' + JSON.stringify(row))
      // 打开修改莫泰框，确定事件写莫泰框里面
      this.$refs.roleModal.onEdit(record)
    },
    onDelete (record) {
      // onDelete (paramter) {
      const _this = this
      this.confirm({
        title: '确认删除' + record.text + '吗',
        onOk: function () {
          deleteRole({ roleId: record.key }).then(function (res) {
            if (res.code === 200) {
              _this.$message.success('删除成功')
              _this.renderTree()
            } else {
              _this.$message.error('删除失败')
            }
          })
        }
      })
    },
    // 移除成员的操作
    remove (record) {
      const _this = this
      this.confirm({
        title: '确认要移除' + record.trueName + '吗',
        onOk: function () {
          deleteUserRole({ roleId: _this.curRoleId }, [record.id]).then(function (res) {
            if (res.code === 200) {
              _this.$message.success('删除成功')
              _this.$refs.userTable.reload()
            } else {
              _this.$message.error('删除失败')
            }
          })
        }
      })
    },
    onAdd (e) {
      // 1. 打开添加莫泰框
      this.$refs.roleModal.visible = true
      // 2. 重新渲染树
      this.renderTree()
    },
    addRoleUser: function () {
      if (this.curRoleId == undefined) {
        this.$message.warn('请先选择对应的角色')
        return
      }
      this.$refs.addRoleUserModal.showModal()
    },
    renderTree () {
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
    renderTable () {
      this.$refs.userTable.reload()
    },
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
  .left-panel {
    .add-role-btn {
      padding-left: 20%;
      padding-top: 80px;
      background: #fff;
    }
  }
  .right-table {
    .table-header {
      display: inline-block;
    }
    .add-role-user-btn {
      float: right;
      font-size: 14px;
    }
  }

</style>
