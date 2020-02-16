<template>
  <a-tree-select
    style="width: 300px"
    :treeData="treeData"
    :value="value"
    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
    :placeholder="placeholder"
    allowClear
    @change="onDeptChange">
  </a-tree-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    // 树数据
    treeData: {
      default: []
    },
    // 默认选择
    value: {
      default: undefined
    },
    // 替换符
    placeholder: {
      default: '请选择'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onDeptChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>
