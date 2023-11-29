import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
// import store from '@/store'
import qs from 'qs'
import { i18n } from '@/lang/index'
import { getToken } from './auth';

const token = getToken()

// import { EventEmitterSingle } from '@/utils/EventEmitter.js'
// let EventEmitter = EventEmitterSingle()

let instance = axios.create()

// console.log('环境变量', process.env);

instance.defaults.baseURL = process.env.VUE_APP_BASE_API
instance.defaults.timeout = 120000
instance.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'

const pendingRequest = new Map()

const getCacheKey = request => {
	const body = typeof request.data === 'string' ? request.data : JSON.stringify(request.data)
	let key = `${request.method}&${process.env.VUE_APP_BASE_API + request.url}&${body}&${request.headers['X-Access-Token']}`
	console.log('key', key)
	return key
}

function generateReqKey(config) {
	const { method, url, params, data } = config
	//请求拦截器里data是object类型，响应拦截器里就变成了string，就离谱...
	return [method, url, qs.stringify(params), typeof data === 'string' ? qs.stringify(JSON.parse(data)) : qs.stringify(data)].join('&')
}

//添加请求中的接口
function addPendingRequest(config) {
	const requestKey = generateReqKey(config) //生成key值
	config.cancelToken =
		config.cancelToken ||
		new axios.CancelToken(cancel => {
			if (!pendingRequest.has(requestKey)) {
				pendingRequest.set(requestKey, cancel) //没有重复请求的接口，添加到map里
			} else {
				cancel() //已存在相同接口请求,直接取消当前请求
			}
		})
}

//删除map中的请求
function removePendingRequest(config) {
	const requestKey = typeof config == 'object' ? generateReqKey(config) : config
	if (pendingRequest.has(requestKey)) {
		const cancelToken = pendingRequest.get(requestKey)
		cancelToken(requestKey)
		pendingRequest.delete(requestKey)
	}
}

//排除notNeedTokenRequest列表，取消其他请求
function removeNeedTokenRequest() {
	console.log('pendingRequest', pendingRequest)
	for (let key of pendingRequest.keys()) {
		removePendingRequest(key)
	}
}

instance.interceptors.request.use(
	config => {
		removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
		// console.log('config', config)

		/**
		 * 取消当前接口请求 并从pendingRequest中删除
		 * 	封装邮件取消功能
		 * let { data} = await this.$api.xxx({}, {
		 *		cancelRequest: cancel => {
		 *			cancel()
		 *		}
		 *	})
		 */
		config.cancelRequest &&
			config.cancelRequest(function cancel() {
				removePendingRequest(config)
				console.log('pendingRequest', pendingRequest)
			})

		//是否取消重复请求监听
		if (!config.isNotRepeatReq) addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中
		// let token = store.getters.token
		token && (config.headers['X-Access-Token'] = token)

		if (config.clearCache) {
			navigator.serviceWorker.controller.postMessage(`clearCache:${getCacheKey(config)}`)
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	response => {
		//请求成功
		removePendingRequest(response.config) //请求成功，删除map中的请求
		let { code, msg } = response.data
		if (response.status == 200) {
			// if (code) {
			// 	if (response.config.errorPop) {
			// 		let $t = i18n.t.bind(i18n)
			// 		let codeStr = $t(code)
			// 		if (code == 20301) {
			// 			EventEmitter.emit('teamResourcePop')
			// 		} else {
			// 			message.error(codeStr == code ? msg : codeStr)
			// 		}
			// 		return Promise.reject(response)
			// 	}
			// }
			console.log(response, '请求拦截成功')
			return Promise.resolve(response.data)
		} else {
			return Promise.reject(response)
		}
	},
	error => {
		const requestConfig = error.config
		console.log('请求失败，请求配置信息：', requestConfig, error, i18n);
		let $t = i18n.global.t;
		// error.message timeout of 1000ms exceeded
		if (/timeout of \d+ms exceeded/.test(error.message)) ElMessage.error($t('common.sss6'))
		if (error.message === 'Network Error' && error.config.url != '/v2/Mail/ReceiveMail') ElMessage.error($t('common.sss7'))
		//请求失败
		removePendingRequest(error.config || {}) // 从pendingRequest对象中移除请求
		if (error.response && error.response.status) {
			switch (error.response.status) {
				case 401:
					removeNeedTokenRequest() //取消所以其他请求
					// token存在时接口过期才报错
					if (store.getters.token) ElMessage.error($t('common.sss8'))
					// store.dispatch('user/UserQuit')
					router.push({ name: 'Login' })
					break
				case 403:
					removeNeedTokenRequest() //取消所以其他请求
					ElMessage.error($t('common.sss9'))
					// store.dispatch('user/UserQuit')
					router.push({ name: 'Login' })
					break
				case 404:
					ElMessage.error($t('common.sss10'))
					break
				default:
					ElMessage.error(error.response.data.message)
			}
		}
		return Promise.reject(error.response)
	}
)

/**
 * 取消当前接口请求 并从pendingRequest中删除
 * 	封装邮件取消功能
 * let { data} = await this.$api.xxx({}, {
 *		cancelRequest: cancel => {
 *			cancel()
 *		}
 *	})
 */

// const CancelToken = axios.CancelToken
// errorPop: 报错时弹框提醒，默认为true
let request = {
	get(url, params = {}, config = {}) {
		return instance({
			params,
			url,
			errorPop: true,
			clearCache: false,
			...config
		})
	},
	post(url, data = {}, config = {}) {
		return instance({
			method: 'POST',
			data,
			url,
			errorPop: true,
			clearCache: false,
			...config
		})
	}
}
// export { removeNeedTokenRequest, pendingRequest }

export default request
