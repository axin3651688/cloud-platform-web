目录结构
除了Ant Design Pro Vue自带的功能，下面是在框架中添加的界面文件目录在系统views/system目录下。 
```
│  ApplyManagement.vue      应用管理
│  Console.vue              控制台
│  readme.md                目录说明文档
│  SafeManagement.vue       安全管理
│  
├─enterpriseSettings
│  │  Index.vue             企业管理
│  │  
│  └─page                             	企业管理Tab页
│      │  CompanyInformation.vue      	公司信息管理
│      │  SectoralInformation.vue     		部门信息管理
│      │  
│      └─Module                       企业管理的一些模块和模态框
│              AddCustomFieldModal.vue	自定义字段的模态框
│              CompanyInfoList.vue			公司信息展示
│              CompanySaveForm.vue		公司基础信息的表单
│              CorporateInformationModal.vue	企业信息表单
│              CustomFormItem.vue			自定义字段的表单
│              DeleteCustomFieldModal.vue		删除自定义字段的模态框
│              EnterpriseAttributeModal.vue		企业属性的模态框
│              EnterpriseLevelModal.vue		企业等级的模态框
│              EnterpriseOtherModal.vue		企业其他信息的模态框
│              SectoralAddModal.vue			部门添加的模态框
│              SectoralSortModal.vue			部门排序的模态框
│              SectoralStructureModal.vue		部门结构调整的模态框
│              SectoralTable.vue				部门表格展示
│              SystemCollapse.vue				修改了a-collapse-panel头部
│              SystemUpload.vue				图片的上传
│              TransferCompany.vue			转让人模态框
│              
├─memberManagement                成员管理
│  │  Index.vue						成员管理
│  │  
│  └─page                         成员管理Tab页
│      │  BusinessMembers.vue      企业成员管理
│      │  DisablingAccounts.vue   禁用账号
│      │  Position.vue            职位管理
│      │  Robot.vue               机器人
│      │  
│      └─Module                  		成员管理用到的一些模块和模态框
│              CustomColumnModal.vue	自定义显示列的模态框
│              LeftCompanyTree.vue		左边公司树部分
│              LeftTree.vue				树加一个搜索
│              OrgAuth.vue				公司和部门的授权界面
│              PostModal.vue				职位模态框
│              TreeSelect.vue				树选择器
│              UserModal.vue				用户信息模态框
│              UserTable.vue				用户表格
│              
├─personalSettings              个人设置
│  │  Index.vue
│  │  
│  └─page                           个人设置Tab页
│          BindingAccount.vue       绑定账号
│          LoggingStatements.vue    基本资料
│          LogInLog.vue             登陆日志
│          
└─roleManagement                    角色管理
    │  Index.vue                    
    │  
    └─page                              角色管理Tab页
        │  DataScope.vue                数据范围
        │  FunctionalPermissions.vue    功能权限
        │  MenuPermissions.vue          菜单权限
        │  RoleMembers.vue              角色成员
        │  
        └─Module                        角色管理用到的一些模块和模态框
                AddRoleUserModal.vue		角色成员模态框
                CheckBoxNodes.vue		权限节点的选择界面
                RoleModal.vue   			添加编辑角色模态框
```                      
组件列表
	因为此工程没有特定的组件，全是以上的界面和模块堆砌出来的。
注意事项
1.	如果有框架相关疑问，请直接参考框架的说明文档https://pro.loacg.com/docs/getting-started
2.	有些界面原待定没提出特定功能的还未完成。
