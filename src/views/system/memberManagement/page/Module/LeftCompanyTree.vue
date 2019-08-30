<!--基于leftTree加入通用的公司树图标-->
<template>
  <left-tree
    :tree-data="treeData"
    :checkable="checkable"
    :check-strictly="checkStrictly"
    :checked-keys="checkedKeys"
    :show-menu="showMenu"
    :select-keys="selectKeys"
    :show-line="showLine"
    :show-icon="showIcon"
    ref="leftTree"
    @select="onSelect"
    @check="onCheck"
  >
    <template slot="icon" slot-scope="item">
      <a-icon v-if="item.data.dataRef.level === 1" :component="BookMark"/>
      <a-icon v-else-if="item.data.dataRef.level === 2" :component="BookMark"/>
      <a-icon v-else-if="item.data.dataRef.level === 3" :component="BookMark"/>
      <a-icon v-else-if="item.data.dataRef.level === 4" :component="BookMark"/>
      <a-icon v-else-if="item.data.dataRef.level === 5" :component="BookMark"/>
      <a-icon v-else :component="BookMark"></a-icon>
    </template>
  </left-tree>
</template>

<script>
import BookMark from '@/assets/icons/bookmark.svg?inline'
import LeftTree from './LeftTree'
export default {
  name: 'LeftCompanyTree',
  components: { LeftTree },
  props: {
    // 设置树数据
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 有没有checkbox，默认没有
    checkable: {
      type: Boolean,
      default: false
    },
    // 让父子不关联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 让父节点设置被选中的数据
    checkedKeys: {
      type: Array,
      default: function () {
        return []
      }
    },
    showMenu: {
      type: Boolean,
      default: false
    },
    selectKeys: {
      type: Array,
      default: function () {
        return []
      }
    },
    showLine: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      BookMark
    }
  },
  methods: {
    clearSelectNodes () {
      this.$refs.leftTree.clearSelectNodes()
    },
    onSelect: function (selectedKeys) {
      this.$emit('select', selectedKeys)
    },
    onCheck: function (checkedKeys) {
      this.$emit('check', checkedKeys)
    }
  }
}
</script>

<style scoped>

</style>
