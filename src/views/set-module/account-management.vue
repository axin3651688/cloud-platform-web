<template>
  <div>
    <!--头部-->
    <div style="display: flex;flex-direction: row;justify-content: space-between;background-color: #fff;padding: 16px 32px 0 32px">
      <div style="display: flex;flex-direction: row">
        <common-drop-down
          :result="result"
          :defaultValue="'trueName'"
          @selectCell="selectCell"
          class="com-drop-down">
        </common-drop-down>
        <!--搜索框-->
        <common-search
          :placeholder="'请输入'"
          style="width: 220px">
        </common-search>
      </div>
      <common-button
        @addClick="addClick"
        @deleteClick="deleteClick"
        :disabled="selectedRowKeys.length>0?true:false"
        :title="'删除后无法恢复，您确定继续？'"
        :name1="name1"
        :name2="name2">
      </common-button>
    </div>
    <div style="background-color: #fff">
      <!--表格-->
      <a-table
        :pagination="pagination"
        size="small"
        :columns="columns"
        :dataSource="dataSource"
        :rowKey="setKey"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
        <template
          slot="zhuangtai"
          slot-scope="text, record">
          <!--1代表开-->
          <a-switch
            :defaultChecked="record.enable==1?true:false"
            @change="updataState(record)" />
        </template>
        <template
          slot="caozuo"
          slot-scope="text, record">
          <span @click="btnClick(record)">
            <img style="margin-left: 16px;cursor: pointer;" src="@icons/Icon.svg" title="编辑">
          </span>
        </template>
      </a-table>
    </div>
    <!--添加员工-->
    <a-modal
      v-model="showAddAccount"
      :destroyOnClose="true"
      :maskClosable="false"
      title="添加员工"
      class="add-account"
      :width="350">
      <a-form :form="form" autocomplete="off">
        <a-form-item label="选择用户">
          <a-select showSearch
                    placeholder="请选择用户"
                    optionFilterProp="children"
                    style="width: 200px"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChangeUser"
                    :filterOption="filterOption"
                    v-decorator="['userId',{rules: [{ required: true, message: '请选择用户!' }],}]">
            <a-select-option v-for="(item,index) in owners"
                             :key="index"
                             :value="item.id">
              {{ item.username }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="分配角色">
          <a-select
            mode="tags"
            size="default"
            style="width: 200px"
            @change="handleChange"
            v-decorator="['roleIds',{rules: [{ required: true, message: '角色不能为空!' }],}]">
            <a-select-option
              v-for="(item,index) in roleArr"
              :key="index"
              :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelAddAccount"
            style="margin-right: 32px">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveAddAccount">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--修改员工-->
    <a-modal
      v-model="showEditAccount"
      :maskClosable="false"
      :destroyOnClose="true"
      title="修改员工信息"
      class="add-account"
      :width="350">
      <a-form :form="form1" autocomplete="off">
        <a-form-item label="用户名">
          <a-input
            style="width: 200px"
            v-model="userName"
            :disabled="true" />
        </a-form-item>
        <a-form-item label="分配角色">
          <a-select
            mode="tags"
            size="default"
            style="width: 200px"
            @change="handleChange"
            v-decorator="['roleIds',{rules: [{ required: true, message: '角色不能为空!' }],}]">
            <a-select-option
              v-for="(item,index) in roleArr"
              :key="index"
              :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelEditAccount"
            style="margin-right: 32px">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveEditAccount">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import CnbiTenantManagement from '@/classes/lib/CnbiTenantManagement'
import CnbiRoleManagement from '@/classes/lib/CnbiRoleManagement'
import CommonDropDown from '@/components/system/common-drop-down'
import CommonButton from '@/components/system/common-button'
import CommonSearch from '@/components/system/common-search'
import ARow from 'ant-design-vue/es/grid/Row'

export default {
  components: {
    ARow,
    CommonButton,
    CommonSearch,
    CommonDropDown
  },
  name: 'AccountManagement',
  data () {
    return {
      TenantMObj: null,
      AccountMObj: null,
      userName: '',
      editId: null, // 点击编辑的时候该行数据对应的id
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      name1: '添加',
      name2: '删除',
      result: [
        {
          name: '名称',
          key: 'trueName'
        },
        {
          name: '用户名',
          key: 'userName'
        },
        {
          name: '手机号',
          key: 'phone'
        },
        {
          name: '邮箱',
          key: 'email'
        },
        {
          name: '角色',
          key: 'roleName'
        }
      ],
      selectedRowKeys: [],
      columns: [
        { title: '名称',
          dataIndex: 'trueName'
        },
        { title: '用户名',
          dataIndex: 'userName'
        },
        { title: '手机号',
          dataIndex: 'phone'
        },
        { title: '邮箱',
          dataIndex: 'email'
        },
        { title: '角色',
          dataIndex: 'roleName'
        },
        { title: '更新时间',
          dataIndex: 'updateTime',
          customRender (text, record, index) {
            var oDate = new Date(text * 1)
            var oYear = oDate.getFullYear()
            var oMonth = oDate.getMonth() + 1
            var oDay = oDate.getDate()
            if (oMonth < 10) {
              oMonth = '0' + oMonth
            }
            if (oDay < 10) {
              oDay = '0' + oDay
            }
            var oTime = oDay + '/' + oMonth + '/' + oYear
            text = oTime
            return text
          }
        },
        { title: '状态',
          dataIndex: 'enable',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        { title: '操作',
          dataIndex: 'name7',
          scopedSlots: { customRender: 'caozuo' }
        }
      ],
      dataSource: [],
      showAddAccount: false, // 添加账号
      showEditAccount: false, // 修改员工信息
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      userSource: [], // 选择用户 数据
      roleSource: [], // 选择角色 数据
      owners: [], // 从云智囊中查询的所有用户数组
      roleArr: [] // 查询所有的角色列表数组
    }
  },
  created () {
    this.AccountMObj = new CnbiRoleManagement()
    this.TenantMObj = new CnbiTenantManagement()
    this.getData()
  },
  methods: {
    // 进入页面  加载数据
    async getData () {
      const data = await this.AccountMObj.accountPage()
      // console.log(data, '少年的你')
      this.dataSource = data

      // 查询用户管理列表
      this.owners = await this.TenantMObj.getUserSimpleInfoList()
      // console.log(this.owners, '寻水的鱼')
      this.roleArr = await this.AccountMObj.findRoleList()
      // console.log(this.roleArr, '花千骨')
      // console.log(data, '小学小学')
    },
    selectCell () {

    },
    addClick () {
      this.showAddAccount = true
    },
    // 设置每行id为主键
    setKey (record) {
      return record.userId
    },
    // 删除按钮触发事件
    async deleteClick () {
      // 1.如果没有勾选就点击删除按钮，提示框
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      await this.AccountMObj.deleteAccount(this.selectedRowKeys)
      // 4.删除成功后，及时更新数据，清除勾选图标
      await this.getData()
      this.selectedRowKeys = []
    },
    // 删除的勾选事件
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 修改状态的方法
    async updataState (record) {
      // 调用切换状态接口方法
      await this.AccountMObj.enableAccount(record.userId * 1, (record.enable - 1 == 0 ? 0 : 1))
      // 及时刷新数据
      await this.getData()
    },
    // 编辑按钮的点击事件
    btnClick (record) {
      console.log('编辑', record.userName)
      this.showEditAccount = true
      this.editId = record.userId * 1
      this.userName = record.userName
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码不一致！')
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    // 添加弹框的取消按钮事件
    cancelAddAccount () {
      this.showAddAccount = false
    },
    // 添加弹框的确定按钮事件
    async saveAddAccount () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          // formData.targets = [formData.targets]
          await _this.AccountMObj.saveAccount(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showAddAccount = false
        }
      })
    },
    selectUser (value) {
      console.log('onSelect', value)
    },
    handleSearchUser (value) {
      this.userSource = !value ? [] : [value, value + value, value + value + value]
    },
    handleChange (value) {
      console.log(`Selected: ${value}`)
    },
    // 编辑弹框的取消事件
    cancelEditAccount () {
      this.showEditAccount = false
    },
    // 编辑弹框的确认事件
    async saveEditAccount () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.userId = this.editId
          await _this.AccountMObj.updateAccount(formData)
          // 重新加载最新的数据
          await _this.getData()
        }
        _this.showEditAccount = false
      })
    },

    //以下几个方法都是处理添加弹框中的下拉搜索框
    handleChangeUser (value) {
      debugger
      console.log(value, 'value到底是什么');
    },
    handleBlur () {
      console.log('blur');
    },
    handleFocus () {
      console.log('focus');
    },
    filterOption (input, option) {
      console.log(input, 'input是个锤子', option, 'option是个鸡毛')
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  }
}
</script>

<style scoped>
.com-drop-down {
  width: 120px;
}
/deep/.add-account .ant-modal-footer {
  display: flex !important;
}
</style>
