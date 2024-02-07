// 贪心算法--最小硬币找零问题

/**
 * 最小硬币找零问题
 * coins 指的是货币的面值，美元[1, 5, 10, 25]$
 * amount 是随便一个数值
 * 找零就是换成货币，比如99$换成上面的货币，比如99个1$也可以
 * 最小找零，就是换成货币个数最少，那就是先按面值最大的(25$)先算，以此类推
 */

export function minCoinChange (coins, amount) {
    // 零钱数组
    const change = []
    // 零钱累计值，用于和amount比对，不能超过
    let total = 0
    // 要最小找零结果，需要从最大的面值算起，以此类推
    for (let i = 0; i < coins.length; i++) {
        // 一个货币面值
        const coin = coins[i]; 
        // 可以重复添加一个面值的货币
        // 添加完要加到total上, 用于比对
        while (total + coin <= amount) {
            change.push(coin)
            total = total + coin
        }
    }

    // 返回找零结果
    return change
}