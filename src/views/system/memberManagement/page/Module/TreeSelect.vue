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
    treeData: {
      default: []
    },
    value: {
      default: undefined
    },
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
