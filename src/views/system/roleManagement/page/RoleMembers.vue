<template>
  <div>
    <a-row :gutter="16">
      <a-col :md="6" :sm="24" class="left">
        <!--左边树-->
        <left-tree :treeData="roleTreeData" :show-menu="true" @select="onRoleSelect" class="leftTree">
          <!--插槽，插入需要的列表-->
          <template slot="menu" slot-scope="item">
            <a-menu-item key="1" @click="onRoleEdit(item.data)"><a-icon type="edit"/>修改</a-menu-item>
            <a-menu-item key="2" @click="onDelete(item.data)"><a-icon type="delete"/>删除</a-menu-item>
          </template>
        </left-tree>
        <div class="btn">
          <a-button type="primary" icon="plus" @click="onAdd" class="btn1">添加角色</a-button>&nbsp;&nbsp;
          <!-- <a-button type="primary" icon="plus" class="btn2">角色分组</a-button> -->
        </div>
      </a-col>
      <!--右边表，封装一下-->
      <a-col :md="18" :sm="24" class="rightTable">
        <div class="rightHeader">
          <big-header :value="title"></big-header>
          <a-button type="primary" icon="usergroup-add" class="btn3">添加成员</a-button>
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
      </a-col>
      <role-modal ref="roleModal"></role-modal>
    </a-row>
  </div>
</template>

<script>
import { deleteRole, getAllRoleTree } from '@/api/role'
import RoleModal from '../page/Module/RoleModal'
import BigHeader from '@/components/system/BigHeader'
import LeftTree from '../../memberManagement/page/Module/LeftTree'
import ACol from 'ant-design-vue/es/grid/Col'
import UserTable from '../../memberManagement/page/Module/UserTable'
import { minxinModal } from '@/utils/mixin.js'
export default {
  name: 'RoleMembers',
  components: { UserTable, ACol, LeftTree, BigHeader, RoleModal },
  data () {
    return {
      roleTreeData: [],
      // 用数字标示
      curRoleId: undefined,
      // title:{
      //   one: "所有者",
      //   two: "系统默认角色,默认具有企业所有功能权限和全部数据可见范围"
      // },
      title: {
        one: '管理员',
        two: '系统默认角色，可在此添加成员为管理员，并设置其功能权限和数据可见范围'
      }

    }
  },
  mixins: [minxinModal],
  methods: {
    onRoleSelect (selectKeys) {
      this.curRoleId = parseInt(selectKeys[0])
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
            } else {
              _this.$message.error('删除失败')
            }
          })
        }
      })
    },
    // 移除成员的操作
    remove () {

    },
    onAdd (e) {
      // 1. 打开添加莫泰框
      this.$refs.roleModal.visible = true
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
.left{
  margin-top: 10px;
}
.leftTree{
  width:390px;
  height:704px;
  background:rgba(255,255,255,1);
  opacity:1;
}
.btn{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-top: 10px;
  padding-left: 160px;
}
.anse{
  color:rgba(177,179,183,1);
  padding-left: 16px;
}
.utable{
  padding-top: 10px;
}
.rightHeader{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.rightTable{
  width:1205px;
  height:704px;
  background:rgba(255,255,255,1);
  opacity:1;
  margin-top: 10px;
}
.btn3{
  margin-left: 500px;
  margin-top: 10px;
}
</style>
