import { Compare, defaultCompare } from '../../utils.js'

// 插入排序
export const insertionSort = (array, compareFn = defaultCompare) => {
    const length = array.length

    // 1. 从1位置开始作为插入值，即开始0位置自己作为局部有序
    for (let i = 1; i < array.length; i++) {
        // 2. 每次外层循环：暂存插入值，即i值
        const temp = array[i];
        // 3. 每次外层循环：j等于左侧局部有序最大索引i
        let j = i
        // 4. 内层循环：最左侧比较式j为1时，与j-1(0)位置比较
        // 如果 j-1 大于 temp 则进入体内，进行指针左移动，和重新赋值
        while(j > 0 && compareFn(array[j-1], temp) === Compare.BIGGER_THAN) {
            // 指针位置是 j， 将指针值等于j-1的值（值后移动）
            array[j] = array[j-1]
            // 将指针位置指向 j--， 指针值还是j-1的值（指针前移动）
            // j和j-1值相等，
            // 后面j--，j变成j-1，此时j和j+1值是相等的，最后就可以给j赋值temp，这就是插入
            j--
        }
        // 对比完成，j已经是正确的位置，赋值插入值temp
        // if(j !== i) {}
        array[j] = temp
    }

    return array
}