import { Int32, Pair, Bits } from "./lib";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { toFail, printf, toText } from "../fable-core/String";
import { hash } from "../fable-core/Util";
import { tryGetValue } from "../fable-core/Map";
import { fromNumber, fromBits } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { Microsoft, System } from "../fcs-fable/adapters";
import { String as _String, Order } from "../absil/illib";
import CurriedLambda from "../fable-core/CurriedLambda";
export const posBitCount = 25;
export const posColumnMask = Bits.mask32(0, 9);
export const lineColumnMask = Bits.mask32(9, 16);
export class pos {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Range.pos",
      interfaces: ["FSharpRecord"],
      properties: {
        code: "number"
      }
    };
  }

  constructor(code) {
    this.code = code | 0;
  }

  static [".ctor"](l, c) {
    const l_1 = (0 > l ? 0 : l) | 0;
    const c_1 = (0 > c ? 0 : c) | 0;
    const p = c_1 & posColumnMask | l_1 << 9 & lineColumnMask | 0;
    return new pos(p);
  }

  get Line() {
    const $var1 = this.code | 0;
    return ~~($var1 >>> 0 >>> 9) | 0;
  }

  get Column() {
    return this.code & posColumnMask;
  }

  get Encoding() {
    return this.code;
  }

  static get EncodingSize() {
    return posBitCount;
  }

  static Decode(code) {
    return new pos(code);
  }

  ToString() {
    return toText(printf("(%d,%d)"))(this.Line, this.Column);
  }

  Equals(obj) {
    if (obj instanceof pos) {
      const p2 = obj;
      return this.code === p2.Encoding;
    } else {
      return false;
    }
  }

  GetHashCode() {
    return hash(this.code);
  }

}
setType("Microsoft.FSharp.Compiler.Range.pos", pos);
export class FileIndexTable {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Range.FileIndexTable",
      properties: {}
    };
  }

  constructor() {
    this.indexToFileTable = [];
    this.fileToIndexTable = new Map();
  }

  FileToIndex(f) {
    const patternInput = tryGetValue(this.fileToIndexTable, f, 0);

    if (patternInput[0]) {
      return patternInput[1] | 0;
    } else {
      const n = this.indexToFileTable.length | 0;
      this.indexToFileTable.push(f);
      this.fileToIndexTable.set(f, n);
      return n | 0;
    }
  }

  IndexToFile(n) {
    if (n < 0) {
      toFail(printf("fileOfFileIndex: negative argument: n = %d\n"))(n);
    }

    if (n >= this.indexToFileTable.length) {
      toFail(printf("fileOfFileIndex: invalid argument: n = %d\n"))(n);
    }

    return this.indexToFileTable[n];
  }

}
setType("Microsoft.FSharp.Compiler.Range.FileIndexTable", FileIndexTable);
export const maxFileIndex = Bits.pown32(14);
export const fileIndexTable = new FileIndexTable();
export function fileIndexOfFile(f) {
  return fileIndexTable.FileToIndex(f) % maxFileIndex | 0;
}
export function fileOfFileIndex(n) {
  return fileIndexTable.IndexToFile(n);
}
export function mkPos(l, c) {
  return pos[".ctor"](l, c);
}
export class range {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Range.range",
      interfaces: ["FSharpRecord"],
      properties: {
        code: Long
      }
    };
  }

  constructor(code) {
    this.code = code;
  }

  static get Zero() {
    return new range(fromBits(0, 0, false));
  }

  static [".ctor_0"](fidx, bl, bc, el, ec) {
    return new range(fromNumber(fidx, false).or(fromNumber(bl, false).shl(14)).or(fromNumber(bc, false).shl(30)).or(fromNumber(el - bl, false).shl(39)).or(fromNumber(ec, false).shl(54)));
  }

  static [".ctor_1"](fidx, b, e) {
    return range[".ctor_0"](fidx, b.Line, b.Column, e.Line, e.Column);
  }

  get StartLine() {
    return ~~this.code.and(fromBits(1073725440, 0, false)).shr(14).toNumber();
  }

  get StartColumn() {
    return ~~this.code.and(fromBits(3221225472, 127, false)).shr(30).toNumber();
  }

  get EndLine() {
    return ~~this.code.and(fromBits(0, 4194176, false)).shr(39).toNumber() + this.StartLine;
  }

  get EndColumn() {
    return ~~this.code.and(fromBits(0, 2143289344, false)).shr(54).toNumber();
  }

  get IsSynthetic() {
    return ~~this.code.and(fromBits(0, 2147483648, false)).shr(63).toNumber() !== 0;
  }

  get Start() {
    return pos[".ctor"](this.StartLine, this.StartColumn);
  }

  get End() {
    return pos[".ctor"](this.EndLine, this.EndColumn);
  }

  get FileIndex() {
    return ~~this.code.and(fromBits(16383, 0, false)).toNumber();
  }

  get StartRange() {
    return range[".ctor_1"](this.FileIndex, this.Start, this.Start);
  }

  get EndRange() {
    return range[".ctor_1"](this.FileIndex, this.End, this.End);
  }

  get FileName() {
    return fileOfFileIndex(this.FileIndex);
  }

  MakeSynthetic() {
    return new range(this.code.or(fromBits(0, 2147483648, false)));
  }

  ToString() {
    return toText(printf("%s (%d,%d--%d,%d) IsSynthetic=%b"))(this.FileName, this.StartLine, this.StartColumn, this.EndLine, this.EndColumn, this.IsSynthetic);
  }

  ToShortString() {
    return toText(printf("(%d,%d--%d,%d)"))(this.StartLine, this.StartColumn, this.EndLine, this.EndColumn);
  }

  get Code() {
    return this.code;
  }

  Equals(obj) {
    if (obj instanceof range) {
      const r2 = obj;
      return this.code.Equals(r2.Code);
    } else {
      return false;
    }
  }

  GetHashCode() {
    return hash(this.code);
  }

}
setType("Microsoft.FSharp.Compiler.Range.range", range);
export function mkRange(f, b, e) {
  let normalizedFilePath;

  if (System.IO.Path.IsPathRooted(f)) {
    try {
      normalizedFilePath = System.IO.Path.GetFullPath(f);
    } catch (matchValue) {
      normalizedFilePath = f;
    }
  } else {
    normalizedFilePath = f;
  }

  return range[".ctor_1"](fileIndexOfFile(normalizedFilePath), b, e);
}
export function mkFileIndexRange(fi, b, e) {
  return range[".ctor_1"](fi, b, e);
}
export const posOrder = Order.orderOn(function (p) {
  return [p.Line, p.Column];
}, Pair.order(Int32.order, Int32.order));
export const rangeOrder = Order.orderOn(function (r) {
  return [r.FileName, r.Start];
}, Pair.order(_String.order, posOrder));
export function outputPos(os, m) {
  var clo1;
  (clo1 = Microsoft.FSharp.Core.Printf.fprintf(os), CurriedLambda(function (arg10) {
    return CurriedLambda(clo1)(arg10);
  }))(printf("(%d,%d)"), m.Line, m.Column);
}
export function boutputPos(os, m) {
  var clo1;
  (clo1 = Microsoft.FSharp.Core.Printf.bprintf(os), CurriedLambda(function (arg10) {
    return CurriedLambda(clo1)(arg10);
  }))(printf("(%d,%d)"), m.Line, m.Column);
}
export function stringPos(m) {
  return toText(printf("(%d,%d)"))(m.Line, m.Column);
}
export function outputRange(os, m) {
  var clo1;
  (clo1 = Microsoft.FSharp.Core.Printf.fprintf(os), CurriedLambda(function (arg10) {
    return CurriedLambda(clo1)(arg10);
  }))(printf("%s%s-%s"), m.FileName, stringPos(m.Start), stringPos(m.End));
}
export function boutputRange(os, m) {
  var clo1;
  (clo1 = Microsoft.FSharp.Core.Printf.bprintf(os), CurriedLambda(function (arg10) {
    return CurriedLambda(clo1)(arg10);
  }))(printf("%s%s-%s"), m.FileName, stringPos(m.Start), stringPos(m.End));
}
export function posGt(p1, p2) {
  if (p1.Line > p2.Line) {
    return true;
  } else if (p1.Line === p2.Line) {
    return p1.Column > p2.Column;
  } else {
    return false;
  }
}
export function posEq(p1, p2) {
  if (p1.Line === p2.Line) {
    return p1.Column === p2.Column;
  } else {
    return false;
  }
}
export function posGeq(p1, p2) {
  if (posEq(p1, p2)) {
    return true;
  } else {
    return posGt(p1, p2);
  }
}
export function posLt(p1, p2) {
  return posGt(p2, p1);
}
export function unionRanges(m1, m2) {
  if (m1.FileIndex !== m2.FileIndex) {
    return m2;
  } else {
    const b = (m1.StartLine > m2.StartLine ? true : m1.StartLine === m2.StartLine ? m1.StartColumn > m2.StartColumn : false) ? m2 : m1;
    const e = (m1.EndLine > m2.EndLine ? true : m1.EndLine === m2.EndLine ? m1.EndColumn > m2.EndColumn : false) ? m1 : m2;
    return range[".ctor_0"](m1.FileIndex, b.StartLine, b.StartColumn, e.EndLine, e.EndColumn);
  }
}
export function rangeContainsRange(m1, m2) {
  if (m1.FileIndex === m2.FileIndex ? posGeq(m2.Start, m1.Start) : false) {
    return posGeq(m1.End, m2.End);
  } else {
    return false;
  }
}
export function rangeContainsPos(m1, p) {
  if (posGeq(p, m1.Start)) {
    return posGeq(m1.End, p);
  } else {
    return false;
  }
}
export function rangeBeforePos(m1, p) {
  return posGeq(p, m1.End);
}
export function rangeN(filename, line) {
  return mkRange(filename, mkPos(line, 0), mkPos(line, 0));
}
export const pos0 = mkPos(1, 0);
export const range0 = rangeN("unknown", 1);
export const rangeStartup = rangeN("startup", 1);
export const rangeCmdArgs = rangeN("commandLineArgs", 0);
export function trimRangeToLine(r) {
  const patternInput = [r.StartLine, r.StartColumn];
  const patternInput_1 = [r.EndLine, r.EndColumn];

  if (patternInput_1[0] <= patternInput[0]) {
    return r;
  } else {
    const patternInput_2 = [patternInput[0] + 1, 0];
    return range[".ctor_0"](r.FileIndex, patternInput[0], patternInput[1], patternInput_2[0], patternInput_2[1]);
  }
}
export function stringOfPos(pos_1) {
  return toText(printf("(%d,%d)"))(pos_1.Line, pos_1.Column);
}
export function stringOfRange(r) {
  return toText(printf("%s%s-%s"))(r.FileName, stringOfPos(r.Start), stringOfPos(r.End));
}
export const Line = function (__exports) {
  const fromZ = __exports.fromZ = function (line) {
    return line + 1 | 0;
  };

  const toZ = __exports.toZ = function (line) {
    return line - 1 | 0;
  };

  return __exports;
}({});
export const Pos = function (__exports) {
  const fromZ_1 = __exports.fromZ = function (line, idx) {
    return mkPos(Line.fromZ(line), idx);
  };

  const toZ_1 = __exports.toZ = function (p) {
    return [Line.toZ(p.Line), p.Column];
  };

  return __exports;
}({});

const _Range = function (__exports) {
  const toZ_2 = __exports.toZ = function (m) {
    return [Pos.toZ(m.Start), Pos.toZ(m.End)];
  };

  const toFileZ = __exports.toFileZ = function (m) {
    return [m.FileName, toZ_2(m)];
  };

  return __exports;
}({});

export { _Range as Range };