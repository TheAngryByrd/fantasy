import { Map as _Map } from "../utils/TaggedCollections";
import List from "../fable-core/List";
import { getValue } from "../fable-core/Option";
export const ZmapModule = function (__exports) {
  const empty = __exports.empty = function (ord) {
    return _Map.Empty(ord);
  };

  const add = __exports.add = function (k, v, m) {
    return m.Add(k, v);
  };

  const find = __exports.find = function (k, m) {
    return m.get_Item(k);
  };

  const tryFind = __exports.tryFind = function (k, m) {
    return m.TryFind(k);
  };

  const remove = __exports.remove = function (k, m) {
    return m.Remove(k);
  };

  const mem = __exports.mem = function (k, m) {
    return m.ContainsKey(k);
  };

  const iter = __exports.iter = function (f, m) {
    m.Iterate(f);
  };

  const first = __exports.first = function (f, m) {
    return m.First(function (k, v) {
      return f(k, v) ? [k, v] : null;
    });
  };

  const exists = __exports.exists = function (f, m) {
    return m.Exists(f);
  };

  const forall = __exports.forall = function (f, m) {
    return m.ForAll(f);
  };

  const map = __exports.map = function (f, m) {
    return m.MapRange(f);
  };

  const mapi = __exports.mapi = function (f, m) {
    return m.Map(f);
  };

  const fold = __exports.fold = function (f, m, x) {
    return function (arg00, arg10) {
      return m.Fold(arg00, arg10);
    }(f, x);
  };

  const toList = __exports.toList = function (m) {
    return m.ToList();
  };

  const foldSection = __exports.foldSection = function (lo, hi, f, m, x) {
    return function (arg00, arg10, arg20, arg30) {
      return m.FoldSection(arg00, arg10, arg20, arg30);
    }(lo, hi, f, x);
  };

  const isEmpty = __exports.isEmpty = function (m) {
    return m.IsEmpty;
  };

  const foldMap = __exports.foldMap = function (f, z, m) {
    const patternInput_1 = function (arg00, arg10) {
      return m.FoldAndMap(arg00, arg10);
    }(function (k, v, z_1) {
      const patternInput = f(z_1, k, v);
      return [patternInput[1], patternInput[0]];
    }, z);

    return [patternInput_1[1], patternInput_1[0]];
  };

  const choose = __exports.choose = function (f, m) {
    return m.First(f);
  };

  const chooseL = __exports.chooseL = function (f, m) {
    return function (arg00, arg10) {
      return m.Fold(arg00, arg10);
    }(function (k, v, s) {
      const matchValue = f(k, v);

      if (matchValue != null) {
        return new List(getValue(matchValue), s);
      } else {
        return s;
      }
    }, new List());
  };

  const ofList = __exports.ofList = function (ord, xs) {
    return _Map.FromList(ord, xs);
  };

  const keys = __exports.keys = function (m) {
    return function (arg00, arg10) {
      return m.Fold(arg00, arg10);
    }(function (k, _arg1, s) {
      return new List(k, s);
    }, new List());
  };

  const values = __exports.values = function (m) {
    return function (arg00, arg10) {
      return m.Fold(arg00, arg10);
    }(function (_arg1, v, s) {
      return new List(v, s);
    }, new List());
  };

  const memberOf = __exports.memberOf = function (m, k) {
    return mem(k, m);
  };

  return __exports;
}({});