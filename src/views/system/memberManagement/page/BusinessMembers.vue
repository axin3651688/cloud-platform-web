<template>
  <a-row :gutter="16">
    <a-col :md="6" :sm="24">
      <div style="background-color: #fff">
        <a-input-search style="margin-bottom: 8px" placeholder="搜索" @change="onChange"/>
        <a-tree
          @expand="onExpand"
          @select="onSelect"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          :treeData="treeData">
          <template slot="title" slot-scope="{title}">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </div>
    </a-col>
    <a-col :md="18" :sm="24">
      <div style="background-color: #fff">
        <div>
          <a-tree-select
            style="width: 300px"
            :treeData="deptTreeData"
            :value="curDept"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="选择部门"
            allowClear
            @change="onDeptChange"></a-tree-select>
          <a-button type="primary" @click="addUser">添加成员</a-button>
          <user-modal ref="userModal" @refreshTable="onRefreshTable"></user-modal>
        </div>
        <company-user-table ref="companyUserTable" :company-id="curSelectKey" :dept-id="curDept" @editUser="onEditUser"></company-user-table>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { getAllCompanyTree, getCompanyDeptTree } from '@/api/company'
import CompanyUserTable from './Module/CompanyUserTable'
import UserModal from './Module/UserModal'

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

export default {
  name: 'BusinessMembers',
  components: { CompanyUserTable, UserModal, CompanyUserTable },
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: false,
      dataList: [],
      treeData: [],
      deptTreeData: [],
      curSelectKey: '',
      curDept: undefined
    }
  },
  methods: {
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.dataList.map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, this.treeData)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    onDeptChange (value) {
      this.curDept = value
    },
    generateList (data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.key
        this.dataList.push({ key: key, title: node.text })
        if (node.children) {
          this.generateList(node.children, node.key)
        }
      }
    },
    onSelect (selectedKeys, e) {
      this.curSelectKey = selectedKeys[0]
      this.setCurComDept(this.curSelectKey)
      this.curDept = undefined
    },
    setCurComDept (comId) {
      const _this = this
      getCompanyDeptTree({ comId: comId }).then(function (treeData) {
        _this.deptTreeData = treeData
      })
    },
    addUser () {
      this.$refs.userModal.visible = true
    },
    onEditUser (record) {
      this.$refs.userModal.onEdit(record)
    },
    onRefreshTable () {
      this.$refs.companyUserTable.reload()
    }
  },
  created () {
    const _this = this
    getAllCompanyTree().then(function (treeData) {
      _this.treeData = treeData
      _this.generateList(treeData)
    })
  }
}
</script>

<style scoped>

</style>
