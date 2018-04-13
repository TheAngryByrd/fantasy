import { fromBits } from "../fable-core/Long";
import { notFound, String as _String, Shim } from "../absil/illib";
import { Microsoft, System } from "../fcs-fable/adapters";
import { checkSuffix } from "../utils/filename";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { iterate, forAll, exists, foldBack } from "../fable-core/Seq";
import { ZsetModule } from "../absil/zset";
import { create, foldBack as foldBack_1 } from "../fable-core/Map";
import { getValue } from "../fable-core/Option";
import { ZmapModule } from "../absil/zmap";
import CurriedLambda from "../fable-core/CurriedLambda";
import { filter, map as map_1, reverse, append } from "../fable-core/List";
import List_1 from "../fable-core/List";
import { compare, compareRecords, equalsRecords, makeGeneric, GenericParam, toString, equals as equals_1 } from "../fable-core/Util";
import Comparer from "../fable-core/Comparer";
export const debug = false;
export const verbose = false;
export const progress = {
  contents: false
};
export const tracking = {
  contents: false
};
export function condition(_s) {
  return false;
}
export function GetEnvInteger(_e, dflt) {
  return dflt;
}
export const Bits = function (__exports) {
  const b0 = __exports.b0 = function (n) {
    return n & 255 | 0;
  };

  const b1 = __exports.b1 = function (n) {
    return n >> 8 & 255 | 0;
  };

  const b2 = __exports.b2 = function (n) {
    return n >> 16 & 255 | 0;
  };

  const b3 = __exports.b3 = function (n) {
    return n >> 24 & 255 | 0;
  };

  const pown32 = __exports.pown32 = function (n) {
    if (n === 0) {
      return 0;
    } else {
      return pown32(n - 1) | 1 << n - 1 | 0;
    }
  };

  const pown64 = __exports.pown64 = function (n) {
    if (n === 0) {
      return fromBits(0, 0, false);
    } else {
      return pown64(n - 1).or(fromBits(1, 0, false).shl(n - 1));
    }
  };

  const mask32 = __exports.mask32 = function (m, n) {
    return pown32(n) << m | 0;
  };

  const mask64 = __exports.mask64 = function (m, n) {
    return pown64(n).shl(m);
  };

  return __exports;
}({});
export const Filename = function (__exports) {
  const fullpath = __exports.fullpath = function (cwd, nm) {
    const p = Shim.FileSystem().IsPathRootedShim(nm) ? nm : System.IO.Path.Combine(cwd, nm);

    try {
      return Shim.FileSystem().GetFullPathShim(p);
    } catch (matchValue) {
      const $var1 = matchValue instanceof Error ? [0] : matchValue instanceof Error ? [0] : matchValue instanceof Error ? [0] : matchValue instanceof Error ? [0] : [1];

      switch ($var1[0]) {
        case 0:
          return p;

        case 1:
          throw matchValue;
      }
    }
  };

  const hasSuffixCaseInsensitive = __exports.hasSuffixCaseInsensitive = function (suffix, filename) {
    return checkSuffix(_String.lowercase(filename), _String.lowercase(suffix));
  };

  const isDll = __exports.isDll = function (file) {
    return hasSuffixCaseInsensitive(".dll", file);
  };

  return __exports;
}({});
export const Bool = function (__exports) {
  const order = __exports.order = Microsoft.FSharp.Core.LanguagePrimitives.FastGenericComparer();
  return __exports;
}({});
export const Int32 = function (__exports) {
  const order_1 = __exports.order = Microsoft.FSharp.Core.LanguagePrimitives.FastGenericComparer();
  return __exports;
}({});
export const Int64 = function (__exports) {
  const order_2 = __exports.order = Microsoft.FSharp.Core.LanguagePrimitives.FastGenericComparer();
  return __exports;
}({});
export const Pair = function (__exports) {
  const order_3 = __exports.order = function (compare1, compare2) {
    return {
      Compare(_arg1, _arg2) {
        const res1 = compare1.Compare(_arg1[0], _arg2[0]) | 0;

        if (res1 !== 0) {
          return res1 | 0;
        } else {
          return compare2.Compare(_arg1[1], _arg2[1]) | 0;
        }
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IComparer"]
        };
      }

    };
  };

  return __exports;
}({});
export const NameSetModule = function (__exports) {
  const ofList = __exports.ofList = function (l) {
    return foldBack(function (arg00_, arg10_) {
      return ZsetModule.add(arg00_, arg10_);
    }, l, ZsetModule.empty(_String.order));
  };

  return __exports;
}({});
export const NameMapModule = function (__exports) {
  const domain = __exports.domain = function (m) {
    return foldBack_1(function (x, _arg1, acc) {
      return ZsetModule.add(x, acc);
    }, m, ZsetModule.empty(_String.order));
  };

  const domainL = __exports.domainL = function (m) {
    return ZsetModule.elements(domain(m));
  };

  return __exports;
}({});
export const Check = function (__exports) {
  const NotNone = __exports.NotNone = function (argname, arg) {
    if (arg != null) {
      return getValue(arg);
    } else {
      throw new Error(argname);
    }
  };

  const ArgumentNotNull = __exports.ArgumentNotNull = function (arg, argname) {
    const matchValue = arg;

    if (matchValue == null) {
      throw new Error(argname);
    }
  };

  const ArrayArgumentNotNullOrEmpty = __exports.ArrayArgumentNotNullOrEmpty = function (arr, argname) {
    ArgumentNotNull(arr, argname);

    if (0 === arr.length) {
      throw new Error(argname);
    }
  };

  const StringArgumentNotNullOrEmpty = __exports.StringArgumentNotNullOrEmpty = function (s, argname) {
    ArgumentNotNull(s, argname);

    if (s.length === 0) {
      throw new Error(argname);
    }
  };

  return __exports;
}({});
export const IntMap = function (__exports) {
  const empty = __exports.empty = function () {
    return ZmapModule.empty(Int32.order);
  };

  const add = __exports.add = function (k, v, t) {
    return ZmapModule.add(k, v, t);
  };

  const find = __exports.find = function (k, t) {
    return ZmapModule.find(k, t);
  };

  const tryFind = __exports.tryFind = function (k, t) {
    return ZmapModule.tryFind(k, t);
  };

  const remove = __exports.remove = function (k, t) {
    return ZmapModule.remove(k, t);
  };

  const mem = __exports.mem = function (k, t) {
    return ZmapModule.mem(k, t);
  };

  const iter = __exports.iter = function (f, t) {
    ZmapModule.iter(f, t);
  };

  const map = __exports.map = function (f, t) {
    return ZmapModule.map(f, t);
  };

  const fold = __exports.fold = function (f, t, z) {
    return ZmapModule.fold(f, t, z);
  };

  return __exports;
}({});
export const ListAssoc = function (__exports) {
  const find_1 = __exports.find = function ($var10, $var11, $var12) {
    find_1: while (true) {
      const f = $var10;
      const x = $var11;
      const l = $var12;

      if (l.tail != null) {
        const y = l.head[1];
        const x_ = l.head[0];

        if (f(x, x_)) {
          return y;
        } else {
          $var10 = f;
          $var11 = x;
          $var12 = l.tail;
          continue find_1;
        }
      } else {
        return notFound();
      }
    }
  };

  const containsKey = __exports.containsKey = function ($var13, $var14, $var15) {
    containsKey: while (true) {
      const f = $var13;
      const x = $var14;
      const l = $var15;

      if (l.tail != null) {
        const x_ = l.head[0];
        const _y = l.head[1];

        if (f(x, x_)) {
          return true;
        } else {
          $var13 = f;
          $var14 = x;
          $var15 = l.tail;
          continue containsKey;
        }
      } else {
        return false;
      }
    }
  };

  return __exports;
}({});
export const ListSet = function (__exports) {
  const insert = __exports.insert = function (f, x, l) {
    if (exists(CurriedLambda(f)(x), l)) {
      return l;
    } else {
      return new List_1(x, l);
    }
  };

  const unionFavourRight = __exports.unionFavourRight = function (f, l1, l2) {
    const matchValue = [l1, l2];

    if (matchValue[1].tail == null) {
      return l1;
    } else if (matchValue[0].tail == null) {
      return l2;
    } else {
      return foldBack(function (x, l) {
        return insert(f, x, l);
      }, l1, l2);
    }
  };

  const findIndexAux = function ($var22, $var23, $var24, $var25) {
    findIndexAux: while (true) {
      const eq = $var22;
      const x = $var23;
      const l = $var24;
      const n = $var25;

      if (l.tail != null) {
        if (eq(l.head, x)) {
          return n | 0;
        } else {
          $var22 = eq;
          $var23 = x;
          $var24 = l.tail;
          $var25 = n + 1;
          continue findIndexAux;
        }
      } else {
        return notFound() | 0;
      }
    }
  };

  const findIndex = __exports.findIndex = function (eq, x, l) {
    return findIndexAux(eq, x, l, 0) | 0;
  };

  const remove_1 = __exports.remove = function (f, x, l) {
    if (l.tail == null) {
      return new List_1();
    } else if (f(x, l.head)) {
      return l.tail;
    } else {
      return new List_1(l.head, remove_1(f, x, l.tail));
    }
  };

  const subtract = __exports.subtract = function ($var32, $var33, $var34) {
    subtract: while (true) {
      const f = $var32;
      const l1 = $var33;
      const l2 = $var34;

      if (l2.tail == null) {
        return l1;
      } else {
        $var32 = f;
        $var33 = remove_1(function (y2, y1) {
          return f(y1, y2);
        }, l2.head, l1);
        $var34 = l2.tail;
        continue subtract;
      }
    }
  };

  const isSubsetOf = __exports.isSubsetOf = function (f, l1, l2) {
    return forAll(function (x1) {
      return exists(CurriedLambda(f)(x1), l2);
    }, l1);
  };

  const isSupersetOf = __exports.isSupersetOf = function (f, l1, l2) {
    return forAll(function (x2) {
      return exists(CurriedLambda(function (y2, y1) {
        return f(y1, y2);
      })(x2), l1);
    }, l2);
  };

  const equals = __exports.equals = function (f, l1, l2) {
    if (isSubsetOf(f, l1, l2)) {
      return isSupersetOf(f, l1, l2);
    } else {
      return false;
    }
  };

  const unionFavourLeft = __exports.unionFavourLeft = function (f, l1, l2) {
    const matchValue = [l1, l2];

    if (matchValue[1].tail == null) {
      return l1;
    } else if (matchValue[0].tail == null) {
      return l2;
    } else {
      return append(l1, subtract(f, l2, l1));
    }
  };

  const intersect = __exports.intersect = function ($var47, $var48, $var49) {
    intersect: while (true) {
      const f = $var47;
      const l1 = $var48;
      const l2 = $var49;

      if (l2.tail == null) {
        return new List_1();
      } else if (exists(CurriedLambda(f)(l2.head), l1)) {
        return new List_1(l2.head, intersect(f, l1, l2.tail));
      } else {
        $var47 = f;
        $var48 = l1;
        $var49 = l2.tail;
        continue intersect;
      }
    }
  };

  const setify = __exports.setify = function (f, l) {
    return reverse(foldBack(function (x, l_1) {
      return insert(f, x, l_1);
    }, reverse(l), new List_1()));
  };

  return __exports;
}({});
export function mapFoldFst(f, s, x, y) {
  const patternInput = f(s, x);
  return [[patternInput[0], y], patternInput[1]];
}
export function mapFoldSnd(f, s, x, y) {
  const patternInput = f(s, y);
  return [[x, patternInput[0]], patternInput[1]];
}
export function pair(a, b) {
  return [a, b];
}
export function p13(x, _y, _z) {
  return x;
}
export function p23(_x, y, _z) {
  return y;
}
export function p33(_x, _y, z) {
  return z;
}
export function map1Of2(f, a1, a2) {
  return [f(a1), a2];
}
export function map2Of2(f, a1, a2) {
  return [a1, f(a2)];
}
export function map1Of3(f, a1, a2, a3) {
  return [f(a1), a2, a3];
}
export function map2Of3(f, a1, a2, a3) {
  return [a1, f(a2), a3];
}
export function map3Of3(f, a1, a2, a3) {
  return [a1, a2, f(a3)];
}
export function map3Of4(f, a1, a2, a3, a4) {
  return [a1, a2, f(a3), a4];
}
export function map4Of4(f, a1, a2, a3, a4) {
  return [a1, a2, a3, f(a4)];
}
export function map5Of5(f, a1, a2, a3, a4, a5) {
  return [a1, a2, a3, a4, f(a5)];
}
export function map6Of6(f, a1, a2, a3, a4, a5, a6) {
  return [a1, a2, a3, a4, a5, f(a6)];
}
export function foldPair(f1, f2, acc, a1, a2) {
  return f2(f1(acc, a1), a2);
}
export function fold1Of2(f1, acc, a1, _a2) {
  return f1(acc, a1);
}
export function foldTriple(f1, f2, f3, acc, a1, a2, a3) {
  return f3(f2(f1(acc, a1), a2), a3);
}
export function foldQuadruple(f1, f2, f3, f4, acc, a1, a2, a3, a4) {
  return f4(f3(f2(f1(acc, a1), a2), a3), a4);
}
export function mapPair(f1, f2, a1, a2) {
  return [f1(a1), f2(a2)];
}
export function mapTriple(f1, f2, f3, a1, a2, a3) {
  return [f1(a1), f2(a2), f3(a3)];
}
export function mapQuadruple(f1, f2, f3, f4, a1, a2, a3, a4) {
  return [f1(a1), f2(a2), f3(a3), f4(a4)];
}
export function fmap2Of2(f, z, a1, a2) {
  const patternInput = f(z, a2);
  return [patternInput[0], [a1, patternInput[1]]];
}
export const List = function (__exports) {
  const noRepeats = __exports.noRepeats = function (xOrder, xs) {
    const s = ZsetModule.addList(xs, ZsetModule.empty(xOrder));
    return ZsetModule.elements(s);
  };

  return __exports;
}({});
export const Zmap = function (__exports) {
  const force = __exports.force = function (k, mp) {
    const matchValue = ZmapModule.tryFind(k, mp);

    if (matchValue == null) {
      throw new Error("Zmap.force: lookup failed");
    } else {
      return getValue(matchValue);
    }
  };

  const mapKey = __exports.mapKey = function (key, f, mp) {
    const matchValue = f(ZmapModule.tryFind(key, mp));

    if (matchValue == null) {
      return ZmapModule.remove(key, mp);
    } else {
      return ZmapModule.add(key, getValue(matchValue), mp);
    }
  };

  return __exports;
}({});
export const Zset = function (__exports) {
  const ofList_1 = __exports.ofList = function (order_4, xs) {
    return ZsetModule.addList(xs, ZsetModule.empty(order_4));
  };

  const fixpoint = __exports.fixpoint = function ($var151, $var152) {
    fixpoint: while (true) {
      const f = $var151;
      const _arg1 = $var152;
      const s = f(_arg1);

      if (ZsetModule.equal(s, _arg1)) {
        return _arg1;
      } else {
        $var151 = f;
        $var152 = s;
        continue fixpoint;
      }
    }
  };

  return __exports;
}({});
export function equalOn(f, x, y) {
  return equals_1(f(x), f(y));
}
export function bufs(f) {
  const buf = System.Text.StringBuilder[".ctor_0"](100);
  f(buf);
  return toString(buf);
}
export class GraphNode {
  constructor(nodeId, nodeData, nodeNeighbours) {
    this.nodeId = nodeId;
    this.nodeData = nodeData;
    this.nodeNeighbours = nodeNeighbours;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lib.GraphNode",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        nodeId: GenericParam("Id"),
        nodeData: GenericParam("Data"),
        nodeNeighbours: makeGeneric(List_1, {
          T: makeGeneric(GraphNode, {
            Data: GenericParam("Data"),
            Id: GenericParam("Id")
          })
        })
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Lib.GraphNode", GraphNode);
export class Graph {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lib.Graph",
      properties: {}
    };
  }

