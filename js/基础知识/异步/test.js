async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')

// 解析执行结果
// script start：同步代码
// async1 start：async1()立即执行函数
// async2：await async2()立即执行函数，后边代码快都封装起来，放到微任务队列末尾
// promise1：new Promise()传入的函数也会立即执行，resolve()后该实例状态变为fulfilled，将then回调放到微任务队列末尾
// script end：同步代码
// async1 end：执行栈空了，从微任务队列取出第3步的回调
// promise2：执行栈又空了，从微任务队列取出第4步的回调
// setTimeout：宏任务总是在同步任务、微任务、dom渲染之后执行


// js执行和dom渲染是用的同一线程，使用alert来阻断js执行，也会阻断dom渲染。可以判断各任务执行的优先级。
// 解析执行结果：
// 第1个alert弹出p的长度是3，但页面上没有看到三个p元素，说明dom的渲染被阻断了
// 第2个alert弹出Promise，还是没看到三个p元素，dom的渲染还在处于被阻断的状态
// 第3个alert弹出setTimeout，页面出现了三个p元素，说明dom渲染结束

// 由此可以得到执行顺序：**Promise > dom 渲染 > 定时器**

// // 第一题
// Promise.resolve().then(() => {
//     console.log(1)
// }).catch(() => {
//     console.log(2)
// }).then(() => {
//     console.log(3)
// })

// // 第二题
// Promise.resolve().then(() => {
//     console.log(1)
//     throw new Error('erro1')
// }).catch(() => {
//     console.log(2)
// }).then(() => {
//     console.log(3)
// })

// // 第三题
// Promise.resolve().then(() => {
//     console.log(1)
//     throw new Error('erro1')
// }).catch(() => {
//     console.log(2)
// }).catch(() => {
//     console.log(3)
// })
// 解析执行结果

// 第一题
// 1：第1个then，内部没有报错进到下一个then
// 3：第2个then

// 第二题
// 1：第1个then，内部报错进到catch
// 2：第1个catch，内部没有报错进到下一个then
// 3：第2个then

// 第三题
// 1：第1个then，内部报错进到catch
// 2：第1个catch，内部没有报错进到下一个then。后边是catch不是then，所以不执行


// var b = '2'
// function abc() {
//     let b = 1
//     ++b
//     setTimeout(() => {
//         test('fun test')
//     }, 0)
//     setTimeout(test('test fun'), 1000)
//     console.log(b)
//     function test(str) {
//         this.b++
//         console.log(str)
//         console.log(this.b++)
//     }
// }
// abc()

// 解析执行结果
// test fun：setTimeout第一个参数，是个立即执行的函数，打印传入的字符串
// 3：test执行函数没有任何调用者，this指向window，全局作用域的b++，字符串被隐式转换成Number。函数执行完b为4
// 2：函数作用域++b的结果
// fun test：同步代码执行完，执行栈清空，从宏任务队列中取出回调压栈执行
// 5：全局作用域的b++，4 => 5




// async function async1() {
//     console.log('async1 start')
//     await async2() // 这里会被拆加成 1.先执行函数，2.await
//     console.log('async1 end')
//     await async3()
//     console.log('async1 end 2')
// }

// async function async2() {
//     console.log('async2')
// }

// async function async3() {
//     console.log('async3')
// }

// console.log('script start')
// async1()
// console.log('script end')

// 解析执行结果
// script start：同步代码直接打印
// async1 start：async1() 会立即执行函数(函数前面加上await后，执行可以拆解为两步：1.执行函数，2.await)
// async2：await async2() 立即执行，并将后边所有代码块封装起来(类似全放到Promise.then里)，等待同步任务执行完。到此async1函数暂时执行完了
// script end：同步代码，清空调用栈
// async1 end：调用栈空了，从微任务队列中，取出回调压栈执行。
// async3：同第3步
// async1 end 2：同第5步



// async function async1() {
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }

// async function async2() {
//     console.log('async2')
// }

// console.log('script start')

// setTimeout(function () {
//     console.log('setTimeout')
// }, 0)

// async1()

// new Promise(function (resolve) {
//     console.log('promise1')
//     resolve()
// }).then(function () {
//     console.log('promise2')
// })

// console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout