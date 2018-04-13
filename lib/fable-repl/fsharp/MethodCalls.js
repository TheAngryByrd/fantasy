import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { ObjExprMethod, ValReprInfoModule, ValReprInfo, arityOfVal, ValUseFlag, TOp, Expr, ValBaseOrThisInfo, Typar, TType } from "./tast";
import { range } from "./range";
import { makeGeneric, Option, Tuple, GenericParam } from "../fable-core/Util";
import { nonStandardEventError, AllowMultiIntfInstantiations, RecdFieldInfo, ILFieldInfo, MethInfo, PropInfo, ReflectedArgInfo, CallerInfoInfo, OptionalArgInfo } from "./infos";
import { Ident } from "./ast";
import { mapIndexed, concat, replicate, append, collect, map, choose, filter, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { mkObjExpr, mkRefTupledVars, isObjTy, exprForVal, mkCompGenLocal, TypeHasDefaultValue, mkDefault, instType, mkTyAppExpr, argsOfAppTy, mkApps, mkRefTupled, DebugPrint, rangeOfFunTy, mkUnit, domainOfFunTy, isStructTy, mkCoerceExpr, mkExprAddrOfExpr, typeEquiv, isClassTy, tyOfExpr, destArrayTy, mkTyparInst, isArray1DTy, destOptionTy, isOptionTy, destQuotedExprTy, isQuotedExprTy, destLinqExpressionTy, isLinqExpressionTy, isFunTy, isDelegateTy, stripFunTy, destByrefTy, mkRefCellTy, isByrefTy } from "./TastOps";
import { ExcludeHiddenOfPropInfos, FindMemberFlag, GetIntrinsicPropInfoSetsOfType, InfoReader, GetSigOfFunctionForDelegate } from "./InfoReader";
import { IsMethInfoAccessible, AccessorDomain } from "./AccessibilityLogic";
import { String as _String, List as List_1 } from "../absil/illib";
import { ImportMap } from "./import";
import { mapFold, sumBy, exists, tryPick, last, forAll, map2, toList } from "../fable-core/Seq";
import { getValue } from "../fable-core/Option";
import Choice from "../fable-core/Choice";
import { ExtensionPropInfosOfTypeInScope } from "./NameResolution";
import { List as List_2 } from "./lib";
import { warning, InternalError, error, Error as _Error, errorR } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import CurriedLambda from "../fable-core/CurriedLambda";
import { IteratedAdjustArityOfLambda, tryDestTopLambda, TypeDefinitelySubsumesTypeNoCoercion } from "./TypeRelations";
import { mkILCtorMethSpecForTy, ILType } from "../absil/il";
import { printf, toText } from "../fable-core/String";
import { TaggedTextOps, rightL, sepListL, showL } from "./layout";
export class CallerArg {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.CallerArg",
      interfaces: ["FSharpUnion"],
      cases: [["CallerArg", TType, range, "boolean", GenericParam("T")]]
    };
  }

  get Type() {
    return this.data[0];
  }

  get Range() {
    return this.data[1];
  }

  get IsOptional() {
    return this.data[2];
  }

  get Expr() {
    return this.data[3];
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.CallerArg", CallerArg);
export class CalledArg {
  constructor(position, isParamArray, optArgInfo, callerInfoInfo, isOutArg, reflArgInfo, nameOpt, calledArgumentType) {
    this.Position = position;
    this.IsParamArray = isParamArray;
    this.OptArgInfo = optArgInfo;
    this.CallerInfoInfo = callerInfoInfo;
    this.IsOutArg = isOutArg;
    this.ReflArgInfo = reflArgInfo;
    this.NameOpt = nameOpt;
    this.CalledArgumentType = calledArgumentType;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.CalledArg",
      interfaces: ["FSharpRecord"],
      properties: {
        Position: Tuple(["number", "number"]),
        IsParamArray: "boolean",
        OptArgInfo: OptionalArgInfo,
        CallerInfoInfo: CallerInfoInfo,
        IsOutArg: "boolean",
        ReflArgInfo: ReflectedArgInfo,
        NameOpt: Option(Ident),
        CalledArgumentType: TType
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.CalledArg", CalledArg);
export function GetCalledArg(pos, isParamArray, optArgInfo, callerInfoInfo, isOutArg, nameOpt, reflArgInfo, calledArgTy) {
  return new CalledArg(pos, isParamArray, optArgInfo, callerInfoInfo, isOutArg, reflArgInfo, nameOpt, calledArgTy);
}
export class AssignedCalledArg {
  constructor(namedArgIdOpt, calledArg, callerArg) {
    this.NamedArgIdOpt = namedArgIdOpt;
    this.CalledArg = calledArg;
    this.CallerArg = callerArg;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.AssignedCalledArg",
      interfaces: ["FSharpRecord"],
      properties: {
        NamedArgIdOpt: Option(Ident),
        CalledArg: CalledArg,
        CallerArg: makeGeneric(CallerArg, {
          T: GenericParam("T")
        })
      }
    };
  }

  get Position() {
    return this.CalledArg.Position;
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.AssignedCalledArg", AssignedCalledArg);
export class AssignedItemSetterTarget {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.AssignedItemSetterTarget",
      interfaces: ["FSharpUnion"],
      cases: [["AssignedPropSetter", PropInfo, MethInfo, makeGeneric(List, {
        T: TType
      })], ["AssignedILFieldSetter", ILFieldInfo], ["AssignedRecdFieldSetter", RecdFieldInfo]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.AssignedItemSetterTarget", AssignedItemSetterTarget);
export class AssignedItemSetter {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.AssignedItemSetter",
      interfaces: ["FSharpUnion"],
      cases: [["AssignedItemSetter", Ident, AssignedItemSetterTarget, makeGeneric(CallerArg, {
        T: GenericParam("T")
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.AssignedItemSetter", AssignedItemSetter);
export class CallerNamedArg {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.CallerNamedArg",
      interfaces: ["FSharpUnion"],
      cases: [["CallerNamedArg", Ident, makeGeneric(CallerArg, {
        T: GenericParam("T")
      })]]
    };
  }

  get Ident() {
    return this.data[0];
  }

  get Name() {
    let copyOfStruct = this.Ident;
    return copyOfStruct.idText;
  }

  get CallerArg() {
    return this.data[1];
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.CallerNamedArg", CallerNamedArg);
export function AdjustCalledArgType(infoReader, isConstraint, calledArg, callerArg) {
  const g = infoReader.g;
  const callerArgTy = callerArg.Type;
  const m = callerArg.Range;

  if (isConstraint) {
    return calledArg.CalledArgumentType;
  } else if (isByrefTy(g, calledArg.CalledArgumentType)) {
    if (isByrefTy(g, callerArgTy)) {
      return calledArg.CalledArgumentType;
    } else {
      return mkRefCellTy(g, destByrefTy(g, calledArg.CalledArgumentType));
    }
  } else {
    let calledArgTy_1;

    const adjustDelegateTy = function (calledTy) {
      const patternInput = GetSigOfFunctionForDelegate(infoReader, calledTy, m, new AccessorDomain(3));
      const delArgTys = patternInput.data[1].tail == null ? ofArray([g.unit_ty]) : patternInput.data[1];

      if (stripFunTy(g, callerArgTy)[0].length === delArgTys.length) {
        return patternInput.data[3];
      } else {
        return calledArg.CalledArgumentType;
      }
    };

    if (isDelegateTy(g, calledArg.CalledArgumentType) ? isFunTy(g, callerArgTy) : false) {
      calledArgTy_1 = adjustDelegateTy(calledArg.CalledArgumentType);
    } else if (isLinqExpressionTy(g, calledArg.CalledArgumentType) ? isFunTy(g, callerArgTy) : false) {
      const calledArgTy = destLinqExpressionTy(g, calledArg.CalledArgumentType);

      if (isDelegateTy(g, calledArgTy)) {
        calledArgTy_1 = adjustDelegateTy(calledArgTy);
      } else {
        calledArgTy_1 = calledArg.CalledArgumentType;
      }
    } else if ((calledArg.ReflArgInfo.AutoQuote ? isQuotedExprTy(g, calledArg.CalledArgumentType) : false) ? !isQuotedExprTy(g, callerArgTy) : false) {
      calledArgTy_1 = destQuotedExprTy(g, calledArg.CalledArgumentType);
    } else {
      calledArgTy_1 = calledArg.CalledArgumentType;
    }

    let calledArgTy_2;
    const $var1 = calledArg.OptArgInfo.tag === 0 ? [0] : calledArg.OptArgInfo.tag === 1 ? (!callerArg.IsOptional ? isOptionTy(g, calledArgTy_1) : false) ? [1] : [2] : [2];

    switch ($var1[0]) {
      case 0:
        calledArgTy_2 = calledArgTy_1;
        break;

      case 1:
        calledArgTy_2 = destOptionTy(g, calledArgTy_1);
        break;

      case 2:
        const $var2 = calledArg.OptArgInfo.tag === 1 ? [0] : calledArg.OptArgInfo.tag === 2 ? [0] : [1];

        switch ($var2[0]) {
          case 0:
            calledArgTy_2 = calledArgTy_1;
            break;

          case 1:
            throw new Error("C:/projects/fcs/src/fsharp/MethodCalls.fs", 165, 18);
            break;
        }

        break;
    }

    return calledArgTy_2;
  }
}
export class CalledMethArgSet {
  constructor(unnamedCalledArgs, unnamedCallerArgs, paramArrayCalledArgOpt, paramArrayCallerArgs, assignedNamedArgs) {
    this.UnnamedCalledArgs = unnamedCalledArgs;
    this.UnnamedCallerArgs = unnamedCallerArgs;
    this.ParamArrayCalledArgOpt = paramArrayCalledArgOpt;
    this.ParamArrayCallerArgs = paramArrayCallerArgs;
    this.AssignedNamedArgs = assignedNamedArgs;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.CalledMethArgSet",
      interfaces: ["FSharpRecord"],
      properties: {
        UnnamedCalledArgs: makeGeneric(List, {
          T: CalledArg
        }),
        UnnamedCallerArgs: makeGeneric(List, {
          T: makeGeneric(CallerArg, {
            T: GenericParam("T")
          })
        }),
        ParamArrayCalledArgOpt: Option(CalledArg),
        ParamArrayCallerArgs: makeGeneric(List, {
          T: makeGeneric(CallerArg, {
            T: GenericParam("T")
          })
        }),
        AssignedNamedArgs: makeGeneric(List, {
          T: makeGeneric(AssignedCalledArg, {
            T: GenericParam("T")
          })
        })
      }
    };
  }

  get NumUnnamedCallerArgs() {
    return this.UnnamedCallerArgs.length;
  }

  get NumAssignedNamedArgs() {
    return this.AssignedNamedArgs.length;
  }

  get NumUnnamedCalledArgs() {
    return this.UnnamedCalledArgs.length;
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.CalledMethArgSet", CalledMethArgSet);
export function MakeCalledArgs(amap, m, minfo, minst) {
  const paramDatas = minfo.GetParamDatas(amap, m, minst);
  return List_1.mapiSquared(function (i, j, _arg1) {
    return new CalledArg([i, j], _arg1.data[0], _arg1.data[2], _arg1.data[3], _arg1.data[1], _arg1.data[5], _arg1.data[4], _arg1.data[6]);
  }, paramDatas);
}
export class CalledMeth {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.CalledMeth",
      properties: {
        AllUnnamedCalledArgs: makeGeneric(List, {
          T: CalledArg
        }),
        ArgSets: makeGeneric(List, {
          T: makeGeneric(CalledMethArgSet, {
            T: GenericParam("T")
          })
        }),
        AssignedItemSetters: makeGeneric(List, {
          T: makeGeneric(AssignedItemSetter, {
            T: GenericParam("T")
          })
        }),
        AssignedNamedArgs: makeGeneric(List, {
          T: makeGeneric(List, {
            T: makeGeneric(AssignedCalledArg, {
              T: GenericParam("T")
            })
          })
        }),
        AssignedUnnamedArgs: makeGeneric(List, {
          T: makeGeneric(List, {
            T: makeGeneric(AssignedCalledArg, {
              T: GenericParam("T")
            })
          })
        }),
        AssignsAllNamedArgs: "boolean",
        AssociatedPropertyInfo: Option(PropInfo),
        AttributeAssignedNamedArgs: makeGeneric(List, {
          T: makeGeneric(CallerNamedArg, {
            T: GenericParam("T")
          })
        }),
        CalledTyArgs: makeGeneric(List, {
          T: TType
        }),
        CalledTyparInst: makeGeneric(List, {
          T: Tuple([Typar, TType])
        }),
        CallerObjArgTys: makeGeneric(List, {
          T: TType
        }),
        CallerTyArgs: makeGeneric(List, {
          T: TType
        }),
        HasCorrectArity: "boolean",
        HasCorrectGenericArity: "boolean",
        HasOptArgs: "boolean",
        HasOutArgs: "boolean",
        Method: MethInfo,
        NumArgSets: "number",
        NumAssignedProps: "number",
        NumCalledTyArgs: "number",
        NumCallerTyArgs: "number",
        ParamArrayCalledArgOpt: Option(CalledArg),
        ParamArrayCallerArgs: Option(makeGeneric(List, {
          T: makeGeneric(CallerArg, {
            T: GenericParam("T")
          })
        })),
        ParamArrayElementType: TType,
        ReturnType: TType,
        TotalNumAssignedNamedArgs: "number",
        TotalNumUnnamedCalledArgs: "number",
        TotalNumUnnamedCallerArgs: "number",
        UnassignedNamedArgs: makeGeneric(List, {
          T: makeGeneric(CallerNamedArg, {
            T: GenericParam("T")
          })
        }),
        UnnamedCalledOptArgs: makeGeneric(List, {
          T: CalledArg
        }),
        UnnamedCalledOutArgs: makeGeneric(List, {
          T: CalledArg
        }),
        UsesParamArrayConversion: "boolean",
        amap: ImportMap,
        infoReader: InfoReader
      }
    };
  }

  constructor(infoReader, nameEnv, isCheckingAttributeCall, freshenMethInfo, m, ad, minfo, calledTyArgs, callerTyArgs, pinfoOpt, callerObjArgTys, curriedCallerArgs, allowParamArgs, allowOutAndOptArgs, tyargsOpt) {
    this["infoReader@210"] = infoReader;
    this.minfo = minfo;
    this.calledTyArgs = calledTyArgs;
    this.callerTyArgs = callerTyArgs;
    this.pinfoOpt = pinfoOpt;
    this.callerObjArgTys = callerObjArgTys;
    const g = this["infoReader@210"].g;
    this.methodRetTy = this.minfo.GetFSharpReturnTy(this["infoReader@210"].amap, m, this.calledTyArgs);
    const fullCurriedCalledArgs = MakeCalledArgs(this["infoReader@210"].amap, m, this.minfo, this.calledTyArgs);
    const argSetInfos = toList(map2((tupledArg, fullCalledArgs) => {
      const unnamedCalledArgs = filter(calledArg => calledArg.NameOpt == null ? true : forAll(_arg1 => getValue(calledArg.NameOpt).idText !== _arg1.data[0].idText, tupledArg[1]), fullCalledArgs);
      let patternInput_1;
      const nUnnamedCallerArgs = tupledArg[0].length | 0;

      if (allowOutAndOptArgs ? nUnnamedCallerArgs < unnamedCalledArgs.length : false) {
        const patternInput = List_1.chop(nUnnamedCallerArgs, unnamedCalledArgs);

        if (forAll(x => x.IsOutArg ? isByrefTy(g, x.CalledArgumentType) : false, patternInput[1])) {
          patternInput_1 = [patternInput[0], new List(), patternInput[1]];
        } else if (forAll(x_1 => x_1.OptArgInfo.IsOptional, patternInput[1])) {
          patternInput_1 = [patternInput[0], patternInput[1], new List()];
        } else {
          patternInput_1 = [unnamedCalledArgs, new List(), new List()];
        }
      } else {
        patternInput_1 = [unnamedCalledArgs, new List(), new List()];
      }

      let patternInput_3;
      const minArgs = patternInput_1[0].length - 1 | 0;
      const supportsParamArgs = (allowParamArgs ? minArgs >= 0 : false) ? (calledArg_1 => calledArg_1.IsParamArray ? isArray1DTy(g, calledArg_1.CalledArgumentType) : false)(last(patternInput_1[0])) : false;

      if (supportsParamArgs ? tupledArg[0].length >= minArgs : false) {
        const patternInput_2 = List_1.frontAndBack(patternInput_1[0]);
        patternInput_3 = [List_1.chop(minArgs, tupledArg[0]), patternInput_2[0], patternInput_2[1]];
      } else {
        patternInput_3 = [[tupledArg[0], new List()], patternInput_1[0], null];
      }

      const unnamedCallerArgs = patternInput_3[0][0];
      const paramArrayCallerArgs = patternInput_3[0][1];
      const assignedNamedArgs = choose(calledArg_2 => calledArg_2.NameOpt != null ? tryPick(_arg2 => {
        var NamedArgIdOpt;

        if (getValue(calledArg_2.NameOpt).idText === _arg2.data[0].idText) {
          return NamedArgIdOpt = _arg2.data[0], new AssignedCalledArg(NamedArgIdOpt, calledArg_2, _arg2.data[1]);
        } else {
          return null;
        }
      }, tupledArg[1]) : null, fullCalledArgs);
      const unassignedNamedItems = filter(_arg3 => forAll(calledArg_3 => calledArg_3.NameOpt == null ? true : _arg3.data[0].idText !== getValue(calledArg_3.NameOpt).idText, fullCalledArgs), tupledArg[1]);
      const attributeAssignedNamedItems = isCheckingAttributeCall ? unassignedNamedItems : new List();
      let patternInput_4;
      const returnedObjTy = this.minfo.IsConstructor ? this.minfo.ApparentEnclosingType : this.methodRetTy;
      patternInput_4 = List_1.splitChoose(_arg4 => {
        var amap;
        const nm = _arg4.data[0].idText;
        const pinfos = GetIntrinsicPropInfoSetsOfType(this["infoReader@210"], nm, ad, new AllowMultiIntfInstantiations(0), new FindMemberFlag(0), _arg4.data[0].idRange, returnedObjTy);
        const pinfos_2 = (amap = this["infoReader@210"].amap, pinfos_1 => ExcludeHiddenOfPropInfos(g, amap, m, pinfos_1))(pinfos);
        const $var3 = pinfos_2.tail != null ? pinfos_2.tail.tail == null ? (pinfos_2.head.HasSetter ? !pinfos_2.head.IsIndexer : false) ? [0, pinfos_2.head] : [1] : [1] : [1];

        switch ($var3[0]) {
          case 0:
            const pminfo = $var3[1].SetterMethod;
            const pminst = freshenMethInfo(m, pminfo);
            return new Choice(0, new AssignedItemSetter(0, [_arg4.data[0], new AssignedItemSetterTarget(0, [$var3[1], pminfo, pminst]), _arg4.data[1]]));

          case 1:
            const epinfos = nameEnv != null ? ExtensionPropInfosOfTypeInScope(this["infoReader@210"], getValue(nameEnv), nm, ad, m, returnedObjTy) : new List();
            const $var4 = epinfos.tail != null ? epinfos.tail.tail == null ? (epinfos.head.HasSetter ? !epinfos.head.IsIndexer : false) ? [0, epinfos.head] : [1] : [1] : [1];

            switch ($var4[0]) {
              case 0:
                const pminfo_1 = $var4[1].SetterMethod;
                let pminst_1;
                const matchValue = this.minfo;
                const $var5 = matchValue.tag === 0 ? matchValue.data[1].tag === 1 ? [0, matchValue.data[1].data[1]] : [1] : [1];

                switch ($var5[0]) {
                  case 0:
                    pminst_1 = $var5[1];
                    break;

                  case 1:
                    pminst_1 = freshenMethInfo(m, pminfo_1);
                    break;
                }

                let pminst_2;
                const $var6 = tyargsOpt != null ? getValue(tyargsOpt).tag === 1 ? [0, getValue(tyargsOpt).data[1]] : [1] : [1];

                switch ($var6[0]) {
                  case 0:
                    pminst_2 = $var6[1];
                    break;

                  case 1:
                    pminst_2 = pminst_1;
                    break;
                }

                return new Choice(0, new AssignedItemSetter(0, [_arg4.data[0], new AssignedItemSetterTarget(0, [$var4[1], pminfo_1, pminst_2]), _arg4.data[1]]));

              case 1:
                const matchValue_1 = this["infoReader@210"].GetILFieldInfosOfType(nm, ad, m, returnedObjTy);

                if (matchValue_1.tail != null) {
                  return new Choice(0, new AssignedItemSetter(0, [_arg4.data[0], new AssignedItemSetterTarget(1, matchValue_1.head), _arg4.data[1]]));
                } else {
                  const matchValue_2 = this["infoReader@210"].TryFindRecdOrClassFieldInfoOfType(nm, m, returnedObjTy);

                  if (matchValue_2 == null) {
                    return new Choice(1, _arg4);
                  } else {
                    return new Choice(0, new AssignedItemSetter(0, [_arg4.data[0], new AssignedItemSetterTarget(2, getValue(matchValue_2)), _arg4.data[1]]));
                  }
                }

            }

        }
      }, unassignedNamedItems);
      const names = map(_arg5 => _arg5.data[0].idText, tupledArg[1]);

      if (List_2.noRepeats(_String.order, names).length !== tupledArg[1].length) {
        errorR(new _Error(SR.typrelNamedArgumentHasBeenAssignedMoreThenOnce(), m));
      }

      const argSet = new CalledMethArgSet(patternInput_3[1], unnamedCallerArgs, patternInput_3[2], paramArrayCallerArgs, assignedNamedArgs);
      return [argSet, patternInput_4[0], patternInput_4[1], attributeAssignedNamedItems, patternInput_1[1], patternInput_1[2]];
    }, curriedCallerArgs, fullCurriedCalledArgs));
    this.argSets = map(tupledArg_1 => tupledArg_1[0], argSetInfos);
    this.assignedNamedProps = collect(tupledArg_2 => tupledArg_2[1], argSetInfos);
    this.unassignedNamedItems = collect(tupledArg_3 => tupledArg_3[2], argSetInfos);
    this.attributeAssignedNamedItems = collect(tupledArg_4 => tupledArg_4[3], argSetInfos);
    this.unnamedCalledOptArgs = collect(tupledArg_5 => tupledArg_5[4], argSetInfos);
    this.unnamedCalledOutArgs = collect(tupledArg_6 => tupledArg_6[5], argSetInfos);
  }

  get infoReader() {
    return this["infoReader@210"];
  }

  get amap() {
    return this["infoReader@210"].amap;
  }

  get Method() {
    return this.minfo;
  }

  get CalledTyArgs() {
    return this.calledTyArgs;
  }

  get CalledTyparInst() {
    const tps = this.minfo.FormalMethodTypars;

    if (tps.length === this.calledTyArgs.length) {
      return mkTyparInst(tps, this.calledTyArgs);
    } else {
      return new List();
    }
  }

  get CallerTyArgs() {
    return this.callerTyArgs;
  }

  get CallerObjArgTys() {
    return this.callerObjArgTys;
  }

  get ArgSets() {
    return this.argSets;
  }

  get ReturnType() {
    return this.methodRetTy;
  }

  get AssignedItemSetters() {
    return this.assignedNamedProps;
  }

  get AssociatedPropertyInfo() {
    return this.pinfoOpt;
  }

  get UnassignedNamedArgs() {
    return this.unassignedNamedItems;
  }

  get AttributeAssignedNamedArgs() {
    return this.attributeAssignedNamedItems;
  }

  get UnnamedCalledOptArgs() {
    return this.unnamedCalledOptArgs;
  }

  get UnnamedCalledOutArgs() {
    return this.unnamedCalledOutArgs;
  }

  static GetMethod(x) {
    return x.Method;
  }

  get NumArgSets() {
    return this.ArgSets.length;
  }

  get HasOptArgs() {
    var $var7;
    return !($var7 = this.UnnamedCalledOptArgs, $var7.tail == null);
  }

  get HasOutArgs() {
    var $var8;
    return !($var8 = this.UnnamedCalledOutArgs, $var8.tail == null);
  }

  get UsesParamArrayConversion() {
    return exists(argSet => CurriedLambda(() => argSet.ParamArrayCalledArgOpt != null)(), this.ArgSets);
  }

  get ParamArrayCalledArgOpt() {
    return tryPick(argSet => argSet.ParamArrayCalledArgOpt, this.ArgSets);
  }

  get ParamArrayCallerArgs() {
    return tryPick(argSet => argSet.ParamArrayCalledArgOpt != null ? argSet.ParamArrayCallerArgs : null, this.ArgSets);
  }

  get ParamArrayElementType() {
    return destArrayTy(this.amap.g, getValue(this.ParamArrayCalledArgOpt).CalledArgumentType);
  }

  get NumAssignedProps() {
    return this.AssignedItemSetters.length;
  }

  CalledObjArgTys(m) {
    return this.Method.GetObjArgTypes(this.amap, m, this.CalledTyArgs);
  }

  get NumCalledTyArgs() {
    return this.CalledTyArgs.length;
  }

  get NumCallerTyArgs() {
    return this.CallerTyArgs.length;
  }

  get AssignsAllNamedArgs() {
    const $var9 = this.UnassignedNamedArgs;
    return $var9.tail == null;
  }

  get HasCorrectArity() {
    return this.NumCalledTyArgs === this.NumCallerTyArgs ? forAll(argSet => argSet.NumUnnamedCalledArgs === argSet.NumUnnamedCallerArgs, this.ArgSets) : false;
  }

  get HasCorrectGenericArity() {
    return this.NumCalledTyArgs === this.NumCallerTyArgs;
  }

  IsAccessible(m, ad) {
    return IsMethInfoAccessible(this.amap, m, ad, this.Method);
  }

  HasCorrectObjArgs(m) {
    return this.CalledObjArgTys(m).length === this.CallerObjArgTys.length;
  }

  IsCandidate(m, ad) {
    if ((this.IsAccessible(m, ad) ? this.HasCorrectArity : false) ? this.HasCorrectObjArgs(m) : false) {
      return this.AssignsAllNamedArgs;
    } else {
      return false;
    }
  }

  get AssignedUnnamedArgs() {
    return map(argSet => toList(map2((calledArg, callerArg) => new AssignedCalledArg(null, calledArg, callerArg), argSet.UnnamedCalledArgs, argSet.UnnamedCallerArgs)), this.ArgSets);
  }

  get AssignedNamedArgs() {
    return map(argSet => argSet.AssignedNamedArgs, this.ArgSets);
  }

  get AllUnnamedCalledArgs() {
    return collect(x => x.UnnamedCalledArgs, this.ArgSets);
  }

  get TotalNumUnnamedCalledArgs() {
    return sumBy(x => x.NumUnnamedCalledArgs, this.ArgSets);
  }

  get TotalNumUnnamedCallerArgs() {
    return sumBy(x => x.NumUnnamedCallerArgs, this.ArgSets);
  }

  get TotalNumAssignedNamedArgs() {
    return sumBy(x => x.NumAssignedNamedArgs, this.ArgSets);
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.CalledMeth", CalledMeth);
export function NamesOfCalledArgs(calledArgs) {
  return choose(function (x) {
    return x.NameOpt;
  }, calledArgs);
}
export class ArgumentAnalysis {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodCalls.ArgumentAnalysis",
      interfaces: ["FSharpUnion"],
      cases: [["NoInfo"], ["ArgDoesNotMatch"], ["CallerLambdaHasArgTypes", makeGeneric(List, {
        T: TType
      })], ["CalledArgMatchesType", TType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.MethodCalls.ArgumentAnalysis", ArgumentAnalysis);
export function InferLambdaArgsForLambdaPropagation(origRhsExpr) {
  const loop = function (e) {
    if (e.tag === 15) {
      return 1 + loop(e.data[3]) | 0;
    } else if (e.tag === 16) {
      return 1;
    } else {
      return 0;
    }
  };

  return loop(origRhsExpr) | 0;
}
export function ExamineArgumentForLambdaPropagation(infoReader, arg) {
  const g = infoReader.g;
  let argExpr;
  const matchValue = arg.CallerArg.Expr;

  if (matchValue.tag === 0) {
    argExpr = matchValue.data[0];
  } else {
    argExpr = matchValue;
  }

  const countOfCallerLambdaArg = InferLambdaArgsForLambdaPropagation(argExpr) | 0;
  const adjustedCalledArgTy = AdjustCalledArgType(infoReader, false, arg.CalledArg, arg.CallerArg);

  if (countOfCallerLambdaArg > 0) {
    const patternInput = stripFunTy(g, adjustedCalledArgTy);

    if (patternInput[0].length >= countOfCallerLambdaArg) {
      return new ArgumentAnalysis(2, patternInput[0]);
    } else if (isDelegateTy(g, isLinqExpressionTy(g, adjustedCalledArgTy) ? destLinqExpressionTy(g, adjustedCalledArgTy) : adjustedCalledArgTy)) {
      return new ArgumentAnalysis(1);
    } else {
      return new ArgumentAnalysis(0);
    }
  } else {
    return new ArgumentAnalysis(3, adjustedCalledArgTy);
  }
}
export function ExamineMethodForLambdaPropagation(x) {
  var infoReader;
  const unnamedInfo = List_1.mapSquared((infoReader = x.infoReader, function (arg) {
    return ExamineArgumentForLambdaPropagation(infoReader, arg);
  }), x.AssignedUnnamedArgs);
  const namedInfo = List_1.mapSquared(function (arg_1) {
    return [getValue(arg_1.NamedArgIdOpt), ExamineArgumentForLambdaPropagation(x.infoReader, arg_1)];
  }, x.AssignedNamedArgs);

  if (List_1.existsSquared(function (_arg1) {
    return _arg1.tag === 2 ? true : false;
  }, unnamedInfo) ? true : List_1.existsSquared(function (_arg2) {
    return _arg2[1].tag === 2 ? true : false;
  }, namedInfo)) {
    return [unnamedInfo, namedInfo];
  } else {
    return null;
  }
}
export function IsBaseCall(objArgs) {
  var v;
  const $var10 = objArgs.tail != null ? objArgs.head.tag === 1 ? objArgs.tail.tail == null ? (v = objArgs.head.data[0], v.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1))) ? [0, objArgs.head.data[0]] : [1] : [1] : [1] : [1];

  switch ($var10[0]) {
    case 0:
      return true;

    case 1:
      return false;
  }
}
export function ComputeConstrainedCallInfo(g, amap, m, objArgs, minfo) {
  const $var11 = objArgs.tail != null ? objArgs.tail.tail == null ? !minfo.IsExtensionMember ? [0, objArgs.head] : [1] : [1] : [1];

  switch ($var11[0]) {
    case 0:
      const methObjTy = minfo.ApparentEnclosingType;
      const objArgTy = tyOfExpr(g, $var11[1]);

      if (TypeDefinitelySubsumesTypeNoCoercion(0, g, amap, m, methObjTy, objArgTy) ? true : isClassTy(g, methObjTy) ? !((typeEquiv(g, methObjTy, g.system_Object_typ) ? true : typeEquiv(g, methObjTy, g.system_Value_typ)) ? true : typeEquiv(g, methObjTy, g.system_Enum_typ)) : false) {
        return null;
      } else {
        return objArgTy;
      }

    case 1:
      return null;
  }
}
export function TakeObjAddrForMethodCall(g, amap, minfo, isMutable, m, objArgs, f) {
  const ccallInfo = ComputeConstrainedCallInfo(g, amap, m, objArgs, minfo);
  let patternInput_1;
  const $var12 = objArgs.tail != null ? objArgs.tail.tail == null ? [0, objArgs.head] : [1] : [1];

  switch ($var12[0]) {
    case 0:
      const hasCallInfo = CurriedLambda(() => ccallInfo != null)();
      const mustTakeAddress = (minfo.IsStruct ? !minfo.IsExtensionMember : false) ? true : hasCallInfo;
      const objArgTy = tyOfExpr(g, $var12[1]);
      const patternInput = mkExprAddrOfExpr(g, mustTakeAddress, hasCallInfo, isMutable, $var12[1], null, m);
      const objArgExpr_ = (!hasCallInfo ? !TypeDefinitelySubsumesTypeNoCoercion(0, g, amap, m, minfo.ApparentEnclosingType, objArgTy) : false) ? mkCoerceExpr(patternInput[1], minfo.ApparentEnclosingType, m, objArgTy) : patternInput[1];
      patternInput_1 = [patternInput[0], ofArray([objArgExpr_])];
      break;

    case 1:
      patternInput_1 = [function (x) {
        return x;
      }, objArgs];
      break;
  }

  const patternInput_2 = f(ccallInfo, patternInput_1[1]);
  return [patternInput_1[0](patternInput_2[0]), patternInput_2[1]];
}
export function BuildILMethInfoCall(g, amap, m, isProp, minfo, valUseFlags, minst, direct, args) {
  const valu = isStructTy(g, minfo.ApparentEnclosingType);
  const ctor = minfo.IsConstructor;

  if (minfo.IsClassConstructor) {
    error(new InternalError(minfo.ILName + ": cannot call a class constructor", m));
  }

  const useCallvirt = (!valu ? !direct : false) ? minfo.IsVirtual : false;
  const isProtected = minfo.IsProtectedAccessibility;
  const ilMethRef = minfo.ILMethodRef;
  const newobj = ctor ? valUseFlags.tag === 1 ? true : false : false;
  const exprTy = ctor ? minfo.ApparentEnclosingType : minfo.GetFSharpReturnTy(amap, m, minst);
  const retTy = (!ctor ? ilMethRef.ReturnType.Equals(new ILType(0)) : false) ? new List() : ofArray([exprTy]);
  const isDllImport = minfo.IsDllImport(g);
  return [new Expr(11, [new TOp(31, [useCallvirt, isProtected, valu, newobj, valUseFlags, isProp, isDllImport, ilMethRef, minfo.DeclaringTypeInst, minst, retTy]), new List(), args, m]), exprTy];
}
export function BuildObjCtorCall(g, m) {
  const ilMethRef = mkILCtorMethSpecForTy(g.ilg.typ_Object, new List()).MethodRef;
  return new Expr(11, [new TOp(31, [false, false, false, false, new ValUseFlag(2), false, true, ilMethRef, new List(), new List(), ofArray([g.obj_ty])]), new List(), new List(), m]);
}
export function BuildFSharpMethodApp(g, m, vref, vexp, vexprty, args) {
  const arities = arityOfVal(vref.Deref).AritiesOfArgs;
  const patternInput_1 = mapFold(function (tupledArg, arity) {
    const matchValue = [arity, tupledArg[0]];
    const $var13 = matchValue[0] === 0 ? matchValue[1].tail == null ? typeEquiv(g, domainOfFunTy(g, tupledArg[1]), g.unit_ty) ? [0] : [1] : [1] : matchValue[0] === 1 ? matchValue[1].tail == null ? typeEquiv(g, domainOfFunTy(g, tupledArg[1]), g.unit_ty) ? [0] : [1] : [1] : [1];

    switch ($var13[0]) {
      case 0:
        return [mkUnit(g, m), [tupledArg[0], rangeOfFunTy(g, tupledArg[1])]];

      case 1:
        const $var14 = matchValue[0] === 0 ? matchValue[1].tail != null ? [0] : [3] : matchValue[0] === 1 ? matchValue[1].tail == null ? [2] : [1] : [3];

        switch ($var14[0]) {
          case 0:
            const argst = matchValue[1].tail;
            const arg = matchValue[1].head;
            warning(new InternalError(toText(printf("Unexpected zero arity, args = %s"))(showL(sepListL(rightL(TaggedTextOps.tagText(";")), map(function (arg00_) {
              return DebugPrint.exprL(arg00_);
            }, tupledArg[0])))), m));
            return [arg, [argst, rangeOfFunTy(g, tupledArg[1])]];

          case 1:
            const argst_1 = matchValue[1].tail;
            const arg_1 = matchValue[1].head;
            return [arg_1, [argst_1, rangeOfFunTy(g, tupledArg[1])]];

          case 2:
            return error(new InternalError("expected additional arguments here", m));

          case 3:
            if (tupledArg[0].length < arity) {
              error(new InternalError("internal error in getting arguments, n = " + arity.toString() + ", #args = " + tupledArg[0].length.toString(), m));
            }

            const patternInput = List_1.chop(arity, tupledArg[0]);
            const tuptys = map(function (arg10_) {
              return tyOfExpr(g, arg10_);
            }, patternInput[0]);
            return [mkRefTupled(g, m, patternInput[0], tuptys), [patternInput[1], rangeOfFunTy(g, tupledArg[1])]];
        }

    }
  }, [args, vexprty], arities, ofArray);
  const retTy = patternInput_1[1][1];
  const leftover = patternInput_1[1][0];

  if (!(leftover.tail == null)) {
    error(new InternalError("Unexpected " + leftover.length.toString() + " remaining arguments in method application", m));
  }

  return [mkApps(g, [vexp, vexprty], new List(), patternInput_1[0], m), retTy];
}
export function BuildFSharpMethodCall(g, m, typ, vref, valUseFlags, minst, args) {
  const vexp = new Expr(1, [vref, valUseFlags, m]);
  const vexpty = vref.Type;
  const patternInput = vref.TypeScheme;
  const vtinst = append(argsOfAppTy(g, typ), minst);

  if (patternInput[0].length !== vtinst.length) {
    error(new InternalError("BuildFSharpMethodCall: unexpected List.length mismatch", m));
  }

  const expr = mkTyAppExpr(m, vexp, vexpty, vtinst);
  const exprty = instType(mkTyparInst(patternInput[0], vtinst), patternInput[1]);
  return BuildFSharpMethodApp(g, m, vref, expr, exprty, args);
}
export function MakeMethInfoCall(amap, m, minfo, minst, args) {
  const valUseFlags = new ValUseFlag(1);

  if (minfo.tag === 0) {
    return BuildFSharpMethodCall(minfo.data[0], m, minfo.data[1], minfo.data[2], valUseFlags, minst, args)[0];
  } else if (minfo.tag === 2) {
    return mkDefault(m, minfo.data[1]);
  } else {
    const direct = !minfo.IsVirtual;
    return BuildILMethInfoCall(minfo.data[0], amap, m, false, minfo.data[1], valUseFlags, minst, direct, args)[0];
  }
}
export function BuildMethodCall(tcVal, g, amap, isMutable, m, isProp, minfo, valUseFlags, minst, objArgs, args) {
  const direct = IsBaseCall(objArgs);
  return TakeObjAddrForMethodCall(g, amap, minfo, isMutable, m, objArgs, function (ccallInfo, objArgs_1) {
    const allArgs = append(objArgs_1, args);
    const valUseFlags_1 = (direct ? valUseFlags.tag === 1 ? true : false : false) ? new ValUseFlag(4) : ccallInfo == null ? valUseFlags : new ValUseFlag(0, getValue(ccallInfo));

    if (minfo.tag === 0) {
      const patternInput = tcVal(minfo.data[2], valUseFlags_1, append(minfo.DeclaringTypeInst, minst), m);
      return BuildFSharpMethodApp(g, m, minfo.data[2], patternInput[0], patternInput[1], allArgs);
    } else if (minfo.tag === 2) {
      if (!TypeHasDefaultValue(minfo.data[0], m, minfo.data[1])) {
        errorR(new _Error(SR.tcDefaultStructConstructorCall(), m));
      }

      return [mkDefault(m, minfo.data[1]), minfo.data[1]];
    } else {
      return BuildILMethInfoCall(g, amap, m, isProp, minfo.data[1], valUseFlags_1, minst, direct, allArgs);
    }
  });
}
export function BuildNewDelegateExpr(eventInfoOpt, g, amap, delegateTy, invokeMethInfo, delArgTys, f, fty, m) {
  const slotsig = invokeMethInfo.GetSlotSig(amap, m);
  let patternInput_1;
  const topValInfo = new ValReprInfo(0, [new List(), replicate(1 > delArgTys.length ? 1 : delArgTys.length, ValReprInfoModule.unnamedTopArg), ValReprInfoModule.unnamedRetVal]);
  const lambdaContents = eventInfoOpt != null ? null : tryDestTopLambda(g, amap, topValInfo, f, fty);

  if (lambdaContents != null) {
    const patternInput = IteratedAdjustArityOfLambda(g, amap, topValInfo, f);
    patternInput_1 = [concat(patternInput[3]), patternInput[4]];
  } else {
    if (exists(function (arg10_) {
      return isByrefTy(g, arg10_);
    }, delArgTys)) {
      error(new _Error(SR.tcFunctionRequiresExplicitLambda(delArgTys.length), m));
    }

    const delArgVals = mapIndexed(function (i, argty) {
      return mkCompGenLocal(m, "delegateArg" + i.toString(), argty)[0];
    }, delArgTys);
    let expr;
    let args;

    if (eventInfoOpt == null) {
      if (delArgTys.tail == null) {
        args = ofArray([mkUnit(g, m)]);
      } else {
        args = map(function (arg10__1) {
          return exprForVal(m, arg10__1);
        }, delArgVals);
      }
    } else if (delArgVals.tail != null) {
      if (!isObjTy(g, delArgVals.head.Type)) {
        args = error(nonStandardEventError(getValue(eventInfoOpt).EventName, m));
      } else if (delArgVals.tail != null) {
        args = ofArray([exprForVal(m, delArgVals.head), mkRefTupledVars(g, m, delArgVals.tail)]);
      } else {
        throw new Error("C:/projects/fcs/src/fsharp/MethodCalls.fs", 799, 30);
      }
    } else {
      args = error(nonStandardEventError(getValue(eventInfoOpt).EventName, m));
    }

    expr = mkApps(g, [f, fty], new List(), args, m);
    patternInput_1 = [delArgVals, expr];
  }

  const meth = new ObjExprMethod(0, [slotsig, new List(), new List(), ofArray([patternInput_1[0]]), patternInput_1[1], m]);
  return mkObjExpr(delegateTy, null, BuildObjCtorCall(g, m), ofArray([meth]), new List(), m);
}
export function CoerceFromFSharpFuncToDelegate(g, amap, infoReader, ad, callerArgTy, m, callerArgExpr, delegateTy) {
  const patternInput = GetSigOfFunctionForDelegate(infoReader, delegateTy, m, ad);
  return BuildNewDelegateExpr(null, g, amap, delegateTy, patternInput.data[0], patternInput.data[1], callerArgExpr, callerArgTy, m);
}