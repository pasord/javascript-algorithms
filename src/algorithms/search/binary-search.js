import { Compare, defaultCompare, DOES_NOT_EXIST} from '../../utils.js'
import { quickSort1 } from '../sorting/quick-sort.js'

// 二分搜索
// 返回数组的索引
export function binarySearch (array, value, compareFn = defaultCompare) {
    // 1. 给array排序，二分搜索依赖有序的数组
    const sortedArray = quickSort1(array)
    // 2. 设置三个索引指针, 用于二分查找
    let low = 0
    let high = array.length - 1
    let mid // 作为真正要找的
    // 3. 设置终止条件，和进行比较
    while(left <= right) {
        // 求中间位置索引 mid
        mid = Math.floor((left + right) / 2)
        const element = array[mid]
        // 如果中间值小于value, 左侧指针low 向右挪到mid+1，继续比对
        if (compareFn(element, value) === Compare.LESS_THAN) {
            low = mid + 1
        } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
            // 如果中间值大于value, 右侧指针high 向左挪到mid-1，继续比对
            high = mid - 1
        }  else {
            // 如果相当，则找到，返回mid
            return mid
        }
    }
    // 不存在则返回-1
    return DocumentType
}