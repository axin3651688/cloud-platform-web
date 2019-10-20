<template>
  <div>
    <!-- <h1>租户管理 TenantManagement</h1> -->
    <div>
      <!--下拉框-->
      <common-drop-down :name="owner"
                        :result="result"
                        :methodsName="methodsName[0]"
                        @selectOwner="selectOwners"
                        style="float:left;color:#D8DCE6"></common-drop-down>
      <!--搜索框-->
      <common-search :placeholder="version"
                     style="width: 220px"></common-search>
      <!-- <common-search :placeholder="placeholder"
                     style="width: 220px"></common-search> -->
      <!--按钮-->
      <common-button :name1="name1"
                     :name2="name2"
                     @addClick="addClick"
                     @deleteClick="deleteClick">
      </common-button>
      <div style="height:32px"></div>
      <!--表格-->
      <common-table style="margin-top:10px;"
                    :columns="columns"
                    :data="data"></common-table>
    </div>
    <!--添加租户弹框-->
    <a-modal title="添加租户"
             :visible="visible"
             @ok="handleOk"
             @cancel="handleCancel"
             okText="保存"
             cancelText="取消"
             :destroyOnClose="true"
             :width="730">
      <a-form :form="form">
        <!-- 表单第一行 -->
        <a-row :gutter="24"
               class="row1">
          <a-col :span="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称"
                       v-decorator="['name',{rules: [{ required: true, message: '名称不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="营业执照">
              <a-input placeholder="目录"
                       v-decorator="['societyCode',{rules: [{ required: true, message: '营业执照不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 表单第二行 -->
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="所属人">
              <a-select default-value="1"
                        v-decorator="['ownerId',{rules: [{ required: true, message: '请选择所属人!' }],}]">
                <a-select-option value="1">
                  拥有者1
                </a-select-option>
                <a-select-option value="2">
                  拥有者2
                </a-select-option>
                <a-select-option value="3">
                  拥有者3
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所属牌照">
              <a-select default-value="1"
                        v-decorator="['licenseId',{rules: [{ required: true, message: '请选择所属牌照!' }],}]">>
                <a-select-option value="1">
                  基础版
                </a-select-option>
                <a-select-option value="2">
                  旗舰版
                </a-select-option>
                <a-select-option value="3">
                  免费版
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 表单第三行 -->
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="租户类型">
              <a-select default-value="1"
                        v-decorator="['type',{rules: [{ required: true, message: '请选择租户类型!' }],}]">
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
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="服务标识">
              <a-select default-value="1"
                        v-decorator="['serviceId',{rules: [{ required: true, message: '请选择服务标识!' }],}]">
                <a-select-option value="1">
                  服务标识
                </a-select-option>
                <a-select-option value="2">
                  服务标识2
                </a-select-option>
                <a-select-option value="3">
                  服务标识3
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 表单第四行 -->
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="访问地址">
              <a-input addonBefore="Http://"
                       style="width: 329px"
                       placeholder="请输入"
                       v-decorator="['url']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系电话">
              <a-input v-decorator="['phone',{rules: [{ required: true, message: 'Please input your phone number!' }],}]"
                       style="width: 100%">
                <a-select slot="addonBefore"
                          default-value="86"
                          v-decorator="['prefix', { initialValue: '86' }]"
                          style="width: 70px">
                  <a-select-option value="86">
                    +86
                  </a-select-option>
                  <a-select-option value="87">
                    +87
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 表单第五行 -->
        <a-row :gutter="24">
          <a-col :span="12">
            <!-- 第五行左1 -->
            <a-form-item label="租户地址">
              <a-input placeholder="请输入租户地址"
                       v-decorator="['address',{rules: [{ required: true, message: '租户地址不能为空!' }],}]" />
            </a-form-item>
            <!-- 第五行左2 -->
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="生效时间">
                  <a-date-picker @change="onChange"
                                 v-decorator="['beginTime',{rules: [{ required: true, message: '请选择牌照生效时间!' }],}]" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="失效时间">
                  <a-date-picker @change="onChange"
                                 v-decorator="['endTime',{rules: [{ required: true, message: '请选择牌照到期时间!' }],}]" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="12">
            <!-- 第五行右侧企业标识 -->
            <a-form-item label="企业标识">
              <a-upload name="file"
                        :beforeUpload="beforeUpload"
                        :showUploadList="false"
                        listType="picture-card"
                        class="avatar-uploader"
                        :customRequest="customRequest"
                        :disabled="disable">
                <img v-if="imageUrl"
                     :src="imageUrl"
                     alt="avatar"
                     v-decorator="['logoId']" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">点击上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

  </div>
</template>

