<template>
  <div>
    <a-menu
      :mode="'horizontal'"
      :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
      :selectedKeys="selectedKeys"
      type="inner"
      @openChange="onOpenChange">
      <a-menu-item key="/MemberManagement/BusinessMembers">
        <router-link :to="{ name: 'BusinessMembers' }">
          企业成员
        </router-link>
      </a-menu-item>
      <a-menu-item key="/MemberManagement/Position">
        <router-link :to="{ name: 'Position' }">
          职位
        </router-link>
      </a-menu-item>
      <a-menu-item key="/MemberManagement/Robot">
        <router-link :to="{ name: 'Robot' }">
          机器人
        </router-link>
      </a-menu-item>
      <a-menu-item key="/MemberManagement/DisablingAccounts">
        <router-link :to="{ name: 'DisablingAccounts' }">
          禁用账号
        </router-link>
      </a-menu-item>
    </a-menu>
    <route-view></route-view>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'MemberManagement',
  mixins: [mixinDevice],
  components: { PageView, RouteView },
  data () {
    return {
      openKeys: [],
      selectedKeys: []
    }
  },
  created () {
    this.updateMenu()
  },
  methods: {
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

</style>
