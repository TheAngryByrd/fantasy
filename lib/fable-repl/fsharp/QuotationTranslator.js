import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equalsRecords, Tuple, makeGeneric, Array as _Array, comparePrimitives } from "../fable-core/Util";
import { ValRefForIntrinsic, TcGlobals } from "./TcGlobals";
import { ImportMap } from "./import";
import { mkLocalValRef, typarEq, TOp, Const, arityOfVal, ValBaseOrThisInfo, newUnique, Binding, TType, mkTyparTy, Expr, Typar, CcuThunk } from "./tast";
import { ILScopeRef, ILTypeRef } from "../absil/il";
import { range } from "./range";
import { tryGetValue, tryFind, add, create } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { tryFindIndex, map, toList } from "../utils/ResizeArray";
import { GetTypeOfMemberInMemberForm, isRefTy, TryEliminateDesugaredConstants, evalTupInfoIsStruct, mkCompiledTupleTy, rankOfArrayTyconRef, isArrayTyconRef, stripTyEqnsAndMeasureEqns, ComputeFieldName, exprForValRef, mkCallLiftValueWithName, mkCallUnbox, mkCallArray4DGet, mkCallArray3DGet, mkCallArray2DGet, mkUInt16, mkByte, mkCallSubtractionOperator, mkCallArrayLength, IsCompiledAsStaticProperty, mkReraiseLibCall, typeEquiv, generalizedTyconRef, stripExnEqns, useGenuineField, recdFieldsOfExnDefRef, mkAppTy, mkCallRaise, mkCallEqualsOperator, mkAnyTupledTy, returnTyOfMethod, GetFSharpViewOfReturnType, mkLambdas, isDelegateTy, tcrefOfAppTy, tyconRefEq, MultiLambdaToTupledLambda, valsOfBinds, primMkApp, applyForallTy, MakeApplicationAndBetaReduce, AdjustValForExpectedArity, tryDestRefTupleExpr, GetTopValTypeInCompiledForm, GetTypeOfIntrinsicMemberInCompiledForm, GetMemberCallInfo, CollectTyparsAndLocalsNoCaching, freeInExpr, NormalizeAndAdjustPossibleSubsumptionExprs, OptimizeForExpressionOptions, DetectAndOptimizeForExpression, Expr$2E$get_Range as Expr_get_Range, mkInt, mkString, mkRefTupled, isUnitTy, valRefEq, mkCallArrayGet, tyOfExpr, $7C$InnerExprPat$7C$ as _InnerExprPat_, stripExpr, ValMap } from "./TastOps";
import Long from "../fable-core/Long";
import Comparer from "../fable-core/Comparer";
import { foldBack, foldBack2, item, zip, map2, toList as toList_1, exists2, tryPick, fold } from "../fable-core/Seq";
import { reverse, filter, concat, ofArray, map as map_1, append } from "../fable-core/List";
import List from "../fable-core/List";
import { getValue, makeSome } from "../fable-core/Option";
import { ChopPropertyName, IsCompilerGeneratedName } from "./PrettyNaming";
import { ModuleDefnData, MethodBaseData, NamedTypeData, mkUnionCaseTagTest, mkTypeTest, mkCond, mkDefaultValue, mkNull, mkUnit, mkChar, mkString as mkString_1, mkSingle, mkDouble, mkUInt64, mkInt64, mkUInt32, mkInt32, mkUInt16 as mkUInt16_1, mkInt16, mkByte as mkByte_1, mkSByte, mkBool, mkVarTy, mkFunTy, mkILNamedTy, mkArrayTy, freshVar, mkThisVar, mkVar, mkModuleValueApp, mkMethodCall, MethodData, mkRecdGet, mkUnionFieldGet, mkFieldGet, mkTryWith, mkTryFinally, mkForLoop, mkWhileLoop, mkNewArray, mkVarSet, mkAddressSet, mkAddressOf, mkPropGet, mkPropSet, mkRecdSet, mkCoerce, CtorData, mkCtorCall, mkFieldSet, mkTupleGet, mkRecdMk, mkTuple, mkUnion, mkDelegate, mkQuote, mkQuoteRaw40, mkLambda, mkLetRec, mkLet, mkSequential, mkApp, mkHole, mkAttributedExpression, isAttributedExpression } from "./QuotationPickler";
import { error, InternalError, Error as _Error, errorR } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import { dprintfn } from "../absil/ildiag";
import { toText, startsWith, printf } from "../fable-core/String";
import { List as List_1 } from "../absil/illib";
import { ChooseTyparSolutionsForFreeChoiceTypars } from "./TypeRelations";
import { map as map_2 } from "../fable-core/Array";
import { MemberKind } from "./ast";
export const verboseCReflect = false;
export class IsReflectedDefinition {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationTranslator.IsReflectedDefinition",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Yes"], ["No"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.QuotationTranslator.IsReflectedDefinition", IsReflectedDefinition);
export class QuotationSerializationFormat {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationTranslator.QuotationSerializationFormat",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["FSharp_40_Plus"], ["FSharp_20_Plus"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.QuotationTranslator.QuotationSerializationFormat", QuotationSerializationFormat);
export class QuotationGenerationScope {
  constructor(g, amap, scope, referencedTypeDefs, referencedTypeDefsTable, typeSplices, exprSplices, isReflectedDefinition, quotationFormat, emitDebugInfoInQuotations) {
    this.g = g;
    this.amap = amap;
    this.scope = scope;
    this.referencedTypeDefs = referencedTypeDefs;
    this.referencedTypeDefsTable = referencedTypeDefsTable;
    this.typeSplices = typeSplices;
    this.exprSplices = exprSplices;
    this.isReflectedDefinition = isReflectedDefinition;
    this.quotationFormat = quotationFormat;
    this.emitDebugInfoInQuotations = emitDebugInfoInQuotations;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationTranslator.QuotationGenerationScope",
      interfaces: ["FSharpRecord"],
      properties: {
        g: TcGlobals,
        amap: ImportMap,
        scope: CcuThunk,
        referencedTypeDefs: _Array(ILTypeRef),
        referencedTypeDefsTable: makeGeneric(Map, {
          TKey: ILTypeRef,
          TValue: "number"
        }),
        typeSplices: _Array(Tuple([Typar, range])),
        exprSplices: _Array(Tuple([Expr, range])),
        isReflectedDefinition: IsReflectedDefinition,
        quotationFormat: QuotationSerializationFormat,
        emitDebugInfoInQuotations: "boolean"
      }
    };
  }

  static Create(g, amap, scope, isReflectedDefinition) {
    return new QuotationGenerationScope(g, amap, scope, [], create(), [], [], isReflectedDefinition, QuotationGenerationScope.ComputeQuotationFormat(g), g.emitDebugInfoInQuotations);
  }

  Close() {
    return [toList(this.referencedTypeDefs), toList(map(tupledArg => [mkTyparTy(tupledArg[0]), tupledArg[1]], this.typeSplices)), toList(this.exprSplices)];
  }

  static ComputeQuotationFormat(g) {
    var copyOfStruct;
    const deserializeExValRef = ValRefForIntrinsic(g.deserialize_quoted_FSharp_40_plus_info);

    if (copyOfStruct = deserializeExValRef.TryDeref, copyOfStruct.IsSome) {
      return new QuotationSerializationFormat(0);
    } else {
      return new QuotationSerializationFormat(1);
    }
  }

}
setType("Microsoft.FSharp.Compiler.QuotationTranslator.QuotationGenerationScope", QuotationGenerationScope);
export class QuotationTranslationEnv {
  constructor(vs, nvs, tyvs, isinstVals, substVals) {
    this.vs = vs;
    this.nvs = nvs | 0;
    this.tyvs = tyvs;
    this.isinstVals = isinstVals;
    this.substVals = substVals;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationTranslator.QuotationTranslationEnv",
      interfaces: ["FSharpRecord"],
      properties: {
        vs: makeGeneric(ValMap, {
          T: "number"
        }),
        nvs: "number",
        tyvs: makeGeneric(_Map, {
          Key: Long,
          Value: "number"
        }),
        isinstVals: makeGeneric(ValMap, {
          T: Tuple([TType, Expr])
        }),
        substVals: makeGeneric(ValMap, {
          T: Expr
        })
      }
    };
  }

  static get Empty() {
    return new QuotationTranslationEnv(ValMap.Empty, 0, create(null, new Comparer((x, y) => x.CompareTo(y))), ValMap.Empty, ValMap.Empty);
  }

  BindTypar(v) {
    const idx = this.tyvs.size | 0;
    const tyvs = add(v.Stamp, idx, this.tyvs);
    return new QuotationTranslationEnv(this.vs, this.nvs, tyvs, this.isinstVals, this.substVals);
  }

  BindTypars(vs) {
    return fold((env, v) => env.BindTypar(v), this, vs);
  }

}
setType("Microsoft.FSharp.Compiler.QuotationTranslator.QuotationTranslationEnv", QuotationTranslationEnv);
export function BindFormalTypars(env, vs) {
  var tyvs;
  return (tyvs = create(null, new Comparer((x, y) => x.CompareTo(y))), new QuotationTranslationEnv(env.vs, env.nvs, tyvs, env.isinstVals, env.substVals)).BindTypars(vs);
}
export function BindVal(env, v) {
  return new QuotationTranslationEnv(function (arg00, arg10) {
    return env.vs.Add(arg00, arg10);
  }(v, env.nvs), env.nvs + 1, env.tyvs, env.isinstVals, env.substVals);
}
export function BindIsInstVal(env, v, ty, e) {
  const isinstVals = function (arg00, arg10) {
    return env.isinstVals.Add(arg00, arg10);
  }(v, [ty, e]);

  return new QuotationTranslationEnv(env.vs, env.nvs, env.tyvs, isinstVals, env.substVals);
}
export function BindSubstVal(env, v, e) {
  const substVals = function (arg00, arg10) {
    return env.substVals.Add(arg00, arg10);
  }(v, e);

  return new QuotationTranslationEnv(env.vs, env.nvs, env.tyvs, env.isinstVals, substVals);
}
export function BindVals(env, vs) {
  return fold(function (env_1, v) {
    return BindVal(env_1, v);
  }, env, vs);
}
export function BindFlatVals(env, vs) {
  return fold(function (env_1, v) {
    return BindVal(env_1, v);
  }, env, vs);
}
export class InvalidQuotedTerm extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, InvalidQuotedTerm.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationTranslator.InvalidQuotedTerm",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Error
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.QuotationTranslator.InvalidQuotedTerm", InvalidQuotedTerm);
export class IgnoringPartOfQuotedTermWarning extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, IgnoringPartOfQuotedTermWarning.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationTranslator.IgnoringPartOfQuotedTermWarning",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.QuotationTranslator.IgnoringPartOfQuotedTermWarning", IgnoringPartOfQuotedTermWarning);
export function wfail(e) {
  throw new InvalidQuotedTerm(e);
}

function _ModuleValueOrMemberUse___(g, expr) {
  const loop = function (expr_1, args) {
    var matchValue_1;

    loop: while (true) {
      const matchValue = stripExpr(expr_1);
      let $var1;

      if (matchValue.tag === 5) {
        const activePatternResult38953 = _InnerExprPat_(matchValue.data[0]);

        if (activePatternResult38953.tag === 1) {
          if (activePatternResult38953.data[0].IsMemberOrModuleBinding) {
            $var1 = [0, matchValue.data[4], matchValue.data[3], activePatternResult38953, matchValue.data[1], matchValue.data[2], activePatternResult38953.data[1], activePatternResult38953.data[0]];
          } else {
            $var1 = [1];
          }
        } else {
          $var1 = [1];
        }
      } else {
        $var1 = [1];
      }

      switch ($var1[0]) {
        case 0:
          return [$var1[7], $var1[6], $var1[3], $var1[4], $var1[5], append($var1[2], args)];

        case 1:
          const $var2 = matchValue.tag === 5 ? matchValue.data[2].tail == null ? [0, matchValue.data[1], matchValue.data[3], matchValue.data[0]] : [2] : matchValue.tag === 1 ? (matchValue_1 = matchValue.data[0].DeclaringEntity, matchValue_1.tag === 1 ? false : true) ? [1, matchValue.data[2], matchValue, matchValue.data[1], matchValue.data[0]] : [2] : [2];

          switch ($var2[0]) {
            case 0:
              expr_1 = $var2[3];
              args = append($var2[2], args);
              continue loop;

            case 1:
              const fty = tyOfExpr(g, $var2[2]);
              return [$var2[4], $var2[3], $var2[2], fty, new List(), args];

            case 2:
              return null;
          }

      }
    }
  };

  return loop(expr, new List());
}

