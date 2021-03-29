//  原型链实现继承
//  很少使用
function SuperType() {
    this.property = false;
    this.things = ['car', 'bicycle', 'dog'];//测试原型链的问题
}
SuperType.prototype.getSuperValue = function () {
    return this.property;
}
function SubType() {
    this.subProperty = true;
}
//  实现继承
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
    return this.subProperty;
}
var instance = new SubType();
console.log(instance.getSuperValue());//false 说明获得了从父类那里继承的方法
console.log(instance.getSubValue());//true

//测试原型链实现继承的问题
//引用类型的原型属性被所有实例共享
//instance1与instance2共享things数组
var instance1 = new SubType();
instance1.things.push('sky');
console.log(instance1.things);

var instance2 = new SubType();
console.log(instance2.things);

/**
 * 借用构造函数（伪造对象/经典继承）
 */
function SuperType(name) {
    this.name = name;//SuperType实例上的参数
    this.color = ["red", "green", "yellow"];
}
function SubType(age) {
    SuperType.call(this, "Tom");
    this.age = age;//在子类上定义的属性和方法应该在调用超类型构造函数后
    //在构造函数中定义方法是借用构造函数的一大弊端
    this.sayAge = function () {
        console.log(this.age);
    }
}
var instance1 = new SubType(10);
instance1.color.push("black");
instance1.sayAge();
console.log(instance1.color);
// console.log(instance1.age);
var instance2 = new SubType(20);
instance2.sayAge();
console.log(instance2.color);
// 问题
// 方法在构造函数中定义，无法复用（不同实例上的同名函数都不是一个）
// ↓ 解决办法
/**
 * 组合继承
 */
function SuperType(name) {
    this.name = name;
    this.color = ["red", "green", "yellow"];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
}
function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
//不同于借用构造函数的继承，方法定义在构造函数中会导致同名函数不共享，导致不同作用域和标识符解析问题
//这种继承中定义的方法是挂载在原型上，同名函数为同一个函数
SubType.prototype.sayAge = function () {
    console.log(this.age);
}

var instance1 = new SubType("Tom", 10);
instance1.color.push("black");
console.log(instance1.color);
instance1.sayAge();
instance1.sayName();

var instance2 = new SubType("Mary", 12);
console.log(instance2.color);
instance2.sayName();
instance2.sayAge();

