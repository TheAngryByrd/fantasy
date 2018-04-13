import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compare as compare_1, Tuple, hash, Interface, hasInterface, makeGeneric, GenericParam } from "../fable-core/Util";
import { ofArray as ofArray_1 } from "../fable-core/List";
import List from "../fable-core/List";
import Choice from "../fable-core/Choice";
import { getValue, makeSome } from "../fable-core/Option";
import { compareWith, toIterator, fold as fold_2, getEnumerator } from "../fable-core/Seq";
export class SetTree {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Collections.Tagged.SetTree",
      interfaces: ["FSharpUnion"],
      cases: [["SetEmpty"], ["SetNode", GenericParam("T"), makeGeneric(SetTree, {
        T: GenericParam("T")
      }), makeGeneric(SetTree, {
        T: GenericParam("T")
      }), "number"]]
    };
  }

}
setType("Internal.Utilities.Collections.Tagged.SetTree", SetTree);
export const SetTreeModule = function (__exports) {
  const empty = __exports.empty = function () {
    return new SetTree(0);
  };

  const height = __exports.height = function (t) {
    if (t.tag === 1) {
      return t.data[3] | 0;
    } else {
      return 0;
    }
  };

  const tolerance = __exports.tolerance = 2;

  const mk = __exports.mk = function (l, hl, k, r, hr) {
    const m = (hl < hr ? hr : hl) | 0;
    return new SetTree(1, [k, l, r, m + 1]);
  };

  const rebalance = __exports.rebalance = function (t1, k, t2) {
    const t1h = height(t1) | 0;
    const t2h = height(t2) | 0;

    if (t2h > t1h + tolerance) {
      if (t2.tag === 1) {
        const t2lh = height(t2.data[1]) | 0;

        if (t2lh > t1h + 1) {
          if (t2.data[1].tag === 1) {
            const l = mk(t1, t1h, k, t2.data[1].data[1], height(t2.data[1].data[1]));
            const r = mk(t2.data[1].data[2], height(t2.data[1].data[2]), t2.data[0], t2.data[2], height(t2.data[2]));
            return mk(l, height(l), t2.data[1].data[0], r, height(r));
          } else {
            throw new Error("rebalance");
          }
        } else {
          const l_1 = mk(t1, t1h, k, t2.data[1], t2lh);
          return mk(l_1, height(l_1), t2.data[0], t2.data[2], height(t2.data[2]));
        }
      } else {
        throw new Error("rebalance");
      }
    } else if (t1h > t2h + tolerance) {
      if (t1.tag === 1) {
        const t1rh = height(t1.data[2]) | 0;

        if (t1rh > t2h + 1) {
          if (t1.data[2].tag === 1) {
            const l_2 = mk(t1.data[1], height(t1.data[1]), t1.data[0], t1.data[2].data[1], height(t1.data[2].data[1]));
            const r_1 = mk(t1.data[2].data[2], height(t1.data[2].data[2]), k, t2, t2h);
            return mk(l_2, height(l_2), t1.data[2].data[0], r_1, height(r_1));
          } else {
            throw new Error("rebalance");
          }
        } else {
          const r_2 = mk(t1.data[2], t1rh, k, t2, t2h);
          return mk(t1.data[1], height(t1.data[1]), t1.data[0], r_2, height(r_2));
        }
      } else {
        throw new Error("rebalance");
      }
    } else {
      return mk(t1, t1h, k, t2, t2h);
    }
  };

  const add = __exports.add = function (comparer, k, t) {
    if (t.tag === 0) {
      return new SetTree(1, [k, new SetTree(0), new SetTree(0), 1]);
    } else {
      const c = comparer.Compare(k, t.data[0]) | 0;

      if (c < 0) {
        return rebalance(add(comparer, k, t.data[1]), t.data[0], t.data[2]);
      } else if (c === 0) {
        return t;
      } else {
        return rebalance(t.data[1], t.data[0], add(comparer, k, t.data[2]));
      }
    }
  };

  const balance = __exports.balance = function (comparer, t1, k, t2) {
    const matchValue = [t1, t2];

    if (matchValue[0].tag === 1) {
      if (matchValue[1].tag === 1) {
        if (matchValue[0].data[3] + tolerance < matchValue[1].data[3]) {
          return rebalance(balance(comparer, t1, k, matchValue[1].data[1]), matchValue[1].data[0], matchValue[1].data[2]);
        } else if (matchValue[1].data[3] + tolerance < matchValue[0].data[3]) {
          return rebalance(matchValue[0].data[1], matchValue[0].data[0], balance(comparer, matchValue[0].data[2], k, t2));
        } else {
          return mk(t1, matchValue[0].data[3], k, t2, matchValue[1].data[3]);
        }
      } else {
        return add(comparer, k, matchValue[0]);
      }
    } else {
      return add(comparer, k, matchValue[1]);
    }
  };

  const split = __exports.split = function (comparer, pivot, t) {
    if (t.tag === 0) {
      return [new SetTree(0), false, new SetTree(0)];
    } else {
      const c = comparer.Compare(pivot, t.data[0]) | 0;

      if (c < 0) {
        const patternInput = split(comparer, pivot, t.data[1]);
        return [patternInput[0], patternInput[1], balance(comparer, patternInput[2], t.data[0], t.data[2])];
      } else if (c === 0) {
        return [t.data[1], true, t.data[2]];
      } else {
        const patternInput_1 = split(comparer, pivot, t.data[2]);
        return [balance(comparer, t.data[1], t.data[0], patternInput_1[0]), patternInput_1[1], patternInput_1[2]];
      }
    }
  };

  const spliceOutSuccessor = __exports.spliceOutSuccessor = function (t) {
    if (t.tag === 1) {
      if (t.data[1].tag === 0) {
        return [t.data[0], t.data[2]];
      } else {
        const patternInput = spliceOutSuccessor(t.data[1]);
        return [patternInput[0], mk(patternInput[1], height(patternInput[1]), t.data[0], t.data[2], height(t.data[2]))];
      }
    } else {
      throw new Error("internal error: Map.splice_out_succ_or_pred");
    }
  };

  const remove = __exports.remove = function (comparer, k, t) {
    if (t.tag === 1) {
      const c = comparer.Compare(k, t.data[0]) | 0;

      if (c < 0) {
        return rebalance(remove(comparer, k, t.data[1]), t.data[0], t.data[2]);
      } else if (c === 0) {
        const matchValue = [t.data[1], t.data[2]];

        if (matchValue[0].tag === 0) {
          return t.data[2];
        } else if (matchValue[1].tag === 0) {
          return t.data[1];
        } else {
          const patternInput = spliceOutSuccessor(t.data[2]);
          return mk(t.data[1], height(t.data[1]), patternInput[0], patternInput[1], height(patternInput[1]));
        }
      } else {
        return rebalance(t.data[1], t.data[0], remove(comparer, k, t.data[2]));
      }
    } else {
      return t;
    }
  };

  const contains = __exports.contains = function (comparer, k, t) {
    contains: while (true) {
      if (t.tag === 0) {
        return false;
      } else {
        const c = comparer.Compare(k, t.data[0]) | 0;

        if (c < 0) {
          comparer = comparer;
          k = k;
          t = t.data[1];
          continue contains;
        } else if (c === 0) {
          return true;
        } else {
          comparer = comparer;
          k = k;
          t = t.data[2];
          continue contains;
        }
      }
    }
  };

  const iter = __exports.iter = function (f, t) {
    if (t.tag === 0) {} else {
      iter(f, t.data[1]);
      f(t.data[0]);
      iter(f, t.data[2]);
    }
  };

  const fold = __exports.fold = function ($var31, $var32, $var33) {
    fold: while (true) {
      const f = $var31;
      const m = $var32;
      const x = $var33;

      if (m.tag === 0) {
        return x;
      } else {
        $var31 = f;
        $var32 = m.data[2];
        $var33 = f(m.data[0], fold(f, m.data[1], x));
        continue fold;
      }
    }
  };

  const forAll = __exports.forAll = function ($var34, $var35) {
    forAll: while (true) {
      const f = $var34;
      const m = $var35;

      if (m.tag === 0) {
        return true;
      } else if (f(m.data[0]) ? forAll(f, m.data[1]) : false) {
        $var34 = f;
        $var35 = m.data[2];
        continue forAll;
      } else {
        return false;
      }
    }
  };

  const exists = __exports.exists = function ($var36, $var37) {
    exists: while (true) {
      const f = $var36;
      const m = $var37;

      if (m.tag === 0) {
        return false;
      } else if (f(m.data[0]) ? true : exists(f, m.data[1])) {
        return true;
      } else {
        $var36 = f;
        $var37 = m.data[2];
        continue exists;
      }
    }
  };

  const isEmpty = __exports.isEmpty = function (m) {
    if (m.tag === 0) {
      return true;
    } else {
      return false;
    }
  };

  const subset = __exports.subset = function (comparer, a, b) {
    return forAll(function (x) {
      return contains(comparer, x, b);
    }, a);
  };

  const elementsAux = __exports.elementsAux = function (m, acc) {
    if (m.tag === 0) {
      return acc;
    } else {
      return new List(m.data[0], elementsAux(m.data[1], elementsAux(m.data[2], acc)));
    }
  };

  const elements = __exports.elements = function (a) {
    return elementsAux(a, new List());
  };

  const filterAux = __exports.filterAux = function ($var38, $var39, $var40, $var41) {
    filterAux: while (true) {
      const comparer = $var38;
      const f = $var39;
      const s = $var40;
      const acc = $var41;

      if (s.tag === 0) {
        return acc;
      } else {
        const acc_1 = f(s.data[0]) ? add(comparer, s.data[0], acc) : acc;
        $var38 = comparer;
        $var39 = f;
        $var40 = s.data[1];
        $var41 = filterAux(comparer, f, s.data[2], acc_1);
        continue filterAux;
      }
    }
  };

  const filter = __exports.filter = function (comparer, f, s) {
    return filterAux(comparer, f, s, empty());
  };

  const diffAux = __exports.diffAux = function (comparer, m, acc) {
    diffAux: while (true) {
      if (m.tag === 0) {
        return acc;
      } else {
        const $var45 = comparer;
        const $var46 = m.data[1];
        acc = diffAux(comparer, m.data[2], remove(comparer, m.data[0], acc));
        comparer = $var45;
        m = $var46;
        continue diffAux;
      }
    }
  };

  const diff = __exports.diff = function (comparer, a, b) {
    return diffAux(comparer, b, a);
  };

  const countAux = __exports.countAux = function (s, acc) {
    countAux: while (true) {
      if (s.tag === 0) {
        return acc | 0;
      } else {
        const $var47 = s.data[1];
        acc = countAux(s.data[2], acc + 1);
        s = $var47;
        continue countAux;
      }
    }
  };

  const count = __exports.count = function (s) {
    return countAux(s, 0) | 0;
  };

  const union = __exports.union = function (comparer, t1, t2) {
    const matchValue = [t1, t2];

    if (matchValue[0].tag === 0) {
      return matchValue[1];
    } else if (matchValue[1].tag === 0) {
      return matchValue[0];
    } else if (matchValue[0].data[3] > matchValue[1].data[3]) {
      const patternInput = split(comparer, matchValue[0].data[0], t2);
      return balance(comparer, union(comparer, matchValue[0].data[1], patternInput[0]), matchValue[0].data[0], union(comparer, matchValue[0].data[2], patternInput[2]));
    } else {
      const patternInput_1 = split(comparer, matchValue[1].data[0], t1);
      return balance(comparer, union(comparer, matchValue[1].data[1], patternInput_1[0]), matchValue[1].data[0], union(comparer, matchValue[1].data[2], patternInput_1[2]));
    }
  };

  const intersectionAux = __exports.intersectionAux = function (comparer, b, m, acc) {
    intersectionAux: while (true) {
      if (m.tag === 0) {
        return acc;
      } else {
        const acc_1 = intersectionAux(comparer, b, m.data[2], acc);
        const acc_2 = contains(comparer, m.data[0], b) ? add(comparer, m.data[0], acc_1) : acc_1;
        comparer = comparer;
        b = b;
        m = m.data[1];
        acc = acc_2;
        continue intersectionAux;
      }
    }
  };

  const intersection = __exports.intersection = function (comparer, a, b) {
    return intersectionAux(comparer, b, a, empty());
  };

  const partition1 = __exports.partition1 = function (comparer, f, k, acc1, acc2) {
    if (f(k)) {
      return [add(comparer, k, acc1), acc2];
    } else {
      return [acc1, add(comparer, k, acc2)];
    }
  };

  const partitionAux = __exports.partitionAux = function ($var53, $var54, $var55, $var56, $var57) {
    partitionAux: while (true) {
      const comparer = $var53;
      const f = $var54;
      const s = $var55;
      const acc_0 = $var56;
      const acc_1 = $var57;
      const acc = [acc_0, acc_1];

      if (s.tag === 0) {
        return acc;
      } else {
        const acc_2 = partitionAux(comparer, f, s.data[2], acc[0], acc[1]);
        const acc_3 = partition1(comparer, f, s.data[0], acc_2[0], acc_2[1]);
        $var53 = comparer;
        $var54 = f;
        $var55 = s.data[1];
        $var56 = acc_3[0];
        $var57 = acc_3[1];
        continue partitionAux;
      }
    }
  };

  const partition = __exports.partition = function (comparer, f, s) {
    return partitionAux(comparer, f, s, empty(), empty());
  };

  const _MatchSetNode_MatchSetEmpty_ = __exports["|MatchSetNode|MatchSetEmpty|"] = function (s) {
    if (s.tag === 0) {
      return new Choice(1, null);
    } else {
      return new Choice(0, [s.data[0], s.data[1], s.data[2]]);
    }
  };

  const nextElemCont = __exports.nextElemCont = function ($var61, $var62, $var63, $var64) {
    nextElemCont: while (true) {
      const comparer = $var61;
      const k = $var62;
      const s = $var63;
      const cont = $var64;

      const activePatternResult4624 = _MatchSetNode_MatchSetEmpty_(s);

      if (activePatternResult4624.tag === 1) {
        return cont(null);
      } else {
        const c = comparer.Compare(k, activePatternResult4624.data[0]) | 0;

        if (c < 0) {
          $var61 = comparer;
          $var62 = k;
          $var63 = activePatternResult4624.data[1];

          $var64 = function (_arg1) {
            return _arg1 == null ? cont(makeSome(activePatternResult4624.data[0])) : _arg1;
          };

          continue nextElemCont;
        } else if (c === 0) {
          return cont(minimumElementOpt(activePatternResult4624.data[2]));
        } else {
          $var61 = comparer;
          $var62 = k;
          $var63 = activePatternResult4624.data[2];
          $var64 = cont;
          continue nextElemCont;
        }
      }
    }
  };

  const nextElem = __exports.nextElem = function (comparer, k, s) {
    return nextElemCont(comparer, k, s, function (res) {
      return res;
    });
  };

  const prevElemCont = __exports.prevElemCont = function ($var65, $var66, $var67, $var68) {
    prevElemCont: while (true) {
      const comparer = $var65;
      const k = $var66;
      const s = $var67;
      const cont = $var68;

      const activePatternResult4634 = _MatchSetNode_MatchSetEmpty_(s);

      if (activePatternResult4634.tag === 1) {
        return cont(null);
      } else {
        const c = comparer.Compare(k, activePatternResult4634.data[0]) | 0;

        if (c > 0) {
          $var65 = comparer;
          $var66 = k;
          $var67 = activePatternResult4634.data[2];

          $var68 = function (_arg2) {
            return _arg2 == null ? cont(makeSome(activePatternResult4634.data[0])) : _arg2;
          };

          continue prevElemCont;
        } else if (c === 0) {
          return cont(maximumElementOpt(activePatternResult4634.data[2]));
        } else {
          $var65 = comparer;
          $var66 = k;
          $var67 = activePatternResult4634.data[1];
          $var68 = cont;
          continue prevElemCont;
        }
      }
    }
  };

  const prevElem = __exports.prevElem = function (comparer, k, s) {
    return prevElemCont(comparer, k, s, function (res) {
      return res;
    });
  };

  const minimumElementAux = __exports.minimumElementAux = function (s, n) {
    minimumElementAux: while (true) {
      if (s.tag === 0) {
        return n;
      } else {
        const $var69 = s.data[1];
        n = s.data[0];
        s = $var69;
        continue minimumElementAux;
      }
    }
  };

  const minimumElementOpt = __exports.minimumElementOpt = function (s) {
    if (s.tag === 0) {
      return null;
    } else {
      return makeSome(minimumElementAux(s.data[1], s.data[0]));
    }
  };

  const maximumElementAux = __exports.maximumElementAux = function (s, n) {
    maximumElementAux: while (true) {
      if (s.tag === 0) {
        return n;
      } else {
        const $var70 = s.data[2];
        n = s.data[0];
        s = $var70;
        continue maximumElementAux;
      }
    }
  };

  const maximumElementOpt = __exports.maximumElementOpt = function (s) {
    if (s.tag === 0) {
      return null;
    } else {
      return makeSome(maximumElementAux(s.data[2], s.data[0]));
    }
  };

  const minimumElement = __exports.minimumElement = function (s) {
    const matchValue = minimumElementOpt(s);

    if (matchValue == null) {
      throw new Error("minimumElement");
    } else {
      return getValue(matchValue);
    }
  };

  const maximumElement = __exports.maximumElement = function (s) {
    const matchValue = maximumElementOpt(s);

    if (matchValue == null) {
      throw new Error("maximumElement");
    } else {
      return getValue(matchValue);
    }
  };

  const SetIterator = __exports.SetIterator = class SetIterator {
    [_Symbol.reflection]() {
      return {
        type: "Internal.Utilities.Collections.Tagged.SetTreeModule.SetIterator",
        properties: {
          Current: GenericParam("T")
        }
      };
    }

    constructor(s) {
      const stack = ofArray_1([s]);
      this.stack = this.collapseLHS(stack);
      this.started = false;
    }

    get Current() {
      if (this.started) {
        const matchValue = this.stack;

        if (matchValue.tail == null) {
          return this.alreadyFinished();
        } else if (matchValue.head.tag === 1) {
          return matchValue.head.data[0];
        } else {
          throw new Error("Please report error: Set iterator, unexpected stack for current");
        }
      } else {
        return this.notStarted();
      }
    }

    MoveNext() {
      if (this.started) {
        const matchValue = this.stack;

        if (matchValue.tail == null) {
          return false;
        } else if (matchValue.head.tag === 1) {
          this.stack = this.collapseLHS(matchValue.tail);
          return !(this.stack.tail == null);
        } else {
          throw new Error("Please report error: Set iterator, unexpected stack for moveNext");
        }
      } else {
        this.started = true;
        return !(this.stack.tail == null);
      }
    }

    collapseLHS(stack) {
      const $var1 = stack.tail != null ? stack.head.tag === 1 ? stack.head.data[1].tag === 0 ? stack.head.data[2].tag === 0 ? [2] : [3, stack.head.data[0], stack.head.data[1], stack.head.data[2], stack.tail] : [3, stack.head.data[0], stack.head.data[1], stack.head.data[2], stack.tail] : [1, stack.tail] : [0];

      switch ($var1[0]) {
        case 0:
          return new List();

        case 1:
          return (stack_1 => this.collapseLHS(stack_1))($var1[1]);

        case 2:
          return stack;

        case 3:
          return (stack_2 => this.collapseLHS(stack_2))(ofArray_1([$var1[2], new SetTree(1, [$var1[1], new SetTree(0), new SetTree(0), 1]), $var1[3]], $var1[4]));
      }
    }

    notStarted() {
      throw new Error("Enumeration has not started. Call MoveNext.");
    }

    alreadyFinished() {
      throw new Error("Enumeration already finished.");
    }

  };
  setType("Internal.Utilities.Collections.Tagged.SetTreeModule.SetIterator", SetIterator);

  const toSeq = __exports.toSeq = function (s) {
    const i = {
      contents: new SetIterator(s)
    };
    return {
      get Current() {
        return i.contents.Current;
      },

      MoveNext() {
        return i.contents.MoveNext();
      },

      Reset() {
        i.contents = new SetIterator(s);
      },

      Dispose() {},

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEnumerator", "System.IDisposable"]
        };
      }

    };
  };

  const compareStacks = __exports.compareStacks = function (comparer, l1, l2) {
    compareStacks: while (true) {
      const matchValue = [l1, l2];
      const $var2 = matchValue[0].tail != null ? matchValue[1].tail != null ? matchValue[1].head.tag === 1 ? matchValue[1].head.data[1].tag === 0 ? matchValue[0].head.tag === 1 ? matchValue[0].head.data[1].tag === 0 ? [4, matchValue[0].head.data[0], matchValue[0].head.data[2], matchValue[1].head.data[0], matchValue[1].head.data[2], matchValue[0].tail, matchValue[1].tail] : [5, matchValue[0].head.data[0], matchValue[0].head.data[1], matchValue[0].head.data[2], matchValue[0].tail] : [6, matchValue[1].head.data[0], matchValue[1].head.data[1], matchValue[1].head.data[2], matchValue[1].tail] : matchValue[0].head.tag === 1 ? [5, matchValue[0].head.data[0], matchValue[0].head.data[1], matchValue[0].head.data[2], matchValue[0].tail] : [6, matchValue[1].head.data[0], matchValue[1].head.data[1], matchValue[1].head.data[2], matchValue[1].tail] : matchValue[0].head.tag === 1 ? [5, matchValue[0].head.data[0], matchValue[0].head.data[1], matchValue[0].head.data[2], matchValue[0].tail] : [3, matchValue[0].tail, matchValue[1].tail] : [2] : matchValue[1].tail != null ? [1] : [0];

      switch ($var2[0]) {
        case 0:
          return 0;

        case 1:
          return -1 | 0;

        case 2:
          return 1;

        case 3:
          comparer = comparer;
          l1 = $var2[1];
          l2 = $var2[2];
          continue compareStacks;

        case 4:
          const c = comparer.Compare($var2[1], $var2[3]) | 0;

          if (c !== 0) {
            return c | 0;
          } else {
            comparer = comparer;
            l1 = new List($var2[2], $var2[5]);
            l2 = new List($var2[4], $var2[6]);
            continue compareStacks;
          }

        case 5:
          comparer = comparer;
          l1 = ofArray_1([$var2[2], new SetTree(1, [$var2[1], empty(), $var2[3], 0])], $var2[4]);
          l2 = l2;
          continue compareStacks;

        case 6:
          comparer = comparer;
          l1 = l1;
          l2 = ofArray_1([$var2[2], new SetTree(1, [$var2[1], empty(), $var2[3], 0])], $var2[4]);
          continue compareStacks;
      }
    }
  };

  const compare = __exports.compare = function (comparer, s1, s2) {
    const matchValue = [s1, s2];

    if (matchValue[0].tag === 0) {
      if (matchValue[1].tag === 0) {
        return 0;
      } else {
        return -1 | 0;
      }
    } else if (matchValue[1].tag === 0) {
      return 1;
    } else {
      return compareStacks(comparer, ofArray_1([s1]), ofArray_1([s2])) | 0;
    }
  };

  const choose = __exports.choose = function (s) {
    return minimumElement(s);
  };

  const toList = __exports.toList = function (s) {
    const loop = function (m, x) {
      loop: while (true) {
        if (m.tag === 0) {
          return x;
        } else {
          const $var71 = m.data[1];
          x = new List(m.data[0], loop(m.data[2], x));
          m = $var71;
          continue loop;
        }
      }
    };

    return loop(s, new List());
  };

  const copyToArray = __exports.copyToArray = function (s, arr, i) {
    const j = {
      contents: i
    };
    iter(function (x) {
      arr[j.contents] = x;
      j.contents = j.contents + 1 | 0;
    }, s);
  };

  const toArray = __exports.toArray = function (s) {
    const n = count(s) | 0;
    const res = new Array(n).fill(null);
    copyToArray(s, res, 0);
    return res;
  };

  const mkFromEnumerator = __exports.mkFromEnumerator = function (comparer, acc, e) {
    mkFromEnumerator: while (true) {
      if (e.MoveNext()) {
        const $var72 = comparer;
        acc = add(comparer, e.get_Current, acc);
        e = e;
        comparer = $var72;
        continue mkFromEnumerator;
      } else {
        return acc;
      }
    }
  };

  const ofSeq = __exports.ofSeq = function (comparer, c) {
    const ie = getEnumerator(c);

    try {
      return mkFromEnumerator(comparer, empty(), ie);
    } finally {
      if (hasInterface(ie, "System.IDisposable")) {
        ie.Dispose();
      }
    }
  };

  const ofArray = __exports.ofArray = function (comparer, l) {
    return fold_2(function (acc, k) {
      return add(comparer, k, acc);
    }, empty(), l);
  };

  return __exports;
}({});

