<template>
  <!-- 封装的标题部分的黑体字以及灰色字体的组件，方便开发 -->
  <div>
    <span class="title">{{ title }}</span>
    <span class="desc">{{ desc }}</span>
  </div>
</template>

<script>
export default {
  name: 'DescHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.title{
    height:30px;
    font-size:22px;
    font-family:Microsoft YaHei;
    font-weight:400;
    opacity:1;
    padding-left: 16px;
}
.desc{
    height:19px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:16px;
    opacity:0.5;
    padding-left: 8px;
}
</style>
