/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-02 20:15:45
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-02 21:53:21
 * @Description: 防抖
 * 在高频调用中只有足够的空闲时间，代码才会执行一次
 * （常见：input和change事件），只有停顿输入的时间大于指定的时间，代码才会执行一次
 * 思路：第一次调用时创建一个定时器，在指定的间隔时间之后运行代码，第二次调用该函数后，清除前一次的定时器并重新设置一个
 */
// debounce 函数返回一个闭包，闭包被频繁的调用
// debounce 函数只调用一次，之后调用的都是它返回的闭包函数
// 在闭包内部限制了回调函数fn的执行，强制只有连续操作停止后执行一次
function debounce(action, delay) {
    let timeoutId = null;
    // debounce函数返回一个闭包，为了保证定时器的变量不会被gc回收
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            action.apply(context, args);
        }, delay);
    }
}
function change() {
    console.log("change");
}
function runChange() {
    debounce(change, 1000);
}

// 非匿名自执行函数，函数名只读
var b = 10;
(function b() {
    'use strict'
    b = 20;
    console.log(b);
})();

var a = function () {
    console.log("我是函数")
}
// a = "111";
console.log(a);