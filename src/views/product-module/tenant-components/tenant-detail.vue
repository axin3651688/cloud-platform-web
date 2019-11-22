<template>
  <!--租户详情-->
  <div class="tenant-detail">
    <!--头部-->
    <div class="tenant-detail-header">
      <div
        class=""
        style="display: flex;flex-direction: row;align-items: center;margin-bottom: 29px">
        <img
          v-if="info.logoFile"
          style="width: 260px;height: 60px;"
          :src="info.logoFile.url"
        >
        <div style="margin-left: 20px;display: flex;flex-direction: column">
          <div>
            <h3 style="font-size: 18px;font-weight: bold;">{{ info.tenancyName }}</h3>
          </div>
          <div style="display: flex;flex-direction: row;">
            <div>
              <p>编号：<span>{{ info.code }}</span></p>
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
      <div style="display: flex;justify-content: space-between;padding: 16px 30px;border-bottom: 1px solid #EAEDF3">
        <span style="color: #9EA0A5;">
          <img src="@icons/jbxx.svg">
          基本信息
        </span>
        <a-button
          class="save"
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
            :gutter="12"
            class="row1">
            <a-col :span="6">
              <a-form-item label="营业执照" class="col1">
                <span>{{ info.societyCode }}</span>
              </a-form-item>
              <a-form-item label="所属牌照" class="col1">
                {{ info.licenseName }}
              </a-form-item>
              <a-form-item label="服务标识" class="col1">
                {{ info.service }}
              </a-form-item>
              <a-form-item label="联系电话" class="col1">
                {{ info.tel }}
              </a-form-item>
              <a-form-item label="生效日期" class="col1">
                {{ info.beginTime }}
              </a-form-item>
              <a-form-item label="创建日期" class="col1">
                {{ info.createTime }}
              </a-form-item>
              <a-form-item label="最近更新日期" class="col1-rq">
                {{ info.updateTime }}
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="拥有者" class="col2-3">
                {{ info.ownerName }}
              </a-form-item>
              <a-form-item label="租户类型" class="col2">
                {{ info.typeName }}
              </a-form-item>
              <a-form-item label="访问网址" class="col2">
                {{ info.url }}
              </a-form-item>
              <a-form-item label="租户地址" class="col2">
                {{ info.address }}
              </a-form-item>
              <a-form-item label="到期日期" class="col2">
                {{ info.endTime }}
              </a-form-item>
              <a-form-item label="创建人" class="col2-3">
                {{ info.createUserName }}
              </a-form-item>
              <a-form-item label="最近更新人" class="col2-5">
                {{ info.updateUserName }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!--还未初始化信息-->
    <div
      class="content"
      v-if="tabKey==2 ">
      <!--还未初始化-->
      <div
        class="noInit"
        style="display: flex;flex-direction: column">
        <div style="padding: 16px 0;border-bottom: 1px solid #EAEDF3">
          <span><img src="@icons/tenant-init.svg" style="margin-right: 16px;margin-left: 32px;">初始化服务</span>
          <a-button
            class="save"
            type="primary"
            @click="initAccount"
          >
            <a-icon type="cloud-upload" />初始化账套</a-button>
        </div>
        <div style="min-height: 200px;align-items: center;display: flex;justify-content: center;flex-direction: column">
          <div >
            <div style="display: flex;flex-direction: row;margin-bottom: 16px;">
              <img src="@icons/4700.svg">
              <div style="display: flex;flex-direction: column;padding-left: 16px;color:#6B6C6F;">
                <span>当前租户</span>
                <span>未完成初始化</span>
              </div>
            </div>
            <div style="color: #9EA0A5;">初始化后可以使用设计器设计分析资源！</div>
          </div>

        </div>
      </div>
    </div>
    <!--已经初始化-->
    <div
      v-if="false"
      style="background-color: #fff">
      <a-row
        :gutter="
          12">
        <a-col :span="12">
          <div style="padding: 24px 32px 0 32px;">
            <div style="display: flex;justify-content: space-between;">
              <div><a-icon type="edit"/>以初始化</div>
              <div><a-icon type="edit"/></div>
            </div>
          </div>

        </a-col>
      </a-row>
    </div>
    <!--修改基本信息-->
    <a-modal
      v-model="showUpdataInfo"
      :destroyOnClose="true"
      :maskClosable="false"
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
      <template slot="footer">
        <div style="display: flex;">
          <a-button
            key="back"
            class="cancel"
            @click="cancelUpdataInfo"
            style="margin-right: 24px;margin-left: 16px;">取消</a-button>
          <a-button
            key="submit"
            class="save"
            type="primary"
            @click="UpdataInfo">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--showInitPublic-->
    <a-modal
      v-model="showInitPublic"
      :destroyOnClose="true"
      :maskClosable="false"
      :width="350"
      title="初始化">
      <a-form :form="form2" autocomplete="off">
        <a-row
          :gutter="24"
          class="row1">
          <a-col :span="24">
            <a-form-item
              label="公共数据库:"
              class="item2">
              <a-select
                placeholder="请选择公共数据库"
                v-decorator="['address',{rules: [{ required: true, message: '请选择公共数据库!' }]}]">
                <template slot="suffixIcon">
                  <img src="@icons/sort.svg" />
                </template>
                <a-select-option
                  :value="1">
                  mysql
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <div style="display: flex;">
          <a-button
            key="back"
            class="cancel"
            @click="cancelInit('public')"
            style="margin-right: 24px;margin-left: 16px;">取消</a-button>
          <a-button
            key="submit"
            class="save"
            type="primary"
            @click="saveInit('public')">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--showInitPrivate-->
    <a-modal
      v-model="showInitPrivate"
      :destroyOnClose="true"
      :maskClosable="false"
      :width="350"
      title="初始化">
      <a-form :form="form3" autocomplete="off">
        <a-row
          :gutter="24"
          class="row1">
          <a-col :span="24">
            <a-form-item
              label="数据库地址"
              class="item2">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'address',
                  { rules: [{ required: true, message: '请输入数据库地址！' }]},
                ]"
                class="item2-input" />
            </a-form-item>
            <a-form-item
              label="端口"
              class="item2">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'port',
                  { rules: [{ required: true, message: '请输入端口！' }]},
                ]"
                class="item2-input" />
            </a-form-item>
            <a-form-item
              label="数据库账号"
              class="item2">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '请输入数据库账号！' }]},
                ]"
                class="item2-input" />
            </a-form-item>
            <a-form-item
              label="数据库密码"
              class="item2">
              <a-input
                type="password"
                placeholder="请输入"
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入数据库密码！' }]},
                ]"
                class="item2-input" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <div style="display: flex;">
          <a-button
            key="back"
            class="cancel"
            @click="cancelInit('private')"
            style="margin-right: 24px;margin-left: 16px;">取消</a-button>
          <a-button
            key="submit"
            class="save"
            type="primary"
            @click="saveInit('private')">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--showInitIng-->
    <a-modal
      v-model="showInitIng"
      :destroyOnClose="true"
      :maskClosable="false"
      :width="350"
      :footer="null"
      :closable="false"
      :bodyStyle="{height:'432px',padding:'0'}"
      title="初始化">
      <div style="width: 100%;display: flex;justify-content: center;margin-top: 30px;">
        <div class="loader loader13">
          <svg width="50px" height="50px" fill="#3B7CFF" viewBox="0 0 30 30">
            <circle cx="4" cy="4" r="4"/>
            <circle cx="4" cy="26" r="4"/>
            <circle cx="26" cy="4" r="4"/>
            <circle cx="26" cy="26" r="4"/>
          </svg>
          <span>初始化进行中</span>
        </div>
      </div>
      <div style="border: 1px solid rgba(255,163,158,1);background:rgba(255,241,240,1);margin: 22px 9px;padding: 16px;margin-top: 100px;" v-if="err">
        <div style="display: flex;justify-content: space-between;flex-direction: row;">
          <div style="display: flex;align-items: center;">
            <img src="@icons/x-red.svg" style="margin-right: 2px;"><span>出错了！</span>
          </div>
          <div><span style="color: #CECFD2;cursor: pointer" @click="showInitIng=false">X</span></div>
        </div>
        <div style="padding-left: 18px;"><span >初始化进程失败，请重新开始初始化。</span></div>
      </div>
    </a-modal>
    <!--showInitEnd-->
    <a-modal
      v-model="showInitEnd"
      :destroyOnClose="true"
      :maskClosable="false"
      :width="350"
      :footer="null"
      :bodyStyle="{height:'432px',display: 'flex','justify-content': 'center','align-items': 'center'}"
      title="初始化">
      <a-progress :strokeColor="'#3BAD4B'" type="circle" :percent="100" :format="() => '完成'"/>
    </a-modal>
  </div>
