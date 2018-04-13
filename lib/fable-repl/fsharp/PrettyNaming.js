import { addInPlace } from "../fable-core/Set";
import { replace, join, split as split_1, printf, toFail, trim, isNullOrEmpty, compare, startsWith, endsWith } from "../fable-core/String";
import { zip, choose, exists, toList, tryFind, reduce, forAll } from "../fable-core/Seq";
import CurriedLambda from "../fable-core/CurriedLambda";
import { System } from "../fcs-fable/adapters";
import { create, tryGetValue } from "../fable-core/Map";
import { equalsRecords, Tuple, makeGeneric, compareUnions, equals, toString } from "../fable-core/Util";
import { fromEqualityComparer } from "../fable-core/Comparer";
import { getValue } from "../fable-core/Option";
import { TaggedTextOps, LayoutOps } from "../utils/sformat";
import Choice from "../fable-core/Choice";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { parse } from "../fable-core/Int32";
import { map, reverse, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { mkPos, mkRange, range } from "./range";
import { List as List_1 } from "../absil/illib";
import { map as map_1 } from "../fable-core/Array";
const opNameTable = [["[]", "op_Nil"], ["::", "op_ColonColon"], ["+", "op_Addition"], ["~%", "op_Splice"], ["~%%", "op_SpliceUntyped"], ["~++", "op_Increment"], ["~--", "op_Decrement"], ["-", "op_Subtraction"], ["*", "op_Multiply"], ["**", "op_Exponentiation"], ["/", "op_Division"], ["@", "op_Append"], ["^", "op_Concatenate"], ["%", "op_Modulus"], ["&&&", "op_BitwiseAnd"], ["|||", "op_BitwiseOr"], ["^^^", "op_ExclusiveOr"], ["<<<", "op_LeftShift"], ["~~~", "op_LogicalNot"], [">>>", "op_RightShift"], ["~+", "op_UnaryPlus"], ["~-", "op_UnaryNegation"], ["~&", "op_AddressOf"], ["~&&", "op_IntegerAddressOf"], ["&&", "op_BooleanAnd"], ["||", "op_BooleanOr"], ["<=", "op_LessThanOrEqual"], ["=", "op_Equality"], ["<>", "op_Inequality"], [">=", "op_GreaterThanOrEqual"], ["<", "op_LessThan"], [">", "op_GreaterThan"], ["|>", "op_PipeRight"], ["||>", "op_PipeRight2"], ["|||>", "op_PipeRight3"], ["<|", "op_PipeLeft"], ["<||", "op_PipeLeft2"], ["<|||", "op_PipeLeft3"], ["!", "op_Dereference"], [">>", "op_ComposeRight"], ["<<", "op_ComposeLeft"], ["<< >>", "op_TypedQuotationUnicode"], ["<<| |>>", "op_ChevronsBar"], ["<@ @>", "op_Quotation"], ["<@@ @@>", "op_QuotationUntyped"], ["+=", "op_AdditionAssignment"], ["-=", "op_SubtractionAssignment"], ["*=", "op_MultiplyAssignment"], ["/=", "op_DivisionAssignment"], ["..", "op_Range"], [".. ..", "op_RangeStep"], ["?", "op_Dynamic"], ["?<-", "op_DynamicAssignment"], [".()", "op_ArrayLookup"], [".()<-", "op_ArrayAssign"]];
const opCharTranslateTable = [[">", "Greater"], ["<", "Less"], ["+", "Plus"], ["-", "Minus"], ["*", "Multiply"], ["=", "Equals"], ["~", "Twiddle"], ["%", "Percent"], [".", "Dot"], ["$", "Dollar"], ["&", "Amp"], ["|", "Bar"], ["@", "At"], ["#", "Hash"], ["^", "Hat"], ["!", "Bang"], ["?", "Qmark"], ["/", "Divide"], [":", "Colon"], ["(", "LParen"], [",", "Comma"], [")", "RParen"], [" ", "Space"], ["[", "LBrack"], ["]", "RBrack"]];

const opCharSet = (() => {
  const t = new Set();

  for (let idx = 0; idx <= opCharTranslateTable.length - 1; idx++) {
    const forLoopVar = opCharTranslateTable[idx];
    addInPlace(forLoopVar[0], t);
  }

  return t;
})();

export function IsOperatorOrBacktickedName(name) {
  const nameLen = name.length | 0;

  const loop = function (i) {
    loop: while (true) {
      if (i < nameLen) {
        if (opCharSet.has(name[i])) {
          return true;
        } else {
          i = i + 1;
          continue loop;
        }
      } else {
        return false;
      }
    }
  };

  return loop(0);
}
export function IsOperatorName(name) {
  const name_1 = (name.indexOf("( ") === 0 ? endsWith(name, " )") : false) ? name.slice(2, name.length - 3 + 1) : name;
  const res = name_1 === ".. .." ? true : forAll(function (c) {
    return opCharSet.has(c) ? c !== " " : false;
  }, name_1);
  return res;
}
export function IsMangledOpName(n) {
  return startsWith(n, "op_", 4);
}
const compileCustomOpName = CurriedLambda((() => {
  let t2_1;
  const t2 = new Map();

  for (let idx = 0; idx <= opCharTranslateTable.length - 1; idx++) {
    const forLoopVar = opCharTranslateTable[idx];
    t2.set(forLoopVar[0], forLoopVar[1]);
  }

  t2_1 = t2;
  const maxOperatorNameLength = reduce((f => (x, y) => f(x) > f(y) ? x : y)($var1 => $var1[1].length), opCharTranslateTable)[1].length | 0;
  const compiledOperators = System.Collections.Concurrent.ConcurrentDictionary[".ctor_1"](System.StringComparer.Ordinal);
  return function (opp) {
    return compiledOperators.GetOrAdd(opp, function (op) {
      const opLength = op.length | 0;
      const sb = System.Text.StringBuilder[".ctor_1"]("op_", "op_".length + opLength * maxOperatorNameLength);

      for (let i = 0; i <= opLength - 1; i++) {
        const c = op[i];
        const matchValue = tryGetValue(t2_1, c, null);

        if (matchValue[0]) {
          sb.Append(matchValue[1]);
        } else {
          sb.Append(c);
        }
      }

      const opName = toString(sb);
      return opName;
    });
  };
})());
export const CompileOpName = CurriedLambda((() => {
  let standardOpNames;
  const opNames = create(null, fromEqualityComparer(System.StringComparer.Ordinal));

  for (let idx = 0; idx <= opNameTable.length - 1; idx++) {
    const forLoopVar = opNameTable[idx];
    opNames.set(forLoopVar[0], forLoopVar[1]);
  }

  standardOpNames = opNames;
  return function (op) {
    const matchValue = tryGetValue(standardOpNames, op, null);

    if (matchValue[0]) {
      return matchValue[1];
    } else if (IsOperatorOrBacktickedName(op)) {
      return compileCustomOpName(op);
    } else {
      return op;
    }
  };
})());
const decompileCustomOpName = CurriedLambda((() => {
  const decompiledOperators = System.Collections.Concurrent.ConcurrentDictionary[".ctor_1"](System.StringComparer.Ordinal);
  const minOperatorNameLength = reduce((f => (x, y) => f(x) < f(y) ? x : y)($var2 => $var2[1].length), opCharTranslateTable)[1].length | 0;
  return function (opName) {
    const matchValue = tryGetValue(decompiledOperators, opName, null);

    if (matchValue[0]) {
      return matchValue[1];
    } else {
      const opNameLen = opName.length | 0;

      const decompile = function (sb, idx) {
        decompile: while (true) {
          if (idx === opNameLen) {
            const decompiledOp = toString(sb);
            decompiledOperators.TryAdd(opName, decompiledOp);
            return decompiledOp;
          } else {
            const choice = tryFind(function (tupledArg) {
              const opCharNameLen = tupledArg[1].length | 0;

              if (opNameLen - idx < opCharNameLen) {
                return false;
              } else {
                return compare(opName, idx, tupledArg[1], 0, opCharNameLen, 4) === 0;
              }
            }, opCharTranslateTable);

            if (choice != null) {
              const opCharName = getValue(choice)[1];
              const opChar = getValue(choice)[0];
              sb.Append(opChar);
              sb = sb;
              idx = idx + opCharName.length;
              continue decompile;
            } else {
              return opName;
            }
          }
        }
      };

      const opNamePrefixLen = "op_".length | 0;
      let sb_1;
      const maxPossibleOpCharCount = ~~((opNameLen - opNamePrefixLen) / minOperatorNameLength) | 0;
      sb_1 = System.Text.StringBuilder[".ctor_0"](maxPossibleOpCharCount);
      return decompile(sb_1, opNamePrefixLen);
    }
  };
})());
export const DecompileOpName = CurriedLambda((() => {
  let standardOps;
  const ops = create(null, fromEqualityComparer(System.StringComparer.Ordinal));

  for (let idx = 0; idx <= opNameTable.length - 1; idx++) {
    const forLoopVar = opNameTable[idx];
    ops.set(forLoopVar[1], forLoopVar[0]);
  }

  standardOps = ops;
  return function (opName) {
    const matchValue = tryGetValue(standardOps, opName, null);

    if (matchValue[0]) {
      return matchValue[1];
    } else if (IsMangledOpName(opName)) {
      return decompileCustomOpName(opName);
    } else {
      return opName;
    }
  };
})());
export function DemangleOperatorName(nm) {
  const nm_1 = DecompileOpName(nm);

  if (IsOperatorOrBacktickedName(nm_1)) {
    return "( " + nm_1 + " )";
  } else {
    return nm_1;
  }
}
export function DemangleOperatorNameAsLayout(nonOpTagged, nm) {
  const nm_1 = DecompileOpName(nm);

  if (IsOperatorOrBacktickedName(nm_1)) {
    return LayoutOps.op_HatHat(LayoutOps.wordL(TaggedTextOps.tagPunctuation("(")), LayoutOps.op_HatHat(LayoutOps.wordL(TaggedTextOps.tagOperator(nm_1)), LayoutOps.wordL(TaggedTextOps.tagPunctuation(")"))));
  } else {
    return LayoutOps.wordL(nonOpTagged(nm_1));
  }
}
export const opNameCons = CompileOpName("::");
export const opNameNil = CompileOpName("[]");
export const opNameEquals = CompileOpName("=");
export const opNameEqualsNullable = CompileOpName("=?");
export const opNameNullableEquals = CompileOpName("?=");
export const opNameNullableEqualsNullable = CompileOpName("?=?");
export function IsIdentifierFirstCharacter(c) {
  if (c === "_") {
    return true;
  } else {
    const matchValue = System.Char.GetUnicodeCategory(c) | 0;

    switch (matchValue) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 9:
        return true;

      default:
        return false;
    }
  }
}
export function IsIdentifierPartCharacter(c) {
  if (c === "'") {
    return true;
  } else {
    const matchValue = System.Char.GetUnicodeCategory(c) | 0;

    switch (matchValue) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 8:
      case 9:
      case 18:
        return true;

      default:
        return false;
    }
  }
}
export function IsLongIdentifierPartCharacter(c) {
  if (c === ".") {
    return true;
  } else {
    return IsIdentifierPartCharacter(c);
  }
}
export function IsValidPrefixOperatorUse(s) {
  if (isNullOrEmpty(s)) {
    return false;
  } else {
    switch (s) {
      case "?+":
      case "?-":
      case "+":
      case "-":
      case "+.":
      case "-.":
      case "%":
      case "%%":
      case "&":
      case "&&":
        return true;

      default:
        if (s[0] === "!") {
          return true;
        } else if (s[0] === "~") {
          return forAll(function (c) {
            return c === "~";
          }, s);
        } else {
          return false;
        }

    }
  }
}
export function IsValidPrefixOperatorDefinitionName(s) {
  if (isNullOrEmpty(s)) {
    return false;
  } else {
    switch (s) {
      case "~?+":
      case "~?-":
      case "~+":
      case "~-":
      case "~+.":
      case "~-.":
      case "~%":
      case "~%%":
      case "~&":
      case "~&&":
        return true;

      default:
        if (s[0] === "!" ? s !== "!=" : false) {
          return true;
        } else if (s[0] === "~") {
          return forAll(function (c) {
            return c === "~";
          }, s);
        } else {
          return false;
        }

    }
  }
}
export function IsPrefixOperator(s) {
  if (isNullOrEmpty(s)) {
    return false;
  } else {
    const s_1 = DecompileOpName(s);

    switch (s_1) {
      case "~?+":
      case "~?-":
      case "~+":
      case "~-":
      case "~+.":
      case "~-.":
      case "~%":
      case "~%%":
      case "~&":
      case "~&&":
        return true;

      default:
        if (s_1[0] === "!" ? s_1 !== "!=" : false) {
          return true;
        } else if (s_1[0] === "~") {
          return forAll(function (c) {
            return c === "~";
          }, s_1);
        } else {
          return false;
        }

    }
  }
}
export function IsPunctuation(s) {
  if (isNullOrEmpty(s)) {
    return false;
  } else {
    switch (s) {
      case ",":
      case ";":
      case "|":
      case ":":
      case ".":
      case "*":
      case "(":
      case ")":
      case "[":
      case "]":
      case "{":
      case "}":
      case "<":
      case ">":
      case "[|":
      case "|]":
      case "[<":
      case ">]":
        return true;

      default:
        return false;
    }
  }
}
export function IsTernaryOperator(s) {
  return DecompileOpName(s) === "?<-";
}
export const IsInfixOperator = CurriedLambda((() => {
  const relational = ["=", "!=", "<", ">", "$"];
  const concat = ["@", "^"];
  const plusMinus = ["+", "-"];
  const otherMath = ["*", "/", "%"];
  const ignoredChars = [".", "?"];
  return function (s) {
    const s_1 = DecompileOpName(s);
    const skipIgnoredChars = trim(s_1, "start", ...ignoredChars);

    const afterSkipStartsWith = function (prefix) {
      return startsWith(skipIgnoredChars, prefix, 4);
    };

    const afterSkipStarts = function (prefixes) {
      return prefixes.some(afterSkipStartsWith);
    };

    if ((((((((s_1 === ":=" ? true : afterSkipStartsWith("|")) ? true : afterSkipStartsWith("&")) ? true : afterSkipStarts(relational)) ? true : s_1 === "$") ? true : afterSkipStarts(concat)) ? true : s_1 === "::") ? true : afterSkipStarts(plusMinus)) ? true : afterSkipStarts(otherMath)) {
      return true;
    } else {
      return s_1 === "**";
    }
  };
})());

