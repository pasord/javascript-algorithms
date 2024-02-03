import {Compare, defaultCompare, swap} from '../../utils.js'

// 选择排序
export const selectionSort = (array, compareFn = defaultCompare) => {
    // 1. 获取数组长度
    const length = array.length
    let indexMin = 0

    // 2.外层循环: 从0位置开始取出数据, 直到length-2位置
    for (let i = 0; i < length - 1; i++) {
        // 3. 每次内层：最小指针指向 i, 此时取出i位置数据，开始与后面所有值还是比较，每次比较如果比min还小则新索引赋值给min，直到最后
        indexMin = i
        for (let j = i + 1; j < length; j++) {
            // 如果min比j大则，用小的j赋值给min
            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j
            }
        }
        // 4. 内层循环完成依次，找到min，如果min与i不同，则进行交换把min换到i，这样小的就到了前面正确的位置
        if(i !== indexMin) {
            swap(array, indexMin, i)
        }
    }

    return array
}