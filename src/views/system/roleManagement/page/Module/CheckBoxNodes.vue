<template>
  <div class="wrapper">
    <a-row :gutter="8">
      <div class="top-nav">
        <a-col :md="8" :sm="8">
          <div class="title">
            {{ title }}
          </div>
        </a-col>
        <a-col :md="4" :sm="16" v-show="showAction">
          <div class="all-action">
            <a-icon :component="chooseAll" @click="checkAll"></a-icon>
            <span class="all-action-text">全选</span>
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
import { chooseAll } from '@/core/icons'
export default {
  name: 'CheckBoxNodes',
  components: { ACol },
  props: {
    // 标题
    title: {
      type: String,
      required: true
    },
    // 显示操作
    showAction: {
      type: Boolean,
      default: true,
      required: false
    },
    // 节点数据
    nodes: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    // 被选中的节点数据
    checkedNodes: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      // 选中的数据
      checkValues: [],
      chooseAll
    }
  },
  methods: {
    /**
     * 选中改变事件
     * @param checkedValues
     */
    onChange (checkedValues) {
      this.$emit('check', checkedValues)
    },
    /**
     * 选中所有
     */
    checkAll () {
      this.checkValues = this.nodes.map(function (ele) {
        return ele.key
      })
    }
  },
  watch: {
    // 选中节点改变监听
    checkedNodes: function (newVal) {
      this.checkValues = newVal
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    background-color: #fff;
    padding: 24px;
    .top-nav {
      height: 70px;
      .title {
        width: 144px;
        height: 30px;
        padding-top: 3px;
        border:1px solid rgba(77,124,254,1);
        border-radius: 3px;
        text-align: center;
      }
      .all-action {
        display: inline-block;
        height: 30px;
        padding-top: 6px;
        .all-action-text {
          padding-left: 8px;
        }
      }
    }
  }
</style>
