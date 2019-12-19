<template>
  <div>
    <div class="faq" :style="{height: '64px',width: 'calc(100vh+48px)','background-color': '#fff'}">
      <a-tabs defaultActiveKey="2" @change="callback">
        <a-tab-pane tab="FAQ分类管理" key="1"></a-tab-pane>
        <a-tab-pane tab="FAQ管理" key="2"></a-tab-pane>
        <a-tab-pane tab="问答管理" key="3"></a-tab-pane>
        <a-tab-pane tab="demo" key="4"></a-tab-pane>
      </a-tabs>
    </div>
    <div>
      <sort-management v-if="tab==1"></sort-management>
      <f-a-q-management v-if="tab==2"></f-a-q-management>
      <quiz-management v-if="tab==3"></quiz-management>
      <demo v-if="tab==4"></demo>
    </div>
  </div>
</template>

<script>
import FAQManagement from './faq/faq-management'
import SortManagement from './faq/sort-management'
import QuizManagement from './faq/quiz-management'
import Demo from './faq/demo'
export default {
  name: 'FAQHomeManagement',
  components: {
    QuizManagement,
    SortManagement,
    FAQManagement,
    Demo
  },
  data () {
    return {
      tab: '2' // tab页
    }
  },
  methods: {
    callback (key) {
      this.tab = key
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
