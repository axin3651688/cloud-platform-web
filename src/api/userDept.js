import { axios2 } from '@/utils/request'

const api = {
  saveUserPrimaryDept: '/org/base_service/user_dept/update_user_primary_dept',
  findPrimaryDept: '/org/base_service/user_dept/find_primary_dept_by_user',
  findPrimaryDeptStaff: '/org/base_service/user_dept/find_users_by_primary_dept_and_user_info'
}

/**
 * 保存用户部门
 * @param parameter userId:Long roleId: List<Long>
 * @returns {*}
 */
export function saveUserPrimaryDept (parameter, data) {
  return axios2({
    url: api.saveUserPrimaryDept,
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

/**
 * 获取某公司的人员信息
 * @param parameter
 * @returns {*}
 */
export function getPrimaryDeptPeople (parameter) {
  return axios2({
    url: api.findPrimaryDeptStaff,
    method: 'get',
    params: parameter
  })
}
