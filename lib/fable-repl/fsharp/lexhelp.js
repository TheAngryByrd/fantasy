import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { getValue } from "../fable-core/Option";
import CurriedLambda from "../fable-core/CurriedLambda";
import { tryGetValue } from "../fable-core/Map";
import { token } from "../codegen/pars";
import { comparePrimitives, hasInterface, compareUnions, equals, equalsRecords, Any, makeGeneric } from "../fable-core/Util";
import { choose, map, ofArray, append } from "../fable-core/List";
import List from "../fable-core/List";
import { Error as _Error, warning, WrappedError, BuildPhase, PushThreadBuildPhaseUntilUnwind, ErrorLogger } from "./ErrorLogger";
import { LexBuffer$60$1$2E$get_LexemeRange as LexBuffer_1_get_LexemeRange, LexbufLocalXmlDocStore } from "./ast";
import { fileOfFileIndex, range, fileIndexOfFile, range0 } from "./range";
import { Position } from "../utils/prim-lexing";
import { System } from "../fcs-fable/adapters";
import { forAll, initialize } from "../fable-core/Seq";
import { IsIdentifierFirstCharacter, IsIdentifierPartCharacter, IsCompilerGeneratedName } from "./PrettyNaming";
import { SR } from "../codegen/FSComp";
import { endsWith, isNullOrWhiteSpace } from "../fable-core/String";
import { Shim } from "../absil/illib";
export const stdinMockFilename = "stdin";
export class LightSyntaxStatus {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lexhelp.LightSyntaxStatus",
      properties: {
        ExplicitlySet: "boolean",
        Status: "boolean",
        WarnOnMultipleTokens: "boolean"
      }
    };
  }

  constructor(initial, warn) {
    this.initial = initial;
    this.warn = warn;
    this.status = null;
  }

  static [".ctor"](initial, warn, _arg1) {
    return new LightSyntaxStatus(initial, warn);
  }

  get Status() {
    const matchValue = this.status;

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return this.initial;
    }
  }

  set Status(v) {
    this.status = v;
  }

  get ExplicitlySet() {
    return CurriedLambda(() => this.status != null)();
  }

  get WarnOnMultipleTokens() {
    return this.warn;
  }

}
setType("Microsoft.FSharp.Compiler.Lexhelp.LightSyntaxStatus", LightSyntaxStatus);
export class LexResourceManager {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lexhelp.LexResourceManager",
      properties: {}
    };
  }

  constructor() {
    this.strings = new Map();
  }

  static [".ctor"](_arg1) {
    return new LexResourceManager();
  }

  InternIdentifierToken(s) {
    const patternInput = tryGetValue(this.strings, s, null);

    if (patternInput[0]) {
      return patternInput[1];
    } else {
      const res = new token(189, s);
      this.strings.set(s, res);
      return res;
    }
  }

}
setType("Microsoft.FSharp.Compiler.Lexhelp.LexResourceManager", LexResourceManager);
export class lexargs {
  constructor(defines, ifdefStack, resourceManager, lightSyntaxStatus, errorLogger, applyLineDirectives) {
    this.defines = defines;
    this.ifdefStack = ifdefStack;
    this.resourceManager = resourceManager;
    this.lightSyntaxStatus = lightSyntaxStatus;
    this.errorLogger = errorLogger;
    this.applyLineDirectives = applyLineDirectives;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lexhelp.lexargs",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        defines: makeGeneric(List, {
          T: "string"
        }),
        ifdefStack: Any,
        resourceManager: LexResourceManager,
        lightSyntaxStatus: LightSyntaxStatus,
        errorLogger: ErrorLogger,
        applyLineDirectives: "boolean"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Lexhelp.lexargs", lexargs);
