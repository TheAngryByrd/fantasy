import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, Unit, Function as _Function, Array as _Array, GenericParam, Option, Tuple, makeGeneric, Any, equalsRecords } from "../fable-core/Util";
import { Position, LexBuffer } from "./prim-lexing";
import { reverse } from "../fable-core/List";
import List from "../fable-core/List";
import { copyTo } from "../fable-core/Array";
import { empty, append, singleton, collect, range, map, delay, toList } from "../fable-core/Seq";
import { getValue } from "../fable-core/Option";
import { create } from "../fable-core/Set";
import Comparer from "../fable-core/Comparer";
export class RecoverableParseError extends Error {
  constructor() {
    super();
    return Object.setPrototypeOf(this, RecoverableParseError.prototype);
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Parsing.RecoverableParseError",
      interfaces: ["FSharpException"],
      properties: {}
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Internal.Utilities.Text.Parsing.RecoverableParseError", RecoverableParseError);
export class Accept extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, Accept.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Parsing.Accept",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Any
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Internal.Utilities.Text.Parsing.Accept", Accept);
export class IParseState {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Parsing.IParseState",
      properties: {
        LexBuffer: makeGeneric(LexBuffer, {
          Char: "string"
        }),
        ResultEndPosition: Position,
        ResultRange: Tuple([Position, Position]),
        ResultStartPosition: Position
      }
    };
  }

  constructor(ruleStartPoss, ruleEndPoss, lhsPos, ruleValues, lexbuf) {
    this.ruleStartPoss = ruleStartPoss;
    this.ruleEndPoss = ruleEndPoss;
    this.lhsPos = lhsPos;
    this.ruleValues = ruleValues;
    this.lexbuf = lexbuf;
  }

  get LexBuffer() {
    return this.lexbuf;
  }

  InputRange(n) {
    return [this.ruleStartPoss[n - 1], this.ruleEndPoss[n - 1]];
  }

  InputStartPosition(n) {
    return this.ruleStartPoss[n - 1];
  }

  InputEndPosition(n) {
    return this.ruleEndPoss[n - 1];
  }

  get ResultStartPosition() {
    return this.lhsPos[0];
  }

  get ResultEndPosition() {
    return this.lhsPos[1];
  }

  GetInput(n) {
    return this.ruleValues[n - 1];
  }

  get ResultRange() {
    return [this.lhsPos[0], this.lhsPos[1]];
  }

