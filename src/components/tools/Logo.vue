<template>
  <div class="logo" style="background-color: #252529;border-bottom: 1px solid #313131">
    <router-link :to="{name:'index'}">
      <!--<LogoSvg alt="logo" />-->
      <img src="@icons/logo.png" style="width: 200px;"/>
      <!--<h1 v-if="showTitle">{{ title }}</h1>-->
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '经邦后台管理系统',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
