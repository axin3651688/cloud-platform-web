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
    <!--<a-table-->
    <!--:rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"-->
    <!--:columns="columns"-->
    <!--:dataSource="data" />-->
    <a-table bordered :dataSource="data" :columns="columns" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">

      <span slot="action" slot-scope="text" @click="btnclick(text.key )">Delete</span>
      <!--<p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{ record.description }}</p>-->

      <!-- <template slot="name" slot-scope="text, record">
        <span :text="text" @change="onCellChange(record.key, 'name', $event)" >123</span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" class="ant-dropdown-link"> Invite 一 {{ record.name }} <a-icon type="down" /> </a>
        </span>
      </template>-->
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
    },
    onCellChange (key, dataIndex, value) {

    },
    btnclick (key) {
      console.log('按钮====' + key)
      this.$router.push({ name: 'TenantDetail' })
      // this.$router.push({ name: 'TenantDetail' })
    }
  }
}
</script>
<style scoped>
</style>
