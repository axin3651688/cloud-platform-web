<template>
<!-- 应用管理 -->
  <div class="applyModle">
    <div class="model" 
      v-for="(item,index) of list"
      :key="index">
      <div class="modelOne">
        <div class="tu">{{item.img}}</div>
        <div class="textRight">
          <p><b>{{item.title}}</b></p>
          <p>{{item.contain}}</p>
        </div>
      </div>
      <div class="modelTwo">
        <a-switch defaultChecked @change='onChange'/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ApplyManagement',
    data(){
      return{
        list:[
          {
            img:'图1',
            title:'项目',
            contain:'管理团队成员的工作，跟踪任务进展已开启'
          },
          {
            img:'图2',
            title:'项目',
            contain:'管理团队成员的工作，跟踪任务进展已开启'
          },
          {
            img:'图3',
            title:'项目',
            contain:'管理团队成员的工作，跟踪任务进展已开启'
          },
          {
            img:'图4',
            title:'项目',
            contain:'管理团队成员的工作，跟踪任务进展已开启'
          },
          {
            img:'图5',
            title:'项目',
            contain:'管理团队成员的工作，跟踪任务进展已开启'
          }
        ]
      }
    }
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