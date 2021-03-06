var splitIntoFibonacci = function (S) {
    let res = [];
    backTrack(S, res, 0);
    return res;
};
/**
 * 
 * @param {String} S 
 * @param {Array} res 表示结果数组
 * @param {Number} startIndex 待划分的第三个数字的开始下标
 */
function backTrack(S, res, startIndex) {
    // 边界条件,如果已经划分到结尾了,且结果集中存在三个及以上数字,表示已经找到了这种组合
    if (startIndex == S.length && res.length >= 3) {
        return true;
    }
    // 思路:在待划分的剩余字符串中划分出不同长度的数字num
    // 与res数组中的最后两个数字(分别记作num1和num2)
    // 判断num=?=num1+num2
    for (let i = startIndex, num = 0; i < S.length; ++i) {

        // 如果是以"0"开头的数字就不必继续比较了
        if (S[i] === "0" && i > startIndex) break;

        // 截取字符串并转成数字
        num = num * 10 + S[i].charCodeAt() - '0'.charCodeAt();
        // console.log("当前划分:", num);
        if (num > Math.pow(2, 31) - 1) break;

        // 如果当前截取的数字大于结果数组中最后两个数字(表示的是num1和num2)
        let length = res.length;
        if (length >= 2 && num > res[length - 1] + res[length - 2]) break;

        // 划分成功,符合num==num1+num2
        if (length <= 1 || num == res[length - 1] + res[length - 2]) {
            // console.log("成功,比较", num, "=?=", res[length - 1], "+", res[length - 2]);
            res.push(num);
            if (backTrack(S, res, i + 1))
                return true;
            res.pop();
            // console.log(res);
            // console.log(res.pop());
        }
    }
    return false;
}



console.log(splitIntoFibonacci("0112358130"));



// T860
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
    // 存储用于找零的钱
    let changes = {
        5: 0,
        10: 0
    };
    for (let i = 0; i < bills.length; ++i) {
        if (bills[i] == 5) {
            changes[5]++;
        }
        if (bills[i] == 10) {
            // 有足够零钱找零
            if (changes[5] > 0) {
                changes[5]--;
                changes[10]++;
            }
            // 没有足够找零
            else {
                return false;
            }
        }
        if (bills[i] == 20) {
            // 有足够找零
            if (changes[5] >= 3 || (changes[5] >= 1 && changes[10] >= 1)) {
                // 找一个十块一个五块
                if (changes[5] >= 1 && changes[10] >= 1) {
                    changes[10]--;
                    changes[5]--;
                }
                // 找三个五块
                else {
                    changes[5] -= 3;
                }
            }
            // 没有足够找零
            else {
                return false;
            }
        }
    }
    return true;
};

console.log(lemonadeChange([5, 5, 5, 10, 5, 5, 10, 20, 20, 20]));

function sayHi() {
    console.log(name);
    console.log(age);
    var name = "Lydia";
    let age = 21;
}

sayHi();

let tmp = [];
// tmp.reduce()
console.log(typeof tmp);//object


var obj = {
    toString: function () {
        console.log('toString')
        return Object.prototype.toString.call(this)
    },
    valueOf: function () {
        console.log('valueOf')
        return Object.prototype.valueOf.call(this)
    }
}
console.log("对象是：", obj);
console.log("---------------");
console.log(+obj);
console.log("---------------");
console.log(obj == {});
console.log("---------------");
console.log(obj === {})
console.log("---------------");
console.log(obj == 'test')
console.log("---------------");
console.log(obj === 'test')


function fun(n, o) {
    console.log(o);
    return {
        fun: function (m) {
            return fun(m, n);
        }
    };
}

var a = fun(0); // ?
a.fun(1); // ?
a.fun(2); // ?
a.fun(3); // ?
var b = fun(0).fun(1).fun(2).fun(3); // ?
var c = fun(0).fun(1); // ?
c.fun(2); // ?
c.fun(3); // ?


for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0);
}

for (var i = 0; i < 5; i++) {
    (function (j) {
        setTimeout(function () {
            console.log(j);
        }, 0);
    })(i);
    // 这样更简洁
    // setTimeout(function(j) {
    //     console.log(j);
    // }, 0, i);
}


function binarySearch(nums, start, end, target) {
    let low = start, high = end;
    while (low <= high) {
        let mid = Math.floor((start + end) / 2);
        if (mid > target) {
            high = mid - 1;
        } else {
            low = mid;
        }
    }
    return nums[mid];
}

var arr = [86, 1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 23, 44];

binarySearch(arr, 0, arr.length, 6);


var func1 = x => x;
var func2 = x => { x };
var func3 = x => ({ x });
console.log(func1(1)); // 1
console.log(func2(1)); // undefined
console.log(func3(1)); // { x:1 }


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

function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2);
        if (target > arr[mid]) {
            // 可能在头半段
            if (target >= arr[low] && arr[low] > arr[high]) {
                high = mid - 1;
            }
            // 在右半段
            else {
                low = mid + 1;
            }
        } else if (target < arr[mid]) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}
console.log(binarySearch([86, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 23, 44], 44));