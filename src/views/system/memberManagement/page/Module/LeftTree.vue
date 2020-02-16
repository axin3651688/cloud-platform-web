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
      @rightClick="onRightClick">
      <!--定制图标-->
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

    <div ref="functionalMenu" class="functional-menu" v-if="tool" v-show="showFunctionalMenu">
      <ul class="tree-functional-menu ant-dropdown-menu ant-dropdown-menu-vertical ant-dropdown-menu-root ant-dropdown-menu-light ant-dropdown-content">
        <li class="tree-functional-menu-item ant-dropdown-menu-item ant-dropdown-menu choose-all">全选</li>
        <li class="tree-functional-menu-item ant-dropdown-menu-item ant-dropdown-menu cancel-all">全取消</li>
        <li class="tree-functional-menu-item ant-dropdown-menu-item ant-dropdown-menu choose-child">全选子节点</li>
        <li class="tree-functional-menu-item ant-dropdown-menu-item ant-dropdown-menu cancel-child">全取消子节点</li>
      </ul>
    </div>

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
    // 显示菜单
    showMenu: {
      type: Boolean,
      default: false
    },
    // 选中的key
    selectKeys: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 是否显示连线
    showLine: {
      type: Boolean,
      default: false
    },
    // 显示Icon
    showIcon: {
      type: Boolean,
      default: false
    },
    // 显示tool
    tool: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 数据列表
      dataList: [],
      // 搜索的值
      searchValue: '',
      // 展开的key
      expandedKeys: [],
      // 是否自动展开Parent
      autoExpandParent: false,
      // 被check的节点
      checkNodes: [],
      // 禁用的check节点
      disabledCheckNodes: [],
      // 选中的节点
      selectNodes: [],
      // 显示功能菜单
      showFunctionalMenu: false
    }
  },
  // 初始化数据
  mounted: function () {
    const _this = this
    if (this.tool) {
      // 绑定点击事件，点击其他地方隐藏工具栏
      document.addEventListener('click', function (e) {
        if (e.target.className.indexOf('tree-functional-menu-item') === -1) {
          _this.showFunctionalMenu = false
        }
      })
      // 绑定工具栏事件
      const treeMenus = document.getElementsByClassName('functional-menu')
      // treeMenu.removeEventListener('click', function () {})
      for (const treeMenu of treeMenus) {
        treeMenu.addEventListener('click', function (e) {
          e.stopPropagation()
          let treeIds = this.checkNodes
          if (e.target.className.indexOf('choose-all') !== -1) {
            treeIds = _this.findTreeIds(_this.treeData)
          }
          if (e.target.className.indexOf('cancel-all') !== -1) {
            treeIds = _this.findTreeIds(_this.treeData)
            _this.refreshDisableCheckNodes(_this.treeData)
            console.log(_this.disabledCheckNodes)
          }
          if (e.target.className.indexOf('choose-child') !== -1) {
            treeIds = _this.findTreeChildIds(_this.treeData, _this.selectNodes[0])
          }
          if (e.target.className.indexOf('cancel-child') !== -1) {
            treeIds = _this.findTreeNextLevelChildIds(_this.treeData, _this.selectNodes[0])
          }
        })
      }
    }
  },
  methods: {
    // 展开事件
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
    /**
     * 右键点击事件
     * @param event
     * @param node
     * @return {boolean}
     */
    onRightClick ({ event, node }) {
      if (!this.tool) {
        return false
      }
      // 显示功能菜单
      this.onSelect([node.eventKey])
      this.showFunctionalMenu = true

      // 设置功能菜单位置
      const menuX = event.offsetX
      const menuY = event.layerY
      const menu = this.$refs.functionalMenu
      menu.style.left = menuX + 'px'
      menu.style.top = menuY + 'px'
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
    // 找到所有树的所有Id
    findTreeIds (treeData) {
      let keys = []
      const _this = this
      treeData.forEach(function (ele) {
        keys.push(ele.key)
        if (Array.isArray(ele.children)) {
          const childIds = _this.findTreeIds(ele.children)
          keys = keys.concat(childIds)
        }
      })
      return keys
    },
    /**
     * 发现所有子
     * @param treeData
     * @param pid
     * @return {Array}
     */
    findTreeChildIds (treeData, pid) {
      let keys = []
      const _this = this
      for (const ele of treeData) {
        // 找到了pid 和需要找的pid相同节点了，那么只需要找这个节点和这个节点的子节点即可
        if (ele.pid === pid) {
          keys.push(ele.key)
          if (Array.isArray(ele.children)) {
            const childIds = _this.findTreeChildIds(ele.children, ele.id)
            keys = keys.concat(childIds)
          }
        } else {
          // 没有找到该pid对应的节点，去children的中寻找
          if (Array.isArray(ele.children)) {
            const childIds = _this.findTreeChildIds(ele.children, pid)
            keys = keys.concat(childIds)
          }
        }
      }
      return keys
    },
    /**
     * 发现下一级的子
     * @param treeData
     * @param pid
     * @return {Array}
     */
    findTreeNextLevelChildIds (treeData, pid) {
      let keys = []
      const _this = this
      for (const ele of treeData) {
        if (ele.pid === pid) {
          keys.push(ele.key)
        }
        if (Array.isArray(ele.children)) {
          const childIds = _this.findTreeNextLevelChildIds(ele.children, pid)
          keys = keys.concat(childIds)
        }
      }
      return keys
    },
    /**
     * 刷新被禁用的节点
     * @return {Array}
     */
    refreshDisableCheckNodes () {
      const _this = this
      // 清空
      _this.disabledCheckNodes = []
      // 重新放入失效的节点
      this.pushDisableCheckNodes(this.treeData)
      // 返回
      return _this.disabledCheckNodes
    },
    /**
     * 加入被禁用的节点
     * @param treeData
     */
    pushDisableCheckNodes (treeData) {
      const _this = this
      // 递归去找disableCheckbox，找到放入this.disabledCheckNodes中
      treeData.forEach(function (ele) {
        if (ele.disableCheckbox === true) {
          _this.disabledCheckNodes.push(ele.key)
        }
        if (Array.isArray(ele.children)) {
          _this.pushDisableCheckNodes(ele.children)
        }
      })
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
  .functional-menu {
    width: 100px;
    position: absolute;
    .tree-functional-menu {
      padding: 0px;
    }
  }
</style>
