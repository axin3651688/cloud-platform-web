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
    onSelectLeftTree (selectedKeys, e) {
      if (selectedKeys.length <= 0) {
        this.curSelectCom = undefined
        this.deptTreeData = []
        this.curSelectDept = undefined
        return
      }
      if (this.isSingle) {
        // 单体公司并且选择的是公司
        if (this.singleComId === selectedKeys[0]) {
          this.curSelectCom = selectedKeys[0]
          this.curSelectDept = undefined
          // 因为公司不变，子组件监听不到，所以这里再查一下
          this.$refs.userTable.reloadCom(this.curSelectCom)
        } else {
          // 单体公司并且选择的是部门
          this.curSelectCom = this.singleComId
          this.curSelectDept = selectedKeys[0]
        }
      } else {
        // 多公司
        this.curSelectCom = selectedKeys[0]
        this.renderDeptTree(this.curSelectCom)
        this.curSelectDept = undefined
      }
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
    // 根据解析后的树数据判断是否是单体公司
    isSingleCom (treeData) {
      if (treeData.length === 1) {
        if (treeData[0].children === undefined) {
          return true
        }
      } else {
        return false
      }
    },
    reloadTable () {
      this.$refs.userTable.reload()
    }
  },
  created () {
    const _this = this
    getAllCompanyTree().then(function (treeData) {
      // 单体
      if (_this.isSingleCom(treeData)) {
        _this.renderDeptTree(treeData[0].id).then(function (deptTreeData) {
          treeData[0].children = deptTreeData
          _this.comTreeData = treeData
          _this.isSingle = true
          _this.singleComId = treeData[0].id
        })
      } else {
        // 多公司
        _this.comTreeData = treeData
      }
    })
  }
}
</script>

<style scoped>

</style>
