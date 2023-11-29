const fs = require('fs')
// const compressing = require('compressing')
const archiver = require('archiver')

// 垃圾宝塔识别不了
// const result = fs.readdirSync('dist')
// const tarStream = new compressing.tar.Stream()
// result.forEach(addr => {
// 	tarStream.addEntry(`dist/${addr}`)
// })

// const destStream = fs.createWriteStream('dist.zip')
// tarStream.pipe(destStream, handleError)

// function handleError(e) {
// 	console.log('handleError', e)
// }
console.log('压缩中...')
//创建最终打包文件的输出流
var output = fs.createWriteStream('dist.zip')
//生成archiver对象，打包类型为zip
var archive = archiver('zip', {
	zlib: {
		level: 9
	}
})
//对文件夹进行压缩
archive.directory('dist', false)
archive.pipe(output) //将打包对象与输出流关联
//监听所有archive数据都写完
output.on('close', function() {
	console.log('压缩完成', parseInt(archive.pointer() / 1024 / 1024) + 'M')
})
archive.on('error', function(err) {
	throw err
})
archive.finalize() //打包
