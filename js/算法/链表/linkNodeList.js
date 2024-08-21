class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}
class LinkNodeList {
  constructor() {
    this.head = null
    this.length = 0
  }
  append(element) {
    let node = new Node(element)
    let cur
    if (!this.length) {
      this.head = node
    } else {
      cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.length += 1
  }
  print() {
    let cur = this.head
    let result = []
    while (cur) {
      result.push(cur.element)
      cur = cur.next
    }
    console.log('print:', result.join('==>'))
    return result.join('==>')
  }
  insert() {}
  remove(index) {
    if (!this.length) {
      return
    }
    let cur = this.head
    let tamp = null
    if (index === 0) {
      tamp = cur
      this.head = cur.next
    } else {
      let num = 0
      let pre = null
      while (num < index) {
        pre = cur
        cur = cur.next
        num += 1
      }
      tamp = cur
      pre.next = pre.next.next
    }
    this.length -= 1
    console.log('remove:', tamp)
    tamp = null
    return tamp
  }
  reverse() {
    let cur = this.head
    // if (this.length < 2) {
    //   return this
    // }
    // while (cur.next) {
    //   let tamp = cur.next
    //   cur.next = cur.next.next
    //   tamp.next = this.head
    //   this.head = tamp
    // }
    let prev = null
    while (cur) {
      ;[cur.next, prev, cur] = [prev, cur, cur.next]
      // let next = cur.next
      // cur.next = prev
      // prev = cur
      // cur = next
    }
    return prev
  }
}
