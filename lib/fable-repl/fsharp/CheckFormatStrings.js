import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { TyparConstraint, TyparDynamicReq, TyparKind, NewTypar, TyparRigidity, TType } from "./tast";
import { NewInferenceType, FreshenAndFixupTypars } from "./ConstraintSolver";
import { map as map_1, reverse, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { TyparStaticReq, mkSynId, SynTypar } from "./ast";
import { toString, equals, compareRecords, equalsRecords, Option } from "../fable-core/Util";
import { printf, toFail, split, replace } from "../fable-core/String";
import { defaultArg, getValue } from "../fable-core/Option";
import { foldBack, toList, forAll, map, scan } from "../fable-core/Seq";
import { SR } from "../codegen/FSComp";
import { System } from "../fcs-fable/adapters";
import { mkPos, mkFileIndexRange } from "./range";
import { mkRefTupledTy, op_MinusMinusGreater } from "./TastOps";
import { String as _String } from "../absil/illib";
export class FormatItem {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CheckFormatStrings.FormatItem",
      interfaces: ["FSharpUnion"],
      cases: [["Simple", TType], ["FuncAndVal"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.CheckFormatStrings.FormatItem", FormatItem);
export function copyAndFixupFormatTypar(m, tp) {
  const patternInput = FreshenAndFixupTypars(m, new TyparRigidity(3), new List(), new List(), ofArray([tp]));
  return patternInput[2].head;
}
export const lowestDefaultPriority = 0;
export function mkFlexibleFormatTypar(m, tys, dflt) {
  const tp = NewTypar(new TyparKind(0), new TyparRigidity(0), new SynTypar(0, [mkSynId(m, "fmt"), new TyparStaticReq(1), true]), false, new TyparDynamicReq(1), new List(), false, false);
  tp.FixupConstraints(ofArray([new TyparConstraint(6, [tys, m]), new TyparConstraint(1, [lowestDefaultPriority, dflt, m])]));
  return copyAndFixupFormatTypar(m, tp);
}
export function mkFlexibleIntFormatTypar(g, m) {
  return mkFlexibleFormatTypar(m, ofArray([g.byte_ty, g.int16_ty, g.int32_ty, g.int64_ty, g.sbyte_ty, g.uint16_ty, g.uint32_ty, g.uint64_ty, g.nativeint_ty, g.unativeint_ty]), g.int_ty);
}
export function mkFlexibleDecimalFormatTypar(g, m) {
  return mkFlexibleFormatTypar(m, ofArray([g.decimal_ty]), g.decimal_ty);
}
export function mkFlexibleFloatFormatTypar(g, m) {
  return mkFlexibleFormatTypar(m, ofArray([g.float_ty, g.float32_ty, g.decimal_ty]), g.float_ty);
}
export function isDigit(c) {
  if ("0" <= c) {
    return c <= "9";
  } else {
    return false;
  }
}
export class FormatInfoRegister {
  constructor(leftJustify, numPrefixIfPos, addZeros, precision) {
    this.leftJustify = leftJustify;
    this.numPrefixIfPos = numPrefixIfPos;
    this.addZeros = addZeros;
    this.precision = precision;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CheckFormatStrings.FormatInfoRegister",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        leftJustify: "boolean",
        numPrefixIfPos: Option("string"),
        addZeros: "boolean",
        precision: "boolean"
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
setType("Microsoft.FSharp.Compiler.CheckFormatStrings.FormatInfoRegister", FormatInfoRegister);
export function newInfo() {
  return new FormatInfoRegister(false, null, false, false);
}
export function parseFormatStringInternal(m, g, source, fmt, bty, cty) {
  let patternInput;

  if (source == null) {
    patternInput = [1, fmt];
  } else {
    const source_1 = replace(replace(getValue(source), "\r\n", "\n"), "\r", "\n");
    const positions = Int32Array.from(scan(function (x, y) {
      return x + y;
    }, 0, map(function (s) {
      return s.length + 1;
    }, split(source_1, "\n"))));
    const length = source_1.length | 0;

    if (m.EndLine < positions.length) {
      const startIndex = positions[m.StartLine - 1] + m.StartColumn | 0;
      const endIndex = positions[m.EndLine - 1] + m.EndColumn - 1 | 0;

      if (startIndex < length - 3 ? source_1.slice(startIndex, startIndex + 2 + 1) === "\"\"\"" : false) {
        patternInput = [3, source_1.slice(startIndex + 3, endIndex - 3 + 1)];
      } else if (startIndex < length - 2 ? source_1.slice(startIndex, startIndex + 1 + 1) === "@\"" : false) {
        patternInput = [2, source_1.slice(startIndex + 2, endIndex - 1 + 1)];
      } else {
        patternInput = [1, source_1.slice(startIndex + 1, endIndex - 1 + 1)];
      }
    } else {
      patternInput = [1, fmt];
    }
  }

  const len = patternInput[1].length | 0;
  const specifierLocations = [];

  const parseLoop = function (acc, tupledArg) {
    var copyOfStruct_1;

    parseLoop: while (true) {
      if (tupledArg[0] >= len) {
        const argtys = forAll(function (tupledArg_1) {
          return equals(tupledArg_1[0], null);
        }, acc) ? reverse(map_1(function (tuple) {
          return tuple[1];
        }, acc)) : toFail(printf("%s"))(SR.forPositionalSpecifiersNotPermitted());
        return argtys;
      } else if (System.Char.IsSurrogatePair(patternInput[1], tupledArg[0])) {
        acc = acc;
        tupledArg = [tupledArg[0] + 2, tupledArg[1], tupledArg[2] + 2];
        continue parseLoop;
      } else {
        const c = patternInput[1][tupledArg[0]];

        if (c === "\n") {
          acc = acc;
          tupledArg = [tupledArg[0] + 1, tupledArg[1] + 1, 0];
          continue parseLoop;
        } else if (c === "%") {
          const relCol = tupledArg[2] + 1 | 0;
          const i = tupledArg[0] + 1 | 0;

          if (i >= len) {
            toFail(printf("%s"))(SR.forMissingFormatSpecifier());
          }

          const info = newInfo();

          const flags = function (i_1) {
            flags: while (true) {
              if (i_1 >= len) {
                toFail(printf("%s"))(SR.forMissingFormatSpecifier());
              }

              const matchValue = patternInput[1][i_1];

              if (matchValue === " ") {
                if (!equals(info.numPrefixIfPos, null)) {
                  toFail(printf("%s"))(SR.forPrefixFlagSpacePlusSetTwice());
                }

                info.numPrefixIfPos = " ";
                i_1 = i_1 + 1;
                continue flags;
              } else if (matchValue === "#") {
                return toFail(printf("%s"))(SR.forHashSpecifierIsInvalid()) | 0;
              } else if (matchValue === "+") {
                if (!equals(info.numPrefixIfPos, null)) {
                  toFail(printf("%s"))(SR.forPrefixFlagSpacePlusSetTwice());
                }

                info.numPrefixIfPos = "+";
                i_1 = i_1 + 1;
                continue flags;
              } else if (matchValue === "-") {
                if (info.leftJustify) {
                  toFail(printf("%s"))(SR.forFlagSetTwice("-"));
                }

                info.leftJustify = true;
                i_1 = i_1 + 1;
                continue flags;
              } else if (matchValue === "0") {
                if (info.addZeros) {
                  toFail(printf("%s"))(SR.forFlagSetTwice("0"));
                }

                info.addZeros = true;
                i_1 = i_1 + 1;
                continue flags;
              } else {
                return i_1 | 0;
              }
            }
          };

          const digitsPrecision = function (i_2) {
            digitsPrecision: while (true) {
              if (i_2 >= len) {
                toFail(printf("%s"))(SR.forBadPrecision());
              }

              const matchValue_1 = patternInput[1][i_2];

              if (isDigit(matchValue_1)) {
                i_2 = i_2 + 1;
                continue digitsPrecision;
              } else {
                return i_2 | 0;
              }
            }
          };

          const precision = function (i_3) {
            if (i_3 >= len) {
              toFail(printf("%s"))(SR.forBadWidth());
            }

            const matchValue_2 = patternInput[1][i_3];

            if (isDigit(matchValue_2)) {
              info.precision = true;
              return [false, digitsPrecision(i_3 + 1)];
            } else if (matchValue_2 === "*") {
              info.precision = true;
              return [true, i_3 + 1];
            } else {
              return toFail(printf("%s"))(SR.forPrecisionMissingAfterDot());
            }
          };

          const optionalDotAndPrecision = function (i_4) {
            if (i_4 >= len) {
              toFail(printf("%s"))(SR.forBadPrecision());
            }

            const matchValue_3 = patternInput[1][i_4];

            if (matchValue_3 === ".") {
              return precision(i_4 + 1);
            } else {
              return [false, i_4];
            }
          };

          const digitsWidthAndPrecision = function (i_5) {
            digitsWidthAndPrecision: while (true) {
              if (i_5 >= len) {
                toFail(printf("%s"))(SR.forBadPrecision());
              }

              const matchValue_4 = patternInput[1][i_5];

              if (isDigit(matchValue_4)) {
                i_5 = i_5 + 1;
                continue digitsWidthAndPrecision;
              } else {
                return optionalDotAndPrecision(i_5);
              }
            }
          };

          const widthAndPrecision = function (i_6) {
            if (i_6 >= len) {
              toFail(printf("%s"))(SR.forBadPrecision());
            }

            const matchValue_5 = patternInput[1][i_6];

            if (isDigit(matchValue_5)) {
              return [false, digitsWidthAndPrecision(i_6)];
            } else if (matchValue_5 === "*") {
              return [true, optionalDotAndPrecision(i_6 + 1)];
            } else {
              return [false, optionalDotAndPrecision(i_6)];
            }
          };

          const digitsPosition = function (n, i_7) {
            digitsPosition: while (true) {
              if (i_7 >= len) {
                toFail(printf("%s"))(SR.forBadPrecision());
              }

              const matchValue_6 = patternInput[1][i_7];

              if (isDigit(matchValue_6)) {
                n = n * 10 + matchValue_6.charCodeAt(0) - "0".charCodeAt(0);
                i_7 = i_7 + 1;
                continue digitsPosition;
              } else if (matchValue_6 === "$") {
                return [n, i_7 + 1];
              } else {
                return [null, i_7];
              }
            }
          };

          const position = function (i_8) {
            const matchValue_7 = patternInput[1][i_8];

            if (matchValue_7 >= "1" ? matchValue_7 <= "9" : false) {
              const patternInput_1 = digitsPosition(matchValue_7.charCodeAt(0) - "0".charCodeAt(0), i_8 + 1);

              if (equals(patternInput_1[0], null)) {
                return [null, i_8];
              } else {
                return [patternInput_1[0], patternInput_1[1]];
              }
            } else {
              return [null, i_8];
            }
          };

          const patternInput_2 = position(i);
          const relCol_1 = relCol + patternInput_2[1] - i | 0;
          const i_9 = flags(patternInput_2[1]) | 0;
          const relCol_2 = relCol_1 + i_9 - patternInput_2[1] | 0;
          const patternInput_3 = widthAndPrecision(i_9);
          const precisionArg = patternInput_3[1][0];
          const i_10 = patternInput_3[1][1] | 0;
          const relCol_3 = relCol_2 + i_10 - i_9 | 0;

          if (i_10 >= len) {
            toFail(printf("%s"))(SR.forBadPrecision());
          }

          const acc_1 = precisionArg ? new List([defaultArg(patternInput_2[0], null, function (y_1) {
            return 1 + y_1;
          }), g.int_ty], acc) : acc;
          const acc_2 = patternInput_3[0] ? new List([defaultArg(patternInput_2[0], null, function (y_2) {
            return 1 + y_2;
          }), g.int_ty], acc_1) : acc_1;

          const checkNoPrecision = function (c_1) {
            if (info.precision) {
              toFail(printf("%s"))(SR.forFormatDoesntSupportPrecision(toString(c_1)));
            }
          };

          const checkNoZeroFlag = function (c_2) {
            if (info.addZeros) {
              toFail(printf("%s"))(SR.forDoesNotSupportZeroFlag(toString(c_2)));
            }
          };

          const checkNoNumericPrefix = function (c_3) {
            var copyOfStruct;

            if (!equals(info.numPrefixIfPos, null)) {
              toFail(printf("%s"))(SR.forDoesNotSupportPrefixFlag(toString(c_3), (copyOfStruct = getValue(info.numPrefixIfPos), toString(copyOfStruct))));
            }
          };

          const checkOtherFlags = function (c_4) {
            checkNoPrecision(c_4);
            checkNoZeroFlag(c_4);
            checkNoNumericPrefix(c_4);
          };

          const collectSpecifierLocation = function (relLine, relCol_4, numStdArgs) {
            const numArgsForSpecifier = numStdArgs + (patternInput_3[0] ? 1 : 0) + (precisionArg ? 1 : 0) | 0;

            if (relLine === 0) {
              specifierLocations.push([mkFileIndexRange(m.FileIndex, mkPos(m.StartLine, tupledArg[2] + patternInput[0]), mkPos(m.StartLine, relCol_4 + patternInput[0] + 1)), numArgsForSpecifier]);
            } else {
              specifierLocations.push([mkFileIndexRange(m.FileIndex, mkPos(m.StartLine + relLine, tupledArg[2]), mkPos(m.StartLine + relLine, relCol_4 + 1)), numArgsForSpecifier]);
            }
          };

          const ch = patternInput[1][i_10];
          const $var1 = ch === "%" ? [0] : ch === "A" ? [10] : ch === "E" ? [5] : ch === "F" ? [5] : ch === "G" ? [5] : ch === "H" ? [3] : ch === "L" ? [2] : ch === "M" ? [4] : ch === "O" ? [9] : ch === "X" ? [1] : ch === "a" ? [11] : ch === "b" ? [6] : ch === "c" ? [7] : ch === "d" ? [1] : ch === "e" ? [5] : ch === "f" ? [5] : ch === "g" ? [5] : ch === "h" ? [3] : ch === "i" ? [1] : ch === "l" ? [2] : ch === "o" ? [1] : ch === "s" ? [8] : ch === "t" ? [12] : ch === "u" ? [1] : ch === "x" ? [1] : [13];

          switch ($var1[0]) {
            case 0:
              collectSpecifierLocation(tupledArg[1], relCol_3, 0);
              acc = acc_2;
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 1:
              if (info.precision) {
                toFail(printf("%s"))(SR.forFormatDoesntSupportPrecision(toString(ch)));
              }

              collectSpecifierLocation(tupledArg[1], relCol_3, 1);
              acc = new List([patternInput_2[0], mkFlexibleIntFormatTypar(g, m)], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 2:
              if (info.precision) {
                toFail(printf("%s"))(SR.forFormatDoesntSupportPrecision(toString(ch)));
              }

              const relCol_5 = relCol_3 + 1 | 0;
              const i_11 = i_10 + 1 | 0;

              if (i_11 >= len) {
                toFail(printf("%s"))(SR.forBadFormatSpecifier());
              }

              toFail(printf("%s"))(SR.forLIsUnnecessary());
              const matchValue_8 = patternInput[1][i_11];
              const $var2 = matchValue_8 === "X" ? [0] : matchValue_8 === "d" ? [0] : matchValue_8 === "i" ? [0] : matchValue_8 === "o" ? [0] : matchValue_8 === "u" ? [0] : matchValue_8 === "x" ? [0] : [1];

              switch ($var2[0]) {
                case 0:
                  collectSpecifierLocation(tupledArg[1], relCol_5, 1);
                  acc = new List([patternInput_2[0], mkFlexibleIntFormatTypar(g, m)], acc_2);
                  tupledArg = [i_11 + 1, tupledArg[1], relCol_5 + 1];
                  continue parseLoop;

                case 1:
                  return toFail(printf("%s"))(SR.forBadFormatSpecifier());
              }

            case 3:
              return toFail(printf("%s"))(SR.forHIsUnnecessary());

            case 4:
              collectSpecifierLocation(tupledArg[1], relCol_3, 1);
              acc = new List([patternInput_2[0], mkFlexibleDecimalFormatTypar(g, m)], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 5:
              collectSpecifierLocation(tupledArg[1], relCol_3, 1);
              acc = new List([patternInput_2[0], mkFlexibleFloatFormatTypar(g, m)], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 6:
              checkOtherFlags(ch);
              collectSpecifierLocation(tupledArg[1], relCol_3, 1);
              acc = new List([patternInput_2[0], g.bool_ty], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 7:
              checkOtherFlags(ch);
              collectSpecifierLocation(tupledArg[1], relCol_3, 1);
              acc = new List([patternInput_2[0], g.char_ty], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 8:
              checkOtherFlags(ch);
              collectSpecifierLocation(tupledArg[1], relCol_3, 1);
              acc = new List([patternInput_2[0], g.string_ty], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 9:
              checkOtherFlags(ch);
              collectSpecifierLocation(tupledArg[1], relCol_3, 1);
              acc = new List([patternInput_2[0], NewInferenceType()], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 10:
              const matchValue_9 = info.numPrefixIfPos;
              const $var3 = matchValue_9 != null ? getValue(matchValue_9) === "+" ? [0] : [1] : [0];

              switch ($var3[0]) {
                case 0:
                  collectSpecifierLocation(tupledArg[1], relCol_3, 1);
                  acc = new List([patternInput_2[0], NewInferenceType()], acc_2);
                  tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
                  continue parseLoop;

                case 1:
                  return toFail(printf("%s"))(SR.forDoesNotSupportPrefixFlag(toString(ch), (copyOfStruct_1 = getValue(info.numPrefixIfPos), toString(copyOfStruct_1))));
              }

            case 11:
              checkOtherFlags(ch);
              const xty = NewInferenceType();
              const fty = op_MinusMinusGreater(bty, op_MinusMinusGreater(xty, cty));
              collectSpecifierLocation(tupledArg[1], relCol_3, 2);
              acc = ofArray([[defaultArg(patternInput_2[0], null, function (y_3) {
                return 1 + y_3;
              }), xty], [patternInput_2[0], fty]], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 12:
              checkOtherFlags(ch);
              collectSpecifierLocation(tupledArg[1], relCol_3, 1);
              acc = new List([patternInput_2[0], op_MinusMinusGreater(bty, cty)], acc_2);
              tupledArg = [i_10 + 1, tupledArg[1], relCol_3 + 1];
              continue parseLoop;

            case 13:
              return toFail(printf("%s"))(SR.forBadFormatSpecifierGeneral(_String.make(1, ch)));
          }
        } else {
          acc = acc;
          tupledArg = [tupledArg[0] + 1, tupledArg[1], tupledArg[2] + 1];
          continue parseLoop;
        }
      }
    }
  };

  const results = parseLoop(new List(), [0, 0, m.StartColumn]);
  return [results, toList(specifierLocations)];
}
export function ParseFormatString(m, g, source, fmt, bty, cty, dty) {
  const patternInput = parseFormatStringInternal(m, g, source, fmt, bty, cty);
  const aty = foldBack(function (arg00_, arg10_) {
    return op_MinusMinusGreater(arg00_, arg10_);
  }, patternInput[0], dty);
  const ety = mkRefTupledTy(g, patternInput[0]);
  return [[aty, ety], patternInput[1]];
}
export function TryCountFormatStringArguments(m, g, fmt, bty, cty) {
  try {
    const patternInput = parseFormatStringInternal(m, g, null, fmt, bty, cty);
    return patternInput[0].length;
  } catch (matchValue) {
    return null;
  }
}