<template>
  <div class="main">
    <div class="header_bar">
      <span class="avatar"></span>
      <span class="username">周</span>
      <span class="introduction"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsoleM'
}
</script>

<style lang="less" scoped>
  .main {
    .header_bar {
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: @primary-color;
      }
    }
  }

</style>
