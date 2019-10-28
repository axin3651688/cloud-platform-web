<template>
  <div>
    <div style="display: flex;flex-direction: row;justify-content: space-between">
      <div style="display: flex;flex-direction: row;">
        <common-drop-down :result="result"
                          :defaultValue="defaultValue"
                          @selectCell="selectCell"
                          class="com-drop-down">
        </common-drop-down>
        <!--搜索框-->
        <common-search :placeholder="version"
                       style="width: 220px;float: none"
                       @inputHandler="inputHandler">

        </common-search>
      </div>
      <!--按钮-->
      <common-button style="float: none;"
                     :name1="name1"
                     :name2="name2"
                     @addClick="addClick"
                     @deleteClick="deleteClick">
      </common-button>
    </div>
    <a-table class="apply-table"
             :pagination="pagination"
             size="small"
             :columns="columns"
             :dataSource="dataSource"
             :rowKey="setKey"
             :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
      <template slot="caozuo"
                slot-scope="text, record">
        <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;">
          <span @click="btnClickEdit(record)">
            <a-icon type="edit"
                    style="margin-left: 4px;cursor: pointer;"
                    title="编辑" /></span>
          <span @click="btnClick(record)">
            <a-icon type="setting"
                    style="margin-left: 4px;cursor: pointer;"
                    title="服务配置" /></span>
        </div>

      </template>
      <template slot="zhuangtai"
                slot-scope="text, record">
        <!--1代表开-->
        <span style="margin-right: 4px;">{{ record.enable==1?'启用':'禁用' }}</span>
        <!--<a-switch :defaultChecked="record.name2==1?true:false" style="pointer-events:none"/>-->
        <a-popover trigger="click"
                   v-model="applyState"
                   v-if="record.enable==1 && active==record.id">
          <template slot="title">
            <div style="margin: 5px 0;">
              <span>
                <a-icon type="exclamation-circle"
                        style="color: #FAAD14;width: 14px;height: 14px;" />你确定禁用这个应用吗？
              </span>
            </div>
          </template>
          <template slot="content">
            <div style="display: flex;justify-content: flex-end; margin: 5px 10px;">
              <a-button style="margin-right: 10px;"
                        @click="cancelActive">取消</a-button>
              <a-button type="primary"
                        @click="saveActive(record)">保存</a-button>
            </div>
          </template>
          <span @click="spanClick(record)">
            <a-switch :defaultChecked="record.enable==1?true:false"
                      style="pointer-events:none" /></span>
        </a-popover>
        <span v-if="record.enable==0">
          <a-switch :defaultChecked="record.enable==1?true:false"
                    @click="open(record)" />
        </span>
        <span @click="spanClick(record)"
              v-if="record.enable==1 && active!=record.id">
          <a-switch :defaultChecked="record.enable==1?true:false" />
        </span>

      </template>

    </a-table>
    <a-modal v-model="ServiceSetting"
             :title="title">
      <form :form="form">
        <a-row :gutter="24"
               class="row1">
          <a-col :span="12">
            <a-form-item label="数据库IP">
              <a-input placeholder="请输入数据库IP"
                       v-decorator="['name',{rules: [{ required: true, message: '数据库IP不能为空!' }],}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="端口">
              <a-input placeholder="请输入端口"
                       v-decorator="['name',{rules: [{ required: true, message: '端口不能为空!' }],}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </form>
    </a-modal>
    <a-modal v-model="showAddApply"
             :destroyOnClose="true"
             title="添加应用">
      <a-form :form="form1">
        <a-form-item label="名称">
          <a-input placeholder="请输入"
                   v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入牌照名称！' }] },
            ]" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea placeholder="请输入描述"
                      v-decorator="['note']" />
        </a-form-item>
        <a-form-item label="图标"
                     class="form1-icon">
          <a-upload name="file"
                    :beforeUpload="beforeUpload"
                    :showUploadList="false"
                    listType="picture-card"
                    class="avatar-uploader"
                    :customRequest="customRequest"
                    :disabled="disable"
                    v-decorator="[
              'iconId'
              <!-- ,{ rules: [{ required: true, message: '请上传图标！' }] }, -->
            ]">
            <img v-if="imageUrl"
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
        <a-button key="back"
                  @click="cancelSave">取消</a-button>
        <a-button key="submit"
                  type="primary"
                  @click="saveApplyOk">
          <a-icon type="cloud-upload" /> 保存
        </a-button>
      </template>
    </a-modal>
    <a-modal v-model="showEditApply"
             title="编辑应用">
      <a-form :form="form1">
        <a-form-item label="名称">
          <a-input placeholder="请输入"
                   v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入牌照名称！' }] },
            ]" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea placeholder="请输入描述"
                      v-decorator="['note']" />
        </a-form-item>
        <a-form-item label="图标"
                     class="form1-icon">
          <a-upload name="file"
                    :beforeUpload="beforeUpload"
                    :showUploadList="false"
                    listType="picture-card"
                    class="avatar-uploader"
                    :customRequest="customRequest"
                    :disabled="disable"
                    v-decorator="[
              'iconId'
              <!-- ,{ rules: [{ required: true, message: '请上传图标！' }] }, -->
            ]">
            <img v-if="imageUrl"
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
        <a-button key="back"
                  @click="cancelEdit">取消</a-button>
        <a-button key="submit"
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
        { name: '应用描述', key: 'note' },
        { name: '状态', key: 'enable' }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '应用名称',
          dataIndex: 'name'
        },
        {
          title: '应用描述',
          dataIndex: 'note'
        },
        {
          title: '状态',
          dataIndex: 'enable',
          scopedSlots: { customRender: 'zhuangtai' }
        },
        {          title: '操作',
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
      form: this.$form.createForm(this), // 服务配置弹框
      form1: this.$form.createForm(this), // 添加应用弹框
      active: '',
      applyState: false,
      editId: null,//点击编辑的时候该行数据对应的id
      selectVal: '',
      dataOld: []//拷贝获取的原有数据
    }
  },
  created () {
    this.ApplyMObj = new CnbiApplyManagement()
    this.getData()
  },
  methods: {
    //获取列表数据
    async getData () {
      const data = await this.ApplyMObj.getResourcesCard();
      this.dataSource = data

      //拷贝数据
      this.dataOld = this.deepCopy(this.dataSource);
    },
    //搜索的第一个下拉框的事件
    selectCell (val1) {
      this.selectVal = val1;
    },
    //点击搜索框的事件
    async inputHandler (val2) {
      if (!val2) {
        this.dataSource = this.dataOld
      }
      this.dataSource = await this.ApplyMObj.searchResources(this.selectVal || this.defaultValue, val2,2);
    },
    //点击服务设置按钮事件
    btnClick (record) {
      // this.ServiceSetting = true
      this.title = 'XX应用服务配置'
    },
    btnClickEdit (record) {
      this.showEditApply = true
      this.editId = record.id * 1
    },

    //添加按钮事件
    addClick () {
      this.showAddApply = true
    },

    //勾选事件
    onSelectChange (selectedRowKeys, bb, cc) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 设置每行id为主键
    setKey(record){
      return record.id
    },
    //删除按钮事件
    async deleteClick () {
      //1.如果没有勾选就点击删除按钮，提示框
      if (this.selectedRowKeys.length == 0) {
        confirm('请勾选要删除的应用')
        return
      }
      if (this.selectedRowKeys.length > 0) {
        confirm('删除后可能会影响使用功能的使用，您确定继续？')
      }
      //2.如果勾选了，则获取勾选的id数组
      //3.调用删除接口，传入参数，删除
      await this.ApplyMObj.deleteResource(this.selectedRowKeys, 2)
      //4.删除成功后，及时更新数据，清除勾选图标
      await this.getData()
      this.selectedRowKeys = []
    },
    cancelActive () {
      this.active = ''
    },
    //当状态为启用的时候，想修改为禁用的时候确认事件
    async saveActive (record) {
      this.active = ''
      await this.ApplyMObj.openResource(record.id * 1, (record.enable - 1 == 0 ? 0 : 1));
      //刷新数据
      await this.getData()
    },

    //当状态为禁用时，改为启用的点击事件
    async open (record) {
      await this.ApplyMObj.openResource(record.id * 1, (record.enable - 0 == 0 ? 1 : 0));
      //刷新数据
      await this.getData()
    },
    spanClick (record) {
      this.active = record.id
    },
    beforeUpload () {

    },
    customRequest () {

    },

    //添加应用弹框点击取消事件
    cancelSave () {
      this.showAddApply = false
    },
    //编辑弹框点击取消事件
    cancelEdit () {
      _this.showEditApply = false
    },
    //添加应用-保存按钮
    saveApplyOk () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          //t添加成功，更新数据
          formData.type = 2
          await _this.ApplyMObj.saveResource(formData)
          //重新加载最新的数据
          await _this.getData()
        }
        _this.showAddApply = false
      })
    },
    //编辑应用-保存按钮
    editApplyOk () {
      const _this = this
      _this.form1.validateFields(async (err, values) => {
        if (!err) {
          const formData = JSON.parse(JSON.stringify(values))
          //添加成功，更新数据
          formData.id = this.editId
          formData.type = 2
          await _this.ApplyMObj.updateResource(formData)
          //重新加载最新的数据
          await _this.getData()
        }
        _this.showEditApply = false
      })
    },
    /**
     * 深拷贝
     */
    deepCopy (obj) { //深拷贝
      let result = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] == null) {
            result[key] = null;
          } else if (obj[key] == undefined) {
            result[key] = undefined;
          } else if (typeof obj[key] === 'object') {
            result[key] = this.deepCopy(obj[key]); //递归复制
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
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
</style>
