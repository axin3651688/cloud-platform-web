import { axios2 } from '@/utils/request'

const api = {
  saveUserRole: '/org/base_service/user_role/save_user_role',
  updateUserRole: '/org/base_service/user_role//update_user_role',
  findUserRole: '/org/base_service/user_role//find_user_role'
}

/**
 * 保存用户
 * @param parameter userId:Long roleId: List<Long>
 * @returns {*}
 */
export function saveUserRole (parameter, data) {
  return axios2({
    url: api.saveUserRole,
    method: 'post',
    params: parameter,
    data: data
  })
}

/**
 * 更新用户角色
 * @param parameter userId:Long roleId: List<Long>
 * @returns {*}
 */
export function updateUserRole (parameter, roleId) {
  return axios2({
    url: api.updateUserRole,
    method: 'put',
    params: parameter,
    data: roleId
  })
}

/**
 * 根据Id找用户角色信息
 * @param parameter
 * @param data
 * @returns {*}
 */
export function findUserRole (parameter) {
  return axios2({
    url: api.findUserRole + '/' + parameter.userId,
    method: 'get'
  })
}
