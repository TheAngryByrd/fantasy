import { choose, mapIndexed, reverse, filter, map, append, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { range0, rangeStartup, trimRangeToLine, pos0, mkRange, posGeq, stringOfRange, rangeCmdArgs, range } from "./range";
import { compare as compare_1, Tuple, Unit, Function as _Function, hasInterface, extendInfo, Any, Interface, Option, comparePrimitives, toString, equals, makeGeneric, equalsRecords } from "../fable-core/Util";
import { ConstraintSolverRelatedInformation, ConstraintSolverTypesNotInSubsumptionRelation, ConstraintSolverError, ConstraintSolverTypesNotInEqualityRelation, ConstraintSolverMissingConstraint, ConstraintSolverInfiniteTypes, ConstraintSolverTupleDiffLengths, NonRigidTypar, PossibleOverload, UnresolvedConversionOperator, UnresolvedOverloading, ErrorsFromAddingSubsumptionConstraint, ErrorFromApplyingDefault, ErrorFromAddingTypeEquation, ErrorFromAddingConstraint } from "./ConstraintSolver";
import { IndentationProblem, ReservedKeyword } from "./lexhelp";
import { CombineTopAttrs, EmptyTopAttrs, TypeCheckOneSigFile, TcOpenDecl, AddLocalRootModuleOrNamespace, TypeCheckOneImplFile, TcEnv, InvalidInternalsVisibleToAssemblyName, NotAFunctionButIndexer, NotAFunction, SelfRefObjCtor, NonVirtualAugmentationOnNullValuedType, VirtualAugmentationOnNullValuedType, VarBoundTwice, TyconBadArgs, FieldsFromDifferentTypes, LetRecUnsound, ValueRestriction, IntfImplInExtrinsicAugmentation, OverrideInExtrinsicAugmentation, IntfImplInIntrinsicAugmentation, OverrideInIntrinsicAugmentation, MissingFields, ValNotLocal, ValNotMutable, LetRecEvaluatedOutOfOrder, RecursiveUseCheckedAtRuntime, NotUpperCaseConstructor, LetRecCheckedAtRuntime, NonUniqueInferredAbstractSlot, DeprecatedThreadStaticBindingWarning, UseOfAddressOfOperator, UnitTypeExpectedWithPossibleAssignment, UnitTypeExpectedWithPossiblePropertySetter, UnitTypeExpectedWithEquality, UnitTypeExpected, FunctionValueUnexpected, UnionCaseWrongArguments, UnionPatternsBindDifferentNames, RuntimeCoercionSourceSealed, TypeTestUnnecessary, UpcastUnnecessary, CoercionTargetSealed, StaticCoercionShouldUseBox, IndeterminateStaticCoercion, IndeterminateRuntimeCoercion, InvalidRuntimeCoercion, Recursion, FieldNotMutable, ParameterlessStructCtor, StandardOperatorRedefinitionWarning, BakedInMemberConstraintName, FunctionExpected } from "./TypeChecker";
import { BadEventTransformation } from "./infos";
import { IgnoringPartOfQuotedTermWarning } from "./QuotationTranslator";
import { DispatchSlotChecking, TypeIsImplicitlyAbstract, OverrideDoesntOverride } from "./MethodOverrides";
import { ExnconstrNotContained, ConstrNotContained, ValueNotContained, FieldNotContained, InterfaceNotRevealed, RequiredButNotSpecified } from "./SignatureConformance";
import { SigTypeOfImplFile, typeEquivAux, Erasure, isFunTy, DisplayEnv, fullDisplayTextOfModRef, isUnitTy, isTyparTy, PrettyTypes, fullDisplayTextOfTyconRef, typeEquiv, DefensiveCopyWarning } from "./TastOps";
import { TcResultsSink, IndeterminateType, UpperCaseIdentifierInPattern } from "./NameResolution";
import { errorRecovery, FSharpErrorSeverityOptions, ErrorLoggerExtensions, mlCompatWarning, BuildPhase, PushThreadBuildPhaseUntilUnwind, PushErrorLoggerPhaseUntilUnwind, CapturingErrorLogger, error as error_1, errorR, ErrorLogger, warning, NormalizeErrorString, PhasedDiagnostic, UnresolvedPathReferenceNoRange, UnresolvedReferenceNoRange, UnresolvedPathReference, UnresolvedReferenceError, LibraryUseOnly, Deprecated, UserCompilerMessage, PossibleUnverifiableCode, Experimental, WrappedError, InternalError, NumberedError, ErrorWithSuggestions, Error as _Error } from "./ErrorLogger";
import { NiceNameGenerator, Ident, rangeOfLid, PreXmlDoc, pathToSynLid, textOfPath, ParsedImplFileInput, ParsedSigFileInput, ParsedInput, SynModuleOrNamespaceSig, SynModuleOrNamespace, pathOfLid, textOfLid, mkSynId, QualifiedNameOfFile, ScopedPragma, SyntaxError } from "./ast";
import { CombineCcuContentFragments, CcuData, newStamp, ModuleOrNamespaceKind, NewEmptyModuleOrNamespaceType, NewCcuContents, ModuleOrNamespaceType, Entity, CcuResolutionResult, FSharpOptimizationDataResourceName2, FSharpOptimizationDataResourceName, FSharpSignatureDataResourceName2, FSharpSignatureDataResourceName, CcuThunk, arityOfVal, InternalUndefinedItemRef, NameClash, Duplicate, UndefinedName, FullAbstraction } from "./tast";
import { RuleNeverMatched, EnumMatchIncomplete, MatchIncomplete } from "./PatternMatchCompilation";
import { ObsoleteWarning, ObsoleteError } from "./AttributeChecking";
import { checkSuffix, chopExtension, fileNameOfPath, fileNameWithoutExtensionWithValidate, IllegalFileNameChar } from "../utils/filename";
import { System, Microsoft } from "../fcs-fable/adapters";
import { SR } from "../codegen/FSComp";
import { mapFold, foldBack, append as append_1, tryPick, forAll, empty, singleton, collect, delay, toList, iterate, exists } from "../fable-core/Seq";
import CurriedLambda from "../fable-core/CurriedLambda";
import { stringOfQualifiedValOrMember, stringOfRecdField, stringOfExnDef, stringOfUnionCase, minimalStringsOfTwoValues, stringOfTy, minimalStringOfType, stringOfTyparConstraint, minimalStringsOfTwoTypes } from "./NicePrint";
import { compare, startsWith, join, replace, toText, endsWith, printf } from "../fable-core/String";
import { makeSome, getValue, defaultArg } from "../fable-core/Option";
import { DecompileOpName } from "./PrettyNaming";
import { FormatPredictions, FilterPredictions } from "./ErrorResolutionHints";
import { signatureFile, implementationFile, prodIdxToNonTerminal, nonTerminalId, tagOfToken, tokenTagToTokenId } from "../codegen/pars";
import { add, create } from "../fable-core/Set";
import { fromEqualityComparer } from "../fable-core/Comparer";
import Comparer from "../fable-core/Comparer";
import { RecoverableParseError } from "../utils/prim-parsing";
import { List as List_1, eventually, RequireCompilationThread, EventuallyModule, Order, Map$60$2$2E$get_Values as Map_2_get_Values, String as _String, Shim } from "../absil/illib";
import { parse } from "../fable-core/Int32";
import { tryFind, tryGetValue, create as create_1 } from "../fable-core/Map";
import { PrimaryAssembly, splitNamespace, ILScopeRef, ILAssemblyRef } from "../absil/il";
import { OptimizationSettings } from "./Optimizer";
import { ImportMap } from "./import";
import { Set as _Set, Map as _Map } from "../utils/TaggedCollections";
import { ZmapModule } from "../absil/zmap";
import { ZsetModule } from "../absil/zset";
export const FSharpSigFileSuffixes = ofArray([".mli", ".fsi"]);
export const mlCompatSuffixes = ofArray([".mli", ".ml"]);
export const FSharpImplFileSuffixes = ofArray([".ml", ".fs", ".fsscript", ".fsx"]);
export const resSuffixes = ofArray([".resx"]);
export const FSharpScriptFileSuffixes = ofArray([".fsscript", ".fsx"]);
export const doNotRequireNamespaceOrModuleSuffixes = append(ofArray([".mli", ".ml"]), FSharpScriptFileSuffixes);
export const FSharpLightSyntaxFileSuffixes = ofArray([".fs", ".fsscript", ".fsx", ".fsi"]);
export class HashIncludeNotAllowedInNonScript extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, HashIncludeNotAllowedInNonScript.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.HashIncludeNotAllowedInNonScript",
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
setType("Microsoft.FSharp.Compiler.CompileOps.HashIncludeNotAllowedInNonScript", HashIncludeNotAllowedInNonScript);
export class HashReferenceNotAllowedInNonScript extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, HashReferenceNotAllowedInNonScript.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.HashReferenceNotAllowedInNonScript",
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
setType("Microsoft.FSharp.Compiler.CompileOps.HashReferenceNotAllowedInNonScript", HashReferenceNotAllowedInNonScript);
export class HashDirectiveNotAllowedInNonScript extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, HashDirectiveNotAllowedInNonScript.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.HashDirectiveNotAllowedInNonScript",
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
setType("Microsoft.FSharp.Compiler.CompileOps.HashDirectiveNotAllowedInNonScript", HashDirectiveNotAllowedInNonScript);
export class FileNameNotResolved extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, FileNameNotResolved.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.FileNameNotResolved",
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
setType("Microsoft.FSharp.Compiler.CompileOps.FileNameNotResolved", FileNameNotResolved);
export class AssemblyNotResolved extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, AssemblyNotResolved.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.AssemblyNotResolved",
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
setType("Microsoft.FSharp.Compiler.CompileOps.AssemblyNotResolved", AssemblyNotResolved);
export class LoadedSourceNotFoundIgnoring extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, LoadedSourceNotFoundIgnoring.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.LoadedSourceNotFoundIgnoring",
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
setType("Microsoft.FSharp.Compiler.CompileOps.LoadedSourceNotFoundIgnoring", LoadedSourceNotFoundIgnoring);
export class MSBuildReferenceResolutionWarning extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, MSBuildReferenceResolutionWarning.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.MSBuildReferenceResolutionWarning",
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
setType("Microsoft.FSharp.Compiler.CompileOps.MSBuildReferenceResolutionWarning", MSBuildReferenceResolutionWarning);
export class MSBuildReferenceResolutionError extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, MSBuildReferenceResolutionError.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.MSBuildReferenceResolutionError",
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
setType("Microsoft.FSharp.Compiler.CompileOps.MSBuildReferenceResolutionError", MSBuildReferenceResolutionError);
export class DeprecatedCommandLineOptionFull extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, DeprecatedCommandLineOptionFull.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.DeprecatedCommandLineOptionFull",
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
setType("Microsoft.FSharp.Compiler.CompileOps.DeprecatedCommandLineOptionFull", DeprecatedCommandLineOptionFull);
export class DeprecatedCommandLineOptionForHtmlDoc extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, DeprecatedCommandLineOptionForHtmlDoc.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.DeprecatedCommandLineOptionForHtmlDoc",
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
setType("Microsoft.FSharp.Compiler.CompileOps.DeprecatedCommandLineOptionForHtmlDoc", DeprecatedCommandLineOptionForHtmlDoc);
export class DeprecatedCommandLineOptionSuggestAlternative extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, DeprecatedCommandLineOptionSuggestAlternative.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.DeprecatedCommandLineOptionSuggestAlternative",
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
setType("Microsoft.FSharp.Compiler.CompileOps.DeprecatedCommandLineOptionSuggestAlternative", DeprecatedCommandLineOptionSuggestAlternative);
export class DeprecatedCommandLineOptionNoDescription extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, DeprecatedCommandLineOptionNoDescription.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.DeprecatedCommandLineOptionNoDescription",
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
setType("Microsoft.FSharp.Compiler.CompileOps.DeprecatedCommandLineOptionNoDescription", DeprecatedCommandLineOptionNoDescription);
export class InternalCommandLineOption extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, InternalCommandLineOption.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.InternalCommandLineOption",
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
setType("Microsoft.FSharp.Compiler.CompileOps.InternalCommandLineOption", InternalCommandLineOption);
export class HashLoadedSourceHasIssues extends Error {
  constructor(data0, data1, data2) {
    super();
    Object.setPrototypeOf(this, HashLoadedSourceHasIssues.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
    this.Data2 = data2;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.HashLoadedSourceHasIssues",
      interfaces: ["FSharpException"],
      properties: {
        Data0: makeGeneric(List, {
          T: Error
        }),
        Data1: makeGeneric(List, {
          T: Error
        }),
        Data2: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.HashLoadedSourceHasIssues", HashLoadedSourceHasIssues);
export class HashLoadedScriptConsideredSource extends Error {
  constructor(data0) {
    super();
    Object.setPrototypeOf(this, HashLoadedScriptConsideredSource.prototype);
    this.Data0 = data0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.HashLoadedScriptConsideredSource",
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
setType("Microsoft.FSharp.Compiler.CompileOps.HashLoadedScriptConsideredSource", HashLoadedScriptConsideredSource);
export function GetRangeOfDiagnostic(err) {
  const RangeFromException = function (_arg1) {
    RangeFromException: while (true) {
      const $var1 = _arg1 instanceof ErrorFromAddingConstraint ? [0, _arg1.Data1] : _arg1 instanceof ReservedKeyword ? [1, _arg1.Data1] : _arg1 instanceof IndentationProblem ? [1, _arg1.Data1] : _arg1 instanceof ErrorFromAddingTypeEquation ? [1, _arg1.Data5] : _arg1 instanceof ErrorFromApplyingDefault ? [1, _arg1.Data5] : _arg1 instanceof ErrorsFromAddingSubsumptionConstraint ? [1, _arg1.Data6] : _arg1 instanceof FunctionExpected ? [1, _arg1.Data2] : _arg1 instanceof BakedInMemberConstraintName ? [1, _arg1.Data1] : _arg1 instanceof StandardOperatorRedefinitionWarning ? [1, _arg1.Data1] : _arg1 instanceof BadEventTransformation ? [1, _arg1.Data0] : _arg1 instanceof ParameterlessStructCtor ? [1, _arg1.Data0] : _arg1 instanceof FieldNotMutable ? [1, _arg1.Data2] : _arg1 instanceof Recursion ? [1, _arg1.Data4] : _arg1 instanceof InvalidRuntimeCoercion ? [1, _arg1.Data3] : _arg1 instanceof IndeterminateRuntimeCoercion ? [1, _arg1.Data3] : _arg1 instanceof IndeterminateStaticCoercion ? [1, _arg1.Data3] : _arg1 instanceof StaticCoercionShouldUseBox ? [1, _arg1.Data3] : _arg1 instanceof CoercionTargetSealed ? [1, _arg1.Data2] : _arg1 instanceof UpcastUnnecessary ? [1, _arg1.Data0] : _arg1 instanceof IgnoringPartOfQuotedTermWarning ? [1, _arg1.Data1] : _arg1 instanceof TypeTestUnnecessary ? [1, _arg1.Data0] : _arg1 instanceof RuntimeCoercionSourceSealed ? [1, _arg1.Data2] : _arg1 instanceof OverrideDoesntOverride ? [1, _arg1.Data5] : _arg1 instanceof UnionPatternsBindDifferentNames ? [1, _arg1.Data0] : _arg1 instanceof UnionCaseWrongArguments ? [1, _arg1.Data3] : _arg1 instanceof TypeIsImplicitlyAbstract ? [1, _arg1.Data0] : _arg1 instanceof RequiredButNotSpecified ? [1, _arg1.Data4] : _arg1 instanceof FunctionValueUnexpected ? [1, _arg1.Data2] : _arg1 instanceof UnitTypeExpected ? [1, _arg1.Data2] : _arg1 instanceof UnitTypeExpectedWithEquality ? [1, _arg1.Data2] : _arg1 instanceof UnitTypeExpectedWithPossiblePropertySetter ? [1, _arg1.Data4] : _arg1 instanceof UnitTypeExpectedWithPossibleAssignment ? [1, _arg1.Data4] : _arg1 instanceof UseOfAddressOfOperator ? [1, _arg1.Data0] : _arg1 instanceof DeprecatedThreadStaticBindingWarning ? [1, _arg1.Data0] : _arg1 instanceof NonUniqueInferredAbstractSlot ? [1, _arg1.Data5] : _arg1 instanceof DefensiveCopyWarning ? [1, _arg1.Data1] : _arg1 instanceof LetRecCheckedAtRuntime ? [1, _arg1.Data0] : _arg1 instanceof UpperCaseIdentifierInPattern ? [1, _arg1.Data0] : _arg1 instanceof NotUpperCaseConstructor ? [1, _arg1.Data0] : _arg1 instanceof RecursiveUseCheckedAtRuntime ? [1, _arg1.Data2] : _arg1 instanceof LetRecEvaluatedOutOfOrder ? [1, _arg1.Data3] : _arg1 instanceof _Error ? [1, _arg1.Data1] : _arg1 instanceof ErrorWithSuggestions ? [1, _arg1.Data1] : _arg1 instanceof NumberedError ? [1, _arg1.Data1] : _arg1 instanceof SyntaxError ? [1, _arg1.range] : _arg1 instanceof InternalError ? [1, _arg1.Data1] : _arg1 instanceof FullAbstraction ? [1, _arg1.Data1] : _arg1 instanceof InterfaceNotRevealed ? [1, _arg1.Data2] : _arg1 instanceof WrappedError ? [1, _arg1.Data1] : _arg1 instanceof MatchIncomplete ? [1, _arg1.Data2] : _arg1 instanceof EnumMatchIncomplete ? [1, _arg1.Data2] : _arg1 instanceof RuleNeverMatched ? [1, _arg1.Data0] : _arg1 instanceof ValNotMutable ? [1, _arg1.Data2] : _arg1 instanceof ValNotLocal ? [1, _arg1.Data2] : _arg1 instanceof MissingFields ? [1, _arg1.Data1] : _arg1 instanceof OverrideInIntrinsicAugmentation ? [1, _arg1.Data0] : _arg1 instanceof IntfImplInIntrinsicAugmentation ? [1, _arg1.Data0] : _arg1 instanceof OverrideInExtrinsicAugmentation ? [1, _arg1.Data0] : _arg1 instanceof IntfImplInExtrinsicAugmentation ? [1, _arg1.Data0] : _arg1 instanceof ValueRestriction ? [1, _arg1.Data4] : _arg1 instanceof LetRecUnsound ? [1, _arg1.Data2] : _arg1 instanceof ObsoleteError ? [1, _arg1.Data1] : _arg1 instanceof ObsoleteWarning ? [1, _arg1.Data1] : _arg1 instanceof Experimental ? [1, _arg1.Data1] : _arg1 instanceof PossibleUnverifiableCode ? [1, _arg1.Data0] : _arg1 instanceof UserCompilerMessage ? [1, _arg1.Data2] : _arg1 instanceof Deprecated ? [1, _arg1.Data1] : _arg1 instanceof LibraryUseOnly ? [1, _arg1.Data0] : _arg1 instanceof FieldsFromDifferentTypes ? [1, _arg1.Data3] : _arg1 instanceof IndeterminateType ? [1, _arg1.Data0] : _arg1 instanceof TyconBadArgs ? [1, _arg1.Data3] : _arg1 instanceof FieldNotContained ? [2, _arg1.Data1] : _arg1 instanceof ValueNotContained ? [3, _arg1.Data2] : _arg1 instanceof ConstrNotContained ? [4, _arg1.Data1] : _arg1 instanceof ExnconstrNotContained ? [5, _arg1.Data1] : _arg1 instanceof VarBoundTwice ? [6, _arg1.Data0] : _arg1 instanceof UndefinedName ? [6, _arg1.Data2] : _arg1 instanceof Duplicate ? [7, _arg1.Data2] : _arg1 instanceof NameClash ? [7, _arg1.Data3] : _arg1 instanceof UnresolvedOverloading ? [7, _arg1.Data3] : _arg1 instanceof UnresolvedConversionOperator ? [7, _arg1.Data3] : _arg1 instanceof PossibleOverload ? [7, _arg1.Data3] : _arg1 instanceof VirtualAugmentationOnNullValuedType ? [7, _arg1.Data0] : _arg1 instanceof NonVirtualAugmentationOnNullValuedType ? [7, _arg1.Data0] : _arg1 instanceof NonRigidTypar ? [7, _arg1.Data5] : _arg1 instanceof ConstraintSolverTupleDiffLengths ? [7, _arg1.Data3] : _arg1 instanceof ConstraintSolverInfiniteTypes ? [7, _arg1.Data4] : _arg1 instanceof ConstraintSolverMissingConstraint ? [7, _arg1.Data3] : _arg1 instanceof ConstraintSolverTypesNotInEqualityRelation ? [7, _arg1.Data3] : _arg1 instanceof ConstraintSolverError ? [7, _arg1.Data1] : _arg1 instanceof ConstraintSolverTypesNotInSubsumptionRelation ? [7, _arg1.Data3] : _arg1 instanceof ConstraintSolverRelatedInformation ? [7, _arg1.Data1] : _arg1 instanceof SelfRefObjCtor ? [7, _arg1.Data1] : _arg1 instanceof NotAFunction ? [8, _arg1.Data2] : _arg1 instanceof NotAFunctionButIndexer ? [9, _arg1.Data3] : _arg1 instanceof IllegalFileNameChar ? [10] : _arg1 instanceof UnresolvedReferenceError ? [11, _arg1.Data1] : _arg1 instanceof UnresolvedPathReference ? [11, _arg1.Data2] : _arg1 instanceof DeprecatedCommandLineOptionFull ? [11, _arg1.Data1] : _arg1 instanceof DeprecatedCommandLineOptionForHtmlDoc ? [11, _arg1.Data1] : _arg1 instanceof DeprecatedCommandLineOptionSuggestAlternative ? [11, _arg1.Data2] : _arg1 instanceof DeprecatedCommandLineOptionNoDescription ? [11, _arg1.Data1] : _arg1 instanceof InternalCommandLineOption ? [11, _arg1.Data1] : _arg1 instanceof HashIncludeNotAllowedInNonScript ? [11, _arg1.Data0] : _arg1 instanceof HashReferenceNotAllowedInNonScript ? [11, _arg1.Data0] : _arg1 instanceof HashDirectiveNotAllowedInNonScript ? [11, _arg1.Data0] : _arg1 instanceof FileNameNotResolved ? [11, _arg1.Data2] : _arg1 instanceof LoadedSourceNotFoundIgnoring ? [11, _arg1.Data1] : _arg1 instanceof MSBuildReferenceResolutionWarning ? [11, _arg1.Data2] : _arg1 instanceof MSBuildReferenceResolutionError ? [11, _arg1.Data2] : _arg1 instanceof AssemblyNotResolved ? [11, _arg1.Data1] : _arg1 instanceof HashLoadedSourceHasIssues ? [11, _arg1.Data2] : _arg1 instanceof HashLoadedScriptConsideredSource ? [11, _arg1.Data0] : [12];

      switch ($var1[0]) {
        case 0:
          _arg1 = $var1[1];
          continue RangeFromException;

        case 1:
          return $var1[1];

        case 2:
          return $var1[1].Range;

        case 3:
          return $var1[1].Range;

        case 4:
          return $var1[1].Id.idRange;

        case 5:
          return $var1[1].Range;

        case 6:
          return $var1[1].idRange;

        case 7:
          return $var1[1];

        case 8:
          return $var1[1];

        case 9:
          return $var1[1];

        case 10:
          return rangeCmdArgs;

        case 11:
          return $var1[1];

        case 12:
          return null;
      }
    }
  };

  return RangeFromException(err.Exception);
}
export function GetDiagnosticNumber(err) {
  const GetFromException = function (e) {
    GetFromException: while (true) {
      let $var2;

      if (e instanceof ErrorFromAddingTypeEquation) {
        $var2 = [0];
      } else if (e instanceof FunctionExpected) {
        $var2 = [1];
      } else if (e instanceof NotAFunctionButIndexer) {
        $var2 = [2];
      } else if (e instanceof NotAFunction) {
        $var2 = [3];
      } else if (e instanceof FieldNotMutable) {
        $var2 = [4];
      } else if (e instanceof Recursion) {
        $var2 = [5];
      } else if (e instanceof InvalidRuntimeCoercion) {
        $var2 = [6];
      } else if (e instanceof IndeterminateRuntimeCoercion) {
        $var2 = [7];
      } else if (e instanceof PossibleUnverifiableCode) {
        $var2 = [8];
      } else if (e instanceof SyntaxError) {
        $var2 = [9];
      } else if (e instanceof IndeterminateStaticCoercion) {
        $var2 = [10];
      } else if (e instanceof StaticCoercionShouldUseBox) {
        $var2 = [11];
      } else if (e instanceof RuntimeCoercionSourceSealed) {
        $var2 = [12];
      } else if (e instanceof OverrideDoesntOverride) {
        $var2 = [13];
      } else if (e instanceof UnionPatternsBindDifferentNames) {
        $var2 = [14];
      } else if (e instanceof UnionCaseWrongArguments) {
        $var2 = [15];
      } else if (e instanceof UnitTypeExpected) {
        $var2 = [16];
      } else if (e instanceof UnitTypeExpectedWithEquality) {
        $var2 = [17];
      } else if (e instanceof UnitTypeExpectedWithPossiblePropertySetter) {
        $var2 = [18];
      } else if (e instanceof UnitTypeExpectedWithPossibleAssignment) {
        $var2 = [19];
      } else if (e instanceof RecursiveUseCheckedAtRuntime) {
        $var2 = [20];
      } else if (e instanceof LetRecEvaluatedOutOfOrder) {
        $var2 = [21];
      } else if (e instanceof NameClash) {
        $var2 = [22];
      } else if (e instanceof MatchIncomplete) {
        $var2 = [23];
      } else if (e instanceof RuleNeverMatched) {
        $var2 = [24];
      } else if (e instanceof ValNotMutable) {
        $var2 = [25];
      } else if (e instanceof ValNotLocal) {
        $var2 = [26];
      } else if (e instanceof MissingFields) {
        $var2 = [27];
      } else if (e instanceof ValueRestriction) {
        $var2 = [28];
      } else if (e instanceof LetRecUnsound) {
        $var2 = [29];
      } else if (e instanceof FieldsFromDifferentTypes) {
        $var2 = [30];
      } else if (e instanceof TyconBadArgs) {
        $var2 = [31];
      } else if (e instanceof ValueNotContained) {
        $var2 = [32];
      } else if (e instanceof Deprecated) {
        $var2 = [33];
      } else if (e instanceof ConstrNotContained) {
        $var2 = [34];
      } else if (e instanceof Duplicate) {
        $var2 = [35];
      } else if (e instanceof VarBoundTwice) {
        $var2 = [36];
      } else if (e instanceof UndefinedName) {
        $var2 = [37];
      } else if (e instanceof LetRecCheckedAtRuntime) {
        $var2 = [38];
      } else if (e instanceof UnresolvedOverloading) {
        $var2 = [39];
      } else if (e instanceof LibraryUseOnly) {
        $var2 = [40];
      } else if (e instanceof ErrorFromAddingConstraint) {
        $var2 = [41];
      } else if (e instanceof ObsoleteWarning) {
        $var2 = [42];
      } else if (e instanceof FullAbstraction) {
        $var2 = [43];
      } else if (e instanceof ReservedKeyword) {
        $var2 = [44];
      } else if (e instanceof SelfRefObjCtor) {
        $var2 = [45];
      } else if (e instanceof VirtualAugmentationOnNullValuedType) {
        $var2 = [46];
      } else if (e instanceof UpperCaseIdentifierInPattern) {
        $var2 = [47];
      } else if (e instanceof InterfaceNotRevealed) {
        $var2 = [48];
      } else if (e instanceof UseOfAddressOfOperator) {
        $var2 = [49];
      } else if (e instanceof DefensiveCopyWarning) {
        $var2 = [50];
      } else if (e instanceof NotUpperCaseConstructor) {
        $var2 = [51];
      } else if (e instanceof TypeIsImplicitlyAbstract) {
        $var2 = [52];
      } else if (e instanceof DeprecatedThreadStaticBindingWarning) {
        $var2 = [53];
      } else if (e instanceof Experimental) {
        $var2 = [54];
      } else if (e instanceof IndentationProblem) {
        $var2 = [55];
      } else if (e instanceof CoercionTargetSealed) {
        $var2 = [56];
      } else if (e instanceof OverrideInIntrinsicAugmentation) {
        $var2 = [57];
      } else if (e instanceof NonVirtualAugmentationOnNullValuedType) {
        $var2 = [58];
      } else if (e instanceof UserCompilerMessage) {
        $var2 = [59, e.Data1];
      } else if (e instanceof ExnconstrNotContained) {
        $var2 = [60];
      } else if (e instanceof NonRigidTypar) {
        $var2 = [61];
      } else if (e instanceof UpcastUnnecessary) {
        $var2 = [62];
      } else if (e instanceof TypeTestUnnecessary) {
        $var2 = [63];
      } else if (e instanceof IgnoringPartOfQuotedTermWarning) {
        $var2 = [64];
      } else if (e instanceof IntfImplInIntrinsicAugmentation) {
        $var2 = [65];
      } else if (e instanceof NonUniqueInferredAbstractSlot) {
        $var2 = [66];
      } else if (e instanceof ErrorFromApplyingDefault) {
        $var2 = [67];
      } else if (e instanceof IndeterminateType) {
        $var2 = [68];
      } else if (e instanceof InternalError) {
        $var2 = [69];
      } else if (e instanceof UnresolvedReferenceNoRange) {
        $var2 = [70];
      } else if (e instanceof UnresolvedReferenceError) {
        $var2 = [70];
      } else if (e instanceof UnresolvedPathReferenceNoRange) {
        $var2 = [70];
      } else if (e instanceof UnresolvedPathReference) {
        $var2 = [70];
      } else if (e instanceof DeprecatedCommandLineOptionFull) {
        $var2 = [71];
      } else if (e instanceof DeprecatedCommandLineOptionForHtmlDoc) {
        $var2 = [71];
      } else if (e instanceof DeprecatedCommandLineOptionSuggestAlternative) {
        $var2 = [71];
      } else if (e instanceof DeprecatedCommandLineOptionNoDescription) {
        $var2 = [71];
      } else if (e instanceof InternalCommandLineOption) {
        $var2 = [71];
      } else if (e instanceof HashIncludeNotAllowedInNonScript) {
        $var2 = [72];
      } else if (e instanceof HashReferenceNotAllowedInNonScript) {
        $var2 = [72];
      } else if (e instanceof HashDirectiveNotAllowedInNonScript) {
        $var2 = [72];
      } else if (e instanceof BakedInMemberConstraintName) {
        $var2 = [73];
      } else if (e instanceof FileNameNotResolved) {
        $var2 = [74];
      } else if (e instanceof LoadedSourceNotFoundIgnoring) {
        $var2 = [75];
      } else if (e instanceof ParameterlessStructCtor) {
        $var2 = [76];
      } else if (e instanceof MSBuildReferenceResolutionWarning) {
        $var2 = [77];
      } else if (e instanceof MSBuildReferenceResolutionError) {
        $var2 = [78];
      } else if (e instanceof AssemblyNotResolved) {
        $var2 = [79];
      } else if (e instanceof HashLoadedSourceHasIssues) {
        $var2 = [80];
      } else if (e instanceof StandardOperatorRedefinitionWarning) {
        $var2 = [81];
      } else if (e instanceof InvalidInternalsVisibleToAssemblyName) {
        $var2 = [82];
      } else if (e instanceof OverrideInExtrinsicAugmentation) {
        $var2 = [83];
      } else if (e instanceof IntfImplInExtrinsicAugmentation) {
        $var2 = [84];
      } else if (e instanceof BadEventTransformation) {
        $var2 = [85];
      } else if (e instanceof HashLoadedScriptConsideredSource) {
        $var2 = [86];
      } else if (e instanceof UnresolvedConversionOperator) {
        $var2 = [87];
      } else if (e instanceof ObsoleteError) {
        $var2 = [88];
      } else if (e instanceof EnumMatchIncomplete) {
        $var2 = [89];
      } else if (e instanceof WrappedError) {
        $var2 = [90, e.Data0];
      } else if (e instanceof _Error) {
        $var2 = [91, e.Data0[0]];
      } else if (e instanceof ErrorWithSuggestions) {
        $var2 = [92, e.Data0[0]];
      } else {
        const activePatternResult48167 = Microsoft.FSharp.Core.Operators["|Failure|_|"](e);

        if (activePatternResult48167 != null) {
          $var2 = [93];
        } else {
          $var2 = [94];
        }
      }

      switch ($var2[0]) {
        case 0:
          return 1;

        case 1:
          return 2;

        case 2:
          return 3217;

        case 3:
          return 3;

        case 4:
          return 5;

        case 5:
          return 6;

        case 6:
          return 7;

        case 7:
          return 8;

        case 8:
          return 9;

        case 9:
          return 10;

        case 10:
          return 13;

        case 11:
          return 14;

        case 12:
          return 16;

        case 13:
          return 17;

        case 14:
          return 18;

        case 15:
          return 19;

        case 16:
          return 20;

        case 17:
          return 20;

        case 18:
          return 20;

        case 19:
          return 20;

        case 20:
          return 21;

        case 21:
          return 22;

        case 22:
          return 23;

        case 23:
          return 25;

        case 24:
          return 26;

        case 25:
          return 27;

        case 26:
          return 28;

        case 27:
          return 29;

        case 28:
          return 30;

        case 29:
          return 31;

        case 30:
          return 32;

        case 31:
          return 33;

        case 32:
          return 34;

        case 33:
          return 35;

        case 34:
          return 36;

        case 35:
          return 37;

        case 36:
          return 38;

        case 37:
          return 39;

        case 38:
          return 40;

        case 39:
          return 41;

        case 40:
          return 42;

        case 41:
          return 43;

        case 42:
          return 44;

        case 43:
          return 45;

        case 44:
          return 46;

        case 45:
          return 47;

        case 46:
          return 48;

        case 47:
          return 49;

        case 48:
          return 50;

        case 49:
          return 51;

        case 50:
          return 52;

        case 51:
          return 53;

        case 52:
          return 54;

        case 53:
          return 56;

        case 54:
          return 57;

        case 55:
          return 58;

        case 56:
          return 59;

        case 57:
          return 60;

        case 58:
          return 61;

        case 59:
          return $var2[1] | 0;

        case 60:
          return 63;

        case 61:
          return 64;

        case 62:
          return 66;

        case 63:
          return 67;

        case 64:
          return 68;

        case 65:
          return 69;

        case 66:
          return 70;

        case 67:
          return 71;

        case 68:
          return 72;

        case 69:
          return 73;

        case 70:
          return 74;

        case 71:
          return 75;

        case 72:
          return 76;

        case 73:
          return 77;

        case 74:
          return 78;

        case 75:
          return 79;

        case 76:
          return 81;

        case 77:
          return 82;

        case 78:
          return 83;

        case 79:
          return 84;

        case 80:
          return 85;

        case 81:
          return 86;

        case 82:
          return 87;

        case 83:
          return 89;

        case 84:
          return 90;

        case 85:
          return 91;

        case 86:
          return 92;

        case 87:
          return 93;

        case 88:
          return 101;

        case 89:
          return 104;

        case 90:
          e = $var2[1];
          continue GetFromException;

        case 91:
          return $var2[1] | 0;

        case 92:
          return $var2[1] | 0;

        case 93:
          return 192;

        case 94:
          const $var3 = e instanceof NumberedError ? [0, e.Data0[0]] : e instanceof IllegalFileNameChar ? [1, e.Data0, e.Data1] : e instanceof ErrorsFromAddingSubsumptionConstraint ? e.Data5.tag === 10 ? [2] : [3] : [3];

          switch ($var3[0]) {
            case 0:
              return $var3[1] | 0;

            case 1:
              return SR.buildUnexpectedFileNameCharacter($var3[1], $var3[2])[0] | 0;

            case 2:
              return SR.considerUpcast("", "")[0] | 0;

            case 3:
              return 193;
          }

      }
    }
  };

  return GetFromException(err.Exception) | 0;
}
export function GetWarningLevel(err) {
  const $var4 = err.Exception instanceof RecursiveUseCheckedAtRuntime ? [0] : err.Exception instanceof LetRecEvaluatedOutOfOrder ? [0] : err.Exception instanceof DefensiveCopyWarning ? [0] : err.Exception instanceof FullAbstraction ? [0] : err.Exception instanceof NumberedError ? [1, err.Exception.Data0[0]] : err.Exception instanceof ErrorWithSuggestions ? [1, err.Exception.Data0[0]] : err.Exception instanceof _Error ? [1, err.Exception.Data0[0]] : [2];

  switch ($var4[0]) {
    case 0:
      return 5;

    case 1:
      if ($var4[1] === 1178) {
        return 5;
      } else {
        return 2;
      }

    case 2:
      return 2;
  }
}
export function warningOn(err, level, specificWarnOn) {
  const n = GetDiagnosticNumber(err) | 0;

  if (exists($var5 => equals(n, $var5), specificWarnOn)) {
    return true;
  } else if (n === 1182) {
    return false;
  } else if (n === 3180) {
    return false;
  } else if (n === 3218) {
    return false;
  } else {
    return level >= GetWarningLevel(err);
  }
}
export function SplitRelatedDiagnostics(err) {
  const ToPhased = function (e) {
    return new PhasedDiagnostic(e, err.Phase);
  };

  const SplitRelatedException = function (_arg1) {
    if (_arg1 instanceof UnresolvedOverloading) {
      const related = map(ToPhased, _arg1.Data1);
      return [ToPhased(new UnresolvedOverloading(_arg1.Data0, new List(), _arg1.Data2, _arg1.Data3)), related];
    } else if (_arg1 instanceof ConstraintSolverRelatedInformation) {
      const patternInput = SplitRelatedException(_arg1.Data2);
      return [ToPhased(new ConstraintSolverRelatedInformation(_arg1.Data0, _arg1.Data1, patternInput[0].Exception)), patternInput[1]];
    } else if (_arg1 instanceof ErrorFromAddingTypeEquation) {
      const patternInput_1 = SplitRelatedException(_arg1.Data4);
      return [ToPhased(new ErrorFromAddingTypeEquation(_arg1.Data0, _arg1.Data1, _arg1.Data2, _arg1.Data3, patternInput_1[0].Exception, _arg1.Data5)), patternInput_1[1]];
    } else if (_arg1 instanceof ErrorFromApplyingDefault) {
      const patternInput_2 = SplitRelatedException(_arg1.Data4);
      return [ToPhased(new ErrorFromApplyingDefault(_arg1.Data0, _arg1.Data1, _arg1.Data2, _arg1.Data3, patternInput_2[0].Exception, _arg1.Data5)), patternInput_2[1]];
    } else if (_arg1 instanceof ErrorsFromAddingSubsumptionConstraint) {
      const patternInput_3 = SplitRelatedException(_arg1.Data4);
      return [ToPhased(new ErrorsFromAddingSubsumptionConstraint(_arg1.Data0, _arg1.Data1, _arg1.Data2, _arg1.Data3, patternInput_3[0].Exception, _arg1.Data5, _arg1.Data6)), patternInput_3[1]];
    } else if (_arg1 instanceof ErrorFromAddingConstraint) {
      const patternInput_4 = SplitRelatedException(_arg1.Data1);
      return [ToPhased(new ErrorFromAddingConstraint(_arg1.Data0, patternInput_4[0].Exception, _arg1.Data2)), patternInput_4[1]];
    } else if (_arg1 instanceof WrappedError) {
      const patternInput_5 = SplitRelatedException(_arg1.Data0);
      return [ToPhased(new WrappedError(patternInput_5[0].Exception, _arg1.Data1)), patternInput_5[1]];
    } else {
      return [ToPhased(_arg1), new List()];
    }
  };

  return SplitRelatedException(err.Exception);
}
export function DeclareMesssage() {
  return CurriedLambda(function (tupledArg) {
    return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString(tupledArg[0], tupledArg[1]);
  });
}
export function SeeAlsoE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("SeeAlso", "%s");
}
export function ConstraintSolverTupleDiffLengthsE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ConstraintSolverTupleDiffLengths", "%d%d");
}
export function ConstraintSolverInfiniteTypesE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ConstraintSolverInfiniteTypes", "%s%s");
}
export function ConstraintSolverMissingConstraintE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ConstraintSolverMissingConstraint", "%s");
}
export function ConstraintSolverTypesNotInEqualityRelation1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ConstraintSolverTypesNotInEqualityRelation1", "%s%s");
}
export function ConstraintSolverTypesNotInEqualityRelation2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ConstraintSolverTypesNotInEqualityRelation2", "%s%s");
}
export function ConstraintSolverTypesNotInSubsumptionRelationE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ConstraintSolverTypesNotInSubsumptionRelation", "%s%s%s");
}
export function ErrorFromAddingTypeEquation1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ErrorFromAddingTypeEquation1", "%s%s%s");
}
export function ErrorFromAddingTypeEquation2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ErrorFromAddingTypeEquation2", "%s%s%s");
}
export function ErrorFromApplyingDefault1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ErrorFromApplyingDefault1", "%s");
}
export function ErrorFromApplyingDefault2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ErrorFromApplyingDefault2", "");
}
export function ErrorsFromAddingSubsumptionConstraintE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ErrorsFromAddingSubsumptionConstraint", "%s%s%s");
}
export function UpperCaseIdentifierInPatternE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UpperCaseIdentifierInPattern", "");
}
export function NotUpperCaseConstructorE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NotUpperCaseConstructor", "");
}
export function PossibleOverloadE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("PossibleOverload", "%s%s");
}
export function FunctionExpectedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("FunctionExpected", "");
}
export function BakedInMemberConstraintNameE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("BakedInMemberConstraintName", "%s");
}
export function BadEventTransformationE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("BadEventTransformation", "");
}
export function ParameterlessStructCtorE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ParameterlessStructCtor", "");
}
export function InterfaceNotRevealedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("InterfaceNotRevealed", "%s");
}
export function TyconBadArgsE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("TyconBadArgs", "%s%d%d");
}
export function IndeterminateTypeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("IndeterminateType", "");
}
export function NameClash1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NameClash1", "%s%s");
}
export function NameClash2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NameClash2", "%s%s%s%s%s");
}
export function Duplicate1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Duplicate1", "%s");
}
export function Duplicate2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Duplicate2", "%s%s");
}
export function UndefinedName2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UndefinedName2", "");
}
export function FieldNotMutableE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("FieldNotMutable", "");
}
export function FieldsFromDifferentTypesE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("FieldsFromDifferentTypes", "%s%s");
}
export function VarBoundTwiceE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("VarBoundTwice", "%s");
}
export function RecursionE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Recursion", "%s%s%s%s");
}
export function InvalidRuntimeCoercionE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("InvalidRuntimeCoercion", "%s%s%s");
}
export function IndeterminateRuntimeCoercionE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("IndeterminateRuntimeCoercion", "%s%s");
}
export function IndeterminateStaticCoercionE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("IndeterminateStaticCoercion", "%s%s");
}
export function StaticCoercionShouldUseBoxE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("StaticCoercionShouldUseBox", "%s%s");
}
export function TypeIsImplicitlyAbstractE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("TypeIsImplicitlyAbstract", "");
}
export function NonRigidTypar1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NonRigidTypar1", "%s%s");
}
export function NonRigidTypar2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NonRigidTypar2", "%s%s");
}
export function NonRigidTypar3E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NonRigidTypar3", "%s%s");
}
export function OBlockEndSentenceE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("BlockEndSentence", "");
}
export function UnexpectedEndOfInputE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnexpectedEndOfInput", "");
}
export function UnexpectedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Unexpected", "%s");
}
export function NONTERM_interactionE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.interaction", "");
}
export function NONTERM_hashDirectiveE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.hashDirective", "");
}
export function NONTERM_fieldDeclE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.fieldDecl", "");
}
export function NONTERM_unionCaseReprE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.unionCaseRepr", "");
}
export function NONTERM_localBindingE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.localBinding", "");
}
export function NONTERM_hardwhiteLetBindingsE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.hardwhiteLetBindings", "");
}
export function NONTERM_classDefnMemberE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.classDefnMember", "");
}
export function NONTERM_defnBindingsE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.defnBindings", "");
}
export function NONTERM_classMemberSpfnE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.classMemberSpfn", "");
}
export function NONTERM_valSpfnE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.valSpfn", "");
}
export function NONTERM_tyconSpfnE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.tyconSpfn", "");
}
export function NONTERM_anonLambdaExprE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.anonLambdaExpr", "");
}
export function NONTERM_attrUnionCaseDeclE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.attrUnionCaseDecl", "");
}
export function NONTERM_cPrototypeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.cPrototype", "");
}
export function NONTERM_objectImplementationMembersE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.objectImplementationMembers", "");
}
export function NONTERM_ifExprCasesE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.ifExprCases", "");
}
export function NONTERM_openDeclE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.openDecl", "");
}
export function NONTERM_fileModuleSpecE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.fileModuleSpec", "");
}
export function NONTERM_patternClausesE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.patternClauses", "");
}
export function NONTERM_beginEndExprE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.beginEndExpr", "");
}
export function NONTERM_recdExprE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.recdExpr", "");
}
export function NONTERM_tyconDefnE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.tyconDefn", "");
}
export function NONTERM_exconCoreE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.exconCore", "");
}
export function NONTERM_typeNameInfoE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.typeNameInfo", "");
}
export function NONTERM_attributeListE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.attributeList", "");
}
export function NONTERM_quoteExprE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.quoteExpr", "");
}
export function NONTERM_typeConstraintE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.typeConstraint", "");
}
export function NONTERM_Category_ImplementationFileE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.Category.ImplementationFile", "");
}
export function NONTERM_Category_DefinitionE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.Category.Definition", "");
}
export function NONTERM_Category_SignatureFileE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.Category.SignatureFile", "");
}
export function NONTERM_Category_PatternE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.Category.Pattern", "");
}
export function NONTERM_Category_ExprE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.Category.Expr", "");
}
export function NONTERM_Category_TypeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.Category.Type", "");
}
export function NONTERM_typeArgsActualE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NONTERM.typeArgsActual", "");
}
export function TokenName1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("TokenName1", "%s");
}
export function TokenName1TokenName2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("TokenName1TokenName2", "%s%s");
}
export function TokenName1TokenName2TokenName3E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("TokenName1TokenName2TokenName3", "%s%s%s");
}
export function RuntimeCoercionSourceSealed1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("RuntimeCoercionSourceSealed1", "%s");
}
export function RuntimeCoercionSourceSealed2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("RuntimeCoercionSourceSealed2", "%s");
}
export function CoercionTargetSealedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("CoercionTargetSealed", "%s");
}
export function UpcastUnnecessaryE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UpcastUnnecessary", "");
}
export function TypeTestUnnecessaryE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("TypeTestUnnecessary", "");
}
export function OverrideDoesntOverride1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("OverrideDoesntOverride1", "%s");
}
export function OverrideDoesntOverride2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("OverrideDoesntOverride2", "%s");
}
export function OverrideDoesntOverride3E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("OverrideDoesntOverride3", "%s");
}
export function OverrideDoesntOverride4E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("OverrideDoesntOverride4", "%s");
}
export function UnionCaseWrongArgumentsE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnionCaseWrongArguments", "%d%d");
}
export function UnionPatternsBindDifferentNamesE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnionPatternsBindDifferentNames", "");
}
export function RequiredButNotSpecifiedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("RequiredButNotSpecified", "%s%s%s");
}
export function UseOfAddressOfOperatorE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UseOfAddressOfOperator", "");
}
export function DefensiveCopyWarningE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("DefensiveCopyWarning", "%s");
}
export function DeprecatedThreadStaticBindingWarningE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("DeprecatedThreadStaticBindingWarning", "");
}
export function FunctionValueUnexpectedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("FunctionValueUnexpected", "%s");
}
export function UnitTypeExpectedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnitTypeExpected", "%s");
}
export function UnitTypeExpectedWithEqualityE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnitTypeExpectedWithEquality", "%s");
}
export function UnitTypeExpectedWithPossiblePropertySetterE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnitTypeExpectedWithPossiblePropertySetter", "%s%s%s");
}
export function UnitTypeExpectedWithPossibleAssignmentE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnitTypeExpectedWithPossibleAssignment", "%s%s");
}
export function UnitTypeExpectedWithPossibleAssignmentToMutableE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnitTypeExpectedWithPossibleAssignmentToMutable", "%s%s");
}
export function RecursiveUseCheckedAtRuntimeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("RecursiveUseCheckedAtRuntime", "");
}
export function LetRecUnsound1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("LetRecUnsound1", "%s");
}
export function LetRecUnsound2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("LetRecUnsound2", "%s%s");
}
export function LetRecUnsoundInnerE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("LetRecUnsoundInner", "%s");
}
export function LetRecEvaluatedOutOfOrderE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("LetRecEvaluatedOutOfOrder", "");
}
export function LetRecCheckedAtRuntimeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("LetRecCheckedAtRuntime", "");
}
export function SelfRefObjCtor1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("SelfRefObjCtor1", "");
}
export function SelfRefObjCtor2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("SelfRefObjCtor2", "");
}
export function VirtualAugmentationOnNullValuedTypeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("VirtualAugmentationOnNullValuedType", "");
}
export function NonVirtualAugmentationOnNullValuedTypeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NonVirtualAugmentationOnNullValuedType", "");
}
export function NonUniqueInferredAbstractSlot1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NonUniqueInferredAbstractSlot1", "%s");
}
export function NonUniqueInferredAbstractSlot2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NonUniqueInferredAbstractSlot2", "");
}
export function NonUniqueInferredAbstractSlot3E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NonUniqueInferredAbstractSlot3", "%s%s");
}
export function NonUniqueInferredAbstractSlot4E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("NonUniqueInferredAbstractSlot4", "");
}
export function Failure3E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Failure3", "%s");
}
export function Failure4E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Failure4", "%s");
}
export function FullAbstractionE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("FullAbstraction", "%s");
}
export function MatchIncomplete1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("MatchIncomplete1", "");
}
export function MatchIncomplete2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("MatchIncomplete2", "%s");
}
export function MatchIncomplete3E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("MatchIncomplete3", "%s");
}
export function MatchIncomplete4E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("MatchIncomplete4", "");
}
export function RuleNeverMatchedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("RuleNeverMatched", "");
}
export function EnumMatchIncomplete1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("EnumMatchIncomplete1", "");
}
export function ValNotMutableE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ValNotMutable", "%s");
}
export function ValNotLocalE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ValNotLocal", "");
}
export function Obsolete1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Obsolete1", "");
}
export function Obsolete2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Obsolete2", "%s");
}
export function ExperimentalE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Experimental", "%s");
}
export function PossibleUnverifiableCodeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("PossibleUnverifiableCode", "");
}
export function DeprecatedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("Deprecated", "%s");
}
export function LibraryUseOnlyE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("LibraryUseOnly", "");
}
export function MissingFieldsE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("MissingFields", "%s");
}
export function ValueRestriction1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ValueRestriction1", "%s%s%s");
}
export function ValueRestriction2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ValueRestriction2", "%s%s%s");
}
export function ValueRestriction3E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ValueRestriction3", "%s");
}
export function ValueRestriction4E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ValueRestriction4", "%s%s%s");
}
export function ValueRestriction5E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ValueRestriction5", "%s%s%s");
}
export function RecoverableParseErrorE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("RecoverableParseError", "");
}
export function ReservedKeywordE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("ReservedKeyword", "%s");
}
export function IndentationProblemE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("IndentationProblem", "%s");
}
export function OverrideInIntrinsicAugmentationE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("OverrideInIntrinsicAugmentation", "");
}
export function OverrideInExtrinsicAugmentationE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("OverrideInExtrinsicAugmentation", "");
}
export function IntfImplInIntrinsicAugmentationE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("IntfImplInIntrinsicAugmentation", "");
}
export function IntfImplInExtrinsicAugmentationE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("IntfImplInExtrinsicAugmentation", "");
}
export function UnresolvedReferenceNoRangeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnresolvedReferenceNoRange", "%s");
}
export function UnresolvedPathReferenceNoRangeE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("UnresolvedPathReferenceNoRange", "%s%s");
}
export function HashIncludeNotAllowedInNonScriptE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("HashIncludeNotAllowedInNonScript", "");
}
export function HashReferenceNotAllowedInNonScriptE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("HashReferenceNotAllowedInNonScript", "");
}
export function HashDirectiveNotAllowedInNonScriptE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("HashDirectiveNotAllowedInNonScript", "");
}
export function FileNameNotResolvedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("FileNameNotResolved", "%s%s");
}
export function AssemblyNotResolvedE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("AssemblyNotResolved", "%s");
}
export function HashLoadedSourceHasIssues1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("HashLoadedSourceHasIssues1", "");
}
export function HashLoadedSourceHasIssues2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("HashLoadedSourceHasIssues2", "");
}
export function HashLoadedScriptConsideredSourceE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("HashLoadedScriptConsideredSource", "");
}
export function InvalidInternalsVisibleToAssemblyName1E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("InvalidInternalsVisibleToAssemblyName1", "%s%s");
}
export function InvalidInternalsVisibleToAssemblyName2E() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("InvalidInternalsVisibleToAssemblyName2", "%s");
}
export function LoadedSourceNotFoundIgnoringE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("LoadedSourceNotFoundIgnoring", "%s");
}
export function MSBuildReferenceResolutionErrorE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("MSBuildReferenceResolutionError", "%s%s");
}
export function TargetInvocationExceptionWrapperE() {
  return Microsoft.FSharp.Compiler.DiagnosticMessage.DeclareResourceString("TargetInvocationExceptionWrapper", "%s");
}
export function getErrorString(key) {
  return Microsoft.FSharp.Compiler.SR.GetString(key);
}

