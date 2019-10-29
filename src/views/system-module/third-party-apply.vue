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
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <template
        slot="caozuo"
        slot-scope="text, record">
        <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;">
          <span
            @click="btnClickEdit(record)"
            style="cursor: pointer">
            <a-icon type="edit" />
          </span>
        </div>
      </template>
      <template
        slot="zhuangtai"
        slot-scope="text, record">
        <!--1代表开-->
        <span style="margin-right: 4px">{{ record.enable==1?'启用':'禁用' }}</span>
        <a-switch
          :defaultChecked="record.enable==1?true:false"
          @click="changeState" />
      </template>
    </a-table>
    <a-modal
      title="添加接入"
      v-model="showAddApply"
      :destroyOnClose="true">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="服务地址">
              <a-input
                placeholder="请输入"
                v-decorator="['name',{ rules: [{ required: true, message: '请输入服务地址！' }] }]" />
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
                v-decorator="['name',{ rules: [{ required: true, message: '请输入TOKEN！' }] }]" />
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
              <a-form-item label="名称">
                <a-input
                  placeholder="请输入"
                  v-decorator="['name',{ rules: [{ required: true, message: '请输入名称！' }] }]" />
              </a-form-item>
            </a-row>
            <a-row :gutter="24">
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
                  v-decorator="['icon',{ rules: [{ required: true, message: '请上传图标！' }] }]">
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
            </a-row>
          </a-col>
          <a-col :span="12">
            <a-form-item label="描述">
              <a-textarea
                :rows="6"
                placeholder="请输入"
                v-decorator="['note',{ rules: [{ required: true, message: '请输入名称！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelAddApply"
            style="margin-right: 32px">取消</a-button>
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
      v-model="showEditApply">
      <a-form :form="form1">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="服务地址">
              <a-input
                placeholder="请输入"
                v-decorator="['name',{ rules: [{ required: true, message: '请输入服务地址！' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="回调地址">
              <a-input
                placeholder="请输入"
                v-decorator="['name',{ rules: [{ required: true, message: '请输入回调地址！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="TOKEN">
              <a-input
                placeholder="请输入"
                v-decorator="['name',{ rules: [{ required: true, message: '请输入TOKEN！' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="APIKEY">
              <a-input
                placeholder="请输入"
                v-decorator="['name',{ rules: [{ required: true, message: '请输入APIKEY！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-row :gutter="24">
              <a-form-item label="名称">
                <a-input
                  placeholder="请输入"
                  v-decorator="['name',{ rules: [{ required: true, message: '请输入名称！' }] }]" />
              </a-form-item>
            </a-row>
            <a-row :gutter="24">
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
                  v-decorator="['iconId',{ rules: [{ required: true, message: '请上传图标！' }] }]">
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
            </a-row>
          </a-col>
          <a-col :span="12">
            <a-form-item label="描述">
              <a-textarea
                :rows="6"
                placeholder="请输入"
                v-decorator="['name',{ rules: [{ required: true, message: '请输入名称！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <div style="display: flex;margin-left: 32px">
          <a-button
            key="back"
            @click="cancelEditApply"
            style="margin-right: 32px">取消</a-button>
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

export default {
  components: {
    ATextarea,
    AFormItem,
    CommonButton
  },
  name: 'ThirdPartyApply',
  data () {
    return {
      ThirdPartyApplyObj: null,
      pagination: {
        pageSize: 15,
        hideOnSinglePage: true // 只有一页时是否隐藏分页器
      },
      name1: '添加接入',
      name2: '删除',
      selectedRowKeys: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          width: '20%'
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
      dataSource: [
        // {
        //   key: '1',
        //   name: 'hahha',
        //   name1: '1233',
        //   name2: 0
        // },
        // {
        //   key: '2',
        //   name: 'hahha',
        //   name1: '1233',
        //   name2: 1
        // },
        // {
        //   key: '3',
        //   name: 'hahha',
        //   name1: '1233',
        //   name2: 0
        // }
      ],
      showAddApply: false, // 添加应用
      showEditApply: false,
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      disable: false,
      imageUrl: '',
      loading: false
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
    changeState () {

    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    btnClickEdit () {
      this.showEditApply = true
    },
    beforeUpload () {

    },
    customRequest () {

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
          // t添加成功，更新数据
          await _this.ThirdPartyApplyObj.postTpApp(formData)
          // 重新加载最新的数据
          await _this.getData()
        }
        _this.showAddApply = false
      })
    },

    // 编辑弹框的取消按钮事件
    cancelEditApply () {
      this.showEditApply = false
    },
    // 编辑弹框的确定按钮事件
    saveEditApply () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          // t添加成功，更新数据
          await _this.ThirdPartyApplyObj.putTpApp(formData)
          // 重新加载最新的数据
          await _this.getData()
        }
        _this.showEditApply = false
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
</style>
