// 字典

export default class Map {
    constructor () {
        // 存储键值对，key不能重复
        this.items = {}
    }

    // 判断字典中是否存在某个key
    has (key) {
        return Object.prototype.hasOwnProperty.call(this.items, key)
    }
    // 在字典中添加键值对
    set (key, value) {
        this.items[key] = value
    }
    // 在字典中删除指定key
    remove (key) {
        if (!this.has(key)) return false
        delete this.items[key]
        return true
    }
    // 获取 指定 key 的 value
    get (key) {
        if (!this.has(key)) return undefined
        return this.items[key]
    }
    // 获取字典所有key
    keys () {
        return Object.keys(this.items)
    }
    // 获取字典所有的 value
    values () {
        return Object.values(this.items)
    }
    // 获取字典中的键值对个数
    size () {
        return this.keys().length
    }
    // 检查字典是否为空
    isEmpty () {
        return this.size() === 0
    }
    // 清空字典中所有键值对
    clear () {
        this.items = {}
    }
  
}