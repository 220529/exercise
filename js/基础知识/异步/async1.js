// 函数前面加上await后，执行可以拆解为两步：1.执行函数，2.await
// 函数返回的是结果。前面加上await后，返回的是Promise.resolve(结果)
// await 后的代码块，会全部封装起来，类似全放到Promise.then里

// async function async1() {
//     console.log('async1 start')
//     await async2()
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

// 输出：
// script start
// async1 start
// async2
// script end
// async1 end
// async3
// async1 end 2

async function fn() {
    return 100
}
!(async function () {
    const a = fn()
    const b = await fn()
    console.log("a", a)
    console.log("b", b)
})()

// 输出：promise 100

// async函数返回的是promise对象，加上await就是promise.then的返回结果

!(async function () {
    console.log('start')
    const a = await 100
    console.log('a', a)
    const b = await Promise.resolve(200)
    console.log('b', b)
    const c = await Promise.reject(300)
    console.log('c', c)
    console.log('end')
})()

// 输出：start 100 200 err(300)

// reject的promise会走到catch，所以async接收reject会进到try的catch中
// 由于后边两行代码都被then的回调中，所以不输出

console.log(100)
setTimeout(() => {
    console.log(200)
})
Promise.resolve().then(() => {
    console.log(300)
})
console.log(400)

// 输出：100 400 300 200