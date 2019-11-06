<!--下拉框-->
<template>
  <div>
    <a-select
      @change="selectCell"
      style="width: 100%;box-shadow:0px 1px 3px rgba(0,0,0,0.04);opacity:1;color: #9EA0A5;"
      :defaultValue="defaultValue"
    >
      <template slot="suffixIcon">
        <img src="@icons/sort.svg" />
      </template>
      <a-select-option
        :value="item.key"
        v-for="item in result"
        :key="item.key">{{ item.name }}</a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: 'CommonDropDown',
  props: {
    defaultValue: { type: String, default: '' },
    result: { type: Array, default: null }
  },
  methods: {
    selectCell (val) {
      this.$emit('selectCell', val)
    }
  }
}

</script>

<style scoped>
</style>
