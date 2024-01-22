// 哈希表（基于数组）

export default class HashTable {
    constructor () {
        // 用数组实现哈希表
        this.storage = [] // [[ [k,v], [k,v], [k,v] ] , [ [k,v], [k,v] ]  [ [k,v] ] ]
        // 哈希表元素个数
        this.count = 0
        // 哈希表长度（初始为质数7）
        this.limit = 7
    }

    // 哈希函数，将健哈希化转成下标值hashcode
    hashFn (key, limit = 7) {
        // 1. 初始化hashCode并赋值一个质数（参考大多数实现都使用5381）
        let hashCode = 5381
        // 2. 设置一个质数
        const PRIME = 37

        // 3. 使用霍纳法则计算hashCode的值
        // 法则：迭代参数key，将hashCode与PRIME相乘，然后和当前迭代字符的Unicode码值相加
        for (let item of key) {
            hashCode = hashCode * PRIME + item.charCodeAt()
        }

        // 4. 哈希化, 采用取模运算
        hashCode = hashCode % limit
        return hashCode
    }

    /**
     * 判断一个数是否为质数: 质数表示大于1的自然数中, 只能被1和自己num整除的数
     * @param {number} num
     * @returns {boolean}
     */
    // 方法一，性能稍差
    // isPrime (num) {
    //     if (num <= 1) {
    //         return false
    //     }

    //     for (let i = 2; i < num - 1; i++) {
    //         // 余数为0，说明能被整除
    //         if (num % i === 0) {
    //             return false
    //         }
    //     }

    //     return true
    // }
    isPrime (num) {
        if (num <= 1) {
            return false
        }
        // 开平方根向下取整
        const sqrt = Math.floor(Math.sqrt(num))
        for (let i = 2; i < sqrt; i++) {
            // 余数为0，说明能被整除
            if (num % i === 0) {
                return false
            }
        }

        return true
    }

    // 根据传入的 num 获取最近的质数
    getPrime (num) {
        while(!this.isPrime(num)) {
            num++
        }
        return num
    }

    // 哈希表, 添加或修改数据
    put (key, value) {
        // 1. 获取key对应的index
        const index = this.hashFn(key)

        // 2. 从哈希表的index位置取出对应的桶（也是个数组，也可以是链表）
        let bucket = this.storage[index]

        // 3. 判断这个bucket是否存在, 如没有则新增bucket
        if (!bucket) {
            bucket = []
            this.storage[index] = bucket
        }

        // 4. 判断对当前key的值操作，是新增还是修改
        // bucket的元素是一个个元祖 [ [k,v], [k,v], [k,v] ]
        // 4.1 如果是修改, 修改完则直接返回
        for (let i = 0; i < bucket.length; i++) {
            const tuple = bucket[i];
            if (tuple[0] === key) {
                tuple[1] = value
                return
            }
        }
        // 4.2 如果是新增，直接在bucket尾部push
        bucket.push([key, value])

        // 5. 哈希表元素个数加1
        this.count++

        // 6. 新增后，判断是否需要扩容，偌装填因子 > 0.75, 则扩容
        if (this.count > this.limit * 0.75) {
            this.resize(this.getPrime(this.limit * 2)) // 扩容可以简单的将容量增加大两倍
        }
    }

    // 哈希表, 获取key对应的数据
    get(key) {
        // 1. 获取key对应的index
        const index = this.hashFn(key)

        // 2. 从哈希表的index位置取出对应的桶
        const bucket = this.storage[index]

        // 3. 判断这个bucket是否存在, 如没有则返回null
        if (!bucket) {
            return null
        }

        // 4. 在 bucket 中查找key的数据是否存在
        for (const tuple of bucket) {
            if (tuple[0] === key) {
                return tuple[1]
            }
        }

        // 5. 没找到则返回null
        return null
    }

    // 哈希表, 删除key对应的数据, 缩表判断
    remove(key) {
        // 1. 获取key对应的index
        const index = this.hashFn(key)

        // 2. 从哈希表的index位置取出对应的桶
        const bucket = this.storage[index]

        // 3. 判断这个bucket是否存在, 如没有则返回null
        if (!bucket) {
            return null
        }

        // 4. 在 bucket 中查找key的数据是否存在
        // 4.1 如果存在则删除，返回tuple，并进行缩表判断
        for (let i = 0; i < bucket.length; i++) {
            const tuple = bucket[i]
            if (tuple[0] === key) {
                // 删除
                bucket.splice(i, 1)
                // 元素个数减1
                this.count--
                // 缩表判断
                if (this.count > 7 && this.count < this.limit * 0.25) {
                    this.resize(this.getPrime(Math.floor(this.limit / 2))) // 缩表也按2倍缩
                }
                // 返回
                return tuple
            }
        }

        // 5. 没找到则返回null
        return null
    }

    // 哈希表，扩容或缩表，调整哈希表大小，新建表，根据长度重新把元素都put进去
    resize (newLimit) {
        // 1. 临时保留哈希表元素
        const oldStorage = this.storage

        // 2. 重置哈希表，根据新limit
        this.storage = []
        this.count = 0
        this.limit = newLimit

        // 3. 把元素一个一个put到重置后的storage里
        oldStorage.forEach(bucket => {
            if (bucket) {
                for (const tuple of bucket) {
                    // this.put(key, value)
                    this.put(tuple[0], tuple[1]) 
                }
            }
        })
    }

    // 判断是否为空
    isEmpty () {
        return this.count === 0
    }

    // 哈希表元素个数
    size () {
        return this.count
    }

    // toString
    toString () {
        if (this.isEmpty()) {
            return ''
        }

        let objString = '哈希表存储数据'
        for (let index = 0; index < this.storage.length; index++) {
            const bucket = this.storage[index]
            if (bucket) {
                for (const tuple of bucket) {
                    objString = objString + '\n' + `index${index}=>${tuple[0], tuple[1]}`
                }
            }
        }

        return objString
    }
}