import Queue from './queue.js'

// 利用队列结构特点实现击鼓传花（直到最后一个人及位置）
// namelist 人名列表
// num 击鼓次数
// 画像：击鼓时，不停的从前端拿元素，再从末端推入。
export default function passGame (namelist, num) {
    // 1. 创建一个队列实例
    const queue =  new Queue()

    // 2. 将 namelist 每个人名都推到队列里
    for (const name of namelist) {
        queue.enqueue(name)
    }
    
    // 3. 循环队列直到最后1个
    while (queue.size() > 1) {
        // 4. 循环次数 num -1, 每次循环把队列前端元素，拿出来再推入队列
        // 第num次就是要淘汰的那个元素
        for (let i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue())
        }

        // 5. 一个击鼓完成，淘汰队列前端1个元素（直到剩下最后一个）
        queue.dequeue()
    }

    // 6. 找到最后1个位置, 并返回
    return namelist.indexOf(queue.front())
}

// passGame() 测试
// console.log('// ----- 击鼓传花测试 START -----//');
// const names = ['lily', 'lucy', 'tom', 'tony', 'jack'];
// const targetIndex = passGame(names, 4);
// console.log('击鼓传花', names[targetIndex]); //--> lily
// console.log('// ----- 击鼓传花测试 END -----//');
