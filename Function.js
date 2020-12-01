/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2020-11-30 14:35:17
 * @Last Modified by: zing
 * @Last Modified time: 2020-11-30 14:35:42
 * @Description: CH7 code
 */

/**
 * 函数声明
 */
var objStr = "123";
function objStr() {
    return "456";
}
console.log(objStr);//123
console.log(objStr());//TypeError: objStr is not a function

/**
 * 函数表达式
 */
var objStr = "123";
objStr = function () {
    return "456";
}
console.log(objStr);//[Function: objStr]
console.log(objStr());//456
/**
 * 闭包
 */
