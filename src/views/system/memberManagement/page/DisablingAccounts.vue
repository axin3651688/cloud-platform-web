<template>
  <div class="tab_menu">
    <a-row :gutter="16" class="page_full">
      <div class="page_full">
        <a-col :md="6" :sm="24" >
          <left-company-tree :treeData="comTreeData" @select="onSelectLeftTree" :show-icon="true">
          </left-company-tree>
        </a-col>
        <a-col :md="18" :sm="24">
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
            </div>
            <user-table
              ref="userTable"
              :company-id="curSelectCom"
              :dept-id="curSelectDept"
              :show-action="true"
              :show-on-start="true"
              :enableParam="'0'"
              :search="search">
              <template slot="dropdown" slot-scope="item">
                <a-menu-item>
                  <a href="javascript:;" @click="onUserEnable(item.record)">启用</a>
                </a-menu-item>
              </template>
            </user-table>
          </div>
        </a-col>
      </div>
    </a-row>
  </div>
</template>

<script>
import { getAllCompanyTree, getCompanyDeptTree } from '@/api/company'
import UserTable from './Module/UserTable'
import LeftTree from './Module/LeftTree'
import TreeSelect from './Module/TreeSelect'
import { enableUser } from '@/api/user'
import { minxinModal } from '@/utils/mixin.js'
import LeftCompanyTree from './Module/LeftCompanyTree'
export default {
  name: 'DisablingAccounts',
  components: { LeftCompanyTree, TreeSelect, LeftTree, UserTable },
  data () {
    return {
      comTreeData: [],
      curSelectCom: '',
      deptTreeData: [],
      curSelectDept: undefined,
      isSingle: false,
      singleComId: undefined,
      // 搜索的内容
      search: {
        key: 'trueName',
        text: undefined
      }
    }
  },
  mixins: [minxinModal],
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
    onSelectDept (value) {
      this.curSelectDept = value
    },
    renderDeptTree (comId) {
      const _this = this
      return getCompanyDeptTree({ comId: comId }).then(function (treeData) {
        _this.deptTreeData = treeData
        return treeData
      })
    },
    onUserEnable (record) {
      const _this = this
      this.confirm({
        title: '确认启用' + record.trueName + '吗',
        okType: 'info',
        onOk: function () {
          enableUser({ enable: '1' }, [record.id]).then(function (res) {
            if (res.data.code !== '0') {
              _this.$message.success('启用成功')
            } else {
              _this.$message.error('启用失败')
            }
            _this.reloadTable()
          })
        }
      })
    },
    reloadTable () {
      this.$refs.userTable.reload()
    },
    isSingleCom (treeData) {
      return treeData.length === 1 && treeData[0].children === undefined
    },
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
    renderMultiCom: function (treeData) {
      const _this = this
      _this.comTreeData = treeData
    },
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
    onSearchPerson (value) {
      // 触发搜索事件，向子组件传值
      this.search.text = value
    }
  },
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

<style scoped lang="less">
  .top-bar {
    .top-bar-left {
      float: left;
      .table-person-count {
        margin-left: 6px;
        margin-right: 55px;
        font-size:14px;
        font-weight:400;
        line-height:16px;
        color:rgba(42,43,47,1);
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
</style>
