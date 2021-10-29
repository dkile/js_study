const fs = require("fs");

// fs.readFile("./readme.txt", (err, data) => {
//   // node 명령어를 실행하는 콘솔 기준 상대 경로
//   if (err) {
//     throw err;
//   }
//   console.log(data);
//   console.log(data.toString());
// });

// promise 형태
const fs2 = require("fs").promises;

// fs2
//   .readFile("./readme.txt")
//   .then((data) => {
//     console.log(data);
//     console.log(data.toString());
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fs2
//   .writeFile("./writeme.txt", "글이 입력됩니다.")
//   .then(() => fs2.readFile("./writeme.txt"))
//   .then((data) => {
//     console.log(data.toString());
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// stream 형식
// const readStream = fs.createReadStream("./readme.txt", { highWaterMark: 16 });
// const data = [];

// readStream.on("data", (chunk) => {
//   data.push(chunk);
//   console.log("data: ", chunk, chunk.length);
// });
// readStream.on("end", () => {
//   console.log("end: ", Buffer.concat(data).toString());
// });
// readStream.on("error", (err) => {
//   console.log("error: ", err);
// });

// // stream pipe
// const writeStream = fs.createWriteStream("writeme2.txt");
// readStream.pipe(writeStream);

// // create file
// const status = require("fs").constants;

// fs2
//   .access("./createExample", status.F_OK | status.W_OK | status.R_OK)
//   .then(() => Promise.reject("이미 폴더 있음"))
//   .catch((err) =>
//     err.code == "ENOENT" ? fs2.mkdir("./createExample") : Promise.reject(err)
//   )
//   .then(() => fs2.open("./createExample/createExample.js", "w"))
//   .then(() =>
//     fs2.rename("./createExample/createExample.js", "./createExample/example.js")
//   )
//   .then(() => console.log("파일 이름 바꾸기 성공"))
//   .catch((err) => console.log(err));

// delete folder
// fs2
//   .readdir("./createExample")
//   .then((dir) => {
//     console.log("폴더: ", dir);
//     return fs2.unlink("./createExample/example.js");
//   })
//   .then(() => fs2.rmdir("./createExample"))
//   .catch((err) => console.log(err));

// copy file
fs2
  .copyFile("writeme.txt", "writeme3.txt")
  .then(() => {
    console.log("복사 완료");
    return fs2.readFile("./writeme.txt");
  })
  .then((data) => console.log(data.toString()))
  .catch((err) => console.log(err));

// watch
fs.watch("./writeme.txt", (eventType, filename) => {
  console.log(eventType, filename);
});
