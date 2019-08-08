import { axios2 } from '@/utils/request'

const api = {
  addUser: '/org/base_service/user/save_user',
  addUserToSystem: '/uc/user/save',
  modifyUser: '/org/base_service/user/update_user_by_field',
  enableParam: '/org/base_service/user/update_user_enable',
  deleteUser: '/org/base_service/user/delete_user',
  batchDeleteUser: '/org/base_service/user/delete_users',
  findUserCount: '/org/base_service/user/find_user_count',
  findSystemUserByPhone: '/uc/user/find_user_phone',
  findUsers: '/org/base_service/user/find_users',
  findPageUsers: '/org/base_service/user/find_page_users'
}

/**
 * 保存用户
 * @param parameter
 * @returns {*}
 */
export function saveUser (parameter) {
  return axios2({
    url: api.addUser,
    method: 'post',
    params: parameter
  })
}

/**
 * 保存用户去云之囊
 * @param parameter
 * @returns {*}
 */
export function saveUserToSystem (parameter) {
  return axios2({
    url: api.addUserToSystem,
    method: 'post',
    data: parameter
  })
}

/**
 * 修改用户
 * @param parameter
 * @returns {*}
 */
export function modifyUser (parameter) {
  return axios2({
    url: api.modifyUser,
    method: 'put',
    params: parameter
  })
}

/**
 * 批量启用禁用用户
 * @param parameter
 * @returns {*}
 */
export function enableUser (parameter, data) {
  return axios2({
    url: api.enableParam,
    method: 'put',
    params: parameter,
    data: data
  })
}

/**
 * 删除用户
 * @param parameter
 * @returns {*}
 */
export function deleteUser (parameter) {
  return axios2({
    url: api.deleteUser,
    method: 'delete',
    params: parameter
  })
}

/**
 * 批量删除用户
 * @param parameter
 * @returns {*}
 */
export function batchDeleteUser (parameter) {
  return axios2({
    url: api.batchDeleteUser,
    method: 'delete',
    data: parameter
  })
}

/**
 * 查询用户的数量（可用于校验）
 * @param parameter
 * @returns {*}
 */
export function findUserCount (parameter) {
  return axios2({
    url: api.findUserCount,
    method: 'get',
    params: parameter
  })
}

/**
 * 按照传入的用户信息查询返回的用户列表
 * @param parameter
 * @returns {*}
 */
export function findUserByRule (parameter) {
  return axios2({
    url: api.findUsers,
    method: 'get',
    params: parameter
  })
}

/**
 * 按照传入的用户信息分页查询返回的用户列表
 * @param parameter
 * @returns {*}
 */
export function findUserByRuleAndPage (parameter) {
  return axios2({
    url: api.findPageUsers,
    method: 'get',
    params: parameter
  })
}

/**
 * 通过手机号查询系统用户
 * @param {phone}
 * @returns {*}
 */
export function findSystemUserByPhone (parameter) {
  return axios2({
    url: api.findSystemUserByPhone,
    method: 'get',
    params: parameter
  })
}
