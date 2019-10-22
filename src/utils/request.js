import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN, TOKEN_INFO } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 6000
})

const err = async (error) => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
  }
  return Promise.reject(error)
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
  baseURL: '/aapi', // api base_url
  timeout: 6000 // 请求超时时间
})
/* *************************** service2 因为上面的用于请求mock了，下面的是改动过得 *************************** */
service2.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

service2.interceptors.response.use(async (response) => {
  if (response.data.code !== 200 && response.data.code !== '200') {
    if (response.data.code === 0 && response.data.msg === '令牌错误') {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    }
    let description = '接口返回了错误的信息'
    if (response.data && response.data.msg) {
      description = response.data.msg
    }
    notification.error({
      message: '异常请求',
      description: description
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
