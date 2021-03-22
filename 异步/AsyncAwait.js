/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-08 09:45:00
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-09 15:03:24
 * @Description: Async/await
 */
// Generator实现
let res = [];
function* flatten(nums) {
    const { length } = nums;
    for (let i = 0; i < length; ++i) {
        if (typeof nums[i] === "number") {
            res.push(nums[i]);
        } else {
            yield* flatten(nums[i]);
        }
    }
}



// async function Hello() {
//     await "hello";
//     await "world";
// }


// T10
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    console.log("async2");
}
console.log("script start");
setTimeout(function () {
    console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log("script end");