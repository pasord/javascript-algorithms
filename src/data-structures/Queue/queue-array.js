// 基于数组的队列

export default class QueueArray {
    constructor () {
        // 队列元素保存
        this.items = []
    }

    // 将元素加入队列
    enqueue (element) {
        this.items.push(element)
    }

    // 删除队列前端元素
    dequeue () {
        return this.items.shift()
    }

    // 查看队列前端元素
    front () {
        return this.items[0]
    }

    // 队列是否为空
    isEmpty () {
        return this.items.length === 0
    }

    // 队列元素个数
    size () {
        return this.items.length
    }

    // toString方法
    toString () {
        let resultString = ''
        for (const item of this.items) {
            resultString += item + ' '
        }

        return resultString
    }
}