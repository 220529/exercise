const { WebSocketServer } = require("ws")
const wsServer = new WebSocketServer({ port: 3000 });
wsServer.on("connection", ws => {
    console.log("server连接上了...");
    ws.on("message", msg => {
        console.log("收到client信息", msg.toString())
        setTimeout(() => {
            ws.send("server收到" + msg)
        }, 2000)
    })
})