<template>
  <a-row :gutter="16">
    <a-col :md="6" :sm="24">
      <left-tree :treeData="comTreeData" @select="onSelectLeftTree"></left-tree>
    </a-col>
    <a-col :md="18" :sm="24">
      <div style="background-color: #fff">
        <div>
          <tree-select v-if="(!isSingle)" @change="onChangeDept" :value="curSelectDept" :treeData="deptTreeData" :placeholder="'请选择部门'"></tree-select>
          <a-button type="primary" @click="addUser">添加成员</a-button>
          <user-modal ref="userModal" @refreshTable="onRefreshTable"></user-modal>
        </div>
        <company-user-table ref="companyUserTable" :company-id="curSelectCom" :dept-id="curSelectDept" @editUser="onEditUser"></company-user-table>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { getAllCompanyTree, getCompanyDeptTree } from '@/api/company'
import CompanyUserTable from './Module/CompanyUserTable'
import LeftTree from './Module/LeftTree'
import UserModal from './Module/UserModal'
import TreeSelect from './Module/TreeSelect'

export default {
  name: 'BusinessMembers',
  components: { TreeSelect, LeftTree, CompanyUserTable, UserModal, CompanyUserTable },
  data () {
    return {
      comTreeData: [],
      curSelectCom: '',
      deptTreeData: [],
      curSelectDept: undefined,
      isSingle: false,
      singleComId: undefined
    }
  },
  methods: {
    onSelectLeftTree (selectedKeys, e) {
      if (this.isSingle) {
        // 单体公司并且选择的是公司
        if (this.singleComId === selectedKeys[0]) {
          this.curSelectCom = selectedKeys[0]
        } else {
          // 单体公司并且选择的是部门
          this.curSelectCom = this.singleComId
          this.curSelectDept = selectedKeys[0]
        }
      } else {
        // 多公司
        this.curSelectCom = selectedKeys[0]
        this.renderDeptTree(this.curSelectCom)
        this.curSelectDept = undefined
      }
    },
    onChangeDept (value) {
      this.curSelectDept = value
    },
    renderDeptTree (comId) {
      const _this = this
      return getCompanyDeptTree({ comId: comId }).then(function (treeData) {
        _this.deptTreeData = treeData
        return treeData
      })
    },
    // 表格申请莫泰框
    addUser () {
      this.$refs.userModal.visible = true
    },
    // 表格申请莫泰框
    onEditUser (record) {
      this.$refs.userModal.onEdit(record)
    },
    // 莫泰框提交申请表格刷新
    onRefreshTable () {
      this.$refs.companyUserTable.reload()
    },
    // 根据解析后的树数据判断是否是单体公司
    isSingleCom (treeData) {
      if (treeData.length === 1) {
        if (treeData[0].children === undefined) {
          return true
        }
      } else {
        return false
      }
    }
  },
  created () {
    const _this = this
    getAllCompanyTree().then(function (treeData) {
      // 单体
      if (_this.isSingleCom(treeData)) {
        _this.renderDeptTree(treeData[0].id).then(function (deptTreeData) {
          treeData[0].children = deptTreeData
          _this.comTreeData = treeData
          _this.isSingle = true
          _this.singleComId = treeData[0].id
        })
      } else {
        // 多公司
        _this.comTreeData = treeData
      }
    })
  }
}
</script>

<style scoped>

</style>
