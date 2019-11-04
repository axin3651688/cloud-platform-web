<template>
  <div>
    <!-- <h1>租户管理 TenantManagement</h1> -->
    <div>
      <div style="display: flex;flex-direction: row;justify-content: space-between;background-color: #fff;padding: 16px 32px 0 32px">
        <div style="display: flex;flex-direction: row;">
          <common-drop-down
            :result="result"
            class="com-drop-down"
            :defaultValue="'name'"
            @selectCell="selectCell">
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
          :title="'删除后无法恢复，您确定继续？'"
          :disabled="tenancyIds.length>0?true:false"
          @addClick="addClick"
          @deleteClick="deleteClick">
        </common-button>
      </div>
      <!--表格-->
      <common-table
        class="tencent-table"
        :columns="columns"
        :data="data"
        @getIds="getIds"
        ref="table"></common-table>
    </div>
    <!--添加租户弹框-->
    <div v-if="visible">
      <a-modal
        title="添加租户"
        :visible="visible"
        :destroyOnClose="true"
        :maskClosable="false"
        @ok="handleOk"
        @cancel="handleCancel"
        okText="保存"
        cancelText="取消"
        :width="730">
        <a-form
          :form="form"
          autocomplete="off">
          <!-- 表单第一行 -->
          <a-row
            :gutter="24"
            class="row1">
            <a-col :span="12">
              <a-form-item label="名称">
                <a-input
                  placeholder="请输入名称"
                  v-decorator="['name',{rules: [{ required: true, message: '名称不能为空' }]}]" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="营业执照">
                <a-input
                  placeholder="目录"
                  v-decorator="['societyCode',{rules: [{ required: true, message: '营业执照不能为空!' }],}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 表单第二行 -->
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="拥有者">
                <a-select v-decorator="['ownerId',{rules: [{ required: true, message: '请选择所属人!' }],}]">
                  <template slot="suffixIcon">
                    <img src="@icons/sort.svg" />
                  </template>
                  <a-select-option
                    v-for="(item,index) in owners"
                    :key="index"
                    :value="item.id">
                    {{ item.nickName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="所属牌照">
                <a-select v-decorator="['licenseId',{rules: [{ required: true, message: '请选择所属牌照!' }],}]">>
                  <template slot="suffixIcon">
                    <img src="@icons/sort.svg" />
                  </template>
                  <a-select-option
                    v-for="(item,index) in LicenseList"
                    :key="index"
                    v-if="item.enable==1"
                    :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 表单第三行 -->
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="租户类型">
                <a-select v-decorator="['type',{rules: [{ required: true, message: '请选择租户类型!' }],initialValue:'1'}]">
                  <template slot="suffixIcon">
                    <img src="@icons/sort.svg" />
                  </template>
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
                <a-input
                  placeholder="请输入服务标识"
                  v-decorator="['serviceId',{rules: [{ required: true, message: '服务标识不能为空!' }],}]" />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 表单第四行 -->
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="访问地址">
                <a-input
                  addonBefore="Http://"
                  style="width: 329px"
                  placeholder="请输入"
                  v-decorator="['url']" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系电话">
                <a-input
                  v-decorator="['tel',{rules: [{ required: true,pattern: /^[0-9]*$/, message: '电话不能为空且为数字!' }],}]"
                  style="width: 100%">
                  <a-select
                    slot="addonBefore"
                    v-decorator="['prefix', { initialValue: '86' }]"
                    style="width: 70px">
                    <template slot="suffixIcon">
                      <img src="@icons/sort.svg" />
                    </template>
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
                <a-input
                  placeholder="请输入租户地址"
                  v-decorator="['address',{rules: [{ required: true, message: '租户地址不能为空!' }],}]" />
              </a-form-item>
              <!-- 第五行左2 -->
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-form-item label="生效时间">
                    <a-date-picker v-decorator="['beginTime',{rules: [{ required: true, message: '请选择牌照生效时间!' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="失效时间">
                    <a-date-picker
                      v-decorator="['endTime',
                                    {rules: [{ required: true, message: '请选择牌照到期时间!' }]}]" />

                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="12">
              <!-- 第五行右侧企业标识 -->
              <a-form-item
                label="企业标识"
                class="qybs">
                <a-upload
                  name="file"
                  :beforeUpload="beforeUpload"
                  :showUploadList="false"
                  listType="picture-card"
                  class="avatar-uploader"
                  :customRequest="customRequest"
                  :disabled="disable"
                  v-decorator="['logoId']">
                  <img
                    v-if="fileList.url"
                    :src="fileList.url"
                    alt="avatar" />
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">点击上传</div>
                  </div>
                </a-upload>
                <span>只能上传jpg/png/svg文件，且不超过500kb</span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
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
import qs from 'qs'
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
      confirmDirty: false,
      owners: [], // 从云智囊中查询的所有拥有者数组
      LicenseList: [], // 牌照列表数组
      TenantMObj: null,
      url: '',
      fileList: {
        url: '',
        logoId: ''
      }, // 上传图片集合
      disable: false,
      loading: false,
      imageUrl: '',
      columns: [{
        title: '名称',
        dataIndex: 'name',
        width: '10%'
      }, {
        title: '拥有者',
        dataIndex: 'ownerName',
        width: '10%'
      }, {
        title: '所属牌照',
        dataIndex: 'licenseName',
        width: '10%'
      }, {
        title: '类型',
        dataIndex: 'typeName',
        width: '10%'
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: '15%'
      }, {
        title: '到期时间',
        dataIndex: 'endTime',
        width: '15%'
      }, {
        title: '初始化',
        dataIndex: '',
        width: '10%'
      },
      { title: '详情', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, width: '10%' }
      ],
      data: [],
      result: [{ name: '名称', key: 'name' }, { name: '拥有者', key: 'ownerName' }, { name: '所属牌照', key: 'licenseName' }, { name: '类型', key: 'type' }],
      name1: '添加租户',
      name2: '删除',
      placeholder: '关键词搜索',
      version: '免费版',
      owner: '拥有者',
      methodsName: ['selectOwner', 'selectBelongPeople', 'selectLicensePlate', 'selectTenantType', 'selectServeSign'],
      visible: false, // 判断是否显示弹框的属性
      previewImage: '',
      previewVisible: false,
      tenancyIds: [], // 勾选的要删除的租户id数组
      selectVal: 'name',
      dataOld: []
    }
  },
  created () {
    this.TenantMObj = new CnbiTenantManagement()
    this.getData()
  },
  methods: {
    // 刷新数据的方法
    async refreshData () {
      let data = []
      if (this.$route.query.name) { // 判断是否从控制台过来的
        const name = this.$route.query.name
        if (name == 'expire') { // 展示要到期的列表
          const time = new Date()
          const month = 2592000000// 现在的时间加上1个月的毫秒数
          const endTime = time.getTime() + month
          data = await this.TenantMObj.getEndTimeTenancyList(endTime)
        } else if (name == 'deploy') { // 展示某种类型的列表
          const type = this.$route.query.type
          data = await this.TenantMObj.getTypeTenancyList(type)
        }
      } else {
        data = await this.TenantMObj.getTenancyList()
      }
      data.forEach(item => {
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
    getIds (ids) {
      // 1.获取表格中勾选的租户id数组(删除操作第一步)
      this.tenancyIds = ids
    },
    // 进入页面  加载数据列表
    async getData () {
      await this.refreshData()
      this.dataOld = this.deepCopy(this.data)
      // 获取所有的所属人
      this.owners = await this.TenantMObj.getUserSimpleInfoList()
      // 获取所有的牌照列表
      this.LicenseList = await this.TenantMObj.findLicenseList()
    },
    // 添加按钮的点击事件
    addClick () {
      this.visible = true
      this.fileList.url = ''
      this.fileList.logoId = ''
    },
    // 删除按钮的点击事件
    async deleteClick () {
      const _this = this
      // 2.根据传过来的id数组参数，传入，对应的删除接口中，完成删除操作（删除操作第二步）
      await _this.TenantMObj.deleteTenancy(_this.tenancyIds)

      // 重新加载最新的数据
      await _this.refreshData()

      // 清除勾选的id
      this.$refs.table.clearSelectedKey()
    },
    // 保存租户（保存按钮）
    handleOk () {
      const _this = this
      _this.form.validateFields(async (err, values) => {
        if (!err) {
          const serviceSign = values.serviceId
          const service = await _this.TenantMObj.validServiceSign(serviceSign)
          if (!service) {
            const arr = [{
              message: '服务标识重复!',
              field: 'serviceId'
            }]
            this.form.setFields({ serviceId: { value: serviceSign, errors: arr } })
            return
          }
          const formData = JSON.parse(JSON.stringify(values))
          formData.beginTime = new Date(formData.beginTime).getTime()
          formData.endTime = new Date(formData.endTime).getTime()
          if (formData.beginTime > formData.endTime) {
            const arr = [{
              message: '失效时间不能在生效时间之前!',
              field: 'endTime'
            }]
            this.form.setFields({ endTime: { value: formData.endTime, errors: arr } })
            return
          }
          // formData.checkTime = 1
          // formData.checkerId = 2
          if (formData.logoId) {
            formData.logoId = _this.fileList.logoId
          }
          const res = await _this.TenantMObj.saveTenancy(formData)
          if (res.code == 200) {
            _this.visible = false
            // 重新加载最新的数据
            await _this.refreshData()
          }
        }
      })
    },
    // 取消保存（取消按钮）
    handleCancel (e) {
      const _this = this
      if (_this.form) {
        _this.$confirm({
          title: '您还未完成添加租户，您确定取消？',
          content: '',
          onOk () {
            _this.visible = false
            console.log('确定')
          },
          onCancel () {
            console.log('Cancel')
          },
          class: 'test'
        })

        // alert('您还未完成添加租户，您确定取消？')
      }
    },
    // 以下几个方法都是处理文件，图像上传的方法
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
          _this.fileList.logoId = res.data.id
        }
      })
    },
    beforeUpload (file) {
      const fileType = ['image/jpeg', 'image/png', 'image/image/svg+xml']
      const isImg = fileType.indexOf(file.type) > -1
      if (!isImg) {
        this.$message.error('只能jpg、png、svg图片！')
      }
      const isLt5M = file.size / 1024 < 500
      if (!isLt5M) {
        this.$message.error('图片不能超过500kb！')
      }
      return isLt5M && isImg
    },
    inputHandler (val) {
      const _this = this
      if (_this.selectVal == 'type' && val != '') { // 判断是不是根据类型搜索，因为类型是死的，so可以这样写
        console.log('type====' + val)
        if ('公共部署'.indexOf(val) > -1) {
          val = 1
        } else if ('私有部署'.indexOf(val) > -1) {
          val = 2
        } else if ('本地部署'.indexOf(val) > -1) {
          val = 3
        }
        this.data = this.dataOld.filter(item => {
          if (item[_this.selectVal]) {
            return item[_this.selectVal] == val
          }
        })
        return
      }
      if (val) {
        this.data = this.dataOld.filter(item => {
          if (item[_this.selectVal]) {
            // const num = []
            // num.push(item[_this.selectVal])
            return item[_this.selectVal].indexOf(val) != -1
          }
        })
      } else {
        this.data = this.dataOld
      }
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
    },
    selectCell (val) {
      this.selectVal = val
    }
  }
}

</script>

<style scoped>
.com-drop-down {
  width: 120px;
}
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
/deep/.qybs .ant-form-item-children {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tencent-table {
  background-color: #fff;
}
form .ant-form-item {
  margin-bottom: 0;
}
</style>
