<template>
  <a-modal
    :title="'部门排序'"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :afterClose="afterCloseModal">
    <a-form
      :form="form"
      :layout="formLayout">
      <a-form-item
        label="排序"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input-number placeholder="请输入排序" v-decorator="[ 'sort', validatorRules.sort]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { updateDept } from '@/api/dept'
export default {
  name: 'SectoralSortModal',
  data: function () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      model: {},
      validatorRules: {
        // text: { rules: [{ required: true, message: '部门名称不可为空' }, { max: 500, message: '全称不可以超过200位' }] }
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleCancel (e) {
      this.visible = false
    },
    afterCloseModal () {
      this.form.resetFields()
      this.model = {}
    },
    onEdit (record) {
      const _this = this
      this.showModal()
      this.model = record
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'sort': record.sort })
      })
    },
    // 点击保存之后
    handleOk: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          _this.confirmLoading = true
          const formData = JSON.parse(JSON.stringify(values))
          formData.id = _this.model.id
          const res = await updateDept(formData)
          if (res.code === 200) {
            _this.$message.success('更新成功')
          } else {
            _this.$message.error('更新失败')
          }
          _this.confirmLoading = false
          _this.visible = false
          _this.$emit('onBack')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
