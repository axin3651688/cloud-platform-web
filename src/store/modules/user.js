import Vue from 'vue'
// import { login, getInfo, logout } from '@/api/login'
import { login, logout, getUserInfo, getUserAllResource } from '@/api/mylogin'
import { ACCESS_TOKEN, TOKEN_INFO } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    // token: {},
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    resources: [],
    resourceCode: []
  },

  mutations: {
    // SET_TOKEN: (state, token) => {
    //   state.token = token
    // },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_RESOURCE: (state, resources) => {
      state.resources = resources
    },
    SET_RESOURCE_CODE: (state, resourceCode) => {
      state.resourceCode = resourceCode
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          Vue.ls.set(ACCESS_TOKEN, result['token_type'] + ' ' + result['access_token'])
          Vue.ls.set(TOKEN_INFO, JSON.stringify(result));
          // commit('SET_TOKEN', result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // 用户信息先注释了
        // 获取用户基本信息，填充名称，头像。
        // 获取用户角色和权限，渲染角色列表和权限列表，设计和下面不同，
        // 获取用户有权限的菜单，渲染菜单和菜单对应的权限meta，渲染路由
        // 页面获取的时候就直接判断对应权限列表中有没有当前菜单有没有对应meta的权限
        getUserInfo().then(async response => {
          const user = response.data
          if (user) {
            if (user.enable == '0') {
              throw new Error('用户已被禁用')
            }
            commit('SET_INFO', user)
            commit('SET_NAME', { name: user.trueName, welcome: welcome() })
            commit('SET_AVATAR', user.avatar)
            // 查询用户所有权限塞进去
            const res = await getUserAllResource({ id: user.id })
            if (res.code !== 200) {
              throw new Error('获取资源信息失败!')
            }
            const components = res.data.map(function (ele) {
              return ele.component
            })
            if (res.data.length === 0) {
              throw new Error('资源信息为空!')
            }
            commit('SET_RESOURCE', res.data)
            commit('SET_RESOURCE_CODE', components)
            resolve(response)
          } else {
            throw new Error('未获取到用户信息!')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        const tokenInfo = JSON.parse(Vue.ls.get(TOKEN_INFO))
        logout({ access_token: tokenInfo['access_token'], client_id: 'browser' }).then(() => {
          // commit('SET_TOKEN', {})
          commit('SET_ROLES', [])
          commit('SET_RESOURCE', [])
          Vue.ls.remove(ACCESS_TOKEN)
          Vue.ls.remove(TOKEN_INFO)
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }

  }
}

export default user
