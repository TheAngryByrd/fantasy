import { warning, Error as _Error, errorR, InternalError, error } from "./ErrorLogger";
import { tyOfExpr, AdjustArityOfLambdaBody, Expr$2E$get_Range as Expr_get_Range, instExpr, CollectTyparsNoCaching, freeInExpr, instTypes, mkTyparInst, isObjTy, isInterfaceTy, isAppTy, isRefTy, measureEquiv, evalTupInfoIsStruct, tyconRefEq, stripTyEqns, typeEquiv, DebugPrint } from "./TastOps";
import { List } from "../absil/illib";
import { GetImmediateInterfacesOfType, SkipUnrefInterfaces, GetSuperTypeOfType } from "./infos";
import { defaultArg, getValue } from "../fable-core/Option";
import { tryFind, toList, foldBack2, forAll2, fold, exists } from "../fable-core/Seq";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives } from "../fable-core/Util";
import { TyparRigidity, Measure, TType } from "./tast";
import { SR } from "../codegen/FSComp";
import { append, map, filter } from "../fable-core/List";
import List_1 from "../fable-core/List";
import { ZsetModule } from "../absil/zset";
import { printf, toText } from "../fable-core/String";
export function TypeDefinitelySubsumesTypeNoCoercion(ndeep, g, amap, m, ty1, ty2) {
  var tc2_1;
  var tc1_1;
  var l2_1;
  var l1_1;
  var tc2;
  var tc1;
  var l2;
  var l1;
  var matchValue_1;
  var ndeep_1;
  var skipUnref;

  if (ndeep > 100) {
    error(new InternalError("recursive class hierarchy (detected in TypeDefinitelySubsumesTypeNoCoercion), ty1 = " + DebugPrint.showType(ty1), m));
  }

  if (ty1 === ty2) {
    return true;
  } else if (typeEquiv(g, ty1, ty2)) {
    return true;
  } else {
    const ty1_1 = stripTyEqns(g, ty1);
    const ty2_1 = stripTyEqns(g, ty2);
    const matchValue = [ty1_1, ty2_1];
    const $var1 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? (tc2_1 = matchValue[1].data[0], tc1_1 = matchValue[0].data[0], l2_1 = matchValue[1].data[1], l1_1 = matchValue[0].data[1], tyconRefEq(g, tc1_1, tc2_1)) ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [1] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return List.lengthsEqAndForall2(function (arg10_, arg20_) {
          return typeEquiv(g, arg10_, arg20_);
        }, $var1[1], $var1[2]);

      case 1:
        const $var2 = matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? (tc2 = matchValue[1].data[0], tc1 = matchValue[0].data[0], l2 = matchValue[1].data[1], l1 = matchValue[0].data[1], function (arg00, arg10) {
          return g.unionCaseRefEq(arg00, arg10);
        }(tc1, tc2)) ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [1] : [1] : [1];

        switch ($var2[0]) {
          case 0:
            return List.lengthsEqAndForall2(function (arg10__1, arg20__1) {
              return typeEquiv(g, arg10__1, arg20__1);
            }, $var2[1], $var2[2]);

          case 1:
            const $var3 = matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [3] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [1, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [3] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [2, matchValue[0].data, matchValue[1].data] : [3] : [3];

            switch ($var3[0]) {
              case 0:
                if (evalTupInfoIsStruct($var3[3]) === evalTupInfoIsStruct($var3[4])) {
                  return List.lengthsEqAndForall2(function (arg10__2, arg20__2) {
                    return typeEquiv(g, arg10__2, arg20__2);
                  }, $var3[1], $var3[2]);
                } else {
                  return false;
                }

              case 1:
                if (typeEquiv(g, $var3[1], $var3[2])) {
                  return typeEquiv(g, $var3[3], $var3[4]);
                } else {
                  return false;
                }

              case 2:
                return measureEquiv(g, $var3[1], $var3[2]);

              case 3:
                if (typeEquiv(g, ty1_1, g.obj_ty) ? isRefTy(g, ty2_1) : false) {
                  return true;
                } else if (isAppTy(g, ty2_1) ? isRefTy(g, ty2_1) : false) {
                  if (matchValue_1 = GetSuperTypeOfType(g, amap, m, ty2_1), matchValue_1 != null ? TypeDefinitelySubsumesTypeNoCoercion(ndeep + 1, g, amap, m, ty1_1, getValue(matchValue_1)) : false) {
                    return true;
                  } else if (isInterfaceTy(g, ty1_1)) {
                    return exists((ndeep_1 = ndeep + 1 | 0, function (ty2_2) {
                      return TypeDefinitelySubsumesTypeNoCoercion(ndeep_1, g, amap, m, ty1_1, ty2_2);
                    }), (skipUnref = new SkipUnrefInterfaces(0), function (typ) {
                      return GetImmediateInterfacesOfType(skipUnref, g, amap, m, typ);
                    })(ty2_1));
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }

            }

        }

    }
  }
}
export class CanCoerce {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TypeRelations.CanCoerce",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CanCoerce"], ["NoCoerce"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.TypeRelations.CanCoerce", CanCoerce);
export function TypesFeasiblyEquiv(ndeep, g, amap, m, ty1, ty2) {
  var tc2;
  var tc1;
  var l2;
  var l1;

  TypesFeasiblyEquiv: while (true) {
    if (ndeep > 100) {
      error(new InternalError("recursive class hierarchy (detected in TypeFeasiblySubsumesType), ty1 = " + DebugPrint.showType(ty1), m));
    }

    const ty1_1 = stripTyEqns(g, ty1);
    const ty2_1 = stripTyEqns(g, ty2);
    const matchValue = [ty1_1, ty2_1];
    const $var4 = matchValue[0].tag === 5 ? [0] : matchValue[0].tag === 1 ? matchValue[1].tag === 5 ? [0] : matchValue[1].tag === 1 ? (tc2 = matchValue[1].data[0], tc1 = matchValue[0].data[0], l2 = matchValue[1].data[1], l1 = matchValue[0].data[1], tyconRefEq(g, tc1, tc2)) ? [1, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [2] : [2] : matchValue[1].tag === 5 ? [0] : [2];

    switch ($var4[0]) {
      case 0:
        return true;

      case 1:
        return List.lengthsEqAndForall2(function (ty1_2, ty2_2) {
          return TypesFeasiblyEquiv(ndeep, g, amap, m, ty1_2, ty2_2);
        }, $var4[1], $var4[2]);

      case 2:
        const $var5 = matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [3] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [1, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [3] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [2] : [3] : [3];

        switch ($var5[0]) {
          case 0:
            if (evalTupInfoIsStruct($var5[3]) === evalTupInfoIsStruct($var5[4])) {
              return List.lengthsEqAndForall2(function (ty1_3, ty2_3) {
                return TypesFeasiblyEquiv(ndeep, g, amap, m, ty1_3, ty2_3);
              }, $var5[1], $var5[2]);
            } else {
              return false;
            }

          case 1:
            if (TypesFeasiblyEquiv(ndeep, g, amap, m, $var5[1], $var5[2])) {
              ndeep = ndeep;
              g = g;
              amap = amap;
              m = m;
              ty1 = $var5[3];
              ty2 = $var5[4];
              continue TypesFeasiblyEquiv;
            } else {
              return false;
            }

          case 2:
            return true;

          case 3:
            return false;
        }

    }
  }
}
export function TypeFeasiblySubsumesType(ndeep, g, amap, m, ty1, canCoerce, ty2) {
  var tc2;
  var tc1;
  var l2;
  var l1;
  var matchValue_1;
  var ndeep_1;
  var canCoerce_1;
  var skipUnref;

  if (ndeep > 100) {
    error(new InternalError("recursive class hierarchy (detected in TypeFeasiblySubsumesType), ty1 = " + DebugPrint.showType(ty1), m));
  }

  const ty1_1 = stripTyEqns(g, ty1);
  const ty2_1 = stripTyEqns(g, ty2);
  const matchValue = [ty1_1, ty2_1];
  const $var6 = matchValue[0].tag === 5 ? [0] : matchValue[0].tag === 1 ? matchValue[1].tag === 5 ? [0] : matchValue[1].tag === 1 ? (tc2 = matchValue[1].data[0], tc1 = matchValue[0].data[0], l2 = matchValue[1].data[1], l1 = matchValue[0].data[1], tyconRefEq(g, tc1, tc2)) ? [1, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [2] : [2] : matchValue[1].tag === 5 ? [0] : [2];

  switch ($var6[0]) {
    case 0:
      return true;

    case 1:
      return List.lengthsEqAndForall2(function (ty1_2, ty2_2) {
        return TypesFeasiblyEquiv(ndeep, g, amap, m, ty1_2, ty2_2);
      }, $var6[1], $var6[2]);

    case 2:
      const $var7 = matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [3] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [1, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [3] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [2] : [3] : [3];

      switch ($var7[0]) {
        case 0:
          if (evalTupInfoIsStruct($var7[3]) === evalTupInfoIsStruct($var7[4])) {
            return List.lengthsEqAndForall2(function (ty1_3, ty2_3) {
              return TypesFeasiblyEquiv(ndeep, g, amap, m, ty1_3, ty2_3);
            }, $var7[1], $var7[2]);
          } else {
            return false;
          }

        case 1:
          if (function (ty1_4, ty2_4) {
            return TypesFeasiblyEquiv(ndeep, g, amap, m, ty1_4, ty2_4);
          }($var7[1], $var7[2])) {
            return function (ty1_5, ty2_5) {
              return TypesFeasiblyEquiv(ndeep, g, amap, m, ty1_5, ty2_5);
            }($var7[3], $var7[4]);
          } else {
            return false;
          }

        case 2:
          return true;

        case 3:
          if (isObjTy(g, ty1_1) ? canCoerce.Equals(new CanCoerce(0)) ? true : isRefTy(g, ty2_1) : false) {
            return true;
          } else if ((isAppTy(g, ty2_1) ? canCoerce.Equals(new CanCoerce(0)) ? true : isRefTy(g, ty2_1) : false) ? (matchValue_1 = GetSuperTypeOfType(g, amap, m, ty2_1), matchValue_1 != null ? TypeFeasiblySubsumesType(ndeep + 1, g, amap, m, ty1_1, new CanCoerce(1), getValue(matchValue_1)) : false) : false) {
            return true;
          } else {
            return exists((ndeep_1 = ndeep + 1 | 0, canCoerce_1 = new CanCoerce(1), function (ty2_6) {
              return TypeFeasiblySubsumesType(ndeep_1, g, amap, m, ty1_1, canCoerce_1, ty2_6);
            }), (skipUnref = new SkipUnrefInterfaces(0), function (typ) {
              return GetImmediateInterfacesOfType(skipUnref, g, amap, m, typ);
            })(ty2_1));
          }

      }

  }
}
export function ChooseTyparSolutionAndRange(g, amap, tp) {
  const m = tp.Range;
  let patternInput;
  let initial;
  const matchValue = tp.Kind;

  if (matchValue.tag === 1) {
    initial = new TType(6, new Measure(4));
  } else {
    initial = g.obj_ty;
  }

  patternInput = fold(function (tupledArg, tpc) {
    const join = function (m_1, x) {
      if (TypeFeasiblySubsumesType(0, g, amap, m_1, x, new CanCoerce(0), tupledArg[0])) {
        return tupledArg[0];
      } else if (TypeFeasiblySubsumesType(0, g, amap, m_1, tupledArg[0], new CanCoerce(0), x)) {
        return x;
      } else {
        errorR(new _Error(SR.typrelCannotResolveImplicitGenericInstantiation(DebugPrint.showType(x), DebugPrint.showType(tupledArg[0])), m_1));
        return tupledArg[0];
      }
    };

    if (tp.IsSolved) {
      return [tupledArg[0], m];
    } else {
      switch (tpc.tag) {
        case 3:
          return [tupledArg[0], tpc.data[1]];

        case 6:
          errorR(new _Error(SR.typrelCannotResolveAmbiguityInPrintf(), tpc.data[1]));
          return [tupledArg[0], tpc.data[1]];

        case 2:
          return [tupledArg[0], tpc.data];

        case 9:
          return [join(tpc.data, g.mk_IComparable_ty), tpc.data];

        case 10:
          return [tupledArg[0], tpc.data];

        case 8:
          errorR(new _Error(SR.typrelCannotResolveAmbiguityInEnum(), tpc.data[1]));
          return [tupledArg[0], tpc.data[1]];

        case 11:
          errorR(new _Error(SR.typrelCannotResolveAmbiguityInDelegate(), tpc.data[2]));
          return [tupledArg[0], tpc.data[2]];

        case 4:
          return [join(tpc.data, g.int_ty), tpc.data];

        case 12:
          errorR(new _Error(SR.typrelCannotResolveAmbiguityInUnmanaged(), tpc.data));
          return [tupledArg[0], tpc.data];

        case 7:
          return [tupledArg[0], tpc.data];

        case 5:
          return [tupledArg[0], tpc.data];

        case 1:
          return [tupledArg[0], tpc.data[2]];

        default:
          return [join(tpc.data[1], tpc.data[0]), tpc.data[1]];
      }
    }
  }, [initial, m], tp.Constraints);
  return [patternInput[0], patternInput[1]];
}
export function ChooseTyparSolution(g, amap, tp) {
  const patternInput = ChooseTyparSolutionAndRange(g, amap, tp);

  if (tp.Rigidity.Equals(new TyparRigidity(4)) ? typeEquiv(g, patternInput[0], new TType(6, new Measure(4))) : false) {
    warning(new _Error(SR.csCodeLessGeneric(), tp.Range));
  }

  return patternInput[0];
}
export function IterativelySubstituteTyparSolutions(g, tps, solutions) {
  const tpenv = mkTyparInst(tps, solutions);

  const loop = function (n, curr) {
    loop: while (true) {
      const curr_ = function (arg10_) {
        return instTypes(tpenv, arg10_);
      }(curr);

      if (n > 40 ? true : forAll2(function (arg10__1, arg20_) {
        return typeEquiv(g, arg10__1, arg20_);
      }, curr, curr_)) {
        return curr;
      } else {
        n = n + 1;
        curr = curr_;
        continue loop;
      }
    }
  };

  return loop(0, solutions);
}
export function ChooseTyparSolutionsForFreeChoiceTypars(g, amap, e) {
  if (e.tag === 13) {
    const ftvs = freeInExpr(CollectTyparsNoCaching, e.data[1]).FreeTyvars.FreeTypars;
    const tps = filter(function (arg10_) {
      return ZsetModule.memberOf(ftvs, arg10_);
    }, e.data[0]);

    const solutions_1 = function (solutions) {
      return IterativelySubstituteTyparSolutions(g, tps, solutions);
    }(map(function (tp) {
      return ChooseTyparSolution(g, amap, tp);
    }, tps));

    const tpenv = mkTyparInst(tps, solutions_1);
    return instExpr(g, tpenv, e.data[1]);
  } else {
    return e;
  }
}
export function tryDestTopLambda(g, amap, _arg1, e, ty) {
  const stripLambdaUpto = function (n, tupledArg) {
    const $var8 = tupledArg[0].tag === 3 ? tupledArg[0].data[1] == null ? tupledArg[0].data[2] == null ? n > 0 ? [0, tupledArg[0].data[4], tupledArg[0].data[6], tupledArg[0].data[3]] : [1] : [1] : [1] : [1];

    switch ($var8[0]) {
      case 0:
        const patternInput = stripLambdaUpto(n - 1, [$var8[1], $var8[2]]);
        return [new List_1($var8[3], patternInput[0]), patternInput[1], patternInput[2]];

      case 1:
        return [new List_1(), tupledArg[0], tupledArg[1]];
    }
  };

  const startStripLambdaUpto = function (n_1, tupledArg_1) {
    startStripLambdaUpto: while (true) {
      const $var9 = tupledArg_1[0].tag === 3 ? n_1 > 0 ? [0, tupledArg_1[0].data[4], tupledArg_1[0].data[2], tupledArg_1[0].data[1], tupledArg_1[0].data[6], tupledArg_1[0].data[3]] : [1] : [1];

      switch ($var9[0]) {
        case 0:
          const patternInput_1 = stripLambdaUpto(n_1 - 1, [$var9[1], $var9[4]]);
          return [$var9[3], $var9[2], new List_1($var9[5], patternInput_1[0]), patternInput_1[1], patternInput_1[2]];

        case 1:
          if (tupledArg_1[0].tag === 13) {
            n_1 = n_1;
            tupledArg_1 = [ChooseTyparSolutionsForFreeChoiceTypars(g, amap, tupledArg_1[0]), tupledArg_1[1]];
            continue startStripLambdaUpto;
          } else {
            return [null, null, new List_1(), tupledArg_1[0], tupledArg_1[1]];
          }

      }
    }
  };

  const n_2 = _arg1.NumCurriedArgs | 0;
  let patternInput_2;
  const $var10 = e.tag === 4 ? !(_arg1.data[0].tail == null) ? [0, e.data[2], e.data[4], e.data[1]] : [1] : [1];

  switch ($var10[0]) {
    case 0:
      patternInput_2 = [$var10[3], $var10[1], $var10[2]];
      break;

    case 1:
      patternInput_2 = [new List_1(), e, ty];
      break;
  }

  const patternInput_3 = startStripLambdaUpto(n_2, [patternInput_2[1], patternInput_2[2]]);

  if (patternInput_3[2].length !== n_2) {
    return null;
  } else {
    return [patternInput_2[0], patternInput_3[0], patternInput_3[1], patternInput_3[2], patternInput_3[3], patternInput_3[4]];
  }
}
export function destTopLambda(g, amap, topValInfo, e, ty) {
  const matchValue = tryDestTopLambda(g, amap, topValInfo, e, ty);

  if (matchValue != null) {
    return getValue(matchValue);
  } else {
    return error(new _Error(SR.typrelInvalidValue(), Expr_get_Range.bind(e)()));
  }
}
export function IteratedAdjustArityOfLambdaBody(g, arities, vsl, body) {
  return foldBack2(function (arities_1, vs, tupledArg) {
    const patternInput = AdjustArityOfLambdaBody(g, arities_1, vs, tupledArg[1]);
    return [new List_1(patternInput[0], tupledArg[0]), patternInput[1]];
  }, arities, vsl, [new List_1(), body]);
}
export function IteratedAdjustArityOfLambda(g, amap, topValInfo, e) {
  const patternInput = destTopLambda(g, amap, topValInfo, e, tyOfExpr(g, e));
  const arities = topValInfo.AritiesOfArgs;

  if (arities.length !== patternInput[3].length) {
    errorR(new InternalError(toText(printf("IteratedAdjustArityOfLambda, List.length arities = %d, List.length vsl = %d"))(arities.length, patternInput[3].length), Expr_get_Range.bind(patternInput[4])()));
  }

  const patternInput_1 = IteratedAdjustArityOfLambdaBody(g, arities, patternInput[3], patternInput[4]);
  return [patternInput[0], patternInput[1], patternInput[2], patternInput_1[0], patternInput_1[1], patternInput[5]];
}
export function FindUniqueFeasibleSupertype(g, amap, m, ty1, ty2) {
  var canCoerce;

  if (!isAppTy(g, ty2)) {
    return null;
  } else {
    const supertypes = append(toList(defaultArg(GetSuperTypeOfType(g, amap, m, ty2), [], $var11 => [$var11])), GetImmediateInterfacesOfType(new SkipUnrefInterfaces(0), g, amap, m, ty2));
    return tryFind((canCoerce = new CanCoerce(1), function (ty2_1) {
      return TypeFeasiblySubsumesType(0, g, amap, m, ty1, canCoerce, ty2_1);
    }), supertypes);
  }
}