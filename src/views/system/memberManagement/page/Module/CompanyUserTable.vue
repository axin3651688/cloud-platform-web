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
    <div>
      已选择{{ selectedRowKeys.length }} <a @click="batchDeleteUser">删除</a>
    </div>
  </div>

</template>

<script>
import { getPrimaryCompanyPeople } from '@/api/userCompany'
import { getPrimaryDeptPeople } from '@/api/userDept'
import { enableUser, deleteUser, batchDeleteUser } from '@/api/user'
import typeUtils from '@/utils/typeUtils'
export default {
  name: 'CompanyUserTable',
  props: {
    companyId: {
      type: String,
      default: undefined
    },
    deptId: {
      default: undefined
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
      selectedRowKeys: [],
      loading: false,
      rowKey: 'id',
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
        size: pagination.pageSize,
        page: pagination.current - 1
      })
    },
    fetch (params = {}) {
      const _this = this
      params.enable = _this.enableParam
      if (typeUtils.isString(params.deptId) && params.deptId.length > 0) {
        getPrimaryDeptPeople(params).then(function (res) {
          const pagination = { ..._this.pagination }
          const data = res.data
          _this.loading = false
          if (typeUtils.isObject) {
            _this.data = data.content
          }
          pagination.total = data.totalElements - 0
          _this.pagination = pagination
        })
      } else if (typeUtils.isString(params.comId) && params.comId.length > 0) {
        getPrimaryCompanyPeople(params).then(function (res) {
          const pagination = { ..._this.pagination }
          const data = res.data
          _this.loading = false
          _this.data = data.content
          if (typeUtils.isObject(data)) {
            _this.data = data.content
          }
          pagination.total = data.totalElements - 0
          _this.pagination = pagination
        })
      }
    },
    reload () {
      this.initPage()
      this.fetch({ comId: this.companyId, deptId: this.deptId, page: this.pagination.defaultCurrent, size: this.pagination.defaultPageSize })
    },
    reloadCom (comId) {
      this.initPage()
      this.fetch({ comId: comId, page: this.pagination.defaultCurrent, size: this.pagination.defaultPageSize })
    },
    initPage () {
      this.pagination.current = this.pagination.defaultCurrent
    },
    onUserEdit (record) {
      this.$emit('editUser', record)
    },
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
      if (typeUtils.isString(newVal) && newVal.length > 0) {
        this.reloadCom(newVal)
      }
    },
    deptId (newVal, oldVal) {
      if (typeUtils.isString(newVal) && newVal.length > 0) {
        this.initPage()
        this.fetch({ comId: this.companyId, deptId: newVal, page: this.pagination.defaultCurrent, size: this.pagination.defaultPageSize })
      }
    }
  },
  created () {
    const _this = this
    _this.fetch({ comId: _this.companyId, page: _this.pagination.defaultCurrent, size: _this.pagination.defaultPageSize })
  }
}
</script>

<style scoped>

</style>
