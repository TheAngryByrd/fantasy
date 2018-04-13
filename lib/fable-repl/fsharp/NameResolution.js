import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { PropTypOfEventInfo, GetSigOfFunctionForDelegate, IsStandardEventInfo, FindMemberFlag, GetIntrinsicMethInfosOfType, GetIntrinsicPropInfosOfType, TryFindIntrinsicNamedItemOfType, TrySelectMemberVal, ExcludeHiddenOfMethInfos, GetIntrinsicMethInfoSetsOfType, PropertyCollector, ExcludeHiddenOfPropInfos, GetIntrinsicPropInfoSetsOfType, GetIntrinsicConstructorInfosOfType, GetImmediateIntrinsicMethInfosOfType, InfoReader } from "./InfoReader";
import { equalsRecords, Interface, clear, Array as _Array, hash, equals, Tuple, getHashCode, compare, Any, Unit, Function as _Function, Option, comparePrimitives, makeGeneric } from "../fable-core/Util";
import { groupBy, concat, collect as collect_1, filter, choose, append, ofArray, mapIndexed, map } from "../fable-core/List";
import List from "../fable-core/List";
import { ValBaseOrThisInfo, mkUnionCaseRef, mkTyparTy, UndefinedName, Duplicate, KeyTyconByAccessNames, KeyTyconByDemangledNameAndArity, newStamp, RecdFieldRef, Typar, ValRef, EntityRef, stripTyparEqns, mkNestedValRef, ActivePatternElemRef, mkModuleUnionCaseRef, TType } from "./tast";
import { ImportILTypeRef, CanImportILTypeRef, ImportMap } from "./import";
import { TcGlobals } from "./TcGlobals";
import CurriedLambda from "../fable-core/CurriedLambda";
import { choose as choose_1, append as append_1, count, iterate, forAll, filter as filter_1, map as map_2, exists, tryLast, foldBack, empty, singleton, sum, sortWith, fold, collect, delay, toList } from "../fable-core/Seq";
import { QueueListModule } from "./QueueList";
import { destRefCellTy, isRefCellTy, mkRefTupledTy, op_MinusMinusGreater, isObjTy, slotSigHasVoidReturnTy, argsOfAppTy, isTyparTy, destAppTy, tcrefOfAppTy, helpEnsureTypeHasMetadata, isAnyTupleTy, isAppTy, isUnionTy, isRecdTy, isInterfaceTy, isDelegateTy, accFreeInTypes, CollectTyparsNoCaching, freeInType, fullDisplayTextOfModRef, typeEquiv, mkAppTy, TryFindFSharpBoolAttribute, isStructTy, isClassTy, HasFSharpAttribute, generalizeTyconRef, ActivePatternInfo$2E$get_Names as ActivePatternInfo_get_Names, $7C$AppTy$7C$_$7C$ as _AppTy___, generalizeTypars, tyconRefEq, isCompiledTupleTyconRef, metadataOfTycon, generalizedTyconRef, TyconRefHasAttribute, TyconRefMultiMap, DisplayEnv, valRefEq, emptyTyparInst, ActivePatternElemRef$2E$get_Name as ActivePatternElemRef_get_Name, TryGetActivePatternInfo } from "./TastOps";
import { defaultArg, makeSome, getValue } from "../fable-core/Option";
import { InternalError, ErrorWithSuggestions, NoSuggestions, error as error_2, warning, CommitOperationResult, Error as _Error, errorR, errorRecovery, UnresolvedPathReferenceNoRange } from "./ErrorLogger";
import { Map$60$2$2E$get_Values as Map_2_get_Values, String as _String, List as List_1, ResultOrExceptionModule, ResultOrException, Map$60$2$2E$LinearTryModifyThenLaterFlatten as Map_2_LinearTryModifyThenLaterFlatten, NameMultiMapModule, Map$60$2$2E$AddAndMarkAsCollapsible as Map_2_AddAndMarkAsCollapsible, Map$60$2$2E$get_Empty$2E$Static as Map_2_get_Empty_Static, LayeredMultiMap, NameMapModule } from "../absil/illib";
import { find, tryFind, add as add_1, create } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import Comparer from "../fable-core/Comparer";
import { AllowMultiIntfInstantiations, PropInfo, EventInfo, ILFieldInfo, RecdFieldInfo, UnionCaseInfo, MethInfo } from "./infos";
import { IsMangledOpName, DecodeGenericTypeName, IsMangledGenericName, NameArityPair, DemangleGenericTypeName, DemangleOperatorName, DecompileOpName, ActivePatternInfo } from "./PrettyNaming";
import { unionRanges, posEq, pos, mkRange, range } from "./range";
import { rangeOfLid, textOfLid, Ident } from "./ast";
import { fromValue } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { IsRecdFieldAccessible, IsPropInfoAccessible, IsILFieldInfoAccessible, IsFieldInfoAccessible, IsUnionCaseAccessible, IsTyconReprAccessible, IsValAccessible, IsMethInfoAccessible, CheckTyconAccessible, IsTypeAccessible, IsAccessible, IsEntityAccessible, AccessorDomain } from "./AccessibilityLogic";
import { MethInfoIsUnseen, PropInfoIsUnseen, CheckFSharpAttributesForUnseen, CheckILAttributesForUnseen, CheckEntityAttributes, MethInfoHasAttribute } from "./AttributeChecking";
import { rescopeILTypeSpec } from "../absil/il";
import Choice from "../fable-core/Choice";
import { addRangeInPlace, map as map_1 } from "../fable-core/Array";
import { System, Microsoft } from "../fcs-fable/adapters";
import { isEmpty, isSubsetOf, differenceInPlace, distinctBy, addInPlace, create as create_1, unionInPlace } from "../fable-core/Set";
import { SR } from "../codegen/FSComp";
import { replace as replace_1, endsWith, printf, toText } from "../fable-core/String";
import { ZsetModule } from "../absil/zset";
import Lazy from "../fable-core/Lazy";
import { minimalStringOfType } from "./NicePrint";
import { Zset, ListSet, NameMapModule as NameMapModule_1 } from "./lib";
import { TypeDefinitelyHasEquality } from "./AugmentWithHashCompare";
export class NameResolver {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.NameResolver",
      properties: {
        InfoReader: InfoReader,
        InstantiationGenerator: makeGeneric(List, {
          T: TType
        }),
        amap: ImportMap,
        g: TcGlobals
      }
    };
  }

  constructor(g, amap, infoReader, instantiationGenerator) {
    this["g@38"] = g;
    this["amap@39"] = amap;
    this.infoReader = infoReader;
    this.instantiationGenerator = instantiationGenerator;
  }

  static [".ctor"](g, amap, infoReader, instantiationGenerator, _arg1) {
    return new NameResolver(g, amap, infoReader, instantiationGenerator);
  }

  get InstantiationGenerator() {
    return CurriedLambda(this.instantiationGenerator);
  }

  get g() {
    return this["g@38"];
  }

  get amap() {
    return this["amap@39"];
  }

  get InfoReader() {
    return this.infoReader;
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.NameResolver", NameResolver);
export function UnionCaseRefsInTycon(modref, tycon) {
  return map(function (uc) {
    return mkModuleUnionCaseRef(modref, tycon, uc);
  }, tycon.UnionCasesAsList);
}
export function UnionCaseRefsInModuleOrNamespace(modref) {
  return toList(delay(function () {
    return collect(function (x) {
      return UnionCaseRefsInTycon(modref, x);
    }, modref.ModuleOrNamespaceType.AllEntities);
  }));
}
export function TryFindTypeWithUnionCase(modref, id) {
  return QueueListModule.tryFind(function (tycon) {
    return tycon.GetUnionCaseByName(id.idText) != null;
  }, modref.ModuleOrNamespaceType.AllEntities);
}
export function TryFindTypeWithRecdField(modref, id) {
  return QueueListModule.tryFind(function (tycon) {
    return tycon.GetFieldByName(id.idText) != null;
  }, modref.ModuleOrNamespaceType.AllEntities);
}
export function ActivePatternElemsOfValRef(vref) {
  const matchValue = TryGetActivePatternInfo(vref);

  if (matchValue == null) {
    return new List();
  } else {
    return mapIndexed(function (i, _arg1) {
      return new ActivePatternElemRef(0, [getValue(matchValue), vref, i]);
    }, getValue(matchValue).ActiveTags);
  }
}
export function TryMkValRefInModRef(modref, vspec) {
  try {
    return function () {
      return mkNestedValRef(modref, vspec);
    }();
  } catch (matchValue) {
    if (matchValue instanceof UnresolvedPathReferenceNoRange) {
      return null;
    } else {
      throw matchValue;
    }
  }
}
export function ActivePatternElemsOfVal(modref, vspec) {
  const matchValue = TryMkValRefInModRef(modref, vspec);

  if (matchValue != null) {
    return ActivePatternElemsOfValRef(getValue(matchValue));
  } else {
    return new List();
  }
}
export function ActivePatternElemsOfModuleOrNamespace(modref) {
  const mtyp = modref.ModuleOrNamespaceType;
  const $var1 = mtyp.ActivePatternElemRefLookupTable;
  const matchValue = $var1.contents;

  if (matchValue == null) {
    const res = function () {
      return fold(function (acc, apref) {
        return NameMapModule.add(ActivePatternElemRef_get_Name.bind(apref)(), apref, acc);
      }, create(null, new Comparer(comparePrimitives)), collect(function (vspec) {
        return ActivePatternElemsOfVal(modref, vspec);
      }, mtyp.AllValsAndMembers));
    }();

    $var1.contents = makeSome(res);
    return res;
  } else {
    return getValue(matchValue);
  }
}

function _AbbrevOrAppTy___(typ) {
  const matchValue = stripTyparEqns(typ);

  if (matchValue.tag === 1) {
    return matchValue.data[0];
  } else {
    return null;
  }
}

export { _AbbrevOrAppTy___ as $7C$AbbrevOrAppTy$7C$_$7C$ };
export class ArgumentContainer {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.ArgumentContainer",
      interfaces: ["FSharpUnion"],
      cases: [["Method", MethInfo], ["Type", EntityRef], ["UnionCase", UnionCaseInfo]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.ArgumentContainer", ArgumentContainer);
export class Item {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.Item",
      interfaces: ["FSharpUnion"],
      cases: [["Value", ValRef], ["UnionCase", UnionCaseInfo, "boolean"], ["ActivePatternResult", ActivePatternInfo, TType, "number", range], ["ActivePatternCase", ActivePatternElemRef], ["ExnCase", EntityRef], ["RecdField", RecdFieldInfo], ["NewDef", Ident], ["ILField", ILFieldInfo], ["Event", EventInfo], ["Property", "string", makeGeneric(List, {
        T: PropInfo
      })], ["MethodGroup", "string", makeGeneric(List, {
        T: MethInfo
      }), Option(MethInfo)], ["CtorGroup", "string", makeGeneric(List, {
        T: MethInfo
      })], ["FakeInterfaceCtor", TType], ["DelegateCtor", TType], ["Types", "string", makeGeneric(List, {
        T: TType
      })], ["CustomOperation", "string", _Function([Unit, Option("string")]), Option(MethInfo)], ["CustomBuilder", "string", ValRef], ["TypeVar", "string", Typar], ["ModuleOrNamespaces", makeGeneric(List, {
        T: EntityRef
      })], ["ImplicitOp", Ident, Any], ["ArgName", Ident, TType, Option(ArgumentContainer)], ["SetterArg", Ident, Item], ["UnqualifiedType", makeGeneric(List, {
        T: EntityRef
      })]]
    };
  }

  static MakeMethGroup(nm, minfos) {
    const minfos_1 = toList(sortWith(($var2, $var3) => compare(function (minfo) {
      return sum(minfo.NumArgs);
    }($var2), function (minfo) {
      return sum(minfo.NumArgs);
    }($var3)), minfos));
    return new Item(10, [nm, minfos_1, null]);
  }

  static MakeCtorGroup(nm, minfos) {
    const minfos_1 = toList(sortWith(($var4, $var5) => compare(function (minfo) {
      return sum(minfo.NumArgs);
    }($var4), function (minfo) {
      return sum(minfo.NumArgs);
    }($var5)), minfos));
    return new Item(11, [nm, minfos_1]);
  }

  get DisplayName() {
    let $var6;

    if (this.tag === 0) {
      $var6 = [0, this.data];
    } else if (this.tag === 3) {
      $var6 = [1, this.data];
    } else if (this.tag === 1) {
      $var6 = [2, this.data[0]];
    } else if (this.tag === 4) {
      $var6 = [3, this.data];
    } else if (this.tag === 5) {
      $var6 = [4, this.data];
    } else if (this.tag === 6) {
      $var6 = [5, this.data];
    } else if (this.tag === 7) {
      $var6 = [6, this.data];
    } else if (this.tag === 8) {
      $var6 = [7, this.data];
    } else if (this.tag === 9) {
      if (this.data[1].tail != null) {
        if (this.data[1].head.tag === 0) {
          if (this.data[1].head.data[2] != null) {
            $var6 = [8, getValue(this.data[1].head.data[2])];
          } else if (this.data[1].head.data[3] != null) {
            $var6 = [8, getValue(this.data[1].head.data[3])];
          } else {
            $var6 = [9, this.data[0]];
          }
        } else {
          $var6 = [9, this.data[0]];
        }
      } else {
        $var6 = [9, this.data[0]];
      }
    } else if (this.tag === 10) {
      if (this.data[1].tail != null) {
        if (this.data[1].head.tag === 0) {
          $var6 = [10, this.data[1].head.data[2]];
        } else {
          $var6 = [11, this.data[0]];
        }
      } else {
        $var6 = [11, this.data[0]];
      }
    } else if (this.tag === 11) {
      $var6 = [12, this.data[0]];
    } else if (this.tag === 12) {
      const activePatternResult33947 = _AbbrevOrAppTy___(this.data);

      if (activePatternResult33947 != null) {
        $var6 = [13, getValue(activePatternResult33947)];
      } else {
        $var6 = [14];
      }
    } else if (this.tag === 13) {
      const activePatternResult33948 = _AbbrevOrAppTy___(this.data);

      if (activePatternResult33948 != null) {
        $var6 = [13, getValue(activePatternResult33948)];
      } else {
        $var6 = [14];
      }
    } else {
      $var6 = [14];
    }

    switch ($var6[0]) {
      case 0:
        return $var6[1].DisplayName;

      case 1:
        return ActivePatternElemRef_get_Name.bind($var6[1])();

      case 2:
        return DecompileOpName($var6[1].UnionCase.DisplayName);

      case 3:
        return $var6[1].LogicalName;

      case 4:
        return DecompileOpName($var6[1].RecdField.Name);

      case 5:
        return $var6[1].idText;

      case 6:
        return $var6[1].FieldName;

      case 7:
        return $var6[1].EventName;

      case 8:
        return $var6[1].DisplayName;

      case 9:
        return DemangleOperatorName($var6[1]);

      case 10:
        return $var6[1].DisplayName;

      case 11:
        return DemangleOperatorName($var6[1]);

      case 12:
        return DemangleGenericTypeName($var6[1]);

      case 13:
        return DemangleGenericTypeName($var6[1].DisplayName);

      case 14:
        const $var7 = this.tag === 14 ? [0, this.data[0]] : this.tag === 22 ? this.data.tail != null ? [1, this.data.head] : [8] : this.tag === 17 ? [2, this.data[0]] : this.tag === 18 ? this.data.tail != null ? [3, this.data.head] : [8] : this.tag === 20 ? [4, this.data[0]] : this.tag === 21 ? [5, this.data[0]] : this.tag === 15 ? [6, this.data[0]] : this.tag === 16 ? [7, this.data[0]] : [8];

        switch ($var7[0]) {
          case 0:
            return DemangleGenericTypeName($var7[1]);

          case 1:
            return $var7[1].DisplayName;

          case 2:
            return $var7[1];

          case 3:
            return $var7[1].DemangledModuleOrNamespaceName;

          case 4:
            return $var7[1].idText;

          case 5:
            return $var7[1].idText;

          case 6:
            return $var7[1];

          case 7:
            return $var7[1];

          case 8:
            return "";
        }

    }
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.Item", Item);
export function valRefHash(vref) {
  const matchValue = vref.TryDeref;

  if (matchValue.tag === 0) {
    return getHashCode(matchValue.data) | 0;
  } else {
    return 0;
  }
}
export class ItemWithInst {
  constructor(item, typarInst) {
    this.Item = item;
    this.TyparInst = typarInst;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.ItemWithInst",
      interfaces: ["FSharpRecord"],
      properties: {
        Item: Item,
        TyparInst: makeGeneric(List, {
          T: Tuple([Typar, TType])
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.ItemWithInst", ItemWithInst);
export function ItemWithNoInst(item) {
  return new ItemWithInst(item, emptyTyparInst);
}

function _ItemWithInst_(x) {
  return [x.Item, x.TyparInst];
}

export { _ItemWithInst_ as $7C$ItemWithInst$7C$ };
export class FieldResolution {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.FieldResolution",
      interfaces: ["FSharpUnion"],
      cases: [["FieldResolution", RecdFieldRef, "boolean"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.FieldResolution", FieldResolution);
export class ExtensionMember {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.ExtensionMember",
      interfaces: ["FSharpUnion"],
      cases: [["FSExtMem", ValRef, Long], ["ILExtMem", EntityRef, MethInfo, Long]]
    };
  }

  static Equality(g, e1, e2) {
    const matchValue = [e1, e2];
    const $var8 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [1, matchValue[0].data[1], matchValue[1].data[1]] : [2] : matchValue[1].tag === 0 ? [0, matchValue[0].data[0], matchValue[1].data[0]] : [2];

    switch ($var8[0]) {
      case 0:
        return valRefEq(g, $var8[1], $var8[2]);

      case 1:
        return function (arg00, arg10) {
          return MethInfo.MethInfosUseIdenticalDefinitions(arg00, arg10);
        }($var8[1], $var8[2]);

      case 2:
        return false;
    }
  }

  static Hash(e1) {
    if (e1.tag === 1) {
      if (e1.data[1].tag === 1) {
        return getHashCode(e1.data[1].data[1].RawMetadata) | 0;
      } else if (e1.data[1].tag === 0) {
        return valRefHash(e1.data[1].data[2]) | 0;
      } else {
        return 0;
      }
    } else {
      return valRefHash(e1.data[0]) | 0;
    }
  }

  static Comparer(g) {
    return {
      GetHashCode(x) {
        return function (arg00) {
          return ExtensionMember.Hash(arg00);
        }(x) | 0;
      },

      Equals(x, y) {
        return CurriedLambda(function (arg00_1, arg10, arg20) {
          return ExtensionMember.Equality(arg00_1, arg10, arg20);
        })(g)(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    };
  }

  get Priority() {
    return this.tag === 1 ? this.data[2] : this.data[1];
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.ExtensionMember", ExtensionMember);
export class FullyQualifiedFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.FullyQualifiedFlag",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["FullyQualified"], ["OpenQualified"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.FullyQualifiedFlag", FullyQualifiedFlag);
export class NameResolutionEnv {
  constructor(eDisplayEnv, eUnqualifiedItems, ePatItems, eModulesAndNamespaces, eFullyQualifiedModulesAndNamespaces, eFieldLabels, eTyconsByAccessNames, eFullyQualifiedTyconsByAccessNames, eTyconsByDemangledNameAndArity, eFullyQualifiedTyconsByDemangledNameAndArity, eIndexedExtensionMembers, eUnindexedExtensionMembers, eTypars) {
    this.eDisplayEnv = eDisplayEnv;
    this.eUnqualifiedItems = eUnqualifiedItems;
    this.ePatItems = ePatItems;
    this.eModulesAndNamespaces = eModulesAndNamespaces;
    this.eFullyQualifiedModulesAndNamespaces = eFullyQualifiedModulesAndNamespaces;
    this.eFieldLabels = eFieldLabels;
    this.eTyconsByAccessNames = eTyconsByAccessNames;
    this.eFullyQualifiedTyconsByAccessNames = eFullyQualifiedTyconsByAccessNames;
    this.eTyconsByDemangledNameAndArity = eTyconsByDemangledNameAndArity;
    this.eFullyQualifiedTyconsByDemangledNameAndArity = eFullyQualifiedTyconsByDemangledNameAndArity;
    this.eIndexedExtensionMembers = eIndexedExtensionMembers;
    this.eUnindexedExtensionMembers = eUnindexedExtensionMembers;
    this.eTypars = eTypars;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.NameResolutionEnv",
      interfaces: ["FSharpRecord"],
      properties: {
        eDisplayEnv: DisplayEnv,
        eUnqualifiedItems: makeGeneric(_Map, {
          Key: "string",
          Value: Item
        }),
        ePatItems: makeGeneric(_Map, {
          Key: "string",
          Value: Item
        }),
        eModulesAndNamespaces: makeGeneric(_Map, {
          Key: "string",
          Value: makeGeneric(List, {
            T: EntityRef
          })
        }),
        eFullyQualifiedModulesAndNamespaces: makeGeneric(_Map, {
          Key: "string",
          Value: makeGeneric(List, {
            T: EntityRef
          })
        }),
        eFieldLabels: makeGeneric(_Map, {
          Key: "string",
          Value: makeGeneric(List, {
            T: RecdFieldRef
          })
        }),
        eTyconsByAccessNames: makeGeneric(LayeredMultiMap, {
          Key: "string",
          Value: EntityRef
        }),
        eFullyQualifiedTyconsByAccessNames: makeGeneric(LayeredMultiMap, {
          Key: "string",
          Value: EntityRef
        }),
        eTyconsByDemangledNameAndArity: makeGeneric(_Map, {
          Key: NameArityPair,
          Value: EntityRef
        }),
        eFullyQualifiedTyconsByDemangledNameAndArity: makeGeneric(_Map, {
          Key: NameArityPair,
          Value: EntityRef
        }),
        eIndexedExtensionMembers: makeGeneric(TyconRefMultiMap, {
          T: ExtensionMember
        }),
        eUnindexedExtensionMembers: makeGeneric(List, {
          T: ExtensionMember
        }),
        eTypars: makeGeneric(_Map, {
          Key: "string",
          Value: Typar
        })
      }
    };
  }

  static Empty(g) {
    const eDisplayEnv = DisplayEnv.Empty(g);
    const eModulesAndNamespaces = create(null, new Comparer(comparePrimitives));
    const eFullyQualifiedModulesAndNamespaces = create(null, new Comparer(comparePrimitives));
    const eFieldLabels = create(null, new Comparer(comparePrimitives));
    const eUnqualifiedItems = Map_2_get_Empty_Static();
    const ePatItems = create(null, new Comparer(comparePrimitives));
    const eTyconsByAccessNames = LayeredMultiMap.Empty;
    const eTyconsByDemangledNameAndArity = Map_2_get_Empty_Static();
    return new NameResolutionEnv(eDisplayEnv, eUnqualifiedItems, ePatItems, eModulesAndNamespaces, eFullyQualifiedModulesAndNamespaces, eFieldLabels, eTyconsByAccessNames, LayeredMultiMap.Empty, eTyconsByDemangledNameAndArity, Map_2_get_Empty_Static(), TyconRefMultiMap.Empty, new List(), create(null, new Comparer(comparePrimitives)));
  }

  get DisplayEnv() {
    return this.eDisplayEnv;
  }

  FindUnqualifiedItem(nm) {
    return this.eUnqualifiedItems.get(nm);
  }

  TyconsByDemangledNameAndArity(fq) {
    if (fq.tag === 1) {
      return this.eTyconsByDemangledNameAndArity;
    } else {
      return this.eFullyQualifiedTyconsByDemangledNameAndArity;
    }
  }

  TyconsByAccessNames(fq) {
    if (fq.tag === 1) {
      return this.eTyconsByAccessNames;
    } else {
      return this.eFullyQualifiedTyconsByAccessNames;
    }
  }

  ModulesAndNamespaces(fq) {
    if (fq.tag === 1) {
      return this.eModulesAndNamespaces;
    } else {
      return this.eFullyQualifiedModulesAndNamespaces;
    }
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.NameResolutionEnv", NameResolutionEnv);
export function NextExtensionMethodPriority() {
  return fromValue(newStamp());
}

function GetCSharpStyleIndexedExtensionMembersForTyconRef(amap, m, tcrefOfStaticClass) {
  const g = amap.g;

  if (tcrefOfStaticClass.Typars(m).tail == null ? TyconRefHasAttribute(g, m, g.attrib_ExtensionAttribute, tcrefOfStaticClass) : false) {
    const pri = NextExtensionMethodPriority();
    const typ = generalizedTyconRef(tcrefOfStaticClass);
    const minfos = GetImmediateIntrinsicMethInfosOfType(null, new AccessorDomain(2), g, amap, m, typ);
    return toList(delay(function () {
      return collect(function (minfo) {
        var arg00_;

        if ((((!minfo.IsInstance ? !minfo.IsExtensionMember : false) ? minfo.NumArgs.length === 1 : false) ? minfo.NumArgs.head >= 1 : false) ? MethInfoHasAttribute(g, m, g.attrib_ExtensionAttribute, minfo) : false) {
          const ilExtMem = new ExtensionMember(1, [tcrefOfStaticClass, minfo, pri]);
          let thisTyconRef;

          try {
            let rs;
            const matchValue = [metadataOfTycon(tcrefOfStaticClass.Deref), minfo];
            const $var9 = matchValue[0].tag === 0 ? matchValue[1].tag === 1 ? [0, matchValue[1].data[1].data[3], matchValue[0].data.data[0]] : [1] : [1];

            switch ($var9[0]) {
              case 0:
                const matchValue_1 = $var9[1].ParameterTypes;

                if (matchValue_1.tail != null) {
                  const $var10 = matchValue_1.head.tag === 3 ? [0, matchValue_1.head.data] : matchValue_1.head.tag === 2 ? [0, matchValue_1.head.data] : [1];

                  switch ($var10[0]) {
                    case 0:
                      const tref = function (arg10_) {
                        return rescopeILTypeSpec($var9[2], arg10_);
                      }($var10[1]).TypeRef;

                      if (CanImportILTypeRef(amap, m, tref)) {
                        const tcref = function (arg20_) {
                          return ImportILTypeRef(amap, m, arg20_);
                        }(tref);

                        if (isCompiledTupleTyconRef(g, tcref) ? true : tyconRefEq(g, tcref, g.fastFunc_tcr)) {
                          rs = null;
                        } else {
                          rs = tcref;
                        }
                      } else {
                        rs = null;
                      }

                      break;

                    case 1:
                      rs = null;
                      break;
                  }
                } else {
                  rs = null;
                }

                break;

              case 1:
                const thisTy = minfo.GetParamTypes(amap, m, generalizeTypars(minfo.FormalMethodTypars)).head.head;
                const activePatternResult33996 = (arg00_ = amap.g, function (arg10__1) {
                  return _AppTy___(arg00_, arg10__1);
                })(thisTy);

                if (activePatternResult33996 != null) {
                  rs = getValue(activePatternResult33996)[0];
                } else {
                  rs = null;
                }

                break;
            }

            thisTyconRef = makeSome(rs);
          } catch (e) {
            errorRecovery(e, m);
            thisTyconRef = null;
          }

          if (thisTyconRef != null) {
            if (getValue(thisTyconRef) == null) {
              return singleton(new Choice(1, ilExtMem));
            } else {
              return singleton(new Choice(0, [getValue(getValue(thisTyconRef)), ilExtMem]));
            }
          } else {
            return empty();
          }
        } else {
          return empty();
        }
      }, minfos);
    }));
  } else {
    return new List();
  }
}

export class BulkAdd {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.BulkAdd",
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
setType("Microsoft.FSharp.Compiler.NameResolution.BulkAdd", BulkAdd);
export function AddValRefsToItems(bulkAddMode, eUnqualifiedItems, vrefs) {
  const vrefs_1 = vrefs.filter(function (vref) {
    return !vref.IsMember;
  });

  if (vrefs_1.length === 0) {
    return eUnqualifiedItems;
  } else if (bulkAddMode.tag === 1) {
    const vref_1 = vrefs_1[0];
    return add_1(vref_1.LogicalName, new Item(0, vref_1), eUnqualifiedItems);
  } else {
    return Map_2_AddAndMarkAsCollapsible.bind(eUnqualifiedItems)(map_1(function (vref_2) {
      return [vref_2.LogicalName, new Item(0, vref_2)];
    }, vrefs_1, Array));
  }
}
export function AddValRefToExtensionMembers(pri, eIndexedExtensionMembers, vref) {
  if (vref.IsMember ? vref.IsExtensionMember : false) {
    return eIndexedExtensionMembers.Add(vref.MemberApparentEntity, new ExtensionMember(0, [vref, pri]));
  } else {
    return eIndexedExtensionMembers;
  }
}
export function AddFakeNamedValRefToNameEnv(nm, nenv, vref) {
  const eUnqualifiedItems = add_1(nm, new Item(0, vref), nenv.eUnqualifiedItems);
  return new NameResolutionEnv(nenv.eDisplayEnv, eUnqualifiedItems, nenv.ePatItems, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, nenv.eTypars);
}
export function AddFakeNameToNameEnv(nm, nenv, item) {
  const eUnqualifiedItems = add_1(nm, item, nenv.eUnqualifiedItems);
  return new NameResolutionEnv(nenv.eDisplayEnv, eUnqualifiedItems, nenv.ePatItems, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, nenv.eTypars);
}
export function AddValRefsToActivePatternsNameEnv(ePatItems, vref) {
  const ePatItems_1 = foldBack(function (apref, tab) {
    return NameMapModule.add(ActivePatternElemRef_get_Name.bind(apref)(), new Item(3, apref), tab);
  }, ActivePatternElemsOfValRef(vref), ePatItems);
  let ePatItems_2;
  const matchValue = vref.LiteralValue;

  if (matchValue != null) {
    ePatItems_2 = NameMapModule.add(vref.LogicalName, new Item(0, vref), ePatItems_1);
  } else {
    ePatItems_2 = ePatItems_1;
  }

  return ePatItems_2;
}
export function AddValRefsToNameEnvWithPriority(bulkAddMode, pri, nenv, vrefs) {
  if (vrefs.length === 0) {
    return nenv;
  } else {
    const eUnqualifiedItems = AddValRefsToItems(bulkAddMode, nenv.eUnqualifiedItems, vrefs);
    const eIndexedExtensionMembers_1 = fold(function (eIndexedExtensionMembers, vref) {
      return AddValRefToExtensionMembers(pri, eIndexedExtensionMembers, vref);
    }, nenv.eIndexedExtensionMembers, vrefs);

    const ePatItems_1 = function (state, array) {
      return fold(function (ePatItems, vref_1) {
        return AddValRefsToActivePatternsNameEnv(ePatItems, vref_1);
      }, state, array);
    }(nenv.ePatItems, vrefs);

    return new NameResolutionEnv(nenv.eDisplayEnv, eUnqualifiedItems, ePatItems_1, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, eIndexedExtensionMembers_1, nenv.eUnindexedExtensionMembers, nenv.eTypars);
  }
}
export function AddValRefToNameEnv(nenv, vref) {
  const pri = NextExtensionMethodPriority();
  const eUnqualifiedItems = !vref.IsMember ? add_1(vref.LogicalName, new Item(0, vref), nenv.eUnqualifiedItems) : nenv.eUnqualifiedItems;
  const eIndexedExtensionMembers = AddValRefToExtensionMembers(pri, nenv.eIndexedExtensionMembers, vref);
  const ePatItems = AddValRefsToActivePatternsNameEnv(nenv.ePatItems, vref);
  return new NameResolutionEnv(nenv.eDisplayEnv, eUnqualifiedItems, ePatItems, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, nenv.eTypars);
}
export function AddActivePatternResultTagsToNameEnv(apinfo, nenv, ty, m) {
  if (ActivePatternInfo_get_Names.bind(apinfo)().tail == null) {
    return nenv;
  } else {
    const apresl = Microsoft.FSharp.Collections.List.indexed(ActivePatternInfo_get_Names.bind(apinfo)());
    const eUnqualifiedItems = foldBack(function (tupledArg, acc) {
      return add_1(tupledArg[1], new Item(2, [apinfo, ty, tupledArg[0], m]), acc);
    }, apresl, nenv.eUnqualifiedItems);
    return new NameResolutionEnv(nenv.eDisplayEnv, eUnqualifiedItems, nenv.ePatItems, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, nenv.eTypars);
  }
}
export function GeneralizeUnionCaseRef(ucref) {
  return new UnionCaseInfo(0, [generalizeTyconRef(ucref.TyconRef)[0], ucref]);
}
export function AddTyconsByDemangledNameAndArity(bulkAddMode, tcrefs, tab) {
  if (tcrefs.length === 0) {
    return tab;
  } else {
    const entries = map_1(function (tcref) {
      return KeyTyconByDemangledNameAndArity(tcref.LogicalName, tcref.TyparsNoRange, tcref);
    }, tcrefs, Array);

    if (bulkAddMode.tag === 1) {
      return fold(function (tab_1, _arg1) {
        const activePatternResult34053 = _arg1;
        return add_1(activePatternResult34053[0], activePatternResult34053[1], tab_1);
      }, tab, entries);
    } else {
      return Map_2_AddAndMarkAsCollapsible.bind(tab)(entries);
    }
  }
}
export function AddTyconByAccessNames(bulkAddMode, tcrefs, tab) {
  if (tcrefs.length === 0) {
    return tab;
  } else {
    const entries = Array.from(collect(function (tcref) {
      return KeyTyconByAccessNames(tcref.LogicalName, tcref);
    }, tcrefs));

    if (bulkAddMode.tag === 1) {
      return fold(function (tab_1, _arg1) {
        const activePatternResult34060 = _arg1;
        return tab_1.Add(activePatternResult34060[0], activePatternResult34060[1]);
      }, tab, entries);
    } else {
      return tab.AddAndMarkAsCollapsible(entries);
    }
  }
}
export function AddRecdField(rfref, tab) {
  return NameMultiMapModule.add(rfref.FieldName, rfref, tab);
}
export function AddUnionCases1(tab, ucrefs) {
  return fold(function (acc, ucref) {
    const item = new Item(1, [GeneralizeUnionCaseRef(ucref), false]);
    return add_1(ucref.CaseName, item, acc);
  }, tab, ucrefs);
}
export function AddUnionCases2(bulkAddMode, eUnqualifiedItems, ucrefs) {
  if (bulkAddMode.tag === 1) {
    return fold(function (acc, ucref) {
      const item = new Item(1, [GeneralizeUnionCaseRef(ucref), false]);
      return add_1(ucref.CaseName, item, acc);
    }, eUnqualifiedItems, ucrefs);
  } else {
    const items = map_1(function (ucref_1) {
      const item_1 = new Item(1, [GeneralizeUnionCaseRef(ucref_1), false]);
      return [ucref_1.CaseName, item_1];
    }, Array.from(ucrefs), Array);
    return Map_2_AddAndMarkAsCollapsible.bind(eUnqualifiedItems)(items);
  }
}

function AddPartsOfTyconRefToNameEnv(bulkAddMode, ownDefinition, g, amap, m, nenv, tcref) {
  const isIL = tcref.IsILTycon;
  const ucrefs = isIL ? new List() : map(function (arg00) {
    return tcref.MakeNestedUnionCaseRef(arg00);
  }, tcref.UnionCasesAsList);
  const flds = isIL ? [] : tcref.AllFieldsArray;
  let patternInput;
  const ilStyleExtensionMeths = GetCSharpStyleIndexedExtensionMembersForTyconRef(amap, m, tcref);
  patternInput = fold(function (tupledArg, extMemInfo) {
    if (extMemInfo.tag === 1) {
      return [tupledArg[0], new List(extMemInfo.data, tupledArg[1])];
    } else {
      const tcref_1 = extMemInfo.data[0];
      const extMemInfo_1 = extMemInfo.data[1];
      return [tupledArg[0].Add(tcref_1, extMemInfo_1), tupledArg[1]];
    }
  }, [nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers], ilStyleExtensionMeths);
  const isILOrRequiredQualifiedAccess = isIL ? true : !ownDefinition ? HasFSharpAttribute(g, g.attrib_RequireQualifiedAccessAttribute, tcref.Attribs) : false;
  const eFieldLabels = ((isILOrRequiredQualifiedAccess ? true : !tcref.IsRecordTycon) ? true : flds.length === 0) ? nenv.eFieldLabels : fold(function (acc, f) {
    return (f.IsStatic ? true : f.IsCompilerGenerated) ? acc : AddRecdField(tcref.MakeNestedRecdFieldRef(f), acc);
  }, nenv.eFieldLabels, flds);
  let eUnqualifiedItems;
  let tab;
  let mayHaveConstruction;

  try {
    mayHaveConstruction = function () {
      const typ = generalizedTyconRef(tcref);

      if (isClassTy(g, typ)) {
        return true;
      } else {
        return isStructTy(g, typ);
      }
    }();
  } catch (matchValue) {
    if (matchValue instanceof UnresolvedPathReferenceNoRange) {
      mayHaveConstruction = false;
    } else {
      throw matchValue;
    }
  }

  if (mayHaveConstruction) {
    tab = Map_2_LinearTryModifyThenLaterFlatten.bind(nenv.eUnqualifiedItems)(tcref.DisplayName, function (prev) {
      const $var11 = prev != null ? getValue(prev).tag === 22 ? [0, getValue(prev).data] : [1] : [1];

      switch ($var11[0]) {
        case 0:
          return new Item(22, new List(tcref, $var11[1]));

        case 1:
          return new Item(22, ofArray([tcref]));
      }
    });
  } else {
    tab = nenv.eUnqualifiedItems;
  }

  if (isILOrRequiredQualifiedAccess ? true : ucrefs.tail == null) {
    eUnqualifiedItems = tab;
  } else {
    eUnqualifiedItems = AddUnionCases2(bulkAddMode, tab, ucrefs);
  }

  const ePatItems = (isILOrRequiredQualifiedAccess ? true : ucrefs.tail == null) ? nenv.ePatItems : AddUnionCases1(nenv.ePatItems, ucrefs);
  return new NameResolutionEnv(nenv.eDisplayEnv, eUnqualifiedItems, ePatItems, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, patternInput[0], patternInput[1], nenv.eTypars);
}

export function TryFindPatternByName(name, _arg1) {
  return NameMapModule.tryFind(name, _arg1.ePatItems);
}
export function AddTyconRefsToNameEnv(bulkAddMode, ownDefinition, g, amap, m, root, nenv, tcrefs) {
  if (tcrefs.tail == null) {
    return nenv;
  } else {
    const env = fold(function (nenv_1, tcref) {
      return AddPartsOfTyconRefToNameEnv(bulkAddMode, ownDefinition, g, amap, m, nenv_1, tcref);
    }, nenv, tcrefs);
    const tcrefs_1 = Array.from(tcrefs);
    const eFullyQualifiedTyconsByDemangledNameAndArity = root ? AddTyconsByDemangledNameAndArity(bulkAddMode, tcrefs_1, nenv.eFullyQualifiedTyconsByDemangledNameAndArity) : nenv.eFullyQualifiedTyconsByDemangledNameAndArity;
    const eFullyQualifiedTyconsByAccessNames = root ? AddTyconByAccessNames(bulkAddMode, tcrefs_1, nenv.eFullyQualifiedTyconsByAccessNames) : nenv.eFullyQualifiedTyconsByAccessNames;
    const eTyconsByDemangledNameAndArity = AddTyconsByDemangledNameAndArity(bulkAddMode, tcrefs_1, nenv.eTyconsByDemangledNameAndArity);
    const eTyconsByAccessNames = AddTyconByAccessNames(bulkAddMode, tcrefs_1, nenv.eTyconsByAccessNames);
    return new NameResolutionEnv(env.eDisplayEnv, env.eUnqualifiedItems, env.ePatItems, env.eModulesAndNamespaces, env.eFullyQualifiedModulesAndNamespaces, env.eFieldLabels, eTyconsByAccessNames, eFullyQualifiedTyconsByAccessNames, eTyconsByDemangledNameAndArity, eFullyQualifiedTyconsByDemangledNameAndArity, env.eIndexedExtensionMembers, env.eUnindexedExtensionMembers, env.eTypars);
  }
}
export function AddExceptionDeclsToNameEnv(bulkAddMode, nenv, ecref) {
  const item = new Item(4, ecref);
  const eUnqualifiedItems = bulkAddMode.tag === 1 ? add_1(ecref.LogicalName, item, nenv.eUnqualifiedItems) : Map_2_AddAndMarkAsCollapsible.bind(nenv.eUnqualifiedItems)([[ecref.LogicalName, item]]);
  const ePatItems = add_1(ecref.LogicalName, item, nenv.ePatItems);
  return new NameResolutionEnv(nenv.eDisplayEnv, eUnqualifiedItems, ePatItems, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, nenv.eTypars);
}
export function AddModuleAbbrevToNameEnv(id, nenv, modrefs) {
  let eModulesAndNamespaces;

  const add = function (old, nw) {
    return append(nw, old);
  };

  eModulesAndNamespaces = NameMapModule.layerAdditive(add, add_1(id.idText, modrefs, create(null, new Comparer(comparePrimitives))), nenv.eModulesAndNamespaces);
  return new NameResolutionEnv(nenv.eDisplayEnv, nenv.eUnqualifiedItems, nenv.ePatItems, eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, nenv.eTypars);
}
export function MakeNestedModuleRefs(modref) {
  return map(function (arg00) {
    return modref.NestedTyconRef(arg00);
  }, modref.ModuleOrNamespaceType.ModuleAndNamespaceDefinitions);
}
export function AddModuleOrNamespaceRefsToNameEnv(g, amap, m, root, ad, nenv, modrefs) {
  if (modrefs.tail == null) {
    return nenv;
  } else {
    const modrefsMap = NameMapModule.ofKeyedList(function (modref) {
      return modref.DemangledModuleOrNamespaceName;
    }, modrefs);

    const addModrefs = function (tab) {
      const add = function (old, nw) {
        if (IsEntityAccessible(amap, m, ad, nw)) {
          return new List(nw, old);
        } else {
          return old;
        }
      };

      return NameMapModule.layerAdditive(add, modrefsMap, tab);
    };

    let nenv_1;
    const eModulesAndNamespaces = addModrefs(nenv.eModulesAndNamespaces);
    const eFullyQualifiedModulesAndNamespaces = root ? addModrefs(nenv.eFullyQualifiedModulesAndNamespaces) : nenv.eFullyQualifiedModulesAndNamespaces;
    nenv_1 = new NameResolutionEnv(nenv.eDisplayEnv, nenv.eUnqualifiedItems, nenv.ePatItems, eModulesAndNamespaces, eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, nenv.eTypars);
    const nenv_3 = fold(function (nenv_2, modref_1) {
      return (modref_1.IsModule ? equals(TryFindFSharpBoolAttribute(g, g.attrib_AutoOpenAttribute, modref_1.Attribs), true) : false) ? AddModuleOrNamespaceContentsToNameEnv(g, amap, ad, m, false, nenv_2, modref_1) : nenv_2;
    }, nenv_1, modrefs);
    return nenv_3;
  }
}
export function AddModuleOrNamespaceContentsToNameEnv(g, amap, ad, m, root, nenv, modref) {
  var arg00_;
  const pri = NextExtensionMethodPriority();
  const mty = modref.ModuleOrNamespaceType;
  let nenv_1;
  let state = new NameResolutionEnv(nenv.eDisplayEnv.AddOpenModuleOrNamespace(modref), nenv.eUnqualifiedItems, nenv.ePatItems, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, nenv.eTypars);
  const inputSequence = mty.ExceptionDefinitions;

  for (let exnc of inputSequence) {
    const tcref = modref.NestedTyconRef(exnc);

    if (IsEntityAccessible(amap, m, ad, tcref)) {
      state = AddExceptionDeclsToNameEnv(new BulkAdd(0), state, tcref);
    }
  }

  nenv_1 = state;
  const tcrefs = choose(function (tycon) {
    const tcref_1 = modref.NestedTyconRef(tycon);

    if (IsEntityAccessible(amap, m, ad, tcref_1)) {
      return tcref_1;
    } else {
      return null;
    }
  }, mty.TypeAndExceptionDefinitions);
  const nenv_2 = (arg00_ = new BulkAdd(0), function (arg60_, arg70_) {
    return AddTyconRefsToNameEnv(arg00_, false, g, amap, m, false, arg60_, arg70_);
  })(nenv_1, tcrefs);
  const vrefs = Array.from(choose(function (x) {
    return IsAccessible(ad, x.Accessibility) ? TryMkValRefInModRef(modref, x) : null;
  }, mty.AllValsAndMembers.ToList()));
  const nenv_3 = AddValRefsToNameEnvWithPriority(new BulkAdd(0), pri, nenv_2, vrefs);
  const nestedModules = MakeNestedModuleRefs(modref);

  const nenv_4 = function (arg50_, arg60__1) {
    return AddModuleOrNamespaceRefsToNameEnv(g, amap, m, root, ad, arg50_, arg60__1);
  }(nenv_3, nestedModules);

  return nenv_4;
}
export function AddModulesAndNamespacesContentsToNameEnv(g, amap, ad, m, root, nenv, modrefs) {
  return foldBack(function (modref, acc) {
    return AddModuleOrNamespaceContentsToNameEnv(g, amap, ad, m, root, acc, modref);
  }, modrefs, nenv);
}
export function AddModuleOrNamespaceRefToNameEnv(g, amap, m, root, ad, nenv, modref) {
  return AddModuleOrNamespaceRefsToNameEnv(g, amap, m, root, ad, nenv, ofArray([modref]));
}
export class CheckForDuplicateTyparFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.CheckForDuplicateTyparFlag",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CheckForDuplicateTypars"], ["NoCheckForDuplicateTypars"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.CheckForDuplicateTyparFlag", CheckForDuplicateTyparFlag);
export function AddDeclaredTyparsToNameEnv(check, nenv, typars) {
  const typarmap = foldBack(function (tp, sofar) {
    if (check.tag === 1) {} else if (sofar.has(tp.Name)) {
      errorR(new Duplicate("type parameter", tp.DisplayName, tp.Range));
    }

    return add_1(tp.Name, tp, sofar);
  }, typars, create(null, new Comparer(comparePrimitives)));
  const eTypars = NameMapModule.layer(typarmap, nenv.eTypars);
  return new NameResolutionEnv(nenv.eDisplayEnv, nenv.eUnqualifiedItems, nenv.ePatItems, nenv.eModulesAndNamespaces, nenv.eFullyQualifiedModulesAndNamespaces, nenv.eFieldLabels, nenv.eTyconsByAccessNames, nenv.eFullyQualifiedTyconsByAccessNames, nenv.eTyconsByDemangledNameAndArity, nenv.eFullyQualifiedTyconsByDemangledNameAndArity, nenv.eIndexedExtensionMembers, nenv.eUnindexedExtensionMembers, eTypars);
}
export function FreshenTycon(ncenv, m, tcref) {
  var objectArg;
  const tinst = ncenv.InstantiationGenerator(m, tcref.Typars(m));
  const improvedTy = (objectArg = ncenv.g, function (arg00, arg10) {
    return objectArg.decompileType(arg00, arg10);
  })(tcref, tinst);
  return improvedTy;
}
export function FreshenUnionCaseRef(ncenv, m, ucref) {
  const tinst = ncenv.InstantiationGenerator(m, ucref.TyconRef.Typars(m));
  return new UnionCaseInfo(0, [tinst, ucref]);
}
export function FreshenUnqualifiedItem(ncenv, m, res) {
  if (res.tag === 1) {
    const ucref = res.data[0].data[1];
    return new Item(1, [FreshenUnionCaseRef(ncenv, m, ucref), false]);
  } else {
    return res;
  }
}
export function OneResult(res) {
  if (res.tag === 1) {
    return new ResultOrException(1, res.data);
  } else {
    return new ResultOrException(0, ofArray([res.data]));
  }
}
export function OneSuccess(x) {
  return new ResultOrException(0, ofArray([x]));
}
export function AddResults(res1, res2) {
  var suggestions2;
  var suggestions1;
  var n2;
  var n1;
  var id2;
  var id1;
  var f;
  const matchValue = [res1, res2];
  const $var12 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? matchValue[1].data instanceof UndefinedName ? matchValue[0].data instanceof UndefinedName ? (suggestions2 = matchValue[1].data.Data3, suggestions1 = matchValue[0].data.Data3, n2 = matchValue[1].data.Data0 | 0, n1 = matchValue[0].data.Data0 | 0, id2 = matchValue[1].data.Data2, id1 = matchValue[0].data.Data2, f = matchValue[0].data.Data1, (n1 === n2 ? id1.idText === id2.idText : false) ? equals(id1.idRange, id2.idRange) : false) ? [5, matchValue[0].data.Data1, matchValue[0].data.Data2, matchValue[1].data.Data2, matchValue[0].data.Data0, matchValue[1].data.Data0, matchValue[0].data.Data3, matchValue[1].data.Data3] : [6] : [6] : [6] : matchValue[1].data.tail == null ? [1] : [3, matchValue[1].data] : matchValue[0].data.tail == null ? [0] : matchValue[1].tag === 1 ? [4, matchValue[0].data] : matchValue[1].data.tail == null ? [1] : [2, matchValue[1].data, matchValue[0].data];

  switch ($var12[0]) {
    case 0:
      return res2;

    case 1:
      return res1;

    case 2:
      return new ResultOrException(0, append($var12[2], $var12[1]));

    case 3:
      return new ResultOrException(0, $var12[1]);

    case 4:
      return new ResultOrException(0, $var12[1]);

    case 5:
      const suggestions = new Set($var12[6]());
      unionInPlace(suggestions, $var12[7]());
      return new ResultOrException(1, new UndefinedName($var12[4], $var12[1], $var12[2], function () {
        return suggestions;
      }));

    case 6:
      const $var13 = matchValue[0].tag === 1 ? matchValue[0].data instanceof UndefinedName ? matchValue[1].tag === 1 ? matchValue[1].data instanceof UndefinedName ? [0, matchValue[0].data, matchValue[1].data, matchValue[0].data.Data0, matchValue[1].data.Data0] : matchValue[1].data instanceof _Error ? [1, matchValue[0].data] : [3, matchValue[0].data] : [4] : matchValue[0].data instanceof _Error ? matchValue[1].tag === 1 ? matchValue[1].data instanceof UndefinedName ? [2, matchValue[1].data] : [3, matchValue[0].data] : [4] : matchValue[1].tag === 1 ? [3, matchValue[0].data] : [4] : [4];

      switch ($var13[0]) {
        case 0:
          if ($var13[3] < $var13[4]) {
            return new ResultOrException(1, $var13[2]);
          } else {
            return new ResultOrException(1, $var13[1]);
          }

        case 1:
          return new ResultOrException(1, $var13[1]);

        case 2:
          return new ResultOrException(1, $var13[1]);

        case 3:
          return new ResultOrException(1, $var13[1]);

        case 4:
          throw new Error("C:/projects/fcs/src/fsharp/NameResolution.fs", 901, 10);
      }

  }
}
export function op_PlusPlusPlus(x, y) {
  return AddResults(x, y);
}
export function NoResultsOrUsefulErrors() {
  return new ResultOrException(0, new List());
}
export class ResultCollectionSettings {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.ResultCollectionSettings",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["AllResults"], ["AtMostOneResult"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.ResultCollectionSettings", ResultCollectionSettings);
export function CollectResults(f, _arg1) {
  if (_arg1.tail != null) {
    if (_arg1.tail.tail == null) {
      return OneResult(f(_arg1.head));
    } else {
      return AddResults(OneResult(f(_arg1.head)), CollectResults(f, _arg1.tail));
    }
  } else {
    return NoResultsOrUsefulErrors();
  }
}
export function CollectAtMostOneResult(f, _arg1) {
  if (_arg1.tail != null) {
    if (_arg1.tail.tail == null) {
      return OneResult(f(_arg1.head));
    } else {
      const matchValue = f(_arg1.head);

      if (matchValue.tag === 1) {
        return AddResults(new ResultOrException(1, matchValue.data), CollectAtMostOneResult(f, _arg1.tail));
      } else {
        return new ResultOrException(0, ofArray([matchValue.data]));
      }
    }
  } else {
    return NoResultsOrUsefulErrors();
  }
}
export function CollectResults2(resultCollectionSettings, f) {
  return CurriedLambda(resultCollectionSettings.tag === 1 ? function (_arg1) {
    return CollectAtMostOneResult(f, _arg1);
  } : function (_arg1_1) {
    return CollectResults(f, _arg1_1);
  });
}
export function MapResults(f, _arg1) {
  if (_arg1.tag === 1) {
    return new ResultOrException(1, _arg1.data);
  } else {
    return new ResultOrException(0, map(f, _arg1.data));
  }
}
export function AtMostOneResult(m, res) {
  if (res.tag === 0) {
    if (res.data.tail != null) {
      return ResultOrExceptionModule.success(res.data.head);
    } else {
      return ResultOrExceptionModule.raze(new _Error(SR.nrInvalidModuleExprType(), m));
    }
  } else {
    return ResultOrExceptionModule.raze(res.data);
  }
}
export class TypeNameResolutionFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.TypeNameResolutionFlag",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ResolveTypeNamesToCtors"], ["ResolveTypeNamesToTypeRefs"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.TypeNameResolutionFlag", TypeNameResolutionFlag);
export class TypeNameResolutionStaticArgsInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.TypeNameResolutionStaticArgsInfo",
      interfaces: ["FSharpUnion"],
      cases: [["Indefinite"], ["Definite", "number"]]
    };
  }

  static get DefiniteEmpty() {
    return new TypeNameResolutionStaticArgsInfo(1, 0);
  }

  static FromTyArgs(numTyArgs) {
    return new TypeNameResolutionStaticArgsInfo(1, numTyArgs);
  }

  get HasNoStaticArgsInfo() {
    return this.tag === 0 ? true : false;
  }

  get NumStaticArgs() {
    return this.tag === 1 ? this.data : 0;
  }

  MangledNameForType(nm) {
    if (IsMangledGenericName(nm) ? true : this.NumStaticArgs === 0) {
      return nm;
    } else {
      return nm + "`" + this.NumStaticArgs.toString();
    }
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.TypeNameResolutionStaticArgsInfo", TypeNameResolutionStaticArgsInfo);
export class TypeNameResolutionInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.TypeNameResolutionInfo",
      interfaces: ["FSharpUnion"],
      cases: [["TypeNameResolutionInfo", TypeNameResolutionFlag, TypeNameResolutionStaticArgsInfo]]
    };
  }

  static get Default() {
    return new TypeNameResolutionInfo(0, [new TypeNameResolutionFlag(0), new TypeNameResolutionStaticArgsInfo(0)]);
  }

  static ResolveToTypeRefs(statResInfo) {
    return new TypeNameResolutionInfo(0, [new TypeNameResolutionFlag(1), statResInfo]);
  }

  get StaticArgsInfo() {
    return this.data[1];
  }

  get ResolutionFlag() {
    return this.data[0];
  }

  get DropStaticArgsInfo() {
    return new TypeNameResolutionInfo(0, [this.data[0], new TypeNameResolutionStaticArgsInfo(0)]);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.TypeNameResolutionInfo", TypeNameResolutionInfo);
export function LookupTypeNameInEntityHaveArity(nm, staticResInfo, mty) {
  const attempt1 = tryFind(staticResInfo.MangledNameForType(nm), mty.TypesByMangledName);

  if (attempt1 == null) {
    return tryFind(nm, mty.TypesByMangledName);
  } else {
    return attempt1;
  }
}
export function LookupTypeNameInEnvHaveArity(fq, nm, numTyArgs, nenv) {
  const key = IsMangledGenericName(nm) ? DecodeGenericTypeName(nm) : new NameArityPair(0, [nm, numTyArgs]);
  const matchValue = tryFind(key, nenv.TyconsByDemangledNameAndArity(fq));

  if (matchValue == null) {
    return defaultArg(nenv.TyconsByAccessNames(fq).TryFind(nm), null, function (list) {
      return list.head;
    });
  } else {
    return getValue(matchValue);
  }
}
export function LookupTypeNameNoArity(nm, byDemangledNameAndArity, byAccessNames) {
  if (IsMangledGenericName(nm)) {
    const matchValue = tryFind(DecodeGenericTypeName(nm), byDemangledNameAndArity);

    if (matchValue == null) {
      const matchValue_1 = byAccessNames.TryFind(nm);

      if (matchValue_1 == null) {
        return new List();
      } else {
        return getValue(matchValue_1);
      }
    } else {
      return ofArray([getValue(matchValue)]);
    }
  } else {
    return byAccessNames.get_Item(nm);
  }
}
export function LookupTypeNameInEnvNoArity(fq, nm, nenv) {
  return LookupTypeNameNoArity(nm, nenv.TyconsByDemangledNameAndArity(fq), nenv.TyconsByAccessNames(fq));
}
export function LookupTypeNameInEntityNoArity(m, nm, mtyp) {
  return LookupTypeNameNoArity(nm, mtyp.TypesByDemangledNameAndArity(m), mtyp.TypesByAccessNames);
}
export function LookupTypeNameInEnvMaybeHaveArity(fq, nm, typeNameResInfo, nenv) {
  if (typeNameResInfo.StaticArgsInfo.HasNoStaticArgsInfo) {
    return LookupTypeNameInEnvNoArity(fq, nm, nenv);
  } else {
    return toList(defaultArg(LookupTypeNameInEnvHaveArity(fq, nm, typeNameResInfo.StaticArgsInfo.NumStaticArgs, nenv), [], $var14 => [$var14]));
  }
}
export class PermitDirectReferenceToGeneratedType {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.PermitDirectReferenceToGeneratedType",
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
setType("Microsoft.FSharp.Compiler.NameResolution.PermitDirectReferenceToGeneratedType", PermitDirectReferenceToGeneratedType);
export function LookupTypeNameInEntityMaybeHaveArity(amap, m, ad, nm, staticResInfo, modref) {
  const mtyp = modref.ModuleOrNamespaceType;
  let tcrefs;

  if (staticResInfo.tag === 1) {
    const matchValue = LookupTypeNameInEntityHaveArity(nm, staticResInfo, mtyp);

    if (matchValue == null) {
      tcrefs = new List();
    } else {
      tcrefs = ofArray([modref.NestedTyconRef(getValue(matchValue))]);
    }
  } else {
    tcrefs = map(function (arg00) {
      return modref.NestedTyconRef(arg00);
    }, LookupTypeNameInEntityNoArity(m, nm, mtyp));
  }

  amap;
  const tcrefs_1 = filter(function (tcref) {
    return IsEntityAccessible(amap, m, ad, tcref);
  }, tcrefs);
  return tcrefs_1;
}
export function MakeNestedType(ncenv, tinst, m, tcrefNested) {
  const tps = List_1.drop(tinst.length, tcrefNested.Typars(m));
  const tinstNested = ncenv.InstantiationGenerator(m, tps);
  return mkAppTy(tcrefNested, append(tinst, tinstNested));
}
export function GetNestedTypesOfType(ad, ncenv, optFilter, staticResInfo, checkForGenerated, m, typ) {
  const g = ncenv.g;
  return collect_1(function (typ_1) {
    const activePatternResult34307 = function (arg10_) {
      return _AppTy___(g, arg10_);
    }(typ_1);

    if (activePatternResult34307 != null) {
      const tycon = getValue(activePatternResult34307)[0].Deref;
      const mty = tycon.ModuleOrNamespaceType;
      checkForGenerated;

      if (optFilter == null) {
        return choose(function (entity) {
          const typ_2 = function (tcrefNested) {
            return MakeNestedType(ncenv, getValue(activePatternResult34307)[1], m, tcrefNested);
          }(getValue(activePatternResult34307)[0].NestedTyconRef(entity));

          if (IsTypeAccessible(g, ncenv.amap, m, ad, typ_2)) {
            return typ_2;
          } else {
            return null;
          }
        }, mty.TypesByAccessNames.Values);
      } else {
        const tcrefs = LookupTypeNameInEntityMaybeHaveArity(ncenv.amap, m, ad, getValue(optFilter), staticResInfo, getValue(activePatternResult34307)[0]);
        return map(function (tcrefNested_1) {
          return MakeNestedType(ncenv, getValue(activePatternResult34307)[1], m, tcrefNested_1);
        }, tcrefs);
      }
    } else {
      return new List();
    }
  }, ncenv.InfoReader.GetPrimaryTypeHierachy(new AllowMultiIntfInstantiations(0), m, typ));
}
export class ItemOccurence {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.ItemOccurence",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Binding"], ["Use"], ["UseInType"], ["UseInAttribute"], ["Pattern"], ["Implemented"], ["RelatedText"], ["Open"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.ItemOccurence", ItemOccurence);
export class OpenDeclaration {
  constructor(longId, range, modules, appliedScope, isOwnNamespace) {
    this.LongId = longId;
    this.Range = range;
    this.Modules = modules;
    this.AppliedScope = appliedScope;
    this.IsOwnNamespace = isOwnNamespace;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.OpenDeclaration",
      interfaces: ["FSharpRecord"],
      properties: {
        LongId: makeGeneric(List, {
          T: Ident
        }),
        Range: Option(range),
        Modules: makeGeneric(List, {
          T: EntityRef
        }),
        AppliedScope: range,
        IsOwnNamespace: "boolean"
      }
    };
  }

  static Create(longId, modules, appliedScope, isOwnNamespace) {
    var last;
    var copyOfStruct;
    var copyOfStruct_1;
    return new OpenDeclaration(longId, longId.tail != null ? (last = function (option) {
      return defaultArg(option, longId.head);
    }(tryLast(longId.tail)), mkRange(appliedScope.FileName, (copyOfStruct = longId.head.idRange, copyOfStruct.Start), (copyOfStruct_1 = last.idRange, copyOfStruct_1.End))) : null, modules, appliedScope, isOwnNamespace);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.OpenDeclaration", OpenDeclaration);

function _ValRefOfProp___(pi) {
  return pi.ArbitraryValRef;
}

export { _ValRefOfProp___ as $7C$ValRefOfProp$7C$_$7C$ };

function _ValRefOfMeth___(mi) {
  return mi.ArbitraryValRef;
}

export { _ValRefOfMeth___ as $7C$ValRefOfMeth$7C$_$7C$ };

function _ValRefOfEvent___(evt) {
  return evt.ArbitraryValRef;
}

export { _ValRefOfEvent___ as $7C$ValRefOfEvent$7C$_$7C$ };

function _RecordFieldUse___(item) {
  let $var15;

  if (item.tag === 5) {
    $var15 = [0, item.data.data[1].data[1], item.data.data[1].data[0]];
  } else if (item.tag === 21) {
    const activePatternResult34332 = _RecordFieldUse___(item.data[1]);

    if (activePatternResult34332 != null) {
      $var15 = [1, getValue(activePatternResult34332)];
    } else {
      $var15 = [2];
    }
  } else {
    $var15 = [2];
  }

  switch ($var15[0]) {
    case 0:
      return [$var15[1], $var15[2]];

    case 1:
      return $var15[1];

    case 2:
      return null;
  }
}

export { _RecordFieldUse___ as $7C$RecordFieldUse$7C$_$7C$ };

function _ILFieldUse___(item) {
  let $var16;

  if (item.tag === 7) {
    $var16 = [0, item.data];
  } else if (item.tag === 21) {
    const activePatternResult34334 = _ILFieldUse___(item.data[1]);

    if (activePatternResult34334 != null) {
      $var16 = [1, getValue(activePatternResult34334)];
    } else {
      $var16 = [2];
    }
  } else {
    $var16 = [2];
  }

  switch ($var16[0]) {
    case 0:
      return $var16[1];

    case 1:
      return $var16[1];

    case 2:
      return null;
  }
}

export { _ILFieldUse___ as $7C$ILFieldUse$7C$_$7C$ };

function _PropertyUse___(item) {
  let $var17;

  if (item.tag === 9) {
    if (item.data[1].tail != null) {
      $var17 = [0, item.data[1].head];
    } else {
      $var17 = [2];
    }
  } else if (item.tag === 21) {
    const activePatternResult34336 = _PropertyUse___(item.data[1]);

    if (activePatternResult34336 != null) {
      $var17 = [1, getValue(activePatternResult34336)];
    } else {
      $var17 = [2];
    }
  } else {
    $var17 = [2];
  }

  switch ($var17[0]) {
    case 0:
      return $var17[1];

    case 1:
      return $var17[1];

    case 2:
      return null;
  }
}

export { _PropertyUse___ as $7C$PropertyUse$7C$_$7C$ };

function _FSharpPropertyUse___(item) {
  let $var18;

  if (item.tag === 9) {
    if (item.data[1].tail != null) {
      const activePatternResult34339 = _ValRefOfProp___(item.data[1].head);

      if (activePatternResult34339 != null) {
        if (item.data[1].tail.tail == null) {
          $var18 = [0, getValue(activePatternResult34339)];
        } else {
          $var18 = [1];
        }
      } else {
        $var18 = [1];
      }
    } else {
      $var18 = [1];
    }
  } else {
    $var18 = [1];
  }

  switch ($var18[0]) {
    case 0:
      return $var18[1];

    case 1:
      let $var19;

      if (item.tag === 21) {
        const activePatternResult34338 = _FSharpPropertyUse___(item.data[1]);

        if (activePatternResult34338 != null) {
          $var19 = [0, getValue(activePatternResult34338)];
        } else {
          $var19 = [1];
        }
      } else {
        $var19 = [1];
      }

      switch ($var19[0]) {
        case 0:
          return $var19[1];

        case 1:
          return null;
      }

  }
}

export { _FSharpPropertyUse___ as $7C$FSharpPropertyUse$7C$_$7C$ };

function _MethodUse___(item) {
  const $var20 = item.tag === 10 ? item.data[1].tail != null ? item.data[1].tail.tail == null ? [0, item.data[1].head] : [1] : [1] : [1];

  switch ($var20[0]) {
    case 0:
      return $var20[1];

    case 1:
      return null;
  }
}

export { _MethodUse___ as $7C$MethodUse$7C$_$7C$ };

function _FSharpMethodUse___(item) {
  let $var21;

  if (item.tag === 10) {
    if (item.data[1].tail != null) {
      const activePatternResult34342 = _ValRefOfMeth___(item.data[1].head);

      if (activePatternResult34342 != null) {
        if (item.data[1].tail.tail == null) {
          $var21 = [0, getValue(activePatternResult34342)];
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
      return $var21[1];

    case 1:
      const $var22 = item.tag === 0 ? item.data.IsMember ? [0, item.data] : [1] : [1];

      switch ($var22[0]) {
        case 0:
          return $var22[1];

        case 1:
          return null;
      }

  }
}

export { _FSharpMethodUse___ as $7C$FSharpMethodUse$7C$_$7C$ };

function _EntityUse___(item) {
  let $var23;

  if (item.tag === 22) {
    if (item.data.tail != null) {
      $var23 = [0, item.data.head];
    } else {
      $var23 = [3];
    }
  } else if (item.tag === 4) {
    $var23 = [1, item.data];
  } else if (item.tag === 14) {
    if (item.data[1].tail != null) {
      const activePatternResult34345 = _AbbrevOrAppTy___(item.data[1].head);

      if (activePatternResult34345 != null) {
        if (item.data[1].tail.tail == null) {
          $var23 = [2, getValue(activePatternResult34345)];
        } else {
          $var23 = [3];
        }
      } else {
        $var23 = [3];
      }
    } else {
      $var23 = [3];
    }
  } else if (item.tag === 13) {
    const activePatternResult34346 = _AbbrevOrAppTy___(item.data);

    if (activePatternResult34346 != null) {
      $var23 = [2, getValue(activePatternResult34346)];
    } else {
      $var23 = [3];
    }
  } else if (item.tag === 12) {
    const activePatternResult34347 = _AbbrevOrAppTy___(item.data);

    if (activePatternResult34347 != null) {
      $var23 = [2, getValue(activePatternResult34347)];
    } else {
      $var23 = [3];
    }
  } else {
    $var23 = [3];
  }

  switch ($var23[0]) {
    case 0:
      return $var23[1];

    case 1:
      return $var23[1];

    case 2:
      return $var23[1];

    case 3:
      const $var24 = item.tag === 11 ? item.data[1].tail != null ? [0, item.data[1].head] : [1] : [1];

      switch ($var24[0]) {
        case 0:
          const matchValue = $var24[1].ApparentEnclosingType;

          const activePatternResult34344 = _AbbrevOrAppTy___(matchValue);

          if (activePatternResult34344 != null) {
            return getValue(activePatternResult34344);
          } else {
            return null;
          }

        case 1:
          return null;
      }

  }
}

export { _EntityUse___ as $7C$EntityUse$7C$_$7C$ };

function _EventUse___(item) {
  if (item.tag === 8) {
    return item.data;
  } else {
    return null;
  }
}

export { _EventUse___ as $7C$EventUse$7C$_$7C$ };

function _FSharpEventUse___(item) {
  let $var25;

  if (item.tag === 8) {
    const activePatternResult34350 = _ValRefOfEvent___(item.data);

    if (activePatternResult34350 != null) {
      $var25 = [0, getValue(activePatternResult34350)];
    } else {
      $var25 = [1];
    }
  } else {
    $var25 = [1];
  }

  switch ($var25[0]) {
    case 0:
      return $var25[1];

    case 1:
      return null;
  }
}

export { _FSharpEventUse___ as $7C$FSharpEventUse$7C$_$7C$ };

function _UnionCaseUse___(item) {
  if (item.tag === 1) {
    const u1 = item.data[0].data[1];
    return u1;
  } else {
    return null;
  }
}

export { _UnionCaseUse___ as $7C$UnionCaseUse$7C$_$7C$ };

function _ValUse___(item) {
  let $var26;

  if (item.tag === 0) {
    $var26 = [0, item.data];
  } else if (item.tag === 16) {
    const activePatternResult34353 = _FSharpPropertyUse___(item);

    if (activePatternResult34353 != null) {
      $var26 = [0, getValue(activePatternResult34353)];
    } else {
      const activePatternResult34354 = _FSharpMethodUse___(item);

      if (activePatternResult34354 != null) {
        $var26 = [0, getValue(activePatternResult34354)];
      } else {
        const activePatternResult34355 = _FSharpEventUse___(item);

        if (activePatternResult34355 != null) {
          $var26 = [0, getValue(activePatternResult34355)];
        } else {
          $var26 = [0, item.data[1]];
        }
      }
    }
  } else {
    const activePatternResult34356 = _FSharpPropertyUse___(item);

    if (activePatternResult34356 != null) {
      $var26 = [0, getValue(activePatternResult34356)];
    } else {
      const activePatternResult34357 = _FSharpMethodUse___(item);

      if (activePatternResult34357 != null) {
        $var26 = [0, getValue(activePatternResult34357)];
      } else {
        const activePatternResult34358 = _FSharpEventUse___(item);

        if (activePatternResult34358 != null) {
          $var26 = [0, getValue(activePatternResult34358)];
        } else {
          $var26 = [1];
        }
      }
    }
  }

  switch ($var26[0]) {
    case 0:
      return $var26[1];

    case 1:
      return null;
  }
}

export { _ValUse___ as $7C$ValUse$7C$_$7C$ };

function _ActivePatternCaseUse___(item) {
  if (item.tag === 3) {
    const vref = item.data.data[1];
    const idx = item.data.data[2] | 0;
    return [vref.SigRange, vref.DefinitionRange, idx];
  } else if (item.tag === 2) {
    return [item.data[0].Range, item.data[0].Range, item.data[2]];
  } else {
    return null;
  }
}

export { _ActivePatternCaseUse___ as $7C$ActivePatternCaseUse$7C$_$7C$ };
export function tyconRefDefnHash(_g, eref1) {
  return hash(eref1.LogicalName) | 0;
}
export function tyconRefDefnEq(g, eref1, eref2) {
  if (tyconRefEq(g, eref1, eref2)) {
    return true;
  } else if (equals(eref1.DefinitionRange, eref2.DefinitionRange) ? true : equals(eref1.SigRange, eref2.SigRange)) {
    return eref1.LogicalName === eref2.LogicalName;
  } else {
    return false;
  }
}
export function valRefDefnHash(_g, vref1) {
  return hash(vref1.DisplayName) | 0;
}
export function valRefDefnEq(g, vref1, vref2) {
  if (valRefEq(g, vref1, vref2)) {
    return true;
  } else if (equals(vref1.DefinitionRange, vref2.DefinitionRange) ? true : equals(vref1.SigRange, vref2.SigRange)) {
    return vref1.LogicalName === vref2.LogicalName;
  } else {
    return false;
  }
}
export function unionCaseRefDefnEq(g, uc1, uc2) {
  if (uc1.CaseName === uc2.CaseName) {
    return tyconRefDefnEq(g, uc1.TyconRef, uc2.TyconRef);
  } else {
    return false;
  }
}
export function ItemsAreEffectivelyEqual(g, orig, other) {
  const matchValue = [orig, other];
  let $var27;

  const activePatternResult34408 = _EntityUse___(matchValue[0]);

  if (activePatternResult34408 != null) {
    const activePatternResult34409 = _EntityUse___(matchValue[1]);

    if (activePatternResult34409 != null) {
      $var27 = [0, getValue(activePatternResult34408), getValue(activePatternResult34409)];
    } else {
      $var27 = [1];
    }
  } else {
    $var27 = [1];
  }

  switch ($var27[0]) {
    case 0:
      return tyconRefDefnEq(g, $var27[1], $var27[2]);

    case 1:
      let $var28;

      if (matchValue[0].tag === 17) {
        if (matchValue[1].tag === 17) {
          $var28 = [0, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]];
        } else {
          const activePatternResult34404 = _ValUse___(matchValue[0]);

          if (activePatternResult34404 != null) {
            const activePatternResult34405 = _ValUse___(matchValue[1]);

            if (activePatternResult34405 != null) {
              $var28 = [1, getValue(activePatternResult34404), getValue(activePatternResult34405)];
            } else {
              $var28 = [2];
            }
          } else {
            $var28 = [2];
          }
        }
      } else {
        const activePatternResult34406 = _ValUse___(matchValue[0]);

        if (activePatternResult34406 != null) {
          const activePatternResult34407 = _ValUse___(matchValue[1]);

          if (activePatternResult34407 != null) {
            $var28 = [1, getValue(activePatternResult34406), getValue(activePatternResult34407)];
          } else {
            $var28 = [2];
          }
        } else {
          $var28 = [2];
        }
      }

      switch ($var28[0]) {
        case 0:
          if ($var28[1] === $var28[2]) {
            if (typeEquiv(g, mkTyparTy($var28[3]), mkTyparTy($var28[4]))) {
              return true;
            } else {
              const matchValue_1 = [stripTyparEqns(mkTyparTy($var28[3])), stripTyparEqns(mkTyparTy($var28[4]))];
              let $var29;

              if (matchValue_1[0].tag === 5) {
                if (matchValue_1[1].tag === 5) {
                  $var29 = [0, matchValue_1[0].data, matchValue_1[1].data];
                } else {
                  const activePatternResult34374 = _AbbrevOrAppTy___(matchValue_1[0]);

                  if (activePatternResult34374 != null) {
                    const activePatternResult34375 = _AbbrevOrAppTy___(matchValue_1[1]);

                    if (activePatternResult34375 != null) {
                      $var29 = [1, getValue(activePatternResult34374), getValue(activePatternResult34375)];
                    } else {
                      $var29 = [2];
                    }
                  } else {
                    $var29 = [2];
                  }
                }
              } else {
                const activePatternResult34376 = _AbbrevOrAppTy___(matchValue_1[0]);

                if (activePatternResult34376 != null) {
                  const activePatternResult34377 = _AbbrevOrAppTy___(matchValue_1[1]);

                  if (activePatternResult34377 != null) {
                    $var29 = [1, getValue(activePatternResult34376), getValue(activePatternResult34377)];
                  } else {
                    $var29 = [2];
                  }
                } else {
                  $var29 = [2];
                }
              }

              switch ($var29[0]) {
                case 0:
                  if (((!$var29[1].IsCompilerGenerated ? !$var29[1].IsFromError : false) ? !$var29[2].IsCompilerGenerated : false) ? !$var29[2].IsFromError : false) {
                    return equals($var29[1].Range, $var29[2].Range);
                  } else {
                    return false;
                  }

                case 1:
                  return tyconRefDefnEq(g, $var29[1], $var29[2]);

                case 2:
                  return false;
              }
            }
          } else {
            return false;
          }

        case 1:
          return valRefDefnEq(g, $var28[1], $var28[2]);

        case 2:
          let $var30;

          const activePatternResult34402 = _ActivePatternCaseUse___(matchValue[0]);

          if (activePatternResult34402 != null) {
            const activePatternResult34403 = _ActivePatternCaseUse___(matchValue[1]);

            if (activePatternResult34403 != null) {
              $var30 = [0, getValue(activePatternResult34402)[2], getValue(activePatternResult34403)[2], getValue(activePatternResult34402)[0], getValue(activePatternResult34402)[1], getValue(activePatternResult34403)[0], getValue(activePatternResult34403)[1]];
            } else {
              $var30 = [1];
            }
          } else {
            $var30 = [1];
          }

          switch ($var30[0]) {
            case 0:
              if ($var30[1] === $var30[2]) {
                if (equals($var30[3], $var30[5])) {
                  return true;
                } else {
                  return equals($var30[4], $var30[6]);
                }
              } else {
                return false;
              }

            case 1:
              let $var31;

              const activePatternResult34400 = _MethodUse___(matchValue[0]);

              if (activePatternResult34400 != null) {
                const activePatternResult34401 = _MethodUse___(matchValue[1]);

                if (activePatternResult34401 != null) {
                  $var31 = [0, getValue(activePatternResult34400), getValue(activePatternResult34401)];
                } else {
                  $var31 = [1];
                }
              } else {
                $var31 = [1];
              }

              switch ($var31[0]) {
                case 0:
                  if (function (arg00, arg10) {
                    return MethInfo.MethInfosUseIdenticalDefinitions(arg00, arg10);
                  }($var31[1], $var31[2])) {
                    return true;
                  } else {
                    const matchValue_2 = [$var31[1].ArbitraryValRef, $var31[2].ArbitraryValRef];
                    const $var32 = matchValue_2[0] != null ? matchValue_2[1] != null ? [0, getValue(matchValue_2[0]), getValue(matchValue_2[1])] : [1] : [1];

                    switch ($var32[0]) {
                      case 0:
                        return valRefDefnEq(g, $var32[1], $var32[2]);

                      case 1:
                        return false;
                    }
                  }

                case 1:
                  let $var33;

                  const activePatternResult34398 = _PropertyUse___(matchValue[0]);

                  if (activePatternResult34398 != null) {
                    const activePatternResult34399 = _PropertyUse___(matchValue[1]);

                    if (activePatternResult34399 != null) {
                      $var33 = [0, getValue(activePatternResult34398), getValue(activePatternResult34399)];
                    } else {
                      $var33 = [1];
                    }
                  } else {
                    $var33 = [1];
                  }

                  switch ($var33[0]) {
                    case 0:
                      if (function (arg00_1, arg10_1) {
                        return PropInfo.PropInfosUseIdenticalDefinitions(arg00_1, arg10_1);
                      }($var33[1], $var33[2])) {
                        return true;
                      } else {
                        const matchValue_3 = [$var33[1].ArbitraryValRef, $var33[2].ArbitraryValRef];
                        const $var34 = matchValue_3[0] != null ? matchValue_3[1] != null ? [0, getValue(matchValue_3[0]), getValue(matchValue_3[1])] : [1] : [1];

                        switch ($var34[0]) {
                          case 0:
                            return valRefDefnEq(g, $var34[1], $var34[2]);

                          case 1:
                            return false;
                        }
                      }

                    case 1:
                      let $var35;

                      if (matchValue[0].tag === 20) {
                        if (matchValue[1].tag === 20) {
                          $var35 = [0, matchValue[0].data[0], matchValue[1].data[0]];
                        } else {
                          const activePatternResult34396 = _ValUse___(matchValue[1]);

                          if (activePatternResult34396 != null) {
                            $var35 = [1, matchValue[0].data[0], getValue(activePatternResult34396)];
                          } else {
                            $var35 = [2];
                          }
                        }
                      } else {
                        const activePatternResult34397 = _ValUse___(matchValue[0]);

                        if (activePatternResult34397 != null) {
                          if (matchValue[1].tag === 20) {
                            $var35 = [1, matchValue[1].data[0], getValue(activePatternResult34397)];
                          } else {
                            $var35 = [2];
                          }
                        } else {
                          $var35 = [2];
                        }
                      }

                      switch ($var35[0]) {
                        case 0:
                          if ($var35[1].idText === $var35[2].idText) {
                            return equals($var35[1].idRange, $var35[2].idRange);
                          } else {
                            return false;
                          }

                        case 1:
                          if (equals($var35[1].idRange, $var35[2].DefinitionRange) ? true : equals($var35[1].idRange, $var35[2].SigRange)) {
                            return $var35[1].idText === $var35[2].DisplayName;
                          } else {
                            return false;
                          }

                        case 2:
                          let $var36;

                          const activePatternResult34394 = _ILFieldUse___(matchValue[0]);

                          if (activePatternResult34394 != null) {
                            const activePatternResult34395 = _ILFieldUse___(matchValue[1]);

                            if (activePatternResult34395 != null) {
                              $var36 = [0, getValue(activePatternResult34394), getValue(activePatternResult34395)];
                            } else {
                              $var36 = [1];
                            }
                          } else {
                            $var36 = [1];
                          }

                          switch ($var36[0]) {
                            case 0:
                              return function (arg00_2, arg10_2) {
                                return ILFieldInfo.ILFieldInfosUseIdenticalDefinitions(arg00_2, arg10_2);
                              }($var36[1], $var36[2]);

                            case 1:
                              let $var37;

                              const activePatternResult34392 = _UnionCaseUse___(matchValue[0]);

                              if (activePatternResult34392 != null) {
                                const activePatternResult34393 = _UnionCaseUse___(matchValue[1]);

                                if (activePatternResult34393 != null) {
                                  $var37 = [0, getValue(activePatternResult34392), getValue(activePatternResult34393)];
                                } else {
                                  $var37 = [1];
                                }
                              } else {
                                $var37 = [1];
                              }

                              switch ($var37[0]) {
                                case 0:
                                  return unionCaseRefDefnEq(g, $var37[1], $var37[2]);

                                case 1:
                                  let $var38;

                                  const activePatternResult34390 = _RecordFieldUse___(matchValue[0]);

                                  if (activePatternResult34390 != null) {
                                    const activePatternResult34391 = _RecordFieldUse___(matchValue[1]);

                                    if (activePatternResult34391 != null) {
                                      $var38 = [0, getValue(activePatternResult34390)[0], getValue(activePatternResult34391)[0], getValue(activePatternResult34390)[1], getValue(activePatternResult34391)[1]];
                                    } else {
                                      $var38 = [1];
                                    }
                                  } else {
                                    $var38 = [1];
                                  }

                                  switch ($var38[0]) {
                                    case 0:
                                      if ($var38[1] === $var38[2]) {
                                        return tyconRefDefnEq(g, $var38[3], $var38[4]);
                                      } else {
                                        return false;
                                      }

                                    case 1:
                                      let $var39;

                                      const activePatternResult34388 = _EventUse___(matchValue[0]);

                                      if (activePatternResult34388 != null) {
                                        const activePatternResult34389 = _EventUse___(matchValue[1]);

                                        if (activePatternResult34389 != null) {
                                          $var39 = [0, getValue(activePatternResult34388), getValue(activePatternResult34389)];
                                        } else {
                                          $var39 = [1];
                                        }
                                      } else {
                                        $var39 = [1];
                                      }

                                      switch ($var39[0]) {
                                        case 0:
                                          if (function (arg00_3, arg10_3) {
                                            return EventInfo.EventInfosUseIdenticalDefintions(arg00_3, arg10_3);
                                          }($var39[1], $var39[2])) {
                                            return true;
                                          } else {
                                            const matchValue_4 = [$var39[1].ArbitraryValRef, $var39[2].ArbitraryValRef];
                                            const $var40 = matchValue_4[0] != null ? matchValue_4[1] != null ? [0, getValue(matchValue_4[0]), getValue(matchValue_4[1])] : [1] : [1];

                                            switch ($var40[0]) {
                                              case 0:
                                                return valRefDefnEq(g, $var40[1], $var40[2]);

                                              case 1:
                                                return false;
                                            }
                                          }

                                        case 1:
                                          const $var41 = matchValue[0].tag === 18 ? matchValue[1].tag === 18 ? [0, matchValue[0].data, matchValue[1].data] : [1] : [1];

                                          switch ($var41[0]) {
                                            case 0:
                                              return exists(function (modref1) {
                                                return exists(function (r) {
                                                  return tyconRefDefnEq(g, modref1, r) ? true : fullDisplayTextOfModRef(modref1) === fullDisplayTextOfModRef(r);
                                                }, $var41[2]);
                                              }, $var41[1]);

                                            case 1:
                                              return false;
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
export function ItemsAreEffectivelyEqualHash(g, orig) {
  const activePatternResult34421 = _EntityUse___(orig);

  if (activePatternResult34421 != null) {
    return tyconRefDefnHash(g, getValue(activePatternResult34421)) | 0;
  } else if (orig.tag === 17) {
    return hash(orig.data[0]) | 0;
  } else {
    const activePatternResult34420 = _ValUse___(orig);

    if (activePatternResult34420 != null) {
      return valRefDefnHash(g, getValue(activePatternResult34420)) | 0;
    } else {
      const activePatternResult34419 = _ActivePatternCaseUse___(orig);

      if (activePatternResult34419 != null) {
        return hash(getValue(activePatternResult34419)[2]) | 0;
      } else {
        const activePatternResult34418 = _MethodUse___(orig);

        if (activePatternResult34418 != null) {
          return getValue(activePatternResult34418).ComputeHashCode() | 0;
        } else {
          const activePatternResult34417 = _PropertyUse___(orig);

          if (activePatternResult34417 != null) {
            return getValue(activePatternResult34417).ComputeHashCode() | 0;
          } else if (orig.tag === 20) {
            return hash(orig.data[0].idText) | 0;
          } else {
            const activePatternResult34416 = _ILFieldUse___(orig);

            if (activePatternResult34416 != null) {
              return getValue(activePatternResult34416).ComputeHashCode() | 0;
            } else {
              const activePatternResult34415 = _UnionCaseUse___(orig);

              if (activePatternResult34415 != null) {
                return hash(getValue(activePatternResult34415).CaseName) | 0;
              } else {
                const activePatternResult34414 = _RecordFieldUse___(orig);

                if (activePatternResult34414 != null) {
                  return hash(getValue(activePatternResult34414)[0]) | 0;
                } else {
                  const activePatternResult34413 = _EventUse___(orig);

                  if (activePatternResult34413 != null) {
                    return getValue(activePatternResult34413).ComputeHashCode() | 0;
                  } else if (orig.tag === 18) {
                    return 100013;
                  } else {
                    return 389329;
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
export class CapturedNameResolution {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.CapturedNameResolution",
      properties: {
        AccessorDomain: AccessorDomain,
        DisplayEnv: DisplayEnv,
        Item: Item,
        ItemOccurence: ItemOccurence,
        ItemWithInst: ItemWithInst,
        NameResolutionEnv: NameResolutionEnv,
        Pos: pos,
        Range: range
      }
    };
  }

  constructor(p, i, tpinst, io, de, nre, ad, m) {
    this.p = p;
    this.i = i;
    this.tpinst = tpinst;
    this.io = io;
    this.de = de;
    this.nre = nre;
    this.ad = ad;
    this.m = m;
  }

  get Pos() {
    return this.p;
  }

  get Item() {
    return this.i;
  }

  get ItemWithInst() {
    return new ItemWithInst(this.i, this.tpinst);
  }

  get ItemOccurence() {
    return this.io;
  }

  get DisplayEnv() {
    return this.de;
  }

  get NameResolutionEnv() {
    return this.nre;
  }

  get AccessorDomain() {
    return this.ad;
  }

  get Range() {
    return this.m;
  }

  DebugToString() {
    var clo1;
    return (clo1 = toText(printf("%A: %+A")), CurriedLambda(tupledArg => CurriedLambda(clo1)([tupledArg[0], tupledArg[1]])))([this.p.Line, this.p.Column], this.i);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.CapturedNameResolution", CapturedNameResolution);
export class TcResolutions {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.TcResolutions",
      properties: {
        CapturedEnvs: _Array(Tuple([range, NameResolutionEnv, AccessorDomain])),
        CapturedExpressionTypings: _Array(Tuple([pos, TType, DisplayEnv, NameResolutionEnv, AccessorDomain, range])),
        CapturedMethodGroupResolutions: _Array(CapturedNameResolution),
        CapturedNameResolutions: _Array(CapturedNameResolution),
        Empty: TcResolutions
      }
    };
  }

  constructor(capturedEnvs, capturedExprTypes, capturedNameResolutions, capturedMethodGroupResolutions) {
    this.capturedEnvs = capturedEnvs;
    this.capturedExprTypes = capturedExprTypes;
    this.capturedNameResolutions = capturedNameResolutions;
    this.capturedMethodGroupResolutions = capturedMethodGroupResolutions;
  }

  static [".cctor"]() {
    TcResolutions.empty = new TcResolutions([], [], [], []);
  }

  get CapturedEnvs() {
    return this.capturedEnvs;
  }

  get CapturedExpressionTypings() {
    return this.capturedExprTypes;
  }

  get CapturedNameResolutions() {
    return this.capturedNameResolutions;
  }

  get CapturedMethodGroupResolutions() {
    return this.capturedMethodGroupResolutions;
  }

  static get Empty() {
    return TcResolutions.empty;
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.TcResolutions", TcResolutions);
TcResolutions[".cctor"]();
export class TcSymbolUseData {
  constructor(item, itemOccurence, displayEnv, range) {
    this.Item = item;
    this.ItemOccurence = itemOccurence;
    this.DisplayEnv = displayEnv;
    this.Range = range;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.TcSymbolUseData",
      interfaces: ["FSharpRecord"],
      properties: {
        Item: Item,
        ItemOccurence: ItemOccurence,
        DisplayEnv: DisplayEnv,
        Range: range
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.TcSymbolUseData", TcSymbolUseData);
export class TcSymbolUses {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.TcSymbolUses",
      properties: {
        AllUsesOfSymbols: _Array(TcSymbolUseData)
      }
    };
  }

  constructor(g, capturedNameResolutions, formatSpecifierLocations) {
    this.g = g;
    this.formatSpecifierLocations = formatSpecifierLocations;
    this.allUsesOfSymbols = Array.from(delay(() => map_2(cnr => new TcSymbolUseData(cnr.Item, cnr.ItemOccurence, cnr.DisplayEnv, cnr.Range), capturedNameResolutions)));
  }

  GetUsesOfSymbol(item) {
    return Array.from(delay(() => collect(symbolUse => (() => {
      const $var42 = () => ItemsAreEffectivelyEqual(this.g, item, symbolUse.Item);

      try {
        return $var42();
      } catch (matchValue) {
        if (matchValue instanceof UnresolvedPathReferenceNoRange) {
          return false;
        } else {
          throw matchValue;
        }
      }
    })() ? singleton(symbolUse) : empty(), this.allUsesOfSymbols)));
  }

  get AllUsesOfSymbols() {
    return this.allUsesOfSymbols;
  }

  GetFormatSpecifierLocationsAndArity() {
    return this.formatSpecifierLocations;
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.TcSymbolUses", TcSymbolUses);
export class TcResultsSinkImpl {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.TcResultsSinkImpl",
      interfaces: ["Microsoft.FSharp.Compiler.NameResolution.ITypecheckResultsSink"],
      properties: {}
    };
  }

  constructor(g, source) {
    var $var43;
    var $var44;
    this.g = g;
    this.source = source;
    this.capturedEnvs = [];
    this.capturedExprTypings = [];
    this.capturedNameResolutions = [];
    this.capturedFormatSpecifierLocations = [];
    this.capturedNameResolutionIdentifiers = create_1(null, fromEqualityComparer(($var43 = this, {
      GetHashCode(_arg2) {
        return _arg2[0].Line + 101 * _arg2[0].Column + hash(_arg2[1]) | 0;
      },

      Equals(_arg3, _arg4) {
        if (posEq(_arg3[0], _arg4[0])) {
          return _arg3[1] === _arg4[1];
        } else {
          return false;
        }
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    })));
    this.capturedModulesAndNamespaces = create_1(null, fromEqualityComparer(($var44 = this, {
      GetHashCode(_arg5) {
        return hash(_arg5[0]) | 0;
      },

      Equals(_arg6, _arg7) {
        if (equals(_arg6[0], _arg7[0])) {
          return ItemsAreEffectivelyEqual($var44.g, _arg6[1], _arg7[1]);
        } else {
          return false;
        }
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    })));
    this.capturedMethodGroupResolutions = [];
    this.capturedOpenDeclarations = [];
  }

  static [".ctor"](g, source, _arg1) {
    return new TcResultsSinkImpl(g, source);
  }

  GetResolutions() {
    return new TcResolutions(this.capturedEnvs, this.capturedExprTypings, this.capturedNameResolutions, this.capturedMethodGroupResolutions);
  }

  GetSymbolUses() {
    return new TcSymbolUses(this.g, this.capturedNameResolutions, Array.from(this.capturedFormatSpecifierLocations));
  }

  GetOpenDeclarations() {
    return Array.from(this.capturedOpenDeclarations);
  }

  NotifyEnvWithScope(m, nenv, ad) {
    if (this.allowedRange(m)) {
      this.capturedEnvs.push([m, nenv, ad]);
    }
  }

  NotifyExprHasType(endPos, ty, denv, nenv, ad, m) {
    if (this.allowedRange(m)) {
      this.capturedExprTypings.push([endPos, ty, denv, nenv, ad, m]);
    }
  }

  NotifyNameResolution(endPos, item, itemMethodGroup, tpinst, occurenceType, denv, nenv, ad, m, replace) {
    if (this.allowedRange(m)) {
      if (replace) {
        const r1 = Array.from(filter_1(cnr => !equals(cnr.Range, m), this.capturedNameResolutions));
        const r2 = Array.from(filter_1(cnr_1 => !equals(cnr_1.Range, m), this.capturedMethodGroupResolutions));
        clear(this.capturedNameResolutions);
        clear(this.capturedMethodGroupResolutions);
        addRangeInPlace(r1, this.capturedNameResolutions);
        addRangeInPlace(r2, this.capturedMethodGroupResolutions);
      } else {
        let alreadyDone;

        if (item.tag === 18) {
          alreadyDone = !addInPlace([m, item], this.capturedModulesAndNamespaces);
        } else {
          const keyOpt = item.tag === 0 ? [endPos, item.data.DisplayName] : item.tag === 20 ? [endPos, item.data[0].idText] : null;

          if (keyOpt != null) {
            alreadyDone = !addInPlace(getValue(keyOpt), this.capturedNameResolutionIdentifiers);
          } else {
            alreadyDone = false;
          }
        }

        if (!alreadyDone) {
          this.capturedNameResolutions.push(new CapturedNameResolution(endPos, item, tpinst, occurenceType, denv, nenv, ad, m));
          this.capturedMethodGroupResolutions.push(new CapturedNameResolution(endPos, itemMethodGroup, new List(), occurenceType, denv, nenv, ad, m));
        }
      }
    }
  }

  NotifyFormatSpecifierLocation(m, numArgs) {
    this.capturedFormatSpecifierLocations.push([m, numArgs]);
  }

  NotifyOpenDeclaration(openDeclaration) {
    this.capturedOpenDeclarations.push(openDeclaration);
  }

  get CurrentSource() {
    return this.source;
  }

  allowedRange(m) {
    return !m.IsSynthetic;
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.TcResultsSinkImpl", TcResultsSinkImpl);
export class TcResultsSink {
  constructor(currentSink) {
    this.CurrentSink = currentSink;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.TcResultsSink",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        CurrentSink: Option(Interface("Microsoft.FSharp.Compiler.NameResolution.ITypecheckResultsSink"))
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  static get NoSink() {
    return new TcResultsSink(null);
  }

  static WithSink(sink) {
    return new TcResultsSink(sink);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.TcResultsSink", TcResultsSink);
export function WithNewTypecheckResultsSink(newSink, sink) {
  const old = sink.CurrentSink;
  sink.CurrentSink = newSink;
  return {
    Dispose() {
      sink.CurrentSink = old;
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["System.IDisposable"]
      };
    }

  };
}
export function TemporarilySuspendReportingTypecheckResultsToSink(sink) {
  const old = sink.CurrentSink;
  sink.CurrentSink = null;
  return {
    Dispose() {
      sink.CurrentSink = old;
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["System.IDisposable"]
      };
    }

  };
}
export function CallEnvSink(sink, scopem, nenv, ad) {
  const matchValue = sink.CurrentSink;

  if (matchValue != null) {
    getValue(matchValue).NotifyEnvWithScope(scopem, nenv, ad);
  }
}
export function CallNameResolutionSink(sink, m, nenv, item, itemMethodGroup, tpinst, occurenceType, denv, ad) {
  const matchValue = sink.CurrentSink;

  if (matchValue != null) {
    getValue(matchValue).NotifyNameResolution(m.End, item, itemMethodGroup, tpinst, occurenceType, denv, nenv, ad, m, false);
  }
}
export function CallNameResolutionSinkReplacing(sink, m, nenv, item, itemMethodGroup, tpinst, occurenceType, denv, ad) {
  const matchValue = sink.CurrentSink;

  if (matchValue != null) {
    getValue(matchValue).NotifyNameResolution(m.End, item, itemMethodGroup, tpinst, occurenceType, denv, nenv, ad, m, true);
  }
}
export function CallExprHasTypeSink(sink, m, nenv, typ, denv, ad) {
  const matchValue = sink.CurrentSink;

  if (matchValue != null) {
    getValue(matchValue).NotifyExprHasType(m.End, typ, denv, nenv, ad, m);
  }
}
export function CallOpenDeclarationSink(sink, openDeclaration) {
  const matchValue = sink.CurrentSink;

  if (matchValue != null) {
    getValue(matchValue).NotifyOpenDeclaration(openDeclaration);
  }
}
export class ResultTyparChecker {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.ResultTyparChecker",
      interfaces: ["FSharpUnion"],
      cases: [["ResultTyparChecker", _Function([Unit, "boolean"])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.ResultTyparChecker", ResultTyparChecker);
export function CheckAllTyparsInferrable(amap, m, item) {
  switch (item.tag) {
    case 10:
      return forAll(function (minfo) {
        if (minfo.IsExtensionMember) {
          return true;
        } else {
          const fminst = minfo.FormalMethodInst;
          const freeInDeclaringType = freeInType(CollectTyparsNoCaching, minfo.ApparentEnclosingType);
          const freeInArgsAndRetType = foldBack(function (arg10_, arg20_) {
            return accFreeInTypes(CollectTyparsNoCaching, arg10_, arg20_);
          }, minfo.GetParamTypes(amap, m, fminst), accFreeInTypes(CollectTyparsNoCaching, minfo.GetObjArgTypes(amap, m, fminst), freeInType(CollectTyparsNoCaching, minfo.GetFSharpReturnTy(amap, m, fminst))));
          const free = ZsetModule.diff(freeInDeclaringType.FreeTypars, freeInArgsAndRetType.FreeTypars);
          return free.IsEmpty;
        }
      }, item.data[1]);

    case 11:
    case 12:
    case 13:
    case 14:
    case 18:
    case 15:
    case 16:
    case 17:
    case 20:
    case 2:
    case 0:
    case 3:
    case 1:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 19:
    case 22:
    case 21:
      return true;

    default:
      return forAll(function (pinfo) {
        if (pinfo.IsExtensionMember) {
          return true;
        } else {
          const freeInDeclaringType_1 = freeInType(CollectTyparsNoCaching, pinfo.ApparentEnclosingType);
          const freeInArgsAndRetType_1 = accFreeInTypes(CollectTyparsNoCaching, pinfo.GetParamTypes(amap, m), freeInType(CollectTyparsNoCaching, pinfo.GetPropertyType(amap, m)));
          const free_1 = ZsetModule.diff(freeInDeclaringType_1.FreeTypars, freeInArgsAndRetType_1.FreeTypars);
          return free_1.IsEmpty;
        }
      }, item.data[1]);
  }
}
export class ResolutionInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.ResolutionInfo",
      interfaces: ["FSharpUnion"],
      cases: [["ResolutionInfo", makeGeneric(List, {
        T: Tuple([range, EntityRef])
      }), _Function([ResultTyparChecker, Unit])]]
    };
  }

  static SendEntityPathToSink(sink, ncenv, nenv, occ, ad, _arg1, typarChecker) {
    iterate(function (tupledArg) {
      CommitOperationResult(CheckEntityAttributes(ncenv.g, tupledArg[1], tupledArg[0]));
      CheckTyconAccessible(ncenv.amap, tupledArg[0], ad, tupledArg[1]);
      const item = tupledArg[1].IsModuleOrNamespace ? new Item(18, ofArray([tupledArg[1]])) : new Item(14, [tupledArg[1].DisplayName, ofArray([FreshenTycon(ncenv, tupledArg[0], tupledArg[1])])]);
      CallNameResolutionSink(sink, tupledArg[0], nenv, item, item, emptyTyparInst, occ, nenv.eDisplayEnv, ad);
    }, _arg1.data[0]);

    _arg1.data[1](typarChecker);
  }

  static get Empty() {
    return new ResolutionInfo(0, [new List(), function (_arg1) {}]);
  }

  AddEntity(info) {
    return new ResolutionInfo(0, [new List(info, this.data[0]), this.data[1]]);
  }

  AddWarning(f) {
    return new ResolutionInfo(0, [this.data[0], typarChecker => {
      f(typarChecker);
      this.data[1](typarChecker);
    }]);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.ResolutionInfo", ResolutionInfo);
export function CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs, typeNameResInfo, genOk, m) {
  var tcref_1;

  var _resInfo;

  var tcref;
  var resInfo_2;
  const tcrefs_1 = toList(sortWith(($var45, $var46) => compare(function (tupledArg) {
    return tupledArg[1].Typars(m).length;
  }($var45), function (tupledArg) {
    return tupledArg[1].Typars(m).length;
  }($var46)), toList(distinctBy(function (tupledArg_1) {
    return tupledArg_1[1].Stamp;
  }, tcrefs))));
  let tcrefs_2;
  const $var47 = tcrefs_1.tail != null ? (tcref_1 = tcrefs_1.head[1], _resInfo = tcrefs_1.head[0], ((tcrefs_1.length > 1 ? typeNameResInfo.StaticArgsInfo.HasNoStaticArgsInfo : false) ? !(tcref_1.Typars(m).tail == null) : false) ? count(distinctBy(function (tupledArg_2) {
    return tupledArg_2[1].Typars(m).length;
  }, tcrefs_1)) > 1 : false) ? [0, tcrefs_1.head[0], tcrefs_1.head[1]] : [1] : [1];

  switch ($var47[0]) {
    case 0:
      tcrefs_2 = toList(delay(function () {
        return collect(function (matchValue) {
          const resInfo = matchValue[0].AddWarning(function (_typarChecker) {
            errorR(new _Error(SR.nrTypeInstantiationNeededToDisambiguateTypesWithSameName(matchValue[1].DisplayName, matchValue[1].DisplayNameWithStaticParametersAndUnderscoreTypars), m));
          });
          return singleton([resInfo, matchValue[1]]);
        }, tcrefs_1);
      }));
      break;

    case 1:
      const $var48 = tcrefs_1.tail != null ? tcrefs_1.tail.tail == null ? (tcref = tcrefs_1.head[1], resInfo_2 = tcrefs_1.head[0], (typeNameResInfo.StaticArgsInfo.HasNoStaticArgsInfo ? !(tcref.Typars(m).tail == null) : false) ? typeNameResInfo.ResolutionFlag.Equals(new TypeNameResolutionFlag(1)) : false) ? [0, tcrefs_1.head[0], tcrefs_1.head[1]] : [1] : [1] : [1];

      switch ($var48[0]) {
        case 0:
          const resInfo_1 = $var48[1].AddWarning(function (_arg5) {
            if (!_arg5.data()) {
              warning(new _Error(SR.nrTypeInstantiationIsMissingAndCouldNotBeInferred($var48[2].DisplayName, $var48[2].DisplayNameWithStaticParametersAndUnderscoreTypars), m));
            }
          });
          tcrefs_2 = ofArray([[resInfo_1, $var48[2]]]);
          break;

        case 1:
          tcrefs_2 = tcrefs_1;
          break;
      }

      break;
  }

  genOk;
  return tcrefs_2;
}
export function ResolveLongIndentAsModuleOrNamespace(sink, atMostOne, amap, m, first, fullyQualified, nenv, ad, id, rest, isOpenDecl) {
  ResolveLongIndentAsModuleOrNamespace: while (true) {
    if (first ? id.idText === "`global`" : false) {
      if (rest.tail != null) {
        sink = sink;
        atMostOne = atMostOne;
        amap = amap;
        m = m;
        first = false;
        fullyQualified = new FullyQualifiedFlag(0);
        nenv = nenv;
        ad = ad;
        id = rest.head;
        rest = rest.tail;
        isOpenDecl = isOpenDecl;
        continue ResolveLongIndentAsModuleOrNamespace;
      } else {
        return error_2(new _Error(SR.nrGlobalUsedOnlyAsFirstName(), id.idRange));
      }
    } else {
      const moduleOrNamespaces = nenv.ModulesAndNamespaces(fullyQualified);
      const namespaceNotFound = new Lazy(function () {
        const suggestModulesAndNamespaces = function () {
          return new Set(collect(function (e) {
            return ofArray([e.DisplayName, e.DemangledModuleOrNamespaceName]);
          }, filter_1(function (modref) {
            return IsEntityAccessible(amap, m, ad, modref);
          }, collect(function (kv) {
            return kv[1];
          }, moduleOrNamespaces))));
        };

        return new UndefinedName(0, function (arg00) {
          return SR.undefinedNameNamespaceOrModule(arg00);
        }, id, suggestModulesAndNamespaces);
      });
      let moduleNotFoundErrorCache = null;

      const moduleNotFound = function (modref_1, mty, id_1, depth) {
        var oldId;
        var error_1;
        const $var49 = moduleNotFoundErrorCache != null ? (oldId = getValue(moduleNotFoundErrorCache)[0], error_1 = getValue(moduleNotFoundErrorCache)[1], equals(oldId, id_1.idRange)) ? [0, getValue(moduleNotFoundErrorCache)[1], getValue(moduleNotFoundErrorCache)[0]] : [1] : [1];

        switch ($var49[0]) {
          case 0:
            return $var49[1];

          case 1:
            const suggestNames = function () {
              return new Set(collect(function (e_1) {
                return ofArray([e_1[1].DisplayName, e_1[1].DemangledModuleOrNamespaceName]);
              }, filter_1(function (kv_1) {
                return IsEntityAccessible(amap, m, ad, modref_1.NestedTyconRef(kv_1[1]));
              }, mty.ModulesAndNamespacesByDemangledName)));
            };

            const error = ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00_1) {
              return SR.undefinedNameNamespace(arg00_1);
            }, id_1, suggestNames));
            moduleNotFoundErrorCache = [id_1.idRange, error];
            return error;
        }
      };

      const notifyNameResolution = function (modref_2, m_1) {
        const item = new Item(18, ofArray([modref_2]));
        const occurence = isOpenDecl ? new ItemOccurence(7) : new ItemOccurence(1);
        CallNameResolutionSink(sink, m_1, nenv, item, item, emptyTyparInst, occurence, nenv.DisplayEnv, ad);
      };

      const matchValue = tryFind(id.idText, moduleOrNamespaces);

      if (matchValue == null) {
        return ResultOrExceptionModule.raze(namespaceNotFound.value);
      } else {
        const look = function (depth_1, modref_3, mty_1, lid) {
          look: while (true) {
            if (lid.tail != null) {
              const matchValue_1 = tryFind(lid.head.idText, mty_1.ModulesAndNamespacesByDemangledName);

              if (matchValue_1 != null) {
                const subref = modref_3.NestedTyconRef(getValue(matchValue_1));

                if (IsEntityAccessible(amap, m, ad, subref)) {
                  notifyNameResolution(subref, lid.head.idRange);
                  depth_1 = depth_1 + 1;
                  modref_3 = subref;
                  mty_1 = getValue(matchValue_1).ModuleOrNamespaceType;
                  lid = lid.tail;
                  continue look;
                } else {
                  return moduleNotFound(modref_3, mty_1, lid.head, depth_1);
                }
              } else {
                return moduleNotFound(modref_3, mty_1, lid.head, depth_1);
              }
            } else {
              return ResultOrExceptionModule.success([depth_1, modref_3, mty_1]);
            }
          }
        };

        return CollectResults2(atMostOne, function (modref_4) {
          if (IsEntityAccessible(amap, m, ad, modref_4)) {
            notifyNameResolution(modref_4, id.idRange);
            return look(1, modref_4, modref_4.ModuleOrNamespaceType, rest);
          } else {
            return ResultOrExceptionModule.raze(namespaceNotFound.value);
          }
        })(getValue(matchValue));
      }
    }
  }
}
export function ResolveLongIndentAsModuleOrNamespaceThen(sink, atMostOne, amap, m, fullyQualified, nenv, ad, id, rest, isOpenDecl, f) {
  const matchValue = ResolveLongIndentAsModuleOrNamespace(sink, new ResultCollectionSettings(0), amap, m, true, fullyQualified, nenv, ad, id, new List(), isOpenDecl);

  if (matchValue.tag === 1) {
    return new ResultOrException(1, matchValue.data);
  } else if (rest.tail != null) {
    return CollectResults2(atMostOne, function (tupledArg) {
      const resInfo = ResolutionInfo.Empty.AddEntity([id.idRange, tupledArg[1]]);
      return f(resInfo, tupledArg[0] + 1, id.idRange, tupledArg[1], tupledArg[2], rest.head, rest.tail);
    })(matchValue.data);
  } else {
    return error_2(new _Error(SR.nrUnexpectedEmptyLongId(), id.idRange));
  }
}

function ResolveObjectConstructorPrim(ncenv, edenv, resInfo, m, ad, typ) {
  const g = ncenv.g;
  const amap = ncenv.amap;

  if (isDelegateTy(g, typ)) {
    return ResultOrExceptionModule.success([resInfo, new Item(13, typ)]);
  } else {
    const ctorInfos = GetIntrinsicConstructorInfosOfType(ncenv.InfoReader, m, typ);

    if (ctorInfos.tail == null ? isInterfaceTy(g, typ) : false) {
      return ResultOrExceptionModule.success([resInfo, new Item(12, typ)]);
    } else {
      const defaultStructCtorInfo = (((!exists(function (x) {
        return x.IsNullary;
      }, ctorInfos) ? isStructTy(g, typ) : false) ? !isRecdTy(g, typ) : false) ? !isUnionTy(g, typ) : false) ? ofArray([new MethInfo(2, [g, typ])]) : new List();

      if ((defaultStructCtorInfo.tail == null ? ctorInfos.tail == null : false) ? true : !isAppTy(g, typ) ? !isAnyTupleTy(g, typ) : false) {
        return ResultOrExceptionModule.raze(new _Error(SR.nrNoConstructorsAvailableForType(minimalStringOfType(edenv, typ)), m));
      } else {
        const ctorInfos_1 = filter(function (minfo) {
          return IsMethInfoAccessible(amap, m, ad, minfo);
        }, ctorInfos);
        const metadataTy = helpEnsureTypeHasMetadata(g, typ);
        return ResultOrExceptionModule.success([resInfo, Item.MakeCtorGroup(tcrefOfAppTy(g, metadataTy).LogicalName, append(defaultStructCtorInfo, ctorInfos_1))]);
      }
    }
  }
}

export function ResolveObjectConstructor(ncenv, edenv, m, ad, typ) {
  return ResultOrExceptionModule.op_BarQmarkGreater(ResolveObjectConstructorPrim(ncenv, edenv, new List(), m, ad, typ), function (tupledArg) {
    return tupledArg[1];
  });
}
export function IntrinsicPropInfosOfTypeInScope(infoReader, optFilter, ad, findFlag, m, typ) {
  const g = infoReader.g;
  const amap = infoReader.amap;
  const pinfos = GetIntrinsicPropInfoSetsOfType(infoReader, optFilter, ad, new AllowMultiIntfInstantiations(0), findFlag, m, typ);

  const pinfos_2 = function (pinfos_1) {
    return ExcludeHiddenOfPropInfos(g, amap, m, pinfos_1);
  }(pinfos);

  return pinfos_2;
}
export function SelectPropInfosFromExtMembers(infoReader, ad, optFilter, declaringTy, m, extMemInfos) {
  const g = infoReader.g;
  const amap = infoReader.amap;
  const seen = create_1(null, fromEqualityComparer(ExtensionMember.Comparer(g)));
  const propCollector = new PropertyCollector(g, amap, m, declaringTy, optFilter, ad);

  for (let emem of extMemInfos) {
    if (addInPlace(emem, seen)) {
      if (emem.tag === 1) {} else {
        const matchValue = emem.data[0].MemberInfo;

        if (matchValue != null) {
          propCollector.Collect(getValue(matchValue), emem.data[0]);
        }
      }
    }
  }

  return propCollector.Close();
}
export function ExtensionPropInfosOfTypeInScope(infoReader, nenv, optFilter, ad, m, typ) {
  const g = infoReader.g;
  const extMemsFromHierarchy = collect_1(function (typ_1) {
    if (isAppTy(g, typ_1)) {
      const tcref = tcrefOfAppTy(g, typ_1);
      const extMemInfos = nenv.eIndexedExtensionMembers.Find(tcref);
      return SelectPropInfosFromExtMembers(infoReader, ad, optFilter, typ_1, m, extMemInfos);
    } else {
      return new List();
    }
  }, infoReader.GetEntireTypeHierachy(new AllowMultiIntfInstantiations(0), m, typ));
  const extMemsDangling = SelectPropInfosFromExtMembers(infoReader, ad, optFilter, typ, m, nenv.eUnindexedExtensionMembers);
  return append(extMemsDangling, extMemsFromHierarchy);
}
export function AllPropInfosOfTypeInScope(infoReader, nenv, optFilter, ad, findFlag, m, typ) {
  return append(IntrinsicPropInfosOfTypeInScope(infoReader, optFilter, ad, findFlag, m, typ), ExtensionPropInfosOfTypeInScope(infoReader, nenv, optFilter, ad, m, typ));
}
export function IntrinsicMethInfosOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, m, typ) {
  const g = infoReader.g;
  const amap = infoReader.amap;
  const minfos = GetIntrinsicMethInfoSetsOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, m, typ);

  const minfos_2 = function (minfos_1) {
    return ExcludeHiddenOfMethInfos(g, amap, m, minfos_1);
  }(minfos);

  return minfos_2;
}
export function SelectMethInfosFromExtMembers(infoReader, optFilter, apparentTy, m, extMemInfos) {
  const g = infoReader.g;
  const seen = create_1(null, fromEqualityComparer(ExtensionMember.Comparer(g)));
  return toList(delay(function () {
    return collect(function (emem) {
      if (addInPlace(emem, seen)) {
        if (emem.tag === 1) {
          if (optFilter != null ? getValue(optFilter) === emem.data[1].LogicalName : true) {
            if (emem.data[1].tag === 0) {
              return singleton(new MethInfo(0, [emem.data[1].data[0], apparentTy, emem.data[1].data[2], emem.data[2]]));
            } else if (emem.data[1].tag === 2) {
              return empty();
            } else {
              return singleton(MethInfo.CreateILExtensionMeth(infoReader.amap, m, apparentTy, emem.data[0], emem.data[2], emem.data[1].data[1].RawMetadata));
            }
          } else {
            return empty();
          }
        } else {
          const matchValue = emem.data[0].MemberInfo;

          if (matchValue != null) {
            const matchValue_1 = TrySelectMemberVal(g, optFilter, apparentTy, emem.data[1], getValue(matchValue), emem.data[0]);

            if (matchValue_1 != null) {
              return singleton(getValue(matchValue_1));
            } else {
              return empty();
            }
          } else {
            return empty();
          }
        }
      } else {
        return empty();
      }
    }, extMemInfos);
  }));
}
export function ExtensionMethInfosOfTypeInScope(infoReader, nenv, optFilter, m, typ) {
  const extMemsDangling = SelectMethInfosFromExtMembers(infoReader, optFilter, typ, m, nenv.eUnindexedExtensionMembers);
  const extMemsFromHierarchy = collect_1(function (typ_1) {
    const g = infoReader.g;

    if (isAppTy(g, typ_1)) {
      const tcref = tcrefOfAppTy(g, typ_1);
      const extValRefs = nenv.eIndexedExtensionMembers.Find(tcref);
      return SelectMethInfosFromExtMembers(infoReader, optFilter, typ_1, m, extValRefs);
    } else {
      return new List();
    }
  }, infoReader.GetEntireTypeHierachy(new AllowMultiIntfInstantiations(0), m, typ));
  return append(extMemsDangling, extMemsFromHierarchy);
}
export function AllMethInfosOfTypeInScope(infoReader, nenv, optFilter, ad, findFlag, m, typ) {
  return append(IntrinsicMethInfosOfType(infoReader, optFilter, ad, new AllowMultiIntfInstantiations(0), findFlag, m, typ), ExtensionMethInfosOfTypeInScope(infoReader, nenv, optFilter, m, typ));
}
export class IndeterminateType extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, IndeterminateType.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.IndeterminateType",
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
setType("Microsoft.FSharp.Compiler.NameResolution.IndeterminateType", IndeterminateType);
export class LookupKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.LookupKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["RecdField"], ["Pattern"], ["Expr"], ["Type"], ["Ctor"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.LookupKind", LookupKind);
export function TryFindUnionCaseOfType(g, typ, nm) {
  if (isAppTy(g, typ)) {
    const patternInput = destAppTy(g, typ);
    const matchValue = patternInput[0].GetUnionCaseByName(nm);

    if (matchValue != null) {
      return new UnionCaseInfo(0, [patternInput[1], patternInput[0].MakeNestedUnionCaseRef(getValue(matchValue))]);
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export function CoreDisplayName(pinfo) {
  if (pinfo.tag === 1) {
    return pinfo.data.data[1].Name;
  } else if (pinfo.data[3] != null) {
    return getValue(pinfo.data[3]).CoreDisplayName;
  } else if (pinfo.data[2] != null) {
    return getValue(pinfo.data[2]).CoreDisplayName;
  } else {
    throw new Error("unexpected (property must have either getter or setter)");
  }
}
export function DecodeFSharpEvent(pinfos, ad, g, ncenv, m) {
  const $var50 = pinfos.tail != null ? pinfos.tail.tail == null ? pinfos.head.IsFSharpEventProperty ? [0, pinfos.head] : [1] : [1] : [1];

  switch ($var50[0]) {
    case 0:
      const nm = CoreDisplayName($var50[1]);
      const minfos1 = GetImmediateIntrinsicMethInfosOfType("add_" + nm, ad, g, ncenv.amap, m, $var50[1].ApparentEnclosingType);
      const minfos2 = GetImmediateIntrinsicMethInfosOfType("remove_" + nm, ad, g, ncenv.amap, m, $var50[1].ApparentEnclosingType);
      const matchValue = [minfos1, minfos2];
      const $var51 = matchValue[0].tail != null ? matchValue[0].head.tag === 0 ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].head.tag === 0 ? matchValue[1].tail.tail == null ? [0, matchValue[0].head.data[2], matchValue[1].head.data[2]] : [1] : [1] : [1] : [1] : [1] : [1];

      switch ($var51[0]) {
        case 0:
          return new Item(8, new EventInfo(0, [g, $var50[1], $var51[1], $var51[2]]));

        case 1:
          return new Item(9, [nm, pinfos]);
      }

    case 1:
      if (pinfos.tail != null) {
        const nm_1 = CoreDisplayName(pinfos.head);
        return new Item(9, [nm_1, pinfos]);
      } else {
        return null;
      }

  }
}
export function GetRecordLabelsForType(g, nenv, typ) {
  const result = new Set();

  if (isRecdTy(g, typ)) {
    const typeName = minimalStringOfType(nenv.eDisplayEnv, typ);

    for (let forLoopVar of nenv.eFieldLabels) {
      const activePatternResult34769 = forLoopVar;

      if (exists(function (r) {
        return r.TyconRef.DisplayName === typeName;
      }, activePatternResult34769[1])) {
        addInPlace(activePatternResult34769[0], result);
      }
    }
  }

  return result;
}
export function ResolveLongIdentInTypePrim(ncenv, nenv, lookupKind, resInfo, depth, m, ad, id, rest, findFlag, typeNameResInfo, typ) {
  var psets;
  var amap;
  var msets;
  var amap_1;
  var einfo;
  const g = ncenv.g;
  const m_1 = unionRanges(m, id.idRange);
  const nm = id.idText;
  const optFilter = nm;
  let contentsSearchAccessible;
  let unionCaseSearch;
  const $var52 = lookupKind.tag === 2 ? [0] : lookupKind.tag === 1 ? [0] : [1];

  switch ($var52[0]) {
    case 0:
      unionCaseSearch = TryFindUnionCaseOfType(g, typ, nm);
      break;

    case 1:
      unionCaseSearch = null;
      break;
  }

  if (unionCaseSearch == null) {
    const isLookUpExpr = lookupKind.Equals(new LookupKind(2));
    const matchValue = TryFindIntrinsicNamedItemOfType(ncenv.InfoReader, nm, ad, findFlag, m_1, typ);
    const $var53 = matchValue != null ? getValue(matchValue).tag === 1 ? (psets = getValue(matchValue).data, isLookUpExpr) ? [0, getValue(matchValue).data] : [1] : [1] : [1];

    switch ($var53[0]) {
      case 0:
        const pinfos_1 = (amap = ncenv.amap, function (pinfos) {
          return ExcludeHiddenOfPropInfos(g, amap, m_1, pinfos);
        })($var53[1]);
        const extensionPropInfos = ExtensionPropInfosOfTypeInScope(ncenv.InfoReader, nenv, optFilter, ad, m_1, typ);
        const matchValue_1 = DecodeFSharpEvent(append(pinfos_1, extensionPropInfos), ad, g, ncenv, m_1);

        if (matchValue_1 == null) {
          contentsSearchAccessible = ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00) {
            return SR.undefinedNameFieldConstructorOrMember(arg00);
          }, id, function () {
            return NoSuggestions();
          }));
        } else {
          contentsSearchAccessible = ResultOrExceptionModule.success(ofArray([[resInfo, getValue(matchValue_1), rest]]));
        }

        break;

      case 1:
        const $var54 = matchValue != null ? getValue(matchValue).tag === 0 ? (msets = getValue(matchValue).data, isLookUpExpr) ? [0, getValue(matchValue).data] : [1] : [1] : [1];

        switch ($var54[0]) {
          case 0:
            const minfos_1 = (amap_1 = ncenv.amap, function (minfos) {
              return ExcludeHiddenOfMethInfos(g, amap_1, m_1, minfos);
            })($var54[1]);
            const extensionMethInfos = ExtensionMethInfosOfTypeInScope(ncenv.InfoReader, nenv, optFilter, m_1, typ);
            contentsSearchAccessible = ResultOrExceptionModule.success(ofArray([[resInfo, Item.MakeMethGroup(nm, append(minfos_1, extensionMethInfos)), rest]]));
            break;

          case 1:
            const $var55 = matchValue != null ? getValue(matchValue).tag === 4 ? getValue(matchValue).data.tail != null ? (() => {
              const finfo = getValue(matchValue).data.head;
              const $var59 = lookupKind.tag === 2 ? [0] : lookupKind.tag === 1 ? [0] : [1];

              switch ($var59[0]) {
                case 0:
                  return true;

                case 1:
                  return false;
              }
            })() ? [0, getValue(matchValue).data.head] : [1] : [1] : [1] : [1];

            switch ($var55[0]) {
              case 0:
                contentsSearchAccessible = ResultOrExceptionModule.success(ofArray([[resInfo, new Item(7, $var55[1]), rest]]));
                break;

              case 1:
                const $var56 = matchValue != null ? getValue(matchValue).tag === 3 ? getValue(matchValue).data.tail != null ? (einfo = getValue(matchValue).data.head, isLookUpExpr) ? [0, getValue(matchValue).data.head] : [1] : [1] : [1] : [1];

                switch ($var56[0]) {
                  case 0:
                    contentsSearchAccessible = ResultOrExceptionModule.success(ofArray([[resInfo, new Item(8, $var56[1]), rest]]));
                    break;

                  case 1:
                    const $var57 = matchValue != null ? getValue(matchValue).tag === 2 ? (() => {
                      const rfinfo = getValue(matchValue).data;
                      const $var58 = lookupKind.tag === 2 ? [0] : lookupKind.tag === 0 ? [0] : lookupKind.tag === 1 ? [0] : [1];

                      switch ($var58[0]) {
                        case 0:
                          return true;

                        case 1:
                          return false;
                      }
                    })() ? [0, getValue(matchValue).data] : [1] : [1] : [1];

                    switch ($var57[0]) {
                      case 0:
                        contentsSearchAccessible = ResultOrExceptionModule.success(ofArray([[resInfo, new Item(5, $var57[1]), rest]]));
                        break;

                      case 1:
                        const pinfos_2 = ExtensionPropInfosOfTypeInScope(ncenv.InfoReader, nenv, optFilter, ad, m_1, typ);

                        if (!(pinfos_2.tail == null) ? isLookUpExpr : false) {
                          contentsSearchAccessible = OneResult(ResultOrExceptionModule.success([resInfo, new Item(9, [nm, pinfos_2]), rest]));
                        } else {
                          const minfos_2 = ExtensionMethInfosOfTypeInScope(ncenv.InfoReader, nenv, optFilter, m_1, typ);

                          if (!(minfos_2.tail == null) ? isLookUpExpr : false) {
                            contentsSearchAccessible = ResultOrExceptionModule.success(ofArray([[resInfo, Item.MakeMethGroup(nm, minfos_2), rest]]));
                          } else if (isTyparTy(g, typ)) {
                            contentsSearchAccessible = ResultOrExceptionModule.raze(new IndeterminateType(unionRanges(m_1, id.idRange)));
                          } else {
                            contentsSearchAccessible = NoResultsOrUsefulErrors();
                          }
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
  } else {
    contentsSearchAccessible = OneResult(ResultOrExceptionModule.success([resInfo, new Item(1, [getValue(unionCaseSearch), false]), rest]));
  }

  const $var60 = contentsSearchAccessible.tag === 0 ? !(contentsSearchAccessible.data.tail == null) ? [0, contentsSearchAccessible.data] : [1] : [1];

  switch ($var60[0]) {
    case 0:
      return contentsSearchAccessible;

    case 1:
      if (contentsSearchAccessible.tag === 1) {
        return contentsSearchAccessible;
      } else {
        let nestedSearchAccessible;

        if (rest.tail != null) {
          const nestedTypes = GetNestedTypesOfType(ad, ncenv, nm, new TypeNameResolutionStaticArgsInfo(0), true, m_1, typ);
          nestedSearchAccessible = ResolveLongIdentInNestedTypes(ncenv, nenv, lookupKind, resInfo, depth + 1, id, m_1, ad, rest.head, rest.tail, findFlag, typeNameResInfo, nestedTypes);
        } else {
          const nestedTypes_1 = GetNestedTypesOfType(ad, ncenv, nm, typeNameResInfo.StaticArgsInfo, true, m_1, typ);

          if (nestedTypes_1.tail == null) {
            nestedSearchAccessible = NoResultsOrUsefulErrors();
          } else {
            const matchValue_2 = typeNameResInfo.ResolutionFlag;

            if (matchValue_2.tag === 1) {
              nestedSearchAccessible = OneSuccess([resInfo, new Item(14, [nm, nestedTypes_1]), rest]);
            } else {
              nestedSearchAccessible = MapResults(function (tupledArg) {
                return [tupledArg[0], tupledArg[1], new List()];
              }, CollectAtMostOneResult(function (typ_1) {
                return ResolveObjectConstructorPrim(ncenv, nenv.eDisplayEnv, resInfo, m_1, ad, typ_1);
              }, nestedTypes_1));
            }
          }
        }

        const $var61 = nestedSearchAccessible.tag === 0 ? !(nestedSearchAccessible.data.tail == null) ? [0, nestedSearchAccessible.data] : [1] : [1];

        switch ($var61[0]) {
          case 0:
            return nestedSearchAccessible;

          case 1:
            const suggestMembers = function () {
              const suggestions1 = map(function (p) {
                return p.PropertyName;
              }, ExtensionPropInfosOfTypeInScope(ncenv.InfoReader, nenv, null, ad, m_1, typ));
              const suggestions2 = map(function (m_2) {
                return m_2.DisplayName;
              }, ExtensionMethInfosOfTypeInScope(ncenv.InfoReader, nenv, null, m_1, typ));
              const suggestions3 = map(function (p_1) {
                return p_1.PropertyName;
              }, GetIntrinsicPropInfosOfType(ncenv.InfoReader, null, ad, new AllowMultiIntfInstantiations(1), findFlag, m_1, typ));
              const suggestions4 = map(function (m_3) {
                return m_3.DisplayName;
              }, filter(function (m_4) {
                return !m_4.IsClassConstructor ? !m_4.IsConstructor : false;
              }, GetIntrinsicMethInfosOfType(ncenv.InfoReader, null, ad, new AllowMultiIntfInstantiations(1), findFlag, m_1, typ)));
              const suggestions5 = GetRecordLabelsForType(g, nenv, typ);
              let suggestions6;
              const $var62 = lookupKind.tag === 2 ? [0] : lookupKind.tag === 1 ? [0] : [1];

              switch ($var62[0]) {
                case 0:
                  if (isAppTy(g, typ)) {
                    const patternInput = destAppTy(g, typ);
                    suggestions6 = map_1(function (uc) {
                      return uc.DisplayName;
                    }, patternInput[0].UnionCasesArray, Array);
                  } else {
                    suggestions6 = [];
                  }

                  break;

                case 1:
                  suggestions6 = [];
                  break;
              }

              return new Set(toList(delay(function () {
                return append_1(suggestions1, delay(function () {
                  return append_1(suggestions2, delay(function () {
                    return append_1(suggestions3, delay(function () {
                      return append_1(suggestions4, delay(function () {
                        return append_1(suggestions5, delay(function () {
                          return suggestions6;
                        }));
                      }));
                    }));
                  }));
                }));
              })));
            };

            return ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00_1) {
              return SR.undefinedNameFieldConstructorOrMember(arg00_1);
            }, id, suggestMembers));
        }
      }

  }
}
export function ResolveLongIdentInNestedTypes(ncenv, nenv, lookupKind, resInfo, depth, id, m, ad, id2, rest, findFlag, typeNameResInfo, typs) {
  return CollectAtMostOneResult(function (typ) {
    const resInfo_1 = isAppTy(ncenv.g, typ) ? resInfo.AddEntity([id.idRange, tcrefOfAppTy(ncenv.g, typ)]) : resInfo;
    return function (res) {
      return AtMostOneResult(m, res);
    }(ResolveLongIdentInTypePrim(ncenv, nenv, lookupKind, resInfo_1, depth, m, ad, id2, rest, findFlag, typeNameResInfo, typ));
  }, typs);
}
export function ResolveLongIdentInType(sink, ncenv, nenv, lookupKind, m, ad, id, findFlag, typeNameResInfo, typ) {
  const patternInput = ResultOrExceptionModule.ForceRaise(function (res) {
    return AtMostOneResult(m, res);
  }(ResolveLongIdentInTypePrim(ncenv, nenv, lookupKind, ResolutionInfo.Empty, 0, m, ad, id, new List(), findFlag, typeNameResInfo, typ)));
  ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(2), ad, patternInput[0], new ResultTyparChecker(0, function () {
    return CheckAllTyparsInferrable(ncenv.amap, m, patternInput[1]);
  }));
  return [patternInput[1], patternInput[2]];
}

function ResolveLongIdentInTyconRef(ncenv, nenv, lookupKind, resInfo, depth, m, ad, id, rest, typeNameResInfo, tcref) {
  var findFlag;
  const typ = FreshenTycon(ncenv, m, tcref);
  return (findFlag = new FindMemberFlag(0), function (typ_1) {
    return ResolveLongIdentInTypePrim(ncenv, nenv, lookupKind, resInfo, depth, m, ad, id, rest, findFlag, typeNameResInfo, typ_1);
  })(typ);
}

function ResolveLongIdentInTyconRefs(atMostOne, ncenv, nenv, lookupKind, depth, m, ad, id, rest, typeNameResInfo, idRange, tcrefs) {
  return CollectResults2(atMostOne, function (tupledArg) {
    const resInfo = tupledArg[0].AddEntity([idRange, tupledArg[1]]);
    return function (res) {
      return AtMostOneResult(m, res);
    }(function (tcref) {
      return ResolveLongIdentInTyconRef(ncenv, nenv, lookupKind, resInfo, depth, m, ad, id, rest, typeNameResInfo, tcref);
    }(tupledArg[1]));
  })(tcrefs);
}

function _AccessibleEntityRef___(amap, m, ad, modref, mspec) {
  const eref = modref.NestedTyconRef(mspec);

  if (IsEntityAccessible(amap, m, ad, eref)) {
    return eref;
  } else {
    return null;
  }
}

export { _AccessibleEntityRef___ as $7C$AccessibleEntityRef$7C$_$7C$ };
export function ResolveExprLongIdentInModuleOrNamespace(ncenv, nenv, typeNameResInfo, ad, resInfo, depth, m, modref, mty, id, rest) {
  var res;
  const m_1 = unionRanges(m, id.idRange);
  const matchValue = tryFind(id.idText, mty.AllValsByLogicalName);
  const $var63 = matchValue != null ? IsValAccessible(ad, mkNestedValRef(modref, getValue(matchValue))) ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var63[0]) {
    case 0:
      return ResultOrExceptionModule.success([resInfo, new Item(0, mkNestedValRef(modref, $var63[1])), rest]);

    case 1:
      const matchValue_1 = tryFind(id.idText, mty.ExceptionDefinitionsByDemangledName);
      const $var64 = matchValue_1 != null ? IsTyconReprAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(getValue(matchValue_1))) ? [0, getValue(matchValue_1)] : [1] : [1];

      switch ($var64[0]) {
        case 0:
          return ResultOrExceptionModule.success([resInfo, new Item(4, modref.NestedTyconRef($var64[1])), rest]);

        case 1:
          let patternInput;
          const matchValue_2 = TryFindTypeWithUnionCase(modref, id);
          const $var65 = matchValue_2 != null ? IsTyconReprAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(getValue(matchValue_2))) ? [0, getValue(matchValue_2)] : [1] : [1];

          switch ($var65[0]) {
            case 0:
              const ucref = mkUnionCaseRef(modref.NestedTyconRef($var65[1]), id.idText);
              const ucinfo = FreshenUnionCaseRef(ncenv, m_1, ucref);
              const hasRequireQualifiedAccessAttribute = HasFSharpAttribute(ncenv.g, ncenv.g.attrib_RequireQualifiedAccessAttribute, $var65[1].Attribs);
              patternInput = [ResultOrExceptionModule.success(ofArray([[resInfo, new Item(1, [ucinfo, hasRequireQualifiedAccessAttribute]), rest]])), hasRequireQualifiedAccessAttribute];
              break;

            case 1:
              patternInput = [NoResultsOrUsefulErrors(), false];
              break;
          }

          const $var66 = patternInput[0].tag === 0 ? patternInput[0].data.tail != null ? (res = patternInput[0].data.head, !patternInput[1]) ? [0, patternInput[0].data.head] : [1] : [1] : [1];

          switch ($var66[0]) {
            case 0:
              return ResultOrExceptionModule.success($var66[1]);

            case 1:
              let tyconSearch;
              const tcrefs = LookupTypeNameInEntityMaybeHaveArity(ncenv.amap, id.idRange, ad, id.idText, rest.tail == null ? typeNameResInfo.StaticArgsInfo : new TypeNameResolutionStaticArgsInfo(0), modref);

              if (tcrefs.tail == null) {
                tyconSearch = NoResultsOrUsefulErrors();
              } else {
                const tcrefs_1 = map(function (tcref) {
                  return [resInfo, tcref];
                }, tcrefs);

                if (rest.tail != null) {
                  const tcrefs_2 = CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs_1, new TypeNameResolutionInfo(0, [new TypeNameResolutionFlag(1), new TypeNameResolutionStaticArgsInfo(0)]), new PermitDirectReferenceToGeneratedType(1), unionRanges(m_1, id.idRange));
                  tyconSearch = ResolveLongIdentInTyconRefs(new ResultCollectionSettings(1), ncenv, nenv, new LookupKind(2), depth + 1, m_1, ad, rest.head, rest.tail, typeNameResInfo, id.idRange, tcrefs_2);
                } else {
                  const tcrefs_3 = CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs_1, typeNameResInfo, new PermitDirectReferenceToGeneratedType(1), unionRanges(m_1, id.idRange));
                  const matchValue_3 = typeNameResInfo.ResolutionFlag;

                  if (matchValue_3.tag === 0) {
                    tyconSearch = MapResults(function (tupledArg) {
                      return [tupledArg[0], tupledArg[1], new List()];
                    }, CollectAtMostOneResult(function (tupledArg_1) {
                      return ResolveObjectConstructorPrim(ncenv, nenv.eDisplayEnv, tupledArg_1[0], id.idRange, ad, tupledArg_1[1]);
                    }, map(function (tupledArg_2) {
                      return [tupledArg_2[0], FreshenTycon(ncenv, m_1, tupledArg_2[1])];
                    }, tcrefs_3)));
                  } else {
                    tyconSearch = ResultOrExceptionModule.success(toList(delay(function () {
                      return collect(function (matchValue_4) {
                        const typ = FreshenTycon(ncenv, m_1, matchValue_4[1]);
                        const item = [matchValue_4[0], new Item(14, [id.idText, ofArray([typ])]), new List()];
                        return singleton(item);
                      }, tcrefs_3);
                    })));
                  }
                }
              }

              const $var67 = tyconSearch.tag === 0 ? tyconSearch.data.tail != null ? [0, tyconSearch.data.head] : [1] : [1];

              switch ($var67[0]) {
                case 0:
                  return ResultOrExceptionModule.success($var67[1]);

                case 1:
                  let moduleSearch;

                  if (rest.tail != null) {
                    const matchValue_5 = tryFind(id.idText, mty.ModulesAndNamespacesByDemangledName);
                    let $var68;

                    if (matchValue_5 != null) {
                      const activePatternResult34867 = _AccessibleEntityRef___(ncenv.amap, m_1, ad, modref, getValue(matchValue_5));

                      if (activePatternResult34867 != null) {
                        $var68 = [0, getValue(activePatternResult34867)];
                      } else {
                        $var68 = [1];
                      }
                    } else {
                      $var68 = [1];
                    }

                    switch ($var68[0]) {
                      case 0:
                        const resInfo_1 = resInfo.AddEntity([id.idRange, $var68[1]]);
                        moduleSearch = OneResult(ResolveExprLongIdentInModuleOrNamespace(ncenv, nenv, typeNameResInfo, ad, resInfo_1, depth + 1, m_1, $var68[1], $var68[1].ModuleOrNamespaceType, rest.head, rest.tail));
                        break;

                      case 1:
                        moduleSearch = NoResultsOrUsefulErrors();
                        break;
                    }
                  } else {
                    moduleSearch = NoResultsOrUsefulErrors();
                  }

                  const matchValue_6 = op_PlusPlusPlus(op_PlusPlusPlus(tyconSearch, moduleSearch), patternInput[0]);
                  const $var69 = matchValue_6.tag === 0 ? matchValue_6.data.tail == null ? [0] : [1, matchValue_6] : [1, matchValue_6];

                  switch ($var69[0]) {
                    case 0:
                      const suggestPossibleTypesAndNames = function () {
                        const types = map_2(function (e) {
                          return e.DisplayName;
                        }, filter_1(function (e_1) {
                          return IsEntityAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(e_1));
                        }, modref.ModuleOrNamespaceType.AllEntities));
                        const submodules = map_2(function (e_2) {
                          return e_2[1].DisplayName;
                        }, filter_1(function (kv) {
                          return IsEntityAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(kv[1]));
                        }, mty.ModulesAndNamespacesByDemangledName));
                        const unions = map_2(function (uc) {
                          return uc.DisplayName;
                        }, collect(function (tycon) {
                          const hasRequireQualifiedAccessAttribute_1 = HasFSharpAttribute(ncenv.g, ncenv.g.attrib_RequireQualifiedAccessAttribute, tycon.Attribs);

                          if (hasRequireQualifiedAccessAttribute_1) {
                            return [];
                          } else {
                            return tycon.UnionCasesArray;
                          }
                        }, modref.ModuleOrNamespaceType.AllEntities));
                        const vals = map_2(function (e_3) {
                          return e_3[1].DisplayName;
                        }, filter_1(function (e_4) {
                          return IsValAccessible(ad, mkNestedValRef(modref, e_4[1]));
                        }, modref.ModuleOrNamespaceType.AllValsByLogicalName));
                        const exns = map_2(function (e_5) {
                          return e_5[1].DisplayName;
                        }, filter_1(function (e_6) {
                          return IsTyconReprAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(e_6[1]));
                        }, modref.ModuleOrNamespaceType.ExceptionDefinitionsByDemangledName));
                        return new Set(toList(delay(function () {
                          return append_1(types, delay(function () {
                            return append_1(submodules, delay(function () {
                              return append_1(unions, delay(function () {
                                return append_1(vals, delay(function () {
                                  return exns;
                                }));
                              }));
                            }));
                          }));
                        })));
                      };

                      return ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00) {
                        return SR.undefinedNameValueConstructorNamespaceOrType(arg00);
                      }, id, suggestPossibleTypesAndNames));

                    case 1:
                      return AtMostOneResult(id.idRange, $var69[1]);
                  }

              }

          }

      }

  }
}
export function ChooseTyconRefInExpr(ncenv, m, ad, nenv, id, typeNameResInfo, resInfo, tcrefs) {
  const tcrefs_1 = map(function (tcref) {
    return [resInfo, tcref];
  }, tcrefs);
  const tcrefs_2 = CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs_1, typeNameResInfo, new PermitDirectReferenceToGeneratedType(1), m);
  const matchValue = typeNameResInfo.ResolutionFlag;

  if (matchValue.tag === 1) {
    const typs = map(function (tupledArg) {
      return [tupledArg[0], FreshenTycon(ncenv, m, tupledArg[1])];
    }, tcrefs_2);
    return ResultOrExceptionModule.success(map(function (tupledArg_1) {
      return [tupledArg_1[0], new Item(14, [id.idText, ofArray([tupledArg_1[1]])]), new List()];
    }, typs));
  } else {
    const typs_1 = map(function (tupledArg_2) {
      return [tupledArg_2[0], FreshenTycon(ncenv, m, tupledArg_2[1])];
    }, tcrefs_2);
    return MapResults(function (tupledArg_3) {
      return [tupledArg_3[0], tupledArg_3[1], new List()];
    }, CollectAtMostOneResult(function (tupledArg_4) {
      return ResolveObjectConstructorPrim(ncenv, nenv.eDisplayEnv, tupledArg_4[0], id.idRange, ad, tupledArg_4[1]);
    }, typs_1));
  }
}
export function ResolveExprLongIdentPrim(sink, ncenv, first, fullyQualified, m, ad, nenv, typeNameResInfo, id, rest, isOpenDecl) {
  var suggestionsF;
  var id1;

  ResolveExprLongIdentPrim: while (true) {
    const resInfo = ResolutionInfo.Empty;

    if (first ? id.idText === "`global`" : false) {
      if (rest.tail != null) {
        if (rest.tail.tail == null) {
          sink = sink;
          ncenv = ncenv;
          first = false;
          fullyQualified = fullyQualified;
          m = m;
          ad = ad;
          nenv = nenv;
          typeNameResInfo = typeNameResInfo;
          id = rest.head;
          rest = new List();
          isOpenDecl = isOpenDecl;
          continue ResolveExprLongIdentPrim;
        } else {
          sink = sink;
          ncenv = ncenv;
          first = false;
          fullyQualified = new FullyQualifiedFlag(0);
          m = m;
          ad = ad;
          nenv = nenv;
          typeNameResInfo = typeNameResInfo;
          id = rest.head;
          rest = rest.tail;
          isOpenDecl = isOpenDecl;
          continue ResolveExprLongIdentPrim;
        }
      } else {
        return error_2(new _Error(SR.nrGlobalUsedOnlyAsFirstName(), id.idRange));
      }
    } else if (rest.tail == null ? !fullyQualified.Equals(new FullyQualifiedFlag(0)) : false) {
      const typeError = {
        contents: null
      };
      let envSearch;
      const matchValue = tryFind(id.idText, nenv.eUnqualifiedItems);

      if (matchValue == null) {
        envSearch = null;
      } else if (getValue(matchValue).tag === 22) {
        const tcrefs = filter(function (tcref) {
          return typeNameResInfo.StaticArgsInfo.HasNoStaticArgsInfo ? true : typeNameResInfo.StaticArgsInfo.NumStaticArgs === tcref.Typars(m).length;
        }, getValue(matchValue).data);
        const search = ChooseTyconRefInExpr(ncenv, m, ad, nenv, id, typeNameResInfo, resInfo, tcrefs);
        const matchValue_1 = AtMostOneResult(m, search);

        if (matchValue_1.tag === 1) {
          typeError.contents = matchValue_1.data;
          envSearch = null;
        } else {
          const patternInput = ResultOrExceptionModule.ForceRaise(matchValue_1);
          ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(1), ad, patternInput[0], new ResultTyparChecker(0, function () {
            return CheckAllTyparsInferrable(ncenv.amap, m, patternInput[1]);
          }));
          envSearch = [patternInput[1], patternInput[2]];
        }
      } else {
        envSearch = [FreshenUnqualifiedItem(ncenv, m, getValue(matchValue)), new List()];
      }

      if (envSearch == null) {
        let innerSearch;
        let ctorSearch;
        const tcrefs_1 = LookupTypeNameInEnvMaybeHaveArity(fullyQualified, id.idText, typeNameResInfo, nenv);
        ctorSearch = ChooseTyconRefInExpr(ncenv, m, ad, nenv, id, typeNameResInfo, resInfo, tcrefs_1);
        const $var70 = ctorSearch.tag === 0 ? !(ctorSearch.data.tail == null) ? [0, ctorSearch.data] : [1] : [1];

        switch ($var70[0]) {
          case 0:
            innerSearch = ctorSearch;
            break;

          case 1:
            const implicitOpSearch = IsMangledOpName(id.idText) ? ResultOrExceptionModule.success(ofArray([[resInfo, new Item(19, [id, {
              contents: null
            }]), new List()]])) : NoResultsOrUsefulErrors();
            innerSearch = op_PlusPlusPlus(ctorSearch, implicitOpSearch);
            break;
        }

        let patternInput_1;
        const matchValue_2 = AtMostOneResult(m, innerSearch);

        if (matchValue_2.tag === 0) {
          patternInput_1 = ResultOrExceptionModule.ForceRaise(matchValue_2);
        } else {
          let failingCase;
          const matchValue_3 = typeError.contents;

          if (matchValue_3 != null) {
            failingCase = ResultOrExceptionModule.raze(getValue(matchValue_3));
          } else {
            const suggestNamesAndTypes = function () {
              const suggestedNames = map_2(function (e) {
                return e[1].DisplayName;
              }, nenv.eUnqualifiedItems);
              const suggestedTypes = map_2(function (e_1) {
                return e_1[1].DisplayName;
              }, filter_1(function (e_2) {
                return IsEntityAccessible(ncenv.amap, m, ad, e_2[1]);
              }, nenv.TyconsByDemangledNameAndArity(fullyQualified)));
              const suggestedModulesAndNamespaces = collect(function (e_3) {
                return ofArray([e_3.DisplayName, e_3.DemangledModuleOrNamespaceName]);
              }, filter_1(function (modref) {
                return IsEntityAccessible(ncenv.amap, m, ad, modref);
              }, collect(function (kv) {
                return kv[1];
              }, nenv.ModulesAndNamespaces(fullyQualified))));
              const unions = map_2(function (t) {
                return t.DisplayName + "." + id.idText;
              }, choose_1(function (e_4) {
                const hasRequireQualifiedAccessAttribute = HasFSharpAttribute(ncenv.g, ncenv.g.attrib_RequireQualifiedAccessAttribute, e_4[1].Attribs);

                if (!hasRequireQualifiedAccessAttribute) {
                  return null;
                } else if (e_4[1].IsUnionTycon ? e_4[1].UnionCasesArray.some(function (c) {
                  return c.DisplayName === id.idText;
                }) : false) {
                  return e_4[1];
                } else {
                  return null;
                }
              }, nenv.eTyconsByDemangledNameAndArity));
              return new Set(toList(delay(function () {
                return append_1(suggestedNames, delay(function () {
                  return append_1(suggestedTypes, delay(function () {
                    return append_1(suggestedModulesAndNamespaces, delay(function () {
                      return unions;
                    }));
                  }));
                }));
              })));
            };

            failingCase = ResultOrExceptionModule.raze(new UndefinedName(0, function (arg00) {
              return SR.undefinedNameValueOfConstructor(arg00);
            }, id, suggestNamesAndTypes));
          }

          patternInput_1 = ResultOrExceptionModule.ForceRaise(failingCase);
        }

        ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(1), ad, patternInput_1[0], new ResultTyparChecker(0, function () {
          return CheckAllTyparsInferrable(ncenv.amap, m, patternInput_1[1]);
        }));
        return [patternInput_1[1], patternInput_1[2]];
      } else {
        return getValue(envSearch);
      }
    } else {
      const m_1 = unionRanges(m, id.idRange);

      const ValIsInEnv = function (nm) {
        if (fullyQualified.tag === 0) {
          return false;
        } else {
          const matchValue_4 = tryFind(nm, nenv.eUnqualifiedItems);
          const $var71 = matchValue_4 != null ? getValue(matchValue_4).tag === 0 ? [0] : [1] : [1];

          switch ($var71[0]) {
            case 0:
              return true;

            case 1:
              return false;
          }
        }
      };

      if (ValIsInEnv(id.idText)) {
        return [nenv.eUnqualifiedItems.get(id.idText), rest];
      } else {
        const moduleSearch = function (ad_1) {
          return ResolveLongIndentAsModuleOrNamespaceThen(sink, new ResultCollectionSettings(1), ncenv.amap, m_1, fullyQualified, nenv, ad_1, id, rest, isOpenDecl, function (resInfo_1, depth, m_2, modref_1, mty, id_1, rest_1) {
            return ResolveExprLongIdentInModuleOrNamespace(ncenv, nenv, typeNameResInfo, ad_1, resInfo_1, depth, m_2, modref_1, mty, id_1, rest_1);
          });
        };

        const tyconSearch = function (ad_2) {
          const tcrefs_2 = LookupTypeNameInEnvNoArity(fullyQualified, id.idText, nenv);

          if (tcrefs_2.tail == null) {
            return NoResultsOrUsefulErrors();
          } else if (rest.tail != null) {
            const tcrefs_3 = map(function (tcref_1) {
              return [resInfo, tcref_1];
            }, tcrefs_2);
            const tcrefs_4 = CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs_3, TypeNameResolutionInfo.ResolveToTypeRefs(new TypeNameResolutionStaticArgsInfo(0)), new PermitDirectReferenceToGeneratedType(1), unionRanges(m_1, id.idRange));
            return ResolveLongIdentInTyconRefs(new ResultCollectionSettings(1), ncenv, nenv, new LookupKind(2), 1, m_1, ad_2, rest.head, rest.tail, typeNameResInfo, id.idRange, tcrefs_4);
          } else {
            return NoResultsOrUsefulErrors();
          }
        };

        let search_1;
        const moduleSearch_1 = moduleSearch(ad);
        const $var72 = moduleSearch_1.tag === 0 ? !(moduleSearch_1.data.tail == null) ? [0, moduleSearch_1.data] : [1] : [1];

        switch ($var72[0]) {
          case 0:
            search_1 = moduleSearch_1;
            break;

          case 1:
            const tyconSearch_1 = tyconSearch(ad);
            const $var73 = tyconSearch_1.tag === 0 ? !(tyconSearch_1.data.tail == null) ? [0, tyconSearch_1.data] : [1] : [1];

            switch ($var73[0]) {
              case 0:
                search_1 = tyconSearch_1;
                break;

              case 1:
                let envSearch_1;

                if (fullyQualified.tag === 1) {
                  const matchValue_5 = tryFind(id.idText, nenv.eUnqualifiedItems);
                  const $var74 = matchValue_5 == null ? [0] : getValue(matchValue_5).tag === 22 ? [0] : [1, getValue(matchValue_5)];

                  switch ($var74[0]) {
                    case 0:
                      envSearch_1 = NoResultsOrUsefulErrors();
                      break;

                    case 1:
                      envSearch_1 = OneSuccess([resInfo, FreshenUnqualifiedItem(ncenv, m_1, $var74[1]), rest]);
                      break;
                  }
                } else {
                  envSearch_1 = NoResultsOrUsefulErrors();
                }

                search_1 = op_PlusPlusPlus(op_PlusPlusPlus(moduleSearch_1, tyconSearch_1), envSearch_1);
                break;
            }

            break;
        }

        let patternInput_2;
        const matchValue_6 = AtMostOneResult(m_1, search_1);

        if (matchValue_6.tag === 0) {
          patternInput_2 = ResultOrExceptionModule.ForceRaise(matchValue_6);
        } else {
          let innerSearch_1;
          const moduleSearch_2 = moduleSearch(new AccessorDomain(2));
          const $var75 = moduleSearch_2.tag === 0 ? !(moduleSearch_2.data.tail == null) ? [0, moduleSearch_2.data] : [1] : [1];

          switch ($var75[0]) {
            case 0:
              innerSearch_1 = moduleSearch_2;
              break;

            case 1:
              const tyconSearch_2 = tyconSearch(new AccessorDomain(2));
              const $var76 = tyconSearch_2.tag === 0 ? !(tyconSearch_2.data.tail == null) ? [0, tyconSearch_2.data] : [1] : [1];

              switch ($var76[0]) {
                case 0:
                  innerSearch_1 = tyconSearch_2;
                  break;

                case 1:
                  innerSearch_1 = op_PlusPlusPlus(op_PlusPlusPlus(search_1, moduleSearch_2), tyconSearch_2);
                  break;
              }

              break;
          }

          const suggestEverythingInScope = function () {
            return new Set(delay(function () {
              return append_1(collect(function (e_5) {
                return ofArray([e_5.DisplayName, e_5.DemangledModuleOrNamespaceName]);
              }, filter_1(function (modref_2) {
                return IsEntityAccessible(ncenv.amap, m_1, ad, modref_2);
              }, collect(function (kv_1) {
                return kv_1[1];
              }, nenv.ModulesAndNamespaces(fullyQualified)))), delay(function () {
                return append_1(map_2(function (e_6) {
                  return e_6[1].DisplayName;
                }, filter_1(function (e_7) {
                  return IsEntityAccessible(ncenv.amap, m_1, ad, e_7[1]);
                }, nenv.TyconsByDemangledNameAndArity(fullyQualified))), delay(function () {
                  return map_2(function (e_8) {
                    return e_8[1].DisplayName;
                  }, nenv.eUnqualifiedItems);
                }));
              }));
            }));
          };

          const $var77 = innerSearch_1.tag === 1 ? innerSearch_1.data instanceof UndefinedName ? innerSearch_1.data.Data0 === 0 ? (suggestionsF = innerSearch_1.data.Data3, id1 = innerSearch_1.data.Data2, equals(id.idRange, id1.idRange)) ? [0, innerSearch_1.data.Data2, innerSearch_1.data.Data3] : [1] : [1] : [1] : [1];

          switch ($var77[0]) {
            case 0:
              const mergeSuggestions = function () {
                const res = suggestEverythingInScope();
                unionInPlace(res, $var77[2]());
                return res;
              };

              const failingCase_1 = ResultOrExceptionModule.raze(new UndefinedName(0, function (arg00_1) {
                return SR.undefinedNameValueNamespaceTypeOrModule(arg00_1);
              }, id, mergeSuggestions));
              patternInput_2 = ResultOrExceptionModule.ForceRaise(failingCase_1);
              break;

            case 1:
              if (innerSearch_1.tag === 0) {
                if (innerSearch_1.data.tail == null) {
                  const failingCase_2 = ResultOrExceptionModule.raze(new UndefinedName(0, function (arg00_2) {
                    return SR.undefinedNameValueNamespaceTypeOrModule(arg00_2);
                  }, id, suggestEverythingInScope));
                  patternInput_2 = ResultOrExceptionModule.ForceRaise(failingCase_2);
                } else {
                  patternInput_2 = ResultOrExceptionModule.ForceRaise(new ResultOrException(0, innerSearch_1.data.head));
                }
              } else {
                patternInput_2 = ResultOrExceptionModule.ForceRaise(new ResultOrException(1, innerSearch_1.data));
              }

              break;
          }
        }

        ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(1), ad, patternInput_2[0], new ResultTyparChecker(0, function () {
          return CheckAllTyparsInferrable(ncenv.amap, m_1, patternInput_2[1]);
        }));
        return [patternInput_2[1], patternInput_2[2]];
      }
    }
  }
}
export function ResolveExprLongIdent(sink, ncenv, m, ad, nenv, typeNameResInfo, lid) {
  if (lid.tail != null) {
    return ResolveExprLongIdentPrim(sink, ncenv, true, new FullyQualifiedFlag(1), m, ad, nenv, typeNameResInfo, lid.head, lid.tail, false);
  } else {
    return error_2(new _Error(SR.nrInvalidExpression(textOfLid(lid)), m));
  }
}
export function ResolvePatternLongIdentInModuleOrNamespace(ncenv, nenv, numTyArgsOpt, ad, resInfo, depth, m, modref, mty, id, rest) {
  var vref;
  const m_1 = unionRanges(m, id.idRange);
  const matchValue = TryFindTypeWithUnionCase(modref, id);
  const $var78 = matchValue != null ? IsTyconReprAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(getValue(matchValue))) ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var78[0]) {
    case 0:
      const tcref = modref.NestedTyconRef($var78[1]);
      const ucref = mkUnionCaseRef(tcref, id.idText);
      const showDeprecated = HasFSharpAttribute(ncenv.g, ncenv.g.attrib_RequireQualifiedAccessAttribute, $var78[1].Attribs);
      const ucinfo = FreshenUnionCaseRef(ncenv, m_1, ucref);
      return ResultOrExceptionModule.success([resInfo, new Item(1, [ucinfo, showDeprecated]), rest]);

    case 1:
      const matchValue_1 = tryFind(id.idText, mty.ExceptionDefinitionsByDemangledName);
      const $var79 = matchValue_1 != null ? IsEntityAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(getValue(matchValue_1))) ? [0, getValue(matchValue_1)] : [1] : [1];

      switch ($var79[0]) {
        case 0:
          return ResultOrExceptionModule.success([resInfo, new Item(4, modref.NestedTyconRef($var79[1])), rest]);

        case 1:
          const matchValue_2 = tryFind(id.idText, ActivePatternElemsOfModuleOrNamespace(modref));
          const $var80 = matchValue_2 != null ? (vref = getValue(matchValue_2).data[1], IsValAccessible(ad, vref)) ? [0, getValue(matchValue_2), getValue(matchValue_2).data[1]] : [1] : [1];

          switch ($var80[0]) {
            case 0:
              return ResultOrExceptionModule.success([resInfo, new Item(3, $var80[1]), rest]);

            case 1:
              const matchValue_3 = tryFind(id.idText, mty.AllValsByLogicalName);
              const $var81 = matchValue_3 != null ? IsValAccessible(ad, mkNestedValRef(modref, getValue(matchValue_3))) ? [0, getValue(matchValue_3)] : [1] : [1];

              switch ($var81[0]) {
                case 0:
                  return ResultOrExceptionModule.success([resInfo, new Item(0, mkNestedValRef(modref, $var81[1])), rest]);

                case 1:
                  const tcrefs = new Lazy(function () {
                    return map(function (tcref_1) {
                      return [resInfo, tcref_1];
                    }, LookupTypeNameInEntityMaybeHaveArity(ncenv.amap, id.idRange, ad, id.idText, new TypeNameResolutionStaticArgsInfo(0), modref));
                  });
                  let tyconSearch;

                  if (rest.tail != null) {
                    const tcrefs_1 = tcrefs.value;
                    tyconSearch = ResolveLongIdentInTyconRefs(new ResultCollectionSettings(1), ncenv, nenv, new LookupKind(1), depth + 1, m_1, ad, rest.head, rest.tail, numTyArgsOpt, id.idRange, tcrefs_1);
                  } else {
                    tyconSearch = NoResultsOrUsefulErrors();
                  }

                  const $var82 = tyconSearch.tag === 0 ? tyconSearch.data.tail != null ? [0, tyconSearch.data.head] : [1] : [1];

                  switch ($var82[0]) {
                    case 0:
                      return ResultOrExceptionModule.success($var82[1]);

                    case 1:
                      const ctorSearch = rest.tail == null ? MapResults(function (tupledArg) {
                        return [tupledArg[0], tupledArg[1], new List()];
                      }, CollectAtMostOneResult(function (tupledArg_1) {
                        return ResolveObjectConstructorPrim(ncenv, nenv.eDisplayEnv, tupledArg_1[0], id.idRange, ad, tupledArg_1[1]);
                      }, map(function (tupledArg_2) {
                        return [tupledArg_2[0], FreshenTycon(ncenv, m_1, tupledArg_2[1])];
                      }, tcrefs.value))) : NoResultsOrUsefulErrors();
                      const $var83 = ctorSearch.tag === 0 ? ctorSearch.data.tail != null ? [0, ctorSearch.data.head] : [1] : [1];

                      switch ($var83[0]) {
                        case 0:
                          return ResultOrExceptionModule.success($var83[1]);

                        case 1:
                          let moduleSearch;

                          if (rest.tail == null) {
                            moduleSearch = NoResultsOrUsefulErrors();
                          } else {
                            const matchValue_4 = tryFind(id.idText, mty.ModulesAndNamespacesByDemangledName);
                            let $var84;

                            if (matchValue_4 != null) {
                              const activePatternResult34967 = _AccessibleEntityRef___(ncenv.amap, m_1, ad, modref, getValue(matchValue_4));

                              if (activePatternResult34967 != null) {
                                $var84 = [0, getValue(activePatternResult34967)];
                              } else {
                                $var84 = [1];
                              }
                            } else {
                              $var84 = [1];
                            }

                            switch ($var84[0]) {
                              case 0:
                                const resInfo_1 = resInfo.AddEntity([id.idRange, $var84[1]]);
                                moduleSearch = OneResult(ResolvePatternLongIdentInModuleOrNamespace(ncenv, nenv, numTyArgsOpt, ad, resInfo_1, depth + 1, m_1, $var84[1], $var84[1].ModuleOrNamespaceType, rest.head, rest.tail));
                                break;

                              case 1:
                                moduleSearch = NoResultsOrUsefulErrors();
                                break;
                            }
                          }

                          const matchValue_5 = op_PlusPlusPlus(op_PlusPlusPlus(tyconSearch, ctorSearch), moduleSearch);
                          const $var85 = matchValue_5.tag === 0 ? matchValue_5.data.tail == null ? [0] : [1, matchValue_5] : [1, matchValue_5];

                          switch ($var85[0]) {
                            case 0:
                              const suggestPossibleTypes = function () {
                                const submodules = collect(function (e) {
                                  return ofArray([e[1].DisplayName, e[1].DemangledModuleOrNamespaceName]);
                                }, filter_1(function (kv) {
                                  return IsEntityAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(kv[1]));
                                }, mty.ModulesAndNamespacesByDemangledName));
                                const suggestedTypes = map_2(function (e_1) {
                                  return e_1[1].DisplayName;
                                }, filter_1(function (e_2) {
                                  return IsEntityAccessible(ncenv.amap, m_1, ad, e_2[1]);
                                }, nenv.TyconsByDemangledNameAndArity(new FullyQualifiedFlag(1))));
                                return new Set(toList(delay(function () {
                                  return append_1(submodules, delay(function () {
                                    return suggestedTypes;
                                  }));
                                })));
                              };

                              return ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00) {
                                return SR.undefinedNameConstructorModuleOrNamespace(arg00);
                              }, id, suggestPossibleTypes));

                            case 1:
                              return AtMostOneResult(id.idRange, $var85[1]);
                          }

                      }

                  }

              }

          }

      }

  }
}
export class UpperCaseIdentifierInPattern extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, UpperCaseIdentifierInPattern.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.UpperCaseIdentifierInPattern",
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
setType("Microsoft.FSharp.Compiler.NameResolution.UpperCaseIdentifierInPattern", UpperCaseIdentifierInPattern);
export class WarnOnUpperFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.WarnOnUpperFlag",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["WarnOnUpperCase"], ["AllIdsOK"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.WarnOnUpperFlag", WarnOnUpperFlag);
export function ResolvePatternLongIdentPrim(sink, ncenv, fullyQualified, warnOnUpper, newDef, m, ad, nenv, numTyArgsOpt, id, rest) {
  ResolvePatternLongIdentPrim: while (true) {
    if (id.idText === "`global`") {
      if (rest.tail != null) {
        sink = sink;
        ncenv = ncenv;
        fullyQualified = new FullyQualifiedFlag(0);
        warnOnUpper = warnOnUpper;
        newDef = newDef;
        m = m;
        ad = ad;
        nenv = nenv;
        numTyArgsOpt = numTyArgsOpt;
        id = rest.head;
        rest = rest.tail;
        continue ResolvePatternLongIdentPrim;
      } else {
        return error_2(new _Error(SR.nrGlobalUsedOnlyAsFirstName(), id.idRange));
      }
    } else if (rest.tail == null ? !fullyQualified.Equals(new FullyQualifiedFlag(0)) : false) {
      const matchValue = tryFind(id.idText, nenv.ePatItems);
      const $var86 = matchValue != null ? !newDef ? [0, getValue(matchValue)] : [1] : [1];

      switch ($var86[0]) {
        case 0:
          return FreshenUnqualifiedItem(ncenv, m, $var86[1]);

        case 1:
          if (((!newDef ? warnOnUpper.Equals(new WarnOnUpperFlag(0)) : false) ? id.idText.length >= 3 : false) ? System.Char.ToLowerInvariant(id.idText[0]) !== id.idText[0] : false) {
            warning(new UpperCaseIdentifierInPattern(m));
          }

          return new Item(6, id);
      }
    } else {
      const moduleSearch = function (ad_1) {
        return ResolveLongIndentAsModuleOrNamespaceThen(sink, new ResultCollectionSettings(1), ncenv.amap, m, fullyQualified, nenv, ad_1, id, rest, false, function (resInfo, depth, m_1, modref, mty, id_1, rest_1) {
          return ResolvePatternLongIdentInModuleOrNamespace(ncenv, nenv, numTyArgsOpt, ad_1, resInfo, depth, m_1, modref, mty, id_1, rest_1);
        });
      };

      const tyconSearch = function (ad_2) {
        if (rest.tail != null) {
          const tcrefs = LookupTypeNameInEnvNoArity(fullyQualified, id.idText, nenv);

          if (tcrefs.tail == null) {
            return NoResultsOrUsefulErrors();
          } else {
            const tcrefs_1 = map(function (tcref) {
              return [ResolutionInfo.Empty, tcref];
            }, tcrefs);
            return ResolveLongIdentInTyconRefs(new ResultCollectionSettings(1), ncenv, nenv, new LookupKind(1), 1, id.idRange, ad_2, rest.head, rest.tail, numTyArgsOpt, id.idRange, tcrefs_1);
          }
        } else {
          return NoResultsOrUsefulErrors();
        }
      };

      let patternInput;
      const tyconResult = tyconSearch(ad);
      const $var87 = tyconResult.tag === 0 ? tyconResult.data.tail != null ? [0, tyconResult.data.head] : [1] : [1];

      switch ($var87[0]) {
        case 0:
          patternInput = $var87[1];
          break;

        case 1:
          const moduleResult = moduleSearch(ad);
          const $var88 = moduleResult.tag === 0 ? moduleResult.data.tail != null ? [0, moduleResult.data.head] : [1] : [1];

          switch ($var88[0]) {
            case 0:
              patternInput = $var88[1];
              break;

            case 1:
              const matchValue_1 = AtMostOneResult(m, op_PlusPlusPlus(tyconResult, moduleResult));

              if (matchValue_1.tag === 0) {
                patternInput = ResultOrExceptionModule.ForceRaise(matchValue_1);
              } else {
                const tyconResult_1 = tyconSearch(new AccessorDomain(2));
                const $var89 = tyconResult_1.tag === 0 ? tyconResult_1.data.tail != null ? [0, tyconResult_1.data.head] : [1] : [1];

                switch ($var89[0]) {
                  case 0:
                    patternInput = $var89[1];
                    break;

                  case 1:
                    patternInput = ResultOrExceptionModule.ForceRaise(AtMostOneResult(m, op_PlusPlusPlus(tyconResult_1, moduleSearch(new AccessorDomain(2)))));
                    break;
                }
              }

              break;
          }

          break;
      }

      ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(1), ad, patternInput[0], new ResultTyparChecker(0, function () {
        return true;
      }));

      if (patternInput[2].tail != null) {
        return error_2(new _Error(SR.nrIsNotConstructorOrLiteral(), patternInput[2].head.idRange));
      } else {
        return patternInput[1];
      }
    }
  }
}
export function ResolvePatternLongIdent(sink, ncenv, warnOnUpper, newDef, m, ad, nenv, numTyArgsOpt, lid) {
  if (lid.tail != null) {
    return ResolvePatternLongIdentPrim(sink, ncenv, new FullyQualifiedFlag(1), warnOnUpper, newDef, m, ad, nenv, numTyArgsOpt, lid.head, lid.tail);
  } else {
    return error_2(new _Error(SR.nrUnexpectedEmptyLongId(), m));
  }
}
export function ResolveNestedTypeThroughAbbreviation(ncenv, tcref, m) {
  if (((tcref.IsTypeAbbrev ? tcref.Typars(m).tail == null : false) ? isAppTy(ncenv.g, getValue(tcref.TypeAbbrev)) : false) ? argsOfAppTy(ncenv.g, getValue(tcref.TypeAbbrev)).tail == null : false) {
    return tcrefOfAppTy(ncenv.g, getValue(tcref.TypeAbbrev));
  } else {
    return tcref;
  }
}
export function ResolveTypeLongIdentInTyconRefPrim(ncenv, typeNameResInfo, ad, resInfo, genOk, depth, m, tcref, id, rest) {
  const tcref_1 = ResolveNestedTypeThroughAbbreviation(ncenv, tcref, m);

  if (rest.tail != null) {
    const m_1 = unionRanges(m, id.idRange);
    let tyconSearch;
    const tcrefs = LookupTypeNameInEntityMaybeHaveArity(ncenv.amap, id.idRange, ad, id.idText, new TypeNameResolutionStaticArgsInfo(0), tcref_1);

    if (tcrefs.tail == null) {
      tyconSearch = NoResultsOrUsefulErrors();
    } else {
      const tcrefs_1 = map(function (tcref_2) {
        return [resInfo, tcref_2];
      }, tcrefs);
      const tcrefs_2 = CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs_1, typeNameResInfo.DropStaticArgsInfo, genOk, m_1);

      if (tcrefs_2.tail == null) {
        const suggestTypes = function () {
          return new Set(map_2(function (e) {
            return e[1].DisplayName;
          }, tcref_1.ModuleOrNamespaceType.TypesByDemangledNameAndArity(id.idRange)));
        };

        tyconSearch = ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00) {
          return SR.undefinedNameType(arg00);
        }, id, suggestTypes));
      } else {
        tyconSearch = CollectAtMostOneResult(function (tupledArg) {
          return ResolveTypeLongIdentInTyconRefPrim(ncenv, typeNameResInfo, ad, tupledArg[0], genOk, depth + 1, m_1, tupledArg[1], rest.head, rest.tail);
        }, tcrefs_2);
      }
    }

    return AtMostOneResult(m_1, tyconSearch);
  } else {
    const m_2 = unionRanges(m, id.idRange);
    const tcrefs_3 = LookupTypeNameInEntityMaybeHaveArity(ncenv.amap, id.idRange, ad, id.idText, typeNameResInfo.StaticArgsInfo, tcref_1);
    const tcrefs_4 = map(function (tcref_3) {
      return [resInfo, tcref_3];
    }, tcrefs_3);
    const tcrefs_5 = CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs_4, typeNameResInfo, genOk, m_2);

    if (tcrefs_5.tail == null) {
      const suggestTypes_1 = function () {
        return new Set(map_2(function (e_1) {
          return e_1[1].DisplayName;
        }, tcref_1.ModuleOrNamespaceType.TypesByDemangledNameAndArity(id.idRange)));
      };

      return ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00_1) {
        return SR.undefinedNameType(arg00_1);
      }, id, suggestTypes_1));
    } else {
      return ResultOrExceptionModule.success(tcrefs_5.head);
    }
  }
}
export function ResolveTypeLongIdentInTyconRef(sink, ncenv, nenv, typeNameResInfo, ad, m, tcref, lid) {
  const patternInput = lid.tail != null ? ResultOrExceptionModule.ForceRaise(ResolveTypeLongIdentInTyconRefPrim(ncenv, typeNameResInfo, ad, ResolutionInfo.Empty, new PermitDirectReferenceToGeneratedType(1), 0, m, tcref, lid.head, lid.tail)) : error_2(new _Error(SR.nrUnexpectedEmptyLongId(), m));
  ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(1), ad, patternInput[0], new ResultTyparChecker(0, function () {
    return true;
  }));
  const item = new Item(14, [patternInput[1].DisplayName, ofArray([FreshenTycon(ncenv, m, patternInput[1])])]);
  CallNameResolutionSink(sink, rangeOfLid(lid), nenv, item, item, emptyTyparInst, new ItemOccurence(2), nenv.eDisplayEnv, ad);
  return patternInput[1];
}
export function SuggestTypeLongIdentInModuleOrNamespace(depth, modref, amap, ad, m, id) {
  const suggestPossibleTypes = function () {
    return new Set(collect(function (e) {
      return ofArray([e.DisplayName, e.DemangledModuleOrNamespaceName]);
    }, filter_1(function (e_1) {
      return IsEntityAccessible(amap, m, ad, modref.NestedTyconRef(e_1));
    }, modref.ModuleOrNamespaceType.AllEntities)));
  };

  const errorTextF = function (s) {
    return SR.undefinedNameTypeIn(s, fullDisplayTextOfModRef(modref));
  };

  return new UndefinedName(depth, errorTextF, id, suggestPossibleTypes);
}

function ResolveTypeLongIdentInModuleOrNamespace(sink, nenv, ncenv, typeNameResInfo, ad, genOk, resInfo, depth, m, modref, _mty, id, rest) {
  if (rest.tail != null) {
    const m_1 = unionRanges(m, id.idRange);
    let modulSearch;
    const matchValue = tryFind(id.idText, modref.ModuleOrNamespaceType.ModulesAndNamespacesByDemangledName);
    let $var90;

    if (matchValue != null) {
      const activePatternResult35089 = _AccessibleEntityRef___(ncenv.amap, m_1, ad, modref, getValue(matchValue));

      if (activePatternResult35089 != null) {
        $var90 = [0, getValue(activePatternResult35089)];
      } else {
        $var90 = [1];
      }
    } else {
      $var90 = [1];
    }

    switch ($var90[0]) {
      case 0:
        const item = new Item(18, ofArray([$var90[1]]));
        CallNameResolutionSink(sink, id.idRange, nenv, item, item, emptyTyparInst, new ItemOccurence(1), nenv.DisplayEnv, ad);
        const resInfo_1 = resInfo.AddEntity([id.idRange, $var90[1]]);
        modulSearch = ResolveTypeLongIdentInModuleOrNamespace(sink, nenv, ncenv, typeNameResInfo, ad, genOk, resInfo_1, depth + 1, m_1, $var90[1], $var90[1].ModuleOrNamespaceType, rest.head, rest.tail);
        break;

      case 1:
        const suggestPossibleModules = function () {
          return new Set(collect(function (e) {
            return ofArray([e[1].DisplayName, e[1].DemangledModuleOrNamespaceName]);
          }, filter_1(function (kv) {
            return IsEntityAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(kv[1]));
          }, modref.ModuleOrNamespaceType.ModulesAndNamespacesByDemangledName)));
        };

        modulSearch = ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00) {
          return SR.undefinedNameNamespaceOrModule(arg00);
        }, id, suggestPossibleModules));
        break;
    }

    let tyconSearch;
    const tcrefs = LookupTypeNameInEntityMaybeHaveArity(ncenv.amap, id.idRange, ad, id.idText, new TypeNameResolutionStaticArgsInfo(0), modref);

    if (tcrefs.tail == null) {
      const suggestTypes = function () {
        return new Set(map_2(function (e_1) {
          return e_1[1].DisplayName;
        }, modref.ModuleOrNamespaceType.TypesByDemangledNameAndArity(id.idRange)));
      };

      tyconSearch = ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00_1) {
        return SR.undefinedNameType(arg00_1);
      }, id, suggestTypes));
    } else {
      tyconSearch = CollectResults(function (tcref) {
        return ResolveTypeLongIdentInTyconRefPrim(ncenv, typeNameResInfo, ad, resInfo, genOk, depth + 1, m_1, tcref, rest.head, rest.tail);
      }, tcrefs);
    }

    return op_PlusPlusPlus(tyconSearch, modulSearch);
  } else {
    const tcrefs_1 = LookupTypeNameInEntityMaybeHaveArity(ncenv.amap, id.idRange, ad, id.idText, typeNameResInfo.StaticArgsInfo, modref);

    if (tcrefs_1.tail == null) {
      return ResultOrExceptionModule.raze(SuggestTypeLongIdentInModuleOrNamespace(depth, modref, ncenv.amap, ad, m, id));
    } else {
      return CollectResults(function (tcref_1) {
        return ResultOrExceptionModule.success([resInfo, tcref_1]);
      }, tcrefs_1);
    }
  }
}

export function ResolveTypeLongIdentPrim(sink, ncenv, occurence, first, fullyQualified, m, nenv, ad, id, rest, staticResInfo, genOk) {
  ResolveTypeLongIdentPrim: while (true) {
    const typeNameResInfo = TypeNameResolutionInfo.ResolveToTypeRefs(staticResInfo);

    if (first ? id.idText === "`global`" : false) {
      if (rest.tail != null) {
        sink = sink;
        ncenv = ncenv;
        occurence = occurence;
        first = false;
        fullyQualified = new FullyQualifiedFlag(0);
        m = m;
        nenv = nenv;
        ad = ad;
        id = rest.head;
        rest = rest.tail;
        staticResInfo = staticResInfo;
        genOk = genOk;
        continue ResolveTypeLongIdentPrim;
      } else {
        return error_2(new _Error(SR.nrGlobalUsedOnlyAsFirstName(), id.idRange));
      }
    } else if (rest.tail != null) {
      const m2 = unionRanges(m, id.idRange);
      let tyconSearch;

      if (fullyQualified.tag === 1) {
        const matchValue = LookupTypeNameInEnvHaveArity(fullyQualified, id.idText, staticResInfo.NumStaticArgs, nenv);
        const $var91 = matchValue != null ? IsEntityAccessible(ncenv.amap, m2, ad, getValue(matchValue)) ? [0, getValue(matchValue)] : [1] : [1];

        switch ($var91[0]) {
          case 0:
            tyconSearch = OneResult(ResolveTypeLongIdentInTyconRefPrim(ncenv, typeNameResInfo, ad, ResolutionInfo.Empty, genOk, 1, m2, $var91[1], rest.head, rest.tail));
            break;

          case 1:
            tyconSearch = NoResultsOrUsefulErrors();
            break;
        }
      } else {
        tyconSearch = NoResultsOrUsefulErrors();
      }

      const modulSearch = ResultOrExceptionModule.op_BarQmarkGreater(ResolveLongIndentAsModuleOrNamespaceThen(sink, new ResultCollectionSettings(0), ncenv.amap, m2, fullyQualified, nenv, ad, id, rest, false, function (resInfo, depth, m_1, modref, _mty, id_1, rest_1) {
        return ResolveTypeLongIdentInModuleOrNamespace(sink, nenv, ncenv, typeNameResInfo, ad, genOk, resInfo, depth, m_1, modref, _mty, id_1, rest_1);
      }), function (lists) {
        return concat(lists);
      });

      const modulSearchFailed = function () {
        var typeNameResInfo_1;
        var ad_1;
        return ResultOrExceptionModule.op_BarQmarkGreater(ResolveLongIndentAsModuleOrNamespaceThen(sink, new ResultCollectionSettings(0), ncenv.amap, m2, fullyQualified, nenv, new AccessorDomain(2), id, rest, false, (typeNameResInfo_1 = typeNameResInfo.DropStaticArgsInfo, ad_1 = new AccessorDomain(2), function (resInfo_1, depth_1, m_2, modref_1, _mty_1, id_2, rest_2) {
          return ResolveTypeLongIdentInModuleOrNamespace(sink, nenv, ncenv, typeNameResInfo_1, ad_1, genOk, resInfo_1, depth_1, m_2, modref_1, _mty_1, id_2, rest_2);
        })), function (lists_1) {
          return concat(lists_1);
        });
      };

      const searchSoFar = op_PlusPlusPlus(tyconSearch, modulSearch);

      if (searchSoFar.tag === 0) {
        const tcrefs = CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(searchSoFar.data, typeNameResInfo, genOk, m);

        if (tcrefs.tail == null) {
          return AtMostOneResult(m2, ResultOrExceptionModule.op_BarQmarkGreater(op_PlusPlusPlus(searchSoFar, modulSearchFailed()), function (tcrefs_1) {
            return CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs_1, typeNameResInfo, genOk, m);
          }));
        } else {
          const tcref = tcrefs.head[1];
          const resInfo_2 = tcrefs.head[0];
          return ResultOrExceptionModule.success([resInfo_2, tcref]);
        }
      } else {
        return AtMostOneResult(m2, ResultOrExceptionModule.op_BarQmarkGreater(op_PlusPlusPlus(searchSoFar, modulSearchFailed()), function (tcrefs_2) {
          return CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(tcrefs_2, typeNameResInfo, genOk, m);
        }));
      }
    } else {
      const matchValue_1 = LookupTypeNameInEnvHaveArity(fullyQualified, id.idText, staticResInfo.NumStaticArgs, nenv);

      if (matchValue_1 == null) {
        const tcrefs_3 = LookupTypeNameInEnvNoArity(fullyQualified, id.idText, nenv);

        if (tcrefs_3.tail == null) {
          const suggestPossibleTypes = function () {
            return new Set(collect(function (e) {
              return occurence.tag === 3 ? toList(delay(function () {
                return append_1(singleton(e[1].DisplayName), delay(function () {
                  return append_1(singleton(e[1].DemangledModuleOrNamespaceName), delay(function () {
                    return endsWith(e[1].DisplayName, "Attribute") ? singleton(replace_1(e[1].DisplayName, "Attribute", "")) : empty();
                  }));
                }));
              })) : ofArray([e[1].DisplayName, e[1].DemangledModuleOrNamespaceName]);
            }, filter_1(function (kv) {
              return IsEntityAccessible(ncenv.amap, m, ad, kv[1]);
            }, nenv.TyconsByDemangledNameAndArity(fullyQualified))));
          };

          return ResultOrExceptionModule.raze(new UndefinedName(0, function (arg00) {
            return SR.undefinedNameType(arg00);
          }, id, suggestPossibleTypes));
        } else {
          return ResultOrExceptionModule.success([ResolutionInfo.Empty, tcrefs_3.head]);
        }
      } else {
        const res = CheckForTypeLegitimacyAndMultipleGenericTypeAmbiguities(ofArray([[ResolutionInfo.Empty, getValue(matchValue_1)]]), typeNameResInfo, genOk, unionRanges(m, id.idRange));
        return ResultOrExceptionModule.success(res.head);
      }
    }
  }
}
export function ResolveTypeLongIdent(sink, ncenv, occurence, fullyQualified, nenv, ad, lid, staticResInfo, genOk) {
  const m = rangeOfLid(lid);
  const res = lid.tail != null ? ResolveTypeLongIdentPrim(sink, ncenv, occurence, true, fullyQualified, m, nenv, ad, lid.head, lid.tail, staticResInfo, genOk) : error_2(new _Error(SR.nrUnexpectedEmptyLongId(), m));

  if (res.tag === 0) {
    const tcref = res.data[1];
    const resInfo = res.data[0];
    ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(2), ad, resInfo, new ResultTyparChecker(0, function () {
      return true;
    }));
    const item = new Item(14, [tcref.DisplayName, ofArray([FreshenTycon(ncenv, m, tcref)])]);
    CallNameResolutionSink(sink, m, nenv, item, item, emptyTyparInst, occurence, nenv.eDisplayEnv, ad);
  }

  return ResultOrExceptionModule.op_BarQmarkGreater(res, function (tuple) {
    return tuple[1];
  });
}
export function ResolveFieldInModuleOrNamespace(ncenv, nenv, ad, resInfo, depth, m, modref, _mty, id, rest) {
  var chooser;
  const typeNameResInfo = TypeNameResolutionInfo.Default;
  const m_1 = unionRanges(m, id.idRange);
  let modulScopedFieldNames;
  const matchValue = TryFindTypeWithRecdField(modref, id);
  const $var92 = matchValue != null ? IsEntityAccessible(ncenv.amap, m_1, ad, modref.NestedTyconRef(getValue(matchValue))) ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var92[0]) {
    case 0:
      const showDeprecated = HasFSharpAttribute(ncenv.g, ncenv.g.attrib_RequireQualifiedAccessAttribute, $var92[1].Attribs);
      modulScopedFieldNames = ResultOrExceptionModule.success(ofArray([[resInfo, new FieldResolution(0, [function (arg00, arg10) {
        return modref.RecdFieldRefInNestedTycon(arg00, arg10);
      }($var92[1], id), showDeprecated]), rest]]));
      break;

    case 1:
      modulScopedFieldNames = ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00_1) {
        return SR.undefinedNameRecordLabelOrNamespace(arg00_1);
      }, id, function () {
        return NoSuggestions();
      }));
      break;
  }

  const $var93 = modulScopedFieldNames.tag === 0 ? modulScopedFieldNames.data.tail != null ? [0, modulScopedFieldNames.data.head] : [1] : [1];

  switch ($var93[0]) {
    case 0:
      return ResultOrExceptionModule.success($var93[1]);

    case 1:
      let tyconSearch_2;

      if (rest.tail != null) {
        const tcrefs = LookupTypeNameInEntityMaybeHaveArity(ncenv.amap, id.idRange, ad, id.idText, new TypeNameResolutionStaticArgsInfo(0), modref);

        if (tcrefs.tail == null) {
          tyconSearch_2 = NoResultsOrUsefulErrors();
        } else {
          const tcrefs_1 = map(function (tcref) {
            return [ResolutionInfo.Empty, tcref];
          }, tcrefs);
          const tyconSearch = ResolveLongIdentInTyconRefs(new ResultCollectionSettings(0), ncenv, nenv, new LookupKind(0), depth + 1, m_1, ad, rest.head, rest.tail, typeNameResInfo, id.idRange, tcrefs_1);
          const tyconSearch_1 = ResultOrExceptionModule.op_BarQmarkGreater(tyconSearch, (chooser = function (_arg1) {
            if (_arg1[1].tag === 5) {
              const rfref = _arg1[1].data.data[1];
              return [_arg1[0], new FieldResolution(0, [rfref, false]), _arg1[2]];
            } else {
              return null;
            }
          }, function (list) {
            return choose(chooser, list);
          }));
          tyconSearch_2 = tyconSearch_1;
        }
      } else {
        tyconSearch_2 = NoResultsOrUsefulErrors();
      }

      const $var94 = tyconSearch_2.tag === 0 ? tyconSearch_2.data.tail != null ? [0, tyconSearch_2.data.head] : [1] : [1];

      switch ($var94[0]) {
        case 0:
          return ResultOrExceptionModule.success($var94[1]);

        case 1:
          let modulSearch;

          if (rest.tail != null) {
            const matchValue_1 = tryFind(id.idText, modref.ModuleOrNamespaceType.ModulesAndNamespacesByDemangledName);
            let $var95;

            if (matchValue_1 != null) {
              const activePatternResult35148 = _AccessibleEntityRef___(ncenv.amap, m_1, ad, modref, getValue(matchValue_1));

              if (activePatternResult35148 != null) {
                $var95 = [0, getValue(activePatternResult35148)];
              } else {
                $var95 = [1];
              }
            } else {
              $var95 = [1];
            }

            switch ($var95[0]) {
              case 0:
                const resInfo_1 = resInfo.AddEntity([id.idRange, $var95[1]]);
                modulSearch = OneResult(ResolveFieldInModuleOrNamespace(ncenv, nenv, ad, resInfo_1, depth + 1, m_1, $var95[1], $var95[1].ModuleOrNamespaceType, rest.head, rest.tail));
                break;

              case 1:
                modulSearch = ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00_2) {
                  return SR.undefinedNameRecordLabelOrNamespace(arg00_2);
                }, id, function () {
                  return NoSuggestions();
                }));
                break;
            }
          } else {
            modulSearch = ResultOrExceptionModule.raze(new UndefinedName(depth, function (arg00_3) {
              return SR.undefinedNameRecordLabelOrNamespace(arg00_3);
            }, id, function () {
              return NoSuggestions();
            }));
          }

          return AtMostOneResult(m_1, op_PlusPlusPlus(op_PlusPlusPlus(modulScopedFieldNames, tyconSearch_2), modulSearch));
      }

  }
}
export function SuggestOtherLabelsOfSameRecordType(g, nenv, typ, id, allFields) {
  var x;
  const labelsOfPossibleRecord = GetRecordLabelsForType(g, nenv, typ);
  const givenFields = filter((x = id.idText, function (y) {
    return x !== y;
  }), map(function (fld) {
    return fld.idText;
  }, allFields));
  differenceInPlace(labelsOfPossibleRecord, givenFields);
  return labelsOfPossibleRecord;
}
export function SuggestLabelsOfRelatedRecords(g, nenv, id, allFields) {
  const suggestLabels = function () {
    var x;
    const givenFields = new Set(filter((x = id.idText, function (y) {
      return x !== y;
    }), map(function (fld) {
      return fld.idText;
    }, allFields)));
    let fullyQualfied;

    if (givenFields.size === 0) {
      const result = new Set(NameMapModule_1.domainL(nenv.eFieldLabels));
      result.delete("contents");
      fullyQualfied = result;
    } else {
      const possibleRecords = new Set(map(function (tuple) {
        return tuple[0];
      }, filter(function (tupledArg) {
        return isSubsetOf(givenFields, tupledArg[1]);
      }, map(function (tupledArg_1) {
        return [tupledArg_1[0], map(function (tuple_1) {
          return tuple_1[1];
        }, tupledArg_1[1])];
      }, groupBy(function (tuple_2) {
        return tuple_2[0];
      }, toList(delay(function () {
        return collect(function (fld_1) {
          const matchValue = tryFind(fld_1, nenv.eFieldLabels);

          if (matchValue != null) {
            return map(function (r) {
              return [r.TyconRef.DisplayName, fld_1];
            }, getValue(matchValue));
          } else {
            return empty();
          }
        }, givenFields);
      })))))));
      const labelsOfPossibleRecords = new Set(map_2(function (kv) {
        return kv[0];
      }, filter_1(function (kv_1) {
        return exists(function (arg00) {
          return possibleRecords.has(arg00);
        }, map(function (r_1) {
          return r_1.TyconRef.DisplayName;
        }, kv_1[1]));
      }, nenv.eFieldLabels)));
      differenceInPlace(labelsOfPossibleRecords, givenFields);
      fullyQualfied = labelsOfPossibleRecords;
    }

    if (fullyQualfied.size > 0) {
      return fullyQualfied;
    } else {
      return new Set(map_2(function (t) {
        return t.DisplayName + "." + id.idText;
      }, choose_1(function (e) {
        const hasRequireQualifiedAccessAttribute = HasFSharpAttribute(g, g.attrib_RequireQualifiedAccessAttribute, e[1].Attribs);

        if (!hasRequireQualifiedAccessAttribute) {
          return null;
        } else if (e[1].IsRecordTycon ? exists(function (x_1) {
          return x_1.Name === id.idText;
        }, e[1].AllFieldsArray) : false) {
          return e[1];
        } else {
          return null;
        }
      }, nenv.eTyconsByDemangledNameAndArity)));
    }
  };

  return new UndefinedName(0, function (arg00_1) {
    return SR.undefinedNameRecordLabel(arg00_1);
  }, id, suggestLabels);
}
export function ResolveFieldPrim(sink, ncenv, nenv, ad, typ, mp, id, allFields) {
  var copyOfStruct;
  const typeNameResInfo = TypeNameResolutionInfo.Default;
  const g = ncenv.g;
  const m = id.idRange;

  if (mp.tail == null) {
    const lookup = function () {
      let frefs;

      try {
        frefs = find(id.idText, nenv.eFieldLabels);
      } catch (matchValue) {
        if (matchValue instanceof Error) {
          frefs = error_2(SuggestLabelsOfRelatedRecords(g, nenv, id, allFields));
        } else {
          throw matchValue;
        }
      }

      return map(function (x) {
        return [ResolutionInfo.Empty, new FieldResolution(0, [x, false])];
      }, ListSet.setify(function (fref1, fref2) {
        return tyconRefEq(g, fref1.TyconRef, fref2.TyconRef);
      }, frefs));
    };

    if (isAppTy(g, typ)) {
      const matchValue_1 = ncenv.InfoReader.TryFindRecdOrClassFieldInfoOfType(id.idText, m, typ);

      if (matchValue_1 == null) {
        if (isRecdTy(g, typ)) {
          const suggestLabels = function () {
            return SuggestOtherLabelsOfSameRecordType(g, nenv, typ, id, allFields);
          };

          const typeName = minimalStringOfType(nenv.eDisplayEnv, typ);
          const errorText = SR.nrRecordDoesNotContainSuchLabel(typeName, id.idText);
          return error_2(new ErrorWithSuggestions(errorText, m, id.idText, suggestLabels));
        } else {
          return lookup();
        }
      } else {
        const rfref = getValue(matchValue_1).data[1];
        return ofArray([[ResolutionInfo.Empty, new FieldResolution(0, [rfref, false])]]);
      }
    } else {
      return lookup();
    }
  } else {
    const lid = append(mp, ofArray([id]));

    const tyconSearch_2 = function (ad_1) {
      var chooser;
      const $var96 = lid.tail != null ? lid.tail.tail != null ? [0, lid.tail.head, lid.tail.tail, lid.head] : [1] : [1];

      switch ($var96[0]) {
        case 0:
          const m_1 = $var96[3].idRange;
          const tcrefs = LookupTypeNameInEnvNoArity(new FullyQualifiedFlag(1), $var96[3].idText, nenv);

          if (tcrefs.tail == null) {
            return NoResultsOrUsefulErrors();
          } else {
            const tcrefs_1 = map(function (tcref) {
              return [ResolutionInfo.Empty, tcref];
            }, tcrefs);
            const tyconSearch = ResolveLongIdentInTyconRefs(new ResultCollectionSettings(0), ncenv, nenv, new LookupKind(0), 1, m_1, ad_1, $var96[1], $var96[2], typeNameResInfo, $var96[3].idRange, tcrefs_1);
            const tyconSearch_1 = ResultOrExceptionModule.op_BarQmarkGreater(tyconSearch, (chooser = function (_arg1) {
              if (_arg1[1].tag === 5) {
                const rfref_1 = _arg1[1].data.data[1];
                return [_arg1[0], new FieldResolution(0, [rfref_1, false]), _arg1[2]];
              } else {
                return null;
              }
            }, function (list) {
              return choose(chooser, list);
            }));
            return tyconSearch_1;
          }

        case 1:
          return NoResultsOrUsefulErrors();
      }
    };

    const modulSearch = function (ad_2) {
      if (lid.tail != null) {
        return ResolveLongIndentAsModuleOrNamespaceThen(sink, new ResultCollectionSettings(1), ncenv.amap, m, new FullyQualifiedFlag(1), nenv, ad_2, lid.head, lid.tail, false, function (resInfo, depth, m_2, modref, _mty, id_1, rest) {
          return ResolveFieldInModuleOrNamespace(ncenv, nenv, ad_2, resInfo, depth, m_2, modref, _mty, id_1, rest);
        });
      } else {
        return NoResultsOrUsefulErrors();
      }
    };

    let search;
    const moduleSearch1 = modulSearch(ad);
    const $var97 = moduleSearch1.tag === 0 ? moduleSearch1.data.tail != null ? [0, moduleSearch1.data.head] : [1] : [1];

    switch ($var97[0]) {
      case 0:
        search = ResultOrExceptionModule.success($var97[1]);
        break;

      case 1:
        const tyconSearch1 = tyconSearch_2(ad);
        const $var98 = tyconSearch1.tag === 0 ? tyconSearch1.data.tail != null ? [0, tyconSearch1.data.head] : [1] : [1];

        switch ($var98[0]) {
          case 0:
            search = ResultOrExceptionModule.success($var98[1]);
            break;

          case 1:
            const moduleSearch2 = modulSearch(new AccessorDomain(2));
            const $var99 = moduleSearch2.tag === 0 ? moduleSearch2.data.tail != null ? [0, moduleSearch2.data.head] : [1] : [1];

            switch ($var99[0]) {
              case 0:
                search = ResultOrExceptionModule.success($var99[1]);
                break;

              case 1:
                const tyconSearch2 = tyconSearch_2(new AccessorDomain(2));
                search = AtMostOneResult(m, op_PlusPlusPlus(op_PlusPlusPlus(op_PlusPlusPlus(moduleSearch1, tyconSearch1), moduleSearch2), tyconSearch2));
                break;
            }

            break;
        }

        break;
    }

    const patternInput = ResultOrExceptionModule.ForceRaise(search);

    if (!(patternInput[2].tail == null)) {
      errorR(new _Error(SR.nrInvalidFieldLabel(), (copyOfStruct = patternInput[2].head, copyOfStruct.idRange)));
    }

    return ofArray([[patternInput[0], patternInput[1]]]);
  }
}
export function ResolveField(sink, ncenv, nenv, ad, typ, mp, id, allFields) {
  const res = ResolveFieldPrim(sink, ncenv, nenv, ad, typ, mp, id, allFields);
  const checker = new ResultTyparChecker(0, function () {
    return true;
  });
  return map(function (tupledArg) {
    ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(2), ad, tupledArg[0], checker);
    return tupledArg[1];
  }, res);
}
export function FreshenRecdFieldRef(ncenv, m, rfref) {
  return new Item(5, new RecdFieldInfo(0, [ncenv.InstantiationGenerator(m, rfref.Tycon.Typars(m)), rfref]));
}

