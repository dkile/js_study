module.exports = (message) => {
  console.log(`logger2 info: ${message}`);
};

module.exports.verbose = (message) => {
  console.log(`logger2 verbose: ${message}`);
};
