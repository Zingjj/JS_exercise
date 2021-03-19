/**
 * ['1', '2', '3'].map(parseInt)的结果？
 * 答：[1,NaN,NaN]
 */

let test = [1, 2, 3, 4, 5, 6];
console.log(test.map(val => ++val));

console.log(['1', '2', '3'].map(parseInt));
console.log(parseInt("1", 0));