/**
 * 原型式继承
 */
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
var person = {
    name: "Tom",
    friends: ["marry", "lili"]
}
var anotherPerson = object(person);
anotherPerson.name = "Jack";
anotherPerson.friends.push("bob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "linda";
yetAnotherPerson.friends.push("barbie");

console.log(person.friends);//[ 'marry', 'lili', 'bob', 'barbie' ]引用类型被所有实例共享
//ES6通过Object.create()来规范原型式继承
var person = {
    name: "Tom",
    friends: ["marry", "lili"]
}
var anotherPerson = Object.create(person);
anotherPerson.name = "Jack";
anotherPerson.friends.push("Bob");
console.log(person.friends);//[ 'marry', 'lili', 'Bob' ]当Object.create只有第一个参数时行为与之前定义的object()一样

var yetAnotherPerson = Object.create(person, {
    name: {
        value: "Grey"
    },
    friends: {
        value: ["marry", "lili", "Zoe"]
    }
})
// console.log(person.friends);
console.log(yetAnotherPerson.friends);//[ 'marry', 'lili', 'Zoe' ]不与person共享


/**
 * 寄生式继承
 */
// 与原型式继承类似
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
/**
 * 寄生式继承
 * @param original  作为新对象基础的对象
 */
function createAnother(original) {
    var clone = object(original);
    // 方法定义在构造函数中，无法实现方法复用
    // 同名函数是不同函数
    clone.sayHi = function () {
        console.log("hi!");
    }
    return clone;
}
var person = {
    name: "Tom",
    friends: ["Lily", "Mary", "Dency"],
}
var anotherPerson = createAnother(person);
anotherPerson.sayHi();//hi!

/**
 * 回顾组合式继承
 */

function SuperType(name) {
    this.name = name;
    this.color = ["red", "green"];
    console.log("我被调用了！");
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
}
function SubType(name, age) {
    // 第二次调用SuperType构造函数
    SuperType.call(this, name);

    // 是SubType自己本身的属性
    this.age = age;
}
/**-----------以下可以用inheritPrototype()替换掉----------- */
// 第一次调用SuperType构造函数
SubType.prototype = new SuperType();
// 弥补因重写原型而失去的默认的constructor属性
SubType.prototype.constructor = SubType;
/**------------------------------------------------------ */
SubType.prototype.sayAge = function () {
    console.log(this.age);
}
// 创建该对象时，SubType的构造函数被调用两次
var subType = new SubType("Lily", 10);

/**
 * 寄生组合式继承
 */
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
function inheritPrototype(subType, superType) {
    // 创建超类型原型的一个副本
    var prototype = object(superType.prototype);
    prototype.constructor = subType;
    // 将新创建的副本赋值给子类型
    subType.prototype = prototype;
}

function SuperType(name) {
    this.name = name;
    this.color = ["red", "green"];
    console.log("我被调用了！");
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
}
function SubType(name, age) {
    // 第二次调用SuperType构造函数
    SuperType.call(this, name);

    // 是SubType自己本身的属性
    this.age = age;
}
/**----------使用inheritPrototype()避免多次调用超类型构造函数---------- */
/**-----------------------原型链也保持不变---------------------------- */
inheritPrototype(SubType, SuperType);
/**----------------------------------------------------------------- */
SubType.prototype.sayAge = function () {
    console.log(this.age);
}
var subType = new SubType("Lily", 10);
subType.sayAge();

/**
 * ES6中的class关键字
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        console.log("x:", this.x, "  y:", this.y);
    }
}
var p1 = new Point(2, 3);
p1.toString();
p1.__proto__.calculateSquare = function () {
    console.log(this.x * this.y);
}
p1.calculateSquare();// 6
var p2 = new Point(3, 4);
// 因为p1.__proto__ === p2.__proto__
// 所以p2也可以调用在实例p1的原型上添加的方法
p2.calculateSquare();// 12


/**
 * setter和getter
 */
class MyClass {
    constructor() {
    }
    get prop() {
        return "getter";
    }
    set prop(value) {
        console.log("setter: " + value);
    }
}
let inst = new MyClass();
inst.prop = "123";
console.log(inst.prop)

var descriptor = Object.getOwnPropertyDescriptor(MyClass.prototype, "prop");
console.log("get" in descriptor);

/**
 * 尝试 
 */

class ArgsClass {
    constructor(...args) {
        this.args = args;
    }
    // Generate方法
    *[Symbol.iterator]() {
        for (let arg of this.args) {
            yield arg;
        }
    }
}
// 继承了Function的特性
console.log(ArgsClass.name);
// Generate方法
for (let x of new ArgsClass("aaa", "bbb", "ccc")) {
    console.log(x);
}

/**
 * this指向
 */
class Logger {
    constructor() {

        // 解决方案(1)构造函数中绑定this
        // this.printName = this.printName.bind(this);
        // 解决方案(2)使用箭头函数
        this.getThis = () => this;
    }
    printName(name = "there") {
        // 这里的this实际指向的是调用该方法的实例,而不是该类
        // 将这个方法单独提取出来使用,this会指向方法运行时所在的环境
        // 而在class内部是严格模式,所以this指向undefined
        this.print(`Hello ${name}`);
    }
    print(text) {
        console.log(text);
    }
}
const logger = new Logger();
console.log(logger.getThis() === logger);//true
// 将printName()单独提取出来使用
const { printName } = logger;
printName();