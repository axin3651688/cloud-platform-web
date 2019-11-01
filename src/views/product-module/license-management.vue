<template>
  <div>

    <div class="license">
      <!--表格-->
      <div class="license-header">
        <common-button
          :name1="name1"
          :name2="name2"
          :title="'删除牌照将会影响所有使用当前牌照的租户，确定要继续？'"
          :disabled="selectedRowKeys.length>0?true:false"
          @addClick="addClick"
          @deleteClick="deleteClick">
        </common-button>
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :dataSource="tableData"
          size="small"
          :rowKey="setKey"
          :expandRowByClick="true"
          :customRow="setRow"
          :expandedRowKeys="expandedRowKeys"
          :pagination="pagination"
        >
          <a-table-column
            title="版本"
            dataIndex="name"
            key="name">
            <template slot-scope="tags">
              <span>
                <a-tag
                  color="blue"
                  :key="tags">{{ tags }}</a-tag>
              </span>
            </template>
          </a-table-column>
          <a-table-column
            title="描述"
            key="note"
            width="30%">
            <template slot-scope="text, record">
              <span>{{ record.note }}</span>
            </template>
          </a-table-column>
          <a-table-column
            title="价格"
            dataIndex="price"
            key="price" />
          <a-table-column
            title="更新时间"
            dataIndex="updateTime"
            key="updateTime" />
          <a-table-column
            title="状态"
            key="enable">
            <template slot-scope="text, record">
              <!--1代表开-->
              <a-switch
                :defaultChecked="record.enable==1?true:false"
                @change="onChange(record)" />
            </template>
          </a-table-column>
          <a-table-column
            title="操作"
            key="action">
            <template slot-scope="text, record">
              <span
                @click="btnClick(record)"
                title="编辑">
                <img style="cursor: pointer;" src="@icons/Icon.svg" title="编辑">
              </span>
            </template>
          </a-table-column>
          <template slot="expandedRowRender">
            <div
              class="license-middle"
              v-if="expandedRowKeys.length>0">
              <div
                style="display: flex;flex-direction: column;flex-grow: 1;margin-left: 30px;"
                v-if="info">
                <div class="middle-a">
                  <span>创建公司最大个数：</span><span>{{ info.maxCompany }}</span>
                </div>
                <div class="middle-a">
                  <span>最创建多资源数：</span><span>{{ info.maxDesign }}</span>
                </div>
                <div class="middle-a">
                  <span>最多可用空间：</span><span>{{ info.maxMemory }}</span>
                </div>
              </div>
              <div style="display: flex;flex-direction: column;flex-grow: 2;">
                <div class="middle-a">
                  <span>最多用户数：</span><span>{{ info.maxUser }}</span>
                </div>
                <div class="middle-a">
                  <span>最大级别数：</span><span>{{ info.maxLevel }}</span>
                </div>
                <div class="middle-a">
                  <span>最多链接数：</span><span>{{ info.maxConnect }}</span>
                </div>
              </div>

            </div>
            <div class="license-foot">
              <!--服务地址-->
              <div class="license-foot-a">
                <div style="display: flex;flex-direction: row;justify-content: space-between;height: 50px;">
                  <div style="display: flex;flex-direction: row;align-items: center;margin-right: 10px">
                    <img src="@icons/dingwei.svg">数据源
                  </div>
                  <div style="display: flex;flex-direction: row;align-items: center;flex-grow: 1;justify-content: space-between;">
                    <div v-if="addressState">
                      <img style="margin-left: 16px;cursor: pointer;" src="@icons/Icon.svg" title="编辑" @click="addressState=false">
                    </div>
                    <div v-if="!addressState">
                      <a-button
                        class="button_style_one"
                        type="primary"
                        @click.prevent="updateAddress()">
                        <a-icon type="cloud-upload" />保存
                      </a-button>
                      <a-button
                        class="button_style_one"
                        @click.prevent="cancelAddress()">
                        取消
                      </a-button>
                    </div>
                  </div>
                </div>
                <div style="display: flex;flex-direction: row;overflow: hidden;flex-wrap:wrap;flex-grow: 1">
                  <!--info.dpTypes-->
                  <div
                    v-for="(item,index) in address"
                    :key="index">
                    <serve-address
                      :src="item.src"
                      :name="item.name"
                      :addressState="addressState"></serve-address>
                  </div>
                </div>
              </div>
              <!--数据源-->
              <div class="license-foot-a">
                <!--头部-->
                <div style="display: flex;flex-direction: row;justify-content: space-between;height: 50px;">
                  <div style="display: flex;flex-direction: row;align-items: center;margin-right: 10px">
                    <img src="../../assets/icons/shujuyuan.svg">应用
                  </div>
                  <div style="display: flex;flex-direction: row;align-items: center;flex-grow: 1;justify-content: space-between;">
                    <div v-if="dataSourceState">
                      <img style="margin-left: 16px;cursor: pointer;" src="@icons/Icon.svg" title="编辑" @click="dataSourceState=false">
                    </div>
                    <div v-if="!dataSourceState">
                      <a-button
                        class="button_style_one"
                        type="primary"
                        @click.prevent="updateDataSource()">
                        <a-icon type="cloud-upload" />保存
                      </a-button>
                      <a-button
                        class="button_style_one"
                        @click.prevent="cancelDataSource()">
                        取消
                      </a-button>
                    </div>
                  </div>
                </div>
                <!--内容-->
                <div style="display: flex;flex-direction: row;overflow: hidden;flex-wrap:wrap;flex-grow: 1">
                  <!--info.cards-->
                  <div
                    v-for="(item,index) in dataSource"
                    :key="index">
                    <data-source
                      :src="item.src"
                      :name="item.name"
                      :dataSourceState="dataSourceState"></data-source>
                  </div>
                </div>

              </div>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <!--添加牌照弹框-->
    <a-modal
      v-model="showLicenseModal"
      :maskClosable="false"
      :destroyOnClose="true"
      footer="">
      <a-steps
        :current="current"
        style="margin-top: 20px;"
        size="small">
        <a-step
          key="1"
          title="创建牌照" />
        <a-step
          key="2"
          title="牌照参数" />
        <a-step
          key="3"
          title="相关功能" />
        <a-step
          key="4"
          title="完成" />
      </a-steps>
      <!-- 添加牌照步骤一 -->
      <div
        class="steps-content"
        style="display: flex;justify-content: center"
        v-if="current==0">
        <a-form
          :form="form"
          autocomplete="off"
          @submit="oneSubmit">
          <a-form-item label="牌照名称:"><!--/^[0-9]{1,20}$/-->
            <a-input
              placeholder="请输入"
              v-decorator="[
                'name',
                { rules: [{ required: true ,message: '请输入牌照名称！' }] },
              ]" />
          </a-form-item>
          <a-form-item label="牌照描述:">
            <a-textarea
              placeholder="请输入"
              :rows="4"
              v-decorator="[
                'note',
                { rules: [{ required: true, message: '请输入牌照描述！' }] },
              ]" />
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit">
              下一步
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <!-- 添加牌照步骤二 -->
      <div
        class="steps-content"
        style="display: flex;justify-content: center"
        v-if="current==1">
        <a-form
          :form="form1"
          autocomplete="off"
          class="step1"
          @submit="handleSubmit">
          <a-form-item label="创建最大公司数:">
            <a-input
              placeholder="请输入"
              v-decorator="[
                'maxCompany',
                { rules: [{ required: true, pattern: /^[0-9]{1,8}$/, message: '请输入正整数且不超过8位！' }] },
              ]" />个
          </a-form-item>
          <a-form-item label="最多用户数:">
            <a-input
              placeholder="请输入"
              v-decorator="[
                'maxUser',
                { rules: [{ required: true, pattern: /^[0-9]{1,8}$/, message: '请输入正整数且不超过8位！' }] },
              ]" />个
          </a-form-item>
          <a-form-item label="创建最多资源数:">
            <a-input
              placeholder="请输入"
              v-decorator="[
                'maxDesign',
                { rules: [{ required: true, pattern: /^[0-9]{1,8}$/, message: '请输入正整数且不超过8位！' }] },
              ]" />个
          </a-form-item>
          <a-form-item label="最大级别数:">
            <a-input
              placeholder="请输入"
              v-decorator="[
                'maxLevel',
                { rules: [{ required: true, pattern: /^[0-9]{1,8}$/, message: '请输入正整数且不超过8位！' }] },
              ]" />级
          </a-form-item>
          <a-form-item label="最多可用空间:">
            <a-input
              placeholder="请输入"
              v-decorator="[
                'maxMemory',
                { rules: [{ required: true, pattern: /^[0-9]{1,8}$/, message: '请输入正整数且不超过8位！' }] },
              ]" />MB
          </a-form-item>
          <a-form-item label="最多链接数:">
            <a-input
              placeholder="请输入"
              v-decorator="[
                'maxConnect',
                { rules: [{ required: true, pattern: /^[0-9]{1,8}$/, message: '请输入正整数且不超过8位！' }] },
              ]" />个
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit">
              下一步
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <!-- 添加牌照步骤三 -->
      <div
        class="steps-content"
        style="display: flex;justify-content: center"
        v-if="current==2">
        <a-form
          :form="form2"
          autocomplete="off"
          @submit="threeSubmit">
          <a-form-item label="可用应用:">
            <a-select
              v-decorator="[
                'cards',
                { rules: [{ required: true, message: '请选择可用应用' }] },
              ]"
              placeholder="请选择"
              mode="multiple"
              @change="handleSelectChange">

              <a-select-option
                v-for="(item,index) in cardArr"
                :key="index"
                :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="可用模块:">
            <a-select
              style="width: 100%;min-width: 200px;"
              v-decorator="[
                'modules',
                { rules: [{ required: true, message: '请选择可用模块' }] },
              ]"
              placeholder="请选择"
              mode="multiple"
              @change="handleSelectChange">
              <a-select-option
                v-for="(item,index) in moduleArr"
                :key="index"
                v-if="item.enable==1"
                :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit">
              下一步
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <!-- 添加牌照步骤4 -->
      <div
        class="steps-content"
        style="display: flex;justify-content: center;flex-direction: column;align-items: center;"
        v-if="current==3">
        <div style="display: flex;flex-direction: column;align-items: center; justify-content: center;margin-top: 50px">
          <img
            style="width: 72px"
            src="../../assets/icons/wancheng.svg">
          <span>牌照创建成功</span>
        </div>
        <a-button
          type="primary"
          style="width: 100px;margin-top: 50px"
          @click="saveLicense"> 保存牌照</a-button>
      </div>
    </a-modal>
    <!--编辑牌照-->
    <a-modal
      v-model="editState"
      title="牌照编辑"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-form :form="form3" v-if="editLicenseInfo" autocomplete="off">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="牌照名称:">
              <a-input
                placeholder="请输入牌照名称"
                v-decorator="[
                  'name',
                  { rules: [{ required: true, message: '请输入牌照名称！' }],initialValue: editLicenseInfo.name},
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="最多创建资源数">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'maxDesign',
                  { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }],initialValue: editLicenseInfo.maxDesign },
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="描述">
              <a-textarea
                :rows="6"
                placeholder="请输入"
                v-decorator="[
                  'note',
                  { rules: [{ required: true, message: '请输入描述！' }],initialValue: editLicenseInfo.note },
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="最多可用空间">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'maxMemory',
                  { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }],initialValue: editLicenseInfo.maxMemory },
                ]" />
            </a-form-item>
            <a-form-item label="最多用户数">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'maxUser',
                  { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }],initialValue: editLicenseInfo.maxUser },
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="服务价格:">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'price',
                  { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }],initialValue: editLicenseInfo.price },
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="最大级别数">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'maxLevel',
                  { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }],initialValue: editLicenseInfo.maxLevel },
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="创建最大公司数:">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'maxCompany',
                  { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }],initialValue: editLicenseInfo.maxCompany },
                ]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="最多链接数">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'maxConnect',
                  { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }],initialValue: editLicenseInfo.maxConnect },
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button
          key="back"
          @click="cancelEdit">取消</a-button>
        <a-button
          key="submit"
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
import EditableCell from '@/components/system/editable-cell'
import CommonButton from '@/components/system/common-button'
import ServeAddress from './license-components/serve-address'
import DataSource from './license-components/data-soucer'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  components: {
    ATextarea,
    AFormItem,
    CommonButton,
    EditableCell,
    ServeAddress,
    DataSource
  },
  name: 'LicenseManagement',
  data () {
    return {
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      editId: null, // 点击编辑的时候该行数据对应的id
      info: null, // 要编辑的牌照所有详细信息
      editLicenseInfo: null, // 弹框编辑牌照信息
      name1: '添加牌照',
      name2: '删除',
      editState: false, // 编辑状态
      addressState: true, // 服务地址编辑状态
      dataSourceState: true, // 数据源状态
      showFoot: false, // 脚部
      selectedRowKeys: [],
      expandedRowKeys: [], // 点击行
      tableData: [], // 表格数据
      address: [
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          name: 'Oracel'
        },
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          name: 'Mysql'
        },
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          name: 'Sql Serve'
        },
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          name: 'asdf'
        }
      ], // 服务地址
      dataSource: [
        {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg',
          name: '应用名称'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2536453479,3877278103&fm=26&gp=0.jpg',
          name: '应用名称1'
        },
        {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg',
          name: '应用名称2'
        },
        {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2536453479,3877278103&fm=26&gp=0.jpg',
          name: '应用名称3'
        },
        {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg',
          name: '应用名称4'
        }
      ], // 可用数据源
      showLicenseModal: false, // 添加牌照弹框
      current: 0, // 步骤条
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      form3: this.$form.createForm(this), // 牌照编辑
      // saveFlag: false, // 保存状态,
      cardArr: [], // 应用数组
      moduleArr: [], // 模块数组
      formData: {}, // 表单的数据
      ids: []// 根据勾选的，获得对应牌照信息的id
    }
  },
  created () {
    this.LicenseMObj = new CnbiLicenseManagement()
    this.getData()
  },
  methods: {
    async refreshData () {
      const data = await this.LicenseMObj.findLicenseList()
      data.forEach(item => {
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
      this.tableData = data
    },
    // 进入页面  加载数据列表
    async getData () {
      await this.refreshData()
      // 获取应用数组
      this.cardArr = await this.LicenseMObj.getResourcesCard()
      // 获取模块数组
      this.moduleArr = await this.LicenseMObj.getResourcesModule()
    },

    // 编辑弹框的取消事件
    cancelEdit () {
      this.editState = false
      this.editLicenseInfo = null
    },

    // 编辑弹框的保存事件
    async saveEdit () {
      const _this = this
      _this.form3.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          // 获取点击行对应的id
          formData.id = this.editId
          const res = await _this.LicenseMObj.updateLicense(formData)
          // 重新加载最新的数据
          if (res.code == 200) {
            await _this.refreshData()
            _this.editState = false
          }
        }
      })
    },
    // 编辑按钮的点击事件
    async btnClick (record) {
      const _this = this
      _this.$confirm({
        title: '编辑会影响所有使用当前牌照的租户，确认进行编辑？',
        content: '',
        onOk () {
          setTimeout(async () => {
            _this.editState = true
            _this.editId = record.id * 1
            _this.editLicenseInfo = await _this.LicenseMObj.getLicenseId(record.id)
          }, 100)
        },
        onCancel () {
          console.log('Cancel')
        },
        class: 'editBtn'
      })
    },
    addClick () {
      this.showLicenseModal = true
      this.current = 0
    },
    async deleteClick () {
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      await this.LicenseMObj.deleteLicense(this.ids)
      // 4.删除成功后，及时更新数据，清除勾选图标
      await this.refreshData()
      this.selectedRowKeys = []
    },
    // 勾选事件
    onSelectChange (selectedRowKeys, bb, cc) {
      this.selectedRowKeys = selectedRowKeys
      this.ids = selectedRowKeys
      // this.ids = bb.map(d => d.id * 1)
    },
    // 修改状态
    async onChange (record) {
      await this.LicenseMObj.openLicense((record.enable - 0 == 0) ? 1 : 0, record.id * 1)
    },

    updateAddress () { // 保存地址修改
      this.addressState = true
    },
    cancelAddress () { // 取消地址修改
      this.addressState = true
    },
    updateDataSource () {
      this.dataSourceState = true
    },
    cancelDataSource () {
      this.dataSourceState = true
    },
    addlicense () {
      this.showLicenseModal = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form1.validateFields((err, values) => {
        if (!err) {
          this.formData = Object.assign(this.formData, values)
          console.log('1')
          this.current += 1
        } else {
          console.log('cuowu')
        }
      })
    },
    oneSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.formData = Object.assign(this.formData, values)
          console.log('1')
          this.current += 1
        } else {
          console.log('cuowu')
        }
      })
    },
    handleSelectChange () {

    },
    threeSubmit (e) {
      e.preventDefault()
      this.form2.validateFields((err, values) => {
        if (!err) {
          this.formData = Object.assign(this.formData, values)
          console.log('1')
          this.current += 1
        } else {
          console.log('cuowu')
        }
      })
    },

    // 保存新增的牌照
    async saveLicense () {
      // this.saveFlag = true
      const params = this.formData
      await this.LicenseMObj.saveLicense(params)

      // 保存成功后继续刷新数据
      await this.refreshData()
      // 关闭弹框
      this.showLicenseModal = false
    },
    // 点击行间 扩展事件
    setRow (record, index) {
      var _this = this
      return {
        on: { // 事件
          click: async (event) => {
            const disableArray = ['button', 'path', 'svg']
            if (event.target.cellIndex == 6 || event.target.cellIndex == 7 ||
              disableArray.indexOf(event.target.localName) > -1) { // 点击状态，操作两列不响应
              return
            }
            if (_this.expandedRowKeys[0] == record.id) { // 已展开状态，缩回
              _this.expandedRowKeys = []
              return
            }
            _this.expandedRowKeys = [record.id]

            //* ****************************接口请求数据************************************************************
            var info = await this.LicenseMObj.getLicenseId(record.id * 1)
            info.createTime = new Date(info.createTime * 1).toLocaleString()
            info.updateTime = new Date(info.updateTime * 1).toLocaleString()
            this.info = info
          }, // 点击行
          doubleclick: (event) => { },
          contextmenu: (event) => { },
          mouseenter: (event) => { }, // 鼠标移入行
          mouseleave: (event) => { }
        }

      }
    },
    // 设置每行id为主键
    setKey (record) {
      return record.id
    }

  }
}
</script>

