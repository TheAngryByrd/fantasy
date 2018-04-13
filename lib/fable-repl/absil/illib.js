import { createFromValue } from "../fable-core/Lazy";
import Lazy_1 from "../fable-core/Lazy";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { createAtom, equalsRecords, hash, makeGeneric, Any, Function as _Function, compareUnions, equals, comparePrimitives, compare, GenericParam } from "../fable-core/Util";
import { map as map_3 } from "../fable-core/Array";
import { singleton as singleton_1, collect as collect_1, delay as delay_2, map as map_5, foldBack as foldBack_2, takeWhile, tryHead, exists as exists_1, forAll, iterate, map2, mapFold as mapFold_2, fold as fold_2, zip3, zip, sortWith, toList as toList_1, range as range_4, forAll2 } from "../fable-core/Seq";
import { singleton } from "../fable-core/AsyncBuilder";
import { makeSome, getValue } from "../fable-core/Option";
import { choose, filter, mapIndexed, collect, concat, unzip, unzip3, append, map as map_4, ofArray, reverse } from "../fable-core/List";
import List_1 from "../fable-core/List";
import Choice from "../fable-core/Choice";
import { indexOfAny, isNullOrWhiteSpace, split as split_1, trim as trim_1, isNullOrEmpty, printf } from "../fable-core/String";
import { System, Microsoft } from "../fcs-fable/adapters";
import { parse } from "../fable-core/Int32";
import { exists as exists_2, isEmpty as isEmpty_1, filter as filter_1, iterate as iterate_1, map as map_6, find as find_3, groupBy, add as add_3, foldBack as foldBack_1, tryGetValue, create, tryFind as tryFind_1 } from "../fable-core/Map";
import { isCancellationRequested } from "../fable-core/Async";
import { fromEqualityComparer } from "../fable-core/Comparer";
import Comparer from "../fable-core/Comparer";
import CurriedLambda from "../fable-core/CurriedLambda";
export function op_GreaterGreaterGreaterAmp(x, n) {
  return ~~(x >>> 0 >>> n) | 0;
}
export function notlazy(v) {
  return createFromValue(v);
}
export class InlineDelayInit {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.InlineDelayInit",
      properties: {
        Value: GenericParam("T")
      }
    };
  }

  constructor(f) {
    this.store = new Lazy_1(() => f());
  }

  get Value() {
    return this.store.value;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.InlineDelayInit", InlineDelayInit);
export function foldOn(p, f, z, x) {
  return f(z, p(x));
}
export function notFound() {
  throw new Error();
}
export const Order = function (__exports) {
  const orderBy = __exports.orderBy = function (p) {
    return {
      Compare(x, xx) {
        return compare(p(x), p(xx)) | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IComparer"]
        };
      }

    };
  };

  const orderOn = __exports.orderOn = function (p, pxOrder) {
    return {
      Compare(x, xx) {
        return pxOrder.Compare(p(x), p(xx)) | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IComparer"]
        };
      }

    };
  };

  const toFunction = __exports.toFunction = function (pxOrder, x, y) {
    return pxOrder.Compare(x, y) | 0;
  };

  return __exports;
}({});

const _Array = function (__exports) {
  const mapq = __exports.mapq = function (f, inp) {
    if (inp.length === 0) {
      return inp;
    } else {
      const res = map_3(f, inp, Array);
      const len = inp.length | 0;
      let eq = true;
      let i = 0;

      while (eq ? i < len : false) {
        if (!(inp[i] === res[i])) {
          eq = false;
        }

        i = i + 1 | 0;
      }

      if (eq) {
        return inp;
      } else {
        return res;
      }
    }
  };

  const lengthsEqAndForall2 = __exports.lengthsEqAndForall2 = function (p, l1, l2) {
    if (l1.length === l2.length) {
      return forAll2(p, l1, l2);
    } else {
      return false;
    }
  };

  const order = __exports.order = function (eltOrder) {
    return {
      Compare(xs, ys) {
        const c = comparePrimitives(xs.length, ys.length) | 0;

        if (c !== 0) {
          return c | 0;
        } else {
          const loop = i => {
            loop: while (true) {
              if (i >= xs.length) {
                return 0;
              } else {
                const c_1 = eltOrder.Compare(xs[i], ys[i]) | 0;

                if (c_1 !== 0) {
                  return c_1 | 0;
                } else {
                  i = i + 1;
                  continue loop;
                }
              }
            }
          };

          return loop(0) | 0;
        }
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IComparer"]
        };
      }

    };
  };

  const existsOne = __exports.existsOne = function (p, l) {
    const forallFrom = function ($var21, $var22, $var23) {
      forallFrom: while (true) {
        const p_1 = $var21;
        const l_1 = $var22;
        const n = $var23;

        if (n >= l_1.length) {
          return true;
        } else if (p_1(l_1[n])) {
          $var21 = p_1;
          $var22 = l_1;
          $var23 = n + 1;
          continue forallFrom;
        } else {
          return false;
        }
      }
    };

    const loop = function ($var24, $var25, $var26) {
      loop: while (true) {
        const p_2 = $var24;
        const l_2 = $var25;
        const n_1 = $var26;

        if (n_1 < l_2.length) {
          if (p_2(l_2[n_1])) {
            return forallFrom(function (x) {
              return !p_2(x);
            }, l_2, n_1 + 1);
          } else {
            $var24 = p_2;
            $var25 = l_2;
            $var26 = n_1 + 1;
            continue loop;
          }
        } else {
          return false;
        }
      }
    };

    return loop(p, l, 0);
  };

  const findFirstIndexWhereTrue = __exports.findFirstIndexWhereTrue = function (arr, p) {
    const look = function (lo, hi) {
      look: while (true) {
        if (lo === hi) {
          return lo | 0;
        } else {
          const i = ~~((lo + hi) / 2) | 0;

          if (p(arr[i])) {
            if (i === 0) {
              return i | 0;
            } else if (p(arr[i - 1])) {
              lo = lo;
              hi = i;
              continue look;
            } else {
              return i | 0;
            }
          } else {
            lo = i + 1;
            hi = hi;
            continue look;
          }
        }
      }
    };

    return look(0, arr.length) | 0;
  };

  const revInPlace = __exports.revInPlace = function (array) {
    if (array.length === 0) {} else {
      const patternInput = [array.length - 1, ~~(array.length / 2) - 1];

      for (let idx = 0; idx <= patternInput[1]; idx++) {
        const t1 = array[idx];
        const t2 = array[patternInput[0] - idx];
        array[idx] = t2;
        array[patternInput[0] - idx] = t1;
      }
    }
  };

  const mapAsync = __exports.mapAsync = function (mapping, array) {
    const len = array.length | 0;
    const result = new Array(len).fill(null);
    return function (builder_) {
      return builder_.Delay(function () {
        return builder_.Combine(builder_.For(range_4(0, len - 1), function (_arg1) {
          return builder_.Bind(mapping(array[_arg1]), function (_arg2) {
            result[_arg1] = _arg2;
            return builder_.Zero();
          });
        }), builder_.Delay(function () {
          return builder_.Return(result);
        }));
      });
    }(singleton);
  };

  const replace = __exports.replace = function (index, value, array) {
    if (index >= array.length) {
      throw new Error("index");
    }

    const res = array.slice();
    res[index] = value;
    return res;
  };

  const heads = __exports.heads = function (array) {
    const res = new Array(array.length).fill(null);

    for (let i = array.length - 1; i >= 0; i--) {
      res[i] = array.slice(0, i + 1);
    }

    return res;
  };

  const startsWith = __exports.startsWith = function (prefix, whole) {
    if (prefix == null ? true : whole == null) {
      return false;
    } else if (prefix.length === 0) {
      return true;
    } else if (prefix.length > whole.length) {
      return false;
    } else if (prefix.length === whole.length) {
      const matchValue = [prefix, whole];
      const $var1 = matchValue[0] == null ? matchValue[1] == null ? [0] : matchValue[0].length === 0 ? matchValue[1].length === 0 ? [1] : [2] : [2] : matchValue[0].length === 0 ? matchValue[1].length === 0 ? [1] : matchValue[1] == null ? [2] : prefix.length !== whole.length ? [3] : [4] : matchValue[1] == null ? [2] : prefix.length !== whole.length ? [3] : [4];

      switch ($var1[0]) {
        case 0:
          return true;

        case 1:
          return true;

        case 2:
          return false;

        case 3:
          return false;

        case 4:
          let break_ = false;
          let i = 0;
          let result = true;

          while (i < prefix.length ? !break_ : false) {
            if (!equals(prefix[i], whole[i])) {
              break_ = true;
              result = false;
            }

            i = i + 1 | 0;
          }

          return result;
      }
    } else {
      const loop = function (subidx, idx) {
        loop: while (true) {
          if (subidx === prefix.length) {
            return true;
          } else if (equals(prefix[subidx], whole[idx])) {
            subidx = subidx + 1;
            idx = idx + 1;
            continue loop;
          } else {
            return false;
          }
        }
      };

      return loop(0, 0);
    }
  };

  const endsWith = __exports.endsWith = function (suffix, whole) {
    if (suffix == null ? true : whole == null) {
      return false;
    } else if (suffix.length === 0) {
      return true;
    } else if (suffix.length > whole.length) {
      return false;
    } else if (suffix.length === whole.length) {
      const matchValue = [suffix, whole];
      const $var2 = matchValue[0] == null ? matchValue[1] == null ? [0] : matchValue[0].length === 0 ? matchValue[1].length === 0 ? [1] : [2] : [2] : matchValue[0].length === 0 ? matchValue[1].length === 0 ? [1] : matchValue[1] == null ? [2] : suffix.length !== whole.length ? [3] : [4] : matchValue[1] == null ? [2] : suffix.length !== whole.length ? [3] : [4];

      switch ($var2[0]) {
        case 0:
          return true;

        case 1:
          return true;

        case 2:
          return false;

        case 3:
          return false;

        case 4:
          let break_ = false;
          let i = 0;
          let result = true;

          while (i < suffix.length ? !break_ : false) {
            if (!equals(suffix[i], whole[i])) {
              break_ = true;
              result = false;
            }

            i = i + 1 | 0;
          }

          return result;
      }
    } else {
      const loop = function (subidx, idx) {
        loop: while (true) {
          if (subidx === suffix.length) {
            return true;
          } else if (equals(suffix[subidx], whole[idx])) {
            subidx = subidx + 1;
            idx = idx + 1;
            continue loop;
          } else {
            return false;
          }
        }
      };

      return loop(0, whole.length - suffix.length);
    }
  };

  return __exports;
}({});

