/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-14 17:18:06
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-14 17:22:15
 * @Description: 实现一个trim函数
 */
/**
 * 
 * @param {string} str 
 */
function myTrim(str) {
    let i = 0;
    for (; i < str.length; ++i) {
        if (str[i] !== " ") break;
    }
    str = str.substring(i, str.length);
    for (i = str.length - 1; i >= 0; --i) {
        if (str[i] !== " ") break;
    }
    str = str.substring(0, i + 1);
    return str;
}
console.log(myTrim("   abc   "));