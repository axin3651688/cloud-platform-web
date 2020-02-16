<template xmlns="">
  <div class="wrapper">
    <a-row :gutter="16">
      <a-col :md="6" :sm="24">
        <left-tree :treeData="comTreeData" @select="onCompanySelect"></left-tree>
      </a-col>
      <a-col :md="18" :sm="24">
        <a-button @click="add" type="primary" v-action:addDept>添加一级部门</a-button>
        <sectoral-table ref="deptTable" style="background-color: #fff" :comId="selectCom">
          <template slot="dropdown" slot-scope="item">
            <a-menu-item>
              <a href="javascript:;" @click="edit(item.record)" v-action:editDept>编辑</a>
            </a-menu-item>
            <a-menu-item v-action:addDept>
              <a href="javascript:;" @click="addChild(item.record)" v-action:addDept>添加子部门</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="editStructure(item.record)" v-action:editDept>更改级次</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="editSort(item.record)" v-action:editDept>更改排序</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="delDepart(item.record)" v-action:delDept>删除</a>
            </a-menu-item>
          </template>
        </sectoral-table>
      </a-col>
    </a-row>
    <sectoral-add-modal ref="sectoralAddModal" @onBack="back"></sectoral-add-modal>
    <sectoral-structure-modal ref="sectoralStructureModal" @onBack="back"></sectoral-structure-modal>
    <sectoral-sort-modal ref="sectoralSortModal" @onBack="back"></sectoral-sort-modal>
  </div>
</template>

<script>
import { getAllCompanyTree } from '@/api/company'
import { deleteDept } from '@/api/dept'
import LeftTree from '../../memberManagement/page/Module/LeftTree'
import SectoralTable from './Module/SectoralTable'
import SectoralAddModal from './Module/SectoralAddModal'
import SectoralStructureModal from './Module/SectoralStructureModal'
import SectoralSortModal from './Module/SectoralSortModal'
import typeUtil from '@/utils/typeUtils'
import { minxinModal } from '@/utils/mixin.js'
export default {
  name: 'SectoralInformation',
  components: { SectoralSortModal, SectoralStructureModal, SectoralAddModal, SectoralTable, LeftTree },
  created () {
    this.reloadCompany()
  },
  data () {
    return {
      // 公司树数据
      comTreeData: [],
      // 选择的公司
      selectCom: ''
    }
  },
  mixins: [minxinModal],
  methods: {
    /**
     * 公司选择时间
     * @param selectKeys
     */
    onCompanySelect: function (selectKeys) {
      this.selectCom = selectKeys[0]
    },
    /**
     * 重新加载公司
     */
    reloadCompany: function () {
      const _this = this
      getAllCompanyTree().then(function (treeData) {
        _this.comTreeData = treeData
      })
    },
    /**
     * 添加部门事件
     */
    add: function () {
      if (!typeUtil.isNotBlank(this.selectCom)) {
        this.$message.warn('请先选择公司')
        return
      }
      this.$refs.sectoralAddModal.onAdd(this.selectCom)
    },
    /**
     * 添加子部门
     * @param record
     */
    addChild: function (record) {
      this.$refs.sectoralAddModal.onAdd(this.selectCom, record.id)
    },
    /**
     * 编辑部门
     * @param record
     */
    edit: function (record) {
      this.$refs.sectoralAddModal.onEdit(record)
    },
    /**
     * 编辑结构
     * @param record
     */
    editStructure: function (record) {
      this.$refs.sectoralStructureModal.onEdit(record)
    },
    /**
     * 编辑排序
     * @param record
     */
    editSort: function (record) {
      this.$refs.sectoralSortModal.onEdit(record)
    },
    /**
     * 删除部门
     * @param record
     * @return {Promise<void>}
     */
    delDepart: async function (record) {
      const _this = this
      this.confirm({
        title: '确认删除' + record.text + '部门吗',
        content: '如果有下属部门，下属部门也会一并删除',
        onOk: async function () {
          const res = await deleteDept({ id: record.id })
          if (res.code === 200) {
            _this.$message.success('删除成功')
          } else {
            _this.$message.error('删除失败')
          }
          this.back()
        }
      })
    },
    /**
     * 退回
     */
    back: function () {
      this.$refs.deptTable.loadData()
    }
  }
}
</script>

<style scoped>

</style>
