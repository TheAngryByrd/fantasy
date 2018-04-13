import { SR } from "../codegen/FSComp";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compare, Option, Unit, Tuple, Function as _Function, equals, hash, Array as _Array, makeGeneric, GenericParam } from "../fable-core/Util";
import { reverse, filter, map as map_1, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { PickledCcuInfo, ObjExprMethod, SlotSig, SlotParam, StaticOptimization, NewFreeVarsCache, newUnique, SequentialOpKind, Expr, ForLoopStyle, SpecialWhileLoopMarker, RecordConstructionInfo, TOp, LValueOperation, Binding, DecisionTreeTarget, DecisionTreeTest, DecisionTreeCase, DecisionTree, Const, ModuleOrNamespaceType, ValOptionalData, ValFlags, ValUseFlag, ValBaseOrThisInfo, ValInline, TyconObjModelKind, ValMemberInfo, AttribNamedArg, AttribExpr, Attrib, AttribKind, ParentRef, TyconAugmentation, EntityOptionalData, MaybeLazy, MakeRecdFieldsTable, RecdField, Accessibility, taccessPublic, ExceptionInfo, UnionCase, TyconObjModelData, TILObjectReprData, MakeUnionRepr, TyconRepresentation, EntityFlags, CompilationPath, ModuleOrNamespaceKind, ValReprInfo, TyparReprInfo, ArgReprInfo, ValReprInfoModule, tupInfoStruct, tupInfoRef, stripTyparEqns, TyparFlags, newStamp, TyparConstraint, Measure, stripUnitEqnsAux, TraitConstraintInfo, TraitConstraintSln, TyparKind, VRefNonLocal, VRefLocal, ValLinkagePartialKey, ValLinkageFullKey, NonLocalValOrMemberRef, $7C$VRefLocal$7C$VRefNonLocal$7C$ as _VRefLocal_VRefNonLocal_, RecdFieldRef, UnionCaseRef, ERefLocal, $7C$ERefLocal$7C$ERefNonLocal$7C$ as _ERefLocal_ERefNonLocal_, ERefNonLocal, mkNonLocalEntityRef, TType, NonLocalEntityRef, PublicPath, Val, Typar, Entity, CcuThunk } from "./tast";
import { toList, initialize, iterate } from "../fable-core/Seq";
import { defaultArg, makeSome, getValue } from "../fable-core/Option";
import { create, tryGetValue } from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import Comparer from "../fable-core/Comparer";
import { fromNumber, fromValue, fromBits } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { mkRange, mkPos, range0, range } from "./range";
import { ByteStream, ByteBuffer } from "../absil/bytes";
import { TcGlobals } from "./TcGlobals";
import { ILToken, ILTailcall, mkLdarg, ILAlignment, ILInstr, ILReadonly, ILVolatility, ILBasicType, ILFieldSpec, ILMethodSpec, ILFieldRef, ILMethodRef, ILTypeSpec, ILCallingSignature, mkILTyvarTy, mkILBoxedType, ILType, ILArrayShape, ILTypeRef, ILCallingConv, ILThisConvention, ILArgConvention, rescopeILScopeRef, ILAssemblyRef, ILModuleRef, PublicKey, ILModuleDef, ILScopeRef } from "../absil/il";
import { newCache, Bits } from "./lib";
import { Microsoft, System } from "../fcs-fable/adapters";
import { int64BitsToDouble, getBytesInt32, toSingle, doubleToInt64Bits, getBytesSingle, toInt32 } from "../fable-core/BitConverter";
import { error, Error as _Error, warning } from "./ErrorLogger";
import CurriedLambda from "../fable-core/CurriedLambda";
import { NameMultiMapModule, LazyWithContext, Lazy } from "../absil/illib";
import { createFromValue } from "../fable-core/Lazy";
import { map } from "../fable-core/Array";
import { printf, toText } from "../fable-core/String";
import { QueueListModule } from "./QueueList";
import { SequencePointInfoForSeq, SequencePointInfoForFinally, SequencePointInfoForWith, SequencePointInfoForTry, SequencePointInfoForForLoop, SequencePointInfoForWhileLoop, SequencePointInfoForBinding, SequencePointInfoForTarget, MemberFlags, MemberKind, XmlDoc as XmlDoc_1, ident } from "./ast";
import { intToRational, DivRational, ZeroRational, GetDenominator, GetNumerator } from "./rational";
import { evalTupInfoIsStruct, normalizeMeasure } from "./TastOps";
import { toList as toList_1 } from "../utils/ResizeArray";
export const verbose = false;
export function ffailwith(fileName, str) {
  const msg = SR.pickleErrorReadingWritingMetadata(fileName, str);
  throw new Error(msg);
}
export class PickledDataWithReferences {
  constructor(rawData, fixupThunks) {
    this.RawData = rawData;
    this.FixupThunks = fixupThunks;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TastPickle.PickledDataWithReferences",
      interfaces: ["FSharpRecord"],
      properties: {
        RawData: GenericParam("RawData"),
        FixupThunks: makeGeneric(List, {
          T: CcuThunk
        })
      }
    };
  }

  Fixup(loader) {
    iterate(reqd => {
      reqd.Fixup(loader(reqd.AssemblyName));
    }, this.FixupThunks);
    return this.RawData;
  }

  OptionalFixup(loader) {
    iterate(reqd => {
      const matchValue = loader(reqd.AssemblyName);

      if (matchValue == null) {
        reqd.FixupOrphaned();
      } else {
        reqd.Fixup(getValue(matchValue));
      }
    }, this.FixupThunks);
    return this.RawData;
  }

}
setType("Microsoft.FSharp.Compiler.TastPickle.PickledDataWithReferences", PickledDataWithReferences);
export class Table {
  constructor(name, tbl, rows, count) {
    this.name = name;
    this.tbl = tbl;
    this.rows = rows;
    this.count = count | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TastPickle.Table",
      interfaces: ["FSharpRecord"],
      properties: {
        name: "string",
        tbl: makeGeneric(Map, {
          TKey: GenericParam("T"),
          TValue: "number"
        }),
        rows: _Array(GenericParam("T")),
        count: "number"
      }
    };
  }

  get AsArray() {
    return Array.from(this.rows);
  }

  get Size() {
    return this.rows.length;
  }

  Add(x) {
    const n = this.count | 0;
    this.count = this.count + 1 | 0;
    this.tbl.set(x, n);
    this.rows.push(x);
    return n | 0;
  }

  FindOrAdd(x) {
    const patternInput = tryGetValue(this.tbl, x, 0);

    if (patternInput[0]) {
      return patternInput[1] | 0;
    } else {
      return this.Add(x) | 0;
    }
  }

  static Create(n) {
    return new Table(n, create(null, fromEqualityComparer({
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

    })), [], 0);
  }

}
setType("Microsoft.FSharp.Compiler.TastPickle.Table", Table);
export class InputTable {
  constructor(itbl_name, itbl_rows) {
    this.itbl_name = itbl_name;
    this.itbl_rows = itbl_rows;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TastPickle.InputTable",
      interfaces: ["FSharpRecord"],
      properties: {
        itbl_name: "string",
        itbl_rows: _Array(GenericParam("T"))
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.TastPickle.InputTable", InputTable);
export function new_itbl(n, r) {
  return new InputTable(n, r);
}
export class NodeOutTable {
  constructor(nodeStamp, nodeName, getRange, deref, name, table) {
    this.NodeStamp = nodeStamp;
    this.NodeName = nodeName;
    this.GetRange = getRange;
    this.Deref = deref;
    this.Name = name;
    this.Table = table;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TastPickle.NodeOutTable",
      interfaces: ["FSharpRecord"],
      properties: {
        NodeStamp: _Function([GenericParam("Node"), Long]),
        NodeName: _Function([GenericParam("Node"), "string"]),
        GetRange: _Function([GenericParam("Node"), range]),
        Deref: _Function([GenericParam("Node"), GenericParam("Data")]),
        Name: "string",
        Table: makeGeneric(Table, {
          T: Long
        })
      }
    };
  }

  get Size() {
    return this.Table.Size;
  }

}
setType("Microsoft.FSharp.Compiler.TastPickle.NodeOutTable", NodeOutTable);
export class WriterState {
  constructor(os, oscope, occus, otycons, otypars, ovals, ostrings, opubpaths, onlerefs, osimpletyps, oglobals, ofile, oInMem) {
    this.os = os;
    this.oscope = oscope;
    this.occus = occus;
    this.otycons = otycons;
    this.otypars = otypars;
    this.ovals = ovals;
    this.ostrings = ostrings;
    this.opubpaths = opubpaths;
    this.onlerefs = onlerefs;
    this.osimpletyps = osimpletyps;
    this.oglobals = oglobals;
    this.ofile = ofile;
    this.oInMem = oInMem;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TastPickle.WriterState",
      interfaces: ["FSharpRecord"],
      properties: {
        os: ByteBuffer,
        oscope: CcuThunk,
        occus: makeGeneric(Table, {
          T: "string"
        }),
        otycons: makeGeneric(NodeOutTable, {
          Data: Entity,
          Node: Entity
        }),
        otypars: makeGeneric(NodeOutTable, {
          Data: Typar,
          Node: Typar
        }),
        ovals: makeGeneric(NodeOutTable, {
          Data: Val,
          Node: Val
        }),
        ostrings: makeGeneric(Table, {
          T: "string"
        }),
        opubpaths: makeGeneric(Table, {
          T: _Array(Int32Array, true)
        }),
        onlerefs: makeGeneric(Table, {
          T: Tuple(["number", _Array(Int32Array, true)])
        }),
        osimpletyps: makeGeneric(Table, {
          T: "number"
        }),
        oglobals: TcGlobals,
        ofile: "string",
        oInMem: "boolean"
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.TastPickle.WriterState", WriterState);
export function pfailwith(st, str) {
  return ffailwith(st.ofile, str);
}
export class NodeInTable {
  constructor(linkNode, isLinked, name, nodes) {
    this.LinkNode = linkNode;
    this.IsLinked = isLinked;
    this.Name = name;
    this.Nodes = nodes;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TastPickle.NodeInTable",
      interfaces: ["FSharpRecord"],
      properties: {
        LinkNode: _Function([GenericParam("Node"), GenericParam("Data"), Unit]),
        IsLinked: _Function([GenericParam("Node"), "boolean"]),
        Name: "string",
        Nodes: _Array(GenericParam("Node"))
      }
    };
  }

  Get(n) {
    return this.Nodes[n];
  }

  get Count() {
    return this.Nodes.length;
  }

  static Create(mkEmpty, lnk, isLinked, nm, n) {
    return new NodeInTable(lnk, isLinked, nm, Array.from(initialize(n, function (_i) {
      return mkEmpty();
    })));
  }

}
setType("Microsoft.FSharp.Compiler.TastPickle.NodeInTable", NodeInTable);
export class ReaderState {
  constructor(is, iilscope, iccus, itycons, itypars, ivals, istrings, ipubpaths, inlerefs, isimpletyps, ifile, iILModule) {
    this.is = is;
    this.iilscope = iilscope;
    this.iccus = iccus;
    this.itycons = itycons;
    this.itypars = itypars;
    this.ivals = ivals;
    this.istrings = istrings;
    this.ipubpaths = ipubpaths;
    this.inlerefs = inlerefs;
    this.isimpletyps = isimpletyps;
    this.ifile = ifile;
    this.iILModule = iILModule;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.TastPickle.ReaderState",
      interfaces: ["FSharpRecord"],
      properties: {
        is: ByteStream,
        iilscope: ILScopeRef,
        iccus: makeGeneric(InputTable, {
          T: CcuThunk
        }),
        itycons: makeGeneric(NodeInTable, {
          Data: Entity,
          Node: Entity
        }),
        itypars: makeGeneric(NodeInTable, {
          Data: Typar,
          Node: Typar
        }),
        ivals: makeGeneric(NodeInTable, {
          Data: Val,
          Node: Val
        }),
        istrings: makeGeneric(InputTable, {
          T: "string"
        }),
        ipubpaths: makeGeneric(InputTable, {
          T: PublicPath
        }),
        inlerefs: makeGeneric(InputTable, {
          T: NonLocalEntityRef
        }),
        isimpletyps: makeGeneric(InputTable, {
          T: TType
        }),
        ifile: "string",
        iILModule: Option(ILModuleDef)
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.TastPickle.ReaderState", ReaderState);
export function ufailwith(st, str) {
  return ffailwith(st.ifile, str);
}
export function p_byte(b, st) {
  st.os.EmitIntAsByte(b);
}
export function p_bool(b, st) {
  p_byte(b ? 1 : 0, st);
}
export function prim_p_int32(i, st) {
  p_byte(Bits.b0(i), st);
  p_byte(Bits.b1(i), st);
  p_byte(Bits.b2(i), st);
  p_byte(Bits.b3(i), st);
}
export function p_int32(n, st) {
  if (n >= 0 ? n <= 127 : false) {
    p_byte(Bits.b0(n), st);
  } else if (n >= 128 ? n <= 16383 : false) {
    p_byte(128 | n >> 8, st);
    p_byte(n & 255, st);
  } else {
    p_byte(255, st);
    prim_p_int32(n, st);
  }
}
export const space = null;
export function p_space(n, unitVar1, st) {
  for (let i = 0; i <= n - 1; i++) {
    p_byte(0, st);
  }
}
export function p_used_space1(f, st) {
  p_byte(1, st);
  f(st);
  p_space(1, space, st);
}
export function p_bytes(s, st) {
  const len = s.length | 0;
  p_int32(len, st);
  st.os.EmitBytes(s);
}
export function p_prim_string(s, st) {
  const bytes = System.Text.Encoding.UTF8.GetBytes(s);
  const len = bytes.length | 0;
  p_int32(len, st);
  st.os.EmitBytes(bytes);
}
export function p_int(c, st) {
  p_int32(c, st);
}
export function p_int8(i, st) {
  p_int32(i, st);
}
export function p_uint8(i, st) {
  p_byte(~~i, st);
}
export function p_int16(i, st) {
  p_int32(i, st);
}
export function p_uint16(x, st) {
  p_int32(~~x, st);
}
export function p_uint32(x, st) {
  p_int32(~~x, st);
}
export function p_int64(i, st) {
  p_int32(~~i.and(fromBits(4294967295, 0, false)).toNumber(), st);
  p_int32(~~i.shr(32).toNumber(), st);
}
export function p_uint64(x, st) {
  p_int64(fromValue(x), st);
}
export function bits_of_float32(x) {
  return toInt32(getBytesSingle(x), 0) | 0;
}
export function bits_of_float(x) {
  return doubleToInt64Bits(x);
}
export function p_single(i, st) {
  p_int32(bits_of_float32(i), st);
}
export function p_double(i, st) {
  p_int64(bits_of_float(i), st);
}
export function p_ieee64(i, st) {
  p_int64(bits_of_float(i), st);
}
export function p_char(i, st) {
  p_uint16(i.charCodeAt(0) & 0xFFFF, st);
}
export function u_byte(st) {
  return ~~st.is.ReadByte() | 0;
}
export function u_bool(st) {
  const b = u_byte(st) | 0;
  return b === 1;
}
export function prim_u_int32(st) {
  const b0 = u_byte(st) | 0;
  const b1 = u_byte(st) | 0;
  const b2 = u_byte(st) | 0;
  const b3 = u_byte(st) | 0;
  return b0 | b1 << 8 | b2 << 16 | b3 << 24 | 0;
}
export function u_int32(st) {
  const b0 = u_byte(st) | 0;

  if (b0 <= 127) {
    return b0 | 0;
  } else if (b0 <= 191) {
    const b0_1 = b0 & 127 | 0;
    const b1 = u_byte(st) | 0;
    return b0_1 << 8 | b1 | 0;
  } else {
    return prim_u_int32(st) | 0;
  }
}
export function u_bytes(st) {
  const n = u_int32(st) | 0;
  return st.is.ReadBytes(n);
}
export function u_prim_string(st) {
  const len = u_int32(st) | 0;
  return st.is.ReadUtf8String(len);
}
export function u_int(st) {
  return u_int32(st) | 0;
}
export function u_int8(st) {
  return (u_int32(st) + 0x80 & 0xFF) - 0x80 | 0;
}
export function u_uint8(st) {
  return u_byte(st) & 0xFF;
}
export function u_int16(st) {
  return (u_int32(st) + 0x8000 & 0xFFFF) - 0x8000 | 0;
}
export function u_uint16(st) {
  return u_int32(st) & 0xFFFF;
}
export function u_uint32(st) {
  return u_int32(st) >>> 0;
}
export function u_int64(st) {
  const b1 = fromNumber(u_int32(st), false).and(fromBits(4294967295, 0, false));
  const b2 = fromNumber(u_int32(st), false);
  return b1.or(b2.shl(32));
}
export function u_uint64(st) {
  return fromValue(u_int64(st));
}
export function float32_of_bits(x) {
  return toSingle(getBytesInt32(x), 0);
}
export function float_of_bits(x) {
  return int64BitsToDouble(x);
}
export function u_single(st) {
  return float32_of_bits(u_int32(st));
}
export function u_double(st) {
  return float_of_bits(u_int64(st));
}
export function u_ieee64(st) {
  return float_of_bits(u_int64(st));
}
export function u_char(st) {
  return String.fromCharCode(~~u_uint16(st));
}
export function u_space(n, st) {
  for (let i = 0; i <= n - 1; i++) {
    const b = u_byte(st) | 0;

    if (b !== 0) {
      warning(new _Error(SR.pickleUnexpectedNonZero(st.ifile), range0));
    }
  }
}
export function u_used_space1(f, st) {
  const b = u_byte(st) | 0;

  if (b === 0) {
    return null;
  } else if (b === 1) {
    const x = f(st);
    u_space(1, st);
    return makeSome(x);
  } else {
    warning(new _Error(SR.pickleUnexpectedNonZero(st.ifile), range0));
    return null;
  }
}
export function p_osgn_ref(_ctxt, outMap, x, st) {
  const idx = outMap.Table.FindOrAdd(outMap.NodeStamp(x)) | 0;
  p_int(idx, st);
}
export function p_osgn_decl(outMap, p, x, st) {
  const stamp = outMap.NodeStamp(x);
  const idx = outMap.Table.FindOrAdd(stamp) | 0;

  (function (tupledArg, st_1) {
    (function (arg00_, arg10_) {
      p_int(arg00_, arg10_);
    })(tupledArg[0], st_1);

    p(tupledArg[1], st_1);
  })([idx, outMap.Deref(x)], st);
}
export function u_osgn_ref(inMap, st) {
  const n = u_int(st) | 0;

  if (n < 0 ? true : n >= inMap.Count) {
    ufailwith(st, "u_osgn_ref: out of range, table = " + inMap.Name + ", n = " + n.toString());
  }

  return inMap.Get(n);
}
export function u_osgn_decl(inMap, u, st) {
  const patternInput = function (st_1) {
    const a = function (arg00_) {
      return u_int(arg00_);
    }(st_1) | 0;

    const b = u(st_1);
    return [a, b];
  }(st);

  const res = inMap.Get(patternInput[0]);
  inMap.LinkNode(res, patternInput[1]);
  return res;
}
export function encode_uniq(tbl, key) {
  return tbl.FindOrAdd(key) | 0;
}
export function lookup_uniq(st, tbl, n) {
  if (n < 0 ? true : n >= tbl.itbl_rows.length) {
    ufailwith(st, "lookup_uniq in table " + tbl.itbl_name + " out of range, n = " + n.toString() + ", sizeof(tab) = " + tbl.itbl_rows.length.toString());
  }

  return tbl.itbl_rows[n];
}
export function p_array_core(f, x, st) {
  for (let i = 0; i <= x.length - 1; i++) {
    f(x[i], st);
  }
}
export function p_array(f) {
  return CurriedLambda(function (x, st) {
    p_int(x.length, st);
    p_array_core(f, x, st);
  });
}
export function p_array_ext(extraf, f, x, st) {
  const n = x.length | 0;
  const n_1 = (extraf != null ? n | -2147483648 : n) | 0;
  p_int(n_1, st);

  if (extraf != null) {
    getValue(extraf)(st);
  }

  p_array_core(f, x, st);
}
export function p_list(f, x, st) {
  p_array(f)(Array.from(x), st);
}
export function p_list_ext(extraf, f, x, st) {
  p_array_ext(extraf, f, Array.from(x), st);
}
export function p_List(f, x, st) {
  p_list(f, x, st);
}
export function p_wrap(f, p, x, st) {
  p(f(x), st);
}
export function p_option(f, x, st) {
  if (x != null) {
    p_byte(1, st);
    f(getValue(x), st);
  } else {
    p_byte(0, st);
  }
}

function p_lazy_impl(p, v, st) {
  const fixupPos1 = st.os.Position | 0;
  prim_p_int32(0, st);
  const fixupPos2 = st.os.Position | 0;
  prim_p_int32(0, st);
  const fixupPos3 = st.os.Position | 0;
  prim_p_int32(0, st);
  const fixupPos4 = st.os.Position | 0;
  prim_p_int32(0, st);
  const fixupPos5 = st.os.Position | 0;
  prim_p_int32(0, st);
  const fixupPos6 = st.os.Position | 0;
  prim_p_int32(0, st);
  const fixupPos7 = st.os.Position | 0;
  prim_p_int32(0, st);
  const idx1 = st.os.Position | 0;
  const otyconsIdx1 = st.otycons.Size | 0;
  const otyparsIdx1 = st.otypars.Size | 0;
  const ovalsIdx1 = st.ovals.Size | 0;
  p(v, st);
  const idx2 = st.os.Position | 0;

  (function (arg00, arg10) {
    st.os.FixupInt32(arg00, arg10);
  })(fixupPos1, idx2 - idx1);

  const otyconsIdx2 = st.otycons.Size | 0;
  const otyparsIdx2 = st.otypars.Size | 0;
  const ovalsIdx2 = st.ovals.Size | 0;

  (function (arg00_1, arg10_1) {
    st.os.FixupInt32(arg00_1, arg10_1);
  })(fixupPos2, otyconsIdx1);

  (function (arg00_2, arg10_2) {
    st.os.FixupInt32(arg00_2, arg10_2);
  })(fixupPos3, otyconsIdx2);

  (function (arg00_3, arg10_3) {
    st.os.FixupInt32(arg00_3, arg10_3);
  })(fixupPos4, otyparsIdx1);

  (function (arg00_4, arg10_4) {
    st.os.FixupInt32(arg00_4, arg10_4);
  })(fixupPos5, otyparsIdx2);

  (function (arg00_5, arg10_5) {
    st.os.FixupInt32(arg00_5, arg10_5);
  })(fixupPos6, ovalsIdx1);

  (function (arg00_6, arg10_6) {
    st.os.FixupInt32(arg00_6, arg10_6);
  })(fixupPos7, ovalsIdx2);
}

export function p_lazy(p) {
  return CurriedLambda(function (x, st) {
    p_lazy_impl(p, Lazy.force(x), st);
  });
}
export function p_maybe_lazy(p, x, st) {
  p_lazy_impl(p, x.Value, st);
}
export function p_hole() {
  const h = {
    contents: null
  };
  return [function (f) {
    h.contents = f;
  }, function (x, st) {
    const matchValue = h.contents;

    if (matchValue == null) {
      pfailwith(st, "p_hole: unfilled hole");
    } else {
      getValue(matchValue)(x, st);
    }
  }];
}
export function u_array_core(f, n, st) {
  const res = new Array(n).fill(null);

  for (let i = 0; i <= n - 1; i++) {
    res[i] = f(st);
  }

  return res;
}
export function u_array(f) {
  return CurriedLambda(function (st) {
    const n = u_int(st) | 0;
    return u_array_core(f, n, st);
  });
}
export function u_array_ext(extraf, f, st) {
  const n = u_int(st) | 0;
  const extraItem = (n & -2147483648) === -2147483648 ? makeSome(extraf(st)) : null;
  const arr = u_array_core(f, n & 2147483647, st);
  return [extraItem, arr];
}
export function u_list(f, st) {
  return toList(u_array(f)(st));
}
export function u_list_ext(extra, f, st) {
  const patternInput = u_array_ext(extra, f, st);
  return [patternInput[0], toList(patternInput[1])];
}
export function u_List(f, st) {
  return u_list(f, st);
}
export function u_array_revi(f, st) {
  const n = u_int(st) | 0;
  const res = new Array(n).fill(null);

  for (let i = 0; i <= n - 1; i++) {
    res[i] = f(st, n - 1 - i);
  }

  return res;
}
export function u_list_revi(f, st) {
  return toList(u_array_revi(f, st));
}
export function u_wrap(f, u, st) {
  return f(u(st));
}
export function u_option(f, st) {
  const tag = u_byte(st) | 0;

  if (tag === 0) {
    return null;
  } else if (tag === 1) {
    return makeSome(f(st));
  } else {
    return ufailwith(st, "u_option: found number " + tag.toString());
  }
}
export function u_lazy(u) {
  return CurriedLambda(function (st) {
    const len = prim_u_int32(st) | 0;
    const otyconsIdx1 = prim_u_int32(st) | 0;
    const otyconsIdx2 = prim_u_int32(st) | 0;
    const otyparsIdx1 = prim_u_int32(st) | 0;
    const otyparsIdx2 = prim_u_int32(st) | 0;
    const ovalsIdx1 = prim_u_int32(st) | 0;
    const ovalsIdx2 = prim_u_int32(st) | 0;
    [len, otyconsIdx1, otyconsIdx2, otyparsIdx1, otyparsIdx2, ovalsIdx1, ovalsIdx2];
    return createFromValue(u(st));
  });
}
export function u_hole() {
  const h = {
    contents: null
  };
  return [function (f) {
    h.contents = f;
  }, function (st) {
    const matchValue = h.contents;

    if (matchValue == null) {
      return ufailwith(st, "u_hole: unfilled hole");
    } else {
      return getValue(matchValue)(st);
    }
  }];
}
export function encode_string(stringTab, x) {
  return encode_uniq(stringTab, x) | 0;
}
export function decode_string(x) {
  return x;
}
export function lookup_string(st, stringTab, x) {
  return lookup_uniq(st, stringTab, x);
}
export const u_encoded_string = CurriedLambda(function (st) {
  return u_prim_string(st);
});
export function u_string(st) {
  return lookup_uniq(st, st.istrings, u_int(st));
}
export const u_strings = CurriedLambda(function (st) {
  return u_list(function (arg00_) {
    return u_string(arg00_);
  }, st);
});
export const u_ints = CurriedLambda(function (st) {
  return u_list(function (arg00_) {
    return u_int(arg00_);
  }, st);
});
export const p_encoded_string = CurriedLambda(function (s, st) {
  p_prim_string(s, st);
});
export function p_string(s, st) {
  p_int(encode_string(st.ostrings, s), st);
}
export const p_strings = CurriedLambda(function (x, st) {
  p_list(function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  }, x, st);
});
export const p_ints = CurriedLambda(function (x, st) {
  p_list(function (arg00_, arg10_) {
    p_int(arg00_, arg10_);
  }, x, st);
});
export function encode_ccuref(ccuTab, x) {
  return encode_uniq(ccuTab, x.AssemblyName) | 0;
}
export function decode_ccuref(x) {
  return x;
}
export function lookup_ccuref(st, ccuTab, x) {
  return lookup_uniq(st, ccuTab, x);
}
export function u_encoded_ccuref(st) {
  const matchValue = u_byte(st) | 0;

  if (matchValue === 0) {
    return u_prim_string(st);
  } else {
    return ufailwith(st, "u_encoded_ccuref: found number " + matchValue.toString());
  }
}
export function u_ccuref(st) {
  return lookup_uniq(st, st.iccus, u_int(st));
}
export function p_encoded_ccuref(x, st) {
  p_byte(0, st);
  p_prim_string(x, st);
}
export function p_ccuref(s, st) {
  p_int(encode_ccuref(st.occus, s), st);
}
export function decode_pubpath(st, stringTab, a) {
  return new PublicPath(0, map(function (x) {
    return lookup_string(st, stringTab, x);
  }, a, Array));
}
export function lookup_pubpath(st, pubpathTab, x) {
  return lookup_uniq(st, pubpathTab, x);
}
export const u_encoded_pubpath = CurriedLambda(u_array(function (arg00_) {
  return u_int(arg00_);
}));
export function u_pubpath(st) {
  return lookup_uniq(st, st.ipubpaths, u_int(st));
}
export function encode_pubpath(stringTab, pubpathTab, _arg1) {
  return encode_uniq(pubpathTab, map(function (x) {
    return encode_string(stringTab, x);
  }, _arg1.data, Int32Array)) | 0;
}
export const p_encoded_pubpath = CurriedLambda(p_array(function (arg00_, arg10_) {
  p_int(arg00_, arg10_);
}));
export function p_pubpath(x, st) {
  p_int(encode_pubpath(st.ostrings, st.opubpaths, x), st);
}
export function decode_nleref(st, ccuTab, stringTab, a, b) {
  return mkNonLocalEntityRef(lookup_ccuref(st, ccuTab, a), map(function (x) {
    return lookup_string(st, stringTab, x);
  }, b, Array));
}
export function lookup_nleref(st, nlerefTab, x) {
  return lookup_uniq(st, nlerefTab, x);
}
export const u_encoded_nleref = CurriedLambda(function (st) {
  const a = function (arg00_) {
    return u_int(arg00_);
  }(st) | 0;

  const b = u_array(function (arg00__1) {
    return u_int(arg00__1);
  })(st);
  return [a, b];
});
export function u_nleref(st) {
  return lookup_uniq(st, st.inlerefs, u_int(st));
}
export function encode_nleref(ccuTab, stringTab, nlerefTab, thisCcu, nleref) {
  thisCcu;
  return encode_uniq(nlerefTab, [encode_ccuref(ccuTab, nleref.data[0]), map(function (x) {
    return encode_string(stringTab, x);
  }, nleref.data[1], Int32Array)]) | 0;
}
export const p_encoded_nleref = CurriedLambda(function (tupledArg, st) {
  (function (arg00_, arg10_) {
    p_int(arg00_, arg10_);
  })(tupledArg[0], st);

  p_array(function (arg00__1, arg10__1) {
    p_int(arg00__1, arg10__1);
  })(tupledArg[1], st);
});
export function p_nleref(x, st) {
  p_int(encode_nleref(st.occus, st.ostrings, st.onlerefs, st.oscope, x), st);
}
export function decode_simpletyp(st, _ccuTab, _stringTab, nlerefTab, a) {
  return new TType(1, [ERefNonLocal(lookup_nleref(st, nlerefTab, a)), new List()]);
}
export function lookup_simpletyp(st, simpletypTab, x) {
  return lookup_uniq(st, simpletypTab, x);
}
export function u_encoded_simpletyp(st) {
  return u_int(st) | 0;
}
export function u_simpletyp(st) {
  return lookup_uniq(st, st.isimpletyps, u_int(st));
}
export function encode_simpletyp(ccuTab, stringTab, nlerefTab, simpletypTab, thisCcu, a) {
  return encode_uniq(simpletypTab, encode_nleref(ccuTab, stringTab, nlerefTab, thisCcu, a)) | 0;
}
export function p_encoded_simpletyp(x, st) {
  p_int(x, st);
}
export function p_simpletyp(x, st) {
  p_int(encode_simpletyp(st.occus, st.ostrings, st.onlerefs, st.osimpletyps, st.oscope, x), st);
}
export function pickleObjWithDanglingCcus(inMem, file, g, scope, p, x) {
  let patternInput;
  let st1;
  const os = ByteBuffer.Create(100000);
  const occus = Table.Create("occus");
  const otycons = new NodeOutTable(function (tc) {
    return tc.Stamp;
  }, function (tc_1) {
    return tc_1.LogicalName;
  }, function (tc_2) {
    return tc_2.Range;
  }, function (osgn) {
    return osgn;
  }, "otycons", Table.Create("otycons"));
  const otypars = new NodeOutTable(function (tp) {
    return tp.Stamp;
  }, function (tp_1) {
    return tp_1.DisplayName;
  }, function (tp_2) {
    return tp_2.Range;
  }, function (osgn_1) {
    return osgn_1;
  }, "otypars", Table.Create("otypars"));
  const ovals = new NodeOutTable(function (v) {
    return v.Stamp;
  }, function (v_1) {
    return v_1.LogicalName;
  }, function (v_2) {
    return v_2.Range;
  }, function (osgn_2) {
    return osgn_2;
  }, "ovals", Table.Create("ovals"));
  const ostrings = Table.Create("ostrings");
  const onlerefs = Table.Create("onlerefs");
  st1 = new WriterState(os, scope, occus, otycons, otypars, ovals, ostrings, Table.Create("opubpaths"), onlerefs, Table.Create("osimpletyps"), g, file, inMem);
  p(x, st1);
  const sizes = [st1.otycons.Size, st1.otypars.Size, st1.ovals.Size];
  patternInput = [st1.occus, sizes, st1.ostrings, st1.opubpaths, st1.onlerefs, st1.osimpletyps, st1.os.Close()];
  const phase2data = [patternInput[0].AsArray, patternInput[1], patternInput[2].AsArray, patternInput[3].AsArray, patternInput[4].AsArray, patternInput[5].AsArray, patternInput[6]];
  let phase2bytes;
  const st2 = new WriterState(ByteBuffer.Create(100000), scope, Table.Create("occus (fake)"), new NodeOutTable(function (tc_3) {
    return tc_3.Stamp;
  }, function (tc_4) {
    return tc_4.LogicalName;
  }, function (tc_5) {
    return tc_5.Range;
  }, function (osgn_3) {
    return osgn_3;
  }, "otycons", Table.Create("otycons")), new NodeOutTable(function (tp_3) {
    return tp_3.Stamp;
  }, function (tp_4) {
    return tp_4.DisplayName;
  }, function (tp_5) {
    return tp_5.Range;
  }, function (osgn_4) {
    return osgn_4;
  }, "otypars", Table.Create("otypars")), new NodeOutTable(function (v_3) {
    return v_3.Stamp;
  }, function (v_4) {
    return v_4.LogicalName;
  }, function (v_5) {
    return v_5.Range;
  }, function (osgn_5) {
    return osgn_5;
  }, "ovals", Table.Create("ovals")), Table.Create("ostrings (fake)"), Table.Create("opubpaths (fake)"), Table.Create("onlerefs (fake)"), Table.Create("osimpletyps (fake)"), g, file, inMem);
  const p1 = p_array(function (x_1, st) {
    p_encoded_ccuref(x_1, st);
  });

  const p2 = function (tupledArg, st_1) {
    (function (arg00_, arg10_) {
      p_int(arg00_, arg10_);
    })(tupledArg[0], st_1);

    (function (arg00__1, arg10__1) {
      p_int(arg00__1, arg10__1);
    })(tupledArg[1], st_1);

    (function (arg00__2, arg10__2) {
      p_int(arg00__2, arg10__2);
    })(tupledArg[2], st_1);
  };

  const p3 = p_array(p_encoded_string);
  const p4 = p_array(p_encoded_pubpath);
  const p5 = p_array(p_encoded_nleref);
  const p6 = p_array(function (x_2, st_2) {
    p_encoded_simpletyp(x_2, st_2);
  });
  p1(phase2data[0], st2);
  p2(phase2data[1], st2);
  p3(phase2data[2], st2);
  p4(phase2data[3], st2);
  p5(phase2data[4], st2);
  p6(phase2data[5], st2);

  (function (s, st_3) {
    p_bytes(s, st_3);
  })(phase2data[6], st2);

  phase2bytes = st2.os.Close();
  return phase2bytes;
}
export function check(ilscope, inMap) {
  for (let i = 0; i <= inMap.Count - 1; i++) {
    const n = inMap.Get(i);

    if (!inMap.IsLinked(n)) {
      warning(new _Error(SR.pickleMissingDefinition(i, inMap.Name, ilscope.QualifiedName), range0));
    }
  }
}
export function unpickleObjWithDanglingCcus(file, ilscope, iILModule, u, phase2bytes) {
  let st2;
  const is = ByteStream.FromBytes(phase2bytes, 0, phase2bytes.length);
  const iccus = new_itbl("iccus (fake)", []);
  const itycons = NodeInTable.Create(function () {
    return Entity.NewUnlinked();
  }, function (osgn, tg) {
    osgn.Link(tg);
  }, function (osgn_1) {
    return osgn_1.IsLinked;
  }, "itycons", 0);
  const itypars = NodeInTable.Create(function () {
    return Typar.NewUnlinked();
  }, function (osgn_2, tg_1) {
    osgn_2.Link(tg_1);
  }, function (osgn_3) {
    return osgn_3.IsLinked;
  }, "itypars", 0);
  const ivals = NodeInTable.Create(function () {
    return Val.NewUnlinked();
  }, function (osgn_4, tg_2) {
    osgn_4.Link(tg_2);
  }, function (osgn_5) {
    return osgn_5.IsLinked;
  }, "ivals", 0);
  const istrings = new_itbl("istrings (fake)", []);
  const inlerefs = new_itbl("inlerefs (fake)", []);
  st2 = new ReaderState(is, ilscope, iccus, itycons, itypars, ivals, istrings, new_itbl("ipubpaths (fake)", []), inlerefs, new_itbl("isimpletyps (fake)", []), file, iILModule);
  let phase2data;
  const a_1 = u_array(function (st) {
    return u_encoded_ccuref(st);
  })(st2);

  const b_1 = function (st_1) {
    const a = function (arg00_) {
      return u_int(arg00_);
    }(st_1) | 0;

    const b = function (arg00__1) {
      return u_int(arg00__1);
    }(st_1) | 0;

    const c = function (arg00__2) {
      return u_int(arg00__2);
    }(st_1) | 0;

    return [a, b, c];
  }(st2);

  const c_1 = u_array(u_encoded_string)(st2);
  const d = u_array(u_encoded_pubpath)(st2);
  const e = u_array(u_encoded_nleref)(st2);
  const f = u_array(function (st_2) {
    return u_encoded_simpletyp(st_2);
  })(st2);

  const x7 = function (st_3) {
    return u_bytes(st_3);
  }(st2);

  phase2data = [a_1, b_1, c_1, d, e, f, x7];
  const ccuTab = new_itbl("iccus", map(function (arg00) {
    return CcuThunk.CreateDelayed(arg00);
  }, phase2data[0], Array));
  const stringTab = new_itbl("istrings", map(function (x) {
    return decode_string(x);
  }, phase2data[2], Array));
  const pubpathTab = new_itbl("ipubpaths", map(function (a_2) {
    return decode_pubpath(st2, stringTab, a_2);
  }, phase2data[3], Array));
  const nlerefTab = new_itbl("inlerefs", map(function (tupledArg) {
    return decode_nleref(st2, ccuTab, stringTab, tupledArg[0], tupledArg[1]);
  }, phase2data[4], Array));
  const simpletypTab = new_itbl("isimpletyps", map(function (a_3) {
    return decode_simpletyp(st2, ccuTab, stringTab, nlerefTab, a_3);
  }, phase2data[5], Array));
  let data;
  let st1;
  const is_1 = ByteStream.FromBytes(phase2data[6], 0, phase2data[6].length);
  st1 = new ReaderState(is_1, ilscope, ccuTab, NodeInTable.Create(function () {
    return Entity.NewUnlinked();
  }, function (osgn_6, tg_3) {
    osgn_6.Link(tg_3);
  }, function (osgn_7) {
    return osgn_7.IsLinked;
  }, "itycons", phase2data[1][0]), NodeInTable.Create(function () {
    return Typar.NewUnlinked();
  }, function (osgn_8, tg_4) {
    osgn_8.Link(tg_4);
  }, function (osgn_9) {
    return osgn_9.IsLinked;
  }, "itypars", phase2data[1][1]), NodeInTable.Create(function () {
    return Val.NewUnlinked();
  }, function (osgn_10, tg_5) {
    osgn_10.Link(tg_5);
  }, function (osgn_11) {
    return osgn_11.IsLinked;
  }, "ivals", phase2data[1][2]), stringTab, pubpathTab, nlerefTab, simpletypTab, file, iILModule);
  const res = u(st1);
  check(ilscope, st1.itycons);
  check(ilscope, st1.ivals);
  check(ilscope, st1.itypars);
  data = res;
  return new PickledDataWithReferences(data, toList(ccuTab.itbl_rows));
}
export function p_ILPublicKey(x, st) {
  if (x.tag === 1) {
    p_byte(1, st);
    p_bytes(x.data, st);
  } else {
    p_byte(0, st);
    p_bytes(x.data, st);
  }
}
export function p_ILVersion(x_0, x_1, x_2, x_3, st) {
  const x = [x_0, x_1, x_2, x_3];

  (function (tupledArg, st_5) {
    (function (x_4, st_1) {
      p_uint16(x_4, st_1);
    })(tupledArg[0], st_5);

    (function (x_5, st_2) {
      p_uint16(x_5, st_2);
    })(tupledArg[1], st_5);

    (function (x_6, st_3) {
      p_uint16(x_6, st_3);
    })(tupledArg[2], st_5);

    (function (x_7, st_4) {
      p_uint16(x_7, st_4);
    })(tupledArg[3], st_5);
  })(x, st);
}
export function p_ILModuleRef(x, st) {
  (function (tupledArg, st_3) {
    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg[0], st_3);

    (function (arg00__1, arg10__1) {
      p_bool(arg00__1, arg10__1);
    })(tupledArg[1], st_3);

    (function (x_1, st_1) {
      p_option(function (s, st_2) {
        p_bytes(s, st_2);
      }, x_1, st_1);
    })(tupledArg[2], st_3);
  })([x.Name, x.HasMetadata, x.Hash], st);
}
export function p_ILAssemblyRef(x, st) {
  p_byte(0, st);

  (function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  })(x.Name, st);

  (function (x_1, st_1) {
    p_option(function (s, st_2) {
      p_bytes(s, st_2);
    }, x_1, st_1);
  })(x.Hash, st);

  (function (x_2, st_3) {
    p_option(function (x_3, st_4) {
      p_ILPublicKey(x_3, st_4);
    }, x_2, st_3);
  })(x.PublicKey, st);

  (function (arg00__1, arg10__1) {
    p_bool(arg00__1, arg10__1);
  })(x.Retargetable, st);

  (function (x_4, st_5) {
    p_option(function (tupledArg, st_6) {
      p_ILVersion(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], st_6);
    }, x_4, st_5);
  })(x.Version, st);

  (function (x_5, st_7) {
    p_option(function (arg00__2, arg10__2) {
      p_string(arg00__2, arg10__2);
    }, x_5, st_7);
  })(x.Locale, st);
}
export function p_ILScopeRef(x, st) {
  if (x.tag === 1) {
    p_byte(1, st);
    p_ILModuleRef(x.data, st);
  } else if (x.tag === 2) {
    p_byte(2, st);
    p_ILAssemblyRef(x.data, st);
  } else {
    p_byte(0, st);
  }
}
export function u_ILPublicKey(st) {
  const tag = u_byte(st) | 0;

  if (tag === 0) {
    return new PublicKey(0, u_bytes(st));
  } else if (tag === 1) {
    return new PublicKey(1, u_bytes(st));
  } else {
    return ufailwith(st, "u_ILPublicKey");
  }
}
export function u_ILVersion(st) {
  return function (st_5) {
    const a = function (st_1) {
      return u_uint16(st_1);
    }(st_5);

    const b = function (st_2) {
      return u_uint16(st_2);
    }(st_5);

    const c = function (st_3) {
      return u_uint16(st_3);
    }(st_5);

    const d = function (st_4) {
      return u_uint16(st_4);
    }(st_5);

    return [a, b, c, d];
  }(st);
}
export function u_ILModuleRef(st) {
  const patternInput = function (st_3) {
    const a = function (arg00_) {
      return u_string(arg00_);
    }(st_3);

    const b = function (arg00__1) {
      return u_bool(arg00__1);
    }(st_3);

    const c = function (st_1) {
      return u_option(function (st_2) {
        return u_bytes(st_2);
      }, st_1);
    }(st_3);

    return [a, b, c];
  }(st);

  return ILModuleRef.Create(patternInput[0], patternInput[1], patternInput[2]);
}
export function u_ILAssemblyRef(st) {
  const tag = u_byte(st) | 0;

  if (tag === 0) {
    let patternInput;

    const a = function (arg00_) {
      return u_string(arg00_);
    }(st);

    const b = function (st_1) {
      return u_option(function (st_2) {
        return u_bytes(st_2);
      }, st_1);
    }(st);

    const c = function (st_3) {
      return u_option(function (st_4) {
        return u_ILPublicKey(st_4);
      }, st_3);
    }(st);

    const d = function (arg00__1) {
      return u_bool(arg00__1);
    }(st);

    const e = function (st_5) {
      return u_option(function (st_6) {
        return u_ILVersion(st_6);
      }, st_5);
    }(st);

    const f = function (st_7) {
      return u_option(function (arg00__2) {
        return u_string(arg00__2);
      }, st_7);
    }(st);

    patternInput = [a, b, c, d, e, f];
    return ILAssemblyRef.Create(patternInput[0], patternInput[1], patternInput[2], patternInput[3], patternInput[4], patternInput[5]);
  } else {
    return ufailwith(st, "u_ILAssemblyRef");
  }
}
export function u_ILScopeRef(st) {
  let res;
  const tag = u_byte(st) | 0;

  if (tag === 0) {
    res = new ILScopeRef(0);
  } else if (tag === 1) {
    res = new ILScopeRef(1, u_ILModuleRef(st));
  } else if (tag === 2) {
    res = new ILScopeRef(2, u_ILAssemblyRef(st));
  } else {
    res = ufailwith(st, "u_ILScopeRef");
  }

  const res_1 = rescopeILScopeRef(st.iilscope, res);
  return res_1;
}
export function p_ILHasThis(x, st) {
  p_byte(x.tag === 1 ? 1 : x.tag === 2 ? 2 : 0, st);
}
export const p_ILArrayShape = (() => {
  const f = function (_arg1) {
    return _arg1.data;
  };

  let p;

  const f_1 = function (tupledArg, st_4) {
    (function (x, st) {
      p_option(function (n, st_1) {
        p_int32(n, st_1);
      }, x, st);
    })(tupledArg[0], st_4);

    (function (x_1, st_2) {
      p_option(function (n_1, st_3) {
        p_int32(n_1, st_3);
      }, x_1, st_2);
    })(tupledArg[1], st_4);
  };

  p = function (x_2, st_5) {
    p_list(f_1, x_2, st_5);
  };

  return function (x_3, st_6) {
    p_wrap(f, p, x_3, st_6);
  };
})();
export function p_ILType(ty, st) {
  switch (ty.tag) {
    case 1:
      p_byte(1, st);

      (function (tupledArg, st_2) {
        p_ILArrayShape(tupledArg[0], st_2);

        (function (ty_1, st_1) {
          p_ILType(ty_1, st_1);
        })(tupledArg[1], st_2);
      })([ty.data[0], ty.data[1]], st);

      break;

    case 2:
      p_byte(2, st);
      p_ILTypeSpec(ty.data, st);
      break;

    case 3:
      p_byte(3, st);
      p_ILTypeSpec(ty.data, st);
      break;

    case 4:
      p_byte(4, st);
      p_ILType(ty.data, st);
      break;

    case 5:
      p_byte(5, st);
      p_ILType(ty.data, st);
      break;

    case 6:
      p_byte(6, st);
      p_ILCallSig(ty.data, st);
      break;

    case 7:
      p_byte(7, st);
      p_uint16(ty.data, st);
      break;

    case 8:
      p_byte(8, st);

      (function (tupledArg_1, st_5) {
        (function (arg00_, arg10_) {
          p_bool(arg00_, arg10_);
        })(tupledArg_1[0], st_5);

        (function (x, st_3) {
          p_ILTypeRef(x, st_3);
        })(tupledArg_1[1], st_5);

        (function (ty_2, st_4) {
          p_ILType(ty_2, st_4);
        })(tupledArg_1[2], st_5);
      })([ty.data[0], ty.data[1], ty.data[2]], st);

      break;

    default:
      p_byte(0, st);
  }
}
export function p_ILTypes(tys) {
  var f;
  return CurriedLambda((f = function (ty, st) {
    p_ILType(ty, st);
  }, function (st_1) {
    p_list(f, tys, st_1);
  }));
}
export function p_ILBasicCallConv(x, st) {
  p_byte((() => {
    switch (x.tag) {
      case 1:
        return 1;

      case 2:
        return 2;

      case 3:
        return 3;

      case 4:
        return 4;

      case 5:
        return 5;

      default:
        return 0;
    }
  })(), st);
}
export function p_ILCallConv(_arg1, st) {
  (function (tupledArg, st_3) {
    (function (x, st_1) {
      p_ILHasThis(x, st_1);
    })(tupledArg[0], st_3);

    (function (x_1, st_2) {
      p_ILBasicCallConv(x_1, st_2);
    })(tupledArg[1], st_3);
  })([_arg1.data[0], _arg1.data[1]], st);
}
export function p_ILCallSig(x, st) {
  (function (tupledArg, st_3) {
    (function (arg00_, st_1) {
      p_ILCallConv(arg00_, st_1);
    })(tupledArg[0], st_3);

    CurriedLambda(function (tys) {
      return p_ILTypes(tys);
    })(tupledArg[1], st_3);

    (function (ty, st_2) {
      p_ILType(ty, st_2);
    })(tupledArg[2], st_3);
  })([x.CallingConv, x.ArgTypes, x.ReturnType], st);
}
export function p_ILTypeRef(x, st) {
  (function (tupledArg, st_2) {
    (function (x_1, st_1) {
      p_ILScopeRef(x_1, st_1);
    })(tupledArg[0], st_2);

    p_strings(tupledArg[1], st_2);

    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg[2], st_2);
  })([x.Scope, x.Enclosing, x.Name], st);
}
export function p_ILTypeSpec(a, st) {
  (function (tupledArg, st_2) {
    (function (x, st_1) {
      p_ILTypeRef(x, st_1);
    })(tupledArg[0], st_2);

    CurriedLambda(function (tys) {
      return p_ILTypes(tys);
    })(tupledArg[1], st_2);
  })([a.TypeRef, a.GenericArgs], st);
}
export function u_ILBasicCallConv(st) {
  const matchValue = u_byte(st) | 0;

  switch (matchValue) {
    case 0:
      return new ILArgConvention(0);

    case 1:
      return new ILArgConvention(1);

    case 2:
      return new ILArgConvention(2);

    case 3:
      return new ILArgConvention(3);

    case 4:
      return new ILArgConvention(4);

    case 5:
      return new ILArgConvention(5);

    default:
      return ufailwith(st, "u_ILBasicCallConv");
  }
}
export function u_ILHasThis(st) {
  const matchValue = u_byte(st) | 0;

  if (matchValue === 0) {
    return new ILThisConvention(0);
  } else if (matchValue === 1) {
    return new ILThisConvention(1);
  } else if (matchValue === 2) {
    return new ILThisConvention(2);
  } else {
    return ufailwith(st, "u_ILHasThis");
  }
}
export function u_ILCallConv(st) {
  const patternInput = function (st_3) {
    const a = function (st_1) {
      return u_ILHasThis(st_1);
    }(st_3);

    const b = function (st_2) {
      return u_ILBasicCallConv(st_2);
    }(st_3);

    return [a, b];
  }(st);

  return new ILCallingConv(0, [patternInput[0], patternInput[1]]);
}
export function u_ILTypeRef(st) {
  const patternInput = function (st_2) {
    const a = function (st_1) {
      return u_ILScopeRef(st_1);
    }(st_2);

    const b = u_strings(st_2);

    const c = function (arg00_) {
      return u_string(arg00_);
    }(st_2);

    return [a, b, c];
  }(st);

  return ILTypeRef.Create(patternInput[0], patternInput[1], patternInput[2]);
}
export const u_ILArrayShape = (() => {
  const f = function (x) {
    return new ILArrayShape(0, x);
  };

  let u;

  const f_1 = function (st_4) {
    const a = function (st) {
      return u_option(function (st_1) {
        return u_int32(st_1);
      }, st);
    }(st_4);

    const b = function (st_2) {
      return u_option(function (st_3) {
        return u_int32(st_3);
      }, st_2);
    }(st_4);

    return [a, b];
  };

  u = function (st_5) {
    return u_list(f_1, st_5);
  };

  return function (st_6) {
    return u_wrap(f, u, st_6);
  };
})();
export function u_ILType(st) {
  const tag = u_byte(st) | 0;

  switch (tag) {
    case 0:
      return new ILType(0);

    case 1:
      return function (tupledArg) {
        return new ILType(1, [tupledArg[0], tupledArg[1]]);
      }(function (st_2) {
        const a = u_ILArrayShape(st_2);

        const b = function (st_1) {
          return u_ILType(st_1);
        }(st_2);

        return [a, b];
      }(st));

    case 2:
      return new ILType(2, u_ILTypeSpec(st));

    case 3:
      return mkILBoxedType(u_ILTypeSpec(st));

    case 4:
      return new ILType(4, u_ILType(st));

    case 5:
      return new ILType(5, u_ILType(st));

    case 6:
      return new ILType(6, u_ILCallSig(st));

    case 7:
      return mkILTyvarTy(u_uint16(st));

    case 8:
      return function (tupledArg_1) {
        return new ILType(8, [tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]]);
      }(function (st_5) {
        const a_1 = function (arg00_) {
          return u_bool(arg00_);
        }(st_5);

        const b_1 = function (st_3) {
          return u_ILTypeRef(st_3);
        }(st_5);

        const c = function (st_4) {
          return u_ILType(st_4);
        }(st_5);

        return [a_1, b_1, c];
      }(st));

    default:
      return ufailwith(st, "u_ILType");
  }
}
export function u_ILTypes(st) {
  return u_list(function (st_1) {
    return u_ILType(st_1);
  }, st);
}
export const u_ILCallSig = (() => {
  const f = function (tupledArg) {
    return new ILCallingSignature(tupledArg[0], tupledArg[1], tupledArg[2]);
  };

  const u = function (st_3) {
    const a = function (st) {
      return u_ILCallConv(st);
    }(st_3);

    const b = function (st_1) {
      return u_ILTypes(st_1);
    }(st_3);

    const c = function (st_2) {
      return u_ILType(st_2);
    }(st_3);

    return [a, b, c];
  };

  return function (st_4) {
    return u_wrap(f, u, st_4);
  };
})();
export function u_ILTypeSpec(st) {
  const patternInput = function (st_3) {
    const a = function (st_1) {
      return u_ILTypeRef(st_1);
    }(st_3);

    const b = function (st_2) {
      return u_ILTypes(st_2);
    }(st_3);

    return [a, b];
  }(st);

  return ILTypeSpec.Create(patternInput[0], patternInput[1]);
}
export function p_ILMethodRef(x, st) {
  (function (x_1, st_1) {
    p_ILTypeRef(x_1, st_1);
  })(x.DeclaringTypeRef, st);

  (function (arg00_, st_2) {
    p_ILCallConv(arg00_, st_2);
  })(x.CallingConv, st);

  (function (arg00__1, arg10_) {
    p_int(arg00__1, arg10_);
  })(x.GenericArity, st);

  (function (arg00__2, arg10__1) {
    p_string(arg00__2, arg10__1);
  })(x.Name, st);

  CurriedLambda(function (tys) {
    return p_ILTypes(tys);
  })(x.ArgTypes, st);

  (function (ty, st_3) {
    p_ILType(ty, st_3);
  })(x.ReturnType, st);
}
export function p_ILFieldRef(x, st) {
  (function (tupledArg, st_3) {
    (function (x_1, st_1) {
      p_ILTypeRef(x_1, st_1);
    })(tupledArg[0], st_3);

    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg[1], st_3);

    (function (ty, st_2) {
      p_ILType(ty, st_2);
    })(tupledArg[2], st_3);
  })([x.DeclaringTypeRef, x.Name, x.Type], st);
}
export function p_ILMethodSpec(x, st) {
  (function (tupledArg, st_3) {
    (function (x_1, st_1) {
      p_ILMethodRef(x_1, st_1);
    })(tupledArg[0], st_3);

    (function (ty, st_2) {
      p_ILType(ty, st_2);
    })(tupledArg[1], st_3);

    CurriedLambda(function (tys) {
      return p_ILTypes(tys);
    })(tupledArg[2], st_3);
  })([x.MethodRef, x.DeclaringType, x.GenericArgs], st);
}
export function p_ILFieldSpec(x, st) {
  (function (tupledArg, st_3) {
    (function (x_1, st_1) {
      p_ILFieldRef(x_1, st_1);
    })(tupledArg[0], st_3);

    (function (ty, st_2) {
      p_ILType(ty, st_2);
    })(tupledArg[1], st_3);
  })([x.FieldRef, x.DeclaringType], st);
}
export function p_ILBasicType(x, st) {
  p_int((() => {
    switch (x.tag) {
      case 1:
        return 1;

      case 2:
        return 2;

      case 3:
        return 3;

      case 4:
        return 4;

      case 5:
        return 5;

      case 6:
        return 6;

      case 7:
        return 7;

      case 8:
        return 8;

      case 9:
        return 9;

      case 10:
        return 10;

      case 11:
        return 11;

      case 12:
        return 12;

      case 13:
        return 13;

      default:
        return 0;
    }
  })(), st);
}
export function p_ILVolatility(x, st) {
  p_int(x.tag === 1 ? 1 : 0, st);
}
export function p_ILReadonly(x, st) {
  p_int(x.tag === 1 ? 1 : 0, st);
}
export function u_ILMethodRef(st) {
  let patternInput;

  const a = function (st_1) {
    return u_ILTypeRef(st_1);
  }(st);

  const b = function (st_2) {
    return u_ILCallConv(st_2);
  }(st);

  const c = function (arg00_) {
    return u_int(arg00_);
  }(st) | 0;

  const d = function (arg00__1) {
    return u_string(arg00__1);
  }(st);

  const e = function (st_3) {
    return u_ILTypes(st_3);
  }(st);

  const f = function (st_4) {
    return u_ILType(st_4);
  }(st);

  patternInput = [a, b, c, d, e, f];
  return ILMethodRef.Create(patternInput[0], patternInput[1], patternInput[3], patternInput[2], patternInput[4], patternInput[5]);
}
export function u_ILFieldRef(st) {
  const patternInput = function (st_3) {
    const a = function (st_1) {
      return u_ILTypeRef(st_1);
    }(st_3);

    const b = function (arg00_) {
      return u_string(arg00_);
    }(st_3);

    const c = function (st_2) {
      return u_ILType(st_2);
    }(st_3);

    return [a, b, c];
  }(st);

  return new ILFieldRef(patternInput[0], patternInput[1], patternInput[2]);
}
export function u_ILMethodSpec(st) {
  const patternInput = function (st_4) {
    const a = function (st_1) {
      return u_ILMethodRef(st_1);
    }(st_4);

    const b = function (st_2) {
      return u_ILType(st_2);
    }(st_4);

    const c = function (st_3) {
      return u_ILTypes(st_3);
    }(st_4);

    return [a, b, c];
  }(st);

  return ILMethodSpec.Create(patternInput[1], patternInput[0], patternInput[2]);
}
export function u_ILFieldSpec(st) {
  const patternInput = function (st_3) {
    const a = function (st_1) {
      return u_ILFieldRef(st_1);
    }(st_3);

    const b = function (st_2) {
      return u_ILType(st_2);
    }(st_3);

    return [a, b];
  }(st);

  return new ILFieldSpec(patternInput[0], patternInput[1]);
}
export function u_ILBasicType(st) {
  const matchValue = u_int(st) | 0;

  switch (matchValue) {
    case 0:
      return new ILBasicType(0);

    case 1:
      return new ILBasicType(1);

    case 2:
      return new ILBasicType(2);

    case 3:
      return new ILBasicType(3);

    case 4:
      return new ILBasicType(4);

    case 5:
      return new ILBasicType(5);

    case 6:
      return new ILBasicType(6);

    case 7:
      return new ILBasicType(7);

    case 8:
      return new ILBasicType(8);

    case 9:
      return new ILBasicType(9);

    case 10:
      return new ILBasicType(10);

    case 11:
      return new ILBasicType(11);

    case 12:
      return new ILBasicType(12);

    case 13:
      return new ILBasicType(13);

    default:
      return ufailwith(st, "u_ILBasicType");
  }
}
export function u_ILVolatility(st) {
  const matchValue = u_int(st) | 0;

  if (matchValue === 0) {
    return new ILVolatility(0);
  } else if (matchValue === 1) {
    return new ILVolatility(1);
  } else {
    return ufailwith(st, "u_ILVolatility");
  }
}
export function u_ILReadonly(st) {
  const matchValue = u_int(st) | 0;

  if (matchValue === 0) {
    return new ILReadonly(0);
  } else if (matchValue === 1) {
    return new ILReadonly(1);
  } else {
    return ufailwith(st, "u_ILReadonly");
  }
}
export const simple_instrs = ofArray([[5, new ILInstr(0)], [44, new ILInstr(1)], [45, new ILInstr(2)], [12, new ILInstr(3)], [8, new ILInstr(4)], [9, new ILInstr(5)], [50, new ILInstr(6)], [51, new ILInstr(7)], [52, new ILInstr(8)], [53, new ILInstr(9)], [54, new ILInstr(10)], [7, new ILInstr(14)], [46, new ILInstr(15)], [47, new ILInstr(16)], [10, new ILInstr(17)], [11, new ILInstr(18)], [15, new ILInstr(19)], [16, new ILInstr(20)], [17, new ILInstr(21)], [6, new ILInstr(22)], [48, new ILInstr(23)], [49, new ILInstr(24)], [14, new ILInstr(25)], [13, new ILInstr(26)], [18, new ILInstr(27)], [19, new ILInstr(28)], [2, new ILInstr(29)], [42, new ILInstr(32)], [0, new ILInstr(33)], [56, new ILInstr(91)], [30, new ILInstr(54)], [40, new ILInstr(84)], [57, new ILInstr(58)], [57, new ILInstr(58)], [64, new ILInstr(93, [new ILAlignment(0), new ILVolatility(1)])], [66, new ILInstr(92, [new ILAlignment(0), new ILVolatility(1)])]]);
export const encode_table = create(null, fromEqualityComparer({
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
iterate(function (tupledArg) {
  encode_table.set(tupledArg[1], tupledArg[0]);
}, simple_instrs);
export function encode_instr(si) {
  return encode_table.get(si) | 0;
}
export function isNoArgInstr(s) {
  return encode_table.has(s);
}
export const decoders = ofArray([[1, $var1 => mkLdarg(u_uint16($var1))], [4, $var2 => function (a) {
  return new ILInstr(48, [new ILTailcall(1), a, null]);
}(function (st) {
  return u_ILMethodSpec(st);
}($var2))], [24, $var3 => function (a_1) {
  return new ILInstr(49, [new ILTailcall(1), a_1, null]);
}(function (st_1) {
  return u_ILMethodSpec(st_1);
}($var3))], [55, $var4 => new ILInstr(69, u_ILMethodSpec($var4))], [20, $var5 => new ILInstr(11, u_ILBasicType($var5))], [22, $var6 => new ILInstr(12, u_ILBasicType($var6))], [23, $var7 => new ILInstr(13, u_ILBasicType($var7))], [31, $var8 => function (tupledArg_1) {
  return new ILInstr(60, [new ILAlignment(0), tupledArg_1[0], tupledArg_1[1]]);
}(function (st_4) {
  const a_2 = function (st_2) {
    return u_ILVolatility(st_2);
  }(st_4);

  const b = function (st_3) {
    return u_ILFieldSpec(st_3);
  }(st_4);

  return [a_2, b];
}($var8))], [32, $var9 => new ILInstr(62, u_ILFieldSpec($var9))], [34, $var10 => function (tupledArg_2) {
  return new ILInstr(59, [tupledArg_2[0], tupledArg_2[1]]);
}(function (st_7) {
  const a_3 = function (st_5) {
    return u_ILVolatility(st_5);
  }(st_7);

  const b_1 = function (st_6) {
    return u_ILFieldSpec(st_6);
  }(st_7);

  return [a_3, b_1];
}($var10))], [35, $var11 => new ILInstr(61, u_ILFieldSpec($var11))], [33, $var12 => function (tupledArg_3) {
  return new ILInstr(64, [new ILAlignment(0), tupledArg_3[0], tupledArg_3[1]]);
}(function (st_10) {
  const a_4 = function (st_8) {
    return u_ILVolatility(st_8);
  }(st_10);

  const b_2 = function (st_9) {
    return u_ILFieldSpec(st_9);
  }(st_10);

  return [a_4, b_2];
}($var12))], [36, $var13 => function (tupledArg_4) {
  return new ILInstr(63, [tupledArg_4[0], tupledArg_4[1]]);
}(function (st_13) {
  const a_5 = function (st_11) {
    return u_ILVolatility(st_11);
  }(st_13);

  const b_3 = function (st_12) {
    return u_ILFieldSpec(st_12);
  }(st_13);

  return [a_5, b_3];
}($var13))], [43, $var14 => function (a_6) {
  return new ILInstr(68, new ILToken(0, a_6));
}(function (st_14) {
  return u_ILType(st_14);
}($var14))], [26, $var15 => new ILInstr(65, u_string($var15))], [38, $var16 => new ILInstr(74, u_ILType($var16))], [29, $var17 => new ILInstr(75, u_ILType($var17))], [61, $var18 => new ILInstr(76, u_ILType($var18))], [39, $var19 => function (tupledArg_5) {
  return new ILInstr(83, [tupledArg_5[0], tupledArg_5[1]]);
}(function (st_16) {
  const a_7 = u_ILArrayShape(st_16);

  const b_4 = function (st_15) {
    return u_ILType(st_15);
  }(st_16);

  return [a_7, b_4];
}($var19))], [60, $var20 => function (tupledArg_6) {
  return new ILInstr(82, [tupledArg_6[0], tupledArg_6[1]]);
}(function (st_18) {
  const a_8 = u_ILArrayShape(st_18);

  const b_5 = function (st_17) {
    return u_ILType(st_17);
  }(st_18);

  return [a_8, b_5];
}($var20))], [59, $var21 => function (tupledArg_7) {
  return new ILInstr(81, [tupledArg_7[0], tupledArg_7[1]]);
}(function (st_20) {
  const a_9 = u_ILArrayShape(st_20);

  const b_6 = function (st_19) {
    return u_ILType(st_19);
  }(st_20);

  return [a_9, b_6];
}($var21))], [41, $var22 => function (tupledArg_8) {
  return new ILInstr(80, [tupledArg_8[0], false, tupledArg_8[1], tupledArg_8[2]]);
}(function (st_23) {
  const a_10 = function (st_21) {
    return u_ILReadonly(st_21);
  }(st_23);

  const b_7 = u_ILArrayShape(st_23);

  const c = function (st_22) {
    return u_ILType(st_22);
  }(st_23);

  return [a_10, b_7, c];
}($var22))], [27, $var23 => new ILInstr(67, u_ILType($var23))], [28, $var24 => new ILInstr(66, u_ILType($var24))], [25, $var25 => function (c_1) {
  return new ILInstr(72, [new ILAlignment(0), new ILVolatility(1), c_1]);
}(function (st_24) {
  return u_ILType(st_24);
}($var25))], [37, $var26 => function (c_2) {
  return new ILInstr(73, [new ILAlignment(0), new ILVolatility(1), c_2]);
}(function (st_25) {
  return u_ILType(st_25);
}($var26))], [58, $var27 => new ILInstr(77, u_ILType($var27))], [62, $var28 => function (tupledArg_9) {
  return new ILInstr(95, [tupledArg_9[0], tupledArg_9[1]]);
}(function (st_28) {
  const a_11 = function (st_26) {
    return u_int32(st_26);
  }(st_28) | 0;

  const b_8 = function (st_27) {
    return u_int32(st_27);
  }(st_28) | 0;

  return [a_11, b_8];
}($var28))], [3, $var29 => new ILInstr(94, u_ILType($var29))], [3, $var30 => new ILInstr(94, u_ILType($var30))], [63, $var31 => new ILInstr(71, u_ILType($var31))], [65, $var32 => new ILInstr(70, u_ILType($var32))]]);
export const decode_tab = (() => {
  const tab = Array.from(initialize(256, $var33 => $var34 => function (n, st) {
    return ufailwith(st, "no decoder for instruction " + n.toString());
  }($var33, $var34)));

  const add_instr = function (tupledArg_1) {
    tab[tupledArg_1[0]] = tupledArg_1[1];
  };

  iterate(add_instr, decoders);
  iterate(function (tupledArg_2) {
    add_instr([tupledArg_2[0], function (_arg1) {
      return tupledArg_2[1];
    }]);
  }, simple_instrs);
  return tab;
})();
export function p_ILInstr(x, st) {
  if (isNoArgInstr(x)) {
    p_byte(encode_instr(x), st);
  } else {
    const $var35 = x.tag === 48 ? x.data[0].tag === 1 ? x.data[2] == null ? [0, x.data[1]] : [31, x] : [31, x] : x.tag === 49 ? x.data[0].tag === 1 ? x.data[2] == null ? [1, x.data[1]] : [31, x] : [31, x] : x.tag === 69 ? [2, x.data] : x.tag === 35 ? [3, x.data] : x.tag === 11 ? [4, x.data] : x.tag === 12 ? [5, x.data] : x.tag === 13 ? [6, x.data] : x.tag === 60 ? x.data[0].tag === 0 ? [7, x.data[1], x.data[2]] : [31, x] : x.tag === 59 ? [8, x.data[0], x.data[1]] : x.tag === 64 ? x.data[0].tag === 0 ? [9, x.data[1], x.data[2]] : [31, x] : x.tag === 63 ? [10, x.data[0], x.data[1]] : x.tag === 62 ? [11, x.data] : x.tag === 61 ? [12, x.data] : x.tag === 68 ? x.data.tag === 0 ? [13, x.data.data] : [31, x] : x.tag === 65 ? [14, x.data] : x.tag === 74 ? [15, x.data] : x.tag === 75 ? [16, x.data] : x.tag === 76 ? [17, x.data] : x.tag === 83 ? [18, x.data[0], x.data[1]] : x.tag === 82 ? [19, x.data[0], x.data[1]] : x.tag === 81 ? [20, x.data[0], x.data[1]] : x.tag === 80 ? [21, x.data[0], x.data[2], x.data[3]] : x.tag === 67 ? [22, x.data] : x.tag === 66 ? [23, x.data] : x.tag === 72 ? x.data[0].tag === 0 ? x.data[1].tag === 1 ? [24, x.data[2]] : [31, x] : [31, x] : x.tag === 73 ? x.data[0].tag === 0 ? x.data[1].tag === 1 ? [25, x.data[2]] : [31, x] : [31, x] : x.tag === 77 ? [26, x.data] : x.tag === 95 ? [27, x.data[1], x.data[0]] : x.tag === 94 ? [28, x.data] : x.tag === 71 ? [29, x.data] : x.tag === 70 ? [30, x.data] : [31, x];

    switch ($var35[0]) {
      case 0:
        p_byte(4, st);
        p_ILMethodSpec($var35[1], st);
        break;

      case 1:
        p_byte(24, st);
        p_ILMethodSpec($var35[1], st);
        break;

      case 2:
        p_byte(55, st);
        p_ILMethodSpec($var35[1], st);
        break;

      case 3:
        p_byte(1, st);
        p_uint16($var35[1], st);
        break;

      case 4:
        p_byte(20, st);
        p_ILBasicType($var35[1], st);
        break;

      case 5:
        p_byte(22, st);
        p_ILBasicType($var35[1], st);
        break;

      case 6:
        p_byte(23, st);
        p_ILBasicType($var35[1], st);
        break;

      case 7:
        p_byte(31, st);

        (function (tupledArg_1, st_3) {
          (function (x_1, st_1) {
            p_ILVolatility(x_1, st_1);
          })(tupledArg_1[0], st_3);

          (function (x_2, st_2) {
            p_ILFieldSpec(x_2, st_2);
          })(tupledArg_1[1], st_3);
        })([$var35[1], $var35[2]], st);

        break;

      case 8:
        p_byte(34, st);

        (function (tupledArg_2, st_6) {
          (function (x_3, st_4) {
            p_ILVolatility(x_3, st_4);
          })(tupledArg_2[0], st_6);

          (function (x_4, st_5) {
            p_ILFieldSpec(x_4, st_5);
          })(tupledArg_2[1], st_6);
        })([$var35[1], $var35[2]], st);

        break;

      case 9:
        p_byte(33, st);

        (function (tupledArg_3, st_9) {
          (function (x_5, st_7) {
            p_ILVolatility(x_5, st_7);
          })(tupledArg_3[0], st_9);

          (function (x_6, st_8) {
            p_ILFieldSpec(x_6, st_8);
          })(tupledArg_3[1], st_9);
        })([$var35[1], $var35[2]], st);

        break;

      case 10:
        p_byte(36, st);

        (function (tupledArg_4, st_12) {
          (function (x_7, st_10) {
            p_ILVolatility(x_7, st_10);
          })(tupledArg_4[0], st_12);

          (function (x_8, st_11) {
            p_ILFieldSpec(x_8, st_11);
          })(tupledArg_4[1], st_12);
        })([$var35[1], $var35[2]], st);

        break;

      case 11:
        p_byte(32, st);
        p_ILFieldSpec($var35[1], st);
        break;

      case 12:
        p_byte(35, st);
        p_ILFieldSpec($var35[1], st);
        break;

      case 13:
        p_byte(43, st);
        p_ILType($var35[1], st);
        break;

      case 14:
        p_byte(26, st);
        p_string($var35[1], st);
        break;

      case 15:
        p_byte(38, st);
        p_ILType($var35[1], st);
        break;

      case 16:
        p_byte(29, st);
        p_ILType($var35[1], st);
        break;

      case 17:
        p_byte(61, st);
        p_ILType($var35[1], st);
        break;

      case 18:
        p_byte(39, st);

        (function (tupledArg_5, st_14) {
          p_ILArrayShape(tupledArg_5[0], st_14);

          (function (ty, st_13) {
            p_ILType(ty, st_13);
          })(tupledArg_5[1], st_14);
        })([$var35[1], $var35[2]], st);

        break;

      case 19:
        p_byte(60, st);

        (function (tupledArg_6, st_16) {
          p_ILArrayShape(tupledArg_6[0], st_16);

          (function (ty_1, st_15) {
            p_ILType(ty_1, st_15);
          })(tupledArg_6[1], st_16);
        })([$var35[1], $var35[2]], st);

        break;

      case 20:
        p_byte(59, st);

        (function (tupledArg_7, st_18) {
          p_ILArrayShape(tupledArg_7[0], st_18);

          (function (ty_2, st_17) {
            p_ILType(ty_2, st_17);
          })(tupledArg_7[1], st_18);
        })([$var35[1], $var35[2]], st);

        break;

      case 21:
        p_byte(41, st);

        (function (tupledArg_8, st_21) {
          (function (x_9, st_19) {
            p_ILReadonly(x_9, st_19);
          })(tupledArg_8[0], st_21);

          p_ILArrayShape(tupledArg_8[1], st_21);

          (function (ty_3, st_20) {
            p_ILType(ty_3, st_20);
          })(tupledArg_8[2], st_21);
        })([$var35[1], $var35[2], $var35[3]], st);

        break;

      case 22:
        p_byte(27, st);
        p_ILType($var35[1], st);
        break;

      case 23:
        p_byte(28, st);
        p_ILType($var35[1], st);
        break;

      case 24:
        p_byte(25, st);
        p_ILType($var35[1], st);
        break;

      case 25:
        p_byte(37, st);
        p_ILType($var35[1], st);
        break;

      case 26:
        p_byte(58, st);
        p_ILType($var35[1], st);
        break;

      case 27:
        p_byte(62, st);

        (function (tupledArg_9, st_24) {
          (function (n, st_22) {
            p_int32(n, st_22);
          })(tupledArg_9[0], st_24);

          (function (n_1, st_23) {
            p_int32(n_1, st_23);
          })(tupledArg_9[1], st_24);
        })([$var35[2], $var35[1]], st);

        break;

      case 28:
        p_byte(3, st);
        p_ILType($var35[1], st);
        break;

      case 29:
        p_byte(63, st);
        p_ILType($var35[1], st);
        break;

      case 30:
        p_byte(65, st);
        p_ILType($var35[1], st);
        break;

      case 31:
        pfailwith(st, toText(printf("the IL instruction '%+A' cannot be emitted"))($var35[1]));
        break;
    }
  }
}
export function u_ILInstr(st) {
  const n = u_byte(st) | 0;
  return decode_tab[n](st);
}
export function p_Map(pk, pv) {
  const f = function (table) {
    return toList(table);
  };

  let p;

  const f_1 = function (tupledArg_1, st) {
    pk(tupledArg_1[0], st);
    pv(tupledArg_1[1], st);
  };

  p = function (x, st_1) {
    p_list(f_1, x, st_1);
  };

  return function (x_1, st_2) {
    p_wrap(f, p, x_1, st_2);
  };
}
export function p_qlist(pv) {
  const f = function (x) {
    return QueueListModule.toList(x);
  };

  const p = function (x_1, st) {
    p_list(pv, x_1, st);
  };

  return function (x_2, st_1) {
    p_wrap(f, p, x_2, st_1);
  };
}
export function p_namemap(p) {
  return p_Map(function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  }, p);
}
export function u_Map(uk, uv) {
  const f = function (elements) {
    return create(elements, new Comparer(compare));
  };

  let u;

  const f_1 = function (st) {
    const a = uk(st);
    const b = uv(st);
    return [a, b];
  };

  u = function (st_1) {
    return u_list(f_1, st_1);
  };

  return function (st_2) {
    return u_wrap(f, u, st_2);
  };
}
export function u_qlist(uv) {
  const f = function (x) {
    return QueueListModule.ofList(x);
  };

  const u = function (st) {
    return u_list(uv, st);
  };

  return function (st_1) {
    return u_wrap(f, u, st_1);
  };
}
export function u_namemap(u) {
  return u_Map(function (arg00_) {
    return u_string(arg00_);
  }, u);
}
export function p_pos(x, st) {
  (function (tupledArg_1, st_1) {
    (function (arg00_, arg10_) {
      p_int(arg00_, arg10_);
    })(tupledArg_1[0], st_1);

    (function (arg00__1, arg10__1) {
      p_int(arg00__1, arg10__1);
    })(tupledArg_1[1], st_1);
  })([x.Line, x.Column], st);
}
export function p_range(x, st) {
  (function (tupledArg_1, st_3) {
    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg_1[0], st_3);

    (function (x_1, st_1) {
      p_pos(x_1, st_1);
    })(tupledArg_1[1], st_3);

    (function (x_2, st_2) {
      p_pos(x_2, st_2);
    })(tupledArg_1[2], st_3);
  })([x.FileName, x.Start, x.End], st);
}
export function p_dummy_range(_x, _st) {}
export function p_ident(x, st) {
  (function (tupledArg_1, st_2) {
    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg_1[0], st_2);

    (function (x_1, st_1) {
      p_range(x_1, st_1);
    })(tupledArg_1[1], st_2);
  })([x.idText, x.idRange], st);
}
export function p_xmldoc(_arg1, st) {
  p_array(function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  })(_arg1.data, st);
}
export function u_pos(st) {
  const a = u_int(st) | 0;
  const b = u_int(st) | 0;
  return mkPos(a, b);
}
export function u_range(st) {
  const a = u_string(st);
  const b = u_pos(st);
  const c = u_pos(st);
  return mkRange(a, b, c);
}
export function u_dummy_range(_st) {
  return range0;
}
export function u_ident(st) {
  const a = u_string(st);
  const b = u_range(st);
  return ident(a, b);
}
export function u_xmldoc(st) {
  return new XmlDoc_1(0, u_array(function (arg00_) {
    return u_string(arg00_);
  })(st));
}
export function p_local_item_ref(ctxt, tab, st) {
  return CurriedLambda(function (st_1) {
    p_osgn_ref(ctxt, tab, st, st_1);
  });
}
export function p_tcref(ctxt) {
  return CurriedLambda(function (x, st) {
    const activePatternResult30741 = _ERefLocal_ERefNonLocal_(x);

    if (activePatternResult30741.tag === 1) {
      p_byte(1, st);
      p_nleref(activePatternResult30741.data, st);
    } else {
      p_byte(0, st);
      p_local_item_ref(ctxt, st.otycons, activePatternResult30741.data)(st);
    }
  });
}
export const p_ucref = CurriedLambda(function (_arg1, st) {
  (function (tupledArg_1, st_1) {
    p_tcref("ucref")(tupledArg_1[0], st_1);

    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg_1[1], st_1);
  })([_arg1.data[0], _arg1.data[1]], st);
});
export function p_rfref(_arg1, st) {
  (function (tupledArg_1, st_1) {
    p_tcref("rfref")(tupledArg_1[0], st_1);

    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg_1[1], st_1);
  })([_arg1.data[0], _arg1.data[1]], st);
}
export function p_tpref(x, st) {
  p_local_item_ref("typar", st.otypars, x)(st);
}
export function u_local_item_ref(tab, st) {
  return u_osgn_ref(tab, st);
}
export const u_tcref = CurriedLambda(function (st) {
  const tag = u_byte(st) | 0;

  if (tag === 0) {
    return ERefLocal(u_local_item_ref(st.itycons, st));
  } else if (tag === 1) {
    return ERefNonLocal(u_nleref(st));
  } else {
    return ufailwith(st, "u_item_ref");
  }
});
export const u_ucref = CurriedLambda(function (st) {
  const patternInput = function (st_1) {
    const a = u_tcref(st_1);

    const b = function (arg00_) {
      return u_string(arg00_);
    }(st_1);

    return [a, b];
  }(st);

  return new UnionCaseRef(0, [patternInput[0], patternInput[1]]);
});
export function u_rfref(st) {
  const patternInput = function (st_1) {
    const a = u_tcref(st_1);

    const b = function (arg00_) {
      return u_string(arg00_);
    }(st_1);

    return [a, b];
  }(st);

  return new RecdFieldRef(0, [patternInput[0], patternInput[1]]);
}
export function u_tpref(st) {
  return u_local_item_ref(st.itypars, st);
}
const patternInput_1274 = p_hole();
export const p_typ = CurriedLambda(patternInput_1274[1]);
export const fill_p_typ = CurriedLambda(patternInput_1274[0]);
export const p_typs = CurriedLambda(function (x, st) {
  p_list(p_typ, x, st);
});
const patternInput_1277_1 = p_hole();
export const p_attribs = CurriedLambda(patternInput_1277_1[1]);
export const fill_p_attribs = CurriedLambda(patternInput_1277_1[0]);
export function p_nonlocal_val_ref(nlv, st) {
  const pkey = nlv.ItemKey.PartialKey;
  p_tcref("nlvref")(nlv.EnclosingEntity, st);
  p_option(function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  }, pkey.MemberParentMangledName, st);
  p_bool(pkey.MemberIsOverride, st);
  p_string(pkey.LogicalName, st);
  p_int(pkey.TotalArgCount, st);
  p_option(p_typ, nlv.ItemKey.TypeForLinkage, st);
}
export function p_vref(ctxt) {
  return CurriedLambda(function (x, st) {
    const activePatternResult30760 = _VRefLocal_VRefNonLocal_(x);

    if (activePatternResult30760.tag === 1) {
      p_byte(1, st);
      p_nonlocal_val_ref(activePatternResult30760.data, st);
    } else {
      p_byte(0, st);
      p_local_item_ref(ctxt, st.ovals, activePatternResult30760.data)(st);
    }
  });
}
export function p_vrefs(ctxt) {
  var f;
  return CurriedLambda((f = p_vref(ctxt), function (x, st) {
    p_list(f, x, st);
  }));
}
const patternInput_1297_2 = u_hole();
export const u_typ = CurriedLambda(patternInput_1297_2[1]);
export const fill_u_typ = CurriedLambda(patternInput_1297_2[0]);
export const u_typs = CurriedLambda(function (st) {
  return u_list(u_typ, st);
});
const patternInput_1299_3 = u_hole();
export const u_attribs = CurriedLambda(patternInput_1299_3[1]);
export const fill_u_attribs = CurriedLambda(patternInput_1299_3[0]);
export function u_nonlocal_val_ref(st) {
  const a = u_tcref(st);
  const b1 = u_option(function (arg00_) {
    return u_string(arg00_);
  }, st);
  const b2 = u_bool(st);
  const b3 = u_string(st);
  const c = u_int(st) | 0;
  const d = u_option(u_typ, st);
  return new NonLocalValOrMemberRef(a, new ValLinkageFullKey(new ValLinkagePartialKey(b1, b2, b3, c), d));
}
export const u_vref = CurriedLambda(function (st) {
  const tag = u_byte(st) | 0;

  if (tag === 0) {
    return VRefLocal(u_local_item_ref(st.ivals, st));
  } else if (tag === 1) {
    return VRefNonLocal(u_nonlocal_val_ref(st));
  } else {
    return ufailwith(st, "u_item_ref");
  }
});
export const u_vrefs = CurriedLambda(function (st) {
  return u_list(u_vref, st);
});
export function p_kind(x, st) {
  p_byte(x.tag === 1 ? 1 : 0, st);
}
export function p_member_kind(x, st) {
  p_byte((() => {
    switch (x.tag) {
      case 3:
        return 1;

      case 4:
        return 2;

      case 1:
        return 3;

      case 0:
        return 4;

      case 5:
        return pfailwith(st, "pickling: MemberKind.PropertyGetSet only expected in parse trees") | 0;

      default:
        return 0;
    }
  })(), st);
}
export function u_kind(st) {
  const matchValue = u_byte(st) | 0;

  if (matchValue === 0) {
    return new TyparKind(0);
  } else if (matchValue === 1) {
    return new TyparKind(1);
  } else {
    return ufailwith(st, "u_kind");
  }
}
export function u_member_kind(st) {
  const matchValue = u_byte(st) | 0;

  switch (matchValue) {
    case 0:
      return new MemberKind(2);

    case 1:
      return new MemberKind(3);

    case 2:
      return new MemberKind(4);

    case 3:
      return new MemberKind(1);

    case 4:
      return new MemberKind(0);

    default:
      return ufailwith(st, "u_member_kind");
  }
}
export function p_MemberFlags(x, st) {
  (function (arg00_, arg10_) {
    p_bool(arg00_, arg10_);
  })(x.IsInstance, st);

  (function (arg00__1, arg10__1) {
    p_bool(arg00__1, arg10__1);
  })(false, st);

  (function (arg00__2, arg10__2) {
    p_bool(arg00__2, arg10__2);
  })(x.IsDispatchSlot, st);

  (function (arg00__3, arg10__3) {
    p_bool(arg00__3, arg10__3);
  })(x.IsOverrideOrExplicitImpl, st);

  (function (arg00__4, arg10__4) {
    p_bool(arg00__4, arg10__4);
  })(x.IsFinal, st);

  (function (x_1, st_1) {
    p_member_kind(x_1, st_1);
  })(x.MemberKind, st);
}
export function u_MemberFlags(st) {
  let patternInput;

  const a = function (arg00_) {
    return u_bool(arg00_);
  }(st);

  const b = function (arg00__1) {
    return u_bool(arg00__1);
  }(st);

  const c = function (arg00__2) {
    return u_bool(arg00__2);
  }(st);

  const d = function (arg00__3) {
    return u_bool(arg00__3);
  }(st);

  const e = function (arg00__4) {
    return u_bool(arg00__4);
  }(st);

  const f = function (st_1) {
    return u_member_kind(st_1);
  }(st);

  patternInput = [a, b, c, d, e, f];
  return new MemberFlags(patternInput[0], patternInput[2], patternInput[3], patternInput[4], patternInput[5]);
}
const patternInput_1365_4 = u_hole();
export const u_expr_fwd = CurriedLambda(patternInput_1365_4[1]);
export const fill_u_Expr_hole = CurriedLambda(patternInput_1365_4[0]);
const patternInput_1366_5 = p_hole();
export const p_expr_fwd = CurriedLambda(patternInput_1366_5[1]);
export const fill_p_Expr_hole = CurriedLambda(patternInput_1366_5[0]);
export function p_trait_sln(sln, st) {
  switch (sln.tag) {
    case 0:
      p_byte(1, st);

      (function (tupledArg_1, st_1) {
        p_typ(tupledArg_1[0], st_1);
        p_vref("trait")(tupledArg_1[1], st_1);
        p_typs(tupledArg_1[2], st_1);
      })([sln.data[0], sln.data[1], sln.data[2]], st);

      break;

    case 4:
      p_byte(2, st);
      break;

    case 3:
      p_byte(3, st);
      p_expr_fwd(sln.data, st);
      break;

    case 1:
      p_byte(4, st);

      (function (tupledArg_2, st_3) {
        p_typs(tupledArg_2[0], st_3);

        (function (arg00_, st_2) {
          p_rfref(arg00_, st_2);
        })(tupledArg_2[1], st_3);

        (function (arg00__1, arg10_) {
          p_bool(arg00__1, arg10_);
        })(tupledArg_2[2], st_3);
      })([sln.data[0], sln.data[1], sln.data[2]], st);

      break;

    default:
      p_byte(0, st);

      (function (tupledArg_3, st_7) {
        p_typ(tupledArg_3[0], st_7);

        (function (x, st_4) {
          p_option(function (x_1, st_5) {
            p_ILTypeRef(x_1, st_5);
          }, x, st_4);
        })(tupledArg_3[1], st_7);

        (function (x_2, st_6) {
          p_ILMethodRef(x_2, st_6);
        })(tupledArg_3[2], st_7);

        p_typs(tupledArg_3[3], st_7);
      })([sln.data[0], sln.data[1], sln.data[2], sln.data[3]], st);

  }
}
export function p_trait(_arg1, st) {
  p_typs(_arg1.data[0], st);

  (function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  })(_arg1.data[1], st);

  (function (x, st_1) {
    p_MemberFlags(x, st_1);
  })(_arg1.data[2], st);

  p_typs(_arg1.data[3], st);

  (function (x_1, st_2) {
    p_option(p_typ, x_1, st_2);
  })(_arg1.data[4], st);

  (function (x_2, st_3) {
    p_option(function (sln, st_4) {
      p_trait_sln(sln, st_4);
    }, x_2, st_3);
  })(_arg1.data[5].contents, st);
}
export function u_trait_sln(st) {
  const tag = u_byte(st) | 0;

  switch (tag) {
    case 0:
      const patternInput = function (st_4) {
        const a = u_typ(st_4);

        const b = function (st_1) {
          return u_option(function (st_2) {
            return u_ILTypeRef(st_2);
          }, st_1);
        }(st_4);

        const c = function (st_3) {
          return u_ILMethodRef(st_3);
        }(st_4);

        const d = u_typs(st_4);
        return [a, b, c, d];
      }(st);

      return new TraitConstraintSln(2, [patternInput[0], patternInput[1], patternInput[2], patternInput[3]]);

    case 1:
      const patternInput_1 = function (st_5) {
        const a_1 = u_typ(st_5);
        const b_1 = u_vref(st_5);
        const c_1 = u_typs(st_5);
        return [a_1, b_1, c_1];
      }(st);

      return new TraitConstraintSln(0, [patternInput_1[0], patternInput_1[1], patternInput_1[2]]);

    case 2:
      return new TraitConstraintSln(4);

    case 3:
      return new TraitConstraintSln(3, u_expr_fwd(st));

    case 4:
      const patternInput_2 = function (st_7) {
        const a_2 = u_typs(st_7);

        const b_2 = function (st_6) {
          return u_rfref(st_6);
        }(st_7);

        const c_2 = function (arg00_) {
          return u_bool(arg00_);
        }(st_7);

        return [a_2, b_2, c_2];
      }(st);

      return new TraitConstraintSln(1, [patternInput_2[0], patternInput_2[1], patternInput_2[2]]);

    default:
      return ufailwith(st, "u_trait_sln");
  }
}
export function u_trait(st) {
  let patternInput;
  const a = u_typs(st);

  const b = function (arg00_) {
    return u_string(arg00_);
  }(st);

  const c = function (st_1) {
    return u_MemberFlags(st_1);
  }(st);

  const d = u_typs(st);

  const e = function (st_2) {
    return u_option(u_typ, st_2);
  }(st);

  const f = function (st_3) {
    return u_option(function (st_4) {
      return u_trait_sln(st_4);
    }, st_3);
  }(st);

  patternInput = [a, b, c, d, e, f];
  return new TraitConstraintInfo(0, [patternInput[0], patternInput[1], patternInput[2], patternInput[3], patternInput[4], {
    contents: patternInput[5]
  }]);
}
export function p_rational(q, st) {
  p_int32(GetNumerator(q), st);
  p_int32(GetDenominator(q), st);
}
export function p_measure_con(tcref, st) {
  p_byte(0, st);
  p_tcref("measure")(tcref, st);
}
export function p_measure_var(v, st) {
  p_byte(3, st);
  p_tpref(v, st);
}
export const p_measure_one = CurriedLambda(function (arg10_) {
  p_byte(4, arg10_);
});
export function p_measure_varcon(unt, st) {
  if (unt.tag === 1) {
    p_measure_con(unt.data, st);
  } else if (unt.tag === 0) {
    p_measure_var(unt.data, st);
  } else {
    pfailwith(st, "p_measure_varcon: expected measure variable or constructor");
  }
}
export function p_measure_pospower(unt, n, st) {
  if (n === 1) {
    p_measure_varcon(unt, st);
  } else {
    p_byte(2, st);
    p_measure_varcon(unt, st);
    p_measure_pospower(unt, n - 1, st);
  }
}
export function p_measure_intpower(unt, n, st) {
  if (n < 0) {
    p_byte(1, st);
    p_measure_pospower(unt, -n, st);
  } else {
    p_measure_pospower(unt, n, st);
  }
}
export function p_measure_power(unt, q, st) {
  if (q.Equals(ZeroRational)) {
    p_measure_one(st);
  } else if (GetDenominator(q) === 1) {
    p_measure_intpower(unt, GetNumerator(q), st);
  } else {
    p_byte(5, st);
    p_measure_varcon(unt, st);
    p_rational(q, st);
  }
}
export function p_normalized_measure(unt, st) {
  const unt_1 = stripUnitEqnsAux(false, unt);

  switch (unt_1.tag) {
    case 3:
      p_byte(1, st);
      p_normalized_measure(unt_1.data, st);
      break;

    case 2:
      p_byte(2, st);
      p_normalized_measure(unt_1.data[0], st);
      p_normalized_measure(unt_1.data[1], st);
      break;

    case 0:
      p_measure_var(unt_1.data, st);
      break;

    case 4:
      p_measure_one(st);
      break;

    case 5:
      p_measure_power(unt_1.data[0], unt_1.data[1], st);
      break;

    default:
      p_measure_con(unt_1.data, st);
  }
}
export function p_measure_expr(unt, st) {
  p_normalized_measure(normalizeMeasure(st.oglobals, unt), st);
}
export function u_rational(st) {
  const patternInput = function (st_3) {
    const a = function (st_1) {
      return u_int32(st_1);
    }(st_3) | 0;

    const b = function (st_2) {
      return u_int32(st_2);
    }(st_3) | 0;

    return [a, b];
  }(st);

  return DivRational(intToRational(patternInput[0]), intToRational(patternInput[1]));
}
export function u_measure_expr(st) {
  const tag = u_byte(st) | 0;

  switch (tag) {
    case 0:
      const a = u_tcref(st);
      return new Measure(1, a);

    case 1:
      const a_1 = u_measure_expr(st);
      return new Measure(3, a_1);

    case 2:
      const patternInput = function (st_3) {
        const a_2 = function (st_1) {
          return u_measure_expr(st_1);
        }(st_3);

        const b = function (st_2) {
          return u_measure_expr(st_2);
        }(st_3);

        return [a_2, b];
      }(st);

      return new Measure(2, [patternInput[0], patternInput[1]]);

    case 3:
      const a_3 = u_tpref(st);
      return new Measure(0, a_3);

    case 4:
      return new Measure(4);

    case 5:
      const a_4 = u_measure_expr(st);
      const b_1 = u_rational(st);
      return new Measure(5, [a_4, b_1]);

    default:
      return ufailwith(st, "u_measure_expr");
  }
}
export function p_typar_constraint(x, st) {
  switch (x.tag) {
    case 3:
      p_byte(1, st);
      p_trait(x.data[0], st);
      break;

    case 1:
      p_byte(2, st);
      p_typ(x.data[1], st);
      break;

    case 2:
      p_byte(3, st);
      break;

    case 4:
      p_byte(4, st);
      break;

    case 5:
      p_byte(5, st);
      break;

    case 7:
      p_byte(6, st);
      break;

    case 6:
      p_byte(7, st);
      p_typs(x.data[0], st);
      break;

    case 8:
      p_byte(8, st);
      p_typ(x.data[0], st);
      break;

    case 11:
      p_byte(9, st);
      p_typ(x.data[0], st);
      p_typ(x.data[1], st);
      break;

    case 9:
      p_byte(10, st);
      break;

    case 10:
      p_byte(11, st);
      break;

    case 12:
      p_byte(12, st);
      break;

    default:
      p_byte(0, st);
      p_typ(x.data[0], st);
  }
}
export const p_typar_constraints = CurriedLambda(function (x, st) {
  p_list(function (x_1, st_1) {
    p_typar_constraint(x_1, st_1);
  }, x, st);
});
export function u_typar_constraint(st) {
  return CurriedLambda((() => {
    const tag = u_byte(st) | 0;

    switch (tag) {
      case 0:
        return CurriedLambda(function (a, _arg1) {
          return new TyparConstraint(0, [a, range0]);
        })(u_typ(st));

      case 1:
        return CurriedLambda(function (a_1, _arg2) {
          return new TyparConstraint(3, [a_1, range0]);
        })(u_trait(st));

      case 2:
        return CurriedLambda(function (a_2, ridx) {
          return new TyparConstraint(1, [ridx, a_2, range0]);
        })(u_typ(st));

      case 3:
        return function (_arg3) {
          return new TyparConstraint(2, range0);
        };

      case 4:
        return function (_arg4) {
          return new TyparConstraint(4, range0);
        };

      case 5:
        return function (_arg5) {
          return new TyparConstraint(5, range0);
        };

      case 6:
        return function (_arg6) {
          return new TyparConstraint(7, range0);
        };

      case 7:
        return CurriedLambda(function (a_3, _arg7) {
          return new TyparConstraint(6, [a_3, range0]);
        })(u_typs(st));

      case 8:
        return CurriedLambda(function (a_4, _arg8) {
          return new TyparConstraint(8, [a_4, range0]);
        })(u_typ(st));

      case 9:
        return CurriedLambda(function (tupledArg_1, _arg9) {
          return new TyparConstraint(11, [tupledArg_1[0], tupledArg_1[1], range0]);
        })(function (st_1) {
          const a_5 = u_typ(st_1);
          const b = u_typ(st_1);
          return [a_5, b];
        }(st));

      case 10:
        return function (_arg10) {
          return new TyparConstraint(9, range0);
        };

      case 11:
        return function (_arg11) {
          return new TyparConstraint(10, range0);
        };

      case 12:
        return function (_arg12) {
          return new TyparConstraint(12, range0);
        };

      default:
        return ufailwith(st, "u_typar_constraint");
    }
  })());
}
export const u_typar_constraints = CurriedLambda(function (st) {
  return u_list_revi(CurriedLambda(function (st_1) {
    return u_typar_constraint(st_1);
  }), st);
});
export function p_typar_spec_data(x, st) {
  (function (x_1, st_1) {
    p_ident(x_1, st_1);
  })(x.typar_id, st);

  p_attribs(x.typar_attribs, st);

  (function (i, st_2) {
    p_int64(i, st_2);
  })(fromNumber(x.typar_flags.PickledBits, false), st);

  p_typar_constraints(x.typar_constraints, st);

  (function (arg00_, st_3) {
    p_xmldoc(arg00_, st_3);
  })(x.typar_xmldoc, st);
}
export function p_typar_spec(x, st) {
  if (x.IsFromError) {
    warning(new _Error([0, "p_typar_spec: from error"], x.Range));
  }

  p_osgn_decl(st.otypars, function (x_1, st_1) {
    p_typar_spec_data(x_1, st_1);
  }, x, st);
}
export const p_typar_specs = CurriedLambda(function (x, st) {
  p_list(function (x_1, st_1) {
    p_typar_spec(x_1, st_1);
  }, x, st);
});
export function u_typar_spec_data(st) {
  let patternInput;

  const a = function (st_1) {
    return u_ident(st_1);
  }(st);

  const b = u_attribs(st);

  const c = function (st_2) {
    return u_int64(st_2);
  }(st);

  const d = u_typar_constraints(st);

  const e = function (st_3) {
    return u_xmldoc(st_3);
  }(st);

  patternInput = [a, b, c, d, e];
  const typar_il_name = null;
  const typar_stamp = newStamp();
  const typar_flags = new TyparFlags(~~patternInput[2].toNumber());
  const typar_solution = null;
  return new Typar(patternInput[0], typar_il_name, typar_flags, typar_stamp, patternInput[4], patternInput[1], typar_solution, patternInput[3], null);
}
export function u_typar_spec(st) {
  return u_osgn_decl(st.itypars, function (st_1) {
    return u_typar_spec_data(st_1);
  }, st);
}
export const u_typar_specs = CurriedLambda(function (st) {
  return u_list(function (st_1) {
    return u_typar_spec(st_1);
  }, st);
});
fill_p_typ(function (ty, st) {
  const ty_1 = stripTyparEqns(ty);
  let $var36;

  if (ty_1.tag === 1) {
    const activePatternResult30835 = _ERefLocal_ERefNonLocal_(ty_1.data[0]);

    if (activePatternResult30835.tag === 1) {
      if (ty_1.data[1].tail == null) {
        $var36 = [1, activePatternResult30835.data];
      } else {
        $var36 = [2, ty_1.data[0], ty_1.data[1]];
      }
    } else {
      $var36 = [2, ty_1.data[0], ty_1.data[1]];
    }
  } else if (ty_1.tag === 3) {
    $var36 = [3, ty_1.data[0], ty_1.data[1]];
  } else if (ty_1.tag === 5) {
    $var36 = [4, ty_1.data];
  } else if (ty_1.tag === 0) {
    $var36 = [5, ty_1.data[1], ty_1.data[0]];
  } else if (ty_1.tag === 6) {
    $var36 = [6, ty_1.data];
  } else if (ty_1.tag === 4) {
    $var36 = [7, ty_1.data[1], ty_1.data[0]];
  } else {
    $var36 = [0, ty_1.data[1], ty_1.data[0]];
  }

  switch ($var36[0]) {
    case 0:
      if (evalTupInfoIsStruct($var36[2])) {
        p_byte(8, st);
        p_typs($var36[1], st);
      } else {
        p_byte(0, st);
        p_typs($var36[1], st);
      }

      break;

    case 1:
      p_byte(1, st);
      p_simpletyp($var36[1], st);
      break;

    case 2:
      p_byte(2, st);

      (function (tupledArg_1, st_1) {
        p_tcref("typ")(tupledArg_1[0], st_1);
        p_typs(tupledArg_1[1], st_1);
      })([$var36[1], $var36[2]], st);

      break;

    case 3:
      p_byte(3, st);

      (function (tupledArg_2, st_2) {
        p_typ(tupledArg_2[0], st_2);
        p_typ(tupledArg_2[1], st_2);
      })([$var36[1], $var36[2]], st);

      break;

    case 4:
      p_byte(4, st);
      p_tpref($var36[1], st);
      break;

    case 5:
      p_byte(5, st);

      (function (tupledArg_3, st_3) {
        p_typar_specs(tupledArg_3[0], st_3);
        p_typ(tupledArg_3[1], st_3);
      })([$var36[2], $var36[1]], st);

      break;

    case 6:
      p_byte(6, st);
      p_measure_expr($var36[1], st);
      break;

    case 7:
      p_byte(7, st);

      (function (tupledArg_4, st_4) {
        p_ucref(tupledArg_4[0], st_4);
        p_typs(tupledArg_4[1], st_4);
      })([$var36[2], $var36[1]], st);

      break;
  }
});
fill_u_typ(function (st_5) {
  const tag = u_byte(st_5) | 0;

  switch (tag) {
    case 0:
      const l = u_typs(st_5);
      return new TType(2, [tupInfoRef, l]);

    case 1:
      return u_simpletyp(st_5);

    case 2:
      const tc = u_tcref(st_5);
      const tinst = u_typs(st_5);
      return new TType(1, [tc, tinst]);

    case 3:
      const d = u_typ(st_5);
      const r = u_typ(st_5);
      return new TType(3, [d, r]);

    case 4:
      const r_1 = u_tpref(st_5);
      return r_1.AsType;

    case 5:
      const tps = u_typar_specs(st_5);
      const r_2 = u_typ(st_5);
      return new TType(0, [tps, r_2]);

    case 6:
      const unt = u_measure_expr(st_5);
      return new TType(6, unt);

    case 7:
      const uc = u_ucref(st_5);
      const tinst_1 = u_typs(st_5);
      return new TType(4, [uc, tinst_1]);

    case 8:
      const l_1 = u_typs(st_5);
      return new TType(2, [tupInfoStruct, l_1]);

    default:
      return ufailwith(st_5, "u_typ");
  }
});
const patternInput_1579_6 = p_hole();
export const p_binds = CurriedLambda(patternInput_1579_6[1]);
export const fill_p_binds = CurriedLambda(patternInput_1579_6[0]);
const patternInput_1580_7 = p_hole();
export const p_targets = CurriedLambda(patternInput_1580_7[1]);
export const fill_p_targets = CurriedLambda(patternInput_1580_7[0]);
const patternInput_1581_8 = p_hole();
export const p_Exprs = CurriedLambda(patternInput_1581_8[1]);
export const fill_p_Exprs = CurriedLambda(patternInput_1581_8[0]);
const patternInput_1582_9 = p_hole();
export const p_constraints = CurriedLambda(patternInput_1582_9[1]);
export const fill_p_constraints = CurriedLambda(patternInput_1582_9[0]);
const patternInput_1583_10 = p_hole();
export const p_Vals = CurriedLambda(patternInput_1583_10[1]);
export const fill_p_Vals = CurriedLambda(patternInput_1583_10[0]);
const patternInput_1585_11 = u_hole();
export const u_binds = CurriedLambda(patternInput_1585_11[1]);
export const fill_u_binds = CurriedLambda(patternInput_1585_11[0]);
const patternInput_1586_12 = u_hole();
export const u_targets = CurriedLambda(patternInput_1586_12[1]);
export const fill_u_targets = CurriedLambda(patternInput_1586_12[0]);
const patternInput_1587_13 = u_hole();
export const u_Exprs = CurriedLambda(patternInput_1587_13[1]);
export const fill_u_Exprs = CurriedLambda(patternInput_1587_13[0]);
const patternInput_1588_14 = u_hole();
export const u_constraints = CurriedLambda(patternInput_1588_14[1]);
export const fill_u_constraints = CurriedLambda(patternInput_1588_14[0]);
const patternInput_1589_15 = u_hole();
export const u_Vals = CurriedLambda(patternInput_1589_15[1]);
export const fill_u_Vals = CurriedLambda(patternInput_1589_15[0]);
export function p_ArgReprInfo(x, st_6) {
  p_attribs(x.Attribs, st_6);
  p_option(function (x_1, st_7) {
    p_ident(x_1, st_7);
  }, x.Name, st_6);
}
export function p_TyparReprInfo(_arg1, st_6) {
  p_ident(_arg1.data[0], st_6);
  p_kind(_arg1.data[1], st_6);
}
export function p_ValReprInfo(_arg1, st_6) {
  p_list(function (arg00_, st_7) {
    p_TyparReprInfo(arg00_, st_7);
  }, _arg1.data[0], st_6);
  p_list(function (x, st_8) {
    p_list(function (x_1, st_9) {
      p_ArgReprInfo(x_1, st_9);
    }, x, st_8);
  }, _arg1.data[1], st_6);
  p_ArgReprInfo(_arg1.data[2], st_6);
}
export function u_ArgReprInfo(st_6) {
  const a = u_attribs(st_6);
  const b = u_option(function (st_7) {
    return u_ident(st_7);
  }, st_6);
  const matchValue = [a, b];
  const $var37 = matchValue[0].tail == null ? matchValue[1] == null ? [0] : [1] : [1];

  switch ($var37[0]) {
    case 0:
      return ValReprInfoModule.unnamedTopArg1;

    case 1:
      return new ArgReprInfo(a, b);
  }
}
export function u_TyparReprInfo(st_6) {
  const a = u_ident(st_6);
  const b = u_kind(st_6);
  return new TyparReprInfo(0, [a, b]);
}
export function u_ValReprInfo(st_6) {
  const a = u_list(function (st_7) {
    return u_TyparReprInfo(st_7);
  }, st_6);
  const b = u_list(function (st_8) {
    return u_list(function (st_9) {
      return u_ArgReprInfo(st_9);
    }, st_8);
  }, st_6);
  const c = u_ArgReprInfo(st_6);
  return new ValReprInfo(0, [a, b, c]);
}
export function p_ranges(x, st_6) {
  p_option(function (tupledArg_5, st_9) {
    (function (x_1, st_7) {
      p_range(x_1, st_7);
    })(tupledArg_5[0], st_9);

    (function (x_2, st_8) {
      p_range(x_2, st_8);
    })(tupledArg_5[1], st_9);
  }, x, st_6);
}
export function p_istype(x, st_6) {
  if (x.tag === 1) {
    p_byte(1, st_6);
  } else if (x.tag === 2) {
    p_byte(2, st_6);
  } else {
    p_byte(0, st_6);
  }
}
export function p_cpath(_arg1, st_6) {
  (function (tupledArg_6, st_11) {
    var f;

    (function (x, st_7) {
      p_ILScopeRef(x, st_7);
    })(tupledArg_6[0], st_11);

    (f = function (tupledArg_5, st_9) {
      (function (arg00_, arg10_) {
        p_string(arg00_, arg10_);
      })(tupledArg_5[0], st_9);

      (function (x_1, st_8) {
        p_istype(x_1, st_8);
      })(tupledArg_5[1], st_9);
    }, function (x_2, st_10) {
      p_list(f, x_2, st_10);
    })(tupledArg_6[1], st_11);
  })([_arg1.data[0], _arg1.data[1]], st_6);
}
export function u_ranges(st_6) {
  return u_option(function (st_9) {
    const a = function (st_7) {
      return u_range(st_7);
    }(st_9);

    const b = function (st_8) {
      return u_range(st_8);
    }(st_9);

    return [a, b];
  }, st_6);
}
export function u_istype(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  if (tag_1 === 0) {
    return new ModuleOrNamespaceKind(0);
  } else if (tag_1 === 1) {
    return new ModuleOrNamespaceKind(1);
  } else if (tag_1 === 2) {
    return new ModuleOrNamespaceKind(2);
  } else {
    return ufailwith(st_6, "u_istype");
  }
}
export function u_cpath(st_6) {
  const patternInput = function (st_11) {
    var f;

    const a_1 = function (st_7) {
      return u_ILScopeRef(st_7);
    }(st_11);

    const b_1 = (f = function (st_9) {
      const a = function (arg00_) {
        return u_string(arg00_);
      }(st_9);

      const b = function (st_8) {
        return u_istype(st_8);
      }(st_9);

      return [a, b];
    }, function (st_10) {
      return u_list(f, st_10);
    })(st_11);
    return [a_1, b_1];
  }(st_6);

  return new CompilationPath(0, [patternInput[0], patternInput[1]]);
}
export function dummy(x) {
  return x;
}
export function p_tycon_repr(x, st_6) {
  switch (x.tag) {
    case 2:
      p_byte(1, st_6);
      p_byte(1, st_6);
      p_list(function (x_1, st_7) {
        p_unioncase_spec(x_1, st_7);
      }, toList(x.data.CasesTable.CasesByIndex), st_6);
      return false;

    case 4:
      p_byte(1, st_6);
      p_byte(2, st_6);
      p_ILType(x.data, st_6);
      return false;

    case 0:
      p_byte(1, st_6);
      p_byte(3, st_6);
      p_tycon_objmodel_data(x.data, st_6);
      return false;

    case 5:
      p_byte(1, st_6);
      p_byte(4, st_6);
      p_typ(x.data, st_6);
      return false;

    case 6:
      p_byte(0, st_6);
      return false;

    case 3:
      const td = x.data.data[2];
      return error(Microsoft.FSharp.Core.Operators.Failure("Unexpected IL type definition" + td.Name));

    default:
      p_byte(1, st_6);
      p_byte(0, st_6);
      p_rfield_table(x.data, st_6);
      return false;
  }
}
export function p_tycon_objmodel_data(x, st_6) {
  (function (tupledArg_5, st_9) {
    (function (x_1, st_7) {
      p_tycon_objmodel_kind(x_1, st_7);
    })(tupledArg_5[0], st_9);

    p_vrefs("vslots")(tupledArg_5[1], st_9);

    (function (x_2, st_8) {
      p_rfield_table(x_2, st_8);
    })(tupledArg_5[2], st_9);
  })([x.fsobjmodel_kind, x.fsobjmodel_vslots, x.fsobjmodel_rfields], st_6);
}
export function p_attribs_ext(f, x, st_6) {
  p_list_ext(f, function (arg00_, st_7) {
    p_attrib(arg00_, st_7);
  }, x, st_6);
}
export function p_unioncase_spec(x, st_6) {
  p_rfield_table(x.FieldTable, st_6);
  p_typ(x.ReturnType, st_6);
  p_string(x.CompiledName, st_6);
  p_ident(x.Id, st_6);
  p_attribs_ext(st_6.oInMem ? function (st_7) {
    p_xmldoc(x.XmlDoc, st_7);
  } : null, x.Attribs, st_6);
  p_string(x.XmlDocSig, st_6);
  p_access(x.Accessibility, st_6);
}
export function p_exnc_spec_data(x, st_6) {
  p_entity_spec_data(x, st_6);
}
export function p_exnc_repr(x, st_6) {
  if (x.tag === 1) {
    p_byte(1, st_6);
    p_ILTypeRef(x.data, st_6);
  } else if (x.tag === 2) {
    p_byte(2, st_6);
    p_rfield_table(x.data, st_6);
  } else if (x.tag === 3) {
    p_byte(3, st_6);
  } else {
    p_byte(0, st_6);
    p_tcref("exn abbrev")(x.data, st_6);
  }
}
export function p_exnc_spec(x, st_6) {
  p_tycon_spec(x, st_6);
}
export function p_access(_arg1, st_6) {
  p_list(function (arg00_, st_7) {
    p_cpath(arg00_, st_7);
  }, _arg1.data, st_6);
}
export function p_recdfield_spec(x, st_6) {
  var arg00_;
  p_bool(x.rfield_mutable, st_6);
  p_bool(x.rfield_volatile, st_6);
  p_typ(x.rfield_type, st_6);
  p_bool(x.rfield_static, st_6);
  p_bool(x.rfield_secret, st_6);
  p_option(p_const, x.rfield_const, st_6);
  p_ident(x.rfield_id, st_6);
  p_attribs_ext(st_6.oInMem ? (arg00_ = x.XmlDoc, function (st_7) {
    p_xmldoc(arg00_, st_7);
  }) : null, x.rfield_pattribs, st_6);
  p_attribs(x.rfield_fattribs, st_6);
  p_string(x.rfield_xmldocsig, st_6);
  p_access(x.rfield_access, st_6);
}
export function p_rfield_table(x, st_6) {
  p_list(function (x_1, st_7) {
    p_recdfield_spec(x_1, st_7);
  }, toList(x.FieldsByIndex), st_6);
}
export function p_entity_spec_data(x, st_6) {
  var arg00__2;
  p_typar_specs(x.entity_typars.Force(x.entity_range), st_6);
  p_string(x.entity_logical_name, st_6);
  p_option(function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  }, x.EntityCompiledName, st_6);
  p_range(x.entity_range, st_6);
  p_option(function (x_1, st_7) {
    p_pubpath(x_1, st_7);
  }, x.entity_pubpath, st_6);
  p_access(x.Accessibility, st_6);
  p_access(x.TypeReprAccessibility, st_6);
  p_attribs(x.entity_attribs, st_6);
  const flagBit = p_tycon_repr(x.entity_tycon_repr, st_6);
  p_option(p_typ, x.TypeAbbrev, st_6);
  p_tcaug(x.entity_tycon_tcaug, st_6);
  p_string("", st_6);
  p_kind(x.TypeOrMeasureKind, st_6);
  p_int64(x.entity_flags.PickledBits.or(flagBit ? EntityFlags.ReservedBitForPickleFormatTyconReprFlag : fromBits(0, 0, false)), st_6);
  p_option(function (arg00__1, st_8) {
    p_cpath(arg00__1, st_8);
  }, x.entity_cpath, st_6);
  p_maybe_lazy(function (x_2, st_9) {
    p_modul_typ(x_2, st_9);
  }, x.entity_modul_contents, st_6);
  p_exnc_repr(x.ExceptionInfo, st_6);

  if (st_6.oInMem) {
    p_used_space1((arg00__2 = x.XmlDoc, function (st_10) {
      p_xmldoc(arg00__2, st_10);
    }), st_6);
  } else {
    p_space(1, null, st_6);
  }
}
export function p_tcaug(p, st_6) {
  var f;
  var f_1;
  var f_2;
  var f_3;
  var f_4;
  var f_5;
  (f = function (tupledArg_5, st_7) {
    p_vref("compare_obj")(tupledArg_5[0], st_7);
    p_vref("compare")(tupledArg_5[1], st_7);
  }, function (x, st_8) {
    p_option(f, x, st_8);
  })(p.tcaug_compare, st_6);
  (f_1 = p_vref("compare_withc"), function (x_1, st_9) {
    p_option(f_1, x_1, st_9);
  })(p.tcaug_compare_withc, st_6);
  (f_2 = function (tupledArg_6, st_10) {
    p_vref("hash_obj")(tupledArg_6[0], st_10);
    p_vref("hash_withc")(tupledArg_6[1], st_10);
    p_vref("equals_withc")(tupledArg_6[2], st_10);
  }, function (x_2, st_11) {
    p_option(f_2, x_2, st_11);
  })(p.tcaug_hash_and_equals_withc, st_6);
  (f_3 = function (tupledArg_7, st_12) {
    p_vref("hash")(tupledArg_7[0], st_12);
    p_vref("equals")(tupledArg_7[1], st_12);
  }, function (x_3, st_13) {
    p_option(f_3, x_3, st_13);
  })(p.tcaug_equals, st_6);
  (f_4 = function (tupledArg_8, st_14) {
    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg_8[0], st_14);

    p_vref("adhoc")(tupledArg_8[1], st_14);
  }, function (x_4, st_15) {
    p_list(f_4, x_4, st_15);
  })(map_1(function (tupledArg_10) {
    return [tupledArg_10[1].LogicalName, tupledArg_10[1]];
  }, filter(function (tupledArg_11) {
    return !tupledArg_11[0];
  }, toList_1(p.tcaug_adhoc_list))), st_6);
  (f_5 = function (tupledArg_9, st_16) {
    p_typ(tupledArg_9[0], st_16);

    (function (arg00__1, arg10__1) {
      p_bool(arg00__1, arg10__1);
    })(tupledArg_9[1], st_16);

    (function (_x, _st) {
      p_dummy_range(_x, _st);
    })(tupledArg_9[2], st_16);
  }, function (x_5, st_17) {
    p_list(f_5, x_5, st_17);
  })(p.tcaug_interfaces, st_6);

  (function (x_6, st_18) {
    p_option(p_typ, x_6, st_18);
  })(p.tcaug_super, st_6);

  (function (arg00__2, arg10__2) {
    p_bool(arg00__2, arg10__2);
  })(p.tcaug_abstract, st_6);

  (function (arg10__3, st_19) {
    p_space(1, null, st_19);
  })(null, st_6);
}
export function p_tycon_spec(x, st_6) {
  p_osgn_decl(st_6.otycons, function (x_1, st_7) {
    p_entity_spec_data(x_1, st_7);
  }, x, st_6);
}
export function p_parentref(x, st_6) {
  if (x.tag === 0) {
    p_byte(1, st_6);
    p_tcref("parent tycon")(x.data, st_6);
  } else {
    p_byte(0, st_6);
  }
}
export function p_attribkind(x, st_6) {
  if (x.tag === 1) {
    p_byte(1, st_6);
    p_vref("attrib")(x.data, st_6);
  } else {
    p_byte(0, st_6);
    p_ILMethodRef(x.data, st_6);
  }
}
export function p_attrib(_arg2, st_6) {
  p_tcref("attrib")(_arg2.data[0], st_6);

  (function (x, st_7) {
    p_attribkind(x, st_7);
  })(_arg2.data[1], st_6);

  (function (x_1, st_8) {
    p_list(function (arg00_, st_9) {
      p_attrib_expr(arg00_, st_9);
    }, x_1, st_8);
  })(_arg2.data[2], st_6);

  (function (x_2, st_10) {
    p_list(function (arg00__1, st_11) {
      p_attrib_arg(arg00__1, st_11);
    }, x_2, st_10);
  })(_arg2.data[3], st_6);

  (function (arg00__2, arg10_) {
    p_bool(arg00__2, arg10_);
  })(_arg2.data[4], st_6);

  (function (_x, _st) {
    p_dummy_range(_x, _st);
  })(_arg2.data[6], st_6);
}
export function p_attrib_expr(_arg3, st_6) {
  (function (tupledArg_5, st_7) {
    p_expr(tupledArg_5[0], st_7);
    p_expr(tupledArg_5[1], st_7);
  })([_arg3.data[0], _arg3.data[1]], st_6);
}
export function p_attrib_arg(_arg4, st_6) {
  const d_1 = _arg4.data[3];
  const c = _arg4.data[2];
  const b = _arg4.data[1];
  const a = _arg4.data[0];

  (function (tupledArg_5, st_8) {
    (function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    })(tupledArg_5[0], st_8);

    p_typ(tupledArg_5[1], st_8);

    (function (arg00__1, arg10__1) {
      p_bool(arg00__1, arg10__1);
    })(tupledArg_5[2], st_8);

    (function (arg00__2, st_7) {
      p_attrib_expr(arg00__2, st_7);
    })(tupledArg_5[3], st_8);
  })([a, b, c, d_1], st_6);
}
export function p_member_info(x, st_6) {
  (function (tupledArg_5, st_10) {
    p_tcref("member_info")(tupledArg_5[0], st_10);

    (function (x_1, st_7) {
      p_MemberFlags(x_1, st_7);
    })(tupledArg_5[1], st_10);

    (function (x_2, st_8) {
      p_list(function (arg00_, st_9) {
        p_slotsig(arg00_, st_9);
      }, x_2, st_8);
    })(tupledArg_5[2], st_10);

    (function (arg00__1, arg10_) {
      p_bool(arg00__1, arg10_);
    })(tupledArg_5[3], st_10);
  })([x.ApparentEnclosingEntity, x.MemberFlags, x.ImplementedSlotSigs, x.IsImplemented], st_6);
}
export function p_tycon_objmodel_kind(x, st_6) {
  switch (x.tag) {
    case 1:
      p_byte(1, st_6);
      break;

    case 2:
      p_byte(2, st_6);
      break;

    case 3:
      p_byte(3, st_6);
      p_slotsig(x.data, st_6);
      break;

    case 4:
      p_byte(4, st_6);
      break;

    default:
      p_byte(0, st_6);
  }
}
export function p_mustinline(x, st_6) {
  p_byte(x.tag === 1 ? 1 : x.tag === 2 ? 2 : x.tag === 3 ? 3 : 0, st_6);
}
export function p_basethis(x, st_6) {
  p_byte(x.tag === 0 ? 1 : x.tag === 2 ? 2 : x.tag === 3 ? 3 : 0, st_6);
}
export function p_vrefFlags(x, st_6) {
  switch (x.tag) {
    case 2:
      p_byte(1, st_6);
      break;

    case 3:
      p_byte(2, st_6);
      break;

    case 0:
      p_byte(3, st_6);
      p_typ(x.data, st_6);
      break;

    case 4:
      p_byte(4, st_6);
      break;

    default:
      p_byte(0, st_6);
  }
}
export function p_ValData(x, st_6) {
  var arg00__2;
  p_string(x.val_logical_name, st_6);
  p_option(function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  }, x.ValCompiledName, st_6);
  p_ranges(defaultArg(x.ValReprInfo, null, function (_arg3) {
    return [x.val_range, x.DefinitionRange];
  }), st_6);
  p_typ(x.val_type, st_6);
  p_int64(x.val_flags.PickledBits, st_6);
  p_option(function (x_1, st_7) {
    p_member_info(x_1, st_7);
  }, x.MemberInfo, st_6);
  p_attribs(x.Attribs, st_6);
  p_option(function (arg00__1, st_8) {
    p_ValReprInfo(arg00__1, st_8);
  }, x.ValReprInfo, st_6);
  p_string(x.XmlDocSig, st_6);
  p_access(x.Accessibility, st_6);
  p_parentref(x.DeclaringEntity, st_6);
  p_option(p_const, x.LiteralValue, st_6);

  if (st_6.oInMem) {
    p_used_space1((arg00__2 = x.XmlDoc, function (st_9) {
      p_xmldoc(arg00__2, st_9);
    }), st_6);
  } else {
    p_space(1, null, st_6);
  }
}
export function p_Val(x, st_6) {
  p_osgn_decl(st_6.ovals, function (x_1, st_7) {
    p_ValData(x_1, st_7);
  }, x, st_6);
}
export function p_modul_typ(x, st_6) {
  (function (tupledArg_5, st_10) {
    (function (x_1, st_7) {
      p_istype(x_1, st_7);
    })(tupledArg_5[0], st_10);

    p_qlist(function (x_2, st_8) {
      p_Val(x_2, st_8);
    })(tupledArg_5[1], st_10);
    p_qlist(function (x_3, st_9) {
      p_tycon_spec(x_3, st_9);
    })(tupledArg_5[2], st_10);
  })([x.ModuleOrNamespaceKind, x.AllValsAndMembers, x.AllEntities], st_6);
}
export function u_tycon_repr(st_6) {
  return CurriedLambda((() => {
    const tag1 = u_byte(st_6) | 0;

    if (tag1 === 0) {
      return function (_flagBit) {
        return new TyconRepresentation(6);
      };
    } else if (tag1 === 1) {
      const tag2 = u_byte(st_6) | 0;

      switch (tag2) {
        case 0:
          const v = u_rfield_table(st_6);
          return function (_flagBit_1) {
            return new TyconRepresentation(1, v);
          };

        case 1:
          const v_1 = u_list(function (st_7) {
            return u_unioncase_spec(st_7);
          }, st_6);
          return function (_flagBit_2) {
            return MakeUnionRepr(v_1);
          };

        case 2:
          const v_2 = u_ILType(st_6);
          return function (flagBit) {
            if (flagBit) {
              const iltref = v_2.TypeRef;

              if (st_6.iILModule != null) {
                try {
                  const find = function (acc, enclosingTypeNames, tdefs) {
                    find: while (true) {
                      if (enclosingTypeNames.tail != null) {
                        const nestedTypeDef = tdefs.FindByName(enclosingTypeNames.head);
                        acc = new List(tdefs.FindByName(enclosingTypeNames.head), acc);
                        enclosingTypeNames = enclosingTypeNames.tail;
                        tdefs = nestedTypeDef.NestedTypes;
                        continue find;
                      } else {
                        return [reverse(acc), tdefs.FindByName(iltref.Name)];
                      }
                    }
                  };

                  const patternInput = find(new List(), iltref.Enclosing, getValue(st_6.iILModule).TypeDefs);
                  return new TyconRepresentation(3, new TILObjectReprData(0, [st_6.iilscope, patternInput[0], patternInput[1]]));
                } catch (matchValue) {
                  return new TyconRepresentation(6);
                }
              } else {
                return new TyconRepresentation(6);
              }
            } else {
              return new TyconRepresentation(4, v_2);
            }
          };

        case 3:
          const v_3 = u_tycon_objmodel_data(st_6);
          return function (_flagBit_3) {
            return new TyconRepresentation(0, v_3);
          };

        case 4:
          const v_4 = u_typ(st_6);
          return function (_flagBit_4) {
            return new TyconRepresentation(5, v_4);
          };

        default:
          return ufailwith(st_6, "u_tycon_repr");
      }
    } else {
      return ufailwith(st_6, "u_tycon_repr");
    }
  })());
}
export function u_tycon_objmodel_data(st_6) {
  const patternInput = function (st_9) {
    const a = function (st_7) {
      return u_tycon_objmodel_kind(st_7);
    }(st_9);

    const b = u_vrefs(st_9);

    const c = function (st_8) {
      return u_rfield_table(st_8);
    }(st_9);

    return [a, b, c];
  }(st_6);

  return new TyconObjModelData(patternInput[0], patternInput[1], patternInput[2]);
}
export function u_attribs_ext(extraf, st_6) {
  return u_list_ext(extraf, function (st_7) {
    return u_attrib(st_7);
  }, st_6);
}
export function u_unioncase_spec(st_6) {
  const a = u_rfield_table(st_6);
  const b = u_typ(st_6);
  const c = u_string(st_6);
  const d_1 = u_ident(st_6);
  const patternInput = u_attribs_ext(function (st_7) {
    return u_xmldoc(st_7);
  }, st_6);
  const f = u_string(st_6);
  const i = u_access(st_6);
  const XmlDoc = defaultArg(patternInput[0], XmlDoc_1.Empty);
  return new UnionCase(a, b, c, XmlDoc, f, d_1, null, i, patternInput[1]);
}
export function u_exnc_spec_data(st_6) {
  return u_entity_spec_data(st_6);
}
export function u_exnc_repr(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  switch (tag_1) {
    case 0:
      return new ExceptionInfo(0, u_tcref(st_6));

    case 1:
      return new ExceptionInfo(1, u_ILTypeRef(st_6));

    case 2:
      return new ExceptionInfo(2, u_rfield_table(st_6));

    case 3:
      return new ExceptionInfo(3);

    default:
      return ufailwith(st_6, "u_exnc_repr");
  }
}
export function u_exnc_spec(st_6) {
  return u_tycon_spec(st_6);
}
export function u_access(st_6) {
  const matchValue = u_list(function (st_7) {
    return u_cpath(st_7);
  }, st_6);

  if (matchValue.tail == null) {
    return taccessPublic;
  } else {
    return new Accessibility(0, matchValue);
  }
}
export function u_recdfield_spec(st_6) {
  const a = u_bool(st_6);
  const b = u_bool(st_6);
  const c1 = u_typ(st_6);
  const c2 = u_bool(st_6);
  const c2b = u_bool(st_6);
  const c3 = u_option(u_const, st_6);
  const d_1 = u_ident(st_6);
  const patternInput = u_attribs_ext(function (st_7) {
    return u_xmldoc(st_7);
  }, st_6);
  const e2 = u_attribs(st_6);
  const f = u_string(st_6);
  const g = u_access(st_6);
  return new RecdField(a, defaultArg(patternInput[0], XmlDoc_1.Empty), f, c1, c2, b, c2b, c3, g, patternInput[1], e2, d_1, false, null);
}
export function u_rfield_table(st_6) {
  return MakeRecdFieldsTable(u_list(function (st_7) {
    return u_recdfield_spec(st_7);
  }, st_6));
}
export function u_entity_spec_data(st_6) {
  let patternInput;
  const a_1 = u_typar_specs(st_6);

  const b_1 = function (arg00_) {
    return u_string(arg00_);
  }(st_6);

  const c = function (st_7) {
    return u_option(function (arg00__1) {
      return u_string(arg00__1);
    }, st_7);
  }(st_6);

  const d_1 = function (st_8) {
    return u_range(st_8);
  }(st_6);

  const e = function (st_9) {
    return u_option(function (st_10) {
      return u_pubpath(st_10);
    }, st_9);
  }(st_6);

  const f = function (st_13) {
    const a = function (st_11) {
      return u_access(st_11);
    }(st_13);

    const b = function (st_12) {
      return u_access(st_12);
    }(st_13);

    return [a, b];
  }(st_6);

  const x7 = u_attribs(st_6);
  const x8 = CurriedLambda(function (st_14) {
    return u_tycon_repr(st_14);
  })(st_6);

  const x9 = function (st_15) {
    return u_option(u_typ, st_15);
  }(st_6);

  const x10 = function (st_16) {
    return u_tcaug(st_16);
  }(st_6);

  const x11 = function (arg00__2) {
    return u_string(arg00__2);
  }(st_6);

  const x12 = function (st_17) {
    return u_kind(st_17);
  }(st_6);

  const x13 = function (st_18) {
    return u_int64(st_18);
  }(st_6);

  const x14 = function (st_19) {
    return u_option(function (st_20) {
      return u_cpath(st_20);
    }, st_19);
  }(st_6);

  const x15 = u_lazy(function (st_21) {
    return u_modul_typ(st_21);
  })(st_6);

  const x16 = function (st_22) {
    return u_exnc_repr(st_22);
  }(st_6);

  const x17 = function (st_23) {
    return u_used_space1(function (st_24) {
      return u_xmldoc(st_24);
    }, st_23);
  }(st_6);

  patternInput = [a_1, b_1, c, d_1, e, f, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17];
  const x4b = patternInput[5][1];
  const x4a = patternInput[5][0];
  const x7_1 = patternInput[7](!patternInput[12].and(EntityFlags.ReservedBitForPickleFormatTyconReprFlag).Equals(fromBits(0, 0, false)));
  const x11_1 = patternInput[12].and(EntityFlags.ReservedBitForPickleFormatTyconReprFlag.not());
  const entity_typars = LazyWithContext.NotLazy(patternInput[0]);
  const entity_stamp = newStamp();
  const entity_flags = new EntityFlags(x11_1);
  return new Entity(entity_typars, entity_flags, entity_stamp, patternInput[1], patternInput[3], patternInput[6], x7_1, patternInput[9], new MaybeLazy(1, patternInput[14]), patternInput[4], patternInput[13], newCache(), (() => {
    var inputRecord;
    var entity_xmldoc;
    var entity_xmldocsig;
    const matchValue = [patternInput[2], patternInput[11], patternInput[16], patternInput[8], x4a, x4b, patternInput[15]];
    const $var38 = matchValue[0] == null ? matchValue[1].tag === 0 ? matchValue[2] == null ? matchValue[3] == null ? matchValue[4].data.tail == null ? matchValue[5].data.tail == null ? matchValue[6].tag === 3 ? [0] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var38[0]) {
      case 0:
        return null;

      case 1:
        return inputRecord = Entity.EmptyEntityOptData, entity_xmldoc = defaultArg(patternInput[16], XmlDoc_1.Empty), entity_xmldocsig = "", new EntityOptionalData(patternInput[2], inputRecord.entity_other_range, patternInput[11], entity_xmldoc, entity_xmldocsig, patternInput[8], x4b, x4a, patternInput[15]);
    }
  })());
}
export function u_tcaug(st_6) {
  var f;
  var f_1;
  var f_2;
  var f_3;
  var f_4;
  let patternInput;
  const a_5 = (f = function (st_7) {
    const a = u_vref(st_7);
    const b = u_vref(st_7);
    return [a, b];
  }, function (st_8) {
    return u_option(f, st_8);
  })(st_6);

  const b_5 = function (st_9) {
    return u_option(u_vref, st_9);
  }(st_6);

  const c_2 = (f_1 = function (st_10) {
    const a_1 = u_vref(st_10);
    const b_1 = u_vref(st_10);
    const c = u_vref(st_10);
    return [a_1, b_1, c];
  }, function (st_11) {
    return u_option(f_1, st_11);
  })(st_6);
  const d_1 = (f_2 = function (st_12) {
    const a_2 = u_vref(st_12);
    const b_2 = u_vref(st_12);
    return [a_2, b_2];
  }, function (st_13) {
    return u_option(f_2, st_13);
  })(st_6);
  const e = (f_3 = function (st_14) {
    const a_3 = function (arg00_) {
      return u_string(arg00_);
    }(st_14);

    const b_3 = u_vref(st_14);
    return [a_3, b_3];
  }, function (st_15) {
    return u_list(f_3, st_15);
  })(st_6);
  const f_5 = (f_4 = function (st_16) {
    const a_4 = u_typ(st_16);

    const b_4 = function (arg00__1) {
      return u_bool(arg00__1);
    }(st_16);

    const c_1 = function (_st) {
      return u_dummy_range(_st);
    }(st_16);

    return [a_4, b_4, c_1];
  }, function (st_17) {
    return u_list(f_4, st_17);
  })(st_6);

  const x7 = function (st_18) {
    return u_option(u_typ, st_18);
  }(st_6);

  const x8 = function (arg00__2) {
    return u_bool(arg00__2);
  }(st_6);

  const x9 = function (st_19) {
    u_space(1, st_19);
  }(st_6);

  patternInput = [a_5, b_5, c_2, d_1, e, f_5, x7, x8, null];
  return new TyconAugmentation(patternInput[0], patternInput[1], patternInput[3], patternInput[2], false, Array.from(map_1(function (tupledArg_5) {
    return [false, tupledArg_5[1]];
  }, patternInput[4])), NameMultiMapModule.ofList(patternInput[4]), patternInput[5], patternInput[6], true, patternInput[7]);
}
export function u_tycon_spec(st_6) {
  return u_osgn_decl(st_6.itycons, function (st_7) {
    return u_entity_spec_data(st_7);
  }, st_6);
}
export function u_parentref(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  if (tag_1 === 0) {
    return new ParentRef(1);
  } else if (tag_1 === 1) {
    return new ParentRef(0, u_tcref(st_6));
  } else {
    return ufailwith(st_6, "u_attribkind");
  }
}
export function u_attribkind(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  if (tag_1 === 0) {
    return new AttribKind(0, u_ILMethodRef(st_6));
  } else if (tag_1 === 1) {
    return new AttribKind(1, u_vref(st_6));
  } else {
    return ufailwith(st_6, "u_attribkind");
  }
}
export function u_attrib(st_6) {
  let patternInput;
  const a = u_tcref(st_6);

  const b = function (st_7) {
    return u_attribkind(st_7);
  }(st_6);

  const c = function (st_8) {
    return u_list(function (st_9) {
      return u_attrib_expr(st_9);
    }, st_8);
  }(st_6);

  const d_1 = function (st_10) {
    return u_list(function (st_11) {
      return u_attrib_arg(st_11);
    }, st_10);
  }(st_6);

  const e = function (arg00_) {
    return u_bool(arg00_);
  }(st_6);

  const f = function (_st) {
    return u_dummy_range(_st);
  }(st_6);

  patternInput = [a, b, c, d_1, e, f];
  return new Attrib(0, [patternInput[0], patternInput[1], patternInput[2], patternInput[3], patternInput[4], null, patternInput[5]]);
}
export function u_attrib_expr(st_6) {
  const patternInput = function (st_7) {
    const a = u_expr(st_7);
    const b = u_expr(st_7);
    return [a, b];
  }(st_6);

  return new AttribExpr(0, [patternInput[0], patternInput[1]]);
}
export function u_attrib_arg(st_6) {
  const patternInput = function (st_8) {
    const a = function (arg00_) {
      return u_string(arg00_);
    }(st_8);

    const b = u_typ(st_8);

    const c = function (arg00__1) {
      return u_bool(arg00__1);
    }(st_8);

    const d_1 = function (st_7) {
      return u_attrib_expr(st_7);
    }(st_8);

    return [a, b, c, d_1];
  }(st_6);

  return new AttribNamedArg(0, [patternInput[0], patternInput[1], patternInput[2], patternInput[3]]);
}
export function u_member_info(st_6) {
  const patternInput = function (st_10) {
    const a = u_tcref(st_10);

    const b = function (st_7) {
      return u_MemberFlags(st_7);
    }(st_10);

    const c = function (st_8) {
      return u_list(function (st_9) {
        return u_slotsig(st_9);
      }, st_8);
    }(st_10);

    const d_1 = function (arg00_) {
      return u_bool(arg00_);
    }(st_10);

    return [a, b, c, d_1];
  }(st_6);

  return new ValMemberInfo(patternInput[0], patternInput[2], patternInput[3], patternInput[1]);
}
export function u_tycon_objmodel_kind(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  switch (tag_1) {
    case 0:
      return new TyconObjModelKind(0);

    case 1:
      return new TyconObjModelKind(1);

    case 2:
      return new TyconObjModelKind(2);

    case 3:
      return new TyconObjModelKind(3, u_slotsig(st_6));

    case 4:
      return new TyconObjModelKind(4);

    default:
      return ufailwith(st_6, "u_tycon_objmodel_kind");
  }
}
export function u_mustinline(st_6) {
  const matchValue = u_byte(st_6) | 0;

  switch (matchValue) {
    case 0:
      return new ValInline(0);

    case 1:
      return new ValInline(1);

    case 2:
      return new ValInline(2);

    case 3:
      return new ValInline(3);

    default:
      return ufailwith(st_6, "u_mustinline");
  }
}
export function u_basethis(st_6) {
  const matchValue = u_byte(st_6) | 0;

  switch (matchValue) {
    case 0:
      return new ValBaseOrThisInfo(1);

    case 1:
      return new ValBaseOrThisInfo(0);

    case 2:
      return new ValBaseOrThisInfo(2);

    case 3:
      return new ValBaseOrThisInfo(3);

    default:
      return ufailwith(st_6, "u_basethis");
  }
}
export function u_vrefFlags(st_6) {
  const matchValue = u_byte(st_6) | 0;

  switch (matchValue) {
    case 0:
      return new ValUseFlag(1);

    case 1:
      return new ValUseFlag(2);

    case 2:
      return new ValUseFlag(3);

    case 3:
      return new ValUseFlag(0, u_typ(st_6));

    case 4:
      return new ValUseFlag(4);

    default:
      return ufailwith(st_6, "u_vrefFlags");
  }
}
export function u_ValData(st_6) {
  var a_1;
  let patternInput;

  const a = function (arg00_) {
    return u_string(arg00_);
  }(st_6);

  const b = function (st_7) {
    return u_option(function (arg00__1) {
      return u_string(arg00__1);
    }, st_7);
  }(st_6);

  const c = function (st_8) {
    return u_ranges(st_8);
  }(st_6);

  const d_1 = u_typ(st_6);

  const e = function (st_9) {
    return u_int64(st_9);
  }(st_6);

  const f = function (st_10) {
    return u_option(function (st_11) {
      return u_member_info(st_11);
    }, st_10);
  }(st_6);

  const x7 = u_attribs(st_6);

  const x8 = function (st_12) {
    return u_option(function (st_13) {
      return u_ValReprInfo(st_13);
    }, st_12);
  }(st_6);

  const x9 = function (arg00__2) {
    return u_string(arg00__2);
  }(st_6);

  const x10 = function (st_14) {
    return u_access(st_14);
  }(st_6);

  const x11 = function (st_15) {
    return u_parentref(st_15);
  }(st_6);

  const x12 = function (st_16) {
    return u_option(u_const, st_16);
  }(st_6);

  const x13 = function (st_17) {
    return u_used_space1(function (st_18) {
      return u_xmldoc(st_18);
    }, st_17);
  }(st_6);

  patternInput = [a, b, c, d_1, e, f, x7, x8, x9, x10, x11, x12, x13];
  return new Val(patternInput[0], patternInput[2] != null ? (a_1 = getValue(patternInput[2])[0], a_1) : range0, patternInput[3], newStamp(), new ValFlags(patternInput[4]), (() => {
    var val_other_range;
    var val_defn;
    var b_1;
    const matchValue = [patternInput[1], patternInput[2], patternInput[7], patternInput[11], patternInput[9], patternInput[12], patternInput[5], patternInput[10], patternInput[8], patternInput[6]];
    const $var39 = matchValue[0] == null ? matchValue[1] == null ? matchValue[2] == null ? matchValue[3] == null ? matchValue[4].data.tail == null ? matchValue[5] == null ? matchValue[6] == null ? matchValue[7].tag === 1 ? matchValue[8] === "" ? matchValue[9].tail == null ? [0] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var39[0]) {
      case 0:
        return null;

      case 1:
        return val_other_range = patternInput[2] != null ? (b_1 = getValue(patternInput[2])[1], [b_1, true]) : null, val_defn = null, new ValOptionalData(patternInput[1], val_other_range, patternInput[11], val_defn, patternInput[7], patternInput[9], defaultArg(patternInput[12], XmlDoc_1.Empty), patternInput[5], patternInput[10], patternInput[8], patternInput[6]);
    }
  })());
}
export function u_Val(st_6) {
  return u_osgn_decl(st_6.ivals, function (st_7) {
    return u_ValData(st_7);
  }, st_6);
}
export function u_modul_typ(st_6) {
  const patternInput = function (st_10) {
    const a = function (st_7) {
      return u_istype(st_7);
    }(st_10);

    const b = u_qlist(function (st_8) {
      return u_Val(st_8);
    })(st_10);
    const c = u_qlist(function (st_9) {
      return u_tycon_spec(st_9);
    })(st_10);
    return [a, b, c];
  }(st_6);

  return new ModuleOrNamespaceType(patternInput[0], patternInput[1], patternInput[2]);
}
export const p_const = CurriedLambda(function (x, st_6) {
  switch (x.tag) {
    case 1:
      p_byte(1, st_6);
      p_int8(x.data, st_6);
      break;

    case 2:
      p_byte(2, st_6);
      p_uint8(x.data, st_6);
      break;

    case 3:
      p_byte(3, st_6);
      p_int16(x.data, st_6);
      break;

    case 4:
      p_byte(4, st_6);
      p_uint16(x.data, st_6);
      break;

    case 5:
      p_byte(5, st_6);
      p_int32(x.data, st_6);
      break;

    case 6:
      p_byte(6, st_6);
      p_uint32(x.data, st_6);
      break;

    case 7:
      p_byte(7, st_6);
      p_int64(x.data, st_6);
      break;

    case 8:
      p_byte(8, st_6);
      p_uint64(x.data, st_6);
      break;

    case 9:
      p_byte(9, st_6);
      p_int64(x.data, st_6);
      break;

    case 10:
      p_byte(10, st_6);
      p_uint64(x.data, st_6);
      break;

    case 11:
      p_byte(11, st_6);
      p_single(x.data, st_6);
      break;

    case 12:
      p_byte(12, st_6);
      p_int64(bits_of_float(x.data), st_6);
      break;

    case 13:
      p_byte(13, st_6);
      p_char(x.data, st_6);
      break;

    case 14:
      p_byte(14, st_6);
      p_string(x.data, st_6);
      break;

    case 16:
      p_byte(15, st_6);
      break;

    case 17:
      p_byte(16, st_6);
      break;

    case 15:
      p_byte(17, st_6);
      p_array(function (n, st_7) {
        p_int32(n, st_7);
      })(System.Decimal.GetBits(x.data), st_6);
      break;

    default:
      p_byte(0, st_6);
      p_bool(x.data, st_6);
  }
});
export const u_const = CurriedLambda(function (st_6) {
  const tag_1 = u_byte(st_6) | 0;

  switch (tag_1) {
    case 0:
      return new Const(0, u_bool(st_6));

    case 1:
      return new Const(1, u_int8(st_6));

    case 2:
      return new Const(2, u_uint8(st_6));

    case 3:
      return new Const(3, u_int16(st_6));

    case 4:
      return new Const(4, u_uint16(st_6));

    case 5:
      return new Const(5, u_int32(st_6));

    case 6:
      return new Const(6, u_uint32(st_6));

    case 7:
      return new Const(7, u_int64(st_6));

    case 8:
      return new Const(8, u_uint64(st_6));

    case 9:
      return new Const(9, u_int64(st_6));

    case 10:
      return new Const(10, u_uint64(st_6));

    case 11:
      return new Const(11, u_single(st_6));

    case 12:
      return new Const(12, float_of_bits(u_int64(st_6)));

    case 13:
      return new Const(13, u_char(st_6));

    case 14:
      return new Const(14, u_string(st_6));

    case 15:
      return new Const(16);

    case 16:
      return new Const(17);

    case 17:
      return function (bits) {
        return new Const(15, bits);
      }(u_array(function (st_7) {
        return u_int32(st_7);
      })(st_6));

    default:
      return ufailwith(st_6, "u_const");
  }
});
export function p_dtree(x, st_6) {
  if (x.tag === 1) {
    p_byte(1, st_6);

    (function (tupledArg_5, st_7) {
      p_Exprs(tupledArg_5[0], st_7);

      (function (arg00_, arg10_) {
        p_int(arg00_, arg10_);
      })(tupledArg_5[1], st_7);
    })([x.data[0], x.data[1]], st_6);
  } else if (x.tag === 2) {
    p_byte(2, st_6);

    (function (tupledArg_6, st_10) {
      (function (arg00__1, st_8) {
        p_bind(arg00__1, st_8);
      })(tupledArg_6[0], st_10);

      (function (x_1, st_9) {
        p_dtree(x_1, st_9);
      })(tupledArg_6[1], st_10);
    })([x.data[0], x.data[1]], st_6);
  } else {
    p_byte(0, st_6);

    (function (tupledArg_7, st_15) {
      p_expr(tupledArg_7[0], st_15);

      (function (x_2, st_11) {
        p_list(function (arg00__2, st_12) {
          p_dtree_case(arg00__2, st_12);
        }, x_2, st_11);
      })(tupledArg_7[1], st_15);

      (function (x_3, st_13) {
        p_option(function (x_4, st_14) {
          p_dtree(x_4, st_14);
        }, x_3, st_13);
      })(tupledArg_7[2], st_15);

      (function (_x, _st) {
        p_dummy_range(_x, _st);
      })(tupledArg_7[3], st_15);
    })([x.data[0], x.data[1], x.data[2], x.data[3]], st_6);
  }
}
export function p_dtree_case(_arg5, st_6) {
  (function (tupledArg_5, st_9) {
    (function (x, st_7) {
      p_dtree_discrim(x, st_7);
    })(tupledArg_5[0], st_9);

    (function (x_1, st_8) {
      p_dtree(x_1, st_8);
    })(tupledArg_5[1], st_9);
  })([_arg5.data[0], _arg5.data[1]], st_6);
}
export function p_dtree_discrim(x, st_6) {
  switch (x.tag) {
    case 2:
      p_byte(1, st_6);
      p_const(x.data, st_6);
      break;

    case 3:
      p_byte(2, st_6);
      break;

    case 4:
      p_byte(3, st_6);
      p_typ(x.data[0], st_6);
      p_typ(x.data[1], st_6);
      break;

    case 1:
      p_byte(4, st_6);

      (function (tupledArg_5, st_7) {
        (function (arg00_, arg10_) {
          p_int(arg00_, arg10_);
        })(tupledArg_5[0], st_7);

        p_typ(tupledArg_5[1], st_7);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 5:
      pfailwith(st_6, "DecisionTreeTest.ActivePatternCase: only used during pattern match compilation");
      break;

    default:
      p_byte(0, st_6);

      (function (tupledArg_6, st_8) {
        p_ucref(tupledArg_6[0], st_8);
        p_typs(tupledArg_6[1], st_8);
      })([x.data[0], x.data[1]], st_6);

  }
}
export function p_target(_arg6, st_6) {
  (function (tupledArg_5, st_7) {
    p_Vals(tupledArg_5[0], st_7);
    p_expr(tupledArg_5[1], st_7);
  })([_arg6.data[0], _arg6.data[1]], st_6);
}
export function p_bind(_arg7, st_6) {
  (function (tupledArg_5, st_8) {
    (function (x, st_7) {
      p_Val(x, st_7);
    })(tupledArg_5[0], st_8);

    p_expr(tupledArg_5[1], st_8);
  })([_arg7.data[0], _arg7.data[1]], st_6);
}
export function p_lval_op_kind(x, st_6) {
  p_byte(x.tag === 1 ? 1 : x.tag === 2 ? 2 : x.tag === 3 ? 3 : 0, st_6);
}
export function p_recdInfo(x, st_6) {
  if (x.tag === 0) {
    pfailwith(st_6, "explicit object constructors can't be inlined and should not have optimization information");
  }
}
export function u_dtree(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  if (tag_1 === 0) {
    return function (tupledArg_5) {
      return new DecisionTree(0, [tupledArg_5[0], tupledArg_5[1], tupledArg_5[2], tupledArg_5[3]]);
    }(function (st_11) {
      const a = u_expr(st_11);

      const b = function (st_7) {
        return u_list(function (st_8) {
          return u_dtree_case(st_8);
        }, st_7);
      }(st_11);

      const c = function (st_9) {
        return u_option(function (st_10) {
          return u_dtree(st_10);
        }, st_9);
      }(st_11);

      const d_1 = function (_st) {
        return u_dummy_range(_st);
      }(st_11);

      return [a, b, c, d_1];
    }(st_6));
  } else if (tag_1 === 1) {
    return function (tupledArg_6) {
      return new DecisionTree(1, [tupledArg_6[0], tupledArg_6[1]]);
    }(function (st_12) {
      const a_1 = u_Exprs(st_12);

      const b_1 = function (arg00_) {
        return u_int(arg00_);
      }(st_12) | 0;

      return [a_1, b_1];
    }(st_6));
  } else if (tag_1 === 2) {
    return function (tupledArg_7) {
      return new DecisionTree(2, [tupledArg_7[0], tupledArg_7[1]]);
    }(function (st_15) {
      const a_2 = function (st_13) {
        return u_bind(st_13);
      }(st_15);

      const b_2 = function (st_14) {
        return u_dtree(st_14);
      }(st_15);

      return [a_2, b_2];
    }(st_6));
  } else {
    return ufailwith(st_6, "u_dtree");
  }
}
export function u_dtree_case(st_6) {
  const patternInput = function (st_9) {
    const a = function (st_7) {
      return u_dtree_discrim(st_7);
    }(st_9);

    const b = function (st_8) {
      return u_dtree(st_8);
    }(st_9);

    return [a, b];
  }(st_6);

  return new DecisionTreeCase(0, [patternInput[0], patternInput[1]]);
}
export function u_dtree_discrim(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  switch (tag_1) {
    case 0:
      return function (tupledArg_5) {
        return new DecisionTreeTest(0, [tupledArg_5[0], tupledArg_5[1]]);
      }(function (st_7) {
        const a = u_ucref(st_7);
        const b = u_typs(st_7);
        return [a, b];
      }(st_6));

    case 1:
      return new DecisionTreeTest(2, u_const(st_6));

    case 2:
      return new DecisionTreeTest(3);

    case 3:
      return function (tupledArg_6) {
        return new DecisionTreeTest(4, [tupledArg_6[0], tupledArg_6[1]]);
      }(function (st_8) {
        const a_1 = u_typ(st_8);
        const b_1 = u_typ(st_8);
        return [a_1, b_1];
      }(st_6));

    case 4:
      return function (tupledArg_7) {
        return new DecisionTreeTest(1, [tupledArg_7[0], tupledArg_7[1]]);
      }(function (st_9) {
        const a_2 = function (arg00_) {
          return u_int(arg00_);
        }(st_9) | 0;

        const b_2 = u_typ(st_9);
        return [a_2, b_2];
      }(st_6));

    default:
      return ufailwith(st_6, "u_dtree_discrim");
  }
}
export function u_target(st_6) {
  const patternInput = function (st_7) {
    const a = u_Vals(st_7);
    const b = u_expr(st_7);
    return [a, b];
  }(st_6);

  return new DecisionTreeTarget(0, [patternInput[0], patternInput[1], new SequencePointInfoForTarget(1)]);
}
export function u_bind(st_6) {
  const a = u_Val(st_6);
  const b = u_expr(st_6);
  return new Binding(0, [a, b, new SequencePointInfoForBinding(3)]);
}
export function u_lval_op_kind(st_6) {
  const matchValue = u_byte(st_6) | 0;

  switch (matchValue) {
    case 0:
      return new LValueOperation(0);

    case 1:
      return new LValueOperation(1);

    case 2:
      return new LValueOperation(2);

    case 3:
      return new LValueOperation(3);

    default:
      return ufailwith(st_6, "uval_op_kind");
  }
}
export function p_op(x, st_6) {
  switch (x.tag) {
    case 1:
      p_byte(1, st_6);
      p_tcref("op")(x.data, st_6);
      break;

    case 2:
      if (evalTupInfoIsStruct(x.data)) {
        p_byte(29, st_6);
      } else {
        p_byte(2, st_6);
      }

      break;

    case 10:
      p_byte(3, st_6);

      (function (tupledArg_5, st_8) {
        (function (x_1, st_7) {
          p_recdInfo(x_1, st_7);
        })(tupledArg_5[0], st_8);

        p_tcref("recd op")(tupledArg_5[1], st_8);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 11:
      p_byte(4, st_6);
      p_rfref(x.data, st_6);
      break;

    case 12:
      p_byte(5, st_6);
      p_rfref(x.data, st_6);
      break;

    case 14:
      p_byte(6, st_6);
      p_tcref("cnstr op")(x.data, st_6);
      break;

    case 16:
      p_byte(7, st_6);

      (function (tupledArg_6, st_9) {
        p_ucref(tupledArg_6[0], st_9);

        (function (arg00_, arg10_) {
          p_int(arg00_, arg10_);
        })(tupledArg_6[1], st_9);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 18:
      p_byte(8, st_6);

      (function (tupledArg_7, st_10) {
        p_ucref(tupledArg_7[0], st_10);

        (function (arg00__1, arg10__1) {
          p_int(arg00__1, arg10__1);
        })(tupledArg_7[1], st_10);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 19:
      p_byte(9, st_6);

      (function (tupledArg_8, st_11) {
        p_tcref("exn op")(tupledArg_8[0], st_11);

        (function (arg00__2, arg10__2) {
          p_int(arg00__2, arg10__2);
        })(tupledArg_8[1], st_11);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 20:
      p_byte(10, st_6);

      (function (tupledArg_9, st_12) {
        p_tcref("exn op")(tupledArg_9[0], st_12);

        (function (arg00__3, arg10__3) {
          p_int(arg00__3, arg10__3);
        })(tupledArg_9[1], st_12);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 21:
      if (evalTupInfoIsStruct(x.data[0])) {
        p_byte(30, st_6);
        p_int(x.data[1], st_6);
      } else {
        p_byte(11, st_6);
        p_int(x.data[1], st_6);
      }

      break;

    case 22:
      p_byte(12, st_6);

      (function (tupledArg_10, st_15) {
        (function (x_2, st_13) {
          p_list(function (x_3, st_14) {
            p_ILInstr(x_3, st_14);
          }, x_2, st_13);
        })(tupledArg_10[0], st_15);

        p_typs(tupledArg_10[1], st_15);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 23:
      p_byte(13, st_6);
      break;

    case 15:
      p_byte(14, st_6);
      p_ucref(x.data, st_6);
      break;

    case 24:
      p_byte(15, st_6);
      break;

    case 29:
      p_byte(16, st_6);
      p_trait(x.data, st_6);
      break;

    case 30:
      p_byte(17, st_6);

      (function (tupledArg_11, st_17) {
        (function (x_4, st_16) {
          p_lval_op_kind(x_4, st_16);
        })(tupledArg_11[0], st_17);

        p_vref("lval")(tupledArg_11[1], st_17);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 31:
      p_byte(18, st_6);

      (function (arg00__4, arg10__4) {
        p_bool(arg00__4, arg10__4);
      })(x.data[0], st_6);

      (function (arg00__5, arg10__5) {
        p_bool(arg00__5, arg10__5);
      })(x.data[1], st_6);

      (function (arg00__6, arg10__6) {
        p_bool(arg00__6, arg10__6);
      })(x.data[2], st_6);

      (function (arg00__7, arg10__7) {
        p_bool(arg00__7, arg10__7);
      })(x.data[3], st_6);

      (function (x_5, st_18) {
        p_vrefFlags(x_5, st_18);
      })(x.data[4], st_6);

      (function (arg00__8, arg10__8) {
        p_bool(arg00__8, arg10__8);
      })(x.data[5], st_6);

      (function (arg00__9, arg10__9) {
        p_bool(arg00__9, arg10__9);
      })(x.data[6], st_6);

      (function (x_6, st_19) {
        p_ILMethodRef(x_6, st_19);
      })(x.data[7], st_6);

      p_typs(x.data[8], st_6);
      p_typs(x.data[9], st_6);
      p_typs(x.data[10], st_6);
      break;

    case 3:
      p_byte(19, st_6);
      break;

    case 6:
      p_byte(20, st_6);
      break;

    case 7:
      p_byte(21, st_6);
      p_int(x.data[1].tag === 2 ? 1 : x.data[1].tag === 1 ? 2 : 0, st_6);
      break;

    case 4:
      p_byte(22, st_6);
      p_bytes(x.data, st_6);
      break;

    case 8:
      p_byte(23, st_6);
      break;

    case 9:
      p_byte(24, st_6);
      break;

    case 13:
      p_byte(25, st_6);
      p_rfref(x.data, st_6);
      break;

    case 5:
      p_byte(26, st_6);
      p_array(function (x_7, st_20) {
        p_uint16(x_7, st_20);
      })(x.data, st_6);
      break;

    case 25:
      p_byte(27, st_6);
      break;

    case 17:
      p_byte(28, st_6);

      (function (tupledArg_12, st_21) {
        p_ucref(tupledArg_12[0], st_21);

        (function (arg00__10, arg10__10) {
          p_int(arg00__10, arg10__10);
        })(tupledArg_12[1], st_21);
      })([x.data[0], x.data[1]], st_6);

      break;

    case 27:
    case 28:
    case 26:
      throw new Error("unexpected backend construct in pickled TAST");
      break;

    default:
      p_byte(0, st_6);
      p_ucref(x.data, st_6);
  }
}
export function u_op(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  switch (tag_1) {
    case 0:
      const a = u_ucref(st_6);
      return new TOp(0, a);

    case 1:
      const a_1 = u_tcref(st_6);
      return new TOp(1, a_1);

    case 2:
      return new TOp(2, tupInfoRef);

    case 3:
      const b = u_tcref(st_6);
      return new TOp(10, [new RecordConstructionInfo(1), b]);

    case 4:
      const a_2 = u_rfref(st_6);
      return new TOp(11, a_2);

    case 5:
      const a_3 = u_rfref(st_6);
      return new TOp(12, a_3);

    case 6:
      const a_4 = u_tcref(st_6);
      return new TOp(14, a_4);

    case 7:
      const a_5 = u_ucref(st_6);
      const b_1 = u_int(st_6) | 0;
      return new TOp(16, [a_5, b_1]);

    case 8:
      const a_6 = u_ucref(st_6);
      const b_2 = u_int(st_6) | 0;
      return new TOp(18, [a_6, b_2]);

    case 9:
      const a_7 = u_tcref(st_6);
      const b_3 = u_int(st_6) | 0;
      return new TOp(19, [a_7, b_3]);

    case 10:
      const a_8 = u_tcref(st_6);
      const b_4 = u_int(st_6) | 0;
      return new TOp(20, [a_8, b_4]);

    case 11:
      const a_9 = u_int(st_6) | 0;
      return new TOp(21, [tupInfoRef, a_9]);

    case 12:
      const a_10 = u_list(function (st_7) {
        return u_ILInstr(st_7);
      }, st_6);
      const b_5 = u_typs(st_6);
      return new TOp(22, [a_10, b_5]);

    case 13:
      return new TOp(23);

    case 14:
      const a_11 = u_ucref(st_6);
      return new TOp(15, a_11);

    case 15:
      return new TOp(24);

    case 16:
      const a_12 = u_trait(st_6);
      return new TOp(29, a_12);

    case 17:
      const a_13 = u_lval_op_kind(st_6);
      const b_6 = u_vref(st_6);
      return new TOp(30, [a_13, b_6]);

    case 18:
      let patternInput;

      const a_14 = function (arg00_) {
        return u_bool(arg00_);
      }(st_6);

      const b_7 = function (arg00__1) {
        return u_bool(arg00__1);
      }(st_6);

      const c = function (arg00__2) {
        return u_bool(arg00__2);
      }(st_6);

      const d_1 = function (arg00__3) {
        return u_bool(arg00__3);
      }(st_6);

      const e = function (st_8) {
        return u_vrefFlags(st_8);
      }(st_6);

      const f = function (arg00__4) {
        return u_bool(arg00__4);
      }(st_6);

      const x7 = function (arg00__5) {
        return u_bool(arg00__5);
      }(st_6);

      const x8 = function (st_9) {
        return u_ILMethodRef(st_9);
      }(st_6);

      patternInput = [a_14, b_7, c, d_1, e, f, x7, x8];
      const b_8 = u_typs(st_6);
      const c_1 = u_typs(st_6);
      const d_2 = u_typs(st_6);
      return new TOp(31, [patternInput[0], patternInput[1], patternInput[2], patternInput[3], patternInput[4], patternInput[5], patternInput[6], patternInput[7], b_8, c_1, d_2]);

    case 19:
      return new TOp(3);

    case 20:
      return new TOp(6, [new SequencePointInfoForWhileLoop(1), new SpecialWhileLoopMarker(0)]);

    case 21:
      let dir;
      const matchValue = u_int(st_6) | 0;

      if (matchValue === 0) {
        dir = new ForLoopStyle(0);
      } else if (matchValue === 1) {
        dir = new ForLoopStyle(2);
      } else if (matchValue === 2) {
        dir = new ForLoopStyle(1);
      } else {
        throw new Error("unknown for loop");
      }

      return new TOp(7, [new SequencePointInfoForForLoop(1), dir]);

    case 22:
      return new TOp(4, u_bytes(st_6));

    case 23:
      return new TOp(8, [new SequencePointInfoForTry(2), new SequencePointInfoForWith(1)]);

    case 24:
      return new TOp(9, [new SequencePointInfoForTry(2), new SequencePointInfoForFinally(1)]);

    case 25:
      const a_15 = u_rfref(st_6);
      return new TOp(13, a_15);

    case 26:
      return new TOp(5, u_array(function (st_10) {
        return u_uint16(st_10);
      })(st_6));

    case 27:
      return new TOp(25);

    case 28:
      const a_16 = u_ucref(st_6);
      const b_9 = u_int(st_6) | 0;
      return new TOp(17, [a_16, b_9]);

    case 29:
      return new TOp(2, tupInfoStruct);

    case 30:
      const a_17 = u_int(st_6) | 0;
      return new TOp(21, [tupInfoStruct, a_17]);

    default:
      return ufailwith(st_6, "u_op");
  }
}
export const p_expr = CurriedLambda(function (expr, st_6) {
  switch (expr.tag) {
    case 0:
      p_byte(0, st_6);

      (function (tupledArg_5, st_7) {
        p_const(tupledArg_5[0], st_7);

        (function (_x, _st) {
          p_dummy_range(_x, _st);
        })(tupledArg_5[1], st_7);

        p_typ(tupledArg_5[2], st_7);
      })([expr.data[0], expr.data[1], expr.data[2]], st_6);

      break;

    case 1:
      p_byte(1, st_6);

      (function (tupledArg_6, st_9) {
        p_vref("val")(tupledArg_6[0], st_9);

        (function (x, st_8) {
          p_vrefFlags(x, st_8);
        })(tupledArg_6[1], st_9);

        (function (_x_1, _st_1) {
          p_dummy_range(_x_1, _st_1);
        })(tupledArg_6[2], st_9);
      })([expr.data[0], expr.data[1], expr.data[2]], st_6);

      break;

    case 11:
      p_byte(2, st_6);

      (function (tupledArg_7, st_11) {
        (function (x_1, st_10) {
          p_op(x_1, st_10);
        })(tupledArg_7[0], st_11);

        p_typs(tupledArg_7[1], st_11);
        p_Exprs(tupledArg_7[2], st_11);

        (function (_x_2, _st_2) {
          p_dummy_range(_x_2, _st_2);
        })(tupledArg_7[3], st_11);
      })([expr.data[0], expr.data[1], expr.data[2], expr.data[3]], st_6);

      break;

    case 2:
      p_byte(3, st_6);

      (function (tupledArg_8, st_12) {
        p_expr(tupledArg_8[0], st_12);
        p_expr(tupledArg_8[1], st_12);

        (function (arg00_, arg10_) {
          p_int(arg00_, arg10_);
        })(tupledArg_8[2], st_12);

        (function (_x_3, _st_3) {
          p_dummy_range(_x_3, _st_3);
        })(tupledArg_8[3], st_12);
      })([expr.data[0], expr.data[1], expr.data[2].tag === 1 ? 1 : 0, expr.data[4]], st_6);

      break;

    case 3:
      p_byte(4, st_6);

      (function (x_2, st_13) {
        p_option(function (x_3, st_14) {
          p_Val(x_3, st_14);
        }, x_2, st_13);
      })(expr.data[1], st_6);

      (function (x_4, st_15) {
        p_option(function (x_5, st_16) {
          p_Val(x_5, st_16);
        }, x_4, st_15);
      })(expr.data[2], st_6);

      p_Vals(expr.data[3], st_6);
      p_expr(expr.data[4], st_6);

      (function (_x_4, _st_4) {
        p_dummy_range(_x_4, _st_4);
      })(expr.data[5], st_6);

      p_typ(expr.data[6], st_6);
      break;

    case 4:
      p_byte(5, st_6);

      (function (tupledArg_9, st_17) {
        p_typar_specs(tupledArg_9[0], st_17);
        p_expr(tupledArg_9[1], st_17);

        (function (_x_5, _st_5) {
          p_dummy_range(_x_5, _st_5);
        })(tupledArg_9[2], st_17);

        p_typ(tupledArg_9[3], st_17);
      })([expr.data[1], expr.data[2], expr.data[3], expr.data[4]], st_6);

      break;

    case 5:
      p_byte(6, st_6);
      p_expr(expr.data[0], st_6);
      p_typ(expr.data[1], st_6);
      p_typs(expr.data[2], st_6);
      p_Exprs(expr.data[3], st_6);

      (function (_x_6, _st_6) {
        p_dummy_range(_x_6, _st_6);
      })(expr.data[4], st_6);

      break;

    case 6:
      p_byte(7, st_6);

      (function (tupledArg_10, st_18) {
        p_binds(tupledArg_10[0], st_18);
        p_expr(tupledArg_10[1], st_18);

        (function (_x_7, _st_7) {
          p_dummy_range(_x_7, _st_7);
        })(tupledArg_10[2], st_18);
      })([expr.data[0], expr.data[1], expr.data[2]], st_6);

      break;

    case 7:
      p_byte(8, st_6);

      (function (tupledArg_11, st_20) {
        (function (arg00__1, st_19) {
          p_bind(arg00__1, st_19);
        })(tupledArg_11[0], st_20);

        p_expr(tupledArg_11[1], st_20);

        (function (_x_8, _st_8) {
          p_dummy_range(_x_8, _st_8);
        })(tupledArg_11[2], st_20);
      })([expr.data[0], expr.data[1], expr.data[2]], st_6);

      break;

    case 9:
      p_byte(9, st_6);

      (function (_x_9, _st_9) {
        p_dummy_range(_x_9, _st_9);
      })(expr.data[1], st_6);

      (function (x_6, st_21) {
        p_dtree(x_6, st_21);
      })(expr.data[2], st_6);

      p_targets(expr.data[3], st_6);

      (function (_x_10, _st_10) {
        p_dummy_range(_x_10, _st_10);
      })(expr.data[4], st_6);

      p_typ(expr.data[5], st_6);
      break;

    case 8:
      p_byte(10, st_6);
      p_typ(expr.data[1], st_6);

      (function (x_7, st_22) {
        p_option(function (x_8, st_23) {
          p_Val(x_8, st_23);
        }, x_7, st_22);
      })(expr.data[2], st_6);

      p_expr(expr.data[3], st_6);

      (function (x_9, st_24) {
        p_methods(x_9, st_24);
      })(expr.data[4], st_6);

      (function (x_10, st_25) {
        p_intfs(x_10, st_25);
      })(expr.data[5], st_6);

      (function (_x_11, _st_11) {
        p_dummy_range(_x_11, _st_11);
      })(expr.data[6], st_6);

      break;

    case 10:
      p_byte(11, st_6);

      (function (tupledArg_12, st_26) {
        p_constraints(tupledArg_12[0], st_26);
        p_expr(tupledArg_12[1], st_26);
        p_expr(tupledArg_12[2], st_26);

        (function (_x_12, _st_12) {
          p_dummy_range(_x_12, _st_12);
        })(tupledArg_12[3], st_26);
      })([expr.data[0], expr.data[1], expr.data[2], expr.data[3]], st_6);

      break;

    case 13:
      p_byte(12, st_6);

      (function (tupledArg_13, st_27) {
        p_typar_specs(tupledArg_13[0], st_27);
        p_expr(tupledArg_13[1], st_27);

        (function (_x_13, _st_13) {
          p_dummy_range(_x_13, _st_13);
        })(tupledArg_13[2], st_27);
      })([expr.data[0], expr.data[1], expr.data[2]], st_6);

      break;

    case 12:
      p_byte(13, st_6);

      (function (tupledArg_14, st_28) {
        p_expr(tupledArg_14[0], st_28);

        (function (_x_14, _st_14) {
          p_dummy_range(_x_14, _st_14);
        })(tupledArg_14[1], st_28);

        p_typ(tupledArg_14[2], st_28);
      })([expr.data[0], expr.data[3], expr.data[4]], st_6);

      break;

    default:
      p_expr(expr.data.contents, st_6);
  }
});
export const u_expr = CurriedLambda(function (st_6) {
  const tag_1 = u_byte(st_6) | 0;

  switch (tag_1) {
    case 0:
      const a = u_const(st_6);
      const b = u_dummy_range(st_6);
      const c = u_typ(st_6);
      return new Expr(0, [a, b, c]);

    case 1:
      const a_1 = u_vref(st_6);
      const b_1 = u_vrefFlags(st_6);
      const c_1 = u_dummy_range(st_6);
      return new Expr(1, [a_1, b_1, c_1]);

    case 2:
      const a_2 = u_op(st_6);
      const b_2 = u_typs(st_6);
      const c_2 = u_Exprs(st_6);
      const d_1 = u_dummy_range(st_6);
      return new Expr(11, [a_2, b_2, c_2, d_1]);

    case 3:
      const a_3 = u_expr(st_6);
      const b_3 = u_expr(st_6);
      const c_3 = u_int(st_6) | 0;
      const d_2 = u_dummy_range(st_6);
      return new Expr(2, [a_3, b_3, c_3 === 0 ? new SequentialOpKind(0) : c_3 === 1 ? new SequentialOpKind(1) : ufailwith(st_6, "specialSeqFlag"), new SequencePointInfoForSeq(1), d_2]);

    case 4:
      const a0 = u_option(function (st_7) {
        return u_Val(st_7);
      }, st_6);
      const b0 = u_option(function (st_8) {
        return u_Val(st_8);
      }, st_6);
      const b1 = u_Vals(st_6);
      const c_4 = u_expr(st_6);
      const d_3 = u_dummy_range(st_6);
      const e = u_typ(st_6);
      return new Expr(3, [newUnique(), a0, b0, b1, c_4, d_3, e]);

    case 5:
      const b_4 = u_typar_specs(st_6);
      const c_5 = u_expr(st_6);
      const d_4 = u_dummy_range(st_6);
      const e_1 = u_typ(st_6);
      return new Expr(4, [newUnique(), b_4, c_5, d_4, e_1]);

    case 6:
      const a1 = u_expr(st_6);
      const a2 = u_typ(st_6);
      const b_5 = u_typs(st_6);
      const c_6 = u_Exprs(st_6);
      const d_5 = u_dummy_range(st_6);
      return new Expr(5, [a1, a2, b_5, c_6, d_5]);

    case 7:
      const a_4 = u_binds(st_6);
      const b_6 = u_expr(st_6);
      const c_7 = u_dummy_range(st_6);
      return new Expr(6, [a_4, b_6, c_7, NewFreeVarsCache()]);

    case 8:
      const a_5 = u_bind(st_6);
      const b_7 = u_expr(st_6);
      const c_8 = u_dummy_range(st_6);
      return new Expr(7, [a_5, b_7, c_8, NewFreeVarsCache()]);

    case 9:
      const a_6 = u_dummy_range(st_6);
      const b_8 = u_dtree(st_6);
      const c_9 = u_targets(st_6);
      const d_6 = u_dummy_range(st_6);
      const e_2 = u_typ(st_6);
      return new Expr(9, [new SequencePointInfoForBinding(3), a_6, b_8, c_9, d_6, e_2]);

    case 10:
      const b_9 = u_typ(st_6);
      const c_10 = u_option(function (st_9) {
        return u_Val(st_9);
      }, st_6);
      const d_7 = u_expr(st_6);
      const e_3 = u_methods(st_6);
      const f = u_intfs(st_6);
      const g = u_dummy_range(st_6);
      return new Expr(8, [newUnique(), b_9, c_10, d_7, e_3, f, g]);

    case 11:
      const a_7 = u_constraints(st_6);
      const b_10 = u_expr(st_6);
      const c_11 = u_expr(st_6);
      const d_8 = u_dummy_range(st_6);
      return new Expr(10, [a_7, b_10, c_11, d_8]);

    case 12:
      const a_8 = u_typar_specs(st_6);
      const b_11 = u_expr(st_6);
      const c_12 = u_dummy_range(st_6);
      return new Expr(13, [a_8, b_11, c_12]);

    case 13:
      const b_12 = u_expr(st_6);
      const c_13 = u_dummy_range(st_6);
      const d_9 = u_typ(st_6);
      return new Expr(12, [b_12, {
        contents: null
      }, false, c_13, d_9]);

    default:
      return ufailwith(st_6, "u_expr");
  }
});
export function p_static_optimization_constraint(x, st_6) {
  if (x.tag === 1) {
    p_byte(1, st_6);
    p_typ(x.data, st_6);
  } else {
    p_byte(0, st_6);

    (function (tupledArg_5, st_7) {
      p_typ(tupledArg_5[0], st_7);
      p_typ(tupledArg_5[1], st_7);
    })([x.data[0], x.data[1]], st_6);
  }
}
export function p_slotparam(_arg8, st_6) {
  (function (x, st_7) {
    p_option(function (arg00_, arg10_) {
      p_string(arg00_, arg10_);
    }, x, st_7);
  })(_arg8.data[0], st_6);

  p_typ(_arg8.data[1], st_6);

  (function (arg00__1, arg10__1) {
    p_bool(arg00__1, arg10__1);
  })(_arg8.data[2], st_6);

  (function (arg00__2, arg10__2) {
    p_bool(arg00__2, arg10__2);
  })(_arg8.data[3], st_6);

  (function (arg00__3, arg10__3) {
    p_bool(arg00__3, arg10__3);
  })(_arg8.data[4], st_6);

  p_attribs(_arg8.data[5], st_6);
}
export function p_slotsig(_arg9, st_6) {
  var f;

  (function (arg00_, arg10_) {
    p_string(arg00_, arg10_);
  })(_arg9.data[0], st_6);

  p_typ(_arg9.data[1], st_6);
  p_typar_specs(_arg9.data[2], st_6);
  p_typar_specs(_arg9.data[3], st_6);
  (f = function (x, st_7) {
    p_list(function (arg00__1, st_8) {
      p_slotparam(arg00__1, st_8);
    }, x, st_7);
  }, function (x_1, st_9) {
    p_list(f, x_1, st_9);
  })(_arg9.data[4], st_6);

  (function (x_2, st_10) {
    p_option(p_typ, x_2, st_10);
  })(_arg9.data[5], st_6);
}
export function p_method(_arg10, st_6) {
  (function (arg00_, st_7) {
    p_slotsig(arg00_, st_7);
  })(_arg10.data[0], st_6);

  p_attribs(_arg10.data[1], st_6);
  p_typar_specs(_arg10.data[2], st_6);

  (function (x, st_8) {
    p_list(p_Vals, x, st_8);
  })(_arg10.data[3], st_6);

  p_expr(_arg10.data[4], st_6);

  (function (_x, _st) {
    p_dummy_range(_x, _st);
  })(_arg10.data[5], st_6);
}
export function p_methods(x, st_6) {
  p_list(function (arg00_, st_7) {
    p_method(arg00_, st_7);
  }, x, st_6);
}
export function p_intf(x_0, x_1, st_6) {
  const x = [x_0, x_1];

  (function (tupledArg_5, st_8) {
    p_typ(tupledArg_5[0], st_8);

    (function (x_2, st_7) {
      p_methods(x_2, st_7);
    })(tupledArg_5[1], st_8);
  })(x, st_6);
}
export function p_intfs(x, st_6) {
  p_list(function (tupledArg_5, st_7) {
    p_intf(tupledArg_5[0], tupledArg_5[1], st_7);
  }, x, st_6);
}
export function u_static_optimization_constraint(st_6) {
  const tag_1 = u_byte(st_6) | 0;

  if (tag_1 === 0) {
    return function (tupledArg_5) {
      return new StaticOptimization(0, [tupledArg_5[0], tupledArg_5[1]]);
    }(function (st_7) {
      const a = u_typ(st_7);
      const b = u_typ(st_7);
      return [a, b];
    }(st_6));
  } else if (tag_1 === 1) {
    return new StaticOptimization(1, u_typ(st_6));
  } else {
    return ufailwith(st_6, "u_static_optimization_constraint");
  }
}
export function u_slotparam(st_6) {
  let patternInput;

  const a = function (st_7) {
    return u_option(function (arg00_) {
      return u_string(arg00_);
    }, st_7);
  }(st_6);

  const b = u_typ(st_6);

  const c = function (arg00__1) {
    return u_bool(arg00__1);
  }(st_6);

  const d_1 = function (arg00__2) {
    return u_bool(arg00__2);
  }(st_6);

  const e = function (arg00__3) {
    return u_bool(arg00__3);
  }(st_6);

  const f = u_attribs(st_6);
  patternInput = [a, b, c, d_1, e, f];
  return new SlotParam(0, [patternInput[0], patternInput[1], patternInput[2], patternInput[3], patternInput[4], patternInput[5]]);
}
export function u_slotsig(st_6) {
  var f;
  let patternInput;

  const a = function (arg00_) {
    return u_string(arg00_);
  }(st_6);

  const b = u_typ(st_6);
  const c = u_typar_specs(st_6);
  const d_1 = u_typar_specs(st_6);
  const e = (f = function (st_7) {
    return u_list(function (st_8) {
      return u_slotparam(st_8);
    }, st_7);
  }, function (st_9) {
    return u_list(f, st_9);
  })(st_6);

  const f_1 = function (st_10) {
    return u_option(u_typ, st_10);
  }(st_6);

  patternInput = [a, b, c, d_1, e, f_1];
  return new SlotSig(0, [patternInput[0], patternInput[1], patternInput[2], patternInput[3], patternInput[4], patternInput[5]]);
}
export function u_method(st_6) {
  let patternInput;

  const a = function (st_7) {
    return u_slotsig(st_7);
  }(st_6);

  const b = u_attribs(st_6);
  const c = u_typar_specs(st_6);

  const d_1 = function (st_8) {
    return u_list(u_Vals, st_8);
  }(st_6);

  const e = u_expr(st_6);

  const f = function (_st) {
    return u_dummy_range(_st);
  }(st_6);

  patternInput = [a, b, c, d_1, e, f];
  return new ObjExprMethod(0, [patternInput[0], patternInput[1], patternInput[2], patternInput[3], patternInput[4], patternInput[5]]);
}
export function u_methods(st_6) {
  return u_list(function (st_7) {
    return u_method(st_7);
  }, st_6);
}
export function u_intf(st_6) {
  return function (st_8) {
    const a = u_typ(st_8);

    const b = function (st_7) {
      return u_methods(st_7);
    }(st_8);

    return [a, b];
  }(st_6);
}
export function u_intfs(st_6) {
  return u_list(function (st_7) {
    return u_intf(st_7);
  }, st_6);
}
fill_p_binds(function (x, st_6) {
  p_List(function (arg00_, st_7) {
    p_bind(arg00_, st_7);
  }, x, st_6);
});
fill_p_targets(p_array(function (arg00__1, st_8) {
  p_target(arg00__1, st_8);
}));
fill_p_constraints(function (x_1, st_9) {
  p_list(function (x_2, st_10) {
    p_static_optimization_constraint(x_2, st_10);
  }, x_1, st_9);
});
fill_p_Exprs(function (x_3, st_11) {
  p_list(p_expr, x_3, st_11);
});
fill_p_Expr_hole(p_expr);
fill_p_Exprs(function (x_4, st_12) {
  p_List(p_expr, x_4, st_12);
});
fill_p_attribs(function (x_5, st_13) {
  p_list(function (arg00__2, st_14) {
    p_attrib(arg00__2, st_14);
  }, x_5, st_13);
});
fill_p_Vals(function (x_6, st_15) {
  p_list(function (x_7, st_16) {
    p_Val(x_7, st_16);
  }, x_6, st_15);
});
fill_u_binds(function (st_17) {
  return u_List(function (st_18) {
    return u_bind(st_18);
  }, st_17);
});
fill_u_targets(u_array(function (st_19) {
  return u_target(st_19);
}));
fill_u_constraints(function (st_20) {
  return u_list(function (st_21) {
    return u_static_optimization_constraint(st_21);
  }, st_20);
});
fill_u_Exprs(function (st_22) {
  return u_list(u_expr, st_22);
});
fill_u_Expr_hole(u_expr);
fill_u_attribs(function (st_23) {
  return u_list(function (st_24) {
    return u_attrib(st_24);
  }, st_23);
});
fill_u_Vals(function (st_25) {
  return u_list(function (st_26) {
    return u_Val(st_26);
  }, st_25);
});
export function pickleModuleOrNamespace(mspec, st_27) {
  p_tycon_spec(mspec, st_27);
}
export const pickleCcuInfo = CurriedLambda(function (minfo, st_27) {
  (function (tupledArg_5, st_30) {
    (function (mspec, st_28) {
      pickleModuleOrNamespace(mspec, st_28);
    })(tupledArg_5[0], st_30);

    (function (arg00__3, arg10_) {
      p_string(arg00__3, arg10_);
    })(tupledArg_5[1], st_30);

    (function (arg00__4, arg10__1) {
      p_bool(arg00__4, arg10__1);
    })(tupledArg_5[2], st_30);

    (function (arg10__2, st_29) {
      p_space(3, null, st_29);
    })(null, st_30);
  })([minfo.mspec, minfo.compileTimeWorkingDir, minfo.usesQuotations, null], st_27);
});
export function unpickleModuleOrNamespace(st_27) {
  return u_tycon_spec(st_27);
}
export function unpickleCcuInfo(st_27) {
  const patternInput = function (st_30) {
    const a = function (st_28) {
      return unpickleModuleOrNamespace(st_28);
    }(st_30);

    const b = function (arg00__3) {
      return u_string(arg00__3);
    }(st_30);

    const c = function (arg00__4) {
      return u_bool(arg00__4);
    }(st_30);

    const d_1 = function (st_29) {
      u_space(3, st_29);
    }(st_30);

    return [a, b, c, null];
  }(st_27);

  return new PickledCcuInfo(patternInput[0], patternInput[1], patternInput[2]);
}