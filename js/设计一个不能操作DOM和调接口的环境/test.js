function fnCreateFn() {
  const code = `with(aa) { console.log('aa', aa) }`
  return new Function('aa', code)
}
const obj = { a: 1, b: 2 }
fnCreateFn().call(null, obj)
