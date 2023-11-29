const fs = require('fs')
const { resolve } = require('path')
const ExcelJS = require('exceljs')

async function langMaker() {
	const workbook = new ExcelJS.Workbook()
	await workbook.xlsx.readFile(resolve(__dirname, './MailTalk国际化语言包.xlsx'))
	const worksheet = workbook.getWorksheet(1)
	// 声明语言包变量（组参用）
	const lang_data = {}
	//制作所有语言包的key值
	const keys = []
	// 表格处理下标从1开始
	worksheet.eachRow((row, rowNumber) => {
		if (rowNumber == 1) {
			// 第一行处理表头
			row.eachCell((cell, colNumber) => {
				// 拼凑表头
				if (colNumber !== 1) {
					lang_data[cell.value] = {}
					keys.push(cell.value)
				}
			})
		} else {
			let key_name = ''
			row.eachCell((cell, colNumber) => {
				// 拼接数据
				if (colNumber === 1) {
					key_name = cell.value // 变量名
				} else {
					lang_data[keys[colNumber - 2]][key_name] = cell.value // 变量值
				}
			})
		}
	})
	// 写到文件
	for (const item of keys) {
		let js_data = `export default ${JSON.stringify(lang_data[item])}`
		fs.writeFileSync(resolve(__dirname, `${item}.json`), JSON.stringify(lang_data[item]))
		console.log(`${item}.json制作完成.`)
	}
}

// function langMaker() {
// 	const res = fs.readFileSync(resolve(__dirname, './data.csv'))
// 	const row = res.toString().split('\r\n') // 读取行数据
// 	// 声明语言包变量（组参用）
// 	const lang_data = {}
// 	//制作所有语言包的key值
// 	const keys = row[0].split(',')
// 	for (let i = 1; i < keys.length; i++) {
// 		const item = keys[i]
// 		lang_data[item] = {}
// 	}
// 	// 拼接数据
// 	for (let i = 1; i < row.length; i++) {
// 		const item = row[i].split(',')
// 		const key_name = item[0] // 变量名
// 		if (key_name) {
// 			// 当不是空行的时候，则执行拼接，空行则跳过
// 			for (let ii = 1; ii < item.length; ii++) {
// 				const data = item[ii]
// 				lang_data[keys[ii]][key_name] = data
// 			}
// 		}
// 	}
// 	// console.log(JSON.stringify(lang_data))
// 	// 写到文件
// 	for (let i = 1; i < keys.length; i++) {
// 		const item = keys[i]
// 		const xxx = lang_data[item]
// 		let js_data = `export default ${JSON.stringify(xxx)}`
// 		fs.writeFileSync(resolve(__dirname, `${item}.js`), js_data)
// 		console.log(`${item}.js制作完成.`)
// 	}
// 	console.log('done!')
// }

langMaker()
