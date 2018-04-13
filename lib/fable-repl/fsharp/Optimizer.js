import { choose, concat, mapIndexed, replicate, reverse, append as append_1, filter as filter_1, unzip, map as map_2, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { ILBasicType, ILInstr } from "../absil/il";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equals, Unit, Tuple, Function as _Function, Option, compareRecords, GenericParam, equalsRecords, Any, makeGeneric, Interface, Array as _Array, comparePrimitives } from "../fable-core/Util";
import { newUnique, TypedImplFile, ModuleOrNamespaceExprWithSig, ModuleOrNamespaceBinding, ModuleOrNamespaceExpr, MaybeLazy, ModuleOrNamespaceType, Binding, ValInline, DecisionTreeCase, tupInfoRef, ValBaseOrThisInfo, SequentialOpKind, NewFreeVarsCache, ForLoopStyle, LValueOperation, ObjExprMethod, ValReprInfoModule, DecisionTreeTarget, TOp, DecisionTree, valEq, $7C$VRefLocal$7C$VRefNonLocal$7C$ as _VRefLocal_VRefNonLocal_, mkLocalValRef, Typar, ValReprInfo, Val, CcuThunk, ValUseFlag, Expr, TType, Const, UnionCaseRef, EntityRef, ValRef } from "./tast";
import { fromValue, fromNumber } from "../fable-core/Long";
import Long from "../fable-core/Long";
import Lazy from "../fable-core/Lazy";
import { ComputeHidingInfoAtAssemblyBoundary, allValsOfModDef, valOrder, IsCompiledAsStaticProperty, freeInModuleOrNamespace, ComputeRemappingFromImplementationToSignature, generalizedTyconRef, IsCompiledAsStaticPropertyWithField, AllowTypeDirectedDetupling, InferArityOfExprBinding, accFreeInDecisionTree, mkAndSimplifyMatch, primMkApp, mkInvisibleLet, op_MinusMinusGreater, IsGenericValWithGenericContraints, isByrefLikeTy, mkTupleFieldGet, mkMemberLambdas, canUseTypeTestFast, canUseUnboxFast, mkCallGetGenericComparer, mkCallGetGenericEREqualityComparer, mkCallGetGenericPEREqualityComparer, mkRefTupledNoTypes, Mutates, mkExprAddrOfExpr, isStructTy, IsUnionTypeWithNullAsTrueValue, isUnitTy, mkCompiledTupleTyconRef, destAppTy, isAppTy, copyExpr, remarkExpr, mkWhile, mkTryWith, mkTryFinally, $7C$LinearMatchExpr$7C$_$7C$ as _LinearMatchExpr___, OptimizeForExpressionOptions, DetectAndOptimizeForExpression, freeInBindingRhs, unionFreeVars, mkFor, mkUnit, mkIncr, mkLdlen, TryFindFSharpAttribute, TryEliminateDesugaredConstants, exprForValRef, mkCoerceExpr, isArray1DTy, mkObjExpr, tryMkForallTy, mkMultiLambdaTy, NormalizeAndAdjustPossibleSubsumptionExprs, mkCallGetQuerySourceAsEnumerable, mkCallNewQuerySource, mkCallSeqDelay, mkCallSeq, mkAppTy, mkCallSeqCollect, mkCallSeqEmpty, mkCallSeqMap, mkCallSeqSingleton, tyOfExpr, mkLambda, tyconRefEq, valRefEq, isRefTupleTy, evalTupInfoIsStruct, mkLet, mkLetsBind, mkRefTupled, mkCompGenBind, mkCompGenLocal, destRefTupleTy, tryDestRefTupleExpr, isRefTupleExpr, mkLetBind, MakeApplicationAndBetaReduce, Expr$2E$get_Range as Expr_get_Range, accFreeInSwitchCases, accFreeInTargets, stripExpr, emptyFreeVars, accFreeInExprs, TryFindTyconRefBoolAttribute, isExnFieldMutable, isUnionCaseFieldMutable, isExnAllocObservable, isRecdOrUnionOrStructTyconRefAllocObservable, mkRepackageRemapping, remapValRef, remapPossibleForallTy, ValCopyFlag, remapExpr, remapUnionCaseRef, remapTyconRef, CollectTyparsAndLocals, CollectLocals, CollectTypars, freeInType, freeTyvarsAllPublic, freeInVal, freeVarsAllPublic, CollectAll, freeInExpr, typeEquiv, fullDisplayTextOfValRef, PrettyTypes, Remap, tryRescopeVal, ValMap, ValHash } from "./TastOps";
import { add, tryFind, tryGetValue, create } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { iterate, mapFold, tryFind as tryFind_1, zip, map2, item, foldBack, pick, mapIndexed2, toList, forAll, exists, sumBy, iterate2, fold, singleton, append, collect, delay, filter, map } from "../fable-core/Seq";
import { map as map_1 } from "../fable-core/Array";
import CurriedLambda from "../fable-core/CurriedLambda";
import { defaultArg, getValue } from "../fable-core/Option";
import { TcGlobals } from "./TcGlobals";
import { range0, range } from "./range";
import { ImportMap } from "./import";
import { SequencePointInfoForSeq, ident, Ident } from "./ast";
import { Set as _Set } from "../utils/TaggedCollections";
import { ZsetModule } from "../absil/zset";
import { map3Of4, newCache, Int64 } from "./lib";
import { Map$60$2$2E$MarkAsCollapsible as Map_2_MarkAsCollapsible, List as List_1, Lazy as Lazy_1, NameMapModule, notlazy, Map$60$2$2E$get_Empty$2E$Static as Map_2_get_Empty_Static } from "../absil/illib";
import { ReportedError, errorRecovery, warning, InternalError, error, Error as _Error, errorR } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import Comparer from "../fable-core/Comparer";
import { IteratedAdjustArityOfLambda, ChooseTyparSolutionsForFreeChoiceTypars } from "./TypeRelations";
import { CodegenWitnessThatTypSupportsTraitConstraint } from "./ConstraintSolver";
import { IsSecurityCriticalAttribute, IsSecurityAttribute } from "./TypeChecker";
import { printf, toConsole } from "../fable-core/String";
import { ExistsSameHeadTypeInHierarchy } from "./infos";
import { QueueListModule } from "./QueueList";
import Choice from "../fable-core/Choice";
import { u_lazy, u_namemap, u_bool, u_tcref, u_expr, u_int, u_ucref, u_array, u_vref, u_typ, u_const, u_byte, p_lazy, p_namemap, p_bool, p_const, p_tcref, p_typ, p_expr, p_int, p_ucref, p_array, p_vref, p_byte } from "./TastPickle";
export const i_ldlen = ofArray([new ILInstr(84), new ILInstr(11, new ILBasicType(5))]);
export class TypeValueInfo {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.TypeValueInfo",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["UnknownTypeValue"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Optimizer.TypeValueInfo", TypeValueInfo);
export class ExprValueInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.ExprValueInfo",
      interfaces: ["FSharpUnion"],
      cases: [["UnknownValue"], ["SizeValue", "number", ExprValueInfo], ["ValValue", ValRef, ExprValueInfo], ["TupleValue", _Array(ExprValueInfo)], ["RecdValue", EntityRef, _Array(ExprValueInfo)], ["UnionCaseValue", UnionCaseRef, _Array(ExprValueInfo)], ["ConstValue", Const, TType], ["CurriedLambdaValue", Long, "number", "number", Expr, TType], ["ConstExprValue", "number", Expr]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Optimizer.ExprValueInfo", ExprValueInfo);
export class ValInfo {
  constructor(valMakesNoCriticalTailcalls, valExprInfo) {
    this.ValMakesNoCriticalTailcalls = valMakesNoCriticalTailcalls;
    this.ValExprInfo = valExprInfo;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.ValInfo",
      interfaces: ["FSharpRecord"],
      properties: {
        ValMakesNoCriticalTailcalls: "boolean",
        ValExprInfo: ExprValueInfo
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Optimizer.ValInfo", ValInfo);
export class ValInfos {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.ValInfos",
      properties: {
        Entries: Interface("System.Collections.Generic.IEnumerable")
      }
    };
  }

  constructor(entries) {
    this.valInfoTable = new Lazy(() => {
      const t = ValHash.Create();

      for (let forLoopVar of entries) {
        t.Add(forLoopVar[0].Deref, [forLoopVar[0], forLoopVar[1]]);
      }

      return t;
    });
    this.valInfosForFslib = new Lazy(() => {
      const dict = create();

      for (let p of entries) {
        dict.set(p[0].Deref.LinkagePartialKey, p);
      }

      return dict;
    });
  }

  get Entries() {
    return this.valInfoTable.value.Values;
  }

  Map(f) {
    return new ValInfos(map(f, this.Entries));
  }

  Filter(f) {
    return new ValInfos(filter(f, this.Entries));
  }

  TryFind(v) {
    return this.valInfoTable.value.TryFind(v.Deref);
  }

  TryFindForFslib(v) {
    return tryGetValue(this.valInfosForFslib.value, v.Deref.LinkagePartialKey, null);
  }

}
setType("Microsoft.FSharp.Compiler.Optimizer.ValInfos", ValInfos);
export class ModuleInfo {
  constructor(valInfos, moduleOrNamespaceInfos) {
    this.ValInfos = valInfos;
    this.ModuleOrNamespaceInfos = moduleOrNamespaceInfos;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.ModuleInfo",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        ValInfos: ValInfos,
        ModuleOrNamespaceInfos: makeGeneric(_Map, {
          Key: "string",
          Value: Any
        })
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Optimizer.ModuleInfo", ModuleInfo);
export class Summary {
  constructor(info, functionSize, totalSize, hasEffect, mightMakeCriticalTailcall) {
    this.Info = info;
    this.FunctionSize = functionSize | 0;
    this.TotalSize = totalSize | 0;
    this.HasEffect = hasEffect;
    this.MightMakeCriticalTailcall = mightMakeCriticalTailcall;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.Summary",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Info: GenericParam("Info"),
        FunctionSize: "number",
        TotalSize: "number",
        HasEffect: "boolean",
        MightMakeCriticalTailcall: "boolean"
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
setType("Microsoft.FSharp.Compiler.Optimizer.Summary", Summary);
export function SizeOfValueInfos(arr) {
  if (arr.length <= 0) {
    return 0;
  } else if (0 > SizeOfValueInfo(arr[0])) {
    return 0;
  } else {
    return SizeOfValueInfo(arr[0]) | 0;
  }
}
export function SizeOfValueInfo(x) {
  const $var1 = x.tag === 6 ? [1] : x.tag === 0 ? [2] : x.tag === 2 ? [3] : x.tag === 3 ? [4, x.data] : x.tag === 4 ? [4, x.data[1]] : x.tag === 5 ? [4, x.data[1]] : x.tag === 7 ? [5] : x.tag === 8 ? [6] : [0];

  switch ($var1[0]) {
    case 0:
      return x.data[0] | 0;

    case 1:
      return 1;

    case 2:
      return 1;

    case 3:
      return SizeOfValueInfo(x.data[1]) + 1 | 0;

    case 4:
      return 1 + SizeOfValueInfos($var1[1]) | 0;

    case 5:
      return 1;

    case 6:
      return 1;
  }
}
export function MakeValueInfoWithCachedSize(vdepth, v) {
  MakeValueInfoWithCachedSize: while (true) {
    if (v.tag === 1) {
      vdepth = vdepth;
      v = v.data[1];
      continue MakeValueInfoWithCachedSize;
    } else if (vdepth > 5) {
      return new ExprValueInfo(1, [vdepth, v]);
    } else {
      return v;
    }
  }
}
export function MakeSizedValueInfo(v) {
  const vdepth = SizeOfValueInfo(v) | 0;
  return MakeValueInfoWithCachedSize(vdepth, v);
}
export function BoundValueInfoBySize(vinfo) {
  const bound = function (depth, x) {
    if (depth < 0) {
      return new ExprValueInfo(0);
    } else {
      switch (x.tag) {
        case 2:
          return new ExprValueInfo(2, [x.data[0], bound(depth - 1, x.data[1])]);

        case 3:
          return new ExprValueInfo(3, map_1(CurriedLambda(bound)(depth - 1), x.data, Array));

        case 4:
          return new ExprValueInfo(4, [x.data[0], map_1(CurriedLambda(bound)(depth - 1), x.data[1], Array)]);

        case 5:
          return new ExprValueInfo(5, [x.data[0], map_1(CurriedLambda(bound)(depth - 1), x.data[1], Array)]);

        case 6:
          return x;

        case 0:
          return x;

        case 7:
          return x;

        case 8:
          return x;

        default:
          if (x.data[0] < depth) {
            return x;
          } else {
            return MakeSizedValueInfo(bound(depth, x.data[1]));
          }

      }
    }
  };

  const vdepth = SizeOfValueInfo(vinfo) | 0;

  if (vdepth > 6) {
    return MakeSizedValueInfo(bound(3, vinfo));
  } else {
    return MakeValueInfoWithCachedSize(vdepth, vinfo);
  }
}
export class OptimizationSettings {
  constructor(abstractBigTargets, jitOptUser, localOptUser, crossModuleOptUser, bigTargetSize, veryBigExprSize, lambdaInlineThreshold, reportingPhase, reportNoNeedToTailcall, reportFunctionSizes, reportHasEffect, reportTotalSizes) {
    this.abstractBigTargets = abstractBigTargets;
    this.jitOptUser = jitOptUser;
    this.localOptUser = localOptUser;
    this.crossModuleOptUser = crossModuleOptUser;
    this.bigTargetSize = bigTargetSize | 0;
    this.veryBigExprSize = veryBigExprSize | 0;
    this.lambdaInlineThreshold = lambdaInlineThreshold | 0;
    this.reportingPhase = reportingPhase;
    this.reportNoNeedToTailcall = reportNoNeedToTailcall;
    this.reportFunctionSizes = reportFunctionSizes;
    this.reportHasEffect = reportHasEffect;
    this.reportTotalSizes = reportTotalSizes;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.OptimizationSettings",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        abstractBigTargets: "boolean",
        jitOptUser: Option("boolean"),
        localOptUser: Option("boolean"),
        crossModuleOptUser: Option("boolean"),
        bigTargetSize: "number",
        veryBigExprSize: "number",
        lambdaInlineThreshold: "number",
        reportingPhase: "boolean",
        reportNoNeedToTailcall: "boolean",
        reportFunctionSizes: "boolean",
        reportHasEffect: "boolean",
        reportTotalSizes: "boolean"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static get Defaults() {
    const jitOptUser = null;
    const localOptUser = null;
    return new OptimizationSettings(false, jitOptUser, localOptUser, null, 100, 3000, 6, false, false, false, false, false);
  }

  jitOpt() {
    return this.jitOptUser == null ? true : getValue(this.jitOptUser);
  }

  localOpt() {
    return this.localOptUser == null ? true : getValue(this.localOptUser);
  }

  crossModuleOpt() {
    return this.localOpt() ? this.crossModuleOptUser == null ? true : getValue(this.crossModuleOptUser) : false;
  }

  KeepOptimizationValues() {
    return this.crossModuleOpt();
  }

  InlineLambdas() {
    return this.localOpt();
  }

  EliminateUnusedBindings() {
    return this.localOpt();
  }

  EliminateTryCatchAndTryFinally() {
    return false;
  }

  EliminateSequential() {
    return this.localOpt();
  }

  EliminateSwitch() {
    return this.localOpt();
  }

  EliminateRecdFieldGet() {
    return this.localOpt();
  }

  EliminateTupleFieldGet() {
    return this.localOpt();
  }

  EliminatUnionCaseFieldGet() {
    return this.localOpt();
  }

  EliminateImmediatelyConsumedLocals() {
    return this.localOpt();
  }

  ExpandStructrualValues() {
    return this.localOpt();
  }

}
setType("Microsoft.FSharp.Compiler.Optimizer.OptimizationSettings", OptimizationSettings);
export class cenv {
  constructor(g, tcVal, amap, optimizing, scope, localInternalVals, settings, emitTailcalls, casApplied) {
    this.g = g;
    this.TcVal = tcVal;
    this.amap = amap;
    this.optimizing = optimizing;
    this.scope = scope;
    this.localInternalVals = localInternalVals;
    this.settings = settings;
    this.emitTailcalls = emitTailcalls;
    this.casApplied = casApplied;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.cenv",
      interfaces: ["FSharpRecord"],
      properties: {
        g: TcGlobals,
        TcVal: _Function([ValRef, ValUseFlag, makeGeneric(List, {
          T: TType
        }), range, Tuple([Expr, TType])]),
        amap: ImportMap,
        optimizing: "boolean",
        scope: CcuThunk,
        localInternalVals: makeGeneric(Map, {
          TKey: Long,
          TValue: ValInfo
        }),
        settings: OptimizationSettings,
        emitTailcalls: "boolean",
        casApplied: makeGeneric(Map, {
          TKey: Long,
          TValue: "boolean"
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Optimizer.cenv", cenv);
export class IncrementalOptimizationEnv {
  constructor(latestBoundId, dontInline, dontSplitVars, inLoop, functionVal, typarInfos, localExternalVals, globalModuleInfos) {
    this.latestBoundId = latestBoundId;
    this.dontInline = dontInline;
    this.dontSplitVars = dontSplitVars;
    this.inLoop = inLoop;
    this.functionVal = functionVal;
    this.typarInfos = typarInfos;
    this.localExternalVals = localExternalVals;
    this.globalModuleInfos = globalModuleInfos;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Optimizer.IncrementalOptimizationEnv",
      interfaces: ["FSharpRecord"],
      properties: {
        latestBoundId: Option(Ident),
        dontInline: makeGeneric(_Set, {
          T: Long,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        dontSplitVars: makeGeneric(ValMap, {
          T: Unit
        }),
        inLoop: "boolean",
        functionVal: Option(Tuple([Val, ValReprInfo])),
        typarInfos: makeGeneric(List, {
          T: Tuple([Typar, TypeValueInfo])
        }),
        localExternalVals: makeGeneric(_Map, {
          Key: Long,
          Value: ValInfo
        }),
        globalModuleInfos: makeGeneric(_Map, {
          Key: "string",
          Value: Any
        })
      }
    };
  }

  static get Empty() {
    const latestBoundId = null;
    const dontInline = ZsetModule.empty(Int64.order);
    const typarInfos = new List();
    const functionVal = null;
    return new IncrementalOptimizationEnv(latestBoundId, dontInline, ValMap.Empty, false, functionVal, typarInfos, Map_2_get_Empty_Static(), Map_2_get_Empty_Static());
  }

}
setType("Microsoft.FSharp.Compiler.Optimizer.IncrementalOptimizationEnv", IncrementalOptimizationEnv);
export function IsPartialExprVal(x) {
  IsPartialExprVal: while (true) {
    const $var2 = x.tag === 3 ? [1, x.data] : x.tag === 4 ? [1, x.data[1]] : x.tag === 5 ? [1, x.data[1]] : x.tag === 6 ? [2] : x.tag === 7 ? [2] : x.tag === 8 ? [2] : x.tag === 2 ? [3, x.data[1]] : x.tag === 1 ? [3, x.data[1]] : [0];

    switch ($var2[0]) {
      case 0:
        return true;

      case 1:
        return $var2[1].some(function (x_1) {
          return IsPartialExprVal(x_1);
        });

      case 2:
        return false;

      case 3:
        x = $var2[1];
        continue IsPartialExprVal;
    }
  }
}
export function CheckInlineValueIsComplete(v, res) {
  if (v.MustInline ? IsPartialExprVal(res) : false) {
    errorR(new _Error(SR.optValueMarkedInlineButIncomplete(v.DisplayName), v.Range));
  }
}
export function check(vref, res) {
  CheckInlineValueIsComplete(vref.Deref, res.ValExprInfo);
  return [vref, res];
}
export const EmptyModuleInfo = notlazy(new ModuleInfo(new ValInfos(new List()), create(null, new Comparer(comparePrimitives))));
export function UnionOptimizationInfos(minfos) {
  return notlazy(new ModuleInfo(new ValInfos(delay(function () {
    return collect(function (minfo) {
      return minfo.value.ValInfos.Entries;
    }, minfos);
  })), NameMapModule.union(function (arg00_) {
    return UnionOptimizationInfos(arg00_);
  }, map(function (m) {
    return m.value.ModuleOrNamespaceInfos;
  }, minfos))));
}
export function FindOrCreateModuleInfo(n, ss) {
  const matchValue = tryFind(n, ss);

  if (matchValue == null) {
    return EmptyModuleInfo;
  } else {
    return getValue(matchValue);
  }
}
export function FindOrCreateGlobalModuleInfo(n, ss) {
  const matchValue = tryFind(n, ss);

  if (matchValue == null) {
    return EmptyModuleInfo;
  } else {
    return getValue(matchValue);
  }
}
export function BindValueInSubModuleFSharpCore(mp, i, v, vval, ss) {
  if (i < mp.length) {
    const ModuleOrNamespaceInfos = BindValueInModuleForFslib(mp[i], mp, i + 1, v, vval, ss.ModuleOrNamespaceInfos);
    return new ModuleInfo(ss.ValInfos, ModuleOrNamespaceInfos);
  } else {
    return new ModuleInfo(new ValInfos(append(ss.ValInfos.Entries, singleton([mkLocalValRef(v), vval]))), ss.ModuleOrNamespaceInfos);
  }
}
export function BindValueInModuleForFslib(n, mp, i, v, vval, ss) {
  const old = FindOrCreateModuleInfo(n, ss);
  return add(n, notlazy(BindValueInSubModuleFSharpCore(mp, i, v, vval, old.value)), ss);
}
export function BindValueInGlobalModuleForFslib(n, mp, i, v, vval, ss) {
  const old = FindOrCreateGlobalModuleInfo(n, ss);
  return add(n, notlazy(BindValueInSubModuleFSharpCore(mp, i, v, vval, old.value)), ss);
}
export function BindValueForFslib(nlvref, v, vval, env) {
  const globalModuleInfos = BindValueInGlobalModuleForFslib(nlvref.AssemblyName, nlvref.EnclosingEntity.nlr.Path, 0, v, vval, env.globalModuleInfos);
  return new IncrementalOptimizationEnv(env.latestBoundId, env.dontInline, env.dontSplitVars, env.inLoop, env.functionVal, env.typarInfos, env.localExternalVals, globalModuleInfos);
}
export const UnknownValInfo = (() => {
  const ValExprInfo = new ExprValueInfo(0);
  return new ValInfo(false, ValExprInfo);
})();
export function mkValInfo(info, v) {
  return new ValInfo(v.MakesNoCriticalTailcalls, info.Info);
}
export function BindInternalLocalVal(cenv_1, v, vval, env) {
  const vval_1 = v.IsMutable ? UnknownValInfo : vval;

  if (vval_1.ValExprInfo.tag === 0) {
    return env;
  } else {
    cenv_1.localInternalVals.set(v.Stamp, vval_1);
    return env;
  }
}
export function BindExternalLocalVal(cenv_1, v, vval, env) {
  let vval_1;

  if (v.IsMutable) {
    const ValExprInfo = new ExprValueInfo(0);
    vval_1 = new ValInfo(vval.ValMakesNoCriticalTailcalls, ValExprInfo);
  } else {
    vval_1 = vval;
  }

  let env_1;

  if (vval_1.ValExprInfo.tag === 0) {
    env_1 = env;
  } else {
    const localExternalVals = add(v.Stamp, vval_1, env.localExternalVals);
    env_1 = new IncrementalOptimizationEnv(env.latestBoundId, env.dontInline, env.dontSplitVars, env.inLoop, env.functionVal, env.typarInfos, localExternalVals, env.globalModuleInfos);
  }

  let env_2;

  if (cenv_1.g.compilingFslib) {
    const matchValue = tryRescopeVal(cenv_1.g.fslibCcu, Remap.Empty, v);

    if (matchValue == null) {
      env_2 = env_1;
    } else {
      env_2 = BindValueForFslib(getValue(matchValue).nlr, v, vval_1, env_1);
    }
  } else {
    env_2 = env_1;
  }

  return env_2;
}
export function BindValsInModuleOrNamespace(cenv_1, mval, env) {
  const mval_1 = mval.value;
  const env_2 = NameMapModule.foldBackRange(function (mval_2, env_1) {
    return BindValsInModuleOrNamespace(cenv_1, mval_2, env_1);
  }, mval_1.ModuleOrNamespaceInfos, env);
  const env_4 = fold(function (env_3, tupledArg) {
    return BindExternalLocalVal(cenv_1, tupledArg[0].Deref, tupledArg[1], env_3);
  }, env_2, mval_1.ValInfos.Entries);
  return env_4;
}
export function BindTypeVar(tyv, typeinfo, env) {
  const typarInfos = new List([tyv, typeinfo], env.typarInfos);
  return new IncrementalOptimizationEnv(env.latestBoundId, env.dontInline, env.dontSplitVars, env.inLoop, env.functionVal, typarInfos, env.localExternalVals, env.globalModuleInfos);
}
export function BindTypeVarsToUnknown(tps, env) {
  if (tps.tail == null) {
    return env;
  } else {
    const nms = PrettyTypes.PrettyTyparNames(function (_arg1) {
      return true;
    }, map_2(function (tupledArg) {
      return tupledArg[0].Name;
    }, env.typarInfos), tps);
    iterate2(function (tp, nm) {
      if (PrettyTypes.NeedsPrettyTyparName(tp)) {
        tp.typar_id = ident(nm, tp.Range);
      }
    }, tps, nms);
    return fold(function (sofar, arg) {
      return BindTypeVar(arg, new TypeValueInfo(0), sofar);
    }, env, tps);
  }
}
export function BindCcu(ccu, mval, env, _g) {
  const globalModuleInfos = add(ccu.AssemblyName, mval, env.globalModuleInfos);
  return new IncrementalOptimizationEnv(env.latestBoundId, env.dontInline, env.dontSplitVars, env.inLoop, env.functionVal, env.typarInfos, env.localExternalVals, globalModuleInfos);
}
export function GetInfoForLocalValue(cenv_1, env, v, m) {
  if (v.IsDispatchSlot) {
    return UnknownValInfo;
  } else {
    const patternInput = tryGetValue(cenv_1.localInternalVals, v.Stamp, null);

    if (patternInput[0]) {
      return patternInput[1];
    } else {
      const matchValue = tryFind(v.Stamp, env.localExternalVals);

      if (matchValue == null) {
        if (v.MustInline) {
          errorR(new _Error(SR.optValueMarkedInlineButWasNotBoundInTheOptEnv(fullDisplayTextOfValRef(mkLocalValRef(v))), m));
        }

        return UnknownValInfo;
      } else {
        return getValue(matchValue);
      }
    }
  }
}
export function TryGetInfoForCcu(env, ccu) {
  return tryFind(ccu.AssemblyName, env.globalModuleInfos);
}
export function TryGetInfoForEntity(sv, n) {
  const matchValue = tryFind(n, sv.ModuleOrNamespaceInfos);

  if (matchValue == null) {
    return null;
  } else {
    return getValue(matchValue).value;
  }
}
export function TryGetInfoForPath(sv, p, i) {
  TryGetInfoForPath: while (true) {
    if (i >= p.length) {
      return sv;
    } else {
      const matchValue = TryGetInfoForEntity(sv, p[i]);

      if (matchValue == null) {
        return null;
      } else {
        sv = getValue(matchValue);
        p = p;
        i = i + 1;
        continue TryGetInfoForPath;
      }
    }
  }
}
export function TryGetInfoForNonLocalEntityRef(env, nleref) {
  const matchValue = TryGetInfoForCcu(env, nleref.Ccu);

  if (matchValue == null) {
    return null;
  } else {
    return TryGetInfoForPath(getValue(matchValue).value, nleref.Path, 0);
  }
}
export function GetInfoForNonLocalVal(cenv_1, env, vref) {
  if (vref.IsDispatchSlot) {
    return UnknownValInfo;
  } else if (cenv_1.settings.crossModuleOpt() ? true : vref.MustInline) {
    const matchValue = TryGetInfoForNonLocalEntityRef(env, vref.nlr.EnclosingEntity.nlr);

    if (matchValue == null) {
      return UnknownValInfo;
    } else {
      const matchValue_1 = getValue(matchValue).ValInfos.TryFind(vref);

      if (matchValue_1 == null) {
        if (cenv_1.g.compilingFslib) {
          const matchValue_2 = getValue(matchValue).ValInfos.TryFindForFslib(vref);

          if (matchValue_2[0]) {
            return matchValue_2[1][1];
          } else {
            return UnknownValInfo;
          }
        } else {
          return UnknownValInfo;
        }
      } else {
        return getValue(matchValue_1)[1];
      }
    }
  } else {
    return UnknownValInfo;
  }
}
export function GetInfoForVal(cenv_1, env, m, vref) {
  const res = vref.IsLocalRef ? GetInfoForLocalValue(cenv_1, env, vref.binding, m) : GetInfoForNonLocalVal(cenv_1, env, vref);
  check(vref, res);
  return res;
}
export function stripValue(_arg1) {
  stripValue: while (true) {
    if (_arg1.tag === 2) {
      _arg1 = _arg1.data[1];
      continue stripValue;
    } else if (_arg1.tag === 1) {
      _arg1 = _arg1.data[1];
      continue stripValue;
    } else {
      return _arg1;
    }
  }
}

function _StripConstValue___(ev) {
  const matchValue = stripValue(ev);

  if (matchValue.tag === 6) {
    return matchValue.data[0];
  } else {
    return null;
  }
}

export { _StripConstValue___ as $7C$StripConstValue$7C$_$7C$ };

function _StripLambdaValue___(ev) {
  const matchValue = stripValue(ev);

  if (matchValue.tag === 7) {
    return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3], matchValue.data[4]];
  } else {
    return null;
  }
}

export { _StripLambdaValue___ as $7C$StripLambdaValue$7C$_$7C$ };
export function destTupleValue(ev) {
  const matchValue = stripValue(ev);

  if (matchValue.tag === 3) {
    return matchValue.data;
  } else {
    return null;
  }
}
export function destRecdValue(ev) {
  const matchValue = stripValue(ev);

  if (matchValue.tag === 4) {
    return matchValue.data[1];
  } else {
    return null;
  }
}

function _StripUnionCaseValue___(ev) {
  const matchValue = stripValue(ev);

  if (matchValue.tag === 5) {
    return [matchValue.data[0], matchValue.data[1]];
  } else {
    return null;
  }
}

export { _StripUnionCaseValue___ as $7C$StripUnionCaseValue$7C$_$7C$ };
export function mkBoolVal(g, n) {
  return new ExprValueInfo(6, [new Const(0, n), g.bool_ty]);
}
export function mkInt8Val(g, n) {
  return new ExprValueInfo(6, [new Const(1, n), g.sbyte_ty]);
}
export function mkInt16Val(g, n) {
  return new ExprValueInfo(6, [new Const(3, n), g.int16_ty]);
}
export function mkInt32Val(g, n) {
  return new ExprValueInfo(6, [new Const(5, n), g.int32_ty]);
}
export function mkInt64Val(g, n) {
  return new ExprValueInfo(6, [new Const(7, n), g.int64_ty]);
}
export function mkUInt8Val(g, n) {
  return new ExprValueInfo(6, [new Const(2, n), g.byte_ty]);
}
export function mkUInt16Val(g, n) {
  return new ExprValueInfo(6, [new Const(4, n), g.uint16_ty]);
}
export function mkUInt32Val(g, n) {
  return new ExprValueInfo(6, [new Const(6, n), g.uint32_ty]);
}
export function mkUInt64Val(g, n) {
  return new ExprValueInfo(6, [new Const(8, n), g.uint64_ty]);
}

function _StripInt32Value___(_arg1) {
  let $var3;

  const activePatternResult44386 = _StripConstValue___(_arg1);

  if (activePatternResult44386 != null) {
    if (getValue(activePatternResult44386).tag === 5) {
      $var3 = [0, getValue(activePatternResult44386).data];
    } else {
      $var3 = [1];
    }
  } else {
    $var3 = [1];
  }

  switch ($var3[0]) {
    case 0:
      return $var3[1];

    case 1:
      return null;
  }
}

export { _StripInt32Value___ as $7C$StripInt32Value$7C$_$7C$ };
export function MakeValueInfoForValue(g, m, vref, vinfo) {
  g;
  m;
  return BoundValueInfoBySize(new ExprValueInfo(2, [vref, vinfo]));
}
export function MakeValueInfoForRecord(tcref, argvals) {
  return BoundValueInfoBySize(new ExprValueInfo(4, [tcref, argvals]));
}
export function MakeValueInfoForTuple(argvals) {
  return BoundValueInfoBySize(new ExprValueInfo(3, argvals));
}
export function MakeValueInfoForUnionCase(cspec, argvals) {
  return BoundValueInfoBySize(new ExprValueInfo(5, [cspec, argvals]));
}
export function MakeValueInfoForConst(c, ty) {
  return new ExprValueInfo(6, [c, ty]);
}
export function mkAssemblyCodeValueInfo(g, instrs, argvals, tys) {
  var ty_10;
  var a_26;
  var ty_9;
  var a_25;
  var ty_8;
  var a_24;
  var ty_7;
  var a_23;
  var ty_6;
  var a_22;
  var ty_5;
  var a_21;
  var ty_4;
  var a_20;
  var ty_3;
  var a_19;
  var ty_2;
  var b_2;
  var a_18;
  var ty_1;
  var b_1;
  var a_17;
  var ty;
  var b;
  var a_16;
  var n_11;
  var a_7;
  var n_10;
  var a_6;
  var n_9;
  var a_5;
  var n_8;
  var a_4;
  var n_7;
  var a_3;
  var n_6;
  var a_2;
  var n_5;
  var a_1;
  var n_4;
  var a;
  var n_15;
  var a_11;
  var n_14;
  var a_10;
  var n_13;
  var a_9;
  var n_12;
  var a_8;
  var n_19;
  var a_15;
  var n_18;
  var a_14;
  var n_17;
  var a_13;
  var n_16;
  var a_12;
  const matchValue = [instrs, argvals, tys];
  const $var4 = matchValue[0].tail != null ? matchValue[0].head.tag === 0 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [0, matchValue[1].head, matchValue[1].tail.head] : [11] : [11] : [11] : [11] : matchValue[0].head.tag === 22 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [1, matchValue[1].head, matchValue[1].tail.head] : [11] : [11] : [11] : [11] : matchValue[0].head.tag === 14 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [2, matchValue[1].head, matchValue[1].tail.head] : [11] : [11] : [11] : [11] : matchValue[0].head.tag === 3 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [3, matchValue[1].head, matchValue[1].tail.head] : [11] : [11] : [11] : [11] : matchValue[0].head.tag === 26 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [4, matchValue[1].head, matchValue[1].tail.head] : [11] : [11] : [11] : [11] : matchValue[0].head.tag === 25 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [5, matchValue[1].head, matchValue[1].tail.head] : [11] : [11] : [11] : [11] : matchValue[0].head.tag === 28 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [6, matchValue[1].head] : [11] : [11] : [11] : matchValue[0].head.tag === 27 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [7, matchValue[1].head] : [11] : [11] : [11] : matchValue[0].head.tag === 6 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [8, matchValue[1].head, matchValue[1].tail.head] : [11] : [11] : [11] : [11] : matchValue[0].head.tag === 9 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [9, matchValue[1].head, matchValue[1].tail.head] : [11] : [11] : [11] : [11] : matchValue[0].head.tag === 11 ? matchValue[0].head.data.tag === 2 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_10 = matchValue[2].head, a_26 = matchValue[1].head, typeEquiv(g, ty_10, g.byte_ty)) ? [10, matchValue[1].head, matchValue[2].head] : [11] : [11] : [11] : [11] : [11] : [11] : [11] : [11] : [11];

  switch ($var4[0]) {
    case 0:
      let matchValue_3;

      const $var5 = function (x_2, y_2) {
        return x_2 + y_2 | 0;
      };

      const matchValue_1 = [$var4[1], $var4[2]];
      let $var6;

      const activePatternResult44418 = _StripConstValue___(matchValue_1[0]);

      if (activePatternResult44418 != null) {
        const activePatternResult44419 = _StripConstValue___(matchValue_1[1]);

        if (activePatternResult44419 != null) {
          $var6 = [0, getValue(activePatternResult44418), getValue(activePatternResult44419)];
        } else {
          $var6 = [1];
        }
      } else {
        $var6 = [1];
      }

      switch ($var6[0]) {
        case 0:
          const matchValue_2 = [$var6[1], $var6[2]];
          const $var7 = matchValue_2[0].tag === 0 ? matchValue_2[1].tag === 0 ? [0, matchValue_2[0].data, matchValue_2[1].data] : [9] : matchValue_2[0].tag === 5 ? matchValue_2[1].tag === 5 ? [1, matchValue_2[0].data, matchValue_2[1].data] : [9] : matchValue_2[0].tag === 7 ? matchValue_2[1].tag === 7 ? [2, matchValue_2[0].data, matchValue_2[1].data] : [9] : matchValue_2[0].tag === 3 ? matchValue_2[1].tag === 3 ? [3, matchValue_2[0].data, matchValue_2[1].data] : [9] : matchValue_2[0].tag === 1 ? matchValue_2[1].tag === 1 ? [4, matchValue_2[0].data, matchValue_2[1].data] : [9] : matchValue_2[0].tag === 2 ? matchValue_2[1].tag === 2 ? [5, matchValue_2[0].data, matchValue_2[1].data] : [9] : matchValue_2[0].tag === 4 ? matchValue_2[1].tag === 4 ? [6, matchValue_2[0].data, matchValue_2[1].data] : [9] : matchValue_2[0].tag === 6 ? matchValue_2[1].tag === 6 ? [7, matchValue_2[0].data, matchValue_2[1].data] : [9] : matchValue_2[0].tag === 8 ? matchValue_2[1].tag === 8 ? [8, matchValue_2[0].data, matchValue_2[1].data] : [9] : [9];

          switch ($var7[0]) {
            case 0:
              matchValue_3 = mkBoolVal(g, $var5($var7[1] ? 1 : 0, $var7[2] ? 1 : 0) !== 0);
              break;

            case 1:
              matchValue_3 = mkInt32Val(g, $var5($var7[1], $var7[2]));
              break;

            case 2:
              matchValue_3 = mkInt64Val(g, function (x_3, y_3) {
                return x_3.add(y_3);
              }($var7[1], $var7[2]));
              break;

            case 3:
              matchValue_3 = mkInt16Val(g, function (x_1, y_1) {
                return x_1 + y_1;
              }($var7[1], $var7[2]));
              break;

            case 4:
              matchValue_3 = mkInt8Val(g, function (x, y) {
                return x + y;
              }($var7[1], $var7[2]));
              break;

            case 5:
              matchValue_3 = mkUInt8Val(g, function (x_4, y_4) {
                return x_4 + y_4;
              }($var7[1], $var7[2]));
              break;

            case 6:
              matchValue_3 = mkUInt16Val(g, function (x_5, y_5) {
                return x_5 + y_5;
              }($var7[1], $var7[2]));
              break;

            case 7:
              matchValue_3 = mkUInt32Val(g, function (x_6, y_6) {
                return x_6 + y_6;
              }($var7[1], $var7[2]));
              break;

            case 8:
              matchValue_3 = mkUInt64Val(g, function (x_7, y_7) {
                return x_7.add(y_7);
              }($var7[1], $var7[2]));
              break;

            case 9:
              matchValue_3 = null;
              break;
          }

          break;

        case 1:
          matchValue_3 = null;
          break;
      }

      if (matchValue_3 != null) {
        return getValue(matchValue_3);
      } else {
        return new ExprValueInfo(0);
      }

    case 1:
      let matchValue_6;

      const $var8 = function (x_10, y_10) {
        return x_10 - y_10 | 0;
      };

      const matchValue_4 = [$var4[1], $var4[2]];
      let $var9;

      const activePatternResult44418_1 = _StripConstValue___(matchValue_4[0]);

      if (activePatternResult44418_1 != null) {
        const activePatternResult44419_1 = _StripConstValue___(matchValue_4[1]);

        if (activePatternResult44419_1 != null) {
          $var9 = [0, getValue(activePatternResult44418_1), getValue(activePatternResult44419_1)];
        } else {
          $var9 = [1];
        }
      } else {
        $var9 = [1];
      }

      switch ($var9[0]) {
        case 0:
          const matchValue_5 = [$var9[1], $var9[2]];
          const $var10 = matchValue_5[0].tag === 0 ? matchValue_5[1].tag === 0 ? [0, matchValue_5[0].data, matchValue_5[1].data] : [9] : matchValue_5[0].tag === 5 ? matchValue_5[1].tag === 5 ? [1, matchValue_5[0].data, matchValue_5[1].data] : [9] : matchValue_5[0].tag === 7 ? matchValue_5[1].tag === 7 ? [2, matchValue_5[0].data, matchValue_5[1].data] : [9] : matchValue_5[0].tag === 3 ? matchValue_5[1].tag === 3 ? [3, matchValue_5[0].data, matchValue_5[1].data] : [9] : matchValue_5[0].tag === 1 ? matchValue_5[1].tag === 1 ? [4, matchValue_5[0].data, matchValue_5[1].data] : [9] : matchValue_5[0].tag === 2 ? matchValue_5[1].tag === 2 ? [5, matchValue_5[0].data, matchValue_5[1].data] : [9] : matchValue_5[0].tag === 4 ? matchValue_5[1].tag === 4 ? [6, matchValue_5[0].data, matchValue_5[1].data] : [9] : matchValue_5[0].tag === 6 ? matchValue_5[1].tag === 6 ? [7, matchValue_5[0].data, matchValue_5[1].data] : [9] : matchValue_5[0].tag === 8 ? matchValue_5[1].tag === 8 ? [8, matchValue_5[0].data, matchValue_5[1].data] : [9] : [9];

          switch ($var10[0]) {
            case 0:
              matchValue_6 = mkBoolVal(g, $var8($var10[1] ? 1 : 0, $var10[2] ? 1 : 0) !== 0);
              break;

            case 1:
              matchValue_6 = mkInt32Val(g, $var8($var10[1], $var10[2]));
              break;

            case 2:
              matchValue_6 = mkInt64Val(g, function (x_11, y_11) {
                return x_11.sub(y_11);
              }($var10[1], $var10[2]));
              break;

            case 3:
              matchValue_6 = mkInt16Val(g, function (x_9, y_9) {
                return x_9 - y_9;
              }($var10[1], $var10[2]));
              break;

            case 4:
              matchValue_6 = mkInt8Val(g, function (x_8, y_8) {
                return x_8 - y_8;
              }($var10[1], $var10[2]));
              break;

            case 5:
              matchValue_6 = mkUInt8Val(g, function (x_12, y_12) {
                return x_12 - y_12;
              }($var10[1], $var10[2]));
              break;

            case 6:
              matchValue_6 = mkUInt16Val(g, function (x_13, y_13) {
                return x_13 - y_13;
              }($var10[1], $var10[2]));
              break;

            case 7:
              matchValue_6 = mkUInt32Val(g, function (x_14, y_14) {
                return x_14 - y_14;
              }($var10[1], $var10[2]));
              break;

            case 8:
              matchValue_6 = mkUInt64Val(g, function (x_15, y_15) {
                return x_15.sub(y_15);
              }($var10[1], $var10[2]));
              break;

            case 9:
              matchValue_6 = null;
              break;
          }

          break;

        case 1:
          matchValue_6 = null;
          break;
      }

      if (matchValue_6 != null) {
        return getValue(matchValue_6);
      } else {
        return new ExprValueInfo(0);
      }

    case 2:
      let matchValue_9;

      const $var11 = function (x_18, y_18) {
        return x_18 * y_18 | 0;
      };

      const matchValue_7 = [$var4[1], $var4[2]];
      let $var12;

      const activePatternResult44418_2 = _StripConstValue___(matchValue_7[0]);

      if (activePatternResult44418_2 != null) {
        const activePatternResult44419_2 = _StripConstValue___(matchValue_7[1]);

        if (activePatternResult44419_2 != null) {
          $var12 = [0, getValue(activePatternResult44418_2), getValue(activePatternResult44419_2)];
        } else {
          $var12 = [1];
        }
      } else {
        $var12 = [1];
      }

      switch ($var12[0]) {
        case 0:
          const matchValue_8 = [$var12[1], $var12[2]];
          const $var13 = matchValue_8[0].tag === 0 ? matchValue_8[1].tag === 0 ? [0, matchValue_8[0].data, matchValue_8[1].data] : [9] : matchValue_8[0].tag === 5 ? matchValue_8[1].tag === 5 ? [1, matchValue_8[0].data, matchValue_8[1].data] : [9] : matchValue_8[0].tag === 7 ? matchValue_8[1].tag === 7 ? [2, matchValue_8[0].data, matchValue_8[1].data] : [9] : matchValue_8[0].tag === 3 ? matchValue_8[1].tag === 3 ? [3, matchValue_8[0].data, matchValue_8[1].data] : [9] : matchValue_8[0].tag === 1 ? matchValue_8[1].tag === 1 ? [4, matchValue_8[0].data, matchValue_8[1].data] : [9] : matchValue_8[0].tag === 2 ? matchValue_8[1].tag === 2 ? [5, matchValue_8[0].data, matchValue_8[1].data] : [9] : matchValue_8[0].tag === 4 ? matchValue_8[1].tag === 4 ? [6, matchValue_8[0].data, matchValue_8[1].data] : [9] : matchValue_8[0].tag === 6 ? matchValue_8[1].tag === 6 ? [7, matchValue_8[0].data, matchValue_8[1].data] : [9] : matchValue_8[0].tag === 8 ? matchValue_8[1].tag === 8 ? [8, matchValue_8[0].data, matchValue_8[1].data] : [9] : [9];

          switch ($var13[0]) {
            case 0:
              matchValue_9 = mkBoolVal(g, $var11($var13[1] ? 1 : 0, $var13[2] ? 1 : 0) !== 0);
              break;

            case 1:
              matchValue_9 = mkInt32Val(g, $var11($var13[1], $var13[2]));
              break;

            case 2:
              matchValue_9 = mkInt64Val(g, function (x_19, y_19) {
                return x_19.mul(y_19);
              }($var13[1], $var13[2]));
              break;

            case 3:
              matchValue_9 = mkInt16Val(g, function (x_17, y_17) {
                return x_17 * y_17;
              }($var13[1], $var13[2]));
              break;

            case 4:
              matchValue_9 = mkInt8Val(g, function (x_16, y_16) {
                return x_16 * y_16;
              }($var13[1], $var13[2]));
              break;

            case 5:
              matchValue_9 = mkUInt8Val(g, function (x_20, y_20) {
                return x_20 * y_20;
              }($var13[1], $var13[2]));
              break;

            case 6:
              matchValue_9 = mkUInt16Val(g, function (x_21, y_21) {
                return x_21 * y_21;
              }($var13[1], $var13[2]));
              break;

            case 7:
              matchValue_9 = mkUInt32Val(g, function (x_22, y_22) {
                return x_22 * y_22;
              }($var13[1], $var13[2]));
              break;

            case 8:
              matchValue_9 = mkUInt64Val(g, function (x_23, y_23) {
                return x_23.mul(y_23);
              }($var13[1], $var13[2]));
              break;

            case 9:
              matchValue_9 = null;
              break;
          }

          break;

        case 1:
          matchValue_9 = null;
          break;
      }

      if (matchValue_9 == null) {
        return new ExprValueInfo(0);
      } else {
        return getValue(matchValue_9);
      }

    case 3:
      let matchValue_12;

      const $var14 = function (x_26, y_26) {
        return x_26 & y_26 | 0;
      };

      const matchValue_10 = [$var4[1], $var4[2]];
      let $var15;

      const activePatternResult44418_3 = _StripConstValue___(matchValue_10[0]);

      if (activePatternResult44418_3 != null) {
        const activePatternResult44419_3 = _StripConstValue___(matchValue_10[1]);

        if (activePatternResult44419_3 != null) {
          $var15 = [0, getValue(activePatternResult44418_3), getValue(activePatternResult44419_3)];
        } else {
          $var15 = [1];
        }
      } else {
        $var15 = [1];
      }

      switch ($var15[0]) {
        case 0:
          const matchValue_11 = [$var15[1], $var15[2]];
          const $var16 = matchValue_11[0].tag === 0 ? matchValue_11[1].tag === 0 ? [0, matchValue_11[0].data, matchValue_11[1].data] : [9] : matchValue_11[0].tag === 5 ? matchValue_11[1].tag === 5 ? [1, matchValue_11[0].data, matchValue_11[1].data] : [9] : matchValue_11[0].tag === 7 ? matchValue_11[1].tag === 7 ? [2, matchValue_11[0].data, matchValue_11[1].data] : [9] : matchValue_11[0].tag === 3 ? matchValue_11[1].tag === 3 ? [3, matchValue_11[0].data, matchValue_11[1].data] : [9] : matchValue_11[0].tag === 1 ? matchValue_11[1].tag === 1 ? [4, matchValue_11[0].data, matchValue_11[1].data] : [9] : matchValue_11[0].tag === 2 ? matchValue_11[1].tag === 2 ? [5, matchValue_11[0].data, matchValue_11[1].data] : [9] : matchValue_11[0].tag === 4 ? matchValue_11[1].tag === 4 ? [6, matchValue_11[0].data, matchValue_11[1].data] : [9] : matchValue_11[0].tag === 6 ? matchValue_11[1].tag === 6 ? [7, matchValue_11[0].data, matchValue_11[1].data] : [9] : matchValue_11[0].tag === 8 ? matchValue_11[1].tag === 8 ? [8, matchValue_11[0].data, matchValue_11[1].data] : [9] : [9];

          switch ($var16[0]) {
            case 0:
              matchValue_12 = mkBoolVal(g, $var14($var16[1] ? 1 : 0, $var16[2] ? 1 : 0) !== 0);
              break;

            case 1:
              matchValue_12 = mkInt32Val(g, $var14($var16[1], $var16[2]));
              break;

            case 2:
              matchValue_12 = mkInt64Val(g, function (x_27, y_27) {
                return x_27.and(y_27);
              }($var16[1], $var16[2]));
              break;

            case 3:
              matchValue_12 = mkInt16Val(g, function (x_25, y_25) {
                return x_25 & y_25;
              }($var16[1], $var16[2]));
              break;

            case 4:
              matchValue_12 = mkInt8Val(g, function (x_24, y_24) {
                return x_24 & y_24;
              }($var16[1], $var16[2]));
              break;

            case 5:
              matchValue_12 = mkUInt8Val(g, function (x_28, y_28) {
                return x_28 & y_28;
              }($var16[1], $var16[2]));
              break;

            case 6:
              matchValue_12 = mkUInt16Val(g, function (x_29, y_29) {
                return x_29 & y_29;
              }($var16[1], $var16[2]));
              break;

            case 7:
              matchValue_12 = mkUInt32Val(g, function (x_30, y_30) {
                return x_30 & y_30;
              }($var16[1], $var16[2]));
              break;

            case 8:
              matchValue_12 = mkUInt64Val(g, function (x_31, y_31) {
                return x_31.and(y_31);
              }($var16[1], $var16[2]));
              break;

            case 9:
              matchValue_12 = null;
              break;
          }

          break;

        case 1:
          matchValue_12 = null;
          break;
      }

      if (matchValue_12 == null) {
        return new ExprValueInfo(0);
      } else {
        return getValue(matchValue_12);
      }

    case 4:
      let matchValue_15;

      const $var17 = function (x_34, y_34) {
        return x_34 | y_34 | 0;
      };

      const matchValue_13 = [$var4[1], $var4[2]];
      let $var18;

      const activePatternResult44418_4 = _StripConstValue___(matchValue_13[0]);

      if (activePatternResult44418_4 != null) {
        const activePatternResult44419_4 = _StripConstValue___(matchValue_13[1]);

        if (activePatternResult44419_4 != null) {
          $var18 = [0, getValue(activePatternResult44418_4), getValue(activePatternResult44419_4)];
        } else {
          $var18 = [1];
        }
      } else {
        $var18 = [1];
      }

      switch ($var18[0]) {
        case 0:
          const matchValue_14 = [$var18[1], $var18[2]];
          const $var19 = matchValue_14[0].tag === 0 ? matchValue_14[1].tag === 0 ? [0, matchValue_14[0].data, matchValue_14[1].data] : [9] : matchValue_14[0].tag === 5 ? matchValue_14[1].tag === 5 ? [1, matchValue_14[0].data, matchValue_14[1].data] : [9] : matchValue_14[0].tag === 7 ? matchValue_14[1].tag === 7 ? [2, matchValue_14[0].data, matchValue_14[1].data] : [9] : matchValue_14[0].tag === 3 ? matchValue_14[1].tag === 3 ? [3, matchValue_14[0].data, matchValue_14[1].data] : [9] : matchValue_14[0].tag === 1 ? matchValue_14[1].tag === 1 ? [4, matchValue_14[0].data, matchValue_14[1].data] : [9] : matchValue_14[0].tag === 2 ? matchValue_14[1].tag === 2 ? [5, matchValue_14[0].data, matchValue_14[1].data] : [9] : matchValue_14[0].tag === 4 ? matchValue_14[1].tag === 4 ? [6, matchValue_14[0].data, matchValue_14[1].data] : [9] : matchValue_14[0].tag === 6 ? matchValue_14[1].tag === 6 ? [7, matchValue_14[0].data, matchValue_14[1].data] : [9] : matchValue_14[0].tag === 8 ? matchValue_14[1].tag === 8 ? [8, matchValue_14[0].data, matchValue_14[1].data] : [9] : [9];

          switch ($var19[0]) {
            case 0:
              matchValue_15 = mkBoolVal(g, $var17($var19[1] ? 1 : 0, $var19[2] ? 1 : 0) !== 0);
              break;

            case 1:
              matchValue_15 = mkInt32Val(g, $var17($var19[1], $var19[2]));
              break;

            case 2:
              matchValue_15 = mkInt64Val(g, function (x_35, y_35) {
                return x_35.or(y_35);
              }($var19[1], $var19[2]));
              break;

            case 3:
              matchValue_15 = mkInt16Val(g, function (x_33, y_33) {
                return x_33 | y_33;
              }($var19[1], $var19[2]));
              break;

            case 4:
              matchValue_15 = mkInt8Val(g, function (x_32, y_32) {
                return x_32 | y_32;
              }($var19[1], $var19[2]));
              break;

            case 5:
              matchValue_15 = mkUInt8Val(g, function (x_36, y_36) {
                return x_36 | y_36;
              }($var19[1], $var19[2]));
              break;

            case 6:
              matchValue_15 = mkUInt16Val(g, function (x_37, y_37) {
                return x_37 | y_37;
              }($var19[1], $var19[2]));
              break;

            case 7:
              matchValue_15 = mkUInt32Val(g, function (x_38, y_38) {
                return x_38 | y_38;
              }($var19[1], $var19[2]));
              break;

            case 8:
              matchValue_15 = mkUInt64Val(g, function (x_39, y_39) {
                return x_39.or(y_39);
              }($var19[1], $var19[2]));
              break;

            case 9:
              matchValue_15 = null;
              break;
          }

          break;

        case 1:
          matchValue_15 = null;
          break;
      }

      if (matchValue_15 == null) {
        return new ExprValueInfo(0);
      } else {
        return getValue(matchValue_15);
      }

    case 5:
      let matchValue_18;

      const $var20 = function (x_42, y_42) {
        return x_42 ^ y_42 | 0;
      };

      const matchValue_16 = [$var4[1], $var4[2]];
      let $var21;

      const activePatternResult44418_5 = _StripConstValue___(matchValue_16[0]);

      if (activePatternResult44418_5 != null) {
        const activePatternResult44419_5 = _StripConstValue___(matchValue_16[1]);

        if (activePatternResult44419_5 != null) {
          $var21 = [0, getValue(activePatternResult44418_5), getValue(activePatternResult44419_5)];
        } else {
          $var21 = [1];
        }
      } else {
        $var21 = [1];
      }

      switch ($var21[0]) {
        case 0:
          const matchValue_17 = [$var21[1], $var21[2]];
          const $var22 = matchValue_17[0].tag === 0 ? matchValue_17[1].tag === 0 ? [0, matchValue_17[0].data, matchValue_17[1].data] : [9] : matchValue_17[0].tag === 5 ? matchValue_17[1].tag === 5 ? [1, matchValue_17[0].data, matchValue_17[1].data] : [9] : matchValue_17[0].tag === 7 ? matchValue_17[1].tag === 7 ? [2, matchValue_17[0].data, matchValue_17[1].data] : [9] : matchValue_17[0].tag === 3 ? matchValue_17[1].tag === 3 ? [3, matchValue_17[0].data, matchValue_17[1].data] : [9] : matchValue_17[0].tag === 1 ? matchValue_17[1].tag === 1 ? [4, matchValue_17[0].data, matchValue_17[1].data] : [9] : matchValue_17[0].tag === 2 ? matchValue_17[1].tag === 2 ? [5, matchValue_17[0].data, matchValue_17[1].data] : [9] : matchValue_17[0].tag === 4 ? matchValue_17[1].tag === 4 ? [6, matchValue_17[0].data, matchValue_17[1].data] : [9] : matchValue_17[0].tag === 6 ? matchValue_17[1].tag === 6 ? [7, matchValue_17[0].data, matchValue_17[1].data] : [9] : matchValue_17[0].tag === 8 ? matchValue_17[1].tag === 8 ? [8, matchValue_17[0].data, matchValue_17[1].data] : [9] : [9];

          switch ($var22[0]) {
            case 0:
              matchValue_18 = mkBoolVal(g, $var20($var22[1] ? 1 : 0, $var22[2] ? 1 : 0) !== 0);
              break;

            case 1:
              matchValue_18 = mkInt32Val(g, $var20($var22[1], $var22[2]));
              break;

            case 2:
              matchValue_18 = mkInt64Val(g, function (x_43, y_43) {
                return x_43.xor(y_43);
              }($var22[1], $var22[2]));
              break;

            case 3:
              matchValue_18 = mkInt16Val(g, function (x_41, y_41) {
                return x_41 ^ y_41;
              }($var22[1], $var22[2]));
              break;

            case 4:
              matchValue_18 = mkInt8Val(g, function (x_40, y_40) {
                return x_40 ^ y_40;
              }($var22[1], $var22[2]));
              break;

            case 5:
              matchValue_18 = mkUInt8Val(g, function (x_44, y_44) {
                return x_44 ^ y_44;
              }($var22[1], $var22[2]));
              break;

            case 6:
              matchValue_18 = mkUInt16Val(g, function (x_45, y_45) {
                return x_45 ^ y_45;
              }($var22[1], $var22[2]));
              break;

            case 7:
              matchValue_18 = mkUInt32Val(g, function (x_46, y_46) {
                return x_46 ^ y_46;
              }($var22[1], $var22[2]));
              break;

            case 8:
              matchValue_18 = mkUInt64Val(g, function (x_47, y_47) {
                return x_47.xor(y_47);
              }($var22[1], $var22[2]));
              break;

            case 9:
              matchValue_18 = null;
              break;
          }

          break;

        case 1:
          matchValue_18 = null;
          break;
      }

      if (matchValue_18 == null) {
        return new ExprValueInfo(0);
      } else {
        return getValue(matchValue_18);
      }

    case 6:
      let matchValue_19;

      const $var23 = function (value_2) {
        return ~value_2 | 0;
      };

      const activePatternResult44400 = _StripConstValue___($var4[1]);

      if (activePatternResult44400 != null) {
        switch (getValue(activePatternResult44400).tag) {
          case 0:
            matchValue_19 = mkBoolVal(g, $var23(getValue(activePatternResult44400).data ? 1 : 0) !== 0);
            break;

          case 5:
            matchValue_19 = mkInt32Val(g, $var23(getValue(activePatternResult44400).data));
            break;

          case 7:
            matchValue_19 = mkInt64Val(g, function (value_3) {
              return value_3.not();
            }(getValue(activePatternResult44400).data));
            break;

          case 3:
            matchValue_19 = mkInt16Val(g, function (value_1) {
              return ~value_1;
            }(getValue(activePatternResult44400).data));
            break;

          case 1:
            matchValue_19 = mkInt8Val(g, function (value) {
              return ~value;
            }(getValue(activePatternResult44400).data));
            break;

          case 2:
            matchValue_19 = mkUInt8Val(g, function (value_4) {
              return ~value_4;
            }(getValue(activePatternResult44400).data));
            break;

          case 6:
            matchValue_19 = mkUInt32Val(g, function (value_6) {
              return ~value_6;
            }(getValue(activePatternResult44400).data));
            break;

          case 8:
            matchValue_19 = mkUInt64Val(g, function (value_7) {
              return value_7.not();
            }(getValue(activePatternResult44400).data));
            break;

          case 4:
            matchValue_19 = mkUInt16Val(g, function (value_5) {
              return ~value_5;
            }(getValue(activePatternResult44400).data));
            break;

          default:
            matchValue_19 = null;
        }
      } else {
        matchValue_19 = null;
      }

      if (matchValue_19 == null) {
        return new ExprValueInfo(0);
      } else {
        return getValue(matchValue_19);
      }

    case 7:
      let matchValue_20;

      const activePatternResult44411 = _StripConstValue___($var4[1]);

      if (activePatternResult44411 != null) {
        switch (getValue(activePatternResult44411).tag) {
          case 5:
            matchValue_20 = mkInt32Val(g, function (n_2) {
              return -n_2;
            }(getValue(activePatternResult44411).data));
            break;

          case 7:
            matchValue_20 = mkInt64Val(g, function (n_3) {
              return n_3.neg();
            }(getValue(activePatternResult44411).data));
            break;

          case 3:
            matchValue_20 = mkInt16Val(g, function (n_1) {
              return -n_1;
            }(getValue(activePatternResult44411).data));
            break;

          case 1:
            matchValue_20 = mkInt8Val(g, function (n) {
              return -n;
            }(getValue(activePatternResult44411).data));
            break;

          default:
            matchValue_20 = null;
        }
      } else {
        matchValue_20 = null;
      }

      if (matchValue_20 == null) {
        return new ExprValueInfo(0);
      } else {
        return getValue(matchValue_20);
      }

    case 8:
      const matchValue_21 = [stripValue($var4[1]), stripValue($var4[2])];
      const $var24 = matchValue_21[0].tag === 6 ? matchValue_21[0].data[0].tag === 0 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 0 ? [0, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 1 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 1 ? [1, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 3 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 3 ? [2, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 5 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 5 ? [3, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 7 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 7 ? [4, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 13 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 13 ? [5, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 2 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 2 ? [6, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 4 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 4 ? [7, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 6 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 6 ? [8, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : matchValue_21[0].data[0].tag === 8 ? matchValue_21[1].tag === 6 ? matchValue_21[1].data[0].tag === 8 ? [9, matchValue_21[0].data[0].data, matchValue_21[1].data[0].data] : [10] : [10] : [10] : [10];

      switch ($var24[0]) {
        case 0:
          return mkBoolVal(g, $var24[1] === $var24[2]);

        case 1:
          return mkBoolVal(g, $var24[1] === $var24[2]);

        case 2:
          return mkBoolVal(g, $var24[1] === $var24[2]);

        case 3:
          return mkBoolVal(g, $var24[1] === $var24[2]);

        case 4:
          return mkBoolVal(g, $var24[1].Equals($var24[2]));

        case 5:
          return mkBoolVal(g, $var24[1] === $var24[2]);

        case 6:
          return mkBoolVal(g, $var24[1] === $var24[2]);

        case 7:
          return mkBoolVal(g, $var24[1] === $var24[2]);

        case 8:
          return mkBoolVal(g, $var24[1] === $var24[2]);

        case 9:
          return mkBoolVal(g, $var24[1].Equals($var24[2]));

        case 10:
          return new ExprValueInfo(0);
      }

    case 9:
      const matchValue_22 = [stripValue($var4[1]), stripValue($var4[2])];
      const $var25 = matchValue_22[0].tag === 6 ? matchValue_22[0].data[0].tag === 0 ? matchValue_22[1].tag === 6 ? matchValue_22[1].data[0].tag === 0 ? [0, matchValue_22[0].data[0].data, matchValue_22[1].data[0].data] : [5] : [5] : matchValue_22[0].data[0].tag === 5 ? matchValue_22[1].tag === 6 ? matchValue_22[1].data[0].tag === 5 ? [1, matchValue_22[0].data[0].data, matchValue_22[1].data[0].data] : [5] : [5] : matchValue_22[0].data[0].tag === 7 ? matchValue_22[1].tag === 6 ? matchValue_22[1].data[0].tag === 7 ? [2, matchValue_22[0].data[0].data, matchValue_22[1].data[0].data] : [5] : [5] : matchValue_22[0].data[0].tag === 1 ? matchValue_22[1].tag === 6 ? matchValue_22[1].data[0].tag === 1 ? [3, matchValue_22[0].data[0].data, matchValue_22[1].data[0].data] : [5] : [5] : matchValue_22[0].data[0].tag === 3 ? matchValue_22[1].tag === 6 ? matchValue_22[1].data[0].tag === 3 ? [4, matchValue_22[0].data[0].data, matchValue_22[1].data[0].data] : [5] : [5] : [5] : [5];

      switch ($var25[0]) {
        case 0:
          return mkBoolVal(g, $var25[1] < $var25[2]);

        case 1:
          return mkBoolVal(g, $var25[1] < $var25[2]);

        case 2:
          return mkBoolVal(g, $var25[1].CompareTo($var25[2]) < 0);

        case 3:
          return mkBoolVal(g, $var25[1] < $var25[2]);

        case 4:
          return mkBoolVal(g, $var25[1] < $var25[2]);

        case 5:
          return new ExprValueInfo(0);
      }

    case 10:
      const matchValue_23 = stripValue($var4[1]);
      const $var26 = matchValue_23.tag === 6 ? matchValue_23.data[0].tag === 1 ? [0, matchValue_23.data[0].data] : matchValue_23.data[0].tag === 3 ? [1, matchValue_23.data[0].data] : matchValue_23.data[0].tag === 5 ? [2, matchValue_23.data[0].data] : matchValue_23.data[0].tag === 7 ? [3, matchValue_23.data[0].data] : matchValue_23.data[0].tag === 2 ? [4, matchValue_23.data[0].data] : matchValue_23.data[0].tag === 4 ? [5, matchValue_23.data[0].data] : matchValue_23.data[0].tag === 6 ? [6, matchValue_23.data[0].data] : matchValue_23.data[0].tag === 8 ? [7, matchValue_23.data[0].data] : [8] : [8];

      switch ($var26[0]) {
        case 0:
          return mkUInt8Val(g, $var26[1] & 0xFF);

        case 1:
          return mkUInt8Val(g, $var26[1] & 0xFF);

        case 2:
          return mkUInt8Val(g, $var26[1] & 0xFF);

        case 3:
          return mkUInt8Val(g, $var26[1].toNumber() & 0xFF);

        case 4:
          return mkUInt8Val(g, $var26[1]);

        case 5:
          return mkUInt8Val(g, $var26[1] & 0xFF);

        case 6:
          return mkUInt8Val(g, $var26[1] & 0xFF);

        case 7:
          return mkUInt8Val(g, $var26[1].toNumber() & 0xFF);

        case 8:
          return new ExprValueInfo(0);
      }

    case 11:
      const $var27 = matchValue[0].tail != null ? matchValue[0].head.tag === 11 ? matchValue[0].head.data.tag === 4 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_9 = matchValue[2].head, a_25 = matchValue[1].head, typeEquiv(g, ty_9, g.uint16_ty)) ? [0, matchValue[1].head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

      switch ($var27[0]) {
        case 0:
          const matchValue_24 = stripValue($var27[1]);
          const $var28 = matchValue_24.tag === 6 ? matchValue_24.data[0].tag === 1 ? [0, matchValue_24.data[0].data] : matchValue_24.data[0].tag === 3 ? [1, matchValue_24.data[0].data] : matchValue_24.data[0].tag === 5 ? [2, matchValue_24.data[0].data] : matchValue_24.data[0].tag === 7 ? [3, matchValue_24.data[0].data] : matchValue_24.data[0].tag === 2 ? [4, matchValue_24.data[0].data] : matchValue_24.data[0].tag === 4 ? [5, matchValue_24.data[0].data] : matchValue_24.data[0].tag === 6 ? [6, matchValue_24.data[0].data] : matchValue_24.data[0].tag === 8 ? [7, matchValue_24.data[0].data] : [8] : [8];

          switch ($var28[0]) {
            case 0:
              return mkUInt16Val(g, $var28[1] & 0xFFFF);

            case 1:
              return mkUInt16Val(g, $var28[1] & 0xFFFF);

            case 2:
              return mkUInt16Val(g, $var28[1] & 0xFFFF);

            case 3:
              return mkUInt16Val(g, $var28[1].toNumber() & 0xFFFF);

            case 4:
              return mkUInt16Val(g, $var28[1]);

            case 5:
              return mkUInt16Val(g, $var28[1]);

            case 6:
              return mkUInt16Val(g, $var28[1] & 0xFFFF);

            case 7:
              return mkUInt16Val(g, $var28[1].toNumber() & 0xFFFF);

            case 8:
              return new ExprValueInfo(0);
          }

        case 1:
          const $var29 = matchValue[0].tail != null ? matchValue[0].head.tag === 11 ? matchValue[0].head.data.tag === 6 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_8 = matchValue[2].head, a_24 = matchValue[1].head, typeEquiv(g, ty_8, g.uint32_ty)) ? [0, matchValue[1].head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

          switch ($var29[0]) {
            case 0:
              const matchValue_25 = stripValue($var29[1]);
              const $var30 = matchValue_25.tag === 6 ? matchValue_25.data[0].tag === 1 ? [0, matchValue_25.data[0].data] : matchValue_25.data[0].tag === 3 ? [1, matchValue_25.data[0].data] : matchValue_25.data[0].tag === 5 ? [2, matchValue_25.data[0].data] : matchValue_25.data[0].tag === 7 ? [3, matchValue_25.data[0].data] : matchValue_25.data[0].tag === 2 ? [4, matchValue_25.data[0].data] : matchValue_25.data[0].tag === 4 ? [5, matchValue_25.data[0].data] : matchValue_25.data[0].tag === 6 ? [6, matchValue_25.data[0].data] : matchValue_25.data[0].tag === 8 ? [7, matchValue_25.data[0].data] : [8] : [8];

              switch ($var30[0]) {
                case 0:
                  return mkUInt32Val(g, $var30[1] >>> 0);

                case 1:
                  return mkUInt32Val(g, $var30[1] >>> 0);

                case 2:
                  return mkUInt32Val(g, $var30[1] >>> 0);

                case 3:
                  return mkUInt32Val(g, $var30[1].toNumber() >>> 0);

                case 4:
                  return mkUInt32Val(g, $var30[1]);

                case 5:
                  return mkUInt32Val(g, $var30[1]);

                case 6:
                  return mkUInt32Val(g, $var30[1]);

                case 7:
                  return mkUInt32Val(g, $var30[1].toNumber() >>> 0);

                case 8:
                  return new ExprValueInfo(0);
              }

            case 1:
              const $var31 = matchValue[0].tail != null ? matchValue[0].head.tag === 11 ? matchValue[0].head.data.tag === 8 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_7 = matchValue[2].head, a_23 = matchValue[1].head, typeEquiv(g, ty_7, g.uint64_ty)) ? [0, matchValue[1].head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

              switch ($var31[0]) {
                case 0:
                  const matchValue_26 = stripValue($var31[1]);
                  const $var32 = matchValue_26.tag === 6 ? matchValue_26.data[0].tag === 1 ? [0, matchValue_26.data[0].data] : matchValue_26.data[0].tag === 3 ? [1, matchValue_26.data[0].data] : matchValue_26.data[0].tag === 5 ? [2, matchValue_26.data[0].data] : matchValue_26.data[0].tag === 7 ? [3, matchValue_26.data[0].data] : matchValue_26.data[0].tag === 2 ? [4, matchValue_26.data[0].data] : matchValue_26.data[0].tag === 4 ? [5, matchValue_26.data[0].data] : matchValue_26.data[0].tag === 6 ? [6, matchValue_26.data[0].data] : matchValue_26.data[0].tag === 8 ? [7, matchValue_26.data[0].data] : [8] : [8];

                  switch ($var32[0]) {
                    case 0:
                      return mkUInt64Val(g, fromNumber($var32[1], true));

                    case 1:
                      return mkUInt64Val(g, fromNumber($var32[1], true));

                    case 2:
                      return mkUInt64Val(g, fromNumber($var32[1], true));

                    case 3:
                      return mkUInt64Val(g, fromValue($var32[1]));

                    case 4:
                      return mkUInt64Val(g, fromNumber($var32[1], true));

                    case 5:
                      return mkUInt64Val(g, fromNumber($var32[1], true));

                    case 6:
                      return mkUInt64Val(g, fromNumber($var32[1], true));

                    case 7:
                      return mkUInt64Val(g, fromValue($var32[1]));

                    case 8:
                      return new ExprValueInfo(0);
                  }

                case 1:
                  const $var33 = matchValue[0].tail != null ? matchValue[0].head.tag === 11 ? matchValue[0].head.data.tag === 1 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_6 = matchValue[2].head, a_22 = matchValue[1].head, typeEquiv(g, ty_6, g.sbyte_ty)) ? [0, matchValue[1].head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                  switch ($var33[0]) {
                    case 0:
                      const matchValue_27 = stripValue($var33[1]);
                      const $var34 = matchValue_27.tag === 6 ? matchValue_27.data[0].tag === 1 ? [0, matchValue_27.data[0].data] : matchValue_27.data[0].tag === 3 ? [1, matchValue_27.data[0].data] : matchValue_27.data[0].tag === 5 ? [2, matchValue_27.data[0].data] : matchValue_27.data[0].tag === 7 ? [3, matchValue_27.data[0].data] : matchValue_27.data[0].tag === 2 ? [4, matchValue_27.data[0].data] : matchValue_27.data[0].tag === 4 ? [5, matchValue_27.data[0].data] : matchValue_27.data[0].tag === 6 ? [6, matchValue_27.data[0].data] : matchValue_27.data[0].tag === 8 ? [7, matchValue_27.data[0].data] : [8] : [8];

                      switch ($var34[0]) {
                        case 0:
                          return mkInt8Val(g, $var34[1]);

                        case 1:
                          return mkInt8Val(g, ($var34[1] + 0x80 & 0xFF) - 0x80);

                        case 2:
                          return mkInt8Val(g, ($var34[1] + 0x80 & 0xFF) - 0x80);

                        case 3:
                          return mkInt8Val(g, ($var34[1].toNumber() + 0x80 & 0xFF) - 0x80);

                        case 4:
                          return mkInt8Val(g, ($var34[1] + 0x80 & 0xFF) - 0x80);

                        case 5:
                          return mkInt8Val(g, ($var34[1] + 0x80 & 0xFF) - 0x80);

                        case 6:
                          return mkInt8Val(g, ($var34[1] + 0x80 & 0xFF) - 0x80);

                        case 7:
                          return mkInt8Val(g, ($var34[1].toNumber() + 0x80 & 0xFF) - 0x80);

                        case 8:
                          return new ExprValueInfo(0);
                      }

                    case 1:
                      const $var35 = matchValue[0].tail != null ? matchValue[0].head.tag === 11 ? matchValue[0].head.data.tag === 3 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_5 = matchValue[2].head, a_21 = matchValue[1].head, typeEquiv(g, ty_5, g.int16_ty)) ? [0, matchValue[1].head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                      switch ($var35[0]) {
                        case 0:
                          const matchValue_28 = stripValue($var35[1]);
                          const $var36 = matchValue_28.tag === 6 ? matchValue_28.data[0].tag === 5 ? [0, matchValue_28.data[0].data] : matchValue_28.data[0].tag === 3 ? [1, matchValue_28.data[0].data] : matchValue_28.data[0].tag === 1 ? [2, matchValue_28.data[0].data] : matchValue_28.data[0].tag === 7 ? [3, matchValue_28.data[0].data] : matchValue_28.data[0].tag === 6 ? [4, matchValue_28.data[0].data] : matchValue_28.data[0].tag === 4 ? [5, matchValue_28.data[0].data] : matchValue_28.data[0].tag === 2 ? [6, matchValue_28.data[0].data] : matchValue_28.data[0].tag === 8 ? [7, matchValue_28.data[0].data] : [8] : [8];

                          switch ($var36[0]) {
                            case 0:
                              return mkInt16Val(g, ($var36[1] + 0x8000 & 0xFFFF) - 0x8000);

                            case 1:
                              return mkInt16Val(g, $var36[1]);

                            case 2:
                              return mkInt16Val(g, $var36[1]);

                            case 3:
                              return mkInt16Val(g, ($var36[1].toNumber() + 0x8000 & 0xFFFF) - 0x8000);

                            case 4:
                              return mkInt16Val(g, ($var36[1] + 0x8000 & 0xFFFF) - 0x8000);

                            case 5:
                              return mkInt16Val(g, ($var36[1] + 0x8000 & 0xFFFF) - 0x8000);

                            case 6:
                              return mkInt16Val(g, ($var36[1] + 0x8000 & 0xFFFF) - 0x8000);

                            case 7:
                              return mkInt16Val(g, ($var36[1].toNumber() + 0x8000 & 0xFFFF) - 0x8000);

                            case 8:
                              return new ExprValueInfo(0);
                          }

                        case 1:
                          const $var37 = matchValue[0].tail != null ? matchValue[0].head.tag === 11 ? matchValue[0].head.data.tag === 5 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_4 = matchValue[2].head, a_20 = matchValue[1].head, typeEquiv(g, ty_4, g.int32_ty)) ? [0, matchValue[1].head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                          switch ($var37[0]) {
                            case 0:
                              const matchValue_29 = stripValue($var37[1]);
                              const $var38 = matchValue_29.tag === 6 ? matchValue_29.data[0].tag === 5 ? [0, matchValue_29.data[0].data] : matchValue_29.data[0].tag === 3 ? [1, matchValue_29.data[0].data] : matchValue_29.data[0].tag === 1 ? [2, matchValue_29.data[0].data] : matchValue_29.data[0].tag === 7 ? [3, matchValue_29.data[0].data] : matchValue_29.data[0].tag === 6 ? [4, matchValue_29.data[0].data] : matchValue_29.data[0].tag === 4 ? [5, matchValue_29.data[0].data] : matchValue_29.data[0].tag === 2 ? [6, matchValue_29.data[0].data] : matchValue_29.data[0].tag === 8 ? [7, matchValue_29.data[0].data] : [8] : [8];

                              switch ($var38[0]) {
                                case 0:
                                  return mkInt32Val(g, $var38[1]);

                                case 1:
                                  return mkInt32Val(g, $var38[1]);

                                case 2:
                                  return mkInt32Val(g, $var38[1]);

                                case 3:
                                  return mkInt32Val(g, ~~$var38[1].toNumber());

                                case 4:
                                  return mkInt32Val(g, ~~$var38[1]);

                                case 5:
                                  return mkInt32Val(g, ~~$var38[1]);

                                case 6:
                                  return mkInt32Val(g, ~~$var38[1]);

                                case 7:
                                  return mkInt32Val(g, ~~$var38[1].toNumber());

                                case 8:
                                  return new ExprValueInfo(0);
                              }

                            case 1:
                              const $var39 = matchValue[0].tail != null ? matchValue[0].head.tag === 11 ? matchValue[0].head.data.tag === 7 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_3 = matchValue[2].head, a_19 = matchValue[1].head, typeEquiv(g, ty_3, g.int64_ty)) ? [0, matchValue[1].head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                              switch ($var39[0]) {
                                case 0:
                                  const matchValue_30 = stripValue($var39[1]);
                                  const $var40 = matchValue_30.tag === 6 ? matchValue_30.data[0].tag === 5 ? [0, matchValue_30.data[0].data] : matchValue_30.data[0].tag === 3 ? [1, matchValue_30.data[0].data] : matchValue_30.data[0].tag === 1 ? [2, matchValue_30.data[0].data] : matchValue_30.data[0].tag === 7 ? [3, matchValue_30.data[0].data] : matchValue_30.data[0].tag === 6 ? [4, matchValue_30.data[0].data] : matchValue_30.data[0].tag === 4 ? [5, matchValue_30.data[0].data] : matchValue_30.data[0].tag === 2 ? [6, matchValue_30.data[0].data] : matchValue_30.data[0].tag === 8 ? [7, matchValue_30.data[0].data] : [8] : [8];

                                  switch ($var40[0]) {
                                    case 0:
                                      return mkInt64Val(g, fromNumber($var40[1], false));

                                    case 1:
                                      return mkInt64Val(g, fromNumber($var40[1], false));

                                    case 2:
                                      return mkInt64Val(g, fromNumber($var40[1], false));

                                    case 3:
                                      return mkInt64Val(g, fromValue($var40[1]));

                                    case 4:
                                      return mkInt64Val(g, fromNumber($var40[1], false));

                                    case 5:
                                      return mkInt64Val(g, fromNumber($var40[1], false));

                                    case 6:
                                      return mkInt64Val(g, fromNumber($var40[1], false));

                                    case 7:
                                      return mkInt64Val(g, fromValue($var40[1]));

                                    case 8:
                                      return new ExprValueInfo(0);
                                  }

                                case 1:
                                  const $var41 = matchValue[0].tail != null ? matchValue[0].head.tag === 10 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_2 = matchValue[2].head, b_2 = matchValue[1].tail.head, a_18 = matchValue[1].head, typeEquiv(g, ty_2, g.bool_ty)) ? [0, matchValue[1].head, matchValue[1].tail.head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                                  switch ($var41[0]) {
                                    case 0:
                                      const matchValue_31 = [stripValue($var41[1]), stripValue($var41[2])];
                                      const $var42 = matchValue_31[0].tag === 6 ? matchValue_31[0].data[0].tag === 13 ? matchValue_31[1].tag === 6 ? matchValue_31[1].data[0].tag === 13 ? [0, matchValue_31[0].data[0].data, matchValue_31[1].data[0].data] : [5] : [5] : matchValue_31[0].data[0].tag === 2 ? matchValue_31[1].tag === 6 ? matchValue_31[1].data[0].tag === 2 ? [1, matchValue_31[0].data[0].data, matchValue_31[1].data[0].data] : [5] : [5] : matchValue_31[0].data[0].tag === 4 ? matchValue_31[1].tag === 6 ? matchValue_31[1].data[0].tag === 4 ? [2, matchValue_31[0].data[0].data, matchValue_31[1].data[0].data] : [5] : [5] : matchValue_31[0].data[0].tag === 6 ? matchValue_31[1].tag === 6 ? matchValue_31[1].data[0].tag === 6 ? [3, matchValue_31[0].data[0].data, matchValue_31[1].data[0].data] : [5] : [5] : matchValue_31[0].data[0].tag === 8 ? matchValue_31[1].tag === 6 ? matchValue_31[1].data[0].tag === 8 ? [4, matchValue_31[0].data[0].data, matchValue_31[1].data[0].data] : [5] : [5] : [5] : [5];

                                      switch ($var42[0]) {
                                        case 0:
                                          return mkBoolVal(g, $var42[1] < $var42[2]);

                                        case 1:
                                          return mkBoolVal(g, $var42[1] < $var42[2]);

                                        case 2:
                                          return mkBoolVal(g, $var42[1] < $var42[2]);

                                        case 3:
                                          return mkBoolVal(g, $var42[1] < $var42[2]);

                                        case 4:
                                          return mkBoolVal(g, $var42[1].CompareTo($var42[2]) < 0);

                                        case 5:
                                          return new ExprValueInfo(0);
                                      }

                                    case 1:
                                      const $var43 = matchValue[0].tail != null ? matchValue[0].head.tag === 7 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty_1 = matchValue[2].head, b_1 = matchValue[1].tail.head, a_17 = matchValue[1].head, typeEquiv(g, ty_1, g.bool_ty)) ? [0, matchValue[1].head, matchValue[1].tail.head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                                      switch ($var43[0]) {
                                        case 0:
                                          const matchValue_32 = [stripValue($var43[1]), stripValue($var43[2])];
                                          const $var44 = matchValue_32[0].tag === 6 ? matchValue_32[0].data[0].tag === 1 ? matchValue_32[1].tag === 6 ? matchValue_32[1].data[0].tag === 1 ? [0, matchValue_32[0].data[0].data, matchValue_32[1].data[0].data] : [4] : [4] : matchValue_32[0].data[0].tag === 3 ? matchValue_32[1].tag === 6 ? matchValue_32[1].data[0].tag === 3 ? [1, matchValue_32[0].data[0].data, matchValue_32[1].data[0].data] : [4] : [4] : matchValue_32[0].data[0].tag === 5 ? matchValue_32[1].tag === 6 ? matchValue_32[1].data[0].tag === 5 ? [2, matchValue_32[0].data[0].data, matchValue_32[1].data[0].data] : [4] : [4] : matchValue_32[0].data[0].tag === 7 ? matchValue_32[1].tag === 6 ? matchValue_32[1].data[0].tag === 7 ? [3, matchValue_32[0].data[0].data, matchValue_32[1].data[0].data] : [4] : [4] : [4] : [4];

                                          switch ($var44[0]) {
                                            case 0:
                                              return mkBoolVal(g, $var44[1] > $var44[2]);

                                            case 1:
                                              return mkBoolVal(g, $var44[1] > $var44[2]);

                                            case 2:
                                              return mkBoolVal(g, $var44[1] > $var44[2]);

                                            case 3:
                                              return mkBoolVal(g, $var44[1].CompareTo($var44[2]) > 0);

                                            case 4:
                                              return new ExprValueInfo(0);
                                          }

                                        case 1:
                                          const $var45 = matchValue[0].tail != null ? matchValue[0].head.tag === 8 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty = matchValue[2].head, b = matchValue[1].tail.head, a_16 = matchValue[1].head, typeEquiv(g, ty, g.bool_ty)) ? [0, matchValue[1].head, matchValue[1].tail.head, matchValue[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                                          switch ($var45[0]) {
                                            case 0:
                                              const matchValue_33 = [stripValue($var45[1]), stripValue($var45[2])];
                                              const $var46 = matchValue_33[0].tag === 6 ? matchValue_33[0].data[0].tag === 13 ? matchValue_33[1].tag === 6 ? matchValue_33[1].data[0].tag === 13 ? [0, matchValue_33[0].data[0].data, matchValue_33[1].data[0].data] : [5] : [5] : matchValue_33[0].data[0].tag === 2 ? matchValue_33[1].tag === 6 ? matchValue_33[1].data[0].tag === 2 ? [1, matchValue_33[0].data[0].data, matchValue_33[1].data[0].data] : [5] : [5] : matchValue_33[0].data[0].tag === 4 ? matchValue_33[1].tag === 6 ? matchValue_33[1].data[0].tag === 4 ? [2, matchValue_33[0].data[0].data, matchValue_33[1].data[0].data] : [5] : [5] : matchValue_33[0].data[0].tag === 6 ? matchValue_33[1].tag === 6 ? matchValue_33[1].data[0].tag === 6 ? [3, matchValue_33[0].data[0].data, matchValue_33[1].data[0].data] : [5] : [5] : matchValue_33[0].data[0].tag === 8 ? matchValue_33[1].tag === 6 ? matchValue_33[1].data[0].tag === 8 ? [4, matchValue_33[0].data[0].data, matchValue_33[1].data[0].data] : [5] : [5] : [5] : [5];

                                              switch ($var46[0]) {
                                                case 0:
                                                  return mkBoolVal(g, $var46[1] > $var46[2]);

                                                case 1:
                                                  return mkBoolVal(g, $var46[1] > $var46[2]);

                                                case 2:
                                                  return mkBoolVal(g, $var46[1] > $var46[2]);

                                                case 3:
                                                  return mkBoolVal(g, $var46[1] > $var46[2]);

                                                case 4:
                                                  return mkBoolVal(g, $var46[1].CompareTo($var46[2]) > 0);

                                                case 5:
                                                  return new ExprValueInfo(0);
                                              }

                                            case 1:
                                              const $var47 = matchValue[0].tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [3, matchValue[2].head, matchValue[1].head] : [4] : [4] : [4] : [4] : matchValue[0].head.tag === 19 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [0, matchValue[1].head, matchValue[1].tail.head] : [4] : [4] : [4] : [4] : matchValue[0].head.tag === 20 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [1, matchValue[1].head, matchValue[1].tail.head] : [4] : [4] : [4] : [4] : matchValue[0].head.tag === 21 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [2, matchValue[1].head, matchValue[1].tail.head] : [4] : [4] : [4] : [4] : [4];

                                              switch ($var47[0]) {
                                                case 0:
                                                  const matchValue_34 = [stripValue($var47[1]), stripValue($var47[2])];
                                                  const $var48 = matchValue_34[0].tag === 6 ? matchValue_34[0].data[0].tag === 7 ? matchValue_34[1].tag === 6 ? matchValue_34[1].data[0].tag === 5 ? (n_11 = matchValue_34[1].data[0].data | 0, a_7 = matchValue_34[0].data[0].data, n_11 >= 0 ? n_11 <= 63 : false) ? [0, matchValue_34[0].data[0].data, matchValue_34[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                  switch ($var48[0]) {
                                                    case 0:
                                                      return mkInt64Val(g, $var48[1].shl($var48[2]));

                                                    case 1:
                                                      const $var49 = matchValue_34[0].tag === 6 ? matchValue_34[0].data[0].tag === 5 ? matchValue_34[1].tag === 6 ? matchValue_34[1].data[0].tag === 5 ? (n_10 = matchValue_34[1].data[0].data | 0, a_6 = matchValue_34[0].data[0].data | 0, n_10 >= 0 ? n_10 <= 31 : false) ? [0, matchValue_34[0].data[0].data, matchValue_34[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                      switch ($var49[0]) {
                                                        case 0:
                                                          return mkInt32Val(g, $var49[1] << $var49[2]);

                                                        case 1:
                                                          const $var50 = matchValue_34[0].tag === 6 ? matchValue_34[0].data[0].tag === 3 ? matchValue_34[1].tag === 6 ? matchValue_34[1].data[0].tag === 5 ? (n_9 = matchValue_34[1].data[0].data | 0, a_5 = matchValue_34[0].data[0].data | 0, n_9 >= 0 ? n_9 <= 15 : false) ? [0, matchValue_34[0].data[0].data, matchValue_34[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                          switch ($var50[0]) {
                                                            case 0:
                                                              return mkInt16Val(g, $var50[1] << $var50[2]);

                                                            case 1:
                                                              const $var51 = matchValue_34[0].tag === 6 ? matchValue_34[0].data[0].tag === 1 ? matchValue_34[1].tag === 6 ? matchValue_34[1].data[0].tag === 5 ? (n_8 = matchValue_34[1].data[0].data | 0, a_4 = matchValue_34[0].data[0].data | 0, n_8 >= 0 ? n_8 <= 7 : false) ? [0, matchValue_34[0].data[0].data, matchValue_34[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                              switch ($var51[0]) {
                                                                case 0:
                                                                  return mkInt8Val(g, $var51[1] << $var51[2]);

                                                                case 1:
                                                                  const $var52 = matchValue_34[0].tag === 6 ? matchValue_34[0].data[0].tag === 8 ? matchValue_34[1].tag === 6 ? matchValue_34[1].data[0].tag === 5 ? (n_7 = matchValue_34[1].data[0].data | 0, a_3 = matchValue_34[0].data[0].data, n_7 >= 0 ? n_7 <= 63 : false) ? [0, matchValue_34[0].data[0].data, matchValue_34[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                                  switch ($var52[0]) {
                                                                    case 0:
                                                                      return mkUInt64Val(g, $var52[1].shl($var52[2]));

                                                                    case 1:
                                                                      const $var53 = matchValue_34[0].tag === 6 ? matchValue_34[0].data[0].tag === 6 ? matchValue_34[1].tag === 6 ? matchValue_34[1].data[0].tag === 5 ? (n_6 = matchValue_34[1].data[0].data | 0, a_2 = matchValue_34[0].data[0].data, n_6 >= 0 ? n_6 <= 31 : false) ? [0, matchValue_34[0].data[0].data, matchValue_34[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                                      switch ($var53[0]) {
                                                                        case 0:
                                                                          return mkUInt32Val(g, $var53[1] << $var53[2]);

                                                                        case 1:
                                                                          const $var54 = matchValue_34[0].tag === 6 ? matchValue_34[0].data[0].tag === 4 ? matchValue_34[1].tag === 6 ? matchValue_34[1].data[0].tag === 5 ? (n_5 = matchValue_34[1].data[0].data | 0, a_1 = matchValue_34[0].data[0].data, n_5 >= 0 ? n_5 <= 15 : false) ? [0, matchValue_34[0].data[0].data, matchValue_34[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                                          switch ($var54[0]) {
                                                                            case 0:
                                                                              return mkUInt16Val(g, $var54[1] << $var54[2]);

                                                                            case 1:
                                                                              const $var55 = matchValue_34[0].tag === 6 ? matchValue_34[0].data[0].tag === 2 ? matchValue_34[1].tag === 6 ? matchValue_34[1].data[0].tag === 5 ? (n_4 = matchValue_34[1].data[0].data | 0, a = matchValue_34[0].data[0].data, n_4 >= 0 ? n_4 <= 7 : false) ? [0, matchValue_34[0].data[0].data, matchValue_34[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                                              switch ($var55[0]) {
                                                                                case 0:
                                                                                  return mkUInt8Val(g, $var55[1] << $var55[2]);

                                                                                case 1:
                                                                                  return new ExprValueInfo(0);
                                                                              }

                                                                          }

                                                                      }

                                                                  }

                                                              }

                                                          }

                                                      }

                                                  }

                                                case 1:
                                                  const matchValue_35 = [stripValue($var47[1]), stripValue($var47[2])];
                                                  const $var56 = matchValue_35[0].tag === 6 ? matchValue_35[0].data[0].tag === 1 ? matchValue_35[1].tag === 6 ? matchValue_35[1].data[0].tag === 5 ? (n_15 = matchValue_35[1].data[0].data | 0, a_11 = matchValue_35[0].data[0].data | 0, n_15 >= 0 ? n_15 <= 7 : false) ? [0, matchValue_35[0].data[0].data, matchValue_35[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                  switch ($var56[0]) {
                                                    case 0:
                                                      return mkInt8Val(g, $var56[1] >> $var56[2]);

                                                    case 1:
                                                      const $var57 = matchValue_35[0].tag === 6 ? matchValue_35[0].data[0].tag === 3 ? matchValue_35[1].tag === 6 ? matchValue_35[1].data[0].tag === 5 ? (n_14 = matchValue_35[1].data[0].data | 0, a_10 = matchValue_35[0].data[0].data | 0, n_14 >= 0 ? n_14 <= 15 : false) ? [0, matchValue_35[0].data[0].data, matchValue_35[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                      switch ($var57[0]) {
                                                        case 0:
                                                          return mkInt16Val(g, $var57[1] >> $var57[2]);

                                                        case 1:
                                                          const $var58 = matchValue_35[0].tag === 6 ? matchValue_35[0].data[0].tag === 5 ? matchValue_35[1].tag === 6 ? matchValue_35[1].data[0].tag === 5 ? (n_13 = matchValue_35[1].data[0].data | 0, a_9 = matchValue_35[0].data[0].data | 0, n_13 >= 0 ? n_13 <= 31 : false) ? [0, matchValue_35[0].data[0].data, matchValue_35[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                          switch ($var58[0]) {
                                                            case 0:
                                                              return mkInt32Val(g, $var58[1] >> $var58[2]);

                                                            case 1:
                                                              const $var59 = matchValue_35[0].tag === 6 ? matchValue_35[0].data[0].tag === 7 ? matchValue_35[1].tag === 6 ? matchValue_35[1].data[0].tag === 5 ? (n_12 = matchValue_35[1].data[0].data | 0, a_8 = matchValue_35[0].data[0].data, n_12 >= 0 ? n_12 <= 63 : false) ? [0, matchValue_35[0].data[0].data, matchValue_35[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                              switch ($var59[0]) {
                                                                case 0:
                                                                  return mkInt64Val(g, $var59[1].shr($var59[2]));

                                                                case 1:
                                                                  return new ExprValueInfo(0);
                                                              }

                                                          }

                                                      }

                                                  }

                                                case 2:
                                                  const matchValue_36 = [stripValue($var47[1]), stripValue($var47[2])];
                                                  const $var60 = matchValue_36[0].tag === 6 ? matchValue_36[0].data[0].tag === 2 ? matchValue_36[1].tag === 6 ? matchValue_36[1].data[0].tag === 5 ? (n_19 = matchValue_36[1].data[0].data | 0, a_15 = matchValue_36[0].data[0].data, n_19 >= 0 ? n_19 <= 7 : false) ? [0, matchValue_36[0].data[0].data, matchValue_36[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                  switch ($var60[0]) {
                                                    case 0:
                                                      return mkUInt8Val(g, $var60[1] >> $var60[2]);

                                                    case 1:
                                                      const $var61 = matchValue_36[0].tag === 6 ? matchValue_36[0].data[0].tag === 4 ? matchValue_36[1].tag === 6 ? matchValue_36[1].data[0].tag === 5 ? (n_18 = matchValue_36[1].data[0].data | 0, a_14 = matchValue_36[0].data[0].data, n_18 >= 0 ? n_18 <= 15 : false) ? [0, matchValue_36[0].data[0].data, matchValue_36[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                      switch ($var61[0]) {
                                                        case 0:
                                                          return mkUInt16Val(g, $var61[1] >> $var61[2]);

                                                        case 1:
                                                          const $var62 = matchValue_36[0].tag === 6 ? matchValue_36[0].data[0].tag === 6 ? matchValue_36[1].tag === 6 ? matchValue_36[1].data[0].tag === 5 ? (n_17 = matchValue_36[1].data[0].data | 0, a_13 = matchValue_36[0].data[0].data, n_17 >= 0 ? n_17 <= 31 : false) ? [0, matchValue_36[0].data[0].data, matchValue_36[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                          switch ($var62[0]) {
                                                            case 0:
                                                              return mkUInt32Val(g, $var62[1] >>> $var62[2]);

                                                            case 1:
                                                              const $var63 = matchValue_36[0].tag === 6 ? matchValue_36[0].data[0].tag === 8 ? matchValue_36[1].tag === 6 ? matchValue_36[1].data[0].tag === 5 ? (n_16 = matchValue_36[1].data[0].data | 0, a_12 = matchValue_36[0].data[0].data, n_16 >= 0 ? n_16 <= 63 : false) ? [0, matchValue_36[0].data[0].data, matchValue_36[1].data[0].data] : [1] : [1] : [1] : [1] : [1];

                                                              switch ($var63[0]) {
                                                                case 0:
                                                                  return mkUInt64Val(g, $var63[1].shr($var63[2]));

                                                                case 1:
                                                                  return new ExprValueInfo(0);
                                                              }

                                                          }

                                                      }

                                                  }

                                                case 3:
                                                  const matchValue_37 = stripValue($var47[2]);
                                                  const $var64 = matchValue_37.tag === 6 ? matchValue_37.data[0].tag === 0 ? [0, matchValue_37.data[0].data] : matchValue_37.data[0].tag === 1 ? [1, matchValue_37.data[0].data] : matchValue_37.data[0].tag === 2 ? [2, matchValue_37.data[0].data] : matchValue_37.data[0].tag === 3 ? [3, matchValue_37.data[0].data] : matchValue_37.data[0].tag === 4 ? [4, matchValue_37.data[0].data] : matchValue_37.data[0].tag === 5 ? [5, matchValue_37.data[0].data] : matchValue_37.data[0].tag === 6 ? [6, matchValue_37.data[0].data] : matchValue_37.data[0].tag === 7 ? [7, matchValue_37.data[0].data] : matchValue_37.data[0].tag === 8 ? [8, matchValue_37.data[0].data] : [9] : [9];

                                                  switch ($var64[0]) {
                                                    case 0:
                                                      if (typeEquiv(g, $var47[1], g.bool_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.sbyte_ty)) {
                                                        return mkInt8Val(g, $var64[1] ? 1 : 0);
                                                      } else if (typeEquiv(g, $var47[1], g.int16_ty)) {
                                                        return mkInt16Val(g, $var64[1] ? 1 : 0);
                                                      } else if (typeEquiv(g, $var47[1], g.int32_ty)) {
                                                        return mkInt32Val(g, $var64[1] ? 1 : 0);
                                                      } else if (typeEquiv(g, $var47[1], g.byte_ty)) {
                                                        return mkUInt8Val(g, $var64[1] ? 1 : 0);
                                                      } else if (typeEquiv(g, $var47[1], g.uint16_ty)) {
                                                        return mkUInt16Val(g, $var64[1] ? 1 : 0);
                                                      } else if (typeEquiv(g, $var47[1], g.uint32_ty)) {
                                                        return mkUInt32Val(g, $var64[1] ? 1 : 0);
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 1:
                                                      if (typeEquiv(g, $var47[1], g.sbyte_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.int16_ty)) {
                                                        return mkInt16Val(g, $var64[1]);
                                                      } else if (typeEquiv(g, $var47[1], g.int32_ty)) {
                                                        return mkInt32Val(g, $var64[1]);
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 2:
                                                      if (typeEquiv(g, $var47[1], g.byte_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.uint16_ty)) {
                                                        return mkUInt16Val(g, $var64[1]);
                                                      } else if (typeEquiv(g, $var47[1], g.uint32_ty)) {
                                                        return mkUInt32Val(g, $var64[1]);
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 3:
                                                      if (typeEquiv(g, $var47[1], g.int16_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.int32_ty)) {
                                                        return mkInt32Val(g, $var64[1]);
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 4:
                                                      if (typeEquiv(g, $var47[1], g.uint16_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.uint32_ty)) {
                                                        return mkUInt32Val(g, $var64[1]);
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 5:
                                                      if (typeEquiv(g, $var47[1], g.int32_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.uint32_ty)) {
                                                        return mkUInt32Val(g, $var64[1] >>> 0);
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 6:
                                                      if (typeEquiv(g, $var47[1], g.uint32_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.int32_ty)) {
                                                        return mkInt32Val(g, ~~$var64[1]);
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 7:
                                                      if (typeEquiv(g, $var47[1], g.int64_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.uint64_ty)) {
                                                        return mkUInt64Val(g, fromValue($var64[1]));
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 8:
                                                      if (typeEquiv(g, $var47[1], g.uint64_ty)) {
                                                        return $var47[2];
                                                      } else if (typeEquiv(g, $var47[1], g.int64_ty)) {
                                                        return mkInt64Val(g, fromValue($var64[1]));
                                                      } else {
                                                        return new ExprValueInfo(0);
                                                      }

                                                    case 9:
                                                      return new ExprValueInfo(0);
                                                  }

                                                case 4:
                                                  return new ExprValueInfo(0);
                                              }

                                          }

                                      }

                                  }

                              }

                          }

                      }

                  }

              }

          }

      }

  }
}
export function OptimizeList(f, l) {
  return unzip(function (list) {
    return map_2(f, list);
  }(l));
}
export const NoExprs = [new List(), new List()];
export function CombineValueInfos(einfos, res) {
  const TotalSize = sumBy(function (x) {
    return x.TotalSize;
  }, einfos) | 0;
  const FunctionSize = sumBy(function (x_1) {
    return x_1.FunctionSize;
  }, einfos) | 0;
  const HasEffect = exists(function (x_2) {
    return x_2.HasEffect;
  }, einfos);
  const MightMakeCriticalTailcall = exists(function (x_3) {
    return x_3.MightMakeCriticalTailcall;
  }, einfos);
  return new Summary(res, FunctionSize, TotalSize, HasEffect, MightMakeCriticalTailcall);
}
export function CombineValueInfosUnknown(einfos) {
  return CombineValueInfos(einfos, new ExprValueInfo(0));
}
export function AbstractLazyModulInfoByHiding(isAssemblyBoundary, mhi) {
  var patternInput;
  var abstractExprInfo;
  var abstractValInfo;
  var abstractModulInfo;
  var abstractLazyModulInfo;
  return CurriedLambda((patternInput = [function (arg10_) {
    return ZsetModule.memberOf(mhi.mhiTycons, arg10_);
  }, function (arg10__1) {
    return ZsetModule.memberOf(mhi.mhiTyconReprs, arg10__1);
  }, function (arg10__2) {
    return ZsetModule.memberOf(mhi.mhiVals, arg10__2);
  }, function (arg10__3) {
    return ZsetModule.memberOf(mhi.mhiRecdFields, arg10__3);
  }, function (arg10__4) {
    return ZsetModule.memberOf(mhi.mhiUnionCases, arg10__4);
  }], abstractExprInfo = function (ivalue) {
    var fvs;
    var fvs_1;
    var ftyvs;
    const $var65 = ivalue.tag === 2 ? [0, ivalue.data[1], ivalue.data[0]] : ivalue.tag === 7 ? (fvs = freeInExpr(CollectAll, ivalue.data[3]), (((((isAssemblyBoundary ? !freeVarsAllPublic(fvs) : false) ? true : ZsetModule.exists(patternInput[2], fvs.FreeLocals)) ? true : ZsetModule.exists(patternInput[0], fvs.FreeTyvars.FreeTycons)) ? true : ZsetModule.exists(patternInput[1], fvs.FreeLocalTyconReprs)) ? true : ZsetModule.exists(patternInput[3], fvs.FreeRecdFields)) ? true : ZsetModule.exists(patternInput[4], fvs.FreeUnionCases)) ? [1, ivalue.data[3]] : [2] : ivalue.tag === 8 ? (fvs_1 = freeInExpr(CollectAll, ivalue.data[1]), (((((isAssemblyBoundary ? !freeVarsAllPublic(fvs_1) : false) ? true : ZsetModule.exists(patternInput[2], fvs_1.FreeLocals)) ? true : ZsetModule.exists(patternInput[0], fvs_1.FreeTyvars.FreeTycons)) ? true : ZsetModule.exists(patternInput[1], fvs_1.FreeLocalTyconReprs)) ? true : ZsetModule.exists(patternInput[3], fvs_1.FreeRecdFields)) ? true : ZsetModule.exists(patternInput[4], fvs_1.FreeUnionCases)) ? [1, ivalue.data[1]] : [2] : [2];

    switch ($var65[0]) {
      case 0:
        const detail_ = abstractExprInfo($var65[1]);
        const v2 = $var65[2].Deref;
        const tyvars = freeInVal(CollectAll, v2);

        if (((isAssemblyBoundary ? !freeTyvarsAllPublic(tyvars) : false) ? true : ZsetModule.exists(patternInput[0], tyvars.FreeTycons)) ? true : patternInput[2](v2)) {
          return detail_;
        } else {
          return new ExprValueInfo(2, [$var65[2], detail_]);
        }

      case 1:
        return new ExprValueInfo(0);

      case 2:
        const $var66 = ivalue.tag === 6 ? (ftyvs = freeInType(CollectAll, ivalue.data[1]), (isAssemblyBoundary ? !freeTyvarsAllPublic(ftyvs) : false) ? true : ZsetModule.exists(patternInput[0], ftyvs.FreeTycons)) ? [0, ivalue.data[1]] : [1] : [1];

        switch ($var66[0]) {
          case 0:
            return new ExprValueInfo(0);

          case 1:
            switch (ivalue.tag) {
              case 3:
                return new ExprValueInfo(3, map_1(abstractExprInfo, ivalue.data, Array));

              case 4:
                if (patternInput[1](ivalue.data[0].Deref) ? true : ivalue.data[0].AllFieldsArray.some($var67 => patternInput[3](function (arg00) {
                  return ivalue.data[0].MakeNestedRecdFieldRef(arg00);
                }($var67)))) {
                  return new ExprValueInfo(0);
                } else {
                  return new ExprValueInfo(4, [ivalue.data[0], map_1(abstractExprInfo, ivalue.data[1], Array)]);
                }

              case 5:
                const tcref = ivalue.data[0].TyconRef;

                if (patternInput[1](ivalue.data[0].Tycon) ? true : tcref.UnionCasesArray.some($var68 => patternInput[4](function (arg00_1) {
                  return tcref.MakeNestedUnionCaseRef(arg00_1);
                }($var68)))) {
                  return new ExprValueInfo(0);
                } else {
                  return new ExprValueInfo(5, [ivalue.data[0], map_1(abstractExprInfo, ivalue.data[1], Array)]);
                }

              case 1:
                return MakeSizedValueInfo(abstractExprInfo(ivalue.data[1]));

              case 0:
              case 8:
              case 7:
              case 6:
                return ivalue;

              default:
                throw new Error("C:/projects/fcs/src/fsharp/Optimizer.fs", 981, 14);
            }

        }

    }
  }, abstractValInfo = function (v) {
    const ValExprInfo = abstractExprInfo(v.ValExprInfo);
    return new ValInfo(v.ValMakesNoCriticalTailcalls, ValExprInfo);
  }, abstractModulInfo = function (ss) {
    const ModuleOrNamespaceInfos = NameMapModule.map(abstractLazyModulInfo, ss.ModuleOrNamespaceInfos);
    return new ModuleInfo(new ValInfos(map(function (tupledArg) {
      return check(tupledArg[0], abstractValInfo(tupledArg[1]));
    }, filter(function (tupledArg_1) {
      return !patternInput[2](tupledArg_1[0].Deref);
    }, ss.ValInfos.Entries))), ModuleOrNamespaceInfos);
  }, abstractLazyModulInfo = function (ss_1) {
    return notlazy(abstractModulInfo(ss_1.value));
  }, abstractLazyModulInfo));
}
export const AbstractOptimizationInfoToEssentials = CurriedLambda((() => {
  const abstractModulInfo = function (ss) {
    const ModuleOrNamespaceInfos = NameMapModule.map($var70 => function (v) {
      return notlazy(v);
    }(($var69 => abstractModulInfo(function (x) {
      return Lazy_1.force(x);
    }($var69)))($var70)), ss.ModuleOrNamespaceInfos);
    return new ModuleInfo(ss.ValInfos.Filter(function (tupledArg) {
      return tupledArg[0].MustInline;
    }), ModuleOrNamespaceInfos);
  };

  const abstractLazyModulInfo = function (ss_1) {
    return notlazy(abstractModulInfo(Lazy_1.force(ss_1)));
  };

  return abstractLazyModulInfo;
})());
export function AbstractExprInfoByVars(boundVars, boundTyVars, ivalue) {
  const boundVars_1 = filter_1(function (v) {
    return !v.IsMemberOrModuleBinding;
  }, boundVars);
  const matchValue = [boundVars_1, boundTyVars];
  const $var71 = matchValue[0].tail == null ? matchValue[1].tail == null ? [0] : [1] : [1];

  switch ($var71[0]) {
    case 0:
      return ivalue;

    case 1:
      const abstractExprInfo = function (ivalue_1) {
        var ftyvs_1;
        var fvs;
        var arg00_;
        var fvs_1;
        var arg00__1;
        var ftyvs;

        abstractExprInfo: while (true) {
          let $var72;

          if (ivalue_1.tag === 2) {
            const activePatternResult44470 = _VRefLocal_VRefNonLocal_(ivalue_1.data[0]);

            if (activePatternResult44470.tag === 0) {
              if ((!(boundVars_1.tail == null) ? exists(function (lv2) {
                return valEq(activePatternResult44470.data, lv2);
              }, boundVars_1) : false) ? true : !(boundTyVars.tail == null) ? (ftyvs_1 = freeInVal(CollectTypars, activePatternResult44470.data), exists(function (arg10__5) {
                return ZsetModule.memberOf(ftyvs_1.FreeTypars, arg10__5);
              }, boundTyVars)) : false) {
                $var72 = [0, ivalue_1.data[1], activePatternResult44470.data];
              } else {
                $var72 = [1];
              }
            } else {
              $var72 = [1];
            }
          } else {
            $var72 = [1];
          }

          switch ($var72[0]) {
            case 0:
              ivalue_1 = $var72[1];
              continue abstractExprInfo;

            case 1:
              const $var73 = ivalue_1.tag === 2 ? [0, ivalue_1.data[1], ivalue_1.data[0]] : ivalue_1.tag === 7 ? (fvs = freeInExpr(boundTyVars.tail == null ? CollectLocals : CollectTyparsAndLocals, ivalue_1.data[3]), ((!(boundVars_1.tail == null) ? exists(function (arg10__1) {
                return ZsetModule.memberOf(fvs.FreeLocals, arg10__1);
              }, boundVars_1) : false) ? true : !(boundTyVars.tail == null) ? exists((arg00_ = fvs.FreeTyvars.FreeTypars, function (arg10__2) {
                return ZsetModule.memberOf(arg00_, arg10__2);
              }), boundTyVars) : false) ? true : fvs.UsesMethodLocalConstructs) ? [1, ivalue_1.data[3]] : [2] : ivalue_1.tag === 8 ? (fvs_1 = freeInExpr(boundTyVars.tail == null ? CollectLocals : CollectTyparsAndLocals, ivalue_1.data[1]), ((!(boundVars_1.tail == null) ? exists(function (arg10__3) {
                return ZsetModule.memberOf(fvs_1.FreeLocals, arg10__3);
              }, boundVars_1) : false) ? true : !(boundTyVars.tail == null) ? exists((arg00__1 = fvs_1.FreeTyvars.FreeTypars, function (arg10__4) {
                return ZsetModule.memberOf(arg00__1, arg10__4);
              }), boundTyVars) : false) ? true : fvs_1.UsesMethodLocalConstructs) ? [1, ivalue_1.data[1]] : [2] : [2];

              switch ($var73[0]) {
                case 0:
                  const detail_ = abstractExprInfo($var73[1]);
                  return new ExprValueInfo(2, [$var73[2], detail_]);

                case 1:
                  return new ExprValueInfo(0);

                case 2:
                  const $var74 = ivalue_1.tag === 6 ? (!(boundTyVars.tail == null) ? (ftyvs = freeInType(CollectTypars, ivalue_1.data[1]), exists(function (arg10_) {
                    return ZsetModule.memberOf(ftyvs.FreeTypars, arg10_);
                  }, boundTyVars)) : false) ? [0, ivalue_1.data[1]] : [1] : [1];

                  switch ($var74[0]) {
                    case 0:
                      return new ExprValueInfo(0);

                    case 1:
                      switch (ivalue_1.tag) {
                        case 3:
                          return new ExprValueInfo(3, map_1(abstractExprInfo, ivalue_1.data, Array));

                        case 4:
                          return new ExprValueInfo(4, [ivalue_1.data[0], map_1(abstractExprInfo, ivalue_1.data[1], Array)]);

                        case 5:
                          return new ExprValueInfo(5, [ivalue_1.data[0], map_1(abstractExprInfo, ivalue_1.data[1], Array)]);

                        case 7:
                        case 6:
                        case 8:
                        case 0:
                          return ivalue_1;

                        case 1:
                          return MakeSizedValueInfo(abstractExprInfo(ivalue_1.data[1]));

                        default:
                          throw new Error("C:/projects/fcs/src/fsharp/Optimizer.fs", 1065, 16);
                      }

                  }

              }

          }
        }
      };

      const abstractValInfo = function (v_1) {
        const ValExprInfo = abstractExprInfo(v_1.ValExprInfo);
        return new ValInfo(v_1.ValMakesNoCriticalTailcalls, ValExprInfo);
      };

      const abstractModulInfo = function (ss) {
        const ModuleOrNamespaceInfos = NameMapModule.map($var76 => function (v_2) {
          return notlazy(v_2);
        }(($var75 => abstractModulInfo(function (x) {
          return Lazy_1.force(x);
        }($var75)))($var76)), ss.ModuleOrNamespaceInfos);
        return new ModuleInfo(ss.ValInfos.Map(function (tupledArg) {
          return check(tupledArg[0], abstractValInfo(tupledArg[1]));
        }), ModuleOrNamespaceInfos);
      };

      return abstractExprInfo(ivalue);
  }
}
export function RemapOptimizationInfo(g, tmenv) {
  var remapExprInfo;
  var remapValInfo;
  var remapModulInfo;
  var remapLazyModulInfo;
  return CurriedLambda((remapExprInfo = function (ivalue) {
    switch (ivalue.tag) {
      case 3:
        return new ExprValueInfo(3, map_1(remapExprInfo, ivalue.data, Array));

      case 4:
        return new ExprValueInfo(4, [remapTyconRef(tmenv.tyconRefRemap, ivalue.data[0]), map_1(remapExprInfo, ivalue.data[1], Array)]);

      case 5:
        return new ExprValueInfo(5, [remapUnionCaseRef(tmenv.tyconRefRemap, ivalue.data[0]), map_1(remapExprInfo, ivalue.data[1], Array)]);

      case 1:
        return MakeSizedValueInfo(remapExprInfo(ivalue.data[1]));

      case 0:
        return new ExprValueInfo(0);

      case 7:
        return new ExprValueInfo(7, [ivalue.data[0], ivalue.data[1], ivalue.data[2], remapExpr(g, new ValCopyFlag(0), tmenv, ivalue.data[3]), remapPossibleForallTy(g, tmenv, ivalue.data[4])]);

      case 6:
        return new ExprValueInfo(6, [ivalue.data[0], remapPossibleForallTy(g, tmenv, ivalue.data[1])]);

      case 8:
        return new ExprValueInfo(8, [ivalue.data[0], remapExpr(g, new ValCopyFlag(0), tmenv, ivalue.data[1])]);

      default:
        return new ExprValueInfo(2, [remapValRef(tmenv, ivalue.data[0]), remapExprInfo(ivalue.data[1])]);
    }
  }, remapValInfo = function (v) {
    const ValExprInfo = remapExprInfo(v.ValExprInfo);
    return new ValInfo(v.ValMakesNoCriticalTailcalls, ValExprInfo);
  }, remapModulInfo = function (ss) {
    const ModuleOrNamespaceInfos = NameMapModule.map(remapLazyModulInfo, ss.ModuleOrNamespaceInfos);
    return new ModuleInfo(ss.ValInfos.Map(function (tupledArg) {
      const vref_ = remapValRef(tmenv, tupledArg[0]);
      const vinfo = remapValInfo(tupledArg[1]);

      if (vinfo.ValMakesNoCriticalTailcalls) {
        vref_.Deref.SetMakesNoCriticalTailcalls();
      }

      return [vref_, vinfo];
    }), ModuleOrNamespaceInfos);
  }, remapLazyModulInfo = function (ss_1) {
    return notlazy(remapModulInfo(Lazy_1.force(ss_1)));
  }, remapLazyModulInfo));
}
export function AbstractAndRemapModulInfo(msg, g, m, repackage, hidden, info) {
  const mrpi = mkRepackageRemapping(repackage);
  [msg, m];
  const info_1 = AbstractLazyModulInfoByHiding(false, hidden)(info);
  const info_2 = RemapOptimizationInfo(g, mrpi)(info_1);
  return info_2;
}
export function IsTyFuncValRefExpr(_arg1) {
  if (_arg1.tag === 1) {
    return _arg1.data[0].IsTypeFunction;
  } else {
    return false;
  }
}
export function IsSmallConstExpr(x) {
  IsSmallConstExpr: while (true) {
    if (x.tag === 1) {
      return !x.data[0].IsMutable;
    } else if (x.tag === 5) {
      if (x.data[3].tail == null ? !IsTyFuncValRefExpr(x.data[0]) : false) {
        x = x.data[0];
        continue IsSmallConstExpr;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
export function ValueOfExpr(expr) {
  if (IsSmallConstExpr(expr)) {
    return new ExprValueInfo(8, [0, expr]);
  } else {
    return new ExprValueInfo(0);
  }
}
export function ValueIsUsedOrHasEffect(cenv_1, fvs, b, binfo) {
  const v = b.Var;

  if (((!cenv_1.settings.EliminateUnusedBindings() ? true : v.MemberInfo != null) ? true : binfo.HasEffect) ? true : v.IsFixed) {
    return true;
  } else {
    return ZsetModule.contains(v, fvs());
  }
}
export function SplitValuesByIsUsedOrHasEffect(cenv_1, fvs, x) {
  return unzip(filter_1(function (tupledArg) {
    return ValueIsUsedOrHasEffect(cenv_1, fvs, tupledArg[0], tupledArg[1]);
  }, x));
}
export function IlAssemblyCodeInstrHasEffect(i) {
  switch (i.tag) {
    case 33:
    case 34:
    case 0:
    case 22:
    case 14:
    case 25:
    case 3:
    case 26:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 19:
    case 20:
    case 21:
    case 27:
    case 28:
    case 29:
    case 65:
    case 68:
      return false;

    default:
      return true;
  }
}
export function IlAssemblyCodeHasEffect(instrs) {
  return exists(function (i) {
    return IlAssemblyCodeInstrHasEffect(i);
  }, instrs);
}
export function ExprHasEffect(g, expr) {
  ExprHasEffect: while (true) {
    const $var77 = expr.tag === 1 ? [0, expr.data[0]] : expr.tag === 12 ? [1] : expr.tag === 3 ? [1] : expr.tag === 4 ? [1] : expr.tag === 0 ? [1] : expr.tag === 5 ? expr.data[3].tail == null ? [2, expr.data[0]] : [6] : expr.tag === 11 ? [3, expr.data[2], expr.data[0]] : expr.tag === 6 ? [4, expr.data[0], expr.data[1]] : expr.tag === 7 ? [5, expr.data[0], expr.data[1]] : [6];

    switch ($var77[0]) {
      case 0:
        if ($var77[1].IsTypeFunction) {
          return true;
        } else {
          return $var77[1].IsMutable;
        }

      case 1:
        return false;

      case 2:
        if (IsTyFuncValRefExpr($var77[1])) {
          return true;
        } else {
          g = g;
          expr = $var77[1];
          continue ExprHasEffect;
        }

      case 3:
        if (ExprsHaveEffect(g, $var77[1])) {
          return true;
        } else {
          return OpHasEffect(g, $var77[2]);
        }

      case 4:
        if (BindingsHaveEffect(g, $var77[1])) {
          return true;
        } else {
          g = g;
          expr = $var77[2];
          continue ExprHasEffect;
        }

      case 5:
        if (BindingHasEffect(g, $var77[1])) {
          return true;
        } else {
          g = g;
          expr = $var77[2];
          continue ExprHasEffect;
        }

      case 6:
        return true;
    }
  }
}
export function ExprsHaveEffect(g, exprs) {
  return exists(function (arg10_) {
    return ExprHasEffect(g, arg10_);
  }, exprs);
}
export function BindingsHaveEffect(g, binds) {
  return exists(function (bind) {
    return BindingHasEffect(g, bind);
  }, binds);
}
export function BindingHasEffect(g, bind) {
  return function (arg10_) {
    return ExprHasEffect(g, arg10_);
  }(bind.Expr);
}
export function OpHasEffect(g, op) {
  const $var78 = op.tag === 10 ? [1, op.data[0], op.data[1]] : op.tag === 0 ? [2, op.data] : op.tag === 1 ? [3, op.data] : op.tag === 4 ? [4] : op.tag === 5 ? [4] : op.tag === 3 ? [4] : op.tag === 14 ? [5] : op.tag === 15 ? [6] : op.tag === 16 ? [7, op.data[1], op.data[0]] : op.tag === 22 ? [8, op.data[0]] : op.tag === 21 ? [9] : op.tag === 19 ? [10, op.data[0], op.data[1]] : op.tag === 23 ? [11] : op.tag === 12 ? [12, op.data] : op.tag === 13 ? [13, op.data] : op.tag === 17 ? [14] : op.tag === 30 ? op.data[0].tag === 0 ? [15, op.data[1]] : [16] : op.tag === 18 ? [16] : op.tag === 20 ? [16] : op.tag === 24 ? [16] : op.tag === 25 ? [16] : op.tag === 7 ? [16] : op.tag === 6 ? [16] : op.tag === 8 ? [16] : op.tag === 9 ? [16] : op.tag === 29 ? [16] : op.tag === 27 ? [16] : op.tag === 28 ? [16] : op.tag === 26 ? [16] : op.tag === 31 ? [16] : op.tag === 11 ? [16] : [0];

  switch ($var78[0]) {
    case 0:
      return false;

    case 1:
      if ($var78[1].tag === 1) {
        return isRecdOrUnionOrStructTyconRefAllocObservable(g, $var78[2]);
      } else {
        return true;
      }

    case 2:
      return isRecdOrUnionOrStructTyconRefAllocObservable(g, $var78[1].TyconRef);

    case 3:
      return isExnAllocObservable($var78[1]);

    case 4:
      return true;

    case 5:
      return false;

    case 6:
      return false;

    case 7:
      return isUnionCaseFieldMutable(g, $var78[2], $var78[1]);

    case 8:
      return IlAssemblyCodeHasEffect($var78[1]);

    case 9:
      return false;

    case 10:
      return isExnFieldMutable($var78[1], $var78[2]);

    case 11:
      return false;

    case 12:
      if ($var78[1].RecdField.IsMutable) {
        return true;
      } else {
        return equals(TryFindTyconRefBoolAttribute(g, range0, g.attrib_AllowNullLiteralAttribute, $var78[1].TyconRef), true);
      }

    case 13:
      return $var78[1].RecdField.IsMutable;

    case 14:
      return false;

    case 15:
      return $var78[1].IsMutable;

    case 16:
      return true;
  }
}
export function TryEliminateBinding(cenv_1, _env, _arg1, e2, _m) {
  if (!(cenv_1.optimizing ? cenv_1.settings.EliminateImmediatelyConsumedLocals() : false) ? !_arg1.data[0].IsCompilerGenerated : false) {
    return null;
  } else if (_arg1.data[0].IsFixed) {
    return null;
  } else {
    const IsUniqueUse = function (vspec2, args) {
      if (valEq(_arg1.data[0], vspec2) ? !(vspec2.LogicalName.indexOf("$cont") >= 0) : false) {
        const fvs = accFreeInExprs(CollectLocals, args, emptyFreeVars);
        return !ZsetModule.contains(_arg1.data[0], fvs.FreeLocals);
      } else {
        return false;
      }
    };

    const GetImmediateUseContext = function (rargsl, argsr) {
      GetImmediateUseContext: while (true) {
        let $var79;

        if (argsr.tail != null) {
          if (argsr.head.tag === 1) {
            const activePatternResult44516 = _VRefLocal_VRefNonLocal_(argsr.head.data[0]);

            if (activePatternResult44516.tag === 0) {
              if (valEq(_arg1.data[0], activePatternResult44516.data) ? IsUniqueUse(activePatternResult44516.data, append_1(reverse(rargsl), argsr.tail)) : false) {
                $var79 = [0, argsr.tail, activePatternResult44516.data];
              } else {
                $var79 = [1];
              }
            } else {
              $var79 = [1];
            }
          } else {
            $var79 = [1];
          }
        } else {
          $var79 = [1];
        }

        switch ($var79[0]) {
          case 0:
            return [reverse(rargsl), $var79[1]];

          case 1:
            const $var80 = argsr.tail != null ? !ExprHasEffect(cenv_1.g, argsr.head) ? [0, argsr.head, argsr.tail] : [1] : [1];

            switch ($var80[0]) {
              case 0:
                rargsl = new List($var80[1], rargsl);
                argsr = $var80[2];
                continue GetImmediateUseContext;

              case 1:
                return null;
            }

        }
      }
    };

    const matchValue = stripExpr(e2);
    let $var81;

    if (matchValue.tag === 1) {
      const activePatternResult44522 = _VRefLocal_VRefNonLocal_(matchValue.data[0]);

      if (activePatternResult44522.tag === 0) {
        if (IsUniqueUse(activePatternResult44522.data, new List())) {
          $var81 = [0, activePatternResult44522.data];
        } else {
          $var81 = [1];
        }
      } else {
        $var81 = [1];
      }
    } else {
      $var81 = [1];
    }

    switch ($var81[0]) {
      case 0:
        return _arg1.data[1];

      case 1:
        let $var82;

        if (matchValue.tag === 9) {
          if (matchValue.data[2].tag === 0) {
            if (matchValue.data[2].data[0].tag === 1) {
              const activePatternResult44521 = _VRefLocal_VRefNonLocal_(matchValue.data[2].data[0].data[0]);

              if (activePatternResult44521.tag === 0) {
                if ((() => {
                  const dflt = matchValue.data[2].data[2];
                  const cases = matchValue.data[2].data[1];

                  if (valEq(_arg1.data[0], activePatternResult44521.data)) {
                    const fvs_1 = accFreeInTargets(CollectLocals, matchValue.data[3], accFreeInSwitchCases(CollectLocals, cases, dflt, emptyFreeVars));
                    return !ZsetModule.contains(_arg1.data[0], fvs_1.FreeLocals);
                  } else {
                    return false;
                  }
                })()) {
                  $var82 = [0, matchValue.data[1], matchValue.data[2].data[1], matchValue.data[2].data[2], matchValue.data[4], matchValue.data[0], matchValue.data[3], matchValue.data[5], activePatternResult44521.data];
                } else {
                  $var82 = [1];
                }
              } else {
                $var82 = [1];
              }
            } else {
              $var82 = [1];
            }
          } else {
            $var82 = [1];
          }
        } else {
          $var82 = [1];
        }

        switch ($var82[0]) {
          case 0:
            const spMatch = _arg1.data[2].Combine($var82[5]);

            return new Expr(9, [spMatch, Expr_get_Range.bind(_arg1.data[1])(), new DecisionTree(0, [_arg1.data[1], $var82[2], $var82[3], $var82[4]]), $var82[6], $var82[4], $var82[7]]);

          case 1:
            const $var83 = matchValue.tag === 5 ? !(_arg1.data[0].LogicalName.indexOf("$cont") >= 0) ? [0, matchValue.data[3], matchValue.data[0], matchValue.data[1], matchValue.data[4], matchValue.data[2]] : [1] : [1];

            switch ($var83[0]) {
              case 0:
                const matchValue_1 = GetImmediateUseContext(new List(), new List($var83[2], $var83[1]));

                if (matchValue_1 == null) {
                  return null;
                } else if (getValue(matchValue_1)[0].tail != null) {
                  return MakeApplicationAndBetaReduce(cenv_1.g, getValue(matchValue_1)[0].head, $var83[3], ofArray([$var83[5]]), append_1(getValue(matchValue_1)[0].tail, new List(_arg1.data[1], getValue(matchValue_1)[1])), $var83[4]);
                } else {
                  return MakeApplicationAndBetaReduce(cenv_1.g, _arg1.data[1], $var83[3], ofArray([$var83[5]]), getValue(matchValue_1)[1], $var83[4]);
                }

              case 1:
                const $var84 = matchValue.tag === 11 ? matchValue.data[2].tail != null ? matchValue.data[2].head.tag === 11 ? matchValue.data[2].head.data[2].tail != null ? matchValue.data[2].head.data[2].tail.tail != null ? matchValue.data[2].head.data[2].tail.tail.tail == null ? matchValue.data[2].tail.tail != null ? matchValue.data[2].tail.tail.tail == null ? [0, matchValue.data[2].head.data[2].head, matchValue.data[2].head.data[2].tail.head, matchValue.data[2].tail.head, matchValue.data[0], matchValue.data[2].head.data[0], matchValue.data[3], matchValue.data[2].head.data[3], matchValue.data[1], matchValue.data[2].head.data[1]] : [1, matchValue.data[2], matchValue.data[0], matchValue.data[3], matchValue.data[1]] : [1, matchValue.data[2], matchValue.data[0], matchValue.data[3], matchValue.data[1]] : [1, matchValue.data[2], matchValue.data[0], matchValue.data[3], matchValue.data[1]] : [1, matchValue.data[2], matchValue.data[0], matchValue.data[3], matchValue.data[1]] : [1, matchValue.data[2], matchValue.data[0], matchValue.data[3], matchValue.data[1]] : [1, matchValue.data[2], matchValue.data[0], matchValue.data[3], matchValue.data[1]] : [1, matchValue.data[2], matchValue.data[0], matchValue.data[3], matchValue.data[1]] : [2];

                switch ($var84[0]) {
                  case 0:
                    const matchValue_2 = GetImmediateUseContext(new List(), ofArray([$var84[1], $var84[2], $var84[3]]));
                    const $var85 = matchValue_2 == null ? [4] : getValue(matchValue_2)[0].tail != null ? getValue(matchValue_2)[0].tail.tail != null ? getValue(matchValue_2)[0].tail.tail.tail == null ? getValue(matchValue_2)[1].tail == null ? [2, getValue(matchValue_2)[0].head, getValue(matchValue_2)[0].tail.head] : [3] : [3] : getValue(matchValue_2)[1].tail != null ? getValue(matchValue_2)[1].tail.tail == null ? [1, getValue(matchValue_2)[0].head, getValue(matchValue_2)[1].head] : [3] : [3] : getValue(matchValue_2)[1].tail != null ? getValue(matchValue_2)[1].tail.tail != null ? getValue(matchValue_2)[1].tail.tail.tail == null ? [0, getValue(matchValue_2)[1].head, getValue(matchValue_2)[1].tail.head] : [3] : [3] : [3];

                    switch ($var85[0]) {
                      case 0:
                        return new Expr(11, [$var84[4], $var84[8], ofArray([new Expr(11, [$var84[5], $var84[9], ofArray([_arg1.data[1], $var85[1]]), $var84[7]]), $var85[2]]), $var84[6]]);

                      case 1:
                        return new Expr(11, [$var84[4], $var84[8], ofArray([new Expr(11, [$var84[5], $var84[9], ofArray([$var85[1], _arg1.data[1]]), $var84[7]]), $var85[2]]), $var84[6]]);

                      case 2:
                        return new Expr(11, [$var84[4], $var84[8], ofArray([new Expr(11, [$var84[5], $var84[9], ofArray([$var85[1], $var85[2]]), $var84[7]]), _arg1.data[1]]), $var84[6]]);

                      case 3:
                        return error(new InternalError("unexpected return pattern from GetImmediateUseContext", $var84[6]));

                      case 4:
                        return null;
                    }

                  case 1:
                    const matchValue_3 = GetImmediateUseContext(new List(), $var84[1]);

                    if (matchValue_3 == null) {
                      return null;
                    } else {
                      const rargs = getValue(matchValue_3)[1];
                      const largs = getValue(matchValue_3)[0];
                      return new Expr(11, [$var84[2], $var84[4], append_1(largs, new List(_arg1.data[1], rargs)), $var84[3]]);
                    }

                  case 2:
                    return null;
                }

            }

        }

    }
  }
}
export function TryEliminateLet(cenv_1, env, bind, e2, m) {
  const matchValue = TryEliminateBinding(cenv_1, env, bind, e2, m);

  if (matchValue == null) {
    return [mkLetBind(m, bind, e2), 0];
  } else {
    return [getValue(matchValue), -1];
  }
}

function _KnownValApp___(expr) {
  const matchValue = stripExpr(expr);
  let $var86;

  if (matchValue.tag === 1) {
    $var86 = [0, matchValue.data[0]];
  } else if (matchValue.tag === 5) {
    const activePatternResult44535 = _KnownValApp___(matchValue.data[0]);

    if (activePatternResult44535 != null) {
      $var86 = [1, getValue(activePatternResult44535)[2], matchValue.data[3], getValue(activePatternResult44535)[1], matchValue.data[2], getValue(activePatternResult44535)[0]];
    } else {
      $var86 = [2];
    }
  } else {
    $var86 = [2];
  }

  switch ($var86[0]) {
    case 0:
      return [$var86[1], new List(), new List()];

    case 1:
      return [$var86[5], append_1($var86[3], $var86[4]), append_1($var86[1], $var86[2])];

    case 2:
      return null;
  }
}

export { _KnownValApp___ as $7C$KnownValApp$7C$_$7C$ };
export function CanExpandStructuralBinding(v) {
  if ((!v.IsCompiledAsTopLevel ? !v.IsMember : false) ? !v.IsTypeFunction : false) {
    return !v.IsMutable;
  } else {
    return false;
  }
}
export function ExprIsValue(_arg1) {
  if (_arg1.tag === 1) {
    return true;
  } else {
    return false;
  }
}
export function ExpandStructuralBindingRaw(cenv_1, expr) {
  var v;
  var tgtSeqPtOpt;
  var rhs;
  const $var87 = expr.tag === 7 ? (v = expr.data[0].data[0], tgtSeqPtOpt = expr.data[0].data[2], rhs = expr.data[0].data[1], isRefTupleExpr(rhs) ? CanExpandStructuralBinding(v) : false) ? [0, expr.data[1], expr.data[2], expr.data[0].data[1], expr.data[0].data[2], expr.data[0].data[0]] : [1] : [1];

  switch ($var87[0]) {
    case 0:
      const args = tryDestRefTupleExpr($var87[3]);

      if (forAll(function (_arg1) {
        return ExprIsValue(_arg1);
      }, args)) {
        return expr;
      } else {
        const argTys = destRefTupleTy(cenv_1.g, $var87[5].Type);

        const argBind = function (i, arg, argTy) {
          const name = $var87[5].LogicalName + "_" + i.toString();
          const patternInput = mkCompGenLocal(Expr_get_Range.bind(arg)(), name, argTy);
          return [patternInput[1], mkCompGenBind(patternInput[0], arg)];
        };

        const patternInput_1 = unzip(toList(mapIndexed2(argBind, args, argTys)));
        const tuple = mkRefTupled(cenv_1.g, $var87[2], patternInput_1[0], argTys);
        return mkLetsBind($var87[2], patternInput_1[1], mkLet($var87[4], $var87[2], $var87[5], tuple, $var87[1]));
      }

    case 1:
      return expr;
  }
}
export function RearrangeTupleBindings(expr, fin) {
  var tupInfo;
  const $var88 = expr.tag === 7 ? [0, expr.data[0], expr.data[1], expr.data[2]] : expr.tag === 11 ? expr.data[0].tag === 2 ? (tupInfo = expr.data[0].data, !evalTupInfoIsStruct(tupInfo)) ? [1, expr.data[0].data] : [2] : [2] : [2];

  switch ($var88[0]) {
    case 0:
      const matchValue = RearrangeTupleBindings($var88[2], fin);

      if (matchValue == null) {
        return null;
      } else {
        return mkLetBind($var88[3], $var88[1], getValue(matchValue));
      }

    case 1:
      return fin(expr);

    case 2:
      return null;
  }
}
export function ExpandStructuralBinding(cenv_1, expr) {
  var v;
  var tgtSeqPtOpt;
  var rhs;
  const $var89 = expr.tag === 7 ? (v = expr.data[0].data[0], tgtSeqPtOpt = expr.data[0].data[2], rhs = expr.data[0].data[1], (isRefTupleTy(cenv_1.g, v.Type) ? !isRefTupleExpr(rhs) : false) ? CanExpandStructuralBinding(v) : false) ? [0, expr.data[1], expr.data[2], expr.data[0].data[1], expr.data[0].data[2], expr.data[0].data[0]] : [1] : [1];

  switch ($var89[0]) {
    case 0:
      const matchValue = RearrangeTupleBindings($var89[3], function (top) {
        return mkLet($var89[4], $var89[2], $var89[5], top, $var89[1]);
      });

      if (matchValue == null) {
        return expr;
      } else {
        return ExpandStructuralBindingRaw(cenv_1, getValue(matchValue));
      }

    case 1:
      return ExpandStructuralBindingRaw(cenv_1, expr);
  }
}

function _QueryRun___(g, expr) {
  var vref_1;
  var arg_1;

  var _builder_1;

  var vref;
  var elemTy;
  var arg;

  var _builder;

  const $var90 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[3].tail != null ? expr.data[3].tail.tail != null ? expr.data[3].tail.tail.tail == null ? (vref_1 = expr.data[0].data[0], arg_1 = expr.data[3].tail.head, _builder_1 = expr.data[3].head, valRefEq(g, vref_1, g.query_run_value_vref)) ? [0, expr.data[3].head, expr.data[3].tail.head, expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var90[0]) {
    case 0:
      return [$var90[2], null];

    case 1:
      const $var91 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? expr.data[3].tail != null ? expr.data[3].tail.tail != null ? expr.data[3].tail.tail.tail == null ? (vref = expr.data[0].data[0], elemTy = expr.data[2].head, arg = expr.data[3].tail.head, _builder = expr.data[3].head, valRefEq(g, vref, g.query_run_enumerable_vref)) ? [0, expr.data[3].head, expr.data[3].tail.head, expr.data[2].head, expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

      switch ($var91[0]) {
        case 0:
          return [$var91[2], $var91[3]];

        case 1:
          return null;
      }

  }
}

export { _QueryRun___ as $7C$QueryRun$7C$_$7C$ };

function _MaybeRefTupled_(e) {
  return tryDestRefTupleExpr(e);
}

export { _MaybeRefTupled_ as $7C$MaybeRefTupled$7C$ };

function _AnyInstanceMethodApp___(e) {
  let $var92;

  if (e.tag === 5) {
    if (e.data[0].tag === 1) {
      if (e.data[3].tail != null) {
        if (e.data[3].tail.tail != null) {
          const activePatternResult44552 = _MaybeRefTupled_(e.data[3].tail.head);

          if (e.data[3].tail.tail.tail == null) {
            $var92 = [0, activePatternResult44552, e.data[3].head, e.data[2], e.data[0].data[0]];
          } else {
            $var92 = [1];
          }
        } else {
          $var92 = [1];
        }
      } else {
        $var92 = [1];
      }
    } else {
      $var92 = [1];
    }
  } else {
    $var92 = [1];
  }

  switch ($var92[0]) {
    case 0:
      return [$var92[4], $var92[3], $var92[2], $var92[1]];

    case 1:
      return null;
  }
}

export { _AnyInstanceMethodApp___ as $7C$AnyInstanceMethodApp$7C$_$7C$ };

function _InstanceMethodApp___(g, expectedValRef, e) {
  var vref;
  var tyargs;
  var obj;
  var args;
  let $var93;

  const activePatternResult44554 = _AnyInstanceMethodApp___(e);

  if (activePatternResult44554 != null) {
    if (vref = getValue(activePatternResult44554)[0], tyargs = getValue(activePatternResult44554)[1], obj = getValue(activePatternResult44554)[2], args = getValue(activePatternResult44554)[3], valRefEq(g, vref, expectedValRef)) {
      $var93 = [0, getValue(activePatternResult44554)[3], getValue(activePatternResult44554)[2], getValue(activePatternResult44554)[1], getValue(activePatternResult44554)[0]];
    } else {
      $var93 = [1];
    }
  } else {
    $var93 = [1];
  }

  switch ($var93[0]) {
    case 0:
      return [$var93[3], $var93[2], $var93[1]];

    case 1:
      return null;
  }
}

export { _InstanceMethodApp___ as $7C$InstanceMethodApp$7C$_$7C$ };

function _QuerySourceEnumerable___(g, _arg1) {
  var expectedValRef;
  let $var94;
  const activePatternResult44559 = (expectedValRef = g.query_source_vref, function (e) {
    return _InstanceMethodApp___(g, expectedValRef, e);
  })(_arg1);

  if (activePatternResult44559 != null) {
    if (getValue(activePatternResult44559)[0].tail != null) {
      if (getValue(activePatternResult44559)[0].tail.tail == null) {
        if (getValue(activePatternResult44559)[2].tail != null) {
          if (getValue(activePatternResult44559)[2].tail.tail == null) {
            $var94 = [0, getValue(activePatternResult44559)[1], getValue(activePatternResult44559)[2].head, getValue(activePatternResult44559)[0].head];
          } else {
            $var94 = [1];
          }
        } else {
          $var94 = [1];
        }
      } else {
        $var94 = [1];
      }
    } else {
      $var94 = [1];
    }
  } else {
    $var94 = [1];
  }

  switch ($var94[0]) {
    case 0:
      return [$var94[3], $var94[2]];

    case 1:
      return null;
  }
}

export { _QuerySourceEnumerable___ as $7C$QuerySourceEnumerable$7C$_$7C$ };

function _QueryFor___(g, _arg1) {
  var expectedValRef;
  let $var95;
  const activePatternResult44563 = (expectedValRef = g.query_for_vref, function (e) {
    return _InstanceMethodApp___(g, expectedValRef, e);
  })(_arg1);

  if (activePatternResult44563 != null) {
    if (getValue(activePatternResult44563)[0].tail != null) {
      if (getValue(activePatternResult44563)[0].tail.tail != null) {
        if (getValue(activePatternResult44563)[0].tail.tail.tail != null) {
          if (getValue(activePatternResult44563)[0].tail.tail.tail.tail != null) {
            if (getValue(activePatternResult44563)[0].tail.tail.tail.tail.tail == null) {
              if (getValue(activePatternResult44563)[2].tail != null) {
                if (getValue(activePatternResult44563)[2].tail.tail != null) {
                  if (getValue(activePatternResult44563)[2].tail.tail.tail == null) {
                    $var95 = [0, getValue(activePatternResult44563)[1], getValue(activePatternResult44563)[0].tail.tail.tail.head, getValue(activePatternResult44563)[0].tail.head, getValue(activePatternResult44563)[0].tail.tail.head, getValue(activePatternResult44563)[2].tail.head, getValue(activePatternResult44563)[2].head, getValue(activePatternResult44563)[0].head];
                  } else {
                    $var95 = [1];
                  }
                } else {
                  $var95 = [1];
                }
              } else {
                $var95 = [1];
              }
            } else {
              $var95 = [1];
            }
          } else {
            $var95 = [1];
          }
        } else {
          $var95 = [1];
        }
      } else {
        $var95 = [1];
      }
    } else {
      $var95 = [1];
    }
  } else {
    $var95 = [1];
  }

  switch ($var95[0]) {
    case 0:
      return [$var95[3], $var95[7], $var95[4], $var95[6], $var95[5]];

    case 1:
      return null;
  }
}

export { _QueryFor___ as $7C$QueryFor$7C$_$7C$ };

function _QueryYield___(g, _arg1) {
  var expectedValRef;
  let $var96;
  const activePatternResult44567 = (expectedValRef = g.query_yield_vref, function (e) {
    return _InstanceMethodApp___(g, expectedValRef, e);
  })(_arg1);

  if (activePatternResult44567 != null) {
    if (getValue(activePatternResult44567)[0].tail != null) {
      if (getValue(activePatternResult44567)[0].tail.tail != null) {
        if (getValue(activePatternResult44567)[0].tail.tail.tail == null) {
          if (getValue(activePatternResult44567)[2].tail != null) {
            if (getValue(activePatternResult44567)[2].tail.tail == null) {
              $var96 = [0, getValue(activePatternResult44567)[1], getValue(activePatternResult44567)[0].tail.head, getValue(activePatternResult44567)[2].head, getValue(activePatternResult44567)[0].head];
            } else {
              $var96 = [1];
            }
          } else {
            $var96 = [1];
          }
        } else {
          $var96 = [1];
        }
      } else {
        $var96 = [1];
      }
    } else {
      $var96 = [1];
    }
  } else {
    $var96 = [1];
  }

  switch ($var96[0]) {
    case 0:
      return [$var96[2], $var96[4], $var96[3]];

    case 1:
      return null;
  }
}

export { _QueryYield___ as $7C$QueryYield$7C$_$7C$ };

function _QueryYieldFrom___(g, _arg1) {
  var expectedValRef;
  let $var97;
  const activePatternResult44571 = (expectedValRef = g.query_yield_from_vref, function (e) {
    return _InstanceMethodApp___(g, expectedValRef, e);
  })(_arg1);

  if (activePatternResult44571 != null) {
    if (getValue(activePatternResult44571)[0].tail != null) {
      if (getValue(activePatternResult44571)[0].tail.tail != null) {
        if (getValue(activePatternResult44571)[0].tail.tail.tail == null) {
          if (getValue(activePatternResult44571)[2].tail != null) {
            if (getValue(activePatternResult44571)[2].tail.tail == null) {
              $var97 = [0, getValue(activePatternResult44571)[1], getValue(activePatternResult44571)[0].tail.head, getValue(activePatternResult44571)[2].head, getValue(activePatternResult44571)[0].head];
            } else {
              $var97 = [1];
            }
          } else {
            $var97 = [1];
          }
        } else {
          $var97 = [1];
        }
      } else {
        $var97 = [1];
      }
    } else {
      $var97 = [1];
    }
  } else {
    $var97 = [1];
  }

  switch ($var97[0]) {
    case 0:
      return [$var97[2], $var97[4], $var97[3]];

    case 1:
      return null;
  }
}

export { _QueryYieldFrom___ as $7C$QueryYieldFrom$7C$_$7C$ };

function _QuerySelect___(g, _arg1) {
  var expectedValRef;
  let $var98;
  const activePatternResult44575 = (expectedValRef = g.query_select_vref, function (e) {
    return _InstanceMethodApp___(g, expectedValRef, e);
  })(_arg1);

  if (activePatternResult44575 != null) {
    if (getValue(activePatternResult44575)[0].tail != null) {
      if (getValue(activePatternResult44575)[0].tail.tail != null) {
        if (getValue(activePatternResult44575)[0].tail.tail.tail != null) {
          if (getValue(activePatternResult44575)[0].tail.tail.tail.tail == null) {
            if (getValue(activePatternResult44575)[2].tail != null) {
              if (getValue(activePatternResult44575)[2].tail.tail != null) {
                if (getValue(activePatternResult44575)[2].tail.tail.tail == null) {
                  $var98 = [0, getValue(activePatternResult44575)[1], getValue(activePatternResult44575)[0].tail.head, getValue(activePatternResult44575)[0].tail.tail.head, getValue(activePatternResult44575)[2].tail.head, getValue(activePatternResult44575)[2].head, getValue(activePatternResult44575)[0].head];
                } else {
                  $var98 = [1];
                }
              } else {
                $var98 = [1];
              }
            } else {
              $var98 = [1];
            }
          } else {
            $var98 = [1];
          }
        } else {
          $var98 = [1];
        }
      } else {
        $var98 = [1];
      }
    } else {
      $var98 = [1];
    }
  } else {
    $var98 = [1];
  }

  switch ($var98[0]) {
    case 0:
      return [$var98[2], $var98[6], $var98[3], $var98[5], $var98[4]];

    case 1:
      return null;
  }
}

export { _QuerySelect___ as $7C$QuerySelect$7C$_$7C$ };

function _QueryZero___(g, _arg1) {
  var expectedValRef;
  let $var99;
  const activePatternResult44579 = (expectedValRef = g.query_zero_vref, function (e) {
    return _InstanceMethodApp___(g, expectedValRef, e);
  })(_arg1);

  if (activePatternResult44579 != null) {
    if (getValue(activePatternResult44579)[0].tail != null) {
      if (getValue(activePatternResult44579)[0].tail.tail != null) {
        if (getValue(activePatternResult44579)[0].tail.tail.tail == null) {
          $var99 = [0, getValue(activePatternResult44579)[1], getValue(activePatternResult44579)[0].tail.head, getValue(activePatternResult44579)[0].head];
        } else {
          $var99 = [1];
        }
      } else {
        $var99 = [1];
      }
    } else {
      $var99 = [1];
    }
  } else {
    $var99 = [1];
  }

  switch ($var99[0]) {
    case 0:
      return [$var99[2], $var99[3]];

    case 1:
      return null;
  }
}

export { _QueryZero___ as $7C$QueryZero$7C$_$7C$ };

function _AnyRefTupleTrans_(e) {
  var tupInfo;
  const $var100 = e.tag === 11 ? e.data[0].tag === 2 ? (tupInfo = e.data[0].data, !evalTupInfoIsStruct(tupInfo)) ? [0, e.data[2], e.data[3], e.data[0].data, e.data[1]] : [1] : [1] : [1];

  switch ($var100[0]) {
    case 0:
      return [$var100[1], function (es) {
        return new Expr(11, [new TOp(2, $var100[3]), $var100[4], es, $var100[2]]);
      }];

    case 1:
      return [ofArray([e]), function (_arg1) {
        const $var101 = _arg1.tail != null ? _arg1.tail.tail == null ? [0, _arg1.head] : [1] : [1];

        switch ($var101[0]) {
          case 0:
            return $var101[1];

          case 1:
            throw new Error("unreachable");
        }
      }];
  }
}

export { _AnyRefTupleTrans_ as $7C$AnyRefTupleTrans$7C$ };

function _AnyQueryBuilderOpTrans___(g, _arg1) {
  var vref;
  var src;
  var rest;
  var builder;
  var matchValue;
  let $var102;

  if (_arg1.tag === 5) {
    if (_arg1.data[0].tag === 1) {
      if (_arg1.data[3].tail != null) {
        if (_arg1.data[3].tail.tail != null) {
          const activePatternResult44587 = _AnyRefTupleTrans_(_arg1.data[3].tail.head);

          if (activePatternResult44587[0].tail != null) {
            if (_arg1.data[3].tail.tail.tail == null) {
              if (vref = _arg1.data[0].data[0], src = activePatternResult44587[0].head, rest = activePatternResult44587[0].tail, builder = _arg1.data[3].head, matchValue = vref.ApparentEnclosingEntity, matchValue.tag === 1 ? false : tyconRefEq(g, matchValue.data, g.query_builder_tcref)) {
                $var102 = [0, _arg1.data[3].head, _arg1.data[4], activePatternResult44587[1], activePatternResult44587[0].tail, activePatternResult44587[0].head, _arg1.data[2], _arg1.data[0], _arg1.data[0].data[0], _arg1.data[1]];
              } else {
                $var102 = [1];
              }
            } else {
              $var102 = [1];
            }
          } else {
            $var102 = [1];
          }
        } else {
          $var102 = [1];
        }
      } else {
        $var102 = [1];
      }
    } else {
      $var102 = [1];
    }
  } else {
    $var102 = [1];
  }

  switch ($var102[0]) {
    case 0:
      return [$var102[5], function (newSource) {
        return new Expr(5, [$var102[7], $var102[9], $var102[6], ofArray([$var102[1], $var102[3](new List(newSource, $var102[4]))]), $var102[2]]);
      }];

    case 1:
      return null;
  }
}

export { _AnyQueryBuilderOpTrans___ as $7C$AnyQueryBuilderOpTrans$7C$_$7C$ };
export function mkUnitDelayLambda(g, m, e) {
  const patternInput = mkCompGenLocal(m, "unitVar", g.unit_ty);
  return mkLambda(m, patternInput[0], e, tyOfExpr(g, e));
}
export function tryRewriteToSeqCombinators(g, e) {
  const m = Expr_get_Range.bind(e)();

  const activePatternResult44608 = function (_arg1) {
    return _QueryYield___(g, _arg1);
  }(e);

  if (activePatternResult44608 != null) {
    return mkCallSeqSingleton(g, m, getValue(activePatternResult44608)[1], getValue(activePatternResult44608)[2]);
  } else {
    let $var103;

    const activePatternResult44604 = function (_arg1_6) {
      return _QueryYieldFrom___(g, _arg1_6);
    }(e);

    if (activePatternResult44604 != null) {
      const activePatternResult44606 = function (_arg1_7) {
        return _QuerySourceEnumerable___(g, _arg1_7);
      }(getValue(activePatternResult44604)[2]);

      if (activePatternResult44606 != null) {
        $var103 = [0, getValue(activePatternResult44606)[1]];
      } else {
        $var103 = [1];
      }
    } else {
      $var103 = [1];
    }

    switch ($var103[0]) {
      case 0:
        return $var103[1];

      case 1:
        const activePatternResult44602 = function (_arg1_1) {
          return _QuerySelect___(g, _arg1_1);
        }(e);

        if (activePatternResult44602 != null) {
          const matchValue = tryRewriteToSeqCombinators(g, getValue(activePatternResult44602)[3]);

          if (matchValue == null) {
            return null;
          } else {
            return mkCallSeqMap(g, m, getValue(activePatternResult44602)[1], getValue(activePatternResult44602)[2], getValue(activePatternResult44602)[4], getValue(matchValue));
          }
        } else {
          const activePatternResult44600 = function (_arg1_2) {
            return _QueryZero___(g, _arg1_2);
          }(e);

          if (activePatternResult44600 != null) {
            return mkCallSeqEmpty(g, m, getValue(activePatternResult44600)[1]);
          } else {
            let $var104;

            const activePatternResult44596 = function (_arg1_4) {
              return _QueryFor___(g, _arg1_4);
            }(e);

            if (activePatternResult44596 != null) {
              const activePatternResult44598 = function (_arg1_5) {
                return _QuerySourceEnumerable___(g, _arg1_5);
              }(getValue(activePatternResult44596)[3]);

              if (activePatternResult44598 != null) {
                if (getValue(activePatternResult44596)[4].tag === 3) {
                  if (getValue(activePatternResult44596)[4].data[3].tail != null) {
                    if (getValue(activePatternResult44596)[4].data[3].tail.tail == null) {
                      $var104 = [0, getValue(activePatternResult44596)[0], getValue(activePatternResult44596)[4].data[5], getValue(activePatternResult44596)[2], getValue(activePatternResult44596)[4].data[4], getValue(activePatternResult44596)[4].data[3].head, getValue(activePatternResult44598)[1], getValue(activePatternResult44596)[1]];
                    } else {
                      $var104 = [1];
                    }
                  } else {
                    $var104 = [1];
                  }
                } else {
                  $var104 = [1];
                }
              } else {
                $var104 = [1];
              }
            } else {
              $var104 = [1];
            }

            switch ($var104[0]) {
              case 0:
                const matchValue_1 = tryRewriteToSeqCombinators(g, $var104[4]);

                if (matchValue_1 != null) {
                  return mkCallSeqCollect(g, m, $var104[7], $var104[3], mkLambda($var104[2], $var104[5], getValue(matchValue_1), tyOfExpr(g, getValue(matchValue_1))), $var104[6]);
                } else {
                  return null;
                }

              case 1:
                if (e.tag === 7) {
                  const matchValue_2 = tryRewriteToSeqCombinators(g, e.data[1]);

                  if (matchValue_2 == null) {
                    return null;
                  } else {
                    return new Expr(7, [e.data[0], getValue(matchValue_2), e.data[2], newCache()]);
                  }
                } else if (e.tag === 9) {
                  const targets = map_1(function (_arg1_3) {
                    const matchValue_3 = tryRewriteToSeqCombinators(g, _arg1_3.data[1]);

                    if (matchValue_3 != null) {
                      return new DecisionTreeTarget(0, [_arg1_3.data[0], getValue(matchValue_3), _arg1_3.data[2]]);
                    } else {
                      return null;
                    }
                  }, e.data[3], Array);

                  if (targets.every(function (option) {
                    return option != null;
                  })) {
                    const targets_1 = map_1(function (option_1) {
                      return getValue(option_1);
                    }, targets, Array);
                    const ty = pick(function (_arg2) {
                      return tyOfExpr(g, _arg2.data[1]);
                    }, targets_1);
                    return new Expr(9, [e.data[0], e.data[1], e.data[2], targets_1, e.data[4], ty]);
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }

            }
          }
        }

    }
  }
}
export function TryDetectQueryQuoteAndRun(cenv_1, expr) {
  const activePatternResult44634 = function (expr_1) {
    return _QueryRun___(cenv_1.g, expr_1);
  }(expr);

  if (activePatternResult44634 != null) {
    const $var105 = getValue(activePatternResult44634)[0].tag === 12 ? getValue(activePatternResult44634)[0].data[2] ? [0, getValue(activePatternResult44634)[0].data[0]] : [1] : [1];

    switch ($var105[0]) {
      case 0:
        const loopOuter = function (e) {
          var resultElemTy_1;
          var qTy_1;
          var resultElemTy_2;
          var qTy_2;
          var resultElemTy_3;
          var qTy_3;
          var resultElemTy_4;
          var qTy_4;
          var resultElemTy_5;
          var qTy_5;
          var resultElemTy_6;
          var qTy_6;
          var resultElemTy_7;
          var qTy_7;
          var resultElemTy_8;
          var qTy_8;
          var resultElemTy_9;
          var qTy_9;
          var resultElemTy_10;
          var qTy_10;
          var resultElemTy_11;
          var qTy_11;
          var resultElemTy_12;
          var qTy_12;
          var resultElemTy_13;
          var qTy_13;
          var resultElemTy_14;
          var qTy_14;
          var resultElemTy_15;
          var qTy_15;
          let $var106;

          const activePatternResult44617 = function (_arg1_1) {
            return _QueryFor___(cenv_1.g, _arg1_1);
          }(e);

          if (activePatternResult44617 != null) {
            if (resultElemTy_1 = getValue(activePatternResult44617)[2], qTy_1 = getValue(activePatternResult44617)[0], typeEquiv(cenv_1.g, qTy_1, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
              $var106 = [0, getValue(activePatternResult44617)[0], getValue(activePatternResult44617)[2]];
            } else {
              const activePatternResult44618 = function (_arg1_2) {
                return _QuerySelect___(cenv_1.g, _arg1_2);
              }(e);

              if (activePatternResult44618 != null) {
                if (resultElemTy_2 = getValue(activePatternResult44618)[2], qTy_2 = getValue(activePatternResult44618)[0], typeEquiv(cenv_1.g, qTy_2, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                  $var106 = [0, getValue(activePatternResult44618)[0], getValue(activePatternResult44618)[2]];
                } else {
                  const activePatternResult44619 = function (_arg1_3) {
                    return _QueryYield___(cenv_1.g, _arg1_3);
                  }(e);

                  if (activePatternResult44619 != null) {
                    if (resultElemTy_3 = getValue(activePatternResult44619)[1], qTy_3 = getValue(activePatternResult44619)[0], typeEquiv(cenv_1.g, qTy_3, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                      $var106 = [0, getValue(activePatternResult44619)[0], getValue(activePatternResult44619)[1]];
                    } else {
                      const activePatternResult44620 = function (_arg1_4) {
                        return _QueryYieldFrom___(cenv_1.g, _arg1_4);
                      }(e);

                      if (activePatternResult44620 != null) {
                        if (resultElemTy_4 = getValue(activePatternResult44620)[1], qTy_4 = getValue(activePatternResult44620)[0], typeEquiv(cenv_1.g, qTy_4, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                          $var106 = [0, getValue(activePatternResult44620)[0], getValue(activePatternResult44620)[1]];
                        } else {
                          $var106 = [1];
                        }
                      } else {
                        $var106 = [1];
                      }
                    }
                  } else {
                    const activePatternResult44621 = function (_arg1_5) {
                      return _QueryYieldFrom___(cenv_1.g, _arg1_5);
                    }(e);

                    if (activePatternResult44621 != null) {
                      if (resultElemTy_5 = getValue(activePatternResult44621)[1], qTy_5 = getValue(activePatternResult44621)[0], typeEquiv(cenv_1.g, qTy_5, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                        $var106 = [0, getValue(activePatternResult44621)[0], getValue(activePatternResult44621)[1]];
                      } else {
                        $var106 = [1];
                      }
                    } else {
                      $var106 = [1];
                    }
                  }
                }
              } else {
                const activePatternResult44622 = function (_arg1_6) {
                  return _QueryYield___(cenv_1.g, _arg1_6);
                }(e);

                if (activePatternResult44622 != null) {
                  if (resultElemTy_6 = getValue(activePatternResult44622)[1], qTy_6 = getValue(activePatternResult44622)[0], typeEquiv(cenv_1.g, qTy_6, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                    $var106 = [0, getValue(activePatternResult44622)[0], getValue(activePatternResult44622)[1]];
                  } else {
                    const activePatternResult44623 = function (_arg1_7) {
                      return _QueryYieldFrom___(cenv_1.g, _arg1_7);
                    }(e);

                    if (activePatternResult44623 != null) {
                      if (resultElemTy_7 = getValue(activePatternResult44623)[1], qTy_7 = getValue(activePatternResult44623)[0], typeEquiv(cenv_1.g, qTy_7, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                        $var106 = [0, getValue(activePatternResult44623)[0], getValue(activePatternResult44623)[1]];
                      } else {
                        $var106 = [1];
                      }
                    } else {
                      $var106 = [1];
                    }
                  }
                } else {
                  const activePatternResult44624 = function (_arg1_8) {
                    return _QueryYieldFrom___(cenv_1.g, _arg1_8);
                  }(e);

                  if (activePatternResult44624 != null) {
                    if (resultElemTy_8 = getValue(activePatternResult44624)[1], qTy_8 = getValue(activePatternResult44624)[0], typeEquiv(cenv_1.g, qTy_8, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                      $var106 = [0, getValue(activePatternResult44624)[0], getValue(activePatternResult44624)[1]];
                    } else {
                      $var106 = [1];
                    }
                  } else {
                    $var106 = [1];
                  }
                }
              }
            }
          } else {
            const activePatternResult44625 = function (_arg1_9) {
              return _QuerySelect___(cenv_1.g, _arg1_9);
            }(e);

            if (activePatternResult44625 != null) {
              if (resultElemTy_9 = getValue(activePatternResult44625)[2], qTy_9 = getValue(activePatternResult44625)[0], typeEquiv(cenv_1.g, qTy_9, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                $var106 = [0, getValue(activePatternResult44625)[0], getValue(activePatternResult44625)[2]];
              } else {
                const activePatternResult44626 = function (_arg1_10) {
                  return _QueryYield___(cenv_1.g, _arg1_10);
                }(e);

                if (activePatternResult44626 != null) {
                  if (resultElemTy_10 = getValue(activePatternResult44626)[1], qTy_10 = getValue(activePatternResult44626)[0], typeEquiv(cenv_1.g, qTy_10, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                    $var106 = [0, getValue(activePatternResult44626)[0], getValue(activePatternResult44626)[1]];
                  } else {
                    const activePatternResult44627 = function (_arg1_11) {
                      return _QueryYieldFrom___(cenv_1.g, _arg1_11);
                    }(e);

                    if (activePatternResult44627 != null) {
                      if (resultElemTy_11 = getValue(activePatternResult44627)[1], qTy_11 = getValue(activePatternResult44627)[0], typeEquiv(cenv_1.g, qTy_11, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                        $var106 = [0, getValue(activePatternResult44627)[0], getValue(activePatternResult44627)[1]];
                      } else {
                        $var106 = [1];
                      }
                    } else {
                      $var106 = [1];
                    }
                  }
                } else {
                  const activePatternResult44628 = function (_arg1_12) {
                    return _QueryYieldFrom___(cenv_1.g, _arg1_12);
                  }(e);

                  if (activePatternResult44628 != null) {
                    if (resultElemTy_12 = getValue(activePatternResult44628)[1], qTy_12 = getValue(activePatternResult44628)[0], typeEquiv(cenv_1.g, qTy_12, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                      $var106 = [0, getValue(activePatternResult44628)[0], getValue(activePatternResult44628)[1]];
                    } else {
                      $var106 = [1];
                    }
                  } else {
                    $var106 = [1];
                  }
                }
              }
            } else {
              const activePatternResult44629 = function (_arg1_13) {
                return _QueryYield___(cenv_1.g, _arg1_13);
              }(e);

              if (activePatternResult44629 != null) {
                if (resultElemTy_13 = getValue(activePatternResult44629)[1], qTy_13 = getValue(activePatternResult44629)[0], typeEquiv(cenv_1.g, qTy_13, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                  $var106 = [0, getValue(activePatternResult44629)[0], getValue(activePatternResult44629)[1]];
                } else {
                  const activePatternResult44630 = function (_arg1_14) {
                    return _QueryYieldFrom___(cenv_1.g, _arg1_14);
                  }(e);

                  if (activePatternResult44630 != null) {
                    if (resultElemTy_14 = getValue(activePatternResult44630)[1], qTy_14 = getValue(activePatternResult44630)[0], typeEquiv(cenv_1.g, qTy_14, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                      $var106 = [0, getValue(activePatternResult44630)[0], getValue(activePatternResult44630)[1]];
                    } else {
                      $var106 = [1];
                    }
                  } else {
                    $var106 = [1];
                  }
                }
              } else {
                const activePatternResult44631 = function (_arg1_15) {
                  return _QueryYieldFrom___(cenv_1.g, _arg1_15);
                }(e);

                if (activePatternResult44631 != null) {
                  if (resultElemTy_15 = getValue(activePatternResult44631)[1], qTy_15 = getValue(activePatternResult44631)[0], typeEquiv(cenv_1.g, qTy_15, mkAppTy(cenv_1.g.tcref_System_Collections_IEnumerable, new List()))) {
                    $var106 = [0, getValue(activePatternResult44631)[0], getValue(activePatternResult44631)[1]];
                  } else {
                    $var106 = [1];
                  }
                } else {
                  $var106 = [1];
                }
              }
            }
          }

          switch ($var106[0]) {
            case 0:
              const matchValue = tryRewriteToSeqCombinators(cenv_1.g, e);

              if (matchValue == null) {
                return [e, null];
              } else {
                return [mkCallSeq(cenv_1.g, Expr_get_Range.bind(getValue(matchValue))(), $var106[2], mkCallSeqDelay(cenv_1.g, Expr_get_Range.bind(getValue(matchValue))(), $var106[2], mkUnitDelayLambda(cenv_1.g, Expr_get_Range.bind(getValue(matchValue))(), getValue(matchValue)))), [$var106[2], $var106[1]]];
              }

            case 1:
              const activePatternResult44612 = function (_arg1) {
                return _AnyQueryBuilderOpTrans___(cenv_1.g, _arg1);
              }(e);

              if (activePatternResult44612 != null) {
                const matchValue_1 = loopOuter(getValue(activePatternResult44612)[0]);

                if (matchValue_1 == null) {
                  return null;
                } else {
                  const newSeqSourceIsEnumerableInfo = getValue(matchValue_1)[1];
                  const newSeqSource = getValue(matchValue_1)[0];
                  let newSeqSourceAsQuerySource;

                  if (newSeqSourceIsEnumerableInfo == null) {
                    newSeqSourceAsQuerySource = newSeqSource;
                  } else {
                    const resultElemTy = getValue(newSeqSourceIsEnumerableInfo)[0];
                    const qTy = getValue(newSeqSourceIsEnumerableInfo)[1];
                    newSeqSourceAsQuerySource = mkCallNewQuerySource(cenv_1.g, Expr_get_Range.bind(newSeqSource)(), resultElemTy, qTy, newSeqSource);
                  }

                  return [getValue(activePatternResult44612)[1](newSeqSourceAsQuerySource), null];
                }
              } else {
                return null;
              }

          }
        };

        const resultExprInfo = loopOuter($var105[1]);

        if (resultExprInfo == null) {
          return null;
        } else {
          const resultExpr = getValue(resultExprInfo)[0];
          const exprIsEnumerableInfo = getValue(resultExprInfo)[1];
          let resultExprAfterConvertToResultTy;
          const matchValue_2 = [getValue(activePatternResult44634)[1], exprIsEnumerableInfo];
          const $var107 = matchValue_2[0] == null ? matchValue_2[1] != null ? [2, getValue(matchValue_2[1])[1], getValue(matchValue_2[1])[0]] : [0] : matchValue_2[1] == null ? [1, getValue(matchValue_2[0])] : [0];

          switch ($var107[0]) {
            case 0:
              resultExprAfterConvertToResultTy = resultExpr;
              break;

            case 1:
              resultExprAfterConvertToResultTy = mkCallGetQuerySourceAsEnumerable(cenv_1.g, Expr_get_Range.bind(expr)(), $var107[1], new TType(1, [cenv_1.g.tcref_System_Collections_IEnumerable, new List()]), resultExpr);
              break;

            case 2:
              resultExprAfterConvertToResultTy = mkCallNewQuerySource(cenv_1.g, Expr_get_Range.bind(expr)(), $var107[2], $var107[1], resultExpr);
              break;
          }

          return resultExprAfterConvertToResultTy;
        }

      case 1:
        return null;
    }
  } else {
    return null;
  }
}
export function OptimizeExpr(cenv_1, env, expr) {
  var f;
  var mapping;
  var TotalSize;
  var FunctionSize;
  var HasEffect;
  var MightMakeCriticalTailcall;

  OptimizeExpr: while (true) {
    const expr_1 = NormalizeAndAdjustPossibleSubsumptionExprs(cenv_1.g, expr);
    const expr_2 = stripExpr(expr_1);

    switch (expr_2.tag) {
      case 7:
        return OptimizeLinearExpr(cenv_1, env, expr_2, function (x) {
          return x;
        });

      case 0:
        return OptimizeConst(cenv_1, env, expr_2, expr_2.data[0], expr_2.data[1], expr_2.data[2]);

      case 1:
        return OptimizeVal(cenv_1, env, expr_2, expr_2.data[0], expr_2.data[2]);

      case 12:
        const splices = {
          contents: defaultArg(expr_2.data[1].contents, null, (f = (mapping = $var108 => function (tuple) {
            return tuple[0];
          }(function (expr_3) {
            return OptimizeExpr(cenv_1, env, expr_3);
          }($var108)), function (list) {
            return map_2(mapping, list);
          }), function (tupledArg) {
            return map3Of4(f, tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3]);
          }))
        };
        return [new Expr(12, [expr_2.data[0], splices, expr_2.data[2], expr_2.data[3], expr_2.data[4]]), new Summary(new ExprValueInfo(0), 1, 10, false, false)];

      case 8:
        return OptimizeObjectExpr(cenv_1, env, expr_2.data[1], expr_2.data[2], expr_2.data[3], expr_2.data[4], expr_2.data[5], expr_2.data[6]);

      case 11:
        return OptimizeExprOp(cenv_1, env, expr_2.data[0], expr_2.data[1], expr_2.data[2], expr_2.data[3]);

      case 5:
        const matchValue = TryDetectQueryQuoteAndRun(cenv_1, expr_2);

        if (matchValue == null) {
          return OptimizeApplication(cenv_1, env, expr_2.data[0], expr_2.data[1], expr_2.data[2], expr_2.data[3], expr_2.data[4]);
        } else {
          cenv_1 = cenv_1;
          env = env;
          expr = getValue(matchValue);
          continue OptimizeExpr;
        }

      case 3:
        const topValInfo = new ValReprInfo(0, [new List(), ofArray([map_2(function (_arg1) {
          return ValReprInfoModule.unnamedTopArg1;
        }, expr_2.data[3])]), ValReprInfoModule.unnamedRetVal]);
        const ty = mkMultiLambdaTy(expr_2.data[5], expr_2.data[3], expr_2.data[6]);
        return OptimizeLambdas(null, cenv_1, env, topValInfo, expr_2, ty);

      case 4:
        const topValInfo_1 = new ValReprInfo(0, [ValReprInfoModule.InferTyparInfo(expr_2.data[1]), new List(), ValReprInfoModule.unnamedRetVal]);
        const ty_1 = tryMkForallTy(expr_2.data[1], expr_2.data[4]);
        return OptimizeLambdas(null, cenv_1, env, topValInfo_1, expr_2, ty_1);

      case 13:
        const $var188 = cenv_1;
        env = env;
        expr = ChooseTyparSolutionsForFreeChoiceTypars(cenv_1.g, cenv_1.amap, expr_2);
        cenv_1 = $var188;
        continue OptimizeExpr;

      case 9:
        return OptimizeMatch(cenv_1, env, expr_2.data[0], expr_2.data[1], expr_2.data[2], expr_2.data[3], expr_2.data[4], expr_2.data[5]);

      case 6:
        return OptimizeLetRec(cenv_1, env, expr_2.data[0], expr_2.data[1], expr_2.data[2]);

      case 10:
        const patternInput = OptimizeExpr(cenv_1, env, expr_2.data[1]);
        const patternInput_1 = OptimizeExpr(cenv_1, env, expr_2.data[2]);
        return [new Expr(10, [expr_2.data[0], patternInput[0], patternInput_1[0], expr_2.data[3]]), (TotalSize = (patternInput[1].TotalSize < patternInput_1[1].TotalSize ? patternInput[1].TotalSize : patternInput_1[1].TotalSize) | 0, FunctionSize = (patternInput[1].FunctionSize < patternInput_1[1].FunctionSize ? patternInput[1].FunctionSize : patternInput_1[1].FunctionSize) | 0, HasEffect = patternInput[1].HasEffect ? true : patternInput_1[1].HasEffect, MightMakeCriticalTailcall = patternInput[1].MightMakeCriticalTailcall ? true : patternInput_1[1].MightMakeCriticalTailcall, new Summary(new ExprValueInfo(0), FunctionSize, TotalSize, HasEffect, MightMakeCriticalTailcall))];

      case 14:
        throw new Error("Unexpected reclink");

      default:
        return OptimizeLinearExpr(cenv_1, env, expr_2, function (x_1) {
          return x_1;
        });
    }
  }
}
export function OptimizeObjectExpr(cenv_1, env, typ, baseValOpt, basecall, overrides, iimpls, m) {
  var TotalSize;
  const patternInput = OptimizeExpr(cenv_1, env, basecall);
  const patternInput_1 = OptimizeMethods(cenv_1, env, baseValOpt, overrides);
  const patternInput_2 = OptimizeInterfaceImpls(cenv_1, env, baseValOpt, iimpls);
  const expr_ = mkObjExpr(typ, baseValOpt, patternInput[0], patternInput_1[0], patternInput_2[0], m);
  return [expr_, (TotalSize = 10 + patternInput[1].TotalSize + sumBy(function (x) {
    return x.TotalSize;
  }, patternInput_1[1]) + sumBy(function (x_1) {
    return x_1.TotalSize;
  }, patternInput_2[1]) | 0, new Summary(new ExprValueInfo(0), 1, TotalSize, true, false))];
}
export function OptimizeMethods(cenv_1, env, baseValOpt, l) {
  return OptimizeList(function (arg30_) {
    return OptimizeMethod(cenv_1, env, baseValOpt, arg30_);
  }, l);
}
export function OptimizeMethod(cenv_1, env, baseValOpt, _arg1) {
  let env_1;
  const latestBoundId = _arg1.Id;
  const functionVal = null;
  env_1 = new IncrementalOptimizationEnv(latestBoundId, env.dontInline, env.dontSplitVars, env.inLoop, functionVal, env.typarInfos, env.localExternalVals, env.globalModuleInfos);
  const env_2 = BindTypeVarsToUnknown(_arg1.data[2], env_1);
  let env_3;
  cenv_1;
  _arg1.data[3];
  env_3 = env_2;
  const env_5 = foldBack(function (v, env_4) {
    cenv_1;
    v;
    return env_4;
  }, defaultArg(baseValOpt, [], $var109 => [$var109]), env_3);
  const patternInput = OptimizeExpr(cenv_1, env_5, _arg1.data[4]);
  return [new ObjExprMethod(0, [_arg1.data[0], _arg1.data[1], _arg1.data[2], _arg1.data[3], patternInput[0], _arg1.data[5]]), new Summary(new ExprValueInfo(0), 0, patternInput[1].TotalSize, false, false)];
}
export function OptimizeInterfaceImpls(cenv_1, env, baseValOpt, l) {
  return OptimizeList(function (tupledArg) {
    return OptimizeInterfaceImpl(cenv_1, env, baseValOpt, tupledArg[0], tupledArg[1]);
  }, l);
}
export function OptimizeInterfaceImpl(cenv_1, env, baseValOpt, ty, overrides) {
  var TotalSize;
  const patternInput = OptimizeMethods(cenv_1, env, baseValOpt, overrides);
  return [[ty, patternInput[0]], (TotalSize = sumBy(function (x) {
    return x.TotalSize;
  }, patternInput[1]) | 0, new Summary(new ExprValueInfo(0), 1, TotalSize, false, false))];
}
export function OptimizeExprOp(cenv_1, env, op, tyargs, args, m) {
  var mref;
  var arg;

  var _tys;

  var _methTypeArgs;

  var _enclTypeArgs;

  var TotalSize;
  var FunctionSize;
  var HasEffect;
  var ty;
  var a;
  const matchValue = [op, tyargs, args];
  const $var110 = matchValue[0].tag === 24 ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [0, matchValue[2].head, matchValue[1].tail.head, matchValue[1].head] : [8] : [8] : [8] : [8] : [8] : matchValue[0].tag === 30 ? matchValue[0].data[0].tag === 0 ? [1, matchValue[0].data[1]] : [8] : matchValue[0].tag === 6 ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail == null ? [2, matchValue[2].head.data[4], matchValue[2].tail.head.data[4], matchValue[0].data[1], matchValue[0].data[0]] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : matchValue[0].tag === 7 ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail != null ? matchValue[2].tail.tail.head.tag === 3 ? matchValue[2].tail.tail.head.data[3].tail != null ? matchValue[2].tail.tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail.tail == null ? [3, matchValue[0].data[1], matchValue[2].head.data[4], matchValue[2].tail.head.data[4], matchValue[2].tail.tail.head.data[4], matchValue[0].data[0], matchValue[2].tail.tail.head.data[3].head] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : matchValue[0].tag === 9 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail == null ? [4, matchValue[2].head.data[4], matchValue[2].tail.head.data[4], matchValue[1].head, matchValue[0].data[1], matchValue[0].data[0]] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : matchValue[0].tag === 8 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail != null ? matchValue[2].tail.tail.head.tag === 3 ? matchValue[2].tail.tail.head.data[3].tail != null ? matchValue[2].tail.tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail.tail == null ? [5, matchValue[2].head.data[4], matchValue[2].tail.head.data[4], matchValue[2].tail.tail.head.data[4], matchValue[1].head, matchValue[0].data[0], matchValue[0].data[1], matchValue[2].tail.head.data[3].head, matchValue[2].tail.tail.head.data[3].head] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : [8] : matchValue[0].tag === 29 ? matchValue[1].tail == null ? [6, matchValue[2], matchValue[0].data] : [8] : matchValue[0].tag === 31 ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (mref = matchValue[0].data[7], arg = matchValue[2].head, _tys = matchValue[0].data[10], _methTypeArgs = matchValue[0].data[9], _enclTypeArgs = matchValue[0].data[8], (((mref.DeclaringTypeRef.Scope.IsAssemblyRef ? mref.DeclaringTypeRef.Scope.AssemblyRef.Name === cenv_1.g.ilg.typ_Array.TypeRef.Scope.AssemblyRef.Name : false) ? mref.DeclaringTypeRef.Name === cenv_1.g.ilg.typ_Array.TypeRef.Name : false) ? mref.Name === "get_Length" : false) ? isArray1DTy(cenv_1.g, tyOfExpr(cenv_1.g, arg)) : false) ? [7, matchValue[0].data[8], matchValue[0].data[9], matchValue[0].data[10], matchValue[2].head, matchValue[0].data[7]] : [8] : [8] : [8] : [8];

  switch ($var110[0]) {
    case 0:
      const patternInput = OptimizeExpr(cenv_1, env, $var110[1]);

      if (typeEquiv(cenv_1.g, $var110[3], $var110[2])) {
        return [patternInput[0], patternInput[1]];
      } else {
        return [mkCoerceExpr(patternInput[0], $var110[3], m, $var110[2]), (TotalSize = patternInput[1].TotalSize + 1 | 0, FunctionSize = patternInput[1].FunctionSize + 1 | 0, new Summary(new ExprValueInfo(0), FunctionSize, TotalSize, true, false))];
      }

    case 1:
      const patternInput_1 = OptimizeExpr(cenv_1, env, exprForValRef(m, $var110[1]));
      let op_;
      const $var111 = patternInput_1[0].tag === 1 ? !patternInput_1[0].data[0].IsCompiledAsTopLevel ? [0, patternInput_1[0].data[0]] : [1] : [1];

      switch ($var111[0]) {
        case 0:
          op_ = new TOp(30, [new LValueOperation(0), $var111[1]]);
          break;

        case 1:
          op_ = op;
          break;
      }

      return [new Expr(11, [op_, tyargs, args, m]), (HasEffect = OpHasEffect(cenv_1.g, op_), new Summary(new ExprValueInfo(0), 1, 1, HasEffect, false))];

    case 2:
      return OptimizeWhileLoop(cenv_1, new IncrementalOptimizationEnv(env.latestBoundId, env.dontInline, env.dontSplitVars, true, env.functionVal, env.typarInfos, env.localExternalVals, env.globalModuleInfos), $var110[4], $var110[3], $var110[1], $var110[2], m);

    case 3:
      return OptimizeFastIntegerForLoop(cenv_1, new IncrementalOptimizationEnv(env.latestBoundId, env.dontInline, env.dontSplitVars, true, env.functionVal, env.typarInfos, env.localExternalVals, env.globalModuleInfos), $var110[5], $var110[6], $var110[2], $var110[1], $var110[3], $var110[4], m);

    case 4:
      return OptimizeTryFinally(cenv_1, env, $var110[5], $var110[4], $var110[1], $var110[2], m, $var110[3]);

    case 5:
      return OptimizeTryCatch(cenv_1, env, $var110[1], $var110[7], $var110[2], $var110[8], $var110[3], m, $var110[4], $var110[5], $var110[6]);

    case 6:
      return OptimizeTraitCall(cenv_1, env, $var110[2], $var110[1], m);

    case 7:
      return OptimizeExpr(cenv_1, env, new Expr(11, [new TOp(22, [i_ldlen, ofArray([cenv_1.g.int_ty])]), new List(), ofArray([$var110[4]]), m]));

    case 8:
      const $var112 = matchValue[0].tag === 22 ? matchValue[0].data[0].tail == null ? matchValue[0].data[1].tail != null ? matchValue[0].data[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? (ty = matchValue[0].data[1].head, a = matchValue[2].head, typeEquiv(cenv_1.g, tyOfExpr(cenv_1.g, a), ty)) ? [0, matchValue[2].head, matchValue[0].data[1].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

      switch ($var112[0]) {
        case 0:
          return OptimizeExpr(cenv_1, env, $var112[1]);

        case 1:
          const patternInput_2 = OptimizeExprsThenConsiderSplits(cenv_1, env, args);
          let knownValue;
          const matchValue_1 = [op, patternInput_2[1]];
          const $var113 = matchValue_1[0].tag === 12 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? [0, matchValue_1[1].head, matchValue_1[0].data] : [3] : [3] : matchValue_1[0].tag === 21 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? [1, matchValue_1[1].head, matchValue_1[0].data[1], matchValue_1[0].data[0]] : [3] : [3] : matchValue_1[0].tag === 16 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? [2, matchValue_1[0].data[0], matchValue_1[1].head, matchValue_1[0].data[1]] : [3] : [3] : [3];

          switch ($var113[0]) {
            case 0:
              knownValue = TryOptimizeRecordFieldGet(cenv_1, env, $var113[1], $var113[2], tyargs, m);
              break;

            case 1:
              knownValue = TryOptimizeTupleFieldGet(cenv_1, env, $var113[3], $var113[1], tyargs, $var113[2], m);
              break;

            case 2:
              knownValue = TryOptimizeUnionCaseGet(cenv_1, env, $var113[2], $var113[1], tyargs, $var113[3], m);
              break;

            case 3:
              knownValue = null;
              break;
          }

          if (knownValue == null) {
            return OptimizeExprOpFallback(cenv_1, env, op, tyargs, patternInput_2[0], m, patternInput_2[1], new ExprValueInfo(0));
          } else {
            const matchValue_2 = TryOptimizeVal(cenv_1, env, false, getValue(knownValue), m);

            if (matchValue_2 == null) {
              return OptimizeExprOpFallback(cenv_1, env, op, tyargs, patternInput_2[0], m, patternInput_2[1], getValue(knownValue));
            } else {
              return OptimizeExpr(cenv_1, env, getValue(matchValue_2));
            }
          }

      }

  }
}
export function OptimizeExprOpFallback(cenv_1, env, op, tyargs, args_, m, arginfos, valu) {
  var TotalSize_1;
  var FunctionSize_1;
  var HasEffect_1;
  const argsTSize = sumBy(function (x) {
    return x.TotalSize;
  }, arginfos) | 0;
  const argsFSize = sumBy(function (x_1) {
    return x_1.FunctionSize;
  }, arginfos) | 0;
  const argEffects = exists(function (x_2) {
    return x_2.HasEffect;
  }, arginfos);
  const argValues = map_2(function (x_3) {
    return x_3.Info;
  }, arginfos);
  const effect = OpHasEffect(cenv_1.g, op);
  let patternInput;

  switch (op.tag) {
    case 1:
      patternInput = [2, valu];
      break;

    case 2:
      const isStruct = evalTupInfoIsStruct(op.data);

      if (isStruct) {
        patternInput = [0, valu];
      } else {
        patternInput = [1, MakeValueInfoForTuple(Array.from(argValues))];
      }

      break;

    case 12:
    case 21:
    case 16:
    case 19:
    case 14:
      patternInput = [1, valu];
      break;

    case 15:
      let valu_1;
      const matchValue = item(0, argValues);

      const activePatternResult44665 = _StripUnionCaseValue___(matchValue);

      if (activePatternResult44665 != null) {
        valu_1 = new ExprValueInfo(5, [getValue(activePatternResult44665)[0], getValue(activePatternResult44665)[1]]);
      } else {
        valu_1 = valu;
      }

      patternInput = [0, valu_1];
      break;

    case 22:
      patternInput = [op.data[0].length < 1 ? op.data[0].length : 1, mkAssemblyCodeValueInfo(cenv_1.g, op.data[0], argValues, op.data[1])];
      break;

    case 4:
      patternInput = [~~(op.data.length / 10), valu];
      break;

    case 5:
      patternInput = [~~(op.data.length / 10), valu];
      break;

    case 13:
    case 3:
    case 7:
    case 6:
    case 8:
    case 9:
    case 31:
    case 29:
    case 30:
    case 11:
    case 18:
    case 23:
    case 24:
    case 25:
    case 17:
    case 20:
      patternInput = [1, valu];
      break;

    case 10:
      const finfos = op.data[1].AllInstanceFieldsAsList;
      const valu_2 = op.data[0].tag === 1 ? argValues.length !== finfos.length ? valu : MakeValueInfoForRecord(op.data[1], Array.from(toList(map2(function (x_4, f) {
        return f.IsMutable ? new ExprValueInfo(0) : x_4;
      }, argValues, finfos)))) : new ExprValueInfo(0);
      patternInput = [2, valu_2];
      break;

    case 27:
    case 28:
    case 26:
      patternInput = error(new InternalError("unexpected goto/label/return in optimization", m));
      break;

    default:
      patternInput = [2, MakeValueInfoForUnionCase(op.data, Array.from(argValues))];
  }

  const mayBeCriticalTailcall = op.tag === 31 ? !op.data[2] ? op.data[0] : false : false;
  let vinfo;
  const TotalSize = argsTSize + patternInput[0] | 0;
  const FunctionSize = argsFSize + patternInput[0] | 0;
  const HasEffect = argEffects ? true : effect;
  vinfo = new Summary(patternInput[1], FunctionSize, TotalSize, HasEffect, mayBeCriticalTailcall);
  const matchValue_1 = TryOptimizeValInfo(cenv_1, env, m, vinfo);

  if (matchValue_1 == null) {
    return [new Expr(11, [op, tyargs, args_, m]), (TotalSize_1 = argsTSize + patternInput[0] | 0, FunctionSize_1 = argsFSize + patternInput[0] | 0, HasEffect_1 = argEffects ? true : effect, new Summary(patternInput[1], FunctionSize_1, TotalSize_1, HasEffect_1, mayBeCriticalTailcall))];
  } else {
    return [getValue(matchValue_1), vinfo];
  }
}
export function OptimizeConst(cenv_1, env, expr, c, m, ty) {
  var TotalSize;
  const matchValue = TryEliminateDesugaredConstants(cenv_1.g, m, c);

  if (matchValue == null) {
    return [expr, (TotalSize = (c.tag === 14 ? ~~(c.data.length / 10) : 0) | 0, new Summary(MakeValueInfoForConst(c, ty), 0, TotalSize, false, false))];
  } else {
    return OptimizeExpr(cenv_1, env, getValue(matchValue));
  }
}
export function TryOptimizeRecordFieldGet(cenv_1, _env, e1info, _arg2, _tinst, m) {
  const matchValue = destRecdValue(e1info.Info);
  const $var114 = matchValue != null ? (cenv_1.settings.EliminateRecdFieldGet() ? !e1info.HasEffect : false) ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var114[0]) {
    case 0:
      const matchValue_1 = TryFindFSharpAttribute(cenv_1.g, cenv_1.g.attrib_CLIMutableAttribute, _arg2.data[0].Attribs);

      if (matchValue_1 == null) {
        const n = _arg2.Index | 0;

        if (n >= $var114[1].length) {
          errorR(new InternalError("TryOptimizeRecordFieldGet: term argument out of range", m));
        }

        return $var114[1][n];
      } else {
        return null;
      }

    case 1:
      return null;
  }
}
export function TryOptimizeTupleFieldGet(cenv_1, _env, _tupInfo, e1info, tys, n, m) {
  const matchValue = destTupleValue(e1info.Info);
  const $var115 = matchValue != null ? (cenv_1.settings.EliminateTupleFieldGet() ? !e1info.HasEffect : false) ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var115[0]) {
    case 0:
      const len = $var115[1].length | 0;

      if (len !== tys.length) {
        errorR(new InternalError("error: tuple lengths don't match", m));
      }

      if (n >= len) {
        errorR(new InternalError("TryOptimizeTupleFieldGet: tuple index out of range", m));
      }

      return $var115[1][n];

    case 1:
      return null;
  }
}
export function TryOptimizeUnionCaseGet(cenv_1, _env, e1info, cspec, _tys, n, m) {
  var cspec2;
  var args;
  let $var116;

  const activePatternResult44685 = _StripUnionCaseValue___(e1info.Info);

  if (activePatternResult44685 != null) {
    if (cspec2 = getValue(activePatternResult44685)[0], args = getValue(activePatternResult44685)[1], (cenv_1.settings.EliminatUnionCaseFieldGet() ? !e1info.HasEffect : false) ? function (arg00, arg10) {
      return cenv_1.g.unionCaseRefEq(arg00, arg10);
    }(cspec, cspec2) : false) {
      $var116 = [0, getValue(activePatternResult44685)[1], getValue(activePatternResult44685)[0]];
    } else {
      $var116 = [1];
    }
  } else {
    $var116 = [1];
  }

  switch ($var116[0]) {
    case 0:
      if (n >= $var116[1].length) {
        errorR(new InternalError("TryOptimizeUnionCaseGet: term argument out of range", m));
      }

      return $var116[1][n];

    case 1:
      return null;
  }
}
export function OptimizeFastIntegerForLoop(cenv_1, env, spStart, v, e1, dir, e2, e3, m) {
  var arre;
  var arre_1;
  var n;
  var TotalSize;
  var FunctionSize;
  const patternInput = OptimizeExpr(cenv_1, env, e1);
  const patternInput_1 = OptimizeExpr(cenv_1, env, e2);
  let env_1;
  cenv_1;
  v;
  env_1 = env;
  const patternInput_2 = OptimizeExpr(cenv_1, env_1, e3);
  let patternInput_3;
  const matchValue = [dir, patternInput_1[0]];
  const $var117 = matchValue[0].tag === 0 ? matchValue[1].tag === 11 ? matchValue[1].data[0].tag === 22 ? matchValue[1].data[0].data[0].tail != null ? matchValue[1].data[0].data[0].head.tag === 22 ? matchValue[1].data[0].data[0].tail.tail == null ? matchValue[1].data[2].tail != null ? matchValue[1].data[2].head.tag === 11 ? matchValue[1].data[2].head.data[0].tag === 22 ? matchValue[1].data[2].head.data[0].data[0].tail != null ? matchValue[1].data[2].head.data[0].data[0].head.tag === 84 ? matchValue[1].data[2].head.data[0].data[0].tail.tail != null ? matchValue[1].data[2].head.data[0].data[0].tail.head.tag === 11 ? matchValue[1].data[2].head.data[0].data[0].tail.head.data.tag === 5 ? matchValue[1].data[2].head.data[0].data[0].tail.tail.tail == null ? matchValue[1].data[2].head.data[2].tail != null ? matchValue[1].data[2].head.data[2].tail.tail == null ? matchValue[1].data[2].tail.tail != null ? matchValue[1].data[2].tail.head.tag === 0 ? matchValue[1].data[2].tail.head.data[0].tag === 5 ? matchValue[1].data[2].tail.head.data[0].data === 1 ? matchValue[1].data[2].tail.tail.tail == null ? (arre = matchValue[1].data[2].head.data[2].head, !OptimizeExpr(cenv_1, env_1, arre)[1].HasEffect) ? [0, matchValue[1].data[2].head.data[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : matchValue[1].data[0].data[0].head.tag === 23 ? matchValue[1].data[0].data[0].tail.tail == null ? matchValue[1].data[2].tail != null ? matchValue[1].data[2].head.tag === 11 ? matchValue[1].data[2].head.data[0].tag === 22 ? matchValue[1].data[2].head.data[0].data[0].tail != null ? matchValue[1].data[2].head.data[0].data[0].head.tag === 84 ? matchValue[1].data[2].head.data[0].data[0].tail.tail != null ? matchValue[1].data[2].head.data[0].data[0].tail.head.tag === 11 ? matchValue[1].data[2].head.data[0].data[0].tail.head.data.tag === 5 ? matchValue[1].data[2].head.data[0].data[0].tail.tail.tail == null ? matchValue[1].data[2].head.data[2].tail != null ? matchValue[1].data[2].head.data[2].tail.tail == null ? matchValue[1].data[2].tail.tail != null ? matchValue[1].data[2].tail.head.tag === 0 ? matchValue[1].data[2].tail.head.data[0].tag === 5 ? matchValue[1].data[2].tail.head.data[0].data === 1 ? matchValue[1].data[2].tail.tail.tail == null ? (arre_1 = matchValue[1].data[2].head.data[2].head, !OptimizeExpr(cenv_1, env_1, arre_1)[1].HasEffect) ? [0, matchValue[1].data[2].head.data[2].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var117[0]) {
    case 0:
      patternInput_3 = [mkLdlen(cenv_1.g, Expr_get_Range.bind(patternInput_1[0])(), $var117[1]), new ForLoopStyle(2)];
      break;

    case 1:
      const $var118 = matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 5 ? (n = matchValue[1].data[0].data | 0, n < 2147483647) ? [0, matchValue[1].data[0].data] : [1] : [1] : [1] : [1];

      switch ($var118[0]) {
        case 0:
          patternInput_3 = [mkIncr(cenv_1.g, Expr_get_Range.bind(patternInput_1[0])(), patternInput_1[0]), new ForLoopStyle(2)];
          break;

        case 1:
          patternInput_3 = [patternInput_1[0], dir];
          break;
      }

      break;
  }

  const einfos = ofArray([patternInput[1], patternInput_1[1], patternInput_2[1]]);
  const eff = exists(function (x) {
    return x.HasEffect;
  }, einfos);

  if (!eff) {
    return [mkUnit(cenv_1.g, m), new Summary(new ExprValueInfo(0), 0, 0, false, false)];
  } else {
    const expr_ = mkFor(cenv_1.g, spStart, v, patternInput[0], patternInput_3[1], patternInput_3[0], patternInput_2[0], m);
    return [expr_, (TotalSize = sumBy(function (x_1) {
      return x_1.TotalSize;
    }, einfos) + 5 | 0, FunctionSize = sumBy(function (x_2) {
      return x_2.FunctionSize;
    }, einfos) + 5 | 0, new Summary(new ExprValueInfo(0), FunctionSize, TotalSize, eff, false))];
  }
}
export function OptimizeLetRec(cenv_1, env, binds, bodyExpr, m) {
  const vs = map_2(function (v) {
    return v.Var;
  }, binds);
  let env_1;
  cenv_1;
  vs;
  env_1 = env;
  const patternInput = OptimizeBindings(cenv_1, true, env_1, binds);
  const patternInput_1 = OptimizeExpr(cenv_1, patternInput[1], bodyExpr);
  let patternInput_2;
  const fvs0 = freeInExpr(CollectLocals, patternInput_1[0]);
  const fvs = fold(function (acc, x) {
    return unionFreeVars(acc, function (arg10_) {
      return freeInBindingRhs(CollectLocals, arg10_);
    }(x[0]));
  }, fvs0, patternInput[0]);
  patternInput_2 = SplitValuesByIsUsedOrHasEffect(cenv_1, function () {
    return fvs.FreeLocals;
  }, patternInput[0]);
  const evalue_ = AbstractExprInfoByVars(vs, new List(), patternInput_1[1].Info);
  const bodyExpr_ = new Expr(6, [patternInput_2[0], patternInput_1[0], m, NewFreeVarsCache()]);
  const info = CombineValueInfos(new List(patternInput_1[1], patternInput_2[1]), evalue_);
  return [bodyExpr_, info];
}
export function OptimizeLinearExpr($var189, $var190, $var191, $var192) {
  OptimizeLinearExpr: while (true) {
    const cenv_1 = $var189;
    const env = $var190;
    const expr = $var191;
    const contf = $var192;
    const expr_1 = DetectAndOptimizeForExpression(cenv_1.g, new OptimizeForExpressionOptions(1), expr);
    const expr_2 = cenv_1.settings.ExpandStructrualValues() ? ExpandStructuralBinding(cenv_1, expr_1) : expr_1;

    if (expr_2.tag === 2) {
      const patternInput = OptimizeExpr(cenv_1, env, expr_2.data[0]);
      $var189 = cenv_1;
      $var190 = env;
      $var191 = expr_2.data[1];

      $var192 = $var120 => contf(function (tupledArg) {
        var TotalSize;
        var FunctionSize;
        var HasEffect;
        var MightMakeCriticalTailcall;
        return ((expr_2.data[2].Equals(new SequentialOpKind(0)) ? cenv_1.settings.EliminateSequential() ? true : (() => {
          const $var119 = patternInput[0].tag === 0 ? patternInput[0].data[0].tag === 16 ? [0] : [1] : [1];

          switch ($var119[0]) {
            case 0:
              return true;

            case 1:
              return false;
          }
        })() : false) ? !patternInput[1].HasEffect : false) ? [tupledArg[0], tupledArg[1]] : [new Expr(2, [patternInput[0], tupledArg[0], expr_2.data[2], expr_2.data[3], expr_2.data[4]]), (TotalSize = patternInput[1].TotalSize + tupledArg[1].TotalSize | 0, FunctionSize = patternInput[1].FunctionSize + tupledArg[1].FunctionSize | 0, HasEffect = (!expr_2.data[2].Equals(new SequentialOpKind(0)) ? true : patternInput[1].HasEffect) ? true : tupledArg[1].HasEffect, MightMakeCriticalTailcall = expr_2.data[2].Equals(new SequentialOpKind(0)) ? tupledArg[1].MightMakeCriticalTailcall : patternInput[1].MightMakeCriticalTailcall ? true : tupledArg[1].MightMakeCriticalTailcall, new Summary(new ExprValueInfo(0), FunctionSize, TotalSize, HasEffect, MightMakeCriticalTailcall))];
      }($var120));

      continue OptimizeLinearExpr;
    } else if (expr_2.tag === 7) {
      const patternInput_1 = OptimizeBinding(cenv_1, false, env, expr_2.data[0]);
      const bindingInfo = patternInput_1[0][1];
      const bind_ = patternInput_1[0][0];
      $var189 = cenv_1;
      $var190 = patternInput_1[1];
      $var191 = expr_2.data[1];

      $var192 = $var121 => contf(function (tupledArg_1) {
        var TotalSize_1;
        var FunctionSize_1;
        var HasEffect_1;
        var TotalSize_2;
        var FunctionSize_2;
        var HasEffect_2;

        if (ValueIsUsedOrHasEffect(cenv_1, function () {
          return freeInExpr(CollectLocals, tupledArg_1[0]).FreeLocals;
        }, bind_, bindingInfo)) {
          const patternInput_2 = TryEliminateLet(cenv_1, patternInput_1[1], bind_, tupledArg_1[0], expr_2.data[2]);
          return [patternInput_2[0], (TotalSize_1 = bindingInfo.TotalSize + tupledArg_1[1].TotalSize + patternInput_2[1] | 0, FunctionSize_1 = bindingInfo.FunctionSize + tupledArg_1[1].FunctionSize + patternInput_2[1] | 0, HasEffect_1 = bindingInfo.HasEffect ? true : tupledArg_1[1].HasEffect, new Summary(new ExprValueInfo(0), FunctionSize_1, TotalSize_1, HasEffect_1, tupledArg_1[1].MightMakeCriticalTailcall))];
        } else {
          const evalue_ = AbstractExprInfoByVars(ofArray([bind_.Var]), new List(), tupledArg_1[1].Info);
          return [tupledArg_1[0], (TotalSize_2 = bindingInfo.TotalSize + tupledArg_1[1].TotalSize - 1 | 0, FunctionSize_2 = bindingInfo.FunctionSize + tupledArg_1[1].FunctionSize - 1 | 0, HasEffect_2 = bindingInfo.HasEffect ? true : tupledArg_1[1].HasEffect, new Summary(evalue_, FunctionSize_2, TotalSize_2, HasEffect_2, tupledArg_1[1].MightMakeCriticalTailcall))];
        }
      }($var121));

      continue OptimizeLinearExpr;
    } else {
      const activePatternResult44703 = _LinearMatchExpr___(expr_2);

      if (activePatternResult44703 != null) {
        const patternInput_3 = OptimizeDecisionTree(cenv_1, env, getValue(activePatternResult44703)[6], getValue(activePatternResult44703)[2]);
        const patternInput_4 = OptimizeDecisionTreeTarget(cenv_1, env, getValue(activePatternResult44703)[6], getValue(activePatternResult44703)[3]);
        $var189 = cenv_1;
        $var190 = env;
        $var191 = getValue(activePatternResult44703)[4];

        $var192 = $var122 => contf(function (tupledArg_2) {
          const patternInput_5 = ConsiderSplitToMethod(cenv_1.settings.abstractBigTargets, cenv_1.settings.bigTargetSize, cenv_1, env, tupledArg_2[0], tupledArg_2[1]);
          const tinfos = ofArray([patternInput_4[1], patternInput_5[1]]);
          const tgs = ofArray([patternInput_4[0], new DecisionTreeTarget(0, [new List(), patternInput_5[0], getValue(activePatternResult44703)[5]])]);
          return RebuildOptimizedMatch(getValue(activePatternResult44703)[0], getValue(activePatternResult44703)[1], getValue(activePatternResult44703)[6], getValue(activePatternResult44703)[7], patternInput_3[0], tgs, patternInput_3[1], tinfos);
        }($var122));

        continue OptimizeLinearExpr;
      } else {
        return contf(OptimizeExpr(cenv_1, env, expr_2));
      }
    }
  }
}
export function OptimizeTryFinally(cenv_1, env, spTry, spFinally, e1, e2, m, ty) {
  const patternInput = OptimizeExpr(cenv_1, env, e1);
  const patternInput_1 = OptimizeExpr(cenv_1, env, e2);
  let info;
  const TotalSize = patternInput[1].TotalSize + patternInput_1[1].TotalSize + 5 | 0;
  const FunctionSize = patternInput[1].FunctionSize + patternInput_1[1].FunctionSize + 5 | 0;
  const HasEffect = patternInput[1].HasEffect ? true : patternInput_1[1].HasEffect;
  info = new Summary(new ExprValueInfo(0), FunctionSize, TotalSize, HasEffect, false);

  if (cenv_1.settings.EliminateTryCatchAndTryFinally() ? !patternInput[1].HasEffect : false) {
    const sp = spTry.tag === 1 ? new SequencePointInfoForSeq(0) : spTry.tag === 2 ? new SequencePointInfoForSeq(1) : new SequencePointInfoForSeq(0);
    return [new Expr(2, [patternInput[0], patternInput_1[0], new SequentialOpKind(1), sp, m]), info];
  } else {
    return [mkTryFinally(cenv_1.g, patternInput[0], patternInput_1[0], m, ty, spTry, spFinally), info];
  }
}
export function OptimizeTryCatch(cenv_1, env, e1, vf, ef, vh, eh, m, ty, spTry, spWith) {
  const patternInput = OptimizeExpr(cenv_1, env, e1);

  if (cenv_1.settings.EliminateTryCatchAndTryFinally() ? !patternInput[1].HasEffect : false) {
    return [patternInput[0], patternInput[1]];
  } else {
    let envinner;
    cenv_1;
    vf;
    cenv_1;
    vh;
    envinner = env;
    const patternInput_1 = OptimizeExpr(cenv_1, envinner, ef);
    const patternInput_2 = OptimizeExpr(cenv_1, envinner, eh);
    let info;
    const TotalSize = patternInput[1].TotalSize + patternInput_1[1].TotalSize + patternInput_2[1].TotalSize + 5 | 0;
    const FunctionSize = patternInput[1].FunctionSize + patternInput_1[1].FunctionSize + patternInput_2[1].FunctionSize + 5 | 0;
    const HasEffect = (patternInput[1].HasEffect ? true : patternInput_1[1].HasEffect) ? true : patternInput_2[1].HasEffect;
    info = new Summary(new ExprValueInfo(0), FunctionSize, TotalSize, HasEffect, false);
    return [mkTryWith(cenv_1.g, patternInput[0], vf, patternInput_1[0], vh, patternInput_2[0], m, ty, spTry, spWith), info];
  }
}
export function OptimizeWhileLoop(cenv_1, env, spWhile, marker, e1, e2, m) {
  var TotalSize;
  var FunctionSize;
  const patternInput = OptimizeExpr(cenv_1, env, e1);
  const patternInput_1 = OptimizeExpr(cenv_1, env, e2);
  return [mkWhile(cenv_1.g, spWhile, marker, patternInput[0], patternInput_1[0], m), (TotalSize = patternInput[1].TotalSize + patternInput_1[1].TotalSize + 5 | 0, FunctionSize = patternInput[1].FunctionSize + patternInput_1[1].FunctionSize + 5 | 0, new Summary(new ExprValueInfo(0), FunctionSize, TotalSize, true, false))];
}
export function OptimizeTraitCall(cenv_1, env, traitInfo, args, m) {
  const matchValue = CodegenWitnessThatTypSupportsTraitConstraint(cenv_1.TcVal, cenv_1.g, cenv_1.amap, m, traitInfo, args);
  const $var123 = matchValue.tag === 0 ? matchValue.data[1] != null ? [0, getValue(matchValue.data[1])] : [1] : [1];

  switch ($var123[0]) {
    case 0:
      return OptimizeExpr(cenv_1, env, $var123[1]);

    case 1:
      const patternInput = OptimizeExprsThenConsiderSplits(cenv_1, env, args);
      return OptimizeExprOpFallback(cenv_1, env, new TOp(29, traitInfo), new List(), patternInput[0], m, patternInput[1], new ExprValueInfo(0));
  }
}
export function TryOptimizeVal(cenv_1, env, mustInline, valInfoForVal, m) {
  TryOptimizeVal: while (true) {
    const $var124 = valInfoForVal.tag === 6 ? [0, valInfoForVal.data[0], valInfoForVal.data[1]] : valInfoForVal.tag === 1 ? [1, valInfoForVal.data[1]] : valInfoForVal.tag === 2 ? [2, valInfoForVal.data[1], valInfoForVal.data[0]] : valInfoForVal.tag === 8 ? [3, valInfoForVal.data[0], valInfoForVal.data[1]] : valInfoForVal.tag === 7 ? mustInline ? [4, valInfoForVal.data[3]] : [5] : [5];

    switch ($var124[0]) {
      case 0:
        return new Expr(0, [$var124[1], m, $var124[2]]);

      case 1:
        cenv_1 = cenv_1;
        env = env;
        mustInline = mustInline;
        valInfoForVal = $var124[1];
        m = m;
        continue TryOptimizeVal;

      case 2:
        const matchValue = TryOptimizeVal(cenv_1, env, mustInline, $var124[1], m);

        if (matchValue == null) {
          return exprForValRef(m, $var124[2]);
        } else {
          return getValue(matchValue);
        }

      case 3:
        return remarkExpr(m, copyExpr(cenv_1.g, new ValCopyFlag(1), $var124[2]));

      case 4:
        return remarkExpr(m, copyExpr(cenv_1.g, new ValCopyFlag(1), $var124[1]));

      case 5:
        const $var125 = valInfoForVal.tag === 3 ? mustInline ? [0] : [1] : valInfoForVal.tag === 5 ? mustInline ? [0] : [1] : valInfoForVal.tag === 4 ? mustInline ? [0] : [1] : [1];

        switch ($var125[0]) {
          case 0:
            throw new Error("tuple, union and record values cannot be marked 'inline'");

          case 1:
            const $var126 = valInfoForVal.tag === 0 ? mustInline ? [0] : [1] : [1];

            switch ($var126[0]) {
              case 0:
                warning(new _Error(SR.optValueMarkedInlineHasUnexpectedValue(), m));
                return null;

              case 1:
                if (mustInline) {
                  warning(new _Error(SR.optValueMarkedInlineCouldNotBeInlined(), m));
                  return null;
                } else {
                  return null;
                }

            }

        }

    }
  }
}
export function TryOptimizeValInfo(cenv_1, env, m, vinfo) {
  if (vinfo.HasEffect) {
    return null;
  } else {
    return TryOptimizeVal(cenv_1, env, false, vinfo.Info, m);
  }
}
export function AddValEqualityInfo(g, m, v, info) {
  if (v.IsMutable) {
    return info;
  } else {
    return new Summary(MakeValueInfoForValue(g, m, v, info.Info), info.FunctionSize, info.TotalSize, info.HasEffect, info.MightMakeCriticalTailcall);
  }
}
export function OptimizeVal(cenv_1, env, expr, v, m) {
  const valInfoForVal = GetInfoForVal(cenv_1, env, m, v);
  const matchValue = TryOptimizeVal(cenv_1, env, v.MustInline, valInfoForVal.ValExprInfo, m);

  if (matchValue == null) {
    if (v.MustInline) {
      error(new _Error(SR.optFailedToInlineValue(v.DisplayName), m));
    }

    return [expr, AddValEqualityInfo(cenv_1.g, m, v, new Summary(valInfoForVal.ValExprInfo, 1, 1, false, false))];
  } else {
    const $var127 = getValue(matchValue).tag === 4 ? [0] : getValue(matchValue).tag === 3 ? [0] : [1];

    switch ($var127[0]) {
      case 0:
        return [getValue(matchValue), AddValEqualityInfo(cenv_1.g, m, v, new Summary(valInfoForVal.ValExprInfo, 10, 10, false, false))];

      case 1:
        const patternInput = OptimizeExpr(cenv_1, env, getValue(matchValue));
        return [patternInput[0], AddValEqualityInfo(cenv_1.g, m, v, patternInput[1])];
    }
  }
}
export function StripToNominalTyconRef(cenv_1, ty) {
  if (isAppTy(cenv_1.g, ty)) {
    return destAppTy(cenv_1.g, ty);
  } else if (isRefTupleTy(cenv_1.g, ty)) {
    const tyargs = destRefTupleTy(cenv_1.g, ty);
    return [mkCompiledTupleTyconRef(cenv_1.g, false, tyargs.length), tyargs];
  } else {
    throw new Error("StripToNominalTyconRef: unreachable");
  }
}
export function CanDevirtualizeApplication(cenv_1, v, vref, ty, args) {
  if (((valRefEq(cenv_1.g, v, vref) ? !isUnitTy(cenv_1.g, ty) : false) ? isAppTy(cenv_1.g, ty) : false) ? !IsUnionTypeWithNullAsTrueValue(cenv_1.g, StripToNominalTyconRef(cenv_1, ty)[0].Deref) : false) {
    if (!isStructTy(cenv_1.g, ty)) {
      return true;
    } else {
      return !(args.tail == null);
    }
  } else {
    return false;
  }
}
export function TakeAddressOfStructArgumentIfNeeded(cenv_1, vref, ty, args, m) {
  if (vref.IsInstanceMember ? isStructTy(cenv_1.g, ty) : false) {
    if (args.tail != null) {
      const patternInput = mkExprAddrOfExpr(cenv_1.g, true, false, new Mutates(2), args.head, null, m);
      return [patternInput[0], new List(patternInput[1], args.tail)];
    } else {
      return [function (x) {
        return x;
      }, args];
    }
  } else {
    return [function (x_1) {
      return x_1;
    }, args];
  }
}
export function DevirtualizeApplication(cenv_1, env, vref, ty, tyargs, args, m) {
  const patternInput = TakeAddressOfStructArgumentIfNeeded(cenv_1, vref, ty, args, m);
  const transformedExpr = patternInput[0](MakeApplicationAndBetaReduce(cenv_1.g, exprForValRef(m, vref), vref.Type, tyargs.tail == null ? new List() : ofArray([tyargs]), patternInput[1], m));
  return OptimizeExpr(cenv_1, env, transformedExpr);
}
export function TryDevirtualizeApplication(cenv_1, env, f, tyargs, args, m) {
  var v_14;
  var ty_14;
  var v_13;
  var ty_13;
  var v_12;
  var ty_12;
  var v_11;
  var ty_11;
  var v_10;
  var ty_10;
  var v_9;
  var ty_9;
  var v_8;
  var ty_8;
  var v_7;
  var ty_7;
  var v_6;
  var ty_6;
  var v_5;
  var ty_5;
  var v_4;
  var ty_4;
  var v_3;
  var ty_3;
  var v_2;
  var ty_2;
  var v_1;
  var ty_1;
  var v;
  var ty;
  var vref_8;
  const matchValue = [f, tyargs, args];
  const $var128 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_14 = matchValue[0].data[0], ty_14 = matchValue[1].head, CanDevirtualizeApplication(cenv_1, v_14, cenv_1.g.generic_comparison_inner_vref, ty_14, args)) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

  switch ($var128[0]) {
    case 0:
      const patternInput = StripToNominalTyconRef(cenv_1, $var128[1]);
      const matchValue_1 = patternInput[0].GeneratedCompareToValues;

      if (matchValue_1 != null) {
        const vref = getValue(matchValue_1)[1];
        return DevirtualizeApplication(cenv_1, env, vref, $var128[1], patternInput[1], args, m);
      } else {
        return null;
      }

    case 1:
      const $var129 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_13 = matchValue[0].data[0], ty_13 = matchValue[1].head, CanDevirtualizeApplication(cenv_1, v_13, cenv_1.g.generic_comparison_withc_inner_vref, ty_13, args)) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

      switch ($var129[0]) {
        case 0:
          const patternInput_1 = StripToNominalTyconRef(cenv_1, $var129[1]);
          const matchValue_2 = [patternInput_1[0].GeneratedCompareToWithComparerValues, args];
          const $var130 = matchValue_2[0] != null ? matchValue_2[1].tail != null ? matchValue_2[1].tail.tail != null ? matchValue_2[1].tail.tail.tail != null ? matchValue_2[1].tail.tail.tail.tail == null ? [0, matchValue_2[1].head, getValue(matchValue_2[0]), matchValue_2[1].tail.head, matchValue_2[1].tail.tail.head] : [1] : [1] : [1] : [1] : [1];

          switch ($var130[0]) {
            case 0:
              const args2 = ofArray([$var130[3], mkRefTupledNoTypes(cenv_1.g, m, ofArray([mkCoerceExpr($var130[4], cenv_1.g.obj_ty, m, $var129[1]), $var130[1]]))]);
              return DevirtualizeApplication(cenv_1, env, $var130[2], $var129[1], patternInput_1[1], args2, m);

            case 1:
              return null;
          }

        case 1:
          const $var131 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_12 = matchValue[0].data[0], ty_12 = matchValue[1].head, CanDevirtualizeApplication(cenv_1, v_12, cenv_1.g.generic_equality_er_inner_vref, ty_12, args)) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

          switch ($var131[0]) {
            case 0:
              const patternInput_2 = StripToNominalTyconRef(cenv_1, $var131[1]);
              const matchValue_3 = patternInput_2[0].GeneratedHashAndEqualsValues;

              if (matchValue_3 != null) {
                const vref_1 = getValue(matchValue_3)[1];
                return DevirtualizeApplication(cenv_1, env, vref_1, $var131[1], patternInput_2[1], args, m);
              } else {
                return null;
              }

            case 1:
              const $var132 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_11 = matchValue[0].data[0], ty_11 = matchValue[1].head, CanDevirtualizeApplication(cenv_1, v_11, cenv_1.g.generic_equality_withc_inner_vref, ty_11, args)) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

              switch ($var132[0]) {
                case 0:
                  const patternInput_3 = StripToNominalTyconRef(cenv_1, $var132[1]);
                  const matchValue_4 = [patternInput_3[0].GeneratedHashAndEqualsWithComparerValues, args];
                  const $var133 = matchValue_4[0] != null ? matchValue_4[1].tail != null ? matchValue_4[1].tail.tail != null ? matchValue_4[1].tail.tail.tail != null ? matchValue_4[1].tail.tail.tail.tail == null ? [0, matchValue_4[1].head, getValue(matchValue_4[0])[2], matchValue_4[1].tail.head, matchValue_4[1].tail.tail.head] : [1] : [1] : [1] : [1] : [1];

                  switch ($var133[0]) {
                    case 0:
                      const args2_1 = ofArray([$var133[3], mkRefTupledNoTypes(cenv_1.g, m, ofArray([mkCoerceExpr($var133[4], cenv_1.g.obj_ty, m, $var132[1]), $var133[1]]))]);
                      return DevirtualizeApplication(cenv_1, env, $var133[2], $var132[1], patternInput_3[1], args2_1, m);

                    case 1:
                      return null;
                  }

                case 1:
                  const $var134 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_10 = matchValue[0].data[0], ty_10 = matchValue[1].head, CanDevirtualizeApplication(cenv_1, v_10, cenv_1.g.generic_equality_per_inner_vref, ty_10, args) ? !isRefTupleTy(cenv_1.g, ty_10) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                  switch ($var134[0]) {
                    case 0:
                      const patternInput_4 = StripToNominalTyconRef(cenv_1, $var134[1]);
                      const matchValue_5 = [patternInput_4[0].GeneratedHashAndEqualsWithComparerValues, args];
                      const $var135 = matchValue_5[0] != null ? matchValue_5[1].tail != null ? matchValue_5[1].tail.tail != null ? matchValue_5[1].tail.tail.tail == null ? [0, getValue(matchValue_5[0])[2], matchValue_5[1].head, matchValue_5[1].tail.head] : [1] : [1] : [1] : [1];

                      switch ($var135[0]) {
                        case 0:
                          const args2_2 = ofArray([$var135[2], mkRefTupledNoTypes(cenv_1.g, m, ofArray([mkCoerceExpr($var135[3], cenv_1.g.obj_ty, m, $var134[1]), mkCallGetGenericPEREqualityComparer(cenv_1.g, m)]))]);
                          return DevirtualizeApplication(cenv_1, env, $var135[1], $var134[1], patternInput_4[1], args2_2, m);

                        case 1:
                          return null;
                      }

                    case 1:
                      const $var136 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_9 = matchValue[0].data[0], ty_9 = matchValue[1].head, CanDevirtualizeApplication(cenv_1, v_9, cenv_1.g.generic_hash_inner_vref, ty_9, args)) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                      switch ($var136[0]) {
                        case 0:
                          const patternInput_5 = StripToNominalTyconRef(cenv_1, $var136[1]);
                          const matchValue_6 = [patternInput_5[0].GeneratedHashAndEqualsWithComparerValues, args];
                          const $var137 = matchValue_6[0] != null ? matchValue_6[1].tail != null ? matchValue_6[1].tail.tail == null ? [0, getValue(matchValue_6[0])[1], matchValue_6[1].head] : [1] : [1] : [1];

                          switch ($var137[0]) {
                            case 0:
                              const args2_3 = ofArray([$var137[2], mkCallGetGenericEREqualityComparer(cenv_1.g, m)]);
                              return DevirtualizeApplication(cenv_1, env, $var137[1], $var136[1], patternInput_5[1], args2_3, m);

                            case 1:
                              return null;
                          }

                        case 1:
                          const $var138 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_8 = matchValue[0].data[0], ty_8 = matchValue[1].head, CanDevirtualizeApplication(cenv_1, v_8, cenv_1.g.generic_hash_withc_inner_vref, ty_8, args)) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                          switch ($var138[0]) {
                            case 0:
                              const patternInput_6 = StripToNominalTyconRef(cenv_1, $var138[1]);
                              const matchValue_7 = [patternInput_6[0].GeneratedHashAndEqualsWithComparerValues, args];
                              const $var139 = matchValue_7[0] != null ? matchValue_7[1].tail != null ? matchValue_7[1].tail.tail != null ? matchValue_7[1].tail.tail.tail == null ? [0, matchValue_7[1].head, getValue(matchValue_7[0])[1], matchValue_7[1].tail.head] : [1] : [1] : [1] : [1];

                              switch ($var139[0]) {
                                case 0:
                                  const args2_4 = ofArray([$var139[3], $var139[1]]);
                                  return DevirtualizeApplication(cenv_1, env, $var139[2], $var138[1], patternInput_6[1], args2_4, m);

                                case 1:
                                  return null;
                              }

                            case 1:
                              const $var140 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_7 = matchValue[0].data[0], ty_7 = matchValue[1].head, valRefEq(cenv_1.g, v_7, cenv_1.g.generic_comparison_inner_vref) ? isRefTupleTy(cenv_1.g, ty_7) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                              switch ($var140[0]) {
                                case 0:
                                  const tyargs_1 = destRefTupleTy(cenv_1.g, $var140[1]);
                                  let vref_2;
                                  const matchValue_8 = tyargs_1.length | 0;

                                  switch (matchValue_8) {
                                    case 2:
                                      vref_2 = cenv_1.g.generic_compare_withc_tuple2_vref;
                                      break;

                                    case 3:
                                      vref_2 = cenv_1.g.generic_compare_withc_tuple3_vref;
                                      break;

                                    case 4:
                                      vref_2 = cenv_1.g.generic_compare_withc_tuple4_vref;
                                      break;

                                    case 5:
                                      vref_2 = cenv_1.g.generic_compare_withc_tuple5_vref;
                                      break;

                                    default:
                                      vref_2 = null;
                                  }

                                  if (vref_2 == null) {
                                    return null;
                                  } else {
                                    return DevirtualizeApplication(cenv_1, env, getValue(vref_2), $var140[1], tyargs_1, new List(mkCallGetGenericComparer(cenv_1.g, m), args), m);
                                  }

                                case 1:
                                  const $var141 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_6 = matchValue[0].data[0], ty_6 = matchValue[1].head, valRefEq(cenv_1.g, v_6, cenv_1.g.generic_hash_inner_vref) ? isRefTupleTy(cenv_1.g, ty_6) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                                  switch ($var141[0]) {
                                    case 0:
                                      const tyargs_2 = destRefTupleTy(cenv_1.g, $var141[1]);
                                      let vref_3;
                                      const matchValue_9 = tyargs_2.length | 0;

                                      switch (matchValue_9) {
                                        case 2:
                                          vref_3 = cenv_1.g.generic_hash_withc_tuple2_vref;
                                          break;

                                        case 3:
                                          vref_3 = cenv_1.g.generic_hash_withc_tuple3_vref;
                                          break;

                                        case 4:
                                          vref_3 = cenv_1.g.generic_hash_withc_tuple4_vref;
                                          break;

                                        case 5:
                                          vref_3 = cenv_1.g.generic_hash_withc_tuple5_vref;
                                          break;

                                        default:
                                          vref_3 = null;
                                      }

                                      if (vref_3 == null) {
                                        return null;
                                      } else {
                                        return DevirtualizeApplication(cenv_1, env, getValue(vref_3), $var141[1], tyargs_2, new List(mkCallGetGenericEREqualityComparer(cenv_1.g, m), args), m);
                                      }

                                    case 1:
                                      const $var142 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_5 = matchValue[0].data[0], ty_5 = matchValue[1].head, valRefEq(cenv_1.g, v_5, cenv_1.g.generic_equality_per_inner_vref) ? isRefTupleTy(cenv_1.g, ty_5) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                                      switch ($var142[0]) {
                                        case 0:
                                          const tyargs_3 = destRefTupleTy(cenv_1.g, $var142[1]);
                                          let vref_4;
                                          const matchValue_10 = tyargs_3.length | 0;

                                          switch (matchValue_10) {
                                            case 2:
                                              vref_4 = cenv_1.g.generic_equals_withc_tuple2_vref;
                                              break;

                                            case 3:
                                              vref_4 = cenv_1.g.generic_equals_withc_tuple3_vref;
                                              break;

                                            case 4:
                                              vref_4 = cenv_1.g.generic_equals_withc_tuple4_vref;
                                              break;

                                            case 5:
                                              vref_4 = cenv_1.g.generic_equals_withc_tuple5_vref;
                                              break;

                                            default:
                                              vref_4 = null;
                                          }

                                          if (vref_4 == null) {
                                            return null;
                                          } else {
                                            return DevirtualizeApplication(cenv_1, env, getValue(vref_4), $var142[1], tyargs_3, new List(mkCallGetGenericPEREqualityComparer(cenv_1.g, m), args), m);
                                          }

                                        case 1:
                                          const $var143 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_4 = matchValue[0].data[0], ty_4 = matchValue[1].head, valRefEq(cenv_1.g, v_4, cenv_1.g.generic_comparison_withc_inner_vref) ? isRefTupleTy(cenv_1.g, ty_4) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                                          switch ($var143[0]) {
                                            case 0:
                                              const tyargs_4 = destRefTupleTy(cenv_1.g, $var143[1]);
                                              let vref_5;
                                              const matchValue_11 = tyargs_4.length | 0;

                                              switch (matchValue_11) {
                                                case 2:
                                                  vref_5 = cenv_1.g.generic_compare_withc_tuple2_vref;
                                                  break;

                                                case 3:
                                                  vref_5 = cenv_1.g.generic_compare_withc_tuple3_vref;
                                                  break;

                                                case 4:
                                                  vref_5 = cenv_1.g.generic_compare_withc_tuple4_vref;
                                                  break;

                                                case 5:
                                                  vref_5 = cenv_1.g.generic_compare_withc_tuple5_vref;
                                                  break;

                                                default:
                                                  vref_5 = null;
                                              }

                                              if (vref_5 == null) {
                                                return null;
                                              } else {
                                                return DevirtualizeApplication(cenv_1, env, getValue(vref_5), $var143[1], tyargs_4, args, m);
                                              }

                                            case 1:
                                              const $var144 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_3 = matchValue[0].data[0], ty_3 = matchValue[1].head, valRefEq(cenv_1.g, v_3, cenv_1.g.generic_hash_withc_inner_vref) ? isRefTupleTy(cenv_1.g, ty_3) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                                              switch ($var144[0]) {
                                                case 0:
                                                  const tyargs_5 = destRefTupleTy(cenv_1.g, $var144[1]);
                                                  let vref_6;
                                                  const matchValue_12 = tyargs_5.length | 0;

                                                  switch (matchValue_12) {
                                                    case 2:
                                                      vref_6 = cenv_1.g.generic_hash_withc_tuple2_vref;
                                                      break;

                                                    case 3:
                                                      vref_6 = cenv_1.g.generic_hash_withc_tuple3_vref;
                                                      break;

                                                    case 4:
                                                      vref_6 = cenv_1.g.generic_hash_withc_tuple4_vref;
                                                      break;

                                                    case 5:
                                                      vref_6 = cenv_1.g.generic_hash_withc_tuple5_vref;
                                                      break;

                                                    default:
                                                      vref_6 = null;
                                                  }

                                                  if (vref_6 == null) {
                                                    return null;
                                                  } else {
                                                    return DevirtualizeApplication(cenv_1, env, getValue(vref_6), $var144[1], tyargs_5, args, m);
                                                  }

                                                case 1:
                                                  const $var145 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_2 = matchValue[0].data[0], ty_2 = matchValue[1].head, valRefEq(cenv_1.g, v_2, cenv_1.g.generic_equality_withc_inner_vref) ? isRefTupleTy(cenv_1.g, ty_2) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                                                  switch ($var145[0]) {
                                                    case 0:
                                                      const tyargs_6 = destRefTupleTy(cenv_1.g, $var145[1]);
                                                      let vref_7;
                                                      const matchValue_13 = tyargs_6.length | 0;

                                                      switch (matchValue_13) {
                                                        case 2:
                                                          vref_7 = cenv_1.g.generic_equals_withc_tuple2_vref;
                                                          break;

                                                        case 3:
                                                          vref_7 = cenv_1.g.generic_equals_withc_tuple3_vref;
                                                          break;

                                                        case 4:
                                                          vref_7 = cenv_1.g.generic_equals_withc_tuple4_vref;
                                                          break;

                                                        case 5:
                                                          vref_7 = cenv_1.g.generic_equals_withc_tuple5_vref;
                                                          break;

                                                        default:
                                                          vref_7 = null;
                                                      }

                                                      if (vref_7 == null) {
                                                        return null;
                                                      } else {
                                                        return DevirtualizeApplication(cenv_1, env, getValue(vref_7), $var145[1], tyargs_6, args, m);
                                                      }

                                                    case 1:
                                                      const $var146 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v_1 = matchValue[0].data[0], ty_1 = matchValue[1].head, valRefEq(cenv_1.g, v_1, cenv_1.g.unbox_vref) ? canUseUnboxFast(cenv_1.g, m, ty_1) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                                                      switch ($var146[0]) {
                                                        case 0:
                                                          return DevirtualizeApplication(cenv_1, env, cenv_1.g.unbox_fast_vref, $var146[1], tyargs, args, m);

                                                        case 1:
                                                          const $var147 = matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (v = matchValue[0].data[0], ty = matchValue[1].head, valRefEq(cenv_1.g, v, cenv_1.g.istype_vref) ? canUseTypeTestFast(cenv_1.g, ty) : false) ? [0, matchValue[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                                                          switch ($var147[0]) {
                                                            case 0:
                                                              return DevirtualizeApplication(cenv_1, env, cenv_1.g.istype_fast_vref, $var147[1], tyargs, args, m);

                                                            case 1:
                                                              const $var148 = matchValue[0].tag === 1 ? (vref_8 = matchValue[0].data[0], valRefEq(cenv_1.g, vref_8, cenv_1.g.methodhandleof_vref)) ? [0, matchValue[0].data[0]] : [1] : [1];

                                                              switch ($var148[0]) {
                                                                case 0:
                                                                  return [MakeApplicationAndBetaReduce(cenv_1.g, exprForValRef(m, $var148[1]), $var148[1].Type, tyargs.tail == null ? new List() : ofArray([tyargs]), args, m), new Summary(new ExprValueInfo(0), 1, 1, false, false)];

                                                                case 1:
                                                                  return null;
                                                              }

                                                          }

                                                      }

                                                  }

                                              }

                                          }

                                      }

                                  }

                              }

                          }

                      }

                  }

              }

          }

      }

  }
}
export function TryInlineApplication(cenv_1, env, finfo, tyargs, args, m) {
  var size;
  var lambdaId;
  var f2ty;
  var f2;
  var arities;
  var dontInline;
  let $var149;

  const activePatternResult44760 = _StripLambdaValue___(finfo.Info);

  if (activePatternResult44760 != null) {
    if (size = getValue(activePatternResult44760)[2] | 0, lambdaId = getValue(activePatternResult44760)[0], f2ty = getValue(activePatternResult44760)[4], f2 = getValue(activePatternResult44760)[3], arities = getValue(activePatternResult44760)[1] | 0, (((cenv_1.optimizing ? cenv_1.settings.InlineLambdas() : false) ? !finfo.HasEffect : false) ? !ZsetModule.contains(lambdaId, env.dontInline) : false) ? (exists(function (t) {
      return t.tag === 6 ? false : true;
    }, tyargs) ? 1 : 0) + args.length === arities ? size > cenv_1.settings.lambdaInlineThreshold + args.length ? false : true : false : false) {
      $var149 = [0, getValue(activePatternResult44760)[1], getValue(activePatternResult44760)[3], getValue(activePatternResult44760)[4], getValue(activePatternResult44760)[0], getValue(activePatternResult44760)[2]];
    } else {
      $var149 = [1];
    }
  } else {
    $var149 = [1];
  }

  switch ($var149[0]) {
    case 0:
      let isBaseCall;

      if (!(args.tail == null)) {
        const matchValue = item(0, args);
        const $var150 = matchValue.tag === 1 ? matchValue.data[0].BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1)) ? [0, matchValue.data[0]] : [1] : [1];

        switch ($var150[0]) {
          case 0:
            isBaseCall = true;
            break;

          case 1:
            isBaseCall = false;
            break;
        }
      } else {
        isBaseCall = false;
      }

      if (isBaseCall) {
        return null;
      } else {
        let isValFromLazyExtensions;

        if (cenv_1.g.compilingFslib) {
          isValFromLazyExtensions = false;
        } else if (finfo.Info.tag === 2) {
          const matchValue_1 = finfo.Info.data[0].ApparentEnclosingEntity;
          const $var151 = matchValue_1.tag === 0 ? tyconRefEq(cenv_1.g, cenv_1.g.lazy_tcr_canon, matchValue_1.data) ? [0, matchValue_1.data] : [1] : [1];

          switch ($var151[0]) {
            case 0:
              const matchValue_2 = $var151[1].CompiledRepresentation;

              if (matchValue_2.tag === 0) {
                isValFromLazyExtensions = matchValue_2.data[0].Scope.AssemblyRef.Name === "FSharp.Core";
              } else {
                isValFromLazyExtensions = false;
              }

              break;

            case 1:
              isValFromLazyExtensions = false;
              break;
          }
        } else {
          isValFromLazyExtensions = false;
        }

        if (isValFromLazyExtensions) {
          return null;
        } else {
          const isSecureMethod = finfo.Info.tag === 2 ? exists(function (a) {
            return IsSecurityAttribute(cenv_1.g, cenv_1.amap, cenv_1.casApplied, a, m) ? true : IsSecurityCriticalAttribute(cenv_1.g, a);
          }, finfo.Info.data[0].Attribs) : false;

          if (isSecureMethod) {
            return null;
          } else {
            const isGetHashCode = finfo.Info.tag === 2 ? finfo.Info.data[0].DisplayName === "GetHashCode" ? finfo.Info.data[0].IsCompilerGenerated : false : false;

            if (isGetHashCode) {
              return null;
            } else {
              const f2_ = remarkExpr(m, copyExpr(cenv_1.g, new ValCopyFlag(1), $var149[2]));
              const args_ = map_2(function (e) {
                const patternInput = OptimizeExpr(cenv_1, env, e);
                return patternInput[0];
              }, args);
              const expr_ = MakeApplicationAndBetaReduce(cenv_1.g, f2_, $var149[3], ofArray([tyargs]), args_, m);
              return OptimizeExpr(cenv_1, (dontInline = ZsetModule.add($var149[4], env.dontInline), new IncrementalOptimizationEnv(env.latestBoundId, dontInline, env.dontSplitVars, env.inLoop, env.functionVal, env.typarInfos, env.localExternalVals, env.globalModuleInfos)), expr_);
            }
          }
        }
      }

    case 1:
      return null;
  }
}
export function OptimizeApplication(cenv_1, env, f0, f0ty, tyargs, args, m) {
  var valInfoForVal;
  var TotalSize;
  var FunctionSize;
  const matchValue = TryDevirtualizeApplication(cenv_1, env, f0, tyargs, args, m);

  if (matchValue == null) {
    const patternInput = OptimizeExpr(cenv_1, env, f0);
    const matchValue_1 = TryInlineApplication(cenv_1, env, patternInput[1], tyargs, args, m);

    if (matchValue_1 == null) {
      let shapes;

      if (patternInput[0].tag === 1) {
        const matchValue_2 = patternInput[0].data[0].ValReprInfo;

        if (matchValue_2 != null) {
          const detupArgsL = getValue(matchValue_2).data[1];
          const nargs = args.length | 0;
          const nDetupArgsL = detupArgsL.length | 0;
          const nShapes = (nargs < nDetupArgsL ? nargs : nDetupArgsL) | 0;
          const detupArgsShapesL = map_2(function (detupArgs) {
            const $var152 = detupArgs.tail != null ? detupArgs.tail.tail == null ? [0] : [1] : [0];

            switch ($var152[0]) {
              case 0:
                return new ExprValueInfo(0);

              case 1:
                return new ExprValueInfo(3, Array.from(map_2(function (_arg2) {
                  return new ExprValueInfo(0);
                }, detupArgs)));
            }
          }, List_1.take(nShapes, detupArgsL));
          shapes = toList(zip(append_1(detupArgsShapesL, replicate(nargs - nShapes, new ExprValueInfo(0))), args));
        } else {
          shapes = map_2(function (arg) {
            return [new ExprValueInfo(0), arg];
          }, args);
        }
      } else {
        shapes = map_2(function (arg_1) {
          return [new ExprValueInfo(0), arg_1];
        }, args);
      }

      const patternInput_1 = OptimizeExprsThenReshapeAndConsiderSplits(cenv_1, env, shapes);
      const newExpr = MakeApplicationAndBetaReduce(cenv_1.g, patternInput[0], f0ty, ofArray([tyargs]), patternInput_1[0], m);
      const matchValue_3 = [patternInput[0], newExpr];
      const $var153 = matchValue_3[0].tag === 3 ? matchValue_3[1].tag === 7 ? [0] : [1] : matchValue_3[0].tag === 4 ? matchValue_3[1].tag === 7 ? [0] : [1] : [1];

      switch ($var153[0]) {
        case 0:
          return OptimizeExpr(cenv_1, env, newExpr);

        case 1:
          let mayBeCriticalTailcall;

          const activePatternResult44769 = _KnownValApp___(patternInput[0]);

          if (activePatternResult44769 != null) {
            let doesNotMakeCriticalTailcall;

            if (getValue(activePatternResult44769)[0].MakesNoCriticalTailcalls ? true : (valInfoForVal = GetInfoForVal(cenv_1, env, m, getValue(activePatternResult44769)[0]), valInfoForVal.ValMakesNoCriticalTailcalls)) {
              doesNotMakeCriticalTailcall = true;
            } else if (env.functionVal != null) {
              const v = getValue(env.functionVal)[0];
              doesNotMakeCriticalTailcall = valEq(getValue(activePatternResult44769)[0].Deref, v);
            } else {
              doesNotMakeCriticalTailcall = false;
            }

            if (doesNotMakeCriticalTailcall) {
              const numArgs = getValue(activePatternResult44769)[2].length + patternInput_1[0].length | 0;
              const matchValue_4 = getValue(activePatternResult44769)[0].ValReprInfo;

              if (matchValue_4 == null) {
                if (env.functionVal == null) {
                  mayBeCriticalTailcall = true;
                } else {
                  const i = getValue(env.functionVal)[1];
                  const _v = getValue(env.functionVal)[0];
                  mayBeCriticalTailcall = numArgs > i.NumCurriedArgs;
                }
              } else {
                mayBeCriticalTailcall = numArgs > getValue(matchValue_4).NumCurriedArgs;
              }
            } else {
              mayBeCriticalTailcall = true;
            }
          } else {
            mayBeCriticalTailcall = true;
          }

          return [newExpr, (TotalSize = patternInput[1].TotalSize + sumBy(function (x) {
            return x.TotalSize;
          }, patternInput_1[1]) | 0, FunctionSize = patternInput[1].FunctionSize + sumBy(function (x_1) {
            return x_1.FunctionSize;
          }, patternInput_1[1]) | 0, new Summary(ValueOfExpr(newExpr), FunctionSize, TotalSize, true, mayBeCriticalTailcall))];
      }
    } else {
      return getValue(matchValue_1);
    }
  } else {
    return getValue(matchValue);
  }
}
export function OptimizeLambdas(vspec, cenv_1, env, topValInfo, e, ety) {
  var copyOfStruct;
  var copyOfStruct_1;
  var copyOfStruct_2;
  var copyOfStruct_3;
  var copyOfStruct_4;
  var copyOfStruct_5;
  var TotalSize;
  const $var154 = e.tag === 3 ? [0, e.data[0], e.data[5]] : e.tag === 4 ? [0, e.data[0], e.data[3]] : [1];

  switch ($var154[0]) {
    case 0:
      const patternInput = IteratedAdjustArityOfLambda(cenv_1.g, cenv_1.amap, topValInfo, e);
      let env_1;
      const functionVal = vspec != null ? [getValue(vspec), topValInfo] : null;
      env_1 = new IncrementalOptimizationEnv(env.latestBoundId, env.dontInline, env.dontSplitVars, env.inLoop, functionVal, env.typarInfos, env.localExternalVals, env.globalModuleInfos);
      const env_3 = foldBack(function (v, env_2) {
        cenv_1;
        v;
        return env_2;
      }, defaultArg(patternInput[1], [], $var155 => [$var155]), env_1);
      const env_5 = foldBack(function (v_1, env_4) {
        cenv_1;
        v_1;
        return env_4;
      }, defaultArg(patternInput[2], [], $var156 => [$var156]), env_3);
      const env_6 = BindTypeVarsToUnknown(patternInput[0], env_5);
      const env_8 = foldBack(function (vs, env_7) {
        cenv_1;
        vs;
        return env_7;
      }, patternInput[3], env_6);
      let env_9;
      cenv_1;
      toList(defaultArg(patternInput[2], [], $var157 => [$var157]));
      env_9 = env_8;
      const patternInput_1 = OptimizeExpr(cenv_1, env_9, patternInput[4]);
      const expr_ = mkMemberLambdas($var154[2], patternInput[0], patternInput[1], patternInput[2], patternInput[3], patternInput_1[0], patternInput[5]);
      const arities = patternInput[3].length | 0;
      const arities_1 = (patternInput[0].tail == null ? arities : 1 + arities) | 0;

      if (vspec != null) {
        if (!patternInput_1[1].MightMakeCriticalTailcall) {
          getValue(vspec).SetMakesNoCriticalTailcalls();
        }

        if (cenv_1.settings.reportingPhase ? !getValue(vspec).IsCompilerGenerated : false) {
          if (cenv_1.settings.reportNoNeedToTailcall) {
            if (patternInput_1[1].MightMakeCriticalTailcall) {
              toConsole(printf("value %s at line %d may make a critical tailcall"))(getValue(vspec).DisplayName, (copyOfStruct = getValue(vspec).Range, copyOfStruct.StartLine));
            } else {
              toConsole(printf("value %s at line %d does not make a critical tailcall"))(getValue(vspec).DisplayName, (copyOfStruct_1 = getValue(vspec).Range, copyOfStruct_1.StartLine));
            }
          }

          if (cenv_1.settings.reportTotalSizes) {
            toConsole(printf("value %s at line %d has total size %d"))(getValue(vspec).DisplayName, (copyOfStruct_2 = getValue(vspec).Range, copyOfStruct_2.StartLine), patternInput_1[1].TotalSize);
          }

          if (cenv_1.settings.reportFunctionSizes) {
            toConsole(printf("value %s at line %d has method size %d"))(getValue(vspec).DisplayName, (copyOfStruct_3 = getValue(vspec).Range, copyOfStruct_3.StartLine), patternInput_1[1].FunctionSize);
          }

          if (cenv_1.settings.reportHasEffect) {
            if (patternInput_1[1].HasEffect) {
              toConsole(printf("function %s at line %d causes side effects or may not terminate"))(getValue(vspec).DisplayName, (copyOfStruct_4 = getValue(vspec).Range, copyOfStruct_4.StartLine));
            } else {
              toConsole(printf("function %s at line %d causes no side effects"))(getValue(vspec).DisplayName, (copyOfStruct_5 = getValue(vspec).Range, copyOfStruct_5.StartLine));
            }
          }
        }
      }

      let valu;

      if (patternInput[2] != null) {
        const fvs = freeInExpr(CollectLocals, patternInput_1[0]);

        if (fvs.UsesMethodLocalConstructs ? true : fvs.FreeLocals.Contains_0(getValue(patternInput[2]))) {
          valu = new ExprValueInfo(0);
        } else {
          const expr2 = mkMemberLambdas($var154[2], patternInput[0], patternInput[1], null, patternInput[3], patternInput_1[0], patternInput[5]);
          valu = new ExprValueInfo(7, [$var154[1], arities_1, patternInput_1[1].TotalSize, expr2, ety]);
        }
      } else {
        valu = new ExprValueInfo(7, [$var154[1], arities_1, patternInput_1[1].TotalSize, expr_, ety]);
      }

      let estimatedSize;
      const $var158 = vspec != null ? getValue(vspec).IsCompiledAsTopLevel ? [0, getValue(vspec)] : [1] : [1];

      switch ($var158[0]) {
        case 0:
          estimatedSize = 1;
          break;

        case 1:
          estimatedSize = 10;
          break;
      }

      return [expr_, (TotalSize = patternInput_1[1].TotalSize + estimatedSize | 0, new Summary(valu, 1, TotalSize, false, false))];

    case 1:
      return OptimizeExpr(cenv_1, env, e);
  }
}
export function OptimizeExprsThenReshapeAndConsiderSplits(cenv_1, env, exprs) {
  if (exprs.tail == null) {
    return NoExprs;
  } else {
    return OptimizeList(function (tupledArg) {
      return OptimizeExprThenReshapeAndConsiderSplit(cenv_1, env, tupledArg[0], tupledArg[1]);
    }, exprs);
  }
}
export function OptimizeExprsThenConsiderSplits(cenv_1, env, exprs) {
  if (exprs.tail == null) {
    return NoExprs;
  } else {
    return OptimizeList(function (e) {
      return OptimizeExprThenConsiderSplit(cenv_1, env, e);
    }, exprs);
  }
}
export function OptimizeExprThenReshapeAndConsiderSplit(cenv_1, env, shape, e) {
  return OptimizeExprThenConsiderSplit(cenv_1, env, ReshapeExpr(cenv_1, shape, e));
}
export function OptimizeDecisionTreeTargets(cenv_1, env, m, targets) {
  return OptimizeList(function (arg30_) {
    return OptimizeDecisionTreeTarget(cenv_1, env, m, arg30_);
  }, toList(targets));
}
export function ReshapeExpr(cenv_1, shape, e) {
  const matchValue = [shape, e];
  const $var159 = matchValue[0].tag === 3 ? matchValue[1].tag === 1 ? [0, matchValue[1].data[1], matchValue[1].data[0], matchValue[1].data[2], matchValue[0].data] : [1] : [1];

  switch ($var159[0]) {
    case 0:
      const tinst = destRefTupleTy(cenv_1.g, tyOfExpr(cenv_1.g, e));
      const subshapes = toList($var159[4]);
      return mkRefTupled(cenv_1.g, $var159[3], mapIndexed(function (i, subshape) {
        return ReshapeExpr(cenv_1, subshape, mkTupleFieldGet(cenv_1.g, tupInfoRef, e, tinst, i, $var159[3]));
      }, subshapes), tinst);

    case 1:
      return e;
  }
}
export function OptimizeExprThenConsiderSplit(cenv_1, env, e) {
  const patternInput = OptimizeExpr(cenv_1, env, e);
  return ConsiderSplitToMethod(true, cenv_1.settings.veryBigExprSize, cenv_1, env, patternInput[0], patternInput[1]);
}
export function ComputeSplitToMethodCondition(flag, threshold, cenv_1, env, e, einfo) {
  var fvs;

  if ((((flag ? cenv_1.emitTailcalls : false) ? !env.inLoop : false) ? einfo.FunctionSize >= threshold : false) ? (fvs = freeInExpr(CollectLocals, e), (!fvs.UsesUnboundRethrow ? !fvs.UsesMethodLocalConstructs : false) ? ZsetModule.forall(function (v) {
    return !env.dontSplitVars.ContainsVal(v) ? CurriedLambda(() => v.ValReprInfo != null)() ? true : ((v.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(2)) ? !isByrefLikeTy(cenv_1.g, v.Type) : false) ? !IsGenericValWithGenericContraints(cenv_1.g, v) : false) ? !v.IsMutable : false : false;
  }, fvs.FreeLocals) : false) : false) {
    return !isByrefLikeTy(cenv_1.g, tyOfExpr(cenv_1.g, e));
  } else {
    return false;
  }
}
export function ConsiderSplitToMethod(flag, threshold, cenv_1, env, e, einfo) {
  if (ComputeSplitToMethodCondition(flag, threshold, cenv_1, env, e, einfo)) {
    const m = Expr_get_Range.bind(e)();
    const patternInput = mkCompGenLocal(m, "unitVar", cenv_1.g.unit_ty);
    const ty = tyOfExpr(cenv_1.g, e);
    const nm = env.latestBoundId == null ? "$cont" : getValue(env.latestBoundId).idText + "$cont";
    const patternInput_1 = mkCompGenLocal(m, nm, op_MinusMinusGreater(cenv_1.g.unit_ty, ty));
    return [mkInvisibleLet(m, patternInput_1[0], mkLambda(m, patternInput[0], e, ty), primMkApp([patternInput_1[1], op_MinusMinusGreater(cenv_1.g.unit_ty, ty)], new List(), ofArray([mkUnit(cenv_1.g, m)]), m)), new Summary(einfo.Info, 1, einfo.TotalSize, einfo.HasEffect, einfo.MightMakeCriticalTailcall)];
  } else {
    return [e, einfo];
  }
}
export function OptimizeMatch(cenv_1, env, spMatch, exprm, dtree, targets, m, ty) {
  const patternInput = OptimizeDecisionTree(cenv_1, env, m, dtree);
  const patternInput_1 = OptimizeDecisionTreeTargets(cenv_1, env, m, targets);
  return RebuildOptimizedMatch(spMatch, exprm, m, ty, patternInput[0], patternInput_1[0], patternInput[1], patternInput_1[1]);
}
export function CombineMatchInfos(dinfo, tinfo) {
  const TotalSize = dinfo.TotalSize + tinfo.TotalSize | 0;
  const FunctionSize = dinfo.FunctionSize + tinfo.FunctionSize | 0;
  const HasEffect = dinfo.HasEffect ? true : tinfo.HasEffect;
  return new Summary(new ExprValueInfo(0), FunctionSize, TotalSize, HasEffect, tinfo.MightMakeCriticalTailcall);
}
export function RebuildOptimizedMatch(spMatch, exprm, m, ty, dtree, tgs, dinfo, tinfos) {
  const tinfo = CombineValueInfosUnknown(tinfos);
  const expr = mkAndSimplifyMatch(spMatch, exprm, m, ty, dtree, tgs);
  const einfo = CombineMatchInfos(dinfo, tinfo);
  return [expr, einfo];
}
export function OptimizeDecisionTreeTarget(cenv_1, env, _m, _arg3) {
  let env_1;
  cenv_1;
  _arg3.data[0];
  env_1 = env;
  const patternInput = OptimizeExpr(cenv_1, env_1, _arg3.data[1]);
  const patternInput_1 = ConsiderSplitToMethod(cenv_1.settings.abstractBigTargets, cenv_1.settings.bigTargetSize, cenv_1, env_1, patternInput[0], patternInput[1]);
  const evalue_ = AbstractExprInfoByVars(_arg3.data[0], new List(), patternInput_1[1].Info);
  return [new DecisionTreeTarget(0, [_arg3.data[0], patternInput_1[0], _arg3.data[2]]), new Summary(evalue_, patternInput_1[1].FunctionSize, patternInput_1[1].TotalSize, patternInput_1[1].HasEffect, patternInput_1[1].MightMakeCriticalTailcall)];
}
export function OptimizeDecisionTree(cenv_1, env, m, x) {
  if (x.tag === 2) {
    const patternInput = OptimizeBinding(cenv_1, false, env, x.data[0]);
    const binfo = patternInput[0][1];
    const bind = patternInput[0][0];
    const patternInput_1 = OptimizeDecisionTree(cenv_1, patternInput[1], m, x.data[1]);

    if (ValueIsUsedOrHasEffect(cenv_1, function () {
      return accFreeInDecisionTree(CollectLocals, patternInput_1[0], emptyFreeVars).FreeLocals;
    }, bind, binfo)) {
      const info = CombineValueInfosUnknown(ofArray([patternInput_1[1], binfo]));
      const $var160 = patternInput_1[0].tag === 1 ? patternInput_1[0].data[0].tail != null ? patternInput_1[0].data[0].tail.tail == null ? [0, patternInput_1[0].data[0].head, patternInput_1[0].data[1]] : [1] : [1] : [1];

      switch ($var160[0]) {
        case 0:
          const patternInput_2 = TryEliminateLet(cenv_1, env, bind, $var160[1], m);
          return [new DecisionTree(1, [ofArray([patternInput_2[0]]), $var160[2]]), info];

        case 1:
          return [new DecisionTree(2, [bind, patternInput_1[0]]), info];
      }
    } else {
      return [patternInput_1[0], patternInput_1[1]];
    }
  } else if (x.tag === 0) {
    const e = typeEquiv(cenv_1.g, tyOfExpr(cenv_1.g, x.data[0]), cenv_1.g.bool_ty) ? copyExpr(cenv_1.g, new ValCopyFlag(0), x.data[0]) : x.data[0];
    return OptimizeSwitch(cenv_1, env, e, x.data[1], x.data[2], x.data[3]);
  } else {
    const patternInput_3 = OptimizeExprsThenConsiderSplits(cenv_1, env, x.data[0]);
    return [new DecisionTree(1, [patternInput_3[0], x.data[1]]), CombineValueInfosUnknown(patternInput_3[1])];
  }
}
export function TryOptimizeDecisionTreeTest(cenv_1, test, vinfo) {
  const matchValue = [test, vinfo];
  let $var161;

  if (matchValue[0].tag === 0) {
    const activePatternResult44829 = _StripUnionCaseValue___(matchValue[1]);

    if (activePatternResult44829 != null) {
      $var161 = [0, matchValue[0].data[0], getValue(activePatternResult44829)[0]];
    } else {
      $var161 = [1];
    }
  } else {
    $var161 = [1];
  }

  switch ($var161[0]) {
    case 0:
      return function (arg00, arg10) {
        return cenv_1.g.unionCaseRefEq(arg00, arg10);
      }($var161[1], $var161[2]);

    case 1:
      let $var162;

      if (matchValue[0].tag === 1) {
        $var162 = [0];
      } else if (matchValue[0].tag === 2) {
        const activePatternResult44828 = _StripConstValue___(matchValue[1]);

        if (activePatternResult44828 != null) {
          $var162 = [1, matchValue[0].data, getValue(activePatternResult44828)];
        } else {
          $var162 = [2];
        }
      } else {
        $var162 = [2];
      }

      switch ($var162[0]) {
        case 0:
          return null;

        case 1:
          if ($var162[1].Equals(new Const(17)) ? true : $var162[2].Equals(new Const(17))) {
            return null;
          } else {
            return $var162[1].Equals($var162[2]);
          }

        case 2:
          let $var163;

          if (matchValue[0].tag === 3) {
            const activePatternResult44827 = _StripConstValue___(matchValue[1]);

            if (activePatternResult44827 != null) {
              $var163 = [0, getValue(activePatternResult44827)];
            } else {
              $var163 = [1];
            }
          } else {
            $var163 = [1];
          }

          switch ($var163[0]) {
            case 0:
              return $var163[1].Equals(new Const(17));

            case 1:
              if (matchValue[0].tag === 4) {
                const _tgty1 = matchValue[0].data[1];
                const _srcty1 = matchValue[0].data[0];
                return null;
              } else if (matchValue[0].tag === 5) {
                const _vrefOpt1 = matchValue[0].data[2];
                return null;
              } else {
                return null;
              }

          }

      }

  }
}
export function OptimizeSwitch(cenv_1, env, e, cases, dflt, m) {
  const patternInput = OptimizeExpr(cenv_1, env, e);
  let patternInput_1;

  if (cenv_1.settings.EliminateSwitch() ? !patternInput[1].HasEffect : false) {
    const matchValue = tryFind_1(function (_arg6) {
      return equals(TryOptimizeDecisionTreeTest(cenv_1, _arg6.data[0], patternInput[1].Info), true) ? true : false;
    }, cases);

    if (matchValue != null) {
      const _case = getValue(matchValue).data[1];
      patternInput_1 = [new List(), _case];
    } else {
      patternInput_1 = [filter_1(function (_arg7) {
        return equals(TryOptimizeDecisionTreeTest(cenv_1, _arg7.data[0], patternInput[1].Info), false) ? false : true;
      }, cases), dflt];
    }
  } else {
    patternInput_1 = [cases, dflt];
  }

  const matchValue_1 = [patternInput_1[0], patternInput_1[1]];
  const $var164 = matchValue_1[0].tail == null ? matchValue_1[1] != null ? [0] : [1] : [1];

  switch ($var164[0]) {
    case 0:
      const _case_1 = getValue(matchValue_1[1]);

      return OptimizeDecisionTree(cenv_1, env, m, _case_1);

    case 1:
      return OptimizeSwitchFallback(cenv_1, env, patternInput[0], patternInput[1], patternInput_1[0], patternInput_1[1], m);
  }
}
export function OptimizeSwitchFallback(cenv_1, env, e_, einfo, cases, dflt, m) {
  const patternInput_1 = unzip(map_2(function (_arg3) {
    const patternInput = OptimizeDecisionTree(cenv_1, env, m, _arg3.data[1]);
    return [new DecisionTreeCase(0, [_arg3.data[0], patternInput[0]]), patternInput[1]];
  }, cases));
  let patternInput_3;

  if (dflt != null) {
    const patternInput_2 = OptimizeDecisionTree(cenv_1, env, m, getValue(dflt));
    patternInput_3 = [patternInput_2[0], ofArray([patternInput_2[1]])];
  } else {
    patternInput_3 = [null, new List()];
  }

  const size = (patternInput_3[1].length + patternInput_1[1].length) * 2 | 0;
  const info = CombineValueInfosUnknown(append_1(new List(einfo, patternInput_1[1]), patternInput_3[1]));
  let info_1;
  const TotalSize = info.TotalSize + size | 0;
  const FunctionSize = info.FunctionSize + size | 0;
  info_1 = new Summary(info.Info, FunctionSize, TotalSize, info.HasEffect, info.MightMakeCriticalTailcall);
  return [new DecisionTree(0, [e_, patternInput_1[0], patternInput_3[0], m]), info_1];
}
export function OptimizeBinding(cenv_1, isRec, env, _arg4) {
  var FunctionSize;
  var TotalSize;
  var nvref;

  try {
    let env_1;

    if (isRec) {
      const dontSplitVars = function (arg00, arg10) {
        return env.dontSplitVars.Add(arg00, null);
      }(_arg4.data[0], null);

      env_1 = new IncrementalOptimizationEnv(env.latestBoundId, env.dontInline, dontSplitVars, env.inLoop, env.functionVal, env.typarInfos, env.localExternalVals, env.globalModuleInfos);
    } else {
      env_1 = env;
    }

    let patternInput_1;
    const env_2 = (_arg4.data[0].IsCompilerGenerated ? env_1.latestBoundId != null : false) ? env_1 : new IncrementalOptimizationEnv(_arg4.data[0].Id, env_1.dontInline, env_1.dontSplitVars, env_1.inLoop, env_1.functionVal, env_1.typarInfos, env_1.localExternalVals, env_1.globalModuleInfos);
    const cenv_2 = _arg4.data[0].InlineInfo.Equals(new ValInline(0)) ? new cenv(cenv_1.g, cenv_1.TcVal, cenv_1.amap, false, cenv_1.scope, cenv_1.localInternalVals, cenv_1.settings, cenv_1.emitTailcalls, cenv_1.casApplied) : cenv_1;
    const arityInfo = InferArityOfExprBinding(cenv_2.g, new AllowTypeDirectedDetupling(1), _arg4.data[0], _arg4.data[1]);
    const patternInput = OptimizeLambdas(_arg4.data[0], cenv_2, env_2, arityInfo, _arg4.data[1], _arg4.data[0].Type);
    patternInput_1 = [patternInput[0], (FunctionSize = patternInput[1].FunctionSize + 1 | 0, TotalSize = patternInput[1].TotalSize + 1 | 0, new Summary(patternInput[1].Info, FunctionSize, TotalSize, patternInput[1].HasEffect, patternInput[1].MightMakeCriticalTailcall))];

    const cut = function (ivalue) {
      switch (ivalue.tag) {
        case 2:
          return new ExprValueInfo(2, [ivalue.data[0], cut(ivalue.data[1])]);

        case 3:
          return new ExprValueInfo(3, map_1(cut, ivalue.data, Array));

        case 4:
          return new ExprValueInfo(4, [ivalue.data[0], map_1(cut, ivalue.data[1], Array)]);

        case 5:
          return new ExprValueInfo(5, [ivalue.data[0], map_1(cut, ivalue.data[1], Array)]);

        case 0:
        case 6:
        case 8:
          return ivalue;

        case 1:
          return MakeSizedValueInfo(cut(ivalue.data[1]));

        default:
          if (ivalue.data[2] > cenv_1.settings.lambdaInlineThreshold + ivalue.data[1] + 2) {
            return new ExprValueInfo(0);
          } else {
            const fvs = freeInExpr(CollectLocals, ivalue.data[3]);

            if (fvs.UsesMethodLocalConstructs) {
              return new ExprValueInfo(0);
            } else {
              return ivalue;
            }
          }

      }
    };

    const einfo = _arg4.data[0].MustInline ? patternInput_1[1] : new Summary(cut(patternInput_1[1].Info), patternInput_1[1].FunctionSize, patternInput_1[1].TotalSize, patternInput_1[1].HasEffect, patternInput_1[1].MightMakeCriticalTailcall);
    const einfo_1 = (((((!_arg4.data[0].MustInline ? !cenv_1.settings.KeepOptimizationValues() : false) ? true : IsCompiledAsStaticPropertyWithField(cenv_1.g, _arg4.data[0])) ? true : _arg4.data[0].InlineInfo.Equals(new ValInline(3))) ? true : (() => {
      var copyOfStruct;
      const matchValue = _arg4.data[0].DeclaringEntity;

      if (matchValue.tag === 1) {
        return false;
      } else {
        const matchValue_1 = cenv_1.g.system_MarshalByRefObject_tcref;

        if (matchValue_1 != null) {
          if (copyOfStruct = getValue(matchValue_1).TryDeref, copyOfStruct.IsSome) {
            return ExistsSameHeadTypeInHierarchy(cenv_1.g, cenv_1.amap, _arg4.data[0].Range, generalizedTyconRef(matchValue.data), getValue(cenv_1.g.system_MarshalByRefObject_typ));
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    })()) ? true : (nvref = mkLocalValRef(_arg4.data[0]), cenv_1.g.compilingFslib ? (((((((((((((((valRefEq(cenv_1.g, nvref, cenv_1.g.seq_vref) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_generated_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_finally_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_using_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_append_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_empty_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_delay_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_singleton_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_map_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.seq_collect_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.reference_equality_inner_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.generic_comparison_inner_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.generic_comparison_withc_inner_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.generic_equality_er_inner_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.generic_equality_per_inner_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.generic_equality_withc_inner_vref)) ? true : valRefEq(cenv_1.g, nvref, cenv_1.g.generic_hash_inner_vref) : false)) ? new Summary(new ExprValueInfo(0), einfo.FunctionSize, einfo.TotalSize, einfo.HasEffect, einfo.MightMakeCriticalTailcall) : einfo;

    if (_arg4.data[0].MustInline ? IsPartialExprVal(einfo_1.Info) : false) {
      errorR(new InternalError("the mustinline value '" + _arg4.data[0].LogicalName + "' was not inferred to have a known value", _arg4.data[0].Range));
    }

    const env_3 = BindInternalLocalVal(cenv_1, _arg4.data[0], mkValInfo(einfo_1, _arg4.data[0]), env_1);
    return [[new Binding(0, [_arg4.data[0], patternInput_1[0], _arg4.data[2]]), einfo_1], env_3];
  } catch (exn) {
    errorRecovery(exn, _arg4.data[0].Range);
    throw new ReportedError(exn);
  }
}
export function OptimizeBindings(cenv_1, isRec, env, xs) {
  return mapFold(function (env_1, arg30_) {
    return OptimizeBinding(cenv_1, isRec, env_1, arg30_);
  }, env, xs, ofArray);
}
export function OptimizeModuleExpr(cenv_1, env, x) {
  const patternInput = OptimizeModuleDef(cenv_1, env, new List(), x.data[1]);
  const info = patternInput[0][1];
  const def = patternInput[0][0];
  const bindInfosColl = patternInput[1][1];
  const _env = patternInput[1][0];
  const bindInfosColl_1 = concat(bindInfosColl);
  const rpi = ComputeRemappingFromImplementationToSignature(cenv_1.g, def, x.data[0]);
  let def_1;

  if (!cenv_1.settings.localOpt()) {
    def_1 = def;
  } else {
    const fvs = freeInModuleOrNamespace(CollectLocals, def);
    const dead = filter_1(function (tupledArg) {
      return (!ValueIsUsedOrHasEffect(cenv_1, function () {
        return fvs.FreeLocals;
      }, tupledArg[0], tupledArg[1]) ? rpi[1].mhiVals.Contains_0(tupledArg[0].Var) : false) ? !IsCompiledAsStaticProperty(cenv_1.g, tupledArg[0].Var) : false;
    }, bindInfosColl_1);
    const deadSet = ZsetModule.addList(map_2(function (tupledArg_1) {
      return tupledArg_1[0].Var;
    }, dead), ZsetModule.empty(valOrder));

    const elimModTy = function (mtyp) {
      const mty = new ModuleOrNamespaceType(mtyp.ModuleOrNamespaceKind, QueueListModule.filter($var165 => function (value) {
        return !value;
      }(function (arg10_) {
        return ZsetModule.memberOf(deadSet, arg10_);
      }($var165)), mtyp.AllValsAndMembers), mtyp.AllEntities);

      (function (list) {
        iterate(elimModSpec, list);
      })(mtyp.ModuleAndNamespaceDefinitions);

      return mty;
    };

    const elimModSpec = function (mspec) {
      const mtyp_1 = elimModTy(mspec.ModuleOrNamespaceType);
      mspec.entity_modul_contents = new MaybeLazy(0, mtyp_1);
    };

    const elimModDef = function (x_1) {
      switch (x_1.tag) {
        case 2:
          if (ZsetModule.contains(x_1.data[0].Var, deadSet)) {
            return new ModuleOrNamespaceExpr(4, [false, new List(), new List(), x_1.data[1]]);
          } else {
            return x_1;
          }

        case 3:
          return x_1;

        case 1:
          return new ModuleOrNamespaceExpr(1, map_2(elimModDef, x_1.data));

        case 0:
          return x_1;

        default:
          const mbinds = function (list_1) {
            return choose(elimModuleBinding, list_1);
          }(x_1.data[2]);

          return new ModuleOrNamespaceExpr(4, [x_1.data[0], x_1.data[1], mbinds, x_1.data[3]]);
      }
    };

    const elimModuleBinding = function (x_2) {
      if (x_2.tag === 1) {
        elimModSpec(x_2.data[0]);
        return new ModuleOrNamespaceBinding(1, [x_2.data[0], elimModDef(x_2.data[1])]);
      } else if (function (arg10__1) {
        return ZsetModule.memberOf(deadSet, arg10__1);
      }(x_2.data.Var)) {
        return null;
      } else {
        return x_2;
      }
    };

    def_1 = elimModDef(def);
  }

  const info_1 = AbstractAndRemapModulInfo("defs", cenv_1.g, x.data[2], rpi[0], rpi[1], info);
  return [new ModuleOrNamespaceExprWithSig(0, [x.data[0], def_1, x.data[2]]), info_1];
}
export function mkValBind(bind, info) {
  return [mkLocalValRef(bind.Var), info];
}
export function OptimizeModuleDef(cenv_1, env, bindInfosColl, x) {
  switch (x.tag) {
    case 0:
      const patternInput = OptimizeModuleExpr(cenv_1, env, x.data);
      const env_1 = BindValsInModuleOrNamespace(cenv_1, patternInput[1], env);
      return [[new ModuleOrNamespaceExpr(0, patternInput[0]), patternInput[1]], [env_1, bindInfosColl]];

    case 2:
      const patternInput_1 = OptimizeBinding(cenv_1, false, env, x.data[0]);
      const binfo = patternInput_1[0][1];
      const bind_ = patternInput_1[0][0];
      return [[new ModuleOrNamespaceExpr(2, [bind_, x.data[1]]), notlazy(new ModuleInfo(new ValInfos(ofArray([mkValBind(x.data[0], mkValInfo(binfo, x.data[0].Var))])), NameMapModule.empty()))], [patternInput_1[1], new List(ofArray([patternInput_1[0]]), bindInfosColl)]];

    case 3:
      const patternInput_2 = OptimizeExpr(cenv_1, env, x.data[0]);
      return [[new ModuleOrNamespaceExpr(3, [patternInput_2[0], x.data[1]]), EmptyModuleInfo], [env, bindInfosColl]];

    case 1:
      const patternInput_3 = OptimizeModuleDefs(cenv_1, env, bindInfosColl, x.data);
      const info = patternInput_3[0][1];
      const env_2 = patternInput_3[1][0];
      const defs = patternInput_3[0][0];
      const bindInfosColl_1 = patternInput_3[1][1];
      return [[new ModuleOrNamespaceExpr(1, defs), info], [env_2, bindInfosColl_1]];

    default:
      let env_3;

      if (x.data[0]) {
        cenv_1;
        allValsOfModDef(x);
        env_3 = env;
      } else {
        env_3 = env;
      }

      const patternInput_4 = OptimizeModuleBindings(cenv_1, env_3, bindInfosColl, x.data[2]);
      const env_4 = patternInput_4[1][0];
      const bindInfosColl_2 = patternInput_4[1][1];
      const patternInput_5 = unzip(patternInput_4[0]);
      const binds = choose(function (_arg8) {
        if (_arg8.tag === 0) {
          const x_1 = _arg8.data[0];
          return x_1;
        } else {
          return null;
        }
      }, patternInput_5[1]);
      const binfos = choose(function (_arg9) {
        if (_arg9.tag === 0) {
          const x_2 = _arg9.data[1];
          return x_2;
        } else {
          return null;
        }
      }, patternInput_5[1]);
      const minfos = choose(function (_arg10) {
        return _arg10.tag === 1 ? _arg10.data : null;
      }, patternInput_5[1]);
      return [[new ModuleOrNamespaceExpr(4, [x.data[0], x.data[1], patternInput_5[0], x.data[3]]), notlazy(new ModuleInfo(new ValInfos(toList(map2(function (bind, binfo_1) {
        return mkValBind(bind, mkValInfo(binfo_1, bind.Var));
      }, binds, binfos))), NameMapModule.ofList(minfos)))], [env_4, bindInfosColl_2]];
  }
}
export function OptimizeModuleBindings(cenv_1, env, bindInfosColl, xs) {
  return mapFold(function (tupledArg, x) {
    return OptimizeModuleBinding(cenv_1, tupledArg[0], tupledArg[1], x);
  }, [env, bindInfosColl], xs, ofArray);
}
export function OptimizeModuleBinding(cenv_1, env, bindInfosColl, x) {
  if (x.tag === 1) {
    const id = x.data[0].Id;
    const patternInput = OptimizeModuleDef(cenv_1, env, bindInfosColl, x.data[1]);
    const info = patternInput[0][1];
    const def = patternInput[0][0];
    const bindInfosColl_1 = patternInput[1][1];
    const env_1 = BindValsInModuleOrNamespace(cenv_1, info, env);
    return [[new ModuleOrNamespaceBinding(1, [x.data[0], def]), new Choice(1, [id.idText, info])], [env_1, bindInfosColl_1]];
  } else {
    const patternInput_1 = OptimizeBinding(cenv_1, true, env, x.data);
    const binfo = patternInput_1[0][1];
    const bind_ = patternInput_1[0][0];
    return [[new ModuleOrNamespaceBinding(0, bind_), new Choice(0, [bind_, binfo])], [patternInput_1[1], new List(ofArray([patternInput_1[0]]), bindInfosColl)]];
  }
}
export function OptimizeModuleDefs(cenv_1, env, bindInfosColl, defs) {
  const patternInput = mapFold(function (tupledArg, x) {
    return OptimizeModuleDef(cenv_1, tupledArg[0], tupledArg[1], x);
  }, [env, bindInfosColl], defs, ofArray);
  const env_1 = patternInput[1][0];
  const bindInfosColl_1 = patternInput[1][1];
  const patternInput_1 = unzip(patternInput[0]);
  return [[patternInput_1[0], UnionOptimizationInfos(patternInput_1[1])], [env_1, bindInfosColl_1]];
}
export function OptimizeImplFileInternal(cenv_1, env, isIncrementalFragment, hidden, _arg5) {
  let patternInput_2;

  if (isIncrementalFragment) {
    const patternInput = OptimizeModuleDef(cenv_1, env, new List(), _arg5.data[2].data[1]);
    const minfo = patternInput[0][1];
    const env_1 = patternInput[1][0];
    const def = patternInput[0][0];
    const _bindInfosColl = patternInput[1][1];
    patternInput_2 = [env_1, new ModuleOrNamespaceExprWithSig(0, [_arg5.data[2].data[0], def, _arg5.data[2].data[2]]), minfo];
  } else {
    const patternInput_1 = OptimizeModuleExpr(cenv_1, env, _arg5.data[2]);
    const env_2 = BindValsInModuleOrNamespace(cenv_1, patternInput_1[1], env);
    let env_3;
    const localExternalVals = Map_2_MarkAsCollapsible.bind(env_2.localExternalVals)();
    env_3 = new IncrementalOptimizationEnv(env_2.latestBoundId, env_2.dontInline, env_2.dontSplitVars, env_2.inLoop, env_2.functionVal, env_2.typarInfos, localExternalVals, env_2.globalModuleInfos);
    patternInput_2 = [env_3, patternInput_1[0], patternInput_1[1]];
  }

  const hidden_1 = ComputeHidingInfoAtAssemblyBoundary(_arg5.data[2].Type, hidden);
  const minfo_1 = AbstractLazyModulInfoByHiding(true, hidden_1)(patternInput_2[2]);
  return [patternInput_2[0], new TypedImplFile(0, [_arg5.data[0], _arg5.data[1], patternInput_2[1], _arg5.data[3], _arg5.data[4]]), minfo_1, hidden_1];
}
export function OptimizeImplFile(settings, ccu, tcGlobals, tcVal, importMap, optEnv, isIncrementalFragment, emitTailcalls, hidden, mimpls) {
  const cenv_1 = new cenv(tcGlobals, tcVal, importMap, true, ccu, create(), settings, emitTailcalls, create());
  const results = OptimizeImplFileInternal(cenv_1, optEnv, isIncrementalFragment, hidden, mimpls);

  const optimizeDuringCodeGen = function (expr) {
    return OptimizeExpr(cenv_1, results[0], expr)[0];
  };

  return [results, optimizeDuringCodeGen];
}
export function p_ExprValueInfo(x, st) {
  switch (x.tag) {
    case 0:
      p_byte(1, st);
      break;

    case 2:
      p_byte(2, st);

      (function (tupledArg, st_2) {
        p_vref("optval")(tupledArg[0], st_2);

        (function (x_1, st_1) {
          p_ExprValueInfo(x_1, st_1);
        })(tupledArg[1], st_2);
      })([x.data[0], x.data[1]], st);

      break;

    case 3:
      p_byte(3, st);
      p_array(function (x_2, st_3) {
        p_ExprValueInfo(x_2, st_3);
      })(x.data, st);
      break;

    case 5:
      p_byte(4, st);

      (function (tupledArg_1, st_5) {
        p_ucref(tupledArg_1[0], st_5);
        p_array(function (x_3, st_4) {
          p_ExprValueInfo(x_3, st_4);
        })(tupledArg_1[1], st_5);
      })([x.data[0], x.data[1]], st);

      break;

    case 7:
      p_byte(5, st);

      (function (tupledArg_2, st_6) {
        (function (arg00_, arg10_) {
          p_int(arg00_, arg10_);
        })(tupledArg_2[0], st_6);

        (function (arg00__1, arg10__1) {
          p_int(arg00__1, arg10__1);
        })(tupledArg_2[1], st_6);

        p_expr(tupledArg_2[2], st_6);
        p_typ(tupledArg_2[3], st_6);
      })([x.data[1], x.data[2], x.data[3], x.data[4]], st);

      break;

    case 8:
      p_byte(6, st);

      (function (tupledArg_3, st_7) {
        (function (arg00__2, arg10__2) {
          p_int(arg00__2, arg10__2);
        })(tupledArg_3[0], st_7);

        p_expr(tupledArg_3[1], st_7);
      })([x.data[0], x.data[1]], st);

      break;

    case 4:
      p_byte(7, st);

      (function (tupledArg_4, st_9) {
        p_tcref("opt data")(tupledArg_4[0], st_9);
        p_array(function (x_4, st_8) {
          p_ExprValueInfo(x_4, st_8);
        })(tupledArg_4[1], st_9);
      })([x.data[0], x.data[1]], st);

      break;

    case 1:
      p_ExprValueInfo(x.data[1], st);
      break;

    default:
      p_byte(0, st);

      (function (tupledArg_5, st_10) {
        p_const(tupledArg_5[0], st_10);
        p_typ(tupledArg_5[1], st_10);
      })([x.data[0], x.data[1]], st);

  }
}
export function p_ValInfo(v, st) {
  (function (tupledArg, st_2) {
    (function (x, st_1) {
      p_ExprValueInfo(x, st_1);
    })(tupledArg[0], st_2);

    (function (arg00_, arg10_) {
      p_bool(arg00_, arg10_);
    })(tupledArg[1], st_2);
  })([v.ValExprInfo, v.ValMakesNoCriticalTailcalls], st);
}
export function p_ModuleInfo(x, st) {
  (function (tupledArg_1, st_4) {
    p_array(function (tupledArg, st_2) {
      p_vref("opttab")(tupledArg[0], st_2);

      (function (v, st_1) {
        p_ValInfo(v, st_1);
      })(tupledArg[1], st_2);
    })(tupledArg_1[0], st_4);
    p_namemap(function (x_1, st_3) {
      p_LazyModuleInfo(x_1, st_3);
    })(tupledArg_1[1], st_4);
  })([Array.from(x.ValInfos.Entries), x.ModuleOrNamespaceInfos], st);
}
export function p_LazyModuleInfo(x, st) {
  p_lazy(function (x_1, st_1) {
    p_ModuleInfo(x_1, st_1);
  })(x, st);
}
export function p_CcuOptimizationInfo(x, st) {
  p_LazyModuleInfo(x, st);
}
export function u_ExprInfo(st) {
  const loop = function (st_1) {
    const tag = u_byte(st_1) | 0;

    switch (tag) {
      case 0:
        return function (tupledArg) {
          return new ExprValueInfo(6, [tupledArg[0], tupledArg[1]]);
        }(function (st_2) {
          const a = u_const(st_2);
          const b = u_typ(st_2);
          return [a, b];
        }(st_1));

      case 1:
        return new ExprValueInfo(0);

      case 2:
        return function (tupledArg_1) {
          return new ExprValueInfo(2, [tupledArg_1[0], tupledArg_1[1]]);
        }(function (st_3) {
          const a_1 = u_vref(st_3);
          const b_1 = loop(st_3);
          return [a_1, b_1];
        }(st_1));

      case 3:
        return new ExprValueInfo(3, u_array(loop)(st_1));

      case 4:
        return function (tupledArg_2) {
          return new ExprValueInfo(5, [tupledArg_2[0], tupledArg_2[1]]);
        }(function (st_4) {
          const a_2 = u_ucref(st_4);
          const b_2 = u_array(loop)(st_4);
          return [a_2, b_2];
        }(st_1));

      case 5:
        return function (tupledArg_3) {
          return new ExprValueInfo(7, [newUnique(), tupledArg_3[0], tupledArg_3[1], tupledArg_3[2], tupledArg_3[3]]);
        }(function (st_5) {
          const a_3 = function (arg00_) {
            return u_int(arg00_);
          }(st_5) | 0;

          const b_3 = function (arg00__1) {
            return u_int(arg00__1);
          }(st_5) | 0;

          const c = u_expr(st_5);
          const d = u_typ(st_5);
          return [a_3, b_3, c, d];
        }(st_1));

      case 6:
        return function (tupledArg_4) {
          return new ExprValueInfo(8, [tupledArg_4[0], tupledArg_4[1]]);
        }(function (st_6) {
          const a_4 = function (arg00__2) {
            return u_int(arg00__2);
          }(st_6) | 0;

          const b_4 = u_expr(st_6);
          return [a_4, b_4];
        }(st_1));

      case 7:
        return function (tupledArg_5) {
          return new ExprValueInfo(4, [tupledArg_5[0], tupledArg_5[1]]);
        }(function (st_7) {
          const a_5 = u_tcref(st_7);
          const b_5 = u_array(loop)(st_7);
          return [a_5, b_5];
        }(st_1));

      default:
        throw new Error("loop");
    }
  };

  return MakeSizedValueInfo(loop(st));
}
export function u_ValInfo(st) {
  const patternInput = function (st_2) {
    const a = function (st_1) {
      return u_ExprInfo(st_1);
    }(st_2);

    const b = function (arg00_) {
      return u_bool(arg00_);
    }(st_2);

    return [a, b];
  }(st);

  return new ValInfo(patternInput[1], patternInput[0]);
}
export function u_ModuleInfo(st) {
  const patternInput = function (st_4) {
    const a_1 = u_array(function (st_2) {
      const a = u_vref(st_2);

      const b = function (st_1) {
        return u_ValInfo(st_1);
      }(st_2);

      return [a, b];
    })(st_4);
    const b_1 = u_namemap(function (st_3) {
      return u_LazyModuleInfo(st_3);
    })(st_4);
    return [a_1, b_1];
  }(st);

  return new ModuleInfo(new ValInfos(patternInput[0]), patternInput[1]);
}
export function u_LazyModuleInfo(st) {
  return u_lazy(function (st_1) {
    return u_ModuleInfo(st_1);
  })(st);
}
export function u_CcuOptimizationInfo(st) {
  return u_LazyModuleInfo(st);
}