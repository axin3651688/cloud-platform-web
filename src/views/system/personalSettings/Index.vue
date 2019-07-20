<template>
  <div class="tab_menu">
    <a-menu
      :mode="'horizontal'"
      :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
      :selectedKeys="selectedKeys"
      type="inner"
      @openChange="onOpenChange">
      <a-menu-item key="/PersonalSettings/LoggingStatements">
        <router-link :to="{ name: 'LoggingStatements' }">
          基本资料
        </router-link>
      </a-menu-item>
      <a-menu-item key="/PersonalSettings/BindingAccount">
        <router-link :to="{ name: 'BindingAccount' }">
          绑定账号
        </router-link>
      </a-menu-item>
      <a-menu-item key="/PersonalSettings/LogInLog">
        <router-link :to="{ name: 'LogInLog' }">
          登陆日志
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
  name: 'PersonalSettings',
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