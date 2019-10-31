<template>
  <div>
    <div style="display: flex;flex-direction: row;justify-content: space-between;background-color: #fff;padding: 16px 32px 0 32px">
      <div style="display: flex;flex-direction: row;">
        <common-drop-down
          :result="result"
          :defaultValue="defaultValue"
          @selectCell="selectCell"
          class="com-drop-down">
        </common-drop-down>
        <!--搜索框-->
        <common-search
          :placeholder="version"
          style="width: 220px;float: none"
          @inputHandler="inputHandler">

        </common-search>
      </div>
      <!--按钮-->
      <common-button
        style="float: none;"
        :name1="name1"
        :name2="name2"
        :title="'删除后可能会影响使用功能的使用，您确定继续？'"
        :disabled="selectedRowKeys.length>0?true:false"
        @addClick="addClick"
        @deleteClick="deleteClick">
      </common-button>
    </div>
    <a-table
      class="apply-table"
      :pagination="pagination"
      size="small"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="setKey"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <!--应用名称-->
      <template
        slot="applyName"
        slot-scope="text, record">
        <div style="display: flex;flex-direction: row;align-items: center">

          <span v-if="record.iconUrl" style="margin-right: 4px;">
            <img :src="record.iconUrl" style="width:35px;height: 35px;border-radius: 4px;"/>
          </span>
          <span >
            {{ text }}
          </span>
        </div>

      </template>
      <!--操作-->
      <template
        slot="caozuo"
        slot-scope="text, record">
        <div style="display: flex;flex-direction: row;align-items: center;">
          <span @click="btnClickEdit(record)" style="margin: 0 4px;">
            <a-icon
              type="edit"
              style="margin-left: 4px;cursor: pointer;"
              title="编辑" /></span>
          <span @click="btnClick(record)">
            <a-icon
              type="setting"
              style="margin-left: 4px;cursor: pointer;"
              title="服务配置" />
          </span>
        </div>

      </template>
      <!--状态-->
      <template
        slot="zhuangtai"
        slot-scope="text, record">
        <!--1代表开-->
        <span style="margin-right: 4px;">{{ record.enable==1?'启用':'禁用' }}</span>
        <!--<a-switch :defaultChecked="record.name2==1?true:false" style="pointer-events:none"/>-->
        <a-popover
          trigger="click"
          v-model="applyState"
          v-if="record.enable==1 && active==record.id">
          <template slot="title">
            <div style="margin: 5px 0;">
              <span>
                <a-icon
                  type="exclamation-circle"
                  style="color: #FAAD14;width: 14px;height: 14px;" />你确定禁用这个应用吗？
              </span>
            </div>
          </template>
          <template slot="content">
            <div style="display: flex;justify-content: flex-end; margin: 5px 10px;">
              <a-button
                style="margin-right: 10px;"
                @click="cancelActive">取消</a-button>
              <a-button
                type="primary"
                @click="saveActive(record)">保存</a-button>
            </div>
          </template>
          <span @click="spanClick(record)">
            <a-switch
              :defaultChecked="record.enable==1?true:false"
              style="pointer-events:none" /></span>
        </a-popover>
        <span v-if="record.enable==0">
          <a-switch
            :defaultChecked="record.enable==1?true:false"
            @click="open(record)" />
        </span>
        <span
          @click="spanClick(record)"
          v-if="record.enable==1 && active!=record.id">
          <a-switch :defaultChecked="record.enable==1?true:false" />
        </span>

      </template>

    </a-table>
    <!--服务设置-->
    <a-modal
      v-model="ServiceSetting"
      :title="title">
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
    <!--添加应用-->
    <a-modal
      v-model="showAddApply"
      :destroyOnClose="true"
      :width="350"
      title="添加应用">
      <a-form :form="form1" autocomplete="off">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入"
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入应用名称！' }] },
            ]" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            placeholder="请输入描述"
            v-decorator="['note']" />
        </a-form-item>
        <a-form-item
          label="图标"
          class="form1-icon">
          <a-upload
            name="file"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
            listType="picture-card"
            class="avatar-uploader"
            :customRequest="customRequest"
            :disabled="disable"
            v-decorator="['iconId']">
            <img
              v-if="fileList.url"
              :src="fileList.url"
              alt="avatar"
            />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
          <span>只能上传jpg/png文件， 且不超过500kb</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          key="back"
          @click="cancelSave">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          @click="saveApplyOk">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
    <!--编辑应用-->
    <a-modal
      v-model="showEditApply"
      v-if="editApply"
      title="编辑应用">
      <a-form :form="form1">
        <a-form-item label="名称">
          <a-input
            placeholder="请输入"
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入牌照名称！' }],initialValue: editApply.name},
            ]" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            placeholder="请输入描述"
            v-decorator="['note',{initialValue: editApply.note}]" />
        </a-form-item>
        <a-form-item
          label="图标"
          class="form1-icon">
          <a-upload
            name="file"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
            listType="picture-card"
            class="avatar-uploader"
            :customRequest="customRequest"
            :disabled="disable"
            v-decorator="[
              'iconId'
            ]">
            <img
              v-if="fileList.url"
              :src="fileList.url"
              alt="avatar"
            />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
          <span>只能上传jpg/png/svg文件， 且不超过500kb</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          key="back"
          @click="cancelEdit">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          @click="editApplyOk">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import CnbiApplyManagement from '@/classes/lib/CnbiApplyManagement'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import CommonButton from '@/components/system/common-button'
