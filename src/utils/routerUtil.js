/* eslint-disable no-debugger */
import {
// axios2
} from '@/utils/request'
// eslint-disable-next-line
import {
  // UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'
import store from '@/store'
// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,

  // 你需要动态引入的页面组件
  analysis: () => import('@/views/dashboard/Analysis'),
  workplace: () => import('@/views/dashboard/Workplace'),
  monitor: () => import('@/views/dashboard/Monitor'),

  // MemberManagement: () => import('@/views/system/memberManagement/Index'),
  // BusinessMembers: () => import('@/views/system/memberManagement/page/BusinessMembers'),
  // DisablingAccounts: () => import('@/views/system/memberManagement/page/DisablingAccounts'),
  // Position: () => import('@/views/system/memberManagement/page/Position'),
  // Robot: () => import('@/views/system/memberManagement/page/Robot'),

  // RoleManagement: () => import('@/views/system/roleManagement/Index'),
  // FunctionalPermissions: () => import('@/views/system/roleManagement/page/FunctionalPermissions'),
  // MenuPermissions: () => import('@/views/system/roleManagement/page/MenuPermissions'),
  // RoleMembers: () => import('@/views/system/roleManagement/page/RoleMembers'),
  // DataScope: () => import('@/views/system/roleManagement/page/DataScope'),

  // EnterpriseSettings: () => import('@/views/system/enterpriseSettings/Index'),
  // CompanyInformation: () => import('@/views/system/enterpriseSettings/page/CompanyInformation'),
  // SectoralInformation: () => import('@/views/system/enterpriseSettings/page/SectoralInformation'),

  // PersonalSettings: () => import('@/views/system/personalSettings/Index'),
  // BindingAccount: () => import('@/views/system/personalSettings/page/BindingAccount'),
  LoggingStatements: () => import('@/views/system/personalSettings/page/LoggingStatements'),
  LogInLog: () => import('@/views/system/personalSettings/page/LogInLog'),

  Console: () => import('@/views/system-module/console'),
  ParamManagement: () => import('@/views/system-module/param-management'),
  ServeManagement: () => import('@/views/system-module/serve-management'),
  ApplyManagement: () => import('@/views/system-module/apply-management'),
  ThirdPartyApply: () => import('@/views/system-module/third-party-apply'),
  LicenseManagement: () => import('@/views/product-module/license-management'),
  TenantManagement: () => import('@/views/product-module/tenant-management'), // *********
  ModuleManagement: () => import('@/views/product-module/module-management'),
  UserManagement: () => import('@/views/product-module/user-management'),
  ContentManagement: () => import('@/views/official-module/content-management'),
  FileManagement: () => import('@/views/official-module/file-management'),
  BusinessChanceManagement: () => import('@/views/official-module/business-chance-management'),
  AccountManagement: () => import('@/views/set-module/account-management'),
  RoleManagement: () => import('@/views/set-module/role-management'),
  LimitManagement: () => import('@/views/set-module/limit-management'),
  DataDictionary: () => import('@/views/set-module/data-dictionary'),
  // ...more
  TenantDetail: () => import('@/views/product-module/tenant-components/tenant-detail'),
  UserDetail: () => import('@/views/product-module/user-components/user-detail'),
  RoleAccredit: () => import('@/views/set-module/role-components/role-accredit')

}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