class _Set {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Collections.Tagged.Set",
      interfaces: ["System.Collections.Generic.IEnumerable", "System.Collections.Generic.ICollection", "System.IComparable"],
      properties: {
        Choose: GenericParam("T"),
        Comparer: Interface("System.Collections.Generic.IComparer"),
        Count: "number",
        IsEmpty: "boolean",
        MaximumElement: GenericParam("T"),
        MinimumElement: GenericParam("T"),
        Tree: makeGeneric(SetTree, {
          T: GenericParam("T")
        })
      }
    };
  }

  [Symbol.iterator]() {
    return toIterator(this.GetEnumerator());
  }

  constructor(comparer, tree) {
    this.comparer = comparer;
    this.tree = tree;
  }

  static [".cctor"]() {}

  get Tree() {
    return this.tree;
  }

  get Comparer() {
    return this.comparer;
  }

  static Empty(comparer) {
    return new _Set(comparer, SetTreeModule.empty());
  }

  Add_0(x) {
    const t = SetTreeModule.add(this.comparer, x, this.tree);
    return _Set.refresh(this, t);
  }

  Remove_0(x) {
    const t = SetTreeModule.remove(this.comparer, x, this.tree);
    return _Set.refresh(this, t);
  }

  get Count_0() {
    return SetTreeModule.count(this.tree);
  }

  Contains_0(x) {
    return SetTreeModule.contains(this.comparer, x, this.tree);
  }

  Iterate(x) {
    SetTreeModule.iter(x, this.tree);
  }

  Fold(f, x) {
    return SetTreeModule.fold(f, this.tree, x);
  }

  get IsEmpty() {
    return SetTreeModule.isEmpty(this.tree);
  }

  Partition(f) {
    if (this.tree.tag === 0) {
      return [this, this];
    } else {
      const patternInput = SetTreeModule.partition(this.comparer, f, this.tree);
      return [_Set.refresh(this, patternInput[0]), _Set.refresh(this, patternInput[1])];
    }
  }

  Filter(f) {
    if (this.tree.tag === 0) {
      return this;
    } else {
      return (t => _Set.refresh(this, t))(SetTreeModule.filter(this.comparer, f, this.tree));
    }
  }

  Exists(f) {
    return SetTreeModule.exists(f, this.tree);
  }

  ForAll(f) {
    return SetTreeModule.forAll(f, this.tree);
  }

  static op_Subtraction(a, b) {
    return _Set.Difference(a, b);
  }

  static op_Addition(a, b) {
    return _Set.Union(a, b);
  }

  static Intersection(a, b) {
    const matchValue = b.Tree;

    if (matchValue.tag === 0) {
      return b;
    } else {
      const matchValue_1 = a.Tree;

      if (matchValue_1.tag === 0) {
        return a;
      } else {
        return function (t) {
          return _Set.refresh(a, t);
        }(SetTreeModule.intersection(a.Comparer, a.Tree, b.Tree));
      }
    }
  }

  static Union(a, b) {
    const matchValue = b.Tree;

    if (matchValue.tag === 0) {
      return a;
    } else {
      const matchValue_1 = a.Tree;

      if (matchValue_1.tag === 0) {
        return b;
      } else {
        return function (t) {
          return _Set.refresh(a, t);
        }(SetTreeModule.union(a.Comparer, a.Tree, b.Tree));
      }
    }
  }

  static Difference(a, b) {
    const matchValue = a.Tree;

    if (matchValue.tag === 0) {
      return a;
    } else {
      const matchValue_1 = b.Tree;

      if (matchValue_1.tag === 0) {
        return a;
      } else {
        return function (t) {
          return _Set.refresh(a, t);
        }(SetTreeModule.diff(a.Comparer, a.Tree, b.Tree));
      }
    }
  }

  static Equality(a, b) {
    return SetTreeModule.compare(a.Comparer, a.Tree, b.Tree) === 0;
  }

  static Compare(a, b) {
    return SetTreeModule.compare(a.Comparer, a.Tree, b.Tree) | 0;
  }

  get Choose() {
    return SetTreeModule.choose(this.tree);
  }

  get MinimumElement() {
    return SetTreeModule.minimumElement(this.tree);
  }

  get MaximumElement() {
    return SetTreeModule.maximumElement(this.tree);
  }

  IsSubsetOf(y) {
    return SetTreeModule.subset(this.comparer, this.tree, y.Tree);
  }

  IsSupersetOf(y) {
    return SetTreeModule.subset(this.comparer, y.Tree, this.tree);
  }

  ToList() {
    return SetTreeModule.toList(this.tree);
  }

  ToArray() {
    return SetTreeModule.toArray(this.tree);
  }

  Equals(that) {
    if (that instanceof _Set) {
      return this.CompareTo(that) === 0;
    } else {
      return false;
    }
  }

  ComputeHashCode() {
    const combineHash = (x, y) => {
      return (x << 1) + y + 631 | 0;
    };

    let res = 0;

    for (let x_1 of this) {
      res = combineHash(res, hash(x_1)) | 0;
    }

    return Math.abs(res) | 0;
  }

  GetHashCode() {
    return this.ComputeHashCode();
  }

  static Singleton(comparer, x) {
    return _Set.Empty(comparer).Add_0(x);
  }

  static Create(comparer, l) {
    return new _Set(comparer, SetTreeModule.ofSeq(comparer, l));
  }

  CompareTo(s2) {
    return SetTreeModule.compare(this.Comparer, this.Tree, s2.Tree) | 0;
  }

  Add(_arg1) {
    throw new Error("ReadOnlyCollection");
  }

  Clear() {
    throw new Error("ReadOnlyCollection");
  }

  Remove(_arg2) {
    throw new Error("ReadOnlyCollection");
  }

  Contains(x) {
    return SetTreeModule.contains(this.comparer, x, this.tree);
  }

  CopyTo(arr, i) {
    SetTreeModule.copyToArray(this.tree, arr, i);
  }

  get IsReadOnly() {
    return true;
  }

  get Count() {
    return SetTreeModule.count(this.tree);
  }

  GetEnumerator() {
    return SetTreeModule.toSeq(this.tree);
  }

  static refresh(s, t) {
    return new _Set(s.Comparer, t);
  }

}

