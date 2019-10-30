// 应用管理的对应的类
import {
  GET_RESOURCES_CARD,
  OPEN_RESOURCE,
  GET_CARD_CONFIG,
  BAT_DELETE_APP,
  SAVE_RESOURCE,
  UPDATE_RESOURCE,
  SEARCH_RESOURCES
} from '@/api/systemModule'
/** 
* @desc    : 该类为应用管理类，为了实现页面代码更加简单清晰而写的，
 其中有增加应用，删除应用，编辑应用，查询应用等其他操作，
 在页面代码中只需引用该类，并创建一个应用对象，以对象点的
 形式去调用需要的属性和方法，也不再需要在组件中引用接口等，
 也便于后期维护......
* @author  : zj
* @date  : 2019/10/23
* @param   {} 
* @return  {} 
* @update   by   
*/
class CnbiApplyManagement {
  constructor(obj) {
    Object.assign(this, obj)
  }
  init() {}


  /** 
   * @desc    : 查询应用列表
   * @author  : zj
   * @date  : 2019/10/23
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getResourcesCard() {
    let res = await GET_RESOURCES_CARD();
    return res.data
  }
  /** 
   * @desc    : 开启关闭应用
   * @author  : zj
   * @date  : 2019/10/23
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async openResource(id, enable) {
    let res = await OPEN_RESOURCE({
      id: id,
      enable: enable
    });
    return res
  }

  /** 
   * @desc    : 查询应用配置
   * @author  : zj
   * @date  : 2019/10/23
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getCardConfig() {
    let res = await GET_CARD_CONFIG();
    return res
  }

  /** 
   * @desc    : 删除应用
   * @author  : zj
   * @date  : 2019/10/23
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async batDeleteApp(ids) {
    let res = await BAT_DELETE_APP(ids);
    return res
  }

  /** 
   * @desc    : 添加应用
   * @author  : zj
   * @date  : 2019/10/23
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async saveResource(resourceDto) {
    let res = await SAVE_RESOURCE(resourceDto);
    return res
  }

  /** 
   * @desc    : 编辑应用
   * @author  : zj
   * @date  : 2019/10/23
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async updateResource(resourceDto) {
    let res = await UPDATE_RESOURCE(resourceDto);
    return res
  }

  /** 
   * @desc    : 搜索应用
   * @author  : zj
   * @date  : 2019/10/23
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async searchResources(field, value, type) {
    let res = await SEARCH_RESOURCES({
      field: field,
      value: value,
      type: type
    })
    return res.data
  }

}
export default CnbiApplyManagement