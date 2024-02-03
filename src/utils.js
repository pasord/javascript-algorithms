
export function defaultToString (item) {
    if (item === null) {
        return 'NULL'
    }
    if (item === undefined) {
        return 'UNDEFINED'
    }
    if (typeof item === 'string' || item instanceof String) {
        return item
    }
    return item.toString()
}

export function swap (array, a, b) {
    // 数组结构赋值完成交换
    [array[a], array[b]] = [array[b], array[a]]
}

export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}

export function defaultCompare (a, b) {
    if (a > b) {
        return Compare.BIGGER_THAN
    } else if (a < b) {
        return Compare.LESS_THAN
    } else {
        return Compare.EQUALS
    }
}