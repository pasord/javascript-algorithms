import { Compare, defaultCompare, DOES_NOT_EXIST} from '../../utils.js'
import { quickSort } from '../sorting/quick-sort.js'

// 分而治之版本的二分搜索算法

// 主函数
export function binarySearch (array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort(array)
    const low = 0
    const high = sortedArray.length - 1
    binarySearchRecursive(sortedArray, value, low, high)
}

// 递归函数
function binarySearchRecursive (array, value, low, high, compareFn = defaultCompare) {
    // 递归判断条件，low不能大于high
    // 注意，递归返回最后找到的mid要return出来
    if (low <= high) {
        const mid = Math.floor((low + high) / 2)
        // 去右侧递归
        if (compareFn(value, array[mid]) === Compare.BIGGER_THAN) {
            return binarySearchRecursive(array, value, mid + 1, high)
        } // 这里加不加 else 都行，同一作用域内它俩肯定不能走到一起
        // 去左右侧递归
        if (compareFn(value, array[mid]) === Compare.LESS_THAN) {
            return binarySearchRecursive(array, value, low, mid - 1)
        }

        // 最后，前面两个条件都不能进去，说明是value等于array[mid]，返回mid
        return mid
    }


    return DOES_NOT_EXIST
}