
// 回溯算法-迷宫老鼠问题

/**
 * 矩阵就是迷宫，“老鼠”的目标是从位置[0][0]开始并移动到[n-1][n-1]（终点）。老鼠可以在垂直或水平方向上任何未被阻挡的位置间移动
 */

export function ratInAMaze(maze) {
    // 1. 创建包含解的矩阵
    const solution = []
    // 2. 解矩阵每个位置初始化为零
    for (let i = 0; i < maze.length; i++) {
        solution[i] = []
        for (let j = 0; j < maze[i].length; j++) {
            solution[i][j] = 0
        }
    }
    // 3. 如果算法找到一个解，返回解决矩阵
    // 从0,0位置开始
    if(findPath(maze, 0, 0, solution) === true) {
        return solution
    }

    // 4. 没找到返回
    return 'NO PATH FOUND'
}

// 回溯技巧也使用了递归
function findPath (maze, x, y, solution) {
    // 1. n 矩阵的长度
    const n = maze.length
    // 2. 这里验证老鼠是否达到了终点
    if (x === n - 1 && y === n - 1) {
        solution[x][y] = 1 // 在解矩阵中最后一个位置标记为路径的一部分
        return true // 返回true，表示成功到达终点
    }
    // 3. 如果不是最后一步，要验证老鼠能否安全到达x,y位置
    if (isSafe(maze, x, y) === true) {
        // 3.1 如果是安全的，把这步加入到路径
        solution[x][y] = 1
        // 3.2 继续探索路径，并试着在 maze 矩阵中水平移动(向右)到下一个位置
        if (findPath(maze, x + 1, y, solution) === true) {
            return true
        }
        // 3.3 在某个递归作用域，上面栈出来，继续探索，向下垂直移动到下一个为止
        if (findPath(maze, x, y + 1, solution) === true) {
            return true
        }
        // 3.4 这个递归栈，水平垂直都不能前进，那这步路径移除，并回溯，表示这里走不通
        solution[x][y] = 0
        return false
    } 
    // 4. x,y位置不是安全的，不能到，则返回false，出栈回去，一个方向回溯
    // *注意：所有的false都始于这里
    return false
}

// 判断某个位置是否空闲且是否越界，
// 判断是否能移动在x,y位置，都是在这里判断的，别的地方只是使用判断的结果
function isSafe (maze, x, y) {
    const n = maze.length
    // 1. 越界判断
    // 2. 位置是否空闲
    if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
        return true
    }
    return false
}

