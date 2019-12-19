<template>
  <div>
    <div class="faq" :style="{height: '64px',width: 'calc(100vh+48px)','background-color': '#fff'}">
      <div style="display: flex;align-items: center;padding-left: 36px;height: 100%;">
        <div style="cursor: pointer;">
          <img class="btn" src="@icons/4786.svg" @click="goBack" title="返回"/>
        </div>

      </div>
    </div>
    <div style="margin-top: 24px;background-color: #fff">
      <div>
        <a-row :gutter="24" >
          <a-col :span="8">
            <div style="margin: 30px 0 0 32px;">
              <div>
                <span>缩略图：</span>
                <div style="margin-top: 8px;display: flex;">
                  <a-upload
                    listType="picture"
                    :showUploadList="false"
                    :beforeUpload="beforeUpload"
                    :customRequest="customRequest"
                  >
                    <a-button class="upload-btn">点击上传</a-button>
                  </a-upload>
                  <span class="img-info">
                    只能上传jpg/png文件，且不超过500kb
                  </span>
                </div>
              </div>
              <div style="margin-top: 16px;" v-if="img">
                <img style="height: 60px;" :src="img.url"/>
                <span style="margin: 0 24px 0 8px;">{{ img.name }}</span>
                <img src="@icons/4514.svg" @click="clearImg"/>
              </div>
              <div style="display: flex;flex-direction: row;margin-top: 16px;">
                <div style="display: flex;align-items: center;flex-direction: row;">
                  <span class="faq-font" style="margin-right: 11px ">是否推荐</span>
                  <a-switch v-model="checked" />
                </div>
                <div>
                  <span class="faq-font" style="margin:0 16px 0 32px;" >
                    查看数量
                  </span>
                  <a-input-number id="inputNumber" :min="0" v-model="examineNum" style="width: 164px;height: 42px;"/>
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="16">
            <a-form :form="form" style="margin-top: 18px">
              <a-row :gutter="24">
                <a-col :span="10">
                  <a-form-item label="FQA标题">
                    <a-input
                      placeholder="请输入"
                      v-decorator="[
                        'nickname',
                        { rules: [{ required: true, message: '请输入!' }] },
                      ]" />
                  </a-form-item>
                </a-col>
                <a-col :span="10">
                  <a-form-item label="关键词">
                    <a-input
                      placeholder="请输入"
                      v-decorator="[
                        'nickname',
                        { rules: [{ required: true, message: '请输入!' }] },
                      ]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :span="10">
                  <a-form-item label="FQA标题">
                    <a-input
                      placeholder="请输入"
                      v-decorator="[
                        'nickname',
                        { rules: [{ required: true, message: '请输入!' }] },
                      ]" />
                  </a-form-item>
                </a-col>
                <a-col :span="10">
                  <a-form-item label="关键词">
                    <a-input
                      placeholder="请输入"
                      v-decorator="[
                        'nickname',
                        { rules: [{ required: true, message: '请输入!' }] },
                      ]" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <div style="margin:0 32px 23px 32px;height: 40px;background-color: #8cc8ff">
              <span>FAQ内容</span>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadFile } from '@/api/common'
import ARow from 'ant-design-vue/es/grid/Row'
export default {
  name: 'AddFaq',
  components: { ARow },
  data () {
    return {
      form: this.$form.createForm(this),
      checked: false, // 是否推荐
      examineNum: 0, // 查看数量
      img: null
    }
  },
  methods: {
    // 返回
    goBack () {

    },
    beforeUpload (file) {
      const fileType = ['image/jpeg', 'image/png', 'image/image/svg+xml']
      const isImg = fileType.indexOf(file.type) > -1
      if (!isImg) {
        this.$message.error('只能jpg、png、svg图片！')
      }
      const isLt5M = file.size / 1024 < 500
      if (!isLt5M) {
        this.$message.error('图片不能超过500kb！')
      }
      return isLt5M && isImg
    },
    customRequest (data) {
      const _this = this
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('playtime', '0')
      formData.append('bizId', 'cs')
      formData.append('bizCode', 'cs')
      uploadFile(formData).then(function (res) {
        if (res.code === 200) {
          console.log('上传图片返回==', res)
          _this.img = {
            url: res.data.thumbUrl,
            name: res.data.fileName,
            id: res.data.id
          }
        }
      })
    },
    // 清空图片
    clearImg () {
      this.img = null
    }

  }
}
</script>

<style scoped>
  .faq{
    margin: -24px -24px 0 -24px;
  }
  .btn{
    filter: grayscale(100%);

  }
/deep/.ant-form-item-control-wrapper{
  max-width: 360px;
}
  .upload-btn{
    width:80px;
    height:32px;
    background:rgba(28,108,225,1);
    opacity:1;
    border-radius:4px;
    color: #fff;
  }
  .faq-font{
    color:#9EA0A5;
  }
  /deep/.ant-input-number-input{
    height: 42px;
  }
  .img-info{
    display: flex;
    align-items: flex-end;
    font-size:12px;
    font-weight:400;
    line-height:14px;
    color:rgba(158,160,165,1);
    opacity:1;
  }

</style>
