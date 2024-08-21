// 设计一个不能操作DOM和调接口的环境
class Sandbox {
  constructor(blackList) {
    this.local = null
    this.load()
    this.blackList = blackList
  }
  load() {
    const iframe = document.createElement('iframe')
    this.local = new Proxy(iframe.currentWindow, {
      has(target, field) {
        console.log('has', target, field)
      }
    })
  }
}

const blackList = [history]
const local = new Sandbox(blackList)

function createFn(ctx) {
  const code = `with(aa) {console.log("aa", aa)}`
  return new Function('aa', code).call(ctx, ctx)
}
const obj = { a: 1, b: 2, c: 3 }
createFn(obj)
