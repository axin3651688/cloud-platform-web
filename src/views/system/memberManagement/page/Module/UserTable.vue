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
            <slot name="dropdown" :record="record">
              <!--example -->
              <!--<a-menu-item>
                <a href="javascript:;" @click="onUserEdit(record)">编辑</a>
              </a-menu-item>-->
            </slot>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
  </div>
</template>

<script>
// 遇到表格请使用封装后的表格组件，这里是因为当时没有封装这样写的
import { getPrimaryCompanyPeople } from '@/api/userCompany'
import { getPrimaryDeptPeople } from '@/api/userDept'
import { findRoleUser } from '@/api/userRole'
import typeUtils from '@/utils/typeUtils'
export default {
  name: 'UserTable',
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
    },
    // 判断启用禁用  查的是启用还是禁用的. '1' 启用 '0' 禁用
    enableParam: {
      type: String,
      default: '1'
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

        {
          title: '现任职位',
          dataIndex: 'presentPost'
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
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40']
      },
      // 被选择的
      selectedRowKeys: [],
      loading: false,
      rowKey: 'id'
    }
  },
  computed: {
    rowSelection () {
      const _this = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          _this.selectedRowKeys = selectedRowKeys
          _this.$emit('rowSelect', selectedRowKeys, selectedRows)
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
    // 写这个是因为左边树又有部门又有公司的情况，判断不了公司有没有变化，重新选择公司，部门是不会清除的，还是回会去查部门数据
    reloadCom (comId) {
      this.initPage()
      this.fetch({ comId: comId, page: this.pagination.defaultCurrent, size: this.pagination.defaultPageSize })
    },
    initPage () {
      this.pagination.current = this.pagination.defaultCurrent
    }
  },
  watch: {
    companyId (newVal, oldVal) {
      if (typeUtils.isNotBlank(newVal)) {
        this.reloadCom(newVal)
      } else {
        this.data = []
      }
    },
    deptId (newVal, oldVal) {
      this.initPage()
      this.fetch({ comId: this.companyId,
        deptId: newVal,
        page: this.pagination.defaultCurrent,
        size: this.pagination.defaultPageSize })
    },
    roleId (newVal) {
      if (newVal >= 0) {
        this.initPage()
        this.fetch({ roleId: newVal,
          page: this.pagination.defaultCurrent,
          size: this.pagination.defaultPageSize })
      } else {
        this.data = []
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
