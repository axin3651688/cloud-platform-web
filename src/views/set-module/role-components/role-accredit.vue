<template>
  <!--角色授权-->
  <div>
    <!--头部-->
    <div style="background-color: white;padding: 20px;">
      <div style="display: flex;justify-content: flex-end;border-bottom: 1px solid #EAEDF3">
        <common-button style="float: none;"
                       :name1="name1"
                       @addClick="addClick">
        </common-button>
      </div>
      <div style="display: flex;flex-direction: column;width: 200px;">
        <span style="margin: 10px 0;">角色名称：</span>
        <a-input v-model="roleName"
                 style="width:120px" />
      </div>
    </div>
    <div style="display: flex;flex-direction: row;margin-top: 32px;">

      <a-row>
        <a-col :span="6"
               v-for="(item,index) in limitData"
               :key="index"
               v-if="item.enable==1"
               :value="item.id">
          <div class="centerPart">
            <div class="centerPartTop">
              <a-icon type="appstore"
                      style="margin-right: 8px;" />{{item.name}}
            </div>
            <div class="centerPartDown">
              <a-checkbox-group @change="onChange">
                <a-row>
                  <a-col :span="12"
                         v-for="(innerItem,innerIndex) in item.children"
                         :key="innerIndex"
                         v-if="innerItem.enable==1"
                         :value="innerItem.id">
                    <a-checkbox :value="innerItem.id">{{innerItem.name}}{{innerItem.id}}</a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <!--中间**一二级节点**-->
    <div v-show="showFlag">
      <div style="display: flex;flex-direction: row;margin-top: 20px;">
      </div>
      <div style="display: flex;flex-direction: row;margin: 20px;background-color: #fff;flex-wrap: wrap">
        <div style="width: 150px;margin: 20px 0 20px 10px;"
             v-for="(item,index) in childrenArr"
             :key="index"
             :value="item.id">
          <a-checkbox-group @change="onChangeDown">
            <a-checkbox :value="item.id">{{ item.name }}{{item.id}}</a-checkbox>
          </a-checkbox-group>
        </div>
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
      childrenArr: [],//查询勾选的权限子级 集合
      contentHtml: '',
      showFlag: false,
      roleName: '',
      LimitMObj: null,
      RoleMObj: null,
      // roleArr: [], // 角色列表
      selectArr: [], // 默认勾选的数组
      name1: '保存',
      id: '', // 角色id
      roleId: null, // 勾选的角色id
      selectedNode: '1', // 点击的节点
      limitData: [],//所有数据
      checkMidArr: [],//中间框的所有勾选值数组
      checkBottomArr: []//底层勾选的数组
    }
  },
  created () {
    this.id = this.$route.query.id
    this.RoleMObj = new CnbiRoleManagement()// 调用角色的接口
    this.LimitMObj = new CnbiModuleManagement()// 由于要查询权限列表
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      //根据角色id查询角色信息
      debugger
      const roleData = await this.RoleMObj.findRoleInfoById(this.id);
      this.roleName = roleData.name
      console.log(this.roleName, '搞不出来啊')


      // // 角色列表数组(暂时不需要)
      // const data = await this.RoleMObj.findRoleList()
      // this.roleArr = data

      // 查询所有数据
      const limitData = await this.LimitMObj.getResourcesTree()
      console.log(limitData, 'limitData是什么')
      this.selectArr = await this.RoleMObj.listresource(this.id)// 已经勾选的节点
      console.log(this.selectArr, 'this.selectArr是个什么')
      this.limitData = limitData
    },

    //授权完成后的保存按钮
    async addClick () {
      const resources = this.checkMidArr.concat(this.checkBottomArr)
      await this.RoleMObj.authorityRole(this.id, resources);
    },
    onchangeUp (val) {
      // 中间层的勾选事件
      debugger
      console.log(val, '我有点坏')
    },

    // //勾选事件
    // onChange (checkedValue) {
    //   debugger
    //   //1.勾选 触发最下面的框展现事件 
    //   this.showFlag = true
    //   //2.判断，如果所勾选的还有children,则将所有的子级展示在框中
    //   //2.1如果是点击文字，判断是否有子级，有就显示，单纯的展示，不勾选
    //   //2.2如果是勾选，判断是否有子级，有就全部显示，并且全勾选
    //   this.childrenArr = [];
    //   this.limitData.forEach(item => {
    //     if (item.children && item.children.length > 0) {
    //       let childrenList=[];
    //       checkedValue.forEach((val,i)=>{
    //         const _childrenList = item.children.filter(item1 => item1.id === checkedValue[i])
    //         this.childrenArr = childrenList.concat(_childrenList.children||[])
    //       })
    //       this.childrenArr = childrenList.length > 0 ? childrenList[0].children : []
    //     }
    //   })
    //   console.log(this.childrenArr, '控制台的孙子孙子')
    //   if (!this.childrenArr || this.childrenArr.length === 0) this.showFlag = false
    // },

    //中间框勾选事件
    onChange (checks) {
      this.showFlag = true;
      let arr = this.childrenArr || []
      if (!checks || checks.length === 0) {
        this.childrenArr = arr;
        return
      }
      this.limitData.forEach(item => {
        let children = item.children;
        if (children && children.length > 0) {
          children.forEach(innerItem => {
            checks.forEach(check => {
              if (innerItem.id === check) {
                arr = arr.concat(innerItem.children || [])
              }
            })
          })
        }
      })
      // debugger
      this.checkMidArr = checks;
      this.childrenArr = arr;
    },

    // 选择角色的事件
    async handleChange (val) {
      // 获取选择的角色id
      this.roleId = val
      // 根据勾选的角色，查询改角色的所有资源
      const resourceList = await this.RoleMObj.listresource(this.roleId)
      console.log(resourceList, '卡萨绝好的卡JS号地块金黄色')
      // 该数组就是默认勾选的数组
      this.selectArr = resourceList.data

      // 查询所有数据
      const limitData = await this.LimitMObj.getResourcesTree()
      limitData.forEach(item => {
        console.log(item, '看撒谎的客家话的')
        item.selectArr = this.selectArr
      })
      console.log(limitData, '死吧死吧死吧')
      this.limitData = limitData
    },
    //最下方的勾选事件
    onChangeDown (checkV) {
      debugger
      //获取下面的点击数组
      this.checkBottomArr = checkV
    }
  }
}
</script>

<style scoped>
.centerPart {
  width: 360px;
  height: 204px;
  background: rgba(251, 251, 253, 1);
  opacity: 1;
  padding-right: 24px;
}
.centerPartTop {
  height: 63px;
  padding-top: 20px;
  padding-left: 32px;
  border: 1px solid rgba(234, 237, 243, 1);
}
.centerPartDown {
  padding-top: 22px;
  height: 140px;
  padding-left: 32px;
  padding-right: 32px;
  border: 1px solid rgba(234, 237, 243, 1);
}
</style>
