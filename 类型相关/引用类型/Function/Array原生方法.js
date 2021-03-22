/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-15 11:50:19
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-15 17:15:03
 * @Description: 实现Array.map()和Array.reduce()
 */
/**
 * Array.map()重写 
 * Array.map((item, index, array) => { }, this);
 * @param {function} fn 
 * @param {*} context 
 * @returns 
 */
Array.prototype.myMap = function myMap(fn, context) {
    if (typeof fn !== "function") {
        throw new TypeError(`${fn} is not a function`);
    }
    // 严格模式下，context为null或undfined时，Object(context)会返回空对象
    // 而不会被赋值为global
    context = Object(context) || global;
    // 此处this指向是调用myMap的对象
    // 一般就是数组
    let array = this, res = [];
    for (let i = 0; i < array.length; ++i) {
        // 迭代执行
        let result = fn.call(context, array[i], i, array);
        res.push(result);
    }
    return res;
}

let arr = new Array(2);
arr[0] = 1;
arr[1] = 2;
arr.myMap((item) => console.log(item))


/**
 * Array.reduce()重写
 * Array.reduce((prev,cur,index,arr)=>{},base)
 * @param {function} fn 
 * @param {*} base 
 * @returns 
 */
Array.prototype.myReduce = function myReduce(fn, base) {
    if (typeof fn !== "function") {
        throw new TypeError(`${fn} is not a function`);
    }
    // 获取原始数组
    let initArr = this;
    // 获取原始数组的副本
    let arr = initArr.concat(),// 或 arr=Object.assign([],initArr)
        index = 0, newVal = 0;
    if (base) arr.unshift(base);
    while (arr.length > 1) {
        index = initArr.length - arr.length + 1;
        newVal = fn.call(null, arr[0], arr[1], index, initArr);
        arr.splice(0, 2, newVal);
    }
    return newVal;
}

let arr = [1, 2, 3, 4, 5];
let sum = arr.myReduce((prev, cur, index, arr) => {
    console.log(prev, cur, index, arr);
    return prev * cur;
}, 100)
console.log(sum);

/**
 * Array.fill(val,s,e)重写
 * @param {*} val 必须
 * @param {number} start 可选
 * @param {number} end 可选，默认为arr.length 与string.substring()行为一致，不包含end界
 * @returns 
 */
Array.prototype.myFill = function (val, start, end) {
    let arr = this;
    end = end ? Math.min(end, arr.length) : arr.length;
    start = start ? Math.max(start, 0) : 0;
    for (let i = start; i < end; ++i) {
        arr[i] = val;
    }
    return arr;
}
// 测试
let arr = new Array(5).fill(2, 1, 3);
let arr2 = new Array(5).myFill(2, 1, 3);
console.log(arr, arr2);

/**
 * 
 * @param {function} fn 
 * @param {*} context 
 * @returns 
 */
Array.prototype.myFilter = function (fn, context) {
    if (typeof fn !== "function") {
        throw new TypeError(`${fn} is not a function`);
    }
    let arr = this, res = [];
    for (let i = 0; i < arr.length; ++i) {
        let result = fn.call(context, arr[i], i, arr);
        if (result) res.push(arr[i]);
    }
    return res;
}
// 测试
let arr = [1, 2, 3, 4, 5, 6];
console.log(arr.myFilter((item) => item > 4));

/**
 * 
 * @param {function} fn 
 * @param {*} context 
 * @returns 
 */
Array.prototype.myFind = function (fn, context) {
    if (typeof fn !== "function") {
        throw new TypeError(`${fn} is not a function`);
    }
    let arr = this;
    for (let i = 0; i < arr.length; ++i) {
        let result = fn.call(context, arr[i], i, arr);
        if (result) return arr[i];
    }
    return undefined;
}
// 测试
let arr = [1, 2, 3, 4], obj = [4, 5, 6, 7];
console.log(arr.find((item) => item > 2));
console.log(arr.myFind((item) => item > 2));

Array.prototype.myFindIndex = function (fn, context) {
    if (typeof fn !== "function") {
        throw new TypeError(`${fn} is not a function`);
    }
    let arr = this;
    for (let i = 0; i < arr.length; ++i) {
        let result = fn.call(context, arr[i], i, arr);
        if (result) return i;
    }
    return -1;
}
// 测试
let arr = [1, 2, 3, 4];
console.log(arr.findIndex((item) => item > 9));
console.log(arr.myFindIndex((item) => item > 2));