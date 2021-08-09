function* infinity(i) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

function* odd(l) {
  for (const n of limit(l, infinity(1))) {
    if (n % 2) yield n;
  }
}

let iter2 = odd(40);
for (const number of iter2) {
  log(number);
}
