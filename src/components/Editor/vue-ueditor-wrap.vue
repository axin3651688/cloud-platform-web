<template>
  <div class="hello">
    <!-- 你不需要担心一个页面中过多vue-ueditor-wrap组件会导致混乱,或者重复引用JS(打开控制台瞄一眼),每个组件都保证拥有一个独立的UEditor实例,你可以尝试把数字改成99(根据自己电脑自行斟酌),但依然稳定可用 -->
    <vue-ueditor-wrap
      ref="ueditor"
      v-model="msg"
      :destroy="false"
      :config="config"
    >
    </vue-ueditor-wrap>
  </div>
</template>

<script>
// 1、引入VueUeditorWrap组件
import VueUeditorWrap from 'vue-ueditor-wrap'
// const Authorization = localStorage.getItem('pro__Access-Token') // ES6 Module
// const VueUeditorWrap = require('vue-ueditor-wrap') // CommonJS
export default {
  name: 'VueUeditor',
  // 2、注册组件
  components: {
    VueUeditorWrap
  },
  props: {
    defaultMsg: {
      type: String,
      default: ''
    },
    config: {
      type: Object
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    this.init(this.defaultMsg)
  },
  methods: {
    init (val) {
      this.$refs.ueditor.initValue = val
    },
    getUEContent () {
      return this.msg
    },
    clearContent () {
      this.msg = ''
    }
  }
}

</script>

<style>
  .preview{
    min-height: 150px;
  }
</style>
