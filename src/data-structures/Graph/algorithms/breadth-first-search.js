import Queue from '../../Queue/queue.js'

// 顶点标记枚举
const Colors = {
    WHITE: 0, // 白色，表示该顶点没有被访问过
    GREY: 1, // 灰色，表示该顶点被访问过，但未被探索（已经入对列）
    BLACK: 2, // 黑色，表示该顶点被访问过且被完全探索过（已出列，且被访问了邻接顶点）
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

// 广度优先搜索算法
export const breadthFirstSearch = (graph, startVertex, handler) => {
    // 1. 获取图的顶点列表和邻接表
    const vertexes = graph.getVertexes()
    const adjList = graph.getAdjList()
    // 2. 初始化所有顶点的颜色
    const color = initializeColor(vertexes)
    // 3. 创建队列
    const queue = new Queue()
    // 4. 将起始顶点推入队列
    // * 首次只有起始顶点入列，后面的入列通过向下访问它的邻接顶点
    // * 一层一层的访问
    queue.enqueue(startVertex)
    // 5. 队列非空, 则继续遍历, 直到空, 把每个顶点访问到
    while (!queue.isEmpty()) {
        // 6. 从顶点队列中，移出开始的顶点
        const qv = queue.dequeue()
        // 7. 获取qv相邻的所有顶点
        const neighbors = adjList.get(qv)
        // 8. 该顶点已被访问，标记灰色（貌似和下面标记黑色重复，没啥用；后面被推入队列的顶点已经标记灰色了）
        // *其实被推入队列就是被访问了，但并未被探索
        color[qv] = Colors.GREY
        // 9. 遍历邻接顶点，让未被访问的入列, 并标记灰色/被访问（*探索该顶点，访问它的邻接顶点）
        for (let i = 0; i < neighbors.length; i++) {
            const eighbor = neighbors[i];
            // 让未被访问白色顶点的入列, 并标记灰色/被访问
            if (color[eighbor] === Colors.WHITE) {
                // 这里标记为已被访问，已经入队列了，避免重复入队列
                color[eighbor] = Colors.GREY
                queue.enqueue(eighbor)
            }
        }
        // 10. 标记qv已被探索，即所有邻接顶点都被访问推入队列了
        color[qv] = Colors.BLACK
        // 11. 执行辅助函数，把出列顶点qv传入
        if(handler) {
            handler(qv)
        }
    }
}

// 使用BFS寻找最短路径
export const BFS = (graph, startVertex) => {
    const vertexes = graph.getVertexes()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertexes)
    const queue = new Queue()
    queue.enqueue(startVertex)

    // 1. 定义对象 distances 来表示距离
    const distances = {}
    // 2. 定义对象 predecessors 来表示前回溯点
    const predecessors = {}

    // 3. 初始化各个顶点的距离和前回溯点
    for (let j = 0; j < vertexes.length; j++) {
        const v = vertexes[j]
        // 距离默认初始0
        distances[v] = 0
        // 前回溯点默认null
        predecessors[v] = null
    }

    while(!queue.isEmpty()) {
        const qv = queue.dequeue()
        const neighbors = adjList.get(qv)
        color[qv] = Colors.GREY

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            // 未被访问的
            if (color[neighbor] === Colors.WHITE) {
                color[neighbor] = Colors.GREY
                // 距离等于前回溯点+1, 加1来增加之间的距离
                distances[neighbor] = distances[qv] + 1
                // 前回溯点是上层的顶点
                predecessors[neighbor] = qv
                queue.enqueue(neighbor)
            }
        }

        color[qv] = Colors.BLACK
    }

    return {
        distances,
        predecessors
    }
}