export { _ModuleValueOrMemberUse___ as $7C$ModuleValueOrMemberUse$7C$_$7C$ };

function _SimpleArrayLoopUpperBound___(expr) {
  const $var3 = expr.tag === 11 ? expr.data[0].tag === 22 ? expr.data[0].data[0].tail != null ? expr.data[0].data[0].head.tag === 22 ? expr.data[0].data[0].tail.tail == null ? expr.data[2].tail != null ? expr.data[2].head.tag === 11 ? expr.data[2].head.data[0].tag === 22 ? expr.data[2].head.data[0].data[0].tail != null ? expr.data[2].head.data[0].data[0].head.tag === 84 ? expr.data[2].head.data[0].data[0].tail.tail != null ? expr.data[2].head.data[0].data[0].tail.head.tag === 11 ? expr.data[2].head.data[0].data[0].tail.head.data.tag === 5 ? expr.data[2].head.data[0].data[0].tail.tail.tail == null ? expr.data[2].tail.tail != null ? expr.data[2].tail.head.tag === 0 ? expr.data[2].tail.head.data[0].tag === 5 ? expr.data[2].tail.head.data[0].data === 1 ? expr.data[2].tail.tail.tail == null ? [0] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var3[0]) {
    case 0:
      return makeSome();

    case 1:
      return null;
  }
}

export { _SimpleArrayLoopUpperBound___ as $7C$SimpleArrayLoopUpperBound$7C$_$7C$ };

function _SimpleArrayLoopBody___(g, expr) {
  const $var4 = expr.tag === 3 ? expr.data[3].tail != null ? expr.data[3].tail.tail == null ? expr.data[4].tag === 7 ? expr.data[4].data[0].data[1].tag === 11 ? expr.data[4].data[0].data[1].data[0].tag === 22 ? expr.data[4].data[0].data[1].data[0].data[0].tail != null ? expr.data[4].data[0].data[1].data[0].data[0].head.tag === 81 ? expr.data[4].data[0].data[1].data[0].data[0].head.data[0].data.tail != null ? expr.data[4].data[0].data[1].data[0].data[0].head.data[0].data.head[0] != null ? getValue(expr.data[4].data[0].data[1].data[0].data[0].head.data[0].data.head[0]) === 0 ? expr.data[4].data[0].data[1].data[0].data[0].head.data[0].data.head[1] == null ? expr.data[4].data[0].data[1].data[0].data[0].head.data[0].data.tail.tail == null ? expr.data[4].data[0].data[1].data[0].data[0].tail.tail == null ? expr.data[4].data[0].data[1].data[1].tail != null ? expr.data[4].data[0].data[1].data[1].tail.tail == null ? expr.data[4].data[0].data[1].data[2].tail != null ? expr.data[4].data[0].data[1].data[2].tail.tail != null ? expr.data[4].data[0].data[1].data[2].tail.tail.tail == null ? [0, expr.data[1], expr.data[3], expr.data[4].data[0].data[1].data[2].head, expr.data[2], expr.data[4].data[1], expr.data[4].data[0].data[1].data[1].head, expr.data[4].data[0].data[0], expr.data[4].data[3], expr.data[4].data[0].data[1].data[2].tail.head, expr.data[5], expr.data[4].data[0].data[1].data[3], expr.data[4].data[2], expr.data[4].data[0].data[2], expr.data[6]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var4[0]) {
    case 0:
      const body = new Expr(7, [new Binding(0, [$var4[7], mkCallArrayGet(g, $var4[11], $var4[6], $var4[3], $var4[9]), $var4[13]]), $var4[5], $var4[12], $var4[8]]);
      const expr_1 = new Expr(3, [newUnique(), $var4[1], $var4[4], $var4[2], body, $var4[10], $var4[14]]);
      return [$var4[3], $var4[6], expr_1];

    case 1:
      return null;
  }
}

export { _SimpleArrayLoopBody___ as $7C$SimpleArrayLoopBody$7C$_$7C$ };

function _ObjectInitializationCheck___(g, expr) {
  var selfRef;
  var name;
  var failInitRef;
  const $var5 = expr.tag === 9 ? expr.data[2].tag === 0 ? expr.data[2].data[0].tag === 11 ? expr.data[2].data[0].data[0].tag === 22 ? expr.data[2].data[0].data[0].data[0].tail != null ? expr.data[2].data[0].data[0].data[0].head.tag === 9 ? expr.data[2].data[0].data[0].data[0].tail.tail == null ? expr.data[2].data[0].data[2].tail != null ? expr.data[2].data[0].data[2].head.tag === 11 ? expr.data[2].data[0].data[2].head.data[0].tag === 12 ? expr.data[2].data[0].data[2].head.data[2].tail != null ? expr.data[2].data[0].data[2].head.data[2].head.tag === 1 ? expr.data[2].data[0].data[2].head.data[2].head.data[1].tag === 1 ? expr.data[2].data[0].data[2].head.data[2].tail.tail == null ? expr.data[2].data[0].data[2].tail.tail != null ? expr.data[2].data[0].data[2].tail.head.tag === 0 ? expr.data[2].data[0].data[2].tail.head.data[0].tag === 5 ? expr.data[2].data[0].data[2].tail.head.data[0].data === 1 ? expr.data[2].data[0].data[2].tail.tail.tail == null ? expr.data[3].length === 2 ? expr.data[3][0].data[0].tail == null ? expr.data[3][0].data[1].tag === 5 ? expr.data[3][0].data[1].data[0].tag === 1 ? (selfRef = expr.data[2].data[0].data[2].head.data[2].head.data[0], name = expr.data[2].data[0].data[2].head.data[0].data.data[1], failInitRef = expr.data[3][0].data[1].data[0].data[0], (((IsCompilerGeneratedName(name) ? name.indexOf("init") === 0 : false) ? selfRef.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(3)) : false) ? valRefEq(g, failInitRef, ValRefForIntrinsic(g.fail_init_info)) : false) ? isUnitTy(g, expr.data[5]) : false) ? [0, expr.data[3][0].data[1].data[0].data[0], expr.data[2].data[0].data[2].head.data[0].data.data[1], expr.data[5], expr.data[2].data[0].data[2].head.data[2].head.data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var5[0]) {
    case 0:
      return makeSome();

    case 1:
      return null;
  }
}

export { _ObjectInitializationCheck___ as $7C$ObjectInitializationCheck$7C$_$7C$ };
export function isSplice(g, vref) {
  if (valRefEq(g, vref, g.splice_expr_vref)) {
    return true;
  } else {
    return valRefEq(g, vref, g.splice_raw_expr_vref);
  }
}
export function EmitDebugInfoIfNecessary(cenv, env, m, astExpr) {
  if (cenv.emitDebugInfoInQuotations ? !isAttributedExpression(astExpr) : false) {
    cenv.emitDebugInfoInQuotations = false;

    try {
      const mk_tuple = function (g, m_1, es) {
        return mkRefTupled(g, m_1, es, map_1(function (arg10_) {
          return tyOfExpr(g, arg10_);
        }, es));
      };

      const rangeExpr = mk_tuple(cenv.g, m, ofArray([mkString(cenv.g, m, m.FileName), mkInt(cenv.g, m, m.StartLine), mkInt(cenv.g, m, m.StartColumn), mkInt(cenv.g, m, m.EndLine), mkInt(cenv.g, m, m.EndColumn)]));
      const attrExpr = mk_tuple(cenv.g, m, ofArray([mkString(cenv.g, m, "DebugRange"), rangeExpr]));
      const attrExprR = ConvExprCore(cenv, env, attrExpr);
      return mkAttributedExpression(astExpr, attrExprR);
    } finally {
      cenv.emitDebugInfoInQuotations = true;
    }
  } else {
    return astExpr;
  }
}
export function ConvExpr(cenv, env, expr) {
  return EmitDebugInfoIfNecessary(cenv, env, Expr_get_Range.bind(expr)(), ConvExprCore(cenv, env, expr));
}

