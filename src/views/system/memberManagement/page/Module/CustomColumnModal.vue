<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :afterClose="afterCloseModal">
    <!--这里循环的可以显示的所有列，勾选的是checkValues是column的所有列-->
    <a-checkbox-group @change="onChange" v-model="checkValues">
      <a-row>
        <a-col
          v-for="item in defaultColumn"
          :key="item.title"
          :span="8">
          <a-checkbox :value="item.title">
            {{ item.title }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </a-modal>
</template>

<script>
export default {
  name: 'CustomColumnModal',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 表格的默认列，可以显示的所有列
    defaultColumn: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 表格的现有列，现在拥有的列信息
    column: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      checkValues: []
    }
  },
  watch: {
    column (newVal) {
      const _this = this
      this.checkValues = []
      newVal.forEach(function (ele) {
        _this.checkValues.push(ele.title)
      })
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleCancel (e) {
      this.visible = false
    },
    handleOk: function () {
      const _this = this
      this.confirmLoading = false
      this.visible = false
      // 去变化父组件的column
      const lastColumn = this.defaultColumn.filter(function (ele) {
        let exist = false
        _this.checkValues.forEach(function (title) {
          if (ele.title === title) {
            exist = true
          }
        })
        return exist
      })
      // 父绑定这个方法去设置column
      this.$emit('finalColumn', lastColumn)
    },
    afterCloseModal () {
    },
    onChange (checkedValues) {
    }
  },
  created () {
    // 页面初始化选中当前的类
    this.checkValues = this.column.map(function (ele) {
      return ele.title
    })
  }
}
</script>

<style scoped>

</style>
