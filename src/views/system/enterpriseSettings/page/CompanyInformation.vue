<template>
  <div class="wrapper">
    <a-row :gutter="16">
      <a-col :md="6" :sm="24">
        <left-tree :treeData="comTreeData" @select="onCompanySelect"></left-tree>
        <a-button type="primary" @click="saveCompany">添加公司</a-button>
      </a-col>
      <a-col :md="18" :sm="24">
        <div v-show="!onAdd">
          <system-collapse :title="'企业形象'" :subtitle="'当前企业的标志。'">
            <system-upload v-show="showBtn" @success="onUploadSuccess" :url="imgUrl" @del="onDelImg"></system-upload>
          </system-collapse>
          <system-collapse :title="'企业资料'" :subtitle="'当前企业名称所属地区。'">
            <company-info-list :nodes="curCorporateInformation()"></company-info-list>
            <a-col :md="2" :sm="6">
              <a-button type="primary" @click="onEditCorporateInformation" v-show="showBtn">修改</a-button>
            </a-col >
          </system-collapse>
          <system-collapse :title="'企业属性'" :subtitle="'当前规模和所属行业。'">
            <company-info-list :nodes="curEnterpriseAttribute()"></company-info-list>
            <a-col :md="2" :sm="6">
              <a-button type="primary" @click="onEditEnterpriseAttribute" v-show="showBtn">修改</a-button>
            </a-col >
          </system-collapse>
          <system-collapse :title="'企业级别'" :subtitle="'当前企业在集团公司下的级别和排序。'">
            <company-info-list :nodes="curEnterpriseLevel()"></company-info-list>
            <a-col :md="2" :sm="6">
              <a-button type="primary" @click="onEnterpriseLevel" v-show="showBtn">修改</a-button>
            </a-col >
          </system-collapse>
          <system-collapse :title="'企业其他资料'" :subtitle="'录入企业时新添加的字段属性。'">
            <company-info-list :nodes="curEnterpriseOther()"></company-info-list>
            <a-col :md="2" :sm="6">
              <a-button type="primary" @click="onEnterpriseOther" v-show="showBtn">修改</a-button>
            </a-col >
          </system-collapse>
          <system-collapse v-show="!selectGroupCompany" :title="'刪除公司'" :subtitle="'可以选择刪除当前企业,刪除后企业所有数据都将刪除,并且无法撤销,请谨慎操作。'">
            <company-info-list></company-info-list>
            <a-col :md="2" :sm="6">
              <a-button type="primary" @click="onDelete" v-show="showBtn">删除</a-button>
            </a-col >
          </system-collapse>
          <system-collapse v-show="selectGroupCompany" :title="'转让公司'" :subtitle="'可以选择转让当前企业,无法撤销,请谨慎操作。'">
            <company-info-list></company-info-list>
            <a-col :md="2" :sm="6">
              <a-button type="primary" v-show="showBtn">转让</a-button>
            </a-col >
          </system-collapse>
        </div>
        <company-save-form v-show="onAdd" :pid="curSelectComId" @onBack="onFormClose"></company-save-form>
      </a-col>
    </a-row>
    <corporate-information-modal ref="corporateInformationModal" @onBack="onModalClose"></corporate-information-modal>
    <enterprise-attribute-modal ref="enterpriseAttributeModal" @onBack="onModalClose"></enterprise-attribute-modal>
    <enterprise-level-modal ref="enterpriseLevelModal" @onBack="onModalClose"></enterprise-level-modal>
    <enterprise-other-modal ref="enterpriseOtherModal" @onBack="onModalClose"></enterprise-other-modal>
  </div>
</template>

<script>
import LeftTree from '../../memberManagement/page/Module/LeftTree'
import { getAllCompanyTree, updateCompany, deleteCompany } from '@/api/company'
import { findAllPlace, findAllIndustry, findDictByCode, getFile } from '@/api/common'
import { queryByField } from '@/api/customForm'
import SystemCollapse from './Module/SystemCollapse'
import CompanyInfoList from './Module/CompanyInfoList'
import typeUtils from '@/utils/typeUtils'
import CorporateInformationModal from './Module/CorporateInformationModal'
import EnterpriseAttributeModal from './Module/EnterpriseAttributeModal'
import EnterpriseLevelModal from './Module/EnterpriseLevelModal'
import EnterpriseOtherModal from './Module/EnterpriseOtherModal'
import CompanySaveForm from './Module/CompanySaveForm'
import { minxinModal } from '@/utils/mixin.js'
import SystemUpload from './Module/SystemUpload'

