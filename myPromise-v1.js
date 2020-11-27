/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2020-11-27 09:23:00
 * @Last Modified by: zing
 * @Last Modified time: 2020-11-27 16:14:56
 * @Description: 实现一个Promise
 */

/**
 * Promise三种状态：
 * Pending(进行中),Fulfilled(已成功),Rejected(已失败)
 * 使用Symbol定义，防止外界改变
 * 在then实例方法中调用回调函数时，要把executor中的执行结果作为参数传入
 * 执行成功得结果通过内置方法resolve的参数传入
 * 执行失败的原因通过内置方法reject的参数传入
 */

const Pending = Symbol("Pending");
const Fulfilled = Symbol("Fulfilled");
const Rejected = Symbol("Rejected");
class Promise {
    constructor(executor) {
        this.status = Pending;
        this.value = undefined;//存储executor中执行成功的结果
        this.reason = undefined;//存储executor中执行失败的原因
        const resolve = (value) => {
            // 只有状态为Pending才改变，来保证一旦状态改变就不会再变
            if (this.status === Pending) {
                this.status = Fulfilled;
                this.value = value;
            }
        }
        const reject = (reason) => {
            if (this.status === Pending) {
                this.status = Rejected;
                this.reason = reason;
            }
        }
        executor(resolve, reject);
    }
    /**
     * promise回调函数
     * @param {function} onFulfilled 成功回调函数
     * @param {function} onRejected 失败回调函数
     */
    then(onFulfilled, onRejected) {
        if (this.status === Fulfilled) {
            if (onFulfilled && typeof onFulfilled === "function") {
                onFulfilled(this.value);
            }
        }
        if (this.status === Rejected) {
            if (onRejected && typeof onRejected === "function") {
                onRejected(this.reason);
            }
        }
    }
}

// const test = new Promise((resolve, reject) => {
//     resolve("执行成功")
// }).then(res => {
//     console.log(res);
// })

// 以下并没有输出，是因为调用then函数时，Promise状态仍旧是Pending,虽然1s后Promise状态变为Fulfilled，但then方法已经调用过了
// 使用发布者-订阅者模式控制then方法中的回调函数执行时机
const testAsyn = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("执行成功")
    }, 1000);
}).then(res => {
    console.log(res);
})