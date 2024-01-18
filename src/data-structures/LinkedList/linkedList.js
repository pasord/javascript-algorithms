// 单向链表结构

// 元素节点类
export class Node {
    constructor (data) {
        this.data = data
        this.next = null
    }
}

// 单向链表类
export default class LinkedList {
    constructor () {
        // 链表头节点指针
        this.head = null
        // 链表长度
        this.length = 0
    }

    // 在尾部追加节点
    append (data) {
        // 1. 创建节点
        const newNode = new Node(data)

        // 2. 追加节点
        if (this.length === 0) {
            // 链表长度为0时，直接赋值
            this.head = newNode
        } else {
            // 链表长度大于0时
            // 将current指针指向尾部，从头开始循环
            let current = this.head
            // 当current.next为null说明已是最后一个节点
            while (current.next) {
                current = current.next
            }
            // 老最后的节点next指向新最后的节点
            current.next = newNode
        }

        // 3. 链表长度加1
        this.length += 1
    }

    // 在指定位置, 插入节点
    insert (position, data) {
        // 1. 越界判断, position 不能小于0 且 不能大于链表长度
        if (position < 0 || position > this.length) return false

        // 2. 创建新节点
        const newNode = new Node(data)

        // 3. 插入节点
        if (position === 0) {
            // 在0的位置
            // 先新头节点next指向老头节点
            // 再让head指向新头
            newNode.next = this.head
            this.head = newNode
        } else {
            // 还是用两个指针吧，理解上更清晰些
            // 从头开始循环，将current指针指向老position位置节点，将previous指向其前一个
            // 用index与position做位置比较限定遍历次数
            let current = this.head // 默认指向0位置节点
            let previous = null
            let index = 0
            // *第一次遍历其实是让current指针指向了1的位置，因为默认是指向0的位置，也就是遍历 (position+1-1) 次
            while (index < position) {
                index += 1
                previous = current
                current = current.next
            }

            previous.next = newNode
            newNode.next = current
        }

        // 4. 链表长度加1
        this.length += 1

        // 5. 返回新节点，方便后续操作
        return newNode
    }

    // 获取指定位置position的节点数据
    getData (position) {
        // 1. 越界判断, position 不能小于0 且 不能大于等于链表长度
        if (position < 0 || position >= this.length) return null

        // 2. 从头查找节点
        let index = 0
        let current = this.head
        // *第一次遍历其实是让current指针指向了1的位置，因为默认是指向0的位置，也就是遍历 (position+1-1) 次
        while(index < position) {
            index++
            current = current.next
        }

        // 3. 返回节点data
        return current.data
    }

    // 根据数据data，获取节点位置
    indexOf (data) {
        let index = 0
        let current = this.head

        // 2. 从头遍历查找
        while (current) {
            // 有找到直接返回位置
            if (current.data === data) {
                return index
            }
            // 位置加1同时指针也后移1个
            index++
            current = current.next
        }

        // 3. 未找到，返回-1
        return -1
    }

    // 跟新某个位置节点数据
    update (position, data) {
        // 1. 越界判断, position 不能小于0 且 不能大于等于链表长度
        if (position < 0 || position >= this.length) return false

        let index = 0
        let current = this.head

        // 支持position为0位置，就是position为0就不用进入循环遍历了直接用默认赋值
        while(index < position) {
            index++
            current = current.next
        }

        // 3. 修改
        current.data = data

        // 4. 返回新节点，方便后续操作
        return current
    }

    // 删除指定位置的节点，并返回删除的节点
    removeAt (position) {
        // 1. 越界判断, position 不能小于0 且 不能大于等于链表长度
        if (position < 0 || position >= this.length) return null

       
        let index = 0
        let current = this.head
        let previous = null

        if (position === 0) {
            this.head = current.next
        } else {
            // 2. 从头开始遍历，找到两个指针的节点
            while (index < position) {
                index++
                previous = current
                current = current.next
            }
            previous.next = current.next
        } 

        // 3. 长度减1
        this.length--
        // 4. 返回节点，方便后续操作 
        return current
    }

    // 根据数据data，删除节点，并返回删除的节点
    remove (data) {
        const position = this.indexOf(data)
        return this.removeAt(position)
    }

    // 判断空
    isEmpty () {
        return this.length === 0
    }

    // 链表长度
    size () {
        return this.length
    }

    // 返回链表字符串形式
    toString () {
        let resultString = ''
        let current = this.head
        // 兼容了空的情况
        // 遍历所有的节点，拼接为字符串，直到尾节点(值为null)
        while (current) {
            resultString += current.data + ' '
            current = current.next
        }

        return resultString
    }
}

