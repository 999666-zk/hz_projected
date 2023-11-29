import store from '@/store'
import _store from 'store2'
import moment from 'moment'
// import Vue from 'vue'
import { EventEmitterSingle } from '@/utils/EventEmitter.js'
let EventEmitter = EventEmitterSingle()

// 从v2.11.2起，SDK 支持了 WebSocket，推荐接入；v2.10.2及以下版本，使用 HTTP
import TIM from 'tim-js-sdk/tim-js-friendship.js'
import TIMUploadPlugin from 'tim-upload-plugin'

let tim = null

let createTIM = function() {
	let options = {
		SDKAppID: 1400574967, // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
		oversea: true // 支持海外接入
	}
	// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
	tim = TIM.create(options) // SDK 实例通常用 tim 表示
	// 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
	// tim.setLogLevel(4) // 普通级别，日志量较多，接入时建议使用
	// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
	tim.setLogLevel(process.env.NODE_ENV !== 'production' ? 1 : 4)
	// 注册腾讯云即时通信 IM 上传插件
	tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
	initLinster(tim) //初始化事件
	window.TIM = TIM //注入到window供全局参数使用
	// Vue.prototype.TIM = TIM //这个和上面一个意思
	// Vue.prototype.$tim = tim //tim的初始化对象
	return tim
}

const timLogin = async function() {
	console.log('timInitBeforeLogin')
	var userID = _store.get('guid')
	var userSig = _store.get('imSign')

	try {
		// 登录IM
		let imResponse = await tim.login({ userID, userSig })
		store.commit('system/setTimOnline', true) //标记为登录成功
		console.log('[TIM]登录成功', imResponse.data) // 登录成功
		if (imResponse.data.repeatLogin === true) {
			// 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
			console.log('[TIM]标识账号已登录，本次登录操作为重复登录', imResponse.data.errorInfo)
		}
	} catch (imError) {
		console.warn('[TIM]login error:', imError) // 登录失败的相关信息
	}
}

const initLinster = function(tim) {
	//tim好友列表刷新回调
	tim.on(TIM.EVENT.FRIEND_LIST_UPDATED, e => {
		console.log('[TIM]好友列表', TIM.EVENT.FRIEND_LIST_UPDATED, e.data)
		store.commit('system/setFriendList', e.data)
	})
	// 群组列表刷新
	tim.on(TIM.EVENT.GROUP_LIST_UPDATED, e => {
		console.log('[TIM]群组列表', e) // 包含 Group 实例的数组
		store.commit('system/setGroupList', e.data)
	})
	// 好友申请列表
	tim.on(TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED, e => {
		// friendApplicationList - 好友申请列表 - [FriendApplication]
		// unreadCount - 好友申请的未读数
		console.log('[TIM]好友申请列表', e.data)
		const { friendApplicationList, unreadCount } = e.data
		// 发送给我的好友申请（即别人申请加我为好友）(并且过滤掉请求超过15天的)
		const applicationSentToMe = friendApplicationList.filter(
			friendApplication => friendApplication.type === TIM.TYPES.SNS_APPLICATION_SENT_TO_ME && moment().diff(moment(friendApplication.time * 1000), 'days', true) < 15
		)
		// 我发送出去的好友申请（即我申请加别人为好友）
		// const applicationSentByMe = friendApplicationList.filter(friendApplication => friendApplication.type === TIM.TYPES.SNS_APPLICATION_SENT_BY_ME)
		store.commit('system/setFrientRequestList', applicationSentToMe)
		// store.commit('system/setFrientRequestUnreadCount', unreadCount)
		let list = applicationSentToMe.filter(item => moment().diff(moment(item.time * 1000), 'days', true) < 7)
		store.commit('system/setFrientRequestUnreadCount', list.length)
		EventEmitter.emit('newFriendApply')
	})
	// 会话列表更新
	tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, e => {
		console.log('[TIM]会话列表更新', e.data)
		store.commit('system/setConversationList', e.data) // 会话列表，用该列表覆盖原有的会话列表
	})

	// // 收到新信息
	// tim.on(TIM.EVENT.MESSAGE_RECEIVED, event => {
	// 	console.log('[TIM]获取新信息', event)
	// 	// event.data - 存储 Message 对象的数组 - [Message]
	// 	const ChatId = 'C2C' + event.data[0].from
	// 	if (ChatId == this.talkId) {
	// 		this.chatList = [...this.chatList, ...event.data]
	// 		this.alreadyRead(this.talkId)
	// 	} else {
	// 		console.log(' ')
	// 	}
	// })

	//SDK已准备
	tim.on(TIM.EVENT.SDK_READY, event => {
		console.log('[TIM]SDK已准备', event)
		getConversationList() //拉取会话列表
		getGroupList()
	})

	// 退出登录，掉线
	tim.on(TIM.EVENT.KICKED_OUT, event => {
		// console.log('退出登录', event)
		// TIM.TYPES.KICKED_OUT_MULT_ACCOUNT(Web 端，同一账号，多页面登录被踢)
		// TIM.TYPES.KICKED_OUT_MULT_DEVICE(同一账号，多端登录被踢)
		// TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED(签名过期。使用前需要将 SDK 版本升级至v2.4.0或以上)
		store.commit('system/setTimOnline', false) //设置掉线状态
	})
}

// 拉取会话列表
//https://cloud.tencent.com/document/product/269/37449
//进系统第一次拉 后面靠接受到的信息
const getConversationList = function() {
	tim
		.getConversationList()
		.then(imResponse => {
			console.log('[TIM]获取会话列表', imResponse.data.conversationList)
			store.commit('system/setConversationList', imResponse.data.conversationList) // 会话列表，用该列表覆盖原有的会话列表
		})
		.catch(imError => {
			console.warn('[TIM]获取会话列表失败', imError) // 获取会话列表失败的相关信息
		})
}

const getGroupList = function() {
	// 这句函数可以影响到IM缓存
	// 若默认拉取的字段不满足需求，可以参考下述代码，拉取额外的资料字段。
	// 群资料过滤器。除默认拉取的群资料外，指定需要额外拉取的群资料，支持的值如下：
	// TIM.TYPES.GRP_PROFILE_OWNER_ID（群主 ID）
	// TIM.TYPES.GRP_PROFILE_CREATE_TIME（群创建时间）
	// TIM.TYPES.GRP_PROFILE_LAST_INFO_TIME（最后一次群资料变更时间）
	// TIM.TYPES.GRP_PROFILE_MEMBER_NUM（群成员数量）
	// TIM.TYPES.GRP_PROFILE_MAX_MEMBER_NUM（最大群成员数量）
	// TIM.TYPES.GRP_PROFILE_JOIN_OPTION（申请加群选项）
	// TIM.TYPES.GRP_PROFILE_INTRODUCTION（群介绍）
	// TIM.TYPES.GRP_PROFILE_NOTIFICATION（群公告）
	// TIM.TYPES.GRP_PROFILE_MUTE_ALL_MBRS (全体禁言设置) v2.6.2起支持
	tim
		.getGroupList({
			groupProfileFilter: [TIM.TYPES.GRP_PROFILE_MEMBER_NUM]
		})
		.then(imResponse => {
			console.log('[TIM]取群组列表', imResponse.data.groupList) // 包含 Group 实例的数组
			store.commit('system/setGroupList', imResponse.data.groupList)
		})
		.catch(function(imError) {
			console.warn('[TIM]取群组列表失败', imError) // 获取群组列表失败的相关信息
		})
}

export { TIM, createTIM, timLogin, getConversationList, getGroupList }
