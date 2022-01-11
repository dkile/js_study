#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");

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

const makeTemplate = (type, name, dir) => {
  mkdirp(dir);
  if (type === "html") {
    const pathToFile = path.join(dir, `${name}.html`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red("Already exist"));
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.green(pathToFile, "done"));
    }
  } else if (type === "express-router") {
    const pathToFile = path.join(dir, `${name}.js`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red("Already exist"));
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.green(pathToFile, "done"));
    }
  } else {
    console.error(chalk.bold.red("only html or express-router"));
  }
};

program.version("0.0.1", "-v, --version").name("cli");

program
  .command("template <type>")
  .usage("<type> --filename [filename] --path [path]")
  .description("create template")
  .alias("tmpl")
  .option("-f, --filename [filename]", "input filename", "index")
  .option("-d, --directory [path]", "input path", ".")
  .action((type, options) => {
    makeTemplate(type, options.filename, options.directory);
  });

program
  .action((cmd, args) => {
    if (args) {
      console.log(chalk.bold.red("command not found"));
      program.help();
    } else {
      inquirer
        .prompt([
          {
            type: "list",
            name: "type",
            message: "choose template",
            choices: ["html", "express-router"],
          },
          {
            type: "input",
            name: "name",
            message: "input filename",
            default: "index",
          },
          {
            type: "input",
            name: "directory",
            message: "input path",
            default: ".",
          },
          {
            type: "confirm",
            name: "confirm",
            message: "create?",
          },
        ])
        .then((answers) => {
          if (answers.confirm) {
            makeTemplate(answers.type, answers.name, answers.directory);
            console.log(chalk.rgb(128, 128, 128)("close terminal"));
          }
        });
    }
  })
  .parse(process.argv);
