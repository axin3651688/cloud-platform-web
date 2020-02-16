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
          <a-select
            showSearch
            :filterOption="filterOption"
            mode="multiple"
            placeholder="请选择对应的成员"
            v-decorator="['users', validatorRules.users]">
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
      // 标题
      title: '添加成员',
      // 格式
      labelCol: { span: 4 },
      // 格式
      wrapperCol: { span: 20 },
      // 布局
      formLayout: 'horizontal',
      // 表单
      form: this.$form.createForm(this),
      confirmLoading: false,
      // 是否显示
      visible: false,
      // 表单验证规则
      validatorRules: {
        users: { rules: [{ required: true, message: '成员不可为空' }] }
      },
      // 用户数据
      userData: []
    }
  },
  methods: {
    /**
     * 显示模态框
     * @return {Promise<void>}
     */
    async showModal () {
      await this.loadUserData()
      this.visible = true
    },
    /**
     * 确认事件
     */
    handleOk () {
      this.handleSubmit()
    },
    /**
     * 取消事件
     * @param e
     */
    handleCancel (e) {
      this.visible = false
    },
    /**
     * 提交事件
     */
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
    /**
     * 关闭事件
     */
    afterCloseModal () {
      this.form.resetFields()
    },
    /**
     * 加载用户数据
     * @return {Promise<void>}
     */
    loadUserData: async function () {
      const res = await findUserByRule()
      this.userData = res.data
    },
    /**
     * 过滤选项
     * @param input
     * @param option
     * @return {boolean}
     */
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  }
}
</script>

<style scoped>

</style>