function ResolveExprDotLongIdent(ncenv, m, ad, nenv, typ, id, rest, findFlag) {
  const typeNameResInfo = TypeNameResolutionInfo.Default;
  const adhoctDotSearchAccessible = AtMostOneResult(m, ResolveLongIdentInTypePrim(ncenv, nenv, new LookupKind(2), ResolutionInfo.Empty, 1, m, ad, id, rest, findFlag, typeNameResInfo, typ));

  if (adhoctDotSearchAccessible.tag === 1) {
    let dotFieldIdSearch;

    if (isAppTy(ncenv.g, typ)) {
      dotFieldIdSearch = NoResultsOrUsefulErrors();
    } else {
      const matchValue = tryFind(id.idText, nenv.eFieldLabels);
      const $var100 = matchValue != null ? getValue(matchValue).tail != null ? [0, getValue(matchValue).head] : [1] : [1];

      switch ($var100[0]) {
        case 0:
          const item = FreshenRecdFieldRef(ncenv, m, $var100[1]);
          dotFieldIdSearch = OneSuccess([ResolutionInfo.Empty, item, rest]);
          break;

        case 1:
          dotFieldIdSearch = NoResultsOrUsefulErrors();
          break;
      }
    }

    const matchValue_1 = AtMostOneResult(m, dotFieldIdSearch);

    if (matchValue_1.tag === 0) {
      return ResultOrExceptionModule.ForceRaise(matchValue_1);
    } else {
      const adhocDotSearchAll = ResolveLongIdentInTypePrim(ncenv, nenv, new LookupKind(2), ResolutionInfo.Empty, 1, m, new AccessorDomain(2), id, rest, findFlag, typeNameResInfo, typ);
      return ResultOrExceptionModule.ForceRaise(AtMostOneResult(m, op_PlusPlusPlus(dotFieldIdSearch, adhocDotSearchAll)));
    }
  } else {
    return ResultOrExceptionModule.ForceRaise(adhoctDotSearchAccessible);
  }
}

