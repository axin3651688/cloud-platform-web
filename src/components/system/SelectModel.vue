<template>
  <div>
    <!-- 封装的下拉选组件，样式是项目中的统一样式 -->
    <a-select defaultValue="姓名"
              style="width: 80px;"
              @change="handleChange">
      <a-select-option v-for="item in selectConfig.options"
                       :key="item.value">
        {{item.value}}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: 'selectModel',
  data () {
    return {
      options: []
    }
  },
  props: {
    selectConfig: Object
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`);
    }
  }
}
</script>

<style>
.selectM {
  width: 80px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.10196078431372549);
  opacity: 1;
  border-radius: 3px;
}
</style>
