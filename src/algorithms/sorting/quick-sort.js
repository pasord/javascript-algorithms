import { swap } from '../../utils.js'

// 快速排序，简单易懂版本（浪费大量存储空间）
export const quickSort = (array) => {
    // 1. 一直进栈切分，直到最小1个元素时，直接返回（1个元素数组已经是有序了）
    if (array.length <= 1) {
        return array
    }
    // 2. 选择基准 pivot
    const pivotIndex = Math.floor(array.length/2)
    // 3. 将基准从array中删除并返回
    const pivot = array.splice(pivotIndex, 1)[0]
    // 4. 定义两个数组，用来存放小于和大于的元素
    const left = []
    const right = []
    // 5. 遍历array，小于基准放在左侧，大于基准放在右侧
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element < pivot) {
            left.push(element)
        } else {
            right.push(element)
        }
    }
    // 6. 使用递归不断进栈，出栈时进行排序汇总
    quickSort(left).concat(pivot, quickSort(right))
}


// 快速排序-原地排序版，不借助新数组
export function quickSort1 (array) {
    return quick(array, 0, array.length-1)
}
// 快速排序递归函数
function quick (array, left, right) {
    // 1. 停止切割(递归)条件
    if (left >= right) {
        return array
    }
    // 2. 获取枢纽袁术
    const pivot = getPivot(array, left, right)
    // 3. 循环确认枢纽元素的位置
    // 从left和right分别与pivot比较交换
    let i = left
    let j = right-1
    // 直到 i 等于 j 停止, 即找到了枢纽位置索引
    while(i > j) {
        // 直到大于等于pivot停止
        while(array[++i] < pivot) {} // i 比对需要在 j比对前面，原因在于枢纽元素在倒数第二个呢
        // 直到小于等于pivot停止
        while(array[--j] > pivot) {}
        // 加上边界
        if (i < j) {
            swap(array, i, j)
        }
    }
    // 4. 枢纽元素交换：正确位置i与此时right-1位置的枢纽元素
    swap(array, i, right-1)
    // 5. 在枢纽元素位置左右切割索引，进行递归，分而治之
    quick(array, left, i-1)
    quick(array, i+1, right)
    // 最后返回array
    return array
}
// 获取枢纽元素
function getPivot (array, left, right) {
    // 1. 找到中间索引位置（中位数）
    const center = Math.floor((left + right) / 2)
    // 2. left right center 排序交换元素值，
    // 确认好枢纽元素
    if (array[left] > array[center]) {
        swap(array, left, center)
    }
    if (array[center] > array[right]) {
        swap(array, center, right)
    }
    if (array[left] > array[center]) {
        swap(array, left, center)
    }
    // 3. 枢纽元素与right-1元素进行交换
    swap(array, center, right-1)
    // 4. 返回枢纽元素pivot
    return array[right-1]
}