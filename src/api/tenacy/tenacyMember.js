import { axios2 } from '@/utils/request'

const api = {
  save: '/tc/tenancy_member/save'
}

/**
 * 租户人员保存
 * @param parameter
 * @returns {*}
 */
export function saveTenancyMember (parameter) {
  return axios2({
    url: api.save,
    method: 'post',
    data: parameter
  })
}