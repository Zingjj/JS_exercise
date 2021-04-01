class EventEmitter {
    // sub 私有属性
    // 其中存储的是
    constructor() {
        this.sub = {};
        // {event:[cbs]}
    }
    // 触发事件
    emit(event, ...args) {
        if (this.sub[event] && this.sub[event].length) {
            this.sub[event].forEach(cb => cb(...args))
        }
    }
    // 注册事件
    on(event, cb) {
        if (!(this.sub[event] instanceof Array)) {
            this.sub[event] = [];
        }
        this.sub[event].push(cb);
    }
    // 注销事件
    off(event, offCb) {
        if (offCb) {
            if (this.sub[event] && this.sub[event].length) {
                this.sub[event] = this.sub[event]
                    .filter(cb => cb !== offCb);
            }
        } else {
            // ???
            this.sub[event] = [];
        }
    }
}
// 测试一下
const ent = new EventEmitter();
const cb1 = function (name) {
    console.log(`hello ${name}`);
}
const cb2 = function (age) {
    console.log(`i am ${age}`);
}
ent.on("sayName", cb1);// 注册事件
ent.on("sayAge", cb2);
ent.emit("sayName", "lily");// 触发事件
ent.emit("sayAge", 19);// 触发事件
ent.off("sayName", cb1);// 注销事件
ent.off("sayAge", cb2);// 注销事件