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
  AUTHORITY_ROLE: '/upm/authority/authority_role',
  VALID_ROLE_NAME: '/upm/role/valid_role_name/',
  FIND_ROLE_INFO_BY_ID: '/upm/role/find_id',

  //账号管理的相关接口--*********相关的js在角色管理中*************
  ENABLE_ACCOUNT: '/upm/authorize/enable_account',
  SAVE_ACCOUNT: '/upm/authorize/batch',
  DELETE_ACCOUNT: '/upm/authorize/delete_account',
  ACCOUNT_PAGE: '/upm/authorize/account_page',
  UPDATE_ACCOUNT: '/upm/authorize/update_account'

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

/**
 * @desc    : 校验角色名称
 * @author  : zj
 * @date  : 2019/10/24
 * @param   {}
 * @return  {}
 * @update   by
 */
export function VALID_ROLE_NAME(parameter) {
  return axios2({
    url: api.VALID_ROLE_NAME + parameter.roleName,
    method: 'get'
  })
}

/** 
 * @desc    : 根据角色id查询角色信息
 * @author  : zj
 * @date  : 2019/11/05
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function FIND_ROLE_INFO_BY_ID(parameter) {
  return axios2({
    url: api.FIND_ROLE_INFO_BY_ID,
    method: 'get',
    params: parameter
  })
}

/** 
 * @desc    : 启用禁用账号
 * @author  : zj
 * @date  : 2019/10/30
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function ENABLE_ACCOUNT(parameter) {
  return axios2({
    url: api.ENABLE_ACCOUNT,
    method: 'put',
    params: parameter
  })
}

/** 
 * @desc    : 分页查询SUPER角色的账户列表
 * @author  : zj
 * @date  : 2019/10/30
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function ACCOUNT_PAGE(parameter) {
  return axios2({
    url: api.ACCOUNT_PAGE + '\/' + parameter.page + '\/' + parameter.size,
    method: 'get',
    params: parameter
  })
}

/** 
 * @desc    : 删除账号
 * @author  : zj
 * @date  : 2019/10/30
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function DELETE_ACCOUNT(parameter) {
  return axios2({
    url: api.DELETE_ACCOUNT,
    method: 'delete',
    data: parameter
  })
}

/** 
 * @desc    : 保存账户
 * @author  : zj
 * @date  : 2019/10/30
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function SAVE_ACCOUNT(parameter) {
  return axios2({
    url: api.SAVE_ACCOUNT,
    method: 'post',
    data: parameter
  })
}

/** 
 * @desc    : 修改账号拥有的角色
 * @author  : zj
 * @date  : 2019/10/30
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function UPDATE_ACCOUNT(parameter) {
  return axios2({
    url: api.UPDATE_ACCOUNT,
    method: 'put',
    data: parameter
  })
}