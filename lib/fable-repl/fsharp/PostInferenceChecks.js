import { allValsOfModDef, mkRepackageRemapping, ComputeRemappingFromImplementationToSignature, TypeHasDefaultValue, TryFindFSharpBoolAttribute, superOfTycon, abstractSlotValsOfTycons, destOptionTy, isOptionTy, typeEquiv, IsHiddenRecdField, IsHiddenTyconRepr, IsHiddenTycon, generalizedTyconRef, $7C$AttribBoolArg$7C$_$7C$ as _AttribBoolArg___, TryFindFSharpAttribute, ValIsExplicitImpl, IsCompiledAsStaticProperty, IsSimpleSyntacticConstantExpr, HasFSharpAttributeOpt, ArgInfosOfPropertyVal, ReturnTypeOfPropertyVal, applyForallTy, IsHiddenVal, doesActivePatternHaveFreeTypars, TryGetActivePatternInfo, HasFSharpAttribute, TryFindAttributeUsageAttribute, $7C$AttribBitwiseOrExpr$7C$_$7C$ as _AttribBitwiseOrExpr___, $7C$EnumExpr$7C$_$7C$ as _EnumExpr___, isNativePtrTy, isClassTy, destByrefTy, evalTupInfoIsStruct, valsOfBinds, tryMkForallTy, mkMultiLambdaTy, tyOfExpr, $7C$TypeDefOfExpr$7C$_$7C$ as _TypeDefOfExpr___, isVoidTy, $7C$TypeOfExpr$7C$_$7C$ as _TypeOfExpr___, isInterfaceTy, isByrefTy, isAbstractTycon, $7C$ExprValWithPossibleTypeInst$7C$_$7C$ as _ExprValWithPossibleTypeInst___, $7C$InnerExprPat$7C$ as _InnerExprPat_, stripExpr, Erasure, typeEquivAux, tcrefOfAppTy, valRefEq, tyconRefEq, tryDestAppTy, CollectLocals, freeInExpr, isByrefLikeTy, isByrefLikeTyconRef, DisplayEnv, PrettyTypes, NormalizeDeclaredTyparsForEquiRecursiveInference, SignatureHidingInfo, Remap, ValMap, TyparMap, Expr$2E$get_Range as Expr_get_Range } from "./TastOps";
import { startsWith, printf, toConsole } from "../fable-core/String";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { hash as hash_1, toString, compareUnions, equals, Tuple, Unit, makeGeneric } from "../fable-core/Util";
import { append as append_1, concat, ofArray, filter, map } from "../fable-core/List";
import List from "../fable-core/List";
import { tryFind as tryFind_1, sum, count, last, filter as filter_1, map as map_1, singleton, iterateIndexed, sumBy, collect, empty, append, delay, toList, tryPick, find, exists, iterate, fold, iterate2 } from "../fable-core/Seq";
import { ident } from "./ast";
import { fromBits } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { create, tryGetValue, tryFind, groupBy, add } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { stringOfRange, range } from "./range";
import { TcGlobals } from "./TcGlobals";
import { ImportMap } from "./import";
import { GetImmediateIntrinsicPropInfosOfType, GetImmediateIntrinsicMethInfosOfType, FindMemberFlag, GetIntrinsicMethInfosOfType, InfoReader } from "./InfoReader";
import { typeOfVal, mkLocalTyconRef, NameClash, Duplicate, mkTyparTy, mkLocalValRef, Accessibility, ValReprInfoModule, ValReprInfo, valRefInThisAssembly, isLessAccessible, compPathOfCcu, accessSubstPaths, ValBaseOrThisInfo, valEq, stripTyparEqns, CcuThunk, CompilationPath } from "./tast";
import { error, errorRecovery, InternalError, errorR, Error as _Error, warning } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import CurriedLambda from "../fable-core/CurriedLambda";
import { defaultArg, getValue } from "../fable-core/Option";
import { ZsetModule } from "../absil/zset";
import { ObsoleteWarning } from "./AttributeChecking";
import { stringOfMethInfo, stringOfQualifiedValOrMember, minimalStringOfType } from "./NicePrint";
import { List as List_1, MultiMapModule } from "../absil/illib";
import { QuotationSerializationFormat, ConvMethodBase, QuotationTranslationEnv, ConvExprPublic, IsReflectedDefinition, QuotationGenerationScope, InvalidQuotedTerm } from "./QuotationTranslator";
import { SkipUnrefInterfaces, GetImmediateInterfacesOfType, PropInfosEquivByNameAndPartialSig, CallerInfoInfo, MethInfosEquivByNameAndPartialSig, GetSuperTypeOfType, MethInfosEquivByNameAndSig, MethInfo, AllowMultiIntfInstantiations, AllSuperTypesOfType } from "./infos";
import { resolveILMethodRef } from "../absil/il";
import { TryCountFormatStringArguments } from "./CheckFormatStrings";
import { destTopLambda } from "./TypeRelations";
import { TryChopPropertyName } from "./PrettyNaming";
import { AccessorDomain } from "./AccessibilityLogic";
import { fromEqualityComparer } from "../fable-core/Comparer";
import Comparer from "../fable-core/Comparer";
export const testFlagMemberBody = {
  contents: false
};
export function testHookMemberBody(membInfo, expr) {
  if (testFlagMemberBody.contents) {
    const m = Expr_get_Range.bind(expr)();
    toConsole(printf("TestMemberBody,%A,%s,%d,%d,%d,%d\n"))(membInfo.MemberFlags.MemberKind, m.FileName, m.StartLine, m.StartColumn, m.EndLine, m.EndColumn);
  }
}
export class env {
  constructor(boundTyparNames, boundTypars, argVals, sigToImplRemapInfo, limited, quote, reflect, external) {
    this.boundTyparNames = boundTyparNames;
    this.boundTypars = boundTypars;
    this.argVals = argVals;
    this.sigToImplRemapInfo = sigToImplRemapInfo;
    this.limited = limited;
    this.quote = quote;
    this.reflect = reflect;
    this.external = external;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PostTypeCheckSemanticChecks.env",
      interfaces: ["FSharpRecord"],
      properties: {
        boundTyparNames: makeGeneric(List, {
          T: "string"
        }),
        boundTypars: makeGeneric(TyparMap, {
          T: Unit
        }),
        argVals: makeGeneric(ValMap, {
          T: Unit
        }),
        sigToImplRemapInfo: makeGeneric(List, {
          T: Tuple([Remap, SignatureHidingInfo])
        }),
        limited: "boolean",
        quote: "boolean",
        reflect: "boolean",
        external: "boolean"
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.PostTypeCheckSemanticChecks.env", env);
export function BindTypar(env_1, tp) {
  return new env(new List(tp.Name, env_1.boundTyparNames), env_1.boundTypars.Add(tp, null), env_1.argVals, env_1.sigToImplRemapInfo, env_1.limited, env_1.quote, env_1.reflect, env_1.external);
}
export function BindTypars(g, env_1, tps) {
  const tps_1 = NormalizeDeclaredTyparsForEquiRecursiveInference(g, tps);

  if (tps_1.tail == null) {
    return env_1;
  } else {
    const nms = PrettyTypes.PrettyTyparNames(function (_arg1) {
      return true;
    }, env_1.boundTyparNames, tps_1);
    iterate2(function (tp, nm) {
      if (PrettyTypes.NeedsPrettyTyparName(tp)) {
        tp.typar_id = ident(nm, tp.Range);
      }
    }, tps_1, nms);
    return fold(function (env_2, tp_1) {
      return BindTypar(env_2, tp_1);
    }, env_1, tps_1);
  }
}
export function SetArgVals(env_1, vs) {
  const argVals = ValMap.OfList(map(function (v) {
    return [v, null];
  }, vs));
  return new env(env_1.boundTyparNames, env_1.boundTypars, argVals, env_1.sigToImplRemapInfo, env_1.limited, env_1.quote, env_1.reflect, env_1.external);
}
export class cenv {
  constructor(boundVals, potentialUnboundUsesOfVals, g, amap, infoReader, internalsVisibleToPaths, denv, viewCcu, reportErrors, isLastCompiland, usesQuotations, entryPointGiven) {
    this.boundVals = boundVals;
    this.potentialUnboundUsesOfVals = potentialUnboundUsesOfVals;
    this.g = g;
    this.amap = amap;
    this.infoReader = infoReader;
    this.internalsVisibleToPaths = internalsVisibleToPaths;
    this.denv = denv;
    this.viewCcu = viewCcu;
    this.reportErrors = reportErrors;
    this.isLastCompiland = isLastCompiland;
    this.usesQuotations = usesQuotations;
    this.entryPointGiven = entryPointGiven;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PostTypeCheckSemanticChecks.cenv",
      interfaces: ["FSharpRecord"],
      properties: {
        boundVals: makeGeneric(Map, {
          TKey: Long,
          TValue: "number"
        }),
        potentialUnboundUsesOfVals: makeGeneric(_Map, {
          Key: Long,
          Value: range
        }),
        g: TcGlobals,
        amap: ImportMap,
        infoReader: InfoReader,
        internalsVisibleToPaths: makeGeneric(List, {
          T: CompilationPath
        }),
        denv: DisplayEnv,
        viewCcu: CcuThunk,
        reportErrors: "boolean",
        isLastCompiland: Tuple(["boolean", "boolean"]),
        usesQuotations: "boolean",
        entryPointGiven: "boolean"
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.PostTypeCheckSemanticChecks.cenv", cenv);
export function BindVal(cenv_1, env_1, v) {
  const alreadyDone = cenv_1.boundVals.has(v.Stamp);
  cenv_1.boundVals.set(v.Stamp, 1);

  if ((((((!env_1.external ? !alreadyDone : false) ? cenv_1.reportErrors : false) ? !v.HasBeenReferenced : false) ? !v.IsCompiledAsTopLevel : false) ? !startsWith(v.DisplayName, "_", 4) : false) ? !v.IsCompilerGenerated : false) {
    const matchValue = v.BaseOrThisInfo;

    if (matchValue.tag === 0) {
      warning(new _Error(SR.chkUnusedThisVariable(v.DisplayName), v.Range));
    } else {
      warning(new _Error(SR.chkUnusedValue(v.DisplayName), v.Range));
    }
  }
}
export function BindVals(cenv_1, env_1, vs) {
  iterate(function (v) {
    BindVal(cenv_1, env_1, v);
  }, vs);
}
export function CheckTypeDeep(_arg1_0, _arg1_1, _arg1_2, _arg1_3, _arg1_4, g, env_1, typ) {
  const _arg1 = [_arg1_0, _arg1_1, _arg1_2, _arg1_3, _arg1_4];
  const $var1 = typ.tag === 5 ? CurriedLambda(() => typ.data.Solution != null)() ? [0, typ.data] : [1] : [1];

  switch ($var1[0]) {
    case 0:
      iterate(function (cx) {
        if (cx.tag === 3) {
          const soln = cx.data[0].data[5];
          const matchValue = [_arg1[3], soln.contents];
          const $var2 = matchValue[0] != null ? matchValue[1] != null ? [0, getValue(matchValue[1]), getValue(matchValue[0])] : [1] : [1];

          switch ($var2[0]) {
            case 0:
              $var2[2]($var2[1]);
              break;

            case 1:
              break;
          }
        }
      }, $var1[1].Constraints);
      break;

    case 1:
      break;
  }

  const typ_1 = stripTyparEqns(typ);

  _arg1[0](typ_1);

  switch (typ_1.tag) {
    case 6:
      break;

    case 1:
      if (_arg1[1] == null) {} else {
        getValue(_arg1[1])(typ_1.data[0]);
      }

      CheckTypesDeep(_arg1[0], _arg1[1], _arg1[2], _arg1[3], _arg1[4], g, env_1, typ_1.data[1]);

      if (_arg1[2] == null) {} else {
        getValue(_arg1[2])([typ_1.data[0], typ_1.data[1]]);
      }

      break;

    case 4:
      CheckTypesDeep(_arg1[0], _arg1[1], _arg1[2], _arg1[3], _arg1[4], g, env_1, typ_1.data[1]);
      break;

    case 2:
      CheckTypesDeep(_arg1[0], _arg1[1], _arg1[2], _arg1[3], _arg1[4], g, env_1, typ_1.data[1]);
      break;

    case 3:
      CheckTypeDeep(_arg1[0], _arg1[1], _arg1[2], _arg1[3], _arg1[4], g, env_1, typ_1.data[0]);
      CheckTypeDeep(_arg1[0], _arg1[1], _arg1[2], _arg1[3], _arg1[4], g, env_1, typ_1.data[1]);
      break;

    case 5:
      if (!typ_1.data.IsSolved) {
        if (_arg1[4] != null) {
          getValue(_arg1[4])([env_1, typ_1.data]);
        }
      }

      break;

    default:
      const env_2 = BindTypars(g, env_1, typ_1.data[0]);
      CheckTypeDeep(_arg1[0], _arg1[1], _arg1[2], _arg1[3], _arg1[4], g, env_2, typ_1.data[1]);
      iterate(function (tp) {
        iterate(function (x) {
          CheckTypeConstraintDeep(_arg1[0], _arg1[1], _arg1[2], _arg1[3], _arg1[4], g, env_2, x);
        }, tp.Constraints);
      }, typ_1.data[0]);
  }
}
export function CheckTypesDeep(f_0, f_1, f_2, f_3, f_4, g, env_1, tys) {
  const f = [f_0, f_1, f_2, f_3, f_4];
  iterate(function (typ) {
    CheckTypeDeep(f[0], f[1], f[2], f[3], f[4], g, env_1, typ);
  }, tys);
}
export function CheckTypeConstraintDeep(f_0, f_1, f_2, f_3, f_4, g, env_1, x) {
  const f = [f_0, f_1, f_2, f_3, f_4];

  switch (x.tag) {
    case 3:
      CheckTraitInfoDeep(f[0], f[1], f[2], f[3], f[4], g, env_1, x.data[0]);
      break;

    case 1:
      CheckTypeDeep(f[0], f[1], f[2], f[3], f[4], g, env_1, x.data[1]);
      break;

    case 6:
      CheckTypesDeep(f[0], f[1], f[2], f[3], f[4], g, env_1, x.data[0]);
      break;

    case 8:
      CheckTypeDeep(f[0], f[1], f[2], f[3], f[4], g, env_1, x.data[0]);
      break;

    case 11:
      CheckTypeDeep(f[0], f[1], f[2], f[3], f[4], g, env_1, x.data[0]);
      CheckTypeDeep(f[0], f[1], f[2], f[3], f[4], g, env_1, x.data[1]);
      break;

    case 9:
    case 10:
    case 2:
    case 4:
    case 12:
    case 5:
    case 7:
      break;

    default:
      CheckTypeDeep(f[0], f[1], f[2], f[3], f[4], g, env_1, x.data[0]);
  }
}
export function CheckTraitInfoDeep(_arg3_0, _arg3_1, _arg3_2, _arg3_3, _arg3_4, g, env_1, _arg2) {
  const _arg3 = [_arg3_0, _arg3_1, _arg3_2, _arg3_3, _arg3_4];
  CheckTypesDeep(_arg3[0], _arg3[1], _arg3[2], _arg3[3], _arg3[4], g, env_1, _arg2.data[0]);
  CheckTypesDeep(_arg3[0], _arg3[1], _arg3[2], _arg3[3], _arg3[4], g, env_1, _arg2.data[3]);
  iterate(function (typ) {
    CheckTypeDeep(_arg3[0], _arg3[1], _arg3[2], _arg3[3], _arg3[4], g, env_1, typ);
  }, defaultArg(_arg2.data[4], [], $var3 => [$var3]));
  const matchValue = [_arg3[3], _arg2.data[5].contents];
  const $var4 = matchValue[0] != null ? matchValue[1] != null ? [0, getValue(matchValue[1]), getValue(matchValue[0])] : [1] : [1];

  switch ($var4[0]) {
    case 0:
      $var4[2]($var4[1]);
      break;

    case 1:
      break;
  }
}
export function CheckForByrefLikeType(cenv_1, env_1, typ, check) {
  CheckTypeDeep(function (value) {
    value;
  }, function (tcref) {
    if (isByrefLikeTyconRef(cenv_1.g, tcref)) {
      check();
    }
  }, null, null, null, cenv_1.g, env_1, typ);
}
export function CheckEscapes(cenv_1, allowProtected, m, syntacticArgs, body) {
  if (cenv_1.reportErrors) {
    const cantBeFree = function (v) {
      const passedIn = exists(CurriedLambda(function (lv1, lv2) {
        return valEq(lv1, lv2);
      })(v), syntacticArgs);

      if (passedIn) {
        return false;
      } else if (v.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1))) {
        return true;
      } else {
        return isByrefLikeTy(cenv_1.g, v.Type);
      }
    };

    const frees = freeInExpr(CollectLocals, body);

    if (!allowProtected ? frees.UsesMethodLocalConstructs : false) {
      errorR(new _Error(SR.chkProtectedOrBaseCalled(), m));
    } else if (ZsetModule.exists(cantBeFree, frees.FreeLocals)) {
      const v_1 = find(cantBeFree, ZsetModule.elements(frees.FreeLocals));

      if (isByrefLikeTy(cenv_1.g, v_1.Type)) {
        errorR(new _Error(SR.chkByrefUsedInInvalidWay(v_1.DisplayName), m));
      } else if (v_1.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1))) {
        errorR(new _Error(SR.chkBaseUsedInInvalidWay(), m));
      } else {
        errorR(new InternalError(SR.chkVariableUsedInInvalidWay(v_1.DisplayName), m));
      }
    }

    return frees;
  } else {
    return null;
  }
}
export function AccessInternalsVisibleToAsInternal(thisCompPath, internalsVisibleToPaths, access) {
  return fold(function (access_1, internalsVisibleToPath) {
    return accessSubstPaths(thisCompPath, internalsVisibleToPath, access_1);
  }, access, internalsVisibleToPaths);
}
export function CheckTypeForAccess(cenv_1, env_1, objName, valAcc, m, ty) {
  if (cenv_1.reportErrors) {
    const visitType = function (ty_1) {
      const matchValue = tryDestAppTy(cenv_1.g, ty_1);

      if (matchValue != null) {
        const thisCompPath = compPathOfCcu(cenv_1.viewCcu);

        const tyconAcc = function (access) {
          return AccessInternalsVisibleToAsInternal(thisCompPath, cenv_1.internalsVisibleToPaths, access);
        }(getValue(matchValue).Accessibility);

        if (isLessAccessible(tyconAcc, valAcc)) {
          errorR(new _Error(SR.chkTypeLessAccessibleThanType(getValue(matchValue).DisplayName, objName()), m));
        }
      }
    };

    CheckTypeDeep(visitType, null, null, null, null, cenv_1.g, env_1, ty);
  }
}
export function WarnOnWrongTypeForAccess(cenv_1, env_1, objName, valAcc, m, ty) {
  if (cenv_1.reportErrors) {
    const visitType = function (ty_1) {
      const matchValue = tryDestAppTy(cenv_1.g, ty_1);

      if (matchValue != null) {
        const thisCompPath = compPathOfCcu(cenv_1.viewCcu);

        const tyconAcc = function (access) {
          return AccessInternalsVisibleToAsInternal(thisCompPath, cenv_1.internalsVisibleToPaths, access);
        }(getValue(matchValue).Accessibility);

        if (isLessAccessible(tyconAcc, valAcc)) {
          const errorText = SR.chkTypeLessAccessibleThanType(getValue(matchValue).DisplayName, objName())[1];
          const warningText = errorText + "\n" + SR.tcTypeAbbreviationsCheckedAtCompileTime();
          warning(new ObsoleteWarning(warningText, m));
        }
      }
    };

    CheckTypeDeep(visitType, null, null, null, null, cenv_1.g, env_1, ty);
  }
}
export function CheckType(permitByrefs, cenv_1, env_1, m, ty) {
  if (cenv_1.reportErrors) {
    const visitTypar = function (tupledArg) {
      if (!tupledArg[0].boundTypars.ContainsKey(tupledArg[1])) {
        if (tupledArg[1].IsCompilerGenerated) {
          errorR(new _Error(SR.checkNotSufficientlyGenericBecauseOfScopeAnon(), m));
        } else {
          errorR(new _Error(SR.checkNotSufficientlyGenericBecauseOfScope(tupledArg[1].DisplayName), m));
        }
      }
    };

    const visitTyconRef = function (tcref) {
      if (!permitByrefs ? isByrefLikeTyconRef(cenv_1.g, tcref) : false) {
        errorR(new _Error(SR.chkErrorUseOfByref(), m));
      }

      if (tyconRefEq(cenv_1.g, cenv_1.g.system_Void_tcref, tcref)) {
        errorR(new _Error(SR.chkSystemVoidOnlyInTypeof(), m));
      }
    };

    const visitAppTy = function (tupledArg_1) {
      if (isByrefLikeTyconRef(cenv_1.g, tupledArg_1[0])) {
        const visitType = function (ty0) {
          const matchValue = tryDestAppTy(cenv_1.g, ty0);

          if (matchValue != null) {
            if (isByrefLikeTyconRef(cenv_1.g, getValue(matchValue))) {
              errorR(new _Error(SR.chkNoByrefsOfByrefs(minimalStringOfType(cenv_1.denv, ty)), m));
            }
          }
        };

        CheckTypesDeep(visitType, null, null, null, null, cenv_1.g, env_1, tupledArg_1[1]);
      }
    };

    const visitTraitSolution = function (info) {
      if (info.tag === 0) {
        if (valRefInThisAssembly(cenv_1.g.compilingFslib, info.data[1]) ? !cenv_1.boundVals.has(info.data[1].Stamp) : false) {
          cenv_1.potentialUnboundUsesOfVals = add(info.data[1].Stamp, m, cenv_1.potentialUnboundUsesOfVals);
        }
      }
    };

    CheckTypeDeep(function (value) {
      value;
    }, visitTyconRef, visitAppTy, visitTraitSolution, visitTypar, cenv_1.g, env_1, ty);
  }
}
export function CheckTypeNoByrefs(cenv_1, env_1, m, ty) {
  CheckType(false, cenv_1, env_1, m, ty);
}
export function CheckTypePermitByrefs(cenv_1, env_1, m, ty) {
  CheckType(true, cenv_1, env_1, m, ty);
}
export function CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs) {
  iterate(function (ty) {
    CheckTypeNoByrefs(cenv_1, env_1, m, ty);
  }, tyargs);
}
export function CheckTypeInstPermitByrefs(cenv_1, env_1, m, tyargs) {
  iterate(function (ty) {
    CheckType(true, cenv_1, env_1, m, ty);
  }, tyargs);
}
export class ByrefContext {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PostTypeCheckSemanticChecks.ByrefContext",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["TupleOfArgsPermitByrefs", "number"], ["PermitByref", "boolean"], ["NoByrefs"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.PostTypeCheckSemanticChecks.ByrefContext", ByrefContext);
export function noByrefs(context) {
  if (context.tag === 1) {
    return false;
  } else {
    return true;
  }
}
export function mkArgsPermitByrefs(isByrefReturnCall, n) {
  if (n === 1) {
    return new ByrefContext(1, isByrefReturnCall);
  } else {
    return new ByrefContext(0, n);
  }
}
export function mkArgsForAppliedVal(isByrefReturnCall, vref) {
  const matchValue = vref.ValReprInfo;

  if (matchValue == null) {
    return new List();
  } else {
    return map(function (n) {
      return mkArgsPermitByrefs(isByrefReturnCall, n);
    }, getValue(matchValue).AritiesOfArgs);
  }
}
export function mkArgsForAppliedExpr(isByrefReturnCall, x) {
  mkArgsForAppliedExpr: while (true) {
    const $var5 = x.tag === 1 ? [0, x.data[0]] : x.tag === 14 ? [1, x.data] : x.tag === 5 ? x.data[3].tail == null ? [2, x.data[1], x.data[2], x.data[0]] : [4] : x.tag === 11 ? x.data[0].tag === 24 ? x.data[2].tail != null ? x.data[2].tail.tail == null ? [3, x.data[2].head] : [4] : [4] : [4] : [4];

    switch ($var5[0]) {
      case 0:
        return mkArgsForAppliedVal(isByrefReturnCall, $var5[1]);

      case 1:
        isByrefReturnCall = isByrefReturnCall;
        x = $var5[1].contents;
        continue mkArgsForAppliedExpr;

      case 2:
        isByrefReturnCall = isByrefReturnCall;
        x = $var5[3];
        continue mkArgsForAppliedExpr;

      case 3:
        isByrefReturnCall = isByrefReturnCall;
        x = $var5[1];
        continue mkArgsForAppliedExpr;

      case 4:
        return new List();
    }
  }
}

function _OptionalCoerce_(_arg1) {
  const $var6 = _arg1.tag === 11 ? _arg1.data[0].tag === 24 ? _arg1.data[2].tail != null ? _arg1.data[2].head.tag === 5 ? _arg1.data[2].head.data[3].tail == null ? _arg1.data[2].tail.tail == null ? [0, _arg1.data[2].head.data[0]] : [1, _arg1] : [1, _arg1] : [1, _arg1] : [1, _arg1] : [1, _arg1] : [1, _arg1];

  switch ($var6[0]) {
    case 0:
      return $var6[1];

    case 1:
      return $var6[1];
  }
}

export { _OptionalCoerce_ as $7C$OptionalCoerce$7C$ };
export function CheckNoReraise(cenv_1, freesOpt, body) {
  if (cenv_1.reportErrors) {
    const fvs = freesOpt != null ? getValue(freesOpt) : freeInExpr(CollectLocals, body);

    if (fvs.UsesUnboundRethrow) {
      errorR(new _Error(SR.chkErrorContainsCallToRethrow(), Expr_get_Range.bind(body)()));
    }
  }
}
export function isSpliceOperator(g, v) {
  if (valRefEq(g, v, g.splice_expr_vref)) {
    return true;
  } else {
    return valRefEq(g, v, g.splice_raw_expr_vref);
  }
}
export function CheckMultipleInterfaceInstantiations(cenv_1, interfaces, m) {
  const keyf = function (ty) {
    return tcrefOfAppTy(cenv_1.g, ty).Stamp;
  };

  const table = function (xs) {
    return MultiMapModule.initBy(keyf, xs);
  }(interfaces);

  const firstInterfaceWithMultipleGenericInstantiations = tryPick(function (typ1) {
    return tryPick(function (typ2) {
      return (tyconRefEq(cenv_1.g, tcrefOfAppTy(cenv_1.g, typ1), tcrefOfAppTy(cenv_1.g, typ2)) ? !typeEquivAux(new Erasure(2), cenv_1.g, typ1, typ2) : false) ? [typ1, typ2] : null;
    }, MultiMapModule.find(keyf(typ1), table));
  }, interfaces);

  if (firstInterfaceWithMultipleGenericInstantiations != null) {
    const typ2_1 = getValue(firstInterfaceWithMultipleGenericInstantiations)[1];
    const typ1_1 = getValue(firstInterfaceWithMultipleGenericInstantiations)[0];
    errorR(new _Error(SR.chkMultipleGenericInterfaceInstantiations(minimalStringOfType(cenv_1.denv, typ1_1), minimalStringOfType(cenv_1.denv, typ2_1)), m));
  }
}
export function CheckExprNoByrefs(cenv_1, env_1, expr) {
  CheckExpr(cenv_1, env_1, expr, new ByrefContext(2));
}
export function CheckVal(cenv_1, env_1, v, m, context) {
  if (cenv_1.reportErrors) {
    if (isSpliceOperator(cenv_1.g, v) ? !env_1.quote : false) {
      errorR(new _Error(SR.chkSplicingOnlyInQuotations(), m));
    }

    if (isSpliceOperator(cenv_1.g, v)) {
      errorR(new _Error(SR.chkNoFirstClassSplicing(), m));
    }

    if (valRefEq(cenv_1.g, v, cenv_1.g.addrof_vref)) {
      errorR(new _Error(SR.chkNoFirstClassAddressOf(), m));
    }

    if (valRefEq(cenv_1.g, v, cenv_1.g.reraise_vref)) {
      errorR(new _Error(SR.chkNoFirstClassRethrow(), m));
    }

    if (noByrefs(context) ? isByrefLikeTy(cenv_1.g, v.Type) : false) {
      errorR(new _Error(SR.chkNoByrefAtThisPoint(v.DisplayName), m));
    }
  }

  CheckTypePermitByrefs(cenv_1, env_1, m, v.Type);
}
export function CheckExpr(cenv_1, env_1, expr, context) {
  var vFlags;
  var v;
  var rest_1;
  var baseVal_1;
  var matchValue;
  var virt;
  var tys;
  var rest;
  var mref;
  var methTypeArgs;
  var enclTypeArgs;
  var baseVal;
  var vref;
  var arg;
  var typC;
  var typB;
  var newFormat;
  var formatString;
  var formatRange;
  const expr_1 = stripExpr(expr);
  let $var7;

  if (expr_1.tag === 2) {
    $var7 = [0, expr_1.data[2], expr_1.data[0], expr_1.data[1]];
  } else if (expr_1.tag === 7) {
    $var7 = [1, expr_1.data[0], expr_1.data[1]];
  } else if (expr_1.tag === 0) {
    $var7 = [2, expr_1.data[1], expr_1.data[2]];
  } else if (expr_1.tag === 1) {
    $var7 = [3, expr_1.data[2], expr_1.data[0], expr_1.data[1]];
  } else if (expr_1.tag === 12) {
    $var7 = [4, expr_1.data[2], expr_1.data[0], expr_1.data[3], expr_1.data[1], expr_1.data[4]];
  } else if (expr_1.tag === 8) {
    $var7 = [5, expr_1.data[2], expr_1.data[5], expr_1.data[6], expr_1.data[4], expr_1.data[3], expr_1.data[1]];
  } else if (expr_1.tag === 5) {
    const activePatternResult39303 = _InnerExprPat_(expr_1.data[0]);

    const activePatternResult39304 = _ExprValWithPossibleTypeInst___(activePatternResult39303);

    if (activePatternResult39304 != null) {
      if (expr_1.data[3].tail != null) {
        if (expr_1.data[3].head.tag === 1) {
          if (vFlags = getValue(activePatternResult39304)[1], v = getValue(activePatternResult39304)[0], rest_1 = expr_1.data[3].tail, baseVal_1 = expr_1.data[3].head.data[0], (vFlags.tag === 4 ? true : false) ? baseVal_1.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1)) : false) {
            $var7 = [6, expr_1.data[3].head.data[0], activePatternResult39303, expr_1.data[1], expr_1.data[4], expr_1.data[3].tail, expr_1.data[2], getValue(activePatternResult39304)[0], getValue(activePatternResult39304)[1]];
          } else {
            $var7 = [7];
          }
        } else {
          $var7 = [7];
        }
      } else {
        $var7 = [7];
      }
    } else {
      $var7 = [7];
    }
  } else {
    $var7 = [7];
  }

  switch ($var7[0]) {
    case 0:
      CheckExprNoByrefs(cenv_1, env_1, $var7[2]);

      if ($var7[1].tag === 1) {
        CheckExprNoByrefs(cenv_1, new env(env_1.boundTyparNames, env_1.boundTypars, env_1.argVals, env_1.sigToImplRemapInfo, false, env_1.quote, env_1.reflect, env_1.external), $var7[3]);
      } else {
        CheckExpr(cenv_1, env_1, $var7[3], context);
      }

      break;

    case 1:
      CheckBinding(cenv_1, env_1, false, $var7[1]);
      BindVal(cenv_1, env_1, $var7[1].Var);
      CheckExpr(cenv_1, env_1, $var7[2], context);
      break;

    case 2:
      CheckTypePermitByrefs(cenv_1, env_1, $var7[1], $var7[2]);
      break;

    case 3:
      if (cenv_1.reportErrors) {
        if ($var7[2].BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1))) {
          errorR(new _Error(SR.chkLimitationsOfBaseKeyword(), $var7[1]));
        }

        if ((($var7[3].tag === 1 ? true : false) ? $var7[2].IsConstructor : false) ? (matchValue = $var7[2].DeclaringEntity, matchValue.tag === 0 ? isAbstractTycon(matchValue.data.Deref) : false) : false) {
          errorR(new _Error(SR.tcAbstractTypeCannotBeInstantiated(), $var7[1]));
        }

        if (((isByrefTy(cenv_1.g, $var7[2].Type) ? context.tag === 1 ? context.data : false : false) ? CurriedLambda(() => $var7[2].ValReprInfo == null)() : false) ? !env_1.argVals.ContainsVal($var7[2].Deref) : false) {
          errorR(new _Error(SR.chkNoByrefReturnOfLocal($var7[2].DisplayName), $var7[1]));
        }
      }

      CheckVal(cenv_1, env_1, $var7[2], $var7[1], context);
      break;

    case 4:
      CheckExprNoByrefs(cenv_1, new env(env_1.boundTyparNames, env_1.boundTypars, env_1.argVals, env_1.sigToImplRemapInfo, env_1.limited, true, env_1.reflect, env_1.external), $var7[2]);

      if (cenv_1.reportErrors) {
        cenv_1.usesQuotations = true;

        try {
          const qscope = QuotationGenerationScope.Create(cenv_1.g, cenv_1.amap, cenv_1.viewCcu, new IsReflectedDefinition(1));
          const qdata = ConvExprPublic(qscope, QuotationTranslationEnv.Empty, $var7[2]);
          const patternInput = qscope.Close();
          const matchValue_1 = $var7[4].contents;

          if (matchValue_1 != null) {} else {
            $var7[4].contents = [patternInput[0], map(function (tuple) {
              return tuple[0];
            }, patternInput[1]), map(function (tuple_1) {
              return tuple_1[0];
            }, patternInput[2]), qdata];
          }
        } catch (matchValue_2) {
          if (matchValue_2 instanceof InvalidQuotedTerm) {
            errorRecovery(matchValue_2.Data0, $var7[3]);
          } else {
            throw matchValue_2;
          }
        }
      }

      CheckTypeNoByrefs(cenv_1, env_1, $var7[3], $var7[5]);
      break;

    case 5:
      CheckExprNoByrefs(cenv_1, env_1, $var7[5]);
      CheckMethods(cenv_1, env_1, $var7[1], $var7[4]);
      CheckInterfaceImpls(cenv_1, env_1, $var7[1], $var7[2]);
      CheckTypePermitByrefs(cenv_1, env_1, $var7[3], $var7[6]);
      const interfaces = filter(function (arg10_) {
        return isInterfaceTy(cenv_1.g, arg10_);
      }, toList(delay(function () {
        return append(isInterfaceTy(cenv_1.g, $var7[6]) ? AllSuperTypesOfType(cenv_1.g, cenv_1.amap, $var7[3], new AllowMultiIntfInstantiations(0), $var7[6]) : empty(), delay(function () {
          return collect(function (matchValue_3) {
            return AllSuperTypesOfType(cenv_1.g, cenv_1.amap, $var7[3], new AllowMultiIntfInstantiations(0), matchValue_3[0]);
          }, $var7[2]);
        }));
      })));
      CheckMultipleInterfaceInstantiations(cenv_1, interfaces, $var7[3]);
      break;

    case 6:
      const memberInfo = getValue($var7[7].MemberInfo);

      if (memberInfo.MemberFlags.IsDispatchSlot) {
        errorR(new _Error(SR.tcCannotCallAbstractBaseMember($var7[7].DisplayName), $var7[4]));
      } else {
        CheckVal(cenv_1, env_1, $var7[7], $var7[4], new ByrefContext(2));
        CheckVal(cenv_1, env_1, $var7[1], $var7[4], new ByrefContext(2));
        CheckTypePermitByrefs(cenv_1, env_1, $var7[4], $var7[3]);
        CheckTypeInstPermitByrefs(cenv_1, env_1, $var7[4], $var7[6]);
        CheckExprs(cenv_1, env_1, $var7[5], mkArgsForAppliedExpr(false, $var7[2]).tail);
      }

      break;

    case 7:
      const $var8 = expr_1.tag === 11 ? expr_1.data[0].tag === 31 ? expr_1.data[2].tail != null ? expr_1.data[2].head.tag === 1 ? (virt = expr_1.data[0].data[0], tys = expr_1.data[0].data[10], rest = expr_1.data[2].tail, mref = expr_1.data[0].data[7], methTypeArgs = expr_1.data[0].data[9], enclTypeArgs = expr_1.data[0].data[8], baseVal = expr_1.data[2].head.data[0], !virt ? baseVal.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1)) : false) ? [0, expr_1.data[2].head.data[0], expr_1.data[0].data[8], expr_1.data[3], expr_1.data[0].data[9], expr_1.data[0].data[7], expr_1.data[2].tail, expr_1.data[1], expr_1.data[0].data[10], expr_1.data[0].data[0]] : [1] : [1] : [1] : [1] : [1];

      switch ($var8[0]) {
        case 0:
          const matchValue_4 = tryDestAppTy(cenv_1.g, $var8[1].Type);
          const $var9 = matchValue_4 != null ? getValue(matchValue_4).IsILTycon ? [0, getValue(matchValue_4)] : [1] : [1];

          switch ($var9[0]) {
            case 0:
              try {
                const mdef = resolveILMethodRef($var9[1].ILTyconRawMetadata, $var8[5]);

                if (mdef.IsAbstract) {
                  errorR(new _Error(SR.tcCannotCallAbstractBaseMember(mdef.Name), $var8[3]));
                }
              } catch (matchValue_5) {}

              break;

            case 1:
              break;
          }

          CheckTypeInstNoByrefs(cenv_1, env_1, $var8[3], $var8[7]);
          CheckTypeInstNoByrefs(cenv_1, env_1, $var8[3], $var8[2]);
          CheckTypeInstNoByrefs(cenv_1, env_1, $var8[3], $var8[4]);
          CheckTypeInstNoByrefs(cenv_1, env_1, $var8[3], $var8[8]);
          CheckVal(cenv_1, env_1, $var8[1], $var8[3], new ByrefContext(2));
          CheckExprsPermitByrefs(cenv_1, env_1, $var8[6]);
          break;

        case 1:
          let $var10;

          if (expr_1.tag === 11) {
            $var10 = [0, expr_1.data[2], expr_1.data[0], expr_1.data[3], expr_1.data[1]];
          } else {
            const activePatternResult39302 = function (arg10__2) {
              return _TypeOfExpr___(cenv_1.g, arg10__2);
            }(expr_1);

            if (activePatternResult39302 != null) {
              if (isVoidTy(cenv_1.g, getValue(activePatternResult39302))) {
                $var10 = [1, getValue(activePatternResult39302)];
              } else {
                $var10 = [2];
              }
            } else {
              $var10 = [2];
            }
          }

          switch ($var10[0]) {
            case 0:
              CheckExprOp(cenv_1, env_1, $var10[2], $var10[4], $var10[1], $var10[3], context, expr_1);
              break;

            case 1:
              break;

            case 2:
              let $var11;

              const activePatternResult39300 = function (arg10__1) {
                return _TypeDefOfExpr___(cenv_1.g, arg10__1);
              }(expr_1);

              if (activePatternResult39300 != null) {
                if (isVoidTy(cenv_1.g, getValue(activePatternResult39300))) {
                  $var11 = [0, getValue(activePatternResult39300)];
                } else {
                  $var11 = [1];
                }
              } else {
                $var11 = [1];
              }

              switch ($var11[0]) {
                case 0:
                  break;

                case 1:
                  const $var12 = expr_1.tag === 5 ? expr_1.data[0].tag === 1 ? expr_1.data[3].tail != null ? expr_1.data[3].tail.tail == null ? (vref = expr_1.data[0].data[0], arg = expr_1.data[3].head, isSpliceOperator(cenv_1.g, vref) ? env_1.quote : false) ? [0, expr_1.data[3].head, expr_1.data[4], expr_1.data[2], expr_1.data[0].data[0]] : [1] : [1] : [1] : [1] : [1];

                  switch ($var12[0]) {
                    case 0:
                      CheckTypeInstPermitByrefs(cenv_1, env_1, $var12[2], $var12[3]);
                      CheckExprNoByrefs(cenv_1, env_1, $var12[1]);
                      break;

                    case 1:
                      switch (expr_1.tag) {
                        case 5:
                          if (cenv_1.reportErrors) {
                            let $var13;

                            const activePatternResult39295 = _OptionalCoerce_(expr_1.data[0]);

                            if (activePatternResult39295.tag === 1) {
                              if (((valRefEq(cenv_1.g, activePatternResult39295.data[0], cenv_1.g.raise_vref) ? true : valRefEq(cenv_1.g, activePatternResult39295.data[0], cenv_1.g.failwith_vref)) ? true : valRefEq(cenv_1.g, activePatternResult39295.data[0], cenv_1.g.null_arg_vref)) ? true : valRefEq(cenv_1.g, activePatternResult39295.data[0], cenv_1.g.invalid_op_vref)) {
                                $var13 = [0, activePatternResult39295.data[2], activePatternResult39295.data[0]];
                              } else {
                                $var13 = [1];
                              }
                            } else {
                              $var13 = [1];
                            }

                            switch ($var13[0]) {
                              case 0:
                                const $var14 = expr_1.data[3].tail != null ? expr_1.data[3].tail.tail != null ? [1] : [0] : [0];

                                switch ($var14[0]) {
                                  case 0:
                                    break;

                                  case 1:
                                    warning(new _Error(SR.checkRaiseFamilyFunctionArgumentCount($var13[2].DisplayName, 1, expr_1.data[3].length), $var13[1]));
                                    break;
                                }

                                break;

                              case 1:
                                let $var15;

                                const activePatternResult39294 = _OptionalCoerce_(expr_1.data[0]);

                                if (activePatternResult39294.tag === 1) {
                                  if (valRefEq(cenv_1.g, activePatternResult39294.data[0], cenv_1.g.invalid_arg_vref)) {
                                    $var15 = [0, activePatternResult39294.data[2], activePatternResult39294.data[0]];
                                  } else {
                                    $var15 = [1];
                                  }
                                } else {
                                  $var15 = [1];
                                }

                                switch ($var15[0]) {
                                  case 0:
                                    const $var16 = expr_1.data[3].tail != null ? expr_1.data[3].tail.tail != null ? expr_1.data[3].tail.tail.tail != null ? [1] : [0] : [0] : [0];

                                    switch ($var16[0]) {
                                      case 0:
                                        break;

                                      case 1:
                                        warning(new _Error(SR.checkRaiseFamilyFunctionArgumentCount($var15[2].DisplayName, 2, expr_1.data[3].length), $var15[1]));
                                        break;
                                    }

                                    break;

                                  case 1:
                                    let $var17;

                                    const activePatternResult39293 = _OptionalCoerce_(expr_1.data[0]);

                                    if (activePatternResult39293.tag === 1) {
                                      if (valRefEq(cenv_1.g, activePatternResult39293.data[0], cenv_1.g.failwithf_vref)) {
                                        $var17 = [0, activePatternResult39293.data[0], activePatternResult39293.data[2]];
                                      } else {
                                        $var17 = [1];
                                      }
                                    } else {
                                      $var17 = [1];
                                    }

                                    switch ($var17[0]) {
                                      case 0:
                                        const $var18 = expr_1.data[3].tail != null ? expr_1.data[3].head.tag === 5 ? expr_1.data[3].head.data[0].tag === 1 ? expr_1.data[3].head.data[2].tail != null ? expr_1.data[3].head.data[2].tail.tail != null ? expr_1.data[3].head.data[2].tail.tail.tail != null ? expr_1.data[3].head.data[2].tail.tail.tail.tail != null ? expr_1.data[3].head.data[2].tail.tail.tail.tail.tail != null ? expr_1.data[3].head.data[2].tail.tail.tail.tail.tail.tail == null ? expr_1.data[3].head.data[3].tail != null ? expr_1.data[3].head.data[3].head.tag === 0 ? expr_1.data[3].head.data[3].head.data[0].tag === 14 ? expr_1.data[3].head.data[3].tail.tail == null ? (typC = expr_1.data[3].head.data[2].tail.tail.head, typB = expr_1.data[3].head.data[2].tail.head, newFormat = expr_1.data[3].head.data[0].data[0], formatString = expr_1.data[3].head.data[3].head.data[0].data, formatRange = expr_1.data[3].head.data[3].head.data[1], valRefEq(cenv_1.g, newFormat, cenv_1.g.new_format_vref)) ? [0, expr_1.data[3].head.data[3].head.data[1], expr_1.data[3].head.data[3].head.data[0].data, expr_1.data[3].head.data[0].data[0], expr_1.data[3].head.data[2].tail.head, expr_1.data[3].head.data[2].tail.tail.head, expr_1.data[3].tail] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                                        switch ($var18[0]) {
                                          case 0:
                                            const matchValue_6 = TryCountFormatStringArguments($var18[1], cenv_1.g, $var18[2], $var18[4], $var18[5]);

                                            if (matchValue_6 == null) {} else {
                                              const expected = getValue(matchValue_6) + 1 | 0;
                                              const actual = $var18[6].length + 1 | 0;

                                              if (expected < actual) {
                                                warning(new _Error(SR.checkRaiseFamilyFunctionArgumentCount($var17[1].DisplayName, expected, actual), $var17[2]));
                                              }
                                            }

                                            break;

                                          case 1:
                                            break;
                                        }

                                        break;

                                      case 1:
                                        break;
                                    }

                                    break;
                                }

                                break;
                            }
                          }

                          CheckTypeInstNoByrefs(cenv_1, env_1, expr_1.data[4], expr_1.data[2]);
                          CheckTypePermitByrefs(cenv_1, env_1, expr_1.data[4], expr_1.data[1]);
                          CheckTypeInstPermitByrefs(cenv_1, env_1, expr_1.data[4], expr_1.data[2]);
                          CheckExprNoByrefs(cenv_1, env_1, expr_1.data[0]);
                          let isByrefReturnCall;
                          const $var19 = context.tag === 1 ? context.data ? isByrefTy(cenv_1.g, tyOfExpr(cenv_1.g, expr_1)) ? [0] : [1] : [1] : [1];

                          switch ($var19[0]) {
                            case 0:
                              isByrefReturnCall = true;
                              break;

                            case 1:
                              isByrefReturnCall = false;
                              break;
                          }

                          CheckExprs(cenv_1, env_1, expr_1.data[3], mkArgsForAppliedExpr(isByrefReturnCall, expr_1.data[0]));
                          break;

                        case 3:
                          const topValInfo = new ValReprInfo(0, [new List(), ofArray([map(function (_arg1) {
                            return ValReprInfoModule.unnamedTopArg1;
                          }, expr_1.data[3])]), ValReprInfoModule.unnamedRetVal]);
                          const ty = mkMultiLambdaTy(expr_1.data[5], expr_1.data[3], expr_1.data[6]);
                          CheckLambdas(false, null, cenv_1, env_1, false, topValInfo, false, expr_1, expr_1.data[5], ty);
                          break;

                        case 4:
                          const topValInfo_1 = new ValReprInfo(0, [ValReprInfoModule.InferTyparInfo(expr_1.data[1]), new List(), ValReprInfoModule.unnamedRetVal]);
                          const ty_1 = tryMkForallTy(expr_1.data[1], expr_1.data[4]);
                          CheckLambdas(false, null, cenv_1, env_1, false, topValInfo_1, false, expr_1, expr_1.data[3], ty_1);
                          break;

                        case 13:
                          const env_2 = BindTypars(cenv_1.g, env_1, expr_1.data[0]);
                          CheckExprNoByrefs(cenv_1, env_2, expr_1.data[1]);
                          break;

                        case 9:
                          CheckTypePermitByrefs(cenv_1, env_1, expr_1.data[4], expr_1.data[5]);
                          CheckDecisionTree(cenv_1, env_1, expr_1.data[2]);
                          CheckDecisionTreeTargets(cenv_1, env_1, expr_1.data[3], context);
                          break;

                        case 6:
                          BindVals(cenv_1, env_1, valsOfBinds(expr_1.data[0]));
                          CheckBindings(cenv_1, env_1, expr_1.data[0]);
                          CheckExprNoByrefs(cenv_1, env_1, expr_1.data[1]);
                          break;

                        case 10:
                          CheckExprNoByrefs(cenv_1, env_1, expr_1.data[1]);
                          CheckExprNoByrefs(cenv_1, env_1, expr_1.data[2]);
                          iterate(function (_arg7) {
                            if (_arg7.tag === 1) {
                              CheckTypeNoByrefs(cenv_1, env_1, expr_1.data[3], _arg7.data);
                            } else {
                              CheckTypeNoByrefs(cenv_1, env_1, expr_1.data[3], _arg7.data[0]);
                              CheckTypeNoByrefs(cenv_1, env_1, expr_1.data[3], _arg7.data[1]);
                            }
                          }, expr_1.data[0]);
                          break;

                        case 14:
                          throw new Error("Unexpected reclink");
                          break;

                        default:
                          throw new Error("C:/projects/fcs/src/fsharp/PostInferenceChecks.fs", 526, 10);
                      }

                      break;
                  }

                  break;
              }

              break;
          }

          break;
      }

      break;
  }
}
export function CheckMethods(cenv_1, env_1, baseValOpt, l) {
  iterate(function (arg30_) {
    CheckMethod(cenv_1, env_1, baseValOpt, arg30_);
  }, l);
}
export function CheckMethod(cenv_1, env_1, baseValOpt, _arg1) {
  const env_2 = BindTypars(cenv_1.g, env_1, _arg1.data[2]);
  const vs = concat(_arg1.data[3]);
  CheckAttribs(cenv_1, env_2, _arg1.data[1]);
  CheckNoReraise(cenv_1, null, _arg1.data[4]);
  CheckEscapes(cenv_1, true, _arg1.data[5], baseValOpt == null ? vs : new List(getValue(baseValOpt), vs), _arg1.data[4]);
  CheckExprPermitByref(cenv_1, env_2, _arg1.data[4]);
}
export function CheckInterfaceImpls(cenv_1, env_1, baseValOpt, l) {
  iterate(function (tupledArg) {
    CheckInterfaceImpl(cenv_1, env_1, baseValOpt, tupledArg[0], tupledArg[1]);
  }, l);
}
export function CheckInterfaceImpl(cenv_1, env_1, baseValOpt, _ty, overrides) {
  CheckMethods(cenv_1, env_1, baseValOpt, overrides);
}
export function CheckExprOp(cenv_1, env_1, op, tyargs, args, m, context, expr) {
  var tupInfo;
  var ty_1;

  const limitedCheck = function () {
    if (env_1.limited) {
      errorR(new _Error(SR.chkObjCtorsCantUseExceptionHandling(), m));
    }
  };

  iterate(function (ty) {
    CheckTypePermitByrefs(cenv_1, env_1, m, ty);
  }, tyargs);
  const matchValue = [op, tyargs, args];
  const $var20 = matchValue[0].tag === 6 ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail == null ? [0, matchValue[2].head.data[4], matchValue[2].tail.head.data[4]] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : matchValue[0].tag === 9 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail == null ? [1, matchValue[2].head.data[4], matchValue[2].tail.head.data[4]] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : matchValue[0].tag === 7 ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail != null ? matchValue[2].tail.tail.head.tag === 3 ? matchValue[2].tail.tail.head.data[3].tail != null ? matchValue[2].tail.tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail.tail == null ? [2, matchValue[2].head.data[4], matchValue[2].tail.head.data[4], matchValue[2].tail.tail.head.data[4]] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : matchValue[0].tag === 8 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail != null ? matchValue[2].tail.tail.head.tag === 3 ? matchValue[2].tail.tail.head.data[3].tail != null ? matchValue[2].tail.tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail.tail == null ? [3, matchValue[2].tail.head.data[4], matchValue[2].head.data[4], matchValue[2].tail.tail.head.data[4]] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : [6] : matchValue[0].tag === 31 ? [4, matchValue[0].data[8], matchValue[0].data[9], matchValue[0].data[10]] : matchValue[0].tag === 2 ? (tupInfo = matchValue[0].data, !evalTupInfoIsStruct(tupInfo)) ? [5, matchValue[0].data] : [6] : [6];

  switch ($var20[0]) {
    case 0:
      CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
      CheckExprsNoByrefs(cenv_1, env_1, ofArray([$var20[1], $var20[2]]));
      break;

    case 1:
      CheckTypeInstPermitByrefs(cenv_1, env_1, m, tyargs);
      limitedCheck();
      CheckExpr(cenv_1, env_1, $var20[1], context);
      CheckExprNoByrefs(cenv_1, env_1, $var20[2]);
      break;

    case 2:
      CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
      CheckExprsNoByrefs(cenv_1, env_1, ofArray([$var20[1], $var20[2], $var20[3]]));
      break;

    case 3:
      CheckTypeInstPermitByrefs(cenv_1, env_1, m, tyargs);
      limitedCheck();
      CheckExpr(cenv_1, env_1, $var20[2], context);
      CheckExpr(cenv_1, env_1, $var20[3], context);
      break;

    case 4:
      CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
      CheckTypeInstNoByrefs(cenv_1, env_1, m, $var20[1]);
      CheckTypeInstNoByrefs(cenv_1, env_1, m, $var20[2]);
      CheckTypeInstPermitByrefs(cenv_1, env_1, m, $var20[3]);
      const matchValue_1 = [context, $var20[3]];
      const $var21 = matchValue_1[0].tag === 1 ? matchValue_1[0].data ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? (ty_1 = matchValue_1[1].head, isByrefTy(cenv_1.g, ty_1)) ? [0, matchValue_1[1].head] : [1] : [1] : [1] : [1] : [1];

      switch ($var21[0]) {
        case 0:
          CheckExprsPermitByrefReturns(cenv_1, env_1, args);
          break;

        case 1:
          CheckExprsPermitByrefs(cenv_1, env_1, args);
          break;
      }

      break;

    case 5:
      if (context.tag === 0) {
        if (cenv_1.reportErrors) {
          if (args.length !== context.data) {
            errorR(new InternalError("Tuple arity does not correspond to planned function argument arity", m));
          }
        }

        CheckExprsPermitByrefs(cenv_1, env_1, args);
      } else {
        CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
        CheckExprsNoByrefs(cenv_1, env_1, args);
      }

      break;

    case 6:
      const $var22 = matchValue[0].tag === 30 ? matchValue[0].data[0].tag === 0 ? [0, matchValue[0].data[1]] : [13] : matchValue[0].tag === 21 ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [1, matchValue[2].head] : [13] : [13] : matchValue[0].tag === 12 ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [2, matchValue[0].data, matchValue[2].head] : [13] : [13] : matchValue[0].tag === 11 ? matchValue[2].tail != null ? matchValue[2].tail.tail != null ? matchValue[2].tail.tail.tail == null ? [3, matchValue[0].data, matchValue[2].head, matchValue[2].tail.head] : [13] : [13] : [13] : matchValue[0].tag === 24 ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [4, matchValue[1].head, matchValue[1].tail.head, matchValue[2].head] : [13] : [13] : [13] : [13] : [13] : matchValue[0].tag === 25 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail == null ? [5, matchValue[1].head] : [13] : [13] : [13] : matchValue[0].tag === 13 ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [7, matchValue[0].data, matchValue[2].head, matchValue[1]] : [13] : [6, matchValue[0].data, matchValue[1]] : matchValue[0].tag === 16 ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [8, matchValue[2].head] : [13] : [13] : matchValue[0].tag === 14 ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [9, matchValue[2].head] : [13] : [13] : matchValue[0].tag === 17 ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [10, matchValue[0].data[1], matchValue[2].head, matchValue[1], matchValue[0].data[0]] : [13] : [13] : matchValue[0].tag === 22 ? [11, matchValue[0].data[0], matchValue[0].data[1]] : matchValue[0].tag === 29 ? [12] : matchValue[0].tag === 2 ? [13] : matchValue[0].tag === 0 ? [13] : matchValue[0].tag === 1 ? [13] : matchValue[0].tag === 3 ? [13] : matchValue[0].tag === 4 ? [13] : matchValue[0].tag === 5 ? [13] : matchValue[0].tag === 10 ? [13] : matchValue[0].tag === 15 ? [13] : matchValue[0].tag === 18 ? [13] : matchValue[0].tag === 19 ? [13] : matchValue[0].tag === 20 ? [13] : matchValue[0].tag === 23 ? [13] : [13];

      switch ($var22[0]) {
        case 0:
          if (cenv_1.reportErrors) {
            if (noByrefs(context) ? cenv_1.reportErrors : false) {
              errorR(new _Error(SR.chkNoAddressOfAtThisPoint($var22[1].DisplayName), m));
            } else if (((context.tag === 1 ? context.data : false) ? CurriedLambda(() => $var22[1].ValReprInfo == null)() : false) ? !env_1.argVals.ContainsVal($var22[1].Deref) : false) {
              errorR(new _Error(SR.chkNoByrefReturnOfLocal($var22[1].DisplayName), m));
            }
          }

          CheckExprsNoByrefs(cenv_1, env_1, args);
          break;

        case 1:
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          CheckExprsPermitByrefs(cenv_1, env_1, ofArray([$var22[1]]));
          break;

        case 2:
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          CheckExprsPermitByrefs(cenv_1, env_1, ofArray([$var22[2]]));
          break;

        case 3:
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          CheckExprsPermitByrefs(cenv_1, env_1, ofArray([$var22[2]]));
          CheckExprsNoByrefs(cenv_1, env_1, ofArray([$var22[3]]));
          break;

        case 4:
          CheckTypeInstPermitByrefs(cenv_1, env_1, m, tyargs);
          CheckExpr(cenv_1, env_1, $var22[3], context);
          break;

        case 5:
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          break;

        case 6:
          if ((noByrefs(context) ? cenv_1.reportErrors : false) ? isByrefLikeTy(cenv_1.g, tyOfExpr(cenv_1.g, expr)) : false) {
            errorR(new _Error(SR.chkNoAddressStaticFieldAtThisPoint($var22[1].FieldName), m));
          }

          CheckTypeInstNoByrefs(cenv_1, env_1, m, $var22[2]);
          break;

        case 7:
          if ((noByrefs(context) ? cenv_1.reportErrors : false) ? isByrefLikeTy(cenv_1.g, tyOfExpr(cenv_1.g, expr)) : false) {
            errorR(new _Error(SR.chkNoAddressFieldAtThisPoint($var22[1].FieldName), m));
          }

          CheckTypeInstNoByrefs(cenv_1, env_1, m, $var22[3]);
          CheckExprPermitByref(cenv_1, env_1, $var22[2]);
          break;

        case 8:
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          CheckExprPermitByref(cenv_1, env_1, $var22[1]);
          break;

        case 9:
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          CheckExprPermitByref(cenv_1, env_1, $var22[1]);
          break;

        case 10:
          if ((noByrefs(context) ? cenv_1.reportErrors : false) ? isByrefLikeTy(cenv_1.g, tyOfExpr(cenv_1.g, expr)) : false) {
            errorR(new _Error(SR.chkNoAddressFieldAtThisPoint($var22[4].CaseName), m));
          }

          CheckTypeInstNoByrefs(cenv_1, env_1, m, $var22[3]);
          CheckExprPermitByref(cenv_1, env_1, $var22[2]);
          break;

        case 11:
          CheckTypeInstPermitByrefs(cenv_1, env_1, m, $var22[2]);
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          const matchValue_2 = [$var22[1], args];
          const $var23 = matchValue_2[0].tail != null ? matchValue_2[0].head.tag === 64 ? matchValue_2[0].tail.tail == null ? matchValue_2[1].tail != null ? matchValue_2[1].tail.tail != null ? matchValue_2[1].tail.tail.tail == null ? [0, matchValue_2[0].head.data[0], matchValue_2[0].head.data[2], matchValue_2[0].head.data[1], matchValue_2[1].head, matchValue_2[1].tail.head] : [6] : [6] : [6] : [6] : matchValue_2[0].head.tag === 60 ? matchValue_2[0].tail.tail != null ? matchValue_2[0].tail.head.tag === 33 ? matchValue_2[0].tail.tail.tail == null ? matchValue_2[1].tail != null ? matchValue_2[1].tail.tail == null ? [2, matchValue_2[0].head.data[0], matchValue_2[0].head.data[2], matchValue_2[0].head.data[1], matchValue_2[1].head] : [6] : [6] : [6] : [6] : matchValue_2[1].tail != null ? matchValue_2[1].tail.tail == null ? [1, matchValue_2[0].head.data[0], matchValue_2[0].head.data[2], matchValue_2[0].head.data[1], matchValue_2[1].head] : [6] : [6] : matchValue_2[0].head.tag === 62 ? matchValue_2[0].tail.tail == null ? matchValue_2[1].tail != null ? matchValue_2[1].tail.tail == null ? [3, matchValue_2[0].head.data, matchValue_2[1].head] : [6] : [6] : [6] : matchValue_2[0].head.tag === 61 ? matchValue_2[0].tail.tail == null ? matchValue_2[1].tail != null ? matchValue_2[1].tail.tail == null ? [3, matchValue_2[0].head.data, matchValue_2[1].head] : [6] : [6] : [6] : matchValue_2[0].head.tag === 80 ? matchValue_2[0].tail.tail == null ? matchValue_2[1].tail != null ? [4, matchValue_2[1].tail, matchValue_2[0].head.data[1], matchValue_2[1].head] : [6] : [6] : matchValue_2[0].head.tag === 11 ? matchValue_2[0].tail.tail == null ? [5] : [6] : [6] : [6];

          switch ($var23[0]) {
            case 0:
              CheckExprPermitByref(cenv_1, env_1, $var23[4]);
              CheckExprNoByrefs(cenv_1, env_1, $var23[5]);
              break;

            case 1:
              CheckExprPermitByref(cenv_1, env_1, $var23[4]);
              break;

            case 2:
              CheckExprPermitByref(cenv_1, env_1, $var23[4]);
              break;

            case 3:
              if ((noByrefs(context) ? cenv_1.reportErrors : false) ? isByrefLikeTy(cenv_1.g, tyOfExpr(cenv_1.g, expr)) : false) {
                errorR(new _Error(SR.chkNoAddressFieldAtThisPoint($var23[1].Name), m));
              }

              CheckExprPermitByref(cenv_1, env_1, $var23[2]);
              break;

            case 4:
              if (((noByrefs(context) ? cenv_1.reportErrors : false) ? !$var23[2] : false) ? isByrefLikeTy(cenv_1.g, tyOfExpr(cenv_1.g, expr)) : false) {
                errorR(new _Error(SR.chkNoAddressOfArrayElementAtThisPoint(), m));
              }

              CheckExprPermitByref(cenv_1, env_1, $var23[3]);
              CheckExprsNoByrefs(cenv_1, env_1, $var23[1]);
              break;

            case 5:
              CheckExprsPermitByrefs(cenv_1, env_1, args);
              break;

            case 6:
              CheckExprsNoByrefs(cenv_1, env_1, args);
              break;
          }

          break;

        case 12:
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          CheckExprsPermitByrefs(cenv_1, env_1, args);
          break;

        case 13:
          CheckTypeInstNoByrefs(cenv_1, env_1, m, tyargs);
          CheckExprsNoByrefs(cenv_1, env_1, args);
          break;
      }

      break;
  }
}
export function CheckLambdas(isTop, memInfo, cenv_1, env_1, inlined, topValInfo, alwaysCheckNoReraise, e, m, ety) {
  const $var24 = e.tag === 13 ? [0] : e.tag === 3 ? [1, e.data[5]] : e.tag === 4 ? [1, e.data[3]] : [2];

  switch ($var24[0]) {
    case 0:
      const env_2 = BindTypars(cenv_1.g, env_1, e.data[0]);
      CheckLambdas(isTop, memInfo, cenv_1, env_2, inlined, topValInfo, alwaysCheckNoReraise, e.data[1], e.data[2], ety);
      break;

    case 1:
      const patternInput = destTopLambda(cenv_1.g, cenv_1.amap, topValInfo, e, ety);
      const env_3 = BindTypars(cenv_1.g, env_1, patternInput[0]);
      const thisAndBase = append_1(toList(defaultArg(patternInput[1], [], $var25 => [$var25])), toList(defaultArg(patternInput[2], [], $var26 => [$var26])));
      const restArgs = concat(patternInput[3]);
      const syntacticArgs = append_1(thisAndBase, restArgs);
      const env_4 = SetArgVals(env_3, restArgs);

      if (memInfo != null) {
        for (let v of thisAndBase) {
          v.SetHasBeenReferenced();
        }

        const matchValue = [getValue(memInfo).MemberFlags.IsInstance, restArgs];
        const $var27 = matchValue[0] ? matchValue[1].tail != null ? [0] : [1] : [1];

        switch ($var27[0]) {
          case 0:
            const firstArg = matchValue[1].head;
            firstArg.SetHasBeenReferenced();
            break;

          case 1:
            break;
        }

        iterate(function (arg) {
          if (isByrefTy(cenv_1.g, arg.Type)) {
            arg.SetHasBeenReferenced();
          }
        }, restArgs);
      }

      iterate(function (v_1) {
        CheckValSpec(cenv_1, env_4, v_1);
      }, syntacticArgs);
      iterate(function (v_2) {
        BindVal(cenv_1, env_4, v_2);
      }, syntacticArgs);

      if (memInfo != null) {
        testHookMemberBody(getValue(memInfo), patternInput[4]);
      }

      const freesOpt = CheckEscapes(cenv_1, memInfo != null, $var24[1], syntacticArgs, patternInput[4]);
      CheckNoReraise(cenv_1, freesOpt, patternInput[4]);

      if ((((!(patternInput[0].tail == null) ? true : !(patternInput[3].tail == null)) ? isTop : false) ? !cenv_1.g.compilingFslib : false) ? isByrefTy(cenv_1.g, patternInput[5]) : false) {
        CheckExprPermitByrefReturn(cenv_1, env_4, patternInput[4]);
      } else {
        CheckExprNoByrefs(cenv_1, env_4, patternInput[4]);
      }

      if (cenv_1.reportErrors) {
        if ((!inlined ? patternInput[0].tail == null ? patternInput[3].tail == null : false : false) ? true : !isTop) {
          CheckForByrefLikeType(cenv_1, env_4, patternInput[5], function () {
            errorR(new _Error(SR.chkFirstClassFuncNoByref(), $var24[1]));
          });
        } else if (!cenv_1.g.compilingFslib ? isByrefTy(cenv_1.g, patternInput[5]) : false) {
          CheckForByrefLikeType(cenv_1, env_4, destByrefTy(cenv_1.g, patternInput[5]), function () {
            errorR(new _Error(SR.chkReturnTypeNoByref(), $var24[1]));
          });
        }

        for (let tp of patternInput[0]) {
          if (sumBy(function (_arg8) {
            const $var28 = _arg8.tag === 0 ? isClassTy(cenv_1.g, _arg8.data[0]) ? [0, _arg8.data[0]] : [1] : [1];

            switch ($var28[0]) {
              case 0:
                return 1;

              case 1:
                return 0;
            }
          }, tp.Constraints) > 1) {
            errorR(new _Error(SR.chkTyparMultipleClassConstraints(), $var24[1]));
          }
        }
      }

      break;

    case 2:
      CheckTypePermitByrefs(cenv_1, env_1, m, ety);

      if (!inlined ? isByrefLikeTy(cenv_1.g, ety) ? true : isNativePtrTy(cenv_1.g, ety) : false) {
        CheckExprPermitByref(cenv_1, env_1, e);
      } else {
        CheckExprNoByrefs(cenv_1, env_1, e);
      }

      if (alwaysCheckNoReraise) {
        CheckNoReraise(cenv_1, null, e);
      }

      break;
  }
}
export function CheckExprs(cenv_1, env_1, exprs, contexts) {
  const contexts_1 = Array.from(contexts);

  const argArity = function (i) {
    if (i < contexts_1.length) {
      return contexts_1[i];
    } else {
      return new ByrefContext(2);
    }
  };

  iterateIndexed(function (i_1, exp) {
    CheckExpr(cenv_1, env_1, exp, argArity(i_1));
  }, exprs);
}
export function CheckExprsNoByrefs(cenv_1, env_1, exprs) {
  iterate(function (expr) {
    CheckExprNoByrefs(cenv_1, env_1, expr);
  }, exprs);
}
export function CheckExprsPermitByrefs(cenv_1, env_1, exprs) {
  iterate(function (expr) {
    CheckExprPermitByref(cenv_1, env_1, expr);
  }, exprs);
}
export function CheckExprsPermitByrefReturns(cenv_1, env_1, exprs) {
  iterate(function (expr) {
    CheckExprPermitByrefReturn(cenv_1, env_1, expr);
  }, exprs);
}
export function CheckExprPermitByref(cenv_1, env_1, expr) {
  CheckExpr(cenv_1, env_1, expr, new ByrefContext(1, false));
}
export function CheckExprPermitByrefReturn(cenv_1, env_1, expr) {
  CheckExpr(cenv_1, env_1, expr, new ByrefContext(1, true));
}
export function CheckDecisionTreeTargets(cenv_1, env_1, targets, context) {
  targets.forEach(function (arg30_) {
    CheckDecisionTreeTarget(cenv_1, env_1, context, arg30_);
  });
}
export function CheckDecisionTreeTarget(cenv_1, env_1, context, _arg2) {
  BindVals(cenv_1, env_1, _arg2.data[0]);
  iterate(function (v) {
    CheckValSpec(cenv_1, env_1, v);
  }, _arg2.data[0]);
  CheckExpr(cenv_1, env_1, _arg2.data[1], context);
}
export function CheckDecisionTree(cenv_1, env_1, x) {
  if (x.tag === 2) {
    CheckBinding(cenv_1, env_1, false, x.data[0]);
    CheckDecisionTree(cenv_1, env_1, x.data[1]);
  } else if (x.tag === 0) {
    CheckDecisionTreeSwitch(cenv_1, env_1, x.data[0], x.data[1], x.data[2], x.data[3]);
  } else {
    CheckExprsNoByrefs(cenv_1, env_1, x.data[0]);
  }
}
export function CheckDecisionTreeSwitch(cenv_1, env_1, e, cases, dflt, m) {
  CheckExprPermitByref(cenv_1, env_1, e);
  iterate(function (_arg2) {
    CheckDecisionTreeTest(cenv_1, env_1, m, _arg2.data[0]);
    CheckDecisionTree(cenv_1, env_1, _arg2.data[1]);
  }, cases);
  iterate(function (x) {
    CheckDecisionTree(cenv_1, env_1, x);
  }, defaultArg(dflt, [], $var29 => [$var29]));
}
export function CheckDecisionTreeTest(cenv_1, env_1, m, discrim) {
  switch (discrim.tag) {
    case 1:
      CheckTypePermitByrefs(cenv_1, env_1, m, discrim.data[1]);
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      CheckTypePermitByrefs(cenv_1, env_1, m, discrim.data[0]);
      CheckTypePermitByrefs(cenv_1, env_1, m, discrim.data[1]);
      break;

    case 5:
      CheckExprNoByrefs(cenv_1, env_1, discrim.data[0]);
      break;

    default:
      CheckTypeInstPermitByrefs(cenv_1, env_1, m, discrim.data[1]);
  }
}
export function CheckAttrib(cenv_1, env_1, _arg3) {
  iterate(function (_arg3_1) {
    const expr = _arg3_1.data[3];
    CheckAttribExpr(cenv_1, env_1, expr);
  }, _arg3.data[3]);
  iterate(function (arg20_) {
    CheckAttribExpr(cenv_1, env_1, arg20_);
  }, _arg3.data[2]);
}
export function CheckAttribExpr(cenv_1, env_1, _arg4) {
  CheckExprNoByrefs(cenv_1, env_1, _arg4.data[0]);
  CheckExprNoByrefs(cenv_1, env_1, _arg4.data[1]);
  CheckNoReraise(cenv_1, null, _arg4.data[0]);
  CheckAttribArgExpr(cenv_1, env_1, _arg4.data[1]);
}
export function CheckAttribArgExpr(cenv_1, env_1, expr) {
  let $var30;

  if (expr.tag === 0) {
    $var30 = [0, expr.data[0], expr.data[1]];
  } else if (expr.tag === 11) {
    if (expr.data[0].tag === 3) {
      if (expr.data[1].tail != null) {
        if (expr.data[1].tail.tail == null) {
          $var30 = [1, expr.data[1].head, expr.data[3], expr.data[2]];
        } else {
          const activePatternResult39411 = function (arg10__6) {
            return _TypeOfExpr___(cenv_1.g, arg10__6);
          }(expr);

          if (activePatternResult39411 != null) {
            $var30 = [2];
          } else {
            $var30 = [3];
          }
        }
      } else {
        const activePatternResult39412 = function (arg10__7) {
          return _TypeOfExpr___(cenv_1.g, arg10__7);
        }(expr);

        if (activePatternResult39412 != null) {
          $var30 = [2];
        } else {
          $var30 = [3];
        }
      }
    } else {
      const activePatternResult39413 = function (arg10__8) {
        return _TypeOfExpr___(cenv_1.g, arg10__8);
      }(expr);

      if (activePatternResult39413 != null) {
        $var30 = [2];
      } else {
        $var30 = [3];
      }
    }
  } else {
    const activePatternResult39414 = function (arg10__9) {
      return _TypeOfExpr___(cenv_1.g, arg10__9);
    }(expr);

    if (activePatternResult39414 != null) {
      $var30 = [2];
    } else {
      $var30 = [3];
    }
  }

  switch ($var30[0]) {
    case 0:
      switch ($var30[1].tag) {
        case 0:
        case 5:
        case 1:
        case 3:
        case 7:
        case 2:
        case 4:
        case 6:
        case 8:
        case 12:
        case 11:
        case 13:
        case 17:
        case 14:
          break;

        default:
          if (cenv_1.reportErrors) {
            errorR(new _Error(SR.tastNotAConstantExpression(), $var30[2]));
          }

      }

      break;

    case 1:
      iterate(function (expr_1) {
        CheckAttribArgExpr(cenv_1, env_1, expr_1);
      }, $var30[3]);
      break;

    case 2:
      break;

    case 3:
      const activePatternResult39409 = function (arg10_) {
        return _TypeDefOfExpr___(cenv_1.g, arg10_);
      }(expr);

      if (activePatternResult39409 != null) {} else {
        let $var31;

        if (expr.tag === 11) {
          if (expr.data[0].tag === 24) {
            if (expr.data[2].tail != null) {
              if (expr.data[2].tail.tail == null) {
                $var31 = [0, expr.data[2].head];
              } else {
                const activePatternResult39404 = function (arg10__2) {
                  return _EnumExpr___(cenv_1.g, arg10__2);
                }(expr);

                if (activePatternResult39404 != null) {
                  $var31 = [1, getValue(activePatternResult39404)];
                } else {
                  $var31 = [2];
                }
              }
            } else {
              const activePatternResult39405 = function (arg10__3) {
                return _EnumExpr___(cenv_1.g, arg10__3);
              }(expr);

              if (activePatternResult39405 != null) {
                $var31 = [1, getValue(activePatternResult39405)];
              } else {
                $var31 = [2];
              }
            }
          } else {
            const activePatternResult39406 = function (arg10__4) {
              return _EnumExpr___(cenv_1.g, arg10__4);
            }(expr);

            if (activePatternResult39406 != null) {
              $var31 = [1, getValue(activePatternResult39406)];
            } else {
              $var31 = [2];
            }
          }
        } else {
          const activePatternResult39407 = function (arg10__5) {
            return _EnumExpr___(cenv_1.g, arg10__5);
          }(expr);

          if (activePatternResult39407 != null) {
            $var31 = [1, getValue(activePatternResult39407)];
          } else {
            $var31 = [2];
          }
        }

        switch ($var31[0]) {
          case 0:
            CheckAttribArgExpr(cenv_1, env_1, $var31[1]);
            break;

          case 1:
            CheckAttribArgExpr(cenv_1, env_1, $var31[1]);
            break;

          case 2:
            const activePatternResult39402 = function (arg10__1) {
              return _AttribBitwiseOrExpr___(cenv_1.g, arg10__1);
            }(expr);

            if (activePatternResult39402 != null) {
              CheckAttribArgExpr(cenv_1, env_1, getValue(activePatternResult39402)[0]);
              CheckAttribArgExpr(cenv_1, env_1, getValue(activePatternResult39402)[1]);
            } else if (cenv_1.reportErrors) {
              errorR(new _Error(SR.chkInvalidCustAttrVal(), Expr_get_Range.bind(expr)()));
            }

            break;
        }
      }

      break;
  }
}
export function CheckAttribs(cenv_1, env_1, attribs) {
  if (attribs.tail == null) {} else {
    const tcrefs = toList(delay(function () {
      return collect(function (matchValue) {
        return singleton([matchValue.data[0], matchValue.data[6]]);
      }, attribs);
    }));
    const duplicates = filter(function (tupledArg) {
      return !equals(TryFindAttributeUsageAttribute(cenv_1.g, tupledArg[1], tupledArg[0]), true);
    }, toList(map_1(function (tuple) {
      return tuple[0];
    }, filter_1(function (tupledArg_1) {
      return tupledArg_1[1] > 1;
    }, map_1(function (tupledArg_2) {
      return [last(toList(tupledArg_2[1])), count(tupledArg_2[1])];
    }, groupBy(function (tupledArg_3) {
      return tupledArg_3[0].Stamp;
    }, tcrefs))))));

    if (cenv_1.reportErrors) {
      for (let forLoopVar of duplicates) {
        errorR(new _Error(SR.chkAttrHasAllowMultiFalse(forLoopVar[0].DisplayName), forLoopVar[1]));
      }
    }

    iterate(function (arg20_) {
      CheckAttrib(cenv_1, env_1, arg20_);
    }, attribs);
  }
}
export function CheckValInfo(cenv_1, env_1, _arg5) {
  List_1.iterSquared(function (argInfo) {
    CheckArgInfo(cenv_1, env_1, argInfo);
  }, _arg5.data[1]);

  (function (argInfo_1) {
    CheckArgInfo(cenv_1, env_1, argInfo_1);
  })(_arg5.data[2]);
}
export function CheckArgInfo(cenv_1, env_1, argInfo) {
  CheckAttribs(cenv_1, env_1, argInfo.Attribs);
}
export function CheckValSpec(cenv_1, env_1, v) {
  var m;

  (function (attribs) {
    CheckAttribs(cenv_1, env_1, attribs);
  })(v.Attribs);

  iterate(function (arg20_) {
    CheckValInfo(cenv_1, env_1, arg20_);
  }, defaultArg(v.ValReprInfo, [], $var32 => [$var32]));
  (m = v.Range, function (ty) {
    CheckTypePermitByrefs(cenv_1, env_1, m, ty);
  })(v.Type);
}
export function AdjustAccess(isHidden, cpath, access) {
  if (isHidden) {
    const scoref = cpath().ILScopeRef;
    return new Accessibility(0, new List(new CompilationPath(0, [scoref, new List()]), access.data));
  } else {
    return access;
  }
}
export function CheckBinding(cenv_1, env_1, alwaysCheckNoReraise, _arg6) {
  var m;
  const isTop = _arg6.Var.ValReprInfo != null;
  let env_2;
  const external = env_1.external ? true : exists(function (attr) {
    return HasFSharpAttribute(cenv_1.g, attr, _arg6.data[0].Attribs);
  }, defaultArg(cenv_1.g.attrib_DllImportAttribute, [], $var33 => [$var33]));
  env_2 = new env(env_1.boundTyparNames, env_1.boundTypars, env_1.argVals, env_1.sigToImplRemapInfo, env_1.limited, env_1.quote, env_1.reflect, external);
  const matchValue = TryGetActivePatternInfo(mkLocalValRef(_arg6.data[0]));
  const $var34 = matchValue != null ? getValue(matchValue).ActiveTags.length > 1 ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var34[0]) {
    case 0:
      if (doesActivePatternHaveFreeTypars(cenv_1.g, mkLocalValRef(_arg6.data[0]))) {
        errorR(new _Error(SR.activePatternChoiceHasFreeTypars(_arg6.data[0].LogicalName), _arg6.data[0].Range));
      }

      break;

    case 1:
      break;
  }

  const matchValue_1 = tryFind(_arg6.data[0].Stamp, cenv_1.potentialUnboundUsesOfVals);

  if (matchValue_1 != null) {
    const nm = _arg6.data[0].DisplayName;
    errorR(new _Error(SR.chkMemberUsedInInvalidWay(nm, nm, stringOfRange(getValue(matchValue_1))), _arg6.data[0].Range));
  }

  (m = _arg6.data[0].Range, function (ty) {
    CheckTypePermitByrefs(cenv_1, env_2, m, ty);
  })(_arg6.data[0].Type);

  (function (attribs) {
    CheckAttribs(cenv_1, env_2, attribs);
  })(_arg6.data[0].Attribs);

  iterate(function (arg20_) {
    CheckValInfo(cenv_1, env_2, arg20_);
  }, defaultArg(_arg6.data[0].ValReprInfo, [], $var35 => [$var35]));

  if ((_arg6.data[0].IsMemberOrModuleBinding ? true : _arg6.data[0].IsMember) ? !_arg6.data[0].IsIncrClassGeneratedMember : false) {
    const access = AdjustAccess(IsHiddenVal(env_2.sigToImplRemapInfo, _arg6.data[0]), function () {
      return _arg6.data[0].TopValDeclaringEntity.CompilationPath;
    }, _arg6.data[0].Accessibility);
    CheckTypeForAccess(cenv_1, env_2, function () {
      return stringOfQualifiedValOrMember(cenv_1.denv, _arg6.data[0]);
    }, access, _arg6.data[0].Range, _arg6.data[0].Type);
  }

  const env_3 = (_arg6.data[0].IsConstructor ? !_arg6.data[0].IsIncrClassConstructor : false) ? new env(env_2.boundTyparNames, env_2.boundTypars, env_2.argVals, env_2.sigToImplRemapInfo, true, env_2.quote, env_2.reflect, env_2.external) : env_2;

  if (cenv_1.reportErrors) {
    const matchValue_2 = _arg6.Var.ValReprInfo;
    const $var36 = matchValue_2 != null ? getValue(matchValue_2).HasNoArgs ? [0, getValue(matchValue_2)] : [1] : [1];

    switch ($var36[0]) {
      case 0:
        CheckForByrefLikeType(cenv_1, env_3, _arg6.data[0].Type, function () {
          errorR(new _Error(SR.chkNoByrefAsTopValue(), _arg6.data[0].Range));
        });
        break;

      case 1:
        break;
    }

    if (_arg6.data[0].PublicPath != null) {
      if ((!_arg6.data[0].IsCompilerGenerated ? true : _arg6.data[0].IsIncrClassGeneratedMember) ? (env_3.reflect ? true : HasFSharpAttribute(cenv_1.g, cenv_1.g.attrib_ReflectedDefinitionAttribute, _arg6.data[0].Attribs)) ? true : HasFSharpAttribute(cenv_1.g, cenv_1.g.attrib_ReflectedDefinitionAttribute, _arg6.data[0].TopValDeclaringEntity.Attribs) : false) {
        if (_arg6.data[0].IsInstanceMember ? _arg6.data[0].MemberApparentEntity.IsStructOrEnumTycon : false) {
          errorR(new _Error(SR.chkNoReflectedDefinitionOnStructMember(), _arg6.data[0].Range));
        }

        cenv_1.usesQuotations = true;
        const matchValue_3 = _arg6.data[0].ReflectedDefinition;

        if (matchValue_3 != null) {} else {
          _arg6.data[0].SetValDefn(_arg6.data[1]);
        }

        try {
          const ety = tyOfExpr(cenv_1.g, _arg6.data[1]);
          const patternInput = _arg6.data[1].tag === 4 ? [_arg6.data[1].data[1], _arg6.data[1].data[2], applyForallTy(cenv_1.g, ety, map(function (tp) {
            return mkTyparTy(tp);
          }, _arg6.data[1].data[1]))] : [new List(), _arg6.data[1], ety];
          const env_4 = QuotationTranslationEnv.Empty.BindTypars(patternInput[0]);
          const qscope = QuotationGenerationScope.Create(cenv_1.g, cenv_1.amap, cenv_1.viewCcu, new IsReflectedDefinition(0));
          ConvExprPublic(qscope, env_4, patternInput[1]);
          const patternInput_1 = qscope.Close();

          if (!(patternInput_1[2].tail == null)) {
            errorR(new _Error(SR.chkReflectedDefCantSplice(), _arg6.data[0].Range));
          }

          ConvMethodBase(qscope, env_4, _arg6.data[0].CompiledName, _arg6.data[0]);
        } catch (matchValue_4) {
          if (matchValue_4 instanceof InvalidQuotedTerm) {
            errorR(matchValue_4.Data0);
          } else {
            throw matchValue_4;
          }
        }
      }
    }
  }

  const matchValue_5 = _arg6.data[0].MemberInfo;
  const $var37 = matchValue_5 != null ? !_arg6.data[0].IsIncrClassGeneratedMember ? [0, getValue(matchValue_5)] : [1] : [1];

  switch ($var37[0]) {
    case 0:
      const matchValue_6 = $var37[1].MemberFlags.MemberKind;
      const $var38 = matchValue_6.tag === 4 ? [0] : matchValue_6.tag === 3 ? [0] : [1];

      switch ($var38[0]) {
        case 0:
          ReturnTypeOfPropertyVal(cenv_1.g, _arg6.data[0]);
          ArgInfosOfPropertyVal(cenv_1.g, _arg6.data[0]);
          break;

        case 1:
          break;
      }

      break;

    case 1:
      break;
  }

  let topValInfo;
  const matchValue_7 = _arg6.Var.ValReprInfo;

  if (matchValue_7 != null) {
    topValInfo = getValue(matchValue_7);
  } else {
    topValInfo = ValReprInfoModule.emptyValData;
  }

  CheckLambdas(isTop, _arg6.data[0].MemberInfo, cenv_1, env_3, _arg6.data[0].MustInline, topValInfo, alwaysCheckNoReraise, _arg6.data[1], _arg6.data[0].Range, _arg6.data[0].Type);
}
export function CheckBindings(cenv_1, env_1, xs) {
  iterate(function (arg30_) {
    CheckBinding(cenv_1, env_1, false, arg30_);
  }, xs);
}
export function CheckModuleBinding(cenv_1, env_1, _arg1) {
  const isExplicitEntryPoint = HasFSharpAttribute(cenv_1.g, cenv_1.g.attrib_EntryPointAttribute, _arg1.data[0].Attribs);

  if (isExplicitEntryPoint) {
    cenv_1.entryPointGiven = true;
    const isLastCompiland = cenv_1.isLastCompiland[0];

    if (!isLastCompiland ? cenv_1.reportErrors : false) {
      errorR(new _Error(SR.chkEntryPointUsage(), _arg1.data[0].Range));
    }
  }

  if (((((!_arg1.data[0].IsMutable ? !HasFSharpAttribute(cenv_1.g, cenv_1.g.attrib_LiteralAttribute, _arg1.data[0].Attribs) : false) ? !HasFSharpAttributeOpt(cenv_1.g, cenv_1.g.attrib_ThreadStaticAttribute, _arg1.data[0].Attribs) : false) ? !HasFSharpAttributeOpt(cenv_1.g, cenv_1.g.attrib_ContextStaticAttribute, _arg1.data[0].Attribs) : false) ? IsSimpleSyntacticConstantExpr(cenv_1.g, _arg1.data[1]) : false) ? IsCompiledAsStaticProperty(cenv_1.g, _arg1.data[0]) : false) {
    _arg1.data[0].SetIsCompiledAsStaticPropertyWithoutField();
  }

  try {
    if (_arg1.data[0].IsCompilerGenerated) {} else if (ValIsExplicitImpl(cenv_1.g, _arg1.data[0])) {} else {
      const matchValue = _arg1.data[0].DeclaringEntity;

      if (matchValue.tag === 0) {
        const tcref = _arg1.data[0].TopValDeclaringEntity;
        let hasDefaultAugmentation;

        if (tcref.IsUnionTycon) {
          const matchValue_1 = TryFindFSharpAttribute(cenv_1.g, cenv_1.g.attrib_DefaultAugmentationAttribute, tcref.Attribs);
          let $var39;

          if (matchValue_1 != null) {
            if (getValue(matchValue_1).data[2].tail != null) {
              const activePatternResult39457 = _AttribBoolArg___(getValue(matchValue_1).data[2].head);

              if (activePatternResult39457 != null) {
                if (getValue(matchValue_1).data[2].tail.tail == null) {
                  $var39 = [0, getValue(activePatternResult39457)];
                } else {
                  $var39 = [1];
                }
              } else {
                $var39 = [1];
              }
            } else {
              $var39 = [1];
            }
          } else {
            $var39 = [1];
          }

          switch ($var39[0]) {
            case 0:
              hasDefaultAugmentation = $var39[1];
              break;

            case 1:
              hasDefaultAugmentation = true;
              break;
          }
        } else {
          hasDefaultAugmentation = false;
        }

        const kind = _arg1.data[0].IsMember ? "member" : "value";

        const check = function (skipValCheck, nm) {
          if (((!skipValCheck ? _arg1.data[0].IsModuleBinding : false) ? tcref.ModuleOrNamespaceType.AllValsByLogicalName.has(nm) : false) ? !valEq(tcref.ModuleOrNamespaceType.AllValsByLogicalName.get(nm), _arg1.data[0]) : false) {
            error(new Duplicate(kind, _arg1.data[0].DisplayName, _arg1.data[0].Range));
          }

          if (tcref.IsUnionTycon) {
            if (nm === "Tag") {
              errorR(new NameClash(nm, kind, _arg1.data[0].DisplayName, _arg1.data[0].Range, SR.typeInfoGeneratedProperty(), "Tag", tcref.Range));
            } else if (nm === "Tags") {
              errorR(new NameClash(nm, kind, _arg1.data[0].DisplayName, _arg1.data[0].Range, SR.typeInfoGeneratedType(), "Tags", tcref.Range));
            } else if (hasDefaultAugmentation) {
              const matchValue_2 = tcref.GetUnionCaseByName(nm);

              if (matchValue_2 == null) {} else {
                error(new NameClash(nm, kind, _arg1.data[0].DisplayName, _arg1.data[0].Range, SR.typeInfoUnionCase(), getValue(matchValue_2).DisplayName, getValue(matchValue_2).Range));
              }

              let hasNoArgs;
              const matchValue_3 = _arg1.data[0].ValReprInfo;

              if (matchValue_3 != null) {
                if (sum(getValue(matchValue_3).AritiesOfArgs) - _arg1.data[0].NumObjArgs <= 0) {
                  hasNoArgs = getValue(matchValue_3).NumTypars === 0;
                } else {
                  hasNoArgs = false;
                }
              } else {
                hasNoArgs = false;
              }

              if (tcref.UnionCasesArray.length === 1 ? hasNoArgs : false) {
                const ucase1 = tcref.UnionCasesArray[0];
                const arr = ucase1.RecdFieldsArray;

                for (let idx = 0; idx <= arr.length - 1; idx++) {
                  const f = arr[idx];

                  if (f.Name === nm) {
                    error(new NameClash(nm, kind, _arg1.data[0].DisplayName, _arg1.data[0].Range, SR.typeInfoGeneratedProperty(), f.Name, ucase1.Range));
                  }
                }
              }
            }
          }

          if (nm.indexOf("New") === 0) {
            const matchValue_4 = tcref.GetUnionCaseByName(nm.slice("New".length, nm.length));

            if (matchValue_4 == null) {} else {
              error(new NameClash(nm, kind, _arg1.data[0].DisplayName, _arg1.data[0].Range, SR.chkUnionCaseCompiledForm(), getValue(matchValue_4).DisplayName, getValue(matchValue_4).Range));
            }
          }

          if (nm.indexOf("Is") === 0 ? hasDefaultAugmentation : false) {
            const matchValue_5 = tcref.GetUnionCaseByName(nm.slice("Is".length, nm.length));

            if (matchValue_5 == null) {} else {
              error(new NameClash(nm, kind, _arg1.data[0].DisplayName, _arg1.data[0].Range, SR.chkUnionCaseDefaultAugmentation(), getValue(matchValue_5).DisplayName, getValue(matchValue_5).Range));
            }
          }

          const matchValue_6 = tcref.GetFieldByName(nm);

          if (matchValue_6 == null) {} else {
            error(new NameClash(nm, kind, _arg1.data[0].DisplayName, _arg1.data[0].Range, "field", getValue(matchValue_6).Name, getValue(matchValue_6).Range));
          }
        };

        check(false, _arg1.data[0].CoreDisplayName);
        check(false, _arg1.data[0].DisplayName);
        check(false, _arg1.data[0].CompiledName);

        if (_arg1.data[0].IsExtensionMember) {
          iterate(function (v2) {
            if ((v2.IsExtensionMember ? !valEq(_arg1.data[0], v2) : false) ? _arg1.data[0].CompiledName === v2.CompiledName : false) {
              const minfo1 = new MethInfo(0, [cenv_1.g, generalizedTyconRef(tcref), mkLocalValRef(_arg1.data[0]), fromBits(0, 0, true)]);
              const minfo2 = new MethInfo(0, [cenv_1.g, generalizedTyconRef(tcref), mkLocalValRef(v2), fromBits(0, 0, true)]);

              if (tyconRefEq(cenv_1.g, _arg1.data[0].MemberApparentEntity, v2.MemberApparentEntity) ? MethInfosEquivByNameAndSig(new Erasure(0), true, cenv_1.g, cenv_1.amap, _arg1.data[0].Range, minfo1, minfo2) : false) {
                errorR(new Duplicate(kind, _arg1.data[0].DisplayName, _arg1.data[0].Range));
              }
            }
          }, tcref.ModuleOrNamespaceType.AllValsAndMembersByLogicalNameUncached.get(_arg1.data[0].LogicalName));
        }

        const matchValue_7 = _arg1.data[0].ValReprInfo;
        const $var40 = matchValue_7 != null ? (getValue(matchValue_7).NumCurriedArgs === 0 ? getValue(matchValue_7).NumTypars === 0 : false) ? [0, getValue(matchValue_7)] : [1] : [1];

        switch ($var40[0]) {
          case 0:
            check(false, "get_" + _arg1.data[0].DisplayName);
            break;

          case 1:
            break;
        }

        const matchValue_8 = _arg1.data[0].ValReprInfo;
        const $var41 = matchValue_8 != null ? ((_arg1.data[0].IsMutable ? getValue(matchValue_8).NumCurriedArgs === 0 : false) ? getValue(matchValue_8).NumTypars === 0 : false) ? [0, getValue(matchValue_8)] : [1] : [1];

        switch ($var41[0]) {
          case 0:
            check(false, "set_" + _arg1.data[0].DisplayName);
            break;

          case 1:
            break;
        }

        const matchValue_9 = TryChopPropertyName(_arg1.data[0].DisplayName);

        if (matchValue_9 == null) {} else {
          check(true, getValue(matchValue_9));
        }
      }
    }
  } catch (e) {
    errorRecovery(e, _arg1.data[0].Range);
  }

  CheckBinding(cenv_1, env_1, true, _arg1);
}
export function CheckModuleBindings(cenv_1, env_1, binds) {
  iterate(function (arg20_) {
    CheckModuleBinding(cenv_1, env_1, arg20_);
  }, binds);
}
export function CheckRecdField(isUnion, cenv_1, env_1, tycon, rfield) {
  const isHidden = (IsHiddenTycon(env_1.sigToImplRemapInfo, tycon) ? true : IsHiddenTyconRepr(env_1.sigToImplRemapInfo, tycon)) ? true : !isUnion ? IsHiddenRecdField(env_1.sigToImplRemapInfo, mkLocalTyconRef(tycon).MakeNestedRecdFieldRef(rfield)) : false;
  const access = AdjustAccess(isHidden, function () {
    return tycon.CompilationPath;
  }, rfield.Accessibility);
  CheckTypeForAccess(cenv_1, env_1, function () {
    return rfield.Name;
  }, access, rfield.Range, rfield.FormalType);
  CheckTypeNoByrefs(cenv_1, env_1, rfield.Range, rfield.FormalType);
  CheckAttribs(cenv_1, env_1, rfield.PropertyAttribs);
  CheckAttribs(cenv_1, env_1, rfield.FieldAttribs);

  if (cenv_1.reportErrors) {
    CheckForByrefLikeType(cenv_1, env_1, rfield.FormalType, function () {
      errorR(new _Error(SR.chkCantStoreByrefValue(), tycon.Range));
    });
  }
}
export function CheckEntityDefn(cenv_1, env_1, tycon) {
  var setterArgs;
  var getterArgs;
  var nargs;
  let env_2;
  const reflect = env_1.reflect ? true : HasFSharpAttribute(cenv_1.g, cenv_1.g.attrib_ReflectedDefinitionAttribute, tycon.Attribs);
  env_2 = new env(env_1.boundTyparNames, env_1.boundTypars, env_1.argVals, env_1.sigToImplRemapInfo, env_1.limited, env_1.quote, reflect, env_1.external);
  const m = tycon.Range;
  const env_3 = BindTypars(cenv_1.g, env_2, tycon.Typars(m));
  CheckAttribs(cenv_1, env_3, tycon.Attribs);
  const matchValue = tycon.TypeAbbrev;

  if (matchValue != null) {
    WarnOnWrongTypeForAccess(cenv_1, env_3, function () {
      return tycon.CompiledName;
    }, tycon.Accessibility, tycon.Range, getValue(matchValue));
  }

  if (cenv_1.reportErrors) {
    if (!tycon.IsTypeAbbrev) {
      const typ = generalizedTyconRef(mkLocalTyconRef(tycon));
      let allVirtualMethsInParent;
      const matchValue_1 = GetSuperTypeOfType(cenv_1.g, cenv_1.amap, m, typ);

      if (matchValue_1 == null) {
        allVirtualMethsInParent = new List();
      } else {
        allVirtualMethsInParent = filter(function (minfo) {
          return minfo.IsVirtual;
        }, GetIntrinsicMethInfosOfType(cenv_1.infoReader, null, new AccessorDomain(3), new AllowMultiIntfInstantiations(0), new FindMemberFlag(0), m, getValue(matchValue_1)));
      }

      const namesOfMethodsThatMayDifferOnlyInReturnType = ofArray(["op_Explicit", "op_Implicit"]);

      const methodUniquenessIncludesReturnType = function (minfo_1) {
        return exists($var42 => equals(minfo_1.LogicalName, $var42), namesOfMethodsThatMayDifferOnlyInReturnType);
      };

      const MethInfosEquivWrtUniqueness = function (eraseFlag, m_1, minfo_2, minfo2) {
        if (methodUniquenessIncludesReturnType(minfo_2)) {
          return MethInfosEquivByNameAndSig(eraseFlag, true, cenv_1.g, cenv_1.amap, m_1, minfo_2, minfo2);
        } else {
          return MethInfosEquivByNameAndPartialSig(eraseFlag, true, cenv_1.g, cenv_1.amap, m_1, minfo_2, minfo2);
        }
      };

      const immediateMeths = toList(delay(function () {
        return append(map_1(function (v) {
          return new MethInfo(0, [cenv_1.g, typ, v, null]);
        }, tycon.AllGeneratedValues), delay(function () {
          return GetImmediateIntrinsicMethInfosOfType(null, new AccessorDomain(3), cenv_1.g, cenv_1.amap, m, typ);
        }));
      }));
      const immediateProps = GetImmediateIntrinsicPropInfosOfType(null, new AccessorDomain(3), cenv_1.g, cenv_1.amap, m, typ);

      const getHash = function (hash, nm) {
        if (hash.has(nm)) {
          return hash.get(nm);
        } else {
          return new List();
        }
      };

      let hashOfImmediateMeths;
      const h = new Map();

      for (let minfo_3 of immediateMeths) {
        const matchValue_2 = tryGetValue(h, minfo_3.LogicalName, null);

        if (matchValue_2[0]) {
          h.set(minfo_3.LogicalName, new List(minfo_3, matchValue_2[1]));
        } else {
          h.set(minfo_3.LogicalName, ofArray([minfo_3]));
        }
      }

      hashOfImmediateMeths = h;

      const getOtherMethods = function (minfo_4) {
        return toList(delay(function () {
          const methods = hashOfImmediateMeths.get(minfo_4.LogicalName);
          return collect(function (m_2) {
            return !(m_2 === minfo_4) ? singleton(m_2) : empty();
          }, methods);
        }));
      };

      const hashOfImmediateProps = new Map();

      for (let minfo_5 of immediateMeths) {
        const nm_1 = minfo_5.LogicalName;
        let m_3;
        const matchValue_3 = minfo_5.ArbitraryValRef;

        if (matchValue_3 != null) {
          m_3 = getValue(matchValue_3).DefinitionRange;
        } else {
          m_3 = m;
        }

        const others = getOtherMethods(minfo_5);

        const IsAbstractDefaultPair = function (x, y) {
          if (x.IsDispatchSlot) {
            return y.IsDefiniteFSharpOverride;
          } else {
            return false;
          }
        };

        const IsAbstractDefaultPair2 = function (minfo_6, minfo2_1) {
          if (IsAbstractDefaultPair(minfo_6, minfo2_1)) {
            return true;
          } else {
            return IsAbstractDefaultPair(minfo2_1, minfo_6);
          }
        };

        const checkForDup = function (erasureFlag, minfo2_2) {
          if (!IsAbstractDefaultPair2(minfo_5, minfo2_2) ? minfo_5.IsInstance === minfo2_2.IsInstance : false) {
            return MethInfosEquivWrtUniqueness(erasureFlag, m_3, minfo_5, minfo2_2);
          } else {
            return false;
          }
        };

        if (exists(CurriedLambda(checkForDup)(new Erasure(0)), others)) {
          if (exists(CurriedLambda(checkForDup)(new Erasure(2)), others)) {
            errorR(new _Error(SR.chkDuplicateMethod(nm_1, minimalStringOfType(cenv_1.denv, typ)), m_3));
          } else {
            errorR(new _Error(SR.chkDuplicateMethodWithSuffix(nm_1, minimalStringOfType(cenv_1.denv, typ)), m_3));
          }
        }

        const numCurriedArgSets = minfo_5.NumArgs.length | 0;

        if (numCurriedArgSets > 1 ? exists(function (minfo2_3) {
          return !IsAbstractDefaultPair2(minfo_5, minfo2_3);
        }, others) : false) {
          errorR(new _Error(SR.chkDuplicateMethodCurried(nm_1, minimalStringOfType(cenv_1.denv, typ)), m_3));
        }

        if (numCurriedArgSets > 1 ? List_1.existsSquared(function (_arg1) {
          return ((((_arg1.data[0] ? true : _arg1.data[1]) ? true : _arg1.data[5].AutoQuote) ? true : _arg1.data[2].IsOptional) ? true : !_arg1.data[3].Equals(new CallerInfoInfo(0))) ? true : isByrefTy(cenv_1.g, _arg1.data[6]);
        }, minfo_5.GetParamDatas(cenv_1.amap, m_3, minfo_5.FormalMethodInst)) : false) {
          errorR(new _Error(SR.chkCurriedMethodsCantHaveOutParams(), m_3));
        }

        if (numCurriedArgSets === 1) {
          List_1.iterSquared(function (_arg2) {
            const matchValue_4 = [_arg2.data[2], _arg2.data[3]];
            const $var43 = matchValue_4[1].tag === 1 ? matchValue_4[0].tag === 2 ? [2] : matchValue_4[0].tag === 1 ? [3] : [1] : matchValue_4[1].tag === 3 ? matchValue_4[0].tag === 2 ? [4] : matchValue_4[0].tag === 1 ? [5] : [1] : matchValue_4[1].tag === 2 ? matchValue_4[0].tag === 2 ? [6] : matchValue_4[0].tag === 1 ? [7] : [1] : [0];

            switch ($var43[0]) {
              case 0:
                break;

              case 1:
                errorR(new _Error(SR.tcCallerInfoNotOptional(toString(_arg2.data[3])), m_3));
                break;

              case 2:
                if (!typeEquiv(cenv_1.g, cenv_1.g.int32_ty, _arg2.data[6])) {
                  errorR(new _Error(SR.tcCallerInfoWrongType(toString(_arg2.data[3]), "int", minimalStringOfType(cenv_1.denv, _arg2.data[6])), m_3));
                }

                break;

              case 3:
                if (!(isOptionTy(cenv_1.g, _arg2.data[6]) ? typeEquiv(cenv_1.g, cenv_1.g.int32_ty, destOptionTy(cenv_1.g, _arg2.data[6])) : false)) {
                  errorR(new _Error(SR.tcCallerInfoWrongType(toString(_arg2.data[3]), "int", minimalStringOfType(cenv_1.denv, destOptionTy(cenv_1.g, _arg2.data[6]))), m_3));
                }

                break;

              case 4:
                if (!typeEquiv(cenv_1.g, cenv_1.g.string_ty, _arg2.data[6])) {
                  errorR(new _Error(SR.tcCallerInfoWrongType(toString(_arg2.data[3]), "string", minimalStringOfType(cenv_1.denv, _arg2.data[6])), m_3));
                }

                break;

              case 5:
                if (!(isOptionTy(cenv_1.g, _arg2.data[6]) ? typeEquiv(cenv_1.g, cenv_1.g.string_ty, destOptionTy(cenv_1.g, _arg2.data[6])) : false)) {
                  errorR(new _Error(SR.tcCallerInfoWrongType(toString(_arg2.data[3]), "string", minimalStringOfType(cenv_1.denv, destOptionTy(cenv_1.g, _arg2.data[6]))), m_3));
                }

                break;

              case 6:
                if (!typeEquiv(cenv_1.g, cenv_1.g.string_ty, _arg2.data[6])) {
                  errorR(new _Error(SR.tcCallerInfoWrongType(toString(_arg2.data[3]), "string", minimalStringOfType(cenv_1.denv, _arg2.data[6])), m_3));
                }

                break;

              case 7:
                if (!(isOptionTy(cenv_1.g, _arg2.data[6]) ? typeEquiv(cenv_1.g, cenv_1.g.string_ty, destOptionTy(cenv_1.g, _arg2.data[6])) : false)) {
                  errorR(new _Error(SR.tcCallerInfoWrongType(toString(_arg2.data[3]), "string", minimalStringOfType(cenv_1.denv, destOptionTy(cenv_1.g, _arg2.data[6]))), m_3));
                }

                break;
            }
          }, minfo_5.GetParamDatas(cenv_1.amap, m_3, minfo_5.FormalMethodInst));
        }
      }

      for (let pinfo of immediateProps) {
        const nm_2 = pinfo.PropertyName;
        let m_4;
        const matchValue_5 = pinfo.ArbitraryValRef;

        if (matchValue_5 != null) {
          m_4 = getValue(matchValue_5).DefinitionRange;
        } else {
          m_4 = m;
        }

        if (hashOfImmediateMeths.has(nm_2)) {
          errorR(new _Error(SR.chkPropertySameNameMethod(nm_2, minimalStringOfType(cenv_1.denv, typ)), m_4));
        }

        const others_1 = getHash(hashOfImmediateProps, nm_2);

        if ((pinfo.HasGetter ? pinfo.HasSetter : false) ? pinfo.GetterMethod.IsVirtual !== pinfo.SetterMethod.IsVirtual : false) {
          errorR(new _Error(SR.chkGetterSetterDoNotMatchAbstract(nm_2, minimalStringOfType(cenv_1.denv, typ)), m_4));
        }

        const checkForDup_1 = function (erasureFlag_1, pinfo2) {
          const IsAbstractDefaultPair_1 = function (x_1, y_1) {
            if (x_1.IsDispatchSlot) {
              return y_1.IsDefiniteFSharpOverride;
            } else {
              return false;
            }
          };

          if (!(IsAbstractDefaultPair_1(pinfo, pinfo2) ? true : IsAbstractDefaultPair_1(pinfo2, pinfo))) {
            return PropInfosEquivByNameAndPartialSig(erasureFlag_1, cenv_1.g, cenv_1.amap, m_4, pinfo, pinfo2);
          } else {
            return false;
          }
        };

        if (exists(CurriedLambda(checkForDup_1)(new Erasure(0)), others_1)) {
          if (exists(CurriedLambda(checkForDup_1)(new Erasure(2)), others_1)) {
            errorR(new _Error(SR.chkDuplicateProperty(nm_2, minimalStringOfType(cenv_1.denv, typ)), m_4));
          } else {
            errorR(new _Error(SR.chkDuplicatePropertyWithSuffix(nm_2, minimalStringOfType(cenv_1.denv, typ)), m_4));
          }
        }

        if (((pinfo.HasGetter ? pinfo.HasSetter : false) ? (setterArgs = pinfo.DropGetter.GetParamTypes(cenv_1.amap, m_4), getterArgs = pinfo.DropSetter.GetParamTypes(cenv_1.amap, m_4), setterArgs.length !== getterArgs.length) : false) ? true : (nargs = pinfo.GetParamTypes(cenv_1.amap, m_4).length | 0, exists(function (pinfo2_1) {
          return pinfo2_1.GetParamTypes(cenv_1.amap, m_4).tail == null !== (nargs === 0);
        }, others_1))) {
          errorR(new _Error(SR.chkPropertySameNameIndexer(nm_2, minimalStringOfType(cenv_1.denv, typ)), m_4));
        }

        if ((pinfo.HasGetter ? pinfo.HasSetter : false) ? !pinfo.IsIndexer : false) {
          const ty1 = pinfo.DropSetter.GetPropertyType(cenv_1.amap, m_4);
          const ty2 = pinfo.DropGetter.GetPropertyType(cenv_1.amap, m_4);

          if (!typeEquivAux(new Erasure(2), cenv_1.amap.g, ty1, ty2)) {
            errorR(new _Error(SR.chkGetterAndSetterHaveSamePropertyType(pinfo.PropertyName, minimalStringOfType(cenv_1.denv, ty1), minimalStringOfType(cenv_1.denv, ty2)), m_4));
          }
        }

        hashOfImmediateProps.set(nm_2, new List(pinfo, others_1));
      }

      if (!isInterfaceTy(cenv_1.g, typ)) {
        const hashOfAllVirtualMethsInParent = new Map();

        for (let minfo_7 of allVirtualMethsInParent) {
          const nm_3 = minfo_7.LogicalName;
          const others_2 = getHash(hashOfAllVirtualMethsInParent, nm_3);
          hashOfAllVirtualMethsInParent.set(nm_3, new List(minfo_7, others_2));
        }

        for (let minfo_8 of immediateMeths) {
          if ((!minfo_8.IsDispatchSlot ? !minfo_8.IsVirtual : false) ? minfo_8.IsInstance : false) {
            const nm_4 = minfo_8.LogicalName;
            let m_5;
            const matchValue_6 = minfo_8.ArbitraryValRef;

            if (matchValue_6 != null) {
              m_5 = getValue(matchValue_6).DefinitionRange;
            } else {
              m_5 = m;
            }

            const parentMethsOfSameName = getHash(hashOfAllVirtualMethsInParent, nm_4);

            const checkForDup_2 = function (erasureFlag_2, minfo2_4) {
              if (minfo2_4.IsDispatchSlot) {
                return MethInfosEquivByNameAndSig(erasureFlag_2, true, cenv_1.g, cenv_1.amap, m_5, minfo_8, minfo2_4);
              } else {
                return false;
              }
            };

            const matchValue_7 = tryFind_1(CurriedLambda(checkForDup_2)(new Erasure(0)), parentMethsOfSameName);

            if (matchValue_7 != null) {
              const mtext = stringOfMethInfo(cenv_1.amap, m_5, cenv_1.denv, getValue(matchValue_7));

              if (exists(CurriedLambda(checkForDup_2)(new Erasure(2)), parentMethsOfSameName)) {
                warning(new _Error(SR.tcNewMemberHidesAbstractMember(mtext), m_5));
              } else {
                warning(new _Error(SR.tcNewMemberHidesAbstractMemberWithSuffix(mtext), m_5));
              }
            }
          }

          if (minfo_8.IsDispatchSlot) {
            const nm_5 = minfo_8.LogicalName;
            let m_6;
            const matchValue_8 = minfo_8.ArbitraryValRef;

            if (matchValue_8 != null) {
              m_6 = getValue(matchValue_8).DefinitionRange;
            } else {
              m_6 = m;
            }

            const parentMethsOfSameName_1 = getHash(hashOfAllVirtualMethsInParent, nm_5);

            const checkForDup_3 = function (erasureFlag_3, minfo2_5) {
              return MethInfosEquivByNameAndSig(erasureFlag_3, true, cenv_1.g, cenv_1.amap, m_6, minfo_8, minfo2_5);
            };

            if (exists(CurriedLambda(checkForDup_3)(new Erasure(0)), parentMethsOfSameName_1)) {
              if (exists(CurriedLambda(checkForDup_3)(new Erasure(2)), parentMethsOfSameName_1)) {
                errorR(new _Error(SR.chkDuplicateMethodInheritedType(nm_5), m_6));
              } else {
                errorR(new _Error(SR.chkDuplicateMethodInheritedTypeWithSuffix(nm_5), m_6));
              }
            }
          }
        }
      }
    }
  }

  tycon.AllFieldsArray.forEach(function (rfield) {
    CheckRecdField(false, cenv_1, env_3, tycon, rfield);
  });
  iterate($var44 => function (ty) {
    CheckTypePermitByrefs(cenv_1, env_3, m, ty);
  }(function (v_1) {
    return typeOfVal(v_1);
  }($var44)), abstractSlotValsOfTycons(ofArray([tycon])));
  iterate(function (ty_1) {
    CheckTypePermitByrefs(cenv_1, env_3, m, ty_1);
  }, tycon.ImmediateInterfaceTypesOfFSharpTycon);

  (function (ty_2) {
    CheckTypeNoByrefs(cenv_1, env_3, m, ty_2);
  })(superOfTycon(cenv_1.g, tycon));

  if (tycon.IsUnionTycon) {
    iterate(function (uc) {
      CheckAttribs(cenv_1, env_3, uc.Attribs);
      iterate(function (rfield_1) {
        CheckRecdField(true, cenv_1, env_3, tycon, rfield_1);
      }, uc.RecdFields);
    }, tycon.UnionCasesAsList);
  }

  const access = AdjustAccess(IsHiddenTycon(env_3.sigToImplRemapInfo, tycon), function () {
    return tycon.CompilationPath;
  }, tycon.Accessibility);

  const visitType = function (ty_3) {
    CheckTypeForAccess(cenv_1, env_3, function () {
      return tycon.DisplayNameWithStaticParametersAndUnderscoreTypars;
    }, access, tycon.Range, ty_3);
  };

  iterate($var45 => visitType(function (v_2) {
    return typeOfVal(v_2);
  }($var45)), abstractSlotValsOfTycons(ofArray([tycon])));
  visitType(superOfTycon(cenv_1.g, tycon));

  if (tycon.IsFSharpDelegateTycon) {
    const matchValue_9 = tycon.TypeReprInfo;

    if (matchValue_9.tag === 0) {
      if (matchValue_9.data.fsobjmodel_kind.tag === 3) {
        (function (option) {
          iterate(visitType, defaultArg(option, [], $var46 => [$var46]));
        })(matchValue_9.data.fsobjmodel_kind.data.FormalReturnType);

        List_1.iterSquared(function (_arg3) {
          visitType(_arg3.data[1]);
        }, matchValue_9.data.fsobjmodel_kind.data.FormalParams);
      }
    }
  }

  const interfaces = filter(function (arg10_) {
    return isInterfaceTy(cenv_1.g, arg10_);
  }, AllSuperTypesOfType(cenv_1.g, cenv_1.amap, tycon.Range, new AllowMultiIntfInstantiations(0), generalizedTyconRef(mkLocalTyconRef(tycon))));

  if (tycon.IsFSharpInterfaceTycon) {
    iterate(visitType, interfaces);
  }

  if (cenv_1.reportErrors) {
    if (!tycon.IsTypeAbbrev) {
      const typ_1 = generalizedTyconRef(mkLocalTyconRef(tycon));
      const immediateInterfaces = GetImmediateInterfacesOfType(new SkipUnrefInterfaces(0), cenv_1.g, cenv_1.amap, m, typ_1);
      const interfaces_1 = toList(delay(function () {
        return collect(function (ty_4) {
          return AllSuperTypesOfType(cenv_1.g, cenv_1.amap, m, new AllowMultiIntfInstantiations(0), ty_4);
        }, immediateInterfaces);
      }));
      CheckMultipleInterfaceInstantiations(cenv_1, interfaces_1, m);
    }

    if (tycon.IsStructOrEnumTycon) {
      const inputSequence = tycon.AllInstanceFieldsAsList;

      for (let f of inputSequence) {
        const zeroInitUnsafe = TryFindFSharpBoolAttribute(cenv_1.g, cenv_1.g.attrib_DefaultValueAttribute, f.FieldAttribs);

        if (equals(zeroInitUnsafe, true)) {
          const ty_ = generalizedTyconRef(mkLocalTyconRef(tycon));

          if (!TypeHasDefaultValue(cenv_1.g, m, ty_)) {
            errorR(new _Error(SR.chkValueWithDefaultValueMustHaveDefaultValue(), m));
          }
        }
      }
    }

    const matchValue_10 = tycon.TypeAbbrev;

    if (matchValue_10 != null) {
      CheckForByrefLikeType(cenv_1, env_3, getValue(matchValue_10), function () {
        errorR(new _Error(SR.chkNoByrefInTypeAbbrev(), tycon.Range));
      });
    }
  }
}
export function CheckEntityDefns(cenv_1, env_1, tycons) {
  iterate(function (tycon) {
    CheckEntityDefn(cenv_1, env_1, tycon);
  }, tycons);
}
export function CheckModuleExpr(cenv_1, env_1, x) {
  const patternInput = ComputeRemappingFromImplementationToSignature(cenv_1.g, x.data[1], x.data[0]);
  let env_2;
  const sigToImplRemapInfo = new List([mkRepackageRemapping(patternInput[0]), patternInput[1]], env_1.sigToImplRemapInfo);
  env_2 = new env(env_1.boundTyparNames, env_1.boundTypars, env_1.argVals, sigToImplRemapInfo, env_1.limited, env_1.quote, env_1.reflect, env_1.external);
  CheckDefnInModule(cenv_1, env_2, x.data[1]);
}
export function CheckDefnsInModule(cenv_1, env_1, x) {
  iterate(function (x_1) {
    CheckDefnInModule(cenv_1, env_1, x_1);
  }, x);
}
export function CheckNothingAfterEntryPoint(cenv_1, m) {
  if (cenv_1.entryPointGiven ? cenv_1.reportErrors : false) {
    errorR(new _Error(SR.chkEntryPointUsage(), m));
  }
}
export function CheckDefnInModule(cenv_1, env_1, x) {
  switch (x.tag) {
    case 2:
      CheckNothingAfterEntryPoint(cenv_1, x.data[1]);
      CheckModuleBinding(cenv_1, env_1, x.data[0]);
      BindVal(cenv_1, env_1, x.data[0].Var);
      break;

    case 3:
      CheckNothingAfterEntryPoint(cenv_1, x.data[1]);
      CheckNoReraise(cenv_1, null, x.data[0]);
      CheckExprNoByrefs(cenv_1, env_1, x.data[0]);
      break;

    case 0:
      CheckModuleExpr(cenv_1, env_1, x.data);
      break;

    case 1:
      CheckDefnsInModule(cenv_1, env_1, x.data);
      break;

    default:
      CheckNothingAfterEntryPoint(cenv_1, x.data[3]);

      if (x.data[0]) {
        BindVals(cenv_1, env_1, toList(allValsOfModDef(x)));
      }

      CheckEntityDefns(cenv_1, env_1, x.data[1]);
      iterate(function (x_1) {
        CheckModuleSpec(cenv_1, env_1, x_1);
      }, x.data[2]);
  }
}
export function CheckModuleSpec(cenv_1, env_1, x) {
  if (x.tag === 1) {
    CheckEntityDefn(cenv_1, env_1, x.data[0]);
    let env_2;
    const reflect = env_1.reflect ? true : HasFSharpAttribute(cenv_1.g, cenv_1.g.attrib_ReflectedDefinitionAttribute, x.data[0].Attribs);
    env_2 = new env(env_1.boundTyparNames, env_1.boundTypars, env_1.argVals, env_1.sigToImplRemapInfo, env_1.limited, env_1.quote, reflect, env_1.external);
    CheckDefnInModule(cenv_1, env_2, x.data[1]);
  } else {
    BindVals(cenv_1, env_1, valsOfBinds(ofArray([x.data])));
    CheckModuleBinding(cenv_1, env_1, x.data);
  }
}
export function CheckTopImpl(g, amap, reportErrors, infoReader, internalsVisibleToPaths, viewCcu, denv, mexpr, extraAttribs, isLastCompiland) {
  let cenv_1;
  const boundVals = create(null, fromEqualityComparer({
    GetHashCode(x) {
      return function (obj) {
        return hash_1(obj);
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

  }));
  const potentialUnboundUsesOfVals = create(null, new Comparer((x, y) => x.CompareTo(y)));
  cenv_1 = new cenv(boundVals, potentialUnboundUsesOfVals, g, amap, infoReader, internalsVisibleToPaths, denv, viewCcu, reportErrors, isLastCompiland, false, false);
  cenv_1.g.system_Void_tcref.TryDeref;
  cenv_1.g.byref_tcr.TryDeref;

  const resolve = function (_arg1) {
    if (_arg1 != null) {
      getValue(_arg1).TryDeref;
    }
  };

  resolve(cenv_1.g.system_TypedReference_tcref);
  resolve(cenv_1.g.system_ArgIterator_tcref);
  resolve(cenv_1.g.system_RuntimeArgumentHandle_tcref);
  let env_1;
  const sigToImplRemapInfo = new List();
  const boundTyparNames = new List();
  const argVals = ValMap.Empty;
  env_1 = new env(boundTyparNames, TyparMap.Empty, argVals, sigToImplRemapInfo, false, false, false, false);
  CheckModuleExpr(cenv_1, env_1, mexpr);
  CheckAttribs(cenv_1, env_1, extraAttribs);

  if (cenv_1.usesQuotations ? QuotationGenerationScope.ComputeQuotationFormat(cenv_1.g).Equals(new QuotationSerializationFormat(1)) : false) {
    viewCcu.UsesFSharp20PlusQuotations = true;
  }

  return cenv_1.entryPointGiven;
}