<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :afterClose="afterCloseModal">
      <a-form
        :form="form"
        :layout="formLayout"
        @submit="handleSubmit">
        <a-form-item
          label="角色名称"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-input
            placeholder="请输入角色名称"
            v-decorator="['text',validatorRules.text]"/>
        </a-form-item>
        <a-form-item
          label="角色描述"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-input
            placeholder="请输入角色描述"
            v-decorator="['desc']"/>
        </a-form-item>
        <a-form-item
          label="排序"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-input-number
            placeholder="排序"
            v-decorator="['sort',validatorRules.sort]"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { findAllRole, findById, findRoleByField, saveRole, updateRole } from '@/api/role'
import AFormItem from 'ant-design-vue/es/form/FormItem'
export default {
  name: 'RoleModal',
  components: { AFormItem },
  data () {
    return {
      title: '添加角色',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      confirmLoading: false,
      visible: false,
      validatorRules: {
        text: { rules: [{ required: true, message: '名称不可为空' }, { validator: this.validateTextExist }] },
        sort: { rules: [{ required: true, message: '排序不可为空' }] }
      },
      editMode: false,
      editId: undefined
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.handleSubmit()
    },
    handleCancel (e) {
      this.visible = false
    },
    handleSubmit () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          _this.confirmLoading = true
          const formData = JSON.parse(JSON.stringify(values))
          let res
          if (_this.editMode) {
            formData.id = _this.editId
            res = await updateRole(formData)
          } else {
            res = await saveRole(formData)
          }
          if (res.code === 200) {
            _this.$message.success('操作成功')
          } else {
            _this.$message.error('操作失败')
          }
          _this.confirmLoading = false
          _this.visible = false
          this.$emit('back')
        }
      })
    },
    onEdit (record) {
      const _this = this
      _this.title = '修改角色'
      _this.editMode = true
      _this.editId = record.id
      _this.visible = true
      // 根据id获取该角色的名称和排序
      findById({ id: record.id }).then(function (res) {
        _this.form.setFieldsValue({ 'text': res.data.text })
        _this.form.setFieldsValue({ 'desc': res.data.desc })
        _this.form.setFieldsValue({ 'sort': res.data.sort })
      })
    },
    afterCloseModal () {
      this.form.resetFields()
      this.title = '添加角色'
      this.editMode = false
      this.editId = undefined
    },
    validateTextExist (rule, value, callback) {
      const _this = this
      findRoleByField({ text: value }).then(function (res) {
        if (!_this.editMode && res.data.length > 0) {
          callback('角色名称已存在')
        } else if (_this.editMode && res.data.length > 0) {
          const data = res.data.filter(function (ele) {
            return ele.id !== _this.editId
          })
          if (data.length > 0) {
            callback('角色名称已存在')
          } else {
            callback()
          }
        } else {
          callback()
        }
      })
    }
  },
  mounted () {
    const _this = this
    findAllRole().then(function (res) {
      _this.roleData = res.data
    })
  }
}
</script>

<style scoped>

</style>
