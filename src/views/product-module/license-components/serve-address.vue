<!--牌照管理-服务地址-->
<template>
  <div style="display: flex;flex-direction: row;margin: 10px 10px" v-show="flag">
    <div style="display:flex;width: 226px;height: 48px;border: 1px solid #E8E8E8;align-items: center">
      <img
        style="width: 24px;height: 24px;border-radius:50%;margin: 0 16px;"
        :src="src"
      />
      <div style="display:flex;align-items:center;width: 125px;height: 46px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
        {{ name }}
      </div>
      <div v-if="!addressState">
        <a-button style="width: 45px;height: 45px;background-color: #E8E8E8" @click="btnClick()">
          <img src="../../../assets/icons/lajitong.svg"/>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServeAddress',
  props: ['src', 'name', 'addressState'],
  data () {
    return {
      flag: true
    }
  },
  methods: {
    btnClick () {
      this.flag = false
    }
  }
}
</script>

<style scoped>

</style>
