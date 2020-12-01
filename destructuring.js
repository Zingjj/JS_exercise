/**
 * 解构赋值
 */
let [a, b, c] = [0, 1, 2];
console.log(a, b, c);
let [a, ...b] = [10, [0, 1, 2]];
console.log(b);//[[0,1,2]]
console.log(...b);//[0,1,2]
let [a, ...b] = [10, 1, 2, 3, 4];
console.log(b);//[1,2,3,4]
// 解构不成功变量值为undefined
let [foo] = [];
console.log(foo);//undefined
// 不完全解构，解构仍旧成功
let [x, y] = [10, 2, 3];
// 只要是有Interator接口的数据结构都可用来解构赋值
// 解构赋值会依次从这个接口获取值
// 例如下面的Generator生成器
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
console.log(sixth); // 5
/**
 * 变量的默认值
 */
// 只有某成员严格等于（===)undefined才会接受默认值
let [foo = true] = [];
console.log(foo);
// 默认值为表达式时，惰性求值
function f() {
    console.log("赋值");
}
let [a = f()] = ["1"];// 不会输出“赋值”因为a能取到值
// 默认值可以引用其他已经声明的变量
let [x = 1, y = x] = [];
console.log(x, y);// 1 1
/**
 * 对象的默认值
 * 变量必须与属性同名，才能取到正确的值
 * 解构失败，变量的值等于undefined
 */
let { one, two } = { one: "my name is one", two: "my name is two" };
console.log(one);
let { one, two } = { one: "my name is one" }
console.log(two);// undefined

// 方便的使用内置对象的方法
// 注意变量必须与属性同名，才能取到正确的方法
let { log2, sin, cos } = Math;
console.log(log2(8));// 相当于调用Math.log2()
console.log(sin(45));
const { log } = console;
log("Hello");

let { foo: baz } = { foo: "aaa", bar: "bbb" };
console.log(baz);

// 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。
// 真正被赋值的是后者，而不是前者
let obj = {
    first: "hello",
    second: "world",
}
// first是匹配的模式，l才是变量
let { first: l, second: r } = obj;
console.log(l);
console.log(r);
// 因为first是模式不是变量，因此不会被赋值
// 如果first也要作为变量赋值，可以：
let obj = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};
let { p, p: [x, { y }] } = obj;
console.log(p, x, y);
/**
 * 对象解构赋值
 */
let obj = {
    location: {
        start: {
            line: 1,
            column: 5,
        }
    }
}
// 第一个参数中没有模式，location本身也是变量
// 第二个参数中location是模式，start是变量
// 第三个参数中location和start都是模式，line是变量
let { location, location: { start }, location: { start: { line } } } = obj;
// 1 { line: 1, column: 5 } { start: { line: 1, column: 5 } }
console.log(line, start, location);

/**
 * 嵌套赋值
 */
let obj = {}, arr = [];
// 为什么这里要()?????????
({ foo: obj.prop, bar: arr[0] } = { foo: "1234", bar: true });
console.log(obj, arr);// { prop: '1234' } [ true ]

let obj1 = {};
let obj2 = {
    prop: "120"
}
Object.setPrototypeOf(obj1, obj2);
const { prop } = obj1;
console.log(prop); // 120

let x;
// JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误
// ()可以用来避免JS引擎将{}解释为一个代码块
({ x } = { x: 1 });
// 数组是特殊的对象，可以用来进行解构赋值
let arr = ["111", "222", "333"];
// []表达式可用来当作属性名
let { 0: first, [arr.length - 1]: last } = arr;
console.log(first, last);

// 函数参数得解构传值
function add([x, y]) {
    return x + y;
}
// 传入参数的一刻数组参数被解析成x和y
add([1, 3]);

// Array.map()不改变原数组
let arr = [1, 2, 3, 4].map(item => {
    return ++item;
})
console.log(arr);

let arr = [[1, 3], [2, 4]].map(([x, y]) => x + y);
console.log(arr);

