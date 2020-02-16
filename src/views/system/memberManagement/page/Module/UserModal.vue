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
          label="真实姓名"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-input placeholder="请输入真实姓名" v-decorator="[ 'trueName', validatorRules.trueName]"/>
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-input placeholder="请输入手机号" v-decorator="[ 'phone', validatorRules.phone]"/>
        </a-form-item>
        <a-form-item
          label="性别"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-select
            v-decorator="['gender', validatorRules.gender]"
            placeholder="请选择一个性别">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="职位"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-select
            v-decorator="['presentPost']"
            placeholder="请选择一个职位">
            <a-select-option v-for="d in postData" :key="d.id">{{ d.text }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="所属公司"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-tree-select
            v-decorator="['company', validatorRules.company]"
            :treeData="comTreeData"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择所属公司"
            allowClear
            @change="onComChange">
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="所属部门"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-tree-select
            v-decorator="['dept']"
            :treeData="deptTreeData"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择所属部门"
            allowClear
            @change="onDeptChange">
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="角色"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
          <a-select mode="multiple" @change="onRoleChange" placeholder="请选择角色！" v-decorator="['role']">
            <a-select-option v-for="d in roleData" :key="d.id">{{ d.text }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import AFormItem from 'ant-design-vue/es/form/FormItem'
import { getAllCompanyTree, getCompanyDeptTree } from '@/api/company'
import { findAllPost } from '@/api/post'
import { findAllRole } from '@/api/role'
import { saveUser, saveUserToSystem, modifyUser, findUserByRule, findSystemUserByPhone } from '@/api/user'
import { updateUserRole, findUserRole } from '@/api/userRole'
import { saveUserPrimaryCompany, findPrimaryCompany } from '@/api/userCompany'
import { saveUserPrimaryDept, findPrimaryDept } from '@/api/userDept'
import { getTenancy } from '@/api/mylogin'
import { saveTenancyMember } from '@/api/tenacy/tenacyMember'

export default {
  name: 'UserModal',
  components: { AFormItem },
  data () {
    return {
      // 标题
      title: '添加用户',
      // 样式
      labelCol: { span: 4 },
      // 样式
      wrapperCol: { span: 20 },
      // 表单布局
      formLayout: 'horizontal',
      // 表单对象
      form: this.$form.createForm(this),
      confirmLoading: false,
      // 模态框是否显示
      visible: false,
      // 部门树数据
      deptTreeData: [],
      // 公司树数据
      comTreeData: [],
      // 角色数据
      roleData: [],
      // 当前角色
      curRole: undefined,
      // 职位数据
      postData: [],
      // 当前操作的Id
      curOperationId: undefined,
      // 验证规则
      validatorRules: {
        trueName: { rules: [{ required: true, message: '名称不可为空' }, { max: 20, message: '名称不可以超过20位' }] },
        phone: {
          rules: [{ required: true, message: '手机号不可为空' },
            { validator: this.validateMobile }, { validator: this.validateMobileExist }],
          validateTrigger: 'blur',
          validateFirst: true
        },
        gender: { rules: [{ required: true, message: '性别不可为空!' }] },
        company: { rules: [{ required: true, message: '所属公司不可为空!' }] }
      },
      // 是否是编辑模式
      editMode: false,
      // 编辑的id
      editId: undefined
    }
  },
  methods: {
    async showModal () {
      const _this = this
      // 初始化公司数据，角色数据，职位数据
      await getAllCompanyTree().then(function (treeData) {
        _this.comTreeData = treeData
      })
      await findAllPost().then(function (res) {
        _this.postData = res.data
      })
      await findAllRole().then(function (res) {
        _this.roleData = res.data
      })
      this.visible = true
    },
    /**
     * 确认事件
     * @param e
     */
    handleOk (e) {
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
          try {
            _this.confirmLoading = true
            let userInfo
            const tenancy = await getTenancy()
            const tenancyExist = tenancy.data && tenancy.data.id
            if (!tenancyExist) {
              throw new Error('未获取到当前租户Id')
            }
            if (_this.editMode) {
              values.id = _this.editId
              const userRes = await modifyUser(values)
              if (userRes.code !== 200) {
                throw new Error('修改用户信息失败')
              }
            } else {
              const resUser = await findSystemUserByPhone({ phone: values.phone })
              const sysExist = resUser.data && resUser.data.id
              if (sysExist) {
                values.id = resUser.data.id
              } else {
                // 去注册并返回这个人的信息
                const userDto = {
                  phone: values.phone,
                  trueName: values.trueName,
                  username: values.phone,
                  password: '1',
                  tenantId: tenancy.data.id
                }
                const res = await saveUserToSystem(userDto)
                if (res.data === undefined) {
                  throw new Error('未成功在云智囊注册')
                }
                values.id = res.data
              }
              const userRes = await saveUser(values)
              userInfo = userRes.data
              if (userInfo === undefined) {
                throw new Error('未发现该用户信息')
              }
              const res = await saveTenancyMember({ tenancyId: tenancy.data.id, userId: userInfo.id })
              if (res.code !== 200) {
                throw new Error('添加租户成员失败')
              }
            }
            let promise1, promise2
            if (Array.isArray(values.role) && values.role.length > 0) {
              // 设置了角色，保存这个人角色
              promise1 = updateUserRole({ userId: values.id }, values.role)
            }
            if (values.company !== undefined) {
              promise2 = saveUserPrimaryCompany({
                userId: values.id,
                comId: values.company
              }).then(async function (res) {
                if (values.dept !== undefined) {
                  await saveUserPrimaryDept({ userId: values.id, deptId: values.dept })
                }
                return res
              })
            }
            const res = await Promise.all([promise1, promise2])
            res.forEach((item, index) => {
              if (item && item.code !== 200) {
                const text = index === 1 ? '角色' : '公司'
                _this.$message.error(text + '保存失败')
              }
            })
            _this.visible = false
            _this.confirmLoading = false
            _this.$message.success('保存成功')
            _this.$emit('refreshTable')
          } catch (e) {
            _this.confirmLoading = false
            _this.$message.error(e.message)
            throw new Error(e)
          }
        }
      })
    },
    /**
     * 编辑事件
     * @param record
     * @return {Promise<void>}
     */
    async onEdit (record) {
      const _this = this
      // 编辑用户走这里相同的莫泰框，逻辑不同
      // 注意这句话要先走
      _this.title = '编辑用户'
      _this.editMode = true
      _this.editId = record.id
      await this.showModal()
      // 1. 根据Id获取该用户的所属公司，角色信息，部门信息
      findUserRole({ userId: record.id }).then(function (res) {
        const ids = res.data.map(function (ele) {
          return ele.id
        })
        _this.form.setFieldsValue({ 'role': ids })
      })
      const res = await findPrimaryCompany({ id: record.id })
      if (res.data) {
        _this.form.setFieldsValue({ 'company': res.data.id })
        // 别忘了设置公司对应的部门信息
        await _this.onComChange(res.data.id).then(function () {
          findPrimaryDept({ id: record.id }).then(function (res) {
            if (res.data && res.data.id !== undefined) {
              _this.form.setFieldsValue({ 'dept': res.data.id })
            }
          })
        })
      }
      // 2. 设置record基本信息
      _this.form.setFieldsValue({ 'trueName': record.trueName })
      _this.form.setFieldsValue({ 'phone': record.phone })
      _this.form.setFieldsValue({ 'gender': record.gender })
      _this.form.setFieldsValue({ 'presentPost': record.presentPost })
    },
    /**
     * 部门改变事件
     * @param value
     */
    onDeptChange (value) {
      this.form.setFieldsValue({ 'dept': value })
    },
    /**
     * 公司改变事件
     * @param value
     * @return {*}
     */
    onComChange (value) {
      const _this = this
      _this.form.setFieldsValue({ 'company': value })
      _this.form.setFieldsValue({ 'dept': undefined })
      // 查询部门数据渲染
      return getCompanyDeptTree({ comId: this.form.getFieldValue('company') }).then(function (treeData) {
        _this.deptTreeData = treeData
      })
    },
    /**
     * 角色改变事件
     * @param value
     */
    onRoleChange (value) {
      this.curRole = value
    },
    /**
     * 关闭莫泰框事件
     */
    afterCloseModal () {
      this.form.resetFields()
      this.deptTreeData = []
      this.title = '添加用户'
      this.editMode = false
      this.editId = undefined
    },
    /**
     * 验证手机号
     * @param rule
     * @param value
     * @param callback
     */
    validateMobile (rule, value, callback) {
      if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
        callback()
      } else {
        // eslint-disable-next-line standard/no-callback-literal
        callback('您的手机号码格式不正确!')
      }
    },
    /**
     * 验证手机号是否存在
     * @param rule
     * @param value
     * @param callback
     */
    validateMobileExist (rule, value, callback) {
      const _this = this
      findUserByRule({ phone: value }).then(function (res) {
        if (!_this.editMode && res.data.length > 0) {
          // eslint-disable-next-line standard/no-callback-literal
          callback('手机号已存在')
        } else if (_this.editMode && res.data.length > 0) {
          const data = res.data.filter(function (ele) {
            return ele.id !== _this.editId
          })
          if (data.length > 0) {
            // eslint-disable-next-line standard/no-callback-literal
            callback('手机号已存在')
          } else {
            callback()
          }
        } else {
          callback()
        }
      })
    },
    askSystemExist (phone) {
      return findSystemUserByPhone({ phone: phone }).then(function (res) {
        if (res.data && res.data.id) {
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
