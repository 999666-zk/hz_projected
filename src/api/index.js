import request from "@/utils/request";

//云文件列表
export function CloudFileList(params, config) {
  return request.post('/CloudFile/CloudFileList', params, config);
};

//云文件地址查询文件列表
export function CloudPathFileList(params, config) {
  return request.post('/CloudFile/CloudPathFileList', params, config);
};

//云文件面包屑路径列表
export function CloudFilePathList(params, config) { return request.post('/CloudFile/CloudFilePathList', params, config) }

//云文件面包屑路径
export function CloudFilePath(params, config) { return request.post('/CloudFile/CloudFilePath', params, config) }

//云文件共享列表--我共享的
export function CloudFileCreateSharedList(params, config) { return request.post('/CloudFile/CloudFileCreateSharedList', params, config) }

//云文件共享列表--共享给我
export function CloudFileSharedList(params, config) { return request.post('/CloudFile/CloudFileSharedList', params, config) }

//云文件详情信息
export function CloudFileSelfDetail(params, config) { return request.post('/CloudFile/CloudFileSelfDetail', params, config) }

//云文件共享人员列表
export function CloudFileSharedPersonList(params, config) { return request.post('/CloudFile/CloudFileSharedPersonList', params, config) }

//云文件我的共享历史人员列表
export function CloudFileSharedHistoryPersonnel(params, config) { return request.get('/CloudFile/CloudFileSharedHistoryPersonnel', params, config) }

//云文件分享列表落地页
export function CloudFileSharedSettingPage(params, config) { return request.post('/CloudFile/CloudFileSharedSettingPage', params, config) }

//获取分享者信息
export function CloudFileSharerInfo(params, config) { return request.post('/CloudFile/CloudFileSharerInfo', params, config) }

//分享的云文件提取
export function CloudFileSharedExtract(params, config) { return request.post('/CloudFile/CloudFileSharedExtract', params, config) }

//云文件分享列表
export function CloudFileShareList(params, config) { return request.post('/CloudFile/CloudFileShareList', params, config) }

//云文件分享详情列表
export function CloudFileShareDetailList(params, config) { return request.post('/CloudFile/CloudFileShareDetailList', params, config) }

//云文件分享子表列表
export function CloudFileSharedSettingList(params, config) { return request.post('/CloudFile/CloudFileSharedSettingList', params, config) }

//云文件夹文件
export function CloudFileDetailList(params, config) { return request.post('/CloudFile/CloudFileDetailList', params, config) }

//用户使用文件容量
export function CloudFileTotalSize(params, config) { return request.post('/CloudFile/CloudFileTotalSize', params, config) }

//云文件编辑
export function CloudFileEdit(params, config) { return request.post('/CloudFile/CloudFileEdit', params, { ...config, isNotRepeatReq: true }) }

//云文件删除
export function CloudFileDelete(params, config) { return request.post('/CloudFile/CloudFileDelete', params, config) }

//云文件移动
export function CloudFileMoving(params, config) { return request.post('/CloudFile/CloudFileMoving', params, config) }

//云文件转存
export function CloudFileArchived(params, config) { return request.post('/CloudFile/CloudFileArchived', params, config) }

//云文件共享
export function CloudFileShared(params, config) { return request.post('/CloudFile/CloudFileShared', params, config) }

//云文件共享用户设置
export function CloudFileSharedUserSetting(params, config) { return request.post('/CloudFile/CloudFileSharedUserSetting', params, config) }

//云文件取消共享
export function CloudFileSharedCancel(params, config) { return request.post('/CloudFile/CloudFileSharedCancel', params, config) }

//云文件分享设置
export function CloudFileSharedSetting(params, config) { return request.post('/CloudFile/CloudFileSharedSetting', params, config) }

//云文件取消分享
export function CloudFileCancelSharedSet(params, config) { return request.post('/CloudFile/CloudFileCancelSharedSet', params, config) }

//云文件分享记录删除
export function CloudFileSharedSetDelete(params, config) { return request.post('/CloudFile/CloudFileSharedSetDelete', params, config) }

//获取文件大小
export function CloudFileDetailSize(params, config) { return request.post('/CloudFile/CloudFileDetailSize', params, config) }

//云文件消耗流量
export function CloudFileDetailFlow(params, config) { return request.post('/CloudFile/CloudFileDetailFlow', params, config) }

//获取七牛上传Token
export function GetUploadToken(params, config) { return request.post('/CloudFile/GetUploadToken', params, { ...config, isNotRepeatReq: true }) }

//获取七牛上传Token(写邮件特供接口)【key1:后缀名 key2:前缀】
export function GetUploadToken_Mail(params, config) { return request.post('/CloudFile/GetUploadToken_Mail', params, config) }

//七牛云文件打包下载
export function CloudFileMkZip(params, config) { return request.post('/CloudFile/CloudFileMkZip', params, config) }

//回收站列表
export function RecycleBinList(params, config) { return request.post('/CloudFile/RecycleBinList', params, config) }

//恢复文件
export function RestoreFiles(params, config) { return request.post('/CloudFile/RestoreFiles', params, config) }

//彻底删除
export function CompletelyDeleteFiles(params, config) { return request.post('/CloudFile/CompletelyDeleteFiles', params, config) }

//清空文件
export function EmptyFile(params, config) { return request.post('/CloudFile/EmptyFile', params, config) }

//云文件收藏
export function SetCollect(params, config) { return request.post('/CloudFile/SetCollect', params, config) }

//云文件取消收藏
export function CancelCollect(params, config) { return request.post('/CloudFile/CancelCollect', params, config) }

//云文件取消收藏_批处理
export function CancelCollect_Batch(params, config) { return request.post('/CloudFile/CancelCollect_Batch', params, config) }

//发送短信验证码
export function SendSMS(params, config) { return request.post('/Common/SendSMS', params, config) }

//验证码是否正确
export function CheckCode(params, config) { return request.post('/Common/CheckCode', params, config) }

//发送邮箱验证码
export function SendEmailAuthCode(params, config) { return request.post('/Common/SendEmailAuthCode', params, config) }

//密码正则验证
export function CheckPassword(params, config) { return request.post('/Common/CheckPassword', params, config) }

//文件上传
export function UploadFile(params, config) { return request.post('/Common/UploadFile', params, config) }

//文件上传(写邮件页面邮件正文特供接口)
export function UploadFile_Mail(params, config) { return request.post('/Common/UploadFile_Mail', params, config) }

//邮件超大附件上传
export function UploadMailLargeFile(params, config) { return request.post('/Common/UploadMailLargeFile', params, config) }

//文件批量上传
export function UploadBatchFile(params, config) { return request.post('/Common/UploadBatchFile', params, config) }

