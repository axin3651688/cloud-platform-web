// 系统模块调用接口封装(包括控制台，参数管理，服务管理，应用管理，第三方应用4个子模块管理需要的接口)
import {
  axios2
} from '@/utils/request'

const api = {
  // 应用管理相关接口
  GET_RESOURCES_CARD: '/upm/resource/get_resources_card',
  OPEN_RESOURCE: '/upm/resource/open_resource',
  GET_CARD_CONFIG: '/upm/resource/get_card_config',
  DELETE_RESOURCE: '/upm/resource/delete',
  SAVE_RESOURCE: '/upm/resource/save',
  SEARCH_RESOURCES_CARD: '/upm/resource/search_resources_card'
}
export default api

/** 
 * @desc    : 通过父资源查询所有子资源(应用列表)
 * @author  : zj
 * @date  : 2019/10/15
 * @param   {} 
 * @return  {} 
 * @update   by   
 */
export function GET_RESOURCES_CARD(parameter) {
  return axios2({
    url: api.GET_RESOURCES_CARD,
    method: 'get',
    params: parameter
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
export function DELETE_RESOURCE(parameter) {
  return axios2({
    url: api.DELETE_RESOURCE,
    method: 'delete',
    params: parameter
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
    params: parameter
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
export function SEARCH_RESOURCES_CARD() {
  return axios2({
    url: api.SEARCH_RESOURCES_CARD,
    method: 'get',
    params: parameter
  })
}