const customRoute = [
  {
    title: '首页',
    key: '',
    name: 'index',
    component: 'BasicLayout',
    redirect: '/Console',
    children: [
      {
        component: 'Console',
        icon: 'bb',
        key: 'Console',
        title: '控制台'
      }, {
        component: 'ParamManagement',
        icon: 'bb',
        key: 'ParamManagement',
        title: '参数管理'
      }, {
        component: 'ServeManagement',
        icon: 'bb',
        key: 'ServeManagement',
        title: '服务管理'
      }, {
        component: 'ApplyManagement',
        icon: 'bb',
        key: 'ApplyManagement',
        title: '应用管理'
      },
      {
        component: 'ThirdPartyApply',
        icon: 'bb',
        key: 'ThirdPartyApply',
        title: '第三方应用'
      }, {
        component: 'LicenseManagement',
        icon: 'bb',
        key: 'LicenseManagement',
        title: '牌照管理'
      },
      {
        component: 'TenantManagement',
        icon: 'bb',
        key: 'TenantManagement',
        title: '租户管理'
      },
      {
        component: 'TenantDetail',
        icon: 'bb',
        key: 'TenantDetail',
        hidden: true,
        title: '租户详情'
      }, {
        component: 'ModuleManagement',
        icon: 'bb',
        key: 'ModuleManagement',
        title: '模块管理'
      },
      {
        component: 'UserManagement',
        icon: 'bb',
        key: 'UserManagement',
        title: '用户管理'
      },
      {
        component: 'UserDetail',
        icon: 'bb',
        key: 'UserDetail',
        title: '用户管理详情'
      },
      {
        component: 'ContentManagement',
        icon: 'bb',
        key: 'ContentManagement',
        title: '内容管理'
      },
      {
        component: 'FileManagement',
        icon: 'bb',
        key: 'FileManagement',
        title: '文件管理'
      }, {
        component: 'BusinessChanceManagement',
        icon: 'bb',
        key: 'BusinessChanceManagement',
        title: '商机管理'
      },
      {
        component: 'AccountManagement',
        icon: 'bb',
        key: 'AccountManagement',
        title: '账号管理'
      }, {
        component: 'RoleManagement',
        icon: 'bb',
        key: 'RoleManagement',
        title: '角色管理'
      }, {
        component: 'RoleAccredit',
        icon: 'bb',
        key: 'RoleAccredit',
        title: '角色授权'
      },
      {
        component: 'LimitManagement',
        icon: 'bb',
        key: 'LimitManagement',
        title: '权限管理'
      },
      {
        component: 'DataDictionary',
        icon: 'bb',
        key: 'DataDictionary',
        title: '数据字典'
      }
    ]
  }]
//
/**
 * 获取路由菜单信息
 *
 * 1. 调用 getRouterByUser() 访问后端接口获得路由结构数组
 *    @see https://github.com/sendya/ant-design-pro-vue/blob/feature/dynamic-menu/public/dynamic-menu.json
 * 2. 调用
 * @returns {Promise<any>}
 */
export const generatorDynamicRouter = (data) => {
  return new Promise((resolve, reject) => {
    // const resources = store.getters.resources
    // const sysResource = transferToMenuResource(resources)
    // const routeTree = getRoute(sysResource)
    const routeTree = customRoute
    const routers = generator(routeTree)
    routers.push(notFoundRouter)
    console.log(JSON.stringify(routers))
    resolve(routers)
  })
}

function transferToMenuResource (resources) {
  return resources.filter(function (ele) {
    return ele.type == 1 && ele.sys == '1'
  })
  // 找到所有菜单节点的子节点中的权限节点，将该权限节点设置到
}

/**
 * 生成路由必要属性
 * @param list
 * @returns {{redirect: string, component: string, children: Array, name: string, title: string, key: string}[]}
 */
function getRoute (list) {
  // 必要要一个默认首页
  const rootRouter = {
    title: '首页',
    key: '',
    name: 'index',
    component: 'BasicLayout',
    redirect: '/Console',
    children: []
  }
  // 0为数据库菜单资源默认顶级父节点
  const tree = list2Tree(list, '0')
  const routerTree = setRouteProperties(tree)
  rootRouter.children = routerTree
  return [rootRouter]
}

/**
 * 列表转树
 * 列表中父属性使用spcode，并且带有nleaf属性才可以使用此方法
 * @param list  列表
 * @param pCode 传入父节点，找到该父节点所有子节点
 * @returns {Array}
 */
function list2Tree (list, pCode) {
  const arr = []
  list.forEach(function (ele) {
    if (ele.pcode == pCode) {
      if (ele.leaf == 0) {
        ele.children = list2Tree(list, ele.code)
        arr.push(ele)
      } else {
        arr.push(ele)
      }
    }
  })
  return arr
}

/**
 * 更改菜单树为路由树的属性
 * @param tree
 * @returns {Array}
 */
function setRouteProperties (tree) {
  const routerTree = []
  tree.forEach(function (ele) {
    const node = {
      title: ele.text,
      key: ele.component,
      component: ele.component,
      icon: ele.pcAvatar
    }
    if (Array.isArray(ele.children)) {
      node.children = setRouteProperties(ele.children)
    }
    routerTree.push(node)
  })
  return routerTree
}

/**
 * 格式化 路由 结构信息并递归生成层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件
      component: constantRouterComponents[item.component || item.key],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: item.title,
        icon: item.icon || undefined,
        keepAlive: false,
        permission: item.key && [item.key] || null
      }
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // 2019年7月6日11:21:42 隐藏次级
      currentRouter.hideChildrenInMenu = true
      if (!item.redirect) {
        currentRouter.redirect = `${currentRouter.path}/${item.children[0].key}`
      }
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}
