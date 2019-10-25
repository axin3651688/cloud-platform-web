// 模块管理的对应的类
import {
  GET_RESOURCES_MODULE,
  SAVE_RESOURCE,
  DELETE_RESOURCE,
  OPEN_RESOURCE,
  UPDATE_RESOURCE,
  SEARCH_RESOURCES,
  GET_RESOURCES_TREE,
  GET_RESOURCES_MENU
} from '@/api/productModule'

/** 
* @desc    : 该类为模块管理类，为了实现页面代码更加简单清晰而写的，
             其中有获取权限列表，添加权限，删除权限，启用禁用权限等其他操作，
             有对应属性，在页面代码中只需引用该类，并创建一个模块
             对象，以对象点的形式去调用需要的属性和方法，也不再需要
             在组件中引用接口等，也便于后期维护......
* @author  : zj
* @date  : 2019/10/18
* @param   {} 
* @return  {} 
* @update   by   
*/
class CnbiModuleManagement {
  constructor(obj) {
    Object.assign(this, obj)
    this.init()
  }
  /** 
   * @desc    : 初始化的方法/并测试接口的地方
   * @author  : zj
   * @date  : 2019/10/18
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  init() {}


  /** 
   * @desc    : 查询模块的列表
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getResourcesModule() {
    let res = await GET_RESOURCES_MODULE();
    return res.data
  }

  /** 
   * @desc    : 查询菜单列表
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getResourcesMenu() {
    let res = await GET_RESOURCES_MENU();
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
   * @desc    : 删除应用
   * @author  : zj
   * @date  : 2019/10/23
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async deleteResource(ids, type) {
    debugger
    let res = await DELETE_RESOURCE({
      ids: ids,
      type: type
    });
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
   * @date  : 2019/10/25
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

  /** 
   * @desc    : 获取权限管理的列表
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getResourcesTree() {
    let res = await GET_RESOURCES_TREE();
    return res.data
  }
}
export default CnbiModuleManagement