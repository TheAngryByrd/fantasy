import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareUnions, equals, compareRecords, equalsRecords, Option, makeGeneric } from "../fable-core/Util";
import { reverse, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { compare, isNullOrEmpty, startsWith, endsWith } from "../fable-core/String";
import { token, tagOfToken } from "../codegen/pars";
import { IsLongIdentifierPartCharacter as IsLongIdentifierPartCharacter_1, IsIdentifierPartCharacter as IsIdentifierPartCharacter_1 } from "../fsharp/PrettyNaming";
import { defaultArg, getValue, makeSome } from "../fable-core/Option";
import { System } from "../fcs-fable/adapters";
import { forAll2 } from "../fable-core/Seq";
export class PartialLongName {
  constructor(qualifyingIdents, partialIdent, endColumn, lastDotPos) {
    this.QualifyingIdents = qualifyingIdents;
    this.PartialIdent = partialIdent;
    this.EndColumn = endColumn | 0;
    this.LastDotPos = lastDotPos;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PartialLongName",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        QualifyingIdents: makeGeneric(List, {
          T: "string"
        }),
        PartialIdent: "string",
        EndColumn: "number",
        LastDotPos: Option("number")
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static Empty(endColumn) {
    return new PartialLongName(new List(), "", endColumn, null);
  }

}
setType("Microsoft.FSharp.Compiler.PartialLongName", PartialLongName);
export const QuickParse = function (__exports) {
  const MagicalAdjustmentConstant = __exports.MagicalAdjustmentConstant = 1;

  const CorrectIdentifierToken = __exports.CorrectIdentifierToken = function (tokenText, tokenTag) {
    if (endsWith(tokenText, "|")) {
      return tagOfToken(new token(189, tokenText)) | 0;
    } else {
      return tokenTag | 0;
    }
  };

  const isValidStrippedName = __exports.isValidStrippedName = function (name, idx) {
    isValidStrippedName: while (true) {
      if (idx === name.length) {
        return false;
      } else if (IsIdentifierPartCharacter_1(name[idx])) {
        return true;
      } else {
        name = name;
        idx = idx + 1;
        continue isValidStrippedName;
      }
    }
  };

  const isValidActivePatternName = function (name) {
    const matchValue = [startsWith(name, "|", 4), endsWith(name, "|_|", 4), endsWith(name, "|", 4)];
    const $var1 = matchValue[0] ? matchValue[1] ? name.length > 4 ? [0] : [1] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return isValidStrippedName(name.substr(1, name.length - 4), 0);

      case 1:
        const $var2 = matchValue[0] ? matchValue[2] ? name.length > 2 ? [0] : [1] : [1] : [1];

        switch ($var2[0]) {
          case 0:
            return isValidStrippedName(name.substr(1, name.length - 2), 0);

          case 1:
            return false;
        }

    }
  };

  const GetCompleteIdentifierIslandImpl = __exports.GetCompleteIdentifierIslandImpl = function (lineStr, index) {
    if ((index < 0 ? true : lineStr == null) ? true : index >= lineStr.length) {
      return null;
    } else {
      const fixup = (index < lineStr.length ? lineStr[index] === "|" ? true : IsIdentifierPartCharacter_1(lineStr[index]) : false) ? index : null;

      const _Char___ = function (p) {
        if (p >= 0 ? p < lineStr.length : false) {
          return lineStr[p];
        } else {
          return null;
        }
      };

      const _IsLongIdentifierPartChar___ = function (c) {
        if (IsLongIdentifierPartCharacter_1(c)) {
          return makeSome();
        } else {
          return null;
        }
      };

      const _IsIdentifierPartChar___ = function (c_1) {
        if (IsIdentifierPartCharacter_1(c_1)) {
          return makeSome();
        } else {
          return null;
        }
      };

      const searchLeft = function (p_1) {
        searchLeft: while (true) {
          const matchValue = [p_1 - 1, p_1 - 2];
          let $var3;

          const activePatternResult54797 = _Char___(matchValue[0]);

          if (activePatternResult54797 != null) {
            if (getValue(activePatternResult54797) === "|") {
              const activePatternResult54798 = _Char___(matchValue[1]);

              if (activePatternResult54798 != null) {
                if (getValue(activePatternResult54798) === "[") {
                  $var3 = [0];
                } else {
                  $var3 = [1];
                }
              } else {
                $var3 = [1];
              }
            } else {
              $var3 = [1];
            }
          } else {
            $var3 = [1];
          }

          switch ($var3[0]) {
            case 0:
              return p_1 | 0;

            case 1:
              let $var4;

              const activePatternResult54795 = _Char___(matchValue[0]);

              if (activePatternResult54795 != null) {
                if (getValue(activePatternResult54795) === "|") {
                  $var4 = [0];
                } else {
                  const activePatternResult54796 = _IsLongIdentifierPartChar___(getValue(activePatternResult54795));

                  if (activePatternResult54796 != null) {
                    $var4 = [0];
                  } else {
                    $var4 = [1];
                  }
                }
              } else {
                $var4 = [1];
              }

              switch ($var4[0]) {
                case 0:
                  p_1 = p_1 - 1;
                  continue searchLeft;

                case 1:
                  return p_1 | 0;
              }

          }
        }
      };

      const searchRight = function (p_2) {
        searchRight: while (true) {
          const matchValue_1 = [p_2 + 1, p_2 + 2];
          let $var5;

          const activePatternResult54802 = _Char___(matchValue_1[0]);

          if (activePatternResult54802 != null) {
            if (getValue(activePatternResult54802) === "|") {
              const activePatternResult54803 = _Char___(matchValue_1[1]);

              if (activePatternResult54803 != null) {
                if (getValue(activePatternResult54803) === "]") {
                  $var5 = [0];
                } else {
                  $var5 = [1];
                }
              } else {
                $var5 = [1];
              }
            } else {
              $var5 = [1];
            }
          } else {
            $var5 = [1];
          }

          switch ($var5[0]) {
            case 0:
              return p_2 | 0;

            case 1:
              let $var6;

              const activePatternResult54800 = _Char___(matchValue_1[0]);

              if (activePatternResult54800 != null) {
                if (getValue(activePatternResult54800) === "|") {
                  $var6 = [0];
                } else {
                  const activePatternResult54801 = _IsIdentifierPartChar___(getValue(activePatternResult54800));

                  if (activePatternResult54801 != null) {
                    $var6 = [0];
                  } else {
                    $var6 = [1];
                  }
                }
              } else {
                $var6 = [1];
              }

              switch ($var6[0]) {
                case 0:
                  p_2 = p_2 + 1;
                  continue searchRight;

                case 1:
                  return p_2 | 0;
              }

          }
        }
      };

      let tickColsOpt;

      const walkOutsideBackticks = function (i) {
        walkOutsideBackticks: while (true) {
          if (i >= lineStr.length) {
            return null;
          } else {
            const matchValue_2 = [i, i + 1];
            let $var7;

            const activePatternResult54805 = _Char___(matchValue_2[0]);

            if (activePatternResult54805 != null) {
              if (getValue(activePatternResult54805) === "`") {
                const activePatternResult54806 = _Char___(matchValue_2[1]);

                if (activePatternResult54806 != null) {
                  if (getValue(activePatternResult54806) === "`") {
                    $var7 = [0];
                  } else {
                    $var7 = [1];
                  }
                } else {
                  $var7 = [1];
                }
              } else {
                $var7 = [1];
              }
            } else {
              $var7 = [1];
            }

            switch ($var7[0]) {
              case 0:
                return walkInsideBackticks(i + 2, i);

              case 1:
                if (i >= index) {
                  return null;
                } else {
                  i = i + 1;
                  continue walkOutsideBackticks;
                }

            }
          }
        }
      };

      const walkInsideBackticks = function (i_1, start) {
        walkInsideBackticks: while (true) {
          if (i_1 >= lineStr.length) {
            return null;
          } else {
            const matchValue_3 = [i_1, i_1 + 1];
            let $var8;

            const activePatternResult54808 = _Char___(matchValue_3[0]);

            if (activePatternResult54808 != null) {
              if (getValue(activePatternResult54808) === "`") {
                const activePatternResult54809 = _Char___(matchValue_3[1]);

                if (activePatternResult54809 != null) {
                  if (getValue(activePatternResult54809) === "`") {
                    $var8 = [0];
                  } else {
                    $var8 = [1];
                  }
                } else {
                  $var8 = [1];
                }
              } else {
                $var8 = [1];
              }
            } else {
              $var8 = [1];
            }

            switch ($var8[0]) {
              case 0:
                if (index >= start ? index < i_1 + 2 : false) {
                  return [start, i_1];
                } else {
                  return walkOutsideBackticks(i_1 + 2);
                }

              case 1:
                i_1 = i_1 + 1;
                start = start;
                continue walkInsideBackticks;
            }
          }
        }
      };

      tickColsOpt = walkOutsideBackticks(0);

      if (tickColsOpt != null) {
        const prevTickTick = getValue(tickColsOpt)[0] | 0;
        const idxTickTick = getValue(tickColsOpt)[1] | 0;
        const pos = idxTickTick + 1 + MagicalAdjustmentConstant | 0;
        const ident = lineStr.substr(prevTickTick, idxTickTick - prevTickTick + 2);
        return [ident, pos, true];
      } else {
        return defaultArg(fixup, null, function (p_3) {
          const l = searchLeft(p_3) | 0;
          const r = searchRight(p_3) | 0;
          const ident_1 = lineStr.substr(l, r - l + 1);

          if (ident_1.indexOf("|") !== -1 ? !isValidActivePatternName(ident_1) : false) {
            return null;
          } else {
            const pos_1 = r + MagicalAdjustmentConstant | 0;
            return [ident_1, pos_1, false];
          }
        });
      }
    }
  };

  const GetCompleteIdentifierIsland = __exports.GetCompleteIdentifierIsland = function (tolerateJustAfter, lineStr, index) {
    if (isNullOrEmpty(lineStr)) {
      return null;
    } else {
      const directResult = GetCompleteIdentifierIslandImpl(lineStr, index);

      if (tolerateJustAfter ? equals(directResult, null) : false) {
        return GetCompleteIdentifierIslandImpl(lineStr, index - 1);
      } else {
        return directResult;
      }
    }
  };

  const defaultName = function () {
    return [new List(), ""];
  };

  const GetPartialLongName = __exports.GetPartialLongName = function (lineStr, index) {
    if (lineStr == null) {
      return defaultName();
    } else if (index < 0) {
      return defaultName();
    } else if (index >= lineStr.length) {
      return defaultName();
    } else {
      const IsIdentifierPartCharacter = function (pos) {
        return IsIdentifierPartCharacter_1(lineStr[pos]);
      };

      const IsLongIdentifierPartCharacter = function (pos_1) {
        return IsLongIdentifierPartCharacter_1(lineStr[pos_1]);
      };

      const IsDot = function (pos_2) {
        return lineStr[pos_2] === ".";
      };

      const InLeadingIdentifier = function (tupledArg) {
        InLeadingIdentifier: while (true) {
          const PushName = function () {
            return [new List(lineStr.substr(tupledArg[0] + 1, tupledArg[1] - tupledArg[0] - 1), tupledArg[2][0]), tupledArg[2][1]];
          };

          if (tupledArg[0] < 0) {
            return PushName();
          } else if (IsIdentifierPartCharacter(tupledArg[0])) {
            tupledArg = [tupledArg[0] - 1, tupledArg[1], [tupledArg[2][0], tupledArg[2][1]]];
            continue InLeadingIdentifier;
          } else if (IsDot(tupledArg[0])) {
            tupledArg = [tupledArg[0] - 1, tupledArg[0], PushName()];
            continue InLeadingIdentifier;
          } else {
            return PushName();
          }
        }
      };

      const InName = function (tupledArg_1) {
        InName: while (true) {
          const NameAndResidue = function () {
            return [ofArray([lineStr.substr(tupledArg_1[0] + 1, tupledArg_1[1] - tupledArg_1[0] - 1)]), lineStr.substr(tupledArg_1[1] + 1, tupledArg_1[2] - tupledArg_1[1])];
          };

          if (tupledArg_1[0] < 0) {
            return [ofArray([lineStr.substr(tupledArg_1[0] + 1, tupledArg_1[1] - tupledArg_1[0] - 1)]), lineStr.substr(tupledArg_1[1] + 1, tupledArg_1[2] - tupledArg_1[1])];
          } else if (IsIdentifierPartCharacter(tupledArg_1[0])) {
            tupledArg_1 = [tupledArg_1[0] - 1, tupledArg_1[1], tupledArg_1[2]];
            continue InName;
          } else if (IsDot(tupledArg_1[0])) {
            return InLeadingIdentifier([tupledArg_1[0] - 1, tupledArg_1[0], NameAndResidue()]);
          } else {
            return NameAndResidue();
          }
        }
      };

      const InResidue = function (tupledArg_2) {
        InResidue: while (true) {
          if (tupledArg_2[0] < 0) {
            return [new List(), lineStr.substr(tupledArg_2[0] + 1, tupledArg_2[1] - tupledArg_2[0])];
          } else if (IsDot(tupledArg_2[0])) {
            return InName([tupledArg_2[0] - 1, tupledArg_2[0], tupledArg_2[1]]);
          } else if (IsLongIdentifierPartCharacter(tupledArg_2[0])) {
            tupledArg_2 = [tupledArg_2[0] - 1, tupledArg_2[1]];
            continue InResidue;
          } else {
            return [new List(), lineStr.substr(tupledArg_2[0] + 1, tupledArg_2[1] - tupledArg_2[0])];
          }
        }
      };

      const result = InResidue([index, index]);
      return result;
    }
  };

  const EatCommentCallContext = class EatCommentCallContext {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.QuickParse.EatCommentCallContext",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["SkipWhiteSpaces", "string", makeGeneric(List, {
          T: "string"
        }), "boolean"], ["StartIdentifier", makeGeneric(List, {
          T: "string"
        }), "boolean"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

    CompareTo(other) {
      return compareUnions(this, other) | 0;
    }

  };
  setType("Microsoft.FSharp.Compiler.QuickParse.EatCommentCallContext", EatCommentCallContext);

  const GetPartialLongNameEx = __exports.GetPartialLongNameEx = function (lineStr, index) {
    if (lineStr == null) {
      return PartialLongName.Empty(index);
    } else if (index < 0) {
      return PartialLongName.Empty(index);
    } else if (index >= lineStr.length) {
      return PartialLongName.Empty(index);
    } else {
      const IsIdentifierPartCharacter = function (pos) {
        return IsIdentifierPartCharacter_1(lineStr[pos]);
      };

      const IsIdentifierStartCharacter = function (pos_1) {
        return IsIdentifierPartCharacter(pos_1);
      };

      const IsDot = function (pos_2) {
        return lineStr[pos_2] === ".";
      };

      const IsTick = function (pos_3) {
        return lineStr[pos_3] === "`";
      };

      const IsEndOfComment = function (pos_4) {
        if (pos_4 < index - 1 ? lineStr[pos_4] === "*" : false) {
          return lineStr[pos_4 + 1] === ")";
        } else {
          return false;
        }
      };

      const IsStartOfComment = function (pos_5) {
        if (pos_5 < index - 1 ? lineStr[pos_5] === "(" : false) {
          return lineStr[pos_5 + 1] === "*";
        } else {
          return false;
        }
      };

      const IsWhitespace = function (pos_6) {
        return System.Char.IsWhiteSpace(lineStr[pos_6]);
      };

      const SkipWhitespaceBeforeDotIdentifier = function (tupledArg) {
        SkipWhitespaceBeforeDotIdentifier: while (true) {
          if (tupledArg[0] > index) {
            return PartialLongName.Empty(index);
          } else if (IsWhitespace(tupledArg[0])) {
            tupledArg = [tupledArg[0] + 1, tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4]];
            continue SkipWhitespaceBeforeDotIdentifier;
          } else if (IsDot(tupledArg[0])) {
            return AtStartOfIdentifier([tupledArg[0] + 1, new List(tupledArg[1], tupledArg[2]), tupledArg[3], tupledArg[0]]);
          } else if (IsStartOfComment(tupledArg[0])) {
            return EatComment([1, tupledArg[0] + 1, new EatCommentCallContext(0, [tupledArg[1], tupledArg[2], tupledArg[3]]), tupledArg[4]]);
          } else {
            return AtStartOfIdentifier([tupledArg[0], new List(), false, null]);
          }
        }
      };

      const EatComment = function (tupledArg_1) {
        EatComment: while (true) {
          if (tupledArg_1[1] > index) {
            return PartialLongName.Empty(index);
          } else if (IsStartOfComment(tupledArg_1[1])) {
            tupledArg_1 = [tupledArg_1[0] + 1, tupledArg_1[1] + 2, tupledArg_1[2], tupledArg_1[3]];
            continue EatComment;
          } else if (IsEndOfComment(tupledArg_1[1])) {
            if (tupledArg_1[0] === 1) {
              if (tupledArg_1[2].tag === 1) {
                return AtStartOfIdentifier([tupledArg_1[1] + 2, tupledArg_1[2].data[0], tupledArg_1[2].data[1], tupledArg_1[3]]);
              } else {
                return SkipWhitespaceBeforeDotIdentifier([tupledArg_1[1] + 2, tupledArg_1[2].data[0], tupledArg_1[2].data[1], tupledArg_1[2].data[2], tupledArg_1[3]]);
              }
            } else {
              tupledArg_1 = [tupledArg_1[0] - 1, tupledArg_1[1] + 2, tupledArg_1[2], tupledArg_1[3]];
              continue EatComment;
            }
          } else {
            tupledArg_1 = [tupledArg_1[0], tupledArg_1[1] + 1, tupledArg_1[2], tupledArg_1[3]];
            continue EatComment;
          }
        }
      };

      const InUnquotedIdentifier = function (tupledArg_2) {
        InUnquotedIdentifier: while (true) {
          if (tupledArg_2[1] > index) {
            if (tupledArg_2[3]) {
              return PartialLongName.Empty(index);
            } else {
              return new PartialLongName(tupledArg_2[2], lineStr.substr(tupledArg_2[0], tupledArg_2[1] - tupledArg_2[0]), index, tupledArg_2[4]);
            }
          } else if (IsIdentifierPartCharacter(tupledArg_2[1])) {
            tupledArg_2 = [tupledArg_2[0], tupledArg_2[1] + 1, tupledArg_2[2], tupledArg_2[3], tupledArg_2[4]];
            continue InUnquotedIdentifier;
          } else if (IsDot(tupledArg_2[1])) {
            const ident = lineStr.substr(tupledArg_2[0], tupledArg_2[1] - tupledArg_2[0]);
            return AtStartOfIdentifier([tupledArg_2[1] + 1, new List(ident, tupledArg_2[2]), tupledArg_2[3], tupledArg_2[1]]);
          } else if (IsWhitespace(tupledArg_2[1]) ? true : IsStartOfComment(tupledArg_2[1])) {
            const ident_1 = lineStr.substr(tupledArg_2[0], tupledArg_2[1] - tupledArg_2[0]);
            return SkipWhitespaceBeforeDotIdentifier([tupledArg_2[1], ident_1, tupledArg_2[2], tupledArg_2[3], tupledArg_2[4]]);
          } else {
            return AtStartOfIdentifier([tupledArg_2[1], new List(), false, null]);
          }
        }
      };

      const InQuotedIdentifier = function (tupledArg_3) {
        InQuotedIdentifier: while (true) {
          if (tupledArg_3[1] > index) {
            if (tupledArg_3[3]) {
              return PartialLongName.Empty(index);
            } else {
              return new PartialLongName(tupledArg_3[2], lineStr.substr(tupledArg_3[0], tupledArg_3[1] - tupledArg_3[0]), index, tupledArg_3[4]);
            }
          } else {
            const remainingLength = lineStr.length - tupledArg_3[1] | 0;

            if ((IsTick(tupledArg_3[1]) ? remainingLength > 1 : false) ? IsTick(tupledArg_3[1] + 1) : false) {
              const ident_2 = lineStr.substr(tupledArg_3[0], tupledArg_3[1] - tupledArg_3[0]);
              return SkipWhitespaceBeforeDotIdentifier([tupledArg_3[1] + 2, ident_2, tupledArg_3[2], tupledArg_3[3], tupledArg_3[4]]);
            } else {
              tupledArg_3 = [tupledArg_3[0], tupledArg_3[1] + 1, tupledArg_3[2], tupledArg_3[3], tupledArg_3[4]];
              continue InQuotedIdentifier;
            }
          }
        }
      };

      const AtStartOfIdentifier = function (tupledArg_4) {
        AtStartOfIdentifier: while (true) {
          if (tupledArg_4[0] > index) {
            if (tupledArg_4[2]) {
              return PartialLongName.Empty(index);
            } else {
              return new PartialLongName(tupledArg_4[1], "", index, tupledArg_4[3]);
            }
          } else if (IsWhitespace(tupledArg_4[0])) {
            tupledArg_4 = [tupledArg_4[0] + 1, tupledArg_4[1], tupledArg_4[2], tupledArg_4[3]];
            continue AtStartOfIdentifier;
          } else {
            const remainingLength_1 = lineStr.length - tupledArg_4[0] | 0;

            if ((IsTick(tupledArg_4[0]) ? remainingLength_1 > 1 : false) ? IsTick(tupledArg_4[0] + 1) : false) {
              return InQuotedIdentifier([tupledArg_4[0] + 2, tupledArg_4[0] + 2, tupledArg_4[1], tupledArg_4[2], tupledArg_4[3]]);
            } else if (IsStartOfComment(tupledArg_4[0])) {
              return EatComment([1, tupledArg_4[0] + 1, new EatCommentCallContext(1, [tupledArg_4[1], tupledArg_4[2]]), tupledArg_4[3]]);
            } else if (IsIdentifierStartCharacter(tupledArg_4[0])) {
              return InUnquotedIdentifier([tupledArg_4[0], tupledArg_4[0] + 1, tupledArg_4[1], tupledArg_4[2], tupledArg_4[3]]);
            } else if (IsDot(tupledArg_4[0])) {
              if (tupledArg_4[0] === 0) {
                tupledArg_4 = [tupledArg_4[0] + 1, new List("", tupledArg_4[1]), tupledArg_4[2], tupledArg_4[0]];
                continue AtStartOfIdentifier;
              } else if (!(tupledArg_4[0] > 0 ? IsIdentifierPartCharacter(tupledArg_4[0] - 1) ? true : IsWhitespace(tupledArg_4[0] - 1) : false)) {
                if (lineStr[tupledArg_4[0] - 1] === ")") {
                  tupledArg_4 = [tupledArg_4[0] + 1, new List(), true, null];
                  continue AtStartOfIdentifier;
                } else {
                  tupledArg_4 = [tupledArg_4[0] + 1, new List(), false, null];
                  continue AtStartOfIdentifier;
                }
              } else {
                tupledArg_4 = [tupledArg_4[0] + 1, new List("", tupledArg_4[1]), tupledArg_4[2], tupledArg_4[0]];
                continue AtStartOfIdentifier;
              }
            } else {
              tupledArg_4 = [tupledArg_4[0] + 1, new List(), tupledArg_4[2], null];
              continue AtStartOfIdentifier;
            }
          }
        }
      };

      const partialLongName = AtStartOfIdentifier([0, new List(), false, null]);
      const matchValue = reverse(partialLongName.QualifyingIdents);
      const $var9 = matchValue.tail != null ? (matchValue.head.length > 0 ? System.Char.IsDigit(matchValue.head[0]) : false) ? [0, matchValue.head] : [1] : [1];

      switch ($var9[0]) {
        case 0:
          return PartialLongName.Empty(index);

        case 1:
          return new PartialLongName(matchValue, partialLongName.PartialIdent, partialLongName.EndColumn, partialLongName.LastDotPos);
      }
    }
  };

  const TokenNameEquals = __exports.TokenNameEquals = function (tokenInfo, token2) {
    return compare(tokenInfo.TokenName, token2, 5) === 0;
  };

  const expected = ofArray([["dot"], ["ident"], ["member", "override"]]);

  const TestMemberOrOverrideDeclaration = __exports.TestMemberOrOverrideDeclaration = function (tokens) {
    const filteredReversed = tokens.filter(function (tok) {
      return (((!TokenNameEquals(tok, "comment") ? !TokenNameEquals(tok, "whitespace") : false) ? !TokenNameEquals(tok, "private") : false) ? !TokenNameEquals(tok, "internal") : false) ? !TokenNameEquals(tok, "public") : false;
    }).slice().reverse();

    if (filteredReversed.length < expected.length) {
      return false;
    } else {
      return forAll2(function (tok_1, expect) {
        return expect.some(function (token2) {
          return TokenNameEquals(tok_1, token2);
        });
      }, filteredReversed, expected);
    }
  };

  return __exports;
}({});