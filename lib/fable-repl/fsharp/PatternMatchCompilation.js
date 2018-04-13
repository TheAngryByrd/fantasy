import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equals, hash, toString, compare, Function as _Function, makeGeneric, comparePrimitives, equalsRecords, Tuple, Option } from "../fable-core/Util";
import { outputRange, range } from "./range";
import { ValReprInfoModule, newUnique, DecisionTreeCase, DecisionTree, RecordConstructionInfo, TOp, DecisionTreeTest, mkTyparTy, Typar, DecisionTreeTarget, Val, TupInfo, EntityRef, UnionCaseRef, ValRef, TType, Expr, Const } from "./tast";
import { concat, append as append_1, reverse, collect, filter, choose as choose_1, mapIndexed, replicate, ofArray, map } from "../fable-core/List";
import List from "../fable-core/List";
import { ActivePatternInfo } from "./PrettyNaming";
import { mkAndSimplifyMatch, accTargetsOfDecisionTree, mkRecdFieldGet, mkTupleFieldGet, mkCallUnboxFast, mkExnCaseFieldGet, mkCallArrayGet, mkUnionCaseFieldGetProvenViaExprAddr, mkUnionCaseFieldGetUnprovenViaExprAddr, mkChoiceCaseRef, mkSomeCase, ActivePatternInfo$2E$get_Names as ActivePatternInfo_get_Names, mkUnionCaseProof, mkProvenUnionCaseTy, ActivePatternInfo$2E$ResultType as ActivePatternInfo_ResultType, Mutates, mkExprAddrOfExprAux, mkInvisibleBind, mkIsInst, AdjustValToTopVal, canUseTypeTestFast, mkInvisibleBinds, mkLetsFromBindings, Expr$2E$get_Range as Expr_get_Range, mkUnit, mkString, mkExnExpr, exprForVal, mkThrow, mkReraise, MatchBuilder, mkBoolSwitch, tyOfExpr, mkCallEqualsOperator, mkInt, mkLdlen, mkILAsmCeq, mkNonNullTest, mkLazyAnd, mkLetBind, mkCompGenLocalAndInvisbleBind, doesActivePatternHaveFreeTypars, valRefEq, typeEquiv, instTypes, mkAppTy, instType, ValMap, DebugPrint, tyconRefEq, tryDestAppTy, recdFieldTysOfExnDefRef, actualTysOfUnionCaseFields, mkTyconRefInst, actualTysOfInstanceRecdFields, mkRefTupled, mkCompGenLocal, mkGenericBindRhs, mkApps, mkTyparInst, isBeingGeneralized, TypeScheme } from "./TastOps";
import { TypeDefinitelySubsumesTypeNoCoercion, IterativelySubstituteTyparSolutions, ChooseTyparSolution } from "./TypeRelations";
import { fromNumber, fromBits } from "../fable-core/Long";
import Long from "../fable-core/Long";
import CurriedLambda from "../fable-core/CurriedLambda";
import { mapIndexed2, iterateIndexed, foldBack, map2, exists, sortWith, toList, choose as choose_2, range as range_1, append, ofList, map as map_1, tryFind, fold } from "../fable-core/Seq";
import { create } from "../fable-core/Set";
import { fromEqualityComparer } from "../fable-core/Comparer";
import Comparer from "../fable-core/Comparer";
import { toText, printf } from "../fable-core/String";
import { makeSome, getValue } from "../fable-core/Option";
import { Error as _Error, error, InternalError, warning } from "./ErrorLogger";
import { verbose } from "./lib";
import { dprintf } from "../absil/ildiag";
import { showL } from "./layout";
import { dataExprL } from "./NicePrint";
import { List as List_1 } from "../absil/illib";
import { SequencePointInfoForTarget, SequencePointInfoForBinding } from "./ast";
import { mk_MFCore_tcref } from "./TcGlobals";
import { SR } from "../codegen/FSComp";
export class MatchIncomplete extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, MatchIncomplete.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.MatchIncomplete",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "boolean",
        Data1: Option(Tuple(["string", "boolean"])),
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.MatchIncomplete", MatchIncomplete);
export class RuleNeverMatched extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, RuleNeverMatched.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.RuleNeverMatched",
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
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.RuleNeverMatched", RuleNeverMatched);
export class EnumMatchIncomplete extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, EnumMatchIncomplete.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.EnumMatchIncomplete",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "boolean",
        Data1: Option(Tuple(["string", "boolean"])),
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.EnumMatchIncomplete", EnumMatchIncomplete);
export class ActionOnFailure {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.ActionOnFailure",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ThrowIncompleteMatchException"], ["IgnoreWithWarning"], ["Throw"], ["Rethrow"], ["FailFilter"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.ActionOnFailure", ActionOnFailure);
export class Pattern {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.Pattern",
      interfaces: ["FSharpUnion"],
      cases: [["TPat_const", Const, range], ["TPat_wild", range], ["TPat_as", Pattern, PatternValBinding, range], ["TPat_disjs", makeGeneric(List, {
        T: Pattern
      }), range], ["TPat_conjs", makeGeneric(List, {
        T: Pattern
      }), range], ["TPat_query", Tuple([Expr, makeGeneric(List, {
        T: TType
      }), Option(Tuple([ValRef, makeGeneric(List, {
        T: TType
      })])), "number", ActivePatternInfo]), Pattern, range], ["TPat_unioncase", UnionCaseRef, makeGeneric(List, {
        T: TType
      }), makeGeneric(List, {
        T: Pattern
      }), range], ["TPat_exnconstr", EntityRef, makeGeneric(List, {
        T: Pattern
      }), range], ["TPat_tuple", TupInfo, makeGeneric(List, {
        T: Pattern
      }), makeGeneric(List, {
        T: TType
      }), range], ["TPat_array", makeGeneric(List, {
        T: Pattern
      }), TType, range], ["TPat_recd", EntityRef, makeGeneric(List, {
        T: TType
      }), makeGeneric(List, {
        T: Pattern
      }), range], ["TPat_range", "string", "string", range], ["TPat_null", range], ["TPat_isinst", TType, TType, Option(PatternValBinding), range]]
    };
  }

  get Range() {
    return this.tag === 1 ? this.data : this.tag === 2 ? this.data[2] : this.tag === 3 ? this.data[1] : this.tag === 4 ? this.data[1] : this.tag === 5 ? this.data[2] : this.tag === 6 ? this.data[3] : this.tag === 7 ? this.data[2] : this.tag === 8 ? this.data[3] : this.tag === 9 ? this.data[2] : this.tag === 10 ? this.data[3] : this.tag === 11 ? this.data[2] : this.tag === 12 ? this.data : this.tag === 13 ? this.data[3] : this.data[1];
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.Pattern", Pattern);
export class PatternValBinding {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.PatternValBinding",
      interfaces: ["FSharpUnion"],
      cases: [["PBind", Val, TypeScheme]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.PatternValBinding", PatternValBinding);
export class TypedMatchClause {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.TypedMatchClause",
      interfaces: ["FSharpUnion"],
      cases: [["TClause", Pattern, Option(Expr), DecisionTreeTarget, range]]
    };
  }

  get GuardExpr() {
    return this.data[1];
  }

  get Pattern() {
    return this.data[0];
  }

  get Range() {
    return this.data[3];
  }

  get Target() {
    return this.data[2];
  }

  get BoundVals() {
    const vs = this.data[2].data[0];
    return vs;
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.TypedMatchClause", TypedMatchClause);
export const debug = false;
export class SubExprOfInput {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.SubExprOfInput",
      interfaces: ["FSharpUnion"],
      cases: [["SubExpr", _Function([makeGeneric(List, {
        T: Tuple([Typar, TType])
      }), Expr, Expr]), Tuple([Expr, Val])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.SubExprOfInput", SubExprOfInput);
export function BindSubExprOfInput(g, amap, gtps, _arg2, m, _arg1) {
  const ve2 = _arg1.data[1][0];
  const v2 = _arg1.data[1][1];
  let e_;

  if (gtps.tail == null) {
    e_ = _arg1.data[0](new List(), ve2);
  } else {
    let tyargs;
    const someSolved = {
      contents: false
    };

    const freezeVar = function (gtp) {
      if (isBeingGeneralized(gtp, _arg2.data[1])) {
        return mkTyparTy(gtp);
      } else {
        someSolved.contents = true;
        return ChooseTyparSolution(g, amap, gtp);
      }
    };

    const solutions = map(freezeVar, gtps);

    if (someSolved.contents) {
      tyargs = IterativelySubstituteTyparSolutions(g, gtps, solutions);
    } else {
      tyargs = solutions;
    }

    const tinst = mkTyparInst(gtps, tyargs);
    e_ = _arg1.data[0](tinst, mkApps(g, [ve2, v2.Type], ofArray([tyargs]), new List(), v2.Range));
  }

  return [_arg2.data[0], mkGenericBindRhs(g, m, new List(), _arg2.data[1], e_)];
}
export function GetSubExprOfInput(g, gtps, tyargs, tinst, _arg1) {
  const ve2 = _arg1.data[1][0];
  const v2 = _arg1.data[1][1];

  if (gtps.tail == null) {
    return _arg1.data[0](new List(), ve2);
  } else {
    return _arg1.data[0](tinst, mkApps(g, [ve2, v2.Type], ofArray([tyargs]), new List(), v2.Range));
  }
}
export class Path {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.Path",
      interfaces: ["FSharpUnion"],
      cases: [["PathQuery", Path, Long], ["PathConj", Path, "number"], ["PathTuple", Path, makeGeneric(List, {
        T: TType
      }), "number"], ["PathRecd", Path, EntityRef, makeGeneric(List, {
        T: TType
      }), "number"], ["PathUnionConstr", Path, UnionCaseRef, makeGeneric(List, {
        T: TType
      }), "number"], ["PathArray", Path, TType, "number", "number"], ["PathExnConstr", Path, EntityRef, "number"], ["PathEmpty", TType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.Path", Path);
export function pathEq(p1, p2) {
  pathEq: while (true) {
    const matchValue = [p1, p2];
    const $var1 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [1, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [8] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [2, matchValue[0].data[2], matchValue[1].data[2], matchValue[0].data[0], matchValue[1].data[0]] : [8] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [3, matchValue[0].data[3], matchValue[1].data[3], matchValue[0].data[0], matchValue[1].data[0]] : [8] : matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? [4, matchValue[0].data[3], matchValue[1].data[3], matchValue[0].data[0], matchValue[1].data[0]] : [8] : matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? [5, matchValue[0].data[3], matchValue[1].data[3], matchValue[0].data[0], matchValue[1].data[0]] : [8] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [6, matchValue[0].data[2], matchValue[1].data[2], matchValue[0].data[0], matchValue[1].data[0]] : [8] : matchValue[0].tag === 7 ? matchValue[1].tag === 7 ? [7] : [8] : matchValue[1].tag === 0 ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [8];

    switch ($var1[0]) {
      case 0:
        if ($var1[1].Equals($var1[2])) {
          p1 = $var1[3];
          p2 = $var1[4];
          continue pathEq;
        } else {
          return false;
        }

      case 1:
        if ($var1[1] === $var1[2]) {
          p1 = $var1[3];
          p2 = $var1[4];
          continue pathEq;
        } else {
          return false;
        }

      case 2:
        if ($var1[1] === $var1[2]) {
          p1 = $var1[3];
          p2 = $var1[4];
          continue pathEq;
        } else {
          return false;
        }

      case 3:
        if ($var1[1] === $var1[2]) {
          p1 = $var1[3];
          p2 = $var1[4];
          continue pathEq;
        } else {
          return false;
        }

      case 4:
        if ($var1[1] === $var1[2]) {
          p1 = $var1[3];
          p2 = $var1[4];
          continue pathEq;
        } else {
          return false;
        }

      case 5:
        if ($var1[1] === $var1[2]) {
          p1 = $var1[3];
          p2 = $var1[4];
          continue pathEq;
        } else {
          return false;
        }

      case 6:
        if ($var1[1] === $var1[2]) {
          p1 = $var1[3];
          p2 = $var1[4];
          continue pathEq;
        } else {
          return false;
        }

      case 7:
        return true;

      case 8:
        return false;
    }
  }
}
export class RefutedSet {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.RefutedSet",
      interfaces: ["FSharpUnion"],
      cases: [["RefutedInvestigation", Path, makeGeneric(List, {
        T: DecisionTreeTest
      })], ["RefutedWhenClause"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.RefutedSet", RefutedSet);
export const notNullText = "some-non-null-value";
export const otherSubtypeText = "some-other-subtype";
export class CannotRefute extends Error {
  constructor() {
    super();
    return Object.setPrototypeOf(this, CannotRefute.prototype);
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.CannotRefute",
      interfaces: ["FSharpException"],
      properties: {}
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.CannotRefute", CannotRefute);
export function RefuteDiscrimSet(g, m, path, discrims) {
  const mkUnknown = function (ty) {
    return mkCompGenLocal(m, "_", ty)[1];
  };

  const go = function ($var47, $var48) {
    go: while (true) {
      const path_1 = $var47;
      const tm = $var48;

      switch (path_1.tag) {
        case 1:
          $var47 = path_1.data[0];
          $var48 = tm;
          continue go;

        case 2:
          const patternInput = mkOneKnown(tm, path_1.data[2], path_1.data[1]);
          $var47 = path_1.data[0];

          $var48 = function (_arg1) {
            return [mkRefTupled(g, m, patternInput[0], path_1.data[1]), patternInput[1]];
          };

          continue go;

        case 3:
          const patternInput_1 = CurriedLambda(mkOneKnown)(tm, path_1.data[3])(actualTysOfInstanceRecdFields(mkTyconRefInst(path_1.data[1], path_1.data[2]), path_1.data[1]));
          $var47 = path_1.data[0];

          $var48 = function (_arg2) {
            return [new Expr(11, [new TOp(10, [new RecordConstructionInfo(1), path_1.data[1]]), path_1.data[2], patternInput_1[0], m]), patternInput_1[1]];
          };

          continue go;

        case 4:
          const patternInput_2 = CurriedLambda(mkOneKnown)(tm, path_1.data[3])(actualTysOfUnionCaseFields(mkTyconRefInst(path_1.data[1].TyconRef, path_1.data[2]), path_1.data[1]));
          $var47 = path_1.data[0];

          $var48 = function (_arg3) {
            return [new Expr(11, [new TOp(0, path_1.data[1]), path_1.data[2], patternInput_2[0], m]), patternInput_2[1]];
          };

          continue go;

        case 5:
          const patternInput_3 = mkOneKnown(tm, path_1.data[3], replicate(path_1.data[2], path_1.data[1]));
          $var47 = path_1.data[0];

          $var48 = function (_arg4) {
            return [new Expr(11, [new TOp(3), ofArray([path_1.data[1]]), patternInput_3[0], m]), patternInput_3[1]];
          };

          continue go;

        case 6:
          const patternInput_4 = CurriedLambda(mkOneKnown)(tm, path_1.data[2])(recdFieldTysOfExnDefRef(path_1.data[1]));
          $var47 = path_1.data[0];

          $var48 = function (_arg5) {
            return [new Expr(11, [new TOp(1, path_1.data[1]), new List(), patternInput_4[0], m]), patternInput_4[1]];
          };

          continue go;

        case 7:
          return tm(path_1.data);

        default:
          throw new CannotRefute();
      }
    }
  };

  const mkOneKnown = function (tm_1, n, tys) {
    const flds = mapIndexed(function (i, ty_1) {
      return i === n ? tm_1(ty_1) : [mkUnknown(ty_1), false];
    }, tys);
    return [map(function (tuple) {
      return tuple[0];
    }, flds), fold(function (acc, tupledArg) {
      return tupledArg[1] ? true : acc;
    }, false, flds)];
  };

  const mkUnknowns = function (tys_1) {
    return map(function (x) {
      return mkUnknown(x);
    }, tys_1);
  };

  const tm_2 = function (ty_2) {
    const $var2 = discrims.tail != null ? discrims.head.tag === 3 ? discrims.tail.tail == null ? [0] : [5] : discrims.head.tag === 4 ? discrims.tail.tail == null ? [1] : [5] : discrims.head.tag === 2 ? [2, discrims.head.data, discrims.tail] : discrims.head.tag === 0 ? [3, discrims.tail, discrims.head.data[1], discrims.head.data[0]] : discrims.head.tag === 1 ? discrims.tail.tail == null ? [4, discrims.head.data[0], discrims.head.data[1]] : [5] : [5] : [5];

    switch ($var2[0]) {
      case 0:
        return [mkCompGenLocal(m, notNullText, ty_2)[1], false];

      case 1:
        return [mkCompGenLocal(m, otherSubtypeText, ty_2)[1], false];

      case 2:
        const consts = create(new List($var2[1], choose_1(function (_arg1_1) {
          return _arg1_1.tag === 2 ? _arg1_1.data : null;
        }, $var2[2])), new Comparer((x, y) => x.CompareTo(y)));
        const c_ = tryFind(function (c) {
          return !consts.has(c);
        }, (() => {
          switch ($var2[1].tag) {
            case 0:
              return map_1(function (v) {
                return new Const(0, v);
              }, ofList(ofArray([true, false])));

            case 1:
              return map_1(function (v_1) {
                return new Const(1, v_1);
              }, append(range_1(0, 127), range_1(-128, 0)));

            case 3:
              return map_1(function (v_2) {
                return new Const(3, v_2);
              }, append(range_1(0, 32767), range_1(-32768, 0)));

            case 5:
              return map_1(function (v_3) {
                return new Const(5, v_3);
              }, append(range_1(0, 2147483647), range_1(-2147483648, 0)));

            case 7:
              return map_1(function (v_4) {
                return new Const(7, v_4);
              }, append(range_1(fromBits(0, 0, false), fromBits(4294967295, 2147483647, false)), range_1(fromBits(0, 2147483648, false), fromBits(0, 0, false))));

            case 9:
              return map_1(function (v_5) {
                return new Const(9, v_5);
              }, append(range_1(fromBits(0, 0, false), fromBits(4294967295, 2147483647, false)), range_1(fromBits(0, 2147483648, false), fromBits(0, 0, false))));

            case 2:
              return map_1(function (v_6) {
                return new Const(2, v_6);
              }, range_1(0, 255));

            case 4:
              return map_1(function (v_7) {
                return new Const(4, v_7);
              }, range_1(0, 65535));

            case 6:
              return map_1(function (v_8) {
                return new Const(6, v_8);
              }, range_1(0, 4294967295));

            case 8:
              return map_1(function (v_9) {
                return new Const(8, v_9);
              }, range_1(fromBits(0, 0, true), fromBits(4294967295, 4294967295, true)));

            case 10:
              return map_1(function (v_10) {
                return new Const(10, v_10);
              }, range_1(fromBits(0, 0, true), fromBits(4294967295, 4294967295, true)));

            case 12:
              return map_1(function (v_11) {
                return new Const(12, v_11);
              }, range_1(0, 2147483647));

            case 11:
              return map_1(function (v_12) {
                return new Const(11, v_12);
              }, range_1(0, 2147483647));

            case 13:
              return map_1(function (v_13) {
                return new Const(13, String.fromCharCode(v_13));
              }, range_1(32, 65535));

            case 14:
              return map_1(function (v_14) {
                return new Const(14, printf("a"));
              }, range_1(1, 2147483647));

            case 15:
              return map_1(function (v_15) {
                return new Const(15, v_15);
              }, range_1(1, 2147483647));

            default:
              throw new CannotRefute();
          }
        })());
        let coversKnownEnumValues;
        const matchValue = tryDestAppTy(g, ty_2);
        const $var3 = matchValue != null ? getValue(matchValue).IsEnumTycon ? [0, getValue(matchValue)] : [1] : [1];

        switch ($var3[0]) {
          case 0:
            const knownValues = Array.from(choose_2(function (f) {
              const matchValue_1 = [f.rfield_const, f.rfield_static];
              const $var4 = matchValue_1[0] != null ? matchValue_1[1] ? [0, getValue(matchValue_1[0])] : [1] : [1];

              switch ($var4[0]) {
                case 0:
                  return $var4[1];

                case 1:
                  return null;
              }
            }, $var3[1].AllFieldsArray));
            coversKnownEnumValues = knownValues.every(function (ev) {
              return consts.has(ev);
            });
            break;

          case 1:
            coversKnownEnumValues = false;
            break;
        }

        if (c_ != null) {
          return [new Expr(0, [getValue(c_), m, ty_2]), coversKnownEnumValues];
        } else {
          throw new CannotRefute();
        }

      case 3:
        const ucrefs = new List($var2[3], choose_1(function (_arg2_1) {
          return _arg2_1.tag === 0 ? _arg2_1.data[0] : null;
        }, $var2[1]));
        const tcref = $var2[3].TyconRef;
        const others = toList(sortWith(($var5, $var6) => compare(function (ucref) {
          return ucref.CaseName;
        }($var5), function (ucref) {
          return ucref.CaseName;
        }($var6)), filter(function (ucref_1) {
          return !exists(CurriedLambda(function (arg00, arg10) {
            return g.unionCaseRefEq(arg00, arg10);
          })(ucref_1), ucrefs);
        }, tcref.UnionCasesAsRefList)));

        if (others.tail != null) {
          const flds_1 = mkUnknowns(actualTysOfUnionCaseFields(mkTyconRefInst(tcref, $var2[2]), others.head));
          return [new Expr(11, [new TOp(0, others.head), $var2[2], flds_1, m]), false];
        } else {
          throw new CannotRefute();
        }

      case 4:
        return [new Expr(11, [new TOp(3), ofArray([$var2[2]]), mkUnknowns(replicate($var2[1] + 1, $var2[2])), m]), false];

      case 5:
        throw new CannotRefute();
    }
  };

  return go(path, tm_2);
}
export function CombineRefutations(g, r1, r2) {
  var vref_6;
  var vref_7;
  var vref_8;
  var vref_3;
  var vref_4;
  var vref_5;
  var vref;
  var vref_1;
  var vref_2;
  var tinst1;
  var op1;
  var m1;
  var flds2;
  var flds1;
  var ecref2;
  var ecref1;
  const matchValue = [r1, r2];
  const $var7 = matchValue[0].tag === 1 ? (vref_6 = matchValue[0].data[0], vref_6.LogicalName === "_") ? [0, matchValue[1], matchValue[0].data[0]] : matchValue[1].tag === 1 ? (vref_7 = matchValue[1].data[0], vref_7.LogicalName === "_") ? [0, matchValue[0], matchValue[1].data[0]] : [1] : [1] : matchValue[1].tag === 1 ? (vref_8 = matchValue[1].data[0], vref_8.LogicalName === "_") ? [0, matchValue[0], matchValue[1].data[0]] : [1] : [1];

  switch ($var7[0]) {
    case 0:
      return $var7[1];

    case 1:
      const $var8 = matchValue[0].tag === 1 ? (vref_3 = matchValue[0].data[0], vref_3.LogicalName === notNullText) ? [0, matchValue[1], matchValue[0].data[0]] : matchValue[1].tag === 1 ? (vref_4 = matchValue[1].data[0], vref_4.LogicalName === notNullText) ? [0, matchValue[0], matchValue[1].data[0]] : [1] : [1] : matchValue[1].tag === 1 ? (vref_5 = matchValue[1].data[0], vref_5.LogicalName === notNullText) ? [0, matchValue[0], matchValue[1].data[0]] : [1] : [1];

      switch ($var8[0]) {
        case 0:
          return $var8[1];

        case 1:
          const $var9 = matchValue[0].tag === 1 ? (vref = matchValue[0].data[0], vref.LogicalName === otherSubtypeText) ? [0, matchValue[1], matchValue[0].data[0]] : matchValue[1].tag === 1 ? (vref_1 = matchValue[1].data[0], vref_1.LogicalName === otherSubtypeText) ? [0, matchValue[0], matchValue[1].data[0]] : [1] : [1] : matchValue[1].tag === 1 ? (vref_2 = matchValue[1].data[0], vref_2.LogicalName === otherSubtypeText) ? [0, matchValue[0], matchValue[1].data[0]] : [1] : [1];

          switch ($var9[0]) {
            case 0:
              return $var9[1];

            case 1:
              const $var10 = matchValue[0].tag === 11 ? matchValue[0].data[0].tag === 1 ? matchValue[1].tag === 11 ? matchValue[1].data[0].tag === 1 ? (tinst1 = matchValue[0].data[1], op1 = matchValue[0].data[0], m1 = matchValue[0].data[3], flds2 = matchValue[1].data[2], flds1 = matchValue[0].data[2], ecref2 = matchValue[1].data[0].data, ecref1 = matchValue[0].data[0].data, tyconRefEq(g, ecref1, ecref2)) ? [0, matchValue[0].data[0].data, matchValue[1].data[0].data, matchValue[0].data[2], matchValue[1].data[2], matchValue[0].data[3], matchValue[0].data[0], matchValue[0].data[1]] : [1] : [1] : [1] : [1] : [1];

              switch ($var10[0]) {
                case 0:
                  return new Expr(11, [$var10[6], $var10[7], toList(map2(function (r1_1, r2_1) {
                    return CombineRefutations(g, r1_1, r2_1);
                  }, $var10[3], $var10[4])), $var10[5]]);

                case 1:
                  const $var11 = matchValue[0].tag === 11 ? matchValue[0].data[0].tag === 0 ? matchValue[1].tag === 11 ? matchValue[1].data[0].tag === 0 ? [0, matchValue[0].data[2], matchValue[1].data[2], matchValue[0].data[3], matchValue[0].data[0], matchValue[0].data[1], matchValue[0].data[0].data, matchValue[1].data[0].data] : [1, matchValue[0].data[2], matchValue[1].data[2], matchValue[0].data[3], matchValue[0].data[0], matchValue[0].data[1]] : [3] : matchValue[1].tag === 11 ? [1, matchValue[0].data[2], matchValue[1].data[2], matchValue[0].data[3], matchValue[0].data[0], matchValue[0].data[1]] : [3] : matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [2, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[0].data[2]] : [3] : [3];

                  switch ($var11[0]) {
                    case 0:
                      if (function (arg00, arg10) {
                        return g.unionCaseRefEq(arg00, arg10);
                      }($var11[6], $var11[7])) {
                        return new Expr(11, [$var11[4], $var11[5], toList(map2(function (r1_2, r2_2) {
                          return CombineRefutations(g, r1_2, r2_2);
                        }, $var11[1], $var11[2])), $var11[3]]);
                      } else if ($var11[6].CaseName < $var11[7].CaseName) {
                        return r2;
                      } else {
                        return r1;
                      }

                    case 1:
                      return new Expr(11, [$var11[4], $var11[5], toList(map2(function (r1_3, r2_3) {
                        return CombineRefutations(g, r1_3, r2_3);
                      }, $var11[1], $var11[2])), $var11[3]]);

                    case 2:
                      let c12;

                      const MaxStrings = function (s1, s2) {
                        const c = comparePrimitives(s1.length, s2.length) | 0;

                        if (c < 0) {
                          return s2;
                        } else if (c > 0) {
                          return s1;
                        } else if (s1 < s2) {
                          return s2;
                        } else {
                          return s1;
                        }
                      };

                      const matchValue_1 = [$var11[1], $var11[2]];
                      const $var12 = matchValue_1[0].tag === 14 ? matchValue_1[1].tag === 14 ? [0, matchValue_1[0].data, matchValue_1[1].data] : [2] : matchValue_1[0].tag === 15 ? matchValue_1[1].tag === 15 ? [1, matchValue_1[0].data, matchValue_1[1].data] : [2] : [2];

                      switch ($var12[0]) {
                        case 0:
                          c12 = new Const(14, MaxStrings($var12[1], $var12[2]));
                          break;

                        case 1:
                          c12 = new Const(15, $var12[1] > $var12[2] ? $var12[1] : $var12[2]);
                          break;

                        case 2:
                          if ($var11[1].CompareTo($var11[2]) > 0) {
                            c12 = $var11[1];
                          } else {
                            c12 = $var11[2];
                          }

                          break;
                      }

                      return new Expr(0, [c12, $var11[3], $var11[4]]);

                    case 3:
                      return r1;
                  }

              }

          }

      }

  }
}
export function ShowCounterExample(g, denv, m, refuted) {
  try {
    const refutations = collect(function (_arg1) {
      return _arg1.tag === 0 ? ofArray([RefuteDiscrimSet(g, m, _arg1.data[0], _arg1.data[1])]) : new List();
    }, refuted);
    let patternInput;

    if (refutations.tail != null) {
      const r = refutations.head[0];
      const eck = refutations.head[1];

      if (verbose) {
        dprintf(printf("r = %s (enumCoversKnownValue = %b)\n"))(showL(DebugPrint.exprL(r)), eck);
      }

      patternInput = fold(function (tupledArg, tupledArg_1) {
        return [CombineRefutations(g, tupledArg[0], tupledArg_1[0]), tupledArg[1] ? true : tupledArg_1[1]];
      }, [r, eck], refutations.tail);
    } else {
      throw new CannotRefute();
    }

    const text = showL(dataExprL(denv, patternInput[0]));
    const failingWhenClause = exists(function (_arg2) {
      return _arg2.tag === 1 ? true : false;
    }, refuted);
    return [text, failingWhenClause, patternInput[1]];
  } catch (matchValue) {
    if (matchValue instanceof CannotRefute) {
      return null;
    } else {
      warning(new InternalError(toText(printf("<failure during counter example generation: %s>"))(toString(matchValue)), m));
      return null;
    }
  }
}
export class Active {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.Active",
      interfaces: ["FSharpUnion"],
      cases: [["Active", Path, SubExprOfInput, Pattern]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.Active", Active);
export class Frontier {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.Frontier",
      interfaces: ["FSharpUnion"],
      cases: [["Frontier", "number", makeGeneric(List, {
        T: Active
      }), makeGeneric(ValMap, {
        T: Expr
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.Frontier", Frontier);
export class InvestigationPoint {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.InvestigationPoint",
      interfaces: ["FSharpUnion"],
      cases: [["Investigation", "number", DecisionTreeTest, Path]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.InvestigationPoint", InvestigationPoint);
export function isMemOfActives(p1, actives) {
  isMemOfActives: while (true) {
    if (actives.tail != null) {
      const p2 = actives.head.data[0];

      if (pathEq(p1, p2)) {
        return true;
      } else {
        p1 = p1;
        actives = actives.tail;
        continue isMemOfActives;
      }
    } else {
      return false;
    }
  }
}
export function lookupActive(x, l) {
  lookupActive: while (true) {
    if (l.tail != null) {
      const r2 = l.head.data[2];
      const r1 = l.head.data[1];
      const h = l.head.data[0];

      if (pathEq(x, h)) {
        return [r1, r2];
      } else {
        x = x;
        l = l.tail;
        continue lookupActive;
      }
    } else {
      throw new Error();
    }
  }
}
export function removeActive(x, l) {
  if (l.tail != null) {
    const h = l.head.data[0];

    if (pathEq(x, h)) {
      return l.tail;
    } else {
      return new List(l.head, removeActive(x, l.tail));
    }
  } else {
    return new List();
  }
}
export function getDiscrimOfPattern(g, tpinst, t) {
  switch (t.tag) {
    case 12:
      return new DecisionTreeTest(3);

    case 13:
      return new DecisionTreeTest(4, [instType(tpinst, t.data[0]), instType(tpinst, t.data[1])]);

    case 7:
      return new DecisionTreeTest(4, [g.exn_ty, mkAppTy(t.data[0], new List())]);

    case 0:
      return new DecisionTreeTest(2, t.data[0]);

    case 6:
      return new DecisionTreeTest(0, [t.data[0], instTypes(tpinst, t.data[1])]);

    case 9:
      return new DecisionTreeTest(1, [t.data[0].length, t.data[1]]);

    case 5:
      const resTys = t.data[0][1];
      const pexp = t.data[0][0];
      const idx = t.data[0][3] | 0;
      const apinfo = t.data[0][4];
      const apatVrefOpt = t.data[0][2];
      return new DecisionTreeTest(5, [pexp, instTypes(tpinst, resTys), apatVrefOpt, idx, apinfo]);

    default:
      return null;
  }
}
export function constOfDiscrim(discrim) {
  if (discrim.tag === 2) {
    return discrim.data;
  } else {
    throw new Error("not a const case");
  }
}
export function constOfCase(c) {
  return constOfDiscrim(c.Discriminator);
}
export function discrimsEq(g, d1, d2) {
  const matchValue = [d1, d2];
  const $var13 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [1, matchValue[0].data[0], matchValue[1].data[0]] : [6] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [2, matchValue[0].data, matchValue[1].data] : [6] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [3] : [6] : matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? [4, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [6] : matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? [5, matchValue[0].data[3], matchValue[1].data[3], matchValue[0].data[2], matchValue[1].data[2]] : [6] : matchValue[1].tag === 0 ? [0, matchValue[0].data[0], matchValue[1].data[0]] : [6];

  switch ($var13[0]) {
    case 0:
      return function (arg00, arg10) {
        return g.unionCaseRefEq(arg00, arg10);
      }($var13[1], $var13[2]);

    case 1:
      return $var13[1] === $var13[2];

    case 2:
      return $var13[1].Equals($var13[2]);

    case 3:
      return true;

    case 4:
      if (typeEquiv(g, $var13[1], $var13[2])) {
        return typeEquiv(g, $var13[3], $var13[4]);
      } else {
        return false;
      }

    case 5:
      const matchValue_1 = [$var13[3], $var13[4]];
      const $var14 = matchValue_1[0] != null ? matchValue_1[1] != null ? [0, getValue(matchValue_1[0])[1], getValue(matchValue_1[1])[1], getValue(matchValue_1[0])[0], getValue(matchValue_1[1])[0]] : [1] : [1];

      switch ($var14[0]) {
        case 0:
          if ((valRefEq(g, $var14[3], $var14[4]) ? $var13[1] === $var13[2] : false) ? !doesActivePatternHaveFreeTypars(g, $var14[3]) : false) {
            return List_1.lengthsEqAndForall2(function (arg10_, arg20_) {
              return typeEquiv(g, arg10_, arg20_);
            }, $var14[1], $var14[2]);
          } else {
            return false;
          }

        case 1:
          return false;
      }

    case 6:
      return false;
  }
}
export function isDiscrimSubsumedBy(g, amap, m, d1, d2) {
  if (discrimsEq(g, d1, d2)) {
    return true;
  } else {
    const matchValue = [d1, d2];
    const $var15 = matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? [0, matchValue[0].data[1], matchValue[1].data[1]] : [1] : [1];

    switch ($var15[0]) {
      case 0:
        return TypeDefinitelySubsumesTypeNoCoercion(0, g, amap, m, $var15[2], $var15[1]);

      case 1:
        return false;
    }
  }
}
export function chooseSimultaneousEdgeSet(prevOpt, f, l) {
  if (l.tail != null) {
    const matchValue = f(prevOpt, l.head);

    if (matchValue[0] == null) {
      const patternInput = chooseSimultaneousEdgeSet(prevOpt, f, l.tail);
      return [patternInput[0], new List(l.head, patternInput[1])];
    } else {
      const x = getValue(matchValue[0]);
      const patternInput_1 = chooseSimultaneousEdgeSet(makeSome(x), f, l.tail);
      return [new List(x, patternInput_1[0]), patternInput_1[1]];
    }
  } else {
    return [new List(), new List()];
  }
}
export function canCompactConstantClass(c) {
  switch (c.tag) {
    case 1:
    case 3:
    case 5:
    case 2:
    case 4:
    case 6:
    case 13:
      return true;

    default:
      return false;
  }
}
export function discrimsHaveSameSimultaneousClass(g, d1, d2) {
  const matchValue = [d1, d2];
  const $var16 = matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [0] : [3] : matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [0] : [3] : matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [0] : [3] : matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? [1] : [3] : matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? [2, matchValue[0].data[2], matchValue[1].data[2]] : [3] : matchValue[1].tag === 2 ? [0] : [3];

  switch ($var16[0]) {
    case 0:
      return true;

    case 1:
      return false;

    case 2:
      const matchValue_1 = [$var16[1], $var16[2]];
      const $var17 = matchValue_1[0] != null ? matchValue_1[1] != null ? [0, getValue(matchValue_1[0])[1], getValue(matchValue_1[1])[1], getValue(matchValue_1[0])[0], getValue(matchValue_1[1])[0]] : [1] : [1];

      switch ($var17[0]) {
        case 0:
          if (valRefEq(g, $var17[3], $var17[4]) ? !doesActivePatternHaveFreeTypars(g, $var17[3]) : false) {
            return List_1.lengthsEqAndForall2(function (arg10_, arg20_) {
              return typeEquiv(g, arg10_, arg20_);
            }, $var17[1], $var17[2]);
          } else {
            return false;
          }

        case 1:
          return false;
      }

    case 3:
      return false;
  }
}
export function ChooseInvestigationPointLeftToRight(frontiers) {
  if (frontiers.tail == null) {
    throw new Error("ChooseInvestigationPointLeftToRight: no frontiers!");
  } else {
    const actives = frontiers.head.data[1];

    const _i = frontiers.head.data[0] | 0;

    const choose = function (l) {
      choose: while (true) {
        const $var18 = l.tail != null ? l.head.data[2].tag === 12 ? [1, l.head] : l.head.data[2].tag === 13 ? [1, l.head] : l.head.data[2].tag === 7 ? [1, l.head] : l.head.data[2].tag === 6 ? [1, l.head] : l.head.data[2].tag === 9 ? [1, l.head] : l.head.data[2].tag === 0 ? [1, l.head] : l.head.data[2].tag === 5 ? [1, l.head] : l.head.data[2].tag === 11 ? [1, l.head] : [2, l.tail] : [0];

        switch ($var18[0]) {
          case 0:
            throw new Error("ChooseInvestigationPointLeftToRight: no non-immediate patterns in first rule");

          case 1:
            return $var18[1];

          case 2:
            l = $var18[1];
            continue choose;
        }
      }
    };

    return choose(actives);
  }
}
export function BuildSwitch(inpExprOpt, g, expr, edges, dflt, m) {
  var success;
  var edges_2;
  var success_1;
  var edges_3;
  var dflt_1;
  var c;
  var dflt_2;
  var c_1;
  var dflt_3;
  var c_2;
  var dflt_4;
  var c_3;
  var dflt_5;
  var c_4;
  var dflt_6;
  var c_5;
  var dflt_7;
  var c_6;
  var dflt_8;
  var c_7;

  if (verbose) {
    dprintf(printf("--> BuildSwitch@%a, #edges = %A, dflt.IsSome = %A\n"))(function (arg00_, arg10_) {
      outputRange(arg00_, arg10_);
    }, m, edges.length, dflt != null);
  }

  const matchValue = [edges, dflt];
  const $var19 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1] == null ? [2, matchValue[0].head.data[1]] : matchValue[0].head.data[0].tag === 4 ? (success = matchValue[0].head.data[1], edges_2 = matchValue[0].tail, inpExprOpt != null) ? [3, matchValue[1], matchValue[0].tail, matchValue[0].head.data[1]] : [4] : [4] : matchValue[0].head.data[0].tag === 4 ? (success_1 = matchValue[0].head.data[1], edges_3 = matchValue[0].tail, inpExprOpt != null) ? [3, matchValue[1], matchValue[0].tail, matchValue[0].head.data[1]] : [4] : [4] : matchValue[1] != null ? [1, getValue(matchValue[1])] : [0];

  switch ($var19[0]) {
    case 0:
      throw new Error("internal error: no edges and no default");

    case 1:
      return $var19[1];

    case 2:
      return $var19[1];

    case 3:
      return new DecisionTree(0, [expr, ofArray([new DecisionTreeCase(0, [new DecisionTreeTest(3), BuildSwitch(null, g, expr, $var19[2], $var19[1], m)])]), $var19[3], m]);

    case 4:
      const $var20 = matchValue[0].tail != null ? matchValue[0].head.data[0].tag === 3 ? [0, matchValue[1], matchValue[0].head, matchValue[0].tail] : matchValue[0].head.data[0].tag === 4 ? [0, matchValue[1], matchValue[0].head, matchValue[0].tail] : matchValue[0].head.data[0].tag === 2 ? matchValue[0].head.data[0].data.tag === 15 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [1] : matchValue[0].head.data[0].data.tag === 14 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [1] : matchValue[0].head.data[0].data.tag === 11 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [1] : matchValue[0].head.data[0].data.tag === 12 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [1] : matchValue[0].head.data[0].data.tag === 1 ? matchValue[1] != null ? (dflt_1 = getValue(matchValue[1]), c = matchValue[0].head.data[0].data, canCompactConstantClass(c)) ? [3, matchValue[0].head.data[0].data, getValue(matchValue[1])] : [4] : [1] : matchValue[0].head.data[0].data.tag === 2 ? matchValue[1] != null ? (dflt_2 = getValue(matchValue[1]), c_1 = matchValue[0].head.data[0].data, canCompactConstantClass(c_1)) ? [3, matchValue[0].head.data[0].data, getValue(matchValue[1])] : [4] : [1] : matchValue[0].head.data[0].data.tag === 3 ? matchValue[1] != null ? (dflt_3 = getValue(matchValue[1]), c_2 = matchValue[0].head.data[0].data, canCompactConstantClass(c_2)) ? [3, matchValue[0].head.data[0].data, getValue(matchValue[1])] : [4] : [1] : matchValue[0].head.data[0].data.tag === 4 ? matchValue[1] != null ? (dflt_4 = getValue(matchValue[1]), c_3 = matchValue[0].head.data[0].data, canCompactConstantClass(c_3)) ? [3, matchValue[0].head.data[0].data, getValue(matchValue[1])] : [4] : [1] : matchValue[0].head.data[0].data.tag === 5 ? matchValue[1] != null ? (dflt_5 = getValue(matchValue[1]), c_4 = matchValue[0].head.data[0].data, canCompactConstantClass(c_4)) ? [3, matchValue[0].head.data[0].data, getValue(matchValue[1])] : [4] : [1] : matchValue[0].head.data[0].data.tag === 6 ? matchValue[1] != null ? (dflt_6 = getValue(matchValue[1]), c_5 = matchValue[0].head.data[0].data, canCompactConstantClass(c_5)) ? [3, matchValue[0].head.data[0].data, getValue(matchValue[1])] : [4] : [1] : matchValue[0].head.data[0].data.tag === 7 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [1] : matchValue[0].head.data[0].data.tag === 8 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [1] : matchValue[0].head.data[0].data.tag === 9 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [1] : matchValue[0].head.data[0].data.tag === 10 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [1] : matchValue[0].head.data[0].data.tag === 13 ? matchValue[1] != null ? (dflt_7 = getValue(matchValue[1]), c_6 = matchValue[0].head.data[0].data, canCompactConstantClass(c_6)) ? [3, matchValue[0].head.data[0].data, getValue(matchValue[1])] : [4] : [1] : matchValue[1] != null ? (dflt_8 = getValue(matchValue[1]), c_7 = matchValue[0].head.data[0].data, canCompactConstantClass(c_7)) ? [3, matchValue[0].head.data[0].data, getValue(matchValue[1])] : [4] : [4] : matchValue[0].head.data[0].tag === 1 ? matchValue[1] != null ? [2, getValue(matchValue[1])] : [4] : [4] : [4];

      switch ($var20[0]) {
        case 0:
          return new DecisionTree(0, [expr, ofArray([$var20[2]]), BuildSwitch(inpExprOpt, g, expr, $var20[3], $var20[1], m), m]);

        case 1:
          return error(new InternalError("inexhaustive match - need a default cases!", m));

        case 2:
          return foldBack(function (_arg1, sofar) {
            let testexpr;
            const $var21 = _arg1.data[0].tag === 1 ? [0, _arg1.data[0].data[0]] : _arg1.data[0].tag === 2 ? _arg1.data[0].data.tag === 14 ? [1, _arg1.data[0].data] : _arg1.data[0].data.tag === 15 ? [2, _arg1.data[0].data] : _arg1.data[0].data.tag === 12 ? [3, _arg1.data[0].data] : _arg1.data[0].data.tag === 11 ? [3, _arg1.data[0].data] : _arg1.data[0].data.tag === 7 ? [3, _arg1.data[0].data] : _arg1.data[0].data.tag === 8 ? [3, _arg1.data[0].data] : _arg1.data[0].data.tag === 9 ? [3, _arg1.data[0].data] : _arg1.data[0].data.tag === 10 ? [3, _arg1.data[0].data] : [4] : [4];

            switch ($var21[0]) {
              case 0:
                const patternInput = mkCompGenLocalAndInvisbleBind(g, "testExpr", m, expr);
                testexpr = mkLetBind(m, patternInput[2], mkLazyAnd(g, m, mkNonNullTest(g, m, patternInput[1]), mkILAsmCeq(g, m, mkLdlen(g, m, patternInput[1]), mkInt(g, m, $var21[1]))));
                break;

              case 1:
                testexpr = mkCallEqualsOperator(g, m, g.string_ty, expr, new Expr(0, [$var21[1], m, g.string_ty]));
                break;

              case 2:
                testexpr = mkCallEqualsOperator(g, m, g.decimal_ty, expr, new Expr(0, [$var21[1], m, g.decimal_ty]));
                break;

              case 3:
                testexpr = mkILAsmCeq(g, m, expr, new Expr(0, [$var21[1], m, tyOfExpr(g, expr)]));
                break;

              case 4:
                testexpr = error(new InternalError("strange switch", m));
                break;
            }

            return mkBoolSwitch(m, testexpr, _arg1.data[1], sofar);
          }, edges, $var20[1]);

        case 3:
          const edgeCompare = function (c1, c2) {
            const matchValue_1 = [constOfCase(c1), constOfCase(c2)];
            const $var22 = matchValue_1[0].tag === 1 ? matchValue_1[1].tag === 1 ? [0, matchValue_1[0].data, matchValue_1[1].data] : [7] : matchValue_1[0].tag === 3 ? matchValue_1[1].tag === 3 ? [1, matchValue_1[0].data, matchValue_1[1].data] : [7] : matchValue_1[0].tag === 5 ? matchValue_1[1].tag === 5 ? [2, matchValue_1[0].data, matchValue_1[1].data] : [7] : matchValue_1[0].tag === 2 ? matchValue_1[1].tag === 2 ? [3, matchValue_1[0].data, matchValue_1[1].data] : [7] : matchValue_1[0].tag === 4 ? matchValue_1[1].tag === 4 ? [4, matchValue_1[0].data, matchValue_1[1].data] : [7] : matchValue_1[0].tag === 6 ? matchValue_1[1].tag === 6 ? [5, matchValue_1[0].data, matchValue_1[1].data] : [7] : matchValue_1[0].tag === 13 ? matchValue_1[1].tag === 13 ? [6, matchValue_1[0].data, matchValue_1[1].data] : [7] : [7];

            switch ($var22[0]) {
              case 0:
                return comparePrimitives($var22[1], $var22[2]) | 0;

              case 1:
                return comparePrimitives($var22[1], $var22[2]) | 0;

              case 2:
                return comparePrimitives($var22[1], $var22[2]) | 0;

              case 3:
                return comparePrimitives($var22[1], $var22[2]) | 0;

              case 4:
                return comparePrimitives($var22[1], $var22[2]) | 0;

              case 5:
                return comparePrimitives($var22[1], $var22[2]) | 0;

              case 6:
                return comparePrimitives($var22[1], $var22[2]) | 0;

              case 7:
                throw new Error("illtyped term during pattern compilation");
            }
          };

          const edges_ = toList(sortWith(edgeCompare, edges));

          const compactify = function (curr, edges_1) {
            var iprev_5;
            var inext_5;
            var iprev_4;
            var inext_4;
            var iprev_3;
            var inext_3;
            var iprev_2;
            var inext_2;
            var iprev_1;
            var inext_1;
            var iprev;
            var inext;
            var cprev;
            var cnext;

            compactify: while (true) {
              const matchValue_2 = [curr, edges_1];

              if (matchValue_2[0] != null) {
                if (matchValue_2[1].tail != null) {
                  if (getValue(matchValue_2[0]).tail != null) {
                    const matchValue_3 = [constOfCase(getValue(matchValue_2[0]).head), constOfCase(matchValue_2[1].head)];
                    const $var23 = matchValue_3[0].tag === 1 ? matchValue_3[1].tag === 1 ? (iprev_5 = matchValue_3[0].data | 0, inext_5 = matchValue_3[1].data | 0, iprev_5 + 1 === inext_5) ? [0, matchValue_3[1].data, matchValue_3[0].data] : [1] : [1] : [1];

                    switch ($var23[0]) {
                      case 0:
                        curr = ofArray([matchValue_2[1].head, getValue(matchValue_2[0]).head], getValue(matchValue_2[0]).tail);
                        edges_1 = matchValue_2[1].tail;
                        continue compactify;

                      case 1:
                        const $var24 = matchValue_3[0].tag === 3 ? matchValue_3[1].tag === 3 ? (iprev_4 = matchValue_3[0].data | 0, inext_4 = matchValue_3[1].data | 0, iprev_4 + 1 === inext_4) ? [0, matchValue_3[1].data, matchValue_3[0].data] : [1] : [1] : [1];

                        switch ($var24[0]) {
                          case 0:
                            curr = ofArray([matchValue_2[1].head, getValue(matchValue_2[0]).head], getValue(matchValue_2[0]).tail);
                            edges_1 = matchValue_2[1].tail;
                            continue compactify;

                          case 1:
                            const $var25 = matchValue_3[0].tag === 5 ? matchValue_3[1].tag === 5 ? (iprev_3 = matchValue_3[0].data | 0, inext_3 = matchValue_3[1].data | 0, iprev_3 + 1 === inext_3) ? [0, matchValue_3[1].data, matchValue_3[0].data] : [1] : [1] : [1];

                            switch ($var25[0]) {
                              case 0:
                                curr = ofArray([matchValue_2[1].head, getValue(matchValue_2[0]).head], getValue(matchValue_2[0]).tail);
                                edges_1 = matchValue_2[1].tail;
                                continue compactify;

                              case 1:
                                const $var26 = matchValue_3[0].tag === 2 ? matchValue_3[1].tag === 2 ? (iprev_2 = matchValue_3[0].data, inext_2 = matchValue_3[1].data, ~~iprev_2 + 1 === ~~inext_2) ? [0, matchValue_3[1].data, matchValue_3[0].data] : [1] : [1] : [1];

                                switch ($var26[0]) {
                                  case 0:
                                    curr = ofArray([matchValue_2[1].head, getValue(matchValue_2[0]).head], getValue(matchValue_2[0]).tail);
                                    edges_1 = matchValue_2[1].tail;
                                    continue compactify;

                                  case 1:
                                    const $var27 = matchValue_3[0].tag === 4 ? matchValue_3[1].tag === 4 ? (iprev_1 = matchValue_3[0].data, inext_1 = matchValue_3[1].data, ~~iprev_1 + 1 === ~~inext_1) ? [0, matchValue_3[1].data, matchValue_3[0].data] : [1] : [1] : [1];

                                    switch ($var27[0]) {
                                      case 0:
                                        curr = ofArray([matchValue_2[1].head, getValue(matchValue_2[0]).head], getValue(matchValue_2[0]).tail);
                                        edges_1 = matchValue_2[1].tail;
                                        continue compactify;

                                      case 1:
                                        const $var28 = matchValue_3[0].tag === 6 ? matchValue_3[1].tag === 6 ? (iprev = matchValue_3[0].data, inext = matchValue_3[1].data, ~~iprev + 1 === ~~inext) ? [0, matchValue_3[1].data, matchValue_3[0].data] : [1] : [1] : [1];

                                        switch ($var28[0]) {
                                          case 0:
                                            curr = ofArray([matchValue_2[1].head, getValue(matchValue_2[0]).head], getValue(matchValue_2[0]).tail);
                                            edges_1 = matchValue_2[1].tail;
                                            continue compactify;

                                          case 1:
                                            const $var29 = matchValue_3[0].tag === 13 ? matchValue_3[1].tag === 13 ? (cprev = matchValue_3[0].data, cnext = matchValue_3[1].data, cprev.charCodeAt(0) + 1 === cnext.charCodeAt(0)) ? [0, matchValue_3[1].data, matchValue_3[0].data] : [1] : [1] : [1];

                                            switch ($var29[0]) {
                                              case 0:
                                                curr = ofArray([matchValue_2[1].head, getValue(matchValue_2[0]).head], getValue(matchValue_2[0]).tail);
                                                edges_1 = matchValue_2[1].tail;
                                                continue compactify;

                                              case 1:
                                                return new List(reverse(new List(getValue(matchValue_2[0]).head, getValue(matchValue_2[0]).tail)), compactify(null, edges_1));
                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }
                  } else {
                    throw new Error("internal error: compactify");
                  }
                } else {
                  return ofArray([reverse(getValue(matchValue_2[0]))]);
                }
              } else if (matchValue_2[1].tail != null) {
                curr = ofArray([matchValue_2[1].head]);
                edges_1 = matchValue_2[1].tail;
                continue compactify;
              } else {
                return new List();
              }
            }
          };

          const edgeGroups = compactify(null, edges_);
          return foldBack(function (edgeGroup, sofar_1) {
            return new DecisionTree(0, [expr, edgeGroup, sofar_1, m]);
          }, edgeGroups, $var20[2]);

        case 4:
          const $var30 = matchValue[0].tail != null ? matchValue[0].head.data[0].tag === 5 ? [0] : matchValue[1] == null ? [1, matchValue[0].tail, matchValue[0].head.data[1]] : [2] : [2];

          switch ($var30[0]) {
            case 0:
              return error(new InternalError("DecisionTreeTest.ActivePatternCase should have been eliminated", m));

            case 1:
              return new DecisionTree(0, [expr, $var30[1], $var30[2], m]);

            case 2:
              return new DecisionTree(0, [expr, edges, dflt, m]);
          }

      }

  }
}
export function mkFrontiers(investigations, i) {
  return map(function (tupledArg) {
    return new Frontier(0, [i, tupledArg[0], tupledArg[1]]);
  }, investigations);
}
export function getRuleIndex(_arg1) {
  return _arg1.data[0] | 0;
}
export function isPatternPartial(p) {
  isPatternPartial: while (true) {
    const $var31 = p.tag === 0 ? [1] : p.tag === 1 ? [2] : p.tag === 2 ? [3] : p.tag === 3 ? [4, p.data[0]] : p.tag === 4 ? [4, p.data[0]] : p.tag === 8 ? [4, p.data[1]] : p.tag === 7 ? [4, p.data[1]] : p.tag === 9 ? [4, p.data[0]] : p.tag === 6 ? [4, p.data[2]] : p.tag === 10 ? [4, p.data[2]] : p.tag === 11 ? [5] : p.tag === 12 ? [6] : p.tag === 13 ? [7] : [0];

    switch ($var31[0]) {
      case 0:
        const apinfo = p.data[0][4];

        if (!apinfo.IsTotal) {
          return true;
        } else {
          p = p.data[1];
          continue isPatternPartial;
        }

      case 1:
        return false;

      case 2:
        return false;

      case 3:
        p = p.data[0];
        continue isPatternPartial;

      case 4:
        return exists(function (p_1) {
          return isPatternPartial(p_1);
        }, $var31[1]);

      case 5:
        return false;

      case 6:
        return false;

      case 7:
        return false;
    }
  }
}
export function erasePartialPatterns(inpp) {
  switch (inpp.tag) {
    case 2:
      return new Pattern(2, [erasePartialPatterns(inpp.data[0]), inpp.data[1], inpp.data[2]]);

    case 3:
      return new Pattern(3, [erasePartials(inpp.data[0]), inpp.data[1]]);

    case 4:
      return new Pattern(4, [erasePartials(inpp.data[0]), inpp.data[1]]);

    case 8:
      return new Pattern(8, [inpp.data[0], erasePartials(inpp.data[1]), inpp.data[2], inpp.data[3]]);

    case 7:
      return new Pattern(7, [inpp.data[0], erasePartials(inpp.data[1]), inpp.data[2]]);

    case 9:
      return new Pattern(9, [erasePartials(inpp.data[0]), inpp.data[1], inpp.data[2]]);

    case 6:
      return new Pattern(6, [inpp.data[0], inpp.data[1], erasePartials(inpp.data[2]), inpp.data[3]]);

    case 10:
      return new Pattern(10, [inpp.data[0], inpp.data[1], map(function (inpp_1) {
        return erasePartialPatterns(inpp_1);
      }, inpp.data[2]), inpp.data[3]]);

    case 0:
    case 1:
    case 11:
    case 12:
    case 13:
      return inpp;

    default:
      const resTys = inpp.data[0][1];
      const idx = inpp.data[0][3] | 0;
      const expr = inpp.data[0][0];
      const apinfo = inpp.data[0][4];
      const apatVrefOpt = inpp.data[0][2];

      if (apinfo.IsTotal) {
        return new Pattern(5, [[expr, resTys, apatVrefOpt, idx, apinfo], erasePartialPatterns(inpp.data[1]), inpp.data[2]]);
      } else {
        return new Pattern(3, [new List(), inpp.data[2]]);
      }

  }
}
export function erasePartials(inps) {
  return map(function (inpp) {
    return erasePartialPatterns(inpp);
  }, inps);
}
export class EdgeDiscrim {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PatternMatchCompilation.EdgeDiscrim",
      interfaces: ["FSharpUnion"],
      cases: [["EdgeDiscrim", "number", DecisionTreeTest, range]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.PatternMatchCompilation.EdgeDiscrim", EdgeDiscrim);
export function getDiscrim(_arg1) {
  return _arg1.data[1];
}
export function CompilePatternBasic(g, denv, amap, exprm, matchm, warnOnUnused, warnOnIncomplete, actionOnFailure, topv, topgtvs, clausesL, inputTy, resultTy) {
  const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), exprm);
  iterateIndexed(function (_i, c) {
    mbuilder.AddTarget(c.Target);
  }, clausesL);
  const incompleteMatchClauseOnce = {
    contents: null
  };

  const getIncompleteMatchClause = function (refuted) {
    const matchValue = incompleteMatchClauseOnce.contents;

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      if (warnOnIncomplete) {
        const $var32 = actionOnFailure.tag === 0 ? [0] : actionOnFailure.tag === 1 ? [0] : [1];

        switch ($var32[0]) {
          case 0:
            const ignoreWithWarning = actionOnFailure.Equals(new ActionOnFailure(1));
            const matchValue_1 = ShowCounterExample(g, denv, matchm, refuted);

            if (matchValue_1 == null) {
              warning(new MatchIncomplete(ignoreWithWarning, null, matchm));
            } else if (getValue(matchValue_1)[2]) {
              warning(new EnumMatchIncomplete(ignoreWithWarning, [getValue(matchValue_1)[0], getValue(matchValue_1)[1]], matchm));
            } else {
              warning(new MatchIncomplete(ignoreWithWarning, [getValue(matchValue_1)[0], getValue(matchValue_1)[1]], matchm));
            }

            break;

          case 1:
            break;
        }
      }

      let throwExpr;

      switch (actionOnFailure.tag) {
        case 3:
          throwExpr = mkReraise(matchm, resultTy);
          break;

        case 2:
          throwExpr = mkThrow(matchm, resultTy, exprForVal(matchm, topv));
          break;

        case 0:
          throwExpr = mkThrow(matchm, resultTy, mkExnExpr(mk_MFCore_tcref(g.fslibCcu, "MatchFailureException"), ofArray([mkString(g, matchm, matchm.FileName), mkInt(g, matchm, matchm.StartLine), mkInt(g, matchm, matchm.StartColumn)]), matchm));
          break;

        case 1:
          throwExpr = mkUnit(g, matchm);
          break;

        default:
          throwExpr = mkInt(g, matchm, 0);
      }

      const tg = new DecisionTreeTarget(0, [new List(), throwExpr, new SequencePointInfoForTarget(1)]);
      mbuilder.AddTarget(tg);
      const clause = new TypedMatchClause(0, [new Pattern(1, matchm), null, tg, matchm]);
      incompleteMatchClauseOnce.contents = clause;
      return clause;
    }
  };

  const clausesA = Array.from(clausesL);
  const nclauses = clausesA.length | 0;

  const GetClause = function (i, refuted_1) {
    if (i < nclauses) {
      return clausesA[i];
    } else if (i === nclauses) {
      return getIncompleteMatchClause(refuted_1);
    } else {
      throw new Error("GetClause");
    }
  };

  const GetValsBoundByClause = function (i_1, refuted_2) {
    return GetClause(i_1, refuted_2).BoundVals;
  };

  const GetWhenGuardOfClause = function (i_2, refuted_3) {
    return GetClause(i_2, refuted_3).GuardExpr;
  };

  const genUniquePathId = function () {
    return newUnique().neg();
  };

  let patternInput;
  const tyargs = map(function (_arg1) {
    return g.unit_ty;
  }, topgtvs);
  const unit_tpinst = mkTyparInst(topgtvs, tyargs);
  patternInput = [function (arg20_) {
    return GetSubExprOfInput(g, topgtvs, tyargs, unit_tpinst, arg20_);
  }, function (t) {
    return getDiscrimOfPattern(g, unit_tpinst, t);
  }];

  const InvestigateFrontiers = function (refuted_4, frontiers) {
    if (frontiers.tail != null) {
      const valMap = frontiers.head.data[2];
      const i_3 = frontiers.head.data[0] | 0;
      const active = frontiers.head.data[1];

      if (active.tail == null) {
        return CompileSuccessPointAndGuard(i_3, refuted_4, valMap, frontiers.tail);
      } else {
        const patternInput_1 = ChooseInvestigationPointLeftToRight(frontiers);

        switch (patternInput_1.data[2].tag) {
          case 2:
          case 8:
          case 1:
          case 3:
          case 4:
          case 10:
            throw new Error("Unexpected pattern");

          default:
            const patternInput_2 = ChooseSimultaneousEdges(frontiers, patternInput_1.data[0]);
            const patternInput_3 = ChoosePreBinder(patternInput_2[0], patternInput_1.data[1]);
            const patternInput_4 = CompileSimultaneousSet(frontiers, patternInput_1.data[0], refuted_4, patternInput_1.data[1], patternInput_2[0], patternInput_3[0]);
            const defaultTreeOpt = CompileFallThroughTree(patternInput_2[1], patternInput_1.data[0], refuted_4, patternInput_4[0]);
            let finalDecisionTree;
            const inpExprToSwitch = patternInput_3[0] == null ? patternInput[0](patternInput_1.data[1]) : getValue(patternInput_3[0]);
            const tree = BuildSwitch(patternInput_3[0], g, inpExprToSwitch, patternInput_4[0], defaultTreeOpt, matchm);

            if (patternInput_3[1] != null) {
              finalDecisionTree = new DecisionTree(2, [getValue(patternInput_3[1]), tree]);
            } else {
              finalDecisionTree = tree;
            }

            return finalDecisionTree;
        }
      }
    } else {
      throw new Error("CompilePattern:compile - empty clauses: at least the final clause should always succeed");
    }
  };

  const CompileSuccessPointAndGuard = function (i_4, refuted_5, valMap_1, rest) {
    const vs2 = GetValsBoundByClause(i_4, refuted_5);
    const es2 = map(function (v) {
      const matchValue_2 = valMap_1.TryFind(v);

      if (matchValue_2 != null) {
        return getValue(matchValue_2);
      } else {
        return error(new _Error(SR.patcMissingVariable(v.DisplayName), v.Range));
      }
    }, vs2);
    const rhs_ = new DecisionTree(1, [es2, i_4]);
    const matchValue_3 = GetWhenGuardOfClause(i_4, refuted_5);

    if (matchValue_3 == null) {
      return rhs_;
    } else {
      const m = Expr_get_Range.bind(getValue(matchValue_3))();
      const whenExpr = mkLetsFromBindings(m, mkInvisibleBinds(vs2, es2), getValue(matchValue_3));
      return mkBoolSwitch(m, whenExpr, rhs_, InvestigateFrontiers(new List(new RefutedSet(1), refuted_5), rest));
    }
  };

  const ChooseSimultaneousEdges = function (frontiers_1, path) {
    return chooseSimultaneousEdgeSet(null, function (prevOpt, _arg2) {
      var discrimPrev;

      if (isMemOfActives(path, _arg2.data[1])) {
        const p = lookupActive(path, _arg2.data[1])[1];
        const matchValue_4 = patternInput[1](p);

        if (matchValue_4 == null) {
          return [null, true];
        } else if (prevOpt != null ? (discrimPrev = getValue(prevOpt).data[1], discrimsHaveSameSimultaneousClass(g, getValue(matchValue_4), discrimPrev)) : true) {
          return [new EdgeDiscrim(0, [_arg2.data[0], getValue(matchValue_4), p.Range]), true];
        } else {
          return [null, false];
        }
      } else {
        return [null, true];
      }
    }, frontiers_1);
  };

  const ChoosePreBinder = function (simulSetOfEdgeDiscrims, subexpr) {
    var tgty;
    var m_1;

    var _srcty;

    var _i__1;

    var ucref;

    var _i_;

    const $var33 = simulSetOfEdgeDiscrims.tail != null ? simulSetOfEdgeDiscrims.head.data[1].tag === 4 ? (tgty = simulSetOfEdgeDiscrims.head.data[1].data[1], m_1 = simulSetOfEdgeDiscrims.head.data[2], _srcty = simulSetOfEdgeDiscrims.head.data[1].data[0], _i__1 = simulSetOfEdgeDiscrims.head.data[0] | 0, canUseTypeTestFast(g, tgty) ? topgtvs.tail == null : false) ? [0, simulSetOfEdgeDiscrims.head.data[0], simulSetOfEdgeDiscrims.tail, simulSetOfEdgeDiscrims.head.data[1].data[0], simulSetOfEdgeDiscrims.head.data[2], simulSetOfEdgeDiscrims.head.data[1].data[1]] : [1] : [1] : [1];

    switch ($var33[0]) {
      case 0:
        const patternInput_5 = mkCompGenLocal($var33[4], "typeTestResult", $var33[5]);

        if (topv.IsMemberOrModuleBinding) {
          AdjustValToTopVal(patternInput_5[0], topv.DeclaringEntity, ValReprInfoModule.emptyValData);
        }

        const argexp = patternInput[0](subexpr);
        const appexp = mkIsInst($var33[5], argexp, matchm);
        return [patternInput_5[1], mkInvisibleBind(patternInput_5[0], appexp)];

      case 1:
        const $var34 = simulSetOfEdgeDiscrims.tail != null ? simulSetOfEdgeDiscrims.head.data[1].tag === 0 ? (ucref = simulSetOfEdgeDiscrims.head.data[1].data[0], _i_ = simulSetOfEdgeDiscrims.head.data[0] | 0, topgtvs.tail == null ? ucref.Tycon.IsStructRecordOrUnionTycon : false) ? [0, simulSetOfEdgeDiscrims.head.data[0], simulSetOfEdgeDiscrims.tail, simulSetOfEdgeDiscrims.head.data[1].data[0]] : [1] : [1] : [1];

        switch ($var34[0]) {
          case 0:
            const argexp_1 = patternInput[0](subexpr);
            const patternInput_6 = mkExprAddrOfExprAux(g, true, false, new Mutates(2), argexp_1, null, matchm);

            if (patternInput_6[0] != null) {
              const v_1 = getValue(patternInput_6[0])[0];
              const e = getValue(patternInput_6[0])[1];

              if (topv.IsMemberOrModuleBinding) {
                AdjustValToTopVal(v_1, topv.DeclaringEntity, ValReprInfoModule.emptyValData);
              }

              return [patternInput_6[1], mkInvisibleBind(v_1, e)];
            } else {
              return [patternInput_6[1], null];
            }

          case 1:
            const $var35 = simulSetOfEdgeDiscrims.tail != null ? simulSetOfEdgeDiscrims.head.data[1].tag === 5 ? [0, simulSetOfEdgeDiscrims.head.data[1].data[4], simulSetOfEdgeDiscrims.head.data[2], simulSetOfEdgeDiscrims.head.data[1].data[0], simulSetOfEdgeDiscrims.head.data[1].data[1]] : [1] : [1];

            switch ($var35[0]) {
              case 0:
                if (!(topgtvs.tail == null)) {
                  error(new InternalError("Unexpected generalized type variables when compiling an active pattern", $var35[2]));
                }

                const rty = function (arg00, arg10, arg20) {
                  return ActivePatternInfo_ResultType.bind($var35[1])(arg00, arg10, arg20);
                }(g, $var35[2], $var35[4]);

                const patternInput_7 = mkCompGenLocal($var35[2], "activePatternResult" + newUnique().toString(), rty);

                if (topv.IsMemberOrModuleBinding) {
                  AdjustValToTopVal(patternInput_7[0], topv.DeclaringEntity, ValReprInfoModule.emptyValData);
                }

                const argexp_2 = patternInput[0](subexpr);
                const appexp_1 = mkApps(g, [$var35[3], tyOfExpr(g, $var35[3])], new List(), ofArray([argexp_2]), $var35[2]);
                return [patternInput_7[1], mkInvisibleBind(patternInput_7[0], appexp_1)];

              case 1:
                return [null, null];
            }

        }

    }
  };

  const CompileSimultaneousSet = function (frontiers_2, path_1, refuted_6, subexpr_1, simulSetOfEdgeDiscrims_1, inpExprOpt) {
    return List_1.collectFold(function (taken, _arg3) {
      if (exists(function (d2) {
        return isDiscrimSubsumedBy(g, amap, _arg3.data[2], _arg3.data[1], d2);
      }, taken)) {
        return [new List(), taken];
      } else {
        let patternInput_9;
        const $var36 = _arg3.data[1].tag === 0 ? ((((topgtvs.tail == null ? !topv.IsMemberOrModuleBinding : false) ? !_arg3.data[1].data[0].Tycon.IsStructRecordOrUnionTycon : false) ? _arg3.data[1].data[0].UnionCase.RecdFields.length >= 1 : false) ? _arg3.data[1].data[0].Tycon.UnionCasesArray.length > 1 : false) ? [0, _arg3.data[1].data[1], _arg3.data[1].data[0]] : [1] : [1];

        switch ($var36[0]) {
          case 0:
            const patternInput_8 = mkCompGenLocal(_arg3.data[2], "unionCase", mkProvenUnionCaseTy($var36[2], $var36[1]));
            const argexp_3 = patternInput[0](subexpr_1);
            const appexp_2 = mkUnionCaseProof(argexp_3, $var36[2], $var36[1], _arg3.data[2]);
            patternInput_9 = [patternInput_8[1], mkInvisibleBind(patternInput_8[0], appexp_2)];
            break;

          case 1:
            patternInput_9 = [null, null];
            break;
        }

        let discrim_;

        if (_arg3.data[1].tag === 5) {
          const aparity = ActivePatternInfo_get_Names.bind(_arg3.data[1].data[4])().length | 0;
          const total = _arg3.data[1].data[4].IsTotal;

          if (!total ? aparity > 1 : false) {
            error(new _Error(SR.patcPartialActivePatternsGenerateOneResult(), _arg3.data[2]));
          }

          if (!total) {
            discrim_ = new DecisionTreeTest(0, [mkSomeCase(g), _arg3.data[1].data[1]]);
          } else if (aparity <= 1) {
            discrim_ = new DecisionTreeTest(2, new Const(16));
          } else {
            discrim_ = new DecisionTreeTest(0, [mkChoiceCaseRef(g, _arg3.data[2], aparity, _arg3.data[1].data[3]), _arg3.data[1].data[1]]);
          }
        } else {
          discrim_ = _arg3.data[1];
        }

        const investigation = new InvestigationPoint(0, [_arg3.data[0], _arg3.data[1], path_1]);
        const frontiers_3 = collect(CurriedLambda(GenerateNewFrontiersAfterSucccessfulInvestigation)(inpExprOpt, patternInput_9[0], investigation), frontiers_2);
        const tree_1 = InvestigateFrontiers(refuted_6, frontiers_3);
        const tree_2 = patternInput_9[1] != null ? new DecisionTree(2, [getValue(patternInput_9[1]), tree_1]) : tree_1;
        const edge = new DecisionTreeCase(0, [discrim_, tree_2]);
        return [ofArray([edge]), new List(_arg3.data[1], taken)];
      }
    }, new List(), simulSetOfEdgeDiscrims_1);
  };

  const CompileFallThroughTree = function (fallthroughPathFrontiers, path_2, refuted_7, simulSetOfCases) {
    var _b;

    var ucref_1;
    const simulSetOfDiscrims = map(function (c_1) {
      return c_1.Discriminator;
    }, simulSetOfCases);

    const isRefuted = function (_arg5) {
      if (isMemOfActives(path_2, _arg5.data[1])) {
        const p_1 = lookupActive(path_2, _arg5.data[1])[1];
        const matchValue_5 = patternInput[1](p_1);

        if (matchValue_5 == null) {
          return false;
        } else {
          return exists(function (d2_1) {
            return isDiscrimSubsumedBy(g, amap, exprm, getValue(matchValue_5), d2_1);
          }, simulSetOfDiscrims);
        }
      } else {
        return false;
      }
    };

    const $var37 = simulSetOfDiscrims.tail != null ? simulSetOfDiscrims.head.tag === 2 ? simulSetOfDiscrims.head.data.tag === 0 ? (_b = simulSetOfDiscrims.head.data.data, simulSetOfCases.length === 2) ? [0, simulSetOfDiscrims.head.data.data] : [1] : [1] : [1] : [1];

    switch ($var37[0]) {
      case 0:
        return null;

      case 1:
        const $var38 = simulSetOfDiscrims.tail != null ? simulSetOfDiscrims.head.tag === 2 ? simulSetOfDiscrims.head.data.tag === 16 ? [0] : [2] : simulSetOfDiscrims.head.tag === 0 ? (ucref_1 = simulSetOfDiscrims.head.data[0], simulSetOfCases.length === ucref_1.TyconRef.UnionCasesArray.length) ? [1, simulSetOfDiscrims.head.data[0]] : [2] : [2] : [2];

        switch ($var38[0]) {
          case 0:
            return null;

          case 1:
            return null;

          case 2:
            const $var39 = simulSetOfDiscrims.tail != null ? simulSetOfDiscrims.head.tag === 5 ? [0] : [1] : [1];

            switch ($var39[0]) {
              case 0:
                return error(new InternalError("DecisionTreeTest.ActivePatternCase should have been eliminated", matchm));

              case 1:
                const fallthroughPathFrontiers_1 = filter($var40 => function (value) {
                  return !value;
                }(isRefuted($var40)), fallthroughPathFrontiers);
                const refuted_8 = new List(new RefutedSet(0, [path_2, simulSetOfDiscrims]), refuted_7);

                if (fallthroughPathFrontiers_1.tail == null) {
                  return null;
                } else {
                  return InvestigateFrontiers(refuted_8, fallthroughPathFrontiers_1);
                }

            }

        }

    }
  };

  const GenerateNewFrontiersAfterSucccessfulInvestigation = function (inpExprOpt_1, resPostBindOpt, _arg2_1, _arg1_1) {
    if (isMemOfActives(_arg2_1.data[2], _arg1_1.data[1])) {
      const patternInput_10 = lookupActive(_arg2_1.data[2], _arg1_1.data[1]);
      const ve = patternInput_10[0].data[1];
      const accessf = patternInput_10[0].data[0];

      const mkSubFrontiers = function (path_3, accessf_, active_, argpats, pathBuilder) {
        const mkSubActive = function (j, p_2) {
          const newSubExpr = new SubExprOfInput(0, [CurriedLambda(accessf_)(j), ve]);
          const newPath = pathBuilder(path_3, j);
          return new Active(0, [newPath, newSubExpr, p_2]);
        };

        const newActives = mapIndexed(mkSubActive, argpats);
        const investigations = BindProjectionPatterns(newActives, [active_, _arg1_1.data[2]]);
        return mkFrontiers(investigations, _arg1_1.data[0]);
      };

      const active__1 = removeActive(_arg2_1.data[2], _arg1_1.data[1]);

      switch (patternInput_10[1].tag) {
        case 1:
        case 2:
        case 8:
        case 3:
        case 4:
        case 10:
          throw new Error("Unexpected projection pattern");

        case 5:
          const resTys = patternInput_10[1].data[0][1];
          const idx = patternInput_10[1].data[0][3] | 0;
          const apinfo = patternInput_10[1].data[0][4];
          const apatVrefOpt = patternInput_10[1].data[0][2];

          if (apinfo.IsTotal) {
            let hasParam;

            if (apatVrefOpt != null) {
              const vref = getValue(apatVrefOpt)[0];
              hasParam = doesActivePatternHaveFreeTypars(g, vref);
            } else {
              hasParam = true;
            }

            if ((hasParam ? _arg1_1.data[0] === _arg2_1.data[0] : false) ? true : discrimsEq(g, _arg2_1.data[1], getValue(patternInput[1](patternInput_10[1])))) {
              const aparity_1 = ActivePatternInfo_get_Names.bind(apinfo)().length | 0;

              const accessf__1 = function (j_1, tpinst, _e_) {
                if (aparity_1 <= 1) {
                  return getValue(inpExprOpt_1);
                } else {
                  const ucref_2 = mkChoiceCaseRef(g, patternInput_10[1].data[2], aparity_1, idx);
                  return mkUnionCaseFieldGetUnprovenViaExprAddr(getValue(inpExprOpt_1), ucref_2, instTypes(tpinst, resTys), j_1, exprm);
                }
              };

              return mkSubFrontiers(_arg2_1.data[2], accessf__1, active__1, ofArray([patternInput_10[1].data[1]]), function (path_4, j_2) {
                return new Path(0, [path_4, fromNumber(j_2, false)]);
              });
            } else if (hasParam) {
              return ofArray([_arg1_1]);
            } else {
              return new List();
            }
          } else if (_arg1_1.data[0] === _arg2_1.data[0]) {
            const accessf__2 = function (_j, tpinst_1, _arg6) {
              return mkUnionCaseFieldGetUnprovenViaExprAddr(getValue(inpExprOpt_1), mkSomeCase(g), instTypes(tpinst_1, resTys), 0, exprm);
            };

            return mkSubFrontiers(_arg2_1.data[2], accessf__2, active__1, ofArray([patternInput_10[1].data[1]]), function (path_5, j_3) {
              return new Path(0, [path_5, fromNumber(j_3, false)]);
            });
          } else {
            return ofArray([_arg1_1]);
          }

        case 6:
          const $var41 = _arg2_1.data[1].tag === 0 ? function (arg00_1, arg10_1) {
            return g.unionCaseRefEq(arg00_1, arg10_1);
          }(patternInput_10[1].data[0], _arg2_1.data[1].data[0]) ? [0, _arg2_1.data[1].data[1], _arg2_1.data[1].data[0]] : [1] : [1];

          switch ($var41[0]) {
            case 0:
              const accessf__3 = function (j_4, tpinst_2, exprIn) {
                if (resPostBindOpt == null) {
                  const exprIn_1 = inpExprOpt_1 == null ? accessf(tpinst_2, exprIn) : getValue(inpExprOpt_1);
                  return mkUnionCaseFieldGetUnprovenViaExprAddr(exprIn_1, patternInput_10[1].data[0], instTypes(tpinst_2, patternInput_10[1].data[1]), j_4, exprm);
                } else {
                  return mkUnionCaseFieldGetProvenViaExprAddr(getValue(resPostBindOpt), patternInput_10[1].data[0], $var41[1], j_4, exprm);
                }
              };

              return mkSubFrontiers(_arg2_1.data[2], accessf__3, active__1, patternInput_10[1].data[2], function (path_6, j_5) {
                return new Path(4, [path_6, patternInput_10[1].data[0], patternInput_10[1].data[1], j_5]);
              });

            case 1:
              if (_arg2_1.data[1].tag === 0) {
                return new List();
              } else {
                return ofArray([_arg1_1]);
              }

          }

        case 9:
          const $var42 = _arg2_1.data[1].tag === 1 ? patternInput_10[1].data[0].length === _arg2_1.data[1].data[0] ? [0, _arg2_1.data[1].data[0]] : [1] : [1];

          switch ($var42[0]) {
            case 0:
              const accessf__4 = function (j_6, tpinst_3, exprIn_2) {
                return mkCallArrayGet(g, exprm, patternInput_10[1].data[1], accessf(tpinst_3, exprIn_2), mkInt(g, exprm, j_6));
              };

              return mkSubFrontiers(_arg2_1.data[2], accessf__4, active__1, patternInput_10[1].data[0], function (path_7, j_7) {
                return new Path(5, [path_7, patternInput_10[1].data[1], patternInput_10[1].data[0].length, j_7]);
              });

            case 1:
              if (_arg2_1.data[1].tag === 1) {
                return new List();
              } else {
                return ofArray([_arg1_1]);
              }

          }

        case 7:
          const $var43 = _arg2_1.data[1].tag === 4 ? typeEquiv(g, mkAppTy(patternInput_10[1].data[0], new List()), _arg2_1.data[1].data[1]) ? [0, _arg2_1.data[1].data[0], _arg2_1.data[1].data[1]] : [1] : [1];

          switch ($var43[0]) {
            case 0:
              const accessf__5 = function (j_8, tpinst_4, exprIn_3) {
                return mkExnCaseFieldGet(accessf(tpinst_4, exprIn_3), patternInput_10[1].data[0], j_8, exprm);
              };

              return mkSubFrontiers(_arg2_1.data[2], accessf__5, active__1, patternInput_10[1].data[1], function (path_8, j_9) {
                return new Path(6, [path_8, patternInput_10[1].data[0], j_9]);
              });

            case 1:
              return ofArray([_arg1_1]);
          }

        case 13:
          const $var44 = _arg2_1.data[1].tag === 4 ? typeEquiv(g, patternInput_10[1].data[1], _arg2_1.data[1].data[1]) ? [0, _arg2_1.data[1].data[0], _arg2_1.data[1].data[1]] : [1] : [1];

          switch ($var44[0]) {
            case 0:
              if (patternInput_10[1].data[2] == null) {
                return ofArray([new Frontier(0, [_arg1_1.data[0], active__1, _arg1_1.data[2]])]);
              } else {
                const accessf__6 = function (tpinst_5, exprIn_4) {
                  if (inpExprOpt_1 != null) {
                    return getValue(inpExprOpt_1);
                  } else {
                    return mkCallUnboxFast(g, exprm, instType(tpinst_5, patternInput_10[1].data[1]), accessf(tpinst_5, exprIn_4));
                  }
                };

                const patternInput_11 = BindSubExprOfInput(g, amap, topgtvs, getValue(patternInput_10[1].data[2]), exprm, new SubExprOfInput(0, [accessf__6, ve]));
                return ofArray([new Frontier(0, [_arg1_1.data[0], active__1, function (arg00_2, arg10_2) {
                  return _arg1_1.data[2].Add(arg00_2, arg10_2);
                }(patternInput_11[0], patternInput_11[1])])]);
              }

            case 1:
              return ofArray([_arg1_1]);
          }

        case 12:
          if (_arg2_1.data[1].tag === 3) {
            return ofArray([new Frontier(0, [_arg1_1.data[0], active__1, _arg1_1.data[2]])]);
          } else {
            return ofArray([_arg1_1]);
          }

        case 0:
          const $var45 = _arg2_1.data[1].tag === 2 ? patternInput_10[1].data[0].Equals(_arg2_1.data[1].data) ? [0, _arg2_1.data[1].data] : [1] : [1];

          switch ($var45[0]) {
            case 0:
              return ofArray([new Frontier(0, [_arg1_1.data[0], active__1, _arg1_1.data[2]])]);

            case 1:
              if (_arg2_1.data[1].tag === 2) {
                return new List();
              } else {
                return ofArray([_arg1_1]);
              }

          }

        default:
          throw new Error("pattern compilation: GenerateNewFrontiersAfterSucccessfulInvestigation");
      }
    } else {
      return ofArray([_arg1_1]);
    }
  };

  const BindProjectionPattern = function (_arg4, _arg3_1) {
    var vref_1;

    BindProjectionPattern: while (true) {
      const mkSubActive_1 = function (pathBuilder_1, accessf__7, j_10, p_) {
        return new Active(0, [pathBuilder_1(_arg4.data[0], j_10), new SubExprOfInput(0, [CurriedLambda(accessf__7)(j_10), _arg4.data[1].data[1]]), p_]);
      };

      switch (_arg4.data[2].tag) {
        case 1:
          return BindProjectionPatterns(new List(), _arg3_1);

        case 2:
          const patternInput_12 = BindSubExprOfInput(g, amap, topgtvs, _arg4.data[2].data[1], _arg4.data[2].data[2], _arg4.data[1]);
          _arg4 = new Active(0, [_arg4.data[0], _arg4.data[1], _arg4.data[2].data[0]]);
          _arg3_1 = [_arg3_1[0], function (arg00_3, arg10_3) {
            return _arg3_1[1].Add(arg00_3, arg10_3);
          }(patternInput_12[0], patternInput_12[1])];
          continue BindProjectionPattern;

        case 8:
          const accessf__8 = function (j_11, tpinst_6, subExpr_) {
            return mkTupleFieldGet(g, _arg4.data[2].data[0], _arg4.data[1].data[0](tpinst_6, subExpr_), instTypes(tpinst_6, _arg4.data[2].data[2]), j_11, exprm);
          };

          const pathBuilder_2 = function (path_9, j_12) {
            return new Path(2, [path_9, _arg4.data[2].data[2], j_12]);
          };

          const newActives_1 = mapIndexed(CurriedLambda(mkSubActive_1)(pathBuilder_2, accessf__8), _arg4.data[2].data[1]);
          return BindProjectionPatterns(newActives_1, _arg3_1);

        case 10:
          const newActives_2 = toList(mapIndexed2(function (j_13, p_3, fref) {
            const accessf__9 = function (fref_1, _j_1, tpinst_7, exprIn_5) {
              return mkRecdFieldGet(g, _arg4.data[1].data[0](tpinst_7, exprIn_5), fref_1, instTypes(tpinst_7, _arg4.data[2].data[1]), exprm);
            };

            const pathBuilder_3 = function (path_10, j_14) {
              return new Path(3, [path_10, _arg4.data[2].data[0], _arg4.data[2].data[1], j_14]);
            };

            return mkSubActive_1(pathBuilder_3, CurriedLambda(accessf__9)(fref), j_13, p_3);
          }, _arg4.data[2].data[2], _arg4.data[2].data[0].TrueInstanceFieldsAsRefList));
          return BindProjectionPatterns(newActives_2, _arg3_1);

        case 3:
          return collect(function (p_4) {
            return BindProjectionPattern(new Active(0, [_arg4.data[0], _arg4.data[1], p_4]), _arg3_1);
          }, _arg4.data[2].data[0]);

        case 4:
          const newActives_3 = mapIndexed(CurriedLambda(mkSubActive_1)(function (path_11, j_15) {
            return new Path(1, [path_11, j_15]);
          }, CurriedLambda(function (_j_2) {
            return _arg4.data[1].data[0];
          })), _arg4.data[2].data[0]);
          return BindProjectionPatterns(newActives_3, _arg3_1);

        case 11:
          const res = {
            contents: new List()
          };

          for (let i_5 = _arg4.data[2].data[0].charCodeAt(0); i_5 <= _arg4.data[2].data[1].charCodeAt(0); i_5++) {
            res.contents = append_1(BindProjectionPattern(new Active(0, [_arg4.data[0], _arg4.data[1], new Pattern(0, [new Const(13, String.fromCharCode(i_5)), _arg4.data[2].data[2]])]), _arg3_1), res.contents);
          }

          return res.contents;

        case 5:
          const apatVrefOpt_1 = _arg4.data[2].data[0][2];
          let uniqId;
          const $var46 = apatVrefOpt_1 != null ? (vref_1 = getValue(apatVrefOpt_1)[0], !doesActivePatternHaveFreeTypars(g, vref_1)) ? [0, getValue(apatVrefOpt_1)[0]] : [1] : [1];

          switch ($var46[0]) {
            case 0:
              uniqId = $var46[1].Stamp;
              break;

            case 1:
              uniqId = genUniquePathId();
              break;
          }

          const inp = new Active(0, [new Path(0, [_arg4.data[0], uniqId]), _arg4.data[1], _arg4.data[2]]);
          return ofArray([[new List(inp, _arg3_1[0]), _arg3_1[1]]]);

        default:
          return ofArray([[new List(_arg4, _arg3_1[0]), _arg3_1[1]]]);
      }
    }
  };

  const BindProjectionPatterns = function (ps, s) {
    return foldBack(function (p_5, sofar) {
      return collect(CurriedLambda(BindProjectionPattern)(p_5), sofar);
    }, ps, ofArray([s]));
  };

  const frontiers_4 = append_1(concat(mapIndexed(function (i_6, c_2) {
    const initialSubExpr = new SubExprOfInput(0, [function (_tpinst, x) {
      return x;
    }, [exprForVal(topv.Range, topv), topv]]);
    const investigations_1 = BindProjectionPattern(new Active(0, [new Path(7, inputTy), initialSubExpr, c_2.Pattern]), [new List(), ValMap.Empty]);
    return mkFrontiers(investigations_1, i_6);
  }, clausesL)), mkFrontiers(ofArray([[new List(), ValMap.Empty]]), nclauses));
  const dtree = InvestigateFrontiers(new List(), frontiers_4);
  const targets = mbuilder.CloseTargets();

  if (warnOnUnused) {
    const used = create(ofList(accTargetsOfDecisionTree(dtree, new List())), fromEqualityComparer({
      GetHashCode(x_1) {
        return function (obj) {
          return hash(obj);
        }(x_1) | 0;
      },

      Equals(x_1, y) {
        return function (e1, e2) {
          return equals(e1, e2);
        }(x_1, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    }));
    iterateIndexed(function (i_7, c_3) {
      if (!used.has(i_7)) {
        warning(new RuleNeverMatched(c_3.Range));
      }
    }, clausesL);
  }

  return [dtree, targets];
}
export function isPartialOrWhenClause(c) {
  if (isPatternPartial(c.Pattern)) {
    return true;
  } else {
    return CurriedLambda(() => c.GuardExpr != null)();
  }
}
export function CompilePattern(g, denv, amap, exprm, matchm, warnOnUnused, actionOnFailure, topv, topgtvs, clausesL, inputTy, resultTy) {
  if (exists(function (c) {
    return isPartialOrWhenClause(c);
  }, clausesL)) {
    const clausesPretendAllPartialFail = collect(function (_arg1) {
      return ofArray([new TypedMatchClause(0, [erasePartialPatterns(_arg1.data[0]), _arg1.data[1], _arg1.data[2], _arg1.data[3]])]);
    }, clausesL);
    CompilePatternBasic(g, denv, amap, exprm, matchm, false, true, actionOnFailure, topv, topgtvs, clausesPretendAllPartialFail, inputTy, resultTy);

    const atMostOnePartialAtATime = function (clauses) {
      const matchValue = List_1.takeUntil(function (c_1) {
        return isPartialOrWhenClause(c_1);
      }, clauses);

      if (matchValue[1].tail != null) {
        const t = matchValue[1].tail;
        const h = matchValue[1].head;
        return doGroupWithAtMostOnePartial(append_1(matchValue[0], ofArray([h])), t);
      } else {
        return CompilePatternBasic(g, denv, amap, exprm, matchm, false, false, actionOnFailure, topv, topgtvs, matchValue[0], inputTy, resultTy);
      }
    };

    const doGroupWithAtMostOnePartial = function (group, rest) {
      const patternInput = atMostOnePartialAtATime(rest);
      const expr = mkAndSimplifyMatch(new SequencePointInfoForBinding(4), exprm, matchm, resultTy, patternInput[0], patternInput[1]);
      const spTarget = equals(Expr_get_Range.bind(expr)(), matchm) ? new SequencePointInfoForTarget(1) : new SequencePointInfoForTarget(0);
      const clauseForRestOfMatch = new TypedMatchClause(0, [new Pattern(1, matchm), null, new DecisionTreeTarget(0, [new List(), expr, spTarget]), matchm]);
      return CompilePatternBasic(g, denv, amap, exprm, matchm, false, false, actionOnFailure, topv, topgtvs, append_1(group, ofArray([clauseForRestOfMatch])), inputTy, resultTy);
    };

    return atMostOnePartialAtATime(clausesL);
  } else {
    return CompilePatternBasic(g, denv, amap, exprm, matchm, warnOnUnused, true, actionOnFailure, topv, topgtvs, clausesL, inputTy, resultTy);
  }
}