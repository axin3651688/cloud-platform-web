import { axios2 } from '@/utils/request'

const api = {
  login: '/uaa/oauth/token',
  loginOut: '/uaa/oauth/token',
  currentUser: '/org/base_service/user/find_current',
  userResource: '/org/base_service/user_resource/find_user_resource_code'
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
