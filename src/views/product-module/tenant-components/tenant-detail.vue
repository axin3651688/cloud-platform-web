<template>
  <!--租户详情-->
  <div class="tenant-detail" >
    <!--头部-->
    <div class="tenant-detail-header" >
      <div class="" style="display: flex;flex-direction: row;align-items: center;margin-left: 30px;">
        <img
          style="width: 260px;"
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1570683276,2169925905&fm=26&gp=0.jpg">
        <div style="margin-left: 30px;display: flex;flex-direction: column">
          <div> <h3 style="font-size: 18px;font-weight: bold;">这里是租户的名称</h3></div>
          <div style="display: flex;flex-direction: row;">
            <div><p>编号：<span>123456</span></p></div>
            <div style="margin-left: 100px;"><p>拥有者：<span>123456</span></p></div>
          </div>
        </div>
      </div>
      <div class="tenant-detail-tabs" >
        <a-tabs @change="callback">
          <a-tab-pane tab="基本信息" key="1"></a-tab-pane>
          <a-tab-pane tab="初始化信息" key="2"></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <!--基本信息-->
    <div class="content" v-if="tabKey==1">
      <div style="display: flex;justify-content: space-between;padding: 10px 30px">
        <span>
          <img src="../../../assets/icons/wendang.svg" >
          基本信息
        </span>
        <a-button
          class="button_style_one"
          type="primary"
          @click="showUpdataInfo=true "
        ><a-icon type="cloud-upload" />修改</a-button>
      </div>
      <div>
        <a-form style="padding-left: 30px;" class="infoShow">
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="营业执照" >
                <span>123</span>
              </a-form-item>
              <a-form-item label="所属牌照">
                df
              </a-form-item>
              <a-form-item label="服务标识">
                df
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
    <div class="content" v-if="tabKey==2">
      <!--还未初始化-->
      <div class="noInit" style="display: flex;flex-direction: column">
        <div>
          <span>初始化服务</span>
          <a-button
            class="button_style_one"
            type="primary"
          ><a-icon type="cloud-upload" />初始化账套</a-button>
        </div>
        <div></div>
      </div>
      <!--已经初始化-->
      <div></div>
    </div>
    <!--修改基本信息-->
    <a-modal
      v-model="showUpdataInfo"
      @ok="UpdataInfo"
      okText="保存"
      cancelText="取消"
      title="修改基本信息">
      <a-form :form="form">
        <a-row
          :gutter="24"
          class="row1">
          <a-col :span="12" >
            <a-form-item label="营业执照:" class="item2">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'zz',
                  { rules: [{ required: true, message: '请输入营业执照！' }] },
                ]"
                class="item2-input"/>
            </a-form-item>
            <a-form-item label="所属牌照:" class="item2">
              <a-select
                default-value="1"
                v-decorator="['licenseId',{rules: [{ required: true, message: '请选择所属牌照!' }],}]">
                <template slot="suffixIcon" >
                  <img style="width: 12px;" src="../../../assets/icons/paixu.svg"/>
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
            <a-form-item label="服务标识:" class="item2">
              <a-select
                default-value="1"
                v-decorator="['serviceId',{rules: [{ required: true, message: '请选择服务标识!' }],}]">
                <template slot="suffixIcon" >
                  <img style="width: 12px;" src="../../../assets/icons/paixu.svg"/>
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
            <a-form-item label="访问网址:" class="item2">
              <a-input
                placeholder="请输入"
                v-decorator="['url',{rules: [{ required: true, pattern: /^http:\/\/([\w-]+.)+[\w-]+(\/[\w-./?%&=]*)?$/, message: '请输入正确的网址' }]}]"
                class="item2-input"/>
            </a-form-item>
            <a-form-item label="生效日期：" class="item2">
              <a-date-picker
                @change="onChange"
                v-decorator="['beginTime',{rules: [{ required: true, message: '请选择生效日期!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="联系电话:"
              class="item2"
            >
              <a-input
                placeholder="请输入"
                v-decorator="['phone',{rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }]}]"
                class="item2-input"/>
            </a-form-item>
            <a-form-item
              label="租户类型:"
              class="item2">
              <a-select
                default-value="1"
                v-decorator="['type',{rules: [{ required: true, message: '请选择租户类型!' }],}]">
                <template slot="suffixIcon" >
                  <img style="width: 12px;" src="../../../assets/icons/paixu.svg"/>
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
            <a-form-item label="所属人：" class="item2">
              <a-select
                default-value="1"
                v-decorator="['ownerId',{rules: [{ required: true, message: '请选择所属人!' }],}]">
                <template slot="suffixIcon" >
                  <img style="width: 12px;" src="../../../assets/icons/paixu.svg"/>
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
            <a-form-item label="租户地址:" class="item2">
              <a-input
                placeholder="请输入"
                v-decorator="[
                  'pz',
                  { rules: [{ required: true, message: '请输入所属牌照！' }] },
                ]"
                class="item2-input"/>
            </a-form-item>
            <a-form-item label="到期日期:" class="item2">
              <a-date-picker
                @change="onChange"
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
export default {
  name: 'TenantInit',
  components: { AFormItem },
  data () {
    return {
      tabKey: '1', // 标签页
      showUpdataInfo: false, // 修改信息弹框
      form: this.$form.createForm(this, { name: 'dynamic_rule' })
    }
  },
  methods: {
    callback (key) { //
      console.log(key)
      this.tabKey = key
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
.tenant-detail{
  display: flex;
  flex-direction: column;
}
.tenant-detail-header{
  display: flex;
  flex-direction: column;
  }
.content{
}
.tenant-detail-tabs{
    min-height: 64px;
}
.infoShow .ant-form-item{
    display: flex;
}
</style>
