<template>
  <div class="wrapper">
    <a-button @click="onPostAdd" type="primary">添加职位</a-button>
    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData">
      <span slot="action" slot-scope="text, record">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#"><a-icon type="align-right" /></a>
          <a-menu slot="overlay">
            <slot name="dropdown" :record="record">
              <a-menu-item>
                <a href="javascript:;" @click="onPostEdit(record)">编辑</a>
                <a href="javascript:;" @click="onPostDelete(record)">删除</a>
              </a-menu-item>
            </slot>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
    <post-modal ref="postModal" @onBack="refresh(false)"></post-modal>
  </div>
</template>

<script>
import { findPostByFiledAndPage, deletePost } from '@/api/post'
import { STable } from '@/components'
import PostModal from './Module/PostModal'
import { minxinModal } from '@/utils/mixin.js'
export default {
  name: 'Position',
  components: {
    PostModal,
    STable
  },
  mixins: [minxinModal],
  data () {
    return {
      columns: [{
        title: '职位名称',
        dataIndex: 'text'
      },{
        title: '职位描述',
        dataIndex: 'desc'
      }, {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }],
      queryParam: {},
      loadData: parameter => {
        return findPostByFiledAndPage(parameter).then(res => {
          return res.data
        })
      }
    }
  },
  methods: {
    refresh: function (reload = false) {
      this.$refs.table.refresh(reload)
    },
    onPostAdd: function () {
      this.$refs.postModal.showModal()
    },
    onPostEdit: function (record) {
      this.$refs.postModal.onEdit(record)
    },
    onPostDelete: function (record) {
      const _this = this
      this.confirm({
        title: '确认删除' + record.text + '吗',
        onOk: function () {
          deletePost({ id: record.id }).then(function (res) {
            if (res.code === 200) {
              _this.$message.success('删除成功')
            } else {
              _this.$message.error('删除失败')
            }
            _this.refresh()
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
