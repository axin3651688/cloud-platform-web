import { axios2 } from '@/utils/request'
import { listToTreeNode } from '../utils/treeUtil'

const api = {
  findAllCompany: '/org/base_service/company/find_all_company',
  findDeptByCompany: '/org/base_service/dept/find_dept_by_field',
  saveCompany: '/org/base_service/company/save_company',
  updateCompany: '/org/base_service/company/update_company_by_field',
  updateCompanyStructure: '/org/base_service/company/update_company_structure',
  deleteCompany: '/org/base_service/company/delete_company'
}

export default api

/**
 * 保存公司
 * @param parameter
 * @returns {*}
 */
export function saveCompany (parameter) {
  return axios2({
    url: api.saveCompany,
    method: 'post',
    params: parameter
  })
}

/**
 * 更新公司
 * @param parameter
 * @returns {*}
 */
export function updateCompany (parameter) {
  return axios2({
    url: api.updateCompany,
    method: 'put',
    params: parameter
  })
}

/**
 * 更新公司
 * @param parameter
 * @returns {*}
 */
export function updateCompanyStructure (parameter) {
  return axios2({
    url: api.updateCompanyStructure,
    method: 'put',
    params: parameter
  })
}

/**
 * 获取所有公司信息
 * @param parameter
 * @returns {*}
 */
export function getAllCompany (parameter) {
  return axios2({
    url: api.findAllCompany,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取所有公司树信息，并执行回调
 * @param callback
 */
export function getAllCompanyTree () {
  return new Promise(function (resolve, reject) {
    getAllCompany().then(function (res) {
      if (Array.isArray(res.data)) {
        const data = res.data
        const treeData = listToTreeNode({ data })
        resolve(treeData)
      }
      resolve([])
    })
  })
}

/**
 * 获取某公司的部门
 * @param parameter
 */
export function getCompanyDept (parameter) {
  return axios2({
    url: api.findDeptByCompany,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取某公司部门树
 * @param parameter 必须有comId
 * @returns {Promise<any>}
 */
export function getCompanyDeptTree (parameter) {
  return new Promise(function (resolve, reject) {
    getCompanyDept(parameter).then(function (res) {
      if (Array.isArray(res.data)) {
        const data = res.data
        const treeData = listToTreeNode({ data, rootPid: parameter.comId })
        resolve(treeData)
      }
      resolve([])
    })
  })
}

/**
 * 获取某公司的部门
 * @param parameter
 */
export function deleteCompany (parameter) {
  return axios2({
    url: api.deleteCompany + '/' + parameter.id,
    method: 'delete',
  })
}
