<!-- 工程中共用的表格模板组件 -->
<template>
  <div>
    <div style="margin-bottom: 16px">
    </div>
    <a-table
      size="small"
      :dataSource="data"
      :rowKey="setKey"
      :pagination="pagination"
      :columns="columns"
      :rowClassName="rowClassName"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">

      <span
        slot="action"
        slot-scope="text,record"
        @click="btnclick(record )"><img style="cursor: pointer;" src="@icons/xiangqing.svg" title="详情"></span>
      <span>123</span>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  data () {
    return {
      // data,
      // columns,
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      hasSelected: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    }
  },
  props: {
    columns: Array, // 格式如{title: 'Name',dataIndex: 'name'}
    data: Array
  },
  // computed: {
  //   hasSelected () {
  //     return this.selectedRowKeys.length > 0
  //   }
  // },
  methods: {
    start () {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      const ids = this.selectedRowKeys
      // console.log(ids, '111111000000')
      this.$emit('getIds', ids)
    },
    onCellChange (key, dataIndex, value) {

    },
    btnclick (key) {
      // debugger
      // console.log('按钮====' + key.id)
      this.$router.push({ name: 'TenantDetail', query: { id: key.id } })
      // this.$router.push({ name: 'TenantDetail' })
    },
    setKey (record) {
      return record.id
    },
    rowClassName () {
      return 'tenant-table'
    }
  }
}
</script>
<style scoped>
  /deep/.tenant-table>td{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
