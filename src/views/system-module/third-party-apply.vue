<template>
  <div>

    <div style="display: flex;justify-content: flex-end;">
      <common-button
        style="float: none;"
        :name1="name1"
        :name2="name2"
        @addClick="addClick"
        @deleteClick="deleteClick">
      </common-button>
    </div>
    <a-table
      class="apply-table"
      bordered
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
      <template slot="caozuo" slot-scope="text, record">
        <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;">
          <span @click="btnClickEdit(record)">修改
            <img
              style="width: 12px;"
              src="../../assets/icons/paixu.svg" />
          </span>
        </div>
      </template>
      <template slot="zhuangtai" slot-scope="text, record">
        <!--1代表开-->
        <span style="margin-right: 4px">{{ record.name2==1?'启用':'禁用' }}</span>
        <a-switch :defaultChecked="record.name2==1?true:false" @click="changeState"/>
      </template>
    </a-table>
  </div>
</template>

<script>
import CommonButton from '@/components/system/common-button'

export default {
  components: {
    CommonButton
  },
  data () {
    return {
      name1: '添加接入',
      name2: '删除',
      selectedRowKeys: [],
      columns: [
        {
          title: '应用名称',
          dataIndex: 'name'
        },
        {
          title: '应用描述',
          dataIndex: 'name1'
        },
        {
          title: '状态',
          dataIndex: 'name2',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        { title: '操作',
          dataIndex: '',
          key: 'x',
          width: '10%',
          scopedSlots: { customRender: 'caozuo' }
        }
      ],
      dataSource: [
        {
          key: '1',
          name: 'hahha',
          name1: '1233',
          name2: 0
        },
        {
          key: '2',
          name: 'hahha',
          name1: '1233',
          name2: 1
        },
        {
          key: '3',
          name: 'hahha',
          name1: '1233',
          name2: 0
        }
      ]

    }
  },
  methods: {
    addClick () {

    },
    deleteClick () {

    },
    changeState () {

    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style scoped>
</style>
