// 用户管理的对应的类
import {
  USER_SIMPLE_INFO_LIST,
  ENABLE_USER,
  FIND_USER_DETAIL_INFO,
  ADMIN_SAVE,
  ADMIN_UPDATE
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
  async getUserSimpleInfoList(otherParams) {
    let params = {
      page: 1,
      size: 3000
    }
    if (otherParams) params = Object.assign(params, otherParams)
    let res = await USER_SIMPLE_INFO_LIST(params)
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
  async enableUser(userId, enable) {
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
  async findUserDetailInfo(id) {
    let res = await FIND_USER_DETAIL_INFO({
      userId: id
    })
    return res
  }

  /**
   * @desc    : 管理员添加用户
   * @author  : zj
   * @date  : 2019/10/29
   * @param   {}
   * @return  {}
   * @update   by
   */
  async adminSave(userDto) {
    let res = await ADMIN_SAVE(userDto)
    return res
  }
  /**
   * @desc    : 管理员添加用户
   * @author  : zj
   * @date  : 2019/10/29
   * @param   {}
   * @return  {}
   * @update   by
   */
  async adminUpdate(parameter) {
    let res = await ADMIN_UPDATE(parameter)
    return res
  }

}
export default CnbiUserManagement