</template>

<script>
import AFormItem from 'ant-design-vue/es/form/FormItem'
import CnbiTenantManagement from '@/classes/lib/CnbiTenantManagement'
import ARow from 'ant-design-vue/es/grid/Row'
export default {
  name: 'TenantInit',
  components: { ARow, AFormItem },
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
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      form3: this.$form.createForm(this),
      showInitPublic: false, // 公有部署
      showInitPrivate: false, // 其他部署(私有、本地)
      showInitIng: false, // 初始化中
      showInitEnd: false, // 初始化完成
      err: false// 初始化出错
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
              message: '失效时间不能在生效时间之前!',
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
    cancelUpdataInfo () {
      this.showUpdataInfo = false
    },
    getYearMonthDay (time) {
      const year = new Date(time * 1).getFullYear()
      let month = new Date(time * 1).getMonth() + 1// 9
      month = month < 10 ? '0' + month : month
      let date = new Date(time * 1).getDate()
      date = date < 10 ? '0' + date : date
      return year + '-' + month + '-' + date
    },
    /* 初始化账套 */
    initAccount () {
      const type = this.info.type
      console.log('type==' + type)
      this.err = false
      if (type == 1) {
        // 共有部署
        this.showInitPublic = true
      } else {
        // 私有部署
        this.showInitPrivate = true
      }
    },
    cancelInit (type) {
      if (type == 'public') {
        this.showInitPublic = false
      } else if (type == 'private') {
        this.showInitPrivate = false
      }
    },
    saveInit (type) {
      const _this = this
      if (type == 'public') {
        _this.form2.validateFields(async (err, values) => {
          if (!err) {
            const account = {
              chooseDimCube: {
                'dbType': 1,
                'resourceId': 54,
                'version': 1
              },
              chooseTenancy: {
                'dbType': 1,
                'resourceId': 2,
                'version': 1
              },
              dataSourceInfoDto: {
                'address': '192.168.2.240:3306',
                'username': 'root',
                'password': '123456'
              },
              'tenancyId': _this.id
            }
            _this.showInitPublic = false
            _this.showInitIng = true
            const res = await _this.TenantMObj.initCustomizeInitTenancy(account)
            console.log('res=============', res)
            if (res.code != 200) {
              this.err = true
            } else {
              _this.showInitIng = false
              _this.showInitEnd = true
              console.log(res)
            }
          }
        })
      } else if (type == 'private') {
        _this.form3.validateFields(async (err, values) => {
          if (!err) {
            const account = {
              chooseDimCube: {
                'dbType': 1,
                'resourceId': 54,
                'version': 1
              },
              chooseTenancy: {
                'dbType': 1,
                'resourceId': 2,
                'version': 1
              },
              dataSourceInfoDto: {
                'address': values.address + ':' + values.port,
                'username': values.username,
                'password': values.password
              },
              'tenancyId': _this.id
            }
            _this.showInitPrivate = false
            _this.showInitIng = true
            const res = await _this.TenantMObj.initCustomizeInitTenancy(account)
            if (res.code != 200) {
              this.err = true
            } else {
              _this.showInitIng = false
              _this.showInitEnd = true
            }
          }
        })
      }
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
  background-color: #fff;
  padding: 36px 32px 0 32px ;
}
.content {
  margin-top: 24px;
  background-color: #fff;
}
.tenant-detail-tabs {
  min-height: 64px;
}
.infoShow .ant-form-item {
  display: flex;
}
/deep/.infoShow .ant-form-item-label label{
  color:#9EA0A5;
}
/deep/.infoShow .ant-form-item-control{
  color:#3E3F42;
}
/deep/.col1 .ant-form-item-control-wrapper{
  margin-left: 52px;
}
/deep/.col1-rq .ant-form-item-control-wrapper{
  margin-left: 24px;
}
/deep/.col2-5 .ant-form-item-control-wrapper{
  margin-left: 24px;
}
/deep/.col2-3 .ant-form-item-control-wrapper{
  margin-left: 52px;
}
/deep/.col2 .ant-form-item-control-wrapper{
  margin-left: 40px;
}
.save{
  margin-left: 32px;
  border:1px solid rgba(45,156,60,1);
  background:linear-gradient(360deg,rgba(52,170,68,1) 0%,rgba(56,178,73,1) 100%);
  box-shadow:0px 1px 1px rgba(19,31,21,0.1);
  opacity:1;
  border-radius:4px
}
.cancel:hover, .cancel:focus {
  color: #2D9C3C;
  border-color: #2D9C3C;
}
  .ant-form-item{
    margin-bottom: 8px;
  }
  .row1{
    margin-top: 24px;
    margin-bottom: 20px;
  }
.initIng .ant-modal-body{
  display: flex;
  justify-content: center;
}
  /*动效*/
@keyframes loader13dot1 {
  0%,
  45% {
    cx: 6;
    cy: 6;
  }
  55%,
  80% {
    cx: 2;
    cy: 2;
  }
  90%,
  100% {
    cx: 6;
    cy: 6;
  }
}
@keyframes loader13dot2 {
  0%,
  45% {
    cx: 6;
    cy: 24;
  }
  55%,
  80% {
    cx: 2;
    cy: 28;
  }
  90%,
  100% {
    cx: 6;
    cy: 24;
  }
}

@keyframes loader13dot3 {
  0%,
  45% {
    cx: 24;
    cy: 6;
  }
  55%,
  80% {
    cx: 28;
    cy: 2;
  }
  90%,
  100% {
    cx: 24;
    cy: 6;
  }
}

@keyframes loader13dot4 {
  0%,
  45% {
    cx: 24;
    cy: 24;
  }
  55%,
  80% {
    cx: 28;
    cy: 28;
  }
  90%,
  100% {
    cx: 24;
    cy: 24;
  }
}

.loader13 svg {
  overflow: visible;
  animation: 1.5s rotateWithBoost linear infinite;
}

.loader13 svg circle:first-of-type {
  animation: 1.5s loader13dot1 linear infinite;
}
.loader13 svg circle:nth-of-type(2) {
  animation: 1.5s loader13dot2 linear infinite;
}
.loader13 svg circle:nth-of-type(3) {
  animation: 1.5s loader13dot3 linear infinite;
}
.loader13 svg circle:last-of-type {
  animation: 1.5s loader13dot4 linear infinite;
}
/*LOADER BOX*/
.loader {
  height: 150px;
  width: 200px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;
  position: relative;
}

.loader span {
  font-size: 12px;
  position: absolute;
  bottom: 16px;
}

@media only screen and (min-width: 861px) {
  .row:nth-child(odd) .loader:nth-child(odd),
  .row:nth-child(even) .loader:nth-child(even) {
    background: #1e1e1e;
  }

  .row:nth-child(odd) .loader:nth-child(even),
  .row:nth-child(even) .loader:nth-child(odd) {
    background: #2a2a2a;
  }
}

@media only screen and (max-width: 860px) {
  .row .loader:first-child,
  .row .loader:last-child {
    background: #2a2a2a;
  }

  .row .loader {
    background: #1e1e1e;
  }
}

@media only screen and (max-width: 460px) {
  .row .loader:nth-child(odd) {
    background: #2a2a2a;
  }
  .row .loader:nth-child(even) {
    background: #1e1e1e;
  }
}

/*** LOADERS ***/

/* COMMON ANIMATIONS */
@keyframes spinBasic {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinBasicReverse {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

@keyframes rotateWithBoost {
  0% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(180deg);
  }
  90%,
  100% {
    transform: rotate(360deg);
  }
}
/deep/.ant-progress-circle.ant-progress-status-success .ant-progress-text{
  color:#3E3F42;
}
</style>