//下载文件
export function DownloadFile(params, config) { return request.post('/Common/DownloadFile', params, config) }

//资源列举
export function BatchChangeFileName(params, config) { return request.post('/Common/BatchChangeFileName', params, config) }

//验证七牛云上文件是否存在
export function VerifyFile(params, config) { return request.post('/Common/VerifyFile', params, config) }

//客户列表
export function V2CustomerList(params, config) { return request.post('/v2/Customer/CustomerList', params, config) }

//权限成员列表
export function V2PermissionsMemberList(params, config) { return request.post('/v2/Customer/PermissionsMemberList', params, config) }

//公海客户列表
export function V2PublicCutomerList(params, config) { return request.post('/v2/Customer/PublicCutomerList', params, config) }

//新增客户
export function V2AddCustomer(params, config) { return request.post('/v2/Customer/AddCustomer', params, config) }

//客户详情(根据客户ID获取客户详情)
export function V2CustomerInfo(params, config) { return request.post('/v2/Customer/CustomerInfo', params, config) }

//客户详情(根据客户编号获取客户详情)
export function V2CustomerInfoForCode(params, config) { return request.post('/v2/Customer/CustomerInfoForCode', params, config) }

//客户联系记录列表
export function V2CustomerContactRecordList(params, config) { return request.post('/v2/Customer/CustomerContactRecordList', params, config) }

//客户联系人详情
export function V2CustomerContactInfo(params, config) { return request.post('/v2/Customer/CustomerContactInfo', params, config) }

//客户跟进列表
export function V2CustomerFollowList(params, config) { return request.post('/v2/Customer/CustomerFollowList', params, config) }

//邮件跟进列表
export function V2MailFollowList(params, config) { return request.post('/v2/Customer/MailFollowList', params, config) }

//设置跟进(设置跟进取消)
export function V2SetFollow(params, config) { return request.post('/v2/Customer/SetFollow', params, config) }

//批量设置跟进(设置跟进取消)
export function V2BatchSetFollow(params, config) { return request.post('/v2/Customer/BatchSetFollow', params, config) }

//设置跟进延迟
export function V2SetFollowDelay(params, config) { return request.post('/v2/Customer/SetFollowDelay', params, config) }

//批量设置跟进延迟
export function V2BatchSetFollowDelay(params, config) { return request.post('/v2/Customer/BatchSetFollowDelay', params, config) }

//客户领用
export function V2RequestCutomer(params, config) { return request.post('/v2/Customer/RequestCutomer', params, config) }

//客户领用待审核数量
export function V2RequestToAuditList(params, config) { return request.post('/v2/Customer/RequestToAuditList', params, config) }

//客户领用审核列表
export function CheckRequistCumosterList(params, config) { return request.post('/Customer/CheckRequistCumosterList', params, config) }

//客户领用记录列表
export function CustomerRequestRecordList(params, config) { return request.post('/Customer/CustomerRequestRecordList', params, config) }

//客户修改纪录列表
export function CustomerUpdateRecordList(params, config) { return request.post('/Customer/CustomerUpdateRecordList', params, config) }

//客户联系方式列表
export function CustomerContactWaysList(params, config) { return request.post('/Customer/CustomerContactWaysList', params, config) }

//客户类型列表
export function CustomerTypeList(params, config) { return request.post('/Customer/CustomerTypeList', params, config) }

//客户类型编辑
export function CustomerTypeEdit(params, config) { return request.post('/Customer/CustomerTypeEdit', params, config) }

//客户类型删除
export function CustomerTypeDelete(params, config) { return request.post('/Customer/CustomerTypeDelete', params, config) }

//客户列表Excel导出
export function CustomerListExport(params, config) { return request.post('/Customer/CustomerListExport', params, config) }

//取消分管
export function CancelIncharge(params, config) { return request.post('/Customer/CancelIncharge', params, config) }

//设为公海客户
export function SetPublicCustomer(params, config) { return request.post('/Customer/SetPublicCustomer', params, config) }

//客户等级设置
export function SetCustomerType(params, config) { return request.post('/Customer/SetCustomerType', params, config) }

//客户联系人列表
export function CustomerContactList(params, config) { return request.post('/Customer/CustomerContactList', params, config) }

//分管客户联系人邮箱列表
export function CustomerContactMailList(params, config) { return request.post('/Customer/CustomerContactMailList', params, config) }

//客户联系人添加邮箱
export function CustomerContactAddMail(params, config) { return request.post('/Customer/CustomerContactAddMail', params, config) }

//通过邮箱查询对应的联系人名称
export function CustomerContactByMail(params, config) { return request.post('/Customer/CustomerContactByMail', params, config) }

//新增客户联系人
export function AddCustomerContact(params, config) { return request.post('/Customer/AddCustomerContact', params, config) }

//删除客户联系人
export function DelCustomerContacts(params, config) { return request.post('/Customer/DelCustomerContacts', params, config) }

//客户联系人纪念日设置列表
export function CustomerAnniversarySetList(params, config) { return request.post('/Customer/CustomerAnniversarySetList', params, config) }

//编辑客户联系人纪念日设置
export function EditCustomerAnniversarySet(params, config) { return request.post('/Customer/EditCustomerAnniversarySet', params, config) }

//删除客户联系人纪念日设置
export function DelUserCommemorationdays(params, config) { return request.post('/Customer/DelUserCommemorationdays', params, config) }

//客户联系人邮箱编辑
export function EditCustomerContactsEmail(params, config) { return request.post('/Customer/EditCustomerContactsEmail', params, config) }

//删除客户联系人邮箱
export function DelCustomerContactsEmail(params, config) { return request.post('/Customer/DelCustomerContactsEmail', params, config) }

//客户领用审核
export function RequistCustomerBatchCheck(params, config) { return request.post('/Customer/RequistCustomerBatchCheck', params, config) }

//客户类型跟进天数列表
export function CustomerFollowUpDaysList(params, config) { return request.post('/Customer/CustomerFollowUpDaysList', params, config) }

//设置客户类型跟进天数
export function SetCustomerFollowUpDays(params, config) { return request.post('/Customer/SetCustomerFollowUpDays', params, config) }

//客户类型设置信息列表
export function CustomerTypeSetList(params, config) { return request.post('/Customer/CustomerTypeSetList', params, config) }

//设置客户类型跟进天数(豁免人员)
export function AddCustomerTypeSet(params, config) { return request.post('/Customer/AddCustomerTypeSet', params, config) }

//修改客户代码
export function AlterCustomerCode(params, config) { return request.post('/Customer/AlterCustomerCode', params, config) }

//客户分管设置列表
export function CustomerInChargeSetList(params, config) { return request.post('/Customer/CustomerInChargeSetList', params, config) }

//客户分管设置
export function BatchSetCustomerInCharge(params, config) { return request.post('/Customer/BatchSetCustomerInCharge', params, config) }

