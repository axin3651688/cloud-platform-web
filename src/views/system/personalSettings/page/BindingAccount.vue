<template>
  <div class="main">
    <div class="main1">
      <!-- 路由头部以下内容 -->
      <div class="total">
        <div class="wechat">
          <div class="picture1">
            <a-icon type="wechat" theme="filled" style="font-size:24px;line-height:40px;padding-left:8px"/>
          </div>
          <div class="text">
            <div class="text1">
              微信
            </div>
            <div class="text2">
              即刻绑定微信，第三方账号绑定。文字占位符。
            </div>
          </div>
          <div class="btn">
            <a-button type="primary" @click="clickBang(1)">{{param1}}</a-button>  
          </div>  
        </div>
        <div class="wechat">
          <div class="picture2">
            <a-icon type="weibo" style="font-size:24px;line-height:40px;padding-left:8px"/>
          </div>
          <div class="text">
            <div class="text1">
              微博
            </div>
            <div class="text2">
              即刻绑定微博，第三方账号绑定。文字占位符。
            </div>
          </div>
          <div class="btn">
            <a-button type="primary" @click="clickBang(2)">{{param2}}</a-button>  
          </div>  
        </div>
      </div>
      <!-- <div>
        <big-header :value="title"></big-header>
      </div> -->
      <!-- <div>
        <select-model :selectConfig="optionsConfig"></select-model>
      </div> -->
      <!-- <div>
        <input-model :placeholder='placeholder'></input-model>
      </div> -->
    </div>
  </div>
</template>

<script>
import inputModel from '@/components/system/InputModel'
import selectModel from '@/components/system/SelectModel'
import bigHeader from '@/components/system/BigHeader'
  export default {
    components: { 
      selectModel,
      inputModel,
      bigHeader},
    name: 'BindingAccount',
    data () {
      return {
        param1:'绑定',
        param2:'绑定',
        title: {
          one: "管理员",
          two: "123"
        },
        optionsConfig:{
          options:[
            {
              value:"fff"
            },{
              value:"111"
            },{
              value:"222"
            }
          ]
        },
        placeholder:'请输入要搜索的成员姓名'

      }
    },
    methods: {
      clickBang (val) {
        if(val == 1){
          if(this.param1 == '绑定'){
            this.param1 = '取消绑定'
          }else{
            this.param1 = '绑定'
          }
        }else{
          if(this.param2 == '绑定'){
            this.param2 = '取消绑定'
          }else{
            this.param2 = '绑定'
          }
        }
        
      }
    }
  }
</script>

<style scoped>
.main{
  overflow: auto;
}
.main1{
  height: 800px;
  width: 1599px;
  MARGIN-RIGHT: auto;
  MARGIN-LEFT: auto;
}
.total{
  border-bottom: 1px solid #ccc;
  padding-top: 20px;
}
.wechat{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 72px;
  border-bottom: 1px solid #ccc;
  padding-top: 20px;
}
.picture1{
  height: 40px;
  width: 40px;
  background:rgba(95,227,161,1);
}
.picture2{
  height: 40px;
  width: 40px;
  background:#FF8373
}
.text{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-left: 24px;
}
.text1{
  width:32px;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:40px;
  color:rgba(42,43,47,1);
  opacity:1;
}
.text2{
  width:1040px;
  padding-left: 16px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:40px;
  color:rgba(42,43,47,1);
  opacity:0.5;
}
.btn{
  padding-left: 330px;
  float: right;
}
.weibo{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 72px;
  border-bottom: 1px solid #ccc;
  padding-top: 20px;
}
</style>
