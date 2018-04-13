import { readOnly, map as map_1, range, singleton as singleton_1, collect, delay } from "../fable-core/Seq";
import { ofArray as ofArray_1 } from "../fable-core/List";
import List from "../fable-core/List";
import { getValue, makeSome } from "../fable-core/Option";
import { compare } from "../fable-core/Util";
export function length(arr) {
  return arr.length | 0;
}
export function get(arr, n) {
  return arr[n];
}
export function set(arr, n, x) {
  arr[n] = x;
}
export function create(n, x) {
  return Array.from(delay(function () {
    return collect(function (matchValue) {
      return singleton_1(x);
    }, range(1, n));
  }));
}
export function init(n, f) {
  return Array.from(delay(function () {
    return map_1(function (i) {
      return f(i);
    }, range(0, n - 1));
  }));
}
export function blit(arr1, start1, arr2, start2, len) {
  if (start1 < 0) {
    throw new Error("index must be positive" + "\nParameter name: " + "start1");
  }

  if (start2 < 0) {
    throw new Error("index must be positive" + "\nParameter name: " + "start2");
  }

  if (len < 0) {
    throw new Error("length must be positive" + "\nParameter name: " + "len");
  }

  if (start1 + len > length(arr1)) {
    throw new Error("(start1+len) out of range" + "\nParameter name: " + "start1");
  }

  if (start2 + len > length(arr2)) {
    throw new Error("(start2+len) out of range" + "\nParameter name: " + "start2");
  }

  for (let i = 0; i <= len - 1; i++) {
    arr2[start2 + i] = arr1[start1 + i];
  }
}
export function concat(arrs) {
  return Array.from(delay(function () {
    return collect(function (arr) {
      return map_1(function (x) {
        return x;
      }, arr);
    }, arrs);
  }));
}
export function append(arr1, arr2) {
  return concat(ofArray_1([arr1, arr2]));
}
export function sub(arr, start, len) {
  if (start < 0) {
    throw new Error("index must be positive" + "\nParameter name: " + "start");
  }

  if (len < 0) {
    throw new Error("length must be positive" + "\nParameter name: " + "len");
  }

  if (start + len > length(arr)) {
    throw new Error("length must be positive" + "\nParameter name: " + "len");
  }

  return Array.from(delay(function () {
    return map_1(function (i) {
      return arr[i];
    }, range(start, start + len - 1));
  }));
}
export function fill(arr, start, len, x) {
  if (start < 0) {
    throw new Error("index must be positive" + "\nParameter name: " + "start");
  }

  if (len < 0) {
    throw new Error("length must be positive" + "\nParameter name: " + "len");
  }

  if (start + len > length(arr)) {
    throw new Error("length must be positive" + "\nParameter name: " + "len");
  }

  for (let i = start; i <= start + len - 1; i++) {
    arr[i] = x;
  }
}
export function copy(arr) {
  return Array.from(arr);
}
export function toList(arr) {
  let res = new List();

  for (let i = length(arr) - 1; i >= 0; i--) {
    res = new List(arr[i], res);
  }

  return res;
}
export function ofList(l) {
  const len = l.length | 0;
  const res = [];

  const add = function (_arg1) {
    if (_arg1.tail != null) {
      res.push(_arg1.head);
      add(_arg1.tail);
    }
  };

  add(l);
  return res;
}
export function iter(f, arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    f(arr[i]);
  }
}
export function map(f, arr) {
  const len = length(arr) | 0;
  const res = [];

  for (let i = 0; i <= len - 1; i++) {
    res.push(f(arr[i]));
  }

  return res;
}
export function mapi(f, arr) {
  const f_1 = f;
  const len = length(arr) | 0;
  const res = [];

  for (let i = 0; i <= len - 1; i++) {
    res.push(f_1(i, arr[i]));
  }

  return res;
}
export function iteri(f, arr) {
  const f_1 = f;

  for (let i = 0; i <= arr.length - 1; i++) {
    f_1(i, arr[i]);
  }
}
export function exists(f, arr) {
  const len = length(arr) | 0;

  const loop = function (i) {
    loop: while (true) {
      if (i < len) {
        if (f(arr[i])) {
          return true;
        } else {
          i = i + 1;
          continue loop;
        }
      } else {
        return false;
      }
    }
  };

  return loop(0);
}
export function forall(f, arr) {
  const len = length(arr) | 0;

  const loop = function (i) {
    loop: while (true) {
      if (i >= len) {
        return true;
      } else if (f(arr[i])) {
        i = i + 1;
        continue loop;
      } else {
        return false;
      }
    }
  };

  return loop(0);
}
export function indexNotFound() {
  throw new Error("An index satisfying the predicate was not found in the collection");
}
export function find(f, arr) {
  const loop = function (i) {
    loop: while (true) {
      if (i >= length(arr)) {
        return indexNotFound();
      } else if (f(arr[i])) {
        return arr[i];
      } else {
        i = i + 1;
        continue loop;
      }
    }
  };

  return loop(0);
}
export function tryPick(f, arr) {
  const loop = function (i) {
    loop: while (true) {
      if (i >= length(arr)) {
        return null;
      } else {
        const matchValue = f(arr[i]);

        if (matchValue == null) {
          i = i + 1;
          continue loop;
        } else {
          return matchValue;
        }
      }
    }
  };

  return loop(0);
}
export function tryFind(f, arr) {
  const loop = function (i) {
    loop: while (true) {
      if (i >= length(arr)) {
        return null;
      } else if (f(arr[i])) {
        return makeSome(arr[i]);
      } else {
        i = i + 1;
        continue loop;
      }
    }
  };

  return loop(0);
}
export function iter2(f, arr1, arr2) {
  const f_1 = f;
  const len1 = length(arr1) | 0;

  if (len1 !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  for (let i = 0; i <= len1 - 1; i++) {
    f_1(arr1[i], arr2[i]);
  }
}
export function map2(f, arr1, arr2) {
  const f_1 = f;
  const len1 = length(arr1) | 0;

  if (len1 !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  const res = [];

  for (let i = 0; i <= len1 - 1; i++) {
    res.push(f_1(arr1[i], arr2[i]));
  }

  return res;
}
export function choose(f, arr) {
  const res = [];

  for (let i = 0; i <= length(arr) - 1; i++) {
    const matchValue = f(arr[i]);

    if (matchValue != null) {
      res.push(getValue(matchValue));
    }
  }

  return res;
}
export function filter(f, arr) {
  const res = [];

  for (let i = 0; i <= length(arr) - 1; i++) {
    const x = arr[i];

    if (f(x)) {
      res.push(x);
    }
  }

  return res;
}
export function partition(f, arr) {
  const res1 = [];
  const res2 = [];

  for (let i = 0; i <= length(arr) - 1; i++) {
    const x = arr[i];

    if (f(x)) {
      res1.push(x);
    } else {
      res2.push(x);
    }
  }

  return [res1, res2];
}
export function rev(arr) {
  const len = length(arr) | 0;
  const res = [];

  for (let i = len - 1; i >= 0; i--) {
    res.push(arr[i]);
  }

  return res;
}
export function foldBack(f, arr, acc) {
  let res = acc;
  const len = length(arr) | 0;

  for (let i = len - 1; i >= 0; i--) {
    res = f(get(arr, i), res);
  }

  return res;
}
export function fold(f, acc, arr) {
  let res = acc;
  const len = length(arr) | 0;

  for (let i = 0; i <= len - 1; i++) {
    res = f(res, get(arr, i));
  }

  return res;
}
export function toArray(arr) {
  return Array.from(arr);
}
export function ofArray(arr) {
  return Array.from(arr);
}
export function toSeq(arr) {
  return readOnly(arr);
}
export function sort(f, arr) {
  arr.sort($var1 => $var2 => function (delegateArg0, delegateArg1) {
    return f(delegateArg0, delegateArg1);
  }($var1, $var2));
}
export function sortBy(f, arr) {
  arr.sort($var5 => $var6 => function (x, y) {
    return compare(f(x), f(y));
  }($var5, $var6));
}
export function exists2(f, arr1, arr2) {
  const len1 = length(arr1) | 0;

  if (len1 !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  const loop = function (i) {
    loop: while (true) {
      if (i < len1) {
        if (f(arr1[i], arr2[i])) {
          return true;
        } else {
          i = i + 1;
          continue loop;
        }
      } else {
        return false;
      }
    }
  };

  return loop(0);
}
export function findIndex(f, arr) {
  const go = function (n) {
    go: while (true) {
      if (n >= length(arr)) {
        return indexNotFound() | 0;
      } else if (f(arr[n])) {
        return n | 0;
      } else {
        n = n + 1;
        continue go;
      }
    }
  };

  return go(0) | 0;
}
export function findIndexi(f, arr) {
  const go = function (n) {
    go: while (true) {
      if (n >= length(arr)) {
        return indexNotFound() | 0;
      } else if (f(n, arr[n])) {
        return n | 0;
      } else {
        n = n + 1;
        continue go;
      }
    }
  };

  return go(0) | 0;
}
export function foldSub(f, acc, arr, start, fin) {
  let res = acc;

  for (let i = start; i <= fin; i++) {
    res = f(res, arr[i]);
  }

  return res;
}
export function foldBackSub(f, arr, start, fin, acc) {
  let res = acc;

  for (let i = fin; i >= start; i--) {
    res = f(arr[i], res);
  }

  return res;
}
export function reduce(f, arr) {
  const arrn = length(arr) | 0;

  if (arrn === 0) {
    throw new Error("the input array may not be empty" + "\nParameter name: " + "arr");
  } else {
    return foldSub(f, arr[0], arr, 1, arrn - 1);
  }
}
export function reduceBack(f, arr) {
  const arrn = length(arr) | 0;

  if (arrn === 0) {
    throw new Error("the input array may not be empty" + "\nParameter name: " + "arr");
  } else {
    return foldBackSub(f, arr, 0, arrn - 2, arr[arrn - 1]);
  }
}
export function fold2(f, acc, arr1, arr2) {
  const f_1 = f;
  let res = acc;
  const len = length(arr1) | 0;

  if (len !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  for (let i = 0; i <= len - 1; i++) {
    res = f_1(res, arr1[i], arr2[i]);
  }

  return res;
}
export function foldBack2(f, arr1, arr2, acc) {
  const f_1 = f;
  let res = acc;
  const len = length(arr1) | 0;

  if (len !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  for (let i = len - 1; i >= 0; i--) {
    res = f_1(arr1[i], arr2[i], res);
  }

  return res;
}
export function forall2(f, arr1, arr2) {
  const len1 = length(arr1) | 0;

  if (len1 !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  const loop = function (i) {
    loop: while (true) {
      if (i >= len1) {
        return true;
      } else if (f(arr1[i], arr2[i])) {
        i = i + 1;
        continue loop;
      } else {
        return false;
      }
    }
  };

  return loop(0);
}
export function isEmpty(arr) {
  return length(arr) === 0;
}
export function iteri2(f, arr1, arr2) {
  const f_1 = f;
  const len1 = length(arr1) | 0;

  if (len1 !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  for (let i = 0; i <= len1 - 1; i++) {
    f_1(i, arr1[i], arr2[i]);
  }
}
export function mapi2(f, arr1, arr2) {
  const f_1 = f;
  const len1 = length(arr1) | 0;

  if (len1 !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  return init(len1, function (i) {
    return f_1(i, arr1[i], arr2[i]);
  });
}
export function scanBackSub(f, arr, start, fin, acc) {
  const f_1 = f;
  let state = acc;
  const res = create(2 + fin - start, acc);

  for (let i = fin; i >= start; i--) {
    state = f_1(arr[i], state);
    res[i - start] = state;
  }

  return res;
}
export function scanSub(f, acc, arr, start, fin) {
  const f_1 = f;
  let state = acc;
  const res = create(fin - start + 2, acc);

  for (let i = start; i <= fin; i++) {
    state = f_1(state, arr[i]);
    res[i - start + 1] = state;
  }

  return res;
}
export function scan(f, acc, arr) {
  const arrn = length(arr) | 0;
  return scanSub(f, acc, arr, 0, arrn - 1);
}
export function scanBack(f, arr, acc) {
  const arrn = length(arr) | 0;
  return scanBackSub(f, arr, 0, arrn - 1, acc);
}
export function singleton(x) {
  const res = [];
  res.push(x);
  return res;
}
export function tryFindIndex(f, arr) {
  const go = function (n) {
    go: while (true) {
      if (n >= length(arr)) {
        return null;
      } else if (f(arr[n])) {
        return n;
      } else {
        n = n + 1;
        continue go;
      }
    }
  };

  return go(0);
}
export function tryFindIndexi(f, arr) {
  const go = function (n) {
    go: while (true) {
      if (n >= length(arr)) {
        return null;
      } else if (f(n, arr[n])) {
        return n;
      } else {
        n = n + 1;
        continue go;
      }
    }
  };

  return go(0);
}
export function zip(arr1, arr2) {
  const len1 = length(arr1) | 0;

  if (len1 !== length(arr2)) {
    throw new Error("the arrays have different lengths" + "\nParameter name: " + "arr2");
  }

  return init(len1, function (i) {
    return [arr1[i], arr2[i]];
  });
}
export function unzip(arr) {
  const len = length(arr) | 0;
  const res1 = [];
  const res2 = [];

  for (let i = 0; i <= len - 1; i++) {
    const patternInput = arr[i];
    res1.push(patternInput[0]);
    res2.push(patternInput[1]);
  }

  return [res1, res2];
}