<template>
  <a-modal
    :title="'更改部门结构'"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :afterClose="afterCloseModal">
    <a-form
      :form="form"
      :layout="formLayout">
      <a-form-item
        label="上级部门"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-tree-select
          style="width: 300px"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="treeData"
          placeholder="上级部门"
          treeDefaultExpandAll
          v-decorator="[ 'deptPid', validatorRules.deptPid]">
        </a-tree-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { updateDeptStructure, getDeptTreeByComId } from '@/api/dept'
import { delSelfAndChildren } from '@/utils/treeUtil'
export default {
  name: 'SectoralStructureModal',
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
      // 莫泰框
      model: {},
      // 验证规则
      validatorRules: {
        deptPid: { rules: [/* { required: true, message: '' } */] }
      },
      // 树数据
      treeData: []
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
     * 取消
     */
    handleCancel (e) {
      this.visible = false
    },
    /**
     * 关闭莫泰框
     */
    afterCloseModal () {
      this.form.resetFields()
      this.model = {}
    },
    /**
     * 编辑莫泰框
     */
    onEdit (record) {
      const _this = this
      this.renderDeptTree(record.comId, record.id)
      this.showModal()
      this.model = record
      this.$nextTick(() => {
        console.log(record.pid)
        _this.form.setFieldsValue({ 'deptPid': record.pid })
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
          formData.deptId = _this.model.id
          const res = await updateDeptStructure(formData)
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
    },
    /**
     * 渲染部门树
     * @param comId
     * @param exceptId
     */
    renderDeptTree (comId, exceptId) {
      const _this = this
      getDeptTreeByComId({ comId: comId }).then(function (treeData) {
        if (exceptId !== undefined) {
          delSelfAndChildren(treeData, exceptId)
        }
        const superTree = [{
          id: comId,
          pid: '',
          text: '顶级部门',
          key: comId,
          title: '顶级部门',
          value: comId,
          scopedSlots: {
            title: 'title'
          },
          children: treeData
        }]
        _this.treeData = superTree
      })
    }
  }
}
</script>

<style scoped>

</style>
