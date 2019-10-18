<!-- 工程中共用的按钮模板组件 -->

<template>
  <div class="button_style">
    <a-button class="button_style_one"
              type="primary"
              @click.prevent="addClick">
      <a-icon type="cloud-upload" />{{ name1 }}</a-button>
    <a-button class="button_style_two"
              @click="deleteClick">{{ name2 }}</a-button>
  </div>
</template>
<script>
export default {
  name: 'CommonButton',
  data () {
    return {

    }
  },
  props: {
    name1: String,
    name2: String
  },
  created () {

  },
  methods: {
    // this.$emit('deleteClick')
    addClick () {
      this.$emit('addClick')
    },
    deleteClick () {
      this.$emit('deleteClick')
    }
  }
}
</script>
<style scoped>
.button_style {
  padding-right: 32px;
  float: right;
  padding-bottom: 15px;
}
.button_style_one {
  margin-right: 32px;
}
.button_style_two {
  /* width:32px;
    height:19px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:22px;
    color:rgba(62,63,66,1);
    opacity:1; */
}
</style>
