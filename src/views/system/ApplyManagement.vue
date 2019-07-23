<template>
<!-- 应用管理 -->
  <div class="applyModle">
    <div class="model" 
      v-for="(item,index) of list"
      :key="index">
      <div class="modelOne">
        <div class="tu">
          <!-- {{item.img}} -->
          图片暂无
        </div>
        <div class="textRight">
          <p><b>{{item.name}}</b></p>
          <p>{{item.note}}</p>
        </div>
      </div>
      <div class="modelTwo">
        <a-switch defaultChecked @change='onChange(item.id)'/>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurApp , disableApp} from '@/api/mylogin'
  export default {
    name: 'ApplyManagement',
    data(){
      return{
        list:[
          // {
          //   img:'图1',
          //   title:'项目',
          //   contain:'管理团队成员的工作，跟踪任务进展已开启'
          // },
          // {
          //   img:'图2',
          //   title:'项目',
          //   contain:'管理团队成员的工作，跟踪任务进展已开启'
          // },
          // {
          //   img:'图3',
          //   title:'项目',
          //   contain:'管理团队成员的工作，跟踪任务进展已开启'
          // },
          // {
          //   img:'图4',
          //   title:'项目',
          //   contain:'管理团队成员的工作，跟踪任务进展已开启'
          // },
          // {
          //   img:'图5',
          //   title:'项目',
          //   contain:'管理团队成员的工作，跟踪任务进展已开启'
          // }
        ]
      }
    },
    created() {
      this.get_Cur_App();
    },
    computed: {
      
    },
    methods: {
      //获取租户的应用管理
      get_Cur_App(){
        let me = this ;
        getCurApp().then(function (res) {
            debugger
            if (res.code === 200) {
              me.$message.success('查询成功')
              me.list = res.data;
              // code: "CISDwWc2eSRyf0BZbJE"
              // id: "1"
              // leaf: 0
              // name: "系统管理"
              // note: "系统管理目录"
              // type: 0
            } else {
              me.$message.error('查询失败')
            }
        })
      },
      //授权和取消授权按钮
      onChange(id){
        let me = this ;
        disableApp([id]).then(function(res){
          debugger
            if (res.code === 200) {
              me.$message.success('授权成功')
              // code: "CISDwWc2eSRyf0BZbJE"
              // id: "1"
              // leaf: 0
              // name: "系统管理"
              // note: "系统管理目录"
              // type: 0
            } else {
              me.$message.error('授权失败')
            }
        })
      }
    },
  }
</script>

<style scoped>
.model{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  border:1px solid rgba(0,0,0,0.10196078431372549);;
}
.modelOne{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 108px;
}
.tu{
  height: 94;
  width: 90px;
  line-height: 108px;
}
.textRight{
  height: 108px;
  width: 1400px;
  padding-top: 15px;
}
.modelTwo{
  float: right;
  line-height: 108px;
  padding-right: 50px;
}
</style>