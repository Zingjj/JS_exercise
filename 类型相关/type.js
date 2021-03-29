/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-15 11:01:43
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-25 10:34:15
 * @Description: 类型检测工具 typeof与instanceof
 */

/**
 * typeof可用于检测：number/string/boolean/null/undefined/function/object
 * 但是对于object类型，不能检测到具体是什么类型的对象，
 * 就需要借助instanceof来检测某个对象是不是另一个对象的实例
 */
let arr = [12, 10];
var fn = function () {
    console.log("123");
}
let sym = Symbol("abc");
let flag = true;
let no = null, un = undefined;
console.log(arr instanceof Array);// true
console.log(arr instanceof Object);// true
console.log(typeof arr);// object
console.log(typeof fn);// function
console.log(typeof sym);// symbol
console.log(typeof flag);// boolean
console.log(typeof no);// object
console.log(typeof un);// undefined

// 以下全部输出[Boolean: false]
let test1 = new Boolean()
console.log(test1);
let test2 = new Boolean(0);
console.log(test2);
let test3 = new Boolean(null);
console.log(test3);
let test4 = new Boolean("");
console.log(test4);
let test5 = new Boolean(undefined);
console.log(test5);

console.log(NaN === NaN); // F
console.log(NaN == NaN); // F
console.log(Object.is(NaN, NaN)); // T
console.log(Object.prototype.toString.call(null));