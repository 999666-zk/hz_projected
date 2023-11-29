// import _store from 'store2'
// import { V2AccountInfo, FlagList, V2EnterpriseInfo } from '@/api/index';
import langCfg from '@/lang/langCfg.js'
import home from '@/assets/img/tab/home.png'
import homeB from '@/assets/img/tab/home-b.png'
import email from '@/assets/img/tab/email.png'
import emailB from '@/assets/img/tab/email-b.png'
import file from '@/assets/img/tab/file.png'
import fileB from '@/assets/img/tab/file-b.png'

import icon1 from '@/assets/dashboard/1.png'
import icon2 from '@/assets/dashboard/2.png'
import icon3 from '@/assets/dashboard/3.png'
import icon4 from '@/assets/dashboard/4.png'
import icon5 from '@/assets/dashboard/5.png'

let CountryList = []

let { langLocal, langAntd, langMoment, langCalendar } = langCfg('zh-CN')

const system = {
	namespaced: true,
	state: {
		isChatBoxVisibe: false,
		dirRoutes: [], //处理过的路由,用于sidebar
		crumbsRoutes: [], //处理过的路由,用于面包屑
		//tabbar
		tabList: [
			{ src: home, srcb: homeB, name: 'Dashboard', query: {} },
			{ src: email, srcb: emailB, name: 'Email', cacheName: '', query: {}, params: {} },
			{ src: file, srcb: fileB, name: 'Cloud', cacheName: '', query: {}, params: { pg: 'f' } }
		],
		CountryList, //国家信息
		timOnline: false, // tim是否在线,true在线，false掉线
		friendList: [], //好友列表
		groupList: [], // 群组列表
		frientRequestList: [], // 好友申请列表（别人加我的）
		frientRequestUnreadCount: 0, // 好友申请列表未读数
		conversationList: [], //会话列表
		curConversationObj: {}, //当前正在聊天的对象信息
		langLocal, //本地语言
		langAntd, //antd语言
		langMoment, //moment语言
		langCalendar, //moment语言
		langList: [
			{ name: '简体中文', localLang: 'zh-CN', ZoneCode: 'CN' },
			// { name: '繁體中文', localLang: 'zh-HK', ZoneCode: 'CN' },
			{ name: 'English', localLang: 'en', ZoneCode: 'UK' }
			// { name: '한글', localLang: 'kr', ZoneCode: 'KR' },
			// { name: '日本語', localLang: 'ja', ZoneCode: 'JP' },
			// { name: 'Français', localLang: 'fr', ZoneCode: 'FR' },
			// { name: 'Deutsch', localLang: 'de', ZoneCode: 'DE' },
			// { name: 'Italiano', localLang: 'it', ZoneCode: 'IT' },
			// { name: 'Português', localLang: 'pt', ZoneCode: 'PRT' },
			// { name: 'Español', localLang: 'es', ZoneCode: 'ES' },
			// { name: 'Русский язык', localLang: 'ru', ZoneCode: 'RU' }
		],
		goodsList: [], //账户基本信息
		//全局资源数据
		resources: {
			totalFlow: 0,
			totalSpace: 0,
			usedLocation: 0,
			totalLocation: 0
		},
		enterpriseInfo: {
			enterpriseID: '',
			logo: '',
			name: '',
			phone: '',
			email: '',
			country: '',
			address: ''
		},
		noticeSum: 0, //通知数
		apiCount: 0, //当前邮件接口是否正在接收
		myMessageList: [
			{
				name: 1,
				count: 0,
				icon: icon1
			},
			{
				name: 2,
				count: 0,
				icon: icon2
			},
			{
				name: 3,
				count: 0,
				icon: icon3,
				countRed: true
			},
			{
				name: 4,
				count: 0,
				icon: icon4,
				countRed: true
			},
			{
				name: 5,
				count: 0,
				icon: icon5,
				countRed: true
			}
		]
	},
	mutations: {
		//根据过滤条件生成路由
		//type: dir 目录路由 crumbs 面包屑路由
		getRouteByFilter(state, { type, router }) {
			let routes = router.options.routes
			routes = routes.filter(one => one.meta && one.meta.icon) //过滤掉没有icon的项

			let list = []
			//过滤第一层
			routes.forEach(({ path, name, meta, children }) => {
				let isUninclude = meta && meta.uninclude && meta.uninclude.includes(type) //在排除项中
				if (isUninclude) return
				let isHomePage = path === '/' //首页
				let notChild = !children //没有子集
				let isSignTab = meta && meta.signTab //单页模式
				let route = { path, name, ...meta }
				if (!(isHomePage || notChild || isSignTab) && children && children.length > 0) route.children = foo(children)
				list.push(route)
			})
			if (type === 'dir') state.dirRoutes = list
			// if (type === 'crumbs') state.crumbsRoutes = list

			//递归过滤子层
			function foo(children) {
				if (children.length == 1 && children[0].path === '') return foo(children[0].children) //处理 path:'' 的情况
				let list = []
				children.forEach(({ path, name, meta, children }) => {
					let isUninclude = meta && meta.uninclude && meta.uninclude.includes(type) //在排除项中
					if (isUninclude) return
					let route = { path, name, ...meta }
					if (children && children.length > 0) route.children = foo(children)
					list.push(route)
				})
				return list
			}
		},
		ChatBoxE(state, val) {
			state.isChatBoxVisibe = val
		},
		setApiCount(state, val) {
			state.apiCount = state.apiCount + val
		},
		// tim是否在线
		setTimOnline(state, bl) {
			state.timOnline = bl
		},
		//tim 好友列表
		setFriendList(state, list) {
			state.friendList = list
			state.myMessageList[0].count = state.friendList.length
		},
		//tim 群组列表
		setGroupList(state, list) {
			state.groupList = list
			state.myMessageList[1].count = state.groupList.length
		},
		// tim好友申请列表
		setFrientRequestList(state, list) {
			state.frientRequestList = list
		},
		setFrientRequestUnreadCount(state, count) {
			state.frientRequestUnreadCount = count
			state.myMessageList[2].count = count
		},
		setNoticeSum(state, sum) {
			state.noticeSum = sum
			state.myMessageList[4].count = sum
		},

		settipsE(state, arr) {
			arr.forEach((item, index) => {
				state.myMessageList[index].name = item
			})
		},
		//tim 会话列表
		setConversationList(state, list) {
			let data = []
			for (const item of list) {
				if (/GROUP|C2C/.test(item.type)) {
					data.push(item)
				}
			}
			state.conversationList = data

			state.myMessageList[3].count = state.conversationList.reduce((l, r) => l + Number(r.unreadCount), 0)
		},
		//tim 当前聊天对象的信息
		setConversationObj(state, obj) {
			state.curConversationObj = obj
		},
		//改变language
		changeLanguage(state, lang) {
			console.log('changeLanguage', lang)
			// _store('lang', lang)
			localStorage.setItem('lang', lang)
			Object.assign(state, langCfg(lang))
		},
		//同步tabList信息
		changeTabList(state, { tabIndex, to }) {
			let { query, params, name } = to
			let tabOne = state.tabList[tabIndex]
			tabOne.query = query //切换显示内页 不一定是分类首页
			tabOne.params = params //切换显示内页 不一定是分类首页
			tabOne.cacheName = name
		}
	},
	actions: {
		// async getCountryList({ state }) {
		// 	if (!state.CountryList.length) {
		// 		let { data } = await FlagList()
		// 		state.CountryList = data
		// 		_store.set('CountryList', data)
		// 	}
		// 	return state.CountryList
		// },
		// // 全局资源
		// async getAccountInfo({ state, dispatch, rootState, rootGetters }) {
		// 	let t = +new Date()
		// 	let { data } = await V2AccountInfo({ t })
		// 	state.resources = data.resources
		// 	state.goodsList = data.goodsList
		// 	if (rootGetters['user/isEnterpriseMainUser']) dispatch('getEnterpriseInfo')
		// },
		// async getEnterpriseInfo({ state, rootState }) {
		// 	let {
		// 		data: { id: enterpriseID, logo, name, phone, email, country, address, alias }
		// 	} = await V2EnterpriseInfo({ id: rootState.user.UserInfoForGUID.enterpriseID })
		// 	state.enterpriseInfo = { enterpriseID, logo, name, phone, email, country, address, alias }
		// }
	}
}

export default system
