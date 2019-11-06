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
              <a-checkbox-group @change="onChange"
                                v-model="allValue">
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
          <a-checkbox-group @change="onChangeDown"
                            v-model="allValue1">
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
      allValue: [],//中间层勾选的最终集合
      allValue1: [],//最底层勾选的最终集合
      childrenArr: [],//查询勾选的权限子级 集合--要在底层显示的数据
      contentHtml: '',
      showFlag: false,
      roleName: '',
      LimitMObj: null,
      RoleMObj: null,
      selectArr: [], // 默认勾选的数组
      name1: '保存',
      id: '', // 角色id
      selectedNode: '1', // 点击的节点
      limitData: [],//所有数据
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
      debugger
      //根据角色id查询角色信息
      const roleData = await this.RoleMObj.findRoleInfoById(this.id);
      this.roleName = roleData.name

      // 查询所有数据
      const limitData = await this.LimitMObj.getResourcesTree()
      // console.log(limitData, 'limitData是什么')
      this.limitData = limitData

      //此数据待再次点击授权的时候用，用于显示之前勾选过的授权
      const alreadySelectArr = await this.RoleMObj.listresource(this.id)// 已经勾选的节点
      this.selectArr = alreadySelectArr.data

      //判断，如果this.selectArr不为空，则表示之前授权过，需要显示出来（即对应的图标要被勾选）
      if (this.selectArr || this.selectArr.length > 0) {
        //将this.selectArr中之前勾选的权限id赋值给allValue
        this.selectArr.forEach(item => {
          this.showFlag = true
          this.allValue.push(item.id)
          this.allValue1.push(item.id)
          
          console.log(this.allValue, '已经勾选的id集合')
          console.log(this.allValue1, '已经勾选的id222集合')
        })
      }
      // console.log(this.selectArr, 'this.selectArr是个什么')
    },

    //授权完成后的保存按钮
    async addClick () {
      // let resources = []
      const resources = this.allValue.concat(this.allValue1)
      // console.log(resources, 'resources到底是什么')
      const res = await this.RoleMObj.authorityRole(this.id, resources.toString());
      if (res.code == 200) {
        this.$message.success('授权成功')
      }
    },

    // //勾选事件
    onChange (checkedValues, kk, dd) {
      debugger
      //1.勾选 触发最下面的框展现事件 
      this.showFlag = true
      //2.判断，如果所勾选的还有children,则将所有的子级展示在框中 //2.1如果是点击文字，判断是否有子级，有就显示，单纯的展示，不勾选 //2.2如果是勾选，判断是否有子级，有就全部显示，并且全勾选
      this.childrenArr = [];
      this.limitData.forEach(item => {
        if ((item.children || item.children.length > 0) && this.childrenArr.length == 0) {
          const childrenList = item.children.filter(item1 => item1.id === checkedValues[checkedValues.length - 1])
          this.childrenArr = childrenList.length > 0 ? childrenList[0].children : []
        }
      })
    },

    //最下方的勾选事件
    onChangeDown (checkedValues) {
      debugger
      //获取下面的点击数组
      this.allValue1 = checkedValues
      // console.log(this.allValue1, 'this.allValue1到底是多少')
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
