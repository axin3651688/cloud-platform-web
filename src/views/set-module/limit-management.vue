<template>
  <div>
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
          :placeholder="'请输入'"
          style="width: 220px">
        </common-search>
      </div>
      <common-button
        @addClick="addClick"
        @deleteClick="deleteClick"
        :name1="name1"
        :name2="name2">
      </common-button>
    </div>
    <!--表格-->
    <a-table
      bordered
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
      <template slot="zhuangtai" slot-scope="text, record">
        <!--1代表开-->
        <a-switch :defaultChecked="record.zt==1?true:false" @change="updataState(record)" />
      </template>
      <template slot="bianji" slot-scope="text, record">
        <!--1代表开-->
        <span @click="btnClick(record)">编辑</span>
      </template>
    </a-table>
    <a-modal v-model="showAddLimit" title="新增权限" :width="350">
      <a-form :form="form">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="类型">
          <a-select
            style="width: 200px;"
            default-value="1"
            v-decorator="['type',{rules: [{ required: true, message: '请选择类型!' }],}]">
            <template slot="suffixIcon">
              <img
                style="width: 12px;"
                src="../../assets/icons/paixu.svg" />
            </template>
            <a-select-option value="1">
              a类型
            </a-select-option>
            <a-select-option value="2">
              b类型
            </a-select-option>
            <a-select-option value="3">
              c类型
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="上级目录">
          <a-select
            style="width: 200px;"
            default-value="1"
            v-decorator="['type',{rules: [{ required: true, message: '请选择目录!' }],}]">
            <template slot="suffixIcon">
              <img
                style="width: 12px;"
                src="../../assets/icons/paixu.svg" />
            </template>
            <a-select-option value="1">
              a目录
            </a-select-option>
            <a-select-option value="2">
              b目录
            </a-select-option>
            <a-select-option value="3">
              c目录
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input
            placeholder="请输入权限路由"
            v-decorator="['name',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="访问路由">
          <a-input
            placeholder="请输入访问路由"
            v-decorator="['name',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="状态" style="display: flex">
          <a-switch defaultChecked />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button key="back" @click="cancelAddLimit" style="margin-right: 32px;">取消</a-button>
          <a-button key="submit" type="primary" @click="saveAddLimit">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <a-modal v-model="showEditLimit" title="编辑权限" :width="350">
      <a-form :form="form1">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="类型">
          <a-select
            style="width: 200px;"
            default-value="1"
            v-decorator="['type',{rules: [{ required: true, message: '请选择类型!' }],}]">
            <template slot="suffixIcon">
              <img
                style="width: 12px;"
                src="../../assets/icons/paixu.svg" />
            </template>
            <a-select-option value="1">
              a类型
            </a-select-option>
            <a-select-option value="2">
              b类型
            </a-select-option>
            <a-select-option value="3">
              c类型
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="上级目录">
          <a-select
            style="width: 200px;"
            default-value="1"
            v-decorator="['type',{rules: [{ required: true, message: '请选择目录!' }],}]">
            <template slot="suffixIcon">
              <img
                style="width: 12px;"
                src="../../assets/icons/paixu.svg" />
            </template>
            <a-select-option value="1">
              a目录
            </a-select-option>
            <a-select-option value="2">
              b目录
            </a-select-option>
            <a-select-option value="3">
              c目录
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input
            placeholder="请输入权限路由"
            v-decorator="['name',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="访问路由">
          <a-input
            placeholder="请输入访问路由"
            v-decorator="['name',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
        </a-form-item>
      </a-form>
      <template slot="footer" >
        <div style="display: flex;margin-left: 32px">
          <a-button key="back" @click="cancelEditLimit" style="margin-right: 32px;">取消</a-button>
          <a-button key="submit" type="primary" @click="saveEditLimit">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
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
      selectedRowKeys: [],
      defaultValue: '0',
      showAddLimit: false,
      showEditLimit: false,
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      name1: '添加',
      name2: '删除',
      result: [
        { name: '名称', key: '0' },
        { name: '类型', key: '1' },
        { name: '权限路由', key: '2' },
        { name: '访问路由', key: '3' },
        { name: '状态', key: '4' }
      ],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '类型',
          dataIndex: 'age',
          key: 'age',
          width: '12%'
        },
        {
          title: '权限路由',
          dataIndex: 'address',
          width: '12%',
          key: 'address'
        },
        {
          title: '访问路由',
          dataIndex: 'fw',
          width: '12%',
          key: 'fw'
        },
        {
          title: '更新时间',
          dataIndex: 'gxsj',
          width: '12%',
          key: 'gxsj'
        },
        {
          title: '状态',
          dataIndex: 'zt',
          scopedSlots: { customRender: 'zhuangtai' },
          width: '12%',
          key: 'zt'
        },
        {
          title: '操作',
          dataIndex: 'gd',
          width: '5%',
          scopedSlots: { customRender: 'bianji' }
        }
      ],
      dataSource: [
        {
          key: 1,
          name: 'John Brown sr.',
          age: 60,
          address: 'New York No. 1 Lake Park',
          zt: 1,
          children: [
            {
              key: 11,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 2 Lake Park',
              zt: 1
            },
            {
              key: 12,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 3 Lake Park',
              zt: 1,
              children: [
                {
                  key: 121,
                  name: 'Jimmy Brown',
                  age: 16,
                  zt: 1,
                  address: 'New York No. 3 Lake Park'
                }
              ]
            },
            {
              key: 13,
              name: 'Jim Green sr.',
              age: 72,
              zt: 1,
              address: 'London No. 1 Lake Park',
              children: [
                {
                  key: 131,
                  name: 'Jim Green',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  zt: 1,
                  children: [
                    {
                      key: 1311,
                      name: 'Jim Green jr.',
                      age: 25,
                      zt: 1,
                      address: 'London No. 3 Lake Park'
                    },
                    {
                      key: 1312,
                      name: 'Jimmy Green sr.',
                      age: 18,
                      zt: 1,
                      address: 'London No. 4 Lake Park'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          zt: 0,
          address: 'Sidney No. 1 Lake Park'
        }
      ]
    }
  },
  methods: {
    selectCell (val) {

    },
    addClick () {
      this.showAddLimit = true
    },
    deleteClick () {
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    updataState (record) {

    },
    btnClick (record) {
      this.showEditLimit = true
    },
    cancelAddLimit () {
      this.showAddLimit = false
    },
    saveAddLimit () {
      this.form.validateFields(err => {
        if (!err) {
          this.showAddLimit = false
        }
      })
    },
    cancelEditLimit () {
      this.showEditLimit = false
    },
    saveEditLimit () {
      this.form1.validateFields(err => {
        if (!err) {
          this.showEditLimit = false
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
  .ant-form-item{
    margin-bottom: 0;
  }
  .ant-form-item input{
    width: 200px;
  }
  form{
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    margin: 0 32px;
  }
/deep/.ant-modal-footer{
  display: flex;
}
</style>
