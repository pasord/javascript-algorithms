// 双向链表

// 双向链表节点类
export class DoublyNode {
    constructor(data) {
        this.data = data
        // 指针，指向前一个节点
        this.prev = null
        // 指针，指向后一个节点
        this.next = null
    }
}

// 双向链表类
export default class DoublyLinkedList {
    constructor() {
        // 指针，指向链表第一个节点
        this.head = null
        // 指针，指向链表最后一个节点
        this.tail = null
        // 链表长度
        this.length = 0
    }

    // 尾部追加节点
    append (data) {
        // 1. 创建新节点
        const newNode = new DoublyNode(data)

        // 2. 如果为空，做2次指针指向
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            // 做3次指针指向
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
        }

        // 链表长度加1
        this.length++
    }
    // 在指定位置, 插入节点
    insert (position, data) {
        // 1、对 position 进行越界判断，不能小于 0 或大于链表长度
        if (position < 0 || position > this.length) return false

        // 2. 创建新节点
        const newNode = new DoublyNode(data)

        // 3. 插入节点
        // 四种情况：链表为空、在头插入、在尾插入、在中间插入
        // 都需要注意修改指针的顺序
        if (this.length === 0) {
            // 链表为空
            this.head = newNode
            this.tail = newNode
        } else if (position === 0) {
            // 在头插入
            // 3个指针修改：
            // 1、新节点的next指针要指向原来的头节点
            // 2、原来的头节点的prev指针要指向新节点
            // 3、头指针要指向新节点
            newNode.next = this.head
            this.head.prev = newNode
            this.head = newNode
        } else if (position === this.length) {
            // 在尾插入，3次指针操作
            // 1、新节点的prev指针要指向原来的尾节点
            // 2、原来的尾节点的next指针要指向新节点
            // 3、尾指针要指向新节点
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        } else {
            // 在中间插入
            let index = 0
            let current = this.head
            // 循环次数还是 position+1-1
            while(index < position) {
                // 下标和指针current都后移1位
                index++
                current = current.next
            }
            // 4次指针操作：
            // 1、新节点的prev指针要指向当前节点的prev
            // 2、新节点的next指针要指向当前节点
            // 3、当前节点的prev的next指针要指向新节点
            // 4、当前节点的prev指针要指向新节点
            newNode.prev = current.prev
            newNode.next = current
            current.prev.next = newNode
            current.prev = newNode
        }

        // 4. 链表长度加1
        this.length++

        // 5. 返回新节点
        return newNode
    }
    // 获取指定位置position的节点数据
    getData (position) {
        // 1、对 position 进行越界判断，不能小于 0 或大于等于链表长度
        if (position < 0 || position >= this.length) return null

        let index = 0
        let current = null

        // 先判断position离头近还是尾近，再进行查找
        if (position < this.length / 2) {
            index = 0
            current = this.head
            while (index < position) {
                index++
                current = current.next
            }
        } else {
            index = this.length - 1
            current = this.tail

            while (index > position) {
                index--
                current = current.prev
            }
        }

        return current.data
    }
    // 根据数据data，获取节点位置
    indexOf (data) {
        let index = 0
        let current = this.head

         // 从头遍历查找
        while (current) {
            if (current.data === data) {
                return index
            }

            // 位置加1同时指针也后移1个
            index++
            current = current.next
        }

        return -1
    }
    // 跟新某个位置节点数据
    update (position, data) {
        // 1、对 position 进行越界判断，不能小于 0 或大于等于链表长度
        if (position < 0 || position >= this.length) return null

        let index = 0
        let current = null

        // 先判断position离头近还是尾近，再进行查找
        if (position < this.length / 2) {
            index = 0
            current = this.head
            while (index < position) {
                index++
                current = current.next
            }
        } else {
            index = this.length - 1
            current = this.tail

            while (index > position) {
                index--
                current = current.prev
            }
        }

        // 3. 修改
        current.data = data

        // 4. 返回新节点，方便后续操作
        return current
    }
    // 删除指定位置的节点，并返回删除的节点
    removeAt (position) {
        // 1、对 position 进行越界判断，不能小于 0 或大于等于链表长度
        if (position < 0 || position >= this.length) return null

        // 2. 三种情况：头位置（长度为1和大于1的情况）、末尾位置、中间位置
        let current = null
        if (position === 0) {
            current = this.head
            if (this.length === 1) {
                this.head = null
                this.tail = null
            } else {
                this.head.next.prev = null
                this.head = this.head.next
            }
        } else if (position === this.length - 1){
            current = this.tail
            this.tail.prev.next = null
            this.tail = this.tail.prev
        } else {
            let index = 0
            current = this.head
            while(index < position) {
                index++
                current = current.next
            }
            current.prev.next = current.next
            current.next.prev = current.prev
        }

        // 3、更新链表长度 -1
        this.length--
        // 4、返回被删除的节点，方便其他操作
        return current
    }
    // 根据数据data，删除节点，并返回删除的节点
    remove (data) {
        return this.removeAt(this.indexOf(data))
    }
    // 判断空
    isEmpty () {
        return this.length === 0
    }

    // 链表长度
    size () {
        return this.length
    }
    // 链表数据从前往后以字符串形式返回
    forwardToString () {
        let resultString = ''
        let current = this.head
        while (current) {
            resultString += current.data + '--'
            current = current.next
        }

        return resultString
    }
    // 链表数据从后往前以字符串形式返回
    backwardString () {
        let resultString = ''
        let current = this.tail
        while (current) {
            resultString += current.data + '--'
            current = current.prev
        }

        return resultString
    }
    // 返回链表字符串形式
    toString () {
        return this.forwardToString()
    }
}