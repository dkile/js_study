const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

const add = (a, b) => a + b;

const range = (l) => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

/**
 * Test
 */
// const list = range(10000000);
// console.log(reduce(add, list));

// const l_list = L.range(10000000);
// console.log(reduce(add, l_list));

/**
 * L.map
 */
// L.map = curry(function* (f, iter) {
//   iter = iter[Symbol.iterator]();
//   let cur;
//   while (!(cur = iter.next()).done) {
//     const a = cur.value;
//     yield f(a);
//   }
// });
L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const take = (l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
};

const join = curry((sep = ",", iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
);

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join("&")
);
//console.log(queryStr({ limit: "10", offset: "10", type: "notice" }));
const takeAll = take(Infinity);

const isIterable = (a) => a && a[Symbol.iterator];
//yield* iterable == for (const val of iterable) yield val
L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      //for (const b of a) yield b;
      yield* a;
    } else yield a;
  }
};

const flatten = pipe(L.flatten, takeAll);

L.deepFlat = function* f(iter) {
  for (const a of iter)
    if (isIterable(a)) yield* f(a);
    else yield a;
};

L.flatMap = curry(pipe(L.map, L.flatten));

const flatMap = curry(pipe(L.flatMap, flatten));
