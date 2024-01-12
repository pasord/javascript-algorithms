// 栈类
export default class StackArray {
    // 数组保存栈元素
    constructor () {
        this.items = []
    }

    // 1.添加新元素到栈顶
    push (element) {
        this.items.push(element)
    }

    // 2.移除栈顶元素，同时返回被移除的元素
    pop () {
        return this.items.pop()
    }

    // 3.返回栈顶元素，不对栈做任何修改
    peek (){
        return this.items[this.items.length-1]
    }

    // 4.判断栈是否为空，如果栈里没有任何元素就返回true，否则返回false
    isEmpty () {
        return this.items.length === 0
    }

    // 5.获取栈中元素个数
    size () {
        return this.items.length
    }

    // 6.移除栈里所有元素
    clear () {
        this.items = []
    }

    // 7.toString 方法
    toString() {
        let resultString = ''
        for (const item of this.items) {
            resultString += item + ' '
        }
        return resultString
    }
}

// ------------------ 栈结构测试 -----------------
console.log('// --- 基于数组的栈结构测试 START --- // ');

const stack = new StackArray()

// push(element)
stack.push(1);
stack.push(22);
stack.push(333);
console.log('push(element): ' + stack.toString());

// pop()
console.log('pop(): ' + stack.pop());

// peek()
console.log('peek(): ' + stack.peek());

// isEmpty()
console.log('isEmpty(): ' + stack.isEmpty());

// size()
console.log('size(): ' + stack.size());

// toString()
console.log('toString(): ' + stack.toString());

console.log('// --- 基于数组的栈结构测试 END --- // ');