<template>
  <div class="tab_menu">
    <a-row :gutter="16" class="page_full">
      <div class="page_full">
        <a-col :md="6" :sm="24">
          <left-tree :treeData="comTreeData" @select="onSelectLeftTree"></left-tree>
        </a-col>
        <a-col :md="18" :sm="24">
          <div style="background-color: #fff">
            <div>
              <tree-select
                v-if="(!isSingle)"
                @change="onChangeDept"
                :value="curSelectDept"
                :treeData="deptTreeData"
                :placeholder="'请选择部门'">
              </tree-select>
            </div>
            <user-table
              ref="userTable"
              :company-id="curSelectCom"
              :dept-id="curSelectDept"
              :show-action="true"
              :show-on-start="true"
              :enableParam="'0'">
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
export default {
  name: 'DisablingAccounts',
  components: { TreeSelect, LeftTree, UserTable },
  data () {
    return {
      comTreeData: [],
      curSelectCom: '',
      deptTreeData: [],
      curSelectDept: undefined,
      isSingle: false,
      singleComId: undefined
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
    onChangeDept (value) {
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

<style scoped>

</style>
