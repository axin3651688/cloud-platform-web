// FAQ
import {
  CATEGORY_FIND_PAGE,
  CATEGORY_FIND_TREE,
  CATEGORY_SAVE,
  CATEGORY_DELETE,
  CATEGORY_UPDATE,
  CORE_FIND_PAGE,
  CORE_UPDATE,
  CORE_UPDATE_BY_FIELD,
  CORE_DELETE,
  CORE_BATCH_UPDATE_FIELD,
  CORE_SAVE,
  QUESTION_FIND_PAGE,
  QUESTION_UPDATE_BY_FIELD,
  QUESTION_DELETE
} from '@/api/FAQ'
class CnbiFAQManagement {
  constructor (obj) {
    Object.assign(this, obj)
  }
  init () {}
  /**
   * @desc    : FAQ分类管理列表
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async categoryFindPage (page, size, pid) {
    const res = await CATEGORY_FIND_PAGE(page, size, pid)
    return res
  }
  /**
   * @desc    : 按树结构查看所有数据
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async categoryFindTree () {
    const res = await CATEGORY_FIND_TREE()
    return res
  }
  /**
   * @desc    : 添加分类
   * @author  : shj
   * @date  : 2019/12/16
   * @param   {}
   * @return  {}
   * @update   by
   */
  async categorySave (keyword, pid, text) {
    const res = await CATEGORY_SAVE(keyword, pid, text)
    return res
  }
  /**
   * @desc    : 按主键删除
   * @author  : shj
   * @date  : 2019/12/16
   * @param   {}
   * @return  {}
   * @update   by
   */
  async categoryDelete (ids) {
    const res = await CATEGORY_DELETE(ids)
    return res
  }

  /**
   * @desc    : 按主键修改
   * @author  : shj
   * @date  : 2019/12/16
   * @param   {}
   * @return  {}
   * @update   by
   */
  async categoryUpdate (id, keyword, pid, text) {
    const res = await CATEGORY_UPDATE(id, keyword, pid, text)
    return res
  }
  /**
   * @desc    : FAQ管理列表
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async coreFindPage (params) {
    const res = await CORE_FIND_PAGE(params)
    return res
  }
  /**
   * @desc    : 按主键修改
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async coreUpdate (params) {
    const res = await CORE_UPDATE(params)
    return res
  }
  /**
   * @desc    : 按一个字段(主键)更新
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async coreUpdateByField (params) {
    const res = await CORE_UPDATE_BY_FIELD(params)
    return res
  }
  /**
   * @desc    : 按主键删除(参数可以是单复数
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async coreDelete (ids) {
    const res = await CORE_DELETE(ids)
    return res
  }
  /**
   * @desc    : 批量发布FAQ
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async coreBatchUpdateField (params) {
    const res = await CORE_BATCH_UPDATE_FIELD(params)
    return res
  }
  /**
   * @desc    : 批量发布FAQ
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async coreSave (params) {
    const res = await CORE_SAVE(params)
    return res
  }
  /**
   * @desc    : FAQ问答列表
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async questionFindPage (params) {
    const res = await QUESTION_FIND_PAGE(params)
    return res
  }
  /**
   * @desc    : 按一个字段(主键)更新
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async questionUpdateByField (params) {
    const res = await QUESTION_UPDATE_BY_FIELD(params)
    return res
  }
  /**
   * @desc    : 按主键删除(参数可以是单复数
   * @author  : shj
   * @date  : 2019/12/13
   * @param   {}
   * @return  {}
   * @update   by
   */
  async questionDelete (ids) {
    const res = await QUESTION_DELETE(ids)
    return res
  }
}
export default CnbiFAQManagement