export { _Array as Array };
export const Option = function (__exports) {
  const mapFold = __exports.mapFold = function (f, s, opt) {
    if (opt != null) {
      const patternInput = f(s, getValue(opt));
      return [makeSome(patternInput[0]), patternInput[1]];
    } else {
      return [null, s];
    }
  };

  const attempt = __exports.attempt = function (f) {
    try {
      return makeSome(f());
    } catch (matchValue) {
      return null;
    }
  };

  return __exports;
}({});
export const List = function (__exports) {
  const sortWithOrder = __exports.sortWithOrder = function (c, elements) {
    return toList_1(sortWith(function (x, y) {
      return Order.toFunction(c, x, y);
    }, elements));
  };

  const splitAfter = __exports.splitAfter = function (n, l) {
    const split_after_acc = function (n_1, l1, l2) {
      split_after_acc: while (true) {
        if (n_1 <= 0) {
          return [reverse(l1), l2];
        } else {
          n_1 = n_1 - 1;
          l1 = new List_1(l2.head, l1);
          l2 = l2.tail;
          continue split_after_acc;
        }
      }
    };

    return split_after_acc(n, new List_1(), l);
  };

  const existsi = __exports.existsi = function (f, xs) {
    const loop = function (i, xs_1) {
      loop: while (true) {
        if (xs_1.tail != null) {
          if (f(i, xs_1.head)) {
            return true;
          } else {
            i = i + 1;
            xs_1 = xs_1.tail;
            continue loop;
          }
        } else {
          return false;
        }
      }
    };

    return loop(0, xs);
  };

  const lengthsEqAndForall2_1 = __exports.lengthsEqAndForall2 = function (p, l1, l2) {
    if (l1.length === l2.length) {
      return forAll2(p, l1, l2);
    } else {
      return false;
    }
  };

  const findi = __exports.findi = function ($var40, $var41, $var42) {
    findi: while (true) {
      const n = $var40;
      const f = $var41;
      const l = $var42;

      if (l.tail != null) {
        if (f(l.head)) {
          return [l.head, n];
        } else {
          $var40 = n + 1;
          $var41 = f;
          $var42 = l.tail;
          continue findi;
        }
      } else {
        return null;
      }
    }
  };

  const chop = __exports.chop = function (n, l) {
    if (n === l.length) {
      return [l, new List_1()];
    } else {
      const loop = function (n_1, l_1, acc) {
        loop: while (true) {
          if (n_1 <= 0) {
            return [reverse(acc), l_1];
          } else if (l_1.tail != null) {
            n_1 = n_1 - 1;
            const $var43 = l_1.tail;
            acc = new List_1(l_1.head, acc);
            l_1 = $var43;
            continue loop;
          } else {
            throw new Error("List.chop: overchop");
          }
        }
      };

      return loop(n, l, new List_1());
    }
  };

  const take = __exports.take = function (n, l) {
    if (n === l.length) {
      return l;
    } else {
      const loop = function (acc, n_1, l_1) {
        loop: while (true) {
          if (l_1.tail != null) {
            if (n_1 <= 0) {
              return reverse(acc);
            } else {
              acc = new List_1(l_1.head, acc);
              n_1 = n_1 - 1;
              l_1 = l_1.tail;
              continue loop;
            }
          } else {
            return reverse(acc);
          }
        }
      };

      return loop(new List_1(), n, l);
    }
  };

  const drop = __exports.drop = function (n, l) {
    drop: while (true) {
      if (l.tail != null) {
        if (n === 0) {
          return l;
        } else {
          n = n - 1;
          l = l.tail;
          continue drop;
        }
      } else {
        return new List_1();
      }
    }
  };

  const splitChoose = __exports.splitChoose = function (select, l) {
    const ch = function (acc1, acc2, l_1) {
      ch: while (true) {
        if (l_1.tail != null) {
          const matchValue = select(l_1.head);

          if (matchValue.tag === 1) {
            acc1 = acc1;
            acc2 = new List_1(matchValue.data, acc2);
            l_1 = l_1.tail;
            continue ch;
          } else {
            acc1 = new List_1(matchValue.data, acc1);
            acc2 = acc2;
            l_1 = l_1.tail;
            continue ch;
          }
        } else {
          return [reverse(acc1), reverse(acc2)];
        }
      }
    };

    return ch(new List_1(), new List_1(), l);
  };

  const checkq = __exports.checkq = function (l1, l2) {
    checkq: while (true) {
      const matchValue = [l1, l2];
      const $var3 = matchValue[0].tail != null ? matchValue[1].tail != null ? [0, matchValue[0].head, matchValue[1].head, matchValue[0].tail, matchValue[1].tail] : [1] : [1];

      switch ($var3[0]) {
        case 0:
          if ($var3[1] === $var3[2]) {
            l1 = $var3[3];
            l2 = $var3[4];
            continue checkq;
          } else {
            return false;
          }

        case 1:
          return true;
      }
    }
  };

  const mapq_1 = __exports.mapq = function (f, inp) {
    if (inp.tail != null) {
      if (inp.tail.tail != null) {
        if (inp.tail.tail.tail != null) {
          if (inp.tail.tail.tail.tail == null) {
            const h2a = f(inp.head);
            const h2b = f(inp.tail.head);
            const h2c = f(inp.tail.tail.head);

            if ((inp.head === h2a ? inp.tail.head === h2b : false) ? inp.tail.tail.head === h2c : false) {
              return inp;
            } else {
              return ofArray([h2a, h2b, h2c]);
            }
          } else {
            const res = map_4(f, inp);

            if (checkq(inp, res)) {
              return inp;
            } else {
              return res;
            }
          }
        } else {
          const h2a_1 = f(inp.head);
          const h2b_1 = f(inp.tail.head);

          if (inp.head === h2a_1 ? inp.tail.head === h2b_1 : false) {
            return inp;
          } else {
            return ofArray([h2a_1, h2b_1]);
          }
        }
      } else {
        const h2a_2 = f(inp.head);

        if (inp.head === h2a_2) {
          return inp;
        } else {
          return ofArray([h2a_2]);
        }
      }
    } else {
      return inp;
    }
  };

  const frontAndBack = __exports.frontAndBack = function (l) {
    const loop = function (acc, l_1) {
      loop: while (true) {
        if (l_1.tail != null) {
          if (l_1.tail.tail == null) {
            return [reverse(acc), l_1.head];
          } else {
            acc = new List_1(l_1.head, acc);
            l_1 = l_1.tail;
            continue loop;
          }
        } else {
          throw new Error("empty list" + "\nParameter name: " + "l");
        }
      }
    };

    return loop(new List_1(), l);
  };

  const tryRemove = __exports.tryRemove = function (f, inp) {
    const loop = function (acc, l) {
      loop: while (true) {
        if (l.tail != null) {
          if (f(l.head)) {
            return [l.head, append(reverse(acc), l.tail)];
          } else {
            acc = new List_1(l.head, acc);
            l = l.tail;
            continue loop;
          }
        } else {
          return null;
        }
      }
    };

    return loop(new List_1(), inp);
  };

  const headAndTail = __exports.headAndTail = function (l) {
    if (l.tail != null) {
      return [l.head, l.tail];
    } else {
      throw new Error("List.headAndTail");
    }
  };

  const zip4 = __exports.zip4 = function (l1, l2, l3, l4) {
    return map_4(function (tupledArg) {
      return [tupledArg[0], tupledArg[1][0], tupledArg[1][1], tupledArg[1][2]];
    }, toList_1(zip(l1, toList_1(zip3(l2, l3, l4)))));
  };

  const unzip4 = __exports.unzip4 = function (l) {
    const patternInput = unzip3(map_4(function (tupledArg) {
      return [tupledArg[0], tupledArg[1], [tupledArg[2], tupledArg[3]]];
    }, l));
    const patternInput_1 = unzip(patternInput[2]);
    return [patternInput[0], patternInput[1], patternInput_1[0], patternInput_1[1]];
  };

  const iter3 = __exports.iter3 = function (f, l1, l2, l3) {
    const matchValue = [l1, l2, l3];
    const $var4 = matchValue[0].tail == null ? matchValue[1].tail == null ? matchValue[2].tail == null ? [1] : [2] : [2] : matchValue[1].tail != null ? matchValue[2].tail != null ? [0, matchValue[0].head, matchValue[1].head, matchValue[2].head, matchValue[0].tail, matchValue[1].tail, matchValue[2].tail] : [2] : [2];

    switch ($var4[0]) {
      case 0:
        f($var4[1], $var4[2], $var4[3]);
        iter3(f, $var4[4], $var4[5], $var4[6]);
        break;

      case 1:
        break;

      case 2:
        throw new Error("iter3");
        break;
    }
  };

  const takeUntil = __exports.takeUntil = function (p, l) {
    const loop = function (acc, l_1) {
      loop: while (true) {
        if (l_1.tail != null) {
          if (p(l_1.head)) {
            return [reverse(acc), l_1];
          } else {
            acc = new List_1(l_1.head, acc);
            l_1 = l_1.tail;
            continue loop;
          }
        } else {
          return [reverse(acc), new List_1()];
        }
      }
    };

    return loop(new List_1(), l);
  };

  const order_1 = __exports.order = function (eltOrder) {
    return {
      Compare(xs, ys) {
        const loop = (xs_1, ys_1) => {
          loop: while (true) {
            const matchValue = [xs_1, ys_1];

            if (matchValue[0].tail != null) {
              if (matchValue[1].tail != null) {
                const cxy = eltOrder.Compare(matchValue[0].head, matchValue[1].head) | 0;

                if (cxy === 0) {
                  xs_1 = matchValue[0].tail;
                  ys_1 = matchValue[1].tail;
                  continue loop;
                } else {
                  return cxy | 0;
                }
              } else {
                return 1;
              }
            } else if (matchValue[1].tail == null) {
              return 0;
            } else {
              return -1 | 0;
            }
          }
        };

        return loop(xs, ys) | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IComparer"]
        };
      }

    };
  };

  const FrontAndBack = __exports.FrontAndBack = function (__exports) {
    const _NonEmpty_Empty_ = __exports["|NonEmpty|Empty|"] = function (l) {
      if (l.tail == null) {
        return new Choice(1, null);
      } else {
        return new Choice(0, frontAndBack(l));
      }
    };

    return __exports;
  }({});

  const range = __exports.range = function (n, m) {
    return toList_1(range_4(n, m));
  };

  const indexNotFound = __exports.indexNotFound = function () {
    throw new Error("An index satisfying the predicate was not found in the collection");
  };

  const assoc = __exports.assoc = function (x, l) {
    assoc: while (true) {
      if (l.tail != null) {
        const r = l.head[1];
        const h = l.head[0];

        if (equals(x, h)) {
          return r;
        } else {
          x = x;
          l = l.tail;
          continue assoc;
        }
      } else {
        return indexNotFound();
      }
    }
  };

  const memAssoc = __exports.memAssoc = function (x, l) {
    memAssoc: while (true) {
      if (l.tail != null) {
        const h = l.head[0];

        if (equals(x, h)) {
          return true;
        } else {
          x = x;
          l = l.tail;
          continue memAssoc;
        }
      } else {
        return false;
      }
    }
  };

  const memq = __exports.memq = function (x, l) {
    memq: while (true) {
      if (l.tail != null) {
        if (x === l.head) {
          return true;
        } else {
          x = x;
          l = l.tail;
          continue memq;
        }
      } else {
        return false;
      }
    }
  };

  const mapNth = __exports.mapNth = function (n, f, xs) {
    const mn = function (i, _arg1) {
      if (_arg1.tail != null) {
        if (i === n) {
          return new List_1(f(_arg1.head), _arg1.tail);
        } else {
          return new List_1(_arg1.head, mn(i + 1, _arg1.tail));
        }
      } else {
        return new List_1();
      }
    };

    return mn(0, xs);
  };

  const count = __exports.count = function (pred, xs) {
    return fold_2(function (n, x) {
      return pred(x) ? n + 1 : n;
    }, 0, xs) | 0;
  };

  const mapHeadTail = __exports.mapHeadTail = function (fhead, ftail, _arg1) {
    if (_arg1.tail != null) {
      if (_arg1.tail.tail == null) {
        return ofArray([fhead(_arg1.head)]);
      } else {
        return new List_1(fhead(_arg1.head), map_4(ftail, _arg1.tail));
      }
    } else {
      return new List_1();
    }
  };

  const collectFold = __exports.collectFold = function (f, s, l) {
    const patternInput = mapFold_2(f, s, l, ofArray);
    return [concat(patternInput[0]), patternInput[1]];
  };

  const collect2 = __exports.collect2 = function (f, xs, ys) {
    return concat(toList_1(map2(f, xs, ys)));
  };

  const toArraySquared = __exports.toArraySquared = function (xss) {
    return Array.from(map_4(function (list) {
      return Array.from(list);
    }, xss));
  };

  const iterSquared = __exports.iterSquared = function (f, xss) {
    iterate(function (list) {
      iterate(f, list);
    }, xss);
  };

  const collectSquared = __exports.collectSquared = function (f, xss) {
    return collect(function (list) {
      return collect(f, list);
    }, xss);
  };

  const mapSquared = __exports.mapSquared = function (f, xss) {
    return map_4(function (list) {
      return map_4(f, list);
    }, xss);
  };

  const mapFoldSquared = __exports.mapFoldSquared = function (f, z, xss) {
    return mapFold_2(function (state, list) {
      return mapFold_2(f, state, list, ofArray);
    }, z, xss, ofArray);
  };

  const forallSquared = __exports.forallSquared = function (f, xss) {
    return forAll(function (list) {
      return forAll(f, list);
    }, xss);
  };

  const mapiSquared = __exports.mapiSquared = function (f, xss) {
    return mapIndexed(function (i, xs) {
      return mapIndexed(function (j, x) {
        return f(i, j, x);
      }, xs);
    }, xss);
  };

  const existsSquared = __exports.existsSquared = function (f, xss) {
    return exists_1(function (xs) {
      return exists_1(function (x) {
        return f(x);
      }, xs);
    }, xss);
  };

  const mapiFoldSquared = __exports.mapiFoldSquared = function (f, z, xss) {
    return mapFoldSquared(f, z, mapiSquared(function (i, j, x) {
      return [i, j, x];
    }, xss));
  };

  return __exports;
}({});
export class ValueOption {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.ValueOption",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["VSome", GenericParam("T")], ["VNone"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get IsSome() {
    const matchValue = this;

