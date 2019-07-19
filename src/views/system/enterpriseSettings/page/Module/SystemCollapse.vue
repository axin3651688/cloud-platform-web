<template>
  <div class="wrapper">
    <a-collapse defaultActiveKey="1" :bordered="false">
      <a-collapse-panel key="1">
        <template slot="header">
          {{ title }}
          ({{ subtitle }})
        </template>
        <slot></slot>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  name: 'SystemCollapse',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
