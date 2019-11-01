<template>
  <!-- <h1>模块管理 ModuleManagement</h1> -->
  <div>
    <!--头部-->
    <div style="display: flex;flex-direction: row;justify-content: space-between;background-color: #fff;padding: 16px 32px 0 32px">
      <div style="display: flex;flex-direction: row">
        <common-drop-down :result="result"
                          :defaultValue="defaultValue"
                          @selectCell="selectCell"
                          class="com-drop-down">
        </common-drop-down>
        <!--搜索框-->
        <common-search :placeholder="version"
                       style="width: 220px"
                       @inputHandler="inputHandler"></common-search>
      </div>
      <common-button @addClick="addClick"
                     @deleteClick="deleteClick"
                     :disabled="selectedRowKeys.length>0?true:false"
                     :title="'删除后可能会影响使用功能的使用，您确定继续？'"
                     :name1="name1"
                     :name2="name2">
      </common-button>
    </div>
    <!--表格-->
    <a-table class="module-table"
             :pagination="pagination"
             size="small"
             :columns="columns"
             :dataSource="dataSource"
             :rowKey="setKey"
             :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <template slot="zhuangtai"
                slot-scope="text, record">
        <!--1代表开-->
        <a-switch :defaultChecked="record.enable==1?true:false"
                  @change="updataState(record)" />
      </template>
      <template slot="bianji"
                slot-scope="text, record">
        <span @click="btnClick(record)">
          <img style="margin-left: 16px;cursor: pointer;"
               src="@icons/Icon.svg"
               title="编辑">
        </span>
      </template>
    </a-table>
    <!--添加模块-->
    <a-modal v-model="showAddModule"
             :destroyOnClose="true"
             :maskClosable="false"
             title="添加模块">
      <a-form :form="form"
              autocomplete="off">
        <a-row :gutter="24"
               class="row1">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称"
                       v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="描述">
              <a-input placeholder="请输入描述"
                       v-decorator="['note']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24"
               class="row2">
          <a-col :span="12">
            <a-form-item label="所属应用">
              <a-select v-decorator="[
                  'serviceName',
                  { rules: [{ required: true, message: '请选择所属应用' }] },
                ]"
                        @change="selectApply"
                        placeholder="请选择所属应用">
                <template slot="suffixIcon">
                  <img src="@icons/sort.svg" />
                </template>
                <a-select-option v-for="(item,index) in cardArr"
                                 :key="index"
                                 v-if="item.enable==1"
                                 :value="item.serviceId">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="上级目录">
              <a-select v-decorator="[
                  'pid',
                  { rules: [{ required: true, message: '请选择上级目录' }],initialValue:'0'}
                ]"
                        placeholder="请选择">
                <template slot="suffixIcon">
                  <img src="@icons/sort.svg" />
                </template>
                <template>
                  <a-select-option value="0">
                    无
                  </a-select-option>
                </template>
                <a-select-option v-for="(item,index) in byServiceIdModuleArr"
                                 :key="index"
                                 :value="item.code">
                  {{ item.name }}
                </a-select-option>

              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24"
               class="row3">
          <a-col :span="12">
            <a-form-item label="权限路由">
              <a-input placeholder="请输入权限路由"
                       v-decorator="['route',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="访问路由">
              <a-input placeholder="请输入访问路由"
                       v-decorator="['url',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24"
               class="row4">
          <a-col :span="12">
            <a-form-item label="状态">
              <a-switch defaultChecked />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="back"
                  @click="cancelSave">取消</a-button>
        <a-button key="submit"
                  type="primary"
                  @click="saveModule">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
    <!--编辑模块-->
    <a-modal v-model="showEditModule"
             :destroyOnClose="true"
             :maskClosable="false"
             v-if="editModuleInfo"
             title="编辑">
      <a-form :form="form1"
              autocomplete="off">
        <a-row :gutter="24"
               class="row1">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称"
                       v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],initialValue:editModuleInfo.name}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="描述">
              <a-input placeholder="请输入描述"
                       v-decorator="['note',{initialValue:editModuleInfo.note}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24"
               class="row2">
          <a-col :span="12">
            <a-form-item label="所属应用">
              <a-select v-decorator="[
                  'serviceName',
                  { rules: [{ required: true, message: '请选择所属应用' }],initialValue:editModuleInfo.serviceName },
                ]"
                        placeholder="请选择所属应用"
                        @change="selectApply">
                <template slot="suffixIcon">
                  <img src="@icons/sort.svg" />
                </template>
                <a-select-option v-for="(item,index) in cardArr"
                                 :key="index"
                                 v-if="item.enable==1"
                                 :value="item.serviceId">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="上级目录">
              <a-select v-decorator="[
                  'pid',
                  { rules: [{ required: true, message: '请选择上级目录' }],initialValue:editModuleInfo.pid },
                ]"
                        placeholder="请选择">
                <template slot="suffixIcon">
                  <img src="@icons/sort.svg" />
                </template>
                <template>
                  <a-select-option value="0">无 </a-select-option>
                </template>
                <template>

                  <a-select-option v-for="(item,index) in byServiceIdModuleArr"
                                   :key="index"
                                   :value="item.code">
                    {{ item.name }}
                  </a-select-option>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24"
               class="row3">
          <a-col :span="12">
            <a-form-item label="权限路由">
              <a-input placeholder="请输入权限路由"
                       v-decorator="['route',{rules: [{ required: true, message: '权限路由不能为空!' }],initialValue:editModuleInfo.route}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="访问路由">
              <a-input placeholder="请输入访问路由"
                       v-decorator="['url',{rules: [{ required: true, message: '访问路由不能为空!' }],initialValue:editModuleInfo.url}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="back"
                  @click="cancelEdit">取消</a-button>
        <a-button key="submit"
                  type="primary"
                  @click="saveEdit">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
  </div>

