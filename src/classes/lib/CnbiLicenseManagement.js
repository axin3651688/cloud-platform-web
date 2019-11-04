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
  GET_RESOURCES_MODULE,
  DELETE_LICENSE_AUTHORITY,
  BATCH_LICENSE_AUTHORITY
} from '@/api/productModule'
/**
 * @desc    : 该类为牌照管理类，为了实现页面代码更加简单清晰而写的，
 其中有增加牌照，删除牌照，编辑牌照，查询牌照等其他操作，
 有牌照的属性，在页面代码中只需引用该类，并创建一个牌照
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

  /** 
   * @desc    : 删除牌照权限
   * @author  : zj
   * @date  : 2019/11/04
   * @param   {牌照id,应用id} 
   * @return  {} 
   * @update   by   
   */
  async deleteLicenseAuthority(licenseId, resourcesId) {
    let res = await DELETE_LICENSE_AUTHORITY({
      licenseId: licenseId - 0,
      resourcesId: resourcesId - 0
    });
    return res
  }

  /** 
   * @desc    : 添加牌照权限
   * @author  : zj
   * @date  : 2019/11/04
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async batchLicenseAuthority(licenseAuthorityBatchDto) {
    let res = await BATCH_LICENSE_AUTHORITY(licenseAuthorityBatchDto);
    return res
  }
}
export default CnbiLicenseManagement