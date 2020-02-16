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
        label="自定义名称">
        <a-input placeholder="添加新自定义字段" v-decorator="[ 'text', validatorRules.text]"/>
      </a-form-item>
      <a-form-item>
        <a-radio-group v-decorator="[ 'fieldType', validatorRules.fieldType]">
          <a-radio-button v-for="item in fieldTypeGroup" :key="item.value" :value="item.value">{{ item.text }}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-radio-group v-decorator="[ 'inputType', validatorRules.inputType]">
          <a-radio v-for="item in inputTypeGroup" :key="item.value" :value="item.value">{{ item.text }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="默认提示文字" v-decorator="[ 'placeholder', validatorRules.placeholder]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import AFormItem from 'ant-design-vue/es/form/FormItem'
import { save, update, del, queryByField } from '@/api/customForm'
export default {
  name: 'AddCustomFieldModal',
  components: { AFormItem },
  data: function () {
    return {
      // 标题
      title: '添加自定义字段',
      // 样式设置
      labelCol: { span: 4 },
      // 样式设置
      wrapperCol: { span: 20 },
      // 表格的layout
      formLayout: 'vertical',
      // 初始化form
      form: this.$form.createForm(this),
      // 是否可见
      visible: false,
      // 官方属性
      confirmLoading: false,
      // 验证规则
      validatorRules: {
        text: { rules: [{ required: true, message: '自定义名称不可为空' }, { max: 30, message: '自定义名称不可超过30位' }] },
        fieldType: { rules: [{ required: true, message: '字段类型不可为空' }], initialValue: 1 },
        inputType: { rules: [{ required: true, message: '输入框类型不可为空' }], initialValue: 1 },
        placeholder: { rules: [{ required: true, message: '默认提示文字不可为空' }, { max: 100, message: '默认提示文字不可超过100位' }] }
      },
      // 数据
      model: {},
      // 字典数据
      fieldTypeGroup: [
        {
          value: 1,
          text: '文本'
        },
        {
          value: 2,
          text: '日期'
        },
        {
          value: 3,
          text: '数值'
        }
      ],
      // 输入框类型
      inputTypeGroup: [
        {
          value: 1,
          text: '输入框'
        },
        {
          value: 2,
          text: '多行输入框'
        },
        {
          value: 3,
          text: '单选框'
        },
        {
          value: 4,
          text: '多选框'
        }
      ]
    }
  },
  methods: {
    /**
     * 莫泰框的显示影藏
     */
    showModal () {
      this.visible = true
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 确认事件
    */
    handleOk: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          this.confirmLoading = true
          const formData = JSON.parse(JSON.stringify(values))
          let text = '保存'
          formData.code = 'com'
          formData.value = formData.text
          let promise
          if (_this.model.id) {
            formData.id = _this.model.id
            text = '更新'
            promise = update(formData)
          } else {
            promise = save(formData)
          }
          promise.then(function (res) {
            if (res.code === 200) {
              _this.$message.success(text + '成功')
            } else {
              _this.$message.error(text + '保存失败')
            }
            _this.confirmLoading = false
            _this.visible = false
            _this.$emit('back')
          })
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
     * 编辑事件
     * @param record
     */
    onEdit: function (record) {
      const _this = this
      this.showModal()
      this.model = record
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'text': record.text })
        _this.form.setFieldsValue({ 'fieldType': record.fieldType })
        _this.form.setFieldsValue({ 'inputType': record.inputType })
        _this.form.setFieldsValue({ 'placeholder': record.placeholder })
      })
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

<style lang="scss" scoped>

</style>
