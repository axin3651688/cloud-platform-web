// 牌照管理的对应的类
import {
  GET_LICENSE_ID,
  FIND_LICENSE_LIST,
  OPEN_LICENSE,
  SAVE_LICENSE,
  DELETE_LICENSE,
  UPDATE_LICENSE,
  UPDATE_VAIL_LICENSE
} from '@/api/productModule'
/** 
* @desc    : 该类为牌照管理类，为了实现页面代码更加简单清晰而写的，
             其中有增加牌照，删除牌照，编辑牌照，查询牌照等其他操作，
             有租户的属性，在页面代码中只需引用该类，并创建一个牌照
             对象，以对象点的形式去调用需要的属性和方法，也不再需要
             在组件中引用接口等，也便于后期维护......
* @author  : zj
* @date  : 2019/10/14
* @param   {} 
* @return  {} 
* @update   by   
*/
class CnbiLicenseManagement {
  constructor(obj) {
    Object.assign(this, obj)
  }
  // {牌照的属性
  //   "cards": [0],
  //   "dbTypes": [0],
  //   "maxCompany": 0,
  //   "maxConnect": 0,
  //   "maxDesign": 0,
  //   "maxLevel": 0,
  //   "maxMemory": 0,
  //   "maxUser": 0,
  //   "modules": [0],
  //   "name": "string",
  //   "note": "string",
  //   "price": 0,
  //   "type": 0
  // }
  // 牌照数据传输对象 {
  //   cards (Array[integer], optional): 可用的应用集合 ,
  //   dbTypes (Array[integer], optional): 可用的数据源类型 ,
  //   maxCompany (integer, optional): 最大公司数 ,
  //   maxConnect (integer, optional): 最大连接数 ,
  //   maxDesign (integer, optional): 最大设计数 ,
  //   maxLevel (integer, optional): 最大层级 ,
  //   maxMemory (integer, optional): 最大内存 ,
  //   maxUser (integer, optional): 最大用户数 ,
  //   modules (Array[integer], optional): 可用的模块集合 ,
  //   name (string, optional): 名称 ,
  //   note (string, optional): 描述 ,
  //   price (number, optional): 价格 ,
  //   type (integer, optional): 类型
  //   }
  props = ['cards', 'dbTypes', 'maxCompany', 'maxConnect', 'maxDesign', 'maxLevel',
    'maxMemory', 'maxUser', 'modules', 'name', 'note', 'price', 'type'
  ]

}
export default CnbiLicenseManagement