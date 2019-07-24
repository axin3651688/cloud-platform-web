import { axios2 } from '@/utils/request'

const api = {
  findAllPlace: '/common/region/find_place',
  findAllIndustry: '/common/industry/find_all',
  findDictByCode: '/common/dict/find_child_code',
  fileUpload: '/zuul/common/file/upload',
  getFile: '/common/file/get_id'
}

/**
 * 找到所有地区
 * @param parameter
 * @returns {*}
 */
export function findAllPlace () {
  return axios2({
    url: api.findAllPlace,
    method: 'get'
  })
}

/**
 * 找到所有的行业树
 * @returns {*}
 */
export function findAllIndustry () {
  return axios2({
    url: api.findAllIndustry,
    method: 'get'
  })
}

/**
 * 根据编码去获取数据字典
 * @param parameter
 * @returns {*}
 */
export function findDictByCode (parameter) {
  return axios2({
    url: api.findDictByCode + '/' + parameter.code,
    method: 'get'
  })
}

/**
 * 上传文件
 * @param parameter
 * @returns {*}
 */
export function uploadFile (data) {
  return axios2({
    url: api.fileUpload,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}

/**
 * 查询文件
 * @param parameter
 * @returns {*}
 */
export function getFile (parameter) {
  return axios2({
    url: api.getFile,
    method: 'get',
    params: parameter
  })
}