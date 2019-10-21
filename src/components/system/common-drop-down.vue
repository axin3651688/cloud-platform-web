<!--下拉框-->
<template>
  <div>
    <a-select @change="selectCell"
              style="width: 100%"
              allowClear>
      <template slot="suffixIcon">
        <img style="width: 12px;"
             src="../../assets/icons/paixu.svg" />
      </template>
      <a-select-option :value="item.key"
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
