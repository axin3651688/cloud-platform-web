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
          label="排序" 
          :label-col="labelCol" 
          :wrapper-col="wrapperCol">
          <a-input
            placeholder="请输入排序"
            v-decorator="['sort',validatorRules.sort]"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { findAllRole, findById, findRoleByText } from '@/api/role'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import { saveRole, updateRole, deleteRole } from '@/api/role'
export default {
  name: 'RoleModal',
  components: { AFormItem },
  data() {
    return {
      title: '添加角色',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      confirmLoading: false,
      visible: false,
      validatorRules: {
        text: { rules: [{ required: true, message: '名称不可为空' }, 
                            { validator: this.validateTextExist }] },
        sort: { rules: [{ required: true, message: '排序不可为空' }, 
                            { max: 3, message: '排序' }] },
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
      debugger
      this.handleSubmit()
    },
    handleCancel (e) {
      this.visible = false
    },
    handleSubmit () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if(!err){
          _this.confirmLoading = true
          if (_this.editMode === false) {
            //判断这个角色在系统中存在不？
            const exist = await _this.askSysTemExist(values.text)
            if(!exist){
              //不存在才能添加
              const roleDto = {
                  text: values.text,
                  sort: values.sort
              }
              const res =  await this.saveHandler(roleDto)
            }else{
              //存在就提醒"该角色已经存在"
              _this.visible = false
              _this.confirmLoading = false
              _this.$message.error('该角色已经存在')
            }
          }else{
            values.id = _this.editId
            //编辑模态框的时候走
            const exist = await _this.askSysTemExist(values.text)
            if(!exist){
              //不存在才能添加
              const roleInfo = {
                    id: values.id,
                  text: values.text,
                  sort: values.sort
              }
              const res =  await this.updateHandler(roleInfo)
            }
          }
          _this.visible = false
          _this.confirmLoading = false
        }
      })
    },
    onEdit(record){
      debugger
      const _this = this
      // 编辑用户走这里相同的莫泰框，逻辑不同
      // 注意这句话要先走
      _this.title = '修改角色'
      _this.editMode = true
      _this.editId = record.id
      _this.visible = true
      //根据id获取该角色的名称和排序
      findById({id:record.id}).then(function (res){
        _this.form.setFieldsValue({'text':res.data.text})
        _this.form.setFieldsValue({'sort':res.data.sort})
      })
    },
    afterCloseModal () {
      this.form.resetFields()
      this.title = '添加角色'
      this.editMode = false
      this.editId = undefined
    },
    validateTextExist(rule, value, callback){
      debugger
      const _this = this
      findRoleByText({ text: value}).then(function(res){
        if (!_this.editMode && res.data.length > 0) {
          callback('角色名称已存在')
        }else if (_this.editMode && res.data.length > 0) {
          const data = res.data.filter(function (ele) {
            return ele.id !== _this.editId
          })
          if (data.length < 0) {
            callback('角色名称已存在')
          } else {
            callback()
          }
        } else {
          callback()
        }
      })

    },
    saveHandler (paramter) {
      const _this = this
      saveRole(paramter).then(function (res) {
        if (res.code === 200) {
          _this.$message.success('保存成功')
        } else {
          _this.$message.error('保存失败')
        }
      })
    },
    updateHandler (form) {
      debugger
      // console.log('form',form)
      const _this = this
      updateRole(form).then(function (res) {
        if (res.code === 200) {
          _this.$message.success('更新成功')
        } else {
          _this.$message.error('更新失败')
        }
      })
    },
    askSysTemExist(text){
      return findAllRole().then(function (res) {
        if (res.data && res.data.id) {
          return true
        } else {
          return false
        }
      })
    }
  },
  watch: {
    visible: function (newVal, oldVal) {
      if (newVal) this.showModal()
    }
  },
  mounted(){
    const _this = this;
    findAllRole().then(function (res) {
      _this.roleData = res.data
    })
  }
}
</script>

<style scoped>

</style>
