<template>
  <!--角色授权-->
  <div>
    <!--头部-->
    <div style="background-color: white;padding: 20px;">
      <div style="display: flex;justify-content: flex-end;border-bottom: 1px solid #EAEDF3">
        <common-button style="float: none;"
                       :name1="name1"
                       :name2="name2"
                       @addClick="addClick"
                       @deleteClick="deleteClick">
        </common-button>
      </div>
      <div style="display: flex;flex-direction: column;width: 200px;">
        <span style="margin: 10px 0;">角色名称：</span>
        <a-select @change="handleChange">
          <template slot="suffixIcon">
            <img style="width: 12px;"
                 src="../../../assets/icons/paixu.svg" />
          </template>
          <a-select-option v-for="(item,index) in roleArr"
                           :key="index"
                           :value="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <!--中间**一二级节点**-->
    <div style="display: flex;flex-direction: row;margin-top: 20px;">
      <role-node :nodes="obj"
                 @onChange="onchangeUp"></role-node>
    </div>
    <div style="display: flex;flex-direction: row;margin: 20px;background-color: #fff;flex-wrap: wrap">
      <div style="width: 150px;margin: 20px 0 20px 10px;"
           v-for="(item,index) in selectedList"
           :key="index">
        <a-checkbox @change="onChangeDown">{{ item }}</a-checkbox>
      </div>

    </div>
  </div>
</template>

<script>
import CnbiRoleManagement from '@/classes/lib/CnbiRoleManagement'
import CnbiModuleManagement from '@/classes/lib/CnbiModuleManagement'
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
      LimitMObj: null,
      RoleMObj: null,
      roleArr: [],//角色列表
      selectArr: [],//默认勾选的数组
      name1: '保存',
      name2: '删除',
      roleId: null,//勾选的角色id
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
  created () {
    this.RoleMObj = new CnbiRoleManagement()//调用角色的接口
    this.LimitMObj = new CnbiModuleManagement()//由于要查询权限列表
    this.getData()
  },
  methods: {
    //获取数据
    async getData () {
      //角色列表数组
      const data = await this.RoleMObj.findRoleList()
      this.roleArr = data
      //查询所有数据
      const limitData = await this.LimitMObj.getResourcesTree();
      limitData.forEach(item => {
        console.log(item, '看撒谎的客家话的')
        item.selectArr = this.selectArr
      });
      console.log(limitData, '死吧死吧死吧')
      this.obj = limitData
    },
    addClick () {

    },
    deleteClick () {

    },
    onchangeUp (val) {
      //中间层的勾选事件
      console.log(val, '我有点坏')
    },
    onchange (val) {
      // this.selectedNode=val
    },
    //选择角色的事件
    async handleChange (val) {
      //获取选择的角色id
      this.roleId = val
      //根据勾选的角色，查询改角色的所有资源
      const resourceList = await this.RoleMObj.listresource(this.roleId);
      console.log(resourceList, '卡萨绝好的卡JS号地块金黄色')
      //该数组就是默认勾选的数组
      this.selectArr = resourceList.data

      //查询所有数据
      const limitData = await this.LimitMObj.getResourcesTree();
      limitData.forEach(item => {
        console.log(item, '看撒谎的客家话的')
        item.selectArr = this.selectArr
      });
      console.log(limitData, '死吧死吧死吧')
      this.obj = limitData
      // resourceList.data.forEach(item => {
      //   console.log(item.name, '爱过的脚后跟点击行')
      // })

    }
  }
}
</script>

<style scoped>
</style>