export default {
  name: 'CompanyInformation',
  components: {
    SystemUpload,
    CompanySaveForm,
    EnterpriseOtherModal,
    EnterpriseLevelModal,
    EnterpriseAttributeModal,
    CorporateInformationModal,
    CompanyInfoList,
    SystemCollapse,
    LeftTree },
  data () {
    return {
      comTreeData: [],
      curSelectComId: undefined,
      onAdd: false,
      dict: {
        place: {},
        scale: {},
        industries: {},
        character: {}
      },
      selectGroupCompany: false,
      customField: [],
      imgUrl: ''
    }
  },
  mixins: [minxinModal],
  computed: {
    showBtn: function () {
      if (this.curSelectComId !== undefined) {
        return true
      }
      return false
    }
  },
  methods: {
    onCompanySelect: function (selectKeys) {
      const _this = this
      this.onAdd = false
      this.selectGroupCompany = false
      _this.imgUrl = ''
      if (selectKeys.length > 0) {
        this.curSelectComId = selectKeys[0]
        const treeNode = this.getTreeNode(this.comTreeData, this.curSelectComId)
        if (treeNode.pid === '0') {
          this.selectGroupCompany = true
        }
        if (treeNode.avatar) {
          getFile({ id: treeNode.avatar }).then(function (res) {
            if (res.code === 200 && res.data) {
              _this.imgUrl = res.data.thumbUrl
            }
          })
        }
      } else {
        this.curSelectComId = undefined
      }
    },
    getTreeNode: function (treeData, key) {
      for (let i = 0; i < treeData.length; i++) {
        const ele = treeData[i]
        if (ele.key === key) {
          return ele
        }
        if (Array.isArray(ele.children)) {
          const result = this.getTreeNode(ele.children, key)
          if (result !== undefined) {
            return result
          }
        }
      }
    },
    saveCompany: function () {
      if (this.curSelectComId !== undefined) {
        this.onAdd = true
      } else {
        this.$message.warn('请先选择父公司')
      }
    },
    onFormClose: function () {
      this.reloadCompany()
      this.refreshField()
      this.onAdd = false
    },
    onModalClose: function () {
      this.reloadCompany()
    },
    onEditCorporateInformation: function () {
      this.$refs.corporateInformationModal.onEdit(this.curSelectComInfo())
    },
    onEditEnterpriseAttribute: function () {
      this.$refs.enterpriseAttributeModal.onEdit(this.curSelectComInfo())
    },
    onEnterpriseLevel: function () {
      this.$refs.enterpriseLevelModal.onEdit(this.curSelectComInfo())
    },
    onEnterpriseOther: function () {
      this.$refs.enterpriseOtherModal.onEdit(this.curSelectComInfo())
    },
    onDelete: function () {
      const _this = this
      this.confirm({
        title: '确认删除该公司吗',
        content: '如果有下属公司，下属公司也会一并删除',
        onOk: function () {
          deleteCompany({ id: this.curSelectComId }).then(function (res) {
            if (res.code === 200) {
              _this.$message.success('删除成功')
            } else {
              _this.$message.error('删除失败')
            }
            _this.reloadCompany()
          })
        }
      })
    },
    onUploadSuccess: function (data) {
      const _this = this
      updateCompany({ id: this.curSelectComId, avatar: data.id }).then(function (res) {
        if (res.code === 200) {
          _this.imgUrl = data.thumbUrl
          _this.$message.success('上传成功')
          _this.reloadCompany()
        } else {
          _this.$message.error('上传失败')
        }
      })
    },
    onDelImg: function () {
      const _this = this
      this.confirm({
        title: '确认删除该图片吗吗',
        content: '',
        onOk: function () {
          updateCompany({ id: _this.curSelectComId, avatar: 0 }).then(function (res) {
            if (res.code === 200) {
              _this.$message.success('删除成功')
              _this.imgUrl = ''
              _this.reloadCompany()
            } else {
              _this.$message.error('删除失败')
            }
          })
        }
      })
    },
    reloadCompany: function () {
      const _this = this
      getAllCompanyTree().then(function (treeData) {
        _this.comTreeData = treeData
      })
    },
    curSelectComInfo: function () {
      return this.getTreeNode(this.comTreeData, this.curSelectComId)
    },
    // 当前企业资料属性
    curCorporateInformation: function () {
      const comInfo = this.curSelectComInfo()
      if (!typeUtils.isObject(comInfo)) {
        return []
      }
      return [
        {
          key: '名称',
          text: comInfo.text
        },
        {
          key: '电话',
          text: comInfo.property1
        },
        {
          key: '地区',
          text: this.dictCodeToText(comInfo.property2, this.dict.place)
        }
      ]
    },
    curEnterpriseAttribute: function () {
      const comInfo = this.curSelectComInfo()
      if (!typeUtils.isObject(comInfo)) {
        return []
      }
      return [
        {
          key: '当前规模',
          text: this.dict.scale[comInfo.property3]
        },
        {
          key: '所属行业',
          text: this.dictCodeToText(comInfo.property4, this.dict.industries)
        },
        {
          key: '单位类型',
          text: this.dict.character[comInfo.property5]
        }
      ]
    },
    curEnterpriseLevel: function () {
      const comInfo = this.curSelectComInfo()
      let pComInfo
      if (typeUtils.isObject(comInfo)) {
        pComInfo = this.getTreeNode(this.comTreeData, comInfo.pid)
      }

      if (!typeUtils.isObject(comInfo)) {
        return []
      }
      return [
        {
          key: '企业排序',
          text: comInfo.sort
        },
        {
          key: '企业级次',
          text: comInfo.level
        },
        {
          key: '上级企业',
          text: typeUtils.isObject(pComInfo) ? pComInfo.text : ''
        },
        {
          key: '下级企业',
          text: (Array.isArray(comInfo.children) && comInfo.children.length > 0 ? comInfo.children.length : 0) + '个'
        }
      ]
    },
    curEnterpriseOther: function () {
      const comInfo = this.curSelectComInfo()
      if (!typeUtils.isObject(comInfo)) {
        return []
      }
      // 额外JSON信息转换后放入
      const customField = []
      if (typeUtils.isNotBlank(comInfo.customField) && typeUtils.isObject(JSON.parse(comInfo.customField))) {
        const customFieldObj = JSON.parse(comInfo.customField)
        this.customField.forEach(function (ele) {
          customField.push({ key: ele.value, text: customFieldObj[ele.value] })
        })
      }
      return [
        {
          key: '企业编码',
          text: comInfo.srcId
        },
        {
          key: '企业数据编码',
          text: comInfo.srcId2
        },
        {
          key: '信息编码',
          text: comInfo.srcId3
        },
        ...customField
      ]
    },
    dictCodeToText: function (str, dict) {
      if (typeUtils.isNotBlank(str)) {
        const arr = str.split(',')
        let text = ''
        arr.forEach(function (ele) {
          text += '/' + dict[ele]
        })
        return text
      }
      return ''
    },
    treeToMap: function (treeData) {
      const _this = this
      let obj = {}
      if (Array.isArray(treeData)) {
        treeData.forEach(function (ele) {
          obj[ele.id] = ele.text
          if (Array.isArray(ele.children)) {
            obj = Object.assign(obj, _this.treeToMap(ele.children))
          }
        })
      }
      return obj
    },
    refreshField: function () {
      const _this = this
      return queryByField({ code: 'com' }).then(function (res) {
        if (res.code === 200) {
          _this.customField = res.data
        }
      })
    }
  },
  created () {
    this.reloadCompany()
    const _this = this
    findAllPlace().then(function (res) {
      _this.dict.place = _this.treeToMap(res.data)
    })
    findAllIndustry().then(function (res) {
      _this.dict.industries = _this.treeToMap(res.data)
    })
    findDictByCode({ code: 3 }).then(function (res) {
      _this.dict.scale = _this.treeToMap(res.data)
    })
    findDictByCode({ code: 2 }).then(function (res) {
      _this.dict.character = _this.treeToMap(res.data)
    })
    this.refreshField()
  }
}
</script>

<style scoped>

</style>
