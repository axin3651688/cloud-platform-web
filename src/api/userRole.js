import { axios2 } from '@/utils/request'

const api = {
  saveUserRole: '/org/base_service/user_role/save_user_role',
  saveRoleUser: '/org/base_service/user_role/save_role_user',
  updateUserRole: '/org/base_service/user_role/update_user_role',
  findUserRole: '/org/base_service/user_role/find_user_role',
  findRoleUser: '/org/base_service/user_role/find_user_table',
  deleteRoleUser: '/org/base_service/user_role/delete_role_user'
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
 * 给角色添加用户，会自动屏蔽已经添加过该角色的用户
 * @param parameter
 * @param data
 * @returns {*}
 */
export function saveRoleUser (parameter, data) {
  return axios2({
    url: api.saveRoleUser,
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

/**
 * 根据角色去查询用户
 * @param parameter
 * @returns {*}
 */
export function findRoleUser (parameter) {
  return axios2({
    url: api.findRoleUser,
    method: 'get',
    params: parameter
  })
}

export function deleteUserRole (parameter, data) {
  return axios2({
    url: api.deleteRoleUser,
    method: 'delete',
    params: parameter,
    data: data
  })
}