//客户追加分管设置
export function AddSetCustomerInCharge(params, config) { return request.post('/Customer/AddSetCustomerInCharge', params, config) }

//客户批量移交
export function BatchTransferCustomer(params, config) { return request.post('/Customer/BatchTransferCustomer', params, config) }

//客户资料合并
export function CustomerDateMerge(params, config) { return request.post('/Customer/CustomerDateMerge', params, config) }

//圈子权限(不让ta看或者不看ta)
export function V2UserCirclePower(params, config) { return request.post('/v2/Dynamic/UserCirclePower', params, config) }

//设置圈子权限(不让ta看或者不看ta)
export function V2SetUserCirclePower(params, config) { return request.post('/v2/Dynamic/SetUserCirclePower', params, config) }

//动态列表
export function V2DynamicList(params, config) { return request.post('/v2/Dynamic/DynamicList', params, config) }

//我的动态列表
export function V2MyDynamicList(params, config) { return request.post('/v2/Dynamic/MyDynamicList', params, config) }

//新增动态
export function V2AddDynamic(params, config) { return request.post('/v2/Dynamic/AddDynamic', params, config) }

//新增动态评论
export function V2AddDynamicDiscuss(params, config) { return request.post('/v2/Dynamic/AddDynamicDiscuss', params, config) }

//动态信息
export function V2DynamicInfo(params, config) { return request.post('/v2/Dynamic/DynamicInfo', params, config) }

//动态信息-赞列表
export function V2DynamicThumbsUpList(params, config) { return request.post('/v2/Dynamic/DynamicThumbsUpList', params, config) }

//动态信息-评论列表
export function V2DynamicDiscussList(params, config) { return request.post('/v2/Dynamic/DynamicDiscussList', params, config) }

//删除动态
export function V2DelDynamic(params, config) { return request.post('/v2/Dynamic/DelDynamic', params, config) }

//删除动态评论
export function V2DelDynamicDiscuss(params, config) { return request.post('/v2/Dynamic/DelDynamicDiscuss', params, config) }

//收藏动态
export function V2CollectDynamic(params, config) { return request.post('/v2/Dynamic/CollectDynamic', params, config) }

//点赞动态
export function V2ThumbsUpDynamic(params, config) { return request.post('/v2/Dynamic/ThumbsUpDynamic', params, config) }

//我发起的评论列表
export function V2MySendDiscussList(params, config) { return request.post('/v2/Dynamic/MySendDiscussList', params, config) }

//我收到的评论列表
export function V2MyReceiveDiscussList(params, config) { return request.post('/v2/Dynamic/MyReceiveDiscussList', params, config) }

//我收到的赞列表
export function V2MyReceiveThumbsUpList(params, config) { return request.post('/v2/Dynamic/MyReceiveThumbsUpList', params, config) }

//我收到的收藏列表
export function V2MyReceiveCollectList(params, config) { return request.post('/v2/Dynamic/MyReceiveCollectList', params, config) }

//新增好友标签
export function V2AddFriendTag(params, config) { return request.post('/v2/Dynamic/AddFriendTag', params, config) }

//商品列表
export function V2GoodsList(params, config) { return request.post('/v2/Goods/GoodsList', params, config) }

//PC端商品详情(该接口弃用)
export function V2GoodsInfo(params, config) { return request.post('/v2/Goods/GoodsInfo', params, config) }

//工位迁移
export function V2LocationMigrate(params, config) { return request.post('/v2/Goods/LocationMigrate', params, config) }

//工位详情
export function V2LocationInfo(params, config) { return request.post('/v2/Goods/LocationInfo', params, config) }

//空间详情
export function V2SpaceInfo(params, config) { return request.post('/v2/Goods/SpaceInfo', params, config) }

//流量详情
export function V2FlowInfo(params, config) { return request.post('/v2/Goods/FlowInfo', params, config) }

//商品下单
export function V2AddGoodsOrder(params, config) { return request.post('/v2/Goods/AddGoodsOrder', params, config) }

//商品订单详情
export function V2GoodsOrderInfo(params, config) { return request.post('/v2/Goods/GoodsOrderInfo', params, config) }

//商品订单支付列表
export function V2GoodsOrderPayList(params, config) { return request.post('/v2/Goods/GoodsOrderPayList', params, config) }

//商品订单支付详情
export function V2GoodsOrderPayInfo(params, config) { return request.post('/v2/Goods/GoodsOrderPayInfo', params, config) }

//查询订单是否支付成功(微信扫码支付专用接口)
export function V2GoodsOrderPayIsSuccess(params, config) { return request.post('/v2/Goods/GoodsOrderPayIsSuccess', params, config) }

//商品订单开票列表
export function V2GoodsInvoiceList(params, config) { return request.post('/v2/Goods/GoodsInvoiceList', params, config) }

//商品订单申请开票
export function V2GoodsWaitingInvoiceList(params, config) { return request.post('/v2/Goods/GoodsWaitingInvoiceList', params, config) }

//商品订单申请开票
export function V2GoodsApplyInvoice(params, config) { return request.post('/v2/Goods/GoodsApplyInvoice', params, config) }

//商品订单开票详情
export function V2GoodsInvoiceInfo(params, config) { return request.post('/v2/Goods/GoodsInvoiceInfo', params, config) }

//商品列表
export function ADMINGoodsList(params, config) { return request.post('/v2/admin/Goods/GoodsList', params, config) }

//新增商品
export function ADMINAddGoods(params, config) { return request.post('/v2/admin/Goods/AddGoods', params, config) }

//删除商品
export function ADMINDelGoods(params, config) { return request.post('/v2/admin/Goods/DelGoods', params, config) }

//管理端订单列表
export function ADMINGoodsOrderList(params, config) { return request.post('/v2/admin/Goods/GoodsOrderList', params, config) }

//管理端商品订单详情
export function ADMINGoodsOrderPayInfo(params, config) { return request.post('/v2/admin/Goods/GoodsOrderPayInfo', params, config) }

//管理端发票审核列表
export function ADMINGoodsInvoiceList(params, config) { return request.post('/v2/admin/Goods/GoodsInvoiceList', params, config) }

//商品订单开票详情
export function ADMINGoodsInvoiceInfo(params, config) { return request.post('/v2/admin/Goods/GoodsInvoiceInfo', params, config) }

//商品订单开票审核
export function ADMINGoodsInvoiceAudit(params, config) { return request.post('/v2/admin/Goods/GoodsInvoiceAudit', params, config) }

//数量相关信息(包括邮件未读、邮件审核、邮件跟进、客户审核、客户跟进)
export function V2NumInfo(params, config) { return request.post('/v2/Mail/NumInfo', params, config) }

