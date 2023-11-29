// 全局自定义指令

/**
 * tableWrapHeight 外框的高度
 * 1. 根据外框的高度固定antDvtable的高度,优化ui显示
 * 2. 在keep-alive下记录滚动条的位置
 */
const saveScrollTop = {
	bind(el, bind, vnode) {
		//tableWrapHeight
		let tableWrapHeight = bind.value
		// ant-table-scroll
		el.wrapEl = el.querySelector('.ant-table-scroll')
		el.wrapEl.style.height = tableWrapHeight + 'px'
		el.wrapEl.style.overflow = 'visible'
		el.wrapEl.classList.add('fx')
		el.wrapEl.classList.add('fx-d-c')
		// ant-table-body
		el.scrollBody = el.querySelector('.ant-table-body')
		el.scrollBody.classList.add('flex1')
		if (el.scrollBody.offsetHeight < tableWrapHeight) el.scrollBody.classList.add('border-bottom') //添加底部边线
		el.func_scrollHandler = e => (el.scrollBodyScrollTop = e.target.scrollTop)
		el.scrollBody.addEventListener('scroll', el.func_scrollHandler)
	},
	componentUpdated(el, bind, vnode, oldVnode) {
		//antdv table会出问题 重置一下
		let scrollBody = el.scrollBody
		scrollBody.style.overflow = 'auto'
		scrollBody.scrollTop = el.scrollBodyScrollTop || 0
	},
	unbind(el, bind, vnode) {
		el.scrollBody.removeEventListener('scroll', el.func_scrollHandler)
	}
}

export { saveScrollTop }
