// 牌照管理的对应的类
import {
  GET_LICENSE_ID,
  FIND_LICENSE_LIST,
  OPEN_LICENSE,
  SAVE_LICENSE,
  DELETE_LICENSE,
  UPDATE_LICENSE,
  UPDATE_VAIL_LICENSE,
  GET_RESOURCES_CARD,
  GET_RESOURCES_MODULE
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

  // props = ['cards', 'dbTypes', 'maxCompany', 'maxConnect', 'maxDesign', 'maxLevel',
  //   'maxMemory', 'maxUser', 'modules', 'name', 'note', 'price', 'type'
  // ]

  /**
   * @desc    : 初始化的方法
   * @author  : zj
   * @date  : 2019/10/15
   * @param   {}
   * @return  {}
   * @update   by
   */
  init() {}
  /**
   * @desc    : 获取参数
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {}
   * @return  {}
   * @update   by
   */
  getParams() {
    let params = {}
    this.props.forEach(param => {
      params[param] = this[param]
    })
    return params
  }
  /**
   * @desc    : 查询牌照
   * @author  : zj
   * @date  : 2019/10/15
   * @param   {}
   * @return  {}
   * @update   by
   */
  async getLicenseId(id) {
    let res = await GET_LICENSE_ID({
      licenseId: id
    });
    return res.data
  }
  /**
   * @desc    : 查询牌照列表
   * @author  : zj
   * @date  : 2019/10/15
   * @param   {}
   * @return  {}
   * @update   by
   */
  async findLicenseList() {
    // debugger
    let res = await FIND_LICENSE_LIST();
    return res.data
  }
  /**
   * @desc    : 开启关闭牌照
   * @author  : zj
   * @date  : 2019/10/15
   * @param   {}
   * @return  {}
   * @update   by
   */
  async openLicense(enable, licenseId) {
    let res = await OPEN_LICENSE({
      enable: enable,
      licenseId: licenseId
    })
    debugger
    return res.data
  }
  /**
   * @desc    : 添加牌照
   * @author  : zj
   * @date  : 2019/10/15
   * @param   {}
   * @return  {}
   * @update   by
   */
  async saveLicense(licenseDto) {
    let res = await SAVE_LICENSE(licenseDto);
    return res
  }
  /**
   * @desc    : 删除牌照
   * @author  : zj
   * @date  : 2019/10/15
   * @param   {}
   * @return  {}
   * @update   by
   */
  async deleteLicense(licenseIds) {
    let res = await DELETE_LICENSE(licenseIds);
    // debugger
    return res
  }
  /**
   * @desc    : 编辑牌照
   * @author  : zj
   * @date  : 2019/10/15
   * @param   {}
   * @return  {}
   * @update   by
   */
  async updateLicense(licenseEditDto) {
    let res = await UPDATE_LICENSE(licenseEditDto);
    // debugger
    return res
  }
  /**
   * @desc    : 编辑牌照权限
   * @author  : zj
   * @date  : 2019/10/15
   * @param   {}
   * @return  {}
   * @update   by
   */
  async updateVailLicense(updateLicenseDto) {
    let res = await UPDATE_VAIL_LICENSE(updateLicenseDto);
    // debugger
    return res
  }
  /**
   * @desc    : 查询应用列表
   * @author  : zj
   * @date  : 2019/10/22
   * @param   {}
   * @return  {}
   * @update   by
   */
  async getResourcesCard() {
    let res = await GET_RESOURCES_CARD();
    return res.data
  }
  /**
   * @desc    : 查询模块列表
   * @author  : zj
   * @date  : 2019/10/22
   * @param   {}
   * @return  {}
   * @update   by
   */
  async getResourcesModule() {
    let res = await GET_RESOURCES_MODULE();
    return res.data
  }
}
export default CnbiLicenseManagement