//写邮件
export function V2AddMailQueue(params, config) { return request.post('/v2/Mail/AddMailQueue', params, config) }

//收邮件
export function V2ReceiveMail(params, config) { return request.post('/v2/Mail/ReceiveMail', params, config) }

//导入邮件
export function V2ImportMail(params, config) { return request.post('/v2/Mail/ImportMail', params, config) }

//删除附件、删除超大附件
export function V2DelMailFile(params, config) { return request.post('/v2/Mail/DelMailFile', params, config) }

//邮件未读数量
export function V2MailUnReadNum(params, config) { return request.post('/v2/Mail/MailUnReadNum', params, config) }

//发邮件邀请好友
export function V2InviteMail(params, config) { return request.post('/v2/Mail/InviteMail', params, config) }

//发邮件-已读回执
export function V2DispositionNotificationToMail(params, config) { return request.post('/v2/Mail/DispositionNotificationToMail', params, config) }

//邮件列表
export function V2MailList(params, config) { return request.post('/v2/Mail/MailList', params, config) }

//App端邮件列表
export function V2MailListForApp(params, config) { return request.post('/v2/Mail/MailListForApp', params, config) }

//邮件详情
export function V2MailInfo(params, config) { return request.post('/v2/Mail/MailInfo', params, config) }

//转发时获取邮件信息
export function V2ForwardingMailInfo(params, config) { return request.post('/v2/Mail/ForwardingMailInfo', params, config) }

//修改邮件备注信息
export function V2ChangeMailRemark(params, config) { return request.post('/v2/Mail/ChangeMailRemark', params, config) }

//邮件附件下载
export function V2MailFileDownload(params, config) { return request.post('/v2/Mail/MailFileDownload', params, config) }

//邮件阅读追踪记录列表
export function V2MailReadTrackingList(params, config) { return request.post('/v2/Mail/MailReadTrackingList', params, config) }

//邮件阅读追踪
export function V2MailReadTracking(params, config) { return request.get('/v2/Mail/MailReadTracking', params, config) }

//邮件删除or标为垃圾邮件
export function V2OperationEmail(params, config) { return request.post('/v2/Mail/OperationEmail', params, config) }

//邮件彻底删除
export function V2DelEmail(params, config) { return request.post('/v2/Mail/DelEmail', params, config) }

//邮件标记已读和未读
export function V2ReadOrUnReadEmail(params, config) { return request.post('/v2/Mail/ReadOrUnReadEmail', params, config) }

//邮件还原
export function V2RevivificationEmail(params, config) { return request.post('/v2/Mail/RevivificationEmail', params, config) }

//邮件标记全部标记为已读
export function V2AllReadEmail(params, config) { return request.post('/v2/Mail/AllReadEmail', params, config) }

//邮件撤回
export function V2WithdrawEmail(params, config) { return request.post('/v2/Mail/WithdrawEmail', params, config) }

//星标邮件
export function V2StarEmail(params, config) { return request.post('/v2/Mail/StarEmail', params, config) }

//邮件移动
export function V2MailMove(params, config) { return request.post('/v2/Mail/MailMove', params, config) }

//待审核邮件数量
export function V2ToAuditMailNum(params, config) { return request.post('/v2/Mail/ToAuditMailNum', params, config) }

//审核邮件列表
export function V2AuditMailList(params, config) { return request.post('/v2/Mail/AuditMailList', params, config) }

//邮件审核
export function V2MailAudit(params, config) { return request.post('/v2/Mail/MailAudit', params, config) }

//APP端往来邮件
export function V2OutgoingMailList(params, config) { return request.post('/v2/Mail/OutgoingMailList', params, config) }

//邮件删除or标为垃圾邮件_客户联系记录
export function V2OperationEmail_Customer(params, config) { return request.post('/v2/Mail/OperationEmail_Customer', params, config) }

//邮件彻底删除_客户联系记录
export function V2DelEmail_Customer(params, config) { return request.post('/v2/Mail/DelEmail_Customer', params, config) }

//邮件标记已读和未读_客户联系记录
export function V2ReadOrUnReadEmail_Customer(params, config) { return request.post('/v2/Mail/ReadOrUnReadEmail_Customer', params, config) }

//星标邮件_客户联系记录
export function V2StarEmail_Customer(params, config) { return request.post('/v2/Mail/StarEmail_Customer', params, config) }

//邮件移动_客户联系记录
export function V2MailMove_Customer(params, config) { return request.post('/v2/Mail/MailMove_Customer', params, config) }

//微信支付-App支付-统一下单
export function WechatAppPay(params, config) { return request.post('/Pay/WechatAppPay', params, config) }

//微信支付-JsApi支付-统一下单
export function WechatPay_JSAPI(params, config) { return request.post('/Pay/WechatPay_JSAPI', params, config) }

//微信支付-Native支付-统一下单
export function WechatPay_Native(params, config) { return request.post('/Pay/WechatPay_Native', params, config) }

//微信支付-异步回调
export function WechatNotifyUrl(params, config) { return request.post('/Pay/WechatNotifyUrl', params, config) }

//微信申请退款
export function WechatRefund(params, config) { return request.post('/Pay/WechatRefund', params, config) }

//微信退款-异步回调
export function WechatRefundNotifyUrl(params, config) { return request.post('/Pay/WechatRefundNotifyUrl', params, config) }

//微信订单查询
export function WechatOrderQuery(params, config) { return request.post('/Pay/WechatOrderQuery', params, config) }

//微信退款查询
export function WechatRefundQuery(params, config) { return request.post('/Pay/WechatRefundQuery', params, config) }

//支付宝支付-网站支付
export function AliWapPay(params, config) { return request.get('/Pay/AliWapPay', params, config) }

//支付宝支付-App支付
export function AliAppPay(params, config) { return request.post('/Pay/AliAppPay', params, config) }

//支付宝支付-异步回调
export function AliTradePagePayNotifyUrl(params, config) { return request.post('/Pay/AliTradePagePayNotifyUrl', params, config) }

//支付宝退款
export function AliRefund(params, config) { return request.post('/Pay/AliRefund', params, config) }

//支付宝订单查询
export function AliOrderQuery(params, config) { return request.post('/Pay/AliOrderQuery', params, config) }

//支付宝退款查询
export function AliRefundQuery(params, config) { return request.post('/Pay/AliRefundQuery', params, config) }

//Paypal支付-创建订单
export function Paypal_CreateOrder(params, config) { return request.post('/Paypal/Paypal_CreateOrder', params, config) }

//Paypal支付-回调
export function Paypal_NotifyUrl(params, config) { return request.post('/Paypal/Paypal_NotifyUrl', params, config) }

//Paypal支付-回调
export function Test_Paypal_NotifyUrl(params, config) { return request.post('/Paypal/Test_Paypal_NotifyUrl', params, config) }

