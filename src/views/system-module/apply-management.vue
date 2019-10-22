<template>
  <div>
    <div style="display: flex;flex-direction: row;justify-content: space-between">
      <div style="display: flex;flex-direction: row;">
        <common-drop-down
          :result="result"
          :defaultValue="defaultValue"
          @selectCell="selectCell"
          class="com-drop-down"
        >
        </common-drop-down>
        <!--搜索框-->
        <common-search
          :placeholder="version"
          style="width: 220px;float: none">

        </common-search>
      </div>
      <!--按钮-->
      <common-button
        style="float: none;"
        :name1="name1"
        :name2="name2"
        @addClick="addClick"
        @deleteClick="deleteClick">
      </common-button>
    </div>
    <a-table
      class="apply-table"
      bordered
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" >
      <template slot="caozuo" slot-scope="text, record">
        <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;">
          <span @click="btnClickEdit(record)"><a-icon type="edit" style="margin-left: 4px;cursor: pointer;" title="编辑"/></span>
          <span @click="btnClick(record)"><a-icon type="setting" style="margin-left: 4px;cursor: pointer;" title="服务配置"/></span>
        </div>

      </template>
      <template slot="zhuangtai" slot-scope="text, record">
        <!--1代表开-->
        <span style="margin-right: 4px;">{{ record.name2==1?'启用':'禁用' }}</span>
        <!--<a-switch :defaultChecked="record.name2==1?true:false" style="pointer-events:none"/>-->
        <a-popover trigger="click" v-model="applyState" v-if="record.name2==1">
          <template slot="title">
            <div style="margin: 5px 0;">
              <span>
                <a-icon type="exclamation-circle" style="color: #FAAD14;width: 14px;height: 14px;"/>你确定禁用这个应用吗？
              </span>
            </div>
          </template>
          <template slot="content" >
            <div style="display: flex;justify-content: flex-end; margin: 5px 10px;">
              <a-button style="margin-right: 10px;" @click="cancelActive">取消</a-button>
              <a-button type="primary" @click="saveActive">保存</a-button>
            </div>
          </template>
          <span @click="spanClick(record)"><a-switch :defaultChecked="record.name2==1?true:false" style="pointer-events:none"/></span>
        </a-popover>
        <span
          v-if="record.name2==0">
          <a-switch :defaultChecked="record.name2==1?true:false"/>
        </span>

      </template>
    </a-table>
    <a-modal v-model="ServiceSetting" :title="title">
      <form :form="form">
        <a-row
          :gutter="24"
          class="row1">
          <a-col :span="12">
            <a-form-item label="数据库IP">
              <a-input
                placeholder="请输入数据库IP"
                v-decorator="['name',{rules: [{ required: true, message: '数据库IP不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="端口">
              <a-input
                placeholder="请输入端口"
                v-decorator="['name',{rules: [{ required: true, message: '端口不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </form>
    </a-modal>
    <a-modal v-model="showAddApply" title="添加应用">
      <a-form :form="form1">
        <a-form-item label="牌照名称" >
          <a-input
            placeholder="请输入"
            v-decorator="[
              'a',
              { rules: [{ required: true, message: '请输入牌照名称！' }] },
            ]"/>
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            placeholder="请输入描述"
          />
        </a-form-item>
        <a-form-item label="图标" class="form1-icon">
          <a-upload
            name="file"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
            listType="picture-card"
            class="avatar-uploader"
            :customRequest="customRequest"
            :disabled="disable"
            v-decorator="[
              'c',
              { rules: [{ required: true, message: '请上传图标！' }] },
            ]"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="avatar"
              v-decorator="['logoId']" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
          <span>只能上传jpg/png文件， 且不超过500kb</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button key="back" @click="cancelSave">取消</a-button>
        <a-button key="submit" type="primary" @click="saveApply">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
    <a-modal v-model="showEditApply" title="编辑应用">
      <a-form :form="form1">
        <a-form-item label="牌照名称" >
          <a-input
            placeholder="请输入"
            v-decorator="[
              'a',
              { rules: [{ required: true, message: '请输入牌照名称！' }] },
            ]"/>
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            placeholder="请输入描述"
          />
        </a-form-item>
        <a-form-item label="图标" class="form1-icon">
          <a-upload
            name="file"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
            listType="picture-card"
            class="avatar-uploader"
            :customRequest="customRequest"
            :disabled="disable"
            v-decorator="[
              'c',
              { rules: [{ required: true, message: '请上传图标！' }] },
            ]"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="avatar"
              v-decorator="['logoId']" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
          <span>只能上传jpg/png文件， 且不超过500kb</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button key="back" @click="cancelSave">取消</a-button>
        <a-button key="submit" type="primary" @click="saveApply">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import AFormItem from 'ant-design-vue/es/form/FormItem'
import CommonButton from '@/components/system/common-button'
import CommonSearch from '@/components/system/common-search'
import CommonDropDown from '@/components/system/common-drop-down'
export default {
  components: {
    CommonButton,
    CommonSearch,
    CommonDropDown,
    AFormItem
  },
  data () {
    return {
      version: '关键字搜索',
      defaultValue: '0',
      name1: '添加应用',
      title: '',
      name2: '删除',
      result: [
        { name: '应用名称', key: '0' },
        { name: '应用描述', key: '1' },
        { name: '状态', key: '2' }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '应用名称',
          dataIndex: 'name'
        },
        {
          title: '应用描述',
          dataIndex: 'name1'
        },
        {
          title: '状态',
          dataIndex: 'name2',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        { title: '操作',
          dataIndex: '',
          key: 'x',
          width: '10%',
          scopedSlots: { customRender: 'caozuo' }
        }
      ],
      dataSource: [
        {
          key: '1',
          name: 'hahha',
          name1: '1233',
          name2: 0
        },
        {
          key: '2',
          name: 'hahha',
          name1: '1233',
          name2: 1
        },
        {
          key: '3',
          name: 'hahha',
          name1: '1233',
          name2: 0
        }
      ],
      disable: false,
      imageUrl: '',
      loading: false,
      ServiceSetting: false, // 服务配置
      showAddApply: false, // 添加应用
      showEditApply: false, // 编辑应用
      form: this.$form.createForm(this), // 服务配置弹框
      form1: this.$form.createForm(this), // 添加应用弹框
      active: '',
      applyState: false
    }
  },
  methods: {

    selectCell (val) {

    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    btnClick (record) {
      this.ServiceSetting = true
      this.title = 'XX应用服务配置'
      console.log(record)
    },
    btnClickEdit (record) {
      this.showEditApply = true
    },
    addClick () {
      this.showAddApply = true
    },
    deleteClick () {

    },
    cancelActive () {
      this.active = ''
    },
    saveActive () {
      this.active = ''
    },
    spanClick (record) {
      this.active = record.key
    },
    beforeUpload () {

    },
    customRequest () {

    },
    cancelSave () {
      this.showAddApply = false
    },
    saveApply () {
      this.form1.validateFields(err => {
        if (!err) {
          this.showAddApply = false
        }
      })
    }
  }

}

</script>

<style scoped>
  .com-drop-down{
    width: 120px;
  }
  .form1-icon .ant-form-item-children{
display: flex;
    align-items: center;
  }
</style>
