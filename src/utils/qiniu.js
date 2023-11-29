import * as qiniu from 'qiniu-js'
import { GetUploadToken } from '@/api/index';
import { uniqueKey } from '@/utils'
//七牛云上传 参考：https://blog.csdn.net/LittleBlackyoyoyo/article/details/104810242
const qiniuUpload = async function(options, state, beforeCallBack = Promise.resolve) {
	let { onProgress, onError, onSuccess, file } = options

	try {
		// 文件上传成功 但是调用beforeCallBack失败
		if (file.fileUploadStaus && !file.beforeCallBackStaus) {
			try {
				await beforeCallBack()
				file.beforeCallBackStaus = true //beforeCallBack:用于优化 上传成功 保存接口失败 点击重传时 不重复上传文件 只调用保存接口
				state('success', file, cancel)
			} catch (error) {
				file.beforeCallBackStaus = false
				onError('beforeCallBack:error')
				state('error', file, cancel)
			}
		}
		let ext = file.name.match(/\.\w+$/) //后缀名
		//正常流程
		let { data } = await GetUploadToken({ t: uniqueKey(), key: ext ? ext[0] : '' })
		let [token, key] = data.split('|')

		const observable = qiniu.upload(file, key, token)
		const observer = {
			next: ({ total: { percent } }) => {
				onProgress({ percent }, file)
				state('progress', file, cancel)
			},
			error: err => {
				file.fileUploadStaus = false
				onError(err)
				state('error', file, cancel)
			},
			complete: async response => {
				file.fileUploadStaus = true //文件上传成功，有可能保存到云文件失败 用于这个判断
				onSuccess(response, file)
				file.response = response
				try {
					await beforeCallBack()
					file.beforeCallBackStaus = true //beforeCallBack:用于优化 上传成功 保存接口失败 点击重传时 不重复上传文件 只调用保存接口
					state('success', file, cancel)
				} catch (error) {
					file.beforeCallBackStaus = false
					onError('beforeCallBack:error')
					state('error', file, cancel)
				}
			}
		}
		const subscription = observable.subscribe(observer) // 上传开始
		const cancel = () => subscription.unsubscribe() // 上传取消
	} catch (error) {
		console.log('获取token失败', file)
		onError()
		state('error', file)
	}
}

export { qiniuUpload }
