<template>
  <div>

    <div style="display: flex;justify-content: flex-end;background-color: #fff;padding: 16px 32px 0 32px">
      <common-button
        style="float: none;"
        :name1="name1"
        :name2="name2"
        :disabled="selectedRowKeys.length>0?true:false"
        :title="'删除后可能会影响使用功能的使用，您确定继续？'"
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
      :rowClassName="setStyle"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <!--应用名称-->
      <template
        slot="thirdPartyName"
        slot-scope="text, record">
        <div style="display: flex;flex-direction: row;align-items: center">

          <span
            v-if="record.iconFile"
            style="margin-right: 18px;">
            <img
              :src="record.iconFile.url"
              style="width:64px;height: 64px;border-radius: 4px;background:rgba(112,55,55,1);opacity:1;" />
          </span>
          <span
            v-else
            style="margin-right: 18px;">
            <img
              src=" https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3255435584,2194151633&fm=111&gp=0.jpg"
              style="width:64px;height: 64px;border-radius: 4px;background:rgba(112,55,55,1);opacity:1;" />
          </span>
          <span>
            {{ text }}
          </span>
        </div>
      </template>
      <!--编辑-->
      <template
        slot="caozuo"
        slot-scope="text, record">
        <div>
          <span @click="btnClickEdit(record)">
            <img
              style="cursor: pointer;"
              src="@icons/Icon.svg"
              title="编辑">
          </span>
        </div>
      </template>
      <!--状态-->
      <template
        slot="zhuangtai"
        slot-scope="text, record">
        <!--1代表开-->
        <span style="margin-right: 15px">{{ record.enable==1?'启用':'禁用' }}</span>
        <a-switch
          :defaultChecked="record.enable==1?true:false"
          @click="changeState(record)" />
      </template>
    </a-table>
    <!--添加接入-->
    <a-modal
      title="添加接入"
      v-model="showAddApply"
      :maskClosable="false"
      :destroyOnClose="true">
      <a-form
        :form="form"
        autocomplete="off">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input
                placeholder="请输入"
                v-decorator="['name',{ rules: [{ required: true, message: '请输入名称！' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="回调地址">
              <a-input
                placeholder="请输入"
                v-decorator="['redirectUri',{ rules: [{ required: true, message: '请输入回调地址！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="TOKEN">
              <a-input
                placeholder="请输入"
                v-decorator="['appId',{ rules: [{ required: true, message: '请输入TOKEN！' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="APIKEY">
              <a-input
                placeholder="请输入"
                v-decorator="['appKey',{ rules: [{ required: true, message: '请输入APIKEY！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="类型">
                  <a-select
                    style="width: 224px;"
                    v-decorator="['type',{rules: [{ required: true, message: '请选择类型!' }],}]">
                    <template slot="suffixIcon">
                      <img src="@icons/sort.svg" />
                    </template>
                    <a-select-option
                      :value="item.value"
                      v-for="(item ,index) in typeArr"
                      :key="index">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
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
                    v-decorator="['icon']">
                    <img
                      v-if="fileList.url"
                      :src="fileList.url"
                      alt="avatar" />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">点击上传</div>
                    </div>

                  </a-upload>
                  <span>只能上传svg/jpg/png文件， 且不超过500kb</span>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="12">
            <a-form-item label="描述">
              <a-textarea
                :rows="6"
                placeholder="请输入"
                v-decorator="['note',{ rules: [{ required: true, message: '请输入描述' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <div style="display: flex;padding: 0 8px;">
          <a-button
            key="back"
            @click="cancelAddApply"
            style="margin-right: 16px">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveAddApply">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
    <a-modal
      title="编辑应用"
      :maskClosable="false"
      v-model="showEditApply"
      v-if="editApply">
      <a-form
        :form="form1"
        autocomplete="off">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input
                placeholder="请输入"
                v-decorator="['name',{ rules: [{ required: true, message: '请输入名称！' }] ,initialValue: editApply.name}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="回调地址">
              <a-input
                placeholder="请输入"
                v-decorator="['redirectUri',{ rules: [{ required: true, message: '请输入回调地址！' }] ,initialValue: editApply.redirectUri}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="TOKEN">
              <a-input
                placeholder="请输入"
                v-decorator="['appId',{ rules: [{ required: true, message: '请输入TOKEN！' }] ,initialValue: editApply.appId}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="APIKEY">
              <a-input
                placeholder="请输入"
                v-decorator="['appKey',{ rules: [{ required: true, message: '请输入APIKEY！' }],initialValue: editApply.appKey }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="类型">

                  <a-select
                    style="width: 224px;"
                    v-decorator="['type',{rules: [{ required: true, message: '请选择类型!' }],initialValue: editApply.type}]">
                    <template slot="suffixIcon">
                      <img src="@icons/sort.svg" />
                    </template>
                    <a-select-option
                      :value="item.value"
                      v-for="(item ,index) in typeArr"
                      :key="index">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
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
                    v-decorator="['icon']">
                    <img
                      v-if="fileList.url"
                      :src="fileList.url"
                      alt="avatar" />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">点击上传</div>
                    </div>

                  </a-upload>
                  <span>只能上传svg/jpg/png文件， 且不超过500kb</span>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="12">
            <a-form-item label="描述">
              <a-textarea
                :rows="6"
                placeholder="请输入"
                v-decorator="['note',{ rules: [{ required: true, message: '请输入描述！' }] ,initialValue: editApply.note}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <div style="display: flex;padding: 0 8px;">
          <a-button
            key="back"
            @click="cancelEditApply"
            style="margin-right: 16px">取消</a-button>
          <a-button
            key="submit"
            type="primary"
            @click="saveEditApply">
            <a-icon type="cloud-upload" /> 保存
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import CnbiThirdPartyApply from '@/classes/lib/CnbiThirdPartyApply'
import CommonButton from '@/components/system/common-button'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import ATextarea from 'ant-design-vue/es/input/TextArea'
import { uploadFile } from '@/api/common'
import ACol from 'ant-design-vue/es/grid/Col'
export default {
  components: {
    ACol,
    ATextarea,
    AFormItem,
    CommonButton
  },
  name: 'ThirdPartyApply',
  data () {
    return {
      ThirdPartyApplyObj: null,
      pagination: {
        pageSize: 7,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      name1: '添加接入',
      name2: '删除',
      selectedRowKeys: [],
      typeArr: [{
        name: 'QQ',
        value: '0'
      }, {
        name: '微信',
        value: '1'
      }, {
        name: '支付宝',
        value: '2'
      }, {
        name: '钉钉',
        value: '3'
      }, {
        name: '新浪微博',
        value: '4'
      }],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          width: '20%',
          scopedSlots: { customRender: 'thirdPartyName' }
        },
        {
          title: '描述',
          dataIndex: 'note',
          width: '50%'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
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
        {
          title: '状态',
          dataIndex: 'enable',
          width: '10%',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        { title: '操作',
          dataIndex: '',
          key: 'x',
          width: '10%',
          scopedSlots: { customRender: 'caozuo' }
        }
      ],
      dataSource: [],
      showAddApply: false, // 添加应用
      showEditApply: false,
      editApply: null, // 要编辑的应用信息
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      disable: false,
      imageUrl: '',
      loading: false,
      editId: null, // 点击编辑的时候该行数据对应的id
      fileList: {
        url: '',
        icon: ''
      } // 图片上传
    }
  },
  created () {
    this.ThirdPartyApplyObj = new CnbiThirdPartyApply()
    this.getData()
  },
  methods: {
    // 进入页面，加载数据
    async getData () {
      const data = await this.ThirdPartyApplyObj.getTpApp()
      this.dataSource = data
      console.log(data, '不知什么时候，就僵了')
    },
    addClick () {
      this.showAddApply = true
      this.fileList.url = ''
      this.fileList.icon = ''
    },
    // 删除按钮的点击事件
    async  deleteClick () {
      // 2.如果勾选了，则获取勾选的id数组
      // 3.调用删除接口，传入参数，删除
      await this.ThirdPartyApplyObj.deleteTpApp(this.selectedRowKeys)
      // 4.删除成功后，及时更新数据，清除勾选图标
      await this.getData()
      this.selectedRowKeys = []
    },
    // 修改状态的点击事件
    async changeState (record) {
      // 调用切换状态接口方法
      debugger
      await this.ThirdPartyApplyObj.enableApp(record.id * 1, (record.enable - 1 == 0 ? 0 : 1))
      // 及时刷新数据
      await this.getData()
    },
    // 删除的勾选事件
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    // 设置每行id为主键
    setKey (record) {
      return record.id
    },
    // 设置每行class名称
    setStyle () {
      return 'table-row'
    },
    // 编辑按钮的点击事件
    btnClickEdit (record) {
      debugger
      this.showEditApply = true
      this.editId = record.id * 1
      if (this.fileList.url = record.iconFile) {
        this.fileList.url = record.iconFile.thumbUrl
      } else {
        this.fileList.url = ''
      }
      if (record.icon) {
        this.fileList.icon = record.icon
      } else {
        this.fileList.icon = ''
      }
      this.fileList.icon = record.icon
      this.editApply = record
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
          _this.fileList.icon = res.data.id
        }
      })
    },
    // 添加弹框的取消按钮事件
    cancelAddApply () {
      this.showAddApply = false
    },
    // 添加弹框的确定按钮事件
    saveAddApply () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          if (formData.icon) {
            formData.icon = _this.fileList.icon
          }
          // t添加成功，更新数据
          await _this.ThirdPartyApplyObj.postTpApp(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showAddApply = false
        }
      })
    },

    // 编辑弹框的取消按钮事件
    cancelEditApply () {
      this.showEditApply = false
    },
    // 编辑弹框的确定按钮事件
    async saveEditApply () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          formData.id = this.editId
          if (_this.fileList.icon) {
            formData.icon = _this.fileList.icon
          }
          // 添加成功，更新数据
          await _this.ThirdPartyApplyObj.putTpApp(formData)
          // 重新加载最新的数据
          await _this.getData()
          _this.showEditApply = false
        }
      })
    }
  }
}
</script>

<style scoped>
/* /deep/.form1-icon .ant-form-item-children{
    display: flex;
  }*/
/deep/.ant-form-item {
  margin-bottom: 0;
}
.apply-table {
  background-color: #fff;
}
/deep/.table-row {
  height: 87px;
}
/deep/.ant-table-thead > tr > th {
  height: 47px;
}
form .ant-form-item {
  margin-bottom: 0;
}
</style>
