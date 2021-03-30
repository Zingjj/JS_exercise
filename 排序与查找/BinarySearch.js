/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-30 10:36:08
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-30 11:33:13
 * @Description: 二分查找的所有情况
 */
/**
 * 正常的二分查找
 * @param {number[]} arr 
 */
function binarySearch(arr, target) {
    // 边界的意思是，查找区间为[0,length-1]
    let low = 0, high = arr.length - 1;
    // 边界条件不能是low<high
    // low<high的情况下会丢掉low=high的情况
    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);
        if (target < arr[mid]) {
            high = mid - 1;
        } else if (target == arr[mid]) {
            return mid;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}
/**
 * [1,2,2,2,3,4,5] target=2 return 1
 * @param {number[]} arr 
 * @param {number} target 
 */
function binarySearch_leftEdge(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2);
        if (target < arr[mid]) {
            high = mid - 1;
        } else if (target == arr[mid]) {
            high = mid - 1;
        } else {
            // target>arr[mid]
            low = mid + 1;
        }
    }
    console.log(low, high);
    // 判别low的越界情况
    // 关键！！
    if (low >= arr.length || arr[low] != target) {
        return -1;
    }
    return low;
}
console.log(binarySearch_leftEdge([1, 3, 4, 5], 2));

/**
 * 找的是第一个大于target的值
 * @param {number[]} arr 
 * @param {number} target 
 * @returns 
 */
function binarySearch_rightEdge(arr, target) {
    let low = 0, high = arr.length;
    while (low < high) {
        let mid = low + Math.floor((high - low) / 2);
        if (target < arr[mid]) {
            high = mid;
        } else if (target == arr[mid]) {
            low = mid + 1;
        } else {
            // target>arr[mid]
            low = mid + 1;
        }
    }
    return low - 1;
}
console.log(binarySearch_rightEdge([1, 2, 2, 2, 3, 4, 5], 3));
