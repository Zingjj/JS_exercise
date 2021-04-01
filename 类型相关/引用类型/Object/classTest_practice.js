/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-04-01 15:49:59
 * @Last Modified by: zing
 * @Last Modified time: 2021-04-01 16:11:35
 * @Description: ES5/ES6声明类的方式
 */

/**
 * 工厂模式
 * 用函数来封装以特定接口创建对象的细节
 */
function createPerson(name, age) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.saySomething = function () {
        console.log(this.name);
    }
    return o;
}
/**
 * 构造函数模式
 * 不能实现方法复用
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.saySomething = function () {
        console.log(this.name);
    }
}
/**
 * 原型模式
 * 原型上的所有属性被所有实例共享
 */
function Person() { }
Person.prototype.name = "123";
Person.prototype.age = 19;
Person.prototype.saySomething = function () {
    console.log(this.name);
}
/**
 * 构造函数模式+原型模式（混成模式）
 * 可能是ES5对于class关键字的实现
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.saySomething = function () {
    console.log(this.name);
}
/**
 * 动态原型模式
 */
function Person(name, age) {
    this.name = name;
    this.age = age;
    if (typeof this.saySomething !== "function") {
        Person.prototype.saySomething = function () {
            console.log(this.name);
        }
    }
}

/**
 * 寄生构造函数模式
 */
function Person(name, age) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.saySomething = function () {
        console.log(this.name);
    }
    return o;
}
let friend = new Person("tom", 19);
friend.saySomething();

/**
 * 稳妥构造函数模式
 */
function Person(name, age) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.saySomething = function () {
        console.log(this.name);
    }
    return o;
}
// 声明不用new关键字
let friend = Person("tom", 19);
friend.saySomething();