/**
 * Require Practice
 */
console.log("require가 가장 위에 오지 않아도 됩니다.");

module.exports = "저를 찾아보세요";

require("../oddOrEven/var");

console.log("require.cache입니다");
console.log(require.cache);
console.log("require.main입니다");
console.log(require.main === module);
console.log(require.main.filename);

/**
 * Node.js Built-in Modules
 */

// os
// error 체크할 땐 os.constants 사용
const os = require("os");

console.log("운영체제 정보--------------------------------");
console.log("os.arch():", os.arch());
console.log("os.platform():", os.platform());
console.log("os.type():", os.type());
console.log("os.uptime():", os.uptime());
console.log("os.hostname():", os.hostname());
console.log("os.release():", os.release());

console.log("경로----------------------------------");
console.log("os.homedir():", os.homedir());
console.log("os.tmpdir():", os.tmpdir());

console.log("cpu 정보-------------------------------------");
console.log("os.cpus():", os.cpus());
console.log("os.cpus().length:", os.cpus().length);

console.log("메모리 정보-----------------------------------");
console.log("os.freemem():", os.freemem());
console.log("os.totalmem():", os.totalmem());

// path
const path = require("path");

const filename = __filename;

console.log("path.sep", path.sep);
console.log("path.delimeter", path.delimiter);
console.log("--------------------------------");
console.log("path.dirname():", path.dirname(filename));
console.log("path.extname():", path.extname(filename));
console.log("path.basename():", path.basename(filename));
console.log(
  "path.basename - extname:",
  path.basename(filename, path.extname(filename))
);
console.log("--------------------------------");
console.log("path.parse():", path.parse(filename));
console.log("path.format():", path.format(path.parse(filename)));
console.log("path.normalize():", path.normalize("~////js_study///node"));
console.log("path.isAbsolute()", path.isAbsolute("/bin"));
console.log("path.isAbsolute()", path.isAbsolute("../"));
console.log("path.relative()", path.relative("~/js_study", "/"));

// url
const url = require("url");

const { URL } = url;
const whatwgURL = new URL(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000&limit=10&page=3&category=nodejs&category=javascript#anchor"
);
console.log("new URL():", whatwgURL);
console.log("url.format():", url.format(whatwgURL));
console.log("serchParams:", whatwgURL.searchParams);
console.log("serchParams.getAll():", whatwgURL.searchParams.getAll("category"));
console.log("serchParams.get():", whatwgURL.searchParams.get("limit"));
console.log("serchParams.has():", whatwgURL.searchParams.has("page"));

console.log("serchParams.keys():", whatwgURL.searchParams.keys());
console.log("serchParams.values():", whatwgURL.searchParams.values());
whatwgURL.searchParams.append("filter", "es5");
console.log(whatwgURL.searchParams.getAll("filter"));

whatwgURL.searchParams.set("filter", "es6");
console.log(whatwgURL.searchParams.getAll("filter"));

whatwgURL.searchParams.delete("filter");
console.log(whatwgURL.searchParams.getAll("filter"));

console.log("serchParams.toString():", whatwgURL.searchParams.toString());
whatwgURL.search = whatwgURL.searchParams.toString();

console.log("----------------------------------");
const nodeURL = url.parse(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);
console.log("url.parse():", nodeURL);
console.log(url.format(nodeURL));

// querystring
const querystring = require("querystring");

const nodeURL2 = url.parse(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000&limit=10&page=3&category=nodejs&category=javascript#anchor"
);
const query = querystring.parse(nodeURL2.query);
console.log("querystring.parse():", query);
console.log("querystring.stringify():", querystring.stringify(query));

// crypto
const crypto = require("crypto");

console.log("crypto------------------------------------------");
console.log(
  "base64:",
  crypto.createHash("sha512").update("password").digest("base64")
);
console.log(
  "hex:",
  crypto.createHash("sha512").update("password").digest("hex")
);
console.log(
  "base64:",
  crypto.createHash("sha512").update("another password").digest("base64")
);

// crypto_pbkdf2
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  console.log("salt:", salt);
  crypto.pbkdf2("password", salt, 100000, 64, "sha512", (err, key) => {
    console.log("password:", key.toString("base64"));
  });
});

// crypto_cipheriv
const cipher_algorithm = "aes-256-cbc";
const key = "abcdefghijklmnopqrstuvwxyz123456";
const iv = "1234567890123456";

const cipher = crypto.createCipheriv(cipher_algorithm, key, iv);
let encrypted = cipher.update("암호화", "utf-8", "base64");
encrypted += cipher.final("base64");
console.log("암호화:", encrypted);

const decipher = crypto.createDecipheriv(cipher_algorithm, key, iv);
let decrypted = decipher.update(encrypted, "base64", "utf-8");
decrypted += decipher.final("utf-8");
console.log("복호화:", decrypted);

// util
const util = require("util");

const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, "dontUseMe function deprecated!!");
dontUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString("base64"));
  })
  .catch((err) => {
    console.log(err);
  });

// worker_threads
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  const threads = new Set();
  threads.add(
    new Worker(__filename, {
      workerData: { start: 1 },
    })
  );
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    })
  );
  for (const worker of threads) {
    worker.on("message", (message) => console.log("from worker ", message));
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log("job end");
      }
    });
  }
} else {
  const data = workerData;
  parentPort.postMessage(data.start + 100);
  // parentPort.on('message', v => {
  //   console.log('from parent ', v);
  //   parentPort.postMessage('pong');
  //   parentPort.close();
  // });
}
