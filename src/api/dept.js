import { axios2 } from '@/utils/request'
import { listToTreeNode } from '../utils/treeUtil'

const api = {
  saveDept: '/org/base_service/dept/save_dept',
  updateDept: '/org/base_service/dept/update_dept_by_field',
  deleteDept: '/org/base_service/dept/delete_dept',
  findDeptByField: '/org/base_service/dept/find_dept_by_field',
  updateDeptStructure: '/org/base_service/dept/update_dept_structure'
}

/**
 * 保存部门
 * @param parameter
 * @returns {*}
 */
export function saveDept (parameter) {
  return axios2({
    url: api.saveDept,
    method: 'post',
    params: parameter
  })
}

/**
 * 更新部门
 * @param parameter
 * @returns {*}
 */
export function updateDept (parameter) {
  return axios2({
    url: api.updateDept,
    method: 'put',
    params: parameter
  })
}

/**
 * 更新部门
 * @param parameter
 * @returns {*}
 */
export function updateDeptStructure (parameter) {
  return axios2({
    url: api.updateDeptStructure,
    method: 'put',
    params: parameter
  })
}

/**
 * 删除部门
 * @param parameter
 * @returns {*}
 */
export function deleteDept (parameter) {
  return axios2({
    url: api.deleteDept + '/' + parameter.id,
    method: 'delete'
  })
}

/**
 * 查找部门通过字段
 * @param parameter
 * @returns {*}
 */
export function findDeptByFiled (parameter) {
  return axios2({
    url: api.findDeptByField,
    method: 'get',
    params: parameter
  })
}

/**
 * 查找部门树通过公司Id
 * @param parameter
 * @returns {*}
 */
export async function getDeptTreeByComId (parameter) {
  const result = await findDeptByFiled(parameter)
  return listToTreeNode({ data: result.data, rootPid: parameter.comId })
}
