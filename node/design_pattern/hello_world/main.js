import { createRequire } from "module";
const require = createRequire(import.meta.url);
console.log(import.meta.url);
const json = require("./package.json");

const SUPPORTED_LANGUAGES = ["el", "en", "es", "it", "pl"];
const selectedLanguage = process.argv[2];

console.log(json);

if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
  console.error("the specified language is not supported");
  process.exit(1);
}

const translateModule = `./strings-${selectedLanguage}.js`;
import(translateModule).then((strings) => {
  console.log(strings.HELLO);
});
