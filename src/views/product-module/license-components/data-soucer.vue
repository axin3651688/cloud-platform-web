<!--牌照管理-可用数据源-->
<template>
  <div class="box" v-show="flag">
    <div style="margin: 24px 40px 0 0;display: flex;flex-direction: column;align-items: center">
      <img
        v-if="src"
        style="width: 64px;height: 64px;border-radius: 4px;"
        :src="src"/>
      <img
        v-else
        style="width: 64px;height: 64px;border-radius: 4px;"
        src="http://img1.imgtn.bdimg.com/it/u=3591148647,2189733428&fm=26&gp=0.jpg"/>
      <span style="margin: 5px 0">{{ name }}</span>
      <a-badge count="X" class="icon-cha" v-if="!dataSourceState" @click="aclick">
        <span href="#" class="head-example" ></span>
      </a-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataSoucer',
  props: ['src', 'dataSourceState', 'name','value'],
  data () {
    return {
      flag: true
    }
  },
  methods: {
    aclick () {
      console.log('11111111111111111')
      // this.flag = false
      this.$emit('del',this.value)
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