function _InvalidArgument___(exn) {
  if (exn instanceof Error) {
    return exn.message;
  } else {
    return null;
  }
}

export { _InvalidArgument___ as $7C$InvalidArgument$7C$_$7C$ };
export function OutputPhasedErrorR(os, err) {
  const OutputExceptionR = function (os_1, error) {
    var t2_;
    var t2;
    var t1_;
    var t1;
    var m;
    var g;
    var denv_1;
    var contextInfo_1;
    var clo1;
    var e;
    var contextInfo;
    var clo1_1;
    var clo1_2;
    const $var6 = error instanceof ConstraintSolverTupleDiffLengths ? [0, error.Data3, error.Data4, error.Data1, error.Data2] : error instanceof ConstraintSolverInfiniteTypes ? [1, error.Data0, error.Data1, error.Data4, error.Data5, error.Data2, error.Data3] : error instanceof ConstraintSolverMissingConstraint ? [2, error.Data0, error.Data3, error.Data4, error.Data2, error.Data1] : error instanceof ConstraintSolverTypesNotInEqualityRelation ? error.Data1.tag === 6 ? error.Data2.tag === 6 ? [3, error.Data0, error.Data3, error.Data4, error.Data1, error.Data2] : [4, error.Data5, error.Data0, error.Data3, error.Data4, error.Data1, error.Data2] : [4, error.Data5, error.Data0, error.Data3, error.Data4, error.Data1, error.Data2] : error instanceof ConstraintSolverTypesNotInSubsumptionRelation ? [5, error.Data0, error.Data3, error.Data4, error.Data1, error.Data2] : error instanceof ConstraintSolverError ? [6, error.Data1, error.Data2, error.Data0] : error instanceof ConstraintSolverRelatedInformation ? [7, error.Data2, error.Data0] : error instanceof ErrorFromAddingTypeEquation ? error.Data4 instanceof ConstraintSolverTypesNotInEqualityRelation ? (t2_ = error.Data4.Data2, t2 = error.Data3, t1_ = error.Data4.Data1, t1 = error.Data2, m = error.Data4.Data3, g = error.Data0, denv_1 = error.Data1, contextInfo_1 = error.Data4.Data5, typeEquiv(g, t1, t1_) ? typeEquiv(g, t2, t2_) : false) ? [8, error.Data4.Data5, error.Data1, error.Data0, error.Data4.Data3, error.Data2, error.Data4.Data1, error.Data3, error.Data4.Data2] : [9] : [9] : [9];

    switch ($var6[0]) {
      case 0:
        os_1.Append(ConstraintSolverTupleDiffLengthsE().Format($var6[3].length, $var6[4].length));

        if ($var6[1].StartLine !== $var6[2].StartLine) {
          os_1.Append(SeeAlsoE().Format(stringOfRange($var6[1])));
        }

        break;

      case 1:
        const patternInput = minimalStringsOfTwoTypes($var6[2], $var6[5], $var6[6]);
        os_1.Append(ConstraintSolverInfiniteTypesE().Format(patternInput[0], patternInput[1]));

        if ($var6[1].tag === 7) {
          os_1.Append(" " + SR.returnUsedInsteadOfReturnBang());
        } else if ($var6[1].tag === 8) {
          os_1.Append(" " + SR.yieldUsedInsteadOfYieldBang());
        }

        if ($var6[3].StartLine !== $var6[4].StartLine) {
          os_1.Append(SeeAlsoE().Format(stringOfRange($var6[3])));
        }

        break;

      case 2:
        os_1.Append(ConstraintSolverMissingConstraintE().Format(stringOfTyparConstraint($var6[1], $var6[5], $var6[4])));

        if ($var6[2].StartLine !== $var6[3].StartLine) {
          os_1.Append(SeeAlsoE().Format(stringOfRange($var6[2])));
        }

        break;

      case 3:
        const patternInput_1 = minimalStringsOfTwoTypes($var6[1], $var6[4], $var6[5]);
        os_1.Append(ConstraintSolverTypesNotInEqualityRelation1E().Format(patternInput_1[0], patternInput_1[1]));

        if ($var6[2].StartLine !== $var6[3].StartLine) {
          os_1.Append(SeeAlsoE().Format(stringOfRange($var6[2])));
        }

        break;

      case 4:
        const patternInput_2 = minimalStringsOfTwoTypes($var6[2], $var6[5], $var6[6]);
        const $var7 = $var6[1].tag === 1 ? equals($var6[1].data, $var6[3]) ? [0, $var6[1].data] : [1] : [1];

        switch ($var7[0]) {
          case 0:
            os_1.Append(SR.ifExpression(patternInput_2[0], patternInput_2[1]));
            break;

          case 1:
            const $var8 = $var6[1].tag === 6 ? equals($var6[1].data[1], $var6[3]) ? [0, $var6[1].data[0], $var6[1].data[1]] : [1] : [1];

            switch ($var8[0]) {
              case 0:
                if ($var8[1]) {
                  os_1.Append(SR.arrayElementHasWrongType(patternInput_2[0], patternInput_2[1]));
                } else {
                  os_1.Append(SR.listElementHasWrongType(patternInput_2[0], patternInput_2[1]));
                }

                break;

              case 1:
                const $var9 = $var6[1].tag === 2 ? equals($var6[1].data, $var6[3]) ? [0, $var6[1].data] : [1] : [1];

                switch ($var9[0]) {
                  case 0:
                    os_1.Append(SR.missingElseBranch(patternInput_2[1]));
                    break;

                  case 1:
                    const $var10 = $var6[1].tag === 3 ? equals($var6[1].data, $var6[3]) ? [0, $var6[1].data] : [1] : [1];

                    switch ($var10[0]) {
                      case 0:
                        os_1.Append(SR.elseBranchHasWrongType(patternInput_2[0], patternInput_2[1]));
                        break;

                      case 1:
                        const $var11 = $var6[1].tag === 11 ? equals($var6[1].data, $var6[3]) ? [0, $var6[1].data] : [1] : [1];

                        switch ($var11[0]) {
                          case 0:
                            os_1.Append(SR.followingPatternMatchClauseHasWrongType(patternInput_2[0], patternInput_2[1]));
                            break;

                          case 1:
                            const $var12 = $var6[1].tag === 12 ? equals($var6[1].data, $var6[3]) ? [0, $var6[1].data] : [1] : [1];

                            switch ($var12[0]) {
                              case 0:
                                os_1.Append(SR.patternMatchGuardIsNotBool(patternInput_2[1]));
                                break;

                              case 1:
                                os_1.Append(ConstraintSolverTypesNotInEqualityRelation2E().Format(patternInput_2[0], patternInput_2[1]));
                                break;
                            }

                            break;
                        }

                        break;
                    }

                    break;
                }

                break;
            }

            break;
        }

        if ($var6[3].StartLine !== $var6[4].StartLine) {
          os_1.Append(SeeAlsoE().Format(stringOfRange($var6[3])));
        }

        break;

      case 5:
        const patternInput_3 = minimalStringsOfTwoTypes($var6[1], $var6[4], $var6[5]);
        os_1.Append(ConstraintSolverTypesNotInSubsumptionRelationE().Format(patternInput_3[1], patternInput_3[0], patternInput_3[2]));

        if ($var6[2].StartLine !== $var6[3].StartLine) {
          os_1.Append(SeeAlsoE().Format(stringOfRange($var6[3])));
        }

        break;

      case 6:
        os_1.Append($var6[3]);

        if ($var6[1].StartLine !== $var6[2].StartLine) {
          os_1.Append(SeeAlsoE().Format(stringOfRange($var6[2])));
        }

        break;

      case 7:
        if ($var6[1] instanceof ConstraintSolverError) {
          OutputExceptionR(os_1, $var6[1]);
        }

        iterate(CurriedLambda((clo1 = Microsoft.FSharp.Core.Printf.bprintf(os_1), CurriedLambda(function (arg10) {
          return CurriedLambda(clo1)(arg10);
        })))(printf(" %s")), defaultArg($var6[2], [], $var13 => [$var13]));
        break;

      case 8:
        const patternInput_4 = minimalStringsOfTwoTypes($var6[2], $var6[5], $var6[7]);
        const $var14 = $var6[1].tag === 1 ? equals($var6[1].data, $var6[4]) ? [0, $var6[1].data] : [1] : [1];

        switch ($var14[0]) {
          case 0:
            os_1.Append(SR.ifExpression(patternInput_4[0], patternInput_4[1]));
            break;

          case 1:
            const $var15 = $var6[1].tag === 6 ? equals($var6[1].data[1], $var6[4]) ? [0, $var6[1].data[0], $var6[1].data[1]] : [1] : [1];

            switch ($var15[0]) {
              case 0:
                if ($var15[1]) {
                  os_1.Append(SR.arrayElementHasWrongType(patternInput_4[0], patternInput_4[1]));
                } else {
                  os_1.Append(SR.listElementHasWrongType(patternInput_4[0], patternInput_4[1]));
                }

                break;

              case 1:
                const $var16 = $var6[1].tag === 2 ? equals($var6[1].data, $var6[4]) ? [0, $var6[1].data] : [1] : [1];

                switch ($var16[0]) {
                  case 0:
                    os_1.Append(SR.missingElseBranch(patternInput_4[1]));
                    break;

                  case 1:
                    const $var17 = $var6[1].tag === 3 ? equals($var6[1].data, $var6[4]) ? [0, $var6[1].data] : [1] : [1];

                    switch ($var17[0]) {
                      case 0:
                        os_1.Append(SR.elseBranchHasWrongType(patternInput_4[0], patternInput_4[1]));
                        break;

                      case 1:
                        const $var18 = $var6[1].tag === 11 ? equals($var6[1].data, $var6[4]) ? [0, $var6[1].data] : [1] : [1];

                        switch ($var18[0]) {
                          case 0:
                            os_1.Append(SR.followingPatternMatchClauseHasWrongType(patternInput_4[0], patternInput_4[1]));
                            break;

                          case 1:
                            const $var19 = $var6[1].tag === 12 ? equals($var6[1].data, $var6[4]) ? [0, $var6[1].data] : [1] : [1];

                            switch ($var19[0]) {
                              case 0:
                                os_1.Append(SR.patternMatchGuardIsNotBool(patternInput_4[1]));
                                break;

                              case 1:
                                if ($var6[1].tag === 5) {
                                  os_1.Append(ErrorFromAddingTypeEquation1E().Format(patternInput_4[1], patternInput_4[0], patternInput_4[2]));
                                  os_1.Append("\n" + SR.commaInsteadOfSemicolonInRecord());
                                } else if (patternInput_4[1] === "bool" ? endsWith(patternInput_4[0], " ref") : false) {
                                  os_1.Append(ErrorFromAddingTypeEquation1E().Format(patternInput_4[1], patternInput_4[0], patternInput_4[2]));
                                  os_1.Append("\n" + SR.derefInsteadOfNot());
                                } else {
                                  os_1.Append(ErrorFromAddingTypeEquation1E().Format(patternInput_4[1], patternInput_4[0], patternInput_4[2]));
                                }

                                break;
                            }

                            break;
                        }

                        break;
                    }

                    break;
                }

                break;
            }

            break;
        }

        break;

      case 9:
        const $var20 = error instanceof ErrorFromAddingTypeEquation ? error.Data4 instanceof ConstraintSolverTypesNotInEqualityRelation ? (e = error.Data4, contextInfo = error.Data4.Data5, contextInfo.tag === 0 ? false : true) ? [0, error.Data4.Data5, error.Data4] : [1] : [1] : [1];

        switch ($var20[0]) {
          case 0:
            OutputExceptionR(os_1, $var20[2]);
            break;

          case 1:
            let $var21;

            if (error instanceof ErrorFromAddingTypeEquation) {
              if (error.Data4 instanceof ConstraintSolverTypesNotInSubsumptionRelation) {
                $var21 = [0, error.Data4];
              } else if (error.Data4 instanceof ConstraintSolverError) {
                $var21 = [0, error.Data4];
              } else {
                $var21 = [1, error.Data1, error.Data4, error.Data0, error.Data2, error.Data3];
              }
            } else if (error instanceof ErrorFromApplyingDefault) {
              $var21 = [2, error.Data3, error.Data1, error.Data4];
            } else if (error instanceof ErrorsFromAddingSubsumptionConstraint) {
              $var21 = [3, error.Data5, error.Data1, error.Data4, error.Data0, error.Data2, error.Data3];
            } else if (error instanceof UpperCaseIdentifierInPattern) {
              $var21 = [4];
            } else if (error instanceof NotUpperCaseConstructor) {
              $var21 = [5];
            } else if (error instanceof ErrorFromAddingConstraint) {
              $var21 = [6, error.Data1];
            } else if (error instanceof UnresolvedOverloading) {
              $var21 = [7, error.Data2];
            } else if (error instanceof UnresolvedConversionOperator) {
              $var21 = [8, error.Data0, error.Data1, error.Data2];
            } else if (error instanceof PossibleOverload) {
              $var21 = [9, error.Data1, error.Data2];
            } else if (error instanceof FunctionExpected) {
              $var21 = [10];
            } else if (error instanceof BakedInMemberConstraintName) {
              $var21 = [11, error.Data0];
            } else if (error instanceof StandardOperatorRedefinitionWarning) {
              $var21 = [12, error.Data0];
            } else if (error instanceof BadEventTransformation) {
              $var21 = [13];
            } else if (error instanceof ParameterlessStructCtor) {
              $var21 = [14];
            } else if (error instanceof InterfaceNotRevealed) {
              $var21 = [15, error.Data0, error.Data1];
            } else if (error instanceof NotAFunctionButIndexer) {
              $var21 = [16, error.Data2];
            } else if (error instanceof NotAFunction) {
              $var21 = [17, error.Data3];
            } else if (error instanceof TyconBadArgs) {
              $var21 = [18, error.Data2, error.Data1];
            } else if (error instanceof IndeterminateType) {
              $var21 = [19];
            } else if (error instanceof NameClash) {
              $var21 = [20, error.Data1, error.Data4, error.Data0, error.Data2, error.Data5];
            } else if (error instanceof Duplicate) {
              $var21 = [21, error.Data0, error.Data1];
            } else if (error instanceof UndefinedName) {
              $var21 = [22, error.Data2, error.Data1, error.Data3];
            } else if (error instanceof InternalUndefinedItemRef) {
              $var21 = [23, error.Data2, error.Data0, error.Data3, error.Data1];
            } else if (error instanceof FieldNotMutable) {
              $var21 = [24];
            } else if (error instanceof FieldsFromDifferentTypes) {
              $var21 = [25, error.Data1, error.Data2];
            } else if (error instanceof VarBoundTwice) {
              $var21 = [26, error.Data0];
            } else if (error instanceof Recursion) {
              $var21 = [27, error.Data0, error.Data1, error.Data2, error.Data3];
            } else if (error instanceof InvalidRuntimeCoercion) {
              $var21 = [28, error.Data0, error.Data1, error.Data2];
            } else if (error instanceof IndeterminateRuntimeCoercion) {
              $var21 = [29, error.Data0, error.Data1, error.Data2];
            } else if (error instanceof IndeterminateStaticCoercion) {
              $var21 = [30, error.Data0, error.Data1, error.Data2];
            } else if (error instanceof StaticCoercionShouldUseBox) {
              $var21 = [31, error.Data0, error.Data1, error.Data2];
            } else if (error instanceof TypeIsImplicitlyAbstract) {
              $var21 = [32];
            } else if (error instanceof NonRigidTypar) {
              $var21 = [33, error.Data0, error.Data1, error.Data4, error.Data3, error.Data2];
            } else if (error instanceof SyntaxError) {
              $var21 = [34, error.Data0];
            } else if (error instanceof RuntimeCoercionSourceSealed) {
              $var21 = [35, error.Data0, error.Data1];
            } else if (error instanceof CoercionTargetSealed) {
              $var21 = [36, error.Data0, error.Data1];
            } else if (error instanceof UpcastUnnecessary) {
              $var21 = [37];
            } else if (error instanceof TypeTestUnnecessary) {
              $var21 = [38];
            } else if (error instanceof IgnoringPartOfQuotedTermWarning) {
              $var21 = [39, error.Data0];
            } else if (error instanceof OverrideDoesntOverride) {
              $var21 = [40, error.Data4, error.Data0, error.Data3, error.Data1, error.Data5, error.Data2];
            } else if (error instanceof UnionCaseWrongArguments) {
              $var21 = [41, error.Data1, error.Data2];
            } else if (error instanceof UnionPatternsBindDifferentNames) {
              $var21 = [42];
            } else if (error instanceof ValueNotContained) {
              $var21 = [43, error.Data0, error.Data4, error.Data2, error.Data1, error.Data3];
            } else if (error instanceof ConstrNotContained) {
              $var21 = [44, error.Data0, error.Data3, error.Data1, error.Data2];
            } else if (error instanceof ExnconstrNotContained) {
              $var21 = [45, error.Data0, error.Data3, error.Data1, error.Data2];
            } else if (error instanceof FieldNotContained) {
              $var21 = [46, error.Data0, error.Data3, error.Data1, error.Data2];
            } else if (error instanceof RequiredButNotSpecified) {
              $var21 = [47, error.Data2, error.Data1, error.Data3];
            } else if (error instanceof UseOfAddressOfOperator) {
              $var21 = [48];
            } else if (error instanceof DefensiveCopyWarning) {
              $var21 = [49, error.Data0];
            } else if (error instanceof DeprecatedThreadStaticBindingWarning) {
              $var21 = [50];
            } else if (error instanceof FunctionValueUnexpected) {
              $var21 = [51, error.Data0, error.Data1];
            } else if (error instanceof UnitTypeExpected) {
              $var21 = [52, error.Data0, error.Data1];
            } else if (error instanceof UnitTypeExpectedWithEquality) {
              $var21 = [53, error.Data0, error.Data1];
            } else if (error instanceof UnitTypeExpectedWithPossiblePropertySetter) {
              $var21 = [54, error.Data2, error.Data0, error.Data3, error.Data1];
            } else if (error instanceof UnitTypeExpectedWithPossibleAssignment) {
              $var21 = [55, error.Data3, error.Data0, error.Data2, error.Data1];
            } else if (error instanceof RecursiveUseCheckedAtRuntime) {
              $var21 = [56];
            } else if (error instanceof LetRecUnsound) {
              if (error.Data1.tail != null) {
                if (error.Data1.tail.tail == null) {
                  $var21 = [57, error.Data1.head];
                } else {
                  $var21 = [58, error.Data1];
                }
              } else {
                $var21 = [58, error.Data1];
              }
            } else if (error instanceof LetRecEvaluatedOutOfOrder) {
              $var21 = [59];
            } else if (error instanceof LetRecCheckedAtRuntime) {
              $var21 = [60];
            } else if (error instanceof SelfRefObjCtor) {
              if (error.Data0) {
                $var21 = [62];
              } else {
                $var21 = [61];
              }
            } else if (error instanceof VirtualAugmentationOnNullValuedType) {
              $var21 = [63];
            } else if (error instanceof NonVirtualAugmentationOnNullValuedType) {
              $var21 = [64];
            } else if (error instanceof NonUniqueInferredAbstractSlot) {
              $var21 = [65, error.Data2, error.Data3, error.Data4, error.Data1];
            } else if (error instanceof _Error) {
              $var21 = [66, error.Data0[1]];
            } else if (error instanceof ErrorWithSuggestions) {
              $var21 = [67, error.Data2, error.Data0[1], error.Data3];
            } else if (error instanceof NumberedError) {
              $var21 = [68, error.Data0[1]];
            } else if (error instanceof InternalError) {
              $var21 = [69, error, error.msg];
            } else {
              const activePatternResult48531 = _InvalidArgument___(error);

              if (activePatternResult48531 != null) {
                $var21 = [69, error, getValue(activePatternResult48531)];
              } else {
                const activePatternResult48532 = Microsoft.FSharp.Core.Operators["|Failure|_|"](error);

                if (activePatternResult48532 != null) {
                  $var21 = [69, error, getValue(activePatternResult48532)];
                } else {
                  $var21 = [70];
                }
              }
            }

            switch ($var21[0]) {
              case 0:
                OutputExceptionR(os_1, $var21[1]);
                break;

              case 1:
                if (!typeEquiv($var21[3], $var21[4], $var21[5])) {
                  const patternInput_5 = minimalStringsOfTwoTypes($var21[1], $var21[4], $var21[5]);

                  if (patternInput_5[0] !== patternInput_5[1] + patternInput_5[2]) {
                    os_1.Append(ErrorFromAddingTypeEquation2E().Format(patternInput_5[0], patternInput_5[1], patternInput_5[2]));
                  }
                }

                OutputExceptionR(os_1, $var21[2]);
                break;

              case 2:
                const defaultType = minimalStringOfType($var21[2], $var21[1]);
                os_1.Append(ErrorFromApplyingDefault1E().Format(defaultType));
                OutputExceptionR(os_1, $var21[3]);
                os_1.Append(ErrorFromApplyingDefault2E().Format);
                break;

              case 3:
                if ($var21[1].tag === 10) {
                  const patternInput_6 = minimalStringsOfTwoTypes($var21[2], $var21[5], $var21[6]);

                  if ($var21[1].data) {
                    os_1.Append(SR.considerUpcastOperator(patternInput_6[0], patternInput_6[1])[1]);
                  } else {
                    os_1.Append(SR.considerUpcast(patternInput_6[0], patternInput_6[1])[1]);
                  }
                } else if (!typeEquiv($var21[4], $var21[5], $var21[6])) {
                  const patternInput_7 = minimalStringsOfTwoTypes($var21[2], $var21[5], $var21[6]);

                  if (patternInput_7[0] !== patternInput_7[1] + patternInput_7[2]) {
                    os_1.Append(ErrorsFromAddingSubsumptionConstraintE().Format(patternInput_7[1], patternInput_7[0], patternInput_7[2]));
                  } else {
                    OutputExceptionR(os_1, $var21[3]);
                  }
                } else {
                  OutputExceptionR(os_1, $var21[3]);
                }

                break;

              case 4:
                os_1.Append(UpperCaseIdentifierInPatternE().Format);
                break;

              case 5:
                os_1.Append(NotUpperCaseConstructorE().Format);
                break;

              case 6:
                OutputExceptionR(os_1, $var21[1]);
                break;

              case 7:
                os_1.Append($var21[1]);
                break;

              case 8:
                const patternInput_8 = minimalStringsOfTwoTypes($var21[1], $var21[2], $var21[3]);
                os_1.Append(SR.csTypeDoesNotSupportConversion(patternInput_8[0], patternInput_8[1]));
                break;

              case 9:
                const buf = new System.Text.StringBuilder();
                OutputExceptionR(buf, $var21[2]);
                os_1.Append(PossibleOverloadE().Format($var21[1], toString(buf)));
                break;

              case 10:
                os_1.Append(FunctionExpectedE().Format);
                break;

              case 11:
                os_1.Append(BakedInMemberConstraintNameE().Format($var21[1]));
                break;

              case 12:
                os_1.Append($var21[1]);
                break;

              case 13:
                os_1.Append(BadEventTransformationE().Format);
                break;

              case 14:
                os_1.Append(ParameterlessStructCtorE().Format);
                break;

              case 15:
                os_1.Append(InterfaceNotRevealedE().Format(minimalStringOfType($var21[1], $var21[2])));
                break;

              case 16:
                if ($var21[1] != null) {
                  os_1.Append(SR.notAFunctionButMaybeIndexerWithName(getValue($var21[1])));
                } else {
                  os_1.Append(SR.notAFunctionButMaybeIndexer());
                }

                break;

              case 17:
                if ($var21[1].StartColumn === 0) {
                  os_1.Append(SR.notAFunctionButMaybeDeclaration());
                } else {
                  os_1.Append(SR.notAFunction());
                }

                break;

              case 18:
                const exp = $var21[2].TyparsNoRange.length | 0;

                if (exp === 0) {
                  os_1.Append(SR.buildUnexpectedTypeArgs(fullDisplayTextOfTyconRef($var21[2]), $var21[1]));
                } else {
                  os_1.Append(TyconBadArgsE().Format(fullDisplayTextOfTyconRef($var21[2]), exp, $var21[1]));
                }

                break;

              case 19:
                os_1.Append(IndeterminateTypeE().Format);
                break;

              case 20:
                if (($var21[3] === $var21[4] ? $var21[4] === $var21[5] : false) ? $var21[1] === $var21[2] : false) {
                  os_1.Append(NameClash1E().Format($var21[1], $var21[4]));
                } else {
                  os_1.Append(NameClash2E().Format($var21[1], $var21[4], $var21[3], $var21[2], $var21[5]));
                }

                break;

              case 21:
                if ($var21[1] === "member") {
                  os_1.Append(Duplicate1E().Format(DecompileOpName($var21[2])));
                } else {
                  os_1.Append(Duplicate2E().Format($var21[1], DecompileOpName($var21[2])));
                }

                break;

              case 22:
                os_1.Append($var21[2](DecompileOpName($var21[1].idText)));
                const filtered = FilterPredictions($var21[1].idText, $var21[3]);

                if (!(filtered.tail == null)) {
                  os_1.Append(FormatPredictions(DecompileOpName, filtered));
                }

                break;

              case 23:
                const patternInput_9 = $var21[2]([$var21[4], $var21[1], $var21[3]]);
                os_1.Append(patternInput_9[1]);
                break;

              case 24:
                os_1.Append(FieldNotMutableE().Format);
                break;

              case 25:
                os_1.Append(FieldsFromDifferentTypesE().Format($var21[1].FieldName, $var21[2].FieldName));
                break;

              case 26:
                os_1.Append(VarBoundTwiceE().Format(DecompileOpName($var21[1].idText)));
                break;

              case 27:
                const patternInput_10 = minimalStringsOfTwoTypes($var21[1], $var21[3], $var21[4]);
                os_1.Append(RecursionE().Format(DecompileOpName($var21[2].idText), patternInput_10[0], patternInput_10[1], patternInput_10[2]));
                break;

              case 28:
                const patternInput_11 = minimalStringsOfTwoTypes($var21[1], $var21[2], $var21[3]);
                os_1.Append(InvalidRuntimeCoercionE().Format(patternInput_11[0], patternInput_11[1], patternInput_11[2]));
                break;

              case 29:
                const patternInput_12 = minimalStringsOfTwoTypes($var21[1], $var21[2], $var21[3]);
                os_1.Append(IndeterminateRuntimeCoercionE().Format(patternInput_12[0], patternInput_12[1]));
                break;

              case 30:
                const patternInput_13 = minimalStringsOfTwoTypes($var21[1], $var21[2], $var21[3]);
                os_1.Append(IndeterminateStaticCoercionE().Format(patternInput_13[0], patternInput_13[1]));
                break;

              case 31:
                const patternInput_14 = minimalStringsOfTwoTypes($var21[1], $var21[2], $var21[3]);
                os_1.Append(StaticCoercionShouldUseBoxE().Format(patternInput_14[0], patternInput_14[1]));
                break;

              case 32:
                os_1.Append(TypeIsImplicitlyAbstractE().Format);
                break;

              case 33:
                const patternInput_15 = PrettyTypes.PrettifyTypePair($var21[1].g, $var21[4], $var21[3]);
                const ty1 = patternInput_15[0][0];
                const ty = patternInput_15[0][1];

                if ($var21[2] != null) {
                  if (ty1.tag === 6) {
                    os_1.Append(NonRigidTypar2E().Format(getValue($var21[2]), stringOfTy($var21[1], ty)));
                  } else {
                    os_1.Append(NonRigidTypar3E().Format(getValue($var21[2]), stringOfTy($var21[1], ty)));
                  }
                } else {
                  os_1.Append(NonRigidTypar1E().Format(stringOfRange($var21[5]), stringOfTy($var21[1], ty)));
                }

                break;

              case 34:
                const ctxt = $var21[1];

                const _EndOfStructuredConstructToken___ = function (token) {
                  switch (token.tag) {
                    case 19:
                    case 21:
                    case 20:
                    case 18:
                    case 15:
                    case 16:
                    case 17:
                      return makeSome();

                    default:
                      return null;
                  }
                };

                const tokenIdToText = function (tid) {
                  let $var22;

                  if (tid.tag === 189) {
                    $var22 = [0];
                  } else if (tid.tag === 163) {
                    $var22 = [1];
                  } else if (tid.tag === 178) {
                    $var22 = [1];
                  } else if (tid.tag === 173) {
                    $var22 = [1];
                  } else if (tid.tag === 177) {
                    $var22 = [1];
                  } else if (tid.tag === 172) {
                    $var22 = [1];
                  } else if (tid.tag === 175) {
                    $var22 = [1];
                  } else if (tid.tag === 171) {
                    $var22 = [1];
                  } else if (tid.tag === 174) {
                    $var22 = [1];
                  } else if (tid.tag === 170) {
                    $var22 = [1];
                  } else if (tid.tag === 169) {
                    $var22 = [1];
                  } else if (tid.tag === 168) {
                    $var22 = [1];
                  } else if (tid.tag === 167) {
                    $var22 = [2];
                  } else if (tid.tag === 166) {
                    $var22 = [2];
                  } else if (tid.tag === 164) {
                    $var22 = [3];
                  } else if (tid.tag === 165) {
                    $var22 = [4];
                  } else if (tid.tag === 152) {
                    $var22 = [5];
                  } else if (tid.tag === 100) {
                    $var22 = [6];
                  } else if (tid.tag === 63) {
                    $var22 = [7];
                  } else if (tid.tag === 188) {
                    $var22 = [8];
                  } else if (tid.tag === 187) {
                    $var22 = [9];
                  } else if (tid.tag === 80) {
                    $var22 = [10];
                  } else if (tid.tag === 79) {
                    $var22 = [11];
                  } else if (tid.tag === 156) {
                    $var22 = [12];
                  } else if (tid.tag === 186) {
                    $var22 = [13];
                  } else if (tid.tag === 185) {
                    $var22 = [14];
                  } else if (tid.tag === 181) {
                    $var22 = [15];
                  } else if (tid.tag === 184) {
                    $var22 = [16];
                  } else if (tid.tag === 81) {
                    $var22 = [17];
                  } else if (tid.tag === 183) {
                    $var22 = [18];
                  } else if (tid.tag === 182) {
                    $var22 = [19];
                  } else if (tid.tag === 89) {
                    $var22 = [20];
                  } else if (tid.tag === 90) {
                    $var22 = [21];
                  } else if (tid.tag === 143) {
                    $var22 = [22];
                  } else if (tid.tag === 158) {
                    $var22 = [23];
                  } else if (tid.tag === 159) {
                    $var22 = [24];
                  } else if (tid.tag === 75) {
                    $var22 = [25];
                  } else if (tid.tag === 76) {
                    $var22 = [26];
                  } else if (tid.tag === 82) {
                    $var22 = [27];
                  } else if (tid.tag === 176) {
                    $var22 = [28];
                  } else if (tid.tag === 142) {
                    $var22 = [29];
                  } else if (tid.tag === 91) {
                    $var22 = [30];
                  } else if (tid.tag === 96) {
                    $var22 = [31];
                  } else if (tid.tag === 33) {
                    $var22 = [32];
                  } else if (tid.tag === 78) {
                    $var22 = [33];
                  } else if (tid.tag === 83) {
                    $var22 = [34];
                  } else if (tid.tag === 69) {
                    $var22 = [35];
                  } else if (tid.tag === 70) {
                    $var22 = [36];
                  } else if (tid.tag === 99) {
                    $var22 = [37];
                  } else if (tid.tag === 62) {
                    $var22 = [38];
                  } else if (tid.tag === 180) {
                    $var22 = [39];
                  } else if (tid.tag === 179) {
                    $var22 = [40];
                  } else if (tid.tag === 97) {
                    $var22 = [41];
                  } else if (tid.tag === 77) {
                    $var22 = [42];
                  } else if (tid.tag === 57) {
                    $var22 = [43];
                  } else if (tid.tag === 88) {
                    $var22 = [44];
                  } else if (tid.tag === 67) {
                    $var22 = [45];
                  } else if (tid.tag === 84) {
                    $var22 = [46];
                  } else if (tid.tag === 68) {
                    $var22 = [47];
                  } else if (tid.tag === 92) {
                    $var22 = [48];
                  } else if (tid.tag === 93) {
                    $var22 = [49];
                  } else if (tid.tag === 94) {
                    $var22 = [49];
                  } else if (tid.tag === 95) {
                    $var22 = [49];
                  } else if (tid.tag === 153) {
                    $var22 = [50];
                  } else if (tid.tag === 71) {
                    $var22 = [51];
                  } else if (tid.tag === 72) {
                    $var22 = [52];
                  } else if (tid.tag === 73) {
                    $var22 = [53];
                  } else if (tid.tag === 74) {
                    $var22 = [54];
                  } else if (tid.tag === 64) {
                    $var22 = [55];
                  } else if (tid.tag === 65) {
                    $var22 = [56];
                  } else if (tid.tag === 66) {
                    $var22 = [57];
                  } else if (tid.tag === 54) {
                    $var22 = [58];
                  } else if (tid.tag === 155) {
                    $var22 = [59];
                  } else if (tid.tag === 154) {
                    $var22 = [59];
                  } else if (tid.tag === 58) {
                    $var22 = [60];
                  } else if (tid.tag === 59) {
                    $var22 = [61];
                  } else if (tid.tag === 60) {
                    $var22 = [61];
                  } else if (tid.tag === 61) {
                    $var22 = [61];
                  } else if (tid.tag === 42) {
                    $var22 = [62];
                  } else if (tid.tag === 43) {
                    $var22 = [63];
                  } else if (tid.tag === 44) {
                    $var22 = [64];
                  } else if (tid.tag === 151) {
                    $var22 = [65];
                  } else if (tid.tag === 112) {
                    $var22 = [66];
                  } else if (tid.tag === 150) {
                    $var22 = [67];
                  } else if (tid.tag === 53) {
                    $var22 = [68];
                  } else if (tid.tag === 52) {
                    $var22 = [69];
                  } else if (tid.tag === 51) {
                    $var22 = [70];
                  } else if (tid.tag === 50) {
                    $var22 = [71];
                  } else if (tid.tag === 49) {
                    $var22 = [72];
                  } else if (tid.tag === 48) {
                    $var22 = [73];
                  } else if (tid.tag === 47) {
                    $var22 = [74];
                  } else if (tid.tag === 46) {
                    $var22 = [75];
                  } else if (tid.tag === 149) {
                    $var22 = [76];
                  } else if (tid.tag === 22) {
                    $var22 = [77];
                  } else {
                    const activePatternResult48499 = _EndOfStructuredConstructToken___(tid);

                    if (activePatternResult48499 != null) {
                      $var22 = [78];
                    } else {
                      $var22 = [79];
                    }
                  }

                  switch ($var22[0]) {
                    case 0:
                      return getErrorString("Parser.TOKEN.IDENT");

                    case 1:
                      return getErrorString("Parser.TOKEN.INT");

                    case 2:
                      return getErrorString("Parser.TOKEN.FLOAT");

                    case 3:
                      return getErrorString("Parser.TOKEN.DECIMAL");

                    case 4:
                      return getErrorString("Parser.TOKEN.CHAR");

                    case 5:
                      return getErrorString("Parser.TOKEN.BASE");

                    case 6:
                      return getErrorString("Parser.TOKEN.LPAREN.STAR.RPAREN");

                    case 7:
                      return getErrorString("Parser.TOKEN.DOLLAR");

                    case 8:
                      return getErrorString("Parser.TOKEN.INFIX.STAR.STAR.OP");

                    case 9:
                      return getErrorString("Parser.TOKEN.INFIX.COMPARE.OP");

                    case 10:
                      return getErrorString("Parser.TOKEN.COLON.GREATER");

                    case 11:
                      return getErrorString("Parser.TOKEN.COLON.COLON");

                    case 12:
                      return getErrorString("Parser.TOKEN.PERCENT.OP");

                    case 13:
                      return getErrorString("Parser.TOKEN.INFIX.AT.HAT.OP");

                    case 14:
                      return getErrorString("Parser.TOKEN.INFIX.BAR.OP");

                    case 15:
                      return getErrorString("Parser.TOKEN.PLUS.MINUS.OP");

                    case 16:
                      return getErrorString("Parser.TOKEN.PREFIX.OP");

                    case 17:
                      return getErrorString("Parser.TOKEN.COLON.QMARK.GREATER");

                    case 18:
                      return getErrorString("Parser.TOKEN.INFIX.STAR.DIV.MOD.OP");

                    case 19:
                      return getErrorString("Parser.TOKEN.INFIX.AMP.OP");

                    case 20:
                      return getErrorString("Parser.TOKEN.AMP");

                    case 21:
                      return getErrorString("Parser.TOKEN.AMP.AMP");

                    case 22:
                      return getErrorString("Parser.TOKEN.BAR.BAR");

                    case 23:
                      return getErrorString("Parser.TOKEN.LESS");

                    case 24:
                      return getErrorString("Parser.TOKEN.GREATER");

                    case 25:
                      return getErrorString("Parser.TOKEN.QMARK");

                    case 26:
                      return getErrorString("Parser.TOKEN.QMARK.QMARK");

                    case 27:
                      return getErrorString("Parser.TOKEN.COLON.QMARK");

                    case 28:
                      return getErrorString("Parser.TOKEN.INT32.DOT.DOT");

                    case 29:
                      return getErrorString("Parser.TOKEN.DOT.DOT");

                    case 30:
                      return getErrorString("Parser.TOKEN.QUOTE");

                    case 31:
                      return getErrorString("Parser.TOKEN.STAR");

                    case 32:
                      return getErrorString("Parser.TOKEN.HIGH.PRECEDENCE.TYAPP");

                    case 33:
                      return getErrorString("Parser.TOKEN.COLON");

                    case 34:
                      return getErrorString("Parser.TOKEN.COLON.EQUALS");

                    case 35:
                      return getErrorString("Parser.TOKEN.LARROW");

                    case 36:
                      return getErrorString("Parser.TOKEN.EQUALS");

                    case 37:
                      return getErrorString("Parser.TOKEN.GREATER.BAR.RBRACK");

                    case 38:
                      return getErrorString("Parser.TOKEN.MINUS");

                    case 39:
                      return getErrorString("Parser.TOKEN.ADJACENT.PREFIX.OP");

                    case 40:
                      return getErrorString("Parser.TOKEN.FUNKY.OPERATOR.NAME");

                    case 41:
                      return getErrorString("Parser.TOKEN.COMMA");

                    case 42:
                      return getErrorString("Parser.TOKEN.DOT");

                    case 43:
                      return getErrorString("Parser.TOKEN.BAR");

                    case 44:
                      return getErrorString("Parser.TOKEN.HASH");

                    case 45:
                      return getErrorString("Parser.TOKEN.UNDERSCORE");

                    case 46:
                      return getErrorString("Parser.TOKEN.SEMICOLON");

                    case 47:
                      return getErrorString("Parser.TOKEN.SEMICOLON.SEMICOLON");

                    case 48:
                      return getErrorString("Parser.TOKEN.LPAREN");

                    case 49:
                      return getErrorString("Parser.TOKEN.RPAREN");

                    case 50:
                      return getErrorString("Parser.TOKEN.LQUOTE");

                    case 51:
                      return getErrorString("Parser.TOKEN.LBRACK");

                    case 52:
                      return getErrorString("Parser.TOKEN.LBRACK.BAR");

                    case 53:
                      return getErrorString("Parser.TOKEN.LBRACK.LESS");

                    case 54:
                      return getErrorString("Parser.TOKEN.LBRACE");

                    case 55:
                      return getErrorString("Parser.TOKEN.LBRACE.LESS");

                    case 56:
                      return getErrorString("Parser.TOKEN.BAR.RBRACK");

                    case 57:
                      return getErrorString("Parser.TOKEN.GREATER.RBRACE");

                    case 58:
                      return getErrorString("Parser.TOKEN.GREATER.RBRACK");

                    case 59:
                      return getErrorString("Parser.TOKEN.RQUOTE");

                    case 60:
                      return getErrorString("Parser.TOKEN.RBRACK");

                    case 61:
                      return getErrorString("Parser.TOKEN.RBRACE");

                    case 62:
                      return getErrorString("Parser.TOKEN.PUBLIC");

                    case 63:
                      return getErrorString("Parser.TOKEN.PRIVATE");

                    case 64:
                      return getErrorString("Parser.TOKEN.INTERNAL");

                    case 65:
                      return getErrorString("Parser.TOKEN.CONSTRAINT");

                    case 66:
                      return getErrorString("Parser.TOKEN.INSTANCE");

                    case 67:
                      return getErrorString("Parser.TOKEN.DELEGATE");

                    case 68:
                      return getErrorString("Parser.TOKEN.INHERIT");

                    case 69:
                      return getErrorString("Parser.TOKEN.CONSTRUCTOR");

                    case 70:
                      return getErrorString("Parser.TOKEN.DEFAULT");

                    case 71:
                      return getErrorString("Parser.TOKEN.OVERRIDE");

                    case 72:
                      return getErrorString("Parser.TOKEN.ABSTRACT");

                    case 73:
                      return getErrorString("Parser.TOKEN.CLASS");

                    case 74:
                      return getErrorString("Parser.TOKEN.MEMBER");

                    case 75:
                      return getErrorString("Parser.TOKEN.STATIC");

                    case 76:
                      return getErrorString("Parser.TOKEN.NAMESPACE");

                    case 77:
                      return getErrorString("Parser.TOKEN.OBLOCKBEGIN");

                    case 78:
                      return getErrorString("Parser.TOKEN.OBLOCKEND");

                    case 79:
                      switch (tid.tag) {
                        case 104:
                        case 28:
                          return getErrorString("Parser.TOKEN.OTHEN");

                        case 139:
                        case 27:
                          return getErrorString("Parser.TOKEN.OELSE");

                        case 160:
                        case 32:
                          return getErrorString("Parser.TOKEN.OLET");

                        case 31:
                        case 157:
                          return getErrorString("Parser.TOKEN.BINDER");

                        case 30:
                          return getErrorString("Parser.TOKEN.ODO");

                        case 26:
                          return getErrorString("Parser.TOKEN.OWITH");

                        case 25:
                          return getErrorString("Parser.TOKEN.OFUNCTION");

                        case 24:
                          return getErrorString("Parser.TOKEN.OFUN");

                        case 23:
                          return getErrorString("Parser.TOKEN.ORESET");

                        case 12:
                          return getErrorString("Parser.TOKEN.ODUMMY");

                        case 129:
                        case 29:
                          return getErrorString("Parser.TOKEN.ODO.BANG");

                        case 161:
                          return getErrorString("Parser.TOKEN.YIELD");

                        case 162:
                          return getErrorString("Parser.TOKEN.YIELD.BANG");

                        case 14:
                          return getErrorString("Parser.TOKEN.OINTERFACE.MEMBER");

                        case 140:
                          return getErrorString("Parser.TOKEN.ELIF");

                        case 98:
                          return getErrorString("Parser.TOKEN.RARROW");

                        case 56:
                          return getErrorString("Parser.TOKEN.SIG");

                        case 55:
                          return getErrorString("Parser.TOKEN.STRUCT");

                        case 144:
                          return getErrorString("Parser.TOKEN.UPCAST");

                        case 145:
                          return getErrorString("Parser.TOKEN.DOWNCAST");

                        case 146:
                          return getErrorString("Parser.TOKEN.NULL");

                        case 147:
                          return getErrorString("Parser.TOKEN.RESERVED");

                        case 148:
                        case 38:
                        case 39:
                          return getErrorString("Parser.TOKEN.MODULE");

                        case 130:
                          return getErrorString("Parser.TOKEN.AND");

                        case 131:
                          return getErrorString("Parser.TOKEN.AS");

                        case 132:
                          return getErrorString("Parser.TOKEN.ASSERT");

                        case 133:
                          return getErrorString("Parser.TOKEN.ASSERT");

                        case 134:
                          return getErrorString("Parser.TOKEN.ASR");

                        case 138:
                          return getErrorString("Parser.TOKEN.DOWNTO");

                        case 120:
                          return getErrorString("Parser.TOKEN.EXCEPTION");

                        case 121:
                          return getErrorString("Parser.TOKEN.FALSE");

                        case 122:
                          return getErrorString("Parser.TOKEN.FOR");

                        case 123:
                          return getErrorString("Parser.TOKEN.FUN");

                        case 124:
                          return getErrorString("Parser.TOKEN.FUNCTION");

                        case 128:
                          return getErrorString("Parser.TOKEN.FINALLY");

                        case 114:
                          return getErrorString("Parser.TOKEN.LAZY");

                        case 115:
                          return getErrorString("Parser.TOKEN.LAZY");

                        case 116:
                          return getErrorString("Parser.TOKEN.MATCH");

                        case 117:
                          return getErrorString("Parser.TOKEN.MUTABLE");

                        case 118:
                          return getErrorString("Parser.TOKEN.NEW");

                        case 119:
                          return getErrorString("Parser.TOKEN.OF");

                        case 101:
                          return getErrorString("Parser.TOKEN.OPEN");

                        case 102:
                          return getErrorString("Parser.TOKEN.OR");

                        case 41:
                          return getErrorString("Parser.TOKEN.VOID");

                        case 40:
                          return getErrorString("Parser.TOKEN.EXTERN");

                        case 111:
                          return getErrorString("Parser.TOKEN.INTERFACE");

                        case 103:
                          return getErrorString("Parser.TOKEN.REC");

                        case 105:
                          return getErrorString("Parser.TOKEN.TO");

                        case 106:
                          return getErrorString("Parser.TOKEN.TRUE");

                        case 107:
                          return getErrorString("Parser.TOKEN.TRY");

                        case 108:
                        case 36:
                        case 37:
                          return getErrorString("Parser.TOKEN.TYPE");

                        case 109:
                          return getErrorString("Parser.TOKEN.VAL");

                        case 110:
                          return getErrorString("Parser.TOKEN.INLINE");

                        case 85:
                          return getErrorString("Parser.TOKEN.WHEN");

                        case 86:
                          return getErrorString("Parser.TOKEN.WHILE");

                        case 87:
                          return getErrorString("Parser.TOKEN.WITH");

                        case 125:
                          return getErrorString("Parser.TOKEN.IF");

                        case 136:
                          return getErrorString("Parser.TOKEN.DO");

                        case 45:
                          return getErrorString("Parser.TOKEN.GLOBAL");

                        case 137:
                          return getErrorString("Parser.TOKEN.DONE");

                        case 126:
                        case 127:
                          return getErrorString("Parser.TOKEN.IN");

                        case 34:
                          return getErrorString("Parser.TOKEN.HIGH.PRECEDENCE.PAREN.APP");

                        case 35:
                          return getErrorString("Parser.TOKEN.HIGH.PRECEDENCE.BRACK.APP");

                        case 135:
                          return getErrorString("Parser.TOKEN.BEGIN");

                        case 141:
                          return getErrorString("Parser.TOKEN.END");

                        case 6:
                        case 5:
                        case 0:
                        case 1:
                        case 2:
                          return getErrorString("Parser.TOKEN.HASH.ENDIF");

                        case 7:
                          return getErrorString("Parser.TOKEN.INACTIVECODE");

                        case 11:
                          return getErrorString("Parser.TOKEN.LEX.FAILURE");

                        case 4:
                          return getErrorString("Parser.TOKEN.WHITESPACE");

                        case 3:
                          return getErrorString("Parser.TOKEN.COMMENT");

                        case 8:
                          return getErrorString("Parser.TOKEN.LINE.COMMENT");

                        case 9:
                          return getErrorString("Parser.TOKEN.STRING.TEXT");

                        case 192:
                          return getErrorString("Parser.TOKEN.BYTEARRAY");

                        case 191:
                          return getErrorString("Parser.TOKEN.STRING");

                        case 190:
                          return getErrorString("Parser.TOKEN.KEYWORD_STRING");

                        case 10:
                          return getErrorString("Parser.TOKEN.EOF");

                        case 113:
                          return getErrorString("Parser.TOKEN.CONST");

                        case 13:
                          return getErrorString("Parser.TOKEN.FIXED");

                        default:
                          const result = toText(printf("%+A"))(tid);
                          return result;
                      }

                  }
                };

                const matchValue = ctxt.CurrentToken;

                if (matchValue != null) {
                  const matchValue_1 = [tokenTagToTokenId(tagOfToken(getValue(matchValue))), getValue(matchValue)];

                  const activePatternResult48501 = _EndOfStructuredConstructToken___(matchValue_1[0]);

                  if (activePatternResult48501 != null) {
                    os_1.Append(OBlockEndSentenceE().Format);
                  } else {
                    const $var23 = matchValue_1[0].tag === 11 ? matchValue_1[1].tag === 11 ? [0] : [1, matchValue_1[0]] : [1, matchValue_1[0]];

                    switch ($var23[0]) {
                      case 0:
                        const str = matchValue_1[1].data;
                        (clo1_1 = Microsoft.FSharp.Core.Printf.bprintf(os_1), CurriedLambda(function (arg10_1) {
                          return CurriedLambda(clo1_1)(arg10_1);
                        }))(printf("%s"), str);
                        break;

                      case 1:
                        os_1.Append(UnexpectedE().Format(tokenIdToText($var23[1])));
                        break;
                    }
                  }

                  let foundInContext;

                  const _NONTERM_Category_Expr___ = function (_arg1) {
                    switch (_arg1.tag) {
                      case 208:
                      case 206:
                      case 217:
                      case 209:
                      case 207:
                      case 205:
                      case 194:
                      case 221:
                      case 187:
                      case 9:
                        return makeSome();

                      default:
                        return null;
                    }
                  };

                  const _NONTERM_Category_Pattern___ = function (_arg2) {
                    const $var24 = _arg2.tag === 175 ? [0] : _arg2.tag === 180 ? [0] : _arg2.tag === 178 ? [0] : [1];

                    switch ($var24[0]) {
                      case 0:
                        return makeSome();

                      case 1:
                        return null;
                    }
                  };

                  const _NONTERM_Category_IfThenElse___ = function (_arg3) {
                    const $var25 = _arg3.tag === 203 ? [0] : _arg3.tag === 204 ? [0] : _arg3.tag === 202 ? [0] : [1];

                    switch ($var25[0]) {
                      case 0:
                        return makeSome();

                      case 1:
                        return null;
                    }
                  };

                  const _NONTERM_Category_SignatureFile___ = function (_arg4) {
                    const $var26 = _arg4.tag === 16 ? [0] : _arg4.tag === 26 ? [0] : _arg4.tag === 25 ? [0] : [1];

                    switch ($var26[0]) {
                      case 0:
                        return makeSome();

                      case 1:
                        return null;
                    }
                  };

                  const _NONTERM_Category_ImplementationFile___ = function (_arg5) {
                    const $var27 = _arg5.tag === 46 ? [0] : _arg5.tag === 49 ? [0] : _arg5.tag === 47 ? [0] : [1];

                    switch ($var27[0]) {
                      case 0:
                        return makeSome();

                      case 1:
                        return null;
                    }
                  };

                  const _NONTERM_Category_Definition___ = function (_arg6) {
                    switch (_arg6.tag) {
                      case 50:
                      case 56:
                      case 8:
                      case 54:
                      case 53:
                        return makeSome();

                      default:
                        return null;
                    }
                  };

                  const _NONTERM_Category_Type___ = function (_arg7) {
                    const $var28 = _arg7.tag === 257 ? [0] : _arg7.tag === 259 ? [0] : [1];

                    switch ($var28[0]) {
                      case 0:
                        return makeSome();

                      case 1:
                        return null;
                    }
                  };

                  const _NONTERM_Category_Interaction___ = function (_arg8) {
                    const $var29 = _arg8.tag === 7 ? [0] : _arg8.tag === 5 ? [0] : _arg8.tag === 2 ? [0] : [1];

                    switch ($var29[0]) {
                      case 0:
                        return makeSome();

                      case 1:
                        return null;
                    }
                  };

                  foundInContext = exists(function (prods) {
                    const matchValue_2 = toList(create(map(function (_arg9) {
                      const activePatternResult48517 = _NONTERM_Category_Type___(_arg9);

                      if (activePatternResult48517 != null) {
                        return new nonTerminalId(257);
                      } else {
                        const activePatternResult48516 = _NONTERM_Category_Expr___(_arg9);

                        if (activePatternResult48516 != null) {
                          return new nonTerminalId(194);
                        } else {
                          const activePatternResult48515 = _NONTERM_Category_Pattern___(_arg9);

                          if (activePatternResult48515 != null) {
                            return new nonTerminalId(178);
                          } else {
                            const activePatternResult48514 = _NONTERM_Category_IfThenElse___(_arg9);

                            if (activePatternResult48514 != null) {
                              return new nonTerminalId(203);
                            } else {
                              const activePatternResult48513 = _NONTERM_Category_SignatureFile___(_arg9);

                              if (activePatternResult48513 != null) {
                                return new nonTerminalId(16);
                              } else {
                                const activePatternResult48512 = _NONTERM_Category_ImplementationFile___(_arg9);

                                if (activePatternResult48512 != null) {
                                  return new nonTerminalId(46);
                                } else {
                                  const activePatternResult48511 = _NONTERM_Category_Definition___(_arg9);

                                  if (activePatternResult48511 != null) {
                                    return new nonTerminalId(56);
                                  } else {
                                    const activePatternResult48510 = _NONTERM_Category_Interaction___(_arg9);

                                    if (activePatternResult48510 != null) {
                                      return new nonTerminalId(5);
                                    } else {
                                      return _arg9;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }, function (list) {
                      return map(function (prodIdx) {
                        return prodIdxToNonTerminal(prodIdx);
                      }, list);
                    }(prods)), new Comparer((x, y) => x.CompareTo(y))));
                    let $var30;

                    if (matchValue_2.tail != null) {
                      if (matchValue_2.head.tag === 5) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [0];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 13) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [1];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 132) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [2];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 129) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [3];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 154) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [4];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 141) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [5];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 83) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [6];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 139) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [7];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 40) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [8];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 27) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [9];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 32) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [10];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 248) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [11];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 123) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [12];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 145) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [13];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 240) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [14];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 99) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [14];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 203) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [15];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 204) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [15];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 202) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [15];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 138) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [16];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 22) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [17];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 199) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [18];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 214) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [19];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 234) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [20];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 70) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [21];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 135) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [22];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 68) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [23];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 63) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [24];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 215) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [25];
                        } else {
                          $var30 = [28];
                        }
                      } else if (matchValue_2.head.tag === 118) {
                        if (matchValue_2.tail.tail == null) {
                          $var30 = [26];
                        } else {
                          $var30 = [28];
                        }
                      } else {
                        const activePatternResult48524 = _NONTERM_Category_ImplementationFile___(matchValue_2.head);

                        if (activePatternResult48524 != null) {
                          if (matchValue_2.tail.tail == null) {
                            $var30 = [27];
                          } else {
                            $var30 = [28];
                          }
                        } else {
                          $var30 = [28];
                        }
                      }
                    } else {
                      $var30 = [28];
                    }

                    switch ($var30[0]) {
                      case 0:
                        os_1.Append(NONTERM_interactionE().Format);
                        return true;

                      case 1:
                        os_1.Append(NONTERM_hashDirectiveE().Format);
                        return true;

                      case 2:
                        os_1.Append(NONTERM_fieldDeclE().Format);
                        return true;

                      case 3:
                        os_1.Append(NONTERM_unionCaseReprE().Format);
                        return true;

                      case 4:
                        os_1.Append(NONTERM_localBindingE().Format);
                        return true;

                      case 5:
                        os_1.Append(NONTERM_hardwhiteLetBindingsE().Format);
                        return true;

                      case 6:
                        os_1.Append(NONTERM_classDefnMemberE().Format);
                        return true;

                      case 7:
                        os_1.Append(NONTERM_defnBindingsE().Format);
                        return true;

                      case 8:
                        os_1.Append(NONTERM_classMemberSpfnE().Format);
                        return true;

                      case 9:
                        os_1.Append(NONTERM_valSpfnE().Format);
                        return true;

                      case 10:
                        os_1.Append(NONTERM_tyconSpfnE().Format);
                        return true;

                      case 11:
                        os_1.Append(NONTERM_anonLambdaExprE().Format);
                        return true;

                      case 12:
                        os_1.Append(NONTERM_attrUnionCaseDeclE().Format);
                        return true;

                      case 13:
                        os_1.Append(NONTERM_cPrototypeE().Format);
                        return true;

                      case 14:
                        os_1.Append(NONTERM_objectImplementationMembersE().Format);
                        return true;

                      case 15:
                        os_1.Append(NONTERM_ifExprCasesE().Format);
                        return true;

                      case 16:
                        os_1.Append(NONTERM_openDeclE().Format);
                        return true;

                      case 17:
                        os_1.Append(NONTERM_fileModuleSpecE().Format);
                        return true;

                      case 18:
                        os_1.Append(NONTERM_patternClausesE().Format);
                        return true;

                      case 19:
                        os_1.Append(NONTERM_beginEndExprE().Format);
                        return true;

                      case 20:
                        os_1.Append(NONTERM_recdExprE().Format);
                        return true;

                      case 21:
                        os_1.Append(NONTERM_tyconDefnE().Format);
                        return true;

                      case 22:
                        os_1.Append(NONTERM_exconCoreE().Format);
                        return true;

                      case 23:
                        os_1.Append(NONTERM_typeNameInfoE().Format);
                        return true;

                      case 24:
                        os_1.Append(NONTERM_attributeListE().Format);
                        return true;

                      case 25:
                        os_1.Append(NONTERM_quoteExprE().Format);
                        return true;

                      case 26:
                        os_1.Append(NONTERM_typeConstraintE().Format);
                        return true;

                      case 27:
                        os_1.Append(NONTERM_Category_ImplementationFileE().Format);
                        return true;

                      case 28:
                        let $var31;

                        if (matchValue_2.tail != null) {
                          const activePatternResult48523 = _NONTERM_Category_Definition___(matchValue_2.head);

                          if (activePatternResult48523 != null) {
                            if (matchValue_2.tail.tail == null) {
                              $var31 = [0];
                            } else {
                              $var31 = [1];
                            }
                          } else {
                            $var31 = [1];
                          }
                        } else {
                          $var31 = [1];
                        }

                        switch ($var31[0]) {
                          case 0:
                            os_1.Append(NONTERM_Category_DefinitionE().Format);
                            return true;

                          case 1:
                            let $var32;

                            if (matchValue_2.tail != null) {
                              const activePatternResult48522 = _NONTERM_Category_SignatureFile___(matchValue_2.head);

                              if (activePatternResult48522 != null) {
                                if (matchValue_2.tail.tail == null) {
                                  $var32 = [0];
                                } else {
                                  $var32 = [1];
                                }
                              } else {
                                $var32 = [1];
                              }
                            } else {
                              $var32 = [1];
                            }

                            switch ($var32[0]) {
                              case 0:
                                os_1.Append(NONTERM_Category_SignatureFileE().Format);
                                return true;

                              case 1:
                                let $var33;

                                if (matchValue_2.tail != null) {
                                  const activePatternResult48521 = _NONTERM_Category_Pattern___(matchValue_2.head);

                                  if (activePatternResult48521 != null) {
                                    if (matchValue_2.tail.tail == null) {
                                      $var33 = [0];
                                    } else {
                                      $var33 = [1];
                                    }
                                  } else {
                                    $var33 = [1];
                                  }
                                } else {
                                  $var33 = [1];
                                }

                                switch ($var33[0]) {
                                  case 0:
                                    os_1.Append(NONTERM_Category_PatternE().Format);
                                    return true;

                                  case 1:
                                    let $var34;

                                    if (matchValue_2.tail != null) {
                                      const activePatternResult48520 = _NONTERM_Category_Expr___(matchValue_2.head);

                                      if (activePatternResult48520 != null) {
                                        if (matchValue_2.tail.tail == null) {
                                          $var34 = [0];
                                        } else {
                                          $var34 = [1];
                                        }
                                      } else {
                                        $var34 = [1];
                                      }
                                    } else {
                                      $var34 = [1];
                                    }

                                    switch ($var34[0]) {
                                      case 0:
                                        os_1.Append(NONTERM_Category_ExprE().Format);
                                        return true;

                                      case 1:
                                        let $var35;

                                        if (matchValue_2.tail != null) {
                                          const activePatternResult48519 = _NONTERM_Category_Type___(matchValue_2.head);

                                          if (activePatternResult48519 != null) {
                                            if (matchValue_2.tail.tail == null) {
                                              $var35 = [0];
                                            } else {
                                              $var35 = [1];
                                            }
                                          } else {
                                            $var35 = [1];
                                          }
                                        } else {
                                          $var35 = [1];
                                        }

                                        switch ($var35[0]) {
                                          case 0:
                                            os_1.Append(NONTERM_Category_TypeE().Format);
                                            return true;

                                          case 1:
                                            const $var36 = matchValue_2.tail != null ? matchValue_2.head.tag === 273 ? matchValue_2.tail.tail == null ? [0] : [1] : [1] : [1];

                                            switch ($var36[0]) {
                                              case 0:
                                                os_1.Append(NONTERM_typeArgsActualE().Format);
                                                return true;

                                              case 1:
                                                return false;
                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }
                  }, ctxt.ReducibleProductions);
                  foundInContext;

                  const fix = function (s) {
                    return replace(replace(replace(s, Microsoft.FSharp.Compiler.SR.GetString("FixKeyword"), ""), Microsoft.FSharp.Compiler.SR.GetString("FixSymbol"), ""), Microsoft.FSharp.Compiler.SR.GetString("FixReplace"), "");
                  };

                  const matchValue_3 = toList(create(function (list_1) {
                    return map(tokenIdToText, list_1);
                  }(filter(function (_arg10) {
                    const $var37 = _arg10.tag === 194 ? [0] : _arg10.tag === 10 ? [0] : [1];

                    switch ($var37[0]) {
                      case 0:
                        return false;

                      case 1:
                        return true;
                    }
                  }, function (list_2) {
                    return map(function (tokenIdx) {
                      return tokenTagToTokenId(tokenIdx);
                    }, list_2);
                  }(ctxt.ShiftTokens))), new Comparer(comparePrimitives)));
                  const $var38 = matchValue_3.tail != null ? matchValue_3.tail.tail != null ? matchValue_3.tail.tail.tail != null ? matchValue_3.tail.tail.tail.tail == null ? [2, matchValue_3.head, matchValue_3.tail.head, matchValue_3.tail.tail.head] : [3] : [1, matchValue_3.head, matchValue_3.tail.head] : [0, matchValue_3.head] : [3];

                  switch ($var38[0]) {
                    case 0:
                      os_1.Append(TokenName1E().Format(fix($var38[1])));
                      break;

                    case 1:
                      os_1.Append(TokenName1TokenName2E().Format(fix($var38[1]), fix($var38[2])));
                      break;

                    case 2:
                      os_1.Append(TokenName1TokenName2TokenName3E().Format(fix($var38[1]), fix($var38[2]), fix($var38[3])));
                      break;

                    case 3:
                      break;
                  }
                } else {
                  os_1.Append(UnexpectedEndOfInputE().Format);
                }

                break;

              case 35:
                const patternInput_16 = PrettyTypes.PrettifyType($var21[1].g, $var21[2]);

                if (isTyparTy($var21[1].g, patternInput_16[0])) {
                  os_1.Append(RuntimeCoercionSourceSealed1E().Format(stringOfTy($var21[1], patternInput_16[0])));
                } else {
                  os_1.Append(RuntimeCoercionSourceSealed2E().Format(stringOfTy($var21[1], patternInput_16[0])));
                }

                break;

              case 36:
                const patternInput_17 = PrettyTypes.PrettifyType($var21[1].g, $var21[2]);
                os_1.Append(CoercionTargetSealedE().Format(stringOfTy($var21[1], patternInput_17[0])));
                break;

              case 37:
                os_1.Append(UpcastUnnecessaryE().Format);
                break;

              case 38:
                os_1.Append(TypeTestUnnecessaryE().Format);
                break;

              case 39:
                (clo1_2 = Microsoft.FSharp.Core.Printf.bprintf(os_1), CurriedLambda(function (arg10_2) {
                  return CurriedLambda(clo1_2)(arg10_2);
                }))(printf("%s"), $var21[1]);
                break;

              case 40:
                const sig1 = DispatchSlotChecking.FormatOverride($var21[2], $var21[4]);

                if ($var21[6] != null) {
                  const hasUnitTType_app = function (types) {
                    hasUnitTType_app: while (true) {
                      const $var39 = types.tail == null ? [2] : types.head.tag === 1 ? types.head.data[1].tail == null ? [0, types.head.data[0], types.tail] : [1, types.tail] : [1, types.tail];

                      switch ($var39[0]) {
                        case 0:
                          const matchValue_4 = $var39[1].TypeAbbrev;
                          const $var40 = matchValue_4 != null ? isUnitTy($var21[3], getValue(matchValue_4)) ? [0, getValue(matchValue_4)] : [1] : [1];

                          switch ($var40[0]) {
                            case 0:
                              return true;

                            case 1:
                              types = $var39[2];
                              continue hasUnitTType_app;
                          }

                        case 1:
                          types = $var39[1];
                          continue hasUnitTType_app;

                        case 2:
                          return false;
                      }
                    }
                  };

                  const matchValue_5 = getValue($var21[6]).ApparentEnclosingType;
                  const $var41 = matchValue_5.tag === 1 ? (matchValue_5.data[0].IsFSharpInterfaceTycon ? hasUnitTType_app(matchValue_5.data[1]) : false) ? [0, matchValue_5.data[0], matchValue_5.data[1]] : [1] : [1];

                  switch ($var41[0]) {
                    case 0:
                      os_1.Append(OverrideDoesntOverride4E().Format(sig1));
                      break;

                    case 1:
                      os_1.Append(OverrideDoesntOverride2E().Format(sig1));
                      const sig2 = DispatchSlotChecking.FormatMethInfoSig($var21[3], $var21[1], $var21[5], $var21[2], getValue($var21[6]));

                      if (sig1 !== sig2) {
                        os_1.Append(OverrideDoesntOverride3E().Format(sig2));
                      }

                      break;
                  }
                } else {
                  os_1.Append(OverrideDoesntOverride1E().Format(sig1));
                }

                break;

              case 41:
                os_1.Append(UnionCaseWrongArgumentsE().Format($var21[2], $var21[1]));
                break;

              case 42:
                os_1.Append(UnionPatternsBindDifferentNamesE().Format);
                break;

              case 43:
                const patternInput_18 = minimalStringsOfTwoValues($var21[1], $var21[3], $var21[5]);
                os_1.Append($var21[2]([fullDisplayTextOfModRef($var21[4]), patternInput_18[0], patternInput_18[1]]));
                break;

              case 44:
                os_1.Append($var21[2]([stringOfUnionCase($var21[1], $var21[3]), stringOfUnionCase($var21[1], $var21[4])]));
                break;

              case 45:
                os_1.Append($var21[2]([stringOfExnDef($var21[1], $var21[3]), stringOfExnDef($var21[1], $var21[4])]));
                break;

              case 46:
                os_1.Append($var21[2]([stringOfRecdField($var21[1], $var21[3]), stringOfRecdField($var21[1], $var21[4])]));
                break;

              case 47:
                const nsb = new System.Text.StringBuilder();
                $var21[3](nsb);
                os_1.Append(RequiredButNotSpecifiedE().Format(fullDisplayTextOfModRef($var21[2]), $var21[1], toString(nsb)));
                break;

              case 48:
                os_1.Append(UseOfAddressOfOperatorE().Format);
                break;

              case 49:
                os_1.Append(DefensiveCopyWarningE().Format($var21[1]));
                break;

              case 50:
                os_1.Append(DeprecatedThreadStaticBindingWarningE().Format);
                break;

              case 51:
                const patternInput_19 = PrettyTypes.PrettifyType($var21[1].g, $var21[2]);
                const errorText = FunctionValueUnexpectedE().Format(stringOfTy($var21[1], patternInput_19[0]));
                os_1.Append(errorText);
                break;

              case 52:
                const patternInput_20 = PrettyTypes.PrettifyType($var21[1].g, $var21[2]);
                const warningText = UnitTypeExpectedE().Format(stringOfTy($var21[1], patternInput_20[0]));
                os_1.Append(warningText);
                break;

              case 53:
                const patternInput_21 = PrettyTypes.PrettifyType($var21[1].g, $var21[2]);
                const warningText_1 = UnitTypeExpectedWithEqualityE().Format(stringOfTy($var21[1], patternInput_21[0]));
                os_1.Append(warningText_1);
                break;

              case 54:
                const patternInput_22 = PrettyTypes.PrettifyType($var21[2].g, $var21[4]);
                const warningText_2 = UnitTypeExpectedWithPossiblePropertySetterE().Format(stringOfTy($var21[2], patternInput_22[0]), $var21[1], $var21[3]);
                os_1.Append(warningText_2);
                break;

              case 55:
                const patternInput_23 = PrettyTypes.PrettifyType($var21[2].g, $var21[4]);
                const warningText_3 = $var21[3] ? UnitTypeExpectedWithPossibleAssignmentToMutableE().Format(stringOfTy($var21[2], patternInput_23[0]), $var21[1]) : UnitTypeExpectedWithPossibleAssignmentE().Format(stringOfTy($var21[2], patternInput_23[0]), $var21[1]);
                os_1.Append(warningText_3);
                break;

              case 56:
                os_1.Append(RecursiveUseCheckedAtRuntimeE().Format);
                break;

              case 57:
                os_1.Append(LetRecUnsound1E().Format($var21[1].DisplayName));
                break;

              case 58:
                const bos = new System.Text.StringBuilder();
                iterate(function (v) {
                  bos.Append(LetRecUnsoundInnerE().Format(v.DisplayName));
                }, append($var21[1].tail, ofArray([$var21[1].head])));
                os_1.Append(LetRecUnsound2E().Format($var21[1].head.DisplayName, toString(bos)));
                break;

              case 59:
                os_1.Append(LetRecEvaluatedOutOfOrderE().Format);
                break;

              case 60:
                os_1.Append(LetRecCheckedAtRuntimeE().Format);
                break;

              case 61:
                os_1.Append(SelfRefObjCtor1E().Format);
                break;

              case 62:
                os_1.Append(SelfRefObjCtor2E().Format);
                break;

              case 63:
                os_1.Append(VirtualAugmentationOnNullValuedTypeE().Format);
                break;

              case 64:
                os_1.Append(NonVirtualAugmentationOnNullValuedTypeE().Format);
                break;

              case 65:
                os_1.Append(NonUniqueInferredAbstractSlot1E().Format($var21[1]));
                const ty1_1 = $var21[2].ApparentEnclosingType;
                const ty2 = $var21[3].ApparentEnclosingType;
                const patternInput_24 = minimalStringsOfTwoTypes($var21[4], ty1_1, ty2);
                os_1.Append(NonUniqueInferredAbstractSlot2E().Format);

                if (patternInput_24[0] !== patternInput_24[1]) {
                  os_1.Append(NonUniqueInferredAbstractSlot3E().Format(patternInput_24[0], patternInput_24[1]));
                }

                os_1.Append(NonUniqueInferredAbstractSlot4E().Format);
                break;

              case 66:
                os_1.Append($var21[1]);
                break;

              case 67:
                os_1.Append(DecompileOpName($var21[2]));
                const filtered_1 = FilterPredictions($var21[1], $var21[3]);

                if (!(filtered_1.tail == null)) {
                  os_1.Append(FormatPredictions(DecompileOpName, filtered_1));
                }

                break;

              case 68:
                os_1.Append($var21[1]);
                break;

              case 69:
                $var21[1];
                const f1 = Microsoft.FSharp.Compiler.SR.GetString("Failure1");
                const f2 = Microsoft.FSharp.Compiler.SR.GetString("Failure2");

                if ($var21[2] === f1) {
                  os_1.Append(Failure3E().Format($var21[2]));
                } else if ($var21[2] === f2) {
                  os_1.Append(Failure3E().Format($var21[2]));
                } else {
                  os_1.Append(Failure4E().Format($var21[2]));
                }

                break;

              case 70:
                const $var42 = error instanceof FullAbstraction ? [0, error.Data0] : error instanceof WrappedError ? [1, error.Data0] : error instanceof MatchIncomplete ? [2, error.Data1, error.Data0] : error instanceof EnumMatchIncomplete ? [3, error.Data1, error.Data0] : error instanceof RuleNeverMatched ? [4] : error instanceof ValNotMutable ? [5, error.Data1] : error instanceof ValNotLocal ? [6] : error instanceof ObsoleteError ? [7, error.Data0] : error instanceof ObsoleteWarning ? [7, error.Data0] : error instanceof Experimental ? [8, error.Data0] : error instanceof PossibleUnverifiableCode ? [9] : error instanceof UserCompilerMessage ? [10, error.Data0] : error instanceof Deprecated ? [11, error.Data0] : error instanceof LibraryUseOnly ? [12] : error instanceof MissingFields ? [13, error.Data0] : error instanceof ValueRestriction ? [14, error.Data0, error.Data1, error.Data2] : error instanceof RecoverableParseError ? [15] : error instanceof ReservedKeyword ? [16, error.Data0] : error instanceof IndentationProblem ? [17, error.Data0] : error instanceof OverrideInIntrinsicAugmentation ? [18] : error instanceof OverrideInExtrinsicAugmentation ? [19] : error instanceof IntfImplInIntrinsicAugmentation ? [20] : error instanceof IntfImplInExtrinsicAugmentation ? [21] : error instanceof UnresolvedReferenceError ? [22, error.Data0] : error instanceof UnresolvedReferenceNoRange ? [22, error.Data0] : error instanceof UnresolvedPathReference ? [23, error.Data0, error.Data1] : error instanceof UnresolvedPathReferenceNoRange ? [23, error.Data0, error.Data1] : error instanceof DeprecatedCommandLineOptionFull ? [24, error.Data0] : error instanceof DeprecatedCommandLineOptionForHtmlDoc ? [25, error.Data0] : error instanceof DeprecatedCommandLineOptionSuggestAlternative ? [26, error.Data1, error.Data0] : error instanceof InternalCommandLineOption ? [27, error.Data0] : error instanceof DeprecatedCommandLineOptionNoDescription ? [28, error.Data0] : error instanceof HashIncludeNotAllowedInNonScript ? [29] : error instanceof HashReferenceNotAllowedInNonScript ? [30] : error instanceof HashDirectiveNotAllowedInNonScript ? [31] : error instanceof FileNameNotResolved ? [32, error.Data0, error.Data1] : error instanceof AssemblyNotResolved ? [33, error.Data0] : error instanceof IllegalFileNameChar ? [34, error.Data0, error.Data1] : error instanceof HashLoadedSourceHasIssues ? [35, error.Data1, error.Data0] : error instanceof HashLoadedScriptConsideredSource ? [36] : error instanceof InvalidInternalsVisibleToAssemblyName ? [37, error.Data0, error.Data1] : error instanceof LoadedSourceNotFoundIgnoring ? [38, error.Data0] : error instanceof MSBuildReferenceResolutionWarning ? [39, error.Data0, error.Data1] : error instanceof MSBuildReferenceResolutionError ? [39, error.Data0, error.Data1] : [40, error];

                switch ($var42[0]) {
                  case 0:
                    os_1.Append(FullAbstractionE().Format($var42[1]));
                    break;

                  case 1:
                    OutputExceptionR(os_1, $var42[1]);
                    break;

                  case 2:
                    os_1.Append(MatchIncomplete1E().Format);

                    if ($var42[1] != null) {
                      if (getValue($var42[1])[1]) {
                        os_1.Append(MatchIncomplete3E().Format(getValue($var42[1])[0]));
                      } else {
                        os_1.Append(MatchIncomplete2E().Format(getValue($var42[1])[0]));
                      }
                    }

                    if ($var42[2]) {
                      os_1.Append(MatchIncomplete4E().Format);
                    }

                    break;

                  case 3:
                    os_1.Append(EnumMatchIncomplete1E().Format);

                    if ($var42[1] != null) {
                      if (getValue($var42[1])[1]) {
                        os_1.Append(MatchIncomplete3E().Format(getValue($var42[1])[0]));
                      } else {
                        os_1.Append(MatchIncomplete2E().Format(getValue($var42[1])[0]));
                      }
                    }

                    if ($var42[2]) {
                      os_1.Append(MatchIncomplete4E().Format);
                    }

                    break;

                  case 4:
                    os_1.Append(RuleNeverMatchedE().Format);
                    break;

                  case 5:
                    os_1.Append(ValNotMutableE().Format($var42[1].DisplayName));
                    break;

                  case 6:
                    os_1.Append(ValNotLocalE().Format);
                    break;

                  case 7:
                    os_1.Append(Obsolete1E().Format);

                    if ($var42[1] !== "") {
                      os_1.Append(Obsolete2E().Format($var42[1]));
                    }

                    break;

                  case 8:
                    os_1.Append(ExperimentalE().Format($var42[1]));
                    break;

                  case 9:
                    os_1.Append(PossibleUnverifiableCodeE().Format);
                    break;

                  case 10:
                    os_1.Append($var42[1]);
                    break;

                  case 11:
                    os_1.Append(DeprecatedE().Format($var42[1]));
                    break;

                  case 12:
                    os_1.Append(LibraryUseOnlyE().Format);
                    break;

                  case 13:
                    os_1.Append(MissingFieldsE().Format(join(",", $var42[1]) + "."));
                    break;

                  case 14:
                    const denv = new DisplayEnv($var42[1].includeStaticParametersInTypeNames, $var42[1].openTopPathsSorted, $var42[1].openTopPathsRaw, $var42[1].shortTypeNames, $var42[1].suppressNestedTypes, $var42[1].maxMembers, $var42[1].showObsoleteMembers, $var42[1].showHiddenMembers, $var42[1].showTyparBinding, true, $var42[1].suppressInlineKeyword, $var42[1].suppressMutableKeyword, $var42[1].showMemberContainers, $var42[1].shortConstraints, $var42[1].useColonForReturnType, $var42[1].showAttributes, $var42[1].showOverrides, $var42[1].showConstraintTyparAnnotations, $var42[1].abbreviateAdditionalConstraints, $var42[1].showTyparDefaultConstraints, $var42[1].g, $var42[1].contextAccessibility, $var42[1].generatedValueLayout);
                    const tau = $var42[3].TauType;

                    if ($var42[2]) {
                      if (isFunTy(denv.g, tau) ? arityOfVal($var42[3]).HasNoArgs : false) {
                        os_1.Append(ValueRestriction1E().Format($var42[3].DisplayName, stringOfQualifiedValOrMember(denv, $var42[3]), $var42[3].DisplayName));
                      } else {
                        os_1.Append(ValueRestriction2E().Format($var42[3].DisplayName, stringOfQualifiedValOrMember(denv, $var42[3]), $var42[3].DisplayName));
                      }
                    } else {
                      const matchValue_6 = $var42[3].MemberInfo;
                      const $var43 = matchValue_6 != null ? (() => {
                        const matchValue_7 = getValue(matchValue_6).MemberFlags.MemberKind;
                        const $var44 = matchValue_7.tag === 3 ? [0] : matchValue_7.tag === 4 ? [0] : matchValue_7.tag === 1 ? [0] : [1];

                        switch ($var44[0]) {
                          case 0:
                            return true;

                          case 1:
                            return false;
                        }
                      })() ? [0, getValue(matchValue_6)] : [1] : [1];

                      switch ($var43[0]) {
                        case 0:
                          os_1.Append(ValueRestriction3E().Format(stringOfQualifiedValOrMember(denv, $var42[3])));
                          break;

                        case 1:
                          if (isFunTy(denv.g, tau) ? arityOfVal($var42[3]).HasNoArgs : false) {
                            os_1.Append(ValueRestriction4E().Format($var42[3].DisplayName, stringOfQualifiedValOrMember(denv, $var42[3]), $var42[3].DisplayName));
                          } else {
                            os_1.Append(ValueRestriction5E().Format($var42[3].DisplayName, stringOfQualifiedValOrMember(denv, $var42[3]), $var42[3].DisplayName));
                          }

                          break;
                      }
                    }

                    break;

                  case 15:
                    os_1.Append(RecoverableParseErrorE().Format);
                    break;

                  case 16:
                    os_1.Append(ReservedKeywordE().Format($var42[1]));
                    break;

                  case 17:
                    os_1.Append(IndentationProblemE().Format($var42[1]));
                    break;

                  case 18:
                    os_1.Append(OverrideInIntrinsicAugmentationE().Format);
                    break;

                  case 19:
                    os_1.Append(OverrideInExtrinsicAugmentationE().Format);
                    break;

                  case 20:
                    os_1.Append(IntfImplInIntrinsicAugmentationE().Format);
                    break;

                  case 21:
                    os_1.Append(IntfImplInExtrinsicAugmentationE().Format);
                    break;

                  case 22:
                    os_1.Append(UnresolvedReferenceNoRangeE().Format($var42[1]));
                    break;

                  case 23:
                    os_1.Append(UnresolvedPathReferenceNoRangeE().Format($var42[2], $var42[1]));
                    break;

                  case 24:
                    os_1.Append($var42[1]);
                    break;

                  case 25:
                    os_1.Append(SR.optsDCLOHtmlDoc($var42[1]));
                    break;

                  case 26:
                    os_1.Append(SR.optsDCLODeprecatedSuggestAlternative($var42[2], $var42[1]));
                    break;

                  case 27:
                    os_1.Append(SR.optsInternalNoDescription($var42[1]));
                    break;

                  case 28:
                    os_1.Append(SR.optsDCLONoDescription($var42[1]));
                    break;

                  case 29:
                    os_1.Append(HashIncludeNotAllowedInNonScriptE().Format);
                    break;

                  case 30:
                    os_1.Append(HashReferenceNotAllowedInNonScriptE().Format);
                    break;

                  case 31:
                    os_1.Append(HashDirectiveNotAllowedInNonScriptE().Format);
                    break;

                  case 32:
                    os_1.Append(FileNameNotResolvedE().Format($var42[1], $var42[2]));
                    break;

                  case 33:
                    os_1.Append(AssemblyNotResolvedE().Format($var42[1]));
                    break;

                  case 34:
                    os_1.Append(SR.buildUnexpectedFileNameCharacter($var42[1], $var42[2])[1]);
                    break;

                  case 35:
                    const Emit = function (l) {
                      OutputExceptionR(os_1, l.head);
                    };

                    if ($var42[1].Equals(new List())) {
                      os_1.Append(HashLoadedSourceHasIssues1E().Format);
                      Emit($var42[2]);
                    } else {
                      os_1.Append(HashLoadedSourceHasIssues2E().Format);
                      Emit($var42[1]);
                    }

                    break;

                  case 36:
                    os_1.Append(HashLoadedScriptConsideredSourceE().Format);
                    break;

                  case 37:
                    if ($var42[2] == null) {
                      os_1.Append(InvalidInternalsVisibleToAssemblyName2E().Format($var42[1]));
                    } else {
                      os_1.Append(InvalidInternalsVisibleToAssemblyName1E().Format($var42[1], getValue($var42[2])));
                    }

                    break;

                  case 38:
                    os_1.Append(LoadedSourceNotFoundIgnoringE().Format($var42[1]));
                    break;

                  case 39:
                    os_1.Append(MSBuildReferenceResolutionErrorE().Format($var42[2], $var42[1]));
                    break;

                  case 40:
                    os_1.Append(TargetInvocationExceptionWrapperE().Format($var42[1].message));
                    break;
                }

                break;
            }

            break;
        }

        break;
    }
  };

  OutputExceptionR(os, err.Exception);
}
export function OutputPhasedDiagnostic(os, err, flattenErrors) {
  const buf = new System.Text.StringBuilder();
  OutputPhasedErrorR(buf, err);
  const s = flattenErrors ? NormalizeErrorString(toString(buf)) : toString(buf);
  os.Append(s);
}
export function SanitizeFileName(fileName, implicitIncludeDir) {
  try {
    const fullPath = Shim.FileSystem().GetFullPathShim(fileName);

    if (!(fullPath.indexOf(implicitIncludeDir) === 0)) {
      return fullPath;
    } else {
      return replace(fullPath, implicitIncludeDir + "\\", "");
    }
  } catch (matchValue) {
    return fileName;
  }
}
export function GetWarningNumber(m, s) {
  try {
    if (System.Char.IsDigit(s[0])) {
      return parse(s);
    } else if (startsWith(s, "FS", 4) === true) {
      throw new Error();
    } else {
      return null;
    }
  } catch (err) {
    warning(new _Error(SR.buildInvalidWarningNumber(s), m));
    return null;
  }
}
export function ComputeMakePathAbsolute(implicitIncludeDir, path) {
  try {
    const path_1 = replace(path, "\"", "");

    if (!Shim.FileSystem().IsPathRootedShim(path_1)) {
      return System.IO.Path.Combine(implicitIncludeDir, path_1);
    } else {
      return path_1;
    }
  } catch (matchValue) {
    if (matchValue instanceof Error) {
      return path;
    } else {
      throw matchValue;
    }
  }
}
export class CompilerTarget {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.CompilerTarget",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["WinExe"], ["ConsoleExe"], ["Dll"], ["Module"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

