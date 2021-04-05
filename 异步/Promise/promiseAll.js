/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-18 09:56:52
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-18 10:02:31
 * @Description: 模拟实现一个promise.all
 */

function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        let resultCount = 0, promiseLen = promises.length;
        let results = new Array(promiseLen); // 用于存放返回结果
        for (let i = 0; i < promiseLen; ++i) {
            promises[i].then(res => {
                resultCount++;
                results[i] = res;
                // 执行完最后一个promise则返回
                if (resultCount === promiseLen) {
                    return resolve(results);
                }
            }, err => {
                reject(err);
            })
        }
    })
}
