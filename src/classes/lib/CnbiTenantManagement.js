// import CnbiStatic from '@/classes/lib/CnbiStatic';
// 租户管理的对应的类
import {
  GET_TENANCY_LIST,
  SAVE_TENANCY,
  DELETE_TENANCY,
  GET_TENANCY,
  UPDATE_TENANCY,
  USER_SIMPLE_INFO_LIST,
  FIND_LICENSE_LIST,
  VALID_SERVICE_SIGN
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

  constructor(obj) {
    Object.assign(this, obj)
    this.init()
  }
  test(data) {
    // console.log(data.data, "11112222");
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
    // debugger
    // var data = await this.getUserSimpleInfoList();
    // debugger
    // this.test(data)
    // this.test(data)
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

    // var tenancyIds = [9]
    // await this.deleteTenancy([34])
    // this.test()
    // var data = await this.findLicenseList()
    // this.test(data)
  }
  /**
   * @desc    : 新增租户的方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {}
   * @return  {}
   * @update   by
   */
  async saveTenancy(tenancyDto) {
    let res = await SAVE_TENANCY(tenancyDto);
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
    // debugger
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
      size: 30
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
    let res = await UPDATE_TENANCY(tenancyEditDto);
    return res
  }

  /**
   * @desc    : 查询牌照列表
   * @author  : zj
   * @date  : 2019/10/21
   * @param   {}
   * @return  {}
   * @update   by
   */
  async findLicenseList() {
    let res = await FIND_LICENSE_LIST();
    return res.data
  }
  /**
   * @desc    : 查询服务标识是否重复
   * @author  : zj
   * @date  : 2019/10/21
   * @param   {}
   * @return  {}
   * @update   by
   */
  async validServiceSign(serviceSign) {
    let res = await VALID_SERVICE_SIGN(serviceSign);
    return res.data
  }
}
export default CnbiTenantManagement