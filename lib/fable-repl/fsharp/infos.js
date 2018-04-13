import { ImportILGenericParameters, CanImportILType as CanImportILType_1, ImportILType as ImportILType_1 } from "./import";
import { ILEventDef, ILThisConvention, resolveILMethodRef, ILPropertyDef, mkILFieldRef, rescopeILFieldRef, ILFieldDef, rescopeILMethodRef, mkRefToILMethod, ILMemberAccess, ILMethodDef, mkRefForNestedILTypeDef, ILTypeDef, ILTypeRef, ILFieldInit, rescopeILType } from "../absil/il";
import { typeEquivAux, typeAEquivAux, TypeEquivEnv, destIDelegateEventType, isDelegateTy, isIDelegateEventType, ArgInfosOfPropertyVal, ReturnTypeOfPropertyVal, actualTyOfRecdFieldRef, TryFindILAttribute, tryDestOptionTy, TryFindFSharpAttribute, TryFindFSharpAttributeOpt, HasFSharpAttributeOpt, TryFindFSharpBoolAttributeAssumeFalse, HasFSharpAttribute, valRefEq, isStructTy, GetFSharpViewOfReturnType, TryDecodeILAttribute, isILAppTy, isAnyTupleTy, helpEnsureTypeHasMetadata, $7C$ConstToILFieldInit$7C$_$7C$ as _ConstToILFieldInit___, TryFindILAttributeOpt, destByrefTy, isByrefTy, generalizeTypars, ArgInfosOfMember, GetTopValTypeInCompiledForm, argsOfAppTy, GetTypeOfMemberInMemberForm, copySlotSig, instSlotSig, PartitionValRefTypars, CompileAsEvent, mkTyparInst, mkTyparToTyparRenaming, instTrait, TyconRefMultiMap, tryDestTyparTy, isInterfaceTy, DebugPrint, typeEquiv, destArrayTy, isArray1DTy, mkAppTy, tyconRefEq, isUnionTy, isRecdTy, isFSharpEnumTy, isFSharpStructOrEnumTy, isStructTupleTy, isObjTy, isRefTy, isArrayTy, superOfTycon, mkInstForAppTy, instType, destAppTy, isFSharpObjModelTy, metadataOfTy, stripTyEqnsAndMeasureEqns, tcrefOfAppTy, isAppTy } from "./TastOps";
import { defaultArg, getValue } from "../fable-core/Option";
import { UnionCaseRef, RecdFieldRef, copyTypars, valRefInThisAssembly, ValRef, Typar, EntityRef, SlotSig, SlotParam, TyparConstraint, TType } from "./tast";
import { append as append_1, filter, choose, map, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Tuple, equalsRecords, hash, toString, makeGeneric, Option, compareUnions, equals, comparePrimitives } from "../fable-core/Util";
import { map2, skip, iterate2, foldBack, exists, empty, singleton, collect, append, delay, toList } from "../fable-core/Seq";
import { create, add } from "../fable-core/Set";
import { InternalError, warning, error, Error as _Error, errorR } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import CurriedLambda from "../fable-core/CurriedLambda";
import { map1Of2, ListSet, p33 } from "./lib";
import Comparer from "../fable-core/Comparer";
import { MemberKind, XmlDoc, mkSynId, Ident, textOfId } from "./ast";
import { List as List_1 } from "../absil/illib";
import { printf, toText } from "../fable-core/String";
import { TcGlobals } from "./TcGlobals";
import { fromBits } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { range } from "./range";
export function ImportILType(scoref, amap, m, importInst, ilty) {
  return function (arg30_) {
    return ImportILType_1(amap, m, importInst, arg30_);
  }(function (arg10_) {
    return rescopeILType(scoref, arg10_);
  }(ilty));
}
export function CanImportILType(scoref, amap, m, ilty) {
  return function (arg20_) {
    return CanImportILType_1(amap, m, arg20_);
  }(function (arg10_) {
    return rescopeILType(scoref, arg10_);
  }(ilty));
}
export function isExnDeclTy(g, typ) {
  if (isAppTy(g, typ)) {
    return tcrefOfAppTy(g, typ).IsExceptionDecl;
  } else {
    return false;
  }
}
export function GetSuperTypeOfType(g, amap, m, typ) {
  const typ_1 = stripTyEqnsAndMeasureEqns(g, typ);
  const matchValue = metadataOfTy(g, typ_1);

  if (matchValue.tag === 1) {
    if (isFSharpObjModelTy(g, typ_1) ? true : isExnDeclTy(g, typ_1)) {
      const patternInput = destAppTy(g, typ_1);
      return instType(mkInstForAppTy(g, typ_1), superOfTycon(g, patternInput[0].Deref));
    } else if (isArrayTy(g, typ_1)) {
      return g.system_Array_typ;
    } else if (isRefTy(g, typ_1) ? !isObjTy(g, typ_1) : false) {
      return g.obj_ty;
    } else if (isStructTupleTy(g, typ_1)) {
      return g.obj_ty;
    } else if (isFSharpStructOrEnumTy(g, typ_1)) {
      if (isFSharpEnumTy(g, typ_1)) {
        return g.system_Enum_typ;
      } else {
        return g.system_Value_typ;
      }
    } else if (isRecdTy(g, typ_1) ? true : isUnionTy(g, typ_1)) {
      return g.obj_ty;
    } else {
      return null;
    }
  } else {
    const tdef = matchValue.data.data[2];
    const scoref = matchValue.data.data[0];
    const patternInput_1 = destAppTy(g, typ_1);
    const matchValue_1 = tdef.Extends;

    if (matchValue_1 != null) {
      return ImportILType(scoref, amap, m, patternInput_1[1], getValue(matchValue_1));
    } else {
      return null;
    }
  }
}
export function mkSystemCollectionsGenericIListTy(g, ty) {
  return new TType(1, [g.tcref_System_Collections_Generic_IList, ofArray([ty])]);
}
export class SkipUnrefInterfaces {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.SkipUnrefInterfaces",
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
setType("Microsoft.FSharp.Compiler.Infos.SkipUnrefInterfaces", SkipUnrefInterfaces);
export function GetImmediateInterfacesOfType(skipUnref, g, amap, m, typ) {
  var arg00_;
  let itys;

  if (isAppTy(g, typ)) {
    const patternInput = destAppTy(g, typ);

    if (patternInput[0].IsMeasureableReprTycon) {
      itys = toList(delay(function () {
        var matchValue;
        return append((matchValue = patternInput[0].TypeReprInfo, matchValue.tag === 5 ? collect(function (ity) {
          if (isAppTy(g, ity)) {
            const itcref = tcrefOfAppTy(g, ity);

            if (!tyconRefEq(g, itcref, g.system_GenericIComparable_tcref) ? !tyconRefEq(g, itcref, g.system_GenericIEquatable_tcref) : false) {
              return singleton(ity);
            } else {
              return empty();
            }
          } else {
            return empty();
          }
        }, GetImmediateInterfacesOfType(skipUnref, g, amap, m, matchValue.data)) : empty()), delay(function () {
          return append(singleton(mkAppTy(g.system_GenericIComparable_tcref, ofArray([typ]))), delay(function () {
            return singleton(mkAppTy(g.system_GenericIEquatable_tcref, ofArray([typ])));
          }));
        }));
      }));
    } else {
      const matchValue_1 = metadataOfTy(g, typ);

      if (matchValue_1.tag === 1) {
        itys = map((arg00_ = mkInstForAppTy(g, typ), function (arg10_) {
          return instType(arg00_, arg10_);
        }), patternInput[0].ImmediateInterfaceTypesOfFSharpTycon);
      } else {
        const tdef = matchValue_1.data.data[2];
        const scoref = matchValue_1.data.data[0];
        itys = choose(function (ity_1) {
          return (skipUnref.Equals(new SkipUnrefInterfaces(1)) ? true : CanImportILType(scoref, amap, m, ity_1)) ? ImportILType(scoref, amap, m, patternInput[1], ity_1) : null;
        }, tdef.Implements);
      }
    }
  } else {
    itys = new List();
  }

  const itys_1 = isArray1DTy(g, typ) ? new List(mkSystemCollectionsGenericIListTy(g, destArrayTy(g, typ)), itys) : itys;
  return itys_1;
}
export class AllowMultiIntfInstantiations {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.AllowMultiIntfInstantiations",
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
setType("Microsoft.FSharp.Compiler.Infos.AllowMultiIntfInstantiations", AllowMultiIntfInstantiations);

function FoldHierarchyOfTypeAux(followInterfaces, allowMultiIntfInst, skipUnref, visitor, g, amap, m, typ, acc) {
  const loop = function (ndeep, typ_1, _arg1) {
    const seenThisTycon = isAppTy(g, typ_1) ? _arg1[0].has(tcrefOfAppTy(g, typ_1).Stamp) : false;

    if (seenThisTycon ? exists(function (arg20_) {
      return typeEquiv(g, typ_1, arg20_);
    }, _arg1[1].Find(tcrefOfAppTy(g, typ_1))) : false) {
      return _arg1;
    } else if (seenThisTycon ? allowMultiIntfInst.Equals(new AllowMultiIntfInstantiations(1)) : false) {
      return _arg1;
    } else {
      let state;

      if (isAppTy(g, typ_1)) {
        const tcref = tcrefOfAppTy(g, typ_1);
        const visitedTycon = add(tcref.Stamp, _arg1[0]);
        state = [visitedTycon, _arg1[1].Add(tcref, typ_1), _arg1[2]];
      } else {
        state = _arg1;
      }

      if (ndeep > 100) {
        errorR(new _Error(SR.recursiveClassHierarchy(DebugPrint.showType(typ_1)), m));
        return [_arg1[0], _arg1[1], _arg1[2]];
      } else {
        let patternInput;

        if (isInterfaceTy(g, typ_1)) {
          patternInput = foldBack(CurriedLambda(loop)(ndeep + 1), GetImmediateInterfacesOfType(skipUnref, g, amap, m, typ_1), loop(ndeep, g.obj_ty, state));
        } else {
          const matchValue = tryDestTyparTy(g, typ_1);

          if (matchValue == null) {
            const state_1 = followInterfaces ? foldBack(CurriedLambda(loop)(ndeep + 1), GetImmediateInterfacesOfType(skipUnref, g, amap, m, typ_1), state) : state;
            const state_2 = foldBack(CurriedLambda(loop)(ndeep + 1), defaultArg(GetSuperTypeOfType(g, amap, m, typ_1), [], $var1 => [$var1]), state_1);
            patternInput = state_2;
          } else {
            const state_3 = loop(ndeep + 1, g.obj_ty, state);
            patternInput = foldBack(function (x, vacc) {
              switch (x.tag) {
                case 1:
                case 9:
                case 10:
                case 8:
                case 11:
                case 2:
                case 4:
                case 12:
                case 5:
                case 6:
                case 7:
                  return vacc;

                case 0:
                  return loop(ndeep + 1, x.data[0], vacc);

                default:
                  return vacc;
              }
            }, getValue(matchValue).Constraints, state_3);
          }
        }

        const acc_1 = visitor(typ_1, patternInput[2]);
        return [patternInput[0], patternInput[1], acc_1];
      }
    }
  };

  return function (tupledArg) {
    return p33(tupledArg[0], tupledArg[1], tupledArg[2]);
  }(loop(0, typ, [create(null, new Comparer((x, y) => x.CompareTo(y))), TyconRefMultiMap.Empty, acc]));
}

export function FoldPrimaryHierarchyOfType(f, g, amap, m, allowMultiIntfInst, typ, acc) {
  return FoldHierarchyOfTypeAux(false, allowMultiIntfInst, new SkipUnrefInterfaces(1), f, g, amap, m, typ, acc);
}
export function FoldEntireHierarchyOfType(f, g, amap, m, allowMultiIntfInst, typ, acc) {
  return FoldHierarchyOfTypeAux(true, allowMultiIntfInst, new SkipUnrefInterfaces(0), f, g, amap, m, typ, acc);
}
export function IterateEntireHierarchyOfType(f, g, amap, m, allowMultiIntfInst, typ) {
  FoldHierarchyOfTypeAux(true, allowMultiIntfInst, new SkipUnrefInterfaces(0), function (ty, unitVar1) {
    f(ty);
  }, g, amap, m, typ, null);
}
export function ExistsInEntireHierarchyOfType(f, g, amap, m, allowMultiIntfInst, typ) {
  return FoldHierarchyOfTypeAux(true, allowMultiIntfInst, new SkipUnrefInterfaces(0), function (ty, acc) {
    return acc ? true : f(ty);
  }, g, amap, m, typ, false);
}
export function SearchEntireHierarchyOfType(f, g, amap, m, typ) {
  return FoldHierarchyOfTypeAux(true, new AllowMultiIntfInstantiations(0), new SkipUnrefInterfaces(0), function (ty, acc) {
    return acc != null ? acc : f(ty) ? ty : null;
  }, g, amap, m, typ, null);
}
export function AllSuperTypesOfType(g, amap, m, allowMultiIntfInst, ty) {
  var f;
  return FoldHierarchyOfTypeAux(true, allowMultiIntfInst, new SkipUnrefInterfaces(1), (f = function (arg10_, arg20_) {
    return typeEquiv(g, arg10_, arg20_);
  }, function (x, l) {
    return ListSet.insert(f, x, l);
  }), g, amap, m, ty, new List());
}
export function AllInterfacesOfType(g, amap, m, allowMultiIntfInst, ty) {
  return filter(function (arg10_) {
    return isInterfaceTy(g, arg10_);
  }, AllSuperTypesOfType(g, amap, m, allowMultiIntfInst, ty));
}
export function HaveSameHeadType(g, ty1, ty2) {
  if (isAppTy(g, ty1) ? isAppTy(g, ty2) : false) {
    return tyconRefEq(g, tcrefOfAppTy(g, ty1), tcrefOfAppTy(g, ty2));
  } else {
    return false;
  }
}
export function HasHeadType(g, tcref, ty2) {
  if (isAppTy(g, ty2)) {
    return tyconRefEq(g, tcref, tcrefOfAppTy(g, ty2));
  } else {
    return false;
  }
}
export function ExistsSameHeadTypeInHierarchy(g, amap, m, typeToSearchFrom, typeToLookFor) {
  return ExistsInEntireHierarchyOfType(function (ty2) {
    return HaveSameHeadType(g, typeToLookFor, ty2);
  }, g, amap, m, new AllowMultiIntfInstantiations(0), typeToSearchFrom);
}
export function ExistsHeadTypeInEntireHierarchy(g, amap, m, typeToSearchFrom, tcrefToLookFor) {
  return ExistsInEntireHierarchyOfType(function (ty2) {
    return HasHeadType(g, tcrefToLookFor, ty2);
  }, g, amap, m, new AllowMultiIntfInstantiations(0), typeToSearchFrom);
}
export function ImportILTypeFromMetadata(amap, m, scoref, tinst, minst, ilty) {
  return ImportILType(scoref, amap, m, append_1(tinst, minst), ilty);
}
export function ImportReturnTypeFromMetaData(amap, m, ty, scoref, tinst, minst) {
  if (ty.tag === 0) {
    return null;
  } else {
    return ImportILTypeFromMetadata(amap, m, scoref, tinst, minst, ty);
  }
}
export function CopyTyparConstraints(m, tprefInst, tporig) {
  return map(function (tpc) {
    switch (tpc.tag) {
      case 1:
        return new TyparConstraint(1, [tpc.data[0], instType(tprefInst, tpc.data[1]), m]);

      case 2:
        return new TyparConstraint(2, m);

      case 8:
        return new TyparConstraint(8, [instType(tprefInst, tpc.data[0]), m]);

      case 9:
        return new TyparConstraint(9, m);

      case 10:
        return new TyparConstraint(10, m);

      case 11:
        return new TyparConstraint(11, [instType(tprefInst, tpc.data[0]), instType(tprefInst, tpc.data[1]), m]);

      case 4:
        return new TyparConstraint(4, m);

      case 12:
        return new TyparConstraint(12, m);

      case 5:
        return new TyparConstraint(5, m);

      case 6:
        return new TyparConstraint(6, [map(function (arg10_) {
          return instType(tprefInst, arg10_);
        }, tpc.data[0]), m]);

      case 7:
        return new TyparConstraint(7, m);

      case 3:
        return new TyparConstraint(3, [instTrait(tprefInst, tpc.data[0]), m]);

      default:
        return new TyparConstraint(0, [instType(tprefInst, tpc.data[0]), m]);
    }
  }, tporig.Constraints);
}
export function FixupNewTypars(m, formalEnclosingTypars, tinst, tpsorig, tps) {
  const n0 = formalEnclosingTypars.length | 0;
  const n1 = tinst.length | 0;
  const n2 = tpsorig.length | 0;
  const n3 = tps.length | 0;

  if (n0 !== n1) {
    error(new _Error(SR.tcInvalidTypeArgumentCount(n0, n1), m));
  }

  if (n2 !== n3) {
    error(new _Error(SR.tcInvalidTypeArgumentCount(n2, n3), m));
  }

  const patternInput = mkTyparToTyparRenaming(tpsorig, tps);
  const tprefInst = append_1(mkTyparInst(formalEnclosingTypars, tinst), patternInput[0]);
  iterate2(function (tporig, tp) {
    tp.FixupConstraints(CopyTyparConstraints(m, tprefInst, tporig));
  }, tpsorig, tps);
  return [patternInput[0], patternInput[1]];
}

function ValRef_IsFSharpEventProperty(g) {
  if (this.IsMember ? CompileAsEvent(g, this.Attribs) : false) {
    return !this.IsExtensionMember;
  } else {
    return false;
  }
}

export { ValRef_IsFSharpEventProperty as ValRef$2E$IsFSharpEventProperty };

function ValRef_get_IsVirtualMember() {
  const flags = getValue(this.MemberInfo).MemberFlags;

  if (flags.IsDispatchSlot) {
    return true;
  } else {
    return flags.IsOverrideOrExplicitImpl;
  }
}

export { ValRef_get_IsVirtualMember as ValRef$2E$get_IsVirtualMember };

function ValRef_get_IsDispatchSlotMember() {
  const membInfo = getValue(this.MemberInfo);
  return membInfo.MemberFlags.IsDispatchSlot;
}

export { ValRef_get_IsDispatchSlotMember as ValRef$2E$get_IsDispatchSlotMember };

function ValRef_get_IsDefiniteFSharpOverrideMember() {
  const membInfo = getValue(this.MemberInfo);

  if (!membInfo.MemberFlags.IsDispatchSlot) {
    if (membInfo.MemberFlags.IsOverrideOrExplicitImpl) {
      return true;
    } else {
      return !(membInfo.ImplementedSlotSigs.tail == null);
    }
  } else {
    return false;
  }
}

export { ValRef_get_IsDefiniteFSharpOverrideMember as ValRef$2E$get_IsDefiniteFSharpOverrideMember };

function ValRef_IsFSharpExplicitInterfaceImplementation(g) {
  const matchValue = this.MemberInfo;

  if (matchValue != null) {
    if (!getValue(matchValue).MemberFlags.IsDispatchSlot) {
      const matchValue_1 = getValue(matchValue).ImplementedSlotSigs;

      if (matchValue_1.tail == null) {
        return false;
      } else {
        const oty = matchValue_1.head.data[1];
        return isInterfaceTy(g, oty);
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export { ValRef_IsFSharpExplicitInterfaceImplementation as ValRef$2E$IsFSharpExplicitInterfaceImplementation };

function ValRef_get_ImplementedSlotSignatures() {
  const matchValue = this.MemberInfo;

  if (matchValue != null) {
    return getValue(matchValue).ImplementedSlotSigs;
  } else {
    return new List();
  }
}

export { ValRef_get_ImplementedSlotSignatures as ValRef$2E$get_ImplementedSlotSignatures };
export function ReparentSlotSigToUseMethodTypars(g, m, ovByMethValRef, slotsig) {
  const matchValue = PartitionValRefTypars(g, ovByMethValRef);

  if (matchValue == null) {
    return slotsig;
  } else {
    const enclosingTypars = getValue(matchValue)[1];
    const patternInput = mkTyparToTyparRenaming(ovByMethValRef.MemberApparentEntity.Typars(m), enclosingTypars);
    const res = instSlotSig(patternInput[0], slotsig);
    return res;
  }
}
export function MakeSlotParam(ty, argInfo) {
  return new SlotParam(0, [defaultArg(argInfo.Name, null, function (id) {
    return textOfId(id);
  }), ty, false, false, false, argInfo.Attribs]);
}
export function MakeSlotSig(nm, typ, ctps, mtps, paraml, retTy) {
  return copySlotSig(new SlotSig(0, [nm, typ, ctps, mtps, paraml, retTy]));
}

function AnalyzeTypeOfMemberVal(isCSharpExt, g, typ, vref) {
  const patternInput = GetTypeOfMemberInMemberForm(g, vref);

  if (isCSharpExt ? true : vref.IsExtensionMember) {
    return [new List(), patternInput[0], patternInput[2], new List()];
  } else {
    const parentTyArgs = argsOfAppTy(g, typ);
    const patternInput_1 = List_1.chop(parentTyArgs.length, patternInput[0]);
    return [patternInput_1[0], patternInput_1[1], patternInput[2], parentTyArgs];
  }
}

function GetObjTypeOfInstanceExtensionMethod(g, vref) {
  const patternInput = GetTopValTypeInCompiledForm(g, getValue(vref.ValReprInfo), vref.Type, vref.Range);
  return patternInput[1].head.head[0];
}

function GetArgInfosOfMember(isCSharpExt, g, vref) {
  if (isCSharpExt) {
    const patternInput = GetTopValTypeInCompiledForm(g, getValue(vref.ValReprInfo), vref.Type, vref.Range);
    return ofArray([patternInput[1].head.tail]);
  } else {
    return ArgInfosOfMember(g, vref);
  }
}

function CombineMethInsts(ttps, mtps, tinst, minst) {
  return append_1(mkTyparInst(ttps, tinst), mkTyparInst(mtps, minst));
}

function GetInstantiationForMemberVal(g, isCSharpExt, typ, vref, methTyArgs) {
  const patternInput = AnalyzeTypeOfMemberVal(isCSharpExt, g, typ, vref);
  const methTyArgsFixedUp = methTyArgs.length < patternInput[1].length ? append_1(methTyArgs, generalizeTypars(toList(skip(methTyArgs.length, patternInput[1])))) : methTyArgs;
  return CombineMethInsts(patternInput[0], patternInput[1], patternInput[3], methTyArgsFixedUp);
}

function GetInstantiationForPropertyVal(g, typ, vref) {
  const patternInput = AnalyzeTypeOfMemberVal(false, g, typ, vref);
  return CombineMethInsts(patternInput[0], patternInput[1], patternInput[3], generalizeTypars(patternInput[1]));
}

export class OptionalArgCallerSideValue {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.OptionalArgCallerSideValue",
      interfaces: ["FSharpUnion"],
      cases: [["Constant", ILFieldInit], ["DefaultValue"], ["MissingValue"], ["WrapperForIDispatch"], ["WrapperForIUnknown"], ["PassByRef", TType, OptionalArgCallerSideValue]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Infos.OptionalArgCallerSideValue", OptionalArgCallerSideValue);
export class OptionalArgInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.OptionalArgInfo",
      interfaces: ["FSharpUnion"],
      cases: [["NotOptional"], ["CalleeSide"], ["CallerSide", OptionalArgCallerSideValue]]
    };
  }

  get IsOptional() {
    const $var2 = this.tag === 2 ? [0] : this.tag === 0 ? [1] : [0];

    switch ($var2[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  static FromILParameter(g, amap, m, ilScope, ilTypeInst, ilParam) {
    if (ilParam.IsOptional) {
      if (ilParam.Default != null) {
        return new OptionalArgInfo(2, new OptionalArgCallerSideValue(0, getValue(ilParam.Default)));
      } else {
        const analyze = function (ty) {
          if (isByrefTy(g, ty)) {
            const ty_1 = destByrefTy(g, ty);
            return new OptionalArgCallerSideValue(5, [ty_1, analyze(ty_1)]);
          } else if (isObjTy(g, ty)) {
            const $var3 = ilParam.Marshal != null ? getValue(ilParam.Marshal).tag === 31 ? [0] : getValue(ilParam.Marshal).tag === 32 ? [0] : getValue(ilParam.Marshal).tag === 33 ? [0] : [1] : [1];

            switch ($var3[0]) {
              case 0:
                return new OptionalArgCallerSideValue(0, new ILFieldInit(13));

              case 1:
                if (TryFindILAttributeOpt(g.attrib_IUnknownConstantAttribute, ilParam.CustomAttrs)) {
                  return new OptionalArgCallerSideValue(4);
                } else if (TryFindILAttributeOpt(g.attrib_IDispatchConstantAttribute, ilParam.CustomAttrs)) {
                  return new OptionalArgCallerSideValue(3);
                } else {
                  return new OptionalArgCallerSideValue(2);
                }

            }
          } else {
            return new OptionalArgCallerSideValue(1);
          }
        };

        return new OptionalArgInfo(2, analyze(ImportILTypeFromMetadata(amap, m, ilScope, ilTypeInst, new List(), ilParam.Type)));
      }
    } else {
      return new OptionalArgInfo(0);
    }
  }

  static ValueOfDefaultParameterValueAttrib(_arg1) {
    const patternInput = _arg1.data[2].head;

    if (patternInput.data[1].tag === 0) {
      return patternInput.data[1];
    } else {
      return null;
    }
  }

  static FieldInitForDefaultParameterValueAttrib(attrib) {
    const matchValue = OptionalArgInfo.ValueOfDefaultParameterValueAttrib(attrib);
    let $var4;

    if (matchValue != null) {
      if (getValue(matchValue).tag === 0) {
        const activePatternResult31443 = _ConstToILFieldInit___(getValue(matchValue).data[0]);

        if (activePatternResult31443 != null) {
          $var4 = [0, getValue(activePatternResult31443)];
        } else {
          $var4 = [1];
        }
      } else {
        $var4 = [1];
      }
    } else {
      $var4 = [1];
    }

    switch ($var4[0]) {
      case 0:
        return $var4[1];

      case 1:
        return null;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Infos.OptionalArgInfo", OptionalArgInfo);
export class CallerInfoInfo {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.CallerInfoInfo",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NoCallerInfo"], ["CallerLineNumber"], ["CallerMemberName"], ["CallerFilePath"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

  ToString() {
    return toText(printf("%+A"))(this);
  }

}
setType("Microsoft.FSharp.Compiler.Infos.CallerInfoInfo", CallerInfoInfo);
export class ReflectedArgInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.ReflectedArgInfo",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["None"], ["Quote", "boolean"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get AutoQuote() {
    return this.tag === 1 ? true : false;
  }

}
setType("Microsoft.FSharp.Compiler.Infos.ReflectedArgInfo", ReflectedArgInfo);
export class ParamNameAndType {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.ParamNameAndType",
      interfaces: ["FSharpUnion"],
      cases: [["ParamNameAndType", Option(Ident), TType]]
    };
  }

  static FromArgInfo(ty, argInfo) {
    return new ParamNameAndType(0, [argInfo.Name, ty]);
  }

  static FromMember(isCSharpExtMem, g, vref) {
    return List_1.mapSquared(function (tupledArg) {
      return ParamNameAndType.FromArgInfo(tupledArg[0], tupledArg[1]);
    }, GetArgInfosOfMember(isCSharpExtMem, g, vref));
  }

  static Instantiate(inst, p) {
    return new ParamNameAndType(0, [p.data[0], instType(inst, p.data[1])]);
  }

  static InstantiateCurried(inst, paramTypes) {
    return List_1.mapSquared(CurriedLambda(function (arg00, arg10) {
      return ParamNameAndType.Instantiate(arg00, arg10);
    })(inst), paramTypes);
  }

}
setType("Microsoft.FSharp.Compiler.Infos.ParamNameAndType", ParamNameAndType);
export class ParamData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.ParamData",
      interfaces: ["FSharpUnion"],
      cases: [["ParamData", "boolean", "boolean", OptionalArgInfo, CallerInfoInfo, Option(Ident), ReflectedArgInfo, TType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Infos.ParamData", ParamData);
export class ILTypeInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.ILTypeInfo",
      interfaces: ["FSharpUnion"],
      cases: [["ILTypeInfo", TcGlobals, TType, ILTypeRef, ILTypeDef]]
    };
  }

  get TcGlobals() {
    return this.data[0];
  }

  get ILTypeRef() {
    return this.data[2];
  }

  get RawMetadata() {
    return this.data[3];
  }

  get ToType() {
    return this.data[1];
  }

  get ToAppType() {
    return helpEnsureTypeHasMetadata(this.TcGlobals, this.ToType);
  }

  get TyconRefOfRawMetadata() {
    return tcrefOfAppTy(this.TcGlobals, this.ToAppType);
  }

  get TypeInstOfRawMetadata() {
    return argsOfAppTy(this.TcGlobals, this.ToAppType);
  }

  get ILScopeRef() {
    return this.ILTypeRef.Scope;
  }

  get Name() {
    return this.ILTypeRef.Name;
  }

  get IsValueType() {
    return this.RawMetadata.IsStructOrEnum;
  }

  Instantiate(inst) {
    return new ILTypeInfo(0, [this.data[0], instType(inst, this.data[1]), this.data[2], this.data[3]]);
  }

  static FromType(g, ty) {
    if (isAnyTupleTy(g, ty)) {
      const metadataTy = helpEnsureTypeHasMetadata(g, ty);
      const metadataTyconRef = tcrefOfAppTy(g, metadataTy);
      const patternInput = metadataTyconRef.ILTyconInfo;
      const metadataILTypeRef = mkRefForNestedILTypeDef(patternInput.data[0], patternInput.data[1], patternInput.data[2]);
      return new ILTypeInfo(0, [g, ty, metadataILTypeRef, patternInput.data[2]]);
    } else if (isILAppTy(g, ty)) {
      const tcref = tcrefOfAppTy(g, ty);
      const patternInput_1 = tcref.ILTyconInfo;
      const tref = mkRefForNestedILTypeDef(patternInput_1.data[0], patternInput_1.data[1], patternInput_1.data[2]);
      return new ILTypeInfo(0, [g, ty, tref, patternInput_1.data[2]]);
    } else {
      throw new Error("ILTypeInfo.FromType - no IL metadata for type");
    }
  }

}
setType("Microsoft.FSharp.Compiler.Infos.ILTypeInfo", ILTypeInfo);
export class ILMethInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.ILMethInfo",
      interfaces: ["FSharpUnion"],
      cases: [["ILMethInfo", TcGlobals, TType, Option(EntityRef), ILMethodDef, makeGeneric(List, {
        T: Typar
      })]]
    };
  }

  get TcGlobals() {
    return this.data[0];
  }

  get ApparentEnclosingType() {
    return this.data[1];
  }

  get ApparentEnclosingAppType() {
    return helpEnsureTypeHasMetadata(this.TcGlobals, this.ApparentEnclosingType);
  }

  get ILExtensionMethodDeclaringTyconRef() {
    return this.data[2];
  }

  get RawMetadata() {
    return this.data[3];
  }

  get FormalMethodTypars() {
    return this.data[4];
  }

  get ILName() {
    return this.RawMetadata.Name;
  }

  get IsILExtensionMethod() {
    return CurriedLambda(() => this.ILExtensionMethodDeclaringTyconRef != null)();
  }

  get DeclaringTyconRef() {
    const matchValue = this.ILExtensionMethodDeclaringTyconRef;

    if (matchValue == null) {
      return tcrefOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType);
    } else {
      return getValue(matchValue);
    }
  }

  get DeclaringTypeInst() {
    return this.IsILExtensionMethod ? new List() : argsOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType);
  }

