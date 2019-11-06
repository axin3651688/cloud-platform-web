<template>
  <div class="box">
    <a-badge count="X" class="icon-cha" @click="del" v-show="!addressState">
      <span href="#" class="head-example" ></span>
    </a-badge>
    <span style="margin-left: 20px;overflow: hidden;text-overflow: ellipsis;">{{ module.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'Module',
  props: ['module', 'addressState'],
  methods: {
    del () {
      this.$emit('del', this.module.id)
    }
  }
}
</script>

<style scoped>
.box{
  margin-top: 12px;
  padding-top: 12px;
  width: 150px;
  height: 30px;
  /*background: aqua;*/
  align-items: center;
  display: flex;
  padding-left: 20px;
  margin-right:16px;
  margin-bottom: 12px;
}
</style>
