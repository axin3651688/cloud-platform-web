<template>
  <div>
    <a-row>
      <!--左侧-->
      <a-col :span="6" style="overflow: hidden;border-bottom: 1px solid #EAEDF3;">

        <div style="display: flex;flex-direction: column;border-bottom: 1px solid #EAEDF3;">
          <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
            <img src="http://img5.imgtn.bdimg.com/it/u=2060010946,4257665237&fm=26&gp=0.jpg"/>
          </div>
          <div style="padding-left: 32px;margin-top: 20px;">
            <h2>租户名称</h2>
            <a-select style="width: 120px;" placeholder="租户的状态" @change="handleChange">
              <template slot="suffixIcon" >
                <img style="width: 12px;" src="../../../assets/icons/paixu.svg"/>
              </template>
              <a-select-option value="male">
                male
              </a-select-option>
              <a-select-option value="female">
                female
              </a-select-option>
              <a-select-option value="male">
                male
              </a-select-option>
              <a-select-option value="female">
                female
              </a-select-option>
            </a-select>
          </div>
        </div>
        <!--绑定账号-->
        <div style="margin-top: 20px;">
          <div style="margin-left: 32px"><span style="color: #9EA0A5">绑定账号</span></div>
          <account style="cursor: pointer" class="account" :name="'QQ'" :number="1234567890123"></account>
          <account style="cursor: pointer" class="account" :name="'微信'" :number="12345"></account>
        </div>
      </a-col>
      <a-col :span="3" style="overflow: hidden;border-bottom: 1px solid #EAEDF3;">
      </a-col>
      <!--右侧-->
      <a-col :span="12" >
        <a-form :form="form" class="user-table">
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="名称">
                <span v-if="!InfoState">狗剩</span>
                <a-input
                  v-else
                  placeholder="请输入名称"
                  v-decorator="['a',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="地址">
                <span v-if="!InfoState">狗家县，狗家庄</span>
                <a-input
                  v-else
                  placeholder="请输入地址"
                  v-decorator="['b',{rules: [{ required: true, message: '地址不能为空!' }],}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="性别">
                <span v-if="!InfoState">公</span>
                <a-radio-group name="c" :defaultValue="1" v-else>
                  <a-radio :value="1">男</a-radio>
                  <a-radio :value="2">女</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="创建日期">
                <span v-if="!InfoState">2020.12.36</span>
                <a-date-picker
                  v-else
                  v-decorator="['d',{rules: [{ required: true, message: '请选择创建日期!' }],}]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="密码">
                <span v-if="!InfoState">*******</span>
                <a-input
                  v-else
                  type="password"
                  placeholder="请输入密码"
                  v-decorator="['e',{rules: [{ required: true, message: '密码不能为空!' }],}]" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="创建人">
                <span v-if="!InfoState">哈哈哈</span>
                <a-input
                  v-else
                  placeholder="请输入创建人"
                  v-decorator="['f',{rules: [{ required: true, message: '创建人不能为空!' }],}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="手机号">
                <span v-if="!InfoState">0101001</span>
                <a-input
                  v-else
                  placeholder="请输入手机号"
                  v-decorator="['phone',{rules: [{ required: true, message: 'Please input your phone number!' }],}]"/>

              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="最近更新日期">
                <span v-if="!InfoState">2020.2.53</span>
                <a-date-picker
                  v-else
                  v-decorator="['h',{rules: [{ required: true, message: '请选择最近更新日期!' }],}]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">

              <a-form-item label="邮箱">
                <span v-if="!InfoState">啊发发。发烧饭</span>
                <a-input
                  v-else
                  placeholder="请输入邮箱"
                  v-decorator="['g',{rules: [{ required: true,pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱不能为空!' }],}]" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="最近更新人">
                <span v-if="!InfoState">啊深地税发</span>
                <a-input
                  v-else
                  placeholder="请输入最近更新人"
                  v-decorator="['h',{rules: [{ required: true, message: '最近更新人不能为空!' }],}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12" v-if="!InfoState">
              <a-form-item >
                <a-button type="primary" @click="InfoState=true"><a-icon type="cloud-upload" />修改</a-button>
              </a-form-item >
            </a-col>
            <a-col :span="12" v-else>
              <a-form-item >
                <a-button type="primary" style="margin-right: 20px" @click="cancelEdit">取消</a-button>
                <a-button type="primary" @click="saveEdit"><a-icon type="cloud-upload" />保存</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Account from './account'
import AFormItem from 'ant-design-vue/es/form/FormItem'
export default {
  name: 'UserDetail',
  components: {
    AFormItem,
    Account
  },
  data () {
    return {
      form: this.$form.createForm(this),
      InfoState: false
    }
  },
  methods: {
    handleChange (val) {

    },
    cancelEdit () {
      this.InfoState = false
    },
    saveEdit () {
      this.InfoState = false
    }

  }
}
</script>

<style scoped>
  .user-table input{
    width: auto;
  }
  .user-table{
    max-width: 500px;
  }
</style>
