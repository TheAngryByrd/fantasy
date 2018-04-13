import { dprintf } from "../absil/ildiag";
import { join, printf } from "../fable-core/String";
import { Microsoft } from "../fcs-fable/adapters";
import { warning, Error as _Error, error, ErrorLoggerExtensions } from "./ErrorLogger";
import { ZmapModule } from "../absil/zmap";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, toString, equalsRecords, Interface, Tuple, compareUnions, equals, GenericParam, makeGeneric } from "../fable-core/Util";
import { singleton as singleton_1, replicate, collect as collect_2, reverse, partition, ofArray, filter, map, append } from "../fable-core/List";
import List from "../fable-core/List";
import { mapFold, tryFind, exists, fold, singleton, empty, collect as collect_1, delay, toList, forAll, reduce, foldBack } from "../fable-core/Seq";
import { ValCopyFlag, copyImplFile, rebuildLinearMatchExpr, $7C$LinearMatchExpr$7C$_$7C$ as _LinearMatchExpr___, mkAndSimplifyMatch, mkTypeLambda, rebuildLambda, Expr$2E$get_Range as Expr_get_Range, mkMultiLambdasCore, mkApps, mkMultiLambdaBind, mkRefTupledVars, AllowTypeDirectedDetupling, InferArityOfExprBinding, mkLetsFromBindings, mkLetRecBinds, mkLambdaTy, stripFunTy, mkBind, setValHasNoArity, mkInvisibleBind, exprForVal, mkCompGenLocal, IsGenericValWithGenericContraints, FoldImplFile, ExprFolder, ExprFolder0, emptyFreeVars, unionFreeVars, CollectTyparsAndLocals, freeInBindingRhs, typarOrder, valsOfBinds, DebugPrint, isByrefLikeTy, valOrder, stripTopLambda, stripExpr } from "./TastOps";
import { TypedImplFile, ModuleOrNamespaceBinding, ModuleOrNamespaceExpr, ModuleOrNamespaceExprWithSig, DecisionTreeTarget, DecisionTreeCase, DecisionTree, ObjExprMethod, NewFreeVarsCache, newUnique, Expr, mkTyparTy, CcuThunk, globalNng, typeOfVal, ValReprInfoModule, ValReprInfo, Binding, Typar, Val, nameOfVal, ParentRef, ValInline, ValBaseOrThisInfo, ValRecursiveScopeInfo, taccessPublic, ValMutability, NewVal } from "./tast";
import { SequencePointInfoForBinding, XmlDoc } from "./ast";
import { ZsetModule } from "../absil/zset";
import { GlobalUsageAnalysis } from "./DetupleArgs";
import CurriedLambda from "../fable-core/CurriedLambda";
import { getValue } from "../fable-core/Option";
import { listL, commaListL, showL } from "./layout";
import { List as List_2, Bool, Pair, Zset } from "./lib";
import { Option, foldOn, List as List_1, Order } from "../absil/illib";
import { Map as _Map, Set as _Set } from "../utils/TaggedCollections";
import { range } from "./range";
import { TcGlobals } from "./TcGlobals";
import { SR } from "../codegen/FSComp";
export const verboseTLR = false;
export function internalError(str) {
  dprintf(printf("Error: %s\n"))(str);
  throw Microsoft.FSharp.Core.Operators.Failure(str);
}
export const Zmap = function (__exports) {
  const force = __exports.force = function (k, mp, str, soK) {
    try {
      return ZmapModule.find(k, mp);
    } catch (e) {
      dprintf(printf("Zmap.force: %s %s\n"))(str, soK(k));
      ErrorLoggerExtensions.PreserveStackTrace(e);
      throw e;
    }
  };

  return __exports;
}({});
export class Tree {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Tree",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["TreeNode", makeGeneric(List, {
        T: makeGeneric(Tree, {
          T: GenericParam("T")
        })
      })], ["LeafNode", GenericParam("T")]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Tree", Tree);
