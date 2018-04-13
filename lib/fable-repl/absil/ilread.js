import { dprintf, dprintn } from "./ildiag";
import { int64BitsToDouble, getBytesInt32, toSingle } from "../fable-core/BitConverter";
import { Tables, notlazy, List as List_1, Lazy as Lazy_1, getHole, op_GreaterGreaterGreaterAmp } from "./illib";
import { hds_Assembly, hds_MethodDef, hds_TypeDef, hca_ExportedType, hca_ManifestResource, hca_Property, hca_Event, hca_ParamDef, hca_MethodDef, hca_FieldDef, hca_GenericParam, hca_TypeDef, hca_Assembly, hca_Module, nt_MAX, nt_ARRAY, nt_SAFEARRAY, nt_FIXEDARRAY, nt_FIXEDSYSSTRING, nt_CUSTOMMARSHALER, ILNativeTypeMap, vt_BYREF, vt_VECTOR, vt_ARRAY, ILVariantTypeRevMap, e_CorILMethod_Sect_MoreSects, e_COR_ILEXCEPTION_CLAUSE_FAULT, e_COR_ILEXCEPTION_CLAUSE_FINALLY, e_COR_ILEXCEPTION_CLAUSE_FILTER, e_COR_ILEXCEPTION_CLAUSE_EXCEPTION, e_CorILMethod_Sect_EHTable, e_CorILMethod_Sect_FatFormat, e_CorILMethod_InitLocals, e_CorILMethod_MoreSects, e_CorILMethod_FatFormat, e_CorILMethod_TinyFormat, e_CorILMethod_FormatMask, i_tail, i_volatile, i_unaligned, i_readonly, i_constrained, mf_MethodDef, ILSecurityActionRevMap, hc_Property, hs_Property, hs_Event, hc_ParamDef, hfm_ParamDef, tomd_MethodDef, e_IMAGE_CEE_CS_CALLCONV_GENERICINST, e_IMAGE_CEE_CS_CALLCONV_GENERIC, e_IMAGE_CEE_CS_CALLCONV_VARARG, e_IMAGE_CEE_CS_CALLCONV_CDECL, e_IMAGE_CEE_CS_CALLCONV_THISCALL, e_IMAGE_CEE_CS_CALLCONV_STDCALL, e_IMAGE_CEE_CS_CALLCONV_FASTCALL, e_IMAGE_CEE_CS_CALLCONV_INSTANCE_EXPLICIT, e_IMAGE_CEE_CS_CALLCONV_INSTANCE, e_IMAGE_CEE_CS_CALLCONV_LOCAL_SIG, e_IMAGE_CEE_CS_CALLCONV_PROPERTY, e_IMAGE_CEE_CS_CALLCONV_FIELD, et_PINNED, et_SENTINEL, et_FNPTR, et_CMOD_OPT, et_CMOD_REQD, et_TYPEDBYREF, et_VOID, et_ARRAY, et_SZARRAY, et_PTR, et_BYREF, et_MVAR, et_VAR, et_VALUETYPE, et_CLASS, et_WITH, et_BOOLEAN, et_CHAR, et_R8, et_R4, et_U, et_U8, et_U4, et_U2, et_U1, et_I, et_I8, et_I4, et_I2, et_I1, et_STRING, et_OBJECT, hfm_FieldDef, hc_FieldDef, rs_TypeRef, rs_AssemblyRef, rs_ModuleRef, rs_Module, i_ExportedType, i_AssemblyRef, i_File, cat_MemberRef, cat_MethodDef, mrp_TypeSpec, mrp_MethodDef, mrp_ModuleRef, mrp_TypeRef, tomd_TypeDef, mkILCustomAttributeTypeTag, mkImplementationTag, mkMemberForwardedTag, mkMethodDefOrRefTag, mkHasSemanticsTag, mkMemberRefParentTag, mkHasDeclSecurityTag, mkHasFieldMarshalTag, mkHasCustomAttributeTag, mkHasConstantTag, mkTypeOrMethodDefTag, mkTypeDefOrRefOrSpecTag, mkResolutionScopeTag, TypeDefOrRefTag, HasSemanticsTag, HasConstantTag, TypeOrMethodDefTag, CustomAttributeTypeTag, noArgInstrs, i_unbox, i_box, i_sizeof, i_stobj, i_ldobj, i_initobj, i_cpobj, i_unbox_any, i_isinst, i_castclass, i_newarr, i_stelem_any, i_ldelem_any, i_ldelema, i_refanyval, i_mkrefany, i_calli, i_ldtoken, i_switch, i_ldstr, i_bne_un, i_bge_un, i_bge, i_bgt_un, i_bgt, i_ble_un, i_ble, i_blt_un, i_blt, i_beq, i_brfalse, i_brtrue, i_bne_un_s, i_bge_un_s, i_bge_s, i_bgt_un_s, i_bgt_s, i_ble_un_s, i_ble_s, i_blt_un_s, i_blt_s, i_beq_s, i_brfalse_s, i_brtrue_s, i_br, i_leave, i_br_s, i_leave_s, i_callvirt, i_newobj, i_ldvirtftn, i_ldftn, i_call, i_ldsflda, i_ldflda, i_stsfld, i_ldsfld, i_stfld, i_ldfld, i_ldc_r8, i_ldc_r4, i_ldc_i4_s, i_ldc_i4, i_ldc_i8, i_initblk, i_cpblk, i_ldind_ref, i_ldind_r8, i_ldind_r4, i_ldind_u4, i_ldind_u2, i_ldind_u1, i_ldind_i8, i_ldind_i4, i_ldind_i2, i_ldind_i1, i_ldind_i, i_stind_ref, i_stind_r8, i_stind_r4, i_stind_i8, i_stind_i4, i_stind_i2, i_stind_i1, i_stind_i, i_ldloca, i_ldloc, i_stloc, i_ldarga, i_starg, i_ldarg, i_ldloca_s, i_ldloc_s, i_stloc_s, i_ldarga_s, i_starg_s, i_ldarg_s, mdor_MemberRef, mdor_MethodDef, tdor_TypeSpec, tdor_TypeRef, tdor_TypeDef, TableNames, TableName } from "./ilbinary";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { hash as hash_1, compare, Array as _Array, Interface, Any, comparePrimitives, compareUnions, makeGeneric, Tuple, Function as _Function, equals, Option, extendInfo, compareRecords, equalsRecords, GenericParam } from "../fable-core/Util";
import { map as map_2, getSubArray } from "../fable-core/Array";
import { System } from "../fcs-fable/adapters";
import { fromValue, fromNumber } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { filter, initialize as initialize_1, map, append, ofArray, reverse } from "../fable-core/List";
import List from "../fable-core/List";
import { Bytes } from "./bytes";
import { ILPlatform, ILExportedTypeOrForwarder, mkILExportedTypesLazy, ILNestedExportedType, mkILNestedExportedTypesLazy, ILResourceAccess, ILResource, ILResourceLocation, mkILResources, ILNativeType, ILNativeVariant, ILExceptionSpec, ILExceptionClause, ILMethodBody, buildILCode, mkILCallSig, generateCodeLabel, PInvokeMethod, MethodBody, PInvokeThrowOnUnmappableChar, PInvokeCharBestFit, PInvokeCharEncoding, PInvokeCallingConvention, mkMethBodyLazyAux, ILFieldInit, ILSecurityDecl, mkILSecurityDeclsReader, mkILCustomAttrsReader, mkILPropertiesLazy, ILPropertyDef, mkILEventsLazy, ILEventDef, ILOverridesSpec, ILMethodImplDef, mkILMethodImplsLazy, ILParameter, ILReturn, mkILParamAnon, mkILReturn, ILMethodDef, methBodyNotAvailable, methBodyAbstract, methBodyNative, mkILFormalGenericArgs, mkILFieldSpecInTy, mkILTyvarTy, ILArgConvention, mkILTyRef, mkILNonGenericValueTy, mkILArrTy, mkILArr1DTy, mkILMethodsComputed, mkILFieldsLazy, ILFieldDef, mkILMethSpecInTy, mkILTypeForGlobalFunctions, ILScopeRef, ILTypeSpec, mkILTy, ILGenericVariance, ILTypeDef, mkILTypeDefReader, mkILPreTypeDefRead, splitNamespace, ILTypeDefLayout, ILMemberAccess, ILTypeDefAccess, ILTypeDefLayoutInfo, ILModuleRef, PublicKey, ILAssemblyManifest, ILAssemblyLongevity, ILModuleDef, mkILTypeDefsComputed, ILNativeResource, ILTypeDefStored, ILSecurityDeclsStored, ILAttributesStored, ILGenericParameterDef, ILLocal, ILThisConvention, ILTypeRef, ILAttribute, ILAssemblyRef, ILGlobals, ILCallingConv, ILBoxity, ILArrayShape, ILComparisonInstr, mkLdcInt32, ILConst, ILBasicType, mkLdloc, mkStloc, mkLdarg, ILCallingSignature, ILToken, ILMethodSpec, ILFieldSpec, ILInstr, ILType, ILReadonly, ILVolatility, ILTailcall, ILAlignment } from "./il";
import CurriedLambda from "../fable-core/CurriedLambda";
import { makeSome, getValue } from "../fable-core/Option";
import { sumBy, fold, initialize, item, map as map_1, range, collect, sortWith, empty, singleton, delay, toList, iterate, replicate } from "../fable-core/Seq";
import { create, tryGetValue } from "../fable-core/Map";
import Lazy from "../fable-core/Lazy";
import { distinct } from "../fable-core/Set";
import { printf, toFail } from "../fable-core/String";
import { fromEqualityComparer } from "../fable-core/Comparer";
import { fileNameOfPath } from "../utils/filename";
export const checking = false;
export const logging = false;

if (checking) {
  dprintn("warning : ILBinaryReader.checking is on");
}

