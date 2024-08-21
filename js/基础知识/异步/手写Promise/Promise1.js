class MyPromise {
    // 三种状态：pending/fulfilled/rejected
    status = "pending";

    // 记录当前Promise的值，给新的Promise
    value = undefined; // 执行结果
    reason = undefined; // 错误信息

    // 存贮在pending状态下，then注册的回调
    resolveCallbacks = [];
    rejectCallbacks = [];

    /**
     * 执行函数，捕获异常。修改实例状态
     * @param {自定义函数} fn 
     */
    constructor(fn) {
        const resolveHandler = value => {
            this.value = value;
            this.status = "fulfilled";
            this.resolveCallbacks.forEach(callback => callback(this.value))
        }
        const rejectHandler = reason => {
            this.reason = reason;
            this.status = "rejected";
            this.rejectCallbacks.forEach(callback => callback(this.reason))
        }
        try {
            fn(resolveHandler, rejectHandler);
        } catch (err) {
            rejectHandler(err)
        }
    }
    /**
     * then始终返回新的Promise实例
     * @param {成功回调} fn1 
     * @param {失败回调} fn2 
     * @returns 
     */
    then(fn1, fn2) {
        // 处理兼容，保证都是可执行的函数
        fn1 = typeof fn1 === "function" ? fn1 : fn1 => fn1;
        fn2 = typeof fn2 === "function" ? fn2 : fn2 => fn2;

        return new MyPromise((resolve, reject) => {
            if (this.status === "fulfilled") {
                try {
                    // 执行成功回调的结果，传给当前Promise，状态变为resolve
                    resolve(fn1(this.value))
                } catch (err) {
                    // 捕获错误，当前Promise状态变为rejected
                    reject(err)
                }
            } else if (this.status === "rejected") {
                try {
                    // 执行失败回调的结果，传给当前Promise，状态变为reject
                    reject(fn2(this.reason))
                } catch (err) {
                    // 捕获错误，当前Promise状态变为rejected
                    reject(err)
                }
            } else if (this.status === "pending") {
                // 当实例还在定时器，或者ajax时，拿不到最新值。先存起来，等状态变了后执行
                this.resolveCallbacks.push(() => {
                    try {
                        resolve(fn1(this.value))
                    } catch (err) {
                        reject(err)
                    }
                })
                this.rejectCallbacks.push(() => {
                    try {
                        resolve(fn2(this.reason))
                    } catch (err) {
                        reject(err)
                    }
                })
            }
        })
    }

    catch(fn1) {
        return this.then(null, fn1)
    }
    static resolve(param) {
        return new MyPromise((resolve, reject) => resolve(param))
    }
    static reject(param) {
        return new MyPromise((resolve, reject) => reject(param))
    }
    /**
     * 全部执行完或者有一个失败就返回
     * @param {实例数组} promiseList 
     * @returns 
     */
    static all(promiseList = []) {
        return new MyPromise((resolve, reject) => {
            let cur = 0
            const res = [];
            promiseList.forEach(p => {
                p.then(r => {
                    res.push(r)
                    cur++
                    if (cur === promiseList.length) {
                        resolve(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        })
    }
    /**
     * 赛跑，有一个结束就返回
     * @param {*} promiseList 
     * @returns 
     */
    static race(promiseList = []) {
        let isOver = false
        return new MyPromise((resolve, reject) => {
            promiseList.forEach(p => {
                p.then(r => {
                    if (!isOver) {
                        resolve(r)
                    }
                    isOver = true
                }).catch(err => {
                    reject(err)
                })
            })
        })
    }
}