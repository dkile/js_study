import { promises as fsPromises } from "fs";
import { dirname } from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename, getPageLinks } from "./utils.js";
import { promisify } from "util";
import { TaskQueue } from "./taskQueue.js";

const mkdirpPromises = promisify(mkdirp);

const spiderLinks = (currentUrl, content, nesting, queue) => {
  if (nesting === 0) {
    return Promise.resolve();
  }

  const links = getPageLinks(currentUrl, content);
  const promises = links.map((link) => spiderTask(link, nesting - 1, queue));
  return Promise.all(promises);
};

const download = (url, filename) => {
  console.log(`Downloading ${url} into ${filename}`);
  let content;
  return superagent
    .get(url)
    .then((res) => {
      content = res.text;
      return mkdirpPromises(dirname(filename));
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`);
      return content;
    });
};

const spidering = new Set();
function spiderTask(url, nesting, queue) {
  if (spidering.has(url)) {
    return Promise.resolve();
  }
  spidering.add(url);

  const filename = urlToFilename(url);
  return queue
    .runTask(() => {
      return fsPromises.readFile(filename, "utf8").catch((err) => {
        if (err !== "ENOENT") {
          throw err;
        }

        return download(url, filename);
      });
    })
    .then((content) => spiderLinks(url, content, nesting, queue));
}

export function spider(url, nesting, concurrency) {
  const queue = new TaskQueue(concurrency);
  return spiderTask(url, nesting, queue);
}
