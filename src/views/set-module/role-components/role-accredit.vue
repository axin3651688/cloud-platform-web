<template>
  <!--角色授权-->
  <div>
    <!--头部-->
    <div style="background-color: white;padding: 20px;">
      <div style="display: flex;justify-content: flex-end;border-bottom: 1px solid #EAEDF3">
        <common-button
          style="float: none;"
          :name1="name1"
          :name2="name2"
          @addClick="addClick"
          @deleteClick="deleteClick">
        </common-button>
      </div>
      <div style="display: flex;flex-direction: column;width: 200px;">
        <span style="margin: 10px 0;">角色名称：</span>
        <a-select
          default-value="1"
          v-decorator="['type',{rules: [{ required: true, message: '请选择角色名称!' }],}]">
          <template slot="suffixIcon">
            <img
              style="width: 12px;"
              src="../../../assets/icons/paixu.svg" />
          </template>
          <a-select-option value="1">
            公共部署
          </a-select-option>
          <a-select-option value="2">
            私有部署
          </a-select-option>
          <a-select-option value="3">
            本地部署
          </a-select-option>
        </a-select>
      </div>
    </div>
    <!--中间**一二级节点**-->
    <div style="display: flex;flex-direction: row;margin-top: 20px;">
      <role-node :nodes="obj" @onChange="onchange"></role-node>
    </div>
    <div style="display: flex;flex-direction: row;margin: 20px;background-color: #fff;flex-wrap: wrap">
      <div style="width: 150px;margin: 20px 0 20px 10px;" v-for="(item,index) in selectedList" :key="index">
        <a-checkbox @change="onChange">{{ item }}</a-checkbox>
      </div>

    </div>
  </div>
</template>

<script>
import CommonButton from '@/components/system/common-button'
import RoleNode from './role-node'
import ACol from 'ant-design-vue/es/grid/Col'

export default {
  name: 'RoleAccredit',
  components: {
    ACol,
    RoleNode,
    CommonButton
  },
  data () {
    return {
      name1: '保存',
      name2: '删除',
      obj: [
        {
          plainOptions: ['Apple', 'Pear', 'Orange', 'Apple1', 'Pear1', 'Orange1', 'Orange2'], // 所有
          checkedList: ['Apple', 'Orange'], // 默认选中
          name: '系统',
          type: '1'
        },
        {
          plainOptions: ['Apple', 'Pear', 'Orange', 'Apple1', 'Pear1', 'Orange1', 'Orange2'], // 所有
          checkedList: ['Apple', 'Orange'], // 默认选中
          name: '产品',
          type: '2'
        },
        {
          plainOptions: ['Apple', 'Pear', 'Orange', 'Apple1', 'Pear1', 'Orange1', 'Orange2'], // 所有
          checkedList: ['Apple', 'Orange'], // 默认选中
          name: '官网',
          type: '3'
        },
        {
          plainOptions: ['Apple', 'Pear', 'Orange', 'Apple1', 'Pear1', 'Orange1', 'Orange2'], // 所有
          checkedList: ['Apple', 'Orange'], // 默认选中
          name: '设置',
          type: '4'
        }
      ], // 节点数组
      selectedNode: '1', // 点击的节点
      selectedList: ['节点1-1', '节点1-2', '节点1-3', '节点1-4',
        '节点1-5', '节点1-6', '节点1-7', '节点1-8',
        '节点1-9', '节点1-10', '节点1-9', '节点1-10',
        '节点1-9', '节点1-10', '节点1-9', '节点1-10',
        '节点1-5', '节点1-6']

    }
  },
  methods: {
    addClick () {

    },
    deleteClick () {

    },
    onchange (val) {
      // this.selectedNode=val
    }
  }
}
</script>

<style scoped>

</style>