  RaiseError() {
    throw new RecoverableParseError();
  }

}
setType("Internal.Utilities.Text.Parsing.IParseState", IParseState);
export class ParseErrorContext {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Parsing.ParseErrorContext",
      properties: {
        CurrentToken: Option(GenericParam("tok")),
        Message: "string",
        ParseState: IParseState,
        ReduceTokens: makeGeneric(List, {
          T: "number"
        }),
        ReducibleProductions: makeGeneric(List, {
          T: makeGeneric(List, {
            T: "number"
          })
        }),
        ShiftTokens: makeGeneric(List, {
          T: "number"
        }),
        StateStack: makeGeneric(List, {
          T: "number"
        })
      }
    };
  }

  constructor(stateStack, parseState, reduceTokens, currentToken, reducibleProductions, shiftableTokens, message) {
    this.stateStack = stateStack;
    this.parseState = parseState;
    this.reduceTokens = reduceTokens;
    this.currentToken = currentToken;
    this.reducibleProductions = reducibleProductions;
    this.shiftableTokens = shiftableTokens;
    this.message = message;
  }

  get StateStack() {
    return this.stateStack;
  }

  get ReduceTokens() {
    return this.reduceTokens;
  }

  get CurrentToken() {
    return this.currentToken;
  }

  get ParseState() {
    return this.parseState;
  }

  get ReducibleProductions() {
    return this.reducibleProductions;
  }

  get ShiftTokens() {
    return this.shiftableTokens;
  }

  get Message() {
    return this.message;
  }

}
setType("Internal.Utilities.Text.Parsing.ParseErrorContext", ParseErrorContext);
export class Tables {
  constructor(reductions, endOfInputTag, tagOfToken, dataOfToken, actionTableElements, actionTableRowOffsets, reductionSymbolCounts, immediateActions, gotos, sparseGotoTableRowOffsets, stateToProdIdxsTableElements, stateToProdIdxsTableRowOffsets, productionToNonTerminalTable, parseError, numTerminals, tagOfErrorTerminal) {
    this.reductions = reductions;
    this.endOfInputTag = endOfInputTag | 0;
    this.tagOfToken = tagOfToken;
    this.dataOfToken = dataOfToken;
    this.actionTableElements = actionTableElements;
    this.actionTableRowOffsets = actionTableRowOffsets;
    this.reductionSymbolCounts = reductionSymbolCounts;
    this.immediateActions = immediateActions;
    this.gotos = gotos;
    this.sparseGotoTableRowOffsets = sparseGotoTableRowOffsets;
    this.stateToProdIdxsTableElements = stateToProdIdxsTableElements;
    this.stateToProdIdxsTableRowOffsets = stateToProdIdxsTableRowOffsets;
    this.productionToNonTerminalTable = productionToNonTerminalTable;
    this.parseError = parseError;
    this.numTerminals = numTerminals | 0;
    this.tagOfErrorTerminal = tagOfErrorTerminal | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Parsing.Tables",
      interfaces: ["FSharpRecord"],
      properties: {
        reductions: _Array(_Function([IParseState, Any])),
        endOfInputTag: "number",
        tagOfToken: _Function([GenericParam("tok"), "number"]),
        dataOfToken: _Function([GenericParam("tok"), Any]),
        actionTableElements: _Array(Uint16Array, true),
        actionTableRowOffsets: _Array(Uint16Array, true),
        reductionSymbolCounts: _Array(Uint16Array, true),
        immediateActions: _Array(Uint16Array, true),
        gotos: _Array(Uint16Array, true),
        sparseGotoTableRowOffsets: _Array(Uint16Array, true),
        stateToProdIdxsTableElements: _Array(Uint16Array, true),
        stateToProdIdxsTableRowOffsets: _Array(Uint16Array, true),
        productionToNonTerminalTable: _Array(Uint16Array, true),
        parseError: _Function([makeGeneric(ParseErrorContext, {
          tok: GenericParam("tok")
        }), Unit]),
        numTerminals: "number",
        tagOfErrorTerminal: "number"
      }
    };
  }

  Interpret(lexer, lexbuf, initialState) {
    return Implementation.interpret(this, lexer, lexbuf, initialState);
  }

}
setType("Internal.Utilities.Text.Parsing.Tables", Tables);
export class Stack {
  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Text.Parsing.Stack",
      properties: {
        Count: "number",
        IsEmpty: "boolean"
      }
    };
  }

  constructor(n) {
    this.contents = new Array(n).fill(null);
    this.count = 0;
  }

  static [".ctor"](n, _arg1) {
    return new Stack(n);
  }

  Ensure(newSize) {
    const oldSize = this.contents.length | 0;

    if (newSize > oldSize) {
      const old = this.contents;
      this.contents = new Array(newSize > oldSize * 2 ? newSize : oldSize * 2).fill(null);
      copyTo(old, 0, this.contents, 0, this.count);
    }
  }

  get Count() {
    return this.count;
  }

  Pop() {
    this.count = this.count - 1 | 0;
    return this.contents[this.count];
  }

  Peep() {
    return this.contents[this.count - 1];
  }

  Top(n) {
    return reverse(toList(delay(() => map(x => x, this.contents.slice(0 > this.count - n ? 0 : this.count - n, this.count - 1 + 1)))));
  }

  Push(x) {
    this.Ensure(this.count + 1);
    this.contents[this.count] = x;
    this.count = this.count + 1 | 0;
  }

  get IsEmpty() {
    return this.count === 0;
  }

}
setType("Internal.Utilities.Text.Parsing.Stack", Stack);
export const Implementation = function (__exports) {
  const anyMarker = __exports.anyMarker = 65535;
  const shiftFlag = __exports.shiftFlag = 0;
  const reduceFlag = __exports.reduceFlag = 16384;
  const errorFlag = __exports.errorFlag = 32768;
  const acceptFlag = __exports.acceptFlag = 49152;
  const actionMask = __exports.actionMask = 49152;

  const actionValue = __exports.actionValue = function (action) {
    return action & ~actionMask | 0;
  };

  const actionKind = __exports.actionKind = function (action) {
    return action & actionMask | 0;
  };

  const AssocTable = __exports.AssocTable = class AssocTable {
    [_Symbol.reflection]() {
      return {
        type: "Internal.Utilities.Text.Parsing.Implementation.AssocTable",
        properties: {}
      };
    }

    constructor(elemTab, offsetTab) {
      this.elemTab = elemTab;
      this.offsetTab = offsetTab;
      this.cacheSize = 7919;
      this.cache = new Int32Array(this.cacheSize * 2);
    }

    ReadAssoc(minElemNum, maxElemNum, defaultValueOfAssoc, keyToFind) {
      ReadAssoc: while (true) {
        const elemNumber = ~~((minElemNum + maxElemNum) / 2) | 0;

        if (elemNumber === maxElemNum) {
          return defaultValueOfAssoc | 0;
        } else {
          const x = ~~this.elemTab[elemNumber * 2] | 0;

          if (keyToFind === x) {
            return ~~this.elemTab[elemNumber * 2 + 1] | 0;
          } else if (keyToFind < x) {
            minElemNum = minElemNum;
            maxElemNum = elemNumber;
            defaultValueOfAssoc = defaultValueOfAssoc;
            keyToFind = keyToFind;
            continue ReadAssoc;
          } else {
            minElemNum = elemNumber + 1;
            maxElemNum = maxElemNum;
            defaultValueOfAssoc = defaultValueOfAssoc;
            keyToFind = keyToFind;
            continue ReadAssoc;
          }
        }
      }
    }

    Read(rowNumber, keyToFind) {
      const cacheKey = rowNumber << 16 | keyToFind | 0;
      const cacheIdx = ~~((cacheKey >>> 0) % (this.cacheSize >>> 0)) * 2 | 0;
      const cacheKey2 = this.cache[cacheIdx] | 0;
      const v = this.cache[cacheIdx + 1] | 0;

      if (cacheKey === cacheKey2) {
        return v | 0;
      } else {
        const headOfTable = ~~this.offsetTab[rowNumber] | 0;
        const firstElemNumber = headOfTable + 1 | 0;
        const numberOfElementsInAssoc = ~~this.elemTab[headOfTable * 2] | 0;
        const defaultValueOfAssoc = ~~this.elemTab[headOfTable * 2 + 1] | 0;
        const res = this.ReadAssoc(firstElemNumber, firstElemNumber + numberOfElementsInAssoc, defaultValueOfAssoc, keyToFind) | 0;
        this.cache[cacheIdx] = cacheKey | 0;
        this.cache[cacheIdx + 1] = res | 0;
        return res | 0;
      }
    }

    ReadAll(n) {
      const headOfTable = ~~this.offsetTab[n] | 0;
      const firstElemNumber = headOfTable + 1 | 0;
      const numberOfElementsInAssoc = ~~this.elemTab[headOfTable * 2] | 0;
      const defaultValueOfAssoc = ~~this.elemTab[headOfTable * 2 + 1] | 0;
      return [toList(delay(() => map(i => [~~this.elemTab[i * 2], ~~this.elemTab[i * 2 + 1]], range(firstElemNumber, firstElemNumber + numberOfElementsInAssoc - 1)))), defaultValueOfAssoc];
    }

  };
  setType("Internal.Utilities.Text.Parsing.Implementation.AssocTable", AssocTable);
  const IdxToIdxListTable = __exports.IdxToIdxListTable = class IdxToIdxListTable {
    [_Symbol.reflection]() {
      return {
        type: "Internal.Utilities.Text.Parsing.Implementation.IdxToIdxListTable",
        properties: {}
      };
    }

    constructor(elemTab, offsetTab) {
      this.elemTab = elemTab;
      this.offsetTab = offsetTab;
    }

    ReadAll(n) {
      const headOfTable = ~~this.offsetTab[n] | 0;
      const firstElemNumber = headOfTable + 1 | 0;
      const numberOfElements = ~~this.elemTab[headOfTable] | 0;
      return toList(delay(() => map(i => ~~this.elemTab[i], range(firstElemNumber, firstElemNumber + numberOfElements - 1))));
    }

  };
  setType("Internal.Utilities.Text.Parsing.Implementation.IdxToIdxListTable", IdxToIdxListTable);
  const ValueInfo = __exports.ValueInfo = class ValueInfo {
    constructor(value, startPos, endPos) {
      this.value = value;
      this.startPos = startPos;
      this.endPos = endPos;
    }

    [_Symbol.reflection]() {
      return {
        type: "Internal.Utilities.Text.Parsing.Implementation.ValueInfo",
        interfaces: ["FSharpRecord"],
        properties: {
          value: Any,
          startPos: Position,
          endPos: Position
        }
      };
    }

    static [".ctor"](value, startPos, endPos) {
      return new ValueInfo(value, startPos, endPos);
    }

  };
  setType("Internal.Utilities.Text.Parsing.Implementation.ValueInfo", ValueInfo);

  const interpret = __exports.interpret = function (tables, lexer, lexbuf, initialState) {
    const stateStack = new Stack(100);
    stateStack.Push(initialState);
    const valueStack = new Stack(100);
    let haveLookahead = false;
    let lookaheadToken = null;
    let lookaheadEndPos = null;
    let lookaheadStartPos = null;
    let finished = false;
    let errorSuppressionCountDown = 0;
    let inEofCountDown = false;
    let eofCountDown = 20;
    const ruleStartPoss = new Array(100).fill(null);
    const ruleEndPoss = new Array(100).fill(null);
    const ruleValues = new Array(100).fill(null);
    const lhsPos = new Array(2).fill(null);
    const actionTable = new AssocTable(tables.actionTableElements, tables.actionTableRowOffsets);
    const gotoTable = new AssocTable(tables.gotos, tables.sparseGotoTableRowOffsets);
    const stateToProdIdxsTable = new IdxToIdxListTable(tables.stateToProdIdxsTableElements, tables.stateToProdIdxsTableRowOffsets);
    const parseState = new IParseState(ruleStartPoss, ruleEndPoss, lhsPos, ruleValues, lexbuf);

    const popStackUntilErrorShifted = function (tokenOpt) {
      var nextState;

      if (stateStack.IsEmpty) {
        throw new Error("parse error");
      }

      const currState = stateStack.Peep() | 0;
      const action = actionTable.Read(currState, tables.tagOfErrorTerminal) | 0;

      if (actionKind(action) === shiftFlag ? tokenOpt != null ? (nextState = actionValue(action) | 0, actionKind(actionTable.Read(nextState, tables.tagOfToken(getValue(tokenOpt)))) === shiftFlag) : true : false) {
        const nextState_1 = actionValue(action) | 0;
        valueStack.Push(ValueInfo[".ctor"](null, lexbuf.StartPos, lexbuf.EndPos));
        stateStack.Push(nextState_1);
      } else {
        if (valueStack.IsEmpty) {
          throw new Error("parse error");
        }

        valueStack.Pop();
        stateStack.Pop();
        popStackUntilErrorShifted(tokenOpt);
      }
    };

    while (!finished) {
      if (stateStack.IsEmpty) {
        finished = true;
      } else {
        const state = stateStack.Peep() | 0;
        let action_1;
        const immediateAction = ~~tables.immediateActions[state] | 0;

        if (!(immediateAction === anyMarker)) {
          action_1 = immediateAction | 0;
        } else {
          if (!haveLookahead) {
            if (lexbuf.IsPastEndOfStream) {
              if (eofCountDown > 0) {
                haveLookahead = true;
                eofCountDown = eofCountDown - 1 | 0;
                inEofCountDown = true;
              } else {
                haveLookahead = false;
              }
            } else {
              lookaheadToken = lexer(lexbuf);
              lookaheadStartPos = lexbuf.StartPos;
              lookaheadEndPos = lexbuf.EndPos;
              haveLookahead = true;
            }
          }

          const tag = (haveLookahead ? tables.tagOfToken(lookaheadToken) : tables.endOfInputTag) | 0;
          action_1 = actionTable.Read(state, tag) | 0;
        }

        const kind = actionKind(action_1) | 0;

        if (kind === shiftFlag) {
          if (errorSuppressionCountDown > 0) {
            errorSuppressionCountDown = errorSuppressionCountDown - 1 | 0;
          }

          const nextState_2 = actionValue(action_1) | 0;

          if (!haveLookahead) {
            throw new Error("shift on end of input!");
          }

          const data = tables.dataOfToken(lookaheadToken);
          valueStack.Push(ValueInfo[".ctor"](data, lookaheadStartPos, lookaheadEndPos));
          stateStack.Push(nextState_2);
          haveLookahead = false;
        } else if (kind === reduceFlag) {
          const prod = actionValue(action_1) | 0;
          const reduction = tables.reductions[prod];
          const n = ~~tables.reductionSymbolCounts[prod] | 0;

          for (let i = 0; i <= n - 1; i++) {
            if (valueStack.IsEmpty) {
              throw new Error("empty symbol stack");
            }

            const topVal = valueStack.Peep();
            valueStack.Pop();
            stateStack.Pop();
            ruleValues[n - i - 1] = topVal.value;
            ruleStartPoss[n - i - 1] = topVal.startPos;
            ruleEndPoss[n - i - 1] = topVal.endPos;

            if (i === 0) {
              lhsPos[1] = topVal.endPos;
            }

            if (i === n - 1) {
              lhsPos[0] = topVal.startPos;
            }
          }

          if (n === 0) {
            if (haveLookahead) {
              lhsPos[0] = lookaheadStartPos;
              lhsPos[1] = lookaheadEndPos;
            } else {
              lhsPos[0] = lexbuf.StartPos;
              lhsPos[1] = lexbuf.EndPos;
            }
          }

          try {
            const redResult = reduction(parseState);
            valueStack.Push(ValueInfo[".ctor"](redResult, lhsPos[0], lhsPos[1]));
            const currState_1 = stateStack.Peep() | 0;
            const newGotoState = gotoTable.Read(~~tables.productionToNonTerminalTable[prod], currState_1) | 0;
            stateStack.Push(newGotoState);
          } catch (matchValue) {
            if (matchValue instanceof Accept) {
              finished = true;
              valueStack.Push(ValueInfo[".ctor"](matchValue.Data0, lhsPos[0], lhsPos[1]));
            } else if (matchValue instanceof RecoverableParseError) {
              popStackUntilErrorShifted(null);
              errorSuppressionCountDown = 3;
            } else {
              throw matchValue;
            }
          }
        } else if (kind === errorFlag) {
          if (errorSuppressionCountDown > 0) {
            if (inEofCountDown ? eofCountDown < 10 : false) {
              popStackUntilErrorShifted(haveLookahead ? lookaheadToken : null);
            }

            if (!haveLookahead) {
              throw new Error("parse error: unexpected end of file");
            }

            haveLookahead = false;
            errorSuppressionCountDown = 3;
          } else {
            const currentToken = haveLookahead ? lookaheadToken : null;
            const patternInput = actionTable.ReadAll(state);
            const explicit = create(toList(delay(function () {
              return collect(function (matchValue_1) {
                return singleton(matchValue_1[0]);
              }, patternInput[0]);
            })), new Comparer(comparePrimitives));
            const shiftableTokens = toList(delay(function () {
              return append(collect(function (matchValue_2) {
                return actionKind(matchValue_2[1]) === shiftFlag ? singleton(matchValue_2[0]) : empty();
              }, patternInput[0]), delay(function () {
                return actionKind(patternInput[1]) === shiftFlag ? collect(function (tag_1) {
                  return !explicit.has(tag_1) ? singleton(tag_1) : empty();
                }, range(0, tables.numTerminals - 1)) : empty();
              }));
            }));
            const stateStack_1 = stateStack.Top(12);
            const reducibleProductions = toList(delay(function () {
              return map(function (state_1) {
                return stateToProdIdxsTable.ReadAll(state_1);
              }, stateStack_1);
            }));
            const reduceTokens = toList(delay(function () {
              return append(collect(function (matchValue_3) {
                return actionKind(matchValue_3[1]) === reduceFlag ? singleton(matchValue_3[0]) : empty();
              }, patternInput[0]), delay(function () {
                return actionKind(patternInput[1]) === reduceFlag ? collect(function (tag_2) {
                  return !explicit.has(tag_2) ? singleton(tag_2) : empty();
                }, range(0, tables.numTerminals - 1)) : empty();
              }));
            }));
            const errorContext = new ParseErrorContext(stateStack_1, parseState, reduceTokens, currentToken, reducibleProductions, shiftableTokens, "syntax error");
            tables.parseError(errorContext);
            popStackUntilErrorShifted(null);
            errorSuppressionCountDown = 3;
          }
        } else if (kind === acceptFlag) {
          finished = true;
        }
      }
    }

    const copyOfStruct = valueStack.Peep();
    return copyOfStruct.value;
  };

  return __exports;
}({});
export const ParseHelpers = function (__exports) {
  const parse_error = __exports.parse_error = function (_s) {};

  const parse_error_rich = __exports.parse_error_rich = function () {
    return null;
  };

  return __exports;
}({});