    if (matchValue.tag === 1) {
      return false;
    } else {
      return true;
    }
  }

  get IsNone() {
    const matchValue = this;

    if (matchValue.tag === 1) {
      return true;
    } else {
      return false;
    }
  }

  get Value() {
    const matchValue = this;

    if (matchValue.tag === 1) {
      throw new Error("ValueOption.Value: value is None");
    } else {
      return matchValue.data;
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.ValueOption", ValueOption);

const _String = function (__exports) {
  const indexNotFound_1 = __exports.indexNotFound = function () {
    throw new Error("An index for the character was not found in the string");
  };

  const make = __exports.make = function (n, c) {
    return printf(c);
  };

  const get = __exports.get = function (str, i) {
    return str[i];
  };

  const sub = __exports.sub = function (s, start, len) {
    return s.substr(start, len);
  };

  const index = __exports.index = function (s, c) {
    const r = s.indexOf(c) | 0;

    if (r === -1) {
      return indexNotFound_1() | 0;
    } else {
      return r | 0;
    }
  };

  const rindex = __exports.rindex = function (s, c) {
    const r = s.lastIndexOf(c) | 0;

    if (r === -1) {
      return indexNotFound_1() | 0;
    } else {
      return r | 0;
    }
  };

  const contains = __exports.contains = function (s, c) {
    return s.indexOf(c) !== -1;
  };

  const order_2 = __exports.order = Microsoft.FSharp.Core.LanguagePrimitives.FastGenericComparer();

  const lowercase = __exports.lowercase = function (s) {
    return s.toLowerCase();
  };

  const uppercase = __exports.uppercase = function (s) {
    return s.toUpperCase();
  };

  const isUpper = __exports.isUpper = function (s) {
    if (s.length >= 1 ? System.Char.IsUpper(s[0]) : false) {
      return !System.Char.IsLower(s[0]);
    } else {
      return false;
    }
  };

  const capitalize = __exports.capitalize = function (s) {
    if (s.length === 0) {
      return s;
    } else {
      return uppercase(s.slice(0, 0 + 1)) + s.slice(1, s.length - 1 + 1);
    }
  };

  const uncapitalize = __exports.uncapitalize = function (s) {
    if (s.length === 0) {
      return s;
    } else {
      return lowercase(s.slice(0, 0 + 1)) + s.slice(1, s.length - 1 + 1);
    }
  };

  const dropPrefix = __exports.dropPrefix = function (s, t) {
    return s.slice(t.length, s.length - 1 + 1);
  };

  const dropSuffix = __exports.dropSuffix = function (s, t) {
    return s.slice(0, s.length - t.length - 1 + 1);
  };

  const lowerCaseFirstChar = __exports.lowerCaseFirstChar = function (str) {
    if (isNullOrEmpty(str) ? true : System.Char.IsLower(str[0])) {
      return str;
    } else {
      const strArr = str.split("");
      const matchValue = tryHead(strArr);

      if (matchValue != null) {
        strArr[0] = System.Char.ToLower(getValue(matchValue));
        return strArr.join("");
      } else {
        return str;
      }
    }
  };

  const extractTrailingIndex = __exports.extractTrailingIndex = function (str) {
    if (str == null) {
      return [null, null];
    } else {
      const charr = str.split("");

      _Array.revInPlace(charr);

      const digits = Array.from(takeWhile(function (c) {
        return System.Char.IsDigit(c);
      }, charr));

      _Array.revInPlace(digits);

      return function (_arg1) {
        return _arg1 === "" ? [str, null] : [str.substr(0, str.length - _arg1.length), parse(_arg1)];
      }(digits.join(""));
    }
  };

  const trim = __exports.trim = function (value) {
    if (value == null) {
      return null;
    } else {
      return trim_1(value, "both");
    }
  };

  const split = __exports.split = function (options, separator, value) {
    if (value == null) {
      return null;
    } else {
      return split_1(value, separator, null, options);
    }
  };

  const _StartsWith___ = __exports["|StartsWith|_|"] = function (pattern, value) {
    if (isNullOrWhiteSpace(value)) {
      return null;
    } else if (value.indexOf(pattern) === 0) {
      return makeSome();
    } else {
      return null;
    }
  };

  const _Contains___ = __exports["|Contains|_|"] = function (pattern, value) {
    if (isNullOrWhiteSpace(value)) {
      return null;
    } else if (value.indexOf(pattern) >= 0) {
      return makeSome();
    } else {
      return null;
    }
  };

  return __exports;
}({});

export { _String as String };
export const Lazy = function (__exports) {
  const force = __exports.force = function (x) {
    return x.value;
  };

  return __exports;
}({});
export class CompilationThreadToken {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.CompilationThreadToken",
      interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.ExecutionToken"],
      properties: {}
    };
  }

  constructor() {}

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.CompilationThreadToken", CompilationThreadToken);
export function RequireCompilationThread(_ctok) {}
export function DoesNotRequireCompilerThreadTokenAndCouldPossiblyBeMadeConcurrent(_ctok) {}
export function AssumeCompilationThreadWithoutEvidence() {
  return null;
}
export class AnyCallerThreadToken {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.AnyCallerThreadToken",
      interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.ExecutionToken"],
      properties: {}
    };
  }

  constructor() {}

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.AnyCallerThreadToken", AnyCallerThreadToken);
export function AssumeAnyCallerThreadWithoutEvidence() {
  return null;
}
export function AssumeLockWithoutEvidence() {
  return null;
}
export function getHole(r) {
  const matchValue = r.contents;

  if (matchValue != null) {
    return getValue(matchValue);
  } else {
    throw new Error("getHole");
  }
}

