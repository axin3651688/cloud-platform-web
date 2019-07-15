<template>
  <div class="wrapper">

  </div>
</template>

<script>
import { saveRole, updateRole, deleteRole } from '@/api/role'
export default {
  name: 'RoleModal',
  methods: {
    saveHandler (paramter) {
      const _this = this
      saveRole(paramter).then(function (res) {
        if (res.code === 200) {
          _this.message.success('保存成功')
        } else {
          _this.message.error('保存失败')
        }
      })
    },
    updateHandler (paramter) {
      const _this = this
      updateRole(paramter).then(function (res) {
        if (res.code === 200) {
          _this.message.success('更新成功')
        } else {
          _this.message.error('更新失败')
        }
      })
    },
    deleteHandler (paramter) {
      const _this = this
      updateRole(paramter).then(function (res) {
        if (res.code === 200) {
          _this.message.success('删除成功')
        } else {
          _this.message.error('删除失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
