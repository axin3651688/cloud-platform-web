import CnbiStatic from '@/classes/lib/CnbiStatic';
// 租户管理的对应的类
import {
  GET_TENANCY_LIST,
  SAVE_TENANCY,
  DELETE_TENANCY,
  GET_TENANCY,
  UPDATE_TENANCY
} from '@/api/productModule'

/** 
* @desc    : 该类为租户管理类，为了实现页面代码更加简单清晰而写的，
             其中有增加租户，删除租户，编辑租户，查询租户等其他操作，
             有租户的属性，在页面代码中只需引用该类，并创建一个租户
             对象，以对象点的形式去调用需要的属性和方法，也不再需要
             在组件中引用接口等，也便于后期维护......
* @author  : zj
* @date  : 2019/10/14
* @param   {} 
* @return  {} 
* @update   by   
*/
class CnbiTenantManagement {
  // 租户传输对象 {
  //   address (string, optional): 地址 ,
  //   beginTime (integer, optional): 牌照生效时间 ,
  //   checkInfo (string, optional): 审核详情 ,
  //   checkTime (integer, optional): 审核通过时间 ,
  //   checkerId (integer, optional): 审核人 ,
  //   creatorId (integer, optional): 创建人 ,
  //   domain (string, optional): 域名 ,
  //   endTime (integer, optional): 牌照到期时间 ,
  //   licenseId (integer, optional): 牌照 ,
  //   logoId (integer, optional): logo图片 ,
  //   name (string, optional): 名称 ,
  //   note (string, optional): 简介 ,
  //   ownerId (integer, optional): 管理员 ,
  //   phone (string, optional): 联系电话 ,
  //   serviceId (string, optional): 服务标识 ,
  //   societyCode (string, optional): 社会编码 ,
  //   tel (string, optional): 电话 ,
  //   type (string, optional): 租户类型 ,
  //   url (string, optional): 网址
  //   } 
  constructor(obj) {
    Object.assign(this, obj)
    this.init()
  }
  test() {
    console.log(this, "1111111111111");
  }

  // getProps() {
  //   return ['address', 'beginTime', 'checkInfo', 'checkTime',
  //     'checkerId', 'creatorId', 'domain', 'endTime',
  //     'licenseId', 'logoId', 'name', 'note', 'ownerId',
  //     'phone', 'serviceId', 'societyCode', 'tel', 'type', 'url'
  //   ];
  // }

  /** 
   * @desc    : 租户页面的初始化方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  init() {
    this.getTenancyList()
    this.tenancyList = []
    this.test()
  }
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
    CnbiStatic.CnbiTenantManagementGetProps().forEach(param => {
      params[param] = this[param]
    })
    return params
  }
  /** 
   * @desc    : 新增租户的方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  // static async getPortalSource (params) {
  //   const result = await FIND_PORTAL_SOURCE_BY_ID({
  //     sourceId: params.id,
  //     sourceType: params.type
  //   });
  //   return result;
  // }
  async saveTenancy() {
    let params = getParams()
    let res = await SAVE_TENANCY(params);
    return res
  }
  /** 
   * @desc    : 删除租户的方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async deleteTenancy() {
    let params = getParams()
    let res = await DELETE_TENANCY(params);
    return res
  }
  /** 
   * @desc    : 获取租户列表的方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getTenancyList() {
    let res = await GET_TENANCY_LIST({
      page: 1,
      size: 10
    });
    // this.tenancyList = res.data.data
    return res.data.data
  }
  /** 
   * @desc    : 根据传入的租户id，查询该租户的详细信息
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getTenancy() {
    let params = getParams()
    let res = await GET_TENANCY(params);
    return res
  }
  /** 
   * @desc    : 编辑租户基本信息
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async updateTenancy() {
    let params = getParams()
    let res = await UPDATE_TENANCY(params);
    return res
  }
}
export default CnbiTenantManagement