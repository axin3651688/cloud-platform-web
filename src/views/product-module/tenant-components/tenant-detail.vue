<template>
  <!--租户详情-->
  <div class="tenant-detail">
    <!--头部-->
    <div class="tenant-detail-header">
      <div
        class=""
        style="display: flex;flex-direction: row;align-items: center;margin-left: 20px;margin-bottom: 29px">
        <img
          v-if="info.logoFile"
          style="width: 260px;height: 60px;"
          :src="info.logoFile.url">
        <div style="margin-left: 20px;display: flex;flex-direction: column">
          <div>
            <h3 style="font-size: 18px;font-weight: bold;">{{ info.name }}</h3>
          </div>
          <div style="display: flex;flex-direction: row;">
            <div>
              <p>编号：<span>{{ info.code }}</span></p>
            </div>
            <div style="margin-left: 100px;">
              <p>公司名称：<span>{{ info.tenancyName }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="tenant-detail-tabs">
        <a-tabs @change="callback">
          <a-tab-pane
            tab="基本信息"
            key="1"></a-tab-pane>
          <a-tab-pane
            tab="初始化信息"
            key="2"></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <!--基本信息-->
    <div
      class="content"
      v-if="tabKey==1">
      <div style="display: flex;justify-content: space-between;padding: 10px 30px">
        <span>
          <img src="@icons/jbxx.svg">
          基本信息
        </span>
        <a-button
          class="button_style_one"
          type="primary"
          @click="editClick">
          <a-icon type="cloud-upload" />修改</a-button>
      </div>
      <div>
        <a-form
          style="padding-left: 30px;"
          class="infoShow"
          :form="form"
          autocomplete="off">
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="营业执照">
                <span>{{ info.societyCode }}</span>
              </a-form-item>
              <a-form-item label="所属牌照">
                {{ info.licenseName }}
              </a-form-item>
              <a-form-item label="服务标识">
                {{ info.service }}
              </a-form-item>
              <a-form-item label="联系电话">
                {{ info.tel }}
              </a-form-item>
              <a-form-item label="生效日期">
                {{ info.beginTime }}
              </a-form-item>
              <a-form-item label="创建日期">
                {{ info.createTime }}
              </a-form-item>
              <a-form-item label="最近更新日期">
                {{ info.updateTime }}
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="拥有者">
                {{ info.ownerName }}
              </a-form-item>
              <a-form-item label="租户类型">
                {{ info.typeName }}
              </a-form-item>
              <a-form-item label="访问网址">
                {{ info.url }}
              </a-form-item>
              <a-form-item label="租户地址">
                {{ info.address }}
              </a-form-item>
              <a-form-item label="到期日期">
                {{ info.endTime }}
              </a-form-item>
              <a-form-item label="创建人">
                {{ info.createUserName }}
              </a-form-item>
              <a-form-item label="最近更新人">
                {{ info.updateUserName }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!--初始化信息-->
    <div
      class="content"
      v-if="tabKey==2">
      <!--还未初始化-->
      <div
        class="noInit"
        style="display: flex;flex-direction: column">
        <div>
          <span>初始化服务</span>
          <a-button
            class="button_style_one"
            type="primary">
            <a-icon type="cloud-upload" />初始化账套</a-button>
        </div>
        <div></div>
      </div>
      <!--已经初始化-->
      <div></div>
    </div>
    <!--修改基本信息-->
    <a-modal
      v-model="showUpdataInfo"
      :destroyOnClose="true"
      @ok="UpdataInfo"
      okText="保存"
      cancelText="取消"
      title="修改基本信息">
      <a-form :form="form1" autocomplete="off">
        <a-row
          :gutter="24"
          class="row1">
          <a-col :span="12">
            <a-form-item
              label="营业执照:"
              class="item2">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'societyCode',
                  { rules: [{ required: true, message: '请输入营业执照！' }] ,initialValue:info.societyCode},
                ]"
                class="item2-input" />
            </a-form-item>
            <a-form-item
              label="所属牌照:"
              class="item2">
              <a-select
                v-decorator="['licenseId',{rules: [{ required: true, message: '请选择所属牌照!' }],initialValue:info.licenseId}]">
                <template slot="suffixIcon">
                  <img src="@icons/sort.svg" />
                </template>
                <a-select-option
                  v-for="(item,index) in LicenseList"
                  :key="index"
                  v-if="item.enable==1"
                  :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="服务标识:"
              class="item2">
              <a-input
                placeholder="请输入服务标识"
                v-decorator="['service',{rules: [{ required: true, message: '服务标识不能为空!' }],initialValue:info.service}]" />
            </a-form-item>
            <a-form-item
              label="访问网址:"
              class="item2">
              <!--  pattern: /^http:\/\/([\w-]+.)+[\w-]+(\/[\w-./?%&=]*)?$/, 验证方式 -->
              <a-input
                placeholder="请输入"
                v-decorator="['url',{rules: [{ required: true, message: '请输入正确的网址' }],initialValue:info.url}]"
                class="item2-input" />
            </a-form-item>
            <a-form-item
              label="生效日期："
              class="item2">
              <!--info.beginTime-->
              <a-date-picker
                v-decorator="['beginTime',{rules: [{ required: true, message: '请选择生效日期!' }],
                                           initialValue:this.$moment(info.beginTime, 'YYYY-MM-DD')}]"></a-date-picker>
            </a-form-item></a-col>
          <a-col :span="12">
            <a-form-item
              label="联系电话:"
              class="item2">
              <!--  pattern: /^1[34578]\d{9}$/,  验证方式 -->
              <a-input
                placeholder="请输入"
                v-decorator="['tel',{rules: [{ required: true, message: '请输入正确的手机号' }],initialValue:info.tel}]"
                class="item2-input" />
            </a-form-item>
            <a-form-item
              label="租户类型:"
              class="item2">
              <a-select
                v-decorator="['type',{rules: [{ required: true, message: '请选择租户类型!' }],initialValue:info.type}]">
                <template slot="suffixIcon">
                  <img src="@icons/sort.svg" />
                </template>
                <a-select-option :value="1">
                  公共部署
                </a-select-option>
                <a-select-option :value="2">
                  私有部署
                </a-select-option>
                <a-select-option :value="3">
                  本地部署
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="拥有者："
              class="item2">
              <a-select v-decorator="['ownerId',{rules: [{ required: true, message: '请选择所属人!' }],initialValue:info.ownerId}]">
                <template slot="suffixIcon">
                  <img src="@icons/sort.svg" />
                </template>
                <a-select-option
                  v-for="(item,index) in owners"
                  :value="item.id"
                  :key="index">
                  {{ item.nickName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="租户地址:"
              class="item2">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'address',
                  { rules: [{ required: true, message: '请输入所属牌照！' }],initialValue:info.address },
                ]"
                class="item2-input" />
            </a-form-item>
            <a-form-item
              label="到期日期:"
              class="item2">
              <a-date-picker
                v-decorator="['endTime',
                              {rules: [{ required: true, message: '请选择到期日期!' }],initialValue:this.$moment(info.endTime, 'YYYY-MM-DD')}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import AFormItem from 'ant-design-vue/es/form/FormItem'
import CnbiTenantManagement from '@/classes/lib/CnbiTenantManagement'
export default {
  name: 'TenantInit',
  components: { AFormItem },
  data () {
    return {
      form: this.$form.createForm(this),
      owners: [], // 从云智囊中查询的所有拥有者数组
      LicenseList: [], // 牌照列表数组
      TenantMObj: null,
      id: null, // 点击的租户详情对应的id
      info: null, // 当前租户的所有详细信息
      tabKey: '1', // 标签页
      showUpdataInfo: false, // 修改信息弹框
      form1: this.$form.createForm(this, { name: 'dynamic_rule' })
    }
  },
  created () {
    this.TenantMObj = new CnbiTenantManagement()
    this.id = this.$route.query.id
    this.showInfo()
  },
  methods: {
    // 点击详情  查询信息
    async showInfo () {
      var info = await this.TenantMObj.getTenancy(this.id)
      // info.beginTime = new Date(info.beginTime * 1).toLocaleString()
      // info.createTime = new Date(info.createTime * 1).toLocaleString()
      // info.endTime = new Date(info.endTime * 1).toLocaleString()
      // info.updateTime = new Date(info.updateTime * 1).toLocaleString()
      info.beginTime = this.getYearMonthDay(info.beginTime)
      info.createTime = this.getYearMonthDay(info.createTime)
      info.endTime = this.getYearMonthDay(info.endTime)
      info.updateTime = this.getYearMonthDay(info.updateTime)
      this.info = info

      // 获取所有的所属人
      const owners = await this.TenantMObj.getUserSimpleInfoList()
      // this.owners = owners.map(item => {item.nickName})
      this.owners = owners
      // 获取所有的牌照列表
      const LicenseList = await this.TenantMObj.findLicenseList()
      this.LicenseList = LicenseList
    },
    callback (key) {
      this.tabKey = key
    },
    // 修改按钮点击事件
    editClick () {
      const _this = this
      // 1.打开弹框
      _this.showUpdataInfo = true
      // 2.让原有的信息呈现在弹框中
      // this.$nextTick(() => {
      //   debugger
      //   _this.form.setFieldsValue({ 'societyCode': _this.info.societyCode })// 营业执照
      //   _this.form.setFieldsValue({ 'licenseId': _this.info.licenseId })// 所属牌照
      //   _this.form.setFieldsValue({ 'service': _this.info.serviceId })// 服务标识
      //   _this.form.setFieldsValue({ 'url': _this.info.url })// 访问网址
      //   _this.form.setFieldsValue({ 'beginTime': _this.info.beginTime })// 生效时间
      //   _this.form.setFieldsValue({ 'tel': _this.info.tel })// 联系电话
      //   _this.form.setFieldsValue({ 'type': _this.info.type })// 租户类型
      //   _this.form.setFieldsValue({ 'ownerId': _this.info.ownerId })// 所属人
      //   _this.form.setFieldsValue({ 'address': _this.info.address })// 租户地址
      //   _this.form.setFieldsValue({ 'endTime': _this.info.endTime })// 到期日期
      // })
    },
    async UpdataInfo () {
      const _this = this
      // 3.获取修改后的数据
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.beginTime = new Date(formData.beginTime).getTime()
          formData.endTime = new Date(formData.endTime).getTime()
          if (formData.beginTime > formData.endTime) {
            const arr = [{
              message: '失效时间不能再生效时间之前!',
              field: 'endTime'
            }]
            this.form1.setFields({ endTime: { initialValue: formData.endTime, errors: arr } })
            return
          }
          formData.id = this.id
          // 4.调用修改接口的方法，完成修改操作，关闭弹框
          await _this.TenantMObj.updateTenancy(formData)

          // 重新加载最新的数据
          var info = await _this.TenantMObj.getTenancy(this.id)
          info.beginTime = this.getYearMonthDay(info.beginTime)
          info.createTime = this.getYearMonthDay(info.createTime)
          info.endTime = this.getYearMonthDay(info.endTime)
          info.updateTime = this.getYearMonthDay(info.updateTime)
          _this.info = info
          _this.showUpdataInfo = false
        }
      })
    },
    getYearMonthDay (time) {
      const year = new Date(time * 1).getFullYear()
      let month = new Date(time * 1).getMonth() + 1// 9
      month = month < 10 ? '0' + month : month
      let date = new Date(time * 1).getDate()
      date = date < 10 ? '0' + date : date
      return year + '-' + month + '-' + date
    }
  }
}
</script>

<style scoped>
.tenant-detail {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 16px 32px;
}
.tenant-detail-header {
  display: flex;
  flex-direction: column;
}
.content {
}
.tenant-detail-tabs {
  min-height: 64px;
}
.infoShow .ant-form-item {
  display: flex;
}
</style>
