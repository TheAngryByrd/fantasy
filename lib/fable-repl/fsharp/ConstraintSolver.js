import { pathOfLid, TyparStaticReq, SynTypar, mkSynId } from "./ast";
import { range, range0 } from "./range";
import { TOp, TraitConstraintSln, stripTyparEqns, typarEq, TraitConstraintInfo, Expr, ValUseFlag, ValRef, TyparConstraint, Typar, TType, Measure, mkTyparTy, TyparRigidity, TyparDynamicReq, TyparKind, NewTypar, unassignedTyparName } from "./tast";
import { concat, filter, partition, choose, append, reverse, ofArray, map } from "../fable-core/List";
import List from "../fable-core/List";
import { ReflectedArgInfo, CallerInfoInfo, OptionalArgInfo, ExistsSameHeadTypeInHierarchy, HaveSameHeadType, IterateEntireHierarchyOfType, AllowMultiIntfInstantiations, RecdFieldInfo, MethInfo, FixupNewTypars } from "./infos";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { mkCoerceIfNeeded, MakeApplicationAndBetaReduce, mkRecdFieldGet, mkRecdFieldGetViaExprAddr, mkStaticRecdFieldGet, mkRecdFieldSetViaExprAddr, Mutates, mkExprAddrOfExpr, tyOfExpr, isByrefTy, mkStaticRecdFieldSet, destAppTy, helpEnsureTypeHasMetadata, mkRefTupledTy, isUnitTy, destByrefTy, TypeHasDefaultValue, isRefTy, isUnmanagedTy, isStructTy, stripTyEqnsAndMeasureEqns, isDelegateTy, $7C$SpecialNotEquatableHeadType$7C$_$7C$ as _SpecialNotEquatableHeadType___, $7C$SpecialEquatableHeadType$7C$_$7C$ as _SpecialEquatableHeadType___, tcrefOfAppTy, isAppTy, $7C$SpecialComparableHeadType$7C$_$7C$ as _SpecialComparableHeadType___, HasFSharpAttribute, tryDestAppTy, $7C$NullableTy$7C$_$7C$ as _NullableTy___, TypeSatisfiesNullConstraint, traitsAEquiv, freeInTypesLeftToRightSkippingConstraints, mkUnit, isAnyTupleTy, isFunTy, rankOfArrayTy, isArrayTy, isTyparTy, GetFSharpViewOfReturnType, typeAEquiv, mkAppTy, isSealedTy, destArrayTy, isArray1DTy, isObjTy, typarsAEquiv, evalTupInfoIsStruct, tyconRefEq, reduceTyconRefMeasureableOrProvided, stripTyEqnsA, tryDestTyparTy, MeasureVarExponent, ProdMeasures, ListMeasureConOccsWithNonZeroExponents, isAnyParTy, tryAnyParTy, ListMeasureVarOccsWithNonZeroExponents, JoinTyparStaticReq, measureEquiv, $7C$AppTy$7C$_$7C$ as _AppTy___, typeEquiv, underlyingTypeOfEnumTy, isEnumTy, Erasure, typeEquivAux, stripTyEqns, TypeEquivEnv, DisplayEnv } from "./TastOps";
import { compare, Unit, comparePrimitives, equals, hash, Tuple, Function as _Function, Option, equalsRecords, makeGeneric } from "../fable-core/Util";
import { TcGlobals } from "./TcGlobals";
import { minimalStringOfType, prettyStringOfTy, stringOfMethInfo } from "./NicePrint";
import { ImportILTypeRef, ImportMap } from "./import";
import { TryDestStandardDelegateTyp, GetIntrinsicMethInfosOfType, GetIntrinsicConstructorInfosOfType, FindMemberFlag, TryFindIntrinsicNamedItemOfType, InfoReader } from "./InfoReader";
import { HashMultiMap } from "../utils/HashMultiMap";
import Long from "../fable-core/Long";
import { item, sortWith, map2, sum, toList, reduce, forAll, iterate, exists } from "../fable-core/Seq";
import { defaultArg, getValue } from "../fable-core/Option";
import { minimumElement, isEmpty, intersectMany, create } from "../fable-core/Set";
import Comparer from "../fable-core/Comparer";
import { CommitOperationResult, ReportWarnings, RaiseOperationResult, OperationResult, ErrorWithSuggestions, OptionD, trackErrors, IterateIdxD, Iterate2D, AtLeastOneD, ResultD, TryD, RepeatWhileD, Error as _Error, WarnD, op_PlusPlus, IterateD, CompleteD, InternalError, error as error_1, ErrorD, CheckNoErrorsAndGetWarnings } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import { OneRational, AbsRational, ZeroRational, GcdRational, SignRational, DivRational, NegRational } from "./rational";
import { ListSet } from "./lib";
import CurriedLambda from "../fable-core/CurriedLambda";
import { ChooseTyparSolutionAndRange, CanCoerce, TypeFeasiblySubsumesType, FindUniqueFeasibleSupertype } from "./TypeRelations";
import { List as List_1 } from "../absil/illib";
import { IsMethInfoAccessible, IsRecdFieldAccessible, AccessorDomain } from "./AccessibilityLogic";
import { DecompileOpName } from "./PrettyNaming";
import { printf, toText, replace, join } from "../fable-core/String";
import { MakeMethInfoCall, NamesOfCalledArgs, AdjustCalledArgType, GetCalledArg, CalledMeth, CallerArg } from "./MethodCalls";
import { CheckMethInfoAttributes } from "./AttributeChecking";
import { resolveILMethodRef, mkRefToILMethod } from "../absil/il";
import { TyconIsCandidateForAugmentationWithEquals, TyconIsCandidateForAugmentationWithCompare } from "./AugmentWithHashCompare";
import { Microsoft } from "../fcs-fable/adapters";
import Choice from "../fable-core/Choice";
export const compgenId = mkSynId(range0, unassignedTyparName);
export function NewCompGenTypar(kind, rigid, staticReq, dynamicReq, error) {
  return NewTypar(kind, rigid, new SynTypar(0, [compgenId, staticReq, true]), error, dynamicReq, new List(), false, false);
}
export function anon_id(m) {
  return mkSynId(m, unassignedTyparName);
}
export function NewAnonTypar(kind, m, rigid, _var, dyn) {
  return NewTypar(kind, rigid, new SynTypar(0, [anon_id(m), _var, true]), false, dyn, new List(), false, false);
}
export function NewNamedInferenceMeasureVar(_m, rigid, _var, id) {
  return NewTypar(new TyparKind(1), rigid, new SynTypar(0, [id, _var, false]), false, new TyparDynamicReq(0), new List(), false, false);
}
export function NewInferenceMeasurePar() {
  return NewCompGenTypar(new TyparKind(1), new TyparRigidity(3), new TyparStaticReq(0), new TyparDynamicReq(0), false);
}
export function NewErrorTypar() {
  return NewCompGenTypar(new TyparKind(0), new TyparRigidity(3), new TyparStaticReq(0), new TyparDynamicReq(0), true);
}
export function NewErrorMeasureVar() {
  return NewCompGenTypar(new TyparKind(1), new TyparRigidity(3), new TyparStaticReq(0), new TyparDynamicReq(0), true);
}
export function NewInferenceType() {
  return mkTyparTy(NewTypar(new TyparKind(0), new TyparRigidity(3), new SynTypar(0, [compgenId, new TyparStaticReq(0), true]), false, new TyparDynamicReq(0), new List(), false, false));
}
export function NewErrorType() {
  return mkTyparTy(NewErrorTypar());
}
export function NewErrorMeasure() {
  return new Measure(0, NewErrorMeasureVar());
}
export function NewInferenceTypes(l) {
  return map(function (_arg1) {
    return NewInferenceType();
  }, l);
}
export function FreshenAndFixupTypars(m, rigid, fctps, tinst, tpsorig) {
  const copy_tyvar = function (tp) {
    return NewCompGenTypar(tp.Kind, rigid, tp.StaticReq, rigid.Equals(new TyparRigidity(0)) ? new TyparDynamicReq(1) : new TyparDynamicReq(0), false);
  };

  const tps = function (list) {
    return map(copy_tyvar, list);
  }(tpsorig);

  const patternInput = FixupNewTypars(m, fctps, tinst, tpsorig, tps);
  return [tps, patternInput[0], patternInput[1]];
}
export function FreshenTypeInst(m, tpsorig) {
  return FreshenAndFixupTypars(m, new TyparRigidity(3), new List(), new List(), tpsorig);
}
export function FreshMethInst(m, fctps, tinst, tpsorig) {
  return FreshenAndFixupTypars(m, new TyparRigidity(3), fctps, tinst, tpsorig);
}
export function FreshenTypars(m, tpsorig) {
  if (tpsorig.tail == null) {
    return new List();
  } else {
    const patternInput = FreshenTypeInst(m, tpsorig);
    return patternInput[2];
  }
}
export function FreshenMethInfo(m, minfo) {
  const patternInput = FreshMethInst(m, minfo.GetFormalTyparsOfDeclaringType(m), minfo.DeclaringTypeInst, minfo.FormalMethodTypars);
  return patternInput[2];
}
export class ContextInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ContextInfo",
      interfaces: ["FSharpUnion"],
      cases: [["NoContext"], ["IfExpression", range], ["OmittedElseBranch", range], ["ElseBranchResult", range], ["RecordFields"], ["TupleInRecordFields"], ["CollectionElement", "boolean", range], ["ReturnInComputationExpression"], ["YieldInComputationExpression"], ["RuntimeTypeTest", "boolean"], ["DowncastUsedInsteadOfUpcast", "boolean"], ["FollowingPatternMatchClause", range], ["PatternMatchGuard", range], ["SequenceExpression", TType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ContextInfo", ContextInfo);
export class ConstraintSolverTupleDiffLengths extends Error {
  constructor(data0, data1, data2, data3, data4) {
    super();
    Object.setPrototypeOf(this, ConstraintSolverTupleDiffLengths.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverTupleDiffLengths",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: makeGeneric(List, {
          T: TType
        }),
        Data2: makeGeneric(List, {
          T: TType
        }),
        Data3: range,
        Data4: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverTupleDiffLengths", ConstraintSolverTupleDiffLengths);
export class ConstraintSolverInfiniteTypes extends Error {
  constructor(data0, data1, data2, data3, data4, data5) {
    super();
    Object.setPrototypeOf(this, ConstraintSolverInfiniteTypes.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
    this.Data5 = data5;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverInfiniteTypes",
      interfaces: ["FSharpException"],
      properties: {
        Data0: ContextInfo,
        Data1: DisplayEnv,
        Data2: TType,
        Data3: TType,
        Data4: range,
        Data5: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverInfiniteTypes", ConstraintSolverInfiniteTypes);
export class ConstraintSolverTypesNotInEqualityRelation extends Error {
  constructor(data0, data1, data2, data3, data4, data5) {
    super();
    Object.setPrototypeOf(this, ConstraintSolverTypesNotInEqualityRelation.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
    this.Data5 = data5;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverTypesNotInEqualityRelation",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: TType,
        Data2: TType,
        Data3: range,
        Data4: range,
        Data5: ContextInfo
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverTypesNotInEqualityRelation", ConstraintSolverTypesNotInEqualityRelation);
export class ConstraintSolverTypesNotInSubsumptionRelation extends Error {
  constructor(data0, data1, data2, data3, data4) {
    super();
    Object.setPrototypeOf(this, ConstraintSolverTypesNotInSubsumptionRelation.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverTypesNotInSubsumptionRelation",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: TType,
        Data2: TType,
        Data3: range,
        Data4: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverTypesNotInSubsumptionRelation", ConstraintSolverTypesNotInSubsumptionRelation);
export class ConstraintSolverMissingConstraint extends Error {
  constructor(data0, data1, data2, data3, data4) {
    super();
    Object.setPrototypeOf(this, ConstraintSolverMissingConstraint.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverMissingConstraint",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: Typar,
        Data2: TyparConstraint,
        Data3: range,
        Data4: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverMissingConstraint", ConstraintSolverMissingConstraint);
export class ConstraintSolverError extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, ConstraintSolverError.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverError",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: range,
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverError", ConstraintSolverError);
export class ConstraintSolverRelatedInformation extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, ConstraintSolverRelatedInformation.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverRelatedInformation",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Option("string"),
        Data1: range,
        Data2: Error
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverRelatedInformation", ConstraintSolverRelatedInformation);
export class ErrorFromApplyingDefault extends Error {
  constructor(data0, data1, data2, data3, data4, data5) {
    super();
    Object.setPrototypeOf(this, ErrorFromApplyingDefault.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
    this.Data5 = data5;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ErrorFromApplyingDefault",
      interfaces: ["FSharpException"],
      properties: {
        Data0: TcGlobals,
        Data1: DisplayEnv,
        Data2: Typar,
        Data3: TType,
        Data4: Error,
        Data5: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ErrorFromApplyingDefault", ErrorFromApplyingDefault);
export class ErrorFromAddingTypeEquation extends Error {
  constructor(data0, data1, data2, data3, data4, data5) {
    super();
    Object.setPrototypeOf(this, ErrorFromAddingTypeEquation.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
    this.Data5 = data5;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ErrorFromAddingTypeEquation",
      interfaces: ["FSharpException"],
      properties: {
        Data0: TcGlobals,
        Data1: DisplayEnv,
        Data2: TType,
        Data3: TType,
        Data4: Error,
        Data5: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ErrorFromAddingTypeEquation", ErrorFromAddingTypeEquation);
export class ErrorsFromAddingSubsumptionConstraint extends Error {
  constructor(data0, data1, data2, data3, data4, data5, data6) {
    super();
    Object.setPrototypeOf(this, ErrorsFromAddingSubsumptionConstraint.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
    this.Data5 = data5;
    this.Data6 = data6;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ErrorsFromAddingSubsumptionConstraint",
      interfaces: ["FSharpException"],
      properties: {
        Data0: TcGlobals,
        Data1: DisplayEnv,
        Data2: TType,
        Data3: TType,
        Data4: Error,
        Data5: ContextInfo,
        Data6: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ErrorsFromAddingSubsumptionConstraint", ErrorsFromAddingSubsumptionConstraint);
export class ErrorFromAddingConstraint extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, ErrorFromAddingConstraint.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ErrorFromAddingConstraint",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: Error,
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ErrorFromAddingConstraint", ErrorFromAddingConstraint);
export class PossibleOverload extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, PossibleOverload.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.PossibleOverload",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: "string",
        Data2: Error,
        Data3: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.PossibleOverload", PossibleOverload);
export class UnresolvedOverloading extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, UnresolvedOverloading.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.UnresolvedOverloading",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: makeGeneric(List, {
          T: Error
        }),
        Data2: "string",
        Data3: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.UnresolvedOverloading", UnresolvedOverloading);
export class UnresolvedConversionOperator extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, UnresolvedConversionOperator.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.UnresolvedConversionOperator",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: TType,
        Data2: TType,
        Data3: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.UnresolvedConversionOperator", UnresolvedConversionOperator);
export function GetPossibleOverloads(amap, m, denv, calledMethGroup) {
  return map(function (tupledArg) {
    return new PossibleOverload(denv, stringOfMethInfo(amap, m, denv, tupledArg[0].Method), tupledArg[1], m);
  }, calledMethGroup);
}
export class ConstraintSolverState {
  constructor(g, amap, infoReader, tcVal, extraCxs) {
    this.g = g;
    this.amap = amap;
    this.InfoReader = infoReader;
    this.TcVal = tcVal;
    this.ExtraCxs = extraCxs;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverState",
      interfaces: ["FSharpRecord"],
      properties: {
        g: TcGlobals,
        amap: ImportMap,
        InfoReader: InfoReader,
        TcVal: _Function([ValRef, ValUseFlag, makeGeneric(List, {
          T: TType
        }), range, Tuple([Expr, TType])]),
        ExtraCxs: makeGeneric(HashMultiMap, {
          Key: Long,
          Value: Tuple([TraitConstraintInfo, range])
        })
      }
    };
  }

  static New(g, amap, infoReader, tcVal) {
    const ExtraCxs = HashMultiMap[".ctor"](10, {
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

    });
    return new ConstraintSolverState(g, amap, infoReader, tcVal, ExtraCxs);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverState", ConstraintSolverState);
export class ConstraintSolverEnv {
  constructor(solverState, eContextInfo, matchingOnly, m, equivEnv, displayEnv) {
    this.SolverState = solverState;
    this.eContextInfo = eContextInfo;
    this.MatchingOnly = matchingOnly;
    this.m = m;
    this.EquivEnv = equivEnv;
    this.DisplayEnv = displayEnv;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverEnv",
      interfaces: ["FSharpRecord"],
      properties: {
        SolverState: ConstraintSolverState,
        eContextInfo: ContextInfo,
        MatchingOnly: "boolean",
        m: range,
        EquivEnv: TypeEquivEnv,
        DisplayEnv: DisplayEnv
      }
    };
  }

  get InfoReader() {
    return this.SolverState.InfoReader;
  }

  get g() {
    return this.SolverState.g;
  }

  get amap() {
    return this.SolverState.amap;
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.ConstraintSolverEnv", ConstraintSolverEnv);
export function MakeConstraintSolverEnv(contextInfo, css, m, denv) {
  return new ConstraintSolverEnv(css, contextInfo, false, m, TypeEquivEnv.Empty, denv);
}
export function occursCheck(g, un, ty) {
  occursCheck: while (true) {
    const matchValue = stripTyEqns(g, ty);
    const $var1 = matchValue.tag === 4 ? [0, matchValue.data[1]] : matchValue.tag === 1 ? [0, matchValue.data[1]] : matchValue.tag === 2 ? [0, matchValue.data[1]] : matchValue.tag === 3 ? [1] : matchValue.tag === 5 ? [2] : matchValue.tag === 0 ? [3] : [4];

    switch ($var1[0]) {
      case 0:
        return exists(function (ty_1) {
          return occursCheck(g, un, ty_1);
        }, $var1[1]);

      case 1:
        if (occursCheck(g, un, matchValue.data[0])) {
          return true;
        } else {
          g = g;
          un = un;
          ty = matchValue.data[1];
          continue occursCheck;
        }

      case 2:
        return typarEq(un, matchValue.data);

      case 3:
        g = g;
        un = un;
        ty = matchValue.data[1];
        continue occursCheck;

      case 4:
        return false;
    }
  }
}
export function isNativeIntegerTy(g, ty) {
  isNativeIntegerTy: while (true) {
    if (typeEquivAux(new Erasure(1), g, g.nativeint_ty, ty) ? true : typeEquivAux(new Erasure(1), g, g.unativeint_ty, ty)) {
      return true;
    } else if (isEnumTy(g, ty)) {
      const $var96 = g;
      ty = underlyingTypeOfEnumTy(g, ty);
      g = $var96;
      continue isNativeIntegerTy;
    } else {
      return false;
    }
  }
}
export function isSignedIntegerTy(g, ty) {
  if (((typeEquivAux(new Erasure(1), g, g.sbyte_ty, ty) ? true : typeEquivAux(new Erasure(1), g, g.int16_ty, ty)) ? true : typeEquivAux(new Erasure(1), g, g.int32_ty, ty)) ? true : typeEquivAux(new Erasure(1), g, g.nativeint_ty, ty)) {
    return true;
  } else {
    return typeEquivAux(new Erasure(1), g, g.int64_ty, ty);
  }
}
export function isUnsignedIntegerTy(g, ty) {
  if (((typeEquivAux(new Erasure(1), g, g.byte_ty, ty) ? true : typeEquivAux(new Erasure(1), g, g.uint16_ty, ty)) ? true : typeEquivAux(new Erasure(1), g, g.uint32_ty, ty)) ? true : typeEquivAux(new Erasure(1), g, g.unativeint_ty, ty)) {
    return true;
  } else {
    return typeEquivAux(new Erasure(1), g, g.uint64_ty, ty);
  }
}
export function isIntegerOrIntegerEnumTy(g, ty) {
  isIntegerOrIntegerEnumTy: while (true) {
    if (isSignedIntegerTy(g, ty) ? true : isUnsignedIntegerTy(g, ty)) {
      return true;
    } else if (isEnumTy(g, ty)) {
      const $var97 = g;
      ty = underlyingTypeOfEnumTy(g, ty);
      g = $var97;
      continue isIntegerOrIntegerEnumTy;
    } else {
      return false;
    }
  }
}
export function isIntegerTy(g, ty) {
  if (isSignedIntegerTy(g, ty)) {
    return true;
  } else {
    return isUnsignedIntegerTy(g, ty);
  }
}
export function isStringTy(g, ty) {
  return typeEquiv(g, g.string_ty, ty);
}
export function isCharTy(g, ty) {
  return typeEquiv(g, g.char_ty, ty);
}
export function isBoolTy(g, ty) {
  return typeEquiv(g, g.bool_ty, ty);
}
export function isFpTy(g, ty) {
  if (typeEquivAux(new Erasure(1), g, g.float_ty, ty)) {
    return true;
  } else {
    return typeEquivAux(new Erasure(1), g, g.float32_ty, ty);
  }
}
export function isDecimalTy(g, ty) {
  return typeEquivAux(new Erasure(1), g, g.decimal_ty, ty);
}
export function IsNonDecimalNumericOrIntegralEnumType(g, ty) {
  if (isIntegerOrIntegerEnumTy(g, ty)) {
    return true;
  } else {
    return isFpTy(g, ty);
  }
}
export function IsNumericOrIntegralEnumType(g, ty) {
  if (IsNonDecimalNumericOrIntegralEnumType(g, ty)) {
    return true;
  } else {
    return isDecimalTy(g, ty);
  }
}
export function IsNonDecimalNumericType(g, ty) {
  if (isIntegerTy(g, ty)) {
    return true;
  } else {
    return isFpTy(g, ty);
  }
}
export function IsNumericType(g, ty) {
  if (IsNonDecimalNumericType(g, ty)) {
    return true;
  } else {
    return isDecimalTy(g, ty);
  }
}
export function IsRelationalType(g, ty) {
  if ((IsNumericType(g, ty) ? true : isStringTy(g, ty)) ? true : isCharTy(g, ty)) {
    return true;
  } else {
    return isBoolTy(g, ty);
  }
}
export function GetMeasureOfType(g, ty) {
  let $var2;

  const activePatternResult37608 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(ty);

  if (activePatternResult37608 != null) {
    if (getValue(activePatternResult37608)[1].tail != null) {
      if (getValue(activePatternResult37608)[1].tail.tail == null) {
        $var2 = [0, getValue(activePatternResult37608)[0], getValue(activePatternResult37608)[1].head];
      } else {
        $var2 = [1];
      }
    } else {
      $var2 = [1];
    }
  } else {
    $var2 = [1];
  }

  switch ($var2[0]) {
    case 0:
      const matchValue = stripTyEqns(g, $var2[2]);
      const $var3 = matchValue.tag === 6 ? !measureEquiv(g, matchValue.data, new Measure(4)) ? [0, matchValue.data] : [1] : [1];

      switch ($var3[0]) {
        case 0:
          return [$var2[1], $var3[1]];

        case 1:
          return null;
      }

    case 1:
      return null;
  }
}
export class TraitConstraintSolution {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.TraitConstraintSolution",
      interfaces: ["FSharpUnion"],
      cases: [["TTraitUnsolved"], ["TTraitBuiltIn"], ["TTraitSolved", MethInfo, makeGeneric(List, {
        T: TType
      })], ["TTraitSolvedRecdProp", RecdFieldInfo, "boolean"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.TraitConstraintSolution", TraitConstraintSolution);
export const BakedInTraitConstraintNames = create(ofArray(["op_Division", "op_Multiply", "op_Addition", "op_Equality", "op_Inequality", "op_GreaterThan", "op_LessThan", "op_LessThanOrEqual", "op_GreaterThanOrEqual", "op_Subtraction", "op_Modulus", "get_Zero", "get_One", "DivideByInt", "get_Item", "set_Item", "op_BitwiseAnd", "op_BitwiseOr", "op_ExclusiveOr", "op_LeftShift", "op_RightShift", "op_UnaryPlus", "op_UnaryNegation", "get_Sign", "op_LogicalNot", "op_OnesComplement", "Abs", "Sqrt", "Sin", "Cos", "Tan", "Sinh", "Cosh", "Tanh", "Atan", "Acos", "Asin", "Exp", "Ceiling", "Floor", "Round", "Log10", "Log", "Sqrt", "Truncate", "op_Explicit", "Pow", "Atan2"]), new Comparer(comparePrimitives));
export class Trace {
  constructor(actions) {
    this.actions = actions;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.Trace",
      interfaces: ["FSharpRecord"],
      properties: {
        actions: makeGeneric(List, {
          T: Tuple([_Function([Unit, Unit]), _Function([Unit, Unit])])
        })
      }
    };
  }

  static New() {
    return new Trace(new List());
  }

  Undo() {
    iterate(tupledArg => {
      tupledArg[1]();
    }, this.actions);
  }

  Push(f, undo) {
    this.actions = new List([f, undo], this.actions);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.Trace", Trace);
export class OptionalTrace {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.OptionalTrace",
      interfaces: ["FSharpUnion"],
      cases: [["NoTrace"], ["WithTrace", Trace]]
    };
  }

  get HasTrace() {
    return this.tag === 1 ? true : false;
  }

  Exec(f, undo) {
    if (this.tag === 0) {
      f();
    } else {
      ((arg00, arg10) => {
        this.data.Push(arg00, arg10);
      })(f, undo);

      f();
    }
  }

  AddFromReplay(source) {
    var action;
    var action_1;
    (this.tag === 0 ? (action = tupledArg => {
      tupledArg[0]();
    }, list => {
      iterate(action, list);
    }) : (action_1 = tupledArg_1 => {
      ((arg00, arg10) => {
        this.data.Push(arg00, arg10);
      })(tupledArg_1[0], tupledArg_1[1]);

      tupledArg_1[0]();
    }, list_1 => {
      iterate(action_1, list_1);
    }))(reverse(source.actions));
  }

  CollectThenUndoOrCommit(predicate, f) {
    const newTrace = Trace.New();
    const res = f(newTrace);
    const matchValue = [predicate(res), this];

    if (matchValue[0]) {
      if (matchValue[1].tag === 0) {} else {
        const t = matchValue[1].data;
        t.actions = append(newTrace.actions, t.actions);
      }
    } else {
      newTrace.Undo();
    }

    return res;
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.OptionalTrace", OptionalTrace);
export function CollectThenUndo(f) {
  const trace = Trace.New();
  const res = f(trace);
  trace.Undo();
  return res;
}
export function FilterEachThenUndo(f, meths) {
  return choose(function (calledMeth) {
    const trace = Trace.New();
    const res = f(trace, calledMeth);
    trace.Undo();
    const matchValue = CheckNoErrorsAndGetWarnings(res);

    if (matchValue != null) {
      return [calledMeth, getValue(matchValue), trace];
    } else {
      return null;
    }
  }, meths);
}
export function ShowAccessDomain(ad) {
  if (ad.tag === 0) {
    return "accessible";
  } else if (ad.tag === 2) {
    return "public, protected or internal";
  } else if (ad.tag === 3) {
    return "";
  } else {
    return "public";
  }
}
export class NonRigidTypar extends Error {
  constructor(data0, data1, data2, data3, data4, data5) {
    super();
    Object.setPrototypeOf(this, NonRigidTypar.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
    this.Data5 = data5;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.NonRigidTypar",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: Option("string"),
        Data2: range,
        Data3: TType,
        Data4: TType,
        Data5: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.NonRigidTypar", NonRigidTypar);
export class LocallyAbortOperationThatFailsToResolveOverload extends Error {
  constructor() {
    super();
    return Object.setPrototypeOf(this, LocallyAbortOperationThatFailsToResolveOverload.prototype);
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.LocallyAbortOperationThatFailsToResolveOverload",
      interfaces: ["FSharpException"],
      properties: {}
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.LocallyAbortOperationThatFailsToResolveOverload", LocallyAbortOperationThatFailsToResolveOverload);
export class LocallyAbortOperationThatLosesAbbrevs extends Error {
  constructor() {
    super();
    return Object.setPrototypeOf(this, LocallyAbortOperationThatLosesAbbrevs.prototype);
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ConstraintSolver.LocallyAbortOperationThatLosesAbbrevs",
      interfaces: ["FSharpException"],
      properties: {}
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ConstraintSolver.LocallyAbortOperationThatLosesAbbrevs", LocallyAbortOperationThatLosesAbbrevs);
export const localAbortD = ErrorD(new LocallyAbortOperationThatLosesAbbrevs());
export function PreferUnifyTypar(v1, v2) {
  const matchValue = [v1.Rigidity, v2.Rigidity];

  if (matchValue[0].tag === 1) {
    if (matchValue[1].tag === 1) {
      return true;
    } else if (matchValue[1].tag === 2) {
      return false;
    } else if (matchValue[1].tag === 4) {
      return false;
    } else if (matchValue[1].tag === 3) {
      return false;
    } else {
      return true;
    }
  } else if (matchValue[0].tag === 2) {
    if (matchValue[1].tag === 1) {
      return true;
    } else if (matchValue[1].tag === 2) {
      return true;
    } else if (matchValue[1].tag === 4) {
      return false;
    } else if (matchValue[1].tag === 3) {
      return false;
    } else {
      return true;
    }
  } else if (matchValue[0].tag === 4) {
    if (matchValue[1].tag === 1) {
      return true;
    } else if (matchValue[1].tag === 2) {
      return true;
    } else if (matchValue[1].tag === 4) {
      return true;
    } else if (matchValue[1].tag === 3) {
      return false;
    } else {
      return true;
    }
  } else if (matchValue[0].tag === 3) {
    if (matchValue[1].tag === 1) {
      return true;
    } else if (matchValue[1].tag === 2) {
      return true;
    } else if (matchValue[1].tag === 4) {
      return true;
    } else if (matchValue[1].tag === 3) {
      const matchValue_1 = [v1.IsCompilerGenerated, v2.IsCompilerGenerated];
      const $var4 = matchValue_1[0] ? matchValue_1[1] ? [2] : [0] : matchValue_1[1] ? [1] : [2];

      switch ($var4[0]) {
        case 0:
          return true;

        case 1:
          return false;

        case 2:
          const matchValue_2 = [v1.IsFromError, v2.IsFromError];
          const $var5 = matchValue_2[0] ? matchValue_2[1] ? [1] : [0] : [1];

          switch ($var5[0]) {
            case 0:
              return false;

            case 1:
              return true;
          }

      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}
export function FindPreferredTypar(vs) {
  const find = function (vs_1) {
    if (vs_1.tail != null) {
      const v = vs_1.head[0];
      const e = vs_1.head[1];
      const matchValue = find(vs_1.tail);

      if (matchValue.tail != null) {
        const v_ = matchValue.head[0];
        const e_ = matchValue.head[1];

        if (PreferUnifyTypar(v, v_)) {
          return new List([v, e], vs_1.tail);
        } else {
          return ofArray([[v_, e_], [v, e]], matchValue.tail);
        }
      } else {
        return ofArray([[v, e]]);
      }
    } else {
      return vs_1;
    }
  };

  return find(vs);
}
export function SubstMeasure(r, ms) {
  if (r.Rigidity.Equals(new TyparRigidity(0))) {
    error_1(new InternalError("SubstMeasure: rigid", r.Range));
  }

  if (r.Kind.Equals(new TyparKind(0))) {
    error_1(new InternalError("SubstMeasure: kind=type", r.Range));
  }

  const matchValue = r.typar_solution;

  if (matchValue != null) {
    error_1(new InternalError("already solved", r.Range));
  } else {
    r.typar_solution = new TType(6, ms);
  }
}
export function TransactStaticReq(csenv, trace, tpr, req) {
  if (tpr.Rigidity.ErrorIfUnified ? !tpr.StaticReq.Equals(req) : false) {
    return ErrorD(new ConstraintSolverError(SR.csTypeCannotBeResolvedAtCompileTime(tpr.Name), csenv.m, csenv.m));
  } else {
    const orig = tpr.StaticReq;

    (function (arg00, arg10) {
      trace.Exec(arg00, arg10);
    })(function () {
      tpr.SetStaticReq(req);
    }, function () {
      tpr.SetStaticReq(orig);
    });

    return CompleteD;
  }
}
export function SolveTypStaticReqTypar(csenv, trace, req, tpr) {
  const orig = tpr.StaticReq;
  const req2 = JoinTyparStaticReq(req, orig);

  if (!orig.Equals(req2)) {
    return TransactStaticReq(csenv, trace, tpr, req2);
  } else {
    return CompleteD;
  }
}
export function SolveTypStaticReq(csenv, trace, req, ty) {
  if (req.tag === 1) {
    const matchValue = stripTyparEqns(ty);

    if (matchValue.tag === 6) {
      const vs = ListMeasureVarOccsWithNonZeroExponents(matchValue.data);
      return IterateD(function (tupledArg) {
        return SolveTypStaticReqTypar(csenv, trace, req, tupledArg[0]);
      }, vs);
    } else {
      const matchValue_1 = tryAnyParTy(csenv.g, ty);

      if (matchValue_1 == null) {
        return CompleteD;
      } else {
        return SolveTypStaticReqTypar(csenv, trace, req, getValue(matchValue_1));
      }
    }
  } else {
    return CompleteD;
  }
}
export function TransactDynamicReq(trace, tpr, req) {
  const orig = tpr.DynamicReq;

  (function (arg00, arg10) {
    trace.Exec(arg00, arg10);
  })(function () {
    tpr.SetDynamicReq(req);
  }, function () {
    tpr.SetDynamicReq(orig);
  });

  return CompleteD;
}
export function SolveTypDynamicReq(csenv, trace, req, ty) {
  if (req.tag === 1) {
    const matchValue = tryAnyParTy(csenv.g, ty);
    const $var6 = matchValue != null ? !getValue(matchValue).DynamicReq.Equals(new TyparDynamicReq(1)) ? [0, getValue(matchValue)] : [1] : [1];

    switch ($var6[0]) {
      case 0:
        return TransactDynamicReq(trace, $var6[1], new TyparDynamicReq(1));

      case 1:
        return CompleteD;
    }
  } else {
    return CompleteD;
  }
}
export function SubstMeasureWarnIfRigid(csenv, trace, v, ms) {
  if (v.Rigidity.WarnIfUnified ? !isAnyParTy(csenv.g, new TType(6, ms)) : false) {
    const tpnmOpt = v.IsCompilerGenerated ? null : v.Name;
    return op_PlusPlus(SolveTypStaticReq(csenv, trace, v.StaticReq, new TType(6, ms)), function () {
      SubstMeasure(v, ms);
      return WarnD(new NonRigidTypar(csenv.DisplayEnv, tpnmOpt, v.Range, new TType(6, new Measure(0, v)), new TType(6, ms), csenv.m));
    });
  } else {
    return op_PlusPlus(SolveTypStaticReq(csenv, trace, v.StaticReq, new TType(6, ms)), function () {
      SubstMeasure(v, ms);

      if (v.Rigidity.Equals(new TyparRigidity(4)) ? measureEquiv(csenv.g, ms, new Measure(4)) : false) {
        return WarnD(new _Error(SR.csCodeLessGeneric(), v.Range));
      } else {
        return CompleteD;
      }
    });
  }
}
export function UnifyMeasureWithOne(csenv, trace, ms) {
  const patternInput = partition(function (tupledArg) {
    return tupledArg[0].Rigidity.Equals(new TyparRigidity(0));
  }, ListMeasureVarOccsWithNonZeroExponents(ms));
  const matchValue = FindPreferredTypar(patternInput[1]);

  if (matchValue.tail == null) {
    if (measureEquiv(csenv.g, ms, new Measure(4))) {
      return CompleteD;
    } else {
      return localAbortD;
    }
  } else {
    const v = matchValue.head[0];
    const e = matchValue.head[1];
    const unexpandedCons = ListMeasureConOccsWithNonZeroExponents(csenv.g, false, ms);
    const newms = ProdMeasures(append(map(function (tupledArg_1) {
      return new Measure(5, [new Measure(1, tupledArg_1[0]), NegRational(DivRational(tupledArg_1[1], e))]);
    }, unexpandedCons), map(function (tupledArg_2) {
      return new Measure(5, [new Measure(0, tupledArg_2[0]), NegRational(DivRational(tupledArg_2[1], e))]);
    }, append(matchValue.tail, patternInput[0]))));
    return SubstMeasureWarnIfRigid(csenv, trace, v, newms);
  }
}
export function UnifyMeasures(csenv, trace, ms1, ms2) {
  return UnifyMeasureWithOne(csenv, trace, new Measure(2, [ms1, new Measure(3, ms2)]));
}
export function SimplifyMeasure(g, vars, ms) {
  const simp = function (vars_1) {
    simp: while (true) {
      const matchValue = FindPreferredTypar(filter(function (tupledArg) {
        return SignRational(tupledArg[1]) !== 0;
      }, map(function (v) {
        return [v, MeasureVarExponent(v, ms)];
      }, vars_1)));

      if (matchValue.tail != null) {
        const v_1 = matchValue.head[0];
        const e = matchValue.head[1];
        const newvar = v_1.IsCompilerGenerated ? NewAnonTypar(new TyparKind(1), v_1.Range, new TyparRigidity(3), v_1.StaticReq, v_1.DynamicReq) : NewNamedInferenceMeasureVar(v_1.Range, new TyparRigidity(3), v_1.StaticReq, v_1.Id);
        const remainingvars = ListSet.remove(function (lv1, lv2) {
          return typarEq(lv1, lv2);
        }, v_1, vars_1);
        const newvarExpr = SignRational(e) < 0 ? new Measure(3, new Measure(0, newvar)) : new Measure(0, newvar);
        const newms = ProdMeasures(append(map(function (tupledArg_1) {
          return new Measure(5, [new Measure(1, tupledArg_1[0]), NegRational(DivRational(tupledArg_1[1], e))]);
        }, ListMeasureConOccsWithNonZeroExponents(g, false, ms)), map(function (tupledArg_2) {
          return typarEq(v_1, tupledArg_2[0]) ? newvarExpr : new Measure(5, [new Measure(0, tupledArg_2[0]), NegRational(DivRational(tupledArg_2[1], e))]);
        }, ListMeasureVarOccsWithNonZeroExponents(ms))));
        SubstMeasure(v_1, newms);

        if (matchValue.tail.tail == null) {
          return [remainingvars, newvar];
        } else {
          vars_1 = new List(newvar, remainingvars);
          continue simp;
        }
      } else {
        return [vars_1, null];
      }
    }
  };

  return simp(vars);
}
export function SimplifyMeasuresInType(g, resultFirst, _arg1_0, _arg1_1, ty) {
  SimplifyMeasuresInType: while (true) {
    const _arg1 = [_arg1_0, _arg1_1];
    const matchValue = stripTyparEqns(ty);
    const $var7 = matchValue.tag === 1 ? [0, matchValue.data[1]] : matchValue.tag === 2 ? [0, matchValue.data[1]] : matchValue.tag === 3 ? [1] : matchValue.tag === 5 ? [2] : matchValue.tag === 0 ? [3] : matchValue.tag === 6 ? [4] : [0, matchValue.data[1]];

    switch ($var7[0]) {
      case 0:
        return SimplifyMeasuresInTypes(g, _arg1[0], _arg1[1], $var7[1]);

      case 1:
        if (resultFirst) {
          const tys = ofArray([matchValue.data[1], matchValue.data[0]]);
          return SimplifyMeasuresInTypes(g, _arg1[0], _arg1[1], tys);
        } else {
          const tys_1 = ofArray([matchValue.data[0], matchValue.data[1]]);
          return SimplifyMeasuresInTypes(g, _arg1[0], _arg1[1], tys_1);
        }

      case 2:
        return _arg1;

      case 3:
        g = g;
        resultFirst = resultFirst;
        _arg1_0 = _arg1[0];
        _arg1_1 = _arg1[1];
        ty = matchValue.data[1];
        continue SimplifyMeasuresInType;

      case 4:
        const patternInput = SimplifyMeasure(g, _arg1[0], matchValue.data);

        if (patternInput[1] != null) {
          return [patternInput[0], new List(getValue(patternInput[1]), _arg1[1])];
        } else {
          return [patternInput[0], _arg1[1]];
        }

    }
  }
}
export function SimplifyMeasuresInTypes(g, param_0, param_1, tys) {
  SimplifyMeasuresInTypes: while (true) {
    const param = [param_0, param_1];

    if (tys.tail != null) {
      const param_ = SimplifyMeasuresInType(g, false, param[0], param[1], tys.head);
      g = g;
      param_0 = param_[0];
      param_1 = param_[1];
      tys = tys.tail;
      continue SimplifyMeasuresInTypes;
    } else {
      return param;
    }
  }
}
export function SimplifyMeasuresInConstraint(g, param_0, param_1, c) {
  const param = [param_0, param_1];
  const $var8 = c.tag === 1 ? [0, c.data[1]] : c.tag === 0 ? [0, c.data[0]] : c.tag === 6 ? [1] : c.tag === 11 ? [2] : [3];

  switch ($var8[0]) {
    case 0:
      return SimplifyMeasuresInType(g, false, param[0], param[1], $var8[1]);

    case 1:
      return SimplifyMeasuresInTypes(g, param[0], param[1], c.data[0]);

    case 2:
      const tys = ofArray([c.data[0], c.data[1]]);
      return SimplifyMeasuresInTypes(g, param[0], param[1], tys);

    case 3:
      return param;
  }
}
export function SimplifyMeasuresInConstraints(g, param_0, param_1, cs) {
  SimplifyMeasuresInConstraints: while (true) {
    const param = [param_0, param_1];

    if (cs.tail != null) {
      const param_ = SimplifyMeasuresInConstraint(g, param[0], param[1], cs.head);
      g = g;
      param_0 = param_[0];
      param_1 = param_[1];
      cs = cs.tail;
      continue SimplifyMeasuresInConstraints;
    } else {
      return param;
    }
  }
}
export function GetMeasureVarGcdInType(v, ty) {
  GetMeasureVarGcdInType: while (true) {
    const matchValue = stripTyparEqns(ty);
    const $var9 = matchValue.tag === 1 ? [0, matchValue.data[1]] : matchValue.tag === 2 ? [0, matchValue.data[1]] : matchValue.tag === 3 ? [1] : matchValue.tag === 5 ? [2] : matchValue.tag === 0 ? [3] : matchValue.tag === 6 ? [4] : [0, matchValue.data[1]];

    switch ($var9[0]) {
      case 0:
        return GetMeasureVarGcdInTypes(v, $var9[1]);

      case 1:
        return GcdRational(GetMeasureVarGcdInType(v, matchValue.data[0]), GetMeasureVarGcdInType(v, matchValue.data[1]));

      case 2:
        return ZeroRational;

      case 3:
        v = v;
        ty = matchValue.data[1];
        continue GetMeasureVarGcdInType;

      case 4:
        return MeasureVarExponent(v, matchValue.data);
    }
  }
}
export function GetMeasureVarGcdInTypes(v, tys) {
  if (tys.tail != null) {
    return GcdRational(GetMeasureVarGcdInType(v, tys.head), GetMeasureVarGcdInTypes(v, tys.tail));
  } else {
    return ZeroRational;
  }
}
export function NormalizeExponentsInTypeScheme(uvars, ty) {
  return map(function (v) {
    const expGcd = AbsRational(GetMeasureVarGcdInType(v, ty));

    if (expGcd.Equals(OneRational) ? true : expGcd.Equals(ZeroRational)) {
      return v;
    } else {
      const v_ = NewAnonTypar(new TyparKind(1), v.Range, new TyparRigidity(3), v.StaticReq, v.DynamicReq);
      SubstMeasure(v, new Measure(5, [new Measure(0, v_), DivRational(OneRational, expGcd)]));
      return v_;
    }
  }, uvars);
}
export function SimplifyMeasuresInTypeScheme(g, resultFirst, generalizable, ty, constraints) {
  const patternInput = partition(function (v) {
    return v.Kind.Equals(new TyparKind(1)) ? !v.Rigidity.Equals(new TyparRigidity(0)) : false;
  }, generalizable);

  if (patternInput[0].tail != null) {
    let patternInput_1;
    const tupledArg = SimplifyMeasuresInConstraints(g, patternInput[0], new List(), constraints);
    patternInput_1 = SimplifyMeasuresInType(g, resultFirst, tupledArg[0], tupledArg[1], ty);
    const generalized_ = NormalizeExponentsInTypeScheme(patternInput_1[1], ty);
    return append(patternInput[1], reverse(generalized_));
  } else {
    return generalizable;
  }
}
export function freshMeasure() {
  return new Measure(0, NewInferenceMeasurePar());
}
export function CheckWarnIfRigid(csenv, ty1, r, ty) {
  const g = csenv.g;

  if (!r.Rigidity.WarnIfUnified) {
    return CompleteD;
  } else {
    let needsWarning;
    const matchValue = tryAnyParTy(g, ty);

    if (matchValue != null) {
      if (!getValue(matchValue).IsCompilerGenerated) {
        if (r.IsCompilerGenerated) {
          needsWarning = true;
        } else {
          needsWarning = r.DisplayName !== getValue(matchValue).DisplayName;
        }
      } else {
        needsWarning = false;
      }
    } else {
      needsWarning = true;
    }

    if (needsWarning) {
      const tpnmOpt = r.IsCompilerGenerated ? null : r.Name;
      return WarnD(new NonRigidTypar(csenv.DisplayEnv, tpnmOpt, r.Range, ty1, ty, csenv.m));
    } else {
      return CompleteD;
    }
  }
}
export function SolveTyparEqualsTyp(csenv, ndeep, m2, trace, ty1, ty) {
  return op_PlusPlus(DepthCheck(ndeep, csenv.m), function () {
    const $var10 = ty1.tag === 5 ? [0, ty1.data] : ty1.tag === 6 ? ty1.data.tag === 0 ? [0, ty1.data.data] : [1] : [1];

    switch ($var10[0]) {
      case 0:
        if (typeEquiv(csenv.g, ty1, ty)) {
          return CompleteD;
        } else if (occursCheck(csenv.g, $var10[1], ty)) {
          return ErrorD(new ConstraintSolverInfiniteTypes(csenv.eContextInfo, csenv.DisplayEnv, ty1, ty, csenv.m, m2));
        } else {
          return op_PlusPlus(CheckWarnIfRigid(csenv, ty1, $var10[1], ty), function () {
            (function (arg00, arg10) {
              trace.Exec(arg00, arg10);
            })(function () {
              $var10[1].typar_solution = ty;
            }, function () {
              $var10[1].typar_solution = null;
            });

            if ($var10[1].IsFromError) {
              return CompleteD;
            } else {
              return op_PlusPlus(csenv.SolverState.ExtraCxs.ContainsKey($var10[1].Stamp) ? RepeatWhileD(ndeep, function (ndeep_1) {
                return SolveRelevantMemberConstraintsForTypar(csenv, ndeep_1, false, trace, $var10[1]);
              }) : CompleteD, function () {
                return solveTypMeetsTyparConstraints(csenv, ndeep, m2, trace, ty, $var10[1].DynamicReq, $var10[1].StaticReq, $var10[1].Constraints);
              });
            }
          });
        }

      case 1:
        throw new Error("SolveTyparEqualsTyp");
    }
  });
}
export function solveTypMeetsTyparConstraints(csenv, ndeep, m2, trace, ty, dreq, sreq, cs) {
  const g = csenv.g;
  return op_PlusPlus(SolveTypDynamicReq(csenv, trace, dreq, ty), function () {
    return op_PlusPlus(SolveTypStaticReq(csenv, trace, sreq, ty), function () {
      return IterateD(function (_arg7) {
        switch (_arg7.tag) {
          case 2:
            return SolveTypSupportsNull(csenv, ndeep, _arg7.data, trace, ty);

          case 8:
            return SolveTypIsEnum(csenv, ndeep, _arg7.data[1], trace, ty, _arg7.data[0]);

          case 9:
            return SolveTypeSupportsComparison(csenv, ndeep, _arg7.data, trace, ty);

          case 10:
            return SolveTypSupportsEquality(csenv, ndeep, _arg7.data, trace, ty);

          case 11:
            return SolveTypIsDelegate(csenv, ndeep, _arg7.data[2], trace, ty, _arg7.data[0], _arg7.data[1]);

          case 4:
            return SolveTypIsNonNullableValueType(csenv, ndeep, _arg7.data, trace, ty);

          case 12:
            return SolveTypIsUnmanaged(csenv, ndeep, _arg7.data, trace, ty);

          case 5:
            return SolveTypIsReferenceType(csenv, ndeep, _arg7.data, trace, ty);

          case 7:
            return SolveTypRequiresDefaultConstructor(csenv, ndeep, _arg7.data, trace, ty);

          case 6:
            return SolveTypChoice(csenv, ndeep, _arg7.data[1], trace, ty, _arg7.data[0]);

          case 0:
            return SolveTypSubsumesTypKeepAbbrevs(csenv, ndeep, _arg7.data[1], trace, null, _arg7.data[0], ty);

          case 3:
            return op_PlusPlus(SolveMemberConstraint(csenv, false, false, ndeep, _arg7.data[1], trace, _arg7.data[0]), function (_arg2) {
              return CompleteD;
            });

          default:
            if (typeEquiv(g, ty, _arg7.data[1])) {
              return CompleteD;
            } else {
              const matchValue = tryDestTyparTy(g, ty);

              if (matchValue != null) {
                return AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(1, [_arg7.data[0], _arg7.data[1], _arg7.data[2]]));
              } else {
                return CompleteD;
              }
            }

        }
      }, cs);
    });
  });
}
export function SolveTypEqualsTyp(csenv, ndeep, m2, trace, cxsln, ty1, ty2) {
  var traitSln;
  var traitInfo;
  var tp2_2;
  var tp1_2;
  var tp2_1;
  var tp1_1;
  var tp2;
  var tp1;
  var r_1;
  var r;
  var tc2_2;
  var ms_1;
  var tc2_1;
  var ms;
  var tc2;
  var tc1;
  var l2_1;
  var l1_1;
  var uc2;
  var uc1;
  var l2;
  var l1;

  SolveTypEqualsTyp: while (true) {
    const ndeep_1 = ndeep + 1 | 0;
    const g = csenv.g;
    const $var11 = cxsln != null ? (traitSln = getValue(cxsln)[1], traitInfo = getValue(cxsln)[0], CurriedLambda(() => traitInfo.Solution == null)()) ? [0, getValue(cxsln)[0], getValue(cxsln)[1]] : [1] : [1];

    switch ($var11[0]) {
      case 0:
        TransactMemberConstraintSolution($var11[1], trace, $var11[2]);
        break;

      case 1:
        break;
    }

    if (ty1 === ty2) {
      return CompleteD;
    } else {
      const canShortcut = !trace.HasTrace;
      const sty1 = stripTyEqnsA(csenv.g, canShortcut, ty1);
      const sty2 = stripTyEqnsA(csenv.g, canShortcut, ty2);
      const matchValue = [sty1, sty2];
      const $var12 = matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? (tp2_2 = matchValue[1].data, tp1_2 = matchValue[0].data, typarEq(tp1_2, tp2_2) ? true : csenv.EquivEnv.EquivTypars.ContainsKey(tp1_2) ? typeEquiv(g, csenv.EquivEnv.EquivTypars.get_Item(tp1_2), ty2) : false) ? [0, matchValue[0].data, matchValue[1].data] : [1] : [1] : [1];

      switch ($var12[0]) {
        case 0:
          return CompleteD;

        case 1:
          const $var13 = matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? (tp2_1 = matchValue[1].data, tp1_1 = matchValue[0].data, PreferUnifyTypar(tp1_1, tp2_1)) ? [0, matchValue[0].data, matchValue[1].data] : [1] : [1] : [1];

          switch ($var13[0]) {
            case 0:
              return SolveTyparEqualsTyp(csenv, ndeep_1, m2, trace, sty1, ty2);

            case 1:
              const $var14 = matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? (tp2 = matchValue[1].data, tp1 = matchValue[0].data, !csenv.MatchingOnly ? PreferUnifyTypar(tp2, tp1) : false) ? [0, matchValue[0].data, matchValue[1].data] : [1] : [1] : [1];

              switch ($var14[0]) {
                case 0:
                  return SolveTyparEqualsTyp(csenv, ndeep_1, m2, trace, sty2, ty1);

                case 1:
                  const $var15 = matchValue[0].tag === 5 ? (r_1 = matchValue[0].data, !r_1.Rigidity.Equals(new TyparRigidity(0))) ? [0, matchValue[0].data] : [1] : [1];

                  switch ($var15[0]) {
                    case 0:
                      return SolveTyparEqualsTyp(csenv, ndeep_1, m2, trace, sty1, ty2);

                    case 1:
                      const $var16 = matchValue[1].tag === 5 ? (r = matchValue[1].data, !r.Rigidity.Equals(new TyparRigidity(0)) ? !csenv.MatchingOnly : false) ? [0, matchValue[1].data] : [1] : [1];

                      switch ($var16[0]) {
                        case 0:
                          return SolveTyparEqualsTyp(csenv, ndeep_1, m2, trace, sty2, ty1);

                        case 1:
                          const $var17 = matchValue[1].tag === 1 ? matchValue[1].data[1].tail != null ? matchValue[1].data[1].tail.tail == null ? (tc2_2 = matchValue[1].data[0], ms_1 = matchValue[1].data[1].head, tc2_2.IsMeasureableReprTycon ? typeEquiv(csenv.g, sty1, reduceTyconRefMeasureableOrProvided(csenv.g, tc2_2, ofArray([ms_1]))) : false) ? [0, matchValue[1].data[1].head, matchValue[1].data[0]] : [1] : [1] : [1] : [1];

                          switch ($var17[0]) {
                            case 0:
                              csenv = csenv;
                              ndeep = ndeep_1;
                              m2 = m2;
                              trace = trace;
                              cxsln = null;
                              ty1 = $var17[1];
                              ty2 = new TType(6, new Measure(4));
                              continue SolveTypEqualsTyp;

                            case 1:
                              const $var18 = matchValue[0].tag === 1 ? matchValue[0].data[1].tail != null ? matchValue[0].data[1].tail.tail == null ? (tc2_1 = matchValue[0].data[0], ms = matchValue[0].data[1].head, tc2_1.IsMeasureableReprTycon ? typeEquiv(csenv.g, sty2, reduceTyconRefMeasureableOrProvided(csenv.g, tc2_1, ofArray([ms]))) : false) ? [0, matchValue[0].data[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                              switch ($var18[0]) {
                                case 0:
                                  csenv = csenv;
                                  ndeep = ndeep_1;
                                  m2 = m2;
                                  trace = trace;
                                  cxsln = null;
                                  ty1 = $var18[1];
                                  ty2 = new TType(6, new Measure(4));
                                  continue SolveTypEqualsTyp;

                                case 1:
                                  const $var19 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? (tc2 = matchValue[1].data[0], tc1 = matchValue[0].data[0], l2_1 = matchValue[1].data[1], l1_1 = matchValue[0].data[1], tyconRefEq(g, tc1, tc2)) ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [1] : [1] : [1];

                                  switch ($var19[0]) {
                                    case 0:
                                      return SolveTypEqualsTypEqns(csenv, ndeep_1, m2, trace, null, $var19[1], $var19[2]);

                                    case 1:
                                      const $var20 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [0] : [6] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [1, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [6] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [2, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [6] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [3, matchValue[0].data, matchValue[1].data] : [6] : matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [4, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [6] : matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? (uc2 = matchValue[1].data[0], uc1 = matchValue[0].data[0], l2 = matchValue[1].data[1], l1 = matchValue[0].data[1], function (arg00_1, arg10_1) {
                                        return g.unionCaseRefEq(arg00_1, arg10_1);
                                      }(uc1, uc2)) ? [5, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [6] : [6] : [6];

                                      switch ($var20[0]) {
                                        case 0:
                                          return localAbortD;

                                        case 1:
                                          if (evalTupInfoIsStruct($var20[3]) !== evalTupInfoIsStruct($var20[4])) {
                                            return ErrorD(new ConstraintSolverError(SR.tcTupleStructMismatch(), csenv.m, m2));
                                          } else {
                                            return SolveTypEqualsTypEqns(csenv, ndeep_1, m2, trace, null, $var20[1], $var20[2]);
                                          }

                                        case 2:
                                          return SolveFunTypEqn(csenv, ndeep_1, m2, trace, null, $var20[1], $var20[2], $var20[3], $var20[4]);

                                        case 3:
                                          return UnifyMeasures(csenv, trace, $var20[1], $var20[2]);

                                        case 4:
                                          if ($var20[3].length !== $var20[4].length) {
                                            return localAbortD;
                                          } else {
                                            const aenv = function (arg00, arg10) {
                                              return csenv.EquivEnv.BindEquivTypars(arg00, arg10);
                                            }($var20[3], $var20[4]);

                                            const csenv_1 = new ConstraintSolverEnv(csenv.SolverState, csenv.eContextInfo, csenv.MatchingOnly, csenv.m, aenv, csenv.DisplayEnv);

                                            if (!typarsAEquiv(g, aenv, $var20[3], $var20[4])) {
                                              return localAbortD;
                                            } else {
                                              return SolveTypEqualsTypKeepAbbrevs(csenv_1, ndeep_1, m2, trace, $var20[1], $var20[2]);
                                            }
                                          }

                                        case 5:
                                          return SolveTypEqualsTypEqns(csenv, ndeep_1, m2, trace, null, $var20[1], $var20[2]);

                                        case 6:
                                          return localAbortD;
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
export function SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, ty1, ty2) {
  return SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep, m2, trace, null, ty1, ty2);
}

function SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep, m2, trace, cxsln, ty1, ty2) {
  return TryD(function () {
    return SolveTypEqualsTyp(csenv, ndeep, m2, trace, cxsln, ty1, ty2);
  }, function (_arg8) {
    return _arg8 instanceof LocallyAbortOperationThatLosesAbbrevs ? ErrorD(new ConstraintSolverTypesNotInEqualityRelation(csenv.DisplayEnv, ty1, ty2, csenv.m, m2, csenv.eContextInfo)) : ErrorD(_arg8);
  });
}

export function SolveTypEqualsTypEqns(csenv, ndeep, m2, trace, cxsln, origl1, origl2) {
  const matchValue = [origl1, origl2];
  const $var21 = matchValue[0].tail == null ? matchValue[1].tail == null ? [0] : [1] : [1];

  switch ($var21[0]) {
    case 0:
      return CompleteD;

    case 1:
      const loop = function (l1, l2) {
        const matchValue_1 = [l1, l2];
        const $var22 = matchValue_1[0].tail != null ? matchValue_1[1].tail != null ? [1, matchValue_1[0].head, matchValue_1[1].head, matchValue_1[0].tail, matchValue_1[1].tail] : [2] : matchValue_1[1].tail == null ? [0] : [2];

        switch ($var22[0]) {
          case 0:
            return CompleteD;

          case 1:
            return op_PlusPlus(SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep, m2, trace, cxsln, $var22[1], $var22[2]), function () {
              return loop($var22[3], $var22[4]);
            });

          case 2:
            return ErrorD(new ConstraintSolverTupleDiffLengths(csenv.DisplayEnv, origl1, origl2, csenv.m, m2));
        }
      };

      return loop(origl1, origl2);
  }
}
export function SolveFunTypEqn(csenv, ndeep, m2, trace, cxsln, d1, d2, r1, r2) {
  return op_PlusPlus(SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep, m2, trace, cxsln, d1, d2), function () {
    return SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep, m2, trace, cxsln, r1, r2);
  });
}
export function SolveTypSubsumesTyp(csenv, ndeep, m2, trace, cxsln, ty1, ty2) {
  var tp1;
  var r2;
  var r1;
  var r;
  var tc2_2;
  var ms_1;
  var tc2_3;
  var ms_2;
  var tc2_4;
  var ms_3;
  var tc2_5;
  var ms_4;
  var tc2_1;
  var ms;
  var tc2;
  var tc1;
  var l2_1;
  var l1_1;
  var uc2;
  var uc1;
  var l2;
  var l1;
  var tinst;
  var tcr1;

  SolveTypSubsumesTyp: while (true) {
    const ndeep_1 = ndeep + 1 | 0;
    const g = csenv.g;

    if (isObjTy(g, ty1)) {
      return CompleteD;
    } else {
      const canShortcut = !trace.HasTrace;
      const sty1 = stripTyEqnsA(csenv.g, canShortcut, ty1);
      const sty2 = stripTyEqnsA(csenv.g, canShortcut, ty2);
      const amap = csenv.amap;
      const matchValue = [sty1, sty2];
      const $var23 = matchValue[0].tag === 5 ? (tp1 = matchValue[0].data, csenv.EquivEnv.EquivTypars.ContainsKey(tp1)) ? [0, matchValue[0].data] : [1] : [1];

      switch ($var23[0]) {
        case 0:
          const $var107 = csenv;
          ndeep = ndeep_1;
          m2 = m2;
          trace = trace;
          cxsln = cxsln;
          ty1 = csenv.EquivEnv.EquivTypars.get_Item($var23[1]);
          ty2 = ty2;
          csenv = $var107;
          continue SolveTypSubsumesTyp;

        case 1:
          const $var24 = matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? (r2 = matchValue[1].data, r1 = matchValue[0].data, typarEq(r1, r2)) ? [0, matchValue[0].data, matchValue[1].data] : [1] : [1] : [1];

          switch ($var24[0]) {
            case 0:
              return CompleteD;

            case 1:
              const $var25 = matchValue[1].tag === 5 ? (r = matchValue[1].data, !csenv.MatchingOnly) ? [0, matchValue[1].data] : [1] : [1];

              switch ($var25[0]) {
                case 0:
                  return SolveTyparSubtypeOfType(csenv, ndeep_1, m2, trace, $var25[1], ty1);

                case 1:
                  const $var26 = matchValue[0].tag === 5 ? [0] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [1, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : matchValue[1].tag === 1 ? matchValue[1].data[1].tail != null ? matchValue[1].data[1].tail.tail == null ? (tc2_2 = matchValue[1].data[0], ms_1 = matchValue[1].data[1].head, tc2_2.IsMeasureableReprTycon ? typeEquiv(csenv.g, sty1, reduceTyconRefMeasureableOrProvided(csenv.g, tc2_2, ofArray([ms_1]))) : false) ? [4, matchValue[1].data[1].head, matchValue[1].data[0]] : [5] : [5] : [5] : [5] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [2, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : matchValue[1].tag === 1 ? matchValue[1].data[1].tail != null ? matchValue[1].data[1].tail.tail == null ? (tc2_3 = matchValue[1].data[0], ms_2 = matchValue[1].data[1].head, tc2_3.IsMeasureableReprTycon ? typeEquiv(csenv.g, sty1, reduceTyconRefMeasureableOrProvided(csenv.g, tc2_3, ofArray([ms_2]))) : false) ? [4, matchValue[1].data[1].head, matchValue[1].data[0]] : [5] : [5] : [5] : [5] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [3, matchValue[0].data, matchValue[1].data] : matchValue[1].tag === 1 ? matchValue[1].data[1].tail != null ? matchValue[1].data[1].tail.tail == null ? (tc2_4 = matchValue[1].data[0], ms_3 = matchValue[1].data[1].head, tc2_4.IsMeasureableReprTycon ? typeEquiv(csenv.g, sty1, reduceTyconRefMeasureableOrProvided(csenv.g, tc2_4, ofArray([ms_3]))) : false) ? [4, matchValue[1].data[1].head, matchValue[1].data[0]] : [5] : [5] : [5] : [5] : matchValue[1].tag === 1 ? matchValue[1].data[1].tail != null ? matchValue[1].data[1].tail.tail == null ? (tc2_5 = matchValue[1].data[0], ms_4 = matchValue[1].data[1].head, tc2_5.IsMeasureableReprTycon ? typeEquiv(csenv.g, sty1, reduceTyconRefMeasureableOrProvided(csenv.g, tc2_5, ofArray([ms_4]))) : false) ? [4, matchValue[1].data[1].head, matchValue[1].data[0]] : [5] : [5] : [5] : [5];

                  switch ($var26[0]) {
                    case 0:
                      return SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep_1, m2, trace, cxsln, ty1, ty2);

                    case 1:
                      if (evalTupInfoIsStruct($var26[3]) !== evalTupInfoIsStruct($var26[4])) {
                        return ErrorD(new ConstraintSolverError(SR.tcTupleStructMismatch(), csenv.m, m2));
                      } else {
                        return SolveTypEqualsTypEqns(csenv, ndeep_1, m2, trace, cxsln, $var26[1], $var26[2]);
                      }

                    case 2:
                      return SolveFunTypEqn(csenv, ndeep_1, m2, trace, cxsln, $var26[1], $var26[2], $var26[3], $var26[4]);

                    case 3:
                      return UnifyMeasures(csenv, trace, $var26[1], $var26[2]);

                    case 4:
                      return SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep_1, m2, trace, cxsln, $var26[1], new TType(6, new Measure(4)));

                    case 5:
                      const $var27 = matchValue[0].tag === 1 ? matchValue[0].data[1].tail != null ? matchValue[0].data[1].tail.tail == null ? (tc2_1 = matchValue[0].data[0], ms = matchValue[0].data[1].head, tc2_1.IsMeasureableReprTycon ? typeEquiv(csenv.g, sty2, reduceTyconRefMeasureableOrProvided(csenv.g, tc2_1, ofArray([ms]))) : false) ? [0, matchValue[0].data[1].head, matchValue[0].data[0]] : [1] : [1] : [1] : [1];

                      switch ($var27[0]) {
                        case 0:
                          return SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep_1, m2, trace, cxsln, $var27[1], new TType(6, new Measure(4)));

                        case 1:
                          const $var28 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? (tc2 = matchValue[1].data[0], tc1 = matchValue[0].data[0], l2_1 = matchValue[1].data[1], l1_1 = matchValue[0].data[1], tyconRefEq(g, tc1, tc2)) ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [1] : [1] : [1];

                          switch ($var28[0]) {
                            case 0:
                              return SolveTypEqualsTypEqns(csenv, ndeep_1, m2, trace, cxsln, $var28[1], $var28[2]);

                            case 1:
                              const $var29 = matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? (uc2 = matchValue[1].data[0], uc1 = matchValue[0].data[0], l2 = matchValue[1].data[1], l1 = matchValue[0].data[1], function (arg00, arg10) {
                                return g.unionCaseRefEq(arg00, arg10);
                              }(uc1, uc2)) ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [1] : [1] : [1];

                              switch ($var29[0]) {
                                case 0:
                                  return SolveTypEqualsTypEqns(csenv, ndeep_1, m2, trace, cxsln, $var29[1], $var29[2]);

                                case 1:
                                  if (isObjTy(g, ty1)) {
                                    return CompleteD;
                                  } else {
                                    let $var30;

                                    const activePatternResult37826 = function (arg10_) {
                                      return _AppTy___(g, arg10_);
                                    }(ty1);

                                    if (activePatternResult37826 != null) {
                                      if (tinst = getValue(activePatternResult37826)[1], tcr1 = getValue(activePatternResult37826)[0], isArray1DTy(g, ty2) ? (((tyconRefEq(g, tcr1, g.tcref_System_Collections_Generic_IList) ? true : tyconRefEq(g, tcr1, g.tcref_System_Collections_Generic_ICollection)) ? true : tyconRefEq(g, tcr1, g.tcref_System_Collections_Generic_IReadOnlyList)) ? true : tyconRefEq(g, tcr1, g.tcref_System_Collections_Generic_IReadOnlyCollection)) ? true : tyconRefEq(g, tcr1, g.tcref_System_Collections_Generic_IEnumerable) : false) {
                                        $var30 = [0, getValue(activePatternResult37826)[0], getValue(activePatternResult37826)[1]];
                                      } else {
                                        $var30 = [1];
                                      }
                                    } else {
                                      $var30 = [1];
                                    }

                                    switch ($var30[0]) {
                                      case 0:
                                        const $var31 = $var30[2].tail != null ? $var30[2].tail.tail == null ? [0, $var30[2].head] : [1] : [1];

                                        switch ($var31[0]) {
                                          case 0:
                                            const ty2arg = destArrayTy(g, ty2);
                                            return SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep_1, m2, trace, cxsln, $var31[1], ty2arg);

                                          case 1:
                                            return error_1(new InternalError("destArrayTy", csenv.m));
                                        }

                                      case 1:
                                        const matchValue_1 = FindUniqueFeasibleSupertype(g, amap, csenv.m, ty1, ty2);

                                        if (matchValue_1 != null) {
                                          csenv = csenv;
                                          ndeep = ndeep_1;
                                          m2 = m2;
                                          trace = trace;
                                          cxsln = cxsln;
                                          ty1 = ty1;
                                          ty2 = getValue(matchValue_1);
                                          continue SolveTypSubsumesTyp;
                                        } else {
                                          return ErrorD(new ConstraintSolverTypesNotInSubsumptionRelation(csenv.DisplayEnv, ty1, ty2, csenv.m, m2));
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
export function SolveTypSubsumesTypKeepAbbrevs(csenv, ndeep, m2, trace, cxsln, ty1, ty2) {
  return TryD(function () {
    return SolveTypSubsumesTyp(csenv, ndeep, m2, trace, cxsln, ty1, ty2);
  }, function (_arg9) {
    return _arg9 instanceof LocallyAbortOperationThatLosesAbbrevs ? ErrorD(new ConstraintSolverTypesNotInSubsumptionRelation(csenv.DisplayEnv, ty1, ty2, csenv.m, m2)) : ErrorD(_arg9);
  });
}
export function SolveTyparSubtypeOfType(csenv, ndeep, m2, trace, tp, ty1) {
  const g = csenv.g;

  if (isObjTy(g, ty1)) {
    return CompleteD;
  } else if (typeEquiv(g, ty1, mkTyparTy(tp))) {
    return CompleteD;
  } else if (isSealedTy(g, ty1)) {
    return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, mkTyparTy(tp), ty1);
  } else {
    return AddConstraint(csenv, ndeep, m2, trace, tp, new TyparConstraint(0, [ty1, csenv.m]));
  }
}
export function DepthCheck(ndeep, m) {
  if (ndeep > 300) {
    return error_1(new _Error(SR.csTypeInferenceMaxDepth(), m));
  } else {
    return CompleteD;
  }
}
export function SolveDimensionlessNumericType(csenv, ndeep, m2, trace, ty) {
  const matchValue = GetMeasureOfType(csenv.g, ty);

  if (matchValue == null) {
    return CompleteD;
  } else {
    const tcref = getValue(matchValue)[0];
    return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, ty, mkAppTy(tcref, ofArray([new TType(6, new Measure(4))])));
  }
}
export function SolveMemberConstraint(csenv, ignoreUnresolvedOverload, permitWeakResolution, ndeep, m2, trace, _arg1) {
  if (CurriedLambda(() => _arg1.data[5].contents != null)()) {
    return ResultD(true);
  } else {
    const g = csenv.g;
    const amap = csenv.amap;
    const ndeep_1 = ndeep + 1 | 0;
    return op_PlusPlus(DepthCheck(ndeep_1, csenv.m), function () {
      const tys = ListSet.setify(function (arg20_, arg30_) {
        return typeAEquiv(g, csenv.EquivEnv, arg20_, arg30_);
      }, _arg1.data[0]);
      const traitInfo = new TraitConstraintInfo(0, [tys, _arg1.data[1], _arg1.data[2], _arg1.data[3], _arg1.data[4], _arg1.data[5]]);
      const rty = GetFSharpViewOfReturnType(g, _arg1.data[4]);
      return op_PlusPlus(op_PlusPlus(op_PlusPlus(_arg1.data[2].IsInstance ? (() => {
        const matchValue = [tys, _arg1.data[3]];
        const $var32 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? [0, matchValue[1].head, matchValue[0].head] : [1] : [1] : [1];

        switch ($var32[0]) {
          case 0:
            return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var32[1], $var32[2]);

          case 1:
            return ErrorD(new ConstraintSolverError(SR.csExpectedArguments(), csenv.m, m2));
        }
      })() : CompleteD, function () {
        var req;
        return IterateD((req = new TyparStaticReq(1), function (ty) {
          return SolveTypStaticReq(csenv, trace, req, ty);
        }), tys);
      }), function () {
        var argty2_17;
        var argty1_19;
        var checkRuleAppliesInPreferenceToMethods;
        var argty2_19;
        var argty1_21;
        var checkRuleAppliesInPreferenceToMethods_1;
        var argty2_14;
        var argty1_16;
        var argty2_15;
        var argty1_17;
        var argty2_16;
        var argty1_18;
        var argty2_8;
        var argty1_10;
        var argty2_9;
        var argty1_11;
        var argty2_10;
        var argty1_12;
        var argty2_11;
        var argty1_13;
        var argty2_12;
        var argty1_14;
        var argty2_13;
        var argty1_15;
        var ty_7;
        var ty_6;
        var argty2_7;
        var argty1_9;
        var ty_5;
        var argty1_8;
        var ty_4;
        var ty_3;
        var argty2_4;
        var argty1_5;
        var argty2_5;
        var argty1_6;
        var argty2_6;
        var argty1_7;
        var argty2_2;
        var argty1_3;
        var argty2_3;
        var argty1_4;
        var argty_27;
        var argty_26;
        var argty_25;
        var argty_23;
        var argty_24;
        var argty_22;
        var argty1_2;
        var argty_5;
        var argty_6;
        var argty_7;
        var argty_8;
        var argty_9;
        var argty_10;
        var argty_11;
        var argty_12;
        var argty_13;
        var argty_14;
        var argty_15;
        var argty_16;
        var argty_17;
        var argty_18;
        var argty_19;
        var argty_20;
        var argty_21;
        var argty_4;
        var argty_3;
        var argty2_1;
        var argty1_1;
        var argty2;
        var argty1;
        const argtys = _arg1.data[2].IsInstance ? _arg1.data[3].tail : _arg1.data[3];
        const minfos = GetRelevantMethodsForTrait(csenv, permitWeakResolution, _arg1.data[1], traitInfo);
        const matchValue_1 = [minfos, tys, _arg1.data[2].IsInstance, _arg1.data[1], argtys];
        const $var33 = matchValue_1[2] ? [1] : matchValue_1[3] === "op_Division" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_17 = matchValue_1[4].tail.head, argty1_19 = matchValue_1[4].head, checkRuleAppliesInPreferenceToMethods = function (argty1_20, argty2_18) {
          return (IsNumericOrIntegralEnumType(g, argty1_20) ? permitWeakResolution ? true : !isTyparTy(g, argty2_18) : false) ? minfos.tail == null ? true : GetMeasureOfType(g, argty1_20) != null ? isDecimalTy(g, argty2_18) : false : false;
        }, checkRuleAppliesInPreferenceToMethods(argty1_19, argty2_17) ? true : checkRuleAppliesInPreferenceToMethods(argty2_17, argty1_19)) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_Multiply" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_19 = matchValue_1[4].tail.head, argty1_21 = matchValue_1[4].head, checkRuleAppliesInPreferenceToMethods_1 = function (argty1_22, argty2_20) {
          return (IsNumericOrIntegralEnumType(g, argty1_22) ? permitWeakResolution ? true : !isTyparTy(g, argty2_20) : false) ? minfos.tail == null ? true : GetMeasureOfType(g, argty1_22) != null ? isDecimalTy(g, argty2_20) : false : false;
        }, checkRuleAppliesInPreferenceToMethods_1(argty1_21, argty2_19) ? true : checkRuleAppliesInPreferenceToMethods_1(argty2_19, argty1_21)) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : [1];

        switch ($var33[0]) {
          case 0:
            const matchValue_2 = GetMeasureOfType(g, $var33[1]);

            if (matchValue_2 != null) {
              const tcref = getValue(matchValue_2)[0];
              const ms1 = getValue(matchValue_2)[1];
              const ms2 = freshMeasure();
              return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var33[2], mkAppTy(tcref, ofArray([new TType(6, ms2)]))), function () {
                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, mkAppTy(tcref, ofArray([new TType(6, new Measure(2, [ms1, _arg1.data[1] === "op_Multiply" ? ms2 : new Measure(3, ms2)]))]))), function () {
                  return ResultD(new TraitConstraintSolution(1));
                });
              });
            } else {
              const matchValue_3 = GetMeasureOfType(g, $var33[2]);

              if (matchValue_3 != null) {
                const tcref_1 = getValue(matchValue_3)[0];
                const ms2_1 = getValue(matchValue_3)[1];
                const ms1_1 = freshMeasure();
                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var33[1], mkAppTy(tcref_1, ofArray([new TType(6, ms1_1)]))), function () {
                  return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, mkAppTy(tcref_1, ofArray([new TType(6, new Measure(2, [ms1_1, _arg1.data[1] === "op_Multiply" ? ms2_1 : new Measure(3, ms2_1)]))]))), function () {
                    return ResultD(new TraitConstraintSolution(1));
                  });
                });
              } else {
                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var33[2], $var33[1]), function () {
                  return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var33[1]), function () {
                    return ResultD(new TraitConstraintSolution(1));
                  });
                });
              }
            }

          case 1:
            const $var34 = matchValue_1[2] ? [1] : matchValue_1[3] === "op_Addition" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_14 = matchValue_1[4].tail.head, argty1_16 = matchValue_1[4].head, forAll(function (minfo_8) {
              return isIntegerTy(g, minfo_8.ApparentEnclosingType);
            }, minfos) ? ((IsNumericOrIntegralEnumType(g, argty1_16) ? true : _arg1.data[1] === "op_Addition" ? isCharTy(g, argty1_16) ? true : isStringTy(g, argty1_16) : false) ? permitWeakResolution ? true : !isTyparTy(g, argty2_14) : false) ? true : (IsNumericOrIntegralEnumType(g, argty2_14) ? true : _arg1.data[1] === "op_Addition" ? isCharTy(g, argty2_14) ? true : isStringTy(g, argty2_14) : false) ? permitWeakResolution ? true : !isTyparTy(g, argty1_16) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_Subtraction" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_15 = matchValue_1[4].tail.head, argty1_17 = matchValue_1[4].head, forAll(function (minfo_9) {
              return isIntegerTy(g, minfo_9.ApparentEnclosingType);
            }, minfos) ? ((IsNumericOrIntegralEnumType(g, argty1_17) ? true : _arg1.data[1] === "op_Addition" ? isCharTy(g, argty1_17) ? true : isStringTy(g, argty1_17) : false) ? permitWeakResolution ? true : !isTyparTy(g, argty2_15) : false) ? true : (IsNumericOrIntegralEnumType(g, argty2_15) ? true : _arg1.data[1] === "op_Addition" ? isCharTy(g, argty2_15) ? true : isStringTy(g, argty2_15) : false) ? permitWeakResolution ? true : !isTyparTy(g, argty1_17) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_Modulus" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_16 = matchValue_1[4].tail.head, argty1_18 = matchValue_1[4].head, forAll(function (minfo_10) {
              return isIntegerTy(g, minfo_10.ApparentEnclosingType);
            }, minfos) ? ((IsNumericOrIntegralEnumType(g, argty1_18) ? true : _arg1.data[1] === "op_Addition" ? isCharTy(g, argty1_18) ? true : isStringTy(g, argty1_18) : false) ? permitWeakResolution ? true : !isTyparTy(g, argty2_16) : false) ? true : (IsNumericOrIntegralEnumType(g, argty2_16) ? true : _arg1.data[1] === "op_Addition" ? isCharTy(g, argty2_16) ? true : isStringTy(g, argty2_16) : false) ? permitWeakResolution ? true : !isTyparTy(g, argty1_18) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : [1];

            switch ($var34[0]) {
              case 0:
                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var34[2], $var34[1]), function () {
                  return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var34[1]), function () {
                    return ResultD(new TraitConstraintSolution(1));
                  });
                });

              case 1:
                const $var35 = matchValue_1[2] ? [1] : matchValue_1[3] === "op_LessThan" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_8 = matchValue_1[4].tail.head, argty1_10 = matchValue_1[4].head, forAll(function (minfo_2) {
                  return isIntegerTy(g, minfo_2.ApparentEnclosingType);
                }, minfos) ? (IsRelationalType(g, argty1_10) ? permitWeakResolution ? true : !isTyparTy(g, argty2_8) : false) ? true : IsRelationalType(g, argty2_8) ? permitWeakResolution ? true : !isTyparTy(g, argty1_10) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_LessThanOrEqual" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_9 = matchValue_1[4].tail.head, argty1_11 = matchValue_1[4].head, forAll(function (minfo_3) {
                  return isIntegerTy(g, minfo_3.ApparentEnclosingType);
                }, minfos) ? (IsRelationalType(g, argty1_11) ? permitWeakResolution ? true : !isTyparTy(g, argty2_9) : false) ? true : IsRelationalType(g, argty2_9) ? permitWeakResolution ? true : !isTyparTy(g, argty1_11) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_GreaterThan" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_10 = matchValue_1[4].tail.head, argty1_12 = matchValue_1[4].head, forAll(function (minfo_4) {
                  return isIntegerTy(g, minfo_4.ApparentEnclosingType);
                }, minfos) ? (IsRelationalType(g, argty1_12) ? permitWeakResolution ? true : !isTyparTy(g, argty2_10) : false) ? true : IsRelationalType(g, argty2_10) ? permitWeakResolution ? true : !isTyparTy(g, argty1_12) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_GreaterThanOrEqual" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_11 = matchValue_1[4].tail.head, argty1_13 = matchValue_1[4].head, forAll(function (minfo_5) {
                  return isIntegerTy(g, minfo_5.ApparentEnclosingType);
                }, minfos) ? (IsRelationalType(g, argty1_13) ? permitWeakResolution ? true : !isTyparTy(g, argty2_11) : false) ? true : IsRelationalType(g, argty2_11) ? permitWeakResolution ? true : !isTyparTy(g, argty1_13) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_Equality" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_12 = matchValue_1[4].tail.head, argty1_14 = matchValue_1[4].head, forAll(function (minfo_6) {
                  return isIntegerTy(g, minfo_6.ApparentEnclosingType);
                }, minfos) ? (IsRelationalType(g, argty1_14) ? permitWeakResolution ? true : !isTyparTy(g, argty2_12) : false) ? true : IsRelationalType(g, argty2_12) ? permitWeakResolution ? true : !isTyparTy(g, argty1_14) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_Inequality" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_13 = matchValue_1[4].tail.head, argty1_15 = matchValue_1[4].head, forAll(function (minfo_7) {
                  return isIntegerTy(g, minfo_7.ApparentEnclosingType);
                }, minfos) ? (IsRelationalType(g, argty1_15) ? permitWeakResolution ? true : !isTyparTy(g, argty2_13) : false) ? true : IsRelationalType(g, argty2_13) ? permitWeakResolution ? true : !isTyparTy(g, argty1_15) : false : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : [1];

                switch ($var35[0]) {
                  case 0:
                    return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var35[2], $var35[1]), function () {
                      return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, g.bool_ty), function () {
                        return ResultD(new TraitConstraintSolution(1));
                      });
                    });

                  case 1:
                    const $var36 = matchValue_1[0].tail == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2] ? [1] : matchValue_1[3] === "get_Zero" ? matchValue_1[4].tail == null ? (ty_7 = matchValue_1[1].head, IsNumericType(g, ty_7)) ? [0, matchValue_1[1].head] : [1] : [1] : [1] : [1] : [1] : [1];

                    switch ($var36[0]) {
                      case 0:
                        return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var36[1]), function () {
                          return ResultD(new TraitConstraintSolution(1));
                        });

                      case 1:
                        const $var37 = matchValue_1[0].tail == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2] ? [1] : matchValue_1[3] === "get_One" ? matchValue_1[4].tail == null ? (ty_6 = matchValue_1[1].head, IsNumericType(g, ty_6) ? true : isCharTy(g, ty_6)) ? [0, matchValue_1[1].head] : [1] : [1] : [1] : [1] : [1] : [1];

                        switch ($var37[0]) {
                          case 0:
                            return op_PlusPlus(SolveDimensionlessNumericType(csenv, ndeep_1, m2, trace, $var37[1]), function () {
                              return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var37[1]), function () {
                                return ResultD(new TraitConstraintSolution(1));
                              });
                            });

                          case 1:
                            const $var38 = matchValue_1[0].tail == null ? matchValue_1[2] ? [1] : matchValue_1[3] === "DivideByInt" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_7 = matchValue_1[4].tail.head, argty1_9 = matchValue_1[4].head, isFpTy(g, argty1_9) ? true : isDecimalTy(g, argty1_9)) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : [1] : [1];

                            switch ($var38[0]) {
                              case 0:
                                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var38[2], g.int_ty), function () {
                                  return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var38[1]), function () {
                                    return ResultD(new TraitConstraintSolution(1));
                                  });
                                });

                              case 1:
                                const $var39 = matchValue_1[0].tail == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2] ? matchValue_1[3] === "get_Item" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (ty_5 = matchValue_1[1].head, argty1_8 = matchValue_1[4].head, isStringTy(g, ty_5)) ? [0, matchValue_1[4].head, matchValue_1[1].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                                switch ($var39[0]) {
                                  case 0:
                                    return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var39[1], g.int_ty), function () {
                                      return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, g.char_ty), function () {
                                        return ResultD(new TraitConstraintSolution(1));
                                      });
                                    });

                                  case 1:
                                    const $var40 = matchValue_1[0].tail == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2] ? matchValue_1[3] === "get_Item" ? (ty_4 = matchValue_1[1].head, isArrayTy(g, ty_4)) ? [0, matchValue_1[4], matchValue_1[1].head] : [1] : [1] : [1] : [1] : [1] : [1];

                                    switch ($var40[0]) {
                                      case 0:
                                        return op_PlusPlus(rankOfArrayTy(g, $var40[2]) !== $var40[1].length ? ErrorD(new ConstraintSolverError(SR.csIndexArgumentMismatch(rankOfArrayTy(g, $var40[2]), $var40[1].length), csenv.m, m2)) : CompleteD, function () {
                                          return op_PlusPlus(IterateD(function (argty) {
                                            return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, argty, g.int_ty);
                                          }, $var40[1]), function () {
                                            const ety = destArrayTy(g, $var40[2]);
                                            return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, ety), function () {
                                              return ResultD(new TraitConstraintSolution(1));
                                            });
                                          });
                                        });

                                      case 1:
                                        const $var41 = matchValue_1[0].tail == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2] ? matchValue_1[3] === "set_Item" ? (ty_3 = matchValue_1[1].head, isArrayTy(g, ty_3)) ? [0, matchValue_1[4], matchValue_1[1].head] : [1] : [1] : [1] : [1] : [1] : [1];

                                        switch ($var41[0]) {
                                          case 0:
                                            return op_PlusPlus(rankOfArrayTy(g, $var41[2]) !== $var41[1].length - 1 ? ErrorD(new ConstraintSolverError(SR.csIndexArgumentMismatch(rankOfArrayTy(g, $var41[2]), $var41[1].length - 1), csenv.m, m2)) : CompleteD, function () {
                                              const patternInput = List_1.frontAndBack($var41[1]);
                                              return op_PlusPlus(IterateD(function (argty_1) {
                                                return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, argty_1, g.int_ty);
                                              }, patternInput[0]), function () {
                                                const etys = destArrayTy(g, $var41[2]);
                                                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, patternInput[1], etys), function () {
                                                  return ResultD(new TraitConstraintSolution(1));
                                                });
                                              });
                                            });

                                          case 1:
                                            const $var42 = matchValue_1[0].tail == null ? matchValue_1[2] ? [1] : matchValue_1[3] === "op_BitwiseAnd" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_4 = matchValue_1[4].tail.head, argty1_5 = matchValue_1[4].head, ((isIntegerOrIntegerEnumTy(g, argty1_5) ? true : isEnumTy(g, argty1_5)) ? permitWeakResolution ? true : !isTyparTy(g, argty2_4) : false) ? true : (isIntegerOrIntegerEnumTy(g, argty2_4) ? true : isEnumTy(g, argty2_4)) ? permitWeakResolution ? true : !isTyparTy(g, argty1_5) : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_BitwiseOr" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_5 = matchValue_1[4].tail.head, argty1_6 = matchValue_1[4].head, ((isIntegerOrIntegerEnumTy(g, argty1_6) ? true : isEnumTy(g, argty1_6)) ? permitWeakResolution ? true : !isTyparTy(g, argty2_5) : false) ? true : (isIntegerOrIntegerEnumTy(g, argty2_5) ? true : isEnumTy(g, argty2_5)) ? permitWeakResolution ? true : !isTyparTy(g, argty1_6) : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_ExclusiveOr" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_6 = matchValue_1[4].tail.head, argty1_7 = matchValue_1[4].head, ((isIntegerOrIntegerEnumTy(g, argty1_7) ? true : isEnumTy(g, argty1_7)) ? permitWeakResolution ? true : !isTyparTy(g, argty2_6) : false) ? true : (isIntegerOrIntegerEnumTy(g, argty2_6) ? true : isEnumTy(g, argty2_6)) ? permitWeakResolution ? true : !isTyparTy(g, argty1_7) : false) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : [1] : [1];

                                            switch ($var42[0]) {
                                              case 0:
                                                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var42[2], $var42[1]), function () {
                                                  return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var42[1]), function () {
                                                    return op_PlusPlus(SolveDimensionlessNumericType(csenv, ndeep_1, m2, trace, $var42[1]), function () {
                                                      return ResultD(new TraitConstraintSolution(1));
                                                    });
                                                  });
                                                });

                                              case 1:
                                                const $var43 = matchValue_1[0].tail == null ? matchValue_1[2] ? [1] : matchValue_1[3] === "op_LeftShift" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_2 = matchValue_1[4].tail.head, argty1_3 = matchValue_1[4].head, isIntegerOrIntegerEnumTy(g, argty1_3)) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : matchValue_1[3] === "op_RightShift" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_3 = matchValue_1[4].tail.head, argty1_4 = matchValue_1[4].head, isIntegerOrIntegerEnumTy(g, argty1_4)) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : [1] : [1];

                                                switch ($var43[0]) {
                                                  case 0:
                                                    return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var43[2], g.int_ty), function () {
                                                      return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var43[1]), function () {
                                                        return op_PlusPlus(SolveDimensionlessNumericType(csenv, ndeep_1, m2, trace, $var43[1]), function () {
                                                          return ResultD(new TraitConstraintSolution(1));
                                                        });
                                                      });
                                                    });

                                                  case 1:
                                                    const $var44 = matchValue_1[2] ? [1] : matchValue_1[3] === "op_UnaryPlus" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_27 = matchValue_1[4].head, IsNumericOrIntegralEnumType(g, argty_27)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : [1];

                                                    switch ($var44[0]) {
                                                      case 0:
                                                        return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var44[1]), function () {
                                                          return ResultD(new TraitConstraintSolution(1));
                                                        });

                                                      case 1:
                                                        const $var45 = matchValue_1[2] ? [1] : matchValue_1[3] === "op_UnaryNegation" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_26 = matchValue_1[4].head, (isSignedIntegerTy(g, argty_26) ? true : isFpTy(g, argty_26)) ? true : isDecimalTy(g, argty_26)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : [1];

                                                        switch ($var45[0]) {
                                                          case 0:
                                                            return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var45[1]), function () {
                                                              return ResultD(new TraitConstraintSolution(1));
                                                            });

                                                          case 1:
                                                            const $var46 = matchValue_1[2] ? matchValue_1[3] === "get_Sign" ? matchValue_1[4].tail == null ? (argty_25 = tys.head, (isSignedIntegerTy(g, argty_25) ? true : isFpTy(g, argty_25)) ? true : isDecimalTy(g, argty_25)) ? [0] : [1] : [1] : [1] : [1];

                                                            switch ($var46[0]) {
                                                              case 0:
                                                                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, g.int32_ty), function () {
                                                                  return ResultD(new TraitConstraintSolution(1));
                                                                });

                                                              case 1:
                                                                const $var47 = matchValue_1[2] ? [1] : matchValue_1[3] === "op_LogicalNot" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_23 = matchValue_1[4].head, isIntegerOrIntegerEnumTy(g, argty_23)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "op_OnesComplement" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_24 = matchValue_1[4].head, isIntegerOrIntegerEnumTy(g, argty_24)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : [1];

                                                                switch ($var47[0]) {
                                                                  case 0:
                                                                    return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var47[1]), function () {
                                                                      return op_PlusPlus(SolveDimensionlessNumericType(csenv, ndeep_1, m2, trace, $var47[1]), function () {
                                                                        return ResultD(new TraitConstraintSolution(1));
                                                                      });
                                                                    });

                                                                  case 1:
                                                                    const $var48 = matchValue_1[2] ? [1] : matchValue_1[3] === "Abs" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_22 = matchValue_1[4].head, (isSignedIntegerTy(g, argty_22) ? true : isFpTy(g, argty_22)) ? true : isDecimalTy(g, argty_22)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : [1];

                                                                    switch ($var48[0]) {
                                                                      case 0:
                                                                        return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var48[1]), function () {
                                                                          return ResultD(new TraitConstraintSolution(1));
                                                                        });

                                                                      case 1:
                                                                        const $var49 = matchValue_1[2] ? [1] : matchValue_1[3] === "Sqrt" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty1_2 = matchValue_1[4].head, isFpTy(g, argty1_2)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : [1];

                                                                        switch ($var49[0]) {
                                                                          case 0:
                                                                            const matchValue_4 = GetMeasureOfType(g, $var49[1]);

                                                                            if (matchValue_4 == null) {
                                                                              return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var49[1]), function () {
                                                                                return ResultD(new TraitConstraintSolution(1));
                                                                              });
                                                                            } else {
                                                                              const tcref_2 = getValue(matchValue_4)[0];
                                                                              const ms1_2 = freshMeasure();
                                                                              return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var49[1], mkAppTy(tcref_2, ofArray([new TType(6, new Measure(2, [ms1_2, ms1_2]))]))), function () {
                                                                                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, mkAppTy(tcref_2, ofArray([new TType(6, ms1_2)]))), function () {
                                                                                  return ResultD(new TraitConstraintSolution(1));
                                                                                });
                                                                              });
                                                                            }

                                                                          case 1:
                                                                            const $var50 = matchValue_1[2] ? [1] : matchValue_1[3] === "Sin" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_5 = matchValue_1[4].head, isFpTy(g, argty_5)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Cos" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_6 = matchValue_1[4].head, isFpTy(g, argty_6)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Tan" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_7 = matchValue_1[4].head, isFpTy(g, argty_7)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Sinh" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_8 = matchValue_1[4].head, isFpTy(g, argty_8)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Cosh" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_9 = matchValue_1[4].head, isFpTy(g, argty_9)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Tanh" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_10 = matchValue_1[4].head, isFpTy(g, argty_10)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Atan" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_11 = matchValue_1[4].head, isFpTy(g, argty_11)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Acos" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_12 = matchValue_1[4].head, isFpTy(g, argty_12)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Asin" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_13 = matchValue_1[4].head, isFpTy(g, argty_13)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Exp" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_14 = matchValue_1[4].head, isFpTy(g, argty_14)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Ceiling" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_15 = matchValue_1[4].head, isFpTy(g, argty_15)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Floor" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_16 = matchValue_1[4].head, isFpTy(g, argty_16)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Round" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_17 = matchValue_1[4].head, isFpTy(g, argty_17)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Truncate" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_18 = matchValue_1[4].head, isFpTy(g, argty_18)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Log10" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_19 = matchValue_1[4].head, isFpTy(g, argty_19)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Log" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_20 = matchValue_1[4].head, isFpTy(g, argty_20)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : matchValue_1[3] === "Sqrt" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_21 = matchValue_1[4].head, isFpTy(g, argty_21)) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : [1];

                                                                            switch ($var50[0]) {
                                                                              case 0:
                                                                                return op_PlusPlus(SolveDimensionlessNumericType(csenv, ndeep_1, m2, trace, $var50[1]), function () {
                                                                                  return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var50[1]), function () {
                                                                                    return ResultD(new TraitConstraintSolution(1));
                                                                                  });
                                                                                });

                                                                              case 1:
                                                                                const $var51 = matchValue_1[2] ? [1] : matchValue_1[3] === "op_Explicit" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_4 = matchValue_1[4].head, ((((IsNonDecimalNumericOrIntegralEnumType(g, argty_4) ? true : isStringTy(g, argty_4)) ? true : isCharTy(g, argty_4)) ? IsNonDecimalNumericOrIntegralEnumType(g, rty) ? true : isCharTy(g, rty) : false) ? !(isStringTy(g, argty_4) ? isNativeIntegerTy(g, rty) : false) : false) ? !(isCharTy(g, argty_4) ? isDecimalTy(g, rty) : false) : false) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : [1];

                                                                                switch ($var51[0]) {
                                                                                  case 0:
                                                                                    return ResultD(new TraitConstraintSolution(1));

                                                                                  case 1:
                                                                                    const $var52 = matchValue_1[2] ? [1] : matchValue_1[3] === "op_Explicit" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail == null ? (argty_3 = matchValue_1[4].head, (IsNumericOrIntegralEnumType(g, argty_3) ? true : isStringTy(g, argty_3)) ? isDecimalTy(g, rty) : false) ? [0, matchValue_1[4].head] : [1] : [1] : [1] : [1];

                                                                                    switch ($var52[0]) {
                                                                                      case 0:
                                                                                        return ResultD(new TraitConstraintSolution(1));

                                                                                      case 1:
                                                                                        const $var53 = matchValue_1[0].tail == null ? matchValue_1[2] ? [1] : matchValue_1[3] === "Pow" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2_1 = matchValue_1[4].tail.head, argty1_1 = matchValue_1[4].head, isFpTy(g, argty1_1)) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : [1] : [1];

                                                                                        switch ($var53[0]) {
                                                                                          case 0:
                                                                                            return op_PlusPlus(SolveDimensionlessNumericType(csenv, ndeep_1, m2, trace, $var53[1]), function () {
                                                                                              return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var53[2], $var53[1]), function () {
                                                                                                return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var53[1]), function () {
                                                                                                  return ResultD(new TraitConstraintSolution(1));
                                                                                                });
                                                                                              });
                                                                                            });

                                                                                          case 1:
                                                                                            const $var54 = matchValue_1[2] ? [1] : matchValue_1[3] === "Atan2" ? matchValue_1[4].tail != null ? matchValue_1[4].tail.tail != null ? matchValue_1[4].tail.tail.tail == null ? (argty2 = matchValue_1[4].tail.head, argty1 = matchValue_1[4].head, isFpTy(g, argty1)) ? [0, matchValue_1[4].head, matchValue_1[4].tail.head] : [1] : [1] : [1] : [1] : [1];

                                                                                            switch ($var54[0]) {
                                                                                              case 0:
                                                                                                return op_PlusPlus(op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, $var54[2], $var54[1]), function () {
                                                                                                  const matchValue_5 = GetMeasureOfType(g, $var54[1]);

                                                                                                  if (matchValue_5 != null) {
                                                                                                    const tcref_3 = getValue(matchValue_5)[0];
                                                                                                    return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, mkAppTy(tcref_3, ofArray([new TType(6, new Measure(4))])));
                                                                                                  } else {
                                                                                                    return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, $var54[1]);
                                                                                                  }
                                                                                                }), function () {
                                                                                                  return ResultD(new TraitConstraintSolution(1));
                                                                                                });

                                                                                              case 1:
                                                                                                let recdPropSearch;
                                                                                                const isGetProp = _arg1.data[1].indexOf("get_") === 0;
                                                                                                const isSetProp = _arg1.data[1].indexOf("set_") === 0;

                                                                                                if ((argtys.tail == null ? isGetProp : false) ? true : isSetProp) {
                                                                                                  const propName = _arg1.data[1].slice(4, _arg1.data[1].length);

                                                                                                  const props = choose(function (ty_1) {
                                                                                                    var rfinfo;
                                                                                                    const matchValue_6 = TryFindIntrinsicNamedItemOfType(csenv.InfoReader, propName, new AccessorDomain(1), new FindMemberFlag(0), csenv.m, ty_1);
                                                                                                    const $var55 = matchValue_6 != null ? getValue(matchValue_6).tag === 2 ? (rfinfo = getValue(matchValue_6).data, ((((isGetProp ? true : rfinfo.RecdField.IsMutable) ? rfinfo.IsStatic === !_arg1.data[2].IsInstance : false) ? IsRecdFieldAccessible(amap, csenv.m, new AccessorDomain(1), rfinfo.RecdFieldRef) : false) ? !CurriedLambda(() => rfinfo.LiteralValue != null)() : false) ? !rfinfo.RecdField.IsCompilerGenerated : false) ? [0, getValue(matchValue_6).data] : [1] : [1] : [1];

                                                                                                    switch ($var55[0]) {
                                                                                                      case 0:
                                                                                                        return [$var55[1], isSetProp];

                                                                                                      case 1:
                                                                                                        return null;
                                                                                                    }
                                                                                                  }, tys);
                                                                                                  const $var56 = props.tail != null ? props.tail.tail == null ? [0, props.head] : [1] : [1];

                                                                                                  switch ($var56[0]) {
                                                                                                    case 0:
                                                                                                      recdPropSearch = $var56[1];
                                                                                                      break;

                                                                                                    case 1:
                                                                                                      recdPropSearch = null;
                                                                                                      break;
                                                                                                  }
                                                                                                } else {
                                                                                                  recdPropSearch = null;
                                                                                                }

                                                                                                const matchValue_7 = [minfos, recdPropSearch];
                                                                                                const $var57 = matchValue_7[0].tail == null ? matchValue_7[1] == null ? !exists(function (arg10__3) {
                                                                                                  return isAnyParTy(g, arg10__3);
                                                                                                }, tys) ? [0] : [1] : [1] : [1];

                                                                                                switch ($var57[0]) {
                                                                                                  case 0:
                                                                                                    if (exists(function (arg10_) {
                                                                                                      return isFunTy(g, arg10_);
                                                                                                    }, tys)) {
                                                                                                      return ErrorD(new ConstraintSolverError(SR.csExpectTypeWithOperatorButGivenFunction(DecompileOpName(_arg1.data[1])), csenv.m, m2));
                                                                                                    } else if (exists(function (arg10__1) {
                                                                                                      return isAnyTupleTy(g, arg10__1);
                                                                                                    }, tys)) {
                                                                                                      return ErrorD(new ConstraintSolverError(SR.csExpectTypeWithOperatorButGivenTuple(DecompileOpName(_arg1.data[1])), csenv.m, m2));
                                                                                                    } else {
                                                                                                      const matchValue_8 = [_arg1.data[1], argtys];
                                                                                                      const $var58 = matchValue_8[0] === "op_Explicit" ? matchValue_8[1].tail != null ? matchValue_8[1].tail.tail == null ? [0, matchValue_8[1].head] : [1] : [1] : [1];

                                                                                                      switch ($var58[0]) {
                                                                                                        case 0:
                                                                                                          return ErrorD(new ConstraintSolverError(SR.csTypeDoesNotSupportConversion(prettyStringOfTy(csenv.DisplayEnv, $var58[1]), prettyStringOfTy(csenv.DisplayEnv, rty)), csenv.m, m2));

                                                                                                        case 1:
                                                                                                          let tyString;
                                                                                                          const $var59 = tys.tail != null ? tys.tail.tail == null ? [0, tys.head] : [1] : [1];

                                                                                                          switch ($var59[0]) {
                                                                                                            case 0:
                                                                                                              tyString = minimalStringOfType(csenv.DisplayEnv, $var59[1]);
                                                                                                              break;

                                                                                                            case 1:
                                                                                                              tyString = join(", ", map(function (ty_2) {
                                                                                                                return minimalStringOfType(csenv.DisplayEnv, ty_2);
                                                                                                              }, tys));
                                                                                                              break;
                                                                                                          }

                                                                                                          const opName = DecompileOpName(_arg1.data[1]);
                                                                                                          let err;

                                                                                                          switch (opName) {
                                                                                                            case "?>=":
                                                                                                            case "?>":
                                                                                                            case "?<=":
                                                                                                            case "?<":
                                                                                                            case "?=":
                                                                                                            case "?<>":
                                                                                                            case ">=?":
                                                                                                            case ">?":
                                                                                                            case "<=?":
                                                                                                            case "<?":
                                                                                                            case "=?":
                                                                                                            case "<>?":
                                                                                                            case "?>=?":
                                                                                                            case "?>?":
                                                                                                            case "?<=?":
                                                                                                            case "?<?":
                                                                                                            case "?=?":
                                                                                                            case "?<>?":
                                                                                                              if (tys.length === 1) {
                                                                                                                err = SR.csTypeDoesNotSupportOperatorNullable(tyString, opName);
                                                                                                              } else {
                                                                                                                err = SR.csTypesDoNotSupportOperatorNullable(tyString, opName);
                                                                                                              }

                                                                                                              break;

                                                                                                            default:
                                                                                                              if (tys.length === 1) {
                                                                                                                err = SR.csTypeDoesNotSupportOperator(tyString, opName);
                                                                                                              } else {
                                                                                                                err = SR.csTypesDoNotSupportOperator(tyString, opName);
                                                                                                              }

                                                                                                          }

                                                                                                          return ErrorD(new ConstraintSolverError(err, csenv.m, m2));
                                                                                                      }
                                                                                                    }

                                                                                                  case 1:
                                                                                                    const dummyExpr = mkUnit(g, csenv.m);
                                                                                                    const calledMethGroup = choose(function (minfo) {
                                                                                                      if (minfo.IsCurried) {
                                                                                                        return null;
                                                                                                      } else {
                                                                                                        const callerArgs = map(function (argty_2) {
                                                                                                          return new CallerArg(0, [argty_2, csenv.m, false, dummyExpr]);
                                                                                                        }, argtys);
                                                                                                        const minst = FreshenMethInfo(csenv.m, minfo);
                                                                                                        const objtys = minfo.GetObjArgTypes(amap, csenv.m, minst);
                                                                                                        return new CalledMeth(csenv.InfoReader, null, false, function (arg00_, arg10__2) {
                                                                                                          return FreshenMethInfo(arg00_, arg10__2);
                                                                                                        }, csenv.m, new AccessorDomain(1), minfo, minst, minst, null, objtys, ofArray([[callerArgs, new List()]]), false, false, null);
                                                                                                      }
                                                                                                    }, minfos);

                                                                                                    const patternInput_1 = function (arg00, arg10) {
                                                                                                      return trace.CollectThenUndoOrCommit(arg00, arg10);
                                                                                                    }(function (tupledArg) {
                                                                                                      return tupledArg[0] != null;
                                                                                                    }, function (trace_1) {
                                                                                                      return ResolveOverloading(csenv, new OptionalTrace(1, trace_1), _arg1.data[1], ndeep_1, traitInfo, 0, 0, new AccessorDomain(1), calledMethGroup, false, rty);
                                                                                                    });

                                                                                                    const matchValue_9 = [recdPropSearch, patternInput_1[0]];
                                                                                                    const $var60 = matchValue_9[0] == null ? matchValue_9[1] != null ? [1, getValue(matchValue_9[1])] : [2] : matchValue_9[1] == null ? [0, getValue(matchValue_9[0])[1], getValue(matchValue_9[0])[0]] : [2];

                                                                                                    switch ($var60[0]) {
                                                                                                      case 0:
                                                                                                        const rty2 = $var60[1] ? g.unit_ty : $var60[2].FieldType;
                                                                                                        return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep_1, m2, trace, rty, rty2), function () {
                                                                                                          return ResultD(new TraitConstraintSolution(3, [$var60[2], $var60[1]]));
                                                                                                        });

                                                                                                      case 1:
                                                                                                        const minfo_1 = $var60[1].Method;
                                                                                                        return op_PlusPlus(patternInput_1[1], function () {
                                                                                                          const isInstance = minfo_1.IsInstance;

                                                                                                          if (isInstance !== _arg1.data[2].IsInstance) {
                                                                                                            if (isInstance) {
                                                                                                              return ErrorD(new ConstraintSolverError(SR.csMethodFoundButIsNotStatic(minimalStringOfType(csenv.DisplayEnv, minfo_1.ApparentEnclosingType), DecompileOpName(_arg1.data[1]), _arg1.data[1]), csenv.m, m2));
                                                                                                            } else {
                                                                                                              return ErrorD(new ConstraintSolverError(SR.csMethodFoundButIsStatic(minimalStringOfType(csenv.DisplayEnv, minfo_1.ApparentEnclosingType), DecompileOpName(_arg1.data[1]), _arg1.data[1]), csenv.m, m2));
                                                                                                            }
                                                                                                          } else {
                                                                                                            return op_PlusPlus(CheckMethInfoAttributes(g, csenv.m, null, minfo_1), function () {
                                                                                                              return ResultD(new TraitConstraintSolution(2, [minfo_1, $var60[1].CalledTyArgs]));
                                                                                                            });
                                                                                                          }
                                                                                                        });

                                                                                                      case 2:
                                                                                                        const support = GetSupportOfMemberConstraint(csenv, traitInfo);
                                                                                                        const frees = GetFreeTyparsOfMemberConstraint(csenv, traitInfo);
                                                                                                        return op_PlusPlus(((permitWeakResolution ? support.tail == null : false) ? true : frees.tail == null) ? patternInput_1[1] : AddMemberConstraint(csenv, ndeep_1, m2, trace, traitInfo, support, frees), function () {
                                                                                                          const $var61 = patternInput_1[1].tag === 1 ? patternInput_1[1].data[1] instanceof UnresolvedOverloading ? (!ignoreUnresolvedOverload ? !(_arg1.data[1] === "op_Explicit" ? true : _arg1.data[1] === "op_Implicit") : false) ? [0] : [1] : [1] : [1];

                                                                                                          switch ($var61[0]) {
                                                                                                            case 0:
                                                                                                              return ErrorD(new LocallyAbortOperationThatFailsToResolveOverload());

                                                                                                            case 1:
                                                                                                              return ResultD(new TraitConstraintSolution(0));
                                                                                                          }
                                                                                                        });
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

                                }

                            }

                        }

                    }

                }

            }

        }
      }), function (res) {
        return RecordMemberConstraintSolution(csenv.SolverState, csenv.m, trace, traitInfo, res);
      });
    });
  }
}
export function RecordMemberConstraintSolution(css, m, trace, traitInfo, res) {
  if (res.tag === 2) {
    const sln = MemberConstraintSolutionOfMethInfo(css, m, res.data[0], res.data[1]);
    TransactMemberConstraintSolution(traitInfo, trace, sln);
    return ResultD(true);
  } else if (res.tag === 1) {
    TransactMemberConstraintSolution(traitInfo, trace, new TraitConstraintSln(4));
    return ResultD(true);
  } else if (res.tag === 3) {
    const sln_1 = MemberConstraintSolutionOfRecdFieldInfo(res.data[0], res.data[1]);
    TransactMemberConstraintSolution(traitInfo, trace, sln_1);
    return ResultD(true);
  } else {
    return ResultD(false);
  }
}
export function MemberConstraintSolutionOfMethInfo(css, m, minfo, minst) {
  css;

  if (minfo.tag === 0) {
    return new TraitConstraintSln(0, [minfo.data[1], minfo.data[2], minst]);
  } else if (minfo.tag === 2) {
    return error_1(new InternalError("the default struct constructor was the unexpected solution to a trait constraint", m));
  } else {
    const mref = mkRefToILMethod(minfo.data[1].DeclaringTyconRef.CompiledRepresentationForNamedType, minfo.data[1].RawMetadata);
    const iltref = defaultArg(minfo.data[1].ILExtensionMethodDeclaringTyconRef, null, function (tcref) {
      return tcref.CompiledRepresentationForNamedType;
    });
    return new TraitConstraintSln(2, [minfo.data[1].ApparentEnclosingType, iltref, mref, minst]);
  }
}
export function MemberConstraintSolutionOfRecdFieldInfo(rfinfo, isSet) {
  return new TraitConstraintSln(1, [rfinfo.TypeInst, rfinfo.RecdFieldRef, isSet]);
}
export function TransactMemberConstraintSolution(traitInfo, trace, sln) {
  const prev = traitInfo.Solution;

  (function (arg00, arg10) {
    trace.Exec(arg00, arg10);
  })(function () {
    traitInfo.Solution = sln;
  }, function () {
    traitInfo.Solution = prev;
  });
}
export function GetRelevantMethodsForTrait(csenv, permitWeakResolution, nm, _arg2) {
  var infoReader;
  var infoReader_1;
  var optFilter;
  var ad;
  var allowMultiIntfInst;
  var findFlag;
  var f;
  let results;

  if (permitWeakResolution ? true : GetSupportOfMemberConstraint(csenv, _arg2).tail == null) {
    const minfos = _arg2.data[2].MemberKind.tag === 1 ? map((infoReader = csenv.SolverState.InfoReader, function (typ) {
      return GetIntrinsicConstructorInfosOfType(infoReader, csenv.m, typ);
    }), _arg2.data[0]) : map((infoReader_1 = csenv.SolverState.InfoReader, optFilter = nm, ad = new AccessorDomain(2), allowMultiIntfInst = new AllowMultiIntfInstantiations(0), findFlag = new FindMemberFlag(0), function (typ_1) {
      return GetIntrinsicMethInfosOfType(infoReader_1, optFilter, ad, allowMultiIntfInst, findFlag, csenv.m, typ_1);
    }), _arg2.data[0]);
    const minfos_1 = reduce((f = function (arg00, arg10) {
      return MethInfo.MethInfosUseIdenticalDefinitions(arg00, arg10);
    }, function (l1, l2) {
      return ListSet.unionFavourLeft(f, l1, l2);
    }), minfos);
    results = minfos_1;
  } else {
    results = new List();
  }

  if (nm === "op_Explicit") {
    return append(results, GetRelevantMethodsForTrait(csenv, permitWeakResolution, "op_Implicit", new TraitConstraintInfo(0, [_arg2.data[0], "op_Implicit", _arg2.data[2], _arg2.data[3], _arg2.data[4], _arg2.data[5]])));
  } else {
    return results;
  }
}
export function GetSupportOfMemberConstraint(csenv, _arg3) {
  var arg00_;
  return choose((arg00_ = csenv.g, function (arg10_) {
    return tryAnyParTy(arg00_, arg10_);
  }), _arg3.data[0]);
}
export function GetFreeTyparsOfMemberConstraint(csenv, _arg4) {
  return freeInTypesLeftToRightSkippingConstraints(csenv.g, append(_arg4.data[0], append(_arg4.data[3], toList(defaultArg(_arg4.data[4], [], $var62 => [$var62])))));
}
export function SolveRelevantMemberConstraints(csenv, ndeep, permitWeakResolution, trace, tps) {
  return RepeatWhileD(ndeep, function (ndeep_1) {
    return AtLeastOneD(function (tp) {
      const ty = mkTyparTy(tp);
      const matchValue = tryAnyParTy(csenv.g, ty);

      if (matchValue == null) {
        return ResultD(false);
      } else {
        return SolveRelevantMemberConstraintsForTypar(csenv, ndeep_1, permitWeakResolution, trace, getValue(matchValue));
      }
    }, tps);
  });
}
export function SolveRelevantMemberConstraintsForTypar(csenv, ndeep, permitWeakResolution, trace, tp) {
  const cxst = csenv.SolverState.ExtraCxs;
  const tpn = tp.Stamp;
  const cxs = cxst.FindAll(tpn);

  if (cxs.tail == null) {
    return ResultD(false);
  } else {
    (function (arg00, arg10) {
      trace.Exec(arg00, arg10);
    })(function () {
      iterate(function (_arg4) {
        cxst.Remove_0(tpn);
      }, cxs);
    }, function () {
      iterate(function (cx) {
        cxst.Add_0(tpn, cx);
      }, cxs);
    });

    return AtLeastOneD(function (tupledArg) {
      const csenv_1 = new ConstraintSolverEnv(csenv.SolverState, csenv.eContextInfo, csenv.MatchingOnly, tupledArg[1], csenv.EquivEnv, csenv.DisplayEnv);
      return SolveMemberConstraint(csenv_1, true, permitWeakResolution, ndeep + 1, tupledArg[1], trace, tupledArg[0]);
    }, cxs);
  }
}
export function CanonicalizeRelevantMemberConstraints(csenv, ndeep, trace, tps) {
  return SolveRelevantMemberConstraints(csenv, ndeep, true, trace, tps);
}
export function AddMemberConstraint(csenv, ndeep, m2, trace, traitInfo, support, frees) {
  const g = csenv.g;
  const cxst = csenv.SolverState.ExtraCxs;
  iterate(function (tp) {
    const tpn = tp.Stamp;
    const cxs = cxst.FindAll(tpn);

    if (!exists(function (tupledArg) {
      return traitsAEquiv(g, csenv.EquivEnv, traitInfo, tupledArg[0]);
    }, cxs)) {
      (function (arg00, arg10) {
        trace.Exec(arg00, arg10);
      })(function () {
        csenv.SolverState.ExtraCxs.Add_0(tpn, [traitInfo, m2]);
      }, function () {
        csenv.SolverState.ExtraCxs.Remove_0(tpn);
      });
    }
  }, frees);
  return IterateD(function (tp_1) {
    return AddConstraint(csenv, ndeep, m2, trace, tp_1, new TyparConstraint(3, [traitInfo, m2]));
  }, support);
}
export function AddConstraint(csenv, ndeep, m2, trace, tp, newConstraint) {
  var enforceMutualConsistency;
  const g = csenv.g;
  const amap = csenv.amap;

  const consistent = function (tpc1, tpc2) {
    var tys2;
    var tys1;
    var rty2_1;
    var rty1_1;
    var nm2;
    var nm1;
    var memFlags2;
    var memFlags1;
    var argtys2;
    var argtys1;
    const matchValue = [tpc1, tpc2];
    const $var63 = matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? (tys2 = matchValue[1].data[0].data[0], tys1 = matchValue[0].data[0].data[0], rty2_1 = matchValue[1].data[0].data[4], rty1_1 = matchValue[0].data[0].data[4], nm2 = matchValue[1].data[0].data[1], nm1 = matchValue[0].data[0].data[1], memFlags2 = matchValue[1].data[0].data[2], memFlags1 = matchValue[0].data[0].data[2], argtys2 = matchValue[1].data[0].data[3], argtys1 = matchValue[0].data[0].data[3], (((memFlags1.Equals(memFlags2) ? nm1 === nm2 : false) ? !(nm1 === "op_Explicit" ? true : nm1 === "op_Implicit") : false) ? argtys1.length === argtys2.length : false) ? List_1.lengthsEqAndForall2(function (arg10_, arg20_) {
      return typeEquiv(g, arg10_, arg20_);
    }, tys1, tys2) : false) ? [0, matchValue[0].data[0].data[3], matchValue[1].data[0].data[3], matchValue[0].data[0].data[2], matchValue[1].data[0].data[2], matchValue[0].data[0].data[1], matchValue[1].data[0].data[1], matchValue[0].data[0].data[4], matchValue[1].data[0].data[4], matchValue[0].data[0].data[0], matchValue[1].data[0].data[0]] : [1] : [1] : [1];

    switch ($var63[0]) {
      case 0:
        const rty1 = GetFSharpViewOfReturnType(g, $var63[7]);
        const rty2 = GetFSharpViewOfReturnType(g, $var63[8]);
        return op_PlusPlus(Iterate2D(function (arg40_, arg50_) {
          return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, arg40_, arg50_);
        }, $var63[1], $var63[2]), function () {
          return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, rty1, rty2), function () {
            return CompleteD;
          });
        });

      case 1:
        const $var64 = matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [0, matchValue[0].data[0], matchValue[1].data[0]] : [5] : matchValue[0].tag === 8 ? matchValue[1].tag === 8 ? [1, matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [5] : matchValue[0].tag === 11 ? matchValue[1].tag === 11 ? [2, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1], matchValue[1].data[2]] : matchValue[1].tag === 9 ? [3] : [5] : matchValue[0].tag === 9 ? matchValue[1].tag === 11 ? [3] : matchValue[1].tag === 9 ? [4] : [5] : matchValue[0].tag === 4 ? matchValue[1].tag === 5 ? [3] : matchValue[1].tag === 4 ? [4] : [5] : matchValue[0].tag === 5 ? matchValue[1].tag === 4 ? [3] : matchValue[1].tag === 5 ? [4] : [5] : matchValue[0].tag === 10 ? matchValue[1].tag === 10 ? [4] : [5] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [4] : [5] : matchValue[0].tag === 12 ? matchValue[1].tag === 12 ? [4] : [5] : matchValue[0].tag === 7 ? matchValue[1].tag === 7 ? [4] : [5] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [4] : [5] : [5];

        switch ($var64[0]) {
          case 0:
            const collect = function (ty) {
              const res = {
                contents: new List()
              };
              IterateEntireHierarchyOfType(function (x) {
                res.contents = new List(x, res.contents);
              }, g, amap, csenv.m, new AllowMultiIntfInstantiations(1), ty);
              return reverse(res.contents);
            };

            const parents1 = collect($var64[1]);
            const parents2 = collect($var64[2]);
            return IterateD(function (ty1Parent) {
              return IterateD(function (ty2Parent) {
                return !HaveSameHeadType(g, ty1Parent, ty2Parent) ? CompleteD : SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, ty1Parent, ty2Parent);
              }, parents2);
            }, parents1);

          case 1:
            return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, $var64[1], trace, $var64[2], $var64[3]);

          case 2:
            return op_PlusPlus(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, $var64[5], trace, $var64[1], $var64[2]), function () {
              return SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, $var64[5], trace, $var64[3], $var64[4]);
            });

          case 3:
            return ErrorD(new _Error(SR.csStructConstraintInconsistent(), csenv.m));

          case 4:
            return CompleteD;

          case 5:
            return CompleteD;
        }

    }
  };

  const implies = function (tpc1_1, tpc2_1) {
    const matchValue_1 = [tpc1_1, tpc2_1];
    const $var65 = matchValue_1[0].tag === 0 ? matchValue_1[1].tag === 0 ? [1, matchValue_1[0].data[0], matchValue_1[1].data[0]] : [7] : matchValue_1[0].tag === 8 ? matchValue_1[1].tag === 8 ? [2, matchValue_1[0].data[0], matchValue_1[1].data[0]] : [7] : matchValue_1[0].tag === 11 ? matchValue_1[1].tag === 11 ? [3, matchValue_1[0].data[0], matchValue_1[1].data[0], matchValue_1[0].data[1], matchValue_1[1].data[1]] : [7] : matchValue_1[0].tag === 9 ? matchValue_1[1].tag === 9 ? [4] : matchValue_1[1].tag === 10 ? [4] : [7] : matchValue_1[0].tag === 10 ? matchValue_1[1].tag === 10 ? [4] : [7] : matchValue_1[0].tag === 2 ? matchValue_1[1].tag === 2 ? [4] : [7] : matchValue_1[0].tag === 4 ? matchValue_1[1].tag === 4 ? [4] : [7] : matchValue_1[0].tag === 12 ? matchValue_1[1].tag === 12 ? [4] : [7] : matchValue_1[0].tag === 5 ? matchValue_1[1].tag === 5 ? [4] : [7] : matchValue_1[0].tag === 7 ? matchValue_1[1].tag === 7 ? [4] : [7] : matchValue_1[0].tag === 6 ? matchValue_1[1].tag === 6 ? [5, matchValue_1[0].data[0], matchValue_1[1].data[0]] : [7] : matchValue_1[0].tag === 1 ? matchValue_1[1].tag === 1 ? [6, matchValue_1[0].data[1], matchValue_1[1].data[1], matchValue_1[0].data[0], matchValue_1[1].data[0]] : [7] : matchValue_1[1].tag === 3 ? [0, matchValue_1[0].data[0], matchValue_1[1].data[0]] : [7];

    switch ($var65[0]) {
      case 0:
        return traitsAEquiv(g, csenv.EquivEnv, $var65[1], $var65[2]);

      case 1:
        return ExistsSameHeadTypeInHierarchy(g, amap, csenv.m, $var65[1], $var65[2]);

      case 2:
        return typeEquiv(g, $var65[1], $var65[2]);

      case 3:
        if (typeEquiv(g, $var65[1], $var65[2])) {
          return typeEquiv(g, $var65[3], $var65[4]);
        } else {
          return false;
        }

      case 4:
        return true;

      case 5:
        return ListSet.isSubsetOf(function (arg10__1, arg20__1) {
          return typeEquiv(g, arg10__1, arg20__1);
        }, $var65[1], $var65[2]);

      case 6:
        if ($var65[3] === $var65[4]) {
          return typeEquiv(g, $var65[1], $var65[2]);
        } else {
          return false;
        }

      case 7:
        return false;
    }
  };

  const existingConstraints = tp.Constraints;
  const allCxs = new List(newConstraint, reverse(existingConstraints));
  return op_PlusPlus((enforceMutualConsistency = function (i, cxs) {
    return cxs.tail != null ? op_PlusPlus(IterateIdxD(function (j, cx2) {
      return i === j ? CompleteD : consistent(cxs.head, cx2);
    }, allCxs), function () {
      return enforceMutualConsistency(i + 1, cxs.tail);
    }) : CompleteD;
  }, enforceMutualConsistency(0, allCxs)), function () {
    const impliedByExistingConstraints = exists(function (tpc2_2) {
      return implies(tpc2_2, newConstraint);
    }, existingConstraints);

    if (impliedByExistingConstraints) {
      return CompleteD;
    } else if ((() => {
      const matchValue_2 = [tp.Rigidity, newConstraint];
      const $var66 = matchValue_2[0].tag === 0 ? matchValue_2[1].tag === 1 ? [0] : [1] : matchValue_2[0].tag === 1 ? matchValue_2[1].tag === 1 ? [0] : [1] : [1];

      switch ($var66[0]) {
        case 0:
          return true;

        case 1:
          return false;
      }
    })()) {
      return CompleteD;
    } else if (tp.Rigidity.Equals(new TyparRigidity(0))) {
      return ErrorD(new ConstraintSolverMissingConstraint(csenv.DisplayEnv, tp, newConstraint, csenv.m, m2));
    } else {
      return op_PlusPlus(tp.Rigidity.WarnIfMissingConstraint ? WarnD(new ConstraintSolverMissingConstraint(csenv.DisplayEnv, tp, newConstraint, csenv.m, m2)) : CompleteD, function () {
        let newConstraints;

        const eliminateRedundant = function (cxs_1, acc) {
          eliminateRedundant: while (true) {
            if (cxs_1.tail != null) {
              const $var108 = cxs_1.tail;
              acc = exists(function (cx2_1) {
                return implies(cx2_1, cxs_1.head);
              }, acc) ? acc : new List(cxs_1.head, acc);
              cxs_1 = $var108;
              continue eliminateRedundant;
            } else {
              return acc;
            }
          }
        };

        newConstraints = eliminateRedundant(allCxs, new List());
        const orig = tp.typar_constraints;

        (function (arg00, arg10) {
          trace.Exec(arg00, arg10);
        })(function () {
          tp.typar_constraints = newConstraints;
        }, function () {
          tp.typar_constraints = orig;
        });

        return CompleteD;
      });
    }
  });
}
export function SolveTypSupportsNull(csenv, ndeep, m2, trace, ty) {
  const g = csenv.g;
  const matchValue = tryDestTyparTy(g, ty);

  if (matchValue == null) {
    if (TypeSatisfiesNullConstraint(g, csenv.m, ty)) {
      return CompleteD;
    } else {
      const activePatternResult38028 = function (arg10_) {
        return _NullableTy___(g, arg10_);
      }(ty);

      if (activePatternResult38028 != null) {
        return ErrorD(new ConstraintSolverError(SR.csNullableTypeDoesNotHaveNull(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));
      } else {
        return ErrorD(new ConstraintSolverError(SR.csTypeDoesNotHaveNull(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));
      }
    }
  } else {
    return AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(2, csenv.m));
  }
}
export function SolveTypeSupportsComparison(csenv, ndeep, m2, trace, ty) {
  var tcref;
  const g = csenv.g;
  const amap = csenv.amap;
  const matchValue = tryDestTyparTy(g, ty);

  if (matchValue == null) {
    const matchValue_1 = tryDestAppTy(g, ty);
    const $var67 = matchValue_1 != null ? HasFSharpAttribute(g, g.attrib_NoComparisonAttribute, getValue(matchValue_1).Attribs) ? [0, getValue(matchValue_1)] : [1] : [1];

    switch ($var67[0]) {
      case 0:
        return ErrorD(new ConstraintSolverError(SR.csTypeDoesNotSupportComparison1(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));

      case 1:
        const activePatternResult38039 = function (arg10_) {
          return _SpecialComparableHeadType___(g, arg10_);
        }(ty);

        if (activePatternResult38039 != null) {
          return IterateD(function (ty_1) {
            return SolveTypeSupportsComparison(csenv, ndeep, m2, trace, ty_1);
          }, getValue(activePatternResult38039));
        } else if (ExistsSameHeadTypeInHierarchy(g, amap, m2, ty, g.mk_IComparable_ty) ? true : ExistsSameHeadTypeInHierarchy(g, amap, m2, ty, g.mk_IStructuralComparable_ty)) {
          const activePatternResult38037 = function (arg10__1) {
            return _AppTy___(g, arg10__1);
          }(ty);

          if (activePatternResult38037 != null) {
            return Iterate2D(function (ty_2, tp) {
              return tp.ComparisonConditionalOn ? SolveTypeSupportsComparison(csenv, ndeep, m2, trace, ty_2) : CompleteD;
            }, getValue(activePatternResult38037)[1], getValue(activePatternResult38037)[0].TyparsNoRange);
          } else {
            return CompleteD;
          }
        } else if (isAppTy(g, ty) ? (tcref = tcrefOfAppTy(g, ty), TyconIsCandidateForAugmentationWithCompare(g, tcref.Deref) ? tcref.GeneratedCompareToWithComparerValues == null : false) : false) {
          return ErrorD(new ConstraintSolverError(SR.csTypeDoesNotSupportComparison3(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));
        } else {
          return ErrorD(new ConstraintSolverError(SR.csTypeDoesNotSupportComparison2(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));
        }

    }
  } else {
    return AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(9, csenv.m));
  }
}
export function SolveTypSupportsEquality(csenv, ndeep, m2, trace, ty) {
  const g = csenv.g;
  const matchValue = tryDestTyparTy(g, ty);

  if (matchValue == null) {
    const matchValue_1 = tryDestAppTy(g, ty);
    const $var68 = matchValue_1 != null ? HasFSharpAttribute(g, g.attrib_NoEqualityAttribute, getValue(matchValue_1).Attribs) ? [0, getValue(matchValue_1)] : [1] : [1];

    switch ($var68[0]) {
      case 0:
        return ErrorD(new ConstraintSolverError(SR.csTypeDoesNotSupportEquality1(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));

      case 1:
        const activePatternResult38052 = function (arg10_) {
          return _SpecialEquatableHeadType___(g, arg10_);
        }(ty);

        if (activePatternResult38052 != null) {
          return IterateD(function (ty_1) {
            return SolveTypSupportsEquality(csenv, ndeep, m2, trace, ty_1);
          }, getValue(activePatternResult38052));
        } else {
          const activePatternResult38050 = function (arg10__1) {
            return _SpecialNotEquatableHeadType___(g, arg10__1);
          }(ty);

          if (activePatternResult38050 != null) {
            return ErrorD(new ConstraintSolverError(SR.csTypeDoesNotSupportEquality2(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));
          } else {
            const activePatternResult38048 = function (arg10__2) {
              return _AppTy___(g, arg10__2);
            }(ty);

            if (activePatternResult38048 != null) {
              if (TyconIsCandidateForAugmentationWithEquals(g, getValue(activePatternResult38048)[0].Deref) ? getValue(activePatternResult38048)[0].GeneratedHashAndEqualsWithComparerValues == null : false) {
                return ErrorD(new ConstraintSolverError(SR.csTypeDoesNotSupportEquality3(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));
              } else {
                return Iterate2D(function (ty_2, tp) {
                  return tp.EqualityConditionalOn ? SolveTypSupportsEquality(csenv, ndeep, m2, trace, ty_2) : CompleteD;
                }, getValue(activePatternResult38048)[1], getValue(activePatternResult38048)[0].TyparsNoRange);
              }
            } else {
              return CompleteD;
            }
          }
        }

    }
  } else {
    return AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(10, csenv.m));
  }
}
export function SolveTypIsEnum(csenv, ndeep, m2, trace, ty, underlying) {
  return function (builder_) {
    const g = csenv.g;
    const matchValue = tryDestTyparTy(g, ty);

    if (matchValue == null) {
      if (isEnumTy(g, ty)) {
        return builder_.Bind(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, underlying, underlyingTypeOfEnumTy(g, ty)), function () {
          return builder_.ReturnFrom(CompleteD);
        });
      } else {
        return builder_.ReturnFrom(ErrorD(new ConstraintSolverError(SR.csTypeIsNotEnumType(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2)));
      }
    } else {
      return builder_.ReturnFrom(AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(8, [underlying, csenv.m])));
    }
  }(trackErrors);
}
export function SolveTypIsDelegate(csenv, ndeep, m2, trace, ty, aty, bty) {
  return function (builder_) {
    const g = csenv.g;
    const matchValue = tryDestTyparTy(g, ty);

    if (matchValue == null) {
      if (isDelegateTy(g, ty)) {
        const matchValue_1 = TryDestStandardDelegateTyp(csenv.InfoReader, csenv.m, new AccessorDomain(3), ty);

        if (matchValue_1 == null) {
          return builder_.ReturnFrom(ErrorD(new ConstraintSolverError(SR.csTypeHasNonStandardDelegateType(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2)));
        } else {
          const tupledArgTy = getValue(matchValue_1)[0];
          const rty = getValue(matchValue_1)[1];
          return builder_.Bind(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, aty, tupledArgTy), function () {
            return builder_.Bind(SolveTypEqualsTypKeepAbbrevs(csenv, ndeep, m2, trace, bty, rty), function () {
              return builder_.Return();
            });
          });
        }
      } else {
        return builder_.ReturnFrom(ErrorD(new ConstraintSolverError(SR.csTypeIsNotDelegateType(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2)));
      }
    } else {
      return builder_.ReturnFrom(AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(11, [aty, bty, csenv.m])));
    }
  }(trackErrors);
}
export function SolveTypIsNonNullableValueType(csenv, ndeep, m2, trace, ty) {
  return function (builder_) {
    const g = csenv.g;
    const matchValue = tryDestTyparTy(g, ty);

    if (matchValue == null) {
      const underlyingTy = stripTyEqnsAndMeasureEqns(g, ty);

      if (isStructTy(g, underlyingTy)) {
        if (tyconRefEq(g, g.system_Nullable_tcref, tcrefOfAppTy(g, underlyingTy))) {
          return builder_.ReturnFrom(ErrorD(new ConstraintSolverError(SR.csTypeParameterCannotBeNullable(), csenv.m, csenv.m)));
        } else {
          return builder_.Zero();
        }
      } else {
        return builder_.ReturnFrom(ErrorD(new ConstraintSolverError(SR.csGenericConstructRequiresStructType(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2)));
      }
    } else {
      return builder_.ReturnFrom(AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(4, csenv.m)));
    }
  }(trackErrors);
}
export function SolveTypIsUnmanaged(csenv, ndeep, m2, trace, ty) {
  const g = csenv.g;
  const matchValue = tryDestTyparTy(g, ty);

  if (matchValue == null) {
    if (isUnmanagedTy(g, ty)) {
      return CompleteD;
    } else {
      return ErrorD(new ConstraintSolverError(SR.csGenericConstructRequiresUnmanagedType(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, m2));
    }
  } else {
    return AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(12, csenv.m));
  }
}
export function SolveTypChoice(csenv, ndeep, m2, trace, ty, tys) {
  var arg00_;
  const g = csenv.g;
  const matchValue = tryDestTyparTy(g, ty);

  if (matchValue == null) {
    if (exists((arg00_ = new Erasure(1), function (arg30_) {
      return typeEquivAux(arg00_, g, ty, arg30_);
    }), tys)) {
      return CompleteD;
    } else {
      return ErrorD(new ConstraintSolverError(SR.csTypeNotCompatibleBecauseOfPrintf(minimalStringOfType(csenv.DisplayEnv, ty), join(",", map(function (x) {
        return prettyStringOfTy(csenv.DisplayEnv, x);
      }, tys))), csenv.m, m2));
    }
  } else {
    return AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(6, [tys, csenv.m]));
  }
}
export function SolveTypIsReferenceType(csenv, ndeep, m2, trace, ty) {
  const g = csenv.g;
  const matchValue = tryDestTyparTy(g, ty);

  if (matchValue == null) {
    if (isRefTy(g, ty)) {
      return CompleteD;
    } else {
      return ErrorD(new ConstraintSolverError(SR.csGenericConstructRequiresReferenceSemantics(minimalStringOfType(csenv.DisplayEnv, ty)), csenv.m, csenv.m));
    }
  } else {
    return AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(5, csenv.m));
  }
}
export function SolveTypRequiresDefaultConstructor(csenv, ndeep, m2, trace, typ) {
  const g = csenv.g;
  const amap = csenv.amap;
  const ty = stripTyEqnsAndMeasureEqns(g, typ);
  const matchValue = tryDestTyparTy(g, ty);

  if (matchValue == null) {
    if (isStructTy(g, ty) ? TypeHasDefaultValue(g, csenv.m, ty) : false) {
      return CompleteD;
    } else if (exists(function (x) {
      return x.IsNullary ? IsMethInfoAccessible(amap, csenv.m, new AccessorDomain(1), x) : false;
    }, GetIntrinsicConstructorInfosOfType(csenv.InfoReader, csenv.m, ty))) {
      const matchValue_1 = tryDestAppTy(g, ty);
      const $var69 = matchValue_1 != null ? HasFSharpAttribute(g, g.attrib_AbstractClassAttribute, getValue(matchValue_1).Attribs) ? [0, getValue(matchValue_1)] : [1] : [1];

      switch ($var69[0]) {
        case 0:
          return ErrorD(new ConstraintSolverError(SR.csGenericConstructRequiresNonAbstract(minimalStringOfType(csenv.DisplayEnv, typ)), csenv.m, m2));

        case 1:
          return CompleteD;
      }
    } else {
      const matchValue_2 = tryDestAppTy(g, ty);
      const $var70 = matchValue_2 != null ? (getValue(matchValue_2).PreEstablishedHasDefaultConstructor ? true : getValue(matchValue_2).IsRecordTycon ? HasFSharpAttribute(g, g.attrib_CLIMutableAttribute, getValue(matchValue_2).Attribs) : false) ? [0, getValue(matchValue_2)] : [1] : [1];

      switch ($var70[0]) {
        case 0:
          return CompleteD;

        case 1:
          return ErrorD(new ConstraintSolverError(SR.csGenericConstructRequiresPublicDefaultConstructor(minimalStringOfType(csenv.DisplayEnv, typ)), csenv.m, m2));
      }
    }
  } else {
    return AddConstraint(csenv, ndeep, m2, trace, getValue(matchValue), new TyparConstraint(7, csenv.m));
  }
}
export function CanMemberSigsMatchUpToCheck(csenv, permitOptArgs, alwaysCheckReturn, unifyTypes, subsumeTypes, subsumeArg, reqdRetTyOpt, calledMeth) {
  const g = csenv.g;
  const amap = csenv.amap;
  const minfo = calledMeth.Method;
  const minst = calledMeth.CalledTyArgs;
  const uminst = calledMeth.CallerTyArgs;
  const callerObjArgTys = calledMeth.CallerObjArgTys;
  const methodRetTy = calledMeth.ReturnType;
  const assignedItemSetters = calledMeth.AssignedItemSetters;
  const unnamedCalledOptArgs = calledMeth.UnnamedCalledOptArgs;
  const unnamedCalledOutArgs = calledMeth.UnnamedCalledOutArgs;

  if (minst.length !== uminst.length) {
    return ErrorD(new _Error(SR.csTypeInstantiationLengthMismatch(), csenv.m));
  } else {
    return op_PlusPlus(Iterate2D(unifyTypes, minst, uminst), function () {
      if (!(permitOptArgs ? true : unnamedCalledOptArgs.tail == null)) {
        return ErrorD(new _Error(SR.csOptionalArgumentNotPermittedHere(), csenv.m));
      } else {
        const calledObjArgTys = minfo.GetObjArgTypes(amap, csenv.m, minst);

        if (calledObjArgTys.length !== callerObjArgTys.length) {
          if (calledObjArgTys.length !== 0) {
            return ErrorD(new _Error(SR.csMemberIsNotStatic(minfo.LogicalName), csenv.m));
          } else {
            return ErrorD(new _Error(SR.csMemberIsNotInstance(minfo.LogicalName), csenv.m));
          }
        } else {
          return op_PlusPlus(Iterate2D(subsumeTypes, calledObjArgTys, callerObjArgTys), function () {
            return op_PlusPlus(IterateD(function (argSet) {
              return argSet.UnnamedCalledArgs.length !== argSet.UnnamedCallerArgs.length ? ErrorD(new _Error(SR.csArgumentLengthMismatch(), csenv.m)) : Iterate2D(subsumeArg, argSet.UnnamedCalledArgs, argSet.UnnamedCallerArgs);
            }, calledMeth.ArgSets), function () {
              return op_PlusPlus(OptionD(function (calledArg) {
                var f;

                if (isArray1DTy(g, calledArg.CalledArgumentType)) {
                  const paramArrayElemTy = destArrayTy(g, calledArg.CalledArgumentType);
                  return OptionD((f = function (callerArg) {
                    return subsumeArg(GetCalledArg([0, 0], false, new OptionalArgInfo(0), new CallerInfoInfo(0), false, null, calledArg.ReflArgInfo, paramArrayElemTy), callerArg);
                  }, function (xs) {
                    return IterateD(f, xs);
                  }), calledMeth.ParamArrayCallerArgs);
                } else {
                  return CompleteD;
                }
              }, calledMeth.ParamArrayCalledArgOpt), function () {
                return op_PlusPlus(op_PlusPlus(IterateD(function (argSet_1) {
                  return IterateD(function (arg) {
                    return subsumeArg(arg.CalledArg, arg.CallerArg);
                  }, argSet_1.AssignedNamedArgs);
                }, calledMeth.ArgSets), function () {
                  return IterateD(function (_arg6) {
                    let patternInput;

                    if (_arg6.data[1].tag === 1) {
                      const calledArgTy = _arg6.data[1].data.FieldType(amap, csenv.m);

                      patternInput = [_arg6.data[1].data.FieldName, calledArgTy];
                    } else if (_arg6.data[1].tag === 2) {
                      const calledArgTy_1 = _arg6.data[1].data.FieldType;
                      patternInput = [_arg6.data[1].data.Name, calledArgTy_1];
                    } else {
                      const calledArgTy_2 = _arg6.data[1].data[1].GetParamTypes(amap, csenv.m, _arg6.data[1].data[2]).head.head;

                      patternInput = [_arg6.data[1].data[1].LogicalName, calledArgTy_2];
                    }

                    return subsumeArg(GetCalledArg([-1, 0], false, new OptionalArgInfo(0), new CallerInfoInfo(0), false, mkSynId(csenv.m, patternInput[0]), new ReflectedArgInfo(0), patternInput[1]), _arg6.data[2]);
                  }, assignedItemSetters);
                }), function () {
                  if (reqdRetTyOpt != null) {
                    if (minfo.IsConstructor) {
                      return CompleteD;
                    } else {
                      const $var71 = reqdRetTyOpt != null ? (!alwaysCheckReturn ? unnamedCalledOutArgs.tail == null : false) ? [0] : [1] : [1];

                      switch ($var71[0]) {
                        case 0:
                          return CompleteD;

                        case 1:
                          if (reqdRetTyOpt != null) {
                            let methodRetTy_1;

                            if (unnamedCalledOutArgs.tail == null) {
                              methodRetTy_1 = methodRetTy;
                            } else {
                              const outArgTys = map(function (calledArg_1) {
                                return destByrefTy(g, calledArg_1.CalledArgumentType);
                              }, unnamedCalledOutArgs);

                              if (isUnitTy(g, methodRetTy)) {
                                methodRetTy_1 = mkRefTupledTy(g, outArgTys);
                              } else {
                                methodRetTy_1 = mkRefTupledTy(g, new List(methodRetTy, outArgTys));
                              }
                            }

                            return unifyTypes(getValue(reqdRetTyOpt), methodRetTy_1);
                          } else {
                            throw new Error("C:/projects/fcs/src/fsharp/ConstraintSolver.fs", 1946, 14);
                          }

                      }
                    }
                  } else {
                    return CompleteD;
                  }
                });
              });
            });
          });
        }
      }
    });
  }
}

function SolveTypSubsumesTypWithReport(csenv, ndeep, m, trace, cxsln, ty1, ty2) {
  return TryD(function () {
    return SolveTypSubsumesTypKeepAbbrevs(csenv, ndeep, m, trace, cxsln, ty1, ty2);
  }, function (_arg13) {
    if (_arg13 instanceof LocallyAbortOperationThatFailsToResolveOverload) {
      return CompleteD;
    } else if (csenv.eContextInfo.tag === 9) {
      const matchValue = CollectThenUndo(function (newTrace) {
        return SolveTypSubsumesTypKeepAbbrevs(csenv, ndeep, m, new OptionalTrace(1, newTrace), cxsln, ty2, ty1);
      });

      if (matchValue.tag === 0) {
        return ErrorD(new ErrorsFromAddingSubsumptionConstraint(csenv.g, csenv.DisplayEnv, ty1, ty2, _arg13, new ContextInfo(10, csenv.eContextInfo.data), m));
      } else {
        return ErrorD(new ErrorsFromAddingSubsumptionConstraint(csenv.g, csenv.DisplayEnv, ty1, ty2, _arg13, new ContextInfo(0), m));
      }
    } else {
      return ErrorD(new ErrorsFromAddingSubsumptionConstraint(csenv.g, csenv.DisplayEnv, ty1, ty2, _arg13, csenv.eContextInfo, m));
    }
  });
}

function SolveTypEqualsTypWithReport(csenv, ndeep, m, trace, cxsln, ty1, ty2) {
  return TryD(function () {
    return SolveTypEqualsTypKeepAbbrevsWithCxsln(csenv, ndeep, m, trace, cxsln, ty1, ty2);
  }, function (_arg14) {
    return _arg14 instanceof LocallyAbortOperationThatFailsToResolveOverload ? CompleteD : ErrorD(new ErrorFromAddingTypeEquation(csenv.g, csenv.DisplayEnv, ty1, ty2, _arg14, m));
  });
}

export function ArgsMustSubsumeOrConvert(csenv, ndeep, trace, cxsln, isConstraint, calledArg, callerArg) {
  const g = csenv.g;
  const m = callerArg.Range;
  const calledArgTy = AdjustCalledArgType(csenv.InfoReader, isConstraint, calledArg, callerArg);
  return op_PlusPlus(SolveTypSubsumesTypWithReport(csenv, ndeep, m, trace, cxsln, calledArgTy, callerArg.Type), function () {
    return ((calledArg.IsParamArray ? isArray1DTy(g, calledArgTy) : false) ? !isArray1DTy(g, callerArg.Type) : false) ? ErrorD(new _Error(SR.csMethodExpectsParams(), m)) : CompleteD;
  });
}
export function MustUnify(csenv, ndeep, trace, cxsln, ty1, ty2) {
  return SolveTypEqualsTypWithReport(csenv, ndeep, csenv.m, trace, cxsln, ty1, ty2);
}
export function MustUnifyInsideUndo(csenv, ndeep, trace, cxsln, ty1, ty2) {
  return SolveTypEqualsTypWithReport(csenv, ndeep, csenv.m, new OptionalTrace(1, trace), cxsln, ty1, ty2);
}
export function ArgsMustSubsumeOrConvertInsideUndo(csenv, ndeep, trace, cxsln, isConstraint, calledArg, _arg5) {
  const calledArgTy = AdjustCalledArgType(csenv.InfoReader, isConstraint, calledArg, _arg5);
  return SolveTypSubsumesTypWithReport(csenv, ndeep, _arg5.data[1], new OptionalTrace(1, trace), cxsln, calledArgTy, _arg5.data[0]);
}
export function TypesMustSubsumeOrConvertInsideUndo(csenv, ndeep, trace, cxsln, m, calledArgTy, callerArgTy) {
  return SolveTypSubsumesTypWithReport(csenv, ndeep, m, trace, cxsln, calledArgTy, callerArgTy);
}
export function ArgsEquivInsideUndo(csenv, isConstraint, calledArg, _arg6) {
  const calledArgTy = AdjustCalledArgType(csenv.InfoReader, isConstraint, calledArg, _arg6);

  if (typeEquiv(csenv.g, calledArgTy, _arg6.data[0])) {
    return CompleteD;
  } else {
    return ErrorD(new _Error(SR.csArgumentTypesDoNotMatch(), _arg6.data[1]));
  }
}
export function ReportNoCandidatesError(csenv, nUnnamedCallerArgs, nNamedCallerArgs, methodName, ad, calledMethGroup, isSequential) {
  const amap = csenv.amap;
  return ErrorD((() => {
    var cmeth_7;
    var cmeth_8;
    var cmeth_9;
    var cmeth_10;
    var cmeth_11;
    var cmeth_12;
    var cmeths2;
    var cmeth_6;
    const matchValue = [partition($var72 => function (minfo) {
      return IsMethInfoAccessible(amap, csenv.m, ad, minfo);
    }(function (arg00) {
      return CalledMeth.GetMethod(arg00);
    }($var72)), calledMethGroup), partition(function (cmeth) {
      return cmeth.HasCorrectObjArgs(csenv.m);
    }, calledMethGroup), partition(function (cmeth_1) {
      return cmeth_1.HasCorrectArity;
    }, calledMethGroup), partition(function (cmeth_2) {
      return cmeth_2.HasCorrectGenericArity;
    }, calledMethGroup), partition(function (cmeth_3) {
      return cmeth_3.AssignsAllNamedArgs;
    }, calledMethGroup)];
    const $var73 = matchValue[0][0].tail == null ? [0, matchValue[0][1]] : matchValue[1][0].tail == null ? matchValue[1][1].tail != null ? [1, matchValue[1][1].head] : matchValue[4][0].tail == null ? matchValue[4][1].tail != null ? matchValue[4][1].tail.tail == null ? [2, matchValue[4][1].head] : matchValue[2][0].tail == null ? matchValue[2][1].tail != null ? matchValue[2][1].tail.tail == null ? (cmeth_7 = matchValue[2][1].head, !cmeth_7.HasCorrectArity) ? [3, matchValue[2][1].head] : [4] : [4] : [4] : [4] : matchValue[2][0].tail == null ? matchValue[2][1].tail != null ? matchValue[2][1].tail.tail == null ? (cmeth_8 = matchValue[2][1].head, !cmeth_8.HasCorrectArity) ? [3, matchValue[2][1].head] : [4] : [4] : [4] : [4] : matchValue[2][0].tail == null ? matchValue[2][1].tail != null ? matchValue[2][1].tail.tail == null ? (cmeth_9 = matchValue[2][1].head, !cmeth_9.HasCorrectArity) ? [3, matchValue[2][1].head] : [4] : [4] : [4] : [4] : matchValue[4][0].tail == null ? matchValue[4][1].tail != null ? matchValue[4][1].tail.tail == null ? [2, matchValue[4][1].head] : matchValue[2][0].tail == null ? matchValue[2][1].tail != null ? matchValue[2][1].tail.tail == null ? (cmeth_10 = matchValue[2][1].head, !cmeth_10.HasCorrectArity) ? [3, matchValue[2][1].head] : [4] : [4] : [4] : [4] : matchValue[2][0].tail == null ? matchValue[2][1].tail != null ? matchValue[2][1].tail.tail == null ? (cmeth_11 = matchValue[2][1].head, !cmeth_11.HasCorrectArity) ? [3, matchValue[2][1].head] : [4] : [4] : [4] : [4] : matchValue[2][0].tail == null ? matchValue[2][1].tail != null ? matchValue[2][1].tail.tail == null ? (cmeth_12 = matchValue[2][1].head, !cmeth_12.HasCorrectArity) ? [3, matchValue[2][1].head] : [4] : [4] : [4] : [4];

    switch ($var73[0]) {
      case 0:
        if ($var73[1].tail == null) {
          return new _Error(SR.csMemberIsNotAccessible(methodName, ShowAccessDomain(ad)), csenv.m);
        } else {
          return new _Error(SR.csMemberIsNotAccessible2(methodName, ShowAccessDomain(ad)), csenv.m);
        }

      case 1:
        if ($var73[1].CalledObjArgTys(csenv.m).length !== 0) {
          return new _Error(SR.csMethodIsNotAStaticMethod(methodName), csenv.m);
        } else {
          return new _Error(SR.csMethodIsNotAnInstanceMethod(methodName), csenv.m);
        }

      case 2:
        const minfo_1 = $var73[1].Method;
        const patternInput = SR.csRequiredSignatureIs(stringOfMethInfo(amap, csenv.m, csenv.DisplayEnv, minfo_1));
        const matchValue_1 = $var73[1].UnassignedNamedArgs;

        if (matchValue_1.tail == null) {
          return new _Error([patternInput[0], patternInput[1]], csenv.m);
        } else {
          const id = matchValue_1.head.data[0];

          if (minfo_1.IsConstructor) {
            const predictFields = function () {
              return new Set(map(function (p) {
                return replace(p.Name, "@", "");
              }, minfo_1.DeclaringTyconRef.AllInstanceFieldsAsList));
            };

            return new ErrorWithSuggestions([patternInput[0], SR.csCtorHasNoArgumentOrReturnProperty(methodName, id.idText, patternInput[1])], id.idRange, id.idText, predictFields);
          } else {
            return new _Error([patternInput[0], SR.csMemberHasNoArgumentOrReturnProperty(methodName, id.idText, patternInput[1])], id.idRange);
          }
        }

      case 3:
        const minfo_2 = $var73[1].Method;
        const nReqd = $var73[1].TotalNumUnnamedCalledArgs | 0;
        const nActual = $var73[1].TotalNumUnnamedCallerArgs | 0;
        const signature = stringOfMethInfo(amap, csenv.m, csenv.DisplayEnv, minfo_2);

        if (nActual === nReqd) {
          const nreqdTyArgs = $var73[1].NumCalledTyArgs | 0;
          const nactualTyArgs = $var73[1].NumCallerTyArgs | 0;
          return new _Error(SR.csMemberSignatureMismatchArityType(methodName, nreqdTyArgs, nactualTyArgs, signature), csenv.m);
        } else {
          const nReqdNamed = $var73[1].TotalNumAssignedNamedArgs | 0;

          if (nReqdNamed === 0 ? $var73[1].NumAssignedProps === 0 : false) {
            if (minfo_2.IsConstructor) {
              const couldBeNameArgs = exists(function (argSet) {
                return exists(function (c) {
                  return isSequential(c.Expr);
                }, argSet.UnnamedCallerArgs);
              }, $var73[1].ArgSets);

              if (couldBeNameArgs) {
                return new _Error(SR.csCtorSignatureMismatchArityProp(methodName, nReqd, nActual, signature), csenv.m);
              } else {
                return new _Error(SR.csCtorSignatureMismatchArity(methodName, nReqd, nActual, signature), csenv.m);
              }
            } else {
              return new _Error(SR.csMemberSignatureMismatchArity(methodName, nReqd, nActual, signature), csenv.m);
            }
          } else if (nReqd > nActual) {
            const diff = nReqd - nActual | 0;
            const missingArgs = List_1.drop(nReqd, $var73[1].AllUnnamedCalledArgs);
            const matchValue_2 = NamesOfCalledArgs(missingArgs);

            if (matchValue_2.tail == null) {
              if (nActual === 0) {
                return new _Error(SR.csMemberSignatureMismatch(methodName, diff, signature), csenv.m);
              } else {
                return new _Error(SR.csMemberSignatureMismatch2(methodName, diff, signature), csenv.m);
              }
            } else {
              const str = join(";", pathOfLid(matchValue_2));

              if (nActual === 0) {
                return new _Error(SR.csMemberSignatureMismatch3(methodName, diff, signature, str), csenv.m);
              } else {
                return new _Error(SR.csMemberSignatureMismatch4(methodName, diff, signature, str), csenv.m);
              }
            }
          } else {
            return new _Error(SR.csMemberSignatureMismatchArityNamed(methodName, nReqd + nReqdNamed, nActual, nReqdNamed, signature), csenv.m);
          }
        }

      case 4:
        const $var74 = matchValue[0][0].tail != null ? (cmeths2 = matchValue[0][0].tail, cmeth_6 = matchValue[0][0].head, !cmeth_6.HasCorrectArity ? forAll(function (cmeth2) {
          return cmeth_6.TotalNumUnnamedCalledArgs === cmeth2.TotalNumUnnamedCalledArgs;
        }, cmeths2) : false) ? [0, matchValue[0][0].head, matchValue[0][0].tail] : [1] : [1];

        switch ($var74[0]) {
          case 0:
            return new _Error(SR.csMemberNotAccessible(methodName, nUnnamedCallerArgs, methodName, $var74[1].TotalNumUnnamedCalledArgs), csenv.m);

          case 1:
            const $var75 = matchValue[3][0].tail == null ? matchValue[3][1].tail != null ? [0] : matchValue[2][0].tail == null ? matchValue[2][1].tail != null ? [1, matchValue[2][1].head] : [2] : [2] : matchValue[2][0].tail == null ? matchValue[2][1].tail != null ? [1, matchValue[2][1].head] : [2] : [2];

            switch ($var75[0]) {
              case 0:
                const cmeth_4 = matchValue[3][1].head;
                const msg = SR.csIncorrectGenericInstantiation(ShowAccessDomain(ad), methodName, cmeth_4.NumCallerTyArgs);
                return new _Error(msg, csenv.m);

              case 1:
                const minfo_3 = $var75[1].Method;
                return new _Error(SR.csMemberOverloadArityMismatch(methodName, $var75[1].TotalNumUnnamedCallerArgs, sum(minfo_3.NumArgs)), csenv.m);

              case 2:
                let msg_1;

                if (nNamedCallerArgs === 0) {
                  msg_1 = SR.csNoMemberTakesTheseArguments(ShowAccessDomain(ad), methodName, nUnnamedCallerArgs);
                } else {
                  const s = intersectMany(map(function (cmeth_5) {
                    return create(map(function (na) {
                      return na.Name;
                    }, cmeth_5.UnassignedNamedArgs), new Comparer(comparePrimitives));
                  }, calledMethGroup));

                  if (isEmpty(s, null)) {
                    msg_1 = SR.csNoMemberTakesTheseArguments2(ShowAccessDomain(ad), methodName, nUnnamedCallerArgs, nNamedCallerArgs);
                  } else {
                    const sample = minimumElement(s, null);
                    msg_1 = SR.csNoMemberTakesTheseArguments3(ShowAccessDomain(ad), methodName, nUnnamedCallerArgs, sample);
                  }
                }

                return new _Error(msg_1, csenv.m);
            }

        }

    }
  })());
}
export function ReportNoCandidatesErrorExpr(csenv, callerArgCounts_0, callerArgCounts_1, methodName, ad, calledMethGroup) {
  const callerArgCounts = [callerArgCounts_0, callerArgCounts_1];

  const isSequential = function (e) {
    if (e.tag === 2) {
      return true;
    } else {
      return false;
    }
  };

  return ReportNoCandidatesError(csenv, callerArgCounts[0], callerArgCounts[1], methodName, ad, calledMethGroup, isSequential);
}
export function ReportNoCandidatesErrorSynExpr(csenv, callerArgCounts_0, callerArgCounts_1, methodName, ad, calledMethGroup) {
  const callerArgCounts = [callerArgCounts_0, callerArgCounts_1];

  const isSequential = function (e) {
    if (e.tag === 26) {
      return true;
    } else {
      return false;
    }
  };

  return ReportNoCandidatesError(csenv, callerArgCounts[0], callerArgCounts[1], methodName, ad, calledMethGroup, isSequential);
}
export function ResolveOverloading(csenv, trace, methodName, ndeep, cx, callerArgCounts_0, callerArgCounts_1, ad, calledMethGroup, permitOptArgs, reqdRetTyOpt) {
  var calledMeth_2;
  const callerArgCounts = [callerArgCounts_0, callerArgCounts_1];
  const g = csenv.g;
  const amap = csenv.amap;
  const isOpConversion = methodName === "op_Explicit" ? true : methodName === "op_Implicit";
  const candidates = filter(function (cmeth) {
    return cmeth.IsCandidate(csenv.m, ad);
  }, calledMethGroup);
  let patternInput;
  const matchValue = [calledMethGroup, candidates];
  const $var76 = matchValue[1].tail != null ? matchValue[1].tail.tail == null ? (calledMeth_2 = matchValue[1].head, !isOpConversion) ? [0, matchValue[1].head] : [1] : [1] : [1];

  switch ($var76[0]) {
    case 0:
      patternInput = [$var76[1], CompleteD, new OptionalTrace(0)];
      break;

    case 1:
      const $var77 = matchValue[0].tail == null ? !isOpConversion ? [0] : [1] : [1];

      switch ($var77[0]) {
        case 0:
          patternInput = [null, ErrorD(new _Error(SR.csMethodNotFound(methodName), csenv.m)), new OptionalTrace(0)];
          break;

        case 1:
          const $var78 = matchValue[1].tail == null ? !isOpConversion ? [0] : [1] : [1];

          switch ($var78[0]) {
            case 0:
              patternInput = [null, ReportNoCandidatesErrorExpr(csenv, callerArgCounts[0], callerArgCounts[1], methodName, ad, calledMethGroup), new OptionalTrace(0)];
              break;

            case 1:
              const alwaysCheckReturn = isOpConversion ? true : exists(function (cmeth_1) {
                return cmeth_1.HasOutArgs;
              }, candidates);
              const matchValue_1 = FilterEachThenUndo(function (newTrace, calledMeth) {
                var trace_1;
                var isConstraint;
                const cxsln = defaultArg(cx, null, function (traitInfo) {
                  return [traitInfo, MemberConstraintSolutionOfMethInfo(csenv.SolverState, csenv.m, calledMeth.Method, calledMeth.CalledTyArgs)];
                });
                return CanMemberSigsMatchUpToCheck(csenv, permitOptArgs, alwaysCheckReturn, function (ty1, ty2) {
                  return MustUnifyInsideUndo(csenv, ndeep, newTrace, cxsln, ty1, ty2);
                }, (trace_1 = new OptionalTrace(1, newTrace), function (calledArgTy, callerArgTy) {
                  return TypesMustSubsumeOrConvertInsideUndo(csenv, ndeep, trace_1, cxsln, csenv.m, calledArgTy, callerArgTy);
                }), (isConstraint = CurriedLambda(() => cx != null)(), function (calledArg, arg30_) {
                  return ArgsEquivInsideUndo(csenv, isConstraint, calledArg, arg30_);
                }), reqdRetTyOpt, calledMeth);
              }, candidates);
              const $var79 = matchValue_1.tail != null ? matchValue_1.tail.tail == null ? [0, matchValue_1.head[0], matchValue_1.head[1]] : [1] : [1];

              switch ($var79[0]) {
                case 0:
                  patternInput = [$var79[1], new OperationResult(0, [$var79[2], null]), new OptionalTrace(0)];
                  break;

                case 1:
                  const applicable = FilterEachThenUndo(function (newTrace_1, candidate) {
                    var trace_2;
                    var isConstraint_1;
                    const cxsln_1 = defaultArg(cx, null, function (traitInfo_1) {
                      return [traitInfo_1, MemberConstraintSolutionOfMethInfo(csenv.SolverState, csenv.m, candidate.Method, candidate.CalledTyArgs)];
                    });
                    return CanMemberSigsMatchUpToCheck(csenv, permitOptArgs, alwaysCheckReturn, function (ty1_1, ty2_1) {
                      return MustUnifyInsideUndo(csenv, ndeep, newTrace_1, cxsln_1, ty1_1, ty2_1);
                    }, (trace_2 = new OptionalTrace(1, newTrace_1), function (calledArgTy_1, callerArgTy_1) {
                      return TypesMustSubsumeOrConvertInsideUndo(csenv, ndeep, trace_2, cxsln_1, csenv.m, calledArgTy_1, callerArgTy_1);
                    }), (isConstraint_1 = CurriedLambda(() => cx != null)(), function (calledArg_1, arg60_) {
                      return ArgsMustSubsumeOrConvertInsideUndo(csenv, ndeep, newTrace_1, cxsln_1, isConstraint_1, calledArg_1, arg60_);
                    }), reqdRetTyOpt, candidate);
                  }, candidates);

                  const failOverloading = function (msg, errors) {
                    let convOpData;

                    if (isOpConversion) {
                      const matchValue_2 = [calledMethGroup, reqdRetTyOpt];
                      const $var80 = matchValue_2[0].tail != null ? matchValue_2[1] != null ? [0, matchValue_2[0].head, getValue(matchValue_2[1])] : [1] : [1];

                      switch ($var80[0]) {
                        case 0:
                          convOpData = [$var80[1].Method.ApparentEnclosingType, $var80[2]];
                          break;

                        case 1:
                          convOpData = null;
                          break;
                      }
                    } else {
                      convOpData = null;
                    }

                    if (convOpData == null) {
                      const overloads = GetPossibleOverloads(amap, csenv.m, csenv.DisplayEnv, errors);
                      const msg_1 = overloads.tail == null ? msg : toText(printf("%s %s"))(msg, SR.csSeeAvailableOverloads());
                      return new UnresolvedOverloading(csenv.DisplayEnv, overloads, msg_1, csenv.m);
                    } else {
                      const toTy = getValue(convOpData)[1];
                      const fromTy = getValue(convOpData)[0];
                      return new UnresolvedConversionOperator(csenv.DisplayEnv, fromTy, toTy, csenv.m);
                    }
                  };

                  if (applicable.tail != null) {
                    if (applicable.tail.tail == null) {
                      patternInput = [applicable.head[0], new OperationResult(0, [applicable.head[1], null]), new OptionalTrace(1, applicable.head[2])];
                    } else {
                      const compareCond = function (p, x1, x2) {
                        return comparePrimitives(p(x1, x2), p(x2, x1)) | 0;
                      };

                      const compareTypes = function (ty1_2, ty2_2) {
                        return CurriedLambda(compareCond)(function (x1_1, x2_1) {
                          return TypeFeasiblySubsumesType(ndeep, csenv.g, csenv.amap, csenv.m, x2_1, new CanCoerce(0), x1_1);
                        })(ty1_2, ty2_2) | 0;
                      };

                      const compareArg = function (calledArg1, calledArg2) {
                        const c = compareTypes(calledArg1.CalledArgumentType, calledArg2.CalledArgumentType) | 0;

                        if (c !== 0) {
                          return c | 0;
                        } else {
                          const c_1 = CurriedLambda(compareCond)(function (ty1_3, ty2_3) {
                            var matchValue_4;
                            const matchValue_3 = tryDestAppTy(csenv.g, ty1_3);

                            if (matchValue_3 != null) {
                              if ((getValue(matchValue_3).DisplayName === "Func" ? (matchValue_4 = getValue(matchValue_3).PublicPath, matchValue_4 != null ? equals(getValue(matchValue_4).EnclosingPath, ["System"]) : false) : false) ? isDelegateTy(g, ty1_3) : false) {
                                return isDelegateTy(g, ty2_3);
                              } else {
                                return false;
                              }
                            } else {
                              return false;
                            }
                          })(calledArg1.CalledArgumentType, calledArg2.CalledArgumentType) | 0;

                          if (c_1 !== 0) {
                            return c_1 | 0;
                          } else {
                            return 0;
                          }
                        }
                      };

                      const better = function (tupledArg, tupledArg_1) {
                        var objArgTys1;
                        var objArgTys2;
                        const candidateWarnCount = tupledArg[1].length | 0;
                        const otherWarnCount = tupledArg_1[1].length | 0;
                        const c_2 = comparePrimitives(candidateWarnCount === 0, otherWarnCount === 0) | 0;

                        if (c_2 !== 0) {
                          return c_2 | 0;
                        } else {
                          const c_3 = comparePrimitives(!tupledArg[0].UsesParamArrayConversion, !tupledArg_1[0].UsesParamArrayConversion) | 0;

                          if (c_3 !== 0) {
                            return c_3 | 0;
                          } else {
                            const c_4 = ((tupledArg[0].UsesParamArrayConversion ? tupledArg_1[0].UsesParamArrayConversion : false) ? compareTypes(tupledArg[0].ParamArrayElementType, tupledArg_1[0].ParamArrayElementType) : 0) | 0;

                            if (c_4 !== 0) {
                              return c_4 | 0;
                            } else {
                              const c_5 = comparePrimitives(!tupledArg[0].HasOutArgs, !tupledArg_1[0].HasOutArgs) | 0;

                              if (c_5 !== 0) {
                                return c_5 | 0;
                              } else {
                                const c_6 = comparePrimitives(!tupledArg[0].HasOptArgs, !tupledArg_1[0].HasOptArgs) | 0;

                                if (c_6 !== 0) {
                                  return c_6 | 0;
                                } else {
                                  let c_7;

                                  if (tupledArg[0].TotalNumUnnamedCalledArgs === tupledArg_1[0].TotalNumUnnamedCalledArgs) {
                                    const cs = append((tupledArg[0].Method.IsExtensionMember ? tupledArg_1[0].Method.IsExtensionMember : false) ? (objArgTys1 = tupledArg[0].CalledObjArgTys(csenv.m), objArgTys2 = tupledArg_1[0].CalledObjArgTys(csenv.m), objArgTys1.length === objArgTys2.length ? toList(map2(compareTypes, objArgTys1, objArgTys2)) : new List()) : new List(), function (list1, list2) {
                                      return toList(map2(compareArg, list1, list2));
                                    }(tupledArg[0].AllUnnamedCalledArgs, tupledArg_1[0].AllUnnamedCalledArgs));

                                    if (forAll(function (x) {
                                      return x >= 0;
                                    }, cs) ? exists(function (x_1) {
                                      return x_1 > 0;
                                    }, cs) : false) {
                                      c_7 = 1;
                                    } else if (forAll(function (x_2) {
                                      return x_2 <= 0;
                                    }, cs) ? exists(function (x_3) {
                                      return x_3 < 0;
                                    }, cs) : false) {
                                      c_7 = -1 | 0;
                                    } else {
                                      c_7 = 0;
                                    }
                                  } else {
                                    c_7 = 0;
                                  }

                                  if (c_7 !== 0) {
                                    return c_7 | 0;
                                  } else {
                                    const c_8 = comparePrimitives(!tupledArg[0].Method.IsExtensionMember, !tupledArg_1[0].Method.IsExtensionMember) | 0;

                                    if (c_8 !== 0) {
                                      return c_8 | 0;
                                    } else {
                                      const c_9 = ((tupledArg[0].Method.IsExtensionMember ? tupledArg_1[0].Method.IsExtensionMember : false) ? tupledArg[0].Method.ExtensionMemberPriority.CompareTo(tupledArg_1[0].Method.ExtensionMemberPriority) : 0) | 0;

                                      if (c_9 !== 0) {
                                        return c_9 | 0;
                                      } else {
                                        const c_10 = comparePrimitives(tupledArg[0].CalledTyArgs.tail == null, tupledArg_1[0].CalledTyArgs.tail == null) | 0;

                                        if (c_10 !== 0) {
                                          return c_10 | 0;
                                        } else {
                                          return 0;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      };

                      let bestMethods;
                      const indexedApplicableMeths = Microsoft.FSharp.Collections.List.indexed(applicable);
                      bestMethods = choose(function (tupledArg_2) {
                        return forAll(function (tupledArg_3) {
                          if (tupledArg_2[0] === tupledArg_3[0]) {
                            return true;
                          } else {
                            const res = better(tupledArg_2[1], tupledArg_3[1]) | 0;
                            return res > 0;
                          }
                        }, indexedApplicableMeths) ? tupledArg_2[1] : null;
                      }, indexedApplicableMeths);
                      const $var81 = bestMethods.tail != null ? bestMethods.tail.tail == null ? [0, bestMethods.head[0], bestMethods.head[2], bestMethods.head[1]] : [1, bestMethods] : [1, bestMethods];

                      switch ($var81[0]) {
                        case 0:
                          patternInput = [$var81[1], new OperationResult(0, [$var81[3], null]), new OptionalTrace(1, $var81[2])];
                          break;

                        case 1:
                          let methodNames;
                          const methods = $var81[1].tail == null ? applicable.tail == null ? candidates : map(function (tupledArg_4) {
                            return tupledArg_4[0];
                          }, applicable) : map(function (tupledArg_5) {
                            return tupledArg_5[0];
                          }, $var81[1]);
                          methodNames = toList(sortWith(($var82, $var83) => compare($var82, $var83), map(function (cmeth_2) {
                            return stringOfMethInfo(amap, csenv.m, csenv.DisplayEnv, cmeth_2.Method);
                          }, methods)));
                          const msg_2 = SR.csMethodIsOverloaded(methodName);
                          const msg_3 = methodNames.tail == null ? msg_2 : toText(printf("%s %s"))(msg_2, SR.csCandidates(join(", ", methodNames)));
                          patternInput = [null, ErrorD(failOverloading(msg_3, new List())), new OptionalTrace(0)];
                          break;
                      }
                    }
                  } else {
                    const errors_1 = choose(function (calledMeth_1) {
                      const matchValue_5 = CollectThenUndo(function (newTrace_2) {
                        var trace_3;
                        var isConstraint_2;
                        const cxsln_2 = defaultArg(cx, null, function (traitInfo_2) {
                          return [traitInfo_2, MemberConstraintSolutionOfMethInfo(csenv.SolverState, csenv.m, calledMeth_1.Method, calledMeth_1.CalledTyArgs)];
                        });
                        return CanMemberSigsMatchUpToCheck(csenv, permitOptArgs, alwaysCheckReturn, function (ty1_4, ty2_4) {
                          return MustUnifyInsideUndo(csenv, ndeep, newTrace_2, cxsln_2, ty1_4, ty2_4);
                        }, (trace_3 = new OptionalTrace(1, newTrace_2), function (calledArgTy_2, callerArgTy_2) {
                          return TypesMustSubsumeOrConvertInsideUndo(csenv, ndeep, trace_3, cxsln_2, csenv.m, calledArgTy_2, callerArgTy_2);
                        }), (isConstraint_2 = CurriedLambda(() => cx != null)(), function (calledArg_2, arg60__1) {
                          return ArgsMustSubsumeOrConvertInsideUndo(csenv, ndeep, newTrace_2, cxsln_2, isConstraint_2, calledArg_2, arg60__1);
                        }), reqdRetTyOpt, calledMeth_1);
                      });

                      if (matchValue_5.tag === 1) {
                        return [calledMeth_1, matchValue_5.data[1]];
                      } else {
                        return null;
                      }
                    }, candidates);
                    patternInput = [null, ErrorD(failOverloading(SR.csNoOverloadsFound(methodName), errors_1)), new OptionalTrace(0)];
                  }

                  break;
              }

              break;
          }

          break;
      }

      break;
  }

  if (patternInput[0] == null) {
    return [null, patternInput[1]];
  } else {
    return [patternInput[0], op_PlusPlus(patternInput[1], function () {
      var isConstraint_3;
      const cxsln_3 = defaultArg(cx, null, function (traitInfo_3) {
        return [traitInfo_3, MemberConstraintSolutionOfMethInfo(csenv.SolverState, csenv.m, getValue(patternInput[0]).Method, getValue(patternInput[0]).CalledTyArgs)];
      });

      if (patternInput[2].tag === 1) {
        trace.AddFromReplay(patternInput[2].data);

        if (reqdRetTyOpt != null) {
          if (getValue(patternInput[0]).Method.IsConstructor) {
            return CompleteD;
          } else if (reqdRetTyOpt != null) {
            let methodRetTy;

            if (getValue(patternInput[0]).UnnamedCalledOutArgs.tail == null) {
              methodRetTy = getValue(patternInput[0]).ReturnType;
            } else {
              const outArgTys = map(function (calledArg_3) {
                return destByrefTy(g, calledArg_3.CalledArgumentType);
              }, getValue(patternInput[0]).UnnamedCalledOutArgs);

              if (isUnitTy(g, getValue(patternInput[0]).ReturnType)) {
                methodRetTy = mkRefTupledTy(g, outArgTys);
              } else {
                methodRetTy = mkRefTupledTy(g, new List(getValue(patternInput[0]).ReturnType, outArgTys));
              }
            }

            return MustUnify(csenv, ndeep, trace, cxsln_3, getValue(reqdRetTyOpt), methodRetTy);
          } else {
            throw new Error("C:/projects/fcs/src/fsharp/ConstraintSolver.fs", 2443, 34);
          }
        } else {
          return CompleteD;
        }
      } else {
        return CanMemberSigsMatchUpToCheck(csenv, permitOptArgs, true, function (ty1_5, ty2_5) {
          return MustUnify(csenv, ndeep, trace, cxsln_3, ty1_5, ty2_5);
        }, function (calledArgTy_3, callerArgTy_3) {
          return TypesMustSubsumeOrConvertInsideUndo(csenv, ndeep, trace, cxsln_3, csenv.m, calledArgTy_3, callerArgTy_3);
        }, (isConstraint_3 = CurriedLambda(() => cx != null)(), function (calledArg_4, callerArg) {
          return ArgsMustSubsumeOrConvert(csenv, ndeep, trace, cxsln_3, isConstraint_3, calledArg_4, callerArg);
        }), reqdRetTyOpt, getValue(patternInput[0]));
      }
    })];
  }
}
export function UnifyUniqueOverloading(csenv, callerArgCounts_0, callerArgCounts_1, methodName, ad, calledMethGroup, reqdRetTy) {
  var trace;
  var cxsln;
  var trace_1;
  var cxsln_1;
  var trace_2;
  var cxsln_2;
  const callerArgCounts = [callerArgCounts_0, callerArgCounts_1];
  const candidates = filter(function (cmeth) {
    return cmeth.IsCandidate(csenv.m, ad);
  }, calledMethGroup);
  const matchValue = [calledMethGroup, candidates];
  const $var84 = matchValue[1].tail == null ? matchValue[0].tail == null ? [1] : [2] : matchValue[1].tail.tail == null ? [0, matchValue[1].head] : matchValue[0].tail == null ? [1] : [3];

  switch ($var84[0]) {
    case 0:
      return op_PlusPlus(CanMemberSigsMatchUpToCheck(csenv, true, true, (trace = new OptionalTrace(0), cxsln = null, function (ty1, ty2) {
        return MustUnify(csenv, 0, trace, cxsln, ty1, ty2);
      }), (trace_1 = new OptionalTrace(0), cxsln_1 = null, function (calledArgTy, callerArgTy) {
        return TypesMustSubsumeOrConvertInsideUndo(csenv, 0, trace_1, cxsln_1, csenv.m, calledArgTy, callerArgTy);
      }), (trace_2 = new OptionalTrace(0), cxsln_2 = null, function (calledArg, callerArg) {
        return ArgsMustSubsumeOrConvert(csenv, 0, trace_2, cxsln_2, false, calledArg, callerArg);
      }), reqdRetTy, $var84[1]), function () {
        return ResultD(true);
      });

    case 1:
      return ErrorD(new _Error(SR.csMethodNotFound(methodName), csenv.m));

    case 2:
      return op_PlusPlus(ReportNoCandidatesErrorSynExpr(csenv, callerArgCounts[0], callerArgCounts[1], methodName, ad, calledMethGroup), function () {
        return ResultD(false);
      });

    case 3:
      return ResultD(false);
  }
}
export function EliminateConstraintsForGeneralizedTypars(csenv, trace, generalizedTypars) {
  iterate(function (tp) {
    const tpn = tp.Stamp;
    const cxst = csenv.SolverState.ExtraCxs;
    const cxs = cxst.FindAll(tpn);
    iterate(function (cx) {
      (function (arg00, arg10) {
        trace.Exec(arg00, arg10);
      })(function () {
        cxst.Remove_0(tpn);
      }, function () {
        csenv.SolverState.ExtraCxs.Add_0(tpn, cx);
      });
    }, cxs);
  }, generalizedTypars);
}
export function AddCxTypeEqualsType(contextInfo, denv, css, m, ty1, ty2) {
  RaiseOperationResult(SolveTypEqualsTypWithReport(MakeConstraintSolverEnv(contextInfo, css, m, denv), 0, m, new OptionalTrace(0), null, ty1, ty2));
}
export function UndoIfFailed(f) {
  const trace = Trace.New();
  let res;

  try {
    res = CheckNoErrorsAndGetWarnings(f(trace));
  } catch (e) {
    res = null;
  }

  if (res != null) {
    ReportWarnings(getValue(res));
    return true;
  } else {
    trace.Undo();
    return false;
  }
}
export function AddCxTypeEqualsTypeUndoIfFailed(denv, css, m, ty1, ty2) {
  return UndoIfFailed(function (trace) {
    return SolveTypEqualsTypKeepAbbrevs(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, new OptionalTrace(1, trace), ty1, ty2);
  });
}
export function AddCxTypeEqualsTypeMatchingOnlyUndoIfFailed(denv, css, m, ty1, ty2) {
  let csenv;
  const inputRecord = MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv);
  csenv = new ConstraintSolverEnv(inputRecord.SolverState, inputRecord.eContextInfo, true, inputRecord.m, inputRecord.EquivEnv, inputRecord.DisplayEnv);
  return UndoIfFailed(function (trace) {
    return SolveTypEqualsTypKeepAbbrevs(csenv, 0, m, new OptionalTrace(1, trace), ty1, ty2);
  });
}
export function AddCxTypeMustSubsumeTypeUndoIfFailed(denv, css, m, ty1, ty2) {
  return UndoIfFailed(function (trace) {
    return SolveTypSubsumesTypKeepAbbrevs(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, new OptionalTrace(1, trace), null, ty1, ty2);
  });
}
export function AddCxTypeMustSubsumeTypeMatchingOnlyUndoIfFailed(denv, css, m, ty1, ty2) {
  const csenv = MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv);
  const csenv_1 = new ConstraintSolverEnv(csenv.SolverState, csenv.eContextInfo, true, csenv.m, csenv.EquivEnv, csenv.DisplayEnv);
  return UndoIfFailed(function (trace) {
    return SolveTypSubsumesTypKeepAbbrevs(csenv_1, 0, m, new OptionalTrace(1, trace), null, ty1, ty2);
  });
}
export function AddCxTypeMustSubsumeType(contextInfo, denv, css, m, trace, ty1, ty2) {
  RaiseOperationResult(SolveTypSubsumesTypWithReport(MakeConstraintSolverEnv(contextInfo, css, m, denv), 0, m, trace, null, ty1, ty2));
}
export function AddCxMethodConstraint(denv, css, m, trace, traitInfo) {
  RaiseOperationResult(TryD(function () {
    return op_PlusPlus(SolveMemberConstraint(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), true, false, 0, m, trace, traitInfo), function (_arg1) {
      return CompleteD;
    });
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeMustSupportNull(denv, css, m, trace, ty) {
  RaiseOperationResult(TryD(function () {
    return SolveTypSupportsNull(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeMustSupportComparison(denv, css, m, trace, ty) {
  RaiseOperationResult(TryD(function () {
    return SolveTypeSupportsComparison(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeMustSupportEquality(denv, css, m, trace, ty) {
  RaiseOperationResult(TryD(function () {
    return SolveTypSupportsEquality(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeMustSupportDefaultCtor(denv, css, m, trace, ty) {
  RaiseOperationResult(TryD(function () {
    return SolveTypRequiresDefaultConstructor(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeIsReferenceType(denv, css, m, trace, ty) {
  RaiseOperationResult(TryD(function () {
    return SolveTypIsReferenceType(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeIsValueType(denv, css, m, trace, ty) {
  RaiseOperationResult(TryD(function () {
    return SolveTypIsNonNullableValueType(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeIsUnmanaged(denv, css, m, trace, ty) {
  RaiseOperationResult(TryD(function () {
    return SolveTypIsUnmanaged(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeIsEnum(denv, css, m, trace, ty, underlying) {
  RaiseOperationResult(TryD(function () {
    return SolveTypIsEnum(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty, underlying);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function AddCxTypeIsDelegate(denv, css, m, trace, ty, aty, bty) {
  RaiseOperationResult(TryD(function () {
    return SolveTypIsDelegate(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, trace, ty, aty, bty);
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function CodegenWitnessThatTypSupportsTraitConstraint(tcVal, g, amap, m, traitInfo, argExprs) {
  let css;
  const ExtraCxs = HashMultiMap[".ctor"](10, {
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

  });
  css = new ConstraintSolverState(g, amap, new InfoReader(g, amap), tcVal, ExtraCxs);
  const csenv = MakeConstraintSolverEnv(new ContextInfo(0), css, m, DisplayEnv.Empty(g));
  return op_PlusPlus(SolveMemberConstraint(csenv, true, true, 0, m, new OptionalTrace(0), traitInfo), function (_res) {
    let sln;
    const matchValue = traitInfo.Solution;

    if (matchValue != null) {
      switch (getValue(matchValue).tag) {
        case 0:
          sln = new Choice(0, [new MethInfo(0, [g, getValue(matchValue).data[0], getValue(matchValue).data[1], null]), getValue(matchValue).data[2]]);
          break;

        case 1:
          sln = new Choice(1, [getValue(matchValue).data[0], getValue(matchValue).data[1], getValue(matchValue).data[2]]);
          break;

        case 4:
          sln = new Choice(3, null);
          break;

        case 3:
          sln = new Choice(2, getValue(matchValue).data);
          break;

        default:
          const metadataTy = helpEnsureTypeHasMetadata(g, getValue(matchValue).data[0]);
          const patternInput = destAppTy(g, metadataTy);
          const mdef = resolveILMethodRef(patternInput[0].ILTyconRawMetadata, getValue(matchValue).data[2]);
          let ilMethInfo;

          if (getValue(matchValue).data[1] != null) {
            const actualTyconRef = ImportILTypeRef(amap, m, getValue(getValue(matchValue).data[1]));
            ilMethInfo = MethInfo.CreateILExtensionMeth(amap, m, getValue(matchValue).data[0], actualTyconRef, null, mdef);
          } else {
            ilMethInfo = MethInfo.CreateILMeth(amap, m, getValue(matchValue).data[0], mdef);
          }

          sln = new Choice(0, [ilMethInfo, getValue(matchValue).data[3]]);
      }
    } else {
      sln = new Choice(3, null);
    }

    if (sln.tag === 1) {
      const tinst = sln.data[0];
      const rfref = sln.data[1];
      const isSet = sln.data[2];
      let res;
      const matchValue_1 = [isSet, rfref.RecdField.IsStatic, argExprs.length];
      const $var85 = matchValue_1[0] ? matchValue_1[1] ? matchValue_1[2] === 1 ? [0] : [4] : matchValue_1[2] === 2 ? [1] : [4] : matchValue_1[1] ? matchValue_1[2] === 0 ? [2] : [4] : matchValue_1[2] === 1 ? [3] : [4];

      switch ($var85[0]) {
        case 0:
          res = mkStaticRecdFieldSet(rfref, tinst, item(0, argExprs), m);
          break;

        case 1:
          if (rfref.Tycon.IsStructOrEnumTycon ? !isByrefTy(g, tyOfExpr(g, item(0, argExprs))) : false) {
            const h = argExprs.head;
            const patternInput_1 = mkExprAddrOfExpr(g, true, false, new Mutates(0), h, null, m);
            res = patternInput_1[0](mkRecdFieldSetViaExprAddr(patternInput_1[1], rfref, tinst, item(1, argExprs), m));
          } else {
            res = mkRecdFieldSetViaExprAddr(item(0, argExprs), rfref, tinst, item(1, argExprs), m);
          }

          break;

        case 2:
          res = mkStaticRecdFieldGet(rfref, tinst, m);
          break;

        case 3:
          if (rfref.Tycon.IsStructOrEnumTycon ? isByrefTy(g, tyOfExpr(g, item(0, argExprs))) : false) {
            res = mkRecdFieldGetViaExprAddr(item(0, argExprs), rfref, tinst, m);
          } else {
            res = mkRecdFieldGet(g, item(0, argExprs), rfref, tinst, m);
          }

          break;

        case 4:
          res = null;
          break;
      }

      return ResultD(res);
    } else if (sln.tag === 2) {
      return ResultD(MakeApplicationAndBetaReduce(g, sln.data, tyOfExpr(g, sln.data), new List(), argExprs, m));
    } else if (sln.tag === 3) {
      return ResultD(null);
    } else {
      const minfo = sln.data[0];
      const methArgTys = sln.data[1];
      let argExprs_1;
      const argTypes = concat(minfo.GetParamTypes(amap, m, methArgTys));
      const patternInput_2 = minfo.IsInstance ? argExprs.tail != null ? [argExprs.head, argExprs.tail] : [null, argExprs] : [null, argExprs];
      const convertedArgs = toList(map2(function (expr, expectedTy) {
        return mkCoerceIfNeeded(g, expectedTy, tyOfExpr(g, expr), expr);
      }, patternInput_2[1], argTypes));

      if (patternInput_2[0] == null) {
        argExprs_1 = convertedArgs;
      } else {
        argExprs_1 = new List(getValue(patternInput_2[0]), convertedArgs);
      }

      if ((minfo.IsStruct ? minfo.IsInstance : false) ? argExprs_1.tail != null ? !isByrefTy(g, tyOfExpr(g, argExprs_1.head)) : false : false) {
        const patternInput_3 = List_1.headAndTail(argExprs_1);
        const patternInput_4 = mkExprAddrOfExpr(g, true, false, new Mutates(1), patternInput_3[0], null, m);
        return ResultD(patternInput_4[0](new Expr(11, [new TOp(29, traitInfo), new List(), new List(patternInput_4[1], patternInput_3[1]), m])));
      } else {
        return ResultD(MakeMethInfoCall(amap, m, minfo, methArgTys, argExprs_1));
      }
    }
  });
}
export function ChooseTyparSolutionAndSolve(css, denv, tp) {
  const patternInput = ChooseTyparSolutionAndRange(css.g, css.amap, tp);
  const csenv = MakeConstraintSolverEnv(new ContextInfo(0), css, patternInput[1], denv);
  RaiseOperationResult(TryD(function () {
    return SolveTyparEqualsTyp(csenv, 0, patternInput[1], new OptionalTrace(0), mkTyparTy(tp), patternInput[0]);
  }, function (err) {
    return ErrorD(new ErrorFromApplyingDefault(css.g, denv, tp, patternInput[0], err, patternInput[1]));
  }));
}
export function CheckDeclaredTypars(denv, css, m, typars1, typars2) {
  RaiseOperationResult(TryD(function () {
    return CollectThenUndo(function (trace) {
      return SolveTypEqualsTypEqns(MakeConstraintSolverEnv(new ContextInfo(0), css, m, denv), 0, m, new OptionalTrace(1, trace), null, map(function (tp) {
        return mkTyparTy(tp);
      }, typars1), map(function (tp_1) {
        return mkTyparTy(tp_1);
      }, typars2));
    });
  }, function (res) {
    return ErrorD(new ErrorFromAddingConstraint(denv, res, m));
  }));
}
export function IsApplicableMethApprox(g, amap, m, minfo, availObjTy) {
  if (minfo.IsExtensionMember) {
    let css;
    const TcVal = CurriedLambda(function (_arg1) {
      throw new Error("should not be called");
    });
    const ExtraCxs = HashMultiMap[".ctor"](10, {
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

    });
    css = new ConstraintSolverState(g, amap, new InfoReader(g, amap), TcVal, ExtraCxs);
    const csenv = MakeConstraintSolverEnv(new ContextInfo(0), css, m, DisplayEnv.Empty(g));
    const minst = FreshenMethInfo(m, minfo);
    const matchValue = minfo.GetObjArgTypes(amap, m, minst);
    const $var86 = matchValue.tail != null ? matchValue.tail.tail == null ? [0, matchValue.head] : [1] : [1];

    switch ($var86[0]) {
      case 0:
        return CommitOperationResult(TryD(function () {
          return op_PlusPlus(SolveTypSubsumesTyp(csenv, 0, m, new OptionalTrace(0), null, $var86[1], availObjTy), function () {
            return ResultD(true);
          });
        }, function (_err) {
          return ResultD(false);
        }));

      case 1:
        return true;
    }
  } else {
    return true;
  }
}