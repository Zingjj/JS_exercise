/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-15 11:01:43
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-15 11:07:48
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
console.log(typeof fn);// funnction
console.log(typeof sym);// symbol
console.log(typeof flag);// boolean
console.log(typeof no);// null
console.log(typeof un);// undefined