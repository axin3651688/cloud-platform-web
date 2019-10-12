<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }">
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer v-if="!production"></setting-drawer>
    </a-layout>
  </a-layout>

</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

import RouteView from './RouteView'
import MultiTab from '@/components/MultiTab'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer
  },
  data () {
    return {
      production: config.production,
      collapsed: false,
      menus: [
        {
          meta: {
            icon: 'xx',
            keepAlive: false,
            permission: Array(1),
            title: '控制台'
          },
          name: 'Console',
          path: '/Console'
        },
        {
          meta: {
            icon: 'xx1',
            keepAlive: false,
            permission: Array(1),
            title: '参数管理'
          },
          name: 'ParamManagement',
          path: '/ParamManagement'
        },
        {
          meta: {
            icon: 'xx2',
            keepAlive: false,
            permission: Array(1),
            title: '服务管理'
          },
          name: 'ServeManagement',
          path: '/ServeManagement'
        },
        {
          meta: {
            icon: 'xx3',
            keepAlive: false,
            permission: Array(1),
            title: '应用管理'
          },
          name: 'ApplyManagement',
          path: '/ApplyManagement'
        },
        {
          meta: {
            icon: 'xx4',
            keepAlive: false,
            permission: Array(1),
            title: '第三方应用'
          },
          name: 'ThirdPartyApply',
          path: '/ThirdPartyApply'
        },
        {
          meta: {
            icon: 'xx5',
            keepAlive: false,
            permission: Array(1),
            title: '牌照管理'
          },
          name: 'LicenseManagement',
          path: '/LicenseManagement'
        },
        {
          meta: {
            icon: 'xx6',
            keepAlive: false,
            permission: Array(1),
            title: '租户管理'
          },
          name: 'TenantManagement',
          path: '/TenantManagement'
        },
        {
          meta: {
            icon: 'xx7',
            keepAlive: false,
            permission: Array(1),
            title: '模块管理'
          },
          name: 'ModuleManagement',
          path: '/ModuleManagement'
        },
        {
          meta: {
            icon: 'xx8',
            keepAlive: false,
            permission: Array(1),
            title: '用户管理'
          },
          name: 'UserManagement',
          path: '/UserManagement'
        },
        {
          meta: {
            icon: 'xx9',
            keepAlive: false,
            permission: Array(1),
            title: '内容管理'
          },
          name: 'ContentManagement',
          path: '/ContentManagement'
        },
        {
          meta: {
            icon: 'xx10',
            keepAlive: false,
            permission: Array(1),
            title: '文件管理'
          },
          name: 'FileManagement',
          path: '/FileManagement'
        },
        {
          meta: {
            icon: 'xx11',
            keepAlive: false,
            permission: Array(1),
            title: '商机管理'
          },
          name: 'BusinessChanceManagement',
          path: '/BusinessChanceManagement'
        },
        {
          meta: {
            icon: 'xx12',
            keepAlive: false,
            permission: Array(1),
            title: '账号管理'
          },
          name: 'AccountManagement',
          path: '/AccountManagement'
        },
        {
          meta: {
            icon: 'xx13',
            keepAlive: false,
            permission: Array(1),
            title: '角色管理'
          },
          name: 'RoleManagement',
          path: '/RoleManagement'
        },
        {
          meta: {
            icon: 'xx14',
            keepAlive: false,
            permission: Array(1),
            title: '权限管理'
          },
          name: 'LimitManagement',
          path: '/LimitManagement'
        },
        {
          meta: {
            icon: 'xx15',
            keepAlive: false,
            permission: Array(1),
            title: '数据字典'
          },
          name: 'DataDictionary',
          path: '/DataDictionary'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '256px'
      }
      return '80px'
    }
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  created () {
    this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc () {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    menuSelect () {debugger
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    drawerClose () {
      this.collapsed = false
    }
  }
}
</script>

<style lang="less">
@import url('../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
