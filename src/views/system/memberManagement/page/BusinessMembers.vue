<template>
  <div class="page_content">
    <a-row :gutter="16">
      <div v-show="!isOnOrgAuth">
        <a-col :md="6" :sm="24" >
          <left-tree :treeData="comTreeData" @select="onSelectLeftTree"></left-tree>
        </a-col>
        <a-col :md="18" :sm="24" class="page_full">
          <div style="background-color: #fff">
            <div>
              <tree-select
                v-if="(!isSingle)"
                @change="onSelectDept"
                :value="curSelectDept"
                :treeData="deptTreeData"
                :placeholder="'请选择部门'">
              </tree-select>
              <a-button type="primary" @click="onUserAdd" v-action:addUser>添加成员</a-button>
            </div>
            <user-table
              ref="userTable"
              :company-id="curSelectCom"
              :dept-id="curSelectDept"
              :show-action="true"
              @rowSelect="onRowSelect">
              <template slot="dropdown" slot-scope="item">
                <a-menu-item v-action:editUser>
                  <a href="javascript:;" @click="onUserEdit(item.record)">编辑</a>
                </a-menu-item>
                <a-menu-item v-action:editUser>
                  <a href="javascript:;" @click="onUserAuth(item.record)">授权</a>
                </a-menu-item>
                <a-menu-item v-action:disableUser>
                  <a href="javascript:;" @click="onUserDisable(item.record)">禁用</a>
                </a-menu-item>
                <a-menu-item v-action:delUser>
                  <a href="javascript:;" @click="onUserDelete(item.record)">删除</a>
                </a-menu-item>
              </template>
            </user-table>
            <div>
              已选择{{ selectedRowKeys.length }} <a @click="batchDeleteUser" v-action:delUser>删除</a>
            </div>
          </div>
        </a-col>
      </div>
    </a-row>
    <org-auth ref="orgAuth" v-show="isOnOrgAuth" @back="onBack"></org-auth>
    <user-modal ref="userModal" @refreshTable="reloadTable"></user-modal>
  </div>
</template>

<script>
import { getAllCompanyTree, getCompanyDeptTree } from '@/api/company'
import { enableUser, deleteUser, batchDeleteUser } from '@/api/user'
import OrgAuth from './Module/OrgAuth'
import UserTable from './Module/UserTable'
import LeftTree from './Module/LeftTree'
import TreeSelect from './Module/TreeSelect'
import UserModal from './Module/UserModal'
import { minxinModal } from '@/utils/mixin.js'

export default {
  name: 'BusinessMembers',
  components: { UserModal, TreeSelect, LeftTree, UserTable, OrgAuth },
  mixins: [minxinModal],
  data () {
    return {
      // 公司树数据
      comTreeData: [],
      // 部门树数据
      deptTreeData: [],
      // 被选中的公司Id
      curSelectCom: undefined,
      // 被选中的部门Id
      curSelectDept: undefined,
      // 是否是授权界面
      isOnOrgAuth: false,
      // 表格中被选中的数据
      selectedRowKeys: [],
      // 是否是单体公司
      isSingle: false,
      // 单体公司的Id
      singleComId: undefined
    }
  },
  methods: {
    /**
     * 左边树选择触发事件
     * @param selectedKeys  被选择的树的数组
     * @param e             事件
     */
    onSelectLeftTree (selectedKeys, e) {
      if (this.cancelChoose(selectedKeys)) {
        this.resetSelect()
        return
      }
      const selectKey = selectedKeys[0]
      this.curSelectCom = selectKey
      this.curSelectDept = undefined
      if (!this.isSingle) {
        this.renderDeptTree(this.curSelectCom)
        return
      }
      // 是单体公司选择的是公司
      if (this.singleComId === selectKey) {
        this.$refs.userTable.reloadCom(this.curSelectCom)
      } else {
        this.curSelectCom = this.singleComId
        this.curSelectDept = selectKey
      }
    },
    /**
     * 清空树的选择
     */
    resetSelect: function () {
      this.curSelectCom = undefined
      this.curSelectDept = undefined
      this.deptTreeData = []
    },
    /**
     * 根据选中的key判断是否是取消选中操作
     * @param selectedKeys
     * @returns {boolean}
     */
    cancelChoose: function (selectedKeys) {
      return selectedKeys.length <= 0
    },
    /**
     * 选择部门下拉框的事件
     * @param value
     */
    onSelectDept (value) {
      this.curSelectDept = value
    },
    /**
     * 渲染部门树
     * @param comId
     * @returns {*}
     */
    renderDeptTree (comId) {
      const _this = this
      return getCompanyDeptTree({ comId: comId }).then(function (treeData) {
        _this.deptTreeData = treeData
        return treeData
      })
    },
    onUserAdd () {
      this.$refs.userModal.showModal()
    },
    onUserEdit (record) {
      this.$refs.userModal.onEdit(record)
    },
    onUserAuth (record) {
      // 表格申请编辑权限
      this.isOnOrgAuth = true
      this.$refs.orgAuth.onEditAuth(record.id)
    },
    onUserDisable (record) {
      const _this = this
      this.confirm({
        title: '确认禁用' + record.trueName + '吗',
        onOk: function () {
          enableUser({ enable: '0' }, [record.id]).then(function (res) {
            if (res.data.code !== '0') {
              _this.$message.success('禁用成功')
            } else {
              _this.$message.error('禁用失败')
            }
            _this.reloadTable()
          })
        }
      })
    },
    onUserDelete (record) {
      const _this = this
      this.confirm({
        title: '确认删除' + record.trueName + '吗',
        content: '删除将不可恢复',
        onOk: function () {
          deleteUser({ userId: record.id }).then(function (res) {
            if (res.data.code === 200) {
              _this.$message.success('删除成功')
            } else {
              _this.$message.error('删除失败')
            }
            _this.reloadTable()
          })
        }
      })
    },
    reloadTable () {
      this.$refs.userTable.reload()
    },
    onBack () {
      this.isOnOrgAuth = false
    },
    batchDeleteUser () {
      const _this = this
      if (_this.selectedRowKeys.length === 0) {
        _this.$message.warning('请选择需要删除的用户')
      } else {
        this.confirm({
          title: '确认删除选中的数据吗',
          content: '删除将不可恢复',
          onOk: function () {
            batchDeleteUser(_this.selectedRowKeys).then(function (res) {
              if (res.code === 200) {
                _this.$message.success('删除成功')
              } else {
                _this.$message.error('删除失败')
              }
              _this.reloadTable()
              _this.selectedRowKeys = []
            })
          }
        })
      }
    },
    onRowSelect (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    },
    isSingleCom (treeData) {
      return treeData.length === 1 && treeData[0].children === undefined
    },
    renderSingleCom: function (treeData) {
      const _this = this
      const com = treeData[0]
      _this.renderDeptTree(com.id).then(function (deptTreeData) {
        com.children = deptTreeData
        _this.comTreeData = treeData
        _this.isSingle = true
        _this.singleComId = com.id
      })
    },
    renderMultiCom: function (treeData) {
      const _this = this
      _this.comTreeData = treeData
    }
  },
  created () {
    const _this = this
    getAllCompanyTree().then(function (treeData) {
      if (_this.isSingleCom(treeData)) {
        _this.renderSingleCom(treeData)
      } else {
        _this.renderMultiCom(treeData)
      }
    })
  }
}
</script>

<style scoped>

</style>
