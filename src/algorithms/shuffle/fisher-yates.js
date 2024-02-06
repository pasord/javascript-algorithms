import { swap } from '../../utils.js'
// 规则：
// 1. 迭代数组
// 2. 从最后一位开始并将当前位置和一个随机位置进行交换
// 3. 这个随机位置比当前位置小
// 4. 这样，这个算法可以保证随机过的位置不会再被随机一次（洗扑克牌的次数越多，随机效果越差）
// 5. shuffle 洗牌的意思
export function shuffle (array) {
    // i 最小是1时停止
    for (let i = array.length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)) // 这个随机位置比当前位置小
        swap(array, i, randomIndex)
    }

    return array
}