import { mkSynRange, LexerIfdefExpression } from "../fsharp/ast";
import { Error as _Error, errorR } from "../fsharp/ErrorLogger";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, compareUnions, equals } from "../fable-core/Util";
import { Tables, ParseHelpers, Accept } from "../utils/prim-parsing";
import { SR } from "./FSComp";
import { getValue } from "../fable-core/Option";
export const dummy = new LexerIfdefExpression(3, "DUMMY");
export function doNothing(_arg1, dflt) {
  return dflt;
}
export function fail(ps, i, e_0, e_1) {
  const e = [e_0, e_1];
  const patternInput = ps.InputRange(i);
  const m = mkSynRange(patternInput[0], patternInput[1]);
  errorR(new _Error(e, m));
  return dummy;
}
export class token {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PPParser.token",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["OP_NOT"], ["OP_AND"], ["OP_OR"], ["LPAREN"], ["RPAREN"], ["PRELUDE"], ["EOF"], ["ID", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.PPParser.token", token);
export class tokenId {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PPParser.tokenId",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["TOKEN_OP_NOT"], ["TOKEN_OP_AND"], ["TOKEN_OP_OR"], ["TOKEN_LPAREN"], ["TOKEN_RPAREN"], ["TOKEN_PRELUDE"], ["TOKEN_EOF"], ["TOKEN_ID"], ["TOKEN_end_of_input"], ["TOKEN_error"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.PPParser.tokenId", tokenId);
export class nonTerminalId {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PPParser.nonTerminalId",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NONTERM__startstart"], ["NONTERM_start"], ["NONTERM_Recover"], ["NONTERM_Full"], ["NONTERM_Expr"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.PPParser.nonTerminalId", nonTerminalId);
export function tagOfToken(t) {
  switch (t.tag) {
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

    default:
      return 0;
  }
}
export function tokenTagToTokenId(tokenIdx) {
  switch (tokenIdx) {
    case 0:
      return new tokenId(0);

    case 1:
      return new tokenId(1);

    case 2:
      return new tokenId(2);

    case 3:
      return new tokenId(3);

    case 4:
      return new tokenId(4);

    case 5:
      return new tokenId(5);

    case 6:
      return new tokenId(6);

    case 7:
      return new tokenId(7);

    case 10:
      return new tokenId(8);

    case 8:
      return new tokenId(9);

    default:
      throw new Error("tokenTagToTokenId: bad token");
  }
}
export function prodIdxToNonTerminal(prodIdx) {
  switch (prodIdx) {
    case 0:
      return new nonTerminalId(0);

    case 1:
      return new nonTerminalId(1);

    case 2:
      return new nonTerminalId(2);

    case 3:
      return new nonTerminalId(3);

    case 4:
      return new nonTerminalId(3);

    case 5:
      return new nonTerminalId(4);

    case 6:
      return new nonTerminalId(4);

    case 7:
      return new nonTerminalId(4);

    case 8:
      return new nonTerminalId(4);

    case 9:
      return new nonTerminalId(4);

    case 10:
      return new nonTerminalId(4);

    case 11:
      return new nonTerminalId(4);

    case 12:
      return new nonTerminalId(4);

    case 13:
      return new nonTerminalId(4);

    case 14:
      return new nonTerminalId(4);

    case 15:
      return new nonTerminalId(4);

    case 16:
      return new nonTerminalId(4);

    case 17:
      return new nonTerminalId(4);

    case 18:
      return new nonTerminalId(4);

    default:
      throw new Error("prodIdxToNonTerminal: bad production index");
  }
}
export const _fsyacc_endOfInputTag = 10;
export const _fsyacc_tagOfErrorTerminal = 8;
export function token_to_string(t) {
  switch (t.tag) {
    case 1:
      return "OP_AND";

    case 2:
      return "OP_OR";

    case 3:
      return "LPAREN";

    case 4:
      return "RPAREN";

    case 5:
      return "PRELUDE";

    case 6:
      return "EOF";

    case 7:
      return "ID";

    default:
      return "OP_NOT";
  }
}
export function _fsyacc_dataOfToken(t) {
  switch (t.tag) {
    case 1:
      return null;

    case 2:
      return null;

    case 3:
      return null;

    case 4:
      return null;

    case 5:
      return null;

    case 6:
      return null;

    case 7:
      return t.data;

    default:
      return null;
  }
}
export const _fsyacc_gotos = new Uint16Array([0, 65535, 1, 65535, 0, 1, 11, 65535, 0, 8, 6, 29, 9, 26, 10, 25, 13, 23, 14, 29, 15, 29, 16, 29, 19, 20, 21, 22, 27, 28, 1, 65535, 0, 2, 5, 65535, 5, 6, 9, 10, 13, 14, 17, 15, 18, 16]);
export const _fsyacc_sparseGotoTableRowOffsets = new Uint16Array([0, 1, 3, 15, 17]);
export const _fsyacc_stateToProdIdxsTableElements = new Uint16Array([1, 0, 1, 0, 1, 1, 1, 2, 2, 2, 13, 1, 3, 4, 3, 8, 9, 17, 1, 3, 1, 4, 4, 5, 13, 14, 15, 5, 5, 8, 9, 14, 17, 1, 5, 1, 6, 2, 7, 12, 4, 7, 8, 9, 17, 4, 8, 8, 9, 17, 4, 8, 9, 9, 17, 1, 8, 1, 9, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 13, 2, 14, 17, 1, 15, 1, 16, 1, 16, 1, 17, 1, 18]);
export const _fsyacc_stateToProdIdxsTableRowOffsets = new Uint16Array([0, 2, 4, 6, 8, 11, 13, 18, 20, 22, 27, 33, 35, 37, 40, 45, 50, 55, 57, 59, 61, 63, 65, 67, 69, 71, 74, 76, 78, 80, 82]);
export const _fsyacc_action_rows = 31;
export const _fsyacc_actionTableElements = new Uint16Array([2, 32768, 5, 5, 8, 3, 0, 49152, 0, 16385, 0, 16386, 1, 16386, 4, 24, 7, 32768, 0, 13, 1, 19, 2, 21, 3, 9, 4, 27, 6, 30, 7, 12, 4, 32768, 1, 17, 2, 18, 6, 7, 8, 3, 0, 16387, 0, 16388, 8, 32768, 0, 13, 1, 19, 2, 21, 3, 9, 4, 27, 6, 30, 7, 12, 8, 4, 4, 32768, 1, 17, 2, 18, 4, 11, 8, 3, 0, 16389, 0, 16390, 8, 32768, 0, 13, 1, 19, 2, 21, 3, 9, 4, 27, 6, 30, 7, 12, 8, 3, 1, 16391, 8, 3, 1, 16392, 8, 3, 2, 16393, 1, 17, 8, 3, 7, 32768, 0, 13, 1, 19, 2, 21, 3, 9, 4, 27, 6, 30, 7, 12, 7, 32768, 0, 13, 1, 19, 2, 21, 3, 9, 4, 27, 6, 30, 7, 12, 1, 32768, 8, 3, 0, 16394, 1, 32768, 8, 3, 0, 16395, 0, 16396, 0, 16397, 0, 16398, 0, 16399, 1, 32768, 8, 3, 0, 16400, 0, 16401, 0, 16402]);
export const _fsyacc_actionTableRowOffsets = new Uint16Array([0, 3, 4, 5, 6, 8, 16, 21, 22, 23, 32, 37, 38, 39, 48, 50, 52, 55, 63, 71, 73, 74, 76, 77, 78, 79, 80, 81, 83, 84, 85]);
export const _fsyacc_reductionSymbolCounts = new Uint16Array([1, 1, 1, 3, 1, 3, 1, 2, 3, 3, 2, 2, 2, 3, 3, 2, 2, 2, 1]);
export const _fsyacc_productionToNonTerminalTable = new Uint16Array([0, 1, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
export const _fsyacc_immediateActions = new Uint16Array([65535, 49152, 16385, 16386, 65535, 65535, 65535, 16387, 16388, 65535, 65535, 16389, 16390, 65535, 65535, 65535, 65535, 65535, 65535, 65535, 16394, 65535, 16395, 16396, 16397, 65535, 16399, 65535, 16400, 16401, 16402]);
export function _fsyacc_reductions() {
  return [function (parseState) {
    let _1;

    const data = parseState.GetInput(1);
    _1 = data;
    return (() => {
      throw new Accept(_1);
    })();
  }, function (parseState_1) {
    let _1_1;

    const data_1 = parseState_1.GetInput(1);
    _1_1 = data_1;
    return _1_1;
  }, function (parseState_2) {
    return doNothing(parseState_2, null);
  }, function (parseState_3) {
    let _2;

    const data_2 = parseState_3.GetInput(2);
    _2 = data_2;
    return _2;
  }, function (parseState_4) {
    var tupledArg;

    let _1_2;

    const data_3 = parseState_4.GetInput(1);
    _1_2 = data_3;
    return tupledArg = SR.ppparsMissingToken("#if/#elif"), fail(parseState_4, 1, tupledArg[0], tupledArg[1]);
  }, function (parseState_5) {
    let _2_1;

    const data_4 = parseState_5.GetInput(2);
    _2_1 = data_4;
    return _2_1;
  }, function (parseState_6) {
    let _1_3;

    const data_5 = parseState_6.GetInput(1);
    _1_3 = data_5;
    return new LexerIfdefExpression(3, _1_3);
  }, function (parseState_7) {
    let _2_2;

    const data_6 = parseState_7.GetInput(2);
    _2_2 = data_6;
    return new LexerIfdefExpression(2, _2_2);
  }, function (parseState_8) {
    let _1_4;

    const data_7 = parseState_8.GetInput(1);
    _1_4 = data_7;

    let _3;

    const data_8 = parseState_8.GetInput(3);
    _3 = data_8;
    return new LexerIfdefExpression(0, [_1_4, _3]);
  }, function (parseState_9) {
    let _1_5;

    const data_9 = parseState_9.GetInput(1);
    _1_5 = data_9;

    let _3_1;

    const data_10 = parseState_9.GetInput(3);
    _3_1 = data_10;
    return new LexerIfdefExpression(1, [_1_5, _3_1]);
  }, function (parseState_10) {
    var tupledArg_1;

    let _2_3;

    const data_11 = parseState_10.GetInput(2);
    _2_3 = data_11;
    return tupledArg_1 = SR.ppparsUnexpectedToken("&&"), fail(parseState_10, 1, tupledArg_1[0], tupledArg_1[1]);
  }, function (parseState_11) {
    var tupledArg_2;

    let _2_4;

    const data_12 = parseState_11.GetInput(2);
    _2_4 = data_12;
    return tupledArg_2 = SR.ppparsUnexpectedToken("||"), fail(parseState_11, 1, tupledArg_2[0], tupledArg_2[1]);
  }, function (parseState_12) {
    var tupledArg_3;

    let _2_5;

    const data_13 = parseState_12.GetInput(2);
    _2_5 = data_13;
    return tupledArg_3 = SR.ppparsUnexpectedToken("!"), fail(parseState_12, 1, tupledArg_3[0], tupledArg_3[1]);
  }, function (parseState_13) {
    return doNothing(parseState_13, dummy);
  }, function (parseState_14) {
    var tupledArg_4;

    let _2_6;

    const data_14 = parseState_14.GetInput(2);
    _2_6 = data_14;

    let _3_2;

    const data_15 = parseState_14.GetInput(3);
    _3_2 = data_15;
    return tupledArg_4 = SR.ppparsMissingToken(")"), fail(parseState_14, 3, tupledArg_4[0], tupledArg_4[1]);
  }, function (parseState_15) {
    var tupledArg_5;

    let _2_7;

    const data_16 = parseState_15.GetInput(2);
    _2_7 = data_16;
    return tupledArg_5 = SR.ppparsIncompleteExpression(), fail(parseState_15, 2, tupledArg_5[0], tupledArg_5[1]);
  }, function (parseState_16) {
    var tupledArg_6;

    let _2_8;

    const data_17 = parseState_16.GetInput(2);
    _2_8 = data_17;
    return tupledArg_6 = SR.ppparsUnexpectedToken(")"), fail(parseState_16, 1, tupledArg_6[0], tupledArg_6[1]);
  }, function (parseState_17) {
    var tupledArg_7;

    let _1_6;

    const data_18 = parseState_17.GetInput(1);
    _1_6 = data_18;

    let _2_9;

    const data_19 = parseState_17.GetInput(2);
    _2_9 = data_19;
    return tupledArg_7 = SR.ppparsIncompleteExpression(), fail(parseState_17, 2, tupledArg_7[0], tupledArg_7[1]);
  }, function (parseState_18) {
    var tupledArg_8;
    return tupledArg_8 = SR.ppparsIncompleteExpression(), fail(parseState_18, 1, tupledArg_8[0], tupledArg_8[1]);
  }];
}
export function tables() {
  const reductions = _fsyacc_reductions();

  const parseError = function (ctxt) {
    const matchValue = ParseHelpers.parse_error_rich();

    if (matchValue == null) {
      ParseHelpers.parse_error(ctxt.Message);
    } else {
      getValue(matchValue)(ctxt);
    }
  };

  return new Tables(reductions, _fsyacc_endOfInputTag, function (t) {
    return tagOfToken(t);
  }, function (t_1) {
    return _fsyacc_dataOfToken(t_1);
  }, _fsyacc_actionTableElements, _fsyacc_actionTableRowOffsets, _fsyacc_reductionSymbolCounts, _fsyacc_immediateActions, _fsyacc_gotos, _fsyacc_sparseGotoTableRowOffsets, _fsyacc_stateToProdIdxsTableElements, _fsyacc_stateToProdIdxsTableRowOffsets, _fsyacc_productionToNonTerminalTable, parseError, 11, _fsyacc_tagOfErrorTerminal);
}
export function engine(lexer, lexbuf, startState) {
  return tables().Interpret(lexer, lexbuf, startState);
}
export function start(lexer, lexbuf) {
  return tables().Interpret(lexer, lexbuf, 0);
}