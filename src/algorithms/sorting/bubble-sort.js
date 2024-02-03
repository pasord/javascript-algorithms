import {Compare, defaultCompare, swap} from '../../utils.js'

// 冒泡排序
export function bubbleSort (array, compareFn = defaultCompare) {
    const length = array.length
    
    for (let i = 0; i < length; i++) {
        // j到倒数第2个就是对比边界了
        // 每次从0开始，与后面的开始对比，大于后面的则进行交换，小于则不交换
        for (let j = 0; j < length - 1 ; j++) {
            if (compareFn(array[j], array[j+1]) === Compare.BIGGER_THAN) {
                swap(array[j], array[j+1])
            }
        }
    }
}

