// try catch
// setInterval(() => {
//   console.log("start");
//   try {
//     throw new Error("error!");
//   } catch (err) {
//     console.log(err);
//   }
// }, 1000);

// error catch
// const fs = require("fs").promises;

// setInterval(() => {
//   fs.unlink("./aaaa.js").catch((err) => console.log(err));
// });

// uncaughtException
process.on("uncaughtException", (err) => {
  console.log(err);
});

setInterval(() => {
  throw new Error("error!!");
}, 1000);

setTimeout(() => {
  console.log("execute");
}, 2000);
