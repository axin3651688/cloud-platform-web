<template>
  <div>
    <a-table
      :columns="columns"
      :rowKey="rowKey"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      :rowSelection="rowSelection"
      @change="handleTableChange">
      <span slot="action" slot-scope="text, record">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#"><a-icon type="align-right" /></a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="onUserEdit(record)">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="onUserAuth(record)">授权</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="onUserDisable(record)">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="onUserDelete(record)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
    <div v-show="showAction">
      已选择{{ selectedRowKeys.length }} <a @click="batchDeleteUser">删除</a>
    </div>
    <user-modal ref="userModal" @refreshTable="reload"></user-modal>
  </div>
</template>

<script>
import { getPrimaryCompanyPeople } from '@/api/userCompany'
import { getPrimaryDeptPeople } from '@/api/userDept'
import { enableUser, deleteUser, batchDeleteUser } from '@/api/user'
import { findRoleUser } from '@/api/userRole'
import typeUtils from '@/utils/typeUtils'
import UserModal from './UserModal'
export default {
  name: 'UserTable',
  components: { UserModal },
  props: {
    // 根据公司查
    companyId: {
      type: String,
      default: undefined
    },
    // 根据部门查
    deptId: {
      type: String,
      default: undefined
    },
    // 根据角色查
    roleId: {
      type: Number,
      default: undefined
    },
    // 是否显示操作按钮
    showAction: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '头像',
          dataIndex: 'avatar'
        },
        {
          title: '名称',
          dataIndex: 'trueName'
        },
        {
          title: '性别',
          dataIndex: 'gender'
        },
        {
          title: '电话号码',
          dataIndex: 'phone'
        },
        /* {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '主要职责',
          dataIndex: 'mainDuty'
        },
        {
          title: '政治面貌',
          dataIndex: 'politicsStatus'
        }, */
        {
          title: '现任职位',
          dataIndex: 'presentPost'
        },
        /* {
          title: '学历',
          dataIndex: 'qualifications'
        },
        {
          title: '职称',
          dataIndex: 'professionalTitle'
        }, */
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      pagination: {
        defaultCurrent: 0,
        defaultPageSize: 1
      },
      // 被选择的
      selectedRowKeys: [],
      loading: false,
      rowKey: 'id',
      // 查的是启用还是禁用的. '1' 启用 '0' 禁用
      enableParam: '1'
    }
  },
  computed: {
    rowSelection () {
      const _this = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          _this.selectedRowKeys = selectedRowKeys
        }
      }
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        comId: this.companyId,
        deptId: this.deptId,
        roleId: this.roleId,
        size: pagination.pageSize,
        page: pagination.current - 1
      })
    },
    async fetch (params = {}) {
      const _this = this
      params.enable = _this.enableParam
      let userData = []
      if (typeUtils.isNotBlank(params.deptId)) {
        const res = await getPrimaryDeptPeople(params)
        userData = res.data
      } else if (typeUtils.isNotBlank(params.comId)) {
        const res = await getPrimaryCompanyPeople(params)
        userData = res.data
      } else if (params.roleId >= 0) {
        const res = await findRoleUser(params)
        userData = res.data
      }
      const pagination = { ..._this.pagination }
      _this.loading = false
      if (typeUtils.isObject(userData)) {
        _this.data = userData.content
      }
      pagination.total = userData.totalElements - 0
      _this.pagination = pagination
    },
    reload () {
      this.initPage()
      this.fetch({ comId: this.companyId,
        deptId: this.deptId,
        roleId: this.roleId,
        page: this.pagination.defaultCurrent,
        size: this.pagination.defaultPageSize })
    },
    // 写这个是因为左边树又有部门又有公司，判断不了公司有没有变化，重新选择公司，部门是不会清除的，还是回会去查部门数据
    reloadCom (comId) {
      this.initPage()
      this.fetch({ comId: comId, page: this.pagination.defaultCurrent, size: this.pagination.defaultPageSize })
    },
    initPage () {
      this.pagination.current = this.pagination.defaultCurrent
    },
    onUserAdd () {
      this.$refs.userModal.visible = true
    },
    onUserEdit (record) {
      this.$refs.userModal.onEdit(record)
    },
    // 这里不做权限管理交给父组件做吧
    onUserAuth (record) {
      this.$emit('editAuth', record)
    },
    onUserDisable (record) {
      const _this = this
      enableUser({ enable: '0' }, [record.id]).then(function (res) {
        if (res.data.code !== '0') {
          _this.$message.success('禁用成功')
        } else {
          _this.$message.error('禁用失败')
        }
        _this.reload()
      })
    },
    onUserDelete (record) {
      const _this = this
      deleteUser({ userId: record.id }).then(function (res) {
        if (res.data.code !== '0') {
          _this.$message.success('删除成功')
        } else {
          _this.$message.error('删除失败')
        }
        _this.reload()
      })
    },
    batchDeleteUser () {
      const _this = this
      if (_this.selectedRowKeys.length === 0) {
        _this.$message.warning('请选择需要删除的用户')
      } else {
        batchDeleteUser(_this.selectedRowKeys).then(function (res) {
          if (res.code !== 0) {
            _this.$message.success('删除成功')
          } else {
            _this.$message.error('删除失败')
          }
          _this.reload()
          _this.selectedRowKeys = []
        })
      }
    }
  },
  watch: {
    companyId (newVal, oldVal) {
      if (typeUtils.isNotBlank(newVal)) {
        this.reloadCom(newVal)
      }
    },
    deptId (newVal, oldVal) {
      if (typeUtils.isNotBlank(newVal)) {
        this.initPage()
        this.fetch({ comId: this.companyId,
          deptId: newVal,
          page: this.pagination.defaultCurrent,
          size: this.pagination.defaultPageSize })
      }
    },
    roleId (newVal) {
      if (newVal >= 0) {
        this.initPage()
        this.fetch({ roleId: newVal,
          page: this.pagination.defaultCurrent,
          size: this.pagination.defaultPageSize })
      }
    }
  },
  created () {
    /* Action在最后一列 */
    if (!this.showAction) {
      this.columns.pop()
    }
  }
}
</script>

<style scoped>

</style>
