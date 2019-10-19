<template>
  <div >

    <div class="license">
      <!--表格-->
      <div class="license-header">
        <common-button
          :name1="name1"
          :name2="name2"
          @addClick="addClick"
          @deleteClick="deleteClick">
        </common-button>
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :dataSource="tableData"
          size="small"
        >
          <a-table-column title="版本" dataIndex="tag" key="tag">
            <template slot-scope="tags">
              <span>
                <a-tag
                  v-for="tag in tags"
                  color="blue"
                  :key="tag">{{ tag }}</a-tag>
              </span>
            </template>
          </a-table-column>
          <a-table-column title="描述" key="name1" >
            <template slot-scope="text, record">
              <editable-cell :text="record.name1" />
            </template>
          </a-table-column>
          <a-table-column title="服务标识" dataIndex="name2" key="name2" />
          <a-table-column title="更新时间" dataIndex="name3" key="name3" />
          <a-table-column title="状态" key="name4" >
            <template slot-scope="text, record">
              <!--1代表开-->
              <a-switch :defaultChecked="record.name4==1?true:false" @change="onChange(record.key)" />
            </template>
          </a-table-column>
          <a-table-column title="操作" key="action">
            <template slot-scope="text, record">
              <span @click="btnClick(record.key)">
                编辑
              </span>
            </template>
          </a-table-column>
        </a-table>
      </div>
      <!--中间-->
      <div class="license-middle">
        <div style="display: flex;flex-direction: column;flex-grow: 1;margin-left: 30px;">
          <div class="middle-a">
            <span>创建公司最大个数：</span><span>111111111111111</span>
          </div>
          <div class="middle-a">
            <span>最创建多资源数：</span><span>111111111</span>
          </div>
          <div class="middle-a">
            <span>最多可用空间：</span><span>1111111</span>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;flex-grow: 2;">
          <div class="middle-a">
            <span>最多用户数：</span><span>1111111</span>
          </div>
          <div class="middle-a">
            <span>最大级别数：</span><span>111111111</span>
          </div>
          <div class="middle-a">
            <span>最多链接数：</span><span>1111111</span>
          </div>
        </div>

      </div>
    </div>

    <div class="license-foot">
      <!--服务地址-->
      <div class="license-foot-a">
        <div style="display: flex;flex-direction: row;justify-content: space-between;height: 50px;">
          <div style="display: flex;flex-direction: row;align-items: center;margin-right: 10px">
            <img src="../../assets/icons/weizhi.svg">服务地址
          </div>
          <div style="display: flex;flex-direction: row;align-items: center;flex-grow: 1;justify-content: space-between;">
            <div v-if="addressState">
              <img src="../../assets/icons/bianji.svg" @click="addressState=false">
            </div>
            <div v-if="!addressState">
              <a-button
                class="button_style_one"
                type="primary"
                @click.prevent="updateAddress()">
                <a-icon type="cloud-upload" />保存
              </a-button>
              <a-button
                class="button_style_one"
                @click.prevent="cancelAddress()">
                取消
              </a-button>
            </div>
          </div>
        </div>
        <div style="display: flex;flex-direction: row;overflow: hidden;flex-wrap:wrap;flex-grow: 1">
          <div v-for="(item,index) in address" :key="index" >
            <serve-address :src="item.src" :name="item.name" :addressState="addressState"></serve-address>
          </div>
        </div>
      </div>
      <!--数据源-->
      <div class="license-foot-a">
        <!--头部-->
        <div style="display: flex;flex-direction: row;justify-content: space-between;height: 50px;">
          <div style="display: flex;flex-direction: row;align-items: center;margin-right: 10px">
            <img src="../../assets/icons/shujuyuan.svg">可用数据源
          </div>
          <div style="display: flex;flex-direction: row;align-items: center;flex-grow: 1;justify-content: space-between;">
            <div v-if="dataSourceState">
              <img src="../../assets/icons/bianji.svg" @click="dataSourceState=false">
            </div>
            <div v-if="!dataSourceState">
              <a-button
                class="button_style_one"
                type="primary"
                @click.prevent="updateDataSource()">
                <a-icon type="cloud-upload" />保存
              </a-button>
              <a-button
                class="button_style_one"
                @click.prevent="cancelDataSource()">
                取消
              </a-button>
            </div>
          </div>
        </div>
        <!--内容-->
        <div style="display: flex;flex-direction: row;overflow: hidden;flex-wrap:wrap;flex-grow: 1">
          <div v-for="(item,index) in dataSource" :key="index" >
            <data-source :src="item.src" :dataSourceState="dataSourceState"></data-source>
          </div>
        </div>

      </div>
    </div>
    <a-modal v-model="showLicenseModal" footer="">
      <a-steps :current="current" style="margin-top: 20px;" size="small">
        <a-step key="1" title="创建牌照" />
        <a-step key="2" title="牌照参数" />
        <a-step key="3" title="相关功能" />
        <a-step key="4" title="完成" />
      </a-steps>
      <div class="steps-content" style="display: flex;justify-content: center" v-if="current==0">
        <a-form :form="form" @submit="oneSubmit">
          <a-form-item label="牌照名称:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'a',
                { rules: [{ required: true, message: '请输入牌照名称！' }] },
              ]"/>
          </a-form-item>
          <a-form-item label="牌照描述:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'b',
                { rules: [{ required: true, message: '请输入牌照描述！' }] },
              ]"/>
          </a-form-item>
          <a-form-item label="牌照描述:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'b',
                { rules: [{ required: true, message: '请输入牌照描述！' }] },
              ]"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">
              下一步
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="steps-content" style="display: flex;justify-content: center" v-if="current==1">
        <a-form :form="form1" class="step1" @submit="handleSubmit">
          <a-form-item label="创建最大公司数:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'a',
                { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }] },
              ]"/>个
          </a-form-item>
          <a-form-item label="最多用户数:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'b',
                { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }] },
              ]"/>个
          </a-form-item>
          <a-form-item label="创建最多资源数:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'c',
                { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }] },
              ]"/>个
          </a-form-item>
          <a-form-item label="最大级别数:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'd',
                { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }] },
              ]"/>级
          </a-form-item>
          <a-form-item label="最多可用空间:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'e',
                { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }] },
              ]"/>MB
          </a-form-item>
          <a-form-item label="最多链接数:" >
            <a-input
              placeholder="请输入"
              v-decorator="[
                'f',
                { rules: [{ required: true, pattern: /^[0-9]*$/, message: '请输入正确的数字！' }] },
              ]"/>个
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">
              下一步
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>

