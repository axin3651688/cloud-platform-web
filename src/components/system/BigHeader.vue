<template>
    <!-- 封装的标题部分的黑体字以及灰色字体的组件，方便开发 -->
    <div>
        <span class="bigTitle">{{ this.value.one }}</span>
        <span class="smallTitle">{{ this.value.two }}</span>
    </div>
</template>

<script>
export default {
    name:'BigHeader',
    data() {
        return {
           title:this.value 
        }
    },
    props:{
        // value:{
        //     type:String,
        //     default:''
        // }
        value: Object
    }
}
</script>

<style scoped>
.bigTitle{
    height:30px;
    font-size:22px;
    font-family:Microsoft YaHei;
    font-weight:400;
    /* line-height:16px; */
    /* color:rgba(42,43,47,1); */
    opacity:1;
    padding-left: 16px;
}
.smallTitle{
    height:19px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:16px;
    /* color:rgba(42,43,47,1); */
    opacity:0.5;
    padding-left: 8px;
}
</style>