export function ComputeItemRange(wholem, lid, rest) {
  if (rest.tail == null) {
    return wholem;
  } else {
    const ids = List_1.take(0 > lid.length - rest.length ? 0 : lid.length - rest.length, lid);

    if (ids.tail == null) {
      return wholem;
    } else {
      return rangeOfLid(ids);
    }
  }
}
export function FilterMethodGroups(ncenv, itemRange, item, staticOnly) {
  if (item.tag === 10) {
    const minfos = filter(function (minfo) {
      return staticOnly === (minfo.GetObjArgTypes(ncenv.amap, itemRange, minfo.FormalMethodInst).tail == null);
    }, item.data[1]);
    return new Item(10, [item.data[0], minfos, item.data[2]]);
  } else {
    return item;
  }
}
export function NeedsWorkAfterResolution(namedItem) {
  const $var101 = namedItem.tag === 10 ? [0, namedItem.data[1]] : namedItem.tag === 11 ? [0, namedItem.data[1]] : namedItem.tag === 9 ? [1, namedItem.data[1]] : namedItem.tag === 19 ? namedItem.data[1].contents != null ? getValue(namedItem.data[1].contents).tag === 0 ? [2, getValue(namedItem.data[1].contents).data[1]] : [5] : [5] : namedItem.tag === 0 ? [2, namedItem.data] : namedItem.tag === 16 ? [2, namedItem.data[1]] : namedItem.tag === 15 ? namedItem.data[2] != null ? [3, getValue(namedItem.data[2])] : [5] : namedItem.tag === 3 ? [4, namedItem.data] : [5];

  switch ($var101[0]) {
    case 0:
      if ($var101[1].length > 1) {
        return true;
      } else {
        return exists(function (minfo) {
          return !(minfo.FormalMethodInst.tail == null);
        }, $var101[1]);
      }

    case 1:
      return $var101[1].length > 1;

    case 2:
      return !($var101[1].Typars.tail == null);

    case 3:
      return !($var101[1].FormalMethodInst.tail == null);

    case 4:
      return !($var101[1].ActivePatternVal.Typars.tail == null);

    case 5:
      return false;
  }
}
export class AfterResolution {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.AfterResolution",
      interfaces: ["FSharpUnion"],
      cases: [["DoNothing"], ["RecordResolution", Option(Item), _Function([makeGeneric(List, {
        T: Tuple([Typar, TType])
      }), Unit]), _Function([Tuple([MethInfo, Option(PropInfo), makeGeneric(List, {
        T: Tuple([Typar, TType])
      })]), Unit]), _Function([Unit, Unit])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.AfterResolution", AfterResolution);
export function ResolveLongIdentAsExprAndComputeRange(sink, ncenv, wholem, ad, nenv, typeNameResInfo, lid) {
  var name;
  var minfos1;
  const patternInput = ResolveExprLongIdent(sink, ncenv, wholem, ad, nenv, typeNameResInfo, lid);
  const itemRange = ComputeItemRange(wholem, lid, patternInput[1]);
  const item = FilterMethodGroups(ncenv, itemRange, patternInput[0], true);
  const matchValue = [patternInput[0], item];
  const $var102 = matchValue[0].tag === 10 ? matchValue[1].tag === 10 ? matchValue[1].data[1].tail == null ? (name = matchValue[0].data[0], minfos1 = matchValue[0].data[1], !(minfos1.tail == null)) ? [0, matchValue[0].data[1], matchValue[0].data[0]] : [1] : [1] : [1] : [1];

  switch ($var102[0]) {
    case 0:
      error_2(new _Error(SR.methodIsNotStatic($var102[2]), wholem));
      break;

    case 1:
      break;
  }

  let isFakeIdents;
  const $var103 = lid.tail != null ? lid.tail.tail == null ? [0] : [1, lid.head, lid.tail] : [0];

  switch ($var103[0]) {
    case 0:
      isFakeIdents = false;
      break;

    case 1:
      isFakeIdents = forAll(function (id) {
        return equals(id.idRange, $var103[1].idRange);
      }, $var103[2]);
      break;
  }

  const callSink = function (tupledArg) {
    if (!isFakeIdents) {
      const occurence = item.tag === 2 ? new ItemOccurence(0) : new ItemOccurence(1);
      CallNameResolutionSink(sink, itemRange, nenv, tupledArg[0], item, tupledArg[1], occurence, nenv.DisplayEnv, ad);
    }
  };

  const callSinkWithSpecificOverload = function (tupledArg_1) {
    let refinedItem;
    const $var104 = tupledArg_1[1] == null ? tupledArg_1[0].IsConstructor ? [0] : [1] : [1];

    switch ($var104[0]) {
      case 0:
        refinedItem = new Item(11, [tupledArg_1[0].LogicalName, ofArray([tupledArg_1[0]])]);
        break;

      case 1:
        if (tupledArg_1[1] != null) {
          refinedItem = new Item(9, [getValue(tupledArg_1[1]).PropertyName, ofArray([getValue(tupledArg_1[1])])]);
        } else {
          refinedItem = new Item(10, [tupledArg_1[0].LogicalName, ofArray([tupledArg_1[0]]), null]);
        }

        break;
    }

    callSink([refinedItem, tupledArg_1[2]]);
  };

  let afterResolution;
  const matchValue_1 = sink.CurrentSink;

  if (matchValue_1 != null) {
    if (NeedsWorkAfterResolution(item)) {
      afterResolution = new AfterResolution(1, [null, function (tpinst) {
        callSink([item, tpinst]);
      }, callSinkWithSpecificOverload, function () {
        callSink([item, emptyTyparInst]);
      }]);
    } else {
      callSink([item, emptyTyparInst]);
      afterResolution = new AfterResolution(0);
    }
  } else {
    afterResolution = new AfterResolution(0);
  }

  return [item, itemRange, patternInput[1], afterResolution];
}

function _NonOverridable___(namedItem) {
  const $var105 = namedItem.tag === 10 ? exists(function (minfo) {
    return minfo.IsVirtual ? true : minfo.IsAbstract;
  }, namedItem.data[1]) ? [0, namedItem.data[1]] : [1] : [1];

  switch ($var105[0]) {
    case 0:
      return null;

    case 1:
      const $var106 = namedItem.tag === 9 ? exists(function (pinfo) {
        return pinfo.IsVirtualProperty;
      }, namedItem.data[1]) ? [0, namedItem.data[1]] : [1] : [1];

      switch ($var106[0]) {
        case 0:
          return null;

        case 1:
          return makeSome();
      }

  }
}

export { _NonOverridable___ as $7C$NonOverridable$7C$_$7C$ };
export function ResolveExprDotLongIdentAndComputeRange(sink, ncenv, wholem, ad, nenv, typ, lid, findFlag, thisIsActuallyATyAppNotAnExpr) {
  const resolveExpr = function (findFlag_1) {
    const patternInput = lid.tail != null ? ResolveExprDotLongIdent(ncenv, wholem, ad, nenv, typ, lid.head, lid.tail, findFlag_1) : error_2(new InternalError("ResolveExprDotLongIdentAndComputeRange", wholem));
    const itemRange = ComputeItemRange(wholem, lid, patternInput[2]);
    return [patternInput[0], patternInput[1], patternInput[2], itemRange];
  };

  const patternInput_1 = resolveExpr(findFlag);
  ResolutionInfo.SendEntityPathToSink(sink, ncenv, nenv, new ItemOccurence(1), ad, patternInput_1[0], new ResultTyparChecker(0, function () {
    return CheckAllTyparsInferrable(ncenv.amap, patternInput_1[3], patternInput_1[1]);
  }));
  let afterResolution;
  const matchValue = sink.CurrentSink;

  if (matchValue != null) {
    let patternInput_3;
    const matchValue_1 = [findFlag, patternInput_1[1]];
    let $var107;

    if (matchValue_1[0].tag === 1) {
      $var107 = [0];
    } else {
      const activePatternResult35257 = _NonOverridable___(matchValue_1[1]);

      if (activePatternResult35257 != null) {
        $var107 = [0];
      } else {
        $var107 = [1];
      }
    }

    switch ($var107[0]) {
      case 0:
        patternInput_3 = [patternInput_1[1], patternInput_1[3], false];
        break;

      case 1:
        if (matchValue_1[0].tag === 0) {
          const patternInput_2 = resolveExpr(new FindMemberFlag(1));
          patternInput_3 = [patternInput_2[1], patternInput_2[3], true];
        } else {
          throw new Error("C:/projects/fcs/src/fsharp/NameResolution.fs", 3385, 22);
        }

        break;
    }

    const callSink = function (tupledArg) {
      const refinedItem = FilterMethodGroups(ncenv, patternInput_3[1], tupledArg[0], thisIsActuallyATyAppNotAnExpr);
      const unrefinedItem = FilterMethodGroups(ncenv, patternInput_3[1], patternInput_3[0], thisIsActuallyATyAppNotAnExpr);
      CallNameResolutionSink(sink, patternInput_3[1], nenv, refinedItem, unrefinedItem, tupledArg[1], new ItemOccurence(1), nenv.DisplayEnv, ad);
    };

    const callSinkWithSpecificOverload = function (tupledArg_1) {
      let refinedItem_1;
      const $var108 = tupledArg_1[1] == null ? tupledArg_1[0].IsConstructor ? [0] : [1] : [1];

      switch ($var108[0]) {
        case 0:
          refinedItem_1 = new Item(11, [tupledArg_1[0].LogicalName, ofArray([tupledArg_1[0]])]);
          break;

        case 1:
          if (tupledArg_1[1] != null) {
            refinedItem_1 = new Item(9, [getValue(tupledArg_1[1]).PropertyName, ofArray([getValue(tupledArg_1[1])])]);
          } else {
            refinedItem_1 = new Item(10, [tupledArg_1[0].LogicalName, ofArray([tupledArg_1[0]]), null]);
          }

          break;
      }

      callSink([refinedItem_1, tupledArg_1[2]]);
    };

    const matchValue_2 = [patternInput_3[2], NeedsWorkAfterResolution(patternInput_3[0])];
    const $var109 = matchValue_2[0] ? matchValue_2[1] ? [1] : [2] : matchValue_2[1] ? [0] : [2];

    switch ($var109[0]) {
      case 0:
        afterResolution = new AfterResolution(1, [null, function (tpinst) {
          callSink([patternInput_1[1], tpinst]);
        }, callSinkWithSpecificOverload, function () {
          callSink([patternInput_3[0], emptyTyparInst]);
        }]);
        break;

      case 1:
        afterResolution = new AfterResolution(1, [patternInput_3[0], function (tpinst_1) {
          callSink([patternInput_1[1], tpinst_1]);
        }, callSinkWithSpecificOverload, function () {
          callSink([patternInput_3[0], emptyTyparInst]);
        }]);
        break;

      case 2:
        callSink([patternInput_3[0], emptyTyparInst]);
        afterResolution = new AfterResolution(0);
        break;
    }
  } else {
    afterResolution = new AfterResolution(0);
  }

  return [patternInput_1[1], patternInput_1[3], patternInput_1[2], afterResolution];
}
export function FakeInstantiationGenerator(_m, gps) {
  return map(function (tp) {
    return mkTyparTy(tp);
  }, gps);
}
export function ItemForModuleOrNamespaceRef(v) {
  return new Item(18, ofArray([v]));
}
export function ItemForPropInfo(pinfo) {
  return new Item(9, [pinfo.PropertyName, ofArray([pinfo])]);
}
export function IsTyconUnseenObsoleteSpec(ad, g, amap, m, x, allowObsolete) {
  if (!IsEntityAccessible(amap, m, ad, x)) {
    return true;
  } else if (!allowObsolete) {
    if (x.IsILTycon) {
      return CheckILAttributesForUnseen(g, x.ILTyconRawMetadata.CustomAttrs, m);
    } else {
      return CheckFSharpAttributesForUnseen(g, x.Attribs, m);
    }
  } else {
    return false;
  }
}
export function IsTyconUnseen(ad, g, amap, m, x) {
  return IsTyconUnseenObsoleteSpec(ad, g, amap, m, x, false);
}
export function IsValUnseen(ad, g, m, v) {
  if ((v.IsCompilerGenerated ? true : v.Deref.IsClassConstructor) ? true : !IsValAccessible(ad, v)) {
    return true;
  } else {
    return CheckFSharpAttributesForUnseen(g, v.Attribs, m);
  }
}
export function IsUnionCaseUnseen(ad, g, amap, m, ucref) {
  if (!IsUnionCaseAccessible(amap, m, ad, ucref) ? true : IsTyconUnseen(ad, g, amap, m, ucref.TyconRef)) {
    return true;
  } else {
    return CheckFSharpAttributesForUnseen(g, ucref.Attribs, m);
  }
}
export function ItemIsUnseen(ad, g, amap, m, item) {
  if (item.tag === 0) {
    return IsValUnseen(ad, g, m, item.data);
  } else if (item.tag === 1) {
    return IsUnionCaseUnseen(ad, g, amap, m, item.data[0].UnionCaseRef);
  } else if (item.tag === 4) {
    return IsTyconUnseen(ad, g, amap, m, item.data);
  } else {
    return false;
  }
}
export function ItemOfTyconRef(ncenv, m, x) {
  return new Item(14, [x.DisplayName, ofArray([FreshenTycon(ncenv, m, x)])]);
}
export function ItemOfTy(g, x) {
  const nm = isAppTy(g, x) ? tcrefOfAppTy(g, x).DisplayName : "?";
  return new Item(14, [nm, ofArray([x])]);
}
export function IsInterestingModuleName(nm) {
  if (nm.length >= 1) {
    return _String.sub(nm, 0, 1) !== "<";
  } else {
    return false;
  }
}
export function PartialResolveLookupInModuleOrNamespaceAsModuleOrNamespaceThen($var167, $var168, $var169) {
  PartialResolveLookupInModuleOrNamespaceAsModuleOrNamespaceThen: while (true) {
    const f = $var167;
    const plid = $var168;
    const modref = $var169;
    const mty = modref.ModuleOrNamespaceType;

    if (plid.tail != null) {
      const matchValue = tryFind(plid.head, mty.ModulesAndNamespacesByDemangledName);

      if (matchValue == null) {
        return new List();
      } else {
        $var167 = f;
        $var168 = plid.tail;
        $var169 = modref.NestedTyconRef(getValue(matchValue));
        continue PartialResolveLookupInModuleOrNamespaceAsModuleOrNamespaceThen;
      }
    } else {
      return f(modref);
    }
  }
}
export function PartialResolveLongIndentAsModuleOrNamespaceThen(nenv, plid, f) {
  if (plid.tail == null) {
    return new List();
  } else {
    const matchValue = tryFind(plid.head, nenv.eModulesAndNamespaces);

    if (matchValue == null) {
      return new List();
    } else {
      return collect_1(function (modref) {
        return PartialResolveLookupInModuleOrNamespaceAsModuleOrNamespaceThen(f, plid.tail, modref);
      }, getValue(matchValue));
    }
  }
}
export function ResolveRecordOrClassFieldsOfType(ncenv, m, ad, typ, statics) {
  return map(function (arg0) {
    return new Item(5, arg0);
  }, filter(function (rfref) {
    return rfref.IsStatic === statics ? IsFieldInfoAccessible(ad, rfref) : false;
  }, ncenv.InfoReader.GetRecordOrClassFieldsOfType(null, ad, m, typ)));
}
export class ResolveCompletionTargets {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.NameResolution.ResolveCompletionTargets",
      interfaces: ["FSharpUnion"],
      cases: [["All", _Function([MethInfo, TType, "boolean"])], ["SettablePropertiesAndFields"]]
    };
  }

  get ResolveAll() {
    return this.tag === 1 ? false : true;
  }

}
setType("Microsoft.FSharp.Compiler.NameResolution.ResolveCompletionTargets", ResolveCompletionTargets);
export function ResolveCompletionsInType(ncenv, nenv, completionTargets, m, ad, statics, typ) {
  try {
    return function () {
      var optFilter;
      var staticResInfo;
      const g = ncenv.g;
      const amap = ncenv.amap;
      const rfinfos = filter(function (rfref) {
        return rfref.IsStatic === statics ? IsFieldInfoAccessible(ad, rfref) : false;
      }, ncenv.InfoReader.GetRecordOrClassFieldsOfType(null, ad, m, typ));
      let ucinfos;

      if ((completionTargets.ResolveAll ? statics : false) ? isAppTy(g, typ) : false) {
        const patternInput = destAppTy(g, typ);
        ucinfos = map(function (ucref) {
          return new Item(1, [new UnionCaseInfo(0, [patternInput[1], ucref]), false]);
        }, filter($var110 => {
          var amap_1;
          return function (value) {
            return !value;
          }((amap_1 = ncenv.amap, function (ucref_1) {
            return IsUnionCaseUnseen(ad, g, amap_1, m, ucref_1);
          })($var110));
        }, patternInput[0].UnionCasesAsRefList));
      } else {
        ucinfos = new List();
      }

      const einfos = completionTargets.ResolveAll ? filter(function (x) {
        return IsStandardEventInfo(ncenv.InfoReader, m, ad, x) ? x.IsStatic === statics : false;
      }, ncenv.InfoReader.GetEventInfosOfType(null, ad, m, typ)) : new List();
      const nestedTypes = (completionTargets.ResolveAll ? statics : false) ? (optFilter = null, staticResInfo = new TypeNameResolutionStaticArgsInfo(0), function (typ_1) {
        return GetNestedTypesOfType(ad, ncenv, optFilter, staticResInfo, false, m, typ_1);
      })(typ) : new List();
      const finfos = filter(function (x_1) {
        return (!x_1.IsSpecialName ? x_1.IsStatic === statics : false) ? IsILFieldInfoAccessible(g, amap, m, ad, x_1) : false;
      }, ncenv.InfoReader.GetILFieldInfosOfType(null, ad, m, typ));
      const pinfosIncludingUnseen = filter(function (x_2) {
        return x_2.IsStatic === statics ? IsPropInfoAccessible(g, amap, m, ad, x_2) : false;
      }, AllPropInfosOfTypeInScope(ncenv.InfoReader, nenv, null, ad, new FindMemberFlag(1), m, typ));
      const pinfoMethNames = append(map(function (pinfo) {
        return pinfo.GetterMethod.LogicalName;
      }, filter(function (pinfo_1) {
        return pinfo_1.HasGetter;
      }, pinfosIncludingUnseen)), map(function (pinfo_2) {
        return pinfo_2.SetterMethod.LogicalName;
      }, filter(function (pinfo_3) {
        return pinfo_3.HasSetter;
      }, pinfosIncludingUnseen)));
      const einfoMethNames = completionTargets.ResolveAll ? toList(delay(function () {
        return collect(function (einfo) {
          const delegateType = einfo.GetDelegateType(amap, m);
          const patternInput_1 = GetSigOfFunctionForDelegate(ncenv.InfoReader, delegateType, m, ad);

          if (slotSigHasVoidReturnTy(patternInput_1.data[0].GetSlotSig(amap, m))) {
            return append_1(singleton(einfo.AddMethod.DisplayName), delay(function () {
              return singleton(einfo.RemoveMethod.DisplayName);
            }));
          } else {
            return empty();
          }
        }, einfos);
      })) : new List();
      const suppressedMethNames = Zset.ofList(_String.order, append(pinfoMethNames, einfoMethNames));
      const pinfos = filter(function (x_3) {
        return !PropInfoIsUnseen(m, x_3);
      }, pinfosIncludingUnseen);

      const minfoFilter = function (minfo) {
        let isApplicableMeth;

        if (completionTargets.tag === 0) {
          isApplicableMeth = completionTargets.data;
        } else {
          throw new Error("internal error: expected completionTargets = ResolveCompletionTargets.All");
        }

        let isUnseenDueToBasicObjRules;

        if (!isObjTy(g, typ) ? !minfo.IsExtensionMember : false) {
          const matchValue = minfo.LogicalName;

          switch (matchValue) {
            case "GetType":
              isUnseenDueToBasicObjRules = false;
              break;

            case "GetHashCode":
              if (isObjTy(g, minfo.ApparentEnclosingType)) {
                isUnseenDueToBasicObjRules = !TypeDefinitelyHasEquality(g, typ);
              } else {
                isUnseenDueToBasicObjRules = false;
              }

              break;

            case "ToString":
              isUnseenDueToBasicObjRules = false;
              break;

            case "Equals":
              if (!isObjTy(g, minfo.ApparentEnclosingType)) {
                isUnseenDueToBasicObjRules = false;
              } else if (minfo.IsInstance) {
                isUnseenDueToBasicObjRules = !TypeDefinitelyHasEquality(g, typ);
              } else {
                isUnseenDueToBasicObjRules = true;
              }

              break;

            default:
              isUnseenDueToBasicObjRules = isObjTy(g, minfo.ApparentEnclosingType);
          }
        } else {
          isUnseenDueToBasicObjRules = false;
        }

        const result = ((((((((!isUnseenDueToBasicObjRules ? !minfo.IsInstance === statics : false) ? IsMethInfoAccessible(amap, m, ad, minfo) : false) ? !MethInfoIsUnseen(g, m, typ, minfo) : false) ? !minfo.IsConstructor : false) ? !minfo.IsClassConstructor : false) ? !(minfo.LogicalName === ".cctor") : false) ? !(minfo.LogicalName === ".ctor") : false) ? isApplicableMeth(minfo, typ) : false) ? !suppressedMethNames.Contains_0(minfo.LogicalName) : false;
        return result;
      };

      let pinfoItems;
      const pinfos_1 = completionTargets.tag === 1 ? filter(function (p) {
        return p.HasSetter;
      }, pinfos) : pinfos;
      pinfoItems = choose(function (pinfo_4) {
        const pinfoOpt = DecodeFSharpEvent(ofArray([pinfo_4]), ad, g, ncenv, m);
        const matchValue_1 = [pinfoOpt, completionTargets];
        const $var111 = matchValue_1[0] != null ? getValue(matchValue_1[0]).tag === 8 ? matchValue_1[1].tag === 0 ? [0, getValue(matchValue_1[0]).data] : [1] : [1] : [1];

        switch ($var111[0]) {
          case 0:
            if (IsStandardEventInfo(ncenv.InfoReader, m, ad, $var111[1])) {
              return pinfoOpt;
            } else {
              return null;
            }

          case 1:
            return pinfoOpt;
        }
      }, pinfos_1);
      let minfos_2;

      if (completionTargets.ResolveAll) {
        const minfos = function (list) {
          return filter(minfoFilter, list);
        }(AllMethInfosOfTypeInScope(ncenv.InfoReader, nenv, null, ad, new FindMemberFlag(1), m, typ));

        let minfos_1;
        const addersAndRemovers = create_1(collect_1(function (_arg1) {
          const $var112 = _arg1.tag === 8 ? _arg1.data.tag === 0 ? [0, _arg1.data.data[2], _arg1.data.data[3]] : [1] : [1];

          switch ($var112[0]) {
            case 0:
              return ofArray([$var112[1].LogicalName, $var112[2].LogicalName]);

            case 1:
              return new List();
          }
        }, pinfoItems), new Comparer(comparePrimitives));

        if (isEmpty(addersAndRemovers, null)) {
          minfos_1 = minfos;
        } else {
          minfos_1 = filter(function (minfo_1) {
            return !addersAndRemovers.has(minfo_1.LogicalName);
          }, minfos);
        }

        minfos_2 = minfos_1;
      } else {
        minfos_2 = new List();
      }

      const partitionl = function (l, acc) {
        partitionl: while (true) {
          if (l.tail != null) {
            const nm = l.head.LogicalName;
            const $var173 = l.tail;
            acc = NameMultiMapModule.add(nm, l.head, acc);
            l = $var173;
            continue partitionl;
          } else {
            return acc;
          }
        }
      };

      return append(ucinfos, append(map(function (arg0) {
        return new Item(5, arg0);
      }, rfinfos), append(pinfoItems, append(map(function (arg0_1) {
        return new Item(7, arg0_1);
      }, finfos), append(map(function (arg0_2) {
        return new Item(8, arg0_2);
      }, einfos), append(map(function (x_4) {
        return ItemOfTy(g, x_4);
      }, nestedTypes), map(function (tupledArg) {
        return Item.MakeMethGroup(tupledArg[0], tupledArg[1]);
      }, NameMapModule.toList(partitionl(minfos_2, create(null, new Comparer(comparePrimitives)))))))))));
    }();
  } catch (matchValue_2) {
    if (matchValue_2 instanceof UnresolvedPathReferenceNoRange) {
      return new List();
    } else {
      throw matchValue_2;
    }
  }
}
export function ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, statics, plid, typ) {
  var optFilter;
  var staticResInfo;
  var FullTypeOfPinfo;
  var arg00_;
  var arg20_;
  var arg30_;
  const g = ncenv.g;
  const amap = ncenv.amap;

  if (plid.tail != null) {
    const rfinfos = filter(function (fref) {
      return fref.RecdField.IsStatic === statics;
    }, filter(function (fref_1) {
      return IsRecdFieldAccessible(ncenv.amap, m, ad, fref_1.RecdFieldRef);
    }, ncenv.InfoReader.GetRecordOrClassFieldsOfType(null, ad, m, typ)));
    const nestedTypes = (optFilter = plid.head, staticResInfo = new TypeNameResolutionStaticArgsInfo(0), function (typ_1) {
      return GetNestedTypesOfType(ad, ncenv, optFilter, staticResInfo, false, m, typ_1);
    })(typ);
    return append(collect_1(function (x) {
      return function (typ_2) {
        return ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, false, plid.tail, typ_2);
      }(x.FieldType);
    }, filter(function (x_1) {
      return x_1.Name === plid.head;
    }, rfinfos)), (FullTypeOfPinfo = function (pinfo) {
      const rty = pinfo.GetPropertyType(amap, m);
      const rty_1 = pinfo.IsIndexer ? op_MinusMinusGreater(mkRefTupledTy(g, pinfo.GetParamTypes(amap, m)), rty) : rty;
      return rty_1;
    }, append(collect_1(function (pinfo_1) {
      return function (typ_3) {
        return ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, false, plid.tail, typ_3);
      }(FullTypeOfPinfo(pinfo_1));
    }, filter(function (_arg1) {
      return IsPropInfoAccessible(g, amap, m, ad, _arg1);
    }, filter(function (x_2) {
      return x_2.IsStatic === statics;
    }, (arg00_ = ncenv.InfoReader, arg20_ = plid.head, arg30_ = new FindMemberFlag(0), function (arg50_) {
      return AllPropInfosOfTypeInScope(arg00_, nenv, arg20_, ad, arg30_, m, arg50_);
    })(typ)))), append(collect_1($var113 => {
      var infoReader;
      return function (typ_4) {
        return ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, false, plid.tail, typ_4);
      }((infoReader = ncenv.InfoReader, function (einfo) {
        return PropTypOfEventInfo(infoReader, m, ad, einfo);
      })($var113));
    }, ncenv.InfoReader.GetEventInfosOfType(plid.head, ad, m, typ)), append(collect_1(function (typ_5) {
      return ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, statics, plid.tail, typ_5);
    }, nestedTypes), collect_1(function (x_3) {
      return function (typ_6) {
        return ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, false, plid.tail, typ_6);
      }(x_3.FieldType(amap, m));
    }, filter(function (x_4) {
      return (!x_4.IsSpecialName ? x_4.IsStatic === statics : false) ? IsILFieldInfoAccessible(g, amap, m, ad, x_4) : false;
    }, ncenv.InfoReader.GetILFieldInfosOfType(plid.head, ad, m, typ))))))));
  } else {
    return ResolveCompletionsInType(ncenv, nenv, isApplicableMeth, m, ad, statics, typ);
  }
}
export function InfosForTyconConstructors(ncenv, m, ad, tcref) {
  const g = ncenv.g;
  const amap = ncenv.amap;

  if (tcref.IsTypeAbbrev) {
    return new List();
  } else {
    const typ = FreshenTycon(ncenv, m, tcref);
    const matchValue = ResolveObjectConstructor(ncenv, DisplayEnv.Empty(g), m, ad, typ);

    if (matchValue.tag === 1) {
      return new List();
    } else if (matchValue.data.tag === 12) {
      return new List();
    } else if (matchValue.data.tag === 11) {
      const ctors = filter($var114 => function (value) {
        return !value;
      }(function (minfo) {
        return MethInfoIsUnseen(g, m, typ, minfo);
      }($var114)), filter(function (minfo_1) {
        return IsMethInfoAccessible(amap, m, ad, minfo_1);
      }, matchValue.data.data[1]));

      if (ctors.tail == null) {
        return new List();
      } else {
        return ofArray([Item.MakeCtorGroup(matchValue.data.data[0], ctors)]);
      }
    } else {
      return ofArray([matchValue.data]);
    }
  }
}
export function notFakeContainerModule(tyconNames, nm) {
  return !tyconNames.has(nm);
}