//管理端-意见反馈列表
export function ADMINFeedbackList(params, config) { return request.post('/admin/Sys/FeedbackList', params, config) }

//管理端-意见反馈详情
export function ADMINFeedbackDetail(params, config) { return request.post('/admin/Sys/FeedbackDetail', params, config) }

//管理端-回复意见反馈
export function ADMINReplyFeedback(params, config) { return request.post('/admin/Sys/ReplyFeedback', params, config) }

//广告位列表
export function ADMINBannerList(params, config) { return request.post('/admin/Sys/BannerList', params, config) }

//新增广告位
export function ADMINAddBanner(params, config) { return request.post('/admin/Sys/AddBanner', params, config) }

//广告位信息
export function ADMINBannerInfo(params, config) { return request.post('/admin/Sys/BannerInfo', params, config) }

//修改广告位信息
export function ADMINChangeBanner(params, config) { return request.post('/admin/Sys/ChangeBanner', params, config) }

//删除广告位
export function ADMINDelBanner(params, config) { return request.post('/admin/Sys/DelBanner', params, config) }

//管理端公告资讯列表
export function ADMINAnnouncementList(params, config) { return request.post('/admin/Sys/AnnouncementList', params, config) }

//管理端新增公告资讯
export function ADMINAddAnnouncement(params, config) { return request.post('/admin/Sys/AddAnnouncement', params, config) }

//管理端删除公告资讯
export function ADMINDelAnnouncement(params, config) { return request.post('/admin/Sys/DelAnnouncement', params, config) }

//管理端公告资讯信息
export function ADMINAnnouncementInfo(params, config) { return request.post('/admin/Sys/AnnouncementInfo', params, config) }

//发送短信验证码
export function SendSMS_Sys(params, config) { return request.post('/Sys/SendSMS', params, config) }

//通过邮件地址获取邮件的IMAP服务器和STMP服务器
export function GetEmailService(params, config) { return request.post('/Sys/GetEmailService', params, config) }

//所在行业数据
export function IndustryList(params, config) { return request.post('/Sys/IndustryList', params, config) }

//汇率数据
export function RateData(params, config) { return request.post('/Sys/RateData', params, config) }

//参数列表
export function ParameterList(params, config) { return request.post('/Sys/ParameterList', params, config) }

//新增参数
export function AddParameter(params, config) { return request.post('/Sys/AddParameter', params, config) }

//删除参数
export function DelParameter(params, config) { return request.post('/Sys/DelParameter', params, config) }

//国家列表
export function FlagList(params, config) { return request.post('/Sys/FlagList', params, config) }

//未读消息数量
export function UnReadNoticeNum(params, config) { return request.post('/Sys/UnReadNoticeNum', params, config) }

//手机端专用接口-消息未读数量和最新消息信息
export function LatestNotice(params, config) { return request.post('/Sys/LatestNotice', params, config) }

//通知列表
export function NoticeList(params, config) { return request.post('/Sys/NoticeList', params, config) }

//公告资讯列表
export function AnnouncementList(params, config) { return request.post('/Sys/AnnouncementList', params, config) }

//公告资讯信息
export function AnnouncementInfo(params, config) { return request.post('/Sys/AnnouncementInfo', params, config) }

//消息列表_手机端接口
export function NoticeList_App(params, config) { return request.post('/Sys/NoticeList_App', params, config) }

//通知信息
export function NoticeDetail(params, config) { return request.post('/Sys/NoticeDetail', params, config) }

//通知内容
export function NoticeInfo(params, config) { return request.post('/Sys/NoticeInfo', params, config) }

//通知-设置已操作v
export function NoticeIsOperation(params, config) { return request.post('/Sys/NoticeIsOperation', params, config) }

//通知一键已读
export function NoticeIsRead(params, config) { return request.post('/Sys/NoticeIsRead', params, config) }

//通知全部已读
export function NoticeAllRead(params, config) { return request.post('/Sys/NoticeAllRead', params, config) }

//修改七牛云的文件名
export function ChangeFileName(params, config) { return request.post('/Sys/ChangeFileName', params, config) }

//广告位列表
export function BannerList(params, config) { return request.post('/Sys/BannerList', params, config) }

//图片合成
export function ImageMosaic(params, config) { return request.post('/Sys/ImageMosaic', params, config) }

//意见反馈列表
export function FeedbackList(params, config) { return request.post('/Sys/FeedbackList', params, config) }

//意见反馈详情
export function FeedbackDetail(params, config) { return request.post('/Sys/FeedbackDetail', params, config) }

//新增意见反馈
export function AddFeedback(params, config) { return request.post('/Sys/AddFeedback', params, config) }

//新增意见反馈详情
export function AddFeedbackDetail(params, config) { return request.post('/Sys/AddFeedbackDetail', params, config) }

//意见反馈-已解决
export function Feedback_Success(params, config) { return request.post('/Sys/Feedback_Success', params, config) }

//团队列表
export function V2TeamList(params, config) { return request.get('/front/mailTeam/list', params, config) }

//我在团队的信息
export function V2MyTeamInfo(params, config) { return request.post('/v2/Team/MyTeamInfo', params, config) }

//首页-团队数据
export function V2TeamData(params, config) { return request.post('/v2/Team/TeamData', params, config) }

//跟进提醒数量
export function V2FollowNum(params, config) { return request.post('/v2/Team/FollowNum', params, config) }

//创建团队
export function V2CreateTeam(params, config) { return request.post('/front/mailTeam/add', params, config) }

//团队_修改团队名称
export function V2ChangeTeamName(params, config) { return request.post('/v2/Team/ChangeTeamName', params, config) }

//删除团队
export function V2DelTeam(params, config) { return request.post('/v2/Team/DelTeam', params, config) }

//团队_团队工位信息
export function V2TeamLocationInfo(params, config) { return request.post('/v2/Team/TeamLocationInfo', params, config) }

//团队_成员列表
export function V2TeamMember(params, config) { return request.post('/v2/Team/TeamMember', params, config) }

//团队_分管成员列表(客户分管设置时调用该接口)
export function V2InchangeMemberList(params, config) { return request.post('/v2/Team/InchangeMemberList', params, config) }

//团队_成员详情
export function V2TeamMemberInfo(params, config) { return request.post('/v2/Team/TeamMemberInfo', params, config) }

//团队_邀请成员(系统通知)
export function V2InviteMember(params, config) { return request.post('/v2/Team/InviteMember', params, config) }

//企业团队_邀请成员
export function V2InviteMember_Enterprise(params, config) { return request.post('/v2/Team/InviteMember_Enterprise', params, config) }

//团队_新增成员(个人账号邀请团队成员且邀请成功)
export function V2AddTeamMember(params, config) { return request.post('/v2/Team/AddTeamMember', params, config) }

