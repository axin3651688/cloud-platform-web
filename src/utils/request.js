import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { refreshToken } from '@/api/mylogin'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 6000
})

const err = async (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401) {
      // 刷新token
      const res = await refreshToken()
      if (res.code === 200) {
        // 设置
        store.commit('SET_TOKEN', res)
        const token = res['token_type'] + ' ' + res['access_token']
        Vue.ls.set(ACCESS_TOKEN, token)
        return doRequest(error, token)
      } else {
        notification.error({
          message: 'Unauthorized',
          description: 'Authorization verification failed'
        })
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
      }
    }
  }
  return Promise.reject(error)
}

// 继续用户未完成的请求
async function doRequest (error, token) {
  const config = error.response.config
  config.headers.Authorization = token
  const res = await axios.request(config)
  return res
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const service2 = axios.create({
  baseURL: '', // api base_url
  timeout: 1 // 请求超时时间
})
/* *************************** service2 因为上面的用于请求mock了，下面的是改动过得 *************************** */
service2.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

service2.interceptors.response.use((response) => {
  if (response.data.code !== 200) {
    notification.error({
      message: '异常请求',
      description: '接口返回了错误的信息'
    })
    response.data.data = undefined
    return response.data
  }
  return response.data
}, err)
/* *************************** service2 因为上面的用于请求mock了，下面的是改动过得 *************************** */

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
    Vue.use(VueAxios, service2)
  }
}

export {
  installer as VueAxios,
  service as axios,
  service2 as axios2
}
