<template>
  <div >
    <div style="width: 364px;border: 1px solid #000;margin: 10px">
      <div
        style="display: flex;flex-direction: row;align-items: center;
      margin:24px 32px 16px 32px;border-bottom: 1px solid red">
        <img src="../../../assets/icons/weizhi.svg">
        <span style="margin-left: 16px;">系统</span>
      </div>
      <div style="margin: 20px 32px 32px 32px">
        <a-row>
          <a-col :span="8" v-for="(item,index) in plainOptions" :key="index" style="margin-bottom: 10px;">
            <a-checkbox :defaultChecked="checkedList.indexOf(item)>-1" :value="item" @change="onChange">{{ item }}</a-checkbox>
          </a-col>
        </a-row>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'RoleNode',
  data () {
    return {
      plainOptions: ['Apple', 'Pear', 'Orange', 'Apple1', 'Pear1', 'Orange1'],
      checkedList: ['Apple', 'Orange'],
      indeterminate: false,
      checkAll: false
    }
  },
  methods: {
    onChange (checkedValues) {
      debugger
    }
  }
}
</script>

<style scoped>

</style>
