// 二叉搜索树

// 树的节点类
class Node {
    constructor(key) {
        // 节点值
        this.key = key
        // 左侧子节点引用
        this.left = null
        // 右侧子节点引用
        this.right = null
    }
}

// 二叉搜索树
// 特点：所有左子节点值，都小于右子节点值（插入时就决定了这样的结构特点）
export default class BinarySearchTree {
    constructor () {
        // 根节点指针
        this.root = null
    }

    // 插入数据
    insert(key) {
        // 1. 根据key创建树节点
        const newNode = new Node(key)

        // 2 判断根节点是否存在，插入数据
        if (!this.root) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    /**
     * 比较插入新节点（使用递归，到叶子节点添加）
     * @param node 用于比较节点
     * @param newNode 用于插入的节点
     */
    insertNode(node, newNode) {
        // 1. 判断如果插入节点key小于当前节点key，与当前左子节点比较，插入数据
        if (newNode.key < node.key) {
            // 1.1 如果当前左子节点为null（叶子节点），则直接添加
            if (node.left === null) {
                node.left = newNode
            } else {
                // 1.2 如果当前左子节点不是叶子节点，则递归压栈到下一层比较
                this.insertNode(node.left, newNode)
            }
        } else {
            // 2. 判断如果插入节点key大于当前节点key，向右子节点插入数据
            // 2.1 如果当前右子节点为null（叶子节点），则直接添加
            if (node.right === null) {
                node.right = newNode
            } else {
                // 1.2 如果当前右子节点不是叶子节点，则递归压栈到下一层比较
                this.insertNode(node.right, newNode)
            }
        }
    }

    /**
     * 树的遍历
     * @param node 要遍历的节点
     * @param {function} callback 回调函数，用来定义对遍历到的每个节点进行操作
     */
    preOrderTraverse (callback) {
        this.preOrderTraverseNode(this.root, callback)
    }
    // 先序遍历的辅助方法
    preOrderTraverseNode (node, callback) {
        // 遍历关键判断
        if (node !== null){
            // 节点访问（第一次是root节点）
            callback(node.key)
            // 左子节点进栈
            this.preOrderTraverseNode(node.left, callback)
            // 左子节点执行完成并出栈
            // 右子节点进栈
            this.preOrderTraverseNode(node.right, callback)
            // 右子节点执行完成并出栈
        }
    }
    // 中序遍历
    inOrderTraverse (callback) {
        this.inOrderTraverseNode(this.root, callback)
    }
    inOrderTraverseNode (node, callback) {
        if (node !== null) {
            // 先直接左子节点进栈
            this.inOrderTraverseNode(node.left, callback)
            // 每个左子节点执行完成并出栈后，执行回调
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }
    // 后续遍历
    postOrderTraverse (callback) {
        this.postOrderTraverseNode(this.root, callback)
    }
    postOrderTraverseNode (node, callback) {
        if (node !== null){
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            // 每个右子节点执行完成并出栈后，执行回调（最后一个栈出来后回到root节点）
            callback(node.key)
        }
    }

    // 二叉搜索树最小值, 循环遍历到最左叶子节点
    min() {
        let current = this.root
        if (!current) return null
        
        while(current.left !== null) {
            current = current.left
        }
        return current
    }

    // 二叉搜索树最大值, 循环遍历到最右叶子节点
    max() {
        let current = this.root
        if (!current) return null

        while(current.right !== null) {
            current = current.right
        }
        return current
    }


    // 查找BST中是否有特定的值key，存在返回true，否则返回false
    // 使用循环遍历比对key与currentkey就行
    search(key) {
        let current = this.root
        
        while(current !== null) {
            if (key < current.key) {
                current = current.left
            } else if (key > current.key) {
                current = current.right
            } else if (key === current.key) {
                return true
            }
        
        }
        return false
    }

    // 递归版本
    searchNode(node, key){
        if (key < node.key) {
            return this.searchNode(node.left, key)
        }
        else if (key > current.key) {
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }

    /**
     * 删除节点
     * a.原则是删除的树还要是二叉搜索树
     * b.找到要删除的节点
     * c.找后继节点
     * d.把后继节点“挪到”当前删除节点位置
     * e.同时处理好各节点指向
     */
    remove(key) {
        // 1. 树为空
        if (!this.root) return false

        // 2. 定义节点指针和变量，用于查找要删除的节点
        let current = this.root // 要查找的当前节点，从根节点开始遍历
        // 2.1 它俩用于当前节点删除后，它的父节点指向哪里
        // 如果要删除的是根节点下面俩变量用不到
        let parent = null // 当前节点父节点
        let isLeftChild = true // 当前节点是否为父节点的左子节点，用于

        // 3. 查找要删除节点
        while(current && current.key !== key) {
            if (key < current.key) {
                parent = current
                current = current.left
                isLeftChild = true
            } else {
                parent = current
                current = current.right
                isLeftChild = false
            }
        }

        // 3.1 current为null，对比到叶子节点还没找到
        if (!current) return false

        // 4. 找到删除节点后，分3种情况处理:
        // 4.1 情况, 要删除节点是叶子节点
        if (current.left === null && current.right === null) {
            // 如果要删除节点是根节点
            if (current.key === this.root.key) {
                this.root = null
            } 
            // 如果它是父节点的左子节点，处理父节点指向
            else if (isLeftChild) {
                parent.left = null
            } 
            // 如果它是父节点的右子节点，处理父节点指向
            else {
                parent.right = null
            }
        }
        // 4.2 情况2, 要删除节点只有一个子节点
        // 4.2.1 要删除节点只有左子节点
        else if (current.right === null) {
            // 如果要删除节点是根节点
            if (current.key === this.root.key) {
                this.root = current.left
            } 
            // 如果它是父节点的左子节点，处理父节点指向
            else if (isLeftChild) {
                parent.left = current.left
            } 
            // 如果它是父节点的右子节点，处理父节点指向
            else {
                parent.right = current.left
            }
        }
        // 4.2.1 要删除节点只有右子节点
        else if (current.left === null) {
            // 如果要删除节点是根节点
            if (current.key === this.root.key) {
                this.root = current.right
            } 
            // 如果它是父节点的左子节点，处理父节点指向
            else if (isLeftChild) {
                parent.left = current.right
            } 
            // 如果它是父节点的右子节点，处理父节点指向
            else {
                parent.right = current.right
            }
        }
        // 4.3 情况3, 要删除节点有两个子节点
        // 通过后继节点辅助完成，这里采用在右侧查找后继节点（也可在左侧）
        else {
            const successor = this.getSuccessor(current)

            // 如果要删除节点是根节点
            if (current.key === this.root.key) {
                this.root = successor
            } 
            // 如果它是父节点的左子节点，处理父节点指向
            else if (isLeftChild) {
                parent.left = successor
            } 
            // 如果它是父节点的右子节点，处理父节点指向
            else {
                parent.right = successor
            }
        }
    }

    // 寻找后继节点(往左找最小的)
    // 同时处理好后继节点的父节点及子节点指向（因为后继节点会'被挪走'，也可以为被'删除'）
    getSuccessor(current) {
        // 1. 定义初始变量及指针
        let successor = current.right
        let successorParent = null

        // 2. 寻找后继节点
        while (successor.left !== null) {
            successorParent = successor
            successor = successor.left
        }

        // 3.1 后继节点就是current.right，就是current.right.left 的左侧为null
        // 上面循环没有执行
        if (successor.key === current.right.key) {
            // 3.1.1 后继节点会被挪到当前节点，处理子节点指向
            // 因为后继节点就是current.right，所以它右子节点不用动，直接改左子就行。
            successor.left = current.left
        }
        // 3.2 后继节点不是current.right
        // 即后继节点父节点successorParent不为null，并处理它的左子节点指向；不用管右子，没有用到右子
        else {
            successorParent.left = successor.right // right可为null
            // 3.2.1 后继节点会被挪到当前节点，处理子节点指向
            // 此时后继的左右子节点都有改动
            successor.right = current.right
            successor.left = current.left
        }

        // 这里，继节点父节点、子节点、‘挪动后’它的左右子节点，都处理好了
        // 返回去，再处理current的父节点就行了
        return successor
    }
}