function EntityRefContainsSomethingAccessible(ncenv, m, ad, modref) {
  const g = ncenv.g;
  const mty = modref.ModuleOrNamespaceType;

  if (exists(function (v) {
    try {
      return function () {
        const vref = mkNestedValRef(modref, v);

        if (!vref.IsCompilerGenerated ? !IsValUnseen(ad, g, m, vref) : false) {
          if (vref.IsExtensionMember) {
            return true;
          } else {
            return !vref.IsMember;
          }
        } else {
          return false;
        }
      }();
    } catch (matchValue) {
      if (matchValue instanceof UnresolvedPathReferenceNoRange) {
        return true;
      } else {
        return false;
      }
    }
  }, mty.AllValsAndMembers) ? true : QueueListModule.exists(function (tc) {
    return !tc.IsModuleOrNamespace ? !IsTyconUnseen(ad, g, ncenv.amap, m, modref.NestedTyconRef(tc)) : false;
  }, mty.AllEntities)) {
    return true;
  } else {
    return NameMapModule.exists(function (_arg1, submod) {
      const submodref = modref.NestedTyconRef(submod);
      return EntityRefContainsSomethingAccessible(ncenv, m, ad, submodref);
    }, mty.ModulesAndNamespacesByDemangledName);
  }
}

export function ResolvePartialLongIdentInModuleOrNamespace(ncenv, nenv, isApplicableMeth, m, ad, modref, plid, allowObsolete) {
  const g = ncenv.g;
  const mty = modref.ModuleOrNamespaceType;

  if (plid.tail != null) {
    return append((() => {
      const matchValue = tryFind(plid.head, mty.ModulesAndNamespacesByDemangledName);
      const $var115 = matchValue != null ? !IsTyconUnseenObsoleteSpec(ad, g, ncenv.amap, m, modref.NestedTyconRef(getValue(matchValue)), allowObsolete) ? [0, getValue(matchValue)] : [1] : [1];

      switch ($var115[0]) {
        case 0:
          const allowObsolete_1 = !plid.tail.Equals(new List()) ? allowObsolete : false;
          return ResolvePartialLongIdentInModuleOrNamespace(ncenv, nenv, isApplicableMeth, m, ad, modref.NestedTyconRef($var115[1]), plid.tail, allowObsolete_1);

        case 1:
          return new List();
      }
    })(), collect_1(function (tycon) {
      const tcref = modref.NestedTyconRef(tycon);

      if (!IsTyconUnseenObsoleteSpec(ad, g, ncenv.amap, m, tcref, allowObsolete)) {
        return function (typ) {
          return ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, true, plid.tail, typ);
        }(generalizedTyconRef(tcref));
      } else {
        return new List();
      }
    }, LookupTypeNameInEntityNoArity(m, plid.head, modref.ModuleOrNamespaceType)));
  } else {
    const tycons = filter(function (tycon_1) {
      return !IsTyconUnseen(ad, g, ncenv.amap, m, modref.NestedTyconRef(tycon_1));
    }, filter(function (tcref_1) {
      return !(tcref_1.LogicalName.indexOf(",") >= 0);
    }, mty.TypeDefinitions));
    const ilTyconNames = create_1(choose(function (tycon_2) {
      return tycon_2.IsILTycon ? tycon_2.DisplayName : null;
    }, mty.TypesByAccessNames.Values), new Comparer(comparePrimitives));
    return append(map(function (arg0) {
      return new Item(0, arg0);
    }, filter($var116 => function (value) {
      return !value;
    }(function (v) {
      return IsValUnseen(ad, g, m, v);
    }($var116)), filter(function (v_1) {
      return !v_1.IsMember;
    }, choose(function (vspec) {
      return TryMkValRefInModRef(modref, vspec);
    }, toList(mty.AllValsAndMembers))))), append(map(function (x) {
      return new Item(1, [GeneralizeUnionCaseRef(x), false]);
    }, filter($var117 => {
      var amap;
      return function (value_1) {
        return !value_1;
      }((amap = ncenv.amap, function (ucref) {
        return IsUnionCaseUnseen(ad, g, amap, m, ucref);
      })($var117));
    }, UnionCaseRefsInModuleOrNamespace(modref))), append(map(function (arg0_1) {
      return new Item(3, arg0_1);
    }, filter(function (apref) {
      return !function (v_2) {
        return IsValUnseen(ad, g, m, v_2);
      }(apref.ActivePatternVal);
    }, NameMapModule.range(ActivePatternElemsOfModuleOrNamespace(modref)))), append(map(function (arg0_2) {
      return new Item(4, arg0_2);
    }, filter($var118 => {
      var amap_1;
      return function (value_2) {
        return !value_2;
      }((amap_1 = ncenv.amap, function (x_1) {
        return IsTyconUnseen(ad, g, amap_1, m, x_1);
      })($var118));
    }, map(function (arg00) {
      return modref.NestedTyconRef(arg00);
    }, NameMapModule.range(mty.ExceptionDefinitionsByDemangledName)))), append(function (list) {
      return map(function (v_3) {
        return ItemForModuleOrNamespaceRef(v_3);
      }, list);
    }(filter(function (modref_1) {
      return EntityRefContainsSomethingAccessible(ncenv, m, ad, modref_1);
    }, filter($var119 => {
      var amap_2;
      return function (value_3) {
        return !value_3;
      }((amap_2 = ncenv.amap, function (x_2) {
        return IsTyconUnseen(ad, g, amap_2, m, x_2);
      })($var119));
    }, map(function (arg00_1) {
      return modref.NestedTyconRef(arg00_1);
    }, filter(function (x_3) {
      const demangledName = x_3.DemangledModuleOrNamespaceName;

      if (notFakeContainerModule(ilTyconNames, demangledName)) {
        return IsInterestingModuleName(demangledName);
      } else {
        return false;
      }
    }, NameMapModule.range(mty.ModulesAndNamespacesByDemangledName)))))), append(map($var120 => function (x_4) {
      return ItemOfTyconRef(ncenv, m, x_4);
    }(function (arg00_2) {
      return modref.NestedTyconRef(arg00_2);
    }($var120)), tycons), collect_1($var121 => function (tcref_2) {
      return InfosForTyconConstructors(ncenv, m, ad, tcref_2);
    }(function (arg00_3) {
      return modref.NestedTyconRef(arg00_3);
    }($var121)), tycons)))))));
  }
}
export function TryToResolveLongIdentAsType(ncenv, nenv, m, plid) {
  var folder;
  const g = ncenv.g;
  const matchValue = tryLast(plid);

  if (matchValue != null) {
    let patternInput;

    const matchValue_1 = function (table) {
      return tryFind(getValue(matchValue), table);
    }(nenv.eUnqualifiedItems);

    if (matchValue_1 == null) {
      patternInput = [null, false];
    } else if (getValue(matchValue_1).tag === 0) {
      const typ = getValue(matchValue_1).data.Type;
      const typ_1 = (getValue(matchValue_1).data.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(0)) ? isRefCellTy(g, typ) : false) ? destRefCellTy(g, typ) : typ;
      patternInput = [typ_1, true];
    } else {
      patternInput = [null, false];
    }

    if (patternInput[1]) {
      return patternInput[0];
    } else {
      return (folder = function (resTyp, tcref) {
        const tcref_1 = ResolveNestedTypeThroughAbbreviation(ncenv, tcref, m);
        const typ_2 = FreshenTycon(ncenv, m, tcref_1);
        const resTyp_1 = resTyp == null ? typ_2 : resTyp;
        return resTyp_1;
      }, function (list) {
        return fold(folder, patternInput[0], list);
      })(LookupTypeNameInEnvNoArity(new FullyQualifiedFlag(1), getValue(matchValue), nenv));
    }
  } else {
    return null;
  }
}
export function ResolvePartialLongIdentPrim(ncenv, nenv, isApplicableMeth, fullyQualified, m, ad, plid, allowObsolete) {
  ResolvePartialLongIdentPrim: while (true) {
    const g = ncenv.g;
    const $var122 = plid.tail != null ? plid.head === "global" ? [0, plid.head, plid.tail] : [1] : [1];

    switch ($var122[0]) {
      case 0:
        ncenv = ncenv;
        nenv = nenv;
        isApplicableMeth = isApplicableMeth;
        fullyQualified = new FullyQualifiedFlag(0);
        m = m;
        ad = ad;
        plid = $var122[2];
        allowObsolete = allowObsolete;
        continue ResolvePartialLongIdentPrim;

      case 1:
        if (plid.tail != null) {
          const namespaces = PartialResolveLongIndentAsModuleOrNamespaceThen(nenv, ofArray([plid.head]), function (modref) {
            const allowObsolete_1 = !plid.tail.Equals(new List()) ? allowObsolete : false;

            if (EntityRefContainsSomethingAccessible(ncenv, m, ad, modref)) {
              return ResolvePartialLongIdentInModuleOrNamespace(ncenv, nenv, isApplicableMeth, m, ad, modref, plid.tail, allowObsolete_1);
            } else {
              return new List();
            }
          });
          let patternInput;

          const matchValue = function (table) {
            return tryFind(plid.head, table);
          }(nenv.eUnqualifiedItems);

          if (matchValue == null) {
            patternInput = [new List(), false];
          } else if (getValue(matchValue).tag === 0) {
            const typ = getValue(matchValue).data.Type;
            const typ_1 = (getValue(matchValue).data.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(0)) ? isRefCellTy(g, typ) : false) ? destRefCellTy(g, typ) : typ;
            patternInput = [ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, false, plid.tail, typ_1), true];
          } else {
            patternInput = [new List(), false];
          }

          const staticSometingInType = toList(delay(function () {
            return !patternInput[1] ? collect(function (tcref) {
              const tcref_1 = ResolveNestedTypeThroughAbbreviation(ncenv, tcref, m);
              const typ_2 = FreshenTycon(ncenv, m, tcref_1);
              return ResolvePartialLongIdentInType(ncenv, nenv, isApplicableMeth, m, ad, true, plid.tail, typ_2);
            }, LookupTypeNameInEnvNoArity(new FullyQualifiedFlag(1), plid.head, nenv)) : empty();
          }));
          return append(namespaces, append(patternInput[0], staticSometingInType));
        } else {
          const ilTyconNames = create_1(choose(function (tyconRef) {
            return tyconRef.IsILTycon ? tyconRef.DisplayName : null;
          }, nenv.TyconsByAccessNames(fullyQualified).Values), new Comparer(comparePrimitives));
          const unqualifiedItems = fullyQualified.tag === 1 ? filter($var123 => {
            var amap;
            return function (value) {
              return !value;
            }((amap = ncenv.amap, function (item) {
              return ItemIsUnseen(ad, g, amap, m, item);
            })($var123));
          }, filter(function (_arg1) {
            return _arg1.tag === 22 ? false : _arg1.tag === 0 ? !_arg1.data.IsMember : true;
          }, Map_2_get_Values.bind(nenv.eUnqualifiedItems)())) : new List();
          const activePatternItems = fullyQualified.tag === 1 ? filter(function (_arg2) {
            return _arg2.tag === 3 ? true : false;
          }, NameMapModule.range(nenv.ePatItems)) : new List();

          const moduleAndNamespaceItems = function (list) {
            return map(function (v) {
              return ItemForModuleOrNamespaceRef(v);
            }, list);
          }(filter($var124 => {
            var amap_1;
            return function (value_1) {
              return !value_1;
            }((amap_1 = ncenv.amap, function (x) {
              return IsTyconUnseen(ad, g, amap_1, m, x);
            })($var124));
          }, filter(function (modref_1) {
            return EntityRefContainsSomethingAccessible(ncenv, m, ad, modref_1);
          }, filter(function (x_1) {
            const demangledName = x_1.DemangledModuleOrNamespaceName;

            if (IsInterestingModuleName(demangledName)) {
              return notFakeContainerModule(ilTyconNames, demangledName);
            } else {
              return false;
            }
          }, NameMultiMapModule.range(nenv.ModulesAndNamespaces(fullyQualified))))));

          const tycons = map(function (x_2) {
            return ItemOfTyconRef(ncenv, m, x_2);
          }, filter($var125 => {
            var amap_2;
            return function (value_2) {
              return !value_2;
            }((amap_2 = ncenv.amap, function (x_3) {
              return IsTyconUnseen(ad, g, amap_2, m, x_3);
            })($var125));
          }, filter(function (tcref_2) {
            return !tcref_2.IsExceptionDecl;
          }, filter(function (tcref_3) {
            return !(tcref_3.LogicalName.indexOf(",") >= 0);
          }, Map_2_get_Values.bind(nenv.TyconsByDemangledNameAndArity(fullyQualified))()))));
          const constructors = collect_1(function (tcref_4) {
            return InfosForTyconConstructors(ncenv, m, ad, tcref_4);
          }, filter($var126 => {
            var amap_3;
            return function (value_3) {
              return !value_3;
            }((amap_3 = ncenv.amap, function (x_4) {
              return IsTyconUnseen(ad, g, amap_3, m, x_4);
            })($var126));
          }, Map_2_get_Values.bind(nenv.TyconsByDemangledNameAndArity(fullyQualified))()));
          return append(unqualifiedItems, append(activePatternItems, append(moduleAndNamespaceItems, append(tycons, constructors))));
        }

    }
  }
}
export function ResolvePartialLongIdent(ncenv, nenv, isApplicableMeth, m, ad, plid, allowObsolete) {
  return ResolvePartialLongIdentPrim(ncenv, nenv, new ResolveCompletionTargets(0, isApplicableMeth), new FullyQualifiedFlag(1), m, ad, plid, allowObsolete);
}
export function ResolvePartialLongIdentInModuleOrNamespaceForRecordFields(ncenv, nenv, m, ad, modref, plid, allowObsolete) {
  var tycons;
  const g = ncenv.g;
  const mty = modref.ModuleOrNamespaceType;

  if (plid.tail != null) {
    return append((() => {
      const matchValue = tryFind(plid.head, mty.ModulesAndNamespacesByDemangledName);
      const $var127 = matchValue != null ? !IsTyconUnseenObsoleteSpec(ad, g, ncenv.amap, m, modref.NestedTyconRef(getValue(matchValue)), allowObsolete) ? [0, getValue(matchValue)] : [1] : [1];

      switch ($var127[0]) {
        case 0:
          const allowObsolete_1 = !plid.tail.Equals(new List()) ? allowObsolete : false;
          return ResolvePartialLongIdentInModuleOrNamespaceForRecordFields(ncenv, nenv, m, ad, modref.NestedTyconRef($var127[1]), plid.tail, allowObsolete_1);

        case 1:
          return new List();
      }
    })(), plid.tail.tail == null ? (tycons = LookupTypeNameInEntityNoArity(m, plid.head, modref.ModuleOrNamespaceType), map(function (arg0) {
      return new Item(5, arg0);
    }, collect_1(function (tycon) {
      const tcref = modref.NestedTyconRef(tycon);
      const ttype = FreshenTycon(ncenv, m, tcref);
      return ncenv.InfoReader.GetRecordOrClassFieldsOfType(null, ad, m, ttype);
    }, filter(function (tc) {
      return tc.IsRecordTycon;
    }, tycons)))) : new List());
  } else {
    const tycons_1 = filter(function (tycon_1) {
      return !IsTyconUnseen(ad, g, ncenv.amap, m, modref.NestedTyconRef(tycon_1));
    }, filter(function (tycon_2) {
      return tycon_2.IsRecordTycon;
    }, filter(function (tcref_1) {
      return !(tcref_1.LogicalName.indexOf(",") >= 0);
    }, mty.TypeDefinitions)));
    const ilTyconNames = create_1(choose(function (tycon_3) {
      return tycon_3.IsILTycon ? tycon_3.DisplayName : null;
    }, mty.TypesByAccessNames.Values), new Comparer(comparePrimitives));
    return append(function (list) {
      return map(function (v) {
        return ItemForModuleOrNamespaceRef(v);
      }, list);
    }(filter(function (modref_1) {
      return EntityRefContainsSomethingAccessible(ncenv, m, ad, modref_1);
    }, filter($var128 => {
      var amap;
      return function (value) {
        return !value;
      }((amap = ncenv.amap, function (x) {
        return IsTyconUnseen(ad, g, amap, m, x);
      })($var128));
    }, map(function (arg00) {
      return modref.NestedTyconRef(arg00);
    }, filter(function (x_1) {
      const demangledName = x_1.DemangledModuleOrNamespaceName;

      if (notFakeContainerModule(ilTyconNames, demangledName)) {
        return IsInterestingModuleName(demangledName);
      } else {
        return false;
      }
    }, NameMapModule.range(mty.ModulesAndNamespacesByDemangledName)))))), append(map($var129 => function (x_2) {
      return ItemOfTyconRef(ncenv, m, x_2);
    }(function (arg00_1) {
      return modref.NestedTyconRef(arg00_1);
    }($var129)), tycons_1), toList(delay(function () {
      return collect(function (tycon_4) {
        if (IsEntityAccessible(ncenv.amap, m, ad, modref.NestedTyconRef(tycon_4))) {
          const ttype_1 = FreshenTycon(ncenv, m, modref.NestedTyconRef(tycon_4));
          return map(function (arg0_1) {
            return new Item(5, arg0_1);
          }, ncenv.InfoReader.GetRecordOrClassFieldsOfType(null, ad, m, ttype_1));
        } else {
          return empty();
        }
      }, tycons_1);
    }))));
  }
}
export function ResolvePartialLongIdentToClassOrRecdFields(ncenv, nenv, m, ad, plid, allowObsolete) {
  return ResolvePartialLongIdentToClassOrRecdFieldsImpl(ncenv, nenv, new FullyQualifiedFlag(1), m, ad, plid, allowObsolete);
}
export function ResolvePartialLongIdentToClassOrRecdFieldsImpl(ncenv, nenv, fullyQualified, m, ad, plid, allowObsolete) {
  ResolvePartialLongIdentToClassOrRecdFieldsImpl: while (true) {
    const g = ncenv.g;
    const $var130 = plid.tail != null ? plid.head === "global" ? [0, plid.head, plid.tail] : [1] : [1];

    switch ($var130[0]) {
      case 0:
        ncenv = ncenv;
        nenv = nenv;
        fullyQualified = new FullyQualifiedFlag(0);
        m = m;
        ad = ad;
        plid = $var130[2];
        allowObsolete = allowObsolete;
        continue ResolvePartialLongIdentToClassOrRecdFieldsImpl;

      case 1:
        if (plid.tail != null) {
          const modsOrNs = PartialResolveLongIndentAsModuleOrNamespaceThen(nenv, ofArray([plid.head]), function (modref) {
            const allowObsolete_1 = !plid.tail.Equals(new List()) ? allowObsolete : false;

            if (EntityRefContainsSomethingAccessible(ncenv, m, ad, modref)) {
              return ResolvePartialLongIdentInModuleOrNamespaceForRecordFields(ncenv, nenv, m, ad, modref, plid.tail, allowObsolete_1);
            } else {
              return new List();
            }
          });
          let qualifiedFields;

          if (plid.tail.tail == null) {
            const tycons = LookupTypeNameInEnvNoArity(new FullyQualifiedFlag(1), plid.head, nenv);
            qualifiedFields = map(function (arg0) {
              return new Item(5, arg0);
            }, collect_1(function (tcref) {
              const ttype = FreshenTycon(ncenv, m, tcref);
              return ncenv.InfoReader.GetRecordOrClassFieldsOfType(null, ad, m, ttype);
            }, tycons));
          } else {
            qualifiedFields = new List();
          }

          return append(modsOrNs, qualifiedFields);
        } else {
          const iltyconNames = create_1(choose(function (tyconRef) {
            return tyconRef.IsILTycon ? tyconRef.DisplayName : null;
          }, nenv.TyconsByAccessNames(fullyQualified).Values), new Comparer(comparePrimitives));

          const mods = function (list) {
            return map(function (v) {
              return ItemForModuleOrNamespaceRef(v);
            }, list);
          }(filter($var131 => {
            var amap;
            return function (value) {
              return !value;
            }((amap = ncenv.amap, function (x) {
              return IsTyconUnseen(ad, g, amap, m, x);
            })($var131));
          }, filter(function (modref_1) {
            return EntityRefContainsSomethingAccessible(ncenv, m, ad, modref_1);
          }, filter(function (x_1) {
            const demangledName = x_1.DemangledModuleOrNamespaceName;

            if (IsInterestingModuleName(demangledName)) {
              return notFakeContainerModule(iltyconNames, demangledName);
            } else {
              return false;
            }
          }, NameMultiMapModule.range(nenv.ModulesAndNamespaces(fullyQualified))))));

          const recdTyCons = map(function (x_2) {
            return ItemOfTyconRef(ncenv, m, x_2);
          }, filter($var132 => {
            var amap_1;
            return function (value_1) {
              return !value_1;
            }((amap_1 = ncenv.amap, function (x_3) {
              return IsTyconUnseen(ad, g, amap_1, m, x_3);
            })($var132));
          }, filter(function (tcref_1) {
            return tcref_1.IsRecordTycon;
          }, filter(function (tcref_2) {
            return !(tcref_2.LogicalName.indexOf(",") >= 0);
          }, Map_2_get_Values.bind(nenv.TyconsByDemangledNameAndArity(fullyQualified))()))));
          const recdFields = toList(map_2(function (fref) {
            const typeInsts = map(function (tyar) {
              return tyar.AsType;
            }, fref.TyconRef.TyparsNoRange);
            return new Item(5, new RecdFieldInfo(0, [typeInsts, fref]));
          }, collect(function (_arg1) {
            const activePatternResult35475 = _arg1;
            return activePatternResult35475[1];
          }, nenv.eFieldLabels)));
          return append(mods, append(recdTyCons, recdFields));
        }

    }
  }
}
export function ResolveCompletionsInTypeForItem(ncenv, nenv, m, ad, statics, typ, item) {
  return delay(function () {
    var optFilter;
    var staticResInfo;
    const g = ncenv.g;
    const amap = ncenv.amap;

    switch (item.tag) {
      case 5:
        return map(function (arg0) {
          return new Item(5, arg0);
        }, filter(function (rfref) {
          return rfref.IsStatic === statics ? IsFieldInfoAccessible(ad, rfref) : false;
        }, ncenv.InfoReader.GetRecordOrClassFieldsOfType(null, ad, m, typ)));

      case 1:
        if (statics ? isAppTy(g, typ) : false) {
          const patternInput = destAppTy(g, typ);
          return map(function (ucref) {
            return new Item(1, [new UnionCaseInfo(0, [patternInput[1], ucref]), false]);
          }, filter($var133 => {
            var amap_1;
            return function (value) {
              return !value;
            }((amap_1 = ncenv.amap, function (ucref_1) {
              return IsUnionCaseUnseen(ad, g, amap_1, m, ucref_1);
            })($var133));
          }, patternInput[0].UnionCasesAsRefList));
        } else {
          return empty();
        }

      case 8:
        return map(function (arg0_1) {
          return new Item(8, arg0_1);
        }, filter(function (x) {
          return IsStandardEventInfo(ncenv.InfoReader, m, ad, x) ? x.IsStatic === statics : false;
        }, ncenv.InfoReader.GetEventInfosOfType(null, ad, m, typ)));

      case 7:
        return map(function (arg0_2) {
          return new Item(7, arg0_2);
        }, filter(function (x_1) {
          return (!x_1.IsSpecialName ? x_1.IsStatic === statics : false) ? IsILFieldInfoAccessible(g, amap, m, ad, x_1) : false;
        }, ncenv.InfoReader.GetILFieldInfosOfType(null, ad, m, typ)));

      case 14:
        if (statics) {
          return map(function (x_2) {
            return ItemOfTy(g, x_2);
          }, (optFilter = null, staticResInfo = new TypeNameResolutionStaticArgsInfo(0), function (typ_1) {
            return GetNestedTypesOfType(ad, ncenv, optFilter, staticResInfo, false, m, typ_1);
          })(typ));
        } else {
          return empty();
        }

      default:
        const pinfosIncludingUnseen = filter(function (x_3) {
          return x_3.IsStatic === statics ? IsPropInfoAccessible(g, amap, m, ad, x_3) : false;
        }, AllPropInfosOfTypeInScope(ncenv.InfoReader, nenv, null, ad, new FindMemberFlag(1), m, typ));
        const pinfoMethNames = append(map(function (pinfo) {
          return pinfo.GetterMethod.LogicalName;
        }, filter(function (pinfo_1) {
          return pinfo_1.HasGetter;
        }, pinfosIncludingUnseen)), map(function (pinfo_2) {
          return pinfo_2.SetterMethod.LogicalName;
        }, filter(function (pinfo_3) {
          return pinfo_3.HasSetter;
        }, pinfosIncludingUnseen)));
        let einfoMethNames;
        const einfos = filter(function (x_4) {
          return IsStandardEventInfo(ncenv.InfoReader, m, ad, x_4) ? x_4.IsStatic === statics : false;
        }, ncenv.InfoReader.GetEventInfosOfType(null, ad, m, typ));
        einfoMethNames = toList(delay(function () {
          return collect(function (einfo) {
            const delegateType = einfo.GetDelegateType(amap, m);
            const patternInput_1 = GetSigOfFunctionForDelegate(ncenv.InfoReader, delegateType, m, ad);

            if (slotSigHasVoidReturnTy(patternInput_1.data[0].GetSlotSig(amap, m))) {
              return append_1(singleton(einfo.AddMethod.DisplayName), delay(function () {
                return singleton(einfo.RemoveMethod.DisplayName);
              }));
            } else {
              return empty();
            }
          }, einfos);
        }));
        const suppressedMethNames = Zset.ofList(_String.order, append(pinfoMethNames, einfoMethNames));
        const pinfos = filter(function (x_5) {
          return !PropInfoIsUnseen(m, x_5);
        }, pinfosIncludingUnseen);

        const minfoFilter = function (minfo) {
          let isUnseenDueToBasicObjRules;

          if (!isObjTy(g, typ) ? !minfo.IsExtensionMember : false) {
            const matchValue = minfo.LogicalName;

            switch (matchValue) {
              case "GetType":
                isUnseenDueToBasicObjRules = false;
                break;

              case "GetHashCode":
                if (isObjTy(g, minfo.ApparentEnclosingType)) {
                  isUnseenDueToBasicObjRules = !TypeDefinitelyHasEquality(g, typ);
                } else {
                  isUnseenDueToBasicObjRules = false;
                }

                break;

              case "ToString":
                isUnseenDueToBasicObjRules = false;
                break;

              case "Equals":
                if (!isObjTy(g, minfo.ApparentEnclosingType)) {
                  isUnseenDueToBasicObjRules = false;
                } else if (minfo.IsInstance) {
                  isUnseenDueToBasicObjRules = !TypeDefinitelyHasEquality(g, typ);
                } else {
                  isUnseenDueToBasicObjRules = true;
                }

                break;

              default:
                isUnseenDueToBasicObjRules = isObjTy(g, minfo.ApparentEnclosingType);
            }
          } else {
            isUnseenDueToBasicObjRules = false;
          }

          const result = (((((((!isUnseenDueToBasicObjRules ? !minfo.IsInstance === statics : false) ? IsMethInfoAccessible(amap, m, ad, minfo) : false) ? !MethInfoIsUnseen(g, m, typ, minfo) : false) ? !minfo.IsConstructor : false) ? !minfo.IsClassConstructor : false) ? !(minfo.LogicalName === ".cctor") : false) ? !(minfo.LogicalName === ".ctor") : false) ? !suppressedMethNames.Contains_0(minfo.LogicalName) : false;
          return result;
        };

        const pinfoItems = choose(function (pinfo_4) {
          const pinfoOpt = DecodeFSharpEvent(ofArray([pinfo_4]), ad, g, ncenv, m);
          const $var134 = pinfoOpt != null ? getValue(pinfoOpt).tag === 8 ? [0, getValue(pinfoOpt).data] : [1] : [1];

          switch ($var134[0]) {
            case 0:
              if (IsStandardEventInfo(ncenv.InfoReader, m, ad, $var134[1])) {
                return pinfoOpt;
              } else {
                return null;
              }

            case 1:
              return pinfoOpt;
          }
        }, pinfos);
        return append_1(pinfoItems, delay(function () {
          if (item.tag === 10) {
            let minfos_2;

            const minfos = function (list) {
              return filter(minfoFilter, list);
            }(AllMethInfosOfTypeInScope(ncenv.InfoReader, nenv, null, ad, new FindMemberFlag(1), m, typ));

            let minfos_1;
            const addersAndRemovers = create_1(collect_1(function (_arg1) {
              const $var135 = _arg1.tag === 8 ? _arg1.data.tag === 0 ? [0, _arg1.data.data[2], _arg1.data.data[3]] : [1] : [1];

              switch ($var135[0]) {
                case 0:
                  return ofArray([$var135[1].LogicalName, $var135[2].LogicalName]);

                case 1:
                  return new List();
              }
            }, pinfoItems), new Comparer(comparePrimitives));

            if (isEmpty(addersAndRemovers, null)) {
              minfos_1 = minfos;
            } else {
              minfos_1 = filter(function (minfo_1) {
                return !addersAndRemovers.has(minfo_1.LogicalName);
              }, minfos);
            }

            minfos_2 = minfos_1;

            const partitionl = function (l, acc) {
              partitionl: while (true) {
                if (l.tail != null) {
                  const nm = l.head.LogicalName;
                  const $var181 = l.tail;
                  acc = NameMultiMapModule.add(nm, l.head, acc);
                  l = $var181;
                  continue partitionl;
                } else {
                  return acc;
                }
              }
            };

            return map(function (tupledArg) {
              return Item.MakeMethGroup(tupledArg[0], tupledArg[1]);
            }, NameMapModule.toList(partitionl(minfos_2, create(null, new Comparer(comparePrimitives)))));
          } else {
            return empty();
          }
        }));
    }
  });
}
export function ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, statics, plid, item, typ) {
  return delay(function () {
    var optFilter;
    var staticResInfo;
    const g = ncenv.g;
    const amap = ncenv.amap;

    if (plid.tail != null) {
      const rfinfos = filter(function (fref) {
        return fref.RecdField.IsStatic === statics;
      }, filter(function (fref_1) {
        return IsRecdFieldAccessible(ncenv.amap, m, ad, fref_1.RecdFieldRef);
      }, ncenv.InfoReader.GetRecordOrClassFieldsOfType(null, ad, m, typ)));
      const nestedTypes = (optFilter = plid.head, staticResInfo = new TypeNameResolutionStaticArgsInfo(0), function (typ_1) {
        return GetNestedTypesOfType(ad, ncenv, optFilter, staticResInfo, false, m, typ_1);
      })(typ);
      return append_1(collect(function (rfinfo) {
        return rfinfo.Name === plid.head ? ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, false, plid.tail, item, rfinfo.FieldType) : empty();
      }, rfinfos), delay(function () {
        var arg00_;
        var arg20_;
        var arg30_;

        const fullTypeOfPinfo = function (pinfo) {
          const rty = pinfo.GetPropertyType(amap, m);
          const rty_1 = pinfo.IsIndexer ? op_MinusMinusGreater(mkRefTupledTy(g, pinfo.GetParamTypes(amap, m)), rty) : rty;
          return rty_1;
        };

        const pinfos = filter(function (_arg1) {
          return IsPropInfoAccessible(g, amap, m, ad, _arg1);
        }, filter(function (x) {
          return x.IsStatic === statics;
        }, (arg00_ = ncenv.InfoReader, arg20_ = plid.head, arg30_ = new FindMemberFlag(0), function (arg50_) {
          return AllPropInfosOfTypeInScope(arg00_, nenv, arg20_, ad, arg30_, m, arg50_);
        })(typ)));
        return append_1(collect(function (pinfo_1) {
          return function (typ_2) {
            return ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, false, plid.tail, item, typ_2);
          }(fullTypeOfPinfo(pinfo_1));
        }, pinfos), delay(function () {
          return append_1(collect(function (einfo) {
            const tyinfo = PropTypOfEventInfo(ncenv.InfoReader, m, ad, einfo);
            return ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, false, plid.tail, item, tyinfo);
          }, ncenv.InfoReader.GetEventInfosOfType(plid.head, ad, m, typ)), delay(function () {
            return append_1(collect(function (ty) {
              return ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, statics, plid.tail, item, ty);
            }, nestedTypes), delay(function () {
              return collect(function (finfo) {
                return ((!finfo.IsSpecialName ? finfo.IsStatic === statics : false) ? IsILFieldInfoAccessible(g, amap, m, ad, finfo) : false) ? function (typ_3) {
                  return ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, false, plid.tail, item, typ_3);
                }(finfo.FieldType(amap, m)) : empty();
              }, ncenv.InfoReader.GetILFieldInfosOfType(plid.head, ad, m, typ));
            }));
          }));
        }));
      }));
    } else {
      return ResolveCompletionsInTypeForItem(ncenv, nenv, m, ad, statics, typ, item);
    }
  });
}
export function ResolvePartialLongIdentInModuleOrNamespaceForItem(ncenv, nenv, m, ad, modref, plid, item) {
  const g = ncenv.g;
  const mty = modref.ModuleOrNamespaceType;
  return delay(function () {
    if (plid.tail != null) {
      return append_1((() => {
        const matchValue = tryFind(plid.head, mty.ModulesAndNamespacesByDemangledName);
        const $var136 = matchValue != null ? !IsTyconUnseenObsoleteSpec(ad, g, ncenv.amap, m, modref.NestedTyconRef(getValue(matchValue)), true) ? [0, getValue(matchValue)] : [1] : [1];

        switch ($var136[0]) {
          case 0:
            return ResolvePartialLongIdentInModuleOrNamespaceForItem(ncenv, nenv, m, ad, modref.NestedTyconRef($var136[1]), plid.tail, item);

          case 1:
            return empty();
        }
      })(), delay(function () {
        return collect(function (tycon) {
          const tcref = modref.NestedTyconRef(tycon);

          if (!IsTyconUnseenObsoleteSpec(ad, g, ncenv.amap, m, tcref, true)) {
            return function (typ) {
              return ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, true, plid.tail, item, typ);
            }(generalizedTyconRef(tcref));
          } else {
            return empty();
          }
        }, LookupTypeNameInEntityNoArity(m, plid.head, modref.ModuleOrNamespaceType));
      }));
    } else {
      switch (item.tag) {
        case 0:
          return map(function (arg0) {
            return new Item(0, arg0);
          }, filter($var137 => function (value) {
            return !value;
          }(function (v) {
            return IsValUnseen(ad, g, m, v);
          }($var137)), filter(function (v_1) {
            return !v_1.IsMember;
          }, choose(function (vspec) {
            return TryMkValRefInModRef(modref, vspec);
          }, toList(mty.AllValsAndMembers)))));

        case 1:
          return map(function (x) {
            return new Item(1, [GeneralizeUnionCaseRef(x), false]);
          }, filter($var138 => {
            var amap;
            return function (value_1) {
              return !value_1;
            }((amap = ncenv.amap, function (ucref) {
              return IsUnionCaseUnseen(ad, g, amap, m, ucref);
            })($var138));
          }, UnionCaseRefsInModuleOrNamespace(modref)));

        case 3:
          return map(function (arg0_1) {
            return new Item(3, arg0_1);
          }, filter(function (apref) {
            return !function (v_2) {
              return IsValUnseen(ad, g, m, v_2);
            }(apref.ActivePatternVal);
          }, NameMapModule.range(ActivePatternElemsOfModuleOrNamespace(modref))));

        case 4:
          return map(function (arg0_2) {
            return new Item(4, arg0_2);
          }, filter($var139 => {
            var amap_1;
            return function (value_2) {
              return !value_2;
            }((amap_1 = ncenv.amap, function (x_1) {
              return IsTyconUnseen(ad, g, amap_1, m, x_1);
            })($var139));
          }, map(function (arg00) {
            return modref.NestedTyconRef(arg00);
          }, NameMapModule.range(mty.ExceptionDefinitionsByDemangledName))));

        default:
          const ilTyconNames = create_1(choose(function (tycon_1) {
            return tycon_1.IsILTycon ? tycon_1.DisplayName : null;
          }, mty.TypesByAccessNames.Values), new Comparer(comparePrimitives));
          return append_1(function (list) {
            return map(function (v_3) {
              return ItemForModuleOrNamespaceRef(v_3);
            }, list);
          }(filter(function (modref_1) {
            return EntityRefContainsSomethingAccessible(ncenv, m, ad, modref_1);
          }, filter($var140 => {
            var amap_2;
            return function (value_3) {
              return !value_3;
            }((amap_2 = ncenv.amap, function (x_2) {
              return IsTyconUnseen(ad, g, amap_2, m, x_2);
            })($var140));
          }, map(function (arg00_1) {
            return modref.NestedTyconRef(arg00_1);
          }, filter(function (x_3) {
            const demangledName = x_3.DemangledModuleOrNamespaceName;

            if (notFakeContainerModule(ilTyconNames, demangledName)) {
              return IsInterestingModuleName(demangledName);
            } else {
              return false;
            }
          }, NameMapModule.range(mty.ModulesAndNamespacesByDemangledName)))))), delay(function () {
            const tycons = filter(function (tycon_2) {
              return !IsTyconUnseen(ad, g, ncenv.amap, m, modref.NestedTyconRef(tycon_2));
            }, filter(function (tcref_1) {
              return !(tcref_1.LogicalName.indexOf(",") >= 0);
            }, mty.TypeDefinitions));
            return append_1(map($var141 => function (x_4) {
              return ItemOfTyconRef(ncenv, m, x_4);
            }(function (arg00_2) {
              return modref.NestedTyconRef(arg00_2);
            }($var141)), tycons), delay(function () {
              return collect_1($var142 => function (tcref_2) {
                return InfosForTyconConstructors(ncenv, m, ad, tcref_2);
              }(function (arg00_3) {
                return modref.NestedTyconRef(arg00_3);
              }($var142)), tycons);
            }));
          }));
      }
    }
  });
}
export function PartialResolveLookupInModuleOrNamespaceAsModuleOrNamespaceThenLazy($var182, $var183, $var184) {
  PartialResolveLookupInModuleOrNamespaceAsModuleOrNamespaceThenLazy: while (true) {
    const f = $var182;
    const plid = $var183;
    const modref = $var184;
    const mty = modref.ModuleOrNamespaceType;

    if (plid.tail != null) {
      const matchValue = tryFind(plid.head, mty.ModulesAndNamespacesByDemangledName);

      if (matchValue == null) {
        return empty();
      } else {
        $var182 = f;
        $var183 = plid.tail;
        $var184 = modref.NestedTyconRef(getValue(matchValue));
        continue PartialResolveLookupInModuleOrNamespaceAsModuleOrNamespaceThenLazy;
      }
    } else {
      return f(modref);
    }
  }
}
export function PartialResolveLongIndentAsModuleOrNamespaceThenLazy(nenv, plid, f) {
  return delay(function () {
    if (plid.tail == null) {
      return empty();
    } else {
      const matchValue = tryFind(plid.head, nenv.eModulesAndNamespaces);

      if (matchValue == null) {
        return empty();
      } else {
        return collect(function (modref) {
          return PartialResolveLookupInModuleOrNamespaceAsModuleOrNamespaceThenLazy(f, plid.tail, modref);
        }, getValue(matchValue));
      }
    }
  });
}
export function GetCompletionForItem(ncenv, nenv, m, ad, plid, item) {
  return delay(function () {
    const g = ncenv.g;

    if (plid.tail == null) {
      return append_1(collect(function (uitem) {
        return uitem.tag === 22 ? empty() : !ItemIsUnseen(ad, g, ncenv.amap, m, uitem) ? singleton(uitem) : empty();
      }, Map_2_get_Values.bind(nenv.eUnqualifiedItems)()), delay(function () {
        switch (item.tag) {
          case 18:
            const ilTyconNames = create_1(choose(function (tyconRef) {
              return tyconRef.IsILTycon ? tyconRef.DisplayName : null;
            }, nenv.TyconsByAccessNames(new FullyQualifiedFlag(1)).Values), new Comparer(comparePrimitives));
            return collect(function (ns) {
              const demangledName = ns.DemangledModuleOrNamespaceName;

              if (((IsInterestingModuleName(demangledName) ? notFakeContainerModule(ilTyconNames, demangledName) : false) ? EntityRefContainsSomethingAccessible(ncenv, m, ad, ns) : false) ? !IsTyconUnseen(ad, g, ncenv.amap, m, ns) : false) {
                return singleton(ItemForModuleOrNamespaceRef(ns));
              } else {
                return empty();
              }
            }, NameMultiMapModule.range(nenv.ModulesAndNamespaces(new FullyQualifiedFlag(1))));

          case 14:
            return collect(function (tcref) {
              return ((!tcref.IsExceptionDecl ? !(tcref.LogicalName.indexOf(",") >= 0) : false) ? !IsTyconUnseen(ad, g, ncenv.amap, m, tcref) : false) ? singleton(ItemOfTyconRef(ncenv, m, tcref)) : empty();
            }, Map_2_get_Values.bind(nenv.TyconsByDemangledNameAndArity(new FullyQualifiedFlag(1)))());

          case 3:
            return collect(function (pitem) {
              return pitem.tag === 3 ? singleton(pitem) : empty();
            }, NameMapModule.range(nenv.ePatItems));

          case 13:
          case 12:
          case 11:
          case 22:
            return collect(function (tcref_1) {
              return !IsTyconUnseen(ad, g, ncenv.amap, m, tcref_1) ? InfosForTyconConstructors(ncenv, m, ad, tcref_1) : empty();
            }, Map_2_get_Values.bind(nenv.TyconsByDemangledNameAndArity(new FullyQualifiedFlag(1)))());

          default:
            return empty();
        }
      }));
    } else if (plid.head === "global") {
      return GetCompletionForItem(ncenv, nenv, m, ad, plid.tail, item);
    } else {
      return append_1(PartialResolveLongIndentAsModuleOrNamespaceThenLazy(nenv, ofArray([plid.head]), function (modref) {
        return EntityRefContainsSomethingAccessible(ncenv, m, ad, modref) ? ResolvePartialLongIdentInModuleOrNamespaceForItem(ncenv, nenv, m, ad, modref, plid.tail, item) : empty();
      }), delay(function () {
        let patternInput;

        if (nenv.eUnqualifiedItems.has(plid.head)) {
          const v = nenv.eUnqualifiedItems.get(plid.head);

          if (v.tag === 0) {
            const typ = v.data.Type;
            const typ_1 = (v.data.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(0)) ? isRefCellTy(g, typ) : false) ? destRefCellTy(g, typ) : typ;
            patternInput = [ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, false, plid.tail, item, typ_1), true];
          } else {
            patternInput = [empty(), false];
          }
        } else {
          patternInput = [empty(), false];
        }

        return append_1(patternInput[0], delay(function () {
          return !patternInput[1] ? collect(function (tcref_2) {
            const tcref_3 = ResolveNestedTypeThroughAbbreviation(ncenv, tcref_2, m);
            const typ_2 = FreshenTycon(ncenv, m, tcref_3);
            return ResolvePartialLongIdentInTypeForItem(ncenv, nenv, m, ad, true, plid.tail, item, typ_2);
          }, LookupTypeNameInEnvNoArity(new FullyQualifiedFlag(1), plid.head, nenv)) : empty();
        }));
      }));
    }
  });
}
export function IsItemResolvable(ncenv, nenv, m, ad, plid, item) {
  try {
    return function () {
      var arg00_;
      return exists((arg00_ = ncenv.g, function (arg20_) {
        return ItemsAreEffectivelyEqual(arg00_, item, arg20_);
      }), GetCompletionForItem(ncenv, nenv, m, ad, plid, item));
    }();
  } catch (matchValue) {
    if (matchValue instanceof UnresolvedPathReferenceNoRange) {
      return false;
    } else {
      throw matchValue;
    }
  }
}
export function GetVisibleNamespacesAndModulesAtPoint(ncenv, nenv, m, ad) {
  try {
    return function () {
      const ilTyconNames = create_1(choose(function (tyconRef) {
        return tyconRef.IsILTycon ? tyconRef.DisplayName : null;
      }, nenv.TyconsByAccessNames(new FullyQualifiedFlag(1)).Values), new Comparer(comparePrimitives));
      return filter(function (x) {
        const demangledName = x.DemangledModuleOrNamespaceName;

        if ((IsInterestingModuleName(demangledName) ? notFakeContainerModule(ilTyconNames, demangledName) : false) ? EntityRefContainsSomethingAccessible(ncenv, m, ad, x) : false) {
          return !IsTyconUnseen(ad, ncenv.g, ncenv.amap, m, x);
        } else {
          return false;
        }
      }, NameMultiMapModule.range(nenv.ModulesAndNamespaces(new FullyQualifiedFlag(1))));
    }();
  } catch (matchValue) {
    if (matchValue instanceof UnresolvedPathReferenceNoRange) {
      return new List();
    } else {
      throw matchValue;
    }
  }
}