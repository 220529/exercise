var w = ''
function start() {
  w.terminate ? w.terminate() : ''
  w = new Worker('./worker.js')
  w.postMessage('滴滴滴')
  w.onmessage = (result) => {
    console.log("main.js 收到了消息：", result.data)
  }
}

function stop() {
  w.terminate ? w.terminate() : ''
}
