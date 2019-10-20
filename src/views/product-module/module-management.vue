<template>
  <!-- <h1>模块管理 ModuleManagement</h1> -->
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
    <!--表格-->
    <a-table
      bordered
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
      <template slot="zhuangtai" slot-scope="text, record">
        <!--1代表开-->
        <a-switch :defaultChecked="record.zt==1?true:false" @change="updataState(record.key)" />
      </template>
      <template slot="bianji" slot-scope="text, record">
        <!--1代表开-->
        <span @click="btnClick(record.key)">编辑</span>
      </template>
    </a-table>
    <!--添加模块-->
    <a-modal
      v-model="showAddModule"
      title="添加模块"
    >
      <a-form :form="form">
        <a-row
          :gutter="24"
          class="row1">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input
                placeholder="请输入名称"
                v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="服务标识">
              <a-input
                placeholder="请输入服务标识"
                v-decorator="['name',{rules: [{ required: true, message: '服务标识不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row
          :gutter="24"
          class="row2">
          <a-col :span="12">
            <a-form-item label="上级目录">
              <a-select
                v-decorator="[
                  'a',
                  { rules: [{ required: true, message: '请选择上级目录' }] },
                ]"
                placeholder="请选择"
              >
                <template slot="suffixIcon" >
                  <img style="width: 12px;" src="../../assets/icons/paixu.svg"/>
                </template>
                <a-select-option value="male">
                  1级
                </a-select-option>
                <a-select-option value="female">
                  2级
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型">
              <a-select
                v-decorator="[
                  'a',
                  { rules: [{ required: true, message: '请选择类型' }] },
                ]"
                placeholder="请选择"
              >
                <template slot="suffixIcon" >
                  <img style="width: 12px;" src="../../assets/icons/paixu.svg"/>
                </template>
                <a-select-option value="male">
                  male
                </a-select-option>
                <a-select-option value="female">
                  female
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row
          :gutter="24"
          class="row3">
          <a-col :span="12">
            <a-form-item label="权限路由">
              <a-input
                placeholder="请输入权限路由"
                v-decorator="['name',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="访问路由">
              <a-input
                placeholder="请输入访问路由"
                v-decorator="['name',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row
          :gutter="24"
          class="row4">
          <a-col :span="12">
            <a-form-item label="状态">
              <a-switch defaultChecked />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="back" @click="cancelSave">取消</a-button>
        <a-button key="submit" type="primary" @click="saveModule">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
    <!--编辑模块-->
    <a-modal
      v-model="showEditModule"
      title="编辑"
    >
      <a-form :form="form">
        <a-row
          :gutter="24"
          class="row1">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input
                placeholder="请输入名称"
                v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="服务标识">
              <a-input
                placeholder="请输入服务标识"
                v-decorator="['name',{rules: [{ required: true, message: '服务标识不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row
          :gutter="24"
          class="row2">
          <a-col :span="12">
            <a-form-item label="上级目录">
              <a-select
                v-decorator="[
                  'a',
                  { rules: [{ required: true, message: '请选择上级目录' }] },
                ]"
                placeholder="请选择"
              >
                <template slot="suffixIcon" >
                  <img style="width: 12px;" src="../../assets/icons/paixu.svg"/>
                </template>
                <a-select-option value="male">
                  1级
                </a-select-option>
                <a-select-option value="female">
                  2级
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型">
              <a-select
                v-decorator="[
                  'a',
                  { rules: [{ required: true, message: '请选择类型' }] },
                ]"
                placeholder="请选择"
              >
                <template slot="suffixIcon" >
                  <img style="width: 12px;" src="../../assets/icons/paixu.svg"/>
                </template>
                <a-select-option value="male">
                  male
                </a-select-option>
                <a-select-option value="female">
                  female
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row
          :gutter="24"
          class="row3">
          <a-col :span="12">
            <a-form-item label="权限路由">
              <a-input
                placeholder="请输入权限路由"
                v-decorator="['name',{rules: [{ required: true, message: '权限路由不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="访问路由">
              <a-input
                placeholder="请输入访问路由"
                v-decorator="['name',{rules: [{ required: true, message: '访问路由不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="back" @click="cancelEdit">取消</a-button>
        <a-button key="submit" type="primary" @click="saveEdit">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
  </div>

</template>

<script>
import CommonButton from '@/components/system/common-button'
import CommonSearch from '@/components/system/common-search'
import CommonDropDown from '@/components/system/common-drop-down'

export default {
  components: {
    CommonButton,
    CommonDropDown,
    CommonSearch
  },
  data () {
    return {
      all: '全部',
      version: '模块搜索',
      name1: '添加',
      name2: '删除',
      defaultValue: '0',
      result: [
        { name: '全部', key: '0' },
        { name: '名称', key: '1' },
        { name: '类型', key: '2' },
        { name: '权限路由', key: '3' },
        { name: '访问路由', key: '3' },
        { name: '服务标识', key: '3' }

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
          title: '服务标识',
          dataIndex: 'fwbs',
          width: '12%',
          key: 'fwbs'
        }, {
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
          title: '更多',
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
      ],
      selectedRowKeys: [],
      showAddModule: false,
      showEditModule: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    addClick () {
      this.showAddModule = true
    },
    deleteClick () { alert('456') },
    selectCell (val) {
      console.log(val)
    },
    onSelectChange () {

    },
    updataState (key) {

    },
    btnClick (key) {
      this.$message.success('操作成功')
      this.showEditModule = true
    },
    saveModule () {
      this.form.validateFields(err => {
        if (!err) {
          this.showAddModule = false
        }
      })
    },
    cancelSave () {
      this.showAddModule = false
    },
    cancelEdit () {
      this.showEditModule = false
    },
    saveEdit () {
      this.showEditModule = false
    }
  }
}
</script>

<style scoped>
  .button_style{
    float: none;
  }
  .com-drop-down{
    width: 120px;
  }
  /deep/.row4 .ant-row .ant-form-item{
    display: flex;
  }
</style>
