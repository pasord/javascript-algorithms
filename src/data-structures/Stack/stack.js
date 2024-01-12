// 对象储存栈元素
export default class Stack {
    constructor () {
        // 作为对象健
        this.count = 0
        this.items = {}
    }

    // 1.添加新元素到栈顶, 用count作为items的key
    push (element) {
        this.items[this.count] = element
        // 栈顶添加元素后，递增count变量，给下一个使用
        this.count++
    }

    // 2.移除栈顶元素，同时返回被移除的元素
    pop () {
        // 判断空
        if (this.isEmpty()) return undefined
        // count 减一, 得到当前栈顶的count
        this.count--
        // 获取当前栈顶元素
        const result = this.items[this.count]
        // 删除当前栈顶元素
        delete this.items[this.count]
        
        // 返回结果
        return result
    }

    // 3.返回栈顶元素，不对栈做任何修改
    peek (){
        // 判断空
        if (this.isEmpty()) return undefined
        // 获取当前栈顶元素
        const result = this.items[this.count - 1]
        
        // 返回结果
        return result
    }

    // 4.判断栈是否为空
    isEmpty () {
        return this.count === 0
    }

    // 5.获取栈中元素个数
    size () {
        return this.count
    }

    // 6.移除栈里所有元素
    clear () {
        this.items = {}
        this.count = 0
    }

    // 7.toString 方法
    toString() {
        // 判断空
        if (this.isEmpty()) return ''

        let resultString = this.items[0]

        for (let index = 1; index < this.count; index++) {
            const element = this.items[index];
            resultString = resultString + ',' + element
        }
        return resultString
    }
}

