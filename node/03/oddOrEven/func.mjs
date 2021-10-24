/**
 * ES2015 자바스크립트 자체 모듈 시스템
 * 파일 확장자를 mjs로 해야한다.
 */
import { odd, even } from "./var";

// 숫자가 홀수인지 짝수인지 판별
const checkOddOrEven = (num) => (num % 2 ? odd : even);

export default checkOddOrEven;
