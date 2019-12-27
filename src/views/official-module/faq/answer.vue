<template>
  <div>
    <div class="faq" :style="{height: '64px',width: 'calc(100vh+48px)','background-color': '#fff'}">
      <div style="display: flex;align-items: center;padding-left: 36px;height: 100%;">
        <div style="cursor: pointer;">
          <img class="btn" src="@icons/4786.svg" @click="goBack"/>
        </div>
      </div>
    </div>
    <div style="margin-top: 24px;background-color: #fff;padding-left: 32px">
      <div style="display: flex;flex-direction: column;padding: 30px 32px 10px 0;border-bottom: 1px solid #EAEDF3;">
        <div style="display: flex;flex-direction: row;margin-bottom: 24px">
          <div style="width: 348px;overflow: hidden;text-overflow-ellipsis: ellipsis;">
            <span>FAQ标题：</span>
            <span style="margin-left: 24px;" v-if="faq">{{ faq.title }}</span>
          </div>
          <div style="width: 348px;overflow: hidden;text-overflow-ellipsis: ellipsis;margin-left: 24px">
            <span>FAQ分类：</span>
            <span style="margin-left: 24px;" v-if="faq">{{ faq.categoryText }}</span>
          </div>
        </div>
        <div>
          <div style="width: 348px;overflow: hidden;text-overflow-ellipsis: ellipsis;margin-right:24px;">
            <span style="margin-right: 16px;" v-if="faq">{{ faq.title }}</span>
            <span style="color:#1665D8;cursor: pointer;" @click="clickDetail(faq)">详情</span>
          </div>
        </div>
      </div>
      <div>
        <div style="padding: 10px 0 10px 0;display: flex;flex-direction: column;border-bottom: 1px solid #EAEDF3;">
          <span v-if="question">{{ question.createUserName || '游客' }}</span>
          <span style="margin-top: 10px;" v-if="question">
            {{ question.content }}
          </span>
        </div>
      </div>
      <div style="padding: 16px 0 8px 0;">
        <span>
          FAQ内容:
        </span>
        <div >
          <u-e v-if="type=='edit'" :config="config" ref="ue" :id="'ue2'" :defaultMsg="reply.content"></u-e>
          <u-e v-else :config="config" ref="ue" :id="'ue2'"></u-e>
          <!--<u-e v-else :config="config" ref="ue"></u-e>-->
        </div>
      </div>
      <div style="padding: 14px 0 14px 0;">
        <a-button
          class="button_style_one"
          type="primary"
          @click="replyIssue"
        >
          <a-icon type="cloud-upload" style="margin-right: 10px;"/>保存
        </a-button>
        <a-button @click="resetContent">重置</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import CnbiFAQManagement from '@/classes/lib/CnbiFAQManagement'
import UE from '@/components/Editor/Ueditor'
export default {
  name: 'Answer',
  components: { UE },
  data () {
    return {
      config: {
        initialFrameHeight: 350,
        initialFrameWidth: null
      },
      question: null,
      faq: null,
      reply: null,
      type: ''

    }
  },
  created () {
    this.FAQMObj = new CnbiFAQManagement()
    this.getDetail()
  },
  mounted () {
    // this.getDetail()
  },
  methods: {
    goBack () {
      const _this = this
      const content = this.$refs.ue.getUEContent()
      let flag = true
      if (this.type == 'edit') {
        flag = content == this.reply.content
      } else if (this.type == 'reply') {
        flag = !content
      }
      if (flag) {
        const current = this.$route.query.current || 1
        this.$router.push({
          name: 'FAQHomeManagement',
          params: {
            tab: '3',
            current: current
          }
        })
      } else {
        this.$confirm({
          title: '有内容未保存，是否离开？',
          onOk () {
            const current = _this.$route.query.current || 1
            _this.$router.push({
              name: 'FAQHomeManagement',
              params: {
                tab: '3',
                current: current
              }
            })
          },
          onCancel () {

          },
          class: 'click-delete'
        })
      }
    },
    // 获取问题详情
    async getDetail () {
      this.type = this.$route.query.type
      const id = this.$route.query.issueId
      const res = await this.FAQMObj.questionFindDetailById(id)
      console.log('获取问题详情====', res)
      if (res.code == 200) {
        this.question = res.data.question
        this.faq = res.data.faq
        this.reply = res.data.reply
      }
    },
    // 保存回复问题
    async replyIssue () {
      const content = this.$refs.ue.getUEContent()
      if (content.length == 0) return
      let params = null
      let res = null
      if (this.type == 'reply') {
        params = {
          content: content,
          questionId: this.$route.query.issueId
        }
        res = await this.FAQMObj.replySave(params)
        if (res.data) {
          this.$message.success('回复成功')
          this.goBack()
        }
      } else if (this.type == 'edit') {
        params = {
          field: 'content',
          id: this.reply.id,
          value: content
        }
        res = await this.FAQMObj.replyUpdateByFiled(params)
        if (res.data) {
          this.$message.success('修改成功')
          this.goBack()
        }
      }
    },
    // 清空编辑的内容
    resetContent () {
      this.$refs.ue.clearContent()
    },
    clickDetail () {
      window.open('http://cnbi.yunzhinang.net/')
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
