import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { compare, compareRecords, equalsRecords, comparePrimitives } from "./fable-core/Util";
import { FSharpTokenTag, FSharpSourceTokenizer, FSharpTokenInfo } from "./service/ServiceLexing";
import { tryLast, tryFind, sortWith, fold, choose, toList } from "./fable-core/Seq";
import { defaultArg, getValue } from "./fable-core/Option";
import { filter, reverse } from "./fable-core/List";
import List from "./fable-core/List";
import { fromBits } from "./fable-core/Long";
import Choice from "./fable-core/Choice";
export class SymbolKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "FsAutoComplete.Lexer.SymbolKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Ident"], ["Operator"], ["GenericTypeParameter"], ["StaticallyResolvedTypeParameter"], ["ActivePattern"], ["Keyword"], ["Other"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("FsAutoComplete.Lexer.SymbolKind", SymbolKind);
export class LexerSymbol {
  constructor(kind, line, leftColumn, rightColumn, text) {
    this.Kind = kind;
    this.Line = line | 0;
    this.LeftColumn = leftColumn | 0;
    this.RightColumn = rightColumn | 0;
    this.Text = text;
  }

  [_Symbol.reflection]() {
    return {
      type: "FsAutoComplete.Lexer.LexerSymbol",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Kind: SymbolKind,
        Line: "number",
        LeftColumn: "number",
        RightColumn: "number",
        Text: "string"
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
setType("FsAutoComplete.Lexer.LexerSymbol", LexerSymbol);
export class SymbolLookupKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "FsAutoComplete.Lexer.SymbolLookupKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Fuzzy"], ["ByRightColumn"], ["ByLongIdent"], ["Simple"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("FsAutoComplete.Lexer.SymbolLookupKind", SymbolLookupKind);

class DraftToken {
  constructor(kind, token, rightColumn) {
    this.Kind = kind;
    this.Token = token;
    this.RightColumn = rightColumn | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "FsAutoComplete.Lexer.DraftToken",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Kind: SymbolKind,
        Token: FSharpTokenInfo,
        RightColumn: "number"
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

setType("FsAutoComplete.Lexer.DraftToken", DraftToken);
export function tokenizeLine(args, lineStr) {
  const defines = toList(choose(function (s) {
    return s.indexOf("--define:") === 0 ? s.slice(9, s.length) : null;
  }, args));
  const sourceTokenizer = FSharpSourceTokenizer[".ctor"](defines, "/tmp.fsx");
  const lineTokenizer = sourceTokenizer.CreateLineTokenizer(lineStr);

  const loop = function (lexState, acc) {
    loop: while (true) {
      const matchValue = lineTokenizer.ScanToken(lexState);

      if (matchValue[0] != null) {
        const tok = getValue(matchValue[0]);
        lexState = matchValue[1];
        acc = new List(tok, acc);
        continue loop;
      } else {
        return reverse(acc);
      }
    }
  };

  return loop(fromBits(0, 0, false), new List());
}

function fixTokens(lineStr, tokens) {
  return fold(function (tupledArg, token) {
    var RightColumn;
    var kind_1;
    var kind_2;
    var LeftColumn;
    var FullMatchedLength_1;
    const $var1 = tupledArg[1] != null ? token.LeftColumn <= getValue(tupledArg[1]).RightColumn ? [0, getValue(tupledArg[1])] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return [tupledArg[0], tupledArg[1]];

      case 1:
        const $var2 = tupledArg[1] != null ? getValue(tupledArg[1]).Kind.tag === 4 ? ((token.Tag === FSharpTokenTag.BAR ? true : token.Tag === FSharpTokenTag.IDENT) ? true : token.Tag === FSharpTokenTag.UNDERSCORE) ? [0, getValue(tupledArg[1])] : [1] : [1] : [1];

        switch ($var2[0]) {
          case 0:
            let mergedToken;
            const FullMatchedLength = $var2[1].Token.FullMatchedLength + token.FullMatchedLength | 0;
            mergedToken = new FSharpTokenInfo($var2[1].Token.LeftColumn, token.RightColumn, $var2[1].Token.ColorClass, $var2[1].Token.CharClass, $var2[1].Token.FSharpTokenTriggerClass, FSharpTokenTag.IDENT, $var2[1].Token.TokenName, FullMatchedLength);
            return [tupledArg[0], (RightColumn = $var2[1].RightColumn + token.FullMatchedLength | 0, new DraftToken($var2[1].Kind, mergedToken, RightColumn))];

          case 1:
            const matchValue = [token, lineStr];
            let activePatternResult63699;
            const $var4 = matchValue[1];
            const $var3 = matchValue[0];

            if ($var3.Tag === FSharpTokenTag.QUOTE) {
              activePatternResult63699 = new Choice(0, null);
            } else if ($var3.Tag === FSharpTokenTag.INFIX_AT_HAT_OP) {
              if ($var3.FullMatchedLength === 1 ? $var4[$var3.LeftColumn] === "^" : false) {
                activePatternResult63699 = new Choice(1, null);
              } else {
                activePatternResult63699 = new Choice(3, null);
              }
            } else if ($var3.Tag === FSharpTokenTag.LPAREN) {
              if ($var3.FullMatchedLength === 1 ? $var4[$var3.LeftColumn + 1] === "|" : false) {
                activePatternResult63699 = new Choice(2, null);
              } else {
                activePatternResult63699 = new Choice(3, null);
              }
            } else {
              activePatternResult63699 = new Choice(3, null);
            }

            if (activePatternResult63699.tag === 1) {
              return [tupledArg[0], function (arg00, arg10) {
                return new DraftToken(arg00, arg10, arg10.LeftColumn + arg10.FullMatchedLength - 1);
              }(new SymbolKind(3), token)];
            } else if (activePatternResult63699.tag === 2) {
              return [tupledArg[0], function (arg00_1, arg10_1) {
                return new DraftToken(arg00_1, arg10_1, arg10_1.LeftColumn + arg10_1.FullMatchedLength - 1);
              }(new SymbolKind(4), token)];
            } else if (activePatternResult63699.tag === 3) {
              let draftToken;
              const $var5 = tupledArg[1] != null ? getValue(tupledArg[1]).Kind.tag === 2 ? (kind_1 = getValue(tupledArg[1]).Kind, token.CharClass === 2) ? [0, getValue(tupledArg[1]).Kind] : [1] : getValue(tupledArg[1]).Kind.tag === 3 ? (kind_2 = getValue(tupledArg[1]).Kind, token.CharClass === 2) ? [0, getValue(tupledArg[1]).Kind] : [1] : [1] : [1];

              switch ($var5[0]) {
                case 0:
                  draftToken = function (arg00_2, arg10_2) {
                    return new DraftToken(arg00_2, arg10_2, arg10_2.LeftColumn + arg10_2.FullMatchedLength - 1);
                  }($var5[1], (LeftColumn = token.LeftColumn - 1 | 0, FullMatchedLength_1 = token.FullMatchedLength + 1 | 0, new FSharpTokenInfo(LeftColumn, token.RightColumn, token.ColorClass, token.CharClass, token.FSharpTokenTriggerClass, token.Tag, token.TokenName, FullMatchedLength_1)));

                  break;

                case 1:
                  const $var6 = tupledArg[1] != null ? getValue(tupledArg[1]).Kind.tag === 4 ? token.Tag === FSharpTokenTag.RPAREN ? [0, getValue(tupledArg[1])] : [1] : [1] : [1];

                  switch ($var6[0]) {
                    case 0:
                      draftToken = function (arg00_3, arg10_3) {
                        return new DraftToken(arg00_3, arg10_3, arg10_3.LeftColumn + arg10_3.FullMatchedLength - 1);
                      }(new SymbolKind(0), $var6[1].Token);

                      break;

                    case 1:
                      const kind = token.ColorClass === 10 ? new SymbolKind(1) : token.CharClass === 2 ? new SymbolKind(0) : token.ColorClass === 1 ? new SymbolKind(5) : new SymbolKind(6);

                      draftToken = function (arg00_4, arg10_4) {
                        return new DraftToken(arg00_4, arg10_4, arg10_4.LeftColumn + arg10_4.FullMatchedLength - 1);
                      }(kind, token);

                      break;
                  }

                  break;
              }

              return [new List(draftToken, tupledArg[0]), draftToken];
            } else {
              return [tupledArg[0], function (arg00_5, arg10_5) {
                return new DraftToken(arg00_5, arg10_5, arg10_5.LeftColumn + arg10_5.FullMatchedLength - 1);
              }(new SymbolKind(2), token)];
            }

        }

    }
  }, [new List(), null], tokens)[0];
}

function getSymbolFromTokens(tokens, line, col, lineStr, lookupKind) {
  var t;
  var $var13;
  const tokens_1 = fixTokens(lineStr, tokens);
  let tokensUnderCursor;
  const $var7 = lookupKind.tag === 0 ? [0] : lookupKind.tag === 1 ? [1] : lookupKind.tag === 2 ? [2] : [0];

  switch ($var7[0]) {
    case 0:
      tokensUnderCursor = filter(function (x) {
        return x.Token.LeftColumn <= col ? x.RightColumn + 1 >= col : false;
      }, tokens_1);
      break;

    case 1:
      tokensUnderCursor = filter(function (x_1) {
        return x_1.RightColumn === col;
      }, tokens_1);
      break;

    case 2:
      tokensUnderCursor = filter(function (x_2) {
        return x_2.Token.LeftColumn <= col;
      }, tokens_1);
      break;
  }

  const $var8 = lookupKind.tag === 0 ? [1] : lookupKind.tag === 1 ? [1] : lookupKind.tag === 3 ? [2] : [0];

  switch ($var8[0]) {
    case 0:
      const tryFindStartColumn = function (tokens_2) {
        tryFindStartColumn: while (true) {
          const $var9 = tokens_2.tail == null ? [2] : tokens_2.head.Kind.tag === 0 ? tokens_2.tail.tail != null ? tokens_2.tail.head.Kind.tag === 6 ? [0, tokens_2.tail.tail, tokens_2.head.Token, tokens_2.tail.head.Token] : [1, tokens_2.head.Token] : [1, tokens_2.head.Token] : [2];

          switch ($var9[0]) {
            case 0:
              if ($var9[3].Tag === FSharpTokenTag.DOT) {
                tokens_2 = $var9[1];
                continue tryFindStartColumn;
              } else {
                return $var9[2].LeftColumn;
              }

            case 1:
              return $var9[1].LeftColumn;

            case 2:
              return null;
          }
        }
      };

      let decreasingTokens;
      const matchValue = toList(sortWith(($var10, $var11) => compare(function (token) {
        return -token.Token.LeftColumn;
      }($var10), function (token) {
        return -token.Token.LeftColumn;
      }($var11)), tokensUnderCursor));
      const $var12 = matchValue.tail != null ? matchValue.head.Kind.tag === 6 ? (t = matchValue.head.Token, t.Tag === FSharpTokenTag.DOT) ? [0, matchValue.tail, matchValue.head.Token] : [1] : [1] : [1];

      switch ($var12[0]) {
        case 0:
          decreasingTokens = $var12[1];
          break;

        case 1:
          decreasingTokens = matchValue;
          break;
      }

      if (decreasingTokens.tail != null) {
        return defaultArg(tryFindStartColumn(decreasingTokens), null, function (leftCol) {
          return new LexerSymbol(new SymbolKind(0), line, leftCol, decreasingTokens.head.RightColumn + 1, lineStr.slice(leftCol, decreasingTokens.head.RightColumn + 1));
        });
      } else {
        return null;
      }

    case 1:
      return defaultArg(($var13 = tryFind(function (_arg1) {
        switch (_arg1.Kind.tag) {
          case 0:
          case 2:
          case 3:
          case 5:
            return true;

          default:
            return false;
        }
      }, tokensUnderCursor), $var13 == null ? function () {
        return tryFind(function (_arg2) {
          return _arg2.Kind.Equals(new SymbolKind(1));
        }, tokensUnderCursor);
      }() : getValue($var13)), null, function (token_1) {
        return new LexerSymbol(token_1.Kind, line, token_1.Token.LeftColumn, token_1.RightColumn + 1, lineStr.substr(token_1.Token.LeftColumn, token_1.Token.FullMatchedLength));
      });

    case 2:
      return defaultArg(tryLast(tokensUnderCursor), null, function (token_2) {
        return new LexerSymbol(token_2.Kind, line, token_2.Token.LeftColumn, token_2.RightColumn + 1, lineStr.substr(token_2.Token.LeftColumn, token_2.Token.FullMatchedLength));
      });
  }
}

export function getSymbol(line, col, lineStr, lookupKind, args) {
  const tokens = tokenizeLine(args, lineStr);

  try {
    return getSymbolFromTokens(tokens, line, col, lineStr, lookupKind);
  } catch (matchValue) {
    return null;
  }
}