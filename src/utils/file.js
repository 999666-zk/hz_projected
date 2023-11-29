//常见图片格式
let imgFormat = ['apng', 'avif', 'bmp', 'gif', 'ico', 'cur', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']
//常见音频格式
let audioFormat = ['ogg', 'mp3', 'wav', 'flac']
//常见视频格式
let videoFormat = ['mp4', 'webm']
//ppt所有格式
let pptFormat = ['pptx', 'ppt', 'potx', 'pot', 'pps', 'pptm', 'potm', 'ppsx', 'ppsm']
//word所有格式
let wordFormat = ['doc', 'dot', 'docx', 'dotx', 'docm', 'dotm']
//excel所有格式
let excelFormat = ['xls', 'xlt', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlam', 'xla']
//pdf格式
let pdfFormat = ['pdf']
//txt格式
let textFormat = ['txt', 'text']
//压缩文件格式
let zipFormat = ['rar', 'zip', '7z']

/**
 * @description: 获取文件后缀
 * @param {*} path 文件路径
 * @return {*} 类型
 */
const fileSuffix = function(path) {
	let exp = path.match(/\.(\w+)$/)
	return exp ? exp[1] : ''
}

/**
 * @description: 根据后缀名判断格式
 * @param {*} suffix 后缀名
 * @return {*} 类型
 */
const getFileFormatBySuffix = function(suffix) {
	suffix = suffix.toLowerCase()
	let format = { imgFormat, videoFormat, pptFormat, zipFormat, wordFormat, excelFormat, pdfFormat, textFormat, audioFormat }
	for (const key of Object.keys(format)) {
		if (format[key].includes(suffix)) return key.replace('Format', '')
	}
	return ''
}

export { fileSuffix, getFileFormatBySuffix, imgFormat, audioFormat, videoFormat, pptFormat, wordFormat, excelFormat, pdfFormat, textFormat, zipFormat }
