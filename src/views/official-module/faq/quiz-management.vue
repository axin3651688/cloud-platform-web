<!--问答管理-->
<template>
  <div style="margin-top: 24px ; background-color: #FFF;display: flex;flex-direction: column">
    <div style="display: flex;flex-direction: row;justify-content: space-between">
      <div style="display: flex;flex-direction: row;margin-top:16px;margin-left: 32px; ">
        <common-drop-down
          :result="result"
          :defaultValue="selectVal"
          @selectCell="selectCell"
          class="com-drop-down">
        </common-drop-down>
        <a-input-search placeholder="问题名称" v-model="titleKeyWord" style="width: 200px;margin:0 0 15px 32px;" @search="onSearch" />
      </div>
      <a-button
        class="button_style_one"
        type="primary"
      >
        <div style="margin: 6px 0" @click="refreshPage">
          <img src="@icons/4504.svg" style="margin-right: 10px;"/>刷新页面
        </div>
      </a-button>
    </div>
    <div>
      <!--table-->
      <a-table
        class="user-table"
        :pagination="false"
        size="small"
        :rowKey="setKey"
        :columns="columns"
        :dataSource="dataSource"
        :scroll="{y:'calc(100vh - 331px)' }"
      >
        <template slot="createUserName" slot-scope="text,record">
          <span v-if="record.createUserName">{{ text }}</span>
          <span v-else>游客</span>
        </template>
        <template slot="status" slot-scope="text,record">
          <span v-if="record.status==1" style="color: #3BAD4B">已解决</span>
          <span v-else-if="record.status==0" style="color: #E7492E">未解决</span>
          <span v-else-if="record.status==2" style="color: #9EA0A5">已提交</span>
        </template>

        <template slot="action" slot-scope="text,record">
          <!--已提交-->
          <div v-if="record.status==2" @click="backSubmit(record)">
            <img src="@icons/4786.svg" />
          </div>
          <!--未提交-->
          <div v-else>
            <a-dropdown :trigger="['click']">
              <span><img src="@icons/4574.svg"/></span>
              <a-menu slot="overlay">
                <a-menu-item key="0" v-if="record.status==1">
                  <span @click="submitIssue(record)" >
                    <img src="@icons/4837.svg" style="margin-right: 8px;"/> 提交
                  </span>
                </a-menu-item>
                <a-menu-item key="1" v-if="record.status==1">
                  <span @click="editIssue(record)">
                    <img src="@icons/Icon.svg" style="margin-right: 8px;"/> 修改
                  </span>
                </a-menu-item>
                <a-menu-item key="2" v-if="record.status==0">
                  <span @click="replyIssue(record)">
                    <img src="@icons/Icon.svg" style="margin-right: 8px;"/> 回复
                  </span>
                </a-menu-item>
                <a-menu-item key="3">
                  <span @click="deleteIssue(record)">
                    <img src="@icons/Group39.svg" style="width: 20px ;height: 20px;margin-right: 8px;"/> 删除
                  </span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>

        </template>

      </a-table>
      <!--分页器-->
      <table-pagination
        :total="total"
        :defaultCurrent="current"
        :pageSizeOptions="pageSizeOptions"
        :size="pageSize"
        :showSizeChanger="true"
        :showQuickJumper="true"
        :hideOnSinglePage="false"
        @changePage="changePage"
        @changePageSize="changePageSize"
      ></table-pagination>
    </div>
  </div>
</template>

