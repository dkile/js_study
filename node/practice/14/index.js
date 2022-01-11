#!/usr/bin/env node

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printAndClose = (p, rl) => {
  console.log(p);
  rl.close();
};

const answerCallback = (answer) => {
  if (answer === "y") {
    printAndClose("Thanks", rl);
  } else if (answer === "n") {
    printAndClose("Sorry", rl);
  } else {
    console.clear();
    console.log("only y or n");
    rl.question("Is it fun? (y/n)", answerCallback);
  }
};

rl.question("Is it fun? (y/n)", answerCallback);
