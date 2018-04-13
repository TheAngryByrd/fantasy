import { verbose, GetEnvInteger } from "../fsharp/lib";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Layout } from "../utils/sformat";
import { RightL, TaggedTextOps, wordL, SepL, op_HatHat, emptyL, showL } from "../fsharp/layout";
import { tyconRefEq, stripTyEqns, isTyparTy, isRefTupleTy, isStructTupleTy, tcrefOfAppTy, isAppTy, PrettyTypes, recdFieldsOfExnDefRef, argsOfAppTy, ActivePatternInfo$2E$get_Names as ActivePatternInfo_get_Names, TryGetActivePatternInfo, stripFunTy, generalizedTyconRef, GetTopValTypeInFSharpForm, tryDestRefTupleTy, tryDestFunTy, DisplayEnv, tryDestOptionTy, Erasure, stripTyEqnsWrtErasure, isFunTy, tryDestForallTy } from "../fsharp/TastOps";
import { partition, filter, reverse, groupBy, mapIndexed, ofArray, map, unzip } from "../fable-core/List";
import List from "../fable-core/List";
import { isGeneratedExceptionField, layoutType, isGeneratedUnionCaseField, prettyLayoutOfUncurriedSig, prettyLayoutOfInstAndSig, PrintUtilities, layoutOfParamData, prettyLayoutOfType, stringOfTy } from "../fsharp/NicePrint";
import { ParamNameAndType, ReflectedArgInfo, CallerInfoInfo, OptionalArgInfo, ParamData } from "../fsharp/infos";
import { defaultArg, getValue } from "../fable-core/Option";
import { collect, delay, sortWith, fold, exists, forAll, map2, item as item_2, zip, map3, toList } from "../fable-core/Seq";
import { ErrorScope, Tooltips, FSharpXmlDoc, FSharpToolTipElement, FSharpToolTipText, CompletionItem, CompletionItemKind, SymbolHelpers } from "../symbols/SymbolHelpers";
import { GetSigOfFunctionForDelegate, PropTypOfEventInfo } from "../fsharp/InfoReader";
import { AccessorDomain } from "../fsharp/AccessibilityLogic";
import { Item, ItemWithInst } from "../fsharp/NameResolution";
import { FSharpGlyph } from "./ServiceConstants";
import { UnresolvedPathReferenceNoRange } from "../fsharp/ErrorLogger";
import CurriedLambda from "../fable-core/CurriedLambda";
import { makeGeneric, compare, Array as _Array, Option } from "../fable-core/Util";
import { FSharpAccessibility } from "../symbols/Symbols";
import { dprintf } from "../absil/ildiag";
import { endsWith, join, printf } from "../fable-core/String";
import { IsOperatorName } from "../fsharp/PrettyNaming";
import { Keywords } from "../fsharp/lexhelp";
import { Array as _Array_1 } from "../absil/illib";
import Choice from "../fable-core/Choice";
import { map as map_1 } from "../fable-core/Array";
export const EnvMisc3 = function (__exports) {
  const dataTipSpinWaitTime = __exports.dataTipSpinWaitTime = GetEnvInteger("FCS_ToolTipSpinWaitTime", 300);
  return __exports;
}({});
export class FSharpMethodGroupItemParameter {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMethodGroupItemParameter",
      properties: {
        CanonicalTypeTextForSorting: "string",
        Display: "string",
        IsOptional: "boolean",
        ParameterName: "string",
        StructuredDisplay: Layout
      }
    };
  }

  constructor(name, canonicalTypeTextForSorting, display, isOptional) {
    this.name = name;
    this.canonicalTypeTextForSorting = canonicalTypeTextForSorting;
    this.display = display;
    this.isOptional = isOptional;
  }

  get ParameterName() {
    return this.name;
  }

  get CanonicalTypeTextForSorting() {
    return this.canonicalTypeTextForSorting;
  }

  get StructuredDisplay() {
    return this.display;
  }

  get Display() {
    return showL(this.display);
  }

  get IsOptional() {
    return this.isOptional;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMethodGroupItemParameter", FSharpMethodGroupItemParameter);
export const DescriptionListsImpl = function (__exports) {
  const isFunction = __exports.isFunction = function (g, typ) {
    const patternInput = tryDestForallTy(g, typ);
    return isFunTy(g, patternInput[1]);
  };

  const printCanonicalizedTypeName = __exports.printCanonicalizedTypeName = function (g, denv, tau) {
    const strippedType = stripTyEqnsWrtErasure(new Erasure(0), g, tau);
    const denv_1 = denv.SetOpenPaths(new List());
    return stringOfTy(denv_1, strippedType);
  };

  const PrettyParamOfRecdField = __exports.PrettyParamOfRecdField = function (g, denv, f) {
    return new FSharpMethodGroupItemParameter(f.Name, printCanonicalizedTypeName(g, denv, f.FormalType), prettyLayoutOfType(denv, f.FormalType), false);
  };

  const PrettyParamOfUnionCaseField = __exports.PrettyParamOfUnionCaseField = function (g, denv, isGenerated, i, f) {
    const initial = PrettyParamOfRecdField(g, denv, f);
    const display = isGenerated(i, f) ? initial.StructuredDisplay : layoutOfParamData(denv, new ParamData(0, [false, false, new OptionalArgInfo(0), new CallerInfoInfo(0), f.Id, new ReflectedArgInfo(0), f.FormalType]));
    return new FSharpMethodGroupItemParameter(initial.ParameterName, initial.CanonicalTypeTextForSorting, display, false);
  };

  const ParamOfParamData = __exports.ParamOfParamData = function (g, denv, _arg1) {
    return new FSharpMethodGroupItemParameter(_arg1.data[4] != null ? getValue(_arg1.data[4]).idText : "", printCanonicalizedTypeName(g, denv, _arg1.data[6]), layoutOfParamData(denv, _arg1), _arg1.data[2].IsOptional);
  };

  const PrettyParamsOfParamDatas = __exports.PrettyParamsOfParamDatas = function (g, denv, typarInst, paramDatas, rty) {
    const patternInput = unzip(map(function (_arg1) {
      const isOptArg = _arg1.data[2].IsOptional;
      const matchValue = [_arg1.data[4], isOptArg, tryDestOptionTy(denv.g, _arg1.data[6])];

      if (matchValue[0] == null) {
        return [["", isOptArg, emptyL], _arg1.data[6]];
      } else if (matchValue[1]) {
        const nm = getValue(matchValue[0]).idText;
        const pty = defaultArg(matchValue[2], _arg1.data[6]);
        return [[nm, isOptArg, op_HatHat(SepL.questionMark, wordL(TaggedTextOps.tagParameter(nm)))], pty];
      } else {
        const nm_1 = getValue(matchValue[0]).idText;
        const prefix = _arg1.data[0] ? op_HatHat(PrintUtilities.layoutBuiltinAttribute(denv, denv.g.attrib_ParamArrayAttribute), op_HatHat(wordL(TaggedTextOps.tagParameter(nm_1)), RightL.colon)) : op_HatHat(wordL(TaggedTextOps.tagParameter(nm_1)), RightL.colon);
        return [[nm_1, isOptArg, prefix], _arg1.data[6]];
      }
    }, paramDatas));
    const patternInput_1 = prettyLayoutOfInstAndSig(denv, typarInst, patternInput[1], rty);
    const prettyRetTyL = patternInput_1[2][1];
    const prettyParamTysL = patternInput_1[2][0];
    const prettyParamTys = patternInput_1[1][0];
    const _prettyRetTy = patternInput_1[1][1];
    const prettyParams = toList(map3(function (tupledArg, tau, tyL) {
      return new FSharpMethodGroupItemParameter(tupledArg[0], printCanonicalizedTypeName(g, denv, tau), op_HatHat(tupledArg[2], tyL), tupledArg[1]);
    }, patternInput[0], prettyParamTys, prettyParamTysL));
    return [patternInput_1[0], prettyParams, prettyRetTyL, patternInput_1[3]];
  };

  const PrettyParamsOfTypes = __exports.PrettyParamsOfTypes = function (g, denv, typarInst, paramTys, retTy) {
    const patternInput = prettyLayoutOfInstAndSig(denv, typarInst, paramTys, retTy);
    const prettyRetTyL = patternInput[2][1];
    const prettyParamTysL = patternInput[2][0];
    const prettyParamTys = patternInput[1][0];
    const _prettyRetTy = patternInput[1][1];
    const parameters = map(function (tupledArg) {
      return new FSharpMethodGroupItemParameter("", printCanonicalizedTypeName(g, denv, tupledArg[0]), tupledArg[1], false);
    }, toList(zip(prettyParamTys, prettyParamTysL)));
    return [patternInput[0], parameters, prettyRetTyL, patternInput[3]];
  };

  const PrettyParamsAndReturnTypeOfItem = __exports.PrettyParamsAndReturnTypeOfItem = function (infoReader, m, denv, item) {
    PrettyParamsAndReturnTypeOfItem: while (true) {
      const amap = infoReader.amap;
      const g = infoReader.g;
      let denv_1;
      const inputRecord = SymbolHelpers.SimplerDisplayEnv(denv);
      denv_1 = new DisplayEnv(inputRecord.includeStaticParametersInTypeNames, inputRecord.openTopPathsSorted, inputRecord.openTopPathsRaw, inputRecord.shortTypeNames, inputRecord.suppressNestedTypes, inputRecord.maxMembers, inputRecord.showObsoleteMembers, inputRecord.showHiddenMembers, inputRecord.showTyparBinding, inputRecord.showImperativeTyparAnnotations, inputRecord.suppressInlineKeyword, inputRecord.suppressMutableKeyword, inputRecord.showMemberContainers, inputRecord.shortConstraints, true, inputRecord.showAttributes, inputRecord.showOverrides, inputRecord.showConstraintTyparAnnotations, inputRecord.abbreviateAdditionalConstraints, inputRecord.showTyparDefaultConstraints, inputRecord.g, inputRecord.contextAccessibility, inputRecord.generatedValueLayout);
      const $var1 = item.Item.tag === 0 ? [0, item.Item.data] : item.Item.tag === 1 ? [1, item.Item.data[0]] : item.Item.tag === 3 ? [2, item.Item.data] : item.Item.tag === 4 ? [3, item.Item.data] : item.Item.tag === 5 ? [4, item.Item.data] : item.Item.tag === 7 ? [5, item.Item.data] : item.Item.tag === 8 ? [6, item.Item.data] : item.Item.tag === 9 ? item.Item.data[1].tail != null ? [7, item.Item.data[1].head] : [14] : item.Item.tag === 11 ? item.Item.data[1].tail != null ? [8, item.Item.data[1].head] : [14] : item.Item.tag === 10 ? item.Item.data[1].tail != null ? [8, item.Item.data[1].head] : [14] : item.Item.tag === 16 ? [9, item.Item.data[1]] : item.Item.tag === 17 ? [10] : item.Item.tag === 15 ? item.Item.data[2] != null ? [11, getValue(item.Item.data[2]), item.Item.data[1]] : [14] : item.Item.tag === 12 ? [12, item.Item.data] : item.Item.tag === 13 ? [13, item.Item.data] : [14];

      switch ($var1[0]) {
        case 0:
          const getPrettyParamsOfTypes = function () {
            const tau = $var1[1].TauType;
            const matchValue = tryDestFunTy(denv_1.g, tau);

            if (matchValue == null) {
              const patternInput = prettyLayoutOfUncurriedSig(denv_1, item.TyparInst, new List())(tau);
              return [new List(), patternInput[1]];
            } else {
              const rtau = getValue(matchValue)[1];
              const arg = getValue(matchValue)[0];
              const args = tryDestRefTupleTy(denv_1.g, arg);
              const patternInput_1 = PrettyParamsOfTypes(g, denv_1, item.TyparInst, args, rtau);
              return [patternInput_1[1], patternInput_1[2]];
            }
          };

          const matchValue_1 = $var1[1].ValReprInfo;

          if (matchValue_1 != null) {
            const patternInput_2 = GetTopValTypeInFSharpForm(g, getValue(matchValue_1), $var1[1].Type, m);

            if (patternInput_2[1].tail != null) {
              const firstCurriedParamDatas = map(function (_arg1) {
                return new ParamData(0, [false, false, new OptionalArgInfo(0), new CallerInfoInfo(0), _arg1.data[0], new ReflectedArgInfo(0), _arg1.data[1]]);
              }, map(function (tupledArg) {
                return ParamNameAndType.FromArgInfo(tupledArg[0], tupledArg[1]);
              }, patternInput_2[1].head));
              let curriedRetTy;
              const matchValue_2 = tryDestFunTy(denv_1.g, $var1[1].TauType);

              if (matchValue_2 == null) {
                curriedRetTy = patternInput_2[2];
              } else {
                const rtau_1 = getValue(matchValue_2)[1];
                curriedRetTy = rtau_1;
              }

              const patternInput_3 = PrettyParamsOfParamDatas(g, denv_1, item.TyparInst, firstCurriedParamDatas, curriedRetTy);
              const prettyCurriedRetTyL = op_HatHat(patternInput_3[2], op_HatHat(SepL.space, patternInput_3[3]));
              return [patternInput_3[1], prettyCurriedRetTyL];
            } else {
              return getPrettyParamsOfTypes();
            }
          } else {
            return getPrettyParamsOfTypes();
          }

        case 1:
          let prettyParams;
          const matchValue_3 = $var1[1].UnionCase.RecdFields;
          const $var2 = matchValue_3.tail != null ? matchValue_3.tail.tail == null ? [0, matchValue_3.head] : [1, matchValue_3] : [1, matchValue_3];

          switch ($var2[0]) {
            case 0:
              prettyParams = ofArray([PrettyParamOfUnionCaseField(g, denv_1, function (pos, f) {
                return isGeneratedUnionCaseField(pos, f);
              }, -1, $var2[1])]);
              break;

            case 1:
              prettyParams = mapIndexed(function (i, f_1) {
                return PrettyParamOfUnionCaseField(g, denv_1, function (pos_1, f_2) {
                  return isGeneratedUnionCaseField(pos_1, f_2);
                }, i, f_1);
              }, $var2[1]);
              break;
          }

          const rty = generalizedTyconRef($var1[1].TyconRef);
          const rtyL = layoutType(denv_1, rty);
          return [prettyParams, rtyL];

        case 2:
          const v = $var1[1].ActivePatternVal;
          const tau_1 = v.TauType;
          const patternInput_4 = stripFunTy(denv_1.g, tau_1);
          const apinfo = getValue(TryGetActivePatternInfo(v));
          const aparity = ActivePatternInfo_get_Names.bind(apinfo)().length | 0;
          const rty_1 = aparity <= 1 ? patternInput_4[1] : item_2($var1[1].CaseIndex, argsOfAppTy(g, patternInput_4[1]));
          const patternInput_5 = PrettyParamsOfTypes(g, denv_1, item.TyparInst, patternInput_4[0], rty_1);
          return [patternInput_5[1], patternInput_5[2]];

        case 3:
          const prettyParams_1 = mapIndexed(function (i_1, f_3) {
            return PrettyParamOfUnionCaseField(g, denv_1, function (pos_2, f_4) {
              return isGeneratedExceptionField(pos_2, f_4);
            }, i_1, f_3);
          }, recdFieldsOfExnDefRef($var1[1]));
          const patternInput_6 = prettyLayoutOfUncurriedSig(denv_1, item.TyparInst, new List())(g.exn_ty);
          return [prettyParams_1, patternInput_6[1]];

        case 4:
          const patternInput_7 = prettyLayoutOfUncurriedSig(denv_1, item.TyparInst, new List())($var1[1].FieldType);
          return [new List(), patternInput_7[1]];

        case 5:
          const patternInput_8 = prettyLayoutOfUncurriedSig(denv_1, item.TyparInst, new List())($var1[1].FieldType(amap, m));
          return [new List(), patternInput_8[1]];

        case 6:
          const patternInput_9 = prettyLayoutOfUncurriedSig(denv_1, item.TyparInst, new List())(PropTypOfEventInfo(infoReader, m, new AccessorDomain(3), $var1[1]));
          return [new List(), patternInput_9[1]];

        case 7:
          const paramDatas = $var1[1].GetParamDatas(amap, m);
          const rty_2 = $var1[1].GetPropertyType(amap, m);
          const patternInput_10 = PrettyParamsOfParamDatas(g, denv_1, item.TyparInst, paramDatas, rty_2);
          return [patternInput_10[1], patternInput_10[2]];

        case 8:
          const paramDatas_1 = $var1[1].GetParamDatas(amap, m, $var1[1].FormalMethodInst).head;
          const rty_3 = $var1[1].GetFSharpReturnTy(amap, m, $var1[1].FormalMethodInst);
          const patternInput_11 = PrettyParamsOfParamDatas(g, denv_1, item.TyparInst, paramDatas_1, rty_3);
          return [patternInput_11[1], patternInput_11[2]];

        case 9:
          infoReader = infoReader;
          m = m;
          denv = denv_1;
          item = new ItemWithInst(new Item(0, $var1[1]), item.TyparInst);
          continue PrettyParamsAndReturnTypeOfItem;

        case 10:
          return [new List(), emptyL];

        case 11:
          const matchValue_4 = $var1[2]();

          if (matchValue_4 != null) {
            const rty_4 = $var1[1].GetFSharpReturnTy(amap, m, $var1[1].FormalMethodInst);
            const patternInput_12 = prettyLayoutOfUncurriedSig(denv_1, item.TyparInst, new List())(rty_4);
            return [new List(), patternInput_12[1]];
          } else {
            const argNamesAndTys = SymbolHelpers.ParamNameAndTypesOfUnaryCustomOperation(g, $var1[1]);
            const patternInput_13 = PrettyTypes.PrettifyTypes(g, map(function (_arg2) {
              return _arg2.data[1];
            }, argNamesAndTys));
            const paramDatas_2 = toList(map2(function (_arg3, argTy) {
              return new ParamData(0, [false, false, new OptionalArgInfo(0), new CallerInfoInfo(0), _arg3.data[0], new ReflectedArgInfo(0), argTy]);
            }, argNamesAndTys, patternInput_13[0]));
            const rty_5 = $var1[1].GetFSharpReturnTy(amap, m, $var1[1].FormalMethodInst);
            const patternInput_14 = PrettyParamsOfParamDatas(g, denv_1, item.TyparInst, paramDatas_2, rty_5);
            return [patternInput_14[1], patternInput_14[2]];
          }

        case 12:
          const patternInput_15 = prettyLayoutOfUncurriedSig(denv_1, item.TyparInst, new List())($var1[1]);
          return [new List(), patternInput_15[1]];

        case 13:
          const patternInput_16 = GetSigOfFunctionForDelegate(infoReader, $var1[1], m, new AccessorDomain(3));
          const patternInput_17 = PrettyParamsOfParamDatas(g, denv_1, item.TyparInst, ofArray([new ParamData(0, [false, false, new OptionalArgInfo(0), new CallerInfoInfo(0), null, new ReflectedArgInfo(0), patternInput_16.data[3]])]), $var1[1]);
          return [patternInput_17[1], patternInput_17[2]];

        case 14:
          return [new List(), emptyL];
      }
    }
  };

  const GlyphOfItem = __exports.GlyphOfItem = function (denv, item) {
    const reprToGlyph = function (repr) {
      switch (repr.tag) {
        case 1:
          return new FSharpGlyph(16);

        case 2:
          return new FSharpGlyph(17);

        case 3:
          const td = repr.data.data[2];

          if (td.IsClass) {
            return new FSharpGlyph(0);
          } else if (td.IsStruct) {
            return new FSharpGlyph(14);
          } else if (td.IsInterface) {
            return new FSharpGlyph(8);
          } else if (td.IsEnum) {
            return new FSharpGlyph(3);
          } else {
            return new FSharpGlyph(2);
          }

        case 4:
          return new FSharpGlyph(15);

        case 5:
          return new FSharpGlyph(15);

        case 6:
          return new FSharpGlyph(0);

        default:
          switch (repr.data.fsobjmodel_kind.tag) {
            case 1:
              return new FSharpGlyph(8);

            case 2:
              return new FSharpGlyph(14);

            case 3:
              return new FSharpGlyph(2);

            case 4:
              return new FSharpGlyph(3);

            default:
              return new FSharpGlyph(0);
          }

      }
    };

    const typeToGlyph = function (typ) {
      if (isAppTy(denv.g, typ)) {
        const tcref = tcrefOfAppTy(denv.g, typ);
        return reprToGlyph(tcref.TypeReprInfo);
      } else if (isStructTupleTy(denv.g, typ)) {
        return new FSharpGlyph(14);
      } else if (isRefTupleTy(denv.g, typ)) {
        return new FSharpGlyph(0);
      } else if (isFunction(denv.g, typ)) {
        return new FSharpGlyph(2);
      } else if (isTyparTy(denv.g, typ)) {
        return new FSharpGlyph(14);
      } else {
        return new FSharpGlyph(15);
      }
    };

    try {
      return function () {
        const $var3 = item.tag === 0 ? [0, item.data] : item.tag === 16 ? [0, item.data[1]] : item.tag === 14 ? item.data[1].tail != null ? [1, item.data[1].head] : [10] : item.tag === 1 ? [2] : item.tag === 3 ? [2] : item.tag === 4 ? [3] : item.tag === 5 ? [4] : item.tag === 7 ? [5] : item.tag === 8 ? [6] : item.tag === 9 ? [7] : item.tag === 11 ? [8] : item.tag === 13 ? [8] : item.tag === 12 ? [8] : item.tag === 15 ? [8] : item.tag === 10 ? forAll(function (minfo) {
          return minfo.IsExtensionMember;
        }, item.data[1]) ? [9, item.data[1]] : [10] : [10];

        switch ($var3[0]) {
          case 0:
            if (isFunction(denv.g, $var3[1].Type)) {
              return new FSharpGlyph(9);
            } else if (CurriedLambda(() => $var3[1].LiteralValue != null)()) {
              return new FSharpGlyph(1);
            } else {
              return new FSharpGlyph(18);
            }

          case 1:
            return typeToGlyph(stripTyEqns(denv.g, $var3[1]));

          case 2:
            return new FSharpGlyph(4);

          case 3:
            return new FSharpGlyph(6);

          case 4:
            return new FSharpGlyph(7);

          case 5:
            return new FSharpGlyph(7);

          case 6:
            return new FSharpGlyph(5);

          case 7:
            return new FSharpGlyph(13);

          case 8:
            return new FSharpGlyph(9);

          case 9:
            return new FSharpGlyph(19);

          case 10:
            const $var4 = item.tag === 10 ? [0] : item.tag === 17 ? [1] : item.tag === 14 ? [1] : item.tag === 22 ? item.data.tail != null ? [2, item.data.head] : [6] : item.tag === 18 ? item.data.tail != null ? [3, item.data.head] : [6] : item.tag === 20 ? [4] : item.tag === 21 ? [5] : [6];

            switch ($var4[0]) {
              case 0:
                return new FSharpGlyph(9);

              case 1:
                return new FSharpGlyph(0);

              case 2:
                if ($var4[1].IsEnumTycon ? true : $var4[1].IsILEnumTycon) {
                  return new FSharpGlyph(3);
                } else if ($var4[1].IsExceptionDecl) {
                  return new FSharpGlyph(6);
                } else if ($var4[1].IsFSharpDelegateTycon) {
                  return new FSharpGlyph(2);
                } else if ($var4[1].IsFSharpInterfaceTycon) {
                  return new FSharpGlyph(8);
                } else if ($var4[1].IsFSharpStructOrEnumTycon) {
                  return new FSharpGlyph(14);
                } else if ($var4[1].IsModule) {
                  return new FSharpGlyph(11);
                } else if ($var4[1].IsNamespace) {
                  return new FSharpGlyph(12);
                } else if ($var4[1].IsUnionTycon) {
                  return new FSharpGlyph(17);
                } else if ($var4[1].IsILTycon) {
                  const patternInput = $var4[1].ILTyconInfo;

                  if (patternInput.data[2].IsInterface) {
                    return new FSharpGlyph(8);
                  } else if (patternInput.data[2].IsDelegate) {
                    return new FSharpGlyph(2);
                  } else if (patternInput.data[2].IsEnum) {
                    return new FSharpGlyph(3);
                  } else if (patternInput.data[2].IsStruct) {
                    return new FSharpGlyph(14);
                  } else {
                    return new FSharpGlyph(0);
                  }
                } else {
                  return new FSharpGlyph(0);
                }

              case 3:
                if ($var4[1].IsNamespace) {
                  return new FSharpGlyph(12);
                } else {
                  return new FSharpGlyph(11);
                }

              case 4:
                return new FSharpGlyph(18);

              case 5:
                return new FSharpGlyph(18);

              case 6:
                return new FSharpGlyph(20);
            }

        }
      }();
    } catch (matchValue) {
      if (matchValue instanceof UnresolvedPathReferenceNoRange) {
        return new FSharpGlyph(0);
      } else {
        throw matchValue;
      }
    }
  };

  const AnotherFlattenItems = __exports.AnotherFlattenItems = function (g, _m, item) {
    switch (item.tag) {
      case 11:
        return map(function (minfo) {
          return new Item(11, [item.data[0], ofArray([minfo])]);
        }, item.data[1]);

      case 12:
      case 13:
        return ofArray([item]);

      case 6:
      case 7:
        return new List();

      case 8:
        return new List();

      case 5:
        if (isFunction(g, item.data.FieldType)) {
          return ofArray([item]);
        } else {
          return new List();
        }

      case 0:
        if (isFunction(g, item.data.Type)) {
          return ofArray([item]);
        } else {
          return new List();
        }

      case 1:
        if (!item.data[0].UnionCase.IsNullary) {
          return ofArray([item]);
        } else {
          return new List();
        }

      case 4:
        if (recdFieldsOfExnDefRef(item.data).tail == null) {
          return new List();
        } else {
          return ofArray([item]);
        }

      case 9:
        const pinfo = item.data[1].head;

        if (pinfo.IsIndexer) {
          return ofArray([item]);
        } else {
          return new List();
        }

      case 10:
        return map(function (minfo_1) {
          return new Item(10, [item.data[0], ofArray([minfo_1]), item.data[2]]);
        }, item.data[1]);

      case 15:
        return ofArray([item]);

      case 17:
        return new List();

      case 16:
        return new List();

      default:
        return new List();
    }
  };

  return __exports;
}({});
export class FSharpDeclarationListItem {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpDeclarationListItem",
      properties: {
        Accessibility: Option(FSharpAccessibility),
        FullName: "string",
        Glyph: FSharpGlyph,
        IsOwnMember: "boolean",
        IsResolved: "boolean",
        Kind: CompletionItemKind,
        MinorPriority: "number",
        Name: "string",
        NameInCode: "string",
        NamespaceToOpen: Option("string")
      }
    };
  }

  constructor(name, nameInCode, fullName, glyph, _info, accessibility, kind, isOwnMember, priority, isResolved, namespaceToOpen) {
    this.name = name;
    this.nameInCode = nameInCode;
    this.fullName = fullName;
    this.glyph = glyph;
    this.accessibility = accessibility;
    this.kind = kind;
    this.isOwnMember = isOwnMember;
    this.priority = priority | 0;
    this.isResolved = isResolved;
    this.namespaceToOpen = namespaceToOpen;
  }

  get Name() {
    return this.name;
  }

  get NameInCode() {
    return this.nameInCode;
  }

  get Glyph() {
    return this.glyph;
  }

  get Accessibility() {
    return this.accessibility;
  }

  get Kind() {
    return this.kind;
  }

  get IsOwnMember() {
    return this.isOwnMember;
  }

  get MinorPriority() {
    return this.priority;
  }

  get FullName() {
    return this.fullName;
  }

  get IsResolved() {
    return this.isResolved;
  }

  get NamespaceToOpen() {
    return this.namespaceToOpen;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpDeclarationListItem", FSharpDeclarationListItem);
export class FSharpDeclarationListInfo {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpDeclarationListInfo",
      properties: {
        Empty: FSharpDeclarationListInfo,
        IsError: "boolean",
        IsForType: "boolean",
        Items: _Array(FSharpDeclarationListItem)
      }
    };
  }

  constructor(declarations, isForType, isError) {
    this.declarations = declarations;
    this.isForType = isForType;
    this.isError = isError;
  }

  get Items() {
    return this.declarations;
  }

  get IsForType() {
    return this.isForType;
  }

  get IsError() {
    return this.isError;
  }

  static Create(infoReader, m, denv, getAccessibility, items, reactor, currentNamespaceOrModule, isAttributeApplicationContext, checkAlive) {
    const g = infoReader.g;
    const isForType = exists(function (x) {
      return CurriedLambda(() => x.Type != null)();
    }, items);

    const items_1 = function (arg10_) {
      return SymbolHelpers.RemoveExplicitlySuppressedCompletionItems(g, arg10_);
    }(items);

    const tyconRefOptEq = function (tref1, tref2) {
      const matchValue = [tref1, tref2];

      if (matchValue[0] != null) {
        const tref1_1 = getValue(matchValue[0]);
        return tyconRefEq(g, tref1_1, matchValue[1]);
      } else {
        return false;
      }
    };

    const patternInput = fold(function (tupledArg, x_1) {
      if (x_1.MinorPriority === tupledArg[0]) {
        return [tupledArg[0], tupledArg[1], new List(x_1, tupledArg[2])];
      } else {
        const normalizedPrior = tupledArg[1] + 1 | 0;
        return [x_1.MinorPriority, normalizedPrior, new List(new CompletionItem(x_1.ItemWithInst, x_1.Kind, x_1.IsOwnMember, normalizedPrior, x_1.Type, x_1.Unresolved), tupledArg[2])];
      }
    }, [0, 0, new List()], toList(sortWith(($var6, $var7) => compare(function (x_2) {
      return x_2.MinorPriority;
    }($var6), function (x_2) {
      return x_2.MinorPriority;
    }($var7)), map(function (x_3) {
      const matchValue_1 = x_3.Item;
      const $var5 = matchValue_1.tag === 14 ? matchValue_1.data[1].tail != null ? matchValue_1.data[1].head.tag === 1 ? [0, matchValue_1.data[1].head.data[0]] : [6] : [6] : matchValue_1.tag === 12 ? matchValue_1.data.tag === 1 ? [1, matchValue_1.data.data[0]] : [6] : matchValue_1.tag === 13 ? matchValue_1.data.tag === 1 ? [1, matchValue_1.data.data[0]] : [6] : matchValue_1.tag === 11 ? matchValue_1.data[1].tail != null ? [2, matchValue_1.data[1].head] : [6] : matchValue_1.tag === 10 ? matchValue_1.data[1].tail != null ? [3, matchValue_1.data[1].head] : [6] : matchValue_1.tag === 9 ? matchValue_1.data[1].tail != null ? [4, matchValue_1.data[1].head] : [6] : matchValue_1.tag === 7 ? [5, matchValue_1.data] : [6];

      switch ($var5[0]) {
        case 0:
          const MinorPriority = 1 + $var5[1].TyparsNoRange.length | 0;
          return new CompletionItem(x_3.ItemWithInst, x_3.Kind, x_3.IsOwnMember, MinorPriority, x_3.Type, x_3.Unresolved);

        case 1:
          const MinorPriority_1 = 1000 + $var5[1].TyparsNoRange.length | 0;
          return new CompletionItem(x_3.ItemWithInst, x_3.Kind, x_3.IsOwnMember, MinorPriority_1, x_3.Type, x_3.Unresolved);

        case 2:
          const MinorPriority_2 = 1000 + 10 * $var5[1].DeclaringTyconRef.TyparsNoRange.length | 0;
          return new CompletionItem(x_3.ItemWithInst, x_3.Kind, x_3.IsOwnMember, MinorPriority_2, x_3.Type, x_3.Unresolved);

        case 3:
          const IsOwnMember = tyconRefOptEq(x_3.Type, $var5[1].DeclaringTyconRef);
          return new CompletionItem(x_3.ItemWithInst, x_3.Kind, IsOwnMember, x_3.MinorPriority, x_3.Type, x_3.Unresolved);

        case 4:
          const IsOwnMember_1 = tyconRefOptEq(x_3.Type, $var5[1].DeclaringTyconRef);
          return new CompletionItem(x_3.ItemWithInst, x_3.Kind, IsOwnMember_1, x_3.MinorPriority, x_3.Type, x_3.Unresolved);

        case 5:
          const IsOwnMember_2 = tyconRefOptEq(x_3.Type, $var5[1].DeclaringTyconRef);
          return new CompletionItem(x_3.ItemWithInst, x_3.Kind, IsOwnMember_2, x_3.MinorPriority, x_3.Type, x_3.Unresolved);

        case 6:
          return x_3;
      }
    }, items_1))));

    if (verbose) {
      dprintf(printf("service.ml: mkDecls: %d found groups after filtering\n"))(patternInput[2].length);
    }

    const items_2 = map(function (tupledArg_1) {
      const item = tupledArg_1[1].head;
      const name = item.Unresolved == null ? item.Item.DisplayName : getValue(item.Unresolved).DisplayName;
      return [name, tupledArg_1[1]];
    }, groupBy(function (x_4) {
      return x_4.Unresolved == null ? x_4.Item.DisplayName : getValue(x_4.Unresolved).Namespace.length === 0 ? getValue(x_4.Unresolved).DisplayName : join(".", getValue(x_4.Unresolved).Namespace) + "." + getValue(x_4.Unresolved).DisplayName;
    }, function (arg10__1) {
      return SymbolHelpers.RemoveDuplicateCompletionItems(g, arg10__1);
    }(toList(sortWith(($var8, $var9) => compare(function (x_5) {
      return CurriedLambda(() => x_5.Unresolved != null)();
    }($var8), function (x_5) {
      return CurriedLambda(() => x_5.Unresolved != null)();
    }($var9)), reverse(patternInput[2]))))));
    let items_3;

    const isOperatorItem = function (tupledArg_2) {
      const matchValue_2 = map(function (x_6) {
        return x_6.Item;
      }, tupledArg_2[1]);
      const $var10 = matchValue_2.tail != null ? matchValue_2.head.tag === 0 ? matchValue_2.tail.tail == null ? [0] : [1] : matchValue_2.head.tag === 10 ? matchValue_2.tail.tail == null ? [0] : [1] : matchValue_2.head.tag === 1 ? matchValue_2.tail.tail == null ? [0] : [1] : [1] : [1];

      switch ($var10[0]) {
        case 0:
          return IsOperatorName(tupledArg_2[0]);

        case 1:
          return false;
      }
    };

    const isFSharpList = function (name_1) {
      return name_1 === "[]";
    };

    items_3 = filter(function (tupledArg_3) {
      return !isOperatorItem([tupledArg_3[0], tupledArg_3[1]]) ? !isFSharpList(tupledArg_3[0]) : false;
    }, items_2);
    const decls = map(function (tupledArg_4) {
      if (tupledArg_4[1].tail == null) {
        throw new Error("Unexpected empty bag");
      } else {
        let items_4;
        const matchValue_3 = partition(function (x_7) {
          return CurriedLambda(() => x_7.Unresolved == null)();
        }, tupledArg_4[1]);

        if (matchValue_3[0].tail == null) {
          items_4 = matchValue_3[1];
        } else {
          items_4 = matchValue_3[0];
        }

        const item_1 = items_4.head;
        const glyph = DescriptionListsImpl.GlyphOfItem(denv, item_1.Item);
        let patternInput_1;

        if (tupledArg_4[0].indexOf("( ") === 0 ? endsWith(tupledArg_4[0], " )") : false) {
          const cleanName = tupledArg_4[0].slice(2, tupledArg_4[0].length - 3 + 1);
          patternInput_1 = [cleanName, IsOperatorName(tupledArg_4[0]) ? cleanName : "``" + cleanName + "``"];
        } else {
          patternInput_1 = [tupledArg_4[0], item_1.Unresolved == null ? Keywords.QuoteIdentifierIfNeeded(tupledArg_4[0]) : tupledArg_4[0]];
        }

        const isAttribute = SymbolHelpers.IsAttribute(infoReader, item_1.Item);

        const cutAttributeSuffix = function (name_2) {
          if (((isAttributeApplicationContext ? isAttribute : false) ? name_2 !== "Attribute" : false) ? endsWith(name_2, "Attribute") : false) {
            return name_2.slice(0, name_2.length - "Attribute".length - 1 + 1);
          } else {
            return name_2;
          }
        };

        const name_3 = cutAttributeSuffix(patternInput_1[0]);
        const nameInCode = cutAttributeSuffix(patternInput_1[1]);
        const fullName = SymbolHelpers.FullNameOfItem(g, item_1.Item);
        const namespaceToOpen = defaultArg(defaultArg(defaultArg(defaultArg(item_1.Unresolved, null, function (x_8) {
          return x_8.Namespace;
        }), null, function (ns_1) {
          return _Array_1.startsWith(["Microsoft", "FSharp"], ns_1) ? null : ns_1;
        }), null, function (ns) {
          return currentNamespaceOrModule == null ? ns : function (whole) {
            return _Array_1.startsWith(getValue(currentNamespaceOrModule), whole);
          }(ns) ? ns.slice(getValue(currentNamespaceOrModule).length, ns.length) : ns;
        }), null, function (_arg1) {
          return _arg1.length === 0 ? null : join(".", _arg1);
        });
        return new FSharpDeclarationListItem(name_3, nameInCode, fullName, glyph, new Choice(0, [items_4, infoReader, m, denv, reactor, checkAlive]), getAccessibility(item_1.Item), item_1.Kind, item_1.IsOwnMember, item_1.MinorPriority, CurriedLambda(() => item_1.Unresolved == null)(), namespaceToOpen);
      }
    }, items_3);
    return new FSharpDeclarationListInfo(Array.from(decls), isForType, false);
  }

  static Error(msg) {
    return new FSharpDeclarationListInfo([new FSharpDeclarationListItem("<Note>", "<Note>", "<Note>", new FSharpGlyph(20), new Choice(1, new FSharpToolTipText(0, ofArray([new FSharpToolTipElement(2, msg)]))), null, new CompletionItemKind(5), false, 0, false, null)], false, true);
  }

  static get Empty() {
    return new FSharpDeclarationListInfo([], false, false);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpDeclarationListInfo", FSharpDeclarationListInfo);
export class FSharpMethodGroupItem {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMethodGroupItem",
      properties: {
        Description: makeGeneric(FSharpToolTipText, {
          T: "string"
        }),
        HasParamArrayArg: "boolean",
        HasParameters: "boolean",
        Parameters: _Array(FSharpMethodGroupItemParameter),
        ReturnTypeText: "string",
        StaticParameters: _Array(FSharpMethodGroupItemParameter),
        StructuredDescription: makeGeneric(FSharpToolTipText, {
          T: Layout
        }),
        StructuredReturnTypeText: Layout,
        XmlDoc: FSharpXmlDoc
      }
    };
  }

  constructor(description, xmlDoc, returnType, parameters, hasParameters, hasParamArrayArg, staticParameters) {
    this.description = description;
    this.xmlDoc = xmlDoc;
    this.returnType = returnType;
    this.parameters = parameters;
    this.hasParameters = hasParameters;
    this.hasParamArrayArg = hasParamArrayArg;
    this.staticParameters = staticParameters;
  }

  get StructuredDescription() {
    return this.description;
  }

  get Description() {
    return Tooltips.ToFSharpToolTipText(this.description);
  }

  get XmlDoc() {
    return this.xmlDoc;
  }

  get StructuredReturnTypeText() {
    return this.returnType;
  }

  get ReturnTypeText() {
    return showL(this.returnType);
  }

  get Parameters() {
    return this.parameters;
  }

  get HasParameters() {
    return this.hasParameters;
  }

  get HasParamArrayArg() {
    return this.hasParamArrayArg;
  }

  get StaticParameters() {
    return this.staticParameters;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMethodGroupItem", FSharpMethodGroupItem);
export class FSharpMethodGroup {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMethodGroup",
      properties: {
        MethodName: "string",
        Methods: _Array(FSharpMethodGroupItem)
      }
    };
  }

  constructor(name, unsortedMethods) {
    this.name = name;
    this.methods = Array.from(sortWith(($var11, $var12) => compare((meth => {
      const parms = meth.Parameters;
      return [parms.length, map_1(p => p.CanonicalTypeTextForSorting, parms, Array)];
    })($var11), (meth => {
      const parms = meth.Parameters;
      return [parms.length, map_1(p => p.CanonicalTypeTextForSorting, parms, Array)];
    })($var12)), map_1(meth_1 => {
      const parms_1 = meth_1.Parameters;

      if (parms_1.length === 1 ? parms_1[0].CanonicalTypeTextForSorting === "Microsoft.FSharp.Core.Unit" : false) {
        return new FSharpMethodGroupItem(meth_1.StructuredDescription, meth_1.XmlDoc, meth_1.StructuredReturnTypeText, [], true, meth_1.HasParamArrayArg, meth_1.StaticParameters);
      } else {
        return meth_1;
      }
    }, unsortedMethods, Array)));
  }

  get MethodName() {
    return this.name;
  }

  get Methods() {
    return this.methods;
  }

  static Create(infoReader, m, denv, items) {
    const g = infoReader.g;

    if (items.tail == null) {
      return new FSharpMethodGroup("", []);
    } else {
      const name = items.head.Item.DisplayName;
      const methods_1 = Array.from(delay(function () {
        return collect(function (item) {
          const flatItems = DescriptionListsImpl.AnotherFlattenItems(g, m, item.Item);
          const methods = map_1(function (flatItem) {
            const patternInput = function (arg00, arg10, arg20) {
              return ErrorScope.Protect(arg00, arg10, arg20);
            }(m, function () {
              return DescriptionListsImpl.PrettyParamsAndReturnTypeOfItem(infoReader, m, denv, new ItemWithInst(flatItem, item.TyparInst));
            }, function (err) {
              return [new List(), wordL(TaggedTextOps.tagText(err))];
            });

            const description = new FSharpToolTipText(0, ofArray([SymbolHelpers.FormatStructuredDescriptionOfItem(true, infoReader, m, denv, new ItemWithInst(flatItem, item.TyparInst))]));
            let hasParamArrayArg;
            const $var13 = flatItem.tag === 11 ? flatItem.data[1].tail != null ? flatItem.data[1].tail.tail == null ? [0, flatItem.data[1].head] : [1] : [1] : flatItem.tag === 10 ? flatItem.data[1].tail != null ? flatItem.data[1].tail.tail == null ? [0, flatItem.data[1].head] : [1] : [1] : [1];

            switch ($var13[0]) {
              case 0:
                hasParamArrayArg = $var13[1].HasParamArrayArg(infoReader.amap, m, $var13[1].FormalMethodInst);
                break;

              case 1:
                hasParamArrayArg = false;
                break;
            }

            return new FSharpMethodGroupItem(description, SymbolHelpers.GetXmlCommentForItem(infoReader, m, flatItem), patternInput[1], Array.from(patternInput[0]), true, hasParamArrayArg, []);
          }, Array.from(flatItems), Array);
          return methods;
        }, items);
      }));
      return new FSharpMethodGroup(name, methods_1);
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMethodGroup", FSharpMethodGroup);