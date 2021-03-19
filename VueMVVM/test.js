let obj1 = {};
obj1.name = "tom";
obj1.age = 16;

console.log(obj1);
// 等同于：
let obj2 = {};
// Object.defineProperty(obj, "name", {
//     value: "tom",
//     writable: true,
//     configurable: true,
//     enumerable: true,
// })
Object.defineProperties(obj2, {
    "name": {
        value: "tom",
        writable: true,
        configurable: true,
        enumerable: true,
    },
    "age": {
        value: 16,
        writable: true,
        configurable: true,
        enumerable: true
    }
})

function* iterObj(obj) {
    let keys = Object.keys(obj);
    for (let key of keys) {
        yield obj[key];
    }
}
console.log(obj2);
// 构建generator进行迭代
for (let val of iterObj(obj2)) {
    console.log(val);
}