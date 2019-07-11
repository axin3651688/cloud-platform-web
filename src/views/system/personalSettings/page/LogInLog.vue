<template>
    <div class="loginLog">
      <!-- 路由的头部 -->
      <div>
        <a-menu
          :mode="'horizontal'"
          :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
          :selectedKeys="selectedKeys"
          type="inner"
          @openChange="onOpenChange">
          <a-menu-item key="/personalSettings/LoggingStatements">
            <router-link :to="{ name: 'LoggingStatements' }">
              基本资料
            </router-link>
          </a-menu-item>
          <a-menu-item key="/personalSettings/BindingAccount">
            <router-link :to="{ name: 'BindingAccount' }">
              绑定账号
            </router-link>
          </a-menu-item>
          <a-menu-item key="/personalSettings/LogInLog">
            <router-link :to="{ name: 'LogInLog' }">
              登陆日志
            </router-link>
          </a-menu-item>
        </a-menu>
        <route-view></route-view>
      </div>
      <!-- 路由头部以下内容 -->
      <div class="search">
        <a-input-search
        placeholder="请输入内容"
        style="width:290px;height:30px;"
        @search="onSearch"/>
        &nbsp;&nbsp;&nbsp;
        <a-button type="primary">搜索</a-button>
      </div>

      <div class="table"> 
        <a-table :columns="columns" :dataSource="data" bordered >
          
        </a-table>
      </div>
    </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { mixinDevice } from '@/utils/mixin.js'
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
  },{
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
    id:'1',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },{
    id:'2',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },{
    id:'3',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },{
    id:'4',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },{
    id:'5',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },{
    id:'6',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },{
    id:'7',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },{
    id:'8',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },{
    id:'9',
    time:'17:18',
    platform:'云智囊',
    machine:'ios',
    address:'合肥'
  },];
  export default {
    mixins: [mixinDevice],
    components: { PageView, RouteView },
    name: 'LogInLog',
    data() {
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
      },
      onOpenChange (openKeys) {
        this.openKeys = openKeys
      },
      updateMenu () {
        const routes = this.$route.matched.concat()
        this.selectedKeys = [routes.pop().path]
      }
    },
    watch: {
      '$route' (val) {
        this.updateMenu()
      }
    }
  }
</script>

<style scoped>
.search{
  margin-bottom: 20px;
  padding-top: 20px;
}
</style>