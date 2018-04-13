import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { AllowTypeDirectedDetupling, InferArityOfExprBinding, TryEliminateDesugaredConstants, tryMkForallTy, mkFunTy, mkRefTupledTy, mkIteratedFunTy, generalizeTypars, generalizedTyconRef, mkRefCellContentsRef, mkRecdFieldGetAddrViaExprAddr, mkOne, mkReraiseLibCall, typeEquiv, mkCoerceExpr, stripExnEqns, mkCallRaise, mkCallToCharOperator, mkCallArraySet, mkCallArrayLength, destArrayTy, mkCallNotEqualsOperator, mkNull, mkCallTypeOf, mkCallHash, mkCallTypeTest, mkCallUnbox, mkCallBox, mkAnyTupledTy, returnTyOfMethod, GetFSharpViewOfReturnType, mkLambdas, MultiLambdaToTupledLambda, valsOfBinds, isDelegateTy, $7C$InnerExprPat$7C$ as _InnerExprPat_, stripExpr, NormalizeAndAdjustPossibleSubsumptionExprs, OptimizeForExpressionOptions, DetectAndOptimizeForExpression, MakeApplicationAndBetaReduce, AdjustValForExpectedArity, tryDestRefTupleExpr, GetTopValTypeInFSharpForm, GetTypeOfMemberInFSharpForm, GetMemberCallInfo, tyOfExpr, Expr$2E$get_Range as Expr_get_Range, mkCallArray4DGet, mkCallArray3DGet, mkCallArray2DGet, mkCallArrayGet, mkAsmExpr, mkUnionCaseFieldGetProvenViaExprAddr, mkRecdFieldGetViaExprAddr, mkStaticRecdFieldGet, exprForValRef, mkAppTy, mkCallToIntOperator, tyconRefEq, mkCallToUIntPtrChecked, mkCallToIntPtrChecked, mkCallToUInt64Checked, mkCallToInt64Checked, mkCallToUInt32Checked, mkCallToInt32Checked, mkCallToUInt16Checked, mkCallToInt16Checked, mkCallToByteChecked, mkCallToSByteChecked, mkCallToUIntPtrOperator, mkCallToIntPtrOperator, mkCallToDoubleOperator, mkCallToSingleOperator, mkCallToUInt64Operator, mkCallToInt64Operator, mkCallToUInt32Operator, mkCallToInt32Operator, mkCallToUInt16Operator, mkCallToInt16Operator, mkCallToByteOperator, mkCallToSByteOperator, mkCallShiftRightOperator, mkCallShiftLeftOperator, mkCallBitwiseXorOperator, mkCallBitwiseOrOperator, mkCallBitwiseAndOperator, mkCallGreaterThanOperator, mkCallLessThanOperator, mkCallEqualsOperator, mkCallModulusOperator, mkCallDivisionOperator, mkCallMultiplyChecked, mkCallMultiplyOperator, mkCallSubtractionChecked, mkCallSubtractionOperator, mkCallAdditionChecked, mkCallAdditionOperator, mkCallUnaryNotOperator, mkCallUnaryNegOperator, ValMap } from "../fsharp/TastOps";
import { equals, Any, Option, toString, equalsRecords, Tuple, makeGeneric, Unit } from "../fable-core/Util";
import { add, create } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import Long from "../fable-core/Long";
import { FSharpEntity, SymbolEnv, FSharpAbstractSignature, FSharpUnionCase, FSharpField, FSharpType, FSharpMemberOrFunctionOrValue, FSharpGenericParameter } from "./Symbols";
import { mkLocalEntityRef, Const, mkLocalValRef, ValBaseOrThisInfo, mkNonLocalValRef, mkNonLocalEntityRef, ValLinkagePartialKey, ValLinkageFullKey, NewRigidTypar, UnionCaseRef, RecdFieldRef, VRefLocal, ForLoopStyle, mkRecdFieldRef, arityOfVal, Expr, TType } from "../fsharp/tast";
import Comparer from "../fable-core/Comparer";
import { foldBack, sum, range as range_1, tryFind, filter as filter_1, zip, map2, exists2, item, collect, map as map_1, singleton, append as append_1, delay, toList, fold } from "../fable-core/Seq";
import { range } from "../fsharp/range";
import { join, toFail, startsWith, printf, toText } from "../fable-core/String";
import { reverse, filter, concat, map, append, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { MemberFlags } from "../fsharp/ast";
import { defaultArg, makeSome, getValue } from "../fable-core/Option";
import { ImportILTypeRef } from "../fsharp/import";
import { unscopeILType, resolveILMethodRefWithRescope, ILTypeRef, mkNormalLdsfld, mkNormalLdfld } from "../absil/il";
import { $7C$SimpleArrayLoopBody$7C$_$7C$ as _SimpleArrayLoopBody___, $7C$SimpleArrayLoopUpperBound$7C$_$7C$ as _SimpleArrayLoopUpperBound___, $7C$ModuleValueOrMemberUse$7C$_$7C$ as _ModuleValueOrMemberUse___, $7C$ObjectInitializationCheck$7C$_$7C$ as _ObjectInitializationCheck___ } from "../fsharp/QuotationTranslator";
import { List as List_1 } from "../absil/illib";
import { IteratedAdjustArityOfLambda, ChooseTyparSolutionsForFreeChoiceTypars } from "../fsharp/TypeRelations";
import { ImportReturnTypeFromMetaData, ImportILTypeFromMetadata, MethInfo } from "../fsharp/infos";
import { ChopPropertyName } from "../fsharp/PrettyNaming";
import CurriedLambda from "../fable-core/CurriedLambda";
export const ExprTranslationImpl = function (__exports) {
  const nonNil = __exports.nonNil = function (x) {
    return !(x.tail == null);
  };

  const ExprTranslationEnv = __exports.ExprTranslationEnv = class ExprTranslationEnv {
    constructor(vs, tyvs, isinstVals, substVals) {
      this.vs = vs;
      this.tyvs = tyvs;
      this.isinstVals = isinstVals;
      this.substVals = substVals;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.ExprTranslationImpl.ExprTranslationEnv",
        interfaces: ["FSharpRecord"],
        properties: {
          vs: makeGeneric(ValMap, {
            T: Unit
          }),
          tyvs: makeGeneric(_Map, {
            Key: Long,
            Value: FSharpGenericParameter
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
      return new ExprTranslationEnv(ValMap.Empty, create(null, new Comparer((x, y) => x.CompareTo(y))), ValMap.Empty, ValMap.Empty);
    }

    BindTypar(v, gp) {
      const tyvs = add(v.Stamp, gp, this.tyvs);
      return new ExprTranslationEnv(this.vs, tyvs, this.isinstVals, this.substVals);
    }

    BindTypars(vs) {
      return fold((env, v) => (tupledArg => env.BindTypar(tupledArg[0], tupledArg[1]))(v), this, vs);
    }

    BindVal(v) {
      return new ExprTranslationEnv(((arg00, arg10) => this.vs.Add(arg00, null))(v, null), this.tyvs, this.isinstVals, this.substVals);
    }

    BindIsInstVal(v, ty, e) {
      const isinstVals = ((arg00, arg10) => this.isinstVals.Add(arg00, arg10))(v, [ty, e]);

      return new ExprTranslationEnv(this.vs, this.tyvs, isinstVals, this.substVals);
    }

    BindSubstVal(v, e) {
      const substVals = ((arg00, arg10) => this.substVals.Add(arg00, arg10))(v, e);

      return new ExprTranslationEnv(this.vs, this.tyvs, this.isinstVals, substVals);
    }

    BindVals(vs) {
      return fold((env, v) => env.BindVal(v), this, vs);
    }

    BindCurriedVals(vsl) {
      return fold((env, vs) => env.BindVals(vs), this, vsl);
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.ExprTranslationImpl.ExprTranslationEnv", ExprTranslationEnv);
  const IgnoringPartOfQuotedTermWarning = __exports.IgnoringPartOfQuotedTermWarning = class IgnoringPartOfQuotedTermWarning extends Error {
    constructor(data0, data1) {
      super();
      Object.setPrototypeOf(this, IgnoringPartOfQuotedTermWarning.prototype);
      this.Data0 = data0;
      this.Data1 = data1;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.ExprTranslationImpl.IgnoringPartOfQuotedTermWarning",
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

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.ExprTranslationImpl.IgnoringPartOfQuotedTermWarning", IgnoringPartOfQuotedTermWarning);

  const wfail = __exports.wfail = function (msg, m) {
    throw new Error(msg + toText(printf(" at %s"))(toString(m)));
  };

  return __exports;
}({});
export class E {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.E",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Value", FSharpMemberOrFunctionOrValue], ["ThisValue", FSharpType], ["BaseValue", FSharpType], ["Application", FSharpExpr, makeGeneric(List, {
        T: FSharpType
      }), makeGeneric(List, {
        T: FSharpExpr
      })], ["Lambda", FSharpMemberOrFunctionOrValue, FSharpExpr], ["TypeLambda", makeGeneric(List, {
        T: FSharpGenericParameter
      }), FSharpExpr], ["Quote", FSharpExpr], ["IfThenElse", FSharpExpr, FSharpExpr, FSharpExpr], ["DecisionTree", FSharpExpr, makeGeneric(List, {
        T: Tuple([makeGeneric(List, {
          T: FSharpMemberOrFunctionOrValue
        }), FSharpExpr])
      })], ["DecisionTreeSuccess", "number", makeGeneric(List, {
        T: FSharpExpr
      })], ["Call", Option(FSharpExpr), FSharpMemberOrFunctionOrValue, makeGeneric(List, {
        T: FSharpType
      }), makeGeneric(List, {
        T: FSharpType
      }), makeGeneric(List, {
        T: FSharpExpr
      })], ["NewObject", FSharpMemberOrFunctionOrValue, makeGeneric(List, {
        T: FSharpType
      }), makeGeneric(List, {
        T: FSharpExpr
      })], ["LetRec", makeGeneric(List, {
        T: Tuple([FSharpMemberOrFunctionOrValue, FSharpExpr])
      }), FSharpExpr], ["Let", Tuple([FSharpMemberOrFunctionOrValue, FSharpExpr]), FSharpExpr], ["NewRecord", FSharpType, makeGeneric(List, {
        T: FSharpExpr
      })], ["ObjectExpr", FSharpType, FSharpExpr, makeGeneric(List, {
        T: FSharpObjectExprOverride
      }), makeGeneric(List, {
        T: Tuple([FSharpType, makeGeneric(List, {
          T: FSharpObjectExprOverride
        })])
      })], ["FSharpFieldGet", Option(FSharpExpr), FSharpType, FSharpField], ["FSharpFieldSet", Option(FSharpExpr), FSharpType, FSharpField, FSharpExpr], ["NewUnionCase", FSharpType, FSharpUnionCase, makeGeneric(List, {
        T: FSharpExpr
      })], ["UnionCaseGet", FSharpExpr, FSharpType, FSharpUnionCase, FSharpField], ["UnionCaseSet", FSharpExpr, FSharpType, FSharpUnionCase, FSharpField, FSharpExpr], ["UnionCaseTag", FSharpExpr, FSharpType], ["UnionCaseTest", FSharpExpr, FSharpType, FSharpUnionCase], ["TraitCall", makeGeneric(List, {
        T: FSharpType
      }), "string", MemberFlags, makeGeneric(List, {
        T: FSharpType
      }), makeGeneric(List, {
        T: FSharpType
      }), makeGeneric(List, {
        T: FSharpExpr
      })], ["NewTuple", FSharpType, makeGeneric(List, {
        T: FSharpExpr
      })], ["TupleGet", FSharpType, "number", FSharpExpr], ["Coerce", FSharpType, FSharpExpr], ["NewArray", FSharpType, makeGeneric(List, {
        T: FSharpExpr
      })], ["TypeTest", FSharpType, FSharpExpr], ["AddressSet", FSharpExpr, FSharpExpr], ["ValueSet", FSharpMemberOrFunctionOrValue, FSharpExpr], ["Unused"], ["DefaultValue", FSharpType], ["Const", Any, FSharpType], ["AddressOf", FSharpExpr], ["Sequential", FSharpExpr, FSharpExpr], ["FastIntegerForLoop", FSharpExpr, FSharpExpr, FSharpExpr, "boolean"], ["WhileLoop", FSharpExpr, FSharpExpr], ["TryFinally", FSharpExpr, FSharpExpr], ["TryWith", FSharpExpr, FSharpMemberOrFunctionOrValue, FSharpExpr, FSharpMemberOrFunctionOrValue, FSharpExpr], ["NewDelegate", FSharpType, FSharpExpr], ["ILFieldGet", Option(FSharpExpr), FSharpType, "string"], ["ILFieldSet", Option(FSharpExpr), FSharpType, "string", FSharpExpr], ["ILAsm", "string", makeGeneric(List, {
        T: FSharpType
      }), makeGeneric(List, {
        T: FSharpExpr
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.E", E);
export class FSharpObjectExprOverride {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpObjectExprOverride",
      properties: {
        Body: FSharpExpr,
        CurriedParameterGroups: makeGeneric(List, {
          T: makeGeneric(List, {
            T: FSharpMemberOrFunctionOrValue
          })
        }),
        GenericParameters: makeGeneric(List, {
          T: FSharpGenericParameter
        }),
        Signature: FSharpAbstractSignature
      }
    };
  }

  constructor(sgn, gps, args, body) {
    this.sgn = sgn;
    this.gps = gps;
    this.args = args;
    this.body = body;
  }

  get Signature() {
    return this.sgn;
  }

  get GenericParameters() {
    return this.gps;
  }

  get CurriedParameterGroups() {
    return this.args;
  }

  get Body() {
    return this.body;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpObjectExprOverride", FSharpObjectExprOverride);
export class FSharpExpr {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpExpr",
      properties: {
        E: E,
        ImmediateSubExpressions: makeGeneric(List, {
          T: FSharpExpr
        }),
        Range: range,
        Type: FSharpType,
        cenv: SymbolEnv
      }
    };
  }

  constructor(cenv, f, e, m, ty) {
    this["cenv@118"] = cenv;
    this.f = f;
    this.e = e;
    this.m = m;
    this.ty = ty;
  }

  get Range() {
    return this.m;
  }

  get Type() {
    return FSharpType[".ctor"](this["cenv@118"], this.ty);
  }

  get cenv() {
    return this["cenv@118"];
  }

  get E() {
    return this.f != null ? getValue(this.f)().E : this.e;
  }

  ToString() {
    return toText(printf("%+A"))(this.E);
  }

  get ImmediateSubExpressions() {
    const matchValue = this.E;

    switch (matchValue.tag) {
      case 33:
        return new List();

      case 5:
        return ofArray([matchValue.data[1]]);

      case 4:
        return ofArray([matchValue.data[1]]);

      case 3:
        return new List(matchValue.data[0], matchValue.data[2]);

      case 7:
        return ofArray([matchValue.data[0], matchValue.data[1], matchValue.data[2]]);

      case 13:
        const bindingExpr = matchValue.data[0][1];
        const _bindingVar = matchValue.data[0][0];
        return ofArray([bindingExpr, matchValue.data[1]]);

      case 12:
        return append(map(tuple => tuple[1], matchValue.data[0]), ofArray([matchValue.data[1]]));

      case 14:
        return matchValue.data[1];

      case 18:
        return matchValue.data[2];

      case 24:
        return matchValue.data[1];

      case 25:
        return ofArray([matchValue.data[2]]);

      case 10:
        if (matchValue.data[0] != null) {
          return new List(getValue(matchValue.data[0]), matchValue.data[4]);
        } else {
          return matchValue.data[4];
        }

      case 11:
        return matchValue.data[2];

      case 16:
        if (matchValue.data[0] != null) {
          return ofArray([getValue(matchValue.data[0])]);
        } else {
          return new List();
        }

      case 17:
        if (matchValue.data[0] != null) {
          return ofArray([getValue(matchValue.data[0]), matchValue.data[3]]);
        } else {
          return ofArray([matchValue.data[3]]);
        }

      case 19:
        return ofArray([matchValue.data[0]]);

      case 21:
        return ofArray([matchValue.data[0]]);

      case 22:
        return ofArray([matchValue.data[0]]);

      case 27:
        return matchValue.data[1];

      case 26:
        return ofArray([matchValue.data[1]]);

      case 6:
        return ofArray([matchValue.data]);

      case 28:
        return ofArray([matchValue.data[1]]);

      case 35:
        return ofArray([matchValue.data[0], matchValue.data[1]]);

      case 36:
        return ofArray([matchValue.data[0], matchValue.data[1], matchValue.data[2]]);

      case 37:
        return ofArray([matchValue.data[0], matchValue.data[1]]);

      case 38:
        return ofArray([matchValue.data[0], matchValue.data[1]]);

      case 39:
        return ofArray([matchValue.data[0], matchValue.data[4]]);

      case 40:
        return ofArray([matchValue.data[1]]);

      case 32:
        return new List();

      case 29:
        return ofArray([matchValue.data[0], matchValue.data[1]]);

      case 30:
        return ofArray([matchValue.data[1]]);

      case 34:
        return ofArray([matchValue.data]);

      case 1:
        return new List();

      case 2:
        return new List();

      case 43:
        return matchValue.data[2];

      case 41:
        if (matchValue.data[0] != null) {
          return ofArray([getValue(matchValue.data[0])]);
        } else {
          return new List();
        }

      case 42:
        if (matchValue.data[0] != null) {
          return ofArray([getValue(matchValue.data[0]), matchValue.data[3]]);
        } else {
          return ofArray([matchValue.data[3]]);
        }

      case 15:
        return toList(delay(() => append_1(singleton(matchValue.data[1]), delay(() => append_1(map_1(m => m.Body, matchValue.data[2]), delay(() => collect(matchValue_1 => map_1(m_1 => m_1.Body, matchValue_1[1]), matchValue.data[3])))))));

      case 8:
        return toList(delay(() => append_1(singleton(matchValue.data[0]), delay(() => collect(matchValue_2 => singleton(matchValue_2[1]), matchValue.data[1])))));

      case 9:
        return matchValue.data[1];

      case 20:
        return toList(delay(() => append_1(singleton(matchValue.data[0]), delay(() => singleton(matchValue.data[4])))));

      case 23:
        return matchValue.data[5];

      case 31:
        return new List();

      default:
        return new List();
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpExpr", FSharpExpr);
export const FSharpExprConvert = function (__exports) {
  const IsStaticInitializationField = __exports.IsStaticInitializationField = function (rfref) {
    if ((rfref.RecdField.IsCompilerGenerated ? rfref.RecdField.IsStatic : false) ? rfref.RecdField.IsMutable : false) {
      return rfref.RecdField.Name.indexOf("init") === 0;
    } else {
      return false;
    }
  };

  const _StaticInitializationCheck___ = __exports["|StaticInitializationCheck|_|"] = function (e) {
    var rfref;
    const $var1 = e.tag === 9 ? e.data[2].tag === 0 ? e.data[2].data[0].tag === 11 ? e.data[2].data[0].data[0].tag === 22 ? e.data[2].data[0].data[0].data[0].tail != null ? e.data[2].data[0].data[0].data[0].head.tag === 9 ? e.data[2].data[0].data[0].data[0].tail.tail == null ? e.data[2].data[0].data[2].tail != null ? e.data[2].data[0].data[2].head.tag === 11 ? e.data[2].data[0].data[2].head.data[0].tag === 12 ? e.data[2].data[0].data[2].tail.tail != null ? e.data[2].data[0].data[2].tail.tail.tail == null ? (rfref = e.data[2].data[0].data[2].head.data[0].data, IsStaticInitializationField(rfref)) ? [0, e.data[2].data[0].data[2].head.data[0].data] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return makeSome();

      case 1:
        return null;
    }
  };

  const _StaticInitializationCount___ = __exports["|StaticInitializationCount|_|"] = function (e) {
    var rfref;
    const $var2 = e.tag === 11 ? e.data[0].tag === 11 ? (rfref = e.data[0].data, IsStaticInitializationField(rfref)) ? [0, e.data[0].data] : [1] : [1] : [1];

    switch ($var2[0]) {
      case 0:
        return makeSome();

      case 1:
        return null;
    }
  };

  const _ILUnaryOp___ = __exports["|ILUnaryOp|_|"] = function (e) {
    if (e.tag === 27) {
      return function (arg00_, arg10_, arg20_, arg30_) {
        return mkCallUnaryNegOperator(arg00_, arg10_, arg20_, arg30_);
      };
    } else if (e.tag === 28) {
      return function (arg00__1, arg10__1, arg20__1, arg30__1) {
        return mkCallUnaryNotOperator(arg00__1, arg10__1, arg20__1, arg30__1);
      };
    } else {
      return null;
    }
  };

  const _ILBinaryOp___ = __exports["|ILBinaryOp|_|"] = function (e) {
    switch (e.tag) {
      case 0:
        return function (arg00_, arg10_, arg20_, arg30_, arg40_) {
          return mkCallAdditionOperator(arg00_, arg10_, arg20_, arg30_, arg40_);
        };

      case 1:
      case 2:
        return function (arg00__1, arg10__1, arg20__1, arg30__1, arg40__1) {
          return mkCallAdditionChecked(arg00__1, arg10__1, arg20__1, arg30__1, arg40__1);
        };

      case 22:
        return function (arg00__2, arg10__2, arg20__2, arg30__2, arg40__2) {
          return mkCallSubtractionOperator(arg00__2, arg10__2, arg20__2, arg30__2, arg40__2);
        };

      case 23:
      case 24:
        return function (arg00__3, arg10__3, arg20__3, arg30__3, arg40__3) {
          return mkCallSubtractionChecked(arg00__3, arg10__3, arg20__3, arg30__3, arg40__3);
        };

      case 14:
        return function (arg00__4, arg10__4, arg20__4, arg30__4, arg40__4) {
          return mkCallMultiplyOperator(arg00__4, arg10__4, arg20__4, arg30__4, arg40__4);
        };

      case 15:
      case 16:
        return function (arg00__5, arg10__5, arg20__5, arg30__5, arg40__5) {
          return mkCallMultiplyChecked(arg00__5, arg10__5, arg20__5, arg30__5, arg40__5);
        };

      case 4:
      case 5:
        return function (arg00__6, arg10__6, arg20__6, arg30__6, arg40__6) {
          return mkCallDivisionOperator(arg00__6, arg10__6, arg20__6, arg30__6, arg40__6);
        };

      case 17:
      case 18:
        return function (arg00__7, arg10__7, arg20__7, arg30__7, arg40__7) {
          return mkCallModulusOperator(arg00__7, arg10__7, arg20__7, arg30__7, arg40__7);
        };

      case 6:
        return function (arg00__8, arg10__8, arg20__8, arg30__8, arg40__8) {
          return mkCallEqualsOperator(arg00__8, arg10__8, arg20__8, arg30__8, arg40__8);
        };

      case 9:
      case 10:
        return function (arg00__9, arg10__9, arg20__9, arg30__9, arg40__9) {
          return mkCallLessThanOperator(arg00__9, arg10__9, arg20__9, arg30__9, arg40__9);
        };

      case 7:
      case 8:
        return function (arg00__10, arg10__10, arg20__10, arg30__10, arg40__10) {
          return mkCallGreaterThanOperator(arg00__10, arg10__10, arg20__10, arg30__10, arg40__10);
        };

      case 3:
        return function (arg00__11, arg10__11, arg20__11, arg30__11, arg40__11) {
          return mkCallBitwiseAndOperator(arg00__11, arg10__11, arg20__11, arg30__11, arg40__11);
        };

      case 26:
        return function (arg00__12, arg10__12, arg20__12, arg30__12, arg40__12) {
          return mkCallBitwiseOrOperator(arg00__12, arg10__12, arg20__12, arg30__12, arg40__12);
        };

      case 25:
        return function (arg00__13, arg10__13, arg20__13, arg30__13, arg40__13) {
          return mkCallBitwiseXorOperator(arg00__13, arg10__13, arg20__13, arg30__13, arg40__13);
        };

      case 19:
        return function (arg00__14, arg10__14, arg20__14, arg30__14, arg40__14) {
          return mkCallShiftLeftOperator(arg00__14, arg10__14, arg20__14, arg30__14, arg40__14);
        };

      case 20:
      case 21:
        return function (arg00__15, arg10__15, arg20__15, arg30__15, arg40__15) {
          return mkCallShiftRightOperator(arg00__15, arg10__15, arg20__15, arg30__15, arg40__15);
        };

      default:
        return null;
    }
  };

  const _ILConvertOp___ = __exports["|ILConvertOp|_|"] = function (e) {
    const $var3 = e.tag === 11 ? [0] : e.tag === 12 ? [1, e.data] : e.tag === 13 ? [1, e.data] : [2];

    switch ($var3[0]) {
      case 0:
        switch (e.data.tag) {
          case 1:
            return function (arg00_, arg10_, arg20_, arg30_) {
              return mkCallToSByteOperator(arg00_, arg10_, arg20_, arg30_);
            };

          case 2:
            return function (arg00__1, arg10__1, arg20__1, arg30__1) {
              return mkCallToByteOperator(arg00__1, arg10__1, arg20__1, arg30__1);
            };

          case 3:
            return function (arg00__2, arg10__2, arg20__2, arg30__2) {
              return mkCallToInt16Operator(arg00__2, arg10__2, arg20__2, arg30__2);
            };

          case 4:
            return function (arg00__3, arg10__3, arg20__3, arg30__3) {
              return mkCallToUInt16Operator(arg00__3, arg10__3, arg20__3, arg30__3);
            };

          case 5:
            return function (arg00__4, arg10__4, arg20__4, arg30__4) {
              return mkCallToInt32Operator(arg00__4, arg10__4, arg20__4, arg30__4);
            };

          case 6:
            return function (arg00__5, arg10__5, arg20__5, arg30__5) {
              return mkCallToUInt32Operator(arg00__5, arg10__5, arg20__5, arg30__5);
            };

          case 7:
            return function (arg00__6, arg10__6, arg20__6, arg30__6) {
              return mkCallToInt64Operator(arg00__6, arg10__6, arg20__6, arg30__6);
            };

          case 8:
            return function (arg00__7, arg10__7, arg20__7, arg30__7) {
              return mkCallToUInt64Operator(arg00__7, arg10__7, arg20__7, arg30__7);
            };

          case 9:
            return function (arg00__8, arg10__8, arg20__8, arg30__8) {
              return mkCallToSingleOperator(arg00__8, arg10__8, arg20__8, arg30__8);
            };

          case 10:
            return function (arg00__9, arg10__9, arg20__9, arg30__9) {
              return mkCallToDoubleOperator(arg00__9, arg10__9, arg20__9, arg30__9);
            };

          case 11:
            return function (arg00__10, arg10__10, arg20__10, arg30__10) {
              return mkCallToIntPtrOperator(arg00__10, arg10__10, arg20__10, arg30__10);
            };

          case 12:
            return function (arg00__11, arg10__11, arg20__11, arg30__11) {
              return mkCallToUIntPtrOperator(arg00__11, arg10__11, arg20__11, arg30__11);
            };

          case 13:
            return null;

          default:
            return function (arg00__12, arg10__12, arg20__12, arg30__12) {
              return mkCallToDoubleOperator(arg00__12, arg10__12, arg20__12, arg30__12);
            };
        }

      case 1:
        switch ($var3[1].tag) {
          case 1:
            return function (arg00__13, arg10__13, arg20__13, arg30__13) {
              return mkCallToSByteChecked(arg00__13, arg10__13, arg20__13, arg30__13);
            };

          case 2:
            return function (arg00__14, arg10__14, arg20__14, arg30__14) {
              return mkCallToByteChecked(arg00__14, arg10__14, arg20__14, arg30__14);
            };

          case 3:
            return function (arg00__15, arg10__15, arg20__15, arg30__15) {
              return mkCallToInt16Checked(arg00__15, arg10__15, arg20__15, arg30__15);
            };

          case 4:
            return function (arg00__16, arg10__16, arg20__16, arg30__16) {
              return mkCallToUInt16Checked(arg00__16, arg10__16, arg20__16, arg30__16);
            };

          case 5:
            return function (arg00__17, arg10__17, arg20__17, arg30__17) {
              return mkCallToInt32Checked(arg00__17, arg10__17, arg20__17, arg30__17);
            };

          case 6:
            return function (arg00__18, arg10__18, arg20__18, arg30__18) {
              return mkCallToUInt32Checked(arg00__18, arg10__18, arg20__18, arg30__18);
            };

          case 7:
            return function (arg00__19, arg10__19, arg20__19, arg30__19) {
              return mkCallToInt64Checked(arg00__19, arg10__19, arg20__19, arg30__19);
            };

          case 8:
            return function (arg00__20, arg10__20, arg20__20, arg30__20) {
              return mkCallToUInt64Checked(arg00__20, arg10__20, arg20__20, arg30__20);
            };

          case 9:
            return function (arg00__21, arg10__21, arg20__21, arg30__21) {
              return mkCallToSingleOperator(arg00__21, arg10__21, arg20__21, arg30__21);
            };

          case 10:
            return function (arg00__22, arg10__22, arg20__22, arg30__22) {
              return mkCallToDoubleOperator(arg00__22, arg10__22, arg20__22, arg30__22);
            };

          case 11:
            return function (arg00__23, arg10__23, arg20__23, arg30__23) {
              return mkCallToIntPtrChecked(arg00__23, arg10__23, arg20__23, arg30__23);
            };

          case 12:
            return function (arg00__24, arg10__24, arg20__24, arg30__24) {
              return mkCallToUIntPtrChecked(arg00__24, arg10__24, arg20__24, arg30__24);
            };

          case 13:
            return null;

          default:
            return function (arg00__25, arg10__25, arg20__25, arg30__25) {
              return mkCallToDoubleOperator(arg00__25, arg10__25, arg20__25, arg30__25);
            };
        }

      case 2:
        return null;
    }
  };

  const _TTypeConvOp___ = __exports["|TTypeConvOp|_|"] = function (cenv, ty) {
    const g = cenv.g;

    if (ty.tag === 1) {
      if (tyconRefEq(g, ty.data[0], g.sbyte_tcr)) {
        return function (arg00_, arg10_, arg20_, arg30_) {
          return mkCallToSByteOperator(arg00_, arg10_, arg20_, arg30_);
        };
      } else if (tyconRefEq(g, ty.data[0], g.byte_tcr)) {
        return function (arg00__1, arg10__1, arg20__1, arg30__1) {
          return mkCallToByteOperator(arg00__1, arg10__1, arg20__1, arg30__1);
        };
      } else if (tyconRefEq(g, ty.data[0], g.int16_tcr)) {
        return function (arg00__2, arg10__2, arg20__2, arg30__2) {
          return mkCallToInt16Operator(arg00__2, arg10__2, arg20__2, arg30__2);
        };
      } else if (tyconRefEq(g, ty.data[0], g.uint16_tcr)) {
        return function (arg00__3, arg10__3, arg20__3, arg30__3) {
          return mkCallToUInt16Operator(arg00__3, arg10__3, arg20__3, arg30__3);
        };
      } else if (tyconRefEq(g, ty.data[0], g.int_tcr)) {
        return function (arg00__4, arg10__4, arg20__4, arg30__4) {
          return mkCallToIntOperator(arg00__4, arg10__4, arg20__4, arg30__4);
        };
      } else if (tyconRefEq(g, ty.data[0], g.int32_tcr)) {
        return function (arg00__5, arg10__5, arg20__5, arg30__5) {
          return mkCallToInt32Operator(arg00__5, arg10__5, arg20__5, arg30__5);
        };
      } else if (tyconRefEq(g, ty.data[0], g.uint32_tcr)) {
        return function (arg00__6, arg10__6, arg20__6, arg30__6) {
          return mkCallToUInt32Operator(arg00__6, arg10__6, arg20__6, arg30__6);
        };
      } else if (tyconRefEq(g, ty.data[0], g.int64_tcr)) {
        return function (arg00__7, arg10__7, arg20__7, arg30__7) {
          return mkCallToInt64Operator(arg00__7, arg10__7, arg20__7, arg30__7);
        };
      } else if (tyconRefEq(g, ty.data[0], g.uint64_tcr)) {
        return function (arg00__8, arg10__8, arg20__8, arg30__8) {
          return mkCallToUInt64Operator(arg00__8, arg10__8, arg20__8, arg30__8);
        };
      } else if (tyconRefEq(g, ty.data[0], g.float32_tcr)) {
        return function (arg00__9, arg10__9, arg20__9, arg30__9) {
          return mkCallToSingleOperator(arg00__9, arg10__9, arg20__9, arg30__9);
        };
      } else if (tyconRefEq(g, ty.data[0], g.float_tcr)) {
        return function (arg00__10, arg10__10, arg20__10, arg30__10) {
          return mkCallToDoubleOperator(arg00__10, arg10__10, arg20__10, arg30__10);
        };
      } else if (tyconRefEq(g, ty.data[0], g.nativeint_tcr)) {
        return function (arg00__11, arg10__11, arg20__11, arg30__11) {
          return mkCallToIntPtrOperator(arg00__11, arg10__11, arg20__11, arg30__11);
        };
      } else if (tyconRefEq(g, ty.data[0], g.unativeint_tcr)) {
        return function (arg00__12, arg10__12, arg20__12, arg30__12) {
          return mkCallToUIntPtrOperator(arg00__12, arg10__12, arg20__12, arg30__12);
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const ConvType = __exports.ConvType = function (cenv, typ) {
    return FSharpType[".ctor"](cenv, typ);
  };

  const ConvTypes = __exports.ConvTypes = function (cenv, typs) {
    return map(function (typ) {
      return ConvType(cenv, typ);
    }, typs);
  };

  const ConvILTypeRefApp = __exports.ConvILTypeRefApp = function (cenv, m, tref, tyargs) {
    const tcref = ImportILTypeRef(cenv.amap, m, tref);
    return ConvType(cenv, mkAppTy(tcref, tyargs));
  };

  const ConvUnionCaseRef = __exports.ConvUnionCaseRef = function (cenv, ucref) {
    return FSharpUnionCase[".ctor"](cenv, ucref);
  };

  const ConvRecdFieldRef = __exports.ConvRecdFieldRef = function (cenv, rfref) {
    return FSharpField[".ctor_1"](cenv, rfref);
  };

  const exprOfExprAddr = __exports.exprOfExprAddr = function (cenv, expr) {
    if (expr.tag === 11) {
      const matchValue = [expr.data[0], expr.data[2], expr.data[1]];
      const $var4 = matchValue[0].tag === 30 ? matchValue[0].data[0].tag === 0 ? [0, matchValue[0].data[1]] : [7] : matchValue[0].tag === 13 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [2, matchValue[1].head, matchValue[0].data] : [7] : [1, matchValue[0].data] : matchValue[0].tag === 17 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [3, matchValue[1].head, matchValue[0].data[1], matchValue[0].data[0]] : [7] : [7] : matchValue[0].tag === 22 ? matchValue[0].data[0].tail != null ? matchValue[0].data[0].head.tag === 62 ? matchValue[0].data[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [4, matchValue[1].head, matchValue[0].data[0].head.data, matchValue[0].data[1]] : [7] : [7] : [7] : matchValue[0].data[0].head.tag === 61 ? matchValue[0].data[0].tail.tail == null ? [5, matchValue[0].data[0].head.data, matchValue[0].data[1]] : [7] : matchValue[0].data[0].head.tag === 80 ? matchValue[0].data[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [6, matchValue[0].data[0].head.data[1], matchValue[0].data[0].head.data[0], matchValue[0].data[0].head.data[3], matchValue[1].head, matchValue[2].head, matchValue[1].tail, matchValue[0].data[0].head.data[2]] : [7] : [7] : [7] : [7] : [7] : [7] : [7];

      switch ($var4[0]) {
        case 0:
          return exprForValRef(expr.data[3], $var4[1]);

        case 1:
          return mkStaticRecdFieldGet($var4[1], expr.data[1], expr.data[3]);

        case 2:
          return mkRecdFieldGetViaExprAddr(exprOfExprAddr(cenv, $var4[1]), $var4[2], expr.data[1], expr.data[3]);

        case 3:
          return mkUnionCaseFieldGetProvenViaExprAddr(exprOfExprAddr(cenv, $var4[1]), $var4[3], expr.data[1], $var4[2], expr.data[3]);

        case 4:
          return mkAsmExpr(ofArray([mkNormalLdfld($var4[2])]), expr.data[1], ofArray([exprOfExprAddr(cenv, $var4[1])]), $var4[3], expr.data[3]);

        case 5:
          return mkAsmExpr(ofArray([mkNormalLdsfld($var4[1])]), expr.data[1], expr.data[2], $var4[2], expr.data[3]);

        case 6:
          const matchValue_1 = [$var4[7].Rank, $var4[6]];
          const $var5 = matchValue_1[0] === 1 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? [0, matchValue_1[1].head] : [4] : [4] : matchValue_1[0] === 2 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail != null ? matchValue_1[1].tail.tail.tail == null ? [1, matchValue_1[1].head, matchValue_1[1].tail.head] : [4] : [4] : [4] : matchValue_1[0] === 3 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail != null ? matchValue_1[1].tail.tail.tail != null ? matchValue_1[1].tail.tail.tail.tail == null ? [2, matchValue_1[1].head, matchValue_1[1].tail.head, matchValue_1[1].tail.tail.head] : [4] : [4] : [4] : [4] : matchValue_1[0] === 4 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail != null ? matchValue_1[1].tail.tail.tail != null ? matchValue_1[1].tail.tail.tail.tail != null ? matchValue_1[1].tail.tail.tail.tail.tail == null ? [3, matchValue_1[1].head, matchValue_1[1].tail.head, matchValue_1[1].tail.tail.head, matchValue_1[1].tail.tail.tail.head] : [4] : [4] : [4] : [4] : [4] : [4];

          switch ($var5[0]) {
            case 0:
              return mkCallArrayGet(cenv.g, expr.data[3], $var4[5], $var4[4], $var5[1]);

            case 1:
              return mkCallArray2DGet(cenv.g, expr.data[3], $var4[5], $var4[4], $var5[1], $var5[2]);

            case 2:
              return mkCallArray3DGet(cenv.g, expr.data[3], $var4[5], $var4[4], $var5[1], $var5[2], $var5[3]);

            case 3:
              return mkCallArray4DGet(cenv.g, expr.data[3], $var4[5], $var4[4], $var5[1], $var5[2], $var5[3], $var5[4]);

            case 4:
              return expr;
          }

        case 7:
          return expr;
      }
    } else {
      return expr;
    }
  };

  const Mk = __exports.Mk = function (cenv, m, ty, e) {
    return new FSharpExpr(cenv, null, e, m, ty);
  };

  const Mk2 = __exports.Mk2 = function (cenv, orig, e) {
    return new FSharpExpr(cenv, null, e, Expr_get_Range.bind(orig)(), tyOfExpr(cenv.g, orig));
  };

  const ConvLValueExpr = __exports.ConvLValueExpr = function (cenv, env, expr) {
    return ConvExpr(cenv, env, exprOfExprAddr(cenv, expr));
  };

  const ConvExpr = __exports.ConvExpr = function (cenv, env, expr) {
    return Mk2(cenv, expr, ConvExprPrim(cenv, env, expr));
  };

  const ConvExprLinear = __exports.ConvExprLinear = function (cenv, env, expr, contf) {
    return ConvExprPrimLinear(cenv, env, expr, function (exprR) {
      return contf(Mk2(cenv, expr, exprR));
    });
  };

  const ConvExprPrimLinear = __exports.ConvExprPrimLinear = function ($var36, $var37, $var38, $var39) {
    var arg00__1;
    var arg00_;
    var vref;
    var vFlags;
    var tyargs;
    var curriedArgs;

    var _fty;

    var _f;

    ConvExprPrimLinear: while (true) {
      const cenv = $var36;
      const env = $var37;
      const expr = $var38;
      const contf = $var39;
      let $var6;

      if (expr.tag === 11) {
        if (expr.data[0].tag === 0) {
          if (expr.data[2].tail != null) {
            if (expr.data[2].tail.tail != null) {
              if (expr.data[2].tail.tail.tail == null) {
                $var6 = [0, expr.data[2].head, expr.data[2].tail.head, expr.data[1], expr.data[0].data];
              } else {
                $var6 = [3];
              }
            } else {
              $var6 = [3];
            }
          } else {
            $var6 = [3];
          }
        } else {
          $var6 = [3];
        }
      } else if (expr.tag === 7) {
        $var6 = [1, expr.data[0], expr.data[1]];
      } else if (expr.tag === 2) {
        const activePatternResult52249 = (arg00__1 = cenv.g, function (arg10__1) {
          return _ObjectInitializationCheck___(arg00__1, arg10__1);
        })(expr.data[0]);

        if (activePatternResult52249 != null) {
          if (expr.data[2].tag === 0) {
            $var6 = [2, expr.data[1]];
          } else {
            $var6 = [3];
          }
        } else {
          const activePatternResult52250 = _StaticInitializationCount___(expr.data[0]);

          if (activePatternResult52250 != null) {
            if (expr.data[2].tag === 0) {
              $var6 = [2, expr.data[1]];
            } else {
              $var6 = [3];
            }
          } else {
            const activePatternResult52251 = _StaticInitializationCheck___(expr.data[0]);

            if (activePatternResult52251 != null) {
              if (expr.data[2].tag === 0) {
                $var6 = [2, expr.data[1]];
              } else {
                $var6 = [3];
              }
            } else {
              $var6 = [3];
            }
          }
        }
      } else {
        $var6 = [3];
      }

      switch ($var6[0]) {
        case 0:
          const mkR = ConvUnionCaseRef(cenv, $var6[4]);
          const typR = ConvType(cenv, mkAppTy($var6[4].TyconRef, $var6[3]));
          const e1R = ConvExpr(cenv, env, $var6[1]);
          return ConvExprLinear(cenv, env, $var6[2], $var7 => contf(function (e2R) {
            return new E(18, [typR, mkR, ofArray([e1R, e2R])]);
          }($var7)));

        case 1:
          const matchValue = ConvLetBind(cenv, env, $var6[1]);

          if (matchValue[0] != null) {
            const bindR = getValue(matchValue[0]);
            return ConvExprLinear(cenv, matchValue[1], $var6[2], $var8 => contf(function (bodyR) {
              return new E(13, [bindR, bodyR]);
            }($var8)));
          } else {
            $var36 = cenv;
            $var37 = matchValue[1];
            $var38 = $var6[2];
            $var39 = contf;
            continue ConvExprPrimLinear;
          }

        case 2:
          return contf(ConvExprPrim(cenv, env, $var6[1]));

        case 3:
          let $var9;

          if (expr.tag === 2) {
            if (expr.data[2].tag === 1) {
              $var9 = [1, expr.data[0], expr.data[1]];
            } else {
              $var9 = [0, expr.data[0], expr.data[1]];
            }
          } else {
            const activePatternResult52247 = (arg00_ = cenv.g, function (arg10_) {
              return _ModuleValueOrMemberUse___(arg00_, arg10_);
            })(expr);

            if (activePatternResult52247 != null) {
              if (vref = getValue(activePatternResult52247)[0], vFlags = getValue(activePatternResult52247)[1], tyargs = getValue(activePatternResult52247)[4], curriedArgs = getValue(activePatternResult52247)[5], _fty = getValue(activePatternResult52247)[3], _f = getValue(activePatternResult52247)[2], (ExprTranslationImpl.nonNil(tyargs) ? true : ExprTranslationImpl.nonNil(curriedArgs)) ? vref.IsMemberOrModuleBinding : false) {
                $var9 = [2, getValue(activePatternResult52247)[2], getValue(activePatternResult52247)[3], getValue(activePatternResult52247)[5], getValue(activePatternResult52247)[4], getValue(activePatternResult52247)[1], getValue(activePatternResult52247)[0]];
              } else {
                $var9 = [3];
              }
            } else {
              $var9 = [3];
            }
          }

          switch ($var9[0]) {
            case 0:
              const e1R_1 = ConvExpr(cenv, env, $var9[1]);
              return ConvExprLinear(cenv, env, $var9[2], $var10 => contf(function (e2R_1) {
                return new E(35, [e1R_1, e2R_1]);
              }($var10)));

            case 1:
              return new E(35, [ConvExpr(cenv, env, $var9[1]), ConvExpr(cenv, env, $var9[2])]);

            case 2:
              return ConvModuleValueOrMemberUseLinear(cenv, env, expr, $var9[6], $var9[5], $var9[4], $var9[3], contf);

            case 3:
              if (expr.tag === 9) {
                const dtreeR = ConvDecisionTree(cenv, env, expr.data[5], expr.data[2], expr.data[1]);
                return ConvTargetsLinear(cenv, env, ofArray(expr.data[3]), $var12 => contf(function (targetsR) {
                  const _E_ = function (x) {
                    return x.E;
                  };

                  let $var11;

                  const activePatternResult52242 = _E_(dtreeR);

                  if (activePatternResult52242.tag === 7) {
                    const activePatternResult52243 = _E_(activePatternResult52242.data[1]);

                    if (activePatternResult52243.tag === 9) {
                      if (activePatternResult52243.data[0] === 0) {
                        if (activePatternResult52243.data[1].tail == null) {
                          const activePatternResult52244 = _E_(activePatternResult52242.data[2]);

                          if (activePatternResult52244.tag === 9) {
                            if (activePatternResult52244.data[0] === 1) {
                              if (activePatternResult52244.data[1].tail == null) {
                                $var11 = [0, activePatternResult52242.data[0]];
                              } else {
                                $var11 = [1];
                              }
                            } else {
                              $var11 = [1];
                            }
                          } else {
                            $var11 = [1];
                          }
                        } else {
                          $var11 = [1];
                        }
                      } else {
                        $var11 = [1];
                      }
                    } else {
                      $var11 = [1];
                    }
                  } else {
                    $var11 = [1];
                  }

                  switch ($var11[0]) {
                    case 0:
                      return new E(7, [$var11[1], item(0, targetsR)[1], item(1, targetsR)[1]]);

                    case 1:
                      return new E(8, [dtreeR, targetsR]);
                  }
                }($var12)));
              } else {
                return contf(ConvExprPrim(cenv, env, expr));
              }

          }

      }
    }
  };

  const ConvModuleValueOrMemberUseLinear = __exports.ConvModuleValueOrMemberUseLinear = function (cenv, env, expr, vref, vFlags, tyargs, curriedArgs, contf) {
    const m = Expr_get_Range.bind(expr)();
    const patternInput = GetMemberCallInfo(cenv.g, vref, vFlags);
    let patternInput_3;
    const matchValue = vref.MemberInfo;
    const $var13 = matchValue != null ? !vref.IsExtensionMember ? [0] : [1] : [1];

    switch ($var13[0]) {
      case 0:
        const patternInput_1 = GetTypeOfMemberInFSharpForm(cenv.g, vref);
        patternInput_3 = [true, patternInput_1[1]];
        break;

      case 1:
        const arities = arityOfVal(vref.Deref);
        const patternInput_2 = GetTopValTypeInFSharpForm(cenv.g, arities, vref.Type, m);
        patternInput_3 = [false, patternInput_2[1]];
        break;
    }

    let patternInput_4;
    const matchValue_1 = [patternInput[5], curriedArgs];

    if (matchValue_1[0]) {
      if (matchValue_1[1].tail == null) {
        throw new Error("warning: unexpected missing object argument when generating quotation for call to F# object member " + vref.LogicalName);
      } else {
        const objArg = matchValue_1[1].head;
        const curriedArgs_1 = matchValue_1[1].tail;
        patternInput_4 = [ofArray([objArg]), curriedArgs_1];
      }
    } else {
      patternInput_4 = [new List(), matchValue_1[1]];
    }

    if (patternInput_4[1].length < patternInput_3[1].length ? true : exists2(function (arg, argInfo) {
      return argInfo.length > tryDestRefTupleExpr(arg).length;
    }, List_1.take(patternInput_3[1].length, patternInput_4[1]), patternInput_3[1])) {
      let topValInfo;
      const matchValue_2 = vref.ValReprInfo;

      if (matchValue_2 != null) {
        topValInfo = getValue(matchValue_2);
      } else {
        throw new Error("no arity information found for F# value " + vref.LogicalName);
      }

      const patternInput_5 = AdjustValForExpectedArity(cenv.g, m, vref, vFlags, topValInfo);
      const splitCallExpr = MakeApplicationAndBetaReduce(cenv.g, patternInput_5[0], patternInput_5[1], ofArray([tyargs]), patternInput_4[1], m);
      return ConvExprPrimLinear(cenv, env, splitCallExpr, contf);
    } else {
      const patternInput_6 = List_1.chop(patternInput_3[1].length, patternInput_4[1]);
      const untupledCurriedArgs = toList(map2(function (arg_1, curriedArgInfo) {
        const numUntupledArgs = curriedArgInfo.length | 0;

        if (numUntupledArgs === 0) {
          return new List();
        } else if (numUntupledArgs === 1) {
          return ofArray([arg_1]);
        } else {
          return tryDestRefTupleExpr(arg_1);
        }
      }, patternInput_6[0], patternInput_3[1]));
      const contf2 = patternInput_6[1].tail == null ? contf : function (subCallR) {
        return contf(fold(function (fR, arg_2) {
          return new E(3, [Mk2(cenv, arg_2, fR), new List(), ofArray([ConvExpr(cenv, env, arg_2)])]);
        }, subCallR, patternInput_6[1]));
      };

      if (patternInput_3[0]) {
        const callArgs = concat(new List(patternInput_4[0], untupledCurriedArgs));
        const patternInput_7 = List_1.splitAfter(patternInput[0], tyargs);
        return ConvObjectModelCallLinear(cenv, env, patternInput[2], FSharpMemberOrFunctionOrValue[".ctor_0"](cenv, vref), patternInput_7[0], patternInput_7[1], callArgs, contf2);
      } else {
        const v = FSharpMemberOrFunctionOrValue[".ctor_0"](cenv, vref);
        return ConvObjectModelCallLinear(cenv, env, false, v, new List(), tyargs, concat(untupledCurriedArgs), contf2);
      }
    }
  };

  const ConvExprPrim = __exports.ConvExprPrim = function (cenv, env, expr) {
    var arg00__1;
    var vref;
    var vFlags;
    var tyargs;
    var curriedArgs;

    var _fty;

    var _f;

    var arg00__2;
    var vref_1;
    var vFlags_1;
    var tyargs_1;
    var curriedArgs_1;

    var _fty_1;

    var _f_1;

    var arg00__3;
    var vref_2;
    var vFlags_2;
    var tyargs_2;
    var curriedArgs_2;

    var _fty_2;

    var _f_2;

    var arg00__4;
    var vref_3;
    var vFlags_3;
    var tyargs_3;
    var curriedArgs_3;

    var _fty_3;

    var _f_3;

    var arg00__5;
    var vref_4;
    var vFlags_4;
    var tyargs_4;
    var curriedArgs_4;

    var _fty_4;

    var _f_4;

    var arg00__6;
    var vref_5;
    var vFlags_5;
    var tyargs_5;
    var curriedArgs_5;

    var _fty_5;

    var _f_5;

    var arg00__7;
    var vref_6;
    var vFlags_6;
    var tyargs_6;
    var curriedArgs_6;

    var _fty_6;

    var _f_6;

    var arg00__8;
    var vref_7;
    var vFlags_7;
    var tyargs_7;
    var curriedArgs_7;

    var _fty_7;

    var _f_7;

    var tps;
    var tmvs;
    var tmethod;
    var e_2;
    var ctyp;
    var mspec;
    var arg;
    var ty_6;
    var mref;
    var arg00_;

    ConvExprPrim: while (true) {
      const expr_1 = DetectAndOptimizeForExpression(cenv.g, new OptimizeForExpressionOptions(0), expr);
      const expr_2 = NormalizeAndAdjustPossibleSubsumptionExprs(cenv.g, expr_1);
      const expr_3 = stripExpr(expr_2);
      let $var14;

      if (expr_3.tag === 5) {
        const activePatternResult52322 = _InnerExprPat_(expr_3.data[0]);

        if (activePatternResult52322.tag === 1) {
          if (expr_3.data[2].tail == null) {
            if (expr_3.data[3].tail == null) {
              $var14 = [0, expr_3.data[1], activePatternResult52322];
            } else {
              const activePatternResult52323 = (arg00__1 = cenv.g, function (arg10__1) {
                return _ModuleValueOrMemberUse___(arg00__1, arg10__1);
              })(expr_3);

              if (activePatternResult52323 != null) {
                if (vref = getValue(activePatternResult52323)[0], vFlags = getValue(activePatternResult52323)[1], tyargs = getValue(activePatternResult52323)[4], curriedArgs = getValue(activePatternResult52323)[5], _fty = getValue(activePatternResult52323)[3], _f = getValue(activePatternResult52323)[2], vref.IsMemberOrModuleBinding) {
                  $var14 = [2, getValue(activePatternResult52323)[2], getValue(activePatternResult52323)[3], getValue(activePatternResult52323)[5], getValue(activePatternResult52323)[4], getValue(activePatternResult52323)[1], getValue(activePatternResult52323)[0]];
                } else {
                  $var14 = [3];
                }
              } else {
                $var14 = [3];
              }
            }
          } else {
            const activePatternResult52324 = (arg00__2 = cenv.g, function (arg10__2) {
              return _ModuleValueOrMemberUse___(arg00__2, arg10__2);
            })(expr_3);

            if (activePatternResult52324 != null) {
              if (vref_1 = getValue(activePatternResult52324)[0], vFlags_1 = getValue(activePatternResult52324)[1], tyargs_1 = getValue(activePatternResult52324)[4], curriedArgs_1 = getValue(activePatternResult52324)[5], _fty_1 = getValue(activePatternResult52324)[3], _f_1 = getValue(activePatternResult52324)[2], vref_1.IsMemberOrModuleBinding) {
                $var14 = [2, getValue(activePatternResult52324)[2], getValue(activePatternResult52324)[3], getValue(activePatternResult52324)[5], getValue(activePatternResult52324)[4], getValue(activePatternResult52324)[1], getValue(activePatternResult52324)[0]];
              } else {
                $var14 = [3];
              }
            } else {
              $var14 = [3];
            }
          }
        } else {
          const activePatternResult52325 = (arg00__3 = cenv.g, function (arg10__3) {
            return _ModuleValueOrMemberUse___(arg00__3, arg10__3);
          })(expr_3);

          if (activePatternResult52325 != null) {
            if (vref_2 = getValue(activePatternResult52325)[0], vFlags_2 = getValue(activePatternResult52325)[1], tyargs_2 = getValue(activePatternResult52325)[4], curriedArgs_2 = getValue(activePatternResult52325)[5], _fty_2 = getValue(activePatternResult52325)[3], _f_2 = getValue(activePatternResult52325)[2], vref_2.IsMemberOrModuleBinding) {
              $var14 = [2, getValue(activePatternResult52325)[2], getValue(activePatternResult52325)[3], getValue(activePatternResult52325)[5], getValue(activePatternResult52325)[4], getValue(activePatternResult52325)[1], getValue(activePatternResult52325)[0]];
            } else {
              $var14 = [3];
            }
          } else {
            $var14 = [3];
          }
        }
      } else if (expr_3.tag === 11) {
        if (expr_3.data[0].tag === 0) {
          if (expr_3.data[2].tail != null) {
            if (expr_3.data[2].tail.tail != null) {
              if (expr_3.data[2].tail.tail.tail == null) {
                $var14 = [1];
              } else {
                const activePatternResult52326 = (arg00__4 = cenv.g, function (arg10__4) {
                  return _ModuleValueOrMemberUse___(arg00__4, arg10__4);
                })(expr_3);

                if (activePatternResult52326 != null) {
                  if (vref_3 = getValue(activePatternResult52326)[0], vFlags_3 = getValue(activePatternResult52326)[1], tyargs_3 = getValue(activePatternResult52326)[4], curriedArgs_3 = getValue(activePatternResult52326)[5], _fty_3 = getValue(activePatternResult52326)[3], _f_3 = getValue(activePatternResult52326)[2], vref_3.IsMemberOrModuleBinding) {
                    $var14 = [2, getValue(activePatternResult52326)[2], getValue(activePatternResult52326)[3], getValue(activePatternResult52326)[5], getValue(activePatternResult52326)[4], getValue(activePatternResult52326)[1], getValue(activePatternResult52326)[0]];
                  } else {
                    $var14 = [3];
                  }
                } else {
                  $var14 = [3];
                }
              }
            } else {
              const activePatternResult52327 = (arg00__5 = cenv.g, function (arg10__5) {
                return _ModuleValueOrMemberUse___(arg00__5, arg10__5);
              })(expr_3);

              if (activePatternResult52327 != null) {
                if (vref_4 = getValue(activePatternResult52327)[0], vFlags_4 = getValue(activePatternResult52327)[1], tyargs_4 = getValue(activePatternResult52327)[4], curriedArgs_4 = getValue(activePatternResult52327)[5], _fty_4 = getValue(activePatternResult52327)[3], _f_4 = getValue(activePatternResult52327)[2], vref_4.IsMemberOrModuleBinding) {
                  $var14 = [2, getValue(activePatternResult52327)[2], getValue(activePatternResult52327)[3], getValue(activePatternResult52327)[5], getValue(activePatternResult52327)[4], getValue(activePatternResult52327)[1], getValue(activePatternResult52327)[0]];
                } else {
                  $var14 = [3];
                }
              } else {
                $var14 = [3];
              }
            }
          } else {
            const activePatternResult52328 = (arg00__6 = cenv.g, function (arg10__6) {
              return _ModuleValueOrMemberUse___(arg00__6, arg10__6);
            })(expr_3);

            if (activePatternResult52328 != null) {
              if (vref_5 = getValue(activePatternResult52328)[0], vFlags_5 = getValue(activePatternResult52328)[1], tyargs_5 = getValue(activePatternResult52328)[4], curriedArgs_5 = getValue(activePatternResult52328)[5], _fty_5 = getValue(activePatternResult52328)[3], _f_5 = getValue(activePatternResult52328)[2], vref_5.IsMemberOrModuleBinding) {
                $var14 = [2, getValue(activePatternResult52328)[2], getValue(activePatternResult52328)[3], getValue(activePatternResult52328)[5], getValue(activePatternResult52328)[4], getValue(activePatternResult52328)[1], getValue(activePatternResult52328)[0]];
              } else {
                $var14 = [3];
              }
            } else {
              $var14 = [3];
            }
          }
        } else {
          const activePatternResult52329 = (arg00__7 = cenv.g, function (arg10__7) {
            return _ModuleValueOrMemberUse___(arg00__7, arg10__7);
          })(expr_3);

          if (activePatternResult52329 != null) {
            if (vref_6 = getValue(activePatternResult52329)[0], vFlags_6 = getValue(activePatternResult52329)[1], tyargs_6 = getValue(activePatternResult52329)[4], curriedArgs_6 = getValue(activePatternResult52329)[5], _fty_6 = getValue(activePatternResult52329)[3], _f_6 = getValue(activePatternResult52329)[2], vref_6.IsMemberOrModuleBinding) {
              $var14 = [2, getValue(activePatternResult52329)[2], getValue(activePatternResult52329)[3], getValue(activePatternResult52329)[5], getValue(activePatternResult52329)[4], getValue(activePatternResult52329)[1], getValue(activePatternResult52329)[0]];
            } else {
              $var14 = [3];
            }
          } else {
            $var14 = [3];
          }
        }
      } else if (expr_3.tag === 7) {
        $var14 = [1];
      } else if (expr_3.tag === 9) {
        $var14 = [1];
      } else if (expr_3.tag === 2) {
        $var14 = [1];
      } else {
        const activePatternResult52330 = (arg00__8 = cenv.g, function (arg10__8) {
          return _ModuleValueOrMemberUse___(arg00__8, arg10__8);
        })(expr_3);

        if (activePatternResult52330 != null) {
          if (vref_7 = getValue(activePatternResult52330)[0], vFlags_7 = getValue(activePatternResult52330)[1], tyargs_7 = getValue(activePatternResult52330)[4], curriedArgs_7 = getValue(activePatternResult52330)[5], _fty_7 = getValue(activePatternResult52330)[3], _f_7 = getValue(activePatternResult52330)[2], vref_7.IsMemberOrModuleBinding) {
            $var14 = [2, getValue(activePatternResult52330)[2], getValue(activePatternResult52330)[3], getValue(activePatternResult52330)[5], getValue(activePatternResult52330)[4], getValue(activePatternResult52330)[1], getValue(activePatternResult52330)[0]];
          } else {
            $var14 = [3];
          }
        } else {
          $var14 = [3];
        }
      }

      switch ($var14[0]) {
        case 0:
          cenv = cenv;
          env = env;
          expr = $var14[2];
          continue ConvExprPrim;

        case 1:
          return ConvExprPrimLinear(cenv, env, expr_3, function (e) {
            return e;
          });

        case 2:
          return ConvModuleValueOrMemberUseLinear(cenv, env, expr_3, $var14[6], $var14[5], $var14[4], $var14[3], function (e_1) {
            return e_1;
          });

        case 3:
          const $var15 = expr_3.tag === 1 ? [0, expr_3.data[1], expr_3.data[2], expr_3.data[0]] : expr_3.tag === 5 ? [1, expr_3.data[1], expr_3.data[4], expr_3.data[3], expr_3.data[0], expr_3.data[2]] : expr_3.tag === 0 ? [2, expr_3.data[0], expr_3.data[1], expr_3.data[2]] : expr_3.tag === 6 ? [3, expr_3.data[0], expr_3.data[1]] : expr_3.tag === 3 ? [4, expr_3.data[4], expr_3.data[3]] : expr_3.tag === 12 ? [5, expr_3.data[0]] : expr_3.tag === 4 ? [6, expr_3.data[2], expr_3.data[1]] : expr_3.tag === 8 ? expr_3.data[4].tail != null ? expr_3.data[4].head.data[3].tail != null ? expr_3.data[4].head.data[3].tail.tail == null ? expr_3.data[4].tail.tail == null ? (tps = expr_3.data[4].head.data[2], tmvs = expr_3.data[4].head.data[3].head, tmethod = expr_3.data[4].head, e_2 = expr_3.data[4].head.data[4], ctyp = expr_3.data[4].head.data[0].data[1], isDelegateTy(cenv.g, expr_3.data[1])) ? [7, expr_3.data[4].head.data[0].data[1], expr_3.data[4].head.data[4], expr_3.data[6], expr_3.data[4].head, expr_3.data[4].head.data[3].head, expr_3.data[4].head.data[2], expr_3.data[1]] : [8] : [8] : [8] : [8] : [8] : [8];

          switch ($var15[0]) {
            case 0:
              return ConvValRef(cenv, env, $var15[2], $var15[3]);

            case 1:
              return new E(3, [ConvExpr(cenv, env, $var15[4]), ConvTypes(cenv, $var15[5]), ConvExprs(cenv, env, $var15[3])]);

            case 2:
              return ConvConst(cenv, env, $var15[2], $var15[1], $var15[3]);

            case 3:
              const vs = valsOfBinds($var15[1]);
              const vsR = map(function (v) {
                return ConvVal(cenv, v);
              }, vs);
              const env_1 = env.BindVals(vs);
              const bodyR = ConvExpr(cenv, env_1, $var15[2]);
              const bindsR = toList(zip(vsR, map(function (b) {
                return function (expr_4) {
                  return ConvExpr(cenv, env_1, expr_4);
                }(b.Expr);
              }, $var15[1])));
              return new E(12, [bindsR, bodyR]);

            case 4:
              const patternInput = MultiLambdaToTupledLambda(cenv.g, $var15[2], $var15[1]);
              const vR = ConvVal(cenv, patternInput[0]);
              const bR = ConvExpr(cenv, env.BindVal(patternInput[0]), patternInput[1]);
              return new E(4, [vR, bR]);

            case 5:
              return new E(6, ConvExpr(cenv, env, $var15[1]));

            case 6:
              const gps = toList(delay(function () {
                return map_1(function (tp) {
                  return FSharpGenericParameter[".ctor"](cenv, tp);
                }, $var15[2]);
              }));
              const env_2 = env.BindTypars(toList(zip($var15[2], gps)));
              return new E(5, [gps, ConvExpr(cenv, env_2, $var15[1])]);

            case 7:
              const f = mkLambdas($var15[3], $var15[6], $var15[5], $var15[2], GetFSharpViewOfReturnType(cenv.g, returnTyOfMethod(cenv.g, $var15[4])));
              const fR = ConvExpr(cenv, env, f);
              const tyargR = ConvType(cenv, $var15[1]);
              return new E(40, [tyargR, fR]);

            case 8:
              switch (expr_3.tag) {
                case 10:
                  cenv = cenv;
                  env = env;
                  expr = expr_3.data[2];
                  continue ConvExprPrim;

                case 13:
                  const $var48 = cenv;
                  env = env;
                  expr = ChooseTyparSolutionsForFreeChoiceTypars(cenv.g, cenv.amap, expr_3);
                  cenv = $var48;
                  continue ConvExprPrim;

                case 8:
                  const basecallR = ConvExpr(cenv, env, expr_3.data[3]);

                  const ConvertMethods = function (methods) {
                    return toList(delay(function () {
                      return collect(function (matchValue) {
                        var vslR;
                        var sgn;
                        var tpsR;
                        var env_3;
                        var env_4;
                        var bodyR_1;
                        var mapping;
                        return singleton((vslR = map((mapping = function (v_1) {
                          return ConvVal(cenv, v_1);
                        }, function (list) {
                          return map(mapping, list);
                        }), matchValue.data[3]), sgn = FSharpAbstractSignature[".ctor"](cenv, matchValue.data[0]), tpsR = toList(delay(function () {
                          return map_1(function (tp_1) {
                            return FSharpGenericParameter[".ctor"](cenv, tp_1);
                          }, matchValue.data[2]);
                        })), env_3 = ExprTranslationImpl.ExprTranslationEnv.Empty.BindTypars(toList(zip(matchValue.data[2], tpsR))), env_4 = env_3.BindCurriedVals(matchValue.data[3]), bodyR_1 = ConvExpr(cenv, env_4, matchValue.data[4]), new FSharpObjectExprOverride(sgn, tpsR, vslR, bodyR_1)));
                      }, methods);
                    }));
                  };

                  const overridesR = function (arg00) {
                    return ConvertMethods(arg00);
                  }(expr_3.data[4]);

                  const iimplsR = map(function (tupledArg) {
                    return [ConvType(cenv, tupledArg[0]), function (arg00_1) {
                      return ConvertMethods(arg00_1);
                    }(tupledArg[1])];
                  }, expr_3.data[5]);
                  return new E(15, [ConvType(cenv, expr_3.data[1]), basecallR, overridesR, iimplsR]);

                case 11:
                  const matchValue_1 = [expr_3.data[0], expr_3.data[1], expr_3.data[2]];
                  const $var16 = matchValue_1[0].tag === 0 ? [0, matchValue_1[0].data] : matchValue_1[0].tag === 2 ? [1, matchValue_1[0].data, matchValue_1[1]] : matchValue_1[0].tag === 10 ? [2, matchValue_1[0].data[1]] : matchValue_1[0].tag === 16 ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [3, matchValue_1[2].head, matchValue_1[0].data[1], matchValue_1[1], matchValue_1[0].data[0]] : [19] : [19] : matchValue_1[0].tag === 18 ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail != null ? matchValue_1[2].tail.tail.tail == null ? [4, matchValue_1[2].head, matchValue_1[2].tail.head, matchValue_1[0].data[1], matchValue_1[1], matchValue_1[0].data[0]] : [19] : [19] : [19] : matchValue_1[0].tag === 17 ? [5, matchValue_1[0].data[1], matchValue_1[1], matchValue_1[0].data[0]] : matchValue_1[0].tag === 13 ? [6, matchValue_1[0].data, matchValue_1[1]] : matchValue_1[0].tag === 12 ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [8, matchValue_1[2].head, matchValue_1[0].data, matchValue_1[1]] : [19] : [7, matchValue_1[0].data, matchValue_1[1]] : matchValue_1[0].tag === 21 ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [9, matchValue_1[2].head, matchValue_1[0].data[1], matchValue_1[0].data[0], matchValue_1[1]] : [19] : [19] : matchValue_1[0].tag === 22 ? matchValue_1[0].data[0].tail == null ? matchValue_1[0].data[1].tail != null ? matchValue_1[0].data[1].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [14, matchValue_1[2].head, matchValue_1[0].data[1].head] : [19] : [19] : [19] : [19] : matchValue_1[0].data[0].head.tag === 60 ? matchValue_1[0].data[0].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [10, matchValue_1[1], matchValue_1[0].data[0].head.data[2], matchValue_1[2].head] : [19] : [19] : [19] : matchValue_1[0].data[0].head.tag === 59 ? matchValue_1[0].data[0].tail.tail != null ? matchValue_1[0].data[0].tail.head.tag === 33 ? matchValue_1[0].data[0].tail.tail.tail == null ? matchValue_1[2].tail == null ? [11, matchValue_1[1], matchValue_1[0].data[0].head.data[1]] : [19] : [19] : [19] : matchValue_1[2].tail == null ? [11, matchValue_1[1], matchValue_1[0].data[0].head.data[1]] : [19] : matchValue_1[0].data[0].head.tag === 64 ? matchValue_1[0].data[0].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail != null ? matchValue_1[2].tail.tail.tail == null ? [12, matchValue_1[2].tail.head, matchValue_1[1], matchValue_1[0].data[0].head.data[2], matchValue_1[2].head] : [19] : [19] : [19] : [19] : matchValue_1[0].data[0].head.tag === 63 ? matchValue_1[0].data[0].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [13, matchValue_1[2].head, matchValue_1[1], matchValue_1[0].data[0].head.data[1]] : [19] : [19] : [19] : matchValue_1[0].data[0].head.tag === 74 ? matchValue_1[0].data[0].tail.tail == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [15, matchValue_1[2].head, matchValue_1[1].head] : [19] : [19] : [19] : [19] : [19] : matchValue_1[0].data[0].head.tag === 76 ? matchValue_1[0].data[0].tail.tail == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [16, matchValue_1[2].head, matchValue_1[1].head] : [19] : [19] : [19] : [19] : [19] : matchValue_1[0].data[0].head.tag === 66 ? matchValue_1[0].data[0].tail.tail == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [17, matchValue_1[2].head, matchValue_1[1].head] : [19] : [19] : [19] : [19] : [19] : matchValue_1[0].data[0].head.tag === 48 ? matchValue_1[0].data[0].head.data[0].tag === 1 ? matchValue_1[0].data[0].head.data[2] == null ? matchValue_1[0].data[0].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? (mspec = matchValue_1[0].data[0].head.data[1], arg = matchValue_1[2].head, mspec.MethodRef.DeclaringTypeRef.Name === "System.String" ? mspec.Name === "GetHashCode" : false) ? [18, matchValue_1[2].head, matchValue_1[0].data[0].head.data[1]] : [19] : [19] : [19] : [19] : [19] : [19] : [19] : [19];

                  switch ($var16[0]) {
                    case 0:
                      const mkR = ConvUnionCaseRef(cenv, $var16[1]);
                      const typR = ConvType(cenv, mkAppTy($var16[1].TyconRef, expr_3.data[1]));
                      const argsR = ConvExprs(cenv, env, expr_3.data[2]);
                      return new E(18, [typR, mkR, argsR]);

                    case 1:
                      const tyR = ConvType(cenv, mkAnyTupledTy(cenv.g, $var16[1], $var16[2]));
                      const argsR_1 = ConvExprs(cenv, env, expr_3.data[2]);
                      return new E(24, [tyR, argsR_1]);

                    case 2:
                      const typR_1 = ConvType(cenv, mkAppTy($var16[1], expr_3.data[1]));
                      const argsR_2 = ConvExprs(cenv, env, expr_3.data[2]);
                      return new E(14, [typR_1, argsR_2]);

                    case 3:
                      const mkR_1 = ConvUnionCaseRef(cenv, $var16[4]);
                      const typR_2 = ConvType(cenv, mkAppTy($var16[4].TyconRef, $var16[3]));
                      const projR = FSharpField[".ctor_0"](cenv, $var16[4], $var16[2]);
                      return new E(19, [ConvExpr(cenv, env, $var16[1]), typR_2, mkR_1, projR]);

                    case 4:
                      const mkR_2 = ConvUnionCaseRef(cenv, $var16[5]);
                      const typR_3 = ConvType(cenv, mkAppTy($var16[5].TyconRef, $var16[4]));
                      const projR_1 = FSharpField[".ctor_0"](cenv, $var16[5], $var16[3]);
                      return new E(20, [ConvExpr(cenv, env, $var16[1]), typR_3, mkR_2, projR_1, ConvExpr(cenv, env, $var16[2])]);

                    case 5:
                      return new E(34, ConvLValueExpr(cenv, env, expr_3));

                    case 6:
                      return new E(34, ConvLValueExpr(cenv, env, expr_3));

                    case 7:
                      const projR_2 = ConvRecdFieldRef(cenv, $var16[1]);
                      const typR_4 = ConvType(cenv, mkAppTy($var16[1].TyconRef, $var16[2]));
                      return new E(16, [null, typR_4, projR_2]);

                    case 8:
                      const objR = ConvLValueExpr(cenv, env, $var16[1]);
                      const projR_3 = ConvRecdFieldRef(cenv, $var16[2]);
                      const typR_5 = ConvType(cenv, mkAppTy($var16[2].TyconRef, $var16[3]));
                      return new E(16, [objR, typR_5, projR_3]);

                    case 9:
                      const tyR_1 = ConvType(cenv, mkAnyTupledTy(cenv.g, $var16[3], $var16[4]));
                      return new E(25, [tyR_1, $var16[2], ConvExpr(cenv, env, $var16[1])]);

                    case 10:
                      const typR_6 = ConvILTypeRefApp(cenv, expr_3.data[3], $var16[2].DeclaringTypeRef, $var16[1]);
                      const objR_1 = ConvLValueExpr(cenv, env, $var16[3]);
                      return new E(41, [objR_1, typR_6, $var16[2].Name]);

                    case 11:
                      const typR_7 = ConvILTypeRefApp(cenv, expr_3.data[3], $var16[2].DeclaringTypeRef, $var16[1]);
                      return new E(41, [null, typR_7, $var16[2].Name]);

                    case 12:
                      const typR_8 = ConvILTypeRefApp(cenv, expr_3.data[3], $var16[3].DeclaringTypeRef, $var16[2]);
                      const objR_2 = ConvLValueExpr(cenv, env, $var16[4]);
                      const argR = ConvExpr(cenv, env, $var16[1]);
                      return new E(42, [objR_2, typR_8, $var16[3].Name, argR]);

                    case 13:
                      const typR_9 = ConvILTypeRefApp(cenv, expr_3.data[3], $var16[3].DeclaringTypeRef, $var16[2]);
                      const argR_1 = ConvExpr(cenv, env, $var16[1]);
                      return new E(42, [null, typR_9, $var16[3].Name, argR_1]);

                    case 14:
                      const activePatternResult52279 = function (ty) {
                        return _TTypeConvOp___(cenv, ty);
                      }($var16[2]);

                      if (activePatternResult52279 != null) {
                        const ty_1 = tyOfExpr(cenv.g, $var16[1]);
                        const op = getValue(activePatternResult52279)(cenv.g, expr_3.data[3], ty_1, $var16[1]);
                        cenv = cenv;
                        env = env;
                        expr = op;
                        continue ConvExprPrim;
                      } else {
                        cenv = cenv;
                        env = env;
                        expr = $var16[1];
                        continue ConvExprPrim;
                      }

                    case 15:
                      const op_1 = mkCallBox(cenv.g, expr_3.data[3], $var16[2], $var16[1]);
                      cenv = cenv;
                      env = env;
                      expr = op_1;
                      continue ConvExprPrim;

                    case 16:
                      const op_2 = mkCallUnbox(cenv.g, expr_3.data[3], $var16[2], $var16[1]);
                      cenv = cenv;
                      env = env;
                      expr = op_2;
                      continue ConvExprPrim;

                    case 17:
                      const op_3 = mkCallTypeTest(cenv.g, expr_3.data[3], $var16[2], $var16[1]);
                      cenv = cenv;
                      env = env;
                      expr = op_3;
                      continue ConvExprPrim;

                    case 18:
                      const ty_2 = tyOfExpr(cenv.g, $var16[1]);
                      const op_4 = mkCallHash(cenv.g, expr_3.data[3], ty_2, $var16[1]);
                      cenv = cenv;
                      env = env;
                      expr = op_4;
                      continue ConvExprPrim;

                    case 19:
                      const $var17 = matchValue_1[0].tag === 31 ? matchValue_1[1].tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].head.tag === 11 ? matchValue_1[2].head.data[0].tag === 22 ? matchValue_1[2].head.data[0].data[0].tail != null ? matchValue_1[2].head.data[0].data[0].head.tag === 68 ? matchValue_1[2].head.data[0].data[0].head.data.tag === 0 ? matchValue_1[2].head.data[0].data[0].tail.tail == null ? matchValue_1[2].head.data[1].tail != null ? matchValue_1[2].head.data[1].tail.tail == null ? matchValue_1[2].tail.tail == null ? (ty_6 = matchValue_1[2].head.data[1].head, mref = matchValue_1[0].data[7], mref.DeclaringTypeRef.Name === "System.Type" ? mref.Name === "GetTypeFromHandle" : false) ? [0, matchValue_1[0].data[7], matchValue_1[2].head.data[1].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                      switch ($var17[0]) {
                        case 0:
                          const op_5 = mkCallTypeOf(cenv.g, expr_3.data[3], $var17[2]);
                          cenv = cenv;
                          env = env;
                          expr = op_5;
                          continue ConvExprPrim;

                        case 1:
                          let $var18;

                          if (matchValue_1[0].tag === 22) {
                            if (matchValue_1[0].data[0].tail != null) {
                              if (matchValue_1[0].data[0].head.tag === 94) {
                                if (matchValue_1[0].data[0].tail.tail == null) {
                                  if (matchValue_1[1].tail != null) {
                                    if (matchValue_1[1].tail.tail == null) {
                                      $var18 = [0, matchValue_1[1].head];
                                    } else {
                                      const activePatternResult52292 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                      if (activePatternResult52292 != null) {
                                        if (matchValue_1[2].tail != null) {
                                          if (matchValue_1[2].tail.tail == null) {
                                            $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52292)];
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    }
                                  } else {
                                    const activePatternResult52293 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                    if (activePatternResult52293 != null) {
                                      if (matchValue_1[2].tail != null) {
                                        if (matchValue_1[2].tail.tail == null) {
                                          $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52293)];
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  }
                                } else {
                                  $var18 = [7];
                                }
                              } else if (matchValue_1[0].data[0].head.tag === 29) {
                                if (matchValue_1[0].data[0].tail.tail == null) {
                                  const activePatternResult52294 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                  if (activePatternResult52294 != null) {
                                    if (matchValue_1[2].tail != null) {
                                      if (matchValue_1[2].tail.tail == null) {
                                        $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52294)];
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  } else {
                                    $var18 = [7];
                                  }
                                } else if (matchValue_1[0].data[0].tail.head.tag === 8) {
                                  if (matchValue_1[0].data[0].tail.tail.tail == null) {
                                    if (matchValue_1[2].tail != null) {
                                      if (matchValue_1[2].tail.tail == null) {
                                        $var18 = [1, matchValue_1[2].head];
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  } else {
                                    $var18 = [7];
                                  }
                                } else {
                                  $var18 = [7];
                                }
                              } else if (matchValue_1[0].data[0].head.tag === 84) {
                                if (matchValue_1[0].data[0].tail.tail == null) {
                                  const activePatternResult52295 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                  if (activePatternResult52295 != null) {
                                    if (matchValue_1[2].tail != null) {
                                      if (matchValue_1[2].tail.tail == null) {
                                        $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52295)];
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  } else {
                                    $var18 = [7];
                                  }
                                } else if (matchValue_1[0].data[0].tail.head.tag === 11) {
                                  if (matchValue_1[0].data[0].tail.head.data.tag === 5) {
                                    if (matchValue_1[0].data[0].tail.tail.tail == null) {
                                      if (matchValue_1[2].tail != null) {
                                        if (matchValue_1[2].tail.tail == null) {
                                          $var18 = [2, matchValue_1[2].head];
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  } else {
                                    $var18 = [7];
                                  }
                                } else {
                                  $var18 = [7];
                                }
                              } else if (matchValue_1[0].data[0].head.tag === 83) {
                                if (matchValue_1[0].data[0].head.data[0].data.tail != null) {
                                  if (matchValue_1[0].data[0].head.data[0].data.head[0] != null) {
                                    if (getValue(matchValue_1[0].data[0].head.data[0].data.head[0]) === 0) {
                                      if (matchValue_1[0].data[0].head.data[0].data.head[1] == null) {
                                        if (matchValue_1[0].data[0].head.data[0].data.tail.tail == null) {
                                          if (matchValue_1[0].data[0].tail.tail == null) {
                                            if (matchValue_1[1].tail != null) {
                                              if (matchValue_1[1].tail.tail == null) {
                                                $var18 = [3, matchValue_1[1].head, matchValue_1[2]];
                                              } else {
                                                const activePatternResult52296 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                                if (activePatternResult52296 != null) {
                                                  if (matchValue_1[2].tail != null) {
                                                    if (matchValue_1[2].tail.tail == null) {
                                                      $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52296)];
                                                    } else {
                                                      $var18 = [7];
                                                    }
                                                  } else {
                                                    $var18 = [7];
                                                  }
                                                } else {
                                                  $var18 = [7];
                                                }
                                              }
                                            } else {
                                              const activePatternResult52297 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                              if (activePatternResult52297 != null) {
                                                if (matchValue_1[2].tail != null) {
                                                  if (matchValue_1[2].tail.tail == null) {
                                                    $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52297)];
                                                  } else {
                                                    $var18 = [7];
                                                  }
                                                } else {
                                                  $var18 = [7];
                                                }
                                              } else {
                                                $var18 = [7];
                                              }
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          const activePatternResult52298 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                          if (activePatternResult52298 != null) {
                                            if (matchValue_1[0].data[0].tail.tail == null) {
                                              if (matchValue_1[2].tail != null) {
                                                if (matchValue_1[2].tail.tail == null) {
                                                  $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52298)];
                                                } else {
                                                  $var18 = [7];
                                                }
                                              } else {
                                                $var18 = [7];
                                              }
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        }
                                      } else {
                                        const activePatternResult52299 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                        if (activePatternResult52299 != null) {
                                          if (matchValue_1[0].data[0].tail.tail == null) {
                                            if (matchValue_1[2].tail != null) {
                                              if (matchValue_1[2].tail.tail == null) {
                                                $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52299)];
                                              } else {
                                                $var18 = [7];
                                              }
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      }
                                    } else {
                                      const activePatternResult52300 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                      if (activePatternResult52300 != null) {
                                        if (matchValue_1[0].data[0].tail.tail == null) {
                                          if (matchValue_1[2].tail != null) {
                                            if (matchValue_1[2].tail.tail == null) {
                                              $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52300)];
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    }
                                  } else {
                                    const activePatternResult52301 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                    if (activePatternResult52301 != null) {
                                      if (matchValue_1[0].data[0].tail.tail == null) {
                                        if (matchValue_1[2].tail != null) {
                                          if (matchValue_1[2].tail.tail == null) {
                                            $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52301)];
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  }
                                } else {
                                  const activePatternResult52302 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                  if (activePatternResult52302 != null) {
                                    if (matchValue_1[0].data[0].tail.tail == null) {
                                      if (matchValue_1[2].tail != null) {
                                        if (matchValue_1[2].tail.tail == null) {
                                          $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52302)];
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  } else {
                                    $var18 = [7];
                                  }
                                }
                              } else if (matchValue_1[0].data[0].head.tag === 81) {
                                if (matchValue_1[0].data[0].head.data[0].data.tail != null) {
                                  if (matchValue_1[0].data[0].head.data[0].data.head[0] != null) {
                                    if (getValue(matchValue_1[0].data[0].head.data[0].data.head[0]) === 0) {
                                      if (matchValue_1[0].data[0].head.data[0].data.head[1] == null) {
                                        if (matchValue_1[0].data[0].head.data[0].data.tail.tail == null) {
                                          if (matchValue_1[0].data[0].tail.tail == null) {
                                            if (matchValue_1[1].tail != null) {
                                              if (matchValue_1[1].tail.tail == null) {
                                                if (matchValue_1[2].tail != null) {
                                                  if (matchValue_1[2].tail.tail == null) {
                                                    const activePatternResult52303 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                                    if (activePatternResult52303 != null) {
                                                      $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52303)];
                                                    } else {
                                                      $var18 = [7];
                                                    }
                                                  } else if (matchValue_1[2].tail.tail.tail == null) {
                                                    $var18 = [4, matchValue_1[2].head, matchValue_1[1].head, matchValue_1[2].tail.head];
                                                  } else {
                                                    $var18 = [7];
                                                  }
                                                } else {
                                                  $var18 = [7];
                                                }
                                              } else {
                                                const activePatternResult52304 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                                if (activePatternResult52304 != null) {
                                                  if (matchValue_1[2].tail != null) {
                                                    if (matchValue_1[2].tail.tail == null) {
                                                      $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52304)];
                                                    } else {
                                                      $var18 = [7];
                                                    }
                                                  } else {
                                                    $var18 = [7];
                                                  }
                                                } else {
                                                  $var18 = [7];
                                                }
                                              }
                                            } else {
                                              const activePatternResult52305 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                              if (activePatternResult52305 != null) {
                                                if (matchValue_1[2].tail != null) {
                                                  if (matchValue_1[2].tail.tail == null) {
                                                    $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52305)];
                                                  } else {
                                                    $var18 = [7];
                                                  }
                                                } else {
                                                  $var18 = [7];
                                                }
                                              } else {
                                                $var18 = [7];
                                              }
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          const activePatternResult52306 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                          if (activePatternResult52306 != null) {
                                            if (matchValue_1[0].data[0].tail.tail == null) {
                                              if (matchValue_1[2].tail != null) {
                                                if (matchValue_1[2].tail.tail == null) {
                                                  $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52306)];
                                                } else {
                                                  $var18 = [7];
                                                }
                                              } else {
                                                $var18 = [7];
                                              }
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        }
                                      } else {
                                        const activePatternResult52307 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                        if (activePatternResult52307 != null) {
                                          if (matchValue_1[0].data[0].tail.tail == null) {
                                            if (matchValue_1[2].tail != null) {
                                              if (matchValue_1[2].tail.tail == null) {
                                                $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52307)];
                                              } else {
                                                $var18 = [7];
                                              }
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      }
                                    } else {
                                      const activePatternResult52308 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                      if (activePatternResult52308 != null) {
                                        if (matchValue_1[0].data[0].tail.tail == null) {
                                          if (matchValue_1[2].tail != null) {
                                            if (matchValue_1[2].tail.tail == null) {
                                              $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52308)];
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    }
                                  } else {
                                    const activePatternResult52309 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                    if (activePatternResult52309 != null) {
                                      if (matchValue_1[0].data[0].tail.tail == null) {
                                        if (matchValue_1[2].tail != null) {
                                          if (matchValue_1[2].tail.tail == null) {
                                            $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52309)];
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  }
                                } else {
                                  const activePatternResult52310 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                  if (activePatternResult52310 != null) {
                                    if (matchValue_1[0].data[0].tail.tail == null) {
                                      if (matchValue_1[2].tail != null) {
                                        if (matchValue_1[2].tail.tail == null) {
                                          $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52310)];
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  } else {
                                    $var18 = [7];
                                  }
                                }
                              } else if (matchValue_1[0].data[0].head.tag === 82) {
                                if (matchValue_1[0].data[0].head.data[0].data.tail != null) {
                                  if (matchValue_1[0].data[0].head.data[0].data.head[0] != null) {
                                    if (getValue(matchValue_1[0].data[0].head.data[0].data.head[0]) === 0) {
                                      if (matchValue_1[0].data[0].head.data[0].data.head[1] == null) {
                                        if (matchValue_1[0].data[0].head.data[0].data.tail.tail == null) {
                                          if (matchValue_1[0].data[0].tail.tail == null) {
                                            if (matchValue_1[1].tail != null) {
                                              if (matchValue_1[1].tail.tail == null) {
                                                if (matchValue_1[2].tail != null) {
                                                  if (matchValue_1[2].tail.tail == null) {
                                                    const activePatternResult52311 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                                    if (activePatternResult52311 != null) {
                                                      $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52311)];
                                                    } else {
                                                      $var18 = [7];
                                                    }
                                                  } else if (matchValue_1[2].tail.tail.tail != null) {
                                                    if (matchValue_1[2].tail.tail.tail.tail == null) {
                                                      $var18 = [5, matchValue_1[2].head, matchValue_1[1].head, matchValue_1[2].tail.head, matchValue_1[2].tail.tail.head];
                                                    } else {
                                                      $var18 = [7];
                                                    }
                                                  } else {
                                                    $var18 = [7];
                                                  }
                                                } else {
                                                  $var18 = [7];
                                                }
                                              } else {
                                                const activePatternResult52312 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                                if (activePatternResult52312 != null) {
                                                  if (matchValue_1[2].tail != null) {
                                                    if (matchValue_1[2].tail.tail == null) {
                                                      $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52312)];
                                                    } else {
                                                      $var18 = [7];
                                                    }
                                                  } else {
                                                    $var18 = [7];
                                                  }
                                                } else {
                                                  $var18 = [7];
                                                }
                                              }
                                            } else {
                                              const activePatternResult52313 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                              if (activePatternResult52313 != null) {
                                                if (matchValue_1[2].tail != null) {
                                                  if (matchValue_1[2].tail.tail == null) {
                                                    $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52313)];
                                                  } else {
                                                    $var18 = [7];
                                                  }
                                                } else {
                                                  $var18 = [7];
                                                }
                                              } else {
                                                $var18 = [7];
                                              }
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          const activePatternResult52314 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                          if (activePatternResult52314 != null) {
                                            if (matchValue_1[0].data[0].tail.tail == null) {
                                              if (matchValue_1[2].tail != null) {
                                                if (matchValue_1[2].tail.tail == null) {
                                                  $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52314)];
                                                } else {
                                                  $var18 = [7];
                                                }
                                              } else {
                                                $var18 = [7];
                                              }
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        }
                                      } else {
                                        const activePatternResult52315 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                        if (activePatternResult52315 != null) {
                                          if (matchValue_1[0].data[0].tail.tail == null) {
                                            if (matchValue_1[2].tail != null) {
                                              if (matchValue_1[2].tail.tail == null) {
                                                $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52315)];
                                              } else {
                                                $var18 = [7];
                                              }
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      }
                                    } else {
                                      const activePatternResult52316 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                      if (activePatternResult52316 != null) {
                                        if (matchValue_1[0].data[0].tail.tail == null) {
                                          if (matchValue_1[2].tail != null) {
                                            if (matchValue_1[2].tail.tail == null) {
                                              $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52316)];
                                            } else {
                                              $var18 = [7];
                                            }
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    }
                                  } else {
                                    const activePatternResult52317 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                    if (activePatternResult52317 != null) {
                                      if (matchValue_1[0].data[0].tail.tail == null) {
                                        if (matchValue_1[2].tail != null) {
                                          if (matchValue_1[2].tail.tail == null) {
                                            $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52317)];
                                          } else {
                                            $var18 = [7];
                                          }
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  }
                                } else {
                                  const activePatternResult52318 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                  if (activePatternResult52318 != null) {
                                    if (matchValue_1[0].data[0].tail.tail == null) {
                                      if (matchValue_1[2].tail != null) {
                                        if (matchValue_1[2].tail.tail == null) {
                                          $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52318)];
                                        } else {
                                          $var18 = [7];
                                        }
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  } else {
                                    $var18 = [7];
                                  }
                                }
                              } else {
                                const activePatternResult52319 = _ILUnaryOp___(matchValue_1[0].data[0].head);

                                if (activePatternResult52319 != null) {
                                  if (matchValue_1[0].data[0].tail.tail == null) {
                                    if (matchValue_1[2].tail != null) {
                                      if (matchValue_1[2].tail.tail == null) {
                                        $var18 = [6, matchValue_1[2].head, getValue(activePatternResult52319)];
                                      } else {
                                        $var18 = [7];
                                      }
                                    } else {
                                      $var18 = [7];
                                    }
                                  } else {
                                    $var18 = [7];
                                  }
                                } else {
                                  $var18 = [7];
                                }
                              }
                            } else {
                              $var18 = [7];
                            }
                          } else {
                            $var18 = [7];
                          }

                          switch ($var18[0]) {
                            case 0:
                              return new E(32, ConvType(cenv, $var18[1]));

                            case 1:
                              const elemTy = tyOfExpr(cenv.g, $var18[1]);
                              const nullVal = mkNull(expr_3.data[3], elemTy);
                              const op_6 = mkCallNotEqualsOperator(cenv.g, expr_3.data[3], elemTy, $var18[1], nullVal);
                              cenv = cenv;
                              env = env;
                              expr = op_6;
                              continue ConvExprPrim;

                            case 2:
                              const arrayTy = tyOfExpr(cenv.g, $var18[1]);
                              const elemTy_1 = destArrayTy(cenv.g, arrayTy);
                              const op_7 = mkCallArrayLength(cenv.g, expr_3.data[3], elemTy_1, $var18[1]);
                              cenv = cenv;
                              env = env;
                              expr = op_7;
                              continue ConvExprPrim;

                            case 3:
                              return new E(27, [ConvType(cenv, $var18[1]), ConvExprs(cenv, env, $var18[2])]);

                            case 4:
                              const op_8 = mkCallArrayGet(cenv.g, expr_3.data[3], $var18[2], $var18[1], $var18[3]);
                              cenv = cenv;
                              env = env;
                              expr = op_8;
                              continue ConvExprPrim;

                            case 5:
                              const op_9 = mkCallArraySet(cenv.g, expr_3.data[3], $var18[2], $var18[1], $var18[3], $var18[4]);
                              cenv = cenv;
                              env = env;
                              expr = op_9;
                              continue ConvExprPrim;

                            case 6:
                              const ty_3 = tyOfExpr(cenv.g, $var18[1]);
                              const op_10 = $var18[2](cenv.g, expr_3.data[3], ty_3, $var18[1]);
                              cenv = cenv;
                              env = env;
                              expr = op_10;
                              continue ConvExprPrim;

                            case 7:
                              let $var19;

                              if (matchValue_1[0].tag === 22) {
                                if (matchValue_1[0].data[0].tail != null) {
                                  const activePatternResult52290 = _ILBinaryOp___(matchValue_1[0].data[0].head);

                                  if (activePatternResult52290 != null) {
                                    if (matchValue_1[0].data[0].tail.tail == null) {
                                      if (matchValue_1[2].tail != null) {
                                        if (matchValue_1[2].tail.tail != null) {
                                          if (matchValue_1[2].tail.tail.tail == null) {
                                            $var19 = [0, matchValue_1[2].head, matchValue_1[2].tail.head, getValue(activePatternResult52290)];
                                          } else {
                                            $var19 = [1];
                                          }
                                        } else {
                                          $var19 = [1];
                                        }
                                      } else {
                                        $var19 = [1];
                                      }
                                    } else {
                                      $var19 = [1];
                                    }
                                  } else {
                                    $var19 = [1];
                                  }
                                } else {
                                  $var19 = [1];
                                }
                              } else {
                                $var19 = [1];
                              }

                              switch ($var19[0]) {
                                case 0:
                                  const ty_4 = tyOfExpr(cenv.g, $var19[1]);
                                  const op_11 = $var19[3](cenv.g, expr_3.data[3], ty_4, $var19[1], $var19[2]);
                                  cenv = cenv;
                                  env = env;
                                  expr = op_11;
                                  continue ConvExprPrim;

                                case 1:
                                  let $var20;

                                  if (matchValue_1[0].tag === 22) {
                                    if (matchValue_1[0].data[0].tail != null) {
                                      const activePatternResult52286 = _ILConvertOp___(matchValue_1[0].data[0].head);

                                      if (activePatternResult52286 != null) {
                                        if (matchValue_1[0].data[0].tail.tail != null) {
                                          const activePatternResult52288 = _ILConvertOp___(matchValue_1[0].data[0].tail.head);

                                          if (activePatternResult52288 != null) {
                                            if (matchValue_1[0].data[0].tail.tail.tail == null) {
                                              if (matchValue_1[2].tail != null) {
                                                if (matchValue_1[2].tail.tail == null) {
                                                  $var20 = [0, matchValue_1[2].head, getValue(activePatternResult52286), getValue(activePatternResult52288)];
                                                } else {
                                                  $var20 = [1];
                                                }
                                              } else {
                                                $var20 = [1];
                                              }
                                            } else {
                                              $var20 = [1];
                                            }
                                          } else {
                                            $var20 = [1];
                                          }
                                        } else {
                                          $var20 = [1];
                                        }
                                      } else {
                                        $var20 = [1];
                                      }
                                    } else {
                                      $var20 = [1];
                                    }
                                  } else {
                                    $var20 = [1];
                                  }

                                  switch ($var20[0]) {
                                    case 0:
                                      const ty1 = tyOfExpr(cenv.g, $var20[1]);
                                      const op1 = $var20[2](cenv.g, expr_3.data[3], ty1, $var20[1]);
                                      const ty2 = tyOfExpr(cenv.g, op1);
                                      const op2 = $var20[3](cenv.g, expr_3.data[3], ty2, op1);
                                      cenv = cenv;
                                      env = env;
                                      expr = op2;
                                      continue ConvExprPrim;

                                    case 1:
                                      let $var21;

                                      if (matchValue_1[0].tag === 22) {
                                        if (matchValue_1[0].data[0].tail != null) {
                                          const activePatternResult52284 = _ILConvertOp___(matchValue_1[0].data[0].head);

                                          if (activePatternResult52284 != null) {
                                            if (matchValue_1[0].data[0].tail.tail == null) {
                                              if (matchValue_1[0].data[1].tail != null) {
                                                if (matchValue_1[0].data[1].head.tag === 1) {
                                                  if (matchValue_1[0].data[1].tail.tail == null) {
                                                    if (matchValue_1[2].tail != null) {
                                                      if (matchValue_1[2].tail.tail == null) {
                                                        $var21 = [0, matchValue_1[2].head, getValue(activePatternResult52284), matchValue_1[0].data[1].head.data[0]];
                                                      } else {
                                                        $var21 = [1];
                                                      }
                                                    } else {
                                                      $var21 = [1];
                                                    }
                                                  } else {
                                                    $var21 = [1];
                                                  }
                                                } else {
                                                  $var21 = [1];
                                                }
                                              } else {
                                                $var21 = [1];
                                              }
                                            } else {
                                              $var21 = [1];
                                            }
                                          } else {
                                            $var21 = [1];
                                          }
                                        } else {
                                          $var21 = [1];
                                        }
                                      } else {
                                        $var21 = [1];
                                      }

                                      switch ($var21[0]) {
                                        case 0:
                                          const ty_5 = tyOfExpr(cenv.g, $var21[1]);
                                          const op_12 = tyconRefEq(cenv.g, $var21[3], cenv.g.char_tcr) ? mkCallToCharOperator(cenv.g, expr_3.data[3], ty_5, $var21[1]) : $var21[2](cenv.g, expr_3.data[3], ty_5, $var21[1]);
                                          cenv = cenv;
                                          env = env;
                                          expr = op_12;
                                          continue ConvExprPrim;

                                        case 1:
                                          let $var22;

                                          if (matchValue_1[0].tag === 22) {
                                            if (matchValue_1[0].data[0].tail != null) {
                                              if (matchValue_1[0].data[0].head.tag === 54) {
                                                if (matchValue_1[0].data[0].tail.tail == null) {
                                                  if (matchValue_1[2].tail != null) {
                                                    if (matchValue_1[2].tail.tail == null) {
                                                      $var22 = [0, matchValue_1[2].head];
                                                    } else {
                                                      $var22 = [1, matchValue_1[2], matchValue_1[0].data[0], matchValue_1[1]];
                                                    }
                                                  } else {
                                                    $var22 = [1, matchValue_1[2], matchValue_1[0].data[0], matchValue_1[1]];
                                                  }
                                                } else {
                                                  $var22 = [1, matchValue_1[2], matchValue_1[0].data[0], matchValue_1[1]];
                                                }
                                              } else {
                                                $var22 = [1, matchValue_1[2], matchValue_1[0].data[0], matchValue_1[1]];
                                              }
                                            } else {
                                              $var22 = [1, matchValue_1[2], matchValue_1[0].data[0], matchValue_1[1]];
                                            }
                                          } else if (matchValue_1[0].tag === 1) {
                                            $var22 = [2, matchValue_1[2], matchValue_1[0].data, matchValue_1[1]];
                                          } else if (matchValue_1[0].tag === 11) {
                                            if (matchValue_1[2].tail != null) {
                                              if (matchValue_1[2].tail.tail == null) {
                                                $var22 = [4, matchValue_1[1], matchValue_1[2].head, matchValue_1[0].data];
                                              } else if (matchValue_1[2].tail.tail.tail == null) {
                                                $var22 = [3, matchValue_1[1], matchValue_1[2].tail.head, matchValue_1[2].head, matchValue_1[0].data];
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else if (matchValue_1[0].tag === 19) {
                                            if (matchValue_1[1].tail == null) {
                                              if (matchValue_1[2].tail != null) {
                                                if (matchValue_1[2].tail.tail == null) {
                                                  $var22 = [5, matchValue_1[0].data[1], matchValue_1[2].head, matchValue_1[0].data[0]];
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else if (matchValue_1[0].tag === 20) {
                                            if (matchValue_1[1].tail == null) {
                                              if (matchValue_1[2].tail != null) {
                                                if (matchValue_1[2].tail.tail != null) {
                                                  if (matchValue_1[2].tail.tail.tail == null) {
                                                    $var22 = [6, matchValue_1[2].tail.head, matchValue_1[0].data[1], matchValue_1[2].head, matchValue_1[0].data[0]];
                                                  } else {
                                                    $var22 = [16];
                                                  }
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else if (matchValue_1[0].tag === 24) {
                                            if (matchValue_1[1].tail != null) {
                                              if (matchValue_1[1].tail.tail != null) {
                                                if (matchValue_1[1].tail.tail.tail == null) {
                                                  if (matchValue_1[2].tail != null) {
                                                    if (matchValue_1[2].tail.tail == null) {
                                                      $var22 = [7, matchValue_1[1].tail.head, matchValue_1[1].head, matchValue_1[2].head];
                                                    } else {
                                                      $var22 = [16];
                                                    }
                                                  } else {
                                                    $var22 = [16];
                                                  }
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else if (matchValue_1[0].tag === 25) {
                                            if (matchValue_1[1].tail != null) {
                                              if (matchValue_1[1].tail.tail == null) {
                                                if (matchValue_1[2].tail == null) {
                                                  $var22 = [8, matchValue_1[1].head];
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else if (matchValue_1[0].tag === 30) {
                                            if (matchValue_1[0].data[0].tag === 3) {
                                              if (matchValue_1[1].tail == null) {
                                                if (matchValue_1[2].tail != null) {
                                                  if (matchValue_1[2].tail.tail == null) {
                                                    $var22 = [10, matchValue_1[2].head, matchValue_1[0].data[1]];
                                                  } else {
                                                    $var22 = [16];
                                                  }
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else if (matchValue_1[0].data[0].tag === 2) {
                                              if (matchValue_1[1].tail == null) {
                                                if (matchValue_1[2].tail != null) {
                                                  if (matchValue_1[2].tail.tail == null) {
                                                    $var22 = [11, matchValue_1[2].head, matchValue_1[0].data[1]];
                                                  } else {
                                                    $var22 = [16];
                                                  }
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else if (matchValue_1[0].data[0].tag === 1) {
                                              if (matchValue_1[1].tail == null) {
                                                if (matchValue_1[2].tail == null) {
                                                  $var22 = [12, matchValue_1[0].data[1]];
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else if (matchValue_1[1].tail == null) {
                                              if (matchValue_1[2].tail == null) {
                                                $var22 = [9, matchValue_1[0].data[1]];
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else if (matchValue_1[0].tag === 3) {
                                            if (matchValue_1[1].tail != null) {
                                              if (matchValue_1[1].tail.tail == null) {
                                                $var22 = [13, matchValue_1[1].head, matchValue_1[2]];
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else if (matchValue_1[0].tag === 6) {
                                            if (matchValue_1[1].tail == null) {
                                              if (matchValue_1[2].tail != null) {
                                                if (matchValue_1[2].head.tag === 3) {
                                                  if (matchValue_1[2].head.data[3].tail != null) {
                                                    if (matchValue_1[2].head.data[3].tail.tail == null) {
                                                      if (matchValue_1[2].tail.tail != null) {
                                                        if (matchValue_1[2].tail.head.tag === 3) {
                                                          if (matchValue_1[2].tail.head.data[3].tail != null) {
                                                            if (matchValue_1[2].tail.head.data[3].tail.tail == null) {
                                                              if (matchValue_1[2].tail.tail.tail == null) {
                                                                $var22 = [14, matchValue_1[2].tail.head.data[4], matchValue_1[2].head.data[4]];
                                                              } else {
                                                                $var22 = [16];
                                                              }
                                                            } else {
                                                              $var22 = [16];
                                                            }
                                                          } else {
                                                            $var22 = [16];
                                                          }
                                                        } else {
                                                          $var22 = [16];
                                                        }
                                                      } else {
                                                        $var22 = [16];
                                                      }
                                                    } else {
                                                      $var22 = [16];
                                                    }
                                                  } else {
                                                    $var22 = [16];
                                                  }
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else if (matchValue_1[0].tag === 7) {
                                            if (matchValue_1[1].tail == null) {
                                              if (matchValue_1[2].tail != null) {
                                                if (matchValue_1[2].head.tag === 3) {
                                                  if (matchValue_1[2].head.data[3].tail != null) {
                                                    if (matchValue_1[2].head.data[3].tail.tail == null) {
                                                      if (matchValue_1[2].tail.tail != null) {
                                                        if (matchValue_1[2].tail.head.tag === 3) {
                                                          if (matchValue_1[2].tail.head.data[3].tail != null) {
                                                            if (matchValue_1[2].tail.head.data[3].tail.tail == null) {
                                                              const activePatternResult52280 = _SimpleArrayLoopUpperBound___(matchValue_1[2].tail.head.data[4]);

                                                              if (activePatternResult52280 != null) {
                                                                if (matchValue_1[2].tail.tail.tail != null) {
                                                                  const activePatternResult52282 = (arg00_ = cenv.g, function (arg10_) {
                                                                    return _SimpleArrayLoopBody___(arg00_, arg10_);
                                                                  })(matchValue_1[2].tail.tail.head);

                                                                  if (activePatternResult52282 != null) {
                                                                    if (matchValue_1[2].tail.tail.tail.tail == null) {
                                                                      $var22 = [15, getValue(activePatternResult52282)[0], getValue(activePatternResult52282)[2], matchValue_1[0].data[1], getValue(activePatternResult52282)[1], matchValue_1[2].head.data[4], matchValue_1[2].tail.head.data[5]];
                                                                    } else {
                                                                      $var22 = [16];
                                                                    }
                                                                  } else {
                                                                    $var22 = [16];
                                                                  }
                                                                } else {
                                                                  $var22 = [16];
                                                                }
                                                              } else {
                                                                $var22 = [16];
                                                              }
                                                            } else {
                                                              $var22 = [16];
                                                            }
                                                          } else {
                                                            $var22 = [16];
                                                          }
                                                        } else {
                                                          $var22 = [16];
                                                        }
                                                      } else {
                                                        $var22 = [16];
                                                      }
                                                    } else {
                                                      $var22 = [16];
                                                    }
                                                  } else {
                                                    $var22 = [16];
                                                  }
                                                } else {
                                                  $var22 = [16];
                                                }
                                              } else {
                                                $var22 = [16];
                                              }
                                            } else {
                                              $var22 = [16];
                                            }
                                          } else {
                                            $var22 = [16];
                                          }

                                          switch ($var22[0]) {
                                            case 0:
                                              const raiseExpr = mkCallRaise(cenv.g, expr_3.data[3], tyOfExpr(cenv.g, expr_3), $var22[1]);
                                              cenv = cenv;
                                              env = env;
                                              expr = raiseExpr;
                                              continue ConvExprPrim;

                                            case 1:
                                              return new E(43, [toText(printf("%+A"))($var22[2]), ConvTypes(cenv, $var22[3]), ConvExprs(cenv, env, $var22[1])]);

                                            case 2:
                                              return new E(14, [ConvType(cenv, mkAppTy($var22[2], $var22[3])), ConvExprs(cenv, env, $var22[1])]);

                                            case 3:
                                              const objR_3 = ConvLValueExpr(cenv, env, $var22[3]);
                                              const argR_2 = ConvExpr(cenv, env, $var22[2]);
                                              const typR_10 = ConvType(cenv, mkAppTy($var22[4].TyconRef, expr_3.data[1]));
                                              const projR_4 = ConvRecdFieldRef(cenv, $var22[4]);
                                              return new E(17, [objR_3, typR_10, projR_4, argR_2]);

                                            case 4:
                                              const argR_3 = ConvExpr(cenv, env, $var22[2]);
                                              const typR_11 = ConvType(cenv, mkAppTy($var22[3].TyconRef, expr_3.data[1]));
                                              const projR_5 = ConvRecdFieldRef(cenv, $var22[3]);
                                              return new E(17, [null, typR_11, projR_5, argR_3]);

                                            case 5:
                                              const exnc = stripExnEqns($var22[3]);
                                              const fspec = item($var22[1], exnc.TrueInstanceFieldsAsList);
                                              const fref = mkRecdFieldRef($var22[3], fspec.Name);
                                              const typR_12 = ConvType(cenv, mkAppTy($var22[3], expr_3.data[1]));
                                              const objR_4 = ConvExpr(cenv, env, mkCoerceExpr($var22[2], mkAppTy($var22[3], new List()), expr_3.data[3], cenv.g.exn_ty));
                                              return new E(16, [objR_4, typR_12, ConvRecdFieldRef(cenv, fref)]);

                                            case 6:
                                              const exnc_1 = stripExnEqns($var22[4]);
                                              const fspec_1 = item($var22[2], exnc_1.TrueInstanceFieldsAsList);
                                              const fref_1 = mkRecdFieldRef($var22[4], fspec_1.Name);
                                              const typR_13 = ConvType(cenv, mkAppTy($var22[4], expr_3.data[1]));
                                              const objR_5 = ConvExpr(cenv, env, mkCoerceExpr($var22[3], mkAppTy($var22[4], new List()), expr_3.data[3], cenv.g.exn_ty));
                                              return new E(17, [objR_5, typR_13, ConvRecdFieldRef(cenv, fref_1), ConvExpr(cenv, env, $var22[1])]);

                                            case 7:
                                              if (typeEquiv(cenv.g, $var22[2], $var22[1])) {
                                                cenv = cenv;
                                                env = env;
                                                expr = $var22[3];
                                                continue ConvExprPrim;
                                              } else {
                                                return new E(26, [ConvType(cenv, $var22[2]), ConvExpr(cenv, env, $var22[3])]);
                                              }

                                            case 8:
                                              return function (expr_5) {
                                                return ConvExprPrim(cenv, env, expr_5);
                                              }(mkReraiseLibCall(cenv.g, $var22[1], expr_3.data[3]));

                                            case 9:
                                              return new E(34, ConvExpr(cenv, env, exprForValRef(expr_3.data[3], $var22[1])));

                                            case 10:
                                              return new E(29, [ConvExpr(cenv, env, exprForValRef(expr_3.data[3], $var22[2])), ConvExpr(cenv, env, $var22[1])]);

                                            case 11:
                                              return new E(30, [FSharpMemberOrFunctionOrValue[".ctor_0"](cenv, $var22[2]), ConvExpr(cenv, env, $var22[1])]);

                                            case 12:
                                              return ConvValRef(cenv, env, expr_3.data[3], $var22[1]);

                                            case 13:
                                              return new E(27, [ConvType(cenv, $var22[1]), ConvExprs(cenv, env, $var22[2])]);

                                            case 14:
                                              return new E(37, [ConvExpr(cenv, env, $var22[2]), ConvExpr(cenv, env, $var22[1])]);

                                            case 15:
                                              let lim1;
                                              const len = mkCallArrayLength(cenv.g, $var22[6], $var22[4], $var22[1]);
                                              lim1 = mkCallSubtractionOperator(cenv.g, $var22[6], cenv.g.int32_ty, len, mkOne(cenv.g, $var22[6]));
                                              return new E(36, [ConvExpr(cenv, env, $var22[5]), ConvExpr(cenv, env, lim1), ConvExpr(cenv, env, $var22[2]), !$var22[3].Equals(new ForLoopStyle(1))]);

                                            case 16:
                                              const $var23 = matchValue_1[0].tag === 7 ? matchValue_1[1].tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].head.tag === 3 ? matchValue_1[2].head.data[3].tail != null ? matchValue_1[2].head.data[3].tail.tail == null ? matchValue_1[2].tail.tail != null ? matchValue_1[2].tail.head.tag === 3 ? matchValue_1[2].tail.head.data[3].tail != null ? matchValue_1[2].tail.head.data[3].tail.tail == null ? matchValue_1[2].tail.tail.tail != null ? matchValue_1[2].tail.tail.tail.tail == null ? [0, matchValue_1[2].tail.tail.head, matchValue_1[0].data[1], matchValue_1[2].head.data[4], matchValue_1[2].tail.head.data[4], matchValue_1[2].tail.head.data[5]] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : matchValue_1[0].tag === 31 ? matchValue_1[1].tail == null ? [1, matchValue_1[0].data[5], matchValue_1[0].data[10], matchValue_1[2], matchValue_1[0].data[8], matchValue_1[0].data[7], matchValue_1[0].data[3], matchValue_1[0].data[9], matchValue_1[0].data[4]] : [10] : matchValue_1[0].tag === 9 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].head.tag === 3 ? matchValue_1[2].head.data[3].tail != null ? matchValue_1[2].head.data[3].tail.tail == null ? matchValue_1[2].tail.tail != null ? matchValue_1[2].tail.head.tag === 3 ? matchValue_1[2].tail.head.data[3].tail != null ? matchValue_1[2].tail.head.data[3].tail.tail == null ? matchValue_1[2].tail.tail.tail == null ? [2, matchValue_1[1].head, matchValue_1[2].head.data[4], matchValue_1[2].tail.head.data[4]] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : matchValue_1[0].tag === 8 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].head.tag === 3 ? matchValue_1[2].head.data[3].tail != null ? matchValue_1[2].head.data[3].tail.tail == null ? matchValue_1[2].tail.tail != null ? matchValue_1[2].tail.head.tag === 3 ? matchValue_1[2].tail.head.data[3].tail != null ? matchValue_1[2].tail.head.data[3].tail.tail == null ? matchValue_1[2].tail.tail.tail != null ? matchValue_1[2].tail.tail.head.tag === 3 ? matchValue_1[2].tail.tail.head.data[3].tail != null ? matchValue_1[2].tail.tail.head.data[3].tail.tail == null ? matchValue_1[2].tail.tail.tail.tail == null ? [3, matchValue_1[1].head, matchValue_1[2].head.data[4], matchValue_1[2].tail.head.data[4], matchValue_1[2].tail.tail.head.data[4], matchValue_1[2].tail.head.data[3].head, matchValue_1[2].tail.tail.head.data[3].head] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : [10] : matchValue_1[0].tag === 4 ? matchValue_1[1].tail == null ? matchValue_1[2].tail == null ? [4, matchValue_1[0].data] : [10] : [10] : matchValue_1[0].tag === 5 ? matchValue_1[1].tail == null ? matchValue_1[2].tail == null ? [5, matchValue_1[0].data] : [10] : [10] : matchValue_1[0].tag === 15 ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [6, matchValue_1[2].head] : [10] : [10] : matchValue_1[0].tag === 14 ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [7, matchValue_1[2].head, matchValue_1[1], matchValue_1[0].data] : [10] : [10] : matchValue_1[0].tag === 29 ? [8, matchValue_1[0].data.data[5], matchValue_1[0].data.data[4], matchValue_1[0].data.data[3], matchValue_1[0].data.data[2], matchValue_1[0].data.data[1], matchValue_1[0].data.data[0]] : matchValue_1[0].tag === 23 ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? matchValue_1[2].tail != null ? matchValue_1[2].tail.tail == null ? [9, matchValue_1[2].head, matchValue_1[1].head] : [10] : [10] : [10] : [10] : [10];

                                              switch ($var23[0]) {
                                                case 0:
                                                  const lim1_1 = $var23[2].Equals(new ForLoopStyle(2)) ? mkCallSubtractionOperator(cenv.g, $var23[5], cenv.g.int32_ty, $var23[4], mkOne(cenv.g, $var23[5])) : $var23[4];
                                                  return new E(36, [ConvExpr(cenv, env, $var23[3]), ConvExpr(cenv, env, lim1_1), ConvExpr(cenv, env, $var23[1]), !$var23[2].Equals(new ForLoopStyle(1))]);

                                                case 1:
                                                  return ConvILCall(cenv, env, $var23[6], $var23[8], $var23[5], $var23[4], $var23[7], $var23[3], expr_3.data[3]);

                                                case 2:
                                                  return new E(38, [ConvExpr(cenv, env, $var23[2]), ConvExpr(cenv, env, $var23[3])]);

                                                case 3:
                                                  const vfR = ConvVal(cenv, $var23[5]);
                                                  const envf = env.BindVal($var23[5]);
                                                  const vhR = ConvVal(cenv, $var23[6]);
                                                  const envh = env.BindVal($var23[6]);
                                                  return new E(39, [ConvExpr(cenv, env, $var23[2]), vfR, ConvExpr(cenv, envf, $var23[3]), vhR, ConvExpr(cenv, envh, $var23[4])]);

                                                case 4:
                                                  return new E(33, [$var23[1], ConvType(cenv, tyOfExpr(cenv.g, expr_3))]);

                                                case 5:
                                                  return new E(33, [$var23[1], ConvType(cenv, tyOfExpr(cenv.g, expr_3))]);

                                                case 6:
                                                  cenv = cenv;
                                                  env = env;
                                                  expr = $var23[1];
                                                  continue ConvExprPrim;

                                                case 7:
                                                  const typR_14 = ConvType(cenv, mkAppTy($var23[3], $var23[2]));
                                                  return new E(21, [ConvExpr(cenv, env, $var23[1]), typR_14]);

                                                case 8:
                                                  const tysR = ConvTypes(cenv, $var23[6]);
                                                  const tyargsR = ConvTypes(cenv, expr_3.data[1]);
                                                  const argtysR = ConvTypes(cenv, $var23[3]);
                                                  const argsR_3 = ConvExprs(cenv, env, expr_3.data[2]);
                                                  return new E(23, [tysR, $var23[5], $var23[4], argtysR, tyargsR, argsR_3]);

                                                case 9:
                                                  const replExpr = mkRecdFieldGetAddrViaExprAddr($var23[1], mkRefCellContentsRef(cenv.g), ofArray([$var23[2]]), expr_3.data[3]);
                                                  cenv = cenv;
                                                  env = env;
                                                  expr = replExpr;
                                                  continue ConvExprPrim;

                                                case 10:
                                                  return ExprTranslationImpl.wfail(toText(printf("unhandled construct in AST")), expr_3.data[3]);
                                              }

                                          }

                                      }

                                  }

                              }

                          }

                      }

                  }

                default:
                  return ExprTranslationImpl.wfail(toText(printf("unhandled construct in AST")), Expr_get_Range.bind(expr_3)());
              }

          }

      }
    }
  };

  const ConvLetBind = __exports.ConvLetBind = function (cenv, env, bind) {
    const matchValue = bind.Expr;
    const $var24 = matchValue.tag === 11 ? matchValue.data[0].tag === 22 ? matchValue.data[0].data[0].tail != null ? matchValue.data[0].data[0].head.tag === 66 ? matchValue.data[0].data[0].tail.tail == null ? matchValue.data[1].tail != null ? matchValue.data[1].tail.tail == null ? matchValue.data[2].tail != null ? matchValue.data[2].tail.tail == null ? [0, matchValue.data[2].head, matchValue.data[1].head] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : matchValue.tag === 1 ? bind.Var.IsCompilerGenerated ? [1] : [2] : [2];

    switch ($var24[0]) {
      case 0:
        return [null, function (arg00, tupledArg) {
          return env.BindIsInstVal(arg00, tupledArg[0], tupledArg[1]);
        }(bind.Var, [$var24[2], $var24[1]])];

      case 1:
        return [null, function (arg00_1, arg10) {
          return env.BindSubstVal(arg00_1, arg10);
        }(bind.Var, bind.Expr)];

      case 2:
        const $var25 = matchValue.tag === 0 ? matchValue.data[0].tag === 16 ? bind.Var.IsCompilerGenerated ? [0] : [1] : [1] : [1];

        switch ($var25[0]) {
          case 0:
            return [null, function (arg00_2, arg10_1) {
              return env.BindSubstVal(arg00_2, arg10_1);
            }(bind.Var, bind.Expr)];

          case 1:
            const $var26 = matchValue.tag === 11 ? matchValue.data[0].tag === 15 ? matchValue.data[2].tail != null ? matchValue.data[2].tail.tail == null ? [0, matchValue.data[2].head] : [1] : [1] : [1] : [1];

            switch ($var26[0]) {
              case 0:
                return [null, function (arg00_3, arg10_2) {
                  return env.BindSubstVal(arg00_3, arg10_2);
                }(bind.Var, $var26[1])];

              case 1:
                const v = bind.Var;
                const vR = ConvVal(cenv, v);
                const rhsR = ConvExpr(cenv, env, bind.Expr);
                const envinner = env.BindVal(v);
                return [[vR, rhsR], envinner];
            }

        }

    }
  };

  const ConvILCall = __exports.ConvILCall = function (cenv, env, isNewObj, valUseFlags, ilMethRef, enclTypeArgs, methTypeArgs, callArgs, m) {
    var amap;
    var arg00__1;
    let isNewObj_1;

    if (isNewObj) {
      isNewObj_1 = true;
    } else {
      const $var27 = valUseFlags.tag === 2 ? [0] : valUseFlags.tag === 3 ? [0] : [1];

      switch ($var27[0]) {
        case 0:
          isNewObj_1 = true;
          break;

        case 1:
          isNewObj_1 = false;
          break;
      }
    }

    const methName = ilMethRef.Name;
    const isPropGet = startsWith(methName, "get_", 4);
    const isPropSet = startsWith(methName, "set_", 4);
    const isProp = isPropGet ? true : isPropSet;
    let patternInput;

    try {
      patternInput = [ImportILTypeRef(cenv.amap, m, ilMethRef.DeclaringTypeRef), null];
    } catch (matchValue) {
      const e = ilMethRef.DeclaringTypeRef;
      const parent = ILTypeRef.Create(e.Scope, e.Enclosing.tail, e.Enclosing.head);
      patternInput = [ImportILTypeRef(cenv.amap, m, parent), e.Name];
    }

    const enclosingType = generalizedTyconRef(patternInput[0]);

    const makeCall = function (minfo) {
      return ConvObjectModelCallLinear(cenv, env, isNewObj_1, minfo, enclTypeArgs, methTypeArgs, callArgs, function (x) {
        return x;
      });
    };

    const makeFSCall = function (isMember, vr) {
      let memOrVal;

      if (isMember) {
        const minfo_1 = new MethInfo(0, [cenv.g, enclosingType, vr, null]);
        memOrVal = FSharpMemberOrFunctionOrValue[".ctor_1"](cenv, minfo_1);
      } else {
        memOrVal = FSharpMemberOrFunctionOrValue[".ctor_0"](cenv, vr);
      }

      return makeCall(memOrVal);
    };

    const makeFSExpr = function (isMember_1, vr_1) {
      let enclosingEntity;

      try {
        enclosingEntity = vr_1.nlr.EnclosingEntity.Deref;
      } catch (matchValue_1) {
        enclosingEntity = toFail(printf("Failed to resolve type '%s'"))(vr_1.nlr.EnclosingEntity.CompiledName);
      }

      const ccu = vr_1.nlr.EnclosingEntity.nlr.Ccu;
      const vName = vr_1.nlr.ItemKey.PartialKey.LogicalName;
      const findByName = filter(function (v) {
        return v.CompiledName === vName;
      }, enclosingEntity.MembersOfFSharpTyconSorted);

      if (findByName.tail == null) {
        const typR = ConvType(cenv, mkAppTy(patternInput[0], enclTypeArgs));

        if (enclosingEntity.IsModuleOrNamespace) {
          const findModuleMemberByName = toList(filter_1(function (v_1) {
            if (v_1.CompiledName === vName) {
              const matchValue_2 = v_1.DeclaringEntity;

              if (matchValue_2.tag === 0) {
                return equals(matchValue_2.data.PublicPath, enclosingEntity.PublicPath);
              } else {
                return false;
              }
            } else {
              return false;
            }
          }, enclosingEntity.ModuleOrNamespaceType.AllValsAndMembers));

          if (findModuleMemberByName.tail == null) {
            const isPropGet_1 = startsWith(vName, "get_", 4);
            const isPropSet_1 = startsWith(vName, "set_", 4);

            if (isPropGet_1 ? true : isPropSet_1) {
              const name = ChopPropertyName(vName);
              const findByName_1 = toList(filter_1(function (v_2) {
                return v_2.CompiledName === name;
              }, enclosingEntity.ModuleOrNamespaceType.AllValsAndMembers));
              const $var28 = findByName_1.tail != null ? findByName_1.tail.tail == null ? [0, findByName_1.head] : [1] : [1];

              switch ($var28[0]) {
                case 0:
                  const m_1 = FSharpMemberOrFunctionOrValue[".ctor_0"](cenv, VRefLocal($var28[1]));

                  if (isPropGet_1) {
                    return new E(0, m_1);
                  } else {
                    const valR = ConvExpr(cenv, env, callArgs.head);
                    return new E(30, [m_1, valR]);
                  }

                case 1:
                  throw new Error("Failed to resolve module value unambigously");
              }
            } else {
              throw new Error("Failed to resolve module member");
            }
          } else if (findModuleMemberByName.tail.tail == null) {
            const vr_2 = VRefLocal(findModuleMemberByName.head);
            return makeFSCall(isMember_1, vr_2);
          } else {
            throw new Error("Failed to resolve overloaded module member");
          }
        } else if (enclosingEntity.IsRecordTycon) {
          if (isProp) {
            const name_1 = ChopPropertyName(vName);
            const projR = ConvRecdFieldRef(cenv, new RecdFieldRef(0, [patternInput[0], name_1]));
            const objR = ConvLValueExpr(cenv, env, callArgs.head);

            if (isPropGet) {
              return new E(16, [objR, typR, projR]);
            } else {
              const valR_1 = ConvExpr(cenv, env, callArgs.tail.head);
              return new E(17, [objR, typR, projR, valR_1]);
            }
          } else if (vName === ".ctor") {
            const argsR = ConvExprs(cenv, env, callArgs);
            return new E(14, [typR, argsR]);
          } else {
            throw new Error("Failed to recognize record type member");
          }
        } else if (enclosingEntity.IsUnionTycon) {
          if (vName === "GetTag" ? true : vName === "get_Tag") {
            const objR_1 = ConvExpr(cenv, env, callArgs.head);
            return new E(21, [objR_1, typR]);
          } else if (vName.indexOf("New") === 0) {
            const name_2 = vName.substr(3);
            const mkR = ConvUnionCaseRef(cenv, new UnionCaseRef(0, [patternInput[0], name_2]));
            const argsR_1 = ConvExprs(cenv, env, callArgs);
            return new E(18, [typR, mkR, argsR_1]);
          } else if (vName.indexOf("Is") === 0) {
            const name_3 = vName.substr(2);
            const mkR_1 = ConvUnionCaseRef(cenv, new UnionCaseRef(0, [patternInput[0], name_3]));
            const objR_2 = ConvExpr(cenv, env, callArgs.head);
            return new E(22, [objR_2, typR, mkR_1]);
          } else if (patternInput[1] != null) {
            const ucref = new UnionCaseRef(0, [patternInput[0], getValue(patternInput[1])]);
            const mkR_2 = ConvUnionCaseRef(cenv, ucref);
            const objR_3 = ConvLValueExpr(cenv, env, callArgs.head);
            const projR_1 = FSharpField[".ctor_0"](cenv, ucref, ucref.Index);
            return new E(19, [objR_3, typR, mkR_2, projR_1]);
          } else {
            throw new Error("Failed to recognize union type member");
          }
        } else {
          const names = join(", ", map(function (v_3) {
            return v_3.CompiledName;
          }, enclosingEntity.MembersOfFSharpTyconSorted));
          return toFail(printf("Member '%s' not found in type %s, found: %s"))(vName, enclosingEntity.DisplayName, names);
        }
      } else if (findByName.tail.tail == null) {
        return makeFSCall(isMember_1, findByName.head);
      } else {
        const matchValue_3 = vr_1.nlr.ItemKey.TypeForLinkage;

        if (matchValue_3 != null) {
          const findBySig = tryFind(function (v_4) {
            return ccu.MemberSignatureEquality(getValue(matchValue_3), v_4.Type);
          }, findByName);

          if (findBySig != null) {
            return makeFSCall(isMember_1, getValue(findBySig));
          } else {
            throw new Error("Failed to recognize F# member");
          }
        } else {
          throw new Error("Type of signature could not be resolved");
        }
      }
    };

    let try1;

    if (patternInput[0].IsILTycon) {
      try {
        const mdef = resolveILMethodRefWithRescope(function (arg00_) {
          return unscopeILType(arg00_);
        }, patternInput[0].ILTyconRawMetadata, ilMethRef);
        const minfo_2 = MethInfo.CreateILMeth(cenv.amap, m, enclosingType, mdef);
        try1 = makeCall(FSharpMemberOrFunctionOrValue[".ctor_1"](cenv, minfo_2));
      } catch (matchValue_4) {
        try1 = null;
      }
    } else {
      try1 = null;
    }

    if (try1 == null) {
      try {
        const memberParentName = patternInput[0].IsModuleOrNamespace ? null : patternInput[0].LogicalName;
        const logicalName = ilMethRef.Name;
        const isMember_2 = CurriedLambda(() => memberParentName != null)();

        if (isMember_2) {
          const matchValue_5 = [ilMethRef.Name, ilMethRef.DeclaringTypeRef.Name];
          const $var29 = matchValue_5[0] === "Invoke" ? matchValue_5[1] === "Microsoft.FSharp.Core.FSharpFunc`2" ? [0] : [1] : [1];

          switch ($var29[0]) {
            case 0:
              const objR_4 = ConvLValueExpr(cenv, env, callArgs.head);
              const argR = ConvExpr(cenv, env, callArgs.tail.head);
              const typR_1 = ConvType(cenv, enclTypeArgs.head);
              return new E(3, [objR_4, ofArray([typR_1]), ofArray([argR])]);

            case 1:
              const isCtor = ilMethRef.Name === ".ctor";
              const isStatic = isCtor ? true : ilMethRef.CallingConv.IsStatic;
              const scoref = ilMethRef.DeclaringTypeRef.Scope;
              const typars1 = patternInput[0].Typars(m);
              const typars2 = map(function (_arg1) {
                return NewRigidTypar("T", m);
              }, toList(range_1(1, ilMethRef.GenericArity)));
              const tinst1 = generalizeTypars(typars1);
              const tinst2 = generalizeTypars(typars2);
              const argtys = ofArray([map((amap = cenv.amap, function (ilty) {
                return ImportILTypeFromMetadata(amap, m, scoref, tinst1, tinst2, ilty);
              }), ilMethRef.ArgTypes)]);
              let rty;
              const matchValue_6 = ImportReturnTypeFromMetaData(cenv.amap, m, ilMethRef.ReturnType, scoref, tinst1, tinst2);

              if (matchValue_6 != null) {
                rty = getValue(matchValue_6);
              } else if (isCtor) {
                rty = enclosingType;
              } else {
                rty = cenv.g.unit_ty;
              }

              let linkageType;
              const ty = mkIteratedFunTy(map((arg00__1 = cenv.g, function (arg10_) {
                return mkRefTupledTy(arg00__1, arg10_);
              }), argtys), rty);
              const ty_1 = isStatic ? ty : mkFunTy(enclosingType, ty);
              linkageType = tryMkForallTy(append(typars1, typars2), ty_1);
              const argCount = sum(map(function (list) {
                return list.length;
              }, argtys)) + (isStatic ? 0 : 1) | 0;
              const key = new ValLinkageFullKey(new ValLinkagePartialKey(memberParentName, false, logicalName, argCount), linkageType);
              const patternInput_1 = getValue(patternInput[0].PublicPath);
              const enclosingNonLocalRef = mkNonLocalEntityRef(patternInput[0].nlr.Ccu, patternInput_1.data);
              const vref = mkNonLocalValRef(enclosingNonLocalRef, key);
              return makeFSExpr(isMember_2, vref);
          }
        } else {
          const key_1 = new ValLinkageFullKey(new ValLinkagePartialKey(memberParentName, false, logicalName, 0), null);
          const vref_1 = mkNonLocalValRef(patternInput[0].nlr, key_1);
          return makeFSExpr(isMember_2, vref_1);
        }
      } catch (e_1) {
        return toFail(printf("An IL call to '%s' could not be resolved: %s"))(toString(ilMethRef), e_1.message);
      }
    } else {
      return getValue(try1);
    }
  };

  const ConvObjectModelCallLinear = __exports.ConvObjectModelCallLinear = function (cenv, env, isNewObj, v, enclTyArgs, methTyArgs, callArgs, contf) {
    const enclTyArgsR = ConvTypes(cenv, enclTyArgs);
    const methTyArgsR = ConvTypes(cenv, methTyArgs);
    let patternInput;

    if (v.IsInstanceMember) {
      if (callArgs.tail != null) {
        patternInput = [callArgs.head, callArgs.tail];
      } else {
        throw new Error(toText(printf("unexpected shape of arguments: %A"))(callArgs));
      }
    } else {
      patternInput = [null, callArgs];
    }

    const objR = defaultArg(patternInput[0], null, function (expr) {
      return ConvLValueExpr(cenv, env, expr);
    });
    return ConvExprsLinear(cenv, env, patternInput[1], $var30 => contf(function (callArgsR) {
      return isNewObj ? new E(11, [v, enclTyArgsR, callArgsR]) : new E(10, [objR, v, enclTyArgsR, methTyArgsR, callArgsR]);
    }($var30)));
  };

  const ConvExprs = __exports.ConvExprs = function (cenv, env, args) {
    return map(function (expr) {
      return ConvExpr(cenv, env, expr);
    }, args);
  };

  const ConvExprsLinear = __exports.ConvExprsLinear = function (cenv, env, args, contf) {
    if (args.tail != null) {
      if (args.tail.tail == null) {
        return ConvExprLinear(cenv, env, args.head, function (argR) {
          return contf(ofArray([argR]));
        });
      } else {
        return ConvExprLinear(cenv, env, args.head, function (argR_1) {
          return ConvExprsLinear(cenv, env, args.tail, function (restR) {
            return contf(new List(argR_1, restR));
          });
        });
      }
    } else {
      return contf(new List());
    }
  };

  const ConvTargetsLinear = __exports.ConvTargetsLinear = function (cenv, env, tgs, contf) {
    if (tgs.tail != null) {
      const vars = tgs.head.data[0];
      const rhs = tgs.head.data[1];
      const varsR = map(function (v) {
        return ConvVal(cenv, v);
      }, reverse(vars));
      return ConvExprLinear(cenv, env, rhs, function (targetR) {
        return ConvTargetsLinear(cenv, env, tgs.tail, function (restR) {
          return contf(new List([varsR, targetR], restR));
        });
      });
    } else {
      return contf(new List());
    }
  };

  const ConvValRef = __exports.ConvValRef = function (cenv, env, m, vref) {
    const v = vref.Deref;

    if (env.isinstVals.ContainsVal(v)) {
      const patternInput = env.isinstVals.get_Item(v);
      return ConvExprPrim(cenv, env, mkCallUnbox(cenv.g, m, patternInput[0], patternInput[1]));
    } else if (env.substVals.ContainsVal(v)) {
      const e = env.substVals.get_Item(v);
      return ConvExprPrim(cenv, env, e);
    } else if (v.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(0))) {
      return new E(1, ConvType(cenv, v.Type));
    } else if (v.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1))) {
      return new E(2, ConvType(cenv, v.Type));
    } else {
      return new E(0, FSharpMemberOrFunctionOrValue[".ctor_0"](cenv, vref));
    }
  };

  const ConvVal = __exports.ConvVal = function (cenv, v) {
    const vref = mkLocalValRef(v);
    return FSharpMemberOrFunctionOrValue[".ctor_0"](cenv, vref);
  };

  const ConvConst = __exports.ConvConst = function (cenv, env, m, c, ty) {
    const matchValue = TryEliminateDesugaredConstants(cenv.g, m, c);

    if (matchValue == null) {
      const tyR = ConvType(cenv, ty);

      switch (c.tag) {
        case 1:
          return new E(33, [c.data, tyR]);

        case 2:
          return new E(33, [c.data, tyR]);

        case 3:
          return new E(33, [c.data, tyR]);

        case 4:
          return new E(33, [c.data, tyR]);

        case 5:
          return new E(33, [c.data, tyR]);

        case 6:
          return new E(33, [c.data, tyR]);

        case 7:
          return new E(33, [c.data, tyR]);

        case 8:
          return new E(33, [c.data, tyR]);

        case 9:
          return new E(33, [c.data, tyR]);

        case 10:
          return new E(33, [c.data, tyR]);

        case 15:
          return new E(33, [c.data, tyR]);

        case 12:
          return new E(33, [c.data, tyR]);

        case 11:
          return new E(33, [c.data, tyR]);

        case 14:
          return new E(33, [c.data, tyR]);

        case 13:
          return new E(33, [c.data, tyR]);

        case 16:
          return new E(33, [null, tyR]);

        case 17:
          return new E(32, ConvType(cenv, ty));

        default:
          return new E(33, [c.data, tyR]);
      }
    } else {
      return ConvExprPrim(cenv, env, getValue(matchValue));
    }
  };

  const ConvDecisionTree = __exports.ConvDecisionTree = function (cenv, env, dtreeRetTy, x, m) {
    return function (e) {
      return Mk(cenv, m, dtreeRetTy, e);
    }(ConvDecisionTreePrim(cenv, env, dtreeRetTy, x));
  };

  const ConvDecisionTreePrim = __exports.ConvDecisionTreePrim = function (cenv, env, dtreeRetTy, x) {
    ConvDecisionTreePrim: while (true) {
      if (x.tag === 1) {
        const args = reverse(x.data[0]);
        const argsR = ConvExprs(cenv, env, args);
        return new E(9, [x.data[1], argsR]);
      } else if (x.tag === 2) {
        const matchValue = ConvLetBind(cenv, env, x.data[0]);

        if (matchValue[0] != null) {
          const bindR = getValue(matchValue[0]);
          return new E(13, [bindR, ConvDecisionTree(cenv, matchValue[1], dtreeRetTy, x.data[1], x.data[0].Var.Range)]);
        } else {
          cenv = cenv;
          env = matchValue[1];
          dtreeRetTy = dtreeRetTy;
          x = x.data[1];
          continue ConvDecisionTreePrim;
        }
      } else {
        const acc = x.data[2] == null ? ExprTranslationImpl.wfail("FSharp.Compiler.Service cannot yet return this kind of pattern match", x.data[3]) : ConvDecisionTreePrim(cenv, env, dtreeRetTy, getValue(x.data[2]));
        return foldBack(function (_arg2, acc_1) {
          var ty_1;
          var ty_3;
          var ty_4;

          const acc_2 = function (e) {
            return Mk(cenv, x.data[3], dtreeRetTy, e);
          }(acc_1);

          if (_arg2.data[0].tag === 2) {
            if (_arg2.data[0].data.tag === 0) {
              if (_arg2.data[0].data.data) {
                const e1R = ConvExpr(cenv, env, x.data[0]);
                return new E(7, [e1R, ConvDecisionTree(cenv, env, dtreeRetTy, _arg2.data[1], x.data[3]), acc_2]);
              } else {
                const e1R_1 = ConvExpr(cenv, env, x.data[0]);
                return new E(7, [e1R_1, acc_2, ConvDecisionTree(cenv, env, dtreeRetTy, _arg2.data[1], x.data[3])]);
              }
            } else {
              const ty = tyOfExpr(cenv.g, x.data[0]);
              const eq = mkCallEqualsOperator(cenv.g, x.data[3], ty, x.data[0], new Expr(0, [_arg2.data[0].data, x.data[3], ty]));
              const eqR = ConvExpr(cenv, env, eq);
              return new E(7, [eqR, ConvDecisionTree(cenv, env, dtreeRetTy, _arg2.data[1], x.data[3]), acc_2]);
            }
          } else if (_arg2.data[0].tag === 3) {
            const $var31 = x.data[0].tag === 1 ? env.isinstVals.ContainsVal(x.data[0].data[0].Deref) ? [0, x.data[0].data[0]] : [1] : [1];

            switch ($var31[0]) {
              case 0:
                const patternInput = env.isinstVals.get_Item($var31[1].Deref);
                const tyR = ConvType(cenv, patternInput[0]);
                const eR = ConvExpr(cenv, env, patternInput[1]);
                return new E(7, [(ty_1 = cenv.g.bool_ty, function (e_1) {
                  return Mk(cenv, x.data[3], ty_1, e_1);
                })(new E(28, [tyR, eR])), acc_2, ConvDecisionTree(cenv, env, dtreeRetTy, _arg2.data[1], x.data[3])]);

              case 1:
                const ty_2 = tyOfExpr(cenv.g, x.data[0]);
                const eq_1 = mkCallEqualsOperator(cenv.g, x.data[3], ty_2, x.data[0], new Expr(0, [new Const(17), x.data[3], ty_2]));
                const eqR_1 = ConvExpr(cenv, env, eq_1);
                return new E(7, [eqR_1, ConvDecisionTree(cenv, env, dtreeRetTy, _arg2.data[1], x.data[3]), acc_2]);
            }
          } else if (_arg2.data[0].tag === 4) {
            const e1R_2 = ConvExpr(cenv, env, x.data[0]);
            return new E(7, [(ty_3 = cenv.g.bool_ty, function (e_2) {
              return Mk(cenv, x.data[3], ty_3, e_2);
            })(new E(28, [ConvType(cenv, _arg2.data[0].data[1]), e1R_2])), ConvDecisionTree(cenv, env, dtreeRetTy, _arg2.data[1], x.data[3]), acc_2]);
          } else if (_arg2.data[0].tag === 5) {
            return ExprTranslationImpl.wfail("unexpected Test.ActivePatternCase test in quoted expression", x.data[3]);
          } else if (_arg2.data[0].tag === 1) {
            return ExprTranslationImpl.wfail("FSharp.Compiler.Service cannot yet return array pattern matching", x.data[3]);
          } else {
            const objR = ConvExpr(cenv, env, x.data[0]);
            const ucR = ConvUnionCaseRef(cenv, _arg2.data[0].data[0]);
            const utypR = ConvType(cenv, mkAppTy(_arg2.data[0].data[0].TyconRef, _arg2.data[0].data[1]));
            return new E(7, [(ty_4 = cenv.g.bool_ty, function (e_3) {
              return Mk(cenv, x.data[3], ty_4, e_3);
            })(new E(22, [objR, utypR, ucR])), ConvDecisionTree(cenv, env, dtreeRetTy, _arg2.data[1], x.data[3]), acc_2]);
          }
        }, x.data[1], acc);
      }
    }
  };

  const ConvExprOnDemand = __exports.ConvExprOnDemand = function (cenv, env, expr) {
    return new FSharpExpr(cenv, function () {
      return ConvExpr(cenv, env, expr);
    }, new E(31), Expr_get_Range.bind(expr)(), tyOfExpr(cenv.g, expr));
  };

  return __exports;
}({});
export class FSharpAssemblyContents {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAssemblyContents",
      properties: {
        ImplementationFiles: makeGeneric(List, {
          T: FSharpImplementationFileContents
        })
      }
    };
  }

  constructor(cenv, mimpls) {
    this.cenv = cenv;
    this.mimpls = mimpls;
  }

  static [".ctor"](g, thisCcu, thisCcuType, tcImports, mimpls) {
    return new FSharpAssemblyContents(SymbolEnv[".ctor"](g, thisCcu, thisCcuType, tcImports), mimpls);
  }

  get ImplementationFiles() {
    return toList(delay(() => map_1(mimpl => new FSharpImplementationFileContents(this.cenv, mimpl), this.mimpls)));
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAssemblyContents", FSharpAssemblyContents);
export class FSharpImplementationFileDeclaration {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpImplementationFileDeclaration",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Entity", FSharpEntity, makeGeneric(List, {
        T: FSharpImplementationFileDeclaration
      })], ["MemberOrFunctionOrValue", FSharpMemberOrFunctionOrValue, makeGeneric(List, {
        T: makeGeneric(List, {
          T: FSharpMemberOrFunctionOrValue
        })
      }), FSharpExpr], ["InitAction", FSharpExpr]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpImplementationFileDeclaration", FSharpImplementationFileDeclaration);
export class FSharpImplementationFileContents {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpImplementationFileContents",
      properties: {
        Declarations: makeGeneric(List, {
          T: FSharpImplementationFileDeclaration
        }),
        FileName: "string",
        HasExplicitEntryPoint: "boolean",
        IsScript: "boolean",
        QualifiedName: "string"
      }
    };
  }

  constructor(cenv, mimpl) {
    this.cenv = cenv;
    this.qname = mimpl.data[0];
    this.mdef = mimpl.data[2].data[1];
    this.isScript = mimpl.data[4];
    this.hasExplicitEntryPoint = mimpl.data[3];
  }

  get QualifiedName() {
    return this.qname.Text;
  }

  get FileName() {
    let copyOfStruct = this.qname.Range;
    return copyOfStruct.FileName;
  }

  get Declarations() {
    return this.getDecls(this.mdef);
  }

  get HasExplicitEntryPoint() {
    return this.hasExplicitEntryPoint;
  }

  get IsScript() {
    return this.isScript;
  }

  getDecls2(_arg1) {
    return (mdef => this.getDecls(mdef))(_arg1.data[1]);
  }

  getBind(bind) {
    var mapping;
    var cenv;
    const v = bind.Var;
    const topValInfo = InferArityOfExprBinding(this.cenv.g, new AllowTypeDirectedDetupling(0), v, bind.Expr);
    const patternInput = IteratedAdjustArityOfLambda(this.cenv.g, this.cenv.amap, topValInfo, bind.Expr);
    const v_1 = FSharpMemberOrFunctionOrValue[".ctor_0"](this.cenv, mkLocalValRef(v));
    const gps = v_1.GenericParameters;
    const vslR = map((mapping = (cenv = this.cenv, v_2 => FSharpExprConvert.ConvVal(cenv, v_2)), list => map(mapping, list)), patternInput[3]);
    const env = ExprTranslationImpl.ExprTranslationEnv.Empty.BindTypars(toList(zip(patternInput[0], gps)));
    const env_1 = env.BindCurriedVals(patternInput[3]);
    const e = FSharpExprConvert.ConvExprOnDemand(this.cenv, env_1, patternInput[4]);
    return new FSharpImplementationFileDeclaration(1, [v_1, vslR, e]);
  }

  getDecls(mdef) {
    switch (mdef.tag) {
      case 0:
        return (_arg1 => this.getDecls2(_arg1))(mdef.data);

      case 2:
        return toList(delay(() => singleton((bind => this.getBind(bind))(mdef.data[0]))));

      case 3:
        return toList(delay(() => {
          const expr = FSharpExprConvert.ConvExprOnDemand(this.cenv, ExprTranslationImpl.ExprTranslationEnv.Empty, mdef.data[0]);
          return singleton(new FSharpImplementationFileDeclaration(2, expr));
        }));

      case 1:
        return toList(delay(() => collect(mdef_1 => (mdef_2 => this.getDecls(mdef_2))(mdef_1), mdef.data)));

      default:
        return toList(delay(() => append_1(collect(tycon => {
          const entity = FSharpEntity[".ctor"](this.cenv, mkLocalEntityRef(tycon));
          return singleton(new FSharpImplementationFileDeclaration(0, [entity, new List()]));
        }, mdef.data[1]), delay(() => collect(mbind => {
          if (mbind.tag === 0) {
            return singleton((bind_1 => this.getBind(bind_1))(mbind.data));
          } else {
            const entity_1 = FSharpEntity[".ctor"](this.cenv, mkLocalEntityRef(mbind.data[0]));
            return singleton(new FSharpImplementationFileDeclaration(0, [entity_1, (mdef_3 => this.getDecls(mdef_3))(mbind.data[1])]));
          }
        }, mdef.data[2])))));
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpImplementationFileContents", FSharpImplementationFileContents);
export const BasicPatterns = function (__exports) {
  const _Value___ = __exports["|Value|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 0) {
      return matchValue.data;
    } else {
      return null;
    }
  };

  const _Const___ = __exports["|Const|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 33) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _TypeLambda___ = __exports["|TypeLambda|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 5) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _Lambda___ = __exports["|Lambda|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 4) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _Application___ = __exports["|Application|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 3) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _IfThenElse___ = __exports["|IfThenElse|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 7) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _Let___ = __exports["|Let|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 13) {
      const v = matchValue.data[0][0];
      const e_1 = matchValue.data[0][1];
      return [[v, e_1], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _LetRec___ = __exports["|LetRec|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 12) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _NewRecord___ = __exports["|NewRecord|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 14) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _NewUnionCase___ = __exports["|NewUnionCase|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 18) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _NewTuple___ = __exports["|NewTuple|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 24) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _TupleGet___ = __exports["|TupleGet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 25) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _Call___ = __exports["|Call|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 10) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3], matchValue.data[4]];
    } else {
      return null;
    }
  };

  const _NewObject___ = __exports["|NewObject|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 11) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _FSharpFieldGet___ = __exports["|FSharpFieldGet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 16) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _FSharpFieldSet___ = __exports["|FSharpFieldSet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 17) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3]];
    } else {
      return null;
    }
  };

  const _UnionCaseGet___ = __exports["|UnionCaseGet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 19) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3]];
    } else {
      return null;
    }
  };

  const _UnionCaseTag___ = __exports["|UnionCaseTag|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 21) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _UnionCaseTest___ = __exports["|UnionCaseTest|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 22) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _NewArray___ = __exports["|NewArray|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 27) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _Coerce___ = __exports["|Coerce|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 26) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _Quote___ = __exports["|Quote|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 6) {
      return matchValue.data;
    } else {
      return null;
    }
  };

  const _TypeTest___ = __exports["|TypeTest|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 28) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _Sequential___ = __exports["|Sequential|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 35) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _FastIntegerForLoop___ = __exports["|FastIntegerForLoop|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 36) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3]];
    } else {
      return null;
    }
  };

  const _WhileLoop___ = __exports["|WhileLoop|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 37) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _TryFinally___ = __exports["|TryFinally|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 38) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _TryWith___ = __exports["|TryWith|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 39) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3], matchValue.data[4]];
    } else {
      return null;
    }
  };

  const _NewDelegate___ = __exports["|NewDelegate|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 40) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _DefaultValue___ = __exports["|DefaultValue|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 32) {
      return matchValue.data;
    } else {
      return null;
    }
  };

  const _AddressSet___ = __exports["|AddressSet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 29) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _ValueSet___ = __exports["|ValueSet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 30) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _AddressOf___ = __exports["|AddressOf|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 34) {
      return matchValue.data;
    } else {
      return null;
    }
  };

  const _ThisValue___ = __exports["|ThisValue|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 1) {
      return matchValue.data;
    } else {
      return null;
    }
  };

  const _BaseValue___ = __exports["|BaseValue|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 2) {
      return matchValue.data;
    } else {
      return null;
    }
  };

  const _ILAsm___ = __exports["|ILAsm|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 43) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _ILFieldGet___ = __exports["|ILFieldGet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 41) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2]];
    } else {
      return null;
    }
  };

  const _ILFieldSet___ = __exports["|ILFieldSet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 42) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3]];
    } else {
      return null;
    }
  };

  const _ObjectExpr___ = __exports["|ObjectExpr|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 15) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3]];
    } else {
      return null;
    }
  };

  const _DecisionTree___ = __exports["|DecisionTree|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 8) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _DecisionTreeSuccess___ = __exports["|DecisionTreeSuccess|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 9) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return null;
    }
  };

  const _UnionCaseSet___ = __exports["|UnionCaseSet|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 20) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3], matchValue.data[4]];
    } else {
      return null;
    }
  };

  const _TraitCall___ = __exports["|TraitCall|_|"] = function (e) {
    const matchValue = e.E;

    if (matchValue.tag === 23) {
      return [matchValue.data[0], matchValue.data[1], matchValue.data[2], matchValue.data[3], matchValue.data[4], matchValue.data[5]];
    } else {
      return null;
    }
  };

  return __exports;
}({});