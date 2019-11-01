<template>
  <div>
    <!--头部-->
    <div style="display: flex;flex-direction: row;justify-content: space-between;background-color: #fff;padding: 16px 32px 0 32px">
      <div style="display: flex;flex-direction: row">
        <common-drop-down :result="result"
                          :defaultValue="'nickName'"
                          @selectCell="selectCell"
                          class="com-drop-down">
        </common-drop-down>
        <!--搜索框-->
        <common-search :placeholder="version"
                       style="width: 220px"
                       @inputHandler="inputHandler"></common-search>
      </div>
      <common-button @addClick="addClick"
                     @deleteClick="deleteClick"
                     :title="'删除操作风险过大，暂不支持删除!'"
                     :disabled="selectedRowKeys.length>0?true:false"
                     :name1="name1"
                     :name2="name2">
      </common-button>
    </div>
    <div>
      <!--表格-->
      <a-table class="user-table"
               :pagination="pagination"
               size="small"
               :columns="columns"
               :dataSource="dataSource"
               :rowKey="setKey"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
        <template slot="zhuangtai"
                  slot-scope="text, record">
          <!--1代表开-->
          <a-switch :defaultChecked="record.enable==1?true:false"
                    @change="updataState(record)" />
        </template>
        <template slot="xiangqing"
                  slot-scope="text, record">
          <!--1代表开-->
          <span @click="btnClick(record)">
            <img style="margin-left: 16px;cursor: pointer;"
                 src="@icons/xiangqing.svg"
                 title="详情">
          </span>
        </template>
      </a-table>
    </div>
    <a-modal v-model="showAddUser"
             title="添加用户"
             :destroyOnClose="true">
      <a-form :form="form"
              autocomplete="off"
              class="addUser-table">
        <a-form-item label="昵称">
          <a-input placeholder="请输入昵称"
                   v-decorator="[
              'nickname',
              { rules: [{ required: true, message: '请输入昵称！' }] },
            ]" />
        </a-form-item>
        <a-form-item label="性别"
                     class="table-sex">
          <a-radio-group name="sex "
                         v-decorator="['sex',{ initialValue: 54 }]">
            <a-radio :value="54">男</a-radio>
            <a-radio :value="55">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-decorator="['password',
                          { rules: [ { required: true,
                                       message: '请输入密码!',
                                     },
                                     {
                                       validator: validateToNextPassword,
                                     },
                          ],},
            ]"
                   type="password" />
        </a-form-item>
        <a-form-item label="再次输入密码">
          <a-input v-decorator="['confirm',
                          {rules: [ {
                                      required: true,
                                      message: '请确认你的密码!',
                                    },
                                    {
                                      validator: compareToFirstPassword,
                                    },
                          ],},
            ]"
                   type="password"
                   @blur="handleConfirmBlur" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input placeholder="请输入"
                   v-decorator="['email',{rules:[{pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message: '请输入正确的邮箱'}]}]" />
        </a-form-item>
        <a-form-item label="手机号">
          <a-input placeholder="请输入"
                   v-decorator="['phone',{rules: [{ required: true,pattern:/^[1][3,4,5,7,6,8][0-9]{9}$/, message: '请输入正确的手机号' }]}]" />
        </a-form-item>
      </a-form>
      <template slot="footer"
                style="display: flex">
        <a-button key="back"
                  @click="cancelAddUser">取消</a-button>
        <a-button key="submit"
                  type="primary"
                  @click="saveAddUser">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import CnbiUserManagement from '@/classes/lib/CnbiUserManagement'
import CommonButton from '@/components/system/common-button'
import CommonSearch from '@/components/system/common-search'
import CommonDropDown from '@/components/system/common-drop-down'
import AFormItem from 'ant-design-vue/es/form/FormItem'
export default {
  components: {
    AFormItem,
    CommonButton,
    CommonSearch,
    CommonDropDown
  },
  name: 'UserManagement',
  data () {
    return {
      UserMObj: null,
      dataOld: [], // 拷贝获取的原有数据
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      version: '请输入',
      name1: '添加',
      name2: '删除',
      showAddUser: false,
      form: this.$form.createForm(this),
      confirmDirty: false,
      selectedRowKeys: [],
      result: [
        {
          name: '昵称',
          key: 'nickName'
        },
        {
          name: '用户名',
          key: 'username'
        },
        {
          name: '手机号',
          key: 'phone'
        },
        {
          name: '邮箱',
          key: 'email'
        }
      ],
      columns: [
        {          title: '昵称',
          dataIndex: 'nickName'
        },
        {          title: '用户名',
          dataIndex: 'username'
        },
        {          title: '手机号',
          dataIndex: 'phone'
        },
        {          title: '邮箱',
          dataIndex: 'email'
        },
        {          title: '创建时间',
          dataIndex: 'createTime',
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
        {          title: '更新时间',
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
        {          title: '状态',
          dataIndex: 'enable',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        {          title: '操作',
          dataIndex: 'name7',
          scopedSlots: { customRender: 'xiangqing' }
        }
      ],
      dataSource: [],
      selectVal: 'nickName'
    }
  },
  created () {
    this.UserMObj = new CnbiUserManagement()
    this.getData()
  },
  methods: {
    // 加载页面 获取数据
    async getData () {
      debugger
      const data = await this.UserMObj.getUserSimpleInfoList()
      console.log(data, '往事如风')
      this.dataSource = data

      // 拷贝数据
      this.dataOld = this.deepCopy(this.dataSource)
    },
    // 添加按钮的点击事件
    addClick () {
      this.showAddUser = true
    },
    // 删除按钮
    deleteClick () {
      this.selectedRowKeys = []
    },
    setKey (record) {
      return record.id
    },
    // 模糊查询第一个框的选择事件
    selectCell (val1) {
      this.selectVal = val1
    },
    // 点击搜索框的事件
    async inputHandler (val2) {
      if (!val2 || this.selectVal == 0) {
        debugger
        this.dataSource = this.dataOld
      } else {
        this.dataSource = await this.UserMObj.getUserSimpleInfoList({ field: this.selectVal, value: val2 })
      }
    },
    // 修改状态的点击事件
    async updataState (record) {
      // 调用切换状态接口方法
      await this.UserMObj.enableUser(record.id * 1, (record.enable - 1 == 0 ? 0 : 1))
      // 及时刷新数据
      await this.getData()
    },

    // 删除的勾选事件
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 详情按钮的点击事件
    btnClick (key) {
      this.$router.push({
        name: 'UserDetail',
        query: {
          id: key
        }
      })
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码不一致！')
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },

    // 添加弹框的取消按钮事件
    cancelAddUser () {
      this.showAddUser = false
    },

    // 添加弹框的确定按钮事件
    async saveAddUser () {
      const _this = this
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          await _this.UserMObj.adminSave(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showAddUser = false
        }
      })
    },
    /**
    * 深拷贝
    */
    deepCopy (obj) {
      const result = Array.isArray(obj) ? [] : {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] == null) {
            result[key] = null
          } else if (obj[key] == undefined) {
            result[key] = undefined
          } else if (typeof obj[key] === 'object') {
            result[key] = this.deepCopy(obj[key]) // 递归复制
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    }
  }
}
</script>

<style scoped>
.com-drop-down {
  width: 120px;
}
.addUser-table {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.addUser-table input {
  width: 200px;
}
.table-sex {
  display: flex;
}
.user-table {
  background-color: #fff;
}
</style>
