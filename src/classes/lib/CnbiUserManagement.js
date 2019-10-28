// 用户管理的对应的类
import {
  USER_SIMPLE_INFO_LIST,
  ENABLE_USER,
  FIND_USER_DETAIL_INFO
} from '@/api/productModule'
class CnbiUserManagement {
  constructor(obj) {
    Object.assign(this, obj)
    this.init()
  }
  async init() {}


  /** 
   * @desc    : 分页获取所有的拥有者
   * @author  : zj
   * @date  : 2019/10/18
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getUserSimpleInfoList() {
    let res = await USER_SIMPLE_INFO_LIST({
      page: 1,
      size: 15
    })
    debugger
    return res.data.data
  }

  /** 
   * @desc    : 启用禁用用户
   * @author  : zj
   * @date  : 2019/10/28
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async ENABLE_USER(userId, enable) {
    let res = await ENABLE_USER({
      userId: userId,
      enable: enable
    })
    return res
  }

  /** 
   * @desc    : 查看用户详情
   * @author  : zj
   * @date  : 2019/10/28
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async FIND_USER_DETAIL_INFO(id) {
    let res = await FIND_USER_DETAIL_INFO({
      userId: id
    })
    return res
  }
}
export default CnbiUserManagement