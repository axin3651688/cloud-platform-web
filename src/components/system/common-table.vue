<!-- 工程中共用的表格模板组件 -->
<template>
  <div>
    <div style="margin-bottom: 16px">
      <!-- <a-button
        type="primary"
        @click="start"
        :disabled="!hasSelected"
        :loading="loading">
      </a-button> -->
      <!-- <span style="margin-left: 8px"> -->
      <!-- <template v-if="hasSelected">
        {{ `Selected ${selectedRowKeys.length} items` }}
      </template> -->
      <!-- </span> -->
    </div>
    <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
             :columns="columns"
             :dataSource="data" />
  </div>
</template>

<script>
// const columns = [{
//   title: 'Name',
//   dataIndex: 'name'
// }, {
//   title: 'Age',
//   dataIndex: 'age'
// }, {
//   title: 'Address',
//   dataIndex: 'address'
// }]

// const data = []
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`
//   })
// }

export default {
  name: 'CommonTable',
  data () {
    return {
      // data,
      // columns,
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
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>
<style scoped>
</style>
