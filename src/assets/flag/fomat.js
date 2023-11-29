const fs = require('fs')
const path = require('path')

let str = ''
let arr = []

const result = fs.readdirSync(__dirname)
console.log('result', result)
result.forEach(item => {
	let [name, ext] = item.split('.')
	if (ext === 'png') {
		str += `import ${name} from '@/assets/flag/${item}'\n`
		arr.push(name)
	}
})

str += `export default {${arr.join(',')}}`

console.log(str)

fs.writeFileSync(__dirname + '/index.js', str)
