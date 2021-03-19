/*
 * @Author: zing
 * @Email: 932455732@qq.com
 * @Date: 2021-03-05 15:58:48
 * @Last Modified by: zing
 * @Last Modified time: 2021-03-05 21:49:00
 * @Description: promise
 */
// 一个简单的实例
let promise = new Promise((resolve, reject) => {
    console.log("promise");
    resolve("我成功了！");
})
promise.then((msg) => {
    console.log(msg);
})

// 使用promise实现ajax
let getJSON = function (url) {
    let promise = new Promise((resolve, reject) => {
        // node环境没有集成XMLHttpRequest
        let client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
    });
    return promise;
}

getJSON("/posts.json").then((res) => {
    console.log("contents:", res);
}, (err) => {
    console.log("error:", err);
});


// 使用原生JS实现ajax
function createXHR() {
    if (typeof XMLHttpRequest !== "object") {
        return new XMLHttpRequest();
    }
    // 以下是对IE7以下版本的适用
    else if (typeof ActiveXObject !== "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            let versions = ["MSXML2.XMLHttp6.0", "MSXML2.XMLHttp3.0",
                "MSXML2.XMLHttp"];
            for (let i = 0; i < versions.length; ++i) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {

                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
        else {
            throw new Error("No XHR object available.");
        }
    }
}

// ajax请求
let xhr = createXHR();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            console.log(xhr.responseText);
        } else {
            console.log("Request was unsuccessful" + xhr.status);
        }
    }
}
// 请求方式，url,是否异步
// GET请求：
// GET请求中参数是以?param1=xxx&param2=yyy拼接在url后的
// 所以需要encodeURIComponent()来进行合适的编码
xhr.open("get", url, true);
xhr.send(null);

// POST请求：
xhr.open("post", url, true);
// 设置合适的Http请求头部
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
let form = document.getElementById("user-info");
xhr.send(serialize(form));
// 对于要提交的表单数据，XHR2级提供了FormData对象来序列化表单数据
// 只需：
xhr.send(new FormData(form));


new Promise(res => {
    setTimeout(() => { console.log(0) }, 0)
    res()
}).then(res => { setTimeout(() => { console.log(11111) }, 0) })

setTimeout(() => { console.log(2222222) }, 0)

console.log([3, 15, 8, 29, 102, 22].sort());