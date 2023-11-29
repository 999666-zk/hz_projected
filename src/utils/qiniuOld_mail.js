import * as qiniu from 'qiniu-js'
import { GetUploadToken_Mail } from '@/api/index'
import { uniqueKey } from '@/utils'
//七牛云上传 参考：https://blog.csdn.net/LittleBlackyoyoyo/article/details/104810242
const qiniuUpload = async function(options, state) {
	let { onProgress, onError, onSuccess, file } = options
	try {
		let ext = file.name.match(/\.\w+$/) //后缀名
		let prefix = file.name.match(/^(.*)\.\w+$/) //后缀名
		let { data } = await GetUploadToken_Mail({ t: uniqueKey(), key1: ext ? ext[0] : '', key2: prefix ? prefix[1] : '' })
		let [token, key] = data.split('|')

		const observable = qiniu.upload(file, key, token)
		const observer = {
			next: ({ total: { percent } }) => {
				onProgress({ percent }, file)
				state('progress', file, cancel)
			},
			error: err => {
				onError(err)
				file.status = 'error'
				state('error', file, cancel)
			},
			complete: response => {
				onSuccess(response, file)
				file.response = response
				state('success', file, cancel)
			}
		}
		const subscription = observable.subscribe(observer) // 上传开始
		const cancel = () => subscription.unsubscribe() // 上传取消
	} catch (error) {
		file.status = 'error'
		onError()
		state('error', file)
	}
}

export { qiniuUpload }
