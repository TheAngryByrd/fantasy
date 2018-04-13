import { ExprRewritingEnv, RewriteImplFile, mkLetRecBinds, mkMultiLambdaBind, mkLetsBind, tryDestRefTupleExpr, mkLetBind, Expr$2E$get_Range as Expr_get_Range, mkTupleFieldGet, mkBind, mkCompGenBind, tyOfExpr, stripTopLambda, isByrefLikeTy, typeOfLambdaArg, mkLambdaTy, mkCompGenLocal, mkRefTupledTy, mkRefTupled, exprForVal, destRefTupleTy, isRefTupleTy, FoldImplFile, evalTupInfoIsStruct, valsOfBinds, FoldExpr, valOrder, ExprFolder, ExprFolder0, stripExpr } from "./TastOps";
import { singleton, reverse, concat, mapIndexed, unzip, map, collect as collect_1, ofArray, append } from "../fable-core/List";
import List from "../fable-core/List";
import { ZsetModule } from "../absil/zset";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareUnions, equals, compareRecords, equalsRecords, Interface, Tuple, makeGeneric } from "../fable-core/Util";
import { Binding, tupInfoRef, CcuThunk, globalNng, ValReprInfo, ValReprInfoModule, ParentRef, ValInline, ValBaseOrThisInfo, ValRecursiveScopeInfo, taccessPublic, ValMutability, NewVal, valRefInThisAssembly, Expr, Val, TType } from "./tast";
import { Set as _Set, Map as _Map } from "../utils/TaggedCollections";
import { ZmapModule } from "../absil/zmap";
import { getValue } from "../fable-core/Option";
import { foldBack, reduce, mapFold, map2, toList, fold } from "../fable-core/Seq";
import { Microsoft } from "../fcs-fable/adapters";
import { SequencePointInfoForBinding, XmlDoc } from "./ast";
import CurriedLambda from "../fable-core/CurriedLambda";
import { List as List_1 } from "../absil/illib";
import { TcGlobals } from "./TcGlobals";
import { range } from "./range";

function _TyappAndApp___(e) {
  if (e.tag === 5) {
    const matchValue = stripExpr(e.data[0]);

    if (matchValue.tag === 5) {
      if (matchValue.data[3].tail == null) {
        return [matchValue.data[0], matchValue.data[1], append(matchValue.data[2], e.data[2]), e.data[3], matchValue.data[4]];
      } else {
        return [e.data[0], e.data[1], e.data[2], e.data[3], e.data[4]];
      }
    } else {
      return [matchValue, e.data[1], e.data[2], e.data[3], e.data[4]];
    }
  } else {
    return null;
  }
}