//团队_取消邀请
export function V2CancelInvite(params, config) { return request.post('/v2/Team/CancelInvite', params, config) }

//团队_拒绝邀请(邀请加入团队时，用户拒绝)
export function V2RefusedTeamMember(params, config) { return request.post('/v2/Team/RefusedTeamMember', params, config) }

//团队_退出团队
export function V2ExitTeam(params, config) { return request.post('/v2/Team/ExitTeam', params, config) }

//团队_解绑成员
export function V2DelTeamMember(params, config) { return request.post('/v2/Team/DelTeamMember', params, config) }

//团队_批量解绑成员
export function V2BatchDelTeamMember(params, config) { return request.post('/v2/Team/BatchDelTeamMember', params, config) }

//团队_成员设置
export function V2SetTeamMember(params, config) { return request.post('/v2/Team/SetTeamMember', params, config) }

//团队_部门列表
export function V2TeamDepartmentList(params, config) { return request.post('/v2/Team/TeamDepartmentList', params, config) }

//团队_新增部门
export function V2AddTeamDepartment(params, config) { return request.post('/v2/Team/AddTeamDepartment', params, config) }

//团队_修改部门
export function V2ChangeTeamDepartment(params, config) { return request.post('/v2/Team/ChangeTeamDepartment', params, config) }

//团队_部门成员列表
export function V2TeamDepartmentMemberList(params, config) { return request.post('/v2/Team/TeamDepartmentMemberList', params, config) }

//团队_删除部门
export function V2DelTeamDepartment(params, config) { return request.post('/v2/Team/DelTeamDepartment', params, config) }

//团队_批量删除部门
export function V2BatchDelTeamDepartment(params, config) { return request.post('/v2/Team/BatchDelTeamDepartment', params, config) }

//团队_成员默认邮箱设置
export function V2MemberMailboxSet(params, config) { return request.post('/v2/Team/MemberMailboxSet', params, config) }

//邮箱检测
export function V2MailDetection(params, config) { return request.post('/v2/Team/MailDetection', params, config) }

//团队_成员邮箱列表
export function V2MemberMailboxList(params, config) { return request.post('/v2/Team/MemberMailboxList', params, config) }

//团队_成员邮箱信息
export function V2MemberMailboxInfo(params, config) { return request.post('/v2/Team/MemberMailboxInfo', params, config) }

//团队_新增成员邮箱
export function V2AddMemberMailbox(params, config) { return request.post('/v2/Team/AddMemberMailbox', params, config) }

//团队_修改成员邮箱
export function V2ChangeMemberMailbox(params, config) { return request.post('/v2/Team/ChangeMemberMailbox', params, config) }

//团队_删除成员邮箱
export function V2DelMemberMailbox(params, config) { return request.post('/v2/Team/DelMemberMailbox', params, config) }

//团队_批量删除成员邮箱
export function V2BatchDelMemberMailbox(params, config) { return request.post('/v2/Team/BatchDelMemberMailbox', params, config) }

//获取当前用户绑定的所有邮箱
export function V2UserBindMailboxList(params, config) { return request.post('/v2/Team/UserBindMailboxList', params, config) }

//团队_邮箱黑名单列表
export function V2MailboxBlackList(params, config) { return request.post('/v2/Team/MailboxBlackList', params, config) }

//团队_邮箱黑名单设置
export function V2MailboxBlackSet(params, config) { return request.post('/v2/Team/MailboxBlackSet', params, config) }

//团队_删除邮箱黑名单
export function V2DelMailboxBlack(params, config) { return request.post('/v2/Team/DelMailboxBlack', params, config) }

//团队_客户黑名单列表
export function V2CustomerBlackList(params, config) { return request.post('/v2/Team/CustomerBlackList', params, config) }

//团队_客户黑名单设置
export function V2CustomerBlackSet(params, config) { return request.post('/v2/Team/CustomerBlackSet', params, config) }

//团队_删除客户黑名单
export function V2DelCustomerBlack(params, config) { return request.post('/v2/Team/DelCustomerBlack', params, config) }

//创建发信域名
export function CreateEmailIdentity(params, config) { return request.post('/Tencent/CreateEmailIdentity', params, config) }

//获取当前发信域名列表
export function ListEmailIdentities(params, config) { return request.post('/Tencent/ListEmailIdentities', params, config) }

//获取域名配置详情
export function GetEmailIdentity(params, config) { return request.post('/Tencent/GetEmailIdentity', params, config) }

//删除发信域名
export function DeleteEmailIdentity(params, config) { return request.post('/Tencent/DeleteEmailIdentity', params, config) }

//创建邮件模板
export function CreateEmailTemplate(params, config) { return request.post('/Tencent/CreateEmailTemplate', params, config) }

//更新邮件模板
export function UpdateEmailTemplate(params, config) { return request.post('/Tencent/UpdateEmailTemplate', params, config) }

//获取邮件模板详情
export function GetEmailTemplate(params, config) { return request.post('/Tencent/GetEmailTemplate', params, config) }

//获取邮件模板列表
export function ListEmailTemplates(params, config) { return request.post('/Tencent/ListEmailTemplates', params, config) }

//删除邮件模板
export function DeleteEmailTemplate(params, config) { return request.post('/Tencent/DeleteEmailTemplate', params, config) }

//发送邮件
export function SendEmail(params, config) { return request.post('/Tencent/SendEmail', params, config) }

//批量发送邮件
export function BatchSendEmail(params, config) { return request.post('/Tencent/BatchSendEmail', params, config) }

//获取七牛云日志
export function GetQiNiuLog(params, config) { return request.get('/TimingTask/GetQiNiuLog', params, config) }

//团队邀请成员超时过期
export function TeamMemberInviteTimeout(params, config) { return request.get('/TimingTask/TeamMemberInviteTimeout', params, config) }

//结束分享已过期的文件
export function SetCloudFileSharedInvalid(params, config) { return request.get('/TimingTask/SetCloudFileSharedInvalid', params, config) }

//资源过期
export function ResourceTimeout(params, config) { return request.get('/TimingTask/ResourceTimeout', params, config) }

//已删除的云文件30天后彻底删除
export function CouldFile_CompletelyDelete(params, config) { return request.get('/TimingTask/CouldFile_CompletelyDelete', params, config) }

//删除七牛云文件
export function CouldFile_CopyRecordDelete(params, config) { return request.get('/TimingTask/CouldFile_CopyRecordDelete', params, config) }

//用户流量资源耗尽时，失效分享的云文件链接
export function UserFlowIsUseUp(params, config) { return request.get('/TimingTask/UserFlowIsUseUp', params, config) }

