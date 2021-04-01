/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-03 16:14:31
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-29 17:04:36
 * @Description: 深拷贝相关
 */
let sym = Symbol("state");
let test = {
    myObj: {
        firstName: "Jia",
        familyName: "Zhu",
    },
    friend: ["A", "B"],
    age: 20,
    [sym]: "success"
}
console.log(test);

// let a = {}
// a.name = a;

// 1.
// 缺点：无法实现对函数、RegExp等特殊对象的克隆；
// 会抛弃对象的constructor，所有构造函数会指向Object；
// 对象有循环引用会报错
let stCopy1 = JSON.parse(JSON.stringify(test));
test.friend[0] = "C";
console.log(stCopy1);
// let aCopy = JSON.parse(JSON.stringify(a));
// console.log(aCopy);
// Converting circular structure to JSONConverting circular structure to JSON


// let arr = [1, 2, 3];
// console.log(typeof arr);//object
// console.log(arr instanceof Array); // true

// 2.递归实现深拷贝
function deepCopy(val) {
    if (typeof val !== "object") return val;
    let copy = val instanceof Array ? [] : {};
    for (let key in val) {
        // 无法检测到symbol
        if (val.hasOwnProperty(key)) {
            // if (Reflect.ownKeys(val)) {
            // Reflect.ownKeys(val)=
            // Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
            // 如果该属性亦为object，则需递归对该属性进行深拷贝
            copy[key] = typeof val[key] === "object" ? deepCopy(val[key]) : val[key];
        }
    }
    return copy;
}
let stCopy2 = deepCopy(test);
console.log(stCopy2);

let st = new Set()
st.add(1);
// console.log(typeof st);
let copy = JSON.parse(JSON.stringify(st));
let copy1 = Object.assign({}, st);
console.log(copy);
console.log(copy1);