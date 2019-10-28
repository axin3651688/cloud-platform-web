// 设置模块调用接口封装(包括账号管理，角色管理，权限管理(在模块管理中共用)，数据字典4个模块需要的接口)
import {
  axios2
} from '@/utils/request'

const api = {
  //角色管理的相关接口
  FIND_ROLE_LIST: '/upm/role/find_list',
  OPEN_ROLE: '/upm/role/open',
  UPDATE_ROLE: '/upm/role/update',
  SAVE_ROLE: '/upm/role/save',
  DELETE_ROLE: '/upm/role/bat_delete',
  LISTRESOURCE: '/upm/authority/listResource',
  AUTHORITY_ROLE: '/upm/authority/authority_role'
}
export default api

/** 
 * @desc    : 查询角色列表
 * @author  : zj
 * @date  : 2019/10/24
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function FIND_ROLE_LIST() {
  return axios2({
    url: api.FIND_ROLE_LIST,
    method: 'get'
  })
}

/** 
 * @desc    : 启用禁用角色
 * @author  : zj
 * @date  : 2019/10/24
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function OPEN_ROLE(parameter) {
  return axios2({
    url: api.OPEN_ROLE,
    method: 'put',
    params: parameter
  })
}

/** 
 * @desc    : 编辑角色
 * @author  : zj
 * @date  : 2019/10/24
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function UPDATE_ROLE(parameter) {
  return axios2({
    url: api.UPDATE_ROLE,
    method: 'put',
    data: parameter
  })
}

/** 
 * @desc    : 添加角色
 * @author  : zj
 * @date  : 2019/10/24
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function SAVE_ROLE(parameter) {
  return axios2({
    url: api.SAVE_ROLE,
    method: 'post',
    data: parameter
  })
}

/** 
 * @desc    : 删除角色
 * @author  : zj
 * @date  : 2019/10/24
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function DELETE_ROLE(parameter) {
  return axios2({
    url: api.DELETE_ROLE,
    method: 'delete',
    data: parameter
  })
}

/** 
 * @desc    : 通过角色id获取资源列表
 * @author  : zj
 * @date  : 2019/10/24
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function LISTRESOURCE(parameter) {
  return axios2({
    url: api.LISTRESOURCE,
    method: 'get',
    params: parameter
  })
}

/** 
 * @desc    : 角色授权
 * @author  : zj
 * @date  : 2019/10/25
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function AUTHORITY_ROLE(parameter) {
  return axios2({
    url: api.AUTHORITY_ROLE,
    method: 'put',
    params: parameter
  })
}