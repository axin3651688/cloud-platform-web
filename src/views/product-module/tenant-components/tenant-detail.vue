<template>
  <!--租户详情-->
  <div class="tenant-detail">
    <!--头部-->
    <div class="tenant-detail-header">
      <div class=""
           style="display: flex;flex-direction: row;align-items: center;margin-left: 30px;">
        <img style="width: 260px;"
             src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1570683276,2169925905&fm=26&gp=0.jpg">
        <div style="margin-left: 30px;display: flex;flex-direction: column">
          <div>
            <h3 style="font-size: 18px;font-weight: bold;">{{info.name}}</h3>
          </div>
          <div style="display: flex;flex-direction: row;">
            <div>
              <p>编号：<span>123456</span></p>
            </div>
            <div style="margin-left: 100px;">
              <p>拥有者：<span>123456</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="tenant-detail-tabs">
        <a-tabs @change="callback">
          <a-tab-pane tab="基本信息"
                      key="1"></a-tab-pane>
          <a-tab-pane tab="初始化信息"
                      key="2"></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <!--基本信息-->
    <div class="content"
         v-if="tabKey==1">
      <div style="display: flex;justify-content: space-between;padding: 10px 30px">
        <span>
          <img src="../../../assets/icons/wendang.svg">
          基本信息
        </span>
        <a-button class="button_style_one"
                  type="primary"
                  @click="editClick">
          <a-icon type="cloud-upload" />修改</a-button>
      </div>
      <div>
        <a-form style="padding-left: 30px;"
                class="infoShow"
                :form="form">
          <a-row :gutter="24"
                 class="row1">
            <a-col :span="12">
              <a-form-item label="营业执照">
                <span>123</span>
              </a-form-item>
              <a-form-item label="所属牌照">
                df
              </a-form-item>
              <a-form-item label="服务标识">
                {{info.serviceId}}
              </a-form-item>
              <a-form-item label="联系电话">
                df
              </a-form-item>
              <a-form-item label="生效日期">
                df
              </a-form-item>
              <a-form-item label="创建日期">
                df
              </a-form-item>
              <a-form-item label="最近更新日期">
                df
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="所属人">
                df
              </a-form-item>
              <a-form-item label="租户类型">
                df
              </a-form-item>
              <a-form-item label="访问网址">
                df
              </a-form-item>
              <a-form-item label="租户地址">
                df
              </a-form-item>
              <a-form-item label="到期日期">
                df
              </a-form-item>
              <a-form-item label="创建人">
                第三方
              </a-form-item>
              <a-form-item label="最近更新人">
                df
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!--初始化信息-->
    <div class="content"
         v-if="tabKey==2">
      <!--还未初始化-->
      <div class="noInit"
           style="display: flex;flex-direction: column">
        <div>
          <span>初始化服务</span>
          <a-button class="button_style_one"
                    type="primary">
            <a-icon type="cloud-upload" />初始化账套</a-button>
        </div>
        <div></div>
      </div>
      <!--已经初始化-->
      <div></div>
    </div>
    <!--修改基本信息-->
    <a-modal v-model="showUpdataInfo"
             @ok="UpdataInfo"
             okText="保存"
             cancelText="取消"
             title="修改基本信息">
      <a-form :form="form">
        <a-row :gutter="24"
               class="row1">
          <a-col :span="12">
            <a-form-item label="营业执照:"
                         class="item2">
              <a-input placeholder="请输入"
                       v-decorator="[
                  'societyCode',
                  { rules: [{ required: true, message: '请输入营业执照！' }] },
                ]"
                       class="item2-input" />
            </a-form-item>
            <a-form-item label="所属牌照:"
                         class="item2">
              <a-select default-value="1"
                        v-decorator="['licenseId',{rules: [{ required: true, message: '请选择所属牌照!' }],}]">
                <template slot="suffixIcon">
                  <img style="width: 12px;"
                       src="../../../assets/icons/paixu.svg" />
                </template>
                <a-select-option value="1">
                  基础版
                </a-select-option>
                <a-select-option value="2">
                  旗舰版
                </a-select-option>
                <a-select-option value="3">
                  免费版
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="服务标识:"
                         class="item2">
              <a-select default-value="1"
                        v-decorator="['serviceId',{rules: [{ required: true, message: '请选择服务标识!' }],}]">
                <template slot="suffixIcon">
                  <img style="width: 12px;"
                       src="../../../assets/icons/paixu.svg" />
                </template>
                <a-select-option value="1">
                  服务标识
                </a-select-option>
                <a-select-option value="2">
                  服务标识2
                </a-select-option>
                <a-select-option value="3">
                  服务标识3
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="访问网址:"
                         class="item2">
              <a-input placeholder="请输入"
                       v-decorator="['url',{rules: [{ required: true, pattern: /^http:\/\/([\w-]+.)+[\w-]+(\/[\w-./?%&=]*)?$/, message: '请输入正确的网址' }]}]"
                       class="item2-input" />
            </a-form-item>
            <a-form-item label="生效日期："
                         class="item2">
              <a-date-picker @change="onChange"
                             v-decorator="['beginTime',{rules: [{ required: true, message: '请选择生效日期!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系电话:"
                         class="item2">
              <a-input placeholder="请输入"
                       v-decorator="['phone',{rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }]}]"
                       class="item2-input" />
            </a-form-item>
            <a-form-item label="租户类型:"
                         class="item2">
              <a-select default-value="1"
                        v-decorator="['type',{rules: [{ required: true, message: '请选择租户类型!' }],}]">
                <template slot="suffixIcon">
                  <img style="width: 12px;"
                       src="../../../assets/icons/paixu.svg" />
                </template>
                <a-select-option value="1">
                  公共部署
                </a-select-option>
                <a-select-option value="2">
                  私有部署
                </a-select-option>
                <a-select-option value="3">
                  本地部署
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="所属人："
                         class="item2">
              <a-select default-value="1"
                        v-decorator="['ownerId',{rules: [{ required: true, message: '请选择所属人!' }],}]">
                <template slot="suffixIcon">
                  <img style="width: 12px;"
                       src="../../../assets/icons/paixu.svg" />
                </template>
                <a-select-option value="1">
                  拥有者1
                </a-select-option>
                <a-select-option value="2">
                  拥有者2
                </a-select-option>
                <a-select-option value="3">
                  拥有者3
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="租户地址:"
                         class="item2">
              <a-input placeholder="请输入"
                       v-decorator="[
                  'address',
                  { rules: [{ required: true, message: '请输入所属牌照！' }] },
                ]"
                       class="item2-input" />
            </a-form-item>
            <a-form-item label="到期日期:"
                         class="item2">
              <a-date-picker @change="onChange"
                             v-decorator="['endTime',{rules: [{ required: true, message: '请选择到期日期!' }],}]" />
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
      TenantMObj: null,
      id: null,//点击的租户详情对应的id
      info: null,//当租户的所有详细信息
      tabKey: '1', // 标签页
      showUpdataInfo: false, // 修改信息弹框
      form: this.$form.createForm(this, { name: 'dynamic_rule' })
    }
  },
  created () {
    this.TenantMObj = new CnbiTenantManagement()
    // console.log(this.$route.query, '999999999')
    this.id = this.$route.query.id
    // console.log(this.id, '101010')
    this.showInfo()
  },
  methods: {
    async showInfo () {
      // debugger
      var info = await this.TenantMObj.getTenancy(this.id)
      this.info = info
      // console.log(info, '66666666')
    },
    callback (key) { //
      console.log(key)
      this.tabKey = key
    },
    //修改按钮点击事件
    async editClick (record) {
      const _this = this
      //1.打开弹框
      _this.showUpdataInfo = true
      //2.让原有的信息呈现在弹框中
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'societyCode': record.societyCode })//营业执照
        _this.form.setFieldsValue({ 'licenseId': record.licenseId })//所属牌照
        _this.form.setFieldsValue({ 'serviceId': record.serviceId })//服务标识
        _this.form.setFieldsValue({ 'url': record.url })//访问网址
        _this.form.setFieldsValue({ 'beginTime': record.beginTime })//生效时间
        _this.form.setFieldsValue({ 'phone': record.phone })//联系电话
        _this.form.setFieldsValue({ 'type': record.type })//租户类型
        _this.form.setFieldsValue({ 'ownerId': record.ownerId })//所属人
        _this.form.setFieldsValue({ 'address': record.address })//租户地址
        _this.form.setFieldsValue({ 'endTime': record.endTime })//到期日期
      })
      //3.获取修改后的数据
      _this.form.validateFields(async (err, values) => {
        // debugger
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.beginTime = new Date(formData.beginTime).getTime()
          formData.endTime = new Date(formData.endTime).getTime()
          // formData.checkTime = 1
          // formData.checkerId = 2
          //4.调用修改接口的方法，完成修改操作，关闭弹框
          await _this.TenantMObj.updateTenancy(formData)
          _this.showUpdataInfo = false
        }
      })    
      },
    UpdataInfo () {
      this.showUpdataInfo = false
    },
    onChange () {

    }
  }
}
</script>

<style scoped>
.tenant-detail {
  display: flex;
  flex-direction: column;
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
