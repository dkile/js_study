//data

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

//map

function map(f, iter) {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

console.log(map((p) => p.price, products));

//filter

function filter(f, iter) {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
}

console.log(filter((p) => p.price < 20000, products));

//reduce

const add = (a, b) => a + b;

function reduce(f, acc, iter) {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}

console.log(reduce(add, [1, 2, 3, 4, 5]));
