import { axios2 } from '@/utils/request'
import { listToTreeNode } from '../utils/treeUtil'

const api = {
  findAllResource: '/org/base_service/resource/find_all_resource',
  findResourceByField: '/org/base_service/resource/find_resource_by_field'
}

/**
 * 得到所有资源
 * @returns {*}
 */
export function findAllResource () {
  return axios2({
    url: api.findAllResource,
    method: 'get'
  })
}

/**
 * 根据资源的属性高级精确查询资源
 * @returns {*}
 * @param parameter
 */
export function findResourceByField (parameter) {
  return axios2({
    url: api.findResourceByField,
    method: 'get',
    params: parameter
  })
}

/**
 * 得到所有资源树
 * @returns {Promise<Array>}
 */
export async function getAllResourceTree () {
  const res = await findAllResource()
  return listToTreeNode({ data: res.data, key: 'id', id: 'code', pid: 'pcode' })
}

/**
 * 得到所有菜单树
 * @returns {Promise<Array>}
 */
export async function getAllMenuTree () {
  const res = await findResourceByField({ type: 1 })
  return listToTreeNode({ data: res.data, key: 'id', id: 'code', pid: 'pcode' })
}

/**
 * 得到某菜单的所有动作
 * @returns {Promise<Array>}
 */
export async function getMenuAction (parameter) {
  const res = await findResourceByField({ pCode: parameter.code, type: 3 })
  return res.data
}
