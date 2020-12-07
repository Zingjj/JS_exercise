/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2020-11-30 14:35:17
 * @Last Modified by: zing
 * @Last Modified time: 2020-12-07 22:07:01
 * @Description: CH7 code
 */

/**
 * 函数声明
 */
var objStr = "123";
function objStr() {
    return "456";
}
console.log(objStr);//123
console.log(objStr());//TypeError: objStr is not a function

/**
 * 函数表达式
 */
var objStr = "123";
objStr = function () {
    return "456";
}
console.log(objStr);//[Function: objStr]
console.log(objStr());//456
/**
 * 闭包
 * 闭包只能取得包含函数中任何变量的最后一个值
 * 因为每个函数作用域链中都保存着包含函数的活动对象，引用的都是同一个变量i
 */
function createFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; ++i) {
        result[i] = function (i) {
            return i;
        }
    }
    return result;
}
var test = createFunctions();
console.log(test)// [[Function (anonymous)]*10]

// 可以创建另一个匿名函数强制让闭包行为符合预期
function createFunctions() {
    var result = new Array();
    for (var i = 0; i < 10; ++i) {
        result[i] = function (num) {
            return function () {
                return num;
            };
        }(i);
    }
    return result;
}
var test = createFunctions();
test.forEach(item => {
    console.log(item);
})

/**
 * 模仿块级作用域
 */
function outputNumbers(count) {
    for (var i = 0; i < count; ++i) {
        console.log(i);
    }
    console.log(i);
}
outputNumbers(4);//0 1 2 3 4
// 使用私有作用域
function outputNumbers(count) {
    (function () {
        // 这里面是块级作用域
        for (var i = 0; i < count; ++i) {
            console.log(i);
        }
    })();
    console.log(i);// i is not defined
}
outputNumbers(4);

/**
 * 私有变量
 */
function MyObject() {
    var privateVariable = 10;// 除非使用特权方法否则访问不到
    // this.privateVariable = 10;// 可以被访问到
    function privateFunction() {
        return false;
    }
    // 特权方法
    this.publicMethod = function () {
        console.log(privateVariable);
        return privateFunction();
    }
}
var myObject = new MyObject();
console.log(myObject.publicMethod());