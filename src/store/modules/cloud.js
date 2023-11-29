import _store from 'store2'

const cloud = {
	namespaced: true,
	state: {
		downloadStatus: 'done' //loading 下载中 done 已完成
	},
	mutations: {
		changeDownLoadStatus(state, status) {
			state.downloadStatus = status
		}
	},
	actions: {}
}

export default cloud
