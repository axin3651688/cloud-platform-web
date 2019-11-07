// 角色管理的对应的类
import {
  FIND_ROLE_LIST,
  OPEN_ROLE,
  UPDATE_ROLE,
  SAVE_ROLE,
  DELETE_ROLE,
  LISTRESOURCE,
  AUTHORITY_ROLE,
  VALID_ROLE_NAME,
  FIND_ROLE_INFO_BY_ID,

  //以下为账号管理的
  ENABLE_ACCOUNT,
  SAVE_ACCOUNT,
  DELETE_ACCOUNT,
  ACCOUNT_PAGE,
  UPDATE_ACCOUNT
} from '@/api/setModule'
class CnbiRoleManagement {
  constructor(obj) {
    Object.assign(this, obj)
  }
  init() {}

  /**
   * @desc    : 查询角色列表
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {}
   * @return  {}
   * @update   by
   */
  async findRoleList() {
    let res = await FIND_ROLE_LIST();
    return res.data
  }

  /**
   * @desc    : 启用禁用角色
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {}
   * @return  {}
   * @update   by
   */
  async openRole(id, enable) {
    let res = await OPEN_ROLE({
      id: id,
      enable: enable
    });
    return res
  }

  /**
   * @desc    : 编辑角色
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {}
   * @return  {}
   * @update   by
   */
  async updateRole(resourceDto) {
    let res = await UPDATE_ROLE(resourceDto)
    return res
  }

  /**
   * @desc    : 保存角色
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {}
   * @return  {}
   * @update   by
   */
  async saveRole(resourceDto) {
    let res = await SAVE_ROLE(resourceDto);
    return res
  }

  /**
   * @desc    : 删除角色
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {}
   * @return  {}
   * @update   by
   */
  async deleteRole(ids) {
    let res = await DELETE_ROLE(ids);
    return res
  }

  /**
   * @desc    : 通过牌照id获取资源列表
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {}
   * @return  {}
   * @update   by
   */
  async listresource(roleId) {
    let res = await LISTRESOURCE({
      roleId: roleId
    });
    return res
  }

  /**
   * @desc    : 角色授权
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {}
   * @return  {}
   * @update   by
   */
  async authorityRole(roleId, resources) {debugger
    let res = await AUTHORITY_ROLE({
      roleId: roleId,
      resources: resources
    });
    return res
  }


  /**
   * @desc    : 校验角色名称
   * @author  : zj
   * @date  : 2019/10/25
   * @param   {}
   * @return  {}
   * @update   by
   */
  async validRoleName(name) {
    let res = await VALID_ROLE_NAME({
      roleName: name
    });
    return res
  }

  /** 
   * @desc    : 根据角色id查询角色信息
   * @author  : zj
   * @date  : 2019/11/05
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async findRoleInfoById(id) {
    let res = await FIND_ROLE_INFO_BY_ID({
      id: id
    });
    return res.data
  }

  /** 
   * @desc    : 启用禁用账号
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async enableAccount(userId, enable) {
    let res = await ENABLE_ACCOUNT({
      userId: userId,
      enable: enable
    });
    return res
  }

  /** 
   * @desc    : 保存账户
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async saveAccount(authorizeBatchDto) {
    let res = await SAVE_ACCOUNT(authorizeBatchDto);
    return res
  }

  /** 
   * @desc    : 删除账号
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async deleteAccount(userIds) {
    let res = await DELETE_ACCOUNT(userIds);
    return res
  }

  /** 
   * @desc    : 分页查询SUPER角色的账户列表
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async accountPage() {
    let res = await ACCOUNT_PAGE({
      page: 1,
      size: 15
    });
    return res.data.data
  }

  /** 
   * @desc    : 修改账号拥有的角色
   * @author  : zj
   * @date  : 2019/10/30
   * @param   {} 
   * @return  {} 
   * @update   by   
   */
  async updateAccount(authorizeBatchDto) {
    let res = await UPDATE_ACCOUNT(authorizeBatchDto);
    return res
  }
}
export default CnbiRoleManagement