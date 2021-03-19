/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-04 17:08:00
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-04 21:16:52
 * @Description: apply call bind
 */

const parent = {
    name: "parent",
    sayPerson(age, addr) {
        return {
            name: this.name,
            age,
            addr
        }
    }
}
console.log(parent.sayPerson(60, "jinan"));
const son = {
    name: "son"
}
// 对象son使用对象parent的sayPerson()
console.log(parent.sayPerson.call(son, 30, "jinan"));

let saySon = parent.sayPerson.bind(son, 30, "jinan");
// 使用bind进行绑定后的方法必须进行调用
// 否则输出：[Function: bound sayPerson]
console.log(parent.sayPerson.bind(son, 30, "jinan"));

// bind的实现（基于原生的apply()）
function myBind(fn, context) {
    return function () {
        // 这里的arguments是内部函数的，并非bind的，
        // 是绑定后进行调用的函数的参数数组
        return fn.apply(context, arguments);
    }
}
let newSaySon = myBind(parent.sayPerson, son);
console.log(newSaySon(30, "jinan"));

// call的实现
Object.prototype.callFn = function (...args) {
    let context = args[0];//首元素为目标对象
    if (context === null || context === undefined) {
        context = window;
    }
    if (typeof context !== "object") {
        context = {};
    }
    args.shift();
    // 为对象复制需要调用的方法，指向的就是调用callFn的对象
    context.fn = this;
    // 调用该方法
    console.log(...args);
    const result = context.fn(...args);
    delete context.fn;
    return result;
}
console.log(parent.sayPerson.callFn(son, 30, "jinan"));

// apply的实现，与call不同之处在于调用时传参方式
Object.prototype.applyFn = function (...args) {
    let context = args[0];//首元素为目标对象
    if (context === null || context === undefined) {
        context = window;
    }
    if (typeof context !== "object") {
        context = {};
    }
    args.shift();
    // 为对象复制需要调用的方法，指向的就是调用callFn的对象
    context.fn = this;
    // 调用该方法
    // 在执行完args.shift()后，此时args[0]是传入的参数数组
    console.log(...args[0]);//[x,y,...]
    const result = context.fn(...args[0]);
    delete context.fn;
    return result;
}
let args = [30, "beijing"];
console.log(parent.sayPerson.applyFn(son, args));

// 基于applyFn实现的bindFn()
Object.prototype.bindFn = function (...args) {
    return () => {
        return this.applyFn(args[0], (args || []).slice(1));
    }
}
let myBindFn = parent.sayPerson.bind(son, 33, "beijing");
console.log(myBindFn());