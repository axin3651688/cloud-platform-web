import { axios2 } from '@/utils/request'

const api = {
  findAllRole: '/org/base_service/role/find_all'
}

/**
 * 保存用户
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
