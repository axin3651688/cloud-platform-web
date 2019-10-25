// 角色管理的对应的类
import {
  FIND_ROLE_LIST,
  OPEN_ROLE,
  UPDATE_ROLE,
  SAVE_ROLE,
  DELETE_ROLE,
  LISTRESOURCE,
  AUTHORITY_ROLE
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
  async deleteRole(id) {
    let res = await DELETE_ROLE(id);
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
    let res = await LISTRESOURCE(roleId);
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
  async authorityRole(roleId, resources) {
    let res = await AUTHORITY_ROLE({
      roleId: roleId,
      resources: resources
    });
    return res
  }
}
export default CnbiRoleManagement