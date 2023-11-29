import { createI18n } from 'vue-i18n'
import axios from 'axios'
// import store from '@/store'
// import _store from 'store2'
console.log(require('@/lang/zh-CN.json'), 'zh-CN');
// 通过选项创建 VueI18n 实例
const i18n = createI18n({
	fallbackLocale: 'zh-CN', // 翻译缺省值
	silentFallbackWarn: true, // 默认情况下回退到 fallbackLocale 会产生两个控制台警告,为了避免这些警告 (同时保留那些完全没有翻译给定关键字的警告)
	locale: 'zh-CN', // 设置语言包
	messages: {
		en: require('@/lang/en'),
		'zh-CN': require('@/lang/zh-CN.json')
	}
})

const loadedLanguages = [] // 我们的预装默认语言

// 内部方法，设置语言包和本地缓存
function setI18nLanguage(lang) {
	i18n.locale = lang
	localStorage.setItem('lang', lang)
	// _store('lang', lang)
	axios.defaults.headers.common['Accept-Language'] = lang
	document.querySelector('html').setAttribute('lang', lang)
	return lang
}

export function loadLanguageAsync(lang) {
	// 如果语言相同
	if (i18n.locale === lang) {
		return Promise.resolve(setI18nLanguage(lang))
	}

	// 如果语言已经加载
	if (loadedLanguages.includes(lang)) {
		return Promise.resolve(setI18nLanguage(lang))
	}
	// 如果尚未加载语言
	const msg = require(`./${lang}.json`)
	i18n.setLocaleMessage(lang, msg)
	loadedLanguages.push(lang)
	return Promise.resolve(setI18nLanguage(lang))
}

export { i18n }
