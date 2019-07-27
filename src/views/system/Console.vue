<template>
  <!-- <h1>控制台 Console</h1> -->
  <div class="main">
    <div class="main1">
      <div class="body_one" style="height:280px;">
        <div class="body_one_head">
          <a-icon class="lanyuan" />
          {{userName}}
          <span class="anse">欢迎使用，您现在所在的是经邦企业系统管理后台。</span>
        </div>
        <div class="body_one_down">
          <div class="body_one_down_left" style="padding-left:200px;padding-top:55px;">
            <div class="body_one_down_left_head_down_left">
              <p class="body_one_down_left_head" style="color:rgba(42,43,47,1);">账号剩余</p>
              <p>
                <a-icon
                  class="lanzheng"
                  style="height:16px;width:16px;background:rgba(77,124,254,1);"
                />
                剩余可用账户{{shengyu}}个
              </p>
              <p>
                <a-icon
                  class="huizheng"
                  style="height:16px;width:16px;background:rgba(163,160,251,1);"
                />
                已开通使用数{{alreadyUseNum}}个
              </p>
              <p>
                <a-icon
                  class="zheng"
                  style="height:16px;width:16px;border:2px solid rgba(177,179,183,1);opacity:0.3;"
                />
                可用账户总数{{Total}}个
              </p>
            </div>
            <div class="body_one_down_left_head_down_right" style="padding-top:35px;">
              <a-progress type="circle" :percent="this.rate" :format="() => ` 剩余可用${shengyu}个`" />
            </div>
          </div>
          <div class="body_one_down_right" style="padding-left:500px;padding-top:55px;">
            <p class="body_one_down_right_head" style="color:rgba(42,43,47,1);">当前版本</p>
            <p class="body_one_down_right_head" style="color:rgba(42,43,47,1);">
              您当前使用的是
              <span style="color:rgba(77,124,254,1);font-size:22px;">{{VerName}}</span>
            </p>
            <p class="anse">免费版团队人数上限为{{Total}}人，若有扩容需要，请选择购买</p>
            <div>
              <a-button type="primary" @click="buy">立即购买</a-button>
            </div>
          </div>
        </div>
      </div>
      <div class="body_two" style="height:320px;">
        <div class="body_one_down_left">
          <div>
            <p class="body_two_head_left" style="font-size:22px;">
              应用管理
              <span
                class="anse"
                style="font-size:14px;"
              >&nbsp;&nbsp;&nbsp;&nbsp;企业已启用了{{applyCount}}个应用</span>
            </p>
          </div>
          <div class="body_two_head_right" style="padding-left:1250px;">
            <a-button type="primary">+ 开启应用</a-button>
          </div>
        </div>
        <div class="body_two_down">
          <div class="models" v-for="(item,index) of newList" :key="index">
            <div class="model_one">
              <!-- {{item.img}}   -->
              图片暂无
            </div>
            <div class="model_two">
              <p>{{item.name}}</p>
              {{item.note}}
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer_head">
          <p style="font-size:22px;">客户端</p>
        </div>
        <div class="models2" v-for="(item,index) of footList" :key="index">
          <div class="height-50">{{item.img}}</div>
          <div>{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getLicense, findUserCount, getCurApp, getDisableAppId } from '@/api/mylogin'
export default {
  name: 'Console',
  data () {
    return {
      newList: [],
      Total: 0,//账户总数
      alreadyUseNum: 0, //已使用数量
      userName: '',//当前用户的name
      VerName: '',//版本name(免费/旗舰)
      applyTotalCount: 0,//应用的总数
      disableAppleCount: 0,//被禁用的数量
      list: [],//应用的数组
      list1: [],//被禁用的id数组
      //控制台最底部的内容数组
      footList: [
        {
          img: '图1',
          text: '进入web版'
        },
        {
          img: '图2',
          text: 'iPhone应用'
        },
        {
          img: '图3',
          text: 'Android应用'
        },
        {
          img: '图4',
          text: 'macOS客户端'
        },
        {
          img: '图5',
          text: 'Windows客户端'
        }
      ]
    }
  },
  created () {
    this.getUser_Info();
    this.get_License();
    this.find_User_Count();
    this.get_Cur_App();
    this.get_Disable_App_Id();
  },
  computed: {
    //剩余账户数量
    shengyu: function () {
      return this.Total - this.alreadyUseNum
    },
    //已用账户数量占总账户数的比例
    rate: function () {
      return this.alreadyUseNum / this.Total
    },
    //企业已启用的应用数量
    applyCount: function () {
      return this.applyTotalCount - this.disableAppleCount
    }


  },
  methods: {
    buy () {
      alert('老板，现金还是刷卡')
    },
    //查询当前的用户信息
    getUser_Info () {
      let me = this;
      getUserInfo().then(function (res) {
        // debugger
        if (res.code === 200 && res.data) {
          me.userName = res.data.trueName
        }
      })
    },
    //获取租户的牌照信息
    get_License () {
      let me = this;
      getLicense().then(function (res) {
        // debugger
        if (res.code === 200 && res.data) {
          me.Total = res.data.maxUser;
          me.VerName = res.data.name
        }
      })
    },
    //获取已使用的租户数量
    find_User_Count () {
      let me = this;
      findUserCount().then(function (res) {
        // debugger
        if (res.code === 200 && res.data) {
          me.alreadyUseNum = res.data;
        }
      })
    },
    //获取租户的应用管理
    get_Cur_App () {
      let me = this;
      getCurApp().then(function (res) {
        debugger
        if (res.code === 200 && res.data) {
          me.list = res.data;
          me.applyTotalCount = res.data.length;
          //遍历数组
          let newList = [];
          me.list1.forEach(obj1 => {
            let tempList = me.list.filter(obj => obj1 !== obj.id)
            newList = [...tempList, ...newList]
          });
          me.newList = newList
        }
      })
    },
    //获取应用管理被禁用的应用
    get_Disable_App_Id () {
      let me = this;
      getDisableAppId().then(function (res) {
        debugger
        if (res.code === 200 && res.data) {
          me.list1 = res.data;
          me.disableAppleCount = res.data.length;
        }
      })
    }

  },
}
</script>

<style scoped>
.head {
  width: 66px;
  height: 29px;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 22px;
  color: rgba(42, 43, 47, 1);
  opacity: 1;
}
.anse {
  color: rgba(177, 179, 183, 1);
}
.lanyuan {
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: rgba(77, 124, 254, 1);
  border-radius: 50%;
  opacity: 1;
}
.body_one_down {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.body_one_down_left {
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
.model_one {
  width: 175px;
  height: 108px;
  line-height: 108px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.10196078431372549);
  opacity: 1;
  border-radius: 2px;
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
.height-50 {
  width: 75px;
  height: 56px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.10196078431372549);
  opacity: 1;
  border-radius: 2px;
}
.main1 {
  height: 800px;
  width: 1599px;
  margin-right: auto;
  margin-left: auto;
}
.main {
  overflow: auto;
}
</style>

<style>
.ant-progress-circle .ant-progress-text {
  font-size: 15px;
}
</style>