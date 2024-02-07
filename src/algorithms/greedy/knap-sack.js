
// 贪心算法--分数背包问题

/**
 * 背包问题是什么
 * 一个背包能最多装多少重量的东西，（或要求达到价值最大），返回东西的总价值。
 * 
 * 分数背包问题
 * 要装满背包，分数是指最后的物品可以按比例拆分
 * capacity 背包的容量
 * weights 物品重量数组
 * values 物品价值数组
 * 隐藏条件，所有物品重量和大于背包容量
 */

export function knapSack (capacity, weights, values) {
    // 已装物品重量和
    let load = 0
    // 已装物品价值和
    let val = 0

    // 隐藏条件，所有物品重量和大于背包容量。
    // 遍历价值数组
    // 终止条件是，已装物品重量和不能大于背包容量
    for (let i = 0; i < values.length && load <= capacity; i++) {
        const currentValue = values[i];
        const currentWeight =  weights[i]
        // 剩余重量还能装下当前 weight
        if (currentWeight <= capacity - load) {
            // 累加重量和价值
            load = load + currentWeight
            val = val + currentValue
        } else {
            // 剩余重量不能装下当前 weight
            // 那计算还能装入多少比例, 基于当前的
            const r = (capacity - load) / currentWeight
            val = val + r * currentValue
            load = load + currentWeight // 按比例加也行，但结果不变，都不能进入下个循环了
        }
    }


    // 最后返回已装包的物品价值
    return val
}