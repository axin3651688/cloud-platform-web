<template>
  <div>
    <a-row :gutter="16">
      <a-col :md="6" :sm="24">
        <!--左边树-->
        <left-tree :treeData="roleTreeData" :show-menu="true" @select="onRoleSelect">
          <!--插槽，插入需要的列表-->
          <template slot="menu" slot-scope="item">
            <a-menu-item key="1" @click="onEdit(item.data)"><a-icon type="edit"/>修改</a-menu-item>
            <a-menu-item key="2" @click="onDelete(item.data.key)"><a-icon type="delete"/>删除</a-menu-item>
          </template>
        </left-tree>
        <a-button type="primary" icon="plus" @click="onAdd">添加角色</a-button>
      </a-col>
      <!--右边表，封装一下-->
      <a-col :md="18" :sm="24">
        <user-table ref="userTable" :roleId="curRoleId"></user-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import LeftTree from '../../memberManagement/page/Module/LeftTree'
import ACol from 'ant-design-vue/es/grid/Col'
import { getAllRoleTree } from '@/api/role'
import UserTable from '../../memberManagement/page/Module/UserTable'
export default {
  name: 'RoleMembers',
  components: { UserTable, ACol, LeftTree },
  data () {
    return {
      roleTreeData: [],
      // 用数字标示
      curRoleId: undefined
    }
  },
  methods: {
    onRoleSelect (selectKeys) {
      this.curRoleId = parseInt(selectKeys[0])
    },
    onEdit (row, e) {
      alert('修改空方法' + JSON.stringify(row))
      // 打开修改莫泰框，确定事件写莫泰框里面
    },
    onDelete (key, e) {
      alert('删除空方法' + key)
    },
    onAdd (e) {
      alert('添加空方法')
      // 1. 打开添加莫泰框
      // 2. 重新渲染树
      this.renderTree()
    },
    renderTree () {
      const _this = this
      return getAllRoleTree().then(function (treeData) {
        _this.roleTreeData = treeData
      })
    }
  },
  created () {
    this.renderTree()
  }
}
</script>

<style scoped>

</style>
