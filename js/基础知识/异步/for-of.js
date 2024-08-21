const arr = [1, 2, 3]
// 延时计算值的平方
function squ(n) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(n * n);
        }, 1000)
    })
}

function fnRunAsync() {
    // 同步执行
    arr.forEach(async n => {
        const r1 = await squ(n)
        console.log("r1", r1)
    })

    Array.prototype.customForEach = function (fn) {
        for (var i = 0; i < this.length; i++) {
            fn(this[i], i)
        }
    }

    arr.customForEach(async n => {
        const r1 = await squ(n)
        console.log("r1", r1)
    })

    // 异步执行
    !(async function () {
        for (let i = 0; i < arr.length; i++) {
            const r2 = await squ(arr[i]);
            console.log("for", r2)
        }
    })()

    // 异步执行
    !(async function () {
        for (let i in arr) {
            const r2 = await squ(arr[i]);
            console.log("for in", r2)
        }
    })()

    // 异步执行
    !(async function () {
        for (let i of arr) {
            const r2 = await squ(i);
            console.log("for of", r2)
        }
    })()
    // 这三种for循环都是每间隔1s输出一次结果
}

fnRunAsync()

function fnTestFor() {
    arr.a = 4
    Array.prototype.b = 5
    // for (const key in arr) {
    //     // if (arr.hasOwnProperty(key)) {
    //     //     console.log(key);
    //     // }
    //     console.log(key);
    // }
    for (let i = 0; i < arr.length; i++) {
        console.log("for", i)
    }
    for (const i in arr) {
        console.log("for in", i)
    }
    for (const i of arr) {
        console.log("for of", i)
    }
}

// fnTestFor()

// for (const key of arr) {
//     console.log(key);
// }

// const obj = { a: 1 }
// Object.prototype.b = 2
// for (const key in obj) {
//     console.log(key);
// }