  get MetadataScope() {
    return this.DeclaringTyconRef.CompiledRepresentationForNamedType.Scope;
  }

  get ParamMetadata() {
    const ps = this.RawMetadata.Parameters;

    if (this.IsILExtensionMethod) {
      return ps.tail;
    } else {
      return ps;
    }
  }

  get NumParams() {
    return this.ParamMetadata.length;
  }

  get IsConstructor() {
    return this.RawMetadata.IsConstructor;
  }

  get IsClassConstructor() {
    return this.RawMetadata.IsClassInitializer;
  }

  get IsProtectedAccessibility() {
    const md = this.RawMetadata;

    if (!md.IsConstructor ? !md.IsClassInitializer : false) {
      if (md.Access.Equals(new ILMemberAccess(3))) {
        return true;
      } else {
        return md.Access.Equals(new ILMemberAccess(2));
      }
    } else {
      return false;
    }
  }

  get IsVirtual() {
    return this.RawMetadata.IsVirtual;
  }

  get IsFinal() {
    return this.RawMetadata.IsFinal;
  }

  get IsAbstract() {
    return this.RawMetadata.IsAbstract;
  }

  get IsStatic() {
    return !this.IsILExtensionMethod ? this.RawMetadata.CallingConv.IsStatic : false;
  }

