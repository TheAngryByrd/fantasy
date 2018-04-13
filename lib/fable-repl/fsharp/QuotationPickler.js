import { foldBack } from "../fable-core/Seq";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { hash, GenericParam, Tuple, makeGeneric, compareUnions, equals, compareRecords, equalsRecords } from "../fable-core/Util";
import { reverse, unzip, concat, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { fromValue, fromBits } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { HashMultiMap } from "../utils/HashMultiMap";
import { ByteBuffer } from "../absil/bytes";
import { Bits } from "./lib";
import { System } from "../fcs-fable/adapters";
import { getBytesDouble, toInt64, getBytesSingle, toInt32 } from "../fable-core/BitConverter";
import CurriedLambda from "../fable-core/CurriedLambda";
export function mkRLinear(mk, vs, body) {
  return foldBack(function (v, acc) {
    return mk([v, acc]);
  }, vs, body);
}
export class TypeVarData {
  constructor(tvName) {
    this.tvName = tvName;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.TypeVarData",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tvName: "string"
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
setType("Microsoft.FSharp.Compiler.QuotationPickler.TypeVarData", TypeVarData);
export class NamedTypeData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.NamedTypeData",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Idx", "number"], ["Named", "string", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.QuotationPickler.NamedTypeData", NamedTypeData);
export class TypeCombOp {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.TypeCombOp",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ArrayTyOp", "number"], ["FunTyOp"], ["NamedTyOp", NamedTypeData]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.QuotationPickler.TypeCombOp", TypeCombOp);
export class TypeData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.TypeData",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["VarType", "number"], ["AppType", TypeCombOp, makeGeneric(List, {
        T: TypeData
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
setType("Microsoft.FSharp.Compiler.QuotationPickler.TypeData", TypeData);
export function mkVarTy(v) {
  return new TypeData(0, v);
}
export function mkFunTy(tupledArg) {
  return new TypeData(1, [new TypeCombOp(1), ofArray([tupledArg[0], tupledArg[1]])]);
}
export function mkArrayTy(tupledArg) {
  return new TypeData(1, [new TypeCombOp(0, tupledArg[0]), ofArray([tupledArg[1]])]);
}
export function mkILNamedTy(tupledArg) {
  return new TypeData(1, [new TypeCombOp(2, tupledArg[0]), tupledArg[1]]);
}
export class CtorData {
  constructor(ctorParent, ctorArgTypes) {
    this.ctorParent = ctorParent;
    this.ctorArgTypes = ctorArgTypes;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.CtorData",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        ctorParent: NamedTypeData,
        ctorArgTypes: makeGeneric(List, {
          T: TypeData
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
setType("Microsoft.FSharp.Compiler.QuotationPickler.CtorData", CtorData);
export class MethodData {
  constructor(methParent, methName, methArgTypes, methRetType, numGenericArgs) {
    this.methParent = methParent;
    this.methName = methName;
    this.methArgTypes = methArgTypes;
    this.methRetType = methRetType;
    this.numGenericArgs = numGenericArgs | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.MethodData",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        methParent: NamedTypeData,
        methName: "string",
        methArgTypes: makeGeneric(List, {
          T: TypeData
        }),
        methRetType: TypeData,
        numGenericArgs: "number"
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
setType("Microsoft.FSharp.Compiler.QuotationPickler.MethodData", MethodData);
export class VarData {
  constructor(vText, vType, vMutable) {
    this.vText = vText;
    this.vType = vType;
    this.vMutable = vMutable;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.VarData",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        vText: "string",
        vType: TypeData,
        vMutable: "boolean"
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
setType("Microsoft.FSharp.Compiler.QuotationPickler.VarData", VarData);
export class CombOp {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.CombOp",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["AppOp"], ["CondOp"], ["ModuleValueOp", NamedTypeData, "string", "boolean"], ["LetRecOp"], ["LetRecCombOp"], ["LetOp"], ["RecdMkOp", NamedTypeData], ["RecdGetOp", NamedTypeData, "string"], ["RecdSetOp", NamedTypeData, "string"], ["SumMkOp", NamedTypeData, "string"], ["SumFieldGetOp", NamedTypeData, "string", "number"], ["SumTagTestOp", NamedTypeData, "string"], ["TupleMkOp"], ["TupleGetOp", "number"], ["UnitOp"], ["BoolOp", "boolean"], ["StringOp", "string"], ["SingleOp", "number"], ["DoubleOp", "number"], ["CharOp", "string"], ["SByteOp", "number"], ["ByteOp", "number"], ["Int16Op", "number"], ["UInt16Op", "number"], ["Int32Op", "number"], ["UInt32Op", "number"], ["Int64Op", Long], ["UInt64Op", Long], ["PropGetOp", Tuple([NamedTypeData, "string", TypeData, makeGeneric(List, {
        T: TypeData
      })])], ["FieldGetOp", NamedTypeData, "string"], ["CtorCallOp", CtorData], ["MethodCallOp", MethodData], ["CoerceOp"], ["NewArrayOp"], ["DelegateOp"], ["SeqOp"], ["ForLoopOp"], ["WhileLoopOp"], ["NullOp"], ["DefaultValueOp"], ["PropSetOp", Tuple([NamedTypeData, "string", TypeData, makeGeneric(List, {
        T: TypeData
      })])], ["FieldSetOp", NamedTypeData, "string"], ["AddressOfOp"], ["ExprSetOp"], ["AddressSetOp"], ["TypeTestOp"], ["TryFinallyOp"], ["TryWithOp"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.QuotationPickler.CombOp", CombOp);
export class ExprData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.ExprData",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["AttrExpr", ExprData, makeGeneric(List, {
        T: ExprData
      })], ["CombExpr", CombOp, makeGeneric(List, {
        T: TypeData
      }), makeGeneric(List, {
        T: ExprData
      })], ["VarExpr", "number"], ["QuoteExpr", ExprData], ["LambdaExpr", VarData, ExprData], ["HoleExpr", TypeData, "number"], ["ThisVarExpr", TypeData], ["QuoteRawExpr", ExprData]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.QuotationPickler.ExprData", ExprData);
export function mkVar(v) {
  return new ExprData(2, v);
}
export function mkHole(v, idx) {
  return new ExprData(5, [v, idx]);
}
export function mkApp(a, b) {
  return new ExprData(1, [new CombOp(0), new List(), ofArray([a, b])]);
}
export function mkLambda(a, b) {
  return new ExprData(4, [a, b]);
}
export function mkQuote(a) {
  return new ExprData(3, a);
}
export function mkQuoteRaw40(a) {
  return new ExprData(7, a);
}
export function mkCond(x1, x2, x3) {
  return new ExprData(1, [new CombOp(1), new List(), ofArray([x1, x2, x3])]);
}
export function mkModuleValueApp(tcref, nm, isProp, tyargs, args) {
  return new ExprData(1, [new CombOp(2, [tcref, nm, isProp]), tyargs, concat(args)]);
}
export function mkTuple(ty, x) {
  return new ExprData(1, [new CombOp(12), ofArray([ty]), x]);
}
export function mkLet(_arg1, b) {
  return new ExprData(1, [new CombOp(5), new List(), ofArray([_arg1[1], mkLambda(_arg1[0], b)])]);
}
export function mkUnit() {
  return new ExprData(1, [new CombOp(14), new List(), new List()]);
}
export function mkNull(ty) {
  return new ExprData(1, [new CombOp(38), ofArray([ty]), new List()]);
}
export function mkLetRecRaw(e1) {
  return new ExprData(1, [new CombOp(3), new List(), ofArray([e1])]);
}
export function mkLetRecCombRaw(args) {
  return new ExprData(1, [new CombOp(4), new List(), args]);
}
export function mkLetRec(ves, body) {
  const patternInput = unzip(ves);
  return mkLetRecRaw(mkRLinear(function (tupledArg) {
    return mkLambda(tupledArg[0], tupledArg[1]);
  }, patternInput[0], mkLetRecCombRaw(new List(body, patternInput[1]))));
}
export function mkRecdMk(n, tys, args) {
  return new ExprData(1, [new CombOp(6, n), tys, args]);
}
export function mkRecdGet(_arg1, tyargs, args) {
  return new ExprData(1, [new CombOp(7, [_arg1[0], _arg1[1]]), tyargs, args]);
}
export function mkRecdSet(_arg1, tyargs, args) {
  return new ExprData(1, [new CombOp(8, [_arg1[0], _arg1[1]]), tyargs, args]);
}
export function mkUnion(_arg1, tyargs, args) {
  return new ExprData(1, [new CombOp(9, [_arg1[0], _arg1[1]]), tyargs, args]);
}
export function mkUnionFieldGet(_arg1, tyargs, arg) {
  return new ExprData(1, [new CombOp(10, [_arg1[0], _arg1[1], _arg1[2]]), tyargs, ofArray([arg])]);
}
export function mkUnionCaseTagTest(_arg1, tyargs, arg) {
  return new ExprData(1, [new CombOp(11, [_arg1[0], _arg1[1]]), tyargs, ofArray([arg])]);
}
export function mkTupleGet(ty, n, e) {
  return new ExprData(1, [new CombOp(13, n), ofArray([ty]), ofArray([e])]);
}
export function mkCoerce(ty, arg) {
  return new ExprData(1, [new CombOp(32), ofArray([ty]), ofArray([arg])]);
}
export function mkTypeTest(ty, arg) {
  return new ExprData(1, [new CombOp(45), ofArray([ty]), ofArray([arg])]);
}
export function mkAddressOf(arg) {
  return new ExprData(1, [new CombOp(42), new List(), ofArray([arg])]);
}
export function mkAddressSet(arg1, arg2) {
  return new ExprData(1, [new CombOp(44), new List(), ofArray([arg1, arg2])]);
}
export function mkVarSet(arg1, arg2) {
  return new ExprData(1, [new CombOp(43), new List(), ofArray([arg1, arg2])]);
}
export function mkDefaultValue(ty) {
  return new ExprData(1, [new CombOp(39), ofArray([ty]), new List()]);
}
export function mkThisVar(ty) {
  return new ExprData(6, ty);
}
export function mkNewArray(ty, args) {
  return new ExprData(1, [new CombOp(33), ofArray([ty]), args]);
}
export function mkBool(v, ty) {
  return new ExprData(1, [new CombOp(15, v), ofArray([ty]), new List()]);
}
export function mkString(v, ty) {
  return new ExprData(1, [new CombOp(16, v), ofArray([ty]), new List()]);
}
export function mkSingle(v, ty) {
  return new ExprData(1, [new CombOp(17, v), ofArray([ty]), new List()]);
}
export function mkDouble(v, ty) {
  return new ExprData(1, [new CombOp(18, v), ofArray([ty]), new List()]);
}
export function mkChar(v, ty) {
  return new ExprData(1, [new CombOp(19, v), ofArray([ty]), new List()]);
}
export function mkSByte(v, ty) {
  return new ExprData(1, [new CombOp(20, v), ofArray([ty]), new List()]);
}
export function mkByte(v, ty) {
  return new ExprData(1, [new CombOp(21, v), ofArray([ty]), new List()]);
}
export function mkInt16(v, ty) {
  return new ExprData(1, [new CombOp(22, v), ofArray([ty]), new List()]);
}
export function mkUInt16(v, ty) {
  return new ExprData(1, [new CombOp(23, v), ofArray([ty]), new List()]);
}
export function mkInt32(v, ty) {
  return new ExprData(1, [new CombOp(24, v), ofArray([ty]), new List()]);
}
export function mkUInt32(v, ty) {
  return new ExprData(1, [new CombOp(25, v), ofArray([ty]), new List()]);
}
export function mkInt64(v, ty) {
  return new ExprData(1, [new CombOp(26, v), ofArray([ty]), new List()]);
}
export function mkUInt64(v, ty) {
  return new ExprData(1, [new CombOp(27, v), ofArray([ty]), new List()]);
}
export function mkSequential(e1, e2) {
  return new ExprData(1, [new CombOp(35), new List(), ofArray([e1, e2])]);
}
export function mkForLoop(x1, x2, x3) {
  return new ExprData(1, [new CombOp(36), new List(), ofArray([x1, x2, x3])]);
}
export function mkWhileLoop(e1, e2) {
  return new ExprData(1, [new CombOp(37), new List(), ofArray([e1, e2])]);
}
export function mkTryFinally(e1, e2) {
  return new ExprData(1, [new CombOp(46), new List(), ofArray([e1, e2])]);
}
export function mkTryWith(e1, vf, ef, vh, eh) {
  return new ExprData(1, [new CombOp(47), new List(), ofArray([e1, mkLambda(vf, ef), mkLambda(vh, eh)])]);
}
export function mkDelegate(ty, e) {
  return new ExprData(1, [new CombOp(34), ofArray([ty]), ofArray([e])]);
}
export function mkPropGet(d, tyargs, args) {
  return new ExprData(1, [new CombOp(28, d), tyargs, args]);
}
export function mkPropSet(d, tyargs, args) {
  return new ExprData(1, [new CombOp(40, d), tyargs, args]);
}
export function mkFieldGet(_arg1, tyargs, args) {
  return new ExprData(1, [new CombOp(29, [_arg1[0], _arg1[1]]), tyargs, args]);
}
export function mkFieldSet(_arg1, tyargs, args) {
  return new ExprData(1, [new CombOp(41, [_arg1[0], _arg1[1]]), tyargs, args]);
}
export function mkCtorCall(d, tyargs, args) {
  return new ExprData(1, [new CombOp(30, d), tyargs, args]);
}
export function mkMethodCall(d, tyargs, args) {
  return new ExprData(1, [new CombOp(31, d), tyargs, args]);
}
export function mkAttributedExpression(e, attr) {
  return new ExprData(0, [e, ofArray([attr])]);
}
export function isAttributedExpression(e) {
  if (e.tag === 0) {
    return true;
  } else {
    return false;
  }
}
export const SerializedReflectedDefinitionsResourceNameBase = "ReflectedDefinitions";
export function freshVar(n, ty, mut) {
  return new VarData(n, ty, mut);
}
export const SimplePickle = function (__exports) {
  const Table = __exports.Table = class Table {
    constructor(tbl, rows, count) {
      this.tbl = tbl;
      this.rows = rows;
      this.count = count | 0;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.QuotationPickler.SimplePickle.Table",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          tbl: makeGeneric(HashMultiMap, {
            Key: GenericParam("T"),
            Value: "number"
          }),
          rows: makeGeneric(List, {
            T: GenericParam("T")
          }),
          count: "number"
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

    static Create() {
      return new Table(HashMultiMap[".ctor"](20, {
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

      }), new List(), 0);
    }

    get AsList() {
      return reverse(this.rows);
    }

    get Count() {
      return this.rows.length;
    }

    Add(x) {
      const n = this.count | 0;
      this.count = this.count + 1 | 0;
      this.tbl.Add_0(x, n);
      this.rows = new List(x, this.rows);
      return n | 0;
    }

    FindOrAdd(x) {
      if (this.tbl.ContainsKey(x)) {
        return this.tbl.get_Item(x) | 0;
      } else {
        return this.Add(x) | 0;
      }
    }

    Find(x) {
      return this.tbl.get_Item(x) | 0;
    }

    ContainsKey(x) {
      return this.tbl.ContainsKey(x);
    }

  };
  setType("Microsoft.FSharp.Compiler.QuotationPickler.SimplePickle.Table", Table);
  const QuotationPickleOutState = __exports.QuotationPickleOutState = class QuotationPickleOutState {
    constructor(os, ostrings) {
      this.os = os;
      this.ostrings = ostrings;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.QuotationPickler.SimplePickle.QuotationPickleOutState",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          os: ByteBuffer,
          ostrings: makeGeneric(Table, {
            T: "string"
          })
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

  };
  setType("Microsoft.FSharp.Compiler.QuotationPickler.SimplePickle.QuotationPickleOutState", QuotationPickleOutState);

  const p_byte = __exports.p_byte = function (b, st) {
    st.os.EmitIntAsByte(b);
  };

  const p_bool = __exports.p_bool = function (b, st) {
    p_byte(b ? 1 : 0, st);
  };

  const p_void = __exports.p_void = function (_os) {};

  const p_unit = __exports.p_unit = function (unitVar0, _os) {};

  const prim_pint32 = __exports.prim_pint32 = function (i, st) {
    p_byte(Bits.b0(i), st);
    p_byte(Bits.b1(i), st);
    p_byte(Bits.b2(i), st);
    p_byte(Bits.b3(i), st);
  };

  const p_int32 = __exports.p_int32 = function (n, st) {
    if (n >= 0 ? n <= 127 : false) {
      p_byte(Bits.b0(n), st);
    } else if (n >= 128 ? n <= 16383 : false) {
      p_byte(128 | n >> 8, st);
      p_byte(n & 255, st);
    } else {
      p_byte(255, st);
      prim_pint32(n, st);
    }
  };

  const p_bytes = __exports.p_bytes = function (s, st) {
    const len = s.length | 0;
    p_int32(len, st);
    st.os.EmitBytes(s);
  };

  const prim_pstring = __exports.prim_pstring = function (s, st) {
    const bytes = System.Text.Encoding.UTF8.GetBytes(s);
    const len = bytes.length | 0;
    p_int32(len, st);
    st.os.EmitBytes(bytes);
  };

  const p_int = __exports.p_int = function (c, st) {
    p_int32(c, st);
  };

  const p_int8 = __exports.p_int8 = function (i, st) {
    p_int32(i, st);
  };

  const p_uint8 = __exports.p_uint8 = function (i, st) {
    p_byte(~~i, st);
  };

  const p_int16 = __exports.p_int16 = function (i, st) {
    p_int32(i, st);
  };

  const p_uint16 = __exports.p_uint16 = function (x, st) {
    p_int32(~~x, st);
  };

  const puint32 = __exports.puint32 = function (x, st) {
    p_int32(~~x, st);
  };

  const p_int64 = __exports.p_int64 = function (i, st) {
    p_int32(~~i.and(fromBits(4294967295, 0, false)).toNumber(), st);
    p_int32(~~i.shr(32).toNumber(), st);
  };

  const bits_of_float32 = __exports.bits_of_float32 = function (x) {
    return toInt32(getBytesSingle(x), 0) | 0;
  };

  const bits_of_float = __exports.bits_of_float = function (x) {
    return toInt64(getBytesDouble(x), 0);
  };

  const p_uint64 = __exports.p_uint64 = function (x, st) {
    p_int64(fromValue(x), st);
  };

  const p_double = __exports.p_double = function (i, st) {
    p_int64(bits_of_float(i), st);
  };

  const p_single = __exports.p_single = function (i, st) {
    p_int32(bits_of_float32(i), st);
  };

  const p_char = __exports.p_char = function (i, st) {
    p_uint16(i.charCodeAt(0) & 0xFFFF, st);
  };

  const puniq = __exports.puniq = function (tbl, key, st) {
    p_int(tbl.FindOrAdd(key), st);
  };

  const p_string = __exports.p_string = function (s, st) {
    puniq(st.ostrings, s, st);
  };

  const p_list = __exports.p_list = function (f, x, st) {
    if (x.tail != null) {
      p_byte(1, st);
      f(x.head, st);
      p_list(f, x.tail, st);
    } else {
      p_byte(0, st);
    }
  };

  const pickle_obj = __exports.pickle_obj = function (p, x) {
    let patternInput;
    const st1 = new QuotationPickleOutState(ByteBuffer.Create(100000), Table.Create());
    p(x, st1);
    patternInput = [st1.ostrings.AsList, st1.os.Close()];
    const phase2data = [patternInput[0], patternInput[1]];
    let phase2bytes;
    const st2 = new QuotationPickleOutState(ByteBuffer.Create(100000), Table.Create());

    const p1 = function (x_1, st) {
      p_list(function (s, st_1) {
        prim_pstring(s, st_1);
      }, x_1, st);
    };

    p1(phase2data[0], st2);

    (function (s_1, st_2) {
      p_bytes(s_1, st_2);
    })(phase2data[1], st2);

    phase2bytes = st2.os.Close();
    return phase2bytes;
  };

  return __exports;
}({});
export function p_assref(x, st) {
  SimplePickle.p_string(x, st);
}
export function p_NamedType(x, st) {
  if (x.tag === 1) {
    (function (s, st_1) {
      SimplePickle.p_string(s, st_1);
    })(x.data[0], st);

    (function (x_1, st_2) {
      p_assref(x_1, st_2);
    })(x.data[1], st);
  } else {
    (function (s_1, st_3) {
      SimplePickle.p_string(s_1, st_3);
    })(x.data.toString(), st);

    (function (x_2, st_4) {
      p_assref(x_2, st_4);
    })("", st);
  }
}
export function p_tycon(x, st) {
  if (x.tag === 2) {
    SimplePickle.p_byte(2, st);
    p_NamedType(x.data, st);
  } else if (x.tag === 0) {
    SimplePickle.p_byte(3, st);
    SimplePickle.p_int(x.data, st);
  } else {
    SimplePickle.p_byte(1, st);
  }
}
export function p_type(x, st) {
  if (x.tag === 1) {
    SimplePickle.p_byte(1, st);

    (function (x_1, st_1) {
      p_tycon(x_1, st_1);
    })(x.data[0], st);

    (function (x_2, st_2) {
      p_types(x_2, st_2);
    })(x.data[1], st);
  } else {
    SimplePickle.p_byte(0, st);
    SimplePickle.p_int(x.data, st);
  }
}
export function p_types(x, st) {
  SimplePickle.p_list(function (x_1, st_1) {
    p_type(x_1, st_1);
  }, x, st);
}
export function p_varDecl(v, st) {
  (function (s, st_1) {
    SimplePickle.p_string(s, st_1);
  })(v.vText, st);

  (function (x, st_2) {
    p_type(x, st_2);
  })(v.vType, st);

  (function (b, st_3) {
    SimplePickle.p_bool(b, st_3);
  })(v.vMutable, st);
}
export function p_recdFieldSpec(v_0, v_1, st) {
  const v = [v_0, v_1];

  (function (x, st_1) {
    p_NamedType(x, st_1);
  })(v[0], st);

  (function (s, st_2) {
    SimplePickle.p_string(s, st_2);
  })(v[1], st);
}
export function p_ucaseSpec(v_0, v_1, st) {
  const v = [v_0, v_1];

  (function (x, st_1) {
    p_NamedType(x, st_1);
  })(v[0], st);

  (function (s, st_2) {
    SimplePickle.p_string(s, st_2);
  })(v[1], st);
}
export function p_MethodData(a, st) {
  (function (x, st_1) {
    p_NamedType(x, st_1);
  })(a.methParent, st);

  (function (x_1, st_2) {
    p_types(x_1, st_2);
  })(a.methArgTypes, st);

  (function (x_2, st_3) {
    p_type(x_2, st_3);
  })(a.methRetType, st);

  (function (s, st_4) {
    SimplePickle.p_string(s, st_4);
  })(a.methName, st);

  (function (c, st_5) {
    SimplePickle.p_int(c, st_5);
  })(a.numGenericArgs, st);
}
export function p_CtorData(a, st) {
  (function (x, st_1) {
    p_NamedType(x, st_1);
  })(a.ctorParent, st);

  (function (x_1, st_2) {
    p_types(x_1, st_2);
  })(a.ctorArgTypes, st);
}
export function p_PropInfoData(a_0, a_1, a_2, a_3, st) {
  const a = [a_0, a_1, a_2, a_3];

  (function (x, st_1) {
    p_NamedType(x, st_1);
  })(a[0], st);

  (function (s, st_2) {
    SimplePickle.p_string(s, st_2);
  })(a[1], st);

  (function (x_1, st_3) {
    p_type(x_1, st_3);
  })(a[2], st);

  (function (x_2, st_4) {
    p_types(x_2, st_4);
  })(a[3], st);
}
export function p_CombOp(x, st) {
  switch (x.tag) {
    case 2:
      SimplePickle.p_byte(1, st);

      (function (x_1, st_1) {
        p_NamedType(x_1, st_1);
      })(x.data[0], st);

      (function (s, st_2) {
        SimplePickle.p_string(s, st_2);
      })(x.data[1], st);

      (function (b, st_3) {
        SimplePickle.p_bool(b, st_3);
      })(x.data[2], st);

      break;

    case 3:
      SimplePickle.p_byte(2, st);
      break;

    case 6:
      SimplePickle.p_byte(3, st);
      p_NamedType(x.data, st);
      break;

    case 7:
      SimplePickle.p_byte(4, st);
      p_recdFieldSpec(x.data[0], x.data[1], st);
      break;

    case 9:
      SimplePickle.p_byte(5, st);
      p_ucaseSpec(x.data[0], x.data[1], st);
      break;

    case 10:
      SimplePickle.p_byte(6, st);

      (function (tupledArg, st_4) {
        p_ucaseSpec(tupledArg[0], tupledArg[1], st_4);
      })([x.data[0], x.data[1]], st);

      (function (c, st_5) {
        SimplePickle.p_int(c, st_5);
      })(x.data[2], st);

      break;

    case 11:
      SimplePickle.p_byte(7, st);
      p_ucaseSpec(x.data[0], x.data[1], st);
      break;

    case 12:
      SimplePickle.p_byte(8, st);
      break;

    case 13:
      SimplePickle.p_byte(9, st);
      SimplePickle.p_int(x.data, st);
      break;

    case 15:
      SimplePickle.p_byte(11, st);
      SimplePickle.p_bool(x.data, st);
      break;

    case 16:
      SimplePickle.p_byte(12, st);
      SimplePickle.p_string(x.data, st);
      break;

    case 17:
      SimplePickle.p_byte(13, st);
      SimplePickle.p_single(x.data, st);
      break;

    case 18:
      SimplePickle.p_byte(14, st);
      SimplePickle.p_double(x.data, st);
      break;

    case 19:
      SimplePickle.p_byte(15, st);
      SimplePickle.p_char(x.data, st);
      break;

    case 20:
      SimplePickle.p_byte(16, st);
      SimplePickle.p_int8(x.data, st);
      break;

    case 21:
      SimplePickle.p_byte(17, st);
      SimplePickle.p_uint8(x.data, st);
      break;

    case 22:
      SimplePickle.p_byte(18, st);
      SimplePickle.p_int16(x.data, st);
      break;

    case 23:
      SimplePickle.p_byte(19, st);
      SimplePickle.p_uint16(x.data, st);
      break;

    case 24:
      SimplePickle.p_byte(20, st);
      SimplePickle.p_int32(x.data, st);
      break;

    case 25:
      SimplePickle.p_byte(21, st);
      SimplePickle.puint32(x.data, st);
      break;

    case 26:
      SimplePickle.p_byte(22, st);
      SimplePickle.p_int64(x.data, st);
      break;

    case 27:
      SimplePickle.p_byte(23, st);
      SimplePickle.p_uint64(x.data, st);
      break;

    case 14:
      SimplePickle.p_byte(24, st);
      break;

    case 28:
      SimplePickle.p_byte(25, st);
      p_PropInfoData(x.data[0], x.data[1], x.data[2], x.data[3], st);
      break;

    case 30:
      SimplePickle.p_byte(26, st);
      p_CtorData(x.data, st);
      break;

    case 32:
      SimplePickle.p_byte(28, st);
      break;

    case 35:
      SimplePickle.p_byte(29, st);
      break;

    case 36:
      SimplePickle.p_byte(30, st);
      break;

    case 31:
      SimplePickle.p_byte(31, st);
      p_MethodData(x.data, st);
      break;

    case 33:
      SimplePickle.p_byte(32, st);
      break;

    case 34:
      SimplePickle.p_byte(33, st);
      break;

    case 37:
      SimplePickle.p_byte(34, st);
      break;

    case 5:
      SimplePickle.p_byte(35, st);
      break;

    case 8:
      SimplePickle.p_byte(36, st);
      p_recdFieldSpec(x.data[0], x.data[1], st);
      break;

    case 29:
      SimplePickle.p_byte(37, st);

      (function (x_2, st_6) {
        p_NamedType(x_2, st_6);
      })(x.data[0], st);

      (function (s_1, st_7) {
        SimplePickle.p_string(s_1, st_7);
      })(x.data[1], st);

      break;

    case 4:
      SimplePickle.p_byte(38, st);
      break;

    case 0:
      SimplePickle.p_byte(39, st);
      break;

    case 38:
      SimplePickle.p_byte(40, st);
      break;

    case 39:
      SimplePickle.p_byte(41, st);
      break;

    case 40:
      SimplePickle.p_byte(42, st);
      p_PropInfoData(x.data[0], x.data[1], x.data[2], x.data[3], st);
      break;

    case 41:
      SimplePickle.p_byte(43, st);

      (function (x_3, st_8) {
        p_NamedType(x_3, st_8);
      })(x.data[0], st);

      (function (s_2, st_9) {
        SimplePickle.p_string(s_2, st_9);
      })(x.data[1], st);

      break;

    case 42:
      SimplePickle.p_byte(44, st);
      break;

    case 44:
      SimplePickle.p_byte(45, st);
      break;

    case 45:
      SimplePickle.p_byte(46, st);
      break;

    case 46:
      SimplePickle.p_byte(47, st);
      break;

    case 47:
      SimplePickle.p_byte(48, st);
      break;

    case 43:
      SimplePickle.p_byte(49, st);
      break;

    default:
      SimplePickle.p_byte(0, st);
  }
}
export function p_expr(x, st) {
  var f;
  var f_1;

  switch (x.tag) {
    case 2:
      SimplePickle.p_byte(1, st);
      SimplePickle.p_int(x.data, st);
      break;

    case 4:
      SimplePickle.p_byte(2, st);

      (function (v, st_1) {
        p_varDecl(v, st_1);
      })(x.data[0], st);

      (function (x_1, st_2) {
        p_expr(x_1, st_2);
      })(x.data[1], st);

      break;

    case 5:
      SimplePickle.p_byte(3, st);
      p_type(x.data[0], st);
      SimplePickle.p_int(x.data[1], st);
      break;

    case 3:
      SimplePickle.p_byte(4, st);
      p_expr(x.data, st);
      break;

    case 0:
      SimplePickle.p_byte(5, st);

      (function (x_2, st_3) {
        p_expr(x_2, st_3);
      })(x.data[0], st);

      (f = function (x_3, st_4) {
        p_expr(x_3, st_4);
      }, function (x_4, st_5) {
        SimplePickle.p_list(f, x_4, st_5);
      })(x.data[1], st);
      break;

    case 6:
      SimplePickle.p_byte(6, st);
      p_type(x.data, st);
      break;

    case 7:
      SimplePickle.p_byte(7, st);
      p_expr(x.data, st);
      break;

    default:
      SimplePickle.p_byte(0, st);

      (function (x_5, st_6) {
        p_CombOp(x_5, st_6);
      })(x.data[0], st);

      (function (x_6, st_7) {
        p_types(x_6, st_7);
      })(x.data[1], st);

      (f_1 = function (x_7, st_8) {
        p_expr(x_7, st_8);
      }, function (x_8, st_9) {
        SimplePickle.p_list(f_1, x_8, st_9);
      })(x.data[2], st);
  }
}
export class ModuleDefnData {
  constructor(module, name, isProperty) {
    this.Module = module;
    this.Name = name;
    this.IsProperty = isProperty;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.ModuleDefnData",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Module: NamedTypeData,
        Name: "string",
        IsProperty: "boolean"
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
setType("Microsoft.FSharp.Compiler.QuotationPickler.ModuleDefnData", ModuleDefnData);
export class MethodBaseData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.QuotationPickler.MethodBaseData",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ModuleDefn", ModuleDefnData], ["Method", MethodData], ["Ctor", CtorData]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.QuotationPickler.MethodBaseData", MethodBaseData);
export const pickle = CurriedLambda(function (x) {
  return SimplePickle.pickle_obj(function (x_1, st) {
    p_expr(x_1, st);
  }, x);
});
export function p_MethodBase(x, st) {
  if (x.tag === 1) {
    SimplePickle.p_byte(1, st);
    p_MethodData(x.data, st);
  } else if (x.tag === 2) {
    SimplePickle.p_byte(2, st);
    p_CtorData(x.data, st);
  } else {
    SimplePickle.p_byte(0, st);
    p_NamedType(x.data.Module, st);
    SimplePickle.p_string(x.data.Name, st);
    SimplePickle.p_bool(x.data.IsProperty, st);
  }
}
export const PickleDefns = CurriedLambda((() => {
  let p;

  const f = function (tupledArg, st) {
    (function (x, st_1) {
      p_MethodBase(x, st_1);
    })(tupledArg[0], st);

    (function (x_1, st_2) {
      p_expr(x_1, st_2);
    })(tupledArg[1], st);
  };

  p = function (x_2, st_3) {
    SimplePickle.p_list(f, x_2, st_3);
  };

  return function (x_3) {
    return SimplePickle.pickle_obj(p, x_3);
  };
})());