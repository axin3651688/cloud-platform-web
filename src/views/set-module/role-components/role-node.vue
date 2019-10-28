<template>
  <div style="display: flex;flex-direction: row;flex-wrap: wrap;">
    <div class="node-content"
         v-for="(obj,index) in nodes"
         :key="index">
      <a-row :gutter="8">
        <a-col :span="24">
          <a-row :gutter="24">
            <a-col :span="24">
              <div class="content-header"
                   style="">
                <img src="../../../assets/icons/weizhi.svg">
                <span style="margin-left: 16px;">{{ obj.name }}</span>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8"
                   v-for="(item,index1) in obj.children"
                   :key="index1"
                   style="margin-top: 20px;">
              <a-checkbox :defaultChecked="obj.selectArr.indexOf(item.name)>-1"
                          :value="item.id"
                          @change="onChange">{{ item.name }}</a-checkbox>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'
export default {
  name: 'RoleNode',
  components: { ACol },
  props: ['nodes'],
  data () {
    return {
    }
  },
  methods: {
    onChange (checkedValues, event) {
      this.$emit('onChange', checkedValues)
    }
  }
}
</script>

<style scoped>
.node-content {
  width: 364px;
  border: 1px solid #eaedf3;
  padding: 10px;
  margin: 20px 0 20px 20px;
  background-color: #fff;
}
.content-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #eaedf3;
  padding: 16px;
}
</style>
