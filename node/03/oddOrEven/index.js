const { odd, even } = require("./var");
const checkNumber = require("./func");

// string의 길이가 홀수인지 짝수인지 판별
const checkStringOddOrEven = (str) => (str.length % 2 ? odd : even);

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
