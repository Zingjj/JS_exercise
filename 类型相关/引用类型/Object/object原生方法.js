function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
function Father(name) {
    this.type = "parent";
    this.name = name;
}
// 每个函数都有prototype属性，该属性是一个指针，指向一个对象
// 指向的对象就是通过构造函数创建的对象实例的原型对象
// 该属性指向其构造函数的原型？
console.log(Father.prototype);
let father = new Father("tom");
let child = object(father);
Father.prototype.sayName = function () {
    console.log(this.name);
}
child.sayName();
console.log(child instanceof Father);// true

/**
 * 实现一个instanceof
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
// 递归地去原型链上查找
function _instanceof(a, b) {
    if (a.__proto__ === b.prototype) return true;
    // a.__proto__===null 说明a===Object.prototype
    // 已经找到了原型链的最顶端
    if (a.__proto__ === null) return false;
    return _instanceof(a.__proto__, b);
}
console.log(_instanceof(child, Father));// true