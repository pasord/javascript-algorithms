// 使用数组队列
import QueueArray from './queue-array.js'

// 定义元素类, 包含优先级
class QueueElement {
    constructor (element, priority) {
        this.element = element
        this.priority = priority
    }
}

// 定义优先级队列类（属于有顺序的队列）（继承Queue类）
export default class PriorityQueue extends QueueArray {
    constructor() {
        super()
    }

    // 定义enqueue，将元素类，按优先级推入到队列
    enqueue (element, priority) {
        // 创建元素实例
        const queueElement = new QueueElement(element, priority)

        // 1.空 
        if (this.isEmpty()) {
            this.items.push(queueElement)
        } else if (priority > this.items[this.items.length -1].priority) {
            // 2.比末端还大，在末端推入
            this.items.push(queueElement)
        } else {
            // 3. 有小于的，在中间插入
            // 插入比较排序：（从小到大）
            // 比较小于，在当前index插入，当前只要比‘某个’小，就会比’此某个’后面都小，因为是开始插入时，就是按从小到大排序的。
            for (let i = 0; i < this.items.length; i++) {
                if (priority< this.items[i].priority) {
                    this.items.splice(i, 0, queueElement)
                    // 插入完成
                    break
                }
            }
        }
    }

    // toString
    toString () {
        let result = ''
        for (const item of this.items) {
            result += item.element + '-' + item.priority + ' '
        }
        return result
    }
}

// const priorityQueue = new PriorityQueue();

// // 入队 enqueue() 测试
// priorityQueue.enqueue('A', 10);
// priorityQueue.enqueue('B', 15);
// priorityQueue.enqueue('C', 11);
// priorityQueue.enqueue('D', 20);
// priorityQueue.enqueue('E', 18);
// console.log(priorityQueue.toString());
// //--> output:
// // A-10 C-11 B-15 E-18 D-20


// // 出队 dequeue() 测试
// priorityQueue.dequeue();
// priorityQueue.dequeue();
// console.log(priorityQueue.toString());
// //--> output:
// // B-15 E-18 D-20

// // isEmpty() 测试
// console.log(priorityQueue.isEmpty()); //--> false

// // size() 测试
// console.log(priorityQueue.size()); //--> 3

// // toString() 测试
// console.log(priorityQueue.toString()); //--> B-15 E-18 D-20