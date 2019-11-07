<template>
  <div>
    <div style="display: flex;flex-direction: row;justify-content: space-between;background-color: #fff;padding: 16px 32px 0 32px">
      <div style="display: flex;flex-direction: row">
        <!-- 类型的选择框 -->
        <common-drop-down :result="result1"
                          :defaultValue="defaultValue1"
                          @selectCell="selectCell1"
                          class="com-drop-down">
        </common-drop-down>
        <common-drop-down :result="result"
                          :defaultValue="defaultValue"
                          @selectCell="selectCell"
                          class="com-drop-down">
        </common-drop-down>

        <!--搜索框-->
        <common-search :placeholder="'请输入'"
                       style="width: 220px"
                       @inputHandler="inputHandler">
        </common-search>
      </div>

      <common-button @addClick="addClick"
                     @deleteClick="deleteClick"
                     :name1="name1"
                     :name2="name2"
                     :title="'删除后可能会影响使用功能的使用，您确定继续？'"
                     :disabled="selectedRowKeys.length>0?true:false">
      </common-button>
    </div>
    <!--表格-->
    <a-table size="small"
             class="limit-table"
             :columns="columns"
             :dataSource="dataSource"
             :rowKey="setKey"
             :pagination="pagination"
             :scroll="{y:'calc(100vh - 311px)' }"
             :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <template slot="zhuangtai"
                slot-scope="text, record">
        <!--1代表开-->
        <a-switch :defaultChecked="record.enable==1?true:false"
                  @change="updataState(record)" />
      </template>
      <template slot="bianji"
                slot-scope="text, record">
        <!--1代表开-->
        <div style="display: flex;justify-content: space-around">
          <span @click="btnClick(record)">
            <img style="cursor: pointer;"
                 src="@icons/Icon.svg"
                 title="编辑" />
          </span>
          <span @click="btnAddClick(record)">
            <img style="cursor: pointer;"
                 src="@icons/add.svg"
                 title="添加" />
          </span>
        </div>
      </template>
    </a-table>
    <!--添加权限-->
    <a-modal v-model="showAddLimit"
             :destroyOnClose="true"
             :maskClosable="false"
             title="新增权限"
             :width="350">
      <a-form :form="form"
              autocomplete="off">
        <a-form-item label="名称">
          <a-input placeholder="请输入名称"
                   v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input placeholder="请输入权限路由"
                   v-decorator="['route',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="访问路由">
          <a-input placeholder="请输入访问路由"
                   v-decorator="['url',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="上级目录">
          <!-- <a-input placeholder="请选择上级目录"
                   v-decorator="['pid',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" /> -->

          <a-select style="width: 200px"
                    v-decorator="[
                  'pid',
                  { rules: [{ required: true, message: '请选择上级目录' }]},]"
                    placeholder="请选择上级目录">
            <template slot="suffixIcon">
              <img src="@icons/sort.svg" />
            </template>
            <template>
              <a-select-option value="0">无 </a-select-option>
            </template>
            <template>

              <a-select-option v-for="(item,index) in menuArr"
                               :key="index"
                               :value="item.code">
                {{ item.name }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
        <a-form-item label="状态"
                     style="display: flex">
          <a-switch defaultChecked />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button key="back"
                    @click="cancelAddLimit"
                    style="margin-right: 32px;">取消</a-button>
          <a-button key="submit"
                    type="primary"
                    @click="saveAddLimit">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--编辑权限-->
    <a-modal v-model="showEditLimit"
             :maskClosable="false"
             v-if="editLimit"
             title="编辑权限"
             :width="350">
      <a-form :form="form1"
              autocomplete="off">
        <a-form-item label="名称">
          <a-input placeholder="请输入名称"
                   v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],initialValue:editLimit.name}]" />
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input placeholder="请输入权限路由"
                   v-decorator="['route',{rules: [{ required: true, message: '权限路由不能为空!' }],initialValue:editLimit.route}]" />
        </a-form-item>
        <a-form-item label="访问路由">
          <a-input placeholder="请输入访问路由"
                   v-decorator="['url',{rules: [{ required: true, message: '访问路由不能为空!' }],initialValue:editLimit.url}]" />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button key="back"
                    @click="cancelEditLimit"
                    style="margin-right: 32px;">取消</a-button>
          <a-button key="submit"
                    type="primary"
                    @click="saveEditLimit">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--添加功能-->
    <a-modal v-model="showAddFeatures"
             :maskClosable="false"
             :destroyOnClose="true"
             title="新增权限"
             :width="350">
      <a-form :form="form2"
              autocomplete="off">
        <a-form-item label="名称">
          <a-input placeholder="请输入名称"
                   v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input placeholder="请输入权限路由"
                   v-decorator="['route',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="访问路由">
          <a-input placeholder="请输入访问路由"
                   v-decorator="['url',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="状态"
                     style="display: flex">
          <a-switch defaultChecked />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button key="back"
                    @click="cancelAddLimit1"
                    style="margin-right: 32px;">取消</a-button>
          <a-button key="submit"
                    type="primary"
                    @click="saveAddLimit1">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import CnbiModuleManagement from '@/classes/lib/CnbiModuleManagement'
