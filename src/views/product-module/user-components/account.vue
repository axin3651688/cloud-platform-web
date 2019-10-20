<template>
  <div class="account" style="border-radius: 4px;">
    <div style="display: flex;flex-direction: row;padding-left: 32px;align-items: center;">
      <div style="margin: 10px;border-radius: 50%;background-color: white">
        <img
          style="width: 24px;height: 24px;border-radius: 50%"
          :src="src"
        />
        <!--src="../../../assets/icons/qq.svg"-->
      </div>
      <div style="">
        <span style="margin-right: 5px;">{{ name }}:</span><span>{{ number }}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Account',
  props: ['name', 'number'],
  data () {
    return {
      src: ''
    }
  },
  mounted () {
    this.getUrl(this.name)
  },
  methods: {
    getUrl (val) {
      if (val) {
        switch (val) {
          case 'QQ': {
            this.src = require('../../../assets/icons/qq.svg')
            break
          }
          case '微信': {
            this.src = require('../../../assets/icons/weixin.svg')
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.account:hover {
  background-color: #1461D2;
}

</style>
