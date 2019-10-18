// import CnbiStatic from '@/classes/lib/CnbiStatic';
// 租户管理的对应的类
import {
  GET_TENANCY_LIST,
  SAVE_TENANCY,
  DELETE_TENANCY,
  GET_TENANCY,
  UPDATE_TENANCY,
  USER_SIMPLE_INFO_LIST
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
  //租户管理的相关属性，多为调用的方法需要传递的参数

  /**
   * 新增租户需要传递的参数   zj 2019/10/18
   */
  tenancyDto = null;
  /**
   * 删除租户需要传递的参数
   */
  tenancyIds = [];
  /**
   * 查询租户详细信息的参数
   */
  id = null;
  /**
   * 编辑租户基本信息的参数
   */
  tenancyEditDto = null;


  // 租户传输对象 {
  //    (string, optional): 地址 ,
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
  // tenancyList = []
  getProps() {
    return ['address', 'beginTime', 'checkInfo', 'checkTime',
      'checkerId', 'creatorId', 'domain', 'endTime',
      'licenseId', 'logoId', 'name', 'note', 'ownerId',
      'phone', 'serviceId', 'societyCode', 'tel', 'type', 'url'
    ];
  }





  constructor(obj) {
    Object.assign(this, obj)
    this.init()
  }
  test(data) {
    // debugger
    console.log(data, "11112222");
  }
  /** 
   * @desc    : 租户页面的初始化方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async init() {
    debugger
    var data = await this.getUserSimpleInfoList();
    debugger
    this.test(data)
    // this.getTenancyList()
    // var id = 7
    // let data = await this.getTenancy(id)
    // var tenancyDto = 
    //   {
    //     address: "87987987998798798",
    //     beginTime: 123123,
    //     checkInfo: "1212",
    //     checkTime: 235612,
    //     checkerId: 212,
    //     creatorId: 312,
    //     domain: "55125",
    //     endTime: 4565465412313,
    //     licenseId: 8,
    //     logoId: 6,
    //     name: "79879879",
    //     note: "87987987",
    //     ownerId: 6,
    //     tel: "4565464554",
    //     serviceId: "4587",
    //     societyCode: "45",
    //     tel: "74564456",
    //     type: "7",
    //     url: "4565465445"
    //   }
    //  await this.saveTenancy(tenancyDto);

    // var tenancyEditDto = {
    //   "address": "999999",
    //   "domain": "999999",
    //   "id": 9,
    //   "industry": "安徽",
    //   "logoId": 1,
    //   "name": "张杰2222",
    //   "note": "中央军",
    //   "teamSize": "100",
    //   "tel": "120",
    //   "url": "120"
    // }
    // await this.updateTenancy(tenancyEditDto);

    // var tenancyIds = [9, 10]

    // await this.deleteTenancy(tenancyIds)
    // this.test()
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
    getProps().forEach(param => {
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
  async saveTenancy(tenancyDto) {
    // tenancyDto = {
    //   "address": "string",
    //   "beginTime": 0,
    //   "checkInfo": "string",
    //   "checkTime": 0,
    //   "checkerId": 0,
    //   "creatorId": 0,
    //   "domain": "string",
    //   "endTime": 0,
    //   "licenseId": 0,
    //   "logoId": 0,
    //   "name": "string",
    //   "note": "string",
    //   "ownerId": 0,
    //   "phone": "string",
    //   "serviceId": "string",
    //   "societyCode": "string",
    //   "tel": "string",
    //   "type": "string",
    //   "url": "string"
    // }
    // let res = await SAVE_TENANCY(tenancyDto);
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
  async deleteTenancy(tenancyIds) {
    let res = await DELETE_TENANCY(tenancyIds);
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
    return res.data.data
  }
  /** 
   * @desc    : 分页获取所有的拥有者
   * @author  : zj
   * @date  : 2019/10/18
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getUserSimpleInfoList() {
    let res = await USER_SIMPLE_INFO_LIST({
      page: 1,
      size: 10
    })
    debugger
    return res.data
  }
  /** 
   * @desc    : 根据传入的租户id，查询该租户的详细信息
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async getTenancy(id) {
    let res = await GET_TENANCY({
      tenancyId: id
    });
    return res.data
  }
  /** 
   * @desc    : 编辑租户基本信息
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async updateTenancy(tenancyEditDto) {
    // tenancyEditDto:{
    //   "address": "string",
    //   "domain": "string",
    //   "id": 0,
    //   "industry": "string",
    //   "logoId": 0,
    //   "name": "string",
    //   "note": "string",
    //   "teamSize": "string",
    //   "tel": "string",
    //   "url": "string"
    // }
    let res = await UPDATE_TENANCY(tenancyEditDto);
    debugger
    return res
  }
}
export default CnbiTenantManagement