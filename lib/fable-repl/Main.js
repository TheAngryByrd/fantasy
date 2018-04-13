import { setType } from "./fable-core/Symbol";
import _Symbol from "./fable-core/Symbol";
import { InteractiveChecker } from "./fcs-fable/service_shim";
import { PathRef, Project, Compiler } from "./Fable.Compiler/State";
import { FSharpParseFileResults } from "./service/ServiceUntypedParse";
import { FSharpProjectOptions, FSharpCheckProjectResults, FSharpCheckFileResults } from "./service/service";
import { comparePrimitives, equalsRecords } from "./fable-core/Util";
import { map } from "./fable-core/Array";
import { getValue, defaultArg } from "./fable-core/Option";
import { map as map_1, concat, empty, singleton, append, delay, toList } from "./fable-core/Seq";
import { split } from "./fable-core/String";
import { SymbolLookupKind, getSymbol } from "./Lexer";
import { ofArray, reverse } from "./fable-core/List";
import List from "./fable-core/List";
import { FSharpTokenTag } from "./service/ServiceLexing";
import { singleton as singleton_1 } from "./fable-core/AsyncBuilder";
import { PartialLongName, QuickParse } from "./service/QuickParse";
import { now } from "./fable-core/Date";
import { create } from "./fable-core/Map";
import { SourceLocation, Path } from "./Fable.Core/Util";
import Comparer from "./fable-core/Comparer";
import { Compiler as Compiler_1 } from "./Fable.Compiler/Fable2Babel";
import { transformFile } from "./Fable.Compiler/FSharp2Fable";
import { Program } from "./AST/AST.Babel";
import { CompilerOptions } from "./Fable.Core/Compiler";
import { toJson } from "./fable-core/Serialize";

class CheckerImpl {
  [_Symbol.reflection]() {
    return {
      type: "Fable.JS.Main.CheckerImpl",
      interfaces: ["Fable.JS.Interfaces.IChecker"],
      properties: {
        Checker: InteractiveChecker
      }
    };
  }

  constructor(c) {
    this.c = c;
  }

  get Checker() {
    return this.c;
  }

}

setType("Fable.JS.Main.CheckerImpl", CheckerImpl);

class CompilerImpl {
  [_Symbol.reflection]() {
    return {
      type: "Fable.JS.Main.CompilerImpl",
      interfaces: ["Fable.JS.Interfaces.IFableCompiler"],
      properties: {
        Compiler: Compiler
      }
    };
  }

  constructor(c) {
    this.c = c;
  }

  get Compiler() {
    return this.c;
  }

}

