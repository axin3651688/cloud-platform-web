import { axios2 } from '@/utils/request'

const api = {
  saveUserDept: '/org/base_service/user_dept/update_user_primary_dept',
  findPrimaryDept: '/org/base_service/user_dept/find_primary_dept_by_user'
}

/**
 * 保存用户部门
 * @param parameter userId:Long roleId: List<Long>
 * @returns {*}
 */
export function saveUserDept (parameter, data) {
  return axios2({
    url: api.saveUserDept,
    method: 'put',
    params: parameter
  })
}

/**
 * 根据Id找用户部门信息
 * @param parameter
 * @param data
 * @returns {*}
 */
export function findPrimaryDept (parameter) {
  return axios2({
    url: api.findPrimaryDept + '/' + parameter.id,
    method: 'get'
  })
}
