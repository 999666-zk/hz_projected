import _store from 'store2';
import { V2UserInfoForToken } from '../../api/index';
// import { removeNeedTokenRequest } from '@/utils/request'

const userInfo = {
	account: '',
	accountType: 1, //10=个人账号 2=企业子账号 3=企业主账号
	enterpriseID: 0,
	guid: '',
	iM_Sign: '',
	photoUrl: '',
	token: '',
	userID: 0,
	userName: '',
	userType: 10 //10 普通 20管路员 99主账号
}

const UserInfoForGUID = {
	guid: '',
	zoneCode: '',
	userCode: '',
	token: '',
	userID: 0,
	accountType: 1,
	enterpriseID: 0,
	account: '',
	userName: '',
	phoneCode: '',
	phone: '',
	identificationStatus: 0,
	photoUrl: '',
	sex: 0,
	country: '',
	address: '',
	language: '',
	emailAddress: '',
	iM_Sign: '',
	teamID: 0,
	isVip: 0,
	vipExpireDate: null
}

const token = _store.get('token')
const loginStatus = !!token || false
const UserEmailList = _store.get('UserEmailList') || []
const user = {
	namespaced: true,
	state: {
		loginStatus,
		userInfo: _store.get('userInfo') || userInfo,
		UserInfoForGUID: _store.get('UserInfoForGUID') || UserInfoForGUID,
		token,
		UserEmailList
	},
	getters: {
		isEnterpriseMainUser(state) {
			return state.userInfo.accountType === 3
		},
		isEnterpriseChildUser(state) {
			return state.userInfo.accountType === 2
		},
		isNomailUser(state) {
			return state.userInfo.accountType === 1
		}
	},
	mutations: {
		SetUserEmailList(state, list) {
			state.UserEmailList = list
			_store('UserEmailList', list)
		}
	},
	actions: {
		UserLogin({ state, commit }, userInfo) {
			Object.assign(state.userInfo, userInfo)
			state.token = userInfo.token
			_store('userInfo', userInfo)
			_store('token', userInfo.token)
			// _store('imSign', userInfo.iM_Sign)
			_store('guid', userInfo.guid)
			_store('nBarUnreadMailNum', 0)
			commit('system/changeLanguage', userInfo.language, { root: true })
			state.loginStatus = true
		},
		UserQuit({ state, rootState, dispatch }) {
			// removeNeedTokenRequest()
			state.token = ''
			state.UserEmailList = []
			state.loginStatus = false
			_store.remove('userInfo')
			_store.remove('UserInfoForGUID')
			Object.assign(state.userInfo, userInfo)
			Object.assign(state.UserInfoForGUID, UserInfoForGUID)
			_store.remove('token')
			_store.remove('imSign')
			_store.remove('guid')
			_store.remove('UserEmailList')
			_store('nBarUnreadMailNum', 0)
			localStorage.removeItem('currentTime')
			localStorage.removeItem('lastTime')
			// 清除其他模块
			let { email, system, cloud } = rootState
			Object.assign(system.tabList[1], { cacheName: '', query: {}, params: {} }) //重新登录后去除邮件缓存
			email.teamID = ''
			email.teamList = [] //重置团队列表
			email.teamListLoaded = false //是否获取teamList重置
			email.EmailUnReadNum = 0 //重置邮件未读数
			email.RequestToAuditSum = 0
			email.auditMailNum = 0
			email.nBarUnreadMailNum = 0
			email.mailFollowNum = 0
			email.customerFollowNum = 0
			system.friendList = [] //重置好友列表
			cloud.downloadStatus = 'done'
			dispatch('email/resetTeam', {}, { root: true })
			system.isChatBoxVisibe = false //关闭聊天
		},
		async getUserInfoForGUID({ state }) {
			const result = await V2UserInfoForToken()
			console.log(result);
			const accountType = result.result.accountType;
			// _store('UserInfoForGUID', accountType)
		}
	}
}

export default user
