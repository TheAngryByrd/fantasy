import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Interface, GenericParam, Array as _Array, compareRecords, equalsRecords } from "../fable-core/Util";
import { copyTo, getSubArray } from "../fable-core/Array";
import { System } from "../fcs-fable/adapters";
export class Position {
  constructor(fileIndex, line, originalLine, absoluteOffset, startOfLineAbsoluteOffset) {
    this.FileIndex = fileIndex | 0;
    this.Line = line | 0;
    this.OriginalLine = originalLine | 0;
    this.AbsoluteOffset = absoluteOffset | 0;
    this.StartOfLineAbsoluteOffset = startOfLineAbsoluteOffset | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Lexing.Position",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        FileIndex: "number",
        Line: "number",
        OriginalLine: "number",
        AbsoluteOffset: "number",
        StartOfLineAbsoluteOffset: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  get Column() {
    return this.AbsoluteOffset - this.StartOfLineAbsoluteOffset;
  }

  static [".ctor"](fileIndex, line, originalLine, startOfLineAbsoluteOffset, absoluteOffset) {
    return new Position(fileIndex, line, originalLine, absoluteOffset, startOfLineAbsoluteOffset);
  }

  get NextLine() {
    return Position[".ctor"](this.FileIndex, this.Line + 1, this.OriginalLine + 1, this.AbsoluteOffset, this.AbsoluteOffset);
  }

  EndOfToken(n) {
    return Position[".ctor"](this.FileIndex, this.Line, this.OriginalLine, this.StartOfLineAbsoluteOffset, this.AbsoluteOffset + n);
  }

  ShiftColumnBy(by) {
    return Position[".ctor"](this.FileIndex, this.Line, this.OriginalLine, this.StartOfLineAbsoluteOffset, this.AbsoluteOffset + by);
  }

  get ColumnMinusOne() {
    return Position[".ctor"](this.FileIndex, this.Line, this.OriginalLine, this.StartOfLineAbsoluteOffset, this.StartOfLineAbsoluteOffset - 1);
  }

  ApplyLineDirective(fileIdx, line) {
    return Position[".ctor"](fileIdx, line, this.OriginalLine, this.AbsoluteOffset, this.AbsoluteOffset);
  }

  static get Empty() {
    return null;
  }

  static FirstLine(fileIdx) {
    return Position[".ctor"](fileIdx, 1, 0, 0, 0);
  }

}
setType("Internal.Utilities.Text.Lexing.Position", Position);
export class LexBuffer {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Lexing.LexBuffer",
      properties: {
        Buffer: _Array(GenericParam("Char")),
        BufferAcceptAction: "number",
        BufferLocalStore: Interface("System.Collections.Generic.IDictionary"),
        BufferMaxScanLength: "number",
        BufferScanLength: "number",
        BufferScanPos: "number",
        BufferScanStart: "number",
        EndPos: Position,
        IsPastEndOfStream: "boolean",
        Lexeme: _Array(GenericParam("Char")),
        LexemeLength: "number",
        StartPos: Position
      }
    };
  }

  constructor(filler) {
    this.filler = filler;
    this.context = new Map();
    this.buffer = [];
    this.bufferMaxScanLength = 0;
    this.bufferScanStart = 0;
    this.bufferScanLength = 0;
    this.lexemeLength = 0;
    this.bufferAcceptAction = 0;
    this.eof = false;
    this.startPos = Position.Empty;
    this.endPos = Position.Empty;
  }

  EndOfScan() {
    if (this.bufferAcceptAction < 0) {
      throw new Error("unrecognized input");
    }

    this.StartPos = this.endPos;
    this.EndPos = this.endPos.EndOfToken(this.LexemeLength);
    return this.bufferAcceptAction | 0;
  }

  get StartPos() {
    return this.startPos;
  }

  set StartPos(b) {
    this.startPos = b;
  }

  get EndPos() {
    return this.endPos;
  }

  set EndPos(b) {
    this.endPos = b;
  }

  get Lexeme() {
    return getSubArray(this.buffer, this.bufferScanStart, this.lexemeLength);
  }

  get BufferLocalStore() {
    return this.context;
  }

  get LexemeLength() {
    return this.lexemeLength;
  }

  set LexemeLength(v) {
    this.lexemeLength = v | 0;
  }

  get Buffer() {
    return this.buffer;
  }

  set Buffer(v) {
    this.buffer = v;
  }

  get BufferMaxScanLength() {
    return this.bufferMaxScanLength;
  }

  set BufferMaxScanLength(v) {
    this.bufferMaxScanLength = v | 0;
  }

  get BufferScanLength() {
    return this.bufferScanLength;
  }

  set BufferScanLength(v) {
    this.bufferScanLength = v | 0;
  }

  get BufferScanStart() {
    return this.bufferScanStart;
  }

  set BufferScanStart(v) {
    this.bufferScanStart = v | 0;
  }

  get BufferAcceptAction() {
    return this.bufferAcceptAction;
  }

  set BufferAcceptAction(v) {
    this.bufferAcceptAction = v | 0;
  }

  RefillBuffer() {
    this.filler(this);
  }

  static LexemeString(lexbuf) {
    return lexbuf.Buffer.join("").substr(lexbuf.BufferScanStart, lexbuf.LexemeLength);
  }

  get IsPastEndOfStream() {
    return this.eof;
  }

  set IsPastEndOfStream(b) {
    this.eof = b;
  }

  DiscardInput() {
    this.discardInput();
  }

  get BufferScanPos() {
    return this.bufferScanStart + this.bufferScanLength;
  }

  EnsureBufferSize(n) {
    if (this.BufferScanPos + n >= this.buffer.length) {
      const repl = new Array(this.BufferScanPos + n).fill(null);
      copyTo(this.buffer, this.bufferScanStart, repl, this.bufferScanStart, this.bufferScanLength);
      this.buffer = repl;
    }
  }

  static FromFunction(f) {
    const extension = new Array(4096).fill(null);

    const filler = function (lexBuffer) {
      const n = f([extension, 0, extension.length]) | 0;
      lexBuffer.EnsureBufferSize(n);
      copyTo(extension, 0, lexBuffer.Buffer, lexBuffer.BufferScanPos, n);
      lexBuffer.BufferMaxScanLength = lexBuffer.BufferScanLength + n | 0;
    };

    return new LexBuffer(filler);
  }

  static FromArray(s) {
    const lexBuffer = new LexBuffer(function (_arg1) {});
    const buffer = s.slice();
    lexBuffer.Buffer = buffer;
    lexBuffer.BufferMaxScanLength = buffer.length | 0;
    return lexBuffer;
  }

  static FromChars(arr) {
    return LexBuffer.FromArray(arr);
  }

  discardInput() {
    const keep = getSubArray(this.buffer, this.bufferScanStart, this.bufferScanLength);
    const nkeep = keep.length | 0;
    copyTo(keep, 0, this.buffer, 0, nkeep);
    this.bufferScanStart = 0;
    this.bufferMaxScanLength = nkeep | 0;
  }

}
setType("Internal.Utilities.Text.Lexing.LexBuffer", LexBuffer);
export const GenericImplFragments = function (__exports) {
  const startInterpret = __exports.startInterpret = function (lexBuffer) {
    lexBuffer.BufferScanStart = lexBuffer.BufferScanStart + lexBuffer.LexemeLength | 0;
    lexBuffer.BufferMaxScanLength = lexBuffer.BufferMaxScanLength - lexBuffer.LexemeLength | 0;
    lexBuffer.BufferScanLength = 0;
    lexBuffer.LexemeLength = 0;
    lexBuffer.BufferAcceptAction = -1 | 0;
  };

  const afterRefill = __exports.afterRefill = function (trans, sentinel, lexBuffer, scanUntilSentinel, endOfScan, state, eofPos) {
    if (lexBuffer.BufferScanLength === lexBuffer.BufferMaxScanLength) {
      const snew = ~~trans[state][eofPos] | 0;

      if (snew === sentinel) {
        return endOfScan();
      } else {
        if (lexBuffer.IsPastEndOfStream) {
          throw new Error("End of file on lexing stream");
        }

        lexBuffer.IsPastEndOfStream = true;
        return scanUntilSentinel(lexBuffer, snew);
      }
    } else {
      return scanUntilSentinel(lexBuffer, state);
    }
  };

  const onAccept = __exports.onAccept = function (lexBuffer, a) {
    lexBuffer.LexemeLength = lexBuffer.BufferScanLength | 0;
    lexBuffer.BufferAcceptAction = a | 0;
  };

  return __exports;
}({});
export class UnicodeTables {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Lexing.UnicodeTables",
      properties: {}
    };
  }

  constructor(trans, accept) {
    this.trans = trans;
    this.accept = accept;
    this.sentinel = 255 * 256 + 255 | 0;
    this.numLowUnicodeChars = 128;
    this.numSpecificUnicodeChars = ~~((this.trans[0].length - 1 - this.numLowUnicodeChars - 30) / 2) | 0;
    this.eofPos = this.numLowUnicodeChars + 2 * this.numSpecificUnicodeChars + 30 | 0;
  }

  Interpret(initialState, lexBuffer) {
    GenericImplFragments.startInterpret(lexBuffer);
    return this.scanUntilSentinel(lexBuffer, initialState) | 0;
  }

  static Create(trans, accept) {
    return new UnicodeTables(trans, accept);
  }

  lookupUnicodeCharacters(state, inp) {
    const inpAsInt = inp.charCodeAt(0) | 0;

    if (inpAsInt < this.numLowUnicodeChars) {
      return ~~this.trans[state][inpAsInt] | 0;
    } else {
      const baseForSpecificUnicodeChars = this.numLowUnicodeChars | 0;

      const loop = i => {
        loop: while (true) {
          if (i >= this.numSpecificUnicodeChars) {
            const baseForUnicodeCategories = this.numLowUnicodeChars + this.numSpecificUnicodeChars * 2 | 0;
            const unicodeCategory = System.Char.GetUnicodeCategory(inp) | 0;
            return ~~this.trans[state][baseForUnicodeCategories + unicodeCategory] | 0;
          } else {
            const c = String.fromCharCode(~~this.trans[state][baseForSpecificUnicodeChars + i * 2]);

            if (c === inp) {
              return ~~this.trans[state][baseForSpecificUnicodeChars + i * 2 + 1] | 0;
            } else {
              i = i + 1;
              continue loop;
            }
          }
        }
      };

      return loop(0) | 0;
    }
  }

  scanUntilSentinel(lexBuffer, state) {
    const a = ~~this.accept[state] | 0;

    if (a !== this.sentinel) {
      GenericImplFragments.onAccept(lexBuffer, a);
    }

    if (lexBuffer.BufferScanLength === lexBuffer.BufferMaxScanLength) {
      lexBuffer.DiscardInput();
      lexBuffer.RefillBuffer();
      return GenericImplFragments.afterRefill(this.trans, this.sentinel, lexBuffer, (lexBuffer_1, state_1) => this.scanUntilSentinel(lexBuffer_1, state_1), () => lexBuffer.EndOfScan(), state, this.eofPos) | 0;
    } else {
      const inp = lexBuffer.Buffer[lexBuffer.BufferScanPos];
      const snew = this.lookupUnicodeCharacters(state, inp) | 0;

      if (snew === this.sentinel) {
        return lexBuffer.EndOfScan() | 0;
      } else {
        lexBuffer.BufferScanLength = lexBuffer.BufferScanLength + 1 | 0;
        return ((lexBuffer_2, state_2) => this.scanUntilSentinel(lexBuffer_2, state_2))(lexBuffer, snew) | 0;
      }
    }
  }

}
setType("Internal.Utilities.Text.Lexing.UnicodeTables", UnicodeTables);