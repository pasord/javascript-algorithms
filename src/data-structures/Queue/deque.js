// 双端队列, 基于对象实现

export default class Deque {
    constructor () {
        
        // 用于控制队列大小
        this.count = 0
        // 用于追踪第一个元素
        this.lowestCount = 0
        // *从头尾两个指针角度理解：头=lowestCount和 尾=count 
        // 头的添加 lowestCount-- , 头的移除 lowestCount++
        // 尾的添加 count++, 尾的移除 count--
        // 忒书情况，它俩都为0，分别为0的时候场景
        // 它俩都不能为负值
        // remove时到最后一个元素时，两个指针应该都归0了
        // *指针移动位置和元素数量是完全匹配的，size = count - lowestCount

        // 储存队列元素
        this.items = {}
        
    }

    // 在队列前端添加元素，有三个场景
    addFront (element) {
        if (this.isEmpty()) {
            // 1.为空时
            this.addBack(element)
        } else if (this.lowestCount > 0) {
            // 2.lowestCount 大于0时，在前端添加只需要将头指针向左移动1个，lowestCount-1
            this.lowestCount--
            this.items[this.lowestCount] = element
        } else {
            // 3.lowestCount 等于0时，头指针无办法动，只能让所有元素都右移动，同时尾指针 count + 1
            // 且需要倒着循环..
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1]
            }
            this.count++
            // 最后i=0队列头的位置，给我新添加的元素
            this.items[0] = this.items
        }
    }

    // 在队列末端添加元素
    addBack (element) {
        this.items[this.count] = element
        this.count++
    }

    // 队列前端删除元素
    removeFront () {
        if (this.isEmpty()) {
            return undefined
        }

        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++

        return result
    }

    // 队列末端删除元素
    removeBack () {
        if (this.isEmpty()) {
            return undefined
        }
        this.count-- // 实际是count-1是最末端元素，count是最末端站位，所以先减-1
        const result = this.items[this.count]
        delete this.items[this.count]
        
        return result
    }

    // 查看队列前端元素
    pickFront () {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }

    // 查看队列末端元素
    pickBack () {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.count - 1]
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
        // 循环从 i+1 开始
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            resultString = resultString + ',' + this.items[i]
            
        }

        return resultString
    }
}

// 双端队列测试代码
// console.log('// ----- 双端队列结构测试 START -----//');
// const deque = new Deque();
// console.log(deque.isEmpty()); //--> true
// deque.addBack('John');
// deque.addBack('Jack');
// console.log(deque.toString()); //--> John,Jack
// deque.addBack('Camila');
// console.log(deque.toString()); //--> John,Jack,Camila
// console.log(deque.size()); //--> 3
// console.log(deque.isEmpty()); //--> false
// deque.removeFront(); // remove John
// console.log(deque.toString()); //--> Jack,Camila
// deque.removeBack();
// console.log(deque.toString()); //--> Jack
// deque.addFront('John');
// console.log(deque.toString()); //--> John,Jack
// console.log('// ----- 双端队列结构测试 END -----//');