<template>
  <div class="page_content">
    <a-row :gutter="16">
      <div v-show="!isOnOrgAuth">
        <a-col :md="6" :sm="24" >
          <left-company-tree :treeData="comTreeData" @select="onSelectLeftTree" :show-icon="true">
          </left-company-tree>
        </a-col>
        <a-col :md="18" :sm="24" class="page_full">
          <div style="background-color: #fff">
            <!--这里记得清除一下浮动-->
            <div class="top-bar clearfix">
              <div class="top-bar-left">
                <tree-select
                  style="width: 200px"
                  v-if="(!isSingle)"
                  @change="onSelectDept"
                  :value="curSelectDept"
                  :treeData="deptTreeData"
                  :placeholder="'全部部门'">
                </tree-select>
                <span class="table-person-count">共{{ personCount() }}人</span>
                <a-select class="search-name" defaultValue="姓名" style="width: 80px; margin-right: 16px;" @change="handleChange">
                  <a-select-option value="trueName">姓名</a-select-option>
                </a-select>
                <a-input-search
                  class="search-text"
                  placeholder="要搜索的成员姓名"
                  @search="onSearchPerson"
                  enterButton>
                </a-input-search>
              </div>
              <div class="table-btn-group">
                <a-button class="add-custom-type" type="default" size="large" @click="onCustomType">添加自定义类别</a-button>
                <a-button
                  class="add-user"
                  type="primary"
                  style="color: #fff"
                  size="large"
                  @click="onUserAdd"
                  v-action:addUser><a-icon type="user-add" />添加成员</a-button>
              </div>
            </div>
            <user-table
              ref="userTable"
              :company-id="curSelectCom"
              :dept-id="curSelectDept"
              :show-action="true"
              :show-on-start="true"
              @rowSelect="onRowSelect"
              :search="search">
              <template slot="dropdown" slot-scope="item">
                <a-menu-item v-action:editUser>
                  <a href="javascript:;" @click="onUserEdit(item.record)">
                    <a-icon :component="editUser" />编辑
                  </a>
                </a-menu-item>
                <a-menu-item v-action:authUser>
                  <a href="javascript:;" @click="onUserAuth(item.record)">
                    <a-icon :component="authUser" />授权
                  </a>
                </a-menu-item>
                <a-menu-item v-action:disableUser>
                  <a href="javascript:;" @click="onUserDisable(item.record)">
                    <a-icon :component="disableUser" />禁用</a>
                </a-menu-item>
                <a-menu-item v-action:delUser>
                  <a href="javascript:;" @click="onUserDelete(item.record)">
                    <a-icon :component="delUser" />删除
                  </a>
                </a-menu-item>
              </template>
            </user-table>
            <div class="bottom-bar">
              <div class="del-bar">
                <a-icon class="del-info-icon" type="info-circle" size="large" />
                <div class="del-info-text">已选择<span class="del-info-number">{{ selectedRowKeys.length }}</span>人 </div>
                <div class="operator-btn">
                  <a class="del-btn" @click="batchDeleteUser" v-action:delUser>删除</a>
                  <div class="v-line"></div>
                  <a class="export-btn">导出</a>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </div>
    </a-row>
    <org-auth ref="orgAuth" v-show="isOnOrgAuth" @back="onBack"></org-auth>
    <user-modal ref="userModal" @refreshTable="reloadTable"></user-modal>
  </div>
</template>

<script>
import { getAllCompanyTree, getCompanyDeptTree } from '@/api/company'
import { enableUser, deleteUser, batchDeleteUser } from '@/api/user'
import OrgAuth from './Module/OrgAuth'
import UserTable from './Module/UserTable'
import LeftTree from './Module/LeftTree'
import TreeSelect from './Module/TreeSelect'
import UserModal from './Module/UserModal'
import { minxinModal } from '@/utils/mixin.js'
import CustomColumnModal from './Module/CustomColumnModal'
import LeftCompanyTree from './Module/LeftCompanyTree'
import { delUser, editUser, authUser, disableUser } from '@/core/icons'

