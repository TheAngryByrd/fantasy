import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { toString, equalsRecords, Option, makeGeneric, Tuple, comparePrimitives } from "../fable-core/Util";
import { mkLocalTyconRef, mkTyparTy, ValReprInfoModule, TType, Typar, EntityRef } from "./tast";
import { SynInfo, mkSynId, Ident } from "./ast";
import { append, mapIndexed, filter, map, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { ReparentSlotSigToUseMethodTypars, ValRef$2E$get_IsVirtualMember as ValRef_get_IsVirtualMember, AllowMultiIntfInstantiations, AllInterfacesOfType, GetSuperTypeOfType, ExistsHeadTypeInEntireHierarchy, ValRef$2E$IsFSharpEventProperty as ValRef_IsFSharpEventProperty, ValRef$2E$get_IsDispatchSlotMember as ValRef_get_IsDispatchSlotMember, CompiledSigOfMeth, PropInfo, MethInfo } from "./infos";
import _Map from "../fable-core/Map";
import { range } from "./range";
import { Entity$2E$HasOverride as Entity_HasOverride, Entity$2E$HasInterface as Entity_HasInterface, tyconRefEq, isAppTy, TyconRefMap, generalizedTyconRef, typarsAEquiv, isTyparTy, returnTypesAEquiv, typeAEquiv, TypeEquivEnv, destTyparTy, tcrefOfAppTy, CompileAsEvent, GetMemberTypeInMemberForm, typeEquiv, isInterfaceTy, ValRefIsExplicitImpl, instType, PartitionValRefTypars, GetTypeOfMemberInMemberForm, GetFSharpViewOfReturnType, DisplayEnv } from "./TastOps";
import { TcGlobals } from "./TcGlobals";
import { ImportMap } from "./import";
import { NameMultiMapModule, List as List_1 } from "../absil/illib";
import { bufferL } from "./layout";
import { minimalStringOfType, stringOfMethInfo, prettyLayoutOfMemberSig } from "./NicePrint";
import { ListSet, map2Of2, bufs } from "./lib";
import { warning, errorRecovery, errorR, InternalError, Error as _Error, error } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import { defaultArg, getValue } from "../fable-core/Option";
import { TypesFeasiblyEquiv, CanCoerce, TypeFeasiblySubsumesType, destTopLambda } from "./TypeRelations";
import { append as append_1, forAll, zip, singleton, fold, empty, collect, delay, toList, map as map_1, iterate, exists, forAll2 } from "../fable-core/Seq";
import { ItemOccurence, CallNameResolutionSink, Item } from "./NameResolution";
import { AccessorDomain } from "./AccessibilityLogic";
import { join, printf, toText } from "../fable-core/String";
import CurriedLambda from "../fable-core/CurriedLambda";
import { GetIntrinsicPropInfosOfType, GetIntrinsicMethInfosOfType, FindMemberFlag, GetImmediateIntrinsicMethInfosOfType } from "./InfoReader";
import { CheckAugmentationAttribs, TyconIsCandidateForAugmentationWithEquals } from "./AugmentWithHashCompare";
export class OverrideCanImplement {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodOverrides.OverrideCanImplement",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CanImplementAnyInterfaceSlot"], ["CanImplementAnyClassHierarchySlot"], ["CanImplementAnySlot"], ["CanImplementNoSlots"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.MethodOverrides.OverrideCanImplement", OverrideCanImplement);
export class OverrideInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodOverrides.OverrideInfo",
      interfaces: ["FSharpUnion"],
      cases: [["Override", OverrideCanImplement, EntityRef, Ident, Tuple([makeGeneric(List, {
        T: Typar
      }), makeGeneric(List, {
        T: Tuple([Typar, TType])
      })]), makeGeneric(List, {
        T: makeGeneric(List, {
          T: TType
        })
      }), Option(TType), "boolean", "boolean"]]
    };
  }

  get CanImplement() {
    return this.data[0];
  }

  get BoundingTyconRef() {
    return this.data[1];
  }

  get LogicalName() {
    return this.data[2].idText;
  }

  get Range() {
    return this.data[2].idRange;
  }

  get IsFakeEventProperty() {
    return this.data[6];
  }

  get ArgTypes() {
    return this.data[4];
  }

  get ReturnType() {
    return this.data[5];
  }

  get IsCompilerGenerated() {
    return this.data[7];
  }

}
setType("Microsoft.FSharp.Compiler.MethodOverrides.OverrideInfo", OverrideInfo);
export class RequiredSlot {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodOverrides.RequiredSlot",
      interfaces: ["FSharpUnion"],
      cases: [["RequiredSlot", MethInfo, "boolean"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.MethodOverrides.RequiredSlot", RequiredSlot);
export class SlotImplSet {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodOverrides.SlotImplSet",
      interfaces: ["FSharpUnion"],
      cases: [["SlotImplSet", makeGeneric(List, {
        T: RequiredSlot
      }), makeGeneric(_Map, {
        Key: "string",
        Value: makeGeneric(List, {
          T: RequiredSlot
        })
      }), makeGeneric(List, {
        T: OverrideInfo
      }), makeGeneric(List, {
        T: PropInfo
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.MethodOverrides.SlotImplSet", SlotImplSet);
export class TypeIsImplicitlyAbstract extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, TypeIsImplicitlyAbstract.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodOverrides.TypeIsImplicitlyAbstract",
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
setType("Microsoft.FSharp.Compiler.MethodOverrides.TypeIsImplicitlyAbstract", TypeIsImplicitlyAbstract);
export class OverrideDoesntOverride extends Error {
  constructor(data0, data1, data2, data3, data4, data5) {
    super();
    Object.setPrototypeOf(this, OverrideDoesntOverride.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
    this.Data5 = data5;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.MethodOverrides.OverrideDoesntOverride",
      interfaces: ["FSharpException"],
      properties: {
        Data0: DisplayEnv,
        Data1: OverrideInfo,
        Data2: Option(MethInfo),
        Data3: TcGlobals,
        Data4: ImportMap,
        Data5: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.MethodOverrides.OverrideDoesntOverride", OverrideDoesntOverride);
export const DispatchSlotChecking = function (__exports) {
  const PrintOverrideToBuffer = __exports.PrintOverrideToBuffer = function (denv, os, _arg1) {
    const mtps = _arg1.data[3][0];
    const memberToParentInst = _arg1.data[3][1];
    const denv_1 = new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, true, denv.showImperativeTyparAnnotations, denv.suppressInlineKeyword, denv.suppressMutableKeyword, denv.showMemberContainers, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, denv.showConstraintTyparAnnotations, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout);
    const retTy = GetFSharpViewOfReturnType(denv_1.g, _arg1.data[5]);
    const argInfos = _arg1.data[4].tail == null ? ofArray([ofArray([[denv_1.g.unit_ty, ValReprInfoModule.unnamedTopArg1]])]) : List_1.mapSquared(function (ty) {
      return [ty, ValReprInfoModule.unnamedTopArg1];
    }, _arg1.data[4]);
    bufferL(os, prettyLayoutOfMemberSig(denv_1, memberToParentInst, _arg1.data[2].idText, mtps, argInfos, retTy));
  };

  const PrintMethInfoSigToBuffer = __exports.PrintMethInfoSigToBuffer = function (g, amap, m, denv, os, minfo) {
    const denv_1 = new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, true, denv.showImperativeTyparAnnotations, denv.suppressInlineKeyword, denv.suppressMutableKeyword, denv.showMemberContainers, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, denv.showConstraintTyparAnnotations, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout);
    const patternInput = CompiledSigOfMeth(g, amap, m, minfo);

    const retTy = function (arg10_) {
      return GetFSharpViewOfReturnType(g, arg10_);
    }(patternInput.data[1]);

    const argInfos = List_1.mapSquared(function (ty) {
      return [ty, ValReprInfoModule.unnamedTopArg1];
    }, patternInput.data[0]);
    const nm = minfo.LogicalName;
    bufferL(os, prettyLayoutOfMemberSig(denv_1, patternInput.data[3], nm, patternInput.data[2], argInfos, retTy));
  };

  const FormatOverride = __exports.FormatOverride = function (denv, d) {
    return bufs(function (buf) {
      PrintOverrideToBuffer(denv, buf, d);
    });
  };

  const FormatMethInfoSig = __exports.FormatMethInfoSig = function (g, amap, m, denv, d) {
    return bufs(function (buf) {
      PrintMethInfoSigToBuffer(g, amap, m, denv, buf, d);
    });
  };

  const GetInheritedMemberOverrideInfo = __exports.GetInheritedMemberOverrideInfo = function (g, amap, m, parentType, minfo) {
    const nm = minfo.LogicalName;
    const patternInput = CompiledSigOfMeth(g, amap, m, minfo);
    const isFakeEventProperty = minfo.IsFSharpEventPropertyMethod;
    return new OverrideInfo(0, [parentType, minfo.ApparentEnclosingTyconRef, mkSynId(m, nm), [patternInput.data[2], patternInput.data[3]], patternInput.data[0], patternInput.data[1], isFakeEventProperty, false]);
  };

  const GetTypeMemberOverrideInfo = __exports.GetTypeMemberOverrideInfo = function (g, reqdTy, overrideBy) {
    const patternInput = GetTypeOfMemberInMemberForm(g, overrideBy);
    const nm = overrideBy.LogicalName;
    const argTys = List_1.mapSquared(function (tuple) {
      return tuple[0];
    }, patternInput[1]);
    let patternInput_1;
    const matchValue = PartitionValRefTypars(g, overrideBy);

    if (matchValue == null) {
      patternInput_1 = error(new _Error(SR.typrelMethodIsOverconstrained(), overrideBy.Range));
    } else {
      const memberToParentInst = getValue(matchValue)[3];
      const memberMethodTypars = getValue(matchValue)[2];
      const _tinst = getValue(matchValue)[4];
      const argTys_1 = List_1.mapSquared(function (arg10_) {
        return instType(memberToParentInst, arg10_);
      }, argTys);
      const retTy = defaultArg(patternInput[2], null, function (arg10__1) {
        return instType(memberToParentInst, arg10__1);
      });
      patternInput_1 = [memberMethodTypars, memberToParentInst, argTys_1, retTy];
    }

    let implKind;

    if (ValRefIsExplicitImpl(g, overrideBy)) {
      let belongsToReqdTy;
      const matchValue_1 = getValue(overrideBy.MemberInfo).ImplementedSlotSigs;

      if (matchValue_1.tail != null) {
        if (isInterfaceTy(g, matchValue_1.head.ImplementedType)) {
          belongsToReqdTy = typeEquiv(g, reqdTy, matchValue_1.head.ImplementedType);
        } else {
          belongsToReqdTy = false;
        }
      } else {
        belongsToReqdTy = false;
      }

      if (belongsToReqdTy) {
        implKind = new OverrideCanImplement(0);
      } else {
        implKind = new OverrideCanImplement(3);
      }
    } else if (ValRef_get_IsDispatchSlotMember.bind(overrideBy)()) {
      implKind = new OverrideCanImplement(3);
    } else {
      implKind = new OverrideCanImplement(1);
    }

    const isFakeEventProperty = ValRef_IsFSharpEventProperty.bind(overrideBy)(g);
    return new OverrideInfo(0, [implKind, overrideBy.MemberApparentEntity, mkSynId(overrideBy.Range, nm), [patternInput_1[0], patternInput_1[1]], patternInput_1[2], patternInput_1[3], isFakeEventProperty, overrideBy.IsCompilerGenerated]);
  };

  const GetObjectExprOverrideInfo = __exports.GetObjectExprOverrideInfo = function (g, amap, implty, id, memberFlags, ty, arityInfo, bindingAttribs, rhsExpr) {
    const patternInput = GetMemberTypeInMemberForm(g, memberFlags, arityInfo, ty, id.idRange);
    const argTys = List_1.mapSquared(function (tuple) {
      return tuple[0];
    }, patternInput[1]);
    const patternInput_1 = destTopLambda(g, amap, arityInfo, rhsExpr, ty);
    const $var1 = patternInput_1[3].tail != null ? patternInput_1[3].head.tail != null ? patternInput_1[3].head.tail.tail == null ? [0, patternInput_1[3].head.head, patternInput_1[3].tail] : [1] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        const vs = ($var1[2].length === 1 ? patternInput[1].tail == null : false) ? new List() : $var1[2];
        const implKind = isInterfaceTy(g, implty) ? new OverrideCanImplement(0) : new OverrideCanImplement(1);
        const isFakeEventProperty = CompileAsEvent(g, bindingAttribs);
        const overrideByInfo = new OverrideInfo(0, [implKind, tcrefOfAppTy(g, implty), id, [patternInput[0], new List()], argTys, patternInput[2], isFakeEventProperty, false]);
        return [overrideByInfo, [patternInput_1[2], $var1[1], vs, bindingAttribs, patternInput_1[4]]];

      case 1:
        return error(new InternalError("Unexpected shape for object expression override", id.idRange));
    }
  };

  const IsNameMatch = __exports.IsNameMatch = function (dispatchSlot, overrideBy) {
    return overrideBy.LogicalName === dispatchSlot.LogicalName;
  };

  const IsImplMatch = __exports.IsImplMatch = function (g, dispatchSlot, overrideBy) {
    const matchValue = overrideBy.CanImplement;

    if (matchValue.tag === 2) {
      return true;
    } else if (matchValue.tag === 1) {
      return !isInterfaceTy(g, dispatchSlot.ApparentEnclosingType);
    } else if (matchValue.tag === 0) {
      return isInterfaceTy(g, dispatchSlot.ApparentEnclosingType);
    } else {
      return false;
    }
  };

  const IsTyparKindMatch = __exports.IsTyparKindMatch = function (g, amap, m, dispatchSlot, _arg1) {
    const mtps = _arg1.data[3][0];
    const patternInput = CompiledSigOfMeth(g, amap, m, dispatchSlot);
    return List_1.lengthsEqAndForall2(function (tp1, tp2) {
      return tp1.Kind.Equals(tp2.Kind);
    }, mtps, patternInput.data[2]);
  };

  const IsPartialMatch = __exports.IsPartialMatch = function (g, amap, m, dispatchSlot, _arg1) {
    const mtps = _arg1.data[3][0];

    if (IsNameMatch(dispatchSlot, _arg1)) {
      const patternInput = CompiledSigOfMeth(g, amap, m, dispatchSlot);

      if ((mtps.length === patternInput.data[2].length ? IsTyparKindMatch(g, amap, m, dispatchSlot, _arg1) : false) ? _arg1.data[4].length === patternInput.data[0].length : false) {
        return IsImplMatch(g, dispatchSlot, _arg1);
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const ReverseTyparRenaming = __exports.ReverseTyparRenaming = function (g, tinst) {
    return map(function (tupledArg) {
      return [destTyparTy(g, tupledArg[1]), mkTyparTy(tupledArg[0])];
    }, tinst);
  };

  const ComposeTyparInsts = __exports.ComposeTyparInsts = function (inst1, inst2) {
    var f;
    return map((f = function (arg10_) {
      return instType(inst2, arg10_);
    }, function (tupledArg) {
      return map2Of2(f, tupledArg[0], tupledArg[1]);
    }), inst1);
  };

  const IsExactMatch = __exports.IsExactMatch = function (g, amap, m, dispatchSlot, _arg1) {
    var p;
    const mtps = _arg1.data[3][0];
    const mtpinst = _arg1.data[3][1];

    if (IsPartialMatch(g, amap, m, dispatchSlot, _arg1)) {
      const patternInput = CompiledSigOfMeth(g, amap, m, dispatchSlot);

      const aenv = function (arg00, arg10) {
        return TypeEquivEnv.FromEquivTypars(arg00, arg10);
      }(patternInput.data[2], mtps);

      if (forAll2((p = function (arg20_, arg30_) {
        return typeAEquiv(g, aenv, arg20_, arg30_);
      }, function (l1, l2) {
        return List_1.lengthsEqAndForall2(p, l1, l2);
      }), patternInput.data[0], _arg1.data[4]) ? returnTypesAEquiv(g, aenv, patternInput.data[1], _arg1.data[5]) : false) {
        const ttpinst = exists($var3 => function (value) {
          return !value;
        }(($var2 => function (arg10_) {
          return isTyparTy(g, arg10_);
        }(function (tuple) {
          return tuple[1];
        }($var2)))($var3)), mtpinst) ? patternInput.data[3] : ComposeTyparInsts(patternInput.data[3], ReverseTyparRenaming(g, mtpinst));
        const aenv_1 = TypeEquivEnv.FromTyparInst(ttpinst);
        return typarsAEquiv(g, aenv_1, patternInput.data[2], mtps);
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const OverrideImplementsDispatchSlot = __exports.OverrideImplementsDispatchSlot = function (g, amap, m, dispatchSlot, availPriorOverride) {
    if (IsExactMatch(g, amap, m, dispatchSlot, availPriorOverride)) {
      return ExistsHeadTypeInEntireHierarchy(g, amap, m, generalizedTyconRef(availPriorOverride.BoundingTyconRef), dispatchSlot.DeclaringTyconRef);
    } else {
      return false;
    }
  };

  const DispatchSlotIsAlreadyImplemented = __exports.DispatchSlotIsAlreadyImplemented = function (g, amap, m, availPriorOverridesKeyed, dispatchSlot) {
    return exists(function (availPriorOverride) {
      return OverrideImplementsDispatchSlot(g, amap, m, dispatchSlot, availPriorOverride);
    }, NameMultiMapModule.find(dispatchSlot.LogicalName, availPriorOverridesKeyed));
  };

  const CheckDispatchSlotsAreImplemented = __exports.CheckDispatchSlotsAreImplemented = function (denv, g, amap, m, nenv, sink, isOverallTyAbstract, reqdTy, dispatchSlots, availPriorOverrides, overrides) {
    const isReqdTyInterface = isInterfaceTy(g, reqdTy);
    const showMissingMethodsAndRaiseErrors = isReqdTyInterface ? true : !isOverallTyAbstract;
    const res = {
      contents: true
    };

    const fail = function (exn) {
      res.contents = false;

      if (showMissingMethodsAndRaiseErrors) {
        errorR(exn);
      }
    };

    const availPriorOverridesKeyed = NameMultiMapModule.initBy(function (ov) {
      return ov.LogicalName;
    }, availPriorOverrides);
    const overridesKeyed = NameMultiMapModule.initBy(function (ov_1) {
      return ov_1.LogicalName;
    }, overrides);
    iterate(function (_arg3) {
      const matchValue = filter(function (availPriorOverride) {
        return OverrideImplementsDispatchSlot(g, amap, m, _arg3.data[0], availPriorOverride);
      }, NameMultiMapModule.find(_arg3.data[0].LogicalName, overridesKeyed));

      if (matchValue.tail == null) {
        if (!_arg3.data[1] ? !DispatchSlotIsAlreadyImplemented(g, amap, m, availPriorOverridesKeyed, _arg3.data[0]) : false) {
          const patternInput = CompiledSigOfMeth(g, amap, m, _arg3.data[0]);

          const noimpl = function () {
            if (isReqdTyInterface) {
              fail(new _Error(SR.typrelNoImplementationGivenWithSuggestion(stringOfMethInfo(amap, m, denv, _arg3.data[0])), m));
            } else {
              fail(new _Error(SR.typrelNoImplementationGiven(stringOfMethInfo(amap, m, denv, _arg3.data[0])), m));
            }
          };

          const matchValue_1 = filter(function (arg40_) {
            return IsPartialMatch(g, amap, m, _arg3.data[0], arg40_);
          }, overrides);

          if (matchValue_1.tail != null) {
            if (matchValue_1.tail.tail == null) {
              if (exists(function (_arg2) {
                return OverrideImplementsDispatchSlot(g, amap, m, _arg2.data[0], matchValue_1.head);
              }, dispatchSlots)) {
                noimpl();
              }
            } else {
              fail(new _Error(SR.typrelOverrideWasAmbiguous(FormatMethInfoSig(g, amap, m, denv, _arg3.data[0])), m));
            }
          } else {
            const possibleOverrides = filter(function (overrideBy) {
              return IsNameMatch(_arg3.data[0], overrideBy) ? IsImplMatch(g, _arg3.data[0], overrideBy) : false;
            }, overrides);

            if (possibleOverrides.tail != null) {
              if (possibleOverrides.tail.tail == null) {
                const moreThanOnePossibleDispatchSlot = !(() => {
                  const $var4 = filter(function (_arg1) {
                    return IsNameMatch(_arg1.data[0], possibleOverrides.head) ? IsImplMatch(g, _arg1.data[0], possibleOverrides.head) : false;
                  }, dispatchSlots);
                  const $var5 = $var4.tail != null ? $var4.tail.tail == null ? [0] : [1] : [0];

                  switch ($var5[0]) {
                    case 0:
                      return true;

                    case 1:
                      return false;
                  }
                })();

                if (moreThanOnePossibleDispatchSlot) {} else if (possibleOverrides.head.data[4].length !== patternInput.data[0].length) {
                  fail(new _Error(SR.typrelMemberDoesNotHaveCorrectNumberOfArguments(FormatOverride(denv, possibleOverrides.head), FormatMethInfoSig(g, amap, m, denv, _arg3.data[0])), possibleOverrides.head.Range));
                } else if (possibleOverrides.head.data[3][0].length !== patternInput.data[2].length) {
                  fail(new _Error(SR.typrelMemberDoesNotHaveCorrectNumberOfTypeParameters(FormatOverride(denv, possibleOverrides.head), FormatMethInfoSig(g, amap, m, denv, _arg3.data[0])), possibleOverrides.head.Range));
                } else if (!IsTyparKindMatch(g, amap, m, _arg3.data[0], possibleOverrides.head)) {
                  fail(new _Error(SR.typrelMemberDoesNotHaveCorrectKindsOfGenericParameters(FormatOverride(denv, possibleOverrides.head), FormatMethInfoSig(g, amap, m, denv, _arg3.data[0])), possibleOverrides.head.Range));
                } else {
                  fail(new _Error(SR.typrelMemberCannotImplement(FormatOverride(denv, possibleOverrides.head), stringOfMethInfo(amap, m, denv, _arg3.data[0]), FormatMethInfoSig(g, amap, m, denv, _arg3.data[0])), possibleOverrides.head.Range));
                }
              } else {
                errorR(new _Error(SR.typrelOverloadNotFound(FormatMethInfoSig(g, amap, m, denv, _arg3.data[0]), FormatMethInfoSig(g, amap, m, denv, _arg3.data[0])), possibleOverrides.head.Range));
              }
            } else {
              noimpl();
            }
          }
        }
      } else if (matchValue.tail.tail == null) {
        if (!matchValue.head.IsCompilerGenerated) {
          const item = new Item(10, [matchValue.head.LogicalName, ofArray([_arg3.data[0]]), null]);
          CallNameResolutionSink(sink, matchValue.head.Range, nenv, item, item, _arg3.data[0].FormalMethodTyparInst, new ItemOccurence(5), denv, new AccessorDomain(3));
        }

        sink;
      } else {
        fail(new _Error(SR.typrelMoreThenOneOverride(FormatMethInfoSig(g, amap, m, denv, _arg3.data[0])), m));
      }
    }, dispatchSlots);
    return res.contents;
  };

  const CheckOverridesAreAllUsedOnce = __exports.CheckOverridesAreAllUsedOnce = function (denv, g, amap, isObjExpr, reqdTy, dispatchSlotsKeyed, availPriorOverrides, overrides) {
    const availPriorOverridesKeyed = NameMultiMapModule.initBy(function (ov) {
      return ov.LogicalName;
    }, availPriorOverrides);

    for (let overrideBy of overrides) {
      if (!overrideBy.IsFakeEventProperty) {
        const m = overrideBy.Range;
        const relevantVirts = NameMultiMapModule.find(overrideBy.LogicalName, dispatchSlotsKeyed);
        const relevantVirts_1 = map(function (_arg1) {
          return _arg1.data[0];
        }, relevantVirts);
        const matchValue = filter(function (dispatchSlot) {
          return OverrideImplementsDispatchSlot(g, amap, m, dispatchSlot, overrideBy);
        }, relevantVirts_1);

        if (matchValue.tail != null) {
          if (matchValue.tail.tail == null) {
            if (matchValue.head.IsFinal ? isObjExpr ? true : !typeEquiv(g, reqdTy, matchValue.head.ApparentEnclosingType) : false) {
              errorR(new _Error(SR.typrelMethodIsSealed(stringOfMethInfo(amap, m, denv, matchValue.head)), m));
            }
          } else {
            const matchValue_1 = filter(function (dispatchSlot_1) {
              return isInterfaceTy(g, dispatchSlot_1.ApparentEnclosingType) ? true : !DispatchSlotIsAlreadyImplemented(g, amap, m, availPriorOverridesKeyed, dispatchSlot_1);
            }, matchValue);
            const $var6 = matchValue_1.tail != null ? matchValue_1.tail.tail != null ? [0, matchValue_1.head, matchValue_1.tail.head] : [1] : [1];

            switch ($var6[0]) {
              case 0:
                errorR(new _Error(SR.typrelOverrideImplementsMoreThenOneSlot(FormatOverride(denv, overrideBy), stringOfMethInfo(amap, m, denv, $var6[1]), stringOfMethInfo(amap, m, denv, $var6[2])), m));
                break;

              case 1:
                const $var7 = matchValue.tail != null ? matchValue.head.IsFinal ? [0, matchValue.head] : [1] : [1];

                switch ($var7[0]) {
                  case 0:
                    errorR(new _Error(SR.tcCannotOverrideSealedMethod(toText(printf("%s::%s"))(toString($var7[1].ApparentEnclosingType), $var7[1].LogicalName)), m));
                    break;

                  case 1:
                    break;
                }

                break;
            }
          }
        } else {
          const matchValue_2 = filter(function (dispatchSlot_2) {
            return IsPartialMatch(g, amap, m, dispatchSlot_2, overrideBy);
          }, relevantVirts_1);
          const $var8 = matchValue_2.tail != null ? matchValue_2.tail.tail == null ? [0, matchValue_2.head] : [1] : [1];

          switch ($var8[0]) {
            case 0:
              errorR(new OverrideDoesntOverride(denv, overrideBy, $var8[1], g, amap, m));
              break;

            case 1:
              const matchValue_3 = filter(function (dispatchSlot_3) {
                return IsNameMatch(dispatchSlot_3, overrideBy);
              }, relevantVirts_1);

              if (matchValue_3.tail != null) {
                if (matchValue_3.tail.tail == null) {
                  errorR(new OverrideDoesntOverride(denv, overrideBy, matchValue_3.head, g, amap, m));
                } else {
                  const details = join("", map_1(CurriedLambda(toText(printf("%s   %s")))("\n"), map(function (dispatchSlot_4) {
                    return FormatMethInfoSig(g, amap, m, denv, dispatchSlot_4);
                  }, matchValue_3)));
                  errorR(new _Error(SR.typrelMemberHasMultiplePossibleDispatchSlots(FormatOverride(denv, overrideBy), details), overrideBy.Range));
                }
              } else {
                errorR(new OverrideDoesntOverride(denv, overrideBy, null, g, amap, m));
              }

              break;
          }
        }
      }
    }
  };

  const GetSlotImplSets = __exports.GetSlotImplSets = function (infoReader, denv, isObjExpr, allReqdTys) {
    const g = infoReader.g;
    const amap = infoReader.amap;
    const availImpliedInterfaces = toList(delay(function () {
      return collect(function (matchValue) {
        if (!isInterfaceTy(g, matchValue[0])) {
          const baseTyOpt = isObjExpr ? matchValue[0] : GetSuperTypeOfType(g, amap, matchValue[1], matchValue[0]);

          if (baseTyOpt != null) {
            return AllInterfacesOfType(g, amap, matchValue[1], new AllowMultiIntfInstantiations(0), getValue(baseTyOpt));
          } else {
            return empty();
          }
        } else {
          return empty();
        }
      }, allReqdTys);
    }));
    const intfSets = mapIndexed(function (i, tupledArg) {
      const interfaces = AllInterfacesOfType(g, amap, tupledArg[1], new AllowMultiIntfInstantiations(0), tupledArg[0]);
      const impliedTys = isInterfaceTy(g, tupledArg[0]) ? interfaces : new List(tupledArg[0], interfaces);
      return [i, tupledArg[0], impliedTys, tupledArg[1]];
    }, allReqdTys);
    const reqdTyInfos = map(function (tupledArg_1) {
      const reduced = fold(function (acc, tupledArg_2) {
        return (tupledArg_1[0] !== tupledArg_2[0] ? TypeFeasiblySubsumesType(0, g, amap, tupledArg_2[3], tupledArg_2[1], new CanCoerce(0), tupledArg_1[1]) : false) ? ListSet.subtract(function (ty1, ty2) {
          return TypesFeasiblyEquiv(0, g, amap, tupledArg_2[3], ty1, ty2);
        }, acc, tupledArg_2[2]) : acc;
      }, tupledArg_1[2], intfSets);
      return [tupledArg_1[0], tupledArg_1[1], tupledArg_1[3], reduced];
    }, intfSets);

    for (let forLoopVar of reqdTyInfos) {
      if (isInterfaceTy(g, forLoopVar[1]) ? forLoopVar[3].tail == null : false) {
        errorR(new _Error(SR.typrelDuplicateInterface(), forLoopVar[2]));
      }
    }

    for (let forLoopVar_1 of reqdTyInfos) {
      for (let forLoopVar_2 of reqdTyInfos) {
        if (forLoopVar_1[0] > forLoopVar_2[0]) {
          const overlap = ListSet.intersect(function (ty1_1, ty2_1) {
            return TypesFeasiblyEquiv(0, g, amap, forLoopVar_1[2], ty1_1, ty2_1);
          }, forLoopVar_1[3], forLoopVar_2[3]);
          iterate(function (overlappingTy) {
            if (!(filter(function (minfo) {
              return minfo.IsVirtual;
            }, GetImmediateIntrinsicMethInfosOfType(null, new AccessorDomain(3), g, amap, forLoopVar_1[2], overlappingTy)).tail == null)) {
              errorR(new _Error(SR.typrelNeedExplicitImplementation(minimalStringOfType(denv, overlap.head)), forLoopVar_1[2]));
            }
          }, overlap);
        }
      }
    }

    return toList(delay(function () {
      return collect(function (matchValue_1) {
        const isImpliedInterfaceTable = TyconRefMap.OfList(map(function (ty) {
          return [tcrefOfAppTy(g, ty), null];
        }, filter(function (arg10_) {
          return isInterfaceTy(g, arg10_);
        }, matchValue_1[3])));

        const isImpliedInterfaceType = function (ty_1) {
          if (isAppTy(g, ty_1) ? isImpliedInterfaceTable.ContainsKey(tcrefOfAppTy(g, ty_1)) : false) {
            return exists(function (ty2_2) {
              return TypesFeasiblyEquiv(0, g, amap, matchValue_1[2], ty_1, ty2_2);
            }, matchValue_1[3]);
          } else {
            return false;
          }
        };

        const dispatchSlots = toList(delay(function () {
          var optFilter;
          var ad;
          var allowMultiIntfInst;
          var findFlag;
          return isInterfaceTy(g, matchValue_1[1]) ? collect(function (impliedTy) {
            const isOptional = exists(CurriedLambda(function (arg10__1, arg20_) {
              return typeEquiv(g, arg10__1, arg20_);
            })(impliedTy), availImpliedInterfaces);
            return map_1(function (reqdSlot) {
              return new RequiredSlot(0, [reqdSlot, isOptional]);
            }, GetImmediateIntrinsicMethInfosOfType(null, new AccessorDomain(3), g, amap, matchValue_1[2], impliedTy));
          }, matchValue_1[3]) : collect(function (minfo_1) {
            return minfo_1.IsDispatchSlot ? singleton(new RequiredSlot(0, [minfo_1, false])) : empty();
          }, (optFilter = null, ad = new AccessorDomain(3), allowMultiIntfInst = new AllowMultiIntfInstantiations(0), findFlag = new FindMemberFlag(0), function (typ) {
            return GetIntrinsicMethInfosOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, matchValue_1[2], typ);
          })(matchValue_1[1]));
        }));
        let availPriorOverrides;

        if (isInterfaceTy(g, matchValue_1[1])) {
          availPriorOverrides = new List();
        } else {
          let reqdTy;
          const baseTyOpt_1 = isObjExpr ? matchValue_1[1] : GetSuperTypeOfType(g, amap, matchValue_1[2], matchValue_1[1]);

          if (baseTyOpt_1 != null) {
            reqdTy = getValue(baseTyOpt_1);
          } else {
            reqdTy = matchValue_1[1];
          }

          availPriorOverrides = toList(delay(function () {
            return collect(function (minfos) {
              return collect(function (minfo_2) {
                return !minfo_2.IsAbstract ? singleton(GetInheritedMemberOverrideInfo(g, amap, matchValue_1[2], new OverrideCanImplement(1), minfo_2)) : empty();
              }, minfos);
            }, infoReader.GetRawIntrinsicMethodSetsOfType(null, new AccessorDomain(3), new AllowMultiIntfInstantiations(0), matchValue_1[2], reqdTy));
          }));
        }

        const isRelevantRequiredProperty = function (x) {
          if (x.IsVirtualProperty ? !isInterfaceTy(g, matchValue_1[1]) : false) {
            return true;
          } else {
            return isImpliedInterfaceType(x.ApparentEnclosingType);
          }
        };

        const reqdProperties = function (list) {
          return filter(isRelevantRequiredProperty, list);
        }(GetIntrinsicPropInfosOfType(infoReader, null, new AccessorDomain(3), new AllowMultiIntfInstantiations(0), new FindMemberFlag(0), matchValue_1[2], matchValue_1[1]));

        const dispatchSlotsKeyed = NameMultiMapModule.initBy(function (_arg1) {
          return _arg1.data[0].LogicalName;
        }, dispatchSlots);
        return singleton(new SlotImplSet(0, [dispatchSlots, dispatchSlotsKeyed, availPriorOverrides, reqdProperties]));
      }, reqdTyInfos);
    }));
  };

  const CheckImplementationRelationAtEndOfInferenceScope = __exports.CheckImplementationRelationAtEndOfInferenceScope = function (infoReader, denv, nenv, sink, tycon, isImplementation) {
    const g = infoReader.g;
    const amap = infoReader.amap;
    const tcaug = tycon.TypeContents;
    const interfaces = map(function (tupledArg) {
      return [tupledArg[0], tupledArg[2]];
    }, tycon.ImmediateInterfacesOfFSharpTycon);
    const overallTy = generalizedTyconRef(mkLocalTyconRef(tycon));
    const allReqdTys = new List([overallTy, tycon.Range], interfaces);
    const allImmediateMembers = append(tycon.MembersOfFSharpTyconSorted, tycon.AllGeneratedValues);
    const slotImplSets = GetSlotImplSets(infoReader, denv, false, allReqdTys);
    const allImpls = toList(zip(allReqdTys, slotImplSets));
    const allImmediateMembersThatMightImplementDispatchSlots = filter(function (overrideBy) {
      return (overrideBy.IsInstanceMember ? ValRef_get_IsVirtualMember.bind(overrideBy)() : false) ? !ValRef_get_IsDispatchSlotMember.bind(overrideBy)() : false;
    }, allImmediateMembers);

    const mustOverrideSomething = function (reqdTy, overrideBy_1) {
      const memberInfo = getValue(overrideBy_1.MemberInfo);

      if (!ValRef_IsFSharpEventProperty.bind(overrideBy_1)(g) ? memberInfo.MemberFlags.IsOverrideOrExplicitImpl : false) {
        const matchValue = memberInfo.ImplementedSlotSigs;

        if (matchValue.tail == null) {
          return !isInterfaceTy(g, reqdTy);
        } else {
          return forAll(function (ss) {
            const ty = ss.ImplementedType;

            if (isInterfaceTy(g, ty)) {
              return typeEquiv(g, ty, reqdTy);
            } else {
              return !isInterfaceTy(g, reqdTy);
            }
          }, matchValue);
        }
      } else {
        return false;
      }
    };

    for (let forLoopVar of allImpls) {
      const reqdTy_1 = forLoopVar[0][0];
      const m = forLoopVar[0][1];

      try {
        const allImmediateMembersThatMightImplementDispatchSlots_1 = map(function (overrideBy_2) {
          return [overrideBy_2, GetTypeMemberOverrideInfo(g, reqdTy_1, overrideBy_2)];
        }, allImmediateMembersThatMightImplementDispatchSlots);

        if (isImplementation ? !isInterfaceTy(g, overallTy) : false) {
          const overrides = map(function (tuple) {
            return tuple[1];
          }, allImmediateMembersThatMightImplementDispatchSlots_1);
          const allCorrect = CheckDispatchSlotsAreImplemented(denv, g, amap, m, nenv, sink, tcaug.tcaug_abstract, reqdTy_1, forLoopVar[1].data[0], forLoopVar[1].data[2], overrides);

          if ((!allCorrect ? !tcaug.tcaug_abstract : false) ? !isInterfaceTy(g, reqdTy_1) : false) {
            errorR(new TypeIsImplicitlyAbstract(m));
          }

          const overridesToCheck = map(function (tuple_1) {
            return tuple_1[1];
          }, filter($var9 => CurriedLambda(mustOverrideSomething)(reqdTy_1)(function (tuple_2) {
            return tuple_2[0];
          }($var9)), allImmediateMembersThatMightImplementDispatchSlots_1));
          CheckOverridesAreAllUsedOnce(denv, g, amap, false, reqdTy_1, forLoopVar[1].data[1], forLoopVar[1].data[2], overridesToCheck);
        }
      } catch (e) {
        errorRecovery(e, m);
      }
    }

    iterate(function (overrideBy_3) {
      var m_1;
      const isFakeEventProperty = ValRef_IsFSharpEventProperty.bind(overrideBy_3)(g);
      let overriden;

      if (isFakeEventProperty) {
        const slotsigs = getValue(overrideBy_3.MemberInfo).ImplementedSlotSigs;
        overriden = map((m_1 = overrideBy_3.Range, function (slotsig) {
          return ReparentSlotSigToUseMethodTypars(g, m_1, overrideBy_3, slotsig);
        }), slotsigs);
      } else {
        overriden = toList(delay(function () {
          return collect(function (matchValue_1) {
            const reqdTy_2 = matchValue_1[0][0];
            const m_2 = matchValue_1[0][1];
            const dispatchSlotsKeyed = matchValue_1[1].data[1];
            const _dispatchSlots = matchValue_1[1].data[0];
            const overrideByInfo = GetTypeMemberOverrideInfo(g, reqdTy_2, overrideBy_3);
            const overridenForThisSlotImplSet = toList(delay(function () {
              return collect(function (matchValue_2) {
                var matchValue_3;
                return OverrideImplementsDispatchSlot(g, amap, m_2, matchValue_2.data[0], overrideByInfo) ? append_1(tyconRefEq(g, overrideByInfo.BoundingTyconRef, matchValue_2.data[0].DeclaringTyconRef) ? (matchValue_3 = matchValue_2.data[0].ArbitraryValRef, matchValue_3 == null ? empty() : append_1(getValue(getValue(matchValue_3).MemberInfo).IsImplemented ? (errorR(new _Error(SR.tcDefaultImplementationAlreadyExists(), overrideByInfo.Range)), empty()) : empty(), delay(function () {
                  getValue(getValue(matchValue_3).MemberInfo).IsImplemented = true;
                  return empty();
                }))) : empty(), delay(function () {
                  const slotsig_1 = matchValue_2.data[0].GetSlotSig(amap, m_2);
                  const slotsig_2 = ReparentSlotSigToUseMethodTypars(g, m_2, overrideBy_3, slotsig_1);
                  return singleton(slotsig_2);
                })) : empty();
              }, NameMultiMapModule.find(overrideByInfo.LogicalName, dispatchSlotsKeyed));
            }));
            return overridenForThisSlotImplSet;
          }, allImpls);
        }));
      }

      getValue(overrideBy_3.MemberInfo).ImplementedSlotSigs = overriden;
    }, allImmediateMembersThatMightImplementDispatchSlots);
  };

  return __exports;
}({});
export function FinalTypeDefinitionChecksAtEndOfInferenceScope(infoReader, nenv, sink, isImplementation, denv, tycon) {
  const g = infoReader.g;
  const amap = infoReader.amap;
  const tcaug = tycon.TypeContents;
  tcaug.tcaug_closed = true;

  if ((((isImplementation ? tycon.GeneratedCompareToValues == null : false) ? function (arg00, arg10) {
    return Entity_HasInterface.bind(tycon)(arg00, arg10);
  }(g, g.mk_IComparable_ty) : false) ? !function (arg00_1, arg10_1, arg20) {
    return Entity_HasOverride.bind(tycon)(arg00_1, arg10_1, arg20);
  }(g, "Equals", ofArray([g.obj_ty])) : false) ? !tycon.IsFSharpInterfaceTycon : false) {
    if (TyconIsCandidateForAugmentationWithEquals(g, tycon)) {
      warning(new _Error(SR.typrelTypeImplementsIComparableShouldOverrideObjectEquals(tycon.DisplayName), tycon.Range));
    } else {
      warning(new _Error(SR.typrelTypeImplementsIComparableDefaultObjectEqualsProvided(tycon.DisplayName), tycon.Range));
    }
  }

  CheckAugmentationAttribs(isImplementation, g, amap, tycon);

  if (isImplementation) {
    const tcaug_1 = tycon.TypeContents;
    const m = tycon.Range;

    const hasExplicitObjectGetHashCode = function (arg00_2, arg10_2, arg20_1) {
      return Entity_HasOverride.bind(tycon)(arg00_2, arg10_2, arg20_1);
    }(g, "GetHashCode", new List());

    const hasExplicitObjectEqualsOverride = function (arg00_3, arg10_3, arg20_2) {
      return Entity_HasOverride.bind(tycon)(arg00_3, arg10_3, arg20_2);
    }(g, "Equals", ofArray([g.obj_ty]));

    if (tycon.GeneratedHashAndEqualsWithComparerValues != null ? hasExplicitObjectGetHashCode ? true : hasExplicitObjectEqualsOverride : false) {
      errorR(new _Error(SR.typrelExplicitImplementationOfGetHashCodeOrEquals(tycon.DisplayName), m));
    }

    if (!hasExplicitObjectEqualsOverride ? hasExplicitObjectGetHashCode : false) {
      warning(new _Error(SR.typrelExplicitImplementationOfGetHashCode(tycon.DisplayName), m));
    }

    if (hasExplicitObjectEqualsOverride ? !hasExplicitObjectGetHashCode : false) {
      warning(new _Error(SR.typrelExplicitImplementationOfEquals(tycon.DisplayName), m));
    }

    tcaug_1.SetHasObjectGetHashCode(hasExplicitObjectGetHashCode);

    if (((((!tycon.IsHiddenReprTycon ? !tycon.IsTypeAbbrev : false) ? !tycon.IsMeasureableReprTycon : false) ? !tycon.IsAsmReprTycon : false) ? !tycon.IsFSharpInterfaceTycon : false) ? !tycon.IsFSharpDelegateTycon : false) {
      DispatchSlotChecking.CheckImplementationRelationAtEndOfInferenceScope(infoReader, denv, nenv, sink, tycon, isImplementation);
    }
  }
}
export function GetAbstractMethInfosForSynMethodDecl(infoReader, ad, memberName, bindm, typToSearchForAbstractMembers, valSynData) {
  let minfos;

  if (typToSearchForAbstractMembers[1] == null) {
    minfos = GetIntrinsicMethInfosOfType(infoReader, memberName.idText, ad, new AllowMultiIntfInstantiations(0), new FindMemberFlag(0), bindm, typToSearchForAbstractMembers[0]);
  } else {
    const dispatchSlotsKeyed = getValue(typToSearchForAbstractMembers[1]).data[1];
    minfos = map(function (_arg1) {
      return _arg1.data[0];
    }, NameMultiMapModule.find(memberName.idText, dispatchSlotsKeyed));
  }

  const dispatchSlots = filter(function (minfo) {
    return minfo.IsDispatchSlot;
  }, minfos);
  const topValSynArities = SynInfo.AritiesOfArgs(valSynData);
  const topValSynArities_1 = topValSynArities.tail == null ? topValSynArities : topValSynArities.tail;
  const dispatchSlotsArityMatch = filter(function (minfo_1) {
    return minfo_1.NumArgs.Equals(topValSynArities_1);
  }, dispatchSlots);
  return [dispatchSlots, dispatchSlotsArityMatch];
}
export function GetAbstractPropInfosForSynPropertyDecl(infoReader, ad, memberName, bindm, typToSearchForAbstractMembers, _k, _valSynData) {
  let pinfos;

  if (typToSearchForAbstractMembers[1] == null) {
    pinfos = GetIntrinsicPropInfosOfType(infoReader, memberName.idText, ad, new AllowMultiIntfInstantiations(0), new FindMemberFlag(0), bindm, typToSearchForAbstractMembers[0]);
  } else {
    const reqdProps = getValue(typToSearchForAbstractMembers[1]).data[3];
    pinfos = filter(function (pinfo) {
      return pinfo.PropertyName === memberName.idText;
    }, reqdProps);
  }

  const dispatchSlots = filter(function (pinfo_1) {
    return pinfo_1.IsVirtualProperty;
  }, pinfos);
  return dispatchSlots;
}