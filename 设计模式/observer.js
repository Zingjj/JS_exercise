let targetObj = {
    age: 1,
    addr: "1"
}
function observer(oldVal, newVal) {
    console.log("addr属性的值从" + oldVal + "变为：", newVal);
}

for (let key in targetObj) {
    Object.defineProperty(targetObj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log("取值", targetObj[key]);
        },
        set: function (val) {
            console.log("设置新值", val, " 旧值是", targetObj[key]);
            targetObj[key] = val;
        }
    });
}
targetObj.addr = "11";
targetObj.addr = "25";
console.log(targetObj.addr);

// ES6实现
function observer(oldVal, newVal) {
    console.log("addr属性的值从" + oldVal + "变为：", newVal);
}
class TargetObj {
    constructor(age, name) {
        this.name = name;
        this.age = age;
    }
    get name() {
        console.log("get");
    }
    set name(val) {
        observer(name, val);
    }
}
let tar = new TargetObj(1, "mmm");
tar.name = "www";
