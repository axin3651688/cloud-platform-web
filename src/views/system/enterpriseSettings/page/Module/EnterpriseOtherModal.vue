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
        label="企业编码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="数字编码" v-decorator="['srcId']"/>
      </a-form-item>
      <a-form-item
        label="企业数据编码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="数字编码" v-decorator="['srcId2']"/>
      </a-form-item>
      <a-form-item
        label="企业信息编码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="数字编码" v-decorator="['srcId3']"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { updateCompany } from '@/api/company'
export default {
  name: 'EnterpriseOtherModal',
  data: function () {
    return {
      title: '企业其他资料',
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      model: {}
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
          _this.confirmLoading = true
          const formData = JSON.parse(JSON.stringify(values))
          formData.id = _this.model.id
          updateCompany(formData).then(function (res) {
            _this.confirmLoading = false
            _this.visible = false
            if (res.code === 200) {
              _this.$message.success('更新成功')
            } else {
              _this.$message.success('更新失败')
            }
            _this.$emit('onBack')
          })
        }
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    onEdit: function (record) {
      const _this = this
      this.showModal()
      this.model = record
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'srcId': record.srcId })
        _this.form.setFieldsValue({ 'srcId2': record.srcId2 })
        _this.form.setFieldsValue({ 'srcId3': record.srcId3 })
      })
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