const _Map = function (__exports) {
  const tryFindMulti = __exports.tryFindMulti = function (k, map) {
    const matchValue = tryFind_1(k, map);

    if (matchValue == null) {
      return new List_1();
    } else {
      return getValue(matchValue);
    }
  };

  return __exports;
}({});

export { _Map as Map };
export class ResultOrException {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.ResultOrException",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Result", GenericParam("TResult")], ["Exception", Error]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.ResultOrException", ResultOrException);
export const ResultOrExceptionModule = function (__exports) {
  const success = __exports.success = function (a) {
    return new ResultOrException(0, a);
  };

  const raze = __exports.raze = function (b) {
    return new ResultOrException(1, b);
  };

  const op_BarQmarkGreater = __exports.op_BarQmarkGreater = function (res, f) {
    if (res.tag === 1) {
      return new ResultOrException(1, res.data);
    } else {
      return new ResultOrException(0, f(res.data));
    }
  };

  const ForceRaise = __exports.ForceRaise = function (res) {
    if (res.tag === 1) {
      throw res.data;
    } else {
      return res.data;
    }
  };

  const otherwise = __exports.otherwise = function (f, x) {
    if (x.tag === 1) {
      return f();
    } else {
      return success(x.data);
    }
  };

  return __exports;
}({});
export class ValueOrCancelled {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.ValueOrCancelled",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Value", GenericParam("TResult")], ["Cancelled", Error]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.ValueOrCancelled", ValueOrCancelled);
export class Cancellable {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.Cancellable",
      interfaces: ["FSharpUnion"],
      cases: [["Cancellable", _Function([Any, makeGeneric(ValueOrCancelled, {
        TResult: GenericParam("TResult")
      })])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.Cancellable", Cancellable);
export const CancellableModule = function (__exports) {
  const run = __exports.run = function (ct, _arg1) {
    if (isCancellationRequested(ct)) {
      return new ValueOrCancelled(1, new Error(ct));
    } else {
      return _arg1.data(ct);
    }
  };

  const bind = __exports.bind = function (f, comp1) {
    return new Cancellable(0, function (ct) {
      const matchValue = run(ct, comp1);

      if (matchValue.tag === 1) {
        return new ValueOrCancelled(1, matchValue.data);
      } else {
        return run(ct, f(matchValue.data));
      }
    });
  };

  const map = __exports.map = function (f, oper) {
    return new Cancellable(0, function (ct) {
      const matchValue = run(ct, oper);

      if (matchValue.tag === 1) {
        return new ValueOrCancelled(1, matchValue.data);
      } else {
        return new ValueOrCancelled(0, f(matchValue.data));
      }
    });
  };

  const ret = __exports.ret = function (x) {
    return new Cancellable(0, function (_arg1) {
      return new ValueOrCancelled(0, x);
    });
  };

  const fold = __exports.fold = function (f, acc, seq) {
    return new Cancellable(0, function (ct) {
      return fold_2(function (acc_1, x) {
        return acc_1.tag === 0 ? run(ct, f(acc_1.data, x)) : acc_1;
      }, new ValueOrCancelled(0, acc), seq);
    });
  };

  const each = __exports.each = function (f, seq) {
    return new Cancellable(0, function (ct) {
      return function (_arg1) {
        return _arg1.tag === 0 ? new ValueOrCancelled(0, reverse(_arg1.data)) : _arg1;
      }(fold_2(function (acc, x) {
        if (acc.tag === 0) {
          const matchValue = run(ct, f(x));

          if (matchValue.tag === 1) {
            return new ValueOrCancelled(1, matchValue.data);
          } else {
            return new ValueOrCancelled(0, new List_1(matchValue.data, acc.data));
          }
        } else {
          return acc;
        }
      }, new ValueOrCancelled(0, new List_1()), seq));
    });
  };

  const delay = __exports.delay = function (f) {
    return new Cancellable(0, function (ct) {
      const patternInput = f();
      return patternInput.data(ct);
    });
  };

  const runWithoutCancellation = __exports.runWithoutCancellation = function (comp) {
    const res = run(null, comp);

    if (res.tag === 0) {
      return res.data;
    } else {
      throw new Error("unexpected cancellation");
    }
  };

  const token = __exports.token = function () {
    return new Cancellable(0, function (ct) {
      return new ValueOrCancelled(0, ct);
    });
  };

  const canceled = __exports.canceled = function () {
    return new Cancellable(0, function (ct) {
      return new ValueOrCancelled(1, new Error(ct));
    });
  };

  const _catch = function (_arg1) {
    return new Cancellable(0, function (ct) {
      try {
        const matchValue = _arg1.data(ct);

        if (matchValue.tag === 1) {
          return new ValueOrCancelled(1, matchValue.data);
        } else {
          return new ValueOrCancelled(0, new Choice(0, matchValue.data));
        }
      } catch (err) {
        return new ValueOrCancelled(0, new Choice(1, err));
      }
    });
  };

  const tryFinally = __exports.tryFinally = function (e, compensation) {
    return bind(function (res) {
      compensation();

      if (res.tag === 1) {
        throw res.data;
      } else {
        return ret(res.data);
      }
    }, _catch(e));
  };

  const tryWith = __exports.tryWith = function (e, handler) {
    return bind(function (res) {
      return res.tag === 1 ? handler(res.data) : ret(res.data);
    }, _catch(e));
  };

  return __exports;
}({});
export class CancellableBuilder {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.CancellableBuilder",
      properties: {}
    };
  }

  constructor() {}

  Bind(e, k) {
    return CancellableModule.bind(k, e);
  }

  Return(v) {
    return CancellableModule.ret(v);
  }

  ReturnFrom(v) {
    return v;
  }

  Combine(e1, e2) {
    return CancellableModule.bind(() => e2, e1);
  }

  TryWith(e, handler) {
    return CancellableModule.tryWith(e, handler);
  }

  Using(resource, e) {
    return CancellableModule.tryFinally(e(resource), () => {
      resource.Dispose();
    });
  }

  TryFinally(e, compensation) {
    return CancellableModule.tryFinally(e, compensation);
  }

  Delay(f) {
    return CancellableModule.delay(f);
  }

  Zero() {
    return CancellableModule.ret();
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.CancellableBuilder", CancellableBuilder);
export const cancellable = new CancellableBuilder();
export class Eventually {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.Eventually",
      interfaces: ["FSharpUnion"],
      cases: [["Done", GenericParam("T")], ["NotYetDone", _Function([CompilationThreadToken, makeGeneric(Eventually, {
        T: GenericParam("T")
      })])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.Eventually", Eventually);
export const EventuallyModule = function (__exports) {
  const box = __exports.box = function (e) {
    if (e.tag === 1) {
      return new Eventually(1, function (ctok) {
        return box(e.data(ctok));
      });
    } else {
      return new Eventually(0, e.data);
    }
  };

  const forceWhile = __exports.forceWhile = function ($var115, $var116, $var117) {
    forceWhile: while (true) {
      const ctok = $var115;
      const check = $var116;
      const e = $var117;

      if (e.tag === 1) {
        if (!check()) {
          return null;
        } else {
          $var115 = ctok;
          $var116 = check;
          $var117 = e.data(ctok);
          continue forceWhile;
        }
      } else {
        return makeSome(e.data);
      }
    }
  };

  const force_1 = __exports.force = function (ctok, e) {
    return getValue(forceWhile(ctok, function () {
      return true;
    }, e));
  };

  const bind_1 = __exports.bind = function (k, e) {
    if (e.tag === 1) {
      return new Eventually(1, function (ctok) {
        return bind_1(k, e.data(ctok));
      });
    } else {
      return k(e.data);
    }
  };

  const fold_1 = __exports.fold = function (f, acc, seq) {
    return fold_2(function (acc_1, x) {
      return bind_1(function (acc_2) {
        return f(acc_2, x);
      }, acc_1);
    }, new Eventually(0, acc), seq);
  };

  const _catch_1 = __exports.catch = function (e) {
    if (e.tag === 1) {
      return new Eventually(1, function (ctok) {
        let res;

        try {
          res = new ResultOrException(0, e.data(ctok));
        } catch (e_1) {
          res = new ResultOrException(1, e_1);
        }

        if (res.tag === 1) {
          return new Eventually(0, new ResultOrException(1, res.data));
        } else {
          return _catch_1(res.data);
        }
      });
    } else {
      return new Eventually(0, new ResultOrException(0, e.data));
    }
  };

  const delay_1 = __exports.delay = function (f) {
    return new Eventually(1, function (_ctok) {
      return f();
    });
  };

  const tryFinally_1 = __exports.tryFinally = function (e, compensation) {
    return bind_1(function (res) {
      compensation();

      if (res.tag === 1) {
        throw res.data;
      } else {
        return new Eventually(0, res.data);
      }
    }, _catch_1(e));
  };

  const tryWith_1 = __exports.tryWith = function (e, handler) {
    return bind_1(function (_arg1) {
      return _arg1.tag === 1 ? handler(_arg1.data) : new Eventually(0, _arg1.data);
    }, _catch_1(e));
  };

  const token_1 = __exports.token = new Eventually(1, function (ctok) {
    return new Eventually(0, ctok);
  });
  return __exports;
}({});
export class EventuallyBuilder {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.EventuallyBuilder",
      properties: {}
    };
  }

  constructor() {}

  Bind(e, k) {
    return EventuallyModule.bind(k, e);
  }

  Return(v) {
    return new Eventually(0, v);
  }

  ReturnFrom(v) {
    return v;
  }

  Combine(e1, e2) {
    return EventuallyModule.bind(() => e2, e1);
  }

  TryWith(e, handler) {
    return EventuallyModule.tryWith(e, handler);
  }

  TryFinally(e, compensation) {
    return EventuallyModule.tryFinally(e, compensation);
  }

  Delay(f) {
    return EventuallyModule.delay(f);
  }

  Zero() {
    return new Eventually(0, null);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.EventuallyBuilder", EventuallyBuilder);
export const eventually = new EventuallyBuilder();
export class UniqueStampGenerator {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.UniqueStampGenerator",
      properties: {
        Table: Any
      }
    };
  }

  constructor() {
    var $var5;
    this.encodeTab = create(null, fromEqualityComparer(($var5 = this, {
      GetHashCode(x) {
        return (obj => hash(obj))(x) | 0;
      },

      Equals(x, y) {
        return ((e1, e2) => equals(e1, e2))(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    })));
    this.nItems = 0;
  }

  Encode(str) {
    return this.encode(str) | 0;
  }

  get Table() {
    return this.encodeTab.keys();
  }

  encode(str) {
    if (this.encodeTab.has(str)) {
      return this.encodeTab.get(str) | 0;
    } else {
      const idx = this.nItems | 0;
      this.encodeTab.set(str, idx);
      this.nItems = this.nItems + 1 | 0;
      return idx | 0;
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.UniqueStampGenerator", UniqueStampGenerator);
export class MemoizationTable {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.MemoizationTable",
      properties: {}
    };
  }

  constructor(compute, keyComparer, canMemoize) {
    this.compute = compute;
    this.canMemoize = canMemoize;
    this.table = create(null, fromEqualityComparer(keyComparer));
  }

  Apply(x) {
    if (this.canMemoize != null ? getValue(this.canMemoize)(x) : true) {
      const patternInput = tryGetValue(this.table, x, null);

      if (patternInput[0]) {
        return patternInput[1];
      } else {
        const res = this.compute(x);
        this.table.set(x, res);
        return res;
      }
    } else {
      return this.compute(x);
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.MemoizationTable", MemoizationTable);
export class UndefinedException extends Error {
  constructor() {
    super();
    return Object.setPrototypeOf(this, UndefinedException.prototype);
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.UndefinedException",
      interfaces: ["FSharpException"],
      properties: {}
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.UndefinedException", UndefinedException);
export class LazyWithContextFailure {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.LazyWithContextFailure",
      properties: {
        Exception: Error,
        Undefined: LazyWithContextFailure
      }
    };
  }

  constructor(exn) {
    this.exn = exn;
  }

  static [".cctor"]() {
    LazyWithContextFailure.undefined = new LazyWithContextFailure(new UndefinedException());
  }

  get Exception() {
    return this.exn;
  }

  static get Undefined() {
    return LazyWithContextFailure.undefined;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.LazyWithContextFailure", LazyWithContextFailure);
LazyWithContextFailure[".cctor"]();
export class LazyWithContext {
  constructor(value, funcOrException, findOriginalException) {
    this.value = value;
    this.funcOrException = funcOrException;
    this.findOriginalException = findOriginalException;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.LazyWithContext",
      interfaces: ["FSharpRecord"],
      properties: {
        value: GenericParam("T"),
        funcOrException: Any,
        findOriginalException: _Function([Error, Error])
      }
    };
  }

  static Create(f, findOriginalException) {
    return new LazyWithContext(null, f, findOriginalException);
  }

  static NotLazy(x) {
    return new LazyWithContext(x, null, function (x_1) {
      return x_1;
    });
  }

  get IsDelayed() {
    const matchValue = this.funcOrException;

    if (matchValue == null) {
      return false;
    } else if (matchValue instanceof LazyWithContextFailure) {
      return false;
    } else {
      return true;
    }
  }

  get IsForced() {
    const matchValue = this.funcOrException;

    if (matchValue == null) {
      return true;
    } else {
      return false;
    }
  }

  Force(ctxt) {
    const matchValue = this.funcOrException;

    if (matchValue == null) {
      return this.value;
    } else {
      return this.UnsynchronizedForce(ctxt);
    }
  }

  UnsynchronizedForce(ctxt) {
    const matchValue = this.funcOrException;

    if (matchValue == null) {
      return this.value;
    } else if (matchValue instanceof LazyWithContextFailure) {
      throw this.findOriginalException(matchValue.Exception);
    } else if (typeof matchValue === "function") {
      this.funcOrException = LazyWithContextFailure.Undefined;

      try {
        const res = matchValue(ctxt);
        this.value = res;
        this.funcOrException = null;
        return res;
      } catch (e) {
        this.funcOrException = new LazyWithContextFailure(e);
        throw e;
      }
    } else {
      throw new Error("unreachable");
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.LazyWithContext", LazyWithContext);
export const Tables = function (__exports) {
  const memoize = __exports.memoize = function (f) {
    var t;
    return CurriedLambda((t = create(null, fromEqualityComparer({
      GetHashCode(x) {
        return function (obj) {
          return hash(obj);
        }(x) | 0;
      },

      Equals(x, y) {
        return function (e1, e2) {
          return equals(e1, e2);
        }(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    })), function (x) {
      const patternInput = tryGetValue(t, x, null);

      if (patternInput[0]) {
        return patternInput[1];
      } else {
        const res = f(x);
        t.set(x, res);
        return res;
      }
    }));
  };

  return __exports;
}({});
export const IPartialEqualityComparer = function (__exports) {
  const On = __exports.On = function (f, c) {
    return {
      InEqualityRelation(x) {
        return c.InEqualityRelation(f(x));
      },

      Equals(x, y) {
        return c.Equals(f(x), f(y));
      },

      GetHashCode(x) {
        return c.GetHashCode(f(x)) | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.IPartialEqualityComparer"]
        };
      }

    };
  };

  const WrapType = class WrapType {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.IPartialEqualityComparer.WrapType",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Wrap", GenericParam("T")]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.IPartialEqualityComparer.WrapType", WrapType);

  const partialDistinctBy = __exports.partialDistinctBy = function (per, seq) {
    const wper = {
      InEqualityRelation(_arg1) {
        return per.InEqualityRelation(_arg1.data);
      },

      Equals(_arg2, _arg3) {
        return per.Equals(_arg2.data, _arg3.data);
      },

      GetHashCode(_arg4) {
        return per.GetHashCode(_arg4.data) | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.IPartialEqualityComparer"]
        };
      }

    };
    const dict = create(null, fromEqualityComparer(wper));
    return filter(function (v) {
      const key = new WrapType(0, v);

      if (per.InEqualityRelation(v)) {
        if (dict.has(key)) {
          return false;
        } else {
          dict.set(key, null);
          return true;
        }
      } else {
        return true;
      }
    }, seq);
  };

  return __exports;
}({});
export const NameMapModule = function (__exports) {
  const empty = __exports.empty = function () {
    return create(null, new Comparer(compare));
  };

  const range_1 = __exports.range = function (m) {
    return reverse(foldBack_1(function (_arg1, x, sofar) {
      return new List_1(x, sofar);
    }, m, new List_1()));
  };

  const foldBack = __exports.foldBack = function (f, m, z) {
    return foldBack_1(f, m, z);
  };

  const forall = __exports.forall = function (f, m) {
    return foldBack_1(function (x, y, sofar) {
      return sofar ? f(x, y) : false;
    }, m, true);
  };

  const exists = __exports.exists = function (f, m) {
    return foldBack_1(function (x, y, sofar) {
      return sofar ? true : f(x, y);
    }, m, false);
  };

  const ofKeyedList = __exports.ofKeyedList = function (f, l) {
    return foldBack_2(function (x, acc) {
      return add_3(f(x), x, acc);
    }, l, create(null, new Comparer(compare)));
  };

  const ofList = __exports.ofList = function (l) {
    return create(l, new Comparer(comparePrimitives));
  };

  const ofSeq = __exports.ofSeq = function (l) {
    return create(l, new Comparer(comparePrimitives));
  };

  const toList = __exports.toList = function (l) {
    return toList_1(l);
  };

  const layer = __exports.layer = function (m1, m2) {
    return foldBack_1(function (key, value, table) {
      return add_3(key, value, table);
    }, m1, m2);
  };

  const layerAdditive = __exports.layerAdditive = function (addf, m1, m2) {
    return foldBack_1(function (x, y, sofar) {
      return add_3(x, addf(_Map.tryFindMulti(x, sofar), y), sofar);
    }, m1, m2);
  };

  const union = __exports.union = function (unionf, ms) {
    return create(map_5(function (tupledArg) {
      return [tupledArg[0], unionf(map_5(function (_arg2) {
        const activePatternResult7009 = _arg2;
        return activePatternResult7009[1];
      }, tupledArg[1]))];
    }, groupBy(function (_arg1) {
      const activePatternResult7007 = _arg1;
      return activePatternResult7007[0];
    }, delay_2(function () {
      return collect_1(function (m) {
        return m;
      }, ms);
    }))), new Comparer(comparePrimitives));
  };

  const subfold2 = __exports.subfold2 = function (errf, f, m1, m2, acc) {
    return foldBack_1(function (n, x2, acc_1) {
      try {
        return f(n, find_3(n, m1), x2, acc_1);
      } catch (matchValue) {
        if (matchValue instanceof Error) {
          return errf(n, x2);
        } else {
          throw matchValue;
        }
      }
    }, m2, acc);
  };

  const suball2 = __exports.suball2 = function (errf, p, m1, m2) {
    return subfold2(errf, function (_arg1, x1, x2, acc) {
      return p(x1, x2) ? acc : false;
    }, m1, m2, true);
  };

  const mapFold_1 = __exports.mapFold = function (f, s, l) {
    return foldBack_1(function (x, y, tupledArg) {
      const patternInput = f(tupledArg[1], x, y);
      return [add_3(x, patternInput[0], tupledArg[0]), patternInput[1]];
    }, l, [create(null, new Comparer(comparePrimitives)), s]);
  };

  const foldBackRange = __exports.foldBackRange = function (f, l, acc) {
    return foldBack_1(function (_arg1, y, acc_1) {
      return f(y, acc_1);
    }, l, acc);
  };

  const filterRange = __exports.filterRange = function (f, l) {
    return foldBack_1(function (x, y, acc) {
      return f(y) ? add_3(x, y, acc) : acc;
    }, l, create(null, new Comparer(comparePrimitives)));
  };

  const mapFilter = __exports.mapFilter = function (f, l) {
    return foldBack_1(function (x, y, acc) {
      const matchValue = f(y);

      if (matchValue != null) {
        return add_3(x, getValue(matchValue), acc);
      } else {
        return acc;
      }
    }, l, create(null, new Comparer(comparePrimitives)));
  };

  const map_1 = __exports.map = function (f, l) {
    return map_6(function (_arg1, x) {
      return f(x);
    }, l);
  };

  const iter = __exports.iter = function (f, l) {
    iterate_1(function (_k, v) {
      f(v);
    }, l);
  };

  const partition = __exports.partition = function (f, l) {
    return [filter_1(function (_arg1, x) {
      return f(x);
    }, l), filter_1(function (_arg2, x_1) {
      return !f(x_1);
    }, l)];
  };

  const mem = __exports.mem = function (v, m) {
    return m.has(v);
  };

  const find = __exports.find = function (v, m) {
    return find_3(v, m);
  };

  const tryFind = __exports.tryFind = function (v, m) {
    return tryFind_1(v, m);
  };

  const add = __exports.add = function (v, x, m) {
    return add_3(v, x, m);
  };

  const isEmpty = __exports.isEmpty = function (m) {
    return isEmpty_1(m);
  };

  const existsInRange = __exports.existsInRange = function (p, m) {
    return foldBack_1(function (_arg1, y, acc) {
      return acc ? true : p(y);
    }, m, false);
  };

  const tryFindInRange = __exports.tryFindInRange = function (p, m) {
    return foldBack_1(function (_arg1, y, acc) {
      return acc == null ? p(y) ? makeSome(y) : null : acc;
    }, m, null);
  };

  return __exports;
}({});
export const NameMultiMapModule = function (__exports) {
  const existsInRange_1 = __exports.existsInRange = function (f, m) {
    return NameMapModule.exists(function (_arg1, l) {
      return exists_1(f, l);
    }, m);
  };

  const find_1 = __exports.find = function (v, m) {
    const matchValue = tryFind_1(v, m);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return new List_1();
    }
  };

  const add_1 = __exports.add = function (v, x, m) {
    return NameMapModule.add(v, new List_1(x, find_1(v, m)), m);
  };

  const range_2 = __exports.range = function (m) {
    return foldBack_1(function (_arg1, x, sofar) {
      return append(x, sofar);
    }, m, new List_1());
  };

  const rangeReversingEachBucket = __exports.rangeReversingEachBucket = function (m) {
    return foldBack_1(function (_arg1, x, sofar) {
      return append(reverse(x), sofar);
    }, m, new List_1());
  };

  const chooseRange = __exports.chooseRange = function (f, m) {
    return foldBack_1(function (_arg1, x, sofar) {
      return append(choose(f, x), sofar);
    }, m, new List_1());
  };

  const map_2 = __exports.map = function (f, m) {
    return NameMapModule.map(function (list) {
      return map_4(f, list);
    }, m);
  };

  const empty_1 = __exports.empty = function () {
    return create(null, new Comparer(comparePrimitives));
  };

  const initBy = __exports.initBy = function (f, xs) {
    return create(map_5(function (tupledArg) {
      return [tupledArg[0], toList_1(tupledArg[1])];
    }, function (source) {
      return groupBy(f, source);
    }(xs)), new Comparer(comparePrimitives));
  };

  const ofList_1 = __exports.ofList = function (xs) {
    return create(map_5(function (tupledArg) {
      return [tupledArg[0], toList_1(map_5(function (tuple) {
        return tuple[1];
      }, tupledArg[1]))];
    }, groupBy(function (tuple_1) {
      return tuple_1[0];
    }, xs)), new Comparer(comparePrimitives));
  };

  return __exports;
}({});
export const MultiMapModule = function (__exports) {
  const existsInRange_2 = __exports.existsInRange = function (f, m) {
    return exists_2(function (_arg1, l) {
      return exists_1(f, l);
    }, m);
  };

  const find_2 = __exports.find = function (v, m) {
    const matchValue = tryFind_1(v, m);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return new List_1();
    }
  };

  const add_2 = __exports.add = function (v, x, m) {
    return add_3(v, new List_1(x, find_2(v, m)), m);
  };

  const range_3 = __exports.range = function (m) {
    return foldBack_1(function (_arg1, x, sofar) {
      return append(x, sofar);
    }, m, new List_1());
  };

  const empty_2 = __exports.empty = function () {
    return create(null, new Comparer(compare));
  };

  const initBy_1 = __exports.initBy = function (f, xs) {
    return create(map_5(function (tupledArg) {
      return [tupledArg[0], toList_1(tupledArg[1])];
    }, function (source) {
      return groupBy(f, source);
    }(xs)), new Comparer(compare));
  };

  return __exports;
}({});

function Map_2_get_Empty_Static() {
  return create(null, new Comparer(compare));
}

export { Map_2_get_Empty_Static as Map$60$2$2E$get_Empty$2E$Static };

function Map_2_TryGetValue(key) {
  const matchValue = tryFind_1(key, this);

  if (matchValue != null) {
    return [true, getValue(matchValue)];
  } else {
    return [false, null];
  }
}

export { Map_2_TryGetValue as Map$60$2$2E$TryGetValue };

function Map_2_get_Values() {
  return toList_1(delay_2(() => collect_1(matchValue => {
    const activePatternResult7170 = matchValue;
    return singleton_1(activePatternResult7170[1]);
  }, this)));
}

export { Map_2_get_Values as Map$60$2$2E$get_Values };

function Map_2_AddAndMarkAsCollapsible(kvs) {
  return fold_2((x, _arg1) => {
    const activePatternResult7175 = _arg1;
    return add_3(activePatternResult7175[0], activePatternResult7175[1], x);
  }, this, kvs);
}

export { Map_2_AddAndMarkAsCollapsible as Map$60$2$2E$AddAndMarkAsCollapsible };

function Map_2_LinearTryModifyThenLaterFlatten(key, f) {
  return add_3(key, f(tryFind_1(key, this)), this);
}

export { Map_2_LinearTryModifyThenLaterFlatten as Map$60$2$2E$LinearTryModifyThenLaterFlatten };

function Map_2_MarkAsCollapsible() {
  return this;
}

export { Map_2_MarkAsCollapsible as Map$60$2$2E$MarkAsCollapsible };
export class LayeredMultiMap {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.LayeredMultiMap",
      properties: {
        Empty: makeGeneric(LayeredMultiMap, {
          Key: GenericParam("Key"),
          Value: GenericParam("Value")
        }),
        Item: makeGeneric(List_1, {
          T: GenericParam("Value")
        }),
        Values: makeGeneric(List_1, {
          T: GenericParam("Value")
        })
      }
    };
  }

  constructor(contents) {
    this.contents = contents;
  }

  Add(k, v) {
    return new LayeredMultiMap(add_3(k, new List_1(v, this.get_Item(k)), this.contents));
  }

  get_Item(k) {
    const matchValue = tryFind_1(k, this.contents);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return new List_1();
    }
  }

  AddAndMarkAsCollapsible(kvs) {
    const x_1 = fold_2((x, _arg2) => {
      const activePatternResult7194 = _arg2;
      return x.Add(activePatternResult7194[0], activePatternResult7194[1]);
    }, this, kvs);
    return x_1.MarkAsCollapsible();
  }

  MarkAsCollapsible() {
    return new LayeredMultiMap(Map_2_MarkAsCollapsible.bind(this.contents)());
  }

  TryFind(k) {
    return tryFind_1(k, this.contents);
  }

  get Values() {
    return concat(Map_2_get_Values.bind(this.contents)());
  }

  static get Empty() {
    return new LayeredMultiMap(Map_2_get_Empty_Static());
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.LayeredMultiMap", LayeredMultiMap);
export const Shim = function (__exports) {
  const DefaultFileSystem = __exports.DefaultFileSystem = class DefaultFileSystem {
    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.Shim.DefaultFileSystem",
        interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.Shim.IFileSystem"],
        properties: {}
      };
    }

    constructor() {}

    GetFullPathShim(fileName) {
      return System.IO.Path.GetFullPath(fileName);
    }

    IsPathRootedShim(path) {
      return System.IO.Path.IsPathRooted(path);
    }

    IsInvalidPathShim(path) {
      const isInvalidPath = p => {
        if (isNullOrEmpty(p)) {
          return true;
        } else {
          return indexOfAny(p, System.IO.Path.GetInvalidPathChars()) !== -1;
        }
      };

      const isInvalidFilename = p_1 => {
        if (isNullOrEmpty(p_1)) {
          return true;
        } else {
          return indexOfAny(p_1, System.IO.Path.GetInvalidFileNameChars()) !== -1;
        }
      };

      const isInvalidDirectory = d => {
        if (d == null) {
          return true;
        } else {
          return indexOfAny(d, System.IO.Path.GetInvalidPathChars()) !== -1;
        }
      };

      if (isInvalidPath(path)) {
        return true;
      } else {
        const directory = System.IO.Path.GetDirectoryName(path);
        const filename = System.IO.Path.GetFileName(path);

        if (isInvalidDirectory(directory)) {
          return true;
        } else {
          return isInvalidFilename(filename);
        }
      }
    }

  };
  setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.Shim.DefaultFileSystem", DefaultFileSystem);
  let FileSystem = __exports.FileSystem = createAtom(new DefaultFileSystem());
  return __exports;
}({});