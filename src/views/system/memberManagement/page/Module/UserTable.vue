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
          <a-menu class="cnbi-drop-down" slot="overlay">
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
    <custom-column-modal
      ref="columnModal"
      :title="'添加自定义类别'"
      :column="columns"
      :default-column="defaultColumns"
      @finalColumn="onChooseColumn"
    >
    </custom-column-modal>
  </div>
</template>

<script>
// 遇到表格请使用封装后的表格组件，这里是因为当时没有封装这样写的
import { findUserByRuleAndPage } from '@/api/user'
import { getPrimaryCompanyPeople } from '@/api/userCompany'
import { getPrimaryDeptPeople } from '@/api/userDept'
import { findRoleUser } from '@/api/userRole'
import { findAllPost } from '@/api/post'
import typeUtils from '@/utils/typeUtils'
import CustomColumnModal from './CustomColumnModal'
import store from '@/store'
let gthis
export default {
  name: 'UserTable',
  components: { CustomColumnModal },
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
    },
    showOnStart: {
      type: Boolean,
      default: false
    },
    search: {
      type: Object,
      default: function () {
        return {
          key: undefined,
          text: undefined
        }
      }
    }
  },
  data () {
    return {
      defaultColumns: [
        /* {
          title: '序号',
          customRender: function (text, row, index) {
            const current = gthis.pagination.current || gthis.pagination.defaultCurrent
            const pageSize = gthis.pagination.pageSize || gthis.pagination.defaultPageSize
            return (current - 1 < 1 ? 0 : current - 1) * pageSize + index + 1
          }
        }, */
        /* {
          title: '头像',
          dataIndex: 'avatar'
        }, */
        {
          title: '名称',
          dataIndex: 'trueName',
          customRender: function (text, row, index) {
            const userInfo = store.getters.userInfo
            if (userInfo.id === row.id) {
              return <span style="display: inline-block;">
                <a-avatar style="margin-right: 8px" size="small" src={row.thumbnail} />
                <div style="display: inline-block; line-height: 24px;">{text}</div>
                <a-icon style="color: rgba(77, 124, 254, 1); font-size: 12px;" type="user" />
              </span>
            } else {
              return <span style="display: inline-block;">
                <a-avatar style="margin-right: 8px" size="small" src={row.thumbnail} />
                <div style="display: inline-block; line-height: 24px;">{text}</div>
              </span>
            }
          }
        },
        {
          title: '部门',
          dataIndex: 'dept',
          customRender: (text, row, index) => {
            /* let txt = ''
            row.dept.forEach(function (ele) {
              txt += ele.text
            }) */
            return row.dept.text
          }
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
          dataIndex: 'presentPost',
          customRender: (text, row, index) => {
            if (row.presentPost) {
              return row.postText ? row.postText : ''
            }
            return ''
          }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns: [
        /* {
          title: '序号',
          customRender: function (text, row, index) {
            const current = gthis.pagination.current || gthis.pagination.defaultCurrent
            const pageSize = gthis.pagination.pageSize || gthis.pagination.defaultPageSize
            return (current - 1 < 1 ? 0 : current - 1) * pageSize + index + 1
          }
        }, */
        /* {
          title: '头像',
          dataIndex: 'avatar'
        }, */
        {
          title: '名称',
          dataIndex: 'trueName',
          customRender: function (text, row, index) {
            const userInfo = store.getters.userInfo
            if (userInfo.id === row.id) {
              return <span style="display: inline-block;">
                <a-avatar style="margin-right: 8px" size="small" src={row.thumbnail} />
                <div style="display: inline-block; line-height: 24px;">{text}</div>
                <a-icon style="color: rgba(77, 124, 254, 1); font-size: 12px;" type="user" />
              </span>
            } else {
              return <span style="display: inline-block;">
                <a-avatar style="margin-right: 8px" size="small" src={row.thumbnail} />
                <div style="display: inline-block; line-height: 24px;">{text}</div>
              </span>
            }
          }
        },
        {
          title: '部门',
          dataIndex: 'dept',
          customRender: (text, row, index) => {
            if (row.dept && row.dept.text) {
              return row.dept.text
            }
            return ''
          }
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
          dataIndex: 'presentPost',
          customRender: (text, row, index) => {
            if (row.presentPost) {
              return row.postText ? row.postText : ''
            }
            return ''
          }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      postData: () => {
        return findAllPost().then(res => {
          return Array.isArray(res.data) ? res.data : []
        })
      },
      pagination: {
        defaultCurrent: 0,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40'],
        total: 0
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
      } else {
        const res = await findUserByRuleAndPage(params)
        userData = res.data
      }
      const pagination = { ..._this.pagination }
      _this.loading = false
      if (typeUtils.isObject(userData)) {
        _this.data = await this.decorateUserData(userData.content)
      }
      pagination.total = userData.totalElements - 0
      _this.pagination = pagination
    },
    reload () {
      this.initPage()
      this.fetch({
        comId: this.companyId,
        deptId: this.deptId,
        roleId: this.roleId,
        page: this.pagination.defaultCurrent,
        size: this.pagination.defaultPageSize
      })
    },
    // 写这个是因为条件又有部门又有公司的情况，改变公司，部门是不会清除的，还是回会去查部门数据
    reloadCom (comId) {
      this.initPage()
      this.fetch({ comId: comId, page: this.pagination.defaultCurrent, size: this.pagination.defaultPageSize })
    },
    initPage () {
      this.pagination.current = this.pagination.defaultCurrent
    },
    decorateUserData: async function (userData) {
      if (Array.isArray(userData)) {
        const postData = await this.postData()
        const postObj = {}
        postData.forEach(function (ele) {
          postObj[ele.id] = ele.text
        })
        userData.forEach(function (ele) {
          if (ele.presentPost) {
            ele.postText = postObj[ele.presentPost]
          }
        })
      }
      return userData
    },
    showModal () {
      this.$refs.columnModal.showModal()
    },
    onChooseColumn (lastColumn) {
      this.columns = lastColumn
    }
  },
  watch: {
    companyId (newVal, oldVal) {
      this.reloadCom(newVal)
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
    },
    search: {
      deep: true,
      handler: function (newVal) {
        if (newVal.key !== undefined && newVal.text !== undefined) {
          this.initPage()
          this.fetch({
            comId: this.companyId,
            deptId: this.deptId,
            roleId: this.roleId,
            page: this.pagination.defaultCurrent,
            size: this.pagination.defaultPageSize,
            [newVal.key]: newVal.text
          })
        }
      }
    }
  },
  created () {
    gthis = this
    /* Action在最后一列 */
    if (!this.showAction) {
      this.columns.pop()
    }
    if (this.showOnStart) {
      this.reload()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
