function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log('这里是get', key)
      // 判断如果是个对象在包装一次，实现深层嵌套的响应式
      if (typeof target[key] === 'object') {
        return reactive(target[key])
      }
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log('这里是set', key)
      return Reflect.set(target, key, value, receiver)
    }
  })
}

const obj = {
  a: {
    count: 1
  },
  b: 1
}

//reactive 是上文中的reactive
const proxy = reactive(obj)
const { a, b } = proxy
console.log(a)
console.log(b)
// console.log(a.count)