export { _TyappAndApp___ as $7C$TyappAndApp$7C$_$7C$ };
export const GlobalUsageAnalysis = function (__exports) {
  const bindAccBounds = __exports.bindAccBounds = function (vals, _isInDTree, v) {
    return ZsetModule.add(v, vals);
  };

  const GetValsBoundInExpr = __exports.GetValsBoundInExpr = function (expr) {
    let folder;
    const inputRecord = ExprFolder0();

    const valBindingSiteIntercept = function (vals, tupledArg) {
      return bindAccBounds(vals, tupledArg[0], tupledArg[1]);
    };

    folder = new ExprFolder(inputRecord.exprIntercept, valBindingSiteIntercept, inputRecord.nonRecBindingsIntercept, inputRecord.recBindingsIntercept, inputRecord.dtreeIntercept, inputRecord.targetIntercept, inputRecord.tmethodIntercept);
    const z0 = ZsetModule.empty(valOrder);
    const z = FoldExpr(folder)(z0, expr);
    return z;
  };

  const accessor = __exports.accessor = class accessor {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.Detuple.GlobalUsageAnalysis.accessor",
        interfaces: ["FSharpUnion"],
        cases: [["TupleGet", "number", makeGeneric(List, {
          T: TType
        })]]
      };
    }

  };
  setType("Microsoft.FSharp.Compiler.Detuple.GlobalUsageAnalysis.accessor", accessor);
  const Results = __exports.Results = class Results {
    constructor(uses, defns, decisionTreeBindings, recursiveBindings, topLevelBindings, iterationIsAtTopLevel) {
      this.Uses = uses;
      this.Defns = defns;
      this.DecisionTreeBindings = decisionTreeBindings;
      this.RecursiveBindings = recursiveBindings;
      this.TopLevelBindings = topLevelBindings;
      this.IterationIsAtTopLevel = iterationIsAtTopLevel;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.Detuple.GlobalUsageAnalysis.Results",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Uses: makeGeneric(_Map, {
            Key: Val,
            Value: makeGeneric(List, {
              T: Tuple([makeGeneric(List, {
                T: accessor
              }), makeGeneric(List, {
                T: TType
              }), makeGeneric(List, {
                T: Expr
              })])
            }),
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          Defns: makeGeneric(_Map, {
            Key: Val,
            Value: Expr,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          DecisionTreeBindings: makeGeneric(_Set, {
            T: Val,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          RecursiveBindings: makeGeneric(_Map, {
            Key: Val,
            Value: Tuple(["boolean", makeGeneric(List, {
              T: Val
            })]),
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          TopLevelBindings: makeGeneric(_Set, {
            T: Val,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          IterationIsAtTopLevel: "boolean"
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

    CompareTo(other) {
      return compareRecords(this, other) | 0;
    }

  };
  setType("Microsoft.FSharp.Compiler.Detuple.GlobalUsageAnalysis.Results", Results);

  const z0 = __exports.z0 = (() => {
    const Uses = ZmapModule.empty(valOrder);
    const Defns = ZmapModule.empty(valOrder);
    const RecursiveBindings = ZmapModule.empty(valOrder);
    return new Results(Uses, Defns, ZsetModule.empty(valOrder), RecursiveBindings, ZsetModule.empty(valOrder), true);
  })();

  const logUse = __exports.logUse = function (f, tup_0, tup_1, tup_2, z) {
    var matchValue;
    const tup = [tup_0, tup_1, tup_2];
    return new Results((matchValue = ZmapModule.tryFind(f, z.Uses), matchValue == null ? ZmapModule.add(f, ofArray([tup]), z.Uses) : ZmapModule.add(f, new List(tup, getValue(matchValue)), z.Uses)), z.Defns, z.DecisionTreeBindings, z.RecursiveBindings, z.TopLevelBindings, z.IterationIsAtTopLevel);
  };

  const logBinding = __exports.logBinding = function (z, isInDTree, v) {
    let z_1;

    if (isInDTree) {
      const DecisionTreeBindings = ZsetModule.add(v, z.DecisionTreeBindings);
      z_1 = new Results(z.Uses, z.Defns, DecisionTreeBindings, z.RecursiveBindings, z.TopLevelBindings, z.IterationIsAtTopLevel);
    } else {
      z_1 = z;
    }

    let z_2;

    if (z_1.IterationIsAtTopLevel) {
      const TopLevelBindings = ZsetModule.add(v, z_1.TopLevelBindings);
      z_2 = new Results(z_1.Uses, z_1.Defns, z_1.DecisionTreeBindings, z_1.RecursiveBindings, TopLevelBindings, z_1.IterationIsAtTopLevel);
    } else {
      z_2 = z_1;
    }

    return z_2;
  };

  const logNonRecBinding = __exports.logNonRecBinding = function (z, bind) {
    const v = bind.Var;
    const vs = ofArray([v]);
    const RecursiveBindings = ZmapModule.add(v, [false, vs], z.RecursiveBindings);
    const Defns = ZmapModule.add(v, bind.Expr, z.Defns);
    return new Results(z.Uses, Defns, z.DecisionTreeBindings, RecursiveBindings, z.TopLevelBindings, z.IterationIsAtTopLevel);
  };

  const logRecBindings = __exports.logRecBindings = function (z, binds) {
    const vs = valsOfBinds(binds);
    const RecursiveBindings = fold(function (mubinds, v) {
      return ZmapModule.add(v, [true, vs], mubinds);
    }, z.RecursiveBindings, vs);
    const Defns = fold(function (eqns, bind) {
      return ZmapModule.add(bind.Var, bind.Expr, eqns);
    }, z.Defns, binds);
    return new Results(z.Uses, Defns, z.DecisionTreeBindings, RecursiveBindings, z.TopLevelBindings, z.IterationIsAtTopLevel);
  };

  const foldUnderLambda = __exports.foldUnderLambda = function (f, z, x) {
    const z_1 = new Results(z.Uses, z.Defns, z.DecisionTreeBindings, z.RecursiveBindings, z.TopLevelBindings, false);
    const z_2 = f(z_1, x);
    const z_3 = new Results(z_2.Uses, z_2.Defns, z_2.DecisionTreeBindings, z_2.RecursiveBindings, z_2.TopLevelBindings, z.IterationIsAtTopLevel);
    return z_3;
  };

  const UsageFolders = __exports.UsageFolders = function (g) {
    const foldLocalVal = function (f, z, vref) {
      if (valRefInThisAssembly(g.compilingFslib, vref)) {
        return f(z, vref.Deref);
      } else {
        return z;
      }
    };

    const exprUsageIntercept = function (exprF, z_1, expr) {
      const recognise = function (context, expr_1) {
        var x;
        var tupInfo;
        var n;

        recognise: while (true) {
          if (expr_1.tag === 1) {
            const z_3 = foldLocalVal(function (z_2, v) {
              return logUse(v, context, new List(), new List(), z_2);
            }, z_1, expr_1.data[0]);
            return z_3;
          } else {
            const activePatternResult45023 = _TyappAndApp___(expr_1);

            if (activePatternResult45023 != null) {
              if (getValue(activePatternResult45023)[0].tag === 1) {
                const collect = function (z_4, f_1) {
                  return logUse(f_1, context, getValue(activePatternResult45023)[2], getValue(activePatternResult45023)[3], z_4);
                };

                const z_5 = foldLocalVal(collect, z_1, getValue(activePatternResult45023)[0].data[0]);
                const z_6 = fold(exprF, z_5, getValue(activePatternResult45023)[3]);
                return z_6;
              } else {
                return null;
              }
            } else {
              const $var1 = expr_1.tag === 11 ? expr_1.data[0].tag === 21 ? expr_1.data[2].tail != null ? expr_1.data[2].tail.tail == null ? (x = expr_1.data[2].head, tupInfo = expr_1.data[0].data[0], n = expr_1.data[0].data[1] | 0, !evalTupInfoIsStruct(tupInfo)) ? [0, expr_1.data[0].data[1], expr_1.data[1], expr_1.data[0].data[0], expr_1.data[2].head] : [1] : [1] : [1] : [1] : [1];

              switch ($var1[0]) {
                case 0:
                  const context_1 = new List(new accessor(0, [$var1[1], $var1[2]]), context);
                  context = context_1;
                  expr_1 = $var1[4];
                  continue recognise;

                case 1:
                  if (expr_1.tag === 3) {
                    const z_7 = foldUnderLambda(exprF, z_1, expr_1.data[4]);
                    return z_7;
                  } else if (expr_1.tag === 4) {
                    const z_8 = foldUnderLambda(exprF, z_1, expr_1.data[2]);
                    return z_8;
                  } else {
                    return null;
                  }

              }
            }
          }
        }
      };

      const context_2 = new List();
      return recognise(context_2, expr);
    };

    const targetIntercept = function (exprF_1, z_9, _arg1) {
      return foldUnderLambda(exprF_1, z_9, _arg1.data[1]);
    };

    const tmethodIntercept = function (exprF_2, z_10, _arg2) {
      return foldUnderLambda(exprF_2, z_10, _arg2.data[4]);
    };

    const inputRecord = ExprFolder0();
    return new ExprFolder(exprUsageIntercept, function (z_11, tupledArg) {
      return logBinding(z_11, tupledArg[0], tupledArg[1]);
    }, function (z_12, bind) {
      return logNonRecBinding(z_12, bind);
    }, function (z_13, binds) {
      return logRecBindings(z_13, binds);
    }, inputRecord.dtreeIntercept, targetIntercept, tmethodIntercept);
  };

  const GetUsageInfoOfImplFile = __exports.GetUsageInfoOfImplFile = function (g, expr) {
    const folder = UsageFolders(g);
    const z = FoldImplFile(folder)(z0, expr);
    return z;
  };

  return __exports;
}({});
export function internalError(str) {
  throw Microsoft.FSharp.Core.Operators.Failure(str);
}
export function mkLocalVal(m, name, ty, topValInfo) {
  return NewVal(name, m, null, ty, new ValMutability(0), false, topValInfo, taccessPublic, new ValRecursiveScopeInfo(1), null, new ValBaseOrThisInfo(2), new List(), new ValInline(2), XmlDoc.Empty, false, false, false, false, false, false, null, new ParentRef(1));
}
export class TupleStructure {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Detuple.TupleStructure",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["UnknownTS"], ["TupleTS", makeGeneric(List, {
        T: TupleStructure
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Detuple.TupleStructure", TupleStructure);
export function ValReprInfoForTS(ts) {
  if (ts.tag === 1) {
    return collect_1(function (ts_1) {
      return ValReprInfoForTS(ts_1);
    }, ts.data);
  } else {
    return ofArray([ValReprInfoModule.unnamedTopArg]);
  }
}
export function andTS(ts, tsB) {
  const matchValue = [ts, tsB];

  if (matchValue[1].tag === 1) {
    if (matchValue[0].tag === 1) {
      if (matchValue[0].data.length !== matchValue[1].data.length) {
        return new TupleStructure(0);
      } else {
        return new TupleStructure(1, toList(map2(function (ts_1, tsB_1) {
          return andTS(ts_1, tsB_1);
        }, matchValue[0].data, matchValue[1].data)));
      }
    } else {
      return new TupleStructure(0);
    }
  } else {
    return new TupleStructure(0);
  }
}
export function checkTS(_arg1) {
  const $var2 = _arg1.tag === 1 ? _arg1.data.tail != null ? _arg1.data.tail.tail == null ? [1] : [2, _arg1] : [0] : [2, _arg1];

  switch ($var2[0]) {
    case 0:
      return internalError("exprTS: Tuple[]  not expected. (units not done that way).");

    case 1:
      return internalError("exprTS: Tuple[x] not expected. (singleton tuples should not exist.");

    case 2:
      return $var2[1];
  }
}
export function uncheckedExprTS(expr) {
  var tupInfo;
  const $var3 = expr.tag === 11 ? expr.data[0].tag === 2 ? (tupInfo = expr.data[0].data, !evalTupInfoIsStruct(tupInfo)) ? [0, expr.data[1], expr.data[2], expr.data[0].data] : [1] : [1] : [1];

  switch ($var3[0]) {
    case 0:
      return new TupleStructure(1, map(function (expr_1) {
        return uncheckedExprTS(expr_1);
      }, $var3[2]));

    case 1:
      return new TupleStructure(0);
  }
}
export function uncheckedTypeTS(g, ty) {
  if (isRefTupleTy(g, ty)) {
    const tys = destRefTupleTy(g, ty);
    return new TupleStructure(1, map(function (ty_1) {
      return uncheckedTypeTS(g, ty_1);
    }, tys));
  } else {
    return new TupleStructure(0);
  }
}
export function exprTS(exprs) {
  return checkTS(uncheckedExprTS(exprs));
}
export function typeTS(g, tys) {
  return checkTS(function (ty) {
    return uncheckedTypeTS(g, ty);
  }(tys));
}
export function rebuildTS(g, m, ts, vs) {
  const rebuild = function (vs_1, ts_1) {
    const matchValue = [vs_1, ts_1];
    const $var4 = matchValue[0].tail != null ? matchValue[1].tag === 1 ? [2, matchValue[1].data, matchValue[0]] : [1, matchValue[0].head, matchValue[0].tail] : matchValue[1].tag === 1 ? [2, matchValue[1].data, matchValue[0]] : [0];

    switch ($var4[0]) {
      case 0:
        return internalError("rebuildTS: not enough fringe to build tuple");

      case 1:
        return [[exprForVal(m, $var4[1]), $var4[1].Type], $var4[2]];

      case 2:
        const patternInput = mapFold(rebuild, $var4[2], $var4[1], ofArray);
        const patternInput_1 = unzip(patternInput[0]);
        const x = mkRefTupled(g, m, patternInput_1[0], patternInput_1[1]);
        const ty = mkRefTupledTy(g, patternInput_1[1]);
        return [[x, ty], patternInput[1]];
    }
  };

  const patternInput_2 = rebuild(vs, ts);
  const x_1 = patternInput_2[0][0];
  const _ty = patternInput_2[0][1];

  if (patternInput_2[1].length !== 0) {
    internalError("rebuildTS: had more fringe vars than fringe. REPORT BUG");
  }

  return x_1;
}
export const callPatternOrder = CurriedLambda(function (e1, e2) {
  return e1.CompareTo(e2);
});
export function argsCP(exprs) {
  return map(function (exprs_1) {
    return exprTS(exprs_1);
  }, exprs);
}
export function noArgsCP() {
  return new List();
}
export function minimalCallPattern(callPattern) {
  if (callPattern.tail != null) {
    if (callPattern.head.tag === 1) {
      return new List(new TupleStructure(1, callPattern.head.data), minimalCallPattern(callPattern.tail));
    } else {
      const matchValue = minimalCallPattern(callPattern.tail);

      if (matchValue.tail == null) {
        return new List();
      } else {
        return new List(new TupleStructure(0), matchValue);
      }
    }
  } else {
    return new List();
  }
}
export function commonCallPattern(callPatterns) {
  const andCPs = function (cpA, cpB) {
    const matchValue = [cpA, cpB];

    if (matchValue[0].tail != null) {
      if (matchValue[1].tail == null) {
        return new List();
      } else {
        return new List(andTS(matchValue[0].head, matchValue[1].head), andCPs(matchValue[0].tail, matchValue[1].tail));
      }
    } else if (matchValue[1].tail != null) {
      return new List();
    } else {
      return new List();
    }
  };

  return reduce(andCPs, callPatterns);
}
export function siteCP(_accessors, _inst, args) {
  return argsCP(args);
}
export function sitesCPs(sites) {
  return map(function (tupledArg) {
    return siteCP(tupledArg[0], tupledArg[1], tupledArg[2]);
  }, sites);
}
export class TransformedFormal {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Detuple.TransformedFormal",
      interfaces: ["FSharpUnion"],
      cases: [["SameArg"], ["NewArgs", makeGeneric(List, {
        T: Val
      }), Expr]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Detuple.TransformedFormal", TransformedFormal);
export class Transform {
  constructor(transformCallPattern, transformedFormals, transformedVal) {
    this.transformCallPattern = transformCallPattern;
    this.transformedFormals = transformedFormals;
    this.transformedVal = transformedVal;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Detuple.Transform",
      interfaces: ["FSharpRecord"],
      properties: {
        transformCallPattern: makeGeneric(List, {
          T: TupleStructure
        }),
        transformedFormals: makeGeneric(List, {
          T: TransformedFormal
        }),
        transformedVal: Val
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Detuple.Transform", Transform);
export function mkTransform(g, f, m, tps, x1Ntys, rty, callPattern, tyfringes) {
  const transformedFormals = toList(map2(function (cpi, tupledArg) {
    if (cpi.tag === 1) {
      if (cpi.data.tail == null) {
        return new TransformedFormal(0);
      } else {
        let vs;

        if (tupledArg[1].length === tupledArg[0].length) {
          vs = map(function (v) {
            return mkCompGenLocal(v.Range, v.LogicalName, v.Type)[0];
          }, tupledArg[1]);
        } else {
          let baseName;
          const $var5 = tupledArg[1].tail != null ? tupledArg[1].tail.tail == null ? [0, tupledArg[1].head] : [1] : [1];

          switch ($var5[0]) {
            case 0:
              baseName = $var5[1].LogicalName;
              break;

            case 1:
              baseName = "arg";
              break;
          }

          let baseRange;
          const $var6 = tupledArg[1].tail != null ? tupledArg[1].tail.tail == null ? [0, tupledArg[1].head] : [1] : [1];

          switch ($var6[0]) {
            case 0:
              baseRange = $var6[1].Range;
              break;

            case 1:
              baseRange = m;
              break;
          }

          vs = mapIndexed(function (i, ty) {
            const name = baseName + i.toString();
            return mkCompGenLocal(baseRange, name, ty)[0];
          }, tupledArg[0]);
        }

        return new TransformedFormal(1, [vs, rebuildTS(g, m, cpi, vs)]);
      }
    } else {
      return new TransformedFormal(0);
    }
  }, callPattern, tyfringes));
  let topValInfo;
  const matchValue = f.ValReprInfo;

  if (matchValue == null) {
    topValInfo = null;
  } else {
    topValInfo = new ValReprInfo(0, [ValReprInfoModule.InferTyparInfo(tps), collect_1(function (ts) {
      return ValReprInfoForTS(ts);
    }, callPattern), ValReprInfoModule.unnamedRetVal]);
  }

  const tys1r = collect_1(function (tuple) {
    return tuple[0];
  }, tyfringes);
  const tysrN = List_1.drop(tyfringes.length, x1Ntys);
  const argtys = append(tys1r, tysrN);
  const fCty = mkLambdaTy(tps, argtys, rty);
  const transformedVal = mkLocalVal(f.Range, globalNng.FreshCompilerGeneratedName(f.LogicalName, f.Range), fCty, topValInfo);
  return new Transform(callPattern, transformedFormals, transformedVal);
}
export function zipCallPatternArgTys(m, g, callPattern, vss) {
  const zipTSTyp = function (ts, typ) {
    const $var7 = ts.tag === 1 ? isRefTupleTy(g, typ) ? [0, ts.data] : [1] : [1];

    switch ($var7[0]) {
      case 0:
        const tys = destRefTupleTy(g, typ);
        const patternInput = zipTSListTypList($var7[1], tys);
        return [new TupleStructure(1, patternInput[0]), patternInput[1]];

      case 1:
        return [new TupleStructure(0), ofArray([typ])];
    }
  };

  const zipTSListTypList = function (tss, tys_1) {
    const tstys = toList(map2(zipTSTyp, tss, tys_1));
    const tss_1 = map(function (tuple) {
      return tuple[0];
    }, tstys);
    const tys_2 = collect_1(function (tuple_1) {
      return tuple_1[1];
    }, tstys);
    return [tss_1, tys_2];
  };

  const vss_1 = List_1.take(callPattern.length, vss);
  const tstys_1 = toList(map2(function (ts_1, vs) {
    const patternInput_1 = zipTSTyp(ts_1, typeOfLambdaArg(m, vs));
    return [patternInput_1[0], [patternInput_1[1], vs]];
  }, callPattern, vss_1));
  return unzip(tstys_1);
}
export function decideFormalSuggestedCP(g, z, tys, vss) {
  const trimTsByAccess = function (accessors, ts) {
    const matchValue = [ts, accessors];

    if (matchValue[0].tag === 1) {
      if (matchValue[1].tail != null) {
        const tss = List_1.mapNth(matchValue[1].head.data[0], CurriedLambda(trimTsByAccess)(matchValue[1].tail), matchValue[0].data);
        return new TupleStructure(1, tss);
      } else {
        return new TupleStructure(0);
      }
    } else {
      return new TupleStructure(0);
    }
  };

  const trimTsByVal = function (z_1, ts_1, v) {
    const matchValue_1 = ZmapModule.tryFind(v, z_1.Uses);

    if (matchValue_1 != null) {
      const trim = function (ts_2, tupledArg) {
        return trimTsByAccess(tupledArg[0], ts_2);
      };

      return fold(trim, ts_1, getValue(matchValue_1));
    } else {
      return new TupleStructure(0);
    }
  };

  const trimTsByFormal = function (z_2, ts_3, vss_1) {
    const $var8 = vss_1.tail != null ? vss_1.tail.tail == null ? [0, vss_1.head] : [1, vss_1] : [1, vss_1];

    switch ($var8[0]) {
      case 0:
        return trimTsByVal(z_2, ts_3, $var8[1]);

      case 1:
        const tss_1 = ts_3.tag === 1 ? ts_3.data : internalError("trimByFormal: ts must be tuple?? PLEASE REPORT\n");
        const tss_2 = toList(map2(CurriedLambda(trimTsByVal)(z_2), tss_1, $var8[1]));
        return new TupleStructure(1, tss_2);
    }
  };

  const tss_3 = map(function (tys_1) {
    return typeTS(g, tys_1);
  }, tys);
  const tss_4 = toList(map2(CurriedLambda(trimTsByFormal)(z), tss_3, vss));
  return tss_4;
}
export function decideTransform(g, z, v, callPatterns, m, tps, vss, rty) {
  const tys = map(function (arg10_) {
    return typeOfLambdaArg(m, arg10_);
  }, vss);
  const callPattern = commonCallPattern(callPatterns);
  const callPattern_1 = List_1.take(vss.length, callPattern);
  const formalCallPattern = decideFormalSuggestedCP(g, z, tys, vss);
  const callPattern_2 = List_1.take(callPattern_1.length, formalCallPattern);
  const patternInput = zipCallPatternArgTys(m, g, callPattern_2, vss);
  const callPattern_3 = minimalCallPattern(patternInput[0]);
  const tyfringes = List_1.take(callPattern_3.length, patternInput[1]);

  if (callPattern_3.tail == null) {
    return null;
  } else {
    return [v, mkTransform(g, v, m, tps, tys, rty, callPattern_3, tyfringes)];
  }
}
export function eligibleVal(g, v) {
  const dllImportStubOrOtherNeverInline = v.InlineInfo.Equals(new ValInline(3));
  const mutableVal = v.IsMutable;
  const byrefVal = isByrefLikeTy(g, v.Type);

  if (((!dllImportStubOrOtherNeverInline ? !byrefVal : false) ? !mutableVal : false) ? !v.IsMemberOrModuleBinding : false) {
    return !v.IsCompiledAsTopLevel;
  } else {
    return false;
  }
}
export function determineTransforms(g, z) {
  const selectTransform = function (f, sites) {
    if (!eligibleVal(g, f)) {
      return null;
    } else {
      const matchValue = ZmapModule.tryFind(f, z.Defns);

      if (matchValue != null) {
        const patternInput = stripTopLambda(getValue(matchValue), f.Type);
        const matchValue_1 = concat(patternInput[1]);

        if (matchValue_1.tail != null) {
          const m = matchValue_1.head.Range;
          const callPatterns = sitesCPs(sites);
          return decideTransform(g, z, f, callPatterns, m, patternInput[0], patternInput[1], patternInput[3]);
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };

  const vtransforms = ZmapModule.chooseL(selectTransform, z.Uses);
  const vtransforms_1 = ZmapModule.ofList(valOrder, vtransforms);
  return vtransforms_1;
}
export class penv {
  constructor(transforms, ccu, g) {
    this.transforms = transforms;
    this.ccu = ccu;
    this.g = g;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Detuple.penv",
      interfaces: ["FSharpRecord"],
      properties: {
        transforms: makeGeneric(_Map, {
          Key: Val,
          Value: Transform,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        ccu: CcuThunk,
        g: TcGlobals
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Detuple.penv", penv);
export function hasTransfrom(penv_1, f) {
  return ZmapModule.tryFind(f, penv_1.transforms);
}
export class env {
  constructor(eg, prefix, m) {
    this.eg = eg;
    this.prefix = prefix;
    this.m = m;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Detuple.env",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        eg: TcGlobals,
        prefix: "string",
        m: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Detuple.env", env);
export function suffixE(env_1, s) {
  const prefix = env_1.prefix + s;
  return new env(env_1.eg, prefix, env_1.m);
}
export function rangeE(env_1, m) {
  return new env(env_1.eg, env_1.prefix, m);
}
export function push(b, bs) {
  return new List(b, bs);
}
export function pushL(xs, bs) {
  return append(xs, bs);
}
export function newLocal(env_1, ty) {
  return mkCompGenLocal(env_1.m, env_1.prefix, ty);
}
export function newLocalN(env_1, i, ty) {
  return mkCompGenLocal(env_1.m, env_1.prefix + i.toString(), ty);
}
export function noEffectExpr(env_1, bindings, x) {
  if (x.tag === 1) {
    return [bindings, x];
  } else {
    const patternInput = newLocal(env_1, tyOfExpr(env_1.eg, x));
    const bind = mkCompGenBind(patternInput[0], x);
    return [push(bind, bindings), patternInput[1]];
  }
}
export function buildProjections(env_1, bindings, x, xtys) {
  const patternInput_1 = unzip(mapIndexed(function (i, xty) {
    const patternInput = newLocalN(env_1, i, xty);
    const bind = mkBind(new SequencePointInfoForBinding(4), patternInput[0], mkTupleFieldGet(env_1.eg, tupInfoRef, x, xtys, i, env_1.m));
    return [bind, patternInput[1]];
  }, xtys));
  const bindings_1 = pushL(reverse(patternInput_1[0]), bindings);
  return [bindings_1, patternInput_1[1]];
}
export function collapseArg(env_1, bindings, ts, x) {
  var xs;
  var tupInfo;
  var tss_1;

  var _xtys;

  collapseArg: while (true) {
    const m = Expr_get_Range.bind(x)();
    const env_2 = rangeE(env_1, m);
    const matchValue = [ts, x];
    const $var9 = matchValue[0].tag === 1 ? matchValue[1].tag === 11 ? matchValue[1].data[0].tag === 2 ? (xs = matchValue[1].data[2], tupInfo = matchValue[1].data[0].data, tss_1 = matchValue[0].data, _xtys = matchValue[1].data[1], !evalTupInfoIsStruct(tupInfo)) ? [1, matchValue[1].data[1], matchValue[0].data, matchValue[1].data[0].data, matchValue[1].data[2]] : [2] : [2] : [2] : [0, matchValue[1]];

    switch ($var9[0]) {
      case 0:
        const patternInput = noEffectExpr(env_2, bindings, $var9[1]);
        return [patternInput[0], ofArray([patternInput[1]])];

      case 1:
        const env_3 = suffixE(env_2, "'");
        return collapseArgs(env_3, bindings, 1, $var9[2], $var9[4]);

      case 2:
        if (matchValue[0].tag === 1) {
          const tss = matchValue[0].data;
          const patternInput_1 = noEffectExpr(env_2, bindings, matchValue[1]);
          const env_4 = suffixE(env_2, "_p");
          const xty = tyOfExpr(env_4.eg, patternInput_1[1]);
          const xtys = destRefTupleTy(env_4.eg, xty);
          const patternInput_2 = buildProjections(env_4, patternInput_1[0], patternInput_1[1], xtys);
          env_1 = env_4;
          bindings = patternInput_2[0];
          ts = new TupleStructure(1, tss);
          x = mkRefTupled(env_4.eg, m, patternInput_2[1], xtys);
          continue collapseArg;
        } else {
          throw new Error("C:/projects/fcs/src/fsharp/DetupleArgs.fs", 685, 10);
        }

    }
  }
}
export function collapseArgs(env_1, bindings, n, callPattern, args) {
  const matchValue = [callPattern, args];

  if (matchValue[0].tail != null) {
    if (matchValue[1].tail == null) {
      return internalError("collapseArgs: CallPattern longer than callsite args. REPORT BUG");
    } else {
      const env1 = suffixE(env_1, n.toString());
      const patternInput = collapseArg(env1, bindings, matchValue[0].head, matchValue[1].head);
      const patternInput_1 = collapseArgs(env_1, patternInput[0], n + 1, matchValue[0].tail, matchValue[1].tail);
      return [patternInput_1[0], append(patternInput[1], patternInput_1[1])];
    }
  } else {
    return [bindings, matchValue[1]];
  }
}
export function mkLets(binds, body) {
  return foldBack(function (b, acc) {
    return mkLetBind(Expr_get_Range.bind(acc)(), b, acc);
  }, binds, body);
}
export function fixupApp(penv_1, fx, fty, tys, args, m) {
  if (fx.tag === 1) {
    const f = fx.data[0].Deref;
    const matchValue = hasTransfrom(penv_1, f);

    if (matchValue == null) {
      return new Expr(5, [fx, fty, tys, args, fx.data[2]]);
    } else {
      const fCty = getValue(matchValue).transformedVal.Type;
      const fCx = exprForVal(fx.data[2], getValue(matchValue).transformedVal);
      const env_1 = new env(penv_1.g, "arg", fx.data[2]);
      const bindings = new List();
      const patternInput = collapseArgs(env_1, bindings, 0, getValue(matchValue).transformCallPattern, args);
      const bindings_1 = reverse(patternInput[0]);
      return mkLets(bindings_1, new Expr(5, [fCx, fCty, tys, patternInput[1], fx.data[2]]));
    }
  } else {
    return new Expr(5, [fx, fty, tys, args, m]);
  }
}
export function transFormal(ybi, xi) {
  if (ybi.tag === 1) {
    return map(function (value) {
      return singleton(value);
    }, ybi.data[0]);
  } else {
    return ofArray([xi]);
  }
}
export function transRebind(ybi, xi) {
  const matchValue = [xi, ybi];
  const $var10 = matchValue[1].tag === 1 ? matchValue[0].tail != null ? matchValue[0].tail.tail == null ? [1, matchValue[1].data[0], matchValue[0].head, matchValue[1].data[1]] : [2, matchValue[1].data[0], matchValue[0], matchValue[1].data[1]] : [2, matchValue[1].data[0], matchValue[0], matchValue[1].data[1]] : [0];

  switch ($var10[0]) {
    case 0:
      return new List();

    case 1:
      return ofArray([mkCompGenBind($var10[2], $var10[3])]);

    case 2:
      return toList(map2(function (arg00_, arg10_) {
        return mkCompGenBind(arg00_, arg10_);
      }, $var10[2], tryDestRefTupleExpr($var10[3])));
  }
}
export function passBind(penv_1, _arg1) {
  const m = _arg1.data[0].Range;
  const matchValue = hasTransfrom(penv_1, _arg1.data[0]);

  if (matchValue != null) {
    const patternInput = stripTopLambda(_arg1.data[1], _arg1.data[0].Type);
    const p = getValue(matchValue).transformedFormals.length | 0;

    if (patternInput[1].length < p) {
      internalError("passBinds: |vss|<p - detuple pass");
    }

    const xqNs = List_1.drop(p, patternInput[1]);
    const x1ps = List_1.take(p, patternInput[1]);
    const y1Ps = concat(toList(map2(function (ybi, xi) {
      return transFormal(ybi, xi);
    }, getValue(matchValue).transformedFormals, x1ps)));
    const formals = append(y1Ps, xqNs);
    const rebinds = concat(toList(map2(function (ybi_1, xi_1) {
      return transRebind(ybi_1, xi_1);
    }, getValue(matchValue).transformedFormals, x1ps)));
    const patternInput_1 = [mkLetsBind(m, rebinds, patternInput[2]), patternInput[3]];
    const bind = mkMultiLambdaBind(getValue(matchValue).transformedVal, _arg1.data[2], m, patternInput[0], formals, patternInput_1[0], patternInput_1[1]);
    return bind;
  } else {
    return _arg1;
  }
}
export function passBinds(penv_1, binds) {
  return map(function (arg10_) {
    return passBind(penv_1, arg10_);
  }, binds);
}
export function passBindRhs(conv, _arg1) {
  return new Binding(0, [_arg1.data[0], conv(_arg1.data[1]), _arg1.data[2]]);
}
export function preInterceptExpr(penv_1, conv, expr) {
  if (expr.tag === 6) {
    const binds = map(function (arg10_) {
      return passBindRhs(conv, arg10_);
    }, expr.data[0]);
    const binds_1 = passBinds(penv_1, binds);
    return mkLetRecBinds(expr.data[2], binds_1, conv(expr.data[1]));
  } else if (expr.tag === 7) {
    const bind = passBindRhs(conv, expr.data[0]);
    const bind_1 = passBind(penv_1, bind);
    return mkLetBind(expr.data[2], bind_1, conv(expr.data[1]));
  } else {
    const activePatternResult45200 = _TyappAndApp___(expr);

    if (activePatternResult45200 != null) {
      const args = map(conv, getValue(activePatternResult45200)[3]);
      const f = conv(getValue(activePatternResult45200)[0]);
      return fixupApp(penv_1, f, getValue(activePatternResult45200)[1], getValue(activePatternResult45200)[2], args, getValue(activePatternResult45200)[4]);
    } else {
      return null;
    }
  }
}
export function postTransformExpr(penv_1, expr) {
  if (expr.tag === 6) {
    const binds = passBinds(penv_1, expr.data[0]);
    return mkLetRecBinds(expr.data[2], binds, expr.data[1]);
  } else if (expr.tag === 7) {
    const bind = passBind(penv_1, expr.data[0]);
    return mkLetBind(expr.data[2], bind, expr.data[1]);
  } else {
    const activePatternResult45204 = _TyappAndApp___(expr);

    if (activePatternResult45204 != null) {
      return fixupApp(penv_1, getValue(activePatternResult45204)[0], getValue(activePatternResult45204)[1], getValue(activePatternResult45204)[2], getValue(activePatternResult45204)[3], getValue(activePatternResult45204)[4]);
    } else {
      return null;
    }
  }
}
export function passImplFile(penv_1, ass) {
  var PreIntercept;
  var PreInterceptBinding;
  return RewriteImplFile((PreIntercept = null, PreInterceptBinding = null, new ExprRewritingEnv(PreIntercept, function (expr) {
    return postTransformExpr(penv_1, expr);
  }, PreInterceptBinding, false)), ass);
}
export function DetupleImplFile(ccu, g, expr) {
  const z = GlobalUsageAnalysis.GetUsageInfoOfImplFile(g, expr);
  const vtrans = determineTransforms(g, z);
  const penv_1 = new penv(vtrans, ccu, g);
  const expr_1 = passImplFile(penv_1, expr);
  return expr_1;
}