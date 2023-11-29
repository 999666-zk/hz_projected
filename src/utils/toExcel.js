import axios from 'axios'
import fileDownload from 'js-file-download'
import moment from 'moment'
import { ElMessage  } from 'element-plus';
import store from '@/store'
function toExcel(params, url) {
	axios({
		method: 'post',
		url: `${process.env.VUE_APP_BASE_API}/${url}`,
		headers: {
			authorization: `Bearer ${store.getters.token}`
		},
		responseType: 'blob' /* blob转化 */,
		data: params
	})
		.then(res => {
			fileDownload(res.data, `${moment().format('YYYYMMDDHHmmss')}.xlsx`)
		})
		.catch(err => {
			console.log(err)
			ElMessage.error('文件下载失败！')
		})
}
export { toExcel }
