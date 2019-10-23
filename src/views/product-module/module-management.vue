<template>
  <!-- <h1>模块管理 ModuleManagement</h1> -->
  <div>
    <!--头部-->
    <div style="display: flex;flex-direction: row;justify-content: space-between">
      <div style="display: flex;flex-direction: row">
        <common-drop-down :result="result"
                          :defaultValue="defaultValue"
                          @selectCell="selectCell"
                          class="com-drop-down">
        </common-drop-down>
        <!--搜索框-->
        <common-search :placeholder="version"
                       style="width: 220px"></common-search>
      </div>
      <common-button @addClick="addClick"
                     @deleteClick="deleteClick"
                     :name1="name1"
                     :name2="name2">
      </common-button>
    </div>
    <!--表格-->
    <a-table bordered
             :columns="columns"
             :dataSource="dataSource"
             :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <template slot="enable"
                slot-scope="text, record">
        <!--1代表开-->
        <a-switch :defaultChecked="record.enable==1?true:false"
                  @change="updataState(record)" />
      </template>
      <template slot="bianji"
                slot-scope="text, record">
        <!--1代表开-->
        <span @click="btnClick(record.key)">编辑</span>
      </template>
    </a-table>
    <!--添加模块-->
    <a-modal v-model="showAddModule"
             title="添加模块">
      <a-form :form="form">
        <a-row :gutter="24"
               class="row1">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称"
                       v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="服务标识">
              <a-input placeholder="请输入服务标识"
                       v-decorator="['serviceId',{rules: [{ required: true, message: '服务标识不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24"
               class="row2">
          <a-col :span="12">
            <a-form-item label="上级目录">
              <a-select v-decorator="[
                  'pid',
                  { rules: [{ required: true, message: '请选择上级目录' }] },
                ]"
                        placeholder="请选择">
                <template slot="suffixIcon">
                  <img style="width: 12px;"
                       src="../../assets/icons/paixu.svg" />
                </template>
                <!-- 功能的选择框 -->
                <a-select-option v-if="type==2"
                                 v-for="(item,index) in cardArr"
                                 :key="index">
                  {{item}}
                </a-select-option>
                <!-- 模块的选择框 -->
                <a-select-option v-if="type==4"
                                 v-for="(item,index) in moduleArr"
                                 :key="index">
                  {{item}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型">
              <a-select v-decorator="[
                  'type',
                  { rules: [{ required: true, message: '请选择类型' }] },
                ]"
                        @change="changeType"
                        placeholder="请选择">
                <template slot="suffixIcon">
                  <img style="width: 12px;"
                       src="../../assets/icons/paixu.svg" />
                </template>
                <a-select-option value="2">
                  功能
                </a-select-option>
                <a-select-option value="4">
                  模块
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
             title="编辑">
      <a-form :form="form">
        <a-row :gutter="24"
               class="row1">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称"
                       v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="服务标识">
              <a-input placeholder="请输入服务标识"
                       v-decorator="['serviceId',{rules: [{ required: true, message: '服务标识不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24"
               class="row2">
          <a-col :span="12">
            <a-form-item label="上级目录">
              <a-select v-decorator="[
                  'pid',
                  { rules: [{ required: true, message: '请选择上级目录' }] },
                ]"
                        placeholder="请选择">
                <template slot="suffixIcon">
                  <img style="width: 12px;"
                       src="../../assets/icons/paixu.svg" />
                </template>
                <!-- 功能的选择框 -->
                <a-select-option v-if="type==2"
                                 v-for="(item,index) in cardArr"
                                 :key="index">
                  {{item}}
                </a-select-option>
                <!-- 模块的选择框 -->
                <a-select-option v-if="type==4"
                                 v-for="(item,index) in moduleArr"
                                 :key="index">
                  {{item}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型">
              <a-select v-decorator="[
                  'type',
                  { rules: [{ required: true, message: '请选择类型' }] },
                ]"
                        placeholder="请选择">
                <template slot="suffixIcon">
                  <img style="width: 12px;"
                       src="../../assets/icons/paixu.svg" />
                </template>
                <a-select-option value="2">
                  功能
                </a-select-option>
                <a-select-option value="4">
                  模块
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
      type: '',
      LicenseMObj: null,
      cardArr: [],//应用（功能）数组
      moduleArr: [],//模块数组
      ModuleMObj: null,
      all: '全部',
      version: '模块搜索',
      name1: '添加',
      name2: '删除',
      defaultValue: '0',
      result: [
        { name: '全部', key: '0' },
        { name: '名称', key: 'name' },
        { name: '类型', key: 'type' },
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
          title: '服务标识',
          dataIndex: 'serviceId',
          width: '12%',
          key: 'serviceId'
        }, {
          title: '更新时间',
          dataIndex: 'updateTime',
          width: '12%',
          key: 'updateTime'
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
      selectedRowKeys: [],
      showAddModule: false,
      showEditModule: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.LicenseMObj = new CnbiLicenseManagement()
    this.ModuleMObj = new CnbiModuleManagement()
    this.getData()
    this.getArrData()
  },
  methods: {
    changeType (type) {
      this.type = type
    },
    //获取功能和模块的数组列表方法
    async getArrData () {
      //获取应用数组
      const cardArr = await this.LicenseMObj.getResourcesCard();
      // console.log(cardArr, '0000000')
      this.cardArr = cardArr.map(item => item.name);
      //获取模块数组
      const moduleArr = await this.LicenseMObj.getResourcesModule();
      this.moduleArr = moduleArr.map(item => item.name);

    },
    //加载页面 获取数据
    async getData () {
      const data = await this.ModuleMObj.getResourcesTree();
      data.forEach(item => {
        // debugger
        var oDate = new Date(item.updateTime * 1)
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
        item.updateTime = oTime
      })
      console.log(data, '年少不知')
      this.dataSource = data
    },
    //添加按钮触发事件
    addClick () {
      this.showAddModule = true
    },
    //删除按钮触发事件
    deleteClick () { alert('456') },
    selectCell (val) {
      console.log(val)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    //修改模块状态的点击事件
    async updataState (record) {
      //调用切换状态接口方法
      await this.ModuleMObj.openResource(record.id * 1, (record.enable - 1 == 0 ? 0 : 1))
      //及时刷新数据
      await this.getData();
    },
    btnClick (key) {
      // this.$message.success('操作成功')
      this.showEditModule = true
    },

    //添加弹框的确定按钮
    async saveModule () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        debugger
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          await _this.ModuleMObj.saveResource(formData)

          //重新加载最新的数据
          await _this.getData();
        }
        _this.showAddModule = false
      })
    },
    cancelSave () {
      this.showAddModule = false
    },
    cancelEdit () {
      this.showEditModule = false
    },

    //编辑弹框的确认按钮
    async saveEdit () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        debugger
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          await _this.ModuleMObj.updateResource(formData)
          //重新加载最新的数据
          await _this.getData();
        }
        _this.showEditModule = false
      })
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
</style>
