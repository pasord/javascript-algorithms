
// 最长公共子序列

// 如果比较背包问题和 LCS 算法，我们会发现两者非常相似。这项从顶部开始构建解决方案 的技术被称为记忆化，而解决方案就在表格或矩阵的右下角。


export function lcs (wordX, wordY) {
    const m = wordX.length
    const n = wordY.length
    const l = []
    // 初始化矩阵
    for (let i = 0; i <= m; i++) { // 矩阵需要等于m
        for (let j = 0; j <= n; j++) { // 矩阵需要等于n
            l[i][j] = 0
        }
    }

    // 遍历并坐标赋值
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0 || j === 0) {
                l[i][j] = 0
            } else if (wordX[i] === wordY[j]) {
                l[i][j] = l[i - 1][j - 1] + 1 // 这是赋值规则（方便查找）
            } else {
                // 这是也是赋值规则
                const a = l[i - 1][j]
                const b = l[i][j - 1]
                l[i][j] = a > b ? a : b // max(a,b)
            }
        }
    }

    // 返回最优解，在矩阵最右下角
    return l[m][n]
}