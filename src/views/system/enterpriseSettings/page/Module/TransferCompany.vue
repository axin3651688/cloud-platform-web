<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :afterClose="afterCloseModal">
    <a-form
      :form="form"
      :layout="formLayout">
      <a-form-item
        label="转让人"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-select
          v-decorator="['username', validatorRules.username]"
          placeholder="公司人数">
          <a-select-option v-for="item in Assignor" :key="item.id" :value="item.id">{{ item.text }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="级别"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="登陆密码" type="password" v-decorator="[ 'password', validatorRules.password]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'TransferCompany',
  data: function () {
    return {
      title: '转让公司',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      treeData: [],
      Assignor: [],
      validatorRules: {
        username: { rules: [{ required: true, message: '必须选择一个用户转让' }] },
        password: { rules: [{ required: true, message: '请填写密码' }] }
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    // 点击保存之后
    handleOk: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
        }
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    afterCloseModal () {
      this.form.resetFields()
    }
  },
  created () {

  }
}
</script>

<style scoped>

</style>
