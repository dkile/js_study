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
