import { tokenTagToTokenId, token_to_string, token as token_2, tagOfToken } from "../codegen/pars";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { hasInterface, compareRecords, equalsRecords } from "../fable-core/Util";
import { System } from "../fcs-fable/adapters";
import { LexerEndlineContinuation, LexerIfdefStackEntry, LexerWhitespaceContinuation } from "../fsharp/ast";
import List from "../fable-core/List";
import { fromBits, fromNumber } from "../fable-core/Long";
import { mkRange, pos0, range0, pos } from "../fsharp/range";
import { Bits } from "../fsharp/lib";
import { Keywords as Keywords_1, mkLexargs, LexResourceManager, LightSyntaxStatus, resetLexbufPos, defaultStringFinisher, lexargs as lexargs_1 } from "../fsharp/lexhelp";
import { endline, tripleQuoteString, verbatimString, mlOnly, tripleQuoteStringInComment, verbatimStringInComment, stringInComment, singleLineComment, comment as comment_1, string, ifdefSkip, token as token_3 } from "../codegen/lex";
import { ByteBuffer } from "../absil/bytes";
import { IsScript } from "../fsharp/CompileOps";
import { getValue } from "../fable-core/Option";
import { Stack } from "../utils/prim-parsing";
import { Position } from "../utils/prim-lexing";
import { DiscardErrorsLogger, PushErrorLoggerPhaseUntilUnwind, BuildPhase, PushThreadBuildPhaseUntilUnwind } from "../fsharp/ErrorLogger";
import { $7C$TyparsCloseOp$7C$_$7C$ as _TyparsCloseOp___ } from "../fsharp/LexFilter";
import { indexOfAny, trim } from "../fable-core/String";
import { FunctionAsLexbuf, StringAsLexbuf } from "../fsharp/UnicodeLexing";
export const FSharpTokenTag = function (__exports) {
  const Identifier = __exports.Identifier = tagOfToken(new token_2(189, "a"));

  const _String = __exports.String = tagOfToken(new token_2(191, "a"));

  const IDENT = __exports.IDENT = tagOfToken(new token_2(189, "a"));
  const STRING = __exports.STRING = tagOfToken(new token_2(191, "a"));
  const LPAREN = __exports.LPAREN = tagOfToken(new token_2(92));
  const RPAREN = __exports.RPAREN = tagOfToken(new token_2(93));
  const LBRACK = __exports.LBRACK = tagOfToken(new token_2(71));
  const RBRACK = __exports.RBRACK = tagOfToken(new token_2(58));
  const LBRACE = __exports.LBRACE = tagOfToken(new token_2(74));
  const RBRACE = __exports.RBRACE = tagOfToken(new token_2(59));
  const LBRACK_LESS = __exports.LBRACK_LESS = tagOfToken(new token_2(73));
  const GREATER_RBRACK = __exports.GREATER_RBRACK = tagOfToken(new token_2(54));
  const LESS = __exports.LESS = tagOfToken(new token_2(158, true));
  const GREATER = __exports.GREATER = tagOfToken(new token_2(159, true));
  const LBRACK_BAR = __exports.LBRACK_BAR = tagOfToken(new token_2(72));
  const BAR_RBRACK = __exports.BAR_RBRACK = tagOfToken(new token_2(65));
  const PLUS_MINUS_OP = __exports.PLUS_MINUS_OP = tagOfToken(new token_2(181, "a"));
  const MINUS = __exports.MINUS = tagOfToken(new token_2(62));
  const STAR = __exports.STAR = tagOfToken(new token_2(96));
  const INFIX_STAR_DIV_MOD_OP = __exports.INFIX_STAR_DIV_MOD_OP = tagOfToken(new token_2(183, "a"));
  const PERCENT_OP = __exports.PERCENT_OP = tagOfToken(new token_2(156, "a"));
  const INFIX_AT_HAT_OP = __exports.INFIX_AT_HAT_OP = tagOfToken(new token_2(186, "a"));
  const QMARK = __exports.QMARK = tagOfToken(new token_2(75));
  const COLON = __exports.COLON = tagOfToken(new token_2(78));
  const EQUALS = __exports.EQUALS = tagOfToken(new token_2(70));
  const SEMICOLON = __exports.SEMICOLON = tagOfToken(new token_2(84));
  const COMMA = __exports.COMMA = tagOfToken(new token_2(97));
  const DOT = __exports.DOT = tagOfToken(new token_2(77));
  const DOT_DOT = __exports.DOT_DOT = tagOfToken(new token_2(142));
  const INT32_DOT_DOT = __exports.INT32_DOT_DOT = tagOfToken(new token_2(176, [0, true]));
  const UNDERSCORE = __exports.UNDERSCORE = tagOfToken(new token_2(67));
  const BAR = __exports.BAR = tagOfToken(new token_2(57));
  const COLON_GREATER = __exports.COLON_GREATER = tagOfToken(new token_2(80));
  const COLON_QMARK_GREATER = __exports.COLON_QMARK_GREATER = tagOfToken(new token_2(81));
  const COLON_QMARK = __exports.COLON_QMARK = tagOfToken(new token_2(82));
  const INFIX_BAR_OP = __exports.INFIX_BAR_OP = tagOfToken(new token_2(185, "a"));
  const INFIX_COMPARE_OP = __exports.INFIX_COMPARE_OP = tagOfToken(new token_2(187, "a"));
  const COLON_COLON = __exports.COLON_COLON = tagOfToken(new token_2(79));
  const AMP_AMP = __exports.AMP_AMP = tagOfToken(new token_2(90));
  const PREFIX_OP = __exports.PREFIX_OP = tagOfToken(new token_2(184, "a"));
  const COLON_EQUALS = __exports.COLON_EQUALS = tagOfToken(new token_2(83));
  const BAR_BAR = __exports.BAR_BAR = tagOfToken(new token_2(143));
  const RARROW = __exports.RARROW = tagOfToken(new token_2(98));
  const LARROW = __exports.LARROW = tagOfToken(new token_2(69));
  const QUOTE = __exports.QUOTE = tagOfToken(new token_2(91));
  const WHITESPACE = __exports.WHITESPACE = tagOfToken(new token_2(4, null));
  const COMMENT = __exports.COMMENT = tagOfToken(new token_2(3, null));
  const LINE_COMMENT = __exports.LINE_COMMENT = tagOfToken(new token_2(8, null));
  const BEGIN = __exports.BEGIN = tagOfToken(new token_2(135));
  const DO = __exports.DO = tagOfToken(new token_2(136));
  const FUNCTION = __exports.FUNCTION = tagOfToken(new token_2(124));
  const THEN = __exports.THEN = tagOfToken(new token_2(104));
  const ELSE = __exports.ELSE = tagOfToken(new token_2(139));
  const STRUCT = __exports.STRUCT = tagOfToken(new token_2(55));
  const CLASS = __exports.CLASS = tagOfToken(new token_2(48));
  const TRY = __exports.TRY = tagOfToken(new token_2(107));
  const NEW = __exports.NEW = tagOfToken(new token_2(118));
  const WITH = __exports.WITH = tagOfToken(new token_2(87));
  const OWITH = __exports.OWITH = tagOfToken(new token_2(26));
  return __exports;
}({});
export class FSharpTokenInfo {
  constructor(leftColumn, rightColumn, colorClass, charClass, fSharpTokenTriggerClass, tag, tokenName, fullMatchedLength) {
    this.LeftColumn = leftColumn | 0;
    this.RightColumn = rightColumn | 0;
    this.ColorClass = colorClass | 0;
    this.CharClass = charClass | 0;
    this.FSharpTokenTriggerClass = fSharpTokenTriggerClass | 0;
    this.Tag = tag | 0;
    this.TokenName = tokenName;
    this.FullMatchedLength = fullMatchedLength | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpTokenInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        LeftColumn: "number",
        RightColumn: "number",
        ColorClass: "number",
        CharClass: "number",
        FSharpTokenTriggerClass: "number",
        Tag: "number",
        TokenName: "string",
        FullMatchedLength: "number"
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
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpTokenInfo", FSharpTokenInfo);
export const TokenClassifications = function (__exports) {
  const tokenInfo = __exports.tokenInfo = function (token) {
    const $var1 = token.tag === 127 ? [1] : token.tag === 164 ? [2] : token.tag === 163 ? [2] : token.tag === 178 ? [2] : token.tag === 173 ? [2] : token.tag === 177 ? [2] : token.tag === 172 ? [2] : token.tag === 175 ? [2] : token.tag === 171 ? [2] : token.tag === 174 ? [2] : token.tag === 170 ? [2] : token.tag === 169 ? [2] : token.tag === 168 ? [2] : token.tag === 167 ? [2] : token.tag === 166 ? [2] : token.tag === 176 ? [3] : token.tag === 183 ? token.data === "mod" ? [4] : token.data === "land" ? [4] : token.data === "lor" ? [4] : token.data === "lxor" ? [4] : [6] : token.tag === 188 ? token.data === "lsl" ? [4] : token.data === "lsr" ? [4] : token.data === "asr" ? [4] : [6] : token.tag === 100 ? [5] : token.tag === 63 ? [5] : token.tag === 80 ? [5] : token.tag === 79 ? [5] : token.tag === 156 ? [5] : token.tag === 181 ? [5] : token.tag === 184 ? [5] : token.tag === 81 ? [5] : token.tag === 89 ? [5] : token.tag === 90 ? [5] : token.tag === 143 ? [5] : token.tag === 75 ? [5] : token.tag === 76 ? [5] : token.tag === 82 ? [5] : token.tag === 33 ? [5] : token.tag === 83 ? [5] : token.tag === 70 ? [5] : token.tag === 155 ? [5] : token.tag === 62 ? [5] : token.tag === 180 ? [5] : token.tag === 187 ? [6] : token.tag === 179 ? [6] : token.tag === 182 ? [6] : token.tag === 185 ? [6] : token.tag === 142 ? [7] : token.tag === 97 ? [8] : token.tag === 77 ? [9] : token.tag === 57 ? [10] : token.tag === 88 ? [11] : token.tag === 96 ? [11] : token.tag === 84 ? [11] : token.tag === 68 ? [11] : token.tag === 78 ? [11] : token.tag === 91 ? [12] : token.tag === 67 ? [12] : token.tag === 186 ? [12] : token.tag === 158 ? [13] : token.tag === 159 ? [14] : token.tag === 92 ? [15] : token.tag === 93 ? [16] : token.tag === 94 ? [16] : token.tag === 95 ? [16] : token.tag === 73 ? [17] : token.tag === 64 ? [17] : token.tag === 153 ? [18] : token.tag === 71 ? [18] : token.tag === 74 ? [18] : token.tag === 72 ? [18] : token.tag === 66 ? [19] : token.tag === 54 ? [19] : token.tag === 99 ? [19] : token.tag === 154 ? [20] : token.tag === 58 ? [20] : token.tag === 59 ? [20] : token.tag === 60 ? [20] : token.tag === 61 ? [20] : token.tag === 65 ? [20] : token.tag === 42 ? [21] : token.tag === 43 ? [21] : token.tag === 44 ? [21] : token.tag === 152 ? [21] : token.tag === 45 ? [21] : token.tag === 151 ? [21] : token.tag === 112 ? [21] : token.tag === 150 ? [21] : token.tag === 53 ? [21] : token.tag === 52 ? [21] : token.tag === 51 ? [21] : token.tag === 50 ? [21] : token.tag === 49 ? [21] : token.tag === 48 ? [21] : token.tag === 47 ? [21] : token.tag === 46 ? [21] : token.tag === 149 ? [21] : token.tag === 133 ? [21] : token.tag === 115 ? [21] : token.tag === 19 ? [21] : token.tag === 21 ? [21] : token.tag === 20 ? [21] : token.tag === 22 ? [21] : token.tag === 18 ? [21] : token.tag === 15 ? [21] : token.tag === 16 ? [21] : token.tag === 17 ? [21] : token.tag === 28 ? [21] : token.tag === 27 ? [21] : token.tag === 32 ? [21] : token.tag === 31 ? [21] : token.tag === 157 ? [21] : token.tag === 30 ? [21] : token.tag === 26 ? [21] : token.tag === 25 ? [21] : token.tag === 24 ? [21] : token.tag === 23 ? [21] : token.tag === 12 ? [21] : token.tag === 129 ? [21] : token.tag === 29 ? [21] : token.tag === 161 ? [21] : token.tag === 162 ? [21] : token.tag === 14 ? [21] : token.tag === 140 ? [21] : token.tag === 98 ? [21] : token.tag === 69 ? [21] : token.tag === 56 ? [21] : token.tag === 55 ? [21] : token.tag === 144 ? [21] : token.tag === 145 ? [21] : token.tag === 146 ? [21] : token.tag === 147 ? [21] : token.tag === 148 ? [21] : token.tag === 130 ? [21] : token.tag === 131 ? [21] : token.tag === 132 ? [21] : token.tag === 134 ? [21] : token.tag === 138 ? [21] : token.tag === 120 ? [21] : token.tag === 121 ? [21] : token.tag === 122 ? [21] : token.tag === 123 ? [21] : token.tag === 124 ? [21] : token.tag === 128 ? [21] : token.tag === 114 ? [21] : token.tag === 116 ? [21] : token.tag === 117 ? [21] : token.tag === 118 ? [21] : token.tag === 119 ? [21] : token.tag === 101 ? [21] : token.tag === 102 ? [21] : token.tag === 41 ? [21] : token.tag === 40 ? [21] : token.tag === 111 ? [21] : token.tag === 103 ? [21] : token.tag === 105 ? [21] : token.tag === 106 ? [21] : token.tag === 107 ? [21] : token.tag === 108 ? [21] : token.tag === 109 ? [21] : token.tag === 110 ? [21] : token.tag === 85 ? [21] : token.tag === 86 ? [21] : token.tag === 87 ? [21] : token.tag === 125 ? [21] : token.tag === 104 ? [21] : token.tag === 139 ? [21] : token.tag === 136 ? [21] : token.tag === 137 ? [21] : token.tag === 160 ? [21] : token.tag === 126 ? [21] : token.tag === 113 ? [21] : token.tag === 34 ? [21] : token.tag === 13 ? [21] : token.tag === 35 ? [21] : token.tag === 36 ? [21] : token.tag === 37 ? [21] : token.tag === 38 ? [21] : token.tag === 39 ? [21] : token.tag === 135 ? [22] : token.tag === 141 ? [23] : token.tag === 6 ? [24] : token.tag === 5 ? [24] : token.tag === 0 ? [24] : token.tag === 1 ? [24] : token.tag === 2 ? [24] : token.tag === 7 ? [25] : token.tag === 11 ? [26] : token.tag === 4 ? [26] : token.tag === 3 ? [27] : token.tag === 8 ? [28] : token.tag === 9 ? [29] : token.tag === 190 ? [30] : token.tag === 192 ? [31] : token.tag === 191 ? [31] : token.tag === 165 ? [31] : token.tag === 10 ? [32] : [0, token.data];

    switch ($var1[0]) {
      case 0:
        if ($var1[1].length <= 0) {
          return [3, 2, 0];
        } else if (System.Char.ToUpperInvariant($var1[1][0]) === $var1[1][0]) {
          return [5, 2, 0];
        } else {
          return [3, 2, 0];
        }

      case 1:
        return [3, 2, 0];

      case 2:
        return [9, 4, 0];

      case 3:
        return [9, 5, 0];

      case 4:
        return [1, 1, 0];

      case 5:
        return [10, 5, 0];

      case 6:
        return [10, 5, 0];

      case 7:
        return [10, 5, 1];

      case 8:
        return [11, 6, 32];

      case 9:
        return [11, 6, 1];

      case 10:
        return [11, 6, 0];

      case 11:
        return [11, 6, 0];

      case 12:
        return [3, 2, 0];

      case 13:
        return [11, 5, 16];

      case 14:
        return [11, 5, 64];

      case 15:
        return [11, 6, 16 | 2];

      case 16:
        return [11, 6, 64 | 2];

      case 17:
        return [11, 6, 0];

      case 18:
        return [11, 6, 2];

      case 19:
        return [11, 6, 0];

      case 20:
        return [11, 6, 2];

      case 21:
        return [1, 1, 0];

      case 22:
        return [1, 1, 0];

      case 23:
        return [1, 1, 0];

      case 24:
        return [8, 8, 0];

      case 25:
        return [7, 8, 0];

      case 26:
        return [0, 8, 0];

      case 27:
        return [2, 10, 0];

      case 28:
        return [2, 9, 0];

      case 29:
        return [4, 3, 0];

      case 30:
        return [1, 1, 0];

      case 31:
        return [4, 3, 0];

      case 32:
        throw new Error("tokenInfo");
    }
  };

  return __exports;
}({});
export const TestExpose = function (__exports) {
  const TokenInfo = __exports.TokenInfo = function (tok) {
    return TokenClassifications.tokenInfo(tok);
  };

  return __exports;
}({});
export const LexerStateEncoding = function (__exports) {
  const computeNextLexState = __exports.computeNextLexState = function (token, prevLexcont) {
    const $var2 = token.tag === 5 ? [0, token.data] : token.tag === 6 ? [0, token.data] : token.tag === 0 ? [0, token.data[2]] : token.tag === 1 ? [0, token.data[2]] : token.tag === 2 ? [0, token.data[2]] : token.tag === 7 ? [0, token.data] : token.tag === 4 ? [0, token.data] : token.tag === 3 ? [0, token.data] : token.tag === 8 ? [0, token.data] : token.tag === 9 ? [0, token.data] : token.tag === 10 ? [0, token.data] : token.tag === 192 ? [1] : token.tag === 191 ? [1] : [2];

    switch ($var2[0]) {
      case 0:
        return $var2[1];

      case 1:
        return new LexerWhitespaceContinuation(0, prevLexcont.LexerIfdefStack);

      case 2:
        return prevLexcont;
    }
  };

  const revertToDefaultLexCont = __exports.revertToDefaultLexCont = new LexerWhitespaceContinuation(0, new List());

  const resize32 = __exports.resize32 = function (i) {
    return fromNumber(i, false);
  };

  const lexstateNumBits = __exports.lexstateNumBits = 4;
  const ncommentsNumBits = __exports.ncommentsNumBits = 2;
  const startPosNumBits = __exports.startPosNumBits = pos.EncodingSize;
  const hardwhiteNumBits = __exports.hardwhiteNumBits = 1;
  const ifdefstackCountNumBits = __exports.ifdefstackCountNumBits = 4;
  const ifdefstackNumBits = __exports.ifdefstackNumBits = 16;
  const lexstateStart = __exports.lexstateStart = 0;
  const ncommentsStart = __exports.ncommentsStart = lexstateNumBits;
  const startPosStart = __exports.startPosStart = lexstateNumBits + ncommentsNumBits;
  const hardwhitePosStart = __exports.hardwhitePosStart = lexstateNumBits + ncommentsNumBits + startPosNumBits;
  const ifdefstackCountStart = __exports.ifdefstackCountStart = lexstateNumBits + ncommentsNumBits + startPosNumBits + hardwhiteNumBits;
  const ifdefstackStart = __exports.ifdefstackStart = lexstateNumBits + ncommentsNumBits + startPosNumBits + hardwhiteNumBits + ifdefstackCountNumBits;
  const lexstateMask = __exports.lexstateMask = Bits.mask64(lexstateStart, lexstateNumBits);
  const ncommentsMask = __exports.ncommentsMask = Bits.mask64(ncommentsStart, ncommentsNumBits);
  const startPosMask = __exports.startPosMask = Bits.mask64(startPosStart, startPosNumBits);
  const hardwhitePosMask = __exports.hardwhitePosMask = Bits.mask64(hardwhitePosStart, hardwhiteNumBits);
  const ifdefstackCountMask = __exports.ifdefstackCountMask = Bits.mask64(ifdefstackCountStart, ifdefstackCountNumBits);
  const ifdefstackMask = __exports.ifdefstackMask = Bits.mask64(ifdefstackStart, ifdefstackNumBits);

  const bitOfBool = __exports.bitOfBool = function (b) {
    if (b) {
      return 1;
    } else {
      return 0;
    }
  };

  const boolOfBit = __exports.boolOfBit = function (n) {
    return n.Equals(fromBits(1, 0, false));
  };

  const encodeLexCont = __exports.encodeLexCont = function (colorState, ncomments, b, ifdefStack, light) {
    let ifdefStackCount = 0;
    let ifdefStackBits = 0;

    for (let ifOrElse of ifdefStack) {
      if (ifOrElse[0].tag === 1) {
        ifdefStackBits = ifdefStackBits | 1 << ifdefStackCount | 0;
      }

      ifdefStackCount = ifdefStackCount + 1 | 0;
    }

    const lexstate = fromNumber(colorState, false);
    return lexstate.shl(lexstateStart).and(lexstateMask).or(ncomments.shl(ncommentsStart).and(ncommentsMask)).or(resize32(b.Encoding).shl(startPosStart).and(startPosMask)).or(resize32(bitOfBool(light)).shl(hardwhitePosStart).and(hardwhitePosMask)).or(resize32(ifdefStackCount).shl(ifdefstackCountStart).and(ifdefstackCountMask)).or(resize32(ifdefStackBits).shl(ifdefstackStart).and(ifdefstackMask));
  };

  const decodeLexCont = __exports.decodeLexCont = function (state) {
    let ifDefs = new List();
    const ifdefStackCount = ~~state.and(ifdefstackCountMask).shr(ifdefstackCountStart).toNumber() | 0;

    if (ifdefStackCount > 0) {
      const ifdefStack = ~~state.and(ifdefstackMask).shr(ifdefstackStart).toNumber() | 0;

      for (let i = 1; i <= ifdefStackCount; i++) {
        const bit = ifdefStackCount - i | 0;
        const mask = 1 << bit | 0;
        const ifDef = (ifdefStack & mask) === 0 ? new LexerIfdefStackEntry(0) : new LexerIfdefStackEntry(1);
        ifDefs = new List([ifDef, range0], ifDefs);
      }
    }

    return [~~state.and(lexstateMask).shr(lexstateStart).toNumber(), ~~state.and(ncommentsMask).shr(ncommentsStart).toNumber(), pos.Decode(~~state.and(startPosMask).shr(startPosStart).toNumber()), ifDefs, boolOfBit(state.and(hardwhitePosMask).shr(hardwhitePosStart))];
  };

  const encodeLexInt = __exports.encodeLexInt = function (lightSyntaxStatus, lexcont) {
    const patternInput = lexcont.tag === 1 ? [3, resize32(lexcont.data[1]), lexcont.data[2].Start, lexcont.data[0]] : lexcont.tag === 11 ? lexcont.data.tag === 0 ? [12, fromBits(0, 0, false), pos0, lexcont.data.data] : [11, resize32(lexcont.data.data[1]), lexcont.data.data[2].Start, lexcont.data.data[0]] : lexcont.tag === 2 ? [4, fromBits(0, 0, false), lexcont.data[1].Start, lexcont.data[0]] : lexcont.tag === 5 ? [5, resize32(lexcont.data[1]), lexcont.data[2].Start, lexcont.data[0]] : lexcont.tag === 6 ? [10, resize32(lexcont.data[1]), lexcont.data[2].Start, lexcont.data[0]] : lexcont.tag === 7 ? [6, resize32(lexcont.data[1]), lexcont.data[2].Start, lexcont.data[0]] : lexcont.tag === 8 ? [7, resize32(lexcont.data[1]), lexcont.data[2].Start, lexcont.data[0]] : lexcont.tag === 9 ? [14, resize32(lexcont.data[1]), lexcont.data[2].Start, lexcont.data[0]] : lexcont.tag === 10 ? [8, fromBits(0, 0, false), lexcont.data[1].Start, lexcont.data[0]] : lexcont.tag === 3 ? [9, fromBits(0, 0, false), lexcont.data[1].Start, lexcont.data[0]] : lexcont.tag === 4 ? [13, fromBits(0, 0, false), lexcont.data[1].Start, lexcont.data[0]] : [1, fromBits(0, 0, false), pos0, lexcont.data];
    return encodeLexCont(patternInput[0], patternInput[1], patternInput[2], patternInput[3], lightSyntaxStatus);
  };

  const decodeLexInt = __exports.decodeLexInt = function (state) {
    const patternInput = decodeLexCont(state);
    let lexcont;

    switch (patternInput[0]) {
      case 1:
        lexcont = new LexerWhitespaceContinuation(0, patternInput[3]);
        break;

      case 3:
        lexcont = new LexerWhitespaceContinuation(1, [patternInput[3], patternInput[1], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 4:
        lexcont = new LexerWhitespaceContinuation(2, [patternInput[3], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 5:
        lexcont = new LexerWhitespaceContinuation(5, [patternInput[3], patternInput[1], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 10:
        lexcont = new LexerWhitespaceContinuation(6, [patternInput[3], patternInput[1], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 6:
        lexcont = new LexerWhitespaceContinuation(7, [patternInput[3], patternInput[1], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 7:
        lexcont = new LexerWhitespaceContinuation(8, [patternInput[3], patternInput[1], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 14:
        lexcont = new LexerWhitespaceContinuation(9, [patternInput[3], patternInput[1], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 8:
        lexcont = new LexerWhitespaceContinuation(10, [patternInput[3], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 9:
        lexcont = new LexerWhitespaceContinuation(3, [patternInput[3], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 13:
        lexcont = new LexerWhitespaceContinuation(4, [patternInput[3], mkRange("file", patternInput[2], patternInput[2])]);
        break;

      case 11:
        lexcont = new LexerWhitespaceContinuation(11, new LexerEndlineContinuation(1, [patternInput[3], patternInput[1], mkRange("file", patternInput[2], patternInput[2])]));
        break;

      case 12:
        lexcont = new LexerWhitespaceContinuation(11, new LexerEndlineContinuation(0, patternInput[3]));
        break;

      default:
        lexcont = new LexerWhitespaceContinuation(0, new List());
    }

    return [patternInput[4], lexcont];
  };

  const callLexCont = __exports.callLexCont = function (lexcont, args, skip, lexbuf) {
    const argsWithIfDefs = function (ifd) {
      if (args.ifdefStack.contents.Equals(ifd)) {
        return args;
      } else {
        const ifdefStack = {
          contents: ifd
        };
        return new lexargs_1(args.defines, ifdefStack, args.resourceManager, args.lightSyntaxStatus, args.errorLogger, args.applyLineDirectives);
      }
    };

    switch (lexcont.tag) {
      case 0:
        return token_3(argsWithIfDefs(lexcont.data), skip, lexbuf);

      case 1:
        return ifdefSkip(lexcont.data[1], lexcont.data[2], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 2:
        return string(ByteBuffer.Create(100), function (arg00_, arg10_, arg20_) {
          return defaultStringFinisher(arg00_, arg10_, arg20_);
        }, lexcont.data[1], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 5:
        return comment_1(lexcont.data[1], lexcont.data[2], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 6:
        return singleLineComment(null, lexcont.data[1], lexcont.data[2], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 7:
        return stringInComment(lexcont.data[1], lexcont.data[2], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 8:
        return verbatimStringInComment(lexcont.data[1], lexcont.data[2], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 9:
        return tripleQuoteStringInComment(lexcont.data[1], lexcont.data[2], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 10:
        return mlOnly(lexcont.data[1], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 3:
        return verbatimString(ByteBuffer.Create(100), function (arg00__1, arg10__1, arg20__1) {
          return defaultStringFinisher(arg00__1, arg10__1, arg20__1);
        }, lexcont.data[1], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      case 4:
        return tripleQuoteString(ByteBuffer.Create(100), function (arg00__2, arg10__2, arg20__2) {
          return defaultStringFinisher(arg00__2, arg10__2, arg20__2);
        }, lexcont.data[1], argsWithIfDefs(lexcont.data[0]), skip, lexbuf);

      default:
        return endline(lexcont.data, args, skip, lexbuf);
    }
  };

  return __exports;
}({});
export class FSharpLineTokenizer {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpLineTokenizer",
      properties: {}
    };
  }

  constructor(lexbuf, maxLength, filename, lexArgsLightOn, lexArgsLightOff) {
    this.lexbuf = lexbuf;
    this.maxLength = maxLength;
    this.lexArgsLightOn = lexArgsLightOn;
    this.lexArgsLightOff = lexArgsLightOff;
    this.skip = false;
    this.singleLineTokenState = 0;

    if (filename != null) {
      this.fsx = IsScript(getValue(filename));
    } else {
      this.fsx = false;
    }

    this.tokenStack = Stack[".ctor"](31);

    if (filename != null) {
      resetLexbufPos(getValue(filename), this.lexbuf);
    } else {
      this.lexbuf.EndPos = Position.Empty;
    }
  }

  ScanToken(lexintInitial) {
    var copyOfStruct;
    var copyOfStruct_1;
    const unwindBP = PushThreadBuildPhaseUntilUnwind(new BuildPhase(3));

    try {
      const unwindEL = PushErrorLoggerPhaseUntilUnwind(_arg1 => DiscardErrorsLogger);

      try {
        const patternInput = LexerStateEncoding.decodeLexInt(lexintInitial);
        const lightSyntaxStatus = LightSyntaxStatus[".ctor"](patternInput[0], false);
        const lexargs = patternInput[0] ? this.lexArgsLightOn : this.lexArgsLightOff;

        const GetTokenWithPosition = lexcontInitial => {
          var m_2;
          var lineStr_2;
          var cont_2;
          var ofs;
          var m_1;
          var lineStr_1;
          var cont_1;
          var ofs_1;
          var m;
          var lineStr;
          var cont;
          var ofs_2;

          const ColumnsOfCurrentToken = () => {
            const leftp = this.lexbuf.StartPos;
            const rightp = this.lexbuf.EndPos;
            const leftc = leftp.Column | 0;
            let rightc;
            const $var3 = this.maxLength != null ? rightp.Line > leftp.Line ? [0, getValue(this.maxLength)] : [1] : [1];

            switch ($var3[0]) {
              case 0:
                rightc = $var3[1] | 0;
                break;

              case 1:
                rightc = rightp.Column | 0;
                break;
            }

            const rightc_1 = rightc - 1 | 0;
            return [leftc, rightc_1];
          };

          try {
            if (this.tokenStack.Count > 0) {
              return [true, this.tokenStack.Pop()];
            } else {
              const token = LexerStateEncoding.callLexCont(lexcontInitial, lexargs, this.skip, this.lexbuf);
              const patternInput_1 = ColumnsOfCurrentToken();
              const $var4 = token.tag === 0 ? (m_2 = token.data[0], lineStr_2 = token.data[1], cont_2 = token.data[2], lineStr_2 !== "") ? [0, token.data[2], token.data[1], token.data[0]] : [1] : [1];

              switch ($var4[0]) {
                case 0:
                  return [false, (ofs = $var4[3].StartColumn | 0, this.processHashIfLine(ofs, $var4[2], $var4[1]))];

                case 1:
                  const $var5 = token.tag === 1 ? (m_1 = token.data[0], lineStr_1 = token.data[1], cont_1 = token.data[2], lineStr_1 !== "") ? [0, token.data[2], token.data[1], token.data[0]] : [1] : [1];

                  switch ($var5[0]) {
                    case 0:
                      return [false, (ofs_1 = $var5[3].StartColumn | 0, this.processHashEndElse(ofs_1, $var5[2], 4, $var5[1]))];

                    case 1:
                      const $var6 = token.tag === 2 ? (m = token.data[0], lineStr = token.data[1], cont = token.data[2], lineStr !== "") ? [0, token.data[2], token.data[1], token.data[0]] : [1] : [1];

                      switch ($var6[0]) {
                        case 0:
                          return [false, (ofs_2 = $var6[3].StartColumn | 0, this.processHashEndElse(ofs_2, $var6[2], 5, $var6[1]))];

                        case 1:
                          let $var7;

                          if (token.tag === 155) {
                            $var7 = [0, token.data[1], token.data[0]];
                          } else if (token.tag === 187) {
                            const activePatternResult52731 = _TyparsCloseOp___(token.data);

                            if (activePatternResult52731 != null) {
                              $var7 = [1, getValue(activePatternResult52731)[1], getValue(activePatternResult52731)[0], token.data];
                            } else {
                              $var7 = [2];
                            }
                          } else {
                            $var7 = [2];
                          }

                          switch ($var7[0]) {
                            case 0:
                              const arg10_ = new token_2(77);
                              this.delayToken(arg10_, patternInput_1[1], patternInput_1[1]);
                              return [false, [new token_2(154, [$var7[2], $var7[1]]), patternInput_1[0], patternInput_1[1] - 1]];

                            case 1:
                              if ($var7[1] != null) {
                                const arg11_ = patternInput_1[0] + $var7[2].length | 0;
                                this.delayToken(getValue($var7[1]), arg11_, patternInput_1[1]);
                              }

                              for (let i = $var7[2].length - 1; i >= 1; i--) {
                                const arg10__1 = $var7[2][i](false);
                                const arg11__1 = patternInput_1[0] + i | 0;
                                const arg12_ = patternInput_1[1] - $var7[3].length + i + 1 | 0;
                                this.delayToken(arg10__1, arg11__1, arg12_);
                              }

                              return [false, [$var7[2][0](false), patternInput_1[0], patternInput_1[1] - $var7[3].length + 1]];

                            case 2:
                              const $var8 = token.tag === 188 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                              switch ($var8[0]) {
                                case 0:
                                  const arg10__2 = new token_2(188, $var8[1].substr(1));
                                  const arg11__2 = patternInput_1[0] + 1 | 0;
                                  this.delayToken(arg10__2, arg11__2, patternInput_1[1]);
                                  return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                case 1:
                                  const $var9 = token.tag === 181 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                  switch ($var9[0]) {
                                    case 0:
                                      const arg10__3 = new token_2(181, $var9[1].substr(1));
                                      const arg11__3 = patternInput_1[0] + 1 | 0;
                                      this.delayToken(arg10__3, arg11__3, patternInput_1[1]);
                                      return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                    case 1:
                                      const $var10 = token.tag === 187 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                      switch ($var10[0]) {
                                        case 0:
                                          const arg10__4 = new token_2(187, $var10[1].substr(1));
                                          const arg11__4 = patternInput_1[0] + 1 | 0;
                                          this.delayToken(arg10__4, arg11__4, patternInput_1[1]);
                                          return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                        case 1:
                                          const $var11 = token.tag === 186 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                          switch ($var11[0]) {
                                            case 0:
                                              const arg10__5 = new token_2(186, $var11[1].substr(1));
                                              const arg11__5 = patternInput_1[0] + 1 | 0;
                                              this.delayToken(arg10__5, arg11__5, patternInput_1[1]);
                                              return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                            case 1:
                                              const $var12 = token.tag === 185 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                              switch ($var12[0]) {
                                                case 0:
                                                  const arg10__6 = new token_2(185, $var12[1].substr(1));
                                                  const arg11__6 = patternInput_1[0] + 1 | 0;
                                                  this.delayToken(arg10__6, arg11__6, patternInput_1[1]);
                                                  return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                                case 1:
                                                  const $var13 = token.tag === 184 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                                  switch ($var13[0]) {
                                                    case 0:
                                                      const arg10__7 = new token_2(184, $var13[1].substr(1));
                                                      const arg11__7 = patternInput_1[0] + 1 | 0;
                                                      this.delayToken(arg10__7, arg11__7, patternInput_1[1]);
                                                      return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                                    case 1:
                                                      const $var14 = token.tag === 183 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                                      switch ($var14[0]) {
                                                        case 0:
                                                          const arg10__8 = new token_2(183, $var14[1].substr(1));
                                                          const arg11__8 = patternInput_1[0] + 1 | 0;
                                                          this.delayToken(arg10__8, arg11__8, patternInput_1[1]);
                                                          return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                                        case 1:
                                                          const $var15 = token.tag === 182 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                                          switch ($var15[0]) {
                                                            case 0:
                                                              const arg10__9 = new token_2(182, $var15[1].substr(1));
                                                              const arg11__9 = patternInput_1[0] + 1 | 0;
                                                              this.delayToken(arg10__9, arg11__9, patternInput_1[1]);
                                                              return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                                            case 1:
                                                              const $var16 = token.tag === 180 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                                              switch ($var16[0]) {
                                                                case 0:
                                                                  const arg10__10 = new token_2(180, $var16[1].substr(1));
                                                                  const arg11__10 = patternInput_1[0] + 1 | 0;
                                                                  this.delayToken(arg10__10, arg11__10, patternInput_1[1]);
                                                                  return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                                                case 1:
                                                                  const $var17 = token.tag === 179 ? token.data.indexOf(".") === 0 ? [0, token.data] : [1] : [1];

                                                                  switch ($var17[0]) {
                                                                    case 0:
                                                                      const arg10__11 = new token_2(179, $var17[1].substr(1));
                                                                      const arg11__11 = patternInput_1[0] + 1 | 0;
                                                                      this.delayToken(arg10__11, arg11__11, patternInput_1[1]);
                                                                      return [false, [new token_2(77), patternInput_1[0], patternInput_1[0]]];

                                                                    case 1:
                                                                      return [false, [token, patternInput_1[0], patternInput_1[1]]];
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
          } catch (e) {
            return [false, [new token_2(10, LexerStateEncoding.revertToDefaultLexCont), 0, 0]];
          }
        };

        const patternInput_2 = GetTokenWithPosition(patternInput[1]);
        const token_1 = patternInput_2[1][0];
        const rightc_2 = patternInput_2[1][2] | 0;
        const leftc_1 = patternInput_2[1][1] | 0;
        let patternInput_4;

        if (token_1.tag === 10) {
          patternInput_4 = [null, token_1.data, 0];
        } else if (token_1.tag === 11) {
          patternInput_4 = [null, LexerStateEncoding.revertToDefaultLexCont, 0];
        } else {
          const patternInput_3 = TokenClassifications.tokenInfo(token_1);
          const lexcontFinal = patternInput_2[0] ? patternInput[1] : LexerStateEncoding.computeNextLexState(token_1, patternInput[1]);
          const tokenTag = tagOfToken(token_1) | 0;
          const fullMatchedLength = (copyOfStruct = this.lexbuf.EndPos, copyOfStruct.AbsoluteOffset) - (copyOfStruct_1 = this.lexbuf.StartPos, copyOfStruct_1.AbsoluteOffset) | 0;
          let tokenData;
          const TokenName = token_to_string(token_1);
          tokenData = new FSharpTokenInfo(leftc_1, rightc_2, patternInput_3[0], patternInput_3[1], patternInput_3[2], tokenTag, TokenName, fullMatchedLength);
          patternInput_4 = [tokenData, lexcontFinal, tokenTag];
        }

        const FinalState = lexcontFinal_1 => {
          return LexerStateEncoding.encodeLexInt(lightSyntaxStatus.Status, lexcontFinal_1);
        };

        let patternInput_6;
        const lexintFinal = FinalState(patternInput_4[1]);
        const matchValue = [patternInput_4[0], this.singleLineTokenState, tokenTagToTokenId(patternInput_4[2])];
        const $var18 = matchValue[0] != null ? matchValue[1] === 0 ? matchValue[2].tag === 88 ? [0, getValue(matchValue[0])] : matchValue[2].tag === 4 ? [1] : [2] : [2] : matchValue[1] === 0 ? matchValue[2].tag === 4 ? [1] : [2] : [2];

        switch ($var18[0]) {
          case 0:
            this.singleLineTokenState = 1;
            const patternInput_5 = GetTokenWithPosition(patternInput[1]);
            const rightc_3 = patternInput_5[1][2] | 0;
            const nextToken = patternInput_5[1][0];

            if (nextToken.tag === 189) {
              const matchValue_1 = [this.fsx, nextToken.data];
              const $var19 = matchValue_1[0] ? matchValue_1[1] === "r" ? [0] : matchValue_1[1] === "reference" ? [0] : matchValue_1[1] === "I" ? [0] : matchValue_1[1] === "load" ? [0] : matchValue_1[1] === "time" ? [0] : matchValue_1[1] === "dbgbreak" ? [0] : matchValue_1[1] === "cd" ? [0] : matchValue_1[1] === "silentCd" ? [0] : matchValue_1[1] === "q" ? [0] : matchValue_1[1] === "quit" ? [0] : matchValue_1[1] === "help" ? [0] : matchValue_1[1] === "nowarn" ? [0] : [1] : matchValue_1[1] === "nowarn" ? [0] : [1];

              switch ($var19[0]) {
                case 0:
                  const lexcontFinal_2 = patternInput_5[0] ? patternInput[1] : LexerStateEncoding.computeNextLexState(token_1, patternInput[1]);
                  const tokenData_1 = new FSharpTokenInfo($var18[1].LeftColumn, rightc_3, 8, 1, 0, $var18[1].Tag, $var18[1].TokenName, $var18[1].FullMatchedLength);
                  const lexintFinal_1 = FinalState(lexcontFinal_2);
                  patternInput_6 = [tokenData_1, lexintFinal_1];
                  break;

                case 1:
                  patternInput_6 = [patternInput_4[0], lexintFinal];
                  break;
              }
            } else {
              patternInput_6 = [patternInput_4[0], lexintFinal];
            }

            break;

          case 1:
            patternInput_6 = [patternInput_4[0], lexintFinal];
            break;

          case 2:
            this.singleLineTokenState = 1;
            patternInput_6 = [patternInput_4[0], lexintFinal];
            break;
        }

        return [patternInput_6[0], patternInput_6[1]];
      } finally {
        if (hasInterface(unwindEL, "System.IDisposable")) {
          unwindEL.Dispose();
        }
      }
    } finally {
      if (hasInterface(unwindBP, "System.IDisposable")) {
        unwindBP.Dispose();
      }
    }
  }

  static ColorStateOfLexState(lexState) {
    const patternInput = LexerStateEncoding.decodeLexCont(lexState);
    return patternInput[0] | 0;
  }

  static LexStateOfColorState(colorState) {
    const position = pos0;
    const ifdefStack = new List();
    return LexerStateEncoding.encodeLexCont(colorState, fromBits(0, 0, false), position, ifdefStack, true);
  }

  delayToken(tok_0, tok_1, tok_2) {
    const tok = [tok_0, tok_1, tok_2];
    this.tokenStack.Push(tok);
  }

  processDirective(str, directiveLength, delay, cont) {
    const hashIdx = str.indexOf("#") | 0;

    if (hashIdx !== 0) {
      delay([new token_2(4, cont), 0, hashIdx - 1]);
    }

    delay([new token_2(0, [range0, "", cont]), hashIdx, hashIdx + directiveLength]);
    return hashIdx + directiveLength + 1 | 0;
  }

  processWhiteAndComment(str, offset, delay, cont) {
    const rest = str.substr(offset, str.length - offset);
    const comment = rest.indexOf("/") | 0;
    const spaceLength = (comment === -1 ? rest.length : comment) | 0;

    if (spaceLength > 0) {
      delay([new token_2(4, cont), offset, offset + spaceLength - 1]);
    }

    if (comment !== -1) {
      delay([new token_2(3, cont), offset + comment, offset + rest.length - 1]);
    }
  }

  processDirectiveLine(ofs, f) {
    const delayed = [];
    f(tupledArg => {
      delayed.push([tupledArg[0], tupledArg[1] + ofs, tupledArg[2] + ofs]);
    });

    for (let i = delayed.length - 1; i >= 1; i--) {
      const tupledArg_1 = delayed[i];
      this.delayToken(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]);
    }

    return delayed[0];
  }

  processHashEndElse(ofs, str, length, cont) {
    const f = delay => {
      const offset = this.processDirective(str, length, delay, cont) | 0;
      this.processWhiteAndComment(str, offset, delay, cont);
    };

    return this.processDirectiveLine(ofs, f);
  }

  processHashIfLine(ofs, str, cont) {
    const With = (n, m) => {
      if (n < 0) {
        return m | 0;
      } else {
        return n | 0;
      }
    };

    const f = delay => {
      const offset = this.processDirective(str, 2, delay, cont) | 0;
      let patternInput;
      const w = str.substr(offset);
      const r = trim(w, "start", " ", "\t");
      patternInput = [r, w.length - r.length];
      const beforeIdent = offset + patternInput[1] | 0;
      const identLength = With(indexOfAny(patternInput[0], ["/", "\t", " "]), patternInput[0].length) | 0;
      delay([new token_2(4, cont), offset, beforeIdent - 1]);
      delay([new token_2(189, patternInput[0].substr(0, identLength)), beforeIdent, beforeIdent + identLength - 1]);
      const offset_1 = beforeIdent + identLength | 0;
      this.processWhiteAndComment(str, offset_1, delay, cont);
    };

    return this.processDirectiveLine(ofs, f);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpLineTokenizer", FSharpLineTokenizer);
export class FSharpSourceTokenizer {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpSourceTokenizer",
      properties: {}
    };
  }

  constructor(defineConstants, filename) {
    this.filename = filename;
    const lexResourceManager = LexResourceManager[".ctor"]();
    this.lexArgsLightOn = mkLexargs(this.filename, defineConstants, LightSyntaxStatus[".ctor"](true, false), lexResourceManager, {
      contents: new List()
    }, DiscardErrorsLogger);
    this.lexArgsLightOff = mkLexargs(this.filename, defineConstants, LightSyntaxStatus[".ctor"](false, false), lexResourceManager, {
      contents: new List()
    }, DiscardErrorsLogger);
  }

  static [".ctor"](defineConstants, filename, _arg1) {
    return new FSharpSourceTokenizer(defineConstants, filename);
  }

  CreateLineTokenizer(lineText) {
    const lexbuf = StringAsLexbuf(lineText);
    return new FSharpLineTokenizer(lexbuf, lineText.length, this.filename, this.lexArgsLightOn, this.lexArgsLightOff);
  }

  CreateBufferTokenizer(bufferFiller) {
    const lexbuf = FunctionAsLexbuf(bufferFiller);
    return new FSharpLineTokenizer(lexbuf, null, this.filename, this.lexArgsLightOn, this.lexArgsLightOff);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpSourceTokenizer", FSharpSourceTokenizer);
export const Keywords = function (__exports) {
  const QuoteIdentifierIfNeeded = __exports.QuoteIdentifierIfNeeded = function (s) {
    return Keywords_1.QuoteIdentifierIfNeeded(s);
  };

  const NormalizeIdentifierBackticks = __exports.NormalizeIdentifierBackticks = function (s) {
    return Keywords_1.NormalizeIdentifierBackticks(s);
  };

  const KeywordsWithDescription = __exports.KeywordsWithDescription = Keywords_1.keywordsWithDescription;
  return __exports;
}({});