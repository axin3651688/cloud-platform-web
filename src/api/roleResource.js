import { axios2 } from '@/utils/request'

const api = {
  'findRoleResource': '/org/base_service/role_resource/find_role_resource',
  'updateRoleResource': '/org/base_service/role_resource/update_role_resource'
}

/**
 * 更新角色的资源（需要传入该角色所有的资源信息）
 * @param parameter
 * @returns {*}
 */
export function updateRoleResource (parameter, data) {
  return axios2({
    url: api.updateRoleResource,
    method: 'put',
    params: parameter,
    data: data
  })
}

/**
 * 查询某角色的资源 (包括菜单资源和动作资源了,点击菜单不用再去查动作资源)
 * @param parameter
 * @returns {*}
 */
export function findRoleResource (parameter) {
  return axios2({
    url: api.findRoleResource + '/' + parameter.roleId,
    method: 'get'
  })
}
