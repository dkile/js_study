const timeout = setTimeout(() => {
  console.log("1.5s later");
}, 1500);

const interval = setInterval(() => {
  console.log("every 1s");
}, 1000);

const timeout2 = setTimeout(() => {
  console.log("not executed");
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log("execute now");
});

const immediate2 = setImmediate(() => {
  console.log("not executed");
});

clearImmediate(immediate2);
