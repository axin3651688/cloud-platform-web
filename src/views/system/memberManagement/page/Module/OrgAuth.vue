<template>
  <div class="wrapper">
    <a-row :gutter="16">
      <a-col :md="7" :sm="24">
        <left-company-tree
          class="custom"
          ref="comTree"
          :tree-data="comTreeData"
          :checkable="true"
          :checkStrictly="true"
          @select="onSelectCompany"
          :checkedKeys="checkComKeys"
          @check="onComCheck"
          :show-icon="true"
          :tool="true"
        >
        </left-company-tree>
      </a-col>
      <a-col class="dept-tree" :md="7" :sm="24">
        <left-tree
          class="custom"
          ref="deptTree"
          :tree-data="deptTreeData"
          :checkable="true"
          :checkStrictly="true"
          :checked-keys="checkDeptKeys"
          @check="onDeptCheck"></left-tree>
      </a-col>
      <a-col class="right-panel" :md="10" :sm="24">
        <a-card class="org-card">
          <a-row>
            <a-col :md="24" :sm="24" class="panel-nav">
              <span class="panel-title">授权公司</span>
              <span class="choose-number">已选{{ checkComItem.length }}个公司</span>
            </a-col>
            <a-col :md="24" :sm="24" class="org-panel">
              <a-row>
                <a-col
                  :xxl="6"
                  :xl="12"
                  :md="12"
                  :sm="12"
                  v-for="item in checkComItem"
                  :key="item.key">
                  <a-row>
                    <a-col :md="14" :sm="14">
                      <span class="org-text">{{ item.text }}</span>
                    </a-col>
                    <a-col :md="10" :sm="10">
                      <a-icon class="org-icon" :component="DelBlack" @click="onCancelCheck(1, item.key)" />
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="org-card">
          <a-row>
            <a-col :md="24" :sm="24" class="panel-nav">
              <span class="panel-title">选中公司授权部门</span>
              <span class="choose-number">已选{{ checkDeptItem.length }}个部门</span>
            </a-col>
            <a-col :md="24" :sm="24" :xs="12" class="org-panel">
              <a-row>
                <a-col
                  :xxl="6"
                  :xl="12"
                  :md="12"
                  :sm="12"
                  v-for="item in checkDeptItem"
                  :key="item.key">
                  <a-row>
                    <a-col :md="14" :sm="14">
                      <span class="org-text">{{ item.text }}</span>
                    </a-col>
                    <a-col :md="10" :sm="10">
                      <a-icon class="org-icon" :component="DelBlack" @click="onCancelCheck(2, item.key)" />
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <div class="auth-btn-group">
      <a-button class="auth-btn" type="primary" @click="onSubmit">授权</a-button>
      <a-button class="back-btn" @click="onBack">返回</a-button>
    </div>
  </div>
</template>
<script>
import LeftTree from './LeftTree'
import { getAllCompany, getCompanyDept } from '@/api/company'
import { findCompanyByUser, findPrimaryCompany, updateUserCompany } from '@/api/userCompany'
import { findPrimaryDept, findUserDept, updateUserCompanyDept } from '@/api/userDept'
import { listToTreeNode } from '@/utils/treeUtil'
import ACol from 'ant-design-vue/es/grid/Col'
import avril from '@/utils/avrcollectionUtil'
import LeftCompanyTree from './LeftCompanyTree'
import DelBlack from '@/assets/icons/del-black.svg?inline'

