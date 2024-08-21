class MyPromise {
    constructor(executor) {
        // 添加属性
        this.PromiseState = 'pending'
        this.PromiseResult = null

        // 存储回调函数的地方
        this.callback = []

        const self = this

        function resolve(data) {
            // 判断状态，状态不可逆
            if (self.PromiseState !== 'pending') return

            // 第一步：改变实例对象状态
            self.PromiseState = 'fulfilled'

            // 第二步：改变实例对象结果值
            self.PromiseResult = data

            // 调用异步里面的回调函数
            setTimeout(() => {
                self.callback.forEach(item => {
                    item.onResolved(data)
                })
            });
        }

        function reject(data) {
            if (self.PromiseState !== 'pending') return
            self.PromiseState = 'rejected'
            self.PromiseResult = data
            setTimeout(() => {
                self.callback.forEach(item => {
                    item.onRejected(data)
                })
            })
        }

        try {
            // 同步调用：执行器函数-executor
            executor(resolve, reject)
        } catch (error) {
            // throw err
            reject(error)
        }
    }

    // 添加 then 方法
    then(onResolved, onRejected) {
        const self = this

        if (typeof onRejected !== 'function') {
            onRejected = reason => { throw reason }
        }

        if (typeof onResolved !== 'function') {
            onResolved = value => value
        }

        return new MyPromise((resolve, reject) => {
            function callback(typeFn) {
                try {
                    const result = typeFn(self.PromiseResult)
                    if (result instanceof MyPromise) {
                        // 如果result是一个Promise实例
                        result.then(v => {
                            resolve(v)
                        }, r => {
                            reject(r)
                        })
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }

            // 调用回调函数
            if (this.PromiseState === 'fulfilled') {
                setTimeout(() => {
                    callback(onResolved)
                })
            }

            if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    callback(onRejected)
                })
            }

            if (this.PromiseState === 'pending') {
                // 保存回到函数
                this.callback.push({
                    onResolved: function () {
                        callback(onResolved)
                    },
                    onRejected: function () {
                        callback(onRejected)
                    }
                })
            } Í
        })
    }

    // 添加catch方法
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    // 添加resolve方法
    static resolve(value) {
        return new MyPromise((resolve, rewwwject) => {
            if (value instanceof MyPromise) {
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                resolve(value)
            }
        })
    }

    // 添加reject方法
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }

    // 添加all方法
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const len = promises.length
            const res = []
            let count = 0

            for (let index = 0; index < len; index++) {
                promises[index].then(v => {
                    count++
                    res[index] = v
                    if (len === count) {
                        resolve(res)
                    }
                }, r => {
                    reject(r)
                })
            }
        })
    }

    // 添加race方法
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            const len = promises.length
            for (let index = 0; index < len; index++) {
                promises[index].then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            }
        })
    }
}