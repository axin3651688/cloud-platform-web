<template>
  <div>
    <a-menu
      :mode="'horizontal'"
      :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
      :selectedKeys="selectedKeys"
      type="inner"
      @openChange="onOpenChange">
      <a-menu-item key="/EnterpriseSettings/CompanyInformation">
        <router-link :to="{ name: 'CompanyInformation' }">
          公司信息
        </router-link>
      </a-menu-item>
      <a-menu-item key="/EnterpriseSettings/SectoralInformation">
        <router-link :to="{ name: 'SectoralInformation' }">
          部门信息
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
  name: 'Index',
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
