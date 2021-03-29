/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-23 16:39:31
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-23 18:48:53
 * @Description: 实现一个sleep函数 
 */

const { rejects } = require("node:assert");
const { time } = require("node:console");
const { resolve } = require("node:path");

// 定时器实现 不建议使用定时器实现
// 因为setTimeout是宏任务，在事件循环中无法保证优先级
// function sleep_setTimeout(callback, wait) {
//     setTimeout(callback, wait);
// }
// console.log("hello");
// sleep_setTimeout(() => {
//     console.log("world");
// }, 5000);

// es6异步处理
function sleep_Promise(wait) {
    return new Promise(resolve => setTimeout(resolve, wait))
}
console.log("hello");
sleep_Promise(5000).then(() => { console.log("world") })

// generator实现 写法1
// function mySleep(wait) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, wait);
//     })
// }
// function* sleep_Generator(wait) {
//     yield mySleep(wait);
// }
// sleep_Generator(5000).next().value.then(() => { console.log("world"); })

// 写法2
function* sleep_Generator(wait, fn) {
    yield setTimeout(fn, wait);
}
console.log("hello");
sleep_Generator(5000, () => { console.log("world"); }).next();

// async/await实现
// 需要再看一下async和await怎么实现异步
function mySleep(wait) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, wait);
    })
}
async function sleep_Async(wait) {
    await mySleep(wait);
    console.log("world");
}
console.log("hello");
sleep_Async(5000);