  constructor(nodeIdentity, nodes, edges) {
    this.nodeIdentity = nodeIdentity;
    const edges_1 = map_1(tupledArg => [this.nodeIdentity(tupledArg[0]), this.nodeIdentity(tupledArg[1])], edges);
    const nodes_1 = map_1(d => [this.nodeIdentity(d), new GraphNode(this.nodeIdentity(d), d, new List_1())], nodes);
    this.tab = create(nodes_1, new Comparer(compare));
    this["nodes@346-1"] = map_1(tuple => tuple[1], nodes_1);
    const inputSequence = this["nodes@346-1"];

    for (let node of inputSequence) {
      node.nodeNeighbours = map_1(tupledArg_1 => this.tab.get(tupledArg_1[1]), filter(tupledArg_2 => equals_1(tupledArg_2[0], node.nodeId), edges_1));
    }
  }

  GetNodeData(nodeId) {
    return this.tab.get(nodeId).nodeData;
  }

  IterateCycles(f) {
    const trace = (path, node) => {
      if (exists($var2 => (y => equals_1(node.nodeId, y))(this.nodeIdentity($var2)), path)) {
        f(reverse(path));
      } else {
        iterate(CurriedLambda(trace)(new List_1(node.nodeData, path)), node.nodeNeighbours);
      }
    };

    iterate(node_1 => {
      trace(new List_1(), node_1);
    }, this["nodes@346-1"]);
  }

}
setType("Microsoft.FSharp.Compiler.Lib.Graph", Graph);
export function nullableSlotEmpty() {
  return null;
}
export function nullableSlotFull(x) {
  return x;
}
export class cache {
  constructor(cacheVal) {
    this.cacheVal = cacheVal;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lib.cache",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        cacheVal: GenericParam("T")
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Lib.cache", cache);
export function newCache() {
  return new cache(nullableSlotEmpty());
}