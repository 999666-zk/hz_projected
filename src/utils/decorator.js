import router from '@/router'
import store from '@/store'
import { EventEmitterSingle } from '@/utils/EventEmitter.js'
let EventEmitter = EventEmitterSingle()

const bindEmailToSend = function(target, name, descriptor) {
	let fn = descriptor.value
	descriptor.value = function(...args) {
		let len = store.state.email.myUserEmailList.length
		len ? fn.apply(this, args) : EventEmitter.emit('toJoinTeamPop')
	}
}

const isOverdue = function(target, name, descriptor) {
	let fn = descriptor.value
	descriptor.value = function(...args) {
		let status = store.state.email.curTeamInfo.status
		status != 20 ? fn.apply(this, args) : router.push({ name: 'Overdue' })
	}
}

export { bindEmailToSend, isOverdue }