  get IsNewSlot() {
    return this.RawMetadata.IsNewSlot;
  }

  get IsInstance() {
    return !this.IsConstructor ? !this.IsStatic : false;
  }

  GetParamTypes(amap, m, minst) {
    return map(p => ImportILTypeFromMetadata(amap, m, this.MetadataScope, this.DeclaringTypeInst, minst, p.Type), this.ParamMetadata);
  }

  GetRawArgTypes(amap, m, minst) {
    return map(p => ImportILTypeFromMetadata(amap, m, this.MetadataScope, this.DeclaringTypeInst, minst, p.Type), this.RawMetadata.Parameters);
  }

  GetParamNamesAndTypes(amap, m, minst) {
    return map(p => new ParamNameAndType(0, [defaultArg(p.Name, null, s => mkSynId(m, s)), ImportILTypeFromMetadata(amap, m, this.MetadataScope, this.DeclaringTypeInst, minst, p.Type)]), this.ParamMetadata);
  }

  get ILMethodRef() {
    const mref = mkRefToILMethod(this.DeclaringTyconRef.CompiledRepresentationForNamedType, this.RawMetadata);
    return rescopeILMethodRef(this.MetadataScope, mref);
  }

  IsDllImport(g) {
    const matchValue = g.attrib_DllImportAttribute;

    if (matchValue != null) {
      const tref = getValue(matchValue).data[0];
      return (arg20_ => TryDecodeILAttribute(g, tref, arg20_))(this.RawMetadata.CustomAttrs) != null;
    } else {
      return false;
    }
  }

  GetObjArgTypes(amap, m, minst) {
    if (this.IsILExtensionMethod) {
      return ofArray([ImportILTypeFromMetadata(amap, m, this.MetadataScope, this.DeclaringTypeInst, minst, this.RawMetadata.Parameters.head.Type)]);
    } else if (this.IsInstance) {
      return ofArray([this.ApparentEnclosingType]);
    } else {
      return new List();
    }
  }

  GetCompiledReturnTy(amap, m, minst) {
    return ImportReturnTypeFromMetaData(amap, m, this.RawMetadata.Return.Type, this.MetadataScope, this.DeclaringTypeInst, minst);
  }

