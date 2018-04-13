import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareRecords, GenericParam, createAtom, extendInfo, equals, makeGeneric, Unit, Function as _Function, Tuple, toString, Option, equalsRecords, comparePrimitives } from "../fable-core/Util";
import { range0, range } from "./range";
import { makeSome, getValue } from "../fable-core/Option";
import { System, Microsoft } from "../fcs-fable/adapters";
import { trim, replace, printf, toText } from "../fable-core/String";
import { reverse, append, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { exists, iterate, toList } from "../fable-core/Seq";
import { SR } from "../codegen/FSComp";
export class ErrorStyle {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.ErrorStyle",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["DefaultErrors"], ["EmacsErrors"], ["TestErrors"], ["VSErrors"], ["GccErrors"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.ErrorStyle", ErrorStyle);
export class WrappedError extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, WrappedError.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.WrappedError",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Error,
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get Message() {
    const matchValue = this;

    if (matchValue instanceof WrappedError) {
      return "WrappedError(" + matchValue.Data0.message + ")";
    } else {
      return "WrappedError";
    }
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.WrappedError", WrappedError);
export class ReportedError extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, ReportedError.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.ReportedError",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Option(Error)
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get Message() {
    const matchValue = this;
    const $var1 = matchValue instanceof ReportedError ? matchValue.Data0 != null ? [0, getValue(matchValue.Data0)] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return "The exception has been reported. This internal exception should now be caught at an error recovery point on the stack. Original message: " + $var1[1].message + ")";

      case 1:
        return "The exception has been reported. This internal exception should now be caught at an error recovery point on the stack.";
    }
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.ReportedError", ReportedError);
export function findOriginalException(err) {
  findOriginalException: while (true) {
    const $var2 = err instanceof ReportedError ? err.Data0 != null ? [0, getValue(err.Data0)] : err instanceof WrappedError ? [1, err.Data0] : [2] : err instanceof WrappedError ? [1, err.Data0] : [2];

    switch ($var2[0]) {
      case 0:
        return $var2[1];

      case 1:
        err = $var2[1];
        continue findOriginalException;

      case 2:
        return err;
    }
  }
}
export function NoSuggestions() {
  return new Set();
}
export class StopProcessingExn extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, StopProcessingExn.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.StopProcessingExn",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Option(Error)
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get Message() {
    return "Processing of a script fragment has stopped because an exception has been raised";
  }

  ToString() {
    const matchValue = this;
    const $var3 = matchValue instanceof StopProcessingExn ? matchValue.Data0 != null ? [0, getValue(matchValue.Data0)] : [1] : [1];

    switch ($var3[0]) {
      case 0:
        return "StopProcessingExn, originally (" + toString($var3[1]) + ")";

      case 1:
        return "StopProcessingExn";
    }
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.StopProcessingExn", StopProcessingExn);

function _StopProcessing___(exn) {
  if (exn instanceof StopProcessingExn) {
    return makeSome();
  } else {
    return null;
  }
}

export { _StopProcessing___ as $7C$StopProcessing$7C$_$7C$ };
export function StopProcessing() {
  return new StopProcessingExn(null);
}
export class NumberedError extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, NumberedError.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.NumberedError",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Tuple(["number", "string"]),
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get Message() {
    const matchValue = this;

    if (matchValue instanceof NumberedError) {
      return matchValue.Data0[1];
    } else {
      return "impossible";
    }
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.NumberedError", NumberedError);

class _Error extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, _Error.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.Error",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Tuple(["number", "string"]),
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get Message() {
    const matchValue = this;

    if (matchValue instanceof _Error) {
      return matchValue.Data0[1];
    } else {
      return "impossible";
    }
  }

}

export { _Error as Error };
setType("Microsoft.FSharp.Compiler.ErrorLogger.Error", _Error);
export class InternalError extends Error {
  constructor(msg, data1) {
    super();
    Object.setPrototypeOf(this, InternalError.prototype);
    this.msg = msg;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.InternalError",
      interfaces: ["FSharpException"],
      properties: {
        msg: "string",
        Data1: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get Message() {
    const matchValue = this;

    if (matchValue instanceof InternalError) {
      return matchValue.msg + toString(matchValue.Data1);
    } else {
      return "impossible";
    }
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.InternalError", InternalError);
export class UserCompilerMessage extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, UserCompilerMessage.prototype);
    this.Data0 = data0;
    this.Data1 = data1 | 0;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.UserCompilerMessage",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: "number",
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.UserCompilerMessage", UserCompilerMessage);
export class LibraryUseOnly extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, LibraryUseOnly.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.LibraryUseOnly",
      interfaces: ["FSharpException"],
      properties: {
        Data0: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.LibraryUseOnly", LibraryUseOnly);
export class Deprecated extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, Deprecated.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.Deprecated",
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
setType("Microsoft.FSharp.Compiler.ErrorLogger.Deprecated", Deprecated);
export class Experimental extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, Experimental.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.Experimental",
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
setType("Microsoft.FSharp.Compiler.ErrorLogger.Experimental", Experimental);
export class PossibleUnverifiableCode extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, PossibleUnverifiableCode.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.PossibleUnverifiableCode",
      interfaces: ["FSharpException"],
      properties: {
        Data0: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.PossibleUnverifiableCode", PossibleUnverifiableCode);
export class UnresolvedReferenceNoRange extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, UnresolvedReferenceNoRange.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.UnresolvedReferenceNoRange",
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
setType("Microsoft.FSharp.Compiler.ErrorLogger.UnresolvedReferenceNoRange", UnresolvedReferenceNoRange);
export class UnresolvedReferenceError extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, UnresolvedReferenceError.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.UnresolvedReferenceError",
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
setType("Microsoft.FSharp.Compiler.ErrorLogger.UnresolvedReferenceError", UnresolvedReferenceError);
export class UnresolvedPathReferenceNoRange extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, UnresolvedPathReferenceNoRange.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.UnresolvedPathReferenceNoRange",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.UnresolvedPathReferenceNoRange", UnresolvedPathReferenceNoRange);
export class UnresolvedPathReference extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, UnresolvedPathReference.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.UnresolvedPathReference",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: "string",
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.UnresolvedPathReference", UnresolvedPathReference);
export class ErrorWithSuggestions extends Error {
  constructor(data0, data1, data2, data3) {
    super();
    Object.setPrototypeOf(this, ErrorWithSuggestions.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
    this.Data3 = data3;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.ErrorWithSuggestions",
      interfaces: ["FSharpException"],
      properties: {
        Data0: Tuple(["number", "string"]),
        Data1: range,
        Data2: "string",
        Data3: _Function([Unit, makeGeneric(Set, {
          T: "string"
        })])
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get Message() {
    const matchValue = this;

    if (matchValue instanceof ErrorWithSuggestions) {
      return matchValue.Data0[1];
    } else {
      return "impossible";
    }
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.ErrorWithSuggestions", ErrorWithSuggestions);
export function AttachRange(m, exn) {
  if (equals(m, range0)) {
    return exn;
  } else if (exn instanceof UnresolvedReferenceNoRange) {
    return new UnresolvedReferenceError(exn.Data0, m);
  } else if (exn instanceof UnresolvedPathReferenceNoRange) {
    return new UnresolvedPathReference(exn.Data0, exn.Data1, m);
  } else {
    const activePatternResult8696 = Microsoft.FSharp.Core.Operators["|Failure|_|"](exn);

    if (activePatternResult8696 != null) {
      return new InternalError(getValue(activePatternResult8696) + " (Failure)", m);
    } else {
      return exn;
    }
  }
}
export class BuildPhase {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.BuildPhase",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["DefaultPhase"], ["Compile"], ["Parameter"], ["Parse"], ["TypeCheck"], ["CodeGen"], ["Optimize"], ["IlxGen"], ["IlGen"], ["Output"], ["Interactive"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.BuildPhase", BuildPhase);
export class PhasedDiagnostic {
  constructor(exception, phase) {
    this.Exception = exception;
    this.Phase = phase;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.PhasedDiagnostic",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        Exception: Error,
        Phase: BuildPhase
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  static Create(exn, phase) {
    return new PhasedDiagnostic(exn, phase);
  }

  DebugDisplay() {
    return toText(printf("%s: %s"))(this.Subcategory(), this.Exception.message);
  }

  Subcategory() {
    switch (this.Phase.tag) {
      case 1:
        return "compile";

      case 2:
        return "parameter";

      case 3:
        return "parse";

      case 4:
        return "typecheck";

      case 5:
        return "codegen";

      case 6:
        return "optimize";

      case 7:
        return "ilxgen";

      case 8:
        return "ilgen";

      case 9:
        return "output";

      case 10:
        return "interactive";

      default:
        return "";
    }
  }

  static IsSubcategoryOfCompile(subcategory) {
    const $var4 = subcategory === "compile" ? [0] : subcategory === "parameter" ? [0] : subcategory === "parse" ? [0] : subcategory === "typecheck" ? [0] : subcategory === "" ? subcategory == null ? [1] : [1] : subcategory === "codegen" ? subcategory == null ? [1] : [1] : subcategory === "optimize" ? subcategory == null ? [1] : [1] : subcategory === "ilxgen" ? subcategory == null ? [1] : [1] : subcategory === "ilgen" ? subcategory == null ? [1] : [1] : subcategory === "output" ? subcategory == null ? [1] : [1] : subcategory === "interactive" ? subcategory == null ? [1] : [1] : subcategory === "internal" ? subcategory == null ? [1] : [2] : subcategory == null ? [1] : [3];

    switch ($var4[0]) {
      case 0:
        return true;

      case 1:
        return false;

      case 2:
        return false;

      case 3:
        return false;
    }
  }

  IsPhaseInCompile() {
    let isPhaseInCompile;

    switch (this.Phase.tag) {
      case 1:
      case 2:
      case 3:
      case 4:
        isPhaseInCompile = true;
        break;

      default:
        isPhaseInCompile = false;
    }

    return isPhaseInCompile;
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.PhasedDiagnostic", PhasedDiagnostic);
export class ErrorLogger {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.ErrorLogger",
      properties: {
        ErrorCount: "number"
      }
    };
  }

  constructor(nameForDebugging) {
    this.nameForDebugging = nameForDebugging;
  }

  DebugDisplay() {
    return toText(printf("ErrorLogger(%s)"))(this.nameForDebugging);
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.ErrorLogger", ErrorLogger);
export const DiscardErrorsLogger = new class extends ErrorLogger {
  constructor() {
    return super("DiscardErrorsLogger");
  }

  DiagnosticSink(phasedError, isError) {}

  get ErrorCount() {
    return 0;
  }

  [_Symbol.reflection]() {
    return {
      interfaces: ["Microsoft.FSharp.Compiler.ErrorLogger.ErrorLogger"]
    };
  }

}();
export const AssertFalseErrorLogger = new class extends ErrorLogger {
  constructor() {
    return super("AssertFalseErrorLogger");
  }

  DiagnosticSink(phasedError, isError) {}

  get ErrorCount() {
    return 0;
  }

  [_Symbol.reflection]() {
    return {
      interfaces: ["Microsoft.FSharp.Compiler.ErrorLogger.ErrorLogger"]
    };
  }

}();
export class CapturingErrorLogger extends ErrorLogger {
  [_Symbol.reflection]() {
    return extendInfo(CapturingErrorLogger, {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.CapturingErrorLogger",
      interfaces: [],
      properties: {
        Diagnostics: makeGeneric(List, {
          T: Tuple([PhasedDiagnostic, "boolean"])
        }),
        ErrorCount: "number"
      }
    });
  }

  constructor(nm) {
    super(nm);
    this.errorCount = 0;
    this.diagnostics = [];
  }

  DiagnosticSink(phasedError, isError) {
    if (isError) {
      this.errorCount = this.errorCount + 1 | 0;
    }

    this.diagnostics.push([phasedError, isError]);
  }

  get ErrorCount() {
    return this.errorCount;
  }

  get Diagnostics() {
    return toList(this.diagnostics);
  }

  CommitDelayedDiagnostics(errorLogger) {
    const errors = Array.from(this.diagnostics);
    errors.forEach(tupledArg => {
      errorLogger.DiagnosticSink(tupledArg[0], tupledArg[1]);
    });
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.CapturingErrorLogger", CapturingErrorLogger);
export class CompileThreadStatic {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.CompileThreadStatic",
      properties: {
        BuildPhase: BuildPhase,
        BuildPhaseUnchecked: BuildPhase,
        ErrorLogger: ErrorLogger
      }
    };
  }

  static get BuildPhaseUnchecked() {
    return CompileThreadStatic.buildPhase;
  }

  static get BuildPhase() {
    const matchValue = CompileThreadStatic.buildPhase;

    if (matchValue == null) {
      return new BuildPhase(0);
    } else {
      return CompileThreadStatic.buildPhase;
    }
  }

  static set BuildPhase(v) {
    CompileThreadStatic.buildPhase = v;
  }

  static get ErrorLogger() {
    const matchValue = CompileThreadStatic.errorLogger;

    if (matchValue == null) {
      return AssertFalseErrorLogger;
    } else {
      return CompileThreadStatic.errorLogger;
    }
  }

  static set ErrorLogger(v) {
    CompileThreadStatic.errorLogger = v;
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.CompileThreadStatic", CompileThreadStatic);
export const ErrorLoggerExtensions = function (__exports) {
  const PreserveStackTrace = __exports.PreserveStackTrace = function (exn) {
    exn;
  };

  const ReraiseIfWatsonable = __exports.ReraiseIfWatsonable = function (exn) {
    exn;
  };

  const ErrorLogger_ErrorR = __exports["ErrorLogger.ErrorR"] = function (exn) {
    let $var5;

    const activePatternResult8783 = _StopProcessing___(exn);

    if (activePatternResult8783 != null) {
      $var5 = [0];
    } else if (exn instanceof ReportedError) {
      $var5 = [0];
    } else {
      $var5 = [1];
    }

    switch ($var5[0]) {
      case 0:
        PreserveStackTrace(exn);
        throw exn;
        break;

      case 1:
        this.DiagnosticSink(PhasedDiagnostic.Create(exn, CompileThreadStatic.BuildPhase), true);
        break;
    }
  };

  const ErrorLogger_Warning = __exports["ErrorLogger.Warning"] = function (exn) {
    let $var6;

    const activePatternResult8786 = _StopProcessing___(exn);

    if (activePatternResult8786 != null) {
      $var6 = [0];
    } else if (exn instanceof ReportedError) {
      $var6 = [0];
    } else {
      $var6 = [1];
    }

    switch ($var6[0]) {
      case 0:
        PreserveStackTrace(exn);
        throw exn;
        break;

      case 1:
        this.DiagnosticSink(PhasedDiagnostic.Create(exn, CompileThreadStatic.BuildPhase), false);
        break;
    }
  };

  const ErrorLogger_Error = __exports["ErrorLogger.Error"] = function (exn) {
    ErrorLogger_ErrorR.bind(this)(exn);
    throw new ReportedError(exn);
  };

  const ErrorLogger_SimulateError = __exports["ErrorLogger.SimulateError"] = function (ph) {
    this.DiagnosticSink(ph, true);
    throw new ReportedError(ph.Exception);
  };

  const ErrorLogger_ErrorRecovery = __exports["ErrorLogger.ErrorRecovery"] = function (exn, m) {
    let $var7;

    if (exn instanceof ReportedError) {
      $var7 = [0];
    } else if (exn instanceof WrappedError) {
      if (exn.Data0 instanceof ReportedError) {
        $var7 = [0];
      } else {
        const activePatternResult8796 = _StopProcessing___(exn);

        if (activePatternResult8796 != null) {
          $var7 = [1];
        } else {
          const activePatternResult8797 = _StopProcessing___(exn.Data0);

          if (activePatternResult8797 != null) {
            $var7 = [1];
          } else {
            $var7 = [2];
          }
        }
      }
    } else {
      const activePatternResult8798 = _StopProcessing___(exn);

      if (activePatternResult8798 != null) {
        $var7 = [1];
      } else {
        $var7 = [2];
      }
    }

    switch ($var7[0]) {
      case 0:
        break;

      case 1:
        PreserveStackTrace(exn);
        throw exn;
        break;

      case 2:
        try {
          ErrorLogger_ErrorR.bind(this)(AttachRange(m, exn));
          ReraiseIfWatsonable(exn);
        } catch (matchValue) {
          const $var8 = matchValue instanceof ReportedError ? [0] : matchValue instanceof WrappedError ? matchValue.Data0 instanceof ReportedError ? [0] : [1] : [1];

          switch ($var8[0]) {
            case 0:
              break;

            case 1:
              throw matchValue;
              break;
          }
        }

        break;
    }
  };

  const ErrorLogger_StopProcessingRecovery = __exports["ErrorLogger.StopProcessingRecovery"] = function (exn, m) {
    let $var9;

    const activePatternResult8811 = _StopProcessing___(exn);

    if (activePatternResult8811 != null) {
      $var9 = [0];
    } else if (exn instanceof WrappedError) {
      const activePatternResult8812 = _StopProcessing___(exn.Data0);

      if (activePatternResult8812 != null) {
        $var9 = [0];
      } else {
        $var9 = [1];
      }
    } else {
      $var9 = [1];
    }

    switch ($var9[0]) {
      case 0:
        break;

      case 1:
        try {
          ((arg00, arg10) => {
            ErrorLogger_ErrorRecovery.bind(this)(arg00, arg10);
          })(exn, m);
        } catch (matchValue) {
          let $var10;

          const activePatternResult8806 = _StopProcessing___(matchValue);

          if (activePatternResult8806 != null) {
            $var10 = [0];
          } else if (matchValue instanceof WrappedError) {
            const activePatternResult8807 = _StopProcessing___(matchValue.Data0);

            if (activePatternResult8807 != null) {
              $var10 = [0];
            } else {
              $var10 = [1];
            }
          } else {
            $var10 = [1];
          }

          switch ($var10[0]) {
            case 0:
              break;

            case 1:
              const $var11 = matchValue instanceof ReportedError ? [0] : matchValue instanceof WrappedError ? matchValue.Data0 instanceof ReportedError ? [0] : [1] : [1];

              switch ($var11[0]) {
                case 0:
                  break;

                case 1:
                  throw matchValue;
                  break;
              }

              break;
          }
        }

        break;
    }
  };

  const ErrorLogger_ErrorRecoveryNoRange = __exports["ErrorLogger.ErrorRecoveryNoRange"] = function (exn) {
    ((arg00, arg10) => {
      ErrorLogger_ErrorRecovery.bind(this)(arg00, arg10);
    })(exn, range0);
  };

  return __exports;
}({});
export function PushThreadBuildPhaseUntilUnwind(phase) {
  const oldBuildPhase = CompileThreadStatic.BuildPhaseUnchecked;
  CompileThreadStatic.BuildPhase = phase;
  return {
    Dispose() {
      CompileThreadStatic.BuildPhase = oldBuildPhase;
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["System.IDisposable"]
      };
    }

  };
}
export function PushErrorLoggerPhaseUntilUnwind(errorLoggerTransformer) {
  const oldErrorLogger = CompileThreadStatic.ErrorLogger;
  const newErrorLogger = errorLoggerTransformer(oldErrorLogger);
  const newInstalled = {
    contents: true
  };

  const newIsInstalled = function () {
    if (newInstalled.contents) {}
  };

  const chkErrorLogger = new class extends ErrorLogger {
    constructor() {
      return super("PushErrorLoggerPhaseUntilUnwind");
    }

    DiagnosticSink(phasedError, isError) {
      newIsInstalled();
      newErrorLogger.DiagnosticSink(phasedError, isError);
    }

    get ErrorCount() {
      newIsInstalled();
      return newErrorLogger.ErrorCount | 0;
    }

    [_Symbol.reflection]() {
      return {
        interfaces: ["Microsoft.FSharp.Compiler.ErrorLogger.ErrorLogger"]
      };
    }

  }();
  CompileThreadStatic.ErrorLogger = chkErrorLogger;
  return {
    Dispose() {
      CompileThreadStatic.ErrorLogger = oldErrorLogger;
      newInstalled.contents = false;
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["System.IDisposable"]
      };
    }

  };
}
export function SetThreadBuildPhaseNoUnwind(phase) {
  CompileThreadStatic.BuildPhase = phase;
}
export function SetThreadErrorLoggerNoUnwind(errorLogger) {
  CompileThreadStatic.ErrorLogger = errorLogger;
}
export function errorR(exn) {
  ErrorLoggerExtensions["ErrorLogger.ErrorR"].bind(CompileThreadStatic.ErrorLogger)(exn);
}
export function warning(exn) {
  ErrorLoggerExtensions["ErrorLogger.Warning"].bind(CompileThreadStatic.ErrorLogger)(exn);
}
export function error(exn) {
  return ErrorLoggerExtensions["ErrorLogger.Error"].bind(CompileThreadStatic.ErrorLogger)(exn);
}
export function simulateError(p) {
  return ErrorLoggerExtensions["ErrorLogger.SimulateError"].bind(CompileThreadStatic.ErrorLogger)(p);
}
export function diagnosticSink(phasedError, isError) {
  CompileThreadStatic.ErrorLogger.DiagnosticSink(phasedError, isError);
}
export function errorSink(pe) {
  diagnosticSink(pe, true);
}
export function warnSink(pe) {
  diagnosticSink(pe, false);
}
export function errorRecovery(exn, m) {
  var objectArg;
  (objectArg = CompileThreadStatic.ErrorLogger, function (arg00, arg10) {
    ErrorLoggerExtensions["ErrorLogger.ErrorRecovery"].bind(objectArg)(arg00, arg10);
  })(exn, m);
}
export function stopProcessingRecovery(exn, m) {
  var objectArg;
  (objectArg = CompileThreadStatic.ErrorLogger, function (arg00, arg10) {
    ErrorLoggerExtensions["ErrorLogger.StopProcessingRecovery"].bind(objectArg)(arg00, arg10);
  })(exn, m);
}
export function errorRecoveryNoRange(exn) {
  ErrorLoggerExtensions["ErrorLogger.ErrorRecoveryNoRange"].bind(CompileThreadStatic.ErrorLogger)(exn);
}
export function report(f) {
  return f();
}
export function deprecatedWithError(s, m) {
  errorR(new Deprecated(s, m));
}
export let reportLibraryOnlyFeatures = createAtom(true);
export function libraryOnlyError(m) {
  if (reportLibraryOnlyFeatures()) {
    errorR(new LibraryUseOnly(m));
  }
}
export function libraryOnlyWarning(m) {
  if (reportLibraryOnlyFeatures()) {
    warning(new LibraryUseOnly(m));
  }
}
export function deprecatedOperator(m) {
  deprecatedWithError(SR.elDeprecatedOperator(), m);
}
export function mlCompatWarning(s, m) {
  warning(new UserCompilerMessage(SR.mlCompatMessage(s), 62, m));
}
export function suppressErrorReporting(f) {
  const errorLogger = CompileThreadStatic.ErrorLogger;

  try {
    const errorLogger_1 = new class extends ErrorLogger {
      constructor() {
        return super("suppressErrorReporting");
      }

      DiagnosticSink(_phasedError, _isError) {}

      get ErrorCount() {
        return 0;
      }

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.ErrorLogger.ErrorLogger"]
        };
      }

    }();
    SetThreadErrorLoggerNoUnwind(errorLogger_1);
    return f();
  } finally {
    SetThreadErrorLoggerNoUnwind(errorLogger);
  }
}
export function conditionallySuppressErrorReporting(cond, f) {
  if (cond) {
    return suppressErrorReporting(f);
  } else {
    return f();
  }
}
export class OperationResult {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.OperationResult",
      interfaces: ["FSharpUnion"],
      cases: [["OkResult", makeGeneric(List, {
        T: Error
      }), GenericParam("T")], ["ErrorResult", makeGeneric(List, {
        T: Error
      }), Error]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.OperationResult", OperationResult);
export function ReportWarnings(warns) {
  if (warns.tail == null) {} else {
    iterate(function (exn) {
      warning(exn);
    }, warns);
  }
}
export function CommitOperationResult(res) {
  if (res.tag === 1) {
    ReportWarnings(res.data[0]);
    return error(res.data[1]);
  } else {
    ReportWarnings(res.data[0]);
    return res.data[1];
  }
}
export function RaiseOperationResult(res) {
  CommitOperationResult(res);
}
export function ErrorD(err) {
  return new OperationResult(1, [new List(), err]);
}
export function WarnD(err) {
  return new OperationResult(0, [ofArray([err]), null]);
}
export const CompleteD = new OperationResult(0, [new List(), null]);
export function ResultD(x) {
  return new OperationResult(0, [new List(), x]);
}
export function CheckNoErrorsAndGetWarnings(res) {
  if (res.tag === 1) {
    return null;
  } else {
    return res.data[0];
  }
}
export function op_PlusPlus(res, f) {
  if (res.tag === 1) {
    return new OperationResult(1, [res.data[0], res.data[1]]);
  } else if (res.data[0].tail == null) {
    return f(res.data[1]);
  } else {
    const matchValue = f(res.data[1]);

    if (matchValue.tag === 1) {
      return new OperationResult(1, [append(res.data[0], matchValue.data[0]), matchValue.data[1]]);
    } else {
      return new OperationResult(0, [append(res.data[0], matchValue.data[0]), matchValue.data[1]]);
    }
  }
}
export function IterateD(f, xs) {
  if (xs.tail != null) {
    return op_PlusPlus(f(xs.head), function () {
      return IterateD(f, xs.tail);
    });
  } else {
    return CompleteD;
  }
}
export function WhileD(gd, body) {
  if (gd()) {
    return op_PlusPlus(body(), function () {
      return WhileD(gd, body);
    });
  } else {
    return CompleteD;
  }
}
export function MapD(f, xs) {
  const loop = function (acc, xs_1) {
    if (xs_1.tail != null) {
      return op_PlusPlus(f(xs_1.head), function (x) {
        return loop(new List(x, acc), xs_1.tail);
      });
    } else {
      return ResultD(reverse(acc));
    }
  };

  return loop(new List(), xs);
}
export class TrackErrorsBuilder {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.TrackErrorsBuilder",
      properties: {}
    };
  }

  constructor() {}

  Bind(res, k) {
    return op_PlusPlus(res, k);
  }

  Return(res) {
    return ResultD(res);
  }

  ReturnFrom(res) {
    return res;
  }

  For(seq, k) {
    return IterateD(k, seq);
  }

  While(gd, k) {
    return WhileD(gd, k);
  }

  Zero() {
    return CompleteD;
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.TrackErrorsBuilder", TrackErrorsBuilder);
export const trackErrors = new TrackErrorsBuilder();
export function OptionD(f, xs) {
  if (xs != null) {
    return f(getValue(xs));
  } else {
    return CompleteD;
  }
}
export function IterateIdxD(f, xs) {
  const loop = function (xs_1, i) {
    if (xs_1.tail != null) {
      return op_PlusPlus(f(i, xs_1.head), function () {
        return loop(xs_1.tail, i + 1);
      });
    } else {
      return CompleteD;
    }
  };

  return loop(xs, 0);
}
export function Iterate2D(f, xs, ys) {
  const matchValue = [xs, ys];
  const $var12 = matchValue[0].tail != null ? matchValue[1].tail != null ? [1, matchValue[0].head, matchValue[1].head, matchValue[0].tail, matchValue[1].tail] : [2] : matchValue[1].tail == null ? [0] : [2];

  switch ($var12[0]) {
    case 0:
      return CompleteD;

    case 1:
      return op_PlusPlus(f($var12[1], $var12[2]), function () {
        return Iterate2D(f, $var12[3], $var12[4]);
      });

    case 2:
      throw new Error("Iterate2D");
  }
}
export function TryD(f, g) {
  const matchValue = f();

  if (matchValue.tag === 1) {
    return op_PlusPlus(new OperationResult(0, [matchValue.data[0], null]), function () {
      return g(matchValue.data[1]);
    });
  } else {
    return matchValue;
  }
}
export function RepeatWhileD(ndeep, body) {
  return op_PlusPlus(body(ndeep), function (x) {
    return x ? RepeatWhileD(ndeep + 1, body) : CompleteD;
  });
}
export function AtLeastOneD(f, l) {
  return op_PlusPlus(MapD(f, l), function (res) {
    return ResultD(exists(function (x) {
      return x;
    }, res));
  });
}
export const stringThatIsAProxyForANewlineInFlatErrors = [String.fromCharCode(29)].join("");
export function NewlineifyErrorString(message) {
  return replace(message, stringThatIsAProxyForANewlineInFlatErrors, "\n");
}
export function NormalizeErrorString(text) {
  if (text == null) {
    Microsoft.FSharp.Core.Operators.nullArg("text");
  }

  const text_1 = trim(text, "both");
  const buf = new System.Text.StringBuilder();
  let i = 0;

  while (i < text_1.length) {
    let delta;
    const matchValue = text_1[i];
    const $var13 = matchValue === "\r" ? (i + 1 < text_1.length ? text_1[i + 1] === "\n" : false) ? [0] : [1] : [1];

    switch ($var13[0]) {
      case 0:
        buf.Append(stringThatIsAProxyForANewlineInFlatErrors);
        delta = 2;
        break;

      case 1:
        const $var14 = matchValue === "\n" ? [0] : matchValue === "\r" ? [0] : [1];

        switch ($var14[0]) {
          case 0:
            buf.Append(stringThatIsAProxyForANewlineInFlatErrors);
            delta = 1;
            break;

          case 1:
            const c = System.Char.IsControl(matchValue) ? " " : matchValue;
            buf.Append(c);
            delta = 1;
            break;
        }

        break;
    }

    i = i + delta | 0;
  }

  return toString(buf);
}
export class FSharpErrorSeverityOptions {
  constructor(warnLevel, globalWarnAsError, warnOff, warnOn, warnAsError, warnAsWarn) {
    this.WarnLevel = warnLevel | 0;
    this.GlobalWarnAsError = globalWarnAsError;
    this.WarnOff = warnOff;
    this.WarnOn = warnOn;
    this.WarnAsError = warnAsError;
    this.WarnAsWarn = warnAsWarn;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.ErrorLogger.FSharpErrorSeverityOptions",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        WarnLevel: "number",
        GlobalWarnAsError: "boolean",
        WarnOff: makeGeneric(List, {
          T: "number"
        }),
        WarnOn: makeGeneric(List, {
          T: "number"
        }),
        WarnAsError: makeGeneric(List, {
          T: "number"
        }),
        WarnAsWarn: makeGeneric(List, {
          T: "number"
        })
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static get Default() {
    return new FSharpErrorSeverityOptions(3, false, new List(), new List(), new List(), new List());
  }

}
setType("Microsoft.FSharp.Compiler.ErrorLogger.FSharpErrorSeverityOptions", FSharpErrorSeverityOptions);