<style scoped>
/deep/ .editable-cell {
  position: relative;
}

/deep/.editable-cell-input-wrapper,
/deep/.editable-cell-text-wrapper {
  padding-right: 24px;
}

/deep/.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

/deep/ .editable-cell-icon,
/deep/.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

/deep/.editable-cell-icon {
  line-height: 18px;
  display: none;
}

/deep/.editable-cell-icon-check {
  line-height: 28px;
}

/deep/.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

/deep/.editable-cell-icon:hover,
/deep/.editable-cell-icon-check:hover {
  color: #108ee9;
}

/deep/.editable-add-btn {
  margin-bottom: 8px;
}
.middle-a {
  margin-bottom: 16px;
}
.license{
  background-color: #fff;
  padding-top: 16px;
}
.license-middle {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #EAEDF3;
}
.license-foot-a {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  padding: 20px;
  width: 50%;
}
.license-foot {
  display: flex;
  flex-direction: row;
}
.button_style_one {
  margin-right: 10px;
}
.button_style {
  float: none;
  display: flex;
  justify-content: flex-end;
}

.step1 input {
  width: auto;
  margin-right: 10px;
}
.steps-content .ant-form-item {
  margin-bottom: 0;
}
/deep/.ant-table-row-expand-icon-cell {
  display: none;
}
/deep/.ant-table-expand-icon-th {
  display: none;
}
</style>
