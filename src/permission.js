import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, TOKEN_INFO } from '@/store/mutation-types'
import {TIME_SETTING} from '@/config/projectSetting'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  // 用于其他系统跳转过来，把Token也携带过来即可
  if (to.query.access_token && to.query.token_info) {
    Vue.ls.set(ACCESS_TOKEN, to.query.access_token)
    Vue.ls.set(TOKEN_INFO, to.query.token_info)
  }
  clearInterval(window.login_timer)
  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/user/login') {
      next({ path: '/Console' })
      NProgress.done()
    } else {
      // 重新设置一个刷新token的定时器
      window.login_timer = setInterval(function () {
        store.dispatch('RefreshToken').then(function () {
          console.info('刷新成功')
        })
      }, TIME_SETTING.refreshTokenInterval)
      // 如果没有任何资源信息，那么重新去获取一下
      if (!store.getters.userInfo.id) {
        store.dispatch('GetInfo').then(res => {
          // 调用 vuex 从后端获取用户的路由菜单，动态添加可访问路由表
          store.dispatch('GenerateRoutes', { id: res.data.id }).then(() => {
            // 把已获取到的路由菜单加入到路由表中
            router.addRoutes(store.getters.addRouters)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        }).catch((err) => {
          notification.error({
            message: '错误',
            description: err.message
          })
          NProgress.done()
          store.dispatch('Logout').then(() => {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // hotfix 2019年7月22日11:07:59 方强 这里的fullPath有问题的，如果两次登陆的菜单不同会出现404，但无法记住刚刚退出时的界面，每次进入都是默认界面
      next({ path: '/user/login'/*, query: { redirect: to.fullPath } */ })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
