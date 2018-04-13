import CurriedLambda from "../fable-core/CurriedLambda";
import { fromBits } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { SynTypar, ScopedPragma, QualifiedNameOfFile, mkSynId, SequencePointInfoForFinally, SequencePointInfoForWith, SequencePointInfoForTry, SequencePointInfoForForLoop, SequencePointInfoForWhileLoop, SequencePointInfoForSeq, SequencePointInfoForBinding, SequencePointInfoForTarget, MemberKind, MemberFlags, textOfPath, ident, XmlDoc, Ident, TyparStaticReq, StableNiceNameGenerator, NiceNameGenerator } from "./ast";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Interface, toString, Any, GenericParam, Option, Array as _Array, Tuple, makeGeneric, Unit, Function as _Function, compareRecords, equalsRecords, compareUnions, equals, comparePrimitives } from "../fable-core/Util";
import { ActivePatternInfo, DemangleOperatorName, ChopPropertyName, IsMangledGenericName, DemangleGenericTypeName, NameArityPair } from "./PrettyNaming";
import { ILInstr, ILModuleDef, ILMethodRef, ILTypeDef, ILType, mkRefForNestedILTypeDef, mkILTySpec, mkILTy, ILBoxity, ILTypeRef, ILScopeRef } from "../absil/il";
import { reverse, filter, ofArray, append, map } from "../fable-core/List";
import List from "../fable-core/List";
import { ValueOption, MultiMapModule, Map$60$2$2E$get_Empty$2E$Static as Map_2_get_Empty_Static, Map$60$2$2E$AddAndMarkAsCollapsible as Map_2_AddAndMarkAsCollapsible, LayeredMultiMap, NameMultiMapModule, NameMapModule, LazyWithContext, String as _String, List as List_1 } from "../absil/illib";
import { range } from "./range";
import { newCache, nullableSlotFull, cache } from "./lib";
import { defaultArg, makeSome, getValue } from "../fable-core/Option";
import { printf, toText, join } from "../fable-core/String";
import { fold, forAll, exists, tryFind as tryFind_1, foldBack, collect, filter as filter_1, empty, singleton, append as append_1, delay, toList, replicate } from "../fable-core/Seq";
import { UnresolvedPathReferenceNoRange, UnresolvedReferenceNoRange, errorR, InternalError, Error as _Error, error } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import { create, tryFind } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { IlxUnionRef } from "../absil/ilx";
import { QueueListModule, QueueList } from "./QueueList";
import Comparer from "../fable-core/Comparer";
import { Rational } from "./rational";
import { Microsoft } from "../fcs-fable/adapters";
import { Set as _Set } from "../utils/TaggedCollections";
import Choice from "../fable-core/Choice";
import Lazy from "../fable-core/Lazy";
export const newUnique = CurriedLambda((() => {
  const i = {
    contents: fromBits(0, 0, false)
  };
  return function () {
    i.contents = i.contents.add(fromBits(1, 0, false));
    return i.contents;
  };
})());
export const newStamp = CurriedLambda((() => {
  const i = {
    contents: fromBits(0, 0, false)
  };
  return function () {
    i.contents = i.contents.add(fromBits(1, 0, false));
    return i.contents;
  };
})());
export const globalNng = new NiceNameGenerator();
export const globalStableNameGenerator = new StableNiceNameGenerator();
export class ValInline {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValInline",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["PseudoVal"], ["Always"], ["Optional"], ["Never"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

