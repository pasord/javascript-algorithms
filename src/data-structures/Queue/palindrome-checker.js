import Deque from './deque.js'

// 回文检测器
// 画像：从双端队列两端，同时取出(并删除)双端字母，进行对比是否一致

export default function palindromeChecker (str) {
    // 检测字符串是否合法
    if (
        str === undefined
        || str === null
        || (str !== null && str.length === 0)
    ) {
        return false
    }

    // 将所有字母转成小写，且清楚空字符串，因为str可能存在大小写
    const lowerStr = str.toLocaleLowerCase().split(' ').join('')

    // 定义两个指针
    let firstChar = ''
    let lastChar = ''

    // 创建双端队列实例，并入队
    const deque = new Deque()

    // 收尾字母比较
    // size为1，肯定是回文
    // size大于1，进行双端比较
    // 因为deque是不断减2的，所有size值是动态的
    while (deque.size() > 1) {
        firstChar = deque.removeFront()
        lastChar = deque.removeBack()
        if (firstChar !== lastChar) {
            return false
        }
    } 


    // 初始size 为1时，默认true
    return true 
}

// palindromeChecker() 测试
console.log('// ----- 回文检查器测试 START -----//');
console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));
console.log('// ----- 回文检查器测试 END -----//');