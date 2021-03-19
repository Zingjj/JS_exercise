// fn：构造函数（实际是普通函数）
// (1)创建（构造）一个全新的对象，空对象的_proto_属性指向构造函数的原型对象；
// (2)把上面创建的空对象赋值构造函数内部的this，用构造函数内部的方法修改空对象；
// (3)如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
function myNew(_constructor, ...args) {
    let obj = new Object();
    obj.__proto__ = _constructor.prototype;
    _constructor.apply(obj, args);
    return obj;
}

function Person(name) {
    this.name = name;
    // 不能返回一个引用类型 
    // return [1, 2, 3];
}
let obj = myNew(Person, "Tom");
let obj1 = new Person();
console.log(obj, obj1);


function myNew2(_constructor, ...args) {
    let obj = new Object();
    obj.__proto__ = _constructor.prototype;
    _constructor.apply(obj, args);
    return obj;
}