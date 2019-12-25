<!--faq管理-->
<template>
  <div style="margin-top: 24px ; background-color: #FFF;display: flex;flex-direction: column">
    <div style="display: flex;flex-direction: row;justify-content: space-between">
      <div style="display: flex;flex-direction: row;margin-top:16px;margin-left: 32px; ">
        <a-tree-select
          style="width: 120px"
          :value="sortName"
          @change="onChange"
          allowClear
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择"
          :treeData="sortTree"
        >
          <template slot="suffixIcon">
            <img src="@icons/sort.svg" />
          </template>
        </a-tree-select>
        <a-input-search placeholder="FAQ标题搜索" v-model="titleKeyWord" style="width: 200px;margin:0 0 15px 32px;" @search="onSearch" />
      </div>

      <a-button
        class="button_style_one"
        type="primary"
        @click="showAddFaq = true"
      >
        <div style="margin: 6px 0" @click="addFAQ">
          <a-icon type="cloud-upload" style="margin-right: 10px;"/>添加FAQ
        </div>
      </a-button>
    </div>
    <div>
      <!--table上层勾选多少项-->
      <div class="table-top" v-if="selectedRowKeys.length>0">
        <div style="width: 16px;height: 16px;margin:-2px 16px 11px 32px">
          <img src="@icons/9.svg">
        </div>
        <div >
          <span>已选择</span>
          <span style="color:#1665D8;margin: 0 2px 0 2px;">{{ selectedRowKeys.length }}</span>
          <span>项</span>
        </div>
        <span style="color:#1665D8;margin: 0px 24px 10px 20px;" @click="clickRelease">发布</span>
        <span style="color:#1665D8" @click="clickDelete">删除</span>
      </div>
      <!--table-->
      <a-table
        class="user-table"
        :pagination="false"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        size="small"
        :rowKey="setKey"
        :columns="columns"
        :dataSource="dataSource"
        :scroll="{y:'calc(100vh - 331px)' }"
      >
        <template slot="FQAtitle" slot-scope="text,record">
          <span style="color: #1C6CE1" @click="clickTitle(record)">{{ text }}</span>
        </template>
        <template slot="noSolveCount" slot-scope="text,record">
          <span v-if="record.noSolveCount==0">无</span>
          <span v-else style="color: #1C6CE1" @click="clickCount(record)" >{{ text }}</span>
        </template>
        <template slot="issue" slot-scope="text,record">
          <div>
            <span v-if="record.issue==1" style="color:#3BAD4B">是</span>
            <span v-else style="color:#E7492E ">否</span>
          </div>
        </template>
        <template slot="action" slot-scope="text,record">
          <div style="display: flex;flex-direction: row;">
            <div style="margin-right: 35px;">
              <img v-if="record.issue==1" src="@icons/4786.svg" @click="changeIssue(record)"/>
              <img v-else src="@icons/Icon.svg" @click="editorFaq(record)">
            </div>
            <div>
              <span style="margin-right: 8px">评论</span>
              <a-switch :defaultChecked="record.isComment==0?false:true" @change="changeDiscuss(record)" />
            </div>
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
import TablePagination from '@/components/system/table-pagination'
export default {
  name: 'FaqManagement',
  components: { TablePagination },
  props: {
    inheritPage: { // 付组件传下来的页数
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      FAQMObj: null,
      sortName: undefined,
      titleKeyWord: '',
      sortTree: [], // 树形分类结构
      pageSize: 20,
      pageSizeOptions: ['20', '50', '100'],
      // pageSizeOptions: ['3', '5', '15'],
      total: 0, // 总条数
      current: 1, // 当前页数
      columns: [
        {
          title: 'FQA标题',
          dataIndex: 'title',
          width: '20%',
          scopedSlots: { customRender: 'FQAtitle' }
        },
        {
          title: 'FQA分类',
          dataIndex: 'categoryText',
          width: '10%'
        },
        {
          title: '待解决问题数量',
          dataIndex: 'noSolveCount',
          width: '10%',
          scopedSlots: { customRender: 'noSolveCount' }
        },
        {
          title: '是否发布',
          dataIndex: 'issue',
          width: '10%',
          scopedSlots: { customRender: 'issue' }
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
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
          title: '操作',
          dataIndex: '',
          width: '20%',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [],
      selectedRowKeys: []

    }
  },
  created () {
    this.current = parseInt(this.inheritPage)
    this.FAQMObj = new CnbiFAQManagement()
    this.getDataSource()
    this.getDataTree()
  },
  mounted () {
    console.log('mounted========')
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
    // 输入框搜索
    onSearch (val) {
      this.getDataSource()
    },
    // 选择分类
    onChange (value, label, extra) {
      this.sortName = value
      this.getDataSource()
    },
    // 获取表格数据  direction 排序方式  sortBy 排序字段
    async getDataSource () {
      const page = this.current
      const pageSize = this.pageSize
      const title = this.titleKeyWord
      const categoryId = this.sortName
      const params = {
        page: page,
        size: pageSize,
        direction: 'desc',
        sortBy: 'updateTime',
        categoryId,
        title
      }
      const res = await this.FAQMObj.coreFindPage(params)
      if (res.code === 200) {
        this.total = res.data.totalElements
        this.dataSource = res.data.data
      }
    },
    // 查询分类位置 树形结构
    async getDataTree () {
      const res = await this.FAQMObj.categoryFindTree()
      if (res.code === 200) {
        console.log('查询分类位置====', res)
        this.sortTree = res.data
        this.remakeTreeData(res.data)
      }
      console.log('查询分类位置 树形结构=======', this.sortTree)
    },
    /* 设置 key value title */
    remakeTreeData (data) {
      data.forEach((item) => {
        item['title'] = item.text
        item['value'] = item.id
        item['key'] = item.code
        if (item.leaf == 1 && item.children && item.children.length == 0) {
          delete item.children
        }
        if (item.children && item.children.length > 0) {
          this.remakeTreeData(item.children)
        }
      })
    },
    // 查询分页数据 页码改变
    changePage (page, pageSize) {
      this.current = page
      this.pageSize = pageSize
      this.getDataSource()
    },
    // 条数改变
    changePageSize (current, size) {
      this.current = current
      this.pageSize = size
      this.getDataSource()
    },
    setKey (record) {
      return record.id
    },
    // 评论开关
    async changeDiscuss (record) {
      console.log('评论开关===', record)
      const isComment = record.isComment == 0 ? 1 : 0
      const params = {
        field: 'isComment',
        value: isComment,
        id: record.id
      }
      await this.FAQMObj.coreUpdateByField(params)
      this.getDataSource()
    },
    // 撤销发布
    async changeIssue (record) {
      const issue = 0
      const params = {
        field: 'issue',
        value: issue,
        id: record.id
      }
      await this.FAQMObj.coreUpdateByField(params)
      this.getDataSource()
    },
    // 跳转编辑FAQ页面
    editorFaq (record) {
      const current = this.current
      this.$router.push({
        name: 'FaqOperation',
        query: {
          type: 'edit',
          faqId: record.id,
          current: current
        }
      })
    },
    // 勾选事件
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 发布
    async clickRelease () {
      const params = {
        field: 'issue',
        ids: this.selectedRowKeys,
        value: 1
      }
      const res = await this.FAQMObj.coreBatchUpdateField(params)
      console.log('发布res====', res)
      this.selectedRowKeys = []
      this.getDataSource()
    },
    // 删除
    async clickDelete () {
      const _this = this
      this.$confirm({
        title: '删除后不可恢复，是否确认删除？',
        onOk () {
          setTimeout(async () => {
            const ids = _this.selectedRowKeys.join()
            const res = await _this.FAQMObj.coreDelete(ids)
            console.log('删除res====', res)
            _this.selectedRowKeys = []
            _this.getDataSource()
          }, 100)
        },
        onCancel () {

        },
        class: 'click-delete'
      })
    },
    // 添加FAQ
    addFAQ () {
      if (!this.sortTree) {
        this.$warning({
          title: '请先添加FAQ分类'
        })
      } else {
        const current = this.current
        this.$router.push({
          name: 'FaqOperation',
          query: {
            type: 'add',
            current: current
          }
        })
      }
    },
    // 点击标题
    clickTitle (record) {
      // 打开一个新的窗口
      // this.$message.warning('暂时测试，具体地址还木有。')
      window.open('http://cnbi.yunzhinang.net/')
    },
    // 点击数量
    clickCount (record) {
      console.log('跳转页面')
      this.$emit('jump', record.id)
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
  .table-top{
    height: 40px;
    border-radius:4px;
    background:rgba(28,108,225,0.1);
    border:1px solid rgba(28,108,225,0.5019607843137255);
    margin: 14px 24px 0 32px;
    opacity:1;
    display: flex;
    flex-direction: row;
    padding-top: 10px;
  }
</style>
