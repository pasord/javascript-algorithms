
// 最少硬币找零问题 - 动态规划 

// 把每个都缓存起来，方便上层直接用，这也是为什么全部计算的原因
// 地推
// 把每一个value的最小找零都计算出来(每个最优)，然后缓存起来，方便后续直接使用
// 找零问题，可以看成一个树，寻找最小深度/解。dfs深度遍历每个结果并对比缓存，面值是path，value是节点

// 理解这个，需要以前的《算法和数据结构的知识》，加上画图，加上打印，综合思考。这个一个新的思考的工具，多加练习。

// 如何更好的理解递归
// 1. 遍历通过树的图(画出来)，比较好看，树的遍历dfs，从左向右
// 2. 边界条件也可以看树的图
// 3. 计算也是看树图，这里就是父节点最优，就是子节点的结果的比较

export function minCoinChange (coins, amount) {
    const cache = []

    const makeChange = (value) => {
        // 最小为0，下面递归入口判断了，也是终止条件
        if (!value) {
            return []
        }

        if (cache[value]) {
            return cache[value]
        }

        // 递归一次的求解
        let min = []
        let newMin
        let newAmount

        // coins比作路径，value比作节点(还有newAmount)，min比作求解
        for (let i = 0; i < coins.length; i++) { // 对比二叉树只有左右两个节点可选，而这个树根据coins长度决定
            const coin = coins[i];
            newAmount = value - coin // 通过前面节点+路径拿到新的节点
            // 进入递归条件/也是终止条件
            if (newAmount >= 0) { // 判断先的节点是否可前进
                newMin = makeChange(newAmount)
            }
            // 以上就是所有的条件，深度遍历，dfs 
            // 下面的就是用来求解了，求得最优解min，缓存起来，如果再遇到直接用就行。
            // 遍历是通过dfs来的
            // 动态规划，把每一层的最优结果计算出来，缓存起来；每一层的结果都是儿子们比较得到min，计算结果，通过换成和min
            if (
                newAmount>=0  // 能找开零钱，才能比对
                && (newMin.length + 1 < min.length || !min.length) // 比对小于或首次，找优
                && (newMin.length || !newAmount)  // newMin 有结果，或newAmount 为0，应该右侧记边界
            ) {
                min = [coin].concat(newMin) // 赋值最优
                console.log('new Min ' + min + ' for ' + value);
            }

            // newAmount 小于零 什么都不做，直接忽略
        }
        // 因为有面值1的存在value的min肯定是有值的（有最优解） 
        console.log('min', min);
        return (cache[value] = min) // 换成比对后得到，缓存 赋值最优
    }

    return makeChange(amount)
}

const result =  minCoinChange([1,3,4], 6)
console.log('minCoinChange:', result);

