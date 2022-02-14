import fs from "fs";
import path from "path";

function listFile(dir, cb) {
  return fs.readdir(dir, "utf8", (err, files) => {
    if (err) {
      return cb(err);
    }
    files
      .map((file) => path.join(dir, file))
      .map((file) => checkIfDir(file, cb));
  });
}

function checkIfDir(file, cb) {
  return fs.stat(file, (err, stat) => {
    if (err) {
      return cb(err);
    }
    return stat.isDirectory() === true ? listFile(file, cb) : console.log(file);
  });
}

function listNestedFiles(dir, cb) {
  listFile(dir, (err) => {
    if (err) {
      return cb(err);
    }
    cb();
  });
}

listNestedFiles("../..", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("completed");
});
