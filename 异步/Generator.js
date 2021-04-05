function* helloWordGenerator() {
    yield "hello";
    yield "world";
    return "ending";
}
let hw = helloWordGenerator();
console.log(hw.next()); //{ value: 'hello', done: false }
// for (let next of hw) {
//     console.log(next);
// }

// 函数f在赋值给变量时就会执行，但f是一个generator函数
// 于是就变成只有在调用next()时才会执行
function* f() {
    console.log("执行！");
}
let generator = f(), lastTime = Date.now();
console.log(lastTime);
setTimeout(() => {
    console.log("现在时间是：", Date.now());
    generator.next();
}, 2000);

// 利用generator实现数组flatten
// 妙！！！！
let arr = [1, [2, 3, [4, 5]], [2]]
function* flatten(a) {
    const { length } = a;
    for (let i = 0; i < length; ++i) {
        if (typeof a[i] !== "number") {
            yield* flatten(a[i]);
        } else {
            yield a[i];
        }
    }
}
// for (let item of flatten(arr)) {
//     console.log(item);
// }

// 迭代实现
let res = [];
function flatten(a) {
    const { length } = a;
    for (let i = 0; i < length; ++i) {
        if (typeof a[i] !== "number") {
            flatten(a[i]);
        } else {
            // console.log(a[i]);
            res.push(a[i]);
        }
    }
}
flatten(arr);
console.log(res);

Array.prototype.myFlatten = function () {
    return this.reduce((a, b) =>
        a.concat(Array.isArray(b) ? b.myFlatten() : b), []);
}
let arr = [1, 2, 3, [4, 2, [3, 4]]]
console.log(arr.myFlatten());
/**
 * 实现AJAX
 */
function* main() {
    let result = yield request("someURL");
    let res = JSON.parse(result);
}
// 定义Generator
let it = main();
// 异步的回调函数放在it.next中进行
function request(url) {
    // ????
    makeAjaxCall(url, (response) => {
        it.next(response);
    })
}

// 使用generator可以在任意对象上部署Iterator接口
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; ++i) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}
let obj = {
    name: "tom",
    age: 16,
    addr: "abcbs"
}
// for (let [key, value] of iterEntries(obj)) {
//     console.log(key, value);
// }

// 同for...of...
let gener = iterEntries(obj);
let res = gener.next();
while (!res.done) {
    console.log(res.value);
    res = gener.next();
}