export const noStableFileHeuristic = false;
export const alwaysMemoryMapFSC = false;
export const stronglyHeldReaderCacheSizeDefault = 30;
export const stronglyHeldReaderCacheSize = stronglyHeldReaderCacheSizeDefault;
export function singleOfBits(x) {
  return toSingle(getBytesInt32(x), 0);
}
export function doubleOfBits(x) {
  return int64BitsToDouble(x);
}
export function align(alignment, n) {
  return ~~((n + alignment - 1) / alignment) * alignment | 0;
}
export function uncodedToken(tab, idx) {
  return tab.Index << 24 | idx | 0;
}
export function i32ToUncodedToken(tok) {
  const idx = tok & 16777215 | 0;
  const tab = op_GreaterGreaterGreaterAmp(tok, 24) | 0;
  return [TableName.FromIndex(tab), idx];
}
export class TaggedIndex {
  constructor(tag, index) {
    this.tag = tag;
    this.index = index | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.TaggedIndex",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tag: GenericParam("T"),
        index: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static [".ctor"](tag, index) {
    return new TaggedIndex(tag, index);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.TaggedIndex", TaggedIndex);
export function uncodedTokenToTypeDefOrRefOrSpec(tab, tok) {
  let tag;

  if (tab.Equals(TableNames.TypeDef)) {
    tag = tdor_TypeDef;
  } else if (tab.Equals(TableNames.TypeRef)) {
    tag = tdor_TypeRef;
  } else if (tab.Equals(TableNames.TypeSpec)) {
    tag = tdor_TypeSpec;
  } else {
    throw new Error("bad table in uncodedTokenToTypeDefOrRefOrSpec");
  }

  return TaggedIndex[".ctor"](tag, tok);
}
export function uncodedTokenToMethodDefOrRef(tab, tok) {
  let tag;

  if (tab.Equals(TableNames.Method)) {
    tag = mdor_MethodDef;
  } else if (tab.Equals(TableNames.MemberRef)) {
    tag = mdor_MemberRef;
  } else {
    throw new Error("bad table in uncodedTokenToMethodDefOrRef");
  }

  return TaggedIndex[".ctor"](tag, tok);
}

function _TaggedIndex_(x) {
  return [x.tag, x.index];
}

export { _TaggedIndex_ as $7C$TaggedIndex$7C$ };
export function tokToTaggedIdx(f, nbits, tok) {
  let tagmask;

  if (nbits === 1) {
    tagmask = 1;
  } else if (nbits === 2) {
    tagmask = 3;
  } else if (nbits === 3) {
    tagmask = 7;
  } else if (nbits === 4) {
    tagmask = 15;
  } else if (nbits === 5) {
    tagmask = 31;
  } else {
    throw new Error("too many nbits");
  }

  const tag = tok & tagmask | 0;
  const idx = op_GreaterGreaterGreaterAmp(tok, nbits) | 0;
  return TaggedIndex[".ctor"](f(tag), idx);
}
export class Statistics {
  constructor(rawMemoryFileCount, memoryMapFileOpenedCount, memoryMapFileClosedCount, weakByteFileCount, byteFileCount) {
    this.rawMemoryFileCount = rawMemoryFileCount | 0;
    this.memoryMapFileOpenedCount = memoryMapFileOpenedCount | 0;
    this.memoryMapFileClosedCount = memoryMapFileClosedCount | 0;
    this.weakByteFileCount = weakByteFileCount | 0;
    this.byteFileCount = byteFileCount | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.Statistics",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        rawMemoryFileCount: "number",
        memoryMapFileOpenedCount: "number",
        memoryMapFileClosedCount: "number",
        weakByteFileCount: "number",
        byteFileCount: "number"
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
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.Statistics", Statistics);
export const stats = new Statistics(0, 0, 0, 0, 0);
export function GetStatistics() {
  return stats;
}
export class BinaryView {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BinaryView",
      properties: {}
    };
  }

  constructor() {}

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BinaryView", BinaryView);
export class ByteView extends BinaryView {
  [_Symbol.reflection]() {
    return extendInfo(ByteView, {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ByteView",
      interfaces: [],
      properties: {}
    });
  }

  constructor(bytes) {
    super();
    this.bytes = bytes;
  }

  ReadByte(addr) {
    return this.bytes[addr];
  }

  ReadBytes(addr, len) {
    return getSubArray(this.bytes, addr, len);
  }

  CountUtf8String(addr) {
    let p = addr | 0;

    while (this.bytes[p] !== 0) {
      p = p + 1 | 0;
    }

    return p - addr | 0;
  }

  ReadUTF8String(addr) {
    const n = this.CountUtf8String(addr) | 0;
    return System.Text.Encoding.UTF8.GetString(this.bytes, addr, n);
  }

  ReadInt32(addr) {
    const b0 = this.ReadByte(addr);
    const b1 = this.ReadByte(addr + 1);
    const b2 = this.ReadByte(addr + 2);
    const b3 = this.ReadByte(addr + 3);
    return ~~b0 | ~~b1 << 8 | ~~b2 << 16 | ~~b3 << 24 | 0;
  }

  ReadUInt16(addr) {
    const b0 = this.ReadByte(addr);
    const b1 = this.ReadByte(addr + 1);
    return b0 | b1 << 8;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ByteView", ByteView);
export class ByteFile {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ByteFile",
      interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BinaryFile"],
      properties: {
        FileName: "string"
      }
    };
  }

  constructor(fileName, bytes) {
    this.fileName = fileName;
    this.view = new ByteView(bytes);
    stats.byteFileCount = stats.byteFileCount + 1 | 0;
  }

  get FileName() {
    return this.fileName;
  }

  GetView() {
    return this.view;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ByteFile", ByteFile);
export function seekReadByte(mdv, addr) {
  return mdv.ReadByte(addr);
}
export function seekReadBytes(mdv, addr, len) {
  return function (arg00, arg10) {
    return mdv.ReadBytes(arg00, arg10);
  }(addr, len);
}
export function seekReadInt32(mdv, addr) {
  return mdv.ReadInt32(addr) | 0;
}
export function seekReadUInt16(mdv, addr) {
  return mdv.ReadUInt16(addr);
}
export function seekReadByteAsInt32(mdv, addr) {
  return ~~seekReadByte(mdv, addr) | 0;
}
export function seekReadInt64(mdv, addr) {
  const b0 = seekReadByte(mdv, addr);
  const b1 = seekReadByte(mdv, addr + 1);
  const b2 = seekReadByte(mdv, addr + 2);
  const b3 = seekReadByte(mdv, addr + 3);
  const b4 = seekReadByte(mdv, addr + 4);
  const b5 = seekReadByte(mdv, addr + 5);
  const b6 = seekReadByte(mdv, addr + 6);
  const b7 = seekReadByte(mdv, addr + 7);
  return fromNumber(b0, false).or(fromNumber(b1, false).shl(8)).or(fromNumber(b2, false).shl(16)).or(fromNumber(b3, false).shl(24)).or(fromNumber(b4, false).shl(32)).or(fromNumber(b5, false).shl(40)).or(fromNumber(b6, false).shl(48)).or(fromNumber(b7, false).shl(56));
}
export function seekReadUInt16AsInt32(mdv, addr) {
  return ~~seekReadUInt16(mdv, addr) | 0;
}
export function seekReadCompressedUInt32(mdv, addr) {
  const b0 = seekReadByte(mdv, addr);

  if (b0 <= 127) {
    return [~~b0, addr + 1];
  } else if (b0 <= 191) {
    const b0_1 = b0 & 127;
    const b1 = seekReadByteAsInt32(mdv, addr + 1) | 0;
    return [~~b0_1 << 8 | b1, addr + 2];
  } else {
    const b0_2 = b0 & 63;
    const b1_1 = seekReadByteAsInt32(mdv, addr + 1) | 0;
    const b2 = seekReadByteAsInt32(mdv, addr + 2) | 0;
    const b3 = seekReadByteAsInt32(mdv, addr + 3) | 0;
    return [~~b0_2 << 24 | b1_1 << 16 | b2 << 8 | b3, addr + 4];
  }
}
export function seekReadSByte(mdv, addr) {
  return (seekReadByte(mdv, addr) + 0x80 & 0xFF) - 0x80 | 0;
}
export function seekReadSingle(mdv, addr) {
  return singleOfBits(seekReadInt32(mdv, addr));
}
export function seekReadDouble(mdv, addr) {
  return doubleOfBits(seekReadInt64(mdv, addr));
}
export function seekCountUtf8String(mdv, addr, n) {
  seekCountUtf8String: while (true) {
    const c = seekReadByteAsInt32(mdv, addr) | 0;

    if (c === 0) {
      return n | 0;
    } else {
      mdv = mdv;
      addr = addr + 1;
      n = n + 1;
      continue seekCountUtf8String;
    }
  }
}
export function seekReadUTF8String(mdv, addr) {
  const n = seekCountUtf8String(mdv, addr, 0) | 0;
  const bytes = seekReadBytes(mdv, addr, n);
  return System.Text.Encoding.UTF8.GetString(bytes, 0, bytes.length);
}
export function seekReadBlob(mdv, addr) {
  const patternInput = seekReadCompressedUInt32(mdv, addr);
  return seekReadBytes(mdv, patternInput[1], patternInput[0]);
}
export function seekReadUserString(mdv, addr) {
  const patternInput = seekReadCompressedUInt32(mdv, addr);
  const bytes = seekReadBytes(mdv, patternInput[1], patternInput[0] - 1);
  return System.Text.Encoding.Unicode.GetString(bytes, 0, bytes.length);
}
export function seekReadGuid(mdv, addr) {
  return seekReadBytes(mdv, addr, 16);
}
export function seekReadUncodedToken(mdv, addr) {
  return i32ToUncodedToken(seekReadInt32(mdv, addr));
}
export function sigptrCheck(bytes, sigptr) {
  if (checking ? sigptr >= bytes.length : false) {
    throw new Error("read past end of sig. ");
  }
}
export function sigptrGetByte(bytes, sigptr) {
  sigptrCheck(bytes, sigptr);
  return [bytes[sigptr], sigptr + 1];
}
export function sigptrGetBool(bytes, sigptr) {
  const patternInput = sigptrGetByte(bytes, sigptr);
  return [patternInput[0] === 1, patternInput[1]];
}
export function sigptrGetSByte(bytes, sigptr) {
  const patternInput = sigptrGetByte(bytes, sigptr);
  return [(patternInput[0] + 0x80 & 0xFF) - 0x80, patternInput[1]];
}
export function sigptrGetUInt16(bytes, sigptr) {
  const patternInput = sigptrGetByte(bytes, sigptr);
  const patternInput_1 = sigptrGetByte(bytes, patternInput[1]);
  return [(~~patternInput[0] | ~~patternInput_1[0] << 8) & 0xFFFF, patternInput_1[1]];
}
export function sigptrGetInt16(bytes, sigptr) {
  const patternInput = sigptrGetUInt16(bytes, sigptr);
  return [(patternInput[0] + 0x8000 & 0xFFFF) - 0x8000, patternInput[1]];
}
export function sigptrGetInt32(bytes, sigptr) {
  sigptrCheck(bytes, sigptr);
  const b0 = bytes[sigptr];
  const b1 = bytes[sigptr + 1];
  const b2 = bytes[sigptr + 2];
  const b3 = bytes[sigptr + 3];
  const res = ~~b0 | ~~b1 << 8 | ~~b2 << 16 | ~~b3 << 24 | 0;
  return [res, sigptr + 4];
}
export function sigptrGetUInt32(bytes, sigptr) {
  const patternInput = sigptrGetInt32(bytes, sigptr);
  return [patternInput[0] >>> 0, patternInput[1]];
}
export function sigptrGetUInt64(bytes, sigptr) {
  const patternInput = sigptrGetUInt32(bytes, sigptr);
  const patternInput_1 = sigptrGetUInt32(bytes, patternInput[1]);
  return [fromNumber(patternInput[0], true).or(fromNumber(patternInput_1[0], true).shl(32)), patternInput_1[1]];
}
export function sigptrGetInt64(bytes, sigptr) {
  const patternInput = sigptrGetUInt64(bytes, sigptr);
  return [fromValue(patternInput[0]), patternInput[1]];
}
export function sigptrGetSingle(bytes, sigptr) {
  const patternInput = sigptrGetInt32(bytes, sigptr);
  return [singleOfBits(patternInput[0]), patternInput[1]];
}
export function sigptrGetDouble(bytes, sigptr) {
  const patternInput = sigptrGetInt64(bytes, sigptr);
  return [doubleOfBits(patternInput[0]), patternInput[1]];
}
export function sigptrGetZInt32(bytes, sigptr) {
  const patternInput = sigptrGetByte(bytes, sigptr);

  if (patternInput[0] <= 127) {
    return [~~patternInput[0], patternInput[1]];
  } else if (patternInput[0] <= 191) {
    const b0 = patternInput[0] & 127;
    const patternInput_1 = sigptrGetByte(bytes, patternInput[1]);
    return [~~b0 << 8 | ~~patternInput_1[0], patternInput_1[1]];
  } else {
    const b0_1 = patternInput[0] & 63;
    const patternInput_2 = sigptrGetByte(bytes, patternInput[1]);
    const patternInput_3 = sigptrGetByte(bytes, patternInput_2[1]);
    const patternInput_4 = sigptrGetByte(bytes, patternInput_3[1]);
    return [~~b0_1 << 24 | ~~patternInput_2[0] << 16 | ~~patternInput_3[0] << 8 | ~~patternInput_4[0], patternInput_4[1]];
  }
}
export function sigptrFoldAcc($var33, $var34, $var35, $var36, $var37, $var38) {
  sigptrFoldAcc: while (true) {
    const f = $var33;
    const n = $var34;
    const bytes = $var35;
    const sigptr = $var36;
    const i = $var37;
    const acc = $var38;

    if (i < n) {
      const patternInput = f(bytes, sigptr);
      $var33 = f;
      $var34 = n;
      $var35 = bytes;
      $var36 = patternInput[1];
      $var37 = i + 1;
      $var38 = new List(patternInput[0], acc);
      continue sigptrFoldAcc;
    } else {
      return [reverse(acc), sigptr];
    }
  }
}
export function sigptrFold(f, n, bytes, sigptr) {
  return sigptrFoldAcc(f, n, bytes, sigptr, 0, new List());
}
export function sigptrGetBytes(n, bytes, sigptr) {
  if (checking ? sigptr + n >= bytes.length : false) {
    dprintn("read past end of sig. in sigptrGetString");
    return [Bytes.zeroCreate(0), sigptr];
  } else {
    const res = Bytes.zeroCreate(n);

    for (let i = 0; i <= n - 1; i++) {
      res[i] = bytes[sigptr + i];
    }

    return [res, sigptr + n];
  }
}
export function sigptrGetString(n, bytes, sigptr) {
  const patternInput = sigptrGetBytes(n, bytes, sigptr);
  return [System.Text.Encoding.UTF8.GetString(patternInput[0], 0, patternInput[0].length), patternInput[1]];
}
export class ILInstrPrefixesRegister {
  constructor(al, tl, vol, ro, constrained) {
    this.al = al;
    this.tl = tl;
    this.vol = vol;
    this.ro = ro;
    this.constrained = constrained;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILInstrPrefixesRegister",
      interfaces: ["FSharpRecord"],
      properties: {
        al: ILAlignment,
        tl: ILTailcall,
        vol: ILVolatility,
        ro: ILReadonly,
        constrained: Option(ILType)
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILInstrPrefixesRegister", ILInstrPrefixesRegister);
export function noPrefixes(mk, prefixes) {
  if (!prefixes.al.Equals(new ILAlignment(0))) {
    throw new Error("an unaligned prefix is not allowed here");
  }

  if (!prefixes.vol.Equals(new ILVolatility(1))) {
    throw new Error("a volatile prefix is not allowed here");
  }

  if (!prefixes.tl.Equals(new ILTailcall(1))) {
    throw new Error("a tailcall prefix is not allowed here");
  }

  if (!prefixes.ro.Equals(new ILReadonly(1))) {
    throw new Error("a readonly prefix is not allowed here");
  }

  if (!equals(prefixes.constrained, null)) {
    throw new Error("a constrained prefix is not allowed here");
  }

  return mk;
}
export function volatileOrUnalignedPrefix(mk, prefixes) {
  if (!prefixes.tl.Equals(new ILTailcall(1))) {
    throw new Error("a tailcall prefix is not allowed here");
  }

  if (!equals(prefixes.constrained, null)) {
    throw new Error("a constrained prefix is not allowed here");
  }

  if (!prefixes.ro.Equals(new ILReadonly(1))) {
    throw new Error("a readonly prefix is not allowed here");
  }

  return mk([prefixes.al, prefixes.vol]);
}
export function volatilePrefix(mk, prefixes) {
  if (!prefixes.al.Equals(new ILAlignment(0))) {
    throw new Error("an unaligned prefix is not allowed here");
  }

  if (!prefixes.tl.Equals(new ILTailcall(1))) {
    throw new Error("a tailcall prefix is not allowed here");
  }

  if (!equals(prefixes.constrained, null)) {
    throw new Error("a constrained prefix is not allowed here");
  }

  if (!prefixes.ro.Equals(new ILReadonly(1))) {
    throw new Error("a readonly prefix is not allowed here");
  }

  return mk(prefixes.vol);
}
export function tailPrefix(mk, prefixes) {
  if (!prefixes.al.Equals(new ILAlignment(0))) {
    throw new Error("an unaligned prefix is not allowed here");
  }

  if (!prefixes.vol.Equals(new ILVolatility(1))) {
    throw new Error("a volatile prefix is not allowed here");
  }

  if (!equals(prefixes.constrained, null)) {
    throw new Error("a constrained prefix is not allowed here");
  }

  if (!prefixes.ro.Equals(new ILReadonly(1))) {
    throw new Error("a readonly prefix is not allowed here");
  }

  return mk(prefixes.tl);
}
export function constraintOrTailPrefix(mk, prefixes) {
  if (!prefixes.al.Equals(new ILAlignment(0))) {
    throw new Error("an unaligned prefix is not allowed here");
  }

  if (!prefixes.vol.Equals(new ILVolatility(1))) {
    throw new Error("a volatile prefix is not allowed here");
  }

  if (!prefixes.ro.Equals(new ILReadonly(1))) {
    throw new Error("a readonly prefix is not allowed here");
  }

  return mk([prefixes.constrained, prefixes.tl]);
}
export function readonlyPrefix(mk, prefixes) {
  if (!prefixes.al.Equals(new ILAlignment(0))) {
    throw new Error("an unaligned prefix is not allowed here");
  }

  if (!prefixes.vol.Equals(new ILVolatility(1))) {
    throw new Error("a volatile prefix is not allowed here");
  }

  if (!prefixes.tl.Equals(new ILTailcall(1))) {
    throw new Error("a tailcall prefix is not allowed here");
  }

  if (!equals(prefixes.constrained, null)) {
    throw new Error("a constrained prefix is not allowed here");
  }

  return mk(prefixes.ro);
}
export class ILInstrDecoder {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILInstrDecoder",
      interfaces: ["FSharpUnion"],
      cases: [["I_u16_u8_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_u16_u16_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_none_instr", _Function([ILInstrPrefixesRegister, ILInstr])], ["I_i64_instr", _Function([ILInstrPrefixesRegister, Long, ILInstr])], ["I_i32_i32_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_i32_i8_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_r4_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_r8_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_field_instr", _Function([ILInstrPrefixesRegister, ILFieldSpec, ILInstr])], ["I_method_instr", _Function([ILInstrPrefixesRegister, Tuple([ILMethodSpec, Option(makeGeneric(List, {
        T: ILType
      }))]), ILInstr])], ["I_unconditional_i32_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_unconditional_i8_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_conditional_i32_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_conditional_i8_instr", _Function([ILInstrPrefixesRegister, "number", ILInstr])], ["I_string_instr", _Function([ILInstrPrefixesRegister, "string", ILInstr])], ["I_switch_instr", _Function([ILInstrPrefixesRegister, makeGeneric(List, {
        T: "number"
      }), ILInstr])], ["I_tok_instr", _Function([ILInstrPrefixesRegister, ILToken, ILInstr])], ["I_sig_instr", _Function([ILInstrPrefixesRegister, Tuple([ILCallingSignature, Option(makeGeneric(List, {
        T: ILType
      }))]), ILInstr])], ["I_type_instr", _Function([ILInstrPrefixesRegister, ILType, ILInstr])], ["I_invalid_instr"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILInstrDecoder", ILInstrDecoder);
export function mkStind(dt) {
  var mk;
  return CurriedLambda((mk = function (tupledArg) {
    return new ILInstr(41, [tupledArg[0], tupledArg[1], dt]);
  }, function (prefixes) {
    return volatileOrUnalignedPrefix(mk, prefixes);
  }));
}
export function mkLdind(dt) {
  var mk;
  return CurriedLambda((mk = function (tupledArg) {
    return new ILInstr(37, [tupledArg[0], tupledArg[1], dt]);
  }, function (prefixes) {
    return volatileOrUnalignedPrefix(mk, prefixes);
  }));
}
export function instrs() {
  var mk;
  var mk_1;
  var mk_2;
  var mk_3;
  var mk_4;
  var mk_5;
  var mk_6;
  var mk_7;
  var mk_8;
  var mk_9;
  var mk_10;
  var mk_11;
  var mk_12;
  var mk_13;
  var mk_14;
  var mk_15;
  var mk_16;
  var mk_17;
  var mk_18;
  var mk_19;
  var mk_20;
  var mk_21;
  var mk_22;
  var mk_23;
  var mk_24;
  var mk_25;
  var mk_26;
  var mk_27;
  var mk_28;
  var mk_29;
  var mk_30;
  var mk_31;
  var mk_32;
  var mk_33;
  var mk_34;
  var mk_35;
  var mk_36;
  var mk_37;
  var mk_38;
  var mk_39;
  var mk_40;
  var mk_41;
  var mk_42;
  var mk_43;
  var mk_44;
  var mk_45;
  var mk_46;
  var mk_47;
  var mk_48;
  var mk_49;
  var mk_50;
  var mk_51;
  var mk_52;
  var mk_53;
  var mk_54;
  var mk_55;
  var mk_56;
  var mk_57;
  var mk_58;
  var mk_59;
  var mk_60;
  var mk_61;
  var mk_62;
  var mk_63;
  var mk_64;
  var mk_65;
  var mk_66;
  var mk_67;
  var mk_68;
  var mk_69;
  return ofArray([[i_ldarg_s, new ILInstrDecoder(0, CurriedLambda(function (prefixes) {
    return noPrefixes(function (arg00_) {
      return mkLdarg(arg00_);
    }, prefixes);
  }))], [i_starg_s, new ILInstrDecoder(0, (mk = function (arg0) {
    return new ILInstr(40, arg0);
  }, CurriedLambda(function (prefixes_1) {
    return noPrefixes(mk, prefixes_1);
  })))], [i_ldarga_s, new ILInstrDecoder(0, (mk_1 = function (arg0_1) {
    return new ILInstr(36, arg0_1);
  }, CurriedLambda(function (prefixes_2) {
    return noPrefixes(mk_1, prefixes_2);
  })))], [i_stloc_s, new ILInstrDecoder(0, CurriedLambda(function (prefixes_3) {
    return noPrefixes(function (arg00__1) {
      return mkStloc(arg00__1);
    }, prefixes_3);
  }))], [i_ldloc_s, new ILInstrDecoder(0, CurriedLambda(function (prefixes_4) {
    return noPrefixes(function (arg00__2) {
      return mkLdloc(arg00__2);
    }, prefixes_4);
  }))], [i_ldloca_s, new ILInstrDecoder(0, (mk_2 = function (arg0_2) {
    return new ILInstr(39, arg0_2);
  }, CurriedLambda(function (prefixes_5) {
    return noPrefixes(mk_2, prefixes_5);
  })))], [i_ldarg, new ILInstrDecoder(1, CurriedLambda(function (prefixes_6) {
    return noPrefixes(function (arg00__3) {
      return mkLdarg(arg00__3);
    }, prefixes_6);
  }))], [i_starg, new ILInstrDecoder(1, (mk_3 = function (arg0_3) {
    return new ILInstr(40, arg0_3);
  }, CurriedLambda(function (prefixes_7) {
    return noPrefixes(mk_3, prefixes_7);
  })))], [i_ldarga, new ILInstrDecoder(1, (mk_4 = function (arg0_4) {
    return new ILInstr(36, arg0_4);
  }, CurriedLambda(function (prefixes_8) {
    return noPrefixes(mk_4, prefixes_8);
  })))], [i_stloc, new ILInstrDecoder(1, CurriedLambda(function (prefixes_9) {
    return noPrefixes(function (arg00__4) {
      return mkStloc(arg00__4);
    }, prefixes_9);
  }))], [i_ldloc, new ILInstrDecoder(1, CurriedLambda(function (prefixes_10) {
    return noPrefixes(function (arg00__5) {
      return mkLdloc(arg00__5);
    }, prefixes_10);
  }))], [i_ldloca, new ILInstrDecoder(1, (mk_5 = function (arg0_5) {
    return new ILInstr(39, arg0_5);
  }, CurriedLambda(function (prefixes_11) {
    return noPrefixes(mk_5, prefixes_11);
  })))], [i_stind_i, new ILInstrDecoder(2, mkStind(new ILBasicType(11)))], [i_stind_i1, new ILInstrDecoder(2, mkStind(new ILBasicType(1)))], [i_stind_i2, new ILInstrDecoder(2, mkStind(new ILBasicType(3)))], [i_stind_i4, new ILInstrDecoder(2, mkStind(new ILBasicType(5)))], [i_stind_i8, new ILInstrDecoder(2, mkStind(new ILBasicType(7)))], [i_stind_r4, new ILInstrDecoder(2, mkStind(new ILBasicType(9)))], [i_stind_r8, new ILInstrDecoder(2, mkStind(new ILBasicType(10)))], [i_stind_ref, new ILInstrDecoder(2, mkStind(new ILBasicType(13)))], [i_ldind_i, new ILInstrDecoder(2, mkLdind(new ILBasicType(11)))], [i_ldind_i1, new ILInstrDecoder(2, mkLdind(new ILBasicType(1)))], [i_ldind_i2, new ILInstrDecoder(2, mkLdind(new ILBasicType(3)))], [i_ldind_i4, new ILInstrDecoder(2, mkLdind(new ILBasicType(5)))], [i_ldind_i8, new ILInstrDecoder(2, mkLdind(new ILBasicType(7)))], [i_ldind_u1, new ILInstrDecoder(2, mkLdind(new ILBasicType(2)))], [i_ldind_u2, new ILInstrDecoder(2, mkLdind(new ILBasicType(4)))], [i_ldind_u4, new ILInstrDecoder(2, mkLdind(new ILBasicType(6)))], [i_ldind_r4, new ILInstrDecoder(2, mkLdind(new ILBasicType(9)))], [i_ldind_r8, new ILInstrDecoder(2, mkLdind(new ILBasicType(10)))], [i_ldind_ref, new ILInstrDecoder(2, mkLdind(new ILBasicType(13)))], [i_cpblk, new ILInstrDecoder(2, (mk_6 = function (tupledArg) {
    return new ILInstr(92, [tupledArg[0], tupledArg[1]]);
  }, function (prefixes_12) {
    return volatileOrUnalignedPrefix(mk_6, prefixes_12);
  }))], [i_initblk, new ILInstrDecoder(2, (mk_7 = function (tupledArg_1) {
    return new ILInstr(93, [tupledArg_1[0], tupledArg_1[1]]);
  }, function (prefixes_13) {
    return volatileOrUnalignedPrefix(mk_7, prefixes_13);
  }))], [i_ldc_i8, new ILInstrDecoder(3, (mk_8 = function (x) {
    return new ILInstr(34, [new ILBasicType(7), new ILConst(1, x)]);
  }, CurriedLambda(function (prefixes_14) {
    return noPrefixes(mk_8, prefixes_14);
  })))], [i_ldc_i4, new ILInstrDecoder(4, CurriedLambda(function (prefixes_15) {
    return noPrefixes(function (arg00__6) {
      return mkLdcInt32(arg00__6);
    }, prefixes_15);
  }))], [i_ldc_i4_s, new ILInstrDecoder(5, CurriedLambda(function (prefixes_16) {
    return noPrefixes(function (arg00__7) {
      return mkLdcInt32(arg00__7);
    }, prefixes_16);
  }))], [i_ldc_r4, new ILInstrDecoder(6, (mk_9 = function (x_1) {
    return new ILInstr(34, [new ILBasicType(9), new ILConst(2, x_1)]);
  }, CurriedLambda(function (prefixes_17) {
    return noPrefixes(mk_9, prefixes_17);
  })))], [i_ldc_r8, new ILInstrDecoder(7, (mk_10 = function (x_2) {
    return new ILInstr(34, [new ILBasicType(10), new ILConst(3, x_2)]);
  }, CurriedLambda(function (prefixes_18) {
    return noPrefixes(mk_10, prefixes_18);
  })))], [i_ldfld, new ILInstrDecoder(8, (mk_11 = function (tupledArg_2, fspec) {
    return new ILInstr(60, [tupledArg_2[0], tupledArg_2[1], fspec]);
  }, CurriedLambda(function (prefixes_19) {
    return volatileOrUnalignedPrefix($var1 => $var2 => mk_11($var1, $var2), prefixes_19);
  })))], [i_stfld, new ILInstrDecoder(8, (mk_12 = function (tupledArg_3, fspec_1) {
    return new ILInstr(64, [tupledArg_3[0], tupledArg_3[1], fspec_1]);
  }, CurriedLambda(function (prefixes_20) {
    return volatileOrUnalignedPrefix($var3 => $var4 => mk_12($var3, $var4), prefixes_20);
  })))], [i_ldsfld, new ILInstrDecoder(8, (mk_13 = function (x_3, fspec_2) {
    return new ILInstr(59, [x_3, fspec_2]);
  }, CurriedLambda(function (prefixes_21) {
    return volatilePrefix($var5 => $var6 => mk_13($var5, $var6), prefixes_21);
  })))], [i_stsfld, new ILInstrDecoder(8, (mk_14 = function (x_4, fspec_3) {
    return new ILInstr(63, [x_4, fspec_3]);
  }, CurriedLambda(function (prefixes_22) {
    return volatilePrefix($var7 => $var8 => mk_14($var7, $var8), prefixes_22);
  })))], [i_ldflda, new ILInstrDecoder(8, (mk_15 = function (arg0_6) {
    return new ILInstr(62, arg0_6);
  }, CurriedLambda(function (prefixes_23) {
    return noPrefixes(mk_15, prefixes_23);
  })))], [i_ldsflda, new ILInstrDecoder(8, (mk_16 = function (arg0_7) {
    return new ILInstr(61, arg0_7);
  }, CurriedLambda(function (prefixes_24) {
    return noPrefixes(mk_16, prefixes_24);
  })))], [i_call, new ILInstrDecoder(9, (mk_17 = function (tl, tupledArg_4) {
    return new ILInstr(48, [tl, tupledArg_4[0], tupledArg_4[1]]);
  }, CurriedLambda(function (prefixes_25) {
    return tailPrefix($var9 => $var10 => mk_17($var9, $var10), prefixes_25);
  })))], [i_ldftn, new ILInstrDecoder(9, (mk_18 = function (tupledArg_5) {
    return new ILInstr(52, tupledArg_5[0]);
  }, CurriedLambda(function (prefixes_26) {
    return noPrefixes(mk_18, prefixes_26);
  })))], [i_ldvirtftn, new ILInstrDecoder(9, (mk_19 = function (tupledArg_6) {
    return new ILInstr(69, tupledArg_6[0]);
  }, CurriedLambda(function (prefixes_27) {
    return noPrefixes(mk_19, prefixes_27);
  })))], [i_newobj, new ILInstrDecoder(9, (mk_20 = function (tupledArg_7) {
    return new ILInstr(53, [tupledArg_7[0], tupledArg_7[1]]);
  }, CurriedLambda(function (prefixes_28) {
    return noPrefixes(mk_20, prefixes_28);
  })))], [i_callvirt, new ILInstrDecoder(9, (mk_21 = function (tupledArg_8, tupledArg_9) {
    return tupledArg_8[0] == null ? new ILInstr(49, [tupledArg_8[1], tupledArg_9[0], tupledArg_9[1]]) : new ILInstr(50, [tupledArg_8[1], getValue(tupledArg_8[0]), tupledArg_9[0], tupledArg_9[1]]);
  }, CurriedLambda(function (prefixes_29) {
    return constraintOrTailPrefix($var11 => $var12 => mk_21($var11, $var12), prefixes_29);
  })))], [i_leave_s, new ILInstrDecoder(11, (mk_22 = function (x_5) {
    return new ILInstr(57, x_5);
  }, CurriedLambda(function (prefixes_30) {
    return noPrefixes(mk_22, prefixes_30);
  })))], [i_br_s, new ILInstrDecoder(11, (mk_23 = function (arg0_8) {
    return new ILInstr(43, arg0_8);
  }, CurriedLambda(function (prefixes_31) {
    return noPrefixes(mk_23, prefixes_31);
  })))], [i_leave, new ILInstrDecoder(10, (mk_24 = function (x_6) {
    return new ILInstr(57, x_6);
  }, CurriedLambda(function (prefixes_32) {
    return noPrefixes(mk_24, prefixes_32);
  })))], [i_br, new ILInstrDecoder(10, (mk_25 = function (arg0_9) {
    return new ILInstr(43, arg0_9);
  }, CurriedLambda(function (prefixes_33) {
    return noPrefixes(mk_25, prefixes_33);
  })))], [i_brtrue_s, new ILInstrDecoder(13, (mk_26 = function (x_7) {
    return new ILInstr(45, [new ILComparisonInstr(11), x_7]);
  }, CurriedLambda(function (prefixes_34) {
    return noPrefixes(mk_26, prefixes_34);
  })))], [i_brfalse_s, new ILInstrDecoder(13, (mk_27 = function (x_8) {
    return new ILInstr(45, [new ILComparisonInstr(10), x_8]);
  }, CurriedLambda(function (prefixes_35) {
    return noPrefixes(mk_27, prefixes_35);
  })))], [i_beq_s, new ILInstrDecoder(13, (mk_28 = function (x_9) {
    return new ILInstr(45, [new ILComparisonInstr(0), x_9]);
  }, CurriedLambda(function (prefixes_36) {
    return noPrefixes(mk_28, prefixes_36);
  })))], [i_blt_s, new ILInstrDecoder(13, (mk_29 = function (x_10) {
    return new ILInstr(45, [new ILComparisonInstr(7), x_10]);
  }, CurriedLambda(function (prefixes_37) {
    return noPrefixes(mk_29, prefixes_37);
  })))], [i_blt_un_s, new ILInstrDecoder(13, (mk_30 = function (x_11) {
    return new ILInstr(45, [new ILComparisonInstr(8), x_11]);
  }, CurriedLambda(function (prefixes_38) {
    return noPrefixes(mk_30, prefixes_38);
  })))], [i_ble_s, new ILInstrDecoder(13, (mk_31 = function (x_12) {
    return new ILInstr(45, [new ILComparisonInstr(5), x_12]);
  }, CurriedLambda(function (prefixes_39) {
    return noPrefixes(mk_31, prefixes_39);
  })))], [i_ble_un_s, new ILInstrDecoder(13, (mk_32 = function (x_13) {
    return new ILInstr(45, [new ILComparisonInstr(6), x_13]);
  }, CurriedLambda(function (prefixes_40) {
    return noPrefixes(mk_32, prefixes_40);
  })))], [i_bgt_s, new ILInstrDecoder(13, (mk_33 = function (x_14) {
    return new ILInstr(45, [new ILComparisonInstr(3), x_14]);
  }, CurriedLambda(function (prefixes_41) {
    return noPrefixes(mk_33, prefixes_41);
  })))], [i_bgt_un_s, new ILInstrDecoder(13, (mk_34 = function (x_15) {
    return new ILInstr(45, [new ILComparisonInstr(4), x_15]);
  }, CurriedLambda(function (prefixes_42) {
    return noPrefixes(mk_34, prefixes_42);
  })))], [i_bge_s, new ILInstrDecoder(13, (mk_35 = function (x_16) {
    return new ILInstr(45, [new ILComparisonInstr(1), x_16]);
  }, CurriedLambda(function (prefixes_43) {
    return noPrefixes(mk_35, prefixes_43);
  })))], [i_bge_un_s, new ILInstrDecoder(13, (mk_36 = function (x_17) {
    return new ILInstr(45, [new ILComparisonInstr(2), x_17]);
  }, CurriedLambda(function (prefixes_44) {
    return noPrefixes(mk_36, prefixes_44);
  })))], [i_bne_un_s, new ILInstrDecoder(13, (mk_37 = function (x_18) {
    return new ILInstr(45, [new ILComparisonInstr(9), x_18]);
  }, CurriedLambda(function (prefixes_45) {
    return noPrefixes(mk_37, prefixes_45);
  })))], [i_brtrue, new ILInstrDecoder(12, (mk_38 = function (x_19) {
    return new ILInstr(45, [new ILComparisonInstr(11), x_19]);
  }, CurriedLambda(function (prefixes_46) {
    return noPrefixes(mk_38, prefixes_46);
  })))], [i_brfalse, new ILInstrDecoder(12, (mk_39 = function (x_20) {
    return new ILInstr(45, [new ILComparisonInstr(10), x_20]);
  }, CurriedLambda(function (prefixes_47) {
    return noPrefixes(mk_39, prefixes_47);
  })))], [i_beq, new ILInstrDecoder(12, (mk_40 = function (x_21) {
    return new ILInstr(45, [new ILComparisonInstr(0), x_21]);
  }, CurriedLambda(function (prefixes_48) {
    return noPrefixes(mk_40, prefixes_48);
  })))], [i_blt, new ILInstrDecoder(12, (mk_41 = function (x_22) {
    return new ILInstr(45, [new ILComparisonInstr(7), x_22]);
  }, CurriedLambda(function (prefixes_49) {
    return noPrefixes(mk_41, prefixes_49);
  })))], [i_blt_un, new ILInstrDecoder(12, (mk_42 = function (x_23) {
    return new ILInstr(45, [new ILComparisonInstr(8), x_23]);
  }, CurriedLambda(function (prefixes_50) {
    return noPrefixes(mk_42, prefixes_50);
  })))], [i_ble, new ILInstrDecoder(12, (mk_43 = function (x_24) {
    return new ILInstr(45, [new ILComparisonInstr(5), x_24]);
  }, CurriedLambda(function (prefixes_51) {
    return noPrefixes(mk_43, prefixes_51);
  })))], [i_ble_un, new ILInstrDecoder(12, (mk_44 = function (x_25) {
    return new ILInstr(45, [new ILComparisonInstr(6), x_25]);
  }, CurriedLambda(function (prefixes_52) {
    return noPrefixes(mk_44, prefixes_52);
  })))], [i_bgt, new ILInstrDecoder(12, (mk_45 = function (x_26) {
    return new ILInstr(45, [new ILComparisonInstr(3), x_26]);
  }, CurriedLambda(function (prefixes_53) {
    return noPrefixes(mk_45, prefixes_53);
  })))], [i_bgt_un, new ILInstrDecoder(12, (mk_46 = function (x_27) {
    return new ILInstr(45, [new ILComparisonInstr(4), x_27]);
  }, CurriedLambda(function (prefixes_54) {
    return noPrefixes(mk_46, prefixes_54);
  })))], [i_bge, new ILInstrDecoder(12, (mk_47 = function (x_28) {
    return new ILInstr(45, [new ILComparisonInstr(1), x_28]);
  }, CurriedLambda(function (prefixes_55) {
    return noPrefixes(mk_47, prefixes_55);
  })))], [i_bge_un, new ILInstrDecoder(12, (mk_48 = function (x_29) {
    return new ILInstr(45, [new ILComparisonInstr(2), x_29]);
  }, CurriedLambda(function (prefixes_56) {
    return noPrefixes(mk_48, prefixes_56);
  })))], [i_bne_un, new ILInstrDecoder(12, (mk_49 = function (x_30) {
    return new ILInstr(45, [new ILComparisonInstr(9), x_30]);
  }, CurriedLambda(function (prefixes_57) {
    return noPrefixes(mk_49, prefixes_57);
  })))], [i_ldstr, new ILInstrDecoder(14, (mk_50 = function (arg0_10) {
    return new ILInstr(65, arg0_10);
  }, CurriedLambda(function (prefixes_58) {
    return noPrefixes(mk_50, prefixes_58);
  })))], [i_switch, new ILInstrDecoder(15, (mk_51 = function (arg0_11) {
    return new ILInstr(46, arg0_11);
  }, CurriedLambda(function (prefixes_59) {
    return noPrefixes(mk_51, prefixes_59);
  })))], [i_ldtoken, new ILInstrDecoder(16, (mk_52 = function (arg0_12) {
    return new ILInstr(68, arg0_12);
  }, CurriedLambda(function (prefixes_60) {
    return noPrefixes(mk_52, prefixes_60);
  })))], [i_calli, new ILInstrDecoder(17, (mk_53 = function (tl_1, tupledArg_10) {
    return new ILInstr(51, [tl_1, tupledArg_10[0], tupledArg_10[1]]);
  }, CurriedLambda(function (prefixes_61) {
    return tailPrefix($var13 => $var14 => mk_53($var13, $var14), prefixes_61);
  })))], [i_mkrefany, new ILInstrDecoder(18, (mk_54 = function (arg0_13) {
    return new ILInstr(85, arg0_13);
  }, CurriedLambda(function (prefixes_62) {
    return noPrefixes(mk_54, prefixes_62);
  })))], [i_refanyval, new ILInstrDecoder(18, (mk_55 = function (arg0_14) {
    return new ILInstr(87, arg0_14);
  }, CurriedLambda(function (prefixes_63) {
    return noPrefixes(mk_55, prefixes_63);
  })))], [i_ldelema, new ILInstrDecoder(18, (mk_56 = function (ro, x_31) {
    return new ILInstr(80, [ro, false, ILArrayShape.SingleDimensional, x_31]);
  }, CurriedLambda(function (prefixes_64) {
    return readonlyPrefix($var15 => $var16 => mk_56($var15, $var16), prefixes_64);
  })))], [i_ldelem_any, new ILInstrDecoder(18, (mk_57 = function (x_32) {
    return new ILInstr(81, [ILArrayShape.SingleDimensional, x_32]);
  }, CurriedLambda(function (prefixes_65) {
    return noPrefixes(mk_57, prefixes_65);
  })))], [i_stelem_any, new ILInstrDecoder(18, (mk_58 = function (x_33) {
    return new ILInstr(82, [ILArrayShape.SingleDimensional, x_33]);
  }, CurriedLambda(function (prefixes_66) {
    return noPrefixes(mk_58, prefixes_66);
  })))], [i_newarr, new ILInstrDecoder(18, (mk_59 = function (x_34) {
    return new ILInstr(83, [ILArrayShape.SingleDimensional, x_34]);
  }, CurriedLambda(function (prefixes_67) {
    return noPrefixes(mk_59, prefixes_67);
  })))], [i_castclass, new ILInstrDecoder(18, (mk_60 = function (arg0_15) {
    return new ILInstr(67, arg0_15);
  }, CurriedLambda(function (prefixes_68) {
    return noPrefixes(mk_60, prefixes_68);
  })))], [i_isinst, new ILInstrDecoder(18, (mk_61 = function (arg0_16) {
    return new ILInstr(66, arg0_16);
  }, CurriedLambda(function (prefixes_69) {
    return noPrefixes(mk_61, prefixes_69);
  })))], [i_unbox_any, new ILInstrDecoder(18, (mk_62 = function (arg0_17) {
    return new ILInstr(76, arg0_17);
  }, CurriedLambda(function (prefixes_70) {
    return noPrefixes(mk_62, prefixes_70);
  })))], [i_cpobj, new ILInstrDecoder(18, (mk_63 = function (arg0_18) {
    return new ILInstr(70, arg0_18);
  }, CurriedLambda(function (prefixes_71) {
    return noPrefixes(mk_63, prefixes_71);
  })))], [i_initobj, new ILInstrDecoder(18, (mk_64 = function (arg0_19) {
    return new ILInstr(71, arg0_19);
  }, CurriedLambda(function (prefixes_72) {
    return noPrefixes(mk_64, prefixes_72);
  })))], [i_ldobj, new ILInstrDecoder(18, (mk_65 = function (tupledArg_11, z) {
    return new ILInstr(72, [tupledArg_11[0], tupledArg_11[1], z]);
  }, CurriedLambda(function (prefixes_73) {
    return volatileOrUnalignedPrefix($var17 => $var18 => mk_65($var17, $var18), prefixes_73);
  })))], [i_stobj, new ILInstrDecoder(18, (mk_66 = function (tupledArg_12, z_1) {
    return new ILInstr(73, [tupledArg_12[0], tupledArg_12[1], z_1]);
  }, CurriedLambda(function (prefixes_74) {
    return volatileOrUnalignedPrefix($var19 => $var20 => mk_66($var19, $var20), prefixes_74);
  })))], [i_sizeof, new ILInstrDecoder(18, (mk_67 = function (arg0_20) {
    return new ILInstr(77, arg0_20);
  }, CurriedLambda(function (prefixes_75) {
    return noPrefixes(mk_67, prefixes_75);
  })))], [i_box, new ILInstrDecoder(18, (mk_68 = function (arg0_21) {
    return new ILInstr(74, arg0_21);
  }, CurriedLambda(function (prefixes_76) {
    return noPrefixes(mk_68, prefixes_76);
  })))], [i_unbox, new ILInstrDecoder(18, (mk_69 = function (arg0_22) {
    return new ILInstr(75, arg0_22);
  }, CurriedLambda(function (prefixes_77) {
    return noPrefixes(mk_69, prefixes_77);
  })))]]);
}
export const oneByteInstrs = {
  contents: null
};
export const twoByteInstrs = {
  contents: null
};
export function fillInstrs() {
  const oneByteInstrTable = Array.from(replicate(256, new ILInstrDecoder(19)));
  const twoByteInstrTable = Array.from(replicate(256, new ILInstrDecoder(19)));

  const addInstr = function (tupledArg) {
    if (tupledArg[0] > 255) {
      const i = tupledArg[0] & 255 | 0;
      const matchValue = twoByteInstrTable[i];

      if (matchValue.tag === 19) {} else {
        dprintn("warning: duplicate decode entries for " + i.toString());
      }

      twoByteInstrTable[i] = tupledArg[1];
    } else {
      const matchValue_1 = oneByteInstrTable[tupledArg[0]];

      if (matchValue_1.tag === 19) {} else {
        dprintn("warning: duplicate decode entries for " + tupledArg[0].toString());
      }

      oneByteInstrTable[tupledArg[0]] = tupledArg[1];
    }
  };

  iterate(addInstr, instrs());
  iterate(function (tupledArg_1) {
    addInstr([tupledArg_1[0], new ILInstrDecoder(2, function (prefixes) {
      return noPrefixes(tupledArg_1[1], prefixes);
    })]);
  }, noArgInstrs.value);
  oneByteInstrs.contents = oneByteInstrTable;
  twoByteInstrs.contents = twoByteInstrTable;
}
export function getOneByteInstr(i) {
  getOneByteInstr: while (true) {
    const matchValue = oneByteInstrs.contents;

    if (matchValue != null) {
      return getValue(matchValue)[i];
    } else {
      fillInstrs();
      i = i;
      continue getOneByteInstr;
    }
  }
}
export function getTwoByteInstr(i) {
  getTwoByteInstr: while (true) {
    const matchValue = twoByteInstrs.contents;

    if (matchValue != null) {
      return getValue(matchValue)[i];
    } else {
      fillInstrs();
      i = i;
      continue getTwoByteInstr;
    }
  }
}
export class ImageChunk {
  constructor(size, addr) {
    this.size = size | 0;
    this.addr = addr | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ImageChunk",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        size: "number",
        addr: "number"
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
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ImageChunk", ImageChunk);
export function chunk(sz, next) {
  return [new ImageChunk(sz, next), next + sz];
}
export function nochunk(next) {
  return [new ImageChunk(0, 0), next];
}
export class RowElementKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.RowElementKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["UShort"], ["ULong"], ["Byte"], ["Data"], ["GGuid"], ["Blob"], ["SString"], ["SimpleIndex", TableName], ["TypeDefOrRefOrSpec"], ["TypeOrMethodDef"], ["HasConstant"], ["HasCustomAttribute"], ["HasFieldMarshal"], ["HasDeclSecurity"], ["MemberRefParent"], ["HasSemantics"], ["MethodDefOrRef"], ["MemberForwarded"], ["Implementation"], ["CustomAttributeType"], ["ResolutionScope"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.RowElementKind", RowElementKind);
export class RowKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.RowKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["RowKind", makeGeneric(List, {
        T: RowElementKind
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.RowKind", RowKind);
export const kindAssemblyRef = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(0), new RowElementKind(0), new RowElementKind(0), new RowElementKind(1), new RowElementKind(5), new RowElementKind(6), new RowElementKind(6), new RowElementKind(5)]));
export const kindModuleRef = new RowKind(0, ofArray([new RowElementKind(6)]));
export const kindFileRef = new RowKind(0, ofArray([new RowElementKind(1), new RowElementKind(6), new RowElementKind(5)]));
export const kindTypeRef = new RowKind(0, ofArray([new RowElementKind(20), new RowElementKind(6), new RowElementKind(6)]));
export const kindTypeSpec = new RowKind(0, ofArray([new RowElementKind(5)]));
export const kindTypeDef = new RowKind(0, ofArray([new RowElementKind(1), new RowElementKind(6), new RowElementKind(6), new RowElementKind(8), new RowElementKind(7, TableNames.Field), new RowElementKind(7, TableNames.Method)]));
export const kindPropertyMap = new RowKind(0, ofArray([new RowElementKind(7, TableNames.TypeDef), new RowElementKind(7, TableNames.Property)]));
export const kindEventMap = new RowKind(0, ofArray([new RowElementKind(7, TableNames.TypeDef), new RowElementKind(7, TableNames.Event)]));
export const kindInterfaceImpl = new RowKind(0, ofArray([new RowElementKind(7, TableNames.TypeDef), new RowElementKind(8)]));
export const kindNested = new RowKind(0, ofArray([new RowElementKind(7, TableNames.TypeDef), new RowElementKind(7, TableNames.TypeDef)]));
export const kindCustomAttribute = new RowKind(0, ofArray([new RowElementKind(11), new RowElementKind(19), new RowElementKind(5)]));
export const kindDeclSecurity = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(13), new RowElementKind(5)]));
export const kindMemberRef = new RowKind(0, ofArray([new RowElementKind(14), new RowElementKind(6), new RowElementKind(5)]));
export const kindStandAloneSig = new RowKind(0, ofArray([new RowElementKind(5)]));
export const kindFieldDef = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(6), new RowElementKind(5)]));
export const kindFieldRVA = new RowKind(0, ofArray([new RowElementKind(3), new RowElementKind(7, TableNames.Field)]));
export const kindFieldMarshal = new RowKind(0, ofArray([new RowElementKind(12), new RowElementKind(5)]));
export const kindConstant = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(10), new RowElementKind(5)]));
export const kindFieldLayout = new RowKind(0, ofArray([new RowElementKind(1), new RowElementKind(7, TableNames.Field)]));
export const kindParam = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(0), new RowElementKind(6)]));
export const kindMethodDef = new RowKind(0, ofArray([new RowElementKind(1), new RowElementKind(0), new RowElementKind(0), new RowElementKind(6), new RowElementKind(5), new RowElementKind(7, TableNames.Param)]));
export const kindMethodImpl = new RowKind(0, ofArray([new RowElementKind(7, TableNames.TypeDef), new RowElementKind(16), new RowElementKind(16)]));
export const kindImplMap = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(17), new RowElementKind(6), new RowElementKind(7, TableNames.ModuleRef)]));
export const kindMethodSemantics = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(7, TableNames.Method), new RowElementKind(15)]));
export const kindProperty = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(6), new RowElementKind(5)]));
export const kindEvent = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(6), new RowElementKind(8)]));
export const kindManifestResource = new RowKind(0, ofArray([new RowElementKind(1), new RowElementKind(1), new RowElementKind(6), new RowElementKind(18)]));
export const kindClassLayout = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(1), new RowElementKind(7, TableNames.TypeDef)]));
export const kindExportedType = new RowKind(0, ofArray([new RowElementKind(1), new RowElementKind(1), new RowElementKind(6), new RowElementKind(6), new RowElementKind(18)]));
export const kindAssembly = new RowKind(0, ofArray([new RowElementKind(1), new RowElementKind(0), new RowElementKind(0), new RowElementKind(0), new RowElementKind(0), new RowElementKind(1), new RowElementKind(5), new RowElementKind(6), new RowElementKind(6)]));
export const kindGenericParam_v1_1 = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(0), new RowElementKind(9), new RowElementKind(6), new RowElementKind(8)]));
export const kindGenericParam_v2_0 = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(0), new RowElementKind(9), new RowElementKind(6)]));
export const kindMethodSpec = new RowKind(0, ofArray([new RowElementKind(16), new RowElementKind(5)]));
export const kindGenericParamConstraint = new RowKind(0, ofArray([new RowElementKind(7, TableNames.GenericParam), new RowElementKind(8)]));
export const kindModule = new RowKind(0, ofArray([new RowElementKind(0), new RowElementKind(6), new RowElementKind(4), new RowElementKind(4), new RowElementKind(4)]));
export const kindIllegal = new RowKind(0, new List());
export function hcCompare(_arg2, _arg1) {
  const activePatternResult13242 = _TaggedIndex_(_arg2);

  const activePatternResult13241 = _TaggedIndex_(_arg1);

  if (activePatternResult13242[1] < activePatternResult13241[1]) {
    return -1 | 0;
  } else if (activePatternResult13242[1] > activePatternResult13241[1]) {
    return 1;
  } else {
    return comparePrimitives(activePatternResult13242[0].Tag, activePatternResult13241[0].Tag) | 0;
  }
}
export function hsCompare(_arg2, _arg1) {
  const activePatternResult13246 = _TaggedIndex_(_arg2);

  const activePatternResult13245 = _TaggedIndex_(_arg1);

  if (activePatternResult13246[1] < activePatternResult13245[1]) {
    return -1 | 0;
  } else if (activePatternResult13246[1] > activePatternResult13245[1]) {
    return 1;
  } else {
    return comparePrimitives(activePatternResult13246[0].Tag, activePatternResult13245[0].Tag) | 0;
  }
}
export function hcaCompare(_arg2, _arg1) {
  const activePatternResult13250 = _TaggedIndex_(_arg2);

  const activePatternResult13249 = _TaggedIndex_(_arg1);

  if (activePatternResult13250[1] < activePatternResult13249[1]) {
    return -1 | 0;
  } else if (activePatternResult13250[1] > activePatternResult13249[1]) {
    return 1;
  } else {
    return comparePrimitives(activePatternResult13250[0].Tag, activePatternResult13249[0].Tag) | 0;
  }
}
export function mfCompare(_arg2, _arg1) {
  const activePatternResult13254 = _TaggedIndex_(_arg2);

  const activePatternResult13253 = _TaggedIndex_(_arg1);

  if (activePatternResult13254[1] < activePatternResult13253[1]) {
    return -1 | 0;
  } else if (activePatternResult13254[1] > activePatternResult13253[1]) {
    return 1;
  } else {
    return comparePrimitives(activePatternResult13254[0].Tag, activePatternResult13253[0].Tag) | 0;
  }
}
export function hdsCompare(_arg2, _arg1) {
  const activePatternResult13258 = _TaggedIndex_(_arg2);

  const activePatternResult13257 = _TaggedIndex_(_arg1);

  if (activePatternResult13258[1] < activePatternResult13257[1]) {
    return -1 | 0;
  } else if (activePatternResult13258[1] > activePatternResult13257[1]) {
    return 1;
  } else {
    return comparePrimitives(activePatternResult13258[0].Tag, activePatternResult13257[0].Tag) | 0;
  }
}
export function hfmCompare(_arg2, _arg1) {
  const activePatternResult13262 = _TaggedIndex_(_arg2);

  const activePatternResult13261 = _TaggedIndex_(_arg1);

  if (activePatternResult13262[1] < activePatternResult13261[1]) {
    return -1 | 0;
  } else if (activePatternResult13262[1] > activePatternResult13261[1]) {
    return 1;
  } else {
    return comparePrimitives(activePatternResult13262[0].Tag, activePatternResult13261[0].Tag) | 0;
  }
}
export function tomdCompare(_arg2, _arg1) {
  const activePatternResult13266 = _TaggedIndex_(_arg2);

  const activePatternResult13265 = _TaggedIndex_(_arg1);

  if (activePatternResult13266[1] < activePatternResult13265[1]) {
    return -1 | 0;
  } else if (activePatternResult13266[1] > activePatternResult13265[1]) {
    return 1;
  } else {
    return comparePrimitives(activePatternResult13266[0].Tag, activePatternResult13265[0].Tag) | 0;
  }
}
export function simpleIndexCompare(idx1, idx2) {
  return comparePrimitives(idx1, idx2) | 0;
}
export class TypeDefAsTypIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.TypeDefAsTypIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["TypeDefAsTypIdx", ILBoxity, makeGeneric(List, {
        T: ILType
      }), "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.TypeDefAsTypIdx", TypeDefAsTypIdx);
