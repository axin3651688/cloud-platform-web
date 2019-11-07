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
      :scroll="{y:'calc(100vh - 311px)' }"
      :rowClassName="rowClassName"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">

      <template slot="action" slot-scope="text,record">
        <span @click="btnclick(record )">详情</span>
      </template>
      <template slot="tag" slot-scope="text,record" >
        <span>
          <a-tag
            color="blue"
            :key="record.id">{{ text }}</a-tag>
        </span>
      </template>
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
        pageSize: 20,
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['20', '50', '100'],
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize,
        total: 0 // 总条数
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
