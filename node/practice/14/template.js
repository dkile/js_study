#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

let rl;
let type = process.argv[2];
let name = process.argv[3];
let dir = process.argv[4] || ".";

const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Template</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>CLI</p>
  </body>
</html>`;
const routerTemplate = `
const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;`;

const exist = (dir) => {
  try {
    fs.accessSync(
      dir,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
    );
    return true;
  } catch (err) {
    return false;
  }
};

const mkdirp = (dir) => {
  const dirname = path
    .relative(".", path.normalize(dir))
    .split(path.sep)
    .filter((p) => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = () => {
  mkdirp(dir);
  if (type === "html") {
    const pathToFile = path.join(dir, `${name}.html`);
    if (exist(pathToFile)) {
      console.error("Already exist");
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, "done");
    }
  } else if (type === "express-router") {
    const pathToFile = path.join(dir, `${name}.js`);
    if (exist(pathToFile)) {
      console.error("Already exist");
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, "done");
    }
  } else {
    console.error("html or express-router");
  }
};

const dirAnswer = (answer) => {
  dir = (answer && answer.trim()) || ".";
  rl.close();
  makeTemplate();
};

const nameAnswer = (answer) => {
  if (!answer || !answer.trim()) {
    console.clear();
    console.log("write name");
    return rl.question("filename? ", nameAnswer);
  }
  name = answer;
  return rl.question("path?(default: ./) ", dirAnswer);
};

const typeAnswer = (answer) => {
  if (answer !== "html" && answer !== "express-router") {
    console.clear();
    console.log("only html or express-router");
    return rl.question("which template?", typeAnswer);
  }
  type = answer;
  return rl.question("filename? ", nameAnswer);
};

const program = () => {
  if (!type || !name) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.clear();
    rl.question("which template? ", typeAnswer);
  } else {
    makeTemplate();
  }
};

program();
