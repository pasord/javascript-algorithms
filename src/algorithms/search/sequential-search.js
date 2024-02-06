import { defaultEquals, DOES_NOT_EXIST} from '../../utils.js'

// 顺序搜索/线性搜索
// 返回数组的索引
export function sequentialSearch (array, value, equalsFn = defaultEquals) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (equalsFn(element, value)) {
            return i
        }
    }

    return DOES_NOT_EXIST
}