function ConvExprCore(cenv, env, expr) {
  var x0;
  var rest;
  var vref;
  var vFlags;
  var tyargs_1;
  var curriedArgs_1;

  var _fty;

  var _f;

  var tps;
  var tmvs;
  var tmethod;
  var e;
  var ctyp;
  const expr_1 = DetectAndOptimizeForExpression(cenv.g, new OptimizeForExpressionOptions(0), expr);
  const expr_2 = NormalizeAndAdjustPossibleSubsumptionExprs(cenv.g, expr_1);
  const expr_3 = stripExpr(expr_2);
  let $var6;

  if (expr_3.tag === 5) {
    const activePatternResult39000 = _InnerExprPat_(expr_3.data[0]);

    if (activePatternResult39000.tag === 1) {
      if (expr_3.data[3].tail != null) {
        if (x0 = expr_3.data[3].head, rest = expr_3.data[3].tail, isSplice(cenv.g, activePatternResult39000.data[0])) {
          $var6 = [0, expr_3.data[4], expr_3.data[3].tail, activePatternResult39000.data[0], expr_3.data[3].head];
        } else {
          $var6 = [1];
        }
      } else {
        $var6 = [1];
      }
    } else {
      $var6 = [1];
    }
  } else {
    $var6 = [1];
  }

  switch ($var6[0]) {
    case 0:
      const idx = cenv.exprSplices.length | 0;
      const ty = tyOfExpr(cenv.g, expr_3);
      const matchValue = tryPick(function (v) {
        return env.vs.ContainsVal(v) ? v : null;
      }, freeInExpr(CollectTyparsAndLocalsNoCaching, $var6[4]).FreeLocals);

      if (matchValue == null) {} else {
        errorR(new _Error(SR.crefBoundVarUsedInSplice(getValue(matchValue).DisplayName), getValue(matchValue).Range));
      }

      cenv.exprSplices.push([$var6[4], $var6[1]]);
      const hole = mkHole(ConvType(cenv, env, $var6[1], ty), idx);
      return fold(function (fR, arg) {
        return mkApp(fR, ConvExpr(cenv, env, arg));
      }, hole, $var6[2]);

    case 1:
      let $var7;

      const activePatternResult38999 = function (arg10__2) {
        return _ModuleValueOrMemberUse___(cenv.g, arg10__2);
      }(expr_3);

      if (activePatternResult38999 != null) {
        if (vref = getValue(activePatternResult38999)[0], vFlags = getValue(activePatternResult38999)[1], tyargs_1 = getValue(activePatternResult38999)[4], curriedArgs_1 = getValue(activePatternResult38999)[5], _fty = getValue(activePatternResult38999)[3], _f = getValue(activePatternResult38999)[2], !isSplice(cenv.g, vref)) {
          $var7 = [0, getValue(activePatternResult38999)[2], getValue(activePatternResult38999)[3], getValue(activePatternResult38999)[5], getValue(activePatternResult38999)[4], getValue(activePatternResult38999)[1], getValue(activePatternResult38999)[0]];
        } else {
          $var7 = [1];
        }
      } else {
        $var7 = [1];
      }

      switch ($var7[0]) {
        case 0:
          const m = Expr_get_Range.bind(expr_3)();
          const patternInput = GetMemberCallInfo(cenv.g, $var7[6], $var7[5]);
          let patternInput_3;
          const matchValue_1 = $var7[6].MemberInfo;
          const $var8 = matchValue_1 != null ? !$var7[6].IsExtensionMember ? [0] : [1] : [1];

          switch ($var8[0]) {
            case 0:
              const patternInput_1 = GetTypeOfIntrinsicMemberInCompiledForm(cenv.g, $var7[6]);
              patternInput_3 = [true, patternInput_1[0], patternInput_1[1], patternInput_1[2]];
              break;

            case 1:
              const arities = arityOfVal($var7[6].Deref);
              const patternInput_2 = GetTopValTypeInCompiledForm(cenv.g, arities, $var7[6].Type, m);
              patternInput_3 = [false, patternInput_2[0], patternInput_2[1], patternInput_2[2]];
              break;
          }

          let patternInput_4;
          const matchValue_2 = [patternInput[5], $var7[3]];

          if (matchValue_2[0]) {
            if (matchValue_2[1].tail == null) {
              patternInput_4 = wfail(new InternalError("warning: unexpected missing object argument when generating quotation for call to F# object member " + $var7[6].LogicalName, m));
            } else {
              const objArg = matchValue_2[1].head;
              const curriedArgs = matchValue_2[1].tail;
              patternInput_4 = [ofArray([objArg]), curriedArgs];
            }
          } else {
            patternInput_4 = [new List(), matchValue_2[1]];
          }

          if (verboseCReflect) {
            dprintfn(printf("vref.DisplayName = %A,  #objArgs = %A, #curriedArgs = %A"))($var7[6].DisplayName, patternInput_4[0].length, patternInput_4[1].length);
          }

          if (patternInput_4[1].length < patternInput_3[2].length ? true : exists2(function (arg_1, argInfo) {
            return argInfo.length > tryDestRefTupleExpr(arg_1).length;
          }, List_1.take(patternInput_3[2].length, patternInput_4[1]), patternInput_3[2])) {
            if (verboseCReflect) {
              dprintfn(printf("vref.DisplayName = %A was under applied"))($var7[6].DisplayName);
            }

            let topValInfo;
            const matchValue_3 = $var7[6].ValReprInfo;

            if (matchValue_3 != null) {
              topValInfo = getValue(matchValue_3);
            } else {
              topValInfo = error(new InternalError("no arity information found for F# value " + $var7[6].LogicalName, $var7[6].Range));
            }

            const patternInput_5 = AdjustValForExpectedArity(cenv.g, m, $var7[6], $var7[5], topValInfo);
            return ConvExpr(cenv, env, MakeApplicationAndBetaReduce(cenv.g, patternInput_5[0], patternInput_5[1], ofArray([$var7[4]]), patternInput_4[1], m));
          } else {
            const patternInput_6 = List_1.chop(patternInput_3[2].length, patternInput_4[1]);
            let callR;
            const untupledCurriedArgs = toList_1(map2(function (arg_2, curriedArgInfo) {
              const numUntupledArgs = curriedArgInfo.length | 0;

              if (numUntupledArgs === 0) {
                return new List();
              } else if (numUntupledArgs === 1) {
                return ofArray([arg_2]);
              } else {
                return tryDestRefTupleExpr(arg_2);
              }
            }, patternInput_6[0], patternInput_3[2]));

            if (verboseCReflect) {
              dprintfn(printf("vref.DisplayName  = %A , after unit adjust, #untupledCurriedArgs = %A, #curriedArgInfos = %d"))($var7[6].DisplayName, map_1(function (list) {
                return list.length;
              }, untupledCurriedArgs), patternInput_3[2].length);
            }

            let subCall;

            if (patternInput_3[0]) {
              const callArgs = concat(new List(patternInput_4[0], untupledCurriedArgs));
              const parentTyconR = ConvTyconRef(cenv, $var7[6].TopValDeclaringEntity, m);
              const isNewObj = (patternInput[2] ? true : patternInput[3]) ? true : patternInput[4];
              const envinner = BindFormalTypars(env, patternInput_3[1]);
              const argTys = map_1(function (tuple) {
                return tuple[0];
              }, concat(patternInput_3[2]));
              const methArgTypesR = ConvTypes(cenv, envinner, m, argTys);
              const methRetTypeR = ConvReturnType(cenv, envinner, m, patternInput_3[3]);
              const methName = $var7[6].CompiledName;
              const numGenericArgs = $var7[4].length - patternInput[0] | 0;
              subCall = ConvObjectModelCall(cenv, env, m, patternInput[6], patternInput[7], isNewObj, parentTyconR, methArgTypesR, methRetTypeR, methName, $var7[4], numGenericArgs, callArgs);
            } else {
              subCall = ConvModuleValueApp(cenv, env, m, $var7[6], $var7[4], untupledCurriedArgs);
            }

            const matchValue_4 = [patternInput_6[0], patternInput_3[2]];
            const $var9 = matchValue_4[0].tail != null ? matchValue_4[0].tail.tail == null ? matchValue_4[1].tail != null ? matchValue_4[1].head.tail == null ? matchValue_4[1].tail.tail == null ? [0, matchValue_4[0].head] : [1] : [1] : [1] : [1] : [1];

            switch ($var9[0]) {
              case 0:
                const $var10 = $var9[1].tag === 1 ? [0] : $var9[1].tag === 0 ? $var9[1].data[0].tag === 16 ? [0] : [1] : [1];

                switch ($var10[0]) {
                  case 0:
                    callR = subCall;
                    break;

                  case 1:
                    const argQ = ConvExpr(cenv, env, $var9[1]);
                    callR = mkSequential(argQ, subCall);
                    break;
                }

                break;

              case 1:
                callR = subCall;
                break;
            }

            return fold(function (fR_1, arg_3) {
              return mkApp(fR_1, ConvExpr(cenv, env, arg_3));
            }, callR, patternInput_6[1]);
          }

        case 1:
          let $var11;

          if (expr_3.tag === 5) {
            if (expr_3.data[2].tail != null) {
              if (expr_3.data[3].tail == null) {
                const activePatternResult38994 = _InnerExprPat_(expr_3.data[0]);

                if (activePatternResult38994.tag === 1) {
                  $var11 = [1, expr_3.data[1], activePatternResult38994.data[1], activePatternResult38994.data[2], expr_3.data[2], activePatternResult38994.data[0]];
                } else {
                  $var11 = [2, expr_3.data[1], expr_3.data[3], expr_3.data[0], expr_3.data[4], expr_3.data[2]];
                }
              } else {
                $var11 = [0, expr_3.data[3], expr_3.data[0], expr_3.data[1], expr_3.data[4], expr_3.data[2]];
              }
            } else {
              const activePatternResult38995 = _InnerExprPat_(expr_3.data[0]);

              if (activePatternResult38995.tag === 1) {
                if (expr_3.data[3].tail == null) {
                  $var11 = [1, expr_3.data[1], activePatternResult38995.data[1], activePatternResult38995.data[2], expr_3.data[2], activePatternResult38995.data[0]];
                } else {
                  $var11 = [2, expr_3.data[1], expr_3.data[3], expr_3.data[0], expr_3.data[4], expr_3.data[2]];
                }
              } else {
                $var11 = [2, expr_3.data[1], expr_3.data[3], expr_3.data[0], expr_3.data[4], expr_3.data[2]];
              }
            }
          } else if (expr_3.tag === 0) {
            $var11 = [3, expr_3.data[0], expr_3.data[1], expr_3.data[2]];
          } else if (expr_3.tag === 1) {
            $var11 = [4, expr_3.data[1], expr_3.data[2], expr_3.data[0]];
          } else if (expr_3.tag === 7) {
            $var11 = [5, expr_3.data[0], expr_3.data[1]];
          } else if (expr_3.tag === 6) {
            $var11 = [6, expr_3.data[0], expr_3.data[1]];
          } else if (expr_3.tag === 3) {
            $var11 = [7, expr_3.data[4], expr_3.data[3]];
          } else if (expr_3.tag === 12) {
            $var11 = [8, expr_3.data[0], expr_3.data[4]];
          } else if (expr_3.tag === 4) {
            $var11 = [9, expr_3.data[3]];
          } else if (expr_3.tag === 9) {
            $var11 = [10, expr_3.data[0], expr_3.data[2], expr_3.data[1], expr_3.data[5], expr_3.data[3]];
          } else if (expr_3.tag === 2) {
            const activePatternResult38997 = function (arg10__1) {
              return _ObjectInitializationCheck___(cenv.g, arg10__1);
            }(expr_3.data[0]);

            if (activePatternResult38997 != null) {
              if (expr_3.data[2].tag === 0) {
                $var11 = [11, expr_3.data[1]];
              } else {
                $var11 = [12];
              }
            } else {
              $var11 = [12];
            }
          } else {
            $var11 = [12];
          }

          switch ($var11[0]) {
            case 0:
              const rfty = applyForallTy(cenv.g, $var11[3], $var11[5]);
              return ConvExpr(cenv, env, primMkApp([primMkApp([$var11[2], $var11[3]], $var11[5], new List(), $var11[4]), rfty], new List(), $var11[1], $var11[4]));

            case 1:
              return ConvValRef(true, cenv, env, $var11[3], $var11[5], $var11[4]);

            case 2:
              if (!($var11[5].tail == null)) {
                wfail(new _Error(SR.crefQuotationsCantContainGenericExprs(), $var11[4]));
              }

              return fold(function (fR_2, arg_4) {
                return mkApp(fR_2, ConvExpr(cenv, env, arg_4));
              }, ConvExpr(cenv, env, $var11[3]), $var11[2]);

            case 3:
              return ConvConst(cenv, env, $var11[2], $var11[1], $var11[3]);

            case 4:
              return ConvValRef(true, cenv, env, $var11[2], $var11[3], new List());

            case 5:
              const matchValue_5 = ConvLetBind(cenv, env, $var11[1]);

              if (matchValue_5[0] != null) {
                const bindR = getValue(matchValue_5[0]);
                return mkLet(bindR, ConvExpr(cenv, matchValue_5[1], $var11[2]));
              } else {
                return ConvExpr(cenv, matchValue_5[1], $var11[2]);
              }

            case 6:
              const vs = valsOfBinds($var11[1]);
              const vsR = map_1(function (v_1) {
                return ConvVal(cenv, env, v_1);
              }, vs);
              const env_1 = BindFlatVals(env, vs);
              const bodyR = ConvExpr(cenv, env_1, $var11[2]);
              const bindsR = toList_1(zip(vsR, map_1(function (b) {
                return ConvExpr(cenv, env_1, b.Expr);
              }, $var11[1])));
              return mkLetRec(bindsR, bodyR);

            case 7:
              const patternInput_7 = MultiLambdaToTupledLambda(cenv.g, $var11[2], $var11[1]);
              const vR = ConvVal(cenv, env, patternInput_7[0]);
              const bR = ConvExpr(cenv, BindVal(env, patternInput_7[0]), patternInput_7[1]);
              return mkLambda(vR, bR);

            case 8:
              if (cenv.quotationFormat.Equals(new QuotationSerializationFormat(0)) ? tyconRefEq(cenv.g, tcrefOfAppTy(cenv.g, $var11[2]), cenv.g.raw_expr_tcr) : false) {
                return mkQuoteRaw40(ConvExpr(cenv, env, $var11[1]));
              } else {
                return mkQuote(ConvExpr(cenv, env, $var11[1]));
              }

            case 9:
              return wfail(new _Error(SR.crefQuotationsCantContainGenericFunctions(), $var11[1]));

            case 10:
              const typR = ConvType(cenv, env, $var11[3], $var11[4]);
              return ConvDecisionTree(cenv, env, $var11[5], typR, $var11[2]);

            case 11:
              return ConvExpr(cenv, env, $var11[1]);

            case 12:
              const $var12 = expr_3.tag === 2 ? expr_3.data[2].tag === 0 ? [0, expr_3.data[0], expr_3.data[1]] : [2] : expr_3.tag === 8 ? expr_3.data[4].tail != null ? expr_3.data[4].head.data[3].tail != null ? expr_3.data[4].head.data[3].tail.tail == null ? expr_3.data[4].tail.tail == null ? (tps = expr_3.data[4].head.data[2], tmvs = expr_3.data[4].head.data[3].head, tmethod = expr_3.data[4].head, e = expr_3.data[4].head.data[4], ctyp = expr_3.data[4].head.data[0].data[1], isDelegateTy(cenv.g, expr_3.data[1])) ? [1, expr_3.data[4].head.data[0].data[1], expr_3.data[4].head.data[4], expr_3.data[6], expr_3.data[4].head, expr_3.data[4].head.data[3].head, expr_3.data[4].head.data[2], expr_3.data[1]] : [2] : [2] : [2] : [2] : [2] : [2];

              switch ($var12[0]) {
                case 0:
                  return mkSequential(ConvExpr(cenv, env, $var12[1]), ConvExpr(cenv, env, $var12[2]));

                case 1:
                  const f = mkLambdas($var12[3], $var12[6], $var12[5], $var12[2], GetFSharpViewOfReturnType(cenv.g, returnTyOfMethod(cenv.g, $var12[4])));
                  const fR_3 = ConvExpr(cenv, env, f);
                  const tyargR = ConvType(cenv, env, $var12[3], $var12[1]);
                  return mkDelegate(tyargR, fR_3);

                case 2:
                  const $var13 = expr_3.tag === 10 ? [0, expr_3.data[2]] : expr_3.tag === 13 ? [1] : expr_3.tag === 2 ? expr_3.data[2].tag === 1 ? [2, expr_3.data[0], expr_3.data[1]] : [5] : expr_3.tag === 8 ? [3, expr_3.data[3], expr_3.data[2], expr_3.data[5], expr_3.data[0], expr_3.data[4], expr_3.data[1], expr_3.data[6]] : expr_3.tag === 11 ? [4, expr_3.data[2], expr_3.data[3], expr_3.data[0], expr_3.data[1]] : [5];

                  switch ($var13[0]) {
                    case 0:
                      return ConvExpr(cenv, env, $var13[1]);

                    case 1:
                      return ConvExpr(cenv, env, ChooseTyparSolutionsForFreeChoiceTypars(cenv.g, cenv.amap, expr_3));

                    case 2:
                      return mkSequential(ConvExpr(cenv, env, $var13[1]), ConvExpr(cenv, env, $var13[2]));

                    case 3:
                      return wfail(new _Error(SR.crefQuotationsCantContainObjExprs(), $var13[7]));

                    case 4:
                      const matchValue_6 = [$var13[3], $var13[4], $var13[1]];
                      let $var14;

                      if (matchValue_6[0].tag === 0) {
                        $var14 = [0, matchValue_6[0].data];
                      } else if (matchValue_6[0].tag === 2) {
                        $var14 = [1, matchValue_6[0].data, matchValue_6[1]];
                      } else if (matchValue_6[0].tag === 10) {
                        $var14 = [2, matchValue_6[0].data[1]];
                      } else if (matchValue_6[0].tag === 16) {
                        if (matchValue_6[2].tail != null) {
                          if (matchValue_6[2].tail.tail == null) {
                            $var14 = [3, matchValue_6[2].head, matchValue_6[0].data[1], matchValue_6[1], matchValue_6[0].data[0]];
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else if (matchValue_6[0].tag === 13) {
                        $var14 = [4, matchValue_6[0].data, matchValue_6[1]];
                      } else if (matchValue_6[0].tag === 17) {
                        $var14 = [5, matchValue_6[1]];
                      } else if (matchValue_6[0].tag === 12) {
                        if (matchValue_6[2].tail == null) {
                          $var14 = [6, matchValue_6[0].data, matchValue_6[1]];
                        } else {
                          $var14 = [7, matchValue_6[2], matchValue_6[0].data, matchValue_6[1]];
                        }
                      } else if (matchValue_6[0].tag === 21) {
                        if (matchValue_6[2].tail != null) {
                          if (matchValue_6[2].tail.tail == null) {
                            $var14 = [8, matchValue_6[2].head, matchValue_6[0].data[1], matchValue_6[0].data[0], matchValue_6[1]];
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else if (matchValue_6[0].tag === 22) {
                        if (matchValue_6[0].data[0].tail != null) {
                          if (matchValue_6[0].data[0].head.tag === 60) {
                            if (matchValue_6[0].data[0].tail.tail != null) {
                              if (matchValue_6[0].data[0].tail.head.tag === 33) {
                                if (matchValue_6[0].data[0].tail.tail.tail == null) {
                                  $var14 = [9, matchValue_6[2], matchValue_6[1], matchValue_6[0].data[0].head.data[2]];
                                } else {
                                  $var14 = [13, matchValue_6[0].data[0]];
                                }
                              } else {
                                $var14 = [13, matchValue_6[0].data[0]];
                              }
                            } else {
                              $var14 = [9, matchValue_6[2], matchValue_6[1], matchValue_6[0].data[0].head.data[2]];
                            }
                          } else if (matchValue_6[0].data[0].head.tag === 59) {
                            if (matchValue_6[0].data[0].tail.tail != null) {
                              if (matchValue_6[0].data[0].tail.head.tag === 33) {
                                if (matchValue_6[0].data[0].tail.tail.tail == null) {
                                  $var14 = [9, matchValue_6[2], matchValue_6[1], matchValue_6[0].data[0].head.data[1]];
                                } else {
                                  $var14 = [13, matchValue_6[0].data[0]];
                                }
                              } else {
                                $var14 = [13, matchValue_6[0].data[0]];
                              }
                            } else {
                              $var14 = [9, matchValue_6[2], matchValue_6[1], matchValue_6[0].data[0].head.data[1]];
                            }
                          } else if (matchValue_6[0].data[0].head.tag === 64) {
                            if (matchValue_6[0].data[0].tail.tail == null) {
                              $var14 = [10, matchValue_6[2], matchValue_6[1], matchValue_6[0].data[0].head.data[2]];
                            } else {
                              $var14 = [13, matchValue_6[0].data[0]];
                            }
                          } else if (matchValue_6[0].data[0].head.tag === 63) {
                            if (matchValue_6[0].data[0].tail.tail == null) {
                              $var14 = [10, matchValue_6[2], matchValue_6[1], matchValue_6[0].data[0].head.data[1]];
                            } else {
                              $var14 = [13, matchValue_6[0].data[0]];
                            }
                          } else if (matchValue_6[0].data[0].head.tag === 6) {
                            if (matchValue_6[0].data[0].tail.tail == null) {
                              if (matchValue_6[2].tail != null) {
                                if (matchValue_6[2].tail.tail != null) {
                                  if (matchValue_6[2].tail.tail.tail == null) {
                                    $var14 = [11, matchValue_6[2].head, matchValue_6[2].tail.head];
                                  } else {
                                    $var14 = [13, matchValue_6[0].data[0]];
                                  }
                                } else {
                                  $var14 = [13, matchValue_6[0].data[0]];
                                }
                              } else {
                                $var14 = [13, matchValue_6[0].data[0]];
                              }
                            } else {
                              $var14 = [13, matchValue_6[0].data[0]];
                            }
                          } else if (matchValue_6[0].data[0].head.tag === 54) {
                            if (matchValue_6[0].data[0].tail.tail == null) {
                              if (matchValue_6[2].tail != null) {
                                if (matchValue_6[2].tail.tail == null) {
                                  $var14 = [12, matchValue_6[2].head];
                                } else {
                                  $var14 = [13, matchValue_6[0].data[0]];
                                }
                              } else {
                                $var14 = [13, matchValue_6[0].data[0]];
                              }
                            } else {
                              $var14 = [13, matchValue_6[0].data[0]];
                            }
                          } else {
                            $var14 = [13, matchValue_6[0].data[0]];
                          }
                        } else {
                          $var14 = [13, matchValue_6[0].data[0]];
                        }
                      } else if (matchValue_6[0].tag === 1) {
                        $var14 = [14, matchValue_6[2], matchValue_6[0].data];
                      } else if (matchValue_6[0].tag === 11) {
                        $var14 = [15, matchValue_6[1], matchValue_6[2], matchValue_6[0].data];
                      } else if (matchValue_6[0].tag === 19) {
                        if (matchValue_6[1].tail == null) {
                          if (matchValue_6[2].tail != null) {
                            if (matchValue_6[2].tail.tail == null) {
                              $var14 = [16, matchValue_6[0].data[1], matchValue_6[2].head, matchValue_6[0].data[0]];
                            } else {
                              $var14 = [26];
                            }
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else if (matchValue_6[0].tag === 24) {
                        if (matchValue_6[1].tail != null) {
                          if (matchValue_6[1].tail.tail != null) {
                            if (matchValue_6[1].tail.tail.tail == null) {
                              if (matchValue_6[2].tail != null) {
                                if (matchValue_6[2].tail.tail == null) {
                                  $var14 = [17, matchValue_6[1].tail.head, matchValue_6[1].head, matchValue_6[2].head];
                                } else {
                                  $var14 = [26];
                                }
                              } else {
                                $var14 = [26];
                              }
                            } else {
                              $var14 = [26];
                            }
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else if (matchValue_6[0].tag === 25) {
                        if (matchValue_6[1].tail != null) {
                          if (matchValue_6[1].tail.tail == null) {
                            if (matchValue_6[2].tail == null) {
                              $var14 = [18, matchValue_6[1].head];
                            } else {
                              $var14 = [26];
                            }
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else if (matchValue_6[0].tag === 30) {
                        if (matchValue_6[0].data[0].tag === 3) {
                          if (matchValue_6[1].tail == null) {
                            if (matchValue_6[2].tail != null) {
                              if (matchValue_6[2].tail.tail == null) {
                                $var14 = [20, matchValue_6[2].head, matchValue_6[0].data[1]];
                              } else {
                                $var14 = [26];
                              }
                            } else {
                              $var14 = [26];
                            }
                          } else {
                            $var14 = [26];
                          }
                        } else if (matchValue_6[0].data[0].tag === 2) {
                          if (matchValue_6[1].tail == null) {
                            if (matchValue_6[2].tail != null) {
                              if (matchValue_6[2].tail.tail == null) {
                                $var14 = [21, matchValue_6[2].head, matchValue_6[0].data[1]];
                              } else {
                                $var14 = [26];
                              }
                            } else {
                              $var14 = [26];
                            }
                          } else {
                            $var14 = [26];
                          }
                        } else if (matchValue_6[0].data[0].tag === 1) {
                          if (matchValue_6[1].tail == null) {
                            if (matchValue_6[2].tail == null) {
                              $var14 = [22, matchValue_6[0].data[1]];
                            } else {
                              $var14 = [26];
                            }
                          } else {
                            $var14 = [26];
                          }
                        } else if (matchValue_6[1].tail == null) {
                          if (matchValue_6[2].tail == null) {
                            $var14 = [19, matchValue_6[0].data[1]];
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else if (matchValue_6[0].tag === 3) {
                        if (matchValue_6[1].tail != null) {
                          if (matchValue_6[1].tail.tail == null) {
                            $var14 = [23, matchValue_6[1].head, matchValue_6[2]];
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else if (matchValue_6[0].tag === 6) {
                        if (matchValue_6[1].tail == null) {
                          if (matchValue_6[2].tail != null) {
                            if (matchValue_6[2].head.tag === 3) {
                              if (matchValue_6[2].head.data[3].tail != null) {
                                if (matchValue_6[2].head.data[3].tail.tail == null) {
                                  if (matchValue_6[2].tail.tail != null) {
                                    if (matchValue_6[2].tail.head.tag === 3) {
                                      if (matchValue_6[2].tail.head.data[3].tail != null) {
                                        if (matchValue_6[2].tail.head.data[3].tail.tail == null) {
                                          if (matchValue_6[2].tail.tail.tail == null) {
                                            $var14 = [24, matchValue_6[2].tail.head.data[4], matchValue_6[2].head.data[4]];
                                          } else {
                                            $var14 = [26];
                                          }
                                        } else {
                                          $var14 = [26];
                                        }
                                      } else {
                                        $var14 = [26];
                                      }
                                    } else {
                                      $var14 = [26];
                                    }
                                  } else {
                                    $var14 = [26];
                                  }
                                } else {
                                  $var14 = [26];
                                }
                              } else {
                                $var14 = [26];
                              }
                            } else {
                              $var14 = [26];
                            }
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else if (matchValue_6[0].tag === 7) {
                        if (matchValue_6[0].data[1].tag === 0) {
                          if (matchValue_6[1].tail == null) {
                            if (matchValue_6[2].tail != null) {
                              if (matchValue_6[2].head.tag === 3) {
                                if (matchValue_6[2].head.data[3].tail != null) {
                                  if (matchValue_6[2].head.data[3].tail.tail == null) {
                                    if (matchValue_6[2].tail.tail != null) {
                                      if (matchValue_6[2].tail.head.tag === 3) {
                                        if (matchValue_6[2].tail.head.data[3].tail != null) {
                                          if (matchValue_6[2].tail.head.data[3].tail.tail == null) {
                                            const activePatternResult38990 = _SimpleArrayLoopUpperBound___(matchValue_6[2].tail.head.data[4]);

                                            if (activePatternResult38990 != null) {
                                              if (matchValue_6[2].tail.tail.tail != null) {
                                                const activePatternResult38992 = function (arg10_) {
                                                  return _SimpleArrayLoopBody___(cenv.g, arg10_);
                                                }(matchValue_6[2].tail.tail.head);

                                                if (activePatternResult38992 != null) {
                                                  if (matchValue_6[2].tail.tail.tail.tail == null) {
                                                    $var14 = [25, getValue(activePatternResult38992)[0], getValue(activePatternResult38992)[2], getValue(activePatternResult38992)[1], matchValue_6[2].head.data[4], matchValue_6[2].tail.head.data[5]];
                                                  } else {
                                                    $var14 = [26];
                                                  }
                                                } else {
                                                  $var14 = [26];
                                                }
                                              } else {
                                                $var14 = [26];
                                              }
                                            } else {
                                              $var14 = [26];
                                            }
                                          } else {
                                            $var14 = [26];
                                          }
                                        } else {
                                          $var14 = [26];
                                        }
                                      } else {
                                        $var14 = [26];
                                      }
                                    } else {
                                      $var14 = [26];
                                    }
                                  } else {
                                    $var14 = [26];
                                  }
                                } else {
                                  $var14 = [26];
                                }
                              } else {
                                $var14 = [26];
                              }
                            } else {
                              $var14 = [26];
                            }
                          } else {
                            $var14 = [26];
                          }
                        } else {
                          $var14 = [26];
                        }
                      } else {
                        $var14 = [26];
                      }

                      switch ($var14[0]) {
                        case 0:
                          const mkR = ConvUnionCaseRef(cenv, $var14[1], $var13[2]);
                          const tyargsR = ConvTypes(cenv, env, $var13[2], $var13[4]);
                          const argsR = ConvExprs(cenv, env, $var13[1]);
                          return mkUnion(mkR, tyargsR, argsR);

                        case 1:
                          const tyR = ConvType(cenv, env, $var13[2], mkAnyTupledTy(cenv.g, $var14[1], $var14[2]));
                          const argsR_1 = ConvExprs(cenv, env, $var13[1]);
                          return mkTuple(tyR, argsR_1);

                        case 2:
                          const rgtypR = ConvTyconRef(cenv, $var14[1], $var13[2]);
                          const tyargsR_1 = ConvTypes(cenv, env, $var13[2], $var13[4]);
                          const argsR_2 = ConvExprs(cenv, env, $var13[1]);
                          return mkRecdMk(rgtypR, tyargsR_1, argsR_2);

                        case 3:
                          return ConvUnionFieldGet(cenv, env, $var13[2], $var14[4], $var14[2], $var14[3], $var14[1]);

                        case 4:
                          return wfail(new _Error(SR.crefQuotationsCantContainAddressOf(), $var13[2]));

                        case 5:
                          return wfail(new _Error(SR.crefQuotationsCantContainAddressOf(), $var13[2]));

                        case 6:
                          return wfail(new _Error(SR.crefQuotationsCantContainStaticFieldRef(), $var13[2]));

                        case 7:
                          return ConvClassOrRecdFieldGet(cenv, env, $var13[2], $var14[2], $var14[3], $var14[1]);

                        case 8:
                          const eR = ConvLValueExpr(cenv, env, $var14[1]);
                          const tyR_1 = ConvType(cenv, env, $var13[2], mkAnyTupledTy(cenv.g, $var14[3], $var14[4]));
                          return mkTupleGet(tyR_1, $var14[2], eR);

                        case 9:
                          return ConvLdfld(cenv, env, $var13[2], $var14[3], $var14[2], $var14[1]);

                        case 10:
                          const tyargsR_2 = ConvTypes(cenv, env, $var13[2], $var14[2]);
                          const parentTyconR_1 = ConvILTypeRefUnadjusted(cenv, $var13[2], $var14[3].DeclaringTypeRef);
                          const argsR_3 = ConvLValueArgs(cenv, env, $var14[1]);
                          return mkFieldSet([parentTyconR_1, $var14[3].Name], tyargsR_2, argsR_3);

                        case 11:
                          const ty_1 = tyOfExpr(cenv.g, $var14[1]);
                          const eq = mkCallEqualsOperator(cenv.g, $var13[2], ty_1, $var14[1], $var14[2]);
                          return ConvExpr(cenv, env, eq);

                        case 12:
                          const raiseExpr = mkCallRaise(cenv.g, $var13[2], tyOfExpr(cenv.g, expr_3), $var14[1]);
                          return ConvExpr(cenv, env, raiseExpr);

                        case 13:
                          return wfail(new _Error(SR.crefQuotationsCantContainInlineIL(), $var13[2]));

                        case 14:
                          const _rgtypR = ConvTyconRef(cenv, $var14[2], $var13[2]);

                          const _typ = mkAppTy($var14[2], new List());

                          const parentTyconR_2 = ConvTyconRef(cenv, $var14[2], $var13[2]);
                          const argtys = map_1(function (rfld) {
                            return rfld.FormalType;
                          }, recdFieldsOfExnDefRef($var14[2]));
                          const methArgTypesR_1 = ConvTypes(cenv, env, $var13[2], argtys);
                          const argsR_4 = ConvExprs(cenv, env, $var14[1]);
                          const objR = mkCtorCall(new CtorData(parentTyconR_2, methArgTypesR_1), new List(), argsR_4);
                          const exnTypeR = ConvType(cenv, env, $var13[2], cenv.g.exn_ty);
                          return mkCoerce(exnTypeR, objR);

                        case 15:
                          const argsR_5 = ConvLValueArgs(cenv, env, $var14[2]);
                          const tyargsR_3 = ConvTypes(cenv, env, $var13[2], $var13[4]);
                          const projR = ConvRecdFieldRef(cenv, $var14[3], $var13[2]);

                          if ($var14[3].TyconRef.IsRecordTycon) {
                            return mkRecdSet(projR, tyargsR_3, argsR_5);
                          } else {
                            const fspec = $var14[3].RecdField;
                            const tcref = $var14[3].TyconRef;
                            const parentTyconR_3 = ConvTyconRef(cenv, tcref, $var13[2]);

                            if (useGenuineField(tcref.Deref, fspec)) {
                              return mkFieldSet(projR, tyargsR_3, argsR_5);
                            } else {
                              const envinner_1 = BindFormalTypars(env, tcref.TyparsNoRange);
                              const propRetTypeR = ConvType(cenv, envinner_1, $var13[2], fspec.FormalType);
                              return mkPropSet([parentTyconR_3, projR[1], propRetTypeR, new List()], tyargsR_3, argsR_5);
                            }
                          }

                        case 16:
                          const exnc = stripExnEqns($var14[3]);
                          const fspec_1 = item($var14[1], exnc.TrueInstanceFieldsAsList);
                          const parentTyconR_4 = ConvTyconRef(cenv, $var14[3], $var13[2]);
                          const propRetTypeR_1 = ConvType(cenv, env, $var13[2], fspec_1.FormalType);
                          const callArgR = ConvExpr(cenv, env, $var14[2]);
                          const exnTypeR_1 = ConvType(cenv, env, $var13[2], generalizedTyconRef($var14[3]));
                          return mkPropGet([parentTyconR_4, fspec_1.Name, propRetTypeR_1, new List()], new List(), ofArray([mkCoerce(exnTypeR_1, callArgR)]));

                        case 17:
                          const xR = ConvExpr(cenv, env, $var14[3]);

                          if (typeEquiv(cenv.g, $var14[2], $var14[1])) {
                            return xR;
                          } else {
                            return mkCoerce(ConvType(cenv, env, $var13[2], $var14[2]), xR);
                          }

                        case 18:
                          return function (expr_4) {
                            return ConvExpr(cenv, env, expr_4);
                          }(mkReraiseLibCall(cenv.g, $var14[1], $var13[2]));

                        case 19:
                          return mkAddressOf(ConvValRef(false, cenv, env, $var13[2], $var14[1], new List()));

                        case 20:
                          return mkAddressSet(ConvValRef(false, cenv, env, $var13[2], $var14[2], new List()), ConvExpr(cenv, env, $var14[1]));

                        case 21:
                          const matchValue_7 = $var14[2].DeclaringEntity;
                          const $var15 = matchValue_7.tag === 0 ? IsCompiledAsStaticProperty(cenv.g, $var14[2].Deref) ? [0, matchValue_7.data] : [1] : [1];

                          switch ($var15[0]) {
                            case 0:
                              const parentTyconR_5 = ConvTyconRef(cenv, $var15[1], $var13[2]);
                              const propName = $var14[2].CompiledName;
                              const propTy = ConvType(cenv, env, $var13[2], $var14[2].Type);
                              return mkPropSet([parentTyconR_5, propName, propTy, new List()], new List(), ofArray([ConvExpr(cenv, env, $var14[1])]));

                            case 1:
                              return mkVarSet(ConvValRef(false, cenv, env, $var13[2], $var14[2], new List()), ConvExpr(cenv, env, $var14[1]));
                          }

                        case 22:
                          return ConvValRef(false, cenv, env, $var13[2], $var14[1], new List());

                        case 23:
                          return mkNewArray(ConvType(cenv, env, $var13[2], $var14[1]), ConvExprs(cenv, env, $var14[2]));

                        case 24:
                          return mkWhileLoop(ConvExpr(cenv, env, $var14[2]), ConvExpr(cenv, env, $var14[1]));

                        case 25:
                          let lim1;
                          const len = mkCallArrayLength(cenv.g, $var14[5], $var14[3], $var14[1]);
                          lim1 = mkCallSubtractionOperator(cenv.g, $var14[5], cenv.g.int32_ty, len, new Expr(0, [new Const(5, 1), $var13[2], cenv.g.int32_ty]));
                          return mkForLoop(ConvExpr(cenv, env, $var14[4]), ConvExpr(cenv, env, lim1), ConvExpr(cenv, env, $var14[2]));

                        case 26:
                          const $var16 = matchValue_6[0].tag === 7 ? matchValue_6[1].tail == null ? matchValue_6[2].tail != null ? matchValue_6[2].head.tag === 3 ? matchValue_6[2].head.data[3].tail != null ? matchValue_6[2].head.data[3].tail.tail == null ? matchValue_6[2].tail.tail != null ? matchValue_6[2].tail.head.tag === 3 ? matchValue_6[2].tail.head.data[3].tail != null ? matchValue_6[2].tail.head.data[3].tail.tail == null ? matchValue_6[2].tail.tail.tail != null ? matchValue_6[2].tail.tail.tail.tail == null ? [0, matchValue_6[2].tail.tail.head, matchValue_6[0].data[1], matchValue_6[2].head.data[4], matchValue_6[2].tail.head.data[4]] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : matchValue_6[0].tag === 31 ? matchValue_6[1].tail == null ? [1, matchValue_6[0].data[10], matchValue_6[2], matchValue_6[0].data[8], matchValue_6[0].data[7], matchValue_6[0].data[3], matchValue_6[0].data[5], matchValue_6[0].data[9], matchValue_6[0].data[4]] : [12] : matchValue_6[0].tag === 9 ? matchValue_6[1].tail != null ? matchValue_6[1].tail.tail == null ? matchValue_6[2].tail != null ? matchValue_6[2].head.tag === 3 ? matchValue_6[2].head.data[3].tail != null ? matchValue_6[2].head.data[3].tail.tail == null ? matchValue_6[2].tail.tail != null ? matchValue_6[2].tail.head.tag === 3 ? matchValue_6[2].tail.head.data[3].tail != null ? matchValue_6[2].tail.head.data[3].tail.tail == null ? matchValue_6[2].tail.tail.tail == null ? [2, matchValue_6[1].head, matchValue_6[2].head.data[4], matchValue_6[2].tail.head.data[4]] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : matchValue_6[0].tag === 8 ? matchValue_6[1].tail != null ? matchValue_6[1].tail.tail == null ? matchValue_6[2].tail != null ? matchValue_6[2].head.tag === 3 ? matchValue_6[2].head.data[3].tail != null ? matchValue_6[2].head.data[3].tail.tail == null ? matchValue_6[2].tail.tail != null ? matchValue_6[2].tail.head.tag === 3 ? matchValue_6[2].tail.head.data[3].tail != null ? matchValue_6[2].tail.head.data[3].tail.tail == null ? matchValue_6[2].tail.tail.tail != null ? matchValue_6[2].tail.tail.head.tag === 3 ? matchValue_6[2].tail.tail.head.data[3].tail != null ? matchValue_6[2].tail.tail.head.data[3].tail.tail == null ? matchValue_6[2].tail.tail.tail.tail == null ? [3, matchValue_6[1].head, matchValue_6[2].head.data[4], matchValue_6[2].tail.head.data[4], matchValue_6[2].tail.tail.head.data[4], matchValue_6[2].tail.head.data[3].head, matchValue_6[2].tail.tail.head.data[3].head] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : [12] : matchValue_6[0].tag === 4 ? matchValue_6[1].tail == null ? matchValue_6[2].tail == null ? [4, matchValue_6[0].data] : [12] : [12] : matchValue_6[0].tag === 5 ? matchValue_6[1].tail == null ? matchValue_6[2].tail == null ? [5, matchValue_6[0].data] : [12] : [12] : matchValue_6[0].tag === 15 ? matchValue_6[2].tail != null ? matchValue_6[2].tail.tail == null ? [6, matchValue_6[2].head] : [12] : [12] : matchValue_6[0].tag === 14 ? matchValue_6[2].tail != null ? matchValue_6[2].tail.tail == null ? [7, matchValue_6[2].head, matchValue_6[1], matchValue_6[0].data] : [12] : [12] : matchValue_6[0].tag === 18 ? matchValue_6[2].tail != null ? matchValue_6[2].tail.tail != null ? matchValue_6[2].tail.tail.tail == null ? [8, matchValue_6[0].data[0], matchValue_6[2].head, matchValue_6[0].data[1], matchValue_6[1], matchValue_6[2].tail.head] : [12] : [12] : [12] : matchValue_6[0].tag === 20 ? matchValue_6[1].tail == null ? matchValue_6[2].tail != null ? matchValue_6[2].tail.tail != null ? matchValue_6[2].tail.tail.tail == null ? [9, matchValue_6[2].head, matchValue_6[0].data[1], matchValue_6[0].data[0], matchValue_6[2].tail.head] : [12] : [12] : [12] : [12] : matchValue_6[0].tag === 23 ? [10] : matchValue_6[0].tag === 29 ? [11, matchValue_6[0].data] : [12];

                          switch ($var16[0]) {
                            case 0:
                              if ($var16[2].tag === 0) {
                                return mkForLoop(ConvExpr(cenv, env, $var16[3]), ConvExpr(cenv, env, $var16[4]), ConvExpr(cenv, env, $var16[1]));
                              } else {
                                return wfail(new _Error(SR.crefQuotationsCantContainDescendingForLoops(), $var13[2]));
                              }

                            case 1:
                              const parentTyconR_6 = ConvILTypeRefUnadjusted(cenv, $var13[2], $var16[4].DeclaringTypeRef);
                              let isNewObj_1;

                              if ($var16[5]) {
                                isNewObj_1 = true;
                              } else {
                                const $var17 = $var16[8].tag === 2 ? [0] : $var16[8].tag === 3 ? [0] : [1];

                                switch ($var17[0]) {
                                  case 0:
                                    isNewObj_1 = true;
                                    break;

                                  case 1:
                                    isNewObj_1 = false;
                                    break;
                                }
                              }

                              const methArgTypesR_2 = map_1(function (ty_2) {
                                return ConvILType(cenv, env, $var13[2], ty_2);
                              }, $var16[4].ArgTypes);
                              const methRetTypeR_1 = ConvILType(cenv, env, $var13[2], $var16[4].ReturnType);
                              const methName_1 = $var16[4].Name;
                              const isPropGet = $var16[6] ? startsWith(methName_1, "get_", 4) : false;
                              const isPropSet = $var16[6] ? startsWith(methName_1, "set_", 4) : false;
                              const tyargs = append($var16[3], $var16[7]);
                              return ConvObjectModelCall(cenv, env, $var13[2], isPropGet, isPropSet, isNewObj_1, parentTyconR_6, methArgTypesR_2, methRetTypeR_1, methName_1, tyargs, $var16[7].length, $var16[2]);

                            case 2:
                              return mkTryFinally(ConvExpr(cenv, env, $var16[2]), ConvExpr(cenv, env, $var16[3]));

                            case 3:
                              const vfR = ConvVal(cenv, env, $var16[5]);
                              const envf = BindVal(env, $var16[5]);
                              const vhR = ConvVal(cenv, env, $var16[6]);
                              const envh = BindVal(env, $var16[6]);
                              return mkTryWith(ConvExpr(cenv, env, $var16[2]), vfR, ConvExpr(cenv, envf, $var16[3]), vhR, ConvExpr(cenv, envh, $var16[4]));

                            case 4:
                              return ConvExpr(cenv, env, new Expr(11, [new TOp(3), ofArray([cenv.g.byte_ty]), ofArray(map_2(function (arg20_) {
                                return mkByte(cenv.g, $var13[2], arg20_);
                              }, $var16[1], Array)), $var13[2]]));

                            case 5:
                              return ConvExpr(cenv, env, new Expr(11, [new TOp(3), ofArray([cenv.g.uint16_ty]), ofArray(map_2(function (arg20__1) {
                                return mkUInt16(cenv.g, $var13[2], arg20__1);
                              }, $var16[1], Array)), $var13[2]]));

                            case 6:
                              return ConvExpr(cenv, env, $var16[1]);

                            case 7:
                              return wfail(new _Error(SR.crefQuotationsCantFetchUnionIndexes(), $var13[2]));

                            case 8:
                              return wfail(new _Error(SR.crefQuotationsCantSetUnionFields(), $var13[2]));

                            case 9:
                              return wfail(new _Error(SR.crefQuotationsCantSetExceptionFields(), $var13[2]));

                            case 10:
                              return wfail(new _Error(SR.crefQuotationsCantRequireByref(), $var13[2]));

                            case 11:
                              return wfail(new _Error(SR.crefQuotationsCantCallTraitMembers(), $var13[2]));

                            case 12:
                              return wfail(new InternalError("Unexpected expression shape", $var13[2]));
                          }

                      }

                    case 5:
                      return wfail(new InternalError(toText(printf("unhandled construct in AST: %A"))(expr_3), Expr_get_Range.bind(expr_3)()));
                  }

              }

          }

      }

  }
}

export function ConvLdfld(cenv, env, m, fspec, enclTypeArgs, args) {
  const tyargsR = ConvTypes(cenv, env, m, enclTypeArgs);
  const parentTyconR = ConvILTypeRefUnadjusted(cenv, m, fspec.DeclaringTypeRef);
  const argsR = ConvLValueArgs(cenv, env, args);
  return mkFieldGet([parentTyconR, fspec.Name], tyargsR, argsR);
}
export function ConvUnionFieldGet(cenv, env, m, ucref, n, tyargs, e) {
  const tyargsR = ConvTypes(cenv, env, m, tyargs);
  const patternInput = ConvUnionCaseRef(cenv, ucref, m);
  const projR = [patternInput[0], patternInput[1], n];
  const eR = ConvLValueExpr(cenv, env, e);
  return mkUnionFieldGet(projR, tyargsR, eR);
}
export function ConvClassOrRecdFieldGet(cenv, env, m, rfref, tyargs, args) {
  return EmitDebugInfoIfNecessary(cenv, env, m, ConvClassOrRecdFieldGetCore(cenv, env, m, rfref, tyargs, args));
}

function ConvClassOrRecdFieldGetCore(cenv, env, m, rfref, tyargs, args) {
  const tyargsR = ConvTypes(cenv, env, m, tyargs);
  const argsR = ConvLValueArgs(cenv, env, args);
  const projR = ConvRecdFieldRef(cenv, rfref, m);

  if (rfref.TyconRef.IsRecordTycon) {
    return mkRecdGet(projR, tyargsR, argsR);
  } else {
    const fspec = rfref.RecdField;
    const tcref = rfref.TyconRef;

    if (useGenuineField(tcref.Deref, fspec)) {
      return mkFieldGet(projR, tyargsR, argsR);
    } else {
      const envinner = BindFormalTypars(env, tcref.TyparsNoRange);
      const propRetTypeR = ConvType(cenv, envinner, m, fspec.FormalType);
      return mkPropGet([projR[0], projR[1], propRetTypeR, new List()], tyargsR, argsR);
    }
  }
}

export function ConvLetBind(cenv, env, bind) {
  const matchValue = bind.Expr;
  const $var18 = matchValue.tag === 11 ? matchValue.data[0].tag === 22 ? matchValue.data[0].data[0].tail != null ? matchValue.data[0].data[0].head.tag === 66 ? matchValue.data[0].data[0].tail.tail == null ? matchValue.data[1].tail != null ? matchValue.data[1].tail.tail == null ? matchValue.data[2].tail != null ? matchValue.data[2].tail.tail == null ? [0, matchValue.data[2].head, matchValue.data[1].head] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : matchValue.tag === 1 ? bind.Var.IsCompilerGenerated ? [1] : [2] : [2];

  switch ($var18[0]) {
    case 0:
      return [null, BindIsInstVal(env, bind.Var, $var18[2], $var18[1])];

    case 1:
      return [null, BindSubstVal(env, bind.Var, bind.Expr)];

    case 2:
      const $var19 = matchValue.tag === 11 ? matchValue.data[0].tag === 15 ? matchValue.data[2].tail != null ? matchValue.data[2].tail.tail == null ? [0, matchValue.data[2].head] : [1] : [1] : [1] : [1];

      switch ($var19[0]) {
        case 0:
          return [null, BindSubstVal(env, bind.Var, $var19[1])];

        case 1:
          const v = bind.Var;
          const vR = ConvVal(cenv, env, v);
          const rhsR = ConvExpr(cenv, env, bind.Expr);
          const envinner = BindVal(env, v);
          return [[vR, rhsR], envinner];
      }

  }
}
export function ConvLValueArgs(cenv, env, args) {
  if (args.tail == null) {
    return new List();
  } else {
    return new List(ConvLValueExpr(cenv, env, args.head), ConvExprs(cenv, env, args.tail));
  }
}
export function ConvLValueExpr(cenv, env, expr) {
  return EmitDebugInfoIfNecessary(cenv, env, Expr_get_Range.bind(expr)(), ConvLValueExprCore(cenv, env, expr));
}
export function ConvLValueExprCore(cenv, env, expr) {
  if (expr.tag === 11) {
    const matchValue = [expr.data[0], expr.data[2], expr.data[1]];
    const $var20 = matchValue[0].tag === 30 ? matchValue[0].data[0].tag === 0 ? [0, matchValue[0].data[1]] : [6] : matchValue[0].tag === 13 ? [1, matchValue[0].data] : matchValue[0].tag === 17 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [2, matchValue[1].head, matchValue[0].data[1], matchValue[0].data[0]] : [6] : [6] : matchValue[0].tag === 22 ? matchValue[0].data[0].tail != null ? matchValue[0].data[0].head.tag === 62 ? matchValue[0].data[0].tail.tail == null ? [3, matchValue[0].data[1], matchValue[0].data[0].head.data] : [6] : matchValue[0].data[0].head.tag === 61 ? matchValue[0].data[0].tail.tail == null ? [4, matchValue[0].data[1], matchValue[0].data[0].head.data] : [6] : matchValue[0].data[0].head.tag === 80 ? matchValue[0].data[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [5, matchValue[0].data[0].head.data[1], matchValue[0].data[0].head.data[0], matchValue[0].data[0].head.data[3], matchValue[1].head, matchValue[2].head, matchValue[1].tail, matchValue[0].data[0].head.data[2]] : [6] : [6] : [6] : [6] : [6] : [6] : [6];

    switch ($var20[0]) {
      case 0:
        return ConvValRef(false, cenv, env, expr.data[3], $var20[1], new List());

      case 1:
        return ConvClassOrRecdFieldGet(cenv, env, expr.data[3], $var20[1], expr.data[1], expr.data[2]);

      case 2:
        return ConvUnionFieldGet(cenv, env, expr.data[3], $var20[3], $var20[2], expr.data[1], $var20[1]);

      case 3:
        return ConvLdfld(cenv, env, expr.data[3], $var20[2], expr.data[1], expr.data[2]);

      case 4:
        return ConvLdfld(cenv, env, expr.data[3], $var20[2], expr.data[1], expr.data[2]);

      case 5:
        const matchValue_1 = [$var20[7].Rank, $var20[6]];
        const $var21 = matchValue_1[0] === 1 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? [0, matchValue_1[1].head] : [4] : [4] : matchValue_1[0] === 2 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail != null ? matchValue_1[1].tail.tail.tail == null ? [1, matchValue_1[1].head, matchValue_1[1].tail.head] : [4] : [4] : [4] : matchValue_1[0] === 3 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail != null ? matchValue_1[1].tail.tail.tail != null ? matchValue_1[1].tail.tail.tail.tail == null ? [2, matchValue_1[1].head, matchValue_1[1].tail.head, matchValue_1[1].tail.tail.head] : [4] : [4] : [4] : [4] : matchValue_1[0] === 4 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail != null ? matchValue_1[1].tail.tail.tail != null ? matchValue_1[1].tail.tail.tail.tail != null ? matchValue_1[1].tail.tail.tail.tail.tail == null ? [3, matchValue_1[1].head, matchValue_1[1].tail.head, matchValue_1[1].tail.tail.head, matchValue_1[1].tail.tail.tail.head] : [4] : [4] : [4] : [4] : [4] : [4];

        switch ($var21[0]) {
          case 0:
            return ConvExpr(cenv, env, mkCallArrayGet(cenv.g, expr.data[3], $var20[5], $var20[4], $var21[1]));

          case 1:
            return ConvExpr(cenv, env, mkCallArray2DGet(cenv.g, expr.data[3], $var20[5], $var20[4], $var21[1], $var21[2]));

          case 2:
            return ConvExpr(cenv, env, mkCallArray3DGet(cenv.g, expr.data[3], $var20[5], $var20[4], $var21[1], $var21[2], $var21[3]));

          case 3:
            return ConvExpr(cenv, env, mkCallArray4DGet(cenv.g, expr.data[3], $var20[5], $var20[4], $var21[1], $var21[2], $var21[3], $var21[4]));

          case 4:
            return ConvExpr(cenv, env, expr);
        }

      case 6:
        return ConvExpr(cenv, env, expr);
    }
  } else {
    return ConvExpr(cenv, env, expr);
  }
}
export function ConvObjectModelCall(cenv, env, m, callInfo_0, callInfo_1, callInfo_2, callInfo_3, callInfo_4, callInfo_5, callInfo_6, callInfo_7, callInfo_8, callInfo_9) {
  const callInfo = [callInfo_0, callInfo_1, callInfo_2, callInfo_3, callInfo_4, callInfo_5, callInfo_6, callInfo_7, callInfo_8, callInfo_9];
  return EmitDebugInfoIfNecessary(cenv, env, m, ConvObjectModelCallCore(cenv, env, m, callInfo[0], callInfo[1], callInfo[2], callInfo[3], callInfo[4], callInfo[5], callInfo[6], callInfo[7], callInfo[8], callInfo[9]));
}
export function ConvObjectModelCallCore(cenv, env, m, isPropGet, isPropSet, isNewObj, parentTyconR, methArgTypesR, methRetTypeR, methName, tyargs, numGenericArgs, callArgs) {
  const tyargsR = ConvTypes(cenv, env, m, tyargs);
  const callArgsR = ConvLValueArgs(cenv, env, callArgs);

  if (isPropGet ? true : isPropSet) {
    const propName = ChopPropertyName(methName);

    if (isPropGet) {
      return mkPropGet([parentTyconR, propName, methRetTypeR, methArgTypesR], tyargsR, callArgsR);
    } else {
      const patternInput = List_1.frontAndBack(methArgTypesR);
      return mkPropSet([parentTyconR, propName, patternInput[1], patternInput[0]], tyargsR, callArgsR);
    }
  } else if (isNewObj) {
    const ctorR = new CtorData(parentTyconR, methArgTypesR);
    return mkCtorCall(ctorR, tyargsR, callArgsR);
  } else {
    const methR = new MethodData(parentTyconR, methName, methArgTypesR, methRetTypeR, numGenericArgs);
    return mkMethodCall(methR, tyargsR, callArgsR);
  }
}
export function ConvModuleValueApp(cenv, env, m, vref, tyargs, args) {
  return EmitDebugInfoIfNecessary(cenv, env, m, ConvModuleValueAppCore(cenv, env, m, vref, tyargs, args));
}
export function ConvModuleValueAppCore(cenv, env, m, vref, tyargs, args) {
  const matchValue = vref.DeclaringEntity;

  if (matchValue.tag === 0) {
    const isProperty = IsCompiledAsStaticProperty(cenv.g, vref.Deref);
    const tcrefR = ConvTyconRef(cenv, matchValue.data, m);
    const tyargsR = ConvTypes(cenv, env, m, tyargs);
    const nm = vref.CompiledName;
    const argsR = map_1(function (args_1) {
      return ConvExprs(cenv, env, args_1);
    }, args);
    return mkModuleValueApp(tcrefR, nm, isProperty, tyargsR, argsR);
  } else {
    throw new Error("ConvModuleValueApp");
  }
}
export function ConvExprs(cenv, env, args) {
  return map_1(function (expr) {
    return ConvExpr(cenv, env, expr);
  }, args);
}
export function ConvValRef(holeOk, cenv, env, m, vref, tyargs) {
  return EmitDebugInfoIfNecessary(cenv, env, m, ConvValRefCore(holeOk, cenv, env, m, vref, tyargs));
}

function ConvValRefCore(holeOk, cenv, env, m, vref, tyargs) {
  const v = vref.Deref;

  if (env.isinstVals.ContainsVal(v)) {
    const patternInput = env.isinstVals.get_Item(v);
    return ConvExpr(cenv, env, mkCallUnbox(cenv.g, m, patternInput[0], patternInput[1]));
  } else if (env.substVals.ContainsVal(v)) {
    const e = env.substVals.get_Item(v);
    return ConvExpr(cenv, env, e);
  } else if (env.vs.ContainsVal(v)) {
    if (!(tyargs.tail == null)) {
      wfail(new InternalError("ignoring generic application of local quoted variable", m));
    }

    return mkVar(env.vs.get_Item(v));
  } else if (v.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(0)) ? cenv.isReflectedDefinition.Equals(new IsReflectedDefinition(0)) : false) {
    return mkThisVar(ConvType(cenv, env, m, v.Type));
  } else {
    const vty = v.Type;
    const matchValue = v.DeclaringEntity;

    if (matchValue.tag === 0) {
      return ConvModuleValueApp(cenv, env, m, vref, tyargs, new List());
    } else {
      if (!holeOk) {
        wfail(new _Error(SR.crefNoSetOfHole(), m));
      }

      const idx = cenv.exprSplices.length | 0;
      cenv.exprSplices.push([mkCallLiftValueWithName(cenv.g, m, vty, v.LogicalName, exprForValRef(m, vref)), m]);
      return mkHole(ConvType(cenv, env, m, vty), idx);
    }
  }
}

export function ConvUnionCaseRef(cenv, ucref, m) {
  const ucgtypR = ConvTyconRef(cenv, ucref.TyconRef, m);
  const nm = function (arg00, arg10) {
    return cenv.g.unionCaseRefEq(arg00, arg10);
  }(ucref, cenv.g.cons_ucref) ? "Cons" : function (arg00_1, arg10_1) {
    return cenv.g.unionCaseRefEq(arg00_1, arg10_1);
  }(ucref, cenv.g.nil_ucref) ? "Empty" : ucref.CaseName;
  return [ucgtypR, nm];
}
export function ConvRecdFieldRef(cenv, rfref, m) {
  const typR = ConvTyconRef(cenv, rfref.TyconRef, m);
  const nm = useGenuineField(rfref.TyconRef.Deref, rfref.RecdField) ? ComputeFieldName(rfref.TyconRef.Deref, rfref.RecdField) : rfref.FieldName;
  return [typR, nm];
}
export function ConvVal(cenv, env, v) {
  const tyR = ConvType(cenv, env, v.Range, v.Type);
  return freshVar(v.CompiledName, tyR, v.IsMutable);
}
export function ConvTyparRef(cenv, env, m, tp) {
  const matchValue = tryFind(tp.Stamp, env.tyvs);

  if (matchValue == null) {
    const matchValue_1 = tryFindIndex(function (tupledArg) {
      return typarEq(tp, tupledArg[0]);
    }, cenv.typeSplices);

    if (matchValue_1 == null) {
      const idx = cenv.typeSplices.length | 0;
      cenv.typeSplices.push([tp, m]);
      return idx | 0;
    } else {
      return getValue(matchValue_1) | 0;
    }
  } else {
    return getValue(matchValue) | 0;
  }
}
export function FilterMeasureTyargs(tys) {
  return filter(function (ty) {
    return ty.tag === 6 ? false : true;
  }, tys);
}
export function ConvType(cenv, env, m, typ) {
  var tyarg;

  ConvType: while (true) {
    const matchValue = stripTyEqnsAndMeasureEqns(cenv.g, typ);
    const $var22 = matchValue.tag === 1 ? matchValue.data[1].tail != null ? matchValue.data[1].tail.tail == null ? (tyarg = matchValue.data[1].head, isArrayTyconRef(cenv.g, matchValue.data[0])) ? [0, matchValue.data[0], matchValue.data[1].head] : [1] : [1] : [1] : [1];

    switch ($var22[0]) {
      case 0:
        return mkArrayTy([rankOfArrayTyconRef(cenv.g, $var22[1]), ConvType(cenv, env, m, $var22[2])]);

      case 1:
        const $var23 = matchValue.tag === 4 ? [0, matchValue.data[0].data[0], matchValue.data[1]] : matchValue.tag === 1 ? [0, matchValue.data[0], matchValue.data[1]] : matchValue.tag === 3 ? [1] : matchValue.tag === 2 ? [2] : matchValue.tag === 5 ? [3] : matchValue.tag === 0 ? [4] : [5];

        switch ($var23[0]) {
          case 0:
            return mkILNamedTy([ConvTyconRef(cenv, $var23[1], m), ConvTypes(cenv, env, m, $var23[2])]);

          case 1:
            return mkFunTy([ConvType(cenv, env, m, matchValue.data[0]), ConvType(cenv, env, m, matchValue.data[1])]);

          case 2:
            const $var27 = cenv;
            env = env;
            m = m;
            typ = mkCompiledTupleTy(cenv.g, evalTupInfoIsStruct(matchValue.data[0]), matchValue.data[1]);
            cenv = $var27;
            continue ConvType;

          case 3:
            return mkVarTy(ConvTyparRef(cenv, env, m, matchValue.data));

          case 4:
            return wfail(new _Error(SR.crefNoInnerGenericsInQuotations(), m));

          case 5:
            return wfail(new _Error(SR.crefQuotationsCantContainThisType(), m));
        }

    }
  }
}
export function ConvTypes(cenv, env, m, typs) {
  return map_1(function (typ) {
    return ConvType(cenv, env, m, typ);
  }, FilterMeasureTyargs(typs));
}
export function ConvConst(cenv, env, m, c, ty) {
  const matchValue = TryEliminateDesugaredConstants(cenv.g, m, c);

  if (matchValue == null) {
    const tyR = ConvType(cenv, env, m, ty);

    switch (c.tag) {
      case 0:
        return mkBool(c.data, tyR);

      case 1:
        return mkSByte(c.data, tyR);

      case 2:
        return mkByte_1(c.data, tyR);

      case 3:
        return mkInt16(c.data, tyR);

      case 4:
        return mkUInt16_1(c.data, tyR);

      case 5:
        return mkInt32(c.data, tyR);

      case 6:
        return mkUInt32(c.data, tyR);

      case 7:
        return mkInt64(c.data, tyR);

      case 8:
        return mkUInt64(c.data, tyR);

      case 12:
        return mkDouble(c.data, tyR);

      case 11:
        return mkSingle(c.data, tyR);

      case 14:
        return mkString_1(c.data, tyR);

      case 13:
        return mkChar(c.data, tyR);

      case 16:
        return mkUnit();

      case 17:
        if (isRefTy(cenv.g, ty)) {
          return mkNull(tyR);
        } else {
          return mkDefaultValue(tyR);
        }

      default:
        return wfail(new _Error(SR.crefQuotationsCantContainThisConstant(), m));
    }
  } else {
    return ConvExpr(cenv, env, getValue(matchValue));
  }
}
export function ConvDecisionTree(cenv, env, tgs, typR, x) {
  ConvDecisionTree: while (true) {
    if (x.tag === 1) {
      const patternInput = tgs[x.data[1]];
      const args = reverse(x.data[0]);
      const vars = reverse(patternInput.data[0]);
      const varsR = map_1(function (v) {
        return ConvVal(cenv, env, v);
      }, vars);
      const targetR = ConvExpr(cenv, BindVals(env, vars), patternInput.data[1]);
      return foldBack2(function (vR, arg, acc) {
        return mkLet([vR, ConvExpr(cenv, env, arg)], acc);
      }, varsR, args, targetR);
    } else if (x.tag === 2) {
      const matchValue = ConvLetBind(cenv, env, x.data[0]);

      if (matchValue[0] != null) {
        const bindR = getValue(matchValue[0]);
        return mkLet(bindR, ConvDecisionTree(cenv, matchValue[1], tgs, typR, x.data[1]));
      } else {
        cenv = cenv;
        env = matchValue[1];
        tgs = tgs;
        typR = typR;
        x = x.data[1];
        continue ConvDecisionTree;
      }
    } else {
      const acc_1 = x.data[2] == null ? wfail(new _Error(SR.crefQuotationsCantContainThisPatternMatch(), x.data[3])) : ConvDecisionTree(cenv, env, tgs, typR, getValue(x.data[2]));
      const converted = foldBack(function (_arg1, acc_2) {
        if (_arg1.data[0].tag === 2) {
          if (_arg1.data[0].data.tag === 0) {
            if (_arg1.data[0].data.data) {
              const e1R = ConvExpr(cenv, env, x.data[0]);
              return mkCond(e1R, ConvDecisionTree(cenv, env, tgs, typR, _arg1.data[1]), acc_2);
            } else {
              const e1R_1 = ConvExpr(cenv, env, x.data[0]);
              return mkCond(e1R_1, acc_2, ConvDecisionTree(cenv, env, tgs, typR, _arg1.data[1]));
            }
          } else {
            const ty = tyOfExpr(cenv.g, x.data[0]);
            const eq = mkCallEqualsOperator(cenv.g, x.data[3], ty, x.data[0], new Expr(0, [_arg1.data[0].data, x.data[3], ty]));
            const eqR = ConvExpr(cenv, env, eq);
            return mkCond(eqR, ConvDecisionTree(cenv, env, tgs, typR, _arg1.data[1]), acc_2);
          }
        } else if (_arg1.data[0].tag === 3) {
          const $var24 = x.data[0].tag === 1 ? env.isinstVals.ContainsVal(x.data[0].data[0].Deref) ? [0, x.data[0].data[0]] : [1] : [1];

          switch ($var24[0]) {
            case 0:
              const patternInput_1 = env.isinstVals.get_Item($var24[1].Deref);
              const tyR = ConvType(cenv, env, x.data[3], patternInput_1[0]);
              const eR = ConvExpr(cenv, env, patternInput_1[1]);
              return mkCond(mkTypeTest(tyR, eR), acc_2, ConvDecisionTree(cenv, env, tgs, typR, _arg1.data[1]));

            case 1:
              const ty_1 = tyOfExpr(cenv.g, x.data[0]);
              const eq_1 = mkCallEqualsOperator(cenv.g, x.data[3], ty_1, x.data[0], new Expr(0, [new Const(17), x.data[3], ty_1]));
              const eqR_1 = ConvExpr(cenv, env, eq_1);
              return mkCond(eqR_1, ConvDecisionTree(cenv, env, tgs, typR, _arg1.data[1]), acc_2);
          }
        } else if (_arg1.data[0].tag === 4) {
          const e1R_2 = ConvExpr(cenv, env, x.data[0]);
          return mkCond(mkTypeTest(ConvType(cenv, env, x.data[3], _arg1.data[0].data[1]), e1R_2), ConvDecisionTree(cenv, env, tgs, typR, _arg1.data[1]), acc_2);
        } else if (_arg1.data[0].tag === 5) {
          return wfail(new InternalError("DecisionTreeTest.ActivePatternCase test in quoted expression", x.data[3]));
        } else if (_arg1.data[0].tag === 1) {
          return wfail(new _Error(SR.crefQuotationsCantContainArrayPatternMatching(), x.data[3]));
        } else {
          const e1R_3 = ConvLValueExpr(cenv, env, x.data[0]);
          const ucR = ConvUnionCaseRef(cenv, _arg1.data[0].data[0], x.data[3]);
          const tyargsR = ConvTypes(cenv, env, x.data[3], _arg1.data[0].data[1]);
          return mkCond(mkUnionCaseTagTest(ucR, tyargsR, e1R_3), ConvDecisionTree(cenv, env, tgs, typR, _arg1.data[1]), acc_2);
        }
      }, x.data[1], acc_1);
      return EmitDebugInfoIfNecessary(cenv, env, x.data[3], converted);
    }
  }
}
export function IsILTypeRefStaticLinkLocal(cenv, m, tr) {
  cenv;
  m;
  const matchValue = tr.Scope;
  return false;
}
export function ConvILTypeRefUnadjusted(cenv, m, tr) {
  const trefAdjusted = IsILTypeRefStaticLinkLocal(cenv, m, tr) ? ILTypeRef.Create(new ILScopeRef(0), tr.Enclosing, tr.Name) : tr;
  return ConvILTypeRef(cenv, trefAdjusted);
}
export function ConvILTypeRef(cenv, tr) {
  if (cenv.quotationFormat.tag === 1) {
    let assref;
    const matchValue = tr.Scope;

    if (matchValue.tag === 0) {
      assref = ".";
    } else {
      assref = tr.Scope.QualifiedName;
    }

    return new NamedTypeData(1, [tr.BasicQualifiedName, assref]);
  } else {
    let idx_1;
    const matchValue_1 = tryGetValue(cenv.referencedTypeDefsTable, tr, 0);

    if (matchValue_1[0]) {
      idx_1 = matchValue_1[1] | 0;
    } else {
      const idx = cenv.referencedTypeDefs.length | 0;
      cenv.referencedTypeDefs.push(tr);
      cenv.referencedTypeDefsTable.set(tr, idx);
      idx_1 = idx | 0;
    }

    return new NamedTypeData(0, idx_1);
  }
}
export function ConvVoidType(cenv, m) {
  return mkILNamedTy([ConvTyconRef(cenv, cenv.g.system_Void_tcref, m), new List()]);
}
export function ConvILType(cenv, env, m, ty) {
  switch (ty.tag) {
    case 2:
      return mkILNamedTy([ConvILTypeRefUnadjusted(cenv, m, ty.data.TypeRef), map_1(function (ty_1) {
        return ConvILType(cenv, env, m, ty_1);
      }, ty.data.GenericArgs)]);

    case 1:
      return mkArrayTy([ty.data[0].Rank, ConvILType(cenv, env, m, ty.data[1])]);

    case 7:
      return mkVarTy(~~ty.data);

    case 0:
      return ConvVoidType(cenv, m);

    case 4:
    case 5:
    case 8:
    case 6:
      return wfail(new _Error(SR.crefQuotationsCantContainThisType(), m));

    default:
      return mkILNamedTy([ConvILTypeRefUnadjusted(cenv, m, ty.data.TypeRef), map_1(function (ty_2) {
        return ConvILType(cenv, env, m, ty_2);
      }, ty.data.GenericArgs)]);
  }
}
export function ConvTyconRef(cenv, tcref, m) {
  const repr = tcref.CompiledRepresentation;

  if (repr.tag === 0) {
    return ConvILTypeRefUnadjusted(cenv, m, repr.data[0]);
  } else {
    const $var25 = repr.data.tag === 3 ? [0, repr.data.data] : repr.data.tag === 2 ? [0, repr.data.data] : [1];

    switch ($var25[0]) {
      case 0:
        return ConvILTypeRef(cenv, $var25[1].TypeRef);

      case 1:
        return wfail(new _Error(SR.crefQuotationsCantContainThisType(), m));
    }
  }
}
export function ConvReturnType(cenv, envinner, m, retTy) {
  if (retTy != null) {
    return ConvType(cenv, envinner, m, getValue(retTy));
  } else {
    return ConvVoidType(cenv, m);
  }
}
export function ConvExprPublic(cenv, env, e) {
  let astExpr_1;
  const astExpr = ConvExpr(cenv, env, e);
  cenv.emitDebugInfoInQuotations = true;
  astExpr_1 = EmitDebugInfoIfNecessary(cenv, env, Expr_get_Range.bind(e)(), astExpr);
  return astExpr_1;
}
export function ConvMethodBase(cenv, env, methName, v) {
  const m = v.Range;
  const parentTyconR = ConvTyconRef(cenv, v.TopValDeclaringEntity, m);
  const matchValue = v.MemberInfo;
  const $var26 = matchValue != null ? !v.IsExtensionMember ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var26[0]) {
    case 0:
      const vref = mkLocalValRef(v);
      const patternInput = GetTypeOfMemberInMemberForm(cenv.g, vref);
      const numEnclTypeArgs = vref.MemberApparentEntity.TyparsNoRange.length | 0;
      const argTys = map_1(function (tuple) {
        return tuple[0];
      }, concat(patternInput[1]));
      const isNewObj = $var26[1].MemberFlags.MemberKind.Equals(new MemberKind(1));
      const envinner = BindFormalTypars(env, patternInput[0]);
      const methArgTypesR = ConvTypes(cenv, envinner, m, argTys);
      const methRetTypeR = ConvReturnType(cenv, envinner, m, patternInput[2]);
      const numGenericArgs = patternInput[0].length - numEnclTypeArgs | 0;

      if (isNewObj) {
        return new MethodBaseData(2, new CtorData(parentTyconR, methArgTypesR));
      } else {
        return new MethodBaseData(1, new MethodData(parentTyconR, methName, methArgTypesR, methRetTypeR, numGenericArgs));
      }

    case 1:
      if (v.IsExtensionMember) {
        const patternInput_1 = GetTopValTypeInCompiledForm(cenv.g, getValue(v.ValReprInfo), v.Type, v.Range);
        const argTys_1 = map_1(function (tuple_1) {
          return tuple_1[0];
        }, concat(patternInput_1[1]));
        const envinner_1 = BindFormalTypars(env, patternInput_1[0]);
        const methArgTypesR_1 = ConvTypes(cenv, envinner_1, m, argTys_1);
        const methRetTypeR_1 = ConvReturnType(cenv, envinner_1, m, patternInput_1[2]);
        const numGenericArgs_1 = patternInput_1[0].length | 0;
        return new MethodBaseData(1, new MethodData(parentTyconR, methName, methArgTypesR_1, methRetTypeR_1, numGenericArgs_1));
      } else {
        return new MethodBaseData(0, new ModuleDefnData(parentTyconR, methName, IsCompiledAsStaticProperty(cenv.g, v)));
      }

  }
}