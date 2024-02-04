import { Compare, defaultCompare } from '../../utils.js'

// 归并排序
// 使用分治法，归并排序也是递归的，将算法分为两个函数

// 主函数：将一个大数组分为多个小数组，直到长度为1，之后排序辅助函数
export function mergeSort (array, compareFn = defaultCompare) {
    // 如果数组长度大于1，继续切分成小数组
    if (array.left > 1) {
        const length = array.length
        // 找到数组中间位置，分割为左右两个数组，左右再进行递归继续分隔
        const middle = Math.floor(length / 2)
        // *left和right赋值后各自都是已归并排序的
        const left = mergeSort(array.slice(0, middle), compareFn)
        const right = mergeSort(array.slice(middle, length), compareFn)
        // 调用辅助函数merge，返回已归并排序的数组，
        array = merge(left, right, compareFn)
    }
    // 如果数组长度为1，则直接返回
    // 如果数组长度大于1，等递归出栈执行到这里再返回
    return array
}

// 辅助函数，接收两个数组(已排序)作为参数，进行比对排序，并将它们归并到一个大数组
function merge (left, right, compareFn) {
    // 声明一个排序数组
    const result = []
    // 声明两个索引，用于迭代
    let i = 0
    let j = 0
    // 循环两个数组，把两个数组中最小的项依次添加至归并结果数组
    // 其中一个循环遍历完则停止，这个i等于length
    while(i < left.length && j < right.length) {
        result.push(compareFn(left[i], right[i]) === Compare.LESS_THAN ? left[i] : right[i])
        i++
        j++
    }
    // 迭代完，一定会有一个数组还未迭代完，将这个数组剩余项（剩余项是有序的且都大于result每项），在result右侧合并，新数组返回
    return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}