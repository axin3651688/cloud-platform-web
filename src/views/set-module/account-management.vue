<template>
  <div>
    <!--头部-->
    <div style="display: flex;flex-direction: row;justify-content: space-between">
      <div style="display: flex;flex-direction: row">
        <common-drop-down
          :result="result"
          :defaultValue="'0'"
          @selectCell="selectCell"
          class="com-drop-down"
        >
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
        :title="'删除后可能会影响使用功能的使用，您确定继续？'"
        :name1="name1"
        :name2="name2">
      </common-button>
    </div>
    <div>
      <!--表格-->
      <a-table
        :pagination="pagination"
        size="small"
        :columns="columns"
        :dataSource="dataSource"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
        <template slot="zhuangtai" slot-scope="text, record">
          <!--1代表开-->
          <a-switch :defaultChecked="record.name6==1?true:false" @change="updataState(record)" />
        </template>
        <template slot="caozuo" slot-scope="text, record">
          <span @click="btnClick(record)"><a-icon type="edit"></a-icon></span>
        </template>
      </a-table>
    </div>
    <!--添加员工-->
    <a-modal
      v-model="showAddAccount"
      :destroyOnClose="true"
      title="添加员工"
      class="add-account"
      :width="350"
    >
      <a-form :form="form">
        <a-form-item label="选择用户">
          <a-auto-complete
            :dataSource="userSource"
            style="width: 200px"
            @select="selectUser"
            @search="handleSearchUser"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]"
          />
        </a-form-item>
        <!--  v-decorator="['name',{rules: [{ required: true, message: '描述不能为空!' }],}]" />-->
        <a-form-item label="分配角色">
          <a-auto-complete
            :dataSource="roleSource"
            style="width: 200px"
            @select="selectRole"
            @search="handleSearchRole"
            v-decorator="['role',{rules: [{ required: true, message: '角色不能为空!' }],}]"
          />
        </a-form-item>
      </a-form>
      <template slot="footer" >
        <div style="display: flex;margin-left: 32px">
          <a-button key="back" @click="cancelAddAccount" style="margin-right: 32px">取消</a-button>
          <a-button key="submit" type="primary" @click="saveAddAccount">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <!--修改员工-->
    <a-modal
      v-model="showEditAccount"
      title="修改员工信息"
      class="add-account"
      :width="350"
    >
      <a-form :form="form1">
        <a-form-item label="选择用户">
          <a-auto-complete
            :dataSource="userSource"
            style="width: 200px"
            @select="selectUser"
            @search="handleSearchUser"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]"
          />
        </a-form-item>
        <a-form-item label="分配角色">
          <a-auto-complete
            :dataSource="roleSource"
            style="width: 200px"
            @select="selectRole"
            @search="handleSearchRole"
            v-decorator="['role',{rules: [{ required: true, message: '角色不能为空!' }],}]"
          />
        </a-form-item>
      </a-form>
      <template slot="footer" >
        <div style="display: flex;margin-left: 32px">
          <a-button key="back" @click="cancelEditAccount" style="margin-right: 32px">取消</a-button>
          <a-button key="submit" type="primary" @click="saveEditAccount">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
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
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      name1: '添加',
      name2: '删除',
      result: [
        {
          name: '全部',
          key: '0'
        },
        {
          name: '名称',
          key: '1'
        },
        {
          name: '用户名',
          key: '2'
        },
        {
          name: '手机号',
          key: '3'
        },
        {
          name: '邮箱',
          key: '4'
        },
        {
          name: '角色',
          key: '5'
        },
        {
          name: '状态',
          key: '6'
        }
      ],
      selectedRowKeys: [],
      columns: [
        { title: '名称',
          dataIndex: 'name'
        },
        { title: '用户名',
          dataIndex: 'name1'
        },
        { title: '手机号',
          dataIndex: 'name2'
        },
        { title: '邮箱',
          dataIndex: 'name3'
        },
        { title: '角色',
          dataIndex: 'name4'
        },
        { title: '更新时间',
          dataIndex: 'name5'
        },
        { title: '状态',
          dataIndex: 'name6',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        { title: '操作',
          dataIndex: 'name7',
          scopedSlots: { customRender: 'caozuo' }
        }
      ],
      dataSource: [
        {
          key: 1,
          name: '狗蛋',
          name1: '11',
          name2: '22',
          name3: '33',
          name4: '11',
          name5: '11',
          name6: '1'
        },
        {
          key: 2,
          name: '狗剩',
          name1: '11',
          name2: '22',
          name3: '33',
          name4: '11',
          name5: '11',
          name6: '0'
        },
        {
          key: 3,
          name: '翠花',
          name1: '11',
          name2: '22',
          name3: '33',
          name4: '11',
          name5: '11',
          name6: '1'
        },
        {
          key: 4,
          name: '小芳',
          name1: '11',
          name2: '22',
          name3: '33',
          name4: '11',
          name5: '11',
          name6: '0'
        }
      ],
      showAddAccount: false, // 添加账号
      showEditAccount: false, // 修改员工信息
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      userSource: [], // 选择用户 数据
      roleSource: [] // 选择角色 数据
    }
  },
  methods: {
    selectCell () {

    },
    addClick () {
      this.showAddAccount = true
    },
    deleteClick () {

    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    updataState (record) {

    },
    btnClick (record) {
      console.log('编辑')
      this.showEditAccount = true
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
    cancelAddAccount () {
      this.showAddAccount = false
    },
    saveAddAccount () {
      this.showAddAccount = false
    },
    selectUser (value) {
      console.log('onSelect', value)
    },
    handleSearchUser (value) {
      this.userSource = !value ? [] : [value, value + value, value + value + value]
    },
    selectRole (value) {
      console.log('onSelect', value)
    },
    handleSearchRole (value) {
      this.roleSource = !value ? [] : [value, value + value, value + value + value]
    },
    cancelEditAccount () {
      this.showEditAccount = false
    },
    saveEditAccount () {
      this.showEditAccount = false
    }
  }
}
</script>

<style scoped>
  .com-drop-down{
    width: 120px;
  }
  /deep/.add-account .ant-modal-footer{
    display: flex !important;
  }
</style>
