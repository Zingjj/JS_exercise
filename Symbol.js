/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2020-11-27 10:10:24
 * @Last Modified by: zing
 * @Last Modified time: 2020-11-27 10:42:35
 * @Description: Symbol练习
 */
let s = Symbol();
console.log(typeof s);//symbol

var s1 = Symbol("foo");
var s2 = Symbol("bar");
console.log(s1, s2);//Symbol(foo) Symbol(bar)

/**
 * Symbol内参数是一个对象时
 * 会调用该对象的toString()方法，将其转换为字符串
 * 然后才生成一个Symbol值
 */
const obj = {
    toString() {
        return "abc";
    }
}
const sym = Symbol(obj);
console.log(sym);// Symbol(abc)

var s1 = Symbol("s");
var s2 = Symbol("s");
console.log(s1 === s2);//false
// TypeError: Cannot convert a Symbol value to a string
// Symbol类型数据不可与其他类型数据做运算
console.log("this is a  " + s1);
/**
 * Symbol作为属性名
 */

// 第一种写法
var mySymbol = Symbol();
var a = {};
a[mySymbol] = "123";
console.log(a[mySymbol]);// 123

// 第二种写法
var mySymbol = Symbol();
var a = {
    [mySymbol]: "123",
}
console.log(a[mySymbol]);// 123

// 第三种写法
var mySymbol = Symbol();
var a = {
    name: "tommy",
    age: 19,
};
Object.defineProperty(a, mySymbol, {
    value: "123"
})
console.log(a[mySymbol]);// 123
console.log(Object.getOwnPropertySymbols(a));// [ Symbol() ]
console.log(Object.getOwnPropertyNames(a));// [ 'name', 'age' ]
for (var i in a) {
    console.log(i);// name age
}

/**
 * Symbol.key()&Symbol.keyFor()
 */
var oldS = Symbol("s");
var s1 = Symbol.for("s");
var s2 = Symbol.for("s");
console.log(s1 === s2);// true
console.log(Symbol.keyFor(s1));// s
console.log(Symbol.keyFor(oldS));// undefined