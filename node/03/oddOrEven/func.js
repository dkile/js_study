const { odd, even } = module.require("./var");

// 숫자가 홀수인지 짝수인지 판별
const checkOddOrEven = (num) => (num % 2 ? odd : even);

module.exports = checkOddOrEven;