export { _Set as Set };
setType("Internal.Utilities.Collections.Tagged.Set", _Set);

_Set[".cctor"]();

export class MapTree {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Collections.Tagged.MapTree",
      interfaces: ["FSharpUnion"],
      cases: [["MapEmpty"], ["MapNode", GenericParam("Key"), GenericParam("T"), makeGeneric(MapTree, {
        Key: GenericParam("Key"),
        T: GenericParam("T")
      }), makeGeneric(MapTree, {
        Key: GenericParam("Key"),
        T: GenericParam("T")
      }), "number"]]
    };
  }

}
setType("Internal.Utilities.Collections.Tagged.MapTree", MapTree);
export const MapTreeModule = function (__exports) {
  const empty_1 = __exports.empty = function () {
    return new MapTree(0);
  };

  const rebalance_1 = __exports.rebalance = function (t1, k, v, t2) {
    var $var3;
    var $var12;
    const t1h = (t1.tag === 1 ? t1.data[4] : 0) | 0;
    const t2h = (t2.tag === 1 ? t2.data[4] : 0) | 0;

    if (t2h > t1h + 2) {
      if (t2.tag === 1) {
        if (($var3 = t2.data[2], $var3.tag === 1 ? $var3.data[4] : 0) > t1h + 1) {
          if (t2.data[2].tag === 1) {
            let $var8;
            const $var6 = t2.data[3];
            const $var5 = t2.data[2].data[3];
            const hl_1 = ($var5.tag === 1 ? $var5.data[4] : 0) | 0;
            const hr_1 = ($var6.tag === 1 ? $var6.data[4] : 0) | 0;
            const m_1 = (hl_1 < hr_1 ? hr_1 : hl_1) | 0;
            $var8 = new MapTree(1, [t2.data[0], t2.data[1], $var5, $var6, m_1 + 1]);
            let $var7;
            const $var4 = t2.data[2].data[2];
            const hl = (t1.tag === 1 ? t1.data[4] : 0) | 0;
            const hr = ($var4.tag === 1 ? $var4.data[4] : 0) | 0;
            const m = (hl < hr ? hr : hl) | 0;
            $var7 = new MapTree(1, [k, v, t1, $var4, m + 1]);
            const hl_2 = ($var7.tag === 1 ? $var7.data[4] : 0) | 0;
            const hr_2 = ($var8.tag === 1 ? $var8.data[4] : 0) | 0;
            const m_2 = (hl_2 < hr_2 ? hr_2 : hl_2) | 0;
            return new MapTree(1, [t2.data[2].data[0], t2.data[2].data[1], $var7, $var8, m_2 + 1]);
          } else {
            throw new Error("rebalance");
          }
        } else {
          const $var11 = t2.data[3];
          let $var10;
          const $var9 = t2.data[2];
          const hl_3 = (t1.tag === 1 ? t1.data[4] : 0) | 0;
          const hr_3 = ($var9.tag === 1 ? $var9.data[4] : 0) | 0;
          const m_3 = (hl_3 < hr_3 ? hr_3 : hl_3) | 0;
          $var10 = new MapTree(1, [k, v, t1, $var9, m_3 + 1]);
          const hl_4 = ($var10.tag === 1 ? $var10.data[4] : 0) | 0;
          const hr_4 = ($var11.tag === 1 ? $var11.data[4] : 0) | 0;
          const m_4 = (hl_4 < hr_4 ? hr_4 : hl_4) | 0;
          return new MapTree(1, [t2.data[0], t2.data[1], $var10, $var11, m_4 + 1]);
        }
      } else {
        throw new Error("rebalance");
      }
    } else if (t1h > t2h + 2) {
      if (t1.tag === 1) {
        if (($var12 = t1.data[3], $var12.tag === 1 ? $var12.data[4] : 0) > t2h + 1) {
          if (t1.data[3].tag === 1) {
            let $var17;
            const $var15 = t1.data[3].data[3];
            const hl_6 = ($var15.tag === 1 ? $var15.data[4] : 0) | 0;
            const hr_6 = (t2.tag === 1 ? t2.data[4] : 0) | 0;
            const m_6 = (hl_6 < hr_6 ? hr_6 : hl_6) | 0;
            $var17 = new MapTree(1, [k, v, $var15, t2, m_6 + 1]);
            let $var16;
            const $var14 = t1.data[3].data[2];
            const $var13 = t1.data[2];
            const hl_5 = ($var13.tag === 1 ? $var13.data[4] : 0) | 0;
            const hr_5 = ($var14.tag === 1 ? $var14.data[4] : 0) | 0;
            const m_5 = (hl_5 < hr_5 ? hr_5 : hl_5) | 0;
            $var16 = new MapTree(1, [t1.data[0], t1.data[1], $var13, $var14, m_5 + 1]);
            const hl_7 = ($var16.tag === 1 ? $var16.data[4] : 0) | 0;
            const hr_7 = ($var17.tag === 1 ? $var17.data[4] : 0) | 0;
            const m_7 = (hl_7 < hr_7 ? hr_7 : hl_7) | 0;
            return new MapTree(1, [t1.data[3].data[0], t1.data[3].data[1], $var16, $var17, m_7 + 1]);
          } else {
            throw new Error("rebalance");
          }
        } else {
          let $var20;
          const $var18 = t1.data[3];
          const hl_8 = ($var18.tag === 1 ? $var18.data[4] : 0) | 0;
          const hr_8 = (t2.tag === 1 ? t2.data[4] : 0) | 0;
          const m_8 = (hl_8 < hr_8 ? hr_8 : hl_8) | 0;
          $var20 = new MapTree(1, [k, v, $var18, t2, m_8 + 1]);
          const $var19 = t1.data[2];
          const hl_9 = ($var19.tag === 1 ? $var19.data[4] : 0) | 0;
          const hr_9 = ($var20.tag === 1 ? $var20.data[4] : 0) | 0;
          const m_9 = (hl_9 < hr_9 ? hr_9 : hl_9) | 0;
          return new MapTree(1, [t1.data[0], t1.data[1], $var19, $var20, m_9 + 1]);
        }
      } else {
        throw new Error("rebalance");
      }
    } else {
      const hl_10 = (t1.tag === 1 ? t1.data[4] : 0) | 0;
      const hr_10 = (t2.tag === 1 ? t2.data[4] : 0) | 0;
      const m_10 = (hl_10 < hr_10 ? hr_10 : hl_10) | 0;
      return new MapTree(1, [k, v, t1, t2, m_10 + 1]);
    }
  };

  const sizeAux = __exports.sizeAux = function (acc, m) {
    sizeAux: while (true) {
      if (m.tag === 1) {
        acc = sizeAux(acc + 1, m.data[2]);
        m = m.data[3];
        continue sizeAux;
      } else {
        return acc | 0;
      }
    }
  };

  const MapOne = __exports.MapOne = function (k, v) {
    return new MapTree(1, [k, v, new MapTree(0), new MapTree(0), 1]);
  };

  const count_1 = __exports.count = function (x) {
    return sizeAux(0, x) | 0;
  };

  const add_1 = __exports.add = function (comparer, k, v, m) {
    if (m.tag === 1) {
      const c = comparer.Compare(k, m.data[0]) | 0;

      if (c < 0) {
        return rebalance_1(add_1(comparer, k, v, m.data[2]), m.data[0], m.data[1], m.data[3]);
      } else if (c === 0) {
        return new MapTree(1, [k, v, m.data[2], m.data[3], m.data[4]]);
      } else {
        return rebalance_1(m.data[2], m.data[0], m.data[1], add_1(comparer, k, v, m.data[3]));
      }
    } else {
      return MapOne(k, v);
    }
  };

  const indexNotFound = __exports.indexNotFound = function () {
    throw new Error("An index satisfying the predicate was not found in the collection");
  };

  const find = __exports.find = function (comparer, k, m) {
    find: while (true) {
      if (m.tag === 1) {
        const c = comparer.Compare(k, m.data[0]) | 0;

        if (c < 0) {
          comparer = comparer;
          k = k;
          m = m.data[2];
          continue find;
        } else if (c === 0) {
          return m.data[1];
        } else {
          comparer = comparer;
          k = k;
          m = m.data[3];
          continue find;
        }
      } else {
        return indexNotFound();
      }
    }
  };

  const tryFind = __exports.tryFind = function (comparer, k, m) {
    tryFind: while (true) {
      if (m.tag === 1) {
        const c = comparer.Compare(k, m.data[0]) | 0;

        if (c < 0) {
          comparer = comparer;
          k = k;
          m = m.data[2];
          continue tryFind;
        } else if (c === 0) {
          return makeSome(m.data[1]);
        } else {
          comparer = comparer;
          k = k;
          m = m.data[3];
          continue tryFind;
        }
      } else {
        return null;
      }
    }
  };

  const partition1_1 = __exports.partition1 = function (comparer, f, k, v, acc1, acc2) {
    if (f(k, v)) {
      return [add_1(comparer, k, v, acc1), acc2];
    } else {
      return [acc1, add_1(comparer, k, v, acc2)];
    }
  };

  const partitionAux_1 = __exports.partitionAux = function ($var86, $var87, $var88, $var89, $var90) {
    partitionAux_1: while (true) {
      const comparer = $var86;
      const f = $var87;
      const s = $var88;
      const acc_0 = $var89;
      const acc_1 = $var90;
      const acc = [acc_0, acc_1];

      if (s.tag === 1) {
        const acc_2 = partitionAux_1(comparer, f, s.data[3], acc[0], acc[1]);
        const acc_3 = partition1_1(comparer, f, s.data[0], s.data[1], acc_2[0], acc_2[1]);
        $var86 = comparer;
        $var87 = f;
        $var88 = s.data[2];
        $var89 = acc_3[0];
        $var90 = acc_3[1];
        continue partitionAux_1;
      } else {
        return acc;
      }
    }
  };

  const partition_1 = __exports.partition = function (comparer, f, s) {
    return partitionAux_1(comparer, f, s, empty_1(), empty_1());
  };

  const filter1 = __exports.filter1 = function (comparer, f, k, v, acc) {
    if (f(k, v)) {
      return add_1(comparer, k, v, acc);
    } else {
      return acc;
    }
  };

  const filterAux_1 = __exports.filterAux = function ($var99, $var100, $var101, $var102) {
    filterAux_1: while (true) {
      const comparer = $var99;
      const f = $var100;
      const s = $var101;
      const acc = $var102;

      if (s.tag === 1) {
        const acc_1 = filterAux_1(comparer, f, s.data[2], acc);
        const acc_2 = filter1(comparer, f, s.data[0], s.data[1], acc_1);
        $var99 = comparer;
        $var100 = f;
        $var101 = s.data[3];
        $var102 = acc_2;
        continue filterAux_1;
      } else {
        return acc;
      }
    }
  };

  const filter_1 = __exports.filter = function (comparer, f, s) {
    return filterAux_1(comparer, f, s, empty_1());
  };

  const spliceOutSuccessor_1 = __exports.spliceOutSuccessor = function (m) {
    if (m.tag === 1) {
      if (m.data[2].tag === 0) {
        return [m.data[0], m.data[1], m.data[3]];
      } else {
        const patternInput = spliceOutSuccessor_1(m.data[2]);
        return [patternInput[0], patternInput[1], (() => {
          const $var22 = m.data[3];
          const $var21 = patternInput[2];
          const hl = ($var21.tag === 1 ? $var21.data[4] : 0) | 0;
          const hr = ($var22.tag === 1 ? $var22.data[4] : 0) | 0;
          const m_1 = (hl < hr ? hr : hl) | 0;
          return new MapTree(1, [m.data[0], m.data[1], $var21, $var22, m_1 + 1]);
        })()];
      }
    } else {
      throw new Error("internal error: Map.splice_out_succ_or_pred");
    }
  };

  const remove_1 = __exports.remove = function (comparer, k, m) {
    if (m.tag === 1) {
      const c = comparer.Compare(k, m.data[0]) | 0;

      if (c < 0) {
        return rebalance_1(remove_1(comparer, k, m.data[2]), m.data[0], m.data[1], m.data[3]);
      } else if (c === 0) {
        const matchValue = [m.data[2], m.data[3]];

        if (matchValue[0].tag === 0) {
          return m.data[3];
        } else if (matchValue[1].tag === 0) {
          return m.data[2];
        } else {
          const patternInput = spliceOutSuccessor_1(m.data[3]);
          const $var24 = patternInput[2];
          const $var23 = m.data[2];
          const hl = ($var23.tag === 1 ? $var23.data[4] : 0) | 0;
          const hr = ($var24.tag === 1 ? $var24.data[4] : 0) | 0;
          const m_1 = (hl < hr ? hr : hl) | 0;
          return new MapTree(1, [patternInput[0], patternInput[1], $var23, $var24, m_1 + 1]);
        }
      } else {
        return rebalance_1(m.data[2], m.data[0], m.data[1], remove_1(comparer, k, m.data[3]));
      }
    } else {
      return empty_1();
    }
  };

  const containsKey = __exports.containsKey = function (comparer, k, m) {
    containsKey: while (true) {
      if (m.tag === 1) {
        const c = comparer.Compare(k, m.data[0]) | 0;

        if (c < 0) {
          comparer = comparer;
          k = k;
          m = m.data[2];
          continue containsKey;
        } else if (c === 0) {
          return true;
        } else {
          comparer = comparer;
          k = k;
          m = m.data[3];
          continue containsKey;
        }
      } else {
        return false;
      }
    }
  };

  const iter_1 = __exports.iter = function (f, m) {
    if (m.tag === 1) {
      iter_1(f, m.data[2]);
      f(m.data[0], m.data[1]);
      iter_1(f, m.data[3]);
    }
  };

  const first = __exports.first = function ($var108, $var109) {
    first: while (true) {
      const f = $var108;
      const m = $var109;

      if (m.tag === 1) {
        const matchValue = first(f, m.data[2]);

        if (matchValue == null) {
          const matchValue_1 = f(m.data[0], m.data[1]);

          if (matchValue_1 == null) {
            $var108 = f;
            $var109 = m.data[3];
            continue first;
          } else {
            return matchValue_1;
          }
        } else {
          return matchValue;
        }
      } else {
        return null;
      }
    }
  };

  const exists_1 = __exports.exists = function ($var110, $var111) {
    exists_1: while (true) {
      const f = $var110;
      const m = $var111;

      if (m.tag === 1) {
        if (f(m.data[0], m.data[1]) ? true : exists_1(f, m.data[2])) {
          return true;
        } else {
          $var110 = f;
          $var111 = m.data[3];
          continue exists_1;
        }
      } else {
        return false;
      }
    }
  };

  const forAll_1 = __exports.forAll = function ($var112, $var113) {
    forAll_1: while (true) {
      const f = $var112;
      const m = $var113;

      if (m.tag === 1) {
        if (f(m.data[0], m.data[1]) ? forAll_1(f, m.data[2]) : false) {
          $var112 = f;
          $var113 = m.data[3];
          continue forAll_1;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  };

  const map = __exports.map = function (f, m) {
    if (m.tag === 1) {
      const v2 = f(m.data[1]);
      return new MapTree(1, [m.data[0], v2, map(f, m.data[2]), map(f, m.data[3]), m.data[4]]);
    } else {
      return empty_1();
    }
  };

  const mapi = __exports.mapi = function (f, m) {
    if (m.tag === 1) {
      const v2 = f(m.data[0], m.data[1]);
      return new MapTree(1, [m.data[0], v2, mapi(f, m.data[2]), mapi(f, m.data[3]), m.data[4]]);
    } else {
      return empty_1();
    }
  };

  const fold_1 = __exports.fold = function ($var118, $var119, $var120) {
    fold_1: while (true) {
      const f = $var118;
      const m = $var119;
      const x = $var120;

      if (m.tag === 1) {
        $var118 = f;
        $var119 = m.data[2];
        $var120 = f(m.data[0], m.data[1], fold_1(f, m.data[3], x));
        continue fold_1;
      } else {
        return x;
      }
    }
  };

  const foldSection = __exports.foldSection = function (comparer, lo, hi, f, m, x) {
    const fold_from_to = function (f_1, m_1, x_1) {
      if (m_1.tag === 1) {
        const clo_k = comparer.Compare(lo, m_1.data[0]) | 0;
        const ck_hi = comparer.Compare(m_1.data[0], hi) | 0;
        const x_2 = clo_k < 0 ? fold_from_to(f_1, m_1.data[2], x_1) : x_1;
        const x_3 = (clo_k <= 0 ? ck_hi <= 0 : false) ? f_1(m_1.data[0], m_1.data[1], x_2) : x_2;
        const x_4 = ck_hi < 0 ? fold_from_to(f_1, m_1.data[3], x_3) : x_3;
        return x_4;
      } else {
        return x_1;
      }
    };

    if (comparer.Compare(lo, hi) === 1) {
      return x;
    } else {
      return fold_from_to(f, m, x);
    }
  };

  const foldMap = __exports.foldMap = function ($var130, $var131, $var132, $var133, $var134) {
    foldMap: while (true) {
      const comparer = $var130;
      const f = $var131;
      const m = $var132;
      const z = $var133;
      const acc = $var134;

      if (m.tag === 1) {
        const patternInput = foldMap(comparer, f, m.data[3], z, acc);
        const patternInput_1 = f(m.data[0], m.data[1], patternInput[1]);
        const acc_1 = add_1(comparer, m.data[0], patternInput_1[0], patternInput[0]);
        $var130 = comparer;
        $var131 = f;
        $var132 = m.data[2];
        $var133 = patternInput_1[1];
        $var134 = acc_1;
        continue foldMap;
      } else {
        return [acc, z];
      }
    }
  };

  const toList_1 = __exports.toList = function (m) {
    return fold_1(function (k, v, acc) {
      return new List([k, v], acc);
    }, m, new List());
  };

  const toArray_1 = __exports.toArray = function (m) {
    return Array.from(toList_1(m));
  };

  const ofList = __exports.ofList = function (comparer, l) {
    return fold_2(function (acc, tupledArg) {
      return add_1(comparer, tupledArg[0], tupledArg[1], acc);
    }, empty_1(), l);
  };

  const mkFromEnumerator_1 = __exports.mkFromEnumerator = function (comparer, acc, e) {
    mkFromEnumerator_1: while (true) {
      if (e.MoveNext()) {
        const patternInput = e.get_Current;
        const $var135 = comparer;
        acc = add_1(comparer, patternInput[0], patternInput[1], acc);
        e = e;
        comparer = $var135;
        continue mkFromEnumerator_1;
      } else {
        return acc;
      }
    }
  };

  const ofSeq_1 = __exports.ofSeq = function (comparer, c) {
    const ie = getEnumerator(c);

    try {
      return mkFromEnumerator_1(comparer, empty_1(), ie);
    } finally {
      if (hasInterface(ie, "System.IDisposable")) {
        ie.Dispose();
      }
    }
  };

  const copyToArray_1 = __exports.copyToArray = function (s, arr, i) {
    const j = {
      contents: i
    };
    iter_1(function (x, y) {
      arr[j.contents] = [x, y];
      j.contents = j.contents + 1 | 0;
    }, s);
  };

  const MapIterator = __exports.MapIterator = class MapIterator {
    [_Symbol.reflection]() {
      return {
        type: "Internal.Utilities.Collections.Tagged.MapTreeModule.MapIterator",
        properties: {
          Current: Tuple([GenericParam("Key"), GenericParam("T")])
        }
      };
    }

    constructor(s) {
      const stack = ofArray_1([s]);
      this.stack = this.collapseLHS(stack);
      this.started = false;
    }

    get Current() {
      if (this.started) {
        const matchValue = this.stack;
        const $var25 = matchValue.tail == null ? [1] : matchValue.head.tag === 1 ? matchValue.head.data[2].tag === 0 ? matchValue.head.data[3].tag === 0 ? [0, matchValue.head.data[0], matchValue.head.data[1]] : [2] : [2] : [2];

        switch ($var25[0]) {
          case 0:
            return [$var25[1], $var25[2]];

          case 1:
            return this.alreadyFinished();

          case 2:
            throw new Error("Please report error: Map iterator, unexpected stack for current");
        }
      } else {
        return this.notStarted();
      }
    }

    MoveNext() {
      if (this.started) {
        const matchValue = this.stack;
        const $var26 = matchValue.tail == null ? [1] : matchValue.head.tag === 1 ? matchValue.head.data[2].tag === 0 ? matchValue.head.data[3].tag === 0 ? [0, matchValue.tail] : [2] : [2] : [2];

        switch ($var26[0]) {
          case 0:
            this.stack = this.collapseLHS($var26[1]);
            return !(this.stack.tail == null);

          case 1:
            return false;

          case 2:
            throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
        }
      } else {
        this.started = true;
        return !(this.stack.tail == null);
      }
    }

    collapseLHS(stack) {
      const $var27 = stack.tail != null ? stack.head.tag === 1 ? stack.head.data[2].tag === 0 ? stack.head.data[3].tag === 0 ? [2] : [3, stack.head.data[0], stack.head.data[2], stack.head.data[3], stack.tail, stack.head.data[1]] : [3, stack.head.data[0], stack.head.data[2], stack.head.data[3], stack.tail, stack.head.data[1]] : [1, stack.tail] : [0];

      switch ($var27[0]) {
        case 0:
          return new List();

        case 1:
          return (stack_1 => this.collapseLHS(stack_1))($var27[1]);

        case 2:
          return stack;

        case 3:
          return (stack_2 => this.collapseLHS(stack_2))(ofArray_1([$var27[2], MapOne($var27[1], $var27[5]), $var27[3]], $var27[4]));
      }
    }

    notStarted() {
      throw new Error("Enumeration has not started. Call MoveNext.");
    }

    alreadyFinished() {
      throw new Error("Enumeration already finished.");
    }

  };
  setType("Internal.Utilities.Collections.Tagged.MapTreeModule.MapIterator", MapIterator);

  const toSeq_1 = __exports.toSeq = function (s) {
    const i = {
      contents: new MapIterator(s)
    };
    return {
      get Current() {
        return i.contents.Current;
      },

      MoveNext() {
        return i.contents.MoveNext();
      },

      Reset() {
        i.contents = new MapIterator(s);
      },

      Dispose() {},

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEnumerator", "System.IDisposable"]
        };
      }

    };
  };

  return __exports;
}({});

class _Map {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Collections.Tagged.Map",
      interfaces: ["System.IComparable", "System.Collections.Generic.IEnumerable"],
      properties: {
        Comparer: Interface("System.Collections.Generic.IComparer"),
        Count: "number",
        IsEmpty: "boolean",
        Item: GenericParam("Value"),
        Tree: makeGeneric(MapTree, {
          Key: GenericParam("Key"),
          T: GenericParam("Value")
        })
      }
    };
  }

  [Symbol.iterator]() {
    return toIterator(this.GetEnumerator());
  }

  constructor(comparer, tree) {
    this.comparer = comparer;
    this.tree = tree;
  }

  static [".cctor"]() {}

  get Tree() {
    return this.tree;
  }

  get Comparer() {
    return this.comparer;
  }

  static Empty(comparer) {
    return new _Map(comparer, MapTreeModule.empty());
  }

  Add(k, v) {
    const t = MapTreeModule.add(this.comparer, k, v, this.tree);
    return _Map.refresh(this, t);
  }

  get IsEmpty() {
    const $var28 = this.tree;

    if ($var28.tag === 0) {
      return true;
    } else {
      return false;
    }
  }

  get_Item(k) {
    return MapTreeModule.find(this.comparer, k, this.tree);
  }

  First(f) {
    return MapTreeModule.first(f, this.tree);
  }

  Exists(f) {
    return MapTreeModule.exists(f, this.tree);
  }

  Filter(f) {
    return (t => _Map.refresh(this, t))(MapTreeModule.filter(this.comparer, f, this.tree));
  }

  ForAll(f) {
    return MapTreeModule.forAll(f, this.tree);
  }

  Fold(f, acc) {
    return MapTreeModule.fold(f, this.tree, acc);
  }

  FoldSection(lo, hi, f, acc) {
    return MapTreeModule.foldSection(this.comparer, lo, hi, f, this.tree, acc);
  }

  FoldAndMap(f, z) {
    const patternInput = MapTreeModule.foldMap(this.comparer, f, this.tree, z, MapTreeModule.empty());
    return [_Map.refresh(this, patternInput[0]), patternInput[1]];
  }

  Iterate(f) {
    MapTreeModule.iter(f, this.tree);
  }

  MapRange(f) {
    const t = MapTreeModule.map(f, this.tree);
    return _Map.refresh(this, t);
  }

  Map(f) {
    const t = MapTreeModule.mapi(f, this.tree);
    return _Map.refresh(this, t);
  }

  Partition(f) {
    const patternInput = MapTreeModule.partition(this.comparer, f, this.tree);
    return [_Map.refresh(this, patternInput[0]), _Map.refresh(this, patternInput[1])];
  }

  get Count() {
    return MapTreeModule.count(this.tree);
  }

  ContainsKey(k) {
    return MapTreeModule.containsKey(this.comparer, k, this.tree);
  }

  Remove(k) {
    const t = MapTreeModule.remove(this.comparer, k, this.tree);
    return _Map.refresh(this, t);
  }

  TryFind(k) {
    return MapTreeModule.tryFind(this.comparer, k, this.tree);
  }

  ToList() {
    return MapTreeModule.toList(this.tree);
  }

  ToArray() {
    return MapTreeModule.toArray(this.tree);
  }

  static FromList(comparer, l) {
    return new _Map(comparer, MapTreeModule.ofList(comparer, l));
  }

  static Create(comparer, ie) {
    return new _Map(comparer, MapTreeModule.ofSeq(comparer, ie));
  }

  Equals(that) {
    if (that instanceof _Map) {
      return this.CompareTo(that) === 0;
    } else {
      return false;
    }
  }

  ComputeHashCode() {
    const combineHash = (x, y) => {
      return (x << 1) + y + 631 | 0;
    };

    let res = 0;

    for (let forLoopVar of this) {
      const activePatternResult5352 = forLoopVar;
      res = combineHash(res, hash(activePatternResult5352[0])) | 0;
      res = combineHash(res, hash(activePatternResult5352[1])) | 0;
    }

    return Math.abs(res) | 0;
  }

  GetHashCode() {
    return this.ComputeHashCode();
  }

  GetEnumerator() {
    return MapTreeModule.toSeq(this.tree);
  }

  CompareTo(m2) {
    return compareWith((kvp1, kvp2) => {
      const c = this.Comparer.Compare(kvp1[0], kvp2[0]) | 0;

      if (c !== 0) {
        return c | 0;
      } else {
        return compare_1(kvp1[1], kvp2[1]) | 0;
      }
    }, this, m2) | 0;
  }

  static refresh(m, t) {
    return new _Map(m.Comparer, t);
  }

}

export { _Map as Map };
setType("Internal.Utilities.Collections.Tagged.Map", _Map);

_Map[".cctor"]();