import CommonSearch from '@/components/system/common-search'
import CommonDropDown from '@/components/system/common-drop-down'
import { uploadFile } from '@/api/common'
export default {
  components: {
    CommonButton,
    CommonSearch,
    CommonDropDown,
    AFormItem
  },
  name: 'ApplyManagement',
  data () {
    return {
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      ApplyMObj: null,
      version: '关键字搜索',
      defaultValue: 'name',
      name1: '添加应用',
      title: '',
      name2: '删除',
      result: [
        { name: '应用名称', key: 'name' },
        { name: '应用描述', key: 'note' }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '应用名称',
          dataIndex: 'name',
          width: '20%',
          scopedSlots: { customRender: 'applyName' }
        },
        {
          title: '应用描述',
          dataIndex: 'note',
          width: '50%'
        },
        {
          title: '状态',
          dataIndex: 'enable',
          scopedSlots: { customRender: 'zhuangtai' },
          width: '20%'
        },
        { title: '操作',
          dataIndex: '',
          key: 'x',
          width: '10%',
          scopedSlots: { customRender: 'caozuo' }
        }
      ],
      dataSource: [],
      disable: false,
      imageUrl: '',
      loading: false,
      ServiceSetting: false, // 服务配置
      showAddApply: false, // 添加应用
      showEditApply: false, // 编辑应用
      editApply: null, // 要编辑的应用信息
      form: this.$form.createForm(this), // 服务配置弹框
      form1: this.$form.createForm(this), // 添加应用弹框
      active: '',
      applyState: false,
      editId: null, // 点击编辑的时候该行数据对应的id
      selectVal: 'name',
      dataOld: [], // 拷贝获取的原有数据
      fileList: {
        url: '',
        iconId: ''
      }
    }
  },
  created () {
    this.ApplyMObj = new CnbiApplyManagement()
    this.getData()
  },
  methods: {
    // 获取列表数据
    async getData () {
      const data = await this.ApplyMObj.getResourcesCard()
      this.dataSource = data

      // 拷贝数据
      this.dataOld = this.deepCopy(this.dataSource)
    },
    // 搜索的第一个下拉框的事件
    selectCell (val1) {
      this.selectVal = val1
    },
    // 点击搜索框的事件
    async inputHandler (val2) {
      if (!val2) {
        this.dataSource = this.dataOld
      } else {
        this.dataSource = await this.ApplyMObj.searchResources(this.selectVal, val2, 3)
      }
    },
    // 点击服务设置按钮事件
    btnClick (record) {
      // this.ServiceSetting = true
      this.title = 'XX应用服务配置'
    },
    btnClickEdit (record) {
      this.fileList.iconId = record.iconId
      this.fileList.url = record.iconUrl
      this.showEditApply = true
      this.editId = record.id * 1
      this.editApply = record
    },

    // 添加按钮事件
    addClick () {
      this.showAddApply = true
      this.fileList.iconId = ''
      this.fileList.url = ''
    },

    // 勾选事件
    onSelectChange (selectedRowKeys, bb, cc) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 设置每行id为主键
    setKey (record) {
      return record.id
    },
    // 删除按钮事件
    async deleteClick () {
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      await this.ApplyMObj.batDeleteApp(this.selectedRowKeys)
      // 4.删除成功后，及时更新数据，清除勾选图标
      await this.getData()
      this.selectedRowKeys = []
    },
    cancelActive () {
      this.active = ''
    },
    // 当状态为启用的时候，想修改为禁用的时候确认事件
    async saveActive (record) {
      this.active = ''
      await this.ApplyMObj.openResource(record.id * 1, (record.enable - 1 == 0 ? 0 : 1))
      // 刷新数据
      await this.getData()
    },

    // 当状态为禁用时，改为启用的点击事件
    async open (record) {
      await this.ApplyMObj.openResource(record.id * 1, (record.enable - 0 == 0 ? 1 : 0))
      // 刷新数据
      await this.getData()
    },
    spanClick (record) {
      this.active = record.id
    },
    beforeUpload (file) {
      const fileType = ['image/jpeg', 'image/png', 'image/svg+xml']
      const isImg = fileType.indexOf(file.type) > -1
      if (!isImg) {
        this.$message.error('只能jpg、png、svg图片！')
      }
      const isLt500kb = file.size / 1024 < 500
      if (!isLt500kb) {
        this.$message.error('图片不能超过500kb！')
      }
      return isLt500kb && isImg
    },
    customRequest (data) {
      const _this = this
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('playtime', '0')
      formData.append('bizId', 'cs')
      formData.append('bizCode', 'cs')
      uploadFile(formData).then(function (res) {
        if (res.code === 200) {
          _this.fileList.url = res.data.thumbUrl
          _this.fileList.iconId = res.data.id
        }
      })
    },

    // 添加应用弹框点击取消事件
    cancelSave () {
      this.showAddApply = false
    },
    // 编辑弹框点击取消事件
    cancelEdit () {
      this.showEditApply = false
    },
    // 添加应用-保存按钮
    saveApplyOk () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          if (formData.iconId) {
            formData.iconId = _this.fileList.iconId
          }
          // t添加成功，更新数据
          formData.type = 3
          await _this.ApplyMObj.saveResource(formData)
          _this.showAddApply = false
          // 重新加载最新的数据
          await _this.getData()
        }
      })
    },
    // 编辑应用-保存按钮
    editApplyOk () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          // 添加成功，更新数据
          formData.id = this.editId
          formData.type = 3
          if (_this.fileList.iconId) {
            formData.iconId = _this.fileList.iconId
          }
          await _this.ApplyMObj.updateResource(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showEditApply = false
        }
      })
    },
    /**
     * 深拷贝
     */
    deepCopy (obj) { // 深拷贝
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
.form1-icon .ant-form-item-children {
  display: flex;
  align-items: center;
}
.apply-table {
  background-color: #fff;
}
</style>
