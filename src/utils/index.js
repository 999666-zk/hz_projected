/**
 * 共用函数库
 */

/**
 * 防抖
 * 返回值保存成变量
 * const debc = debounce()
 * debc.call(this, () => this.EmailInBoxList(), 500)
 */
const debounce = function() {
	let timer = 0
	return function(callback, ms) {
		clearTimeout(timer)
		timer = setTimeout(callback, ms)
	}
}

const debouncePlus = function(func, wait, immediate) {
	var timeout, result

	var debounced = function() {
		var context = this
		var args = arguments

		if (timeout) clearTimeout(timeout)
		if (immediate) {
			// 如果已经执行过，不再执行
			var callNow = !timeout
			timeout = setTimeout(function() {
				timeout = null
			}, wait)
			if (callNow) result = func.apply(context, args)
		} else {
			timeout = setTimeout(function() {
				func.apply(context, args)
			}, wait)
		}
		return result
	}

	debounced.cancel = function() {
		clearTimeout(timeout)
		timeout = null
	}

	return debounced
}

/**
 * 节流
 */
const throttle = function(func, delay) {
	var timer = null
	return function() {
		var context = this
		var args = arguments
		if (!timer) {
			timer = setTimeout(function() {
				func.apply(context, args)
				timer = null
			}, delay)
		}
	}
}

/**
 * 组件自动注册
 * @param {*} filePath 目录路径
 * @param {*} isDeepFile 是否检索子目录
 * 获取不到require 没办法封装
 */
const autoRegComponents = function(require, filePath, isDeepFile = false) {
	// const path = require('path')
	const files = require(filePath, isDeepFile, /\.vue$/)
	const modules = {}
	files.keys().forEach(key => {
		console.log(key)
		// const name = path.basename(key, '.vue')
		modules[name] = files(key).default || files(key)
	})
	return modules
}

const uniqueKey = function() {
	return `${new Date().getTime()}${Math.random()
		.toString()
		.slice(2, 8)}`
}

export { debounce, autoRegComponents, uniqueKey, throttle, debouncePlus }
