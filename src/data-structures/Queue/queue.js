// 基于对象的队列

export default class Queue {
    constructor () {
        // 用于控制队列大小
        this.count = 0
        // 用于追踪第一个元素
        this.lowestCount = 0
        // 储存队列元素
        this.items = {}
    }

    // 将元素加入队列
    enqueue (element) {
        this.items[this.count] = element
        // 只要添加就加1
        this.count++
    }

    // 删除队列前端元素
    dequeue () {
        if (this.isEmpty()) {
            return undefined
        }
        
        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        // 第一个元素后移一个
        this.lowestCount++ 

        return result
    }

    // 查看队列前端元素
    front () {
        if (this.isEmpty()) {
            return undefined
        }

        return this.items[this.lowestCount]
    }

    // 队列是否为空
    isEmpty () {
        return this.size() === 0
    }

    // 队列元素个数
    size () {
        return this.count - this.lowestCount
    }

    // 清空队列
    clear () {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    // toString方法
    toString () {
        // 第 i 个
        let resultString = this.items[this.lowestCount]
        // 从 i+1 开始
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            resultString = resultString + ',' + this.items[i]
            
        }

        return resultString
    }
}

// ---------------- 封装的队列结构测试 ---------------- //
// console.log('// ----- 队列结构测试 START -----//');
// const queue = new Queue();

// // enqueue() 测试
// queue.enqueue('a');
// queue.enqueue('b');
// queue.enqueue('c');
// queue.enqueue('d');
// console.log(queue.toString()); //--> a,b,c,d

// // dequeue() 测试
// queue.dequeue();
// queue.dequeue();
// console.log(queue.toString()); //--> c,d

// // front() 测试
// console.log(queue.front()); //--> c

// // isEmpty() 测试
// console.log(queue.isEmpty()); //--> false

// // size() 测试
// console.log(queue.size()); //--> 2

// // toString() 测试
// console.log(queue.toString()); //--> c d
// console.log('// ----- 队列结构测试 END -----//');