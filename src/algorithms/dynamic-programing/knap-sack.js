
// 背包问题 - 动态规划：（不考虑分数问题）

function findValues(n, capacity, kS) {
    let i = n;
    let k = capacity;
    console.log('构成解的物品:');
    while (i > 0 && k > 0) {
        console.log('ik:', i, k);
      if (kS[i][k] !== kS[i - 1][k]) {
        console.log(`物品 ${i} 可以是解的一部分 w,v: ${weights[i - 1]}, ${values[i - 1]}`);
        // console.log('k-kS[i][k]:', k, kS[i][k]);
        k -= weights[i - 1];
        // console.log('k=', k);
        i--;
        
      } else {
        i--;
      }
    }
  }
  
// 通过矩阵的结构储存数据
// 让每个坐标都是最优，子问题最优，最终问题依赖子问题
export function knapSack(capacity, weights, values, n) {
const kS = [];
// 初始化矩阵
for (let i = 0; i <= n; i++) {
    kS[i] = [];
}
// 价值种类 竖向遍历
for (let i = 0; i <= n; i++) {
    // 横向求解每个坐标的最优
    for (let w = 0; w <= capacity; w++) {
        if (i === 0 || w === 0) {
            // 横 竖为0，价值都为0
            kS[i][w] = 0;
        } else if (weights[i - 1] <= w) {
            // i - 1 就是当前物品，values[i - 1]当前物品的机制，weights[i - 1]当前物品的重量
            const a = values[i - 1] + kS[i - 1][w - weights[i - 1]]; // a 等于 当前物品价值，加上，剩余重量价值；剩余重量价值等于上一层数据做移动 w - weights[i - 1]；上一层每个值都是计算过最优的
            const b = kS[i - 1][w]; // 上一层w的最优价值
            kS[i][w] = a > b ? a : b; // max(a,b) 求两者最大，赋值给当前坐标，求得最优
            // console.log(a + ' can be part of the solution');
        } else {
            // 剩余重量不足成方当前物品，则当前坐标左右解还是上一层的w最优解
            kS[i][w] = kS[i - 1][w];
        }
    }
    // console.log(kS[i].join());
}
// extra algorithm to find the items that are part of the solution
findValues(n, capacity, kS);
return kS[n][capacity];
}


const values = [6,7,8],
weights = [2,3,4],
capacity = 5,
n = values.length;
console.log(knapSack(capacity, weights, values, n)); // 输出7