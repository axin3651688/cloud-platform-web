<template>
  <div class="loginLog">
    <!-- 路由头部以下内容 -->
    <div class="search">
      <a-input-search placeholder="请输入内容"
                      style="width:290px;height:30px;"
                      @search="onSearch" />
      &nbsp;&nbsp;&nbsp;
      <a-button type="primary">搜索</a-button>
    </div>

    <div class="table">
      <a-table :columns="columns"
               :dataSource="data"
               bordered>

      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
  }, {
    title: '登陆时间',
    dataIndex: 'time',
  }, {
    title: '登陆平台',
    dataIndex: 'platform',
  }, {
    title: '登陆设备',
    dataIndex: 'machine',
  }, {
    title: '登陆地址',
    dataIndex: 'address',
  }];

const data = [
  {
    id: '1',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  }, {
    id: '2',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  }, {
    id: '3',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  }, {
    id: '4',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  }, {
    id: '5',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  }, {
    id: '6',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  }, {
    id: '7',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  }, {
    id: '8',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  }, {
    id: '9',
    time: '17:18',
    platform: '云智囊',
    machine: 'ios',
    address: '合肥'
  },];
export default {
  name: 'LogInLog',
  data () {
    return {
      data,
      columns,
      openKeys: [],
      selectedKeys: []
    }
  },
  methods: {
    onSearch (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
.search {
  margin-bottom: 20px;
  padding-top: 20px;
}
</style>