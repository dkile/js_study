import { promises as fsPromise } from "fs";

export default class TaskQueuePC {
  constructor(concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];

    // 동시성 개수만큼 소비자 생성
    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  async consumer() {
    while (true) {
      try {
        const task = await this.getNextTask();
        await task();
      } catch (err) {
        console.error(err);
      }
    }
  }
  async getNextTask() {
    return new Promise((resolve) => {
      if (this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift());
      }
      this.consumerQueue.push(resolve);
    });
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task();
        taskPromise.then((resolve, reject));
        return taskPromise;
      };

      if (this.consumerQueue.length !== 0) {
        const consumer = this.consumerQueue.shift();
        consumer(taskWrapper);
      } else {
        this.taskQueue.push(taskWrapper);
      }
    });
  }
}

// const queue = new TaskQueuePC(3);

const fn1 = async () => {
  try {
    console.log("fn1 start");
    const content = await fsPromise.readFile("./test", "utf8");

    return content;
  } catch (err) {
    console.log("error occured in fn1");
    console.error(err);
  }
};

const fn2 = async () => {
  try {
    console.log("fn2 start");
    const content = await fsPromise.readFile("./test2", "utf8");

    return content;
  } catch (err) {
    console.log("error occured in fn2");
    console.error(err);
  }
};

const fn3 = async () => {
  try {
    console.log("fn3 start");
    const content = await fsPromise.readFile("./test", "utf8");

    return content;
  } catch (err) {
    console.log("error occured in fn3");
    console.error(err);
  }
};

const fn4 = async () => {
  try {
    console.log("fn4 start");
    const content = await fsPromise.readFile("./test2", "utf8");

    return content;
  } catch (err) {
    console.log("error occured in f4");
    console.error(err);
  }
};

// const promises = [
//   queue.runTask(fn1),
//   queue.runTask(fn2),
//   queue.runTask(fn3),
//   queue.runTask(fn4),
// ];

// const contents = await Promise.all(promises);

// console.log(contents);
// const content1 = await queue.runTask(fn1);
// const content2 = await queue.runTask(fn2);
// const content3 = await queue.runTask(fn3);
// const content4 = await queue.runTask(fn4);

// console.log(contents);
// console.log(content1, content2, content3, content4);

// const runTask = (task) => {
//   return new Promise((resolve, reject) => {
//     const
//   })
// }

((function () {
  console.log("A");
},
function () {
  console.log("B");
},
function () {
  console.log("C");
})());
