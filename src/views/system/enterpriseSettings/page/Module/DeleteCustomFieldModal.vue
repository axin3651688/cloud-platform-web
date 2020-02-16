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
      // 标题
      title: '删除自定义字段',
      // 样式
      labelCol: { span: 4 },
      // 样式
      wrapperCol: { span: 20 },
      // form布局
      formLayout: 'vertical',
      // 表单初始化
      form: this.$form.createForm(this),
      // 是否可见
      visible: false,
      confirmLoading: false,
      // 验证规则
      validatorRules: {
        text: { rules: [{ required: true, message: '自定义名称不可为空' }, { max: 30, message: '自定义名称不可超过30位' }] }
      }
    }
  },
  methods: {
    /**
     * 显示莫泰框
     */
    showModal () {
      this.visible = true
    },
    /**
     * 确认事件
     */
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
    /**
     * 取消事件
     * @param e
     */
    handleCancel (e) {
      this.visible = false
    },
    /**
     * 关闭事件
     */
    afterCloseModal () {
      this.form.resetFields()
      this.model = {}
    }
  }
}
</script>

<style scoped>

</style>
