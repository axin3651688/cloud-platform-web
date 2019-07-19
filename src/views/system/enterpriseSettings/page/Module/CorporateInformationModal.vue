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
      <a-form-item
        label="电话"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="多个电话使用，分开" v-decorator="[ 'property1']"/>
      </a-form-item>
      <a-form-item
        label="所属地区"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-cascader
          :options="options"
          placeholder="请选择地区"
          :fieldNames="{ label: 'text', value: 'id', children: 'children' }"
          changeOnSelect
          v-decorator="[ 'property2']" />
      </a-form-item>
      <a-form-item
        label="详细地址"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="详细地址" v-decorator="[ 'property6', validatorRules.property6]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import { findAllPlace } from '@/api/common'
import { updateCompany } from '@/api/company'
import typeUtils from '@/utils/typeUtils'

export default {
  name: 'CorporateInformationModal',
  data: function () {
    return {
      title: '企业资料',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      validatorRules: {
        fullName: { rules: [{ required: true, message: '全称不可为空' }, { max: 500, message: '全称不可以超过500位' }] },
        text: { rules: [{ required: true, message: '简称不可为空' }, { max: 500, message: '简称不可以超过200位' }] }
      },
      options: [],
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
          if (Array.isArray(formData.property2)) {
            formData.property2 = formData.property2.join(',')
          }
          formData.id = _this.model.id
          updateCompany(formData).then(function (res) {
            _this.confirmLoading = false
            _this.visible = false
            if (res.code === 200) {
              _this.$message.success('添加成功')
            } else {
              _this.$message.success('添加失败')
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
        _this.form.setFieldsValue({ 'fullName': record.fullName })
        _this.form.setFieldsValue({ 'text': record.text })
        _this.form.setFieldsValue({ 'property1': record.property1 })
        if (typeUtils.isNotBlank(record.property2)) {
          _this.form.setFieldsValue({ 'property2': record.property2.split(',') })
        }
        _this.form.setFieldsValue({ 'property6': record.property6 })
      })
    },
    afterCloseModal () {
      this.form.resetFields()
    },
    loadData: function (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
    }
  },
  mounted () {
    const _this = this
    // 初始化地区数据
    findAllPlace().then(function (res) {
      _this.options = res.data
    })
  }
}
</script>

<style scoped>

</style>
