import { range0, unionRanges, rangeContainsPos, posGt, posGeq, posEq } from "../fsharp/range";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { LongIdentWithDots, SynBinding, SynMatchClause, SynMemberDefn, SynTypeDefn, SynModuleOrNamespace, SynModuleDecl, SynExpr } from "../fsharp/ast";
import { printf, toText } from "../fable-core/String";
import { ofArray, choose, map } from "../fable-core/List";
import List from "../fable-core/List";
import CurriedLambda from "../fable-core/CurriedLambda";
import { defaultArg, getValue, makeSome } from "../fable-core/Option";
import { choose as choose_1, map as map_1, collect, empty, singleton, append, delay, toList, tryPick } from "../fable-core/Seq";
import { groupBy } from "../fable-core/Map";
export function rangeContainsPosLeftEdgeInclusive(m1, p) {
  if (posEq(m1.Start, m1.End)) {
    if (posGeq(p, m1.Start)) {
      return posGeq(m1.End, p);
    } else {
      return false;
    }
  } else if (posGeq(p, m1.Start)) {
    return posGt(m1.End, p);
  } else {
    return false;
  }
}
export function rangeContainsPosEdgesExclusive(m1, p) {
  if (posGt(p, m1.Start)) {
    return posGt(m1.End, p);
  } else {
    return false;
  }
}
export class TraverseStep {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.TraverseStep",
      interfaces: ["FSharpUnion"],
      cases: [["Expr", SynExpr], ["Module", SynModuleDecl], ["ModuleOrNamespace", SynModuleOrNamespace], ["TypeDefn", SynTypeDefn], ["MemberDefn", SynMemberDefn], ["MatchClause", SynMatchClause], ["Binding", SynBinding]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.TraverseStep", TraverseStep);
export class AstVisitorBase {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.AstVisitorBase",
      properties: {}
    };
  }

  constructor() {}

  VisitTypeAbbrev(_ty, _m) {
    return null;
  }

  VisitImplicitInherit(defaultTraverse, _ty, expr, _m) {
    return defaultTraverse(expr);
  }

  VisitModuleDecl(defaultTraverse, decl) {
    return defaultTraverse(decl);
  }

  VisitBinding(defaultTraverse, binding) {
    return defaultTraverse(binding);
  }

  VisitMatchClause(defaultTraverse, mc) {
    return defaultTraverse(mc);
  }

  VisitInheritSynMemberDefn(_componentInfo, _typeDefnKind, _synType, _members, _range) {
    return null;
  }

  VisitInterfaceSynMemberDefnType(_synType) {
    return null;
  }

  VisitRecordField(_path, _copyOpt, _recordField) {
    return null;
  }

  VisitHashDirective(_arg1) {
    return null;
  }

  VisitModuleOrNamespace(_arg2) {
    return null;
  }

  VisitComponentInfo(_arg3) {
    return null;
  }

  VisitLetOrUse(_arg4, _arg5) {
    return null;
  }

  VisitSimplePats(_arg6) {
    return null;
  }

  VisitPat(defaultTraverse, pat) {
    return defaultTraverse(pat);
  }

