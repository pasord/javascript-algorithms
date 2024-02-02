import Graph from '../graph.js'
import Stack from '../../Stack/stack.js'
import {breadthFirstSearch, BFS} from '../algorithms/breadth-first-search.js'

// 创建图实例
const graph = new Graph()
// 添加顶点
const myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < myVertexes.length; i++) {
    const v = myVertexes[i];
    graph.addVertex(v)
}
// 添加边
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

// 1. 输出图结构
console.log('********* printing graph ***********');
console.log(graph.toString());

// 2. 广度优先搜索 with callback
console.log('********* bfs with callback ***********');
const printVertex = (value) => console.log('Visited vertex: ' + value);
breadthFirstSearch(graph, myVertexes[0], printVertex)

// 3. 广度优先搜索-最短路径
// 通过前溯点数组，可以用下面这段代码来构建从顶点A到其他顶点的最短路径（衡量标准是边的数量）
console.log('********* shortest path - BFS ***********');
const shortestPathA = BFS(graph, myVertexes[0])
console.log(shortestPathA.distances);
console.log(shortestPathA.predecessors);
// 用顶点A作为源顶点
const fromVertex = myVertexes[0] // 源顶点
// 3.1 计算每个顶点（除源顶点A）到A的路径
// 从索引1开始
for (let j = 1; j < myVertexes.length; j++) {
    // 创建一个栈来储存路径
    const path = new Stack()
    // 顶点
    const toVertex = myVertexes[j];
    // 遍历这个顶点到源顶点的路径
    // 追溯toVertex到fromVertex的路径。变量v被赋值为其前溯点的值，这样我们能够反向追溯这条路径
    let v = toVertex
    while(v !== fromVertex) {
        // 将变量v添加到栈中
        path.push(v)
        // 添加完后，变量v被赋值为其前溯点的值
        v = shortestPathA.predecessors[v] 
    }
    // 最后把源顶点添加到栈中
    path.push(fromVertex)
    // 创建一个s字符串，并将源顶点赋值给它（它是最后一个加入栈中的，所以是第一个被弹出的项)
    let s = path.pop()
    while(!path.isEmpty()) {
        s += ' - ' + path.pop()
    }

    console.log(s);
}

// ********* printing graph ***********
// A -> B C D 
// B -> A E F 
// C -> A D G 
// D -> A C G H 
// E -> B I 
// F -> B 
// G -> C D 
// H -> D 
// I -> E 

// ********* bfs with callback ***********
// Visited vertex: A
// Visited vertex: B
// Visited vertex: C
// Visited vertex: D
// Visited vertex: E
// Visited vertex: F
// Visited vertex: G
// Visited vertex: H
// Visited vertex: I
// ********* shortest path - BFS ***********
// { A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3 }
// {
//   A: null,
//   B: 'A',
//   C: 'A',
//   D: 'A',
//   E: 'B',
//   F: 'B',
//   G: 'C',
//   H: 'D',
//   I: 'E'
// }
// A - B
// A - C
// A - D
// A - B - E
// A - B - F
// A - C - G
// A - D - H
// A - B - E - I