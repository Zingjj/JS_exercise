/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-02 16:46:06
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-02 16:51:14
 * @Description: 匿名函数
 */
// 自执行函数
// 1.使用!开头
!function () {
    console.log("hello world");
};
// 2.
(function () {
    console.log("hello world");
})();
// 3.
(function () {
    console.log("hello world");
}());
// 4.放在中括号中执行
[function () {
    console.log("hello world");
}()];
// 5.使用+运算符
+ function () {
    console.log("hello world");
}();
// 6.使用-运算符
-function () {
    console.log("hello world");
}();
// 7.使用~波浪符
~function () {
    console.log("hello world");
}();
// 8.使用void
void function () {
    console.log("hello world");
}()