  VisitType(defaultTraverse, ty) {
    return defaultTraverse(ty);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.AstVisitorBase", AstVisitorBase);
export function dive(node, range, project) {
  return [range, function () {
    return project(node);
  }];
}
export function pick(pos, outerRange, _debugObj, diveResults) {
  var copyOfStruct;

  if (diveResults.tail == null) {
    return null;
  } else {
    if (!true) {
      const s = toText(printf("ServiceParseTreeWalk: not isOrdered: %A"))(map(function (tupledArg) {
        return tupledArg[0].ToShortString();
      }, diveResults));
      s;
    }

    let outerContainsInner;
    outerRange;
    outerContainsInner = true;

    if (!outerContainsInner) {
      const s_1 = toText(printf("ServiceParseTreeWalk: not outerContainsInner: %A : %A"))(outerRange.ToShortString(), map(function (tupledArg_1) {
        return tupledArg_1[0].ToShortString();
      }, diveResults));
      s_1;
    }

    const isZeroWidth = function (r) {
      return posEq(r.Start, r.End);
    };

    const matchValue = choose(function (tupledArg_2) {
      return (rangeContainsPosLeftEdgeInclusive(tupledArg_2[0], pos) ? !isZeroWidth(tupledArg_2[0]) : false) ? tupledArg_2[1] : null;
    }, diveResults);

    if (matchValue.tail != null) {
      if (matchValue.tail.tail == null) {
        return matchValue.head();
      } else {
        return null;
      }
    } else {
      let e = diveResults.head;

      for (let r_1 of diveResults) {
        if (posGt(pos, (copyOfStruct = r_1[0], copyOfStruct.Start))) {
          e = r_1;
        }
      }

      return e[1]();
    }
  }
}
export function Traverse(pos, parseTree, visitor) {
  const pick_1 = function (x, _debugObj, diveResults) {
    return pick(pos, x, _debugObj, diveResults);
  };

  const traverseSynModuleDecl = function (path, decl) {
    const pick_2 = CurriedLambda(pick_1)(decl.Range);

    const defaultTraverse = function (m) {
      const path_1 = new List(new TraverseStep(1, m), path);

      switch (m.tag) {
        case 1:
          return CurriedLambda(pick_2)(decl)(map(function (x_1) {
            return dive(x_1, x_1.Range, CurriedLambda(traverseSynModuleDecl)(path_1));
          }, m.data[2]));

        case 2:
          const matchValue = visitor.VisitLetOrUse(m.data[1], m.data[2]);

          if (matchValue == null) {
            return CurriedLambda(pick_2)(decl)(map(function (x_2) {
              return dive(x_2, x_2.RangeOfBindingAndRhs, CurriedLambda(traverseSynBinding)(path_1));
            }, m.data[1]));
          } else {
            return makeSome(getValue(matchValue));
          }

        case 3:
          return traverseSynExpr(path_1, m.data[1]);

        case 4:
          return CurriedLambda(pick_2)(decl)(map(function (x_3) {
            return dive(x_3, x_3.Range, CurriedLambda(traverseSynTypeDefn)(path_1));
          }, m.data[0]));

        case 5:
          return null;

        case 6:
          return null;

        case 7:
          return null;

        case 8:
          return visitor.VisitHashDirective(m.data[1]);

        case 9:
          return traverseSynModuleOrNamespace(path_1, m.data);

        default:
          return null;
      }
    };

    return visitor.VisitModuleDecl(defaultTraverse, decl);
  };

  const traverseSynModuleOrNamespace = function (path_2, _arg1) {
    const matchValue_1 = visitor.VisitModuleOrNamespace(_arg1);

    if (matchValue_1 == null) {
      const path_3 = new List(new TraverseStep(2, _arg1), path_2);
      return CurriedLambda(pick_1)(_arg1.data[7], _arg1)(map(function (x_4) {
        return dive(x_4, x_4.Range, CurriedLambda(traverseSynModuleDecl)(path_3));
      }, _arg1.data[3]));
    } else {
      return makeSome(getValue(matchValue_1));
    }
  };

  const traverseSynExpr = function (path_4, expr) {
    const pick_3 = CurriedLambda(pick_1)(expr.Range);

    const defaultTraverse_1 = function (e) {
      const path_5 = new List(new TraverseStep(0, e), path_4);
      const traverseSynExpr_1 = CurriedLambda(traverseSynExpr)(path_5);
      const $var1 = e.tag === 1 ? [1] : e.tag === 2 ? [2] : e.tag === 3 ? [3] : e.tag === 4 ? [4, e.data[2], e.data[0]] : e.tag === 5 ? [4, e.data[2], e.data[0]] : e.tag === 6 ? [5] : e.tag === 7 ? [6] : e.tag === 8 ? [7] : e.tag === 9 ? [8] : e.tag === 10 ? [9] : e.tag === 11 ? [10] : e.tag === 12 ? [11] : e.tag === 13 ? [12] : e.tag === 14 ? [13] : e.tag === 15 ? [14] : e.tag === 16 ? [15] : e.tag === 17 ? [16] : e.tag === 18 ? [17] : e.tag === 19 ? [18] : e.tag === 58 ? [19] : e.tag === 20 ? [20] : e.tag === 21 ? [21] : e.tag === 22 ? [22] : e.tag === 23 ? [23] : e.tag === 24 ? [24] : e.tag === 25 ? [25] : e.tag === 26 ? [26] : e.tag === 27 ? [27] : e.tag === 28 ? [28] : e.tag === 29 ? [29] : e.tag === 30 ? [30] : e.tag === 31 ? [31] : e.tag === 32 ? [32] : e.tag === 33 ? [33] : e.tag === 34 ? [34] : e.tag === 45 ? [35] : e.tag === 35 ? [36] : e.tag === 36 ? [37] : e.tag === 37 ? [38] : e.tag === 38 ? [39] : e.tag === 39 ? [40] : e.tag === 40 ? [41] : e.tag === 41 ? [42] : e.tag === 42 ? [43] : e.tag === 43 ? [44] : e.tag === 44 ? [45] : e.tag === 46 ? [46] : e.tag === 47 ? [47] : e.tag === 48 ? [48] : e.tag === 49 ? [49] : e.tag === 50 ? [50] : e.tag === 51 ? [51] : e.tag === 52 ? [52] : e.tag === 53 ? [53] : e.tag === 54 ? [54] : e.tag === 55 ? [55] : e.tag === 56 ? [56] : e.tag === 57 ? [57] : [0];

      switch ($var1[0]) {
        case 0:
          return traverseSynExpr_1(e.data[0]);

        case 1:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[2], e.data[2].Range, traverseSynExpr_1)]));

        case 2:
          return null;

        case 3:
          return tryPick(function (x_5) {
            return x_5;
          }, ofArray([traverseSynExpr_1(e.data[0]), traverseSynType(e.data[1])]));

        case 4:
          return CurriedLambda(pick_3)(expr)(map(function (x_6) {
            return dive(x_6, x_6.Range, traverseSynExpr_1);
          }, $var1[2]));

        case 5:
          return CurriedLambda(pick_3)(expr)(map(function (x_7) {
            return dive(x_7, x_7.Range, traverseSynExpr_1);
          }, e.data[1]));

        case 6:
          return CurriedLambda(pick_3)(expr)(toList(delay(function () {
            var sepOpt;
            var inheritRange;
            var expr_1;

            var _ty;

            var _range;

            const diveIntoSeparator = function (offsideColumn, scPosOpt, copyOpt) {
              if (scPosOpt == null) {
                if (pos.Column === offsideColumn) {
                  return visitor.VisitRecordField(path_5, copyOpt, null);
                } else {
                  return null;
                }
              } else if (posGeq(pos, getValue(scPosOpt))) {
                return visitor.VisitRecordField(path_5, copyOpt, null);
              } else {
                return null;
              }
            };

            return append(e.data[0] != null ? (sepOpt = getValue(e.data[0])[3], inheritRange = getValue(e.data[0])[4], expr_1 = getValue(e.data[0])[1], _ty = getValue(e.data[0])[0], _range = getValue(e.data[0])[2], append(singleton(dive(expr_1, expr_1.Range, function (expr_2) {
              return ((!rangeContainsPos(expr_2.Range, pos) ? CurriedLambda(() => sepOpt == null)() : false) ? pos.Column === inheritRange.StartColumn : false) ? visitor.VisitRecordField(path_5, null, null) : traverseSynExpr_1(expr_2);
            })), delay(function () {
              if (sepOpt == null) {
                return empty();
              } else {
                const sep = getValue(sepOpt)[0];
                const scPosOpt_1 = getValue(sepOpt)[1];
                return singleton(dive(null, sep, function () {
                  return diveIntoSeparator(inheritRange.StartColumn, scPosOpt_1, null);
                }));
              }
            }))) : empty(), delay(function () {
              var withRange;
              var expr_3;
              return append(e.data[1] != null ? (withRange = getValue(e.data[1])[1][0], expr_3 = getValue(e.data[1])[0], append(singleton(dive(expr_3, expr_3.Range, traverseSynExpr_1)), delay(function () {
                return singleton(dive(null, withRange, function () {
                  return posGeq(pos, withRange.End) ? visitor.VisitRecordField(path_5, expr_3, null) : null;
                }));
              }))) : empty(), delay(function () {
                const copyOpt_1 = defaultArg(e.data[1], null, function (tuple) {
                  return tuple[0];
                });
                return collect(function (matchValue_2) {
                  const field = matchValue_2[0][0];
                  return append(singleton(dive([path_5, copyOpt_1, field], field.Range, function (r) {
                    return rangeContainsPos(field.Range, pos) ? function (tupledArg) {
                      return visitor.VisitRecordField(tupledArg[0], tupledArg[1], tupledArg[2]);
                    }(r) : null;
                  })), delay(function () {
                    let offsideColumn_1;

                    if (e.data[0] == null) {
                      let copyOfStruct = field.Range;
                      offsideColumn_1 = copyOfStruct.StartColumn | 0;
                    } else {
                      const inheritRange_1 = getValue(e.data[0])[4];
                      offsideColumn_1 = inheritRange_1.StartColumn | 0;
                    }

                    return append(matchValue_2[1] == null ? empty() : singleton(dive(getValue(matchValue_2[1]), getValue(matchValue_2[1]).Range, function (expr_4) {
                      return ((!rangeContainsPos(getValue(matchValue_2[1]).Range, pos) ? CurriedLambda(() => matchValue_2[2] == null)() : false) ? pos.Column === offsideColumn_1 : false) ? visitor.VisitRecordField(path_5, copyOpt_1, null) : traverseSynExpr_1(expr_4);
                    })), delay(function () {
                      if (matchValue_2[2] != null) {
                        const sep_1 = getValue(matchValue_2[2])[0];
                        const scPosOpt_2 = getValue(matchValue_2[2])[1];
                        return singleton(dive(null, sep_1, function () {
                          return diveIntoSeparator(offsideColumn_1, scPosOpt_2, copyOpt_1);
                        }));
                      } else {
                        return empty();
                      }
                    }));
                  }));
                }, e.data[2]);
              }));
            }));
          })));

        case 7:
          return traverseSynExpr_1(e.data[2]);

        case 8:
          const result = tryPick(function (arg00) {
            return visitor.VisitInterfaceSynMemberDefnType(arg00);
          }, map_1(function (_arg1_1) {
            return _arg1_1.data[0];
          }, e.data[3]));

          if (CurriedLambda(() => result != null)()) {
            return result;
          } else {
            return CurriedLambda(pick_3)(expr)(toList(delay(function () {
              var expr_5;
              var newCall;
              return append(e.data[1] != null ? (expr_5 = getValue(e.data[1])[0], newCall = new SynExpr(8, [false, e.data[0], expr_5, unionRanges(e.data[0].Range, expr_5.Range)]), singleton(dive(newCall, newCall.Range, traverseSynExpr_1))) : empty(), delay(function () {
                return append(map_1(function (b) {
                  return dive(b, b.RangeOfBindingAndRhs, CurriedLambda(traverseSynBinding)(path_5));
                }, e.data[2]), delay(function () {
                  return collect(function (matchValue_3) {
                    return map_1(function (b_1) {
                      return dive(b_1, b_1.RangeOfBindingAndRhs, CurriedLambda(traverseSynBinding)(path_5));
                    }, matchValue_3.data[1]);
                  }, e.data[3]);
                }));
              }));
            })));
          }

        case 9:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[1], e.data[1].Range, traverseSynExpr_1), dive(e.data[2], e.data[2].Range, traverseSynExpr_1)]));

        case 10:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[2], e.data[2].Range, traverseSynExpr_1), dive(e.data[4], e.data[4].Range, traverseSynExpr_1), dive(e.data[5], e.data[5].Range, traverseSynExpr_1)]));

        case 11:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[4], e.data[4].Range, traverseSynExpr_1), dive(e.data[5], e.data[5].Range, traverseSynExpr_1)]));

        case 12:
          return traverseSynExpr_1(e.data[1]);

        case 13:
          let isPartOfArrayOrList;
          const $var2 = path_4.tail != null ? path_4.head.tag === 0 ? path_4.head.data.tag === 13 ? [0] : [1] : [1] : [1];

          switch ($var2[0]) {
            case 0:
              isPartOfArrayOrList = true;
              break;

            case 1:
              isPartOfArrayOrList = false;
              break;
          }

          let ok;
          const matchValue_4 = [isPartOfArrayOrList, e.data[2]];
          const $var3 = matchValue_4[0] ? [2] : matchValue_4[1].tag === 28 ? [0, matchValue_4[1].data] : matchValue_4[1].tag === 29 ? matchValue_4[1].data[0] ? [2] : [1, matchValue_4[1].data[1]] : [2];

          switch ($var3[0]) {
            case 0:
              ok = visitor.VisitRecordField(path_5, null, new LongIdentWithDots(0, [ofArray([$var3[1]]), new List()]));
              break;

            case 1:
              ok = visitor.VisitRecordField(path_5, null, $var3[1]);
              break;

            case 2:
              ok = null;
              break;
          }

          if (CurriedLambda(() => ok != null)()) {
            return ok;
          } else {
            return traverseSynExpr_1(e.data[2]);
          }

        case 14:
          if (e.data[2].tag === 0) {
            const matchValue_5 = visitor.VisitSimplePats(e.data[2].data[0]);

            if (matchValue_5 == null) {
              return traverseSynExpr_1(e.data[3]);
            } else {
              return makeSome(getValue(matchValue_5));
            }
          } else {
            return traverseSynExpr_1(e.data[3]);
          }

        case 15:
          return CurriedLambda(pick_3)(expr)(map(function (x_8) {
            return dive(x_8, x_8.Range, CurriedLambda(traverseSynMatchClause)(path_5));
          }, e.data[2]));

        case 16:
          return CurriedLambda(pick_3)(expr)(toList(delay(function () {
            return append(singleton(dive(e.data[1], e.data[1].Range, traverseSynExpr_1)), delay(function () {
              return map(function (x_9) {
                return dive(x_9, x_9.RangeOfGuardAndRhs, CurriedLambda(traverseSynMatchClause)(path_5));
              }, e.data[2]);
            }));
          })));

        case 17:
          return traverseSynExpr_1(e.data[0]);

        case 18:
          return traverseSynExpr_1(e.data[0]);

        case 19:
          return traverseSynExpr_1(e.data[0]);

        case 20:
          if (e.data[1]) {
            return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[3], e.data[3].Range, traverseSynExpr_1), dive(e.data[2], e.data[2].Range, traverseSynExpr_1)]));
          } else {
            return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[2], e.data[2].Range, traverseSynExpr_1), dive(e.data[3], e.data[3].Range, traverseSynExpr_1)]));
          }

        case 21:
          return traverseSynExpr_1(e.data[0]);

        case 22:
          const matchValue_6 = visitor.VisitLetOrUse(e.data[2], e.data[4]);

          if (matchValue_6 == null) {
            return CurriedLambda(pick_3)(expr)(toList(delay(function () {
              return append(map(function (x_10) {
                return dive(x_10, x_10.RangeOfBindingAndRhs, CurriedLambda(traverseSynBinding)(path_5));
              }, e.data[2]), delay(function () {
                return singleton(dive(e.data[3], e.data[3].Range, traverseSynExpr_1));
              }));
            })));
          } else {
            return makeSome(getValue(matchValue_6));
          }

        case 23:
          return CurriedLambda(pick_3)(expr)(toList(delay(function () {
            return append(singleton(dive(e.data[0], e.data[0].Range, traverseSynExpr_1)), delay(function () {
              return map(function (x_11) {
                return dive(x_11, x_11.Range, CurriedLambda(traverseSynMatchClause)(path_5));
              }, e.data[2]);
            }));
          })));

        case 24:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[0], e.data[0].Range, traverseSynExpr_1), dive(e.data[1], e.data[1].Range, traverseSynExpr_1)]));

        case 25:
          return traverseSynExpr_1(e.data[0]);

        case 26:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[2], e.data[2].Range, traverseSynExpr_1), dive(e.data[3], e.data[3].Range, traverseSynExpr_1)]));

        case 27:
          return CurriedLambda(pick_3)(expr)(toList(delay(function () {
            return append(singleton(dive(e.data[0], e.data[0].Range, traverseSynExpr_1)), delay(function () {
              return append(singleton(dive(e.data[1], e.data[1].Range, traverseSynExpr_1)), delay(function () {
                return e.data[2] != null ? singleton(dive(getValue(e.data[2]), getValue(e.data[2]).Range, traverseSynExpr_1)) : empty();
              }));
            }));
          })));

        case 28:
          return null;

        case 29:
          return null;

        case 30:
          return traverseSynExpr_1(e.data[1]);

        case 31:
          return traverseSynExpr_1(e.data[0]);

        case 32:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[0], e.data[0].Range, traverseSynExpr_1), dive(e.data[2], e.data[2].Range, traverseSynExpr_1)]));

        case 33:
          return CurriedLambda(pick_3)(expr)(toList(delay(function () {
            return append(singleton(dive(e.data[0], e.data[0].Range, traverseSynExpr_1)), delay(function () {
              return collect(function (synExpr) {
                return map_1(function (x_12) {
                  return dive(x_12, x_12.Range, traverseSynExpr_1);
                }, synExpr.Exprs);
              }, e.data[1]);
            }));
          })));

        case 34:
          return CurriedLambda(pick_3)(expr)(toList(delay(function () {
            return append(singleton(dive(e.data[0], e.data[0].Range, traverseSynExpr_1)), delay(function () {
              return append(collect(function (synExpr_1) {
                return map_1(function (x_13) {
                  return dive(x_13, x_13.Range, traverseSynExpr_1);
                }, synExpr_1.Exprs);
              }, e.data[1]), delay(function () {
                return singleton(dive(e.data[2], e.data[2].Range, traverseSynExpr_1));
              }));
            }));
          })));

        case 35:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[0], e.data[0].Range, traverseSynExpr_1), dive(e.data[2], e.data[2].Range, traverseSynExpr_1)]));

        case 36:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[1], e.data[1].Range, traverseSynExpr_1), dive(e.data[2], e.data[2].Range, traverseSynExpr_1)]));

        case 37:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[0], e.data[0].Range, traverseSynExpr_1), dive(e.data[2], e.data[2].Range, traverseSynExpr_1), dive(e.data[3], e.data[3].Range, traverseSynExpr_1)]));

        case 38:
          return traverseSynExpr_1(e.data[0]);

        case 39:
          return traverseSynExpr_1(e.data[0]);

        case 40:
          return traverseSynExpr_1(e.data[0]);

        case 41:
          return traverseSynExpr_1(e.data[0]);

        case 42:
          return traverseSynExpr_1(e.data[0]);

        case 43:
          return null;

        case 44:
          return traverseSynExpr_1(e.data[1]);

        case 45:
          return traverseSynExpr_1(e.data[2]);

        case 46:
          return null;

        case 47:
          return traverseSynExpr_1(e.data[1]);

        case 48:
          return traverseSynExpr_1(e.data[1]);

        case 49:
          return CurriedLambda(pick_3)(expr)(ofArray([dive(e.data[4], e.data[4].Range, traverseSynExpr_1), dive(e.data[5], e.data[5].Range, traverseSynExpr_1)]));

        case 50:
          return traverseSynExpr_1(e.data[0]);

        case 51:
          return null;

        case 52:
          return null;

        case 53:
          return null;

        case 54:
          return null;

        case 55:
          return null;

        case 56:
          return traverseSynExpr_1(e.data[0]);

        case 57:
          return traverseSynExpr_1(e.data[0]);
      }
    };

    return visitor.VisitExpr(path_4, CurriedLambda(traverseSynExpr)(path_4), defaultTraverse_1, expr);
  };

  const traversePat = function (pat) {
    const defaultTraverse_2 = function (p) {
      const $var4 = p.tag === 10 ? [0] : p.tag === 5 ? [1] : p.tag === 6 ? [2, p.data[0]] : p.tag === 8 ? [2, p.data[0]] : p.tag === 9 ? [2, p.data[0]] : p.tag === 11 ? [2, p.data[1]] : p.tag === 4 ? [3] : p.tag === 7 ? [4] : p.tag === 3 ? [5] : [6];

      switch ($var4[0]) {
        case 0:
          return traversePat(p.data[0]);

        case 1:
          return tryPick(traversePat, ofArray([p.data[0], p.data[1]]));

        case 2:
          return tryPick(traversePat, $var4[1]);

        case 3:
          return traversePat(p.data[0]);

        case 4:
          if (p.data[3].tag === 1) {
            return tryPick(traversePat, map(function (tuple_1) {
              return tuple_1[1];
            }, p.data[3].data[0]));
          } else {
            return tryPick(traversePat, p.data[3].data);
          }

        case 5:
          return tryPick(function (x_14) {
            return x_14;
          }, ofArray([traversePat(p.data[0]), traverseSynType(p.data[1])]));

        case 6:
          return null;
      }
    };

    return visitor.VisitPat(defaultTraverse_2, pat);
  };

  const traverseSynType = function (ty) {
    const defaultTraverse_3 = function (ty_1) {
      const $var5 = ty_1.tag === 1 ? [0, ty_1.data[2], ty_1.data[0]] : ty_1.tag === 2 ? [0, ty_1.data[3], ty_1.data[0]] : ty_1.tag === 6 ? [1] : ty_1.tag === 12 ? [2, ty_1.data[0]] : ty_1.tag === 10 ? [2, ty_1.data[0]] : ty_1.tag === 9 ? [2, ty_1.data[0]] : ty_1.tag === 5 ? [2, ty_1.data[1]] : ty_1.tag === 15 ? [3, ty_1.data[0], ty_1.data[1]] : ty_1.tag === 11 ? [3, ty_1.data[0], ty_1.data[1]] : ty_1.tag === 3 ? [4, ty_1.data[0]] : ty_1.tag === 4 ? [4, ty_1.data[0]] : ty_1.tag === 14 ? [5] : ty_1.tag === 8 ? [6] : [7];

      switch ($var5[0]) {
        case 0:
          return tryPick(traverseSynType, toList(delay(function () {
            return append(singleton($var5[2]), delay(function () {
              return $var5[1];
            }));
          })));

        case 1:
          return tryPick(traverseSynType, ofArray([ty_1.data[0], ty_1.data[1]]));

        case 2:
          return traverseSynType($var5[1]);

        case 3:
          return tryPick(traverseSynType, ofArray([$var5[1], $var5[2]]));

        case 4:
          return tryPick(traverseSynType, map(function (tuple_2) {
            return tuple_2[1];
          }, $var5[1]));

        case 5:
          return traverseSynExpr(new List(), ty_1.data[0]);

        case 6:
          return null;

        case 7:
          return null;
      }
    };

    return visitor.VisitType(defaultTraverse_3, ty);
  };

  const normalizeMembersToDealWithPeculiaritiesOfGettersAndSetters = function (path_6, traverseInherit, synMemberDefns) {
    return choose_1(function (tupledArg_1) {
      const matchValue_7 = toList(tupledArg_1[1]);
      const $var6 = matchValue_7.tail == null ? [2] : matchValue_7.tail.tail != null ? matchValue_7.tail.head.tag === 1 ? matchValue_7.tail.head.data[0].data[7].tag === 7 ? matchValue_7.tail.head.data[0].data[7].data[1] != null ? matchValue_7.tail.tail.tail == null ? matchValue_7.head.tag === 1 ? matchValue_7.head.data[0].data[7].tag === 7 ? matchValue_7.head.data[0].data[7].data[1] != null ? [1, getValue(matchValue_7.head.data[0].data[7].data[1]), getValue(matchValue_7.tail.head.data[0].data[7].data[1]), matchValue_7.head.data[0].data[7].data[0], matchValue_7.tail.head.data[0].data[7].data[0], matchValue_7.head, matchValue_7.tail.head] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : [0, matchValue_7.head];

      switch ($var6[0]) {
        case 0:
          return dive($var6[1], tupledArg_1[0], CurriedLambda(traverseSynMemberDefn)(path_6, traverseInherit));

        case 1:
          return [tupledArg_1[0], function () {
            const matchValue_8 = traverseSynMemberDefn(path_6, function (_arg2) {
              return null;
            }, $var6[5]);

            if (matchValue_8 != null) {
              return matchValue_8;
            } else {
              return traverseSynMemberDefn(path_6, function (_arg3) {
                return null;
              }, $var6[6]);
            }
          }];

        case 2:
          return null;

        case 3:
          return null;
      }
    }, groupBy(function (x_15) {
      return x_15.Range;
    }, synMemberDefns));
  };

  const traverseSynTypeDefn = function (path_7, _arg2_1) {
    const path_8 = new List(new TraverseStep(3, _arg2_1), path_7);
    const matchValue_9 = visitor.VisitComponentInfo(_arg2_1.data[0]);

    if (matchValue_9 == null) {
      return CurriedLambda(pick_1)(_arg2_1.data[3], _arg2_1)(toList(delay(function () {
        var traverseInherit_1;
        return append(_arg2_1.data[1].tag === 0 ? (traverseInherit_1 = function (tupledArg_2) {
          return visitor.VisitInheritSynMemberDefn(_arg2_1.data[0], _arg2_1.data[1].data[0], tupledArg_2[0], _arg2_1.data[1].data[1], tupledArg_2[1]);
        }, CurriedLambda(normalizeMembersToDealWithPeculiaritiesOfGettersAndSetters)(path_8, traverseInherit_1)(_arg2_1.data[1].data[1])) : _arg2_1.data[1].tag === 1 ? _arg2_1.data[1].data[0].tag === 5 ? singleton(dive(_arg2_1.data[1], _arg2_1.data[1].Range, function (_arg4) {
          return visitor.VisitTypeAbbrev(_arg2_1.data[1].data[0].data[1], _arg2_1.data[1].data[0].data[2]);
        })) : empty() : empty(), delay(function () {
          return CurriedLambda(normalizeMembersToDealWithPeculiaritiesOfGettersAndSetters)(path_8, function (_arg5) {
            return null;
          })(_arg2_1.data[2]);
        }));
      })));
    } else {
      return makeSome(getValue(matchValue_9));
    }
  };

  const traverseSynMemberDefn = function (path_9, traverseInherit_2, m_1) {
    const pick_4 = CurriedLambda(function (debugObj) {
      return CurriedLambda(pick_1)(m_1.Range, debugObj);
    });
    const path_10 = new List(new TraverseStep(4, m_1), path_9);

    switch (m_1.tag) {
      case 1:
        return traverseSynBinding(path_10, m_1.data[0]);

      case 2:
        return visitor.VisitSimplePats(m_1.data[2]);

      case 3:
        return CurriedLambda(function (arg00_1) {
          return CurriedLambda(pick_4)(arg00_1);
        })(m_1)(ofArray([dive(null, m_1.data[0].Range, function () {
          const matchValue_10 = traverseInherit_2([m_1.data[0], m_1.data[3]]);

          if (matchValue_10 == null) {
            return visitor.VisitImplicitInherit(CurriedLambda(traverseSynExpr)(path_10), m_1.data[0], m_1.data[1], m_1.data[3]);
          } else {
            return matchValue_10;
          }
        }), dive(null, m_1.data[1].Range, function () {
          return visitor.VisitImplicitInherit(CurriedLambda(traverseSynExpr)(path_10), m_1.data[0], m_1.data[1], m_1.data[3]);
        })]));

      case 10:
        return traverseSynExpr(path_10, m_1.data[8]);

      case 4:
        const matchValue_11 = visitor.VisitLetOrUse(m_1.data[0], m_1.data[3]);

        if (matchValue_11 == null) {
          return CurriedLambda(function (arg00_2) {
            return CurriedLambda(pick_4)(arg00_2);
          })(m_1)(map(function (x_16) {
            return dive(x_16, x_16.RangeOfBindingAndRhs, CurriedLambda(traverseSynBinding)(path_10));
          }, m_1.data[0]));
        } else {
          return makeSome(getValue(matchValue_11));
        }

      case 5:
        return null;

      case 6:
        const matchValue_12 = visitor.VisitInterfaceSynMemberDefnType(m_1.data[0]);

        if (matchValue_12 == null) {
          if (m_1.data[1] != null) {
            return CurriedLambda(function (arg00_3) {
              return CurriedLambda(pick_4)(arg00_3);
            })(getValue(m_1.data[1]))(toList(delay(function () {
              return CurriedLambda(normalizeMembersToDealWithPeculiaritiesOfGettersAndSetters)(path_10, function (_arg6) {
                return null;
              })(getValue(m_1.data[1]));
            })));
          } else {
            return null;
          }
        } else {
          return matchValue_12;
        }

      case 7:
        return traverseInherit_2([m_1.data[0], m_1.data[2]]);

      case 8:
        return null;

      case 9:
        return traverseSynTypeDefn(path_10, m_1.data[0]);

      default:
        return null;
    }
  };

  const traverseSynMatchClause = function (path_11, mc) {
    const path_12 = new List(new TraverseStep(5, mc), path_11);

    const defaultTraverse_4 = function (mc_1) {
      return CurriedLambda(pick_1)(mc_1.Range, mc_1)(map(function (x_17) {
        return dive(x_17, x_17.Range, CurriedLambda(traverseSynExpr)(path_12));
      }, toList(delay(function () {
        return append(mc_1.data[1] != null ? singleton(getValue(mc_1.data[1])) : empty(), delay(function () {
          return singleton(mc_1.data[2]);
        }));
      }))));
    };

    return visitor.VisitMatchClause(defaultTraverse_4, mc);
  };

  const traverseSynBinding = function (path_13, b_2) {
    const defaultTraverse_5 = function (b_3) {
      const path_14 = new List(new TraverseStep(6, b_3), path_13);
      return tryPick(function (x_18) {
        return x_18;
      }, ofArray([traversePat(b_3.data[7]), traverseSynExpr(path_14, b_3.data[9])]));
    };

    return visitor.VisitBinding(defaultTraverse_5, b_2);
  };

  if (parseTree.tag === 1) {
    return null;
  } else {
    const l = parseTree.data.data[5];
    const fileRange = range0;
    return CurriedLambda(pick_1)(fileRange, l)(map(function (x_19) {
      return dive(x_19, x_19.Range, CurriedLambda(traverseSynModuleOrNamespace)(new List()));
    }, l));
  }
}