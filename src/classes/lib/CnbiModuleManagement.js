// 模块管理的对应的类
import {
  GET_RESOURCES_TREE,
  SAVE_RESOURCE,
  DELETE_RESOURCE,
  OPEN_RESOURCE,
  UPDATE_RESOURCE
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
  // 资源数据传输对象 {
  //   iconId (integer, optional): 图标 ,
  //   id (integer, optional): 主键 ,
  //   name (string, optional): 名称 ,
  //   note (string, optional): 描述 ,
  //   pid (string, optional): 父编码 ,
  //   route (string, optional): 路由 ,
  //   serviceId (string, optional): 服务标识 ,
  //   type (integer, optional): 类型 0：目录，1：菜单，2：功能 3：卡片 ,
  //   url (string, optional): 路由
  //   }
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
  init() {

  }


}
export default CnbiModuleManagement