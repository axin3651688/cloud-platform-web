<template>
  <div>
    <a-menu
      :mode="'horizontal'"
      :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
      :selectedKeys="selectedKeys"
      type="inner"
      @openChange="onOpenChange">
      <a-menu-item v-if="$auth('RoleManagement')" key="/RoleManagement/RoleMembers">
        <router-link :to="{ name: 'RoleManagement' }">
          角色成员
        </router-link>
      </a-menu-item>
      <a-menu-item v-if="$auth('FunctionalPermissions')" key="/RoleManagement/FunctionalPermissions">
        <router-link :to="{ name: 'FunctionalPermissions' }">
          功能权限
        </router-link>
      </a-menu-item>
      <a-menu-item v-if="$auth('DataScope')" key="/RoleManagement/DataScope">
        <router-link :to="{ name: 'DataScope' }">
          数据范围
        </router-link>
      </a-menu-item>
      <a-menu-item v-if="$auth('MenuPermissions')" key="/RoleManagement/MenuPermissions">
        <router-link :to="{ name: 'MenuPermissions' }">
          菜单权限
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
  components: { PageView, RouteView },
  mixins: [mixinDevice],
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
