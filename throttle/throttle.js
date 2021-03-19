/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-02 16:46:16
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-02 21:10:25
 * @Description: 节流函数（优化高频率执行的函数的一种方法）
 * 在每个时间段n里，最多只允许运行一次。
 * 思路：第一次调用时记录时间戳，之后每次运行时都与上一次调用时时间戳比较差值，当差值>=某个值时才执行
 */
function throttle(action, delay) {
    let args, context;
    let lastRun = 0;
    return function () {
        let now = Date.now(), elapsed = now - lastRun;
        console.log(lastRun, now);
        args = arguments;
        context = this;
        if (elapsed >= delay) {
            action.apply(context, args);
            lastRun = now;
        }
    };
}
// function throttle(action, delay) {
//     let timeout = null;
//     let lastRun = 0;
//     return function () {
//         if (timeout) return;
//         let elapsed = Date.now() - lastRun;
//         console.log(elapsed);
//         let context = this, args = arguments;
//         let runCallback = function () {
//             lastRun = Date.now();
//             timeout = false;
//             action.apply(context, args);
//         }
//         if (elapsed >= delay) {
//             runCallback();
//         } else {
//             timeout = setTimeout(runCallback, delay);
//         }
//     };
// }

// 思路2 设置定时器
// function throttle(action, delay) {
//     let canRun = true;
//     console.log(action);
//     (function () {
//         console.log("11");
//         if (!canRun) return;
//         canRun = false;
//         setTimeout(() => {
//             action.apply(this, arguments);
//             canRun = true;
//         }, delay);
//     })();
// }
function buy() {
    console.log("买它！！");
}
function runBuy() {
    return throttle(buy, 1000);
    // console.log("buy");
}