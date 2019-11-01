<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <div class="menu" style="max-height:100vh;overflow-y: auto">
    <logo />
        <s-menu
          :collapsed="collapsed"
          :menu="menus"
          :theme="theme"
          :mode="mode"
          @select="onSelect"
          style="padding: 16px 0px;">
        </s-menu>
    </div>
  </a-layout-sider>

</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
    // ,
    // menus: {
    //   type: Array,
    //   required: true
    // }
  },
  data () {
    return {
      menus: [
        {
          meta: {
            icon: 'appstore',
            keepAlive: false,
            permission: Array(1),
            title: '系统'
          }
        },
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
            icon: 'database',
            keepAlive: false,
            permission: Array(1),
            title: '产品'
          }
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
            icon: 'layout',
            keepAlive: false,
            permission: Array(1),
            title: '官网'
          }
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
            icon: 'setting',
            keepAlive: false,
            permission: Array(1),
            title: '设置'
          }
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
        },
        {
          meta: {
            icon: 'info-circle',
            keepAlive: false,
            permission: Array(1),
            title: '代理（开发中）'
          }
        }
      ]
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style scoped>
  ::-webkit-scrollbar
  {
    width:8px;
    background-color:#001529;
  }
  ::-webkit-scrollbar-thumb
  {
    border-radius:8px;
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
    background-color:#555;
  }
</style>
