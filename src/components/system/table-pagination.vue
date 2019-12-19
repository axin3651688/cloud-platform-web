<!--表格分页器-->

<template>
  <div class="table-pagination" style="margin: 16px;display: flex;flex-direction: row-reverse" >
    <a-pagination
      v-model="current"
      v-if="total>0"
      :defaultPageSize="size"
      :hideOnSinglePage="hideOnSinglePage"
      :showSizeChanger="showSizeChanger"
      :showQuickJumper="showQuickJumper"
      :pageSizeOptions="pageSizeOptions"
      :total="total"
      @change="onChange"
      :showTotal="showTotal"
      @showSizeChange="showSizeChange" />
  </div>
</template>

<script>
export default {
  /**
   * showQuickJumper 是否可以快速跳转至某页
   * showSizeChanger 是否可以改变 pageSize
   * showTotal 用于显示数据总量和当前数据顺序  Function(total, range)
   * total 数据总数
   * pageSizeOptions 指定每页可以显示多少条 [10,20,50]
   * pageSize(.sync) 每页条数
   * hideOnSinglePage 只有一页时是否隐藏分页器
   * defaultPageSize 默认的每页条数 10
   * defaultCurrent 默认的当前页数 1
   * current(v-model) 当前页数
   **/
  name: 'TablePagination',
  data () {
    return {
      current: 1
    }
  },
  props:
    {
      showQuickJumper: { // 是否可以快速跳转至某页
        type: Boolean,
        default: false
      },
      showSizeChanger: { // 是否可以改变 pageSize
        type: Boolean,
        default: false
      },
      total: { // 数据总数
        type: Number,
        default: 0
      },
      size: { // 每页条数
        type: Number,
        default: 10
      },
      hideOnSinglePage: { // 只有一页时是否隐藏分页器
        type: Boolean,
        default: false
      },
      defaultPageSize: { // 数据总数
        type: Number,
        default: 10
      },
      defaultCurrent: { // 默认的当前页数
        type: Number,
        default: 1
      },
      pageSizeOptions: {
        type: Array,
        default: () => ['10', '20', '30', '50']
      }
    },
  methods: {
    // 页码改变的回调，参数是改变后的页码及每页条数
    onChange (page, pageSize) {
      console.log('页码改变的回调', page, pageSize)
      this.$emit('changePage', page, pageSize)
    },
    // pageSize 变化的回调
    showSizeChange (current, size) {
      console.log('pageSize的回调', current, size)
      this.$emit('changePageSize', current, size)
    },
    showTotal (total) {
      return `共${total}条`
    }
  }

}
</script>

<style scoped>

</style>
