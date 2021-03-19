function sumOfTwoNum(nums, target) {
    let helper = new Map();
    for (let i in nums) {
        helper.set(nums[i], i);
    }
    // console.log(helper);
    for (let i in nums) {
        let other = target - nums[i];
        if (helper.has(other)) {
            if (parseInt(helper.get(other)) !== parseInt(i)) {
                return [parseInt(helper.get(other)), parseInt(i)];
            }
        }
    }
    return null;
}

console.log(sumOfTwoNum([2, 7, 11, 15], 9));