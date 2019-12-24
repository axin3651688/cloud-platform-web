<template>
  <div>
    <div class="faq" :style="{height: '64px',width: 'calc(100vh+48px)','background-color': '#fff'}">
      <div style="display: flex;align-items: center;padding-left: 36px;height: 100%;">
        <div style="cursor: pointer;">
          <img class="btn" src="@icons/4786.svg" @click="goBack" title="返回"/>
        </div>
      </div>
    </div>
    <div class="content" style="padding: 32px;">
      <div>
        <div>
          <img src="https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K///it///u=4121232426,1436481329&fm=202&src=ry_add_wise">
        </div>
        <div>
          <a-row :gutter="24">
            <a-col :span="6">
              <span>FAQ标题：</span>
              <span>标题名称</span>
            </a-col>
            <a-col :span="6">
              <span>FAQ分类：</span>
              <span>设计器</span>
            </a-col>
            <a-col :span="6">
              <span></span>
              <span></span>
            </a-col>
            <a-col :span="6">
              <span></span>
              <span></span>
            </a-col>
          </a-row>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'
export default {
  name: 'FaqDetail',
  components: { ACol }
}
</script>

<style scoped>
  .faq{
    margin: -24px -24px 0 -24px;
  }
  .btn{
    filter: grayscale(100%);
  }
</style>
