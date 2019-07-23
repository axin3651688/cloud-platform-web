import { axios2 } from '@/utils/request'

const api = {
  save: '/org/base_service/custom_form/save',
  update: '/org/base_service/custom_form/update_by_field',
  del: '/org/base_service/custom_form/delete',
  queryByField: '/org/base_service/custom_form/find_by_field'
}

export default api

/**
 * 保存自定义字段
 * @param parameter
 * @returns {*}
 */
export function save (parameter) {
  return axios2({
    url: api.save,
    method: 'post',
    params: parameter
  })
}

/**
 * 更新自定义字段
 * @param parameter
 * @returns {*}
 */
export function update (parameter) {
  return axios2({
    url: api.update,
    method: 'put',
    params: parameter
  })
}

/**
 * 删除自定义字段
 * @param parameter
 * @returns {*}
 */
export function del (parameter) {
  return axios2({
    url: api.del + '/' + parameter.id,
    method: 'delete'
  })
}

/**
 * 按字段查询
 * @param parameter
 * @returns {*}
 */
export function queryByField (parameter) {
  return axios2({
    url: api.queryByField,
    method: 'get',
    params: parameter
  })
}