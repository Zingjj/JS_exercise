function funcA() {
    var a = 10;
    return function () {
        console.log(a);
    }
}
var b = funcA();
b();// 10

function outerFn() {
    var i = 0;
    function innerFn() {
        i++;
        console.log(i);
    }
    return innerFn;
}