export class LongUnicodeLexResult {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lexhelp.LongUnicodeLexResult",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["SurrogatePair", "number", "number"], ["SingleChar", "number"], ["Invalid"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.Lexhelp.LongUnicodeLexResult", LongUnicodeLexResult);
export function mkLexargs(_filename, defines, lightSyntaxStatus, resourceManager, ifdefStack, errorLogger) {
  return new lexargs(defines, ifdefStack, resourceManager, lightSyntaxStatus, errorLogger, true);
}
export function reusingLexbufForParsing(lexbuf, f) {
  const unwindBuildPhase = PushThreadBuildPhaseUntilUnwind(new BuildPhase(3));

  try {
    LexbufLocalXmlDocStore.ClearXmlDoc(lexbuf);

    try {
      return f();
    } catch (e) {
      throw new WrappedError(e, (() => {
        try {
          return LexBuffer_1_get_LexemeRange.bind(lexbuf)();
        } catch (matchValue) {
          return range0;
        }
      })());
    }
  } finally {
    if (hasInterface(unwindBuildPhase, "System.IDisposable")) {
      unwindBuildPhase.Dispose();
    }
  }
}
export function resetLexbufPos(filename, lexbuf) {
  lexbuf.EndPos = Position.FirstLine(fileIndexOfFile(filename));
}
export function usingLexbufForParsing(lexbuf, filename, f) {
  resetLexbufPos(filename, lexbuf);
  return reusingLexbufForParsing(lexbuf, function () {
    return f(lexbuf);
  });
}
export function defaultStringFinisher(_endm, _b, s) {
  return new token(191, System.Text.Encoding.Unicode.GetString(s, 0, s.length));
}
export function callStringFinisher(fin, buf, endm, b) {
  return fin(endm, b, buf.Close());
}
export function addUnicodeString(buf, x) {
  buf.EmitBytes(System.Text.Encoding.Unicode.GetBytes(x));
}
export function addIntChar(buf, c) {
  buf.EmitIntAsByte(c % 256);
  buf.EmitIntAsByte(~~(c / 256));
}
export function addUnicodeChar(buf, c) {
  addIntChar(buf, c);
}
export function addByteChar(buf, c) {
  addIntChar(buf, c.charCodeAt(0) % 256);
}
export function stringBufferAsString(buf) {
  if (buf.length % 2 !== 0) {
    throw new Error("Expected even number of bytes");
  }

  const chars = new Array(~~(buf.length / 2)).fill(null);

  for (let i = 0; i <= ~~(buf.length / 2) - 1; i++) {
    const hi = buf[i * 2 + 1];
    const lo = buf[i * 2];
    const c = String.fromCharCode(~~hi * 256 + ~~lo);
    chars[i] = c;
  }

  return chars.join("");
}
export function stringBufferAsBytes(buf) {
  const bytes = buf.Close();
  return Uint8Array.from(initialize(~~(bytes.length / 2), function (i) {
    return bytes[i * 2];
  }));
}
export function stringBufferIsBytes(buf) {
  const bytes = buf.Close();
  let ok = true;

  for (let i = 0; i <= ~~(bytes.length / 2) - 1; i++) {
    if (bytes[i * 2 + 1] !== 0) {
      ok = false;
    }
  }

  return ok;
}
export function newline(lexbuf) {
  let copyOfStruct = lexbuf.EndPos;
  lexbuf.EndPos = copyOfStruct.NextLine;
}
export function trigraph(c1, c2, c3) {
  const digit = function (c) {
    return c.charCodeAt(0) - "0".charCodeAt(0) | 0;
  };

  return String.fromCharCode(digit(c1) * 100 + digit(c2) * 10 + digit(c3));
}
export function digit(d) {
  if (d >= "0" ? d <= "9" : false) {
    return d.charCodeAt(0) - "0".charCodeAt(0) | 0;
  } else {
    throw new Error("digit");
  }
}
export function hexdigit(d) {
  if (d >= "0" ? d <= "9" : false) {
    return digit(d) | 0;
  } else if (d >= "a" ? d <= "f" : false) {
    return d.charCodeAt(0) - "a".charCodeAt(0) + 10 | 0;
  } else if (d >= "A" ? d <= "F" : false) {
    return d.charCodeAt(0) - "A".charCodeAt(0) + 10 | 0;
  } else {
    throw new Error("hexdigit");
  }
}
export function unicodeGraphShort(s) {
  if (s.length !== 4) {
    throw new Error("unicodegraph");
  }

  return hexdigit(s[0]) * 4096 + hexdigit(s[1]) * 256 + hexdigit(s[2]) * 16 + hexdigit(s[3]) & 0xFFFF;
}
export function hexGraphShort(s) {
  if (s.length !== 2) {
    throw new Error("hexgraph");
  }

  return hexdigit(s[0]) * 16 + hexdigit(s[1]) & 0xFFFF;
}
export function unicodeGraphLong(s) {
  if (s.length !== 8) {
    throw new Error("unicodeGraphLong");
  }

  const high = hexdigit(s[0]) * 4096 + hexdigit(s[1]) * 256 + hexdigit(s[2]) * 16 + hexdigit(s[3]) | 0;
  const low = hexdigit(s[4]) * 4096 + hexdigit(s[5]) * 256 + hexdigit(s[6]) * 16 + hexdigit(s[7]) | 0;

  if (high === 0) {
    return new LongUnicodeLexResult(1, low & 0xFFFF);
  } else if (high > 16) {
    return new LongUnicodeLexResult(2);
  } else {
    const codepoint = high * 65536 + low | 0;
    const hiSurr = 55296 + ~~((codepoint - 65536) / 1024) & 0xFFFF;
    const loSurr = 56320 + (codepoint - 65536) % 1024 & 0xFFFF;
    return new LongUnicodeLexResult(0, [hiSurr, loSurr]);
  }
}
export function escape(c) {
  if (c === "'") {
    return "'";
  } else if (c === "\\") {
    return "\\";
  } else if (c === "a") {
    return String.fromCharCode(7);
  } else if (c === "b") {
    return "\b";
  } else if (c === "f") {
    return String.fromCharCode(12);
  } else if (c === "n") {
    return "\n";
  } else if (c === "r") {
    return "\r";
  } else if (c === "t") {
    return "\t";
  } else if (c === "v") {
    return String.fromCharCode(11);
  } else {
    return c;
  }
}
export class ReservedKeyword extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, ReservedKeyword.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lexhelp.ReservedKeyword",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Lexhelp.ReservedKeyword", ReservedKeyword);
export class IndentationProblem extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, IndentationProblem.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Lexhelp.IndentationProblem",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.Lexhelp.IndentationProblem", IndentationProblem);
export const Keywords = function (__exports) {
  const compatibilityMode = class compatibilityMode {
    constructor(tag) {
      this.tag = tag | 0;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.Lexhelp.Keywords.compatibilityMode",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["ALWAYS"], ["FSHARP"]]
      };
    }

    Equals(other) {
      return this.tag === other.tag;
    }

    CompareTo(other) {
      return comparePrimitives(this.tag, other.tag);
    }

  };
  setType("Microsoft.FSharp.Compiler.Lexhelp.Keywords.compatibilityMode", compatibilityMode);
  const keywordList = append(ofArray([[new compatibilityMode(1), "abstract", new token(49)], [new compatibilityMode(0), "and", new token(130)], [new compatibilityMode(0), "as", new token(131)], [new compatibilityMode(0), "assert", new token(132)], [new compatibilityMode(0), "asr", new token(188, "asr")], [new compatibilityMode(0), "base", new token(152)], [new compatibilityMode(0), "begin", new token(135)], [new compatibilityMode(0), "class", new token(48)], [new compatibilityMode(1), "const", new token(113)], [new compatibilityMode(1), "default", new token(51)], [new compatibilityMode(1), "delegate", new token(150)], [new compatibilityMode(0), "do", new token(136)], [new compatibilityMode(0), "done", new token(137)], [new compatibilityMode(1), "downcast", new token(145)], [new compatibilityMode(0), "downto", new token(138)], [new compatibilityMode(1), "elif", new token(140)], [new compatibilityMode(0), "else", new token(139)], [new compatibilityMode(0), "end", new token(141)], [new compatibilityMode(0), "exception", new token(120)], [new compatibilityMode(1), "extern", new token(40)], [new compatibilityMode(0), "false", new token(121)], [new compatibilityMode(0), "finally", new token(128)], [new compatibilityMode(1), "fixed", new token(13)], [new compatibilityMode(0), "for", new token(122)], [new compatibilityMode(0), "fun", new token(123)], [new compatibilityMode(0), "function", new token(124)], [new compatibilityMode(1), "global", new token(45)], [new compatibilityMode(0), "if", new token(125)], [new compatibilityMode(0), "in", new token(126)], [new compatibilityMode(0), "inherit", new token(53)], [new compatibilityMode(1), "inline", new token(110)], [new compatibilityMode(1), "interface", new token(111)], [new compatibilityMode(1), "internal", new token(44)], [new compatibilityMode(0), "land", new token(183, "land")], [new compatibilityMode(0), "lazy", new token(114)], [new compatibilityMode(0), "let", new token(160, false)], [new compatibilityMode(0), "lor", new token(183, "lor")], [new compatibilityMode(0), "lsl", new token(188, "lsl")], [new compatibilityMode(0), "lsr", new token(188, "lsr")], [new compatibilityMode(0), "lxor", new token(183, "lxor")], [new compatibilityMode(0), "match", new token(116)], [new compatibilityMode(1), "member", new token(47)], [new compatibilityMode(0), "mod", new token(183, "mod")], [new compatibilityMode(0), "module", new token(148)], [new compatibilityMode(0), "mutable", new token(117)], [new compatibilityMode(1), "namespace", new token(149)], [new compatibilityMode(0), "new", new token(118)], [new compatibilityMode(1), "null", new token(146)], [new compatibilityMode(0), "of", new token(119)], [new compatibilityMode(0), "open", new token(101)], [new compatibilityMode(0), "or", new token(102)], [new compatibilityMode(1), "override", new token(50)], [new compatibilityMode(0), "private", new token(43)], [new compatibilityMode(1), "public", new token(42)], [new compatibilityMode(0), "rec", new token(103)], [new compatibilityMode(1), "return", new token(161, false)], [new compatibilityMode(0), "sig", new token(56)], [new compatibilityMode(1), "static", new token(46)], [new compatibilityMode(0), "struct", new token(55)], [new compatibilityMode(0), "then", new token(104)], [new compatibilityMode(0), "to", new token(105)], [new compatibilityMode(0), "true", new token(106)], [new compatibilityMode(0), "try", new token(107)], [new compatibilityMode(0), "type", new token(108)], [new compatibilityMode(1), "upcast", new token(144)], [new compatibilityMode(1), "use", new token(160, true)], [new compatibilityMode(0), "val", new token(109)], [new compatibilityMode(1), "void", new token(41)], [new compatibilityMode(0), "when", new token(85)], [new compatibilityMode(0), "while", new token(86)], [new compatibilityMode(0), "with", new token(87)], [new compatibilityMode(1), "yield", new token(161, true)], [new compatibilityMode(0), "_", new token(67)], [new compatibilityMode(1), "__token_OBLOCKSEP", new token(21)], [new compatibilityMode(1), "__token_OWITH", new token(26)], [new compatibilityMode(1), "__token_ODECLEND", new token(19)], [new compatibilityMode(1), "__token_OTHEN", new token(28)], [new compatibilityMode(1), "__token_OELSE", new token(27)], [new compatibilityMode(1), "__token_OEND", new token(20)], [new compatibilityMode(1), "__token_ODO", new token(30)], [new compatibilityMode(1), "__token_OLET", new token(32, true)], [new compatibilityMode(1), "__token_constraint", new token(151)]]), map(function (s) {
    return [new compatibilityMode(1), s, new token(147)];
  }, ofArray(["break", "checked", "component", "constraint", "continue", "fori", "include", "mixin", "parallel", "params", "process", "protected", "pure", "sealed", "trait", "tailcall", "virtual"])));
  const unreserveWords = choose(function (_arg1) {
    return _arg1[0].Equals(new compatibilityMode(1)) ? _arg1[1] : null;
  }, keywordList);
  const keywordNames = __exports.keywordNames = map(function (tupledArg) {
    return tupledArg[1];
  }, keywordList);

  const keywordTable = __exports.keywordTable = (() => {
    const tab = new Map();

    for (let forLoopVar of keywordList) {
      tab.set(forLoopVar[1], forLoopVar[2]);
    }

    return tab;
  })();

  const KeywordToken = __exports.KeywordToken = function (s) {
    return keywordTable.get(s);
  };

  const IdentifierToken = __exports.IdentifierToken = function (args, lexbuf, s) {
    if (IsCompilerGeneratedName(s)) {
      warning(new _Error(SR.lexhlpIdentifiersContainingAtSymbolReserved(), LexBuffer_1_get_LexemeRange.bind(lexbuf)()));
    }

    return args.resourceManager.InternIdentifierToken(s);
  };

  const KeywordOrIdentifierToken = __exports.KeywordOrIdentifierToken = function (args, lexbuf, s) {
    var copyOfStruct;
    var copyOfStruct_1;
    var copyOfStruct_2;
    const matchValue = tryGetValue(keywordTable, s, null);

    if (matchValue[0]) {
      if (matchValue[1].tag === 147) {
        warning(new ReservedKeyword(SR.lexhlpIdentifierReserved(s), LexBuffer_1_get_LexemeRange.bind(lexbuf)()));
        return IdentifierToken(args, lexbuf, s);
      } else {
        return matchValue[1];
      }
    } else if (s === "__SOURCE_DIRECTORY__") {
      const filename = fileOfFileIndex((copyOfStruct = lexbuf.StartPos, copyOfStruct.FileIndex));
      const dirname = isNullOrWhiteSpace(filename) ? "" : filename === stdinMockFilename ? System.IO.Directory.GetCurrentDirectory() : System.IO.Path.GetDirectoryName(function (arg00) {
        return Shim.FileSystem().GetFullPathShim(arg00);
      }(filename));
      return new token(190, dirname);
    } else if (s === "__SOURCE_FILE__") {
      return new token(190, System.IO.Path.GetFileName(fileOfFileIndex((copyOfStruct_1 = lexbuf.StartPos, copyOfStruct_1.FileIndex))));
    } else if (s === "__LINE__") {
      return new token(190, (copyOfStruct_2 = lexbuf.StartPos, copyOfStruct_2.Line).toString());
    } else {
      return IdentifierToken(args, lexbuf, s);
    }
  };

  const QuoteIdentifierIfNeeded = __exports.QuoteIdentifierIfNeeded = function (s) {
    if ((!forAll(function (c) {
      return IsIdentifierPartCharacter(c);
    }, s) ? true : s.length > 0 ? !IsIdentifierFirstCharacter(s[0]) : false) ? true : keywordTable.has(s)) {
      return "``" + s + "``";
    } else {
      return s;
    }
  };

  const NormalizeIdentifierBackticks = __exports.NormalizeIdentifierBackticks = function (s) {
    const s_1 = (s.indexOf("``") === 0 ? endsWith(s, "``") : false) ? s.slice(2, s.length - 3 + 1) : s;
    return QuoteIdentifierIfNeeded(s_1);
  };

  const keywordsWithDescription = __exports.keywordsWithDescription = ofArray([["abstract", SR.keywordDescriptionAbstract()], ["and", SR.keyworkDescriptionAnd()], ["as", SR.keywordDescriptionAs()], ["assert", SR.keywordDescriptionAssert()], ["base", SR.keywordDescriptionBase()], ["begin", SR.keywordDescriptionBegin()], ["class", SR.keywordDescriptionClass()], ["default", SR.keywordDescriptionDefault()], ["delegate", SR.keywordDescriptionDelegate()], ["do", SR.keywordDescriptionDo()], ["done", SR.keywordDescriptionDone()], ["downcast", SR.keywordDescriptionDowncast()], ["downto", SR.keywordDescriptionDownto()], ["elif", SR.keywordDescriptionElif()], ["else", SR.keywordDescriptionElse()], ["end", SR.keywordDescriptionEnd()], ["exception", SR.keywordDescriptionException()], ["extern", SR.keywordDescriptionExtern()], ["false", SR.keywordDescriptionTrueFalse()], ["finally", SR.keywordDescriptionFinally()], ["for", SR.keywordDescriptionFor()], ["fun", SR.keywordDescriptionFun()], ["function", SR.keywordDescriptionFunction()], ["global", SR.keywordDescriptionGlobal()], ["if", SR.keywordDescriptionIf()], ["in", SR.keywordDescriptionIn()], ["inherit", SR.keywordDescriptionInherit()], ["inline", SR.keywordDescriptionInline()], ["interface", SR.keywordDescriptionInterface()], ["internal", SR.keywordDescriptionInternal()], ["lazy", SR.keywordDescriptionLazy()], ["let", SR.keywordDescriptionLet()], ["let!", SR.keywordDescriptionLetBang()], ["match", SR.keywordDescriptionMatch()], ["member", SR.keywordDescriptionMember()], ["module", SR.keywordDescriptionModule()], ["mutable", SR.keywordDescriptionMutable()], ["namespace", SR.keywordDescriptionNamespace()], ["new", SR.keywordDescriptionNew()], ["not", SR.keywordDescriptionNot()], ["null", SR.keywordDescriptionNull()], ["of", SR.keywordDescriptionOf()], ["open", SR.keywordDescriptionOpen()], ["or", SR.keywordDescriptionOr()], ["override", SR.keywordDescriptionOverride()], ["private", SR.keywordDescriptionPrivate()], ["public", SR.keywordDescriptionPublic()], ["rec", SR.keywordDescriptionRec()], ["return", SR.keywordDescriptionReturn()], ["return!", SR.keywordDescriptionReturnBang()], ["select", SR.keywordDescriptionSelect()], ["static", SR.keywordDescriptionStatic()], ["struct", SR.keywordDescriptionStruct()], ["then", SR.keywordDescriptionThen()], ["to", SR.keywordDescriptionTo()], ["true", SR.keywordDescriptionTrueFalse()], ["try", SR.keywordDescriptionTry()], ["type", SR.keywordDescriptionType()], ["upcast", SR.keywordDescriptionUpcast()], ["use", SR.keywordDescriptionUse()], ["use!", SR.keywordDescriptionUseBang()], ["val", SR.keywordDescriptionVal()], ["void", SR.keywordDescriptionVoid()], ["when", SR.keywordDescriptionWhen()], ["while", SR.keywordDescriptionWhile()], ["with", SR.keywordDescriptionWith()], ["yield", SR.keywordDescriptionYield()], ["yield!", SR.keywordDescriptionYieldBang()], ["->", SR.keywordDescriptionRightArrow()], ["<-", SR.keywordDescriptionLeftArrow()], [":>", SR.keywordDescriptionCast()], [":?>", SR.keywordDescriptionDynamicCast()], ["<@", SR.keywordDescriptionTypedQuotation()], ["@>", SR.keywordDescriptionTypedQuotation()], ["<@@", SR.keywordDescriptionUntypedQuotation()], ["@@>", SR.keywordDescriptionUntypedQuotation()]]);
  return __exports;
}({});