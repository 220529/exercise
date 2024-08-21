var i = 0

importScripts('./worker2.js')

function timedCount() {
  i = i + 1
  postMessage(i)
  setTimeout('timedCount()', 500)
}

timedCount()

onmessage = (e) => {
  console.log('worker.js 收到了消息：', e.data) //hhh
  console.log("self: ", self);
  console.log("window: ", window);
  setTimeout(() => {
    postMessage('哒哒哒')
  }, 3000)
}
// this.onmessage = (e) => {
//     console.log(e);
// }
// addEventListener('message', function (e) {
//     console.log(e);
// }, false);
