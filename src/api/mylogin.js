import { axios2 } from '@/utils/request'
import Vue from 'vue'
import { TOKEN_INFO } from '@/store/mutation-types'

const api = {
  login: '/uaa/oauth/token',
  refreshToken: 'uaa/oauth/token',
  loginOut: '/uaa/oauth/token',
  currentUser: '/org/base_service/user/find_current',
  userResource: '/org/base_service/user_resource/find_user_resource_code',
  getLicense: '/org/base_service/tenancy/license',
  getTenancy: '/org/base_service/tenancy/tenancy',
  findUserCount: '/org/base_service/user/find_user_count',
  getCurApp: '/org/base_service/tenancy/app',
  disableApp: '/org/base_service/tenancy/disable_app',
  getDisableAppId: '/org/base_service/tenancy/disableAppId'
}

/**
 * 用户登陆
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios2({
    url: api.login,
    method: 'post',
    params: parameter
  })
}

/**
 * 用户登出
 * @param parameter
 * @returns {*}
 */
export function logout (parameter) {
  return axios2({
    url: api.loginOut,
    method: 'delete',
    params: parameter
  })
}

/**
 * 更新token
 * @returns {*}
 */
export function refreshToken () {
  const params = {}
  params.grant_type = 'refresh_token'
  params.client_id = 'browser'
  params.refresh_token = JSON.parse(Vue.ls.get(TOKEN_INFO)).refresh_token
  return axios2({
    url: api.refresh,
    method: 'post',
    params: params
  })
}

/**
 * 得到你用户信息
 * @returns {*}
 */
export function getUserInfo () {
  return axios2({
    url: api.currentUser,
    method: 'get'
  })
}

/**
 * 得到用户所有资源权限
 * @param parameter
 * @returns {*}
 */
export function getUserResource (parameter) {
  return axios2({
    url: api.userResource + '/' + parameter.userId,
    method: 'get'
  })
}

/**
 * 获取用户所有资源信息
 * @returns {Promise}
 */
export const getUserAllResource = (parameter) => {
  return axios2({
    url: '/org/base_service/user_resource/find_user_all_resource/' + parameter.id,
    method: 'get'
  })
}

export function getTenancy () {
  return axios2({
    url: api.getTenancy,
    method: 'get'
  })
}

/**
 * 得到租户牌照信息
 * @returns {*}
 */
export function getLicense () {
  return axios2({
    url: api.getLicense,
    method: 'get'
  })
}

/**
 * 得到租户数量
 * @returns {*}
 */
export function findUserCount () {
  return axios2({
    url: api.findUserCount,
    method: 'get'
  })
}

/**
 * 得到应用管理的总数量
 * @returns {*}
 */
export function getCurApp () {
  return axios2({
    url: api.getCurApp,
    method: 'get'
  })
}

/**
 * 获取被禁用的数量
 * @param {*} parameter
 */
export function getDisableAppId () {
  return axios2({
    url: api.getDisableAppId,
    method: 'get'
  })
}

/**
 * 授权与否
 * @param parameter
 * @returns {*}
 */
export function disableApp (data) {
  return axios2({
    url: api.disableApp,
    method: 'put',
    data: data
  })
}
