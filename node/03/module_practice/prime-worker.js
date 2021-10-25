/**
 * 소수의 개수 구하기(single thread vs worker thread)
 */

// single thread
const min = 2;
const max = 10000000;

const generatePrimes = (start, range) => {
  let isPrime = true;
  const end = start + range;
  const primes = [];

  for (let i = start; i < end; i++) {
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i !== j && i % j == 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
  return primes;
};
// console.time("prime");
// const primes_single = generatePrimes(min, max - min);
// console.timeEnd("prime");
// console.log(primes_single.length);

// worker threads
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  const threadCount = 8;
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  let primes_worker = [];
  console.time("prime");
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(
      new Worker(__filename, { workerData: { start: wStart, range } })
    );
    start += range;
  }
  threads.add(
    new Worker(__filename, {
      workerData: { start, range: range + ((max - min + 1) % threadCount) },
    })
  );
  for (const worker of threads) {
    worker.on("error", (err) => {
      console.log(err);
    });
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd("prime");
        console.log(primes_worker.length);
      }
    });
    worker.on("message", (msg) => {
      primes_worker = primes_worker.concat(msg);
    });
  }
} else {
  const primes = generatePrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
