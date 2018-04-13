import { dprintn } from "./ildiag";
import { System, Microsoft } from "../fcs-fable/adapters";
import { createFromValue } from "../fable-core/Lazy";
import Lazy from "../fable-core/Lazy";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Unit, applyOperator, Any, Function as _Function, toString, compare, Tuple, Option, compareUnions, compareRecords, equalsRecords, Array as _Array, equals, hash as hash_1, GenericParam, makeGeneric, comparePrimitives } from "../fable-core/Util";
import { reverse, partition, concat as concat_1, mapIndexed, map as map_1, append, replicate as replicate_1, filter, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { defaultArg, makeSome, getValue } from "../fable-core/Option";
import { trim, split, toFail, toText, printf, replace, compare as compare_1, join } from "../fable-core/String";
import { op_GreaterGreaterGreaterAmp, Lazy as Lazy_1, Map as _Map, List as List_1, InlineDelayInit, UniqueStampGenerator, String as _String } from "./illib";
import { add as add_1, foldBack, create } from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import Comparer from "../fable-core/Comparer";
import { fold, zip, foldBack as foldBack_1, empty, collect, concat, item, range, singleton, append as append_1, last as last_1, map as map_2, delay, getEnumerator, toIterator, toList, replicate, iterate } from "../fable-core/Seq";
import { unixEpochMillisecondsToTicks, fromBits, fromValue, fromNumber } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { map } from "../fable-core/Array";
import CurriedLambda from "../fable-core/CurriedLambda";
import { Bytes } from "./bytes";
import { toList as toList_1 } from "../utils/ResizeArray";
import { doubleToInt64Bits, getBytesSingle, toInt32, int64BitsToDouble, getBytesInt32, toSingle } from "../fable-core/BitConverter";
import { parse } from "../fable-core/Int32";
import { create as create_1, addInPlace } from "../fable-core/Set";
import { totalSeconds, days, create as create_2 } from "../fable-core/TimeSpan";
import { timeOfDay, create as create_3, offset as offset_1, utcNow } from "../fable-core/Date";
export const logging = false;
export const runningOnMono = false;

if (logging) {
  dprintn("* warning: Il.logging is on");
}

export const int_order = Microsoft.FSharp.Core.LanguagePrimitives.FastGenericComparer();
export function notlazy(v) {
  return createFromValue(v);
}
export function lazyMap(f, x) {
  if (x.isValueCreated) {
    return notlazy(f(x.value));
  } else {
    return new Lazy(function () {
      return f(x.value);
    });
  }
}
export class PrimaryAssembly {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.PrimaryAssembly",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Mscorlib"], ["System_Runtime"], ["NetStandard"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

  get Name() {
    return this.tag === 1 ? "System.Runtime" : this.tag === 2 ? "netstandard" : "mscorlib";
  }

  static IsSomePrimaryAssembly(n) {
    if (n === new PrimaryAssembly(0).Name ? true : n === new PrimaryAssembly(1).Name) {
      return true;
    } else {
      return n === new PrimaryAssembly(2).Name;
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.PrimaryAssembly", PrimaryAssembly);
export function splitNameAt(nm, idx) {
  if (idx < 0) {
    throw new Error("splitNameAt: idx < 0");
  }

  const last = nm.length - 1 | 0;

  if (idx > last) {
    throw new Error("splitNameAt: idx > last");
  }

  return [nm.substr(0, idx), idx < last ? nm.substr(idx + 1, last - idx) : ""];
}
export function splitNamespaceAux(nm) {
  const matchValue = nm.indexOf(".") | 0;

  if (matchValue === -1) {
    return ofArray([nm]);
  } else {
    const patternInput = splitNameAt(nm, matchValue);
    return new List(patternInput[0], splitNamespaceAux(patternInput[1]));
  }
}
export const memoizeNamespaceTable = System.Collections.Concurrent.ConcurrentDictionary[".ctor_0"]();
export const memoizeNamespaceRightTable = System.Collections.Concurrent.ConcurrentDictionary[".ctor_0"]();
export function splitNamespace(nm) {
  return memoizeNamespaceTable.GetOrAdd(nm, function (nm_1) {
    return splitNamespaceAux(nm_1);
  });
}
export function splitNamespaceMemoized(nm) {
  return splitNamespace(nm);
}
export const memoizeNamespaceArrayTable = System.Collections.Concurrent.ConcurrentDictionary[".ctor_0"]();
export function splitNamespaceToArray(nm) {
  return memoizeNamespaceArrayTable.GetOrAdd(nm, function (nm_1) {
    const x = Array.from(splitNamespace(nm_1));
    return x;
  });
}
export function splitILTypeName(nm) {
  const matchValue = nm.lastIndexOf(".") | 0;

  if (matchValue === -1) {
    return [new List(), nm];
  } else {
    const patternInput = splitNameAt(nm, matchValue);
    return [splitNamespace(patternInput[0]), patternInput[1]];
  }
}
export const emptyStringArray = [];
export function splitILTypeNameWithPossibleStaticArguments(nm) {
  let patternInput_1;
  const matchValue = nm.indexOf(",") | 0;

  if (matchValue === -1) {
    patternInput_1 = [nm, null];
  } else {
    const patternInput = splitNameAt(nm, matchValue);
    patternInput_1 = [patternInput[0], patternInput[1]];
  }

  let patternInput_3;
  const matchValue_1 = patternInput_1[0].lastIndexOf(".") | 0;

  if (matchValue_1 === -1) {
    patternInput_3 = [emptyStringArray, patternInput_1[0]];
  } else {
    const patternInput_2 = splitNameAt(patternInput_1[0], matchValue_1);
    patternInput_3 = [splitNamespaceToArray(patternInput_2[0]), patternInput_2[1]];
  }

  return [patternInput_3[0], patternInput_1[1] != null ? patternInput_3[1] + "," + getValue(patternInput_1[1]) : patternInput_3[1]];
}
export function unsplitTypeName(ns, n) {
  if (ns.tail == null) {
    return join(".", ns) + "." + n;
  } else {
    return n;
  }
}
export function splitTypeNameRightAux(nm) {
  if (_String.contains(nm, ".")) {
    const idx = _String.rindex(nm, ".") | 0;
    const patternInput = splitNameAt(nm, idx);
    return [patternInput[0], patternInput[1]];
  } else {
    return [null, nm];
  }
}
export function splitTypeNameRight(nm) {
  return memoizeNamespaceRightTable.GetOrAdd(nm, function (nm_1) {
    return splitTypeNameRightAux(nm_1);
  });
}
export class LazyOrderedMultiMap {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.LazyOrderedMultiMap",
      properties: {
        Item: makeGeneric(List, {
          T: GenericParam("Data")
        })
      }
    };
  }

  constructor(keyf, lazyItems) {
    this.keyf = keyf;
    this.lazyItems = lazyItems;
    this.quickMap = lazyMap(entries => {
      var $var1;
      const t = create(null, fromEqualityComparer(($var1 = this, {
        GetHashCode(x) {
          return (obj => hash_1(obj))(x) | 0;
        },

        Equals(x, y) {
          return ((e1, e2) => equals(e1, e2))(x, y);
        },

        [_Symbol.reflection]() {
          return {
            interfaces: ["System.Collections.Generic.IEqualityComparer"]
          };
        }

      })));
      iterate(y => {
        const key = this.keyf(y);
        t.set(key, new List(y, t.has(key) ? t.get(key) : new List()));
      }, entries);
      return t;
    }, this.lazyItems);
  }

  Entries() {
    return this.lazyItems.value;
  }

  Add(y) {
    return new LazyOrderedMultiMap(this.keyf, lazyMap(x => new List(y, x), this.lazyItems));
  }

  Filter(f) {
    return new LazyOrderedMultiMap(this.keyf, lazyMap(list => filter(f, list), this.lazyItems));
  }

  get_Item(x) {
    const t = this.quickMap.value;

    if (t.has(x)) {
      return t.get(x);
    } else {
      return new List();
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.LazyOrderedMultiMap", LazyOrderedMultiMap);
export function b0(n) {
  return n & 255 | 0;
}
export function b1(n) {
  return n >> 8 & 255 | 0;
}
export function b2(n) {
  return n >> 16 & 255 | 0;
}
export function b3(n) {
  return n >> 24 & 255 | 0;
}
export const SHA1 = function (__exports) {
  const f = __exports.f = function (t, b, c, d) {
    if (t < 20) {
      return b & c | ~b & d | 0;
    } else if (t < 40) {
      return b ^ (c ^ d) | 0;
    } else if (t < 60) {
      return b & c | b & d | c & d | 0;
    } else {
      return b ^ (c ^ d) | 0;
    }
  };

  const k = __exports.k = function (t) {
    if (t < 20) {
      return 1518500249;
    } else if (t < 40) {
      return 1859775393;
    } else if (t < 60) {
      return -1894007588 | 0;
    } else {
      return -899497514 | 0;
    }
  };

  const SHAStream = __exports.SHAStream = class SHAStream {
    constructor(stream, pos, eof) {
      this.stream = stream;
      this.pos = pos | 0;
      this.eof = eof;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.AbstractIL.IL.SHA1.SHAStream",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          stream: _Array(Uint8Array, true),
          pos: "number",
          eof: "boolean"
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

    CompareTo(other) {
      return compareRecords(this, other) | 0;
    }

  };
  setType("Microsoft.FSharp.Compiler.AbstractIL.IL.SHA1.SHAStream", SHAStream);

  const rotLeft32 = __exports.rotLeft32 = function (x, n) {
    return x << n | ~~(x >>> 0 >>> 32 - n) | 0;
  };

  const shaAfterEof = __exports.shaAfterEof = function (sha) {
    const n = sha.pos | 0;
    const len = sha.stream.length | 0;

    if (n === len) {
      return 128;
    } else {
      const padded_len = ~~((len + 9 + 63) / 64) * 64 - 8 | 0;

      if (n < padded_len - 8) {
        return 0;
      } else if ((n & 63) === 56) {
        return ~~fromNumber(len, false).mul(fromNumber(8, false)).shr(56).toNumber() & 255 | 0;
      } else if ((n & 63) === 57) {
        return ~~fromNumber(len, false).mul(fromNumber(8, false)).shr(48).toNumber() & 255 | 0;
      } else if ((n & 63) === 58) {
        return ~~fromNumber(len, false).mul(fromNumber(8, false)).shr(40).toNumber() & 255 | 0;
      } else if ((n & 63) === 59) {
        return ~~fromNumber(len, false).mul(fromNumber(8, false)).shr(32).toNumber() & 255 | 0;
      } else if ((n & 63) === 60) {
        return ~~fromNumber(len, false).mul(fromNumber(8, false)).shr(24).toNumber() & 255 | 0;
      } else if ((n & 63) === 61) {
        return ~~fromNumber(len, false).mul(fromNumber(8, false)).shr(16).toNumber() & 255 | 0;
      } else if ((n & 63) === 62) {
        return ~~fromNumber(len, false).mul(fromNumber(8, false)).shr(8).toNumber() & 255 | 0;
      } else if ((n & 63) === 63) {
        sha.eof = true;
        return ~~fromNumber(len, false).mul(fromNumber(8, false)).toNumber() & 255 | 0;
      } else {
        return 0;
      }
    }
  };

  const shaRead8 = __exports.shaRead8 = function (sha) {
    const b = (sha.pos >= sha.stream.length ? shaAfterEof(sha) : ~~sha.stream[sha.pos]) | 0;
    sha.pos = sha.pos + 1 | 0;
    return b | 0;
  };

  const shaRead32 = __exports.shaRead32 = function (sha) {
    const b0_1 = shaRead8(sha) | 0;
    const b1_1 = shaRead8(sha) | 0;
    const b2_1 = shaRead8(sha) | 0;
    const b3_1 = shaRead8(sha) | 0;
    const res = b0_1 << 24 | b1_1 << 16 | b2_1 << 8 | b3_1 | 0;
    return res | 0;
  };

  const sha1Hash = __exports.sha1Hash = function (sha) {
    let h0 = 1732584193;
    let h1 = -271733879 | 0;
    let h2 = -1732584194 | 0;
    let h3 = 271733878;
    let h4 = -1009589776 | 0;
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    let e = 0;
    const w = Int32Array.from(replicate(80, 0));

    while (!sha.eof) {
      for (let i = 0; i <= 15; i++) {
        w[i] = shaRead32(sha) | 0;
      }

      for (let t = 16; t <= 79; t++) {
        w[t] = rotLeft32(w[t - 3] ^ (w[t - 8] ^ (w[t - 14] ^ w[t - 16])), 1) | 0;
      }

      a = h0 | 0;
      b = h1 | 0;
      c = h2 | 0;
      d = h3 | 0;
      e = h4 | 0;

      for (let t_1 = 0; t_1 <= 79; t_1++) {
        const temp = rotLeft32(a, 5) + f(t_1, b, c, d) + e + w[t_1] + k(t_1) | 0;
        e = d | 0;
        d = c | 0;
        c = rotLeft32(b, 30) | 0;
        b = a | 0;
        a = temp | 0;
      }

      h0 = h0 + a | 0;
      h1 = h1 + b | 0;
      h2 = h2 + c | 0;
      h3 = h3 + d | 0;
      h4 = h4 + e | 0;
    }

    return [h0, h1, h2, h3, h4];
  };

  const sha1HashBytes = __exports.sha1HashBytes = function (s) {
    const patternInput = sha1Hash(new SHAStream(s, 0, false));
    return map(function (value) {
      return value & 0xFF;
    }, new Int32Array([b0(patternInput[4]), b1(patternInput[4]), b2(patternInput[4]), b3(patternInput[4]), b0(patternInput[3]), b1(patternInput[3]), b2(patternInput[3]), b3(patternInput[3])]), Uint8Array);
  };

  return __exports;
}({});

function sha1HashBytes_1(s) {
  return SHA1.sha1HashBytes(s);
}

export { sha1HashBytes_1 as sha1HashBytes };
export class PublicKey {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.PublicKey",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["PublicKey", _Array(Uint8Array, true)], ["PublicKeyToken", _Array(Uint8Array, true)]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get IsKey() {
    return this.tag === 0 ? true : false;
  }

  get IsKeyToken() {
    return this.tag === 1 ? true : false;
  }

  get Key() {
    if (this.tag === 0) {
      return this.data;
    } else {
      throw new Error("not a key");
    }
  }

  get KeyToken() {
    if (this.tag === 1) {
      return this.data;
    } else {
      throw new Error("not a key token");
    }
  }

  ToToken() {
    return this.tag === 1 ? this.data : SHA1.sha1HashBytes(this.data);
  }

  static KeyAsToken(k_1) {
    return new PublicKey(1, new PublicKey(0, k_1).ToToken());
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.PublicKey", PublicKey);
export class AssemblyRefData {
  constructor(assemRefName, assemRefHash, assemRefPublicKeyInfo, assemRefRetargetable, assemRefVersion, assemRefLocale) {
    this.assemRefName = assemRefName;
    this.assemRefHash = assemRefHash;
    this.assemRefPublicKeyInfo = assemRefPublicKeyInfo;
    this.assemRefRetargetable = assemRefRetargetable;
    this.assemRefVersion = assemRefVersion;
    this.assemRefLocale = assemRefLocale;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.AssemblyRefData",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        assemRefName: "string",
        assemRefHash: Option(_Array(Uint8Array, true)),
        assemRefPublicKeyInfo: Option(PublicKey),
        assemRefRetargetable: "boolean",
        assemRefVersion: Option(Tuple(["number", "number", "number", "number"])),
        assemRefLocale: Option("string")
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.AssemblyRefData", AssemblyRefData);
export const AssemblyRefUniqueStampGenerator = new UniqueStampGenerator();
export function compareVersions(x, y) {
  const matchValue = [x, y];

  if (matchValue[0] != null) {
    if (matchValue[1] != null) {
      if (compare(getValue(matchValue[1])[0], getValue(matchValue[0])[0]) > 0) {
        return 1;
      } else if (compare(getValue(matchValue[1])[0], getValue(matchValue[0])[0]) < 0) {
        return -1 | 0;
      } else if (compare(getValue(matchValue[1])[1], getValue(matchValue[0])[1]) > 0) {
        return 1;
      } else if (compare(getValue(matchValue[1])[1], getValue(matchValue[0])[0]) < 0) {
        return -1 | 0;
      } else if (compare(getValue(matchValue[1])[2], getValue(matchValue[0])[2]) > 0) {
        return 1;
      } else if (compare(getValue(matchValue[1])[2], getValue(matchValue[0])[0]) < 0) {
        return -1 | 0;
      } else if (compare(getValue(matchValue[1])[3], getValue(matchValue[0])[3]) > 0) {
        return 1;
      } else if (compare(getValue(matchValue[1])[3], getValue(matchValue[0])[0]) < 0) {
        return -1 | 0;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  } else if (matchValue[1] != null) {
    return -1 | 0;
  } else {
    return 0;
  }
}
export function isMscorlib(data) {
  if (compare_1(data.assemRefName, "mscorlib") === 0) {
    return true;
  } else {
    return false;
  }
}
export function GetReferenceUnifiedVersion(data) {
  let highest = data.assemRefVersion;

  if (!isMscorlib(data)) {
    const inputSequence = AssemblyRefUniqueStampGenerator.Table;

    for (let ref of inputSequence) {
      if (compare_1(ref.assemRefName, data.assemRefName) === 0 ? compare(highest, ref.assemRefVersion) < 0 : false) {
        highest = ref.assemRefVersion;
      }
    }
  }

  return highest;
}
export class ILAssemblyRef {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILAssemblyRef",
      interfaces: ["System.IComparable"],
      properties: {
        Hash: Option(_Array(Uint8Array, true)),
        Locale: Option("string"),
        Name: "string",
        PublicKey: Option(PublicKey),
        QualifiedName: "string",
        Retargetable: "boolean",
        UniqueStamp: "number",
        Version: Option(Tuple(["number", "number", "number", "number"]))
      }
    };
  }

  constructor(data) {
    this.data = data;
    this.uniqueStamp = AssemblyRefUniqueStampGenerator.Encode(this.data) | 0;
  }

  get Name() {
    return this.data.assemRefName;
  }

  get Hash() {
    return this.data.assemRefHash;
  }

  get PublicKey() {
    return this.data.assemRefPublicKeyInfo;
  }

  get Retargetable() {
    return this.data.assemRefRetargetable;
  }

  get Version() {
    return GetReferenceUnifiedVersion(this.data);
  }

  get Locale() {
    return this.data.assemRefLocale;
  }

  get UniqueStamp() {
    return this.uniqueStamp;
  }

  GetHashCode() {
    return this.uniqueStamp;
  }

  Equals(yobj) {
    return yobj.UniqueStamp === this.uniqueStamp;
  }

  static Create(name, hash, publicKey, retargetable, version, locale) {
    return new ILAssemblyRef(new AssemblyRefData(name, hash, publicKey, retargetable, version, locale));
  }

  get QualifiedName() {
    const b = System.Text.StringBuilder[".ctor_0"](100);

    const add = s => {
      b.Append(s);
    };

    const addC = s_1 => {
      b.Append(s_1);
    };

    add(this.Name);
    const matchValue = this.Version;

    if (matchValue != null) {
      const d = getValue(matchValue)[3];
      const c = getValue(matchValue)[2];
      const b_1 = getValue(matchValue)[1];
      const a = getValue(matchValue)[0];
      add(", Version=");
      add((~~a).toString());
      add(".");
      add((~~b_1).toString());
      add(".");
      add((~~c).toString());
      add(".");
      add((~~d).toString());
      add(", Culture=");
      const matchValue_1 = this.Locale;

      if (matchValue_1 != null) {
        add(getValue(matchValue_1));
      } else {
        add("neutral");
      }

      add(", PublicKeyToken=");
      const matchValue_2 = this.PublicKey;

      if (matchValue_2 != null) {
        const pkt = getValue(matchValue_2).ToToken();

        const convDigit = digit => {
          const digitc = (digit < 10 ? "0".charCodeAt(0) + digit : "a".charCodeAt(0) + (digit - 10)) | 0;
          return String.fromCharCode(digitc);
        };

        for (let i = 0; i <= pkt.length - 1; i++) {
          const v = pkt[i];
          addC(convDigit(~~(~~v / 16)));
          addC(convDigit(~~v % 16));
        }
      } else {
        add("null");
      }

      if (this.Retargetable) {
        add(", Retargetable=Yes");
      }
    }

    return toString(b);
  }

  CompareTo(yobj) {
    return comparePrimitives(yobj.UniqueStamp, this.uniqueStamp) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILAssemblyRef", ILAssemblyRef);
export class ILModuleRef {
  constructor(name, hasMetadata, hash) {
    this.name = name;
    this.hasMetadata = hasMetadata;
    this.hash = hash;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILModuleRef",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        name: "string",
        hasMetadata: "boolean",
        hash: Option(_Array(Uint8Array, true))
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static Create(name, hasMetadata, hash) {
    return new ILModuleRef(name, hasMetadata, hash);
  }

  get Name() {
    return this.name;
  }

  get HasMetadata() {
    return this.hasMetadata;
  }

  get Hash() {
    return this.hash;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILModuleRef", ILModuleRef);
export class ILScopeRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILScopeRef",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Local"], ["Module", ILModuleRef], ["Assembly", ILAssemblyRef]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get IsLocalRef() {
    return this.tag === 0 ? true : false;
  }

  get IsModuleRef() {
    return this.tag === 1 ? true : false;
  }

  get IsAssemblyRef() {
    return this.tag === 2 ? true : false;
  }

  get ModuleRef() {
    if (this.tag === 1) {
      return this.data;
    } else {
      throw new Error("not a module reference");
    }
  }

  get AssemblyRef() {
    if (this.tag === 2) {
      return this.data;
    } else {
      throw new Error("not an assembly reference");
    }
  }

  get QualifiedName() {
    return this.tag === 1 ? "module " + this.data.Name : this.tag === 2 ? this.data.QualifiedName : "";
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILScopeRef", ILScopeRef);
export class ILArrayShape {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILArrayShape",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ILArrayShape", makeGeneric(List, {
        T: Tuple([Option("number"), Option("number")])
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get Rank() {
    return this.data.length;
  }

  static get SingleDimensional() {
    return ILArrayShapeStatics.SingleDimensional;
  }

  static FromRank(n) {
    if (n === 1) {
      return ILArrayShape.SingleDimensional;
    } else {
      return new ILArrayShape(0, replicate_1(n, [0, null]));
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILArrayShape", ILArrayShape);
export class ILArrayShapeStatics {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILArrayShapeStatics",
      properties: {
        SingleDimensional: ILArrayShape
      }
    };
  }

  constructor() {}

  static [".cctor"]() {
    ILArrayShapeStatics.singleDimensional = new ILArrayShape(0, ofArray([[0, null]]));
  }

  static get SingleDimensional() {
    return ILArrayShapeStatics.singleDimensional;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILArrayShapeStatics", ILArrayShapeStatics);
ILArrayShapeStatics[".cctor"]();
export class ILArgConvention {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILArgConvention",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Default"], ["CDecl"], ["StdCall"], ["ThisCall"], ["FastCall"], ["VarArg"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILArgConvention", ILArgConvention);
export class ILThisConvention {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILThisConvention",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Instance"], ["InstanceExplicit"], ["Static"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILThisConvention", ILThisConvention);
export class ILCallingConv {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILCallingConv",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Callconv", ILThisConvention, ILArgConvention]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get ThisConv() {
    return this.data[0];
  }

  get BasicConv() {
    return this.data[1];
  }

  get IsInstance() {
    const matchValue = this.ThisConv;

    if (matchValue.tag === 0) {
      return true;
    } else {
      return false;
    }
  }

  get IsInstanceExplicit() {
    const matchValue = this.ThisConv;

    if (matchValue.tag === 1) {
      return true;
    } else {
      return false;
    }
  }

  get IsStatic() {
    const matchValue = this.ThisConv;

    if (matchValue.tag === 2) {
      return true;
    } else {
      return false;
    }
  }

  static get Instance() {
    return ILCallingConvStatics.Instance;
  }

  static get Static() {
    return ILCallingConvStatics.Static;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILCallingConv", ILCallingConv);
export class ILCallingConvStatics {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILCallingConvStatics",
      properties: {
        Instance: ILCallingConv,
        Static: ILCallingConv
      }
    };
  }

  constructor() {}

  static [".cctor"]() {
    ILCallingConvStatics.instanceCallConv = new ILCallingConv(0, [new ILThisConvention(0), new ILArgConvention(0)]);
    ILCallingConvStatics.staticCallConv = new ILCallingConv(0, [new ILThisConvention(2), new ILArgConvention(0)]);
  }

  static get Instance() {
    return ILCallingConvStatics.instanceCallConv;
  }

  static get Static() {
    return ILCallingConvStatics.staticCallConv;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILCallingConvStatics", ILCallingConvStatics);
ILCallingConvStatics[".cctor"]();
export class ILBoxity {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILBoxity",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["AsObject"], ["AsValue"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILBoxity", ILBoxity);
export class ILTypeRef {
  constructor(trefScope, trefEnclosing, trefName, hashCode, asBoxedType) {
    this.trefScope = trefScope;
    this.trefEnclosing = trefEnclosing;
    this.trefName = trefName;
    this.hashCode = hashCode | 0;
    this.asBoxedType = asBoxedType;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeRef",
      interfaces: ["FSharpRecord", "System.IComparable"],
      properties: {
        trefScope: ILScopeRef,
        trefEnclosing: makeGeneric(List, {
          T: "string"
        }),
        trefName: "string",
        hashCode: "number",
        asBoxedType: ILType
      }
    };
  }

  static Create(scope, enclosing, name) {
    const hashCode = hash_1(scope) * 17 ^ (hash_1(enclosing) * 101 << 1 ^ hash_1(name) * 47 << 2) | 0;
    return new ILTypeRef(scope, enclosing, name, hashCode, null);
  }

  get Scope() {
    return this.trefScope;
  }

  get Enclosing() {
    return this.trefEnclosing;
  }

  get Name() {
    return this.trefName;
  }

  get ApproxId() {
    return this.hashCode;
  }

  AsBoxedType(tspec) {
    if (tspec.tspecInst.tail == null) {
      const v = this.asBoxedType;
      const matchValue = v;

      if (matchValue == null) {
        const r = new ILType(3, tspec);
        this.asBoxedType = r;
        return r;
      } else {
        return v;
      }
    } else {
      return new ILType(3, tspec);
    }
  }

  GetHashCode() {
    return this.hashCode;
  }

  Equals(yobj) {
    const y = yobj;

    if ((this.ApproxId === y.ApproxId ? this.Scope.Equals(y.Scope) : false) ? this.Name === y.Name : false) {
      return this.Enclosing.Equals(y.Enclosing);
    } else {
      return false;
    }
  }

  get FullName() {
    return join(".", append(this.Enclosing, ofArray([this.Name])));
  }

  get BasicQualifiedName() {
    return replace(join("+", append(this.Enclosing, ofArray([this.Name]))), ",", "\\,");
  }

  AddQualifiedNameExtension(basic) {
    const sco = this.Scope.QualifiedName;

    if (sco === "") {
      return basic;
    } else {
      return join(", ", ofArray([basic, sco]));
    }
  }

  get QualifiedName() {
    return this.AddQualifiedNameExtension(this.BasicQualifiedName);
  }

  ToString() {
    return this.FullName;
  }

  CompareTo(yobj) {
    const y = yobj;
    const c = comparePrimitives(this.ApproxId, y.ApproxId) | 0;

    if (c !== 0) {
      return c | 0;
    } else {
      const c_1 = this.Scope.CompareTo(y.Scope) | 0;

      if (c_1 !== 0) {
        return c_1 | 0;
      } else {
        const c_2 = comparePrimitives(this.Name, y.Name) | 0;

        if (c_2 !== 0) {
          return c_2 | 0;
        } else {
          return this.Enclosing.CompareTo(y.Enclosing) | 0;
        }
      }
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeRef", ILTypeRef);
export class ILTypeSpec {
  constructor(tspecTypeRef, tspecInst) {
    this.tspecTypeRef = tspecTypeRef;
    this.tspecInst = tspecInst;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeSpec",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        tspecTypeRef: ILTypeRef,
        tspecInst: makeGeneric(List, {
          T: ILType
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

  get TypeRef() {
    return this.tspecTypeRef;
  }

  get Scope() {
    return this.TypeRef.Scope;
  }

  get Enclosing() {
    return this.TypeRef.Enclosing;
  }

  get Name() {
    return this.TypeRef.Name;
  }

  get GenericArgs() {
    return this.tspecInst;
  }

  static Create(tref, inst) {
    return new ILTypeSpec(tref, inst);
  }

  ToString() {
    var $var2;
    return toString(this.TypeRef) + (($var2 = this.GenericArgs, $var2.tail == null) ? "" : "<...>");
  }

  get BasicQualifiedName() {
    var $var3;
    const tc = this.TypeRef.BasicQualifiedName;

    if ($var3 = this.GenericArgs, $var3.tail == null) {
      return tc;
    } else {
      return tc + "[" + join(",", map_1(arg => "[" + arg.QualifiedName + "]", this.GenericArgs)) + "]";
    }
  }

  AddQualifiedNameExtension(basic) {
    return this.TypeRef.AddQualifiedNameExtension(basic);
  }

  get FullName() {
    return this.TypeRef.FullName;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeSpec", ILTypeSpec);
export class ILType {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILType",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Void"], ["Array", ILArrayShape, ILType], ["Value", ILTypeSpec], ["Boxed", ILTypeSpec], ["Ptr", ILType], ["Byref", ILType], ["FunctionPointer", ILCallingSignature], ["TypeVar", "number"], ["Modified", "boolean", ILTypeRef, ILType]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get BasicQualifiedName() {
    const $var4 = this.tag === 8 ? [1] : this.tag === 1 ? [2] : this.tag === 2 ? [3, this.data] : this.tag === 3 ? [3, this.data] : this.tag === 0 ? [4] : this.tag === 4 ? [5] : this.tag === 5 ? [6] : this.tag === 6 ? [7] : [0];

    switch ($var4[0]) {
      case 0:
        return "!" + this.data.toString();

      case 1:
        return this.data[2].BasicQualifiedName;

      case 2:
        const s = this.data[0].data;
        return this.data[1].BasicQualifiedName + "[" + printf(",") + "]";

      case 3:
        return $var4[1].BasicQualifiedName;

      case 4:
        return "void";

      case 5:
        throw new Error("unexpected pointer type");

      case 6:
        throw new Error("unexpected byref type");

      case 7:
        throw new Error("unexpected function pointer type");
    }
  }

  AddQualifiedNameExtension(basic) {
    const $var5 = this.tag === 8 ? [1] : this.tag === 1 ? [2] : this.tag === 2 ? [3, this.data] : this.tag === 3 ? [3, this.data] : this.tag === 0 ? [4] : this.tag === 4 ? [5] : this.tag === 5 ? [6] : this.tag === 6 ? [7] : [0];

    switch ($var5[0]) {
      case 0:
        return basic;

      case 1:
        return this.data[2].AddQualifiedNameExtension(basic);

      case 2:
        const _s = this.data[0].data;
        return this.data[1].AddQualifiedNameExtension(basic);

      case 3:
        return $var5[1].AddQualifiedNameExtension(basic);

      case 4:
        throw new Error("void");

      case 5:
        throw new Error("unexpected pointer type");

      case 6:
        throw new Error("unexpected byref type");

      case 7:
        throw new Error("unexpected function pointer type");
    }
  }

  get QualifiedName() {
    return this.AddQualifiedNameExtension(this.BasicQualifiedName);
  }

  get TypeSpec() {
    const $var6 = this.tag === 3 ? [0, this.data] : this.tag === 2 ? [0, this.data] : [1];

    switch ($var6[0]) {
      case 0:
        return $var6[1];

      case 1:
        throw new Error("not a nominal type");
    }
  }

  get Boxity() {
    if (this.tag === 3) {
      return new ILBoxity(0);
    } else if (this.tag === 2) {
      return new ILBoxity(1);
    } else {
      throw new Error("not a nominal type");
    }
  }

  get TypeRef() {
    const $var7 = this.tag === 3 ? [0, this.data] : this.tag === 2 ? [0, this.data] : [1];

    switch ($var7[0]) {
      case 0:
        return $var7[1].TypeRef;

      case 1:
        throw new Error("not a nominal type");
    }
  }

  get IsNominal() {
    const $var8 = this.tag === 3 ? [0] : this.tag === 2 ? [0] : [1];

    switch ($var8[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  get GenericArgs() {
    const $var9 = this.tag === 3 ? [0, this.data] : this.tag === 2 ? [0, this.data] : [1];

    switch ($var9[0]) {
      case 0:
        return $var9[1].GenericArgs;

      case 1:
        return new List();
    }
  }

  get IsTyvar() {
    return this.tag === 7 ? true : false;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILType", ILType);
export class ILCallingSignature {
  constructor(callingConv, argTypes, returnType) {
    this.CallingConv = callingConv;
    this.ArgTypes = argTypes;
    this.ReturnType = returnType;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILCallingSignature",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        CallingConv: ILCallingConv,
        ArgTypes: makeGeneric(List, {
          T: ILType
        }),
        ReturnType: ILType
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILCallingSignature", ILCallingSignature);
export function mkILCallSig(cc, args, ret) {
  return new ILCallingSignature(cc, args, ret);
}
export function mkILBoxedType(tspec) {
  return tspec.TypeRef.AsBoxedType(tspec);
}
export class ILMethodRef {
  constructor(mrefParent, mrefCallconv, mrefGenericArity, mrefName, mrefArgs, mrefReturn) {
    this.mrefParent = mrefParent;
    this.mrefCallconv = mrefCallconv;
    this.mrefGenericArity = mrefGenericArity | 0;
    this.mrefName = mrefName;
    this.mrefArgs = mrefArgs;
    this.mrefReturn = mrefReturn;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodRef",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        mrefParent: ILTypeRef,
        mrefCallconv: ILCallingConv,
        mrefGenericArity: "number",
        mrefName: "string",
        mrefArgs: makeGeneric(List, {
          T: ILType
        }),
        mrefReturn: ILType
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  get DeclaringTypeRef() {
    return this.mrefParent;
  }

  get CallingConv() {
    return this.mrefCallconv;
  }

  get Name() {
    return this.mrefName;
  }

  get GenericArity() {
    return this.mrefGenericArity;
  }

  get ArgCount() {
    return this.mrefArgs.length;
  }

  get ArgTypes() {
    return this.mrefArgs;
  }

  get ReturnType() {
    return this.mrefReturn;
  }

  get CallingSignature() {
    return mkILCallSig(this.CallingConv, this.ArgTypes, this.ReturnType);
  }

  static Create(a, b, c, d, e, f_1) {
    return new ILMethodRef(a, b, d, c, e, f_1);
  }

  ToString() {
    return toString(this.DeclaringTypeRef) + "::" + this.Name + "(...)";
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodRef", ILMethodRef);
export class ILFieldRef {
  constructor(declaringTypeRef, name, type) {
    this.DeclaringTypeRef = declaringTypeRef;
    this.Name = name;
    this.Type = type;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldRef",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        DeclaringTypeRef: ILTypeRef,
        Name: "string",
        Type: ILType
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
    return toString(this.DeclaringTypeRef) + "::" + this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldRef", ILFieldRef);
export class ILMethodSpec {
  constructor(mspecMethodRef, mspecDeclaringType, mspecMethodInst) {
    this.mspecMethodRef = mspecMethodRef;
    this.mspecDeclaringType = mspecDeclaringType;
    this.mspecMethodInst = mspecMethodInst;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodSpec",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        mspecMethodRef: ILMethodRef,
        mspecDeclaringType: ILType,
        mspecMethodInst: makeGeneric(List, {
          T: ILType
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

  static Create(a, b, c) {
    return new ILMethodSpec(b, a, c);
  }

  get MethodRef() {
    return this.mspecMethodRef;
  }

  get DeclaringType() {
    return this.mspecDeclaringType;
  }

  get GenericArgs() {
    return this.mspecMethodInst;
  }

  get Name() {
    return this.MethodRef.Name;
  }

  get CallingConv() {
    return this.MethodRef.CallingConv;
  }

  get GenericArity() {
    return this.MethodRef.GenericArity;
  }

  get FormalArgTypes() {
    return this.MethodRef.ArgTypes;
  }

  get FormalReturnType() {
    return this.MethodRef.ReturnType;
  }

  ToString() {
    return toString(this.MethodRef) + "(...)";
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodSpec", ILMethodSpec);
export class ILFieldSpec {
  constructor(fieldRef, declaringType) {
    this.FieldRef = fieldRef;
    this.DeclaringType = declaringType;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldSpec",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        FieldRef: ILFieldRef,
        DeclaringType: ILType
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  get FormalType() {
    return this.FieldRef.Type;
  }

  get Name() {
    return this.FieldRef.Name;
  }

  get DeclaringTypeRef() {
    return this.FieldRef.DeclaringTypeRef;
  }

  ToString() {
    return toString(this.FieldRef);
  }

  get ActualType() {
    const env = this.DeclaringType.GenericArgs;
    return instILType(env, this.FormalType);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldSpec", ILFieldSpec);
export class ILPlatform {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILPlatform",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["X86"], ["AMD64"], ["IA64"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILPlatform", ILPlatform);
export class ILSourceDocument {
  constructor(sourceLanguage, sourceVendor, sourceDocType, sourceFile) {
    this.sourceLanguage = sourceLanguage;
    this.sourceVendor = sourceVendor;
    this.sourceDocType = sourceDocType;
    this.sourceFile = sourceFile;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILSourceDocument",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        sourceLanguage: Option(_Array(Uint8Array, true)),
        sourceVendor: Option(_Array(Uint8Array, true)),
        sourceDocType: Option(_Array(Uint8Array, true)),
        sourceFile: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static Create(language, vendor, docType, file) {
    return new ILSourceDocument(language, vendor, docType, file);
  }

  get Language() {
    return this.sourceLanguage;
  }

  get Vendor() {
    return this.sourceVendor;
  }

  get DocumentType() {
    return this.sourceDocType;
  }

  get File() {
    return this.sourceFile;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILSourceDocument", ILSourceDocument);
export class ILSourceMarker {
  constructor(sourceDocument, sourceLine, sourceColumn, sourceEndLine, sourceEndColumn) {
    this.sourceDocument = sourceDocument;
    this.sourceLine = sourceLine | 0;
    this.sourceColumn = sourceColumn | 0;
    this.sourceEndLine = sourceEndLine | 0;
    this.sourceEndColumn = sourceEndColumn | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILSourceMarker",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        sourceDocument: ILSourceDocument,
        sourceLine: "number",
        sourceColumn: "number",
        sourceEndLine: "number",
        sourceEndColumn: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static Create(document, line, column, endLine, endColumn) {
    return new ILSourceMarker(document, line, column, endLine, endColumn);
  }

  get Document() {
    return this.sourceDocument;
  }

  get Line() {
    return this.sourceLine;
  }

  get Column() {
    return this.sourceColumn;
  }

  get EndLine() {
    return this.sourceEndLine;
  }

  get EndColumn() {
    return this.sourceEndColumn;
  }

  ToString() {
    return toText(printf("(%d,%d)-(%d,%d)"))(this.Line, this.Column, this.EndLine, this.EndColumn);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILSourceMarker", ILSourceMarker);
export class ILAttribElem {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILAttribElem",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["String", Option("string")], ["Bool", "boolean"], ["Char", "string"], ["SByte", "number"], ["Int16", "number"], ["Int32", "number"], ["Int64", Long], ["Byte", "number"], ["UInt16", "number"], ["UInt32", "number"], ["UInt64", Long], ["Single", "number"], ["Double", "number"], ["Null"], ["Type", Option(ILType)], ["TypeRef", Option(ILTypeRef)], ["Array", ILType, makeGeneric(List, {
        T: ILAttribElem
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILAttribElem", ILAttribElem);
export class ILAttribute {
  constructor(method, data, elements) {
    this.Method = method;
    this.Data = data;
    this.Elements = elements;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILAttribute",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Method: ILMethodSpec,
        Data: _Array(Uint8Array, true),
        Elements: makeGeneric(List, {
          T: ILAttribElem
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILAttribute", ILAttribute);
export class ILAttributes {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILAttributes",
      interfaces: ["FSharpRecord"],
      properties: {
        array: _Array(ILAttribute)
      }
    };
  }

  constructor(array) {
    this.array = array;
  }

  get AsArray() {
    return this.array;
  }

  get AsList() {
    return toList(this.AsArray);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILAttributes", ILAttributes);
export class ILAttributesStored {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILAttributesStored",
      interfaces: ["FSharpUnion"],
      cases: [["Reader", _Function(["number", _Array(ILAttribute)])], ["Given", ILAttributes]]
    };
  }

  GetCustomAttrs(metadataIndex) {
    if (this.tag === 1) {
      return this.data;
    } else {
      return new ILAttributes(this.data(metadataIndex));
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILAttributesStored", ILAttributesStored);
export const emptyILCustomAttrs = new ILAttributes([]);
export function mkILCustomAttrsFromArray(attrs) {
  if (attrs.length === 0) {
    return emptyILCustomAttrs;
  } else {
    return new ILAttributes(attrs);
  }
}
export function mkILCustomAttrs(l) {
  if (l.tail == null) {
    return emptyILCustomAttrs;
  } else {
    return mkILCustomAttrsFromArray(Array.from(l));
  }
}
export const emptyILCustomAttrsStored = new ILAttributesStored(1, emptyILCustomAttrs);
export function storeILCustomAttrs(attrs) {
  if (attrs.AsArray.length === 0) {
    return emptyILCustomAttrsStored;
  } else {
    return new ILAttributesStored(1, attrs);
  }
}
export function mkILCustomAttrsReader(f_1) {
  return new ILAttributesStored(0, f_1);
}
export class ILBasicType {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILBasicType",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["DT_R"], ["DT_I1"], ["DT_U1"], ["DT_I2"], ["DT_U2"], ["DT_I4"], ["DT_U4"], ["DT_I8"], ["DT_U8"], ["DT_R4"], ["DT_R8"], ["DT_I"], ["DT_U"], ["DT_REF"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILBasicType", ILBasicType);
export class ILToken {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILToken",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ILType", ILType], ["ILMethod", ILMethodSpec], ["ILField", ILFieldSpec]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILToken", ILToken);
export class ILConst {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILConst",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["I4", "number"], ["I8", Long], ["R4", "number"], ["R8", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILConst", ILConst);
export class ILTailcall {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTailcall",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Tailcall"], ["Normalcall"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTailcall", ILTailcall);
export class ILAlignment {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILAlignment",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Aligned"], ["Unaligned1"], ["Unaligned2"], ["Unaligned4"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILAlignment", ILAlignment);
export class ILVolatility {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILVolatility",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Volatile"], ["Nonvolatile"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILVolatility", ILVolatility);
export class ILReadonly {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILReadonly",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ReadonlyAddress"], ["NormalAddress"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILReadonly", ILReadonly);
export class ILComparisonInstr {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILComparisonInstr",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["BI_beq"], ["BI_bge"], ["BI_bge_un"], ["BI_bgt"], ["BI_bgt_un"], ["BI_ble"], ["BI_ble_un"], ["BI_blt"], ["BI_blt_un"], ["BI_bne_un"], ["BI_brfalse"], ["BI_brtrue"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILComparisonInstr", ILComparisonInstr);
export class ILInstr {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILInstr",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["AI_add"], ["AI_add_ovf"], ["AI_add_ovf_un"], ["AI_and"], ["AI_div"], ["AI_div_un"], ["AI_ceq"], ["AI_cgt"], ["AI_cgt_un"], ["AI_clt"], ["AI_clt_un"], ["AI_conv", ILBasicType], ["AI_conv_ovf", ILBasicType], ["AI_conv_ovf_un", ILBasicType], ["AI_mul"], ["AI_mul_ovf"], ["AI_mul_ovf_un"], ["AI_rem"], ["AI_rem_un"], ["AI_shl"], ["AI_shr"], ["AI_shr_un"], ["AI_sub"], ["AI_sub_ovf"], ["AI_sub_ovf_un"], ["AI_xor"], ["AI_or"], ["AI_neg"], ["AI_not"], ["AI_ldnull"], ["AI_dup"], ["AI_pop"], ["AI_ckfinite"], ["AI_nop"], ["AI_ldc", ILBasicType, ILConst], ["I_ldarg", "number"], ["I_ldarga", "number"], ["I_ldind", ILAlignment, ILVolatility, ILBasicType], ["I_ldloc", "number"], ["I_ldloca", "number"], ["I_starg", "number"], ["I_stind", ILAlignment, ILVolatility, ILBasicType], ["I_stloc", "number"], ["I_br", "number"], ["I_jmp", ILMethodSpec], ["I_brcmp", ILComparisonInstr, "number"], ["I_switch", makeGeneric(List, {
        T: "number"
      })], ["I_ret"], ["I_call", ILTailcall, ILMethodSpec, Option(makeGeneric(List, {
        T: ILType
      }))], ["I_callvirt", ILTailcall, ILMethodSpec, Option(makeGeneric(List, {
        T: ILType
      }))], ["I_callconstraint", ILTailcall, ILType, ILMethodSpec, Option(makeGeneric(List, {
        T: ILType
      }))], ["I_calli", ILTailcall, ILCallingSignature, Option(makeGeneric(List, {
        T: ILType
      }))], ["I_ldftn", ILMethodSpec], ["I_newobj", ILMethodSpec, Option(makeGeneric(List, {
        T: ILType
      }))], ["I_throw"], ["I_endfinally"], ["I_endfilter"], ["I_leave", "number"], ["I_rethrow"], ["I_ldsfld", ILVolatility, ILFieldSpec], ["I_ldfld", ILAlignment, ILVolatility, ILFieldSpec], ["I_ldsflda", ILFieldSpec], ["I_ldflda", ILFieldSpec], ["I_stsfld", ILVolatility, ILFieldSpec], ["I_stfld", ILAlignment, ILVolatility, ILFieldSpec], ["I_ldstr", "string"], ["I_isinst", ILType], ["I_castclass", ILType], ["I_ldtoken", ILToken], ["I_ldvirtftn", ILMethodSpec], ["I_cpobj", ILType], ["I_initobj", ILType], ["I_ldobj", ILAlignment, ILVolatility, ILType], ["I_stobj", ILAlignment, ILVolatility, ILType], ["I_box", ILType], ["I_unbox", ILType], ["I_unbox_any", ILType], ["I_sizeof", ILType], ["I_ldelem", ILBasicType], ["I_stelem", ILBasicType], ["I_ldelema", ILReadonly, "boolean", ILArrayShape, ILType], ["I_ldelem_any", ILArrayShape, ILType], ["I_stelem_any", ILArrayShape, ILType], ["I_newarr", ILArrayShape, ILType], ["I_ldlen"], ["I_mkrefany", ILType], ["I_refanytype"], ["I_refanyval", ILType], ["I_break"], ["I_seqpoint", ILSourceMarker], ["I_arglist"], ["I_localloc"], ["I_cpblk", ILAlignment, ILVolatility], ["I_initblk", ILAlignment, ILVolatility], ["EI_ilzero", ILType], ["EI_ldlen_multi", "number", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILInstr", ILInstr);
export class ILExceptionClause {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILExceptionClause",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Finally", Tuple(["number", "number"])], ["Fault", Tuple(["number", "number"])], ["FilterCatch", Tuple(["number", "number"]), Tuple(["number", "number"])], ["TypeCatch", ILType, Tuple(["number", "number"])]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILExceptionClause", ILExceptionClause);
export class ILExceptionSpec {
  constructor(range, clause) {
    this.Range = range;
    this.Clause = clause;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILExceptionSpec",
      interfaces: ["FSharpRecord"],
      properties: {
        Range: Tuple(["number", "number"]),
        Clause: ILExceptionClause
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILExceptionSpec", ILExceptionSpec);
export class ILLocalDebugMapping {
  constructor(localIndex, localName) {
    this.LocalIndex = localIndex | 0;
    this.LocalName = localName;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILLocalDebugMapping",
      interfaces: ["FSharpRecord"],
      properties: {
        LocalIndex: "number",
        LocalName: "string"
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILLocalDebugMapping", ILLocalDebugMapping);
export class ILLocalDebugInfo {
  constructor(range, debugMappings) {
    this.Range = range;
    this.DebugMappings = debugMappings;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILLocalDebugInfo",
      interfaces: ["FSharpRecord"],
      properties: {
        Range: Tuple(["number", "number"]),
        DebugMappings: makeGeneric(List, {
          T: ILLocalDebugMapping
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILLocalDebugInfo", ILLocalDebugInfo);
export class ILCode {
  constructor(labels, instrs, exceptions, locals) {
    this.Labels = labels;
    this.Instrs = instrs;
    this.Exceptions = exceptions;
    this.Locals = locals;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILCode",
      interfaces: ["FSharpRecord"],
      properties: {
        Labels: makeGeneric(Map, {
          TKey: "number",
          TValue: "number"
        }),
        Instrs: _Array(ILInstr),
        Exceptions: makeGeneric(List, {
          T: ILExceptionSpec
        }),
        Locals: makeGeneric(List, {
          T: ILLocalDebugInfo
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILCode", ILCode);
export class ILLocal {
  constructor(type, isPinned, debugInfo) {
    this.Type = type;
    this.IsPinned = isPinned;
    this.DebugInfo = debugInfo;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILLocal",
      interfaces: ["FSharpRecord"],
      properties: {
        Type: ILType,
        IsPinned: "boolean",
        DebugInfo: Option(Tuple(["string", "number", "number"]))
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILLocal", ILLocal);
export class ILMethodBody {
  constructor(isZeroInit, maxStack, noInlining, aggressiveInlining, locals, code, sourceMarker) {
    this.IsZeroInit = isZeroInit;
    this.MaxStack = maxStack | 0;
    this.NoInlining = noInlining;
    this.AggressiveInlining = aggressiveInlining;
    this.Locals = locals;
    this.Code = code;
    this.SourceMarker = sourceMarker;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodBody",
      interfaces: ["FSharpRecord"],
      properties: {
        IsZeroInit: "boolean",
        MaxStack: "number",
        NoInlining: "boolean",
        AggressiveInlining: "boolean",
        Locals: makeGeneric(List, {
          T: ILLocal
        }),
        Code: ILCode,
        SourceMarker: Option(ILSourceMarker)
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodBody", ILMethodBody);
export class ILMemberAccess {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMemberAccess",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Assembly"], ["FamilyAndAssembly"], ["FamilyOrAssembly"], ["Family"], ["Private"], ["Public"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMemberAccess", ILMemberAccess);
export class ILFieldInit {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldInit",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["String", "string"], ["Bool", "boolean"], ["Char", "number"], ["Int8", "number"], ["Int16", "number"], ["Int32", "number"], ["Int64", Long], ["UInt8", "number"], ["UInt16", "number"], ["UInt32", "number"], ["UInt64", Long], ["Single", "number"], ["Double", "number"], ["Null"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldInit", ILFieldInit);
export class ILNativeType {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILNativeType",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Empty"], ["Custom", _Array(Uint8Array, true), "string", "string", _Array(Uint8Array, true)], ["FixedSysString", "number"], ["FixedArray", "number"], ["Currency"], ["LPSTR"], ["LPWSTR"], ["LPTSTR"], ["LPUTF8STR"], ["ByValStr"], ["TBSTR"], ["LPSTRUCT"], ["Struct"], ["Void"], ["Bool"], ["Int8"], ["Int16"], ["Int32"], ["Int64"], ["Single"], ["Double"], ["Byte"], ["UInt16"], ["UInt32"], ["UInt64"], ["Array", Option(ILNativeType), Option(Tuple(["number", Option("number")]))], ["Int"], ["UInt"], ["Method"], ["AsAny"], ["BSTR"], ["IUnknown"], ["IDispatch"], ["Interface"], ["Error"], ["SafeArray", ILNativeVariant, Option("string")], ["ANSIBSTR"], ["VariantBool"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILNativeType", ILNativeType);
export class ILNativeVariant {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILNativeVariant",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Empty"], ["Null"], ["Variant"], ["Currency"], ["Decimal"], ["Date"], ["BSTR"], ["LPSTR"], ["LPWSTR"], ["IUnknown"], ["IDispatch"], ["SafeArray"], ["Error"], ["HRESULT"], ["CArray"], ["UserDefined"], ["Record"], ["FileTime"], ["Blob"], ["Stream"], ["Storage"], ["StreamedObject"], ["StoredObject"], ["BlobObject"], ["CF"], ["CLSID"], ["Void"], ["Bool"], ["Int8"], ["Int16"], ["Int32"], ["Int64"], ["Single"], ["Double"], ["UInt8"], ["UInt16"], ["UInt32"], ["UInt64"], ["PTR"], ["Array", ILNativeVariant], ["Vector", ILNativeVariant], ["Byref", ILNativeVariant], ["Int"], ["UInt"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILNativeVariant", ILNativeVariant);
export class ILSecurityAction {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILSecurityAction",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Request"], ["Demand"], ["Assert"], ["Deny"], ["PermitOnly"], ["LinkCheck"], ["InheritCheck"], ["ReqMin"], ["ReqOpt"], ["ReqRefuse"], ["PreJitGrant"], ["PreJitDeny"], ["NonCasDemand"], ["NonCasLinkDemand"], ["NonCasInheritance"], ["LinkDemandChoice"], ["InheritanceDemandChoice"], ["DemandChoice"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILSecurityAction", ILSecurityAction);
export class ILSecurityDecl {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILSecurityDecl",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ILSecurityDecl", ILSecurityAction, _Array(Uint8Array, true)]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILSecurityDecl", ILSecurityDecl);
export class ILSecurityDecls {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILSecurityDecls",
      interfaces: ["FSharpRecord"],
      properties: {
        array: _Array(ILSecurityDecl)
      }
    };
  }

  constructor(array) {
    this.array = array;
  }

  get AsArray() {
    return this.array;
  }

  get AsList() {
    return toList(this.AsArray);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILSecurityDecls", ILSecurityDecls);
export class ILSecurityDeclsStored {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILSecurityDeclsStored",
      interfaces: ["FSharpUnion"],
      cases: [["Reader", _Function(["number", _Array(ILSecurityDecl)])], ["Given", ILSecurityDecls]]
    };
  }

  GetSecurityDecls(metadataIndex) {
    if (this.tag === 1) {
      return this.data;
    } else {
      return new ILSecurityDecls(this.data(metadataIndex));
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILSecurityDeclsStored", ILSecurityDeclsStored);
export const emptyILSecurityDecls = new ILSecurityDecls([]);
export const emptyILSecurityDeclsStored = new ILSecurityDeclsStored(1, emptyILSecurityDecls);
export function mkILSecurityDecls(l) {
  if (l.tail == null) {
    return emptyILSecurityDecls;
  } else {
    return new ILSecurityDecls(Array.from(l));
  }
}
export function storeILSecurityDecls(x) {
  if (x.AsArray.length === 0) {
    return emptyILSecurityDeclsStored;
  } else {
    return new ILSecurityDeclsStored(1, x);
  }
}
export function mkILSecurityDeclsReader(f_1) {
  return new ILSecurityDeclsStored(0, f_1);
}
export class PInvokeCharBestFit {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeCharBestFit",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["UseAssembly"], ["Enabled"], ["Disabled"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeCharBestFit", PInvokeCharBestFit);
export class PInvokeThrowOnUnmappableChar {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeThrowOnUnmappableChar",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["UseAssembly"], ["Enabled"], ["Disabled"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeThrowOnUnmappableChar", PInvokeThrowOnUnmappableChar);
export class PInvokeCallingConvention {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeCallingConvention",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["None"], ["Cdecl"], ["Stdcall"], ["Thiscall"], ["Fastcall"], ["WinApi"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeCallingConvention", PInvokeCallingConvention);
export class PInvokeCharEncoding {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeCharEncoding",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["None"], ["Ansi"], ["Unicode"], ["Auto"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeCharEncoding", PInvokeCharEncoding);
export class PInvokeMethod {
  constructor(where, name, callingConv, charEncoding, noMangle, lastError, throwOnUnmappableChar, charBestFit) {
    this.Where = where;
    this.Name = name;
    this.CallingConv = callingConv;
    this.CharEncoding = charEncoding;
    this.NoMangle = noMangle;
    this.LastError = lastError;
    this.ThrowOnUnmappableChar = throwOnUnmappableChar;
    this.CharBestFit = charBestFit;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeMethod",
      interfaces: ["FSharpRecord"],
      properties: {
        Where: ILModuleRef,
        Name: "string",
        CallingConv: PInvokeCallingConvention,
        CharEncoding: PInvokeCharEncoding,
        NoMangle: "boolean",
        LastError: "boolean",
        ThrowOnUnmappableChar: PInvokeThrowOnUnmappableChar,
        CharBestFit: PInvokeCharBestFit
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.PInvokeMethod", PInvokeMethod);
export class ILParameter {
  constructor(name, type, _default, marshal, isIn, isOut, isOptional, customAttrsStored, metadataIndex) {
    this.Name = name;
    this.Type = type;
    this.Default = _default;
    this.Marshal = marshal;
    this.IsIn = isIn;
    this.IsOut = isOut;
    this.IsOptional = isOptional;
    this.CustomAttrsStored = customAttrsStored;
    this.MetadataIndex = metadataIndex | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILParameter",
      interfaces: ["FSharpRecord"],
      properties: {
        Name: Option("string"),
        Type: ILType,
        Default: Option(ILFieldInit),
        Marshal: Option(ILNativeType),
        IsIn: "boolean",
        IsOut: "boolean",
        IsOptional: "boolean",
        CustomAttrsStored: ILAttributesStored,
        MetadataIndex: "number"
      }
    };
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILParameter", ILParameter);
export class ILReturn {
  constructor(marshal, type, customAttrsStored, metadataIndex) {
    this.Marshal = marshal;
    this.Type = type;
    this.CustomAttrsStored = customAttrsStored;
    this.MetadataIndex = metadataIndex | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILReturn",
      interfaces: ["FSharpRecord"],
      properties: {
        Marshal: Option(ILNativeType),
        Type: ILType,
        CustomAttrsStored: ILAttributesStored,
        MetadataIndex: "number"
      }
    };
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILReturn", ILReturn);
export class ILOverridesSpec {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILOverridesSpec",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["OverridesSpec", ILMethodRef, ILType]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get MethodRef() {
    return this.data[0];
  }

  get DeclaringType() {
    return this.data[1];
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILOverridesSpec", ILOverridesSpec);
export class ILMethodVirtualInfo {
  constructor(isFinal, isNewSlot, isCheckAccessOnOverride, isAbstract) {
    this.IsFinal = isFinal;
    this.IsNewSlot = isNewSlot;
    this.IsCheckAccessOnOverride = isCheckAccessOnOverride;
    this.IsAbstract = isAbstract;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodVirtualInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        IsFinal: "boolean",
        IsNewSlot: "boolean",
        IsCheckAccessOnOverride: "boolean",
        IsAbstract: "boolean"
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodVirtualInfo", ILMethodVirtualInfo);
export class MethodKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.MethodKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Static"], ["Cctor"], ["Ctor"], ["NonVirtual"], ["Virtual", ILMethodVirtualInfo]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.MethodKind", MethodKind);
export class MethodBody {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.MethodBody",
      interfaces: ["FSharpUnion"],
      cases: [["IL", ILMethodBody], ["PInvoke", PInvokeMethod], ["Abstract"], ["Native"], ["NotAvailable"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.MethodBody", MethodBody);
export class ILLazyMethodBody {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILLazyMethodBody",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ILLazyMethodBody", Any]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get Contents() {
    return this.data.value;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILLazyMethodBody", ILLazyMethodBody);
export class MethodCodeKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.MethodCodeKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["IL"], ["Native"], ["Runtime"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.MethodCodeKind", MethodCodeKind);
export function mkMethBodyAux(mb) {
  return new ILLazyMethodBody(0, notlazy(mb));
}
export function mkMethBodyLazyAux(mb) {
  return new ILLazyMethodBody(0, mb);
}
export function typesOfILParams(ps) {
  return map_1(function (p) {
    return p.Type;
  }, ps);
}
export class ILGenericVariance {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILGenericVariance",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NonVariant"], ["CoVariant"], ["ContraVariant"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILGenericVariance", ILGenericVariance);
export class ILGenericParameterDef {
  constructor(name, constraints, variance, hasReferenceTypeConstraint, hasNotNullableValueTypeConstraint, hasDefaultConstructorConstraint, customAttrsStored, metadataIndex) {
    this.Name = name;
    this.Constraints = constraints;
    this.Variance = variance;
    this.HasReferenceTypeConstraint = hasReferenceTypeConstraint;
    this.HasNotNullableValueTypeConstraint = hasNotNullableValueTypeConstraint;
    this.HasDefaultConstructorConstraint = hasDefaultConstructorConstraint;
    this.CustomAttrsStored = customAttrsStored;
    this.MetadataIndex = metadataIndex | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILGenericParameterDef",
      interfaces: ["FSharpRecord"],
      properties: {
        Name: "string",
        Constraints: makeGeneric(List, {
          T: ILType
        }),
        Variance: ILGenericVariance,
        HasReferenceTypeConstraint: "boolean",
        HasNotNullableValueTypeConstraint: "boolean",
        HasDefaultConstructorConstraint: "boolean",
        CustomAttrsStored: ILAttributesStored,
        MetadataIndex: "number"
      }
    };
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

  ToString() {
    return this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILGenericParameterDef", ILGenericParameterDef);
export function memberAccessOfFlags(flags) {
  const f_1 = flags & 7 | 0;

  if (f_1 === 1) {
    return new ILMemberAccess(4);
  } else if (f_1 === 6) {
    return new ILMemberAccess(5);
  } else if (f_1 === 4) {
    return new ILMemberAccess(3);
  } else if (f_1 === 2) {
    return new ILMemberAccess(1);
  } else if (f_1 === 5) {
    return new ILMemberAccess(2);
  } else if (f_1 === 3) {
    return new ILMemberAccess(0);
  } else {
    throw new Error("impossible: the flags parameter value is come from enums MethodAttributes and FieldAttributes must have access flag");
  }
}
export function convertMemberAccess(ilMemberAccess) {
  switch (ilMemberAccess.tag) {
    case 4:
      return 1;

    case 0:
      return 3;

    case 1:
      return 2;

    case 2:
      return 5;

    case 3:
      return 4;

    default:
      return 6;
  }
}
export const NoMetadataIdx = -1;
export class ILMethodDef {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodDef",
      properties: {
        Access: ILMemberAccess,
        Attributes: "number",
        Body: ILLazyMethodBody,
        CallingConv: ILCallingConv,
        CallingSignature: ILCallingSignature,
        Code: Option(ILCode),
        CustomAttrs: ILAttributes,
        CustomAttrsStored: ILAttributesStored,
        GenericParams: makeGeneric(List, {
          T: ILGenericParameterDef
        }),
        HasSecurity: "boolean",
        ImplAttributes: "number",
        IsAbstract: "boolean",
        IsAggressiveInline: "boolean",
        IsCheckAccessOnOverride: "boolean",
        IsClassInitializer: "boolean",
        IsConstructor: "boolean",
        IsEntryPoint: "boolean",
        IsFinal: "boolean",
        IsForwardRef: "boolean",
        IsHideBySig: "boolean",
        IsIL: "boolean",
        IsInternalCall: "boolean",
        IsManaged: "boolean",
        IsMustRun: "boolean",
        IsNewSlot: "boolean",
        IsNoInline: "boolean",
        IsNonVirtualInstance: "boolean",
        IsPreserveSig: "boolean",
        IsReqSecObj: "boolean",
        IsSpecialName: "boolean",
        IsStatic: "boolean",
        IsSynchronized: "boolean",
        IsUnmanagedExport: "boolean",
        IsVirtual: "boolean",
        IsZeroInit: "boolean",
        Locals: makeGeneric(List, {
          T: ILLocal
        }),
        MaxStack: "number",
        MetadataIndex: "number",
        MethodBody: ILMethodBody,
        Name: "string",
        ParameterTypes: makeGeneric(List, {
          T: ILType
        }),
        Parameters: makeGeneric(List, {
          T: ILParameter
        }),
        Return: ILReturn,
        SecurityDecls: ILSecurityDecls,
        SecurityDeclsStored: ILSecurityDeclsStored,
        SourceMarker: Option(ILSourceMarker),
        WithNewSlot: ILMethodDef,
        WithSpecialName: ILMethodDef
      }
    };
  }

  constructor(name, attributes, implAttributes, callingConv, parameters, ret, body, isEntryPoint, genericParams, securityDeclsStored, customAttrsStored, metadataIndex) {
    this.name = name;
    this.attributes = attributes | 0;
    this.implAttributes = implAttributes | 0;
    this.callingConv = callingConv;
    this.parameters = parameters;
    this.ret = ret;
    this.body = body;
    this.isEntryPoint = isEntryPoint;
    this.genericParams = genericParams;
    this.securityDeclsStored = securityDeclsStored;
    this.customAttrsStored = customAttrsStored;
    this.metadataIndex = metadataIndex | 0;
  }

  static CreateStored(name, attributes, implAttributes, callingConv, parameters, ret, body, isEntryPoint, genericParams, securityDeclsStored, customAttrsStored, metadataIndex) {
    return new ILMethodDef(name, attributes, implAttributes, callingConv, parameters, ret, body, isEntryPoint, genericParams, securityDeclsStored, customAttrsStored, metadataIndex);
  }

  static Create(name, attributes, implAttributes, callingConv, parameters, ret, body, isEntryPoint, genericParams, securityDecls, customAttrs) {
    return new ILMethodDef(name, attributes, implAttributes, callingConv, parameters, ret, body, isEntryPoint, genericParams, storeILSecurityDecls(securityDecls), storeILCustomAttrs(customAttrs), NoMetadataIdx);
  }

  get Name() {
    return this.name;
  }

  get Attributes() {
    return this.attributes;
  }

  get ImplAttributes() {
    return this.implAttributes;
  }

  get CallingConv() {
    return this.callingConv;
  }

  get Parameters() {
    return this.parameters;
  }

  get Return() {
    return this.ret;
  }

  get Body() {
    return this.body;
  }

  get SecurityDeclsStored() {
    return this.securityDeclsStored;
  }

  get IsEntryPoint() {
    return this.isEntryPoint;
  }

  get GenericParams() {
    return this.genericParams;
  }

  get CustomAttrsStored() {
    return this.customAttrsStored;
  }

  get MetadataIndex() {
    return this.metadataIndex;
  }

  With(name, attributes, implAttributes, callingConv, parameters, ret, body, securityDecls, isEntryPoint, genericParams, customAttrs) {
    return ILMethodDef.Create(name != null ? name : this.Name, attributes != null ? attributes : this.Attributes, implAttributes != null ? implAttributes : this.ImplAttributes, callingConv != null ? callingConv : this.CallingConv, parameters != null ? parameters : this.Parameters, ret != null ? ret : this.Return, body != null ? body : this.Body, isEntryPoint != null ? isEntryPoint : this.IsEntryPoint, genericParams != null ? genericParams : this.GenericParams, securityDecls != null ? getValue(securityDecls) : this.SecurityDecls, customAttrs != null ? getValue(customAttrs) : this.CustomAttrs);
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.metadataIndex);
  }

  get SecurityDecls() {
    return this.SecurityDeclsStored.GetSecurityDecls(this.MetadataIndex);
  }

  get ParameterTypes() {
    return typesOfILParams(this.Parameters);
  }

  get Code() {
    const matchValue = this.Body.Contents;

    if (matchValue.tag === 0) {
      return matchValue.data.Code;
    } else {
      return null;
    }
  }

  get IsIL() {
    const matchValue = this.Body.Contents;

    if (matchValue.tag === 0) {
      return true;
    } else {
      return false;
    }
  }

  get Locals() {
    const matchValue = this.Body.Contents;

    if (matchValue.tag === 0) {
      return matchValue.data.Locals;
    } else {
      return new List();
    }
  }

  get MethodBody() {
    const matchValue = this.Body.Contents;

    if (matchValue.tag === 0) {
      return matchValue.data;
    } else {
      throw new Error("not IL");
    }
  }

  get SourceMarker() {
    return this.MethodBody.SourceMarker;
  }

  get MaxStack() {
    return this.MethodBody.MaxStack;
  }

  get IsZeroInit() {
    return this.MethodBody.IsZeroInit;
  }

  get CallingSignature() {
    return mkILCallSig(this.CallingConv, this.ParameterTypes, this.Return.Type);
  }

  get IsClassInitializer() {
    return this.Name === ".cctor";
  }

  get IsConstructor() {
    return this.Name === ".ctor";
  }

  get Access() {
    return memberAccessOfFlags(this.Attributes);
  }

  get IsStatic() {
    return (this.Attributes & 16) !== 0;
  }

  get IsNonVirtualInstance() {
    return !this.IsStatic ? !this.IsVirtual : false;
  }

  get IsVirtual() {
    return (this.Attributes & 64) !== 0;
  }

  get IsFinal() {
    return (this.Attributes & 32) !== 0;
  }

  get IsNewSlot() {
    return (this.Attributes & 256) !== 0;
  }

  get IsCheckAccessOnOverride() {
    return (this.Attributes & 512) !== 0;
  }

  get IsAbstract() {
    return (this.Attributes & 1024) !== 0;
  }

  get IsHideBySig() {
    return (this.Attributes & 128) !== 0;
  }

  get IsSpecialName() {
    return (this.Attributes & 2048) !== 0;
  }

  get IsUnmanagedExport() {
    return (this.Attributes & 8) !== 0;
  }

  get IsReqSecObj() {
    return (this.Attributes & 32768) !== 0;
  }

  get HasSecurity() {
    return (this.Attributes & 16384) !== 0;
  }

  get IsManaged() {
    return (this.ImplAttributes & 0) !== 0;
  }

  get IsForwardRef() {
    return (this.ImplAttributes & 16) !== 0;
  }

  get IsInternalCall() {
    return (this.ImplAttributes & 4096) !== 0;
  }

  get IsPreserveSig() {
    return (this.ImplAttributes & 128) !== 0;
  }

  get IsSynchronized() {
    return (this.ImplAttributes & 32) !== 0;
  }

  get IsNoInline() {
    return (this.ImplAttributes & 8) !== 0;
  }

  get IsAggressiveInline() {
    return (this.ImplAttributes & 256) !== 0;
  }

  get IsMustRun() {
    return (this.ImplAttributes & 64) !== 0;
  }

  get WithSpecialName() {
    return this.With(null, this.Attributes | 2048);
  }

  WithHideBySig_0() {
    return this.With(null, this.IsVirtual ? this.Attributes & ~512 | 128 : (() => {
      throw new Error("WithHideBySig");
    })());
  }

  WithHideBySig_1(condition) {
    return this.With(null, (source => {
      const $var10 = 128;

      if (condition) {
        return source | $var10 | 0;
      } else {
        return source & applyOperator($var10, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithFinal(condition) {
    return this.With(null, (source => {
      const $var11 = 32;

      if (condition) {
        return source | $var11 | 0;
      } else {
        return source & applyOperator($var11, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithAbstract(condition) {
    return this.With(null, (source => {
      const $var12 = 1024;

      if (condition) {
        return source | $var12 | 0;
      } else {
        return source & applyOperator($var12, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithAccess(access) {
    return this.With(null, this.Attributes & ~7 | convertMemberAccess(access));
  }

  get WithNewSlot() {
    return this.With(null, this.Attributes | 256);
  }

  WithSecurity(condition) {
    return this.With(null, (source => {
      const $var13 = 16384;

      if (condition) {
        return source | $var13 | 0;
      } else {
        return source & applyOperator($var13, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithPInvoke(condition) {
    return this.With(null, (source => {
      const $var14 = 8192;

      if (condition) {
        return source | $var14 | 0;
      } else {
        return source & applyOperator($var14, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithPreserveSig(condition) {
    return this.With(null, null, (source => {
      const $var15 = 128;

      if (condition) {
        return source | $var15 | 0;
      } else {
        return source & applyOperator($var15, "op_LogicalNot") | 0;
      }
    })(this.ImplAttributes));
  }

  WithSynchronized(condition) {
    return this.With(null, null, (source => {
      const $var16 = 32;

      if (condition) {
        return source | $var16 | 0;
      } else {
        return source & applyOperator($var16, "op_LogicalNot") | 0;
      }
    })(this.ImplAttributes));
  }

  WithNoInlining(condition) {
    return this.With(null, null, (source => {
      const $var17 = 8;

      if (condition) {
        return source | $var17 | 0;
      } else {
        return source & applyOperator($var17, "op_LogicalNot") | 0;
      }
    })(this.ImplAttributes));
  }

  WithAggressiveInlining(condition) {
    return this.With(null, null, (source => {
      const $var18 = 256;

      if (condition) {
        return source | $var18 | 0;
      } else {
        return source & applyOperator($var18, "op_LogicalNot") | 0;
      }
    })(this.ImplAttributes));
  }

  WithRuntime(condition) {
    return this.With(null, null, (source => {
      const $var19 = 3;

      if (condition) {
        return source | $var19 | 0;
      } else {
        return source & applyOperator($var19, "op_LogicalNot") | 0;
      }
    })(this.ImplAttributes));
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodDef", ILMethodDef);
export class ILMethodDefs {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodDefs",
      interfaces: ["System.Collections.Generic.IEnumerable"],
      properties: {
        AsArray: _Array(ILMethodDef),
        AsList: makeGeneric(List, {
          T: ILMethodDef
        })
      }
    };
  }

  [Symbol.iterator]() {
    return toIterator(this.GetEnumerator());
  }

  constructor(f_1) {
    this.array = new InlineDelayInit(f_1);
    this.dict = new InlineDelayInit(() => {
      const arr = this.array.Value;
      const t = new Map();

      for (let i = arr.length - 1; i >= 0; i--) {
        const y = arr[i];
        const key = y.Name;

        if (t.has(key)) {
          t.set(key, new List(y, t.get(key)));
        } else {
          t.set(key, ofArray([y]));
        }
      }

      return t;
    });
  }

  get AsArray() {
    return this.array.Value;
  }

  get AsList() {
    return toList(this.array.Value);
  }

  FindByName(nm) {
    if (this.dict.Value.has(nm)) {
      return this.dict.Value.get(nm);
    } else {
      return new List();
    }
  }

  FindByNameAndArity(nm, arity) {
    return filter(x => x.Parameters.length === arity, this.FindByName(nm));
  }

  GetEnumerator() {
    return getEnumerator(this.array.Value);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodDefs", ILMethodDefs);
export class ILEventDef {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILEventDef",
      properties: {
        AddMethod: ILMethodRef,
        Attributes: "number",
        CustomAttrs: ILAttributes,
        CustomAttrsStored: ILAttributesStored,
        EventType: Option(ILType),
        FireMethod: Option(ILMethodRef),
        IsRTSpecialName: "boolean",
        IsSpecialName: "boolean",
        MetadataIndex: "number",
        Name: "string",
        OtherMethods: makeGeneric(List, {
          T: ILMethodRef
        }),
        RemoveMethod: ILMethodRef
      }
    };
  }

  constructor(eventType, name, attributes, addMethod, removeMethod, fireMethod, otherMethods, customAttrsStored, metadataIndex) {
    this.eventType = eventType;
    this.name = name;
    this.attributes = attributes | 0;
    this.addMethod = addMethod;
    this.removeMethod = removeMethod;
    this.fireMethod = fireMethod;
    this.otherMethods = otherMethods;
    this.customAttrsStored = customAttrsStored;
    this.metadataIndex = metadataIndex | 0;
  }

  static CreateStored(eventType, name, attributes, addMethod, removeMethod, fireMethod, otherMethods, customAttrsStored, metadataIndex) {
    return new ILEventDef(eventType, name, attributes, addMethod, removeMethod, fireMethod, otherMethods, customAttrsStored, metadataIndex);
  }

  static Create(eventType, name, attributes, addMethod, removeMethod, fireMethod, otherMethods, customAttrs) {
    return new ILEventDef(eventType, name, attributes, addMethod, removeMethod, fireMethod, otherMethods, storeILCustomAttrs(customAttrs), NoMetadataIdx);
  }

  get EventType() {
    return this.eventType;
  }

  get Name() {
    return this.name;
  }

  get Attributes() {
    return this.attributes;
  }

  get AddMethod() {
    return this.addMethod;
  }

  get RemoveMethod() {
    return this.removeMethod;
  }

  get FireMethod() {
    return this.fireMethod;
  }

  get OtherMethods() {
    return this.otherMethods;
  }

  get CustomAttrsStored() {
    return this.customAttrsStored;
  }

  get MetadataIndex() {
    return this.metadataIndex;
  }

  get CustomAttrs() {
    return this.customAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

  With(eventType, name, attributes, addMethod, removeMethod, fireMethod, otherMethods, customAttrs) {
    return ILEventDef.Create(eventType != null ? eventType : this.EventType, name != null ? name : this.Name, attributes != null ? attributes : this.Attributes, addMethod != null ? addMethod : this.AddMethod, removeMethod != null ? removeMethod : this.RemoveMethod, fireMethod != null ? fireMethod : this.FireMethod, otherMethods != null ? otherMethods : this.OtherMethods, customAttrs != null ? getValue(customAttrs) : this.CustomAttrs);
  }

  get IsSpecialName() {
    return (this.Attributes & 512) !== 0;
  }

  get IsRTSpecialName() {
    return (this.Attributes & 1024) !== 0;
  }

  ToString() {
    return "event " + this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILEventDef", ILEventDef);
export class ILEventDefs {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILEventDefs",
      interfaces: ["FSharpUnion"],
      cases: [["ILEvents", makeGeneric(LazyOrderedMultiMap, {
        Key: "string",
        Data: ILEventDef
      })]]
    };
  }

  get AsList() {
    return this.data.Entries();
  }

  LookupByName(s) {
    return this.data.get_Item(s);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILEventDefs", ILEventDefs);
export class ILPropertyDef {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILPropertyDef",
      properties: {
        Args: makeGeneric(List, {
          T: ILType
        }),
        Attributes: "number",
        CallingConv: ILThisConvention,
        CustomAttrs: ILAttributes,
        CustomAttrsStored: ILAttributesStored,
        GetMethod: Option(ILMethodRef),
        Init: Option(ILFieldInit),
        IsRTSpecialName: "boolean",
        IsSpecialName: "boolean",
        MetadataIndex: "number",
        Name: "string",
        PropertyType: ILType,
        SetMethod: Option(ILMethodRef)
      }
    };
  }

  constructor(name, attributes, setMethod, getMethod, callingConv, propertyType, init, args, customAttrsStored, metadataIndex) {
    this.name = name;
    this.attributes = attributes | 0;
    this.setMethod = setMethod;
    this.getMethod = getMethod;
    this.callingConv = callingConv;
    this.propertyType = propertyType;
    this.init = init;
    this.args = args;
    this.customAttrsStored = customAttrsStored;
    this.metadataIndex = metadataIndex | 0;
  }

  static CreateStored(name, attributes, setMethod, getMethod, callingConv, propertyType, init, args, customAttrsStored, metadataIndex) {
    return new ILPropertyDef(name, attributes, setMethod, getMethod, callingConv, propertyType, init, args, customAttrsStored, metadataIndex);
  }

  static Create(name, attributes, setMethod, getMethod, callingConv, propertyType, init, args, customAttrs) {
    return new ILPropertyDef(name, attributes, setMethod, getMethod, callingConv, propertyType, init, args, storeILCustomAttrs(customAttrs), NoMetadataIdx);
  }

  get Name() {
    return this.name;
  }

  get Attributes() {
    return this.attributes;
  }

  get GetMethod() {
    return this.getMethod;
  }

  get SetMethod() {
    return this.setMethod;
  }

  get CallingConv() {
    return this.callingConv;
  }

  get PropertyType() {
    return this.propertyType;
  }

  get Init() {
    return this.init;
  }

  get Args() {
    return this.args;
  }

  get CustomAttrsStored() {
    return this.customAttrsStored;
  }

  get CustomAttrs() {
    return this.customAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

  get MetadataIndex() {
    return this.metadataIndex;
  }

  With(name, attributes, setMethod, getMethod, callingConv, propertyType, init, args, customAttrs) {
    return ILPropertyDef.Create(name != null ? name : this.Name, attributes != null ? attributes : this.Attributes, setMethod != null ? setMethod : this.SetMethod, getMethod != null ? getMethod : this.GetMethod, callingConv != null ? callingConv : this.CallingConv, propertyType != null ? propertyType : this.PropertyType, init != null ? init : this.Init, args != null ? args : this.Args, customAttrs != null ? getValue(customAttrs) : this.CustomAttrs);
  }

  get IsSpecialName() {
    return (this.Attributes & 512) !== 0;
  }

  get IsRTSpecialName() {
    return (this.Attributes & 1024) !== 0;
  }

  ToString() {
    return "property " + this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILPropertyDef", ILPropertyDef);
export class ILPropertyDefs {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILPropertyDefs",
      interfaces: ["FSharpUnion"],
      cases: [["ILProperties", makeGeneric(LazyOrderedMultiMap, {
        Key: "string",
        Data: ILPropertyDef
      })]]
    };
  }

  get AsList() {
    return this.data.Entries();
  }

  LookupByName(s) {
    return this.data.get_Item(s);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILPropertyDefs", ILPropertyDefs);
export function convertFieldAccess(ilMemberAccess) {
  switch (ilMemberAccess.tag) {
    case 1:
      return 2;

    case 2:
      return 5;

    case 3:
      return 4;

    case 4:
      return 1;

    case 5:
      return 6;

    default:
      return 3;
  }
}
export class ILFieldDef {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldDef",
      properties: {
        Access: ILMemberAccess,
        Attributes: "number",
        CustomAttrs: ILAttributes,
        CustomAttrsStored: ILAttributesStored,
        Data: Option(_Array(Uint8Array, true)),
        FieldType: ILType,
        IsInitOnly: "boolean",
        IsLiteral: "boolean",
        IsSpecialName: "boolean",
        IsStatic: "boolean",
        LiteralValue: Option(ILFieldInit),
        Marshal: Option(ILNativeType),
        MetadataIndex: "number",
        Name: "string",
        NotSerialized: "boolean",
        Offset: Option("number")
      }
    };
  }

  constructor(name, fieldType, attributes, data, literalValue, offset, marshal, customAttrsStored, metadataIndex) {
    this.name = name;
    this.fieldType = fieldType;
    this.attributes = attributes | 0;
    this.data = data;
    this.literalValue = literalValue;
    this.offset = offset;
    this.marshal = marshal;
    this.customAttrsStored = customAttrsStored;
    this.metadataIndex = metadataIndex | 0;
  }

  static CreateStored(name, fieldType, attributes, data, literalValue, offset, marshal, customAttrsStored, metadataIndex) {
    return new ILFieldDef(name, fieldType, attributes, data, literalValue, offset, marshal, customAttrsStored, metadataIndex);
  }

  static Create(name, fieldType, attributes, data, literalValue, offset, marshal, customAttrs) {
    return new ILFieldDef(name, fieldType, attributes, data, literalValue, offset, marshal, storeILCustomAttrs(customAttrs), NoMetadataIdx);
  }

  get Name() {
    return this.name;
  }

  get FieldType() {
    return this.fieldType;
  }

  get Attributes() {
    return this.attributes;
  }

  get Data() {
    return this.data;
  }

  get LiteralValue() {
    return this.literalValue;
  }

  get Offset() {
    return this.offset;
  }

  get Marshal() {
    return this.marshal;
  }

  get CustomAttrsStored() {
    return this.customAttrsStored;
  }

  get CustomAttrs() {
    return this.customAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

  get MetadataIndex() {
    return this.metadataIndex;
  }

  With(name, fieldType, attributes, data, literalValue, offset, marshal, customAttrs) {
    return ILFieldDef.Create(name != null ? name : this.Name, fieldType != null ? fieldType : this.FieldType, attributes != null ? attributes : this.Attributes, data != null ? data : this.Data, literalValue != null ? literalValue : this.LiteralValue, offset != null ? offset : this.Offset, marshal != null ? marshal : this.Marshal, customAttrs != null ? customAttrs : this.CustomAttrs);
  }

  get IsStatic() {
    return (this.Attributes & 16) !== 0;
  }

  get IsSpecialName() {
    return (this.Attributes & 512) !== 0;
  }

  get IsLiteral() {
    return (this.Attributes & 64) !== 0;
  }

  get NotSerialized() {
    return (this.Attributes & 128) !== 0;
  }

  get IsInitOnly() {
    return (this.Attributes & 32) !== 0;
  }

  get Access() {
    return memberAccessOfFlags(this.Attributes);
  }

  WithAccess(access) {
    return this.With(null, null, this.Attributes & ~7 | convertFieldAccess(access));
  }

  WithInitOnly(condition) {
    return this.With(null, null, (source => {
      const $var20 = 32;

      if (condition) {
        return source | $var20 | 0;
      } else {
        return source & applyOperator($var20, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithStatic(condition) {
    return this.With(null, null, (source => {
      const $var21 = 16;

      if (condition) {
        return source | $var21 | 0;
      } else {
        return source & applyOperator($var21, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithSpecialName(condition) {
    var flagToAdd;
    return this.With(null, null, (flagToAdd = 512 | 1024 | 0, source => condition ? source | flagToAdd : source & ~flagToAdd)(this.Attributes));
  }

  WithNotSerialized(condition) {
    return this.With(null, null, (source => {
      const $var22 = 128;

      if (condition) {
        return source | $var22 | 0;
      } else {
        return source & applyOperator($var22, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithLiteralDefaultValue(literal) {
    var $var24;
    var $var23;
    return this.With(null, null, ($var24 = this.Attributes | 0, $var23 = 64 | 32768 | 0, CurriedLambda(() => literal != null)() ? applyOperator($var24, $var23, "op_BitwiseOr") : applyOperator($var24, applyOperator($var23, "op_LogicalNot"), "op_BitwiseAnd")), null, makeSome(literal));
  }

  WithFieldMarshal(marshal) {
    var $var26;
    var $var25;
    return this.With(null, null, ($var26 = this.Attributes | 0, $var25 = 4096, CurriedLambda(() => marshal != null)() ? applyOperator($var26, $var25, "op_BitwiseOr") : applyOperator($var26, applyOperator($var25, "op_LogicalNot"), "op_BitwiseAnd")), null, null, null, makeSome(marshal));
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldDef", ILFieldDef);
export class ILFieldDefs {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldDefs",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ILFields", makeGeneric(LazyOrderedMultiMap, {
        Key: "string",
        Data: ILFieldDef
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get AsList() {
    return this.data.Entries();
  }

  LookupByName(s) {
    return this.data.get_Item(s);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILFieldDefs", ILFieldDefs);
export class ILMethodImplDef {
  constructor(overrides, overrideBy) {
    this.Overrides = overrides;
    this.OverrideBy = overrideBy;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodImplDef",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Overrides: ILOverridesSpec,
        OverrideBy: ILMethodSpec
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodImplDef", ILMethodImplDef);
export class ILMethodImplDefs {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodImplDefs",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ILMethodImpls", Any]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get AsList() {
    return foldBack((_x, y, r) => append(y, r), this.data.value, new List());
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILMethodImplDefs", ILMethodImplDefs);
export class ILTypeDefLayout {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefLayout",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Auto"], ["Sequential", ILTypeDefLayoutInfo], ["Explicit", ILTypeDefLayoutInfo]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefLayout", ILTypeDefLayout);
export class ILTypeDefLayoutInfo {
  constructor(size, pack) {
    this.Size = size;
    this.Pack = pack;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefLayoutInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Size: Option("number"),
        Pack: Option("number")
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefLayoutInfo", ILTypeDefLayoutInfo);
export class ILTypeInit {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeInit",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["BeforeField"], ["OnAny"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeInit", ILTypeInit);
export class ILDefaultPInvokeEncoding {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILDefaultPInvokeEncoding",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Ansi"], ["Auto"], ["Unicode"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILDefaultPInvokeEncoding", ILDefaultPInvokeEncoding);
export class ILTypeDefAccess {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefAccess",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Public"], ["Private"], ["Nested", ILMemberAccess]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefAccess", ILTypeDefAccess);
export function typeAccessOfFlags(flags) {
  const f_1 = flags & 7 | 0;

  if (f_1 === 1) {
    return new ILTypeDefAccess(0);
  } else if (f_1 === 2) {
    return new ILTypeDefAccess(2, new ILMemberAccess(5));
  } else if (f_1 === 3) {
    return new ILTypeDefAccess(2, new ILMemberAccess(4));
  } else if (f_1 === 4) {
    return new ILTypeDefAccess(2, new ILMemberAccess(3));
  } else if (f_1 === 6) {
    return new ILTypeDefAccess(2, new ILMemberAccess(1));
  } else if (f_1 === 7) {
    return new ILTypeDefAccess(2, new ILMemberAccess(2));
  } else if (f_1 === 5) {
    return new ILTypeDefAccess(2, new ILMemberAccess(0));
  } else {
    return new ILTypeDefAccess(1);
  }
}
export function typeEncodingOfFlags(flags) {
  const f_1 = flags & 196608 | 0;

  if (f_1 === 131072) {
    return new ILDefaultPInvokeEncoding(1);
  } else if (f_1 === 65536) {
    return new ILDefaultPInvokeEncoding(2);
  } else {
    return new ILDefaultPInvokeEncoding(0);
  }
}
export class ILTypeDefKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Class"], ["ValueType"], ["Interface"], ["Enum"], ["Delegate"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefKind", ILTypeDefKind);
export function typeKindOfFlags(nm, _mdefs, _fdefs, _super, flags) {
  if ((flags & 32) !== 0) {
    return new ILTypeDefKind(2);
  } else {
    const patternInput = _super != null ? [getValue(_super).TypeSpec.Name === "System.Enum", getValue(_super).TypeSpec.Name === "System.Delegate", getValue(_super).TypeSpec.Name === "System.MulticastDelegate", getValue(_super).TypeSpec.Name === "System.ValueType" ? nm !== "System.Enum" : false] : [false, false, false, false];
    const selfIsMulticastDelegate = nm === "System.MulticastDelegate";

    if (patternInput[0]) {
      return new ILTypeDefKind(3);
    } else if ((patternInput[1] ? !selfIsMulticastDelegate : false) ? true : patternInput[2]) {
      return new ILTypeDefKind(4);
    } else if (patternInput[3]) {
      return new ILTypeDefKind(1);
    } else {
      return new ILTypeDefKind(0);
    }
  }
}
export function convertTypeAccessFlags(access) {
  if (access.tag === 1) {
    return 0;
  } else if (access.tag === 2) {
    if (access.data.tag === 4) {
      return 3;
    } else if (access.data.tag === 3) {
      return 4;
    } else if (access.data.tag === 1) {
      return 6;
    } else if (access.data.tag === 2) {
      return 7;
    } else if (access.data.tag === 0) {
      return 5;
    } else {
      return 2;
    }
  } else {
    return 1;
  }
}
export function convertTypeKind(kind) {
  switch (kind.tag) {
    case 1:
      return 0;

    case 2:
      return 128 | 32 | 0;

    case 3:
      return 0;

    case 4:
      return 0;

    default:
      return 0;
  }
}
export function convertLayout(layout) {
  if (layout.tag === 1) {
    return 8;
  } else if (layout.tag === 2) {
    return 16;
  } else {
    return 0;
  }
}
export function convertEncoding(encoding) {
  if (encoding.tag === 0) {
    return 0;
  } else if (encoding.tag === 2) {
    return 65536;
  } else {
    return 131072;
  }
}
export function convertToNestedTypeAccess(ilMemberAccess) {
  switch (ilMemberAccess.tag) {
    case 1:
      return 6;

    case 2:
      return 7;

    case 3:
      return 4;

    case 4:
      return 3;

    case 5:
      return 2;

    default:
      return 5;
  }
}
export function convertInitSemantics(init) {
  if (init.tag === 1) {
    return 0;
  } else {
    return 1048576;
  }
}
export class ILTypeDef {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDef",
      properties: {
        Access: ILTypeDefAccess,
        Attributes: "number",
        CustomAttrs: ILAttributes,
        CustomAttrsStored: ILAttributesStored,
        Encoding: ILDefaultPInvokeEncoding,
        Events: ILEventDefs,
        Extends: Option(ILType),
        Fields: ILFieldDefs,
        GenericParams: makeGeneric(List, {
          T: ILGenericParameterDef
        }),
        HasSecurity: "boolean",
        Implements: makeGeneric(List, {
          T: ILType
        }),
        IsAbstract: "boolean",
        IsClass: "boolean",
        IsComInterop: "boolean",
        IsDelegate: "boolean",
        IsEnum: "boolean",
        IsInterface: "boolean",
        IsSealed: "boolean",
        IsSerializable: "boolean",
        IsSpecialName: "boolean",
        IsStruct: "boolean",
        IsStructOrEnum: "boolean",
        Layout: ILTypeDefLayout,
        MetadataIndex: "number",
        MethodImpls: ILMethodImplDefs,
        Methods: ILMethodDefs,
        Name: "string",
        NestedTypes: ILTypeDefs,
        Properties: ILPropertyDefs,
        SecurityDecls: ILSecurityDecls,
        SecurityDeclsStored: ILSecurityDeclsStored
      }
    };
  }

  constructor(name, attributes, layout, _implements, genericParams, _extends, methods, nestedTypes, fields, methodImpls, events, properties, securityDeclsStored, customAttrsStored, metadataIndex) {
    this.name = name;
    this.attributes = attributes | 0;
    this.layout = layout;
    this.implements = _implements;
    this.genericParams = genericParams;
    this.extends = _extends;
    this.methods = methods;
    this.nestedTypes = nestedTypes;
    this.fields = fields;
    this.methodImpls = methodImpls;
    this.events = events;
    this.properties = properties;
    this.securityDeclsStored = securityDeclsStored;
    this.customAttrsStored = customAttrsStored;
    this.metadataIndex = metadataIndex | 0;
  }

  static CreateStored(name, attributes, layout, _implements, genericParams, _extends, methods, nestedTypes, fields, methodImpls, events, properties, securityDeclsStored, customAttrsStored, metadataIndex) {
    return new ILTypeDef(name, attributes, layout, _implements, genericParams, _extends, methods, nestedTypes, fields, methodImpls, events, properties, securityDeclsStored, customAttrsStored, metadataIndex);
  }

  static Create(name, attributes, layout, _implements, genericParams, _extends, methods, nestedTypes, fields, methodImpls, events, properties, securityDecls, customAttrs) {
    return new ILTypeDef(name, attributes, layout, _implements, genericParams, _extends, methods, nestedTypes, fields, methodImpls, events, properties, storeILSecurityDecls(securityDecls), storeILCustomAttrs(customAttrs), NoMetadataIdx);
  }

  get Name() {
    return this.name;
  }

  get Attributes() {
    return this.attributes;
  }

  get GenericParams() {
    return this.genericParams;
  }

  get Layout() {
    return this.layout;
  }

  get NestedTypes() {
    return this.nestedTypes;
  }

  get Implements() {
    return this.implements;
  }

  get Extends() {
    return this.extends;
  }

  get Methods() {
    return this.methods;
  }

  get SecurityDeclsStored() {
    return this.securityDeclsStored;
  }

  get Fields() {
    return this.fields;
  }

  get MethodImpls() {
    return this.methodImpls;
  }

  get Events() {
    return this.events;
  }

  get Properties() {
    return this.properties;
  }

  get CustomAttrsStored() {
    return this.customAttrsStored;
  }

  get MetadataIndex() {
    return this.metadataIndex;
  }

  With(name, attributes, layout, _implements, genericParams, _extends, methods, nestedTypes, fields, methodImpls, events, properties, customAttrs, securityDecls) {
    return ILTypeDef.Create(name != null ? name : this.Name, attributes != null ? attributes : this.Attributes, layout != null ? layout : this.Layout, _implements != null ? _implements : this.Implements, genericParams != null ? genericParams : this.GenericParams, _extends != null ? _extends : this.Extends, methods != null ? methods : this.Methods, nestedTypes != null ? nestedTypes : this.NestedTypes, fields != null ? fields : this.Fields, methodImpls != null ? methodImpls : this.MethodImpls, events != null ? events : this.Events, properties != null ? properties : this.Properties, securityDecls != null ? securityDecls : this.SecurityDecls, customAttrs != null ? customAttrs : this.CustomAttrs);
  }

  get CustomAttrs() {
    return this.customAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

  get SecurityDecls() {
    return this.SecurityDeclsStored.GetSecurityDecls(this.MetadataIndex);
  }

  get IsClass() {
    return typeKindOfFlags(this.Name, this.Methods, this.Fields, this.Extends, this.Attributes).Equals(new ILTypeDefKind(0));
  }

  get IsStruct() {
    return typeKindOfFlags(this.Name, this.Methods, this.Fields, this.Extends, this.Attributes).Equals(new ILTypeDefKind(1));
  }

  get IsInterface() {
    return typeKindOfFlags(this.Name, this.Methods, this.Fields, this.Extends, this.Attributes).Equals(new ILTypeDefKind(2));
  }

  get IsEnum() {
    return typeKindOfFlags(this.Name, this.Methods, this.Fields, this.Extends, this.Attributes).Equals(new ILTypeDefKind(3));
  }

  get IsDelegate() {
    return typeKindOfFlags(this.Name, this.Methods, this.Fields, this.Extends, this.Attributes).Equals(new ILTypeDefKind(4));
  }

  get Access() {
    return typeAccessOfFlags(this.Attributes);
  }

  get IsAbstract() {
    return (this.Attributes & 128) !== 0;
  }

  get IsSealed() {
    return (this.Attributes & 256) !== 0;
  }

  get IsSerializable() {
    return (this.Attributes & 8192) !== 0;
  }

  get IsComInterop() {
    return (this.Attributes & 4096) !== 0;
  }

  get IsSpecialName() {
    return (this.Attributes & 1024) !== 0;
  }

  get HasSecurity() {
    return (this.Attributes & 262144) !== 0;
  }

  get Encoding() {
    return typeEncodingOfFlags(this.Attributes);
  }

  get IsStructOrEnum() {
    return this.IsStruct ? true : this.IsEnum;
  }

  WithAccess(access) {
    return this.With(null, this.Attributes & ~7 | convertTypeAccessFlags(access));
  }

  WithNestedAccess(access) {
    return this.With(null, this.Attributes & ~7 | convertToNestedTypeAccess(access));
  }

  WithSealed(condition) {
    return this.With(null, (source => {
      const $var27 = 256;

      if (condition) {
        return source | $var27 | 0;
      } else {
        return source & applyOperator($var27, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithSerializable(condition) {
    return this.With(null, (source => {
      const $var28 = 8192;

      if (condition) {
        return source | $var28 | 0;
      } else {
        return source & applyOperator($var28, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithAbstract(condition) {
    return this.With(null, (source => {
      const $var29 = 128;

      if (condition) {
        return source | $var29 | 0;
      } else {
        return source & applyOperator($var29, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithImport(condition) {
    return this.With(null, (source => {
      const $var30 = 4096;

      if (condition) {
        return source | $var30 | 0;
      } else {
        return source & applyOperator($var30, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithHasSecurity(condition) {
    return this.With(null, (source => {
      const $var31 = 262144;

      if (condition) {
        return source | $var31 | 0;
      } else {
        return source & applyOperator($var31, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithLayout(layout) {
    return this.With(null, this.Attributes | convertLayout(layout), layout);
  }

  WithKind(kind) {
    return this.With(null, this.Attributes | convertTypeKind(kind), null, null, null, makeSome(kind.tag === 2 ? null : this.Extends));
  }

  WithEncoding(encoding) {
    return this.With(null, this.Attributes & ~196608 | convertEncoding(encoding));
  }

  WithSpecialName(condition) {
    return this.With(null, (source => {
      const $var32 = 1024;

      if (condition) {
        return source | $var32 | 0;
      } else {
        return source & applyOperator($var32, "op_LogicalNot") | 0;
      }
    })(this.Attributes));
  }

  WithInitSemantics(init) {
    return this.With(null, this.Attributes | convertInitSemantics(init));
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDef", ILTypeDef);
export class ILTypeDefs {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefs",
      interfaces: ["System.Collections.Generic.IEnumerable"],
      properties: {
        AsArray: _Array(ILTypeDef),
        AsArrayOfPreTypeDefs: _Array(ILPreTypeDef),
        AsList: makeGeneric(List, {
          T: ILTypeDef
        })
      }
    };
  }

  [Symbol.iterator]() {
    return toIterator(this.GetEnumerator());
  }

  constructor(f_1) {
    this.array = new InlineDelayInit(f_1);
    this.dict = new InlineDelayInit(() => {
      var $var33;
      const arr = this.array.Value;
      const t = create(null, fromEqualityComparer(($var33 = this, {
        GetHashCode(x) {
          return (obj => hash_1(obj))(x) | 0;
        },

        Equals(x, y) {
          return ((e1, e2) => equals(e1, e2))(x, y);
        },

        [_Symbol.reflection]() {
          return {
            interfaces: ["System.Collections.Generic.IEqualityComparer"]
          };
        }

      })));

      for (let idx = 0; idx <= arr.length - 1; idx++) {
        const pre = arr[idx];
        const key = [pre.Namespace, pre.Name];
        t.set(key, pre);
      }

      return t;
    });
  }

  get AsArray() {
    return Array.from(delay(() => map_2(pre => pre.GetTypeDef(), this.array.Value)));
  }

  get AsList() {
    return toList(delay(() => map_2(pre => pre.GetTypeDef(), this.array.Value)));
  }

  get AsArrayOfPreTypeDefs() {
    return this.array.Value;
  }

  FindByName(nm) {
    const patternInput = splitILTypeName(nm);
    return this.dict.Value.get([patternInput[0], patternInput[1]]).GetTypeDef();
  }

  GetEnumerator() {
    return getEnumerator(delay(() => map_2(pre => pre.GetTypeDef(), this.array.Value)));
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefs", ILTypeDefs);
export class ILPreTypeDef {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILPreTypeDef",
      properties: {
        MetadataIndex: "number",
        Name: "string",
        Namespace: makeGeneric(List, {
          T: "string"
        })
      }
    };
  }

  constructor(nameSpace, name, metadataIndex, storage) {
    this.nameSpace = nameSpace;
    this.name = name;
    this.metadataIndex = metadataIndex | 0;
    this.storage = storage;
    this.store = null;
  }

  get Namespace() {
    return this.nameSpace;
  }

  get Name() {
    return this.name;
  }

  get MetadataIndex() {
    return this.metadataIndex;
  }

  GetTypeDef() {
    const matchValue = this.store;

    if (matchValue == null) {
      if (this.storage.tag === 2) {
        this.store = this.storage.data();
        return this.store;
      } else if (this.storage.tag === 1) {
        this.store = this.storage.data(this.MetadataIndex);
        return this.store;
      } else {
        this.store = this.storage.data;
        return this.storage.data;
      }
    } else {
      return this.store;
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILPreTypeDef", ILPreTypeDef);
export class ILTypeDefStored {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefStored",
      interfaces: ["FSharpUnion"],
      cases: [["Given", ILTypeDef], ["Reader", _Function(["number", ILTypeDef])], ["Computed", _Function([Unit, ILTypeDef])]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeDefStored", ILTypeDefStored);
export function mkILTypeDefReader(f_1) {
  return new ILTypeDefStored(1, f_1);
}
export class ILNestedExportedType {
  constructor(name, access, nested, customAttrsStored, metadataIndex) {
    this.Name = name;
    this.Access = access;
    this.Nested = nested;
    this.CustomAttrsStored = customAttrsStored;
    this.MetadataIndex = metadataIndex | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILNestedExportedType",
      interfaces: ["FSharpRecord"],
      properties: {
        Name: "string",
        Access: ILMemberAccess,
        Nested: ILNestedExportedTypes,
        CustomAttrsStored: ILAttributesStored,
        MetadataIndex: "number"
      }
    };
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILNestedExportedType", ILNestedExportedType);
export class ILNestedExportedTypes {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILNestedExportedTypes",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ILNestedExportedTypes", Any]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get AsList() {
    return foldBack((_x, y, r) => new List(y, r), this.data.value, new List());
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILNestedExportedTypes", ILNestedExportedTypes);
export class ILExportedTypeOrForwarder {
  constructor(scopeRef, name, attributes, nested, customAttrsStored, metadataIndex) {
    this.ScopeRef = scopeRef;
    this.Name = name;
    this.Attributes = attributes | 0;
    this.Nested = nested;
    this.CustomAttrsStored = customAttrsStored;
    this.MetadataIndex = metadataIndex | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILExportedTypeOrForwarder",
      interfaces: ["FSharpRecord"],
      properties: {
        ScopeRef: ILScopeRef,
        Name: "string",
        Attributes: "number",
        Nested: ILNestedExportedTypes,
        CustomAttrsStored: ILAttributesStored,
        MetadataIndex: "number"
      }
    };
  }

  get Access() {
    return typeAccessOfFlags(this.Attributes);
  }

  get IsForwarder() {
    return (this.Attributes & 2097152) !== 0;
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILExportedTypeOrForwarder", ILExportedTypeOrForwarder);
export class ILExportedTypesAndForwarders {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILExportedTypesAndForwarders",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ILExportedTypesAndForwarders", Any]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get AsList() {
    return foldBack((_x, y, r) => new List(y, r), this.data.value, new List());
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILExportedTypesAndForwarders", ILExportedTypesAndForwarders);
export class ILResourceAccess {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILResourceAccess",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Public"], ["Private"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILResourceAccess", ILResourceAccess);
export class ILResourceLocation {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILResourceLocation",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["LocalIn", "string", "number", "number"], ["LocalOut", _Array(Uint8Array, true)], ["File", ILModuleRef, "number"], ["Assembly", ILAssemblyRef]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILResourceLocation", ILResourceLocation);
export class ILResource {
  constructor(name, location, access, customAttrsStored, metadataIndex) {
    this.Name = name;
    this.Location = location;
    this.Access = access;
    this.CustomAttrsStored = customAttrsStored;
    this.MetadataIndex = metadataIndex | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILResource",
      interfaces: ["FSharpRecord"],
      properties: {
        Name: "string",
        Location: ILResourceLocation,
        Access: ILResourceAccess,
        CustomAttrsStored: ILAttributesStored,
        MetadataIndex: "number"
      }
    };
  }

  GetBytes() {
    if (this.Location.tag === 1) {
      return this.Location.data;
    } else {
      throw new Error("GetBytes");
    }
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILResource", ILResource);
export class ILResources {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILResources",
      interfaces: ["FSharpUnion"],
      cases: [["ILResources", makeGeneric(List, {
        T: ILResource
      })]]
    };
  }

  get AsList() {
    return this.data;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILResources", ILResources);
export class ILAssemblyLongevity {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILAssemblyLongevity",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Unspecified"], ["Library"], ["PlatformAppDomain"], ["PlatformProcess"], ["PlatformSystem"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILAssemblyLongevity", ILAssemblyLongevity);
export class ILAssemblyManifest {
  constructor(name, auxModuleHashAlgorithm, securityDeclsStored, publicKey, version, locale, customAttrsStored, assemblyLongevity, disableJitOptimizations, jitTracking, ignoreSymbolStoreSequencePoints, retargetable, exportedTypes, entrypointElsewhere, metadataIndex) {
    this.Name = name;
    this.AuxModuleHashAlgorithm = auxModuleHashAlgorithm | 0;
    this.SecurityDeclsStored = securityDeclsStored;
    this.PublicKey = publicKey;
    this.Version = version;
    this.Locale = locale;
    this.CustomAttrsStored = customAttrsStored;
    this.AssemblyLongevity = assemblyLongevity;
    this.DisableJitOptimizations = disableJitOptimizations;
    this.JitTracking = jitTracking;
    this.IgnoreSymbolStoreSequencePoints = ignoreSymbolStoreSequencePoints;
    this.Retargetable = retargetable;
    this.ExportedTypes = exportedTypes;
    this.EntrypointElsewhere = entrypointElsewhere;
    this.MetadataIndex = metadataIndex | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILAssemblyManifest",
      interfaces: ["FSharpRecord"],
      properties: {
        Name: "string",
        AuxModuleHashAlgorithm: "number",
        SecurityDeclsStored: ILSecurityDeclsStored,
        PublicKey: Option(_Array(Uint8Array, true)),
        Version: Option(Tuple(["number", "number", "number", "number"])),
        Locale: Option("string"),
        CustomAttrsStored: ILAttributesStored,
        AssemblyLongevity: ILAssemblyLongevity,
        DisableJitOptimizations: "boolean",
        JitTracking: "boolean",
        IgnoreSymbolStoreSequencePoints: "boolean",
        Retargetable: "boolean",
        ExportedTypes: ILExportedTypesAndForwarders,
        EntrypointElsewhere: Option(ILModuleRef),
        MetadataIndex: "number"
      }
    };
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

  get SecurityDecls() {
    return this.SecurityDeclsStored.GetSecurityDecls(this.MetadataIndex);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILAssemblyManifest", ILAssemblyManifest);
export class ILNativeResource {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILNativeResource",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["In", "string", "number", "number", "number"], ["Out", _Array(Uint8Array, true)]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILNativeResource", ILNativeResource);
export class ILModuleDef {
  constructor(manifest, name, typeDefs, subsystemVersion, useHighEntropyVA, subSystemFlags, isDLL, isILOnly, platform, stackReserveSize, is32Bit, is32BitPreferred, is64Bit, virtualAlignment, physicalAlignment, imageBase, metadataVersion, resources, nativeResources, customAttrsStored, metadataIndex) {
    this.Manifest = manifest;
    this.Name = name;
    this.TypeDefs = typeDefs;
    this.SubsystemVersion = subsystemVersion;
    this.UseHighEntropyVA = useHighEntropyVA;
    this.SubSystemFlags = subSystemFlags | 0;
    this.IsDLL = isDLL;
    this.IsILOnly = isILOnly;
    this.Platform = platform;
    this.StackReserveSize = stackReserveSize;
    this.Is32Bit = is32Bit;
    this.Is32BitPreferred = is32BitPreferred;
    this.Is64Bit = is64Bit;
    this.VirtualAlignment = virtualAlignment | 0;
    this.PhysicalAlignment = physicalAlignment | 0;
    this.ImageBase = imageBase | 0;
    this.MetadataVersion = metadataVersion;
    this.Resources = resources;
    this.NativeResources = nativeResources;
    this.CustomAttrsStored = customAttrsStored;
    this.MetadataIndex = metadataIndex | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILModuleDef",
      interfaces: ["FSharpRecord"],
      properties: {
        Manifest: Option(ILAssemblyManifest),
        Name: "string",
        TypeDefs: ILTypeDefs,
        SubsystemVersion: Tuple(["number", "number"]),
        UseHighEntropyVA: "boolean",
        SubSystemFlags: "number",
        IsDLL: "boolean",
        IsILOnly: "boolean",
        Platform: Option(ILPlatform),
        StackReserveSize: Option("number"),
        Is32Bit: "boolean",
        Is32BitPreferred: "boolean",
        Is64Bit: "boolean",
        VirtualAlignment: "number",
        PhysicalAlignment: "number",
        ImageBase: "number",
        MetadataVersion: "string",
        Resources: ILResources,
        NativeResources: makeGeneric(List, {
          T: ILNativeResource
        }),
        CustomAttrsStored: ILAttributesStored,
        MetadataIndex: "number"
      }
    };
  }

  get ManifestOfAssembly() {
    if (this.Manifest == null) {
      throw new Error("no manifest.  It is possible you are using an auxiliary module of an assembly in a context where the main module of an assembly is expected.  Typically the main module of an assembly must be specified first within a list of the modules in an assembly.");
    } else {
      return getValue(this.Manifest);
    }
  }

  get HasManifest() {
    return this.Manifest == null ? false : true;
  }

  get CustomAttrs() {
    return this.CustomAttrsStored.GetCustomAttrs(this.MetadataIndex);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILModuleDef", ILModuleDef);
export const mkILEmptyGenericParams = new List();
export const emptyILGenericArgsList = new List();
export function mkILNestedTyRef(scope, l, nm) {
  return ILTypeRef.Create(scope, l, nm);
}
export function mkILTyRef(scope, nm) {
  return mkILNestedTyRef(scope, new List(), nm);
}
export function mkILTySpec(tref, inst) {
  return ILTypeSpec.Create(tref, inst);
}
export function mkILNonGenericTySpec(tref) {
  return mkILTySpec(tref, new List());
}
export function mkILTyRefInTyRef(tref, nm) {
  return mkILNestedTyRef(tref.Scope, append(tref.Enclosing, ofArray([tref.Name])), nm);
}
export function mkILTy(boxed, tspec) {
  if (boxed.tag === 0) {
    return mkILBoxedType(tspec);
  } else {
    return new ILType(2, tspec);
  }
}
export function mkILNamedTy(vc, tref, tinst) {
  return mkILTy(vc, ILTypeSpec.Create(tref, tinst));
}
export function mkILValueTy(tref, tinst) {
  return mkILNamedTy(new ILBoxity(1), tref, tinst);
}
export function mkILBoxedTy(tref, tinst) {
  return mkILNamedTy(new ILBoxity(0), tref, tinst);
}
export function mkILNonGenericValueTy(tref) {
  return mkILNamedTy(new ILBoxity(1), tref, new List());
}
export function mkILNonGenericBoxedTy(tref) {
  return mkILNamedTy(new ILBoxity(0), tref, new List());
}
export function mkSimpleAssRef(n) {
  return ILAssemblyRef.Create(n, null, null, false, null, null);
}
export function mkSimpleModRef(n) {
  return ILModuleRef.Create(n, true, null);
}
export const typeNameForGlobalFunctions = "<Module>";
export function mkILTypeForGlobalFunctions(scoref) {
  return mkILBoxedType(mkILNonGenericTySpec(ILTypeRef.Create(scoref, new List(), typeNameForGlobalFunctions)));
}
export function isTypeNameForGlobalFunctions(d) {
  return d === typeNameForGlobalFunctions;
}
export function mkILMethRef(tref, callconv, nm, gparams, args, rty) {
  return new ILMethodRef(tref, callconv, gparams, nm, args, rty);
}
export function mkILMethSpecForMethRefInTy(mref, typ, minst) {
  return new ILMethodSpec(mref, typ, minst);
}
export function mkILMethSpec(mref, vc, tinst, minst) {
  return mkILMethSpecForMethRefInTy(mref, mkILNamedTy(vc, mref.DeclaringTypeRef, tinst), minst);
}
export function mk_mspec_in_tref(tref, vc, cc, nm, args, rty, tinst, minst) {
  return mkILMethSpec(mkILMethRef(tref, cc, nm, minst.length, args, rty), vc, tinst, minst);
}
export function mkILMethSpecInTy(typ, cc, nm, args, rty, minst) {
  return mkILMethSpecForMethRefInTy(mkILMethRef(typ.TypeRef, cc, nm, minst.length, args, rty), typ, minst);
}
export function mkILNonGenericMethSpecInTy(typ, cc, nm, args, rty) {
  return mkILMethSpecInTy(typ, cc, nm, args, rty, new List());
}
export function mkILInstanceMethSpecInTy(typ, nm, args, rty, minst) {
  return mkILMethSpecInTy(typ, ILCallingConv.Instance, nm, args, rty, minst);
}
export function mkILNonGenericInstanceMethSpecInTy(typ, nm, args, rty) {
  return mkILInstanceMethSpecInTy(typ, nm, args, rty, new List());
}
export function mkILStaticMethSpecInTy(typ, nm, args, rty, minst) {
  return mkILMethSpecInTy(typ, ILCallingConv.Static, nm, args, rty, minst);
}
export function mkILNonGenericStaticMethSpecInTy(typ, nm, args, rty) {
  return mkILStaticMethSpecInTy(typ, nm, args, rty, new List());
}
export function mkILCtorMethSpec(tref, args, cinst) {
  return mk_mspec_in_tref(tref, new ILBoxity(0), ILCallingConv.Instance, ".ctor", args, new ILType(0), cinst, new List());
}
export function mkILCtorMethSpecForTy(ty, args) {
  return mkILMethSpecInTy(ty, ILCallingConv.Instance, ".ctor", args, new ILType(0), new List());
}
export function mkILNonGenericCtorMethSpec(tref, args) {
  return mkILCtorMethSpec(tref, args, new List());
}
export function mkILFieldRef(tref, nm, ty) {
  return new ILFieldRef(tref, nm, ty);
}
export function mkILFieldSpec(tref, ty) {
  return new ILFieldSpec(tref, ty);
}
export function mkILFieldSpecInTy(typ, nm, fty) {
  return mkILFieldSpec(mkILFieldRef(typ.TypeRef, nm, fty), typ);
}
export function andTailness(x, y) {
  const $var34 = x.tag === 0 ? y ? [0] : [1] : [1];

  switch ($var34[0]) {
    case 0:
      return new ILTailcall(0);

    case 1:
      return new ILTailcall(1);
  }
}
export function formatCodeLabel(x) {
  return "L" + x.toString();
}
export const codeLabelCount = {
  contents: 0
};
export function generateCodeLabel() {
  codeLabelCount.contents = codeLabelCount.contents + 1 | 0;
  return codeLabelCount.contents | 0;
}
export function instrIsRet(i) {
  if (i.tag === 47) {
    return true;
  } else {
    return false;
  }
}
export function nonBranchingInstrsToCode(instrs) {
  const instrs_1 = Array.from(instrs);
  const instrs_2 = (instrs_1.length !== 0 ? instrIsRet(last_1(instrs_1)) : false) ? instrs_1 : instrs_1.concat([new ILInstr(47)]);
  return new ILCode(new Map(), instrs_2, new List(), new List());
}
export function mkILTyvarTy(tv) {
  return new ILType(7, tv);
}
export function mkILSimpleTypar(nm) {
  return new ILGenericParameterDef(nm, new List(), new ILGenericVariance(0), false, false, false, storeILCustomAttrs(emptyILCustomAttrs), NoMetadataIdx);
}
export function gparam_of_gactual(_ga) {
  return mkILSimpleTypar("T");
}
export function mkILFormalTypars(x) {
  return map_1(function (_ga) {
    return gparam_of_gactual(_ga);
  }, x);
}
export function mkILFormalGenericArgs(numtypars, gparams) {
  return mapIndexed(function (n, _gf) {
    return mkILTyvarTy(numtypars + n & 0xFFFF);
  }, gparams);
}
export function mkILFormalBoxedTy(tref, gparams) {
  return mkILBoxedTy(tref, mkILFormalGenericArgs(0, gparams));
}
export function mkILFormalNamedTy(bx, tref, gparams) {
  return mkILNamedTy(bx, tref, mkILFormalGenericArgs(0, gparams));
}
export function mkRefForNestedILTypeDef(scope, enc, td) {
  return mkILNestedTyRef(scope, map_1(function (etd) {
    return etd.Name;
  }, enc), td.Name);
}
export function mkILPreTypeDef(td) {
  const patternInput = splitILTypeName(td.Name);
  return new ILPreTypeDef(patternInput[0], patternInput[1], NoMetadataIdx, new ILTypeDefStored(0, td));
}
export function mkILPreTypeDefComputed(ns, n, f_1) {
  return new ILPreTypeDef(ns, n, NoMetadataIdx, new ILTypeDefStored(2, f_1));
}
export function mkILPreTypeDefRead(ns, n, idx, f_1) {
  return new ILPreTypeDef(ns, n, idx, f_1);
}
export function addILTypeDef(td, tdefs) {
  return new ILTypeDefs(function () {
    return Array.from(delay(function () {
      return append_1(singleton(mkILPreTypeDef(td)), delay(function () {
        return tdefs.AsArrayOfPreTypeDefs;
      }));
    }));
  });
}
export function mkILTypeDefsFromArray(l) {
  return new ILTypeDefs(function () {
    return map(function (arg00_) {
      return mkILPreTypeDef(arg00_);
    }, l, Array);
  });
}
export function mkILTypeDefs(l) {
  return mkILTypeDefsFromArray(Array.from(l));
}
export function mkILTypeDefsComputed(f_1) {
  return new ILTypeDefs(f_1);
}
export const emptyILTypeDefs = mkILTypeDefsFromArray([]);
export function mkILMethodsFromArray(xs) {
  return new ILMethodDefs(function () {
    return xs;
  });
}
export function mkILMethods(xs) {
  return mkILMethodsFromArray(Array.from(xs));
}
export function mkILMethodsComputed(f_1) {
  return new ILMethodDefs(f_1);
}
export const emptyILMethods = mkILMethodsFromArray([]);
export function filterILMethodDefs(f_1, mdefs) {
  return new ILMethodDefs(function () {
    return function (array) {
      return array.filter(f_1);
    }(mdefs.AsArray);
  });
}
export const defaultSubSystem = 3;
export const defaultPhysAlignment = 512;
export const defaultVirtAlignment = 8192;
export const defaultImageBase = 55508992;
export function mkILArrTy(ty, shape) {
  return new ILType(1, [shape, ty]);
}
export function mkILArr1DTy(ty) {
  return mkILArrTy(ty, ILArrayShape.SingleDimensional);
}
export function isILArrTy(ty) {
  if (ty.tag === 1) {
    return true;
  } else {
    return false;
  }
}
export function destILArrTy(ty) {
  if (ty.tag === 1) {
    return [ty.data[0], ty.data[1]];
  } else {
    throw new Error("destILArrTy");
  }
}
export class ILGlobals {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILGlobals",
      properties: {
        primaryAssemblyName: "string",
        primaryAssemblyScopeRef: ILScopeRef,
        typ_Array: ILType,
        typ_Bool: ILType,
        typ_Byte: ILType,
        typ_Char: ILType,
        typ_Double: ILType,
        typ_Int16: ILType,
        typ_Int32: ILType,
        typ_Int64: ILType,
        typ_IntPtr: ILType,
        typ_Object: ILType,
        typ_SByte: ILType,
        typ_Single: ILType,
        typ_String: ILType,
        typ_Type: ILType,
        typ_UInt16: ILType,
        typ_UInt32: ILType,
        typ_UInt64: ILType,
        typ_UIntPtr: ILType
      }
    };
  }

  constructor(primaryScopeRef) {
    this.primaryScopeRef = primaryScopeRef;
    this.m_typ_Object = mkILBoxedType(mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Object")));
    this.m_typ_String = mkILBoxedType(mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.String")));
    this.m_typ_Array = mkILBoxedType(mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Array")));
    this.m_typ_Type = mkILBoxedType(mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Type")));
    this.m_typ_SByte = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.SByte")));
    this.m_typ_Int16 = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Int16")));
    this.m_typ_Int32 = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Int32")));
    this.m_typ_Int64 = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Int64")));
    this.m_typ_Byte = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Byte")));
    this.m_typ_UInt16 = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.UInt16")));
    this.m_typ_UInt32 = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.UInt32")));
    this.m_typ_UInt64 = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.UInt64")));
    this.m_typ_Single = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Single")));
    this.m_typ_Double = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Double")));
    this.m_typ_Bool = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Boolean")));
    this.m_typ_Char = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.Char")));
    this.m_typ_IntPtr = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.IntPtr")));
    this.m_typ_UIntPtr = new ILType(2, mkILNonGenericTySpec(this.m_mkSysILTypeRef("System.UIntPtr")));
  }

  get primaryAssemblyScopeRef() {
    return this.m_typ_Object.TypeRef.Scope;
  }

  get primaryAssemblyName() {
    return this.m_typ_Object.TypeRef.Scope.AssemblyRef.Name;
  }

  get typ_Object() {
    return this.m_typ_Object;
  }

  get typ_String() {
    return this.m_typ_String;
  }

  get typ_Array() {
    return this.m_typ_Array;
  }

  get typ_Type() {
    return this.m_typ_Type;
  }

  get typ_IntPtr() {
    return this.m_typ_IntPtr;
  }

  get typ_UIntPtr() {
    return this.m_typ_UIntPtr;
  }

  get typ_Byte() {
    return this.m_typ_Byte;
  }

  get typ_Int16() {
    return this.m_typ_Int16;
  }

  get typ_Int32() {
    return this.m_typ_Int32;
  }

  get typ_Int64() {
    return this.m_typ_Int64;
  }

  get typ_SByte() {
    return this.m_typ_SByte;
  }

  get typ_UInt16() {
    return this.m_typ_UInt16;
  }

  get typ_UInt32() {
    return this.m_typ_UInt32;
  }

  get typ_UInt64() {
    return this.m_typ_UInt64;
  }

  get typ_Single() {
    return this.m_typ_Single;
  }

  get typ_Double() {
    return this.m_typ_Double;
  }

  get typ_Bool() {
    return this.m_typ_Bool;
  }

  get typ_Char() {
    return this.m_typ_Char;
  }

  ToString() {
    return "<ILGlobals>";
  }

  m_mkSysILTypeRef(nm) {
    return mkILTyRef(this.primaryScopeRef, nm);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILGlobals", ILGlobals);
export function mkILGlobals(primaryScopeRef) {
  return new ILGlobals(primaryScopeRef);
}
export function mkNormalCall(mspec) {
  return new ILInstr(48, [new ILTailcall(1), mspec, null]);
}
export function mkNormalCallvirt(mspec) {
  return new ILInstr(49, [new ILTailcall(1), mspec, null]);
}
export function mkNormalCallconstraint(ty, mspec) {
  return new ILInstr(50, [new ILTailcall(1), ty, mspec, null]);
}
export function mkNormalNewobj(mspec) {
  return new ILInstr(53, [mspec, null]);
}
export const ldargs = Array.from(delay(function () {
  return map_2(function (i) {
    return new ILInstr(35, i & 0xFFFF);
  }, range(0, 128));
}));
export function mkLdarg(i) {
  if (0 < i ? i < (ldargs.length & 0xFFFF) : false) {
    return ldargs[~~i];
  } else {
    return new ILInstr(35, i);
  }
}
export const mkLdarg0 = mkLdarg(0);
export const ldlocs = Array.from(delay(function () {
  return map_2(function (i) {
    return new ILInstr(38, i & 0xFFFF);
  }, range(0, 512));
}));
export function mkLdloc(i) {
  if (0 < i ? i < (ldlocs.length & 0xFFFF) : false) {
    return ldlocs[~~i];
  } else {
    return new ILInstr(38, i);
  }
}
export const stlocs = Array.from(delay(function () {
  return map_2(function (i) {
    return new ILInstr(42, i & 0xFFFF);
  }, range(0, 512));
}));
export function mkStloc(i) {
  if (0 < i ? i < (stlocs.length & 0xFFFF) : false) {
    return stlocs[~~i];
  } else {
    return new ILInstr(42, i);
  }
}
export const ldi32s = Array.from(delay(function () {
  return map_2(function (i) {
    return new ILInstr(34, [new ILBasicType(5), new ILConst(0, i)]);
  }, range(0, 256));
}));
export function mkLdcInt32(i) {
  if (0 < i ? i < ldi32s.length : false) {
    return ldi32s[i];
  } else {
    return new ILInstr(34, [new ILBasicType(5), new ILConst(0, i)]);
  }
}
export const tname_CompilerGeneratedAttribute = "System.Runtime.CompilerServices.CompilerGeneratedAttribute";
export const tname_DebuggableAttribute = "System.Diagnostics.DebuggableAttribute";
export const ecmaPublicKey = new PublicKey(1, Bytes.ofInt32Array(new Int32Array([222, 173, 190, 239, 202, 254, 250, 206])));
export function isILBoxedTy(_arg1) {
  if (_arg1.tag === 3) {
    return true;
  } else {
    return false;
  }
}
export function isILValueTy(_arg1) {
  if (_arg1.tag === 2) {
    return true;
  } else {
    return false;
  }
}
export function isPrimaryAssemblyTySpec(tspec, n) {
  const tref = tspec.TypeRef;
  const scoref = tref.Scope;

  if (tref.Name === n) {
    if (scoref.tag === 1) {
      return false;
    } else if (scoref.tag === 0) {
      return true;
    } else {
      return PrimaryAssembly.IsSomePrimaryAssembly(scoref.data.Name);
    }
  } else {
    return false;
  }
}
export function isILBoxedPrimaryAssemblyTy(ty, n) {
  if (isILBoxedTy(ty)) {
    return isPrimaryAssemblyTySpec(ty.TypeSpec, n);
  } else {
    return false;
  }
}
export function isILValuePrimaryAssemblyTy(ty, n) {
  if (isILValueTy(ty)) {
    return isPrimaryAssemblyTySpec(ty.TypeSpec, n);
  } else {
    return false;
  }
}
export function isILObjectTy(ty) {
  return isILBoxedPrimaryAssemblyTy(ty, "System.Object");
}
export function isILStringTy(ty) {
  return isILBoxedPrimaryAssemblyTy(ty, "System.String");
}
export function isILTypedReferenceTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.TypedReference");
}
export function isILSByteTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.SByte");
}
export function isILByteTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.Byte");
}
export function isILInt16Ty(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.Int16");
}
export function isILUInt16Ty(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.UInt16");
}
export function isILInt32Ty(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.Int32");
}
export function isILUInt32Ty(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.UInt32");
}
export function isILInt64Ty(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.Int64");
}
export function isILUInt64Ty(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.UInt64");
}
export function isILIntPtrTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.IntPtr");
}
export function isILUIntPtrTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.UIntPtr");
}
export function isILBoolTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.Boolean");
}
export function isILCharTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.Char");
}
export function isILSingleTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.Single");
}
export function isILDoubleTy(ty) {
  return isILValuePrimaryAssemblyTy(ty, "System.Double");
}
export function rescopeILScopeRef(scoref, scoref1) {
  const matchValue = [scoref, scoref1];
  const $var35 = matchValue[1].tag === 0 ? [0] : matchValue[1].tag === 1 ? matchValue[0].tag === 0 ? [1] : matchValue[0].tag === 1 ? [2] : [2] : matchValue[0].tag === 0 ? [1] : matchValue[0].tag === 1 ? [3] : [4];

  switch ($var35[0]) {
    case 0:
      return scoref;

    case 1:
      return scoref1;

    case 2:
      return scoref;

    case 3:
      return scoref1;

    case 4:
      return scoref1;
  }
}
export function rescopeILTypeRef(scoref, tref1) {
  const scoref1 = tref1.Scope;
  const scoref2 = rescopeILScopeRef(scoref, scoref1);

  if (scoref1 === scoref2) {
    return tref1;
  } else {
    return ILTypeRef.Create(scoref2, tref1.Enclosing, tref1.Name);
  }
}
export function rescopeILTypeSpec(scoref, tspec1) {
  const tref1 = tspec1.TypeRef;
  const tinst1 = tspec1.GenericArgs;
  const tref2 = rescopeILTypeRef(scoref, tref1);

  if (tref1 === tref2) {
    if (tinst1.tail == null) {
      return tspec1;
    } else {
      const tinst2 = rescopeILTypes(scoref, tinst1);

      if (tinst1 === tinst2) {
        return tspec1;
      } else {
        return ILTypeSpec.Create(tref2, tinst2);
      }
    }
  } else {
    const tinst2_1 = rescopeILTypes(scoref, tinst1);
    return ILTypeSpec.Create(tref2, tinst2_1);
  }
}
export function rescopeILType(scoref, typ) {
  switch (typ.tag) {
    case 4:
      return new ILType(4, rescopeILType(scoref, typ.data));

    case 6:
      return new ILType(6, rescopeILCallSig(scoref, typ.data));

    case 5:
      return new ILType(5, rescopeILType(scoref, typ.data));

    case 3:
      const cr2 = rescopeILTypeSpec(scoref, typ.data);

      if (typ.data === cr2) {
        return typ;
      } else {
        return mkILBoxedType(cr2);
      }

    case 1:
      const ety2 = rescopeILType(scoref, typ.data[1]);

      if (typ.data[1] === ety2) {
        return typ;
      } else {
        return new ILType(1, [typ.data[0], ety2]);
      }

    case 2:
      const cr2_1 = rescopeILTypeSpec(scoref, typ.data);

      if (typ.data === cr2_1) {
        return typ;
      } else {
        return new ILType(2, cr2_1);
      }

    case 8:
      return new ILType(8, [typ.data[0], rescopeILTypeRef(scoref, typ.data[1]), rescopeILType(scoref, typ.data[2])]);

    default:
      return typ;
  }
}
export function rescopeILTypes(scoref, i) {
  if (i.tail == null) {
    return i;
  } else {
    return List_1.mapq(function (arg10_) {
      return rescopeILType(scoref, arg10_);
    }, i);
  }
}
export function rescopeILCallSig(scoref, csig) {
  return mkILCallSig(csig.CallingConv, rescopeILTypes(scoref, csig.ArgTypes), rescopeILType(scoref, csig.ReturnType));
}
export function rescopeILMethodRef(scoref, x) {
  return new ILMethodRef(rescopeILTypeRef(scoref, x.DeclaringTypeRef), x.mrefCallconv, x.mrefGenericArity, x.mrefName, rescopeILTypes(scoref, x.mrefArgs), rescopeILType(scoref, x.mrefReturn));
}
export function rescopeILFieldRef(scoref, x) {
  return new ILFieldRef(rescopeILTypeRef(scoref, x.DeclaringTypeRef), x.Name, rescopeILType(scoref, x.Type));
}
export function instILTypeSpecAux(numFree, inst, tspec) {
  return ILTypeSpec.Create(tspec.TypeRef, instILGenericArgsAux(numFree, inst, tspec.GenericArgs));
}
export function instILTypeAux(numFree, inst, typ) {
  switch (typ.tag) {
    case 4:
      return new ILType(4, instILTypeAux(numFree, inst, typ.data));

    case 6:
      return new ILType(6, instILCallSigAux(numFree, inst, typ.data));

    case 1:
      return new ILType(1, [typ.data[0], instILTypeAux(numFree, inst, typ.data[1])]);

    case 5:
      return new ILType(5, instILTypeAux(numFree, inst, typ.data));

    case 3:
      return mkILBoxedType(instILTypeSpecAux(numFree, inst, typ.data));

    case 2:
      return new ILType(2, instILTypeSpecAux(numFree, inst, typ.data));

    case 7:
      const v = ~~typ.data | 0;
      const top = inst.length | 0;

      if (v < numFree) {
        return typ;
      } else if (v - numFree >= top) {
        return new ILType(7, v - top & 0xFFFF);
      } else {
        return item(v - numFree, inst);
      }

    default:
      return typ;
  }
}
export function instILGenericArgsAux(numFree, inst, i) {
  return map_1(function (arg20_) {
    return instILTypeAux(numFree, inst, arg20_);
  }, i);
}
export function instILCallSigAux(numFree, inst, csig) {
  return mkILCallSig(csig.CallingConv, map_1(function (arg20_) {
    return instILTypeAux(numFree, inst, arg20_);
  }, csig.ArgTypes), instILTypeAux(numFree, inst, csig.ReturnType));
}
export function instILType(i, t) {
  return instILTypeAux(0, i, t);
}
export function mkILParam(name, ty) {
  const Default = null;
  const Marshal = null;
  return new ILParameter(name, ty, Default, Marshal, false, false, false, storeILCustomAttrs(emptyILCustomAttrs), NoMetadataIdx);
}
export function mkILParamNamed(s, ty) {
  return mkILParam(s, ty);
}
export function mkILParamAnon(ty) {
  return mkILParam(null, ty);
}
export function mkILReturn(ty) {
  return new ILReturn(null, ty, storeILCustomAttrs(emptyILCustomAttrs), NoMetadataIdx);
}
export function mkILLocal(ty, dbgInfo) {
  return new ILLocal(ty, false, dbgInfo);
}
export function mkILMethodBody(zeroinit, locals, maxstack, code, tag) {
  return new ILMethodBody(zeroinit, maxstack, false, false, locals, code, tag);
}
export function mkMethodBody(zeroinit, locals, maxstack, code, tag) {
  return new MethodBody(0, mkILMethodBody(zeroinit, locals, maxstack, code, tag));
}
export const mkILVoidReturn = mkILReturn(new ILType(0));
export const methBodyNotAvailable = mkMethBodyAux(new MethodBody(4));
export const methBodyAbstract = mkMethBodyAux(new MethodBody(2));
export const methBodyNative = mkMethBodyAux(new MethodBody(3));
export function mkILCtor(access, args, impl) {
  return ILMethodDef.Create(".ctor", convertMemberAccess(access) | 2048 | 4096, 0, ILCallingConv.Instance, args, mkILVoidReturn, mkMethBodyAux(impl), false, mkILEmptyGenericParams, emptyILSecurityDecls, emptyILCustomAttrs);
}
export function mkCallBaseConstructor(typ, args) {
  return append(ofArray([mkLdarg0]), append(mapIndexed(function (i, _arg1) {
    return mkLdarg(i + 1 & 0xFFFF);
  }, args), ofArray([mkNormalCall(mkILCtorMethSpecForTy(typ, new List()))])));
}
export function mkNormalStfld(fspec) {
  return new ILInstr(64, [new ILAlignment(0), new ILVolatility(1), fspec]);
}
export function mkNormalStsfld(fspec) {
  return new ILInstr(63, [new ILVolatility(1), fspec]);
}
export function mkNormalLdsfld(fspec) {
  return new ILInstr(59, [new ILVolatility(1), fspec]);
}
export function mkNormalLdfld(fspec) {
  return new ILInstr(60, [new ILAlignment(0), new ILVolatility(1), fspec]);
}
export function mkNormalLdflda(fspec) {
  return new ILInstr(62, fspec);
}
export function mkNormalLdobj(dt) {
  return new ILInstr(72, [new ILAlignment(0), new ILVolatility(1), dt]);
}
export function mkNormalStobj(dt) {
  return new ILInstr(73, [new ILAlignment(0), new ILVolatility(1), dt]);
}
export function mkILNonGenericEmptyCtor(tag, superTy) {
  const ctor = mkCallBaseConstructor(superTy, new List());
  return mkILCtor(new ILMemberAccess(5), new List(), mkMethodBody(false, new List(), 8, nonBranchingInstrsToCode(ctor), tag));
}
export function mkILStaticMethod(genparams, nm, access, args, ret, impl) {
  return ILMethodDef.Create(nm, convertMemberAccess(access) | 16, 0, ILCallingConv.Static, args, ret, mkMethBodyAux(impl), false, genparams, emptyILSecurityDecls, emptyILCustomAttrs);
}
export function mkILNonGenericStaticMethod(nm, access, args, ret, impl) {
  return mkILStaticMethod(mkILEmptyGenericParams, nm, access, args, ret, impl);
}
export function mkILClassCtor(impl) {
  return ILMethodDef.Create(".cctor", 1 | 16 | 2048 | 4096, 0, ILCallingConv.Static, new List(), mkILVoidReturn, mkMethBodyAux(impl), false, mkILEmptyGenericParams, emptyILSecurityDecls, emptyILCustomAttrs);
}
export function mk_ospec(typ, callconv, nm, genparams, formal_args, formal_ret) {
  return new ILOverridesSpec(0, [mkILMethRef(typ.TypeRef, callconv, nm, genparams, formal_args, formal_ret), typ]);
}
export function mkILGenericVirtualMethod(nm, access, genparams, actual_args, actual_ret, impl) {
  return ILMethodDef.Create(nm, convertMemberAccess(access) | 512 | (impl.tag === 2 ? 1024 | 64 : 64), 0, ILCallingConv.Instance, actual_args, actual_ret, mkMethBodyAux(impl), false, genparams, emptyILSecurityDecls, emptyILCustomAttrs);
}
export function mkILNonGenericVirtualMethod(nm, access, args, ret, impl) {
  return mkILGenericVirtualMethod(nm, access, mkILEmptyGenericParams, args, ret, impl);
}
export function mkILGenericNonVirtualMethod(nm, access, genparams, actual_args, actual_ret, impl) {
  return ILMethodDef.Create(nm, convertMemberAccess(access) | 128, 0, ILCallingConv.Instance, actual_args, actual_ret, mkMethBodyAux(impl), false, genparams, emptyILSecurityDecls, emptyILCustomAttrs);
}
export function mkILNonGenericInstanceMethod(nm, access, args, ret, impl) {
  return mkILGenericNonVirtualMethod(nm, access, mkILEmptyGenericParams, args, ret, impl);
}
export function ilmbody_code2code(f_1, il) {
  const Code = f_1(il.Code);
  return new ILMethodBody(il.IsZeroInit, il.MaxStack, il.NoInlining, il.AggressiveInlining, il.Locals, Code, il.SourceMarker);
}
export function mdef_code2code(f_1, md) {
  let il;
  const matchValue = md.Body.Contents;

  if (matchValue.tag === 0) {
    il = matchValue.data;
  } else {
    throw new Error("mdef_code2code - method not IL");
  }

  const b = new MethodBody(0, ilmbody_code2code(f_1, il));
  return md.With(null, null, null, null, null, null, mkMethBodyAux(b));
}
export function prependInstrsToCode(instrs, c2) {
  const instrs_1 = Array.from(instrs);
  const n = instrs_1.length | 0;
  const matchValue = c2.Instrs[0];

  if (matchValue.tag === 89) {
    let labels;
    const dict = create(null, fromEqualityComparer({
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

    for (let kvp of c2.Labels) {
      dict.set(kvp[0], kvp[1] === 0 ? 0 : kvp[1] + n);
    }

    labels = dict;
    return new ILCode(labels, Array.from(concat([[matchValue], instrs_1, c2.Instrs.slice(1, c2.Instrs.length)])), c2.Exceptions, c2.Locals);
  } else {
    let labels_1;
    const dict_1 = create(null, fromEqualityComparer({
      GetHashCode(x) {
        return function (obj_1) {
          return hash_1(obj_1);
        }(x) | 0;
      },

      Equals(x, y) {
        return function (e1_1, e2_1) {
          return equals(e1_1, e2_1);
        }(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    }));

    for (let kvp_1 of c2.Labels) {
      dict_1.set(kvp_1[0], kvp_1[1] + n);
    }

    labels_1 = dict_1;
    return new ILCode(labels_1, instrs_1.concat(c2.Instrs), c2.Exceptions, c2.Locals);
  }
}
export function prependInstrsToMethod(new_code, md) {
  return mdef_code2code(function (arg10_) {
    return prependInstrsToCode(new_code, arg10_);
  }, md);
}
export function cdef_cctorCode2CodeOrCreate(tag, f_1, cd) {
  const mdefs = cd.Methods;
  let cctor;
  const matchValue = mdefs.FindByName(".cctor");

  if (matchValue.tail == null) {
    cctor = mkILClassCtor(mkMethodBody(false, new List(), 1, nonBranchingInstrsToCode(new List()), tag));
  } else if (matchValue.tail.tail == null) {
    cctor = matchValue.head;
  } else {
    throw new Error("bad method table: more than one .cctor found");
  }

  const methods = new ILMethodDefs(function () {
    return Array.from(delay(function () {
      return append_1(singleton(f_1(cctor)), delay(function () {
        return collect(function (md) {
          return md.Name !== ".cctor" ? singleton(md) : empty();
        }, mdefs);
      }));
    }));
  });
  return cd.With(null, null, null, null, null, null, methods);
}
export function code_of_mdef(md) {
  const matchValue = md.Code;

  if (matchValue == null) {
    throw new Error("code_of_mdef: not IL");
  } else {
    return getValue(matchValue);
  }
}
export function mkRefToILMethod(tref, md) {
  return mkILMethRef(tref, md.CallingConv, md.Name, md.GenericParams.length, md.ParameterTypes, md.Return.Type);
}
export function mkRefToILField(tref, fdef) {
  return mkILFieldRef(tref, fdef.Name, fdef.FieldType);
}
export function mkRefForILMethod(scope, tdefs, tdef, mdef) {
  return mkRefToILMethod(mkRefForNestedILTypeDef(scope, tdefs, tdef), mdef);
}
export function mkRefForILField(scope, tdefs, tdef, fdef) {
  return mkILFieldRef(mkRefForNestedILTypeDef(scope, tdefs, tdef), fdef.Name, fdef.FieldType);
}
export function prependInstrsToClassCtor(instrs, tag, cd) {
  return cdef_cctorCode2CodeOrCreate(tag, function (arg10_) {
    return prependInstrsToMethod(instrs, arg10_);
  }, cd);
}
export function mkILField(isStatic, nm, ty, init, at, access, isLiteral) {
  return ILFieldDef.Create(nm, ty, convertFieldAccess(access) | (isStatic ? 16 : 0) | (isLiteral ? 64 : 0) | (CurriedLambda(() => init != null)() ? 32768 : 0) | (CurriedLambda(() => at != null)() ? 256 : 0), at, init, null, null, emptyILCustomAttrs);
}
export function mkILInstanceField(nm, ty, init, access) {
  return mkILField(false, nm, ty, init, null, access, false);
}
export function mkILStaticField(nm, ty, init, at, access) {
  return mkILField(true, nm, ty, init, at, access, false);
}
export function mkILLiteralField(nm, ty, init, at, access) {
  return mkILField(true, nm, ty, init, at, access, true);
}
export class ILLocalsAllocator {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILLocalsAllocator",
      properties: {}
    };
  }

  constructor(numPrealloc) {
    this.numPrealloc = numPrealloc | 0;
    this.newLocals = [];
  }

  AllocLocal(loc) {
    const locn = this.numPrealloc + this.newLocals.length & 0xFFFF;
    this.newLocals.push(loc);
    return locn;
  }

  Close() {
    return toList_1(this.newLocals);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILLocalsAllocator", ILLocalsAllocator);
export function mkILFieldsLazy(l) {
  return new ILFieldDefs(0, new LazyOrderedMultiMap(function (f_1) {
    return f_1.Name;
  }, l));
}
export function mkILFields(l) {
  return mkILFieldsLazy(notlazy(l));
}
export const emptyILFields = mkILFields(new List());
export function mkILEventsLazy(l) {
  return new ILEventDefs(0, new LazyOrderedMultiMap(function (e) {
    return e.Name;
  }, l));
}
export function mkILEvents(l) {
  return mkILEventsLazy(notlazy(l));
}
export const emptyILEvents = mkILEvents(new List());
export function mkILPropertiesLazy(l) {
  return new ILPropertyDefs(0, new LazyOrderedMultiMap(function (p) {
    return p.Name;
  }, l));
}
export function mkILProperties(l) {
  return mkILPropertiesLazy(notlazy(l));
}
export const emptyILProperties = mkILProperties(new List());
export function addExportedTypeToTable(y, tab) {
  return add_1(y.Name, y, tab);
}
export function mkILExportedTypes(l) {
  return new ILExportedTypesAndForwarders(0, notlazy(foldBack_1(function (y, tab) {
    return addExportedTypeToTable(y, tab);
  }, l, create(null, new Comparer(comparePrimitives)))));
}
export function mkILExportedTypesLazy(l) {
  return new ILExportedTypesAndForwarders(0, new Lazy(function () {
    return foldBack_1(function (y, tab) {
      return addExportedTypeToTable(y, tab);
    }, l.value, create(null, new Comparer(comparePrimitives)));
  }));
}
export function addNestedExportedTypeToTable(y, tab) {
  return add_1(y.Name, y, tab);
}
export function mkTypeForwarder(scopeRef, name, nested, customAttrs, access) {
  return new ILExportedTypeOrForwarder(scopeRef, name, 2097152 | convertTypeAccessFlags(access), nested, storeILCustomAttrs(customAttrs), NoMetadataIdx);
}
export function mkILNestedExportedTypes(l) {
  return new ILNestedExportedTypes(0, notlazy(foldBack_1(function (y, tab) {
    return addNestedExportedTypeToTable(y, tab);
  }, l, create(null, new Comparer(comparePrimitives)))));
}
export function mkILNestedExportedTypesLazy(l) {
  return new ILNestedExportedTypes(0, new Lazy(function () {
    return foldBack_1(function (y, tab) {
      return addNestedExportedTypeToTable(y, tab);
    }, l.value, create(null, new Comparer(comparePrimitives)));
  }));
}
export function mkILResources(l) {
  return new ILResources(0, l);
}
export function addMethodImplToTable(y, tab) {
  const key = [y.Overrides.MethodRef.Name, y.Overrides.MethodRef.ArgTypes.length];

  const prev = _Map.tryFindMulti(key, tab);

  return add_1(key, new List(y, prev), tab);
}
export function mkILMethodImpls(l) {
  return new ILMethodImplDefs(0, notlazy(foldBack_1(function (y, tab) {
    return addMethodImplToTable(y, tab);
  }, l, create(null, new Comparer(compare)))));
}
export function mkILMethodImplsLazy(l) {
  return new ILMethodImplDefs(0, new Lazy(function () {
    return foldBack_1(function (y, tab) {
      return addMethodImplToTable(y, tab);
    }, Lazy_1.force(l), create(null, new Comparer(compare)));
  }));
}
export const emptyILMethodImpls = mkILMethodImpls(new List());
export function mkILStorageCtorWithParamNames(tag, preblock, typ, extraParams, flds, access) {
  return mkILCtor(access, append(map_1(function (tupledArg) {
    return mkILParamNamed(tupledArg[0], tupledArg[2]);
  }, flds), extraParams), mkMethodBody(false, new List(), 2, nonBranchingInstrsToCode(append(tag == null ? new List() : ofArray([new ILInstr(89, getValue(tag))]), append(preblock, concat_1(mapIndexed(function (n, tupledArg_1) {
    return ofArray([mkLdarg0, mkLdarg(n + 1 & 0xFFFF), mkNormalStfld(mkILFieldSpecInTy(typ, tupledArg_1[1], tupledArg_1[2]))]);
  }, flds))))), tag));
}
export function mkILSimpleStorageCtorWithParamNames(tag, base_tspec, typ, extraParams, flds, access) {
  const preblock = base_tspec != null ? ofArray([mkLdarg0, mkNormalCall(mkILCtorMethSpecForTy(mkILBoxedType(getValue(base_tspec)), new List()))]) : new List();
  return mkILStorageCtorWithParamNames(tag, preblock, typ, extraParams, flds, access);
}
export function addParamNames(flds) {
  return map_1(function (tupledArg) {
    return [tupledArg[0], tupledArg[0], tupledArg[1]];
  }, flds);
}
export function mkILSimpleStorageCtor(tag, base_tspec, typ, extraParams, flds, access) {
  return mkILSimpleStorageCtorWithParamNames(tag, base_tspec, typ, extraParams, addParamNames(flds), access);
}
export function mkILStorageCtor(tag, preblock, typ, flds, access) {
  return mkILStorageCtorWithParamNames(tag, preblock, typ, new List(), addParamNames(flds), access);
}
export function mkILGenericClass(nm, access, genparams, _extends, impl, methods, fields, nestedTypes, props, events, attrs, init) {
  return ILTypeDef.Create(nm, convertTypeAccessFlags(access) | 0 | 0 | (init.tag === 0 ? 1048576 : 0) | 0, new ILTypeDefLayout(0), impl, genparams, _extends, methods, nestedTypes, fields, emptyILMethodImpls, events, props, emptyILSecurityDecls, attrs);
}
export function mkRawDataValueTypeDef(iltyp_ValueType, nm, size, pack) {
  return ILTypeDef.Create(nm, 0 | 256 | 16 | 1048576 | 0, new ILTypeDefLayout(2, new ILTypeDefLayoutInfo(size, pack)), new List(), new List(), iltyp_ValueType, emptyILMethods, emptyILTypeDefs, emptyILFields, emptyILMethodImpls, emptyILEvents, emptyILProperties, emptyILSecurityDecls, emptyILCustomAttrs);
}
export function mkILSimpleClass(ilg, nm, access, methods, fields, nestedTypes, props, events, attrs, init) {
  return mkILGenericClass(nm, access, mkILEmptyGenericParams, ilg.typ_Object, new List(), methods, fields, nestedTypes, props, events, attrs, init);
}
export function mkILTypeDefForGlobalFunctions(ilg, methods, fields) {
  return mkILSimpleClass(ilg, typeNameForGlobalFunctions, new ILTypeDefAccess(0), methods, fields, emptyILTypeDefs, emptyILProperties, emptyILEvents, emptyILCustomAttrs, new ILTypeInit(0));
}
export function destTypeDefsWithGlobalFunctionsFirst(ilg, tdefs) {
  const l = tdefs.AsList;
  const patternInput = partition(function (td) {
    return td.Name === typeNameForGlobalFunctions;
  }, l);
  const top2 = patternInput[0].tail == null ? ofArray([mkILTypeDefForGlobalFunctions(ilg, emptyILMethods, emptyILFields)]) : patternInput[0];
  return append(top2, patternInput[1]);
}
export function mkILSimpleModule(assname, modname, dll, subsystemVersion, useHighEntropyVA, tdefs, hashalg, locale, flags, exportedTypes, metadataVersion) {
  const manifest = new ILAssemblyManifest(assname, hashalg != null ? getValue(hashalg) : 32772, emptyILSecurityDeclsStored, null, null, locale, storeILCustomAttrs(emptyILCustomAttrs), new ILAssemblyLongevity(0), 0 !== (flags & 16384), 0 !== (flags & 32768), 0 !== (flags & 8192), 0 !== (flags & 256), exportedTypes, null, NoMetadataIdx);
  const Manifest = manifest;
  const CustomAttrsStored = storeILCustomAttrs(emptyILCustomAttrs);
  const NativeResources = new List();
  const Platform = null;
  const StackReserveSize = null;
  return new ILModuleDef(Manifest, modname, tdefs, subsystemVersion, useHighEntropyVA, defaultSubSystem, dll, true, Platform, StackReserveSize, false, false, false, defaultVirtAlignment, defaultPhysAlignment, defaultImageBase, metadataVersion, mkILResources(new List()), NativeResources, CustomAttrsStored, NoMetadataIdx);
}
export function buildILCode(_methName, lab2pc, instrs, tryspecs, localspecs) {
  return new ILCode(lab2pc, instrs, tryspecs, localspecs);
}
export function mkILDelegateMethods(access, ilg, iltyp_AsyncCallback, iltyp_IAsyncResult, parms, rtv) {
  const one = function (nm, args, ret) {
    const mdef = mkILNonGenericVirtualMethod(nm, access, args, mkILReturn(ret), new MethodBody(2));
    return mdef.WithAbstract(false).WithHideBySig_1(true).WithRuntime(true);
  };

  const ctor = mkILCtor(access, ofArray([mkILParamNamed("object", ilg.typ_Object), mkILParamNamed("method", ilg.typ_IntPtr)]), new MethodBody(2));
  const ctor_1 = ctor.WithRuntime(true).WithHideBySig_1(true);
  return ofArray([ctor_1, one("Invoke", parms, rtv.Type), one("BeginInvoke", append(parms, ofArray([mkILParamNamed("callback", iltyp_AsyncCallback), mkILParamNamed("objects", ilg.typ_Object)])), iltyp_IAsyncResult), one("EndInvoke", ofArray([mkILParamNamed("result", iltyp_IAsyncResult)]), rtv.Type)]);
}
export function mkCtorMethSpecForDelegate(ilg, typ, useUIntPtr) {
  const scoref = typ.TypeRef.Scope;
  return mkILInstanceMethSpecInTy(typ, ".ctor", ofArray([rescopeILType(scoref, ilg.typ_Object), rescopeILType(scoref, useUIntPtr ? ilg.typ_UIntPtr : ilg.typ_IntPtr)]), new ILType(0), emptyILGenericArgsList);
}
export class ILEnumInfo {
  constructor(enumValues, enumType) {
    this.enumValues = enumValues;
    this.enumType = enumType;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILEnumInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        enumValues: makeGeneric(List, {
          T: Tuple(["string", ILFieldInit])
        }),
        enumType: ILType
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILEnumInfo", ILEnumInfo);
export function getTyOfILEnumInfo(info) {
  return info.enumType;
}
export function computeILEnumInfo(mdName, mdFields) {
  const matchValue = partition(function (fd) {
    return fd.IsStatic;
  }, mdFields.AsList);

  if (matchValue[1].tail == null) {
    throw new Error("info_of_enum_tdef: badly formed enum " + mdName + ": no non-static field found");
  } else if (matchValue[1].tail.tail == null) {
    const enumType = matchValue[1].head.FieldType;
    return new ILEnumInfo(map_1(function (fd_1) {
      return [fd_1.Name, (() => {
        const matchValue_1 = fd_1.LiteralValue;

        if (matchValue_1 == null) {
          throw new Error("info_of_enum_tdef: badly formed enum " + mdName + ": static field does not have an default value");
        } else {
          return getValue(matchValue_1);
        }
      })()];
    }, matchValue[0]), enumType);
  } else {
    throw new Error("info_of_enum_tdef: badly formed enum " + mdName + ": more than one non-static field found");
  }
}
export function sigptr_get_byte(bytes, sigptr) {
  return [Bytes.get(bytes, sigptr), sigptr + 1];
}
export function sigptr_get_bool(bytes, sigptr) {
  const patternInput = sigptr_get_byte(bytes, sigptr);
  return [patternInput[0] === 1, patternInput[1]];
}
export function sigptr_get_u8(bytes, sigptr) {
  const patternInput = sigptr_get_byte(bytes, sigptr);
  return [patternInput[0] & 0xFF, patternInput[1]];
}
export function sigptr_get_i8(bytes, sigptr) {
  const patternInput = sigptr_get_u8(bytes, sigptr);
  return [(patternInput[0] + 0x80 & 0xFF) - 0x80, patternInput[1]];
}
export function sigptr_get_u16(bytes, sigptr) {
  const patternInput = sigptr_get_byte(bytes, sigptr);
  const patternInput_1 = sigptr_get_byte(bytes, patternInput[1]);
  return [(patternInput[0] | patternInput_1[0] << 8) & 0xFFFF, patternInput_1[1]];
}
export function sigptr_get_i16(bytes, sigptr) {
  const patternInput = sigptr_get_u16(bytes, sigptr);
  return [(patternInput[0] + 0x8000 & 0xFFFF) - 0x8000, patternInput[1]];
}
export function sigptr_get_i32(bytes, sigptr) {
  const patternInput = sigptr_get_byte(bytes, sigptr);
  const patternInput_1 = sigptr_get_byte(bytes, patternInput[1]);
  const patternInput_2 = sigptr_get_byte(bytes, patternInput_1[1]);
  const patternInput_3 = sigptr_get_byte(bytes, patternInput_2[1]);
  return [patternInput[0] | patternInput_1[0] << 8 | patternInput_2[0] << 16 | patternInput_3[0] << 24, patternInput_3[1]];
}
export function sigptr_get_u32(bytes, sigptr) {
  const patternInput = sigptr_get_i32(bytes, sigptr);
  return [patternInput[0] >>> 0, patternInput[1]];
}
export function sigptr_get_i64(bytes, sigptr) {
  const patternInput = sigptr_get_byte(bytes, sigptr);
  const patternInput_1 = sigptr_get_byte(bytes, patternInput[1]);
  const patternInput_2 = sigptr_get_byte(bytes, patternInput_1[1]);
  const patternInput_3 = sigptr_get_byte(bytes, patternInput_2[1]);
  const patternInput_4 = sigptr_get_byte(bytes, patternInput_3[1]);
  const patternInput_5 = sigptr_get_byte(bytes, patternInput_4[1]);
  const patternInput_6 = sigptr_get_byte(bytes, patternInput_5[1]);
  const patternInput_7 = sigptr_get_byte(bytes, patternInput_6[1]);
  return [fromNumber(patternInput[0], false).or(fromNumber(patternInput_1[0], false).shl(8)).or(fromNumber(patternInput_2[0], false).shl(16)).or(fromNumber(patternInput_3[0], false).shl(24)).or(fromNumber(patternInput_4[0], false).shl(32)).or(fromNumber(patternInput_5[0], false).shl(40)).or(fromNumber(patternInput_6[0], false).shl(48)).or(fromNumber(patternInput_7[0], false).shl(56)), patternInput_7[1]];
}
export function sigptr_get_u64(bytes, sigptr) {
  const patternInput = sigptr_get_i64(bytes, sigptr);
  return [fromValue(patternInput[0]), patternInput[1]];
}
export function float32_of_bits(x) {
  return toSingle(getBytesInt32(x), 0);
}
export function float_of_bits(x) {
  return int64BitsToDouble(x);
}
export function sigptr_get_ieee32(bytes, sigptr) {
  const patternInput = sigptr_get_i32(bytes, sigptr);
  return [float32_of_bits(patternInput[0]), patternInput[1]];
}
export function sigptr_get_ieee64(bytes, sigptr) {
  const patternInput = sigptr_get_i64(bytes, sigptr);
  return [float_of_bits(patternInput[0]), patternInput[1]];
}
export function sigptr_get_intarray(n, bytes, sigptr) {
  const res = Bytes.zeroCreate(n);

  for (let i = 0; i <= n - 1; i++) {
    res[i] = bytes[sigptr + i];
  }

  return [res, sigptr + n];
}
export function sigptr_get_string(n, bytes, sigptr) {
  const patternInput = sigptr_get_intarray(n, bytes, sigptr);
  return [System.Text.Encoding.UTF8.GetString(patternInput[0], 0, patternInput[0].length), patternInput[1]];
}
export function sigptr_get_z_i32(bytes, sigptr) {
  const patternInput = sigptr_get_byte(bytes, sigptr);

  if (patternInput[0] <= 127) {
    return [patternInput[0], patternInput[1]];
  } else if (patternInput[0] <= 191) {
    const b0_1 = patternInput[0] & 127 | 0;
    const patternInput_1 = sigptr_get_byte(bytes, patternInput[1]);
    return [b0_1 << 8 | patternInput_1[0], patternInput_1[1]];
  } else {
    const b0_2 = patternInput[0] & 63 | 0;
    const patternInput_2 = sigptr_get_byte(bytes, patternInput[1]);
    const patternInput_3 = sigptr_get_byte(bytes, patternInput_2[1]);
    const patternInput_4 = sigptr_get_byte(bytes, patternInput_3[1]);
    return [b0_2 << 24 | patternInput_2[0] << 16 | patternInput_3[0] << 8 | patternInput_4[0], patternInput_4[1]];
  }
}
export function sigptr_get_serstring(bytes, sigptr) {
  const patternInput = sigptr_get_z_i32(bytes, sigptr);
  return sigptr_get_string(patternInput[0], bytes, patternInput[1]);
}
export function sigptr_get_serstring_possibly_null(bytes, sigptr) {
  const patternInput = sigptr_get_byte(bytes, sigptr);

  if (patternInput[0] === 255) {
    return [null, patternInput[1]];
  } else {
    const patternInput_1 = sigptr_get_z_i32(bytes, sigptr);
    const patternInput_2 = sigptr_get_string(patternInput_1[0], bytes, patternInput_1[1]);
    return [patternInput_2[0], patternInput_2[1]];
  }
}
export function mkRefToILAssembly(m) {
  return ILAssemblyRef.Create(m.Name, null, m.PublicKey == null ? null : PublicKey.KeyAsToken(getValue(m.PublicKey)), m.Retargetable, m.Version, m.Locale);
}
export function z_unsigned_int_size(n) {
  if (n <= 127) {
    return 1;
  } else if (n <= 16383) {
    return 2;
  } else {
    return 3;
  }
}
export function z_unsigned_int(n) {
  if (n >= 0 ? n <= 127 : false) {
    return new Uint8Array([n & 0xFF]);
  } else if (n >= 128 ? n <= 16383 : false) {
    return new Uint8Array([(128 | op_GreaterGreaterGreaterAmp(n, 8)) & 0xFF, n & 255 & 0xFF]);
  } else {
    return new Uint8Array([(192 | op_GreaterGreaterGreaterAmp(n, 24)) & 0xFF, op_GreaterGreaterGreaterAmp(n, 16) & 255 & 0xFF, op_GreaterGreaterGreaterAmp(n, 8) & 255 & 0xFF, n & 255 & 0xFF]);
  }
}
export function string_as_utf8_bytes(s) {
  return System.Text.Encoding.UTF8.GetBytes(s);
}
export function dw7(n) {
  return n.shr(56).and(fromBits(255, 0, false)).toNumber() & 0xFF;
}
export function dw6(n) {
  return n.shr(48).and(fromBits(255, 0, false)).toNumber() & 0xFF;
}
export function dw5(n) {
  return n.shr(40).and(fromBits(255, 0, false)).toNumber() & 0xFF;
}
export function dw4(n) {
  return n.shr(32).and(fromBits(255, 0, false)).toNumber() & 0xFF;
}
export function dw3(n) {
  return n.shr(24).and(fromBits(255, 0, false)).toNumber() & 0xFF;
}
export function dw2(n) {
  return n.shr(16).and(fromBits(255, 0, false)).toNumber() & 0xFF;
}
export function dw1(n) {
  return n.shr(8).and(fromBits(255, 0, false)).toNumber() & 0xFF;
}
export function dw0(n) {
  return n.and(fromBits(255, 0, false)).toNumber() & 0xFF;
}
export function u8AsBytes(i) {
  return new Uint8Array([i]);
}
export function u16AsBytes(x) {
  const n = ~~x | 0;
  return new Uint8Array([b0(n) & 0xFF, b1(n) & 0xFF]);
}
export function i32AsBytes(i) {
  return new Uint8Array([b0(i) & 0xFF, b1(i) & 0xFF, b2(i) & 0xFF, b3(i) & 0xFF]);
}
export function i64AsBytes(i) {
  return new Uint8Array([dw0(i), dw1(i), dw2(i), dw3(i), dw4(i), dw5(i), dw6(i), dw7(i)]);
}
export function i8AsBytes(i) {
  return u8AsBytes(i & 0xFF);
}
export function i16AsBytes(i) {
  return u16AsBytes(i & 0xFFFF);
}
export function u32AsBytes(i) {
  return i32AsBytes(~~i);
}
export function u64AsBytes(i) {
  return i64AsBytes(fromValue(i));
}
export function bits_of_float32(x) {
  return toInt32(getBytesSingle(x), 0) | 0;
}
export function bits_of_float(x) {
  return doubleToInt64Bits(x);
}
export function ieee32AsBytes(i) {
  return i32AsBytes(bits_of_float32(i));
}
export function ieee64AsBytes(i) {
  return i64AsBytes(bits_of_float(i));
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
export function formatILVersion(_arg1) {
  return toText(printf("%d.%d.%d.%d"))(~~_arg1[0], ~~_arg1[1], ~~_arg1[2], ~~_arg1[3]);
}
export function encodeCustomAttrString(s) {
  const arr = string_as_utf8_bytes(s);
  return Uint8Array.from(concat(ofArray([z_unsigned_int(arr.length), arr])));
}
export function encodeCustomAttrElemType(x) {
  const $var36 = x.tag === 2 ? x.data.Name === "System.SByte" ? [0, x.data] : [1] : [1];

  switch ($var36[0]) {
    case 0:
      return new Uint8Array([et_I1]);

    case 1:
      const $var37 = x.tag === 2 ? x.data.Name === "System.Byte" ? [0, x.data] : [1] : [1];

      switch ($var37[0]) {
        case 0:
          return new Uint8Array([et_U1]);

        case 1:
          const $var38 = x.tag === 2 ? x.data.Name === "System.Int16" ? [0, x.data] : [1] : [1];

          switch ($var38[0]) {
            case 0:
              return new Uint8Array([et_I2]);

            case 1:
              const $var39 = x.tag === 2 ? x.data.Name === "System.UInt16" ? [0, x.data] : [1] : [1];

              switch ($var39[0]) {
                case 0:
                  return new Uint8Array([et_U2]);

                case 1:
                  const $var40 = x.tag === 2 ? x.data.Name === "System.Int32" ? [0, x.data] : [1] : [1];

                  switch ($var40[0]) {
                    case 0:
                      return new Uint8Array([et_I4]);

                    case 1:
                      const $var41 = x.tag === 2 ? x.data.Name === "System.UInt32" ? [0, x.data] : [1] : [1];

                      switch ($var41[0]) {
                        case 0:
                          return new Uint8Array([et_U4]);

                        case 1:
                          const $var42 = x.tag === 2 ? x.data.Name === "System.Int64" ? [0, x.data] : [1] : [1];

                          switch ($var42[0]) {
                            case 0:
                              return new Uint8Array([et_I8]);

                            case 1:
                              const $var43 = x.tag === 2 ? x.data.Name === "System.UInt64" ? [0, x.data] : [1] : [1];

                              switch ($var43[0]) {
                                case 0:
                                  return new Uint8Array([et_U8]);

                                case 1:
                                  const $var44 = x.tag === 2 ? x.data.Name === "System.Double" ? [0, x.data] : [1] : [1];

                                  switch ($var44[0]) {
                                    case 0:
                                      return new Uint8Array([et_R8]);

                                    case 1:
                                      const $var45 = x.tag === 2 ? x.data.Name === "System.Single" ? [0, x.data] : [1] : [1];

                                      switch ($var45[0]) {
                                        case 0:
                                          return new Uint8Array([et_R4]);

                                        case 1:
                                          const $var46 = x.tag === 2 ? x.data.Name === "System.Char" ? [0, x.data] : [1] : [1];

                                          switch ($var46[0]) {
                                            case 0:
                                              return new Uint8Array([et_CHAR]);

                                            case 1:
                                              const $var47 = x.tag === 2 ? x.data.Name === "System.Boolean" ? [0, x.data] : [1] : [1];

                                              switch ($var47[0]) {
                                                case 0:
                                                  return new Uint8Array([et_BOOLEAN]);

                                                case 1:
                                                  const $var48 = x.tag === 3 ? x.data.Name === "System.String" ? [0, x.data] : [1] : [1];

                                                  switch ($var48[0]) {
                                                    case 0:
                                                      return new Uint8Array([et_STRING]);

                                                    case 1:
                                                      const $var49 = x.tag === 3 ? x.data.Name === "System.Object" ? [0, x.data] : [1] : [1];

                                                      switch ($var49[0]) {
                                                        case 0:
                                                          return new Uint8Array([81]);

                                                        case 1:
                                                          const $var50 = x.tag === 3 ? x.data.Name === "System.Type" ? [0, x.data] : [1] : [1];

                                                          switch ($var50[0]) {
                                                            case 0:
                                                              return new Uint8Array([80]);

                                                            case 1:
                                                              const $var51 = x.tag === 2 ? [0, x.data] : x.tag === 1 ? x.data[0].Equals(ILArrayShape.SingleDimensional) ? [1, x.data[1], x.data[0]] : [2] : [2];

                                                              switch ($var51[0]) {
                                                                case 0:
                                                                  return Uint8Array.from(append_1(new Uint8Array([85]), encodeCustomAttrString($var51[1].TypeRef.QualifiedName)));

                                                                case 1:
                                                                  return Uint8Array.from(append_1(new Uint8Array([et_SZARRAY]), encodeCustomAttrElemType($var51[1])));

                                                                case 2:
                                                                  throw new Error("encodeCustomAttrElemType: unrecognized custom element type");
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

              }

          }

      }

  }
}
export function encodeCustomAttrElemTypeForObject(x) {
  switch (x.tag) {
    case 1:
      return new Uint8Array([et_BOOLEAN]);

    case 2:
      return new Uint8Array([et_CHAR]);

    case 3:
      return new Uint8Array([et_I1]);

    case 4:
      return new Uint8Array([et_I2]);

    case 5:
      return new Uint8Array([et_I4]);

    case 6:
      return new Uint8Array([et_I8]);

    case 7:
      return new Uint8Array([et_U1]);

    case 8:
      return new Uint8Array([et_U2]);

    case 9:
      return new Uint8Array([et_U4]);

    case 10:
      return new Uint8Array([et_U8]);

    case 14:
      return new Uint8Array([80]);

    case 15:
      return new Uint8Array([80]);

    case 13:
      return new Uint8Array([et_STRING]);

    case 11:
      return new Uint8Array([et_R4]);

    case 12:
      return new Uint8Array([et_R8]);

    case 16:
      return Uint8Array.from(delay(function () {
        return append_1(singleton(et_SZARRAY), delay(function () {
          return encodeCustomAttrElemType(x.data[0]);
        }));
      }));

    default:
      return new Uint8Array([et_STRING]);
  }
}
export function decodeCustomAttrElemType(ilg, bytes, sigptr, x) {
  if (x === et_I1) {
    return [ilg.typ_SByte, sigptr];
  } else if (x === et_U1) {
    return [ilg.typ_Byte, sigptr];
  } else if (x === et_I2) {
    return [ilg.typ_Int16, sigptr];
  } else if (x === et_U2) {
    return [ilg.typ_UInt16, sigptr];
  } else if (x === et_I4) {
    return [ilg.typ_Int32, sigptr];
  } else if (x === et_U4) {
    return [ilg.typ_UInt32, sigptr];
  } else if (x === et_I8) {
    return [ilg.typ_Int64, sigptr];
  } else if (x === et_U8) {
    return [ilg.typ_UInt64, sigptr];
  } else if (x === et_R8) {
    return [ilg.typ_Double, sigptr];
  } else if (x === et_R4) {
    return [ilg.typ_Single, sigptr];
  } else if (x === et_CHAR) {
    return [ilg.typ_Char, sigptr];
  } else if (x === et_BOOLEAN) {
    return [ilg.typ_Bool, sigptr];
  } else if (x === et_STRING) {
    return [ilg.typ_String, sigptr];
  } else if (x === et_OBJECT) {
    return [ilg.typ_Object, sigptr];
  } else if (x === et_SZARRAY) {
    const patternInput = sigptr_get_u8(bytes, sigptr);
    const patternInput_1 = decodeCustomAttrElemType(ilg, bytes, patternInput[1], patternInput[0]);
    return [mkILArr1DTy(patternInput_1[0]), patternInput_1[1]];
  } else if (x === 80) {
    return [ilg.typ_Type, sigptr];
  } else {
    return toFail(printf("decodeCustomAttrElemType ilg: unrecognized custom element type: %A"))(x);
  }
}
export function encodeCustomAttrPrimValue(ilg, c) {
  const $var52 = c.tag === 0 ? c.data != null ? [2, getValue(c.data)] : [1] : c.tag === 14 ? c.data != null ? [14, getValue(c.data)] : [1] : c.tag === 15 ? c.data != null ? [15, getValue(c.data)] : [1] : c.tag === 13 ? [1] : c.tag === 2 ? [3, c.data] : c.tag === 3 ? [4, c.data] : c.tag === 4 ? [5, c.data] : c.tag === 5 ? [6, c.data] : c.tag === 6 ? [7, c.data] : c.tag === 7 ? [8, c.data] : c.tag === 8 ? [9, c.data] : c.tag === 9 ? [10, c.data] : c.tag === 10 ? [11, c.data] : c.tag === 11 ? [12, c.data] : c.tag === 12 ? [13, c.data] : c.tag === 16 ? [16, c.data[1]] : [0, c.data];

  switch ($var52[0]) {
    case 0:
      return new Uint8Array([$var52[1] ? 1 : 0]);

    case 1:
      return new Uint8Array([255]);

    case 2:
      return encodeCustomAttrString($var52[1]);

    case 3:
      return u16AsBytes($var52[1].charCodeAt(0));

    case 4:
      return i8AsBytes($var52[1]);

    case 5:
      return i16AsBytes($var52[1]);

    case 6:
      return i32AsBytes($var52[1]);

    case 7:
      return i64AsBytes($var52[1]);

    case 8:
      return u8AsBytes($var52[1]);

    case 9:
      return u16AsBytes($var52[1]);

    case 10:
      return u32AsBytes($var52[1]);

    case 11:
      return u64AsBytes($var52[1]);

    case 12:
      return ieee32AsBytes($var52[1]);

    case 13:
      return ieee64AsBytes($var52[1]);

    case 14:
      return encodeCustomAttrString($var52[1].QualifiedName);

    case 15:
      return encodeCustomAttrString($var52[1].QualifiedName);

    case 16:
      return Uint8Array.from(delay(function () {
        return append_1(i32AsBytes($var52[1].length), delay(function () {
          return collect(function (elem) {
            return encodeCustomAttrPrimValue(ilg, elem);
          }, $var52[1]);
        }));
      }));
  }
}
export function encodeCustomAttrValue(ilg, ty, c) {
  var tspec;
  var shape_1;
  var shape;
  var elems;
  var elemType;
  const matchValue = [ty, c];
  const $var53 = matchValue[0].tag === 3 ? (tspec = matchValue[0].data, tspec.Name === "System.Object") ? [0, matchValue[0].data] : [1] : [1];

  switch ($var53[0]) {
    case 0:
      return Uint8Array.from(delay(function () {
        return append_1(encodeCustomAttrElemTypeForObject(c), delay(function () {
          return encodeCustomAttrPrimValue(ilg, c);
        }));
      }));

    case 1:
      const $var54 = matchValue[0].tag === 1 ? matchValue[1].tag === 13 ? (shape_1 = matchValue[0].data[0], shape_1.Equals(ILArrayShape.SingleDimensional)) ? [0, matchValue[0].data[0]] : [1] : [1] : [1];

      switch ($var54[0]) {
        case 0:
          return Uint8Array.from(delay(function () {
            return i32AsBytes(-1);
          }));

        case 1:
          const $var55 = matchValue[0].tag === 1 ? matchValue[1].tag === 16 ? (shape = matchValue[0].data[0], elems = matchValue[1].data[1], elemType = matchValue[0].data[1], shape.Equals(ILArrayShape.SingleDimensional)) ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0]] : [1] : [1] : [1];

          switch ($var55[0]) {
            case 0:
              return Uint8Array.from(delay(function () {
                return append_1(i32AsBytes($var55[2].length), delay(function () {
                  return collect(function (elem) {
                    return encodeCustomAttrValue(ilg, $var55[1], elem);
                  }, $var55[2]);
                }));
              }));

            case 1:
              return encodeCustomAttrPrimValue(ilg, c);
          }

      }

  }
}
export function encodeCustomAttrNamedArg(ilg, nm, ty, prop, elem) {
  return Uint8Array.from(delay(function () {
    return append_1(singleton(prop ? 84 : 83), delay(function () {
      return append_1(encodeCustomAttrElemType(ty), delay(function () {
        return append_1(encodeCustomAttrString(nm), delay(function () {
          return encodeCustomAttrValue(ilg, ty, elem);
        }));
      }));
    }));
  }));
}
export function mkILCustomAttribMethRef(ilg, mspec, fixedArgs, namedArgs) {
  const argtys = mspec.MethodRef.ArgTypes;
  const args = Uint8Array.from(delay(function () {
    return append_1(new Uint8Array([1, 0]), delay(function () {
      return append_1(collect(function (matchValue) {
        return encodeCustomAttrValue(ilg, matchValue[0], matchValue[1]);
      }, zip(argtys, fixedArgs)), delay(function () {
        return append_1(u16AsBytes(namedArgs.length & 0xFFFF), delay(function () {
          return collect(function (namedArg) {
            return encodeCustomAttrNamedArg(ilg, namedArg[0], namedArg[1], namedArg[2], namedArg[3]);
          }, namedArgs);
        }));
      }));
    }));
  }));
  return new ILAttribute(mspec, args, append(fixedArgs, map_1(function (tupledArg) {
    return tupledArg[3];
  }, namedArgs)));
}
export function mkILCustomAttribute(ilg, tref, argtys, argvs, propvs) {
  return mkILCustomAttribMethRef(ilg, mkILNonGenericCtorMethSpec(tref, argtys), argvs, propvs);
}
export const MscorlibScopeRef = new ILScopeRef(2, ILAssemblyRef.Create("mscorlib", null, ecmaPublicKey, true, null, null));
export const EcmaMscorlibILGlobals = mkILGlobals(MscorlibScopeRef);
export function mkPermissionSet(ilg, action, attributes) {
  const bytes_1 = Uint8Array.from(delay(function () {
    return append_1(singleton(".".charCodeAt(0)), delay(function () {
      return append_1(z_unsigned_int(attributes.length), delay(function () {
        return collect(function (matchValue) {
          return append_1(encodeCustomAttrString(matchValue[0].QualifiedName), delay(function () {
            const bytes = Uint8Array.from(delay(function () {
              return append_1(z_unsigned_int(matchValue[1].length), delay(function () {
                return collect(function (matchValue_1) {
                  return encodeCustomAttrNamedArg(ilg, matchValue_1[0], matchValue_1[1], true, matchValue_1[2]);
                }, matchValue[1]);
              }));
            }));
            return append_1(z_unsigned_int(bytes.length), delay(function () {
              return bytes;
            }));
          }));
        }, attributes);
      }));
    }));
  }));
  return new ILSecurityDecl(0, [action, bytes_1]);
}
export class ILTypeSigParser {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeSigParser",
      properties: {}
    };
  }

  constructor(tstring) {
    this.tstring = tstring;
    this.startPos = 0;
    this.currentPos = 0;
    this.nil = "\r";
  }

  ParseType() {
    if (this.here() === "[") {
      this.drop();
    }

    let typeName;

    while ((((this.peek() !== "`" ? this.peek() !== "[" : false) ? this.peek() !== "]" : false) ? this.peek() !== "," : false) ? this.peek() !== this.nil : false) {
      this.step();
    }

    typeName = this.take();
    let patternInput;

    if (this.here() === "`") {
      this.drop();
      let arity;

      while (((this.here().charCodeAt(0) >= "0".charCodeAt(0) ? this.here().charCodeAt(0) <= "9".charCodeAt(0) : false) ? this.peek().charCodeAt(0) >= "0".charCodeAt(0) : false) ? this.peek().charCodeAt(0) <= "9".charCodeAt(0) : false) {
        this.step();
      }

      arity = parse(this.take(), 10) | 0;
      this.drop();
      patternInput = [typeName + "`" + toString(arity), toList(delay(() => map_2(_i => this.ParseType(), range(0, arity - 1))))];
    } else {
      patternInput = [typeName, null];
    }

    let rank_1;

    if (this.here() === "[") {
      let rank = 0;

      while (this.here() !== "]") {
        rank = rank + 1 | 0;
        this.step();
      }

      this.drop();
      rank_1 = new ILArrayShape(0, replicate_1(rank, [0, null]));
    } else {
      rank_1 = null;
    }

    let scope_1;

    if ((this.here() === "," ? true : this.here() === " ") ? this.peek() !== "[" ? this.peekN(2) !== "[" : false : false) {
      const grabScopeComponent = () => {
        if (this.here() === ",") {
          this.drop();
        }

        if (this.here() === " ") {
          this.drop();
        }

        while ((this.peek() !== "," ? this.peek() !== "]" : false) ? this.peek() !== this.nil : false) {
          this.step();
        }

        return this.take();
      };

      const scope = join(",", toList(delay(() => append_1(singleton(grabScopeComponent()), delay(() => append_1(singleton(grabScopeComponent()), delay(() => append_1(singleton(grabScopeComponent()), delay(() => singleton(grabScopeComponent()))))))))));
      scope_1 = new ILScopeRef(2, mkSimpleAssRef(scope));
    } else {
      scope_1 = new ILScopeRef(0);
    }

    if (this.here() === "]") {
      this.drop();
    }

    if (this.here() === ",") {
      this.drop();
    }

    const tref = mkILTyRef(scope_1, patternInput[0]);
    const genericArgs = patternInput[1] != null ? getValue(patternInput[1]) : new List();
    const tspec = ILTypeSpec.Create(tref, genericArgs);
    let ilty;
    const matchValue = tspec.Name;

    switch (matchValue) {
      case "System.SByte":
      case "System.Byte":
      case "System.Int16":
      case "System.UInt16":
      case "System.Int32":
      case "System.UInt32":
      case "System.Int64":
      case "System.UInt64":
      case "System.Char":
      case "System.Double":
      case "System.Single":
      case "System.Boolean":
        ilty = new ILType(2, tspec);
        break;

      default:
        ilty = new ILType(3, tspec);
    }

    if (rank_1 != null) {
      return new ILType(1, [getValue(rank_1), ilty]);
    } else {
      return ilty;
    }
  }

  ParseTypeSpec() {
    this.reset();
    const ilty = this.ParseType();
    return new ILAttribElem(14, ilty);
  }

  reset() {
    this.startPos = 0;
    this.currentPos = 0;
  }

  peek() {
    return this.currentPos < this.tstring.length - 1 ? this.tstring[this.currentPos + 1] : this.nil;
  }

  peekN(skip) {
    if (this.currentPos < this.tstring.length - skip) {
      return this.tstring[this.currentPos + skip];
    } else {
      return this.nil;
    }
  }

  here() {
    return this.currentPos < this.tstring.length ? this.tstring[this.currentPos] : this.nil;
  }

  step() {
    this.currentPos = this.currentPos + 1 | 0;
  }

  skip() {
    this.startPos = this.currentPos | 0;
  }

  drop() {
    this.skip();
    this.step();
    this.skip();
  }

  take() {
    const s = this.currentPos < this.tstring.length ? this.tstring.slice(this.startPos, this.currentPos + 1) : "";
    this.drop();
    return s;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILTypeSigParser", ILTypeSigParser);
export function decodeILAttribData(ilg, ca) {
  const patternInput = sigptr_get_byte(ca.Data, 0);
  const patternInput_1 = sigptr_get_byte(ca.Data, patternInput[1]);

  if (!(patternInput[0] === 1 ? patternInput_1[0] === 0 : false)) {
    throw new Error("decodeILAttribData: invalid data");
  }

  const parseVal = function (argty, sigptr) {
    parseVal: while (true) {
      const $var56 = argty.tag === 2 ? argty.data.Name === "System.SByte" ? [0, argty.data] : [1] : [1];

      switch ($var56[0]) {
        case 0:
          const patternInput_2 = sigptr_get_i8(ca.Data, sigptr);
          return [new ILAttribElem(3, patternInput_2[0]), patternInput_2[1]];

        case 1:
          const $var57 = argty.tag === 2 ? argty.data.Name === "System.Byte" ? [0, argty.data] : [1] : [1];

          switch ($var57[0]) {
            case 0:
              const patternInput_3 = sigptr_get_u8(ca.Data, sigptr);
              return [new ILAttribElem(7, patternInput_3[0]), patternInput_3[1]];

            case 1:
              const $var58 = argty.tag === 2 ? argty.data.Name === "System.Int16" ? [0, argty.data] : [1] : [1];

              switch ($var58[0]) {
                case 0:
                  const patternInput_4 = sigptr_get_i16(ca.Data, sigptr);
                  return [new ILAttribElem(4, patternInput_4[0]), patternInput_4[1]];

                case 1:
                  const $var59 = argty.tag === 2 ? argty.data.Name === "System.UInt16" ? [0, argty.data] : [1] : [1];

                  switch ($var59[0]) {
                    case 0:
                      const patternInput_5 = sigptr_get_u16(ca.Data, sigptr);
                      return [new ILAttribElem(8, patternInput_5[0]), patternInput_5[1]];

                    case 1:
                      const $var60 = argty.tag === 2 ? argty.data.Name === "System.Int32" ? [0, argty.data] : [1] : [1];

                      switch ($var60[0]) {
                        case 0:
                          const patternInput_6 = sigptr_get_i32(ca.Data, sigptr);
                          return [new ILAttribElem(5, patternInput_6[0]), patternInput_6[1]];

                        case 1:
                          const $var61 = argty.tag === 2 ? argty.data.Name === "System.UInt32" ? [0, argty.data] : [1] : [1];

                          switch ($var61[0]) {
                            case 0:
                              const patternInput_7 = sigptr_get_u32(ca.Data, sigptr);
                              return [new ILAttribElem(9, patternInput_7[0]), patternInput_7[1]];

                            case 1:
                              const $var62 = argty.tag === 2 ? argty.data.Name === "System.Int64" ? [0, argty.data] : [1] : [1];

                              switch ($var62[0]) {
                                case 0:
                                  const patternInput_8 = sigptr_get_i64(ca.Data, sigptr);
                                  return [new ILAttribElem(6, patternInput_8[0]), patternInput_8[1]];

                                case 1:
                                  const $var63 = argty.tag === 2 ? argty.data.Name === "System.UInt64" ? [0, argty.data] : [1] : [1];

                                  switch ($var63[0]) {
                                    case 0:
                                      const patternInput_9 = sigptr_get_u64(ca.Data, sigptr);
                                      return [new ILAttribElem(10, patternInput_9[0]), patternInput_9[1]];

                                    case 1:
                                      const $var64 = argty.tag === 2 ? argty.data.Name === "System.Double" ? [0, argty.data] : [1] : [1];

                                      switch ($var64[0]) {
                                        case 0:
                                          const patternInput_10 = sigptr_get_ieee64(ca.Data, sigptr);
                                          return [new ILAttribElem(12, patternInput_10[0]), patternInput_10[1]];

                                        case 1:
                                          const $var65 = argty.tag === 2 ? argty.data.Name === "System.Single" ? [0, argty.data] : [1] : [1];

                                          switch ($var65[0]) {
                                            case 0:
                                              const patternInput_11 = sigptr_get_ieee32(ca.Data, sigptr);
                                              return [new ILAttribElem(11, patternInput_11[0]), patternInput_11[1]];

                                            case 1:
                                              const $var66 = argty.tag === 2 ? argty.data.Name === "System.Char" ? [0, argty.data] : [1] : [1];

                                              switch ($var66[0]) {
                                                case 0:
                                                  const patternInput_12 = sigptr_get_u16(ca.Data, sigptr);
                                                  return [new ILAttribElem(2, String.fromCharCode(~~patternInput_12[0])), patternInput_12[1]];

                                                case 1:
                                                  const $var67 = argty.tag === 2 ? argty.data.Name === "System.Boolean" ? [0, argty.data] : [1] : [1];

                                                  switch ($var67[0]) {
                                                    case 0:
                                                      const patternInput_13 = sigptr_get_byte(ca.Data, sigptr);
                                                      return [new ILAttribElem(1, !(patternInput_13[0] === 0)), patternInput_13[1]];

                                                    case 1:
                                                      const $var68 = argty.tag === 3 ? argty.data.Name === "System.String" ? [0, argty.data] : [1] : [1];

                                                      switch ($var68[0]) {
                                                        case 0:
                                                          const patternInput_14 = sigptr_get_serstring_possibly_null(ca.Data, sigptr);
                                                          return [new ILAttribElem(0, patternInput_14[0]), patternInput_14[1]];

                                                        case 1:
                                                          const $var69 = argty.tag === 3 ? argty.data.Name === "System.Type" ? [0, argty.data] : [1] : [1];

                                                          switch ($var69[0]) {
                                                            case 0:
                                                              const patternInput_15 = sigptr_get_serstring_possibly_null(ca.Data, sigptr);

                                                              if (patternInput_15[0] != null) {
                                                                try {
                                                                  const parser = new ILTypeSigParser(getValue(patternInput_15[0]));
                                                                  return [parser.ParseTypeSpec(), patternInput_15[1]];
                                                                } catch (e) {
                                                                  throw new Error(toText(printf("decodeILAttribData: error parsing type in custom attribute blob: %s"))(e.message));
                                                                }
                                                              } else {
                                                                return [new ILAttribElem(15, null), patternInput_15[1]];
                                                              }

                                                            case 1:
                                                              const $var70 = argty.tag === 3 ? argty.data.Name === "System.Object" ? [0, argty.data] : [1] : [1];

                                                              switch ($var70[0]) {
                                                                case 0:
                                                                  const patternInput_16 = sigptr_get_u8(ca.Data, sigptr);

                                                                  if (patternInput_16[0] === 255) {
                                                                    return [new ILAttribElem(13), patternInput_16[1]];
                                                                  } else {
                                                                    const patternInput_17 = decodeCustomAttrElemType(ilg, ca.Data, patternInput_16[1], patternInput_16[0]);
                                                                    argty = patternInput_17[0];
                                                                    sigptr = patternInput_17[1];
                                                                    continue parseVal;
                                                                  }

                                                                case 1:
                                                                  const $var71 = argty.tag === 1 ? argty.data[0].Equals(ILArrayShape.SingleDimensional) ? [0, argty.data[1], argty.data[0]] : [1] : [1];

                                                                  switch ($var71[0]) {
                                                                    case 0:
                                                                      const patternInput_18 = sigptr_get_i32(ca.Data, sigptr);

                                                                      if (patternInput_18[0] === -1) {
                                                                        return [new ILAttribElem(13), patternInput_18[1]];
                                                                      } else {
                                                                        const parseElems = function (acc, n, sigptr_1) {
                                                                          parseElems: while (true) {
                                                                            if (n === 0) {
                                                                              return [reverse(acc), sigptr_1];
                                                                            } else {
                                                                              const patternInput_19 = parseVal($var71[1], sigptr_1);
                                                                              acc = new List(patternInput_19[0], acc);
                                                                              n = n - 1;
                                                                              sigptr_1 = patternInput_19[1];
                                                                              continue parseElems;
                                                                            }
                                                                          }
                                                                        };

                                                                        const patternInput_20 = parseElems(new List(), patternInput_18[0], patternInput_18[1]);
                                                                        return [new ILAttribElem(16, [$var71[1], patternInput_20[0]]), patternInput_20[1]];
                                                                      }

                                                                    case 1:
                                                                      if (argty.tag === 2) {
                                                                        const patternInput_21 = sigptr_get_i32(ca.Data, sigptr);
                                                                        return [new ILAttribElem(5, patternInput_21[0]), patternInput_21[1]];
                                                                      } else {
                                                                        throw new Error("decodeILAttribData: attribute data involves an enum or System.Type value");
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

                      }

                  }

              }

          }

      }
    }
  };

  const parseFixed = function (argtys, sigptr_2) {
    if (argtys.tail != null) {
      const patternInput_22 = parseVal(argtys.head, sigptr_2);
      const patternInput_23 = parseFixed(argtys.tail, patternInput_22[1]);
      return [new List(patternInput_22[0], patternInput_23[0]), patternInput_23[1]];
    } else {
      return [new List(), sigptr_2];
    }
  };

  const patternInput_24 = parseFixed(ca.Method.FormalArgTypes, patternInput_1[1]);
  const patternInput_25 = sigptr_get_u16(ca.Data, patternInput_24[1]);

  const parseNamed = function (acc_1, n_1, sigptr_3) {
    parseNamed: while (true) {
      if (n_1 === 0) {
        return reverse(acc_1);
      } else {
        const patternInput_26 = sigptr_get_u8(ca.Data, sigptr_3);
        const isProp = ~~patternInput_26[0] === 84;
        const patternInput_27 = sigptr_get_u8(ca.Data, patternInput_26[1]);
        let patternInput_30;

        if (85 === ~~patternInput_27[0]) {
          const patternInput_28 = sigptr_get_serstring(ca.Data, patternInput_27[1]);
          let patternInput_29;
          const pieces = split(patternInput_28[0], ",");

          if (pieces.length > 1) {
            patternInput_29 = [pieces[0], join(",", pieces.slice(1, pieces.length))];
          } else {
            patternInput_29 = [pieces[0], null];
          }

          const scoref = patternInput_29[1] == null ? ilg.primaryAssemblyScopeRef : new ILScopeRef(2, mkSimpleAssRef(getValue(patternInput_29[1])));
          const tref = mkILTyRef(scoref, patternInput_29[0]);
          const tspec = mkILNonGenericTySpec(tref);
          patternInput_30 = [new ILType(2, tspec), patternInput_28[1]];
        } else {
          patternInput_30 = decodeCustomAttrElemType(ilg, ca.Data, patternInput_27[1], patternInput_27[0]);
        }

        const patternInput_31 = sigptr_get_serstring(ca.Data, patternInput_30[1]);
        const patternInput_32 = parseVal(patternInput_30[0], patternInput_31[1]);
        acc_1 = new List([patternInput_31[0], patternInput_30[0], isProp, patternInput_32[0]], acc_1);
        n_1 = n_1 - 1;
        sigptr_3 = patternInput_32[1];
        continue parseNamed;
      }
    }
  };

  const named = parseNamed(new List(), ~~patternInput_25[0], patternInput_25[1]);
  return [patternInput_24[0], named];
}
export class ILReferences {
  constructor(assemblyReferences, moduleReferences) {
    this.AssemblyReferences = assemblyReferences;
    this.ModuleReferences = moduleReferences;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILReferences",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        AssemblyReferences: makeGeneric(List, {
          T: ILAssemblyRef
        }),
        ModuleReferences: makeGeneric(List, {
          T: ILModuleRef
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
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILReferences", ILReferences);
export class ILReferencesAccumulator {
  constructor(refsA, refsM) {
    this.refsA = refsA;
    this.refsM = refsM;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILReferencesAccumulator",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        refsA: makeGeneric(Set, {
          T: ILAssemblyRef
        }),
        refsM: makeGeneric(Set, {
          T: ILModuleRef
        })
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILReferencesAccumulator", ILReferencesAccumulator);
export const emptyILRefs = new ILReferences(new List(), new List());
export function refs_of_assref(s, x) {
  addInPlace(x, s.refsA);
}
export function refs_of_modref(s, x) {
  addInPlace(x, s.refsM);
}
export function refs_of_scoref(s, x) {
  if (x.tag === 2) {
    refs_of_assref(s, x.data);
  } else if (x.tag === 1) {
    refs_of_modref(s, x.data);
  }
}
export function refs_of_tref(s, x) {
  refs_of_scoref(s, x.Scope);
}
export function refs_of_typ(s, x) {
  const $var72 = x.tag === 7 ? [0] : x.tag === 8 ? [1] : x.tag === 1 ? [2, x.data[1]] : x.tag === 4 ? [2, x.data] : x.tag === 5 ? [2, x.data] : x.tag === 2 ? [3, x.data] : x.tag === 3 ? [3, x.data] : x.tag === 6 ? [4] : [0];

  switch ($var72[0]) {
    case 0:
      break;

    case 1:
      refs_of_tref(s, x.data[1]);
      refs_of_typ(s, x.data[2]);
      break;

    case 2:
      refs_of_typ(s, $var72[1]);
      break;

    case 3:
      refs_of_tspec(s, $var72[1]);
      break;

    case 4:
      refs_of_callsig(s, x.data);
      break;
  }
}
export function refs_of_inst(s, i) {
  refs_of_typs(s, i);
}
export function refs_of_tspec(s, x) {
  refs_of_tref(s, x.TypeRef);
  refs_of_inst(s, x.GenericArgs);
}
export function refs_of_callsig(s, csig) {
  refs_of_typs(s, csig.ArgTypes);
  refs_of_typ(s, csig.ReturnType);
}
export function refs_of_genparam(s, x) {
  refs_of_typs(s, x.Constraints);
}
export function refs_of_genparams(s, b) {
  iterate(function (x) {
    refs_of_genparam(s, x);
  }, b);
}
export function refs_of_dloc(s, ts) {
  refs_of_tref(s, ts);
}
export function refs_of_mref(s, x) {
  refs_of_dloc(s, x.DeclaringTypeRef);
  refs_of_typs(s, x.mrefArgs);
  refs_of_typ(s, x.mrefReturn);
}
export function refs_of_fref(s, x) {
  refs_of_tref(s, x.DeclaringTypeRef);
  refs_of_typ(s, x.Type);
}
export function refs_of_ospec(s, _arg1) {
  refs_of_mref(s, _arg1.data[0]);
  refs_of_typ(s, _arg1.data[1]);
}
export function refs_of_mspec(s, x) {
  refs_of_mref(s, x.MethodRef);
  refs_of_typ(s, x.DeclaringType);
  refs_of_inst(s, x.GenericArgs);
}
export function refs_of_fspec(s, x) {
  refs_of_fref(s, x.FieldRef);
  refs_of_typ(s, x.DeclaringType);
}
export function refs_of_typs(s, l) {
  iterate(function (x) {
    refs_of_typ(s, x);
  }, l);
}
export function refs_of_token(s, x) {
  if (x.tag === 1) {
    refs_of_mspec(s, x.data);
  } else if (x.tag === 2) {
    refs_of_fspec(s, x.data);
  } else {
    refs_of_typ(s, x.data);
  }
}
export function refs_of_custom_attr(s, x) {
  refs_of_mspec(s, x.Method);
}
export function refs_of_custom_attrs(s, cas) {
  iterate(function (x) {
    refs_of_custom_attr(s, x);
  }, cas.AsList);
}
export function refs_of_varargs(s, tyso) {
  iterate(function (l) {
    refs_of_typs(s, l);
  }, defaultArg(tyso, [], $var73 => [$var73]));
}
export function refs_of_instr(s, x) {
  const $var74 = x.tag === 53 ? [0, x.data[0], x.data[1]] : x.tag === 49 ? [0, x.data[1], x.data[2]] : x.tag === 50 ? [1] : x.tag === 51 ? [2] : x.tag === 44 ? [3, x.data] : x.tag === 52 ? [3, x.data] : x.tag === 69 ? [3, x.data] : x.tag === 59 ? [4, x.data[1]] : x.tag === 60 ? [4, x.data[2]] : x.tag === 61 ? [4, x.data] : x.tag === 62 ? [4, x.data] : x.tag === 63 ? [4, x.data[1]] : x.tag === 64 ? [4, x.data[2]] : x.tag === 66 ? [5, x.data] : x.tag === 67 ? [5, x.data] : x.tag === 70 ? [5, x.data] : x.tag === 71 ? [5, x.data] : x.tag === 72 ? [5, x.data[2]] : x.tag === 73 ? [5, x.data[2]] : x.tag === 74 ? [5, x.data] : x.tag === 75 ? [5, x.data] : x.tag === 76 ? [5, x.data] : x.tag === 77 ? [5, x.data] : x.tag === 81 ? [5, x.data[1]] : x.tag === 80 ? [5, x.data[3]] : x.tag === 82 ? [5, x.data[1]] : x.tag === 83 ? [5, x.data[1]] : x.tag === 85 ? [5, x.data] : x.tag === 87 ? [5, x.data] : x.tag === 94 ? [5, x.data] : x.tag === 68 ? [6] : x.tag === 79 ? [7] : x.tag === 78 ? [7] : x.tag === 65 ? [7] : x.tag === 46 ? [7] : x.tag === 42 ? [7] : x.tag === 41 ? [7] : x.tag === 40 ? [7] : x.tag === 39 ? [7] : x.tag === 38 ? [7] : x.tag === 37 ? [7] : x.tag === 36 ? [7] : x.tag === 35 ? [7] : x.tag === 57 ? [7] : x.tag === 43 ? [7] : x.tag === 45 ? [7] : x.tag === 58 ? [7] : x.tag === 86 ? [7] : x.tag === 84 ? [7] : x.tag === 54 ? [7] : x.tag === 93 ? [7] : x.tag === 92 ? [7] : x.tag === 91 ? [7] : x.tag === 47 ? [7] : x.tag === 56 ? [7] : x.tag === 55 ? [7] : x.tag === 90 ? [7] : x.tag === 88 ? [7] : x.tag === 0 ? [7] : x.tag === 1 ? [7] : x.tag === 2 ? [7] : x.tag === 3 ? [7] : x.tag === 4 ? [7] : x.tag === 5 ? [7] : x.tag === 6 ? [7] : x.tag === 7 ? [7] : x.tag === 8 ? [7] : x.tag === 9 ? [7] : x.tag === 10 ? [7] : x.tag === 11 ? [7] : x.tag === 12 ? [7] : x.tag === 13 ? [7] : x.tag === 14 ? [7] : x.tag === 15 ? [7] : x.tag === 16 ? [7] : x.tag === 17 ? [7] : x.tag === 18 ? [7] : x.tag === 19 ? [7] : x.tag === 20 ? [7] : x.tag === 21 ? [7] : x.tag === 22 ? [7] : x.tag === 23 ? [7] : x.tag === 24 ? [7] : x.tag === 25 ? [7] : x.tag === 26 ? [7] : x.tag === 27 ? [7] : x.tag === 28 ? [7] : x.tag === 29 ? [7] : x.tag === 30 ? [7] : x.tag === 31 ? [7] : x.tag === 32 ? [7] : x.tag === 33 ? [7] : x.tag === 34 ? [7] : x.tag === 89 ? [7] : x.tag === 95 ? [7] : [0, x.data[1], x.data[2]];

  switch ($var74[0]) {
    case 0:
      refs_of_mspec(s, $var74[1]);
      refs_of_varargs(s, $var74[2]);
      break;

    case 1:
      refs_of_typ(s, x.data[1]);
      refs_of_mspec(s, x.data[2]);
      refs_of_varargs(s, x.data[3]);
      break;

    case 2:
      refs_of_callsig(s, x.data[1]);
      refs_of_varargs(s, x.data[2]);
      break;

    case 3:
      refs_of_mspec(s, $var74[1]);
      break;

    case 4:
      refs_of_fspec(s, $var74[1]);
      break;

    case 5:
      refs_of_typ(s, $var74[1]);
      break;

    case 6:
      refs_of_token(s, x.data);
      break;

    case 7:
      break;
  }
}
export function refs_of_il_code(s, c) {
  c.Instrs.forEach(function (x) {
    refs_of_instr(s, x);
  });
  iterate(function (e) {
    (function (_arg3) {
      if (_arg3.tag === 3) {
        refs_of_typ(s, _arg3.data[0]);
      }
    })(e.Clause);
  }, c.Exceptions);
}
export function refs_of_ilmbody(s, il) {
  iterate(function (loc) {
    refs_of_local(s, loc);
  }, il.Locals);
  refs_of_il_code(s, il.Code);
}
export function refs_of_local(s, loc) {
  refs_of_typ(s, loc.Type);
}
export function refs_of_mbody(s, x) {
  if (x.tag === 0) {
    refs_of_ilmbody(s, x.data);
  } else if (x.tag === 1) {
    refs_of_modref(s, x.data.Where);
  }
}
export function refs_of_mdef(s, md) {
  iterate(function (p) {
    refs_of_param(s, p);
  }, md.Parameters);
  refs_of_return(s, md.Return);
  refs_of_mbody(s, md.Body.Contents);
  refs_of_custom_attrs(s, md.CustomAttrs);
  refs_of_genparams(s, md.GenericParams);
}
export function refs_of_param(s, p) {
  refs_of_typ(s, p.Type);
}
export function refs_of_return(s, rt) {
  refs_of_typ(s, rt.Type);
}
export function refs_of_mdefs(s, x) {
  iterate(function (md) {
    refs_of_mdef(s, md);
  }, x);
}
export function refs_of_event_def(s, ed) {
  iterate(function (x) {
    refs_of_typ(s, x);
  }, defaultArg(ed.EventType, [], $var75 => [$var75]));
  refs_of_mref(s, ed.AddMethod);
  refs_of_mref(s, ed.RemoveMethod);
  iterate(function (x_1) {
    refs_of_mref(s, x_1);
  }, defaultArg(ed.FireMethod, [], $var76 => [$var76]));
  iterate(function (x_2) {
    refs_of_mref(s, x_2);
  }, ed.OtherMethods);
  refs_of_custom_attrs(s, ed.CustomAttrs);
}
export function refs_of_events(s, x) {
  iterate(function (ed) {
    refs_of_event_def(s, ed);
  }, x.AsList);
}
export function refs_of_property_def(s, pd) {
  iterate(function (x) {
    refs_of_mref(s, x);
  }, defaultArg(pd.SetMethod, [], $var77 => [$var77]));
  iterate(function (x_1) {
    refs_of_mref(s, x_1);
  }, defaultArg(pd.GetMethod, [], $var78 => [$var78]));
  refs_of_typ(s, pd.PropertyType);
  refs_of_typs(s, pd.Args);
  refs_of_custom_attrs(s, pd.CustomAttrs);
}
export function refs_of_properties(s, x) {
  iterate(function (pd) {
    refs_of_property_def(s, pd);
  }, x.AsList);
}
export function refs_of_fdef(s, fd) {
  refs_of_typ(s, fd.FieldType);
  refs_of_custom_attrs(s, fd.CustomAttrs);
}
export function refs_of_fields(s, fields) {
  iterate(function (fd) {
    refs_of_fdef(s, fd);
  }, fields);
}
export function refs_of_method_impls(s, mimpls) {
  iterate(function (m) {
    refs_of_method_impl(s, m);
  }, mimpls);
}
export function refs_of_method_impl(s, m) {
  refs_of_ospec(s, m.Overrides);
  refs_of_mspec(s, m.OverrideBy);
}
export function refs_of_tdef_kind(_s, _k) {}
export function refs_of_tdef(s, td) {
  refs_of_types(s, td.NestedTypes);
  refs_of_genparams(s, td.GenericParams);
  refs_of_typs(s, td.Implements);
  iterate(function (x) {
    refs_of_typ(s, x);
  }, defaultArg(td.Extends, [], $var79 => [$var79]));
  refs_of_mdefs(s, td.Methods);
  refs_of_fields(s, td.Fields.AsList);
  refs_of_method_impls(s, td.MethodImpls.AsList);
  refs_of_events(s, td.Events);
  refs_of_tdef_kind(s, td);
  refs_of_custom_attrs(s, td.CustomAttrs);
  refs_of_properties(s, td.Properties);
}
export function refs_of_string(_s, _arg2) {}
export function refs_of_types(s, types) {
  iterate(function (td) {
    refs_of_tdef(s, td);
  }, types);
}
export function refs_of_exported_type(s, c) {
  refs_of_custom_attrs(s, c.CustomAttrs);
}
export function refs_of_exported_types(s, tab) {
  iterate(function (c) {
    refs_of_exported_type(s, c);
  }, tab.AsList);
}
export function refs_of_resource_where(s, x) {
  if (x.tag === 1) {} else if (x.tag === 2) {
    refs_of_modref(s, x.data[0]);
  } else if (x.tag === 3) {
    refs_of_assref(s, x.data);
  }
}
export function refs_of_resource(s, x) {
  refs_of_resource_where(s, x.Location);
  refs_of_custom_attrs(s, x.CustomAttrs);
}
export function refs_of_resources(s, tab) {
  iterate(function (x) {
    refs_of_resource(s, x);
  }, tab.AsList);
}
export function refs_of_modul(s, m) {
  refs_of_types(s, m.TypeDefs);
  refs_of_resources(s, m.Resources);
  iterate(function (m_1) {
    refs_of_manifest(s, m_1);
  }, defaultArg(m.Manifest, [], $var80 => [$var80]));
}
export function refs_of_manifest(s, m) {
  refs_of_custom_attrs(s, m.CustomAttrs);
  refs_of_exported_types(s, m.ExportedTypes);
}
export function computeILRefs(modul) {
  const s = new ILReferencesAccumulator(create_1(null, fromEqualityComparer({
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

  })), create_1(null, fromEqualityComparer({
    GetHashCode(x) {
      return function (obj_1) {
        return hash_1(obj_1);
      }(x) | 0;
    },

    Equals(x, y) {
      return function (e1_1, e2_1) {
        return equals(e1_1, e2_1);
      }(x, y);
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["System.Collections.Generic.IEqualityComparer"]
      };
    }

  })));
  refs_of_modul(s, modul);
  return new ILReferences(fold(function (acc, x) {
    return new List(x, acc);
  }, new List(), s.refsA), fold(function (acc_1, x_1) {
    return new List(x_1, acc_1);
  }, new List(), s.refsM));
}
export const tspan = create_2((() => {
  let copyOfStruct = utcNow();
  return unixEpochMillisecondsToTicks(copyOfStruct.getTime(), offset_1(copyOfStruct));
})().sub((() => {
  let copyOfStruct_1 = create_3(2000, 1, 1);
  return unixEpochMillisecondsToTicks(copyOfStruct_1.getTime(), offset_1(copyOfStruct_1));
})()));
export function parseILVersion(vstr) {
  var copyOfStruct_1;
  var copyOfStruct;
  let vstr_1 = trim(vstr, "start", "v");
  const versionComponents = split(vstr_1, ".");

  if (versionComponents.length > 2) {
    const defaultBuild = (days(tspan) & 0xFFFF) % 65535 - 1;
    const defaultRevision = ((copyOfStruct_1 = (copyOfStruct = utcNow(), timeOfDay(copyOfStruct)), totalSeconds(copyOfStruct_1)) / 2 & 0xFFFF) % 65535 - 1;

    if (versionComponents[2] === "*") {
      if (versionComponents.length > 3) {
        throw new Error("Invalid version format");
      } else {
        versionComponents[2] = toString(defaultBuild);
        vstr_1 = join(".", ...versionComponents) + "." + toString(defaultRevision);
      }
    } else if (versionComponents.length > 3 ? versionComponents[3] === "*" : false) {
      versionComponents[3] = toString(defaultRevision);
      vstr_1 = join(".", ...versionComponents);
    }
  }

  const parts = split(vstr_1, ".");
  const versions = Uint16Array.from(append_1(map(function (value) {
    return parse(value);
  }, parts, Uint16Array), new Uint16Array([0, 0, 0, 0])));
  return [versions[0], versions[1], versions[2], versions[3]];
}
export function compareILVersions(tupledArg, _arg1) {
  const c = comparePrimitives(tupledArg[0], _arg1[0]) | 0;

  if (c !== 0) {
    return c | 0;
  } else {
    const c_1 = comparePrimitives(tupledArg[1], _arg1[1]) | 0;

    if (c_1 !== 0) {
      return c_1 | 0;
    } else {
      const c_2 = comparePrimitives(tupledArg[2], _arg1[2]) | 0;

      if (c_2 !== 0) {
        return c_2 | 0;
      } else {
        const c_3 = comparePrimitives(tupledArg[3], _arg1[3]) | 0;

        if (c_3 !== 0) {
          return c_3 | 0;
        } else {
          return 0;
        }
      }
    }
  }
}
export function unscopeILTypeRef(x) {
  return ILTypeRef.Create(new ILScopeRef(0), x.Enclosing, x.Name);
}
export function unscopeILTypeSpec(tspec) {
  const tref = tspec.TypeRef;
  const tinst = tspec.GenericArgs;
  const tref_1 = unscopeILTypeRef(tref);
  return ILTypeSpec.Create(tref_1, unscopeILTypes(tinst));
}
export function unscopeILType(typ) {
  switch (typ.tag) {
    case 4:
      return new ILType(4, unscopeILType(typ.data));

    case 6:
      return new ILType(6, unscopeILCallSig(typ.data));

    case 5:
      return new ILType(5, unscopeILType(typ.data));

    case 3:
      return mkILBoxedType(unscopeILTypeSpec(typ.data));

    case 1:
      return new ILType(1, [typ.data[0], unscopeILType(typ.data[1])]);

    case 2:
      return new ILType(2, unscopeILTypeSpec(typ.data));

    case 8:
      return new ILType(8, [typ.data[0], unscopeILTypeRef(typ.data[1]), unscopeILType(typ.data[2])]);

    default:
      return typ;
  }
}
export function unscopeILTypes(i) {
  if (i.tail == null) {
    return i;
  } else {
    return map_1(function (arg00_) {
      return unscopeILType(arg00_);
    }, i);
  }
}
export function unscopeILCallSig(csig) {
  return mkILCallSig(csig.CallingConv, unscopeILTypes(csig.ArgTypes), unscopeILType(csig.ReturnType));
}
export function resolveILMethodRefWithRescope(r, td, mref) {
  const args = mref.ArgTypes;
  const nargs = args.length | 0;
  const nm = mref.Name;
  const possibles = td.Methods.FindByNameAndArity(nm, nargs);

  if (possibles.tail == null) {
    throw new Error("no method named " + nm + " found in type " + td.Name);
  }

  const argTypes = function (list) {
    return map_1(r, list);
  }(mref.ArgTypes);

  const retType = r(mref.ReturnType);
  const matchValue = filter(function (md) {
    return (mref.CallingConv.Equals(md.CallingConv) ? List_1.lengthsEqAndForall2(function (p1, p2) {
      return r(p1.Type).Equals(p2);
    }, md.Parameters, argTypes) : false) ? r(md.Return.Type).Equals(retType) : false;
  }, possibles);

  if (matchValue.tail != null) {
    if (matchValue.tail.tail == null) {
      return matchValue.head;
    } else {
      throw new Error("multiple methods named " + nm + " appear with identical argument types in type " + td.Name);
    }
  } else {
    throw new Error("no method named " + nm + " with appropriate argument types found in type " + td.Name);
  }
}
export function resolveILMethodRef(td, mref) {
  return resolveILMethodRefWithRescope(function (x) {
    return x;
  }, td, mref);
}
export function mkRefToILModule(m) {
  return ILModuleRef.Create(m.Name, true, null);
}
export function ungenericizeTypeName(n) {
  if (_String.contains(n, "`") ? (() => {
    const m = _String.rindex(n, "`") | 0;
    const res = {
      contents: m < n.length - 1
    };

    for (let i = m + 1; i <= n.length - 1; i++) {
      if (res.contents ? n[i] >= "0" : false) {
        res.contents = n[i] <= "9";
      } else {
        res.contents = false;
      }
    }

    return res.contents;
  })() : false) {
    const pos = _String.rindex(n, "`") | 0;
    return _String.sub(n, 0, pos);
  } else {
    return n;
  }
}
export class ILEventRef {
  constructor(erA, erB) {
    this.erA = erA;
    this.erB = erB;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILEventRef",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        erA: ILTypeRef,
        erB: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static Create(a, b) {
    return new ILEventRef(a, b);
  }

  get DeclaringTypeRef() {
    return this.erA;
  }

  get Name() {
    return this.erB;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILEventRef", ILEventRef);
export class ILPropertyRef {
  constructor(prA, prB) {
    this.prA = prA;
    this.prB = prB;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.IL.ILPropertyRef",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        prA: ILTypeRef,
        prB: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static Create(a, b) {
    return new ILPropertyRef(a, b);
  }

  get DeclaringTypeRef() {
    return this.prA;
  }

  get Name() {
    return this.prB;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.IL.ILPropertyRef", ILPropertyRef);