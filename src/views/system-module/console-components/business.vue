<template>
  <!--商机-->
  <div>
    <a-row :gutter="24" class="a-row" v-for="(item,index) in businessList" :key="index">
      <a-col :span="16" style="padding-left:28px;">
        <span>{{ item.companyName }}</span>
      </a-col>
      <a-col :span="8" >
        <div style="display: flex;flex-direction: row;align-items: center">
          <span><img src="@icons/4688.svg" style="margin-right: 8px;"/></span>
          <span class="people-info">{{ item.name }}</span>
          <!--<span class="people-info">{{ item.phone }}</span>-->
        </div>
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
  .people-info{
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
