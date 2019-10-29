<!-- <h1>工程中共用的搜索模板组件</h1> -->
<template>
  <div class="commonSearch">
    <a-input-search :placeholder="placeholder"
                    @search="onSearch" />
  </div>
</template>
<script>
export default {
  name: 'CommonSearch',
  data () {
    return {
      options1: []
    }
  },
  props: {
    placeholder: String
  },
  methods: {
    onSearch (value) {
      console.log(value)
      this.$emit('inputHandler', value);
    },
  }
}
</script>
<style scoped>
.commonSearch {
  padding-left: 32px;
  float: left;
  padding-bottom: 15px;
}
</style>