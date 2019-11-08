<template>
  <div style="border-radius: 4px;padding-left: 32px;padding-right: 16px;cursor:pointer;">
    <div class="account" style="display: flex;flex-direction: row;justify-content:space-between;padding: 8px 16px;">
      <div style="display: flex;flex-direction: row;align-items: center;">
        <div style="border-radius: 50%;background-color: white">
          <img
            style="width: 24px;height: 24px;border-radius: 50%"
            :src="src"
          />
        </div>
        <div style="padding-left: 10px;">
          <span style="margin-right: 5px;">
            {{ name }}:
          </span>
          <span>
            {{ number }}
          </span>
        </div>
      </div>
      <div>
        <img src="@icons/bind.svg"/>
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
            this.src = require('@icons/qq.svg')
            break
          }
          case '微信': {
            this.src = require('@icons/weixin.svg')
            break
          }
          case '新浪微博': {
            this.src = require('@icons/sina.svg')
            break
          }
          case '淘宝': {
            this.src = require('@icons/taobao.svg')
            break
          }
          case '钉钉': {
            this.src = require('@icons/dingding.svg')
            break
          }
          case '云智囊': {
            this.src = require('@icons/yzn.svg')
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
  border:1px solid rgba(20,97,210,1);
  background:linear-gradient(360deg,rgba(22,101,216,1) 0%,rgba(31,111,229,1) 99%,rgba(31,111,229,1) 100%);
  box-shadow:0px 1px 1px rgba(22,29,37,0.1);
  opacity:1;
  border-radius:4px
}

</style>
