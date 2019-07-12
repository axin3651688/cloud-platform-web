import { axios2 } from '@/utils/request'

const api = {
  saveUserPrimaryCompany: '/org/base_service/user_company/update_user_primary_company',
  findPrimaryCompany: '/org/base_service/user_company/find_primary_company_by_user',
  findCompanyStaff: '/org/base_service/user_company/find_users_by_primary_company_and_user_info',
  findCompanyByUser: '/org/base_service/user_company/find_companies_by_user/',
  updateUserCompany: '/org/base_service/user_company/update_user_company'
}

/**
 * 保存用户主公司
 * @param parameter userId:Long roleId: List<Long>
 * @returns {*}
 */
export function saveUserPrimaryCompany (parameter, data) {
  return axios2({
    url: api.saveUserPrimaryCompany,
    method: 'put',
    params: parameter
  })
}

/**
 * 保存用户公司关系
 * @param parameter userId:Long roleId: List<Long>
 * @returns {*}
 */
export function updateUserCompany (parameter, data) {
  return axios2({
    url: api.updateUserCompany,
    method: 'put',
    params: parameter,
    data: data
  })
}

/**
 * 根据Id找用户主公司信息
 * @param parameter
 * @param data
 * @returns {*}
 */
export function findPrimaryCompany (parameter) {
  return axios2({
    url: api.findPrimaryCompany + '/' + parameter.id,
    method: 'get'
  })
}

/**
 * 获取某公司的人员信息
 * @param parameter
 * @returns {*}
 */
export function getPrimaryCompanyPeople (parameter) {
  return axios2({
    url: api.findCompanyStaff,
    method: 'get',
    params: parameter
  })
}

/**
 * 根据用户Id去找用户的所有公司
 * @param parameter
 * @returns {*}
 */
export function findCompanyByUser (parameter) {
  return axios2({
    url: api.findCompanyByUser + '/' + parameter.id,
    method: 'get'
  })
}
