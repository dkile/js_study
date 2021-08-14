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

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  return go1(acc, function recur(acc) {
    for (const a of iter) {
      acc = f(acc, a);
      if (acc instanceof Promise) {
        return acc.then(recur);
      }
    }
    return acc;
  });
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
    yield go1(a, f);
  }
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const take = curry((l, iter) => {
  let res = [];
  return (function recur() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = iter[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var _a = _step.value;
        if (_a instanceof Promise)
          return _a.then((_a) => {
            res.push(_a);
            return res.length === l ? res : recur();
          });
        res.push(_a);
        if (res.length === l) return res;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    return res;
    //   for (const a of iter) {
    //     if (a instanceof Promise)
    //       return a.then((a) => {
    //         res.push(a);
    //         return res.length === l ? res : recur();
    //       });
    //     res.push(a);
    //     if (res.length === l) return res;
    //   }
    //   return res;
    // })();
    // return (function recur() {
    //   let cur;
    //   while (!(cur = iter.next()).done) {
    //     let a = cur.value;
    //     if (a instanceof Promise)
    //       return a.then((a) => {
    //         res.push(a);
    //         return res.length === l ? res : recur();
    //       });
    //     res.push(a);
    //     if (res.length === l) return res;
    //   }
    //   return res;
    // })();
  })();
});

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

// go(
//   1,
//   (a) => a + 10,
//   (a) => Promise.resolve(a + 100),
//   (a) => a + 1000,
//   (a) => a + 10000,
//   console.log
// );

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  console.log
);
