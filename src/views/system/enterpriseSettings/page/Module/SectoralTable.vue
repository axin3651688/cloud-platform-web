<template>
  <div class="wrapper">
    <a-table :columns="columns" :dataSource="data">
      <span slot="action" slot-scope="text, record">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#"><a-icon type="align-right" /></a>
          <a-menu slot="overlay">
            <slot name="dropdown" :record="record">
              <!--example -->
              <!--<a-menu-item>
                <a href="javascript:;" @click="onUserEdit(record)">编辑</a>
              </a-menu-item>-->
            </slot>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getDeptTreeByComId } from '@/api/dept'
export default {
  name: 'SectoralTable',
  props: {
    comId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      columns: [{
        title: '部门名称',
        dataIndex: 'text',
        key: 'text'
      }, {
        title: '部门描述',
        dataIndex: 'property1',
        key: 'property1'
      }, {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }],
      data: []
    }
  },
  methods: {
    loadData: function () {
      const _this = this
      return getDeptTreeByComId({ comId: this.comId }).then(function (treeData) {
        _this.data = treeData
      })
    }
  },
  watch: {
    comId: function (newVal) {
      this.loadData(newVal)
    }
  }
}
</script>

<style scoped>

</style>
