import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import fsPromise from "fs/promises";

/**
 *
 * @param {string} dest
 * @param {string} content
 * @param {*} cb
 */
function appendFile(dest, content, cb) {
  mkdirp(path.dirname(dest), (err) => {
    if (err) {
      return cb(err);
    }
    fs.appendFile(dest, content, cb);
  });
}

/**
 *
 * @param {string} srcFile
 * @param {string} dest
 * @param {*} cb
 */
function concatFile(srcFile, dest, cb) {
  fs.readFile(`./${srcFile}`, "utf8", (err, content) => {
    if (err) {
      return cb(err);
    }
    appendFile(dest, content, cb);
  });
}

/**
 * concat src files' contents to dest
 * @param  {string[]} srcFiles
 * @param {string} dest
 * @param {*} cb
 */
function concatFiles(srcFiles, dest, cb) {
  const fileTask = srcFiles;

  function iterate(iter) {
    if (iter === fileTask.length) {
      return cb();
    }
    concatFile(fileTask[iter], dest, (err) => {
      if (err) {
        return cb(err);
      }
      iterate(iter + 1);
    });
  }
  iterate(0);
}

/**
 * concatFiles function promise ver
 * @param {string[]} srcFiles
 * @param {string} dest
 * @param {*} cb
 */
async function concatFilesWithPromise(srcFiles, dest, cb) {
  const appendedFiles = (
    await Promise.all(srcFiles.map((srcFile) => fsPromise.readFile(srcFile)))
  ).join("");

  await fsPromise.writeFile(dest, appendedFiles);
  cb();
}

concatFiles(
  ["file1.txt", "file2.txt", "file3.txt"],
  "./output/dest.txt",
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("concatenation completed");
  }
);
