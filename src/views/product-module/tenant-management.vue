<template>
  <div>
    <!-- <h1>租户管理 TenantManagement</h1> -->
    <!-- <commom-search :placeholder="placeholder"></commom-search> -->
    <div>
      <commom-search :placeholder="placeholder"></commom-search>
      <common-button :name1="name1"
                     :name2="name2"
                     @addClick="addClick"
                     @deleteClick="deleteClick">
      </common-button>
      <div style="height:32px"></div>
      <common-table style="margin-top:100"
                    :columns="columns"
                    :data="data"></common-table>
    </div>
  </div>
</template>

<script>
import CommonSearch from '@/components/system/common-search'
import CommonTable from '@/components/system/common-table'
import CommonButton from '@/components/system/common-button'
export default {
  components: {
    CommonTable,
    CommonButton,
    CommonSearch
  },
  name: 'TenantManagement',
  data () {
    return {
      columns: [{
        title: 'Name',
        dataIndex: 'name'
      }, {
        title: 'Age',
        dataIndex: 'age'
      }, {
        title: 'Address',
        dataIndex: 'address'
      }],
      data: [{
        key: 1,
        name: 'Edward King',
        age: 32,
        address: '合肥'
      }, {
        key: 2,
        name: 'Edward King2',
        age: 30,
        address: '合肥2'
      }, {
        key: 3,
        name: 'Edward King1',
        age: 31,
        address: '合肥1'
      }
      ],
      name1: '添加租户',
      name2: '删除',
      placeholder:'关键词搜索'
    }
  },
  methods: {
    addClick () {
      debugger
      alert('addClick')
    },
    deleteClick () { alert('deleteClick') }
  }
}

</script>

<style scoped>
</style>
