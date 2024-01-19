// 集合

export default class Set {
    constructor () {
        // 使用value作为键值保存在对象中
        this.items = {}
    }

    // 判断集合中是否存在 value 值
    has (value) {
        return Object.prototype.hasOwnProperty.call(this.items, value)
    }
    // 往集合中添加 value，同时去重
    add (value) {
        if (this.has(value)) return false
        this.items[value] = value
        return true
    }
    // 删除集合中的特定的 value
    remove (value) {
        if (!this.has(value)) return false
        delete this.items[value]
        return true
    }
    // 清空集合
    clear () {
        this.items = {}
    }
    // 集合长度
    size () {
        return Object.keys(this.items).length
    }
    // 集合中所有的 value
    values () {
        return Object.values(this.items)
    }
    // 求两个集合的并集
    union (otherSet) {
         // 1. 创建一个新集合
         // 2. 把当前集合、otherSet集合中个每个元素都add进去就OK了，默认add有去重
        const unionSet = new Set()
        this.values().forEach(element => {
            unionSet.add(element)
        })
        otherSet.values().forEach(element => {
            unionSet.add(element)
        })

        return unionSet
    }
    // 求两个集合的交集
    intersection (otherSet) {
        // 1. 创建空集合
        // 2. 在当前集合中遍历每个元素，如otherSet集合也存在，则添加到新集合中
        const intersectionSet = new Set()
        this.values().forEach(element => {
            if (otherSet.has(element)) {
                intersectionSet.add(element)
            }
        })

        return intersectionSet
    }
    // 求两个集合的差集
    difference (otherSet) {
        // 1. 创建空集合
        // 2. 在当前集合中遍历每个元素，如otherSet集合不存在，则添加到新集合中
        const differenceSet = new Set()
        this.values().forEach(element => {
            if (!otherSet.has(element)) {
                differenceSet.add(element)
            }
        })

        return differenceSet
    }
    // 判断当前集合是否是另一个集合的子集
    isSubsetOf (otherSet) {
        // 1. 如当前集合size 大于 传入集合size 返回 false
        // 2. 遍历当前集合元素，是否都存在于传入集合中
        if (this.size() > otherSet.size()) return false
        return this.values().every(element => otherSet.has(element))
    }
}