//云文件打包
export function CloudFileMkZip_TimingTask(params, config) { return request.get('/TimingTask/CloudFileMkZip', params, config) }

//超时的置顶公告取消置顶功能
export function TimeoutIsTop(params, config) { return request.get('/TimingTask/TimeoutIsTop', params, config) }

//处理团队解散后的文件数据
export function TimeoutDelTeamQiniuFile(params, config) { return request.get('/TimingTask/TimeoutDelTeamQiniuFile', params, config) }

//处理用户注销后的文件数据
export function TimeoutDelUserQiniuFile(params, config) { return request.get('/TimingTask/TimeoutDelUserQiniuFile', params, config) }

//处理导入邮件卡住问题
export function ImportMailQuestion(params, config) { return request.get('/TimingTask/ImportMailQuestion', params, config) }

//待办事项列表_日
export function V2TodoForDayList(params, config) { return request.post('/v2/Todo/TodoForDayList', params, config) }

//待办事项列表_月
export function V2TodoForMonthList(params, config) { return request.post('/v2/Todo/TodoForMonthList', params, config) }

//新增待办事项
export function V2AddTodo(params, config) { return request.post('/v2/Todo/AddTodo', params, config) }

//删除待办事项
export function V2DelTodo(params, config) { return request.post('/v2/Todo/DelTodo', params, config) }

//百度编辑器参数配置接口
export function UEditorParameter(params, config) { return request.post('/UEditor/UEditorParameter', params, config) }

//判断App是否需要更新
export function V2VerifyAppVersion(params, config) { return request.post('/v2/User/VerifyAppVersion', params, config) }

//获取图形验证码
export function V2GetImgVerifyCode(params, config) { return request.get(`/sys/randomImage/${params}`, {}, config) }

//个人账号登录
export function V2Login(params, config) { return request.post('/sys/front/selfLogin', params, config) }

//企业账号登录
export function V2Login_Enterprise(params, config) { return request.post('/sys/front/companyLogin', params, config) }

//通过手机号码获取用户信息
export function V2GetUserInfoForPhone(params, config) { return request.post('/v2/User/GetUserInfoForPhone', params, config) }

//通过GUID获取用户信息
export function V2UserInfoForGUID(params, config) { return request.post('/v2/User/UserInfoForGUID', params, config) }

//通过UserCode或账号获取用户信息
export function V2UserInfoForUserCode_Phone(params, config) { return request.post('/v2/User/UserInfoForUserCode_Phone', params, config) }

//通过token获取用户信息
export function V2UserInfoForToken(params, config) { return request.get('/front/mailFrontUser/queryByIdByLogin', params, config) }

//APP端添加好友时获取用户GUID
export function V2GetUserGUID(params, config) { return request.post('/v2/User/GetUserGUID', params, config) }

//判断手机号码是否已注册
export function V2CheckPhoneIsRegister(params, config) { return request.post('/v2/User/CheckPhoneIsRegister', params, config) }

//个人账号注册
export function V2Register(params, config) { return request.post('/v2/User/Register', params, config) }

//个人账号忘记密码
export function V2ForgetPassword(params, config) { return request.post('/v2/User/ForgetPassword', params, config) }

//添加好友时发送系统通知
export function V2AddFriendNotice(params, config) { return request.post('/v2/User/AddFriendNotice', params, config) }

//同意好友后消除添加好友系统通知
export function V2RemoveFriendNotice(params, config) { return request.post('/v2/User/RemoveFriendNotice', params, config) }

//修改用户信息
export function V2ChangeUserInfo(params, config) { return request.post('/v2/User/ChangeUserInfo', params, config) }

//修改密码
export function V2ChangePassword(params, config) { return request.post('/v2/User/ChangePassword', params, config) }

//修改安全手机
export function V2ChangePhone(params, config) { return request.post('/v2/User/ChangePhone', params, config) }

//解绑安全手机
export function V2UnbundlingPhone(params, config) { return request.post('/v2/User/UnbundlingPhone', params, config) }

//修改安全邮箱
export function V2ChangeEmailBind(params, config) { return request.post('/v2/User/ChangeEmailBind', params, config) }

//解绑安全邮箱
export function V2UnbundlingEmailBind(params, config) { return request.post('/v2/User/UnbundlingEmailBind', params, config) }

//修改用户语言
export function V2ChangeLanguage(params, config) { return request.post('/v2/User/ChangeLanguage', params, config) }

//修改登录保持时间
export function V2ChangeLoginDuration(params, config) { return request.post('/v2/User/ChangeLoginDuration', params, config) }

//账号注销
export function V2AccountLogout(params, config) { return request.post('/v2/User/AccountLogout', params, config) }

//注册企业
export function V2Register_Enterprise(params, config) { return request.post('/v2/User/Register_Enterprise', params, config) }

//企业信息
export function V2EnterpriseInfo(params, config) { return request.post('/v2/User/EnterpriseInfo', params, config) }

//编辑企业信息
export function V2Change_Enterprise(params, config) { return request.post('/v2/User/Change_Enterprise', params, config) }

//企业子账号列表
export function V2EnterpriseAccountList(params, config) { return request.post('/v2/User/EnterpriseAccountList', params, config) }

//企业不在团队的子账号列表
export function V2EnterpriseNotTeamAccountList(params, config) { return request.post('/v2/User/EnterpriseNotTeamAccountList', params, config) }

//企业新增子账号
export function V2AddChildAccount(params, config) { return request.post('/v2/User/AddChildAccount', params, config) }

//企业子账号信息
export function V2ChildAccountInfo(params, config) { return request.post('/v2/User/ChildAccountInfo', params, config) }

//编辑企业子账号(只适用PC端)
export function V2ChangeChildAccount(params, config) { return request.post('/v2/User/ChangeChildAccount', params, config) }

//企业子账号重置密码(接口已废弃)
export function V2ChildAccountResetPassword(params, config) { return request.post('/v2/User/ChildAccountResetPassword', params, config) }

//企业主账号修改子账号密码
export function V2ChangeChildAccountPassword(params, config) { return request.post('/v2/User/ChangeChildAccountPassword', params, config) }

//企业删除子账号
export function V2DelChildAccount(params, config) { return request.post('/v2/User/DelChildAccount', params, config) }

//企业主账号给子账号分配资源
export function V2AllocationResource(params, config) { return request.post('/v2/User/AllocationResource', params, config) }

//用户列表
export function V2UserList(params, config) { return request.post('/v2/User/UserList', params, config) }

//用户下拉列表
export function V2UserSelectList(params, config) { return request.post('/v2/User/UserSelectList', params, config) }

//用户邮件模板列表
export function V2UserMailTemplateList(params, config) { return request.post('/v2/User/UserMailTemplateList', params, config) }

