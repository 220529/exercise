const http = require('http');

const PORT = 3000; // 可以更改为您喜欢的端口号

const server = http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // 发送响应内容
  res.end('Hello, this is your Node.js server!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
