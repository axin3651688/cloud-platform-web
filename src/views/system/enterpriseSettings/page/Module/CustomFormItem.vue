<template>
  <a-form-item
    v-if="inputType === 1"
    :label="text"
    :label-col="labelCol"
    :wrapper-col="wrapperCol">
    <a-input :placeholder="placeholder" v-decorator="[ value ]"/>
  </a-form-item>
</template>

<script>
export default {
  name: 'CustomFormItem',
  props: {
    // 文字
    text: {
      type: String,
      default: '字段未命名'
    },
    // 值
    value: {
      type: String,
      default: '字段未命名'
    },
    // 替换符
    placeholder: {
      type: String,
      default: ''
    },
    // 字段类型
    fieldType: {
      type: Number,
      default: 1
    },
    // 输入类型
    inputType: {
      type: Number,
      default: 1
    },
    // 样式
    labelCol: {
      type: Object,
      default: function () {
        return { span: 2 }
      }
    },
    // 样式
    wrapperCol: {
      type: Object,
      default: function () {
        return { span: 10 }
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
