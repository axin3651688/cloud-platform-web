import { axios2 } from '@/utils/request'
import { listToTreeNode } from '../utils/treeUtil'

const api = {
  findAllRole: '/org/base_service/role/find_all',
  saveRole: '/org/base_service/save_role',
  updateRole: '/org/base_service/update_role',
}

/**
 * 保存所有角色
 * @param parameter RoleSaveDto
 * @returns {*}
 */
export function saveRole (parameter) {
  return axios2({
    url: api.saveRole,
    method: 'post',
    params: parameter
  })
}

/**
 * 更新所有角色
 * @param parameter RoleModifyDto
 * @returns {*}
 */
export function updateRole (parameter) {
  return axios2({
    url: api.updateRole,
    method: 'put',
    params: parameter
  })
}

/**
 * 删除所有角色
 * @param parameter roleId
 * @returns {*}
 */
export function deleteRole (parameter) {
  return axios2({
    url: api.deleteRole,
    method: 'delete',
    params: parameter
  })
}

/**
 * 查询所有角色
 * @param parameter
 * @returns {*}
 */
export function findAllRole (parameter) {
  return axios2({
    url: api.findAllRole,
    method: 'get',
    params: parameter
  })
}

/**
 * 得到所有角色并转为前端可以显示的树
 * @returns {Promise<Array>}
 */
export async function getAllRoleTree () {
  const result = await findAllRole()
  if (Array.isArray(result.data)) {
    // 设置角色的pid统一为0
    result.data.forEach(function (ele) {
      ele.pid = 0
      ele.isLeaf = '1'
    })
    return listToTreeNode({ data: result.data, rootPid: 0 })
  }
}
