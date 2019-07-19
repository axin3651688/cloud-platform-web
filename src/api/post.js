import { axios2 } from '@/utils/request'

const api = {
  findAllPost: '/org/base_service/post/find_all_post',
  findPostByFiledAndPage: '/org/base_service/post/find_post_by_filed_page',
  savePost: '/org/base_service/post/save_post',
  updatePost: '/org/base_service/post/update_post',
  deletePost: '/org/base_service/post/delete_post'
}

/**
 * 保存职位
 * @param parameter
 * @returns {*}
 */
export function savePost (parameter) {
  return axios2({
    url: api.savePost,
    method: 'post',
    params: parameter
  })
}

/**
 * 更新职位
 * @param parameter
 * @returns {*}
 */
export function updatePost (parameter) {
  return axios2({
    url: api.updatePost,
    method: 'put',
    params: parameter
  })
}

/**
 * 删除职位
 * @param parameter
 * @returns {*}
 */
export function deletePost (parameter) {
  return axios2({
    url: api.deletePost,
    method: 'delete',
    params: parameter
  })
}

/**
 * 发现所有职位
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

/**
 * 发现所有职位根据Filed 和 Page
 * @param parameter
 * @returns {*}
 */
export function findPostByFiledAndPage (parameter) {
  return axios2({
    url: api.findPostByFiledAndPage,
    method: 'get',
    params: parameter
  })
}