  GetFSharpReturnTy(amap, m, minst) {
    return GetFSharpViewOfReturnType(amap.g, this.GetCompiledReturnTy(amap, m, minst));
  }

}
setType("Microsoft.FSharp.Compiler.Infos.ILMethInfo", ILMethInfo);
export class MethInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.MethInfo",
      interfaces: ["FSharpUnion"],
      cases: [["FSMeth", TcGlobals, TType, ValRef, Option(Long)], ["ILMeth", TcGlobals, ILMethInfo, Option(Long)], ["DefaultStructCtor", TcGlobals, TType]]
    };
  }

  get ApparentEnclosingType() {
    return this.tag === 0 ? this.data[1] : this.tag === 2 ? this.data[1] : this.data[1].ApparentEnclosingType;
  }

  get ApparentEnclosingAppType() {
    return this.tag === 1 ? this.data[1].ApparentEnclosingAppType : this.ApparentEnclosingType;
  }

  get ApparentEnclosingTyconRef() {
    return tcrefOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType);
  }

  get DeclaringTyconRef() {
    const $var5 = this.tag === 1 ? this.IsExtensionMember ? [0, this.data[1]] : [1] : [1];

    switch ($var5[0]) {
      case 0:
        return $var5[1].DeclaringTyconRef;

      case 1:
        const $var6 = this.tag === 0 ? (this.IsExtensionMember ? this.data[2].HasDeclaringEntity : false) ? [0, this.data[2]] : [1] : [1];

        switch ($var6[0]) {
          case 0:
            return $var6[1].TopValDeclaringEntity;

          case 1:
            return this.ApparentEnclosingTyconRef;
        }

    }
  }

  get ProvidedStaticParameterInfo() {
    return this.tag === 0 ? null : this.tag === 2 ? null : null;
  }

  get ExtensionMemberPriorityOption() {
    return this.tag === 0 ? this.data[3] : this.tag === 2 ? null : this.data[2];
  }

  get ExtensionMemberPriority() {
    return defaultArg(this.ExtensionMemberPriorityOption, fromBits(4294967295, 4294967295, true));
  }

  get LogicalName() {
    return this.tag === 0 ? this.data[2].LogicalName : this.tag === 2 ? ".ctor" : this.data[1].ILName;
  }

  get DisplayName() {
    return this.tag === 0 ? this.data[2].DisplayName : this.LogicalName;
  }

  get HasDirectXmlComment() {
    return this.tag === 0 ? valRefInThisAssembly(this.data[0].compilingFslib, this.data[2]) : false;
  }

  ToString() {
    return toString(this.ApparentEnclosingType) + this.LogicalName;
  }

  get DeclaringTypeInst() {
    return this.IsExtensionMember ? new List() : argsOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType);
  }

  get TcGlobals() {
    return this.tag === 0 ? this.data[0] : this.tag === 2 ? this.data[0] : this.data[0];
  }

  get FormalMethodTypars() {
    if (this.tag === 0) {
      const patternInput = AnalyzeTypeOfMemberVal(this.IsCSharpStyleExtensionMember, this.data[0], this.data[1], this.data[2]);
      return patternInput[1];
    } else if (this.tag === 2) {
      return new List();
    } else {
      return this.data[1].FormalMethodTypars;
    }
  }

  get FormalMethodInst() {
    return generalizeTypars(this.FormalMethodTypars);
  }

  get FormalMethodTyparInst() {
    return mkTyparInst(this.FormalMethodTypars, this.FormalMethodInst);
  }

  get XmlDoc() {
    return this.tag === 0 ? this.data[2].XmlDoc : this.tag === 2 ? XmlDoc.Empty : XmlDoc.Empty;
  }

  get ArbitraryValRef() {
    return this.tag === 0 ? this.data[2] : null;
  }

  get NumArgs() {
    return this.tag === 0 ? map(list => list.length, GetArgInfosOfMember(this.IsCSharpStyleExtensionMember, this.data[0], this.data[2])) : this.tag === 2 ? ofArray([0]) : ofArray([this.data[1].NumParams]);
  }

  get IsCurried() {
    return this.NumArgs.length > 1;
  }

  get IsInstance() {
    return this.tag === 0 ? this.data[2].IsInstanceMember ? true : this.IsCSharpStyleExtensionMember : this.tag === 2 ? false : this.data[1].IsInstance;
  }

  get GenericArity() {
    return this.FormalMethodTypars.length;
  }

  get IsProtectedAccessiblity() {
    return this.tag === 0 ? false : this.tag === 2 ? false : this.data[1].IsProtectedAccessibility;
  }

  get IsVirtual() {
    return this.tag === 0 ? ValRef_get_IsVirtualMember.bind(this.data[2])() : this.tag === 2 ? false : this.data[1].IsVirtual;
  }

  get IsConstructor() {
    return this.tag === 0 ? getValue(this.data[2].MemberInfo).MemberFlags.MemberKind.Equals(new MemberKind(1)) : this.tag === 2 ? true : this.data[1].IsConstructor;
  }

  get IsClassConstructor() {
    if (this.tag === 0) {
      const matchValue = this.data[2].TryDeref;

      if (matchValue.tag === 0) {
        return matchValue.data.IsClassConstructor;
      } else {
        return false;
      }
    } else if (this.tag === 2) {
      return false;
    } else {
      return this.data[1].IsClassConstructor;
    }
  }

  get IsDispatchSlot() {
    if (this.tag === 0) {
      const x = this;

      if (isInterfaceTy(this.data[0], x.ApparentEnclosingType)) {
        return true;
      } else {
        return getValue(this.data[2].MemberInfo).MemberFlags.IsDispatchSlot;
      }
    } else if (this.tag === 2) {
      return false;
    } else {
      return this.data[1].IsVirtual;
    }
  }

  get IsFinal() {
    return !this.IsVirtual ? true : this.tag === 0 ? false : this.tag === 2 ? true : this.data[1].IsFinal;
  }

  get IsAbstract() {
    return this.tag === 0 ? isInterfaceTy(this.data[0], this.ApparentEnclosingType) ? true : ValRef_get_IsDispatchSlotMember.bind(this.data[2])() : this.tag === 2 ? false : this.data[1].IsAbstract;
  }

  get IsNewSlot() {
    return isInterfaceTy(this.TcGlobals, this.ApparentEnclosingType) ? true : this.IsVirtual ? this.tag === 0 ? ValRef_get_IsDispatchSlotMember.bind(this.data[2])() : this.tag === 2 ? false : this.data[1].IsNewSlot : false;
  }

  get IsFSharpExplicitInterfaceImplementation() {
    return this.tag === 0 ? ValRef_IsFSharpExplicitInterfaceImplementation.bind(this.data[2])(this.data[0]) : this.tag === 2 ? false : false;
  }

  get IsDefiniteFSharpOverride() {
    return this.tag === 0 ? ValRef_get_IsDefiniteFSharpOverrideMember.bind(this.data[2])() : this.tag === 2 ? false : false;
  }

  get ImplementedSlotSignatures() {
    if (this.tag === 0) {
      return ValRef_get_ImplementedSlotSignatures.bind(this.data[2])();
    } else {
      throw new Error("not supported");
    }
  }

  get IsExtensionMember() {
    const $var7 = this.tag === 0 ? [0, this.data[3], this.data[2]] : this.tag === 1 ? this.data[2] != null ? [1] : [2] : [2];

    switch ($var7[0]) {
      case 0:
        if (CurriedLambda(() => $var7[1] != null)()) {
          return true;
        } else {
          return $var7[2].IsExtensionMember;
        }

      case 1:
        return true;

      case 2:
        return false;
    }
  }

  get IsFSharpStyleExtensionMember() {
    return this.tag === 0 ? this.data[2].IsExtensionMember : false;
  }

  get IsCSharpStyleExtensionMember() {
    const $var8 = this.tag === 0 ? this.data[3] != null ? [0, this.data[2]] : [2] : this.tag === 1 ? this.data[2] != null ? [1] : [2] : [2];

    switch ($var8[0]) {
      case 0:
        return !$var8[1].IsExtensionMember;

      case 1:
        return true;

      case 2:
        return false;
    }
  }

  AdjustUserTypeInstForFSharpStyleIndexedExtensionMembers(tyargs) {
    return append_1(this.IsFSharpStyleExtensionMember ? argsOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType) : new List(), tyargs);
  }

  get IsFSharpEventPropertyMethod() {
    return this.tag === 0 ? ValRef_IsFSharpEventProperty.bind(this.data[2])(this.data[0]) : false;
  }

  get IsNullary() {
    return this.NumArgs.Equals(ofArray([0]));
  }

  get IsStruct() {
    return isStructTy(this.TcGlobals, this.ApparentEnclosingType);
  }

  static CreateILMeth(amap, m, typ, md) {
    const tinfo = function (arg00, arg10) {
      return ILTypeInfo.FromType(arg00, arg10);
    }(amap.g, typ);

    const mtps = ImportILGenericParameters(function () {
      return amap;
    }, m, tinfo.ILScopeRef, tinfo.TypeInstOfRawMetadata, md.GenericParams);
    return new MethInfo(1, [amap.g, new ILMethInfo(0, [amap.g, typ, null, md, mtps]), null]);
  }

  static CreateILExtensionMeth(amap, m, apparentTy, declaringTyconRef, extMethPri, md) {
    const scoref = declaringTyconRef.CompiledRepresentationForNamedType.Scope;
    const mtps = ImportILGenericParameters(function () {
      return amap;
    }, m, scoref, new List(), md.GenericParams);
    return new MethInfo(1, [amap.g, new ILMethInfo(0, [amap.g, apparentTy, declaringTyconRef, md, mtps]), extMethPri]);
  }

  static MethInfosUseIdenticalDefinitions(x1, x2) {
    const matchValue = [x1, x2];
    const $var9 = matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [1, matchValue[0].data[0], matchValue[0].data[2], matchValue[1].data[2]] : [3] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [2] : [3] : matchValue[1].tag === 1 ? [0, matchValue[0].data[1], matchValue[1].data[1]] : [3];

    switch ($var9[0]) {
      case 0:
        return $var9[1].RawMetadata === $var9[2].RawMetadata;

      case 1:
        return valRefEq($var9[1], $var9[2], $var9[3]);

      case 2:
        return tyconRefEq(x1.TcGlobals, x1.DeclaringTyconRef, x2.DeclaringTyconRef);

      case 3:
        return false;
    }
  }

  ComputeHashCode() {
    return this.tag === 0 ? hash(this.data[2].LogicalName) : this.tag === 2 ? 34892 : hash(this.data[1].RawMetadata.Name);
  }

  Instantiate(amap, m, inst) {
    if (this.tag === 0) {
      return new MethInfo(0, [this.data[0], instType(inst, this.data[1]), this.data[2], this.data[3]]);
    } else if (this.tag === 2) {
      return new MethInfo(2, [this.data[0], instType(inst, this.data[1])]);
    } else if (this.data[1].data[2] != null) {
      const declaringTyconRef = getValue(this.data[1].data[2]);
      return MethInfo.CreateILExtensionMeth(amap, m, instType(inst, this.data[1].data[1]), declaringTyconRef, this.data[2], this.data[1].data[3]);
    } else {
      return MethInfo.CreateILMeth(amap, m, instType(inst, this.data[1].data[1]), this.data[1].data[3]);
    }
  }

  GetCompiledReturnTy(amap, m, minst) {
    if (this.tag === 0) {
      const inst = GetInstantiationForMemberVal(this.data[0], this.IsCSharpStyleExtensionMember, this.data[1], this.data[2], minst);
      const patternInput = AnalyzeTypeOfMemberVal(this.IsCSharpStyleExtensionMember, this.data[0], this.data[1], this.data[2]);
      return defaultArg(patternInput[2], null, arg10_ => instType(inst, arg10_));
    } else if (this.tag === 2) {
      return null;
    } else {
      return this.data[1].GetCompiledReturnTy(amap, m, minst);
    }
  }

  GetFSharpReturnTy(amap, m, minst) {
    return GetFSharpViewOfReturnType(amap.g, this.GetCompiledReturnTy(amap, m, minst));
  }

  GetParamTypes(amap, m, minst) {
    if (this.tag === 0) {
      const paramTypes = ((arg00, arg10, arg20) => ParamNameAndType.FromMember(arg00, arg10, arg20))(this.IsCSharpStyleExtensionMember, this.data[0], this.data[2]);

      const inst = GetInstantiationForMemberVal(this.data[0], this.IsCSharpStyleExtensionMember, this.data[1], this.data[2], minst);
      return List_1.mapSquared(_arg1 => instType(inst, _arg1.data[1]), paramTypes);
    } else if (this.tag === 2) {
      return new List();
    } else {
      return ofArray([this.data[1].GetParamTypes(amap, m, minst)]);
    }
  }

  GetObjArgTypes(amap, m, minst) {
    if (this.tag === 0) {
      if (this.IsInstance) {
        if (this.IsExtensionMember) {
          const inst = GetInstantiationForMemberVal(this.data[0], this.IsCSharpStyleExtensionMember, this.data[1], this.data[2], minst);
          const rawObjTy = GetObjTypeOfInstanceExtensionMethod(this.data[0], this.data[2]);
          return ofArray([(arg10_ => instType(inst, arg10_))(rawObjTy)]);
        } else {
          return ofArray([this.data[1]]);
        }
      } else {
        return new List();
      }
    } else if (this.tag === 2) {
      return new List();
    } else {
      return this.data[1].GetObjArgTypes(amap, m, minst);
    }
  }

  GetParamAttribs(amap, m) {
    if (this.tag === 0) {
      return List_1.mapSquared(tupledArg => {
        var typ;
        var m_1;
        var copyOfStruct;
        const isParamArrayArg = HasFSharpAttribute(this.data[0], this.data[0].attrib_ParamArrayAttribute, tupledArg[1].Attribs);
        let reflArgInfo;
        const matchValue = TryFindFSharpBoolAttributeAssumeFalse(this.data[0], this.data[0].attrib_ReflectedDefinitionAttribute, tupledArg[1].Attribs);

        if (matchValue == null) {
          reflArgInfo = new ReflectedArgInfo(0);
        } else {
          reflArgInfo = new ReflectedArgInfo(1, getValue(matchValue));
        }

        const isOutArg = HasFSharpAttribute(this.data[0], this.data[0].attrib_OutAttribute, tupledArg[1].Attribs) ? isByrefTy(this.data[0], tupledArg[0]) : false;
        const isCalleeSideOptArg = HasFSharpAttribute(this.data[0], this.data[0].attrib_OptionalArgumentAttribute, tupledArg[1].Attribs);
        const isCallerSideOptArg = HasFSharpAttributeOpt(this.data[0], this.data[0].attrib_OptionalAttribute, tupledArg[1].Attribs);
        let optArgInfo;

        if (isCalleeSideOptArg) {
          optArgInfo = new OptionalArgInfo(1);
        } else if (isCallerSideOptArg) {
          const defaultParameterValueAttribute = TryFindFSharpAttributeOpt(this.data[0], this.data[0].attrib_DefaultParameterValueAttribute, tupledArg[1].Attribs);

          if (defaultParameterValueAttribute != null) {
            const defaultValue = OptionalArgInfo.ValueOfDefaultParameterValueAttrib(getValue(defaultParameterValueAttribute));
            const $var10 = defaultValue != null ? getValue(defaultValue).tag === 0 ? (typ = getValue(defaultValue).data[2], m_1 = getValue(defaultValue).data[1], !typeEquiv(this.data[0], typ, tupledArg[0])) ? [0, getValue(defaultValue).data[1], getValue(defaultValue).data[2]] : [1] : [1] : [1];

            switch ($var10[0]) {
              case 0:
                warning(new _Error(SR.DefaultParameterValueNotAppropriateForArgument(), $var10[1]));
                optArgInfo = new OptionalArgInfo(0);
                break;

              case 1:
                let $var11;

                if (defaultValue != null) {
                  if (getValue(defaultValue).tag === 0) {
                    const activePatternResult31691 = _ConstToILFieldInit___(getValue(defaultValue).data[0]);

                    if (activePatternResult31691 != null) {
                      $var11 = [0, getValue(activePatternResult31691)];
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
                    optArgInfo = new OptionalArgInfo(2, new OptionalArgCallerSideValue(0, $var11[1]));
                    break;

                  case 1:
                    optArgInfo = new OptionalArgInfo(0);
                    break;
                }

                break;
            }
          } else {
            optArgInfo = new OptionalArgInfo(2, isObjTy(this.data[0], tupledArg[0]) ? new OptionalArgCallerSideValue(2) : new OptionalArgCallerSideValue(1));
          }
        } else {
          optArgInfo = new OptionalArgInfo(0);
        }

        const isCallerLineNumberArg = HasFSharpAttribute(this.data[0], this.data[0].attrib_CallerLineNumberAttribute, tupledArg[1].Attribs);
        const isCallerFilePathArg = HasFSharpAttribute(this.data[0], this.data[0].attrib_CallerFilePathAttribute, tupledArg[1].Attribs);
        const isCallerMemberNameArg = HasFSharpAttribute(this.data[0], this.data[0].attrib_CallerMemberNameAttribute, tupledArg[1].Attribs);
        let callerInfoInfo;
        const matchValue_1 = [isCallerLineNumberArg, isCallerFilePathArg, isCallerMemberNameArg];
        const $var12 = matchValue_1[0] ? matchValue_1[1] ? [5] : matchValue_1[2] ? [5] : [1] : matchValue_1[1] ? matchValue_1[2] ? [4] : [2] : matchValue_1[2] ? [3] : [0];

        switch ($var12[0]) {
          case 0:
            callerInfoInfo = new CallerInfoInfo(0);
            break;

          case 1:
            callerInfoInfo = new CallerInfoInfo(1);
            break;

          case 2:
            callerInfoInfo = new CallerInfoInfo(3);
            break;

          case 3:
            callerInfoInfo = new CallerInfoInfo(2);
            break;

          case 4:
            const matchValue_2 = TryFindFSharpAttribute(this.data[0], this.data[0].attrib_CallerMemberNameAttribute, tupledArg[1].Attribs);

            if (matchValue_2 != null) {
              const callerMemberNameAttributeRange = getValue(matchValue_2).data[6];
              warning(new _Error(SR.CallerMemberNameIsOverriden((copyOfStruct = getValue(tupledArg[1].Name), copyOfStruct.idText)), callerMemberNameAttributeRange));
              callerInfoInfo = new CallerInfoInfo(3);
            } else {
              throw new Error("Impossible");
            }

            break;

          case 5:
            const matchValue_3 = tryDestOptionTy(this.data[0], tupledArg[0]);
            const $var13 = matchValue_3 != null ? typeEquiv(this.data[0], this.data[0].int32_ty, getValue(matchValue_3)) ? [0, getValue(matchValue_3)] : [1] : [1];

            switch ($var13[0]) {
              case 0:
                callerInfoInfo = new CallerInfoInfo(3);
                break;

              case 1:
                callerInfoInfo = new CallerInfoInfo(1);
                break;
            }

            break;
        }

        return [isParamArrayArg, isOutArg, optArgInfo, callerInfoInfo, reflArgInfo];
      }, GetArgInfosOfMember(this.IsCSharpStyleExtensionMember, this.data[0], this.data[2]));
    } else if (this.tag === 2) {
      return ofArray([new List()]);
    } else {
      return ofArray([toList(delay(() => collect(p => {
        const isParamArrayArg_1 = TryFindILAttribute(this.data[0].attrib_ParamArrayAttribute, p.CustomAttrs);
        let reflArgInfo_1;
        const matchValue_4 = TryDecodeILAttribute(this.data[0], this.data[0].attrib_ReflectedDefinitionAttribute.TypeRef, p.CustomAttrs);
        const $var14 = matchValue_4 != null ? getValue(matchValue_4)[0].tail != null ? getValue(matchValue_4)[0].head.tag === 1 ? getValue(matchValue_4)[0].tail.tail == null ? [0, getValue(matchValue_4)[0].head.data] : [1] : [1] : [1] : [2];

        switch ($var14[0]) {
          case 0:
            reflArgInfo_1 = new ReflectedArgInfo(1, $var14[1]);
            break;

          case 1:
            reflArgInfo_1 = new ReflectedArgInfo(1, false);
            break;

          case 2:
            reflArgInfo_1 = new ReflectedArgInfo(0);
            break;
        }

        const isOutArg_1 = p.IsOut ? !p.IsIn : false;

        const optArgInfo_1 = ((arg00, arg10, arg20, arg30, arg40, arg50) => OptionalArgInfo.FromILParameter(arg00, arg10, arg20, arg30, arg40, arg50))(this.data[0], amap, m, this.data[1].MetadataScope, this.data[1].DeclaringTypeInst, p);

        const isCallerLineNumberArg_1 = TryFindILAttribute(this.data[0].attrib_CallerLineNumberAttribute, p.CustomAttrs);
        const isCallerFilePathArg_1 = TryFindILAttribute(this.data[0].attrib_CallerFilePathAttribute, p.CustomAttrs);
        const isCallerMemberNameArg_1 = TryFindILAttribute(this.data[0].attrib_CallerMemberNameAttribute, p.CustomAttrs);
        let callerInfoInfo_1;
        const matchValue_5 = [isCallerLineNumberArg_1, isCallerFilePathArg_1, isCallerMemberNameArg_1];
        const $var15 = matchValue_5[0] ? matchValue_5[1] ? [4] : matchValue_5[2] ? [4] : [1] : matchValue_5[1] ? matchValue_5[2] ? [4] : [2] : matchValue_5[2] ? [3] : [0];

        switch ($var15[0]) {
          case 0:
            callerInfoInfo_1 = new CallerInfoInfo(0);
            break;

          case 1:
            callerInfoInfo_1 = new CallerInfoInfo(1);
            break;

          case 2:
            callerInfoInfo_1 = new CallerInfoInfo(3);
            break;

          case 3:
            callerInfoInfo_1 = new CallerInfoInfo(2);
            break;

          case 4:
            if (p.Type.TypeRef.FullName === "System.Int32") {
              callerInfoInfo_1 = new CallerInfoInfo(3);
            } else {
              callerInfoInfo_1 = new CallerInfoInfo(1);
            }

            break;
        }

        return singleton([isParamArrayArg_1, isOutArg_1, optArgInfo_1, callerInfoInfo_1, reflArgInfo_1]);
      }, this.data[1].ParamMetadata)))]);
    }
  }

  GetSlotSig(amap, m) {
    if (this.tag === 0) {
      const matchValue = this.data[2].RecursiveValInfo;
      const $var16 = matchValue.tag === 0 ? matchValue.data ? [1] : [0] : [1];

      switch ($var16[0]) {
        case 0:
          error(new _Error(SR.InvalidRecursiveReferenceToAbstractSlot(), m));
          break;

        case 1:
          break;
      }

      const patternInput = GetTypeOfMemberInMemberForm(this.data[0], this.data[2]);
      const formalEnclosingTypars = this.ApparentEnclosingTyconRef.Typars(m);
      const patternInput_1 = List_1.chop(formalEnclosingTypars.length, patternInput[0]);
      const patternInput_2 = mkTyparToTyparRenaming(patternInput_1[0], formalEnclosingTypars);
      const formalParams = List_1.mapSquared($var17 => {
        var f;
        return (tupledArg_1 => MakeSlotParam(tupledArg_1[0], tupledArg_1[1]))((f = arg10_ => instType(patternInput_2[0], arg10_), tupledArg => map1Of2(f, tupledArg[0], tupledArg[1]))($var17));
      }, GetArgInfosOfMember(this.IsCSharpStyleExtensionMember, this.data[0], this.data[2]));
      const formalRetTy = defaultArg(patternInput[2], null, arg10__1 => instType(patternInput_2[0], arg10__1));
      return MakeSlotSig(this.LogicalName, this.ApparentEnclosingType, formalEnclosingTypars, patternInput_1[1], formalParams, formalRetTy);
    } else if (this.tag === 2) {
      return error(new InternalError("no slotsig for DefaultStructCtor", m));
    } else {
      const g = this.TcGlobals;
      const tcref = tcrefOfAppTy(g, this.ApparentEnclosingAppType);
      const formalEnclosingTyparsOrig = tcref.Typars(m);
      const formalEnclosingTypars_1 = copyTypars(formalEnclosingTyparsOrig);
      const patternInput_3 = FixupNewTypars(m, new List(), new List(), formalEnclosingTyparsOrig, formalEnclosingTypars_1);
      const formalMethTypars = copyTypars(this.FormalMethodTypars);
      const patternInput_4 = FixupNewTypars(m, formalEnclosingTypars_1, patternInput_3[1], this.FormalMethodTypars, formalMethTypars);
      let patternInput_5;

      if (this.tag === 1) {
        const ftinfo = ((arg00, arg10) => ILTypeInfo.FromType(arg00, arg10))(g, new TType(1, [tcref, patternInput_3[1]]));

        const formalRetTy_1 = ImportReturnTypeFromMetaData(amap, m, this.data[1].RawMetadata.Return.Type, ftinfo.ILScopeRef, ftinfo.TypeInstOfRawMetadata, patternInput_4[1]);
        const formalParams_1 = ofArray([toList(delay(() => collect(p => {
          const paramType = ImportILTypeFromMetadata(amap, m, ftinfo.ILScopeRef, ftinfo.TypeInstOfRawMetadata, patternInput_4[1], p.Type);
          return singleton(new SlotParam(0, [p.Name, paramType, p.IsIn, p.IsOut, p.IsOptional, new List()]));
        }, this.data[1].RawMetadata.Parameters)))]);
        patternInput_5 = [formalRetTy_1, formalParams_1];
      } else {
        throw new Error("unreachable");
      }

      return MakeSlotSig(this.LogicalName, this.ApparentEnclosingType, formalEnclosingTypars_1, formalMethTypars, patternInput_5[1], patternInput_5[0]);
    }
  }

  GetParamDatas(amap, m, minst) {
    var mapping;
    let paramNamesAndTypes;

    if (this.tag === 0) {
      const items = ((arg00, arg10, arg20) => ParamNameAndType.FromMember(arg00, arg10, arg20))(this.IsCSharpStyleExtensionMember, this.data[0], this.data[2]);

      const inst = GetInstantiationForMemberVal(this.data[0], this.IsCSharpStyleExtensionMember, this.data[1], this.data[2], minst);
      paramNamesAndTypes = CurriedLambda((arg00_1, arg10_1) => ParamNameAndType.InstantiateCurried(arg00_1, arg10_1))(inst)(items);
    } else if (this.tag === 2) {
      paramNamesAndTypes = ofArray([new List()]);
    } else {
      paramNamesAndTypes = ofArray([this.data[1].GetParamNamesAndTypes(amap, m, minst)]);
    }

    const paramAttribs = this.GetParamAttribs(amap, m);
    return toList(map2((mapping = (tupledArg, _arg2) => new ParamData(0, [tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], _arg2.data[0], tupledArg[4], _arg2.data[1]]), (list1, list2) => toList(map2(mapping, list1, list2))), paramAttribs, paramNamesAndTypes));
  }

  HasParamArrayArg(amap, m, minst) {
    return List_1.existsSquared(_arg3 => _arg3.data[0], this.GetParamDatas(amap, m, minst));
  }

  GetFormalTyparsOfDeclaringType(m) {
    if (this.IsExtensionMember) {
      return new List();
    } else if (this.tag === 0) {
      const patternInput = AnalyzeTypeOfMemberVal(false, this.data[0], this.data[1], this.data[2]);
      return patternInput[0];
    } else {
      return this.DeclaringTyconRef.Typars(m);
    }
  }

}
setType("Microsoft.FSharp.Compiler.Infos.MethInfo", MethInfo);
export class ILFieldInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.ILFieldInfo",
      interfaces: ["FSharpUnion"],
      cases: [["ILFieldInfo", ILTypeInfo, ILFieldDef]]
    };
  }

  get ApparentEnclosingType() {
    return this.data[0].ToType;
  }

  get ApparentEnclosingAppType() {
    return this.ApparentEnclosingType;
  }

  get ApparentEnclosingTyconRef() {
    return tcrefOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType);
  }

  get DeclaringTyconRef() {
    return this.ApparentEnclosingTyconRef;
  }

  get TcGlobals() {
    return this.data[0].TcGlobals;
  }

  get ILTypeRef() {
    return this.data[0].ILTypeRef;
  }

  get ScopeRef() {
    return this.ILTypeRef.Scope;
  }

  get TypeInst() {
    return this.data[0].TypeInstOfRawMetadata;
  }

  get FieldName() {
    return this.data[1].Name;
  }

  get IsInitOnly() {
    return this.data[1].IsInitOnly;
  }

  get IsValueType() {
    return this.data[0].IsValueType;
  }

  get IsStatic() {
    return this.data[1].IsStatic;
  }

  get IsSpecialName() {
    return this.data[1].IsSpecialName;
  }

  get LiteralValue() {
    return this.data[1].IsLiteral ? this.data[1].LiteralValue : null;
  }

  get ILFieldType() {
    return this.data[1].FieldType;
  }

  FieldType(amap, m) {
    return ImportILTypeFromMetadata(amap, m, this.data[0].ILScopeRef, this.data[0].TypeInstOfRawMetadata, new List(), this.data[1].FieldType);
  }

  static ILFieldInfosUseIdenticalDefinitions(x1, x2) {
    const matchValue = [x1, x2];
    const x2_1 = matchValue[1].data[1];
    const x1_1 = matchValue[0].data[1];
    return x1_1 === x2_1;
  }

  get ILFieldRef() {
    return rescopeILFieldRef(this.ScopeRef, mkILFieldRef(this.ILTypeRef, this.FieldName, this.ILFieldType));
  }

  ComputeHashCode() {
    return hash(this.FieldName);
  }

  ToString() {
    return this.FieldName;
  }

}
setType("Microsoft.FSharp.Compiler.Infos.ILFieldInfo", ILFieldInfo);
export class RecdFieldInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.RecdFieldInfo",
      interfaces: ["FSharpUnion"],
      cases: [["RecdFieldInfo", makeGeneric(List, {
        T: TType
      }), RecdFieldRef]]
    };
  }

  get TypeInst() {
    return this.data[0];
  }

  get RecdFieldRef() {
    return this.data[1];
  }

  get RecdField() {
    return this.RecdFieldRef.RecdField;
  }

  get IsStatic() {
    return this.RecdField.IsStatic;
  }

  get LiteralValue() {
    return this.RecdField.LiteralValue;
  }

  get TyconRef() {
    return this.RecdFieldRef.TyconRef;
  }

  get Tycon() {
    return this.RecdFieldRef.Tycon;
  }

  get Name() {
    return this.RecdField.Name;
  }

  get FieldType() {
    return actualTyOfRecdFieldRef(this.RecdFieldRef, this.TypeInst);
  }

  get DeclaringType() {
    return new TType(1, [this.RecdFieldRef.TyconRef, this.TypeInst]);
  }

  ToString() {
    return toString(this.TyconRef) + "::" + this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.Infos.RecdFieldInfo", RecdFieldInfo);
export class UnionCaseInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.UnionCaseInfo",
      interfaces: ["FSharpUnion"],
      cases: [["UnionCaseInfo", makeGeneric(List, {
        T: TType
      }), UnionCaseRef]]
    };
  }

  get TypeInst() {
    return this.data[0];
  }

  get UnionCaseRef() {
    return this.data[1];
  }

  get UnionCase() {
    return this.UnionCaseRef.UnionCase;
  }

  get TyconRef() {
    return this.UnionCaseRef.TyconRef;
  }

  get Tycon() {
    return this.UnionCaseRef.Tycon;
  }

  get Name() {
    return this.UnionCase.DisplayName;
  }

  GetTyparInst(m) {
    return mkTyparInst(this.TyconRef.Typars(m), this.TypeInst);
  }

  ToString() {
    return toString(this.TyconRef) + "::" + this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.Infos.UnionCaseInfo", UnionCaseInfo);
export class ILPropInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.ILPropInfo",
      interfaces: ["FSharpUnion"],
      cases: [["ILPropInfo", ILTypeInfo, ILPropertyDef]]
    };
  }

  get TcGlobals() {
    return this.data[0].TcGlobals;
  }

  get ILTypeInfo() {
    return this.data[0];
  }

  get ApparentEnclosingType() {
    return this.data[0].ToType;
  }

  get ApparentEnclosingAppType() {
    return helpEnsureTypeHasMetadata(this.TcGlobals, this.ApparentEnclosingType);
  }

  get RawMetadata() {
    return this.data[1];
  }

  get PropertyName() {
    return this.RawMetadata.Name;
  }

  get GetterMethod() {
    const mdef = resolveILMethodRef(this.ILTypeInfo.RawMetadata, getValue(this.RawMetadata.GetMethod));
    return new ILMethInfo(0, [this.TcGlobals, this.ILTypeInfo.ToType, null, mdef, new List()]);
  }

  get SetterMethod() {
    const mdef = resolveILMethodRef(this.ILTypeInfo.RawMetadata, getValue(this.RawMetadata.SetMethod));
    return new ILMethInfo(0, [this.TcGlobals, this.ILTypeInfo.ToType, null, mdef, new List()]);
  }

  get HasGetter() {
    return this.RawMetadata.GetMethod != null;
  }

  get HasSetter() {
    return this.RawMetadata.SetMethod != null;
  }

  get IsStatic() {
    return this.RawMetadata.CallingConv.Equals(new ILThisConvention(2));
  }

  get IsVirtual() {
    return (this.HasGetter ? this.GetterMethod.IsVirtual : false) ? true : this.HasSetter ? this.SetterMethod.IsVirtual : false;
  }

  get IsNewSlot() {
    return (this.HasGetter ? this.GetterMethod.IsNewSlot : false) ? true : this.HasSetter ? this.SetterMethod.IsNewSlot : false;
  }

  GetParamNamesAndTypes(amap, m) {
    return map(ty => new ParamNameAndType(0, [null, ImportILTypeFromMetadata(amap, m, this.data[0].ILScopeRef, this.data[0].TypeInstOfRawMetadata, new List(), ty)]), this.data[1].Args);
  }

  GetParamTypes(amap, m) {
    return map(ty => ImportILTypeFromMetadata(amap, m, this.data[0].ILScopeRef, this.data[0].TypeInstOfRawMetadata, new List(), ty), this.data[1].Args);
  }

  GetPropertyType(amap, m) {
    return ImportILTypeFromMetadata(amap, m, this.data[0].ILScopeRef, this.data[0].TypeInstOfRawMetadata, new List(), this.data[1].PropertyType);
  }

  ToString() {
    return toString(this.ILTypeInfo) + "::" + this.PropertyName;
  }

}
setType("Microsoft.FSharp.Compiler.Infos.ILPropInfo", ILPropInfo);
export class PropInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.PropInfo",
      interfaces: ["FSharpUnion"],
      cases: [["FSProp", TcGlobals, TType, Option(ValRef), Option(ValRef)], ["ILProp", ILPropInfo]]
    };
  }

  get ApparentEnclosingType() {
    return this.tag === 0 ? this.data[1] : this.data.ILTypeInfo.ToType;
  }

  get ApparentEnclosingAppType() {
    return this.tag === 1 ? this.data.ApparentEnclosingAppType : this.ApparentEnclosingType;
  }

  get ApparentEnclosingTyconRef() {
    return tcrefOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType);
  }

  get DeclaringTyconRef() {
    const matchValue = this.ArbitraryValRef;
    const $var18 = matchValue != null ? (this.IsExtensionMember ? getValue(matchValue).HasDeclaringEntity : false) ? [0, getValue(matchValue)] : [1] : [1];

    switch ($var18[0]) {
      case 0:
        return $var18[1].TopValDeclaringEntity;

      case 1:
        return this.ApparentEnclosingTyconRef;
    }
  }

  get ArbitraryValRef() {
    const $var19 = this.tag === 0 ? this.data[2] == null ? this.data[3] == null ? [1] : [0, getValue(this.data[3])] : [0, getValue(this.data[2])] : [2];

    switch ($var19[0]) {
      case 0:
        return $var19[1];

      case 1:
        throw new Error("unreachable");

      case 2:
        return null;
    }
  }

  get HasDirectXmlComment() {
    const $var20 = this.tag === 0 ? this.data[2] != null ? [0, this.data[0], getValue(this.data[2])] : this.data[3] != null ? [0, this.data[0], getValue(this.data[3])] : [1] : [1];

    switch ($var20[0]) {
      case 0:
        return valRefInThisAssembly($var20[1].compilingFslib, $var20[2]);

      case 1:
        return false;
    }
  }

  get PropertyName() {
    const $var21 = this.tag === 0 ? this.data[2] != null ? [1, getValue(this.data[2])] : this.data[3] != null ? [1, getValue(this.data[3])] : [2] : [0, this.data];

    switch ($var21[0]) {
      case 0:
        return $var21[1].PropertyName;

      case 1:
        return $var21[1].PropertyName;

      case 2:
        throw new Error("unreachable");
    }
  }

  get HasGetter() {
    return this.tag === 0 ? this.data[2] != null : this.data.HasGetter;
  }

  get HasSetter() {
    return this.tag === 0 ? this.data[3] != null : this.data.HasSetter;
  }

  get IsExtensionMember() {
    const matchValue = this.ArbitraryValRef;

    if (matchValue != null) {
      return getValue(matchValue).IsExtensionMember;
    } else {
      return false;
    }
  }

  get IsVirtualProperty() {
    const $var22 = this.tag === 0 ? this.data[2] != null ? [1, getValue(this.data[2])] : this.data[3] != null ? [1, getValue(this.data[3])] : [2] : [0, this.data];

    switch ($var22[0]) {
      case 0:
        return $var22[1].IsVirtual;

      case 1:
        return ValRef_get_IsVirtualMember.bind($var22[1])();

      case 2:
        throw new Error("unreachable");
    }
  }

  get IsNewSlot() {
    const $var23 = this.tag === 0 ? this.data[2] == null ? this.data[3] == null ? [2] : [1, getValue(this.data[3])] : [1, getValue(this.data[2])] : [0, this.data];

    switch ($var23[0]) {
      case 0:
        return $var23[1].IsNewSlot;

      case 1:
        return ValRef_get_IsDispatchSlotMember.bind($var23[1])();

      case 2:
        throw new Error("unreachable");
    }
  }

  get IsDispatchSlot() {
    const $var24 = this.tag === 0 ? this.data[2] != null ? [1, this.data[0], this.data[1], getValue(this.data[2])] : this.data[3] != null ? [1, this.data[0], this.data[1], getValue(this.data[3])] : [2] : [0, this.data];

    switch ($var24[0]) {
      case 0:
        return $var24[1].IsVirtual;

      case 1:
        if (isInterfaceTy($var24[1], $var24[2])) {
          return true;
        } else {
          return getValue($var24[3].MemberInfo).MemberFlags.IsDispatchSlot;
        }

      case 2:
        throw new Error("unreachable");
    }
  }

  get IsStatic() {
    const $var25 = this.tag === 0 ? this.data[2] == null ? this.data[3] == null ? [2] : [1, getValue(this.data[3])] : [1, getValue(this.data[2])] : [0, this.data];

    switch ($var25[0]) {
      case 0:
        return $var25[1].IsStatic;

      case 1:
        return !$var25[1].IsInstanceMember;

      case 2:
        throw new Error("unreachable");
    }
  }

  get IsDefiniteFSharpOverride() {
    const matchValue = this.ArbitraryValRef;

    if (matchValue == null) {
      return false;
    } else {
      return ValRef_get_IsDefiniteFSharpOverrideMember.bind(getValue(matchValue))();
    }
  }

  get ImplementedSlotSignatures() {
    return ValRef_get_ImplementedSlotSignatures.bind(getValue(this.ArbitraryValRef))();
  }

  get IsFSharpExplicitInterfaceImplementation() {
    const matchValue = this.ArbitraryValRef;

    if (matchValue == null) {
      return false;
    } else {
      return ValRef_IsFSharpExplicitInterfaceImplementation.bind(getValue(matchValue))(this.TcGlobals);
    }
  }

  get IsIndexer() {
    if (this.tag === 0) {
      if (this.data[2] == null) {
        if (this.data[3] == null) {
          throw new Error("unreachable");
        } else {
          const arginfos = ArgInfosOfMember(this.data[0], getValue(this.data[3]));

          if (arginfos.length === 1) {
            return arginfos.head.length >= 2;
          } else {
            return false;
          }
        }
      } else {
        const arginfos_1 = ArgInfosOfMember(this.data[0], getValue(this.data[2]));

        if (arginfos_1.length === 1) {
          return arginfos_1.head.length >= 1;
        } else {
          return false;
        }
      }
    } else {
      return this.data.data[1].Args.length !== 0;
    }
  }

  get IsFSharpEventProperty() {
    const $var26 = this.tag === 0 ? this.data[2] != null ? this.data[3] == null ? [0, this.data[0], getValue(this.data[2])] : [1] : [1] : [1];

    switch ($var26[0]) {
      case 0:
        return ValRef_IsFSharpEventProperty.bind($var26[2])($var26[1]);

      case 1:
        return false;
    }
  }

  get DropSetter() {
    const $var27 = this.tag === 0 ? this.data[2] != null ? [0, this.data[0], this.data[1], getValue(this.data[2])] : [1] : [1];

    switch ($var27[0]) {
      case 0:
        return new PropInfo(0, [$var27[1], $var27[2], $var27[3], null]);

      case 1:
        return this;
    }
  }

  get DropGetter() {
    const $var28 = this.tag === 0 ? this.data[3] != null ? [0, this.data[0], this.data[1], getValue(this.data[3])] : [1] : [1];

    switch ($var28[0]) {
      case 0:
        return new PropInfo(0, [$var28[1], $var28[2], null, $var28[3]]);

      case 1:
        return this;
    }
  }

  get XmlDoc() {
    const $var29 = this.tag === 0 ? this.data[2] == null ? this.data[3] == null ? [2] : [1, getValue(this.data[3])] : [1, getValue(this.data[2])] : [0];

    switch ($var29[0]) {
      case 0:
        return XmlDoc.Empty;

      case 1:
        return $var29[1].XmlDoc;

      case 2:
        throw new Error("unreachable");
    }
  }

  get TcGlobals() {
    return this.tag === 0 ? this.data[0] : this.data.TcGlobals;
  }

  get IsValueType() {
    return isStructTy(this.TcGlobals, this.ApparentEnclosingType);
  }

  GetPropertyType(amap, m) {
    const $var30 = this.tag === 0 ? this.data[2] != null ? [1, this.data[0], this.data[1], getValue(this.data[2])] : this.data[3] != null ? [1, this.data[0], this.data[1], getValue(this.data[3])] : [2] : [0, this.data];

    switch ($var30[0]) {
      case 0:
        return $var30[1].GetPropertyType(amap, m);

      case 1:
        const inst = GetInstantiationForPropertyVal($var30[1], $var30[2], $var30[3]);
        return (arg10_ => instType(inst, arg10_))(ReturnTypeOfPropertyVal($var30[1], $var30[3].Deref));

      case 2:
        throw new Error("unreachable");
    }
  }

  GetParamNamesAndTypes(amap, m) {
    const $var31 = this.tag === 0 ? this.data[2] != null ? [1, this.data[0], this.data[1], getValue(this.data[2])] : this.data[3] != null ? [1, this.data[0], this.data[1], getValue(this.data[3])] : [2] : [0, this.data];

    switch ($var31[0]) {
      case 0:
        return $var31[1].GetParamNamesAndTypes(amap, m);

      case 1:
        const inst = GetInstantiationForPropertyVal($var31[1], $var31[2], $var31[3]);
        return map($var32 => CurriedLambda((arg00, arg10) => ParamNameAndType.Instantiate(arg00, arg10))(inst)((tupledArg => ParamNameAndType.FromArgInfo(tupledArg[0], tupledArg[1]))($var32)), ArgInfosOfPropertyVal($var31[1], $var31[3].Deref));

      case 2:
        throw new Error("unreachable");
    }
  }

  GetParamDatas(amap, m) {
    return map(_arg4 => new ParamData(0, [false, false, new OptionalArgInfo(0), new CallerInfoInfo(0), _arg4.data[0], new ReflectedArgInfo(0), _arg4.data[1]]), this.GetParamNamesAndTypes(amap, m));
  }

  GetParamTypes(amap, m) {
    return map(_arg5 => _arg5.data[1], this.GetParamNamesAndTypes(amap, m));
  }

  get GetterMethod() {
    if (this.tag === 0) {
      if (this.data[2] != null) {
        return new MethInfo(0, [this.data[0], this.data[1], getValue(this.data[2]), null]);
      } else {
        throw new Error("no getter method");
      }
    } else {
      return new MethInfo(1, [this.TcGlobals, this.data.GetterMethod, null]);
    }
  }

  get SetterMethod() {
    if (this.tag === 0) {
      if (this.data[3] != null) {
        return new MethInfo(0, [this.data[0], this.data[1], getValue(this.data[3]), null]);
      } else {
        throw new Error("no setter method");
      }
    } else {
      return new MethInfo(1, [this.TcGlobals, this.data.SetterMethod, null]);
    }
  }

  static PropInfosUseIdenticalDefinitions(x1, x2) {
    const optVrefEq = function (g, _arg1) {
      const $var33 = _arg1[0] == null ? _arg1[1] == null ? [1] : [2] : _arg1[1] != null ? [0, getValue(_arg1[0]), getValue(_arg1[1])] : [2];

      switch ($var33[0]) {
        case 0:
          return valRefEq(g, $var33[1], $var33[2]);

        case 1:
          return true;

        case 2:
          return false;
      }
    };

    const matchValue = [x1, x2];
    const $var34 = matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [1, matchValue[0].data[0], matchValue[0].data[2], matchValue[1].data[2], matchValue[0].data[3], matchValue[1].data[3]] : [2] : matchValue[1].tag === 1 ? [0, matchValue[0].data, matchValue[1].data] : [2];

    switch ($var34[0]) {
      case 0:
        return $var34[1].RawMetadata === $var34[2].RawMetadata;

      case 1:
        if (optVrefEq($var34[1], [$var34[2], $var34[3]])) {
          return optVrefEq($var34[1], [$var34[4], $var34[5]]);
        } else {
          return false;
        }

      case 2:
        return false;
    }
  }

  ComputeHashCode() {
    if (this.tag === 0) {
      const vth = [defaultArg(this.data[2], null, vr => vr.LogicalName), defaultArg(this.data[3], null, vr_1 => vr_1.LogicalName)];
      return hash(vth) | 0;
    } else {
      return hash(this.data.RawMetadata.Name) | 0;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Infos.PropInfo", PropInfo);
export class ILEventInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.ILEventInfo",
      interfaces: ["FSharpUnion"],
      cases: [["ILEventInfo", ILTypeInfo, ILEventDef]]
    };
  }

  get ApparentEnclosingType() {
    return this.data[0].ToType;
  }

  get ApparentEnclosingAppType() {
    return this.ApparentEnclosingType;
  }

  get DeclaringTyconRef() {
    return tcrefOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType);
  }

  get TcGlobals() {
    return this.data[0].TcGlobals;
  }

  get RawMetadata() {
    return this.data[1];
  }

  get ILTypeInfo() {
    return this.data[0];
  }

  get AddMethod() {
    const mdef = resolveILMethodRef(this.ILTypeInfo.RawMetadata, this.RawMetadata.AddMethod);
    return new ILMethInfo(0, [this.TcGlobals, this.ILTypeInfo.ToType, null, mdef, new List()]);
  }

  get RemoveMethod() {
    const mdef = resolveILMethodRef(this.ILTypeInfo.RawMetadata, this.RawMetadata.RemoveMethod);
    return new ILMethInfo(0, [this.TcGlobals, this.ILTypeInfo.ToType, null, mdef, new List()]);
  }

  get TypeRef() {
    return this.ILTypeInfo.ILTypeRef;
  }

  get Name() {
    return this.RawMetadata.Name;
  }

  get IsStatic() {
    return this.AddMethod.IsStatic;
  }

  ToString() {
    return toString(this.ILTypeInfo) + "::" + this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.Infos.ILEventInfo", ILEventInfo);
export class BadEventTransformation extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, BadEventTransformation.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.BadEventTransformation",
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
setType("Microsoft.FSharp.Compiler.Infos.BadEventTransformation", BadEventTransformation);

function tyConformsToIDelegateEvent(g, ty) {
  if (isIDelegateEventType(g, ty)) {
    return isDelegateTy(g, destIDelegateEventType(g, ty));
  } else {
    return false;
  }
}

export function nonStandardEventError(nm, m) {
  return new _Error(SR.eventHasNonStandardType(nm, "add_" + nm, "remove_" + nm), m);
}
export function FindDelegateTypeOfPropertyEvent(g, amap, nm, m, ty) {
  const matchValue = SearchEntireHierarchyOfType(function (ty_1) {
    return tyConformsToIDelegateEvent(g, ty_1);
  }, g, amap, m, ty);

  if (matchValue != null) {
    return destIDelegateEventType(g, getValue(matchValue));
  } else {
    return error(nonStandardEventError(nm, m));
  }
}
export class EventInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.EventInfo",
      interfaces: ["FSharpUnion"],
      cases: [["FSEvent", TcGlobals, PropInfo, ValRef, ValRef], ["ILEvent", ILEventInfo]]
    };
  }

  get ApparentEnclosingType() {
    return this.tag === 0 ? this.data[1].ApparentEnclosingType : this.data.ApparentEnclosingType;
  }

  get ApparentEnclosingAppType() {
    return this.tag === 1 ? this.data.ApparentEnclosingAppType : this.ApparentEnclosingType;
  }

  get ApparentEnclosingTyconRef() {
    return tcrefOfAppTy(this.TcGlobals, this.ApparentEnclosingAppType);
  }

  get DeclaringTyconRef() {
    const matchValue = this.ArbitraryValRef;
    const $var35 = matchValue != null ? (this.IsExtensionMember ? getValue(matchValue).HasDeclaringEntity : false) ? [0, getValue(matchValue)] : [1] : [1];

    switch ($var35[0]) {
      case 0:
        return $var35[1].TopValDeclaringEntity;

      case 1:
        return this.ApparentEnclosingTyconRef;
    }
  }

  get HasDirectXmlComment() {
    return this.tag === 0 ? this.data[1].HasDirectXmlComment : false;
  }

  get XmlDoc() {
    return this.tag === 0 ? this.data[1].XmlDoc : XmlDoc.Empty;
  }

  get EventName() {
    return this.tag === 0 ? this.data[1].PropertyName : this.data.Name;
  }

  get IsStatic() {
    return this.tag === 0 ? this.data[1].IsStatic : this.data.IsStatic;
  }

  get IsExtensionMember() {
    return this.tag === 0 ? this.data[1].IsExtensionMember : false;
  }

  get TcGlobals() {
    return this.tag === 0 ? this.data[0] : this.data.TcGlobals;
  }

  get IsValueType() {
    return isStructTy(this.TcGlobals, this.ApparentEnclosingType);
  }

  get AddMethod() {
    return this.tag === 0 ? new MethInfo(0, [this.data[0], this.data[1].ApparentEnclosingType, this.data[2], null]) : new MethInfo(1, [this.data.TcGlobals, this.data.AddMethod, null]);
  }

  get RemoveMethod() {
    return this.tag === 0 ? new MethInfo(0, [this.data[0], this.data[1].ApparentEnclosingType, this.data[3], null]) : new MethInfo(1, [this.TcGlobals, this.data.RemoveMethod, null]);
  }

  get ArbitraryValRef() {
    return this.tag === 0 ? this.data[2] : null;
  }

  GetDelegateType(amap, m) {
    if (this.tag === 0) {
      return FindDelegateTypeOfPropertyEvent(this.data[0], amap, this.EventName, m, this.data[1].GetPropertyType(amap, m));
    } else {
      const tinfo = this.data.data[0];
      const edef = this.data.data[1];

      if (edef.EventType == null) {
        error(nonStandardEventError(this.EventName, m));
      }

      return ImportILTypeFromMetadata(amap, m, tinfo.ILScopeRef, tinfo.TypeInstOfRawMetadata, new List(), getValue(edef.EventType));
    }
  }

  static EventInfosUseIdenticalDefintions(x1, x2) {
    const matchValue = [x1, x2];
    const $var36 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [1, matchValue[0].data, matchValue[1].data] : [2] : matchValue[1].tag === 0 ? [0, matchValue[0].data[0], matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[2], matchValue[1].data[2], matchValue[0].data[3], matchValue[1].data[3]] : [2];

    switch ($var36[0]) {
      case 0:
        if (function (arg00, arg10) {
          return PropInfo.PropInfosUseIdenticalDefinitions(arg00, arg10);
        }($var36[2], $var36[3]) ? valRefEq($var36[1], $var36[4], $var36[5]) : false) {
          return valRefEq($var36[1], $var36[6], $var36[7]);
        } else {
          return false;
        }

      case 1:
        return $var36[1].RawMetadata === $var36[2].RawMetadata;

      case 2:
        return false;
    }
  }

  ComputeHashCode() {
    return this.tag === 0 ? hash([this.data[1].ComputeHashCode(), this.data[2].LogicalName, this.data[3].LogicalName]) : hash(this.data.RawMetadata.Name);
  }

}
setType("Microsoft.FSharp.Compiler.Infos.EventInfo", EventInfo);
export class CompiledSig {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Infos.CompiledSig",
      interfaces: ["FSharpUnion"],
      cases: [["CompiledSig", makeGeneric(List, {
        T: makeGeneric(List, {
          T: TType
        })
      }), Option(TType), makeGeneric(List, {
        T: Typar
      }), makeGeneric(List, {
        T: Tuple([Typar, TType])
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Infos.CompiledSig", CompiledSig);
export function CompiledSigOfMeth(g, amap, m, minfo) {
  const formalMethTypars = minfo.FormalMethodTypars;
  const fminst = generalizeTypars(formalMethTypars);
  const vargtys = minfo.GetParamTypes(amap, m, fminst);
  const vrty = minfo.GetCompiledReturnTy(amap, m, fminst);
  let fmtpinst;
  const parentTyArgs = argsOfAppTy(g, minfo.ApparentEnclosingAppType);
  const memberParentTypars = minfo.GetFormalTyparsOfDeclaringType(m);
  fmtpinst = mkTyparInst(memberParentTypars, parentTyArgs);
  return new CompiledSig(0, [vargtys, vrty, formalMethTypars, fmtpinst]);
}
export function MethInfosEquivByNameAndPartialSig(erasureFlag, ignoreFinal, g, amap, m, minfo, minfo2) {
  var p;
  var arg20_;

  if ((minfo.LogicalName === minfo2.LogicalName ? minfo.GenericArity === minfo2.GenericArity : false) ? ignoreFinal ? true : minfo.IsFinal === minfo2.IsFinal : false) {
    const formalMethTypars = minfo.FormalMethodTypars;
    const fminst = generalizeTypars(formalMethTypars);
    const formalMethTypars2 = minfo2.FormalMethodTypars;
    const fminst2 = generalizeTypars(formalMethTypars2);
    const argtys = minfo.GetParamTypes(amap, m, fminst);
    const argtys2 = minfo2.GetParamTypes(amap, m, fminst2);
    return List_1.lengthsEqAndForall2((p = (arg20_ = function (arg00, arg10) {
      return TypeEquivEnv.FromEquivTypars(arg00, arg10);
    }(formalMethTypars, formalMethTypars2), function (arg30_, arg40_) {
      return typeAEquivAux(erasureFlag, g, arg20_, arg30_, arg40_);
    }), function (l1, l2) {
      return List_1.lengthsEqAndForall2(p, l1, l2);
    }), argtys, argtys2);
  } else {
    return false;
  }
}
export function PropInfosEquivByNameAndPartialSig(erasureFlag, g, amap, m, pinfo, pinfo2) {
  if (pinfo.PropertyName === pinfo2.PropertyName) {
    const argtys = pinfo.GetParamTypes(amap, m);
    const argtys2 = pinfo2.GetParamTypes(amap, m);
    return List_1.lengthsEqAndForall2(function (arg20_, arg30_) {
      return typeEquivAux(erasureFlag, g, arg20_, arg30_);
    }, argtys, argtys2);
  } else {
    return false;
  }
}
export function MethInfosEquivByNameAndSig(erasureFlag, ignoreFinal, g, amap, m, minfo, minfo2) {
  if (MethInfosEquivByNameAndPartialSig(erasureFlag, ignoreFinal, g, amap, m, minfo, minfo2)) {
    const patternInput = CompiledSigOfMeth(g, amap, m, minfo);
    const patternInput_1 = CompiledSigOfMeth(g, amap, m, minfo2);
    const matchValue = [patternInput.data[1], patternInput_1.data[1]];
    const $var37 = matchValue[0] != null ? matchValue[1] != null ? [1, getValue(matchValue[0]), getValue(matchValue[1])] : [2] : matchValue[1] == null ? [0] : [2];

    switch ($var37[0]) {
      case 0:
        return true;

      case 1:
        return typeAEquivAux(erasureFlag, g, function (arg00, arg10) {
          return TypeEquivEnv.FromEquivTypars(arg00, arg10);
        }(patternInput.data[2], patternInput_1.data[2]), $var37[1], $var37[2]);

      case 2:
        return false;
    }
  } else {
    return false;
  }
}
export function PropInfosEquivByNameAndSig(erasureFlag, g, amap, m, pinfo, pinfo2) {
  if (PropInfosEquivByNameAndPartialSig(erasureFlag, g, amap, m, pinfo, pinfo2)) {
    const retTy = pinfo.GetPropertyType(amap, m);
    const retTy2 = pinfo2.GetPropertyType(amap, m);
    return typeEquivAux(erasureFlag, g, retTy, retTy2);
  } else {
    return false;
  }
}
export function SettersOfPropInfos(pinfos) {
  return choose(function (pinfo) {
    return pinfo.HasSetter ? [pinfo.SetterMethod, pinfo] : null;
  }, pinfos);
}
export function GettersOfPropInfos(pinfos) {
  return choose(function (pinfo) {
    return pinfo.HasGetter ? [pinfo.GetterMethod, pinfo] : null;
  }, pinfos);
}