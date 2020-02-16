<template>
  <a-modal
    :title="modeText()+'职位'"
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
        <a-input placeholder="请输入职位名称" v-decorator="[ 'text', validatorRules.name]"/>
      </a-form-item>
      <a-form-item
        label="描述"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-textarea placeholder="请输入职位描述"  v-decorator="[ 'desc', validatorRules.desc]" :rows="4"></a-textarea>
      </a-form-item>
      <a-form-item
        label="排序"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input-number placeholder="排序" v-decorator="[ 'sort', validatorRules.sort]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { savePost, updatePost } from '@/api/post'
export default {
  name: 'PostModal',
  data: function () {
    return {
      // 模式，默认保存
      mode: 'save',
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
      // model
      model: {},
      // 验证规则
      validatorRules: {
        text: { rules: [{ required: true, message: '职位名称不可为空' }, { max: 500, message: '职位名称不可以超过20位' }] },
        desc: { rules: [{ max: 500, message: '职位描述不可以超过500位' }] }
      }
    }
  },
  methods: {
    /**
     * modelText
     * @return {string}
     */
    modeText: function () {
      return this.mode === 'save' ? '添加' : '更新'
    },
    /**
     * 是否显示莫泰框
     * @return {string}
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
     * 关闭莫泰框
     */
    afterCloseModal () {
      this.mode = 'save'
      this.form.resetFields()
      this.model = {}
    },
    /**
     * 编辑事件
     * @param record
     */
    onEdit (record) {
      const _this = this
      this.mode = 'update'
      this.showModal()
      this.model = record
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'text': record.text })
        _this.form.setFieldsValue({ 'desc': record.desc })
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
          let res
          if (_this.mode === 'save') {
            res = await savePost(formData)
          } else {
            formData.id = _this.model.id
            res = await updatePost(formData)
          }
          if (res.code === 200) {
            _this.$message.success(this.modeText() + '成功')
          } else {
            _this.$message.error(this.modeText() + '失败')
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
