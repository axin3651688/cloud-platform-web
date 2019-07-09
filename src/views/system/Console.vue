<template>
    <!-- <h1>控制台 Console</h1> -->
    <div>
      <div class="body_one" style="height:280px;">
        <div class="body_one_head">
          <a-icon class="lanyuan"/>
          成员姓名
          <span class="anse">欢迎使用，您现在所在的是经邦企业系统管理后台。</span>
        </div>
        <div class="body_one_down">
          <div class="body_one_down_left" style="padding-left:200px;padding-top:55px;">
              
              <div class="body_one_down_left_head_down_left">
                <p class="body_one_down_left_head" style="color:rgba(42,43,47,1);">账号剩余</p>
                <p>
                  <a-icon class="lanzheng" style="height:16px;width:16px;background:rgba(77,124,254,1);"/>
                  剩余可用账户{{Total}}个
                </p>
                <p>
                  <a-icon class="huizheng" style="height:16px;width:16px;background:rgba(163,160,251,1);"/>
                  已开通使用数{{yiyongTotal}}个
                </p>
                <p>
                  <a-icon class="zheng" style="height:16px;width:16px;border:2px solid rgba(177,179,183,1);opacity:0.3;"/>
                  可用账户总数{{Total}}个
                </p>
              </div>
              <div class="body_one_down_left_head_down_right" style="padding-top:35px;">
                <a-progress type="circle" :percent="40" :format="() => '剩余可用6个'"/>
              </div>
          </div>
          <div class="body_one_down_right" style="padding-left:500px;padding-top:55px;">
            <p class="body_one_down_right_head" style="color:rgba(42,43,47,1);">当前版本</p>
            <p class="body_one_down_right_head" style="color:rgba(42,43,47,1);">您当前使用的是<span style="color:rgba(77,124,254,1);font-size:22px;">免费版</span></p>
            <p class="anse">免费版团队人数上限为15人，若有扩容需要，请选择购买</p>
            <div>
              <a-button type="primary">立即购买</a-button>
            </div>
          </div>
        </div>
      </div>
      <div class="body_two" style="height:320px;">
        <div class="body_one_down_left">
          <div>
            <p class="body_two_head_left" style="font-size:22px;">应用管理<span class="anse" style="font-size:14px;">&nbsp;&nbsp;&nbsp;&nbsp;企业已启用了N个应用</span></p>
          </div>
          <div class="body_two_head_right" style="padding-left:1250px;">
            <a-button type="primary">+ 开启应用</a-button>
          </div>
        </div>
        <div class="body_two_down">
          <div class="models" 
              v-for="(item,index) of list"
              :key="index">
              <div class="model_one">
                {{item.img}}  
              </div>  
              <div class="model_two">
                <p>{{item.title}}</p>
                  {{item.contain}}
              </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer_head">
          <p style="font-size:22px;">客户端</p>
        </div>
        <div class="models2"
            v-for="(item,index) of footList"
            :key="index">
            <div class="height-50">
                {{item.img}}  
            </div>  
            <div>
              {{item.text}}
            </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Console',
    data() {
      return {
         Total:15,
         yiyongTotal:9, 
         shengyu:6,
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
           },
           {
            img:'图6',
            title:'项目',
            contain:'管理团队成员的工作，跟踪任务进展已开启' 
           },{
            img:'图7',
            title:'项目',
            contain:'管理团队成员的工作，跟踪任务进展已开启' 
           }
         ],
         footList:[
           {
             img:'图1',
             text:'进入web版'
           },
           {
             img:'图2',
             text:'iPhone应用'
           },
           {
             img:'图3',
             text:'Android应用'
           },
           {
             img:'图4',
             text:'macOS客户端'
           },
           {
             img:'图5',
             text:'Windows客户端'
           }
         ] 
      }
    }
  }
</script>

<style scoped>
.head{
  width:66px;
  height:29px;
  font-size:22px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:22px;
  color:rgba(42,43,47,1);
  opacity:1;
}
.anse{
  color:rgba(177,179,183,1);
}
.lanyuan{
  width:20px;
  height:20px;
  line-height: 20px;
  background:rgba(77,124,254,1);
  border-radius:50%;
  opacity:1;
}
.body_one_down{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.body_one_down_left{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.models {
  width: 250px;
  height: 108px;
  float: left;
  border: 1px solid #ccc;
  margin-right: 68px;
  margin-bottom: 20px;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.model_one{
  width:175px;
  height:108px;
  line-height: 108px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(0,0,0,0.10196078431372549);
  opacity:1;
  border-radius:2px;
}
.models2 {
  width: 250px;
  height: 56px;
  line-height: 56px;
  float: left;
  border: 1px solid #ccc;
  margin-right: 68px;
  margin-bottom: 20px;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.height-50{
  width:75px;
  height:56px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(0,0,0,0.10196078431372549);
  opacity:1;
  border-radius:2px;
}
</style>

<style>
.ant-progress-circle .ant-progress-text{
  font-size:15px;
}
</style>