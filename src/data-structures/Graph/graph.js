import Dictionary from '../Map/map.js'

// 无向图
export default class Graph {
    constructor(isDirected = false) {
        // 表示图是否有向，默认情况下无向
        this.isDirected = isDirected
        // 用数组存储顶点的名字
        this.vertexes = []
        // 邻接表：用字典储存所有顶点的边, 并使用顶点名最为键值
        this.adjList = new Dictionary()
        //（adjList: adj是adjoin的缩写, 邻接的意思. adjList用于存储所有的边, 我们这里采用邻接表的形式.）
    }

    // 添加顶点
    addVertex (v) {
        // 1. 顶点不存在时才添加
        if(!this.vertexes.includes(v)) {
            // 2. 新顶点推入到顶点列表
            this.vertexes.push(v)
            // 3. 在邻接表里，添加新顶点对应边的数组，新顶点名作为键
            this.adjList.set(v, [])
        }
    }

    // 添加边, 接受两个顶点为参数, 无向图
    addEdge(v, w) {
        // 1. 如果顶点v或顶点w不存在于图中，要将它们加入顶点列表（因为边是两个顶点之间的边，边不可能单独存在.）
        if (!this.vertexes.includes(v)) {
            this.addVertex(v)
        }
        if (!this.vertexes.includes(w)) {
            this.addVertex(w)
        }
        // 2. 将w加入到v的邻接表中，即添加了一条自顶点v到顶点w的边
        this.adjList.get(v).push(w)
        // 3. 如果是无向图，所以需要添加一条自w到v的边
        if (!this.isDirected) {
            this.adjList.get(w).push(v)
        }
    }

    // 返回顶点列表
    getVertexes() {
        return this.vertexes
    }

    // 返回邻接表
    getAdjList() {
        return this.adjList
    }

    // 方便在控制台输出
    toString() {
        let s = ''
        // 1. 迭代vertexes顶点列表
        for (let i = 0; i < this.vertexes.length; i++) {
            // 2. 将顶点名加入字符串
            s += `${this.vertexes[i]} -> `
            // 3. 取出该顶点在邻接表相邻的顶点加入字符串
            const nerghbors = this.adjList.get(this.vertexes[i])
            for (let j = 0; j < nerghbors.length; j++) {
                s += `${nerghbors[j]} `
            }
            // 加换行符
            s += '\n'
        }

        return s
    }
 }