// 系统模块调用接口封装(包括控制台，参数管理，服务管理，应用管理，第三方应用4个子模块管理需要的接口)
import {
  axios2
} from '@/utils/request'

const api = {
  // 应用管理相关接口
  GET_RESOURCES_CARD: '/upm/resource/get_resources_card',
  OPEN_RESOURCE: '/upm/resource/open_resource',
  GET_CARD_CONFIG: '/upm/resource/get_card_config',
  BAT_DELETE_APP: '/upm/resource/bat_delete_app',
  SAVE_RESOURCE: '/upm/resource/save',
  UPDATE_RESOURCE: '/upm/resource/update',
  SEARCH_RESOURCES: '/upm/resource/search_resources',
  //第三方的相关接口
  GET_TP_APP: '/upm/tp_app', //分页查询第三方应用
  POST_TP_APP: '/upm/tp_app', //保存第三方应用
  DELETE_TP_APP: '/upm/tp_app', //批量删除第三方应用
  PUT_TP_APP: '/upm/tp_app', //更新第三方应用
  ENABLE_APP: '/upm/tp_app/enable_app' //是否禁用
}
export default api

/** 
 * @desc    : 应用列表
 * @author  : zj
 * @date  : 2019/10/15
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function GET_RESOURCES_CARD() {
  return axios2({
    url: api.GET_RESOURCES_CARD,
    method: 'get'
  })
}

/** 
 * @desc    : 开启关闭资源
 * @author  : zj
 * @date  : 2019/10/15
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
 * @desc    : 查询应用配置
 * @author  : zj
 * @date  : 2019/10/15
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function GET_CARD_CONFIG(parameter) {
  return axios2({
    url: api.GET_CARD_CONFIG,
    method: 'get',
    params: parameter
  })
}

/** 
 * @desc    : 删除应用
 * @author  : zj
 * @date  : 2019/10/15
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function BAT_DELETE_APP(parameter) {
  return axios2({
    url: api.BAT_DELETE_APP,
    method: 'delete',
    data: parameter
  })
}

/** 
 * @desc    : 添加应用
 * @author  : zj
 * @date  : 2019/10/15
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function SAVE_RESOURCE(parameter) {
  return axios2({
    url: api.SAVE_RESOURCE,
    method: 'post',
    data: parameter
  })
}
/** 
 * @desc    : 编辑应用
 * @author  : zj
 * @date  : 2019/10/23
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function UPDATE_RESOURCE(parameter) {
  return axios2({
    url: api.UPDATE_RESOURCE,
    method: 'put',
    data: parameter
  })
}
/** 
 * @desc    : 搜索应用
 * @author  : zj
 * @date  : 2019/10/15
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function SEARCH_RESOURCES(parameter) {
  return axios2({
    url: api.SEARCH_RESOURCES,
    method: 'get',
    params: parameter
  })
}

/** 
 * @desc    : 分页查询第三方应
 * @author  : zj
 * @date  : 2019/10/28
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function GET_TP_APP(parameter) {
  return axios2({
    url: api.GET_TP_APP + '\/' + parameter.page + '\/' + parameter.size,
    method: 'get',
    params: parameter
  })
}
// DELETE_TP_APP: '/upm/tp_app', //
// PUT_TP_APP: '/upm/tp_app' //更新第三方应用

/** 
 * @desc    : 保存第三方应用
 * @author  : zj
 * @date  : 2019/10/28
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function POST_TP_APP(parameter) {
  return axios2({
    url: api.POST_TP_APP,
    method: 'post',
    data: parameter
  })
}

/** 
 * @desc    : 批量删除第三方应用
 * @author  : zj
 * @date  : 2019/10/28
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function DELETE_TP_APP(parameter) {
  return axios2({
    url: api.DELETE_TP_APP,
    method: 'delete',
    data: parameter
  })
}

/** 
 * @desc    : 更新第三方应用
 * @author  : zj
 * @date  : 2019/10/28
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function PUT_TP_APP(parameter) {
  return axios2({
    url: api.PUT_TP_APP,
    method: 'put',
    data: parameter
  })
}

export function ENABLE_APP(parameter) {
  return axios2({
    url: api.ENABLE_APP,
    method: 'put',
    params: parameter
  })
}