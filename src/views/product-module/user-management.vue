<template>
  <div>
    <!--头部-->
    <div style="display: flex;flex-direction: row;justify-content: space-between">
      <div style="display: flex;flex-direction: row">
        <common-drop-down
          :result="result"
          :defaultValue="defaultValue"
          @selectCell="selectCell"
          class="com-drop-down"
        >
        </common-drop-down>
        <!--搜索框-->
        <common-search
          :placeholder="version"
          style="width: 220px"></common-search>
      </div>
      <common-button
        @addClick="addClick"
        @deleteClick="deleteClick"
        :name1="name1"
        :name2="name2">
      </common-button>
    </div>
    <div>
      <!--表格-->
      <a-table
        bordered
        :columns="columns"
        :dataSource="dataSource"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
        <template slot="zhuangtai" slot-scope="text, record">
          <!--1代表开-->
          <a-switch :defaultChecked="record.name6==1?true:false" @change="updataState(record.key)" />
        </template>
        <template slot="xiangqing" slot-scope="text, record">
          <!--1代表开-->
          <span @click="btnClick(record.key)">详情</span>
        </template>
      </a-table>
    </div>
    <a-modal v-model="showAddUser" title="添加用户">
      <a-form :form="form">
        <a-form-item label="昵称">
          <a-input
            placeholder="请输入昵称"
            v-decorator="[
              'a',
              { rules: [{ required: true, message: '请输入昵称！' }] },
            ]"/>
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group name="c" :defaultValue="1">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              },
            ]"
            type="password"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import CommonButton from '@/components/system/common-button'
import CommonSearch from '@/components/system/common-search'
import CommonDropDown from '@/components/system/common-drop-down'
import AFormItem from 'ant-design-vue/es/form/FormItem'
export default {
  components: {
    AFormItem,
    CommonButton,
    CommonSearch,
    CommonDropDown
  },
  data () {
    return {
      version: '请输入',
      name1: '添加',
      name2: '删除',
      showAddUser: false,
      form: this.$form.createForm(this),
      defaultValue: '0',
      selectedRowKeys: [],
      result: [
        {
          name: '全部',
          key: '0'
        },
        {
          name: '用户姓名',
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
          name: '状态',
          key: '5'
        }
      ],
      columns: [
        { title: '用户姓名',
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
        { title: '创建时间',
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
          scopedSlots: { customRender: 'xiangqing' }
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
      ]
    }
  },
  methods: {
    addClick () {
      this.showAddUser = true
    },
    deleteClick () {

    },
    selectCell () {

    },
    onSelectChange () {

    },
    btnClick (key) {
      this.$router.push({
        name: 'UserDetail',
        query: {
          id: key
        }
      })
    }
  }
}
</script>

<style scoped>
  .com-drop-down{
    width: 120px;
  }
</style>
