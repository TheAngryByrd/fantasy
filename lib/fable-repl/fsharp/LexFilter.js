import { printf, toText } from "../fable-core/String";
import { Microsoft } from "../fcs-fable/adapters";
import CurriedLambda from "../fable-core/CurriedLambda";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { LexBuffer, Position } from "../utils/prim-lexing";
import { token as token_3 } from "../codegen/pars";
import { applyOperator, makeGeneric, compareRecords, equalsRecords, equals, comparePrimitives } from "../fable-core/Util";
import { exists, iterate, map, delay, skipWhile, takeWhile, toList } from "../fable-core/Seq";
import { Stack } from "../utils/prim-parsing";
import { reverse } from "../fable-core/List";
import List from "../fable-core/List";
import { dprintf } from "../absil/ildiag";
import { errorR, warning } from "./ErrorLogger";
import { IndentationProblem } from "./lexhelp";
import { mkSynRange } from "./ast";
import { SR } from "../codegen/FSComp";
import { getValue } from "../fable-core/Option";
import { List as List_1 } from "../absil/illib";
import { token as token_4 } from "../codegen/lex";
export const debug = false;
export function stringOfPos(p) {
  return toText(printf("(%d:%d)"))(p.OriginalLine, p.Column);
}
export function outputPos(os, p) {
  var clo1;
  (clo1 = Microsoft.FSharp.Core.Printf.fprintf(os), CurriedLambda(function (arg10) {
    return CurriedLambda(clo1)(arg10);
  }))(printf("(%d:%d)"), p.OriginalLine, p.Column);
}
export function warningStringOfPos(p) {
  return toText(printf("(%d:%d)"))(p.Line, p.Column + 1);
}
export class Context {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.Context",
      interfaces: ["FSharpUnion"],
      cases: [["CtxtLetDecl", "boolean", Position], ["CtxtIf", Position], ["CtxtTry", Position], ["CtxtFun", Position], ["CtxtFunction", Position], ["CtxtWithAsLet", Position], ["CtxtWithAsAugment", Position], ["CtxtMatch", Position], ["CtxtFor", Position], ["CtxtWhile", Position], ["CtxtWhen", Position], ["CtxtVanilla", Position, "boolean"], ["CtxtThen", Position], ["CtxtElse", Position], ["CtxtDo", Position], ["CtxtInterfaceHead", Position], ["CtxtTypeDefns", Position], ["CtxtNamespaceHead", Position, token_3], ["CtxtModuleHead", Position, token_3], ["CtxtMemberHead", Position], ["CtxtMemberBody", Position], ["CtxtModuleBody", Position, "boolean"], ["CtxtNamespaceBody", Position], ["CtxtException", Position], ["CtxtParen", token_3, Position], ["CtxtSeqBlock", FirstInSequence, Position, AddBlockEnd], ["CtxtMatchClauses", "boolean", Position]]
    };
  }

  get StartPos() {
    const $var1 = this.tag === 18 ? [0, this.data[0]] : this.tag === 23 ? [0, this.data] : this.tag === 21 ? [0, this.data[0]] : this.tag === 22 ? [0, this.data] : this.tag === 0 ? [0, this.data[1]] : this.tag === 14 ? [0, this.data] : this.tag === 15 ? [0, this.data] : this.tag === 16 ? [0, this.data] : this.tag === 24 ? [0, this.data[1]] : this.tag === 19 ? [0, this.data] : this.tag === 20 ? [0, this.data] : this.tag === 5 ? [0, this.data] : this.tag === 6 ? [0, this.data] : this.tag === 26 ? [0, this.data[1]] : this.tag === 1 ? [0, this.data] : this.tag === 7 ? [0, this.data] : this.tag === 8 ? [0, this.data] : this.tag === 9 ? [0, this.data] : this.tag === 10 ? [0, this.data] : this.tag === 4 ? [0, this.data] : this.tag === 3 ? [0, this.data] : this.tag === 2 ? [0, this.data] : this.tag === 12 ? [0, this.data] : this.tag === 13 ? [0, this.data] : this.tag === 11 ? [0, this.data[0]] : this.tag === 25 ? [0, this.data[1]] : [0, this.data[0]];

    switch ($var1[0]) {
      case 0:
        return $var1[1];
    }
  }

  get StartCol() {
    let copyOfStruct = this.StartPos;
    return copyOfStruct.Column | 0;
  }

  ToString() {
    return this.tag === 18 ? "modhead" : this.tag === 23 ? "exception" : this.tag === 21 ? "modbody" : this.tag === 22 ? "nsbody" : this.tag === 0 ? toText(printf("let(%b,%s)"))(this.data[0], stringOfPos(this.data[1])) : this.tag === 5 ? toText(printf("withlet(%s)"))(stringOfPos(this.data)) : this.tag === 6 ? "withaug" : this.tag === 14 ? "do" : this.tag === 15 ? "interface-decl" : this.tag === 16 ? "type" : this.tag === 24 ? "paren" : this.tag === 19 ? "member-head" : this.tag === 20 ? "body" : this.tag === 25 ? toText(printf("seqblock(%s,%s)"))(this.data[0].tag === 1 ? "subsequent" : "first", stringOfPos(this.data[1])) : this.tag === 26 ? "matching" : this.tag === 1 ? "if" : this.tag === 7 ? "match" : this.tag === 8 ? "for" : this.tag === 9 ? toText(printf("while(%s)"))(stringOfPos(this.data)) : this.tag === 10 ? "when" : this.tag === 2 ? "try" : this.tag === 3 ? "fun" : this.tag === 4 ? "function" : this.tag === 12 ? "then" : this.tag === 13 ? toText(printf("else(%s)"))(stringOfPos(this.data)) : this.tag === 11 ? toText(printf("vanilla(%s)"))(stringOfPos(this.data[0])) : "nshead";
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.Context", Context);
export class AddBlockEnd {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.AddBlockEnd",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["AddBlockEnd"], ["NoAddBlockEnd"], ["AddOneSidedBlockEnd"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.AddBlockEnd", AddBlockEnd);
export class FirstInSequence {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.FirstInSequence",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["FirstInSeqBlock"], ["NotFirstInSeqBlock"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.FirstInSequence", FirstInSequence);
export function isInfix(token) {
  switch (token.tag) {
    case 97:
    case 143:
    case 90:
    case 89:
    case 102:
    case 185:
    case 182:
    case 187:
    case 63:
    case 186:
    case 181:
    case 79:
    case 80:
    case 81:
    case 83:
    case 62:
    case 96:
    case 183:
    case 188:
    case 76:
      return true;

    default:
      return false;
  }
}
export function isNonAssocInfixToken(token) {
  if (token.tag === 70) {
    return true;
  } else {
    return false;
  }
}
export function infixTokenLength(token) {
  const $var2 = token.tag === 97 ? [0] : token.tag === 89 ? [1] : token.tag === 102 ? [2] : token.tag === 63 ? [3] : token.tag === 62 ? [4] : token.tag === 96 ? [5] : token.tag === 57 ? [6] : token.tag === 158 ? token.data ? [18] : [7] : token.tag === 159 ? token.data ? [18] : [8] : token.tag === 70 ? [9] : token.tag === 76 ? [10] : token.tag === 80 ? [11] : token.tag === 79 ? [12] : token.tag === 83 ? [13] : token.tag === 143 ? [14] : token.tag === 90 ? [15] : token.tag === 185 ? [16, token.data] : token.tag === 182 ? [16, token.data] : token.tag === 187 ? [16, token.data] : token.tag === 186 ? [16, token.data] : token.tag === 181 ? [16, token.data] : token.tag === 183 ? [16, token.data] : token.tag === 188 ? [16, token.data] : token.tag === 81 ? [17] : [18];

  switch ($var2[0]) {
    case 0:
      return 1;

    case 1:
      return 1;

    case 2:
      return 1;

    case 3:
      return 1;

    case 4:
      return 1;

    case 5:
      return 1;

    case 6:
      return 1;

    case 7:
      return 1;

    case 8:
      return 1;

    case 9:
      return 1;

    case 10:
      return 2;

    case 11:
      return 2;

    case 12:
      return 2;

    case 13:
      return 2;

    case 14:
      return 2;

    case 15:
      return 2;

    case 16:
      return $var2[1].length | 0;

    case 17:
      return 3;

    case 18:
      return 1;
  }
}
export function isIfBlockContinuator(token) {
  isIfBlockContinuator: while (true) {
    switch (token.tag) {
      case 104:
      case 139:
      case 140:
        return true;

      case 141:
      case 93:
        return true;

      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isIfBlockContinuator;

      default:
        return false;
    }
  }
}
export function isTryBlockContinuator(token) {
  isTryBlockContinuator: while (true) {
    switch (token.tag) {
      case 128:
      case 87:
        return true;

      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isTryBlockContinuator;

      default:
        return false;
    }
  }
}
export function isThenBlockContinuator(token) {
  isThenBlockContinuator: while (true) {
    switch (token.tag) {
      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isThenBlockContinuator;

      default:
        return false;
    }
  }
}
export function isDoContinuator(token) {
  isDoContinuator: while (true) {
    switch (token.tag) {
      case 137:
        return true;

      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isDoContinuator;

      default:
        return false;
    }
  }
}
export function isInterfaceContinuator(token) {
  isInterfaceContinuator: while (true) {
    switch (token.tag) {
      case 141:
        return true;

      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isInterfaceContinuator;

      default:
        return false;
    }
  }
}
export function isNamespaceContinuator(token) {
  isNamespaceContinuator: while (true) {
    const $var3 = token.tag === 10 ? [0] : token.tag === 149 ? [0] : token.tag === 12 ? [1] : [2];

    switch ($var3[0]) {
      case 0:
        return false;

      case 1:
        token = token.data;
        continue isNamespaceContinuator;

      case 2:
        return true;
    }
  }
}
export function isTypeContinuator(token) {
  isTypeContinuator: while (true) {
    switch (token.tag) {
      case 59:
      case 87:
      case 57:
      case 130:
      case 141:
        return true;

      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isTypeContinuator;

      default:
        return false;
    }
  }
}
export function isForLoopContinuator(token) {
  isForLoopContinuator: while (true) {
    switch (token.tag) {
      case 137:
        return true;

      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isForLoopContinuator;

      default:
        return false;
    }
  }
}
export function isWhileBlockContinuator(token) {
  isWhileBlockContinuator: while (true) {
    switch (token.tag) {
      case 137:
        return true;

      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isWhileBlockContinuator;

      default:
        return false;
    }
  }
}
export function isLetContinuator(token) {
  isLetContinuator: while (true) {
    switch (token.tag) {
      case 130:
        return true;

      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isLetContinuator;

      default:
        return false;
    }
  }
}
export function isTypeSeqBlockElementContinuator(token) {
  isTypeSeqBlockElementContinuator: while (true) {
    switch (token.tag) {
      case 57:
        return true;

      case 22:
      case 18:
      case 15:
      case 19:
        return true;

      case 12:
        token = token.data;
        continue isTypeSeqBlockElementContinuator;

      default:
        return false;
    }
  }
}
export function isSeqBlockElementContinuator(token) {
  isSeqBlockElementContinuator: while (true) {
    if (isInfix(token)) {
      return true;
    } else {
      switch (token.tag) {
        case 141:
        case 130:
        case 87:
        case 104:
        case 93:
        case 59:
        case 58:
        case 65:
        case 154:
          return true;

        case 18:
        case 15:
        case 19:
          return true;

        case 12:
          token = token.data;
          continue isSeqBlockElementContinuator;

        default:
          return false;
      }
    }
  }
}
export function isWithAugmentBlockContinuator(token) {
  isWithAugmentBlockContinuator: while (true) {
    if (token.tag === 141) {
      return true;
    } else if (token.tag === 12) {
      token = token.data;
      continue isWithAugmentBlockContinuator;
    } else {
      return false;
    }
  }
}
export function isLongIdentifier(token) {
  const $var4 = token.tag === 189 ? [0] : token.tag === 77 ? [0] : [1];

  switch ($var4[0]) {
    case 0:
      return true;

    case 1:
      return false;
  }
}
export function isLongIdentifierOrGlobal(token) {
  const $var5 = token.tag === 45 ? [0] : token.tag === 189 ? [0] : token.tag === 77 ? [0] : [1];

  switch ($var5[0]) {
    case 0:
      return true;

    case 1:
      return false;
  }
}
export function isAtomicExprEndToken(token) {
  switch (token.tag) {
    case 189:
    case 178:
    case 177:
    case 175:
    case 174:
    case 168:
    case 173:
    case 172:
    case 171:
    case 170:
    case 169:
    case 164:
    case 163:
    case 191:
    case 192:
    case 165:
    case 167:
    case 166:
    case 93:
    case 58:
    case 59:
    case 65:
    case 141:
    case 146:
    case 121:
    case 106:
    case 67:
      return true;

    default:
      return false;
  }
}
export function parenTokensBalance(t1, t2) {
  var q2;
  var q1;
  const matchValue = [t1, t2];
  const $var6 = matchValue[0].tag === 92 ? matchValue[1].tag === 93 ? [0] : [2] : matchValue[0].tag === 74 ? matchValue[1].tag === 59 ? [0] : [2] : matchValue[0].tag === 71 ? matchValue[1].tag === 58 ? [0] : [2] : matchValue[0].tag === 111 ? matchValue[1].tag === 141 ? [0] : [2] : matchValue[0].tag === 48 ? matchValue[1].tag === 141 ? [0] : [2] : matchValue[0].tag === 56 ? matchValue[1].tag === 141 ? [0] : [2] : matchValue[0].tag === 55 ? matchValue[1].tag === 141 ? [0] : [2] : matchValue[0].tag === 72 ? matchValue[1].tag === 65 ? [0] : [2] : matchValue[0].tag === 158 ? matchValue[0].data ? matchValue[1].tag === 159 ? matchValue[1].data ? [0] : [2] : [2] : [2] : matchValue[0].tag === 135 ? matchValue[1].tag === 141 ? [0] : [2] : matchValue[0].tag === 153 ? matchValue[1].tag === 154 ? (q2 = matchValue[1].data, q1 = matchValue[0].data, equals(q1, q2)) ? [1, matchValue[0].data, matchValue[1].data] : [2] : [2] : [2];

  switch ($var6[0]) {
    case 0:
      return true;

    case 1:
      return true;

    case 2:
      return false;
  }
}
export class LexbufState {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.LexbufState",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        startPos: Position,
        endPos: Position,
        pastEOF: "boolean"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  constructor(startPos, endPos, pastEOF) {
    this.startPos = startPos;
    this.endPos = endPos;
    this.pastEOF = pastEOF;
  }

  get StartPos() {
    return this.startPos;
  }

  get EndPos() {
    return this.endPos;
  }

  get PastEOF() {
    return this.pastEOF;
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.LexbufState", LexbufState);
export class PositionTuple {
  constructor(x, y) {
    this.X = x;
    this.Y = y;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.PositionTuple",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        X: Position,
        Y: Position
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static [".ctor"](x, y) {
    return new PositionTuple(x, y);
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.PositionTuple", PositionTuple);
export class TokenTup {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.TokenTup",
      properties: {
        EndPos: Position,
        LastTokenPos: PositionTuple,
        LexbufState: LexbufState,
        StartPos: Position,
        Token: token_3
      }
    };
  }

  constructor(token, state, lastTokenPos) {
    this.token = token;
    this.state = state;
    this.lastTokenPos = lastTokenPos;
  }

  get Token() {
    return this.token;
  }

  get LexbufState() {
    return this.state;
  }

  get LastTokenPos() {
    return this.lastTokenPos;
  }

  get StartPos() {
    let copyOfStruct = this.LexbufState;
    return copyOfStruct.StartPos;
  }

  get EndPos() {
    let copyOfStruct = this.LexbufState;
    return copyOfStruct.EndPos;
  }

  UseLocation(tok) {
    const tokState = this.LexbufState;
    return new TokenTup(tok, new LexbufState(tokState.StartPos, tokState.EndPos, false), this.LastTokenPos);
  }

  UseShiftedLocation(tok, shiftLeft, shiftRight) {
    var copyOfStruct;
    var copyOfStruct_1;
    const tokState = this.LexbufState;
    return new TokenTup(tok, new LexbufState((copyOfStruct = tokState.StartPos, copyOfStruct.ShiftColumnBy(shiftLeft)), (copyOfStruct_1 = tokState.EndPos, copyOfStruct_1.ShiftColumnBy(shiftRight)), false), this.LastTokenPos);
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.TokenTup", TokenTup);

function _TyparsCloseOp___(txt) {
  const angles = toList(takeWhile(function (c) {
    return c === ">";
  }, txt));
  const afterAngles = toList(skipWhile(function (c_1) {
    return c_1 === ">";
  }, txt));

  if (angles.tail == null) {
    return null;
  } else {
    let afterOp;
    const matchValue = Array.from(afterAngles).join("");

    switch (matchValue) {
      case ".":
        afterOp = new token_3(77);
        break;

      case "]":
        afterOp = new token_3(58);
        break;

      case "-":
        afterOp = new token_3(62);
        break;

      case "..":
        afterOp = new token_3(142);
        break;

      case "?":
        afterOp = new token_3(75);
        break;

      case "??":
        afterOp = new token_3(76);
        break;

      case ":=":
        afterOp = new token_3(83);
        break;

      case "::":
        afterOp = new token_3(79);
        break;

      case "*":
        afterOp = new token_3(96);
        break;

      case "&":
        afterOp = new token_3(89);
        break;

      case "->":
        afterOp = new token_3(98);
        break;

      case "<-":
        afterOp = new token_3(69);
        break;

      case "=":
        afterOp = new token_3(70);
        break;

      case "<":
        afterOp = new token_3(158, false);
        break;

      case "$":
        afterOp = new token_3(63);
        break;

      case "%":
        afterOp = new token_3(156, "%");
        break;

      case "%%":
        afterOp = new token_3(156, "%%");
        break;

      case "":
        afterOp = null;
        break;

      default:
        const matchValue_1 = toList(afterAngles);
        const $var7 = matchValue_1.tail != null ? matchValue_1.head === "!" ? matchValue_1.tail.tail != null ? matchValue_1.tail.head === "=" ? [0] : [3] : [3] : matchValue_1.head === "$" ? [0] : matchValue_1.head === "%" ? [7] : matchValue_1.head === "&" ? [1] : matchValue_1.head === "*" ? matchValue_1.tail.tail != null ? matchValue_1.tail.head === "*" ? [6] : [7] : [7] : matchValue_1.head === "+" ? [5] : matchValue_1.head === "-" ? [5] : matchValue_1.head === "/" ? [7] : matchValue_1.head === "<" ? [0] : matchValue_1.head === "=" ? [0] : matchValue_1.head === ">" ? [0] : matchValue_1.head === "?" ? [3] : matchValue_1.head === "@" ? [4] : matchValue_1.head === "^" ? [4] : matchValue_1.head === "|" ? [2] : matchValue_1.head === "~" ? [3] : [8] : [8];

        switch ($var7[0]) {
          case 0:
            afterOp = new token_3(187, matchValue);
            break;

          case 1:
            afterOp = new token_3(182, matchValue);
            break;

          case 2:
            afterOp = new token_3(185, matchValue);
            break;

          case 3:
            afterOp = new token_3(184, matchValue);
            break;

          case 4:
            afterOp = new token_3(186, matchValue);
            break;

          case 5:
            afterOp = new token_3(181, matchValue);
            break;

          case 6:
            afterOp = new token_3(188, matchValue);
            break;

          case 7:
            afterOp = new token_3(183, matchValue);
            break;

          case 8:
            afterOp = null;
            break;
        }

    }

    return [Array.from(delay(function () {
      return map($var8 => $var9 => function (_c, arg0) {
        return new token_3(159, arg0);
      }($var8, $var9), angles);
    })), afterOp];
  }
}

export { _TyparsCloseOp___ as $7C$TyparsCloseOp$7C$_$7C$ };
export class PositionWithColumn {
  constructor(position, column) {
    this.Position = position;
    this.Column = column | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.PositionWithColumn",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Position: Position,
        Column: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static [".ctor"](position, column) {
    return new PositionWithColumn(position, column);
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.PositionWithColumn", PositionWithColumn);
export class LexFilterImpl {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.LexFilterImpl",
      properties: {
        LexBuffer: makeGeneric(LexBuffer, {
          Char: "string"
        })
      }
    };
  }

  constructor(lightSyntaxStatus, compilingFsLib, lexer, lexbuf) {
    this.lightSyntaxStatus = lightSyntaxStatus;
    this.compilingFsLib = compilingFsLib;
    this.lexer = lexer;
    this.lexbuf = lexbuf;
    this.savedLexbufState = null;
    this.haveLexbufState = false;
    this.delayedStack = Stack[".ctor"](100);
    this.tokensThatNeedNoProcessingCount = 0;
    this.initialized = false;
    this.offsideStack = new List();
    this.prevWasAtomicEnd = false;
  }

  get LexBuffer() {
    return this.lexbuf;
  }

  Lexer(_arg1) {
    if (!this.initialized) {
      const _firstTokenTup = this.peekInitial();
    }

    if (this.lightSyntaxStatus.Status) {
      return this.hwTokenFetch(true);
    } else {
      return this.swTokenFetch();
    }
  }

  lexbufStateForInsertedDummyTokens(lastTokenStartPos, lastTokenEndPos) {
    return new LexbufState(lastTokenStartPos, lastTokenEndPos, false);
  }

  getLexbufState() {
    return new LexbufState(this.lexbuf.StartPos, this.lexbuf.EndPos, this.lexbuf.IsPastEndOfStream);
  }

  setLexbufState(p) {
    this.lexbuf.StartPos = p.StartPos;
    this.lexbuf.EndPos = p.EndPos;
    this.lexbuf.IsPastEndOfStream = p.PastEOF;
  }

  startPosOfTokenTup(tokenTup) {
    const matchValue = tokenTup.Token;

    if (matchValue.tag === 10) {
      let copyOfStruct_1;
      let copyOfStruct = tokenTup.LexbufState;
      copyOfStruct_1 = copyOfStruct.StartPos;
      return copyOfStruct_1.ColumnMinusOne;
    } else {
      let copyOfStruct_2 = tokenTup.LexbufState;
      return copyOfStruct_2.StartPos;
    }
  }

  runWrappedLexerInConsistentLexbufState() {
    const state = this.haveLexbufState ? this.savedLexbufState : this.getLexbufState();
    this.setLexbufState(state);
    const lastTokenStart = state.StartPos;
    const lastTokenEnd = state.EndPos;
    const token = this.lexer(this.lexbuf);
    const tokenLexbufState = this.getLexbufState();
    this.savedLexbufState = tokenLexbufState;
    this.haveLexbufState = true;
    return new TokenTup(token, tokenLexbufState, PositionTuple[".ctor"](lastTokenStart, lastTokenEnd));
  }

  delayToken(tokenTup) {
    this.delayedStack.Push(tokenTup);
  }

  delayTokenNoProcessing(tokenTup) {
    (tokenTup_1 => {
      this.delayToken(tokenTup_1);
    })(tokenTup);

    this.tokensThatNeedNoProcessingCount = this.tokensThatNeedNoProcessingCount + 1 | 0;
  }

  popNextTokenTup() {
    if (this.delayedStack.Count > 0) {
      const tokenTup = this.delayedStack.Pop();

      if (debug) {
        dprintf(printf("popNextTokenTup: delayed token, tokenStartPos = %a\n"))((os, p) => {
          outputPos(os, p);
        }, (tokenTup_1 => this.startPosOfTokenTup(tokenTup_1))(tokenTup));
      }

      return tokenTup;
    } else {
      if (debug) {
        dprintf(printf("popNextTokenTup: no delayed tokens, running lexer...\n"));
      }

      return this.runWrappedLexerInConsistentLexbufState();
    }
  }

  peekInitial() {
    const initialLookaheadTokenTup = this.popNextTokenTup();

    if (debug) {
      dprintf(printf("first token: initialLookaheadTokenLexbufState = %a\n"))((os, p) => {
        outputPos(os, p);
      }, (tokenTup => this.startPosOfTokenTup(tokenTup))(initialLookaheadTokenTup));
    }

    (tokenTup_1 => {
      this.delayToken(tokenTup_1);
    })(initialLookaheadTokenTup);

    this.initialized = true;
    this.offsideStack = new List(new Context(25, [new FirstInSequence(0), (tokenTup_2 => this.startPosOfTokenTup(tokenTup_2))(initialLookaheadTokenTup), new AddBlockEnd(1)]), this.offsideStack);
    return initialLookaheadTokenTup;
  }

  warn(s, msg) {
    var copyOfStruct;
    warning(new IndentationProblem(msg, mkSynRange((tokenTup => this.startPosOfTokenTup(tokenTup))(s), (copyOfStruct = s.LexbufState, copyOfStruct.EndPos))));
  }

  detectJoinInCtxt(stack) {
    const check = s => {
      check: while (true) {
        const $var10 = s.tail != null ? s.head.tag === 24 ? s.head.data[0].tag === 74 ? [0] : [2] : s.head.tag === 25 ? [1, s.tail] : s.head.tag === 14 ? [1, s.tail] : s.head.tag === 8 ? [1, s.tail] : [2] : [2];

        switch ($var10[0]) {
          case 0:
            return true;

          case 1:
            s = $var10[1];
            continue check;

          case 2:
            return false;
        }
      }
    };

    const $var11 = stack.tail != null ? stack.head.tag === 11 ? [0, stack.tail] : [1] : [1];

    switch ($var11[0]) {
      case 0:
        return check($var11[1]);

      case 1:
        return false;
    }
  }

  pushCtxt(tokenTup, newCtxt) {
    const unindentationLimit = (strict, stack) => {
      var rest_1;
      var rest;

      unindentationLimit: while (true) {
        const matchValue = [newCtxt, stack];
        const $var12 = matchValue[1].tail != null ? matchValue[1].head.tag === 11 ? [1, matchValue[1].tail] : matchValue[1].head.tag === 25 ? (rest_1 = matchValue[1].tail, !strict) ? [2, matchValue[1].tail] : [3] : [3] : [0];

        switch ($var12[0]) {
          case 0:
            return PositionWithColumn[".ctor"](newCtxt.StartPos, -1);

          case 1:
            strict = strict;
            stack = $var12[1];
            continue unindentationLimit;

          case 2:
            strict = strict;
            stack = $var12[1];
            continue unindentationLimit;

          case 3:
            const $var13 = matchValue[1].tail != null ? matchValue[1].head.tag === 24 ? (rest = matchValue[1].tail, !strict) ? [0, matchValue[1].tail] : [1] : [1] : [1];

            switch ($var13[0]) {
              case 0:
                strict = strict;
                stack = $var13[1];
                continue unindentationLimit;

              case 1:
                const $var14 = matchValue[1].tail != null ? matchValue[1].head.tag === 7 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 24 ? matchValue[1].tail.tail.head.data[0].tag === 135 ? [0, matchValue[1].tail.tail.tail, matchValue[1].head, matchValue[1].tail.tail.head] : matchValue[1].tail.tail.head.data[0].tag === 92 ? [0, matchValue[1].tail.tail.tail, matchValue[1].head, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.tag === 4 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 0 ? matchValue[0].tag === 26 ? [1, matchValue[1].tail.tail.tail, matchValue[1].tail.tail.head] : [9, matchValue[1].tail] : matchValue[0].tag === 26 ? [2, matchValue[1].tail] : [9, matchValue[1].tail] : matchValue[0].tag === 26 ? [2, matchValue[1].tail] : [9, matchValue[1].tail] : matchValue[0].tag === 26 ? [2, matchValue[1].tail] : [9, matchValue[1].tail] : matchValue[0].tag === 26 ? [2, matchValue[1].tail] : [9, matchValue[1].tail] : matchValue[1].head.tag === 26 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 2 ? [3, matchValue[1].tail.tail, matchValue[1].tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.tag === 3 ? [4, matchValue[1].tail] : matchValue[1].head.tag === 24 ? matchValue[1].head.data[0].tag === 74 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 11 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 25 ? [5, matchValue[1].tail.tail.tail] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 12 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 13 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 16 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 0 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 20 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 5 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 56 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 21 ? matchValue[1].tail.tail.head.data[1] ? [15, matchValue[1].head] : [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 55 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 21 ? matchValue[1].tail.tail.head.data[1] ? [15, matchValue[1].head] : [10, matchValue[1].tail.tail.head] : matchValue[1].tail.tail.head.tag === 16 ? [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 135 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 21 ? matchValue[1].tail.tail.head.data[1] ? [15, matchValue[1].head] : [10, matchValue[1].tail.tail.head] : matchValue[1].tail.tail.head.tag === 12 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 13 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 16 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 0 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 20 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 5 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.tag === 11 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 25 ? [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 92 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 12 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 13 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 16 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 0 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 20 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 5 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.tag === 11 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 25 ? [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 71 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 12 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 13 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 16 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 0 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 20 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 5 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.tag === 11 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 25 ? [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 72 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 12 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 13 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 1 ? [10, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 16 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 0 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 20 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : matchValue[1].tail.tail.head.tag === 5 ? matchValue[0].tag === 25 ? [11, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.tag === 11 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 25 ? [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 158 ? matchValue[1].head.data[0].data ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 11 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 25 ? [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 48 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 16 ? [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.data[0].tag === 111 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 25 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 16 ? [10, matchValue[1].tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.tag === 25 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 24 ? matchValue[1].tail.head.data[0].tag === 74 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 11 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 25 ? [5, matchValue[1].tail.tail.tail.tail] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.data[0].tag === 135 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 11 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 25 ? [11, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.data[0].tag === 92 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 11 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 25 ? [11, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.data[0].tag === 71 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 11 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 25 ? [11, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].tail.head.data[0].tag === 72 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 11 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 25 ? [11, matchValue[1].tail.tail.tail.head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.tag === 13 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 1 ? matchValue[0].tag === 25 ? [6, matchValue[1].tail.tail, matchValue[1].tail.head] : [8, matchValue[1].tail] : [8, matchValue[1].tail] : [8, matchValue[1].tail] : matchValue[1].head.tag === 15 ? matchValue[0].tag === 6 ? [7, matchValue[1].tail, matchValue[1].head] : [14, matchValue[1].head] : matchValue[1].head.tag === 19 ? matchValue[0].tag === 6 ? [7, matchValue[1].tail, matchValue[1].head] : [14, matchValue[1].head] : matchValue[1].head.tag === 23 ? matchValue[0].tag === 6 ? [7, matchValue[1].tail, matchValue[1].head] : [14, matchValue[1].head] : matchValue[1].head.tag === 16 ? matchValue[0].tag === 6 ? [7, matchValue[1].tail, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.tag === 6 ? [8, matchValue[1].tail] : matchValue[1].head.tag === 12 ? [8, matchValue[1].tail] : matchValue[1].head.tag === 14 ? [8, matchValue[1].tail] : matchValue[1].head.tag === 1 ? matchValue[0].tag === 1 ? [12, matchValue[1].tail, matchValue[1].head] : matchValue[0].tag === 13 ? [12, matchValue[1].tail, matchValue[1].head] : matchValue[0].tag === 12 ? [12, matchValue[1].tail, matchValue[1].head] : [14, matchValue[1].head] : matchValue[1].head.tag === 8 ? matchValue[0].tag === 14 ? [13, matchValue[1].tail, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.tag === 9 ? matchValue[0].tag === 14 ? [13, matchValue[1].tail, matchValue[1].head] : [15, matchValue[1].head] : matchValue[1].head.tag === 17 ? [14, matchValue[1].head] : matchValue[1].head.tag === 18 ? [14, matchValue[1].head] : matchValue[1].head.tag === 21 ? matchValue[1].head.data[1] ? [15, matchValue[1].head] : [14, matchValue[1].head] : matchValue[1].head.tag === 5 ? [14, matchValue[1].head] : matchValue[1].head.tag === 0 ? [14, matchValue[1].head] : matchValue[1].head.tag === 20 ? [14, matchValue[1].head] : matchValue[1].head.tag === 10 ? [15, matchValue[1].head] : matchValue[1].head.tag === 22 ? [15, matchValue[1].head] : matchValue[1].head.tag === 2 ? [15, matchValue[1].head] : [16] : [16];

                switch ($var14[0]) {
                  case 0:
                    if ($var14[2].StartCol <= $var14[3].StartCol) {
                      return PositionWithColumn[".ctor"]($var14[2].StartPos, $var14[2].StartCol);
                    } else {
                      return PositionWithColumn[".ctor"]($var14[3].StartPos, $var14[3].StartCol);
                    }

                  case 1:
                    return PositionWithColumn[".ctor"]($var14[2].StartPos, $var14[2].StartCol);

                  case 2:
                    strict = false;
                    stack = $var14[1];
                    continue unindentationLimit;

                  case 3:
                    return PositionWithColumn[".ctor"]($var14[2].StartPos, $var14[2].StartCol);

                  case 4:
                    strict = false;
                    stack = $var14[1];
                    continue unindentationLimit;

                  case 5:
                    strict = false;
                    stack = $var14[1];
                    continue unindentationLimit;

                  case 6:
                    return PositionWithColumn[".ctor"]($var14[2].StartPos, $var14[2].StartCol);

                  case 7:
                    return PositionWithColumn[".ctor"]($var14[2].StartPos, $var14[2].StartCol);

                  case 8:
                    strict = false;
                    stack = $var14[1];
                    continue unindentationLimit;

                  case 9:
                    strict = false;
                    stack = $var14[1];
                    continue unindentationLimit;

                  case 10:
                    return PositionWithColumn[".ctor"]($var14[1].StartPos, $var14[1].StartCol + 1);

                  case 11:
                    return PositionWithColumn[".ctor"]($var14[1].StartPos, $var14[1].StartCol + 1);

                  case 12:
                    return PositionWithColumn[".ctor"]($var14[2].StartPos, $var14[2].StartCol);

                  case 13:
                    return PositionWithColumn[".ctor"]($var14[2].StartPos, $var14[2].StartCol);

                  case 14:
                    return PositionWithColumn[".ctor"]($var14[1].StartPos, $var14[1].StartCol + 1);

                  case 15:
                    return PositionWithColumn[".ctor"]($var14[1].StartPos, $var14[1].StartCol);

                  case 16:
                    throw new Error("C:/projects/fcs/src/fsharp/LexFilter.fs", 648, 18);
                }

            }

        }
      }
    };

    if (newCtxt.tag === 11) {} else {
      const p1 = unindentationLimit(true, this.offsideStack);
      const c2 = newCtxt.StartCol | 0;

      if (c2 < p1.Column) {
        ((s, msg) => {
          this.warn(s, msg);
        })(tokenTup, debug ? toText(printf("possible incorrect indentation: this token is offside of context at position %s, newCtxt = %A, stack = %A, newCtxtPos = %s, c1 = %d, c2 = %d"))(warningStringOfPos(p1.Position), newCtxt, this.offsideStack, stringOfPos(newCtxt.StartPos), p1.Column, c2) : SR.lexfltTokenIsOffsideOfContextStartedEarlier(warningStringOfPos(p1.Position)));
      }
    }

    const newOffsideStack = new List(newCtxt, this.offsideStack);

    if (debug) {
      dprintf(printf("--> pushing, stack = %A\n"))(newOffsideStack);
    }

    this.offsideStack = newOffsideStack;
  }

  popCtxt() {
    const matchValue = this.offsideStack;

    if (matchValue.tail != null) {
      if (debug) {
        dprintf(printf("<-- popping Context(%A), stack = %A\n"))(matchValue.head, matchValue.tail);
      }

      this.offsideStack = matchValue.tail;
    }
  }

  replaceCtxt(p, ctxt) {
    this.popCtxt();

    ((tokenTup, newCtxt) => {
      this.pushCtxt(tokenTup, newCtxt);
    })(p, ctxt);
  }

  peekNextTokenTup() {
    const tokenTup = this.popNextTokenTup();

    (tokenTup_1 => {
      this.delayToken(tokenTup_1);
    })(tokenTup);

    return tokenTup;
  }

  peekNextToken() {
    return this.peekNextTokenTup().Token;
  }

  isAdjacent(leftTokenTup, rightTokenTup) {
    const lparenStartPos = (tokenTup => this.startPosOfTokenTup(tokenTup))(rightTokenTup);

    let tokenEndPos;
    let copyOfStruct = leftTokenTup.LexbufState;
    tokenEndPos = copyOfStruct.EndPos;
    return tokenEndPos.Equals(lparenStartPos);
  }

  nextTokenIsAdjacentLParenOrLBrack(tokenTup) {
    const lookaheadTokenTup = this.peekNextTokenTup();
    const matchValue = lookaheadTokenTup.Token;
    const $var15 = matchValue.tag === 92 ? [0] : matchValue.tag === 71 ? [0] : [1];

    switch ($var15[0]) {
      case 0:
        if (((leftTokenTup, rightTokenTup) => this.isAdjacent(leftTokenTup, rightTokenTup))(tokenTup, lookaheadTokenTup)) {
          return lookaheadTokenTup.Token;
        } else {
          return null;
        }

      case 1:
        return null;
    }
  }

  nextTokenIsAdjacent(firstTokenTup) {
    const lookaheadTokenTup = this.peekNextTokenTup();
    return ((leftTokenTup, rightTokenTup) => this.isAdjacent(leftTokenTup, rightTokenTup))(firstTokenTup, lookaheadTokenTup);
  }

  peekAdjacentTypars(indentation, tokenTup) {
    const lookaheadTokenTup = this.peekNextTokenTup();
    const matchValue = lookaheadTokenTup.Token;
    const $var16 = matchValue.tag === 187 ? matchValue.data === "</" ? [0] : [1] : matchValue.tag === 158 ? [0] : [1];

    switch ($var16[0]) {
      case 0:
        let tokenEndPos;
        let copyOfStruct = tokenTup.LexbufState;
        tokenEndPos = copyOfStruct.EndPos;

        if (((leftTokenTup, rightTokenTup) => this.isAdjacent(leftTokenTup, rightTokenTup))(tokenTup, lookaheadTokenTup)) {
          const stack = {
            contents: new List()
          };

          const scanAhead = nParen => {
            scanAhead: while (true) {
              const lookaheadTokenTup_1 = this.popNextTokenTup();
              const lookaheadToken = lookaheadTokenTup_1.Token;
              stack.contents = new List([lookaheadTokenTup_1, true], stack.contents);

              const lookaheadTokenStartPos = (tokenTup_1 => this.startPosOfTokenTup(tokenTup_1))(lookaheadTokenTup_1);

              const $var17 = lookaheadToken.tag === 10 ? [0] : lookaheadToken.tag === 68 ? [0] : (indentation ? lookaheadTokenStartPos.CompareTo(tokenEndPos) < 0 : false) ? [1] : [2];

              switch ($var17[0]) {
                case 0:
                  return false;

                case 1:
                  return false;

                case 2:
                  let $var18;

                  if (lookaheadToken.tag === 93) {
                    $var18 = [0];
                  } else if (lookaheadToken.tag === 58) {
                    $var18 = [0];
                  } else if (lookaheadToken.tag === 159) {
                    $var18 = [1];
                  } else if (lookaheadToken.tag === 54) {
                    $var18 = [1];
                  } else if (lookaheadToken.tag === 99) {
                    $var18 = [1];
                  } else if (lookaheadToken.tag === 187) {
                    const activePatternResult17840 = _TyparsCloseOp___(lookaheadToken.data);

                    if (activePatternResult17840 != null) {
                      $var18 = [2, getValue(activePatternResult17840)[1], getValue(activePatternResult17840)[0]];
                    } else {
                      $var18 = [3];
                    }
                  } else {
                    $var18 = [3];
                  }

                  switch ($var18[0]) {
                    case 0:
                      const nParen_1 = nParen - 1 | 0;

                      if (nParen_1 > 0) {
                        nParen = nParen_1;
                        continue scanAhead;
                      } else {
                        return false;
                      }

                    case 1:
                      const nParen_2 = nParen - 1 | 0;
                      const hasAfterOp = lookaheadToken.tag === 159 ? false : true;

                      if (nParen_2 > 0) {
                        stack.contents = new List([lookaheadTokenTup_1, !hasAfterOp], stack.contents.tail);
                        nParen = nParen_2;
                        continue scanAhead;
                      } else {
                        if (!hasAfterOp ? (() => {
                          const matchValue_1 = (tokenTup_2 => this.nextTokenIsAdjacentLParenOrLBrack(tokenTup_2))(lookaheadTokenTup_1);

                          const $var19 = matchValue_1 != null ? getValue(matchValue_1).tag === 92 ? [0] : [1] : [1];

                          switch ($var19[0]) {
                            case 0:
                              return true;

                            case 1:
                              return false;
                          }
                        })() : false) {
                          const dotTokenTup = this.peekNextTokenTup();
                          stack.contents = new List([dotTokenTup.UseLocation(new token_3(34)), false], stack.contents);
                        }

                        return true;
                      }

                    case 2:
                      const nParen_3 = nParen - $var18[2].length | 0;

                      if (nParen_3 > 0) {
                        stack.contents = new List([lookaheadTokenTup_1, !CurriedLambda(() => $var18[1] != null)()], stack.contents.tail);
                        nParen = nParen_3;
                        continue scanAhead;
                      } else {
                        if (CurriedLambda(() => $var18[1] == null)() ? (() => {
                          const matchValue_2 = (tokenTup_3 => this.nextTokenIsAdjacentLParenOrLBrack(tokenTup_3))(lookaheadTokenTup_1);

                          const $var20 = matchValue_2 != null ? getValue(matchValue_2).tag === 92 ? [0] : [1] : [1];

                          switch ($var20[0]) {
                            case 0:
                              return true;

                            case 1:
                              return false;
                          }
                        })() : false) {
                          const dotTokenTup_1 = this.peekNextTokenTup();
                          stack.contents = new List([dotTokenTup_1.UseLocation(new token_3(34)), false], stack.contents);
                        }

                        return true;
                      }

                    case 3:
                      const $var21 = lookaheadToken.tag === 92 ? [0] : lookaheadToken.tag === 158 ? [0] : lookaheadToken.tag === 71 ? [0] : lookaheadToken.tag === 73 ? [0] : lookaheadToken.tag === 187 ? lookaheadToken.data === "</" ? [0] : [2] : lookaheadToken.tag === 51 ? [1] : lookaheadToken.tag === 78 ? [1] : lookaheadToken.tag === 80 ? [1] : lookaheadToken.tag === 55 ? [1] : lookaheadToken.tag === 146 ? [1] : lookaheadToken.tag === 150 ? [1] : lookaheadToken.tag === 130 ? [1] : lookaheadToken.tag === 85 ? [1] : lookaheadToken.tag === 142 ? [1] : lookaheadToken.tag === 186 ? lookaheadToken.data === "^" ? [1] : lookaheadToken.data === "^-" ? [1] : [2] : lookaheadToken.tag === 183 ? lookaheadToken.data === "/" ? [1] : [2] : lookaheadToken.tag === 62 ? [1] : lookaheadToken.tag === 45 ? [1] : lookaheadToken.tag === 113 ? [1] : lookaheadToken.tag === 190 ? [1] : lookaheadToken.tag === 178 ? [1] : lookaheadToken.tag === 177 ? [1] : lookaheadToken.tag === 175 ? [1] : lookaheadToken.tag === 174 ? [1] : lookaheadToken.tag === 168 ? [1] : lookaheadToken.tag === 173 ? [1] : lookaheadToken.tag === 172 ? [1] : lookaheadToken.tag === 171 ? [1] : lookaheadToken.tag === 170 ? [1] : lookaheadToken.tag === 169 ? [1] : lookaheadToken.tag === 164 ? [1] : lookaheadToken.tag === 163 ? [1] : lookaheadToken.tag === 191 ? [1] : lookaheadToken.tag === 192 ? [1] : lookaheadToken.tag === 165 ? [1] : lookaheadToken.tag === 106 ? [1] : lookaheadToken.tag === 121 ? [1] : lookaheadToken.tag === 167 ? [1] : lookaheadToken.tag === 166 ? [1] : lookaheadToken.tag === 77 ? [1] : lookaheadToken.tag === 67 ? [1] : lookaheadToken.tag === 70 ? [1] : lookaheadToken.tag === 189 ? [1] : lookaheadToken.tag === 97 ? [1] : lookaheadToken.tag === 98 ? [1] : lookaheadToken.tag === 88 ? [1] : lookaheadToken.tag === 96 ? [1] : lookaheadToken.tag === 91 ? [1] : [2];

                      switch ($var21[0]) {
                        case 0:
                          nParen = nParen + 1;
                          continue scanAhead;

                        case 1:
                          nParen = nParen;
                          continue scanAhead;

                        case 2:
                          if (nParen > 1) {
                            nParen = nParen;
                            continue scanAhead;
                          } else {
                            return false;
                          }

                      }

                  }

              }
            }
          };

          const res = scanAhead(0);
          iterate(tupledArg => {
            if (tupledArg[1]) {
              const matchValue_3 = tupledArg[0].Token;
              let $var22;

              if (matchValue_3.tag === 187) {
                if (matchValue_3.data === "</") {
                  $var22 = [0];
                } else {
                  const activePatternResult17845 = _TyparsCloseOp___(matchValue_3.data);

                  if (activePatternResult17845 != null) {
                    $var22 = [4, getValue(activePatternResult17845)[1], getValue(activePatternResult17845)[0], matchValue_3.data];
                  } else {
                    $var22 = [5];
                  }
                }
              } else if (matchValue_3.tag === 99) {
                $var22 = [1];
              } else if (matchValue_3.tag === 54) {
                $var22 = [2];
              } else if (matchValue_3.tag === 159) {
                $var22 = [3];
              } else {
                $var22 = [5];
              }

              switch ($var22[0]) {
                case 0:
                  (tokenTup_4 => {
                    this.delayToken(tokenTup_4);
                  })(tupledArg[0].UseShiftedLocation(new token_3(183, "/"), 1, 0));

                  (tokenTup_5 => {
                    this.delayToken(tokenTup_5);
                  })(tupledArg[0].UseShiftedLocation(new token_3(158, res), 0, -1));

                  break;

                case 1:
                  (tokenTup_6 => {
                    this.delayToken(tokenTup_6);
                  })(tupledArg[0].UseShiftedLocation(new token_3(65), 1, 0));

                  (tokenTup_7 => {
                    this.delayToken(tokenTup_7);
                  })(tupledArg[0].UseShiftedLocation(new token_3(159, res), 0, -2));

                  break;

                case 2:
                  (tokenTup_8 => {
                    this.delayToken(tokenTup_8);
                  })(tupledArg[0].UseShiftedLocation(new token_3(58), 1, 0));

                  (tokenTup_9 => {
                    this.delayToken(tokenTup_9);
                  })(tupledArg[0].UseShiftedLocation(new token_3(159, res), 0, -1));

                  break;

                case 3:
                  (tokenTup_10 => {
                    this.delayToken(tokenTup_10);
                  })(tupledArg[0].UseLocation(new token_3(159, res)));

                  break;

                case 4:
                  if ($var22[1] != null) {
                    (tokenTup_11 => {
                      this.delayToken(tokenTup_11);
                    })(tupledArg[0].UseShiftedLocation(getValue($var22[1]), $var22[2].length, 0));
                  }

                  for (let i = $var22[2].length - 1; i >= 0; i--) {
                    (tokenTup_12 => {
                      this.delayToken(tokenTup_12);
                    })(tupledArg[0].UseShiftedLocation($var22[2][i](res), i, -$var22[3].length + i + 1));
                  }

                  break;

                case 5:
                  (tokenTup_13 => {
                    this.delayToken(tokenTup_13);
                  })(tupledArg[0]);

                  break;
              }
            } else {
              (tokenTup_14 => {
                this.delayToken(tokenTup_14);
              })(tupledArg[0]);
            }
          }, stack.contents);
          return res;
        } else {
          return false;
        }

      case 1:
        return false;
    }
  }

  returnToken(tokenLexbufState, tok) {
    this.setLexbufState(tokenLexbufState);
    this.prevWasAtomicEnd = isAtomicExprEndToken(tok);
    return tok;
  }

  suffixExists(p, l) {
    if (l.tail != null) {
      if (p(l.tail)) {
        return true;
      } else {
        return ((p_1, l_1) => this.suffixExists(p_1, l_1))(p, l.tail);
      }
    } else {
      return false;
    }
  }

  tokenBalancesHeadContext(token, stack) {
    const matchValue = [token, stack];
    const $var23 = matchValue[0].tag === 141 ? matchValue[1].tail != null ? matchValue[1].head.tag === 6 ? [0] : [3] : [3] : matchValue[0].tag === 139 ? matchValue[1].tail != null ? matchValue[1].head.tag === 1 ? [0] : [3] : [3] : matchValue[0].tag === 140 ? matchValue[1].tail != null ? matchValue[1].head.tag === 1 ? [0] : [3] : [3] : matchValue[0].tag === 137 ? matchValue[1].tail != null ? matchValue[1].head.tag === 14 ? [0] : [3] : [3] : matchValue[0].tag === 87 ? matchValue[1].tail != null ? matchValue[1].head.tag === 7 ? [0] : matchValue[1].head.tag === 23 ? [0] : matchValue[1].head.tag === 19 ? [0] : matchValue[1].head.tag === 15 ? [0] : matchValue[1].head.tag === 2 ? [0] : matchValue[1].head.tag === 16 ? [0] : matchValue[1].head.tag === 20 ? [0] : matchValue[1].head.tag === 25 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 24 ? matchValue[1].tail.head.data[0].tag === 74 ? [0] : [3] : [3] : [3] : [3] : [3] : matchValue[0].tag === 128 ? matchValue[1].tail != null ? matchValue[1].head.tag === 2 ? [0] : [3] : [3] : matchValue[0].tag === 126 ? matchValue[1].tail != null ? matchValue[1].head.tag === 8 ? [1] : matchValue[1].head.tag === 0 ? [1] : this.detectJoinInCtxt(matchValue[1]) ? [2, matchValue[1]] : [3] : this.detectJoinInCtxt(matchValue[1]) ? [2, matchValue[1]] : [3] : [3];

    switch ($var23[0]) {
      case 0:
        return true;

      case 1:
        return true;

      case 2:
        return true;

      case 3:
        const $var24 = matchValue[0].tag === 68 ? matchValue[1].tail != null ? matchValue[1].head.tag === 25 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 22 ? [0] : matchValue[1].tail.head.tag === 21 ? matchValue[1].tail.head.data[1] ? [1] : [3] : [3] : [3] : matchValue[1].head.tag === 24 ? [2, matchValue[1].head.data[0], matchValue[0]] : [3] : [3] : matchValue[1].tail != null ? matchValue[1].head.tag === 24 ? [2, matchValue[1].head.data[0], matchValue[0]] : [3] : [3];

        switch ($var24[0]) {
          case 0:
            return true;

          case 1:
            return true;

          case 2:
            return parenTokensBalance($var24[1], $var24[2]);

          case 3:
            return false;
        }

    }
  }

  hwTokenFetch(useBlockRule) {
    var t1;
    var t1_1;
    var t1_2;
    var t1_3;
    var t1_4;
    var t1_5;
    var t1_6;
    var offsidePos_29;
    var offsidePos_27;
    var offsidePos_26;
    var addBlockEnd_2;
    var offsidePos_25;
    var addBlockEnd_1;
    var rest;
    var offsidePos_24;
    var addBlockEnd;
    var isTypeCtxt;
    var isNamespaceCtxt;
    var offsidePos_23;
    var offsidePos_22;
    var offsidePos_21;
    var offsidePos_20;
    var wholeFile;
    var offsidePos_19;
    var offsidePos_18;
    var offsidePos_17;
    var offsidePos_16;
    var offsidePos_15;
    var offsidePos_14;
    var offsidePos_13;
    var offsidePos_12;
    var offsidePos_11;
    var offsidePos_10;
    var offsidePos_9;
    var offsidePos_8;
    var offsidePos_7;
    var offsidePos_6;
    var offsidePos_5;
    var offsidePos_4;
    var offsidePos_3;
    var isUse;
    var ctxt_18;
    var matchValue_11;
    var ctxt_12;
    var ctxt_13;
    var ctxt_14;
    var ctxt_15;
    var ctxt_16;
    var ctxt_17;

    var _ctxt;

    var matchValue_20;

    var _ctxt_1;

    var matchValue_21;

    var _ctxt_2;

    var matchValue_22;
    var ctxt_11;
    var matchValue_19;
    var copyOfStruct_5;
    var copyOfStruct_4;
    var matchValue_15;
    var copyOfStruct_6;
    const tokenTup = this.popNextTokenTup();

    const tokenReplaced = (tokenTup_1 => this.rulesForBothSoftWhiteAndHardWhite(tokenTup_1))(tokenTup);

    if (tokenReplaced) {
      return (useBlockRule_1 => this.hwTokenFetch(useBlockRule_1))(useBlockRule);
    } else {
      const tokenStartPos = (tokenTup_2 => this.startPosOfTokenTup(tokenTup_2))(tokenTup);

      const token = tokenTup.Token;
      const tokenLexbufState = tokenTup.LexbufState;
      const tokenStartCol = tokenStartPos.Column | 0;

      const isSameLine = () => {
        var copyOfStruct;
        return token.tag === 10 ? false : (copyOfStruct = (tokenTup_3 => this.startPosOfTokenTup(tokenTup_3))(this.peekNextTokenTup()), copyOfStruct.OriginalLine) === tokenStartPos.OriginalLine;
      };

      const isControlFlowOrNotSameLine = () => {
        if (token.tag === 10) {
          return false;
        } else if (!isSameLine()) {
          return true;
        } else {
          const matchValue = this.peekNextToken();

          switch (matchValue.tag) {
            case 107:
            case 116:
            case 125:
            case 160:
            case 122:
            case 86:
              return true;

            default:
              return false;
          }
        }
      };

      const isLongIdentEquals = token_1 => {
        const $var25 = token_1.tag === 45 ? [0] : token_1.tag === 189 ? [0] : [1];

        switch ($var25[0]) {
          case 0:
            const loop = () => {
              const tokenTup_4 = this.popNextTokenTup();
              let res_1;
              const matchValue_1 = tokenTup_4.Token;

              if (matchValue_1.tag === 10) {
                res_1 = false;
              } else if (matchValue_1.tag === 77) {
                const tokenTup_5 = this.popNextTokenTup();
                let res;
                const matchValue_2 = tokenTup_5.Token;

                if (matchValue_2.tag === 10) {
                  res = false;
                } else if (matchValue_2.tag === 189) {
                  res = loop();
                } else {
                  res = false;
                }

                (tokenTup_6 => {
                  this.delayToken(tokenTup_6);
                })(tokenTup_5);

                res_1 = res;
              } else if (matchValue_1.tag === 70) {
                res_1 = true;
              } else {
                res_1 = false;
              }

              (tokenTup_7 => {
                this.delayToken(tokenTup_7);
              })(tokenTup_4);

              return res_1;
            };

            return loop();

          case 1:
            return false;
        }
      };

      const reprocess = () => {
        (tokenTup_8 => {
          this.delayToken(tokenTup_8);
        })(tokenTup);

        return (useBlockRule_2 => this.hwTokenFetch(useBlockRule_2))(useBlockRule);
      };

      const reprocessWithoutBlockRule = () => {
        (tokenTup_9 => {
          this.delayToken(tokenTup_9);
        })(tokenTup);

        return (useBlockRule_3 => this.hwTokenFetch(useBlockRule_3))(false);
      };

      const insertTokenFromPrevPosToCurrentPos = tok => {
        (tokenTup_10 => {
          this.delayToken(tokenTup_10);
        })(tokenTup);

        if (debug) {
          dprintf(printf("inserting %+A\n"))(tok);
        }

        let lastTokenPos;
        let pos;
        const copyOfStruct_1 = tokenTup.LastTokenPos;
        pos = copyOfStruct_1.Y;
        lastTokenPos = pos.ShiftColumnBy(1);
        let tokenLexbufState_1;
        let lastTokenEndPos;
        let copyOfStruct_2 = tokenTup.LexbufState;
        lastTokenEndPos = copyOfStruct_2.StartPos;
        tokenLexbufState_1 = this.lexbufStateForInsertedDummyTokens(lastTokenPos, lastTokenEndPos);
        return this.returnToken(tokenLexbufState_1, tok);
      };

      const insertToken = tok_1 => {
        (tokenTup_11 => {
          this.delayToken(tokenTup_11);
        })(tokenTup);

        if (debug) {
          dprintf(printf("inserting %+A\n"))(tok_1);
        }

        let tokenLexbufState_2;

        const lastTokenStartPos = (tokenTup_12 => this.startPosOfTokenTup(tokenTup_12))(tokenTup);

        let lastTokenEndPos_1;
        let copyOfStruct_3 = tokenTup.LexbufState;
        lastTokenEndPos_1 = copyOfStruct_3.EndPos;
        tokenLexbufState_2 = this.lexbufStateForInsertedDummyTokens(lastTokenStartPos, lastTokenEndPos_1);
        return this.returnToken(tokenLexbufState_2, tok_1);
      };

      const isSemiSemi = token.tag === 68 ? true : false;

      const thereIsACtxtMemberBodyOnTheStackAndWeShouldPopStackForUpcomingMember = ctxtStack => {
        if (!exists(_arg2 => _arg2.tag === 20 ? true : false, ctxtStack)) {
          return false;
        } else if (exists(_arg3 => {
          const $var26 = _arg3.tag === 24 ? _arg3.data[0].tag === 74 ? [0] : [1] : [1];

          switch ($var26[0]) {
            case 0:
              return true;

            case 1:
              return false;
          }
        }, ctxtStack)) {
          return false;
        } else if (List_1.count(_arg4 => {
          const $var27 = _arg4.tag === 24 ? _arg4.data[0].tag === 92 ? [0] : [1] : [1];

          switch ($var27[0]) {
            case 0:
              return true;

            case 1:
              return false;
          }
        }, ctxtStack) >= 2) {
          return false;
        } else {
          return true;
        }
      };

      const endTokenForACtxt = ctxt => {
        const $var28 = ctxt.tag === 3 ? [0] : ctxt.tag === 26 ? [0] : ctxt.tag === 5 ? [0] : ctxt.tag === 6 ? [1] : ctxt.tag === 14 ? [2] : ctxt.tag === 0 ? ctxt.data[0] ? [2] : [5] : ctxt.tag === 25 ? ctxt.data[2].tag === 0 ? [3] : ctxt.data[2].tag === 2 ? [4] : [5] : [5];

        switch ($var28[0]) {
          case 0:
            return new token_3(20);

          case 1:
            return new token_3(19);

          case 2:
            return new token_3(19);

          case 3:
            return new token_3(15);

          case 4:
            return new token_3(18);

          case 5:
            return null;
        }
      };

      const tokenForcesHeadContextClosure = (token_2, stack) => {
        var p;

        if (!(stack.tail == null)) {
          const $var29 = token_2.tag === 10 ? [0] : token_2.tag === 68 ? [1] : token_2.tag === 141 ? [2] : token_2.tag === 139 ? [2] : token_2.tag === 140 ? [2] : token_2.tag === 137 ? [2] : token_2.tag === 126 ? [2] : token_2.tag === 93 ? [2] : token_2.tag === 159 ? token_2.data ? [2] : [3] : token_2.tag === 59 ? [2] : token_2.tag === 58 ? [2] : token_2.tag === 65 ? [2] : token_2.tag === 87 ? [2] : token_2.tag === 128 ? [2] : token_2.tag === 154 ? [2] : [3];

          switch ($var29[0]) {
            case 0:
              return true;

            case 1:
              return !this.tokenBalancesHeadContext(token_2, stack);

            case 2:
              if (!this.tokenBalancesHeadContext(token_2, stack)) {
                return (p = stack_1 => this.tokenBalancesHeadContext(token_2, stack_1), l => this.suffixExists(p, l))(stack);
              } else {
                return false;
              }

            case 3:
              return false;
          }
        } else {
          return false;
        }
      };

      const insertComingSoonTokens = tupledArg => {
        let effectsToDo = new List();

        if (!this.compilingFsLib) {
          const nextOuterMostInterestingContextIsNamespaceOrModule = offsideStack => {
            nextOuterMostInterestingContextIsNamespaceOrModule: while (true) {
              const $var30 = offsideStack.tail != null ? offsideStack.tail.tail == null ? [2] : offsideStack.tail.head.tag === 22 ? [0] : offsideStack.tail.head.tag === 21 ? [0] : offsideStack.tail.head.tag === 24 ? offsideStack.tail.head.data[0].tag === 135 ? offsideStack.tail.tail.tail != null ? offsideStack.tail.tail.head.tag === 25 ? [1] : [3] : [3] : offsideStack.tail.head.data[0].tag === 55 ? offsideStack.tail.tail.tail != null ? offsideStack.tail.tail.head.tag === 25 ? [1] : [3] : [3] : [3] : [3] : [3];

              switch ($var30[0]) {
                case 0:
                  return true;

                case 1:
                  offsideStack = offsideStack.tail.tail;
                  continue nextOuterMostInterestingContextIsNamespaceOrModule;

                case 2:
                  return true;

                case 3:
                  return false;
              }
            }
          };

          while ((!(this.offsideStack.tail == null) ? !nextOuterMostInterestingContextIsNamespaceOrModule(this.offsideStack) : false) ? (() => {
            const matchValue_3 = this.offsideStack.head;
            const $var31 = matchValue_3.tag === 24 ? matchValue_3.data[0].tag === 92 ? [0] : matchValue_3.data[0].tag === 71 ? [0] : matchValue_3.data[0].tag === 74 ? [0] : matchValue_3.data[0].tag === 72 ? [0] : [3] : matchValue_3.tag === 25 ? [1] : matchValue_3.tag === 11 ? [2] : [3];

            switch ($var31[0]) {
              case 0:
                return true;

              case 1:
                return true;

              case 2:
                return true;

              case 3:
                return false;
            }
          })() : false) {
            const matchValue_4 = this.offsideStack.head;

            if (matchValue_4.tag === 24) {
              if (debug) {
                dprintf(printf("%s at %a terminates CtxtParen()\n"))(tupledArg[0], (os, p_1) => {
                  outputPos(os, p_1);
                }, tokenStartPos);
              }

              this.popCtxt();
            } else if (matchValue_4.tag === 25) {
              if (matchValue_4.data[2].tag === 1) {
                if (debug) {
                  dprintf(printf("--> because %s is coming, popping CtxtSeqBlock\n"))(tupledArg[0]);
                }

                this.popCtxt();
              } else if (matchValue_4.data[2].tag === 2) {
                this.popCtxt();
                effectsToDo = new List(() => {
                  if (debug) {
                    dprintf(printf("--> because %s is coming, inserting ORIGHT_BLOCK_END\n"))(tupledArg[0]);
                  }

                  (tokenTup_13 => {
                    this.delayTokenNoProcessing(tokenTup_13);
                  })(tokenTup.UseLocation(new token_3(18)));
                }, effectsToDo);
              } else {
                this.popCtxt();
                effectsToDo = new List(() => {
                  if (debug) {
                    dprintf(printf("--> because %s is coming, inserting OBLOCKEND\n"))(tupledArg[0]);
                  }

                  (tokenTup_14 => {
                    this.delayTokenNoProcessing(tokenTup_14);
                  })(tokenTup.UseLocation(new token_3(15)));
                }, effectsToDo);
              }
            } else if (matchValue_4.tag === 11) {
              if (debug) {
                dprintf(printf("--> because %s is coming, popping CtxtVanilla\n"))(tupledArg[0]);
              }

              this.popCtxt();
            } else {
              throw new Error("impossible, the while loop guard just above prevents this");
            }
          }
        }

        if (debug) {
          dprintf(printf("inserting 6 copies of %+A before %+A\n"))(tupledArg[1], tupledArg[2]);
        }

        (tokenTup_15 => {
          this.delayTokenNoProcessing(tokenTup_15);
        })(tokenTup.UseLocation(tupledArg[2]));

        for (let i = 1; i <= 6; i++) {
          (tokenTup_16 => {
            this.delayTokenNoProcessing(tokenTup_16);
          })(tokenTup.UseLocation(tupledArg[1]));
        }

        const inputSequence = reverse(effectsToDo);

        for (let e of inputSequence) {
          e();
        }
      };

      const matchValue_5 = [token, this.offsideStack];

      if (this.tokensThatNeedNoProcessingCount > 0) {
        this.tokensThatNeedNoProcessingCount = this.tokensThatNeedNoProcessingCount - 1 | 0;
        return this.returnToken(tokenLexbufState, token);
      } else if (tokenForcesHeadContextClosure(token, this.offsideStack)) {
        const ctxt_1 = this.offsideStack.head;

        if (debug) {
          dprintf(printf("IN/ELSE/ELIF/DONE/RPAREN/RBRACE/END at %a terminates context at position %a\n"))((os_1, p_2) => {
            outputPos(os_1, p_2);
          }, tokenStartPos, (os_2, p_3) => {
            outputPos(os_2, p_3);
          }, ctxt_1.StartPos);
        }

        this.popCtxt();
        const matchValue_6 = endTokenForACtxt(ctxt_1);

        if (matchValue_6 != null) {
          if (debug) {
            dprintf(printf("--> inserting %+A\n"))(getValue(matchValue_6));
          }

          return insertToken(getValue(matchValue_6));
        } else {
          return reprocess();
        }
      } else {
        const $var32 = matchValue_5[0].tag === 68 ? matchValue_5[1].tail == null ? [0] : [3] : matchValue_5[0].tag === 23 ? matchValue_5[1].tail == null ? [1] : [3] : matchValue_5[0].tag === 126 ? this.detectJoinInCtxt(matchValue_5[1]) ? [2] : [3] : [3];

        switch ($var32[0]) {
          case 0:
            if (debug) {
              dprintf(printf(";; scheduling a reset\n"));
            }

            (tokenTup_17 => {
              this.delayToken(tokenTup_17);
            })(tokenTup.UseLocation(new token_3(23)));

            const tok_2 = new token_3(68);
            return this.returnToken(tokenLexbufState, tok_2);

          case 1:
            if (debug) {
              dprintf(printf("performing a reset after a ;; has been swallowed\n"));
            }

            this.peekInitial();
            return (useBlockRule_4 => this.hwTokenFetch(useBlockRule_4))(true);

          case 2:
            const tok_3 = new token_3(127);
            return this.returnToken(tokenLexbufState, tok_3);

          case 3:
            const $var33 = matchValue_5[0].tag === 126 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 0 ? [0, matchValue_5[1].head.data[0], matchValue_5[1].head.data[1]] : [3] : [3] : matchValue_5[0].tag === 137 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 14 ? [1, matchValue_5[1].head.data] : [3] : [3] : matchValue_5[0].tag === 141 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 24 ? (t1 = matchValue_5[1].head.data[0], parenTokensBalance(t1, matchValue_5[0])) ? [2, matchValue_5[1].head.data[0], matchValue_5[0]] : [3] : [3] : [3] : matchValue_5[0].tag === 93 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 24 ? (t1_1 = matchValue_5[1].head.data[0], parenTokensBalance(t1_1, matchValue_5[0])) ? [2, matchValue_5[1].head.data[0], matchValue_5[0]] : [3] : [3] : [3] : matchValue_5[0].tag === 59 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 24 ? (t1_2 = matchValue_5[1].head.data[0], parenTokensBalance(t1_2, matchValue_5[0])) ? [2, matchValue_5[1].head.data[0], matchValue_5[0]] : [3] : [3] : [3] : matchValue_5[0].tag === 58 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 24 ? (t1_3 = matchValue_5[1].head.data[0], parenTokensBalance(t1_3, matchValue_5[0])) ? [2, matchValue_5[1].head.data[0], matchValue_5[0]] : [3] : [3] : [3] : matchValue_5[0].tag === 65 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 24 ? (t1_4 = matchValue_5[1].head.data[0], parenTokensBalance(t1_4, matchValue_5[0])) ? [2, matchValue_5[1].head.data[0], matchValue_5[0]] : [3] : [3] : [3] : matchValue_5[0].tag === 154 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 24 ? (t1_5 = matchValue_5[1].head.data[0], parenTokensBalance(t1_5, matchValue_5[0])) ? [2, matchValue_5[1].head.data[0], matchValue_5[0]] : [3] : [3] : [3] : matchValue_5[0].tag === 159 ? matchValue_5[0].data ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 24 ? (t1_6 = matchValue_5[1].head.data[0], parenTokensBalance(t1_6, matchValue_5[0])) ? [2, matchValue_5[1].head.data[0], matchValue_5[0]] : [3] : [3] : [3] : [3] : [3];

            switch ($var33[0]) {
              case 0:
                if (debug) {
                  dprintf(printf("IN at %a (becomes %s)\n"))((os_3, p_4) => {
                    outputPos(os_3, p_4);
                  }, tokenStartPos, $var33[1] ? "ODECLEND" : "IN");
                }

                if (tokenStartCol < $var33[2].Column) {
                  ((s, msg) => {
                    this.warn(s, msg);
                  })(tokenTup, SR.lexfltIncorrentIndentationOfIn());
                }

                this.popCtxt();

                (tokenTup_18 => {
                  this.delayToken(tokenTup_18);
                })(tokenTup.UseLocation(new token_3(12, token)));

                const tok_4 = $var33[1] ? new token_3(19) : token;
                return this.returnToken(tokenLexbufState, tok_4);

              case 1:
                if (debug) {
                  dprintf(printf("DONE at %a terminates CtxtDo(offsidePos=%a)\n"))((os_4, p_5) => {
                    outputPos(os_4, p_5);
                  }, tokenStartPos, (os_5, p_6) => {
                    outputPos(os_5, p_6);
                  }, $var33[1]);
                }

                this.popCtxt();

                (tokenTup_19 => {
                  this.delayToken(tokenTup_19);
                })(tokenTup.UseLocation(new token_3(19)));

                return (useBlockRule_5 => this.hwTokenFetch(useBlockRule_5))(useBlockRule);

              case 2:
                if (debug) {
                  dprintf(printf("RPAREN/RBRACE/RBRACK/BAR_RBRACK/RQUOTE/END at %a terminates CtxtParen()\n"))((os_6, p_7) => {
                    outputPos(os_6, p_7);
                  }, tokenStartPos);
                }

                this.popCtxt();

                (tokenTup_20 => {
                  this.delayToken(tokenTup_20);
                })(tokenTup.UseLocation(new token_3(12, token)));

                return this.returnToken(tokenLexbufState, token);

              case 3:
                const $var34 = matchValue_5[0].tag === 141 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 6 ? (offsidePos_29 = matchValue_5[1].head.data, !(tokenStartCol + 1 <= offsidePos_29.Column)) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1] : [1];

                switch ($var34[0]) {
                  case 0:
                    if (debug) {
                      dprintf(printf("END at %a terminates CtxtWithAsAugment()\n"))((os_7, p_8) => {
                        outputPos(os_7, p_8);
                      }, tokenStartPos);
                    }

                    this.popCtxt();

                    (tokenTup_21 => {
                      this.delayToken(tokenTup_21);
                    })(tokenTup.UseLocation(new token_3(12, token)));

                    const tok_5 = new token_3(20);
                    return this.returnToken(tokenLexbufState, tok_5);

                  case 1:
                    const $var35 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 17 ? [0, matchValue_5[1].head.data[0], matchValue_5[1].head.data[1]] : matchValue_5[1].head.tag === 18 ? [1, matchValue_5[1].head.data[0], matchValue_5[1].head.data[1]] : matchValue_5[1].head.tag === 25 ? (() => {
                      var posType;
                      var posNamespace;
                      const rest_1 = matchValue_5[1].tail;
                      const offsidePos_28 = matchValue_5[1].head.data[1];
                      const addBlockEnd_3 = matchValue_5[1].head.data[2];

                      if (isSemiSemi ? !(() => {
                        const $var85 = rest_1.tail != null ? rest_1.head.tag === 22 ? [0] : rest_1.head.tag === 21 ? rest_1.head.data[1] ? [0] : [1] : [1] : [1];

                        switch ($var85[0]) {
                          case 0:
                            return true;

                          case 1:
                            return false;
                        }
                      })() : false) {
                        return true;
                      } else {
                        let grace;
                        const matchValue_23 = [token, rest_1];
                        const $var86 = matchValue_23[0].tag === 57 ? matchValue_23[1].tail != null ? matchValue_23[1].head.tag === 16 ? [0] : [2] : [2] : matchValue_23[1].tail != null ? matchValue_23[1].head.tag === 16 ? (posType = matchValue_23[1].head.data, offsidePos_28.Column === posType.Column ? !isTypeSeqBlockElementContinuator(token) : false) ? [1, matchValue_23[1].head.data] : [2] : [2] : [2];

                        switch ($var86[0]) {
                          case 0:
                            grace = 2;
                            break;

                          case 1:
                            grace = -1 | 0;
                            break;

                          case 2:
                            const $var87 = matchValue_23[1].tail != null ? matchValue_23[1].head.tag === 22 ? (posNamespace = matchValue_23[1].head.data, offsidePos_28.Column === posNamespace.Column ? token.tag === 149 ? true : false : false) ? [0, matchValue_23[1].head.data] : [1] : [1] : [1];

                            switch ($var87[0]) {
                              case 0:
                                grace = -1 | 0;
                                break;

                              case 1:
                                if (isInfix(token)) {
                                  grace = infixTokenLength(token) + 1 | 0;
                                } else {
                                  grace = 0;
                                }

                                break;
                            }

                            break;
                        }

                        return tokenStartCol + grace < offsidePos_28.Column;
                      }
                    })() ? [2, matchValue_5[1].head.data[2], matchValue_5[1].head.data[1], matchValue_5[1].tail] : [3] : [3] : [3];

                    switch ($var35[0]) {
                      case 0:
                        const matchValue_7 = [$var35[2], token];
                        const $var36 = matchValue_7[0].tag === 149 ? matchValue_7[1].tag === 103 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_7[1].tag === 189 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_7[1].tag === 45 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : matchValue_7[0].tag === 77 ? matchValue_7[1].tag === 103 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_7[1].tag === 189 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_7[1].tag === 45 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : matchValue_7[0].tag === 103 ? matchValue_7[1].tag === 103 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_7[1].tag === 189 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_7[1].tag === 45 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : matchValue_7[0].tag === 45 ? matchValue_7[1].tag === 103 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_7[1].tag === 189 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_7[1].tag === 45 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : [1];

                        switch ($var36[0]) {
                          case 0:
                            ((p_9, ctxt_2) => {
                              this.replaceCtxt(p_9, ctxt_2);
                            })(tokenTup, new Context(17, [$var35[1], token]));

                            return this.returnToken(tokenLexbufState, token);

                          case 1:
                            const $var37 = matchValue_7[0].tag === 189 ? matchValue_7[1].tag === 77 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : [1];

                            switch ($var37[0]) {
                              case 0:
                                ((p_10, ctxt_3) => {
                                  this.replaceCtxt(p_10, ctxt_3);
                                })(tokenTup, new Context(17, [$var35[1], token]));

                                return this.returnToken(tokenLexbufState, token);

                              case 1:
                                if (debug) {
                                  dprintf(printf("CtxtNamespaceHead: pushing CtxtSeqBlock\n"));
                                }

                                this.popCtxt();
                                const matchValue_8 = tokenTup.Token;

                                if (matchValue_8.tag === 10) {
                                  return this.returnToken(tokenLexbufState, token);
                                } else {
                                  (tokenTup_22 => {
                                    this.delayToken(tokenTup_22);
                                  })(tokenTup);

                                  ((tokenTup_23, newCtxt) => {
                                    this.pushCtxt(tokenTup_23, newCtxt);
                                  })(tokenTup, new Context(22, $var35[1]));

                                  (tupledArg_1 => {
                                    this.pushCtxtSeqBlockAt(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]);
                                  })([tokenTup, true, new AddBlockEnd(0)]);

                                  return (useBlockRule_6 => this.hwTokenFetch(useBlockRule_6))(false);
                                }

                            }

                        }

                      case 1:
                        const matchValue_9 = [$var35[2], token];
                        const $var38 = matchValue_9[0].tag === 148 ? matchValue_9[1].tag === 45 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : [1];

                        switch ($var38[0]) {
                          case 0:
                            ((p_11, ctxt_4) => {
                              this.replaceCtxt(p_11, ctxt_4);
                            })(tokenTup, new Context(18, [$var35[1], token]));

                            return this.returnToken(tokenLexbufState, token);

                          case 1:
                            const $var39 = matchValue_9[0].tag === 148 ? matchValue_9[1].tag === 42 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_9[1].tag === 43 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_9[1].tag === 44 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : [1];

                            switch ($var39[0]) {
                              case 0:
                                return this.returnToken(tokenLexbufState, token);

                              case 1:
                                const $var40 = matchValue_9[0].tag === 148 ? matchValue_9[1].tag === 103 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_9[1].tag === 189 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : matchValue_9[0].tag === 77 ? matchValue_9[1].tag === 103 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_9[1].tag === 189 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : matchValue_9[0].tag === 103 ? matchValue_9[1].tag === 103 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : matchValue_9[1].tag === 189 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : [1];

                                switch ($var40[0]) {
                                  case 0:
                                    ((p_12, ctxt_5) => {
                                      this.replaceCtxt(p_12, ctxt_5);
                                    })(tokenTup, new Context(18, [$var35[1], token]));

                                    return this.returnToken(tokenLexbufState, token);

                                  case 1:
                                    const $var41 = matchValue_9[0].tag === 189 ? matchValue_9[1].tag === 77 ? $var35[1].Column < tokenStartPos.Column ? [0] : [1] : [1] : [1];

                                    switch ($var41[0]) {
                                      case 0:
                                        ((p_13, ctxt_6) => {
                                          this.replaceCtxt(p_13, ctxt_6);
                                        })(tokenTup, new Context(18, [$var35[1], token]));

                                        return this.returnToken(tokenLexbufState, token);

                                      case 1:
                                        const $var42 = matchValue_9[1].tag === 70 ? [0] : matchValue_9[1].tag === 78 ? [0] : [1];

                                        switch ($var42[0]) {
                                          case 0:
                                            if (debug) {
                                              dprintf(printf("CtxtModuleHead: COLON/EQUALS, pushing CtxtModuleBody and CtxtSeqBlock\n"));
                                            }

                                            this.popCtxt();

                                            ((tokenTup_24, newCtxt_1) => {
                                              this.pushCtxt(tokenTup_24, newCtxt_1);
                                            })(tokenTup, new Context(21, [$var35[1], false]));

                                            (tupledArg_2 => {
                                              this.pushCtxtSeqBlock(tupledArg_2[0], tupledArg_2[1]);
                                            })([true, new AddBlockEnd(0)]);

                                            return this.returnToken(tokenLexbufState, token);

                                          case 1:
                                            if (debug) {
                                              dprintf(printf("CtxtModuleHead: start of file, CtxtSeqBlock\n"));
                                            }

                                            this.popCtxt();
                                            const matchValue_10 = tokenTup.Token;

                                            if (matchValue_10.tag === 10) {
                                              return this.returnToken(tokenLexbufState, token);
                                            } else {
                                              (tokenTup_25 => {
                                                this.delayToken(tokenTup_25);
                                              })(tokenTup);

                                              ((tokenTup_26, newCtxt_2) => {
                                                this.pushCtxt(tokenTup_26, newCtxt_2);
                                              })(tokenTup, new Context(21, [$var35[1], true]));

                                              (tupledArg_3 => {
                                                this.pushCtxtSeqBlockAt(tupledArg_3[0], tupledArg_3[1], tupledArg_3[2]);
                                              })([tokenTup, true, new AddBlockEnd(0)]);

                                              return (useBlockRule_7 => this.hwTokenFetch(useBlockRule_7))(false);
                                            }

                                        }

                                    }

                                }

                            }

                        }

                      case 2:
                        if (debug) {
                          dprintf(printf("offside token at column %d indicates end of CtxtSeqBlock started at %a!\n"))(tokenStartCol, (os_8, p_14) => {
                            outputPos(os_8, p_14);
                          }, $var35[2]);
                        }

                        this.popCtxt();

                        if (debug) {
                          if ($var35[1].tag === 0) {
                            dprintf(printf("end of CtxtSeqBlock, insert OBLOCKEND \n"));
                          }
                        }

                        if ($var35[1].tag === 2) {
                          return insertToken(new token_3(18));
                        } else if ($var35[1].tag === 1) {
                          return reprocess();
                        } else {
                          return insertToken(new token_3(15));
                        }

                      case 3:
                        const $var43 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 11 ? (offsidePos_27 = matchValue_5[1].head.data[0], isSemiSemi ? true : tokenStartCol <= offsidePos_27.Column) ? [0, matchValue_5[1].head.data[0]] : [1] : [1] : [1];

                        switch ($var43[0]) {
                          case 0:
                            if (debug) {
                              dprintf(printf("offside token at column %d indicates end of CtxtVanilla started at %a!\n"))(tokenStartCol, (os_9, p_15) => {
                                outputPos(os_9, p_15);
                              }, $var43[1]);
                            }

                            this.popCtxt();
                            return reprocess();

                          case 1:
                            const $var44 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 25 ? matchValue_5[1].head.data[0].tag === 1 ? (offsidePos_26 = matchValue_5[1].head.data[1], addBlockEnd_2 = matchValue_5[1].head.data[2], token.tag === 54 ? true : false) ? [0, matchValue_5[1].head.data[2], matchValue_5[1].head.data[1]] : [1] : [1] : [1] : [1];

                            switch ($var44[0]) {
                              case 0:
                                ((p_16, ctxt_7) => {
                                  this.replaceCtxt(p_16, ctxt_7);
                                })(tokenTup, new Context(25, [new FirstInSequence(0), $var44[2], $var44[1]]));

                                return reprocessWithoutBlockRule();

                              case 1:
                                const $var45 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 25 ? matchValue_5[1].head.data[0].tag === 0 ? (offsidePos_25 = matchValue_5[1].head.data[1], addBlockEnd_1 = matchValue_5[1].head.data[2], useBlockRule) ? [0, matchValue_5[1].head.data[2], matchValue_5[1].head.data[1]] : [1] : [1] : [1] : [1];

                                switch ($var45[0]) {
                                  case 0:
                                    if (debug) {
                                      dprintf(printf("repull for CtxtSeqBlockStart\n"));
                                    }

                                    ((p_17, ctxt_8) => {
                                      this.replaceCtxt(p_17, ctxt_8);
                                    })(tokenTup, new Context(25, [new FirstInSequence(1), $var45[2], $var45[1]]));

                                    return reprocessWithoutBlockRule();

                                  case 1:
                                    const $var46 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 25 ? matchValue_5[1].head.data[0].tag === 1 ? (rest = matchValue_5[1].tail, offsidePos_24 = matchValue_5[1].head.data[1], addBlockEnd = matchValue_5[1].head.data[2], ((useBlockRule ? !(isTypeCtxt = (() => {
                                      const $var83 = rest.tail != null ? rest.head.tag === 16 ? [0] : [1] : [1];

                                      switch ($var83[0]) {
                                        case 0:
                                          return true;

                                        case 1:
                                          return false;
                                      }
                                    })(), isNamespaceCtxt = (() => {
                                      const $var84 = rest.tail != null ? rest.head.tag === 22 ? [0] : [1] : [1];

                                      switch ($var84[0]) {
                                        case 0:
                                          return true;

                                        case 1:
                                          return false;
                                      }
                                    })(), isNamespaceCtxt ? token.tag === 149 ? true : false : isTypeCtxt ? isTypeSeqBlockElementContinuator(token) : isSeqBlockElementContinuator(token)) : false) ? tokenStartCol === offsidePos_24.Column : false) ? tokenStartPos.OriginalLine !== offsidePos_24.OriginalLine : false) ? [0, matchValue_5[1].head.data[2], matchValue_5[1].head.data[1], matchValue_5[1].tail] : [1] : [1] : [1] : [1];

                                    switch ($var46[0]) {
                                      case 0:
                                        if (debug) {
                                          dprintf(printf("offside at column %d matches start of block(%a)! delaying token, returning OBLOCKSEP\n"))(tokenStartCol, (os_10, p_18) => {
                                            outputPos(os_10, p_18);
                                          }, $var46[2]);
                                        }

                                        ((p_19, ctxt_9) => {
                                          this.replaceCtxt(p_19, ctxt_9);
                                        })(tokenTup, new Context(25, [new FirstInSequence(0), $var46[2], $var46[1]]));

                                        return insertTokenFromPrevPosToCurrentPos(new token_3(21));

                                      case 1:
                                        const $var47 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 0 ? matchValue_5[1].head.data[0] ? (offsidePos_23 = matchValue_5[1].head.data[1], isSemiSemi ? true : (isLetContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_23.Column) ? [0, matchValue_5[1].head.data[1]] : [1] : [1] : [1] : [1];

                                        switch ($var47[0]) {
                                          case 0:
                                            if (debug) {
                                              dprintf(printf("token at column %d is offside from LET(offsidePos=%a)! delaying token, returning ODECLEND\n"))(tokenStartCol, (os_11, p_20) => {
                                                outputPos(os_11, p_20);
                                              }, $var47[1]);
                                            }

                                            this.popCtxt();
                                            return insertToken(new token_3(19));

                                          case 1:
                                            const $var48 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 14 ? (offsidePos_22 = matchValue_5[1].head.data, isSemiSemi ? true : (isDoContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_22.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                            switch ($var48[0]) {
                                              case 0:
                                                if (debug) {
                                                  dprintf(printf("token at column %d is offside from DO(offsidePos=%a)! delaying token, returning ODECLEND\n"))(tokenStartCol, (os_12, p_21) => {
                                                    outputPos(os_12, p_21);
                                                  }, $var48[1]);
                                                }

                                                this.popCtxt();
                                                return insertToken(new token_3(19));

                                              case 1:
                                                const $var49 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 15 ? (offsidePos_21 = matchValue_5[1].head.data, isSemiSemi ? true : (isInterfaceContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_21.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                switch ($var49[0]) {
                                                  case 0:
                                                    if (debug) {
                                                      dprintf(printf("token at column %d is offside from INTERFACE(offsidePos=%a)! pop and reprocess\n"))(tokenStartCol, (os_13, p_22) => {
                                                        outputPos(os_13, p_22);
                                                      }, $var49[1]);
                                                    }

                                                    this.popCtxt();
                                                    return reprocess();

                                                  case 1:
                                                    const $var50 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 16 ? (offsidePos_20 = matchValue_5[1].head.data, isSemiSemi ? true : (isTypeContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_20.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                    switch ($var50[0]) {
                                                      case 0:
                                                        if (debug) {
                                                          dprintf(printf("token at column %d is offside from TYPE(offsidePos=%a)! pop and reprocess\n"))(tokenStartCol, (os_14, p_23) => {
                                                            outputPos(os_14, p_23);
                                                          }, $var50[1]);
                                                        }

                                                        this.popCtxt();
                                                        return reprocess();

                                                      case 1:
                                                        const $var51 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 21 ? (wholeFile = matchValue_5[1].head.data[1], offsidePos_19 = matchValue_5[1].head.data[0], (isSemiSemi ? !wholeFile : false) ? true : tokenStartCol <= offsidePos_19.Column) ? [0, matchValue_5[1].head.data[0], matchValue_5[1].head.data[1]] : [1] : [1] : [1];

                                                        switch ($var51[0]) {
                                                          case 0:
                                                            if (debug) {
                                                              dprintf(printf("token at column %d is offside from MODULE with offsidePos %a! delaying token\n"))(tokenStartCol, (os_15, p_24) => {
                                                                outputPos(os_15, p_24);
                                                              }, $var51[1]);
                                                            }

                                                            this.popCtxt();
                                                            return reprocess();

                                                          case 1:
                                                            const $var52 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 22 ? (offsidePos_18 = matchValue_5[1].head.data, (isNamespaceContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_18.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                            switch ($var52[0]) {
                                                              case 0:
                                                                if (debug) {
                                                                  dprintf(printf("token at column %d is offside from NAMESPACE with offsidePos %a! delaying token\n"))(tokenStartCol, (os_16, p_25) => {
                                                                    outputPos(os_16, p_25);
                                                                  }, $var52[1]);
                                                                }

                                                                this.popCtxt();
                                                                return reprocess();

                                                              case 1:
                                                                const $var53 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 23 ? (offsidePos_17 = matchValue_5[1].head.data, isSemiSemi ? true : tokenStartCol <= offsidePos_17.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                switch ($var53[0]) {
                                                                  case 0:
                                                                    if (debug) {
                                                                      dprintf(printf("token at column %d is offside from EXCEPTION with offsidePos %a! delaying token\n"))(tokenStartCol, (os_17, p_26) => {
                                                                        outputPos(os_17, p_26);
                                                                      }, $var53[1]);
                                                                    }

                                                                    this.popCtxt();
                                                                    return reprocess();

                                                                  case 1:
                                                                    const $var54 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 20 ? (offsidePos_16 = matchValue_5[1].head.data, isSemiSemi ? true : tokenStartCol <= offsidePos_16.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                    switch ($var54[0]) {
                                                                      case 0:
                                                                        if (debug) {
                                                                          dprintf(printf("token at column %d is offside from MEMBER/OVERRIDE head with offsidePos %a!\n"))(tokenStartCol, (os_18, p_27) => {
                                                                            outputPos(os_18, p_27);
                                                                          }, $var54[1]);
                                                                        }

                                                                        this.popCtxt();
                                                                        return insertToken(new token_3(19));

                                                                      case 1:
                                                                        const $var55 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 19 ? (offsidePos_15 = matchValue_5[1].head.data, isSemiSemi ? true : tokenStartCol <= offsidePos_15.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                        switch ($var55[0]) {
                                                                          case 0:
                                                                            if (debug) {
                                                                              dprintf(printf("token at column %d is offside from MEMBER/OVERRIDE head with offsidePos %a!\n"))(tokenStartCol, (os_19, p_28) => {
                                                                                outputPos(os_19, p_28);
                                                                              }, $var55[1]);
                                                                            }

                                                                            this.popCtxt();
                                                                            return reprocess();

                                                                          case 1:
                                                                            const $var56 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 1 ? (offsidePos_14 = matchValue_5[1].head.data, isSemiSemi ? true : (isIfBlockContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_14.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                            switch ($var56[0]) {
                                                                              case 0:
                                                                                if (debug) {
                                                                                  dprintf(printf("offside from CtxtIf\n"));
                                                                                }

                                                                                this.popCtxt();
                                                                                return reprocess();

                                                                              case 1:
                                                                                const $var57 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 5 ? (offsidePos_13 = matchValue_5[1].head.data, isSemiSemi ? true : (isLetContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_13.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                switch ($var57[0]) {
                                                                                  case 0:
                                                                                    if (debug) {
                                                                                      dprintf(printf("offside from CtxtWithAsLet\n"));
                                                                                    }

                                                                                    this.popCtxt();
                                                                                    return insertToken(new token_3(20));

                                                                                  case 1:
                                                                                    const $var58 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 6 ? (offsidePos_12 = matchValue_5[1].head.data, isSemiSemi ? true : (isWithAugmentBlockContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_12.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                    switch ($var58[0]) {
                                                                                      case 0:
                                                                                        if (debug) {
                                                                                          dprintf(printf("offside from CtxtWithAsAugment, isWithAugmentBlockContinuator = %b\n"))(isWithAugmentBlockContinuator(token));
                                                                                        }

                                                                                        this.popCtxt();
                                                                                        return insertToken(new token_3(19));

                                                                                      case 1:
                                                                                        const $var59 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 7 ? (offsidePos_11 = matchValue_5[1].head.data, isSemiSemi ? true : tokenStartCol <= offsidePos_11.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                        switch ($var59[0]) {
                                                                                          case 0:
                                                                                            if (debug) {
                                                                                              dprintf(printf("offside from CtxtMatch\n"));
                                                                                            }

                                                                                            this.popCtxt();
                                                                                            return reprocess();

                                                                                          case 1:
                                                                                            const $var60 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 8 ? (offsidePos_10 = matchValue_5[1].head.data, isSemiSemi ? true : (isForLoopContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_10.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                            switch ($var60[0]) {
                                                                                              case 0:
                                                                                                if (debug) {
                                                                                                  dprintf(printf("offside from CtxtFor\n"));
                                                                                                }

                                                                                                this.popCtxt();
                                                                                                return reprocess();

                                                                                              case 1:
                                                                                                const $var61 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 9 ? (offsidePos_9 = matchValue_5[1].head.data, isSemiSemi ? true : (isWhileBlockContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_9.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                                switch ($var61[0]) {
                                                                                                  case 0:
                                                                                                    if (debug) {
                                                                                                      dprintf(printf("offside from CtxtWhile\n"));
                                                                                                    }

                                                                                                    this.popCtxt();
                                                                                                    return reprocess();

                                                                                                  case 1:
                                                                                                    const $var62 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 10 ? (offsidePos_8 = matchValue_5[1].head.data, isSemiSemi ? true : tokenStartCol <= offsidePos_8.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                                    switch ($var62[0]) {
                                                                                                      case 0:
                                                                                                        if (debug) {
                                                                                                          dprintf(printf("offside from CtxtWhen\n"));
                                                                                                        }

                                                                                                        this.popCtxt();
                                                                                                        return reprocess();

                                                                                                      case 1:
                                                                                                        const $var63 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 3 ? (offsidePos_7 = matchValue_5[1].head.data, isSemiSemi ? true : tokenStartCol <= offsidePos_7.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                                        switch ($var63[0]) {
                                                                                                          case 0:
                                                                                                            if (debug) {
                                                                                                              dprintf(printf("offside from CtxtFun\n"));
                                                                                                            }

                                                                                                            this.popCtxt();
                                                                                                            return insertToken(new token_3(20));

                                                                                                          case 1:
                                                                                                            const $var64 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 4 ? (offsidePos_6 = matchValue_5[1].head.data, isSemiSemi ? true : tokenStartCol <= offsidePos_6.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                                            switch ($var64[0]) {
                                                                                                              case 0:
                                                                                                                this.popCtxt();
                                                                                                                return reprocess();

                                                                                                              case 1:
                                                                                                                const $var65 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 2 ? (offsidePos_5 = matchValue_5[1].head.data, isSemiSemi ? true : (isTryBlockContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_5.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                                                switch ($var65[0]) {
                                                                                                                  case 0:
                                                                                                                    if (debug) {
                                                                                                                      dprintf(printf("offside from CtxtTry\n"));
                                                                                                                    }

                                                                                                                    this.popCtxt();
                                                                                                                    return reprocess();

                                                                                                                  case 1:
                                                                                                                    const $var66 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 12 ? (offsidePos_4 = matchValue_5[1].head.data, isSemiSemi ? true : (isThenBlockContinuator(token) ? tokenStartCol + 1 : tokenStartCol) <= offsidePos_4.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                                                    switch ($var66[0]) {
                                                                                                                      case 0:
                                                                                                                        if (debug) {
                                                                                                                          dprintf(printf("offside from CtxtThen, popping\n"));
                                                                                                                        }

                                                                                                                        this.popCtxt();
                                                                                                                        return reprocess();

                                                                                                                      case 1:
                                                                                                                        const $var67 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 13 ? (offsidePos_3 = matchValue_5[1].head.data, isSemiSemi ? true : tokenStartCol <= offsidePos_3.Column) ? [0, matchValue_5[1].head.data] : [1] : [1] : [1];

                                                                                                                        switch ($var67[0]) {
                                                                                                                          case 0:
                                                                                                                            if (debug) {
                                                                                                                              dprintf(printf("offside from CtxtElse, popping\n"));
                                                                                                                            }

                                                                                                                            this.popCtxt();
                                                                                                                            return reprocess();

                                                                                                                          case 1:
                                                                                                                            const $var68 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 26 ? (() => {
                                                                                                                              var copyOfStruct_7;
                                                                                                                              const offsidePos_2 = matchValue_5[1].head.data[1];
                                                                                                                              const leadingBar_2 = matchValue_5[1].head.data[0];

                                                                                                                              if (isSemiSemi) {
                                                                                                                                return true;
                                                                                                                              } else if (token.tag === 57) {
                                                                                                                                const cond1 = tokenStartCol + (leadingBar_2 ? 0 : 2) < offsidePos_2.Column;
                                                                                                                                const cond2 = tokenStartCol + (leadingBar_2 ? 1 : 2) < offsidePos_2.Column;

                                                                                                                                if (cond1 !== cond2) {
                                                                                                                                  errorR(new IndentationProblem(SR.lexfltSeparatorTokensOfPatternMatchMisaligned(), mkSynRange((tokenTup_70 => this.startPosOfTokenTup(tokenTup_70))(tokenTup), (copyOfStruct_7 = tokenTup.LexbufState, copyOfStruct_7.EndPos))));
                                                                                                                                }

                                                                                                                                return cond1;
                                                                                                                              } else if (token.tag === 141) {
                                                                                                                                return tokenStartCol + (leadingBar_2 ? -1 : 1) < offsidePos_2.Column;
                                                                                                                              } else {
                                                                                                                                return tokenStartCol + (leadingBar_2 ? -1 : 1) < offsidePos_2.Column;
                                                                                                                              }
                                                                                                                            })() ? [0, matchValue_5[1].head.data[0], matchValue_5[1].head.data[1]] : [1] : [1] : [1];

                                                                                                                            switch ($var68[0]) {
                                                                                                                              case 0:
                                                                                                                                if (debug) {
                                                                                                                                  dprintf(printf("offside from WITH, tokenStartCol = %d, offsidePos = %a, delaying token, returning OEND\n"))(tokenStartCol, (os_20, p_29) => {
                                                                                                                                    outputPos(os_20, p_29);
                                                                                                                                  }, $var68[2]);
                                                                                                                                }

                                                                                                                                this.popCtxt();
                                                                                                                                return insertToken(new token_3(20));

                                                                                                                              case 1:
                                                                                                                                const $var69 = matchValue_5[0].tag === 149 ? matchValue_5[1].tail != null ? [0] : [4] : matchValue_5[0].tag === 148 ? matchValue_5[1].tail != null ? [1] : [4] : matchValue_5[0].tag === 120 ? matchValue_5[1].tail != null ? [2] : [4] : matchValue_5[0].tag === 160 ? matchValue_5[1].tail != null ? (isUse = matchValue_5[0].data, ctxt_18 = matchValue_5[1].head, ctxt_18.tag === 19 ? true : false) ? [3, matchValue_5[1].head, matchValue_5[0].data] : [4] : [4] : [4];

                                                                                                                                switch ($var69[0]) {
                                                                                                                                  case 0:
                                                                                                                                    if (debug) {
                                                                                                                                      dprintf(printf("NAMESPACE: entering CtxtNamespaceHead, awaiting end of long identifier to push CtxtSeqBlock\n"));
                                                                                                                                    }

                                                                                                                                    ((tokenTup_27, newCtxt_3) => {
                                                                                                                                      this.pushCtxt(tokenTup_27, newCtxt_3);
                                                                                                                                    })(tokenTup, new Context(17, [tokenStartPos, token]));

                                                                                                                                    return this.returnToken(tokenLexbufState, token);

                                                                                                                                  case 1:
                                                                                                                                    insertComingSoonTokens(["MODULE", new token_3(38), new token_3(39)]);

                                                                                                                                    if (debug) {
                                                                                                                                      dprintf(printf("MODULE: entering CtxtModuleHead, awaiting EQUALS to go to CtxtSeqBlock (%a)\n"))((os_21, p_30) => {
                                                                                                                                        outputPos(os_21, p_30);
                                                                                                                                      }, tokenStartPos);
                                                                                                                                    }

                                                                                                                                    ((tokenTup_28, newCtxt_4) => {
                                                                                                                                      this.pushCtxt(tokenTup_28, newCtxt_4);
                                                                                                                                    })(tokenTup, new Context(18, [tokenStartPos, token]));

                                                                                                                                    return (useBlockRule_8 => this.hwTokenFetch(useBlockRule_8))(useBlockRule);

                                                                                                                                  case 2:
                                                                                                                                    if (debug) {
                                                                                                                                      dprintf(printf("EXCEPTION: entering CtxtException(%a)\n"))((os_22, p_31) => {
                                                                                                                                        outputPos(os_22, p_31);
                                                                                                                                      }, tokenStartPos);
                                                                                                                                    }

                                                                                                                                    ((tokenTup_29, newCtxt_5) => {
                                                                                                                                      this.pushCtxt(tokenTup_29, newCtxt_5);
                                                                                                                                    })(tokenTup, new Context(23, tokenStartPos));

                                                                                                                                    return this.returnToken(tokenLexbufState, token);

                                                                                                                                  case 3:
                                                                                                                                    if (debug) {
                                                                                                                                      dprintf(printf("LET: entering CtxtLetDecl(), awaiting EQUALS to go to CtxtSeqBlock (%a)\n"))((os_23, p_32) => {
                                                                                                                                        outputPos(os_23, p_32);
                                                                                                                                      }, tokenStartPos);
                                                                                                                                    }

                                                                                                                                    const startPos = $var69[1].tag === 19 ? $var69[1].data : tokenStartPos;
                                                                                                                                    this.popCtxt();

                                                                                                                                    ((tokenTup_30, newCtxt_6) => {
                                                                                                                                      this.pushCtxt(tokenTup_30, newCtxt_6);
                                                                                                                                    })(tokenTup, new Context(0, [true, startPos]));

                                                                                                                                    const tok_6 = new token_3(32, $var69[2]);
                                                                                                                                    return this.returnToken(tokenLexbufState, tok_6);

                                                                                                                                  case 4:
                                                                                                                                    const $var70 = matchValue_5[0].tag === 160 ? matchValue_5[1].tail != null ? [0, matchValue_5[1].head, matchValue_5[0].data] : [3] : matchValue_5[0].tag === 157 ? matchValue_5[1].tail != null ? [1, matchValue_5[0].data, matchValue_5[1].head] : [3] : matchValue_5[0].tag === 109 ? thereIsACtxtMemberBodyOnTheStackAndWeShouldPopStackForUpcomingMember(matchValue_5[1]) ? [2, matchValue_5[1]] : [3] : matchValue_5[0].tag === 46 ? thereIsACtxtMemberBodyOnTheStackAndWeShouldPopStackForUpcomingMember(matchValue_5[1]) ? [2, matchValue_5[1]] : [3] : matchValue_5[0].tag === 49 ? thereIsACtxtMemberBodyOnTheStackAndWeShouldPopStackForUpcomingMember(matchValue_5[1]) ? [2, matchValue_5[1]] : [3] : matchValue_5[0].tag === 47 ? thereIsACtxtMemberBodyOnTheStackAndWeShouldPopStackForUpcomingMember(matchValue_5[1]) ? [2, matchValue_5[1]] : [3] : matchValue_5[0].tag === 50 ? thereIsACtxtMemberBodyOnTheStackAndWeShouldPopStackForUpcomingMember(matchValue_5[1]) ? [2, matchValue_5[1]] : [3] : matchValue_5[0].tag === 51 ? thereIsACtxtMemberBodyOnTheStackAndWeShouldPopStackForUpcomingMember(matchValue_5[1]) ? [2, matchValue_5[1]] : [3] : [3];

                                                                                                                                    switch ($var70[0]) {
                                                                                                                                      case 0:
                                                                                                                                        const blockLet = $var70[1].tag === 25 ? true : $var70[1].tag === 26 ? true : false;

                                                                                                                                        if (debug) {
                                                                                                                                          dprintf(printf("LET: entering CtxtLetDecl(blockLet=%b), awaiting EQUALS to go to CtxtSeqBlock (%a)\n"))(blockLet, (os_24, p_33) => {
                                                                                                                                            outputPos(os_24, p_33);
                                                                                                                                          }, tokenStartPos);
                                                                                                                                        }

                                                                                                                                        ((tokenTup_31, newCtxt_7) => {
                                                                                                                                          this.pushCtxt(tokenTup_31, newCtxt_7);
                                                                                                                                        })(tokenTup, new Context(0, [blockLet, tokenStartPos]));

                                                                                                                                        const tok_7 = blockLet ? new token_3(32, $var70[2]) : token;
                                                                                                                                        return this.returnToken(tokenLexbufState, tok_7);

                                                                                                                                      case 1:
                                                                                                                                        const blockLet_1 = $var70[2].tag === 25 ? true : false;

                                                                                                                                        if (debug) {
                                                                                                                                          dprintf(printf("LET: entering CtxtLetDecl(blockLet=%b), awaiting EQUALS to go to CtxtSeqBlock (%a)\n"))(blockLet_1, (os_25, p_34) => {
                                                                                                                                            outputPos(os_25, p_34);
                                                                                                                                          }, tokenStartPos);
                                                                                                                                        }

                                                                                                                                        ((tokenTup_32, newCtxt_8) => {
                                                                                                                                          this.pushCtxt(tokenTup_32, newCtxt_8);
                                                                                                                                        })(tokenTup, new Context(0, [blockLet_1, tokenStartPos]));

                                                                                                                                        const tok_8 = blockLet_1 ? new token_3(31, $var70[1]) : token;
                                                                                                                                        return this.returnToken(tokenLexbufState, tok_8);

                                                                                                                                      case 2:
                                                                                                                                        if (debug) {
                                                                                                                                          dprintf(printf("STATIC/MEMBER/OVERRIDE/DEFAULT: already inside CtxtMemberBody, popping all that context before starting next member...\n"));
                                                                                                                                        }

                                                                                                                                        (tokenTup_33 => {
                                                                                                                                          this.delayTokenNoProcessing(tokenTup_33);
                                                                                                                                        })(tokenTup);

                                                                                                                                        while (matchValue_11 = this.offsideStack.head, matchValue_11.tag === 20 ? false : true) {
                                                                                                                                          const matchValue_12 = endTokenForACtxt(this.offsideStack.head);

                                                                                                                                          if (matchValue_12 != null) {
                                                                                                                                            this.popCtxt();

                                                                                                                                            if (debug) {
                                                                                                                                              dprintf(printf("--> inserting %+A\n"))(getValue(matchValue_12));
                                                                                                                                            }

                                                                                                                                            (tokenTup_34 => {
                                                                                                                                              this.delayTokenNoProcessing(tokenTup_34);
                                                                                                                                            })(tokenTup.UseLocation(getValue(matchValue_12)));
                                                                                                                                          } else {
                                                                                                                                            this.popCtxt();
                                                                                                                                          }
                                                                                                                                        }

                                                                                                                                        this.popCtxt();

                                                                                                                                        if (debug) {
                                                                                                                                          dprintf(printf("...STATIC/MEMBER/OVERRIDE/DEFAULT: finished popping all that context\n"));
                                                                                                                                        }

                                                                                                                                        return (useBlockRule_9 => this.hwTokenFetch(useBlockRule_9))(useBlockRule);

                                                                                                                                      case 3:
                                                                                                                                        const $var71 = matchValue_5[0].tag === 109 ? matchValue_5[1].tail != null ? (ctxt_12 = matchValue_5[1].head, ctxt_12.tag === 19 ? false : true) ? [0, matchValue_5[1].head] : [1] : [1] : matchValue_5[0].tag === 46 ? matchValue_5[1].tail != null ? (ctxt_13 = matchValue_5[1].head, ctxt_13.tag === 19 ? false : true) ? [0, matchValue_5[1].head] : [1] : [1] : matchValue_5[0].tag === 49 ? matchValue_5[1].tail != null ? (ctxt_14 = matchValue_5[1].head, ctxt_14.tag === 19 ? false : true) ? [0, matchValue_5[1].head] : [1] : [1] : matchValue_5[0].tag === 47 ? matchValue_5[1].tail != null ? (ctxt_15 = matchValue_5[1].head, ctxt_15.tag === 19 ? false : true) ? [0, matchValue_5[1].head] : [1] : [1] : matchValue_5[0].tag === 50 ? matchValue_5[1].tail != null ? (ctxt_16 = matchValue_5[1].head, ctxt_16.tag === 19 ? false : true) ? [0, matchValue_5[1].head] : [1] : [1] : matchValue_5[0].tag === 51 ? matchValue_5[1].tail != null ? (ctxt_17 = matchValue_5[1].head, ctxt_17.tag === 19 ? false : true) ? [0, matchValue_5[1].head] : [1] : [1] : [1];

                                                                                                                                        switch ($var71[0]) {
                                                                                                                                          case 0:
                                                                                                                                            if (debug) {
                                                                                                                                              dprintf(printf("STATIC/MEMBER/OVERRIDE/DEFAULT: entering CtxtMemberHead, awaiting EQUALS to go to CtxtSeqBlock (%a)\n"))((os_26, p_35) => {
                                                                                                                                                outputPos(os_26, p_35);
                                                                                                                                              }, tokenStartPos);
                                                                                                                                            }

                                                                                                                                            ((tokenTup_35, newCtxt_9) => {
                                                                                                                                              this.pushCtxt(tokenTup_35, newCtxt_9);
                                                                                                                                            })(tokenTup, new Context(19, tokenStartPos));

                                                                                                                                            return this.returnToken(tokenLexbufState, token);

                                                                                                                                          case 1:
                                                                                                                                            const $var72 = matchValue_5[0].tag === 42 ? matchValue_5[1].tail != null ? (_ctxt = matchValue_5[1].head, matchValue_20 = this.peekNextToken(), matchValue_20.tag === 118 ? true : false) ? [0, matchValue_5[1].head] : [1] : [1] : matchValue_5[0].tag === 43 ? matchValue_5[1].tail != null ? (_ctxt_1 = matchValue_5[1].head, matchValue_21 = this.peekNextToken(), matchValue_21.tag === 118 ? true : false) ? [0, matchValue_5[1].head] : [1] : [1] : matchValue_5[0].tag === 44 ? matchValue_5[1].tail != null ? (_ctxt_2 = matchValue_5[1].head, matchValue_22 = this.peekNextToken(), matchValue_22.tag === 118 ? true : false) ? [0, matchValue_5[1].head] : [1] : [1] : [1];

                                                                                                                                            switch ($var72[0]) {
                                                                                                                                              case 0:
                                                                                                                                                if (debug) {
                                                                                                                                                  dprintf(printf("PUBLIC/PRIVATE/INTERNAL NEW: entering CtxtMemberHead, awaiting EQUALS to go to CtxtSeqBlock (%a)\n"))((os_27, p_36) => {
                                                                                                                                                    outputPos(os_27, p_36);
                                                                                                                                                  }, tokenStartPos);
                                                                                                                                                }

                                                                                                                                                ((tokenTup_36, newCtxt_10) => {
                                                                                                                                                  this.pushCtxt(tokenTup_36, newCtxt_10);
                                                                                                                                                })(tokenTup, new Context(19, tokenStartPos));

                                                                                                                                                return this.returnToken(tokenLexbufState, token);

                                                                                                                                              case 1:
                                                                                                                                                const $var73 = matchValue_5[0].tag === 118 ? matchValue_5[1].tail != null ? (ctxt_11 = matchValue_5[1].head, (matchValue_19 = this.peekNextToken(), matchValue_19.tag === 92 ? true : false) ? ctxt_11.tag === 19 ? false : true : false) ? [0, matchValue_5[1].head] : [1] : [1] : [1];

                                                                                                                                                switch ($var73[0]) {
                                                                                                                                                  case 0:
                                                                                                                                                    if (debug) {
                                                                                                                                                      dprintf(printf("NEW: entering CtxtMemberHead, awaiting EQUALS to go to CtxtSeqBlock (%a)\n"))((os_28, p_37) => {
                                                                                                                                                        outputPos(os_28, p_37);
                                                                                                                                                      }, tokenStartPos);
                                                                                                                                                    }

                                                                                                                                                    ((tokenTup_37, newCtxt_11) => {
                                                                                                                                                      this.pushCtxt(tokenTup_37, newCtxt_11);
                                                                                                                                                    })(tokenTup, new Context(19, tokenStartPos));

                                                                                                                                                    return this.returnToken(tokenLexbufState, token);

                                                                                                                                                  case 1:
                                                                                                                                                    const $var74 = matchValue_5[0].tag === 70 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 0 ? [0] : matchValue_5[1].head.tag === 16 ? [1] : matchValue_5[1].head.tag === 5 ? [3] : matchValue_5[1].head.tag === 11 ? matchValue_5[1].head.data[1] ? matchValue_5[1].tail.tail != null ? matchValue_5[1].tail.head.tag === 25 ? matchValue_5[1].tail.tail.tail != null ? matchValue_5[1].tail.tail.head.tag === 5 ? [3] : matchValue_5[1].tail.tail.head.tag === 24 ? matchValue_5[1].tail.tail.head.data[0].tag === 74 ? [3] : [7] : [7] : [7] : [7] : [7] : [7] : matchValue_5[1].head.tag === 19 ? [4, matchValue_5[1].head.data] : [7] : [7] : matchValue_5[0].tag === 114 ? [2] : matchValue_5[0].tag === 132 ? [2] : matchValue_5[0].tag === 135 ? [5] : matchValue_5[0].tag === 92 ? [5] : matchValue_5[0].tag === 56 ? [5] : matchValue_5[0].tag === 74 ? [5] : matchValue_5[0].tag === 71 ? [5] : matchValue_5[0].tag === 72 ? [5] : matchValue_5[0].tag === 153 ? [5] : matchValue_5[0].tag === 158 ? matchValue_5[0].data ? [5] : [7] : matchValue_5[0].tag === 55 ? (() => {
                                                                                                                                                      const $var82 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 25 ? matchValue_5[1].tail.tail != null ? matchValue_5[1].tail.head.tag === 21 ? [0] : matchValue_5[1].tail.head.tag === 16 ? [0] : [1] : [1] : [1] : [1];

                                                                                                                                                      switch ($var82[0]) {
                                                                                                                                                        case 0:
                                                                                                                                                          return true;

                                                                                                                                                        case 1:
                                                                                                                                                          return false;
                                                                                                                                                      }
                                                                                                                                                    })() ? [6, matchValue_5[1]] : [7] : [7];

                                                                                                                                                    switch ($var74[0]) {
                                                                                                                                                      case 0:
                                                                                                                                                        if (debug) {
                                                                                                                                                          dprintf(printf("CtxtLetDecl: EQUALS, pushing CtxtSeqBlock\n"));
                                                                                                                                                        }

                                                                                                                                                        (tupledArg_4 => {
                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_4[0], tupledArg_4[1]);
                                                                                                                                                        })([true, new AddBlockEnd(0)]);

                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                      case 1:
                                                                                                                                                        if (debug) {
                                                                                                                                                          dprintf(printf("CtxType: EQUALS, pushing CtxtSeqBlock\n"));
                                                                                                                                                        }

                                                                                                                                                        (tupledArg_5 => {
                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_5[0], tupledArg_5[1]);
                                                                                                                                                        })([true, new AddBlockEnd(0)]);

                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                      case 2:
                                                                                                                                                        if (isControlFlowOrNotSameLine()) {
                                                                                                                                                          if (debug) {
                                                                                                                                                            dprintf(printf("LAZY/ASSERT, pushing CtxtSeqBlock\n"));
                                                                                                                                                          }

                                                                                                                                                          (tupledArg_6 => {
                                                                                                                                                            this.pushCtxtSeqBlock(tupledArg_6[0], tupledArg_6[1]);
                                                                                                                                                          })([true, new AddBlockEnd(0)]);

                                                                                                                                                          const tok_9 = token.tag === 114 ? new token_3(115) : new token_3(133);
                                                                                                                                                          return this.returnToken(tokenLexbufState, tok_9);
                                                                                                                                                        } else {
                                                                                                                                                          return this.returnToken(tokenLexbufState, token);
                                                                                                                                                        }

                                                                                                                                                      case 3:
                                                                                                                                                        if (debug) {
                                                                                                                                                          dprintf(printf("CtxtLetDecl/CtxtWithAsLet: EQUALS, pushing CtxtSeqBlock\n"));
                                                                                                                                                        }

                                                                                                                                                        if (isControlFlowOrNotSameLine()) {
                                                                                                                                                          (tupledArg_7 => {
                                                                                                                                                            this.pushCtxtSeqBlock(tupledArg_7[0], tupledArg_7[1]);
                                                                                                                                                          })([true, new AddBlockEnd(0)]);
                                                                                                                                                        } else {
                                                                                                                                                          (tupledArg_8 => {
                                                                                                                                                            this.pushCtxtSeqBlock(tupledArg_8[0], tupledArg_8[1]);
                                                                                                                                                          })([false, new AddBlockEnd(1)]);
                                                                                                                                                        }

                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                      case 4:
                                                                                                                                                        if (debug) {
                                                                                                                                                          dprintf(printf("CtxtMemberHead: EQUALS, pushing CtxtSeqBlock\n"));
                                                                                                                                                        }

                                                                                                                                                        ((p_38, ctxt_10) => {
                                                                                                                                                          this.replaceCtxt(p_38, ctxt_10);
                                                                                                                                                        })(tokenTup, new Context(20, $var74[1]));

                                                                                                                                                        (tupledArg_9 => {
                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_9[0], tupledArg_9[1]);
                                                                                                                                                        })([true, new AddBlockEnd(0)]);

                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                      case 5:
                                                                                                                                                        if (debug) {
                                                                                                                                                          dprintf(printf("LPAREN etc., pushes CtxtParen, pushing CtxtSeqBlock, tokenStartPos = %a\n"))((os_29, p_39) => {
                                                                                                                                                            outputPos(os_29, p_39);
                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                        }

                                                                                                                                                        ((tokenTup_38, newCtxt_12) => {
                                                                                                                                                          this.pushCtxt(tokenTup_38, newCtxt_12);
                                                                                                                                                        })(tokenTup, new Context(24, [token, tokenStartPos]));

                                                                                                                                                        (tupledArg_10 => {
                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_10[0], tupledArg_10[1]);
                                                                                                                                                        })([false, new AddBlockEnd(1)]);

                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                      case 6:
                                                                                                                                                        if (debug) {
                                                                                                                                                          dprintf(printf("LPAREN etc., pushes CtxtParen, pushing CtxtSeqBlock, tokenStartPos = %a\n"))((os_30, p_40) => {
                                                                                                                                                            outputPos(os_30, p_40);
                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                        }

                                                                                                                                                        ((tokenTup_39, newCtxt_13) => {
                                                                                                                                                          this.pushCtxt(tokenTup_39, newCtxt_13);
                                                                                                                                                        })(tokenTup, new Context(24, [token, tokenStartPos]));

                                                                                                                                                        (tupledArg_11 => {
                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_11[0], tupledArg_11[1]);
                                                                                                                                                        })([false, new AddBlockEnd(1)]);

                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                      case 7:
                                                                                                                                                        const $var75 = matchValue_5[0].tag === 98 ? (() => {
                                                                                                                                                          const $var81 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 9 ? [0] : matchValue_5[1].head.tag === 8 ? [0] : matchValue_5[1].head.tag === 10 ? [0] : matchValue_5[1].head.tag === 26 ? [0] : matchValue_5[1].head.tag === 3 ? [0] : matchValue_5[1].head.tag === 25 ? matchValue_5[1].tail.tail != null ? matchValue_5[1].tail.head.tag === 24 ? matchValue_5[1].tail.head.data[0].tag === 71 ? [1] : matchValue_5[1].tail.head.data[0].tag === 74 ? [1] : matchValue_5[1].tail.head.data[0].tag === 72 ? [1] : [3] : matchValue_5[1].tail.head.tag === 14 ? [2] : matchValue_5[1].tail.head.tag === 9 ? [2] : matchValue_5[1].tail.head.tag === 8 ? [2] : matchValue_5[1].tail.head.tag === 10 ? [2] : matchValue_5[1].tail.head.tag === 26 ? [2] : matchValue_5[1].tail.head.tag === 2 ? [2] : matchValue_5[1].tail.head.tag === 12 ? [2] : matchValue_5[1].tail.head.tag === 13 ? [2] : [3] : [3] : [3] : [3];

                                                                                                                                                          switch ($var81[0]) {
                                                                                                                                                            case 0:
                                                                                                                                                              return true;

                                                                                                                                                            case 1:
                                                                                                                                                              return true;

                                                                                                                                                            case 2:
                                                                                                                                                              return true;

                                                                                                                                                            case 3:
                                                                                                                                                              return false;
                                                                                                                                                          }
                                                                                                                                                        })() ? [0] : [1] : [1];

                                                                                                                                                        switch ($var75[0]) {
                                                                                                                                                          case 0:
                                                                                                                                                            if (debug) {
                                                                                                                                                              dprintf(printf("RARROW, pushing CtxtSeqBlock, tokenStartPos = %a\n"))((os_31, p_41) => {
                                                                                                                                                                outputPos(os_31, p_41);
                                                                                                                                                              }, tokenStartPos);
                                                                                                                                                            }

                                                                                                                                                            (tupledArg_12 => {
                                                                                                                                                              this.pushCtxtSeqBlock(tupledArg_12[0], tupledArg_12[1]);
                                                                                                                                                            })([false, new AddBlockEnd(2)]);

                                                                                                                                                            return this.returnToken(tokenLexbufState, token);

                                                                                                                                                          case 1:
                                                                                                                                                            const $var76 = matchValue_5[0].tag === 69 ? isControlFlowOrNotSameLine() ? [0] : [1] : [1];

                                                                                                                                                            switch ($var76[0]) {
                                                                                                                                                              case 0:
                                                                                                                                                                if (debug) {
                                                                                                                                                                  dprintf(printf("LARROW, pushing CtxtSeqBlock, tokenStartPos = %a\n"))((os_32, p_42) => {
                                                                                                                                                                    outputPos(os_32, p_42);
                                                                                                                                                                  }, tokenStartPos);
                                                                                                                                                                }

                                                                                                                                                                (tupledArg_13 => {
                                                                                                                                                                  this.pushCtxtSeqBlock(tupledArg_13[0], tupledArg_13[1]);
                                                                                                                                                                })([true, new AddBlockEnd(0)]);

                                                                                                                                                                return this.returnToken(tokenLexbufState, token);

                                                                                                                                                              case 1:
                                                                                                                                                                const $var77 = matchValue_5[0].tag === 136 ? [0] : matchValue_5[0].tag === 129 ? [0] : ((isInfix(token) ? !isSameLine() : false) ? (() => {
                                                                                                                                                                  const $var80 = matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 26 ? [0] : [1] : [1];

                                                                                                                                                                  switch ($var80[0]) {
                                                                                                                                                                    case 0:
                                                                                                                                                                      return false;

                                                                                                                                                                    case 1:
                                                                                                                                                                      return true;
                                                                                                                                                                  }
                                                                                                                                                                })() : false) ? [1] : [2];

                                                                                                                                                                switch ($var77[0]) {
                                                                                                                                                                  case 0:
                                                                                                                                                                    if (debug) {
                                                                                                                                                                      dprintf(printf("DO: pushing CtxtSeqBlock, tokenStartPos = %a\n"))((os_33, p_43) => {
                                                                                                                                                                        outputPos(os_33, p_43);
                                                                                                                                                                      }, tokenStartPos);
                                                                                                                                                                    }

                                                                                                                                                                    ((tokenTup_40, newCtxt_14) => {
                                                                                                                                                                      this.pushCtxt(tokenTup_40, newCtxt_14);
                                                                                                                                                                    })(tokenTup, new Context(14, tokenStartPos));

                                                                                                                                                                    (tupledArg_14 => {
                                                                                                                                                                      this.pushCtxtSeqBlock(tupledArg_14[0], tupledArg_14[1]);
                                                                                                                                                                    })([true, new AddBlockEnd(0)]);

                                                                                                                                                                    let tok_10;

                                                                                                                                                                    if (token.tag === 136) {
                                                                                                                                                                      tok_10 = new token_3(30);
                                                                                                                                                                    } else if (token.tag === 129) {
                                                                                                                                                                      tok_10 = new token_3(29);
                                                                                                                                                                    } else {
                                                                                                                                                                      throw new Error("unreachable");
                                                                                                                                                                    }

                                                                                                                                                                    return this.returnToken(tokenLexbufState, tok_10);

                                                                                                                                                                  case 1:
                                                                                                                                                                    if (debug) {
                                                                                                                                                                      dprintf(printf("(Infix etc.), pushing CtxtSeqBlock, tokenStartPos = %a\n"))((os_34, p_44) => {
                                                                                                                                                                        outputPos(os_34, p_44);
                                                                                                                                                                      }, tokenStartPos);
                                                                                                                                                                    }

                                                                                                                                                                    (tupledArg_15 => {
                                                                                                                                                                      this.pushCtxtSeqBlock(tupledArg_15[0], tupledArg_15[1]);
                                                                                                                                                                    })([false, new AddBlockEnd(1)]);

                                                                                                                                                                    return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                  case 2:
                                                                                                                                                                    const $var78 = matchValue_5[0].tag === 87 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 2 ? [0] : matchValue_5[1].head.tag === 7 ? [0] : matchValue_5[1].head.tag === 23 ? [2, matchValue_5[1].head] : matchValue_5[1].head.tag === 16 ? [2, matchValue_5[1].head] : matchValue_5[1].head.tag === 19 ? [2, matchValue_5[1].head] : matchValue_5[1].head.tag === 15 ? [2, matchValue_5[1].head] : matchValue_5[1].head.tag === 20 ? [2, matchValue_5[1].head] : matchValue_5[1].head.tag === 25 ? matchValue_5[1].tail.tail != null ? matchValue_5[1].tail.head.tag === 24 ? matchValue_5[1].tail.head.data[0].tag === 74 ? [2, matchValue_5[1].head] : [3, matchValue_5[1]] : [3, matchValue_5[1]] : [3, matchValue_5[1]] : [3, matchValue_5[1]] : [3, matchValue_5[1]] : matchValue_5[0].tag === 128 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 2 ? [1] : matchValue_5[1].head.tag === 25 ? [19] : [20] : [20] : matchValue_5[0].tag === 124 ? [4] : matchValue_5[0].tag === 104 ? [5] : matchValue_5[0].tag === 139 ? [6] : matchValue_5[0].tag === 140 ? [7] : matchValue_5[0].tag === 125 ? [7] : matchValue_5[0].tag === 116 ? [8] : matchValue_5[0].tag === 122 ? [9] : matchValue_5[0].tag === 86 ? [10] : matchValue_5[0].tag === 85 ? matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 25 ? [11] : [20] : [20] : matchValue_5[0].tag === 123 ? [12] : matchValue_5[0].tag === 111 ? [13] : matchValue_5[0].tag === 48 ? [14] : matchValue_5[0].tag === 108 ? [15] : matchValue_5[0].tag === 107 ? [16] : matchValue_5[0].tag === 22 ? [17] : matchValue_5[0].tag === 12 ? [18] : matchValue_5[1].tail != null ? matchValue_5[1].head.tag === 25 ? [19] : [20] : [20];

                                                                                                                                                                    switch ($var78[0]) {
                                                                                                                                                                      case 0:
                                                                                                                                                                        const lookaheadTokenTup = this.peekNextTokenTup();

                                                                                                                                                                        const lookaheadTokenStartPos = (tokenTup_41 => this.startPosOfTokenTup(tokenTup_41))(lookaheadTokenTup);

                                                                                                                                                                        let leadingBar;
                                                                                                                                                                        const matchValue_13 = this.peekNextToken();

                                                                                                                                                                        if (matchValue_13.tag === 57) {
                                                                                                                                                                          leadingBar = true;
                                                                                                                                                                        } else {
                                                                                                                                                                          leadingBar = false;
                                                                                                                                                                        }

                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("WITH, pushing CtxtMatchClauses, lookaheadTokenStartPos = %a, tokenStartPos = %a\n"))((os_35, p_45) => {
                                                                                                                                                                            outputPos(os_35, p_45);
                                                                                                                                                                          }, lookaheadTokenStartPos, (os_36, p_46) => {
                                                                                                                                                                            outputPos(os_36, p_46);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_42, newCtxt_15) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_42, newCtxt_15);
                                                                                                                                                                        })(lookaheadTokenTup, new Context(26, [leadingBar, lookaheadTokenStartPos]));

                                                                                                                                                                        const tok_11 = new token_3(26);
                                                                                                                                                                        return this.returnToken(tokenLexbufState, tok_11);

                                                                                                                                                                      case 1:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("FINALLY, pushing pushCtxtSeqBlock, tokenStartPos = %a\n"))((os_37, p_47) => {
                                                                                                                                                                            outputPos(os_37, p_47);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        (tupledArg_16 => {
                                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_16[0], tupledArg_16[1]);
                                                                                                                                                                        })([true, new AddBlockEnd(0)]);

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 2:
                                                                                                                                                                        const lookaheadTokenTup_1 = this.peekNextTokenTup();

                                                                                                                                                                        const lookaheadTokenStartPos_1 = (tokenTup_43 => this.startPosOfTokenTup(tokenTup_43))(lookaheadTokenTup_1);

                                                                                                                                                                        const matchValue_14 = lookaheadTokenTup_1.Token;

                                                                                                                                                                        switch (matchValue_14.tag) {
                                                                                                                                                                          case 59:
                                                                                                                                                                          case 189:
                                                                                                                                                                          case 42:
                                                                                                                                                                          case 43:
                                                                                                                                                                          case 44:
                                                                                                                                                                          case 110:
                                                                                                                                                                            const offsidePos = lookaheadTokenStartPos_1.Column > (copyOfStruct_5 = (copyOfStruct_4 = tokenTup.LexbufState, copyOfStruct_4.EndPos), copyOfStruct_5.Column) ? tokenStartPos : $var78[1].StartPos;

                                                                                                                                                                            if (debug) {
                                                                                                                                                                              dprintf(printf("WITH, pushing CtxtWithAsLet, tokenStartPos = %a, lookaheadTokenStartPos = %a\n"))((os_38, p_48) => {
                                                                                                                                                                                outputPos(os_38, p_48);
                                                                                                                                                                              }, tokenStartPos, (os_39, p_49) => {
                                                                                                                                                                                outputPos(os_39, p_49);
                                                                                                                                                                              }, lookaheadTokenStartPos_1);
                                                                                                                                                                            }

                                                                                                                                                                            ((tokenTup_44, newCtxt_16) => {
                                                                                                                                                                              this.pushCtxt(tokenTup_44, newCtxt_16);
                                                                                                                                                                            })(tokenTup, new Context(5, offsidePos));

                                                                                                                                                                            let isFollowedByLongIdentEquals;
                                                                                                                                                                            const tokenTup_45 = this.popNextTokenTup();
                                                                                                                                                                            const res_2 = isLongIdentEquals(tokenTup_45.Token);

                                                                                                                                                                            (tokenTup_46 => {
                                                                                                                                                                              this.delayToken(tokenTup_46);
                                                                                                                                                                            })(tokenTup_45);

                                                                                                                                                                            isFollowedByLongIdentEquals = res_2;

                                                                                                                                                                            if (isFollowedByLongIdentEquals) {
                                                                                                                                                                              (tupledArg_17 => {
                                                                                                                                                                                this.pushCtxtSeqBlock(tupledArg_17[0], tupledArg_17[1]);
                                                                                                                                                                              })([false, new AddBlockEnd(1)]);
                                                                                                                                                                            }

                                                                                                                                                                            const tok_12 = new token_3(26);
                                                                                                                                                                            return this.returnToken(tokenLexbufState, tok_12);

                                                                                                                                                                          default:
                                                                                                                                                                            if (debug) {
                                                                                                                                                                              dprintf(printf("WITH, pushing CtxtWithAsAugment and CtxtSeqBlock, tokenStartPos = %a, limCtxt = %A\n"))((os_40, p_50) => {
                                                                                                                                                                                outputPos(os_40, p_50);
                                                                                                                                                                              }, tokenStartPos, $var78[1]);
                                                                                                                                                                            }

                                                                                                                                                                            if ((matchValue_15 = lookaheadTokenTup_1.Token, matchValue_15.tag === 73 ? true : false) ? lookaheadTokenStartPos_1.OriginalLine === (copyOfStruct_6 = tokenTup.StartPos, copyOfStruct_6.OriginalLine) : false) {
                                                                                                                                                                              ((tokenTup_47, newCtxt_17) => {
                                                                                                                                                                                this.pushCtxt(tokenTup_47, newCtxt_17);
                                                                                                                                                                              })(tokenTup, new Context(5, tokenStartPos));

                                                                                                                                                                              const tok_13 = new token_3(26);
                                                                                                                                                                              return this.returnToken(tokenLexbufState, tok_13);
                                                                                                                                                                            } else {
                                                                                                                                                                              const offsidePos_1 = $var78[1].StartPos;

                                                                                                                                                                              ((tokenTup_48, newCtxt_18) => {
                                                                                                                                                                                this.pushCtxt(tokenTup_48, newCtxt_18);
                                                                                                                                                                              })(tokenTup, new Context(6, offsidePos_1));

                                                                                                                                                                              (tupledArg_18 => {
                                                                                                                                                                                this.pushCtxtSeqBlock(tupledArg_18[0], tupledArg_18[1]);
                                                                                                                                                                              })([true, new AddBlockEnd(0)]);

                                                                                                                                                                              return this.returnToken(tokenLexbufState, token);
                                                                                                                                                                            }

                                                                                                                                                                        }

                                                                                                                                                                      case 3:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("WITH\n"));
                                                                                                                                                                        }

                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("WITH --> NO MATCH, pushing CtxtWithAsAugment (type augmentation), stack = %A"))($var78[1]);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_49, newCtxt_19) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_49, newCtxt_19);
                                                                                                                                                                        })(tokenTup, new Context(6, tokenStartPos));

                                                                                                                                                                        (tupledArg_19 => {
                                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_19[0], tupledArg_19[1]);
                                                                                                                                                                        })([true, new AddBlockEnd(0)]);

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 4:
                                                                                                                                                                        const lookaheadTokenTup_2 = this.peekNextTokenTup();

                                                                                                                                                                        const lookaheadTokenStartPos_2 = (tokenTup_50 => this.startPosOfTokenTup(tokenTup_50))(lookaheadTokenTup_2);

                                                                                                                                                                        let leadingBar_1;
                                                                                                                                                                        const matchValue_16 = this.peekNextToken();

                                                                                                                                                                        if (matchValue_16.tag === 57) {
                                                                                                                                                                          leadingBar_1 = true;
                                                                                                                                                                        } else {
                                                                                                                                                                          leadingBar_1 = false;
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_51, newCtxt_20) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_51, newCtxt_20);
                                                                                                                                                                        })(tokenTup, new Context(4, tokenStartPos));

                                                                                                                                                                        ((tokenTup_52, newCtxt_21) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_52, newCtxt_21);
                                                                                                                                                                        })(lookaheadTokenTup_2, new Context(26, [leadingBar_1, lookaheadTokenStartPos_2]));

                                                                                                                                                                        const tok_14 = new token_3(25);
                                                                                                                                                                        return this.returnToken(tokenLexbufState, tok_14);

                                                                                                                                                                      case 5:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("THEN, replacing THEN with OTHEN, pushing CtxtSeqBlock;CtxtThen(%a)\n"))((os_41, p_51) => {
                                                                                                                                                                            outputPos(os_41, p_51);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_53, newCtxt_22) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_53, newCtxt_22);
                                                                                                                                                                        })(tokenTup, new Context(12, tokenStartPos));

                                                                                                                                                                        (tupledArg_20 => {
                                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_20[0], tupledArg_20[1]);
                                                                                                                                                                        })([true, new AddBlockEnd(0)]);

                                                                                                                                                                        const tok_15 = new token_3(28);
                                                                                                                                                                        return this.returnToken(tokenLexbufState, tok_15);

                                                                                                                                                                      case 6:
                                                                                                                                                                        const lookaheadTokenTup_3 = this.peekNextTokenTup();

                                                                                                                                                                        const lookaheadTokenStartPos_3 = (tokenTup_54 => this.startPosOfTokenTup(tokenTup_54))(lookaheadTokenTup_3);

                                                                                                                                                                        const matchValue_17 = this.peekNextToken();
                                                                                                                                                                        const $var79 = matchValue_17.tag === 125 ? isSameLine() ? [0] : [1] : [1];

                                                                                                                                                                        switch ($var79[0]) {
                                                                                                                                                                          case 0:
                                                                                                                                                                            this.popNextTokenTup();

                                                                                                                                                                            if (debug) {
                                                                                                                                                                              dprintf(printf("ELSE IF: replacing ELSE IF with ELIF, pushing CtxtIf, CtxtVanilla(%a)\n"))((os_42, p_52) => {
                                                                                                                                                                                outputPos(os_42, p_52);
                                                                                                                                                                              }, tokenStartPos);
                                                                                                                                                                            }

                                                                                                                                                                            ((tokenTup_55, newCtxt_23) => {
                                                                                                                                                                              this.pushCtxt(tokenTup_55, newCtxt_23);
                                                                                                                                                                            })(tokenTup, new Context(1, tokenStartPos));

                                                                                                                                                                            const tok_16 = new token_3(140);
                                                                                                                                                                            return this.returnToken(tokenLexbufState, tok_16);

                                                                                                                                                                          case 1:
                                                                                                                                                                            if (debug) {
                                                                                                                                                                              dprintf(printf("ELSE: replacing ELSE with OELSE, pushing CtxtSeqBlock, CtxtElse(%a)\n"))((os_43, p_53) => {
                                                                                                                                                                                outputPos(os_43, p_53);
                                                                                                                                                                              }, lookaheadTokenStartPos_3);
                                                                                                                                                                            }

                                                                                                                                                                            ((tokenTup_56, newCtxt_24) => {
                                                                                                                                                                              this.pushCtxt(tokenTup_56, newCtxt_24);
                                                                                                                                                                            })(tokenTup, new Context(13, tokenStartPos));

                                                                                                                                                                            (tupledArg_21 => {
                                                                                                                                                                              this.pushCtxtSeqBlock(tupledArg_21[0], tupledArg_21[1]);
                                                                                                                                                                            })([true, new AddBlockEnd(0)]);

                                                                                                                                                                            const tok_17 = new token_3(27);
                                                                                                                                                                            return this.returnToken(tokenLexbufState, tok_17);
                                                                                                                                                                        }

                                                                                                                                                                      case 7:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("IF, pushing CtxtIf(%a)\n"))((os_44, p_54) => {
                                                                                                                                                                            outputPos(os_44, p_54);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_57, newCtxt_25) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_57, newCtxt_25);
                                                                                                                                                                        })(tokenTup, new Context(1, tokenStartPos));

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 8:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("MATCH, pushing CtxtMatch(%a)\n"))((os_45, p_55) => {
                                                                                                                                                                            outputPos(os_45, p_55);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_58, newCtxt_26) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_58, newCtxt_26);
                                                                                                                                                                        })(tokenTup, new Context(7, tokenStartPos));

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 9:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("FOR, pushing CtxtFor(%a)\n"))((os_46, p_56) => {
                                                                                                                                                                            outputPos(os_46, p_56);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_59, newCtxt_27) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_59, newCtxt_27);
                                                                                                                                                                        })(tokenTup, new Context(8, tokenStartPos));

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 10:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("WHILE, pushing CtxtWhile(%a)\n"))((os_47, p_57) => {
                                                                                                                                                                            outputPos(os_47, p_57);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_60, newCtxt_28) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_60, newCtxt_28);
                                                                                                                                                                        })(tokenTup, new Context(9, tokenStartPos));

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 11:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("WHEN, pushing CtxtWhen(%a)\n"))((os_48, p_58) => {
                                                                                                                                                                            outputPos(os_48, p_58);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_61, newCtxt_29) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_61, newCtxt_29);
                                                                                                                                                                        })(tokenTup, new Context(10, tokenStartPos));

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 12:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("FUN, pushing CtxtFun(%a)\n"))((os_49, p_59) => {
                                                                                                                                                                            outputPos(os_49, p_59);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_62, newCtxt_30) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_62, newCtxt_30);
                                                                                                                                                                        })(tokenTup, new Context(3, tokenStartPos));

                                                                                                                                                                        const tok_18 = new token_3(24);
                                                                                                                                                                        return this.returnToken(tokenLexbufState, tok_18);

                                                                                                                                                                      case 13:
                                                                                                                                                                        const lookaheadTokenTup_4 = this.peekNextTokenTup();

                                                                                                                                                                        const lookaheadTokenStartPos_4 = (tokenTup_63 => this.startPosOfTokenTup(tokenTup_63))(lookaheadTokenTup_4);

                                                                                                                                                                        const matchValue_18 = lookaheadTokenTup_4.Token;

                                                                                                                                                                        switch (matchValue_18.tag) {
                                                                                                                                                                          case 51:
                                                                                                                                                                          case 50:
                                                                                                                                                                          case 111:
                                                                                                                                                                          case 118:
                                                                                                                                                                          case 108:
                                                                                                                                                                          case 46:
                                                                                                                                                                          case 141:
                                                                                                                                                                          case 47:
                                                                                                                                                                          case 49:
                                                                                                                                                                          case 53:
                                                                                                                                                                          case 73:
                                                                                                                                                                            if (debug) {
                                                                                                                                                                              dprintf(printf("INTERFACE, pushing CtxtParen, tokenStartPos = %a, lookaheadTokenStartPos = %a\n"))((os_50, p_60) => {
                                                                                                                                                                                outputPos(os_50, p_60);
                                                                                                                                                                              }, tokenStartPos, (os_51, p_61) => {
                                                                                                                                                                                outputPos(os_51, p_61);
                                                                                                                                                                              }, lookaheadTokenStartPos_4);
                                                                                                                                                                            }

                                                                                                                                                                            ((tokenTup_64, newCtxt_31) => {
                                                                                                                                                                              this.pushCtxt(tokenTup_64, newCtxt_31);
                                                                                                                                                                            })(tokenTup, new Context(24, [token, tokenStartPos]));

                                                                                                                                                                            (tupledArg_22 => {
                                                                                                                                                                              this.pushCtxtSeqBlock(tupledArg_22[0], tupledArg_22[1]);
                                                                                                                                                                            })([true, new AddBlockEnd(0)]);

                                                                                                                                                                            return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                          default:
                                                                                                                                                                            if (debug) {
                                                                                                                                                                              dprintf(printf("INTERFACE, pushing CtxtInterfaceHead, tokenStartPos = %a, lookaheadTokenStartPos = %a\n"))((os_52, p_62) => {
                                                                                                                                                                                outputPos(os_52, p_62);
                                                                                                                                                                              }, tokenStartPos, (os_53, p_63) => {
                                                                                                                                                                                outputPos(os_53, p_63);
                                                                                                                                                                              }, lookaheadTokenStartPos_4);
                                                                                                                                                                            }

                                                                                                                                                                            ((tokenTup_65, newCtxt_32) => {
                                                                                                                                                                              this.pushCtxt(tokenTup_65, newCtxt_32);
                                                                                                                                                                            })(tokenTup, new Context(15, tokenStartPos));

                                                                                                                                                                            const tok_19 = new token_3(14);
                                                                                                                                                                            return this.returnToken(tokenLexbufState, tok_19);
                                                                                                                                                                        }

                                                                                                                                                                      case 14:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("CLASS, pushing CtxtParen(%a)\n"))((os_54, p_64) => {
                                                                                                                                                                            outputPos(os_54, p_64);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_66, newCtxt_33) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_66, newCtxt_33);
                                                                                                                                                                        })(tokenTup, new Context(24, [token, tokenStartPos]));

                                                                                                                                                                        (tupledArg_23 => {
                                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_23[0], tupledArg_23[1]);
                                                                                                                                                                        })([true, new AddBlockEnd(0)]);

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 15:
                                                                                                                                                                        insertComingSoonTokens(["TYPE", new token_3(36), new token_3(37)]);

                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("TYPE, pushing CtxtTypeDefns(%a)\n"))((os_55, p_65) => {
                                                                                                                                                                            outputPos(os_55, p_65);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_67, newCtxt_34) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_67, newCtxt_34);
                                                                                                                                                                        })(tokenTup, new Context(16, tokenStartPos));

                                                                                                                                                                        return (useBlockRule_10 => this.hwTokenFetch(useBlockRule_10))(useBlockRule);

                                                                                                                                                                      case 16:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("Try, pushing CtxtTry(%a)\n"))((os_56, p_66) => {
                                                                                                                                                                            outputPos(os_56, p_66);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        ((tokenTup_68, newCtxt_35) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_68, newCtxt_35);
                                                                                                                                                                        })(tokenTup, new Context(2, tokenStartPos));

                                                                                                                                                                        (tupledArg_24 => {
                                                                                                                                                                          this.pushCtxtSeqBlock(tupledArg_24[0], tupledArg_24[1]);
                                                                                                                                                                        })([false, new AddBlockEnd(2)]);

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 17:
                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 18:
                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("skipping dummy token as no offside rules apply\n"));
                                                                                                                                                                        }

                                                                                                                                                                        return (useBlockRule_11 => this.hwTokenFetch(useBlockRule_11))(useBlockRule);

                                                                                                                                                                      case 19:
                                                                                                                                                                        ((tokenTup_69, newCtxt_36) => {
                                                                                                                                                                          this.pushCtxt(tokenTup_69, newCtxt_36);
                                                                                                                                                                        })(tokenTup, new Context(11, [tokenStartPos, isLongIdentEquals(token)]));

                                                                                                                                                                        if (debug) {
                                                                                                                                                                          dprintf(printf("pushing CtxtVanilla at tokenStartPos = %a\n"))((os_57, p_67) => {
                                                                                                                                                                            outputPos(os_57, p_67);
                                                                                                                                                                          }, tokenStartPos);
                                                                                                                                                                        }

                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);

                                                                                                                                                                      case 20:
                                                                                                                                                                        return this.returnToken(tokenLexbufState, token);
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

                    }

                }

            }

        }
      }
    }
  }

  rulesForBothSoftWhiteAndHardWhite(tokenTup) {
    var matchValue_7;
    var copyOfStruct_5;
    var matchValue_8;
    var copyOfStruct_6;
    var matchValue_9;
    var copyOfStruct_7;
    var matchValue_10;
    var copyOfStruct_8;
    var matchValue_11;
    var copyOfStruct_9;
    var copyOfStruct;
    var copyOfStruct_1;
    const matchValue = tokenTup.Token;
    const $var88 = matchValue.tag === 189 ? CurriedLambda(() => (tokenTup_36 => this.nextTokenIsAdjacentLParenOrLBrack(tokenTup_36))(tokenTup) != null)() ? [0] : [1] : [1];

    switch ($var88[0]) {
      case 0:
        const dotTokenTup = this.peekNextTokenTup();

        if (debug) {
          dprintf(printf("inserting HIGH_PRECEDENCE_PAREN_APP at dotTokenPos = %a\n"))((os, p) => {
            outputPos(os, p);
          }, (tokenTup_1 => this.startPosOfTokenTup(tokenTup_1))(dotTokenTup));
        }

        let hpa;

        const matchValue_1 = (tokenTup_2 => this.nextTokenIsAdjacentLParenOrLBrack(tokenTup_2))(tokenTup);

        const $var89 = matchValue_1 != null ? getValue(matchValue_1).tag === 92 ? [0] : getValue(matchValue_1).tag === 71 ? [1] : [2] : [2];

        switch ($var89[0]) {
          case 0:
            hpa = new token_3(34);
            break;

          case 1:
            hpa = new token_3(35);
            break;

          case 2:
            throw new Error("unreachable");
            break;
        }

        (tokenTup_3 => {
          this.delayToken(tokenTup_3);
        })(dotTokenTup.UseLocation(hpa));

        (tokenTup_4 => {
          this.delayToken(tokenTup_4);
        })(tokenTup);

        return true;

      case 1:
        const $var90 = matchValue.tag === 150 ? ((indentation, tokenTup_21) => this.peekAdjacentTypars(indentation, tokenTup_21))(false, tokenTup) ? [0] : [1] : matchValue.tag === 189 ? ((indentation_1, tokenTup_22) => this.peekAdjacentTypars(indentation_1, tokenTup_22))(false, tokenTup) ? [0] : [1] : matchValue.tag === 166 ? ((indentation_2, tokenTup_23) => this.peekAdjacentTypars(indentation_2, tokenTup_23))(false, tokenTup) ? [0] : [1] : matchValue.tag === 167 ? ((indentation_3, tokenTup_24) => this.peekAdjacentTypars(indentation_3, tokenTup_24))(false, tokenTup) ? [0] : [1] : matchValue.tag === 164 ? ((indentation_4, tokenTup_25) => this.peekAdjacentTypars(indentation_4, tokenTup_25))(false, tokenTup) ? [0] : [1] : matchValue.tag === 178 ? ((indentation_5, tokenTup_26) => this.peekAdjacentTypars(indentation_5, tokenTup_26))(false, tokenTup) ? [0] : [1] : matchValue.tag === 177 ? ((indentation_6, tokenTup_27) => this.peekAdjacentTypars(indentation_6, tokenTup_27))(false, tokenTup) ? [0] : [1] : matchValue.tag === 175 ? ((indentation_7, tokenTup_28) => this.peekAdjacentTypars(indentation_7, tokenTup_28))(false, tokenTup) ? [0] : [1] : matchValue.tag === 174 ? ((indentation_8, tokenTup_29) => this.peekAdjacentTypars(indentation_8, tokenTup_29))(false, tokenTup) ? [0] : [1] : matchValue.tag === 168 ? ((indentation_9, tokenTup_30) => this.peekAdjacentTypars(indentation_9, tokenTup_30))(false, tokenTup) ? [0] : [1] : matchValue.tag === 173 ? ((indentation_10, tokenTup_31) => this.peekAdjacentTypars(indentation_10, tokenTup_31))(false, tokenTup) ? [0] : [1] : matchValue.tag === 172 ? ((indentation_11, tokenTup_32) => this.peekAdjacentTypars(indentation_11, tokenTup_32))(false, tokenTup) ? [0] : [1] : matchValue.tag === 171 ? ((indentation_12, tokenTup_33) => this.peekAdjacentTypars(indentation_12, tokenTup_33))(false, tokenTup) ? [0] : [1] : matchValue.tag === 170 ? ((indentation_13, tokenTup_34) => this.peekAdjacentTypars(indentation_13, tokenTup_34))(false, tokenTup) ? [0] : [1] : matchValue.tag === 163 ? ((indentation_14, tokenTup_35) => this.peekAdjacentTypars(indentation_14, tokenTup_35))(false, tokenTup) ? [0] : [1] : [1];

        switch ($var90[0]) {
          case 0:
            const lessTokenTup = this.popNextTokenTup();

            (tokenTup_5 => {
              this.delayToken(tokenTup_5);
            })(lessTokenTup.UseLocation((() => {
              const matchValue_2 = lessTokenTup.Token;

              if (matchValue_2.tag === 158) {
                return new token_3(158, true);
              } else {
                throw new Error("unreachable");
              }
            })()));

            if (debug) {
              dprintf(printf("softwhite inserting HIGH_PRECEDENCE_TYAPP at dotTokenPos = %a\n"))((os_1, p_1) => {
                outputPos(os_1, p_1);
              }, (tokenTup_6 => this.startPosOfTokenTup(tokenTup_6))(lessTokenTup));
            }

            (tokenTup_7 => {
              this.delayToken(tokenTup_7);
            })(lessTokenTup.UseLocation(new token_3(33)));

            (tokenTup_8 => {
              this.delayToken(tokenTup_8);
            })(tokenTup);

            return true;

          case 1:
            const $var91 = matchValue.tag === 176 ? [0, matchValue.data[0], matchValue.data[1]] : matchValue.tag === 155 ? [1, matchValue.data[1], matchValue.data[0]] : matchValue.tag === 62 ? (((matchValue_7 = tokenTup.Token, matchValue_7.tag === 181 ? (matchValue_7.data === "+" ? true : matchValue_7.data === "+.") ? true : matchValue_7.data === "-." : matchValue_7.tag === 156 ? matchValue_7.data === "%" ? true : matchValue_7.data === "%%" : true) ? (firstTokenTup => this.nextTokenIsAdjacent(firstTokenTup))(tokenTup) : false) ? !(this.prevWasAtomicEnd ? (copyOfStruct_5 = tokenTup.LastTokenPos, copyOfStruct_5.Y).Equals((tokenTup_16 => this.startPosOfTokenTup(tokenTup_16))(tokenTup)) : false) : false) ? [2] : [3] : matchValue.tag === 181 ? (((matchValue_8 = tokenTup.Token, matchValue_8.tag === 181 ? (matchValue_8.data === "+" ? true : matchValue_8.data === "+.") ? true : matchValue_8.data === "-." : matchValue_8.tag === 156 ? matchValue_8.data === "%" ? true : matchValue_8.data === "%%" : true) ? (firstTokenTup_1 => this.nextTokenIsAdjacent(firstTokenTup_1))(tokenTup) : false) ? !(this.prevWasAtomicEnd ? (copyOfStruct_6 = tokenTup.LastTokenPos, copyOfStruct_6.Y).Equals((tokenTup_17 => this.startPosOfTokenTup(tokenTup_17))(tokenTup)) : false) : false) ? [2] : [3] : matchValue.tag === 156 ? (((matchValue_9 = tokenTup.Token, matchValue_9.tag === 181 ? (matchValue_9.data === "+" ? true : matchValue_9.data === "+.") ? true : matchValue_9.data === "-." : matchValue_9.tag === 156 ? matchValue_9.data === "%" ? true : matchValue_9.data === "%%" : true) ? (firstTokenTup_2 => this.nextTokenIsAdjacent(firstTokenTup_2))(tokenTup) : false) ? !(this.prevWasAtomicEnd ? (copyOfStruct_7 = tokenTup.LastTokenPos, copyOfStruct_7.Y).Equals((tokenTup_18 => this.startPosOfTokenTup(tokenTup_18))(tokenTup)) : false) : false) ? [2] : [3] : matchValue.tag === 89 ? (((matchValue_10 = tokenTup.Token, matchValue_10.tag === 181 ? (matchValue_10.data === "+" ? true : matchValue_10.data === "+.") ? true : matchValue_10.data === "-." : matchValue_10.tag === 156 ? matchValue_10.data === "%" ? true : matchValue_10.data === "%%" : true) ? (firstTokenTup_3 => this.nextTokenIsAdjacent(firstTokenTup_3))(tokenTup) : false) ? !(this.prevWasAtomicEnd ? (copyOfStruct_8 = tokenTup.LastTokenPos, copyOfStruct_8.Y).Equals((tokenTup_19 => this.startPosOfTokenTup(tokenTup_19))(tokenTup)) : false) : false) ? [2] : [3] : matchValue.tag === 90 ? (((matchValue_11 = tokenTup.Token, matchValue_11.tag === 181 ? (matchValue_11.data === "+" ? true : matchValue_11.data === "+.") ? true : matchValue_11.data === "-." : matchValue_11.tag === 156 ? matchValue_11.data === "%" ? true : matchValue_11.data === "%%" : true) ? (firstTokenTup_4 => this.nextTokenIsAdjacent(firstTokenTup_4))(tokenTup) : false) ? !(this.prevWasAtomicEnd ? (copyOfStruct_9 = tokenTup.LastTokenPos, copyOfStruct_9.Y).Equals((tokenTup_20 => this.startPosOfTokenTup(tokenTup_20))(tokenTup)) : false) : false) ? [2] : [3] : [3];

            switch ($var91[0]) {
              case 0:
                const dotdotPos = new LexbufState((copyOfStruct = tokenTup.EndPos, copyOfStruct.ShiftColumnBy(-2)), tokenTup.EndPos, false);

                (tokenTup_9 => {
                  this.delayToken(tokenTup_9);
                })(new TokenTup(new token_3(142), dotdotPos, tokenTup.LastTokenPos));

                (tokenTup_10 => {
                  this.delayToken(tokenTup_10);
                })(tokenTup.UseShiftedLocation(new token_3(175, [$var91[1], $var91[2]]), 0, -2));

                return true;

              case 1:
                const dotPos = new LexbufState((copyOfStruct_1 = tokenTup.EndPos, copyOfStruct_1.ShiftColumnBy(-1)), tokenTup.EndPos, false);

                (tokenTup_11 => {
                  this.delayToken(tokenTup_11);
                })(new TokenTup(new token_3(77), dotPos, tokenTup.LastTokenPos));

                (tokenTup_12 => {
                  this.delayToken(tokenTup_12);
                })(tokenTup.UseShiftedLocation(new token_3(154, [$var91[2], $var91[1]]), 0, -1));

                return true;

              case 2:
                let plus;
                const matchValue_3 = tokenTup.Token;

                if (matchValue_3.tag === 181) {
                  plus = matchValue_3.data === "+";
                } else {
                  plus = false;
                }

                let plusOrMinus;
                const matchValue_4 = tokenTup.Token;

                if (matchValue_4.tag === 181) {
                  plusOrMinus = matchValue_4.data === "+";
                } else if (matchValue_4.tag === 62) {
                  plusOrMinus = true;
                } else {
                  plusOrMinus = false;
                }

                const nextTokenTup = this.popNextTokenTup();

                const delayMergedToken = tok => {
                  var copyOfStruct_2;
                  var copyOfStruct_3;
                  var copyOfStruct_4;

                  (tokenTup_13 => {
                    this.delayToken(tokenTup_13);
                  })(new TokenTup(tok, new LexbufState((copyOfStruct_2 = tokenTup.LexbufState, copyOfStruct_2.StartPos), (copyOfStruct_3 = nextTokenTup.LexbufState, copyOfStruct_3.EndPos), (copyOfStruct_4 = nextTokenTup.LexbufState, copyOfStruct_4.PastEOF)), tokenTup.LastTokenPos));
                };

                const noMerge = () => {
                  let tokenName;
                  const matchValue_5 = tokenTup.Token;
                  const $var92 = matchValue_5.tag === 181 ? [0, matchValue_5.data] : matchValue_5.tag === 156 ? [0, matchValue_5.data] : matchValue_5.tag === 89 ? [1] : matchValue_5.tag === 90 ? [2] : matchValue_5.tag === 62 ? [3] : [4];

                  switch ($var92[0]) {
                    case 0:
                      tokenName = $var92[1];
                      break;

                    case 1:
                      tokenName = "&";
                      break;

                    case 2:
                      tokenName = "&&";
                      break;

                    case 3:
                      tokenName = "-";
                      break;

                    case 4:
                      throw new Error("unreachable");
                      break;
                  }

                  const token = new token_3(180, tokenName);

                  (tokenTup_14 => {
                    this.delayToken(tokenTup_14);
                  })(nextTokenTup);

                  (tokenTup_15 => {
                    this.delayToken(tokenTup_15);
                  })(tokenTup.UseLocation(token));
                };

                if (plusOrMinus) {
                  const matchValue_6 = nextTokenTup.Token;

                  switch (matchValue_6.tag) {
                    case 178:
                      const v = matchValue_6.data[0] | 0;
                      const bad = matchValue_6.data[1];
                      delayMergedToken(new token_3(178, [plus ? v : -v, plus ? bad : false]));
                      break;

                    case 177:
                      const v_1 = matchValue_6.data[0] | 0;
                      const bad_1 = matchValue_6.data[1];
                      delayMergedToken(new token_3(177, [plus ? v_1 : -v_1, plus ? bad_1 : false]));
                      break;

                    case 175:
                      const v_2 = matchValue_6.data[0] | 0;
                      const bad_2 = matchValue_6.data[1];
                      delayMergedToken(new token_3(175, [plus ? v_2 : -v_2, plus ? bad_2 : false]));
                      break;

                    case 176:
                      const v_3 = matchValue_6.data[0] | 0;
                      const bad_3 = matchValue_6.data[1];
                      delayMergedToken(new token_3(176, [plus ? v_3 : -v_3, plus ? bad_3 : false]));
                      break;

                    case 174:
                      const v_4 = matchValue_6.data[0];
                      const bad_4 = matchValue_6.data[1];
                      delayMergedToken(new token_3(174, [plus ? v_4 : v_4.neg(), plus ? bad_4 : false]));
                      break;

                    case 168:
                      delayMergedToken(new token_3(168, plus ? matchValue_6.data : matchValue_6.data.neg()));
                      break;

                    case 167:
                      delayMergedToken(new token_3(167, plus ? matchValue_6.data : -matchValue_6.data));
                      break;

                    case 166:
                      delayMergedToken(new token_3(166, plus ? matchValue_6.data : -matchValue_6.data));
                      break;

                    case 164:
                      delayMergedToken(new token_3(164, plus ? matchValue_6.data : applyOperator(matchValue_6.data, "op_UnaryNegation")));
                      break;

                    case 163:
                      const v_5 = matchValue_6.data[0];
                      const s = matchValue_6.data[1];
                      delayMergedToken(new token_3(163, [plus ? v_5 : "-" + v_5, s]));
                      break;

                    default:
                      noMerge();
                  }
                } else {
                  noMerge();
                }

                return true;

              case 3:
                return false;
            }

        }

    }
  }

  pushCtxtSeqBlock(addBlockBegin, addBlockEnd) {
    (tupledArg => {
      this.pushCtxtSeqBlockAt(tupledArg[0], tupledArg[1], tupledArg[2]);
    })([this.peekNextTokenTup(), addBlockBegin, addBlockEnd]);
  }

  pushCtxtSeqBlockAt(p, addBlockBegin, addBlockEnd) {
    if (addBlockBegin) {
      if (debug) {
        dprintf(printf("--> insert OBLOCKBEGIN \n"));
      }

      (tokenTup => {
        this.delayToken(tokenTup);
      })(p.UseLocation(new token_3(22)));
    }

    ((tokenTup_1, newCtxt) => {
      this.pushCtxt(tokenTup_1, newCtxt);
    })(p, new Context(25, [new FirstInSequence(0), (tokenTup_2 => this.startPosOfTokenTup(tokenTup_2))(p), addBlockEnd]));
  }

  swTokenFetch() {
    const tokenTup = this.popNextTokenTup();

    const tokenReplaced = (tokenTup_1 => this.rulesForBothSoftWhiteAndHardWhite(tokenTup_1))(tokenTup);

    if (tokenReplaced) {
      return (() => this.swTokenFetch())();
    } else {
      const tokenLexbufState = tokenTup.LexbufState;
      const tok = tokenTup.Token;
      return this.returnToken(tokenLexbufState, tok);
    }
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.LexFilterImpl", LexFilterImpl);
export class LexFilter {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LexFilter.LexFilter",
      properties: {
        LexBuffer: makeGeneric(LexBuffer, {
          Char: "string"
        })
      }
    };
  }

  constructor(lightSyntaxStatus, compilingFsLib, lexer, lexbuf) {
    this.inner = new LexFilterImpl(lightSyntaxStatus, compilingFsLib, lexer, lexbuf);
    this.delayedStack = Stack[".ctor"](100);
  }

  get LexBuffer() {
    return this.inner.LexBuffer;
  }

  Lexer(_arg1) {
    const loop = () => {
      const token = this.popNextToken();

      if (token.tag === 59) {
        const comingSoon = new token_3(60);
        const isHere = new token_3(61);
        this.insertComingSoonTokens(comingSoon, isHere);
        return loop();
      } else if (token.tag === 93) {
        const comingSoon_1 = new token_3(94);
        const isHere_1 = new token_3(95);
        this.insertComingSoonTokens(comingSoon_1, isHere_1);
        return loop();
      } else if (token.tag === 15) {
        const comingSoon_2 = new token_3(16);
        const isHere_2 = new token_3(17);
        this.insertComingSoonTokens(comingSoon_2, isHere_2);
        return loop();
      } else {
        return token;
      }
    };

    return loop();
  }

  delayToken(tok) {
    this.delayedStack.Push(tok);
  }

  popNextToken() {
    if (this.delayedStack.Count > 0) {
      const tokenTup = this.delayedStack.Pop();
      return tokenTup;
    } else {
      return this.inner.Lexer();
    }
  }

  insertComingSoonTokens(comingSoon, isHere) {
    if (debug) {
      dprintf(printf("inserting 6 copies of %+A before %+A\n"))(comingSoon, isHere);
    }

    this.delayToken(isHere);

    for (let i = 1; i <= 6; i++) {
      this.delayToken(comingSoon);
    }
  }

}
setType("Microsoft.FSharp.Compiler.LexFilter.LexFilter", LexFilter);
export function token(lexargs, skip) {
  return CurriedLambda(function (lexbuf) {
    return token_4(lexargs, skip, lexbuf);
  });
}