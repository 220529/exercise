async function fn1() {
    return 100 // 相当于 Promise.resolve(100)
}
const r1 = fn1();

// await 相当于then
!(async function () {
    const r2 = await Promise.resolve(200)
    console.log("r2", r2)
})()

// 直接返回值，相当于Promise.resolve(300)，同上
!(async function () {
    const r3 = await 300
    console.log("r3", r3)
})()

// await可以接收promise对象
!(async function () {
    const r4 = await fn1()
    console.log("r4", r4)
})()

// try...catch相当于catch
// await后的都会被放到then里，当接收到reject的promise，会进到catch，所以await后的代码不会执行
!(async function () {
    const p5 = Promise.reject("r5.err")
    try {
        const r5 = await p5
        console.log("r5", r5)
    } catch (err) {
        console.log("r5.catch", err) // 相当于catch
    }
})()