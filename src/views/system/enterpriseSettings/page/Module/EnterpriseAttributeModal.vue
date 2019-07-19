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
        label="规模"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-select
          v-decorator="['property3']"
          placeholder="公司人数">
          <a-select-option v-for="item in pNumberOption" :key="item.id" :value="item.id">{{ item.text }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="行业"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-cascader :options="options" placeholder="行业" :fieldNames="{ label: 'text', value: 'id', children: 'children' }" changeOnSelect v-decorator="[ 'property4']" />
      </a-form-item>
      <a-form-item
        label="单位性质"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-select
          v-decorator="['property5']"
          placeholder="">
          <a-select-option v-for="item in unitCharacterOption" :key="item.id" :value="item.id">{{ item.text }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { findAllIndustry, findDictByCode } from '@/api/common'
import typeUtils from '@/utils/typeUtils'
import { updateCompany } from '@/api/company'
export default {
  name: 'EnterpriseAttributeModal',
  data: function () {
    return {
      title: '企业属性',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      options: [],
      pNumberOption: [],
      unitCharacterOption: [],
      model: {}
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    onEdit (record) {
      const _this = this
      this.showModal()
      this.model = record
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'property3': record.property3 })
        if (typeUtils.isNotBlank(record.property4)) {
          _this.form.setFieldsValue({ 'property4': record.property4.split(',') })
        }
        _this.form.setFieldsValue({ 'property5': record.property5 })
      })
    },
    // 点击保存之后
    handleOk: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          _this.confirmLoading = true
          const formData = JSON.parse(JSON.stringify(values))
          if (Array.isArray(formData.property4)) {
            formData.property4 = formData.property4.join(',')
          }
          formData.id = _this.model.id
          updateCompany(formData).then(function (res) {
            _this.confirmLoading = false
            _this.visible = false
            if (res.code === 200) {
              _this.$message.success('更新成功')
            } else {
              _this.$message.error('更新失败')
            }
            _this.$emit('onBack')
          })
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
    const _this = this
    findAllIndustry().then(function (res) {
      _this.options = res.data
    })
    findDictByCode({ code: 3 }).then(function (res) {
      _this.pNumberOption = res.data
    })
    findDictByCode({ code: 2 }).then(function (res) {
      _this.unitCharacterOption = res.data
    })
  }
}
</script>

<style scoped>

</style>
