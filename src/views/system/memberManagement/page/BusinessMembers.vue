<template>
  <div>
    <a-row :gutter="16">
      <div v-show="!isOnOrgAuth">
        <a-col :md="6" :sm="24">
          <left-tree :treeData="comTreeData" @select="onSelectLeftTree"></left-tree>
        </a-col>
        <a-col :md="18" :sm="24">
          <div style="background-color: #fff">
            <div>
              <tree-select
                v-if="(!isSingle)"
                @change="onChangeDept"
                :value="curSelectDept"
                :treeData="deptTreeData"
                :placeholder="'请选择部门'"></tree-select>
              <a-button type="primary" @click="addUser">添加成员</a-button>
            </div>
            <user-table
              ref="userTable"
              :company-id="curSelectCom"
              :dept-id="curSelectDept"
              :show-action="true"
              @editAuth="onEditAuth"></user-table>
          </div>
        </a-col>
      </div>
    </a-row>
    <org-auth ref="orgAuth" v-show="isOnOrgAuth" @back="onBack"></org-auth>
  </div>
</template>

<script>
import OrgAuth from './Module/OrgAuth'
import { getAllCompanyTree, getCompanyDeptTree } from '@/api/company'
import UserTable from './Module/UserTable'
import LeftTree from './Module/LeftTree'
import TreeSelect from './Module/TreeSelect'

export default {
  name: 'BusinessMembers',
  components: { TreeSelect, LeftTree, UserTable, OrgAuth },
  data () {
    return {
      comTreeData: [],
      curSelectCom: '',
      deptTreeData: [],
      curSelectDept: undefined,
      isSingle: false,
      singleComId: undefined,
      isOnOrgAuth: false
    }
  },
  methods: {
    onSelectLeftTree (selectedKeys, e) {
      if (this.isSingle) {
        // 单体公司并且选择的是公司
        if (this.singleComId === selectedKeys[0]) {
          this.curSelectCom = selectedKeys[0]
          this.curSelectDept = undefined
          // 因为公司不变，子组件监听不到，所以这里再查一下
          this.$refs.userTable.reloadCom(this.curSelectCom)
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
    // 添加用户调表中的方法
    addUser () {
      this.$refs.userTable.onUserAdd()
    },
    onEditAuth (record) {
      // 表格申请编辑权限
      this.isOnOrgAuth = true
      this.$refs.orgAuth.onEditAuth(record.id)
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
    },
    onBack () {
      this.isOnOrgAuth = false
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
