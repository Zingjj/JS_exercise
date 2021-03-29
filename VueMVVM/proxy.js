/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-26 18:36:32
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-26 18:39:58
 * @Description: 使用proxy实现数据监控
 */
let obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}`);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}`);
        return Reflect.set(target, key, value, receiver);
    }
})
obj.count = 1;
++obj.count;