export class TypeRefAsTypIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.TypeRefAsTypIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["TypeRefAsTypIdx", ILBoxity, makeGeneric(List, {
        T: ILType
      }), "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.TypeRefAsTypIdx", TypeRefAsTypIdx);
export class BlobAsMethodSigIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BlobAsMethodSigIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["BlobAsMethodSigIdx", "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BlobAsMethodSigIdx", BlobAsMethodSigIdx);
export class BlobAsFieldSigIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BlobAsFieldSigIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["BlobAsFieldSigIdx", "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BlobAsFieldSigIdx", BlobAsFieldSigIdx);
export class BlobAsPropSigIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BlobAsPropSigIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["BlobAsPropSigIdx", "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BlobAsPropSigIdx", BlobAsPropSigIdx);
export class BlobAsLocalSigIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BlobAsLocalSigIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["BlobAsLocalSigIdx", "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BlobAsLocalSigIdx", BlobAsLocalSigIdx);
export class MemberRefAsMspecIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MemberRefAsMspecIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["MemberRefAsMspecIdx", "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MemberRefAsMspecIdx", MemberRefAsMspecIdx);
export class MethodSpecAsMspecIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MethodSpecAsMspecIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["MethodSpecAsMspecIdx", "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MethodSpecAsMspecIdx", MethodSpecAsMspecIdx);
export class MemberRefAsFspecIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MemberRefAsFspecIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["MemberRefAsFspecIdx", "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MemberRefAsFspecIdx", MemberRefAsFspecIdx);
export class CustomAttrIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.CustomAttrIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CustomAttrIdx", CustomAttributeTypeTag, "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.CustomAttrIdx", CustomAttrIdx);
export class GenericParamsIdx {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.GenericParamsIdx",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["GenericParamsIdx", "number", TypeOrMethodDefTag, "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.GenericParamsIdx", GenericParamsIdx);
export function mkCacheInt32(lowMem, _inbase, _nm, _sz) {
  var cache;
  var count;
  return CurriedLambda(lowMem ? function (f, x) {
    return f(x);
  } : (cache = {
    contents: null
  }, count = {
    contents: 0
  }, function (f_1, idx) {
    let cache_1;
    const matchValue = cache.contents;

    if (matchValue == null) {
      cache.contents = new Map();
    }

    cache_1 = cache.contents;
    const patternInput = tryGetValue(cache_1, idx, null);

    if (patternInput[0]) {
      void count.contents++;
      return patternInput[1];
    } else {
      const res = f_1(idx);
      cache_1.set(idx, res);
      return res;
    }
  }));
}
export function mkCacheGeneric(lowMem, _inbase, _nm, _sz) {
  var cache;
  var count;
  return CurriedLambda(lowMem ? function (f, x) {
    return f(x);
  } : (cache = {
    contents: null
  }, count = {
    contents: 0
  }, function (f_1, idx) {
    let cache_1;
    const matchValue = cache.contents;

    if (matchValue == null) {
      cache.contents = new Map();
    }

    cache_1 = cache.contents;

    if (cache_1.has(idx)) {
      void count.contents++;
      return cache_1.get(idx);
    } else {
      const res = f_1(idx);
      cache_1.set(idx, res);
      return res;
    }
  }));
}
export function seekFindRow(numRows, rowChooser) {
  let i = 1;

  while (i <= numRows ? !rowChooser(i) : false) {
    i = i + 1 | 0;
  }

  if (i > numRows) {
    dprintn("warning: seekFindRow: row not found");
  }

  return i | 0;
}
export function seekReadIndexedRows(numRows, rowReader, keyFunc, keyComparer, binaryChop, rowConverter) {
  if (binaryChop) {
    let low = 0;
    let high = numRows + 1 | 0;
    let fin = false;

    while (!fin) {
      if (high - low <= 1) {
        fin = true;
      } else {
        const mid = ~~((low + high) / 2) | 0;
        const midrow = rowReader(mid);
        const c = keyComparer(keyFunc(midrow)) | 0;

        if (c > 0) {
          low = mid | 0;
        } else if (c < 0) {
          high = mid | 0;
        } else {
          fin = true;
        }
      }
    }

    let res = new List();

    if (high - low > 1) {
      const mid_1 = ~~((low + high) / 2) | 0;
      let fin_1 = false;
      let curr = mid_1 | 0;

      while (!fin_1) {
        if (curr > numRows) {
          fin_1 = true;
        } else {
          const currrow = rowReader(curr);

          if (keyComparer(keyFunc(currrow)) === 0) {
            res = new List(rowConverter(currrow), res);
          } else {
            fin_1 = true;
          }

          curr = curr + 1 | 0;
        }
      }

      res = reverse(res);
      let fin_2 = false;
      let curr_1 = mid_1 - 1 | 0;

      while (!fin_2) {
        if (curr_1 === 0) {
          fin_2 = true;
        } else {
          const currrow_1 = rowReader(curr_1);

          if (keyComparer(keyFunc(currrow_1)) === 0) {
            res = new List(rowConverter(currrow_1), res);
          } else {
            fin_2 = true;
          }

          curr_1 = curr_1 - 1 | 0;
        }
      }
    }

    return res;
  } else {
    const res_1 = {
      contents: new List()
    };

    for (let i = 1; i <= numRows; i++) {
      const rowinfo = rowReader(i);

      if (keyComparer(keyFunc(rowinfo)) === 0) {
        res_1.contents = new List(rowConverter(rowinfo), res_1.contents);
      }
    }

    return reverse(res_1.contents);
  }
}
export function seekReadOptionalIndexedRow(info_0, info_1, info_2, info_3, info_4, info_5) {
  const info = [info_0, info_1, info_2, info_3, info_4, info_5];
  const matchValue = seekReadIndexedRows(info[0], info[1], info[2], info[3], info[4], info[5]);

  if (matchValue.tail == null) {
    return null;
  } else if (matchValue.tail.tail == null) {
    return makeSome(matchValue.head);
  } else {
    dprintn("multiple rows found when indexing table");
    return makeSome(matchValue.head);
  }
}
export function seekReadIndexedRow(info_0, info_1, info_2, info_3, info_4, info_5) {
  const info = [info_0, info_1, info_2, info_3, info_4, info_5];
  const matchValue = seekReadOptionalIndexedRow(info[0], info[1], info[2], info[3], info[4], info[5]);

  if (matchValue == null) {
    throw new Error("no row found for key when indexing table");
  } else {
    return getValue(matchValue);
  }
}
export class MethodData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MethodData",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["MethodData", ILType, ILCallingConv, "string", makeGeneric(List, {
        T: ILType
      }), ILType, makeGeneric(List, {
        T: ILType
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MethodData", MethodData);
export class VarArgMethodData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.VarArgMethodData",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["VarArgMethodData", ILType, ILCallingConv, "string", makeGeneric(List, {
        T: ILType
      }), Option(makeGeneric(List, {
        T: ILType
      })), ILType, makeGeneric(List, {
        T: ILType
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.VarArgMethodData", VarArgMethodData);
export class PEReader {
  constructor(fileName, pdb, entryPointToken, pefile, textSegmentPhysicalLoc, textSegmentPhysicalSize, dataSegmentPhysicalLoc, dataSegmentPhysicalSize, anyV2P, metadataAddr, sectionHeaders, nativeResourcesAddr, nativeResourcesSize, resourcesAddr, strongnameAddr, vtableFixupsAddr) {
    this.fileName = fileName;
    this.pdb = pdb;
    this.entryPointToken = entryPointToken;
    this.pefile = pefile;
    this.textSegmentPhysicalLoc = textSegmentPhysicalLoc | 0;
    this.textSegmentPhysicalSize = textSegmentPhysicalSize | 0;
    this.dataSegmentPhysicalLoc = dataSegmentPhysicalLoc | 0;
    this.dataSegmentPhysicalSize = dataSegmentPhysicalSize | 0;
    this.anyV2P = anyV2P;
    this.metadataAddr = metadataAddr | 0;
    this.sectionHeaders = sectionHeaders;
    this.nativeResourcesAddr = nativeResourcesAddr | 0;
    this.nativeResourcesSize = nativeResourcesSize | 0;
    this.resourcesAddr = resourcesAddr | 0;
    this.strongnameAddr = strongnameAddr | 0;
    this.vtableFixupsAddr = vtableFixupsAddr | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.PEReader",
      interfaces: ["FSharpRecord"],
      properties: {
        fileName: "string",
        pdb: Option(Any),
        entryPointToken: Tuple([TableName, "number"]),
        pefile: Interface("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BinaryFile"),
        textSegmentPhysicalLoc: "number",
        textSegmentPhysicalSize: "number",
        dataSegmentPhysicalLoc: "number",
        dataSegmentPhysicalSize: "number",
        anyV2P: _Function([Tuple(["string", "number"]), "number"]),
        metadataAddr: "number",
        sectionHeaders: makeGeneric(List, {
          T: Tuple(["number", "number", "number"])
        }),
        nativeResourcesAddr: "number",
        nativeResourcesSize: "number",
        resourcesAddr: "number",
        strongnameAddr: "number",
        vtableFixupsAddr: "number"
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.PEReader", PEReader);
export class ILMetadataReader {
  constructor(ilg, sorted, mdfile, pectxtCaptured, entryPointToken, dataEndPoints, fileName, getNumRows, userStringsStreamPhysicalLoc, stringsStreamPhysicalLoc, blobsStreamPhysicalLoc, blobsStreamSize, readUserStringHeap, memoizeString, readStringHeap, readBlobHeap, guidsStreamPhysicalLoc, rowAddr, tableBigness, rsBigness, tdorBigness, tomdBigness, hcBigness, hcaBigness, hfmBigness, hdsBigness, mrpBigness, hsBigness, mdorBigness, mfBigness, iBigness, catBigness, stringsBigness, guidsBigness, blobsBigness, seekReadNestedRow, seekReadConstantRow, seekReadMethodSemanticsRow, seekReadTypeDefRow, seekReadAssemblyRef, seekReadMethodSpecAsMethodData, seekReadMemberRefAsMethodData, seekReadMemberRefAsFieldSpec, seekReadCustomAttr, seekReadTypeRef, seekReadTypeRefAsType, readBlobHeapAsPropertySig, readBlobHeapAsFieldSig, readBlobHeapAsMethodSig, readBlobHeapAsLocalsSig, seekReadTypeDefAsType, seekReadMethodDefAsMethodData, seekReadGenericParams, seekReadFieldDefAsFieldSpec, customAttrsReader_Module, customAttrsReader_Assembly, customAttrsReader_TypeDef, customAttrsReader_GenericParam, customAttrsReader_FieldDef, customAttrsReader_MethodDef, customAttrsReader_ParamDef, customAttrsReader_Event, customAttrsReader_Property, customAttrsReader_ManifestResource, customAttrsReader_ExportedType, securityDeclsReader_TypeDef, securityDeclsReader_MethodDef, securityDeclsReader_Assembly, typeDefReader) {
    this.ilg = ilg;
    this.sorted = sorted;
    this.mdfile = mdfile;
    this.pectxtCaptured = pectxtCaptured;
    this.entryPointToken = entryPointToken;
    this.dataEndPoints = dataEndPoints;
    this.fileName = fileName;
    this.getNumRows = getNumRows;
    this.userStringsStreamPhysicalLoc = userStringsStreamPhysicalLoc | 0;
    this.stringsStreamPhysicalLoc = stringsStreamPhysicalLoc | 0;
    this.blobsStreamPhysicalLoc = blobsStreamPhysicalLoc | 0;
    this.blobsStreamSize = blobsStreamSize | 0;
    this.readUserStringHeap = readUserStringHeap;
    this.memoizeString = memoizeString;
    this.readStringHeap = readStringHeap;
    this.readBlobHeap = readBlobHeap;
    this.guidsStreamPhysicalLoc = guidsStreamPhysicalLoc | 0;
    this.rowAddr = rowAddr;
    this.tableBigness = tableBigness;
    this.rsBigness = rsBigness;
    this.tdorBigness = tdorBigness;
    this.tomdBigness = tomdBigness;
    this.hcBigness = hcBigness;
    this.hcaBigness = hcaBigness;
    this.hfmBigness = hfmBigness;
    this.hdsBigness = hdsBigness;
    this.mrpBigness = mrpBigness;
    this.hsBigness = hsBigness;
    this.mdorBigness = mdorBigness;
    this.mfBigness = mfBigness;
    this.iBigness = iBigness;
    this.catBigness = catBigness;
    this.stringsBigness = stringsBigness;
    this.guidsBigness = guidsBigness;
    this.blobsBigness = blobsBigness;
    this.seekReadNestedRow = seekReadNestedRow;
    this.seekReadConstantRow = seekReadConstantRow;
    this.seekReadMethodSemanticsRow = seekReadMethodSemanticsRow;
    this.seekReadTypeDefRow = seekReadTypeDefRow;
    this.seekReadAssemblyRef = seekReadAssemblyRef;
    this.seekReadMethodSpecAsMethodData = seekReadMethodSpecAsMethodData;
    this.seekReadMemberRefAsMethodData = seekReadMemberRefAsMethodData;
    this.seekReadMemberRefAsFieldSpec = seekReadMemberRefAsFieldSpec;
    this.seekReadCustomAttr = seekReadCustomAttr;
    this.seekReadTypeRef = seekReadTypeRef;
    this.seekReadTypeRefAsType = seekReadTypeRefAsType;
    this.readBlobHeapAsPropertySig = readBlobHeapAsPropertySig;
    this.readBlobHeapAsFieldSig = readBlobHeapAsFieldSig;
    this.readBlobHeapAsMethodSig = readBlobHeapAsMethodSig;
    this.readBlobHeapAsLocalsSig = readBlobHeapAsLocalsSig;
    this.seekReadTypeDefAsType = seekReadTypeDefAsType;
    this.seekReadMethodDefAsMethodData = seekReadMethodDefAsMethodData;
    this.seekReadGenericParams = seekReadGenericParams;
    this.seekReadFieldDefAsFieldSpec = seekReadFieldDefAsFieldSpec;
    this.customAttrsReader_Module = customAttrsReader_Module;
    this.customAttrsReader_Assembly = customAttrsReader_Assembly;
    this.customAttrsReader_TypeDef = customAttrsReader_TypeDef;
    this.customAttrsReader_GenericParam = customAttrsReader_GenericParam;
    this.customAttrsReader_FieldDef = customAttrsReader_FieldDef;
    this.customAttrsReader_MethodDef = customAttrsReader_MethodDef;
    this.customAttrsReader_ParamDef = customAttrsReader_ParamDef;
    this.customAttrsReader_Event = customAttrsReader_Event;
    this.customAttrsReader_Property = customAttrsReader_Property;
    this.customAttrsReader_ManifestResource = customAttrsReader_ManifestResource;
    this.customAttrsReader_ExportedType = customAttrsReader_ExportedType;
    this.securityDeclsReader_TypeDef = securityDeclsReader_TypeDef;
    this.securityDeclsReader_MethodDef = securityDeclsReader_MethodDef;
    this.securityDeclsReader_Assembly = securityDeclsReader_Assembly;
    this.typeDefReader = typeDefReader;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILMetadataReader",
      interfaces: ["FSharpRecord"],
      properties: {
        ilg: ILGlobals,
        sorted: Long,
        mdfile: Interface("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.BinaryFile"),
        pectxtCaptured: Option(PEReader),
        entryPointToken: Tuple([TableName, "number"]),
        dataEndPoints: Any,
        fileName: "string",
        getNumRows: _Function([TableName, "number"]),
        userStringsStreamPhysicalLoc: "number",
        stringsStreamPhysicalLoc: "number",
        blobsStreamPhysicalLoc: "number",
        blobsStreamSize: "number",
        readUserStringHeap: _Function(["number", "string"]),
        memoizeString: _Function(["string", "string"]),
        readStringHeap: _Function(["number", "string"]),
        readBlobHeap: _Function(["number", _Array(Uint8Array, true)]),
        guidsStreamPhysicalLoc: "number",
        rowAddr: _Function([TableName, "number", "number"]),
        tableBigness: _Array("boolean"),
        rsBigness: "boolean",
        tdorBigness: "boolean",
        tomdBigness: "boolean",
        hcBigness: "boolean",
        hcaBigness: "boolean",
        hfmBigness: "boolean",
        hdsBigness: "boolean",
        mrpBigness: "boolean",
        hsBigness: "boolean",
        mdorBigness: "boolean",
        mfBigness: "boolean",
        iBigness: "boolean",
        catBigness: "boolean",
        stringsBigness: "boolean",
        guidsBigness: "boolean",
        blobsBigness: "boolean",
        seekReadNestedRow: _Function(["number", Tuple(["number", "number"])]),
        seekReadConstantRow: _Function(["number", Tuple(["number", makeGeneric(TaggedIndex, {
          T: HasConstantTag
        }), "number"])]),
        seekReadMethodSemanticsRow: _Function(["number", Tuple(["number", "number", makeGeneric(TaggedIndex, {
          T: HasSemanticsTag
        })])]),
        seekReadTypeDefRow: _Function(["number", Tuple(["number", "number", "number", makeGeneric(TaggedIndex, {
          T: TypeDefOrRefTag
        }), "number", "number"])]),
        seekReadAssemblyRef: _Function(["number", ILAssemblyRef]),
        seekReadMethodSpecAsMethodData: _Function([MethodSpecAsMspecIdx, VarArgMethodData]),
        seekReadMemberRefAsMethodData: _Function([MemberRefAsMspecIdx, VarArgMethodData]),
        seekReadMemberRefAsFieldSpec: _Function([MemberRefAsFspecIdx, ILFieldSpec]),
        seekReadCustomAttr: _Function([CustomAttrIdx, ILAttribute]),
        seekReadTypeRef: _Function(["number", ILTypeRef]),
        seekReadTypeRefAsType: _Function([TypeRefAsTypIdx, ILType]),
        readBlobHeapAsPropertySig: _Function([BlobAsPropSigIdx, Tuple([ILThisConvention, ILType, makeGeneric(List, {
          T: ILType
        })])]),
        readBlobHeapAsFieldSig: _Function([BlobAsFieldSigIdx, ILType]),
        readBlobHeapAsMethodSig: _Function([BlobAsMethodSigIdx, Tuple(["boolean", "number", ILCallingConv, ILType, makeGeneric(List, {
          T: ILType
        }), Option(makeGeneric(List, {
          T: ILType
        }))])]),
        readBlobHeapAsLocalsSig: _Function([BlobAsLocalSigIdx, makeGeneric(List, {
          T: ILLocal
        })]),
        seekReadTypeDefAsType: _Function([TypeDefAsTypIdx, ILType]),
        seekReadMethodDefAsMethodData: _Function(["number", MethodData]),
        seekReadGenericParams: _Function([GenericParamsIdx, makeGeneric(List, {
          T: ILGenericParameterDef
        })]),
        seekReadFieldDefAsFieldSpec: _Function(["number", ILFieldSpec]),
        customAttrsReader_Module: ILAttributesStored,
        customAttrsReader_Assembly: ILAttributesStored,
        customAttrsReader_TypeDef: ILAttributesStored,
        customAttrsReader_GenericParam: ILAttributesStored,
        customAttrsReader_FieldDef: ILAttributesStored,
        customAttrsReader_MethodDef: ILAttributesStored,
        customAttrsReader_ParamDef: ILAttributesStored,
        customAttrsReader_Event: ILAttributesStored,
        customAttrsReader_Property: ILAttributesStored,
        customAttrsReader_ManifestResource: ILAttributesStored,
        customAttrsReader_ExportedType: ILAttributesStored,
        securityDeclsReader_TypeDef: ILSecurityDeclsStored,
        securityDeclsReader_MethodDef: ILSecurityDeclsStored,
        securityDeclsReader_Assembly: ILSecurityDeclsStored,
        typeDefReader: ILTypeDefStored
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILMetadataReader", ILMetadataReader);
export function seekReadUInt16Adv(mdv, addr) {
  const res = seekReadUInt16(mdv, addr.contents);
  addr.contents = addr.contents + 2 | 0;
  return res;
}
export function seekReadInt32Adv(mdv, addr) {
  const res = seekReadInt32(mdv, addr.contents) | 0;
  addr.contents = addr.contents + 4 | 0;
  return res | 0;
}
export function seekReadUInt16AsInt32Adv(mdv, addr) {
  const res = seekReadUInt16AsInt32(mdv, addr.contents) | 0;
  addr.contents = addr.contents + 2 | 0;
  return res | 0;
}
export function seekReadTaggedIdx(f, nbits, big, mdv, addr) {
  const tok = (big ? seekReadInt32Adv(mdv, addr) : seekReadUInt16AsInt32Adv(mdv, addr)) | 0;
  return tokToTaggedIdx(f, nbits, tok);
}
export function seekReadIdx(big, mdv, addr) {
  if (big) {
    return seekReadInt32Adv(mdv, addr) | 0;
  } else {
    return seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  }
}
export function seekReadUntaggedIdx(tab, ctxt, mdv, addr) {
  return seekReadIdx(ctxt.tableBigness[tab.Index], mdv, addr) | 0;
}
export function seekReadResolutionScopeIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkResolutionScopeTag(arg00_);
  }, 2, ctxt.rsBigness, mdv, addr);
}
export function seekReadTypeDefOrRefOrSpecIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkTypeDefOrRefOrSpecTag(arg00_);
  }, 2, ctxt.tdorBigness, mdv, addr);
}
export function seekReadTypeOrMethodDefIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkTypeOrMethodDefTag(arg00_);
  }, 1, ctxt.tomdBigness, mdv, addr);
}
export function seekReadHasConstantIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkHasConstantTag(arg00_);
  }, 2, ctxt.hcBigness, mdv, addr);
}
export function seekReadHasCustomAttributeIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkHasCustomAttributeTag(arg00_);
  }, 5, ctxt.hcaBigness, mdv, addr);
}
export function seekReadHasFieldMarshalIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkHasFieldMarshalTag(arg00_);
  }, 1, ctxt.hfmBigness, mdv, addr);
}
export function seekReadHasDeclSecurityIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkHasDeclSecurityTag(arg00_);
  }, 2, ctxt.hdsBigness, mdv, addr);
}
export function seekReadMemberRefParentIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkMemberRefParentTag(arg00_);
  }, 3, ctxt.mrpBigness, mdv, addr);
}
export function seekReadHasSemanticsIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkHasSemanticsTag(arg00_);
  }, 1, ctxt.hsBigness, mdv, addr);
}
export function seekReadMethodDefOrRefIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkMethodDefOrRefTag(arg00_);
  }, 1, ctxt.mdorBigness, mdv, addr);
}
export function seekReadMemberForwardedIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkMemberForwardedTag(arg00_);
  }, 1, ctxt.mfBigness, mdv, addr);
}
export function seekReadImplementationIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkImplementationTag(arg00_);
  }, 2, ctxt.iBigness, mdv, addr);
}
export function seekReadCustomAttributeTypeIdx(ctxt, mdv, addr) {
  return seekReadTaggedIdx(function (arg00_) {
    return mkILCustomAttributeTypeTag(arg00_);
  }, 3, ctxt.catBigness, mdv, addr);
}
export function seekReadStringIdx(ctxt, mdv, addr) {
  return seekReadIdx(ctxt.stringsBigness, mdv, addr) | 0;
}
export function seekReadGuidIdx(ctxt, mdv, addr) {
  return seekReadIdx(ctxt.guidsBigness, mdv, addr) | 0;
}
export function seekReadBlobIdx(ctxt, mdv, addr) {
  return seekReadIdx(ctxt.blobsBigness, mdv, addr) | 0;
}
export function seekReadModuleRow(ctxt, mdv, idx) {
  if (idx === 0) {
    throw new Error("cannot read Module table row 0");
  }

  let addr = {
    contents: ctxt.rowAddr(TableNames.Module, idx)
  };
  const generation = seekReadUInt16Adv(mdv, addr);
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const mvidIdx = seekReadGuidIdx(ctxt, mdv, addr) | 0;
  const encidIdx = seekReadGuidIdx(ctxt, mdv, addr) | 0;
  const encbaseidIdx = seekReadGuidIdx(ctxt, mdv, addr) | 0;
  return [generation, nameIdx, mvidIdx, encidIdx, encbaseidIdx];
}
export function seekReadTypeRefRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.TypeRef, idx)
  };
  const scopeIdx = seekReadResolutionScopeIdx(ctxt, mdv, addr);
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const namespaceIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  return [scopeIdx, nameIdx, namespaceIdx];
}
export function seekReadTypeDefRow(ctxt, idx) {
  return ctxt.seekReadTypeDefRow(idx);
}
export function seekReadTypeDefRowUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  let addr = {
    contents: ctxt.rowAddr(TableNames.TypeDef, idx)
  };
  const flags = seekReadInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const namespaceIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const extendsIdx = seekReadTypeDefOrRefOrSpecIdx(ctxt, mdv, addr);
  const fieldsIdx = seekReadUntaggedIdx(TableNames.Field, ctxt, mdv, addr) | 0;
  const methodsIdx = seekReadUntaggedIdx(TableNames.Method, ctxt, mdv, addr) | 0;
  return [flags, nameIdx, namespaceIdx, extendsIdx, fieldsIdx, methodsIdx];
}
export function seekReadFieldRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.Field, idx)
  };
  const flags = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const typeIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [flags, nameIdx, typeIdx];
}
export function seekReadMethodRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.Method, idx)
  };
  const codeRVA = seekReadInt32Adv(mdv, addr) | 0;
  const implflags = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const flags = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const typeIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  const paramIdx = seekReadUntaggedIdx(TableNames.Param, ctxt, mdv, addr) | 0;
  return [codeRVA, implflags, flags, nameIdx, typeIdx, paramIdx];
}
export function seekReadParamRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.Param, idx)
  };
  const flags = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const seq = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  return [flags, seq, nameIdx];
}
export function seekReadInterfaceImplRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.InterfaceImpl, idx)
  };
  const tidx = seekReadUntaggedIdx(TableNames.TypeDef, ctxt, mdv, addr) | 0;
  const intfIdx = seekReadTypeDefOrRefOrSpecIdx(ctxt, mdv, addr);
  return [tidx, intfIdx];
}
export function seekReadMemberRefRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.MemberRef, idx)
  };
  const mrpIdx = seekReadMemberRefParentIdx(ctxt, mdv, addr);
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const typeIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [mrpIdx, nameIdx, typeIdx];
}
export function seekReadConstantRow(ctxt, idx) {
  return ctxt.seekReadConstantRow(idx);
}
export function seekReadConstantRowUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  let addr = {
    contents: ctxt.rowAddr(TableNames.Constant, idx)
  };
  const kind = seekReadUInt16Adv(mdv, addr);
  const parentIdx = seekReadHasConstantIdx(ctxt, mdv, addr);
  const valIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [kind, parentIdx, valIdx];
}
export function seekReadCustomAttributeRow(ctxt, idx) {
  const mdv = ctxt.mdfile.GetView();
  let addr = {
    contents: ctxt.rowAddr(TableNames.CustomAttribute, idx)
  };
  const parentIdx = seekReadHasCustomAttributeIdx(ctxt, mdv, addr);
  const typeIdx = seekReadCustomAttributeTypeIdx(ctxt, mdv, addr);
  const valIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [parentIdx, typeIdx, valIdx];
}
export function seekReadFieldMarshalRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.FieldMarshal, idx)
  };
  const parentIdx = seekReadHasFieldMarshalIdx(ctxt, mdv, addr);
  const typeIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [parentIdx, typeIdx];
}
export function seekReadPermissionRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.Permission, idx)
  };
  const action = seekReadUInt16Adv(mdv, addr);
  const parentIdx = seekReadHasDeclSecurityIdx(ctxt, mdv, addr);
  const typeIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [action, parentIdx, typeIdx];
}
export function seekReadClassLayoutRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.ClassLayout, idx)
  };
  const pack = seekReadUInt16Adv(mdv, addr);
  const size = seekReadInt32Adv(mdv, addr) | 0;
  const tidx = seekReadUntaggedIdx(TableNames.TypeDef, ctxt, mdv, addr) | 0;
  return [pack, size, tidx];
}
export function seekReadFieldLayoutRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.FieldLayout, idx)
  };
  const offset = seekReadInt32Adv(mdv, addr) | 0;
  const fidx = seekReadUntaggedIdx(TableNames.Field, ctxt, mdv, addr) | 0;
  return [offset, fidx];
}
export function seekReadStandAloneSigRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.StandAloneSig, idx)
  };
  const sigIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return sigIdx | 0;
}
export function seekReadEventMapRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.EventMap, idx)
  };
  const tidx = seekReadUntaggedIdx(TableNames.TypeDef, ctxt, mdv, addr) | 0;
  const eventsIdx = seekReadUntaggedIdx(TableNames.Event, ctxt, mdv, addr) | 0;
  return [tidx, eventsIdx];
}
export function seekReadEventRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.Event, idx)
  };
  const flags = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const typIdx = seekReadTypeDefOrRefOrSpecIdx(ctxt, mdv, addr);
  return [flags, nameIdx, typIdx];
}
export function seekReadPropertyMapRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.PropertyMap, idx)
  };
  const tidx = seekReadUntaggedIdx(TableNames.TypeDef, ctxt, mdv, addr) | 0;
  const propsIdx = seekReadUntaggedIdx(TableNames.Property, ctxt, mdv, addr) | 0;
  return [tidx, propsIdx];
}
export function seekReadPropertyRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.Property, idx)
  };
  const flags = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const typIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [flags, nameIdx, typIdx];
}
export function seekReadMethodSemanticsRow(ctxt, idx) {
  return ctxt.seekReadMethodSemanticsRow(idx);
}
export function seekReadMethodSemanticsRowUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  let addr = {
    contents: ctxt.rowAddr(TableNames.MethodSemantics, idx)
  };
  const flags = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const midx = seekReadUntaggedIdx(TableNames.Method, ctxt, mdv, addr) | 0;
  const assocIdx = seekReadHasSemanticsIdx(ctxt, mdv, addr);
  return [flags, midx, assocIdx];
}
export function seekReadMethodImplRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.MethodImpl, idx)
  };
  const tidx = seekReadUntaggedIdx(TableNames.TypeDef, ctxt, mdv, addr) | 0;
  const mbodyIdx = seekReadMethodDefOrRefIdx(ctxt, mdv, addr);
  const mdeclIdx = seekReadMethodDefOrRefIdx(ctxt, mdv, addr);
  return [tidx, mbodyIdx, mdeclIdx];
}
export function seekReadModuleRefRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.ModuleRef, idx)
  };
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  return nameIdx | 0;
}
export function seekReadTypeSpecRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.TypeSpec, idx)
  };
  const blobIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return blobIdx | 0;
}
export function seekReadImplMapRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.ImplMap, idx)
  };
  const flags = seekReadUInt16AsInt32Adv(mdv, addr) | 0;
  const forwrdedIdx = seekReadMemberForwardedIdx(ctxt, mdv, addr);
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const scopeIdx = seekReadUntaggedIdx(TableNames.ModuleRef, ctxt, mdv, addr) | 0;
  return [flags, forwrdedIdx, nameIdx, scopeIdx];
}
export function seekReadFieldRVARow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.FieldRVA, idx)
  };
  const rva = seekReadInt32Adv(mdv, addr) | 0;
  const fidx = seekReadUntaggedIdx(TableNames.Field, ctxt, mdv, addr) | 0;
  return [rva, fidx];
}
export function seekReadAssemblyRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.Assembly, idx)
  };
  const hash = seekReadInt32Adv(mdv, addr) | 0;
  const v1 = seekReadUInt16Adv(mdv, addr);
  const v2 = seekReadUInt16Adv(mdv, addr);
  const v3 = seekReadUInt16Adv(mdv, addr);
  const v4 = seekReadUInt16Adv(mdv, addr);
  const flags = seekReadInt32Adv(mdv, addr) | 0;
  const publicKeyIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const localeIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  return [hash, v1, v2, v3, v4, flags, publicKeyIdx, nameIdx, localeIdx];
}
export function seekReadAssemblyRefRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.AssemblyRef, idx)
  };
  const v1 = seekReadUInt16Adv(mdv, addr);
  const v2 = seekReadUInt16Adv(mdv, addr);
  const v3 = seekReadUInt16Adv(mdv, addr);
  const v4 = seekReadUInt16Adv(mdv, addr);
  const flags = seekReadInt32Adv(mdv, addr) | 0;
  const publicKeyOrTokenIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const localeIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const hashValueIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [v1, v2, v3, v4, flags, publicKeyOrTokenIdx, nameIdx, localeIdx, hashValueIdx];
}
export function seekReadFileRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.File, idx)
  };
  const flags = seekReadInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const hashValueIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [flags, nameIdx, hashValueIdx];
}
export function seekReadExportedTypeRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.ExportedType, idx)
  };
  const flags = seekReadInt32Adv(mdv, addr) | 0;
  const tok = seekReadInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const namespaceIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const implIdx = seekReadImplementationIdx(ctxt, mdv, addr);
  return [flags, tok, nameIdx, namespaceIdx, implIdx];
}
export function seekReadManifestResourceRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.ManifestResource, idx)
  };
  const offset = seekReadInt32Adv(mdv, addr) | 0;
  const flags = seekReadInt32Adv(mdv, addr) | 0;
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  const implIdx = seekReadImplementationIdx(ctxt, mdv, addr);
  return [offset, flags, nameIdx, implIdx];
}
export function seekReadNestedRow(ctxt, idx) {
  return ctxt.seekReadNestedRow(idx);
}
export function seekReadNestedRowUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  let addr = {
    contents: ctxt.rowAddr(TableNames.Nested, idx)
  };
  const nestedIdx = seekReadUntaggedIdx(TableNames.TypeDef, ctxt, mdv, addr) | 0;
  const enclIdx = seekReadUntaggedIdx(TableNames.TypeDef, ctxt, mdv, addr) | 0;
  return [nestedIdx, enclIdx];
}
export function seekReadGenericParamRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.GenericParam, idx)
  };
  const seq = seekReadUInt16Adv(mdv, addr);
  const flags = seekReadUInt16Adv(mdv, addr);
  const ownerIdx = seekReadTypeOrMethodDefIdx(ctxt, mdv, addr);
  const nameIdx = seekReadStringIdx(ctxt, mdv, addr) | 0;
  return [idx, seq, flags, ownerIdx, nameIdx];
}
export function seekReadGenericParamConstraintRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.GenericParamConstraint, idx)
  };
  const pidx = seekReadUntaggedIdx(TableNames.GenericParam, ctxt, mdv, addr) | 0;
  const constraintIdx = seekReadTypeDefOrRefOrSpecIdx(ctxt, mdv, addr);
  return [pidx, constraintIdx];
}
export function seekReadMethodSpecRow(ctxt, mdv, idx) {
  let addr = {
    contents: ctxt.rowAddr(TableNames.MethodSpec, idx)
  };
  const mdorIdx = seekReadMethodDefOrRefIdx(ctxt, mdv, addr);
  const instIdx = seekReadBlobIdx(ctxt, mdv, addr) | 0;
  return [mdorIdx, instIdx];
}
export function readUserStringHeapUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  return seekReadUserString(mdv, ctxt.userStringsStreamPhysicalLoc + idx);
}
export function readUserStringHeap(ctxt, idx) {
  return ctxt.readUserStringHeap(idx);
}
export function readStringHeapUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  return seekReadUTF8String(mdv, ctxt.stringsStreamPhysicalLoc + idx);
}
export function readStringHeap(ctxt, idx) {
  return ctxt.readStringHeap(idx);
}
export function readStringHeapOption(ctxt, idx) {
  if (idx === 0) {
    return null;
  } else {
    return readStringHeap(ctxt, idx);
  }
}
export const emptyByteArray = new Uint8Array([]);
export function readBlobHeapUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();

  if (idx <= 0 ? true : idx >= ctxt.blobsStreamSize) {
    return emptyByteArray;
  } else {
    return seekReadBlob(mdv, ctxt.blobsStreamPhysicalLoc + idx);
  }
}
export function readBlobHeap(ctxt, idx) {
  return ctxt.readBlobHeap(idx);
}
export function readBlobHeapOption(ctxt, idx) {
  if (idx === 0) {
    return null;
  } else {
    return readBlobHeap(ctxt, idx);
  }
}
export function readBlobHeapAsBool(ctxt, vidx) {
  return sigptrGetBool(readBlobHeap(ctxt, vidx), 0)[0];
}
export function readBlobHeapAsSByte(ctxt, vidx) {
  return sigptrGetSByte(readBlobHeap(ctxt, vidx), 0)[0] | 0;
}
export function readBlobHeapAsInt16(ctxt, vidx) {
  return sigptrGetInt16(readBlobHeap(ctxt, vidx), 0)[0] | 0;
}
export function readBlobHeapAsInt32(ctxt, vidx) {
  return sigptrGetInt32(readBlobHeap(ctxt, vidx), 0)[0] | 0;
}
export function readBlobHeapAsInt64(ctxt, vidx) {
  return sigptrGetInt64(readBlobHeap(ctxt, vidx), 0)[0];
}
export function readBlobHeapAsByte(ctxt, vidx) {
  return sigptrGetByte(readBlobHeap(ctxt, vidx), 0)[0];
}
export function readBlobHeapAsUInt16(ctxt, vidx) {
  return sigptrGetUInt16(readBlobHeap(ctxt, vidx), 0)[0];
}
export function readBlobHeapAsUInt32(ctxt, vidx) {
  return sigptrGetUInt32(readBlobHeap(ctxt, vidx), 0)[0];
}
export function readBlobHeapAsUInt64(ctxt, vidx) {
  return sigptrGetUInt64(readBlobHeap(ctxt, vidx), 0)[0];
}
export function readBlobHeapAsSingle(ctxt, vidx) {
  return sigptrGetSingle(readBlobHeap(ctxt, vidx), 0)[0];
}
export function readBlobHeapAsDouble(ctxt, vidx) {
  return sigptrGetDouble(readBlobHeap(ctxt, vidx), 0)[0];
}
export function readNativeResources(pectxt) {
  return toList(delay(function () {
    if (pectxt.nativeResourcesSize !== 0 ? pectxt.nativeResourcesAddr !== 0 : false) {
      const start = pectxt.anyV2P([pectxt.fileName + ": native resources", pectxt.nativeResourcesAddr]) | 0;
      return singleton(new ILNativeResource(0, [pectxt.fileName, pectxt.nativeResourcesAddr, start, pectxt.nativeResourcesSize]));
    } else {
      return empty();
    }
  }));
}
export function getDataEndPointsDelayed(pectxt, ctxtH) {
  return new Lazy(function () {
    const ctxt = getHole(ctxtH);
    const mdv = ctxt.mdfile.GetView();
    let dataStartPoints;
    const res = {
      contents: new List()
    };

    for (let i = 1; i <= ctxt.getNumRows(TableNames.FieldRVA); i++) {
      const patternInput = seekReadFieldRVARow(ctxt, mdv, i);
      res.contents = new List(["field", patternInput[0]], res.contents);
    }

    for (let i_1 = 1; i_1 <= ctxt.getNumRows(TableNames.ManifestResource); i_1++) {
      const patternInput_1 = seekReadManifestResourceRow(ctxt, mdv, i_1);

      const activePatternResult13736 = _TaggedIndex_(patternInput_1[3]);

      if (activePatternResult13736[1] === 0) {
        const rva = pectxt.resourcesAddr + patternInput_1[0] | 0;
        res.contents = new List(["manifest resource", rva], res.contents);
      }
    }

    dataStartPoints = res.contents;

    if (dataStartPoints.tail == null) {
      return new List();
    } else {
      let methodRVAs;
      const res_1 = {
        contents: new List()
      };

      for (let i_2 = 1; i_2 <= ctxt.getNumRows(TableNames.Method); i_2++) {
        const patternInput_2 = seekReadMethodRow(ctxt, mdv, i_2);

        if (patternInput_2[0] !== 0) {
          const nm = readStringHeap(ctxt, patternInput_2[3]);
          res_1.contents = new List([nm, patternInput_2[0]], res_1.contents);
        }
      }

      methodRVAs = res_1.contents;
      return toList(sortWith(($var21, $var22) => compare($var21, $var22), toList(distinct(append(ofArray([pectxt.textSegmentPhysicalLoc + pectxt.textSegmentPhysicalSize, pectxt.dataSegmentPhysicalLoc + pectxt.dataSegmentPhysicalSize]), map(pectxt.anyV2P, append(dataStartPoints, append(toList(delay(function () {
        return collect(function (matchValue) {
          return singleton(["section start", matchValue[0]]);
        }, pectxt.sectionHeaders);
      })), append(ofArray([["md", pectxt.metadataAddr]]), append(pectxt.nativeResourcesAddr === 0 ? new List() : ofArray([["native resources", pectxt.nativeResourcesAddr]]), append(pectxt.resourcesAddr === 0 ? new List() : ofArray([["managed resources", pectxt.resourcesAddr]]), append(pectxt.strongnameAddr === 0 ? new List() : ofArray([["managed strongname", pectxt.strongnameAddr]]), append(pectxt.vtableFixupsAddr === 0 ? new List() : ofArray([["managed vtable_fixups", pectxt.vtableFixupsAddr]]), methodRVAs)))))))))))));
    }
  });
}
export function rvaToData(ctxt, pectxt, nm, rva) {
  if (rva === 0) {
    throw new Error("rva is zero");
  }

  const start = pectxt.anyV2P([nm, rva]) | 0;
  const endPoints = Lazy_1.force(ctxt.dataEndPoints);

  const look = function (l) {
    look: while (true) {
      if (l.tail != null) {
        if (start < l.head) {
          const pev = pectxt.pefile.GetView();
          return seekReadBytes(pev, start, l.head - start);
        } else {
          l = l.tail;
          continue look;
        }
      } else {
        return toFail(printf("find_text_data_extent: none found for fileName=%s, name=%s, rva=0x%08x, start=0x%08x"))(ctxt.fileName, nm, rva, start);
      }
    }
  };

  return look(endPoints);
}
export function isSorted(ctxt, tab) {
  return !ctxt.sorted.and(fromNumber(1, false).shl(tab.Index)).Equals(fromNumber(0, false));
}
export function seekReadModule(ctxt, pectxtEager, pevEager, peinfo_0, peinfo_1, peinfo_2, peinfo_3, peinfo_4, peinfo_5, peinfo_6, peinfo_7, peinfo_8, peinfo_9, peinfo_10, peinfo_11, ilMetadataVersion, idx) {
  const peinfo = [peinfo_0, peinfo_1, peinfo_2, peinfo_3, peinfo_4, peinfo_5, peinfo_6, peinfo_7, peinfo_8, peinfo_9, peinfo_10, peinfo_11];
  const mdv = ctxt.mdfile.GetView();
  const patternInput = seekReadModuleRow(ctxt, mdv, idx);
  const ilModuleName = readStringHeap(ctxt, patternInput[1]);
  const nativeResources = readNativeResources(pectxtEager);
  const Manifest = ctxt.getNumRows(TableNames.Assembly) > 0 ? seekReadAssemblyManifest(ctxt, pectxtEager, 1) : null;
  const TypeDefs = mkILTypeDefsComputed(function () {
    return seekReadTopTypeDefs(ctxt);
  });
  const SubSystemFlags = ~~peinfo[0] | 0;
  const StackReserveSize = null;
  return new ILModuleDef(Manifest, ilModuleName, TypeDefs, peinfo[1], peinfo[2], SubSystemFlags, peinfo[8], peinfo[3], peinfo[7], StackReserveSize, peinfo[4], peinfo[5], peinfo[6], peinfo[9], peinfo[10], peinfo[11], ilMetadataVersion, seekReadManifestResources(ctxt, mdv, pectxtEager, pevEager), nativeResources, ctxt.customAttrsReader_Module, idx);
}
export function seekReadAssemblyManifest(ctxt, pectxt, idx) {
  const mdview = ctxt.mdfile.GetView();
  const patternInput = seekReadAssemblyRow(ctxt, mdview, idx);
  const name = readStringHeap(ctxt, patternInput[7]);
  const pubkey = readBlobHeapOption(ctxt, patternInput[6]);
  const Version = [patternInput[1], patternInput[2], patternInput[3], patternInput[4]];
  const Locale = readStringHeapOption(ctxt, patternInput[8]);
  let AssemblyLongevity;
  const masked = patternInput[5] & 14 | 0;

  if (masked === 0) {
    AssemblyLongevity = new ILAssemblyLongevity(0);
  } else if (masked === 2) {
    AssemblyLongevity = new ILAssemblyLongevity(1);
  } else if (masked === 4) {
    AssemblyLongevity = new ILAssemblyLongevity(2);
  } else if (masked === 6) {
    AssemblyLongevity = new ILAssemblyLongevity(3);
  } else if (masked === 8) {
    AssemblyLongevity = new ILAssemblyLongevity(4);
  } else {
    AssemblyLongevity = new ILAssemblyLongevity(0);
  }

  const ExportedTypes = seekReadTopExportedTypes(ctxt);
  const EntrypointElsewhere = pectxt.entryPointToken[0].Equals(TableNames.File) ? seekReadFile(ctxt, mdview, pectxt.entryPointToken[1]) : null;
  const Retargetable = 0 !== (patternInput[5] & 256);
  return new ILAssemblyManifest(name, patternInput[0], ctxt.securityDeclsReader_Assembly, pubkey, Version, Locale, ctxt.customAttrsReader_Assembly, AssemblyLongevity, 0 !== (patternInput[5] & 16384), 0 !== (patternInput[5] & 32768), 0 !== (patternInput[5] & 8192), Retargetable, ExportedTypes, EntrypointElsewhere, idx);
}
export function seekReadAssemblyRef(ctxt, idx) {
  return ctxt.seekReadAssemblyRef(idx);
}
export function seekReadAssemblyRefUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  const patternInput = seekReadAssemblyRefRow(ctxt, mdv, idx);
  const nm = readStringHeap(ctxt, patternInput[6]);
  let publicKey;
  const matchValue = readBlobHeapOption(ctxt, patternInput[5]);

  if (matchValue != null) {
    publicKey = (patternInput[4] & 1) !== 0 ? new PublicKey(0, getValue(matchValue)) : new PublicKey(1, getValue(matchValue));
  } else {
    publicKey = null;
  }

  return ILAssemblyRef.Create(nm, readBlobHeapOption(ctxt, patternInput[8]), publicKey, (patternInput[4] & 256) !== 0, [patternInput[0], patternInput[1], patternInput[2], patternInput[3]], readStringHeapOption(ctxt, patternInput[7]));
}
export function seekReadModuleRef(ctxt, mdv, idx) {
  const nameIdx = seekReadModuleRefRow(ctxt, mdv, idx) | 0;
  return ILModuleRef.Create(readStringHeap(ctxt, nameIdx), true, null);
}
export function seekReadFile(ctxt, mdv, idx) {
  const patternInput = seekReadFileRow(ctxt, mdv, idx);
  return ILModuleRef.Create(readStringHeap(ctxt, patternInput[1]), (patternInput[0] & 1) === 0, readBlobHeapOption(ctxt, patternInput[2]));
}
export function seekReadClassLayout(ctxt, mdv, idx) {
  const matchValue = seekReadOptionalIndexedRow(ctxt.getNumRows(TableNames.ClassLayout), function (idx_1) {
    return seekReadClassLayoutRow(ctxt, mdv, idx_1);
  }, function (tupledArg) {
    return tupledArg[2];
  }, function (idx2) {
    return simpleIndexCompare(idx, idx2);
  }, isSorted(ctxt, TableNames.ClassLayout), function (tupledArg_1) {
    return [tupledArg_1[0], tupledArg_1[1]];
  });

  if (matchValue != null) {
    const size = getValue(matchValue)[1] | 0;
    const pack = getValue(matchValue)[0];
    return new ILTypeDefLayoutInfo(size, pack);
  } else {
    return new ILTypeDefLayoutInfo(null, null);
  }
}
export function typeAccessOfFlags(flags) {
  const f = flags & 7 | 0;

  if (f === 1) {
    return new ILTypeDefAccess(0);
  } else if (f === 2) {
    return new ILTypeDefAccess(2, new ILMemberAccess(5));
  } else if (f === 3) {
    return new ILTypeDefAccess(2, new ILMemberAccess(4));
  } else if (f === 4) {
    return new ILTypeDefAccess(2, new ILMemberAccess(3));
  } else if (f === 6) {
    return new ILTypeDefAccess(2, new ILMemberAccess(1));
  } else if (f === 7) {
    return new ILTypeDefAccess(2, new ILMemberAccess(2));
  } else if (f === 5) {
    return new ILTypeDefAccess(2, new ILMemberAccess(0));
  } else {
    return new ILTypeDefAccess(1);
  }
}
export function typeLayoutOfFlags(ctxt, mdv, flags, tidx) {
  const f = flags & 24 | 0;

  if (f === 8) {
    return new ILTypeDefLayout(1, seekReadClassLayout(ctxt, mdv, tidx));
  } else if (f === 16) {
    return new ILTypeDefLayout(2, seekReadClassLayout(ctxt, mdv, tidx));
  } else {
    return new ILTypeDefLayout(0);
  }
}
export function isTopTypeDef(flags) {
  if (typeAccessOfFlags(flags).Equals(new ILTypeDefAccess(1))) {
    return true;
  } else {
    return typeAccessOfFlags(flags).Equals(new ILTypeDefAccess(0));
  }
}
export function seekIsTopTypeDefOfIdx(ctxt, idx) {
  const patternInput = seekReadTypeDefRow(ctxt, idx);
  return isTopTypeDef(patternInput[0]);
}
export function readBlobHeapAsSplitTypeName(ctxt, nameIdx, namespaceIdx) {
  const name = readStringHeap(ctxt, nameIdx);
  const nspace = readStringHeapOption(ctxt, namespaceIdx);

  if (nspace == null) {
    return [new List(), name];
  } else {
    return [splitNamespace(getValue(nspace)), name];
  }
}
export function readBlobHeapAsTypeName(ctxt, nameIdx, namespaceIdx) {
  const name = readStringHeap(ctxt, nameIdx);
  const nspace = readStringHeapOption(ctxt, namespaceIdx);

  if (nspace != null) {
    return ctxt.memoizeString(getValue(nspace) + "." + name);
  } else {
    return name;
  }
}
export function seekReadTypeDefRowExtents(ctxt, _info, idx) {
  if (idx >= ctxt.getNumRows(TableNames.TypeDef)) {
    return [ctxt.getNumRows(TableNames.Field) + 1, ctxt.getNumRows(TableNames.Method) + 1];
  } else {
    const patternInput = seekReadTypeDefRow(ctxt, idx + 1);
    return [patternInput[4], patternInput[5]];
  }
}
export function seekReadTypeDefRowWithExtents(ctxt, idx) {
  const info = seekReadTypeDefRow(ctxt, idx);
  return [info, seekReadTypeDefRowExtents(ctxt, info, idx)];
}
export function seekReadPreTypeDef(ctxt, toponly, idx) {
  const patternInput = seekReadTypeDefRow(ctxt, idx);

  if (toponly ? !isTopTypeDef(patternInput[0]) : false) {
    return null;
  } else {
    const patternInput_1 = readBlobHeapAsSplitTypeName(ctxt, patternInput[1], patternInput[2]);
    return mkILPreTypeDefRead(patternInput_1[0], patternInput_1[1], idx, ctxt.typeDefReader);
  }
}
export function typeDefReader(ctxtH) {
  return mkILTypeDefReader(function (idx) {
    const ctxt = getHole(ctxtH);
    const mdv = ctxt.mdfile.GetView();
    const info = seekReadTypeDefRow(ctxt, idx);
    const nm = readBlobHeapAsTypeName(ctxt, info[1], info[2]);
    const patternInput = seekReadTypeDefRowExtents(ctxt, info, idx);
    const typars = seekReadGenericParams(ctxt, 0, tomd_TypeDef, idx);
    const numtypars = typars.length | 0;

    const _super = seekReadOptionalTypeDefOrRef(ctxt, numtypars, new ILBoxity(0), info[3]);

    const layout = typeLayoutOfFlags(ctxt, mdv, info[0], idx);
    const hasLayout = layout.tag === 2 ? true : false;
    const mdefs = seekReadMethods(ctxt, numtypars, info[5], patternInput[1]);
    const fdefs = seekReadFields(ctxt, numtypars, hasLayout, info[4], patternInput[0]);
    const nested = seekReadNestedTypeDefs(ctxt, idx);
    const impls = seekReadInterfaceImpls(ctxt, mdv, numtypars, idx);
    const mimpls = seekReadMethodImpls(ctxt, numtypars, idx);
    const props = seekReadProperties(ctxt, numtypars, idx);
    const events = seekReadEvents(ctxt, numtypars, idx);
    return ILTypeDef.CreateStored(nm, info[0], layout, impls, typars, _super, mdefs, nested, fdefs, mimpls, events, props, ctxt.securityDeclsReader_TypeDef, ctxt.customAttrsReader_TypeDef, idx);
  });
}
export function seekReadTopTypeDefs(ctxt) {
  return Array.from(delay(function () {
    return collect(function (i) {
      const matchValue = seekReadPreTypeDef(ctxt, true, i);

      if (matchValue != null) {
        return singleton(getValue(matchValue));
      } else {
        return empty();
      }
    }, range(1, ctxt.getNumRows(TableNames.TypeDef)));
  }));
}
export function seekReadNestedTypeDefs(ctxt, tidx) {
  return mkILTypeDefsComputed(function () {
    const nestedIdxs = seekReadIndexedRows(ctxt.getNumRows(TableNames.Nested), function (idx) {
      return seekReadNestedRow(ctxt, idx);
    }, function (tuple) {
      return tuple[1];
    }, function (idx2) {
      return simpleIndexCompare(tidx, idx2);
    }, false, function (tuple_1) {
      return tuple_1[0];
    });
    return Array.from(delay(function () {
      return collect(function (i) {
        const matchValue = seekReadPreTypeDef(ctxt, false, i);

        if (matchValue != null) {
          return singleton(getValue(matchValue));
        } else {
          return empty();
        }
      }, nestedIdxs);
    }));
  });
}
export function seekReadInterfaceImpls(ctxt, mdv, numtypars, tidx) {
  return seekReadIndexedRows(ctxt.getNumRows(TableNames.InterfaceImpl), function (idx) {
    return seekReadInterfaceImplRow(ctxt, mdv, idx);
  }, function (tuple) {
    return tuple[0];
  }, function (idx2) {
    return simpleIndexCompare(tidx, idx2);
  }, isSorted(ctxt, TableNames.InterfaceImpl), $var23 => {
    var boxity;
    var ginst;
    return (boxity = new ILBoxity(0), ginst = new List(), function (arg40_) {
      return seekReadTypeDefOrRef(ctxt, numtypars, boxity, ginst, arg40_);
    })(function (tuple_1) {
      return tuple_1[1];
    }($var23));
  });
}
export function seekReadGenericParams(ctxt, numtypars, a, b) {
  return ctxt.seekReadGenericParams(new GenericParamsIdx(0, [numtypars, a, b]));
}
export function seekReadGenericParamsUncached(ctxtH, _arg1) {
  var arg00_;
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  const pars = seekReadIndexedRows(ctxt.getNumRows(TableNames.GenericParam), function (idx) {
    return seekReadGenericParamRow(ctxt, mdv, idx);
  }, function (tupledArg) {
    return tupledArg[3];
  }, (arg00_ = TaggedIndex[".ctor"](_arg1.data[1], _arg1.data[2]), function (arg10_) {
    return tomdCompare(arg00_, arg10_);
  }), isSorted(ctxt, TableNames.GenericParam), function (tupledArg_1) {
    var Name;
    const flags = ~~tupledArg_1[2] | 0;
    const variance_flags = flags & 3 | 0;
    const variance = variance_flags === 0 ? new ILGenericVariance(0) : variance_flags === 1 ? new ILGenericVariance(1) : variance_flags === 2 ? new ILGenericVariance(2) : new ILGenericVariance(0);
    const constraints = seekReadGenericParamConstraints(ctxt, mdv, _arg1.data[0], tupledArg_1[0]);
    return [tupledArg_1[1], (Name = readStringHeap(ctxt, tupledArg_1[4]), new ILGenericParameterDef(Name, constraints, variance, (flags & 4) !== 0, (flags & 8) !== 0, (flags & 16) !== 0, ctxt.customAttrsReader_GenericParam, tupledArg_1[0]))];
  });
  return map(function (tuple) {
    return tuple[1];
  }, toList(sortWith(($var24, $var25) => compare(function (tuple_1) {
    return tuple_1[0];
  }($var24), function (tuple_1) {
    return tuple_1[0];
  }($var25)), pars)));
}
export function seekReadGenericParamConstraints(ctxt, mdv, numtypars, gpidx) {
  return seekReadIndexedRows(ctxt.getNumRows(TableNames.GenericParamConstraint), function (idx) {
    return seekReadGenericParamConstraintRow(ctxt, mdv, idx);
  }, function (tuple) {
    return tuple[0];
  }, function (idx2) {
    return simpleIndexCompare(gpidx, idx2);
  }, isSorted(ctxt, TableNames.GenericParamConstraint), $var26 => {
    var boxity;
    var ginst;
    return (boxity = new ILBoxity(0), ginst = new List(), function (arg40_) {
      return seekReadTypeDefOrRef(ctxt, numtypars, boxity, ginst, arg40_);
    })(function (tuple_1) {
      return tuple_1[1];
    }($var26));
  });
}
export function seekReadTypeDefAsType(ctxt, boxity, ginst, idx) {
  return ctxt.seekReadTypeDefAsType(new TypeDefAsTypIdx(0, [boxity, ginst, idx]));
}
export function seekReadTypeDefAsTypeUncached(ctxtH, _arg2) {
  const ctxt = getHole(ctxtH);
  return mkILTy(_arg2.data[0], ILTypeSpec.Create(seekReadTypeDefAsTypeRef(ctxt, _arg2.data[2]), _arg2.data[1]));
}
export function seekReadTypeDefAsTypeRef(ctxt, idx) {
  let enc;

  if (seekIsTopTypeDefOfIdx(ctxt, idx)) {
    enc = new List();
  } else {
    const enclIdx = seekReadIndexedRow(ctxt.getNumRows(TableNames.Nested), function (idx_1) {
      return seekReadNestedRow(ctxt, idx_1);
    }, function (tuple) {
      return tuple[0];
    }, function (idx2) {
      return simpleIndexCompare(idx, idx2);
    }, isSorted(ctxt, TableNames.Nested), function (tuple_1) {
      return tuple_1[1];
    }) | 0;
    const tref = seekReadTypeDefAsTypeRef(ctxt, enclIdx);
    enc = append(tref.Enclosing, ofArray([tref.Name]));
  }

  const patternInput = seekReadTypeDefRow(ctxt, idx);
  const nm = readBlobHeapAsTypeName(ctxt, patternInput[1], patternInput[2]);
  return ILTypeRef.Create(new ILScopeRef(0), enc, nm);
}
export function seekReadTypeRef(ctxt, idx) {
  return ctxt.seekReadTypeRef(idx);
}
export function seekReadTypeRefUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  const patternInput = seekReadTypeRefRow(ctxt, mdv, idx);
  const patternInput_1 = seekReadTypeRefScope(ctxt, mdv, patternInput[0]);
  const nm = readBlobHeapAsTypeName(ctxt, patternInput[1], patternInput[2]);
  return ILTypeRef.Create(patternInput_1[0], patternInput_1[1], nm);
}
export function seekReadTypeRefAsType(ctxt, boxity, ginst, idx) {
  return ctxt.seekReadTypeRefAsType(new TypeRefAsTypIdx(0, [boxity, ginst, idx]));
}
export function seekReadTypeRefAsTypeUncached(ctxtH, _arg3) {
  const ctxt = getHole(ctxtH);
  return mkILTy(_arg3.data[0], ILTypeSpec.Create(seekReadTypeRef(ctxt, _arg3.data[2]), _arg3.data[1]));
}
export function seekReadTypeDefOrRef(ctxt, numtypars, boxity, ginst, _arg4) {
  const activePatternResult13843 = _TaggedIndex_(_arg4);

  const mdv = ctxt.mdfile.GetView();

  if (activePatternResult13843[0].Equals(tdor_TypeDef)) {
    return seekReadTypeDefAsType(ctxt, boxity, ginst, activePatternResult13843[1]);
  } else if (activePatternResult13843[0].Equals(tdor_TypeRef)) {
    return seekReadTypeRefAsType(ctxt, boxity, ginst, activePatternResult13843[1]);
  } else if (activePatternResult13843[0].Equals(tdor_TypeSpec)) {
    if (!(ginst.tail == null)) {
      dprintn("type spec used as type constructor for a generic instantiation: ignoring instantiation");
    }

    return readBlobHeapAsType(ctxt, numtypars, seekReadTypeSpecRow(ctxt, mdv, activePatternResult13843[1]));
  } else {
    throw new Error("seekReadTypeDefOrRef ctxt");
  }
}
export function seekReadTypeDefOrRefAsTypeRef(ctxt, _arg5) {
  const activePatternResult13849 = _TaggedIndex_(_arg5);

  if (activePatternResult13849[0].Equals(tdor_TypeDef)) {
    return seekReadTypeDefAsTypeRef(ctxt, activePatternResult13849[1]);
  } else if (activePatternResult13849[0].Equals(tdor_TypeRef)) {
    return seekReadTypeRef(ctxt, activePatternResult13849[1]);
  } else if (activePatternResult13849[0].Equals(tdor_TypeSpec)) {
    dprintn("type spec used where a type ref or def is required");
    return ctxt.ilg.typ_Object.TypeRef;
  } else {
    throw new Error("seekReadTypeDefOrRefAsTypeRef_readTypeDefOrRefOrSpec");
  }
}
export function seekReadMethodRefParent(ctxt, mdv, numtypars, _arg6) {
  const activePatternResult13852 = _TaggedIndex_(_arg6);

  if (activePatternResult13852[0].Equals(mrp_TypeRef)) {
    return seekReadTypeRefAsType(ctxt, new ILBoxity(0), new List(), activePatternResult13852[1]);
  } else if (activePatternResult13852[0].Equals(mrp_ModuleRef)) {
    return mkILTypeForGlobalFunctions(new ILScopeRef(1, seekReadModuleRef(ctxt, mdv, activePatternResult13852[1])));
  } else if (activePatternResult13852[0].Equals(mrp_MethodDef)) {
    const patternInput = seekReadMethodDefAsMethodData(ctxt, activePatternResult13852[1]);
    const mspec = mkILMethSpecInTy(patternInput.data[0], patternInput.data[1], patternInput.data[2], patternInput.data[3], patternInput.data[4], patternInput.data[5]);
    return mspec.DeclaringType;
  } else if (activePatternResult13852[0].Equals(mrp_TypeSpec)) {
    return readBlobHeapAsType(ctxt, numtypars, seekReadTypeSpecRow(ctxt, mdv, activePatternResult13852[1]));
  } else {
    throw new Error("seekReadMethodRefParent");
  }
}
export function seekReadMethodDefOrRef(ctxt, numtypars, _arg7) {
  const activePatternResult13857 = _TaggedIndex_(_arg7);

  if (activePatternResult13857[0].Equals(mdor_MethodDef)) {
    const patternInput = seekReadMethodDefAsMethodData(ctxt, activePatternResult13857[1]);
    return new VarArgMethodData(0, [patternInput.data[0], patternInput.data[1], patternInput.data[2], patternInput.data[3], null, patternInput.data[4], patternInput.data[5]]);
  } else if (activePatternResult13857[0].Equals(mdor_MemberRef)) {
    return seekReadMemberRefAsMethodData(ctxt, numtypars, activePatternResult13857[1]);
  } else {
    throw new Error("seekReadMethodDefOrRef");
  }
}
export function seekReadMethodDefOrRefNoVarargs(ctxt, numtypars, x) {
  const patternInput = seekReadMethodDefOrRef(ctxt, numtypars, x);

  if (!equals(patternInput.data[4], null)) {
    dprintf(printf("ignoring sentinel and varargs in ILMethodDef token signature"));
  }

  return new MethodData(0, [patternInput.data[0], patternInput.data[1], patternInput.data[2], patternInput.data[3], patternInput.data[5], patternInput.data[6]]);
}
export function seekReadCustomAttrType(ctxt, _arg8) {
  const activePatternResult13864 = _TaggedIndex_(_arg8);

  if (activePatternResult13864[0].Equals(cat_MethodDef)) {
    const patternInput = seekReadMethodDefAsMethodData(ctxt, activePatternResult13864[1]);
    return mkILMethSpecInTy(patternInput.data[0], patternInput.data[1], patternInput.data[2], patternInput.data[3], patternInput.data[4], patternInput.data[5]);
  } else if (activePatternResult13864[0].Equals(cat_MemberRef)) {
    const patternInput_1 = seekReadMemberRefAsMethDataNoVarArgs(ctxt, 0, activePatternResult13864[1]);
    return mkILMethSpecInTy(patternInput_1.data[0], patternInput_1.data[1], patternInput_1.data[2], patternInput_1.data[3], patternInput_1.data[4], patternInput_1.data[5]);
  } else {
    throw new Error("seekReadCustomAttrType ctxt");
  }
}
export function seekReadImplAsScopeRef(ctxt, mdv, _arg9) {
  const activePatternResult13867 = _TaggedIndex_(_arg9);

  if (activePatternResult13867[1] === 0) {
    return new ILScopeRef(0);
  } else if (activePatternResult13867[0].Equals(i_File)) {
    return new ILScopeRef(1, seekReadFile(ctxt, mdv, activePatternResult13867[1]));
  } else if (activePatternResult13867[0].Equals(i_AssemblyRef)) {
    return new ILScopeRef(2, seekReadAssemblyRef(ctxt, activePatternResult13867[1]));
  } else if (activePatternResult13867[0].Equals(i_ExportedType)) {
    throw new Error("seekReadImplAsScopeRef");
  } else {
    throw new Error("seekReadImplAsScopeRef");
  }
}
export function seekReadTypeRefScope(ctxt, mdv, _arg10) {
  const activePatternResult13871 = _TaggedIndex_(_arg10);

  if (activePatternResult13871[0].Equals(rs_Module)) {
    return [new ILScopeRef(0), new List()];
  } else if (activePatternResult13871[0].Equals(rs_ModuleRef)) {
    return [new ILScopeRef(1, seekReadModuleRef(ctxt, mdv, activePatternResult13871[1])), new List()];
  } else if (activePatternResult13871[0].Equals(rs_AssemblyRef)) {
    return [new ILScopeRef(2, seekReadAssemblyRef(ctxt, activePatternResult13871[1])), new List()];
  } else if (activePatternResult13871[0].Equals(rs_TypeRef)) {
    const tref = seekReadTypeRef(ctxt, activePatternResult13871[1]);
    return [tref.Scope, append(tref.Enclosing, ofArray([tref.Name]))];
  } else {
    throw new Error("seekReadTypeRefScope");
  }
}
export function seekReadOptionalTypeDefOrRef(ctxt, numtypars, boxity, idx) {
  if (idx.Equals(TaggedIndex[".ctor"](tdor_TypeDef, 0))) {
    return null;
  } else {
    return seekReadTypeDefOrRef(ctxt, numtypars, boxity, new List(), idx);
  }
}
export function seekReadField(ctxt, mdv, numtypars, hasLayout, idx) {
  var rva;
  var arg00_;
  const patternInput = seekReadFieldRow(ctxt, mdv, idx);
  const nm = readStringHeap(ctxt, patternInput[1]);
  const isStatic = (patternInput[0] & 16) !== 0;
  return ILFieldDef.CreateStored(nm, readBlobHeapAsFieldSig(ctxt, numtypars, patternInput[2]), patternInput[0], (patternInput[0] & 256) === 0 ? null : ctxt.pectxtCaptured != null ? (rva = seekReadIndexedRow(ctxt.getNumRows(TableNames.FieldRVA), function (idx_1) {
    return seekReadFieldRVARow(ctxt, mdv, idx_1);
  }, function (tuple) {
    return tuple[1];
  }, function (idx2) {
    return simpleIndexCompare(idx, idx2);
  }, isSorted(ctxt, TableNames.FieldRVA), function (tuple_1) {
    return tuple_1[0];
  }) | 0, rvaToData(ctxt, getValue(ctxt.pectxtCaptured), "field", rva)) : null, (patternInput[0] & 32768) === 0 ? null : seekReadConstant(ctxt, TaggedIndex[".ctor"](hc_FieldDef, idx)), (hasLayout ? !isStatic : false) ? seekReadIndexedRow(ctxt.getNumRows(TableNames.FieldLayout), function (idx_2) {
    return seekReadFieldLayoutRow(ctxt, mdv, idx_2);
  }, function (tuple_2) {
    return tuple_2[1];
  }, function (idx2_1) {
    return simpleIndexCompare(idx, idx2_1);
  }, isSorted(ctxt, TableNames.FieldLayout), function (tuple_3) {
    return tuple_3[0];
  }) : null, (patternInput[0] & 4096) === 0 ? null : seekReadIndexedRow(ctxt.getNumRows(TableNames.FieldMarshal), function (idx_3) {
    return seekReadFieldMarshalRow(ctxt, mdv, idx_3);
  }, function (tuple_4) {
    return tuple_4[0];
  }, (arg00_ = TaggedIndex[".ctor"](hfm_FieldDef, idx), function (arg10_) {
    return hfmCompare(arg00_, arg10_);
  }), isSorted(ctxt, TableNames.FieldMarshal), $var27 => function (blobIdx) {
    return readBlobHeapAsNativeType(ctxt, blobIdx);
  }(function (tuple_5) {
    return tuple_5[1];
  }($var27))), ctxt.customAttrsReader_FieldDef, idx);
}
export function seekReadFields(ctxt, numtypars, hasLayout, fidx1, fidx2) {
  return mkILFieldsLazy(new Lazy(function () {
    const mdv = ctxt.mdfile.GetView();
    return toList(delay(function () {
      return map_1(function (i) {
        return seekReadField(ctxt, mdv, numtypars, hasLayout, i);
      }, range(fidx1, fidx2 - 1));
    }));
  }));
}
export function seekReadMethods(ctxt, numtypars, midx1, midx2) {
  return mkILMethodsComputed(function () {
    const mdv = ctxt.mdfile.GetView();
    return Array.from(delay(function () {
      return map_1(function (i) {
        return seekReadMethod(ctxt, mdv, numtypars, i);
      }, range(midx1, midx2 - 1));
    }));
  });
}
export function sigptrGetTypeDefOrRefOrSpecIdx(bytes, sigptr) {
  const patternInput = sigptrGetZInt32(bytes, sigptr);

  if ((patternInput[0] & 1) === 0) {
    return [TaggedIndex[".ctor"](tdor_TypeDef, op_GreaterGreaterGreaterAmp(patternInput[0], 2)), patternInput[1]];
  } else {
    return [TaggedIndex[".ctor"](tdor_TypeRef, op_GreaterGreaterGreaterAmp(patternInput[0], 2)), patternInput[1]];
  }
}
export function sigptrGetTy(ctxt, numtypars, bytes, sigptr) {
  const patternInput = sigptrGetByte(bytes, sigptr);

  if (patternInput[0] === et_OBJECT) {
    return [ctxt.ilg.typ_Object, patternInput[1]];
  } else if (patternInput[0] === et_STRING) {
    return [ctxt.ilg.typ_String, patternInput[1]];
  } else if (patternInput[0] === et_I1) {
    return [ctxt.ilg.typ_SByte, patternInput[1]];
  } else if (patternInput[0] === et_I2) {
    return [ctxt.ilg.typ_Int16, patternInput[1]];
  } else if (patternInput[0] === et_I4) {
    return [ctxt.ilg.typ_Int32, patternInput[1]];
  } else if (patternInput[0] === et_I8) {
    return [ctxt.ilg.typ_Int64, patternInput[1]];
  } else if (patternInput[0] === et_I) {
    return [ctxt.ilg.typ_IntPtr, patternInput[1]];
  } else if (patternInput[0] === et_U1) {
    return [ctxt.ilg.typ_Byte, patternInput[1]];
  } else if (patternInput[0] === et_U2) {
    return [ctxt.ilg.typ_UInt16, patternInput[1]];
  } else if (patternInput[0] === et_U4) {
    return [ctxt.ilg.typ_UInt32, patternInput[1]];
  } else if (patternInput[0] === et_U8) {
    return [ctxt.ilg.typ_UInt64, patternInput[1]];
  } else if (patternInput[0] === et_U) {
    return [ctxt.ilg.typ_UIntPtr, patternInput[1]];
  } else if (patternInput[0] === et_R4) {
    return [ctxt.ilg.typ_Single, patternInput[1]];
  } else if (patternInput[0] === et_R8) {
    return [ctxt.ilg.typ_Double, patternInput[1]];
  } else if (patternInput[0] === et_CHAR) {
    return [ctxt.ilg.typ_Char, patternInput[1]];
  } else if (patternInput[0] === et_BOOLEAN) {
    return [ctxt.ilg.typ_Bool, patternInput[1]];
  } else if (patternInput[0] === et_WITH) {
    const patternInput_1 = sigptrGetByte(bytes, patternInput[1]);
    const patternInput_2 = sigptrGetTypeDefOrRefOrSpecIdx(bytes, patternInput_1[1]);
    const patternInput_3 = sigptrGetZInt32(bytes, patternInput_2[1]);
    const patternInput_4 = sigptrFold(function (bytes_1, sigptr_1) {
      return sigptrGetTy(ctxt, numtypars, bytes_1, sigptr_1);
    }, patternInput_3[0], bytes, patternInput_3[1]);
    return [seekReadTypeDefOrRef(ctxt, numtypars, patternInput_1[0] === et_CLASS ? new ILBoxity(0) : new ILBoxity(1), patternInput_4[0], patternInput_2[0]), patternInput_4[1]];
  } else if (patternInput[0] === et_CLASS) {
    const patternInput_5 = sigptrGetTypeDefOrRefOrSpecIdx(bytes, patternInput[1]);
    return [seekReadTypeDefOrRef(ctxt, numtypars, new ILBoxity(0), new List(), patternInput_5[0]), patternInput_5[1]];
  } else if (patternInput[0] === et_VALUETYPE) {
    const patternInput_6 = sigptrGetTypeDefOrRefOrSpecIdx(bytes, patternInput[1]);
    return [seekReadTypeDefOrRef(ctxt, numtypars, new ILBoxity(1), new List(), patternInput_6[0]), patternInput_6[1]];
  } else if (patternInput[0] === et_VAR) {
    const patternInput_7 = sigptrGetZInt32(bytes, patternInput[1]);
    return [new ILType(7, patternInput_7[0] & 0xFFFF), patternInput_7[1]];
  } else if (patternInput[0] === et_MVAR) {
    const patternInput_8 = sigptrGetZInt32(bytes, patternInput[1]);
    return [new ILType(7, patternInput_8[0] + numtypars & 0xFFFF), patternInput_8[1]];
  } else if (patternInput[0] === et_BYREF) {
    const patternInput_9 = sigptrGetTy(ctxt, numtypars, bytes, patternInput[1]);
    return [new ILType(5, patternInput_9[0]), patternInput_9[1]];
  } else if (patternInput[0] === et_PTR) {
    const patternInput_10 = sigptrGetTy(ctxt, numtypars, bytes, patternInput[1]);
    return [new ILType(4, patternInput_10[0]), patternInput_10[1]];
  } else if (patternInput[0] === et_SZARRAY) {
    const patternInput_11 = sigptrGetTy(ctxt, numtypars, bytes, patternInput[1]);
    return [mkILArr1DTy(patternInput_11[0]), patternInput_11[1]];
  } else if (patternInput[0] === et_ARRAY) {
    const patternInput_12 = sigptrGetTy(ctxt, numtypars, bytes, patternInput[1]);
    const patternInput_13 = sigptrGetZInt32(bytes, patternInput_12[1]);
    const patternInput_14 = sigptrGetZInt32(bytes, patternInput_13[1]);
    const patternInput_15 = sigptrFold(function (bytes_2, sigptr_2) {
      return sigptrGetZInt32(bytes_2, sigptr_2);
    }, patternInput_14[0], bytes, patternInput_14[1]);
    const patternInput_16 = sigptrGetZInt32(bytes, patternInput_15[1]);
    const patternInput_17 = sigptrFold(function (bytes_3, sigptr_3) {
      return sigptrGetZInt32(bytes_3, sigptr_3);
    }, patternInput_16[0], bytes, patternInput_16[1]);
    let shape;

    const dim = function (i) {
      return [i < patternInput_16[0] ? item(i, patternInput_17[0]) : null, i < patternInput_14[0] ? item(i, patternInput_15[0]) : null];
    };

    shape = new ILArrayShape(0, toList(Array.from(initialize(patternInput_13[0], dim))));
    return [mkILArrTy(patternInput_12[0], shape), patternInput_17[1]];
  } else if (patternInput[0] === et_VOID) {
    return [new ILType(0), patternInput[1]];
  } else if (patternInput[0] === et_TYPEDBYREF) {
    const t = mkILNonGenericValueTy(mkILTyRef(ctxt.ilg.primaryAssemblyScopeRef, "System.TypedReference"));
    return [t, patternInput[1]];
  } else if (patternInput[0] === et_CMOD_REQD ? true : patternInput[0] === et_CMOD_OPT) {
    const patternInput_18 = sigptrGetTypeDefOrRefOrSpecIdx(bytes, patternInput[1]);
    const patternInput_19 = sigptrGetTy(ctxt, numtypars, bytes, patternInput_18[1]);
    return [new ILType(8, [patternInput[0] === et_CMOD_REQD, seekReadTypeDefOrRefAsTypeRef(ctxt, patternInput_18[0]), patternInput_19[0]]), patternInput_19[1]];
  } else if (patternInput[0] === et_FNPTR) {
    const patternInput_20 = sigptrGetByte(bytes, patternInput[1]);
    const patternInput_21 = byteAsCallConv(patternInput_20[0]);

    if (patternInput_21[0]) {
      throw new Error("fptr sig may not be generic");
    }

    const patternInput_22 = sigptrGetZInt32(bytes, patternInput_20[1]);
    const patternInput_23 = sigptrGetTy(ctxt, numtypars, bytes, patternInput_22[1]);
    const patternInput_24 = sigptrFold(function (bytes_4, sigptr_4) {
      return sigptrGetTy(ctxt, numtypars, bytes_4, sigptr_4);
    }, patternInput_22[0], bytes, patternInput_23[1]);
    return [new ILType(6, new ILCallingSignature(patternInput_21[1], patternInput_24[0], patternInput_23[0])), patternInput_24[1]];
  } else if (patternInput[0] === et_SENTINEL) {
    throw new Error("varargs NYI");
  } else {
    return [new ILType(0), patternInput[1]];
  }
}
export function sigptrGetVarArgTys(ctxt, n, numtypars, bytes, sigptr) {
  return sigptrFold(function (bytes_1, sigptr_1) {
    return sigptrGetTy(ctxt, numtypars, bytes_1, sigptr_1);
  }, n, bytes, sigptr);
}
export function sigptrGetArgTys(ctxt, n, numtypars, bytes, sigptr, acc) {
  sigptrGetArgTys: while (true) {
    if (n <= 0) {
      return [[reverse(acc), null], sigptr];
    } else {
      const patternInput = sigptrGetByte(bytes, sigptr);

      if (patternInput[0] === et_SENTINEL) {
        const patternInput_1 = sigptrGetVarArgTys(ctxt, n, numtypars, bytes, patternInput[1]);
        return [[reverse(acc), patternInput_1[0]], patternInput_1[1]];
      } else {
        const patternInput_2 = sigptrGetTy(ctxt, numtypars, bytes, sigptr);
        ctxt = ctxt;
        n = n - 1;
        numtypars = numtypars;
        bytes = bytes;
        sigptr = patternInput_2[1];
        acc = new List(patternInput_2[0], acc);
        continue sigptrGetArgTys;
      }
    }
  }
}
export function sigptrGetLocal(ctxt, numtypars, bytes, sigptr) {
  let patternInput_1;
  const patternInput = sigptrGetByte(bytes, sigptr);

  if (patternInput[0] === et_PINNED) {
    patternInput_1 = [true, patternInput[1]];
  } else {
    patternInput_1 = [false, sigptr];
  }

  const patternInput_2 = sigptrGetTy(ctxt, numtypars, bytes, patternInput_1[1]);
  const loc = new ILLocal(patternInput_2[0], patternInput_1[0], null);
  return [loc, patternInput_2[1]];
}
export function readBlobHeapAsMethodSig(ctxt, numtypars, blobIdx) {
  return ctxt.readBlobHeapAsMethodSig(new BlobAsMethodSigIdx(0, [numtypars, blobIdx]));
}
export function readBlobHeapAsMethodSigUncached(ctxtH, _arg11) {
  const ctxt = getHole(ctxtH);
  const bytes = readBlobHeap(ctxt, _arg11.data[1]);
  const patternInput = sigptrGetByte(bytes, 0);
  const patternInput_1 = byteAsCallConv(patternInput[0]);
  const patternInput_2 = patternInput_1[0] ? sigptrGetZInt32(bytes, patternInput[1]) : [0, patternInput[1]];
  const patternInput_3 = sigptrGetZInt32(bytes, patternInput_2[1]);
  const patternInput_4 = sigptrGetTy(ctxt, _arg11.data[0], bytes, patternInput_3[1]);
  const patternInput_5 = sigptrGetArgTys(ctxt, patternInput_3[0], _arg11.data[0], bytes, patternInput_4[1], new List());
  const varargs = patternInput_5[0][1];
  const argtys = patternInput_5[0][0];
  return [patternInput_1[0], patternInput_2[0], patternInput_1[1], patternInput_4[0], argtys, varargs];
}
export function readBlobHeapAsType(ctxt, numtypars, blobIdx) {
  const bytes = readBlobHeap(ctxt, blobIdx);
  const patternInput = sigptrGetTy(ctxt, numtypars, bytes, 0);
  return patternInput[0];
}
export function readBlobHeapAsFieldSig(ctxt, numtypars, blobIdx) {
  return ctxt.readBlobHeapAsFieldSig(new BlobAsFieldSigIdx(0, [numtypars, blobIdx]));
}
export function readBlobHeapAsFieldSigUncached(ctxtH, _arg12) {
  const ctxt = getHole(ctxtH);
  const bytes = readBlobHeap(ctxt, _arg12.data[1]);
  const patternInput = sigptrGetByte(bytes, 0);

  if (patternInput[0] !== e_IMAGE_CEE_CS_CALLCONV_FIELD) {
    dprintn("warning: field sig was not CC_FIELD");
  }

  const patternInput_1 = sigptrGetTy(ctxt, _arg12.data[0], bytes, patternInput[1]);
  return patternInput_1[0];
}
export function readBlobHeapAsPropertySig(ctxt, numtypars, blobIdx) {
  return ctxt.readBlobHeapAsPropertySig(new BlobAsPropSigIdx(0, [numtypars, blobIdx]));
}
export function readBlobHeapAsPropertySigUncached(ctxtH, _arg13) {
  const ctxt = getHole(ctxtH);
  const bytes = readBlobHeap(ctxt, _arg13.data[1]);
  const patternInput = sigptrGetByte(bytes, 0);
  const hasthis = byteAsHasThis(patternInput[0]);
  const ccMaxked = patternInput[0] & 15;

  if (ccMaxked !== e_IMAGE_CEE_CS_CALLCONV_PROPERTY) {
    dprintn("warning: property sig was " + ccMaxked.toString() + " instead of CC_PROPERTY");
  }

  const patternInput_1 = sigptrGetZInt32(bytes, patternInput[1]);
  const patternInput_2 = sigptrGetTy(ctxt, _arg13.data[0], bytes, patternInput_1[1]);
  const patternInput_3 = sigptrFold(function (bytes_1, sigptr) {
    return sigptrGetTy(ctxt, _arg13.data[0], bytes_1, sigptr);
  }, patternInput_1[0], bytes, patternInput_2[1]);
  return [hasthis, patternInput_2[0], patternInput_3[0]];
}
export function readBlobHeapAsLocalsSig(ctxt, numtypars, blobIdx) {
  return ctxt.readBlobHeapAsLocalsSig(new BlobAsLocalSigIdx(0, [numtypars, blobIdx]));
}
export function readBlobHeapAsLocalsSigUncached(ctxtH, _arg14) {
  const ctxt = getHole(ctxtH);
  const bytes = readBlobHeap(ctxt, _arg14.data[1]);
  const patternInput = sigptrGetByte(bytes, 0);

  if (patternInput[0] !== e_IMAGE_CEE_CS_CALLCONV_LOCAL_SIG) {
    dprintn("warning: local sig was not CC_LOCAL");
  }

  const patternInput_1 = sigptrGetZInt32(bytes, patternInput[1]);
  const patternInput_2 = sigptrFold(function (bytes_1, sigptr) {
    return sigptrGetLocal(ctxt, _arg14.data[0], bytes_1, sigptr);
  }, patternInput_1[0], bytes, patternInput_1[1]);
  return patternInput_2[0];
}
export function byteAsHasThis(b) {
  const hasthis_masked = b & 96;

  if (hasthis_masked === e_IMAGE_CEE_CS_CALLCONV_INSTANCE) {
    return new ILThisConvention(0);
  } else if (hasthis_masked === e_IMAGE_CEE_CS_CALLCONV_INSTANCE_EXPLICIT) {
    return new ILThisConvention(1);
  } else {
    return new ILThisConvention(2);
  }
}
export function byteAsCallConv(b) {
  let cc;
  const ccMaxked = b & 15;

  if (ccMaxked === e_IMAGE_CEE_CS_CALLCONV_FASTCALL) {
    cc = new ILArgConvention(4);
  } else if (ccMaxked === e_IMAGE_CEE_CS_CALLCONV_STDCALL) {
    cc = new ILArgConvention(2);
  } else if (ccMaxked === e_IMAGE_CEE_CS_CALLCONV_THISCALL) {
    cc = new ILArgConvention(3);
  } else if (ccMaxked === e_IMAGE_CEE_CS_CALLCONV_CDECL) {
    cc = new ILArgConvention(1);
  } else if (ccMaxked === e_IMAGE_CEE_CS_CALLCONV_VARARG) {
    cc = new ILArgConvention(5);
  } else {
    cc = new ILArgConvention(0);
  }

  const generic = (b & e_IMAGE_CEE_CS_CALLCONV_GENERIC) !== 0;
  return [generic, new ILCallingConv(0, [byteAsHasThis(b), cc])];
}
export function seekReadMemberRefAsMethodData(ctxt, numtypars, idx) {
  return ctxt.seekReadMemberRefAsMethodData(new MemberRefAsMspecIdx(0, [numtypars, idx]));
}
export function seekReadMemberRefAsMethodDataUncached(ctxtH, _arg15) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  const patternInput = seekReadMemberRefRow(ctxt, mdv, _arg15.data[1]);
  const nm = readStringHeap(ctxt, patternInput[1]);
  const enclTyp = seekReadMethodRefParent(ctxt, mdv, _arg15.data[0], patternInput[0]);
  const patternInput_1 = readBlobHeapAsMethodSig(ctxt, enclTyp.GenericArgs.length, patternInput[2]);
  const minst = initialize_1(patternInput_1[1], function (n) {
    return mkILTyvarTy(_arg15.data[0] + n & 0xFFFF);
  });
  return new VarArgMethodData(0, [enclTyp, patternInput_1[2], nm, patternInput_1[4], patternInput_1[5], patternInput_1[3], minst]);
}
export function seekReadMemberRefAsMethDataNoVarArgs(ctxt, numtypars, idx) {
  const patternInput = seekReadMemberRefAsMethodData(ctxt, numtypars, idx);

  if (patternInput.data[4] != null) {
    dprintf(printf("ignoring sentinel and varargs in ILMethodDef token signature"));
  }

  return new MethodData(0, [patternInput.data[0], patternInput.data[1], patternInput.data[2], patternInput.data[3], patternInput.data[5], patternInput.data[6]]);
}
export function seekReadMethodSpecAsMethodData(ctxt, numtypars, idx) {
  return ctxt.seekReadMethodSpecAsMethodData(new MethodSpecAsMspecIdx(0, [numtypars, idx]));
}
export function seekReadMethodSpecAsMethodDataUncached(ctxtH, _arg16) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  const patternInput = seekReadMethodSpecRow(ctxt, mdv, _arg16.data[1]);
  const patternInput_1 = seekReadMethodDefOrRef(ctxt, _arg16.data[0], patternInput[0]);
  let minst;
  const bytes = readBlobHeap(ctxt, patternInput[1]);
  const patternInput_2 = sigptrGetByte(bytes, 0);

  if (patternInput_2[0] !== e_IMAGE_CEE_CS_CALLCONV_GENERICINST) {
    dprintn("warning: method inst ILCallingConv was " + patternInput_2[0].toString() + " instead of CC_GENERICINST");
  }

  const patternInput_3 = sigptrGetZInt32(bytes, patternInput_2[1]);
  const patternInput_4 = sigptrFold(function (bytes_1, sigptr) {
    return sigptrGetTy(ctxt, _arg16.data[0], bytes_1, sigptr);
  }, patternInput_3[0], bytes, patternInput_3[1]);
  minst = patternInput_4[0];
  return new VarArgMethodData(0, [patternInput_1.data[0], patternInput_1.data[1], patternInput_1.data[2], patternInput_1.data[3], patternInput_1.data[4], patternInput_1.data[5], minst]);
}
export function seekReadMemberRefAsFieldSpec(ctxt, numtypars, idx) {
  return ctxt.seekReadMemberRefAsFieldSpec(new MemberRefAsFspecIdx(0, [numtypars, idx]));
}
export function seekReadMemberRefAsFieldSpecUncached(ctxtH, _arg17) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  const patternInput = seekReadMemberRefRow(ctxt, mdv, _arg17.data[1]);
  const nm = readStringHeap(ctxt, patternInput[1]);
  const enclTyp = seekReadMethodRefParent(ctxt, mdv, _arg17.data[0], patternInput[0]);
  const retty = readBlobHeapAsFieldSig(ctxt, _arg17.data[0], patternInput[2]);
  return mkILFieldSpecInTy(enclTyp, nm, retty);
}
export function seekReadMethodDefAsMethodData(ctxt, idx) {
  return ctxt.seekReadMethodDefAsMethodData(idx);
}
export function seekReadMethodDefAsMethodDataUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  const tidx = seekReadIndexedRow(ctxt.getNumRows(TableNames.TypeDef), function (i) {
    return [i, seekReadTypeDefRowWithExtents(ctxt, i)];
  }, function (r) {
    return r;
  }, function (tupledArg) {
    const methodsIdx = tupledArg[1][0][5] | 0;
    const endMethodsIdx = tupledArg[1][1][1] | 0;

    if (endMethodsIdx <= idx) {
      return 1;
    } else if (methodsIdx <= idx ? idx < endMethodsIdx : false) {
      return 0;
    } else {
      return -1 | 0;
    }
  }, true, function (tuple) {
    return tuple[0];
  }) | 0;
  const typeGenericArgs = seekReadGenericParams(ctxt, 0, tomd_TypeDef, tidx);
  const typeGenericArgsCount = typeGenericArgs.length | 0;
  const methodGenericArgs = seekReadGenericParams(ctxt, typeGenericArgsCount, tomd_MethodDef, idx);
  const finst = mkILFormalGenericArgs(0, typeGenericArgs);
  const minst = mkILFormalGenericArgs(typeGenericArgsCount, methodGenericArgs);
  const enclTyp = seekReadTypeDefAsType(ctxt, new ILBoxity(0), finst, tidx);
  const patternInput = seekReadMethodRow(ctxt, mdv, idx);
  const nm = readStringHeap(ctxt, patternInput[3]);
  const patternInput_1 = readBlobHeapAsMethodSig(ctxt, typeGenericArgsCount, patternInput[4]);

  if (!equals(patternInput_1[5], null)) {
    dprintf(printf("ignoring sentinel and varargs in ILMethodDef token signature"));
  }

  return new MethodData(0, [enclTyp, patternInput_1[2], nm, patternInput_1[4], patternInput_1[3], minst]);
}
export function seekReadFieldDefAsFieldSpec(ctxt, idx) {
  return ctxt.seekReadFieldDefAsFieldSpec(idx);
}
export function seekReadFieldDefAsFieldSpecUncached(ctxtH, idx) {
  const ctxt = getHole(ctxtH);
  const mdv = ctxt.mdfile.GetView();
  const patternInput = seekReadFieldRow(ctxt, mdv, idx);
  const nm = readStringHeap(ctxt, patternInput[1]);
  const tidx = seekReadIndexedRow(ctxt.getNumRows(TableNames.TypeDef), function (i) {
    return [i, seekReadTypeDefRowWithExtents(ctxt, i)];
  }, function (r) {
    return r;
  }, function (tupledArg) {
    const fieldsIdx = tupledArg[1][0][4] | 0;
    const endFieldsIdx = tupledArg[1][1][0] | 0;

    if (endFieldsIdx <= idx) {
      return 1;
    } else if (fieldsIdx <= idx ? idx < endFieldsIdx : false) {
      return 0;
    } else {
      return -1 | 0;
    }
  }, true, function (tuple) {
    return tuple[0];
  }) | 0;
  const retty = readBlobHeapAsFieldSig(ctxt, 0, patternInput[2]);
  const finst = mkILFormalGenericArgs(0, seekReadGenericParams(ctxt, 0, tomd_TypeDef, tidx));
  const enclTyp = seekReadTypeDefAsType(ctxt, new ILBoxity(0), finst, tidx);
  return mkILFieldSpecInTy(enclTyp, nm, retty);
}
export function seekReadMethod(ctxt, mdv, numtypars, idx) {
  const patternInput = seekReadMethodRow(ctxt, mdv, idx);
  const nm = readStringHeap(ctxt, patternInput[3]);
  const abstr = (patternInput[2] & 1024) !== 0;
  const pinvoke = (patternInput[2] & 8192) !== 0;
  const codetype = patternInput[1] & 3 | 0;
  const unmanaged = (patternInput[1] & 4) !== 0;
  const internalcall = (patternInput[1] & 4096) !== 0;
  const noinline = (patternInput[1] & 8) !== 0;
  const aggressiveinline = (patternInput[1] & 256) !== 0;
  const patternInput_1 = readBlobHeapAsMethodSig(ctxt, numtypars, patternInput[4]);

  if (!equals(patternInput_1[5], null)) {
    dprintf(printf("ignoring sentinel and varargs in ILMethodDef signature"));
  }

  let endParamIdx;

  if (idx >= ctxt.getNumRows(TableNames.Method)) {
    endParamIdx = ctxt.getNumRows(TableNames.Param) + 1 | 0;
  } else {
    const patternInput_2 = seekReadMethodRow(ctxt, mdv, idx + 1);
    endParamIdx = patternInput_2[5] | 0;
  }

  const patternInput_3 = seekReadParams(ctxt, mdv, patternInput_1[3], patternInput_1[4], patternInput[5], endParamIdx);
  const isEntryPoint = ctxt.entryPointToken[0].Equals(TableNames.Method) ? ctxt.entryPointToken[1] === idx : false;
  const body = (codetype === 1 ? pinvoke : false) ? methBodyNative : pinvoke ? seekReadImplMap(ctxt, nm, idx) : (((internalcall ? true : abstr) ? true : unmanaged) ? true : codetype !== 0) ? methBodyAbstract : ctxt.pectxtCaptured != null ? seekReadMethodRVA(getValue(ctxt.pectxtCaptured), ctxt, idx, nm, internalcall, noinline, aggressiveinline, numtypars, patternInput[0]) : methBodyNotAvailable;
  return ILMethodDef.CreateStored(nm, patternInput[2], patternInput[1], patternInput_1[2], patternInput_3[1], patternInput_3[0], body, isEntryPoint, seekReadGenericParams(ctxt, numtypars, tomd_MethodDef, idx), ctxt.securityDeclsReader_MethodDef, ctxt.customAttrsReader_MethodDef, idx);
}
export function seekReadParams(ctxt, mdv, retty, argtys, pidx1, pidx2) {
  const retRes = {
    contents: mkILReturn(retty)
  };

  const paramsRes = function (array) {
    return map_2(function (arg00_) {
      return mkILParamAnon(arg00_);
    }, array, Array);
  }(Array.from(argtys));

  for (let i = pidx1; i <= pidx2 - 1; i++) {
    seekReadParamExtras(ctxt, mdv, retRes, paramsRes, i);
  }

  return [retRes.contents, ofArray(paramsRes)];
}
export function seekReadParamExtras(ctxt, mdv, retRes, paramsRes, idx) {
  const patternInput = seekReadParamRow(ctxt, mdv, idx);
  const inOutMasked = patternInput[0] & 255 | 0;
  const hasMarshal = (patternInput[0] & 8192) !== 0;
  const hasDefault = (patternInput[0] & 4096) !== 0;

  const fmReader = function (idx_1) {
    return seekReadIndexedRow(ctxt.getNumRows(TableNames.FieldMarshal), function (idx_2) {
      return seekReadFieldMarshalRow(ctxt, mdv, idx_2);
    }, function (tuple) {
      return tuple[0];
    }, function (arg10_) {
      return hfmCompare(idx_1, arg10_);
    }, isSorted(ctxt, TableNames.FieldMarshal), $var28 => function (blobIdx) {
      return readBlobHeapAsNativeType(ctxt, blobIdx);
    }(function (tuple_1) {
      return tuple_1[1];
    }($var28)));
  };

  if (patternInput[1] === 0) {
    const inputRecord = retRes.contents;
    const Marshal = hasMarshal ? fmReader(TaggedIndex[".ctor"](hfm_ParamDef, idx)) : null;
    retRes.contents = new ILReturn(Marshal, inputRecord.Type, ctxt.customAttrsReader_ParamDef, idx);
  } else if (patternInput[1] > paramsRes.length) {
    dprintn("bad seq num. for param");
  } else {
    const inputRecord_1 = paramsRes[patternInput[1] - 1];
    const Marshal_1 = hasMarshal ? fmReader(TaggedIndex[".ctor"](hfm_ParamDef, idx)) : null;
    const Default = hasDefault ? seekReadConstant(ctxt, TaggedIndex[".ctor"](hc_ParamDef, idx)) : null;
    const Name = readStringHeapOption(ctxt, patternInput[2]);
    const IsIn = (inOutMasked & 1) !== 0;
    const IsOut = (inOutMasked & 2) !== 0;
    const IsOptional = (inOutMasked & 16) !== 0;
    paramsRes[patternInput[1] - 1] = new ILParameter(Name, inputRecord_1.Type, Default, Marshal_1, IsIn, IsOut, IsOptional, ctxt.customAttrsReader_ParamDef, idx);
  }
}
export function seekReadMethodImpls(ctxt, numtypars, tidx) {
  return mkILMethodImplsLazy(new Lazy(function () {
    const mdv = ctxt.mdfile.GetView();
    const mimpls = seekReadIndexedRows(ctxt.getNumRows(TableNames.MethodImpl), function (idx) {
      return seekReadMethodImplRow(ctxt, mdv, idx);
    }, function (tupledArg) {
      return tupledArg[0];
    }, function (idx2) {
      return simpleIndexCompare(tidx, idx2);
    }, isSorted(ctxt, TableNames.MethodImpl), function (tupledArg_1) {
      return [tupledArg_1[1], tupledArg_1[2]];
    });
    return map(function (tupledArg_2) {
      var patternInput_1;
      var mspec;
      let OverrideBy;
      const patternInput = seekReadMethodDefOrRefNoVarargs(ctxt, numtypars, tupledArg_2[0]);
      OverrideBy = mkILMethSpecInTy(patternInput.data[0], patternInput.data[1], patternInput.data[2], patternInput.data[3], patternInput.data[4], patternInput.data[5]);
      return new ILMethodImplDef((patternInput_1 = seekReadMethodDefOrRefNoVarargs(ctxt, numtypars, tupledArg_2[1]), mspec = mkILMethSpecInTy(patternInput_1.data[0], patternInput_1.data[1], patternInput_1.data[2], patternInput_1.data[3], patternInput_1.data[4], patternInput_1.data[5]), new ILOverridesSpec(0, [mspec.MethodRef, mspec.DeclaringType])), OverrideBy);
    }, mimpls);
  }));
}
export function seekReadMultipleMethodSemantics(ctxt, flags, id) {
  return map(function (tuple) {
    return tuple[1];
  }, filter(function (tupledArg) {
    return flags === tupledArg[0];
  }, seekReadIndexedRows(ctxt.getNumRows(TableNames.MethodSemantics), function (idx) {
    return seekReadMethodSemanticsRow(ctxt, idx);
  }, function (tupledArg_1) {
    return tupledArg_1[2];
  }, function (arg10_) {
    return hsCompare(id, arg10_);
  }, isSorted(ctxt, TableNames.MethodSemantics), function (tupledArg_2) {
    const patternInput = seekReadMethodDefAsMethodData(ctxt, tupledArg_2[1]);
    return [tupledArg_2[0], mkILMethSpecInTy(patternInput.data[0], patternInput.data[1], patternInput.data[2], patternInput.data[3], patternInput.data[4], patternInput.data[5]).MethodRef];
  })));
}
export function seekReadoptional_MethodSemantics(ctxt, id_0, id_1) {
  const id = [id_0, id_1];
  const matchValue = seekReadMultipleMethodSemantics(ctxt, id[0], id[1]);

  if (matchValue.tail != null) {
    if (matchValue.tail.tail == null) {
      return matchValue.head;
    } else {
      dprintn("multiple method semantics found");
      return matchValue.head;
    }
  } else {
    return null;
  }
}
export function seekReadMethodSemantics(ctxt, id_0, id_1) {
  const id = [id_0, id_1];
  const matchValue = seekReadoptional_MethodSemantics(ctxt, id[0], id[1]);

  if (matchValue != null) {
    return getValue(matchValue);
  } else {
    throw new Error("seekReadMethodSemantics ctxt: no method found");
  }
}
export function seekReadEvent(ctxt, mdv, numtypars, idx) {
  const patternInput = seekReadEventRow(ctxt, mdv, idx);
  return ILEventDef.CreateStored(seekReadOptionalTypeDefOrRef(ctxt, numtypars, new ILBoxity(0), patternInput[2]), readStringHeap(ctxt, patternInput[1]), patternInput[0], seekReadMethodSemantics(ctxt, 8, TaggedIndex[".ctor"](hs_Event, idx)), seekReadMethodSemantics(ctxt, 16, TaggedIndex[".ctor"](hs_Event, idx)), seekReadoptional_MethodSemantics(ctxt, 32, TaggedIndex[".ctor"](hs_Event, idx)), seekReadMultipleMethodSemantics(ctxt, 4, TaggedIndex[".ctor"](hs_Event, idx)), ctxt.customAttrsReader_Event, idx);
}
export function seekReadEvents(ctxt, numtypars, tidx) {
  return mkILEventsLazy(new Lazy(function () {
    const mdv = ctxt.mdfile.GetView();
    const matchValue = seekReadOptionalIndexedRow(ctxt.getNumRows(TableNames.EventMap), function (i) {
      return [i, seekReadEventMapRow(ctxt, mdv, i)];
    }, function (tupledArg) {
      return tupledArg[1][0];
    }, function (e2) {
      return comparePrimitives(tidx, e2);
    }, false, function (tupledArg_1) {
      return [tupledArg_1[0], tupledArg_1[1][1]];
    });

    if (matchValue != null) {
      const rowNum = getValue(matchValue)[0] | 0;
      const beginEventIdx = getValue(matchValue)[1] | 0;
      let endEventIdx;

      if (rowNum >= ctxt.getNumRows(TableNames.EventMap)) {
        endEventIdx = ctxt.getNumRows(TableNames.Event) + 1 | 0;
      } else {
        const patternInput = seekReadEventMapRow(ctxt, mdv, rowNum + 1);
        endEventIdx = patternInput[1] | 0;
      }

      return toList(delay(function () {
        return map_1(function (i_1) {
          return seekReadEvent(ctxt, mdv, numtypars, i_1);
        }, range(beginEventIdx, endEventIdx - 1));
      }));
    } else {
      return new List();
    }
  }));
}
export function seekReadProperty(ctxt, mdv, numtypars, idx) {
  const patternInput = seekReadPropertyRow(ctxt, mdv, idx);
  const patternInput_1 = readBlobHeapAsPropertySig(ctxt, numtypars, patternInput[2]);
  const setter = seekReadoptional_MethodSemantics(ctxt, 1, TaggedIndex[".ctor"](hs_Property, idx));
  const getter = seekReadoptional_MethodSemantics(ctxt, 2, TaggedIndex[".ctor"](hs_Property, idx));
  const cc2 = getter == null ? setter == null ? patternInput_1[0] : getValue(setter).CallingConv.ThisConv : getValue(getter).CallingConv.ThisConv;
  return ILPropertyDef.CreateStored(readStringHeap(ctxt, patternInput[1]), patternInput[0], setter, getter, cc2, patternInput_1[1], (patternInput[0] & 4096) === 0 ? null : seekReadConstant(ctxt, TaggedIndex[".ctor"](hc_Property, idx)), patternInput_1[2], ctxt.customAttrsReader_Property, idx);
}
export function seekReadProperties(ctxt, numtypars, tidx) {
  return mkILPropertiesLazy(new Lazy(function () {
    const mdv = ctxt.mdfile.GetView();
    const matchValue = seekReadOptionalIndexedRow(ctxt.getNumRows(TableNames.PropertyMap), function (i) {
      return [i, seekReadPropertyMapRow(ctxt, mdv, i)];
    }, function (tupledArg) {
      return tupledArg[1][0];
    }, function (e2) {
      return comparePrimitives(tidx, e2);
    }, false, function (tupledArg_1) {
      return [tupledArg_1[0], tupledArg_1[1][1]];
    });

    if (matchValue != null) {
      const rowNum = getValue(matchValue)[0] | 0;
      const beginPropIdx = getValue(matchValue)[1] | 0;
      let endPropIdx;

      if (rowNum >= ctxt.getNumRows(TableNames.PropertyMap)) {
        endPropIdx = ctxt.getNumRows(TableNames.Property) + 1 | 0;
      } else {
        const patternInput = seekReadPropertyMapRow(ctxt, mdv, rowNum + 1);
        endPropIdx = patternInput[1] | 0;
      }

      return toList(delay(function () {
        return map_1(function (i_1) {
          return seekReadProperty(ctxt, mdv, numtypars, i_1);
        }, range(beginPropIdx, endPropIdx - 1));
      }));
    } else {
      return new List();
    }
  }));
}
export function customAttrsReader(ctxtH, tag) {
  return mkILCustomAttrsReader(function (idx) {
    var arg00_;
    const ctxt = getHole(ctxtH);
    return Array.from(seekReadIndexedRows(ctxt.getNumRows(TableNames.CustomAttribute), function (idx_1) {
      return seekReadCustomAttributeRow(ctxt, idx_1);
    }, function (tupledArg) {
      return tupledArg[0];
    }, (arg00_ = TaggedIndex[".ctor"](tag, idx), function (arg10_) {
      return hcaCompare(arg00_, arg10_);
    }), isSorted(ctxt, TableNames.CustomAttribute), function (tupledArg_1) {
      return seekReadCustomAttr(ctxt, tupledArg_1[1], tupledArg_1[2]);
    }));
  });
}
export function seekReadCustomAttr(ctxt, _arg18, b) {
  const activePatternResult14041 = _TaggedIndex_(_arg18);

  return ctxt.seekReadCustomAttr(new CustomAttrIdx(0, [activePatternResult14041[0], activePatternResult14041[1], b]));
}
export function seekReadCustomAttrUncached(ctxtH, _arg19) {
  var matchValue;
  const ctxt = getHole(ctxtH);
  return new ILAttribute(seekReadCustomAttrType(ctxt, TaggedIndex[".ctor"](_arg19.data[0], _arg19.data[1])), (matchValue = readBlobHeapOption(ctxt, _arg19.data[2]), matchValue == null ? Bytes.ofInt32Array(new Int32Array([])) : getValue(matchValue)), new List());
}
export function securityDeclsReader(ctxtH, tag) {
  return mkILSecurityDeclsReader(function (idx) {
    var arg00_;
    const ctxt = getHole(ctxtH);
    const mdv = ctxt.mdfile.GetView();
    return Array.from(seekReadIndexedRows(ctxt.getNumRows(TableNames.Permission), function (idx_1) {
      return seekReadPermissionRow(ctxt, mdv, idx_1);
    }, function (tupledArg) {
      return tupledArg[1];
    }, (arg00_ = TaggedIndex[".ctor"](tag, idx), function (arg10_) {
      return hdsCompare(arg00_, arg10_);
    }), isSorted(ctxt, TableNames.Permission), function (tupledArg_1) {
      return seekReadSecurityDecl(ctxt, tupledArg_1[0], tupledArg_1[2]);
    }));
  });
}
export function seekReadSecurityDecl(ctxt, act, ty) {
  return new ILSecurityDecl(0, [List_1.memAssoc(~~act, Lazy_1.force(ILSecurityActionRevMap)) ? List_1.assoc(~~act, Lazy_1.force(ILSecurityActionRevMap)) : (() => {
    throw new Error("unknown security action");
  })(), readBlobHeap(ctxt, ty)]);
}
export function seekReadConstant(ctxt, idx) {
  const patternInput = seekReadIndexedRow(ctxt.getNumRows(TableNames.Constant), function (idx_1) {
    return seekReadConstantRow(ctxt, idx_1);
  }, function (tupledArg) {
    return tupledArg[1];
  }, function (arg10_) {
    return hcCompare(idx, arg10_);
  }, isSorted(ctxt, TableNames.Constant), function (tupledArg_1) {
    return [tupledArg_1[0], tupledArg_1[2]];
  });

  if (patternInput[0] === et_STRING) {
    const blobHeap = readBlobHeap(ctxt, patternInput[1]);
    const s = System.Text.Encoding.Unicode.GetString(blobHeap, 0, blobHeap.length);
    return new ILFieldInit(0, s);
  } else if (patternInput[0] === et_BOOLEAN) {
    return new ILFieldInit(1, readBlobHeapAsBool(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_CHAR) {
    return new ILFieldInit(2, readBlobHeapAsUInt16(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_I1) {
    return new ILFieldInit(3, readBlobHeapAsSByte(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_I2) {
    return new ILFieldInit(4, readBlobHeapAsInt16(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_I4) {
    return new ILFieldInit(5, readBlobHeapAsInt32(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_I8) {
    return new ILFieldInit(6, readBlobHeapAsInt64(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_U1) {
    return new ILFieldInit(7, readBlobHeapAsByte(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_U2) {
    return new ILFieldInit(8, readBlobHeapAsUInt16(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_U4) {
    return new ILFieldInit(9, readBlobHeapAsUInt32(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_U8) {
    return new ILFieldInit(10, readBlobHeapAsUInt64(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_R4) {
    return new ILFieldInit(11, readBlobHeapAsSingle(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_R8) {
    return new ILFieldInit(12, readBlobHeapAsDouble(ctxt, patternInput[1]));
  } else if (patternInput[0] === et_CLASS ? true : patternInput[0] === et_OBJECT) {
    return new ILFieldInit(13);
  } else {
    return new ILFieldInit(13);
  }
}
export function seekReadImplMap(ctxt, nm, midx) {
  return mkMethBodyLazyAux(new Lazy(function () {
    var arg00_;
    var NoMangle;
    var LastError;
    var Name;
    var matchValue;
    const mdv = ctxt.mdfile.GetView();
    const patternInput = seekReadIndexedRow(ctxt.getNumRows(TableNames.ImplMap), function (idx) {
      return seekReadImplMapRow(ctxt, mdv, idx);
    }, function (tupledArg) {
      return tupledArg[1];
    }, (arg00_ = TaggedIndex[".ctor"](mf_MethodDef, midx), function (arg10_) {
      return mfCompare(arg00_, arg10_);
    }), isSorted(ctxt, TableNames.ImplMap), function (tupledArg_1) {
      return [tupledArg_1[0], tupledArg_1[2], tupledArg_1[3]];
    });
    let cc;
    const masked = patternInput[0] & 1792 | 0;

    if (masked === 0) {
      cc = new PInvokeCallingConvention(0);
    } else if (masked === 512) {
      cc = new PInvokeCallingConvention(1);
    } else if (masked === 768) {
      cc = new PInvokeCallingConvention(2);
    } else if (masked === 1024) {
      cc = new PInvokeCallingConvention(3);
    } else if (masked === 1280) {
      cc = new PInvokeCallingConvention(4);
    } else if (masked === 256) {
      cc = new PInvokeCallingConvention(5);
    } else {
      dprintn("strange CallingConv");
      cc = new PInvokeCallingConvention(0);
    }

    let enc;
    const masked_1 = patternInput[0] & 6 | 0;

    if (masked_1 === 0) {
      enc = new PInvokeCharEncoding(0);
    } else if (masked_1 === 2) {
      enc = new PInvokeCharEncoding(1);
    } else if (masked_1 === 4) {
      enc = new PInvokeCharEncoding(2);
    } else if (masked_1 === 6) {
      enc = new PInvokeCharEncoding(3);
    } else {
      dprintn("strange CharEncoding");
      enc = new PInvokeCharEncoding(0);
    }

    let bestfit;
    const masked_2 = patternInput[0] & 48 | 0;

    if (masked_2 === 0) {
      bestfit = new PInvokeCharBestFit(0);
    } else if (masked_2 === 16) {
      bestfit = new PInvokeCharBestFit(1);
    } else if (masked_2 === 32) {
      bestfit = new PInvokeCharBestFit(2);
    } else {
      dprintn("strange CharBestFit");
      bestfit = new PInvokeCharBestFit(0);
    }

    let unmap;
    const masked_3 = patternInput[0] & 12288 | 0;

    if (masked_3 === 0) {
      unmap = new PInvokeThrowOnUnmappableChar(0);
    } else if (masked_3 === 4096) {
      unmap = new PInvokeThrowOnUnmappableChar(1);
    } else if (masked_3 === 8192) {
      unmap = new PInvokeThrowOnUnmappableChar(2);
    } else {
      dprintn("strange ThrowOnUnmappableChar");
      unmap = new PInvokeThrowOnUnmappableChar(0);
    }

    return new MethodBody(1, (NoMangle = (patternInput[0] & 1) !== 0, LastError = (patternInput[0] & 64) !== 0, Name = (matchValue = readStringHeapOption(ctxt, patternInput[1]), matchValue != null ? getValue(matchValue) : nm), new PInvokeMethod(seekReadModuleRef(ctxt, mdv, patternInput[2]), Name, cc, enc, NoMangle, LastError, unmap, bestfit)));
  }));
}
export function seekReadTopCode(ctxt, pev, mdv, numtypars, sz, start, seqpoints) {
  const labelsOfRawOffsets = new Map();
  const ilOffsetsOfLabels = new Map();

  const tryRawToLabel = function (rawOffset) {
    if (labelsOfRawOffsets.has(rawOffset)) {
      return labelsOfRawOffsets.get(rawOffset);
    } else {
      return null;
    }
  };

  const rawToLabel = function (rawOffset_1) {
    const matchValue = tryRawToLabel(rawOffset_1);

    if (matchValue == null) {
      const lab = generateCodeLabel() | 0;
      labelsOfRawOffsets.set(rawOffset_1, lab);
      return lab | 0;
    } else {
      return getValue(matchValue) | 0;
    }
  };

  const markAsInstructionStart = function (rawOffset_2, ilOffset) {
    const lab_1 = rawToLabel(rawOffset_2) | 0;
    ilOffsetsOfLabels.set(lab_1, ilOffset);
  };

  const ibuf = [];
  const curr = {
    contents: 0
  };
  const prefixes = new ILInstrPrefixesRegister(new ILAlignment(0), new ILTailcall(1), new ILVolatility(1), new ILReadonly(1), null);
  const lastb = {
    contents: 0
  };
  const lastb2 = {
    contents: 0
  };
  const b = {
    contents: 0
  };

  const get = function () {
    lastb.contents = seekReadByteAsInt32(pev, start + curr.contents) | 0;
    void curr.contents++;

    if (lastb.contents === 254 ? curr.contents < sz : false) {
      lastb2.contents = seekReadByteAsInt32(pev, start + curr.contents) | 0;
      void curr.contents++;
      b.contents = lastb2.contents | 0;
    } else {
      b.contents = lastb.contents | 0;
    }
  };

  const seqPointsRemaining = {
    contents: seqpoints
  };

  while (curr.contents < sz) {
    markAsInstructionStart(curr.contents, ibuf.length);

    while ((() => {
      var i;

      var _tag;

      const matchValue_1 = seqPointsRemaining.contents;
      const $var29 = matchValue_1.tail != null ? (i = matchValue_1.head[0] | 0, _tag = matchValue_1.head[1], i <= curr.contents) ? [0, matchValue_1.tail, matchValue_1.head[1], matchValue_1.head[0]] : [1] : [1];

      switch ($var29[0]) {
        case 0:
          return true;

        case 1:
          return false;
      }
    })()) {
      const patternInput = seqPointsRemaining.contents.head;
      seqPointsRemaining.contents = seqPointsRemaining.contents.tail;
      ibuf.push(new ILInstr(89, patternInput[1]));
    }

    prefixes.al = new ILAlignment(0);
    prefixes.tl = new ILTailcall(1);
    prefixes.vol = new ILVolatility(1);
    prefixes.ro = new ILReadonly(1);
    prefixes.constrained = null;
    get();

    while ((curr.contents < sz ? lastb.contents === 254 : false) ? (((b.contents === (i_constrained & 255) ? true : b.contents === (i_readonly & 255)) ? true : b.contents === (i_unaligned & 255)) ? true : b.contents === (i_volatile & 255)) ? true : b.contents === (i_tail & 255) : false) {
      if (b.contents === (i_unaligned & 255)) {
        const unal = seekReadByteAsInt32(pev, start + curr.contents) | 0;
        void curr.contents++;

        if (unal === 1) {
          prefixes.al = new ILAlignment(1);
        } else if (unal === 2) {
          prefixes.al = new ILAlignment(2);
        } else if (unal === 4) {
          prefixes.al = new ILAlignment(3);
        } else {
          dprintn("bad alignment for unaligned");
          prefixes.al = new ILAlignment(0);
        }
      } else if (b.contents === (i_volatile & 255)) {
        prefixes.vol = new ILVolatility(0);
      } else if (b.contents === (i_readonly & 255)) {
        prefixes.ro = new ILReadonly(0);
      } else if (b.contents === (i_constrained & 255)) {
        const uncoded = seekReadUncodedToken(pev, start + curr.contents);
        curr.contents = curr.contents + 4 | 0;
        const typ = seekReadTypeDefOrRef(ctxt, numtypars, new ILBoxity(0), new List(), uncodedTokenToTypeDefOrRefOrSpec(uncoded[0], uncoded[1]));
        prefixes.constrained = typ;
      } else {
        prefixes.tl = new ILTailcall(0);
      }

      get();
    }

    if (curr.contents <= sz) {
      const idecoder = lastb.contents === 254 ? getTwoByteInstr(lastb2.contents) : getOneByteInstr(lastb.contents);
      let instr;

      switch (idecoder.tag) {
        case 1:
          const x = seekReadUInt16(pev, start + curr.contents);
          curr.contents = curr.contents + 2 | 0;
          instr = idecoder.data(prefixes, x);
          break;

        case 2:
          instr = idecoder.data(prefixes);
          break;

        case 3:
          const x_1 = seekReadInt64(pev, start + curr.contents);
          curr.contents = curr.contents + 8 | 0;
          instr = idecoder.data(prefixes, x_1);
          break;

        case 5:
          const x_2 = seekReadSByte(pev, start + curr.contents) | 0;
          curr.contents = curr.contents + 1 | 0;
          instr = idecoder.data(prefixes, x_2);
          break;

        case 4:
          const x_3 = seekReadInt32(pev, start + curr.contents) | 0;
          curr.contents = curr.contents + 4 | 0;
          instr = idecoder.data(prefixes, x_3);
          break;

        case 6:
          const x_4 = seekReadSingle(pev, start + curr.contents);
          curr.contents = curr.contents + 4 | 0;
          instr = idecoder.data(prefixes, x_4);
          break;

        case 7:
          const x_5 = seekReadDouble(pev, start + curr.contents);
          curr.contents = curr.contents + 8 | 0;
          instr = idecoder.data(prefixes, x_5);
          break;

        case 8:
          const patternInput_1 = seekReadUncodedToken(pev, start + curr.contents);
          curr.contents = curr.contents + 4 | 0;
          let fspec;

          if (patternInput_1[0].Equals(TableNames.Field)) {
            fspec = seekReadFieldDefAsFieldSpec(ctxt, patternInput_1[1]);
          } else if (patternInput_1[0].Equals(TableNames.MemberRef)) {
            fspec = seekReadMemberRefAsFieldSpec(ctxt, numtypars, patternInput_1[1]);
          } else {
            throw new Error("bad table in FieldDefOrRef");
          }

          instr = idecoder.data(prefixes, fspec);
          break;

        case 9:
          const patternInput_2 = seekReadUncodedToken(pev, start + curr.contents);
          curr.contents = curr.contents + 4 | 0;
          let patternInput_3;

          if (patternInput_2[0].Equals(TableNames.Method)) {
            patternInput_3 = seekReadMethodDefOrRef(ctxt, numtypars, TaggedIndex[".ctor"](mdor_MethodDef, patternInput_2[1]));
          } else if (patternInput_2[0].Equals(TableNames.MemberRef)) {
            patternInput_3 = seekReadMethodDefOrRef(ctxt, numtypars, TaggedIndex[".ctor"](mdor_MemberRef, patternInput_2[1]));
          } else if (patternInput_2[0].Equals(TableNames.MethodSpec)) {
            patternInput_3 = seekReadMethodSpecAsMethodData(ctxt, numtypars, patternInput_2[1]);
          } else {
            throw new Error("bad table in MethodDefOrRefOrSpec");
          }

          if (patternInput_3.data[0].tag === 1) {
            switch (patternInput_3.data[2]) {
              case "Get":
                instr = new ILInstr(81, [patternInput_3.data[0].data[0], patternInput_3.data[0].data[1]]);
                break;

              case "Set":
                instr = new ILInstr(82, [patternInput_3.data[0].data[0], patternInput_3.data[0].data[1]]);
                break;

              case "Address":
                instr = new ILInstr(80, [prefixes.ro, false, patternInput_3.data[0].data[0], patternInput_3.data[0].data[1]]);
                break;

              case ".ctor":
                instr = new ILInstr(83, [patternInput_3.data[0].data[0], patternInput_3.data[0].data[1]]);
                break;

              default:
                throw new Error("bad method on array type");
            }
          } else {
            const mspec = mkILMethSpecInTy(patternInput_3.data[0], patternInput_3.data[1], patternInput_3.data[2], patternInput_3.data[3], patternInput_3.data[5], patternInput_3.data[6]);
            instr = idecoder.data(prefixes, [mspec, patternInput_3.data[4]]);
          }

          break;

        case 18:
          const uncoded_1 = seekReadUncodedToken(pev, start + curr.contents);
          curr.contents = curr.contents + 4 | 0;
          const typ_1 = seekReadTypeDefOrRef(ctxt, numtypars, new ILBoxity(0), new List(), uncodedTokenToTypeDefOrRefOrSpec(uncoded_1[0], uncoded_1[1]));
          instr = idecoder.data(prefixes, typ_1);
          break;

        case 14:
          const patternInput_4 = seekReadUncodedToken(pev, start + curr.contents);
          curr.contents = curr.contents + 4 | 0;

          if (!patternInput_4[0].Equals(TableNames.UserStrings)) {
            dprintn("warning: bad table in user string for ldstr");
          }

          instr = idecoder.data(prefixes, readUserStringHeap(ctxt, patternInput_4[1]));
          break;

        case 12:
          const offsDest = seekReadInt32(pev, start + curr.contents) | 0;
          curr.contents = curr.contents + 4 | 0;
          const dest = curr.contents + offsDest | 0;
          instr = idecoder.data(prefixes, rawToLabel(dest));
          break;

        case 13:
          const offsDest_1 = seekReadSByte(pev, start + curr.contents) | 0;
          curr.contents = curr.contents + 1 | 0;
          const dest_1 = curr.contents + offsDest_1 | 0;
          instr = idecoder.data(prefixes, rawToLabel(dest_1));
          break;

        case 10:
          const offsDest_2 = seekReadInt32(pev, start + curr.contents) | 0;
          curr.contents = curr.contents + 4 | 0;
          const dest_2 = curr.contents + offsDest_2 | 0;
          instr = idecoder.data(prefixes, rawToLabel(dest_2));
          break;

        case 11:
          const offsDest_3 = seekReadSByte(pev, start + curr.contents) | 0;
          curr.contents = curr.contents + 1 | 0;
          const dest_3 = curr.contents + offsDest_3 | 0;
          instr = idecoder.data(prefixes, rawToLabel(dest_3));
          break;

        case 19:
          dprintn("invalid instruction: " + lastb.contents.toString() + (lastb.contents === 254 ? ", " + lastb2.contents.toString() : ""));
          instr = new ILInstr(47);
          break;

        case 16:
          const patternInput_5 = seekReadUncodedToken(pev, start + curr.contents);
          curr.contents = curr.contents + 4 | 0;
          let token_info;

          if (patternInput_5[0].Equals(TableNames.Method) ? true : patternInput_5[0].Equals(TableNames.MemberRef)) {
            const patternInput_6 = seekReadMethodDefOrRefNoVarargs(ctxt, numtypars, uncodedTokenToMethodDefOrRef(patternInput_5[0], patternInput_5[1]));
            token_info = new ILToken(1, mkILMethSpecInTy(patternInput_6.data[0], patternInput_6.data[1], patternInput_6.data[2], patternInput_6.data[3], patternInput_6.data[4], patternInput_6.data[5]));
          } else if (patternInput_5[0].Equals(TableNames.Field)) {
            token_info = new ILToken(2, seekReadFieldDefAsFieldSpec(ctxt, patternInput_5[1]));
          } else if ((patternInput_5[0].Equals(TableNames.TypeDef) ? true : patternInput_5[0].Equals(TableNames.TypeRef)) ? true : patternInput_5[0].Equals(TableNames.TypeSpec)) {
            token_info = new ILToken(0, seekReadTypeDefOrRef(ctxt, numtypars, new ILBoxity(0), new List(), uncodedTokenToTypeDefOrRefOrSpec(patternInput_5[0], patternInput_5[1])));
          } else {
            throw new Error("bad token for ldtoken");
          }

          instr = idecoder.data(prefixes, token_info);
          break;

        case 17:
          const patternInput_7 = seekReadUncodedToken(pev, start + curr.contents);
          curr.contents = curr.contents + 4 | 0;

          if (!patternInput_7[0].Equals(TableNames.StandAloneSig)) {
            dprintn("strange table for callsig token");
          }

          const patternInput_8 = readBlobHeapAsMethodSig(ctxt, numtypars, seekReadStandAloneSigRow(ctxt, mdv, patternInput_7[1]));

          if (patternInput_8[0]) {
            throw new Error("bad image: a generic method signature is begin used at a calli instruction");
          }

          instr = idecoder.data(prefixes, [mkILCallSig(patternInput_8[2], patternInput_8[4], patternInput_8[3]), patternInput_8[5]]);
          break;

        case 15:
          const n = seekReadInt32(pev, start + curr.contents) | 0;
          curr.contents = curr.contents + 4 | 0;
          const offsets = initialize_1(n, function (_arg33) {
            const i_1 = seekReadInt32(pev, start + curr.contents) | 0;
            curr.contents = curr.contents + 4 | 0;
            return i_1 | 0;
          });
          const dests = map(function (offs) {
            return rawToLabel(curr.contents + offs);
          }, offsets);
          instr = idecoder.data(prefixes, dests);
          break;

        default:
          const x_6 = seekReadByte(pev, start + curr.contents);
          curr.contents = curr.contents + 1 | 0;
          instr = idecoder.data(prefixes, x_6);
      }

      ibuf.push(instr);
    }
  }

  markAsInstructionStart(curr.contents, ibuf.length);

  const raw2nextLab = function (rawOffset_3) {
    const isInstrStart = function (x_7) {
      const matchValue_2 = tryRawToLabel(x_7);

      if (matchValue_2 != null) {
        return ilOffsetsOfLabels.has(getValue(matchValue_2));
      } else {
        return false;
      }
    };

    if (isInstrStart(rawOffset_3)) {
      return rawToLabel(rawOffset_3) | 0;
    } else if (isInstrStart(rawOffset_3 + 1)) {
      return rawToLabel(rawOffset_3 + 1) | 0;
    } else {
      throw new Error("the bytecode raw offset " + rawOffset_3.toString() + " did not refer either to the start or end of an instruction");
    }
  };

  const instrs_1 = Array.from(ibuf);
  return [instrs_1, rawToLabel, ilOffsetsOfLabels, raw2nextLab];
}
export function seekReadMethodRVA(pectxt, ctxt, _idx, nm, _internalcall, noinline, aggressiveinline, numtypars, rva) {
  return mkMethBodyLazyAux(new Lazy(function () {
    var Locals;
    const pev = pectxt.pefile.GetView();
    const mdv = ctxt.mdfile.GetView();
    const patternInput = [new List(), null, new List()];
    const seqpoints = patternInput[2];
    const methRangePdbInfo = patternInput[1];
    const localPdbInfos = patternInput[0];
    const baseRVA = pectxt.anyV2P(["method rva", rva]) | 0;
    const b = seekReadByte(pev, baseRVA);

    if ((b & e_CorILMethod_FormatMask) === e_CorILMethod_TinyFormat) {
      const codeBase = baseRVA + 1 | 0;
      const codeSize = op_GreaterGreaterGreaterAmp(~~b, 2) | 0;
      const patternInput_1 = seekReadTopCode(ctxt, pev, mdv, numtypars, codeSize, codeBase, seqpoints);
      const localPdbInfos2 = map(function (f) {
        return f(patternInput_1[3]);
      }, localPdbInfos);
      const code = buildILCode(nm, patternInput_1[2], patternInput_1[0], new List(), localPdbInfos2);
      return new MethodBody(0, (Locals = new List(), new ILMethodBody(false, 8, noinline, aggressiveinline, Locals, code, methRangePdbInfo)));
    } else if ((b & e_CorILMethod_FormatMask) === e_CorILMethod_FatFormat) {
      const hasMoreSections = (b & e_CorILMethod_MoreSects) !== 0;
      const initlocals = (b & e_CorILMethod_InitLocals) !== 0;
      const maxstack = seekReadUInt16AsInt32(pev, baseRVA + 2) | 0;
      const codeSize_1 = seekReadInt32(pev, baseRVA + 4) | 0;
      const patternInput_2 = seekReadUncodedToken(pev, baseRVA + 8);
      const codeBase_1 = baseRVA + 12 | 0;
      let locals;

      if (patternInput_2[1] === 0) {
        locals = new List();
      } else {
        if (!patternInput_2[0].Equals(TableNames.StandAloneSig)) {
          dprintn("strange table for locals token");
        }

        locals = readBlobHeapAsLocalsSig(ctxt, numtypars, seekReadStandAloneSigRow(ctxt, pev, patternInput_2[1]));
      }

      const patternInput_3 = seekReadTopCode(ctxt, pev, mdv, numtypars, codeSize_1, codeBase_1, seqpoints);
      const nextSectionBase = {
        contents: align(4, codeBase_1 + codeSize_1)
      };
      const moreSections = {
        contents: hasMoreSections
      };
      const seh = {
        contents: new List()
      };

      while (moreSections.contents) {
        const sectionBase = nextSectionBase.contents | 0;
        const sectionFlag = seekReadByte(pev, sectionBase);
        let patternInput_4;

        if ((sectionFlag & e_CorILMethod_Sect_FatFormat) !== 0) {
          const bigSize = op_GreaterGreaterGreaterAmp(seekReadInt32(pev, sectionBase), 8) | 0;
          let clauses;

          if ((sectionFlag & e_CorILMethod_Sect_EHTable) !== 0) {
            const numClauses = ~~(bigSize / 24) | 0;
            clauses = initialize_1(numClauses, function (i) {
              const clauseBase = sectionBase + 4 + i * 24 | 0;
              const kind = seekReadInt32(pev, clauseBase + 0) | 0;
              const st1 = seekReadInt32(pev, clauseBase + 4) | 0;
              const sz1 = seekReadInt32(pev, clauseBase + 8) | 0;
              const st2 = seekReadInt32(pev, clauseBase + 12) | 0;
              const sz2 = seekReadInt32(pev, clauseBase + 16) | 0;
              const extra = seekReadInt32(pev, clauseBase + 20) | 0;
              return [kind, st1, sz1, st2, sz2, extra];
            });
          } else {
            clauses = new List();
          }

          patternInput_4 = [bigSize, clauses];
        } else {
          const smallSize = seekReadByteAsInt32(pev, sectionBase + 1) | 0;
          let clauses_1;

          if ((sectionFlag & e_CorILMethod_Sect_EHTable) !== 0) {
            const numClauses_1 = ~~(smallSize / 12) | 0;
            clauses_1 = initialize_1(numClauses_1, function (i_1) {
              const clauseBase_1 = sectionBase + 4 + i_1 * 12 | 0;
              const kind_1 = seekReadUInt16AsInt32(pev, clauseBase_1 + 0) | 0;

              if (logging) {
                dprintn("One tiny SEH clause, kind = " + kind_1.toString());
              }

              const st1_1 = seekReadUInt16AsInt32(pev, clauseBase_1 + 2) | 0;
              const sz1_1 = seekReadByteAsInt32(pev, clauseBase_1 + 4) | 0;
              const st2_1 = seekReadUInt16AsInt32(pev, clauseBase_1 + 5) | 0;
              const sz2_1 = seekReadByteAsInt32(pev, clauseBase_1 + 7) | 0;
              const extra_1 = seekReadInt32(pev, clauseBase_1 + 8) | 0;
              return [kind_1, st1_1, sz1_1, st2_1, sz2_1, extra_1];
            });
          } else {
            clauses_1 = new List();
          }

          patternInput_4 = [smallSize, clauses_1];
        }

        let sehClauses;
        const sehMap = create(null, fromEqualityComparer({
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
        iterate(function (tupledArg) {
          var tupledArg_1;
          const tryStart = patternInput_3[1](tupledArg[1]) | 0;
          const tryFinish = patternInput_3[1](tupledArg[1] + tupledArg[2]) | 0;
          const handlerStart = patternInput_3[1](tupledArg[3]) | 0;
          const handlerFinish = patternInput_3[1](tupledArg[3] + tupledArg[4]) | 0;
          let clause;

          if (tupledArg[0] === e_COR_ILEXCEPTION_CLAUSE_EXCEPTION) {
            clause = new ILExceptionClause(3, [seekReadTypeDefOrRef(ctxt, numtypars, new ILBoxity(0), new List(), (tupledArg_1 = i32ToUncodedToken(tupledArg[5]), uncodedTokenToTypeDefOrRefOrSpec(tupledArg_1[0], tupledArg_1[1]))), [handlerStart, handlerFinish]]);
          } else if (tupledArg[0] === e_COR_ILEXCEPTION_CLAUSE_FILTER) {
            const filterStart = patternInput_3[1](tupledArg[5]) | 0;
            clause = new ILExceptionClause(2, [[filterStart, handlerStart], [handlerStart, handlerFinish]]);
          } else if (tupledArg[0] === e_COR_ILEXCEPTION_CLAUSE_FINALLY) {
            clause = new ILExceptionClause(0, [handlerStart, handlerFinish]);
          } else if (tupledArg[0] === e_COR_ILEXCEPTION_CLAUSE_FAULT) {
            clause = new ILExceptionClause(1, [handlerStart, handlerFinish]);
          } else {
            dprintn(ctxt.fileName + ": unknown exception handler kind: " + tupledArg[0].toString());
            clause = new ILExceptionClause(0, [handlerStart, handlerFinish]);
          }

          const key = [tryStart, tryFinish];

          if (sehMap.has(key)) {
            const prev = sehMap.get(key);
            sehMap.set(key, append(prev, ofArray([clause])));
          } else {
            sehMap.set(key, ofArray([clause]));
          }
        }, patternInput_4[1]);
        sehClauses = fold(function (acc, _arg34) {
          const activePatternResult14092 = _arg34;
          return append(toList(delay(function () {
            return map_1(function (b_1) {
              return new ILExceptionSpec(activePatternResult14092[0], b_1);
            }, activePatternResult14092[1]);
          })), acc);
        }, new List(), sehMap);
        seh.contents = sehClauses;
        moreSections.contents = (sectionFlag & e_CorILMethod_Sect_MoreSects) !== 0;
        nextSectionBase.contents = sectionBase + patternInput_4[0] | 0;
      }

      if (logging) {
        dprintn("doing localPdbInfos2");
      }

      const localPdbInfos2_1 = map(function (f_1) {
        return f_1(patternInput_3[3]);
      }, localPdbInfos);

      if (logging) {
        dprintn("done localPdbInfos2, checking code...");
      }

      const code_1 = buildILCode(nm, patternInput_3[2], patternInput_3[0], seh.contents, localPdbInfos2_1);

      if (logging) {
        dprintn("done checking code.");
      }

      return new MethodBody(0, new ILMethodBody(initlocals, maxstack, noinline, aggressiveinline, locals, code_1, methRangePdbInfo));
    } else {
      if (logging) {
        throw new Error("unknown format");
      }

      return new MethodBody(2);
    }
  }));
}
export function int32AsILVariantType(ctxt, n) {
  if (List_1.memAssoc(n, Lazy_1.force(ILVariantTypeRevMap))) {
    return List_1.assoc(n, Lazy_1.force(ILVariantTypeRevMap));
  } else if ((n & vt_ARRAY) !== 0) {
    return new ILNativeVariant(39, int32AsILVariantType(ctxt, n & ~vt_ARRAY));
  } else if ((n & vt_VECTOR) !== 0) {
    return new ILNativeVariant(40, int32AsILVariantType(ctxt, n & ~vt_VECTOR));
  } else if ((n & vt_BYREF) !== 0) {
    return new ILNativeVariant(41, int32AsILVariantType(ctxt, n & ~vt_BYREF));
  } else {
    dprintn(ctxt.fileName + ": int32AsILVariantType ctxt: unexpected variant type, n = " + n.toString());
    return new ILNativeVariant(0);
  }
}
export function readBlobHeapAsNativeType(ctxt, blobIdx) {
  const bytes = readBlobHeap(ctxt, blobIdx);
  const patternInput = sigptrGetILNativeType(ctxt, bytes, 0);
  return patternInput[0];
}
export function sigptrGetILNativeType(ctxt, bytes, sigptr) {
  const patternInput = sigptrGetByte(bytes, sigptr);

  if (List_1.memAssoc(patternInput[0], Lazy_1.force(ILNativeTypeMap))) {
    return [List_1.assoc(patternInput[0], Lazy_1.force(ILNativeTypeMap)), patternInput[1]];
  } else if (patternInput[0] === 0) {
    return [new ILNativeType(0), patternInput[1]];
  } else if (patternInput[0] === nt_CUSTOMMARSHALER) {
    const patternInput_1 = sigptrGetZInt32(bytes, patternInput[1]);
    const patternInput_2 = sigptrGetBytes(patternInput_1[0], bytes, patternInput_1[1]);
    const patternInput_3 = sigptrGetZInt32(bytes, patternInput_2[1]);
    const patternInput_4 = sigptrGetString(patternInput_3[0], bytes, patternInput_3[1]);
    const patternInput_5 = sigptrGetZInt32(bytes, patternInput_4[1]);
    const patternInput_6 = sigptrGetString(patternInput_5[0], bytes, patternInput_5[1]);
    const patternInput_7 = sigptrGetZInt32(bytes, patternInput_6[1]);
    const patternInput_8 = sigptrGetBytes(patternInput_7[0], bytes, patternInput_7[1]);
    return [new ILNativeType(1, [patternInput_2[0], patternInput_4[0], patternInput_6[0], patternInput_8[0]]), patternInput_8[1]];
  } else if (patternInput[0] === nt_FIXEDSYSSTRING) {
    const patternInput_9 = sigptrGetZInt32(bytes, patternInput[1]);
    return [new ILNativeType(2, patternInput_9[0]), patternInput_9[1]];
  } else if (patternInput[0] === nt_FIXEDARRAY) {
    const patternInput_10 = sigptrGetZInt32(bytes, patternInput[1]);
    return [new ILNativeType(3, patternInput_10[0]), patternInput_10[1]];
  } else if (patternInput[0] === nt_SAFEARRAY) {
    if (patternInput[1] >= bytes.length) {
      return [new ILNativeType(35, [new ILNativeVariant(0), null]), patternInput[1]];
    } else {
      const patternInput_11 = sigptrGetZInt32(bytes, patternInput[1]);

      if (patternInput_11[1] >= bytes.length) {
        return [new ILNativeType(35, [int32AsILVariantType(ctxt, patternInput_11[0]), null]), patternInput_11[1]];
      } else {
        const patternInput_12 = sigptrGetZInt32(bytes, patternInput_11[1]);
        const patternInput_13 = sigptrGetString(patternInput_12[0], bytes, patternInput_12[1]);
        return [new ILNativeType(35, [int32AsILVariantType(ctxt, patternInput_11[0]), patternInput_13[0]]), patternInput_13[1]];
      }
    }
  } else if (patternInput[0] === nt_ARRAY) {
    if (patternInput[1] >= bytes.length) {
      return [new ILNativeType(25, [null, null]), patternInput[1]];
    } else {
      let patternInput_15;
      const patternInput_14 = sigptrGetZInt32(bytes, patternInput[1]);

      if (patternInput_14[0] === ~~nt_MAX) {
        patternInput_15 = [new ILNativeType(0), patternInput_14[1]];
      } else {
        patternInput_15 = sigptrGetILNativeType(ctxt, bytes, patternInput[1]);
      }

      if (patternInput_15[1] >= bytes.length) {
        return [new ILNativeType(25, [patternInput_15[0], null]), patternInput_15[1]];
      } else {
        const patternInput_16 = sigptrGetZInt32(bytes, patternInput_15[1]);

        if (patternInput_16[1] >= bytes.length) {
          return [new ILNativeType(25, [patternInput_15[0], [patternInput_16[0], null]]), patternInput_16[1]];
        } else {
          const patternInput_17 = patternInput_16[1] >= bytes.length ? [0, patternInput_16[1]] : sigptrGetZInt32(bytes, patternInput_16[1]);
          return [new ILNativeType(25, [patternInput_15[0], [patternInput_16[0], patternInput_17[0]]]), patternInput_17[1]];
        }
      }
    }
  } else {
    return [new ILNativeType(0), patternInput[1]];
  }
}
export function seekReadManifestResources(ctxt, mdv, pectxtEager, pevEager) {
  return mkILResources(toList(delay(function () {
    return collect(function (i) {
      const patternInput = seekReadManifestResourceRow(ctxt, mdv, i);
      const scoref = seekReadImplAsScopeRef(ctxt, mdv, patternInput[3]);
      let location;

      if (scoref.tag === 1) {
        location = new ILResourceLocation(2, [scoref.data, patternInput[0]]);
      } else if (scoref.tag === 2) {
        location = new ILResourceLocation(3, scoref.data);
      } else {
        const start = pectxtEager.anyV2P(["resource", patternInput[0] + pectxtEager.resourcesAddr]) | 0;
        const resourceLength = seekReadInt32(pevEager, start) | 0;
        const offsetOfBytesFromStartOfPhysicalPEFile = start + 4 | 0;
        const bytes = seekReadBytes(pevEager, offsetOfBytesFromStartOfPhysicalPEFile, resourceLength);
        location = new ILResourceLocation(1, bytes);
      }

      const r = new ILResource(readStringHeap(ctxt, patternInput[2]), location, (patternInput[1] & 1) !== 0 ? new ILResourceAccess(0) : new ILResourceAccess(1), ctxt.customAttrsReader_ManifestResource, i);
      return singleton(r);
    }, range(1, ctxt.getNumRows(TableNames.ManifestResource)));
  })));
}
export function seekReadNestedExportedTypes(ctxt, exported, nested, parentIdx) {
  return mkILNestedExportedTypesLazy(new Lazy(function () {
    return map(function (i) {
      const patternInput = exported[i - 1];
      return new ILNestedExportedType(readBlobHeapAsTypeName(ctxt, patternInput[2], patternInput[3]), (() => {
        const matchValue = typeAccessOfFlags(patternInput[0]);

        if (matchValue.tag === 2) {
          return matchValue.data;
        } else {
          throw new Error("non-nested access for a nested type described as being in an auxiliary module");
        }
      })(), seekReadNestedExportedTypes(ctxt, exported, nested, i), ctxt.customAttrsReader_ExportedType, i);
    }, nested.value[parentIdx - 1]);
  }));
}
export function seekReadTopExportedTypes(ctxt) {
  return mkILExportedTypesLazy(new Lazy(function () {
    const mdv = ctxt.mdfile.GetView();
    const numRows = ctxt.getNumRows(TableNames.ExportedType) | 0;
    const exported = Array.from(delay(function () {
      return map_1(function (i) {
        return seekReadExportedTypeRow(ctxt, mdv, i);
      }, range(1, numRows));
    }));
    const nested_1 = new Lazy(function () {
      const nested = Array.from(delay(function () {
        return map_1(function (_i) {
          return new List();
        }, range(1, numRows));
      }));

      for (let i_1 = 1; i_1 <= numRows; i_1++) {
        const patternInput = exported[i_1 - 1];

        const activePatternResult14129 = _TaggedIndex_(patternInput[4]);

        if (!isTopTypeDef(patternInput[0]) ? activePatternResult14129[0].Equals(i_ExportedType) : false) {
          nested[activePatternResult14129[1] - 1] = new List(i_1, nested[activePatternResult14129[1] - 1]);
        }
      }

      return nested;
    });
    return toList(delay(function () {
      return collect(function (i_2) {
        const patternInput_1 = exported[i_2 - 1];

        const activePatternResult14134 = _TaggedIndex_(patternInput_1[4]);

        if (isTopTypeDef(patternInput_1[0]) ? !activePatternResult14134[0].Equals(i_ExportedType) : false) {
          return singleton(new ILExportedTypeOrForwarder(seekReadImplAsScopeRef(ctxt, mdv, patternInput_1[4]), readBlobHeapAsTypeName(ctxt, patternInput_1[2], patternInput_1[3]), patternInput_1[0], seekReadNestedExportedTypes(ctxt, exported, nested_1, i_2), ctxt.customAttrsReader_ExportedType, i_2));
        } else {
          return empty();
        }
      }, range(1, numRows));
    }));
  }));
}
export function openMetadataReader(fileName, mdfile, metadataPhysLoc, peinfo, pectxtEager, pevEager, pectxtCaptured, reduceMemoryUsage, ilGlobals) {
  const mdv = mdfile.GetView();
  const magic = seekReadUInt16AsInt32(mdv, metadataPhysLoc) | 0;

  if (magic !== 21314) {
    throw new Error(fileName + ": bad metadata magic number: " + magic.toString());
  }

  const magic2 = seekReadUInt16AsInt32(mdv, metadataPhysLoc + 2) | 0;

  if (magic2 !== 16970) {
    throw new Error("bad metadata magic number");
  }

  const _majorMetadataVersion = seekReadUInt16(mdv, metadataPhysLoc + 4);

  const _minorMetadataVersion = seekReadUInt16(mdv, metadataPhysLoc + 6);

  const versionLength = seekReadInt32(mdv, metadataPhysLoc + 12) | 0;
  const ilMetadataVersion = seekReadBytes(mdv, metadataPhysLoc + 16, versionLength).filter(function (b) {
    return b !== 0;
  });
  const x = align(4, 16 + versionLength) | 0;
  const numStreams = seekReadUInt16AsInt32(mdv, metadataPhysLoc + x + 2) | 0;
  const streamHeadersStart = metadataPhysLoc + x + 4 | 0;

  const tryFindStream = function (name) {
    const look = function (i, pos) {
      look: while (true) {
        if (i >= numStreams) {
          return null;
        } else {
          const offset = seekReadInt32(mdv, pos + 0) | 0;
          const length = seekReadInt32(mdv, pos + 4) | 0;
          const res = {
            contents: true
          };
          const fin = {
            contents: false
          };
          const n = {
            contents: 0
          };

          while (!fin.contents) {
            const c = seekReadByteAsInt32(mdv, pos + 8 + n.contents) | 0;

            if (c === 0) {
              fin.contents = true;
            } else if (n.contents >= name.length ? true : c !== name[n.contents]) {
              res.contents = false;
            }

            void n.contents++;
          }

          if (res.contents) {
            return [offset + metadataPhysLoc, length];
          } else {
            i = i + 1;
            pos = align(4, pos + 8 + n.contents);
            continue look;
          }
        }
      }
    };

    return look(0, streamHeadersStart);
  };

  const findStream = function (name_1) {
    const matchValue = tryFindStream(name_1);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return [0, 0];
    }
  };

  let patternInput;
  const matchValue_1 = tryFindStream(new Int32Array([35, 126]));

  if (matchValue_1 == null) {
    const matchValue_2 = tryFindStream(new Int32Array([35, 45]));

    if (matchValue_2 == null) {
      const firstStreamOffset = seekReadInt32(mdv, streamHeadersStart + 0) | 0;
      const firstStreamLength = seekReadInt32(mdv, streamHeadersStart + 4) | 0;
      patternInput = [firstStreamOffset, firstStreamLength];
    } else {
      patternInput = getValue(matchValue_2);
    }
  } else {
    patternInput = getValue(matchValue_1);
  }

  const patternInput_1 = findStream(new Int32Array([35, 83, 116, 114, 105, 110, 103, 115]));
  const patternInput_2 = findStream(new Int32Array([35, 85, 83]));
  const patternInput_3 = findStream(new Int32Array([35, 71, 85, 73, 68]));
  const patternInput_4 = findStream(new Int32Array([35, 66, 108, 111, 98]));
  const tableKinds = [kindModule, kindTypeRef, kindTypeDef, kindIllegal, kindFieldDef, kindIllegal, kindMethodDef, kindIllegal, kindParam, kindInterfaceImpl, kindMemberRef, kindConstant, kindCustomAttribute, kindFieldMarshal, kindDeclSecurity, kindClassLayout, kindFieldLayout, kindStandAloneSig, kindEventMap, kindIllegal, kindEvent, kindPropertyMap, kindIllegal, kindProperty, kindMethodSemantics, kindMethodImpl, kindModuleRef, kindTypeSpec, kindImplMap, kindFieldRVA, kindIllegal, kindIllegal, kindAssembly, kindIllegal, kindIllegal, kindAssemblyRef, kindIllegal, kindIllegal, kindFileRef, kindExportedType, kindManifestResource, kindNested, kindGenericParam_v2_0, kindMethodSpec, kindGenericParamConstraint, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal, kindIllegal];
  const heapSizes = seekReadByteAsInt32(mdv, patternInput[0] + 6) | 0;
  const valid = seekReadInt64(mdv, patternInput[0] + 8);
  const sorted = seekReadInt64(mdv, patternInput[0] + 16);
  let patternInput_5;
  const present = {
    contents: new List()
  };
  const numRows = Int32Array.from(replicate(64, 0));
  const prevNumRowIdx = {
    contents: patternInput[0] + 24
  };

  for (let i_1 = 0; i_1 <= 63; i_1++) {
    if (!valid.and(fromNumber(1, false).shl(i_1)).Equals(fromNumber(0, false))) {
      present.contents = new List(i_1, present.contents);
      numRows[i_1] = seekReadInt32(mdv, prevNumRowIdx.contents) | 0;
      prevNumRowIdx.contents = prevNumRowIdx.contents + 4 | 0;
    }
  }

  patternInput_5 = [reverse(present.contents), numRows, prevNumRowIdx.contents];

  const getNumRows = function (tab) {
    return patternInput_5[1][tab.Index] | 0;
  };

  const numTables = patternInput_5[0].length | 0;
  const stringsBigness = (heapSizes & 1) !== 0;
  const guidsBigness = (heapSizes & 2) !== 0;
  const blobsBigness = (heapSizes & 4) !== 0;

  if (logging) {
    dprintn(fileName + ": numTables = " + numTables.toString());
  }

  if (logging ? stringsBigness : false) {
    dprintn(fileName + ": strings are big");
  }

  if (logging ? blobsBigness : false) {
    dprintn(fileName + ": blobs are big");
  }

  const tableBigness = map_2(function (n_1) {
    return n_1 >= 65536;
  }, patternInput_5[1], Array);

  const codedBigness = function (nbits, tab_1) {
    const rows = getNumRows(tab_1) | 0;
    return rows >= op_GreaterGreaterGreaterAmp(65536, nbits);
  };

  const tdorBigness = (codedBigness(2, TableNames.TypeDef) ? true : codedBigness(2, TableNames.TypeRef)) ? true : codedBigness(2, TableNames.TypeSpec);
  const tomdBigness = codedBigness(1, TableNames.TypeDef) ? true : codedBigness(1, TableNames.Method);
  const hcBigness = (codedBigness(2, TableNames.Field) ? true : codedBigness(2, TableNames.Param)) ? true : codedBigness(2, TableNames.Property);
  const hcaBigness = ((((((((((((((((((((codedBigness(5, TableNames.Method) ? true : codedBigness(5, TableNames.Field)) ? true : codedBigness(5, TableNames.TypeRef)) ? true : codedBigness(5, TableNames.TypeDef)) ? true : codedBigness(5, TableNames.Param)) ? true : codedBigness(5, TableNames.InterfaceImpl)) ? true : codedBigness(5, TableNames.MemberRef)) ? true : codedBigness(5, TableNames.Module)) ? true : codedBigness(5, TableNames.Permission)) ? true : codedBigness(5, TableNames.Property)) ? true : codedBigness(5, TableNames.Event)) ? true : codedBigness(5, TableNames.StandAloneSig)) ? true : codedBigness(5, TableNames.ModuleRef)) ? true : codedBigness(5, TableNames.TypeSpec)) ? true : codedBigness(5, TableNames.Assembly)) ? true : codedBigness(5, TableNames.AssemblyRef)) ? true : codedBigness(5, TableNames.File)) ? true : codedBigness(5, TableNames.ExportedType)) ? true : codedBigness(5, TableNames.ManifestResource)) ? true : codedBigness(5, TableNames.GenericParam)) ? true : codedBigness(5, TableNames.GenericParamConstraint)) ? true : codedBigness(5, TableNames.MethodSpec);
  const hfmBigness = codedBigness(1, TableNames.Field) ? true : codedBigness(1, TableNames.Param);
  const hdsBigness = (codedBigness(2, TableNames.TypeDef) ? true : codedBigness(2, TableNames.Method)) ? true : codedBigness(2, TableNames.Assembly);
  const mrpBigness = ((codedBigness(3, TableNames.TypeRef) ? true : codedBigness(3, TableNames.ModuleRef)) ? true : codedBigness(3, TableNames.Method)) ? true : codedBigness(3, TableNames.TypeSpec);
  const hsBigness = codedBigness(1, TableNames.Event) ? true : codedBigness(1, TableNames.Property);
  const mdorBigness = codedBigness(1, TableNames.Method) ? true : codedBigness(1, TableNames.MemberRef);
  const mfBigness = codedBigness(1, TableNames.Field) ? true : codedBigness(1, TableNames.Method);
  const iBigness = (codedBigness(2, TableNames.File) ? true : codedBigness(2, TableNames.AssemblyRef)) ? true : codedBigness(2, TableNames.ExportedType);
  const catBigness = codedBigness(3, TableNames.Method) ? true : codedBigness(3, TableNames.MemberRef);
  const rsBigness = ((codedBigness(2, TableNames.Module) ? true : codedBigness(2, TableNames.ModuleRef)) ? true : codedBigness(2, TableNames.AssemblyRef)) ? true : codedBigness(2, TableNames.TypeRef);

  const rowKindSize = function (_arg1) {
    return sumBy(function (x_1) {
      switch (x_1.tag) {
        case 1:
          return 4;

        case 2:
          return 1;

        case 3:
          return 4;

        case 4:
          if (guidsBigness) {
            return 4;
          } else {
            return 2;
          }

        case 5:
          if (blobsBigness) {
            return 4;
          } else {
            return 2;
          }

        case 6:
          if (stringsBigness) {
            return 4;
          } else {
            return 2;
          }

        case 7:
          if (tableBigness[x_1.data.Index]) {
            return 4;
          } else {
            return 2;
          }

        case 8:
          if (tdorBigness) {
            return 4;
          } else {
            return 2;
          }

        case 9:
          if (tomdBigness) {
            return 4;
          } else {
            return 2;
          }

        case 10:
          if (hcBigness) {
            return 4;
          } else {
            return 2;
          }

        case 11:
          if (hcaBigness) {
            return 4;
          } else {
            return 2;
          }

        case 12:
          if (hfmBigness) {
            return 4;
          } else {
            return 2;
          }

        case 13:
          if (hdsBigness) {
            return 4;
          } else {
            return 2;
          }

        case 14:
          if (mrpBigness) {
            return 4;
          } else {
            return 2;
          }

        case 15:
          if (hsBigness) {
            return 4;
          } else {
            return 2;
          }

        case 16:
          if (mdorBigness) {
            return 4;
          } else {
            return 2;
          }

        case 17:
          if (mfBigness) {
            return 4;
          } else {
            return 2;
          }

        case 18:
          if (iBigness) {
            return 4;
          } else {
            return 2;
          }

        case 19:
          if (catBigness) {
            return 4;
          } else {
            return 2;
          }

        case 20:
          if (rsBigness) {
            return 4;
          } else {
            return 2;
          }

        default:
          return 2;
      }
    }, _arg1.data) | 0;
  };

  const tableRowSizes = function (array) {
    return map_2(rowKindSize, array, Int32Array);
  }(tableKinds);

  let tablePhysLocations;
  const res_1 = Int32Array.from(replicate(64, 0));
  let prevTablePhysLoc = patternInput_5[2] | 0;

  for (let i_2 = 0; i_2 <= 63; i_2++) {
    res_1[i_2] = prevTablePhysLoc | 0;
    prevTablePhysLoc = prevTablePhysLoc + patternInput_5[1][i_2] * tableRowSizes[i_2] | 0;
  }

  tablePhysLocations = res_1;
  const inbase = fileNameOfPath(fileName) + ": ";
  const cacheAssemblyRef = mkCacheInt32(reduceMemoryUsage, inbase, "ILAssemblyRef", getNumRows(TableNames.AssemblyRef));
  const cacheMethodSpecAsMethodData = mkCacheGeneric(reduceMemoryUsage, inbase, "MethodSpecAsMethodData", ~~(getNumRows(TableNames.MethodSpec) / 20) + 1);
  const cacheMemberRefAsMemberData = mkCacheGeneric(reduceMemoryUsage, inbase, "MemberRefAsMemberData", ~~(getNumRows(TableNames.MemberRef) / 20) + 1);
  const cacheCustomAttr = mkCacheGeneric(reduceMemoryUsage, inbase, "CustomAttr", ~~(getNumRows(TableNames.CustomAttribute) / 50) + 1);
  const cacheTypeRef = mkCacheInt32(reduceMemoryUsage, inbase, "ILTypeRef", ~~(getNumRows(TableNames.TypeRef) / 20) + 1);
  const cacheTypeRefAsType = mkCacheGeneric(reduceMemoryUsage, inbase, "TypeRefAsType", ~~(getNumRows(TableNames.TypeRef) / 20) + 1);
  const cacheBlobHeapAsPropertySig = mkCacheGeneric(reduceMemoryUsage, inbase, "BlobHeapAsPropertySig", ~~(getNumRows(TableNames.Property) / 20) + 1);
  const cacheBlobHeapAsFieldSig = mkCacheGeneric(reduceMemoryUsage, inbase, "BlobHeapAsFieldSig", ~~(getNumRows(TableNames.Field) / 20) + 1);
  const cacheBlobHeapAsMethodSig = mkCacheGeneric(reduceMemoryUsage, inbase, "BlobHeapAsMethodSig", ~~(getNumRows(TableNames.Method) / 20) + 1);
  const cacheTypeDefAsType = mkCacheGeneric(reduceMemoryUsage, inbase, "TypeDefAsType", ~~(getNumRows(TableNames.TypeDef) / 20) + 1);
  const cacheMethodDefAsMethodData = mkCacheInt32(reduceMemoryUsage, inbase, "MethodDefAsMethodData", ~~(getNumRows(TableNames.Method) / 20) + 1);
  const cacheGenericParams = mkCacheGeneric(reduceMemoryUsage, inbase, "GenericParams", ~~(getNumRows(TableNames.GenericParam) / 20) + 1);
  const cacheFieldDefAsFieldSpec = mkCacheInt32(reduceMemoryUsage, inbase, "FieldDefAsFieldSpec", ~~(getNumRows(TableNames.Field) / 20) + 1);
  const cacheUserStringHeap = mkCacheInt32(reduceMemoryUsage, inbase, "UserStringHeap", ~~(patternInput_2[1] / 20) + 1);
  const cacheStringHeap = mkCacheInt32(false, inbase, "string heap", ~~(patternInput_1[1] / 50) + 1);
  const cacheBlobHeap = mkCacheInt32(reduceMemoryUsage, inbase, "blob heap", ~~(patternInput_4[1] / 50) + 1);
  const cacheNestedRow = mkCacheInt32(reduceMemoryUsage, inbase, "Nested Table Rows", ~~(getNumRows(TableNames.Nested) / 20) + 1);
  const cacheConstantRow = mkCacheInt32(reduceMemoryUsage, inbase, "Constant Rows", ~~(getNumRows(TableNames.Constant) / 20) + 1);
  const cacheMethodSemanticsRow = mkCacheInt32(reduceMemoryUsage, inbase, "MethodSemantics Rows", ~~(getNumRows(TableNames.MethodSemantics) / 20) + 1);
  const cacheTypeDefRow = mkCacheInt32(reduceMemoryUsage, inbase, "ILTypeDef Rows", ~~(getNumRows(TableNames.TypeDef) / 20) + 1);

  const rowAddr = function (tab_2, idx) {
    return tablePhysLocations[tab_2.Index] + (idx - 1) * tableRowSizes[tab_2.Index] | 0;
  };

  const ctxtH = {
    contents: null
  };
  let ctxt;
  const dataEndPoints = pectxtCaptured != null ? getDataEndPointsDelayed(getValue(pectxtCaptured), ctxtH) : notlazy(new List());
  const memoizeString = Tables.memoize(function (x_2) {
    return x_2;
  });
  const readUserStringHeap_1 = CurriedLambda(cacheUserStringHeap)(function (idx_1) {
    return readUserStringHeapUncached(ctxtH, idx_1);
  });
  const readStringHeap_1 = CurriedLambda(cacheStringHeap)(function (idx_2) {
    return readStringHeapUncached(ctxtH, idx_2);
  });
  const readBlobHeap_1 = CurriedLambda(cacheBlobHeap)(function (idx_3) {
    return readBlobHeapUncached(ctxtH, idx_3);
  });
  const seekReadNestedRow_1 = CurriedLambda(cacheNestedRow)(function (idx_4) {
    return seekReadNestedRowUncached(ctxtH, idx_4);
  });
  const seekReadConstantRow_1 = CurriedLambda(cacheConstantRow)(function (idx_5) {
    return seekReadConstantRowUncached(ctxtH, idx_5);
  });
  const seekReadMethodSemanticsRow_1 = CurriedLambda(cacheMethodSemanticsRow)(function (idx_6) {
    return seekReadMethodSemanticsRowUncached(ctxtH, idx_6);
  });
  const seekReadTypeDefRow_1 = CurriedLambda(cacheTypeDefRow)(function (idx_7) {
    return seekReadTypeDefRowUncached(ctxtH, idx_7);
  });
  const seekReadAssemblyRef_1 = CurriedLambda(cacheAssemblyRef)(function (idx_8) {
    return seekReadAssemblyRefUncached(ctxtH, idx_8);
  });
  const seekReadMethodSpecAsMethodData_1 = CurriedLambda(cacheMethodSpecAsMethodData)(function (arg10_) {
    return seekReadMethodSpecAsMethodDataUncached(ctxtH, arg10_);
  });
  const seekReadMemberRefAsMethodData_1 = CurriedLambda(cacheMemberRefAsMemberData)(function (arg10__1) {
    return seekReadMemberRefAsMethodDataUncached(ctxtH, arg10__1);
  });

  const seekReadMemberRefAsFieldSpec_1 = function (arg10__2) {
    return seekReadMemberRefAsFieldSpecUncached(ctxtH, arg10__2);
  };

  const seekReadCustomAttr_1 = CurriedLambda(cacheCustomAttr)(function (arg10__3) {
    return seekReadCustomAttrUncached(ctxtH, arg10__3);
  });
  const seekReadTypeRef_1 = CurriedLambda(cacheTypeRef)(function (idx_9) {
    return seekReadTypeRefUncached(ctxtH, idx_9);
  });
  const readBlobHeapAsPropertySig_1 = CurriedLambda(cacheBlobHeapAsPropertySig)(function (arg10__4) {
    return readBlobHeapAsPropertySigUncached(ctxtH, arg10__4);
  });
  const readBlobHeapAsFieldSig_1 = CurriedLambda(cacheBlobHeapAsFieldSig)(function (arg10__5) {
    return readBlobHeapAsFieldSigUncached(ctxtH, arg10__5);
  });
  const readBlobHeapAsMethodSig_1 = CurriedLambda(cacheBlobHeapAsMethodSig)(function (arg10__6) {
    return readBlobHeapAsMethodSigUncached(ctxtH, arg10__6);
  });

  const readBlobHeapAsLocalsSig_1 = function (arg10__7) {
    return readBlobHeapAsLocalsSigUncached(ctxtH, arg10__7);
  };

  const seekReadTypeDefAsType_1 = CurriedLambda(cacheTypeDefAsType)(function (arg10__8) {
    return seekReadTypeDefAsTypeUncached(ctxtH, arg10__8);
  });
  const seekReadTypeRefAsType_1 = CurriedLambda(cacheTypeRefAsType)(function (arg10__9) {
    return seekReadTypeRefAsTypeUncached(ctxtH, arg10__9);
  });
  const seekReadMethodDefAsMethodData_1 = CurriedLambda(cacheMethodDefAsMethodData)(function (idx_10) {
    return seekReadMethodDefAsMethodDataUncached(ctxtH, idx_10);
  });
  const seekReadGenericParams_1 = CurriedLambda(cacheGenericParams)(function (arg10__10) {
    return seekReadGenericParamsUncached(ctxtH, arg10__10);
  });
  const seekReadFieldDefAsFieldSpec_1 = CurriedLambda(cacheFieldDefAsFieldSpec)(function (idx_11) {
    return seekReadFieldDefAsFieldSpecUncached(ctxtH, idx_11);
  });
  const customAttrsReader_Module = customAttrsReader(ctxtH, hca_Module);
  const customAttrsReader_Assembly = customAttrsReader(ctxtH, hca_Assembly);
  const customAttrsReader_TypeDef = customAttrsReader(ctxtH, hca_TypeDef);
  const customAttrsReader_GenericParam = customAttrsReader(ctxtH, hca_GenericParam);
  const customAttrsReader_FieldDef = customAttrsReader(ctxtH, hca_FieldDef);
  const customAttrsReader_MethodDef = customAttrsReader(ctxtH, hca_MethodDef);
  const customAttrsReader_ParamDef = customAttrsReader(ctxtH, hca_ParamDef);
  const customAttrsReader_Event = customAttrsReader(ctxtH, hca_Event);
  const customAttrsReader_Property = customAttrsReader(ctxtH, hca_Property);
  const customAttrsReader_ManifestResource = customAttrsReader(ctxtH, hca_ManifestResource);
  const customAttrsReader_ExportedType = customAttrsReader(ctxtH, hca_ExportedType);
  const securityDeclsReader_TypeDef = securityDeclsReader(ctxtH, hds_TypeDef);
  const securityDeclsReader_MethodDef = securityDeclsReader(ctxtH, hds_MethodDef);
  const securityDeclsReader_Assembly = securityDeclsReader(ctxtH, hds_Assembly);
  const typeDefReader_1 = typeDefReader(ctxtH);
  ctxt = new ILMetadataReader(ilGlobals, sorted, mdfile, pectxtCaptured, pectxtEager.entryPointToken, dataEndPoints, fileName, getNumRows, patternInput_2[0], patternInput_1[0], patternInput_4[0], patternInput_4[1], readUserStringHeap_1, memoizeString, readStringHeap_1, readBlobHeap_1, patternInput_3[0], rowAddr, tableBigness, rsBigness, tdorBigness, tomdBigness, hcBigness, hcaBigness, hfmBigness, hdsBigness, mrpBigness, hsBigness, mdorBigness, mfBigness, iBigness, catBigness, stringsBigness, guidsBigness, blobsBigness, seekReadNestedRow_1, seekReadConstantRow_1, seekReadMethodSemanticsRow_1, seekReadTypeDefRow_1, seekReadAssemblyRef_1, seekReadMethodSpecAsMethodData_1, seekReadMemberRefAsMethodData_1, seekReadMemberRefAsFieldSpec_1, seekReadCustomAttr_1, seekReadTypeRef_1, seekReadTypeRefAsType_1, readBlobHeapAsPropertySig_1, readBlobHeapAsFieldSig_1, readBlobHeapAsMethodSig_1, readBlobHeapAsLocalsSig_1, seekReadTypeDefAsType_1, seekReadMethodDefAsMethodData_1, seekReadGenericParams_1, seekReadFieldDefAsFieldSpec_1, customAttrsReader_Module, customAttrsReader_Assembly, customAttrsReader_TypeDef, customAttrsReader_GenericParam, customAttrsReader_FieldDef, customAttrsReader_MethodDef, customAttrsReader_ParamDef, customAttrsReader_Event, customAttrsReader_Property, customAttrsReader_ManifestResource, customAttrsReader_ExportedType, securityDeclsReader_TypeDef, securityDeclsReader_MethodDef, securityDeclsReader_Assembly, typeDefReader_1);
  ctxtH.contents = ctxt;
  let ilModule;
  const ilMetadataVersion_1 = System.Text.Encoding.UTF8.GetString(ilMetadataVersion, 0, ilMetadataVersion.length);
  ilModule = seekReadModule(ctxt, pectxtEager, pevEager, peinfo[0], peinfo[1], peinfo[2], peinfo[3], peinfo[4], peinfo[5], peinfo[6], peinfo[7], peinfo[8], peinfo[9], peinfo[10], peinfo[11], ilMetadataVersion_1, 1);
  const ilAssemblyRefs = new Lazy(function () {
    return toList(delay(function () {
      return map_1(function (i_3) {
        return seekReadAssemblyRef(ctxt, i_3);
      }, range(1, getNumRows(TableNames.AssemblyRef)));
    }));
  });
  return [ilModule, ilAssemblyRefs];
}
export function openPEFileReader(fileName, pefile, pdbPath) {
  const pev = pefile.GetView();
  const peSignaturePhysLoc = seekReadInt32(pev, 60) | 0;
  const peFileHeaderPhysLoc = peSignaturePhysLoc + 4 | 0;
  const peOptionalHeaderPhysLoc = peFileHeaderPhysLoc + 20 | 0;
  const peSignature = seekReadInt32(pev, peSignaturePhysLoc + 0) | 0;

  if (peSignature !== 17744) {
    toFail(printf("not a PE file - bad magic PE number 0x%08x, is = %A"))(peSignature, pev);
  }

  const machine = seekReadUInt16AsInt32(pev, peFileHeaderPhysLoc + 0) | 0;
  const numSections = seekReadUInt16AsInt32(pev, peFileHeaderPhysLoc + 2) | 0;
  const optHeaderSize = seekReadUInt16AsInt32(pev, peFileHeaderPhysLoc + 16) | 0;

  if (optHeaderSize !== 224 ? optHeaderSize !== 240 : false) {
    throw new Error("not a PE file - bad optional header size");
  }

  const x64adjust = optHeaderSize - 224 | 0;
  const only64 = optHeaderSize === 240;
  const platform = machine === 512 ? new ILPlatform(2) : machine === 34404 ? new ILPlatform(1) : new ILPlatform(0);
  const sectionHeadersStartPhysLoc = peOptionalHeaderPhysLoc + optHeaderSize | 0;
  const flags = seekReadUInt16AsInt32(pev, peFileHeaderPhysLoc + 18) | 0;
  const isDll = (flags & 8192) !== 0;

  const _textPhysSize = seekReadInt32(pev, peOptionalHeaderPhysLoc + 4) | 0;

  const _initdataPhysSize = seekReadInt32(pev, peOptionalHeaderPhysLoc + 8) | 0;

  const _uninitdataPhysSize = seekReadInt32(pev, peOptionalHeaderPhysLoc + 12) | 0;

  const _entrypointAddr = seekReadInt32(pev, peOptionalHeaderPhysLoc + 16) | 0;

  const _textAddr = seekReadInt32(pev, peOptionalHeaderPhysLoc + 20) | 0;

  const dataSegmentAddr = seekReadInt32(pev, peOptionalHeaderPhysLoc + 24) | 0;
  const imageBaseReal = (only64 ? dataSegmentAddr : seekReadInt32(pev, peOptionalHeaderPhysLoc + 28)) | 0;
  const alignVirt = seekReadInt32(pev, peOptionalHeaderPhysLoc + 32) | 0;
  const alignPhys = seekReadInt32(pev, peOptionalHeaderPhysLoc + 36) | 0;

  const _osMajor = seekReadUInt16(pev, peOptionalHeaderPhysLoc + 40);

  const _osMinor = seekReadUInt16(pev, peOptionalHeaderPhysLoc + 42);

  const _userMajor = seekReadUInt16(pev, peOptionalHeaderPhysLoc + 44);

  const _userMinor = seekReadUInt16(pev, peOptionalHeaderPhysLoc + 46);

  const subsysMajor = seekReadUInt16AsInt32(pev, peOptionalHeaderPhysLoc + 48) | 0;
  const subsysMinor = seekReadUInt16AsInt32(pev, peOptionalHeaderPhysLoc + 50) | 0;

  const _imageEndAddr = seekReadInt32(pev, peOptionalHeaderPhysLoc + 56) | 0;

  const _headerPhysSize = seekReadInt32(pev, peOptionalHeaderPhysLoc + 60) | 0;

  const subsys = seekReadUInt16(pev, peOptionalHeaderPhysLoc + 68);
  let useHighEnthropyVA;
  const n = seekReadUInt16(pev, peOptionalHeaderPhysLoc + 70);
  useHighEnthropyVA = (n & 32) === 32;

  const _numDataDirectories = seekReadInt32(pev, peOptionalHeaderPhysLoc + 92 + x64adjust) | 0;

  const _importTableAddr = seekReadInt32(pev, peOptionalHeaderPhysLoc + 104 + x64adjust) | 0;

  const _importTableSize = seekReadInt32(pev, peOptionalHeaderPhysLoc + 108 + x64adjust) | 0;

  const nativeResourcesAddr = seekReadInt32(pev, peOptionalHeaderPhysLoc + 112 + x64adjust) | 0;
  const nativeResourcesSize = seekReadInt32(pev, peOptionalHeaderPhysLoc + 116 + x64adjust) | 0;

  const _importAddrTableAddr = seekReadInt32(pev, peOptionalHeaderPhysLoc + 192 + x64adjust) | 0;

  const _importAddrTableSize = seekReadInt32(pev, peOptionalHeaderPhysLoc + 196 + x64adjust) | 0;

  const cliHeaderAddr = seekReadInt32(pev, peOptionalHeaderPhysLoc + 208 + x64adjust) | 0;

  const _cliHeaderSize = seekReadInt32(pev, peOptionalHeaderPhysLoc + 212 + x64adjust) | 0;

  const sectionHeaders = toList(delay(function () {
    return collect(function (i) {
      const pos = sectionHeadersStartPhysLoc + i * 40 | 0;
      const virtSize = seekReadInt32(pev, pos + 8) | 0;
      const virtAddr = seekReadInt32(pev, pos + 12) | 0;
      const physLoc = seekReadInt32(pev, pos + 20) | 0;
      return singleton([virtAddr, virtSize, physLoc]);
    }, range(0, numSections - 1));
  }));

  const findSectionHeader = function (addr) {
    const look = function (i_1, pos_1) {
      look: while (true) {
        if (i_1 >= numSections) {
          return 0;
        } else {
          const virtSize_1 = seekReadInt32(pev, pos_1 + 8) | 0;
          const virtAddr_1 = seekReadInt32(pev, pos_1 + 12) | 0;

          if (addr >= virtAddr_1 ? addr < virtAddr_1 + virtSize_1 : false) {
            return pos_1 | 0;
          } else {
            i_1 = i_1 + 1;
            pos_1 = pos_1 + 40;
            continue look;
          }
        }
      }
    };

    return look(0, sectionHeadersStartPhysLoc) | 0;
  };

  const textHeaderStart = findSectionHeader(cliHeaderAddr) | 0;
  const dataHeaderStart = findSectionHeader(dataSegmentAddr) | 0;

  const _textSize = (textHeaderStart === 0 ? 0 : seekReadInt32(pev, textHeaderStart + 8)) | 0;

  const _textAddr_1 = (textHeaderStart === 0 ? 0 : seekReadInt32(pev, textHeaderStart + 12)) | 0;

  const textSegmentPhysicalSize = (textHeaderStart === 0 ? 0 : seekReadInt32(pev, textHeaderStart + 16)) | 0;
  const textSegmentPhysicalLoc = (textHeaderStart === 0 ? 0 : seekReadInt32(pev, textHeaderStart + 20)) | 0;
  const dataSegmentPhysicalSize = (dataHeaderStart === 0 ? 0 : seekReadInt32(pev, dataHeaderStart + 16)) | 0;
  const dataSegmentPhysicalLoc = (dataHeaderStart === 0 ? 0 : seekReadInt32(pev, dataHeaderStart + 20)) | 0;

  const anyV2P = function (tupledArg) {
    const pev_1 = pefile.GetView();

    const look_1 = function (i_2, pos_2) {
      look_1: while (true) {
        if (i_2 >= numSections) {
          throw new Error(fileName + ": bad " + tupledArg[0] + ", rva " + tupledArg[1].toString());
          return 0;
        } else {
          const virtSize_2 = seekReadInt32(pev_1, pos_2 + 8) | 0;
          const virtAddr_2 = seekReadInt32(pev_1, pos_2 + 12) | 0;
          const physLoc_1 = seekReadInt32(pev_1, pos_2 + 20) | 0;

          if (tupledArg[1] >= virtAddr_2 ? tupledArg[1] < virtAddr_2 + virtSize_2 : false) {
            return tupledArg[1] - virtAddr_2 + physLoc_1 | 0;
          } else {
            i_2 = i_2 + 1;
            pos_2 = pos_2 + 40;
            continue look_1;
          }
        }
      }
    };

    return look_1(0, sectionHeadersStartPhysLoc) | 0;
  };

  const cliHeaderPhysLoc = anyV2P(["cli header", cliHeaderAddr]) | 0;

  const _majorRuntimeVersion = seekReadUInt16(pev, cliHeaderPhysLoc + 4);

  const _minorRuntimeVersion = seekReadUInt16(pev, cliHeaderPhysLoc + 6);

  const metadataAddr = seekReadInt32(pev, cliHeaderPhysLoc + 8) | 0;
  const metadataSize = seekReadInt32(pev, cliHeaderPhysLoc + 12) | 0;
  const cliFlags = seekReadInt32(pev, cliHeaderPhysLoc + 16) | 0;
  const ilOnly = (cliFlags & 1) !== 0;
  const only32 = (cliFlags & 2) !== 0;
  const is32bitpreferred = (cliFlags & 131075) !== 0;

  const _strongnameSigned = (cliFlags & 8) !== 0;

  const _trackdebugdata = (cliFlags & 65536) !== 0;

  const entryPointToken = seekReadUncodedToken(pev, cliHeaderPhysLoc + 20);
  const resourcesAddr = seekReadInt32(pev, cliHeaderPhysLoc + 24) | 0;
  const resourcesSize = seekReadInt32(pev, cliHeaderPhysLoc + 28) | 0;
  const strongnameAddr = seekReadInt32(pev, cliHeaderPhysLoc + 32) | 0;

  const _strongnameSize = seekReadInt32(pev, cliHeaderPhysLoc + 36) | 0;

  const vtableFixupsAddr = seekReadInt32(pev, cliHeaderPhysLoc + 40) | 0;

  const _vtableFixupsSize = seekReadInt32(pev, cliHeaderPhysLoc + 44) | 0;

  if (logging) {
    dprintn(fileName + ": metadataAddr = " + metadataAddr.toString());
  }

  if (logging) {
    dprintn(fileName + ": resourcesAddr = " + resourcesAddr.toString());
  }

  if (logging) {
    dprintn(fileName + ": resourcesSize = " + resourcesSize.toString());
  }

  if (logging) {
    dprintn(fileName + ": nativeResourcesAddr = " + nativeResourcesAddr.toString());
  }

  if (logging) {
    dprintn(fileName + ": nativeResourcesSize = " + nativeResourcesSize.toString());
  }

  const metadataPhysLoc = anyV2P(["metadata", metadataAddr]) | 0;
  let pdb;
  pdbPath;
  pdb = null;
  const pectxt = new PEReader(fileName, pdb, entryPointToken, pefile, textSegmentPhysicalLoc, textSegmentPhysicalSize, dataSegmentPhysicalLoc, dataSegmentPhysicalSize, anyV2P, metadataAddr, sectionHeaders, nativeResourcesAddr, nativeResourcesSize, resourcesAddr, strongnameAddr, vtableFixupsAddr);
  const peinfo = [subsys, [subsysMajor, subsysMinor], useHighEnthropyVA, ilOnly, only32, is32bitpreferred, only64, platform, isDll, alignVirt, alignPhys, imageBaseReal];
  return [metadataPhysLoc, metadataSize, peinfo, pectxt, pev, pdb];
}
export function openPE(fileName, pefile, pdbPath, reduceMemoryUsage, ilGlobals) {
  const patternInput = openPEFileReader(fileName, pefile, pdbPath);
  const patternInput_1 = openMetadataReader(fileName, pefile, patternInput[0], patternInput[2], patternInput[3], patternInput[4], patternInput[3], reduceMemoryUsage, ilGlobals);
  return [patternInput_1[0], patternInput_1[1], patternInput[5]];
}
export function openPEMetadataOnly(fileName, peinfo, pectxtEager, pev, mdfile, reduceMemoryUsage, ilGlobals) {
  return openMetadataReader(fileName, mdfile, 0, peinfo, pectxtEager, pev, null, reduceMemoryUsage, ilGlobals);
}
export function ClosePdbReader(pdb) {
  pdb;
}
export class MetadataOnlyFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MetadataOnlyFlag",
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
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.MetadataOnlyFlag", MetadataOnlyFlag);
export class ReduceMemoryFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ReduceMemoryFlag",
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
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ReduceMemoryFlag", ReduceMemoryFlag);
export class ILReaderOptions {
  constructor(pdbPath, ilGlobals, reduceMemoryUsage, metadataOnly, tryGetMetadataSnapshot) {
    this.pdbPath = pdbPath;
    this.ilGlobals = ilGlobals;
    this.reduceMemoryUsage = reduceMemoryUsage;
    this.metadataOnly = metadataOnly;
    this.tryGetMetadataSnapshot = tryGetMetadataSnapshot;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILReaderOptions",
      interfaces: ["FSharpRecord"],
      properties: {
        pdbPath: Option("string"),
        ilGlobals: ILGlobals,
        reduceMemoryUsage: ReduceMemoryFlag,
        metadataOnly: MetadataOnlyFlag,
        tryGetMetadataSnapshot: _Function([Tuple(["string", Date]), Option(Tuple([Any, Any, "number"]))])
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILReaderOptions", ILReaderOptions);
export class ILModuleReader {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILModuleReader",
      interfaces: ["System.IDisposable"],
      properties: {
        ILAssemblyRefs: makeGeneric(List, {
          T: ILAssemblyRef
        }),
        ILModuleDef: ILModuleDef
      }
    };
  }

  constructor(ilModule, ilAssemblyRefs, dispose) {
    this.ilModule = ilModule;
    this.ilAssemblyRefs = ilAssemblyRefs;
    this.dispose = dispose;
  }

  get ILModuleDef() {
    return this.ilModule;
  }

  get ILAssemblyRefs() {
    return this.ilAssemblyRefs.value;
  }

  Dispose() {
    this.dispose();
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.ILBinaryReader.ILModuleReader", ILModuleReader);
export function OpenILModuleReaderFromBytes(fileName, bytes, opts) {
  const pefile = new ByteFile(fileName, bytes);
  const patternInput = openPE(fileName, pefile, opts.pdbPath, opts.reduceMemoryUsage.Equals(new ReduceMemoryFlag(0)), opts.ilGlobals);
  return new ILModuleReader(patternInput[0], patternInput[1], function () {
    ClosePdbReader(patternInput[2]);
  });
}