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
  }
  props = ['address', 'beginTime', 'checkInfo', 'checkTime',
    'checkerId', 'creatorId', 'domain', 'endTime',
    'licenseId', 'logoId', 'name', 'note', 'ownerId',
    'phone', 'serviceId', 'societyCode', 'tel', 'type', 'url'
  ]
  /** 
   * @desc    : 租户页面的初始化方法
   * @author  : zj
   * @date  : 2019/10/14
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
   * @desc    : 新增租户的方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  saveTenancy() {
    let params = getParams()
    SAVE_TENANCY().then(res => {
      if (res.code === 200 && res.data) {
        this.$message({
          type: 'success',
          message: res.msg
        });
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
    })
  }
  /** 
   * @desc    : 删除租户的方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  deleteTenancy() {
    let params = getParams()
    DELETE_TENANCY.then(res => {
      if (res.code === 200 && res.data) {
        this.$message({
          type: 'success',
          message: res.msg
        });
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
    })
  }

  /** 
   * @desc    : 获取租户列表的方法
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  getTenancyList() {
    let params = getParams()
    GET_TENANCY_LIST.then(res => {
      if (res.code === 200 && res.data) {
        this.$message({
          type: 'success',
          message: res.msg
        });
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
    })
  }
  /** 
   * @desc    : 根据传入的租户id，查询该租户的详细信息
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  getTenancy() {
    let params = getParams()
    GET_TENANCY.then(res => {
      if (res.code === 200 && res.data) {
        this.$message({
          type: 'success',
          message: res.msg
        });
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
    })
  }
  /** 
   * @desc    : 编辑租户基本信息
   * @author  : zj
   * @date  : 2019/10/14
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  updateTenancy() {
    let params = getParams()
    UPDATE_TENANCY.then(res => {
      if (res.code === 200 && res.data) {
        this.$message({
          type: 'success',
          message: res.msg
        });
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
    })
  }
}
export default CnbiTenantManagement