const http = require("http");
const port = 8000;
http.createServer(function (req, res) {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Methods": "GET",
        "Access-Control-Allow-Header": "Content-Type"
    })
    const list = [];
    for (let i = 0; i < 100000; i++) {
        list.push({
            num: i,
            text: `我是${i}号`,
            url: 'https://lagou-zhaopin-fe.lagou.com/fed/lg-www-node/792/star2.png'
        })
    }
    res.end(JSON.stringify(list))
}).listen(port, () => {
    console.log(`${port}启动了...`);
})