export default {
  name: 'BusinessMembers',
  components: { LeftCompanyTree, CustomColumnModal, UserModal, TreeSelect, LeftTree, UserTable, OrgAuth },
  mixins: [minxinModal],
  data () {
    return {
      // 公司树数据
      comTreeData: [],
      // 部门树数据
      deptTreeData: [],
      // 被选中的公司Id
      curSelectCom: undefined,
      // 被选中的部门Id
      curSelectDept: undefined,
      // 是否是授权界面
      isOnOrgAuth: false,
      // 表格中被选中的数据
      selectedRowKeys: [],
      // 是否是单体公司
      isSingle: false,
      // 单体公司的Id
      singleComId: undefined,
      // 搜索的内容
      search: {
        key: 'trueName',
        text: undefined
      },
      delUser,
      editUser,
      authUser,
      disableUser
    }
  },
  methods: {
    /**
     * 左边树选择触发事件
     * @param selectedKeys  被选择的树的数组
     * @param e             事件
     */
    onSelectLeftTree (selectedKeys, e) {
      if (this.cancelChoose(selectedKeys)) {
        this.resetSelect()
        return
      }
      const selectKey = selectedKeys[0]
      this.curSelectCom = selectKey
      this.curSelectDept = undefined
      if (!this.isSingle) {
        this.renderDeptTree(this.curSelectCom)
        return
      }
      // 是单体公司选择的是公司
      if (this.singleComId === selectKey) {
        this.$refs.userTable.reloadCom(this.curSelectCom)
      } else {
        this.curSelectCom = this.singleComId
        this.curSelectDept = selectKey
      }
    },
    /**
     * 清空树的选择
     */
    resetSelect: function () {
      this.curSelectCom = undefined
      this.curSelectDept = undefined
      this.deptTreeData = []
    },
    /**
     * 根据选中的key判断是否是取消选中操作
     * @param selectedKeys
     * @returns {boolean}
     */
    cancelChoose: function (selectedKeys) {
      return selectedKeys.length <= 0
    },
    /**
     * 选择部门下拉框的事件
     * @param value
     */
    onSelectDept (value) {
      this.curSelectDept = value
    },
    /**
     * 渲染部门树
     * @param comId
     * @returns {*}
     */
    renderDeptTree (comId) {
      const _this = this
      return getCompanyDeptTree({ comId: comId }).then(function (treeData) {
        _this.deptTreeData = treeData
        return treeData
      })
    },
    /**
     * 点击添加用户，调用用户表单莫泰框
     */
    onUserAdd () {
      this.$refs.userModal.showModal()
    },
    /**
     * 点击编辑用户，调用用户表单莫泰框
     * @param record 当前行数据
     */
    onUserEdit (record) {
      this.$refs.userModal.onEdit(record)
    },
    /**
     * 点击用户授权，打开用户授权界面
     * @param record 当前行数据
     */
    onUserAuth (record) {
      // 表格申请编辑权限
      this.isOnOrgAuth = true
      this.$refs.orgAuth.onAuth(record.id)
    },
    /**
     * 点击用户禁用，直接发送禁用请求
     * @param record 当前行数据
     */
    onUserDisable (record) {
      const _this = this
      this.confirm({
        title: '确认禁用' + record.trueName + '吗',
        onOk: function () {
          enableUser({ enable: '0' }, [record.id]).then(function (res) {
            if (res.data.code !== '0') {
              _this.$message.success('禁用成功')
            } else {
              _this.$message.error('禁用失败')
            }
            _this.reloadTable()
          })
        }
      })
    },
    /**
     * 用户删除事件
     **/
    onUserDelete (record) {
      const _this = this
      this.confirm({
        title: '确认删除' + record.trueName + '吗',
        content: '删除将不可恢复',
        onOk: function () {
          deleteUser({ userId: record.id }).then(function (res) {
            if (res.data.code === 200) {
              _this.$message.success('删除成功')
            } else {
              _this.$message.error('删除失败')
            }
            _this.reloadTable()
          })
        }
      })
    },
    /**
     * 重新加载表格
     */
    reloadTable () {
      this.$refs.userTable.reload()
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 后退事件
    */
    onBack () {
      this.isOnOrgAuth = false
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 批量删除用户
    */
    batchDeleteUser () {
      const _this = this
      if (_this.selectedRowKeys.length === 0) {
        _this.$message.warning('请选择需要删除的用户')
      } else {
        this.confirm({
          title: '确认删除选中的数据吗',
          content: '删除将不可恢复',
          onOk: function () {
            batchDeleteUser(_this.selectedRowKeys).then(function (res) {
              if (res.code === 200) {
                _this.$message.success('删除成功')
              } else {
                _this.$message.error('删除失败')
              }
              _this.reloadTable()
              _this.selectedRowKeys = []
            })
          }
        })
      }
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 行选择
    */
    onRowSelect (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 是否是单体公司
    */
    isSingleCom (treeData) {
      return treeData.length === 1 && treeData[0].children === undefined
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 渲染单体公司
    */
    renderSingleCom: function (treeData) {
      const _this = this
      const com = treeData[0]
      _this.renderDeptTree(com.id).then(function (deptTreeData) {
        com.children = deptTreeData
        _this.comTreeData = treeData
        _this.isSingle = true
        _this.singleComId = com.id
      })
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 渲染多公司
    */
    renderMultiCom: function (treeData) {
      const _this = this
      _this.comTreeData = treeData
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 名字的改变事件
    */
    handleChange (value) {
      this.search.key = value
      console.log(`selected ${value}`)
    },
    /**
     * 统计人数的方法，调用用户表格中分页返回的总数，目前必须卸载方法里，否则先一步找不到userTable
     * @returns {number}
     */
    personCount () {
      return this.$refs.userTable ? this.$refs.userTable.pagination.total : 0
    },
    /**
     * @author FangQiang
     * @date 2020/2/16
     * @Description: 搜索人的事件
    */
    onSearchPerson (value) {
      // 触发搜索事件，向子组件传值
      this.search.text = value
    },
    /**
     * 添加自定义类别
     */
    onCustomType () {
      this.$refs.userTable.showModal()
    }
  },
  // 初始化数据
  created () {
    const _this = this
    getAllCompanyTree().then(function (treeData) {
      if (_this.isSingleCom(treeData)) {
        _this.renderSingleCom(treeData)
      } else {
        _this.renderMultiCom(treeData)
      }
    })
  }
}
</script>
<style lang="less" scoped>
@import url('../../../../components/index');
  .top-bar {
    .top-bar-left {
      float: left;
      .table-person-count {
        margin-left: 6px;
        margin-right: 55px;
        font-size:14px;
        font-weight:400;
        line-height:16px;
        color: rgba(42,43,47,1);
        opacity:0.5;
        vertical-align: bottom;
      }
      .search-text {
        width: 180px;
      }
    }
    .table-btn-group {
      float: right;
      button {
        margin-left: 40px;
        font-size: 14px;
      }
    }
  }

  /*表格上方按钮布局*/
  @media screen and (max-width: 1550px) {
    .add-custom-type {
      display: none;
    }
  }
  @media screen and (max-width: 1300px) {
    .search-name {
      display: none;
    }
    .search-text {
      display: none;
    }
  }

  @media screen and (max-width: 520px) {
    .table-btn-group {
      float: left !important;
      button {
        margin-left: 0px !important;
      }
    }
  }
  /*表格上方按钮布局*/

  /*表格下的工具栏*/
  .bottom-bar {
    width: 100%;
    height: 32px;
    background: @primary-2;
    border:1px solid @primary-6;
    .del-bar {
      height: 100%;
      padding-top: 4px;
      padding-left: 8px;
      .del-info-icon {
        display: inline-block;
        color: @primary-color;
      }
      .del-info-text {
        margin-left: 8px;
        display: inline-block;
        line-height: 20px;
        .del-info-number {
          padding-left: 1px;
          padding-right: 1px;
          font-size: 16px;
          color: @primary-color;
        }
      }
      .operator-btn {
        display: inline-block;
        margin-left: 38px;
        .del-btn {
          display: inline-block;
          color: @highlight-color;
        }
        .v-line {
          display: inline-block;
          position: absolute;
          margin-top: 6px;
          margin-left: 3px;
          height: 12px;
          border: 1px solid @primary-color;
        }
        .export-btn {
          margin-left: 6px;
        }
      }
    }
  }

</style>
