const logger = require("./logger");
const logger2 = require("./logger2");

console.log(logger);
console.log(logger2);
logger.info("logger info message");
logger.verbose("logger verbose message");
logger2("logger2 message");
logger2.verbose("logger2 verbose message");
