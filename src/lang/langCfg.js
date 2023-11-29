import zh_CN from 'element-plus/lib/locale/lang/zh-cn';
import zh_TW from 'element-plus/lib/locale/lang/zh-tw';
import en_US from 'element-plus/lib/locale/lang/en';
import de_DE from 'element-plus/lib/locale/lang/de'
import ko_KR from 'element-plus/lib/locale/lang/ko'
import ja_JP from 'element-plus/lib/locale/lang/ja'
import fr_FR from 'element-plus/lib/locale/lang/fr'
import it_IT from 'element-plus/lib/locale/lang/it'
import pt_PT from 'element-plus/lib/locale/lang/pt'
import es_ES from 'element-plus/lib/locale/lang/es'
import ru_RU from 'element-plus/lib/locale/lang/ru';

/**
 * 语言包映射关系
 * key：本地json名称
 * array:[antd，moment,v-calendar]
 */
const langCfg = {
	'zh-CN': [zh_CN, 'zh-cn', 'zh-CN'], //简体中文
	'zh-HK': [zh_TW, 'zh-tw', 'zh-TW'], //繁體中文
	en: [en_US, 'en', 'en'], //英语 美式
	ko: [ko_KR, 'ko', 'ko'], //韩语
	ja: [ja_JP, 'ja', 'ja'], //日本語
	fr: [fr_FR, 'fr', 'fr'], //法语
	de: [de_DE, 'de', 'de'], //德语
	it: [it_IT, 'it', 'it'], //意大利
	pt: [pt_PT, 'pt', 'pt'], //葡萄牙
	es: [es_ES, 'es', 'es-ES'], //西班牙
	ru: [ru_RU, 'ru', 'ru'] //俄罗斯
}

export default function(lang = 'zh-CN') {
	let langG = langCfg[lang]
	return { langLocal: lang, langAntd: langG[0], langMoment: langG[1], langCalendar: langG[2] }
}
