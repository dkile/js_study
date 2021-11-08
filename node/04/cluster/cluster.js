const http = require("http");
const cluster = require("cluster");

const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`master process id:${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log("code", code, "signal", signal);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.write("<h1>hello node!</h1>");
      res.end("<p>hello cluster</p>");
      setTimeout(() => {
        process.exit();
      }, 1000);
    })
    .listen(8086);

  console.log(`${process.pid}번 워커 실행`);
}
