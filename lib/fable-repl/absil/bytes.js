import { fromBits } from "../fable-core/Long";
import { copyTo, getSubArray } from "../fable-core/Array";
import { append, initialize } from "../fable-core/Seq";
import { System } from "../fcs-fable/adapters";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareRecords, equalsRecords, Array as _Array } from "../fable-core/Util";
export const Bytes = function (__exports) {
  const b0 = __exports.b0 = function (n) {
    return n & 255 | 0;
  };

  const b1 = __exports.b1 = function (n) {
    return n >> 8 & 255 | 0;
  };

  const b2 = __exports.b2 = function (n) {
    return n >> 16 & 255 | 0;
  };

  const b3 = __exports.b3 = function (n) {
    return n >> 24 & 255 | 0;
  };

  const dWw1 = __exports.dWw1 = function (n) {
    return ~~n.shr(32).and(fromBits(4294967295, 0, false)).toNumber() | 0;
  };

  const dWw0 = __exports.dWw0 = function (n) {
    return ~~n.and(fromBits(4294967295, 0, false)).toNumber() | 0;
  };

  const get = __exports.get = function (b, n) {
    return ~~b[n] | 0;
  };

  const zeroCreate = __exports.zeroCreate = function (n) {
    return new Uint8Array(n);
  };

  const sub = __exports.sub = function (b, s, l) {
    return getSubArray(b, s, l);
  };

  const blit = __exports.blit = function (a, b, c, d, e) {
    copyTo(a, b, c, d, e);
  };

  const ofInt32Array = __exports.ofInt32Array = function (arr) {
    return Uint8Array.from(initialize(arr.length, function (i) {
      return arr[i] & 0xFF;
    }));
  };

  const stringAsUtf8NullTerminated = __exports.stringAsUtf8NullTerminated = function (s) {
    return Uint8Array.from(append(System.Text.Encoding.UTF8.GetBytes(s), ofInt32Array(new Int32Array([0]))));
  };

  const stringAsUnicodeNullTerminated = __exports.stringAsUnicodeNullTerminated = function (s) {
    return Uint8Array.from(append(System.Text.Encoding.Unicode.GetBytes(s), ofInt32Array(new Int32Array([0, 0]))));
  };

  return __exports;
}({});
export class ByteStream {
  constructor(bytes, pos, max) {
    this.bytes = bytes;
    this.pos = pos | 0;
    this.max = max | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.ByteStream",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        bytes: _Array(Uint8Array, true),
        pos: "number",
        max: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  ReadByte() {
    if (this.pos >= this.max) {
      throw new Error("end of stream");
    }

    const res = this.bytes[this.pos];
    this.pos = this.pos + 1 | 0;
    return res;
  }

  ReadUtf8String(n) {
    const res = System.Text.Encoding.UTF8.GetString(this.bytes, this.pos, n);
    this.pos = this.pos + n | 0;
    return res;
  }

  static FromBytes(b, n, len) {
    if (n < 0 ? true : n + len > b.length) {
      throw new Error("FromBytes");
    }

    return new ByteStream(b, n, n + len);
  }

  ReadBytes(n) {
    if (this.pos + n > this.max) {
      throw new Error("ReadBytes: end of stream");
    }

    const res = Bytes.sub(this.bytes, this.pos, n);
    this.pos = this.pos + n | 0;
    return res;
  }

  get Position() {
    return this.pos;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.ByteStream", ByteStream);
export class ByteBuffer {
  constructor(bbArray, bbCurrent) {
    this.bbArray = bbArray;
    this.bbCurrent = bbCurrent | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Internal.ByteBuffer",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        bbArray: _Array(Uint8Array, true),
        bbCurrent: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  Ensure(newSize) {
    const oldBufSize = this.bbArray.length | 0;

    if (newSize > oldBufSize) {
      const old = this.bbArray;
      this.bbArray = Bytes.zeroCreate(newSize > oldBufSize * 2 ? newSize : oldBufSize * 2);
      Bytes.blit(old, 0, this.bbArray, 0, this.bbCurrent);
    }
  }

  Close() {
    return Bytes.sub(this.bbArray, 0, this.bbCurrent);
  }

  EmitIntAsByte(i) {
    const newSize = this.bbCurrent + 1 | 0;
    this.Ensure(newSize);
    this.bbArray[this.bbCurrent] = i & 0xFF;
    this.bbCurrent = newSize | 0;
  }

  EmitByte(b) {
    this.EmitIntAsByte(~~b);
  }

  EmitIntsAsBytes(arr) {
    const n = arr.length | 0;
    const newSize = this.bbCurrent + n | 0;
    this.Ensure(newSize);
    const bbarr = this.bbArray;
    const bbbase = this.bbCurrent | 0;

    for (let i = 0; i <= n - 1; i++) {
      bbarr[bbbase + i] = arr[i] & 0xFF;
    }

    this.bbCurrent = newSize | 0;
  }

  FixupInt32(pos, n) {
    this.bbArray[pos] = Bytes.b0(n) & 0xFF;
    this.bbArray[pos + 1] = Bytes.b1(n) & 0xFF;
    this.bbArray[pos + 2] = Bytes.b2(n) & 0xFF;
    this.bbArray[pos + 3] = Bytes.b3(n) & 0xFF;
  }

  EmitInt32(n) {
    const newSize = this.bbCurrent + 4 | 0;
    this.Ensure(newSize);

    ((arg00, arg10) => {
      this.FixupInt32(arg00, arg10);
    })(this.bbCurrent, n);

    this.bbCurrent = newSize | 0;
  }

  EmitBytes(i) {
    const n = i.length | 0;
    const newSize = this.bbCurrent + n | 0;
    this.Ensure(newSize);
    Bytes.blit(i, 0, this.bbArray, this.bbCurrent, n);
    this.bbCurrent = newSize | 0;
  }

  EmitInt32AsUInt16(n) {
    const newSize = this.bbCurrent + 2 | 0;
    this.Ensure(newSize);
    this.bbArray[this.bbCurrent] = Bytes.b0(n) & 0xFF;
    this.bbArray[this.bbCurrent + 1] = Bytes.b1(n) & 0xFF;
    this.bbCurrent = newSize | 0;
  }

  EmitBoolAsByte(b) {
    this.EmitIntAsByte(b ? 1 : 0);
  }

  EmitUInt16(x) {
    this.EmitInt32AsUInt16(~~x);
  }

  EmitInt64(x) {
    this.EmitInt32(Bytes.dWw0(x));
    this.EmitInt32(Bytes.dWw1(x));
  }

  get Position() {
    return this.bbCurrent;
  }

  static Create(sz) {
    return new ByteBuffer(Bytes.zeroCreate(sz), 0);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Internal.ByteBuffer", ByteBuffer);