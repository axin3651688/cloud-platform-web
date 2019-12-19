<template>
  <div>
    <div class="faq" :style="{height: '64px',width: 'calc(100vh+48px)','background-color': '#fff'}">
      <div style="display: flex;align-items: center;padding-left: 36px;height: 100%;">
        <div style="cursor: pointer;">
          <img class="btn" src="@icons/4786.svg" @click="goBack"/>
        </div>

      </div>
    </div>
    <div>
      <div>
        <a-row :gutter="24">
          <a-col :span="8">

          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import ARow from 'ant-design-vue/es/grid/Row'
export default {
  name: 'Demo',
  components: { ARow },
  methods: {
    goBack () {

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

</style>
