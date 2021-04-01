// T1
var func1 = x => x;
var func2 = x => { x };
var func3 = x => ({ x });
console.log(func1(1)); // 1
console.log(func2(1)); // undefined
console.log(func3(1)); // { x:1 }
// T2
function Per() { }
Per.prototype = {
    num1: 1000,
    money: {
        num2: 1000
    },
    buy: function () {
        console.log(this.num1, this.money.num2)
    }
}
var p1 = new Per();
var p2 = new Per();
p2.num1 = 0;
p2.money.num2 = 0;
p1.buy(); // 1000 0

console.log(0.2 + 0.1);
console.log(55.1 + 55.2);


// T1
console.log(123["toString"].length);
console.log(123["toString"]().length);
// T2
console.log(null + 123);
console.log(undefined + 123);
console.log("null" + 123);
console.log("null" + "123");
console.log(true + 123);
console.log(false + 123);
// T3
// 0 1 2 3
Promise.resolve().then(() => {
    console.log("0");
    Promise.resolve().then(() => {
        console.log("1");
    })
}).then(() => {
    console.log("2");
})
setTimeout(() => {
    console.log("3");
}, 0)