  get MustInline() {
    const $var1 = this.tag === 1 ? [0] : this.tag === 2 ? [1] : this.tag === 3 ? [1] : [0];

    switch ($var1[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValInline", ValInline);
export class ValRecursiveScopeInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValRecursiveScopeInfo",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ValInRecScope", "boolean"], ["ValNotInRecScope"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValRecursiveScopeInfo", ValRecursiveScopeInfo);
export class ValMutability {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValMutability",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Immutable"], ["Mutable"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValMutability", ValMutability);
export class TyparDynamicReq {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyparDynamicReq",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["No"], ["Yes"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyparDynamicReq", TyparDynamicReq);
export class ValBaseOrThisInfo {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValBaseOrThisInfo",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CtorThisVal"], ["BaseVal"], ["NormalVal"], ["MemberThisVal"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValBaseOrThisInfo", ValBaseOrThisInfo);
export class ValFlags {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValFlags",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        flags: Long
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(flags) {
    this.flags = flags;
  }

  static [".ctor"](recValInfo, baseOrThis, isCompGen, inlineInfo, isMutable, isModuleOrMemberBinding, isExtensionMember, isIncrClassSpecialMember, isTyFunc, allowTypeInst, isGeneratedEventVal) {
    const flags = (baseOrThis.tag === 0 ? fromBits(2, 0, false) : baseOrThis.tag === 2 ? fromBits(4, 0, false) : baseOrThis.tag === 3 ? fromBits(6, 0, false) : fromBits(0, 0, false)).or(isCompGen ? fromBits(8, 0, false) : fromBits(0, 0, false)).or(inlineInfo.tag === 1 ? fromBits(16, 0, false) : inlineInfo.tag === 2 ? fromBits(32, 0, false) : inlineInfo.tag === 3 ? fromBits(48, 0, false) : fromBits(0, 0, false)).or(isMutable.tag === 1 ? fromBits(64, 0, false) : fromBits(0, 0, false)).or(isModuleOrMemberBinding ? fromBits(128, 0, false) : fromBits(0, 0, false)).or(isExtensionMember ? fromBits(256, 0, false) : fromBits(0, 0, false)).or(isIncrClassSpecialMember ? fromBits(512, 0, false) : fromBits(0, 0, false)).or(isTyFunc ? fromBits(1024, 0, false) : fromBits(0, 0, false)).or(recValInfo.tag === 0 ? recValInfo.data ? fromBits(2048, 0, false) : fromBits(4096, 0, false) : fromBits(0, 0, false)).or(allowTypeInst ? fromBits(16384, 0, false) : fromBits(0, 0, false)).or(isGeneratedEventVal ? fromBits(131072, 0, false) : fromBits(0, 0, false));
    return new ValFlags(flags);
  }

  get BaseOrThisInfo() {
    const matchValue = this.flags.and(fromBits(6, 0, false));

    if (matchValue.Equals(fromBits(0, 0, false))) {
      return new ValBaseOrThisInfo(1);
    } else if (matchValue.Equals(fromBits(2, 0, false))) {
      return new ValBaseOrThisInfo(0);
    } else if (matchValue.Equals(fromBits(4, 0, false))) {
      return new ValBaseOrThisInfo(2);
    } else if (matchValue.Equals(fromBits(6, 0, false))) {
      return new ValBaseOrThisInfo(3);
    } else {
      throw new Error("unreachable");
    }
  }

  get IsCompilerGenerated() {
    return !this.flags.and(fromBits(8, 0, false)).Equals(fromBits(0, 0, false));
  }

  SetIsCompilerGenerated(isCompGen) {
    const flags = this.flags.and(fromBits(8, 0, false).not()).or(isCompGen ? fromBits(8, 0, false) : fromBits(0, 0, false));
    return new ValFlags(flags);
  }

  get InlineInfo() {
    const matchValue = this.flags.and(fromBits(48, 0, false));

    if (matchValue.Equals(fromBits(0, 0, false))) {
      return new ValInline(0);
    } else if (matchValue.Equals(fromBits(16, 0, false))) {
      return new ValInline(1);
    } else if (matchValue.Equals(fromBits(32, 0, false))) {
      return new ValInline(2);
    } else if (matchValue.Equals(fromBits(48, 0, false))) {
      return new ValInline(3);
    } else {
      throw new Error("unreachable");
    }
  }

  get MutabilityInfo() {
    const matchValue = this.flags.and(fromBits(64, 0, false));

    if (matchValue.Equals(fromBits(0, 0, false))) {
      return new ValMutability(0);
    } else if (matchValue.Equals(fromBits(64, 0, false))) {
      return new ValMutability(1);
    } else {
      throw new Error("unreachable");
    }
  }

  get IsMemberOrModuleBinding() {
    const matchValue = this.flags.and(fromBits(128, 0, false));

    if (matchValue.Equals(fromBits(0, 0, false))) {
      return false;
    } else if (matchValue.Equals(fromBits(128, 0, false))) {
      return true;
    } else {
      throw new Error("unreachable");
    }
  }

  get SetIsMemberOrModuleBinding() {
    return new ValFlags(this.flags.or(fromBits(128, 0, false)));
  }

  get IsExtensionMember() {
    return !this.flags.and(fromBits(256, 0, false)).Equals(fromBits(0, 0, false));
  }

  get IsIncrClassSpecialMember() {
    return !this.flags.and(fromBits(512, 0, false)).Equals(fromBits(0, 0, false));
  }

  get IsTypeFunction() {
    return !this.flags.and(fromBits(1024, 0, false)).Equals(fromBits(0, 0, false));
  }

  get RecursiveValInfo() {
    const matchValue = this.flags.and(fromBits(6144, 0, false));

    if (matchValue.Equals(fromBits(0, 0, false))) {
      return new ValRecursiveScopeInfo(1);
    } else if (matchValue.Equals(fromBits(2048, 0, false))) {
      return new ValRecursiveScopeInfo(0, true);
    } else if (matchValue.Equals(fromBits(4096, 0, false))) {
      return new ValRecursiveScopeInfo(0, false);
    } else {
      throw new Error("unreachable");
    }
  }

  SetRecursiveValInfo(recValInfo) {
    const flags = this.flags.and(fromBits(6144, 0, false).not()).or(recValInfo.tag === 0 ? recValInfo.data ? fromBits(2048, 0, false) : fromBits(4096, 0, false) : fromBits(0, 0, false));
    return new ValFlags(flags);
  }

  get MakesNoCriticalTailcalls() {
    return !this.flags.and(fromBits(8192, 0, false)).Equals(fromBits(0, 0, false));
  }

  get SetMakesNoCriticalTailcalls() {
    return new ValFlags(this.flags.or(fromBits(8192, 0, false)));
  }

  get PermitsExplicitTypeInstantiation() {
    return !this.flags.and(fromBits(16384, 0, false)).Equals(fromBits(0, 0, false));
  }

  get HasBeenReferenced() {
    return !this.flags.and(fromBits(32768, 0, false)).Equals(fromBits(0, 0, false));
  }

  get SetHasBeenReferenced() {
    return new ValFlags(this.flags.or(fromBits(32768, 0, false)));
  }

  get IsCompiledAsStaticPropertyWithoutField() {
    return !this.flags.and(fromBits(65536, 0, false)).Equals(fromBits(0, 0, false));
  }

  get SetIsCompiledAsStaticPropertyWithoutField() {
    return new ValFlags(this.flags.or(fromBits(65536, 0, false)));
  }

  get IsGeneratedEventVal() {
    return !this.flags.and(fromBits(131072, 0, false)).Equals(fromBits(0, 0, false));
  }

  get IsFixed() {
    return !this.flags.and(fromBits(262144, 0, false)).Equals(fromBits(0, 0, false));
  }

  get SetIsFixed() {
    return new ValFlags(this.flags.or(fromBits(262144, 0, false)));
  }

  get PickledBits() {
    return this.flags.and(fromBits(104448, 0, false).not());
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValFlags", ValFlags);
export class TyparKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyparKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Type"], ["Measure"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

  get AttrName() {
    return this.tag === 1 ? "Measure" : null;
  }

  ToString() {
    return this.tag === 1 ? "measure" : "type";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyparKind", TyparKind);
export class TyparRigidity {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyparRigidity",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Rigid"], ["WillBeRigid"], ["WarnIfNotRigid"], ["Flexible"], ["Anon"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

  get ErrorIfUnified() {
    return this.tag === 0 ? true : false;
  }

  get WarnIfUnified() {
    const $var2 = this.tag === 1 ? [0] : this.tag === 2 ? [0] : [1];

    switch ($var2[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  get WarnIfMissingConstraint() {
    return this.tag === 1 ? true : false;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyparRigidity", TyparRigidity);
export class TyparFlags {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyparFlags",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        flags: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(flags) {
    this.flags = flags | 0;
  }

  static [".ctor"](kind, rigidity, isFromError, isCompGen, staticReq, dynamicReq, equalityDependsOn, comparisonDependsOn) {
    return new TyparFlags((isFromError ? 2 : 0) | (isCompGen ? 4 : 0) | (staticReq.tag === 1 ? 8 : 0) | (() => {
      switch (rigidity.tag) {
        case 1:
          return 32;

        case 2:
          return 64;

        case 3:
          return 96;

        case 4:
          return 128;

        default:
          return 0;
      }
    })() | (kind.tag === 1 ? 256 : 0) | (comparisonDependsOn ? 512 : 0) | (dynamicReq.tag === 1 ? 1024 : 0) | (equalityDependsOn ? 2048 : 0));
  }

  get IsFromError() {
    return (this.flags & 2) !== 0;
  }

  get IsCompilerGenerated() {
    return (this.flags & 4) !== 0;
  }

  get StaticReq() {
    const matchValue = this.flags & 8 | 0;

    if (matchValue === 0) {
      return new TyparStaticReq(0);
    } else if (matchValue === 8) {
      return new TyparStaticReq(1);
    } else {
      throw new Error("unreachable");
    }
  }

  get Rigidity() {
    const matchValue = this.flags & 224 | 0;

    switch (matchValue) {
      case 0:
        return new TyparRigidity(0);

      case 32:
        return new TyparRigidity(1);

      case 64:
        return new TyparRigidity(2);

      case 96:
        return new TyparRigidity(3);

      case 128:
        return new TyparRigidity(4);

      default:
        throw new Error("unreachable");
    }
  }

  get Kind() {
    const matchValue = this.flags & 4352 | 0;

    if (matchValue === 0) {
      return new TyparKind(0);
    } else if (matchValue === 256) {
      return new TyparKind(1);
    } else {
      throw new Error("unreachable");
    }
  }

  get ComparisonConditionalOn() {
    return (this.flags & 512) !== 0;
  }

  get DynamicReq() {
    const matchValue = this.flags & 1024 | 0;

    if (matchValue === 0) {
      return new TyparDynamicReq(0);
    } else if (matchValue === 1024) {
      return new TyparDynamicReq(1);
    } else {
      throw new Error("unreachable");
    }
  }

  get EqualityConditionalOn() {
    return (this.flags & 2048) !== 0;
  }

  get PickledBits() {
    return this.flags;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyparFlags", TyparFlags);
export class EntityFlags {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.EntityFlags",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        flags: Long
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(flags) {
    this.flags = flags;
  }

  static [".ctor"](usesPrefixDisplay, isModuleOrNamespace, preEstablishedHasDefaultCtor, hasSelfReferentialCtor, isStructRecordOrUnionType) {
    return new EntityFlags((isModuleOrNamespace ? fromBits(1, 0, false) : fromBits(0, 0, false)).or(usesPrefixDisplay ? fromBits(2, 0, false) : fromBits(0, 0, false)).or(preEstablishedHasDefaultCtor ? fromBits(4, 0, false) : fromBits(0, 0, false)).or(hasSelfReferentialCtor ? fromBits(8, 0, false) : fromBits(0, 0, false)).or(isStructRecordOrUnionType ? fromBits(32, 0, false) : fromBits(0, 0, false)));
  }

  get IsModuleOrNamespace() {
    return !this.flags.and(fromBits(1, 0, false)).Equals(fromBits(0, 0, false));
  }

  get IsPrefixDisplay() {
    return !this.flags.and(fromBits(2, 0, false)).Equals(fromBits(0, 0, false));
  }

  get PreEstablishedHasDefaultConstructor() {
    return !this.flags.and(fromBits(4, 0, false)).Equals(fromBits(0, 0, false));
  }

  get HasSelfReferentialConstructor() {
    return !this.flags.and(fromBits(8, 0, false)).Equals(fromBits(0, 0, false));
  }

  get IsStructRecordOrUnionType() {
    return !this.flags.and(fromBits(32, 0, false)).Equals(fromBits(0, 0, false));
  }

  static get ReservedBitForPickleFormatTyconReprFlag() {
    return fromBits(16, 0, false);
  }

  get PickledBits() {
    return this.flags.and(fromBits(4, 0, false).not());
  }

}
setType("Microsoft.FSharp.Compiler.Tast.EntityFlags", EntityFlags);
export const unassignedTyparName = "?";
export class UndefinedName extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, UndefinedName.prototype);
    this.Data0 = data0 | 0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.UndefinedName",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "number",
        Data1: _Function(["string", "string"]),
        Data2: Ident,
        Data3: _Function([Unit, makeGeneric(Set, {
          T: "string"
        })])
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.UndefinedName", UndefinedName);
export class InternalUndefinedItemRef extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, InternalUndefinedItemRef.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.InternalUndefinedItemRef",
      interfaces: ["FSharpException"],
      properties: {
        Data0: _Function([Tuple(["string", "string", "string"]), Tuple(["number", "string"])]),
        Data1: "string",
        Data2: "string",
        Data3: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.InternalUndefinedItemRef", InternalUndefinedItemRef);
export function KeyTyconByDemangledNameAndArity(nm, typars, x) {
  return [new NameArityPair(0, [DemangleGenericTypeName(nm), typars.length]), x];
}
export function KeyTyconByAccessNames(nm, x) {
  if (IsMangledGenericName(nm)) {
    const dnm = DemangleGenericTypeName(nm);
    return [[nm, x], [dnm, x]];
  } else {
    return [[nm, x]];
  }
}
export class ModuleOrNamespaceKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["FSharpModuleWithSuffix"], ["ModuleOrType"], ["Namespace"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceKind", ModuleOrNamespaceKind);
export function getNameOfScopeRef(sref) {
  if (sref.tag === 1) {
    return sref.data.Name;
  } else if (sref.tag === 2) {
    return sref.data.Name;
  } else {
    return "<local>";
  }
}
export class PublicPath {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.PublicPath",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["PubPath", _Array("string")]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get EnclosingPath() {
    return this.data.slice(0, this.data.length - 2 + 1);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.PublicPath", PublicPath);
export class CompilationPath {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.CompilationPath",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CompPath", ILScopeRef, makeGeneric(List, {
        T: Tuple(["string", ModuleOrNamespaceKind])
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get ILScopeRef() {
    return this.data[0];
  }

  get AccessPath() {
    return this.data[1];
  }

  get MangledPath() {
    return map(tuple => tuple[0], this.AccessPath);
  }

  NestedPublicPath(id) {
    return new PublicPath(0, Array.from(this.MangledPath).concat([id.idText]));
  }

  get ParentCompPath() {
    const patternInput = List_1.frontAndBack(this.AccessPath);
    return new CompilationPath(0, [this.ILScopeRef, patternInput[0]]);
  }

  NestedCompPath(n, modKind) {
    return new CompilationPath(0, [this.ILScopeRef, append(this.AccessPath, ofArray([[n, modKind]]))]);
  }

  get DemangledPath() {
    return map(tupledArg => ((arg00, arg10) => CompilationPath.DemangleEntityName(arg00, arg10))(tupledArg[0], tupledArg[1]), this.AccessPath);
  }

  static DemangleEntityName(nm, k) {
    if (k.tag === 0) {
      return _String.dropSuffix(nm, "Module");
    } else {
      return nm;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Tast.CompilationPath", CompilationPath);
export class EntityOptionalData {
  constructor(entity_compiled_name, entity_other_range, entity_kind, entity_xmldoc, entity_xmldocsig, entity_tycon_abbrev, entity_tycon_repr_accessibility, entity_accessiblity, entity_exn_info) {
    this.entity_compiled_name = entity_compiled_name;
    this.entity_other_range = entity_other_range;
    this.entity_kind = entity_kind;
    this.entity_xmldoc = entity_xmldoc;
    this.entity_xmldocsig = entity_xmldocsig;
    this.entity_tycon_abbrev = entity_tycon_abbrev;
    this.entity_tycon_repr_accessibility = entity_tycon_repr_accessibility;
    this.entity_accessiblity = entity_accessiblity;
    this.entity_exn_info = entity_exn_info;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.EntityOptionalData",
      interfaces: ["FSharpRecord"],
      properties: {
        entity_compiled_name: Option("string"),
        entity_other_range: Option(Tuple([range, "boolean"])),
        entity_kind: TyparKind,
        entity_xmldoc: XmlDoc,
        entity_xmldocsig: "string",
        entity_tycon_abbrev: Option(TType),
        entity_tycon_repr_accessibility: Accessibility,
        entity_accessiblity: Accessibility,
        entity_exn_info: ExceptionInfo
      }
    };
  }

  ToString() {
    return "EntityOptionalData(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.EntityOptionalData", EntityOptionalData);
export class Entity {
  constructor(entity_typars, entity_flags, entity_stamp, entity_logical_name, entity_range, entity_attribs, entity_tycon_repr, entity_tycon_tcaug, entity_modul_contents, entity_pubpath, entity_cpath, entity_il_repr_cache, entity_opt_data) {
    this.entity_typars = entity_typars;
    this.entity_flags = entity_flags;
    this.entity_stamp = entity_stamp;
    this.entity_logical_name = entity_logical_name;
    this.entity_range = entity_range;
    this.entity_attribs = entity_attribs;
    this.entity_tycon_repr = entity_tycon_repr;
    this.entity_tycon_tcaug = entity_tycon_tcaug;
    this.entity_modul_contents = entity_modul_contents;
    this.entity_pubpath = entity_pubpath;
    this.entity_cpath = entity_cpath;
    this.entity_il_repr_cache = entity_il_repr_cache;
    this.entity_opt_data = entity_opt_data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Entity",
      interfaces: ["FSharpRecord"],
      properties: {
        entity_typars: makeGeneric(LazyWithContext, {
          T: makeGeneric(List, {
            T: Typar
          }),
          ctxt: range
        }),
        entity_flags: EntityFlags,
        entity_stamp: Long,
        entity_logical_name: "string",
        entity_range: range,
        entity_attribs: makeGeneric(List, {
          T: Attrib
        }),
        entity_tycon_repr: TyconRepresentation,
        entity_tycon_tcaug: TyconAugmentation,
        entity_modul_contents: makeGeneric(MaybeLazy, {
          T: ModuleOrNamespaceType
        }),
        entity_pubpath: Option(PublicPath),
        entity_cpath: Option(CompilationPath),
        entity_il_repr_cache: makeGeneric(cache, {
          T: CompiledTypeRepr
        }),
        entity_opt_data: Option(EntityOptionalData)
      }
    };
  }

  static get EmptyEntityOptData() {
    return new EntityOptionalData(null, null, new TyparKind(0), XmlDoc.Empty, "", null, new Accessibility(0, new List()), new Accessibility(0, new List()), new ExceptionInfo(3));
  }

  get LogicalName() {
    return this.entity_logical_name;
  }

  get CompiledName() {
    const matchValue = this.entity_opt_data;
    const $var3 = matchValue != null ? getValue(matchValue).entity_compiled_name != null ? [0, getValue(getValue(matchValue).entity_compiled_name)] : [1] : [1];

    switch ($var3[0]) {
      case 0:
        return $var3[1];

      case 1:
        return this.LogicalName;
    }
  }

  get EntityCompiledName() {
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).entity_compiled_name;
    } else {
      return null;
    }
  }

  SetCompiledName(name) {
    var inputRecord;
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      getValue(matchValue).entity_compiled_name = name;
    } else {
      this.entity_opt_data = (inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(name, inputRecord.entity_other_range, inputRecord.entity_kind, inputRecord.entity_xmldoc, inputRecord.entity_xmldocsig, inputRecord.entity_tycon_abbrev, inputRecord.entity_tycon_repr_accessibility, inputRecord.entity_accessiblity, inputRecord.entity_exn_info));
    }
  }

  get DisplayName() {
    return this.GetDisplayName(false, false);
  }

  get DisplayNameWithStaticParametersAndUnderscoreTypars() {
    return this.GetDisplayName(true, true);
  }

  get DisplayNameWithStaticParameters() {
    return this.GetDisplayName(true, false);
  }

  GetDisplayName(withStaticParameters, withUnderscoreTypars) {
    const nm = this.LogicalName;

    const getName = () => {
      const matchValue = this.TyparsNoRange;

      if (matchValue.tail == null) {
        return nm;
      } else {
        const nm_1 = DemangleGenericTypeName(nm);

        if (withUnderscoreTypars ? !(matchValue.tail == null) : false) {
          return nm_1 + "<" + join(",", Array.from(replicate(matchValue.length, "_"))) + ">";
        } else {
          return nm_1;
        }
      }
    };

    withStaticParameters;
    return getName();
  }

  get Range() {
    return this.entity_range;
  }

  get DefinitionRange() {
    const matchValue = this.entity_opt_data;
    const $var4 = matchValue != null ? getValue(matchValue).entity_other_range != null ? getValue(getValue(matchValue).entity_other_range)[1] ? [0, getValue(getValue(matchValue).entity_other_range)[0]] : [1] : [1] : [1];

    switch ($var4[0]) {
      case 0:
        return $var4[1];

      case 1:
        return this.Range;
    }
  }

  get SigRange() {
    const matchValue = this.entity_opt_data;
    const $var5 = matchValue != null ? getValue(matchValue).entity_other_range != null ? getValue(getValue(matchValue).entity_other_range)[1] ? [1] : [0, getValue(getValue(matchValue).entity_other_range)[0]] : [1] : [1];

    switch ($var5[0]) {
      case 0:
        return $var5[1];

      case 1:
        return this.Range;
    }
  }

  SetOtherRange(m) {
    var inputRecord;
    var entity_other_range;
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      getValue(matchValue).entity_other_range = m;
    } else {
      this.entity_opt_data = (inputRecord = Entity.EmptyEntityOptData, entity_other_range = m, new EntityOptionalData(inputRecord.entity_compiled_name, entity_other_range, inputRecord.entity_kind, inputRecord.entity_xmldoc, inputRecord.entity_xmldocsig, inputRecord.entity_tycon_abbrev, inputRecord.entity_tycon_repr_accessibility, inputRecord.entity_accessiblity, inputRecord.entity_exn_info));
    }
  }

  get Stamp() {
    return this.entity_stamp;
  }

  get Attribs() {
    return this.entity_attribs;
  }

  get XmlDoc() {
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).entity_xmldoc;
    } else {
      return XmlDoc.Empty;
    }
  }

  get XmlDocSig() {
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).entity_xmldocsig;
    } else {
      return "";
    }
  }

  set XmlDocSig(v) {
    var inputRecord;
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      getValue(matchValue).entity_xmldocsig = v;
    } else {
      this.entity_opt_data = (inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(inputRecord.entity_compiled_name, inputRecord.entity_other_range, inputRecord.entity_kind, inputRecord.entity_xmldoc, v, inputRecord.entity_tycon_abbrev, inputRecord.entity_tycon_repr_accessibility, inputRecord.entity_accessiblity, inputRecord.entity_exn_info));
    }
  }

  get ModuleOrNamespaceType() {
    return this.entity_modul_contents.Force();
  }

  get TypeContents() {
    return this.entity_tycon_tcaug;
  }

  get TypeOrMeasureKind() {
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).entity_kind;
    } else {
      return new TyparKind(0);
    }
  }

  SetTypeOrMeasureKind(kind) {
    var inputRecord;
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      getValue(matchValue).entity_kind = kind;
    } else {
      this.entity_opt_data = (inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(inputRecord.entity_compiled_name, inputRecord.entity_other_range, kind, inputRecord.entity_xmldoc, inputRecord.entity_xmldocsig, inputRecord.entity_tycon_abbrev, inputRecord.entity_tycon_repr_accessibility, inputRecord.entity_accessiblity, inputRecord.entity_exn_info));
    }
  }

  get Id() {
    return ident(this.LogicalName, this.Range);
  }

  get TypeReprInfo() {
    return this.entity_tycon_repr;
  }

  get ExceptionInfo() {
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).entity_exn_info;
    } else {
      return new ExceptionInfo(3);
    }
  }

  SetExceptionInfo(exn_info) {
    var inputRecord;
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      getValue(matchValue).entity_exn_info = exn_info;
    } else {
      this.entity_opt_data = (inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(inputRecord.entity_compiled_name, inputRecord.entity_other_range, inputRecord.entity_kind, inputRecord.entity_xmldoc, inputRecord.entity_xmldocsig, inputRecord.entity_tycon_abbrev, inputRecord.entity_tycon_repr_accessibility, inputRecord.entity_accessiblity, exn_info));
    }
  }

  get IsExceptionDecl() {
    const matchValue = this.ExceptionInfo;

    if (matchValue.tag === 3) {
      return false;
    } else {
      return true;
    }
  }

  get DemangledModuleOrNamespaceName() {
    return ((arg00, arg10) => CompilationPath.DemangleEntityName(arg00, arg10))(this.LogicalName, this.ModuleOrNamespaceType.ModuleOrNamespaceKind);
  }

  Typars(m) {
    return this.entity_typars.Force(m);
  }

  get TyparsNoRange() {
    return this.Typars(this.Range);
  }

  get TypeAbbrev() {
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).entity_tycon_abbrev;
    } else {
      return null;
    }
  }

  SetTypeAbbrev(tycon_abbrev) {
    var inputRecord;
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      getValue(matchValue).entity_tycon_abbrev = tycon_abbrev;
    } else {
      this.entity_opt_data = (inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(inputRecord.entity_compiled_name, inputRecord.entity_other_range, inputRecord.entity_kind, inputRecord.entity_xmldoc, inputRecord.entity_xmldocsig, tycon_abbrev, inputRecord.entity_tycon_repr_accessibility, inputRecord.entity_accessiblity, inputRecord.entity_exn_info));
    }
  }

  get IsTypeAbbrev() {
    return CurriedLambda(() => this.TypeAbbrev != null)();
  }

  get TypeReprAccessibility() {
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).entity_tycon_repr_accessibility;
    } else {
      return new Accessibility(0, new List());
    }
  }

  get CompiledReprCache() {
    return this.entity_il_repr_cache;
  }

  get PublicPath() {
    return this.entity_pubpath;
  }

  get Accessibility() {
    const matchValue = this.entity_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).entity_accessiblity;
    } else {
      return new Accessibility(0, new List());
    }
  }

  get IsPrefixDisplay() {
    return this.entity_flags.IsPrefixDisplay;
  }

  get IsModuleOrNamespace() {
    return this.entity_flags.IsModuleOrNamespace;
  }

  get IsNamespace() {
    if (this.IsModuleOrNamespace) {
      const matchValue = this.ModuleOrNamespaceType.ModuleOrNamespaceKind;

      if (matchValue.tag === 2) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get IsModule() {
    if (this.IsModuleOrNamespace) {
      const matchValue = this.ModuleOrNamespaceType.ModuleOrNamespaceKind;

      if (matchValue.tag === 2) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  get IsErased() {
    return this.IsMeasureableReprTycon;
  }

  get CompilationPathOpt() {
    return this.entity_cpath;
  }

  get CompilationPath() {
    const matchValue = this.CompilationPathOpt;

    if (matchValue == null) {
      return error(new _Error(SR.tastTypeOrModuleNotConcrete(this.LogicalName), this.Range));
    } else {
      return getValue(matchValue);
    }
  }

  get AllFieldTable() {
    const matchValue = this.TypeReprInfo;
    const $var6 = matchValue.tag === 1 ? [0, matchValue.data] : matchValue.tag === 0 ? [0, matchValue.data.fsobjmodel_rfields] : [1];

    switch ($var6[0]) {
      case 0:
        return $var6[1];

      case 1:
        const matchValue_1 = this.ExceptionInfo;

        if (matchValue_1.tag === 2) {
          return matchValue_1.data;
        } else {
          return new TyconRecdFields([], NameMapModule.empty());
        }

    }
  }

  get AllFieldsArray() {
    return this.AllFieldTable.FieldsByIndex;
  }

  get AllFieldsAsList() {
    return toList(this.AllFieldsArray);
  }

  get AllInstanceFieldsAsList() {
    return filter(f => !f.IsStatic, this.AllFieldsAsList);
  }

  get TrueFieldsAsList() {
    return filter(f => !f.IsCompilerGenerated, this.AllFieldsAsList);
  }

  get TrueInstanceFieldsAsList() {
    return filter(f => !f.IsStatic ? !f.IsCompilerGenerated : false, this.AllFieldsAsList);
  }

  GetFieldByIndex(n) {
    return this.AllFieldTable.FieldByIndex(n);
  }

  GetFieldByName(n) {
    return this.AllFieldTable.FieldByName(n);
  }

  get IsUnionTycon() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 2) {
      return true;
    } else {
      return false;
    }
  }

  get UnionTypeInfo() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 2) {
      return matchValue.data;
    } else {
      return null;
    }
  }

  get UnionCasesArray() {
    const matchValue = this.UnionTypeInfo;

    if (matchValue == null) {
      return [];
    } else {
      return getValue(matchValue).CasesTable.CasesByIndex;
    }
  }

  get UnionCasesAsList() {
    return toList(this.UnionCasesArray);
  }

  GetUnionCaseByName(n) {
    const matchValue = this.UnionTypeInfo;

    if (matchValue == null) {
      return null;
    } else {
      return NameMapModule.tryFind(n, getValue(matchValue).CasesTable.CasesByName);
    }
  }

  static NewUnlinked() {
    return new Entity(null, null, null, null, null, null, null, null, null, null, null, null, null);
  }

  static New(_reason, data) {
    return data;
  }

  Link(tg) {
    this.entity_typars = tg.entity_typars;
    this.entity_flags = tg.entity_flags;
    this.entity_stamp = tg.entity_stamp;
    this.entity_logical_name = tg.entity_logical_name;
    this.entity_range = tg.entity_range;
    this.entity_attribs = tg.entity_attribs;
    this.entity_tycon_repr = tg.entity_tycon_repr;
    this.entity_tycon_tcaug = tg.entity_tycon_tcaug;
    this.entity_modul_contents = tg.entity_modul_contents;
    this.entity_pubpath = tg.entity_pubpath;
    this.entity_cpath = tg.entity_cpath;
    this.entity_il_repr_cache = tg.entity_il_repr_cache;
    const matchValue = tg.entity_opt_data;

    if (matchValue == null) {} else {
      this.entity_opt_data = new EntityOptionalData(getValue(matchValue).entity_compiled_name, getValue(matchValue).entity_other_range, getValue(matchValue).entity_kind, getValue(matchValue).entity_xmldoc, getValue(matchValue).entity_xmldocsig, getValue(matchValue).entity_tycon_abbrev, getValue(matchValue).entity_tycon_repr_accessibility, getValue(matchValue).entity_accessiblity, getValue(matchValue).entity_exn_info);
    }
  }

  get IsLinked() {
    const matchValue = this.entity_attribs;

    if (matchValue == null) {
      return false;
    } else {
      return true;
    }
  }

  get FSharpObjectModelTypeInfo() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 0) {
      return matchValue.data;
    } else {
      throw new Error("not an F# object model type definition");
    }
  }

  get IsILTycon() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 3) {
      return true;
    } else {
      return false;
    }
  }

  get ILTyconInfo() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 3) {
      return matchValue.data;
    } else {
      throw new Error("not a .NET type definition");
    }
  }

  get ILTyconRawMetadata() {
    const patternInput = this.ILTyconInfo;
    return patternInput.data[2];
  }

  get IsRecordTycon() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 1) {
      return true;
    } else {
      return false;
    }
  }

  get IsStructRecordOrUnionTycon() {
    const matchValue = this.TypeReprInfo;
    const $var7 = matchValue.tag === 1 ? [0] : matchValue.tag === 2 ? [0] : [1];

    switch ($var7[0]) {
      case 0:
        return this.entity_flags.IsStructRecordOrUnionType;

      case 1:
        return false;
    }
  }

  get IsFSharpObjectModelTycon() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 0) {
      return true;
    } else {
      return false;
    }
  }

  get IsAsmReprTycon() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 4) {
      return true;
    } else {
      return false;
    }
  }

  get IsMeasureableReprTycon() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 5) {
      return true;
    } else {
      return false;
    }
  }

  get IsHiddenReprTycon() {
    const matchValue = [this.TypeAbbrev, this.TypeReprInfo];
    const $var8 = matchValue[0] == null ? matchValue[1].tag === 6 ? [0] : [1] : [1];

    switch ($var8[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  get IsFSharpInterfaceTycon() {
    if (this.IsFSharpObjectModelTycon) {
      const matchValue = this.FSharpObjectModelTypeInfo.fsobjmodel_kind;

      if (matchValue.tag === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get IsFSharpDelegateTycon() {
    if (this.IsFSharpObjectModelTycon) {
      const matchValue = this.FSharpObjectModelTypeInfo.fsobjmodel_kind;

      if (matchValue.tag === 3) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get IsFSharpEnumTycon() {
    if (this.IsFSharpObjectModelTycon) {
      const matchValue = this.FSharpObjectModelTypeInfo.fsobjmodel_kind;

      if (matchValue.tag === 4) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get IsFSharpClassTycon() {
    if (this.IsFSharpObjectModelTycon) {
      const matchValue = this.FSharpObjectModelTypeInfo.fsobjmodel_kind;

      if (matchValue.tag === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get IsILEnumTycon() {
    return this.IsILTycon ? this.ILTyconRawMetadata.IsEnum : false;
  }

  get IsEnumTycon() {
    return this.IsILEnumTycon ? true : this.IsFSharpEnumTycon;
  }

  get IsFSharpStructOrEnumTycon() {
    const matchValue = this.TypeReprInfo;

    if (matchValue.tag === 1) {
      return this.IsStructRecordOrUnionTycon;
    } else if (matchValue.tag === 2) {
      return this.IsStructRecordOrUnionTycon;
    } else if (matchValue.tag === 0) {
      switch (matchValue.data.fsobjmodel_kind.tag) {
        case 1:
        case 3:
          return false;

        case 2:
        case 4:
          return true;

        default:
          return false;
      }
    } else {
      return false;
    }
  }

  get IsILStructOrEnumTycon() {
    return this.IsILTycon ? this.ILTyconRawMetadata.IsStructOrEnum : false;
  }

  get IsStructOrEnumTycon() {
    return this.IsILStructOrEnumTycon ? true : this.IsFSharpStructOrEnumTycon;
  }

  get ImmediateInterfacesOfFSharpTycon() {
    return this.TypeContents.tcaug_interfaces;
  }

  get ImmediateInterfaceTypesOfFSharpTycon() {
    return map(tupledArg => tupledArg[0], this.ImmediateInterfacesOfFSharpTycon);
  }

  get MembersOfFSharpTyconSorted() {
    return filter(v => !v.IsCompilerGenerated, NameMultiMapModule.rangeReversingEachBucket(this.TypeContents.tcaug_adhoc));
  }

  get MembersOfFSharpTyconByName() {
    return this.TypeContents.tcaug_adhoc;
  }

  get GeneratedHashAndEqualsWithComparerValues() {
    return this.TypeContents.tcaug_hash_and_equals_withc;
  }

  get GeneratedCompareToWithComparerValues() {
    return this.TypeContents.tcaug_compare_withc;
  }

  get GeneratedCompareToValues() {
    return this.TypeContents.tcaug_compare;
  }

  get GeneratedHashAndEqualsValues() {
    return this.TypeContents.tcaug_equals;
  }

  get AllGeneratedValues() {
    return toList(delay(() => append_1((() => {
      const matchValue = this.GeneratedCompareToValues;

      if (matchValue != null) {
        const v2 = getValue(matchValue)[1];
        const v1 = getValue(matchValue)[0];
        return append_1(singleton(v1), delay(() => singleton(v2)));
      } else {
        return empty();
      }
    })(), delay(() => {
      var matchValue_1;
      return append_1((matchValue_1 = this.GeneratedCompareToWithComparerValues, matchValue_1 != null ? singleton(getValue(matchValue_1)) : empty()), delay(() => append_1((() => {
        const matchValue_2 = this.GeneratedHashAndEqualsValues;

        if (matchValue_2 != null) {
          const v2_1 = getValue(matchValue_2)[1];
          const v1_1 = getValue(matchValue_2)[0];
          return append_1(singleton(v1_1), delay(() => singleton(v2_1)));
        } else {
          return empty();
        }
      })(), delay(() => {
        const matchValue_3 = this.GeneratedHashAndEqualsWithComparerValues;

        if (matchValue_3 != null) {
          const v3 = getValue(matchValue_3)[2];
          const v2_2 = getValue(matchValue_3)[1];
          const v1_2 = getValue(matchValue_3)[0];
          return append_1(singleton(v1_2), delay(() => append_1(singleton(v2_2), delay(() => singleton(v3)))));
        } else {
          return empty();
        }
      }))));
    }))));
  }

  get CompiledRepresentation() {
    const ilTypeRefForCompilationPath = (_arg1, item) => {
      const top = (racc, p) => {
        top: while (true) {
          if (p.tail != null) {
            const istype = p.head[1];
            const h = p.head[0];
            const $var9 = istype.tag === 0 ? [0] : istype.tag === 1 ? [0] : [1];

            switch ($var9[0]) {
              case 0:
                const outerTypeName = textOfPath(reverse(new List(h, racc)));
                return ILTypeRef.Create(_arg1.data[0], new List(outerTypeName, map(tupledArg => tupledArg[0], p.tail)), item);

              case 1:
                racc = new List(h, racc);
                p = p.tail;
                continue top;
            }
          } else {
            return ILTypeRef.Create(_arg1.data[0], new List(), textOfPath(reverse(new List(item, racc))));
          }
        }
      };

      return top(new List(), _arg1.data[1]);
    };

    const $var11 = () => {
      const matchValue = this.ExceptionInfo;

      if (matchValue.tag === 0) {
        return matchValue.data.CompiledRepresentation;
      } else if (matchValue.tag === 1) {
        return new CompiledTypeRepr(0, [matchValue.data, new ILBoxity(0), mkILTy(new ILBoxity(0), mkILTySpec(matchValue.data, new List()))]);
      } else {
        const matchValue_1 = this.TypeReprInfo;

        if (matchValue_1.tag === 4) {
          return new CompiledTypeRepr(1, matchValue_1.data);
        } else {
          const boxity = this.IsStructOrEnumTycon ? new ILBoxity(1) : new ILBoxity(0);
          let ilTypeRef;
          const matchValue_2 = this.TypeReprInfo;

          if (matchValue_2.tag === 3) {
            const ilTypeDef = matchValue_2.data.data[2];
            const ilScopeRef = matchValue_2.data.data[0];
            const ilEnclosingTypeDefs = matchValue_2.data.data[1];
            ilTypeRef = mkRefForNestedILTypeDef(ilScopeRef, ilEnclosingTypeDefs, ilTypeDef);
          } else {
            ilTypeRef = ilTypeRefForCompilationPath(this.CompilationPath, this.CompiledName);
          }

          let ilTypeOpt;
          const matchValue_3 = this.TyparsNoRange;

          if (matchValue_3.tail == null) {
            ilTypeOpt = mkILTy(boxity, mkILTySpec(ilTypeRef, new List()));
          } else {
            ilTypeOpt = null;
          }

          return new CompiledTypeRepr(0, [ilTypeRef, boxity, ilTypeOpt]);
        }
      }
    };

    const $var10 = this.CompiledReprCache;
    const matchValue_4 = $var10.cacheVal;

    if (matchValue_4 == null) {
      const res = $var11();
      $var10.cacheVal = nullableSlotFull(res);
      return res;
    } else {
      return $var10.cacheVal;
    }
  }

  get CompiledRepresentationForNamedType() {
    const matchValue = this.CompiledRepresentation;

    if (matchValue.tag === 1) {
      throw new Error(SR.tastTypeHasAssemblyCodeRepresentation(this.DisplayNameWithStaticParametersAndUnderscoreTypars));
    } else {
      return matchValue.data[0];
    }
  }

  get PreEstablishedHasDefaultConstructor() {
    return this.entity_flags.PreEstablishedHasDefaultConstructor;
  }

  get HasSelfReferentialConstructor() {
    return this.entity_flags.HasSelfReferentialConstructor;
  }

  SetAttribs(attribs) {
    this.entity_attribs = attribs;
  }

  SetIsStructRecordOrUnion(b) {
    const flags = this.entity_flags;
    this.entity_flags = EntityFlags[".ctor"](flags.IsPrefixDisplay, flags.IsModuleOrNamespace, flags.PreEstablishedHasDefaultConstructor, flags.HasSelfReferentialConstructor, b);
  }

  ToString() {
    return this.LogicalName;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Entity", Entity);
export class MaybeLazy {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.MaybeLazy",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Strict", GenericParam("T")], ["Lazy", Any]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get Value() {
    return this.tag === 1 ? this.data.value : this.data;
  }

  Force() {
    return this.tag === 1 ? this.data.value : this.data;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.MaybeLazy", MaybeLazy);
export class ParentRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ParentRef",
      interfaces: ["FSharpUnion"],
      cases: [["Parent", EntityRef], ["ParentNone"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ParentRef", ParentRef);
export class TyconAugmentation {
  constructor(tcaug_compare, tcaug_compare_withc, tcaug_equals, tcaug_hash_and_equals_withc, tcaug_hasObjectGetHashCode, tcaug_adhoc_list, tcaug_adhoc, tcaug_interfaces, tcaug_super, tcaug_closed, tcaug_abstract) {
    this.tcaug_compare = tcaug_compare;
    this.tcaug_compare_withc = tcaug_compare_withc;
    this.tcaug_equals = tcaug_equals;
    this.tcaug_hash_and_equals_withc = tcaug_hash_and_equals_withc;
    this.tcaug_hasObjectGetHashCode = tcaug_hasObjectGetHashCode;
    this.tcaug_adhoc_list = tcaug_adhoc_list;
    this.tcaug_adhoc = tcaug_adhoc;
    this.tcaug_interfaces = tcaug_interfaces;
    this.tcaug_super = tcaug_super;
    this.tcaug_closed = tcaug_closed;
    this.tcaug_abstract = tcaug_abstract;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyconAugmentation",
      interfaces: ["FSharpRecord"],
      properties: {
        tcaug_compare: Option(Tuple([ValRef, ValRef])),
        tcaug_compare_withc: Option(ValRef),
        tcaug_equals: Option(Tuple([ValRef, ValRef])),
        tcaug_hash_and_equals_withc: Option(Tuple([ValRef, ValRef, ValRef])),
        tcaug_hasObjectGetHashCode: "boolean",
        tcaug_adhoc_list: _Array(Tuple(["boolean", ValRef])),
        tcaug_adhoc: makeGeneric(_Map, {
          Key: "string",
          Value: makeGeneric(List, {
            T: ValRef
          })
        }),
        tcaug_interfaces: makeGeneric(List, {
          T: Tuple([TType, "boolean", range])
        }),
        tcaug_super: Option(TType),
        tcaug_closed: "boolean",
        tcaug_abstract: "boolean"
      }
    };
  }

  SetCompare(x) {
    this.tcaug_compare = x;
  }

  SetCompareWith(x) {
    this.tcaug_compare_withc = x;
  }

  SetEquals(x) {
    this.tcaug_equals = x;
  }

  SetHashAndEqualsWith(x) {
    this.tcaug_hash_and_equals_withc = x;
  }

  SetHasObjectGetHashCode(b) {
    this.tcaug_hasObjectGetHashCode = b;
  }

  static Create() {
    const tcaug_compare = null;
    const tcaug_compare_withc = null;
    const tcaug_equals = null;
    const tcaug_hash_and_equals_withc = null;
    const tcaug_adhoc = NameMultiMapModule.empty();
    const tcaug_adhoc_list = [];
    const tcaug_super = null;
    return new TyconAugmentation(tcaug_compare, tcaug_compare_withc, tcaug_equals, tcaug_hash_and_equals_withc, false, tcaug_adhoc_list, tcaug_adhoc, new List(), tcaug_super, false, false);
  }

  ToString() {
    return "TyconAugmentation(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyconAugmentation", TyconAugmentation);
export class TyconRepresentation {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyconRepresentation",
      interfaces: ["FSharpUnion"],
      cases: [["TFSharpObjectRepr", TyconObjModelData], ["TRecdRepr", TyconRecdFields], ["TUnionRepr", TyconUnionData], ["TILObjectRepr", TILObjectReprData], ["TAsmRepr", ILType], ["TMeasureableRepr", TType], ["TNoRepr"]]
    };
  }

  ToString() {
    return "TyconRepresentation(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyconRepresentation", TyconRepresentation);
export class TILObjectReprData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TILObjectReprData",
      interfaces: ["FSharpUnion"],
      cases: [["TILObjectReprData", ILScopeRef, makeGeneric(List, {
        T: ILTypeDef
      }), ILTypeDef]]
    };
  }

  ToString() {
    return "TILObjectReprData(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TILObjectReprData", TILObjectReprData);
export class TyconObjModelKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyconObjModelKind",
      interfaces: ["FSharpUnion"],
      cases: [["TTyconClass"], ["TTyconInterface"], ["TTyconStruct"], ["TTyconDelegate", SlotSig], ["TTyconEnum"]]
    };
  }

  get IsValueType() {
    const $var12 = this.tag === 1 ? [0] : this.tag === 3 ? [0] : this.tag === 2 ? [1] : this.tag === 4 ? [1] : [0];

    switch ($var12[0]) {
      case 0:
        return false;

      case 1:
        return true;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyconObjModelKind", TyconObjModelKind);
export class TyconObjModelData {
  constructor(fsobjmodel_kind, fsobjmodel_vslots, fsobjmodel_rfields) {
    this.fsobjmodel_kind = fsobjmodel_kind;
    this.fsobjmodel_vslots = fsobjmodel_vslots;
    this.fsobjmodel_rfields = fsobjmodel_rfields;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyconObjModelData",
      interfaces: ["FSharpRecord"],
      properties: {
        fsobjmodel_kind: TyconObjModelKind,
        fsobjmodel_vslots: makeGeneric(List, {
          T: ValRef
        }),
        fsobjmodel_rfields: TyconRecdFields
      }
    };
  }

  ToString() {
    return "TyconObjModelData(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyconObjModelData", TyconObjModelData);
export class TyconRecdFields {
  constructor(fieldsByIndex, fieldsByName) {
    this.FieldsByIndex = fieldsByIndex;
    this.FieldsByName = fieldsByName;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyconRecdFields",
      interfaces: ["FSharpRecord"],
      properties: {
        FieldsByIndex: _Array(RecdField),
        FieldsByName: makeGeneric(_Map, {
          Key: "string",
          Value: RecdField
        })
      }
    };
  }

  FieldByIndex(n) {
    if (n >= 0 ? n < this.FieldsByIndex.length : false) {
      return this.FieldsByIndex[n];
    } else {
      throw new Error("FieldByIndex");
    }
  }

  FieldByName(n) {
    return tryFind(n, this.FieldsByName);
  }

  get AllFieldsAsList() {
    return toList(this.FieldsByIndex);
  }

  get TrueFieldsAsList() {
    return filter(f => !f.IsCompilerGenerated, this.AllFieldsAsList);
  }

  get TrueInstanceFieldsAsList() {
    return filter(f => !f.IsStatic ? !f.IsCompilerGenerated : false, this.AllFieldsAsList);
  }

  ToString() {
    return "TyconRecdFields(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyconRecdFields", TyconRecdFields);
export class TyconUnionCases {
  constructor(casesByIndex, casesByName) {
    this.CasesByIndex = casesByIndex;
    this.CasesByName = casesByName;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyconUnionCases",
      interfaces: ["FSharpRecord"],
      properties: {
        CasesByIndex: _Array(UnionCase),
        CasesByName: makeGeneric(_Map, {
          Key: "string",
          Value: UnionCase
        })
      }
    };
  }

  GetUnionCaseByIndex(n) {
    if (n >= 0 ? n < this.CasesByIndex.length : false) {
      return this.CasesByIndex[n];
    } else {
      throw new Error("GetUnionCaseByIndex" + "\nParameter name: " + "n");
    }
  }

  get UnionCasesAsList() {
    return toList(this.CasesByIndex);
  }

  ToString() {
    return "TyconUnionCases(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyconUnionCases", TyconUnionCases);
export class TyconUnionData {
  constructor(casesTable, compiledRepresentation) {
    this.CasesTable = casesTable;
    this.CompiledRepresentation = compiledRepresentation;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyconUnionData",
      interfaces: ["FSharpRecord"],
      properties: {
        CasesTable: TyconUnionCases,
        CompiledRepresentation: makeGeneric(cache, {
          T: IlxUnionRef
        })
      }
    };
  }

  get UnionCasesAsList() {
    return toList(this.CasesTable.CasesByIndex);
  }

  ToString() {
    return "TyconUnionData(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyconUnionData", TyconUnionData);
export class UnionCase {
  constructor(fieldTable, returnType, compiledName, xmlDoc, xmlDocSig, id, otherRangeOpt, accessibility, attribs) {
    this.FieldTable = fieldTable;
    this.ReturnType = returnType;
    this.CompiledName = compiledName;
    this.XmlDoc = xmlDoc;
    this.XmlDocSig = xmlDocSig;
    this.Id = id;
    this.OtherRangeOpt = otherRangeOpt;
    this.Accessibility = accessibility;
    this.Attribs = attribs;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.UnionCase",
      interfaces: ["FSharpRecord"],
      properties: {
        FieldTable: TyconRecdFields,
        ReturnType: TType,
        CompiledName: "string",
        XmlDoc: XmlDoc,
        XmlDocSig: "string",
        Id: Ident,
        OtherRangeOpt: Option(Tuple([range, "boolean"])),
        Accessibility: Accessibility,
        Attribs: makeGeneric(List, {
          T: Attrib
        })
      }
    };
  }

  get Range() {
    return this.Id.idRange;
  }

  get DefinitionRange() {
    const matchValue = this.OtherRangeOpt;
    const $var13 = matchValue != null ? getValue(matchValue)[1] ? [0, getValue(matchValue)[0]] : [1] : [1];

    switch ($var13[0]) {
      case 0:
        return $var13[1];

      case 1:
        return this.Range;
    }
  }

  get SigRange() {
    const matchValue = this.OtherRangeOpt;
    const $var14 = matchValue != null ? getValue(matchValue)[1] ? [1] : [0, getValue(matchValue)[0]] : [1];

    switch ($var14[0]) {
      case 0:
        return $var14[1];

      case 1:
        return this.Range;
    }
  }

  get DisplayName() {
    return this.Id.idText;
  }

  get RecdFieldsArray() {
    return this.FieldTable.FieldsByIndex;
  }

  get RecdFields() {
    return toList(this.FieldTable.FieldsByIndex);
  }

  GetFieldByName(nm) {
    return this.FieldTable.FieldByName(nm);
  }

  get IsNullary() {
    return this.FieldTable.FieldsByIndex.length === 0;
  }

  ToString() {
    return "UnionCase(" + this.DisplayName + ")";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.UnionCase", UnionCase);
export class RecdField {
  constructor(rfield_mutable, rfield_xmldoc, rfield_xmldocsig, rfield_type, rfield_static, rfield_volatile, rfield_secret, rfield_const, rfield_access, rfield_pattribs, rfield_fattribs, rfield_id, rfield_name_generated, rfield_other_range) {
    this.rfield_mutable = rfield_mutable;
    this.rfield_xmldoc = rfield_xmldoc;
    this.rfield_xmldocsig = rfield_xmldocsig;
    this.rfield_type = rfield_type;
    this.rfield_static = rfield_static;
    this.rfield_volatile = rfield_volatile;
    this.rfield_secret = rfield_secret;
    this.rfield_const = rfield_const;
    this.rfield_access = rfield_access;
    this.rfield_pattribs = rfield_pattribs;
    this.rfield_fattribs = rfield_fattribs;
    this.rfield_id = rfield_id;
    this.rfield_name_generated = rfield_name_generated;
    this.rfield_other_range = rfield_other_range;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.RecdField",
      interfaces: ["FSharpRecord"],
      properties: {
        rfield_mutable: "boolean",
        rfield_xmldoc: XmlDoc,
        rfield_xmldocsig: "string",
        rfield_type: TType,
        rfield_static: "boolean",
        rfield_volatile: "boolean",
        rfield_secret: "boolean",
        rfield_const: Option(Const),
        rfield_access: Accessibility,
        rfield_pattribs: makeGeneric(List, {
          T: Attrib
        }),
        rfield_fattribs: makeGeneric(List, {
          T: Attrib
        }),
        rfield_id: Ident,
        rfield_name_generated: "boolean",
        rfield_other_range: Option(Tuple([range, "boolean"]))
      }
    };
  }

  get Accessibility() {
    return this.rfield_access;
  }

  get PropertyAttribs() {
    return this.rfield_pattribs;
  }

  get FieldAttribs() {
    return this.rfield_fattribs;
  }

  get Range() {
    return this.rfield_id.idRange;
  }

  get DefinitionRange() {
    const matchValue = this.rfield_other_range;
    const $var15 = matchValue != null ? getValue(matchValue)[1] ? [0, getValue(matchValue)[0]] : [1] : [1];

    switch ($var15[0]) {
      case 0:
        return $var15[1];

      case 1:
        return this.Range;
    }
  }

  get SigRange() {
    const matchValue = this.rfield_other_range;
    const $var16 = matchValue != null ? getValue(matchValue)[1] ? [1] : [0, getValue(matchValue)[0]] : [1];

    switch ($var16[0]) {
      case 0:
        return $var16[1];

      case 1:
        return this.Range;
    }
  }

  get Id() {
    return this.rfield_id;
  }

  get Name() {
    return this.rfield_id.idText;
  }

  get IsCompilerGenerated() {
    return this.rfield_secret;
  }

  get IsMutable() {
    return this.rfield_mutable;
  }

  get IsStatic() {
    return this.rfield_static;
  }

  get IsVolatile() {
    return this.rfield_volatile;
  }

  get FormalType() {
    return this.rfield_type;
  }

  get XmlDoc() {
    return this.rfield_xmldoc;
  }

  get XmlDocSig() {
    return this.rfield_xmldocsig;
  }

  set XmlDocSig(x) {
    this.rfield_xmldocsig = x;
  }

  get LiteralValue() {
    return this.rfield_const != null ? getValue(this.rfield_const).tag === 17 ? null : getValue(this.rfield_const) : null;
  }

  get IsZeroInit() {
    return this.rfield_const != null ? getValue(this.rfield_const).tag === 17 ? true : false : false;
  }

  ToString() {
    return "RecdField(" + this.Name + ")";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.RecdField", RecdField);
export class ExceptionInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ExceptionInfo",
      interfaces: ["FSharpUnion"],
      cases: [["TExnAbbrevRepr", EntityRef], ["TExnAsmRepr", ILTypeRef], ["TExnFresh", TyconRecdFields], ["TExnNone"]]
    };
  }

  ToString() {
    return "ExceptionInfo(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ExceptionInfo", ExceptionInfo);
export class ModuleOrNamespaceType {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceType",
      properties: {
        ActivePatternElemRefLookupTable: Any,
        AllEntities: makeGeneric(QueueList, {
          T: Entity
        }),
        AllEntitiesByCompiledAndLogicalMangledNames: makeGeneric(_Map, {
          Key: "string",
          Value: Entity
        }),
        AllEntitiesByLogicalMangledName: makeGeneric(_Map, {
          Key: "string",
          Value: Entity
        }),
        AllValsAndMembers: makeGeneric(QueueList, {
          T: Val
        }),
        AllValsAndMembersByLogicalNameUncached: makeGeneric(_Map, {
          Key: "string",
          Value: makeGeneric(List, {
            T: Val
          })
        }),
        AllValsAndMembersByPartialLinkageKey: makeGeneric(_Map, {
          Key: ValLinkagePartialKey,
          Value: makeGeneric(List, {
            T: Val
          })
        }),
        AllValsByLogicalName: makeGeneric(_Map, {
          Key: "string",
          Value: Val
        }),
        ExceptionDefinitions: makeGeneric(List, {
          T: Entity
        }),
        ExceptionDefinitionsByDemangledName: makeGeneric(_Map, {
          Key: "string",
          Value: Entity
        }),
        ModuleAndNamespaceDefinitions: makeGeneric(List, {
          T: Entity
        }),
        ModuleOrNamespaceKind: ModuleOrNamespaceKind,
        ModulesAndNamespacesByDemangledName: makeGeneric(_Map, {
          Key: "string",
          Value: Entity
        }),
        TypeAndExceptionDefinitions: makeGeneric(List, {
          T: Entity
        }),
        TypeDefinitions: makeGeneric(List, {
          T: Entity
        }),
        TypesByAccessNames: makeGeneric(LayeredMultiMap, {
          Key: "string",
          Value: Entity
        }),
        TypesByMangledName: makeGeneric(_Map, {
          Key: "string",
          Value: Entity
        })
      }
    };
  }

  constructor(kind, vals, entities) {
    this.kind = kind;
    this.vals = vals;
    this["entities@1658"] = entities;
    this.activePatternElemRefCache = {
      contents: null
    };
    this.modulesByDemangledNameCache = {
      contents: null
    };
    this.exconsByDemangledNameCache = {
      contents: null
    };
    this.tyconsByDemangledNameAndArityCache = {
      contents: null
    };
    this.tyconsByAccessNamesCache = {
      contents: null
    };
    this.tyconsByMangledNameCache = {
      contents: null
    };
    this.allEntitiesByMangledNameCache = {
      contents: null
    };
    this.allValsAndMembersByPartialLinkageKeyCache = {
      contents: null
    };
    this.allValsByLogicalNameCache = {
      contents: null
    };
  }

  get ModuleOrNamespaceKind() {
    return this.kind;
  }

  get AllValsAndMembers() {
    return this.vals;
  }

  get AllEntities() {
    return this["entities@1658"];
  }

  AddModuleOrNamespaceByMutation(modul) {
    this["entities@1658"] = QueueListModule.appendOne(this["entities@1658"], modul);
    this.modulesByDemangledNameCache.contents = null;
    this.allEntitiesByMangledNameCache.contents = null;
  }

  AddEntity(tycon) {
    return new ModuleOrNamespaceType(this.kind, this.vals, this["entities@1658"].AppendOne(tycon));
  }

  AddVal(vspec) {
    return new ModuleOrNamespaceType(this.kind, this.vals.AppendOne(vspec), this["entities@1658"]);
  }

  get ActivePatternElemRefLookupTable() {
    return this.activePatternElemRefCache;
  }

  get TypeDefinitions() {
    return toList(filter_1(x => !x.IsExceptionDecl ? !x.IsModuleOrNamespace : false, this["entities@1658"]));
  }

  get ExceptionDefinitions() {
    return toList(filter_1(x => x.IsExceptionDecl, this["entities@1658"]));
  }

  get ModuleAndNamespaceDefinitions() {
    return toList(filter_1(x => x.IsModuleOrNamespace, this["entities@1658"]));
  }

  get TypeAndExceptionDefinitions() {
    return toList(filter_1(x => !x.IsModuleOrNamespace, this["entities@1658"]));
  }

  TypesByDemangledNameAndArity(m) {
    const $var18 = () => Map_2_AddAndMarkAsCollapsible.bind(Map_2_get_Empty_Static())(Array.from(map(tc => KeyTyconByDemangledNameAndArity(tc.LogicalName, tc.Typars(m), tc), this.TypeAndExceptionDefinitions)));

    const $var17 = this.tyconsByDemangledNameAndArityCache;
    const matchValue = $var17.contents;

    if (matchValue == null) {
      const res = $var18();
      $var17.contents = makeSome(res);
      return res;
    } else {
      return getValue(matchValue);
    }
  }

  get TypesByAccessNames() {
    const $var20 = () => LayeredMultiMap.Empty.AddAndMarkAsCollapsible(Array.from(collect(tc => KeyTyconByAccessNames(tc.LogicalName, tc), Array.from(this.TypeAndExceptionDefinitions))));

    const $var19 = this.tyconsByAccessNamesCache;
    const matchValue = $var19.contents;

    if (matchValue == null) {
      const res = $var20();
      $var19.contents = makeSome(res);
      return res;
    } else {
      return getValue(matchValue);
    }
  }

  get TypesByMangledName() {
    const addTyconByMangledName = (x, tab) => {
      return NameMapModule.add(x.LogicalName, x, tab);
    };

    const $var22 = () => foldBack(addTyconByMangledName, this.TypeAndExceptionDefinitions, create(null, new Comparer(comparePrimitives)));

    const $var21 = this.tyconsByMangledNameCache;
    const matchValue = $var21.contents;

    if (matchValue == null) {
      const res = $var22();
      $var21.contents = makeSome(res);
      return res;
    } else {
      return getValue(matchValue);
    }
  }

  get AllEntitiesByCompiledAndLogicalMangledNames() {
    const addEntityByMangledName = (x, tab) => {
      const name1 = x.LogicalName;
      const name2 = x.CompiledName;
      const tab_1 = NameMapModule.add(name1, x, tab);

      if (name1 === name2) {
        return tab_1;
      } else {
        return NameMapModule.add(name2, x, tab_1);
      }
    };

    const $var24 = () => QueueListModule.foldBack(addEntityByMangledName, this["entities@1658"], create(null, new Comparer(comparePrimitives)));

    const $var23 = this.allEntitiesByMangledNameCache;
    const matchValue = $var23.contents;

    if (matchValue == null) {
      const res = $var24();
      $var23.contents = makeSome(res);
      return res;
    } else {
      return getValue(matchValue);
    }
  }

  get AllEntitiesByLogicalMangledName() {
    const addEntityByMangledName = (x, tab) => {
      return NameMapModule.add(x.LogicalName, x, tab);
    };

    return QueueListModule.foldBack(addEntityByMangledName, this["entities@1658"], create(null, new Comparer(comparePrimitives)));
  }

  get AllValsAndMembersByPartialLinkageKey() {
    const addValByMangledName = (x, tab) => {
      if (x.IsCompiledAsTopLevel) {
        return MultiMapModule.add(x.LinkagePartialKey, x, tab);
      } else {
        return tab;
      }
    };

    const $var26 = () => QueueListModule.foldBack(addValByMangledName, this.vals, MultiMapModule.empty());

    const $var25 = this.allValsAndMembersByPartialLinkageKeyCache;
    const matchValue = $var25.contents;

    if (matchValue == null) {
      const res = $var26();
      $var25.contents = makeSome(res);
      return res;
    } else {
      return getValue(matchValue);
    }
  }

  TryLinkVal(ccu, key) {
    const $var27 = tryFind_1(v => {
      const matchValue = key.TypeForLinkage;

      if (matchValue != null) {
        return ccu.MemberSignatureEquality(getValue(matchValue), v.Type);
      } else {
        return true;
      }
    }, MultiMapModule.find(key.PartialKey, this.AllValsAndMembersByPartialLinkageKey));

    if ($var27 == null) {
      return new ValueOption(1);
    } else {
      return new ValueOption(0, getValue($var27));
    }
  }

  get AllValsByLogicalName() {
    const addValByName = (x, tab) => {
      if (!x.IsMember ? !x.IsCompilerGenerated : false) {
        return NameMapModule.add(x.LogicalName, x, tab);
      } else {
        return tab;
      }
    };

    const $var29 = () => QueueListModule.foldBack(addValByName, this.vals, create(null, new Comparer(comparePrimitives)));

    const $var28 = this.allValsByLogicalNameCache;
    const matchValue = $var28.contents;

    if (matchValue == null) {
      const res = $var29();
      $var28.contents = makeSome(res);
      return res;
    } else {
      return getValue(matchValue);
    }
  }

  get AllValsAndMembersByLogicalNameUncached() {
    const addValByName = (x, tab) => {
      if (!x.IsCompilerGenerated) {
        return MultiMapModule.add(x.LogicalName, x, tab);
      } else {
        return tab;
      }
    };

    return QueueListModule.foldBack(addValByName, this.vals, MultiMapModule.empty());
  }

  get ExceptionDefinitionsByDemangledName() {
    const add = (tycon, acc) => {
      return NameMapModule.add(tycon.LogicalName, tycon, acc);
    };

    const $var31 = () => foldBack(add, this.ExceptionDefinitions, create(null, new Comparer(comparePrimitives)));

    const $var30 = this.exconsByDemangledNameCache;
    const matchValue = $var30.contents;

    if (matchValue == null) {
      const res = $var31();
      $var30.contents = makeSome(res);
      return res;
    } else {
      return getValue(matchValue);
    }
  }

  get ModulesAndNamespacesByDemangledName() {
    const add = (entity, acc) => {
      if (entity.IsModuleOrNamespace) {
        return NameMapModule.add(entity.DemangledModuleOrNamespaceName, entity, acc);
      } else {
        return acc;
      }
    };

    const $var33 = () => QueueListModule.foldBack(add, this["entities@1658"], create(null, new Comparer(comparePrimitives)));

    const $var32 = this.modulesByDemangledNameCache;
    const matchValue = $var32.contents;

    if (matchValue == null) {
      const res = $var33();
      $var32.contents = makeSome(res);
      return res;
    } else {
      return getValue(matchValue);
    }
  }

  ToString() {
    return "ModuleOrNamespaceType(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceType", ModuleOrNamespaceType);
export class Construct {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Construct",
      properties: {}
    };
  }

  static NewModuleOrNamespaceType(mkind, tycons, vals) {
    return new ModuleOrNamespaceType(mkind, QueueListModule.ofList(vals), QueueListModule.ofList(tycons));
  }

  static NewEmptyModuleOrNamespaceType(mkind) {
    return function (arg00, arg10, arg20) {
      return Construct.NewModuleOrNamespaceType(arg00, arg10, arg20);
    }(mkind, new List(), new List());
  }

  static NewModuleOrNamespace(cpath, access, id, xml, attribs, mtype) {
    var entity_logical_name;
    var entity_range;
    var entity_flags;
    var entity_typars;
    var entity_tycon_repr;
    var entity_tycon_tcaug;
    var entity_pubpath;
    const stamp = newStamp();
    return function (arg00, arg10) {
      return Entity.New(arg00, arg10);
    }("mspec", (entity_logical_name = id.idText, entity_range = id.idRange, entity_flags = EntityFlags[".ctor"](false, true, false, false, false), entity_typars = LazyWithContext.NotLazy(new List()), entity_tycon_repr = new TyconRepresentation(6), entity_tycon_tcaug = TyconAugmentation.Create(), entity_pubpath = defaultArg(cpath, null, function (cp) {
      return cp.NestedPublicPath(id);
    }), new Entity(entity_typars, entity_flags, stamp, entity_logical_name, entity_range, attribs, entity_tycon_repr, entity_tycon_tcaug, mtype, entity_pubpath, cpath, newCache(), (() => {
      var testExpr;
      var inputRecord;
      const matchValue = [xml, access];
      const $var34 = (testExpr = matchValue[0].data, testExpr.length === 0) ? matchValue[1].data.tail == null ? [0] : [1] : [1];

      switch ($var34[0]) {
        case 0:
          return null;

        case 1:
          return inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(inputRecord.entity_compiled_name, inputRecord.entity_other_range, inputRecord.entity_kind, xml, inputRecord.entity_xmldocsig, inputRecord.entity_tycon_abbrev, access, access, inputRecord.entity_exn_info);
      }
    })())));
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Construct", Construct);
export class Accessibility {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Accessibility",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["TAccess", makeGeneric(List, {
        T: CompilationPath
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  ToString() {
    return "Accessibility(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Accessibility", Accessibility);
export class Typar {
  constructor(typar_id, typar_il_name, typar_flags, typar_stamp, typar_xmldoc, typar_attribs, typar_solution, typar_constraints, typar_astype) {
    this.typar_id = typar_id;
    this.typar_il_name = typar_il_name;
    this.typar_flags = typar_flags;
    this.typar_stamp = typar_stamp;
    this.typar_xmldoc = typar_xmldoc;
    this.typar_attribs = typar_attribs;
    this.typar_solution = typar_solution;
    this.typar_constraints = typar_constraints;
    this.typar_astype = typar_astype;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Typar",
      interfaces: ["FSharpRecord"],
      properties: {
        typar_id: Ident,
        typar_il_name: Option("string"),
        typar_flags: TyparFlags,
        typar_stamp: Long,
        typar_xmldoc: XmlDoc,
        typar_attribs: makeGeneric(List, {
          T: Attrib
        }),
        typar_solution: Option(TType),
        typar_constraints: makeGeneric(List, {
          T: TyparConstraint
        }),
        typar_astype: TType
      }
    };
  }

  get Name() {
    return this.typar_id.idText;
  }

  get Range() {
    return this.typar_id.idRange;
  }

  get Id() {
    return this.typar_id;
  }

  get Stamp() {
    return this.typar_stamp;
  }

  get Solution() {
    return this.typar_solution;
  }

  get Constraints() {
    return this.typar_constraints;
  }

  get IsCompilerGenerated() {
    return this.typar_flags.IsCompilerGenerated;
  }

  get Rigidity() {
    return this.typar_flags.Rigidity;
  }

  get DynamicReq() {
    return this.typar_flags.DynamicReq;
  }

  get EqualityConditionalOn() {
    return this.typar_flags.EqualityConditionalOn;
  }

  get ComparisonConditionalOn() {
    return this.typar_flags.ComparisonConditionalOn;
  }

  get StaticReq() {
    return this.typar_flags.StaticReq;
  }

  get IsFromError() {
    return this.typar_flags.IsFromError;
  }

  get Kind() {
    return this.typar_flags.Kind;
  }

  get IsErased() {
    const matchValue = this.Kind;

    if (matchValue.tag === 0) {
      return false;
    } else {
      return true;
    }
  }

  get Attribs() {
    return this.typar_attribs;
  }

  get DisplayName() {
    return this.Name === "?" ? "?" + this.Stamp.toString() : this.Name;
  }

  FixupConstraints(cs) {
    this.typar_constraints = cs;
  }

  static NewUnlinked() {
    return new Typar(null, null, null, null, null, null, null, null, null);
  }

  static New(data) {
    return data;
  }

  Link(tg) {
    this.typar_id = tg.typar_id;
    this.typar_il_name = tg.typar_il_name;
    this.typar_flags = tg.typar_flags;
    this.typar_stamp = tg.typar_stamp;
    this.typar_xmldoc = tg.typar_xmldoc;
    this.typar_attribs = tg.typar_attribs;
    this.typar_solution = tg.typar_solution;
    this.typar_constraints = tg.typar_constraints;
  }

  get AsType() {
    const ty = this.typar_astype;
    const matchValue = ty;

    if (matchValue == null) {
      const ty2 = new TType(5, this);
      this.typar_astype = ty2;
      return ty2;
    } else {
      return ty;
    }
  }

  get IsLinked() {
    const matchValue = this.typar_attribs;

    if (matchValue == null) {
      return false;
    } else {
      return true;
    }
  }

  get IsSolved() {
    const matchValue = this.Solution;

    if (matchValue == null) {
      return false;
    } else {
      return true;
    }
  }

  SetIdent(id) {
    this.typar_id = id;
  }

  SetRigidity(b) {
    const flags = this.typar_flags;
    this.typar_flags = TyparFlags[".ctor"](flags.Kind, b, flags.IsFromError, flags.IsCompilerGenerated, flags.StaticReq, flags.DynamicReq, flags.EqualityConditionalOn, flags.ComparisonConditionalOn);
  }

  SetCompilerGenerated(b) {
    const flags = this.typar_flags;
    this.typar_flags = TyparFlags[".ctor"](flags.Kind, flags.Rigidity, flags.IsFromError, b, flags.StaticReq, flags.DynamicReq, flags.EqualityConditionalOn, flags.ComparisonConditionalOn);
  }

  SetStaticReq(b) {
    const flags = this.typar_flags;
    this.typar_flags = TyparFlags[".ctor"](flags.Kind, flags.Rigidity, flags.IsFromError, flags.IsCompilerGenerated, b, flags.DynamicReq, flags.EqualityConditionalOn, flags.ComparisonConditionalOn);
  }

  SetDynamicReq(b) {
    const flags = this.typar_flags;
    this.typar_flags = TyparFlags[".ctor"](flags.Kind, flags.Rigidity, flags.IsFromError, flags.IsCompilerGenerated, flags.StaticReq, b, flags.EqualityConditionalOn, flags.ComparisonConditionalOn);
  }

  SetEqualityDependsOn(b) {
    const flags = this.typar_flags;
    this.typar_flags = TyparFlags[".ctor"](flags.Kind, flags.Rigidity, flags.IsFromError, flags.IsCompilerGenerated, flags.StaticReq, flags.DynamicReq, b, flags.ComparisonConditionalOn);
  }

  SetComparisonDependsOn(b) {
    const flags = this.typar_flags;
    this.typar_flags = TyparFlags[".ctor"](flags.Kind, flags.Rigidity, flags.IsFromError, flags.IsCompilerGenerated, flags.StaticReq, flags.DynamicReq, flags.EqualityConditionalOn, b);
  }

  ToString() {
    return this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Typar", Typar);
export class TyparConstraint {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyparConstraint",
      interfaces: ["FSharpUnion"],
      cases: [["CoercesTo", TType, range], ["DefaultsTo", "number", TType, range], ["SupportsNull", range], ["MayResolveMember", TraitConstraintInfo, range], ["IsNonNullableStruct", range], ["IsReferenceType", range], ["SimpleChoice", makeGeneric(List, {
        T: TType
      }), range], ["RequiresDefaultConstructor", range], ["IsEnum", TType, range], ["SupportsComparison", range], ["SupportsEquality", range], ["IsDelegate", TType, TType, range], ["IsUnmanaged", range]]
    };
  }

  ToString() {
    return "TyparConstraint(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyparConstraint", TyparConstraint);
export class TraitConstraintInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TraitConstraintInfo",
      interfaces: ["FSharpUnion"],
      cases: [["TTrait", makeGeneric(List, {
        T: TType
      }), "string", MemberFlags, makeGeneric(List, {
        T: TType
      }), Option(TType), Any]]
    };
  }

  get MemberName() {
    return this.data[1];
  }

  get ReturnType() {
    return this.data[4];
  }

  get Solution() {
    return this.data[5].contents;
  }

  set Solution(v) {
    this.data[5].contents = v;
  }

  ToString() {
    return "TTrait(" + this.MemberName + ")";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TraitConstraintInfo", TraitConstraintInfo);
export class TraitConstraintSln {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TraitConstraintSln",
      interfaces: ["FSharpUnion"],
      cases: [["FSMethSln", TType, ValRef, makeGeneric(List, {
        T: TType
      })], ["FSRecdFieldSln", makeGeneric(List, {
        T: TType
      }), RecdFieldRef, "boolean"], ["ILMethSln", TType, Option(ILTypeRef), ILMethodRef, makeGeneric(List, {
        T: TType
      })], ["ClosedExprSln", Expr], ["BuiltInSln"]]
    };
  }

  ToString() {
    return "TraitConstraintSln(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TraitConstraintSln", TraitConstraintSln);
export class ValLinkagePartialKey {
  constructor(memberParentMangledName, memberIsOverride, logicalName, totalArgCount) {
    this.MemberParentMangledName = memberParentMangledName;
    this.MemberIsOverride = memberIsOverride;
    this.LogicalName = logicalName;
    this.TotalArgCount = totalArgCount | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValLinkagePartialKey",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        MemberParentMangledName: Option("string"),
        MemberIsOverride: "boolean",
        LogicalName: "string",
        TotalArgCount: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  ToString() {
    return "ValLinkagePartialKey(" + this.LogicalName + ")";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValLinkagePartialKey", ValLinkagePartialKey);
export class ValLinkageFullKey {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValLinkageFullKey",
      properties: {
        PartialKey: ValLinkagePartialKey,
        TypeForLinkage: Option(TType)
      }
    };
  }

  constructor(partialKey, typeForLinkage) {
    this.partialKey = partialKey;
    this.typeForLinkage = typeForLinkage;
  }

  get PartialKey() {
    return this.partialKey;
  }

  get TypeForLinkage() {
    return this.typeForLinkage;
  }

  ToString() {
    return "ValLinkageFullKey(" + this.partialKey.LogicalName + ")";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValLinkageFullKey", ValLinkageFullKey);
export class ValOptionalData {
  constructor(val_compiled_name, val_other_range, val_const, val_defn, val_repr_info, val_access, val_xmldoc, val_member_info, val_declaring_entity, val_xmldocsig, val_attribs) {
    this.val_compiled_name = val_compiled_name;
    this.val_other_range = val_other_range;
    this.val_const = val_const;
    this.val_defn = val_defn;
    this.val_repr_info = val_repr_info;
    this.val_access = val_access;
    this.val_xmldoc = val_xmldoc;
    this.val_member_info = val_member_info;
    this.val_declaring_entity = val_declaring_entity;
    this.val_xmldocsig = val_xmldocsig;
    this.val_attribs = val_attribs;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValOptionalData",
      interfaces: ["FSharpRecord"],
      properties: {
        val_compiled_name: Option("string"),
        val_other_range: Option(Tuple([range, "boolean"])),
        val_const: Option(Const),
        val_defn: Option(Expr),
        val_repr_info: Option(ValReprInfo),
        val_access: Accessibility,
        val_xmldoc: XmlDoc,
        val_member_info: Option(ValMemberInfo),
        val_declaring_entity: ParentRef,
        val_xmldocsig: "string",
        val_attribs: makeGeneric(List, {
          T: Attrib
        })
      }
    };
  }

  ToString() {
    return "ValOptionalData(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValOptionalData", ValOptionalData);
export class Val {
  constructor(val_logical_name, val_range, val_type, val_stamp, val_flags, val_opt_data) {
    this.val_logical_name = val_logical_name;
    this.val_range = val_range;
    this.val_type = val_type;
    this.val_stamp = val_stamp;
    this.val_flags = val_flags;
    this.val_opt_data = val_opt_data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Val",
      interfaces: ["FSharpRecord"],
      properties: {
        val_logical_name: "string",
        val_range: range,
        val_type: TType,
        val_stamp: Long,
        val_flags: ValFlags,
        val_opt_data: Option(ValOptionalData)
      }
    };
  }

  static get EmptyValOptData() {
    return new ValOptionalData(null, null, null, null, null, new Accessibility(0, new List()), XmlDoc.Empty, null, new ParentRef(1), "", new List());
  }

  get DefinitionRange() {
    const matchValue = this.val_opt_data;
    const $var35 = matchValue != null ? getValue(matchValue).val_other_range != null ? getValue(getValue(matchValue).val_other_range)[1] ? [0, getValue(getValue(matchValue).val_other_range)[0]] : [1] : [1] : [1];

    switch ($var35[0]) {
      case 0:
        return $var35[1];

      case 1:
        return this.val_range;
    }
  }

  get SigRange() {
    const matchValue = this.val_opt_data;
    const $var36 = matchValue != null ? getValue(matchValue).val_other_range != null ? getValue(getValue(matchValue).val_other_range)[1] ? [1] : [0, getValue(getValue(matchValue).val_other_range)[0]] : [1] : [1];

    switch ($var36[0]) {
      case 0:
        return $var36[1];

      case 1:
        return this.val_range;
    }
  }

  get Range() {
    return this.val_range;
  }

  get Stamp() {
    return this.val_stamp;
  }

  get Type() {
    return this.val_type;
  }

  get Accessibility() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_access;
    } else {
      return new Accessibility(0, new List());
    }
  }

  get LiteralValue() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_const;
    } else {
      return null;
    }
  }

  get ValReprInfo() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_repr_info;
    } else {
      return null;
    }
  }

  get Id() {
    return ident(this.LogicalName, this.Range);
  }

  get IsCompiledAsTopLevel() {
    return CurriedLambda(() => this.ValReprInfo != null)();
  }

  get LinkagePartialKey() {
    const LogicalName = this.LogicalName;
    return new ValLinkagePartialKey(this.IsMember ? this.MemberApparentEntity.LogicalName : null, this.IsOverrideOrExplicitImpl, LogicalName, this.IsMember ? getValue(this.ValReprInfo).TotalArgCount : 0);
  }

  get LinkageFullKey() {
    return new ValLinkageFullKey(this.LinkagePartialKey, this.IsMember ? this.Type : null);
  }

  get IsMemberOrModuleBinding() {
    return this.val_flags.IsMemberOrModuleBinding;
  }

  get IsExtensionMember() {
    return this.val_flags.IsExtensionMember;
  }

  get ReflectedDefinition() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_defn;
    } else {
      return null;
    }
  }

  get MemberInfo() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_member_info;
    } else {
      return null;
    }
  }

  get IsMember() {
    return CurriedLambda(() => this.MemberInfo != null)();
  }

  get IsIntrinsicMember() {
    return this.IsMember ? !this.IsExtensionMember : false;
  }

  get IsModuleBinding() {
    return this.IsMemberOrModuleBinding ? !this.IsMember : false;
  }

  get IsCompiledIntoModule() {
    return this.IsExtensionMember ? true : this.IsModuleBinding;
  }

  get IsInstanceMember() {
    return this.IsMember ? getValue(this.MemberInfo).MemberFlags.IsInstance : false;
  }

  get IsConstructor() {
    const matchValue = this.MemberInfo;
    const $var37 = matchValue != null ? (!this.IsExtensionMember ? getValue(matchValue).MemberFlags.MemberKind.Equals(new MemberKind(1)) : false) ? [0, getValue(matchValue)] : [1] : [1];

    switch ($var37[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  get IsClassConstructor() {
    const matchValue = this.MemberInfo;
    const $var38 = matchValue != null ? (!this.IsExtensionMember ? getValue(matchValue).MemberFlags.MemberKind.Equals(new MemberKind(0)) : false) ? [0, getValue(matchValue)] : [1] : [1];

    switch ($var38[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  get IsOverrideOrExplicitImpl() {
    const matchValue = this.MemberInfo;
    const $var39 = matchValue != null ? getValue(matchValue).MemberFlags.IsOverrideOrExplicitImpl ? [0, getValue(matchValue)] : [1] : [1];

    switch ($var39[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  get IsMutable() {
    const matchValue = this.val_flags.MutabilityInfo;

    if (matchValue.tag === 1) {
      return true;
    } else {
      return false;
    }
  }

  get MakesNoCriticalTailcalls() {
    return this.val_flags.MakesNoCriticalTailcalls;
  }

  get HasBeenReferenced() {
    return this.val_flags.HasBeenReferenced;
  }

  get IsCompiledAsStaticPropertyWithoutField() {
    return this.val_flags.IsCompiledAsStaticPropertyWithoutField;
  }

  get IsFixed() {
    return this.val_flags.IsFixed;
  }

  get PermitsExplicitTypeInstantiation() {
    return this.val_flags.PermitsExplicitTypeInstantiation;
  }

  get IsIncrClassGeneratedMember() {
    return this.IsCompilerGenerated ? this.val_flags.IsIncrClassSpecialMember : false;
  }

  get IsIncrClassConstructor() {
    return this.IsConstructor ? this.val_flags.IsIncrClassSpecialMember : false;
  }

  get RecursiveValInfo() {
    return this.val_flags.RecursiveValInfo;
  }

  get BaseOrThisInfo() {
    return this.val_flags.BaseOrThisInfo;
  }

  get IsTypeFunction() {
    return this.val_flags.IsTypeFunction;
  }

  get InlineInfo() {
    return this.val_flags.InlineInfo;
  }

  get MustInline() {
    return this.InlineInfo.MustInline;
  }

  get IsCompilerGenerated() {
    return this.val_flags.IsCompilerGenerated;
  }

  get Attribs() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_attribs;
    } else {
      return new List();
    }
  }

  get XmlDoc() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_xmldoc;
    } else {
      return XmlDoc.Empty;
    }
  }

  get XmlDocSig() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_xmldocsig;
    } else {
      return "";
    }
  }

  set XmlDocSig(v) {
    var inputRecord;
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      getValue(matchValue).val_xmldocsig = v;
    } else {
      this.val_opt_data = (inputRecord = Val.EmptyValOptData, new ValOptionalData(inputRecord.val_compiled_name, inputRecord.val_other_range, inputRecord.val_const, inputRecord.val_defn, inputRecord.val_repr_info, inputRecord.val_access, inputRecord.val_xmldoc, inputRecord.val_member_info, inputRecord.val_declaring_entity, v, inputRecord.val_attribs));
    }
  }

  get DeclaringEntity() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_declaring_entity;
    } else {
      return new ParentRef(1);
    }
  }

  get TopValDeclaringEntity() {
    const matchValue = this.DeclaringEntity;

    if (matchValue.tag === 1) {
      return error(new InternalError("TopValDeclaringEntity: does not have a parent", this.Range));
    } else {
      return matchValue.data;
    }
  }

  get HasDeclaringEntity() {
    const matchValue = this.DeclaringEntity;

    if (matchValue.tag === 1) {
      return false;
    } else {
      return true;
    }
  }

  get MemberApparentEntity() {
    const matchValue = this.MemberInfo;

    if (matchValue == null) {
      return error(new InternalError("MemberApparentEntity", this.Range));
    } else {
      return getValue(matchValue).ApparentEnclosingEntity;
    }
  }

  get NumObjArgs() {
    const matchValue = this.MemberInfo;

    if (matchValue == null) {
      return 0;
    } else if (getValue(matchValue).MemberFlags.IsInstance) {
      return 1;
    } else {
      return 0;
    }
  }

  get ApparentEnclosingEntity() {
    const matchValue = this.MemberInfo;

    if (matchValue == null) {
      return this.DeclaringEntity;
    } else {
      return new ParentRef(0, getValue(matchValue).ApparentEnclosingEntity);
    }
  }

  get PublicPath() {
    const matchValue = this.DeclaringEntity;

    if (matchValue.tag === 1) {
      return null;
    } else {
      const matchValue_1 = matchValue.data.PublicPath;

      if (matchValue_1 != null) {
        return new ValPublicPath(0, [getValue(matchValue_1), this.LinkageFullKey]);
      } else {
        return null;
      }
    }
  }

  get IsDispatchSlot() {
    const matchValue = this.MemberInfo;

    if (matchValue != null) {
      return getValue(matchValue).MemberFlags.IsDispatchSlot;
    } else {
      return false;
    }
  }

  get TypeScheme() {
    const matchValue = this.Type;

    if (matchValue.tag === 0) {
      return [matchValue.data[0], matchValue.data[1]];
    } else {
      return [new List(), matchValue];
    }
  }

  get TauType() {
    const matchValue = this.Type;

    if (matchValue.tag === 0) {
      return matchValue.data[1];
    } else {
      return matchValue;
    }
  }

  get Typars() {
    const matchValue = this.Type;

    if (matchValue.tag === 0) {
      return matchValue.data[0];
    } else {
      return new List();
    }
  }

  get LogicalName() {
    const matchValue = this.MemberInfo;

    if (matchValue != null) {
      const matchValue_1 = getValue(matchValue).ImplementedSlotSigs;

      if (matchValue_1.tail != null) {
        return matchValue_1.head.Name;
      } else {
        return this.val_logical_name;
      }
    } else {
      return this.val_logical_name;
    }
  }

  get ValCompiledName() {
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      return getValue(matchValue).val_compiled_name;
    } else {
      return null;
    }
  }

  get CompiledName() {
    let givenName;
    const matchValue = this.val_opt_data;
    const $var40 = matchValue != null ? getValue(matchValue).val_compiled_name != null ? [0, getValue(getValue(matchValue).val_compiled_name)] : [1] : [1];

    switch ($var40[0]) {
      case 0:
        givenName = $var40[1];
        break;

      case 1:
        givenName = this.LogicalName;
        break;
    }

    if ((this.IsCompiledAsTopLevel ? !this.IsMember : false) ? this.IsCompilerGenerated ? true : !this.IsMemberOrModuleBinding : false) {
      return globalStableNameGenerator.GetUniqueCompilerGeneratedName(givenName, this.Range, this.Stamp);
    } else {
      return givenName;
    }
  }

  get PropertyName() {
    const logicalName = this.LogicalName;
    return ChopPropertyName(logicalName);
  }

  get CoreDisplayName() {
    const matchValue = this.MemberInfo;

    if (matchValue == null) {
      return this.LogicalName;
    } else {
      const matchValue_1 = getValue(matchValue).MemberFlags.MemberKind;

      switch (matchValue_1.tag) {
        case 1:
        case 2:
          return this.LogicalName;

        case 5:
        case 4:
        case 3:
          return this.PropertyName;

        default:
          return this.LogicalName;
      }
    }
  }

  get DisplayName() {
    return DemangleOperatorName(this.CoreDisplayName);
  }

  SetValRec(b) {
    this.val_flags = this.val_flags.SetRecursiveValInfo(b);
  }

  SetIsMemberOrModuleBinding() {
    this.val_flags = this.val_flags.SetIsMemberOrModuleBinding;
  }

  SetMakesNoCriticalTailcalls() {
    this.val_flags = this.val_flags.SetMakesNoCriticalTailcalls;
  }

  SetHasBeenReferenced() {
    this.val_flags = this.val_flags.SetHasBeenReferenced;
  }

  SetIsCompiledAsStaticPropertyWithoutField() {
    this.val_flags = this.val_flags.SetIsCompiledAsStaticPropertyWithoutField;
  }

  SetIsFixed() {
    this.val_flags = this.val_flags.SetIsFixed;
  }

  SetValReprInfo(info) {
    var inputRecord;
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      getValue(matchValue).val_repr_info = info;
    } else {
      this.val_opt_data = (inputRecord = Val.EmptyValOptData, new ValOptionalData(inputRecord.val_compiled_name, inputRecord.val_other_range, inputRecord.val_const, inputRecord.val_defn, info, inputRecord.val_access, inputRecord.val_xmldoc, inputRecord.val_member_info, inputRecord.val_declaring_entity, inputRecord.val_xmldocsig, inputRecord.val_attribs));
    }
  }

  SetType(ty) {
    this.val_type = ty;
  }

  SetOtherRange(m) {
    var inputRecord;
    var val_other_range;
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      getValue(matchValue).val_other_range = m;
    } else {
      this.val_opt_data = (inputRecord = Val.EmptyValOptData, val_other_range = m, new ValOptionalData(inputRecord.val_compiled_name, val_other_range, inputRecord.val_const, inputRecord.val_defn, inputRecord.val_repr_info, inputRecord.val_access, inputRecord.val_xmldoc, inputRecord.val_member_info, inputRecord.val_declaring_entity, inputRecord.val_xmldocsig, inputRecord.val_attribs));
    }
  }

  SetDeclaringEntity(parent) {
    var inputRecord;
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      getValue(matchValue).val_declaring_entity = parent;
    } else {
      this.val_opt_data = (inputRecord = Val.EmptyValOptData, new ValOptionalData(inputRecord.val_compiled_name, inputRecord.val_other_range, inputRecord.val_const, inputRecord.val_defn, inputRecord.val_repr_info, inputRecord.val_access, inputRecord.val_xmldoc, inputRecord.val_member_info, parent, inputRecord.val_xmldocsig, inputRecord.val_attribs));
    }
  }

  SetAttribs(attribs) {
    var inputRecord;
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      getValue(matchValue).val_attribs = attribs;
    } else {
      this.val_opt_data = (inputRecord = Val.EmptyValOptData, new ValOptionalData(inputRecord.val_compiled_name, inputRecord.val_other_range, inputRecord.val_const, inputRecord.val_defn, inputRecord.val_repr_info, inputRecord.val_access, inputRecord.val_xmldoc, inputRecord.val_member_info, inputRecord.val_declaring_entity, inputRecord.val_xmldocsig, attribs));
    }
  }

  SetMemberInfo(member_info) {
    var inputRecord;
    var val_member_info;
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      getValue(matchValue).val_member_info = member_info;
    } else {
      this.val_opt_data = (inputRecord = Val.EmptyValOptData, val_member_info = member_info, new ValOptionalData(inputRecord.val_compiled_name, inputRecord.val_other_range, inputRecord.val_const, inputRecord.val_defn, inputRecord.val_repr_info, inputRecord.val_access, inputRecord.val_xmldoc, val_member_info, inputRecord.val_declaring_entity, inputRecord.val_xmldocsig, inputRecord.val_attribs));
    }
  }

  SetValDefn(val_defn) {
    var inputRecord;
    var val_defn_1;
    const matchValue = this.val_opt_data;

    if (matchValue != null) {
      getValue(matchValue).val_defn = val_defn;
    } else {
      this.val_opt_data = (inputRecord = Val.EmptyValOptData, val_defn_1 = val_defn, new ValOptionalData(inputRecord.val_compiled_name, inputRecord.val_other_range, inputRecord.val_const, val_defn_1, inputRecord.val_repr_info, inputRecord.val_access, inputRecord.val_xmldoc, inputRecord.val_member_info, inputRecord.val_declaring_entity, inputRecord.val_xmldocsig, inputRecord.val_attribs));
    }
  }

  static NewUnlinked() {
    return new Val(null, null, null, null, null, null);
  }

  static New(data) {
    return data;
  }

  Link(tg) {
    this.SetData(tg);
  }

  SetData(tg) {
    this.val_logical_name = tg.val_logical_name;
    this.val_range = tg.val_range;
    this.val_type = tg.val_type;
    this.val_stamp = tg.val_stamp;
    this.val_flags = tg.val_flags;
    const matchValue = tg.val_opt_data;

    if (matchValue == null) {} else {
      this.val_opt_data = new ValOptionalData(getValue(matchValue).val_compiled_name, getValue(matchValue).val_other_range, getValue(matchValue).val_const, getValue(matchValue).val_defn, getValue(matchValue).val_repr_info, getValue(matchValue).val_access, getValue(matchValue).val_xmldoc, getValue(matchValue).val_member_info, getValue(matchValue).val_declaring_entity, getValue(matchValue).val_xmldocsig, getValue(matchValue).val_attribs);
    }
  }

  get IsLinked() {
    const matchValue = this.val_logical_name;

    if (matchValue == null) {
      return false;
    } else {
      return true;
    }
  }

  ToString() {
    return this.LogicalName;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Val", Val);
export class ValMemberInfo {
  constructor(apparentEnclosingEntity, implementedSlotSigs, isImplemented, memberFlags) {
    this.ApparentEnclosingEntity = apparentEnclosingEntity;
    this.ImplementedSlotSigs = implementedSlotSigs;
    this.IsImplemented = isImplemented;
    this.MemberFlags = memberFlags;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValMemberInfo",
      interfaces: ["FSharpRecord"],
      properties: {
        ApparentEnclosingEntity: EntityRef,
        ImplementedSlotSigs: makeGeneric(List, {
          T: SlotSig
        }),
        IsImplemented: "boolean",
        MemberFlags: MemberFlags
      }
    };
  }

  ToString() {
    return "ValMemberInfo(...)";
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValMemberInfo", ValMemberInfo);
export class NonLocalValOrMemberRef {
  constructor(enclosingEntity, itemKey) {
    this.EnclosingEntity = enclosingEntity;
    this.ItemKey = itemKey;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.NonLocalValOrMemberRef",
      interfaces: ["FSharpRecord"],
      properties: {
        EnclosingEntity: EntityRef,
        ItemKey: ValLinkageFullKey
      }
    };
  }

  get Ccu() {
    return this.EnclosingEntity.nlr.Ccu;
  }

  get AssemblyName() {
    return this.EnclosingEntity.nlr.AssemblyName;
  }

  get Display() {
    return toString(this);
  }

  ToString() {
    return toString(this.EnclosingEntity.nlr) + "::" + this.ItemKey.PartialKey.LogicalName;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.NonLocalValOrMemberRef", NonLocalValOrMemberRef);
export class ValPublicPath {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValPublicPath",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ValPubPath", PublicPath, ValLinkageFullKey]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValPublicPath", ValPublicPath);
export class NonLocalEntityRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.NonLocalEntityRef",
      interfaces: ["FSharpUnion"],
      cases: [["NonLocalEntityRef", CcuThunk, _Array("string")]]
    };
  }

  static TryDerefEntityPath(ccu, path, i, entity) {
    if (i >= path.length) {
      return new ValueOption(0, entity);
    } else {
      const next = tryFind(path[i], entity.ModuleOrNamespaceType.AllEntitiesByCompiledAndLogicalMangledNames);

      if (next == null) {
        return new ValueOption(1);
      } else {
        return NonLocalEntityRef.TryDerefEntityPath(ccu, path, i + 1, getValue(next));
      }
    }
  }

  TryDeref(canError) {
    if (canError) {
      this.data[0].EnsureDerefable(this.data[1]);
    }

    if (this.data[0].IsUnresolvedReference) {
      return new ValueOption(1);
    } else {
      const matchValue = NonLocalEntityRef.TryDerefEntityPath(this.data[0], this.data[1], 0, this.data[0].Contents);

      if (matchValue.tag === 1) {
        const tryForwardPrefixPath = i => {
          tryForwardPrefixPath: while (true) {
            if (i < this.data[1].length) {
              const matchValue_1 = this.data[0].TryForward(this.data[1].slice(0, i - 1 + 1), this.data[1][i]);

              if (matchValue_1 == null) {
                i = i + 1;
                continue tryForwardPrefixPath;
              } else {
                return NonLocalEntityRef.TryDerefEntityPath(this.data[0], this.data[1], i + 1, getValue(matchValue_1).Deref);
              }
            } else {
              return new ValueOption(1);
            }
          }
        };

        return tryForwardPrefixPath(0);
      } else {
        return matchValue;
      }
    }
  }

  get Ccu() {
    return this.data[0];
  }

  get Path() {
    return this.data[1];
  }

  get DisplayName() {
    return join(".", this.Path);
  }

  get LastItemMangledName() {
    const p = this.Path;
    return p[p.length - 1];
  }

  get EnclosingMangledPath() {
    const p = this.Path;
    return p.slice(0, p.length - 2 + 1);
  }

  get AssemblyName() {
    return this.Ccu.AssemblyName;
  }

  get Deref() {
    const matchValue = this.TryDeref(true);

    if (matchValue.tag === 1) {
      errorR(new InternalUndefinedItemRef(tupledArg => SR.tastUndefinedItemRefModuleNamespace(tupledArg[0], tupledArg[1], tupledArg[2]), this.DisplayName, this.AssemblyName, "<some module on this path>"));
      throw new Error();
    } else {
      return matchValue.data;
    }
  }

  get ModuleOrNamespaceType() {
    return this.Deref.ModuleOrNamespaceType;
  }

  ToString() {
    return this.DisplayName;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.NonLocalEntityRef", NonLocalEntityRef);
export class EntityRef {
  constructor(binding, nlr) {
    this.binding = binding;
    this.nlr = nlr;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.EntityRef",
      interfaces: ["FSharpRecord"],
      properties: {
        binding: Entity,
        nlr: NonLocalEntityRef
      }
    };
  }

  get IsLocalRef() {
    const matchValue = this.nlr;

    if (matchValue == null) {
      return true;
    } else {
      return false;
    }
  }

  get IsResolved() {
    const matchValue = this.binding;

    if (matchValue == null) {
      return false;
    } else {
      return true;
    }
  }

  get PrivateTarget() {
    return this.binding;
  }

  get ResolvedTarget() {
    return this.binding;
  }

  Resolve(canError) {
    const res = this.nlr.TryDeref(canError);

    if (res.tag === 1) {} else {
      this.binding = nullableSlotFull(res.data);
    }
  }

  get Deref() {
    const matchValue = this.binding;

    if (matchValue == null) {
      this.Resolve(true);
      const matchValue_1 = this.binding;

      if (matchValue_1 == null) {
        return error(new InternalUndefinedItemRef(tupledArg => SR.tastUndefinedItemRefModuleNamespaceType(tupledArg[0], tupledArg[1], tupledArg[2]), join(".", this.nlr.EnclosingMangledPath), this.nlr.AssemblyName, this.nlr.LastItemMangledName));
      } else {
        return this.binding;
      }
    } else {
      return this.binding;
    }
  }

  get TryDeref() {
    const matchValue = this.binding;

    if (matchValue == null) {
      this.Resolve(false);
      const matchValue_1 = this.binding;

      if (matchValue_1 == null) {
        return new ValueOption(1);
      } else {
        return new ValueOption(0, this.binding);
      }
    } else {
      return new ValueOption(0, this.binding);
    }
  }

  get CanDeref() {
    let copyOfStruct = this.TryDeref;
    return copyOfStruct.IsSome;
  }

  ToString() {
    return this.IsLocalRef ? this.ResolvedTarget.DisplayName : this.nlr.DisplayName;
  }

  get CompiledRepresentation() {
    return this.Deref.CompiledRepresentation;
  }

  get CompiledRepresentationForNamedType() {
    return this.Deref.CompiledRepresentationForNamedType;
  }

  get DefinitionRange() {
    return this.Deref.DefinitionRange;
  }

  get SigRange() {
    return this.Deref.SigRange;
  }

  get LogicalName() {
    return this.Deref.LogicalName;
  }

  get CompiledName() {
    return this.Deref.CompiledName;
  }

  get DisplayName() {
    return this.Deref.DisplayName;
  }

  get DisplayNameWithStaticParametersAndUnderscoreTypars() {
    return this.Deref.DisplayNameWithStaticParametersAndUnderscoreTypars;
  }

  get DisplayNameWithStaticParameters() {
    return this.Deref.DisplayNameWithStaticParameters;
  }

  get Range() {
    return this.Deref.Range;
  }

  get Stamp() {
    return this.Deref.Stamp;
  }

  get Attribs() {
    return this.Deref.Attribs;
  }

  get XmlDoc() {
    return this.Deref.XmlDoc;
  }

  get XmlDocSig() {
    return this.Deref.XmlDocSig;
  }

  get ModuleOrNamespaceType() {
    return this.Deref.ModuleOrNamespaceType;
  }

  get DemangledModuleOrNamespaceName() {
    return this.Deref.DemangledModuleOrNamespaceName;
  }

  get TypeContents() {
    return this.Deref.TypeContents;
  }

  get TypeOrMeasureKind() {
    return this.Deref.TypeOrMeasureKind;
  }

  get Id() {
    return this.Deref.Id;
  }

  get TypeReprInfo() {
    return this.Deref.TypeReprInfo;
  }

  get ExceptionInfo() {
    return this.Deref.ExceptionInfo;
  }

  get IsExceptionDecl() {
    return this.Deref.IsExceptionDecl;
  }

  Typars(m) {
    return this.Deref.Typars(m);
  }

  get TyparsNoRange() {
    return this.Deref.TyparsNoRange;
  }

  get TypeAbbrev() {
    return this.Deref.TypeAbbrev;
  }

  get IsTypeAbbrev() {
    return this.Deref.IsTypeAbbrev;
  }

  get TypeReprAccessibility() {
    return this.Deref.TypeReprAccessibility;
  }

  get CompiledReprCache() {
    return this.Deref.CompiledReprCache;
  }

  get PublicPath() {
    return this.Deref.PublicPath;
  }

  get Accessibility() {
    return this.Deref.Accessibility;
  }

  get IsPrefixDisplay() {
    return this.Deref.IsPrefixDisplay;
  }

  get IsModuleOrNamespace() {
    return this.Deref.IsModuleOrNamespace;
  }

  get IsNamespace() {
    return this.Deref.IsNamespace;
  }

  get IsModule() {
    return this.Deref.IsModule;
  }

  get CompilationPathOpt() {
    return this.Deref.CompilationPathOpt;
  }

  get CompilationPath() {
    return this.Deref.CompilationPath;
  }

  get AllFieldTable() {
    return this.Deref.AllFieldTable;
  }

  get AllFieldsArray() {
    return this.Deref.AllFieldsArray;
  }

  get AllFieldsAsList() {
    return this.Deref.AllFieldsAsList;
  }

  get TrueFieldsAsList() {
    return this.Deref.TrueFieldsAsList;
  }

  get TrueInstanceFieldsAsList() {
    return this.Deref.TrueInstanceFieldsAsList;
  }

  get AllInstanceFieldsAsList() {
    return this.Deref.AllInstanceFieldsAsList;
  }

  GetFieldByIndex(n) {
    return this.Deref.GetFieldByIndex(n);
  }

  GetFieldByName(n) {
    return this.Deref.GetFieldByName(n);
  }

  get UnionTypeInfo() {
    return this.Deref.UnionTypeInfo;
  }

  get UnionCasesArray() {
    return this.Deref.UnionCasesArray;
  }

  get UnionCasesAsList() {
    return this.Deref.UnionCasesAsList;
  }

  GetUnionCaseByName(n) {
    return this.Deref.GetUnionCaseByName(n);
  }

  get FSharpObjectModelTypeInfo() {
    return this.Deref.FSharpObjectModelTypeInfo;
  }

  get ImmediateInterfacesOfFSharpTycon() {
    return this.Deref.ImmediateInterfacesOfFSharpTycon;
  }

  get ImmediateInterfaceTypesOfFSharpTycon() {
    return this.Deref.ImmediateInterfaceTypesOfFSharpTycon;
  }

  get MembersOfFSharpTyconSorted() {
    return this.Deref.MembersOfFSharpTyconSorted;
  }

  get MembersOfFSharpTyconByName() {
    return this.Deref.MembersOfFSharpTyconByName;
  }

  get IsStructOrEnumTycon() {
    return this.Deref.IsStructOrEnumTycon;
  }

  get IsAsmReprTycon() {
    return this.Deref.IsAsmReprTycon;
  }

  get IsMeasureableReprTycon() {
    return this.Deref.IsMeasureableReprTycon;
  }

  get IsErased() {
    return this.Deref.IsErased;
  }

  get GeneratedHashAndEqualsWithComparerValues() {
    return this.Deref.GeneratedHashAndEqualsWithComparerValues;
  }

  get GeneratedCompareToWithComparerValues() {
    return this.Deref.GeneratedCompareToWithComparerValues;
  }

  get GeneratedCompareToValues() {
    return this.Deref.GeneratedCompareToValues;
  }

  get GeneratedHashAndEqualsValues() {
    return this.Deref.GeneratedHashAndEqualsValues;
  }

  get IsILTycon() {
    return this.Deref.IsILTycon;
  }

  get ILTyconInfo() {
    return this.Deref.ILTyconInfo;
  }

  get ILTyconRawMetadata() {
    return this.Deref.ILTyconRawMetadata;
  }

  get IsUnionTycon() {
    return this.Deref.IsUnionTycon;
  }

  get IsRecordTycon() {
    return this.Deref.IsRecordTycon;
  }

  get IsFSharpObjectModelTycon() {
    return this.Deref.IsFSharpObjectModelTycon;
  }

  get IsHiddenReprTycon() {
    return this.Deref.IsHiddenReprTycon;
  }

  get IsFSharpInterfaceTycon() {
    return this.Deref.IsFSharpInterfaceTycon;
  }

  get IsFSharpDelegateTycon() {
    return this.Deref.IsFSharpDelegateTycon;
  }

  get IsFSharpEnumTycon() {
    return this.Deref.IsFSharpEnumTycon;
  }

  get IsILEnumTycon() {
    return this.Deref.IsILEnumTycon;
  }

  get IsEnumTycon() {
    return this.Deref.IsEnumTycon;
  }

  get IsFSharpStructOrEnumTycon() {
    return this.Deref.IsFSharpStructOrEnumTycon;
  }

  get IsILStructOrEnumTycon() {
    return this.Deref.IsILStructOrEnumTycon;
  }

  get PreEstablishedHasDefaultConstructor() {
    return this.Deref.PreEstablishedHasDefaultConstructor;
  }

  get HasSelfReferentialConstructor() {
    return this.Deref.HasSelfReferentialConstructor;
  }

  get UnionCasesAsRefList() {
    return map(arg00 => this.MakeNestedUnionCaseRef(arg00), this.UnionCasesAsList);
  }

  get TrueInstanceFieldsAsRefList() {
    return map(arg00 => this.MakeNestedRecdFieldRef(arg00), this.TrueInstanceFieldsAsList);
  }

  get AllFieldAsRefList() {
    return map(arg00 => this.MakeNestedRecdFieldRef(arg00), this.AllFieldsAsList);
  }

  MakeNestedRecdFieldRef(rf) {
    return new RecdFieldRef(0, [this, rf.Name]);
  }

  MakeNestedUnionCaseRef(uc) {
    return new UnionCaseRef(0, [this, uc.Id.idText]);
  }

  NestedTyconRef(x) {
    const activePatternResult21250 = _ERefLocal_ERefNonLocal_(this);

    if (activePatternResult21250.tag === 1) {
      return mkNonLocalTyconRefPreResolved(x, activePatternResult21250.data, x.LogicalName);
    } else {
      return mkLocalTyconRef(x);
    }
  }

  RecdFieldRefInNestedTycon(tycon, id) {
    return new RecdFieldRef(0, [this.NestedTyconRef(tycon), id.idText]);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.EntityRef", EntityRef);
export class ValRef {
  constructor(binding, nlr) {
    this.binding = binding;
    this.nlr = nlr;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValRef",
      interfaces: ["FSharpRecord"],
      properties: {
        binding: Val,
        nlr: NonLocalValOrMemberRef
      }
    };
  }

  get IsLocalRef() {
    return this.nlr === null;
  }

  get IsResolved() {
    return !(this.binding === null);
  }

  get PrivateTarget() {
    return this.binding;
  }

  get ResolvedTarget() {
    return this.binding;
  }

  get Deref() {
    if (this.binding === null) {
      let res;
      const e = this.nlr.EnclosingEntity.Deref;
      const possible = e.ModuleOrNamespaceType.TryLinkVal(this.nlr.EnclosingEntity.nlr.Ccu, this.nlr.ItemKey);

      if (possible.tag === 0) {
        res = possible.data;
      } else {
        res = error(new InternalUndefinedItemRef(tupledArg => SR.tastUndefinedItemRefVal(tupledArg[0], tupledArg[1], tupledArg[2]), e.DisplayNameWithStaticParameters, this.nlr.AssemblyName, toText(printf("%+A"))(this.nlr.ItemKey.PartialKey)));
      }

      this.binding = nullableSlotFull(res);
      return res;
    } else {
      return this.binding;
    }
  }

  get TryDeref() {
    if (this.binding === null) {
      let resOpt;
      const matchValue = this.nlr.EnclosingEntity.TryDeref;

      if (matchValue.tag === 0) {
        resOpt = matchValue.data.ModuleOrNamespaceType.TryLinkVal(this.nlr.EnclosingEntity.nlr.Ccu, this.nlr.ItemKey);
      } else {
        resOpt = new ValueOption(1);
      }

      if (resOpt.tag === 0) {
        this.binding = nullableSlotFull(resOpt.data);
      }

      return resOpt;
    } else {
      return new ValueOption(0, this.binding);
    }
  }

  get Type() {
    return this.Deref.Type;
  }

  get TypeScheme() {
    return this.Deref.TypeScheme;
  }

  get TauType() {
    return this.Deref.TauType;
  }

  get Typars() {
    return this.Deref.Typars;
  }

  get LogicalName() {
    return this.Deref.LogicalName;
  }

  get DisplayName() {
    return this.Deref.DisplayName;
  }

  get CoreDisplayName() {
    return this.Deref.CoreDisplayName;
  }

  get Range() {
    return this.Deref.Range;
  }

  get Accessibility() {
    return this.Deref.Accessibility;
  }

  get DeclaringEntity() {
    return this.Deref.DeclaringEntity;
  }

  get ApparentEnclosingEntity() {
    return this.Deref.ApparentEnclosingEntity;
  }

  get DefinitionRange() {
    return this.Deref.DefinitionRange;
  }

  get SigRange() {
    return this.Deref.SigRange;
  }

  get LiteralValue() {
    return this.Deref.LiteralValue;
  }

  get Id() {
    return this.Deref.Id;
  }

  get PropertyName() {
    return this.Deref.PropertyName;
  }

  get IsPropertyGetterMethod() {
    const matchValue = this.MemberInfo;

    if (matchValue != null) {
      if (getValue(matchValue).MemberFlags.MemberKind.Equals(new MemberKind(3))) {
        return true;
      } else {
        return getValue(matchValue).MemberFlags.MemberKind.Equals(new MemberKind(5));
      }
    } else {
      return false;
    }
  }

  get IsPropertySetterMethod() {
    const matchValue = this.MemberInfo;

    if (matchValue != null) {
      if (getValue(matchValue).MemberFlags.MemberKind.Equals(new MemberKind(4))) {
        return true;
      } else {
        return getValue(matchValue).MemberFlags.MemberKind.Equals(new MemberKind(5));
      }
    } else {
      return false;
    }
  }

  get Stamp() {
    return this.Deref.Stamp;
  }

  get IsCompiledAsTopLevel() {
    return this.Deref.IsCompiledAsTopLevel;
  }

  get IsDispatchSlot() {
    return this.Deref.IsDispatchSlot;
  }

  get CompiledName() {
    return this.Deref.CompiledName;
  }

  get PublicPath() {
    return this.Deref.PublicPath;
  }

  get ReflectedDefinition() {
    return this.Deref.ReflectedDefinition;
  }

  get IsConstructor() {
    return this.Deref.IsConstructor;
  }

  get IsOverrideOrExplicitImpl() {
    return this.Deref.IsOverrideOrExplicitImpl;
  }

  get MemberInfo() {
    return this.Deref.MemberInfo;
  }

  get IsMember() {
    return this.Deref.IsMember;
  }

  get IsModuleBinding() {
    return this.Deref.IsModuleBinding;
  }

  get IsInstanceMember() {
    return this.Deref.IsInstanceMember;
  }

  get IsMutable() {
    return this.Deref.IsMutable;
  }

  get PermitsExplicitTypeInstantiation() {
    return this.Deref.PermitsExplicitTypeInstantiation;
  }

  get MakesNoCriticalTailcalls() {
    return this.Deref.MakesNoCriticalTailcalls;
  }

  get IsMemberOrModuleBinding() {
    return this.Deref.IsMemberOrModuleBinding;
  }

  get IsExtensionMember() {
    return this.Deref.IsExtensionMember;
  }

  get IsIncrClassConstructor() {
    return this.Deref.IsIncrClassConstructor;
  }

  get IsIncrClassGeneratedMember() {
    return this.Deref.IsIncrClassGeneratedMember;
  }

  get RecursiveValInfo() {
    return this.Deref.RecursiveValInfo;
  }

  get BaseOrThisInfo() {
    return this.Deref.BaseOrThisInfo;
  }

  get IsTypeFunction() {
    return this.Deref.IsTypeFunction;
  }

  get ValReprInfo() {
    return this.Deref.ValReprInfo;
  }

  get InlineInfo() {
    return this.Deref.InlineInfo;
  }

  get MustInline() {
    return this.Deref.MustInline;
  }

  get IsCompilerGenerated() {
    return this.Deref.IsCompilerGenerated;
  }

  get Attribs() {
    return this.Deref.Attribs;
  }

  get XmlDoc() {
    return this.Deref.XmlDoc;
  }

  get XmlDocSig() {
    return this.Deref.XmlDocSig;
  }

  get TopValDeclaringEntity() {
    return this.Deref.TopValDeclaringEntity;
  }

  get HasDeclaringEntity() {
    return this.Deref.HasDeclaringEntity;
  }

  get MemberApparentEntity() {
    return this.Deref.MemberApparentEntity;
  }

  get NumObjArgs() {
    return this.Deref.NumObjArgs;
  }

  ToString() {
    return this.IsLocalRef ? this.ResolvedTarget.DisplayName : toString(this.nlr);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValRef", ValRef);
export class UnionCaseRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.UnionCaseRef",
      interfaces: ["FSharpUnion"],
      cases: [["UCRef", EntityRef, "string"]]
    };
  }

  get TyconRef() {
    return this.data[0];
  }

  get CaseName() {
    return this.data[1];
  }

  get Tycon() {
    return this.TyconRef.Deref;
  }

  get UnionCase() {
    const matchValue = this.TyconRef.GetUnionCaseByName(this.CaseName);

    if (matchValue == null) {
      return error(new InternalError(toText(printf("union case %s not found in type %s"))(this.CaseName, this.TyconRef.LogicalName), this.TyconRef.Range));
    } else {
      return getValue(matchValue);
    }
  }

  get TryUnionCase() {
    const $var43 = this.TyconRef.TryDeref;

    const $var42 = tcref => {
      const $var41 = tcref.GetUnionCaseByName(this.CaseName);

      if ($var41 == null) {
        return new ValueOption(1);
      } else {
        return new ValueOption(0, getValue($var41));
      }
    };

    if ($var43.tag === 1) {
      return new ValueOption(1);
    } else {
      return $var42($var43.data);
    }
  }

  get Attribs() {
    return this.UnionCase.Attribs;
  }

  get Range() {
    return this.UnionCase.Range;
  }

  get DefinitionRange() {
    return this.UnionCase.DefinitionRange;
  }

  get SigRange() {
    return this.UnionCase.SigRange;
  }

  get Index() {
    try {
      return this.TyconRef.UnionCasesArray.findIndex(ucspec => ucspec.DisplayName === this.CaseName) | 0;
    } catch (matchValue) {
      if (matchValue instanceof Error) {
        return error(new InternalError(toText(printf("union case %s not found in type %s"))(this.CaseName, this.TyconRef.LogicalName), this.TyconRef.Range)) | 0;
      } else {
        throw matchValue;
      }
    }
  }

  get AllFieldsAsList() {
    return this.UnionCase.FieldTable.AllFieldsAsList;
  }

  get ReturnType() {
    return this.UnionCase.ReturnType;
  }

  FieldByIndex(n) {
    return this.UnionCase.FieldTable.FieldByIndex(n);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.UnionCaseRef", UnionCaseRef);
export class RecdFieldRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.RecdFieldRef",
      interfaces: ["FSharpUnion"],
      cases: [["RFRef", EntityRef, "string"]]
    };
  }

  get TyconRef() {
    return this.data[0];
  }

  get FieldName() {
    return this.data[1];
  }

  get Tycon() {
    return this.TyconRef.Deref;
  }

  get RecdField() {
    const matchValue = this.data[0].GetFieldByName(this.data[1]);

    if (matchValue == null) {
      return error(new InternalError(toText(printf("field %s not found in type %s"))(this.data[1], this.data[0].LogicalName), this.data[0].Range));
    } else {
      return getValue(matchValue);
    }
  }

  get TryRecdField() {
    const $var46 = this.TyconRef.TryDeref;

    const $var45 = tcref => {
      const $var44 = tcref.GetFieldByName(this.FieldName);

      if ($var44 == null) {
        return new ValueOption(1);
      } else {
        return new ValueOption(0, getValue($var44));
      }
    };

    if ($var46.tag === 1) {
      return new ValueOption(1);
    } else {
      return $var45($var46.data);
    }
  }

  get PropertyAttribs() {
    return this.RecdField.PropertyAttribs;
  }

  get Range() {
    return this.RecdField.Range;
  }

  get DefinitionRange() {
    return this.RecdField.DefinitionRange;
  }

  get SigRange() {
    return this.RecdField.SigRange;
  }

  get Index() {
    try {
      return this.data[0].AllFieldsArray.findIndex(rfspec => rfspec.Name === this.data[1]) | 0;
    } catch (matchValue) {
      if (matchValue instanceof Error) {
        return error(new InternalError(toText(printf("field %s not found in type %s"))(this.data[1], this.data[0].LogicalName), this.data[0].Range)) | 0;
      } else {
        throw matchValue;
      }
    }
  }

}
setType("Microsoft.FSharp.Compiler.Tast.RecdFieldRef", RecdFieldRef);
export class TType {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TType",
      interfaces: ["FSharpUnion"],
      cases: [["TType_forall", makeGeneric(List, {
        T: Typar
      }), TType], ["TType_app", EntityRef, makeGeneric(List, {
        T: TType
      })], ["TType_tuple", TupInfo, makeGeneric(List, {
        T: TType
      })], ["TType_fun", TType, TType], ["TType_ucase", UnionCaseRef, makeGeneric(List, {
        T: TType
      })], ["TType_var", Typar], ["TType_measure", Measure]]
    };
  }

  ToString() {
    return this.tag === 1 ? this.data[0].DisplayName + (this.data[1].tail == null ? "" : "<" + join(",", map(value => toString(value), this.data[1])) + ">") : this.tag === 2 ? (this.data[0].data ? "struct " : "") + join(",", map(value_1 => toString(value_1), this.data[1])) + ")" : this.tag === 3 ? "(" + toString(this.data[0]) + " -> " + toString(this.data[1]) + ")" : this.tag === 4 ? "union case type " + this.data[0].CaseName + (this.data[1].tail == null ? "" : "<" + join(",", map(value_2 => toString(value_2), this.data[1])) + ">") : this.tag === 5 ? this.data.DisplayName : this.tag === 6 ? toText(printf("%A"))(this.data) : "forall _. " + toString(this.data[1]);
  }

  GetAssemblyName() {
    if (this.tag === 1) {
      return this.data[0].CompilationPath.ILScopeRef.QualifiedName;
    } else if (this.tag === 2) {
      return "";
    } else if (this.tag === 3) {
      return "";
    } else if (this.tag === 6) {
      return "";
    } else if (this.tag === 5) {
      return (_arg2 => _arg2 == null ? "" : getValue(_arg2).GetAssemblyName())(this.data.Solution);
    } else if (this.tag === 4) {
      const patternInput = this.data[0].Tycon.ILTyconInfo;
      return patternInput.data[0].QualifiedName;
    } else {
      return this.data[1].GetAssemblyName();
    }
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TType", TType);
export class TupInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TupInfo",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Const", "boolean"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TupInfo", TupInfo);
export class Measure {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Measure",
      interfaces: ["FSharpUnion"],
      cases: [["Var", Typar], ["Con", EntityRef], ["Prod", Measure, Measure], ["Inv", Measure], ["One"], ["RationalPower", Measure, Rational]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Measure", Measure);
export class CcuData {
  constructor(fileName, iLScopeRef, stamp, qualifiedName, sourceCodeDirectory, isFSharp, usesFSharp20PlusQuotations, contents, tryGetILModuleDef, memberSignatureEquality, typeForwarders) {
    this.FileName = fileName;
    this.ILScopeRef = iLScopeRef;
    this.Stamp = stamp;
    this.QualifiedName = qualifiedName;
    this.SourceCodeDirectory = sourceCodeDirectory;
    this.IsFSharp = isFSharp;
    this.UsesFSharp20PlusQuotations = usesFSharp20PlusQuotations;
    this.Contents = contents;
    this.TryGetILModuleDef = tryGetILModuleDef;
    this.MemberSignatureEquality = memberSignatureEquality;
    this.TypeForwarders = typeForwarders;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.CcuData",
      interfaces: ["FSharpRecord"],
      properties: {
        FileName: Option("string"),
        ILScopeRef: ILScopeRef,
        Stamp: Long,
        QualifiedName: Option("string"),
        SourceCodeDirectory: "string",
        IsFSharp: "boolean",
        UsesFSharp20PlusQuotations: "boolean",
        Contents: Entity,
        TryGetILModuleDef: _Function([Unit, Option(ILModuleDef)]),
        MemberSignatureEquality: _Function([TType, TType, "boolean"]),
        TypeForwarders: makeGeneric(_Map, {
          Key: Tuple([_Array("string"), "string"]),
          Value: Any
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.CcuData", CcuData);
export class CcuThunk {
  constructor(target, orphanfixup, name) {
    this.target = target;
    this.orphanfixup = orphanfixup;
    this.name = name;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.CcuThunk",
      interfaces: ["FSharpRecord"],
      properties: {
        target: CcuData,
        orphanfixup: "boolean",
        name: "string"
      }
    };
  }

  get Deref() {
    if (this.target == null ? true : this.orphanfixup) {
      throw new UnresolvedReferenceNoRange(this.name);
    }

    return this.target;
  }

  get IsUnresolvedReference() {
    return this.target == null ? true : this.orphanfixup;
  }

  EnsureDerefable(requiringPath) {
    if (this.IsUnresolvedReference) {
      const path = join(".", ...requiringPath);
      throw new UnresolvedPathReferenceNoRange(this.name, path);
    }
  }

  get UsesFSharp20PlusQuotations() {
    return this.Deref.UsesFSharp20PlusQuotations;
  }

  set UsesFSharp20PlusQuotations(v) {
    this.Deref.UsesFSharp20PlusQuotations = v;
  }

  get AssemblyName() {
    return this.name;
  }

  get ILScopeRef() {
    return this.Deref.ILScopeRef;
  }

  get Stamp() {
    return this.Deref.Stamp;
  }

  get FileName() {
    return this.Deref.FileName;
  }

  TryGetILModuleDef() {
    return this.Deref.TryGetILModuleDef();
  }

  get QualifiedName() {
    return this.Deref.QualifiedName;
  }

  get SourceCodeDirectory() {
    return this.Deref.SourceCodeDirectory;
  }

  get IsFSharp() {
    return this.Deref.IsFSharp;
  }

  get Contents() {
    return this.Deref.Contents;
  }

  get TypeForwarders() {
    return this.Deref.TypeForwarders;
  }

  get RootModulesAndNamespaces() {
    return this.Contents.ModuleOrNamespaceType.ModuleAndNamespaceDefinitions;
  }

  get RootTypeAndExceptionDefinitions() {
    return this.Contents.ModuleOrNamespaceType.TypeAndExceptionDefinitions;
  }

  static Create(nm, x) {
    return new CcuThunk(x, false, nm);
  }

  static CreateDelayed(nm) {
    return new CcuThunk(null, false, nm);
  }

  Fixup(avail) {
    const matchValue = this.target;

    if (matchValue == null) {} else if (this.AssemblyName !== "FSharp.Core") {
      errorR(Microsoft.FSharp.Core.Operators.Failure("internal error: Fixup: the ccu thunk for assembly " + this.AssemblyName + " not delayed!"));
    }

    const matchValue_1 = avail.target;

    if (matchValue_1 == null) {
      this.target = error(Microsoft.FSharp.Core.Operators.Failure("internal error: ccu thunk '" + avail.name + "' not fixed up!"));
    } else {
      this.target = avail.target;
    }
  }

  FixupOrphaned() {
    const matchValue = this.target;

    if (matchValue == null) {
      this.orphanfixup = true;
    } else {
      errorR(Microsoft.FSharp.Core.Operators.Failure("internal error: FixupOrphaned: the ccu thunk for assembly " + this.AssemblyName + " not delayed!"));
    }
  }

  TryForward(nlpath, item) {
    this.EnsureDerefable(nlpath);
    const matchValue = tryFind([nlpath, item], this.TypeForwarders);

    if (matchValue == null) {
      return null;
    } else {
      return getValue(matchValue).value;
    }
  }

  MemberSignatureEquality(ty1, ty2) {
    return this.Deref.MemberSignatureEquality(ty1, ty2);
  }

  ToString() {
    return this.AssemblyName;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.CcuThunk", CcuThunk);
export class CcuResolutionResult {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.CcuResolutionResult",
      interfaces: ["FSharpUnion"],
      cases: [["ResolvedCcu", CcuThunk], ["UnresolvedCcu", "string"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.CcuResolutionResult", CcuResolutionResult);
export class PickledCcuInfo {
  constructor(mspec, compileTimeWorkingDir, usesQuotations) {
    this.mspec = mspec;
    this.compileTimeWorkingDir = compileTimeWorkingDir;
    this.usesQuotations = usesQuotations;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.PickledCcuInfo",
      interfaces: ["FSharpRecord"],
      properties: {
        mspec: Entity,
        compileTimeWorkingDir: "string",
        usesQuotations: "boolean"
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.PickledCcuInfo", PickledCcuInfo);
export class AttribKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.AttribKind",
      interfaces: ["FSharpUnion"],
      cases: [["ILAttrib", ILMethodRef], ["FSAttrib", ValRef]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.AttribKind", AttribKind);
export class Attrib {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Attrib",
      interfaces: ["FSharpUnion"],
      cases: [["Attrib", EntityRef, AttribKind, makeGeneric(List, {
        T: AttribExpr
      }), makeGeneric(List, {
        T: AttribNamedArg
      }), "boolean", Option("number"), range]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Attrib", Attrib);
export class AttribExpr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.AttribExpr",
      interfaces: ["FSharpUnion"],
      cases: [["AttribExpr", Expr, Expr]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.AttribExpr", AttribExpr);
export class AttribNamedArg {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.AttribNamedArg",
      interfaces: ["FSharpUnion"],
      cases: [["AttribNamedArg", Tuple(["string", TType, "boolean", AttribExpr])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.AttribNamedArg", AttribNamedArg);
export class Const {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Const",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Bool", "boolean"], ["SByte", "number"], ["Byte", "number"], ["Int16", "number"], ["UInt16", "number"], ["Int32", "number"], ["UInt32", "number"], ["Int64", Long], ["UInt64", Long], ["IntPtr", Long], ["UIntPtr", Long], ["Single", "number"], ["Double", "number"], ["Char", "string"], ["String", "string"], ["Decimal", "number"], ["Unit"], ["Zero"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Const", Const);
export class DecisionTree {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.DecisionTree",
      interfaces: ["FSharpUnion"],
      cases: [["TDSwitch", Expr, makeGeneric(List, {
        T: DecisionTreeCase
      }), Option(DecisionTree), range], ["TDSuccess", makeGeneric(List, {
        T: Expr
      }), "number"], ["TDBind", Binding, DecisionTree]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.DecisionTree", DecisionTree);
export class DecisionTreeCase {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.DecisionTreeCase",
      interfaces: ["FSharpUnion"],
      cases: [["TCase", DecisionTreeTest, DecisionTree]]
    };
  }

  get Discriminator() {
    return this.data[0];
  }

  get CaseTree() {
    return this.data[1];
  }

}
setType("Microsoft.FSharp.Compiler.Tast.DecisionTreeCase", DecisionTreeCase);
export class DecisionTreeTest {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.DecisionTreeTest",
      interfaces: ["FSharpUnion"],
      cases: [["UnionCase", UnionCaseRef, makeGeneric(List, {
        T: TType
      })], ["ArrayLength", "number", TType], ["Const", Const], ["IsNull"], ["IsInst", TType, TType], ["ActivePatternCase", Expr, makeGeneric(List, {
        T: TType
      }), Option(Tuple([ValRef, makeGeneric(List, {
        T: TType
      })])), "number", ActivePatternInfo]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.DecisionTreeTest", DecisionTreeTest);
export class DecisionTreeTarget {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.DecisionTreeTarget",
      interfaces: ["FSharpUnion"],
      cases: [["TTarget", makeGeneric(List, {
        T: Val
      }), Expr, SequencePointInfoForTarget]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.DecisionTreeTarget", DecisionTreeTarget);
export class Binding {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Binding",
      interfaces: ["FSharpUnion"],
      cases: [["TBind", Val, Expr, SequencePointInfoForBinding]]
    };
  }

  get Var() {
    return this.data[0];
  }

  get Expr() {
    return this.data[1];
  }

  get SequencePointInfo() {
    return this.data[2];
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Binding", Binding);
export class ActivePatternElemRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ActivePatternElemRef",
      interfaces: ["FSharpUnion"],
      cases: [["APElemRef", ActivePatternInfo, ValRef, "number"]]
    };
  }

  get ActivePatternInfo() {
    return this.data[0];
  }

  get ActivePatternVal() {
    return this.data[1];
  }

  get CaseIndex() {
    return this.data[2];
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ActivePatternElemRef", ActivePatternElemRef);
export class ValReprInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValReprInfo",
      interfaces: ["FSharpUnion"],
      cases: [["ValReprInfo", makeGeneric(List, {
        T: TyparReprInfo
      }), makeGeneric(List, {
        T: makeGeneric(List, {
          T: ArgReprInfo
        })
      }), ArgReprInfo]]
    };
  }

  get ArgInfos() {
    return this.data[1];
  }

  get NumCurriedArgs() {
    return this.data[1].length;
  }

  get NumTypars() {
    return this.data[0].length;
  }

  get HasNoArgs() {
    return this.data[0].tail == null ? this.data[1].tail == null : false;
  }

  get AritiesOfArgs() {
    return map(list => list.length, this.data[1]);
  }

  get KindsOfTypars() {
    return map(_arg4 => _arg4.data[1], this.data[0]);
  }

  get TotalArgCount() {
    const loop = (args, acc) => {
      loop: while (true) {
        if (args.tail != null) {
          if (args.head.tail != null) {
            if (args.head.tail.tail != null) {
              const $var79 = args.tail;
              acc = acc + args.head.tail.tail.length + 2;
              args = $var79;
              continue loop;
            } else {
              args = args.tail;
              acc = acc + 1;
              continue loop;
            }
          } else {
            args = args.tail;
            acc = acc;
            continue loop;
          }
        } else {
          return acc | 0;
        }
      }
    };

    return loop(this.data[1], 0) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValReprInfo", ValReprInfo);
export class ArgReprInfo {
  constructor(attribs, name) {
    this.Attribs = attribs;
    this.Name = name;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ArgReprInfo",
      interfaces: ["FSharpRecord"],
      properties: {
        Attribs: makeGeneric(List, {
          T: Attrib
        }),
        Name: Option(Ident)
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ArgReprInfo", ArgReprInfo);
export class TyparReprInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TyparReprInfo",
      interfaces: ["FSharpUnion"],
      cases: [["TyparReprInfo", Ident, TyparKind]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TyparReprInfo", TyparReprInfo);
export class Expr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Expr",
      interfaces: ["FSharpUnion"],
      cases: [["Const", Const, range, TType], ["Val", ValRef, ValUseFlag, range], ["Sequential", Expr, Expr, SequentialOpKind, SequencePointInfoForSeq, range], ["Lambda", Long, Option(Val), Option(Val), makeGeneric(List, {
        T: Val
      }), Expr, range, TType], ["TyLambda", Long, makeGeneric(List, {
        T: Typar
      }), Expr, range, TType], ["App", Expr, TType, makeGeneric(List, {
        T: TType
      }), makeGeneric(List, {
        T: Expr
      }), range], ["LetRec", makeGeneric(List, {
        T: Binding
      }), Expr, range, makeGeneric(cache, {
        T: FreeVars
      })], ["Let", Binding, Expr, range, makeGeneric(cache, {
        T: FreeVars
      })], ["Obj", Long, TType, Option(Val), Expr, makeGeneric(List, {
        T: ObjExprMethod
      }), makeGeneric(List, {
        T: Tuple([TType, makeGeneric(List, {
          T: ObjExprMethod
        })])
      }), range], ["Match", SequencePointInfoForBinding, range, DecisionTree, _Array(DecisionTreeTarget), range, TType], ["StaticOptimization", makeGeneric(List, {
        T: StaticOptimization
      }), Expr, Expr, range], ["Op", TOp, makeGeneric(List, {
        T: TType
      }), makeGeneric(List, {
        T: Expr
      }), range], ["Quote", Expr, Any, "boolean", range, TType], ["TyChoose", makeGeneric(List, {
        T: Typar
      }), Expr, range], ["Link", Any]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Expr", Expr);
export class TOp {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TOp",
      interfaces: ["FSharpUnion"],
      cases: [["UnionCase", UnionCaseRef], ["ExnConstr", EntityRef], ["Tuple", TupInfo], ["Array"], ["Bytes", _Array(Uint8Array, true)], ["UInt16s", _Array(Uint16Array, true)], ["While", SequencePointInfoForWhileLoop, SpecialWhileLoopMarker], ["For", SequencePointInfoForForLoop, ForLoopStyle], ["TryCatch", SequencePointInfoForTry, SequencePointInfoForWith], ["TryFinally", SequencePointInfoForTry, SequencePointInfoForFinally], ["Recd", RecordConstructionInfo, EntityRef], ["ValFieldSet", RecdFieldRef], ["ValFieldGet", RecdFieldRef], ["ValFieldGetAddr", RecdFieldRef], ["UnionCaseTagGet", EntityRef], ["UnionCaseProof", UnionCaseRef], ["UnionCaseFieldGet", UnionCaseRef, "number"], ["UnionCaseFieldGetAddr", UnionCaseRef, "number"], ["UnionCaseFieldSet", UnionCaseRef, "number"], ["ExnFieldGet", EntityRef, "number"], ["ExnFieldSet", EntityRef, "number"], ["TupleFieldGet", TupInfo, "number"], ["ILAsm", makeGeneric(List, {
        T: ILInstr
      }), makeGeneric(List, {
        T: TType
      })], ["RefAddrGet"], ["Coerce"], ["Reraise"], ["Return"], ["Goto", "number"], ["Label", "number"], ["TraitCall", TraitConstraintInfo], ["LValueOp", LValueOperation, ValRef], ["ILCall", "boolean", "boolean", "boolean", "boolean", ValUseFlag, "boolean", "boolean", ILMethodRef, makeGeneric(List, {
        T: TType
      }), makeGeneric(List, {
        T: TType
      }), makeGeneric(List, {
        T: TType
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TOp", TOp);
export class RecordConstructionInfo {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.RecordConstructionInfo",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["RecdExprIsObjInit"], ["RecdExpr"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.RecordConstructionInfo", RecordConstructionInfo);
export class SpecialWhileLoopMarker {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.SpecialWhileLoopMarker",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NoSpecialWhileLoopMarker"], ["WhileLoopForCompiledForEachExprMarker"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.SpecialWhileLoopMarker", SpecialWhileLoopMarker);
export class ForLoopStyle {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ForLoopStyle",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["FSharpForLoopUp"], ["FSharpForLoopDown"], ["CSharpForLoopUp"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ForLoopStyle", ForLoopStyle);
export class LValueOperation {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.LValueOperation",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["LGetAddr"], ["LByrefGet"], ["LSet"], ["LByrefSet"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.LValueOperation", LValueOperation);
export class SequentialOpKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.SequentialOpKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NormalSeq"], ["ThenDoSeq"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.SequentialOpKind", SequentialOpKind);
export class ValUseFlag {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ValUseFlag",
      interfaces: ["FSharpUnion"],
      cases: [["PossibleConstrainedCall", TType], ["NormalValUse"], ["CtorValUsedAsSuperInit"], ["CtorValUsedAsSelfInit"], ["VSlotDirectCall"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ValUseFlag", ValUseFlag);
export class StaticOptimization {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.StaticOptimization",
      interfaces: ["FSharpUnion"],
      cases: [["TTyconEqualsTycon", TType, TType], ["TTyconIsStruct", TType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.StaticOptimization", StaticOptimization);
export class ObjExprMethod {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ObjExprMethod",
      interfaces: ["FSharpUnion"],
      cases: [["TObjExprMethod", SlotSig, makeGeneric(List, {
        T: Attrib
      }), makeGeneric(List, {
        T: Typar
      }), makeGeneric(List, {
        T: makeGeneric(List, {
          T: Val
        })
      }), Expr, range]]
    };
  }

  get Id() {
    return mkSynId(this.data[5], this.data[0].Name);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ObjExprMethod", ObjExprMethod);
export class SlotSig {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.SlotSig",
      interfaces: ["FSharpUnion"],
      cases: [["TSlotSig", "string", TType, makeGeneric(List, {
        T: Typar
      }), makeGeneric(List, {
        T: Typar
      }), makeGeneric(List, {
        T: makeGeneric(List, {
          T: SlotParam
        })
      }), Option(TType)]]
    };
  }

  get Name() {
    return this.data[0];
  }

  get ImplementedType() {
    return this.data[1];
  }

  get ClassTypars() {
    return this.data[2];
  }

  get MethodTypars() {
    return this.data[3];
  }

  get FormalParams() {
    return this.data[4];
  }

  get FormalReturnType() {
    return this.data[5];
  }

}
setType("Microsoft.FSharp.Compiler.Tast.SlotSig", SlotSig);
export class SlotParam {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.SlotParam",
      interfaces: ["FSharpUnion"],
      cases: [["TSlotParam", Option("string"), TType, "boolean", "boolean", "boolean", makeGeneric(List, {
        T: Attrib
      })]]
    };
  }

  get Type() {
    return this.data[1];
  }

}
setType("Microsoft.FSharp.Compiler.Tast.SlotParam", SlotParam);
export class ModuleOrNamespaceExprWithSig {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceExprWithSig",
      interfaces: ["FSharpUnion"],
      cases: [["ModuleOrNamespaceExprWithSig", ModuleOrNamespaceType, ModuleOrNamespaceExpr, range]]
    };
  }

  get Type() {
    return this.data[0];
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceExprWithSig", ModuleOrNamespaceExprWithSig);
export class ModuleOrNamespaceExpr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceExpr",
      interfaces: ["FSharpUnion"],
      cases: [["TMAbstract", ModuleOrNamespaceExprWithSig], ["TMDefs", makeGeneric(List, {
        T: ModuleOrNamespaceExpr
      })], ["TMDefLet", Binding, range], ["TMDefDo", Expr, range], ["TMDefRec", "boolean", makeGeneric(List, {
        T: Entity
      }), makeGeneric(List, {
        T: ModuleOrNamespaceBinding
      }), range]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceExpr", ModuleOrNamespaceExpr);
export class ModuleOrNamespaceBinding {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceBinding",
      interfaces: ["FSharpUnion"],
      cases: [["Binding", Binding], ["Module", Entity, ModuleOrNamespaceExpr]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.ModuleOrNamespaceBinding", ModuleOrNamespaceBinding);
export class TypedImplFile {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TypedImplFile",
      interfaces: ["FSharpUnion"],
      cases: [["TImplFile", QualifiedNameOfFile, makeGeneric(List, {
        T: ScopedPragma
      }), ModuleOrNamespaceExprWithSig, "boolean", "boolean"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TypedImplFile", TypedImplFile);
export class TypedAssemblyAfterOptimization {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.TypedAssemblyAfterOptimization",
      interfaces: ["FSharpUnion"],
      cases: [["TypedAssemblyAfterOptimization", makeGeneric(List, {
        T: Tuple([TypedImplFile, _Function([Expr, Expr])])
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tast.TypedAssemblyAfterOptimization", TypedAssemblyAfterOptimization);
export class FreeTyvars {
  constructor(freeTycons, freeTraitSolutions, freeTypars) {
    this.FreeTycons = freeTycons;
    this.FreeTraitSolutions = freeTraitSolutions;
    this.FreeTypars = freeTypars;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.FreeTyvars",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        FreeTycons: makeGeneric(_Set, {
          T: Entity,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        FreeTraitSolutions: makeGeneric(_Set, {
          T: Val,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        FreeTypars: makeGeneric(_Set, {
          T: Typar,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        })
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.FreeTyvars", FreeTyvars);
export class FreeVars {
  constructor(freeLocals, usesMethodLocalConstructs, usesUnboundRethrow, freeLocalTyconReprs, freeRecdFields, freeUnionCases, freeTyvars) {
    this.FreeLocals = freeLocals;
    this.UsesMethodLocalConstructs = usesMethodLocalConstructs;
    this.UsesUnboundRethrow = usesUnboundRethrow;
    this.FreeLocalTyconReprs = freeLocalTyconReprs;
    this.FreeRecdFields = freeRecdFields;
    this.FreeUnionCases = freeUnionCases;
    this.FreeTyvars = freeTyvars;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.FreeVars",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        FreeLocals: makeGeneric(_Set, {
          T: Val,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        UsesMethodLocalConstructs: "boolean",
        UsesUnboundRethrow: "boolean",
        FreeLocalTyconReprs: makeGeneric(_Set, {
          T: Entity,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        FreeRecdFields: makeGeneric(_Set, {
          T: RecdFieldRef,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        FreeUnionCases: makeGeneric(_Set, {
          T: UnionCaseRef,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        FreeTyvars: FreeTyvars
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.FreeVars", FreeVars);
export class CompiledTypeRepr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.CompiledTypeRepr",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ILAsmNamed", ILTypeRef, ILBoxity, Option(ILType)], ["ILAsmOpen", ILType]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Tast.CompiledTypeRepr", CompiledTypeRepr);
export const ValReprInfoModule = function (__exports) {
  const unnamedTopArg1 = __exports.unnamedTopArg1 = new ArgReprInfo(new List(), null);
  const unnamedTopArg = __exports.unnamedTopArg = ofArray([unnamedTopArg1]);
  const unitArgData = __exports.unitArgData = ofArray([new List()]);
  const unnamedRetVal = __exports.unnamedRetVal = new ArgReprInfo(new List(), null);
  const selfMetadata = __exports.selfMetadata = unnamedTopArg;
  const emptyValData = __exports.emptyValData = new ValReprInfo(0, [new List(), new List(), unnamedRetVal]);

  const InferTyparInfo = __exports.InferTyparInfo = function (tps) {
    return map(function (tp) {
      return new TyparReprInfo(0, [tp.Id, tp.Kind]);
    }, tps);
  };

  const InferArgReprInfo = __exports.InferArgReprInfo = function (v) {
    return new ArgReprInfo(new List(), v.Id);
  };

  const InferArgReprInfos = __exports.InferArgReprInfos = function (vs) {
    return new ValReprInfo(0, [new List(), List_1.mapSquared(function (v) {
      return InferArgReprInfo(v);
    }, vs), unnamedRetVal]);
  };

  const HasNoArgs = __exports.HasNoArgs = function (_arg1) {
    if (_arg1.data[0].tail == null) {
      return _arg1.data[1].tail == null;
    } else {
      return false;
    }
  };

  return __exports;
}({});
export function typeOfVal(v) {
  return v.Type;
}
export function typesOfVals(v) {
  return map(function (v_1) {
    return v_1.Type;
  }, v);
}
export function nameOfVal(v) {
  return v.LogicalName;
}
export function arityOfVal(v) {
  const matchValue = v.ValReprInfo;

  if (matchValue != null) {
    return getValue(matchValue);
  } else {
    return ValReprInfoModule.emptyValData;
  }
}
export const tupInfoRef = new TupInfo(0, false);
export const tupInfoStruct = new TupInfo(0, true);
export const structnessDefault = false;
export function mkRawRefTupleTy(tys) {
  return new TType(2, [tupInfoRef, tys]);
}
export function mkRawStructTupleTy(tys) {
  return new TType(2, [tupInfoStruct, tys]);
}
export function mapTImplFile(f, _arg1) {
  return new TypedImplFile(0, [_arg1.data[0], _arg1.data[1], f(_arg1.data[2]), _arg1.data[3], _arg1.data[4]]);
}
export function mapAccImplFile(f, z, _arg1) {
  const patternInput = f(z, _arg1.data[2]);
  return [new TypedImplFile(0, [_arg1.data[0], _arg1.data[1], patternInput[0], _arg1.data[3], _arg1.data[4]]), patternInput[1]];
}
export function foldTImplFile(f, z, _arg1) {
  return f(z, _arg1.data[2]);
}
export function typarEq(lv1, lv2) {
  return lv1.Stamp.Equals(lv2.Stamp);
}
export function typarRefEq(tp1, tp2) {
  return tp1 === tp2;
}
export function valEq(lv1, lv2) {
  return lv1 === lv2;
}
export function ccuEq(mv1, mv2) {
  if (mv1 === mv2) {
    return true;
  } else if (mv1.IsUnresolvedReference ? true : mv2.IsUnresolvedReference) {
    return mv1.AssemblyName === mv2.AssemblyName;
  } else {
    return mv1.Contents === mv2.Contents;
  }
}

function _ValDeref_(vr) {
  return vr.Deref;
}

export { _ValDeref_ as $7C$ValDeref$7C$ };
export function mkRecdFieldRef(tcref, f) {
  return new RecdFieldRef(0, [tcref, f]);
}
export function mkUnionCaseRef(tcref, c) {
  return new UnionCaseRef(0, [tcref, c]);
}
export function ERefLocal(x) {
  return new EntityRef(x, null);
}
export function ERefNonLocal(x) {
  return new EntityRef(null, x);
}
export function ERefNonLocalPreResolved(x, xref) {
  return new EntityRef(x, xref);
}

function _ERefLocal_ERefNonLocal_(x) {
  const matchValue = x.nlr;

  if (matchValue == null) {
    return new Choice(0, x.binding);
  } else {
    return new Choice(1, x.nlr);
  }
}

export { _ERefLocal_ERefNonLocal_ as $7C$ERefLocal$7C$ERefNonLocal$7C$ };
export function mkLocalTyconRef(x) {
  return ERefLocal(x);
}
export function mkNonLocalEntityRef(ccu, mp) {
  return new NonLocalEntityRef(0, [ccu, mp]);
}
export function mkNestedNonLocalEntityRef(nleref, id) {
  return mkNonLocalEntityRef(nleref.Ccu, nleref.Path.concat([id]));
}
export function mkNonLocalTyconRef(nleref, id) {
  return ERefNonLocal(mkNestedNonLocalEntityRef(nleref, id));
}
export function mkNonLocalTyconRefPreResolved(x, nleref, id) {
  return ERefNonLocalPreResolved(x, mkNestedNonLocalEntityRef(nleref, id));
}
export function mkModuleUnionCaseRef(modref, tycon, uc) {
  return modref.NestedTyconRef(tycon).MakeNestedUnionCaseRef(uc);
}
export function VRefLocal(x) {
  return new ValRef(x, null);
}
export function VRefNonLocal(x) {
  return new ValRef(null, x);
}
export function VRefNonLocalPreResolved(x, xref) {
  return new ValRef(x, xref);
}

function _VRefLocal_VRefNonLocal_(x) {
  const matchValue = x.nlr;

  if (matchValue == null) {
    return new Choice(0, x.binding);
  } else {
    return new Choice(1, x.nlr);
  }
}

export { _VRefLocal_VRefNonLocal_ as $7C$VRefLocal$7C$VRefNonLocal$7C$ };
export function mkNonLocalValRef(mp, id) {
  return VRefNonLocal(new NonLocalValOrMemberRef(ERefNonLocal(mp), id));
}
export function mkNonLocalValRefPreResolved(x, mp, id) {
  return VRefNonLocalPreResolved(x, new NonLocalValOrMemberRef(ERefNonLocal(mp), id));
}
export function ccuOfValRef(vref) {
  const activePatternResult21269 = _VRefLocal_VRefNonLocal_(vref);

  if (activePatternResult21269.tag === 1) {
    return activePatternResult21269.data.Ccu;
  } else {
    return null;
  }
}
export function ccuOfTyconRef(eref) {
  const activePatternResult21271 = _ERefLocal_ERefNonLocal_(eref);

  if (activePatternResult21271.tag === 1) {
    return activePatternResult21271.data.Ccu;
  } else {
    return null;
  }
}
export function mkTyparTy(tp) {
  const matchValue = tp.Kind;

  if (matchValue.tag === 1) {
    return new TType(6, new Measure(0, tp));
  } else {
    return tp.AsType;
  }
}
export function copyTypar(tp) {
  var typar_stamp;
  var typar_astype;
  return Typar.New((typar_stamp = newStamp(), typar_astype = null, new Typar(tp.typar_id, tp.typar_il_name, tp.typar_flags, typar_stamp, tp.typar_xmldoc, tp.typar_attribs, tp.typar_solution, tp.typar_constraints, typar_astype)));
}
export function copyTypars(tps) {
  return map(function (tp) {
    return copyTypar(tp);
  }, tps);
}
export function tryShortcutSolvedUnitPar(canShortcut, r) {
  if (r.Kind.Equals(new TyparKind(0))) {
    throw new Error("tryShortcutSolvedUnitPar: kind=type");
  }

  const matchValue = r.Solution;
  const $var47 = matchValue != null ? getValue(matchValue).tag === 6 ? [0, getValue(matchValue).data] : [1] : [1];

  switch ($var47[0]) {
    case 0:
      if (canShortcut) {
        if ($var47[1].tag === 0) {
          const matchValue_1 = $var47[1].data.Solution;

          if (matchValue_1 != null) {
            r.typar_solution = matchValue_1;
          }
        }
      }

      return $var47[1];

    case 1:
      throw new Error("tryShortcutSolvedUnitPar: unsolved");
  }
}
export function stripUnitEqnsAux(canShortcut, unt) {
  stripUnitEqnsAux: while (true) {
    const $var48 = unt.tag === 0 ? unt.data.IsSolved ? [0, unt.data] : [1] : [1];

    switch ($var48[0]) {
      case 0:
        const $var88 = canShortcut;
        unt = tryShortcutSolvedUnitPar(canShortcut, $var48[1]);
        canShortcut = $var88;
        continue stripUnitEqnsAux;

      case 1:
        return unt;
    }
  }
}
export function stripTyparEqnsAux(canShortcut, ty) {
  stripTyparEqnsAux: while (true) {
    if (ty.tag === 5) {
      const matchValue = ty.data.Solution;

      if (matchValue == null) {
        return ty;
      } else {
        if (canShortcut) {
          const $var49 = getValue(matchValue).tag === 5 ? getValue(matchValue).data.Constraints.tail == null ? [0, getValue(matchValue).data] : [1] : [1];

          switch ($var49[0]) {
            case 0:
              const matchValue_1 = $var49[1].Solution;

              if (matchValue_1 != null) {
                ty.data.typar_solution = matchValue_1;
              }

              break;

            case 1:
              break;
          }
        }

        canShortcut = canShortcut;
        ty = getValue(matchValue);
        continue stripTyparEqnsAux;
      }
    } else if (ty.tag === 6) {
      return new TType(6, stripUnitEqnsAux(canShortcut, ty.data));
    } else {
      return ty;
    }
  }
}
export function stripTyparEqns(ty) {
  return stripTyparEqnsAux(false, ty);
}
export function stripUnitEqns(unt) {
  return stripUnitEqnsAux(false, unt);
}
export function mkLocalValRef(v) {
  return VRefLocal(v);
}
export function mkLocalModRef(v) {
  return ERefLocal(v);
}
export function mkLocalEntityRef(v) {
  return ERefLocal(v);
}
export function mkNonLocalCcuRootEntityRef(ccu, x) {
  return mkNonLocalTyconRefPreResolved(x, mkNonLocalEntityRef(ccu, []), x.LogicalName);
}
export function mkNestedValRef(cref, v) {
  const activePatternResult21289 = _ERefLocal_ERefNonLocal_(cref);

  if (activePatternResult21289.tag === 1) {
    return mkNonLocalValRefPreResolved(v, activePatternResult21289.data, v.LinkageFullKey);
  } else {
    return mkLocalValRef(v);
  }
}
export function rescopePubPathToParent(viewedCcu, _arg1) {
  return new NonLocalEntityRef(0, [viewedCcu, _arg1.data.slice(0, _arg1.data.length - 2 + 1)]);
}
export function rescopePubPath(viewedCcu, _arg1) {
  return new NonLocalEntityRef(0, [viewedCcu, _arg1.data]);
}
export function valRefInThisAssembly(compilingFslib, x) {
  const activePatternResult21296 = _VRefLocal_VRefNonLocal_(x);

  if (activePatternResult21296.tag === 1) {
    return compilingFslib;
  } else {
    return true;
  }
}
export function tyconRefUsesLocalXmlDoc(compilingFslib, x) {
  const activePatternResult21299 = _ERefLocal_ERefNonLocal_(x);

  if (activePatternResult21299.tag === 1) {
    return compilingFslib;
  } else {
    return true;
  }
}
export function entityRefInThisAssembly(compilingFslib, x) {
  const activePatternResult21302 = _ERefLocal_ERefNonLocal_(x);

  if (activePatternResult21302.tag === 1) {
    return compilingFslib;
  } else {
    return true;
  }
}
export function arrayPathEq(y1, y2) {
  const len1 = y1.length | 0;
  const len2 = y2.length | 0;

  if (len1 === len2) {
    const loop = function (i) {
      loop: while (true) {
        if (i >= len1) {
          return true;
        } else if (y1[i] === y2[i]) {
          i = i + 1;
          continue loop;
        } else {
          return false;
        }
      }
    };

    return loop(0);
  } else {
    return false;
  }
}
export function nonLocalRefEq(_arg2, _arg1) {
  if (_arg2 === _arg1) {
    return true;
  } else if (ccuEq(_arg2.data[0], _arg1.data[0])) {
    return arrayPathEq(_arg2.data[1], _arg1.data[1]);
  } else {
    return false;
  }
}
export function nonLocalRefDefinitelyNotEq(_arg2, _arg1) {
  return !arrayPathEq(_arg2.data[1], _arg1.data[1]);
}
export function pubPathEq(_arg2, _arg1) {
  return arrayPathEq(_arg2.data, _arg1.data);
}
export function fslibRefEq(nlr1, _arg1) {
  return arrayPathEq(nlr1.Path, _arg1.data);
}
export function fslibEntityRefEq(fslibCcu, eref1, eref2) {
  const matchValue = [eref1, eref2];
  let $var50;

  const activePatternResult21316 = _ERefLocal_ERefNonLocal_(matchValue[0]);

  if (activePatternResult21316.tag === 0) {
    const activePatternResult21318 = _ERefLocal_ERefNonLocal_(matchValue[1]);

    if (activePatternResult21318.tag === 0) {
      $var50 = [1, activePatternResult21316.data, activePatternResult21318.data];
    } else {
      $var50 = [0, activePatternResult21318.data, activePatternResult21316.data];
    }
  } else {
    const activePatternResult21317 = _ERefLocal_ERefNonLocal_(matchValue[1]);

    if (activePatternResult21317.tag === 0) {
      $var50 = [0, activePatternResult21316.data, activePatternResult21317.data];
    } else {
      $var50 = [2];
    }
  }

  switch ($var50[0]) {
    case 0:
      if (ccuEq($var50[1].Ccu, fslibCcu)) {
        const matchValue_1 = $var50[2].PublicPath;

        if (matchValue_1 == null) {
          return false;
        } else {
          return fslibRefEq($var50[1], getValue(matchValue_1));
        }
      } else {
        return false;
      }

    case 1:
      const matchValue_2 = [$var50[1].PublicPath, $var50[2].PublicPath];
      const $var51 = matchValue_2[0] != null ? matchValue_2[1] != null ? [0, getValue(matchValue_2[0]), getValue(matchValue_2[1])] : [1] : [1];

      switch ($var51[0]) {
        case 0:
          return pubPathEq($var51[1], $var51[2]);

        case 1:
          return false;
      }

    case 2:
      return false;
  }
}
export function fslibValRefEq(fslibCcu, vref1, vref2) {
  const matchValue = [vref1, vref2];
  let $var52;

  const activePatternResult21322 = _VRefLocal_VRefNonLocal_(matchValue[0]);

  if (activePatternResult21322.tag === 0) {
    const activePatternResult21324 = _VRefLocal_VRefNonLocal_(matchValue[1]);

    if (activePatternResult21324.tag === 0) {
      $var52 = [1, activePatternResult21322.data, activePatternResult21324.data];
    } else {
      $var52 = [0, activePatternResult21324.data, activePatternResult21322.data];
    }
  } else {
    const activePatternResult21323 = _VRefLocal_VRefNonLocal_(matchValue[1]);

    if (activePatternResult21323.tag === 0) {
      $var52 = [0, activePatternResult21322.data, activePatternResult21323.data];
    } else {
      $var52 = [2];
    }
  }

  switch ($var52[0]) {
    case 0:
      if (ccuEq($var52[1].Ccu, fslibCcu)) {
        const matchValue_1 = $var52[2].PublicPath;

        if (matchValue_1 == null) {
          return false;
        } else {
          const pp2 = getValue(matchValue_1).data[0];
          const nm2 = getValue(matchValue_1).data[1];

          if ($var52[1].ItemKey.PartialKey.Equals(nm2.PartialKey)) {
            return fslibRefEq($var52[1].EnclosingEntity.nlr, pp2);
          } else {
            return false;
          }
        }
      } else {
        return false;
      }

    case 1:
      const matchValue_2 = [$var52[1].PublicPath, $var52[2].PublicPath];
      const $var53 = matchValue_2[0] != null ? matchValue_2[1] != null ? [0, getValue(matchValue_2[0]).data[1], getValue(matchValue_2[1]).data[1], getValue(matchValue_2[0]).data[0], getValue(matchValue_2[1]).data[0]] : [1] : [1];

      switch ($var53[0]) {
        case 0:
          if (pubPathEq($var53[3], $var53[4])) {
            return equals($var53[1], $var53[2]);
          } else {
            return false;
          }

        case 1:
          return false;
      }

    case 2:
      return false;
  }
}
export function primEntityRefEq(compilingFslib, fslibCcu, x, y) {
  var v1;
  var v2;

  if (x === y) {
    return true;
  } else if ((x.IsResolved ? y.IsResolved : false) ? !compilingFslib : false) {
    return x.ResolvedTarget === y.ResolvedTarget;
  } else if ((!x.IsLocalRef ? !y.IsLocalRef : false) ? nonLocalRefEq(x.nlr, y.nlr) ? true : !nonLocalRefDefinitelyNotEq(x.nlr, y.nlr) ? (v1 = x.TryDeref, v2 = y.TryDeref, (v1.IsSome ? v2.IsSome : false) ? v1.Value === v2.Value : false) : false : false) {
    return true;
  } else if (compilingFslib) {
    return fslibEntityRefEq(fslibCcu, x, y);
  } else {
    return false;
  }
}
export function primUnionCaseRefEq(compilingFslib, fslibCcu, _arg2, _arg1) {
  if (_arg2 === _arg1) {
    return true;
  } else if (primEntityRefEq(compilingFslib, fslibCcu, _arg2.data[0], _arg1.data[0])) {
    return _arg2.data[1] === _arg1.data[1];
  } else {
    return false;
  }
}
export function primValRefEq(compilingFslib, fslibCcu, x, y) {
  var v1;
  var v2;

  if (x === y) {
    return true;
  } else if (((x.IsResolved ? y.IsResolved : false) ? x.ResolvedTarget === y.ResolvedTarget : false) ? true : (x.IsLocalRef ? y.IsLocalRef : false) ? valEq(x.PrivateTarget, y.PrivateTarget) : false) {
    return true;
  } else if (v1 = x.TryDeref, v2 = y.TryDeref, (v1.IsSome ? v2.IsSome : false) ? v1.Value === v2.Value : false) {
    return true;
  } else if (compilingFslib) {
    return fslibValRefEq(fslibCcu, x, y);
  } else {
    return false;
  }
}
export function fullCompPathOfModuleOrNamespace(m) {
  const patternInput = m.CompilationPath;
  return new CompilationPath(0, [patternInput.data[0], append(patternInput.data[1], ofArray([[m.LogicalName, m.ModuleOrNamespaceType.ModuleOrNamespaceKind]]))]);
}
export function canAccessFromOneOf(cpaths, cpathTest) {
  return exists(function (cpath) {
    const loop = function (p1, p2) {
      loop: while (true) {
        const matchValue = [p1, p2];

        if (matchValue[0].tail == null) {
          return true;
        } else if (matchValue[1].tail != null) {
          if (equals(matchValue[0].head[0], matchValue[1].head[0]) ? equals(matchValue[0].head[1], matchValue[1].head[1]) : false) {
            p1 = matchValue[0].tail;
            p2 = matchValue[1].tail;
            continue loop;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    };

    if (loop(cpath.data[1], cpathTest.data[1])) {
      return cpath.data[0].Equals(cpathTest.data[0]);
    } else {
      return false;
    }
  }, cpaths);
}
export function canAccessFrom(_arg1, cpath) {
  return forAll(function (cpath1) {
    const loop = function (p1, p2) {
      loop: while (true) {
        const matchValue = [p1, p2];

        if (matchValue[0].tail == null) {
          return true;
        } else if (matchValue[1].tail != null) {
          if (equals(matchValue[0].head[0], matchValue[1].head[0]) ? equals(matchValue[0].head[1], matchValue[1].head[1]) : false) {
            p1 = matchValue[0].tail;
            p2 = matchValue[1].tail;
            continue loop;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    };

    if (loop(cpath1.data[1], cpath.data[1])) {
      return cpath1.data[0].Equals(cpath.data[0]);
    } else {
      return false;
    }
  }, _arg1.data);
}
export function canAccessFromEverywhere(_arg1) {
  return _arg1.data.tail == null;
}
export function canAccessFromSomewhere(_arg1) {
  return true;
}
export function isLessAccessible(_arg2, _arg1) {
  return !forAll(function (a) {
    return exists(function (b) {
      const loop = function (p1, p2) {
        loop: while (true) {
          const matchValue = [p1, p2];

          if (matchValue[0].tail == null) {
            return true;
          } else if (matchValue[1].tail != null) {
            if (equals(matchValue[0].head[0], matchValue[1].head[0]) ? equals(matchValue[0].head[1], matchValue[1].head[1]) : false) {
              p1 = matchValue[0].tail;
              p2 = matchValue[1].tail;
              continue loop;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      };

      if (loop(a.data[1], b.data[1])) {
        return a.data[0].Equals(b.data[0]);
      } else {
        return false;
      }
    }, _arg1.data);
  }, _arg2.data);
}
export function accessSubstPaths(newPath, oldPath, _arg1) {
  const subst = function (cpath) {
    if (cpath.Equals(oldPath)) {
      return newPath;
    } else {
      return cpath;
    }
  };

  return new Accessibility(0, map(subst, _arg1.data));
}
export function compPathOfCcu(ccu) {
  return new CompilationPath(0, [ccu.ILScopeRef, new List()]);
}
export const taccessPublic = new Accessibility(0, new List());
export function taccessPrivate(accessPath) {
  return new Accessibility(0, ofArray([accessPath]));
}
export const compPathInternal = new CompilationPath(0, [new ILScopeRef(0), new List()]);
export const taccessInternal = new Accessibility(0, ofArray([compPathInternal]));
export function combineAccess(_arg2, _arg1) {
  return new Accessibility(0, append(_arg2.data, _arg1.data));
}
export function NewFreeVarsCache() {
  return newCache();
}
export function MakeUnionCasesTable(ucs) {
  return new TyconUnionCases(Array.from(ucs), NameMapModule.ofKeyedList(function (uc) {
    return uc.DisplayName;
  }, ucs));
}
export function MakeRecdFieldsTable(ucs) {
  return new TyconRecdFields(Array.from(ucs), NameMapModule.ofKeyedList(function (rfld) {
    return rfld.Name;
  }, ucs));
}
export function MakeUnionCases(ucs) {
  return new TyconUnionData(MakeUnionCasesTable(ucs), newCache());
}
export function MakeUnionRepr(ucs) {
  return new TyconRepresentation(2, MakeUnionCases(ucs));
}
export function NewTypar(kind, rigid, _arg1, isFromError, dynamicReq, attribs, eqDep, compDep) {
  var typar_il_name;
  var typar_stamp;
  var typar_flags;
  var typar_solution;
  var typar_constraints;
  return Typar.New((typar_il_name = null, typar_stamp = newStamp(), typar_flags = TyparFlags[".ctor"](kind, rigid, isFromError, _arg1.data[2], _arg1.data[1], dynamicReq, eqDep, compDep), typar_solution = null, typar_constraints = new List(), new Typar(_arg1.data[0], typar_il_name, typar_flags, typar_stamp, XmlDoc.Empty, attribs, typar_solution, typar_constraints, null)));
}
export function NewRigidTypar(nm, m) {
  return NewTypar(new TyparKind(0), new TyparRigidity(0), new SynTypar(0, [mkSynId(m, nm), new TyparStaticReq(0), true]), false, new TyparDynamicReq(1), new List(), false, false);
}
export function NewUnionCase(id, nm, tys, rty, attribs, docOption, access) {
  const FieldTable = MakeRecdFieldsTable(tys);
  return new UnionCase(FieldTable, rty, nm, docOption, "", id, null, access, attribs);
}
export function NewModuleOrNamespaceType(mkind, tycons, vals) {
  return new ModuleOrNamespaceType(mkind, QueueListModule.ofList(vals), QueueListModule.ofList(tycons));
}
export function NewEmptyModuleOrNamespaceType(mkind) {
  return NewModuleOrNamespaceType(mkind, new List(), new List());
}
export function NewExn(cpath, id, access, repr, attribs, doc) {
  var entity_stamp;
  var entity_logical_name;
  var entity_range;
  var entity_tycon_tcaug;
  var entity_pubpath;
  var entity_modul_contents;
  var entity_typars;
  var entity_tycon_repr;
  return function (arg00, arg10) {
    return Entity.New(arg00, arg10);
  }("exnc", (entity_stamp = newStamp(), entity_logical_name = id.idText, entity_range = id.idRange, entity_tycon_tcaug = TyconAugmentation.Create(), entity_pubpath = defaultArg(cpath, null, function (cp) {
    return cp.NestedPublicPath(id);
  }), entity_modul_contents = new MaybeLazy(0, NewEmptyModuleOrNamespaceType(new ModuleOrNamespaceKind(1))), entity_typars = LazyWithContext.NotLazy(new List()), entity_tycon_repr = new TyconRepresentation(6), new Entity(entity_typars, EntityFlags[".ctor"](false, false, false, false, false), entity_stamp, entity_logical_name, entity_range, attribs, entity_tycon_repr, entity_tycon_tcaug, entity_modul_contents, entity_pubpath, cpath, newCache(), (() => {
    var testExpr;
    var inputRecord;
    const matchValue = [doc, access, repr];
    const $var54 = (testExpr = matchValue[0].data, testExpr.length === 0) ? matchValue[1].data.tail == null ? matchValue[2].tag === 3 ? [0] : [1] : [1] : [1];

    switch ($var54[0]) {
      case 0:
        return null;

      case 1:
        return inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(inputRecord.entity_compiled_name, inputRecord.entity_other_range, inputRecord.entity_kind, doc, inputRecord.entity_xmldocsig, inputRecord.entity_tycon_abbrev, access, access, repr);
    }
  })())));
}
export function NewRecdField(stat, konst, id, nameGenerated, ty, isMutable, isVolatile, pattribs, fattribs, docOption, access, secret) {
  return new RecdField(isMutable, docOption, "", ty, stat, isVolatile, secret, konst, access, pattribs, fattribs, id, nameGenerated, null);
}
export function NewTycon(cpath, nm, m, access, reprAccess, kind, typars, docOption, usesPrefixDisplay, preEstablishedHasDefaultCtor, hasSelfReferentialCtor, mtyp) {
  var entity_flags;
  var entity_attribs;
  const stamp = newStamp();
  return function (arg00, arg10) {
    return Entity.New(arg00, arg10);
  }("tycon", (entity_flags = EntityFlags[".ctor"](usesPrefixDisplay, false, preEstablishedHasDefaultCtor, hasSelfReferentialCtor, false), entity_attribs = new List(), new Entity(typars, entity_flags, stamp, nm, m, entity_attribs, new TyconRepresentation(6), TyconAugmentation.Create(), mtyp, defaultArg(cpath, null, function (cp) {
    return cp.NestedPublicPath(mkSynId(m, nm));
  }), cpath, newCache(), (() => {
    var testExpr;
    var inputRecord;
    const matchValue = [kind, docOption, reprAccess, access];
    const $var55 = matchValue[0].tag === 0 ? (testExpr = matchValue[1].data, testExpr.length === 0) ? matchValue[2].data.tail == null ? matchValue[3].data.tail == null ? [0] : [1] : [1] : [1] : [1];

    switch ($var55[0]) {
      case 0:
        return null;

      case 1:
        return inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(inputRecord.entity_compiled_name, inputRecord.entity_other_range, kind, docOption, inputRecord.entity_xmldocsig, inputRecord.entity_tycon_abbrev, reprAccess, access, inputRecord.entity_exn_info);
    }
  })())));
}
export function NewILTycon(nlpath, nm, m, tps, scoref, enc, tdef, mtyp) {
  const hasSelfReferentialCtor = tdef.IsClass ? !scoref.IsAssemblyRef ? scoref.AssemblyRef.Name === "mscorlib" : false : false;
  const tycon = NewTycon(nlpath, nm, m, taccessPublic, taccessPublic, new TyparKind(0), tps, XmlDoc.Empty, true, false, hasSelfReferentialCtor, mtyp);
  tycon.entity_tycon_repr = new TyconRepresentation(3, new TILObjectReprData(0, [scoref, enc, tdef]));
  tycon.TypeContents.tcaug_closed = true;
  return tycon;
}
export class Duplicate extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, Duplicate.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.Duplicate",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: "string",
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.Duplicate", Duplicate);
export class NameClash extends Error {
  constructor(data0, data1, data2, data3, data4, data5, data6) {
    super();
    Object.setPrototypeOf(this, NameClash.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
    this.Data4 = data4;
    this.Data5 = data5;
    this.Data6 = data6;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.NameClash",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: "string",
        Data2: "string",
        Data3: range,
        Data4: "string",
        Data5: "string",
        Data6: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Tast.NameClash", NameClash);
export class FullAbstraction extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, FullAbstraction.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tast.FullAbstraction",
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
setType("Microsoft.FSharp.Compiler.Tast.FullAbstraction", FullAbstraction);
export function NewModuleOrNamespace(cpath, access, id, xml, attribs, mtype) {
  return function (arg00, arg10, arg20, arg30, arg40, arg50) {
    return Construct.NewModuleOrNamespace(arg00, arg10, arg20, arg30, arg40, arg50);
  }(cpath, access, id, xml, attribs, mtype);
}
export function NewVal(logicalName, m, compiledName, ty, isMutable, isCompGen, arity, access, recValInfo, specialRepr, baseOrThis, attribs, inlineInfo, doc, isModuleOrMemberBinding, isExtensionMember, isIncrClassSpecialMember, isTyFunc, allowTypeInst, isGeneratedEventVal, konst, actualParent) {
  var val_flags;
  const stamp = newStamp();
  return Val.New((val_flags = ValFlags[".ctor"](recValInfo, baseOrThis, isCompGen, inlineInfo, isMutable, isModuleOrMemberBinding, isExtensionMember, isIncrClassSpecialMember, isTyFunc, allowTypeInst, isGeneratedEventVal), new Val(logicalName, m, ty, stamp, val_flags, (() => {
    var testExpr;
    var inputRecord;
    var val_compiled_name;
    const matchValue = [compiledName, arity, konst, access, doc, specialRepr, actualParent, attribs];
    const $var56 = matchValue[0] == null ? matchValue[1] == null ? matchValue[2] == null ? matchValue[3].data.tail == null ? (testExpr = matchValue[4].data, testExpr.length === 0) ? matchValue[5] == null ? matchValue[6].tag === 1 ? matchValue[7].tail == null ? [0] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var56[0]) {
      case 0:
        return null;

      case 1:
        return inputRecord = Val.EmptyValOptData, val_compiled_name = (() => {
          const $var57 = compiledName != null ? getValue(compiledName) !== logicalName ? [0, getValue(compiledName)] : [1] : [1];

          switch ($var57[0]) {
            case 0:
              return compiledName;

            case 1:
              return null;
          }
        })(), new ValOptionalData(val_compiled_name, inputRecord.val_other_range, konst, inputRecord.val_defn, arity, access, doc, specialRepr, actualParent, inputRecord.val_xmldocsig, attribs);
    }
  })())));
}
export function NewCcuContents(sref, m, nm, mty) {
  return NewModuleOrNamespace(new CompilationPath(0, [sref, new List()]), taccessPublic, ident(nm, m), XmlDoc.Empty, new List(), new MaybeLazy(0, mty));
}
export function NewModifiedTycon(f, orig) {
  let data;
  const entity_stamp = newStamp();
  data = new Entity(orig.entity_typars, orig.entity_flags, entity_stamp, orig.entity_logical_name, orig.entity_range, orig.entity_attribs, orig.entity_tycon_repr, orig.entity_tycon_tcaug, orig.entity_modul_contents, orig.entity_pubpath, orig.entity_cpath, orig.entity_il_repr_cache, orig.entity_opt_data);
  return function (arg00, arg10) {
    return Entity.New(arg00, arg10);
  }("NewModifiedTycon", f(data));
}
export function NewModifiedModuleOrNamespace(f, orig) {
  return NewModifiedTycon(function (d) {
    const entity_modul_contents = new MaybeLazy(0, f(d.entity_modul_contents.Force()));
    return new Entity(d.entity_typars, d.entity_flags, d.entity_stamp, d.entity_logical_name, d.entity_range, d.entity_attribs, d.entity_tycon_repr, d.entity_tycon_tcaug, entity_modul_contents, d.entity_pubpath, d.entity_cpath, d.entity_il_repr_cache, d.entity_opt_data);
  }, orig);
}
export function NewModifiedVal(f, orig) {
  const stamp = newStamp();
  const data_ = f(new Val(orig.val_logical_name, orig.val_range, orig.val_type, stamp, orig.val_flags, orig.val_opt_data));
  return Val.New(data_);
}
export function NewClonedModuleOrNamespace(orig) {
  return NewModifiedModuleOrNamespace(function (mty) {
    return mty;
  }, orig);
}
export function NewClonedTycon(orig) {
  return NewModifiedTycon(function (d) {
    return d;
  }, orig);
}
export function CombineCcuContentFragments(m, l) {
  const CombineModuleOrNamespaceTypes = function (path, m_1, mty1, mty2) {
    const matchValue = [mty1.ModuleOrNamespaceKind, mty2.ModuleOrNamespaceKind];
    const $var58 = matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [0] : [1] : matchValue[1].tag === 2 ? [1] : [2];

    switch ($var58[0]) {
      case 0:
        const kind = mty1.ModuleOrNamespaceKind;
        const tab1 = mty1.AllEntitiesByLogicalMangledName;
        const tab2 = mty2.AllEntitiesByLogicalMangledName;
        const entities = toList(delay(function () {
          return append_1(collect(function (e1) {
            const matchValue_1 = tryFind(e1.LogicalName, tab2);

            if (matchValue_1 == null) {
              return singleton(e1);
            } else {
              return singleton(CombineEntites(path, e1, getValue(matchValue_1)));
            }
          }, mty1.AllEntities), delay(function () {
            return collect(function (e2) {
              const matchValue_2 = tryFind(e2.LogicalName, tab1);

              if (matchValue_2 == null) {
                return singleton(e2);
              } else {
                return empty();
              }
            }, mty2.AllEntities);
          }));
        }));
        const vals = QueueListModule.append(mty1.AllValsAndMembers, mty2.AllValsAndMembers);
        return new ModuleOrNamespaceType(kind, vals, QueueListModule.ofList(entities));

      case 1:
        return error(new _Error(SR.tastNamespaceAndModuleWithSameNameInAssembly(textOfPath(path)), m_1));

      case 2:
        return error(new _Error(SR.tastTwoModulesWithSameNameInAssembly(textOfPath(path)), m_1));
    }
  };

  const CombineEntites = function (path_1, entity1, entity2) {
    const matchValue_3 = [entity1.IsModuleOrNamespace, entity2.IsModuleOrNamespace];
    const $var59 = matchValue_3[0] ? matchValue_3[1] ? [0] : [2] : matchValue_3[1] ? [2] : [1];

    switch ($var59[0]) {
      case 0:
        return NewModifiedTycon(function (data1) {
          var inputRecord;

          const xml = function (arg00, arg10) {
            return XmlDoc.Merge(arg00, arg10);
          }(entity1.XmlDoc, entity2.XmlDoc);

          const entity_attribs = append(entity1.Attribs, entity2.Attribs);
          const entity_modul_contents = new MaybeLazy(1, new Lazy(function () {
            return CombineModuleOrNamespaceTypes(append(path_1, ofArray([entity2.DemangledModuleOrNamespaceName])), entity2.Range, entity1.ModuleOrNamespaceType, entity2.ModuleOrNamespaceType);
          }));
          let entity_opt_data;
          const matchValue_4 = data1.entity_opt_data;

          if (matchValue_4 != null) {
            entity_opt_data = new EntityOptionalData(getValue(matchValue_4).entity_compiled_name, getValue(matchValue_4).entity_other_range, getValue(matchValue_4).entity_kind, xml, getValue(matchValue_4).entity_xmldocsig, getValue(matchValue_4).entity_tycon_abbrev, getValue(matchValue_4).entity_tycon_repr_accessibility, getValue(matchValue_4).entity_accessiblity, getValue(matchValue_4).entity_exn_info);
          } else {
            entity_opt_data = (inputRecord = Entity.EmptyEntityOptData, new EntityOptionalData(inputRecord.entity_compiled_name, inputRecord.entity_other_range, inputRecord.entity_kind, xml, inputRecord.entity_xmldocsig, inputRecord.entity_tycon_abbrev, inputRecord.entity_tycon_repr_accessibility, inputRecord.entity_accessiblity, inputRecord.entity_exn_info));
          }

          return new Entity(data1.entity_typars, data1.entity_flags, data1.entity_stamp, data1.entity_logical_name, data1.entity_range, entity_attribs, data1.entity_tycon_repr, data1.entity_tycon_tcaug, entity_modul_contents, data1.entity_pubpath, data1.entity_cpath, data1.entity_il_repr_cache, entity_opt_data);
        }, entity1);

      case 1:
        return error(new _Error(SR.tastDuplicateTypeDefinitionInAssembly(entity2.LogicalName, textOfPath(path_1)), entity2.Range));

      case 2:
        return error(new _Error(SR.tastConflictingModuleAndTypeDefinitionInAssembly(entity2.LogicalName, textOfPath(path_1)), entity2.Range));
    }
  };

  const CombineModuleOrNamespaceTypeList = function (path_2, m_2, l_1) {
    if (l_1.tail != null) {
      return fold(CurriedLambda(CombineModuleOrNamespaceTypes)(path_2, m_2), l_1.head, l_1.tail);
    } else {
      throw new Error("CombineModuleOrNamespaceTypeList");
    }
  };

  return CombineModuleOrNamespaceTypeList(new List(), m, l);
}
export const FSharpOptimizationDataResourceName = "FSharpOptimizationData.";
export const FSharpSignatureDataResourceName = "FSharpSignatureData.";
export const FSharpOptimizationDataResourceName2 = "FSharpOptimizationInfo.";
export const FSharpSignatureDataResourceName2 = "FSharpSignatureInfo.";