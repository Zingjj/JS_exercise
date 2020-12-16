/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2020-11-30 14:35:17
 * @Last Modified by: zing
 * @Last Modified time: 2020-12-10 16:45:37
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
 * 为自定义类型创建私有变量和静态私有变量
 */
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

/**
 * 静态私有变量
 */
(function () {
    // 私有变量和私有函数
    var privateVariable = 10;
    function privateFunction() {
        return false;
    }
    MyObject = function () {

    };
    // 特权方法 
    MyObject.prototype.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    };
})();
var myObject = new MyObject();
console.log(myObject.publicMethod());// false

(function () {
    var name = "";
    Person = function (value) {
        name = value;
    }
    Person.prototype.getName = function () {
        return name;
    };
    Person.prototype.setName = function (value) {
        name = value;
    };
})();



/**
 * 模块模式：为单例创建私有变量和静态私有变量
 */
var singleton = function () {
    // 私有变量和私有函数
    var privateVariable = 10;
    var privateFunction = function () {
        return false
    }
    // 对象字面量定义特权方法，是单例的公共接口
    return {
        publicPorperty: true,
        publicMethod: function () {
            privateVariable++;
            return privateFunction();
        }
    };
}();

var application = function () {

    // 私有变量和函数
    var components = new Array();

    // 初始化
    components.push(new BaseComponent());

    // 公共
    return {
        // 初始化未经声明的变量会创建一个全局变量，但严格模式下会报错
        // 返回已注册的组件数 
        getComponent: function () {
            return components.length;
        },
        // 注册组件
        registerComponent: function (component) {
            if (typeof component == "object") {
                component.push(component);
            }
        }
    }
}

/**
 * 增强的模块模式
 * 需要对返回值进行增强操作，比如返回对象必须是某种类型的对象
 */
var application = function () {
    var privateVariable = 10;
    function privateFunction() {
        return false;
    }
    var obj = new CustomType();
    // 特权方法
    obj.publicProperty = true;
    obj.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    }
    return obj;
}

/**
 * 若application的返回值必须是BaseComponent的实例
 */
var application = function () {
    // 私有变量、函数
    var components = new Array();
    // 初始化
    components.push(new BaseComponent());
    // 创建application的一个局部副本
    var app = new BaseComponent();
    // 定义公共接口
    app.getComponent = function () {
        return components.length;
    }
    app.registerComponent = function (component) {
        if (typeof component == "object") {
            components.push(component);
        }
    }
    return app;
}
  