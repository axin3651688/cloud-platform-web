import { axios2 } from '@/utils/request'

const api = {
  saveUserPrimaryDept: '/org/base_service/user_dept/update_user_primary_dept',
  findPrimaryDept: '/org/base_service/user_dept/find_primary_dept_by_user',
  findPrimaryDeptStaff: '/org/base_service/user_dept/find_users_by_primary_dept_and_user_info',
  findDeptByUser: '/org/base_service/user_dept/find_dept_by_user',
  updateUserDept: '/org/base_service/user_dept/update_user_dept',
  updateUserCompanyDept: '/org/base_service/user_dept/update_user_company_dept',
}

/**
 * 保存用户主部门
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
 * 更新用户部门关系
 * @param parameter userId:Long roleId: List<Long>
 * @returns {*}
 */
export function updateUserDept (parameter, data) {
  return axios2({
    url: api.updateUserDept,
    method: 'put',
    params: parameter,
    data: data
  })
}

/**
 * 更新用户某公司的部门关系
 * @param parameter userId:Long roleId: List<Long>
 * @returns {*}
 */
export function updateUserCompanyDept (parameter, data) {
  return axios2({
    url: api.updateUserCompanyDept,
    method: 'put',
    params: parameter,
    data: data
  })
}

/**
 * 根据Id找用户主部门信息
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

/**
 * 获取某用户的所有部门
 * @param parameter
 * @returns {*}
 */
export function findUserDept (parameter) {
  return axios2({
    url: api.findDeptByUser + '/' + parameter.id,
    method: 'get'
  })
}