export function fringeTR(tr) {
  const collect = function (tr_1, acc) {
    if (tr_1.tag === 1) {
      return new List(tr_1.data, acc);
    } else {
      return foldBack(collect, tr_1.data, acc);
    }
  };

  return collect(tr, new List());
}
export function emptyTR() {
  return new Tree(0, new List());
}
export function destApp(f, fty, tys, args, m) {
  const matchValue = stripExpr(f);

  if (matchValue.tag === 5) {
    if (matchValue.data[3].tail == null) {
      return [matchValue.data[0], matchValue.data[1], append(matchValue.data[2], tys), args, m];
    } else {
      return [f, fty, tys, args, m];
    }
  } else {
    return [matchValue, fty, tys, args, m];
  }
}
export function isDelayedRepr(f, e) {
  const patternInput = stripTopLambda(e, f.Type);
  return patternInput[1].length > 0;
}
export function mkLocalNameTypeArity(compgen, m, name, ty, topValInfo) {
  return NewVal(name, m, null, ty, new ValMutability(0), compgen, topValInfo, taccessPublic, new ValRecursiveScopeInfo(1), null, new ValBaseOrThisInfo(2), new List(), new ValInline(2), XmlDoc.Empty, false, false, false, false, false, false, null, new ParentRef(1));
}
export function GetValsBoundUnderMustInline(xinfo) {
  const accRejectFrom = function (v, repr, rejectS) {
    if (v.InlineInfo.Equals(new ValInline(0))) {
      return ZsetModule.union(GlobalUsageAnalysis.GetValsBoundInExpr(repr), rejectS);
    } else {
      return rejectS;
    }
  };

  const rejectS_1 = ZsetModule.empty(valOrder);
  const rejectS_2 = ZmapModule.fold(accRejectFrom, xinfo.Defns, rejectS_1);
  return rejectS_2;
}
export function IsRefusedTLR(g, f) {
  const mutableVal = f.IsMutable;
  const dllImportStubOrOtherNeverInline = f.InlineInfo.Equals(new ValInline(3));
  const byrefVal = isByrefLikeTy(g, f.Type);
  const specialVal = CurriedLambda(() => f.MemberInfo != null)();
  const alreadyChosen = CurriedLambda(() => f.ValReprInfo != null)();
  const refuseTest = (((alreadyChosen ? true : mutableVal) ? true : byrefVal) ? true : specialVal) ? true : dllImportStubOrOtherNeverInline;
  return refuseTest;
}
export function IsMandatoryTopLevel(f) {
  const specialVal = CurriedLambda(() => f.MemberInfo != null)();
  const isModulBinding = f.IsMemberOrModuleBinding;

  if (specialVal) {
    return true;
  } else {
    return isModulBinding;
  }
}
export function IsMandatoryNonTopLevel(g, f) {
  const byrefVal = isByrefLikeTy(g, f.Type);
  return byrefVal;
}
export const Pass1_DetermineTLRAndArities = function (__exports) {
  const GetMaxNumArgsAtUses = __exports.GetMaxNumArgsAtUses = function (xinfo, f) {
    const matchValue = ZmapModule.tryFind(f, xinfo.Uses);

    if (matchValue != null) {
      return reduce((x, y) => Math.max(x, y), map(function (tupledArg) {
        return tupledArg[2].length;
      }, getValue(matchValue))) | 0;
    } else {
      return 0;
    }
  };

  const SelectTLRVals = __exports.SelectTLRVals = function (g, xinfo, f, e) {
    if (IsRefusedTLR(g, f)) {
      return null;
    } else if (ZsetModule.contains(f, xinfo.DecisionTreeBindings)) {
      return null;
    } else {
      const atTopLevel = ZsetModule.contains(f, xinfo.TopLevelBindings);
      const patternInput = stripTopLambda(e, f.Type);
      const nFormals = patternInput[1].length | 0;
      const nMaxApplied = GetMaxNumArgsAtUses(xinfo, f) | 0;
      const arity = (nFormals < nMaxApplied ? nFormals : nMaxApplied) | 0;

      if ((atTopLevel ? true : arity !== 0) ? true : !(patternInput[0].tail == null)) {
        return [f, arity];
      } else {
        return null;
      }
    }
  };

  const IsValueRecursionFree = __exports.IsValueRecursionFree = function (xinfo, f) {
    const hasDelayedRepr = function (f_1) {
      return isDelayedRepr(f_1, Zmap.force(f_1, xinfo.Defns, "IsValueRecursionFree - hasDelayedRepr", function (v) {
        return nameOfVal(v);
      }));
    };

    const patternInput = Zmap.force(f, xinfo.RecursiveBindings, "IsValueRecursionFree", function (v_1) {
      return nameOfVal(v_1);
    });

    if (!patternInput[0]) {
      return true;
    } else {
      return forAll(hasDelayedRepr, patternInput[1]);
    }
  };

  const DumpArity = __exports.DumpArity = function (arityM) {
    const dump = function (f, n) {
      dprintf(printf("tlr: arity %50s = %d\n"))(showL(DebugPrint.valL(f)), n);
    };

    ZmapModule.iter(dump, arityM);
  };

  const DetermineTLRAndArities = __exports.DetermineTLRAndArities = function (g, expr) {
    const xinfo = GlobalUsageAnalysis.GetUsageInfoOfImplFile(g, expr);
    const fArities = ZmapModule.chooseL(function (f, e) {
      return SelectTLRVals(g, xinfo, f, e);
    }, xinfo.Defns);
    const fArities_1 = filter($var1 => function (f_1) {
      return IsValueRecursionFree(xinfo, f_1);
    }(function (tuple) {
      return tuple[0];
    }($var1)), fArities);
    const rejectS = GetValsBoundUnderMustInline(xinfo);
    const fArities_2 = filter(function (tupledArg) {
      return !ZsetModule.contains(tupledArg[0], rejectS);
    }, fArities_1);
    const tlrS = Zset.ofList(valOrder, map(function (tuple_1) {
      return tuple_1[0];
    }, fArities_2));
    const topValS = ZsetModule.filter($var2 => function (value) {
      return !value;
    }(function (f_2) {
      return IsMandatoryNonTopLevel(g, f_2);
    }($var2)), xinfo.TopLevelBindings);
    const arityM = ZmapModule.ofList(valOrder, fArities_2);
    return [tlrS, topValS, arityM];
  };

  return __exports;
}({});
export class BindingGroupSharingSameReqdItems {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.BindingGroupSharingSameReqdItems",
      properties: {
        IsEmpty: "boolean",
        Pairs: makeGeneric(List, {
          T: Tuple([Val, BindingGroupSharingSameReqdItems])
        }),
        Vals: makeGeneric(List, {
          T: Val
        })
      }
    };
  }

  constructor(bindings) {
    this.vals = valsOfBinds(bindings);
    this.vset = ZsetModule.addList(this.vals, ZsetModule.empty(valOrder));
  }

  get Vals() {
    return this.vals;
  }

  Contains(v) {
    return this.vset.Contains_0(v);
  }

  get IsEmpty() {
    const $var3 = this.vals;
    return $var3.tail == null;
  }

  get Pairs() {
    return map(f => [f, this], this.vals);
  }

  ToString() {
    return "+" + join("+", map(v => nameOfVal(v), this.vals));
  }

}
setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.BindingGroupSharingSameReqdItems", BindingGroupSharingSameReqdItems);
export const fclassOrder = Order.orderOn(function (b) {
  return b.Vals;
}, List_1.order(valOrder));
export class ReqdItem {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.ReqdItem",
      interfaces: ["FSharpUnion"],
      cases: [["ReqdSubEnv", Val], ["ReqdVal", Val]]
    };
  }

  ToString() {
    return this.tag === 1 ? this.data.LogicalName : "&" + this.data.LogicalName;
  }

}
setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.ReqdItem", ReqdItem);
export const reqdItemOrder = (() => {
  const rep = function (_arg1) {
    if (_arg1.tag === 1) {
      return [false, _arg1.data];
    } else {
      return [true, _arg1.data];
    }
  };

  return Order.orderOn(rep, Pair.order(Bool.order, valOrder));
})();
export class ReqdItemsForDefn {
  constructor(reqdTypars, reqdItems, m) {
    this.reqdTypars = reqdTypars;
    this.reqdItems = reqdItems;
    this.m = m;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.ReqdItemsForDefn",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        reqdTypars: makeGeneric(_Set, {
          T: Typar,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        reqdItems: makeGeneric(_Set, {
          T: ReqdItem,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        m: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get ReqdSubEnvs() {
    return toList(delay(() => collect_1(x => x.tag === 1 ? empty() : singleton(x.data), this.reqdItems)));
  }

  get ReqdVals() {
    return toList(delay(() => collect_1(x => x.tag === 1 ? singleton(x.data) : empty(), this.reqdItems)));
  }

  Extend(typars, items) {
    return new ReqdItemsForDefn(ZsetModule.addList(typars, this.reqdTypars), ZsetModule.addList(items, this.reqdItems), this.m);
  }

  static Initial(typars, m) {
    return new ReqdItemsForDefn(ZsetModule.addList(typars, ZsetModule.empty(typarOrder)), ZsetModule.empty(reqdItemOrder), m);
  }

  ToString() {
    return showL(commaListL(map(arg00_ => DebugPrint.typarL(arg00_), ZsetModule.elements(this.reqdTypars)))) + "--" + join(",", map(value => toString(value), ZsetModule.elements(this.reqdItems)));
  }

}
setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.ReqdItemsForDefn", ReqdItemsForDefn);
export function IsArityMet(vref, wf, tys, args) {
  if (tys.length === vref.Typars.length) {
    return wf <= args.length;
  } else {
    return false;
  }
}
export const Pass2_DetermineReqdItems = function (__exports) {
  const state = __exports.state = class state {
    constructor(stack, reqdItemsMap, fclassM, revDeclist, recShortCallS) {
      this.stack = stack;
      this.reqdItemsMap = reqdItemsMap;
      this.fclassM = fclassM;
      this.revDeclist = revDeclist;
      this.recShortCallS = recShortCallS;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Pass2_DetermineReqdItems.state",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          stack: makeGeneric(List, {
            T: Tuple([BindingGroupSharingSameReqdItems, makeGeneric(_Set, {
              T: Val,
              ComparerTag: Interface("System.Collections.Generic.IComparer")
            }), ReqdItemsForDefn])
          }),
          reqdItemsMap: makeGeneric(_Map, {
            Key: BindingGroupSharingSameReqdItems,
            Value: ReqdItemsForDefn,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          fclassM: makeGeneric(_Map, {
            Key: Val,
            Value: BindingGroupSharingSameReqdItems,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          revDeclist: makeGeneric(List, {
            T: BindingGroupSharingSameReqdItems
          }),
          recShortCallS: makeGeneric(_Set, {
            T: Val,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          })
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

  };
  setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Pass2_DetermineReqdItems.state", state);
  const state0 = __exports.state0 = new state(new List(), ZmapModule.empty(fclassOrder), ZmapModule.empty(valOrder), new List(), ZsetModule.empty(valOrder));

  const PushFrame = __exports.PushFrame = function (fclass, reqdTypars0, reqdVals0, m, state_1) {
    var env;

    if (fclass.IsEmpty) {
      return state_1;
    } else {
      const revDeclist = new List(fclass, state_1.revDeclist);
      return new state((env = function (arg00, arg10) {
        return ReqdItemsForDefn.Initial(arg00, arg10);
      }(reqdTypars0, m), new List([fclass, reqdVals0, env], state_1.stack)), state_1.reqdItemsMap, state_1.fclassM, revDeclist, state_1.recShortCallS);
    }
  };

  const SaveFrame = __exports.SaveFrame = function (fclass, state_1) {
    if (verboseTLR) {
      dprintf(printf("SaveFrame: %A\n"))(fclass);
    }

    if (fclass.IsEmpty) {
      return state_1;
    } else if (state_1.stack.tail != null) {
      const fclass_1 = state_1.stack.head[0];
      const env = state_1.stack.head[2];
      const _reqdVals0 = state_1.stack.head[1];
      return new state(state_1.stack.tail, ZmapModule.add(fclass_1, env, state_1.reqdItemsMap), fold(function (mp, tupledArg) {
        return ZmapModule.add(tupledArg[0], tupledArg[1], mp);
      }, state_1.fclassM, fclass_1.Pairs), state_1.revDeclist, state_1.recShortCallS);
    } else {
      return internalError("trl: popFrame has empty stack");
    }
  };

  const LogRequiredFrom = __exports.LogRequiredFrom = function (gv, items, state_1) {
    const logIntoFrame = function (tupledArg) {
      const env = tupledArg[1].Contains_0(gv) ? tupledArg[2].Extend(new List(), items) : tupledArg[2];
      return [tupledArg[0], tupledArg[1], env];
    };

    return new state(map(logIntoFrame, state_1.stack), state_1.reqdItemsMap, state_1.fclassM, state_1.revDeclist, state_1.recShortCallS);
  };

  const LogShortCall = __exports.LogShortCall = function (gv, state_1) {
    if (exists(function (tupledArg) {
      return tupledArg[0].Contains(gv);
    }, state_1.stack)) {
      if (verboseTLR) {
        dprintf(printf("shortCall:     rec: %s\n"))(gv.LogicalName);
      }

      const recShortCallS = ZsetModule.add(gv, state_1.recShortCallS);
      return new state(state_1.stack, state_1.reqdItemsMap, state_1.fclassM, state_1.revDeclist, recShortCallS);
    } else {
      if (verboseTLR) {
        dprintf(printf("shortCall: not-rec: %s\n"))(gv.LogicalName);
      }

      return state_1;
    }
  };

  const FreeInBindings = __exports.FreeInBindings = function (bs) {
    var p;
    return fold((p = function (arg10_) {
      return freeInBindingRhs(CollectTyparsAndLocals, arg10_);
    }, function (z, x) {
      return foldOn(p, function (arg00_, arg10__1) {
        return unionFreeVars(arg00_, arg10__1);
      }, z, x);
    }), emptyFreeVars, bs);
  };

  const ExprEnvIntercept = __exports.ExprEnvIntercept = function (tlrS, arityM, exprF, z, expr) {
    const accInstance = function (z_1, tupledArg) {
      const f = tupledArg[0].Deref;
      const matchValue = ZmapModule.tryFind(f, arityM);

      if (matchValue == null) {
        return LogRequiredFrom(f, ofArray([new ReqdItem(1, f)]), z_1);
      } else if (IsArityMet(tupledArg[0], getValue(matchValue), tupledArg[1], tupledArg[2])) {
        return LogRequiredFrom(f, ofArray([new ReqdItem(0, f)]), z_1);
      } else {
        const z_2 = LogRequiredFrom(f, ofArray([new ReqdItem(1, f)]), z_1);
        const z_3 = LogShortCall(f, z_2);
        return z_3;
      }
    };

    const accBinds = function (m, z_4, binds) {
      var p;
      var p_1;
      const patternInput = partition(function (b) {
        return ZsetModule.contains(b.Var, tlrS);
      }, binds);
      const fclass = new BindingGroupSharingSameReqdItems(patternInput[0]);
      const frees = FreeInBindings(patternInput[0]);
      const reqdTypars0 = ZsetModule.elements(frees.FreeTyvars.FreeTypars);
      const reqdVals0 = ZsetModule.elements(frees.FreeLocals);
      const reqdVals0_1 = filter(function (gv) {
        return !fclass.Contains(gv);
      }, reqdVals0);

      const reqdVals0_2 = function (xs) {
        return Zset.ofList(valOrder, xs);
      }(reqdVals0_1);

      const z_5 = PushFrame(fclass, reqdTypars0, reqdVals0_2, m, z_4);
      const z_7 = fold((p = function (b_1) {
        return b_1.Expr;
      }, function (z_6, x) {
        return foldOn(p, exprF, z_6, x);
      }), z_5, patternInput[0]);
      const z_8 = SaveFrame(fclass, z_7);
      const z_10 = fold((p_1 = function (b_2) {
        return b_2.Expr;
      }, function (z_9, x_1) {
        return foldOn(p_1, exprF, z_9, x_1);
      }), z_8, patternInput[1]);
      return z_10;
    };

    const $var4 = expr.tag === 1 ? [0, expr.data[0]] : expr.tag === 11 ? expr.data[0].tag === 30 ? [1, expr.data[1], expr.data[2], expr.data[0].data[1]] : [5] : expr.tag === 5 ? [2, expr.data[3], expr.data[0], expr.data[1], expr.data[4], expr.data[2]] : expr.tag === 6 ? [3, expr.data[0], expr.data[1], expr.data[2]] : expr.tag === 7 ? [4, expr.data[0], expr.data[1], expr.data[2]] : [5];

    switch ($var4[0]) {
      case 0:
        const z_11 = accInstance(z, [$var4[1], new List(), new List()]);
        return z_11;

      case 1:
        const z_12 = accInstance(z, [$var4[3], new List(), new List()]);
        const z_13 = fold(exprF, z_12, $var4[2]);
        return z_13;

      case 2:
        const patternInput_1 = destApp($var4[2], $var4[3], $var4[5], $var4[1], $var4[4]);

        if (patternInput_1[0].tag === 1) {
          const z_14 = accInstance(z, [patternInput_1[0].data[0], patternInput_1[2], patternInput_1[3]]);
          const z_15 = fold(exprF, z_14, patternInput_1[3]);
          return z_15;
        } else {
          return null;
        }

      case 3:
        const z_16 = accBinds($var4[3], z, $var4[1]);
        const z_17 = exprF(z_16, $var4[2]);
        return z_17;

      case 4:
        const z_18 = accBinds($var4[3], z, ofArray([$var4[1]]));
        const z_19 = exprF(z_18, $var4[2]);
        return z_19;

      case 5:
        return null;
    }
  };

  const CloseReqdTypars = __exports.CloseReqdTypars = function (fclassM, reqdItemsMap) {
    if (verboseTLR) {
      dprintf(printf("CloseReqdTypars------\n"));
    }

    const closeStep = function (reqdItemsMap_1, changed, fc, env) {
      const directCallReqdEnvs = env.ReqdSubEnvs;
      const directCallReqdTypars = map(function (f) {
        const fc_1 = Zmap.force(f, fclassM, "reqdTyparsFor", function (v) {
          return nameOfVal(v);
        });
        const env_1 = Zmap.force(fc_1, reqdItemsMap_1, "reqdTyparsFor", function (value) {
          return toString(value);
        });
        return env_1.reqdTypars;
      }, directCallReqdEnvs);
      const reqdTypars = fold(function (arg00_, arg10_) {
        return ZsetModule.union(arg00_, arg10_);
      }, env.reqdTypars, directCallReqdTypars);
      const changed_1 = changed ? true : !ZsetModule.equal(env.reqdTypars, reqdTypars);
      const env_2 = new ReqdItemsForDefn(reqdTypars, env.reqdItems, env.m);
      fc;
      return [changed_1, env_2];
    };

    const fixpoint = function (reqdItemsMap_2) {
      fixpoint: while (true) {
        const patternInput = ZmapModule.foldMap(CurriedLambda(closeStep)(reqdItemsMap_2), false, reqdItemsMap_2);

        if (patternInput[0]) {
          reqdItemsMap_2 = patternInput[1];
          continue fixpoint;
        } else {
          return patternInput[1];
        }
      }
    };

    return fixpoint(reqdItemsMap);
  };

  const DetermineReqdItems = __exports.DetermineReqdItems = function (tlrS, arityM, expr) {
    if (verboseTLR) {
      dprintf(printf("DetermineReqdItems------\n"));
    }

    let folder;
    const inputRecord = ExprFolder0();
    folder = new ExprFolder(function (exprF, z, expr_1) {
      return ExprEnvIntercept(tlrS, arityM, exprF, z, expr_1);
    }, inputRecord.valBindingSiteIntercept, inputRecord.nonRecBindingsIntercept, inputRecord.recBindingsIntercept, inputRecord.dtreeIntercept, inputRecord.targetIntercept, inputRecord.tmethodIntercept);
    const z_1 = state0;
    const z_2 = FoldImplFile(folder)(z_1, expr);
    const declist = reverse(z_2.revDeclist);
    const reqdItemsMap = CloseReqdTypars(z_2.fclassM, z_2.reqdItemsMap);
    const reqdItemsMap_1 = ZmapModule.remove(new BindingGroupSharingSameReqdItems(new List()), reqdItemsMap);
    const declist_1 = filter(function (arg10_) {
      return ZmapModule.memberOf(reqdItemsMap_1, arg10_);
    }, declist);
    return [reqdItemsMap_1, z_2.fclassM, declist_1, z_2.recShortCallS];
  };

  return __exports;
}({});
export class PackedReqdItems {
  constructor(ep_etps, ep_aenvs, ep_pack, ep_unpack) {
    this.ep_etps = ep_etps;
    this.ep_aenvs = ep_aenvs;
    this.ep_pack = ep_pack;
    this.ep_unpack = ep_unpack;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.PackedReqdItems",
      interfaces: ["FSharpRecord"],
      properties: {
        ep_etps: makeGeneric(List, {
          T: Typar
        }),
        ep_aenvs: makeGeneric(List, {
          T: Val
        }),
        ep_pack: makeGeneric(List, {
          T: Binding
        }),
        ep_unpack: makeGeneric(List, {
          T: Binding
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.PackedReqdItems", PackedReqdItems);
export class AbortTLR extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, AbortTLR.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.AbortTLR",
      interfaces: ["FSharpException"],
      properties: {
        Data0: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.AbortTLR", AbortTLR);
export function FlatEnvPacks(g, fclassM, topValS, declist, reqdItemsMap) {
  const fclassOf = function (f) {
    return Zmap.force(f, fclassM, "fclassM", function (v) {
      return nameOfVal(v);
    });
  };

  const packEnv = function (carrierMaps, fc) {
    if (verboseTLR) {
      dprintf(printf("\ntlr: packEnv fc=%A\n"))(fc);
    }

    const env = Zmap.force(fc, reqdItemsMap, "packEnv", function (value) {
      return toString(value);
    });

    const carrierMapFor = function (f_1) {
      return Zmap.force(fclassOf(f_1), carrierMaps, "carrierMapFor", function (value_1) {
        return toString(value_1);
      });
    };

    const valsSubEnvFor = function (f_2) {
      return ZmapModule.keys(carrierMapFor(f_2));
    };

    const vals = append(env.ReqdVals, collect_2(valsSubEnvFor, env.ReqdSubEnvs));
    const vals_1 = List_2.noRepeats(valOrder, vals);
    const vals_2 = filter($var5 => !IsMandatoryTopLevel($var5), vals_1);
    const vals_3 = filter(function (v_1) {
      return !isByrefLikeTy(g, v_1.Type);
    }, vals_2);
    const vals_4 = filter($var6 => function (value_2) {
      return !value_2;
    }(function (arg10_) {
      return ZsetModule.memberOf(topValS, arg10_);
    }($var6)), vals_3);
    const matchValue = tryFind(function (arg10__1) {
      return IsGenericValWithGenericContraints(g, arg10__1);
    }, vals_4);

    if (matchValue != null) {
      throw new AbortTLR(getValue(matchValue).Range);
    }

    const cmapPairs = map(function (v_2) {
      return [v_2, mkCompGenLocal(env.m, v_2.LogicalName, v_2.Type)[0]];
    }, vals_4);
    const cmap = ZmapModule.ofList(valOrder, cmapPairs);

    const aenvFor = function (v_3) {
      return Zmap.force(v_3, cmap, "aenvFor", function (v_4) {
        return nameOfVal(v_4);
      });
    };

    const aenvExprFor = function (v_5) {
      return exprForVal(env.m, aenvFor(v_5));
    };

    const aenvs = ZmapModule.values(cmap);
    const pack = map(function (tupledArg) {
      return mkInvisibleBind(tupledArg[1], exprForVal(env.m, tupledArg[0]));
    }, cmapPairs);
    let unpack;

    const unpackCarrier = function (tupledArg_1) {
      return mkInvisibleBind(setValHasNoArity(tupledArg_1[0]), exprForVal(env.m, tupledArg_1[1]));
    };

    const unpackSubenv = function (f_3) {
      const subCMap = carrierMapFor(f_3);
      const vaenvs = ZmapModule.toList(subCMap);
      return map(function (tupledArg_2) {
        return mkBind(new SequencePointInfoForBinding(4), tupledArg_2[1], aenvExprFor(tupledArg_2[0]));
      }, vaenvs);
    };

    unpack = append(map(unpackCarrier, ZmapModule.toList(cmap)), collect_2(unpackSubenv, env.ReqdSubEnvs));
    const carrierMaps_1 = ZmapModule.add(fc, cmap, carrierMaps);

    if (verboseTLR) {
      dprintf(printf("tlr: packEnv envVals =%s\n"))(showL(listL(function (arg00_) {
        return DebugPrint.valL(arg00_);
      }, env.ReqdVals)));
      dprintf(printf("tlr: packEnv envSubs =%s\n"))(showL(listL(function (arg00__1) {
        return DebugPrint.valL(arg00__1);
      }, env.ReqdSubEnvs)));
      dprintf(printf("tlr: packEnv vals    =%s\n"))(showL(listL(function (arg00__2) {
        return DebugPrint.valL(arg00__2);
      }, vals_4)));
      dprintf(printf("tlr: packEnv aenvs   =%s\n"))(showL(listL(function (arg00__3) {
        return DebugPrint.valL(arg00__3);
      }, aenvs)));
      dprintf(printf("tlr: packEnv pack    =%s\n"))(showL(listL(function (arg00__4) {
        return DebugPrint.bindingL(arg00__4);
      }, pack)));
      dprintf(printf("tlr: packEnv unpack  =%s\n"))(showL(listL(function (arg00__5) {
        return DebugPrint.bindingL(arg00__5);
      }, unpack)));
    }

    return [[fc, new PackedReqdItems(ZsetModule.elements(env.reqdTypars), aenvs, pack, unpack)], carrierMaps_1];
  };

  const carriedMaps = ZmapModule.empty(fclassOrder);
  const patternInput = mapFold(CurriedLambda(function (arg00) {
    return CurriedLambda(packEnv)(arg00);
  }), carriedMaps, declist, ofArray);
  const envPacks = ZmapModule.ofList(fclassOrder, patternInput[0]);
  return envPacks;
}
export function ChooseReqdItemPackings(g, fclassM, topValS, declist, reqdItemsMap) {
  if (verboseTLR) {
    dprintf(printf("ChooseReqdItemPackings------\n"));
  }

  const envPackM = FlatEnvPacks(g, fclassM, topValS, declist, reqdItemsMap);
  return envPackM;
}
export function MakeSimpleArityInfo(tps, n) {
  return new ValReprInfo(0, [ValReprInfoModule.InferTyparInfo(tps), replicate(n, ValReprInfoModule.unnamedTopArg), ValReprInfoModule.unnamedRetVal]);
}
export function CreateNewValuesForTLR(g, tlrS, arityM, fclassM, envPackM) {
  if (verboseTLR) {
    dprintf(printf("CreateNewValuesForTLR------\n"));
  }

  const createFHat = function (f) {
    const wf = Zmap.force(f, arityM, "createFHat - wf", function (v) {
      return showL(DebugPrint.valL(v));
    }) | 0;
    const fc = Zmap.force(f, fclassM, "createFHat - fc", function (v_1) {
      return nameOfVal(v_1);
    });
    const envp = Zmap.force(fc, envPackM, "CreateNewValuesForTLR - envp", function (value) {
      return toString(value);
    });
    const name = f.LogicalName;
    const m = f.Range;
    const patternInput = f.TypeScheme;
    const patternInput_1 = stripFunTy(g, patternInput[1]);
    const newTps = append(envp.ep_etps, patternInput[0]);
    let fHatTy;
    const newArgtys = append(map(function (v_2) {
      return typeOfVal(v_2);
    }, envp.ep_aenvs), patternInput_1[0]);
    fHatTy = mkLambdaTy(newTps, newArgtys, patternInput_1[1]);
    const fHatArity = MakeSimpleArityInfo(newTps, envp.ep_aenvs.length + wf);
    const fHatName = globalNng.FreshCompilerGeneratedName(name, m);
    const fHat = mkLocalNameTypeArity(f.IsCompilerGenerated, m, fHatName, fHatTy, fHatArity);
    return fHat;
  };

  const fs = ZsetModule.elements(tlrS);
  const ffHats = map(function (f_1) {
    return [f_1, createFHat(f_1)];
  }, fs);
  const fHatM = ZmapModule.ofList(valOrder, ffHats);
  return fHatM;
}
export const Pass4_RewriteAssembly = function (__exports) {
  const RewriteContext = __exports.RewriteContext = class RewriteContext {
    constructor(ccu, g, tlrS, topValS, arityM, fclassM, recShortCallS, envPackM, fHatM) {
      this.ccu = ccu;
      this.g = g;
      this.tlrS = tlrS;
      this.topValS = topValS;
      this.arityM = arityM;
      this.fclassM = fclassM;
      this.recShortCallS = recShortCallS;
      this.envPackM = envPackM;
      this.fHatM = fHatM;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Pass4_RewriteAssembly.RewriteContext",
        interfaces: ["FSharpRecord"],
        properties: {
          ccu: CcuThunk,
          g: TcGlobals,
          tlrS: makeGeneric(_Set, {
            T: Val,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          topValS: makeGeneric(_Set, {
            T: Val,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          arityM: makeGeneric(_Map, {
            Key: Val,
            Value: "number",
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          fclassM: makeGeneric(_Map, {
            Key: Val,
            Value: BindingGroupSharingSameReqdItems,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          recShortCallS: makeGeneric(_Set, {
            T: Val,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          envPackM: makeGeneric(_Map, {
            Key: BindingGroupSharingSameReqdItems,
            Value: PackedReqdItems,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          fHatM: makeGeneric(_Map, {
            Key: Val,
            Value: Val,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          })
        }
      };
    }

  };
  setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Pass4_RewriteAssembly.RewriteContext", RewriteContext);
  const IsRecursive = __exports.IsRecursive = class IsRecursive {
    constructor(tag) {
      this.tag = tag | 0;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Pass4_RewriteAssembly.IsRecursive",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["IsRec"], ["NotRec"]]
      };
    }

    Equals(other) {
      return this.tag === other.tag;
    }

    CompareTo(other) {
      return comparePrimitives(this.tag, other.tag);
    }

  };
  setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Pass4_RewriteAssembly.IsRecursive", IsRecursive);
  const RewriteState = __exports.RewriteState = class RewriteState {
    constructor(rws_mustinline, rws_innerLevel, rws_preDecs) {
      this.rws_mustinline = rws_mustinline;
      this.rws_innerLevel = rws_innerLevel | 0;
      this.rws_preDecs = rws_preDecs;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Pass4_RewriteAssembly.RewriteState",
        interfaces: ["FSharpRecord"],
        properties: {
          rws_mustinline: "boolean",
          rws_innerLevel: "number",
          rws_preDecs: makeGeneric(Tree, {
            T: Tuple([IsRecursive, makeGeneric(List, {
              T: Binding
            })])
          })
        }
      };
    }

  };
  setType("Microsoft.FSharp.Compiler.InnerLambdasToTopLevelFuncs.Pass4_RewriteAssembly.RewriteState", RewriteState);
  const rewriteState0 = __exports.rewriteState0 = new RewriteState(false, 0, emptyTR());

  const EnterInner = __exports.EnterInner = function (z) {
    const rws_innerLevel = z.rws_innerLevel + 1 | 0;
    return new RewriteState(z.rws_mustinline, rws_innerLevel, z.rws_preDecs);
  };

  const ExitInner = __exports.ExitInner = function (z) {
    const rws_innerLevel = z.rws_innerLevel - 1 | 0;
    return new RewriteState(z.rws_mustinline, rws_innerLevel, z.rws_preDecs);
  };

  const EnterMustInline = __exports.EnterMustInline = function (b, z, f) {
    const patternInput = f(b ? new RewriteState(true, z.rws_innerLevel, z.rws_preDecs) : z);
    return [new RewriteState(z.rws_mustinline, patternInput[1].rws_innerLevel, patternInput[1].rws_preDecs), patternInput[0]];
  };

  const ExtractPreDecs = __exports.ExtractPreDecs = function (z) {
    var rws_preDecs;

    if (z.rws_innerLevel === 0) {
      const preDecs = fringeTR(z.rws_preDecs);
      return [preDecs, (rws_preDecs = emptyTR(), new RewriteState(z.rws_mustinline, z.rws_innerLevel, rws_preDecs))];
    } else {
      return [new List(), z];
    }
  };

  const PopPreDecs = __exports.PopPreDecs = function (z) {
    var rws_preDecs;
    return [(rws_preDecs = emptyTR(), new RewriteState(z.rws_mustinline, z.rws_innerLevel, rws_preDecs)), z.rws_preDecs];
  };

  const SetPreDecs = __exports.SetPreDecs = function (z, pdt) {
    return new RewriteState(z.rws_mustinline, z.rws_innerLevel, pdt);
  };

  const LiftTopBinds = __exports.LiftTopBinds = function (_isRec, _penv, z, binds) {
    return [z, binds];
  };

  const MakePreDec = __exports.MakePreDec = function (m, isRec, binds, expr) {
    if (isRec.Equals(new IsRecursive(0))) {
      const patternInput = partition(function (bind) {
        return bind.Var.IsCompiledAsTopLevel;
      }, binds);
      return mkLetRecBinds(m, patternInput[0], mkLetRecBinds(m, patternInput[1], expr));
    } else {
      return mkLetsFromBindings(m, binds, expr);
    }
  };

  const MakePreDecs = __exports.MakePreDecs = function (m, preDecs, expr) {
    return foldBack(function (tupledArg, expr_1) {
      return MakePreDec(m, tupledArg[0], tupledArg[1], expr_1);
    }, preDecs, expr);
  };

  const RecursivePreDecs = __exports.RecursivePreDecs = function (pdsA, pdsB) {
    const pds = fringeTR(new Tree(0, ofArray([pdsA, pdsB])));
    const decs = collect_2(function (tuple) {
      return tuple[1];
    }, pds);
    return new Tree(1, [new IsRecursive(0), decs]);
  };

  const ConvertBind = __exports.ConvertBind = function (g, _arg1) {
    const matchValue = _arg1.data[0].ValReprInfo;

    if (matchValue != null) {} else {
      _arg1.data[0].SetValReprInfo(InferArityOfExprBinding(g, new AllowTypeDirectedDetupling(0), _arg1.data[0], _arg1.data[1]));
    }

    return _arg1;
  };

  const TransTLRBindings = __exports.TransTLRBindings = function (penv, binds) {
    if (binds.tail == null) {
      return [new List(), new List()];
    } else {
      const fc = new BindingGroupSharingSameReqdItems(binds);
      const envp = Zmap.force(fc, penv.envPackM, "TransTLRBindings", function (value) {
        return toString(value);
      });

      const fRebinding = function (_arg1) {
        const m = _arg1.data[0].Range;
        const patternInput = stripTopLambda(_arg1.data[1], _arg1.data[0].Type);
        const aenvExprs = map(function (arg10_) {
          return exprForVal(m, arg10_);
        }, envp.ep_aenvs);
        const vsExprs = map(function (arg20_) {
          return mkRefTupledVars(penv.g, m, arg20_);
        }, patternInput[1]);
        const fHat = Zmap.force(_arg1.data[0], penv.fHatM, "fRebinding", function (v) {
          return nameOfVal(v);
        });
        const fOrig = setValHasNoArity(_arg1.data[0]);
        const fBind = mkMultiLambdaBind(fOrig, _arg1.data[2], m, patternInput[0], patternInput[1], mkApps(penv.g, [exprForVal(m, fHat), fHat.Type], ofArray([map(function (tp) {
          return mkTyparTy(tp);
        }, append(envp.ep_etps, patternInput[0]))]), append(aenvExprs, vsExprs), m), patternInput[3]);
        return fBind;
      };

      const fHatNewBinding = function (shortRecBinds, _arg2) {
        const wf = Zmap.force(_arg2.data[0], penv.arityM, "fHatNewBinding - arityM", function (v_1) {
          return nameOfVal(v_1);
        }) | 0;
        const fHat_1 = Zmap.force(_arg2.data[0], penv.fHatM, "fHatNewBinding - fHatM", function (v_2) {
          return nameOfVal(v_2);
        });
        const patternInput_1 = stripTopLambda(_arg2.data[1], _arg2.data[0].Type);
        const patternInput_2 = List_1.chop(wf, patternInput_1[1]);
        const patternInput_3 = mkMultiLambdasCore(Expr_get_Range.bind(patternInput_1[2])(), patternInput_2[1], patternInput_1[2], patternInput_1[3]);
        const m_1 = fHat_1.Range;
        const fHat_tps = append(envp.ep_etps, patternInput_1[0]);
        const fHat_args = append(map(function (value_1) {
          return singleton_1(value_1);
        }, envp.ep_aenvs), patternInput_2[0]);
        const fHat_body = mkLetsFromBindings(m_1, envp.ep_unpack, patternInput_3[0]);
        const fHat_body_1 = mkLetsFromBindings(m_1, shortRecBinds, fHat_body);
        const fHatBind = mkMultiLambdaBind(fHat_1, _arg2.data[2], m_1, fHat_tps, fHat_args, fHat_body_1, patternInput_3[1]);
        return fHatBind;
      };

      const rebinds = function (list) {
        return map(fRebinding, list);
      }(binds);

      const shortRecBinds_1 = filter(function (b) {
        return penv.recShortCallS.Contains_0(b.Var);
      }, rebinds);
      const newBinds = map(CurriedLambda(fHatNewBinding)(shortRecBinds_1), binds);
      return [newBinds, rebinds];
    }
  };

  const GetAEnvBindings = __exports.GetAEnvBindings = function (penv, fc) {
    const matchValue = ZmapModule.tryFind(fc, penv.envPackM);

    if (matchValue != null) {
      return getValue(matchValue).ep_pack;
    } else {
      return new List();
    }
  };

  const TransBindings = __exports.TransBindings = function (xisRec, penv, binds) {
    const patternInput = partition(function (b) {
      return ZsetModule.contains(b.Var, penv.tlrS);
    }, binds);
    const fclass = new BindingGroupSharingSameReqdItems(patternInput[0]);
    const patternInput_1 = TransTLRBindings(penv, patternInput[0]);
    const aenvBinds = GetAEnvBindings(penv, fclass);

    const forceTopBindToHaveArity = function (bind) {
      if (penv.topValS.Contains_0(bind.Var)) {
        return ConvertBind(penv.g, bind);
      } else {
        return bind;
      }
    };

    const nonTlrBs = function (list) {
      return map(forceTopBindToHaveArity, list);
    }(patternInput[1]);

    const tlrRebinds = function (list_1) {
      return map(forceTopBindToHaveArity, list_1);
    }(patternInput_1[1]);

    const patternInput_2 = xisRec.tag === 1 ? [append(aenvBinds, patternInput_1[0]), append(tlrRebinds, nonTlrBs)] : [append(patternInput_1[0], append(tlrRebinds, append(nonTlrBs, aenvBinds))), new List()];
    return [patternInput_2[0], patternInput_2[1]];
  };

  const TransApp = __exports.TransApp = function (penv, fx, fty, tys, args, m) {
    var wf;
    const $var7 = fx.tag === 1 ? (ZsetModule.contains(fx.data[0].Deref, penv.tlrS) ? (wf = Zmap.force(fx.data[0].Deref, penv.arityM, "TransApp - wf", function (v_2) {
      return nameOfVal(v_2);
    }) | 0, IsArityMet(fx.data[0], wf, tys, args)) : false) ? [0, fx.data[0], fx.data[2]] : [1] : [1];

    switch ($var7[0]) {
      case 0:
        const f = $var7[1].Deref;
        const fc = Zmap.force(f, penv.fclassM, "TransApp - fc", function (v) {
          return nameOfVal(v);
        });
        const envp = Zmap.force(fc, penv.envPackM, "TransApp - envp", function (value) {
          return toString(value);
        });
        const fHat = Zmap.force(f, penv.fHatM, "TransApp - fHat", function (v_1) {
          return nameOfVal(v_1);
        });
        const tys_1 = append(map(function (tp) {
          return mkTyparTy(tp);
        }, envp.ep_etps), tys);
        const aenvExprs = map(function (arg10_) {
          return exprForVal($var7[2], arg10_);
        }, envp.ep_aenvs);
        const args_1 = append(aenvExprs, args);
        return mkApps(penv.g, [exprForVal($var7[2], fHat), fHat.Type], ofArray([tys_1]), args_1, $var7[2]);

      case 1:
        if (tys.tail == null ? args.tail == null : false) {
          return fx;
        } else {
          return new Expr(5, [fx, fty, tys, args, m]);
        }

    }
  };

  const TransExpr = __exports.TransExpr = function (penv, z, expr) {
    TransExpr: while (true) {
      const $var8 = expr.tag === 7 ? [0] : expr.tag === 2 ? [0] : expr.tag === 5 ? [1, expr.data[3], expr.data[0], expr.data[1], expr.data[4], expr.data[2]] : expr.tag === 1 ? [2, expr.data[2], expr.data[0]] : expr.tag === 14 ? [3, expr.data] : expr.tag === 8 ? [4, expr.data[3], expr.data[2], expr.data[5], expr.data[6], expr.data[4], expr.data[1]] : expr.tag === 3 ? [5, expr.data[3], expr.data[2], expr.data[4], expr.data[1], expr.data[5], expr.data[6]] : expr.tag === 4 ? [6, expr.data[1], expr.data[2], expr.data[3], expr.data[4]] : expr.tag === 9 ? [7, expr.data[2], expr.data[1], expr.data[4], expr.data[0], expr.data[3], expr.data[5]] : expr.tag === 0 ? [8] : expr.tag === 12 ? expr.data[1].contents == null ? [10, expr.data[0], expr.data[2], expr.data[3], expr.data[4]] : [9, expr.data[0], getValue(expr.data[1].contents)[2], getValue(expr.data[1].contents)[1], getValue(expr.data[1].contents)[3], expr.data[2], expr.data[3], expr.data[4], getValue(expr.data[1].contents)[0]] : expr.tag === 11 ? [11, expr.data[2], expr.data[0], expr.data[3], expr.data[1]] : expr.tag === 10 ? [12, expr.data[0], expr.data[1], expr.data[2], expr.data[3]] : expr.tag === 13 ? [13, expr.data[2]] : [0];

      switch ($var8[0]) {
        case 0:
          return TransLinearExpr(penv, z, expr, function (res) {
            return res;
          });

        case 1:
          const patternInput = TransExpr(penv, z, $var8[2]);
          const patternInput_1 = mapFold(function (z_1, expr_1) {
            return TransExpr(penv, z_1, expr_1);
          }, patternInput[1], $var8[1], ofArray);
          const patternInput_2 = destApp(patternInput[0], $var8[3], $var8[5], patternInput_1[0], $var8[4]);
          const expr_2 = TransApp(penv, patternInput_2[0], patternInput_2[1], patternInput_2[2], patternInput_2[3], patternInput_2[4]);
          return [expr_2, patternInput_1[1]];

        case 2:
          const patternInput_3 = [expr, $var8[2].Type];
          const expr_3 = TransApp(penv, patternInput_3[0], patternInput_3[1], new List(), new List(), $var8[1]);
          return [expr_3, z];

        case 3:
          penv = penv;
          z = z;
          expr = $var8[1].contents;
          continue TransExpr;

        case 4:
          const patternInput_4 = TransExpr(penv, z, $var8[1]);
          const patternInput_5 = mapFold(function (z_2, arg20_) {
            return TransMethod(penv, z_2, arg20_);
          }, patternInput_4[1], $var8[5], ofArray);
          const patternInput_7 = mapFold(function (z_3, tupledArg) {
            const patternInput_6 = mapFold(function (z_4, arg20__1) {
              return TransMethod(penv, z_4, arg20__1);
            }, z_3, tupledArg[1], ofArray);
            return [[tupledArg[0], patternInput_6[0]], patternInput_6[1]];
          }, patternInput_5[1], $var8[3], ofArray);
          const expr_4 = new Expr(8, [newUnique(), $var8[6], $var8[2], patternInput_4[0], patternInput_5[0], patternInput_7[0], $var8[4]]);
          const patternInput_8 = ExtractPreDecs(patternInput_7[1]);
          return [MakePreDecs($var8[4], patternInput_8[0], expr_4), patternInput_8[1]];

        case 5:
          const z_5 = EnterInner(z);
          const patternInput_9 = TransExpr(penv, z_5, $var8[3]);
          const z_6 = ExitInner(patternInput_9[1]);
          const patternInput_10 = ExtractPreDecs(z_6);
          return [MakePreDecs($var8[5], patternInput_10[0], rebuildLambda($var8[5], $var8[4], $var8[2], $var8[1], patternInput_9[0], $var8[6])), patternInput_10[1]];

        case 6:
          const z_7 = EnterInner(z);
          const patternInput_11 = TransExpr(penv, z_7, $var8[2]);
          const z_8 = ExitInner(patternInput_11[1]);
          const patternInput_12 = ExtractPreDecs(z_8);
          return [MakePreDecs($var8[3], patternInput_12[0], mkTypeLambda($var8[3], $var8[1], patternInput_11[0], $var8[4])), patternInput_12[1]];

        case 7:
          const targets = toList($var8[5]);
          const patternInput_13 = TransDecisionTree(penv, z, $var8[1]);
          const patternInput_14 = mapFold(function (z_9, arg20__2) {
            return TransDecisionTreeTarget(penv, z_9, arg20__2);
          }, patternInput_13[1], targets, ofArray);
          const patternInput_15 = ExtractPreDecs(patternInput_14[1]);
          return [MakePreDecs($var8[3], patternInput_15[0], mkAndSimplifyMatch($var8[4], $var8[2], $var8[3], $var8[6], patternInput_13[0], patternInput_14[0])), patternInput_15[1]];

        case 8:
          return [expr, z];

        case 9:
          const patternInput_16 = mapFold(function (z_10, expr_5) {
            return TransExpr(penv, z_10, expr_5);
          }, z, $var8[2], ofArray);
          return [new Expr(12, [$var8[1], {
            contents: [$var8[8], $var8[3], patternInput_16[0], $var8[4]]
          }, $var8[5], $var8[6], $var8[7]]), patternInput_16[1]];

        case 10:
          return [new Expr(12, [$var8[1], {
            contents: null
          }, $var8[2], $var8[3], $var8[4]]), z];

        case 11:
          const patternInput_17 = mapFold(function (z_11, expr_6) {
            return TransExpr(penv, z_11, expr_6);
          }, z, $var8[1], ofArray);
          return [new Expr(11, [$var8[2], $var8[4], patternInput_17[0], $var8[3]]), patternInput_17[1]];

        case 12:
          const patternInput_18 = TransExpr(penv, z, $var8[2]);
          const patternInput_19 = TransExpr(penv, patternInput_18[1], $var8[3]);
          return [new Expr(10, [$var8[1], patternInput_18[0], patternInput_19[0], $var8[4]]), patternInput_19[1]];

        case 13:
          return error(new _Error(SR.tlrUnexpectedTExpr(), $var8[1]));
      }
    }
  };

  const TransLinearExpr = __exports.TransLinearExpr = function ($var25, $var26, $var27, $var28) {
    TransLinearExpr: while (true) {
      const penv = $var25;
      const z = $var26;
      const expr = $var27;
      const contf = $var28;

      if (expr.tag === 2) {
        const patternInput = TransExpr(penv, z, expr.data[0]);
        $var25 = penv;
        $var26 = patternInput[1];
        $var27 = expr.data[1];

        $var28 = $var9 => contf(function (tupledArg) {
          return [new Expr(2, [patternInput[0], tupledArg[0], expr.data[2], expr.data[3], expr.data[4]]), tupledArg[1]];
        }($var9));

        continue TransLinearExpr;
      } else if (expr.tag === 6) {
        const z_1 = EnterInner(z);
        const patternInput_1 = PopPreDecs(z_1);
        const patternInput_2 = mapFold(function (z_2, arg20_) {
          return TransBindingRhs(penv, z_2, arg20_);
        }, patternInput_1[0], expr.data[0], ofArray);
        const patternInput_3 = PopPreDecs(patternInput_2[1]);
        const patternInput_4 = TransBindings(new IsRecursive(0), penv, patternInput_2[0]);
        const patternInput_5 = LiftTopBinds(new IsRecursive(0), penv, patternInput_3[0], patternInput_4[0]);
        const patternInput_6 = LiftTopBinds(new IsRecursive(0), penv, patternInput_5[0], patternInput_4[1]);
        const patternInput_7 = PopPreDecs(patternInput_6[0]);
        const z_3 = SetPreDecs(patternInput_7[0], new Tree(0, ofArray([patternInput_1[1], RecursivePreDecs(patternInput_7[1], patternInput_3[1])])));
        const z_4 = ExitInner(z_3);
        const patternInput_8 = ExtractPreDecs(z_4);
        $var25 = penv;
        $var26 = patternInput_8[1];
        $var27 = expr.data[1];

        $var28 = $var10 => contf(function (tupledArg_1) {
          const e = mkLetsFromBindings(expr.data[2], patternInput_6[1], tupledArg_1[0]);
          return [MakePreDecs(expr.data[2], patternInput_8[0], new Expr(6, [patternInput_5[1], e, expr.data[2], NewFreeVarsCache()])), tupledArg_1[1]];
        }($var10));

        continue TransLinearExpr;
      } else if (expr.tag === 7) {
        const patternInput_9 = TransBindingRhs(penv, z, expr.data[0]);
        const patternInput_10 = TransBindings(new IsRecursive(1), penv, ofArray([patternInput_9[0]]));
        const patternInput_11 = LiftTopBinds(new IsRecursive(1), penv, patternInput_9[1], patternInput_10[0]);
        const patternInput_12 = LiftTopBinds(new IsRecursive(1), penv, patternInput_11[0], patternInput_10[1]);
        const patternInput_13 = ExtractPreDecs(patternInput_12[0]);
        $var25 = penv;
        $var26 = patternInput_13[1];
        $var27 = expr.data[1];

        $var28 = $var11 => contf(function (tupledArg_2) {
          const e_1 = mkLetsFromBindings(expr.data[2], patternInput_12[1], tupledArg_2[0]);
          return [MakePreDecs(expr.data[2], patternInput_13[0], mkLetsFromBindings(expr.data[2], patternInput_11[1], e_1)), tupledArg_2[1]];
        }($var11));

        continue TransLinearExpr;
      } else {
        const activePatternResult45507 = _LinearMatchExpr___(expr);

        if (activePatternResult45507 != null) {
          const patternInput_14 = TransDecisionTree(penv, z, getValue(activePatternResult45507)[2]);
          const patternInput_15 = TransDecisionTreeTarget(penv, patternInput_14[1], getValue(activePatternResult45507)[3]);
          $var25 = penv;
          $var26 = patternInput_15[1];
          $var27 = getValue(activePatternResult45507)[4];

          $var28 = $var12 => contf(function (tupledArg_3) {
            return [rebuildLinearMatchExpr([getValue(activePatternResult45507)[0], getValue(activePatternResult45507)[1], patternInput_14[0], patternInput_15[0], tupledArg_3[0], getValue(activePatternResult45507)[5], getValue(activePatternResult45507)[6], getValue(activePatternResult45507)[7]]), tupledArg_3[1]];
          }($var12));

          continue TransLinearExpr;
        } else {
          return contf(TransExpr(penv, z, expr));
        }
      }
    }
  };

  const TransMethod = __exports.TransMethod = function (penv, z, _arg1) {
    const z_1 = EnterInner(z);
    const patternInput = TransExpr(penv, z_1, _arg1.data[4]);
    const z_2 = ExitInner(patternInput[1]);
    return [new ObjExprMethod(0, [_arg1.data[0], _arg1.data[1], _arg1.data[2], _arg1.data[3], patternInput[0], _arg1.data[5]]), z_2];
  };

  const TransBindingRhs = __exports.TransBindingRhs = function (penv, z, _arg2) {
    const mustInline = _arg2.data[0].MustInline;
    const patternInput = EnterMustInline(mustInline, z, function (z_1) {
      return TransExpr(penv, z_1, _arg2.data[1]);
    });
    return [new Binding(0, [_arg2.data[0], patternInput[1], _arg2.data[2]]), patternInput[0]];
  };

  const TransDecisionTree = __exports.TransDecisionTree = function (penv, z, x) {
    if (x.tag === 2) {
      const patternInput = TransBindingRhs(penv, z, x.data[0]);
      const patternInput_1 = TransDecisionTree(penv, patternInput[1], x.data[1]);
      return [new DecisionTree(2, [patternInput[0], patternInput_1[0]]), patternInput_1[1]];
    } else if (x.tag === 0) {
      const patternInput_2 = TransExpr(penv, z, x.data[0]);

      const TransDecisionTreeCase = function (penv_1, z_1, _arg4) {
        const patternInput_3 = TransDecisionTree(penv_1, z_1, _arg4.data[1]);
        return [new DecisionTreeCase(0, [_arg4.data[0], patternInput_3[0]]), patternInput_3[1]];
      };

      const patternInput_4 = mapFold(CurriedLambda(TransDecisionTreeCase)(penv), patternInput_2[1], x.data[1], ofArray);
      const patternInput_5 = Option.mapFold(function (z_2, x_1) {
        return TransDecisionTree(penv, z_2, x_1);
      }, patternInput_4[1], x.data[2]);
      return [new DecisionTree(0, [patternInput_2[0], patternInput_4[0], patternInput_5[0], x.data[3]]), patternInput_5[1]];
    } else {
      const patternInput_6 = mapFold(function (z_3, expr) {
        return TransExpr(penv, z_3, expr);
      }, z, x.data[0], ofArray);
      return [new DecisionTree(1, [patternInput_6[0], x.data[1]]), patternInput_6[1]];
    }
  };

  const TransDecisionTreeTarget = __exports.TransDecisionTreeTarget = function (penv, z, _arg3) {
    const z_1 = EnterInner(z);
    const patternInput = TransExpr(penv, z_1, _arg3.data[1]);
    const z_2 = ExitInner(patternInput[1]);
    return [new DecisionTreeTarget(0, [_arg3.data[0], patternInput[0], _arg3.data[2]]), z_2];
  };

  const TransValBinding = __exports.TransValBinding = function (penv, z, bind) {
    return TransBindingRhs(penv, z, bind);
  };

  const TransValBindings = __exports.TransValBindings = function (penv, z, binds) {
    return mapFold(function (z_1, bind) {
      return TransValBinding(penv, z_1, bind);
    }, z, binds, ofArray);
  };

  const TransModuleExpr = __exports.TransModuleExpr = function (penv, z, x) {
    const patternInput = TransModuleDef(penv, z, x.data[1]);
    return [new ModuleOrNamespaceExprWithSig(0, [x.data[0], patternInput[0], x.data[2]]), patternInput[1]];
  };

  const TransModuleDefs = __exports.TransModuleDefs = function (penv, z, x) {
    return mapFold(function (z_1, x_1) {
      return TransModuleDef(penv, z_1, x_1);
    }, z, x, ofArray);
  };

  const TransModuleDef = __exports.TransModuleDef = function (penv, z, x) {
    switch (x.tag) {
      case 2:
        const patternInput = TransValBinding(penv, z, x.data[0]);
        return [new ModuleOrNamespaceExpr(2, [patternInput[0], x.data[1]]), patternInput[1]];

      case 3:
        const patternInput_1 = TransExpr(penv, z, x.data[0]);
        return [new ModuleOrNamespaceExpr(3, [x.data[0], x.data[1]]), patternInput_1[1]];

      case 1:
        const patternInput_2 = TransModuleDefs(penv, z, x.data);
        return [new ModuleOrNamespaceExpr(1, patternInput_2[0]), patternInput_2[1]];

      case 0:
        const patternInput_3 = TransModuleExpr(penv, z, x.data);
        return [new ModuleOrNamespaceExpr(0, patternInput_3[0]), patternInput_3[1]];

      default:
        const patternInput_4 = TransModuleBindings(penv, z, x.data[2]);
        return [new ModuleOrNamespaceExpr(4, [x.data[0], x.data[1], patternInput_4[0], x.data[3]]), patternInput_4[1]];
    }
  };

  const TransModuleBindings = __exports.TransModuleBindings = function (penv, z, binds) {
    return mapFold(function (z_1, x) {
      return TransModuleBinding(penv, z_1, x);
    }, z, binds, ofArray);
  };

  const TransModuleBinding = __exports.TransModuleBinding = function (penv, z, x) {
    if (x.tag === 1) {
      const patternInput = TransModuleDef(penv, z, x.data[1]);
      return [new ModuleOrNamespaceBinding(1, [x.data[0], patternInput[0]]), patternInput[1]];
    } else {
      const patternInput_1 = TransValBinding(penv, z, x.data);
      return [new ModuleOrNamespaceBinding(0, patternInput_1[0]), patternInput_1[1]];
    }
  };

  const TransImplFile = __exports.TransImplFile = function (penv, z, _arg1) {
    const patternInput = TransModuleExpr(penv, z, _arg1.data[2]);
    return [new TypedImplFile(0, [_arg1.data[0], _arg1.data[1], patternInput[0], _arg1.data[3], _arg1.data[4]]), patternInput[1]];
  };

  return __exports;
}({});
export function RecreateUniqueBounds(g, expr) {
  return copyImplFile(g, new ValCopyFlag(2), expr);
}
export function MakeTLRDecisions(ccu, g, expr) {
  try {
    const patternInput = Pass1_DetermineTLRAndArities.DetermineTLRAndArities(g, expr);
    const patternInput_1 = Pass2_DetermineReqdItems.DetermineReqdItems(patternInput[0], patternInput[2], expr);
    const envPackM = ChooseReqdItemPackings(g, patternInput_1[1], patternInput[1], patternInput_1[2], patternInput_1[0]);
    const fHatM = CreateNewValuesForTLR(g, patternInput[0], patternInput[2], patternInput_1[1], envPackM);

    if (verboseTLR) {
      dprintf(printf("TransExpr(rw)------\n"));
    }

    let patternInput_2;
    const penv = new Pass4_RewriteAssembly.RewriteContext(ccu, g, patternInput[0], patternInput[1], patternInput[2], patternInput_1[1], patternInput_1[3], envPackM, fHatM);
    const z = Pass4_RewriteAssembly.rewriteState0;
    patternInput_2 = Pass4_RewriteAssembly.TransImplFile(penv, z, expr);

    if (verboseTLR) {
      dprintf(printf("copyExpr------\n"));
    }

    const expr_1 = RecreateUniqueBounds(g, patternInput_2[0]);

    if (verboseTLR) {
      dprintf(printf("TLR-done------\n"));
    }

    return expr_1;
  } catch (matchValue) {
    if (matchValue instanceof AbortTLR) {
      warning(new _Error(SR.tlrLambdaLiftingOptimizationsNotApplied(), matchValue.Data0));
      return expr;
    } else {
      throw matchValue;
    }
  }
}