<script>
import CnbiTenantManagement from '@/classes/lib/CnbiTenantManagement'
import SelectModel from '@/components/system/SelectModel'
import CommonSearch from '@/components/system/common-search'
import CommonTable from '@/components/system/common-table'
import CommonButton from '@/components/system/common-button'
import CommonDropDown from '@/components/system/common-drop-down'
import SystemUpload from '@/views/system/enterpriseSettings/page/Module/SystemUpload'
import { uploadFile } from '@/api/common'
export default {
  components: {
    SelectModel,
    CommonTable,
    CommonButton,
    CommonSearch,
    CommonDropDown,
    SystemUpload
  },
  name: 'TenantManagement',
  data () {
    return {
      form: this.$form.createForm(this),
      TenantMObj: null,
      url: '',
      disable: false,
      loading: false,
      imageUrl: '',
      columns: [{
        title: '名称',
        dataIndex: 'name'
      }, {
        title: '拥有者',
        dataIndex: 'ownerName'
      }, {
        title: '所属牌照',
        dataIndex: 'licenseId'
      }, {
        title: '类型',
        dataIndex: 'type'
      }, {
        title: '更新时间',
        dataIndex: 'updateTime'
      }, {
        title: '到期时间',
        dataIndex: 'endTime'
      }, {
        title: '初始化',
        dataIndex: ''
      },
      { title: '更多', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
      ],
      data: [],
      result: [{ name: '名称', key: '0' }, { name: '拥有者', key: '1' }, { name: '所属牌照', key: '2' }, { name: '类型', key: '3' }],
      name1: '添加租户',
      name2: '删除',
      placeholder: '关键词搜索',
      version: '免费版',
      owner: '拥有者',
      // belongPeople: '拥有者', // 所属人
      // licensePlate: '基础版', // 所属牌照
      // tenantType: '公共部署', // 租户类型
      // serveSign: '服务标识',
      methodsName: ['selectOwner', 'selectBelongPeople', 'selectLicensePlate', 'selectTenantType', 'selectServeSign'],
      visible: false, // 判断是否显示弹框的属性
      previewImage: '',
      previewVisible: false,
      fileList: ['https://tpc.googlesyndication.com/daca_images/simgad/17069283415306529692']
    }
  },
  // watch: {
  //   url: function (newVal) {
  //     this.imageUrl = newVal
  //   }
  // },
  created () {
    this.TenantMObj = new CnbiTenantManagement()
    this.getData()
  },
  methods: {
    // 进入页面  加载数据列表
    async getData () {
      // debugger
      const data = await this.TenantMObj.getTenancyList()
      // console.log('98989', data)
      data.forEach(item => {
        // debugger
        var oDate = new Date(item.updateTime * 1)
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
        item.updateTime = oTime

        var oDate1 = new Date(item.endTime * 1)
        var oYear1 = oDate1.getFullYear()
        var oMonth1 = oDate1.getMonth() + 1
        var oDay1 = oDate1.getDate()
        if (oMonth1 < 10) {
          oMonth1 = '0' + oMonth1
        }
        if (oDay1 < 10) {
          oDay1 = '0' + oDay1
        }
        var oTime1 = oDay1 + '/' + oMonth1 + '/' + oYear1
        item.endTime = oTime1
      })
      this.data = data
    },
    onChange () { },
    addClick () {
      this.visible = true
    },
    deleteClick () {

    },
    // 选择拥有者(查询所有拥有者)
    async selectOwners (val) {
      // debugger
      // const result = await this.TenantMObj.getUserSimpleInfoList();
      // this.result = result.map(item => item.trueName);
      debugger
      console.log(val)
      this.owner = val.key
      console.log('选择拥有者===' + val.key)
    },
    // 选择所属人
    selectBelongPeople (val) {
      this.belongPeople = val.key
      console.log('选择所有人===' + val.key)
    },
    // 所属牌照
    selectLicensePlate (val) {
      this.licensePlate = val.key
      console.log('所属牌照===' + val.key)
    },
    // 租户类型
    selectTenantType (val) {
      this.tenantType = val.key
      console.log('租户类型===' + val.key)
    },
    // 服务标识
    selectServeSign (val) {
      this.serveSign = val.key
      console.log('服务标识===' + val.key)
    },
    // 失效时间
    failureTime (date, dateString) {
      console.log(date, dateString)
    },
    // 生效时间
    accrueTime (date, dateString) {
      console.log(date, dateString)
    },
    // 保存租户（保存按钮）
    async handleOk () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        debugger
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          debugger
          formData.beginTime = new Date(formData.beginTime).getTime();
          formData.endTime = new Date(formData.endTime).getTime();
          formData.checkTime = 1
          formData.checkerId = 2

          await _this.TenantMObj.saveTenancy(formData)
        }
        debugger
        _this.visible = false
      })
      await this.TenantMObj.getTenancyList()
    },
    // 取消保存（取消按钮）
    handleCancel (e) {
      if (this.form) {
        alert('您还未完成添加租户，您确定取消？')
      }
      this.visible = false
    },
    handlePreview (file) {
      console.log('handlePreview===')
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      console.log('handleChange===')
      // this.fileList = fileList
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
          _this.imageUrl = res.data.thumbUrl
          _this.$emit('success', res.data)
        } else {
          _this.$emit('fail', res)
        }
      })
    },
    beforeUpload (file) {
      const fileType = ['image/jpeg', 'image/png', 'image/bmp']
      const isImg = fileType.indexOf(file.type) > -1
      if (!isImg) {
        this.$message.error('只能jpec、png、bmp图片！')
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('图片不能超过5MB！')
      }
      return isLt5M && isImg
    }
  }
}

</script>

<style scoped>
ant .tenantInput {
  width: 220px;
  margin: 0 8px 8px 0;
}
.addTenantDown {
  margin: 0 8px 8px 0;
}
.ant-input-group-wrapper {
  width: 220px;
  margin: 0 8px 8px 0;
}
.amodal-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.amodal-row-cell {
  display: flex;
  flex-direction: column;
}
.upLoad-Button {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.row1 {
  margin-bottom: 0px;
}
</style>
