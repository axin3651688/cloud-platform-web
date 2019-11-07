<!-- 工程中共用的按钮模板组件 -->

<template>
  <div class="button_style">
    <a-button
      class="button_style_one"
      type="primary"
      @click.prevent="addClick">
      <div style="margin: 6px 0">
        <a-icon type="cloud-upload" style="margin-right: 10px;"/>{{ name1 }}
      </div>
    </a-button>
    <a-button
      class="button_style_two"
      :disabled="!disabled"
      :class="!disabled?'btn2':''"
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
  border:1px solid rgba(45,156,60,1);
  background:linear-gradient(360deg,rgba(52,170,68,1) 0%,rgba(56,178,73,1) 100%);
  box-shadow:0px 1px 1px rgba(19,31,21,0.1);
  opacity:1;
  border-radius:4px
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
.btn2:hover, .btn2:focus {
  color: #2D9C3C;
  border-color: #2D9C3C;
}
</style>
