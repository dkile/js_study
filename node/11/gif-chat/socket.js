const WebSocket = require("ws");

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("new client accessed", ip);
    ws.on("message", (message) => {
      console.log(message.toString());
    });
    ws.on("error", (err) => {
      console.error(err);
    });
    ws.on("close", () => {
      console.log("client connection end", ip);
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send("message from server to client");
      }
    }, 3000);
  });
};
