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
        <a-switch :defaultChecked="item.isDefaultChecked" @change='onChange(item.id)'/>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurApp , disableApp , getDisableAppId} from '@/api/mylogin'
  export default {
    name: 'ApplyManagement',
    data(){
      return{
        list1:[],//被禁用的id数组
        isDefaultChecked:true,
        list:[]
      }
    },
    created() {
      this.get_Cur_App();
      this.get_Disable_App_Id();
    },
    computed: {
      
    },
    methods: {
      //获取租户的应用管理
      get_Cur_App(){
        let me = this ;
        getCurApp().then(function (res) {
            debugger
            if (res.code === 200 && res.data) {
              me.list = res.data;
              //遍历数组，让被禁用的应用开关显示为关闭
              me.list1.forEach(obj1 => {
                me.list.forEach(obj =>{
                  if(obj1 == obj.id){
                    // me.isDefaultChecked = false
                    obj.isDefaultChecked = false;
                  }else{
                    // me.isDefaultChecked = true
                    obj.isDefaultChecked = true;
                  }
                })
              });
              // code: "CISDwWc2eSRyf0BZbJE"
              // id: "1"
              // leaf: 0
              // name: "系统管理"
              // note: "系统管理目录"
              // type: 0
            }
        })
      },
      //授权和取消授权按钮
      onChange(id){
        let me = this ;
        disableApp([id]).then(function(res){
            if (res.code === 200 && res.data) {
            }
        })
      },
      //获取被禁用的信息[禁用id的数组]，然后根据是否被禁用显示开关按钮
      get_Disable_App_Id(){
        let me = this ;
        getDisableAppId().then(function (res) {
            debugger
            if (res.code === 200 && res.data) {
              //被禁用的id数组
              me.list1 = res.data;
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