import CommonButton from '@/components/system/common-button'
import CommonSearch from '@/components/system/common-search'
import CommonDropDown from '@/components/system/common-drop-down'
import AFormItem from 'ant-design-vue/es/form/FormItem'
export default {
  components: {
    AFormItem,
    CommonButton,
    CommonSearch,
    CommonDropDown
  },
  name: 'LimitManagement',
  data () {
    return {
      LimitMObj: null,
      selectedRowKeys: [],
      defaultValue: 'name',
      defaultValue1: '目录',
      selectVal: 'name',
      selectVal1: 1,
      menuArr: [], // 应用（功能）数组
      moduleArr: [], // 模块数组
      type: '',
      editId: null, // 点击编辑的时候该行数据对应的id
      editLimit: null, // 需要编辑的权限
      dataOld: [], // 拷贝获取的原有数据
      showAddLimit: false, // 添加权限
      showEditLimit: false, // 编辑权限
      showAddFeatures: false, // 添加功能
      newPid: null,//点击添加功能时获得的当前code，作为新添加权限的pid
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      name1: '添加',
      name2: '删除',
      result: [
        { name: '名称', key: 'name' },
        { name: '权限路由', key: 'route' },
        { name: '访问路由', key: 'url' }
      ],
      result1: [{ name: '目录', key: 1 }, { name: '功能', key: 2 }],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: '12%',
          customRender (text, record, index) {
            if (text == 1) {
              text = '目录'
            } else {
              text = '功能'
            }
            return text
          }
        },
        {
          title: '权限路由',
          dataIndex: 'route',
          width: '12%',
          key: 'route'
        },
        {
          title: '访问路由',
          dataIndex: 'url',
          width: '12%',
          key: 'url'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          width: '12%',
          key: 'updateTime',
          customRender (text, record, index) {
            var oDate = new Date(text * 1)
            var oYear = oDate.getFullYear()
            var oMonth = oDate.getMonth() + 1
            var oDay = oDate.getDate()
            if (oMonth < 10) {
              oMonth = '0' + oMonth
            }
            if (oDay < 10) {
              oDay = '0' + oDay
            }
            var oTime = oDay + '/' + oMonth + '/' + oYear
            text = oTime
            return text
          }
        },
        {
          title: '状态',
          dataIndex: 'enable',
          scopedSlots: { customRender: 'zhuangtai' },
          width: '12%',
          key: 'enable'
        },
        {
          title: '操作',
          dataIndex: 'gd',
          width: '5%',
          scopedSlots: { customRender: 'bianji' }
        }
      ],
      dataSource: [],
      pagination: {
        pageSize: 20,
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['20', '50', '100'],
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize,
        total: 0 // 总条数
      }
    }
  },
  created () {
    this.LimitMObj = new CnbiModuleManagement()
    this.getData()
    this.getArrData()
  },
  methods: {
    // 获取功能和模块的数组列表方法
    async getArrData () {
      // 获取应用数组
      this.moduleArr = await this.LimitMObj.findSystemModule()


    },
    // 加载页面 获取数据
    async getData () {
      const data = await this.LimitMObj.getResourcesTree()
      this.dataSource = data

      // 拷贝数据
      this.dataOld = this.deepCopy(this.dataSource)
    },

    // 模糊查询的第一个框的选择事件
    selectCell (val1) {
      this.selectVal = val1
    },
    // 模糊查询的第三个选择类型的事件
    selectCell1 (val3) {
      this.selectVal1 = val3
    },
    // 点击搜索框的事件
    async inputHandler (val2) {
      if (!val2) {
        this.dataSource = this.dataOld
      } else {
        this.dataSource = await this.LimitMObj.searchResources(this.selectVal, val2, this.selectVal1)
      }
    },

    // 添加按钮的点击事件
    async addClick () {
      // 获取模块数组
      this.menuArr = await this.LimitMObj.getResourcesMenu()
      console.log(this.menuArr, '长城之上是千亿的星空')
      this.showAddLimit = true
    },
    //添加功能按钮的点击事件
    btnAddClick (record) {
      console.log(record, '羌笛吹落梅，让人分不清异乡和故里')
      this.showAddFeatures = true
      this.newPid = record.code
    },
    // 删除按钮触发事件
    async deleteClick () {
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      // 1.如果没有勾选就点击删除按钮，提示框
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      await this.LimitMObj.batDeleteAuthority(this.selectedRowKeys)
      // 4.删除成功后，及时更新数据，清除勾选图标
      await this.getData()
      this.selectedRowKeys = []
    },

    // 删除的勾选事件
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    // 设置每行id为主键
    setKey (record) {
      return record.id
    },

    // 修改权限状态的点击事件
    async updataState (record) {
      // 调用切换状态接口方法
      await this.LimitMObj.openResource(record.id * 1, (record.enable - 1 == 0 ? 0 : 1))
      // 及时刷新数据
      await this.getData()
    },

    // 编辑按钮的点击事件
    btnClick (record) {
      this.showEditLimit = true
      this.editId = record.id * 1
      this.editLimit = record
    },

    // (一级目录（大添加按钮的）)添加弹框的取消事件
    cancelAddLimit () {
      this.showAddLimit = false
    },

    // (一级目录（大添加按钮的）)添加弹框的保存按钮事件
    async saveAddLimit () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.type = 1
          await _this.LimitMObj.saveResource(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showAddLimit = false
        }
      })
    },

    // （次级目录）添加弹框的取消事件
    cancelAddLimit1 () {
      this.showAddFeatures = false
    },

    // （次级目录）添加弹框的保存按钮事件
    async saveAddLimit1 () {
      const _this = this
      _this.form2.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.type = 2
          formData.pid = this.newPid
          await _this.LimitMObj.saveResource(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showAddFeatures = false
        }
      })
    },
    // 编辑弹框的取消事件
    cancelEditLimit () {
      this.showEditLimit = false
    },
    // 编辑弹框的确认事件
    async saveEditLimit () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.id = this.editId
          await _this.LimitMObj.updateResource(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showEditLimit = false
        }
      })
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
    }
  }
}
</script>

<style scoped>
.com-drop-down {
  width: 120px;
  margin-right: 32px;
}
.com-drop-down-two{
  width: 120px;
}
.ant-form-item {
  margin-bottom: 0;
}
.ant-form-item input {
  width: 200px;
}
form {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  margin: 0 32px;
}
/deep/.ant-modal-footer {
  display: flex;
}
.limit-table {
  background-color: #fff;
}
</style>
