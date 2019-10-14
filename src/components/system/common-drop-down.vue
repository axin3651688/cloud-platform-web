<!--下拉框-->
<template>
  <div>
    <a-dropdown :trigger="['click']">
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item :key="item" v-for="item in result">{{ item }}</a-menu-item>
      </a-menu>
      <a-button style="display: flex;justify-content: space-between;width: auto;min-width: 220px;">
        {{ name }} <img src="../../assets/icons/paixu.svg" >
      </a-button>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: 'CommonDropDown',
  props: {
    name: { type: String, default: '' },
    result: { type: Array, default: null },
    methodsName: { type: String, default: '' }
  },
  methods: {
    handleMenuClick (val) {
      const methodsName = this.methodsName
      console.log(methodsName)
      this.$emit(methodsName, val)
    }
  }
}

</script>

<style scoped>

</style>
