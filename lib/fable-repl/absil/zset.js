import { Set as _Set } from "../utils/TaggedCollections";
import { fold as fold_1 } from "../fable-core/Seq";
export const ZsetModule = function (__exports) {
  const empty = __exports.empty = function (ord) {
    return _Set.Empty(ord);
  };

  const isEmpty = __exports.isEmpty = function (s) {
    return s.IsEmpty;
  };

  const contains = __exports.contains = function (x, s) {
    return s.Contains_0(x);
  };

  const add = __exports.add = function (x, s) {
    return s.Add_0(x);
  };

  const addList = __exports.addList = function (xs, a) {
    return fold_1(function (a_1, x) {
      return add(x, a_1);
    }, a, xs);
  };

  const singleton = __exports.singleton = function (ord, x) {
    return add(x, empty(ord));
  };

  const remove = __exports.remove = function (x, s) {
    return s.Remove_0(x);
  };

  const fold = __exports.fold = function (f, s, b) {
    return function (arg00, arg10) {
      return s.Fold(arg00, arg10);
    }(f, b);
  };

  const iter = __exports.iter = function (f, s) {
    s.Iterate(f);
  };

  const forall = __exports.forall = function (p, s) {
    return s.ForAll(p);
  };

  const count = __exports.count = function (s) {
    return s.Count_0 | 0;
  };

  const exists = __exports.exists = function (p, s) {
    return s.Exists(p);
  };

  const subset = __exports.subset = function (s1, s2) {
    return s1.IsSubsetOf(s2);
  };

  const equal = __exports.equal = function (s1, s2) {
    return _Set.Equality(s1, s2);
  };

  const elements = __exports.elements = function (s) {
    return s.ToList();
  };

  const filter = __exports.filter = function (p, s) {
    return s.Filter(p);
  };

  const union = __exports.union = function (s1, s2) {
    return _Set.Union(s1, s2);
  };

  const inter = __exports.inter = function (s1, s2) {
    return _Set.Intersection(s1, s2);
  };

  const diff = __exports.diff = function (s1, s2) {
    return _Set.Difference(s1, s2);
  };

  const memberOf = __exports.memberOf = function (m, k) {
    return contains(k, m);
  };

  return __exports;
}({});