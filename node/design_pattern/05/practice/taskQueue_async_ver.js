import { EventEmitter } from "events";

export class TaskQueue extends EventEmitter {
  constructor(concurrency) {
    super();
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  next() {
    if (this.running === 0 && this.queue.length === 0) {
      return this.emit("empty");
    }

    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      (async () => {
        try {
          await task();
          this.running--;
          this.next();
        } catch (err) {
          console.error(err);
        }
      })();
      this.running++;
    }
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          return resolve(await task());
        } catch (err) {
          reject(err);
        }
      });
      process.nextTick(this.next.bind(this));
    });
  }
}
