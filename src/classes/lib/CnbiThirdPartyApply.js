// 第三方应用的对应的类
import {
  GET_TP_APP,
  POST_TP_APP,
  DELETE_TP_APP,
  PUT_TP_APP,
  ENABLE_APP
} from '@/api/systemModule'
class CnbiThirdPartyApply {
  constructor(obj) {
    Object.assign(this, obj)
  }
  init() {}

  /** 
   * @desc    : 分页查询第三方应用
   * @author  : zj
   * @date  : 2019/10/28
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getTpApp() {
    let res = await GET_TP_APP({
      page: 1,
      size: 15
    });
    return res.data.data
  }

  /** 
   * @desc    : 保存第三方应用
   * @author  : zj
   * @date  : 2019/10/28
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async postTpApp(appDto) {
    let res = await POST_TP_APP(appDto);
    return res
  }

  /** 
   * @desc    : 批量删除第三方应用
   * @author  : zj
   * @date  : 2019/10/28
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async deleteTpApp(appIds) {
    let res = await DELETE_TP_APP(appIds);
    return res
  }

  /** 
   * @desc    : 更新第三方应用
   * @author  : zj
   * @date  : 2019/10/28
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async putTpApp(appDto) {
    let res = await PUT_TP_APP(appDto);
    return res
  }

  /** 
   * @desc    : 开启关闭
   * @author  : zj
   * @date  : 2019/10/29
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async enableApp(id, enable) {
    let res = await ENABLE_APP({
      id: id,
      enable: enable
    });
    return res
  }
}
export default CnbiThirdPartyApply