setType("Fable.JS.Main.CompilerImpl", CompilerImpl);
export class ParseResults {
  constructor(parseFile, checkFile, checkProject) {
    this.ParseFile = parseFile;
    this.CheckFile = checkFile;
    this.CheckProject = checkProject;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.JS.Main.ParseResults",
      interfaces: ["FSharpRecord", "System.IEquatable", "Fable.JS.Interfaces.IParseResults"],
      properties: {
        ParseFile: FSharpParseFileResults,
        CheckFile: FSharpCheckFileResults,
        CheckProject: FSharpCheckProjectResults
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get Errors() {
    return map(er => {
      var matchValue;
      return {
        StartLineAlternate: er.StartLineAlternate,
        StartColumn: er.StartColumn,
        EndLineAlternate: er.EndLineAlternate,
        EndColumn: er.EndColumn,
        Message: er.Message,
        IsWarning: (matchValue = er.Severity, matchValue.tag === 0 ? true : false)
      };
    }, this.CheckProject.Errors, Array);
  }

}
setType("Fable.JS.Main.ParseResults", ParseResults);
export function findIdents(col, lineStr, lookupType) {
  if (lineStr === "") {
    return null;
  } else {
    return function (option) {
      return defaultArg(option, null, function (sym) {
        return sym.Text === "" ? null : [sym.RightColumn, toList(split(sym.Text, "."))];
      });
    }(getSymbol(0, col, lineStr, lookupType, []));
  }
}
export function findLongIdents(col, lineStr) {
  return findIdents(col, lineStr, new SymbolLookupKind(0));
}
export function findLongIdentsAndResidue(col, lineStr) {
  const lineStr_1 = lineStr.substr(0, col);
  const matchValue = getSymbol(0, col, lineStr_1, new SymbolLookupKind(2), []);

  if (matchValue != null) {
    if (getValue(matchValue).Text === "") {
      return [new List(), ""];
    } else {
      const res = reverse(ofArray(split(getValue(matchValue).Text, ".")));

      if (lineStr_1[col - 1] === ".") {
        return [reverse(res), ""];
      } else if (res.tail == null) {
        return [new List(), ""];
      } else {
        return [reverse(res.tail), res.head];
      }
    }
  } else {
    return [new List(), ""];
  }
}
export function convertGlyph(glyph) {
  switch (glyph.tag) {
    case 14:
    case 17:
    case 16:
    case 15:
      return "class";

    case 3:
    case 4:
      return "enum";

    case 1:
      return "value";

    case 18:
      return "variable";

    case 8:
      return "interface";

    case 11:
    case 12:
      return "module";

    case 9:
    case 10:
    case 19:
      return "method";

    case 13:
      return "property";

    case 7:
      return "field";

    case 2:
      return "function";

    case 20:
    case 6:
      return "error";

    case 5:
      return "event";

    default:
      return "class";
  }
}
export function parseFSharpProject(checker, fileName, source) {
  const patternInput = checker.ParseAndCheckScript(fileName, source);
  return new ParseResults(patternInput[0], patternInput[1], patternInput[2]);
}
export function tooltipToString(el) {
  const dataToString = function (data) {
    return Array.from(delay(function () {
      return append(data.ParamName == null ? singleton(data.MainDescription) : singleton(getValue(data.ParamName) + ": " + data.MainDescription), delay(function () {
        return append(data.XmlDoc.tag === 1 ? singleton(data.XmlDoc.data) : empty(), delay(function () {
          return append(data.TypeMapping, delay(function () {
            return data.Remarks == null ? empty() : singleton(getValue(data.Remarks));
          }));
        }));
      }));
    }));
  };

  if (el.tag === 1) {
    return Array.from(concat(map_1(dataToString, el.data)));
  } else if (el.tag === 2) {
    return [el.data];
  } else {
    return [];
  }
}
export function getToolTipAtLocation(parseResults, line, col, lineText) {
  return function (builder_) {
    return builder_.Delay(function () {
      const matchValue = findLongIdents(col - 1, lineText);

      if (matchValue != null) {
        const identIsland = getValue(matchValue)[1];
        const col_1 = getValue(matchValue)[0] | 0;
        return builder_.Bind(parseResults.CheckFile.GetToolTipText(line, col_1, lineText, identIsland, FSharpTokenTag.Identifier), function (_arg1) {
          return builder_.Return(Array.from(concat(map_1(function (el) {
            return tooltipToString(el);
          }, _arg1.data))));
        });
      } else {
        return builder_.Return(["Cannot find ident for tooltip"]);
      }
    });
  }(singleton_1);
}
export function getCompletionsAtLocation(parseResults, line, col, lineText) {
  return function (builder_) {
    return builder_.Delay(function () {
      const patternInput = findLongIdentsAndResidue(col - 1, lineText);
      const longName = QuickParse.GetPartialLongNameEx(lineText, col - 1);
      const longName_1 = new PartialLongName(patternInput[0], patternInput[1], longName.EndColumn, longName.LastDotPos);
      return builder_.Bind(parseResults.CheckFile.GetDeclarationListInfo(parseResults.ParseFile, line, lineText, longName_1, function () {
        return new List();
      }), function (_arg1) {
        return builder_.Return(map(function (decl) {
          return {
            Name: decl.Name,
            Glyph: convertGlyph(decl.Glyph)
          };
        }, _arg1.Items, Array));
      });
    });
  }(singleton_1);
}
export function makeProjOptions(_com, projFile) {
  const projOptions = new FSharpProjectOptions(projFile, [], [], [], false, false, now(), null, new List(), null, null);
  return projOptions;
}
export function compileAst(com, fileName, optimized, parseResults) {
  const projectOptions = makeProjOptions(com, fileName);
  const implFiles = create(map_1(function (file) {
    return [Path.normalizePath(file.FileName), file];
  }, optimized ? parseResults.CheckProject.GetOptimizedAssemblyContents().ImplementationFiles : parseResults.CheckProject.AssemblyContents.ImplementationFiles), new Comparer(comparePrimitives));
  const project = new Project(projectOptions, implFiles, parseResults.CheckProject.Errors, create(null, new Comparer(comparePrimitives)), new PathRef(1, ""), false);

  const file_2 = function (file_1) {
    return Compiler_1.transformFile(com, project, file_1);
  }(transformFile(com, project, project.ImplementationFiles, fileName));

  const loc = defaultArg(file_2.loc, SourceLocation.Empty);
  return new Program(file_2.fileName, loc, file_2.body, file_2.directives, com.ReadAllLogs());
}
export const defaultManager = {
  CreateChecker(references, readAllBytes) {
    return new CheckerImpl(InteractiveChecker.Create(references, readAllBytes));
  },

  CreateCompiler(fableCoreDir, replacements) {
    const options = new CompilerOptions(fableCoreDir, create(replacements != null ? replacements : [], new Comparer(comparePrimitives)), true, false, false);
    return new CompilerImpl(new Compiler(options));
  },

  ParseFSharpProject(checker, fileName, source) {
    const c = checker;
    return parseFSharpProject(c.Checker, fileName, source);
  },

  GetToolTipText(parseResults, line, col, lineText) {
    const res = parseResults;
    return getToolTipAtLocation(res, line, col, lineText);
  },

  GetCompletionsAtLocation(parseResults, line, col, lineText) {
    const res = parseResults;
    return getCompletionsAtLocation(res, line, col, lineText);
  },

  CompileToBabelAst(com, parseResults, fileName, optimized) {
    var com_2;
    const com_1 = com;
    const res = parseResults;
    return (com_2 = com_1.Compiler, parseResults_1 => compileAst(com_2, fileName, optimized, parseResults_1))(res);
  },

  CompileToBabelJsonAst(com, parseResults, fileName, optimized) {
    const optimized_1 = optimized != null ? optimized : false;
    return toJson(this.CompileToBabelAst(com, parseResults, fileName, optimized_1));
  },

  [_Symbol.reflection]() {
    return {
      interfaces: ["Fable.JS.Interfaces.IFableManager"]
    };
  }

};
export default defaultManager;