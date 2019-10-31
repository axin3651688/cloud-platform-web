// 控制台的对应的类
import {
  FIND_USER_COUNT,
  FIND_TENANCY_COUNT,
  FIND_TENANCY_EXPIRE_COUNT,
  FIND_DEPLOY_TYPE_COUNT
} from '@/api/systemModule'
class CnbiConsole {
  constructor(obj) {
    Object.assign(this, obj)
  }
  init() {}

  /** 
   * @desc    : 查询用户总数
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async findUserCount() {
    let res = await FIND_USER_COUNT();
    return res.data
  }

  /** 
   * @desc    : 查询租户总数
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async findTenancyCount() {
    let res = await FIND_TENANCY_COUNT();
    return res.data
  }

  /** 
   * @desc    : 查询租户即将到期数
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async findTenancyExpireCount() {
    let res = await FIND_TENANCY_EXPIRE_COUNT();
    return res.data
  }

  /** 
   * @desc    : 查询租户部署情况
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async findDeployTypeCount() {
    let res = await FIND_DEPLOY_TYPE_COUNT();
    return res
  }
}
export default CnbiConsole