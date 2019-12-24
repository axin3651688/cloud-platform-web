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
                      v-if="editFaq"
                      placeholder="请输入"
                      v-decorator="[
                        'title',
                        { rules: [{ required: true, message: '请输入!' }],initialValue: editFaq.title},
                      ]" />

                    <a-input
                      v-else
                      placeholder="请输入"
                      v-decorator="[
                        'title',
                        { rules: [{ required: true, message: '请输入!' }] },
                      ]" />
                  </a-form-item>
                </a-col>
                <a-col :span="10">
                  <a-form-item label="关键词">
                    <a-input
                      v-if="editFaq"
                      placeholder="请输入"
                      v-decorator="[
                        'keyword',
                        { rules: [{ required: true, message: '请输入关键词!' }],initialValue: editFaq.keyword },
                      ]" />

                    <a-input
                      v-else
                      placeholder="请输入"
                      v-decorator="[
                        'keyword',
                        { rules: [{ required: true, message: '请输入关键词!' }] },
                      ]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="24">
                <a-col :span="10">
                  <a-form-item label="FAQ展示排序">
                    <a-input
                      v-if="editFaq"
                      placeholder="请输入"
                      v-decorator="[
                        'sort',
                        { rules: [{ required: true, message: '请输入数字!' }],initialValue: editFaq.sort },
                      ]" />
                    <a-input
                      v-else
                      placeholder="请输入"
                      v-decorator="[
                        'sort',
                        { rules: [{ required: true, message: '请输入数字!' }] },
                      ]" />
                  </a-form-item>
                </a-col>
                <a-col :span="10">
                  <a-form-item label="所属分类">
                    <a-tree-select
                      v-if="editFaq"
                      style="width: 300px"
                      v-decorator="[
                        'pid',
                        { rules: [{ required: true, message: '必填项' }],initialValue: editFaq.categoryId },
                      ]"
                      :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                      placeholder="请选择分类位置"
                      :treeData="sortTree"
                    >
                    </a-tree-select>

                    <a-tree-select
                      v-else
                      style="width: 300px"
                      v-decorator="[
                        'pid',
                        { rules: [{ required: true, message: '必填项' }] },
                      ]"
                      :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                      placeholder="请选择分类位置"
                      :treeData="sortTree"
                    >
                    </a-tree-select>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <div style="margin: 0 0 8px 32px;">
              <span >FAQ内容</span>
            </div>
            <!--编辑器-->
            <div style="margin:0 32px 23px 32px;">
              <u-e v-if="type=='edit'" :config="config" ref="ue" :defaultMsg="editFaq.content"></u-e>
              <u-e v-else :config="config" ref="ue"></u-e>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin: 0;padding-left: 32px;border-top: 1px solid #EAEDF3;">
          <a-button
            class="button_style_one"
            type="primary"
            @click="saveFaq"
          >
            <a-icon type="cloud-upload" style="margin-right: 10px;"/>保存
          </a-button>
          <a-button @click="resetContent" v-if="type=='add'">重置</a-button>
          <a-button @click="cancelEdit" v-else>取消</a-button>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadFile } from '@/api/common'
import CnbiFAQManagement from '@/classes/lib/CnbiFAQManagement'
import UE from '@/components/Editor/Ueditor'
import ARow from 'ant-design-vue/es/grid/Row'
export default {
  name: 'AddFaq',
  components: { ARow, UE },
  data () {
    return {
      config: {
        initialFrameHeight: 350,
        initialFrameWidth: null
      },
      form: this.$form.createForm(this),
      checked: false, // 是否推荐
      examineNum: 0, // 查看数量
      sortTree: [], // 树形分类结构
      img: null,
      editFaq: null, // 要编辑FAQ
      // defaultMsg: '',
      type: '', // 当前页面type
      FAQMObj: null
    }
  },
  created () {
    this.FAQMObj = new CnbiFAQManagement()
    this.getDataTree()
    this.isType()
  },
  methods: {
    // 返回
    goBack () {
      // this.$confirm({
      //   title: '编辑内容尚未保存确定取消？',
      //   onOk () {
      //     window.history.go(-1)
      //   },
      //   onCancel () {
      //
      //   },
      //   class: 'resetContent'
      // })
      window.history.go(-1)
    },
    // 判断当前页面是添加还是编辑
    async isType () {
      this.type = this.$route.query.type
      if (this.type == 'edit') {
        const params = {
          field: 'id',
          value: this.$route.query.faqId
        }
        const res = await this.FAQMObj.coreFindOne(params)
        this.editFaq = res.data
        this.examineNum = this.editFaq.readCount || 0
        if (this.editFaq.titleImg) {
          this.img = {
            id: this.editFaq.titleImg,
            name: this.editFaq.titleImgName,
            url: this.editFaq.titleImgUrl
          }
        }
        this.checked = this.editFaq.isRecommend == 1
        this.defaultMsg = this.editFaq.content
      }
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
    },
    // 查询分类位置 树形结构
    async getDataTree () {
      const res = await this.FAQMObj.categoryFindTree()
      console.log('查询分类位置 树形结构', res)
      if (res.code === 200) {
        this.remakeTreeData(res.data)
        this.sortTree = res.data
        console.log('====', this.sortTree)
      }
    },
    /* 设置 key value title */
    remakeTreeData (data) {
      data.forEach((item) => {
        item['title'] = item.text
        item['value'] = item.id
        item['key'] = item.code
        if (item.leaf == 1 && item.children && item.children.length == 0) {
          delete item.children
        }
        if (item.children && item.children.length > 0) {
          this.remakeTreeData(item.children)
        }
      })
    },
    // 重置
    resetContent () {
      const _this = this
      this.$confirm({
        title: '是否要重置所编辑的内容？',
        onOk () {
          _this.resetPage()
        },
        onCancel () {

        },
        class: 'resetContent'
      })
    },
    saveFaq () {
      const _this = this
      const content = _this.$refs.ue.getUEContent()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let titleImg
          if (_this.img) {
            titleImg = _this.img.id
          }
          const params = {
            title: values.title,
            categoryId: values.pid,
            sort: values.sort,
            keyword: values.keyword,
            titleImg: titleImg,
            readCount: _this.examineNum,
            isRecommend: _this.checked == true ? 1 : 0,
            content: content
          }
          let res = null
          if (_this.type == 'edit') {
            params.id = this.editFaq.id
            params.issue = this.editFaq.issue
            params.isComment = this.editFaq.isComment
            res = await this.FAQMObj.coreUpdate(params)
          } else {
            res = await this.FAQMObj.coreSave(params)
            _this.resetPage()
          }
          if (res.code == 200) {
            console.log('111111111111111111111111111111111')
            this.$message.success('保存成功')
          }
          console.log('res=====', res)
        } else {
          console.log('cuowu')
        }
      })
    },
    // 清空页面内容
    resetPage () {
      this.checked = false
      this.examineNum = 0
      this.img = null
      this.form.resetFields()
      this.$refs.ue.clearContent()
    },
    cancelEdit () {
      this.$confirm({
        title: '编辑内容尚未保存确定取消？',
        onOk () {
          window.history.go(-1)
        },
        onCancel () {

        },
        class: 'resetContent'
      })
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
  .button_style_one {
    margin: 16px 32px 16px 0;
    cursor: pointer;
    border:1px solid rgba(45,156,60,1);
    background:linear-gradient(360deg,rgba(52,170,68,1) 0%,rgba(56,178,73,1) 100%);
    box-shadow:0px 1px 1px rgba(19,31,21,0.1);
    opacity:1;
    border-radius:4px
  }
</style>
