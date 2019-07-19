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
            <a-select-option value="男">
              男
            </a-select-option>
            <a-select-option value="女">
              女
            </a-select-option>
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

export default {
  name: 'UserModal',
  components: { AFormItem },
  data () {
    return {
      title: '添加用户',
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      confirmLoading: false,
      visible: false,
      deptTreeData: [],
      comTreeData: [],
      roleData: [],
      curRole: undefined,
      postData: [],
      curOperationId: undefined,
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
          if (_this.editMode === false) {
            // 判断这个人在系统中存在不存在，不存在调用注册接口去注册一下
            const exist = await _this.askSysTemExist(values.phone)
            let userId
            // 云之囊存在就直接去获取，不存在就注册一下
            if (exist) {
              // 去获取这个人的信息通过电话
              const res = await findSystemUserByPhone({ username: values.phone })
              if (res.userInfo && res.userInfo.id) {
                userId = res.userInfo.id
              } else {
                _this.visible = false
                _this.confirmLoading = false
                _this.$message.error('云之囊未获取到用户信息')
              }
            } else {
              // 去注册并返回这个人的信息
              const userDto = {
                phone: values.phone,
                trueName: values.trueName,
                username: '',
                password: '',
                tenantId: ''
              }
              const res = await saveUserToSystem(userDto)
              if (res.data !== undefined) {
                userId = res.data
              } else {
                _this.visible = false
                _this.confirmLoading = false
                _this.$message.error('未成功在云智囊注册')
              }
            }
            // 保存这个人基本信息
            values.id = userId
          } else {
            values.id = _this.editId
          }
          if (values.id !== undefined) {
            let userInfo
            if (_this.editMode === false) {
              const userInfoRes = await saveUser(values)
              userInfo = userInfoRes.data
            } else {
              userInfo = await modifyUser(values)
            }
            if (userInfo !== undefined) {
              let promise1, promise2
              if (values.role !== undefined) {
                // 设置了角色，保存这个人角色
                promise1 = updateUserRole({ userId: values.id }, values.role)
                // 保存公司
                if (values.company !== undefined) {
                  promise2 = saveUserPrimaryCompany({
                    userId: values.id,
                    comId: values.company
                  }).then(async function (res) {
                    // 保存部门
                    if (values.dept !== undefined) {
                      await saveUserPrimaryDept({ userId: values.id, deptId: values.dept })
                    }
                  })
                }
                Promise.all([promise1, promise2]).then(function () {
                  _this.visible = false
                  _this.confirmLoading = false
                  _this.$message.success('保存成功')
                  _this.$emit('refreshTable')
                }).catch(function (e) {
                  _this.$message.error('保存失败')
                  _this.confirmLoading = false
                })
              }
            }
          } else {
            // 未获取用户Id
            _this.$message.error('未获取用户Id')
            _this.confirmLoading = false
          }
        }
      })
    },
    onEdit (record) {
      debugger
      const _this = this
      // 编辑用户走这里相同的莫泰框，逻辑不同
      // 注意这句话要先走
      _this.title = '编辑用户'
      _this.editMode = true
      _this.editId = record.id
      _this.visible = true
      // 1. 根据Id获取该用户的所属公司，角色信息，部门信息
      findUserRole({ userId: record.id }).then(function (res) {
        const ids = res.data.map(function (ele) {
          return ele.id
        })
        _this.form.setFieldsValue({ 'role': ids })
      })
      findPrimaryCompany({ id: record.id }).then(function (res) {
        _this.form.setFieldsValue({ 'company': res.data.comId })
        // 别忘了设置公司对应的部门信息
        _this.onComChange(res.data.comId).then(function () {
          findPrimaryDept({ id: record.id }).then(function (res) {
            if (res.data !== undefined && res.data.deptCode !== undefined) {
              _this.form.setFieldsValue({ 'dept': res.data.deptCode })
            }
          })
        }).then(function () {
          // 2. 设置record基本信息
          _this.form.setFieldsValue({ 'trueName': record.trueName })
          _this.form.setFieldsValue({ 'phone': record.phone })
          _this.form.setFieldsValue({ 'gender': record.gender })
          _this.form.setFieldsValue({ 'presentPost': record.presentPost })
        })
      })
    },
    onDeptChange (value) {
      this.form.setFieldsValue({ 'dept': value })
    },
    onComChange (value) {
      const _this = this
      _this.form.setFieldsValue({ 'company': value })
      _this.form.setFieldsValue({ 'dept': undefined })
      // 查询部门数据渲染
      return getCompanyDeptTree({ comId: this.form.getFieldValue('company') }).then(function (treeData) {
        _this.deptTreeData = treeData
      })
    },
    onRoleChange (value) {
      this.curRole = value
    },
    afterCloseModal () {
      this.form.resetFields()
      this.deptTreeData = []
      this.title = '添加用户'
      this.editMode = false
      this.editId = undefined
    },
    validateMobile (rule, value, callback) {
      if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
        callback()
      } else {
        callback('您的手机号码格式不正确!')
      }
    },
    validateMobileExist (rule, value, callback) {
      const _this = this
      findUserByRule({ phone: value }).then(function (res) {
        if (!_this.editMode && res.data.length > 0) {
          callback('手机号已存在')
        } else if (_this.editMode && res.data.length > 0) {
          const data = res.data.filter(function (ele) {
            return ele.id !== _this.editId
          })
          if (data.length < 0) {
            callback('手机号已存在')
          } else {
            callback()
          }
        } else {
          callback()
        }
      })
    },
    askSysTemExist (phone) {
      return findSystemUserByPhone({ username: phone }).then(function (res) {
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
  mounted () {
    const _this = this
    // 初始化公司数据，角色数据，职位数据
    getAllCompanyTree().then(function (treeData) {
      _this.comTreeData = treeData
    })
    findAllPost().then(function (res) {
      _this.postData = res.data
    })
    findAllRole().then(function (res) {
      _this.roleData = res.data
    })
  }
}
</script>

<style scoped>

</style>
