<template>
  <!--角色管理-->
  <div>
    <div style="display: flex;flex-direction: row;justify-content: flex-end">
      <common-button
        style="float: none"
        @addClick="addClick"
        @deleteClick="deleteClick"
        :name1="name1"
        :name2="name2">
      </common-button>
    </div>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
      <template slot="zhuangtai" slot-scope="text, record">
        <!--1代表开-->
        <a-switch :defaultChecked="record.name4==1?true:false" @change="updataState(record)" />
      </template>
      <template slot="caozuo" slot-scope="text, record">
        <!--1代表开-->
        <span @click="btnClick(record)" style="margin-right: 4px;">编辑</span>
        <span @click="accredit(record)">授权</span>
      </template>
    </a-table>
    <!--添加用户-->
    <a-modal v-model="showAddRole" title="添加用户" :width="350">
      <a-form :form="form">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <!--  v-decorator="['name',{rules: [{ required: true, message: '描述不能为空!' }],}]" />-->
        <a-form-item label="描述">
          <a-textarea placeholder="请输入描述"/>
        </a-form-item>
      </a-form>
      <template slot="footer" >
        <div style="display: flex;margin-left: 32px">
          <a-button key="back" @click="cancelAddRole" style="margin-right: 32px">取消</a-button>
          <a-button key="submit" type="primary" @click="saveAddRole">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <a-modal v-model="showEditRole" title="用户信息编辑" :width="350">
      <a-form :form="form1">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea placeholder="请输入描述"/>
        </a-form-item>
      </a-form>
      <template slot="footer" >
        <div style="display: flex;margin-left: 32px">
          <a-button key="back" @click="cancelEditRole" style="margin-right: 32px">取消</a-button>
          <a-button key="submit" type="primary" @click="saveEditRole">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import CommonButton from '@/components/system/common-button'
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  components: {
    ATextarea,
    CommonButton
  },
  data () {
    return {
      name1: '添加',
      name2: '删除',
      selectedRowKeys: [],
      columns: [
        { title: '角色',
          dataIndex: 'name'
        },
        { title: '用户名',
          dataIndex: 'name1'
        },
        { title: '创建时间',
          dataIndex: 'name2'
        },
        { title: '更新时间',
          dataIndex: 'name3'
        },
        { title: '状态',
          dataIndex: 'name4',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        { title: '操作',
          dataIndex: 'name5',
          scopedSlots: { customRender: 'caozuo' }
        }
      ],
      dataSource: [
        {
          key: 1,
          name: '狗蛋',
          name1: '11',
          name2: '22',
          name3: '33',
          name4: '0'
        },
        {
          key: 2,
          name: '狗剩',
          name1: '11',
          name2: '22',
          name3: '33',
          name4: '1'
        },
        {
          key: 3,
          name: '翠花',
          name1: '11',
          name2: '22',
          name3: '33',
          name4: '0'
        },
        {
          key: 4,
          name: '小芳',
          name1: '11',
          name2: '22',
          name3: '33',
          name4: '1'
        }
      ],
      showAddRole: false,
      showEditRole: false,
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this)
    }
  },
  methods: {
    addClick () {
      this.showAddRole = true
    },
    deleteClick () {

    },
    accredit () {
      this.$router.push({ name: 'RoleAccredit' })
    },
    btnClick () {
      this.showEditRole = true
    },
    updataState () {

    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    cancelAddRole () {
      this.showAddRole = false
    },
    saveAddRole () {
      this.showAddRole = false
    },
    cancelEditRole () {
      this.showEditRole = false
    },
    saveEditRole () {
      this.showEditRole = false
    }
  }
}
</script>

<style scoped>
  form{
    display: flex;
    flex-direction: column;
    margin: 0 32px;
  }
</style>
