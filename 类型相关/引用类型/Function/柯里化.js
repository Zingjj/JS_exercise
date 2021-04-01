// 红宝书柯里化
function curry(fn) {
    // arguments 是一个类数组的结构，它并不是一个真的数组，
    // 所以没法使用数组的方法。用了 call 的方法
    let args = Array.prototype.slice.call(arguments, 1);
    console.log(args);
    return function () {
        // 事实上是个浅拷贝
        let innerArgs = Array.prototype.slice.call(arguments);
        let finalArgs = args.concat(innerArgs);
        console.log(innerArgs, finalArgs);
        return fn.apply(null, finalArgs);
    }
}
function add(num1, num2, num3) {
    return num1 + num2 + num3;
}
// 这个柯里化的调用方法：
let curriedAdd = curry(add, 5);
console.log(curriedAdd(3, 2));
// 真正的 能实现add(1)(2)(3)的柯里化
// args.length 获取的是调用时传入的参数个数
// fn.length 获取的是定义fn时的形参个数
const curry = (fn) => (
    _curry = (...args) =>
        args.length >= fn.length
            ? fn(...args)
            : (...newArgs) => _curry(...args, ...newArgs)
)

let curriedAdd = curry(add);
console.log(curriedAdd(1)(2, 3));

let arr = [1, 2, 3, 4]
console.log(Array.prototype.slice.call(arr, 1));
console.log(Array.prototype.slice.call(arr));



function add(num1) {
    return function (num2) {
        return function (num3) {
            return num1 + num2 + num3;
        }
    }
}
console.log(add(1)(2)(3));

function add(num) {
    return function (num1, num2) {
        return num + num1 + num2;
    }
}
console.log(add(1)(2, 3));

function add(num1, num2) {
    return function (num3) {
        return num1 + num2 + num3;
    }
}
console.log(add(1, 2)(3));

function curry(fn) {
    let length = fn.length, args = [];
    return function _f(...newArgs) {
        args = args.concat(newArgs);
        // 判断当前参数集合args长度是否<目标函数fn的要求
        if (args.length < length) {
            // 继续返回函数
            return _f;
        } else {
            // 参数够了，执行函数
            return fn.apply(this, args.slice());
        }
    }
}
function add(num1, num2, num3) {
    return num1 + num2 + num3;
}
let curriedAdd = curry(add);
console.log(curriedAdd(1, 2)(3));

// 每个function都包含两个属性：
// length：希望接收的参数个数
// prototype：其所有实例方法都存在于此
function test(num1, num2) {
    return num1 + num2;
}
console.log(test.length);
