<template>
  <!--分类管理-->
  <div >
    <div style="margin-top: 24px ; background-color: #FFF;display: flex;flex-direction: column">
      <div style="display: flex;flex-direction: row-reverse">
        <a-button
          class="button_style_one"
          type="primary"
          @click="showAddFaq = true"
        >
          <div style="margin: 6px 0">
            <a-icon type="cloud-upload" style="margin-right: 10px;"/>添加FAQ分类
          </div>
        </a-button>
      </div>
      <div>
        <!--表格-->
        <a-table
          class="user-table"
          size="small"
          :rowKey="setKey"
          :columns="columns"
          :dataSource="sortTree"
          :scroll="{y:'calc(100vh - 331px)' }"
          :pagination="pagination"
        >
          <template slot="action" slot-scope="text,record">
            <div>
              <a-dropdown :trigger="['click']">
                <span><img src="@icons/4574.svg"/></span>
                <a-menu slot="overlay">
                  <a-menu-item key="0">
                    <span @click="editSort(record)">
                      <img src="@icons/Icon.svg" style="margin-right: 8px;"/> 修改
                    </span>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <span @click="deleteSort(record)">
                      <img src="@icons/Group39.svg" style="width: 20px ;height: 20px;margin-right: 8px;"/> 删除
                    </span>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </template>
        </a-table>
      </div>
      <!--添加-->
      <div >
        <a-modal
          v-model="showAddFaq"
          :destroyOnClose="true"
          :maskClosable="false"
          :width="350"
          title="添加FAQ分类">
          <a-form
            :form="form"
            autocomplete="off">
            <a-form-item label="FAQ分类名称">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'text',
                  { rules: [{ required: true, message: '请输入FAQ分类名称且不超过32位！' ,max:32}] },
                ]" />
            </a-form-item>
            <a-form-item label="关键字">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'keyword',
                  { rules: [{ required: true, message: '请输入关键字且不超过32位！' ,max:32}] },
                ]" />
            </a-form-item>
            <a-form-item label="FAQ分类位置">
              <a-tree-select
                style="width: 300px"
                v-decorator="[
                  'pid',
                  { rules: [{ required: true, message: '必填项' }] },
                ]"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择"
                :treeData="addsortTree"
              >
              </a-tree-select>
            </a-form-item>
          </a-form>
          <template slot="footer">
            <div class="apply-add-foot" style="display: flex;padding: 0 8px;">
              <a-button
                key="back"
                class="cancel"
                @click="showAddFaq=false">
                取消
              </a-button>
              <a-button
                key="submit"
                class="save"
                type="primary"
                @click="saveFaq">
                <a-icon type="cloud-upload" /> 保存
              </a-button>
            </div>
          </template>
        </a-modal>
      </div>
      <!--编辑-->
      <div v-if="editFaq">
        <a-modal
          v-model="showEditFaq"
          :destroyOnClose="true"
          :maskClosable="false"
          :width="350"
          title="编辑FAQ">
          <a-form
            :form="form1"
            autocomplete="off">
            <a-form-item label="FAQ分类名称">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'text',
                  { rules: [{ required: true, message: '请输入FAQ分类名称且不超过32位！',max:32 }],initialValue:editFaq.text },
                ]" />
            </a-form-item>
            <a-form-item label="关键字">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'keyword',
                  { rules: [{ required: true, message: '请输入关键字且不超过32位！',max:32 }],initialValue:editFaq.keyword },
                ]" />
            </a-form-item>
            <a-form-item label="FAQ分类位置">
              <a-tree-select
                style="width: 300px"
                v-decorator="[
                  'pid',
                  { rules: [{ required: true, message: '必填项' }],initialValue:editFaq.pid },
                ]"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择分类位置"
                :treeData="editSortTree"
              >
              </a-tree-select>
            </a-form-item>
          </a-form>
          <template slot="footer">
            <div class="apply-add-foot" style="display: flex;padding: 0 8px;">
              <a-button
                key="back"
                class="cancel"
                @click="editFaq=false">
                取消
              </a-button>
              <a-button
                key="submit"
                class="save"
                type="primary"
                @click="saveEditFaq">
                <a-icon type="cloud-upload" /> 保存
              </a-button>
            </div>
          </template>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import CnbiFAQManagement from '@/classes/lib/CnbiFAQManagement'
