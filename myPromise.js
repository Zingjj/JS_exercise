/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2020-11-27 09:23:00
 * @Last Modified by: zing
 * @Last Modified time: 2020-11-27 11:11:42
 * @Description: 实现一个Promise
 */

/**
 * Promise三种状态：
 * Pending(进行中),Fulfilled(已成功),Rejected(已失败)
 * 使用Symbol定义，防止外界改变
 */
const Pending = Symbol("Pending");
const Fulfilled = Symbol("Fulfilled");
const Rejected = Symbol("Rejected");
class Promise {
    constructor(executor) {
        this.status = Pending;
        const resolve = () => {
            // 只有状态为Pending才改变，来保证一旦状态改变就不会再变
            if (this.status === Pending) {
                this.status = R
            }
        }
    }
}