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
    text: {
      type: String,
      default: '字段未命名'
    },
    value: {
      type: String,
      default: '字段未命名'
    },
    placeholder: {
      type: String,
      default: ''
    },
    fieldType: {
      type: Number,
      default: 1
    },
    inputType: {
      type: Number,
      default: 1
    },
    labelCol: {
      type: Object,
      default: function () {
        return { span: 2 }
      }
    },
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
