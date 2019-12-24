// FAQ系统调用接口
import {
  axios2
} from '@/utils/request'
const api = {
  // 分类管理页面 FAQ分类
  categoryFindPage: '/faq/category/find_page', // 按分页查数据
  categorySave: '/faq/category/save', // 添加分类
  categoryDelete: '/faq/category/delete', // 按主键删除(参数可以是单复数)
  categoryFindTree: '/faq/category/find_tree', // 按树结构查看所有数据
  categoryUpdate: '/faq/category/update', // 按主键修改

  // FAQ
  coreFindPage: '/faq/core/find_page', // 按分页查数据
  coreUpdate: '/faq/core/update', // 按主键修改
  coreUpdateByfield: '/faq/core/update_by_field', // 按一个字段(主键)更新
  coreDelete: '/faq/core/delete', // 按主键删除(参数可以是单复数
  coreBatchUpdateField: '/faq/core/batch_update_field', // 批量发布FAQ
  coreSave: '/faq/core/save', // 添加FAQ
  coreFindOne: '/faq/core/find_one', // 按主键或条件查单个FAQ

  // FAQ问答
  questionFindPage: '/faq/question/find_page', // 按分页查数据
  questionUpdateByField: '/faq/question/update_by_field', // 按一个字段(主键)更新
  questionDelete: '/faq/question/delete', // // 按主键删除(参数可以是单复数
  questionFindDetailById: '/faq/question/find_detail_by_id', // 根据问题id查看所属FAQ及回复

  // FAQ回复
  replySave: '/faq/reply/save', // 添加FAQ回复
  replyUpdateByFiled: '/faq/reply/update_by_field' // 按一个字段(主键)更新
}
/**
 * 按分页查数据
 * @param page size
 * @returns {*}
 */
export function CATEGORY_FIND_PAGE (page, size, pid) {
  return axios2({
    url: api.categoryFindPage,
    method: 'post',
    data: { page, size, pid }
  })
}
/**
 * 按树结构查看所有数据
 * @param page size
 * @returns {*}
 */
export function CATEGORY_FIND_TREE () {
  return axios2({
    url: api.categoryFindTree,
    method: 'get'
  })
}
/**
 * 添加分类
 * @param keyword 关键词, pid 父级编码 顶级为0, text 名称
 * @returns {*}
 */
export function CATEGORY_SAVE (keyword, pid, text) {
  return axios2({
    url: api.categorySave,
    method: 'post',
    data: { keyword, pid, text }
  })
}
/**
 * 删除分类
 * @param keyword 关键词, pid 父级编码 顶级为0, text 名称
 * @returns {*}
 */
export function CATEGORY_DELETE (ids) {
  return axios2({
    url: api.categoryDelete + '/' + ids,
    method: 'delete'
  })
}
/**
 * 修改分类
 * @param keyword 关键词, pid 父级编码 顶级为0, text 名称
 * @returns {*}
 */
export function CATEGORY_UPDATE (id, keyword, pid, text) {
  return axios2({
    url: api.categoryUpdate,
    method: 'put',
    data: { id, keyword, pid, text }
  })
}

//* **********************************************FAQ******************************************************

/**
 * 按分页查数据
 * @param
 * @returns {*}
 */
export function CORE_FIND_PAGE (params) {
  return axios2({
    url: api.coreFindPage,
    method: 'post',
    data: params
  })
}
/**
 * 按主键修改
 * @param
 * @returns {*}
 */
export function CORE_UPDATE (params) {
  return axios2({
    url: api.coreUpdate,
    method: 'put',
    data: params
  })
}
/**
 * 按一个字段(主键)更新
 * @param
 * @returns {*}
 */
export function CORE_UPDATE_BY_FIELD (params) {
  return axios2({
    url: api.coreUpdateByfield,
    method: 'put',
    data: params
  })
}
/**
 * 按主键删除(参数可以是单复数
 * @param
 * @returns {*}
 */
export function CORE_DELETE (ids) {
  return axios2({
    url: api.coreDelete + '/' + ids,
    method: 'delete'
  })
}
/**
 * 批量发布FAQ
 * @param
 * @returns {*}
 */
export function CORE_BATCH_UPDATE_FIELD (params) {
  return axios2({
    url: api.coreBatchUpdateField,
    method: 'put',
    data: params
  })
}
/**
 * 添加FAQ
 * @param
 * @returns {*}
 */
export function CORE_SAVE (params) {
  return axios2({
    url: api.coreSave,
    method: 'post',
    data: params
  })
}
/**
 * 添加FAQ
 * @param
 * @returns {*}
 */
export function CORE_FIND_ONE (params) {
  return axios2({
    url: api.coreFindOne,
    method: 'get',
    params: params
  })
}
//* **************************************************FAQ问答****************************************************************

/**
 * 按分页查数据
 * @param
 * @returns {*}
 */
export function QUESTION_FIND_PAGE (params) {
  return axios2({
    url: api.questionFindPage,
    method: 'post',
    data: params
  })
}
/**
 * 按一个字段(主键)更新
 * @param
 * @returns {*}
 */
export function QUESTION_UPDATE_BY_FIELD (params) {
  return axios2({
    url: api.questionUpdateByField,
    method: 'put',
    data: params
  })
}
/**
 * 按主键删除(参数可以是单复数
 * @param
 * @returns {*}
 */
export function QUESTION_DELETE (ids) {
  return axios2({
    url: api.questionDelete + '/' + ids,
    method: 'delete'
  })
}

/**
 * 根据问题id查看所属FAQ及回复
 * @param
 * @returns {*}
 */
export function QUESTION_FIND_DETAIL_BY_ID (id) {
  return axios2({
    url: api.questionFindDetailById + '/' + id,
    method: 'get'
  })
}

/**
 * 根据问题id查看所属FAQ及回复
 * @param
 * @returns {*}
 */
export function REPLY_SAVE (params) {
  return axios2({
    url: api.replySave,
    method: 'post',
    data: params
  })
}
/**
 * 按一个字段(主键)更新
 * @param
 * @returns {*}
 */
export function REPLY_UPDATE_BY_FILED (params) {
  return axios2({
    url: api.replyUpdateByFiled,
    method: 'put',
    data: params
  })
}
