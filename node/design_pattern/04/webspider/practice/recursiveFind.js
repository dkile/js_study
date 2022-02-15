import fs from "fs";
import path from "path";

function checkIfDir(file, keyword, cb) {
  fs.stat(file, (err, stats) => {
    if (err) {
      return cb(err);
    }
    stats.isDirectory()
      ? recursiveFind(file, keyword, cb)
      : checkKeywordInFile(file, keyword, cb);
  });
}

function checkKeywordInFile(file, keyword, cb) {
  fs.readFile(file, "utf8", (err, content) => {
    if (err) {
      return cb(err);
    }
    content.includes(keyword) ? cb(null, file) : cb();
  });
}

function findFileByKeyword(files, keyword, dir, cb) {
  files
    .map((file) => path.join(dir, file))
    .map((file) => checkIfDir(file, keyword, cb));
}

function recursiveFind(dir, keyword, cb) {
  const fileList = [];
  return () =>
    fs.readdir(dir, (err, files) => {
      if (err) {
        return cb(err);
      }
      findFileByKeyword(files, keyword, dir, (err, file) => {
        if (err) {
          return cb(err);
        }
        if (file) {
          fileList.push(file);
        }
      });
    });
}

recursiveFind("../..", "console", console.log);
