<template>
  <div class="wrapper" style="background-color: #fff">
    <a-form
      :form="form"
      :layout="formLayout">
      <a-form-item
        label="企业logo"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <system-upload @success="onUploadSuccess" :url="imgUrl" :show-del="false"></system-upload>
      </a-form-item>
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
        label="行业"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-cascader :options="options" placeholder="行业" :fieldNames="{ label: 'text', value: 'id', children: 'children' }" changeOnSelect v-decorator="[ 'property4']" />
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
import { saveCompany } from '@/api/company'
import { queryByField } from '@/api/customForm'
import { findAllIndustry } from '@/api/common'

import AddCustomFieldModal from './AddCustomFieldModal'
import CustomFormItem from './CustomFormItem'
import DeleteCustomFieldModal from './DeleteCustomFieldModal'
import SystemUpload from './SystemUpload'
export default {
  name: 'CompanySaveForm',
  components: { SystemUpload, DeleteCustomFieldModal, CustomFormItem, AddCustomFieldModal },
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
      customField: [],
      imgUrl: '',
      imgId: 0
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
          if (_this.imgId !== 0) {
            formData.avatar = _this.imgId
          }
          if (Array.isArray(formData.property4)) {
            formData.property4 = formData.property4.join(',')
          }
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
      this.form.resetFields()
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
    },
    onUploadSuccess: function (imgData) {
      if (imgData) {
        this.imgUrl = imgData.thumbUrl
        this.imgId = imgData.id
      }
    }
  },
  watch: {
    pid: function (newVal) {
      this.imgUrl = ''
      this.imgId = 0
      this.form.resetFields()
    }
  },
  created () {
    this.refreshField()
    const _this = this
    findAllIndustry().then(function (res) {
      _this.options = res.data
    })
  }
}
</script>

<style scoped>

</style>
