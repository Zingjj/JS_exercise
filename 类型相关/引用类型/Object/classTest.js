// var color = "red";
function sayColor() {
    let color = "green"
    console.log(color);
}
// sayColor();
var values = [1, 2, 3, 4, 5, 6];
// console.log(Math.max(values));//NaN
// console.log(Math.max.apply(Math, values));//6
var obj = new Object();
obj.name = "tom";
obj.age = 12;
// console.log(obj.name);
obj.sayHi = function () {
    // this作用域为类内部
    console.log(this.name);
}
// obj.sayHi();

var obj_bad = "";
obj_bad.name = "tom";
obj_bad.age = 12;
// console.log(obj_bad.name);//undefined 
// 因为没有显式的创建对象，js会隐式创建一个Object示例，但代码执行过就立即销毁，
// 所以在后续引用和赋值时会出错

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log("My name is：", this.name);
    }
}
function test1() {
    var person1 = new Person("Tom", 19, "software engineer");
    var person2 = new Person("Marry", 20, "student");
    console.log(person1.sayName == person2.sayName);//false
}
// 测试构造函数模式
// test1();

/**
 * 原型模式prototype
 */
// 空构造函数
function Car() {

}
// 将属性和方法添加到原型对象中
Car.prototype.name = "Smart";
Car.prototype.price = 10000;
Car.prototype.color = "red";
Car.prototype.drive = function () {
    console.log(this.color, this.name, "dididi");
}
var car1 = new Car();
car1.drive();


/**
 * 上面那种方法的ES6版本
 */
class myCar {
    constructor() {
    }
    drive() {
        console.log(this.color, this.name, "dididi");
    }
}
    // 将属性和方法添加到原型对象中
    myCar.prototype.name = "Smart";
    myCar.prototype.price = 10000;
    myCar.prototype.color = "red";
var car2 = new myCar();
car2.drive();


//  ES6类的表示方法 扩展
//  使用[xxx]来实现将表达式或者变量名作为属性名
//  实现属性名可变化
const foo = "zing";
const barz = { [foo]: "abc" };
console.log(barz);

// ES5与ES6的继承比较
const bar = new Bar();//不会报错
function Bar() {
    Bar = 'Baz';
    this.name = "111";
    age = 12;// 不报错
}
const bar = new Bar();//Cannot access 'Bar' before initialization
const baz = new Baz();
console.log(Bar, bar);// Baz Bar { name: '111' }


class Bar {
    constructor() {
        this.name = "111";
        age = 12;//age is not defined
        Bar = 'Baz';// Assignment to constant variable.
    }
}
let bar = new Bar();


