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

fs2
  .readFile("./readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err);
  });

fs2
  .writeFile("./writeme.txt", "글이 입력됩니다.")
  .then(() => fs2.readFile("./writeme.txt"))
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err);
  });

// stream 형식
const readStream = fs.createReadStream("./readme.txt", { highWaterMark: 16 });
const data = [];

readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data: ", chunk, chunk.length);
});
readStream.on("end", () => {
  console.log("end: ", Buffer.concat(data).toString());
});
readStream.on("error", (err) => {
  console.log("error: ", err);
});

// stream pipe
const writeStream = fs.createWriteStream("writeme2.txt");
readStream.pipe(writeStream);
