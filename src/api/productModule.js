// 系统模块调用接口封装(包括牌照，租户，模块，用户4个子模块管理需要的接口)
import {
  axios2
} from '@/utils/request'


const api = {
  //租户管理相关接口（初始化的相关接口暂时没有）
  GET_TENANCY_LIST: '/tc/tenancy/get_tenancy_list',
  SAVE_TENANCY: '/tc/tenancy/save', //(此处命名与接口不同，由于接口就一个save，避免冲突，自行定义该接口名称 by:zj)
  DELETE_TENANCY: '/tc/tenancy/delete', //(同上)
  GET_TENANCY: '/tc/tenancy/get_tenancy_detail', //（同上）
  UPDATE_TENANCY: '/tc/tenancy/update_tenancy_info',
  USER_SIMPLE_INFO_LIST: '/uc/user/user_simple_info_list/',
  //牌照管理相关接口
  GET_LICENSE_ID: '/upm/license/get_license_id',
  FIND_LICENSE_LIST: '/upm/license/find_list',
  OPEN_LICENSE: '/upm/license/open_license',
  SAVE_LICENSE: '/upm/license/save',
  DELETE_LICENSE: '/upm/license/bat_delete',
  UPDATE_LICENSE: '/upm/license/update',
  UPDATE_VAIL_LICENSE: '/upm/license_authority/update_vail_license',
  //模块管理相关接口
  GET_RESOURCES_TREE: '/upm/resource/get_resources_tree',
  SAVE_RESOURCE: '/upm/resource/save',
  DELETE_RESOURCE: '/upm/resource/delete',
  OPEN_RESOURCE: '/upm/resource/open_resource',
  UPDATE_RESOURCE: '/upm/resource/update'
}

export default api

/** 
 * @desc    : 查询所有租户列表(至少需要传入分页查询的两个参数：page  size)
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {*} 
 * @update   by   
 */
export function GET_TENANCY_LIST(parameter) {
  return axios2({
    url: api.GET_TENANCY_LIST,
    method: 'post',
    data: parameter
  })
}

/** 
 * @desc    : 保存租户
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {*} 
 * @update   by   
 */
export function SAVE_TENANCY(parameter) {
  return axios2({
    url: api.SAVE_TENANCY,
    method: 'post',
    data: parameter
  })
}
/** 
 * @desc    : 删除租户
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {*} 
 * @update   by   
 */
export function DELETE_TENANCY(parameter) {
  debugger
  return axios2({
    url: api.DELETE_TENANCY,
    method: 'delete',
    data: parameter
  })
}
/** 
 * @desc    : 根据传入的租户id，查询该租户的详细信息
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function GET_TENANCY(parameter) {
  return axios2({
    url: api.GET_TENANCY,
    method: 'get',
    params: parameter
  })
}

/** 
 * @desc    : 编辑租户基本信息
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function UPDATE_TENANCY(parameter) {
  return axios2({
    url: api.UPDATE_TENANCY,
    method: 'put',
    data: parameter
  })
}

/** 
 * @desc    : 分页查询所有的拥有者
 * @author  : zj
 * @date  : 2019/10/18
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function USER_SIMPLE_INFO_LIST(parameter) {
  return axios2({
    url: api.USER_SIMPLE_INFO_LIST + parameter.page + '\/' + parameter.size,
    method: 'get',
    params: parameter
  })
}
/** 
 * @desc    : 根据牌照id查询牌照信息
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function GET_LICENSE_ID(parameter) {
  return axios2({
    url: api.GET_LICENSE_ID,
    method: 'get',
    params: parameter
  })
}

/** 
 * @desc    : 查询牌照列表
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function FIND_LICENSE_LIST() {
  return axios2({
    url: api.FIND_LICENSE_LIST,
    method: 'get'
  })
}

/** 
 * @desc    : 开启关闭牌照
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function OPEN_LICENSE(parameter) {
  return axios2({
    url: api.OPEN_LICENSE,
    method: 'put',
    params: parameter
  })
}

/** 
 * @desc    : 添加牌照
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function SAVE_LICENSE(parameter) {
  return axios2({
    url: api.SAVE_LICENSE,
    method: 'post',
    data: parameter
  })
}

/** 
 * @desc    : 删除牌照
 * @author  : zj
 * @date  : 2019/10/15
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function DELETE_LICENSE(parameter) {
  return axios2({
    url: api.DELETE_LICENSE,
    method: 'delete',
    data: parameter
  })
}

/** 
 * @desc    : 编辑牌照
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function UPDATE_LICENSE(parameter) {
  return axios2({
    url: api.UPDATE_LICENSE,
    method: 'put',
    params: parameter
  })
}

/** 
 * @desc    : 编辑牌照权限
 * @author  : zj
 * @date  : 2019/10/14
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function UPDATE_VAIL_LICENSE(parameter) {
  return axios2({
    url: api.UPDATE_VAIL_LICENSE,
    method: 'post',
    data: parameter
  })
}
/** 
 * @desc    : 获取权限列表（模块管理的）
 * @author  : zj
 * @date  : 2019/10/18
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function GET_RESOURCES_TREE(parameter) {
  return axios2({
    url: api.GET_RESOURCES_TREE,
    method: 'get',
    params: parameter
  })
}
/** 
 * @desc    : 添加权限（模块管理的）
 * @author  : zj
 * @date  : 2019/10/18
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function SAVE_RESOURCE() {
  return axios2({
    url: api.SAVE_RESOURCE,
    method: 'post',
    data: parameter
  })
}
/** 
 * @desc    : 删除权限（模块管理的）
 * @author  : zj
 * @date  : 2019/10/18
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function DELETE_RESOURCE(parameter) {
  return axios2({
    url: api.DELETE_RESOURCE,
    method: 'delete',
    params: parameter
  })
}
/** 
 * @desc    : 启用禁用权限(模块管理的)
 * @author  : zj
 * @date  : 2019/10/18
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function OPEN_RESOURCE(parameter) {
  return axios2({
    url: api.OPEN_RESOURCE,
    method: 'put',
    params: parameter
  })
}
/** 
 * @desc    : 编辑权限（模块管理的）
 * @author  : zj
 * @date  : 2019/10/18
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function UPDATE_RESOURCE() {
  return axios2({
    url: api.UPDATE_RESOURCE,
    method: 'put',
    params: parameter
  })
}