</template>

<script>
import EditableCell from '@/components/system/editable-cell'
import CommonButton from '@/components/system/common-button'
import ServeAddress from './license-components/serve-address'
import DataSource from './license-components/data-soucer'
import AFormItem from 'ant-design-vue/es/form/FormItem'
export default {
  components: {
    AFormItem,
    CommonButton,
    EditableCell,
    ServeAddress,
    DataSource
  },
  data () {
    return {
      name1: '添加牌照',
      name2: '删除',
      addressState: true, // 服务地址编辑状态
      dataSourceState: true, // 数据源状态
      selectedRowKeys: [],
      tableData: [
        {
          key: 1,
          name: 11,
          name1: '这是一段描述，关于这个版本的一段文字占位符',
          name2: 111,
          name3: 111,
          name4: 1,
          tag: ['刁民']
        },
        {
          key: 2,
          name: 222,
          name1: '这是一段描述，关于这个版本的一段文字占位符',
          name2: 222,
          name3: 222,
          name4: 0,
          tag: ['平民']
        },
        {
          key: 3,
          name: 333,
          name1: '这是一段描述，关于这个版本的一段文字占位符',
          name2: 33,
          name3: 33,
          name4: 0,
          tag: ['地主']
        }
      ], // 表格数据
      address: [
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          name: 'Oracel'
        },
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          name: 'Mysql'
        },
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          name: 'Sql Serve'
        },
        {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2350302849,3323337377&fm=26&gp=0.jpg',
          name: 'asdf'
        }
      ], // 服务地址
      dataSource: [
        {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2536453479,3877278103&fm=26&gp=0.jpg'
        },
        {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg'
        }
      ], // 可用数据源
      showLicenseModal: false, // 添加牌照弹框
      current: 0, // 步骤条
      form1: this.$form.createForm(this)
    }
  },
  methods: {
    addClick () {
      console.log('123')
      this.showLicenseModal = true
    },
    deleteClick () {

    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    btnClick (key) {
      this.$message.success('操作成功')
    },
    onChange (checked) {
      console.log(checked)
    },
    updateAddress () { // 保存地址修改
      this.addressState = true
    },
    cancelAddress () { // 取消地址修改
      this.addressState = true
    },
    updateDataSource () {
      this.dataSourceState = true
    },
    cancelDataSource () {
      this.dataSourceState = true
    },
    addlicense () {
      this.showLicenseModal = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form1.validateFields((err, values) => {
        if (!err) {
          console.log('1')
          this.current += 1
        } else {
          console.log('cuowu')
        }
      })
    }

  }
}
</script>

<style scoped>
  /deep/ .editable-cell {
    position: relative;
  }

  /deep/.editable-cell-input-wrapper,
  /deep/.editable-cell-text-wrapper {
    padding-right: 24px;
  }

  /deep/.editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  /deep/ .editable-cell-icon,
  /deep/.editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  /deep/.editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  /deep/.editable-cell-icon-check {
    line-height: 28px;
  }

  /deep/.editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  /deep/.editable-cell-icon:hover,
  /deep/.editable-cell-icon-check:hover {
    color: #108ee9;
  }

  /deep/.editable-add-btn {
    margin-bottom: 8px;
  }
  .middle-a{
    margin-bottom: 16px;
  }
  .license-middle{
    display: flex;
    flex-direction: row;
    justify-content: space-around
  }
  .license-foot-a{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    padding: 20px;
    width: 50%;
    border: 1px  solid #EAEDF3;
  }
.license-foot{
  display: flex;
  flex-direction: row;
}
  .button_style_one{
    margin-right: 10px;
  }
  .button_style{
    float: none;
    display: flex;
    justify-content: flex-end;
  }

  .step1 input{
    width: auto;
    margin-right: 10px;
  }
</style>
