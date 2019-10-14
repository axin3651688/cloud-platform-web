<template>
  <div>
    <!-- <h1>租户管理 TenantManagement</h1> -->
    <!-- <commom-search :placeholder="placeholder"></commom-search> -->
    <div>
      <!--下拉框-->
      <common-drop-down
        :name="owner"
        :result="result"
        :methodsName="methodsName[0]"
        @selectOwner="selectOwners"
        style="float:left;color:#D8DCE6"
      ></common-drop-down>
      <!--搜索框-->
      <common-search :placeholder="version" style="width: 220px"></common-search>
      <common-search :placeholder="placeholder" style="width: 220px"></common-search>
      <!--按钮-->
      <common-button
        :name1="name1"
        :name2="name2"
        @addClick="addClick"
        @deleteClick="deleteClick">
      </common-button>
      <div style="height:32px"></div>
      <!--表格-->
      <common-table
        style="margin-top:10px;"
        :columns="columns"
        :data="data"></common-table>
    </div>
    <!--添加租户弹框-->
    <a-modal
      title="添加租户"
      v-model="addTenantFlag"
      @ok="saveTenant"
      okText="确认"
      cancelText="取消"
      :destroyOnClose="true"
      :width="600"
    >
      <div>
        <div class="amodal-row">
          <div class="amodal-row-cell">
            <span>名称：</span>
            <a-input placeholder="名称" class="tenantInput"/>
          </div>
          <div class="amodal-row-cell">
            <span>营业执照：</span>
            <a-input placeholder="目录" class="tenantInput"/>
          </div>
        </div>

        <div class="amodal-row" >
          <div class="amodal-row-cell">
            <span>所属人：</span>
            <common-drop-down
              class="addTenantDown"
              :name="belongPeople"
              :result="result"
              :methodsName="methodsName[1]"
              @selectBelongPeople="selectBelongPeople"
            ></common-drop-down>
          </div>
          <div class="amodal-row-cell">
            <span>所属牌照：</span>
            <common-drop-down
              class="addTenantDown"
              :name="licensePlate"
              :result="result"
              :methodsName="methodsName[2]"
              @selectLicensePlate="selectLicensePlate"
            ></common-drop-down>
          </div>
        </div>

        <div class="amodal-row" >
          <div class="amodal-row-cell">
            <span>租户类型：</span>
            <common-drop-down
              class="addTenantDown"
              :name="tenantType"
              :result="result"
              :methodsName="methodsName[3]"
              @selectTenantType="selectTenantType"
            ></common-drop-down>
          </div>
          <div class="amodal-row-cell">
            <span>服务标识：</span>
            <common-drop-down
              class="addTenantDown"
              :name="serveSign"
              :result="result"
              :methodsName="methodsName[4]"
              @selectServeSign="selectServeSign"
            ></common-drop-down>
          </div>
        </div>
        <div class="amodal-row" >
          <div class="amodal-row-cell">
            <span>访问网址：</span>
            <a-input addonBefore="Http://" addonAfter=".com" placeholder="请输入" />
          </div>
          <div class="amodal-row-cell">
            <span>联系电话：</span>
            <a-input placeholder="11位手机号">
              <a-select slot="addonBefore" defaultValue="Http://">
                <a-select-option value="Http://">+86</a-select-option>
                <a-select-option value="Https://">+87</a-select-option>
              </a-select>
            </a-input>
          </div>
        </div>
        <div class="amodal-row" >
          <div style="display: flex;flex-direction: column;">
            <div style="display: flex;flex-direction: column;">
              <span>租户地址：</span>
              <a-input placeholder="租户地址" class="tenantInput"/>
            </div>
            <div style="display: flex;flex-direction: row;width: 220px;">
              <div style="display: flex;flex-direction: column;">
                <span>生效时间：</span>
                <a-date-picker @change="accrueTime">
                  <a-icon slot="suffixIcon" type="smile" />
                </a-date-picker>
              </div>
              <div style="display: flex;flex-direction: column;">
                <span>失效时间：</span>
                <a-date-picker @change="failureTime">
                  <a-icon slot="suffixIcon" type="smile" />
                </a-date-picker>
              </div>
            </div>
          </div>
          <div style="display: flex;flex-direction: column;width: 228px;">
            <div style="display: flex;flex-direction: column;justify-content: flex-start">
              <span>企业标识：</span>
              <a-button
                type="primary"
                class="upLoad-Button"
                @click="uploadImg"
              ><a-icon type="cloud-upload" />点击上传</a-button>
              <img
                style="width: 228px;margin-top: 10px;"
                src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3389683750,3564498893&fm=26&gp=0.jpg">
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>

    </a-modal>
  </div>
</template>

<script>
import SelectModel from '@/components/system/SelectModel'
import CommonSearch from '@/components/system/common-search'
import CommonTable from '@/components/system/common-table'
import CommonButton from '@/components/system/common-button'
import CommonDropDown from '@/components/system/common-drop-down'

export default {
  components: {
    SelectModel,
    CommonTable,
    CommonButton,
    CommonSearch,
    CommonDropDown
  },
  name: 'TenantManagement',
  data () {
    return {
      columns: [{
        title: 'Name',
        dataIndex: 'name'
      }, {
        title: 'Age',
        dataIndex: 'age'
      }, {
        title: 'Address',
        dataIndex: 'address'
      }],
      data: [{
        key: 1,
        name: 'Edward King',
        age: 32,
        address: '合肥'
      }, {
        key: 2,
        name: 'Edward King2',
        age: 30,
        address: '合肥2'
      }, {
        key: 3,
        name: 'Edward King1',
        age: 31,
        address: '合肥1'
      }
      ],
      result: ['1', '2', '3', '4'],
      name1: '添加租户',
      name2: '删除',
      placeholder: '关键词搜索',
      version: '免费版',
      owner: '拥有者',
      belongPeople: '拥有者', // 所属人
      licensePlate: '基础版', // 所属牌照
      tenantType: '公共部署', // 租户类型
      serveSign: '服务标识',
      methodsName: ['selectOwner', 'selectBelongPeople', 'selectLicensePlate', 'selectTenantType', 'selectServeSign'],
      addTenantFlag: false,
      previewImage: '',
      previewVisible: false,
      fileList: ['https://tpc.googlesyndication.com/daca_images/simgad/17069283415306529692']
    }
  },
  methods: {
    addClick () {
      this.addTenantFlag = true
    },
    deleteClick () { alert('deleteClick') },
    // 选择拥有者
    selectOwners (val) {
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
    // 保存租户
    saveTenant () {

    },
    handleCancel () {
      // this.previewVisible = false
      console.log('handleCancel===')
    },
    handlePreview (file) {
      console.log('handlePreview===')
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      console.log('handleChange===')
      // this.fileList = fileList
    }
  }
}

</script>

<style scoped>
  .tenantInput {
    width: 220px;
    margin: 0 8px 8px 0;
  }
  .addTenantDown{
    margin: 0 8px 8px 0;
    }
  .ant-input-group-wrapper{
    width: 220px;
    margin: 0 8px 8px 0;
  }
  .amodal-row{
    display: flex;
    flex-direction: row;
    justify-content:space-between
  }
  .amodal-row-cell{
    display: flex;
    flex-direction: column
  }
  .upLoad-Button{
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
