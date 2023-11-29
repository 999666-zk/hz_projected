class Queue {
	constructor() {
		this.count = 0 //记录队列的数量
		this.lowestCount = 0 //记录当前队列顶部的位置
		this.items = [] //用来存储元素。
	}
	// 添加元素
	push(element) {
		this.items[this.count] = element
		this.count++
	}
	//删除元素（只删除队列头部）
	remove() {
		if (this.isEmpty()) {
			return 'queue is null'
		}
		let resulte = this.items[this.lowestCount]
		delete this.items[this.lowestCount]
		this.lowestCount++
		return resulte
	}
	//查看队列头部元素
	peek() {
		return this.items[this.lowestCount]
	}
	//判断队列是否为空
	isEmpty() {
		return this.count - this.lowestCount === 0
	}
	// 查看队列的长度
	size() {
		return this.count - this.lowestCount
	}
	// 清除队列的元素
	clear() {
		this.count = 0
		this.lowestCount = 0
		this.items = []
	}
	// 查看队列的所有内容
	toString() {
		if (this.isEmpty()) return 'queue is null'
		let objString = this.items[this.lowestCount]
		for (let i = this.lowestCount + 1; i < this.count; i++) {
			objString = `${objString},${this.items[i]}`
		}
		return objString
	}
}

export default Queue
