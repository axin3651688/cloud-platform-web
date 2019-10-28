<template>
  <!--角色管理-->
  <div>
    <div style="display: flex;flex-direction: row;justify-content: flex-end;background-color: #fff;padding: 16px 32px 0 32px">
      <common-button
        style="float: none"
        @addClick="addClick"
        @deleteClick="deleteClick"
        :name1="name1"
        :name2="name2">
      </common-button>
    </div>
    <a-table
      size="small"
      class="role-table"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="setKey"
      :pagination="pagination"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <template
        slot="zhuangtai"
        slot-scope="text, record">
        <!--1代表开-->
        <a-switch
          :defaultChecked="record.enable==1?true:false"
          @change="updataState(record)" />
      </template>
      <template
        slot="caozuo"
        slot-scope="text, record">
        <div style="display: flex;justify-content: space-around">
          <span @click="btnClick(record)">
            <a-icon type="edit"></a-icon>
          </span>
          <span @click="accredit(record)">授权</span>
        </div>
      </template>
    </a-table>
    <!--添加用户-->
    <a-modal
      v-model="showAddRole"
      title="添加角色"
      :width="350">
      <a-form :form="form">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <!--  v-decorator="['name',{rules: [{ required: true, message: '描述不能为空!' }],}]" />-->
        <a-form-item label="描述">
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'note',
              { rules: [{ required: true, pattern: /^[\S\n\s]{0,150}$/, message: '请输入150字以内的描述！' }] },
            ]" />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelAddRole"
            style="margin-right: 32px">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveAddRole">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <a-modal
      v-model="showEditRole"
      title="角色信息编辑"
      :width="350">
      <a-form :form="form1">
        <a-form-item label="名称">pattern: /^[0-9]*$/
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' },{
              validator: checkName,
            }],}]" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'note',
              { rules: [{ required: true, pattern: /^[\S\n\s]{0,150}$/, message: '请输入150字以内的描述！' }] },
            ]" />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelEditRole"
            style="margin-right: 32px">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveEditRole">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import CnbiRoleManagement from '@/classes/lib/CnbiRoleManagement'
import CommonButton from '@/components/system/common-button'
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  components: {
    ATextarea,
    CommonButton
  },
  name: 'RoleManagement',
  data () {
    return {
      name1: '添加',
      name2: '删除',
      RoleMObj: null,
      editId: null, // 点击编辑的时候该行数据对应的id
      selectedRowKeys: [],
      columns: [
        { title: '角色',
          dataIndex: 'name',
          width: '10%'
        },
        { title: '描述',
          dataIndex: 'note',
          width: '50%'
        },
        { title: '创建时间',
          dataIndex: 'createTime',
          width: '10%',
          customRender (text, record, index) {
            var oDate = new Date(text * 1)
            var oYear = oDate.getFullYear()
            var oMonth = oDate.getMonth() + 1
            var oDay = oDate.getDate()
            if (oMonth < 10) {
              oMonth = '0' + oMonth
            }
            if (oDay < 10) {
              oDay = '0' + oDay
            }
            var oTime = oDay + '/' + oMonth + '/' + oYear
            text = oTime
            return text
          }
        },
        { title: '更新时间',
          width: '10%',
          dataIndex: 'updateTime',
          customRender (text, record, index) {
            var oDate = new Date(text * 1)
            var oYear = oDate.getFullYear()
            var oMonth = oDate.getMonth() + 1
            var oDay = oDate.getDate()
            if (oMonth < 10) {
              oMonth = '0' + oMonth
            }
            if (oDay < 10) {
              oDay = '0' + oDay
            }
            var oTime = oDay + '/' + oMonth + '/' + oYear
            text = oTime
            return text
          }
        },
        { title: '状态',
          width: '10%',
          dataIndex: 'enable',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        { title: '操作',
          width: '10%',
          dataIndex: 'name5',
          scopedSlots: { customRender: 'caozuo' }
        }
      ],
      dataSource: [],
      showAddRole: false,
      showEditRole: false,
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      }
    }
  },
  created () {
    this.RoleMObj = new CnbiRoleManagement()
    this.getData()
  },
  methods: {
    // 进入页面加载数据
    async getData () {
      const data = await this.RoleMObj.findRoleList()
      // data.forEach(item => {
      //   var oDate = new Date(item.updateTime * 1)
      //   var oYear = oDate.getFullYear()
      //   var oMonth = oDate.getMonth() + 1
      //   var oDay = oDate.getDate()
      //   if (oMonth < 10) {
      //     oMonth = '0' + oMonth
      //   }
      //   if (oDay < 10) {
      //     oDay = '0' + oDay
      //   }
      //   var oTime = oDay + '/' + oMonth + '/' + oYear
      //   item.updateTime = oTime

      //   var oDate1 = new Date(item.createTime * 1)
      //   var oYear1 = oDate1.getFullYear()
      //   var oMonth1 = oDate1.getMonth() + 1
      //   var oDay1 = oDate1.getDate()
      //   if (oMonth1 < 10) {
      //     oMonth1 = '0' + oMonth1
      //   }
      //   if (oDay1 < 10) {
      //     oDay1 = '0' + oDay1
      //   }
      //   var oTime1 = oDay1 + '/' + oMonth1 + '/' + oYear1
      //   item.createTime = oTime1
      // })
      this.dataSource = data
      console.log(data, '646464')
    },

    // 添加按钮的点击事件
    addClick () {
      this.showAddRole = true
    },
    // 删除按钮触发事件
    async deleteClick () {
      // 1.如果没有勾选就点击删除按钮，提示框
      if (this.selectedRowKeys.length == 0) {
        confirm('请勾选要删除的模块')
        return
      }
      if (this.selectedRowKeys.length > 0) {
        confirm('删除后可能会影响使用功能的使用，您确定继续？')
      }
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      debugger
      await this.RoleMObj.deleteRole(this.selectedRowKeys)
      // 4.删除成功后，及时更新数据，清除勾选图标
      await this.getData()
      this.selectedRowKeys = []
    },

    accredit () {
      this.$router.push({ name: 'RoleAccredit' })
    },
    // 编辑按钮的点击事件
    btnClick (record) {
      this.showEditRole = true
      this.editId = record.id * 1
    },

    // 修改角色状态的点击事件
    async updataState (record) {
      // 调用切换状态接口方法
      await this.RoleMObj.openRole(record.id * 1, (record.enable - 1 == 0 ? 0 : 1))
      // 及时刷新数据
      await this.getData()
    },
    // 删除的勾选事件
    onSelectChange (selectedRowKeys, bb) {
      debugger
      this.selectedRowKeys = selectedRowKeys
      console.log(selectedRowKeys, '死死死死死死死死死死死死')
    },
    // 设置每行id为主键
    setKey (record) {
      return record.id
    },
    // 添加弹框的取消事件
    cancelAddRole () {
      this.showAddRole = false
    },
    // 添加弹框的保存事件
    async saveAddRole () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        debugger
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          const st = await _this.RoleMObj.saveRole(formData)
          debugger
          console.log(st)
          if (st.code == 200) {
            await _this.getData()
            _this.showAddRole = false
          }
          // 重新加载最新的数据
        } else {

        }
      })
    },
    // 编辑弹框的取消事件
    cancelEditRole () {
      this.showEditRole = false
    },
    // 编辑弹框的确认事件
    async saveEditRole () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.id = this.editId
          await _this.RoleMObj.updateRole(formData)
          // 重新加载最新的数据
          await _this.getData()
        }
        _this.showEditRole = false
      })
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin: 0 32px;
}
  .role-table{
    background-color: #fff;
  }
</style>
