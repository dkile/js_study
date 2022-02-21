import { promises as fsPromise } from "fs";

const fn1 = async () => {
  try {
    console.log("fn1 start");
    const content = await fsPromise.readFile(
      "./05/async/webspider_async_v4/test",
      "utf8"
    );

    return content;
  } catch (err) {
    console.log("error occured in fn1");
    console.error(err);
  }
};

const fn2 = async () => {
  try {
    console.log("fn2 start");
    const content = await fsPromise.readFile(
      "./05/async/webspider_async_v4/test2",
      "utf8"
    );

    return content;
  } catch (err) {
    console.log("error occured in fn2");
    console.error(err);
  }
};

const fn3 = async () => {
  try {
    console.log("fn3 start");
    const content = await fsPromise.readFile(
      "./05/async/webspider_async_v4/test",
      "utf8"
    );

    return content;
  } catch (err) {
    console.log("error occured in fn3");
    console.error(err);
  }
};

const fn4 = async () => {
  try {
    console.log("fn4 start");
    const content = await fsPromise.readFile(
      "./05/async/webspider_async_v4/test2",
      "utf8"
    );

    return content;
  } catch (err) {
    console.log("error occured in f4");
    console.error(err);
  }
};

async function promiseAll(fns) {
  const outputs = [];
  for (const fn of fns) {
    outputs.push(await fn());
  }
  return outputs;
}

const fns = [fn1, fn2, fn3, fn4];
const contents = await promiseAll(fns);

console.log(contents);
