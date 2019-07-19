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
        label="排序"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-input placeholder="序号，从大到小排序" v-decorator="[ 'sort', validatorRules.sort]"/>
      </a-form-item>
      <a-form-item
        label="级别"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-tree-select
          style="width: 300px"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="treeData"
          placeholder="选择上级公司"
          treeDefaultExpandAll
          v-decorator="[ 'comPid', validatorRules.comPid]">
        </a-tree-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { getAllCompanyTree, updateCompany, updateCompanyStructure } from '@/api/company'
export default {
  name: 'EnterpriseLevelModal',
  data: function () {
    return {
      title: '企业级别',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      treeData: [],
      validatorRules: {
        sort: { rules: [{ required: true, message: '请输入排序' }, { type: 'string', message: '只能填写数字' }] },
        comPid: { rules: [{ required: true, message: '必须填写上级公司' }] }
      },
      model: {}
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    // 点击保存之后
    handleOk: function () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          _this.confirmLoading = true
          const formData = JSON.parse(JSON.stringify(values))
          formData.id = _this.model.id
          // 更新排序
          const promise1 = updateCompany({ id: formData.id, sort: formData.sort })
          // 更新父子级关系
          let promise2 = null
          if (formData.comPid !== _this.model.pid) {
            promise2 = updateCompanyStructure({ comId: formData.id, comPid: formData.comPid })
          }
          Promise.all([promise1, promise2]).then(function (res) {
            _this.confirmLoading = false
            _this.visible = false
            if (res[0].code === 200) {
              _this.$message.success('更新成功')
            } else {
              _this.$message.error('更新失败')
            }
            _this.$emit('onBack')
          })
        }
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    onEdit: function (record) {
      this.renderCompanyTree(record.id)
      const _this = this
      this.showModal()
      this.model = record
      this.$nextTick(() => {
        _this.form.setFieldsValue({ 'sort': record.sort })
        _this.form.setFieldsValue({ 'comPid': record.pid })
      })
    },
    afterCloseModal () {
      this.form.resetFields()
    },
    delSelfAndChildren (tree, id) {
      const _this = this
      tree.forEach(function (ele, index) {
        if (ele.id === id) {
          tree.splice(index, 1)
        }
        if (Array.isArray(ele.children)) {
          _this.delSelfAndChildren(ele.children, id)
        }
      })
    },
    renderCompanyTree (exceptId) {
      const _this = this
      // 查询公司树，显示除了自己公司和自己子级公司的其他公司
      getAllCompanyTree().then(function (treeData) {
        if (exceptId !== undefined) {
          _this.delSelfAndChildren(treeData, exceptId)
        }
        _this.treeData = treeData
      })
    }
  },
  created () {

  }
}
</script>

<style scoped>

</style>
