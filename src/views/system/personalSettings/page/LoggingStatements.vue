<template>
  <div class="main">
    <div class="loginInfo">
      <!-- 头像 -->
      <div class="total">
        <div class="modle">
          <div class="title">头像</div>
          <div class="anse">更换你的头像,选择一张个人正面照片作为头像,企业成员可以更容易认识你</div>
          <div class="btn">
            <a-button type="primary" @click="expend(1)">{{param1}}</a-button>
          </div>
        </div>
        <!--头像点击展开后的页面 -->
        <div v-if="isOut1">
          <div class="trueName" style="display:flex;align-items: center;">
            真实姓名:&nbsp;&nbsp;<a-input  size="small" style="width:200px;height:32px;"/>
            &nbsp;
            <a-icon type="edit" style="color:#336CFB;font-size:20px;" @click="edit"/>
          </div>
          <template>
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">点击上传头像</div>
              </div>
            </a-upload>
            <!-- <a-button type="primary">上传</a-button> -->
            &nbsp;&nbsp;
            <a-button>删除</a-button>
          </template>
          <p style="font-size:12px;color:#ccc;">点击上传图片,建议上传22X22,支持svg、png、jpg格式,限制5M内</p>
          <div class="pic" style="width:360px;height:92px;">
            <!-- <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1651287656,2337091096&fm=26&gp=0.jpg" 
            alt="111" 
            style="height:80px;width:80px;">
            彭于晏 -->
          </div>
        </div>
      </div>

      <!-- 用户名 -->
      <div class="total">
        <div class="modle">
          <div class="title">用户名</div>
          <div class="anse">修改你的登陆用户名和真实姓名,用户名只能是英文、数字和下划线组成,且必须以字母开头。</div>
          <div class="btn">
            <a-button type="primary" @click="expend(2)">{{param2}}</a-button>
          </div>
        </div>

        <!-- 用户名点击展开后的页面 -->
        <div v-if="isOut2">
          <div>
            <a-form
            :model="formData"
            :rules="formRules">
              <a-form-item prop="text1">
                <a-input style="width:200px" v-model="formData.text1"/>
              </a-form-item>
              <a-form-item prop="text2">
                <a-input style="width:200px" v-model="formData.text2"/>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="save">保存</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>

      <!-- 修改密码 -->
      <div class="total">
        <div class="modle">
          <div class="title">修改密码</div>
          <div class="anse">修改密码时需要输入当前密码,如果你忘记了当前密码,可以点击这里通过手机短信重置你的密码</div>
          <div class="btn">
            <a-button type="primary" @click="expend(3)">{{param3}}</a-button>
          </div>
        </div>
        <!-- 修改密码点击展开后的页面 -->
        <div v-if="isOut3">
          <div>
            <a-form
            :model="formData"
            :rules="formRules">
              <a-form-item prop="text1">
                <a-input style="width:200px" v-model="formData.text1"/>
              </a-form-item>
              <a-form-item prop="text2">
                <a-input style="width:200px" v-model="formData.text2"/>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="save">保存</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
      
      <!-- 修改联系方式 -->
      <div class="total">
        <div class="modle">
          <div class="title">修改联系方式</div>
          <div class="anse">手机和邮箱时系统会发送验证码到新的手机号码上,然后输入验证码后完成修改。</div>
          <div class="btn">
            <a-button type="primary" @click="expend(4)">{{param4}}</a-button>
          </div>
        </div>
        <!-- 用户名点击展开后的页面 -->
        <div v-if="isOut4">
          <div>
            <div class="trueName" style="display:flex;align-items: center;">
              手机号:&nbsp;&nbsp;<a-input  size="small" style="width:200px;height:32px;"/>
              &nbsp;
              <a-icon type="edit" style="color:#336CFB;font-size:20px;" @click="edit"/>
            </div>
            <div class="pwd" style="display:flex;align-items: center;">
              密码:&nbsp;&nbsp;<a-input  size="small" style="width:200px;height:32px;"/>
              &nbsp;
              <a-icon type="edit" style="color:#336CFB;font-size:20px;" @click="edit"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadFile} from '@/api/mylogin'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
  export default {
    name: 'LoggingStatements',
    data() {
      return {
        loading: false,
        imageUrl: '',
        isOut1:false,
        isOut2:false,
        isOut3:false,
        isOut4:false,
        param1:'展开+',
        param2:'展开+',
        param3:'展开+',
        param4:'展开+',
        formData:{
          text1:'',
          text2:''
        },
        formRules: {
          text1: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 32, message: '支持汉字、字母、数值任意组合，限32个字符', trigger: 'blur'}
          ],
          text2: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 32, message: '支持汉字、字母、数值任意组合，限32个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      expend(val){
        debugger
        //展开按钮的点击事件
        if(val == 1){
          if(this.param1 == '展开+'){
          this.isOut1 = true;
          this.param1 = '收起...';
          }else{
            this.isOut1 = false;
            this.param1 = '展开+';
          }
        }else if(val == 2){
          if(this.param2 == '展开+'){
          this.isOut2 = true;
          this.param2 = '收起...';
          }else{
            this.isOut2 = false;
            this.param2 = '展开+';
          }
        }else if(val == 3){
          if(this.param3 == '展开+'){
          this.isOut3 = true;
          this.param3 = '收起...';
          }else{
            this.isOut3 = false;
            this.param3 = '展开+';
          }
        }else{
          if(this.param4 == '展开+'){
          this.isOut4 = true;
          this.param4 = '收起...';
          }else{
            this.isOut4 = false;
            this.param4 = '展开+';
          }
        } 
      },
      handleChange (info) {
        if (info.file.status === 'uploading') {
          this.loading = true
          return
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (imageUrl) => {
            this.imageUrl = imageUrl
            this.loading = false
          })
        }
      },
      beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        if (!isJPG) {
          this.$message.error('You can only upload JPG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style scoped>
.main{
  overflow: auto;
}
.loginInfo{
  height: 800px;
  width: 1599px;
  MARGIN-RIGHT: auto;
  MARGIN-LEFT: auto;
}
.total{
  border-bottom: 1px solid #ccc;
  padding-top: 20px;
}
.modle{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height:65px; 
}
.title{
  width:196px;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:65px;
  color:rgba(42,43,47,1);
  opacity:1;
}
.anse{
  width:1040px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:70px;
  color:rgba(42,43,47,1);
  opacity:0.5;
}
.btn{
  line-height:65px;
  padding-left:800px;
}
.pic{
  padding-bottom: 10px;
}
.trueName{
  font-size: 14px;
  line-height: 22px;
  padding-bottom: 32px;
}
.pwd{
  padding-left: 13px;
}
</style>
<style>
.avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