export default {
  name: 'OrgAuth',
  components: { LeftCompanyTree, ACol, LeftTree },
  data () {
    return {
      // 当前选择的用户Id
      currentSelectUserId: undefined,
      // 当前用户主公司Id
      currentUserPrimaryCompanyId: undefined,
      // 当前用户主部门Id
      currentUserPrimaryDepartId: undefined,
      // 公司树
      comTreeData: [],
      // 公司数据，部门树的List集合
      comData: [],
      // 部门树
      deptTreeData: [],
      // 部门数据，部门树的List集合
      deptData: [],
      // 选择的公司
      selectCompany: undefined,
      // 选择的部门
      selectDept: undefined,
      // 公司选中的key
      checkComKeys: [],
      // 部门被选中的key
      checkDeptKeys: [],
      // 为右面板数据准备的公司Item
      checkComItem: [],
      checkDeptItem: [],
      // 部门和公司的Map，现在是键为公司Id，值为公司名称的对象
      companyMap: {},
      deptMap: {},
      DelBlack
    }
  },
  watch: {
    checkComKeys: function (newVal) {
      this.getComItem()
    },
    checkDeptKeys: function (newVal) {
      this.getDeptItem()
    }
  },
  methods: {
    /**
     * 选择公司树节点事件，会去读取相应的部门数据
     * @param selectKeys
     * @returns {Promise<void>}
     */
    onSelectCompany (selectKeys) {
      this.selectCompany = selectKeys[0]
      // 读取该公司的部门数据渲染
      this.initDept(this.selectCompany)
    },
    /**
     * 公司节点选中事件
     * @param checkedKeys
     */
    onComCheck (checkedKeys) {
      this.checkComKeys = checkedKeys.checked
    },
    /**
     * 部门节点选中事件
     * @param checkedKeys
     */
    onDeptCheck (checkedKeys) {
      this.checkDeptKeys = checkedKeys.checked
    },
    onCancelCheck (type, key) {
      if (type === 1) {
        // 获取主公司，主公司不能取消
        if (key === this.currentUserPrimaryCompanyId) {
          this.$message.warn('主公司不能取消')
        } else {
          this.checkComKeys = this.checkComKeys.filter(function (ele) {
            if (ele === key) {
              return false
            }
            return true
          })
        }
      }
      if (type === 2) {
        // 获取主部门，主部门不能取消
        if (key === this.currentUserPrimaryDepartId) {
          this.$message.warn('主部门不能取消')
        } else {
          this.checkDeptKeys = this.checkDeptKeys.filter(function (ele) {
            if (ele === key) {
              return false
            }
            return true
          })
        }
      }
    },
    /**
     * 读取某公司部门数据，放到data中（选中公司的时候调用了）
     * @param comId 公司Id
     * @returns {*}
     */
    initDept (comId) {
      const _this = this
      _this.ajaxDeptData(comId).then(function (deptData) {

        _this.initDeptMap(deptData)
        _this.deptTreeData = listToTreeNode({ data: deptData, rootPid: comId })

        //
        _this.disablePrimaryDept()
        // 选中用户拥有权限的部门
        _this.checkUserDept()
      })
    },
    ajaxDeptData(comId) {
      const _this = this
      return new Promise(function (resolve, reject) {
        getCompanyDept({ comId: comId }).then(function (res) {
          if(Array.isArray(res.data)) {
            _this.deptData = res.data
          } else {
            _this.deptData = []
          }
          resolve(_this.deptData)
        })
      })
    },
    /**
     * 从后台读取，选择用户的部门授权情况，选中授权的节点
     * @returns {Promise<void>}
     */
    async checkUserDept () {
      const _this = this
      findUserDept({ id: this.currentSelectUserId }).then(function (res) {
        if (Array.isArray(res.data) && res.data.length >= 0) {
          // 需要渲染的部门节点
          const renderDeptIds = res.data.map(function (ele) {
            return ele.id
          })
          // 当前选中公司的部门的Id列表
          const deptTreeIds = _this.deptData.map(function (ele) {
            return ele.id
          })
          // 只选中当前选择公司的部门，求出差集
          _this.checkDeptKeys = avril.getIntersectionArr(deptTreeIds, renderDeptIds)
        }
      })
    },
    /**
     * 提交
     * @returns {Promise<void>}
     */
    async onSubmit () {
      // 这里有两种情况
      // 1. 没有选择公司，点保存，只保存公司
      // 2. 选择了公司点保存，先保存公司，再保存部门
      // 3. 公司被选中，但没有勾选，那么提示先勾选公司权限
      const _this = this
      if (_this.currentSelectUserId !== undefined) {
        await updateUserCompany({ userId: _this.currentSelectUserId }, _this.checkComKeys)
        if (_this.selectCompany !== undefined) {
          if (_this.checkComKeys.indexOf(_this.selectCompany) < 0) {
            _this.$message.warn('保存部门权限需要先选中该公司权限')
            return
          }
          await updateUserCompanyDept({ userId: _this.currentSelectUserId, comId: _this.selectCompany }, _this.checkDeptKeys)
        }
      }
      this.$message.success('更新成功')
    },
    /**
     * 返回按钮事件，清除数据
     */
    onBack () {
      this.$refs.comTree.clearSelectNodes()
      this.$refs.deptTree.clearSelectNodes()
      this.deptTreeData = []
      this.checkDeptItem = []
      this.$emit('back')
    },
    disablePrimaryDept () {
      const _this = this
      findPrimaryDept({ id: _this.currentSelectUserId }).then(function (result) {
        if (result && result.data && result.data.id) {
          _this.currentUserPrimaryDepartId = result.data.id
          _this.setNodeDisable(_this.deptTreeData, result.data.id)
        }
      })
    },

    initDeptMap: function (data) {
      this.setMap(this.deptMap, data)
    },

    getComItem () {
      this.checkComItem = this.getItem(this.checkComKeys, this.companyMap)
    },
    getDeptItem () {
      this.checkDeptItem = this.getItem(this.checkDeptKeys, this.deptMap)
    },
    getItem (checkKeys, map) {
      if (Array.isArray(checkKeys)) {
        return checkKeys.map(function (ele) {
          return {
            key: ele,
            text: map[ele]
          }
        })
      } else {
        return []
      }
    },
    /**
     * 编辑授权
     * @param userId  需要授权的用户Id
     */
    onAuth (userId) {
      const _this = this

      // 设置用户Id
      this.setCurUserId(userId)

      // 初始化公司数据
      this.initComData()

    },
    initComData() {
      const _this = this
      //  获取公司数据，设置到comData中，并异步返回
      this.ajaxComData().then(function (comData) {

        // 将公司数据转换为Map进行保存
        _this.initCompanyMap(comData)

        // 将公司数据转换为树形数据
        _this.comTreeData = listToTreeNode({ data: comData })

        // 设置主公司不允许不选中
        _this.ajaxSetTreetPrimaryCompanyDisable()
        // 设置用户有权限的公司为选中状态
        _this.checkUserPremitCompany()

      })
    },
    /**
     * 设置当前用户Id
     * @param userId  设置当前用户Id
     */
    setCurUserId (userId) {
      this.currentSelectUserId = userId
    },
    initCompanyMap: function (data) {
      this.setMap(this.companyMap, data)
    },
    /**
     * 获取公司数据，设置到comData中，并异步返回
     * @param userId  设置当前用户Id
     */
    ajaxComData () {
      const _this = this
      return new Promise(function (resolve, reject) {
        getAllCompany().then(function (res) {
          if (Array.isArray(res.data)) {
            _this.comData = res.data
            resolve(_this.comData)
          }
        })
      })
    },
    setMap: function (variable, data) {
      if (Array.isArray(data)) {
        data.map(function (ele) {
          variable[ele.id] = ele.text
        })
      }
    },
    /**
     * 禁掉主公司，防止用户取消自己主公司的权限
     * @param treeData
     */
    ajaxSetTreetPrimaryCompanyDisable () {
      const _this = this
      if(!Array.isArray(_this.comTreeData) || _this.comTreeData.length == 0) {
        console.log("公司树数据为空")
      }
      return new Promise(function (resolve, reject) {
        findPrimaryCompany({ id: _this.currentSelectUserId }).then(function (res) {
          if (res.data && res.data.id) {
            _this.setNodeDisable(_this.comTreeData, res.data.id)
            _this.currentUserPrimaryCompanyId = res.data.id
          }
          resolve()
        })
      })
    },
    /**
     * 递归树数据去设置树某节点为不能为选中状态
     * @param treeData
     * @param disCheckId
     */
    setNodeDisable (treeData, disableId) {
      const _this = this
      treeData.forEach(function (ele) {
        if (ele.key === disableId) {
          ele.disableCheckbox = true
          return
        }
        if (Array.isArray(ele.children)) {
          _this.setNodeDisable(ele.children, disableId)
        }
      })
    },
    /**
     * 从后台读取，选择用户的公司授权情况，选中授权的节点
     * @returns {Promise<void>}
     */
    async checkUserPremitCompany () {
      const _this = this
      findCompanyByUser({ id: this.currentSelectUserId }).then(function (res) {
        if (Array.isArray(res.data)) {
          _this.checkComKeys = res.data.map(function (ele) {
            return ele.id
          })
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
  // 树的选中底色长度缺陷修正
  .custom {
    /deep/ li[role='treeitem'] {
      .ant-tree-node-content-wrapper {
        width: calc(100% - 44px);
      }
    }
  }
  // 右侧标示卡片
  .org-card {
    .panel-nav {
      margin-bottom: 21px;
      .panel-title {
        display: inline-block;
        width: 144px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid rgba(77, 124, 254, 1);
        border-radius: 3px;
      }
      .choose-number {
        display: inline-block;
        margin-left: 8px;
        margin-top: 4px;
        color:rgba(177,179,183,1);
      }
    }
    .org-panel {
      .org-text {
        display: inline-block;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
      }
      .org-icon {
        font-size: 16px;
        margin-top: 4px;
        color: rgba(228, 228, 228, 1);
      }
    }
  }
  // 底部按钮样式
  .auth-btn-group {
    &>button {
      float: right !important;
    }
    .auth-btn {
      margin-left: 40px;
    }
  }
</style>
