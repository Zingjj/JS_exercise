/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2020-11-27 10:10:24
 * @Last Modified by: zing
 * @Last Modified time: 2020-12-26 16:54:29
 * @Description: Symbol练习,Symbol的主要作用在于防止属性名冲突，类型为Symbol的属性名是独一无二的
 */

let s = Symbol();
console.log(typeof s);//symbol

/**
 * Symbol函数的参数只表示对当前Symbol值得描述，因此相同参数的Symbol函数的返回值不同
 */
var s1 = Symbol("foo");
var s2 = Symbol("bar");
var s3 = Symbol("bar");
console.log(s1, s2);//Symbol(foo) Symbol(bar)
console.log(s3 === s2);// false

/**
 * Symbol内参数是一个对象时
 * 会调用该对象的toString()方法，将其转换为字符串
 * 然后才生成一个Symbol值
 */
const obj = {
    // toString() {
    //     return "abc";
    // }
}
const sym = Symbol(obj);
console.log(sym);// Symbol(abc) 若obj对象内没有toString()方法，则为Symbol([object Object])

var s1 = Symbol("s");
var s2 = Symbol("s");
console.log(s1 === s2);//false
// TypeError: Cannot convert a Symbol value to a string
// Symbol类型数据不可与其他类型数据做运算
console.log("this is a  " + s1);
/**
 * Symbol作为属性名
 */

// 第一种写法(方括号结构)
var mySymbol = Symbol();
var a = {};
a[mySymbol] = "123";
console.log(a[mySymbol]);// 123

// 第二种写法**
// 在对象内部使用Symbol作为属性名时，Symbol值必须放在方括号中
// Symbol值作为对象属性名时不能使用点运算符(因为点运算符后总是字符串，而不是Symbol作为标识名所指代的值)
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
/**
 * 属性名的遍历
 */
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