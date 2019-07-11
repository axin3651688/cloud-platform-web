import { axios2 } from '@/utils/request'

const api = {
  findAllPost: '/org/base_service/post/find_all_post'
}

/**
 * 保存用户
 * @param parameter
 * @returns {*}
 */
export function findAllPost (parameter) {
  return axios2({
    url: api.findAllPost,
    method: 'get',
    params: parameter
  })
}
