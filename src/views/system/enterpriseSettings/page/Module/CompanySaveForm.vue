<template>
  <div class="wrapper" style="background-color: #fff">
    <a-form
      :form="form"
      :layout="formLayout">
      <a-form-item
        label="名称"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="企业全称" v-decorator="[ 'fullName', validatorRules.fullName]"/>
      </a-form-item>
      <a-form-item
        label="简称"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="企业简称" v-decorator="[ 'text', validatorRules.text]"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-button type="primary" @click="handleSubmit" :loading="loading">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { saveCompany, updateCompany } from '@/api/company'
export default {
  name: 'CompanySaveForm',
  props: {
    pid: {
      type: String,
      default: undefined
    }
  },
  data: function () {
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      validatorRules: {
        fullName: { rules: [{ required: true, message: '全称不可为空' }, { max: 500, message: '全称不可以超过500位' }] },
        text: { rules: [{ required: true, message: '简称不可为空' }, { max: 500, message: '简称不可以超过200位' }] }
      },
      options: [],
      loading: false
    }
  },
  methods: {
    handleSubmit: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          _this.loading = true
          const formData = JSON.parse(JSON.stringify(values))
          formData.pid = _this.pid
          saveCompany(formData).then(function (res) {
            if (res.code === 200) {
              _this.$message.success('保存成功')
            } else {
              _this.$message.error('保存失败')
            }
            _this.loading = false
            _this.onBack()
          })
        }
      })
    },
    onBack: function () {
      this.$emit('onBack')
    }
  }
}
</script>

<style scoped>

</style>
