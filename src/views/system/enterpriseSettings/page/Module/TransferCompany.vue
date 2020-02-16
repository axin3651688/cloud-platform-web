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
        label="转让人"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-select
          v-decorator="['username', validatorRules.username]"
          placeholder="公司人数">
          <a-select-option v-for="item in Assignor" :key="item.id" :value="item.id">{{ item.text }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="级别"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="登陆密码" type="password" v-decorator="[ 'password', validatorRules.password]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'TransferCompany',
  data: function () {
    return {
      // 标题
      title: '转让公司',
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
      // 是否可以加载
      confirmLoading: false,
      // 树数据
      treeData: [],
      // 转让人
      Assignor: [],
      // 验证规则
      validatorRules: {
        username: { rules: [{ required: true, message: '必须选择一个用户转让' }] },
        password: { rules: [{ required: true, message: '请填写密码' }] }
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
     * 关闭模态框之后重置
     */
    afterCloseModal () {
      this.form.resetFields()
    }
  },
  created () {

  }
}
</script>

<style scoped>

</style>
