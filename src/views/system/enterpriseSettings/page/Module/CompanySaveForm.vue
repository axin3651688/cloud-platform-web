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

      <custom-form-item
        v-for="item in customField"
        :key="item.text"
        :text="item.text"
        :value="item.value"
        :placeholder="item.placeholder"
        :fieldType="parseInt(item.fieldType)"
        :inputType="parseInt(item.inputType)"
      ></custom-form-item>

      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-button type="default" @click="onClickAddField">添加自定义字段</a-button>
        <a-button type="danger" @click="onClickDeleteField">移除自定义字段</a-button>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 2 }">
        <a-button type="primary" @click="handleSubmit" :loading="loading">提交</a-button>
      </a-form-item>
    </a-form>
    <add-custom-field-modal ref="addCustomFieldModal" @back="onModalBack"></add-custom-field-modal>
    <delete-custom-field-modal ref="delCustomFieldModal" @back="onModalBack"></delete-custom-field-modal>
  </div>
</template>

<script>
import { saveCompany, updateCompany } from '@/api/company'
import { save, update, del, queryByField } from '@/api/customForm'
import AddCustomFieldModal from './AddCustomFieldModal'
import CustomFormItem from './CustomFormItem'
import typeUtils from '@/utils/typeUtils'
import DeleteCustomFieldModal from './DeleteCustomFieldModal'
export default {
  name: 'CompanySaveForm',
  components: { DeleteCustomFieldModal, CustomFormItem, AddCustomFieldModal },
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
      loading: false,
      customField: []
    }
  },
  methods: {
    handleSubmit: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          _this.loading = true
          const formData = JSON.parse(JSON.stringify(values))
          formData.customField = JSON.stringify(_this.getCustomFiled(formData))
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
    },
    onClickAddField: function () {
      this.$refs.addCustomFieldModal.showModal()
    },
    onClickDeleteField: function () {
      this.$refs.delCustomFieldModal.showModal()
    },
    onModalBack: function () {
      this.refreshField()
    },
    getCustomFiled (formData) {
      const customField = {}
      if (Array.isArray(this.customField)) {
        this.customField.forEach(function (ele) {
          customField[ele.value] = formData[ele.value]
        })
      }
      console.log(customField)
      return customField
    },
    refreshField: function () {
      const _this = this
      queryByField({ code: 'com' }).then(function (res) {
        if (res.code === 200) {
          _this.customField = res.data
        }
      })
    }
  },
  created () {
    this.refreshField()
  }
}
</script>

<style scoped>

</style>
