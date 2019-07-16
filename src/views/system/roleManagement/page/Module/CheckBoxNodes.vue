<template>
  <div class="wrapper">
    <a-row :gutter="8">
      <div class="top">
        <a-col :md="4" :sm="8">
          <div class="title">
            {{ title }}
          </div>
        </a-col>
        <a-col :md="4" :sm="16" v-show="showAction">
          <div class="action">
            <a-button type="primary">全选</a-button>
          </div>
        </a-col>
      </div>
    </a-row>
    <a-row :gutter="8">
      <a-checkbox-group @change="onChange" v-model="checkValues" style="display: block">
        <div class="nodes">
          <a-col :md="6" :sm="8" v-for="item in nodes" :key="item.key">
            <a-checkbox :value="item.key">{{ item.text }}</a-checkbox>
          </a-col>
        </div>
      </a-checkbox-group>
    </a-row>
  </div>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'
export default {
  name: 'CheckBoxNodes',
  components: { ACol },
  props: {
    title: {
      type: String,
      required: true
    },
    showAction: {
      type: Boolean,
      default: true,
      required: false
    },
    nodes: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    checkedNodes: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      checkValues: []
    }
  },
  methods: {
    onChange (checkedValues) {
      this.$emit('check', checkedValues)
    }
  },
  watch: {
    checkedNodes: function (newVal) {
      this.checkValues = newVal
    }
  }
}
</script>

<style scoped>

</style>
