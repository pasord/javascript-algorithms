
// 顶点标记枚举
const Colors = {
    WHITE: 0, // 白色：表示该顶点还没有被访问
    GREY: 1, // 灰色：表示该顶点被访问过，但并未被探索过
    BLACK: 2 // 黑色：表示该顶点被访问过且被完全探索过
}
  
// 初始化颜色代码
const initializeColor = (vertexes) => {
    // key键是顶点v
    const color = {} 

    // 初始化，顶点标记默认白色
    for (let i = 0; i < vertexes.length; i++) {
        const v = vertexes[i];
        color[v] = Colors.WHITE
    }

    return color
}

// 深度优先搜索算法
export const depthFirstSearch = (graph, callback) => {
    const vertexes = graph.getVertexes()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertexes)

    // 深度优先搜索算法不需要一个源顶点，则把每个顶点挨个访问就行
    for (let i = 0; i < vertexes.length; i++) {
        const v = vertexes[i];
        depthFirstSearchVisit(v, color, adjList, callback)
    }
}

// 深度优先搜索算法-递归方法（递归本质是函数调用站）
export const depthFirstSearchVisit = (v, color, adjList, callback) => {
    // 1. 标记v为灰色(已访问)
    color[v] = Colors.GREY
    // 2. 执行callback，输出已访问过的顶点v（先序遍历思考）
    if (callback) {
        callback(v)
    }
    // 3. 获取邻接顶点
    const neighbors = adjList.get(v)
    // 4. 遍历，递归-深度访问
    for (let j = 0; j < neighbors.length; j++) {
        const neighbor = neighbors[j];
        // 5. 如果未被访问过，就递归深入访问
        if (color[neighbors] === Colors.WHITE) {
            depthFirstSearchVisit(neighbor, color, adjList, callback)
        }
    }
    // 6. 邻接顶点访问完，标记为黑色
    color[v] = Colors.BLACK
}

// 对于给定的图，深度优先搜索遍历图的所有节点，
// 构建“森林”（有根树的一个集合）以及一组源顶点（根），
// 并输出两个数组：发现时间和完成探索时间
export const DFS = (graph) => {
    const vertexes = graph.getVertexes()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertexes)

    // 1. 顶点v的发现时间d[v]（被访问的时候）
    const d = {}
    // 2. 顶点v被标注为灰色时，v完成探索的时候f[v]
    const f = {}
    // 3. 顶点v的前回溯点p[v]
    const p = {}
    // 4. 次数统计：被发现时、被探索后各记
    const time = { count: 0 }
    // 5. 初始化记录
    for (let i = 0; i < vertexes.length; i++) {
        const v = vertexes[i];
        d[v] = 0
        f[v] = 0
        p[v] = null
    }
    // 6. 搜索
    for (let j = 0; j < vertexes.length; j++) {
        const v = vertexes[j];
        if (color[v] === Colors.WHITE){
            DFSVisit(v, color, d, f, p, time, adjList)
        } 
    }

    return {
        discovery: d,
        finished: f,
        predecessors: p
    }
}

// DFS-递归方法
export const DFSVisit = (v, color, d, f, p, time, adjList) => {
    // 1. 顶点v被访问标记为灰色
    color[v] = Colors.GREY
    // 2. 顶点v被访问, 统计次数+1
    d[v] = ++time.count

    const neighbors = adjList.get(v)
    for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (color[neighbor] === Colors.WHITE) {
            // 3. 标记前回溯顶点
            p[neighbor] = v
            DFSVisit(neighbor, color, d, f, p, time, adjList)
        }
    }

    // 4. 探索完标记为黑色, 同时统计次数+1
    color[v] = Colors.BLACK
    f[v] = ++time.count
}