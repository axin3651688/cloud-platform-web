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
        label="字段名称">
        <a-input placeholder="请输出需要被删除的字段名称确认删除" v-decorator="[ 'text', validatorRules.text]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { del, queryByField } from '@/api/customForm'
export default {
  name: 'DeleteCustomFieldModal',
  data: function () {
    return {
      title: '删除自定义字段',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'vertical',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      validatorRules: {
        text: { rules: [{ required: true, message: '自定义名称不可为空' }, { max: 30, message: '自定义名称不可超过30位' }] }
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          this.confirmLoading = true
          const formData = JSON.parse(JSON.stringify(values))
          formData.code = 'com'
          const res = await queryByField(formData)
          if (Array.isArray(res.data) && res.data.length > 0) {
            const delData = res.data[0]
            const delRes = await del({ id: delData.id })
            if (delRes.code === 200) {
              _this.$message.success('删除成功')
              _this.confirmLoading = false
              _this.visible = false
              _this.$emit('back')
            } else {
              _this.$message.error('删除失败')
            }
          } else {
            _this.$message.warn('没有查询到该字段')
            _this.confirmLoading = false
          }
        }
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    afterCloseModal () {
      this.form.resetFields()
      this.model = {}
    }
  }
}
</script>

<style scoped>

</style>