export default {
  name: 'SortManagement',
  data () {
    return {
      visible: false,
      active: '',
      pagination: {
        pageSize: 20,
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['20', '50', '100'],
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize,
        total: 0 // 总条数
      },
      columns: [
        {
          title: 'FQA分类名称',
          dataIndex: 'text',
          width: '50%'
        },
        {
          title: 'FQA数量',
          dataIndex: 'faqCount',
          width: '40%'
        },
        {
          title: '操作',
          dataIndex: '',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [
        {
          id: 1,
          text: '111',
          faqCount: 111,
          children: []
        },
        {
          id: 2,
          text: '111',
          faqCount: 111
        },
        {
          id: 3,
          text: '111',
          faqCount: 111
        },
        {
          id: 4,
          text: '111',
          faqCount: 111
        }
      ],
      showAddFaq: false, // 添加FAQ
      showEditFaq: false, // 编辑FAQ
      editFaq: null,
      form: this.$form.createForm(this), // 添加
      form1: this.$form.createForm(this), // 编辑
      sortTree: [], // 树形分类结构
      addsortTree: [], // 添加FAQ时用
      editSortTree: [],
      expandedKeys: [], // 展开指定的树节点
      autoExpandParent: false // 是否自动展开父节点
    }
  },
  created () {
    console.log('FAQ----created')
    this.FAQMObj = new CnbiFAQManagement()
    // this.getDataSource(1, this.pageSize)
    this.getDataTree()
  },
  mounted () {
  },
  methods: {
    setKey (record) {
      return record.id
    },
    // 查询表格数据
    async getDataSource (page, size) {
      const _this = this
      const pid = 0 // 只查父级
      const res = await this.FAQMObj.categoryFindPage(page, size, pid)
      if (res.code === 200) {
        _this.total = res.data.totalElements
        const dataSource = []
        res.data.data.forEach((row) => {
          const obj = row
          if (row.leaf == 0) {
            obj.children = []
          }
          dataSource.push(obj)
        })
        _this.dataSource = dataSource
      }
    },
    // 查询分类位置 树形结构
    async getDataTree () {
      const res = await this.FAQMObj.categoryFindTree()
      if (res.code === 200) {
        console.log('查询分类位置====', res)
        this.sortTree = res.data
        this.pagination.total = res.data.length
        this.remakeTreeData(res.data)
        const obj = [{
          title: '顶级分类',
          value: '0',
          key: '0'
        }]
        this.addsortTree = obj.concat(this.sortTree)
      }
      console.log('查询分类位置 树形结构=======', this.sortTree)
    },
    /* 设置 key value title */
    remakeTreeData (data) {
      data.forEach((item) => {
        item['title'] = item.text
        item['value'] = item.code
        item['key'] = item.code
        if (item.leaf == 1 && item.children && item.children.length == 0) {
          delete item.children
        }
        if (item.children && item.children.length > 0) {
          this.remakeTreeData(item.children)
        }
      })
    },

    // 编辑FAQ
    editSort (record) {
      this.editFaq = record
      this.showEditFaq = true
      this.visible = false
      this.active = ''
      // this.changTree(record)
      const obj = [{
        title: '顶级分类',
        value: '0',
        key: '0'
      }]
      this.editSortTree = obj.concat(this.deepCopy(this.sortTree))

      this.changTree(this.editSortTree, record)
    },
    /**
     * 深拷贝
     */
    deepCopy (obj) { // 深拷贝
      const result = Array.isArray(obj) ? [] : {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] == null) {
            result[key] = null
          } else if (obj[key] == undefined) {
            result[key] = undefined
          } else if (typeof obj[key] === 'object') {
            result[key] = this.deepCopy(obj[key]) // 递归复制
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    },

    changTree (data, editFaq) {
      data.forEach((item) => {
        if (item.code == editFaq.code &&　item.pid == 0) {
          item['selectable'] = false
          if (item.children) {
            delete item.children
          }
        } else if (item.code == editFaq.code) {
          item['selectable'] = false
          delete item.children
        }
        if (item.children) {
          this.changTree(item.children, editFaq)
        }
      })
    },
    // 删除FAQ
    deleteSort (record) {
      this.active = ''
      const _this = this
      console.log(record)
      if (record.leaf === 0 || record.faqCount != 0) { // 0 表示分类下有内容不可删除
        this.$warning({
          title: '当前分类下有内容，不可删除'
        })
      } else {
        this.$confirm({
          title: '删除后不可恢复，是否确认删除？',
          async onOk () {
            setTimeout(async () => {
              const res = await _this.FAQMObj.categoryDelete(record.id)
              console.log('删除分类========', res)
              if (res.code === 200) {
                // _this.getDataSource(_this.current, _this.pageSize)
                _this.getDataTree()
              }
            }, 100)
          },
          onCancel () {
            console.log('Cancel')
          },
          class: 'test'
        })
      }
    },
    // 添加分类
    saveFaq () {
      const _this = this
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const res = await _this.FAQMObj.categorySave(values.keyword, values.pid, values.text)
          _this.showAddFaq = false
          console.log('添加分类=====', res)
          // _this.getDataSource(_this.current, _this.pageSize)
          _this.getDataTree()
        } else {
          console.log('cuowu')
        }
      })
    },
    // 更新FAQ
    saveEditFaq () {
      const _this = this
      this.form1.validateFields(async (err, values) => {
        if (!err) { // id, keyword, pid, text
          const id = _this.editFaq.id
          const params = {
            'datas': [
              {
                field: 'keyword',
                value: values.keyword
              }, {
                field: 'pid',
                value: values.pid
              },
              {
                field: 'text',
                value: values.text
              }
            ],
            'id': id
          }
          const res = await _this.FAQMObj.categoryUpdateByFileds(params)
          // const res = await _this.FAQMObj.categoryUpdate(id, values.keyword, values.pid, values.text)
          console.log('更新FAQ==', res)
          _this.editFaq = false
          // _this.getDataSource(_this.current, _this.pageSize)
          _this.getDataTree()
        } else {
          console.log('出错了更新FAQ')
        }
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
  .cancel{
    margin-right: 16px
  }
  .cancel:hover, .cancel:focus {
    color: #2D9C3C;
    border-color: #2D9C3C;
  }
  .save{
    border:1px solid rgba(45,156,60,1);
    background:linear-gradient(360deg,rgba(52,170,68,1) 0%,rgba(56,178,73,1) 100%);
    box-shadow:0px 1px 1px rgba(19,31,21,0.1);
    opacity:1;
    border-radius:4px
  }
  .ant-form-item{
    margin-bottom: 0;
  }
</style>
