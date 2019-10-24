// 设置模块调用接口封装(包括账号管理，角色管理，权限管理，数据字典4个模块需要的接口)
import {
  axios2
} from '@/utils/request'

const api = {
  //角色管理的相关接口
  FIND_ROLE_LIST: '/upm/role/find_list',
  OPEN_ROLE: '/upm/role/open',
  UPDATE_ROLE: '/upm/role/update',
  SAVE_ROLE: '/upm/role/save',
  DELETE_ROLE: '/upm/role/delete',
  LISTRESOURCE: '/upm/authority/listResource',

  //权限管理的相关接口（除了查询接口不一致，其余用模块的接口）
  GET_RESOURCES_TREE:'/upm/resource/get_resources_tree'
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
export function UPDATE_ROLE() {
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
export function SAVE_ROLE() {
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
    params: parameter
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
* @desc    : 查询权限列表
* @author  : zj
* @date  : 2019/10/24
* @param   {} 
* @return  {} 
* @update   by   
*/
export function GET_RESOURCES_TREE(){
  return axios2({
    url: api.GET_RESOURCES_TREE,
    method: 'get'
  })
}