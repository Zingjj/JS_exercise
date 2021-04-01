// 实现继承的几种方式：
// 1.原型链继承
// 2.借用构造函数
// 3.组合继承
// 4.原型式继承
// 5.寄生式继承
// 6.寄生组合式继承
// 7.ES6 class关键字

// 原型链继承
// 缺点不能传参，所有子类实例会共享父类引用类型属性！！
function SuperType() {
    this.color = ["red", "blue"];
    this.name = "tom"
}
function SubType() {
    this.subProperty = "son"
}
SubType.prototype = new SuperType();
console.log(SubType.prototype.constructor); // SuperType
let subType1 = new SubType();
let subType2 = new SubType();
subType1.color.push("yellow");
console.log(subType2.color);// [ 'red', 'blue', 'yellow' ]
subType1.name = "lll";
console.log(subType2.name); // tom 只有引用类型数据是共享的

// 借用构造函数
// 解决了原型链继承中存在的两个问题
// 但是出现了新的问题：
// 方法定义在构造函数中无法复用，不同实例上的同名函数都不是一个
function SuperType(age) {
    this.age = age;
    this.color = ["red", "blue"];
}
function SubType(age) {
    SuperType.call(this, age);
    this.saySomething = function () {
        // 这里面也可以访问父类中的属性
        console.log(this.age);
    }
}
let subObj1 = new SubType(19);
let subObj2 = new SubType(20);
subObj1.color.push("yellow");
console.log(subObj2.color);
subObj1.saySomething();
subObj2.saySomething();

// 组合继承 原型链+借用构造函数
// 使用原型链实现对原型属性和方法的继承
// 使用借用构造函数实现实例属性的继承
// 优点：避免了原型链继承的问题（父类引用类型属性会被子类共享）
// 和借用构造函数继承的问题（实例的方法不能复用）
function SuperType(name) {
    this.name = name;
    this.color = ["red", "blue"];
}
SuperType.prototype.saySomething = function () {
    console.log(this.name);
}
function SubType(name, age) {
    // 借用构造函数
    SuperType.call(this, name);
    this.age = age;
}
SubType.prototype.sayAge = function () {
    console.log(this.age);
}
// 原型链实现继承
SubType.prototype = new SuperType();
console.log(SubType.prototype.constructor); // SuperType
SubType.prototype.constructor = SubType; // !!!!!

// 原型式继承
function object(o) {
    // 事实上，object方法对传入其中的对象进行了一次浅拷贝
    function F() { }
    F.prototype = o;
    return new F();
}
// ES5 Object.create()对原型式继承的优化，与object()行为一模一样
// 原对象的引用类型属性一样会被子类型所共享！！
let originObj = {
    name: "tom",
    likes: ["running", "swimming"],
}
// let obj1 = object(originObj);
// let obj2 = object(originObj);
// obj1.likes.push("hahah");
// console.log(obj2.likes); // [ 'running', 'swimming', 'hahah' ]
let obj3 = Object.create(originObj);
let obj4 = Object.create(originObj);
obj3.likes.push("haha");
console.log(obj4.likes); // [ 'running', 'swimming', 'haha' ]
// 寄生式继承
// 工厂模式的思路，创建一个仅用于封装继承过程的函数
// 有原型式继承的所有缺点，且无法做到方法复用
function inherit(original) {
    let clone = Object.create(original);
    clone.saySomething = function () {
        console.log(this.age);
    }
    return clone;
}
let originObj = {
    name: "tom",
    age: 19,
}, obj = inherit(originObj);
obj.saySomething();// 19

// 寄生组合式继承
// 只调用了一次SuperType构造函数
// 原型链保持不变，可以正常使用instanceof 和isPrototypeOf()
function SuperType(name) {
    this.name = name;
    this.color = ["red", "blue"];
}
SuperType.prototype.saySomething = function () {
    console.log(this.name);
}
function SubType(name, age) {
    // 借用构造函数
    SuperType.call(this, name);
    this.age = age;
}
// 本质：创建Subtype.prototype的副本
// 对这个副本的constructor进行操作
// 将副本赋值给SubType.prototype
let prototype = Object.create(SuperType.prototype);
prototype.constructor = SubType;
SubType.prototype = prototype;

// 注意！！！！！在原型上挂载函数，必须在修改SubType.prototype之后
SubType.prototype.sayAge = function () {
    console.log(this.age);
}

let subType = new SubType("tom", 19);
subType.saySomething();// tom
subType.sayAge();// 19

// ES6实现继承
class SuperType {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log(this.name);
    }
}
class SubType extends SuperType {
    constructor(name, age, sex) {
        super(name);// 调用父类constructor，必须在使用this之前调用！！！

        this.age = age;
        this.sex = sex;
    }
    saySomething() {
        super.sayHi();
        console.log(this.age);
    }
}
let subType = new SubType("tom", 19, 1);
// console.log(SubType.prototype.constructor);// SubType
subType.saySomething();

// 尝试一下Object.getPrototypeOf()
class A {
    constructor() {

    }
}
class B extends A {
    constructor() {
        super();
    }
}
class C extends B {
    constructor(age) {
        super();
        this.age = age;
    }
}
console.log(C.prototype);
console.log(Object.getPrototypeOf(B));
console.log(C instanceof B);

let obj = new C();
console.log(obj.constructor);
let newObj = new obj.constructor(19);
console.log(newObj.age);