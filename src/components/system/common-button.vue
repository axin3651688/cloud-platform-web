<!-- 工程中共用的按钮模板组件 -->

<template>
  <div class="button_style">
    <a-button
      class="button_style_one"
      type="primary"
      @click.prevent="addClick">
      <a-icon type="cloud-upload" />{{ name1 }}</a-button>
    <a-button
      class="button_style_two"
      :disabled="!disabled"
      @click="showConfirm">{{ name2 }}</a-button>
  </div>
</template>
<script>
export default {
  name: 'CommonButton',
  data () {
    return {
      flag: false
    }
  },
  props: {
    name1: String, // 添加名称
    name2: String, // 删除名称
    disabled: Boolean, // 控制可不可以删除
    title: String
  },
  created () {

  },
  methods: {
    // this.$emit('deleteClick')
    addClick () {
      this.$emit('addClick')
    },

    // this.$emit('deleteClick')
    showConfirm () {
      const _this = this
      this.$confirm({
        title: _this.title,
        content: '',
        onOk () {
          _this.$emit('deleteClick')
        },
        onCancel () {
          console.log('Cancel')
        },
        class: 'test'
      })
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
  cursor: pointer;
}
.button_style_two {
  cursor: pointer;
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
