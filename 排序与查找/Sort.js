// 交换排序
function MySort(arr) {
    quickSort(arr, 0, arr.length - 1);
    return arr;
}
function quickSort(arr, low, high) {
    if (low < high) {
        let pivotPos = partition(low, high);
        quickSort(arr, low, pivotPos - 1);
        quickSort(arr, pivotPos + 1, high);
    }
    function partition(low, high) {
        let pivot = arr[low];
        while (low < high) {
            while (low < high && arr[high] >= pivot) {
                --high;
            }
            arr[low] = arr[high];
            while (low < high && arr[low] <= pivot) {
                ++low;
            }
            arr[high] = arr[low];
        }
        arr[low] = pivot;
        return low;
    }
}
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; ++i) {
        let flag = false;
        for (let j = arr.length - 1; j > i; --j) {
            if (arr[j - 1] > arr[j]) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
                flag = true;
            }
        }
        // 某次未发生交换，说明序列已经有序
        if (!flag) return arr;
    }
    return arr;
}
console.log(bubbleSort([5, 1, 6, 2, 5]));

// 插入排序
/**
 * 
 * @param {number[]} arr 
 */
function insertSort(arr) {
    // 插入一个哨兵
    arr.unshift(-1);
    for (let i = 2; i <= arr.length; ++i) {
        if (arr[i] < arr[i - 1]) {
            arr[0] = arr[i];
            // 将元素向后移
            let j;
            for (j = i - 1; arr[0] < arr[j]; --j) {
                arr[j + 1] = arr[j];
            }
            arr[j + 1] = arr[0];
        }
    }
    arr.splice(0, 1)
    return arr;
}
console.log(insertSort([5, 1, 2, 4, 5, 7, 2]));

// 折半插入
function insertSort()


// 选择排序
// 简单选择
function selectSort(arr) {
    for (let i = 0; i < arr.length - 1; ++i) {
        let min = i;
        for (let j = i + 1; j < arr.length; ++j) {
            if (arr[j] < arr[min]) min = j;
        }
        if (min != i) [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    return arr;
}

console.log(selectSort([5, 2, 3, 4, 6, 8]));

// 堆排序
// 