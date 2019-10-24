<template>
  <!--角色授权-->
  <div>
    <!--头部-->
    <div>
      <div style="display: flex;justify-content: flex-end;">
        <common-button
          style="float: none;"
          :name1="name1"
          :name2="name2"
          @addClick="addClick"
          @deleteClick="deleteClick">
        </common-button>
      </div>
      <div style="display: flex;flex-direction: column;width: 200px;">
        <span style="margin: 10px 0;">角色名称：</span>
        <a-select
          default-value="1"
          v-decorator="['type',{rules: [{ required: true, message: '请选择角色名称!' }],}]">
          <template slot="suffixIcon">
            <img
              style="width: 12px;"
              src="../../../assets/icons/paixu.svg" />
          </template>
          <a-select-option value="1">
            公共部署
          </a-select-option>
          <a-select-option value="2">
            私有部署
          </a-select-option>
          <a-select-option value="3">
            本地部署
          </a-select-option>
        </a-select>
      </div>
    </div>
    <!--中间-->
    <div>
      <role-node></role-node>
    </div>
  </div>
</template>

<script>
import CommonButton from '@/components/system/common-button'
import RoleNode from './role-node'

export default {
  name: 'RoleAccredit',
  components: {
    RoleNode,
    CommonButton
  },
  data () {
    return {
      name1: '保存',
      name2: '删除'
    }
  },
  methods: {
    addClick () {

    },
    deleteClick () {

    }
  }
}
</script>

<style scoped>

</style>
