<template>
  <div style="background-color: #fff">
    <a-input-search style="margin-bottom: 8px" placeholder="搜索" @change="onChange"/>
    <a-tree
      @expand="onExpand"
      @select="onSelect"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      :treeData="treeData">
      <template slot="title" slot-scope="{title}">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
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
  props: {
    treeData: {
      default: []
    }
  },
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: false
    }
  },
  methods: {
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onSelect (selectedKeys, e) {
      this.curSelectKey = selectedKeys[0]
      this.setCurComDept(this.curSelectKey)
      this.curDept = undefined
    }
  },
  onChange (e) {
    const value = e.target.value
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
  }
}
</script>

<style scoped>

</style>
