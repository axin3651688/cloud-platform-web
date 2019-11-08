<template>
  <div class="user-detail">
    <a-row>
      <!--左侧-->
      <a-col
        :span="6"
        style="overflow: hidden;border-bottom: 1px solid #EAEDF3;">

        <div style="display: flex;flex-direction: column;border-bottom: 1px solid #EAEDF3;">
          <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
            <img :src="info.avatarUrl" />
          </div>
          <div style="padding-left: 32px;margin-top: 20px;">
            <h2>租户名称</h2>
            <a-select
              style="width: 120px;"
              placeholder="租户的状态"
              @change="handleChange">
              <template slot="suffixIcon">
                <img src="@icons/sort.svg" />
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
          <account
            style="cursor: pointer"
            class="account"
            :name="'QQ'"
            :number="1234567890123"></account>
          <account
            style="cursor: pointer"
            class="account"
            :name="'微信'"
            :number="12345"></account>
        </div>
      </a-col>
      <a-col
        :span="3"
        style="overflow: hidden;border-bottom: 1px solid #EAEDF3;">
      </a-col>
      <!--右侧-->
      <a-col :span="12">
        <a-form
          :form="form"
          class="user-table">
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="昵称">
                <span v-if="!InfoState">{{ info.nickname }}</span>
                <a-input
                  v-else
                  placeholder="请输入名称"
                  v-decorator="['nickname',{rules: [{ required: true, message: '名称不能为空!' }],initialValue:info.nickname}]" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="用户名">
                <span v-if="!InfoState">{{ info.username }}</span>
                <a-input
                  v-else
                  disabled
                  placeholder="请输入用户名"
                  :value="info.username"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="性别">
                <span v-if="!InfoState && info.sex">{{ info.sex=="54"?'男':'女' }}</span>
                <span v-else-if="!InfoState && !info.sex">保密</span>
                <a-radio-group
                  v-decorator="['sex',{rules: [{ required: false, message: '性别不能为空!' }],initialValue:info.sex}]"
                  v-else>
                  <a-radio value="54">男</a-radio>
                  <a-radio value="53">女</a-radio>
                  <a-radio :value="null">保密</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="创建日期">
                <span v-if="!InfoState">{{ info.createTime }}</span>
                <a-input
                  v-else
                  disabled
                  :value="info.createTime"/>
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
                  disabled
                  value="*******"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="创建人">
                <span v-if="!InfoState">{{ info.createUserName }}</span>
                <a-input
                  v-else
                  disabled
                  :value="info.createUserName"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="手机号">
                <span v-if="!InfoState">{{ info.phone }}</span>
                <a-input
                  v-else
                  placeholder="请输入手机号"
                  v-decorator="['phone',{rules: [{ required: true, message: '手机号不能为空' }],initialValue:info.phone}]" />

              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="最近更新日期">
                <span v-if="!InfoState">{{ info.updateTime }}</span>
                <a-input
                  v-else
                  disabled
                  :value="info.updateTime"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">

              <a-form-item label="邮箱">
                <span v-if="!InfoState">{{ info.email }}</span>
                <a-input
                  v-else
                  placeholder="请输入邮箱"
                  v-decorator="['email',{rules: [{ required: true,pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱不能为空!' }],initialValue:info.email}]" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="最近更新人">
                <span v-if="!InfoState">{{ info.updateUserName }}</span>
                <a-input
                  v-else
                  disabled
                  :value="info.updateUserName"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="24"
            class="row1">
            <a-col
              :span="12"
              v-if="!InfoState">
              <a-form-item>
                <a-button
                  type="primary"
                  class="save"
                  @click="InfoState=true">
                  <a-icon type="cloud-upload" />修改</a-button>
              </a-form-item>
            </a-col>
            <a-col
              :span="12"
              v-else>
              <a-form-item>
                <a-button
                  class="cancel"
                  style="margin-right: 20px"
                  @click="cancelEdit">取消</a-button>
                <a-button
                  type="primary"
                  class="save"
                  @click="saveEdit">
                  <a-icon type="cloud-upload" />保存</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import CnbiUserManagement from '@/classes/lib/CnbiUserManagement'
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
      UserMObj: null,
      form: this.$form.createForm(this),
      InfoState: false,
      detailId: null, // 点击的用户详情对应的id
      info: null // 当前用户的所有详细信息
    }
  },
  created () {
    this.UserMObj = new CnbiUserManagement()
    this.detailId = this.$route.query.id
    this.getData()
  },
  methods: {
    // 进入页面  获取该用户的详细信息
    async getData () {
      const data = await this.UserMObj.findUserDetailInfo(this.detailId)
      data.data.createTime = new Date(data.data.createTime * 1).toLocaleString()
      data.data.updateTime = new Date(data.data.updateTime * 1).toLocaleString()
      // info.bindApps是一个数组，里面有对应账户的图标名称等信息
      this.info = data.data
      console.log(data.data, '877878787878')
    },

    handleChange (val) {

    },
    cancelEdit () {
      this.InfoState = false
    },
    saveEdit () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        console.log('values================', values)
        if (!err) {
          values.userId = this.detailId
          await _this.UserMObj.adminUpdate(values)
          this.InfoState = false
          this.getData()
        }
      })
    }

  }
}
</script>

<style scoped>
.user-table input {
  width: auto;
}
.user-table {
  max-width: 500px;
}
.user-detail {
  background-color: #fff;
  padding: 16px 32px;
}
.cancel:hover, .cancel:focus {
  color: #2D9C3C;
  border-color: #2D9C3C;
}
.save{
  border:1px solid rgba(45,156,60,1);
  background:linear-gradient(360deg,rgba(52,170,68,1) 0%,rgba(56,178,73,1) 100%);
  box-shadow:0px 1px 1px rgba(19,31,21,0.1);
  opacity:1;
  border-radius:4px
}
</style>
