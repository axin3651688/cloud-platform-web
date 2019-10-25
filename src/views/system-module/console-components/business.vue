<template>
  <!--商机-->
  <div>
    <a-row :gutter="24" class="a-row" v-for="(item,index) in businessList" :key="index">
      <a-col :span="16" style="padding-left:28px;">
        <span>{{ item.companyName }}</span>
      </a-col>
      <a-col :span="8" style="display: flex;flex-direction: column">
        <span>{{ item.name }}</span>
        <span>{{ item.phone }}</span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Business',
  props: ['businessList']
}
</script>

<style scoped>
.a-row{
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