  get IsExe() {
    const $var45 = this.tag === 1 ? [0] : this.tag === 0 ? [0] : [1];

    switch ($var45[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.CompilerTarget", CompilerTarget);
export class ResolveAssemblyReferenceMode {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.ResolveAssemblyReferenceMode",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Speculative"], ["ReportErrors"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.ResolveAssemblyReferenceMode", ResolveAssemblyReferenceMode);
export class CopyFSharpCoreFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.CopyFSharpCoreFlag",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Yes"], ["No"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.CopyFSharpCoreFlag", CopyFSharpCoreFlag);
export class TimeStampCache {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.TimeStampCache",
      properties: {}
    };
  }

  constructor(defaultTimeStamp) {
    this.defaultTimeStamp = defaultTimeStamp;
    this.files = new Map();
    this.projects = create_1(null, fromEqualityComparer(Microsoft.FSharp.Collections.HashIdentity.Reference()));
  }

  GetFileTimeStamp(fileName) {
    const patternInput = tryGetValue(this.files, fileName, null);

    if (patternInput[0]) {
      return patternInput[1];
    } else {
      this.files.set(fileName, this.defaultTimeStamp);
      return this.defaultTimeStamp;
    }
  }

  GetProjectReferenceTimeStamp(pr, ctok) {
    const patternInput = tryGetValue(this.projects, pr, null);

    if (patternInput[0]) {
      return patternInput[1];
    } else {
      const v = defaultArg(pr.TryGetLogicalTimeStamp(this, ctok), this.defaultTimeStamp);
      this.projects.set(pr, v);
      return v;
    }
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.TimeStampCache", TimeStampCache);
export class AssemblyReference {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.AssemblyReference",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["AssemblyReference", range, "string", Option(Interface("Microsoft.FSharp.Compiler.CompileOps.IProjectReference"))]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  get Range() {
    return this.data[0];
  }

  get Text() {
    return this.data[1];
  }

  get ProjectReference() {
    return this.data[2];
  }

  SimpleAssemblyNameIs(name) {
    if (compare(fileNameWithoutExtensionWithValidate(false, this.Text), name, 5) === 0) {
      return true;
    } else {
      const text = this.Text.toLowerCase();

      if (((!(text.indexOf("/") >= 0) ? !(text.indexOf("\\") >= 0) : false) ? !(text.indexOf(".dll") >= 0) : false) ? !(text.indexOf(".exe") >= 0) : false) {
        try {
          const aname = new System.Reflection.AssemblyName(this.Text);
          return aname.Name === name;
        } catch (matchValue) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  ToString() {
    return toText(printf("AssemblyReference(%s)"))(this.Text);
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.AssemblyReference", AssemblyReference);
export class UnresolvedAssemblyReference {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.UnresolvedAssemblyReference",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["UnresolvedAssemblyReference", "string", makeGeneric(List, {
        T: AssemblyReference
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.UnresolvedAssemblyReference", UnresolvedAssemblyReference);
export class ImportedBinary {
  constructor(fileName, rawMetadata, iLAssemblyRefs, iLScopeRef) {
    this.FileName = fileName;
    this.RawMetadata = rawMetadata;
    this.ILAssemblyRefs = iLAssemblyRefs;
    this.ILScopeRef = iLScopeRef;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.ImportedBinary",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        FileName: "string",
        RawMetadata: Interface("Microsoft.FSharp.Compiler.CompileOps.IRawFSharpAssemblyData"),
        ILAssemblyRefs: makeGeneric(List, {
          T: ILAssemblyRef
        }),
        ILScopeRef: ILScopeRef
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.ImportedBinary", ImportedBinary);
export class ImportedAssembly {
  constructor(iLScopeRef, fSharpViewOfMetadata, assemblyAutoOpenAttributes, assemblyInternalsVisibleToAttributes, fSharpOptimizationData) {
    this.ILScopeRef = iLScopeRef;
    this.FSharpViewOfMetadata = fSharpViewOfMetadata;
    this.AssemblyAutoOpenAttributes = assemblyAutoOpenAttributes;
    this.AssemblyInternalsVisibleToAttributes = assemblyInternalsVisibleToAttributes;
    this.FSharpOptimizationData = fSharpOptimizationData;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.ImportedAssembly",
      interfaces: ["FSharpRecord"],
      properties: {
        ILScopeRef: ILScopeRef,
        FSharpViewOfMetadata: CcuThunk,
        AssemblyAutoOpenAttributes: makeGeneric(List, {
          T: "string"
        }),
        AssemblyInternalsVisibleToAttributes: makeGeneric(List, {
          T: "string"
        }),
        FSharpOptimizationData: Any
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.ImportedAssembly", ImportedAssembly);
export class AvailableImportedAssembly {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.AvailableImportedAssembly",
      interfaces: ["FSharpUnion"],
      cases: [["ResolvedImportedAssembly", ImportedAssembly], ["UnresolvedImportedAssembly", "string"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.AvailableImportedAssembly", AvailableImportedAssembly);
export function ReportWarning(options, err) {
  if (warningOn(err, options.WarnLevel, options.WarnOn)) {
    return !exists($var46 => equals(GetDiagnosticNumber(err), $var46), options.WarnOff);
  } else {
    return false;
  }
}
export function ReportWarningAsError(options, err) {
  if (warningOn(err, options.WarnLevel, options.WarnOn) ? !exists($var47 => equals(GetDiagnosticNumber(err), $var47), options.WarnAsWarn) : false) {
    if (options.GlobalWarnAsError ? !exists($var48 => equals(GetDiagnosticNumber(err), $var48), options.WarnOff) : false) {
      return true;
    } else {
      return exists($var49 => equals(GetDiagnosticNumber(err), $var49), options.WarnAsError);
    }
  } else {
    return false;
  }
}
export function GetScopedPragmasForHashDirective(hd) {
  return toList(delay(function () {
    return hd.data[0] === "nowarn" ? collect(function (s) {
      const matchValue = GetWarningNumber(hd.data[2], s);

      if (matchValue != null) {
        return singleton(new ScopedPragma(0, [hd.data[2], getValue(matchValue)]));
      } else {
        return empty();
      }
    }, hd.data[1]) : empty();
  }));
}
export function GetScopedPragmasForInput(input) {
  if (input.tag === 0) {
    const pragmas = input.data.data[3];
    return pragmas;
  } else {
    const pragmas_1 = input.data.data[2];
    return pragmas_1;
  }
}
export class ErrorLoggerFilteringByScopedPragmas extends ErrorLogger {
  [_Symbol.reflection]() {
    return extendInfo(ErrorLoggerFilteringByScopedPragmas, {
      type: "Microsoft.FSharp.Compiler.CompileOps.ErrorLoggerFilteringByScopedPragmas",
      interfaces: [],
      properties: {
        ErrorCount: "number"
      }
    });
  }

  constructor(checkFile, scopedPragmas, errorLogger) {
    super("ErrorLoggerFilteringByScopedPragmas");
    this.checkFile = checkFile;
    this.scopedPragmas = scopedPragmas;
    this.errorLogger = errorLogger;
  }

  DiagnosticSink(phasedError, isError) {
    if (isError) {
      this.errorLogger.DiagnosticSink(phasedError, isError);
    } else {
      let report;
      const warningNum = GetDiagnosticNumber(phasedError) | 0;
      const matchValue = GetRangeOfDiagnostic(phasedError);

      if (matchValue == null) {
        report = true;
      } else {
        report = !exists(pragma => (warningNum === pragma.data[1] ? !this.checkFile ? true : getValue(matchValue).FileIndex === pragma.data[0].FileIndex : false) ? posGeq(getValue(matchValue).Start, pragma.data[0].Start) : false, this.scopedPragmas);
      }

      if (report) {
        this.errorLogger.DiagnosticSink(phasedError, false);
      }
    }
  }

  get ErrorCount() {
    return this.errorLogger.ErrorCount;
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.ErrorLoggerFilteringByScopedPragmas", ErrorLoggerFilteringByScopedPragmas);
export function GetErrorLoggerFilteringByScopedPragmas(checkFile, scopedPragmas, errorLogger) {
  return new ErrorLoggerFilteringByScopedPragmas(checkFile, scopedPragmas, errorLogger);
}
export function CanonicalizeFilename(filename) {
  const basic = fileNameOfPath(filename);
  return _String.capitalize((() => {
    try {
      return chopExtension(basic);
    } catch (matchValue) {
      return basic;
    }
  })());
}
export function IsScript(filename) {
  const lower = _String.lowercase(filename);

  return exists(function (arg10_) {
    return checkSuffix(lower, arg10_);
  }, FSharpScriptFileSuffixes);
}
export function QualFileNameOfModuleName(m, filename, modname) {
  return new QualifiedNameOfFile(0, mkSynId(m, textOfLid(modname) + (IsScript(filename) ? "$fsx" : "")));
}
export function QualFileNameOfFilename(m, filename) {
  return new QualifiedNameOfFile(0, mkSynId(m, CanonicalizeFilename(filename) + (IsScript(filename) ? "$fsx" : "")));
}
export function ComputeQualifiedNameOfFileFromUniquePath(m, p) {
  return new QualifiedNameOfFile(0, mkSynId(m, join("_", p)));
}
export function QualFileNameOfSpecs(filename, specs) {
  const $var50 = specs.tail != null ? specs.head.data[2] ? specs.tail.tail == null ? [0, specs.head.data[7], specs.head.data[0]] : [2] : specs.tail.tail == null ? [1, specs.head.data[7]] : [2] : [2];

  switch ($var50[0]) {
    case 0:
      return QualFileNameOfModuleName($var50[1], filename, $var50[2]);

    case 1:
      return QualFileNameOfFilename($var50[1], filename);

    case 2:
      return QualFileNameOfFilename(mkRange(filename, pos0, pos0), filename);
  }
}
export function QualFileNameOfImpls(filename, specs) {
  const $var51 = specs.tail != null ? specs.head.data[2] ? specs.tail.tail == null ? [0, specs.head.data[7], specs.head.data[0]] : [2] : specs.tail.tail == null ? [1, specs.head.data[7]] : [2] : [2];

  switch ($var51[0]) {
    case 0:
      return QualFileNameOfModuleName($var51[1], filename, $var51[2]);

    case 1:
      return QualFileNameOfFilename($var51[1], filename);

    case 2:
      return QualFileNameOfFilename(mkRange(filename, pos0, pos0), filename);
  }
}
export function PrepandPathToQualFileName(x, _arg1) {
  return ComputeQualifiedNameOfFileFromUniquePath(_arg1.data.idRange, append(pathOfLid(x), ofArray([_arg1.data.idText])));
}
export function PrepandPathToImpl(x, _arg1) {
  return new SynModuleOrNamespace(0, [append(x, _arg1.data[0]), _arg1.data[1], _arg1.data[2], _arg1.data[3], _arg1.data[4], _arg1.data[5], _arg1.data[6], _arg1.data[7]]);
}
export function PrepandPathToSpec(x, _arg1) {
  return new SynModuleOrNamespaceSig(0, [append(x, _arg1.data[0]), _arg1.data[1], _arg1.data[2], _arg1.data[3], _arg1.data[4], _arg1.data[5], _arg1.data[6], _arg1.data[7]]);
}
export function PrependPathToInput(x, inp) {
  if (inp.tag === 1) {
    const specs = inp.data.data[4];
    const q = inp.data.data[1];
    const hd = inp.data.data[3];
    const d = inp.data.data[2];
    const b = inp.data.data[0];
    return new ParsedInput(1, new ParsedSigFileInput(0, [b, PrepandPathToQualFileName(x, q), d, hd, map(function (arg10_) {
      return PrepandPathToSpec(x, arg10_);
    }, specs)]));
  } else {
    const q_1 = inp.data.data[2];
    const impls = inp.data.data[5];
    const hd_1 = inp.data.data[4];
    const e = inp.data.data[6];
    const d_1 = inp.data.data[3];
    const c = inp.data.data[1];
    const b_1 = inp.data.data[0];
    return new ParsedInput(0, new ParsedImplFileInput(0, [b_1, c, PrepandPathToQualFileName(x, q_1), d_1, hd_1, map(function (arg10__1) {
      return PrepandPathToImpl(x, arg10__1);
    }, impls), e]));
  }
}
export function ComputeAnonModuleName(check, defaultNamespace, filename, m) {
  const modname = CanonicalizeFilename(filename);

  if (check ? !forAll(function (c) {
    return System.Char.IsLetterOrDigit(c) ? true : c === "_";
  }, modname) : false) {
    if (!(endsWith(filename, "fsx", 5) ? true : endsWith(filename, "fsscript", 5))) {
      warning(new _Error(SR.buildImplicitModuleIsNotLegalIdentifier(modname, fileNameOfPath(filename)), m));
    }
  }

  const combined = defaultNamespace != null ? textOfPath(ofArray([getValue(defaultNamespace), modname])) : modname;
  let anonymousModuleNameRange;
  const filename_1 = m.FileName;
  anonymousModuleNameRange = mkRange(filename_1, pos0, pos0);
  return pathToSynLid(anonymousModuleNameRange, splitNamespace(combined));
}
export function PostParseModuleImpl(_i, defaultNamespace, isLastCompiland, filename, impl) {
  if (impl.tag === 0) {
    const lower = _String.lowercase(filename);

    if (!(isLastCompiland[0] ? isLastCompiland[1] : false) ? !exists(function (arg10_) {
      return checkSuffix(lower, arg10_);
    }, doNotRequireNamespaceOrModuleSuffixes) : false) {
      const $var52 = impl.data[0].tail != null ? impl.data[0].head.tag === 1 ? [0] : [1] : [1];

      switch ($var52[0]) {
        case 0:
          errorR(new _Error(SR.noEqualSignAfterModule(), trimRangeToLine(impl.data[1])));
          break;

        case 1:
          errorR(new _Error(SR.buildMultiFileRequiresNamespaceOrModule(), trimRangeToLine(impl.data[1])));
          break;
      }
    }

    const modname = ComputeAnonModuleName(!(impl.data[0].tail == null), defaultNamespace, filename, trimRangeToLine(impl.data[1]));
    return new SynModuleOrNamespace(0, [modname, false, true, impl.data[0], PreXmlDoc.Empty, new List(), null, impl.data[1]]);
  } else if (impl.tag === 2) {
    let lid;
    const $var53 = impl.data[0].tail != null ? impl.data[0].head.idText === "`global`" ? [0, impl.data[0].head, impl.data[0].tail] : [1] : [1];

    switch ($var53[0]) {
      case 0:
        lid = $var53[2];
        break;

      case 1:
        lid = impl.data[0];
        break;
    }

    return new SynModuleOrNamespace(0, [lid, impl.data[1], impl.data[2], impl.data[3], impl.data[4], impl.data[5], null, impl.data[6]]);
  } else {
    const xmlDoc = impl.data.data[4];
    const m = impl.data.data[7];
    const lid_1 = impl.data.data[0];
    const isRec = impl.data.data[1];
    const isModule = impl.data.data[2];
    const decls = impl.data.data[3];
    const attribs = impl.data.data[5];
    const access = impl.data.data[6];
    let lid_2;
    const $var54 = lid_1.tail != null ? lid_1.tail.tail == null ? (isModule ? lid_1.head.idText === "`global`" : false) ? [0, lid_1.head] : [1] : [1] : [1];

    switch ($var54[0]) {
      case 0:
        lid_2 = error_1(new _Error(SR.buildInvalidModuleOrNamespaceName(), $var54[1].idRange));
        break;

      case 1:
        const $var55 = lid_1.tail != null ? lid_1.head.idText === "`global`" ? [0, lid_1.head, lid_1.tail] : [1] : [1];

        switch ($var55[0]) {
          case 0:
            lid_2 = $var55[2];
            break;

          case 1:
            lid_2 = lid_1;
            break;
        }

        break;
    }

    return new SynModuleOrNamespace(0, [lid_2, isRec, isModule, decls, xmlDoc, attribs, access, m]);
  }
}
export function PostParseModuleSpec(_i, defaultNamespace, isLastCompiland, filename, intf) {
  if (intf.tag === 0) {
    const lower = _String.lowercase(filename);

    if (!(isLastCompiland[0] ? isLastCompiland[1] : false) ? !exists(function (arg10_) {
      return checkSuffix(lower, arg10_);
    }, doNotRequireNamespaceOrModuleSuffixes) : false) {
      const $var56 = intf.data[0].tail != null ? intf.data[0].head.tag === 1 ? [0] : [1] : [1];

      switch ($var56[0]) {
        case 0:
          errorR(new _Error(SR.noEqualSignAfterModule(), intf.data[1]));
          break;

        case 1:
          errorR(new _Error(SR.buildMultiFileRequiresNamespaceOrModule(), intf.data[1]));
          break;
      }
    }

    const modname = ComputeAnonModuleName(!(intf.data[0].tail == null), defaultNamespace, filename, trimRangeToLine(intf.data[1]));
    return new SynModuleOrNamespaceSig(0, [modname, false, true, intf.data[0], PreXmlDoc.Empty, new List(), null, intf.data[1]]);
  } else if (intf.tag === 2) {
    let lid;
    const $var57 = intf.data[0].tail != null ? intf.data[0].head.idText === "`global`" ? [0, intf.data[0].head, intf.data[0].tail] : [1] : [1];

    switch ($var57[0]) {
      case 0:
        lid = $var57[2];
        break;

      case 1:
        lid = intf.data[0];
        break;
    }

    return new SynModuleOrNamespaceSig(0, [lid, intf.data[1], intf.data[2], intf.data[3], intf.data[4], intf.data[5], null, intf.data[6]]);
  } else {
    const xmlDoc = intf.data.data[4];
    const m = intf.data.data[7];
    const lid_1 = intf.data.data[0];
    const isRec = intf.data.data[1];
    const isModule = intf.data.data[2];
    const decls = intf.data.data[3];
    const attribs = intf.data.data[5];
    const access = intf.data.data[6];
    let lid_2;
    const $var58 = lid_1.tail != null ? lid_1.tail.tail == null ? (isModule ? lid_1.head.idText === "`global`" : false) ? [0, lid_1.head] : [1] : [1] : [1];

    switch ($var58[0]) {
      case 0:
        lid_2 = error_1(new _Error(SR.buildInvalidModuleOrNamespaceName(), $var58[1].idRange));
        break;

      case 1:
        const $var59 = lid_1.tail != null ? lid_1.head.idText === "`global`" ? [0, lid_1.head, lid_1.tail] : [1] : [1];

        switch ($var59[0]) {
          case 0:
            lid_2 = $var59[2];
            break;

          case 1:
            lid_2 = lid_1;
            break;
        }

        break;
    }

    return new SynModuleOrNamespaceSig(0, [lid_2, isRec, isModule, decls, xmlDoc, attribs, access, m]);
  }
}
export function PostParseModuleImpls(defaultNamespace, filename, isLastCompiland, _arg1) {
  const matchValue = tryPick(function (_arg2) {
    if (_arg2.tag === 1) {
      const lid = _arg2.data.data[0];
      return lid;
    } else {
      return null;
    }
  }, reverse(_arg1.data[1]));
  const $var60 = matchValue != null ? _arg1.data[1].length > 1 ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var60[0]) {
    case 0:
      errorR(new _Error(SR.buildMultipleToplevelModules(), rangeOfLid($var60[1])));
      break;

    case 1:
      break;
  }

  const impls = mapIndexed(function (i, x) {
    return PostParseModuleImpl(i, defaultNamespace, isLastCompiland, filename, x);
  }, _arg1.data[1]);
  const qualName = QualFileNameOfImpls(filename, impls);
  const isScript = IsScript(filename);
  const scopedPragmas = toList(delay(function () {
    return append_1(collect(function (matchValue_1) {
      return collect(function (d) {
        return d.tag === 8 ? GetScopedPragmasForHashDirective(d.data[0]) : empty();
      }, matchValue_1.data[3]);
    }, impls), delay(function () {
      return collect(function (hd) {
        return GetScopedPragmasForHashDirective(hd);
      }, _arg1.data[0]);
    }));
  }));
  return new ParsedInput(0, new ParsedImplFileInput(0, [filename, isScript, qualName, scopedPragmas, _arg1.data[0], impls, isLastCompiland]));
}
export function PostParseModuleSpecs(defaultNamespace, filename, isLastCompiland, _arg1) {
  const matchValue = tryPick(function (_arg2) {
    if (_arg2.tag === 1) {
      const lid = _arg2.data.data[0];
      return lid;
    } else {
      return null;
    }
  }, reverse(_arg1.data[1]));
  const $var61 = matchValue != null ? _arg1.data[1].length > 1 ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var61[0]) {
    case 0:
      errorR(new _Error(SR.buildMultipleToplevelModules(), rangeOfLid($var61[1])));
      break;

    case 1:
      break;
  }

  const specs = mapIndexed(function (i, x) {
    return PostParseModuleSpec(i, defaultNamespace, isLastCompiland, filename, x);
  }, _arg1.data[1]);
  const qualName = QualFileNameOfSpecs(filename, specs);
  const scopedPragmas = toList(delay(function () {
    return append_1(collect(function (matchValue_1) {
      return collect(function (d) {
        return d.tag === 6 ? GetScopedPragmasForHashDirective(d.data[0]) : empty();
      }, matchValue_1.data[3]);
    }, specs), delay(function () {
      return collect(function (hd) {
        return GetScopedPragmasForHashDirective(hd);
      }, _arg1.data[0]);
    }));
  }));
  return new ParsedInput(1, new ParsedSigFileInput(0, [filename, qualName, scopedPragmas, _arg1.data[0], specs]));
}
export function DeduplicateModuleName(moduleNamesDict, paths, path, qualifiedNameOfFile) {
  const count = (paths.has(path) ? paths.size : paths.size + 1) | 0;
  moduleNamesDict.set(qualifiedNameOfFile.Text, add(path, paths));
  const id = qualifiedNameOfFile.Id;

  if (count === 1) {
    return qualifiedNameOfFile;
  } else {
    return new QualifiedNameOfFile(0, new Ident(id.idText + "___" + toString(count), id.idRange));
  }
}
export function DeduplicateParsedInputModuleName(moduleNamesDict, input) {
  if (input.tag === 1) {
    const scopedPragmas = input.data.data[2];
    const qualifiedNameOfFile = input.data.data[1];
    const modules = input.data.data[4];
    const hashDirectives = input.data.data[3];
    const fileName = input.data.data[0];
    const path = System.IO.Path.GetDirectoryName(fileName);
    const matchValue = tryGetValue(moduleNamesDict, qualifiedNameOfFile.Text, null);

    if (matchValue[0]) {
      const qualifiedNameOfFile_1 = DeduplicateModuleName(moduleNamesDict, matchValue[1], path, qualifiedNameOfFile);
      return new ParsedInput(1, new ParsedSigFileInput(0, [fileName, qualifiedNameOfFile_1, scopedPragmas, hashDirectives, modules]));
    } else {
      moduleNamesDict.set(qualifiedNameOfFile.Text, create([path], new Comparer(comparePrimitives)));
      return input;
    }
  } else {
    const scopedPragmas_1 = input.data.data[3];
    const qualifiedNameOfFile_2 = input.data.data[2];
    const modules_1 = input.data.data[5];
    const isScript = input.data.data[1];
    const isLastCompiland = input.data.data[6][0];
    const isExe = input.data.data[6][1];
    const hashDirectives_1 = input.data.data[4];
    const fileName_1 = input.data.data[0];
    const path_1 = System.IO.Path.GetDirectoryName(fileName_1);
    const matchValue_1 = tryGetValue(moduleNamesDict, qualifiedNameOfFile_2.Text, null);

    if (matchValue_1[0]) {
      const qualifiedNameOfFile_3 = DeduplicateModuleName(moduleNamesDict, matchValue_1[1], path_1, qualifiedNameOfFile_2);
      return new ParsedInput(0, new ParsedImplFileInput(0, [fileName_1, isScript, qualifiedNameOfFile_3, scopedPragmas_1, hashDirectives_1, modules_1, [isLastCompiland, isExe]]));
    } else {
      moduleNamesDict.set(qualifiedNameOfFile_2.Text, create([path_1], new Comparer(comparePrimitives)));
      return input;
    }
  }
}
export function ParseInput(lexer, errorLogger, lexbuf, defaultNamespace, filename, isLastCompiland) {
  const lower = _String.lowercase(filename);

  const delayLogger = new CapturingErrorLogger("Parsing");
  const unwindEL = PushErrorLoggerPhaseUntilUnwind(function (_arg1) {
    return delayLogger;
  });

  try {
    const unwindBP = PushThreadBuildPhaseUntilUnwind(new BuildPhase(3));

    try {
      let scopedPragmas = new List();

      try {
        let input;

        if (exists(function (arg10_) {
          return checkSuffix(lower, arg10_);
        }, mlCompatSuffixes)) {
          mlCompatWarning(SR.buildCompilingExtensionIsForML(), rangeStartup);
        }

        if (exists(function (arg10__1) {
          return checkSuffix(lower, arg10__1);
        }, FSharpImplFileSuffixes)) {
          const impl = implementationFile(lexer, lexbuf);
          input = PostParseModuleImpls(defaultNamespace, filename, isLastCompiland, impl);
        } else if (exists(function (arg10__2) {
          return checkSuffix(lower, arg10__2);
        }, FSharpSigFileSuffixes)) {
          const intfs = signatureFile(lexer, lexbuf);
          input = PostParseModuleSpecs(defaultNamespace, filename, isLastCompiland, intfs);
        } else {
          input = ErrorLoggerExtensions["ErrorLogger.Error"].bind(delayLogger)(new _Error(SR.buildInvalidSourceFileExtension(filename), rangeStartup));
        }

        scopedPragmas = GetScopedPragmasForInput(input);
        return input;
      } finally {
        const filteringErrorLogger = new ErrorLoggerFilteringByScopedPragmas(false, scopedPragmas, errorLogger);
        delayLogger.CommitDelayedDiagnostics(filteringErrorLogger);
      }
    } finally {
      if (hasInterface(unwindBP, "System.IDisposable")) {
        unwindBP.Dispose();
      }
    }
  } finally {
    if (hasInterface(unwindEL, "System.IDisposable")) {
      unwindEL.Dispose();
    }
  }
}
export function IsSignatureDataResource(r) {
  if (r.Name.indexOf(FSharpSignatureDataResourceName) === 0) {
    return true;
  } else {
    return r.Name.indexOf(FSharpSignatureDataResourceName2) === 0;
  }
}
export function IsOptimizationDataResource(r) {
  if (r.Name.indexOf(FSharpOptimizationDataResourceName) === 0) {
    return true;
  } else {
    return r.Name.indexOf(FSharpOptimizationDataResourceName2) === 0;
  }
}
export function GetSignatureDataResourceName(r) {
  if (r.Name.indexOf(FSharpSignatureDataResourceName) === 0) {
    return _String.dropPrefix(r.Name, FSharpSignatureDataResourceName);
  } else if (r.Name.indexOf(FSharpSignatureDataResourceName2) === 0) {
    return _String.dropPrefix(r.Name, FSharpSignatureDataResourceName2);
  } else {
    throw new Error("GetSignatureDataResourceName");
  }
}
export function GetOptimizationDataResourceName(r) {
  if (r.Name.indexOf(FSharpOptimizationDataResourceName) === 0) {
    return _String.dropPrefix(r.Name, FSharpOptimizationDataResourceName);
  } else if (r.Name.indexOf(FSharpOptimizationDataResourceName2) === 0) {
    return _String.dropPrefix(r.Name, FSharpOptimizationDataResourceName2);
  } else {
    throw new Error("GetOptimizationDataResourceName");
  }
}
export class AssemblyResolution {
  constructor(originalReference, resolvedPath, prepareToolTip, sysdir, ilAssemblyRef) {
    this.originalReference = originalReference;
    this.resolvedPath = resolvedPath;
    this.prepareToolTip = prepareToolTip;
    this.sysdir = sysdir;
    this.ilAssemblyRef = ilAssemblyRef;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.AssemblyResolution",
      interfaces: ["FSharpRecord"],
      properties: {
        originalReference: AssemblyReference,
        resolvedPath: "string",
        prepareToolTip: _Function([Unit, "string"]),
        sysdir: "boolean",
        ilAssemblyRef: Any
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.AssemblyResolution", AssemblyResolution);
export class LoadClosure {
  constructor(sourceFiles, references) {
    this.SourceFiles = sourceFiles;
    this.References = references;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.LoadClosure",
      interfaces: ["FSharpRecord"],
      properties: {
        SourceFiles: makeGeneric(List, {
          T: Tuple(["string", makeGeneric(List, {
            T: range
          })])
        }),
        References: makeGeneric(List, {
          T: Tuple(["string", makeGeneric(List, {
            T: AssemblyResolution
          })])
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.LoadClosure", LoadClosure);
export class TcConfig {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.TcConfig",
      properties: {
        compilingFslib: "boolean",
        conditionalCompilationDefines: makeGeneric(List, {
          T: "string"
        }),
        doDetuple: "boolean",
        doFinalSimplify: "boolean",
        doTLR: "boolean",
        emitDebugInfoInQuotations: "boolean",
        emitTailcalls: "boolean",
        errorSeverityOptions: FSharpErrorSeverityOptions,
        extraOptimizationIterations: "number",
        implicitIncludeDir: "string",
        isInteractive: "boolean",
        light: Option("boolean"),
        mlCompatibility: "boolean",
        noDebugData: "boolean",
        optSettings: OptimizationSettings,
        primaryAssembly: PrimaryAssembly,
        target: CompilerTarget
      }
    };
  }

  constructor(optimize) {
    this.optimize = optimize;
  }

  get primaryAssembly() {
    return new PrimaryAssembly(0);
  }

  get implicitIncludeDir() {
    return "";
  }

  get compilingFslib() {
    return false;
  }

  get isInteractive() {
    return false;
  }

  get mlCompatibility() {
    return false;
  }

  get noDebugData() {
    return false;
  }

  get conditionalCompilationDefines() {
    return new List();
  }

  get emitDebugInfoInQuotations() {
    return false;
  }

  get errorSeverityOptions() {
    return FSharpErrorSeverityOptions.Default;
  }

  get light() {
    return true;
  }

  get target() {
    return new CompilerTarget(0);
  }

  get extraOptimizationIterations() {
    return this.optimize ? 0 : 0;
  }

  get doDetuple() {
    return this.optimize;
  }

  get doTLR() {
    return this.optimize;
  }

  get doFinalSimplify() {
    return this.optimize;
  }

  get optSettings() {
    const inputRecord = OptimizationSettings.Defaults;
    const jitOptUser = this.optimize;
    const localOptUser = this.optimize;
    const crossModuleOptUser = this.optimize;
    const lambdaInlineThreshold = (this.optimize ? 6 : 0) | 0;
    return new OptimizationSettings(inputRecord.abstractBigTargets, jitOptUser, localOptUser, crossModuleOptUser, inputRecord.bigTargetSize, inputRecord.veryBigExprSize, lambdaInlineThreshold, inputRecord.reportingPhase, inputRecord.reportNoNeedToTailcall, inputRecord.reportFunctionSizes, inputRecord.reportHasEffect, inputRecord.reportTotalSizes);
  }

  get emitTailcalls() {
    return true;
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.TcConfig", TcConfig);
export class TcImports {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.TcImports",
      properties: {}
    };
  }

  constructor() {
    this.tcGlobalsOpt = null;
    this.ccuMap = create_1(new List(), new Comparer(comparePrimitives));
  }

  FindCcu(_arg1, assemblyName) {
    const matchValue = (table => tryFind(assemblyName, table))(this.ccuMap);

    if (matchValue == null) {
      return null;
    } else {
      return getValue(matchValue).FSharpViewOfMetadata;
    }
  }

  SetTcGlobals(g) {
    this.tcGlobalsOpt = g;
  }

  GetTcGlobals() {
    return getValue(this.tcGlobalsOpt);
  }

  SetCcuMap(m) {
    this.ccuMap = m;
  }

  GetImportedAssemblies() {
    return Map_2_get_Values.bind(this.ccuMap)();
  }

  GetImportMap() {
    let loaderInterface;
    const $var62 = this;
    loaderInterface = {
      FindCcuFromAssemblyRef(_ctok, m, ilAssemblyRef) {
        const assemblyName = ilAssemblyRef.Name;
        return $var62.FindCcuInfo(m, assemblyName);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.Import.AssemblyLoader"]
        };
      }

    };
    return ImportMap[".ctor"](getValue(this.tcGlobalsOpt), loaderInterface);
  }

  FindCcuInfo(_arg2, assemblyName) {
    const matchValue = (table => tryFind(assemblyName, table))(this.ccuMap);

    if (matchValue == null) {
      return new CcuResolutionResult(1, assemblyName);
    } else {
      return new CcuResolutionResult(0, getValue(matchValue).FSharpViewOfMetadata);
    }
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.TcImports", TcImports);
export const qnameOrder = Order.orderBy(function (q) {
  return q.Text;
});
export class TcState {
  constructor(tcsCcu, tcsCcuType, tcsNiceNameGen, tcsTcSigEnv, tcsTcImplEnv, tcsCreatesGeneratedProvidedTypes, tcsRootSigs, tcsRootImpls, tcsCcuSig) {
    this.tcsCcu = tcsCcu;
    this.tcsCcuType = tcsCcuType;
    this.tcsNiceNameGen = tcsNiceNameGen;
    this.tcsTcSigEnv = tcsTcSigEnv;
    this.tcsTcImplEnv = tcsTcImplEnv;
    this.tcsCreatesGeneratedProvidedTypes = tcsCreatesGeneratedProvidedTypes;
    this.tcsRootSigs = tcsRootSigs;
    this.tcsRootImpls = tcsRootImpls;
    this.tcsCcuSig = tcsCcuSig;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.CompileOps.TcState",
      interfaces: ["FSharpRecord"],
      properties: {
        tcsCcu: CcuThunk,
        tcsCcuType: Entity,
        tcsNiceNameGen: NiceNameGenerator,
        tcsTcSigEnv: TcEnv,
        tcsTcImplEnv: TcEnv,
        tcsCreatesGeneratedProvidedTypes: "boolean",
        tcsRootSigs: makeGeneric(_Map, {
          Key: QualifiedNameOfFile,
          Value: ModuleOrNamespaceType,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        tcsRootImpls: makeGeneric(_Set, {
          T: QualifiedNameOfFile,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        tcsCcuSig: ModuleOrNamespaceType
      }
    };
  }

  get NiceNameGenerator() {
    return this.tcsNiceNameGen;
  }

  get TcEnvFromSignatures() {
    return this.tcsTcSigEnv;
  }

  get TcEnvFromImpls() {
    return this.tcsTcImplEnv;
  }

  get Ccu() {
    return this.tcsCcu;
  }

  get CreatesGeneratedProvidedTypes() {
    return this.tcsCreatesGeneratedProvidedTypes;
  }

  get CcuType() {
    return this.tcsCcuType;
  }

  get CcuSig() {
    return this.tcsCcuSig;
  }

  NextStateAfterIncrementalFragment(tcEnvAtEndOfLastInput) {
    return new TcState(this.tcsCcu, this.tcsCcuType, this.tcsNiceNameGen, tcEnvAtEndOfLastInput, tcEnvAtEndOfLastInput, this.tcsCreatesGeneratedProvidedTypes, this.tcsRootSigs, this.tcsRootImpls, this.tcsCcuSig);
  }

}
setType("Microsoft.FSharp.Compiler.CompileOps.TcState", TcState);
export function GetInitialTcState(m, ccuName, tcConfig, tcGlobals, tcImports, niceNameGen, tcEnv0) {
  var arg00_;
  tcImports;
  const ccuType = NewCcuContents(new ILScopeRef(0), m, ccuName, NewEmptyModuleOrNamespaceType(new ModuleOrNamespaceKind(2)));
  let ccuData;

  const TryGetILModuleDef = function () {
    return null;
  };

  const FileName = null;
  const Stamp = newStamp();
  const QualifiedName = null;
  const SourceCodeDirectory = tcConfig.implicitIncludeDir;
  ccuData = new CcuData(FileName, new ILScopeRef(0), Stamp, QualifiedName, SourceCodeDirectory, true, false, ccuType, TryGetILModuleDef, (arg00_ = new Erasure(0), function (arg20_, arg30_) {
    return typeEquivAux(arg00_, tcGlobals, arg20_, arg30_);
  }), create_1(null, new Comparer(compare_1)));
  const ccu = CcuThunk.Create(ccuName, ccuData);

  if (tcConfig.compilingFslib) {
    tcGlobals.fslibCcu.Fixup(ccu);
  }

  return new TcState(ccu, ccuType, niceNameGen, tcEnv0, tcEnv0, false, ZmapModule.empty(qnameOrder), ZsetModule.empty(qnameOrder), NewEmptyModuleOrNamespaceType(new ModuleOrNamespaceKind(2)));
}
export function TypeCheckOneInputEventually(checkForErrors, tcConfig, tcImports, tcGlobals, prefixPathOpt, tcSink, tcState, inp) {
  return function (builder_) {
    return builder_.Delay(function () {
      return builder_.TryWith(builder_.Delay(function () {
        return builder_.Bind(EventuallyModule.token, function (_arg1) {
          RequireCompilationThread(_arg1);
          const m = inp.Range;
          const amap = tcImports.GetImportMap();

          if (inp.tag === 0) {
            const qualNameOfFile = inp.data.data[2];
            const rootSigOpt = tcState.tcsRootSigs.TryFind(qualNameOfFile);
            return builder_.Combine(ZsetModule.contains(qualNameOfFile, tcState.tcsRootImpls) ? (errorR(new _Error(SR.buildImplementationAlreadyGiven(qualNameOfFile.Text), m)), builder_.Zero()) : builder_.Zero(), builder_.Delay(function () {
              return builder_.Bind(TypeCheckOneImplFile(tcGlobals, tcState.tcsNiceNameGen, amap, tcState.tcsCcu, checkForErrors, tcConfig.conditionalCompilationDefines, tcSink, tcState.tcsTcImplEnv, rootSigOpt, inp.data), function (_arg3) {
                const hadSig = CurriedLambda(() => rootSigOpt != null)();
                const implFileSigType = SigTypeOfImplFile(_arg3[1]);
                const rootImpls = ZsetModule.add(qualNameOfFile, tcState.tcsRootImpls);
                const m_1 = qualNameOfFile.Range;
                const tcImplEnv = AddLocalRootModuleOrNamespace(TcResultsSink.NoSink, tcGlobals, amap, m_1, tcState.tcsTcImplEnv, implFileSigType);
                const tcSigEnv = hadSig ? tcState.tcsTcSigEnv : AddLocalRootModuleOrNamespace(TcResultsSink.NoSink, tcGlobals, amap, m_1, tcState.tcsTcSigEnv, implFileSigType);
                const tcImplEnv_1 = prefixPathOpt != null ? TcOpenDecl(tcSink, tcGlobals, amap, m_1, m_1, tcImplEnv, getValue(prefixPathOpt)) : tcImplEnv;
                let tcSigEnv_1;
                const $var63 = prefixPathOpt != null ? !hadSig ? [0, getValue(prefixPathOpt)] : [1] : [1];

                switch ($var63[0]) {
                  case 0:
                    tcSigEnv_1 = TcOpenDecl(tcSink, tcGlobals, amap, m_1, m_1, tcSigEnv, $var63[1]);
                    break;

                  case 1:
                    tcSigEnv_1 = tcSigEnv;
                    break;
                }

                const ccuSig = CombineCcuContentFragments(m_1, ofArray([implFileSigType, tcState.tcsCcuSig]));
                const ccuSigForFile = CombineCcuContentFragments(m_1, ofArray([implFileSigType, tcState.tcsCcuSig]));
                let tcState_1;
                const tcsCreatesGeneratedProvidedTypes = tcState.tcsCreatesGeneratedProvidedTypes ? true : _arg3[4];
                tcState_1 = new TcState(tcState.tcsCcu, tcState.tcsCcuType, tcState.tcsNiceNameGen, tcSigEnv_1, tcImplEnv_1, tcsCreatesGeneratedProvidedTypes, tcState.tcsRootSigs, rootImpls, ccuSig);
                return builder_.Return([[_arg3[3], _arg3[0], _arg3[1], ccuSigForFile], tcState_1]);
              });
            }));
          } else {
            const qualNameOfFile_1 = inp.data.data[1];
            return builder_.Combine(ZmapModule.mem(qualNameOfFile_1, tcState.tcsRootSigs) ? (errorR(new _Error(SR.buildSignatureAlreadySpecified(qualNameOfFile_1.Text), m.StartRange)), builder_.Zero()) : builder_.Zero(), builder_.Delay(function () {
              return builder_.Combine(ZsetModule.contains(qualNameOfFile_1, tcState.tcsRootImpls) ? (errorR(new _Error(SR.buildImplementationAlreadyGivenDetail(qualNameOfFile_1.Text), m)), builder_.Zero()) : builder_.Zero(), builder_.Delay(function () {
                return builder_.Bind(TypeCheckOneSigFile(tcGlobals, tcState.tcsNiceNameGen, amap, tcState.tcsCcu, checkForErrors, tcConfig.conditionalCompilationDefines, tcSink, tcState.tcsTcSigEnv, inp.data), function (_arg2) {
                  const rootSigs = ZmapModule.add(qualNameOfFile_1, _arg2[1], tcState.tcsRootSigs);
                  const ccuSigForFile_1 = CombineCcuContentFragments(m, ofArray([_arg2[1], tcState.tcsCcuSig]));
                  let tcEnv;

                  if (prefixPathOpt != null) {
                    const m_2 = qualNameOfFile_1.Range;
                    tcEnv = TcOpenDecl(tcSink, tcGlobals, amap, m_2, m_2, _arg2[0], getValue(prefixPathOpt));
                  } else {
                    tcEnv = _arg2[0];
                  }

                  let tcState_2;
                  const tcsCreatesGeneratedProvidedTypes_1 = tcState.tcsCreatesGeneratedProvidedTypes ? true : _arg2[2];
                  tcState_2 = new TcState(tcState.tcsCcu, tcState.tcsCcuType, tcState.tcsNiceNameGen, tcEnv, tcState.tcsTcImplEnv, tcsCreatesGeneratedProvidedTypes_1, rootSigs, tcState.tcsRootImpls, tcState.tcsCcuSig);
                  return builder_.Return([[tcEnv, EmptyTopAttrs, null, ccuSigForFile_1], tcState_2]);
                });
              }));
            }));
          }
        });
      }), function (_arg4) {
        errorRecovery(_arg4, range0);
        return builder_.Return([[tcState.TcEnvFromSignatures, EmptyTopAttrs, null, tcState.tcsCcuSig], tcState]);
      });
    });
  }(eventually);
}
export function TypeCheckOneInput(ctok, checkForErrors, tcConfig, tcImports, tcGlobals, prefixPathOpt, tcState, inp) {
  const unwindEL = PushErrorLoggerPhaseUntilUnwind(function (oldLogger) {
    return GetErrorLoggerFilteringByScopedPragmas(false, GetScopedPragmasForInput(inp), oldLogger);
  });

  try {
    const unwindBP = PushThreadBuildPhaseUntilUnwind(new BuildPhase(4));

    try {
      return function (e) {
        return EventuallyModule.force(ctok, e);
      }(TypeCheckOneInputEventually(checkForErrors, tcConfig, tcImports, tcGlobals, prefixPathOpt, TcResultsSink.NoSink, tcState, inp));
    } finally {
      if (hasInterface(unwindBP, "System.IDisposable")) {
        unwindBP.Dispose();
      }
    }
  } finally {
    if (hasInterface(unwindEL, "System.IDisposable")) {
      unwindEL.Dispose();
    }
  }
}
export function TypeCheckMultipleInputsFinish(results, tcState) {
  const patternInput = List_1.unzip4(results);
  const topAttrs = foldBack(function (arg00_, arg10_) {
    return CombineTopAttrs(arg00_, arg10_);
  }, patternInput[1], EmptyTopAttrs);
  const implFiles = choose(function (x) {
    return x;
  }, patternInput[2]);
  const tcEnvAtEndOfLastFile = patternInput[0].tail != null ? patternInput[0].head : tcState.TcEnvFromSignatures;
  return [[tcEnvAtEndOfLastFile, topAttrs, implFiles, patternInput[3]], tcState];
}
export function TypeCheckOneInputAndFinishEventually(checkForErrors, tcConfig, tcImports, tcGlobals, prefixPathOpt, tcSink, tcState, input) {
  return function (builder_) {
    return builder_.Delay(function () {
      return builder_.Bind(TypeCheckOneInputEventually(checkForErrors, tcConfig, tcImports, tcGlobals, prefixPathOpt, tcSink, tcState, input), function (_arg1) {
        return builder_.Return(TypeCheckMultipleInputsFinish(ofArray([_arg1[0]]), _arg1[1]));
      });
    });
  }(eventually);
}
export function TypeCheckClosedInputSetFinish(declaredImpls, tcState) {
  tcState.tcsCcu.Deref.Contents = NewCcuContents(new ILScopeRef(0), range0, tcState.tcsCcu.AssemblyName, tcState.tcsCcuSig);
  ZmapModule.iter(function (qualNameOfFile, _arg1) {
    if (!ZsetModule.contains(qualNameOfFile, tcState.tcsRootImpls)) {
      errorR(new _Error(SR.buildSignatureWithoutImplementation(qualNameOfFile.Text), qualNameOfFile.Range));
    }
  }, tcState.tcsRootSigs);
  return [tcState, declaredImpls];
}
export function TypeCheckClosedInputSet(ctok, checkForErrors, tcConfig, tcImports, tcGlobals, prefixPathOpt, tcState, inputs) {
  const patternInput = mapFold(function (tcState_1, inp) {
    return TypeCheckOneInput(ctok, checkForErrors, tcConfig, tcImports, tcGlobals, prefixPathOpt, tcState_1, inp);
  }, tcState, inputs, ofArray);
  const patternInput_1 = TypeCheckMultipleInputsFinish(patternInput[0], patternInput[1]);
  const topAttrs = patternInput_1[0][1];
  const tcEnvAtEndOfLastFile = patternInput_1[0][0];
  const implFiles = patternInput_1[0][2];
  const patternInput_2 = TypeCheckClosedInputSetFinish(implFiles, patternInput_1[1]);
  return [patternInput_2[0], topAttrs, patternInput_2[1], tcEnvAtEndOfLastFile];
}