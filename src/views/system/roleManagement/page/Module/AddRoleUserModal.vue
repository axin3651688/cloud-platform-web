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
          <a-select mode="multiple" placeholder="请选择对应的成员" v-decorator="['users', validatorRules.users]">
            <a-select-option v-for="user in userData" :key="user.id">{{ user.trueName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { findUserByRule } from '@/api/user'
import { saveRoleUser } from '@/api/userRole'

export default {
  name: 'AddRoleUserModal',
  props: {
    roleId: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      title: '添加成员',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      confirmLoading: false,
      visible: false,
      validatorRules: {
        users: { rules: [{ required: true, message: '成员不可为空' }] }
      },
      userData: []
    }
  },
  methods: {
    async showModal () {
      await this.loadUserData()
      this.visible = true
    },
    handleOk () {
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
          const res = await saveRoleUser({ roleId: _this.roleId }, formData.users)
          if (res.code === 200) {
            _this.$message.info('添加成功')
          } else {
            _this.$message.error('添加失败')
          }
          _this.confirmLoading = false
          _this.visible = false
          this.$emit('back')
        }
      })
    },
    afterCloseModal () {
      this.form.resetFields()
    },
    loadUserData: async function () {
      const res = await findUserByRule()
      this.userData = res.data
    }
  }
}
</script>

<style scoped>

</style>
