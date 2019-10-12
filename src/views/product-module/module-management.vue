<template>
  <!-- <h1>模块管理 ModuleManagement</h1> -->
  <div>
    <common-button @addClick="addClick"
                   @deleteClick="deleteClick"
                   :name1="name1"
                   :name2="name2">
    </common-button>
  </div>

</template>

<script>
import CommonButton from '@/components/system/common-button'
export default {
  components: {
    CommonButton
  },
  data () {
    return {
      name1: 'add',
      name2: 'delete'
    }
  },
  methods: {
    addClick () { alert('123') },
    deleteClick () { alert('456') }
  }
}
</script>

<style scoped>
</style>
