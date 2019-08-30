<template>
  <div class="page_content_bg">
    <!--搜索框-->
    <a-input-search placeholder="请输入搜索内容" @search="onChange" enterButton="查询" size="default" />
    <a-tree
      :checkable="checkable"
      :checkStrictly="checkStrictly"
      :selectedKeys="selectNodes"
      v-model="checkNodes"
      @expand="onExpand"
      @select="onSelect"
      @check="onCheck"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      :treeData="treeData"
      :showLine="showLine"
      class="custom cnbi-tree"
      :showIcon="showIcon"
    >
      <!--部门定制图标-->
      <template slot="icon" slot-scope="item">
        <slot name="icon" :data="item">
          <!--自定义图标如下所示，要先引入svg图到Vue的data数据中，参考 https://pro.loacg.com/docs/biz-icon 最后-->
          <!--<a-icon v-if="item.dataRef.level === 1" :component="BookMark"/>
         <a-icon v-if="item.dataRef.level === 2" :component="BookMark"/>
         <a-icon v-if="item.dataRef.level === 3" :component="BookMark"/>
         <a-icon v-if="item.dataRef.level === 4" :component="BookMark"/>
         <a-icon v-if="item.dataRef.level === 5" :component="BookMark"/>-->
        </slot>
      </template>

      <!--使用插槽来提示搜索-->
      <template slot="title" slot-scope="item">
        <span v-if="item.title.indexOf(searchValue) > -1">
          {{ item.title.substr(0, item.title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ item.title.substr(item.title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ item.title }}</span>
        <!--自定义的下拉菜单-->
        <a-dropdown v-show="showMenu">
          <a class="ant-dropdown-link" style="float: right; padding-right: 4px;" href="#">
            <a-icon type="align-right" />
          </a>
          <a-menu slot="overlay">
            <slot name="menu" :data="item">
              <!--
                菜单节点示例:
                <a-menu-item key="1"><a-icon type="user" />1st menu item</a-menu-item>
              -->
            </slot>
          </a-menu>
        </a-dropdown>
      </template>

    </a-tree>
  </div>
</template>

<script>
// 搜索的展开，找到父节点
import ACol from 'ant-design-vue/es/grid/Col'
const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
export default {
  name: 'LeftTree',
  components: { ACol },
  props: {
    // 设置树数据
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 有没有checkbox，默认没有
    checkable: {
      type: Boolean,
      default: false
    },
    // 让父子不关联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 让父节点设置被选中的数据
    checkedKeys: {
      type: Array,
      default: function () {
        return []
      }
    },
    showMenu: {
      type: Boolean,
      default: false
    },
    selectKeys: {
      type: Array,
      default: function () {
        return []
      }
    },
    showLine: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataList: [],
      searchValue: '',
      expandedKeys: [],
      autoExpandParent: false,
      checkNodes: [],
      selectNodes: []
    }
  },
  methods: {
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 因为使用了selectedKeys，发现不赋值一下，不自动选中
    onSelect (selectedKeys, e) {
      this.selectNodes = selectedKeys
      this.$emit('select', selectedKeys)
    },
    // check事件反馈给父组件
    onCheck (checkedKeys) {
      this.$emit('check', checkedKeys)
    },
    // 搜索
    onChange (text) {
      const value = text
      const expandedKeys = this.dataList.map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, this.treeData)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    // 生成为搜索服务的列表数据
    generateList (data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.key
        this.dataList.push({ key: key, title: node.text })
        if (node.children) {
          this.generateList(node.children, node.key)
        }
      }
    },
    // 清除选中
    clearSelectNodes () {
      this.selectNodes = []
    },
    onTreeMenuClick (key) {
      alert(key)
    }
  },
  watch: {
    // 树变化，搜索列表变一下
    treeData: function (newVal) {
      this.dataList = []
      this.generateList(this.treeData)
    },
    // 父子节点check数据不同步，用watch监听解决了。。。
    checkedKeys: function (newVal) {
      this.checkNodes = newVal
    },
    selectKeys: function (newVal) {
      this.selectNodes = newVal
    }
  }

}
</script>

<style lang="less" scoped>
  .custom {
    /deep/ li[role='treeitem'] {
      .ant-tree-node-content-wrapper {
        width: calc(100% - 24px);
      }
    }
  }
</style>
