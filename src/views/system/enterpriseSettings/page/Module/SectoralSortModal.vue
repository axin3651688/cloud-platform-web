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
      // 样式
      labelCol: { span: 4 },
      // 样式
      wrapperCol: { span: 20 },
      // 表单布局
      formLayout: 'horizontal',
      // 表单
      form: this.$form.createForm(this),
      // 是否可见
      visible: false,
      confirmLoading: false,
      // 表单model
      model: {},
      // 验证规则
      validatorRules: {
        // text: { rules: [{ required: true, message: '部门名称不可为空' }, { max: 500, message: '全称不可以超过200位' }] }
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
     * 取消事件
     * @param e
     */
    handleCancel (e) {
      this.visible = false
    },
    /**
     * 关闭莫条款之后
     */
    afterCloseModal () {
      this.form.resetFields()
      this.model = {}
    },
    /**
     * 编辑莫泰框
     * @param record
     */
    onEdit (record) {
      const _this = this
      this.showModal()
      this.model = record
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'sort': record.sort })
      })
    },
    /**
     * 确定事件
     */
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