//新增用户邮件模板
export function V2AddUserMailTemplate(params, config) { return request.post('/v2/User/AddUserMailTemplate', params, config) }

//删除用户邮件模板
export function V2DelUserMailTemplate(params, config) { return request.post('/v2/User/DelUserMailTemplate', params, config) }

//实名认证
export function V2RealNameAuthentication(params, config) { return request.post('/v2/User/RealNameAuthentication', params, config) }

//账户中心-基本信息
export function V2AccountInfo(params, config) { return request.post('/v2/User/AccountInfo', params, config) }

//手机端会员详情
export function V2VipData(params, config) { return request.post('/v2/User/VipData', params, config) }

//获取PLUS会员价格
export function V2GetVipInfo(params, config) { return request.post('/v2/User/GetVipInfo', params, config) }

//IM_邀请入群
export function V2IM_AddMember(params, config) { return request.post('/v2/User/IM_AddMember', params, config) }

//IM_回调接口
export function V2IM_Callback(params, config) { return request.post('/v2/User/IM_Callback', params, config) }

//设置个性化推荐开关
export function V2SetPersonalizedSwitch(params, config) { return request.post('/v2/User/SetPersonalizedSwitch', params, config) }

//工位列表
export function V2LocationList(params, config) { return request.post('/v2/User/LocationList', params, config) }

//续费工位列表
export function V2RenewalLocationList(params, config) { return request.post('/v2/User/RenewalLocationList', params, config) }

//空闲工位列表(迁移工位前调用该接口)
export function V2FreeLocationList(params, config) { return request.post('/v2/User/FreeLocationList', params, config) }

//个人中心信息
export function V2PersonalCenterInfo(params, config) { return request.post('/v2/User/PersonalCenterInfo', params, config) }

//编辑个人信息
export function V2EditPersonalCenterInfo(params, config) { return request.post('/v2/User/EditPersonalCenterInfo', params, config) }

//店铺列表
export function V2ShopList(params, config) { return request.post('/v2/User/ShopList', params, config) }

//店铺信息
export function V2ShopInfo(params, config) { return request.post('/v2/User/ShopInfo', params, config) }

//新增/编辑店铺信息
export function V2AddShop(params, config) { return request.post('/v2/User/AddShop', params, config) }

//删除店铺信息
export function V2DelShop(params, config) { return request.post('/v2/User/DelShop', params, config) }

//公司列表
export function V2CompanyList(params, config) { return request.post('/v2/User/CompanyList', params, config) }

//公司信息
export function V2CompanyInfo(params, config) { return request.post('/v2/User/CompanyInfo', params, config) }

//新增/编辑公司信息
export function V2AddCompany(params, config) { return request.post('/v2/User/AddCompany', params, config) }

//删除公司信息
export function V2DelCompany(params, config) { return request.post('/v2/User/DelCompany', params, config) }

//获取用户列表(圈子权限处会用到)
export function V2UserListForIDs(params, config) { return request.post('/v2/User/UserListForIDs', params, config) }

//登录
export function ADMINLogin(params, config) { return request.post('/v2/admin/UserAdmin/Login', params, config) }

//App版本号列表 类型 0=全部 1=ios 2=android
export function ADMINAppVersionList(params, config) { return request.post('/v2/admin/UserAdmin/AppVersionList', params, config) }

//App版本号详情
export function ADMINAppVersionInfo(params, config) { return request.post('/v2/admin/UserAdmin/AppVersionInfo', params, config) }

//新增App版本号信息
export function ADMINAddAppVersion(params, config) { return request.post('/v2/admin/UserAdmin/AddAppVersion', params, config) }

//启用or禁用版本
export function ADMINUsingAppVersion(params, config) { return request.post('/v2/admin/UserAdmin/UsingAppVersion', params, config) }

//删除版本
export function ADMINDelAppVersion(params, config) { return request.post('/v2/admin/UserAdmin/DelAppVersion', params, config) }

//管理端团队列表
export function ADMINTeamList(params, config) { return request.post('/v2/admin/UserAdmin/TeamList', params, config) }

//管理端个人用户列表
export function ADMINPersonalUserList_Admin(params, config) { return request.post('/v2/admin/UserAdmin/PersonalUserList_Admin', params, config) }

//管理端个人用户详情
export function ADMINPersonalUserInfo_Admin(params, config) { return request.post('/v2/admin/UserAdmin/PersonalUserInfo_Admin', params, config) }

//管理端企业用户列表
export function ADMINEnterpriseUserList_Admin(params, config) { return request.post('/v2/admin/UserAdmin/EnterpriseUserList_Admin', params, config) }

//管理端企业详情
export function ADMINEnterpriseInfo(params, config) { return request.post('/v2/admin/UserAdmin/EnterpriseInfo', params, config) }

//管理端企业子账号列表
export function ADMINEnterpriseAccountList(params, config) { return request.post('/v2/admin/UserAdmin/EnterpriseAccountList', params, config) }

//管理端用户列表_禁用/解禁
export function ADMINUserList_IsDisable(params, config) { return request.post('/v2/admin/UserAdmin/UserList_IsDisable', params, config) }



// 获取邮箱列表
export function getMailConfigList(params, config) {
  return request.get('/mail/config/getMailConfigList', {}, config);
}

// 保存邮箱
export function setMailConfigList(params, config) {
  return request.post('/mail/config/saveMailConfig', params, config);
}

// 删除邮箱
export function delConfigById(params, config) {
  return request.get('/mail/config/delConfigById', params, config);
}

// 更新邮箱
export function updateConfig(params, config) {
  return request.post('/mail/config/updateConfig', params, config);
}

// 发送邮件
export function sendMail(params, config) {
  return request.post('/mail/business/sendMail', params, config);
}

// 设置默认邮箱
export function updateConfigState(params, config) {
  return request.get('/mail/config/updateConfigState', params, config);
}

// 获取默认邮箱
export function getDefaultMailConfig() {
  return request.get('/mail/config/getDefaultMailConfig', {}, {});
}

// 收邮件
export function getMailByDay(params, config) {
  return request.get('/mail/accept/getMailByDay', params, config);
}

// 获取邮件
export function getMail(params, config) {
  return request.get('/mail/business/getMail', params, config);
}

// 保存草稿箱
export function saveDraft(params, config) {
  return request.post('/mail/business/saveDraft', params, config);
}

// 获取邮件详情
export function getMailDetails(params, config) {
  return request.get('/mail/business/mailDetails', params, config);
}

// 标记邮件
export function tagMail(params, config) {
  return request.post('/mail/business/updateEmailStatus', params, config);
}

// 全部已读
export function tagAllRead(params, config) {
  return request.get('/mail/business/allRead', params, config);
}

// 删除邮件
export function delMail(params, config) {
  return request.post('/mail/business/delMail', params, config);
}

// 