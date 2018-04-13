import { verbose, bufs, GetEnvInteger } from "../fsharp/lib";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { getHashCode, hash, createAtom, Array as _Array, compareRecords, equalsRecords, GenericParam, compareUnions, equals, extendInfo, toString, hasInterface, Option, makeGeneric, compare, comparePrimitives } from "../fable-core/Util";
import { range0, rangeN, range, mkPos, Line } from "../fsharp/range";
import { isNullOrEmpty, replace, printf, toText } from "../fable-core/String";
import { SplitRelatedDiagnostics, ReportWarning, ReportWarningAsError, GetDiagnosticNumber, OutputPhasedDiagnostic, GetRangeOfDiagnostic } from "../fsharp/CompileOps";
import { defaultArgWith, defaultArg, makeSome, getValue } from "../fable-core/Option";
import { concat, map, ofArray, filter } from "../fable-core/List";
import List from "../fable-core/List";
import { UnresolvedPathReferenceNoRange, simulateError, PhasedDiagnostic, Error as _Error, errorRecovery, ErrorLogger, PushErrorLoggerPhaseUntilUnwind, BuildPhase, PushThreadBuildPhaseUntilUnwind } from "../fsharp/ErrorLogger";
import CurriedLambda from "../fable-core/CurriedLambda";
import { mapIndexed, item as item_1, exists, fold, zip, forAll, map as map_1, iterate, tryPick, collect, append, empty, singleton, delay, toList } from "../fable-core/Seq";
import { DummyFileNameForRangesWithoutASpecificLocation } from "../fsharp/TcGlobals";
import { LeftL, sepListL, SepL, WordL, mkNav, sepL, emptyL, RightL, TaggedTextOps, wordL, op_HatHat, showL } from "../fsharp/layout";
import { singleton as singleton_1 } from "../fable-core/AsyncBuilder";
import { ItemWithNoInst, Item, ItemsAreEffectivelyEqual, ItemWithInst } from "../fsharp/NameResolution";
import { entityRefInThisAssembly, tyconRefUsesLocalXmlDoc, valRefInThisAssembly, typarRefEq, TType, $7C$ERefLocal$7C$ERefNonLocal$7C$ as _ERefLocal_ERefNonLocal_, ccuOfValRef, ccuOfTyconRef, EntityRef } from "../fsharp/tast";
import { recdFieldsOfExnDefRef, ticksAndArgCountTextOfTyconRef, fullDisplayTextOfParentOfModRef, fullDisplayTextOfTyconRefAsLayout, fullDisplayTextOfExnRefAsLayout, PrettyTypes, fullDisplayTextOfValRefAsLayout, tryDestAppTy, fullDisplayTextOfRecdFieldRef, fullDisplayTextOfExnRef, ActivePatternElemRef$2E$get_Name as ActivePatternElemRef_get_Name, ActivePatternInfo$2E$get_Names as ActivePatternInfo_get_Names, fullDisplayTextOfUnionCaseRef, fullDisplayTextOfValRef, DisplayEnv, generalizedTyconRef, valRefEq, fullDisplayTextOfModRef, typeEquiv, tcrefOfAppTy, tyconRefEq, isAppTy, XmlDocArgsEnc, XmlDocSigOfUnionCase, XmlDocSigOfProperty, buildAccessPath, XmlDocSigOfVal, XmlDocSigOfEntity, isILAppTy, generalizeTypars, rangeOfFunTy, HasFSharpAttribute, ArgInfosOfMember, tryNiceEntityRefOfTy, $7C$AppTy$7C$_$7C$ as _AppTy___, isFunTy, tryDestForallTy } from "../fsharp/TastOps";
import { SR } from "../codegen/FSComp";
import { dprintf } from "../absil/ildiag";
import { IPartialEqualityComparer, String as _String } from "../absil/illib";
import { ExistsHeadTypeInEntireHierarchy, EventInfo, PropInfo, MethInfo, ILPropInfo, ILMethInfo, ILTypeInfo, ParamNameAndType } from "../fsharp/infos";
import { Microsoft } from "../fcs-fable/adapters";
import { layoutTycon, prettyLayoutOfPropInfoFreeStyle, layoutILTypeRef, layoutConst, layoutExnDef, layoutUnionCases, layoutTyconRef, layoutQualifiedValOrMember, outputTyconRef, outputILTypeRef, prettyLayoutOfMethInfoFreeStyle, layoutType } from "../fsharp/NicePrint";
import { DecompileOpName } from "../fsharp/PrettyNaming";
import { TcFieldInit } from "../fsharp/TypeChecker";
import { GetSigOfFunctionForDelegate, PropTypOfEventInfo } from "../fsharp/InfoReader";
import { AccessorDomain } from "../fsharp/AccessibilityLogic";
export const EnvMisc2 = function (__exports) {
  const maxMembers = __exports.maxMembers = GetEnvInteger("FCS_MaxMembersInQuickInfo", 10);
  return __exports;
}({});
export class FSharpErrorSeverity {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpErrorSeverity",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Warning"], ["Error"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpErrorSeverity", FSharpErrorSeverity);
export class FSharpErrorInfo {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpErrorInfo",
      properties: {
        EndColumn: "number",
        EndLine: "number",
        EndLineAlternate: "number",
        ErrorNumber: "number",
        FileName: "string",
        Message: "string",
        Severity: FSharpErrorSeverity,
        StartColumn: "number",
        StartLine: "number",
        StartLineAlternate: "number",
        Subcategory: "string"
      }
    };
  }

  constructor(fileName, s, e, severity, message, subcategory, errorNum) {
    this.fileName = fileName;
    this.s = s;
    this.e = e;
    this.severity = severity;
    this.message = message;
    this.subcategory = subcategory;
    this.errorNum = errorNum | 0;
  }

  get StartLine() {
    return Line.toZ(this.s.Line);
  }

  get StartLineAlternate() {
    return this.s.Line;
  }

  get EndLine() {
    return Line.toZ(this.e.Line);
  }

  get EndLineAlternate() {
    return this.e.Line;
  }

  get StartColumn() {
    return this.s.Column;
  }

  get EndColumn() {
    return this.e.Column;
  }

  get Severity() {
    return this.severity;
  }

  get Message() {
    return this.message;
  }

  get Subcategory() {
    return this.subcategory;
  }

  get FileName() {
    return this.fileName;
  }

  get ErrorNumber() {
    return this.errorNum;
  }

  WithStart(newStart) {
    return new FSharpErrorInfo(this.fileName, newStart, this.e, this.severity, this.message, this.subcategory, this.errorNum);
  }

  WithEnd(newEnd) {
    return new FSharpErrorInfo(this.fileName, this.s, newEnd, this.severity, this.message, this.subcategory, this.errorNum);
  }

  ToString() {
    return toText(printf("%s (%d,%d)-(%d,%d) %s %s %s"))(this.fileName, this.s.Line, this.s.Column + 1, this.e.Line, this.e.Column + 1, this.subcategory, this.severity.Equals(new FSharpErrorSeverity(0)) ? "warning" : "error", this.message);
  }

  static CreateFromException(exn, isError, fallbackRange) {
    let m;
    const matchValue = GetRangeOfDiagnostic(exn);

    if (matchValue == null) {
      m = fallbackRange;
    } else {
      m = getValue(matchValue);
    }

    const msg = bufs(function (buf) {
      OutputPhasedDiagnostic(buf, exn, false);
    });
    const errorNum = GetDiagnosticNumber(exn) | 0;
    return new FSharpErrorInfo(m.FileName, m.Start, m.End, isError ? new FSharpErrorSeverity(1) : new FSharpErrorSeverity(0), msg, exn.Subcategory(), errorNum);
  }

  static CreateFromExceptionAndAdjustEof(exn, isError, fallbackRange, _arg1) {
    const r = FSharpErrorInfo.CreateFromException(exn, isError, fallbackRange);
    const patternInput = compare([r.StartLineAlternate, false], [_arg1[0], true]) < 0 ? [r.StartLineAlternate, false] : [_arg1[0], true];
    const patternInput_1 = compare([r.EndLineAlternate, false], [_arg1[0], true]) < 0 ? [r.EndLineAlternate, false] : [_arg1[0], true];

    if (!(patternInput[1] ? true : patternInput_1[1])) {
      return r;
    } else {
      const r_1 = patternInput[1] ? r.WithStart(mkPos(patternInput[0], _arg1[1])) : r;

      if (patternInput_1[1]) {
        return r_1.WithEnd(mkPos(patternInput_1[0], 1 + _arg1[1]));
      } else {
        return r_1;
      }
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpErrorInfo", FSharpErrorInfo);
export class ErrorScope {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.ErrorScope",
      interfaces: ["System.IDisposable"],
      properties: {
        Diagnostics: makeGeneric(List, {
          T: FSharpErrorInfo
        }),
        Errors: makeGeneric(List, {
          T: FSharpErrorInfo
        }),
        FirstError: Option("string"),
        Warnings: makeGeneric(List, {
          T: FSharpErrorInfo
        })
      }
    };
  }

  constructor() {
    this.errors = new List();
    this.firstError = null;
    this.unwindBP = PushThreadBuildPhaseUntilUnwind(new BuildPhase(4));
    this.unwindEL = PushErrorLoggerPhaseUntilUnwind(_oldLogger => {
      const $var1 = this;
      return new class extends ErrorLogger {
        constructor() {
          return super("ErrorScope");
        }

        DiagnosticSink(exn, isError) {
          const err = FSharpErrorInfo.CreateFromException(exn, isError, range.Zero);
          $var1.errors = new List(err, $var1.errors);

          if (isError ? CurriedLambda(() => $var1.firstError == null)() : false) {
            $var1.firstError = err.Message;
          }
        }

        get ErrorCount() {
          return $var1.errors.length;
        }

        [_Symbol.reflection]() {
          return {
            interfaces: ["Microsoft.FSharp.Compiler.ErrorLogger.ErrorLogger"]
          };
        }

      }();
    });
  }

  get Errors() {
    return filter(error => error.Severity.Equals(new FSharpErrorSeverity(1)), this.errors);
  }

  get Warnings() {
    return filter(error => error.Severity.Equals(new FSharpErrorSeverity(0)), this.errors);
  }

  get Diagnostics() {
    return this.errors;
  }

  TryGetFirstErrorText() {
    const matchValue = this.Errors;

    if (matchValue.tail == null) {
      return null;
    } else {
      return matchValue.head.Message;
    }
  }

  get FirstError() {
    return this.firstError;
  }

  set FirstError(v) {
    this.firstError = v;
  }

  static Protect(m, f, err) {
    const errorScope = new ErrorScope();

    try {
      let res;

      try {
        res = makeSome(f());
      } catch (e) {
        try {
          errorRecovery(e, m);
        } catch (matchValue) {
          errorScope.FirstError = toString(e);
        }

        res = null;
      }

      if (res == null) {
        const matchValue_1 = errorScope.TryGetFirstErrorText();

        if (matchValue_1 == null) {
          return err("");
        } else {
          return err(getValue(matchValue_1));
        }
      } else {
        return getValue(res);
      }
    } finally {
      if (hasInterface(errorScope, "System.IDisposable")) {
        errorScope.Dispose();
      }
    }
  }

  Dispose() {
    this.unwindEL.Dispose();
    this.unwindBP.Dispose();
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.ErrorScope", ErrorScope);
export class CompilationErrorLogger extends ErrorLogger {
  [_Symbol.reflection]() {
    return extendInfo(CompilationErrorLogger, {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.CompilationErrorLogger",
      interfaces: [],
      properties: {
        ErrorCount: "number"
      }
    });
  }

  constructor(debugName, options) {
    super("CompilationErrorLogger(" + debugName + ")");
    this.options = options;
    this.errorCount = 0;
    this.diagnostics = [];
  }

  DiagnosticSink(exn, isError) {
    if (isError ? true : ReportWarningAsError(this.options, exn)) {
      this.diagnostics.push([exn, new FSharpErrorSeverity(1)]);
      this.errorCount = this.errorCount + 1 | 0;
    } else if (ReportWarning(this.options, exn)) {
      this.diagnostics.push([exn, new FSharpErrorSeverity(0)]);
    }
  }

  get ErrorCount() {
    return this.errorCount;
  }

  GetErrors() {
    return Array.from(this.diagnostics);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.CompilationErrorLogger", CompilationErrorLogger);
export class CompilationGlobalsScope {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.CompilationGlobalsScope",
      interfaces: ["System.IDisposable"],
      properties: {}
    };
  }

  constructor(errorLogger, phase) {
    this.unwindEL = PushErrorLoggerPhaseUntilUnwind(_arg1 => errorLogger);
    this.unwindBP = PushThreadBuildPhaseUntilUnwind(phase);
  }

  Dispose() {
    this.unwindBP.Dispose();
    this.unwindEL.Dispose();
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.CompilationGlobalsScope", CompilationGlobalsScope);
export const ErrorHelpers = function (__exports) {
  const ReportError = __exports.ReportError = function (options, allErrors, mainInputFileName, fileInfo, _arg1) {
    return toList(delay(function () {
      const isError = _arg1[1].Equals(new FSharpErrorSeverity(1)) ? true : ReportWarningAsError(options, _arg1[0]);

      if (isError ? true : ReportWarning(options, _arg1[0])) {
        const oneError = function (exn) {
          return toList(delay(function () {
            const fallbackRange = rangeN(mainInputFileName, 1);
            const ei = FSharpErrorInfo.CreateFromExceptionAndAdjustEof(exn, isError, fallbackRange, fileInfo);

            if ((allErrors ? true : ei.FileName === mainInputFileName) ? true : ei.FileName === DummyFileNameForRangesWithoutASpecificLocation) {
              return singleton(ei);
            } else {
              return empty();
            }
          }));
        };

        const patternInput = SplitRelatedDiagnostics(_arg1[0]);
        return append(oneError(patternInput[0]), delay(function () {
          return collect(function (e) {
            return oneError(e);
          }, patternInput[1]);
        }));
      } else {
        return empty();
      }
    }));
  };

  const CreateErrorInfos = __exports.CreateErrorInfos = function (options, allErrors, mainInputFileName, errors) {
    const fileInfo = [2147483647, 2147483647];
    return Array.from(delay(function () {
      return collect(function (matchValue) {
        return ReportError(options, allErrors, mainInputFileName, fileInfo, [matchValue[0], matchValue[1]]);
      }, errors);
    }));
  };

  return __exports;
}({});
export class FSharpXmlDoc {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpXmlDoc",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["None"], ["Text", "string"], ["XmlDocFileSignature", "string", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpXmlDoc", FSharpXmlDoc);
export class FSharpToolTipElementData {
  constructor(mainDescription, xmlDoc, typeMapping, remarks, paramName) {
    this.MainDescription = mainDescription;
    this.XmlDoc = xmlDoc;
    this.TypeMapping = typeMapping;
    this.Remarks = remarks;
    this.ParamName = paramName;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpToolTipElementData",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        MainDescription: GenericParam("T"),
        XmlDoc: FSharpXmlDoc,
        TypeMapping: makeGeneric(List, {
          T: GenericParam("T")
        }),
        Remarks: Option(GenericParam("T")),
        ParamName: Option("string")
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static Create(layout, xml, typeMapping, paramName, remarks) {
    const TypeMapping = typeMapping != null ? typeMapping : new List();
    return new FSharpToolTipElementData(layout, xml, TypeMapping, remarks, paramName);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpToolTipElementData", FSharpToolTipElementData);
export class FSharpToolTipElement {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpToolTipElement",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["None"], ["Group", makeGeneric(List, {
        T: makeGeneric(FSharpToolTipElementData, {
          T: GenericParam("T")
        })
      })], ["CompositionError", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  static Single(layout, xml, typeMapping, paramName, remarks) {
    return new FSharpToolTipElement(1, ofArray([FSharpToolTipElementData.Create(layout, xml, typeMapping, paramName, remarks)]));
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpToolTipElement", FSharpToolTipElement);
export class FSharpToolTipText {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpToolTipText",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["FSharpToolTipText", makeGeneric(List, {
        T: makeGeneric(FSharpToolTipElement, {
          T: GenericParam("T")
        })
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpToolTipText", FSharpToolTipText);
export const Tooltips = function (__exports) {
  const ToFSharpToolTipElement = __exports.ToFSharpToolTipElement = function (tooltip) {
    if (tooltip.tag === 1) {
      return new FSharpToolTipElement(1, map(function (x) {
        const MainDescription = showL(x.MainDescription);
        const TypeMapping = map(function (arg00_) {
          return showL(arg00_);
        }, x.TypeMapping);
        return new FSharpToolTipElementData(MainDescription, x.XmlDoc, TypeMapping, defaultArg(x.Remarks, null, function (arg00__1) {
          return showL(arg00__1);
        }), x.ParamName);
      }, tooltip.data));
    } else if (tooltip.tag === 2) {
      return new FSharpToolTipElement(2, tooltip.data);
    } else {
      return new FSharpToolTipElement(0);
    }
  };

  const ToFSharpToolTipText = __exports.ToFSharpToolTipText = function (_arg1) {
    return new FSharpToolTipText(0, map(function (arg00_) {
      return ToFSharpToolTipElement(arg00_);
    }, _arg1.data));
  };

  const _Map = __exports.Map = function (f, a) {
    return singleton_1.Bind(a, $var2 => function (arg00) {
      return singleton_1.Return(arg00);
    }(f($var2)));
  };

  return __exports;
}({});
export class CompletionItemKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.CompletionItemKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Field"], ["Property"], ["Method", "boolean"], ["Event"], ["Argument"], ["Other"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.CompletionItemKind", CompletionItemKind);
export class UnresolvedSymbol {
  constructor(displayName, namespace) {
    this.DisplayName = displayName;
    this.Namespace = namespace;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.UnresolvedSymbol",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        DisplayName: "string",
        Namespace: _Array("string")
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
setType("Microsoft.FSharp.Compiler.SourceCodeServices.UnresolvedSymbol", UnresolvedSymbol);
export class CompletionItem {
  constructor(itemWithInst, kind, isOwnMember, minorPriority, type, unresolved) {
    this.ItemWithInst = itemWithInst;
    this.Kind = kind;
    this.IsOwnMember = isOwnMember;
    this.MinorPriority = minorPriority | 0;
    this.Type = type;
    this.Unresolved = unresolved;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.CompletionItem",
      interfaces: ["FSharpRecord"],
      properties: {
        ItemWithInst: ItemWithInst,
        Kind: CompletionItemKind,
        IsOwnMember: "boolean",
        MinorPriority: "number",
        Type: Option(EntityRef),
        Unresolved: Option(UnresolvedSymbol)
      }
    };
  }

  get Item() {
    return this.ItemWithInst.Item;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.CompletionItem", CompletionItem);
export const SymbolHelpers = function (__exports) {
  const isFunction = __exports.isFunction = function (g, typ) {
    const patternInput = tryDestForallTy(g, typ);
    return isFunTy(g, patternInput[1]);
  };

  const OutputFullName = __exports.OutputFullName = function (isListItem, ppF, fnF, r) {
    if (!isListItem) {
      const matchValue = ppF(r);

      if (matchValue != null) {
        return op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoFullName())), op_HatHat(RightL.colon, fnF(r)));
      } else {
        return emptyL;
      }
    } else {
      return emptyL;
    }
  };

  const rangeOfValRef = __exports.rangeOfValRef = function (preferFlag, vref) {
    if (preferFlag != null) {
      if (getValue(preferFlag)) {
        return vref.SigRange;
      } else {
        return vref.DefinitionRange;
      }
    } else {
      return vref.Range;
    }
  };

  const rangeOfEntityRef = __exports.rangeOfEntityRef = function (preferFlag, eref) {
    if (preferFlag != null) {
      if (getValue(preferFlag)) {
        return eref.SigRange;
      } else {
        return eref.DefinitionRange;
      }
    } else {
      return eref.Range;
    }
  };

  const rangeOfPropInfo = __exports.rangeOfPropInfo = function (preferFlag, pinfo) {
    return defaultArg(pinfo.ArbitraryValRef, null, function (vref) {
      return rangeOfValRef(preferFlag, vref);
    });
  };

  const rangeOfMethInfo = __exports.rangeOfMethInfo = function (g, preferFlag, minfo) {
    let $var3;

    if (minfo.tag === 2) {
      const activePatternResult49247 = function (arg10_) {
        return _AppTy___(g, arg10_);
      }(minfo.data[1]);

      if (activePatternResult49247 != null) {
        $var3 = [0, getValue(activePatternResult49247)[0]];
      } else {
        $var3 = [1];
      }
    } else {
      $var3 = [1];
    }

    switch ($var3[0]) {
      case 0:
        return rangeOfEntityRef(preferFlag, $var3[1]);

      case 1:
        return defaultArg(minfo.ArbitraryValRef, null, function (vref) {
          return rangeOfValRef(preferFlag, vref);
        });
    }
  };

  const rangeOfEventInfo = __exports.rangeOfEventInfo = function (preferFlag, einfo) {
    return defaultArg(einfo.ArbitraryValRef, null, function (vref) {
      return rangeOfValRef(preferFlag, vref);
    });
  };

  const rangeOfUnionCaseInfo = __exports.rangeOfUnionCaseInfo = function (preferFlag, ucinfo) {
    if (preferFlag != null) {
      if (getValue(preferFlag)) {
        return ucinfo.UnionCase.SigRange;
      } else {
        return ucinfo.UnionCase.DefinitionRange;
      }
    } else {
      return ucinfo.UnionCase.Range;
    }
  };

  const rangeOfRecdFieldInfo = __exports.rangeOfRecdFieldInfo = function (preferFlag, rfinfo) {
    if (preferFlag != null) {
      if (getValue(preferFlag)) {
        return rfinfo.RecdField.SigRange;
      } else {
        return rfinfo.RecdField.DefinitionRange;
      }
    } else {
      return rfinfo.RecdField.Range;
    }
  };

  const rangeOfItem = __exports.rangeOfItem = function (g, preferFlag, d) {
    rangeOfItem: while (true) {
      const $var4 = d.tag === 16 ? [0, d.data[1]] : d.tag === 1 ? [1, d.data[0]] : d.tag === 3 ? [2, d.data] : d.tag === 4 ? [3, d.data] : d.tag === 5 ? [4, d.data] : d.tag === 8 ? [5, d.data] : d.tag === 7 ? [6] : d.tag === 9 ? [7, d.data[1]] : d.tag === 14 ? [8, d.data[1]] : d.tag === 15 ? d.data[2] != null ? [9, getValue(d.data[2])] : [16, d.data[2]] : d.tag === 17 ? [10, d.data[1]] : d.tag === 18 ? [11, d.data] : d.tag === 10 ? [12, d.data[1]] : d.tag === 11 ? [12, d.data[1]] : d.tag === 2 ? [13, d.data[3]] : d.tag === 21 ? [14, d.data[1]] : d.tag === 20 ? [15, d.data[0]] : d.tag === 19 ? d.data[1].contents != null ? getValue(d.data[1].contents).tag === 0 ? [17, getValue(d.data[1].contents).data[1]] : [18] : [18] : d.tag === 22 ? [19, d.data] : d.tag === 13 ? [20, d.data] : d.tag === 12 ? [20, d.data] : d.tag === 6 ? [21] : [0, d.data];

      switch ($var4[0]) {
        case 0:
          return rangeOfValRef(preferFlag, $var4[1]);

        case 1:
          return rangeOfUnionCaseInfo(preferFlag, $var4[1]);

        case 2:
          return rangeOfValRef(preferFlag, $var4[1].ActivePatternVal);

        case 3:
          return $var4[1].Range;

        case 4:
          return rangeOfRecdFieldInfo(preferFlag, $var4[1]);

        case 5:
          return rangeOfEventInfo(preferFlag, $var4[1]);

        case 6:
          return null;

        case 7:
          return rangeOfPropInfo(preferFlag, $var4[1].head);

        case 8:
          return tryPick($var5 => defaultArg(tryNiceEntityRefOfTy($var5), null, function (eref) {
            return rangeOfEntityRef(preferFlag, eref);
          }), $var4[1]);

        case 9:
          return rangeOfMethInfo(g, preferFlag, $var4[1]);

        case 10:
          return $var4[1].Range;

        case 11:
          return tryPick($var6 => function (arg0) {
            return arg0;
          }(function (eref_1) {
            return rangeOfEntityRef(preferFlag, eref_1);
          }($var6)), $var4[1]);

        case 12:
          return tryPick(function (minfo) {
            return rangeOfMethInfo(g, preferFlag, minfo);
          }, $var4[1]);

        case 13:
          return $var4[1];

        case 14:
          g = g;
          preferFlag = preferFlag;
          d = $var4[1];
          continue rangeOfItem;

        case 15:
          return $var4[1].idRange;

        case 16:
          return defaultArg($var4[1], null, function (minfo_1) {
            return rangeOfMethInfo(g, preferFlag, minfo_1);
          });

        case 17:
          return $var4[1].Range;

        case 18:
          return null;

        case 19:
          return tryPick($var7 => function (arg0_1) {
            return arg0_1;
          }(function (eref_2) {
            return rangeOfEntityRef(preferFlag, eref_2);
          }($var7)), $var4[1]);

        case 20:
          return defaultArg(tryNiceEntityRefOfTy($var4[1]), null, function (eref_3) {
            return rangeOfEntityRef(preferFlag, eref_3);
          });

        case 21:
          return null;
      }
    }
  };

  const computeCcuOfTyconRef = __exports.computeCcuOfTyconRef = function (tcref) {
    return ccuOfTyconRef(tcref);
  };

  const ccuOfMethInfo = __exports.ccuOfMethInfo = function (g, minfo) {
    let $var8;

    if (minfo.tag === 2) {
      const activePatternResult49265 = function (arg10_) {
        return _AppTy___(g, arg10_);
      }(minfo.data[1]);

      if (activePatternResult49265 != null) {
        $var8 = [0, getValue(activePatternResult49265)[0]];
      } else {
        $var8 = [1];
      }
    } else {
      $var8 = [1];
    }

    switch ($var8[0]) {
      case 0:
        return computeCcuOfTyconRef($var8[1]);

      case 1:
        return defaultArgWith(function (option) {
          return defaultArg(option, null, function (vref) {
            return ccuOfValRef(vref);
          });
        }(minfo.ArbitraryValRef), function () {
          return computeCcuOfTyconRef(minfo.DeclaringTyconRef);
        });
    }
  };

  const ccuOfItem = __exports.ccuOfItem = function (g, d) {
    ccuOfItem: while (true) {
      const $var9 = d.tag === 0 ? [0, d.data] : d.tag === 16 ? [0, d.data[1]] : d.tag === 1 ? [1, d.data[0]] : d.tag === 3 ? [2, d.data] : d.tag === 4 ? [3, d.data] : d.tag === 5 ? [4, d.data] : d.tag === 8 ? [5, d.data] : d.tag === 7 ? [6, d.data] : d.tag === 9 ? [7, d.data[1]] : d.tag === 20 ? d.data[2] != null ? getValue(d.data[2]).tag === 0 ? [8, getValue(d.data[2]).data] : getValue(d.data[2]).tag === 1 ? [12, getValue(d.data[2]).data] : [16] : [16] : d.tag === 10 ? [9, d.data[1]] : d.tag === 11 ? [9, d.data[1]] : d.tag === 15 ? d.data[2] != null ? [10, getValue(d.data[2])] : [16] : d.tag === 14 ? [11, d.data[1]] : d.tag === 18 ? [13, d.data] : d.tag === 22 ? [13, d.data] : d.tag === 21 ? [14, d.data[1]] : d.tag === 17 ? [15] : [16];

      switch ($var9[0]) {
        case 0:
          return ccuOfValRef($var9[1]);

        case 1:
          return computeCcuOfTyconRef($var9[1].TyconRef);

        case 2:
          return ccuOfValRef($var9[1].ActivePatternVal);

        case 3:
          return computeCcuOfTyconRef($var9[1]);

        case 4:
          return computeCcuOfTyconRef($var9[1].RecdFieldRef.TyconRef);

        case 5:
          return computeCcuOfTyconRef($var9[1].DeclaringTyconRef);

        case 6:
          return computeCcuOfTyconRef($var9[1].DeclaringTyconRef);

        case 7:
          return tryPick(function (pinfo) {
            return defaultArgWith(function (option) {
              return defaultArg(option, null, function (vref) {
                return ccuOfValRef(vref);
              });
            }(pinfo.ArbitraryValRef), function () {
              return computeCcuOfTyconRef(pinfo.DeclaringTyconRef);
            });
          }, $var9[1]);

        case 8:
          return ccuOfMethInfo(g, $var9[1]);

        case 9:
          return tryPick(function (minfo) {
            return ccuOfMethInfo(g, minfo);
          }, $var9[1]);

        case 10:
          return ccuOfMethInfo(g, $var9[1]);

        case 11:
          return tryPick($var10 => function (option_1) {
            return defaultArg(option_1, null, function (tcref) {
              return computeCcuOfTyconRef(tcref);
            });
          }(function (arg00_) {
            return tryNiceEntityRefOfTy(arg00_);
          }($var10)), $var9[1]);

        case 12:
          return computeCcuOfTyconRef($var9[1]);

        case 13:
          return function (list) {
            return tryPick(function (tcref_1) {
              return computeCcuOfTyconRef(tcref_1);
            }, list);
          }($var9[1]);

        case 14:
          g = g;
          d = $var9[1];
          continue ccuOfItem;

        case 15:
          return null;

        case 16:
          return null;
      }
    }
  };

  const fileNameOfItem = __exports.fileNameOfItem = function (g, qualProjectDir, m, h) {
    const file = m.FileName;

    if (verbose) {
      dprintf(printf("file stored in metadata is '%s'\n"))(file);
    }

    g;
    qualProjectDir;
    h;
    return file;
  };

  const cutFileName = __exports.cutFileName = function (s) {
    if (s.length > 40) {
      return _String.sub(s, 0, 10) + "..." + _String.sub(s, s.length - 27, 27);
    } else {
      return s;
    }
  };

  const libFileOfEntityRef = __exports.libFileOfEntityRef = function (x) {
    const activePatternResult49277 = _ERefLocal_ERefNonLocal_(x);

    if (activePatternResult49277.tag === 1) {
      return activePatternResult49277.data.Ccu.FileName;
    } else {
      return null;
    }
  };

  const ParamNameAndTypesOfUnaryCustomOperation = __exports.ParamNameAndTypesOfUnaryCustomOperation = function (g, minfo) {
    if (minfo.tag === 0) {
      const argInfos = concat(ArgInfosOfMember(g, minfo.data[2]));
      const argInfos_1 = argInfos.tail == null ? new List() : argInfos.tail;
      return toList(delay(function () {
        return collect(function (matchValue) {
          const isPP = HasFSharpAttribute(g, g.attrib_ProjectionParameterAttribute, matchValue[1].Attribs);
          const ty = (isPP ? isFunTy(g, matchValue[0]) : false) ? rangeOfFunTy(g, matchValue[0]) : matchValue[0];
          return singleton(new ParamNameAndType(0, [matchValue[1].Name, ty]));
        }, argInfos_1);
      }));
    } else {
      return new List();
    }
  };

  const metaInfoOfEntityRef = __exports.metaInfoOfEntityRef = function (infoReader, m, tcref) {
    const g = infoReader.g;

    const activePatternResult49285 = _ERefLocal_ERefNonLocal_(tcref);

    if (activePatternResult49285.tag === 1) {
      const formalTypars = tcref.Typars(m);
      const formalTypeInst = generalizeTypars(formalTypars);
      const ty = new TType(1, [tcref, formalTypeInst]);

      if (isILAppTy(g, ty)) {
        const formalTypeInfo = function (arg00, arg10) {
          return ILTypeInfo.FromType(arg00, arg10);
        }(g, ty);

        return [activePatternResult49285.data.Ccu.FileName, formalTypars, formalTypeInfo];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const mkXmlComment = __exports.mkXmlComment = function (thing) {
    const $var11 = thing != null ? getValue(thing)[0] != null ? [0, getValue(getValue(thing)[0]), getValue(thing)[1]] : [1] : [1];

    switch ($var11[0]) {
      case 0:
        return new FSharpXmlDoc(2, [$var11[1], $var11[2]]);

      case 1:
        return new FSharpXmlDoc(0);
    }
  };

  const GetXmlDocSigOfEntityRef = __exports.GetXmlDocSigOfEntityRef = function (infoReader, m, eref) {
    if (eref.IsILTycon) {
      const matchValue = metaInfoOfEntityRef(infoReader, m, eref);

      if (matchValue != null) {
        const formalTypeInfo = getValue(matchValue)[2];
        const ccuFileName = getValue(matchValue)[0];
        return [ccuFileName, "T:" + formalTypeInfo.ILTypeRef.FullName];
      } else {
        return null;
      }
    } else {
      const ccuFileName_1 = libFileOfEntityRef(eref);
      const m_1 = eref.Deref;

      if (m_1.XmlDocSig === "") {
        m_1.XmlDocSig = XmlDocSigOfEntity(eref);
      }

      return [ccuFileName_1, m_1.XmlDocSig];
    }
  };

  const GetXmlDocSigOfScopedValRef = __exports.GetXmlDocSigOfScopedValRef = function (g, tcref, vref) {
    const ccuFileName = libFileOfEntityRef(tcref);
    const v = vref.Deref;

    if (v.XmlDocSig === "" ? v.HasDeclaringEntity : false) {
      v.XmlDocSig = XmlDocSigOfVal(g, buildAccessPath(vref.TopValDeclaringEntity.CompilationPathOpt), v);
    }

    return [ccuFileName, v.XmlDocSig];
  };

  const GetXmlDocSigOfRecdFieldInfo = __exports.GetXmlDocSigOfRecdFieldInfo = function (rfinfo) {
    const tcref = rfinfo.TyconRef;
    const ccuFileName = libFileOfEntityRef(tcref);

    if (rfinfo.RecdField.XmlDocSig === "") {
      rfinfo.RecdField.XmlDocSig = XmlDocSigOfProperty(ofArray([tcref.CompiledRepresentationForNamedType.FullName, rfinfo.Name]));
    }

    return [ccuFileName, rfinfo.RecdField.XmlDocSig];
  };

  const GetXmlDocSigOfUnionCaseInfo = __exports.GetXmlDocSigOfUnionCaseInfo = function (ucinfo) {
    const tcref = ucinfo.TyconRef;
    const ccuFileName = libFileOfEntityRef(tcref);

    if (ucinfo.UnionCase.XmlDocSig === "") {
      ucinfo.UnionCase.XmlDocSig = XmlDocSigOfUnionCase(ofArray([tcref.CompiledRepresentationForNamedType.FullName, ucinfo.Name]));
    }

    return [ccuFileName, ucinfo.UnionCase.XmlDocSig];
  };

  const GetXmlDocSigOfMethInfo = __exports.GetXmlDocSigOfMethInfo = function (infoReader, m, minfo) {
    const amap = infoReader.amap;

    if (minfo.tag === 1) {
      const actualTypeName = minfo.data[1].DeclaringTyconRef.CompiledRepresentationForNamedType.FullName;
      const fmtps = minfo.data[1].FormalMethodTypars;
      const genArity = fmtps.length === 0 ? "" : toText(printf("``%d"))(fmtps.length);
      const matchValue = metaInfoOfEntityRef(infoReader, m, minfo.data[1].DeclaringTyconRef);

      if (matchValue != null) {
        const formalTypeInfo = getValue(matchValue)[2];
        const formalTypars = getValue(matchValue)[1];
        const ccuFileName = getValue(matchValue)[0];
        const filminfo = new ILMethInfo(0, [minfo.data[0], formalTypeInfo.ToType, null, minfo.data[1].RawMetadata, fmtps]);
        let args;
        const matchValue_1 = minfo.data[1].IsILExtensionMethod;

        if (matchValue_1) {
          args = filminfo.GetRawArgTypes(amap, m, minfo.FormalMethodInst);
        } else {
          args = filminfo.GetParamTypes(amap, m, minfo.FormalMethodInst);
        }

        const normalizedName = replace(minfo.data[1].ILName, ".", "#");
        return [ccuFileName, "M:" + actualTypeName + "." + normalizedName + genArity + XmlDocArgsEnc(minfo.data[0], formalTypars, fmtps, args)];
      } else {
        return null;
      }
    } else if (minfo.tag === 2) {
      return null;
    } else {
      return GetXmlDocSigOfScopedValRef(minfo.data[0], minfo.DeclaringTyconRef, minfo.data[2]);
    }
  };

  const GetXmlDocSigOfValRef = __exports.GetXmlDocSigOfValRef = function (g, vref) {
    if (!vref.IsLocalRef) {
      const ccuFileName = vref.nlr.Ccu.FileName;
      const v = vref.Deref;

      if (v.XmlDocSig === "" ? v.HasDeclaringEntity : false) {
        v.XmlDocSig = XmlDocSigOfVal(g, vref.TopValDeclaringEntity.CompiledRepresentationForNamedType.Name, v);
      }

      return [ccuFileName, v.XmlDocSig];
    } else {
      return null;
    }
  };

  const GetXmlDocSigOfProp = __exports.GetXmlDocSigOfProp = function (infoReader, m, pinfo) {
    const g = pinfo.TcGlobals;

    if (pinfo.tag === 1) {
      const pdef = pinfo.data.data[1];
      const matchValue = metaInfoOfEntityRef(infoReader, m, pinfo.DeclaringTyconRef);

      if (matchValue != null) {
        const formalTypeInfo = getValue(matchValue)[2];
        const formalTypars = getValue(matchValue)[1];
        const ccuFileName = getValue(matchValue)[0];
        const filpinfo = new ILPropInfo(0, [formalTypeInfo, pdef]);
        return [ccuFileName, "P:" + formalTypeInfo.ILTypeRef.FullName + "." + pdef.Name + XmlDocArgsEnc(g, formalTypars, new List(), filpinfo.GetParamTypes(infoReader.amap, m))];
      } else {
        return null;
      }
    } else {
      const matchValue_1 = pinfo.ArbitraryValRef;

      if (matchValue_1 != null) {
        return GetXmlDocSigOfScopedValRef(g, pinfo.DeclaringTyconRef, getValue(matchValue_1));
      } else {
        return null;
      }
    }
  };

  const GetXmlDocSigOfEvent = __exports.GetXmlDocSigOfEvent = function (infoReader, m, einfo) {
    if (einfo.tag === 1) {
      const matchValue = metaInfoOfEntityRef(infoReader, m, einfo.DeclaringTyconRef);

      if (matchValue != null) {
        const formalTypeInfo = getValue(matchValue)[2];
        const ccuFileName = getValue(matchValue)[0];
        return [ccuFileName, "E:" + formalTypeInfo.ILTypeRef.FullName + "." + einfo.EventName];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const GetXmlDocSigOfILFieldInfo = __exports.GetXmlDocSigOfILFieldInfo = function (infoReader, m, finfo) {
    const matchValue = metaInfoOfEntityRef(infoReader, m, finfo.DeclaringTyconRef);

    if (matchValue != null) {
      const formalTypeInfo = getValue(matchValue)[2];
      const ccuFileName = getValue(matchValue)[0];
      return [ccuFileName, "F:" + formalTypeInfo.ILTypeRef.FullName + "." + finfo.FieldName];
    } else {
      return null;
    }
  };

  const GetXmlDocHelpSigOfItemForLookup = __exports.GetXmlDocHelpSigOfItemForLookup = function (infoReader, m, d) {
    const g = infoReader.g;
    const $var12 = d.tag === 3 ? [0, d.data.data[1]] : d.tag === 0 ? [0, d.data] : d.tag === 16 ? [0, d.data[1]] : d.tag === 1 ? [1, d.data[0]] : d.tag === 4 ? [2, d.data] : d.tag === 5 ? [3, d.data] : d.tag === 6 ? [4] : d.tag === 7 ? [5, d.data] : d.tag === 14 ? d.data[1].tail != null ? d.data[1].head.tag === 1 ? [6, d.data[1].head.data[0]] : [15] : [15] : d.tag === 15 ? d.data[2] != null ? [7, getValue(d.data[2])] : [15] : d.tag === 17 ? [8] : d.tag === 18 ? d.data.tail != null ? [9, d.data.head] : [15] : d.tag === 9 ? d.data[1].tail != null ? [10, d.data[1].head] : [15] : d.tag === 8 ? [11, d.data] : d.tag === 10 ? d.data[1].tail != null ? [12, d.data[1].head] : [15] : d.tag === 11 ? d.data[1].tail != null ? [13, d.data[1].head] : [15] : d.tag === 20 ? d.data[2] != null ? [14, getValue(d.data[2])] : [15] : [15];

    switch ($var12[0]) {
      case 0:
        return mkXmlComment(GetXmlDocSigOfValRef(g, $var12[1]));

      case 1:
        return mkXmlComment(GetXmlDocSigOfUnionCaseInfo($var12[1]));

      case 2:
        return mkXmlComment(GetXmlDocSigOfEntityRef(infoReader, m, $var12[1]));

      case 3:
        return mkXmlComment(GetXmlDocSigOfRecdFieldInfo($var12[1]));

      case 4:
        return new FSharpXmlDoc(0);

      case 5:
        return mkXmlComment(GetXmlDocSigOfILFieldInfo(infoReader, m, $var12[1]));

      case 6:
        return mkXmlComment(GetXmlDocSigOfEntityRef(infoReader, m, $var12[1]));

      case 7:
        return mkXmlComment(GetXmlDocSigOfMethInfo(infoReader, m, $var12[1]));

      case 8:
        return new FSharpXmlDoc(0);

      case 9:
        return mkXmlComment(GetXmlDocSigOfEntityRef(infoReader, m, $var12[1]));

      case 10:
        return mkXmlComment(GetXmlDocSigOfProp(infoReader, m, $var12[1]));

      case 11:
        return mkXmlComment(GetXmlDocSigOfEvent(infoReader, m, $var12[1]));

      case 12:
        return mkXmlComment(GetXmlDocSigOfMethInfo(infoReader, m, $var12[1]));

      case 13:
        return mkXmlComment(GetXmlDocSigOfMethInfo(infoReader, m, $var12[1]));

      case 14:
        if ($var12[1].tag === 1) {
          return mkXmlComment(GetXmlDocSigOfEntityRef(infoReader, m, $var12[1].data));
        } else if ($var12[1].tag === 2) {
          return mkXmlComment(GetXmlDocSigOfUnionCaseInfo($var12[1].data));
        } else {
          return mkXmlComment(GetXmlDocSigOfMethInfo(infoReader, m, $var12[1].data));
        }

      case 15:
        return new FSharpXmlDoc(0);
    }
  };

  const GetXmlCommentForItemAux = __exports.GetXmlCommentForItemAux = function (xmlDoc, infoReader, m, d) {
    var testExpr;
    let result;
    const $var13 = xmlDoc != null ? (testExpr = getValue(xmlDoc).data, testExpr.length === 0) ? [0] : [1, getValue(xmlDoc).data] : [0];

    switch ($var13[0]) {
      case 0:
        result = "";
        break;

      case 1:
        result = bufs(function (os) {
          Microsoft.FSharp.Core.Printf.bprintf(os)(printf("\n"));
          $var13[1].forEach(function (s) {
            var clo1;
            (clo1 = Microsoft.FSharp.Core.Printf.bprintf(os), CurriedLambda(function (arg10) {
              return CurriedLambda(clo1)(arg10);
            }))(printf("\n%s"), s);
          });
        });
        break;
    }

    if (isNullOrEmpty(result)) {
      return GetXmlDocHelpSigOfItemForLookup(infoReader, m, d);
    } else {
      return new FSharpXmlDoc(1, result);
    }
  };

  let ToolTipFault = __exports.ToolTipFault = createAtom(null);

  const GetXmlCommentForMethInfoItem = __exports.GetXmlCommentForMethInfoItem = function (infoReader, m, d, minfo) {
    return GetXmlCommentForItemAux((minfo.HasDirectXmlComment ? true : minfo.XmlDoc.NonEmpty) ? minfo.XmlDoc : null, infoReader, m, d);
  };

  const FormatTyparMapping = __exports.FormatTyparMapping = function (denv, prettyTyparInst) {
    return toList(delay(function () {
      return collect(function (matchValue) {
        return singleton(op_HatHat(wordL(TaggedTextOps.tagTypeParameter("'" + matchValue[0].DisplayName)), op_HatHat(wordL(TaggedTextOps.tagText(SR.descriptionWordIs())), layoutType(denv, matchValue[1]))));
      }, prettyTyparInst);
    }));
  };

  const FormatOverloadsToList = __exports.FormatOverloadsToList = function (infoReader, m, denv, item, minfos) {
    iterate(function (msg) {
      const exn = new _Error([0, msg], range.Zero);
      const ph = PhasedDiagnostic.Create(exn, new BuildPhase(4));
      simulateError(ph);
    }, defaultArg(ToolTipFault(), [], $var14 => [$var14]));
    const layouts = toList(delay(function () {
      return map_1(function (minfo) {
        const patternInput = prettyLayoutOfMethInfoFreeStyle(infoReader.amap, m, denv, item.TyparInst, minfo);
        const xml = GetXmlCommentForMethInfoItem(infoReader, m, item.Item, minfo);
        const tpsL = FormatTyparMapping(denv, patternInput[0]);
        return FSharpToolTipElementData.Create(patternInput[1], xml, tpsL);
      }, minfos);
    }));
    return new FSharpToolTipElement(1, layouts);
  };

  const pubpathOfValRef = __exports.pubpathOfValRef = function (v) {
    return v.PublicPath;
  };

  const pubpathOfTyconRef = __exports.pubpathOfTyconRef = function (x) {
    return x.PublicPath;
  };

  const _ItemWhereTypIsPreferred___ = __exports["|ItemWhereTypIsPreferred|_|"] = function (item) {
    const $var15 = item.tag === 13 ? [0, item.data] : item.tag === 11 ? item.data[1].tail != null ? item.data[1].head.tag === 2 ? item.data[1].tail.tail == null ? [0, item.data[1].head.data[1]] : [1] : [1] : [1] : item.tag === 12 ? [0, item.data] : item.tag === 14 ? item.data[1].tail != null ? item.data[1].tail.tail == null ? [0, item.data[1].head] : [1] : [1] : [1];

    switch ($var15[0]) {
      case 0:
        return $var15[1];

      case 1:
        return null;
    }
  };

  const ItemDisplayPartialEquality = __exports.ItemDisplayPartialEquality = function (g) {
    return {
      InEqualityRelation(item) {
        const $var16 = item.tag === 14 ? item.data[1].tail != null ? item.data[1].tail.tail == null ? [0] : [17] : [17] : item.tag === 7 ? [1] : item.tag === 5 ? [2] : item.tag === 21 ? [3] : item.tag === 17 ? [4] : item.tag === 15 ? [5] : item.tag === 18 ? item.data.tail != null ? [6] : [17] : item.tag === 10 ? [7] : item.tag === 0 ? [8] : item.tag === 16 ? [8] : item.tag === 3 ? [9] : item.tag === 13 ? [10] : item.tag === 1 ? [11] : item.tag === 4 ? [12] : item.tag === 8 ? [13] : item.tag === 9 ? [14] : item.tag === 11 ? [15] : item.tag === 22 ? [16] : [17];

        switch ($var16[0]) {
          case 0:
            return true;

          case 1:
            return true;

          case 2:
            return true;

          case 3:
            return true;

          case 4:
            return true;

          case 5:
            return true;

          case 6:
            return true;

          case 7:
            return true;

          case 8:
            return true;

          case 9:
            return true;

          case 10:
            return true;

          case 11:
            return true;

          case 12:
            return true;

          case 13:
            return true;

          case 14:
            return true;

          case 15:
            return true;

          case 16:
            return true;

          case 17:
            return false;
        }
      },

      Equals(item1, item2) {
        try {
          return (() => {
            const equalHeadTypes = tupledArg => {
              if (isAppTy(g, tupledArg[0]) ? isAppTy(g, tupledArg[1]) : false) {
                return tyconRefEq(g, tcrefOfAppTy(g, tupledArg[0]), tcrefOfAppTy(g, tupledArg[1]));
              } else {
                return typeEquiv(g, tupledArg[0], tupledArg[1]);
              }
            };

            if (ItemsAreEffectivelyEqual(g, item1, item2)) {
              return true;
            } else {
              const matchValue = [item1, item2];
              let $var17;

              if (matchValue[0].tag === 13) {
                if (matchValue[1].tag === 13) {
                  $var17 = [0, matchValue[0].data, matchValue[1].data];
                } else {
                  const activePatternResult49359 = _ItemWhereTypIsPreferred___(matchValue[0]);

                  if (activePatternResult49359 != null) {
                    const activePatternResult49360 = _ItemWhereTypIsPreferred___(matchValue[1]);

                    if (activePatternResult49360 != null) {
                      $var17 = [2, getValue(activePatternResult49359), getValue(activePatternResult49360)];
                    } else {
                      $var17 = [3];
                    }
                  } else {
                    $var17 = [3];
                  }
                }
              } else if (matchValue[0].tag === 14) {
                if (matchValue[0].data[1].tail != null) {
                  if (matchValue[0].data[1].tail.tail == null) {
                    if (matchValue[1].tag === 14) {
                      if (matchValue[1].data[1].tail != null) {
                        if (matchValue[1].data[1].tail.tail == null) {
                          $var17 = [1, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1].head, matchValue[1].data[1].head];
                        } else {
                          const activePatternResult49361 = _ItemWhereTypIsPreferred___(matchValue[0]);

                          if (activePatternResult49361 != null) {
                            const activePatternResult49362 = _ItemWhereTypIsPreferred___(matchValue[1]);

                            if (activePatternResult49362 != null) {
                              $var17 = [2, getValue(activePatternResult49361), getValue(activePatternResult49362)];
                            } else {
                              $var17 = [3];
                            }
                          } else {
                            $var17 = [3];
                          }
                        }
                      } else {
                        const activePatternResult49363 = _ItemWhereTypIsPreferred___(matchValue[0]);

                        if (activePatternResult49363 != null) {
                          const activePatternResult49364 = _ItemWhereTypIsPreferred___(matchValue[1]);

                          if (activePatternResult49364 != null) {
                            $var17 = [2, getValue(activePatternResult49363), getValue(activePatternResult49364)];
                          } else {
                            $var17 = [3];
                          }
                        } else {
                          $var17 = [3];
                        }
                      }
                    } else {
                      const activePatternResult49365 = _ItemWhereTypIsPreferred___(matchValue[0]);

                      if (activePatternResult49365 != null) {
                        const activePatternResult49366 = _ItemWhereTypIsPreferred___(matchValue[1]);

                        if (activePatternResult49366 != null) {
                          $var17 = [2, getValue(activePatternResult49365), getValue(activePatternResult49366)];
                        } else {
                          $var17 = [3];
                        }
                      } else {
                        $var17 = [3];
                      }
                    }
                  } else {
                    const activePatternResult49367 = _ItemWhereTypIsPreferred___(matchValue[0]);

                    if (activePatternResult49367 != null) {
                      const activePatternResult49368 = _ItemWhereTypIsPreferred___(matchValue[1]);

                      if (activePatternResult49368 != null) {
                        $var17 = [2, getValue(activePatternResult49367), getValue(activePatternResult49368)];
                      } else {
                        $var17 = [3];
                      }
                    } else {
                      $var17 = [3];
                    }
                  }
                } else {
                  const activePatternResult49369 = _ItemWhereTypIsPreferred___(matchValue[0]);

                  if (activePatternResult49369 != null) {
                    const activePatternResult49370 = _ItemWhereTypIsPreferred___(matchValue[1]);

                    if (activePatternResult49370 != null) {
                      $var17 = [2, getValue(activePatternResult49369), getValue(activePatternResult49370)];
                    } else {
                      $var17 = [3];
                    }
                  } else {
                    $var17 = [3];
                  }
                }
              } else {
                const activePatternResult49371 = _ItemWhereTypIsPreferred___(matchValue[0]);

                if (activePatternResult49371 != null) {
                  const activePatternResult49372 = _ItemWhereTypIsPreferred___(matchValue[1]);

                  if (activePatternResult49372 != null) {
                    $var17 = [2, getValue(activePatternResult49371), getValue(activePatternResult49372)];
                  } else {
                    $var17 = [3];
                  }
                } else {
                  $var17 = [3];
                }
              }

              switch ($var17[0]) {
                case 0:
                  return equalHeadTypes([$var17[1], $var17[2]]);

                case 1:
                  if ($var17[1] === $var17[2]) {
                    return equalHeadTypes([$var17[3], $var17[4]]);
                  } else {
                    return false;
                  }

                case 2:
                  return equalHeadTypes([$var17[1], $var17[2]]);

                case 3:
                  const $var18 = matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? [0, matchValue[0].data, matchValue[1].data] : [17] : matchValue[0].tag === 7 ? matchValue[1].tag === 7 ? [1, matchValue[0].data.data[1], matchValue[1].data.data[1]] : [17] : matchValue[0].tag === 15 ? matchValue[0].data[2] != null ? matchValue[1].tag === 15 ? matchValue[1].data[2] != null ? [2, getValue(matchValue[0].data[2]), getValue(matchValue[1].data[2])] : [17] : [17] : [17] : matchValue[0].tag === 17 ? matchValue[1].tag === 17 ? [3, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [17] : matchValue[0].tag === 18 ? matchValue[0].data.tail != null ? matchValue[1].tag === 18 ? matchValue[1].data.tail != null ? [4, matchValue[0].data.head, matchValue[1].data.head] : [17] : [17] : [17] : matchValue[0].tag === 21 ? matchValue[1].tag === 21 ? [5, matchValue[0].data[0], matchValue[1].data[0]] : [17] : matchValue[0].tag === 10 ? matchValue[1].tag === 10 ? [6, matchValue[0].data[1], matchValue[1].data[1]] : [17] : matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [7, matchValue[0].data, matchValue[1].data] : matchValue[1].tag === 16 ? [7, matchValue[0].data, matchValue[1].data[1]] : [17] : matchValue[0].tag === 16 ? matchValue[1].tag === 0 ? [7, matchValue[0].data[1], matchValue[1].data] : matchValue[1].tag === 16 ? [7, matchValue[0].data[1], matchValue[1].data[1]] : [17] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [8, matchValue[0].data.data[0], matchValue[1].data.data[0], matchValue[0].data.data[2], matchValue[1].data.data[2], matchValue[0].data.data[1], matchValue[1].data.data[1]] : [17] : matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [9, matchValue[0].data[0].data[1], matchValue[1].data[0].data[1]] : [17] : matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? [10, matchValue[0].data.data[1].data[1], matchValue[1].data.data[1].data[1], matchValue[0].data.data[1].data[0], matchValue[1].data.data[1].data[0]] : [17] : matchValue[0].tag === 9 ? matchValue[1].tag === 9 ? [11, matchValue[0].data[1], matchValue[1].data[1]] : [17] : matchValue[0].tag === 8 ? matchValue[1].tag === 8 ? [12, matchValue[0].data, matchValue[1].data] : [17] : matchValue[0].tag === 11 ? matchValue[1].tag === 11 ? [13, matchValue[0].data[1], matchValue[1].data[1]] : [17] : matchValue[0].tag === 22 ? matchValue[1].tag === 22 ? [14, matchValue[0].data, matchValue[1].data] : matchValue[1].tag === 14 ? matchValue[1].data[1].tail != null ? matchValue[1].data[1].head.tag === 1 ? matchValue[1].data[1].tail.tail == null ? matchValue[0].data.tail != null ? matchValue[0].data.tail.tail == null ? [16, matchValue[0].data.head, matchValue[1].data[1].head.data[0]] : [17] : [17] : [17] : [17] : [17] : [17] : matchValue[0].tag === 14 ? matchValue[0].data[1].tail != null ? matchValue[0].data[1].head.tag === 1 ? matchValue[0].data[1].tail.tail == null ? matchValue[1].tag === 22 ? matchValue[1].data.tail != null ? matchValue[1].data.tail.tail == null ? [15, matchValue[0].data[1].head.data[0], matchValue[1].data.head] : [17] : [17] : [17] : [17] : [17] : [17] : [17];

                  switch ($var18[0]) {
                    case 0:
                      return tyconRefEq(g, $var18[1], $var18[2]);

                    case 1:
                      return $var18[1] === $var18[2];

                    case 2:
                      return ((arg00, arg10) => MethInfo.MethInfosUseIdenticalDefinitions(arg00, arg10))($var18[1], $var18[2]);

                    case 3:
                      if ($var18[1] === $var18[2]) {
                        return typarRefEq($var18[3], $var18[4]);
                      } else {
                        return false;
                      }

                    case 4:
                      return fullDisplayTextOfModRef($var18[1]) === fullDisplayTextOfModRef($var18[2]);

                    case 5:
                      return equals([$var18[1].idRange, $var18[1].idText], [$var18[2].idRange, $var18[2].idText]);

                    case 6:
                      return forAll(tupledArg_1 => ((arg00_1, arg10_1) => MethInfo.MethInfosUseIdenticalDefinitions(arg00_1, arg10_1))(tupledArg_1[0], tupledArg_1[1]), zip($var18[1], $var18[2]));

                    case 7:
                      return valRefEq(g, $var18[1], $var18[2]);

                    case 8:
                      if ($var18[3] === $var18[4]) {
                        return valRefEq(g, $var18[5], $var18[6]);
                      } else {
                        return false;
                      }

                    case 9:
                      return ((arg00_2, arg10_2) => g.unionCaseRefEq(arg00_2, arg10_2))($var18[1], $var18[2]);

                    case 10:
                      if (tyconRefEq(g, $var18[3], $var18[4])) {
                        return $var18[1] === $var18[2];
                      } else {
                        return false;
                      }

                    case 11:
                      return forAll(tupledArg_2 => ((arg00_3, arg10_3) => PropInfo.PropInfosUseIdenticalDefinitions(arg00_3, arg10_3))(tupledArg_2[0], tupledArg_2[1]), toList(zip($var18[1], $var18[2])));

                    case 12:
                      return ((arg00_4, arg10_4) => EventInfo.EventInfosUseIdenticalDefintions(arg00_4, arg10_4))($var18[1], $var18[2]);

                    case 13:
                      return forAll(tupledArg_3 => ((arg00_5, arg10_5) => MethInfo.MethInfosUseIdenticalDefinitions(arg00_5, arg10_5))(tupledArg_3[0], tupledArg_3[1]), toList(zip($var18[1], $var18[2])));

                    case 14:
                      return forAll(tupledArg_4 => tyconRefEq(g, tupledArg_4[0], tupledArg_4[1]), toList(zip($var18[1], $var18[2])));

                    case 15:
                      return tyconRefEq(g, $var18[1], $var18[2]);

                    case 16:
                      return tyconRefEq(g, $var18[1], $var18[2]);

                    case 17:
                      return false;
                  }

              }
            }
          })();
        } catch (matchValue_1) {
          if (matchValue_1 instanceof UnresolvedPathReferenceNoRange) {
            return false;
          } else {
            throw matchValue_1;
          }
        }
      },

      GetHashCode(item) {
        try {
          return (() => {
            const activePatternResult49381 = _ItemWhereTypIsPreferred___(item);

            if (activePatternResult49381 != null) {
              if (isAppTy(g, getValue(activePatternResult49381))) {
                return hash(tcrefOfAppTy(g, getValue(activePatternResult49381)).LogicalName) | 0;
              } else {
                return 1010;
              }
            } else {
              const $var19 = item.tag === 7 ? [0, item.data.data[1]] : item.tag === 17 ? [1, item.data[1], item.data[0]] : item.tag === 15 ? item.data[2] == null ? [3] : [2, getValue(item.data[2])] : item.tag === 18 ? item.data.tail != null ? [4, item.data.head] : [16] : item.tag === 21 ? [5, item.data[0]] : item.tag === 10 ? [6, item.data[1]] : item.tag === 11 ? [7, item.data[1], item.data[0]] : item.tag === 0 ? [8, item.data] : item.tag === 16 ? [8, item.data[1]] : item.tag === 3 ? [9, item.data.data[0], item.data.data[2], item.data.data[1]] : item.tag === 4 ? [10, item.data] : item.tag === 1 ? [11, item.data[0].data[1].data[1], item.data[0].data[1].data[0]] : item.tag === 5 ? [12, item.data.data[1].data[1], item.data.data[1].data[0]] : item.tag === 8 ? [13, item.data] : item.tag === 9 ? [14, item.data[0], item.data[1]] : item.tag === 22 ? item.data.tail != null ? [15, item.data.head] : [16] : [16];

              switch ($var19[0]) {
                case 0:
                  return getHashCode($var19[1]) | 0;

                case 1:
                  return hash($var19[2]) | 0;

                case 2:
                  return $var19[1].ComputeHashCode() | 0;

                case 3:
                  return 1;

                case 4:
                  return hash(fullDisplayTextOfModRef($var19[1])) | 0;

                case 5:
                  return hash([$var19[1].idRange, $var19[1].idText]) | 0;

                case 6:
                  return fold((st, a) => st + a.ComputeHashCode(), 0, $var19[1]) | 0;

                case 7:
                  return getHashCode($var19[2]) + fold((st_1, a_1) => st_1 + a_1.ComputeHashCode(), 0, $var19[1]) | 0;

                case 8:
                  return hash($var19[1].LogicalName) | 0;

                case 9:
                  return hash([$var19[3].LogicalName, $var19[2]]) | 0;

                case 10:
                  return hash($var19[1].LogicalName) | 0;

                case 11:
                  return hash([$var19[2].Stamp, $var19[1]]) | 0;

                case 12:
                  return hash([$var19[2].Stamp, $var19[1]]) | 0;

                case 13:
                  return $var19[1].ComputeHashCode() | 0;

                case 14:
                  return hash(map(pi => pi.ComputeHashCode(), $var19[2])) | 0;

                case 15:
                  return hash($var19[1].LogicalName) | 0;

                case 16:
                  throw new Error("unreachable");
              }
            }
          })() | 0;
        } catch (matchValue) {
          if (matchValue instanceof UnresolvedPathReferenceNoRange) {
            return 1027;
          } else {
            throw matchValue;
          }
        }
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.IPartialEqualityComparer"]
        };
      }

    };
  };

  const CompletionItemDisplayPartialEquality = __exports.CompletionItemDisplayPartialEquality = function (g) {
    const itemComparer = ItemDisplayPartialEquality(g);
    return {
      InEqualityRelation(item) {
        return itemComparer.InEqualityRelation(item.Item);
      },

      Equals(item1, item2) {
        return itemComparer.Equals(item1.Item, item2.Item);
      },

      GetHashCode(item) {
        return itemComparer.GetHashCode(item.Item) | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.IPartialEqualityComparer"]
        };
      }

    };
  };

  const ItemWithTypeDisplayPartialEquality = __exports.ItemWithTypeDisplayPartialEquality = function (g) {
    const itemComparer = ItemDisplayPartialEquality(g);
    return {
      InEqualityRelation(_arg1) {
        return itemComparer.InEqualityRelation(_arg1[0]);
      },

      Equals(_arg2, _arg3) {
        return itemComparer.Equals(_arg2[0], _arg3[0]);
      },

      GetHashCode(_arg4) {
        return itemComparer.GetHashCode(_arg4[0]) | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.IPartialEqualityComparer"]
        };
      }

    };
  };

  const RemoveDuplicateModuleRefs = __exports.RemoveDuplicateModuleRefs = function (modrefs) {
    return IPartialEqualityComparer.partialDistinctBy({
      InEqualityRelation(_arg1) {
        return true;
      },

      Equals(item1, item2) {
        return fullDisplayTextOfModRef(item1) === fullDisplayTextOfModRef(item2);
      },

      GetHashCode(item) {
        return hash(item.Stamp) | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Internal.Library.IPartialEqualityComparer"]
        };
      }

    }, modrefs);
  };

  const RemoveDuplicateItems = __exports.RemoveDuplicateItems = function (g, items) {
    return IPartialEqualityComparer.partialDistinctBy(IPartialEqualityComparer.On(function (item) {
      return item.Item;
    }, ItemDisplayPartialEquality(g)), items);
  };

  const RemoveDuplicateCompletionItems = __exports.RemoveDuplicateCompletionItems = function (g, items) {
    return IPartialEqualityComparer.partialDistinctBy(CompletionItemDisplayPartialEquality(g), items);
  };

  const IsExplicitlySuppressed = __exports.IsExplicitlySuppressed = function (g, item) {
    try {
      return function () {
        const $var20 = item.tag === 14 ? item.data[1].tail != null ? item.data[1].tail.tail == null ? [0, item.data[0], item.data[1].head] : [1] : [1] : [1];

        switch ($var20[0]) {
          case 0:
            return exists(function (supp) {
              if (isAppTy(g, $var20[2]) ? isAppTy(g, generalizedTyconRef(supp)) : false) {
                const tcr1 = tcrefOfAppTy(g, $var20[2]);
                const tcr2 = tcrefOfAppTy(g, generalizedTyconRef(supp));

                if (tyconRefEq(g, tcr1, tcr2)) {
                  return $var20[1] === supp.DisplayName;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            }, g.suppressed_types);

          case 1:
            return false;
        }
      }();
    } catch (matchValue) {
      if (matchValue instanceof UnresolvedPathReferenceNoRange) {
        return true;
      } else {
        throw matchValue;
      }
    }
  };

  const RemoveExplicitlySuppressed = __exports.RemoveExplicitlySuppressed = function (g, items) {
    return filter(function (item) {
      return !IsExplicitlySuppressed(g, item.Item);
    }, items);
  };

  const RemoveExplicitlySuppressedCompletionItems = __exports.RemoveExplicitlySuppressedCompletionItems = function (g, items) {
    return filter(function (item) {
      return !IsExplicitlySuppressed(g, item.Item);
    }, items);
  };

  const SimplerDisplayEnv = __exports.SimplerDisplayEnv = function (denv) {
    const maxMembers_1 = EnvMisc2.maxMembers;
    return new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, true, maxMembers_1, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, denv.showImperativeTyparAnnotations, true, denv.suppressMutableKeyword, denv.showMemberContainers, true, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, false, false, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout);
  };

  const FullNameOfItem = __exports.FullNameOfItem = function (g, item) {
    FullNameOfItem: while (true) {
      const denv = DisplayEnv.Empty(g);
      const $var21 = item.tag === 0 ? [0, item.data] : item.tag === 16 ? [0, item.data[1]] : item.tag === 1 ? [1, item.data[0]] : item.tag === 2 ? [2, item.data[1], item.data[0], item.data[2]] : item.tag === 3 ? [3, item.data] : item.tag === 4 ? [4, item.data] : item.tag === 5 ? [5, item.data] : item.tag === 6 ? [6, item.data] : item.tag === 7 ? [7, item.data] : item.tag === 8 ? [8, item.data] : item.tag === 9 ? item.data[1].tail == null ? [21] : [9, item.data[1].head] : item.tag === 15 ? [10, item.data[0]] : item.tag === 11 ? item.data[1].tail == null ? [21] : [11, item.data[1].head] : item.tag === 10 ? item.data[2] != null ? [12, getValue(item.data[2])] : item.data[1].tail == null ? [21] : [13, item.data[1].head] : item.tag === 22 ? item.data.tail == null ? [21] : [14, item.data.head] : item.tag === 12 ? [15, item.data] : item.tag === 13 ? [15, item.data] : item.tag === 14 ? item.data[1].tail == null ? [21] : [15, item.data[1].head] : item.tag === 18 ? item.data.tail == null ? [21] : [16, item.data.head, item.data] : item.tag === 17 ? [17, item.data[0]] : item.tag === 20 ? [18, item.data[0]] : item.tag === 21 ? [19, item.data[1]] : item.data[1].contents != null ? getValue(item.data[1].contents).tag === 0 ? [0, getValue(item.data[1].contents).data[1]] : [20, item.data[0]] : [20, item.data[0]];

      switch ($var21[0]) {
        case 0:
          return fullDisplayTextOfValRef($var21[1]);

        case 1:
          return fullDisplayTextOfUnionCaseRef($var21[1].UnionCaseRef);

        case 2:
          return item_1($var21[3], ActivePatternInfo_get_Names.bind($var21[2])());

        case 3:
          return FullNameOfItem(g, new Item(0, $var21[1].ActivePatternVal)) + "." + ActivePatternElemRef_get_Name.bind($var21[1])();

        case 4:
          return fullDisplayTextOfExnRef($var21[1]);

        case 5:
          return fullDisplayTextOfRecdFieldRef($var21[1].RecdFieldRef);

        case 6:
          return $var21[1].idText;

        case 7:
          return bufs(function (os) {
            var clo1;
            outputILTypeRef(denv, os, $var21[1].ILTypeRef);
            (clo1 = Microsoft.FSharp.Core.Printf.bprintf(os), CurriedLambda(function (arg10) {
              return CurriedLambda(clo1)(arg10);
            }))(printf(".%s"), $var21[1].FieldName);
          });

        case 8:
          return bufs(function (os_1) {
            var clo1_1;
            outputTyconRef(denv, os_1, $var21[1].DeclaringTyconRef);
            (clo1_1 = Microsoft.FSharp.Core.Printf.bprintf(os_1), CurriedLambda(function (arg10_1) {
              return CurriedLambda(clo1_1)(arg10_1);
            }))(printf(".%s"), $var21[1].EventName);
          });

        case 9:
          return bufs(function (os_2) {
            var clo1_2;
            outputTyconRef(denv, os_2, $var21[1].DeclaringTyconRef);
            (clo1_2 = Microsoft.FSharp.Core.Printf.bprintf(os_2), CurriedLambda(function (arg10_2) {
              return CurriedLambda(clo1_2)(arg10_2);
            }))(printf(".%s"), $var21[1].PropertyName);
          });

        case 10:
          return $var21[1];

        case 11:
          return bufs(function (os_3) {
            outputTyconRef(denv, os_3, $var21[1].DeclaringTyconRef);
          });

        case 12:
          return bufs(function (os_4) {
            var clo1_3;
            outputTyconRef(denv, os_4, $var21[1].DeclaringTyconRef);
            (clo1_3 = Microsoft.FSharp.Core.Printf.bprintf(os_4), CurriedLambda(function (arg10_3) {
              return CurriedLambda(clo1_3)(arg10_3);
            }))(printf(".%s"), $var21[1].DisplayName);
          });

        case 13:
          return bufs(function (os_5) {
            var clo1_4;
            outputTyconRef(denv, os_5, $var21[1].DeclaringTyconRef);
            (clo1_4 = Microsoft.FSharp.Core.Printf.bprintf(os_5), CurriedLambda(function (arg10_4) {
              return CurriedLambda(clo1_4)(arg10_4);
            }))(printf(".%s"), $var21[1].DisplayName);
          });

        case 14:
          return bufs(function (os_6) {
            outputTyconRef(denv, os_6, $var21[1]);
          });

        case 15:
          const matchValue = tryDestAppTy(g, $var21[1]);

          if (matchValue != null) {
            return bufs(function (os_7) {
              outputTyconRef(denv, os_7, getValue(matchValue));
            });
          } else {
            return "";
          }

        case 16:
          const definiteNamespace = forAll(function (modref) {
            return modref.IsNamespace;
          }, $var21[2]);

          if (definiteNamespace) {
            return fullDisplayTextOfModRef($var21[1]);
          } else {
            return $var21[1].DemangledModuleOrNamespaceName;
          }

        case 17:
          return $var21[1];

        case 18:
          return $var21[1].idText;

        case 19:
          g = g;
          item = $var21[1];
          continue FullNameOfItem;

        case 20:
          return $var21[1].idText;

        case 21:
          return "";
      }
    }
  };

  const GetXmlCommentForItem = __exports.GetXmlCommentForItem = function (infoReader, m, item) {
    GetXmlCommentForItem: while (true) {
      const g = infoReader.g;
      const $var22 = item.tag === 19 ? item.data[1].contents != null ? getValue(item.data[1].contents).tag === 0 ? [0, getValue(item.data[1].contents).data[1]] : [13] : [13] : item.tag === 0 ? [1, item.data] : item.tag === 16 ? [1, item.data[1]] : item.tag === 1 ? [2, item.data[0]] : item.tag === 3 ? [3, item.data] : item.tag === 4 ? [4, item.data] : item.tag === 5 ? [5, item.data] : item.tag === 8 ? [6, item.data] : item.tag === 9 ? [7, item.data[1]] : item.tag === 15 ? item.data[2] != null ? [8, getValue(item.data[2])] : [13] : item.tag === 11 ? item.data[1].tail != null ? [8, item.data[1].head] : [13] : item.tag === 10 ? item.data[1].tail != null ? [8, item.data[1].head] : [13] : item.tag === 14 ? item.data[1].tail != null ? item.data[1].head.tag === 1 ? [9, item.data[1].head.data[0]] : [13] : [13] : item.tag === 18 ? item.data.tail != null ? [10, item.data.head, item.data] : [13] : item.tag === 20 ? [11, item.data[2]] : item.tag === 21 ? [12, item.data[1]] : item.tag === 2 ? [13] : item.tag === 6 ? [13] : item.tag === 7 ? [13] : item.tag === 12 ? [13] : item.tag === 13 ? [13] : [13];

      switch ($var22[0]) {
        case 0:
          infoReader = infoReader;
          m = m;
          item = new Item(0, $var22[1]);
          continue GetXmlCommentForItem;

        case 1:
          return GetXmlCommentForItemAux((valRefInThisAssembly(g.compilingFslib, $var22[1]) ? true : $var22[1].XmlDoc.NonEmpty) ? $var22[1].XmlDoc : null, infoReader, m, item);

        case 2:
          return GetXmlCommentForItemAux((tyconRefUsesLocalXmlDoc(g.compilingFslib, $var22[1].TyconRef) ? true : $var22[1].UnionCase.XmlDoc.NonEmpty) ? $var22[1].UnionCase.XmlDoc : null, infoReader, m, item);

        case 3:
          return GetXmlCommentForItemAux($var22[1].ActivePatternVal.XmlDoc, infoReader, m, item);

        case 4:
          return GetXmlCommentForItemAux((tyconRefUsesLocalXmlDoc(g.compilingFslib, $var22[1]) ? true : $var22[1].XmlDoc.NonEmpty) ? $var22[1].XmlDoc : null, infoReader, m, item);

        case 5:
          return GetXmlCommentForItemAux((tyconRefUsesLocalXmlDoc(g.compilingFslib, $var22[1].TyconRef) ? true : $var22[1].TyconRef.XmlDoc.NonEmpty) ? $var22[1].RecdField.XmlDoc : null, infoReader, m, item);

        case 6:
          return GetXmlCommentForItemAux(($var22[1].HasDirectXmlComment ? true : $var22[1].XmlDoc.NonEmpty) ? $var22[1].XmlDoc : null, infoReader, m, item);

        case 7:
          const pinfo = $var22[1].head;
          return GetXmlCommentForItemAux((pinfo.HasDirectXmlComment ? true : pinfo.XmlDoc.NonEmpty) ? pinfo.XmlDoc : null, infoReader, m, item);

        case 8:
          return GetXmlCommentForMethInfoItem(infoReader, m, item, $var22[1]);

        case 9:
          return GetXmlCommentForItemAux((tyconRefUsesLocalXmlDoc(g.compilingFslib, $var22[1]) ? true : $var22[1].XmlDoc.NonEmpty) ? $var22[1].XmlDoc : null, infoReader, m, item);

        case 10:
          const definiteNamespace = forAll(function (modref) {
            return modref.IsNamespace;
          }, $var22[2]);

          if (!definiteNamespace) {
            return GetXmlCommentForItemAux((entityRefInThisAssembly(g.compilingFslib, $var22[1]) ? true : $var22[1].XmlDoc.NonEmpty) ? $var22[1].XmlDoc : null, infoReader, m, item);
          } else {
            return GetXmlCommentForItemAux(null, infoReader, m, item);
          }

        case 11:
          const xmldoc = $var22[1] != null ? getValue($var22[1]).tag === 1 ? (tyconRefUsesLocalXmlDoc(g.compilingFslib, getValue($var22[1]).data) ? true : getValue($var22[1]).data.XmlDoc.NonEmpty) ? getValue($var22[1]).data.XmlDoc : null : getValue($var22[1]).tag === 2 ? (tyconRefUsesLocalXmlDoc(g.compilingFslib, getValue($var22[1]).data.TyconRef) ? true : getValue($var22[1]).data.UnionCase.XmlDoc.NonEmpty) ? getValue($var22[1]).data.UnionCase.XmlDoc : null : (getValue($var22[1]).data.HasDirectXmlComment ? true : getValue($var22[1]).data.XmlDoc.NonEmpty) ? getValue($var22[1]).data.XmlDoc : null : null;
          return GetXmlCommentForItemAux(xmldoc, infoReader, m, item);

        case 12:
          infoReader = infoReader;
          m = m;
          item = $var22[1];
          continue GetXmlCommentForItem;

        case 13:
          return GetXmlCommentForItemAux(null, infoReader, m, item);
      }
    }
  };

  const IsAttribute = __exports.IsAttribute = function (infoReader, item) {
    try {
      const g = infoReader.g;
      const amap = infoReader.amap;
      const $var23 = item.tag === 14 ? item.data[1].tail != null ? item.data[1].head.tag === 1 ? [0, item.data[1].head.data[0]] : [1] : [1] : [1];

      switch ($var23[0]) {
        case 0:
          const ty = generalizedTyconRef($var23[1]);
          return ExistsHeadTypeInEntireHierarchy(g, amap, range0, ty, g.tcref_System_Attribute);

        case 1:
          return false;
      }
    } catch (matchValue) {
      return false;
    }
  };

  const FormatItemDescriptionToToolTipElement = __exports.FormatItemDescriptionToToolTipElement = function (isListItem, infoReader, m, denv, item) {
    var matchValue_2;

    FormatItemDescriptionToToolTipElement: while (true) {
      const g = infoReader.g;
      const amap = infoReader.amap;
      const denv_1 = SimplerDisplayEnv(denv);
      const xml = GetXmlCommentForItem(infoReader, m, item.Item);
      const $var24 = item.Item.tag === 19 ? item.Item.data[1].contents != null ? getValue(item.Item.data[1].contents).tag === 0 ? [0, getValue(item.Item.data[1].contents).data[1]] : [19] : [19] : item.Item.tag === 0 ? [1, item.Item.data] : item.Item.tag === 16 ? [1, item.Item.data[1]] : item.Item.tag === 1 ? [2, item.Item.data[0]] : item.Item.tag === 2 ? [3, item.Item.data[0], item.Item.data[2], item.Item.data[1]] : item.Item.tag === 3 ? [4, item.Item.data] : item.Item.tag === 4 ? [5, item.Item.data] : item.Item.tag === 5 ? [6, item.Item.data] : item.Item.tag === 6 ? [7, item.Item.data] : item.Item.tag === 7 ? [8, item.Item.data] : item.Item.tag === 8 ? [9, item.Item.data] : item.Item.tag === 9 ? item.Item.data[1].tail != null ? [10, item.Item.data[1].head] : [19] : item.Item.tag === 15 ? item.Item.data[2] != null ? [11, item.Item.data[0], getValue(item.Item.data[2]), item.Item.data[1]] : [19] : item.Item.tag === 11 ? [12, item.Item.data[1]] : item.Item.tag === 10 ? [12, item.Item.data[1]] : item.Item.tag === 12 ? [13, item.Item.data] : item.Item.tag === 13 ? [14, item.Item.data] : item.Item.tag === 14 ? item.Item.data[1].tail != null ? item.Item.data[1].head.tag === 1 ? [15, item.Item.data[1].head.data[0]] : [19] : [19] : item.Item.tag === 22 ? item.Item.data.tail != null ? [15, item.Item.data.head] : [19] : item.Item.tag === 18 ? item.Item.data.tail != null ? [16, item.Item.data.head, item.Item.data] : [19] : item.Item.tag === 20 ? [17, item.Item.data[1], item.Item.data[0]] : item.Item.tag === 21 ? [18, item.Item.data[1]] : [19];

      switch ($var24[0]) {
        case 0:
          isListItem = isListItem;
          infoReader = infoReader;
          m = m;
          denv = denv_1;
          item = new ItemWithInst(new Item(0, $var24[1]), item.TyparInst);
          continue FormatItemDescriptionToToolTipElement;

        case 1:
          const patternInput = layoutQualifiedValOrMember(denv_1, item.TyparInst, $var24[1].Deref);
          const remarks = OutputFullName(isListItem, function (v) {
            return pubpathOfValRef(v);
          }, function (arg00_) {
            return fullDisplayTextOfValRefAsLayout(arg00_);
          }, $var24[1]);
          const tpsL = FormatTyparMapping(denv_1, patternInput[0]);
          return FSharpToolTipElement.Single(patternInput[1], xml, tpsL, null, remarks);

        case 2:
          const uc = $var24[1].UnionCase;
          const rty = generalizedTyconRef($var24[1].TyconRef);
          const recd = uc.RecdFields;
          const layout = op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoUnionCase())), op_HatHat(layoutTyconRef(denv_1, $var24[1].TyconRef), op_HatHat(sepL(TaggedTextOps.tagPunctuation(".")), op_HatHat(wordL(mkNav(uc.DefinitionRange, TaggedTextOps.tagUnionCase(DecompileOpName(uc.Id.idText)))), op_HatHat(RightL.colon, op_HatHat(recd.tail == null ? emptyL : op_HatHat(layoutUnionCases(denv_1, recd), WordL.arrow), layoutType(denv_1, rty)))))));
          return FSharpToolTipElement.Single(layout, xml);

        case 3:
          const items = $var24[1].ActiveTags;
          const layout_1 = op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoActivePatternResult())), op_HatHat(wordL(mkNav($var24[1].Range, TaggedTextOps.tagActivePatternResult(item_1($var24[2], items)))), op_HatHat(RightL.colon, layoutType(denv_1, $var24[3]))));
          return FSharpToolTipElement.Single(layout_1, xml);

        case 4:
          const v_1 = $var24[1].ActivePatternVal;
          const tau = v_1.TauType;
          const patternInput_1 = PrettyTypes.PrettifyInstAndType(denv_1.g, item.TyparInst, tau);
          const ptau = patternInput_1[0][1];
          const prettyTyparInst = patternInput_1[0][0];
          const remarks_1 = OutputFullName(isListItem, function (v_2) {
            return pubpathOfValRef(v_2);
          }, function (arg00__1) {
            return fullDisplayTextOfValRefAsLayout(arg00__1);
          }, v_1);
          const layout_2 = op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoActiveRecognizer())), op_HatHat(wordL(mkNav(v_1.DefinitionRange, TaggedTextOps.tagActivePatternCase(ActivePatternElemRef_get_Name.bind($var24[1])()))), op_HatHat(RightL.colon, layoutType(denv_1, ptau))));
          const tpsL_1 = FormatTyparMapping(denv_1, prettyTyparInst);
          return FSharpToolTipElement.Single(layout_2, xml, tpsL_1, null, remarks_1);

        case 5:
          const layout_3 = layoutExnDef(denv_1, $var24[1].Deref);
          const remarks_2 = OutputFullName(isListItem, function (x) {
            return pubpathOfTyconRef(x);
          }, function (arg00__2) {
            return fullDisplayTextOfExnRefAsLayout(arg00__2);
          }, $var24[1]);
          return FSharpToolTipElement.Single(layout_3, xml, null, null, remarks_2);

        case 6:
          const rfield = $var24[1].RecdField;
          const patternInput_2 = PrettyTypes.PrettifyType(g, $var24[1].FieldType);
          const layout_4 = op_HatHat(layoutTyconRef(denv_1, $var24[1].TyconRef), op_HatHat(SepL.dot, op_HatHat(wordL(mkNav(rfield.DefinitionRange, TaggedTextOps.tagRecordField(DecompileOpName(rfield.Name)))), op_HatHat(RightL.colon, op_HatHat(layoutType(denv_1, patternInput_2[0]), (() => {
            const matchValue = $var24[1].LiteralValue;

            if (matchValue != null) {
              try {
                return op_HatHat(WordL.equals, layoutConst(denv_1.g, patternInput_2[0], getValue(matchValue)));
              } catch (matchValue_1) {
                return emptyL;
              }
            } else {
              return emptyL;
            }
          })())))));
          return FSharpToolTipElement.Single(layout_4, xml);

        case 7:
          const layout_5 = op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoPatternVariable())), wordL(TaggedTextOps.tagUnknownEntity($var24[1].idText)));
          return FSharpToolTipElement.Single(layout_5, xml);

        case 8:
          const layout_6 = op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoField())), op_HatHat(layoutILTypeRef(denv_1, $var24[1].ILTypeRef), op_HatHat(SepL.dot, op_HatHat(wordL(TaggedTextOps.tagField($var24[1].FieldName)), op_HatHat(RightL.colon, op_HatHat(layoutType(denv_1, $var24[1].FieldType(amap, m)), (matchValue_2 = $var24[1].LiteralValue, matchValue_2 != null ? op_HatHat(WordL.equals, (() => {
            try {
              return layoutConst(denv_1.g, $var24[1].FieldType(infoReader.amap, m), TcFieldInit(m, getValue(matchValue_2)));
            } catch (matchValue_3) {
              return emptyL;
            }
          })()) : emptyL)))))));
          return FSharpToolTipElement.Single(layout_6, xml);

        case 9:
          const rty_1 = PropTypOfEventInfo(infoReader, m, new AccessorDomain(3), $var24[1]);
          const patternInput_3 = PrettyTypes.PrettifyType(g, rty_1);
          const layout_7 = op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoEvent())), op_HatHat(layoutTyconRef(denv_1, $var24[1].ApparentEnclosingTyconRef), op_HatHat(SepL.dot, op_HatHat(wordL(TaggedTextOps.tagEvent($var24[1].EventName)), op_HatHat(RightL.colon, layoutType(denv_1, patternInput_3[0]))))));
          return FSharpToolTipElement.Single(layout_7, xml);

        case 10:
          const layout_8 = prettyLayoutOfPropInfoFreeStyle(g, amap, m, denv_1, $var24[1]);
          return FSharpToolTipElement.Single(layout_8, xml);

        case 11:
          const layout_9 = op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoCustomOperation())), op_HatHat(RightL.colon, op_HatHat((() => {
            const matchValue_4 = $var24[3]();

            if (matchValue_4 == null) {
              const argTys = map(function (_arg1) {
                return _arg1.data[1];
              }, ParamNameAndTypesOfUnaryCustomOperation(g, $var24[2]));
              const patternInput_4 = PrettyTypes.PrettifyTypes(g, argTys);
              return op_HatHat(wordL(TaggedTextOps.tagMethod($var24[1])), sepListL(SepL.space, map(function (ty) {
                return op_HatHat(LeftL.leftParen, op_HatHat(layoutType(denv_1, ty), SepL.rightParen));
              }, patternInput_4[0])));
            } else {
              return wordL(TaggedTextOps.tagText(getValue(matchValue_4)));
            }
          })(), op_HatHat(SepL.lineBreak, op_HatHat(SepL.lineBreak, op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoCallsWord())), op_HatHat(layoutTyconRef(denv_1, $var24[2].ApparentEnclosingTyconRef), op_HatHat(SepL.dot, wordL(TaggedTextOps.tagMethod($var24[2].DisplayName))))))))));
          return FSharpToolTipElement.Single(layout_9, xml);

        case 12:
          return FormatOverloadsToList(infoReader, m, denv_1, item, $var24[1]);

        case 13:
          const patternInput_5 = PrettyTypes.PrettifyType(g, $var24[1]);
          const layout_10 = layoutTyconRef(denv_1, tcrefOfAppTy(g, patternInput_5[0]));
          return FSharpToolTipElement.Single(layout_10, xml);

        case 14:
          const patternInput_6 = PrettyTypes.PrettifyType(g, $var24[1]);
          const patternInput_7 = GetSigOfFunctionForDelegate(infoReader, patternInput_6[0], m, new AccessorDomain(3));
          const layout_11 = op_HatHat(layoutTyconRef(denv_1, tcrefOfAppTy(g, patternInput_6[0])), op_HatHat(LeftL.leftParen, op_HatHat(layoutType(denv_1, patternInput_7.data[3]), RightL.rightParen)));
          return FSharpToolTipElement.Single(layout_11, xml);

        case 15:
          const denv_2 = new DisplayEnv(denv_1.includeStaticParametersInTypeNames, denv_1.openTopPathsSorted, denv_1.openTopPathsRaw, true, denv_1.suppressNestedTypes, denv_1.maxMembers, denv_1.showObsoleteMembers, denv_1.showHiddenMembers, denv_1.showTyparBinding, denv_1.showImperativeTyparAnnotations, denv_1.suppressInlineKeyword, denv_1.suppressMutableKeyword, denv_1.showMemberContainers, denv_1.shortConstraints, denv_1.useColonForReturnType, denv_1.showAttributes, denv_1.showOverrides, denv_1.showConstraintTyparAnnotations, denv_1.abbreviateAdditionalConstraints, denv_1.showTyparDefaultConstraints, denv_1.g, denv_1.contextAccessibility, denv_1.generatedValueLayout);
          const layout_12 = layoutTycon(denv_2, infoReader, new AccessorDomain(3), m, $var24[1].Deref);
          const remarks_3 = OutputFullName(isListItem, function (x_1) {
            return pubpathOfTyconRef(x_1);
          }, function (arg00__3) {
            return fullDisplayTextOfTyconRefAsLayout(arg00__3);
          }, $var24[1]);
          return FSharpToolTipElement.Single(layout_12, xml, null, null, remarks_3);

        case 16:
          const modrefs = RemoveDuplicateModuleRefs($var24[2]);
          const definiteNamespace = forAll(function (modref) {
            return modref.IsNamespace;
          }, modrefs);
          const kind = definiteNamespace ? SR.typeInfoNamespace() : forAll(function (modref_1) {
            return modref_1.IsModule;
          }, modrefs) ? SR.typeInfoModule() : SR.typeInfoNamespaceOrModule();
          const layout_13 = op_HatHat(wordL(TaggedTextOps.tagKeyword(kind)), wordL(mkNav($var24[1].DefinitionRange, definiteNamespace ? TaggedTextOps.tagNamespace(fullDisplayTextOfModRef($var24[1])) : TaggedTextOps.tagModule($var24[1].DemangledModuleOrNamespaceName))));

          if (!definiteNamespace) {
            const namesToAdd = toList(mapIndexed(function (i, x_2) {
              return [i, x_2];
            }, fold(function (st, modref_2) {
              const matchValue_5 = fullDisplayTextOfParentOfModRef(modref_2);

              if (matchValue_5 != null) {
                return new List(getValue(matchValue_5), st);
              } else {
                return st;
              }
            }, new List(), modrefs)));
            const layout_14 = op_HatHat(layout_13, !(namesToAdd.tail == null) ? op_HatHat(SepL.lineBreak, fold(function (s, tupledArg) {
              return op_HatHat(s, op_HatHat(SepL.lineBreak, wordL(TaggedTextOps.tagText((tupledArg[0] === 0 ? function (arg00) {
                return SR.typeInfoFromFirst(arg00);
              } : function (arg00_1) {
                return SR.typeInfoFromNext(arg00_1);
              })(tupledArg[1])))));
            }, emptyL, namesToAdd)) : emptyL);
            return FSharpToolTipElement.Single(layout_14, xml);
          } else {
            return FSharpToolTipElement.Single(layout_13, xml);
          }

        case 17:
          const patternInput_8 = PrettyTypes.PrettifyType(g, $var24[1]);
          const layout_15 = op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoArgument())), op_HatHat(wordL(TaggedTextOps.tagParameter($var24[2].idText)), op_HatHat(RightL.colon, layoutType(denv_1, patternInput_8[0]))));
          return FSharpToolTipElement.Single(layout_15, xml, null, $var24[2].idText);

        case 18:
          isListItem = isListItem;
          infoReader = infoReader;
          m = m;
          denv = denv_1;
          item = ItemWithNoInst($var24[1]);
          continue FormatItemDescriptionToToolTipElement;

        case 19:
          return new FSharpToolTipElement(0);
      }
    }
  };

  const GetF1Keyword = __exports.GetF1Keyword = function (g, item) {
    var copyOfStruct;

    GetF1Keyword: while (true) {
      const getKeywordForMethInfo = function (minfo) {
        if (minfo.tag === 1) {
          const typeString = ticksAndArgCountTextOfTyconRef(minfo.data[1].DeclaringTyconRef);
          let paramString;
          const nGenericParams = minfo.data[1].RawMetadata.GenericParams.length | 0;

          if (nGenericParams > 0) {
            paramString = "``" + toString(nGenericParams);
          } else {
            paramString = "";
          }

          return toText(printf("%s.%s%s"))(typeString, minfo.data[1].RawMetadata.Name, paramString);
        } else if (minfo.tag === 2) {
          return null;
        } else {
          const matchValue = minfo.data[2].DeclaringEntity;

          if (matchValue.tag === 1) {
            return null;
          } else {
            return ticksAndArgCountTextOfTyconRef(matchValue.data) + "." + minfo.data[2].CompiledName;
          }
        }
      };

      let $var25;

      if (item.tag === 0) {
        $var25 = [0, item.data];
      } else if (item.tag === 16) {
        $var25 = [0, item.data[1]];
      } else if (item.tag === 3) {
        $var25 = [1, item.data];
      } else if (item.tag === 1) {
        $var25 = [2, item.data[0]];
      } else if (item.tag === 5) {
        $var25 = [3, item.data];
      } else if (item.tag === 7) {
        $var25 = [4, item.data];
      } else if (item.tag === 14) {
        if (item.data[1].tail != null) {
          const activePatternResult49488 = function (arg10__1) {
            return _AppTy___(g, arg10__1);
          }(item.data[1].head);

          if (activePatternResult49488 != null) {
            $var25 = [5, getValue(activePatternResult49488)[0]];
          } else {
            $var25 = [6];
          }
        } else {
          $var25 = [6];
        }
      } else if (item.tag === 13) {
        const activePatternResult49490 = function (arg10__2) {
          return _AppTy___(g, arg10__2);
        }(item.data);

        if (activePatternResult49490 != null) {
          $var25 = [5, getValue(activePatternResult49490)[0]];
        } else {
          $var25 = [6];
        }
      } else if (item.tag === 12) {
        const activePatternResult49492 = function (arg10__3) {
          return _AppTy___(g, arg10__3);
        }(item.data);

        if (activePatternResult49492 != null) {
          $var25 = [5, getValue(activePatternResult49492)[0]];
        } else {
          $var25 = [6];
        }
      } else if (item.tag === 22) {
        if (item.data.tail != null) {
          $var25 = [5, item.data.head];
        } else {
          $var25 = [6];
        }
      } else if (item.tag === 4) {
        $var25 = [5, item.data];
      } else {
        $var25 = [6];
      }

      switch ($var25[0]) {
        case 0:
          const v = $var25[1].Deref;

          if (v.IsModuleBinding ? v.HasDeclaringEntity : false) {
            const tyconRef = v.TopValDeclaringEntity;
            let paramsString;
            const matchValue_1 = v.Typars;

            if (matchValue_1.tail == null) {
              paramsString = "";
            } else {
              paramsString = "``" + (copyOfStruct = matchValue_1.length | 0, toString(copyOfStruct));
            }

            return toText(printf("%s.%s%s"))(ticksAndArgCountTextOfTyconRef(tyconRef), v.CompiledName, paramsString);
          } else {
            return null;
          }

        case 1:
          g = g;
          item = new Item(0, $var25[1].ActivePatternVal);
          continue GetF1Keyword;

        case 2:
          return ticksAndArgCountTextOfTyconRef($var25[1].TyconRef) + "." + $var25[1].Name;

        case 3:
          return ticksAndArgCountTextOfTyconRef($var25[1].TyconRef) + "." + $var25[1].Name;

        case 4:
          return ticksAndArgCountTextOfTyconRef($var25[1].data[0].TyconRefOfRawMetadata) + "." + $var25[1].data[1].Name;

        case 5:
          const matchValue_2 = generalizedTyconRef($var25[1]);

          const activePatternResult49479 = function (arg10_) {
            return _AppTy___(g, arg10_);
          }(matchValue_2);

          if (activePatternResult49479 != null) {
            return ticksAndArgCountTextOfTyconRef(getValue(activePatternResult49479)[0]);
          } else {
            return null;
          }

        case 6:
          const $var26 = item.tag === 14 ? [0] : item.tag === 13 ? [0] : item.tag === 12 ? [0] : item.tag === 22 ? item.data.tail == null ? [0] : [11] : item.tag === 18 ? [1, item.data] : item.tag === 9 ? item.data[1].tail == null ? [3] : [2, item.data[1].head] : item.tag === 8 ? [4, item.data] : item.tag === 11 ? [5, item.data[1]] : item.tag === 15 ? item.data[2] == null ? [10] : [6, getValue(item.data[2])] : item.tag === 10 ? item.data[2] != null ? [7, getValue(item.data[2])] : item.data[1].tail == null ? [10] : [8, item.data[1].head] : item.tag === 21 ? [9, item.data[1]] : item.tag === 6 ? [10] : item.tag === 20 ? [10] : item.tag === 17 ? [10] : item.tag === 19 ? [10] : item.tag === 2 ? [10] : [11];

          switch ($var26[0]) {
            case 0:
              return null;

            case 1:
              if ($var26[1].tail == null) {
                return null;
              } else {
                const matchValue_3 = $var26[1].head.Deref.TypeReprInfo;
                return $var26[1].head.Deref.CompiledRepresentationForNamedType.FullName;
              }

            case 2:
              const $var27 = $var26[1].tag === 1 ? [1, $var26[1].data.data[1], $var26[1].data.data[0]] : $var26[1].data[2] != null ? [0, getValue($var26[1].data[2])] : $var26[1].data[3] != null ? [0, getValue($var26[1].data[3])] : [2];

              switch ($var27[0]) {
                case 0:
                  const matchValue_4 = $var27[1].DeclaringEntity;

                  if (matchValue_4.tag === 1) {
                    return null;
                  } else {
                    return ticksAndArgCountTextOfTyconRef(matchValue_4.data) + "." + $var27[1].PropertyName;
                  }

                case 1:
                  const tcref = $var27[2].TyconRefOfRawMetadata;
                  return ticksAndArgCountTextOfTyconRef(tcref) + "." + $var27[1].Name;

                case 2:
                  return null;
              }

            case 3:
              return null;

            case 4:
              if ($var26[1].tag === 0) {
                const matchValue_5 = $var26[1].data[1].ArbitraryValRef;

                if (matchValue_5 == null) {
                  return null;
                } else {
                  const matchValue_6 = getValue(matchValue_5).DeclaringEntity;

                  if (matchValue_6.tag === 1) {
                    return null;
                  } else {
                    return ticksAndArgCountTextOfTyconRef(matchValue_6.data) + "." + getValue(matchValue_5).PropertyName;
                  }
                }
              } else {
                const tcref_1 = $var26[1].DeclaringTyconRef;
                return ticksAndArgCountTextOfTyconRef(tcref_1) + "." + $var26[1].EventName;
              }

            case 5:
              if ($var26[1].tail != null) {
                if ($var26[1].head.tag === 0) {
                  const matchValue_7 = $var26[1].head.data[2].DeclaringEntity;

                  if (matchValue_7.tag === 1) {
                    return null;
                  } else {
                    return ticksAndArgCountTextOfTyconRef(matchValue_7.data) + ".#ctor";
                  }
                } else {
                  const tcref_2 = $var26[1].head.DeclaringTyconRef;
                  return ticksAndArgCountTextOfTyconRef(tcref_2) + ".#ctor";
                }
              } else {
                return null;
              }

            case 6:
              return getKeywordForMethInfo($var26[1]);

            case 7:
              return getKeywordForMethInfo($var26[1]);

            case 8:
              return getKeywordForMethInfo($var26[1]);

            case 9:
              g = g;
              item = $var26[1];
              continue GetF1Keyword;

            case 10:
              return null;

            case 11:
              throw new Error("C:/projects/fcs/src/fsharp/symbols/SymbolHelpers.fs", 1302, 14);
          }

      }
    }
  };

  const FormatStructuredDescriptionOfItem = __exports.FormatStructuredDescriptionOfItem = function (isListItem, infoReader, m, denv, item) {
    return function (arg00, arg10, arg20) {
      return ErrorScope.Protect(arg00, arg10, arg20);
    }(m, function () {
      return FormatItemDescriptionToToolTipElement(isListItem, infoReader, m, denv, item);
    }, function (err) {
      return new FSharpToolTipElement(2, err);
    });
  };

  const FlattenItems = __exports.FlattenItems = function (g, _m, item) {
    switch (item.tag) {
      case 10:
        return map(function (minfo) {
          return new Item(10, [item.data[0], ofArray([minfo]), item.data[2]]);
        }, item.data[1]);

      case 11:
        return map(function (minfo_1) {
          return new Item(11, [item.data[0], ofArray([minfo_1])]);
        }, item.data[1]);

      case 12:
      case 13:
        return ofArray([item]);

      case 6:
      case 7:
        return new List();

      case 8:
        return new List();

      case 5:
        if (isFunction(g, item.data.FieldType)) {
          return ofArray([item]);
        } else {
          return new List();
        }

      case 0:
        if (isFunction(g, item.data.Type)) {
          return ofArray([item]);
        } else {
          return new List();
        }

      case 1:
        if (!item.data[0].UnionCase.IsNullary) {
          return ofArray([item]);
        } else {
          return new List();
        }

      case 4:
        if (recdFieldsOfExnDefRef(item.data).tail == null) {
          return new List();
        } else {
          return ofArray([item]);
        }

      case 9:
        const pinfo = item.data[1].head;

        if (pinfo.IsIndexer) {
          return ofArray([item]);
        } else {
          return new List();
        }

      case 15:
        return ofArray([item]);

      case 17:
        return new List();

      case 16:
        return new List();

      default:
        return new List();
    }
  };

  return __exports;
}({});