<script>
import CnbiFAQManagement from '@/classes/lib/CnbiFAQManagement'
import CommonDropDown from '@/components/system/common-drop-down'
import TablePagination from '@/components/system/table-pagination'
export default {
  name: 'QuizManagement',
  components: { TablePagination, CommonDropDown },
  props: {
    inheritPage: { // 付组件传下来的页数
      type: Number,
      default: 1
    },
    faqId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      titleKeyWord: '',
      selectVal: 'all',
      pageSize: 20,
      pageSizeOptions: ['20', '50', '100'],
      total: 0, // 总条数
      current: 1, // 当前页数
      columns: [
        {
          title: '问题名称',
          dataIndex: 'title',
          width: '20%'
        },
        {
          title: 'FQA标题',
          dataIndex: 'faqTitle',
          width: '10%'
        },
        {
          title: '提问者',
          dataIndex: 'createUserName',
          width: '10%',
          scopedSlots: { customRender: 'createUserName' }
        },
        {
          title: '提问时间',
          dataIndex: 'createTime',
          width: '30%',
          customRender (text, record, index) {
            const oDate = new Date(text * 1)
            const oYear = oDate.getFullYear()
            let oMonth = oDate.getMonth() + 1
            let oDay = oDate.getDate()
            if (oMonth < 10) {
              oMonth = '0' + oMonth
            }
            if (oDay < 10) {
              oDay = '0' + oDay
            }
            const hour = oDate.getHours()
            let minutes = oDate.getMinutes()
            const second = oDate.getSeconds()
            minutes = minutes < 10 ? ('0' + minutes) : minutes
            // const oTime = oDay + '/' + oMonth + '/' + oYear
            const oTime = oYear + '/' + oMonth + '/' + oDay + ' ' + hour + ':' + minutes + ':' + second

            // item.updateTime = oTime
            return oTime
          }
        },
        {
          title: '问题状态', // 0 未解决 1 已解决 2 已提交
          dataIndex: 'status',
          width: '10%',
          scopedSlots: { customRender: 'status' }
        },

        {
          title: '操作',
          dataIndex: '',
          width: '20%',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [],
      result: [
        {
          name: '所有',
          key: 'all'
        },
        {
          name: '未解决',
          key: '0'
        },
        {
          name: '已解决',
          key: '1'
        },
        {
          name: '已提交',
          key: '2'
        }

      ]

    }
  },
  created () {
    this.current = parseInt(this.inheritPage)
    if (this.faqId) { // 判断是不是从faq管理偷渡过来的
      this.selectVal = '0'
    }
    this.FAQMObj = new CnbiFAQManagement()
    this.getDataSource()
  },
  watch: {
    // 监听标题搜索是否清空，如清空刷新页面
    titleKeyWord (val) {
      if (val.length == 0) {
        this.getDataSource()
      }
    }
  },
  methods: {
    //
    selectCell (value) {
      this.selectVal = value
      console.log('下拉框==' + value)
      this.getDataSource()
    },
    onSearch (val) {
      this.getDataSource()
    },
    setKey (record) {
      return record.id
    },
    // 获取表格数据
    async getDataSource () {
      const page = this.current
      const pageSize = this.pageSize
      const title = this.titleKeyWord
      const faqId = this.faqId
      let status = null
      if (this.selectVal != 'all') {
        status = this.selectVal
      }
      const params = {
        page: page,
        size: pageSize,
        direction: 'desc',
        sortBy: 'updateTime',
        status,
        title,
        faqId
      }
      const res = await this.FAQMObj.questionFindPage(params)
      if (res.code === 200) {
        this.total = res.data.totalElements
        this.dataSource = res.data.data
        console.log('问题管理==', res.data.data)
      }
    },
    // 查询分页数据 页码改变
    changePage (page, pageSize) {
      this.current = page
      this.pageSize = pageSize
      this.getDataSource()
    },
    // 条数该表
    changePageSize (current, size) {
      this.current = current
      this.pageSize = size
      this.getDataSource()
    },
    // 提交问题
    async submitIssue (record) {
      const params = {
        field: 'status',
        id: record.id,
        value: 2
      }
      const res = await this.FAQMObj.questionUpdateByField(params)
      console.log('提交问题==', res)
      this.getDataSource()
    },
    // 编辑问题
    editIssue (record) {
      const current = this.current
      this.$router.push({
        name: 'Answer',
        query: {
          issueId: record.id,
          type: 'edit',
          current: current
        }
      })
    },
    // 回复问题
    replyIssue (record) {
      const current = this.current
      this.$router.push({
        name: 'Answer',
        query: {
          issueId: record.id,
          type: 'reply',
          current: current
        }
      })
    },
    // 删除问题
    async deleteIssue (record) {
      const id = record.id
      const res = await this.FAQMObj.questionDelete(id)
      console.log('删除问题==', res)
      this.getDataSource()
    },
    // 撤回提交
    async backSubmit (record) {
      const params = {
        field: 'status',
        id: record.id,
        value: 1
      }
      const res = await this.FAQMObj.questionUpdateByField(params)
      console.log('撤回提交==', res)
      this.getDataSource()
    },
    // 刷新页面
    refreshPage () {
      this.selectVal = 'all'
      this.titleKeyWord = ''
      this.$emit('update:faqId', null)
      const _this = this
      this.$nextTick(() => { // 等faqId值改变后在执行刷新
        _this.getDataSource()
      })
    }

  }

}
</script>

<style scoped>

  .button_style_one {
    margin: 16px 32px 16px 0;
    cursor: pointer;
    border:1px solid rgba(45,156,60,1);
    background:linear-gradient(360deg,rgba(52,170,68,1) 0%,rgba(56,178,73,1) 100%);
    box-shadow:0px 1px 1px rgba(19,31,21,0.1);
    opacity:1;
    border-radius:4px
  }
.com-drop-down{
  width: 90px;
}
</style>
