<template>
  <a-modal
    :title="modeText() + '部门'"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :afterClose="afterCloseModal">
    <a-form
      :form="form"
      :layout="formLayout">
      <a-form-item
        label="部门名"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="输入部门的名称" v-decorator="[ 'text', validatorRules.text]"/>
      </a-form-item>
      <a-form-item
        label="部门简述"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="输入部门的简述" v-decorator="[ 'property1', validatorRules.property1]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { saveDept, updateDept } from '@/api/dept'
import typeUtil from '@/utils/typeUtils'
export default {
  name: 'SectoralAddModal',
  data: function () {
    return {
      mode: 'save',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      model: {},
      validatorRules: {
        text: { rules: [{ required: true, message: '部门名称不可为空' }, { max: 500, message: '全称不可以超过200位' }] },
        property1: { rules: [{ max: 500, message: '描述不可以超过100位' }] }
      }
    }
  },
  methods: {
    modeText: function () {
      return this.mode === 'save' ? '添加' : '更新'
    },
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
          let res
          if (_this.mode === 'save') {
            formData.comId = _this.model.comId
            if (typeUtil.isNotBlank(_this.model.pid)) {
              formData.pid = _this.model.pid
            }
            res = await saveDept(formData)
          } else {
            formData.id = _this.model.id
            res = await updateDept(formData)
          }
          if (res.code === 200) {
            _this.$message.success(_this.modeText() + '成功')
          } else {
            _this.$message.error(_this.modeText() + '失败')
          }
          _this.confirmLoading = false
          _this.visible = false
          _this.$emit('onBack')
        }
      })
    },
    onAdd (comId, pid) {
      this.showModal()
      this.model.comId = comId
      if (pid !== undefined) {
        this.model.pid = pid
      }
    },
    onEdit (record) {
      const _this = this
      this.showModal()
      this.model = record
      this.mode = 'update'
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'text': record.text })
        _this.form.setFieldsValue({ 'property1': record.property1 })
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    afterCloseModal () {
      this.mode = 'save'
      this.form.resetFields()
      this.model = {}
    }
  }
}
</script>

<style scoped>

</style>
