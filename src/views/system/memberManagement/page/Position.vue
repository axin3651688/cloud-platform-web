<template>
  <div class="wrapper">
    <div class="btn-features clearfix">
      <a-button class="add-btn" size="large" @click="onAdd" type="primary" v-action:addPosition>
        <a-icon type="usergroup-add" />
        添加职位
      </a-button>
    </div>
    <s-table
      style="background-color: #fff"
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData">
      <span slot="action" slot-scope="text, record">
        <a-dropdown>
          <a class="ant-dropdown-link" href="#"><a-icon type="align-right" /></a>
          <a-menu class="cnbi-drop-down" slot="overlay">
            <slot name="dropdown" :record="record">
              <a-menu-item v-action:editPosition>
                <a href="javascript:;" @click="onEdit(record)">
                  <a-icon :component="editUser" />编辑</a>
              </a-menu-item>
              <a-menu-item v-action:delPosition>
                <a href="javascript:;" @click="onDelete(record)">
                  <a-icon :component="delUser" />删除</a>
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
import { delUser, editUser } from '@/core/icons'
let gthis
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
        title: '序号',
        customRender: function (text, row, index) {
          const current = gthis.$refs.table.localPagination.current
          const pageSize = gthis.$refs.table.localPagination.pageSize
          return (current - 1 < 1 ? 0 : current - 1) * pageSize + index + 1
        }
      },
      {
        title: '职位名称',
        dataIndex: 'text'
      }, {
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
      },
      delUser,
      editUser
    }
  },
  methods: {
    refresh: function (reload = false) {
      this.$refs.table.refresh(reload)
    },
    onAdd: function () {
      this.$refs.postModal.showModal()
    },
    onEdit: function (record) {
      this.$refs.postModal.onEdit(record)
    },
    onDelete: function (record) {
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
  },
  created () {
    gthis = this
  }
}
</script>

<style scoped lang="less">
  .wrapper {
    .add-btn {
      float: right;
      font-size: 14px;
    }
  }
</style>
