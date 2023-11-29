/**
 * @description: 文件大小转换
 * @param {*} BNum 文件大小 单位B
 * @param {*} unit 转换单位 空值转换成最小单位
 * @param {*} dec 小数点保留位数
 */
const FileUnitConver = function(BNum = 0, unit, dec = 2) {
	let n = 0
	let u = ['B', 'KB', 'MB', 'GB']
	if (!unit) {
		let num = BNum
		do {
			num = num / 1024
			n++
		} while (parseInt(num).toString().length > 3)
	} else {
		n = u.indexOf(unit)
	}

	let v = BNum / Math.pow(1024, n)
	v = parseInt(v * 100) > 1 ? v : 0.01 //处理0.00GB/10GB这种情况 给个0.01GB 好看点
	let isInteger = parseInt(v) == v //是整数
	let val = isInteger ? v + u[n] : v.toString().match(`\\d+\\.\\d{0,${dec}}`)[0] + u[n]
	return BNum ? val : BNum + 'B'
}

export { FileUnitConver }
