<template>
  <!-- <h1>模块管理 ModuleManagement</h1> -->
  <div>
    <div style="display: flex;flex-direction: row;justify-content: space-between">
      <div>
        <common-drop-down
          :name="all"
          :result="result"
          :methodsName="methodsName[0]"
          @selectModule="selectModule"
          style="float:left;color:#D8DCE6">
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
      result: [
        { name: '全部', key: '0' },
        { name: '名称', key: '1' },
        { name: '类型', key: '2' },
        { name: '权限路由', key: '3' },
        { name: '访问路由', key: '3' },
        { name: '服务标识', key: '3' }

      ],
      methodsName: ['selectModule'],
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
      selectedRowKeys: []
    }
  },
  methods: {
    addClick () { alert('123') },
    deleteClick () { alert('456') },
    selectModule (val) {

    },
    onSelectChange () {

    },
    updataState (key) {

    },
    btnClick (key) {
      this.$message.success('操作成功')
    }
  }
}
</script>

<style scoped>
  .button_style{
    float: none;
  }
</style>
