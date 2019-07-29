<template>
  <div class="wrapper">
    <a-upload
      name="file"
      :beforeUpload="beforeUpload"
      :showUploadList="false"
      listType="picture-card"
      class="avatar-uploader"
      :customRequest="customRequest"
      :disabled="disable"
      >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">点击上传</div>
      </div>
    </a-upload>
    <a-button type="default" @click="onDel" v-show="showDel">删除</a-button>
  </div>
</template>

<script>
import { uploadFile } from '@/api/common'
export default {
  name: 'SystemUpload',
  props: {
    url: {
      type: String,
      default: ''
    },
    showDel: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      imageUrl: ''
    }
  },
  methods: {
    customRequest (data) {
      const _this = this
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('playtime', '0')
      formData.append('bizId', 'cs')
      formData.append('bizCode', 'cs')
      uploadFile(formData).then(function (res) {
        if (res.code === 200) {
          // _this.imageUrl = res.data.thumbUrl
          _this.$emit('success', res.data)
        } else {
          _this.$emit('fail', res)
        }
      })
    },
    beforeUpload (file) {
      const fileType = ['image/jpeg', 'image/png', 'image/bmp']
      const isImg = fileType.indexOf(file.type) > -1
      if (!isImg) {
        this.$message.error('只能上传jpec、png、bmp图片！')
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('图片不能超过5MB！')
      }
      return isLt5M && isImg
    },
    onDel () {
      this.$emit('del')
    }
  },
  watch: {
    url: function (newVal) {
      this.imageUrl = newVal
    }
  }
}
</script>

<style scoped>
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
