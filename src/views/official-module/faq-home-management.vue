<template>
  <div>
    <div class="faq" :style="{height: '64px',width: 'calc(100vh+48px)','background-color': '#fff'}">
      <a-tabs :activeKey="tab" @change="callback">
        <a-tab-pane tab="FAQ分类管理" key="1"></a-tab-pane>
        <a-tab-pane tab="FAQ管理" key="2"></a-tab-pane>
        <a-tab-pane tab="问答管理" key="3"></a-tab-pane>
      </a-tabs>
    </div>
    <div>
      <sort-management v-if="tab==1" ></sort-management>
      <f-a-q-management v-if="tab==2" :inheritPage="current" @jump="jumpQuit"></f-a-q-management>
      <quiz-management v-if="tab==3" :inheritPage="current" :faqId.sync="faqId"></quiz-management>
    </div>
  </div>
</template>

<script>
import FAQManagement from './faq/faq-management'
import SortManagement from './faq/sort-management'
import QuizManagement from './faq/quiz-management'
export default {
  name: 'FAQHomeManagement',
  components: {
    QuizManagement,
    SortManagement,
    FAQManagement
  },
  data () {
    return {
      tab: '1', // tab页
      current: 1,
      faqId: null
    }
  },
  created () {
    this.getTab()
  },
  methods: {
    // 切换tab页
    callback (key) {
      this.tab = key
      this.current = 1
      this.faqId = null
    },
    // 判断怎么来的,展示哪个tab页
    getTab () {
      console.log('判断怎么来的,展示哪个tab页===', this.$route.params)
      // 哪来回哪去
      if (this.$route.params.tab) {
        this.tab = this.$route.params.tab
        this.current = this.$route.params.current
      }
    },
    // 跳转到问答页面
    jumpQuit (id) {
      this.tab = '3'
      this.faqId = id
    }
  }
}
</script>

<style scoped>
.faq{
  margin: -24px -24px 0 -24px;
}
  /deep/.ant-tabs-nav-wrap{
    height: 65px;
    display: flex;
    align-items: center
  }
  /deep/.ant-tabs-nav .ant-tabs-tab{
    margin: 0;
    padding: 12px 24px;
  }

</style>
