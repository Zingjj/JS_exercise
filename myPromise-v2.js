/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2020-11-27 16:17:04
 * @Last Modified by: zing
 * @Last Modified time: 2020-11-27 17:29:05
 * @Description: 使用发布者-订阅者模式控制then方法中的回调函数执行时机
 */

/**
 * 调用then函数时，Promise状态仍旧是Pending,虽然1s后Promise状态变为Fulfilled，但then方法已经调用过了
 * 使用发布者-订阅者模式控制then方法中的回调函数执行时机
 */
const Pending = Symbol("Pending");
const Fulfilled = Symbol("Fulfilled");
const Rejected = Symbol("Rejected");
class Promise {
    constructor(executor) {
        this.status = Pending;
        this.value = undefined;//存储executor中执行成功的结果
        this.reason = undefined;//存储executor中执行失败的原因
        this.onFulfilled = [];//executor中业务代码执行成功回调函数的集合 
        this.onRejected = [];//executor中业务代码执行失败回调函数的集合
        const resolve = (value) => {
            // 只有状态为Pending才改变，来保证一旦状态改变就不会再变
            if (this.status === Pending) {
                this.status = Fulfilled;
                this.value = value;
                // 依次调用成功回调函数
                this.onFulfilled.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status === Pending) {
                this.status = Rejected;
                this.reason = reason;
                // 依次调用失败回调函数
                this.onRejected.forEach(fn => fn());
            }
        }
        executor(resolve, reject);
    }
    /**
     * promise回调函数
     * then微任务的实现：
     * 原生Promise由V8引擎提供微任务，可以通过“宏任务”机制（setTimeout或setImmediate）
     * 或“微任务”机制（MutationObserver或process.nextTick）来实现
     * @param {function} onFulfilled 成功回调函数
     * @param {function} onRejected 失败回调函数
     */
    then(onFulfilled, onRejected) {
        if (this.status === Fulfilled) {
            if (onFulfilled && typeof onFulfilled === "function") {
                setTimeout(() => {
                    onFulfilled(this.value);
                }, 0);
            }
        }
        if (this.status === Rejected) {
            if (onRejected && typeof onRejected === "function") {
                setTimeout(() => {
                    onRejected(this.reason);
                }, 0);
            }
        }
        if (this.status === Pending) {
            if (onFulfilled && typeof onFulfilled === "function") {
                this.onFulfilled.push(() => {
                    setTimeout(() => {
                        onFulfilled(this.value);
                    }, 0);
                })
            }
            if (onRejected && typeof onRejected === "function") {
                this.onRejected.push(() => {
                    setTimeout(() => {
                        onRejected(this.reason);
                    }, 0);
                })
            }
        }
    }
}

const testAsyn = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("执行成功")
    }, 1000);
}).then(res => {
    console.log(res);
})