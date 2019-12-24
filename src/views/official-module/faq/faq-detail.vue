<template>
  <div>
    <div class="faq" :style="{height: '64px',width: 'calc(100vh+48px)','background-color': '#fff'}">
      <div style="display: flex;align-items: center;padding-left: 36px;height: 100%;">
        <div style="cursor: pointer;">
          <img class="btn" src="@icons/4786.svg" @click="goBack" title="返回"/>
        </div>
      </div>
    </div>
    <div class="content" style="padding: 32px;background-color: #fff;margin-top: 24px;">
      <div style="display: flex;flex-direction: row">
        <div>
          <img style="height: 60px;width: 177px;" src="https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K///it///u=4121232426,1436481329&fm=202&src=ry_add_wise">
        </div>
        <div style="margin-left: 24px;">
          <div style="display: flex;flex-direction: row;flex-wrap: wrap;">
            <div style="width: 304px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
              <span>FAQ标题：</span>
              <span>标题名称标题名称标题名称标题名称标题名称标题名称标题名称标题名称标题名称标题名称标题名称</span>
            </div>
            <div class="text-name">
              <span>FAQ分类：</span>
              <span>FAQ分类</span>
            </div>
            <div class="text-name">
              <span>关键词：</span>
              <span>关键词</span>
            </div>
            <div class="text-name">
              <span>FAQ展示排序：</span>
              <span>FAQ展示排序</span>
            </div>
          </div>
          <div style="display: flex;flex-direction: row;margin-top: 20px;">
            <div style="width: 304px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
              <span>是否推荐：</span>
              <span>FAQ展示排序</span>
            </div>
            <div class="text-name">
              <span>查看数量：</span>
              <span>88</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CnbiFAQManagement from '@/classes/lib/CnbiFAQManagement'
import ACol from 'ant-design-vue/es/grid/Col'
export default {
  name: 'FaqDetail',
  components: { ACol },
  created () {
    this.FAQMObj = new CnbiFAQManagement()
    this.getFaqDetail()
  },
  methods: {
    goBack () {

    },
    async getFaqDetail () {
      const params = {
        field: 'id',
        value: this.$route.query.faqId
      }
      const res = await this.FAQMObj.coreFindOne(params)
      console.log('res=======', res)
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
  .text-name{
    width: 304px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 24px;
  }
</style>
