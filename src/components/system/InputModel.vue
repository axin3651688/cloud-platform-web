<template>
<!-- 封装的搜索框的组件，样式统一，方便开发 -->
    <div class="inputModel">
        <a-input-search
            :placeholder="placeholder"
            @search="onSearch"
        />
    </div>
</template>
<script>
export default {
    name:'inputModel',
    data() {
        return {
          options1:[]  
        }
    },
    props:{
        placeholder:String
    },
    methods: {
      onSearch (value) {
        console.log(value)
    },
  }    
}
</script>
<style>
.inputModel{
    width:160px;
    height:30px;
    border:1px solid rgba(0,0,0,0.10196078431372549);
    opacity:1;
    border-radius:3px;
}
</style>

