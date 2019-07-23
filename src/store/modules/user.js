import Vue from 'vue'
// import { login, getInfo, logout } from '@/api/login'
import { login, logout, getUserInfo, getUserAllResource } from '@/api/mylogin'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: {},
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    resources: [],
    resourceCode: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
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
          Vue.ls.set(ACCESS_TOKEN, result['token_type'] + ' ' + result['access_token'], result['expires_in'] * 1000)
          commit('SET_TOKEN', result)
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
            commit('SET_INFO', user)
            commit('SET_NAME', { name: user.trueName, welcome: welcome() })
            commit('SET_AVATAR', user.avatar)
            // 查询用户所有权限塞进去
            const res = await getUserAllResource({ id: user.id })
            const components = res.data.map(function (ele) {
              return ele.component
            })
            commit('SET_RESOURCE', res.data)
            commit('SET_RESOURCE_CODE', components)
            resolve(response)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          /// 不要了，下面是原来的代码
          /* if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar) */
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', {})
        commit('SET_ROLES', [])
        commit('SET_RESOURCE', [])
        Vue.ls.remove(ACCESS_TOKEN)
        logout({ access_token: state.token['access_token'] }).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }

  }
}

export default user
