<template>
  <div>
    <div style="display: flex;flex-direction: row;justify-content: space-between;background-color: #fff;padding: 16px 32px 0 32px">
      <div style="display: flex;flex-direction: row">
        <common-drop-down
          :result="result"
          :defaultValue="defaultValue"
          @selectCell="selectCell"
          class="com-drop-down">
        </common-drop-down>
        <!--搜索框-->
        <common-search
          :placeholder="'请输入'"
          style="width: 220px"
          @inputHandler="inputHandler">
        </common-search>
      </div>

      <common-button
        @addClick="addClick"
        @deleteClick="deleteClick"
        :name1="name1"
        :name2="name2"
        :title="'删除后可能会影响使用功能的使用，您确定继续？'"
        :disabled="selectedRowKeys.length>0?true:false">
      </common-button>
    </div>
    <!--表格-->
    <a-table
      size="small"
      class="limit-table"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="setKey"
      :pagination="pagination"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <template
        slot="zhuangtai"
        slot-scope="text, record">
        <!--1代表开-->
        <a-switch
          :defaultChecked="record.enable==1?true:false"
          @change="updataState(record)" />
      </template>
      <template
        slot="bianji"
        slot-scope="text, record">
        <!--1代表开-->
        <div style="display: flex;justify-content: space-around">
          <span @click="btnClick(record)"><a-icon type="edit" title="编辑" style="cursor: pointer;"></a-icon></span>
          <span @click="btnAddClick(record)"><a-icon type="plus" title="添加功能" style="cursor: pointer;"></a-icon></span>
        </div>
      </template>
    </a-table>
    <!--添加权限-->
    <a-modal
      v-model="showAddLimit"
      :destroyOnClose="true"
      title="新增权限"
      :width="350">
      <a-form :form="form">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input
            placeholder="请输入权限路由"
            v-decorator="['route',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="访问路由">
          <a-input
            placeholder="请输入访问路由"
            v-decorator="['url',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item
          label="状态"
          style="display: flex">
          <a-switch defaultChecked />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelAddLimit"
            style="margin-right: 32px;">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveAddLimit">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--编辑权限-->
    <a-modal
      v-model="showEditLimit"
      title="编辑权限"
      :width="350">
      <a-form :form="form1">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input
            placeholder="请输入权限路由"
            v-decorator="['route',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="访问路由">
          <a-input
            placeholder="请输入访问路由"
            v-decorator="['url',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelEditLimit"
            style="margin-right: 32px;">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveEditLimit">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--添加功能-->
    <a-modal
      v-model="showAddFeatures"
      :destroyOnClose="true"
      title="新增权限"
      :width="350">
      <a-form :form="form2">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input
            placeholder="请输入权限路由"
            v-decorator="['route',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="访问路由">
          <a-input
            placeholder="请输入访问路由"
            v-decorator="['url',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="类型">
          <a-select
            style="width: 200px;"
            @change="changeType"
            v-decorator="['type',{rules: [{ required: true, message: '请选择类型!' }],}]">
            <template slot="suffixIcon">
              <img
                style="width: 12px;"
                src="../../assets/icons/paixu.svg" />
            </template>
            <a-select-option value="1">
              目录
            </a-select-option>
            <a-select-option value="2">
              功能
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="状态"
          style="display: flex">
          <a-switch defaultChecked />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelAddLimit"
            style="margin-right: 32px;">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveAddLimit">
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
      selectVal: 'name',
      menuArr: [], // 应用（功能）数组
      moduleArr: [], // 模块数组
      type: '',
      editId: null, // 点击编辑的时候该行数据对应的id
      dataOld: [], // 拷贝获取的原有数据
      showAddLimit: false, // 添加权限
      showEditLimit: false, // 编辑权限
      showAddFeatures: false, // 添加功能
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      name1: '添加',
      name2: '删除',
      result: [
        { name: '名称', key: 'name' },
        { name: '类型', key: 'type' },
        { name: '权限路由', key: 'route' },
        { name: '访问路由', key: 'url' }
      ],
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
          width: '12%'
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
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
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
      // 获取模块数组
      this.menuArr = await this.LimitMObj.getResourcesMenu()
    },
    // 选择类型时触发的事件
    changeType (type) {
      this.type = type
    },
    // 加载页面 获取数据
    async getData () {
      const data = await this.LimitMObj.getResourcesTree()
      // data.forEach(item => {
      //   var oDate = new Date(item.updateTime * 1)
      //   var oYear = oDate.getFullYear()
      //   var oMonth = oDate.getMonth() + 1
      //   var oDay = oDate.getDate()
      //   if (oMonth < 10) {
      //     oMonth = '0' + oMonth
      //   }
      //   if (oDay < 10) {
      //     oDay = '0' + oDay
      //   }
      //   var oTime = oDay + '/' + oMonth + '/' + oYear
      //   item.updateTime = oTime
      // })
      this.dataSource = data

      // 拷贝数据
      this.dataOld = this.deepCopy(this.dataSource)
      console.log(data, '死死死isisis')
    },

    // 模糊查询的第一个框的选择事件
    selectCell (val1) {
      this.selectVal = val1
    },

    // 点击搜索框的事件
    async inputHandler (val2) {
      debugger
      if (!val2) {
        this.dataSource = this.dataOld
      } else {
        debugger
        this.dataSource = await this.LimitMObj.searchResources(this.selectVal, val2, 4)
      }
    },

    // 添加按钮的点击事件
    addClick () {
      this.showAddLimit = true
    },
    btnAddClick (record) {
      this.showAddFeatures = true
    },
    // 删除按钮触发事件
    async deleteClick () {
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      // 1.如果没有勾选就点击删除按钮，提示框
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      await this.LimitMObj.deleteResource(this.selectedRowKeys, 3)
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
    },

    // 添加弹框的取消事件
    cancelAddLimit () {
      this.showAddLimit = false
    },

    // 添加弹框的保存按钮事件
    async saveAddLimit () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          await _this.LimitMObj.saveResource(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showAddLimit = false
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
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.id = this.editId
          // formData.type = 3
          await _this.LimitMObj.updateResource(formData)
          // 重新加载最新的数据
          await _this.getData()
        }
        _this.showEditLimit = false
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
  .limit-table{
    background-color: #fff;
  }
</style>
