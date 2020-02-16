<template>
  <div>
    <div style="display: inline-block; margin-right: 20px" v-for="node in nodes" :key="node.key">
      * {{ node.key }}:{{ node.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyInfoList',
  props: {
    // 公司信息
    nodes: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
