const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduceF = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e == nop ? acc : Promise.reject(e))
      )
    : f(acc, a);

const head = (iter) => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
  if (!iter) acc = head((iter = acc[Symbol.iterator]()));
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
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

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield go1(a, f);
  }
});

const nop = Symbol("nop");

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise)
      yield b.then((b) => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  // return (function recur() {
  //   var _iteratorNormalCompletion = true;
  //   var _didIteratorError = false;
  //   var _iteratorError = undefined;

  //   try {
  //     for (
  //       var _iterator = iter[Symbol.iterator](), _step;
  //       !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
  //       _iteratorNormalCompletion = true
  //     ) {
  //       var _a = _step.value;
  //       if (_a instanceof Promise)
  //         return _a.then((_a) => {
  //           res.push(_a);
  //           return res.length === l ? res : recur();
  //         });
  //       res.push(_a);
  //       if (res.length === l) return res;
  //     }
  //   } catch (err) {
  //     _didIteratorError = true;
  //     _iteratorError = err;
  //   } finally {
  //     try {
  //       if (!_iteratorNormalCompletion && _iterator["return"] != null) {
  //         _iterator["return"]();
  //       }
  //     } finally {
  //       if (_didIteratorError) {
  //         throw _iteratorError;
  //       }
  //     }
  //   }
  //   return res;

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
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      let a = cur.value;
      if (a instanceof Promise)
        return a
          .then((a) => {
            res.push(a);
            return res.length === l ? res : recur();
          })
          .catch((e) => (e == nop ? recur() : Promise.reject(e)));
      res.push(a);
      if (res.length === l) return res;
    }
    return res;
  })();
});

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

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

const C = {};

function noop() {}
const catchNoop = (arr) => (
  arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

C.reduce = curry((f, acc, iter) =>
  iter ? reduce(f, acc, catchNoop([...iter])) : reduce(f, catchNoop([...acc]))
);

C.take = curry((l, iter) => take(l, catchNoop([...iter])));

C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));

C.filter = curry(pipe(L.filter, C.takeAll));

const delay1000 = (a, name) =>
  new Promise((resolve) => {
    console.log("ouside setTime", name);
    setTimeout(() => {
      console.log("inside setTime", name);
      resolve(a);
    }, 100);
  });

function f5(list) {
  return go(
    list,
    L.map((a) => delay1000(a * a, "f5.fmap")),
    L.filter((a) => delay1000(a % 2, "f5.filter")),
    L.map((a) => delay1000(a + 1, "f5.tmap")),
    C.take(2),
    reduce((a, b) => delay1000(a + b, "f5.reduce"))
  );
}

async function f6(list) {
  let temp = [];
  console.log(new Error().stack);
  for (const a of list) {
    const b = await delay1000(a * a, "f6.fmap");
    if (await delay1000(b % 2, "f6.filter")) {
      const c = await delay1000(b + 1, "f6.tmap");
      temp.push(c);
      if (temp.length == 2) break;
    }
  }
  let res = temp[0],
    i = 0;
  while (++i < temp.length) {
    res = await delay1000(res + temp[i], "f6.reduce");
  }
  return res;
}

console.log(go(f5([1, 2, 3, 4, 5, 6, 7, 8]), console.log));

// go(f6([1, 2, 3, 4, 5, 6, 7, 8]), console.log);
// go(f5([1, 2, 3, 4, 5, 6, 7, 8]), (a) => console.log(a, "f5"));
