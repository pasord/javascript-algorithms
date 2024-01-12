import StackArray from './stack-array.js';

// 将十进制转换为二进制
// 把十进制转换为二进制的通用方法就是模二取余法，将十进制数字不断模二取余，直到被除数等于零时停止，将得到的余数逆序输出即为相应二进制数字。
export default function dec2bin(decNumber) {
    // 1.定义栈对象
    const stack = new StackArray()

    // 2.循环模二取余
    while(decNumber>0) {
        stack.push(decNumber % 2)
        decNumber = Math.floor(decNumber / 2)
    }

    // 3.按顺序出栈得到结果
    let binaryString = ''
    while(!stack.isEmpty()) {
        binaryString += stack.pop()
    }

    return binaryString
}

// dec2bin() 测试
console.log('// ----- 十进制转二进制测试 START -----//');
console.log(dec2bin(100)); //--> 1100100
console.log(dec2bin(88)); //--> 1011000
console.log(dec2bin(233)); //--> 11101001
console.log('// ----- 十进制转二进制测试 END -----//');