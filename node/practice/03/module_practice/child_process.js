// exec
const exec = require("child_process").exec;

const process = exec("ls");

process.stdout.on("data", (data) => {
  console.log(data.toString());
});

process.stderr.on("data", (data) => {
  console.error(data.toString());
});

// spawn
const spawn = require("child_process").spawn;

const py_process = spawn("python", ["test.py"]);

py_process.stdout.on("data", (data) => {
  console.log(data.toString());
});

py_process.stderr.on("data", (data) => {
  console.log(data.toString());
});
