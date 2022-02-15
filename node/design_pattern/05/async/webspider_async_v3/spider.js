import { promises as fsPromises } from "fs";
import { dirname } from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename, getPageLinks } from "./utils.js";
import { promisify } from "util";

const mkdirpPromises = promisify(mkdirp);

const spiderLinks = async (currentUrl, content, nesting) => {
  if (nesting === 0) {
    return;
  }

  const links = getPageLinks(currentUrl, content);
  const promises = links.map((link) => spider(link, nesting - 1));
  // for (const promise of promises) {
  //   await promise;
  // }
  return Promise.all(promises);
};

export const download = async (url, filename) => {
  console.log(`Downloading ${url} into ${filename}`);
  const { text: content } = await superagent.get(url);
  await mkdirpPromises(dirname(filename));
  await fsPromises.writeFile(filename, content);
  console.log(`Downloaded and saved: ${url}`);
  return content;
};

export function spider(url, nesting) {
  const filename = urlToFilename(url);
  let content;
  try {
    content = await fsPromises.readFile(filename, "utf8");
  } catch (err) {
    if (err !== "ENOENT") {
      throw err;
    }

    content = await download(url, filename);
  }

  return spiderLinks(url, content, nesting);
}
