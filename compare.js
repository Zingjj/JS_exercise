function createCompareFunction(propertyName) {
    return function (obj1, obj2) {
        var value1 = obj1[propertyName];
        var value2 = obj2[propertyName];
        if (value1 < value2) return -1;
        else if (value1 > value2) return 1;
        else return 0;
    };
}
var obj1 = {
    name: "Tom",
    age: 20
}
var obj2 = {
    name: "Marry",
    age: 19
}
var arr = [obj1, obj2];
arr.sort(createCompareFunction("name"));
console.log(arr); 