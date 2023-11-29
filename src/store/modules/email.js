import _store from 'store2'
import { V2MailUnReadNum, V2RequestToAuditList, V2FollowNum, V2ToAuditMailNum, V2TeamList } from '@/api/index'
// import { EventEmitterSingle } from '@/utils/EventEmitter.js'
// const EventEmitter = EventEmitterSingle()

const email = {
	namespaced: true,
	state: {
		teamID: 0,
		//团队
		teamList: [], //团队名称
		teamListLoaded: false, //是否已加载团队列表
	},
	mutations: {
		setCurTeamID(state, val) {
			state.teamID = val
		},
		setCurTeamMyMemberType(state, val) {
			state.curTeamMyMemberType = val
		},
		//设置我的默认邮箱
		setMyDefaultMailbox(state, val) {
			state.defaultMailbox = val
		},
		//设置我的邮箱列表
		setMyUserEmailList(state, val) {
			state.myUserEmailList = val
		},
		setSelectTeamMembers_Admin(state, val) {
			state.selectTeamMembers_Admin = val
		},
		setSelectMember_Admin(state, val) {
			state.selectMember_Admin = val
			state.selectMemberEmail_Admin = '' //切换用户同时，清空已选中邮箱
		},
		setSelectMemberEmail_Admin(state, val) {
			state.selectMemberEmail_Admin = val
		},
		setselectMembersEmailList_Admin(state, val) {
			state.selectMembersEmailList_Admin = val
		},
		setNBarUnreadMailNum(state, val) {
			state.nBarUnreadMailNum = val
			// _store('nBarUnreadMailNum', val || 0)
		},
		setCurTeamInfo(state, val) {
			state.curTeamInfo = val
		}
	},
	actions: {
		resetTeam({ state, rootState, commit, dispatch }, teamID) {
			console.log('resetTeam')
			let myUserID = rootState.user.userInfo.userID
			// state.teamID = teamID || 0
			state.defaultMailbox = myUserID
			state.myUserEmailList = []
			state.curTeamMyMemberType = 0
			state.selectMember_Admin = myUserID
			state.selectTeamMembers_Admin = []
			state.selectMemberEmail_Admin = ''
			state.selectMembersEmailList_Admin = []
			state.EmailUnReadNum = 0
		},
		//新增邮箱
		newEmail({ state, rootState, commit, dispatch }, addEmail) {
			console.log('newEmail')
			let myUserID = rootState.user.userInfo.userID
			if (state.selectMember_Admin == myUserID) {
				dispatch('getSelectMembersEmailList_Admin', myUserID)
			}
		},
		//邮箱解绑
		unbundlingEmail({ state, rootState, commit, dispatch }, deletedEmail) {
			console.log('unbundlingEmail')
			//解绑邮箱正好是当前我正在使用邮箱
			if (state.defaultMailbox === deletedEmail) state.defaultMailbox = '' //清空默认邮箱
			if (deletedEmail == state.selectMemberEmail_Admin) state.selectMemberEmail_Admin = ''

			//有可能更新了默认邮箱 刷新成员列表
			dispatch('getSelectTeamMembers_Admin')
			//重新获取邮箱列表
			dispatch('getSelectMembersEmailList_Admin', state.selectMember_Admin)
		},
		// 获取选中团队成员的邮件列表
		async getSelectMembersEmailList_Admin({ state, commit, rootState }, userID) {
			state.selectMember_Admin = userID
			let p = api.V2MemberMailboxList({ teamID: state.teamID, userID, t: +new Date() })
			p.then(res => {
				state.selectMembersEmailList_Admin = res.data
				console.error('state.selectMembersEmailList_Admin', state.selectMembersEmailList_Admin)
				if (userID === rootState.user.userInfo.userID) {
					console.log('保存我自己的邮件列表')
					state.myUserEmailList = res.data
					let one = res.data.find(o => o.defaultMailbox)
					state.defaultMailbox = one ? one.mailAddress : '' //我的默认 邮箱
				}
			})
			return p
		},
		//获取当前团队我的邮箱信息
		async getMySelectMembersEmailList({ state, rootState }) {
			let userID = rootState.user.userInfo.userID
			let p = api.V2MemberMailboxList({ teamID: state.teamID, userID, t: +new Date() })
			p.then(res => {
				state.myUserEmailList = res.data
				let one = res.data.find(o => o.defaultMailbox)
				state.defaultMailbox = one ? one.mailAddress : '' //我的默认邮箱
				if (state.selectMemberEmail_Admin === userID) state.selectMembersEmailList_Admin = res.data
			})
			return p
		},
		//获取团队成员信息列表
		getSelectTeamMembers_Admin({ state, rootState, commit, dispatch }) {
			let p = api.V2InchangeMemberList({ id: state.teamID })
			p.then(res => {
				let myUserID = rootState.user.userInfo.userID
				state.selectTeamMembers_Admin = res.data //获取当前团队成员列表
				let { memberType } = res.data.find(o => o.userID == myUserID)
				state.curTeamMyMemberType = memberType //设置我的权限
			})
			return p
		},
		//获取团队
		async getTeamList({ state, commit, dispatch, rootState }) {
			return new Promise(async (resolve, reject) => {
				try {
					const result = await V2TeamList()
					const { records } = result.result
					console.log('团队列表 ======>', result)
					if (!state.teamID && records.length) {
						state.teamID = records[0].id //设置默认团队
					}
					if (state.teamID) dispatch('system/getAccountInfo', {}, { root: true }) //每次团队更新都刷新全局资源
					//只取字母取4位 中文取2位
					records.forEach(el => {
						let arr = el.name.split('')
						let str = ''
						let size = 0
						do {
							let o = arr.shift()
							//中文+2
							if (/[\u4E00-\u9FA5][A-Z]*/.test(o)) {
								if (size + 2 >= 6) break //文字+数字的特殊情况
								size += 2
								str += o
								console.log(str, size)
							} else {
								//字母数字符号+1
								size += 1
								str += o
							}
						} while (size <= 6 && arr.length > 0)
						el.teamNameC = str
						el.teamNumbers = [] //团队成员
					})
					state.teamListLoaded = true
					state.teamList = records
					console.log('团队列表 ======>', state.teamList, records)
					resolve()
				} catch (error) {
					reject()
				}
			})
		},
		//收件箱未读数
		async getEmailUnReadNum({ state, commit, rootState }) {
			let teamID = state.teamID
			if (teamID && state.selectMember_Admin) {
				let { data } = await V2MailUnReadNum({
					teamID,
					userID: state.selectMember_Admin
				})
				state.EmailUnReadNum = data
				// EventEmitter.emit('refreshTeamData')
			} else {
				state.EmailUnReadNum = 0
			}
		},
		//邮件审核数
		async getAuditMailNum({ state, commit, rootState }) {
			let teamID = state.teamID
			if (teamID) {
				let { data } = await V2ToAuditMailNum({
					id: teamID
				})
				state.auditMailNum = data
				// EventEmitter.emit('refreshTeamData')
			} else {
				state.auditMailNum = 0
			}
		},
		//客户领用审核数
		async getRequestToAuditSum({ state, commit, rootState }) {
			let teamID = state.teamID
			if (teamID) {
				let { data } = await V2RequestToAuditList({
					id: teamID
				})
				state.RequestToAuditSum = data
				// EventEmitter.emit('refreshTeamData')
			} else {
				state.RequestToAuditSum = 0
			}
		},
		//领用审核数
		async getFollowNum({ state, commit, rootState }) {
			let teamID = state.teamID
			if (teamID) {
				let {
					data: { mailFollowNum, customerFollowNum }
				} = await V2FollowNum({
					id: teamID
				})
				state.mailFollowNum = mailFollowNum
				state.customerFollowNum = customerFollowNum
				// EventEmitter.emit('refreshTeamData')
			} else {
				state.mailFollowNum = 0
				state.customerFollowNum = 0
			}
		}
	}
}

export default email
