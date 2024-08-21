const p1 = Promise.resolve(1).then(() => {
    return 'resolve.suc'
})
console.log('p1', p1)

// const p2 = Promise.reject(2).then(() => {
//     return 'reject1.err'
// })
// console.log('p2', p2)

const p3 = Promise.reject(3).then(() => {
    return 'reject2.err'
}).catch(err => {
    console.log('p3', err)
})
console.log('p3', p3)

// p1和p3状态都是fulfilled，p2是rejected

const p4 = Promise.resolve(4)
    .then(() => {
        throw new Error('p4.then.throw err ----- ')
    })
    .catch((err) => {
        console.log('p4.catch', err)
    })
// 输出：p4.catch Error: p4.then.throw err----- 

const p5 = Promise.resolve(5)
    .then(() => {
        throw new Error('p5.then.throw err ----- ')
    })
    .catch((err1) => {
        console.log('p5.catch1 ---', err1)
        throw new Error('p5.catch1.throw err ----- ')
    })
    .then((r) => {
        console.log('p5.then2', r)
    })
    .catch((err2) => {
        console.log('p5.catch2 ---', err2)
    })
// p5.catch1 --- Error: p5.then.throw err -----
// p5.catch2 --- Error: p5.catch1.throw err ----- 
console.log('p5', p5)

// const p3 = Promise.reject(3)
// console.log("111")
// p3.catch(r => {
//     console.log('p3', r)
// })