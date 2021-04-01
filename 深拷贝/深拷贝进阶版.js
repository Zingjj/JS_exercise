/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-30 16:52:26
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-31 14:25:48
 * @Description: 最终版的深拷贝
 */

// 抽离出一部分常用数据类型以便后续使用
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const dateTag = '[object Date]';
const regexpTag = '[object RegExp]';

const boolTag = '[object Boolean]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

const deepTag = [mapTag, setTag, arrayTag, objectTag];

function getType(target) {
    return Object.prototype.toString.call(target);
}
/**
 * 1.处理原始类型 Number String Boolean Symbol Null Undefined BigInt Symbol
 * 2.处理不可遍历类型 Date(object) RegExp(object) Function
 * 3.处理循环引用情况 WeakMap
 * 4.处理可遍历类型 Set Map Array Object
 */
function deepClone(target, map = new WeakMap()) {
    // 1.基本类型直接返回
    if (target === null) return target;
    if (typeof target !== "object"
        || typeof target !== "function") {
        return target;
    }
    // 初始化
    const type = getType(target);
    // 使用原类型的构造函数创建新对象
    let cloneTarget;
    if (deepTag.includes(type)) {
        copyTarget = new target.constructor();
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(val => {
            cloneTarget.add(deepClone(val, map));
        })
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((val, key) => {
            cloneTarget.set(key, deepClone(val, map));
        })
        return cloneTarget;
    }

    // 克隆对象和数组
    // 将对象的所有属性找出来
    if (type === arrayTag || type === objectTag) {
        for (const key in target) {
            cloneTarget[key] = deepClone(target[key], map);
        }
        return cloneTarget;
    }

    // 克隆Symbol
    if (type === symbolTag) {
        cloneTarget = Object(Symbol.prototype.valueOf.call(target));
        return cloneTarget;
    }

    // 克隆正则

}
let sym = String(123);
console.log(typeof sym);
let date = new Date();
console.log(Object.prototype.toString.call(date));

let funcTest = () => { console.log("test"); }
console.log(funcTest.prototype);// undefined
let funcTest2 = function () { console.log("test"); }
console.log(funcTest2.prototype);// funcTest2 {}