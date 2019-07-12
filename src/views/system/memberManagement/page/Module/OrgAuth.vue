<template>
  <a-row :gutter="16">
    <a-col :md="7" :sm="24">
      <left-tree
        ref="comTree"
        :tree-data="comTreeData"
        :checkable="true"
        :checkStrictly="true"
        @select="onSelectCompany"
        :checkedKeys="checkComKeys"
        @check="onComCheck"></left-tree>
    </a-col>
    <a-col :md="7" :sm="24">
      <left-tree
        ref="deptTree"
        :tree-data="deptTreeData"
        :checkable="true"
        :checkStrictly="true"
        :checked-keys="checkDeptKeys"
        @check="onDeptCheck"> </left-tree>
    </a-col>
    <a-col :md="10" :sm="24">
      <a-card title="授权公司">
      </a-card>
      <a-card title="授权部门">
      </a-card>
    </a-col>
    <a-button @click="onSubmit">保存</a-button>
    <a-button @click="onBack">返回</a-button>
  </a-row>
</template>
<script>
import LeftTree from './LeftTree'
import { getAllCompanyTree, getCompanyDeptTree } from '@/api/company'
import { updateUserCompany, findCompanyByUser, findPrimaryCompany } from '@/api/userCompany'
import { updateUserCompanyDept, findUserDept, findPrimaryDept } from '@/api/userDept'
import ACol from 'ant-design-vue/es/grid/Col'
export default {
  name: 'OrgAuth',
  components: { ACol, LeftTree },
  data () {
    return {
      currentSelectUserId: undefined,
      comTreeData: [],
      deptTreeData: [],
      selectCompany: undefined,
      selectDept: undefined,
      checkComKeys: [],
      checkDeptKeys: []
    }
  },
  methods: {
    async onSelectCompany (selectKeys) {
      this.selectCompany = selectKeys[0]
      await this.loadComDepart(this.selectCompany)
      await this.loadDept()
    },
    onComCheck (checkedKeys) {
      this.checkComKeys = checkedKeys.checked
    },
    onDeptCheck (checkedKeys) {
      this.checkDeptKeys = checkedKeys.checked
    },
    loadComDepart (comId) {
      const _this = this
      return getCompanyDeptTree({ comId: comId }).then(async function (treeData) {
        if (treeData !== undefined) {
          const result = await findPrimaryDept({ id: _this.currentSelectUserId })
          if (result && result.data && result.data.deptCode) {
            _this.disablePrimary(treeData, result.data.deptCode)
          }
          _this.deptTreeData = treeData
        } else {
          _this.deptTreeData = []
        }
      })
    },
    async loadCompany () {
      const _this = this
      if (this.currentSelectUserId !== undefined) {
        const res = await findCompanyByUser({ id: this.currentSelectUserId })
        if (res.data && res.data.length > 0) {
          const renderComIds = res.data.map(function (ele) {
            return ele.id
          })
          _this.checkComKeys = renderComIds
        }
      }
    },
    async loadDept () {
      const _this = this
      if (this.currentSelectUserId !== undefined) {
        const res = await findUserDept({ id: this.currentSelectUserId })
        if (res.data && res.data.length >= 0) {
          const renderDeptIds = res.data.map(function (ele) {
            return ele.id
          })
          _this.checkDeptKeys = renderDeptIds
        }
      }
    },
    async onSubmit () {
      // 这里有两种情况
      // 1. 没有选择公司，点保存，只保存公司
      // 2. 选择了公司点保存，先保存公司，再保存部门
      // 3. 公司被选中，但没有勾选，那么提示先勾选公司权限
      const _this = this
      if (_this.currentSelectUserId !== undefined) {
        await updateUserCompany({ userId: _this.currentSelectUserId }, _this.checkComKeys)
        if (_this.selectCompany !== undefined) {
          if (_this.checkComKeys.indexOf(_this.selectCompany) < 0) {
            _this.$message.warn('保存部门权限需要先选中该公司权限')
            return
          }
          await updateUserCompanyDept({ userId: _this.currentSelectUserId, comId: _this.selectCompany }, _this.checkDeptKeys)
        }
      }
    },
    onBack () {
      this.$refs.comTree.clearSelectNodes()
      this.$refs.deptTree.clearSelectNodes()
      this.deptTreeData = []
      this.$emit('back')
    },
    disablePrimary (treeData, disCheckId) {
      const _this = this
      treeData.forEach(function (ele) {
        if (ele.key === disCheckId) {
          ele.disableCheckbox = true
          return
        }
        if (Array.isArray(ele.children)) {
          _this.disablePrimary(ele.children, disCheckId)
        }
      })
    },
    onEditAuth (newVal) {
      this.currentSelectUserId = newVal
      const _this = this
      getAllCompanyTree().then(function (treeData) {
        if (treeData !== undefined) {
          findPrimaryCompany({ id: newVal }).then(function (res) {
            if (res.data && res.data.comId) {
              _this.disablePrimary(treeData, res.data.comId)
            }
            _this.comTreeData = treeData
            _this.loadCompany()
          })
        }
      })
    }

  }
}
</script>

<style scoped>
</style>
