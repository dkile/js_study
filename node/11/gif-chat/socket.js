// const WebSocket = require("ws");
const SocketIO = require("socket.io");

module.exports = (server) => {
  // const wss = new WebSocket.Server({ server });
  const io = SocketIO(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("new client accessed", ip, socket.id, req.ip);
    socket.on("disconnect", () => {
      console.log("client connection end", ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on("error", (err) => {
      console.error(err);
    });
    socket.on("reply", (data) => {
      console.log(data);
    });
    socket.interval = setInterval(() => {
      socket.emit("news", "Hello Socket.IO");
    }, 3000);
  });

  //   wss.on("connection", (ws, req) => {
  //     const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  //     console.log("new client accessed", ip);
  //     ws.on("message", (message) => {
  //       console.log(message.toString());
  //     });
  //     ws.on("error", (err) => {
  //       console.error(err);
  //     });
  //     ws.on("close", () => {
  //       console.log("client connection end", ip);
  //       clearInterval(ws.interval);
  //     });

  //     ws.interval = setInterval(() => {
  //       if (ws.readyState === ws.OPEN) {
  //         ws.send("message from server to client");
  //       }
  //     }, 3000);
  //   });
};
