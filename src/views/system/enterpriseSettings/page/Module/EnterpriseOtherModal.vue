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
        <a-input placeholder="数据编码" v-decorator="['srcId2']"/>
      </a-form-item>
      <a-form-item
        label="企业信息编码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="信息编码" v-decorator="['srcId3']"/>
      </a-form-item>
      <custom-form-item
        v-for="item in customField"
        :key="item.text"
        :text="item.text"
        :value="item.value"
        :placeholder="item.placeholder"
        :fieldType="parseInt(item.fieldType)"
        :inputType="parseInt(item.inputType)"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      ></custom-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { updateCompany } from '@/api/company'
import CustomFormItem from './CustomFormItem'
import { save, update, del, queryByField } from '@/api/customForm'
import typeUtil from '@/utils/typeUtils'
export default {
  name: 'EnterpriseOtherModal',
  components: { CustomFormItem },
  data: function () {
    return {
      title: '企业其他资料',
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      model: {},
      customField: []
    }
  },
  methods: {
    async showModal () {
      this.visible = true
    },
    // 点击保存之后
    handleOk: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          _this.confirmLoading = true
          const formData = JSON.parse(JSON.stringify(values))
          formData.customField = JSON.stringify(_this.getCustomFiled(formData))
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
      this.refreshField().then(function () {
        _this.$nextTick(() => {
          _this.form.setFieldsValue({ 'srcId': record.srcId })
          _this.form.setFieldsValue({ 'srcId2': record.srcId2 })
          _this.form.setFieldsValue({ 'srcId3': record.srcId3 })
          if (typeUtil.isNotBlank(record.customField) && typeUtil.isObject(JSON.parse(record.customField))) {
            const customField = JSON.parse(record.customField)
            for (const item in customField) {
              _this.form.fieldsStore.setFieldsInitialValue({ [item]: customField[item] })
            }
          }
        })
      })
    },
    afterCloseModal () {
      this.form.resetFields()
    },
    getCustomFiled (formData) {
      const customField = {}
      if (Array.isArray(this.customField)) {
        this.customField.forEach(function (ele) {
          customField[ele.value] = formData[ele.value]
        })
      }
      return customField
    },
    refreshField: function () {
      const _this = this
      return queryByField({ code: 'com' }).then(function (res) {
        if (res.code === 200) {
          _this.customField = res.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
