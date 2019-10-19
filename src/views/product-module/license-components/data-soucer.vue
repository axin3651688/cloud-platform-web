<!--牌照管理-可用数据源-->
<template>
  <div class="box" style="margin: 10px 30px" v-show="flag">
    <img
      style="width: 64px;height: 64px;"
      :src="src"/>
    <a-badge count="X" class="icon-cha" v-if="!dataSourceState" @click="aclick()">
      <span href="#" class="head-example" ></span>
    </a-badge>
  </div>
</template>

<script>
export default {
  name: 'DataSoucer',
  props: ['src', 'dataSourceState'],
  data () {
    return {
      flag: true
    }
  },
  methods: {
    aclick () {
      console.log('11111111111111111')
      this.flag = false
    }
  }
}
</script>

<style scoped>
  .box{
    position: relative;
  }
  .icon-cha{
  position:absolute;
  left:60px;
  top:0;
  cursor: pointer;
  }
</style>