function _Control_Equality_Relational_Indexer_FixedTypes_Other_(opName) {
  switch (opName) {
    case "&":
    case "or":
    case "&&":
    case "||":
      return new Choice(0, null);

    case "<>":
    case "=":
      return new Choice(1, null);

    case "<":
    case ">":
    case "<=":
    case ">=":
      return new Choice(2, null);

    case "<<":
    case "<|":
    case "<||":
    case "|>":
    case "||>":
    case "|||>":
    case ">>":
    case "^":
    case ":=":
    case "@":
      return new Choice(4, null);

    case ".[]":
      return new Choice(3, null);

    default:
      return new Choice(5, null);
  }
}

export { _Control_Equality_Relational_Indexer_FixedTypes_Other_ as $7C$Control$7C$Equality$7C$Relational$7C$Indexer$7C$FixedTypes$7C$Other$7C$ };
export function IsCompilerGeneratedName(nm) {
  return nm.indexOf("@") !== -1;
}
export function CompilerGeneratedName(nm) {
  if (IsCompilerGeneratedName(nm)) {
    return nm;
  } else {
    return nm + "@";
  }
}
export function GetBasicNameOfPossibleCompilerGeneratedName(name) {
  const matchValue = name.indexOf("@") | 0;
  const $var3 = matchValue === -1 ? [0] : matchValue === 0 ? [0] : [1];

  switch ($var3[0]) {
    case 0:
      return name;

    case 1:
      return name.slice(0, matchValue - 1 + 1);
  }
}
export function CompilerGeneratedNameSuffix(basicName, suffix) {
  return basicName + "@" + suffix;
}
export function IsMangledGenericName(n) {
  if (n.indexOf("`") !== -1) {
    const m = n.lastIndexOf("`") | 0;
    let res = m < n.length - 1;

    for (let i = m + 1; i <= n.length - 1; i++) {
      if (res ? n[i] >= "0" : false) {
        res = n[i] <= "9";
      } else {
        res = false;
      }
    }

    return res;
  } else {
    return false;
  }
}
export class NameArityPair {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PrettyNaming.NameArityPair",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NameArityPair", "string", "number"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.PrettyNaming.NameArityPair", NameArityPair);
export function DecodeGenericTypeName(n) {
  if (IsMangledGenericName(n)) {
    const pos = n.lastIndexOf("`") | 0;
    const res = n.substr(0, pos);
    const num = n.substr(pos + 1, n.length - pos - 1);
    return new NameArityPair(0, [res, parse(num)]);
  } else {
    return new NameArityPair(0, [n, 0]);
  }
}
export function DemangleGenericTypeName(n) {
  if (IsMangledGenericName(n)) {
    const pos = n.lastIndexOf("`") | 0;
    return n.substr(0, pos);
  } else {
    return n;
  }
}

function chopStringTo(s, c) {
  const matchValue = s.indexOf(c) | 0;

  if (matchValue === -1) {
    return s;
  } else {
    const i = matchValue + 1 | 0;
    return s.substr(i, s.length - i);
  }
}

export function TryChopPropertyName(s) {
  if (s.length <= 4) {
    return null;
  } else if (startsWith(s, "get_", 4) ? true : startsWith(s, "set_", 4)) {
    return s.substr(4, s.length - 4);
  } else {
    const s_1 = chopStringTo(s, ".");

    if (startsWith(s_1, "get_", 4) ? true : startsWith(s_1, "set_", 4)) {
      return s_1.substr(4, s_1.length - 4);
    } else {
      return null;
    }
  }
}
export function ChopPropertyName(s) {
  const matchValue = TryChopPropertyName(s);

  if (matchValue != null) {
    return getValue(matchValue);
  } else {
    return toFail(printf("Invalid internal property name: '%s'"))(s);
  }
}
export function SplitNamesForILPath(s) {
  if ((startsWith(s, "``", 4) ? endsWith(s, "``", 4) : false) ? s.length > 4 : false) {
    return ofArray([s.substr(2, s.length - 4)]);
  } else {
    return toList(split_1(s, ".", "`"));
  }
}

function splitAroundQuotation(text, separator) {
  const length = text.length | 0;

  const isNotQuotedQuotation = function (n) {
    if (n > 0) {
      return text[n - 1] !== "\\";
    } else {
      return false;
    }
  };

  const split = function (tupledArg) {
    split: while (true) {
      if (tupledArg[0] >= length) {
        return reverse(new List(tupledArg[1], tupledArg[2]));
      } else {
        const matchValue = [text[tupledArg[0]], tupledArg[3]];
        const $var4 = matchValue[1] ? [1] : matchValue[0] === separator ? [0] : [1];

        switch ($var4[0]) {
          case 0:
            tupledArg = [tupledArg[0] + 1, "", new List(tupledArg[1], tupledArg[2]), false];
            continue split;

          case 1:
            const $var5 = matchValue[1] ? matchValue[0] === separator ? [0] : [1] : [1];

            switch ($var5[0]) {
              case 0:
                tupledArg = [tupledArg[0] + 1, tupledArg[1] + System.Char.ToString(matchValue[0]), tupledArg[2], true];
                continue split;

              case 1:
                const $var6 = matchValue[0] === "\"" ? isNotQuotedQuotation(tupledArg[0]) ? [0] : [1] : [1];

                switch ($var6[0]) {
                  case 0:
                    tupledArg = [tupledArg[0] + 1, tupledArg[1] + "\"", tupledArg[2], !tupledArg[3]];
                    continue split;

                  case 1:
                    tupledArg = [tupledArg[0] + 1, tupledArg[1] + System.Char.ToString(matchValue[0]), tupledArg[2], tupledArg[3]];
                    continue split;
                }

            }

        }
      }
    }
  };

  return Array.from(split([0, "", new List(), false]));
}

function splitAroundQuotationWithCount(text, separator, count) {
  if (count <= 1) {
    return [text];
  } else {
    const mangledText = splitAroundQuotation(text, separator);
    const matchValue = mangledText.length > count;

    if (matchValue) {
      return mangledText.slice(0, count - 2 + 1).concat([join(System.Char.ToString(separator), mangledText.slice(count - 1, mangledText.length))]);
    } else {
      return mangledText;
    }
  }
}

export const IllegalCharactersInTypeAndNamespaceNames = [".", "+", "$", "&", "[", "]", "/", "\\", "*", "\"", "`"];
export function IsActivePatternName(nm) {
  const nameLen = nm.length | 0;

  if ((nm.indexOf("|") === 0 ? nm.lastIndexOf("|") === nameLen - 1 : false) ? nameLen >= 3 : false) {
    const core = nm.substr(1, nameLen - 2);

    if (forAll(function (c) {
      return (c === "|" ? true : c === " ") ? true : !opCharSet.has(c);
    }, core)) {
      return exists(function (c_1) {
        return c_1 === " " ? true : !opCharSet.has(c_1);
      }, core);
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export class ActivePatternInfo {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PrettyNaming.ActivePatternInfo",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["APInfo", "boolean", makeGeneric(List, {
        T: Tuple(["string", range])
      }), range]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get IsTotal() {
    return this.data[0];
  }

  get ActiveTags() {
    return map(tuple => tuple[0], this.data[1]);
  }

  get ActiveTagsWithRanges() {
    return this.data[1];
  }

  get Range() {
    return this.data[2];
  }

}
setType("Microsoft.FSharp.Compiler.PrettyNaming.ActivePatternInfo", ActivePatternInfo);
export function ActivePatternInfoOfValName(nm, m) {
  const loop = function (nm_1, mp) {
    const n = nm_1.indexOf("|") | 0;

    if (n > 0) {
      const m1 = mkRange(mp.FileName, mp.Start, mkPos(mp.StartLine, mp.StartColumn + n));
      const m2 = mkRange(mp.FileName, mkPos(mp.StartLine, mp.StartColumn + n + 1), mp.End);
      return new List([nm_1.slice(0, n - 1 + 1), m1], loop(nm_1.slice(n + 1, nm_1.length), m2));
    } else {
      const m1_1 = mkRange(mp.FileName, mp.Start, mkPos(mp.StartLine, mp.StartColumn + nm_1.length));
      return ofArray([[nm_1, m1_1]]);
    }
  };

  const nm_2 = DecompileOpName(nm);

  if (IsActivePatternName(nm_2)) {
    const m0 = mkRange(m.FileName, mkPos(m.StartLine, m.StartColumn + 1), mkPos(m.EndLine, m.EndColumn - 1));
    const names = loop(nm_2.slice(1, nm_2.length - 2 + 1), m0);
    const patternInput = List_1.frontAndBack(names);
    return patternInput[1][0] === "_" ? new ActivePatternInfo(0, [false, patternInput[0], m]) : new ActivePatternInfo(0, [true, names, m]);
  } else {
    return null;
  }
}

function mangleStaticStringArg(nm, v) {
  return nm + "=" + "\"" + replace(replace(v, "\\", "\\\\"), "\"", "\\\"") + "\"";
}

function tryDemangleStaticStringArg(mangledText) {
  const matchValue = splitAroundQuotationWithCount(mangledText, "=", 2);

  if (matchValue.length === 2) {
    const v = matchValue[1];
    const nm = matchValue[0];

    if (v.length >= 2) {
      return [nm, replace(replace(v.slice(1, v.length - 2 + 1), "\\\\", "\\"), "\\\"", "\"")];
    } else {
      return [nm, v];
    }
  } else {
    return null;
  }
}

export class InvalidMangledStaticArg extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, InvalidMangledStaticArg.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.PrettyNaming.InvalidMangledStaticArg",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.PrettyNaming.InvalidMangledStaticArg", InvalidMangledStaticArg);
export function demangleProvidedTypeName(typeLogicalName) {
  if (typeLogicalName.indexOf(",") >= 0) {
    const pieces = splitAroundQuotation(typeLogicalName, ",");
    const $var7 = pieces.length === 2 ? pieces[1] === "" ? [0] : [1] : [1];

    switch ($var7[0]) {
      case 0:
        const x = pieces[0];
        return [x, []];

      case 1:
        const argNamesAndValues = function (array) {
          return Array.from(choose(function (mangledText) {
            return tryDemangleStaticStringArg(mangledText);
          }, array));
        }(pieces.slice(1, pieces.length));

        if (argNamesAndValues.length === pieces.length - 1) {
          return [pieces[0], argNamesAndValues];
        } else {
          return [typeLogicalName, []];
        }

    }
  } else {
    return [typeLogicalName, []];
  }
}
export function mangleProvidedTypeName(typeLogicalName, nonDefaultArgs) {
  const nonDefaultArgsText = join(",", function (array) {
    return map_1(function (tupledArg) {
      return mangleStaticStringArg(tupledArg[0], tupledArg[1]);
    }, array, Array);
  }(nonDefaultArgs));

  if (nonDefaultArgsText === "") {
    return typeLogicalName;
  } else {
    return typeLogicalName + "," + nonDefaultArgsText;
  }
}
export function computeMangledNameWithoutDefaultArgValues(nm, staticArgs, defaultArgValues) {
  const nonDefaultArgs = Array.from(choose(function (tupledArg) {
    const actualArgValue = toString(tupledArg[0]);
    const $var8 = tupledArg[1][1] != null ? getValue(tupledArg[1][1]) === actualArgValue ? [0, getValue(tupledArg[1][1])] : [1] : [1];

    switch ($var8[0]) {
      case 0:
        return null;

      case 1:
        return [tupledArg[1][0], actualArgValue];
    }
  }, Array.from(zip(staticArgs, defaultArgValues))));
  return mangleProvidedTypeName(nm, nonDefaultArgs);
}