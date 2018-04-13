import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equals, hash, compareRecords, equalsRecords } from "../fable-core/Util";
import { map, ofArray } from "../fable-core/List";
import { ILSecurityAction, ILNativeVariant, ILNativeType, ILComparisonInstr, ILBasicType, ILInstr, mkLdarg, mkLdloc, mkStloc, mkLdcInt32 } from "./il";
import Lazy from "../fable-core/Lazy";
import { create } from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import { Lazy as Lazy_1 } from "./illib";
export class TableName {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.TableName",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        idx: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(idx) {
    this.idx = idx | 0;
  }

  get Index() {
    return this.idx;
  }

  static FromIndex(n) {
    return new TableName(n);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.TableName", TableName);
export const TableNames = function (__exports) {
  const Module = __exports.Module = new TableName(0);
  const TypeRef = __exports.TypeRef = new TableName(1);
  const TypeDef = __exports.TypeDef = new TableName(2);
  const FieldPtr = __exports.FieldPtr = new TableName(3);
  const Field = __exports.Field = new TableName(4);
  const MethodPtr = __exports.MethodPtr = new TableName(5);
  const Method = __exports.Method = new TableName(6);
  const ParamPtr = __exports.ParamPtr = new TableName(7);
  const Param = __exports.Param = new TableName(8);
  const InterfaceImpl = __exports.InterfaceImpl = new TableName(9);
  const MemberRef = __exports.MemberRef = new TableName(10);
  const Constant = __exports.Constant = new TableName(11);
  const CustomAttribute = __exports.CustomAttribute = new TableName(12);
  const FieldMarshal = __exports.FieldMarshal = new TableName(13);
  const Permission = __exports.Permission = new TableName(14);
  const ClassLayout = __exports.ClassLayout = new TableName(15);
  const FieldLayout = __exports.FieldLayout = new TableName(16);
  const StandAloneSig = __exports.StandAloneSig = new TableName(17);
  const EventMap = __exports.EventMap = new TableName(18);
  const EventPtr = __exports.EventPtr = new TableName(19);

  const _Event = __exports.Event = new TableName(20);

  const PropertyMap = __exports.PropertyMap = new TableName(21);
  const PropertyPtr = __exports.PropertyPtr = new TableName(22);
  const Property = __exports.Property = new TableName(23);
  const MethodSemantics = __exports.MethodSemantics = new TableName(24);
  const MethodImpl = __exports.MethodImpl = new TableName(25);
  const ModuleRef = __exports.ModuleRef = new TableName(26);
  const TypeSpec = __exports.TypeSpec = new TableName(27);
  const ImplMap = __exports.ImplMap = new TableName(28);
  const FieldRVA = __exports.FieldRVA = new TableName(29);
  const ENCLog = __exports.ENCLog = new TableName(30);
  const ENCMap = __exports.ENCMap = new TableName(31);
  const Assembly = __exports.Assembly = new TableName(32);
  const AssemblyProcessor = __exports.AssemblyProcessor = new TableName(33);
  const AssemblyOS = __exports.AssemblyOS = new TableName(34);
  const AssemblyRef = __exports.AssemblyRef = new TableName(35);
  const AssemblyRefProcessor = __exports.AssemblyRefProcessor = new TableName(36);
  const AssemblyRefOS = __exports.AssemblyRefOS = new TableName(37);
  const File = __exports.File = new TableName(38);
  const ExportedType = __exports.ExportedType = new TableName(39);
  const ManifestResource = __exports.ManifestResource = new TableName(40);
  const Nested = __exports.Nested = new TableName(41);
  const GenericParam = __exports.GenericParam = new TableName(42);
  const MethodSpec = __exports.MethodSpec = new TableName(43);
  const GenericParamConstraint = __exports.GenericParamConstraint = new TableName(44);
  const UserStrings = __exports.UserStrings = new TableName(112);
  return __exports;
}({});
export const sortedTableInfo = ofArray([[TableNames.InterfaceImpl, 0], [TableNames.Constant, 1], [TableNames.CustomAttribute, 0], [TableNames.FieldMarshal, 0], [TableNames.Permission, 1], [TableNames.ClassLayout, 2], [TableNames.FieldLayout, 1], [TableNames.MethodSemantics, 2], [TableNames.MethodImpl, 0], [TableNames.ImplMap, 1], [TableNames.FieldRVA, 1], [TableNames.Nested, 0], [TableNames.GenericParam, 2], [TableNames.GenericParamConstraint, 0]]);
export class TypeDefOrRefTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.TypeDefOrRefTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.TypeDefOrRefTag", TypeDefOrRefTag);
export const tdor_TypeDef = new TypeDefOrRefTag(0);
export const tdor_TypeRef = new TypeDefOrRefTag(1);
export const tdor_TypeSpec = new TypeDefOrRefTag(2);
export function mkTypeDefOrRefOrSpecTag(x) {
  if (x === 0) {
    return tdor_TypeDef;
  } else if (x === 1) {
    return tdor_TypeRef;
  } else if (x === 2) {
    return tdor_TypeSpec;
  } else {
    throw new Error("mkTypeDefOrRefOrSpecTag" + "\nParameter name: " + "x");
  }
}
export class HasConstantTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasConstantTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasConstantTag", HasConstantTag);
export const hc_FieldDef = new HasConstantTag(0);
export const hc_ParamDef = new HasConstantTag(1);
export const hc_Property = new HasConstantTag(2);
export function mkHasConstantTag(x) {
  if (x === 0) {
    return hc_FieldDef;
  } else if (x === 1) {
    return hc_ParamDef;
  } else if (x === 2) {
    return hc_Property;
  } else {
    throw new Error("mkHasConstantTag" + "\nParameter name: " + "x");
  }
}
export class HasCustomAttributeTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasCustomAttributeTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasCustomAttributeTag", HasCustomAttributeTag);
export const hca_MethodDef = new HasCustomAttributeTag(0);
export const hca_FieldDef = new HasCustomAttributeTag(1);
export const hca_TypeRef = new HasCustomAttributeTag(2);
export const hca_TypeDef = new HasCustomAttributeTag(3);
export const hca_ParamDef = new HasCustomAttributeTag(4);
export const hca_InterfaceImpl = new HasCustomAttributeTag(5);
export const hca_MemberRef = new HasCustomAttributeTag(6);
export const hca_Module = new HasCustomAttributeTag(7);
export const hca_Permission = new HasCustomAttributeTag(8);
export const hca_Property = new HasCustomAttributeTag(9);
export const hca_Event = new HasCustomAttributeTag(10);
export const hca_StandAloneSig = new HasCustomAttributeTag(11);
export const hca_ModuleRef = new HasCustomAttributeTag(12);
export const hca_TypeSpec = new HasCustomAttributeTag(13);
export const hca_Assembly = new HasCustomAttributeTag(14);
export const hca_AssemblyRef = new HasCustomAttributeTag(15);
export const hca_File = new HasCustomAttributeTag(16);
export const hca_ExportedType = new HasCustomAttributeTag(17);
export const hca_ManifestResource = new HasCustomAttributeTag(18);
export const hca_GenericParam = new HasCustomAttributeTag(19);
export const hca_GenericParamConstraint = new HasCustomAttributeTag(20);
export const hca_MethodSpec = new HasCustomAttributeTag(21);
export function mkHasCustomAttributeTag(x) {
  switch (x) {
    case 0:
      return hca_MethodDef;

    case 1:
      return hca_FieldDef;

    case 2:
      return hca_TypeRef;

    case 3:
      return hca_TypeDef;

    case 4:
      return hca_ParamDef;

    case 5:
      return hca_InterfaceImpl;

    case 6:
      return hca_MemberRef;

    case 7:
      return hca_Module;

    case 8:
      return hca_Permission;

    case 9:
      return hca_Property;

    case 10:
      return hca_Event;

    case 11:
      return hca_StandAloneSig;

    case 12:
      return hca_ModuleRef;

    case 13:
      return hca_TypeSpec;

    case 14:
      return hca_Assembly;

    case 15:
      return hca_AssemblyRef;

    case 16:
      return hca_File;

    case 17:
      return hca_ExportedType;

    case 18:
      return hca_ManifestResource;

    case 19:
      return hca_GenericParam;

    case 20:
      return hca_GenericParamConstraint;

    case 21:
      return hca_MethodSpec;

    default:
      return new HasCustomAttributeTag(x);
  }
}
export class HasFieldMarshalTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasFieldMarshalTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasFieldMarshalTag", HasFieldMarshalTag);
export const hfm_FieldDef = new HasFieldMarshalTag(0);
export const hfm_ParamDef = new HasFieldMarshalTag(1);
export function mkHasFieldMarshalTag(x) {
  if (x === 0) {
    return hfm_FieldDef;
  } else if (x === 1) {
    return hfm_ParamDef;
  } else {
    return new HasFieldMarshalTag(x);
  }
}
export class HasDeclSecurityTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasDeclSecurityTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasDeclSecurityTag", HasDeclSecurityTag);
export const hds_TypeDef = new HasDeclSecurityTag(0);
export const hds_MethodDef = new HasDeclSecurityTag(1);
export const hds_Assembly = new HasDeclSecurityTag(2);
export function mkHasDeclSecurityTag(x) {
  if (x === 0) {
    return hds_TypeDef;
  } else if (x === 1) {
    return hds_MethodDef;
  } else if (x === 2) {
    return hds_Assembly;
  } else {
    return new HasDeclSecurityTag(x);
  }
}
export class MemberRefParentTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.MemberRefParentTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.MemberRefParentTag", MemberRefParentTag);
export const mrp_TypeRef = new MemberRefParentTag(1);
export const mrp_ModuleRef = new MemberRefParentTag(2);
export const mrp_MethodDef = new MemberRefParentTag(3);
export const mrp_TypeSpec = new MemberRefParentTag(4);
export function mkMemberRefParentTag(x) {
  switch (x) {
    case 1:
      return mrp_TypeRef;

    case 2:
      return mrp_ModuleRef;

    case 3:
      return mrp_MethodDef;

    case 4:
      return mrp_TypeSpec;

    default:
      return new MemberRefParentTag(x);
  }
}
export class HasSemanticsTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasSemanticsTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.HasSemanticsTag", HasSemanticsTag);
export const hs_Event = new HasSemanticsTag(0);
export const hs_Property = new HasSemanticsTag(1);
export function mkHasSemanticsTag(x) {
  if (x === 0) {
    return hs_Event;
  } else if (x === 1) {
    return hs_Property;
  } else {
    return new HasSemanticsTag(x);
  }
}
export class MethodDefOrRefTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.MethodDefOrRefTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.MethodDefOrRefTag", MethodDefOrRefTag);
export const mdor_MethodDef = new MethodDefOrRefTag(0);
export const mdor_MemberRef = new MethodDefOrRefTag(1);
export const mdor_MethodSpec = new MethodDefOrRefTag(2);
export function mkMethodDefOrRefTag(x) {
  if (x === 0) {
    return mdor_MethodDef;
  } else if (x === 1) {
    return mdor_MemberRef;
  } else if (x === 2) {
    return mdor_MethodSpec;
  } else {
    return new MethodDefOrRefTag(x);
  }
}
export class MemberForwardedTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.MemberForwardedTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.MemberForwardedTag", MemberForwardedTag);
export const mf_FieldDef = new MemberForwardedTag(0);
export const mf_MethodDef = new MemberForwardedTag(1);
export function mkMemberForwardedTag(x) {
  if (x === 0) {
    return mf_FieldDef;
  } else if (x === 1) {
    return mf_MethodDef;
  } else {
    return new MemberForwardedTag(x);
  }
}
export class ImplementationTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.ImplementationTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.ImplementationTag", ImplementationTag);
export const i_File = new ImplementationTag(0);
export const i_AssemblyRef = new ImplementationTag(1);
export const i_ExportedType = new ImplementationTag(2);
export function mkImplementationTag(x) {
  if (x === 0) {
    return i_File;
  } else if (x === 1) {
    return i_AssemblyRef;
  } else if (x === 2) {
    return i_ExportedType;
  } else {
    return new ImplementationTag(x);
  }
}
export class CustomAttributeTypeTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.CustomAttributeTypeTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.CustomAttributeTypeTag", CustomAttributeTypeTag);
export const cat_MethodDef = new CustomAttributeTypeTag(2);
export const cat_MemberRef = new CustomAttributeTypeTag(3);
export function mkILCustomAttributeTypeTag(x) {
  if (x === 2) {
    return cat_MethodDef;
  } else if (x === 3) {
    return cat_MemberRef;
  } else {
    return new CustomAttributeTypeTag(x);
  }
}
export class ResolutionScopeTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.ResolutionScopeTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.ResolutionScopeTag", ResolutionScopeTag);
export const rs_Module = new ResolutionScopeTag(0);
export const rs_ModuleRef = new ResolutionScopeTag(1);
export const rs_AssemblyRef = new ResolutionScopeTag(2);
export const rs_TypeRef = new ResolutionScopeTag(3);
export function mkResolutionScopeTag(x) {
  switch (x) {
    case 0:
      return rs_Module;

    case 1:
      return rs_ModuleRef;

    case 2:
      return rs_AssemblyRef;

    case 3:
      return rs_TypeRef;

    default:
      return new ResolutionScopeTag(x);
  }
}
export class TypeOrMethodDefTag {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.TypeOrMethodDefTag",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(tag) {
    this.tag = tag | 0;
  }

  get Tag() {
    return this.tag;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.BinaryConstants.TypeOrMethodDefTag", TypeOrMethodDefTag);
export const tomd_TypeDef = new TypeOrMethodDefTag(0);
export const tomd_MethodDef = new TypeOrMethodDefTag(1);
export function mkTypeOrMethodDefTag(x) {
  if (x === 0) {
    return tomd_TypeDef;
  } else if (x === 1) {
    return tomd_MethodDef;
  } else {
    return new TypeOrMethodDefTag(x);
  }
}
export const et_END = 0;
export const et_VOID = 1;
export const et_BOOLEAN = 2;
export const et_CHAR = 3;
export const et_I1 = 4;
export const et_U1 = 5;
export const et_I2 = 6;
export const et_U2 = 7;
export const et_I4 = 8;
export const et_U4 = 9;
export const et_I8 = 10;
export const et_U8 = 11;
export const et_R4 = 12;
export const et_R8 = 13;
export const et_STRING = 14;
export const et_PTR = 15;
export const et_BYREF = 16;
export const et_VALUETYPE = 17;
export const et_CLASS = 18;
export const et_VAR = 19;
export const et_ARRAY = 20;
export const et_WITH = 21;
export const et_TYPEDBYREF = 22;
export const et_I = 24;
export const et_U = 25;
export const et_FNPTR = 27;
export const et_OBJECT = 28;
export const et_SZARRAY = 29;
export const et_MVAR = 30;
export const et_CMOD_REQD = 31;
export const et_CMOD_OPT = 32;
export const et_SENTINEL = 65;
export const et_PINNED = 69;
export const i_nop = 0;
export const i_break = 1;
export const i_ldarg_0 = 2;
export const i_ldarg_1 = 3;
export const i_ldarg_2 = 4;
export const i_ldarg_3 = 5;
export const i_ldloc_0 = 6;
export const i_ldloc_1 = 7;
export const i_ldloc_2 = 8;
export const i_ldloc_3 = 9;
export const i_stloc_0 = 10;
export const i_stloc_1 = 11;
export const i_stloc_2 = 12;
export const i_stloc_3 = 13;
export const i_ldarg_s = 14;
export const i_ldarga_s = 15;
export const i_starg_s = 16;
export const i_ldloc_s = 17;
export const i_ldloca_s = 18;
export const i_stloc_s = 19;
export const i_ldnull = 20;
export const i_ldc_i4_m1 = 21;
export const i_ldc_i4_0 = 22;
export const i_ldc_i4_1 = 23;
export const i_ldc_i4_2 = 24;
export const i_ldc_i4_3 = 25;
export const i_ldc_i4_4 = 26;
export const i_ldc_i4_5 = 27;
export const i_ldc_i4_6 = 28;
export const i_ldc_i4_7 = 29;
export const i_ldc_i4_8 = 30;
export const i_ldc_i4_s = 31;
export const i_ldc_i4 = 32;
export const i_ldc_i8 = 33;
export const i_ldc_r4 = 34;
export const i_ldc_r8 = 35;
export const i_dup = 37;
export const i_pop = 38;
export const i_jmp = 39;
export const i_call = 40;
export const i_calli = 41;
export const i_ret = 42;
export const i_br_s = 43;
export const i_brfalse_s = 44;
export const i_brtrue_s = 45;
export const i_beq_s = 46;
export const i_bge_s = 47;
export const i_bgt_s = 48;
export const i_ble_s = 49;
export const i_blt_s = 50;
export const i_bne_un_s = 51;
export const i_bge_un_s = 52;
export const i_bgt_un_s = 53;
export const i_ble_un_s = 54;
export const i_blt_un_s = 55;
export const i_br = 56;
export const i_brfalse = 57;
export const i_brtrue = 58;
export const i_beq = 59;
export const i_bge = 60;
export const i_bgt = 61;
export const i_ble = 62;
export const i_blt = 63;
export const i_bne_un = 64;
export const i_bge_un = 65;
export const i_bgt_un = 66;
export const i_ble_un = 67;
export const i_blt_un = 68;
export const i_switch = 69;
export const i_ldind_i1 = 70;
export const i_ldind_u1 = 71;
export const i_ldind_i2 = 72;
export const i_ldind_u2 = 73;
export const i_ldind_i4 = 74;
export const i_ldind_u4 = 75;
export const i_ldind_i8 = 76;
export const i_ldind_i = 77;
export const i_ldind_r4 = 78;
export const i_ldind_r8 = 79;
export const i_ldind_ref = 80;
export const i_stind_ref = 81;
export const i_stind_i1 = 82;
export const i_stind_i2 = 83;
export const i_stind_i4 = 84;
export const i_stind_i8 = 85;
export const i_stind_r4 = 86;
export const i_stind_r8 = 87;
export const i_add = 88;
export const i_sub = 89;
export const i_mul = 90;
export const i_div = 91;
export const i_div_un = 92;
export const i_rem = 93;
export const i_rem_un = 94;
export const i_and = 95;
export const i_or = 96;
export const i_xor = 97;
export const i_shl = 98;
export const i_shr = 99;
export const i_shr_un = 100;
export const i_neg = 101;
export const i_not = 102;
export const i_conv_i1 = 103;
export const i_conv_i2 = 104;
export const i_conv_i4 = 105;
export const i_conv_i8 = 106;
export const i_conv_r4 = 107;
export const i_conv_r8 = 108;
export const i_conv_u4 = 109;
export const i_conv_u8 = 110;
export const i_callvirt = 111;
export const i_cpobj = 112;
export const i_ldobj = 113;
export const i_ldstr = 114;
export const i_newobj = 115;
export const i_castclass = 116;
export const i_isinst = 117;
export const i_conv_r_un = 118;
export const i_unbox = 121;
export const i_throw = 122;
export const i_ldfld = 123;
export const i_ldflda = 124;
export const i_stfld = 125;
export const i_ldsfld = 126;
export const i_ldsflda = 127;
export const i_stsfld = 128;
export const i_stobj = 129;
export const i_conv_ovf_i1_un = 130;
export const i_conv_ovf_i2_un = 131;
export const i_conv_ovf_i4_un = 132;
export const i_conv_ovf_i8_un = 133;
export const i_conv_ovf_u1_un = 134;
export const i_conv_ovf_u2_un = 135;
export const i_conv_ovf_u4_un = 136;
export const i_conv_ovf_u8_un = 137;
export const i_conv_ovf_i_un = 138;
export const i_conv_ovf_u_un = 139;
export const i_box = 140;
export const i_newarr = 141;
export const i_ldlen = 142;
export const i_ldelema = 143;
export const i_ldelem_i1 = 144;
export const i_ldelem_u1 = 145;
export const i_ldelem_i2 = 146;
export const i_ldelem_u2 = 147;
export const i_ldelem_i4 = 148;
export const i_ldelem_u4 = 149;
export const i_ldelem_i8 = 150;
export const i_ldelem_i = 151;
export const i_ldelem_r4 = 152;
export const i_ldelem_r8 = 153;
export const i_ldelem_ref = 154;
export const i_stelem_i = 155;
export const i_stelem_i1 = 156;
export const i_stelem_i2 = 157;
export const i_stelem_i4 = 158;
export const i_stelem_i8 = 159;
export const i_stelem_r4 = 160;
export const i_stelem_r8 = 161;
export const i_stelem_ref = 162;
export const i_conv_ovf_i1 = 179;
export const i_conv_ovf_u1 = 180;
export const i_conv_ovf_i2 = 181;
export const i_conv_ovf_u2 = 182;
export const i_conv_ovf_i4 = 183;
export const i_conv_ovf_u4 = 184;
export const i_conv_ovf_i8 = 185;
export const i_conv_ovf_u8 = 186;
export const i_refanyval = 194;
export const i_ckfinite = 195;
export const i_mkrefany = 198;
export const i_ldtoken = 208;
export const i_conv_u2 = 209;
export const i_conv_u1 = 210;
export const i_conv_i = 211;
export const i_conv_ovf_i = 212;
export const i_conv_ovf_u = 213;
export const i_add_ovf = 214;
export const i_add_ovf_un = 215;
export const i_mul_ovf = 216;
export const i_mul_ovf_un = 217;
export const i_sub_ovf = 218;
export const i_sub_ovf_un = 219;
export const i_endfinally = 220;
export const i_leave = 221;
export const i_leave_s = 222;
export const i_stind_i = 223;
export const i_conv_u = 224;
export const i_arglist = 65024;
export const i_ceq = 65025;
export const i_cgt = 65026;
export const i_cgt_un = 65027;
export const i_clt = 65028;
export const i_clt_un = 65029;
export const i_ldftn = 65030;
export const i_ldvirtftn = 65031;
export const i_ldarg = 65033;
export const i_ldarga = 65034;
export const i_starg = 65035;
export const i_ldloc = 65036;
export const i_ldloca = 65037;
export const i_stloc = 65038;
export const i_localloc = 65039;
export const i_endfilter = 65041;
export const i_unaligned = 65042;
export const i_volatile = 65043;
export const i_constrained = 65046;
export const i_readonly = 65054;
export const i_tail = 65044;
export const i_initobj = 65045;
export const i_cpblk = 65047;
export const i_initblk = 65048;
export const i_rethrow = 65050;
export const i_sizeof = 65052;
export const i_refanytype = 65053;
export const i_ldelem_any = 163;
export const i_stelem_any = 164;
export const i_unbox_any = 165;
export function mk_ldc(i) {
  return mkLdcInt32(i);
}
export const noArgInstrs = new Lazy(function () {
  return ofArray([[i_ldc_i4_0, mk_ldc(0)], [i_ldc_i4_1, mk_ldc(1)], [i_ldc_i4_2, mk_ldc(2)], [i_ldc_i4_3, mk_ldc(3)], [i_ldc_i4_4, mk_ldc(4)], [i_ldc_i4_5, mk_ldc(5)], [i_ldc_i4_6, mk_ldc(6)], [i_ldc_i4_7, mk_ldc(7)], [i_ldc_i4_8, mk_ldc(8)], [i_ldc_i4_m1, mk_ldc(-1)], [10, mkStloc(0)], [11, mkStloc(1)], [12, mkStloc(2)], [13, mkStloc(3)], [6, mkLdloc(0)], [7, mkLdloc(1)], [8, mkLdloc(2)], [9, mkLdloc(3)], [2, mkLdarg(0)], [3, mkLdarg(1)], [4, mkLdarg(2)], [5, mkLdarg(3)], [42, new ILInstr(47)], [88, new ILInstr(0)], [214, new ILInstr(1)], [215, new ILInstr(2)], [95, new ILInstr(3)], [91, new ILInstr(4)], [92, new ILInstr(5)], [65025, new ILInstr(6)], [65026, new ILInstr(7)], [65027, new ILInstr(8)], [65028, new ILInstr(9)], [65029, new ILInstr(10)], [103, new ILInstr(11, new ILBasicType(1))], [104, new ILInstr(11, new ILBasicType(3))], [105, new ILInstr(11, new ILBasicType(5))], [106, new ILInstr(11, new ILBasicType(7))], [211, new ILInstr(11, new ILBasicType(11))], [107, new ILInstr(11, new ILBasicType(9))], [108, new ILInstr(11, new ILBasicType(10))], [210, new ILInstr(11, new ILBasicType(2))], [209, new ILInstr(11, new ILBasicType(4))], [109, new ILInstr(11, new ILBasicType(6))], [110, new ILInstr(11, new ILBasicType(8))], [224, new ILInstr(11, new ILBasicType(12))], [118, new ILInstr(11, new ILBasicType(0))], [179, new ILInstr(12, new ILBasicType(1))], [181, new ILInstr(12, new ILBasicType(3))], [183, new ILInstr(12, new ILBasicType(5))], [185, new ILInstr(12, new ILBasicType(7))], [212, new ILInstr(12, new ILBasicType(11))], [180, new ILInstr(12, new ILBasicType(2))], [182, new ILInstr(12, new ILBasicType(4))], [184, new ILInstr(12, new ILBasicType(6))], [186, new ILInstr(12, new ILBasicType(8))], [213, new ILInstr(12, new ILBasicType(12))], [130, new ILInstr(13, new ILBasicType(1))], [131, new ILInstr(13, new ILBasicType(3))], [132, new ILInstr(13, new ILBasicType(5))], [133, new ILInstr(13, new ILBasicType(7))], [138, new ILInstr(13, new ILBasicType(11))], [134, new ILInstr(13, new ILBasicType(2))], [135, new ILInstr(13, new ILBasicType(4))], [136, new ILInstr(13, new ILBasicType(6))], [137, new ILInstr(13, new ILBasicType(8))], [139, new ILInstr(13, new ILBasicType(12))], [156, new ILInstr(79, new ILBasicType(1))], [157, new ILInstr(79, new ILBasicType(3))], [158, new ILInstr(79, new ILBasicType(5))], [159, new ILInstr(79, new ILBasicType(7))], [160, new ILInstr(79, new ILBasicType(9))], [161, new ILInstr(79, new ILBasicType(10))], [155, new ILInstr(79, new ILBasicType(11))], [162, new ILInstr(79, new ILBasicType(13))], [144, new ILInstr(78, new ILBasicType(1))], [146, new ILInstr(78, new ILBasicType(3))], [148, new ILInstr(78, new ILBasicType(5))], [150, new ILInstr(78, new ILBasicType(7))], [145, new ILInstr(78, new ILBasicType(2))], [147, new ILInstr(78, new ILBasicType(4))], [149, new ILInstr(78, new ILBasicType(6))], [152, new ILInstr(78, new ILBasicType(9))], [153, new ILInstr(78, new ILBasicType(10))], [151, new ILInstr(78, new ILBasicType(11))], [154, new ILInstr(78, new ILBasicType(13))], [90, new ILInstr(14)], [216, new ILInstr(15)], [217, new ILInstr(16)], [93, new ILInstr(17)], [94, new ILInstr(18)], [98, new ILInstr(19)], [99, new ILInstr(20)], [100, new ILInstr(21)], [89, new ILInstr(22)], [218, new ILInstr(23)], [219, new ILInstr(24)], [97, new ILInstr(25)], [96, new ILInstr(26)], [101, new ILInstr(27)], [102, new ILInstr(28)], [i_ldnull, new ILInstr(29)], [i_dup, new ILInstr(30)], [i_pop, new ILInstr(31)], [i_ckfinite, new ILInstr(32)], [i_nop, new ILInstr(33)], [i_break, new ILInstr(88)], [i_arglist, new ILInstr(90)], [i_endfilter, new ILInstr(56)], [i_endfinally, new ILInstr(55)], [i_refanytype, new ILInstr(86)], [i_localloc, new ILInstr(91)], [i_throw, new ILInstr(54)], [i_ldlen, new ILInstr(84)], [i_rethrow, new ILInstr(58)]]);
});
export function isNoArgInstr(i) {
  var n;
  const $var1 = i.tag === 34 ? i.data[0].tag === 5 ? i.data[1].tag === 0 ? (n = i.data[1].data | 0, -1 <= n ? n <= 8 : false) ? [0, i.data[1].data] : [1] : [1] : [1] : [1];

  switch ($var1[0]) {
    case 0:
      return true;

    case 1:
      const $var2 = i.tag === 42 ? i.data <= 3 ? [0, i.data] : [1] : i.tag === 38 ? i.data <= 3 ? [0, i.data] : [1] : i.tag === 35 ? i.data <= 3 ? [0, i.data] : [1] : [1];

      switch ($var2[0]) {
        case 0:
          return true;

        case 1:
          const $var3 = i.tag === 47 ? [0] : i.tag === 0 ? [0] : i.tag === 1 ? [0] : i.tag === 2 ? [0] : i.tag === 3 ? [0] : i.tag === 4 ? [0] : i.tag === 5 ? [0] : i.tag === 6 ? [0] : i.tag === 7 ? [0] : i.tag === 8 ? [0] : i.tag === 9 ? [0] : i.tag === 10 ? [0] : i.tag === 11 ? i.data.tag === 1 ? [0] : i.data.tag === 3 ? [0] : i.data.tag === 5 ? [0] : i.data.tag === 7 ? [0] : i.data.tag === 11 ? [0] : i.data.tag === 9 ? [0] : i.data.tag === 10 ? [0] : i.data.tag === 2 ? [0] : i.data.tag === 4 ? [0] : i.data.tag === 6 ? [0] : i.data.tag === 8 ? [0] : i.data.tag === 12 ? [0] : i.data.tag === 0 ? [0] : [1] : i.tag === 12 ? i.data.tag === 1 ? [0] : i.data.tag === 3 ? [0] : i.data.tag === 5 ? [0] : i.data.tag === 7 ? [0] : i.data.tag === 11 ? [0] : i.data.tag === 2 ? [0] : i.data.tag === 4 ? [0] : i.data.tag === 6 ? [0] : i.data.tag === 8 ? [0] : i.data.tag === 12 ? [0] : [1] : i.tag === 13 ? i.data.tag === 1 ? [0] : i.data.tag === 3 ? [0] : i.data.tag === 5 ? [0] : i.data.tag === 7 ? [0] : i.data.tag === 11 ? [0] : i.data.tag === 2 ? [0] : i.data.tag === 4 ? [0] : i.data.tag === 6 ? [0] : i.data.tag === 8 ? [0] : i.data.tag === 12 ? [0] : [1] : i.tag === 79 ? i.data.tag === 1 ? [0] : i.data.tag === 3 ? [0] : i.data.tag === 5 ? [0] : i.data.tag === 7 ? [0] : i.data.tag === 9 ? [0] : i.data.tag === 10 ? [0] : i.data.tag === 11 ? [0] : i.data.tag === 13 ? [0] : [1] : i.tag === 78 ? i.data.tag === 1 ? [0] : i.data.tag === 3 ? [0] : i.data.tag === 5 ? [0] : i.data.tag === 7 ? [0] : i.data.tag === 2 ? [0] : i.data.tag === 4 ? [0] : i.data.tag === 6 ? [0] : i.data.tag === 9 ? [0] : i.data.tag === 10 ? [0] : i.data.tag === 11 ? [0] : i.data.tag === 13 ? [0] : [1] : i.tag === 14 ? [0] : i.tag === 15 ? [0] : i.tag === 16 ? [0] : i.tag === 17 ? [0] : i.tag === 18 ? [0] : i.tag === 19 ? [0] : i.tag === 20 ? [0] : i.tag === 21 ? [0] : i.tag === 22 ? [0] : i.tag === 23 ? [0] : i.tag === 24 ? [0] : i.tag === 25 ? [0] : i.tag === 26 ? [0] : i.tag === 27 ? [0] : i.tag === 28 ? [0] : i.tag === 29 ? [0] : i.tag === 30 ? [0] : i.tag === 31 ? [0] : i.tag === 32 ? [0] : i.tag === 33 ? [0] : i.tag === 88 ? [0] : i.tag === 90 ? [0] : i.tag === 56 ? [0] : i.tag === 55 ? [0] : i.tag === 86 ? [0] : i.tag === 91 ? [0] : i.tag === 54 ? [0] : i.tag === 84 ? [0] : i.tag === 58 ? [0] : [1];

          switch ($var3[0]) {
            case 0:
              return true;

            case 1:
              return false;
          }

      }

  }
}
export const ILCmpInstrMap = new Lazy(function () {
  const dict = create(null, fromEqualityComparer({
    GetHashCode(x) {
      return function (obj) {
        return hash(obj);
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
  dict.set(new ILComparisonInstr(0), i_beq);
  dict.set(new ILComparisonInstr(3), i_bgt);
  dict.set(new ILComparisonInstr(4), i_bgt_un);
  dict.set(new ILComparisonInstr(1), i_bge);
  dict.set(new ILComparisonInstr(2), i_bge_un);
  dict.set(new ILComparisonInstr(5), i_ble);
  dict.set(new ILComparisonInstr(6), i_ble_un);
  dict.set(new ILComparisonInstr(7), i_blt);
  dict.set(new ILComparisonInstr(8), i_blt_un);
  dict.set(new ILComparisonInstr(9), i_bne_un);
  dict.set(new ILComparisonInstr(10), i_brfalse);
  dict.set(new ILComparisonInstr(11), i_brtrue);
  return dict;
});
export const ILCmpInstrRevMap = new Lazy(function () {
  const dict = create(null, fromEqualityComparer({
    GetHashCode(x) {
      return function (obj) {
        return hash(obj);
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
  dict.set(new ILComparisonInstr(0), i_beq_s);
  dict.set(new ILComparisonInstr(3), i_bgt_s);
  dict.set(new ILComparisonInstr(4), i_bgt_un_s);
  dict.set(new ILComparisonInstr(1), i_bge_s);
  dict.set(new ILComparisonInstr(2), i_bge_un_s);
  dict.set(new ILComparisonInstr(5), i_ble_s);
  dict.set(new ILComparisonInstr(6), i_ble_un_s);
  dict.set(new ILComparisonInstr(7), i_blt_s);
  dict.set(new ILComparisonInstr(8), i_blt_un_s);
  dict.set(new ILComparisonInstr(9), i_bne_un_s);
  dict.set(new ILComparisonInstr(10), i_brfalse_s);
  dict.set(new ILComparisonInstr(11), i_brtrue_s);
  return dict;
});
export const nt_VOID = 1;
export const nt_BOOLEAN = 2;
export const nt_I1 = 3;
export const nt_U1 = 4;
export const nt_I2 = 5;
export const nt_U2 = 6;
export const nt_I4 = 7;
export const nt_U4 = 8;
export const nt_I8 = 9;
export const nt_U8 = 10;
export const nt_R4 = 11;
export const nt_R8 = 12;
export const nt_SYSCHAR = 13;
export const nt_VARIANT = 14;
export const nt_CURRENCY = 15;
export const nt_PTR = 16;
export const nt_DECIMAL = 17;
export const nt_DATE = 18;
export const nt_BSTR = 19;
export const nt_LPSTR = 20;
export const nt_LPWSTR = 21;
export const nt_LPTSTR = 22;
export const nt_FIXEDSYSSTRING = 23;
export const nt_OBJECTREF = 24;
export const nt_IUNKNOWN = 25;
export const nt_IDISPATCH = 26;
export const nt_STRUCT = 27;
export const nt_INTF = 28;
export const nt_SAFEARRAY = 29;
export const nt_FIXEDARRAY = 30;
export const nt_INT = 31;
export const nt_UINT = 32;
export const nt_NESTEDSTRUCT = 33;
export const nt_BYVALSTR = 34;
export const nt_ANSIBSTR = 35;
export const nt_TBSTR = 36;
export const nt_VARIANTBOOL = 37;
export const nt_FUNC = 38;
export const nt_ASANY = 40;
export const nt_ARRAY = 42;
export const nt_LPSTRUCT = 43;
export const nt_CUSTOMMARSHALER = 44;
export const nt_ERROR = 45;
export const nt_LPUTF8STR = 48;
export const nt_MAX = 80;
export const vt_EMPTY = 0;
export const vt_NULL = 1;
export const vt_I2 = 2;
export const vt_I4 = 3;
export const vt_R4 = 4;
export const vt_R8 = 5;
export const vt_CY = 6;
export const vt_DATE = 7;
export const vt_BSTR = 8;
export const vt_DISPATCH = 9;
export const vt_ERROR = 10;
export const vt_BOOL = 11;
export const vt_VARIANT = 12;
export const vt_UNKNOWN = 13;
export const vt_DECIMAL = 14;
export const vt_I1 = 16;
export const vt_UI1 = 17;
export const vt_UI2 = 18;
export const vt_UI4 = 19;
export const vt_I8 = 20;
export const vt_UI8 = 21;
export const vt_INT = 22;
export const vt_UINT = 23;
export const vt_VOID = 24;
export const vt_HRESULT = 25;
export const vt_PTR = 26;
export const vt_SAFEARRAY = 27;
export const vt_CARRAY = 28;
export const vt_USERDEFINED = 29;
export const vt_LPSTR = 30;
export const vt_LPWSTR = 31;
export const vt_RECORD = 36;
export const vt_FILETIME = 64;
export const vt_BLOB = 65;
export const vt_STREAM = 66;
export const vt_STORAGE = 67;
export const vt_STREAMED_OBJECT = 68;
export const vt_STORED_OBJECT = 69;
export const vt_BLOB_OBJECT = 70;
export const vt_CF = 71;
export const vt_CLSID = 72;
export const vt_VECTOR = 4096;
export const vt_ARRAY = 8192;
export const vt_BYREF = 16384;
export const ILNativeTypeMap = new Lazy(function () {
  return ofArray([[nt_CURRENCY, new ILNativeType(4)], [nt_BSTR, new ILNativeType(30)], [nt_LPSTR, new ILNativeType(5)], [nt_LPWSTR, new ILNativeType(6)], [nt_LPTSTR, new ILNativeType(7)], [nt_LPUTF8STR, new ILNativeType(8)], [nt_IUNKNOWN, new ILNativeType(31)], [nt_IDISPATCH, new ILNativeType(32)], [nt_BYVALSTR, new ILNativeType(9)], [nt_TBSTR, new ILNativeType(10)], [nt_LPSTRUCT, new ILNativeType(11)], [nt_INTF, new ILNativeType(33)], [nt_STRUCT, new ILNativeType(12)], [nt_ERROR, new ILNativeType(34)], [nt_VOID, new ILNativeType(13)], [nt_BOOLEAN, new ILNativeType(14)], [nt_I1, new ILNativeType(15)], [nt_I2, new ILNativeType(16)], [nt_I4, new ILNativeType(17)], [nt_I8, new ILNativeType(18)], [nt_R4, new ILNativeType(19)], [nt_R8, new ILNativeType(20)], [nt_U1, new ILNativeType(21)], [nt_U2, new ILNativeType(22)], [nt_U4, new ILNativeType(23)], [nt_U8, new ILNativeType(24)], [nt_INT, new ILNativeType(26)], [nt_UINT, new ILNativeType(27)], [nt_ANSIBSTR, new ILNativeType(36)], [nt_VARIANTBOOL, new ILNativeType(37)], [nt_FUNC, new ILNativeType(28)], [nt_ASANY, new ILNativeType(29)]]);
});
export const ILNativeTypeRevMap = new Lazy(function () {
  return map(function (tupledArg) {
    return [tupledArg[1], tupledArg[0]];
  }, Lazy_1.force(ILNativeTypeMap));
});
export const ILVariantTypeMap = new Lazy(function () {
  return ofArray([[new ILNativeVariant(0), vt_EMPTY], [new ILNativeVariant(1), vt_NULL], [new ILNativeVariant(2), vt_VARIANT], [new ILNativeVariant(3), vt_CY], [new ILNativeVariant(4), vt_DECIMAL], [new ILNativeVariant(5), vt_DATE], [new ILNativeVariant(6), vt_BSTR], [new ILNativeVariant(7), vt_LPSTR], [new ILNativeVariant(8), vt_LPWSTR], [new ILNativeVariant(9), vt_UNKNOWN], [new ILNativeVariant(10), vt_DISPATCH], [new ILNativeVariant(11), vt_SAFEARRAY], [new ILNativeVariant(12), vt_ERROR], [new ILNativeVariant(13), vt_HRESULT], [new ILNativeVariant(14), vt_CARRAY], [new ILNativeVariant(15), vt_USERDEFINED], [new ILNativeVariant(16), vt_RECORD], [new ILNativeVariant(17), vt_FILETIME], [new ILNativeVariant(18), vt_BLOB], [new ILNativeVariant(19), vt_STREAM], [new ILNativeVariant(20), vt_STORAGE], [new ILNativeVariant(21), vt_STREAMED_OBJECT], [new ILNativeVariant(22), vt_STORED_OBJECT], [new ILNativeVariant(23), vt_BLOB_OBJECT], [new ILNativeVariant(24), vt_CF], [new ILNativeVariant(25), vt_CLSID], [new ILNativeVariant(26), vt_VOID], [new ILNativeVariant(27), vt_BOOL], [new ILNativeVariant(28), vt_I1], [new ILNativeVariant(29), vt_I2], [new ILNativeVariant(30), vt_I4], [new ILNativeVariant(31), vt_I8], [new ILNativeVariant(32), vt_R4], [new ILNativeVariant(33), vt_R8], [new ILNativeVariant(34), vt_UI1], [new ILNativeVariant(35), vt_UI2], [new ILNativeVariant(36), vt_UI4], [new ILNativeVariant(37), vt_UI8], [new ILNativeVariant(38), vt_PTR], [new ILNativeVariant(42), vt_INT], [new ILNativeVariant(43), vt_UINT]]);
});
export const ILVariantTypeRevMap = new Lazy(function () {
  return map(function (tupledArg) {
    return [tupledArg[1], tupledArg[0]];
  }, Lazy_1.force(ILVariantTypeMap));
});
export const ILSecurityActionMap = new Lazy(function () {
  return ofArray([[new ILSecurityAction(0), 1], [new ILSecurityAction(1), 2], [new ILSecurityAction(2), 3], [new ILSecurityAction(3), 4], [new ILSecurityAction(4), 5], [new ILSecurityAction(5), 6], [new ILSecurityAction(6), 7], [new ILSecurityAction(7), 8], [new ILSecurityAction(8), 9], [new ILSecurityAction(9), 10], [new ILSecurityAction(10), 11], [new ILSecurityAction(11), 12], [new ILSecurityAction(12), 13], [new ILSecurityAction(13), 14], [new ILSecurityAction(14), 15], [new ILSecurityAction(15), 16], [new ILSecurityAction(16), 17], [new ILSecurityAction(17), 18]]);
});
export const ILSecurityActionRevMap = new Lazy(function () {
  return map(function (tupledArg) {
    return [tupledArg[1], tupledArg[0]];
  }, Lazy_1.force(ILSecurityActionMap));
});
export const e_CorILMethod_TinyFormat = 2;
export const e_CorILMethod_FatFormat = 3;
export const e_CorILMethod_FormatMask = 3;
export const e_CorILMethod_MoreSects = 8;
export const e_CorILMethod_InitLocals = 16;
export const e_CorILMethod_Sect_EHTable = 1;
export const e_CorILMethod_Sect_FatFormat = 64;
export const e_CorILMethod_Sect_MoreSects = 128;
export const e_COR_ILEXCEPTION_CLAUSE_EXCEPTION = 0;
export const e_COR_ILEXCEPTION_CLAUSE_FILTER = 1;
export const e_COR_ILEXCEPTION_CLAUSE_FINALLY = 2;
export const e_COR_ILEXCEPTION_CLAUSE_FAULT = 4;
export const e_IMAGE_CEE_CS_CALLCONV_FASTCALL = 4;
export const e_IMAGE_CEE_CS_CALLCONV_STDCALL = 2;
export const e_IMAGE_CEE_CS_CALLCONV_THISCALL = 3;
export const e_IMAGE_CEE_CS_CALLCONV_CDECL = 1;
export const e_IMAGE_CEE_CS_CALLCONV_VARARG = 5;
export const e_IMAGE_CEE_CS_CALLCONV_FIELD = 6;
export const e_IMAGE_CEE_CS_CALLCONV_LOCAL_SIG = 7;
export const e_IMAGE_CEE_CS_CALLCONV_PROPERTY = 8;
export const e_IMAGE_CEE_CS_CALLCONV_GENERICINST = 10;
export const e_IMAGE_CEE_CS_CALLCONV_GENERIC = 16;
export const e_IMAGE_CEE_CS_CALLCONV_INSTANCE = 32;
export const e_IMAGE_CEE_CS_CALLCONV_INSTANCE_EXPLICIT = 64;