</template>

<script>
import CnbiLicenseManagement from '@/classes/lib/CnbiLicenseManagement'
import CnbiModuleManagement from '@/classes/lib/CnbiModuleManagement'
import CommonButton from '@/components/system/common-button'
import CommonSearch from '@/components/system/common-search'
import CommonDropDown from '@/components/system/common-drop-down'

export default {
  components: {
    CommonButton,
    CommonDropDown,
    CommonSearch
  },
  name: 'ModuleManagement',
  data () {
    return {
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      editId: null, // 点击编辑的时候该行数据对应的id
      editModuleInfo: null, // 要编辑的模块信息
      serviceId: '',//选择的所属应用对应的编码
      selectApplyCode: null,//选择的所属应用对应的code
      byServiceIdModuleArr: [],//通过选择的应用查询出来的模块数组
      LicenseMObj: null,
      cardArr: [], // 应用（功能）数组
      moduleArr: [], // 模块数组
      ModuleMObj: null,
      all: '全部',
      version: '模块搜索',
      name1: '添加',
      name2: '删除',
      defaultValue: 'name',
      result: [
        { name: '名称', key: 'name' },
        { name: '所属应用', key: 'serviceName' },
        { name: '权限路由', key: 'route' },
        { name: '访问路由', key: 'url' },
        { name: '服务标识', key: 'serviceId' }

      ],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '所属应用',
          dataIndex: 'serviceName',
          key: 'serviceName',
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
          title: '服务标识',
          dataIndex: 'serviceId',
          width: '12%',
          key: 'serviceId'
        }, {
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
          title: '更多',
          dataIndex: 'gd',
          width: '5%',
          scopedSlots: { customRender: 'bianji' }
        }
      ],
      dataSource: [],
      dataOld: [], // 拷贝获取的原有数据
      selectedRowKeys: [],
      selectVal: 'name', // 搜素时选择的值
      showAddModule: false,
      showEditModule: false,
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this)
    }
  },
  created () {
    this.LicenseMObj = new CnbiLicenseManagement()
    this.ModuleMObj = new CnbiModuleManagement()
    this.getData()
    this.getArrData()
  },
  methods: {

    // 根据选择的应用 查询对应的上级目录 列表
    async selectApply (serviceName) {
      this.serviceId = serviceName
      //根据应用的serviceId，获取应用的code
      debugger
      let record = this.cardArr.filter(item => item.serviceId == this.serviceId)[0]
      this.selectApplyCode = record.code
      console.log(this.selectApplyCode, 'this.selectApplyCode11111111111')
      //查询应用下的模块
      const data = await this.ModuleMObj.findCardResources(this.serviceId);
      this.byServiceIdModuleArr = data
      console.log(data, '黄河入海流')
    },
    // 获取功能和模块的数组列表方法
    async getArrData () {
      // 获取应用数组
      this.cardArr = await this.LicenseMObj.getResourcesCard()
      // 获取模块数组
      this.moduleArr = await this.LicenseMObj.getResourcesModule()
    },
    // 加载页面 获取数据
    async getData () {
      const data = await this.ModuleMObj.getResourcesModule()
      this.dataSource = data

      // 拷贝数据
      this.dataOld = this.deepCopy(this.dataSource)
    },
    // 添加按钮触发事件
    addClick () {
      this.showAddModule = true
    },
    // 删除按钮触发事件
    async deleteClick () {
      // 1.如果没有勾选就点击删除按钮，提示框
      // if (this.selectedRowKeys.length == 0) {
      //   confirm('请勾选要删除的模块')
      //   return
      // }
      // if (this.selectedRowKeys.length > 0) {
      //   confirm('删除后可能会影响使用功能的使用，您确定继续？')
      // }
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      await this.ModuleMObj.batDeleteModel(this.selectedRowKeys)
      // 4.删除成功后，及时更新数据，清除勾选图标
      await this.getData()
      this.selectedRowKeys = []
    },

    // 模糊查询的第一个框的选择事件
    selectCell (val1) {
      this.selectVal = val1
    },

    // 点击搜索框的事件
    async inputHandler (val2) {
      if (!val2) {
        this.dataSource = this.dataOld
      } else {
        this.dataSource = await this.ModuleMObj.searchResources(this.selectVal, val2, 4)
      }
    },

    // 删除的勾选事件
    onSelectChange (selectedRowKeys, bb) {
      debugger
      this.selectedRowKeys = selectedRowKeys
    },
    // 设置每行id为主键
    setKey (record) {
      return record.id
    },

    // 修改模块状态的点击事件
    async updataState (record) {
      // 调用切换状态接口方法
      await this.ModuleMObj.openResource(record.id * 1, (record.enable - 1 == 0 ? 0 : 1))
      // 及时刷新数据
      await this.getData()
    },

    // 编辑按钮的点击事件
    btnClick (record) {
      // this.$message.success('操作成功')
      this.showEditModule = true
      this.editId = record.id * 1
      this.editModuleInfo = record
    },
    // 添加弹框的确定按钮
    async saveModule () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        debugger
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          if (formData.pid == '0') {
            formData.pid = this.selectApplyCode
            // console.log(formData.pid, '--formData.pid')
            // console.log(this.selectApplyCode, 'this.selectApplyCode2122222222222')
          }
          // console.log(formData, 'formData------')
          formData['type'] = 4
          await _this.ModuleMObj.saveResource(formData)

          // 重新加载最新的数据
          await _this.getData()
          _this.showAddModule = false
        }
      })
    },
    // 添加弹框的取消事件
    cancelSave () {
      this.showAddModule = false
    },
    // 编辑弹框的取消事件
    cancelEdit () {
      this.showEditModule = false
    },

    // 编辑弹框的确认按钮
    async saveEdit () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          if (formData.pid == '0') {
            formData.pid = this.selectApplyCode
          }
          formData.id = this.editId
          formData.type = 4
          await _this.ModuleMObj.updateResource(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showEditModule = false
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
.button_style {
  float: none;
}
.com-drop-down {
  width: 120px;
}
/deep/.row4 .ant-row .ant-form-item {
  display: flex;
}
.module-table {
  background-color: #fff;
}
</style>
