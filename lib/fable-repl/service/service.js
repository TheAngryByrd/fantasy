import { GetEnvInteger } from "../fsharp/lib";
import { fromNumber } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Interface, Any, hasInterface, compareRecords, equalsRecords, compare, Array as _Array, Option, comparePrimitives, makeGeneric, Tuple, compareUnions, equals } from "../fable-core/Util";
import { posGt, posEq, rangeBeforePos, rangeContainsRange, mkRange, rangeCmdArgs, rangeStartup, rangeContainsPos, mkPos, range0, range as range_1 } from "../fsharp/range";
import { ParamTypeSymbolModule, ExternalSymbol } from "./ExternalSymbol";
import { choose as choose_1, reverse, append, collect, ofArray, concat, map, groupBy, filter } from "../fable-core/List";
import List from "../fable-core/List";
import { TcResultsSink, TcResultsSinkImpl, TryToResolveLongIdentAsType, ResolvePartialLongIdentToClassOrRecdFields, ResolvePartialLongIdent, ResolveRecordOrClassFieldsOfType, ArgumentContainer, Item, ItemWithNoInst, ResolveCompletionTargets, ResolveCompletionsInType, ItemOccurence, TypeNameResolutionFlag, IsItemResolvable, GetVisibleNamespacesAndModulesAtPoint, FakeInstantiationGenerator, NameResolver, TcSymbolUses, TcResolutions, OpenDeclaration, ItemWithInst } from "../fsharp/NameResolution";
import { tryDestAppTy, isSealedTy, isClassTy, isRecdTy, destTyparTy, isTyparTy, isFunTy, generalizedTyconRef, StripSelfRefCell, isStructTy, isInterfaceTy, isRefCellTy, valRefEq, $7C$AppTy$7C$_$7C$ as _AppTy___, tcrefOfAppTy, DisplayEnv } from "../fsharp/TastOps";
import { ModuleOrNamespaceKind, NewEmptyModuleOrNamespaceType, CcuThunk, TypedImplFile, ModuleOrNamespaceType, TType } from "../fsharp/tast";
import { AccessorDomain } from "../fsharp/AccessibilityLogic";
import { FSharpEntity, SymbolEnv, FSharpOpenDeclaration, FSharpAccessibilityRights, FSharpMemberOrFunctionOrValue, FSharpAssembly, FSharpSymbolUse, FSharpSymbol, FSharpAssemblySignature } from "../symbols/Symbols";
import { TcGlobals } from "../fsharp/TcGlobals";
import { UnresolvedAssemblyReference, TypeCheckOneInputAndFinishEventually, ParseInput, IsScript, FSharpLightSyntaxFileSuffixes, TcImports } from "../fsharp/CompileOps";
import { AgedLookup } from "../fsharp/InternalCollections";
import { InfoReader } from "../fsharp/InfoReader";
import { Tooltips, ErrorHelpers, FSharpErrorSeverity, FSharpErrorInfo, CompletionItem, UnresolvedSymbol, CompletionItemKind, FSharpXmlDoc, FSharpToolTipElement, FSharpToolTipText, SymbolHelpers, ErrorScope } from "../symbols/SymbolHelpers";
import { System } from "../fcs-fable/adapters";
import { compare as compare_1, join, trim, printf, toText } from "../fable-core/String";
import { CompletionContext, UntypedParseImpl, SourceFileImpl } from "./ServiceUntypedParse";
import { defaultArgWith, makeSome, defaultArg, getValue } from "../fable-core/Option";
import { FSharpMethodGroup, FSharpDeclarationListInfo } from "./ServiceDeclarationLists";
import { empty, singleton as singleton_1, collect as collect_1, forAll2, sumBy, last, tryHead, tryFind, exists, choose, filter as filter_1, map as map_1, delay, fold, sortWith, toList } from "../fable-core/Seq";
import { IsOperatorName } from "../fsharp/PrettyNaming";
import { cancellable, EventuallyModule, AssumeCompilationThreadWithoutEvidence, String as _String, List as List_1, RequireCompilationThread } from "../absil/illib";
import { TaggedTextOps, wordL } from "../fsharp/layout";
import { checkSuffix, directoryName } from "../utils/filename";
import { ExistsHeadTypeInEntireHierarchy } from "../fsharp/infos";
import { map as map_2 } from "../fable-core/Array";
import CurriedLambda from "../fable-core/CurriedLambda";
import { toList as toList_1, filter as filter_2, iter } from "../utils/ResizeArray";
import { IsApplicableMethApprox } from "../fsharp/ConstraintSolver";
import { CanCoerce, TypeFeasiblySubsumesType } from "../fsharp/TypeRelations";
import { errorR, diagnosticSink, ErrorLoggerExtensions, PushThreadBuildPhaseUntilUnwind, PushErrorLoggerPhaseUntilUnwind, CapturingErrorLogger, PhasedDiagnostic, BuildPhase, ErrorLogger, FSharpErrorSeverityOptions } from "../fsharp/ErrorLogger";
import { usingLexbufForParsing, lexargs as lexargs_2, mkLexargs, LexResourceManager, LightSyntaxStatus } from "../fsharp/lexhelp";
import { LexFilter } from "../fsharp/LexFilter";
import { token } from "../codegen/lex";
import { StringAsLexbuf } from "../fsharp/UnicodeLexing";
import { LexBuffer$60$1$2E$get_LexemeRange as LexBuffer_1_get_LexemeRange } from "../fsharp/ast";
import { equals as equals_1 } from "../fable-core/Date";
import { FSharpImplementationFileContents, FSharpAssemblyContents } from "../symbols/Exprs";
import { ApplyAllOptimizations, GetInitialOptimizationEnv } from "../fsharp/CompileOptions";
import { LightweightTcValForUsingInBuildMethodCall } from "../fsharp/TypeChecker";
import { singleton } from "../fable-core/AsyncBuilder";
import { distinctBy } from "../fable-core/Set";
import { IncrementalBuilder } from "./IncrementalBuild";
import { tokenTagToTokenId } from "../codegen/pars";
export const EnvMisc = function (__exports) {
  const getToolTipTextSize = __exports.getToolTipTextSize = GetEnvInteger("FCS_GetToolTipTextCacheSize", 5);
  const maxTypeCheckErrorsOutOfProjectContext = __exports.maxTypeCheckErrorsOutOfProjectContext = GetEnvInteger("FCS_MaxErrorsOutOfProjectContext", 3);
  const braceMatchCacheSize = __exports.braceMatchCacheSize = GetEnvInteger("FCS_BraceMatchCacheSize", 5);
  const parseFileCacheSize = __exports.parseFileCacheSize = GetEnvInteger("FCS_ParseFileCacheSize", 2);
  const checkFileInProjectCacheSize = __exports.checkFileInProjectCacheSize = GetEnvInteger("FCS_CheckFileInProjectCacheSize", 5);
  const projectCacheSizeDefault = __exports.projectCacheSizeDefault = GetEnvInteger("FCS_ProjectCacheSizeDefault", 3);
  const frameworkTcImportsCacheStrongSize = __exports.frameworkTcImportsCacheStrongSize = GetEnvInteger("FCS_frameworkTcImportsCacheStrongSizeDefault", 8);
  const maxMBDefault = __exports.maxMBDefault = GetEnvInteger("FCS_MaxMB", 1000000);
  const maxTimeShareMilliseconds = __exports.maxTimeShareMilliseconds = fromNumber(GetEnvInteger("FCS_MaxTimeShare", 100), false);
  return __exports;
}({});
export class FSharpFindDeclFailureReason {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpFindDeclFailureReason",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Unknown", "string"], ["NoSourceCode"], ["ProvidedType", "string"], ["ProvidedMember", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpFindDeclFailureReason", FSharpFindDeclFailureReason);
export class FSharpFindDeclResult {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpFindDeclResult",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["DeclNotFound", FSharpFindDeclFailureReason], ["DeclFound", range_1], ["ExternalDecl", "string", ExternalSymbol]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpFindDeclResult", FSharpFindDeclResult);
export class NameResResult {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.NameResResult",
      interfaces: ["FSharpUnion"],
      cases: [["Members", Tuple([makeGeneric(List, {
        T: ItemWithInst
      }), DisplayEnv, range_1])], ["Cancel", DisplayEnv, range_1], ["Empty"], ["TypecheckStaleAndTextChanged"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.NameResResult", NameResResult);
export class ResolveOverloads {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.ResolveOverloads",
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
setType("Microsoft.FSharp.Compiler.SourceCodeServices.ResolveOverloads", ResolveOverloads);
export class GetPreciseCompletionListFromExprTypingsResult {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.GetPreciseCompletionListFromExprTypingsResult",
      interfaces: ["FSharpUnion"],
      cases: [["NoneBecauseTypecheckIsStaleAndTextChanged"], ["NoneBecauseThereWereTypeErrors"], ["None"], ["Some", Tuple([makeGeneric(List, {
        T: ItemWithInst
      }), DisplayEnv, range_1]), TType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.GetPreciseCompletionListFromExprTypingsResult", GetPreciseCompletionListFromExprTypingsResult);
export class SemanticClassificationType {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.SemanticClassificationType",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["ReferenceType"], ["ValueType"], ["UnionCase"], ["Function"], ["Property"], ["MutableVar"], ["Module"], ["Printf"], ["ComputationExpression"], ["IntrinsicFunction"], ["Enumeration"], ["Interface"], ["TypeArgument"], ["Operator"], ["Disposable"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.SemanticClassificationType", SemanticClassificationType);
export class TypeCheckInfo {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.TypeCheckInfo",
      properties: {
        AccessRights: AccessorDomain,
        CcuSigForFile: ModuleOrNamespaceType,
        ImplementationFile: Option(TypedImplFile),
        OpenDeclarations: _Array(OpenDeclaration),
        PartialAssemblySignatureForFile: FSharpAssemblySignature,
        ScopeResolutions: TcResolutions,
        ScopeSymbolUses: TcSymbolUses,
        TcGlobals: TcGlobals,
        TcImports: TcImports,
        ThisCcu: CcuThunk
      }
    };
  }

  constructor(_sTcConfig, g, ccuSigForFile, thisCcu, tcImports, tcAccessRights, projectFileName, mainInputFileName, sResolutions, sSymbolUses, sFallback, loadClosure, reactorOps, checkAlive, textSnapshotInfo, implFileOpt, openDeclarations) {
    this.g = g;
    this.ccuSigForFile = ccuSigForFile;
    this.thisCcu = thisCcu;
    this.tcImports = tcImports;
    this.tcAccessRights = tcAccessRights;
    this.projectFileName = projectFileName;
    this.mainInputFileName = mainInputFileName;
    this.sResolutions = sResolutions;
    this.sSymbolUses = sSymbolUses;
    this.sFallback = sFallback;
    this.loadClosure = loadClosure;
    this.reactorOps = reactorOps;
    this.checkAlive = checkAlive;
    this.implFileOpt = implFileOpt;
    this.openDeclarations = openDeclarations;

    if (textSnapshotInfo != null) {
      this["textSnapshotInfo@174"] = textSnapshotInfo;
    } else {
      this["textSnapshotInfo@174"] = null;
    }

    this.getToolTipTextCache = AgedLookup[".ctor"](EnvMisc.getToolTipTextSize, tupledArg => equals(tupledArg[0], tupledArg[1]));
    this.amap = this.tcImports.GetImportMap();
    this.infoReader = new InfoReader(this.g, this.amap);
    this.ncenv = NameResolver[".ctor"](this.g, this.amap, this.infoReader, (arg00_, arg10_) => FakeInstantiationGenerator(arg00_, arg10_));
  }

  GetVisibleNamespacesAndModulesAtPosition(cursorPos) {
    const patternInput = this.GetBestEnvForPos(cursorPos);
    const nenv = patternInput[0][0];
    const ad = patternInput[0][1];
    return GetVisibleNamespacesAndModulesAtPoint(this.ncenv, nenv, patternInput[1], ad);
  }

  IsRelativeNameResolvable(cursorPos, plid, item) {
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const patternInput = this.GetBestEnvForPos(cursorPos);
      const nenv = patternInput[0][0];
      const ad = patternInput[0][1];
      return IsItemResolvable(this.ncenv, nenv, patternInput[1], ad, plid, item);
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in IsRelativeNameResolvable: '%s'"))(msg));
      return false;
    });
  }

  IsRelativeNameResolvableFromSymbol(cursorPos, plid, symbol) {
    return this.IsRelativeNameResolvable(cursorPos, plid, symbol.Item);
  }

  GetDeclarations(ctok, parseResultsOpt, line, lineStr, partialName, getAllEntities, hasTextChangedSinceLastTypecheck) {
    const isInterfaceFile = SourceFileImpl.IsInterfaceFile(this.mainInputFileName);
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const matchValue = (tupledArg => this.GetDeclItemsForNamesAtPosition(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], tupledArg[6], tupledArg[7], tupledArg[8], tupledArg[9], tupledArg[10], tupledArg[11]))([ctok, parseResultsOpt, partialName.QualifyingIdents, partialName.PartialIdent, partialName.LastDotPos, line, lineStr, partialName.EndColumn + 1, new TypeNameResolutionFlag(0), new ResolveOverloads(0), getAllEntities, hasTextChangedSinceLastTypecheck]);

      if (matchValue != null) {
        const m = getValue(matchValue)[3];
        const items = getValue(matchValue)[0];
        const denv = getValue(matchValue)[1];
        const ctx = getValue(matchValue)[2];
        const items_1 = isInterfaceFile ? filter(x => {
          const item = x.Item;
          return this.IsValidSignatureFileItem(item);
        }, items) : items;

        const getAccessibility = item_1 => {
          return FSharpSymbol.GetAccessibility(FSharpSymbol.Create_0(this.g, this.thisCcu, this.ccuSigForFile, this.tcImports, item_1));
        };

        const currentNamespaceOrModule = defaultArg(defaultArg(parseResultsOpt, null, x_1 => x_1.ParseTree), null, parsedInput => UntypedParseImpl.GetFullNameOfSmallestModuleOrNamespaceAtPoint(parsedInput, mkPos(line, 0)));
        const isAttributeApplication = equals(ctx, new CompletionContext(5));
        return FSharpDeclarationListInfo.Create(this.infoReader, m, denv, getAccessibility, items_1, this.reactorOps, currentNamespaceOrModule, isAttributeApplication, this.checkAlive);
      } else {
        return FSharpDeclarationListInfo.Empty;
      }
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetDeclarations: '%s'"))(msg));
      return FSharpDeclarationListInfo.Error(msg);
    });
  }

  GetDeclarationListSymbols(ctok, parseResultsOpt, line, lineStr, partialName, getAllEntities, hasTextChangedSinceLastTypecheck) {
    const isInterfaceFile = SourceFileImpl.IsInterfaceFile(this.mainInputFileName);
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const matchValue = (tupledArg => this.GetDeclItemsForNamesAtPosition(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], tupledArg[6], tupledArg[7], tupledArg[8], tupledArg[9], tupledArg[10], tupledArg[11]))([ctok, parseResultsOpt, partialName.QualifyingIdents, partialName.PartialIdent, partialName.LastDotPos, line, lineStr, partialName.EndColumn + 1, new TypeNameResolutionFlag(0), new ResolveOverloads(0), getAllEntities, hasTextChangedSinceLastTypecheck]);

      if (matchValue != null) {
        const m = getValue(matchValue)[3];
        const items = getValue(matchValue)[0];
        const denv = getValue(matchValue)[1];
        const items_1 = isInterfaceFile ? filter(x => {
          const item = x.Item;
          return this.IsValidSignatureFileItem(item);
        }, items) : items;
        const items_2 = SymbolHelpers.RemoveExplicitlySuppressedCompletionItems(this.g, items_1);
        const items_3 = toList(sortWith(($var2, $var3) => compare((d => {
          let n;
          const matchValue_1 = d.Item;
          const $var1 = matchValue_1.tag === 14 ? matchValue_1.data[1].tail != null ? matchValue_1.data[1].head.tag === 1 ? [0, matchValue_1.data[1].head.data[0]] : [3] : [3] : matchValue_1.tag === 12 ? matchValue_1.data.tag === 1 ? [1, matchValue_1.data.data[0]] : [3] : matchValue_1.tag === 13 ? matchValue_1.data.tag === 1 ? [1, matchValue_1.data.data[0]] : [3] : matchValue_1.tag === 11 ? matchValue_1.data[1].tail != null ? [2, matchValue_1.data[1].head] : [3] : [3];

          switch ($var1[0]) {
            case 0:
              n = 1 + $var1[1].TyparsNoRange.length | 0;
              break;

            case 1:
              n = 1000 + $var1[1].TyparsNoRange.length | 0;
              break;

            case 2:
              n = 1000 + 10 * $var1[1].DeclaringTyconRef.TyparsNoRange.length | 0;
              break;

            case 3:
              n = 0;
              break;
          }

          return [d.Item.DisplayName, n];
        })($var2), (d => {
          let n;
          const matchValue_1 = d.Item;
          const $var1 = matchValue_1.tag === 14 ? matchValue_1.data[1].tail != null ? matchValue_1.data[1].head.tag === 1 ? [0, matchValue_1.data[1].head.data[0]] : [3] : [3] : matchValue_1.tag === 12 ? matchValue_1.data.tag === 1 ? [1, matchValue_1.data.data[0]] : [3] : matchValue_1.tag === 13 ? matchValue_1.data.tag === 1 ? [1, matchValue_1.data.data[0]] : [3] : matchValue_1.tag === 11 ? matchValue_1.data[1].tail != null ? [2, matchValue_1.data[1].head] : [3] : [3];

          switch ($var1[0]) {
            case 0:
              n = 1 + $var1[1].TyparsNoRange.length | 0;
              break;

            case 1:
              n = 1000 + $var1[1].TyparsNoRange.length | 0;
              break;

            case 2:
              n = 1000 + 10 * $var1[1].DeclaringTyconRef.TyparsNoRange.length | 0;
              break;

            case 3:
              n = 0;
              break;
          }

          return [d.Item.DisplayName, n];
        })($var3)), items_2));
        const items_4 = SymbolHelpers.RemoveDuplicateCompletionItems(this.g, items_3);
        const items_5 = groupBy(d_1 => {
          const matchValue_2 = d_1.Item;
          const $var4 = matchValue_2.tag === 14 ? matchValue_2.data[1].tail != null ? matchValue_2.data[1].head.tag === 1 ? [0, matchValue_2.data[1].head.data[0]] : [3] : [3] : matchValue_2.tag === 4 ? [0, matchValue_2.data] : matchValue_2.tag === 22 ? matchValue_2.data.tail != null ? [1, matchValue_2.data.head] : [3] : matchValue_2.tag === 12 ? matchValue_2.data.tag === 1 ? [1, matchValue_2.data.data[0]] : [3] : matchValue_2.tag === 13 ? matchValue_2.data.tag === 1 ? [1, matchValue_2.data.data[0]] : [3] : matchValue_2.tag === 11 ? matchValue_2.data[1].tail != null ? [2, matchValue_2.data[1].head] : [3] : [3];

          switch ($var4[0]) {
            case 0:
              return $var4[1].LogicalName;

            case 1:
              return $var4[1].CompiledName;

            case 2:
              return tcrefOfAppTy(this.g, $var4[1].ApparentEnclosingType).CompiledName;

            case 3:
              return d_1.Item.DisplayName;
          }
        }, items_4);
        let items_6;

        const isOpItem = tupledArg_1 => {
          const matchValue_3 = map(x_1 => x_1.Item, tupledArg_1[1]);
          const $var5 = matchValue_3.tail != null ? matchValue_3.head.tag === 0 ? matchValue_3.tail.tail == null ? [0] : [2] : matchValue_3.head.tag === 10 ? matchValue_3.head.data[1].tail != null ? matchValue_3.head.data[1].tail.tail == null ? matchValue_3.tail.tail == null ? [0] : [2] : [2] : [2] : matchValue_3.head.tag === 1 ? matchValue_3.tail.tail == null ? [1] : [2] : [2] : [2];

          switch ($var5[0]) {
            case 0:
              return IsOperatorName(tupledArg_1[0]);

            case 1:
              return IsOperatorName(tupledArg_1[0]);

            case 2:
              return false;
          }
        };

        const isFSharpList = nm => {
          return nm === "[]";
        };

        items_6 = filter(tupledArg_2 => !isOpItem([tupledArg_2[0], tupledArg_2[1]]) ? !isFSharpList(tupledArg_2[0]) : false, items_5);
        const items_7 = map(tupledArg_3 => {
          if (tupledArg_3[1].tail == null) {
            throw new Error("Unexpected empty bag");
          } else {
            return map(item_1 => {
              const symbol = FSharpSymbol.Create_0(this.g, this.thisCcu, this.ccuSigForFile, this.tcImports, item_1.Item);
              return FSharpSymbolUse[".ctor"](this.g, denv, symbol, new ItemOccurence(1), m);
            }, tupledArg_3[1]);
          }
        }, items_6);
        return items_7;
      } else {
        return new List();
      }
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetDeclarationListSymbols: '%s'"))(msg));
      return new List();
    });
  }

  GetReferenceResolutionStructuredToolTipText(ctok, line, col) {
    RequireCompilationThread(ctok);
    const pos = mkPos(line, col);

    const isPosMatch = tupledArg => {
      const isRangeMatch = rangeContainsPos(tupledArg[1].Range, tupledArg[0]);
      const isNotSpecialRange = (!equals(tupledArg[1].Range, rangeStartup) ? !equals(tupledArg[1].Range, range0) : false) ? !equals(tupledArg[1].Range, rangeCmdArgs) : false;
      const isMatch = isRangeMatch ? isNotSpecialRange : false;
      return isMatch;
    };

    const dataTipOfReferences = () => {
      const matches = this.loadClosure != null ? filter(ar => isPosMatch([pos, ar.originalReference]), concat(map(tuple => tuple[1], getValue(this.loadClosure).References))) : new List();

      if (matches.tail == null) {
        return new FSharpToolTipText(0, new List());
      } else {
        const tip = wordL(TaggedTextOps.tagStringLiteral(trim(matches.head.prepareToolTip(), "end", "\n")));
        return new FSharpToolTipText(0, ofArray([FSharpToolTipElement.Single(tip, new FSharpXmlDoc(0))]));
      }
    };

    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, dataTipOfReferences, err => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetReferenceResolutionStructuredToolTipText: '%s'"))(err));
      return new FSharpToolTipText(0, ofArray([new FSharpToolTipElement(2, err)]));
    });
  }

  GetStructuredToolTipText(ctok, line, lineStr, colAtEndOfNames, names) {
    const Compute = () => ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const matchValue = (tupledArg => this.GetDeclItemsForNamesAtPosition(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], tupledArg[6], tupledArg[7], tupledArg[8], tupledArg[9], tupledArg[10], tupledArg[11]))([ctok, null, names, null, null, line, lineStr, colAtEndOfNames, new TypeNameResolutionFlag(0), new ResolveOverloads(0), () => new List(), _arg22 => false]);

      if (matchValue != null) {
        const m = getValue(matchValue)[3];
        const items = getValue(matchValue)[0];
        const denv = getValue(matchValue)[1];
        return new FSharpToolTipText(0, map(x => SymbolHelpers.FormatStructuredDescriptionOfItem(false, this.infoReader, m, denv, x.ItemWithInst), items));
      } else {
        return new FSharpToolTipText(0, new List());
      }
    }, err => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetStructuredToolTipText: '%s'"))(err));
      return new FSharpToolTipText(0, ofArray([new FSharpToolTipElement(2, err)]));
    });

    const key = [line, colAtEndOfNames, lineStr];
    const matchValue_1 = this.getToolTipTextCache.TryGet(ctok, key);

    if (matchValue_1 == null) {
      const res = Compute();
      this.getToolTipTextCache.Put(ctok, key, res);
      return res;
    } else {
      return getValue(matchValue_1);
    }
  }

  GetF1Keyword(ctok, line, lineStr, colAtEndOfNames, names) {
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const matchValue = (tupledArg => this.GetDeclItemsForNamesAtPosition(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], tupledArg[6], tupledArg[7], tupledArg[8], tupledArg[9], tupledArg[10], tupledArg[11]))([ctok, null, names, null, null, line, lineStr, colAtEndOfNames, new TypeNameResolutionFlag(0), new ResolveOverloads(1), () => new List(), _arg23 => false]);

      if (matchValue != null) {
        const items = getValue(matchValue)[0];

        if (items.tail != null) {
          if (items.tail.tail == null) {
            return SymbolHelpers.GetF1Keyword(this.g, items.head.Item);
          } else {
            const patternInput = fold((tupledArg_1, item) => {
              const matchValue_1 = [item.Item, tupledArg_1[1], tupledArg_1[2]];
              const $var6 = matchValue_1[0].tag === 14 ? matchValue_1[2] == null ? [0, matchValue_1[0]] : [1] : matchValue_1[0].tag === 11 ? matchValue_1[1] == null ? [2] : [3] : [3];

              switch ($var6[0]) {
                case 0:
                  return [tupledArg_1[0], tupledArg_1[1], $var6[1]];

                case 1:
                  return [tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]];

                case 2:
                  return [tupledArg_1[0], item.Item, tupledArg_1[2]];

                case 3:
                  return [false, null, null];
              }
            }, [true, null, null], items);
            const matchValue_2 = [patternInput[0], patternInput[1], patternInput[2]];
            const $var7 = matchValue_2[0] ? matchValue_2[1] != null ? getValue(matchValue_2[1]).tag === 11 ? [0, getValue(matchValue_2[1])] : matchValue_2[2] != null ? [1, getValue(matchValue_2[2])] : [2] : matchValue_2[2] != null ? [1, getValue(matchValue_2[2])] : [2] : [2];

            switch ($var7[0]) {
              case 0:
                return SymbolHelpers.GetF1Keyword(this.g, $var7[1]);

              case 1:
                return SymbolHelpers.GetF1Keyword(this.g, $var7[1]);

              case 2:
                return null;
            }
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetF1Keyword: '%s'"))(msg));
      return null;
    });
  }

  GetMethods(ctok, line, lineStr, colAtEndOfNames, namesOpt) {
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const matchValue = (tupledArg => this.GetDeclItemsForNamesAtPosition(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], tupledArg[6], tupledArg[7], tupledArg[8], tupledArg[9], tupledArg[10], tupledArg[11]))([ctok, null, namesOpt, null, null, line, lineStr, colAtEndOfNames, new TypeNameResolutionFlag(0), new ResolveOverloads(1), () => new List(), _arg24 => false]);

      if (matchValue != null) {
        const m = getValue(matchValue)[3];
        const items = getValue(matchValue)[0];
        const denv = getValue(matchValue)[1];
        return FSharpMethodGroup.Create(this.infoReader, m, denv, map(x => x.ItemWithInst, items));
      } else {
        return FSharpMethodGroup[".ctor"]("", []);
      }
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetMethods: '%s'"))(msg));
      return FSharpMethodGroup[".ctor"](msg, []);
    });
  }

  GetMethodsAsSymbols(ctok, line, lineStr, colAtEndOfNames, names) {
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const matchValue = (tupledArg => this.GetDeclItemsForNamesAtPosition(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], tupledArg[6], tupledArg[7], tupledArg[8], tupledArg[9], tupledArg[10], tupledArg[11]))([ctok, null, names, null, null, line, lineStr, colAtEndOfNames, new TypeNameResolutionFlag(0), new ResolveOverloads(1), () => new List(), _arg25 => false]);

      const $var8 = matchValue != null ? getValue(matchValue)[0].tail == null ? [0] : [1, getValue(matchValue)[1], getValue(matchValue)[0], getValue(matchValue)[3]] : [0];

      switch ($var8[0]) {
        case 0:
          return null;

        case 1:
          const allItems = collect(item => SymbolHelpers.FlattenItems(this.g, $var8[3], item.Item), $var8[2]);
          const symbols = map(item_1 => FSharpSymbol.Create_0(this.g, this.thisCcu, this.ccuSigForFile, this.tcImports, item_1), allItems);
          return [symbols, $var8[1], $var8[3]];
      }
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetMethodsAsSymbols: '%s'"))(msg));
      return null;
    });
  }

  GetDeclarationLocation(ctok, line, lineStr, colAtEndOfNames, names, preferFlag) {
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      var typeInfo_1;
      var fieldDef;
      var typeInfo;
      var eventDef;
      var tr;
      var matchValue_9;

      const matchValue = (tupledArg => this.GetDeclItemsForNamesAtPosition(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], tupledArg[6], tupledArg[7], tupledArg[8], tupledArg[9], tupledArg[10], tupledArg[11]))([ctok, null, names, null, null, line, lineStr, colAtEndOfNames, new TypeNameResolutionFlag(0), new ResolveOverloads(0), () => new List(), _arg26 => false]);

      const $var9 = matchValue != null ? getValue(matchValue)[0].tail != null ? [1, getValue(matchValue)[0].head] : [0] : [0];

      switch ($var9[0]) {
        case 0:
          return new FSharpFindDeclResult(0, new FSharpFindDeclFailureReason(0, ""));

        case 1:
          const getTypeVarNames = ilinfo => {
            const classTypeParams = map(paramDef => paramDef.Name, ilinfo.DeclaringTyconRef.ILTyconRawMetadata.GenericParams);
            const methodTypeParams = map(typ => typ.Name, ilinfo.FormalMethodTypars);
            return Array.from(append(classTypeParams, methodTypeParams));
          };

          let result;
          const matchValue_1 = $var9[1].Item;
          const $var10 = matchValue_1.tag === 11 ? matchValue_1.data[1].tail != null ? matchValue_1.data[1].head.tag === 1 ? [0, matchValue_1.data[1].head.data[1]] : [4] : [4] : matchValue_1.tag === 10 ? matchValue_1.data[1].tail != null ? matchValue_1.data[1].head.tag === 1 ? [1, matchValue_1.data[1].head.data[1], matchValue_1.data[0]] : [4] : [4] : matchValue_1.tag === 9 ? matchValue_1.data[1].tail != null ? matchValue_1.data[1].head.tag === 1 ? [2, matchValue_1.data[0], matchValue_1.data[1].head.data] : [4] : [4] : matchValue_1.tag === 7 ? (typeInfo_1 = matchValue_1.data.data[0], fieldDef = matchValue_1.data.data[1], !typeInfo_1.TyconRefOfRawMetadata.IsLocalRef) ? [3, matchValue_1.data.data[1], matchValue_1.data.data[0]] : [4] : [4];

          switch ($var10[0]) {
            case 0:
              const matchValue_2 = $var10[1].MetadataScope;

              if (matchValue_2.tag === 2) {
                const typeVarNames = getTypeVarNames($var10[1]);
                result = defaultArg(ParamTypeSymbolModule.tryOfILTypes(typeVarNames, $var10[1].ILMethodRef.ArgTypes), null, args => {
                  const externalSym = new ExternalSymbol(1, [$var10[1].ILMethodRef.DeclaringTypeRef.FullName, args]);
                  return new FSharpFindDeclResult(2, [matchValue_2.data.Name, externalSym]);
                });
              } else {
                result = null;
              }

              break;

            case 1:
              const matchValue_3 = $var10[1].MetadataScope;

              if (matchValue_3.tag === 2) {
                const typeVarNames_1 = getTypeVarNames($var10[1]);
                result = defaultArg(ParamTypeSymbolModule.tryOfILTypes(typeVarNames_1, $var10[1].ILMethodRef.ArgTypes), null, args_1 => {
                  const externalSym_1 = new ExternalSymbol(2, [$var10[1].ILMethodRef.DeclaringTypeRef.FullName, $var10[2], args_1, $var10[1].ILMethodRef.GenericArity]);
                  return new FSharpFindDeclResult(2, [matchValue_3.data.Name, externalSym_1]);
                });
              } else {
                result = null;
              }

              break;

            case 2:
              const methInfo = $var10[2].HasGetter ? $var10[2].GetterMethod : $var10[2].HasSetter ? $var10[2].SetterMethod : null;

              if (methInfo == null) {
                result = null;
              } else {
                const matchValue_4 = getValue(methInfo).MetadataScope;

                if (matchValue_4.tag === 2) {
                  const externalSym_2 = new ExternalSymbol(5, [getValue(methInfo).ILMethodRef.DeclaringTypeRef.FullName, $var10[1]]);
                  result = new FSharpFindDeclResult(2, [matchValue_4.data.Name, externalSym_2]);
                } else {
                  result = null;
                }
              }

              break;

            case 3:
              const matchValue_5 = $var10[2].ILScopeRef;

              if (matchValue_5.tag === 2) {
                const externalSym_3 = new ExternalSymbol(3, [$var10[2].ILTypeRef.FullName, $var10[1].Name]);
                result = new FSharpFindDeclResult(2, [matchValue_5.data.Name, externalSym_3]);
              } else {
                result = null;
              }

              break;

            case 4:
              const $var11 = matchValue_1.tag === 8 ? matchValue_1.data.tag === 1 ? (typeInfo = matchValue_1.data.data.data[0], eventDef = matchValue_1.data.data.data[1], !typeInfo.TyconRefOfRawMetadata.IsLocalRef) ? [0, matchValue_1.data.data.data[1], matchValue_1.data.data.data[0]] : [1] : [1] : [1];

              switch ($var11[0]) {
                case 0:
                  const matchValue_6 = $var11[2].ILScopeRef;

                  if (matchValue_6.tag === 2) {
                    const externalSym_4 = new ExternalSymbol(4, [$var11[2].ILTypeRef.FullName, $var11[1].Name]);
                    result = new FSharpFindDeclResult(2, [matchValue_6.data.Name, externalSym_4]);
                  } else {
                    result = null;
                  }

                  break;

                case 1:
                  let $var12;

                  if (matchValue_1.tag === 19) {
                    if (matchValue_1.data[1].contents != null) {
                      if (getValue(matchValue_1.data[1].contents).tag === 0) {
                        $var12 = [0, getValue(matchValue_1.data[1].contents).data[1]];
                      } else {
                        $var12 = [2];
                      }
                    } else {
                      $var12 = [2];
                    }
                  } else if (matchValue_1.tag === 14) {
                    if (matchValue_1.data[1].tail != null) {
                      const activePatternResult55136 = (arg10_ => _AppTy___(this.g, arg10_))(matchValue_1.data[1].head);

                      if (activePatternResult55136 != null) {
                        if (matchValue_1.data[1].tail.tail == null) {
                          if (tr = getValue(activePatternResult55136)[0], !tr.IsLocalRef) {
                            $var12 = [1, getValue(activePatternResult55136)[0]];
                          } else {
                            $var12 = [2];
                          }
                        } else {
                          $var12 = [2];
                        }
                      } else {
                        $var12 = [2];
                      }
                    } else {
                      $var12 = [2];
                    }
                  } else {
                    $var12 = [2];
                  }

                  switch ($var12[0]) {
                    case 0:
                      result = null;
                      break;

                    case 1:
                      const matchValue_7 = [$var12[1].TypeReprInfo, $var12[1].PublicPath];
                      const $var13 = matchValue_7[0].tag === 3 ? matchValue_7[0].data.data[0].tag === 2 ? matchValue_7[1] != null ? [0, matchValue_7[0].data.data[0].data, getValue(matchValue_7[1]).data] : [1] : [1] : [1];

                      switch ($var13[0]) {
                        case 0:
                          const fullName = join(".", $var13[2]);
                          result = new FSharpFindDeclResult(2, [$var13[1].Name, new ExternalSymbol(0, fullName)]);
                          break;

                        case 1:
                          result = null;
                          break;
                      }

                      break;

                    case 2:
                      result = null;
                      break;
                  }

                  break;
              }

              break;
          }

          if (result == null) {
            const matchValue_8 = SymbolHelpers.rangeOfItem(this.g, preferFlag, $var9[1].Item);

            if (matchValue_8 == null) {
              return new FSharpFindDeclResult(0, (matchValue_9 = $var9[1].Item, new FSharpFindDeclFailureReason(0, "")));
            } else {
              const projectDir = directoryName(this.projectFileName === "" ? this.mainInputFileName : this.projectFileName);
              const range = SymbolHelpers.fileNameOfItem(this.g, projectDir, getValue(matchValue_8), $var9[1].Item);
              return new FSharpFindDeclResult(1, mkRange(range, getValue(matchValue_8).Start, getValue(matchValue_8).End));
            }
          } else {
            return getValue(result);
          }

      }
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetDeclarationLocation: '%s'"))(msg));
      return new FSharpFindDeclResult(0, new FSharpFindDeclFailureReason(0, msg));
    });
  }

  GetSymbolUseAtLocation(ctok, line, lineStr, colAtEndOfNames, names) {
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const matchValue = (tupledArg => this.GetDeclItemsForNamesAtPosition(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], tupledArg[6], tupledArg[7], tupledArg[8], tupledArg[9], tupledArg[10], tupledArg[11]))([ctok, null, names, null, null, line, lineStr, colAtEndOfNames, new TypeNameResolutionFlag(0), new ResolveOverloads(0), () => new List(), _arg27 => false]);

      const $var14 = matchValue != null ? getValue(matchValue)[0].tail != null ? [1, getValue(matchValue)[1], getValue(matchValue)[0].head, getValue(matchValue)[3]] : [0] : [0];

      switch ($var14[0]) {
        case 0:
          return null;

        case 1:
          const symbol = FSharpSymbol.Create_0(this.g, this.thisCcu, this.ccuSigForFile, this.tcImports, $var14[2].Item);
          return [symbol, $var14[1], $var14[3]];
      }
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetSymbolUseAtLocation: '%s'"))(msg));
      return null;
    });
  }

  get PartialAssemblySignatureForFile() {
    return FSharpAssemblySignature[".ctor_1"](this.g, this.thisCcu, this.ccuSigForFile, this.tcImports, null, this.ccuSigForFile);
  }

  get AccessRights() {
    return this.tcAccessRights;
  }

  GetReferencedAssemblies() {
    return toList(delay(() => map_1(x => FSharpAssembly[".ctor"](this.g, this.tcImports, x.FSharpViewOfMetadata), this.tcImports.GetImportedAssemblies())));
  }

  GetFormatSpecifierLocationsAndArity() {
    return this.sSymbolUses.GetFormatSpecifierLocationsAndArity();
  }

  GetSemanticClassification(range) {
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => {
      const _LegitTypeOccurence___ = _arg3 => {
        switch (_arg3.tag) {
          case 2:
          case 3:
          case 1:
          case 0:
          case 4:
            return makeSome();

          default:
            return null;
        }
      };

      const _OptionalArgumentAttribute___ = ttype => {
        const $var15 = ttype.tag === 1 ? ttype.data[0].Stamp.Equals(this.g.attrib_OptionalArgumentAttribute.TyconRef.Stamp) ? [0, ttype.data[0]] : [1] : [1];

        switch ($var15[0]) {
          case 0:
            return makeSome();

          case 1:
            return null;
        }
      };

      const _KeywordIntrinsicValue___ = vref => {
        if ((((valRefEq(this.g, this.g.raise_vref, vref) ? true : valRefEq(this.g, this.g.reraise_vref, vref)) ? true : valRefEq(this.g, this.g.typeof_vref, vref)) ? true : valRefEq(this.g, this.g.typedefof_vref, vref)) ? true : valRefEq(this.g, this.g.sizeof_vref, vref)) {
          return makeSome();
        } else {
          return null;
        }
      };

      const _EnumCaseFieldInfo___ = rfinfo => {
        const matchValue = rfinfo.TyconRef.TypeReprInfo;

        if (matchValue.tag === 0) {
          if (matchValue.data.fsobjmodel_kind.tag === 4) {
            return makeSome();
          } else {
            return null;
          }
        } else {
          return null;
        }
      };

      const resolutions = range == null ? this.sResolutions.CapturedNameResolutions : filter_1(cnr => {
        var copyOfStruct;
        var copyOfStruct_1;
        return rangeContainsPos(getValue(range), (copyOfStruct = cnr.Range, copyOfStruct.Start)) ? true : rangeContainsPos(getValue(range), (copyOfStruct_1 = cnr.Range, copyOfStruct_1.End));
      }, this.sResolutions.CapturedNameResolutions);

      const isDisposableTy = ty => {
        return ExistsHeadTypeInEntireHierarchy(this.g, this.amap, range0, ty, this.g.tcref_System_IDisposable);
      };

      return map_2(m => [m[0], new SemanticClassificationType(7)], this.sSymbolUses.GetFormatSpecifierLocationsAndArity(), Array).concat(Array.from(choose(cnr_1 => {
        var vref_3;
        var vref_2;
        var vref_1;
        var rfinfo_2;
        var rfinfo_1;
        var types_2;
        var types_1;
        var types;
        var refs;
        let $var16;

        const activePatternResult55208 = (cnr_20 => this["|CNR|"](cnr_20))(cnr_1);

        if (activePatternResult55208[1].tag === 0) {
          if (activePatternResult55208[2].tag === 1) {
            if (vref_3 = activePatternResult55208[1].data, valRefEq(this.g, this.g.seq_vref, vref_3)) {
              $var16 = [0, activePatternResult55208[6], activePatternResult55208[1].data];
            } else {
              $var16 = [1];
            }
          } else {
            $var16 = [1];
          }
        } else {
          $var16 = [1];
        }

        switch ($var16[0]) {
          case 0:
            return [$var16[1], new SemanticClassificationType(8)];

          case 1:
            let $var17;

            const activePatternResult55207 = (cnr_19 => this["|CNR|"](cnr_19))(cnr_1);

            if (activePatternResult55207[1].tag === 0) {
              if (vref_2 = activePatternResult55207[1].data, vref_2.IsMutable ? true : isRefCellTy(this.g, vref_2.Type)) {
                $var17 = [0, activePatternResult55207[6], activePatternResult55207[1].data];
              } else {
                $var17 = [1];
              }
            } else {
              $var17 = [1];
            }

            switch ($var17[0]) {
              case 0:
                return [$var17[1], new SemanticClassificationType(5)];

              case 1:
                let $var18;

                const activePatternResult55205 = (cnr_18 => this["|CNR|"](cnr_18))(cnr_1);

                if (activePatternResult55205[1].tag === 0) {
                  const activePatternResult55206 = _KeywordIntrinsicValue___(activePatternResult55205[1].data);

                  if (activePatternResult55206 != null) {
                    if (activePatternResult55205[2].tag === 1) {
                      $var18 = [0, activePatternResult55205[6]];
                    } else {
                      $var18 = [1];
                    }
                  } else {
                    $var18 = [1];
                  }
                } else {
                  $var18 = [1];
                }

                switch ($var18[0]) {
                  case 0:
                    return [$var18[1], new SemanticClassificationType(9)];

                  case 1:
                    let $var19;

                    const activePatternResult55204 = (cnr_17 => this["|CNR|"](cnr_17))(cnr_1);

                    if (activePatternResult55204[1].tag === 0) {
                      if (vref_1 = activePatternResult55204[1].data, SymbolHelpers.isFunction(this.g, vref_1.Type)) {
                        $var19 = [0, activePatternResult55204[6], activePatternResult55204[1].data];
                      } else {
                        $var19 = [1];
                      }
                    } else {
                      $var19 = [1];
                    }

                    switch ($var19[0]) {
                      case 0:
                        if (valRefEq(this.g, this.g.range_op_vref, $var19[2]) ? true : valRefEq(this.g, this.g.range_step_op_vref, $var19[2])) {
                          return null;
                        } else if ($var19[2].IsPropertyGetterMethod ? true : $var19[2].IsPropertySetterMethod) {
                          return [$var19[1], new SemanticClassificationType(4)];
                        } else if (IsOperatorName($var19[2].DisplayName)) {
                          return [$var19[1], new SemanticClassificationType(13)];
                        } else {
                          return [$var19[1], new SemanticClassificationType(3)];
                        }

                      case 1:
                        let $var20;

                        const activePatternResult55203 = (cnr_16 => this["|CNR|"](cnr_16))(cnr_1);

                        if (activePatternResult55203[1].tag === 5) {
                          if (rfinfo_2 = activePatternResult55203[1].data, rfinfo_2.RecdField.IsMutable ? CurriedLambda(() => rfinfo_2.LiteralValue == null)() : false) {
                            $var20 = [0, activePatternResult55203[6], activePatternResult55203[1].data];
                          } else {
                            $var20 = [1];
                          }
                        } else {
                          $var20 = [1];
                        }

                        switch ($var20[0]) {
                          case 0:
                            return [$var20[1], new SemanticClassificationType(5)];

                          case 1:
                            let $var21;

                            const activePatternResult55202 = (cnr_15 => this["|CNR|"](cnr_15))(cnr_1);

                            if (activePatternResult55202[1].tag === 5) {
                              if (rfinfo_1 = activePatternResult55202[1].data, SymbolHelpers.isFunction(this.g, rfinfo_1.FieldType)) {
                                $var21 = [0, activePatternResult55202[6], activePatternResult55202[1].data];
                              } else {
                                $var21 = [1];
                              }
                            } else {
                              $var21 = [1];
                            }

                            switch ($var21[0]) {
                              case 0:
                                return [$var21[1], new SemanticClassificationType(3)];

                              case 1:
                                let $var22;

                                const activePatternResult55200 = (cnr_14 => this["|CNR|"](cnr_14))(cnr_1);

                                if (activePatternResult55200[1].tag === 5) {
                                  const activePatternResult55201 = _EnumCaseFieldInfo___(activePatternResult55200[1].data);

                                  if (activePatternResult55201 != null) {
                                    $var22 = [0, activePatternResult55200[6]];
                                  } else {
                                    $var22 = [1];
                                  }
                                } else {
                                  $var22 = [1];
                                }

                                switch ($var22[0]) {
                                  case 0:
                                    return [$var22[1], new SemanticClassificationType(10)];

                                  case 1:
                                    let $var23;

                                    const activePatternResult55197 = (cnr_13 => this["|CNR|"](cnr_13))(cnr_1);

                                    if (activePatternResult55197[1].tag === 10) {
                                      $var23 = [0, activePatternResult55197[6]];
                                    } else if (activePatternResult55197[1].tag === 16) {
                                      if (activePatternResult55197[2].tag === 1) {
                                        $var23 = [1, activePatternResult55197[6]];
                                      } else {
                                        $var23 = [3];
                                      }
                                    } else if (activePatternResult55197[1].tag === 15) {
                                      if (activePatternResult55197[2].tag === 1) {
                                        $var23 = [1, activePatternResult55197[6]];
                                      } else {
                                        $var23 = [3];
                                      }
                                    } else if (activePatternResult55197[1].tag === 14) {
                                      if (activePatternResult55197[1].data[1].tail != null) {
                                        const activePatternResult55198 = _OptionalArgumentAttribute___(activePatternResult55197[1].data[1].head);

                                        if (activePatternResult55198 != null) {
                                          if (activePatternResult55197[1].data[1].tail.tail == null) {
                                            const activePatternResult55199 = _LegitTypeOccurence___(activePatternResult55197[2]);

                                            if (activePatternResult55199 != null) {
                                              $var23 = [2];
                                            } else {
                                              $var23 = [3];
                                            }
                                          } else {
                                            $var23 = [3];
                                          }
                                        } else {
                                          $var23 = [3];
                                        }
                                      } else {
                                        $var23 = [3];
                                      }
                                    } else {
                                      $var23 = [3];
                                    }

                                    switch ($var23[0]) {
                                      case 0:
                                        return [$var23[1], new SemanticClassificationType(3)];

                                      case 1:
                                        return [$var23[1], new SemanticClassificationType(8)];

                                      case 2:
                                        return null;

                                      case 3:
                                        let $var24;

                                        const activePatternResult55194 = (cnr_12 => this["|CNR|"](cnr_12))(cnr_1);

                                        if (activePatternResult55194[1].tag === 11) {
                                          if (activePatternResult55194[1].data[1].tail != null) {
                                            if (activePatternResult55194[1].data[1].head.tag === 0) {
                                              const activePatternResult55195 = _OptionalArgumentAttribute___(activePatternResult55194[1].data[1].head.data[1]);

                                              if (activePatternResult55195 != null) {
                                                if (activePatternResult55194[1].data[1].tail.tail == null) {
                                                  const activePatternResult55196 = _LegitTypeOccurence___(activePatternResult55194[2]);

                                                  if (activePatternResult55196 != null) {
                                                    $var24 = [0];
                                                  } else {
                                                    $var24 = [1];
                                                  }
                                                } else {
                                                  $var24 = [1];
                                                }
                                              } else {
                                                $var24 = [1];
                                              }
                                            } else {
                                              $var24 = [1];
                                            }
                                          } else {
                                            $var24 = [1];
                                          }
                                        } else {
                                          $var24 = [1];
                                        }

                                        switch ($var24[0]) {
                                          case 0:
                                            return null;

                                          case 1:
                                            let $var25;

                                            const activePatternResult55192 = (cnr_11 => this["|CNR|"](cnr_11))(cnr_1);

                                            if (activePatternResult55192[1].tag === 14) {
                                              const activePatternResult55193 = _LegitTypeOccurence___(activePatternResult55192[2]);

                                              if (activePatternResult55193 != null) {
                                                if (types_2 = activePatternResult55192[1].data[1], exists(arg10__1 => isInterfaceTy(this.g, arg10__1), types_2)) {
                                                  $var25 = [0, activePatternResult55192[6], activePatternResult55192[1].data[1]];
                                                } else {
                                                  $var25 = [1];
                                                }
                                              } else {
                                                $var25 = [1];
                                              }
                                            } else {
                                              $var25 = [1];
                                            }

                                            switch ($var25[0]) {
                                              case 0:
                                                return [$var25[1], new SemanticClassificationType(11)];

                                              case 1:
                                                let $var26;

                                                const activePatternResult55190 = (cnr_10 => this["|CNR|"](cnr_10))(cnr_1);

                                                if (activePatternResult55190[1].tag === 14) {
                                                  const activePatternResult55191 = _LegitTypeOccurence___(activePatternResult55190[2]);

                                                  if (activePatternResult55191 != null) {
                                                    if (types_1 = activePatternResult55190[1].data[1], exists(arg10_ => isStructTy(this.g, arg10_), types_1)) {
                                                      $var26 = [0, activePatternResult55190[6], activePatternResult55190[1].data[1]];
                                                    } else {
                                                      $var26 = [1];
                                                    }
                                                  } else {
                                                    $var26 = [1];
                                                  }
                                                } else {
                                                  $var26 = [1];
                                                }

                                                switch ($var26[0]) {
                                                  case 0:
                                                    return [$var26[1], new SemanticClassificationType(1)];

                                                  case 1:
                                                    let $var27;

                                                    const activePatternResult55188 = (cnr_9 => this["|CNR|"](cnr_9))(cnr_1);

                                                    if (activePatternResult55188[1].tag === 14) {
                                                      const activePatternResult55189 = _LegitTypeOccurence___(activePatternResult55188[2]);

                                                      if (activePatternResult55189 != null) {
                                                        if (types = activePatternResult55188[1].data[1], (list => exists(isDisposableTy, list))(types)) {
                                                          $var27 = [0, activePatternResult55188[6], activePatternResult55188[1].data[1]];
                                                        } else {
                                                          $var27 = [1];
                                                        }
                                                      } else {
                                                        $var27 = [1];
                                                      }
                                                    } else {
                                                      $var27 = [1];
                                                    }

                                                    switch ($var27[0]) {
                                                      case 0:
                                                        return [$var27[1], new SemanticClassificationType(14)];

                                                      case 1:
                                                        let $var28;

                                                        const activePatternResult55186 = (cnr_8 => this["|CNR|"](cnr_8))(cnr_1);

                                                        if (activePatternResult55186[1].tag === 14) {
                                                          const activePatternResult55187 = _LegitTypeOccurence___(activePatternResult55186[2]);

                                                          if (activePatternResult55187 != null) {
                                                            $var28 = [0, activePatternResult55186[6]];
                                                          } else {
                                                            $var28 = [1];
                                                          }
                                                        } else {
                                                          $var28 = [1];
                                                        }

                                                        switch ($var28[0]) {
                                                          case 0:
                                                            return [$var28[1], new SemanticClassificationType(0)];

                                                          case 1:
                                                            let $var29;

                                                            const activePatternResult55184 = (cnr_7 => this["|CNR|"](cnr_7))(cnr_1);

                                                            if (activePatternResult55184[1].tag === 17) {
                                                              const activePatternResult55185 = _LegitTypeOccurence___(activePatternResult55184[2]);

                                                              if (activePatternResult55185 != null) {
                                                                $var29 = [0, activePatternResult55184[6]];
                                                              } else {
                                                                $var29 = [1];
                                                              }
                                                            } else {
                                                              $var29 = [1];
                                                            }

                                                            switch ($var29[0]) {
                                                              case 0:
                                                                return [$var29[1], new SemanticClassificationType(12)];

                                                              case 1:
                                                                let $var30;

                                                                const activePatternResult55182 = (cnr_6 => this["|CNR|"](cnr_6))(cnr_1);

                                                                if (activePatternResult55182[1].tag === 22) {
                                                                  const activePatternResult55183 = _LegitTypeOccurence___(activePatternResult55182[2]);

                                                                  if (activePatternResult55183 != null) {
                                                                    $var30 = [0, activePatternResult55182[6], activePatternResult55182[1].data];
                                                                  } else {
                                                                    $var30 = [1];
                                                                  }
                                                                } else {
                                                                  $var30 = [1];
                                                                }

                                                                switch ($var30[0]) {
                                                                  case 0:
                                                                    if (exists(tyconRef => tyconRef.Deref.IsStructOrEnumTycon, $var30[2])) {
                                                                      return [$var30[1], new SemanticClassificationType(1)];
                                                                    } else {
                                                                      return [$var30[1], new SemanticClassificationType(0)];
                                                                    }

                                                                  case 1:
                                                                    let $var31;

                                                                    const activePatternResult55180 = (cnr_5 => this["|CNR|"](cnr_5))(cnr_1);

                                                                    if (activePatternResult55180[1].tag === 11) {
                                                                      const activePatternResult55181 = _LegitTypeOccurence___(activePatternResult55180[2]);

                                                                      if (activePatternResult55181 != null) {
                                                                        $var31 = [0, activePatternResult55180[6], activePatternResult55180[1].data[1]];
                                                                      } else {
                                                                        $var31 = [1];
                                                                      }
                                                                    } else {
                                                                      $var31 = [1];
                                                                    }

                                                                    switch ($var31[0]) {
                                                                      case 0:
                                                                        if (exists(minfo => isStructTy(this.g, minfo.ApparentEnclosingType), $var31[2])) {
                                                                          return [$var31[1], new SemanticClassificationType(1)];
                                                                        } else {
                                                                          return [$var31[1], new SemanticClassificationType(0)];
                                                                        }

                                                                      case 1:
                                                                        let $var32;

                                                                        const activePatternResult55178 = (cnr_4 => this["|CNR|"](cnr_4))(cnr_1);

                                                                        if (activePatternResult55178[1].tag === 4) {
                                                                          const activePatternResult55179 = _LegitTypeOccurence___(activePatternResult55178[2]);

                                                                          if (activePatternResult55179 != null) {
                                                                            $var32 = [0, activePatternResult55178[6]];
                                                                          } else {
                                                                            $var32 = [1];
                                                                          }
                                                                        } else {
                                                                          $var32 = [1];
                                                                        }

                                                                        switch ($var32[0]) {
                                                                          case 0:
                                                                            return [$var32[1], new SemanticClassificationType(0)];

                                                                          case 1:
                                                                            let $var33;

                                                                            const activePatternResult55176 = (cnr_3 => this["|CNR|"](cnr_3))(cnr_1);

                                                                            if (activePatternResult55176[1].tag === 18) {
                                                                              const activePatternResult55177 = _LegitTypeOccurence___(activePatternResult55176[2]);

                                                                              if (activePatternResult55177 != null) {
                                                                                if (refs = activePatternResult55176[1].data, exists(x => x.IsModule, refs)) {
                                                                                  $var33 = [0, activePatternResult55176[6], activePatternResult55176[1].data];
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
                                                                                return [$var33[1], new SemanticClassificationType(6)];

                                                                              case 1:
                                                                                let $var34;

                                                                                const activePatternResult55175 = (cnr_2 => this["|CNR|"](cnr_2))(cnr_1);

                                                                                if (activePatternResult55175[1].tag === 3) {
                                                                                  $var34 = [0, activePatternResult55175[6]];
                                                                                } else if (activePatternResult55175[1].tag === 1) {
                                                                                  $var34 = [0, activePatternResult55175[6]];
                                                                                } else if (activePatternResult55175[1].tag === 2) {
                                                                                  $var34 = [0, activePatternResult55175[6]];
                                                                                } else {
                                                                                  $var34 = [1];
                                                                                }

                                                                                switch ($var34[0]) {
                                                                                  case 0:
                                                                                    return [$var34[1], new SemanticClassificationType(2)];

                                                                                  case 1:
                                                                                    return null;
                                                                                }

                                                                            }

                                                                        }

                                                                    }

                                                                }

                                                            }

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                }

            }

        }
      }, resolutions)));
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetSemanticClassification: '%s'"))(msg));
      return new Array(0);
    });
  }

  get ScopeResolutions() {
    return this.sResolutions;
  }

  get ScopeSymbolUses() {
    return this.sSymbolUses;
  }

  get TcGlobals() {
    return this.g;
  }

  get TcImports() {
    return this.tcImports;
  }

  get CcuSigForFile() {
    return this.ccuSigForFile;
  }

  get ThisCcu() {
    return this.thisCcu;
  }

  get ImplementationFile() {
    return this.implFileOpt;
  }

  get OpenDeclarations() {
    return this.openDeclarations;
  }

  ToString() {
    return "TypeCheckInfo(" + this.mainInputFileName + ")";
  }

  ["|CNR|"](cnr) {
    return [cnr.Pos, cnr.Item, cnr.ItemOccurence, cnr.DisplayEnv, cnr.NameResolutionEnv, cnr.AccessorDomain, cnr.Range];
  }

  GetBestEnvForPos(cursorPos) {
    var mostDeeplyNestedEnv;
    var almostIncludedEnv;
    var ad_1;
    let bestSoFar = null;
    iter(tupledArg => {
      if (rangeContainsPos(tupledArg[0], cursorPos)) {
        if (bestSoFar == null) {
          bestSoFar = [tupledArg[0], tupledArg[1], tupledArg[2]];
        } else {
          const bestm = getValue(bestSoFar)[0];

          if (rangeContainsRange(bestm, tupledArg[0])) {
            bestSoFar = [tupledArg[0], tupledArg[1], tupledArg[2]];
          }
        }
      }
    }, this.sResolutions.CapturedEnvs);
    const mostDeeplyNestedEnclosingScope = bestSoFar;
    const bestAlmostIncludedSoFar = {
      contents: null
    };
    iter(tupledArg_1 => {
      if (rangeBeforePos(tupledArg_1[0], cursorPos) ? !posEq(tupledArg_1[0].End, cursorPos) : false) {
        let contained;

        if (mostDeeplyNestedEnclosingScope == null) {
          contained = true;
        } else {
          const bestm_1 = getValue(mostDeeplyNestedEnclosingScope)[0];
          contained = rangeContainsRange(bestm_1, tupledArg_1[0]);
        }

        if (contained) {
          const matchValue = bestAlmostIncludedSoFar.contents;

          if (matchValue != null) {
            const rightm = getValue(matchValue)[0];

            if (posGt(tupledArg_1[0].End, rightm.End) ? true : posEq(tupledArg_1[0].End, rightm.End) ? posGt(tupledArg_1[0].Start, rightm.Start) : false) {
              bestAlmostIncludedSoFar.contents = [tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]];
            }
          } else {
            bestAlmostIncludedSoFar.contents = [tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]];
          }
        }
      }
    }, this.sResolutions.CapturedEnvs);
    let resEnv;
    const matchValue_1 = [bestAlmostIncludedSoFar.contents, mostDeeplyNestedEnclosingScope];
    const $var35 = matchValue_1[0] != null ? matchValue_1[1] != null ? (mostDeeplyNestedEnv = getValue(matchValue_1[1])[1], almostIncludedEnv = getValue(matchValue_1[0])[1], ad_1 = getValue(matchValue_1[0])[2], almostIncludedEnv.eFieldLabels.size >= mostDeeplyNestedEnv.eFieldLabels.size) ? [1, getValue(matchValue_1[0])[2], getValue(matchValue_1[0])[1], getValue(matchValue_1[1])[1]] : [2] : [0, getValue(matchValue_1[0])[2], getValue(matchValue_1[0])[1]] : [2];

    switch ($var35[0]) {
      case 0:
        resEnv = [$var35[2], $var35[1]];
        break;

      case 1:
        resEnv = [$var35[2], $var35[1]];
        break;

      case 2:
        if (mostDeeplyNestedEnclosingScope == null) {
          resEnv = [this.sFallback, new AccessorDomain(2)];
        } else {
          const env = getValue(mostDeeplyNestedEnclosingScope)[1];
          const ad = getValue(mostDeeplyNestedEnclosingScope)[2];
          resEnv = [env, ad];
        }

        break;
    }

    const pm = mkRange(this.mainInputFileName, cursorPos, cursorPos);
    return [resEnv, pm];
  }

  FilterItemsForCtors(filterCtors, items) {
    const items_1 = filter(item => {
      const $var36 = item.Item.tag === 11 ? filterCtors.Equals(new TypeNameResolutionFlag(1)) ? [0] : [1] : [1];

      switch ($var36[0]) {
        case 0:
          return false;

        case 1:
          return true;
      }
    }, items);
    return items_1;
  }

  ReturnItemsOfType(items, g, denv, m, filterCtors, hasTextChangedSinceLastTypecheck) {
    const items_2 = (items_1 => this.FilterItemsForCtors(filterCtors, items_1))((arg10_ => SymbolHelpers.RemoveExplicitlySuppressed(g, arg10_))((arg10__1 => SymbolHelpers.RemoveDuplicateItems(g, arg10__1))(items)));

    if (!(items_2.tail == null)) {
      if (hasTextChangedSinceLastTypecheck([this["textSnapshotInfo@174"], m])) {
        return new NameResResult(3);
      } else {
        return new NameResResult(0, [items_2, denv, m]);
      }
    } else {
      return new NameResResult(2);
    }
  }

  GetCapturedNameResolutions(endOfNamesPos, resolveOverloads) {
    const quals = resolveOverloads.tag === 1 ? this.sResolutions.CapturedMethodGroupResolutions : this.sResolutions.CapturedNameResolutions;
    const quals_1 = filter_2(cnr => posEq(cnr.Pos, endOfNamesPos), quals);
    return quals_1;
  }

  GetPreciseItemsFromNameResolution(line, colAtEndOfNames, membersByResidue, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck) {
    var arg00_;
    var arg10_;
    var arg00__2;
    var arg10__1;
    const endOfNamesPos = mkPos(line, colAtEndOfNames);
    const cnrs = reverse(toList_1(this.GetCapturedNameResolutions(endOfNamesPos, resolveOverloads)));
    const matchValue = [cnrs, membersByResidue];
    let $var37;

    if (matchValue[0].tail != null) {
      const activePatternResult54941 = (cnr_1 => this["|CNR|"](cnr_1))(matchValue[0].head);

      if (activePatternResult54941[1].tag === 14) {
        if (activePatternResult54941[1].data[1].tail != null) {
          if (matchValue[1] == null) {
            $var37 = [2, activePatternResult54941[3], activePatternResult54941[6]];
          } else {
            $var37 = [0, activePatternResult54941[5], activePatternResult54941[3], activePatternResult54941[6], activePatternResult54941[4], activePatternResult54941[1].data[1].head];
          }
        } else if (matchValue[1] == null) {
          $var37 = [2, activePatternResult54941[3], activePatternResult54941[6]];
        } else {
          $var37 = [3];
        }
      } else if (activePatternResult54941[1].tag === 0) {
        if (matchValue[1] == null) {
          $var37 = [2, activePatternResult54941[3], activePatternResult54941[6]];
        } else {
          $var37 = [1, activePatternResult54941[5], activePatternResult54941[3], activePatternResult54941[6], activePatternResult54941[4], activePatternResult54941[2], activePatternResult54941[1].data];
        }
      } else if (matchValue[1] == null) {
        $var37 = [2, activePatternResult54941[3], activePatternResult54941[6]];
      } else {
        $var37 = [3];
      }
    } else {
      $var37 = [3];
    }

    switch ($var37[0]) {
      case 0:
        const items = ResolveCompletionsInType(this.ncenv, $var37[4], new ResolveCompletionTargets(0, (arg00_ = this.g, arg10_ = this.amap, (arg30_, arg40_) => IsApplicableMethApprox(arg00_, arg10_, $var37[3], arg30_, arg40_))), $var37[3], $var37[1], true, $var37[5]);
        const items_1 = map(arg00__1 => ItemWithNoInst(arg00__1), items);
        return ((items_2, g, denv, m, filterCtors_1, hasTextChangedSinceLastTypecheck_1) => this.ReturnItemsOfType(items_2, g, denv, m, filterCtors_1, hasTextChangedSinceLastTypecheck_1))(items_1, this.g, $var37[2], $var37[3], filterCtors, hasTextChangedSinceLastTypecheck);

      case 1:
        if ($var37[5].Equals(new ItemOccurence(0)) ? true : $var37[5].Equals(new ItemOccurence(4))) {
          return new NameResResult(1, [$var37[2], $var37[3]]);
        } else {
          const ty = StripSelfRefCell(this.g, $var37[6].BaseOrThisInfo, $var37[6].TauType);
          let ad;
          const matchValue_1 = [$var37[6].BaseOrThisInfo, $var37[1]];
          const $var38 = matchValue_1[0].tag === 2 ? matchValue_1[1].tag === 0 ? matchValue_1[1].data[1] != null ? [0, matchValue_1[1].data[0], getValue(matchValue_1[1].data[1])] : [1] : [1] : [1];

          switch ($var38[0]) {
            case 0:
              const tcref = generalizedTyconRef($var38[2]);

              if (TypeFeasiblySubsumesType(0, this.g, this.amap, $var37[3], tcref, new CanCoerce(0), ty)) {
                ad = $var37[1];
              } else {
                ad = new AccessorDomain(0, [$var38[1], null]);
              }

              break;

            case 1:
              ad = $var37[1];
              break;
          }

          const items_3 = ResolveCompletionsInType(this.ncenv, $var37[4], new ResolveCompletionTargets(0, (arg00__2 = this.g, arg10__1 = this.amap, (arg30__1, arg40__1) => IsApplicableMethApprox(arg00__2, arg10__1, $var37[3], arg30__1, arg40__1))), $var37[3], ad, false, ty);
          const items_4 = map(arg00__3 => ItemWithNoInst(arg00__3), items_3);
          return ((items_5, g_1, denv_1, m_1, filterCtors_2, hasTextChangedSinceLastTypecheck_2) => this.ReturnItemsOfType(items_5, g_1, denv_1, m_1, filterCtors_2, hasTextChangedSinceLastTypecheck_2))(items_4, this.g, $var37[2], $var37[3], filterCtors, hasTextChangedSinceLastTypecheck);
        }

      case 2:
        const items_6 = filter(item => {
          const $var39 = item.Item.tag === 15 ? item.Item.data[0] === "into" ? [0] : [1] : [1];

          switch ($var39[0]) {
            case 0:
              return false;

            case 1:
              return true;
          }
        }, map(cnr => cnr.ItemWithInst, cnrs));
        return ((items_7, g_2, denv_2, m_2, filterCtors_3, hasTextChangedSinceLastTypecheck_3) => this.ReturnItemsOfType(items_7, g_2, denv_2, m_2, filterCtors_3, hasTextChangedSinceLastTypecheck_3))(items_6, this.g, $var37[1], $var37[2], filterCtors, hasTextChangedSinceLastTypecheck);

      case 3:
        return new NameResResult(2);
    }
  }

  TryGetTypeFromNameResolution(line, colAtEndOfNames, membersByResidue, resolveOverloads) {
    const endOfNamesPos = mkPos(line, colAtEndOfNames);
    const items = reverse(toList_1(this.GetCapturedNameResolutions(endOfNamesPos, resolveOverloads)));
    const matchValue = [items, membersByResidue];
    let $var40;

    if (matchValue[0].tail != null) {
      const activePatternResult54944 = (cnr => this["|CNR|"](cnr))(matchValue[0].head);

      if (activePatternResult54944[1].tag === 14) {
        if (activePatternResult54944[1].data[1].tail != null) {
          if (matchValue[1] != null) {
            $var40 = [0, activePatternResult54944[1].data[1].head];
          } else {
            $var40 = [2];
          }
        } else {
          $var40 = [2];
        }
      } else if (activePatternResult54944[1].tag === 0) {
        if (matchValue[1] != null) {
          $var40 = [1, activePatternResult54944[2], activePatternResult54944[1].data];
        } else {
          $var40 = [2];
        }
      } else {
        $var40 = [2];
      }
    } else {
      $var40 = [2];
    }

    switch ($var40[0]) {
      case 0:
        return $var40[1];

      case 1:
        if ($var40[1].Equals(new ItemOccurence(0)) ? true : $var40[1].Equals(new ItemOccurence(4))) {
          return null;
        } else {
          return StripSelfRefCell(this.g, $var40[2].BaseOrThisInfo, $var40[2].TauType);
        }

      case 2:
        return null;
    }
  }

  CollectParameters(methods, amap, m) {
    return collect(meth => {
      const matchValue = meth.GetParamDatas(amap, m, meth.FormalMethodInst);

      if (matchValue.tail != null) {
        return choose_1(_arg1 => _arg1.data[4] == null ? null : new Item(20, [getValue(_arg1.data[4]), _arg1.data[6], new ArgumentContainer(0, meth)]), matchValue.head);
      } else {
        return new List();
      }
    }, methods);
  }

  GetNamedParametersAndSettableFields(endOfExprPos, hasTextChangedSinceLastTypecheck) {
    var resolveOverloads;
    const cnrs = reverse(toList_1((resolveOverloads = new ResolveOverloads(1), this.GetCapturedNameResolutions(endOfExprPos, resolveOverloads))));
    let result;
    let $var41;

    if (cnrs.tail != null) {
      const activePatternResult54953 = (cnr => this["|CNR|"](cnr))(cnrs.head);

      if (activePatternResult54953[1].tag === 11) {
        if (activePatternResult54953[1].data[1].tail != null) {
          $var41 = [0, activePatternResult54953[5], activePatternResult54953[1].data[1].head, activePatternResult54953[1].data[1], activePatternResult54953[3], activePatternResult54953[6], activePatternResult54953[4]];
        } else {
          $var41 = [2];
        }
      } else if (activePatternResult54953[1].tag === 10) {
        $var41 = [1, activePatternResult54953[5], activePatternResult54953[3], activePatternResult54953[6], activePatternResult54953[1].data[1], activePatternResult54953[4]];
      } else {
        $var41 = [2];
      }
    } else {
      $var41 = [2];
    }

    switch ($var41[0]) {
      case 0:
        const props = ResolveCompletionsInType(this.ncenv, $var41[6], new ResolveCompletionTargets(1), $var41[5], $var41[1], false, $var41[2].ApparentEnclosingType);
        let parameters;
        const amap = this.amap;
        parameters = this.CollectParameters($var41[3], amap, $var41[5]);
        const items = append(props, parameters);
        result = [$var41[4], $var41[5], items];
        break;

      case 1:
        const props_1 = collect(meth => {
          const retTy = meth.GetFSharpReturnTy(this.amap, $var41[3], meth.FormalMethodInst);
          return ResolveCompletionsInType(this.ncenv, $var41[5], new ResolveCompletionTargets(1), $var41[3], $var41[1], false, retTy);
        }, $var41[4]);
        let parameters_1;
        const amap_1 = this.amap;
        parameters_1 = this.CollectParameters($var41[4], amap_1, $var41[3]);
        const items_1 = append(props_1, parameters_1);
        result = [$var41[2], $var41[3], items_1];
        break;

      case 2:
        result = null;
        break;
    }

    if (result != null) {
      const m = getValue(result)[1];
      const items_2 = getValue(result)[2];
      const denv = getValue(result)[0];
      const items_3 = map(arg00_ => ItemWithNoInst(arg00_), items_2);
      return ((items_4, g, denv_1, m_1, filterCtors, hasTextChangedSinceLastTypecheck_1) => this.ReturnItemsOfType(items_4, g, denv_1, m_1, filterCtors, hasTextChangedSinceLastTypecheck_1))(items_3, this.g, denv, m, new TypeNameResolutionFlag(1), hasTextChangedSinceLastTypecheck);
    } else {
      return new NameResResult(2);
    }
  }

  GetExprTypingForPosition(endOfExprPos) {
    const quals = Array.from(filter_1(tupledArg => {
      const isLocationWeCareAbout = posEq(tupledArg[0], endOfExprPos);
      const isFunction = isFunTy(tupledArg[2].g, tupledArg[1]);

      if (isLocationWeCareAbout) {
        return !isFunction;
      } else {
        return false;
      }
    }, this.sResolutions.CapturedExpressionTypings));
    const thereWereSomeQuals = !(quals.length === 0);
    const quals_1 = quals.filter(tupledArg_1 => !(isTyparTy(tupledArg_1[2].g, tupledArg_1[1]) ? destTyparTy(tupledArg_1[2].g, tupledArg_1[1]).IsFromError : false));
    return [thereWereSomeQuals, quals_1];
  }

  GetRecdFieldsForExpr(r) {
    var typ;
    var m;
    var denv;
    var ad;

    var _nenv;

    let patternInput;
    const endOfExprPos = r.End;
    patternInput = this.GetExprTypingForPosition(endOfExprPos);
    const bestQual = patternInput[1].length === 0 ? null : tryFind(tupledArg => {
      r;
      return posEq(r.Start, tupledArg[5].Start);
    }, patternInput[1]);
    const $var42 = bestQual != null ? (typ = getValue(bestQual)[1], m = getValue(bestQual)[5], denv = getValue(bestQual)[2], ad = getValue(bestQual)[4], _nenv = getValue(bestQual)[3], isRecdTy(denv.g, typ)) ? [0, getValue(bestQual)[3], getValue(bestQual)[4], getValue(bestQual)[2], getValue(bestQual)[5], getValue(bestQual)[1]] : [1] : [1];

    switch ($var42[0]) {
      case 0:
        const items = ResolveRecordOrClassFieldsOfType(this.ncenv, $var42[4], $var42[2], $var42[5], false);
        return [items, $var42[3], $var42[4]];

      case 1:
        return null;
    }
  }

  GetPreciseCompletionListFromExprTypings(parseResults, endOfExprPos, filterCtors, hasTextChangedSinceLastTypecheck) {
    var arg00_;
    var arg10_;
    const patternInput = this.GetExprTypingForPosition(endOfExprPos);

    if (patternInput[1].length === 0) {
      if (patternInput[0]) {
        return new GetPreciseCompletionListFromExprTypingsResult(1);
      } else {
        return new GetPreciseCompletionListFromExprTypingsResult(2);
      }
    } else {
      let patternInput_1;
      const matchValue = parseResults.ParseTree;

      if (matchValue != null) {
        const matchValue_1 = UntypedParseImpl.GetRangeOfExprLeftOfDot(endOfExprPos, getValue(matchValue));

        if (matchValue_1 == null) {
          patternInput_1 = [null, false];
        } else if (hasTextChangedSinceLastTypecheck([this["textSnapshotInfo@174"], getValue(matchValue_1)])) {
          patternInput_1 = [null, true];
        } else {
          const qual = tryFind(tupledArg => {
            tupledArg[5];
            return posEq(getValue(matchValue_1).Start, tupledArg[5].Start);
          }, patternInput[1]);
          patternInput_1 = [qual, false];
        }
      } else {
        patternInput_1 = [null, false];
      }

      if (patternInput_1[0] == null) {
        if (patternInput_1[1]) {
          return new GetPreciseCompletionListFromExprTypingsResult(0);
        } else {
          return new GetPreciseCompletionListFromExprTypingsResult(2);
        }
      } else {
        const items = ResolveCompletionsInType(this.ncenv, getValue(patternInput_1[0])[3], new ResolveCompletionTargets(0, (arg00_ = this.g, arg10_ = this.amap, (arg30_, arg40_) => IsApplicableMethApprox(arg00_, arg10_, getValue(patternInput_1[0])[5], arg30_, arg40_))), getValue(patternInput_1[0])[5], getValue(patternInput_1[0])[4], false, getValue(patternInput_1[0])[1]);

        const items_1 = (list => map(arg00__1 => ItemWithNoInst(arg00__1), list))(items);

        const items_2 = SymbolHelpers.RemoveDuplicateItems(this.g, items_1);
        const items_3 = SymbolHelpers.RemoveExplicitlySuppressed(this.g, items_2);

        const items_5 = (items_4 => this.FilterItemsForCtors(filterCtors, items_4))(items_3);

        return new GetPreciseCompletionListFromExprTypingsResult(3, [[items_5, getValue(patternInput_1[0])[2], getValue(patternInput_1[0])[5]], getValue(patternInput_1[0])[1]]);
      }
    }
  }

  GetEnvironmentLookupResolutions(nenv, ad, m, plid, filterCtors, showObsolete) {
    var arg00_;
    var arg10_;
    const items = ResolvePartialLongIdent(this.ncenv, nenv, (arg00_ = this.g, arg10_ = this.amap, (arg30_, arg40_) => IsApplicableMethApprox(arg00_, arg10_, m, arg30_, arg40_)), m, ad, plid, showObsolete);

    const items_1 = (list => map(arg00__1 => ItemWithNoInst(arg00__1), list))(items);

    const items_2 = SymbolHelpers.RemoveDuplicateItems(this.g, items_1);
    const items_3 = SymbolHelpers.RemoveExplicitlySuppressed(this.g, items_2);

    const items_5 = (items_4 => this.FilterItemsForCtors(filterCtors, items_4))(items_3);

    return [items_5, nenv.DisplayEnv, m];
  }

  GetEnvironmentLookupResolutionsAtPosition(cursorPos, plid, filterCtors, showObsolete) {
    const patternInput = this.GetBestEnvForPos(cursorPos);
    const nenv = patternInput[0][0];
    const ad = patternInput[0][1];
    return this.GetEnvironmentLookupResolutions(nenv, ad, patternInput[1], plid, filterCtors, showObsolete);
  }

  GetClassOrRecordFieldsEnvironmentLookupResolutions(cursorPos, plid) {
    const patternInput = this.GetBestEnvForPos(cursorPos);
    const nenv = patternInput[0][0];
    const ad = patternInput[0][1];
    const items = ResolvePartialLongIdentToClassOrRecdFields(this.ncenv, nenv, patternInput[1], ad, plid, false);

    const items_1 = (list => map(arg00_ => ItemWithNoInst(arg00_), list))(items);

    const items_2 = SymbolHelpers.RemoveDuplicateItems(this.g, items_1);
    const items_3 = SymbolHelpers.RemoveExplicitlySuppressed(this.g, items_2);
    return [items_3, nenv.DisplayEnv, patternInput[1]];
  }

  GetBaseClassCandidates(_arg1) {
    var ty;
    const $var43 = _arg1.tag === 18 ? [0] : _arg1.tag === 14 ? _arg1.data[1].tail != null ? (ty = _arg1.data[1].head, isClassTy(this.g, ty) ? !isSealedTy(this.g, ty) : false) ? [1, _arg1.data[1].head] : [2] : [2] : [2];

    switch ($var43[0]) {
      case 0:
        return true;

      case 1:
        return true;

      case 2:
        return false;
    }
  }

  GetInterfaceCandidates(_arg2) {
    var ty;
    const $var44 = _arg2.tag === 18 ? [0] : _arg2.tag === 14 ? _arg2.data[1].tail != null ? (ty = _arg2.data[1].head, isInterfaceTy(this.g, ty)) ? [1, _arg2.data[1].head] : [2] : [2] : [2];

    switch ($var44[0]) {
      case 0:
        return true;

      case 1:
        return true;

      case 2:
        return false;
    }
  }

  FilterDeclItemsByResidue(getItem, residue, items) {
    return filter(x => {
      const item = getItem(x);
      const n1 = item.DisplayName;
      const $var45 = item.tag === 14 ? [0] : item.tag === 11 ? [0] : [1];

      switch ($var45[0]) {
        case 0:
          if (residue + "Attribute" === n1) {
            return true;
          } else {
            return residue === n1;
          }

        case 1:
          return residue === n1;
      }
    }, items);
  }

  FilterRelevantItemsBy(getItem, exactMatchResidueOpt, check, items, denv, m) {
    var residue;

    const safeCheck = item => {
      try {
        return check(item);
      } catch (matchValue) {
        return false;
      }
    };

    if (!(items.tail == null) ? CurriedLambda(() => exactMatchResidueOpt != null)() : false) {
      const items_2 = (list => filter(safeCheck, list))((residue = getValue(exactMatchResidueOpt), items_1 => this.FilterDeclItemsByResidue(getItem, residue, items_1))(items));

      if (!(items_2.tail == null)) {
        return [items_2, denv, m];
      } else {
        return null;
      }
    } else {
      const items_3 = (list_1 => filter(safeCheck, list_1))(items);

      return [items_3, denv, m];
    }
  }

  ["|FilterRelevantItems|_|"](getItem, exactMatchResidueOpt, orig_0, orig_1, orig_2) {
    const orig = [orig_0, orig_1, orig_2];

    const check = _arg19 => {
      return true;
    };

    return this.FilterRelevantItemsBy(getItem, exactMatchResidueOpt, check, orig[0], orig[1], orig[2]);
  }

  FindFirstNonWhitespacePosition(lineStr, i) {
    if (i >= lineStr.length) {
      return null;
    } else {
      let p = i | 0;

      while (p >= 0 ? System.Char.IsWhiteSpace(lineStr[p]) : false) {
        p = p - 1 | 0;
      }

      if (p >= 0) {
        return p;
      } else {
        return null;
      }
    }
  }

  CompletionItem(ty, unresolvedEntity, item) {
    let kind;
    const $var46 = item.Item.tag === 10 ? item.Item.data[1].tail != null ? [0, item.Item.data[1].head] : [4] : item.Item.tag === 5 ? [1] : item.Item.tag === 9 ? [1] : item.Item.tag === 8 ? [2] : item.Item.tag === 7 ? [3] : item.Item.tag === 0 ? [3] : [4];

    switch ($var46[0]) {
      case 0:
        kind = new CompletionItemKind(2, $var46[1].IsExtensionMember);
        break;

      case 1:
        kind = new CompletionItemKind(1);
        break;

      case 2:
        kind = new CompletionItemKind(3);
        break;

      case 3:
        kind = new CompletionItemKind(0);
        break;

      case 4:
        kind = new CompletionItemKind(5);
        break;
    }

    const getNamespace = idents => {
      if (idents.length > 1) {
        return idents.slice(null, idents.length - 2 + 1);
      } else {
        return null;
      }
    };

    const unresolved = defaultArg(unresolvedEntity, null, x => {
      const ns = defaultArg(defaultArgWith((option => defaultArg(option, null, getNamespace))(x.TopRequireQualifiedAccessParent), () => getNamespace(x.CleanedIdents)), []);
      const displayName = join(".", x.CleanedIdents.slice(ns.length));
      return new UnresolvedSymbol(displayName, ns);
    });
    return new CompletionItem(item, kind, false, 0, ty, unresolved);
  }

  DefaultCompletionItem(item) {
    const ty = null;
    const unresolvedEntity = null;
    return this.CompletionItem(ty, unresolvedEntity, item);
  }

  getItem(x) {
    return x.Item;
  }

  GetDeclaredItems(parseResultsOpt, lineStr, origLongIdentOpt, colAtEndOfNamesAndResidue, residueOpt, lastDotPos, line, loc, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck, isInRangeOperator, allSymbols) {
    var getItem_4;
    var ty;
    var unresolvedEntity;
    var getItem_3;
    var ty_6;
    var m_4;
    var items_2;
    var denv_3;
    var ty_1;
    var unresolvedEntity_1;
    var m_1;
    var items_1;
    var denv_1;
    var ty_2;
    var unresolvedEntity_2;
    var getItem_1;
    var m;
    var items;
    var denv;
    var ty_3;
    var unresolvedEntity_3;
    var getItem;
    var ty_4;
    var unresolvedEntity_4;
    var m_3;
    var globalItemsFiltered;
    var denv_2;
    let isLikeRangeOp;
    let matchValue;
    const i = colAtEndOfNamesAndResidue - 1 | 0;
    matchValue = this.FindFirstNonWhitespacePosition(lineStr, i);
    const $var47 = matchValue != null ? ((getValue(matchValue) >= 1 ? lineStr[getValue(matchValue)] === "." : false) ? lineStr[getValue(matchValue) - 1] === "." : false) ? [0, getValue(matchValue)] : [1] : [1];

    switch ($var47[0]) {
      case 0:
        isLikeRangeOp = true;
        break;

      case 1:
        isLikeRangeOp = false;
        break;
    }

    if (isLikeRangeOp ? !isInRangeOperator : false) {
      return null;
    } else {
      let nameResItems;

      if (residueOpt != null) {
        const matchValue_1 = defaultArgWith(lastDotPos, () => {
          const i_1 = colAtEndOfNamesAndResidue - 1 | 0;
          return this.FindFirstNonWhitespacePosition(lineStr, i_1);
        });
        const $var48 = matchValue_1 != null ? lineStr[getValue(matchValue_1)] === "." ? [0, getValue(matchValue_1)] : [1] : [1];

        switch ($var48[0]) {
          case 0:
            let matchValue_2;
            const i_2 = $var48[1] - 1 | 0;
            matchValue_2 = this.FindFirstNonWhitespacePosition(lineStr, i_2);

            if (matchValue_2 == null) {
              nameResItems = new NameResResult(2);
            } else {
              const colAtEndOfNames = getValue(matchValue_2) + 1 | 0;
              const membersByResidue = makeSome(getValue(residueOpt));
              nameResItems = this.GetPreciseItemsFromNameResolution(line, colAtEndOfNames, membersByResidue, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck);
            }

            break;

          case 1:
            nameResItems = new NameResResult(2);
            break;
        }
      } else {
        const membersByResidue_1 = null;
        nameResItems = this.GetPreciseItemsFromNameResolution(line, colAtEndOfNamesAndResidue, membersByResidue_1, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck);
      }

      let patternInput_1;
      const matchValue_3 = [origLongIdentOpt, residueOpt];

      if (matchValue_3[0] != null) {
        if (matchValue_3[1] == null) {
          const patternInput = List_1.frontAndBack(getValue(matchValue_3[0]));
          patternInput_1 = [patternInput[0], patternInput[1]];
        } else {
          patternInput_1 = [getValue(matchValue_3[0]), null];
        }
      } else {
        patternInput_1 = [new List(), null];
      }

      const pos = mkPos(line, loc);
      const patternInput_2 = this.GetBestEnvForPos(pos);
      const nenv = patternInput_2[0][0];
      const ad = patternInput_2[0][1];

      const getType = () => {
        var arg00_;
        let tref;
        const matchValue_4 = TryToResolveLongIdentAsType(this.ncenv, nenv, patternInput_2[1], patternInput_1[0]);

        if (matchValue_4 == null) {
          const matchValue_5 = defaultArgWith(lastDotPos, () => {
            const i_3 = colAtEndOfNamesAndResidue - 1 | 0;
            return this.FindFirstNonWhitespacePosition(lineStr, i_3);
          });
          const $var49 = matchValue_5 != null ? lineStr[getValue(matchValue_5)] === "." ? [0, getValue(matchValue_5)] : [1] : [1];

          switch ($var49[0]) {
            case 0:
              let matchValue_6;
              const i_4 = $var49[1] - 1 | 0;
              matchValue_6 = this.FindFirstNonWhitespacePosition(lineStr, i_4);

              if (matchValue_6 == null) {
                tref = null;
              } else {
                const colAtEndOfNames_1 = getValue(matchValue_6) + 1 | 0;
                const tyconRef = this.TryGetTypeFromNameResolution(line, colAtEndOfNames_1, residueOpt, resolveOverloads);
                tref = tyconRef;
              }

              break;

            case 1:
              tref = null;
              break;
          }
        } else {
          tref = getValue(matchValue_4);
        }

        return defaultArg(tref, null, (arg00_ = this.g, arg10_ => tryDestAppTy(arg00_, arg10_)));
      };

      let $var50;

      if (nameResItems.tag === 3) {
        $var50 = [0];
      } else if (nameResItems.tag === 1) {
        $var50 = [1, nameResItems.data[0], nameResItems.data[1]];
      } else if (nameResItems.tag === 0) {
        const activePatternResult55016 = (getItem_4 = x_6 => this.getItem(x_6), tupledArg_4 => this["|FilterRelevantItems|_|"](getItem_4, patternInput_1[1], tupledArg_4[0], tupledArg_4[1], tupledArg_4[2]))(nameResItems.data);

        if (activePatternResult55016 != null) {
          $var50 = [2, getValue(activePatternResult55016)[1], getValue(activePatternResult55016)[0], getValue(activePatternResult55016)[2]];
        } else {
          $var50 = [3];
        }
      } else {
        $var50 = [3];
      }

      switch ($var50[0]) {
        case 0:
          return null;

        case 1:
          return [new List(), $var50[1], $var50[2]];

        case 2:
          return [map((ty = getType(), unresolvedEntity = null, item => this.CompletionItem(ty, unresolvedEntity, item)), $var50[2]), $var50[1], $var50[3]];

        case 3:
          if (origLongIdentOpt != null) {
            let patternInput_3;

            if (parseResultsOpt != null) {
              const matchValue_7 = UntypedParseImpl.TryFindExpressionASTLeftOfDotLeftOfCursor(mkPos(line, colAtEndOfNamesAndResidue), getValue(parseResultsOpt).ParseTree);

              if (matchValue_7 == null) {
                patternInput_3 = [new GetPreciseCompletionListFromExprTypingsResult(2), false];
              } else {
                const pos_1 = getValue(matchValue_7)[0];
                patternInput_3 = [this.GetPreciseCompletionListFromExprTypings(getValue(parseResultsOpt), pos_1, filterCtors, hasTextChangedSinceLastTypecheck), true];
              }
            } else {
              patternInput_3 = [new GetPreciseCompletionListFromExprTypingsResult(2), false];
            }

            const matchValue_8 = [patternInput_3[0], patternInput_3[1]];
            let $var51;

            if (matchValue_8[0].tag === 3) {
              const activePatternResult55014 = (getItem_3 = x_5 => this.getItem(x_5), tupledArg_3 => this["|FilterRelevantItems|_|"](getItem_3, patternInput_1[1], tupledArg_3[0], tupledArg_3[1], tupledArg_3[2]))(matchValue_8[0].data[0]);

              if (activePatternResult55014 != null) {
                if (ty_6 = matchValue_8[0].data[1], m_4 = getValue(activePatternResult55014)[2], items_2 = getValue(activePatternResult55014)[0], denv_3 = getValue(activePatternResult55014)[1], patternInput_1[0].tail == null ? true : false) {
                  $var51 = [0, getValue(activePatternResult55014)[1], getValue(activePatternResult55014)[0], getValue(activePatternResult55014)[2], matchValue_8[0].data[1]];
                } else {
                  $var51 = [1];
                }
              } else {
                $var51 = [1];
              }
            } else {
              $var51 = [1];
            }

            switch ($var51[0]) {
              case 0:
                return [map((ty_1 = tryDestAppTy(this.g, $var51[4]), unresolvedEntity_1 = null, item_1 => this.CompletionItem(ty_1, unresolvedEntity_1, item_1)), $var51[2]), $var51[1], $var51[3]];

              case 1:
                const $var52 = matchValue_8[0].tag === 1 ? [0] : matchValue_8[0].tag === 0 ? [1] : matchValue_8[1] ? (patternInput_1[0].tail == null ? true : false) ? [2] : [3] : [3];

                switch ($var52[0]) {
                  case 0:
                    return null;

                  case 1:
                    return null;

                  case 2:
                    return null;

                  case 3:
                    let patternInput_4;
                    const showObsolete = CurriedLambda(() => residueOpt != null)();
                    patternInput_4 = this.GetEnvironmentLookupResolutions(nenv, ad, patternInput_2[1], patternInput_1[0], filterCtors, showObsolete);
                    let envResult;
                    const matchValue_9 = [nameResItems, [patternInput_4[0], patternInput_4[1], patternInput_4[2]], patternInput_3[0]];
                    const $var53 = matchValue_9[0].tag === 0 ? (m_1 = matchValue_9[0].data[2], items_1 = matchValue_9[0].data[0], denv_1 = matchValue_9[0].data[1], !(items_1.tail == null)) ? [0, matchValue_9[0].data[1], matchValue_9[0].data[0], matchValue_9[0].data[2]] : [1] : [1];

                    switch ($var53[0]) {
                      case 0:
                        envResult = [map((ty_2 = getType(), unresolvedEntity_2 = null, item_2 => this.CompletionItem(ty_2, unresolvedEntity_2, item_2)), $var53[2]), $var53[1], $var53[3]];
                        break;

                      case 1:
                        let $var54;
                        const activePatternResult55005 = (getItem_1 = x_1 => this.getItem(x_1), tupledArg_1 => this["|FilterRelevantItems|_|"](getItem_1, patternInput_1[1], tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]))(matchValue_9[1]);

                        if (activePatternResult55005 != null) {
                          if (m = getValue(activePatternResult55005)[2], items = getValue(activePatternResult55005)[0], denv = getValue(activePatternResult55005)[1], !(items.tail == null)) {
                            $var54 = [0, getValue(activePatternResult55005)[1], getValue(activePatternResult55005)[0], getValue(activePatternResult55005)[2]];
                          } else {
                            $var54 = [1];
                          }
                        } else {
                          $var54 = [1];
                        }

                        switch ($var54[0]) {
                          case 0:
                            envResult = [map((ty_3 = getType(), unresolvedEntity_3 = null, item_3 => this.CompletionItem(ty_3, unresolvedEntity_3, item_3)), $var54[2]), $var54[1], $var54[3]];
                            break;

                          case 1:
                            let $var55;

                            if (matchValue_9[2].tag === 3) {
                              const activePatternResult55003 = (getItem = x => this.getItem(x), tupledArg => this["|FilterRelevantItems|_|"](getItem, patternInput_1[1], tupledArg[0], tupledArg[1], tupledArg[2]))(matchValue_9[2].data[0]);

                              if (activePatternResult55003 != null) {
                                $var55 = [0, getValue(activePatternResult55003)[1], getValue(activePatternResult55003)[0], getValue(activePatternResult55003)[2], matchValue_9[2].data[1]];
                              } else {
                                $var55 = [1];
                              }
                            } else {
                              $var55 = [1];
                            }

                            switch ($var55[0]) {
                              case 0:
                                envResult = [map((ty_4 = tryDestAppTy(this.g, $var55[4]), unresolvedEntity_4 = null, item_4 => this.CompletionItem(ty_4, unresolvedEntity_4, item_4)), $var55[2]), $var55[1], $var55[3]];
                                break;

                              case 1:
                                envResult = null;
                                break;
                            }

                            break;
                        }

                        break;
                    }

                    let globalResult;
                    const $var56 = origLongIdentOpt != null ? getValue(origLongIdentOpt).tail == null ? [0] : [1] : [0];

                    switch ($var56[0]) {
                      case 0:
                        const globalItems = filter(x_2 => {
                          var m_2;
                          const $var57 = x_2.Symbol instanceof FSharpMemberOrFunctionOrValue ? (m_2 = x_2.Symbol, m_2.IsConstructor ? filterCtors.Equals(new TypeNameResolutionFlag(1)) : false) ? [0, x_2.Symbol] : [1] : [1];

                          switch ($var57[0]) {
                            case 0:
                              return false;

                            case 1:
                              return true;
                          }
                        }, filter(x_3 => !x_3.Symbol.IsExplicitlySuppressed, allSymbols()));

                        const getItem_2 = x_4 => {
                          return x_4.Symbol.Item;
                        };

                        const matchValue_10 = [globalItems, patternInput_4[1], patternInput_4[2]];
                        let $var58;

                        const activePatternResult55012 = (tupledArg_2 => this["|FilterRelevantItems|_|"](getItem_2, patternInput_1[1], tupledArg_2[0], tupledArg_2[1], tupledArg_2[2]))(matchValue_10);

                        if (activePatternResult55012 != null) {
                          if (m_3 = getValue(activePatternResult55012)[2], globalItemsFiltered = getValue(activePatternResult55012)[0], denv_2 = getValue(activePatternResult55012)[1], !(globalItemsFiltered.tail == null)) {
                            $var58 = [0, getValue(activePatternResult55012)[1], getValue(activePatternResult55012)[0], getValue(activePatternResult55012)[2]];
                          } else {
                            $var58 = [1];
                          }
                        } else {
                          $var58 = [1];
                        }

                        switch ($var58[0]) {
                          case 0:
                            globalResult = (r => [r, $var58[1], $var58[3]])(map(globalItem => {
                              const ty_5 = getType();
                              const unresolvedEntity_5 = globalItem;
                              const item_5 = ItemWithNoInst(globalItem.Symbol.Item);
                              return this.CompletionItem(ty_5, unresolvedEntity_5, item_5);
                            }, $var58[2]));

                            break;

                          case 1:
                            globalResult = null;
                            break;
                        }

                        break;

                      case 1:
                        globalResult = null;
                        break;
                    }

                    const matchValue_11 = [envResult, globalResult];

                    if (matchValue_11[0] == null) {
                      if (matchValue_11[1] == null) {
                        return null;
                      } else {
                        return getValue(matchValue_11[1]);
                      }
                    } else if (matchValue_11[1] == null) {
                      return getValue(matchValue_11[0]);
                    } else {
                      return [append(getValue(matchValue_11[0])[0], getValue(matchValue_11[1])[0]), getValue(matchValue_11[0])[1], getValue(matchValue_11[0])[2]];
                    }

                }

            }
          } else {
            return null;
          }

      }
    }
  }

  toCompletionItems(items, denv, m) {
    return [map(item => this.DefaultCompletionItem(item), items), denv, m];
  }

  GetDeclItemsForNamesAtPosition(ctok, parseResultsOpt, origLongIdentOpt, residueOpt, lastDotPos, line, lineStr, colAtEndOfNamesAndResidue, filterCtors, resolveOverloads, getAllSymbols, hasTextChangedSinceLastTypecheck) {
    var getItem;
    var exactMatchResidueOpt;
    var check;
    var cursorPos;
    var getItem_1;
    var exactMatchResidueOpt_1;
    var check_1;
    var cursorPos_1;
    var getItem_2;
    var exactMatchResidueOpt_2;
    var check_2;
    var cursorPos_2;
    var cursorPos_3;
    var cursorPos_4;
    var cursorPos_5;
    var plid;
    RequireCompilationThread(ctok);
    const loc = (colAtEndOfNamesAndResidue >= lineStr.length ? lineStr.length : lineStr[colAtEndOfNamesAndResidue] === "." ? colAtEndOfNamesAndResidue + 1 : colAtEndOfNamesAndResidue === 0 ? 0 : colAtEndOfNamesAndResidue - 1) | 0;
    const completionContext = defaultArg(defaultArg(parseResultsOpt, null, x => x.ParseTree), null, parseTree => UntypedParseImpl.TryGetCompletionContext(mkPos(line, colAtEndOfNamesAndResidue), parseTree, lineStr));
    let res;
    const $var59 = completionContext != null ? getValue(completionContext).tag === 0 ? [0] : getValue(completionContext).tag === 1 ? getValue(completionContext).data[0].tag === 1 ? [2, getValue(completionContext).data[1][0]] : getValue(completionContext).data[0].tag === 2 ? [3, getValue(completionContext).data[1][0]] : [1, getValue(completionContext).data[1][0]] : getValue(completionContext).tag === 2 ? getValue(completionContext).data.tag === 0 ? [5, getValue(completionContext).data.data[1][0], getValue(completionContext).data.data[0]] : getValue(completionContext).data.tag === 1 ? [6, getValue(completionContext).data.data] : [4, getValue(completionContext).data.data[0]] : getValue(completionContext).tag === 4 ? [7, getValue(completionContext).data[0], getValue(completionContext).data[1]] : getValue(completionContext).tag === 5 ? [8] : getValue(completionContext).tag === 6 ? [9] : getValue(completionContext).tag === 7 ? [10] : [11, completionContext] : [11, completionContext];

    switch ($var59[0]) {
      case 0:
        res = null;
        break;

      case 1:
        res = defaultArg((getItem = x_1 => this.getItem(x_1), exactMatchResidueOpt = null, check = $var60 => (_arg1 => this.GetBaseClassCandidates(_arg1))((x_2 => this.getItem(x_2))($var60)), tupledArg_1 => this.FilterRelevantItemsBy(getItem, exactMatchResidueOpt, check, tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]))((cursorPos = mkPos(line, loc), this.GetEnvironmentLookupResolutionsAtPosition(cursorPos, $var59[1], filterCtors, false))), null, tupledArg => this.toCompletionItems(tupledArg[0], tupledArg[1], tupledArg[2]));
        break;

      case 2:
        res = defaultArg((getItem_1 = x_3 => this.getItem(x_3), exactMatchResidueOpt_1 = null, check_1 = $var61 => (_arg2 => this.GetInterfaceCandidates(_arg2))((x_4 => this.getItem(x_4))($var61)), tupledArg_3 => this.FilterRelevantItemsBy(getItem_1, exactMatchResidueOpt_1, check_1, tupledArg_3[0], tupledArg_3[1], tupledArg_3[2]))((cursorPos_1 = mkPos(line, loc), this.GetEnvironmentLookupResolutionsAtPosition(cursorPos_1, $var59[1], filterCtors, false))), null, tupledArg_2 => this.toCompletionItems(tupledArg_2[0], tupledArg_2[1], tupledArg_2[2]));
        break;

      case 3:
        res = defaultArg((getItem_2 = x_5 => this.getItem(x_5), exactMatchResidueOpt_2 = null, check_2 = $var62 => (t => this.GetBaseClassCandidates(t) ? true : this.GetInterfaceCandidates(t))((x_6 => this.getItem(x_6))($var62)), tupledArg_5 => this.FilterRelevantItemsBy(getItem_2, exactMatchResidueOpt_2, check_2, tupledArg_5[0], tupledArg_5[1], tupledArg_5[2]))((cursorPos_2 = mkPos(line, loc), this.GetEnvironmentLookupResolutionsAtPosition(cursorPos_2, $var59[1], filterCtors, false))), null, tupledArg_4 => this.toCompletionItems(tupledArg_4[0], tupledArg_4[1], tupledArg_4[2]));
        break;

      case 4:
        const matchValue = (tupledArg_6 => this.toCompletionItems(tupledArg_6[0], tupledArg_6[1], tupledArg_6[2]))((cursorPos_3 = mkPos(line, loc), this.GetClassOrRecordFieldsEnvironmentLookupResolutions(cursorPos_3, $var59[1])));

        if (matchValue[0].tail == null) {
          const allSymbols = () => new List();

          res = this.GetDeclaredItems(parseResultsOpt, lineStr, origLongIdentOpt, colAtEndOfNamesAndResidue, residueOpt, lastDotPos, line, loc, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck, false, allSymbols);
        } else {
          res = matchValue;
        }

        break;

      case 5:
        const matchValue_1 = this.GetRecdFieldsForExpr($var59[2]);

        if (matchValue_1 != null) {
          const m = getValue(matchValue_1)[2];
          const items = getValue(matchValue_1)[0];
          const denv = getValue(matchValue_1)[1];
          res = defaultArg([map(arg00_ => ItemWithNoInst(arg00_), items), denv, m], null, tupledArg_7 => this.toCompletionItems(tupledArg_7[0], tupledArg_7[1], tupledArg_7[2]));
        } else {
          res = defaultArg((cursorPos_4 = mkPos(line, loc), this.GetClassOrRecordFieldsEnvironmentLookupResolutions(cursorPos_4, $var59[1])), null, tupledArg_8 => this.toCompletionItems(tupledArg_8[0], tupledArg_8[1], tupledArg_8[2]));
        }

        break;

      case 6:
        res = defaultArg((cursorPos_5 = mkPos(line, loc), plid = ofArray([$var59[1]]), this.GetClassOrRecordFieldsEnvironmentLookupResolutions(cursorPos_5, plid)), null, tupledArg_9 => this.toCompletionItems(tupledArg_9[0], tupledArg_9[1], tupledArg_9[2]));
        break;

      case 7:
        const results = this.GetNamedParametersAndSettableFields($var59[1], hasTextChangedSinceLastTypecheck);
        const declaredItems = this.GetDeclaredItems(parseResultsOpt, lineStr, origLongIdentOpt, colAtEndOfNamesAndResidue, residueOpt, lastDotPos, line, loc, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck, false, getAllSymbols);

        if (results.tag === 0) {
          const m_1 = results.data[2];
          const items_1 = results.data[0];
          const denv_1 = results.data[1];
          const filtered = map(item => {
            const Kind = new CompletionItemKind(4);
            return new CompletionItem(item, Kind, false, 0, null, null);
          }, filter(item_1 => !$var59[2].has(item_1.Item.DisplayName), SymbolHelpers.RemoveExplicitlySuppressed(this.g, SymbolHelpers.RemoveDuplicateItems(this.g, items_1))));

          if (declaredItems != null) {
            const declaredRange = getValue(declaredItems)[2];
            const declaredDisplayEnv = getValue(declaredItems)[1];
            const declItems = getValue(declaredItems)[0];
            res = [append(filtered, declItems), declaredDisplayEnv, declaredRange];
          } else {
            res = this.toCompletionItems(items_1, denv_1, m_1);
          }
        } else {
          res = declaredItems;
        }

        break;

      case 8:
        res = defaultArg(this.GetDeclaredItems(parseResultsOpt, lineStr, origLongIdentOpt, colAtEndOfNamesAndResidue, residueOpt, lastDotPos, line, loc, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck, false, getAllSymbols), null, tupledArg_10 => [filter(cItem => {
          const matchValue_2 = cItem.Item;

          if (matchValue_2.tag === 18) {
            return true;
          } else if (SymbolHelpers.IsAttribute(this.infoReader, cItem.Item)) {
            return true;
          } else {
            return false;
          }
        }, tupledArg_10[0]), tupledArg_10[1], tupledArg_10[2]]);
        break;

      case 9:
        res = defaultArg(this.GetDeclaredItems(parseResultsOpt, lineStr, origLongIdentOpt, colAtEndOfNamesAndResidue, residueOpt, lastDotPos, line, loc, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck, false, getAllSymbols), null, tupledArg_11 => [filter(x_7 => {
          const matchValue_3 = x_7.Item;

          if (matchValue_3.tag === 18) {
            return true;
          } else {
            return false;
          }
        }, tupledArg_11[0]), tupledArg_11[1], tupledArg_11[2]]);
        break;

      case 10:
        res = defaultArg(this.GetDeclaredItems(parseResultsOpt, lineStr, origLongIdentOpt, colAtEndOfNamesAndResidue, residueOpt, lastDotPos, line, loc, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck, false, getAllSymbols), null, tupledArg_12 => [filter(cItem_1 => {
          const matchValue_4 = cItem_1.Item;

          switch (matchValue_4.tag) {
            case 18:
            case 14:
            case 22:
            case 4:
              return true;

            default:
              return false;
          }
        }, tupledArg_12[0]), tupledArg_12[1], tupledArg_12[2]]);
        break;

      case 11:
        const matchValue_5 = defaultArg(residueOpt, null, source => tryHead(source));
        const $var63 = matchValue_5 != null ? getValue(matchValue_5) === "'" ? [0] : [1] : [1];

        switch ($var63[0]) {
          case 0:
            res = null;
            break;

          case 1:
            let isInRangeOperator;
            const $var64 = $var59[1] != null ? getValue($var59[1]).tag === 3 ? [0] : [1] : [1];

            switch ($var64[0]) {
              case 0:
                isInRangeOperator = true;
                break;

              case 1:
                isInRangeOperator = false;
                break;
            }

            res = this.GetDeclaredItems(parseResultsOpt, lineStr, origLongIdentOpt, colAtEndOfNamesAndResidue, residueOpt, lastDotPos, line, loc, filterCtors, resolveOverloads, hasTextChangedSinceLastTypecheck, isInRangeOperator, getAllSymbols);
            break;
        }

        break;
    }

    return defaultArg(res, null, tupledArg_13 => [tupledArg_13[0], tupledArg_13[1], completionContext, tupledArg_13[2]]);
  }

  IsValidSignatureFileItem(item) {
    const $var65 = item.tag === 14 ? [0] : item.tag === 18 ? [0] : [1];

    switch ($var65[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.TypeCheckInfo", TypeCheckInfo);
export class FSharpParsingOptions {
  constructor(sourceFiles, conditionalCompilationDefines, errorSeverityOptions, isInteractive, lightSyntax, compilingFsLib, isExe) {
    this.SourceFiles = sourceFiles;
    this.ConditionalCompilationDefines = conditionalCompilationDefines;
    this.ErrorSeverityOptions = errorSeverityOptions;
    this.IsInteractive = isInteractive;
    this.LightSyntax = lightSyntax;
    this.CompilingFsLib = compilingFsLib;
    this.IsExe = isExe;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpParsingOptions",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        SourceFiles: _Array("string"),
        ConditionalCompilationDefines: makeGeneric(List, {
          T: "string"
        }),
        ErrorSeverityOptions: FSharpErrorSeverityOptions,
        IsInteractive: "boolean",
        LightSyntax: Option("boolean"),
        CompilingFsLib: "boolean",
        IsExe: "boolean"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  get LastFileName() {
    return last(this.SourceFiles);
  }

  static get Default() {
    return new FSharpParsingOptions(new Array(0), new List(), FSharpErrorSeverityOptions.Default, false, null, false, false);
  }

  static FromTcConfig(tcConfig, sourceFiles, isInteractive) {
    return new FSharpParsingOptions(sourceFiles, tcConfig.conditionalCompilationDefines, tcConfig.errorSeverityOptions, isInteractive, tcConfig.light, tcConfig.compilingFslib, tcConfig.target.IsExe);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpParsingOptions", FSharpParsingOptions);
export const Parser = function (__exports) {
  const GetFileInfoForLastLineErrors = __exports.GetFileInfoForLastLineErrors = function (source) {
    const lastLine = sumBy(function (c) {
      return c === "\n" ? 1 : 0;
    }, source) + 1 | 0;
    const lastLineLength = source.length - source.lastIndexOf("\n") - 1 | 0;
    return [lastLine, lastLineLength];
  };

  const ErrorHandler = __exports.ErrorHandler = class ErrorHandler {
    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.Parser.ErrorHandler",
        properties: {
          AnyErrors: "boolean",
          CollectedDiagnostics: _Array(FSharpErrorInfo),
          ErrorCount: "number",
          ErrorLogger: ErrorLogger
        }
      };
    }

    constructor(reportErrors, mainInputFileName, errorSeverityOptions, source) {
      this.reportErrors = reportErrors;
      this.mainInputFileName = mainInputFileName;
      this.options = errorSeverityOptions;
      this.errorsAndWarningsCollector = [];
      this.errorCount = 0;
      this.fileInfo = GetFileInfoForLastLineErrors(source);
      const $var66 = this;
      this.errorLogger = new class extends ErrorLogger {
        constructor() {
          return super("ErrorHandler");
        }

        DiagnosticSink(exn, isError) {
          const sev = isError ? new FSharpErrorSeverity(1) : new FSharpErrorSeverity(0);
          $var66.diagnosticSink(sev, exn);
        }

        get ErrorCount() {
          return $var66.errorCount;
        }

        [_Symbol.reflection]() {
          return {
            interfaces: ["Microsoft.FSharp.Compiler.ErrorLogger.ErrorLogger"]
          };
        }

      }();
    }

    get ErrorLogger() {
      return this.errorLogger;
    }

    get CollectedDiagnostics() {
      return Array.from(this.errorsAndWarningsCollector);
    }

    get ErrorCount() {
      return this.errorCount;
    }

    set ErrorSeverityOptions(opts) {
      this.options = opts;
    }

    get AnyErrors() {
      return this.errorCount > 0;
    }

    diagnosticSink(sev, exn) {
      let exn_1;

      if (!exn.IsPhaseInCompile()) {
        System.Diagnostics.Trace.TraceInformation(toText(printf("The subcategory '%s' seen in an error should not be seen by the language service"))(exn.Subcategory()));
        const Phase = new BuildPhase(4);
        exn_1 = new PhasedDiagnostic(exn.Exception, Phase);
      } else {
        exn_1 = exn;
      }

      if (this.reportErrors) {
        const report = exn_2 => {
          const inputSequence = ErrorHelpers.ReportError(this.options, false, this.mainInputFileName, this.fileInfo, [exn_2, sev]);

          for (let ei of inputSequence) {
            this.errorsAndWarningsCollector.push(ei);

            if (sev.Equals(new FSharpErrorSeverity(1))) {
              this.errorCount = this.errorCount + 1 | 0;
            }
          }
        };

        report(exn_1);
      }
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.Parser.ErrorHandler", ErrorHandler);

  const getLightSyntaxStatus = __exports.getLightSyntaxStatus = function (fileName, options) {
    const lower = _String.lowercase(fileName);

    const lightOnByDefault = exists(function (arg10_) {
      return checkSuffix(lower, arg10_);
    }, FSharpLightSyntaxFileSuffixes);
    const lightSyntaxStatus = lightOnByDefault ? !equals(options.LightSyntax, false) : equals(options.LightSyntax, true);
    return LightSyntaxStatus[".ctor"](lightSyntaxStatus, true);
  };

  const createLexerFunction = __exports.createLexerFunction = function (fileName, options, lexbuf, errHandler) {
    var lightSyntaxStatus;
    var defines;
    var lexResourceManager;
    var lexargs;
    var lexargs_1;
    var tokenizer;
    return CurriedLambda((lightSyntaxStatus = getLightSyntaxStatus(fileName, options), defines = append(SourceFileImpl.AdditionalDefinesForUseInEditor(options.IsInteractive), options.ConditionalCompilationDefines), lexResourceManager = LexResourceManager[".ctor"](), lexargs = mkLexargs(fileName, defines, lightSyntaxStatus, lexResourceManager, {
      contents: new List()
    }, errHandler.ErrorLogger), lexargs_1 = new lexargs_2(lexargs.defines, lexargs.ifdefStack, lexargs.resourceManager, lexargs.lightSyntaxStatus, lexargs.errorLogger, false), tokenizer = new LexFilter(lightSyntaxStatus, options.CompilingFsLib, function (lexbuf_1) {
      return token(lexargs_1, true, lexbuf_1);
    }, lexbuf), function (arg00) {
      return tokenizer.Lexer(arg00);
    }));
  };

  const addNewLine = __exports.addNewLine = function (source) {
    if (source.length === 0 ? true : !(source[source.length - 1] === "\n")) {
      return source + "\n";
    } else {
      return source;
    }
  };

  const matchBraces = __exports.matchBraces = function (source, fileName, options, userOpName) {
    const delayedLogger = new CapturingErrorLogger("matchBraces");

    const _unwindEL = PushErrorLoggerPhaseUntilUnwind(function (_arg1) {
      return delayedLogger;
    });

    try {
      const _unwindBP = PushThreadBuildPhaseUntilUnwind(new BuildPhase(3));

      try {
        System.Diagnostics.Trace.TraceInformation(["FCS: {0}.{1} ({2})", userOpName, "matchBraces", fileName]);
        const delayedLogger_1 = new CapturingErrorLogger("matchBraces");

        const _unwindEL_1 = PushErrorLoggerPhaseUntilUnwind(function (_arg2) {
          return delayedLogger_1;
        });

        try {
          const _unwindBP_1 = PushThreadBuildPhaseUntilUnwind(new BuildPhase(3));

          try {
            const matchingBraces = [];
            usingLexbufForParsing(StringAsLexbuf(addNewLine(source)), fileName, function (lexbuf) {
              const errHandler = new ErrorHandler(false, fileName, options.ErrorSeverityOptions, source);
              const lexfun = createLexerFunction(fileName, options, lexbuf, errHandler);

              const parenTokensBalance = function (t1, t2) {
                const matchValue = [t1, t2];
                const $var67 = matchValue[0].tag === 92 ? matchValue[1].tag === 93 ? [0] : matchValue[1].tag === 95 ? [0] : [2] : matchValue[0].tag === 74 ? matchValue[1].tag === 59 ? [0] : matchValue[1].tag === 61 ? [0] : [2] : matchValue[0].tag === 56 ? matchValue[1].tag === 141 ? [0] : [2] : matchValue[0].tag === 55 ? matchValue[1].tag === 141 ? [0] : [2] : matchValue[0].tag === 72 ? matchValue[1].tag === 65 ? [0] : [2] : matchValue[0].tag === 71 ? matchValue[1].tag === 58 ? [0] : [2] : matchValue[0].tag === 73 ? matchValue[1].tag === 54 ? [0] : [2] : matchValue[0].tag === 135 ? matchValue[1].tag === 141 ? [0] : [2] : matchValue[0].tag === 153 ? matchValue[1].tag === 154 ? [1, matchValue[0].data, matchValue[1].data] : [2] : [2];

                switch ($var67[0]) {
                  case 0:
                    return true;

                  case 1:
                    return equals($var67[1], $var67[2]);

                  case 2:
                    return false;
                }
              };

              const matchBraces_1 = function (stack) {
                var tok1;
                var stack_;
                var m1;
                const matchValue_1 = [lexfun(lexbuf), stack];
                const $var68 = matchValue_1[1].tail != null ? (tok1 = matchValue_1[1].head[0], stack_ = matchValue_1[1].tail, m1 = matchValue_1[1].head[1], parenTokensBalance(tok1, matchValue_1[0])) ? [0, matchValue_1[1].head[1], matchValue_1[1].tail, matchValue_1[1].head[0], matchValue_1[0]] : [1] : [1];

                switch ($var68[0]) {
                  case 0:
                    matchingBraces.push([$var68[1], LexBuffer_1_get_LexemeRange.bind(lexbuf)()]);
                    matchBraces_1($var68[2]);
                    break;

                  case 1:
                    const $var69 = matchValue_1[0].tag === 92 ? [0, matchValue_1[0]] : matchValue_1[0].tag === 74 ? [0, matchValue_1[0]] : matchValue_1[0].tag === 71 ? [0, matchValue_1[0]] : matchValue_1[0].tag === 72 ? [0, matchValue_1[0]] : matchValue_1[0].tag === 153 ? [0, matchValue_1[0]] : matchValue_1[0].tag === 73 ? [0, matchValue_1[0]] : matchValue_1[0].tag === 10 ? [1] : matchValue_1[0].tag === 11 ? [1] : [2];

                    switch ($var69[0]) {
                      case 0:
                        matchBraces_1(new List([$var69[1], LexBuffer_1_get_LexemeRange.bind(lexbuf)()], stack));
                        break;

                      case 1:
                        break;

                      case 2:
                        matchBraces_1(stack);
                        break;
                    }

                    break;
                }
              };

              matchBraces_1(new List());
            });
            return Array.from(matchingBraces);
          } finally {
            if (hasInterface(_unwindBP_1, "System.IDisposable")) {
              _unwindBP_1.Dispose();
            }
          }
        } finally {
          if (hasInterface(_unwindEL_1, "System.IDisposable")) {
            _unwindEL_1.Dispose();
          }
        }
      } finally {
        if (hasInterface(_unwindBP, "System.IDisposable")) {
          _unwindBP.Dispose();
        }
      }
    } finally {
      if (hasInterface(_unwindEL, "System.IDisposable")) {
        _unwindEL.Dispose();
      }
    }
  };

  const parseFile = __exports.parseFile = function (source, fileName, options, userOpName) {
    System.Diagnostics.Trace.TraceInformation(["FCS: {0}.{1} ({2})", userOpName, "parseFile", fileName]);
    const errHandler = new ErrorHandler(true, fileName, options.ErrorSeverityOptions, source);
    const unwindEL = PushErrorLoggerPhaseUntilUnwind(function (_oldLogger) {
      return errHandler.ErrorLogger;
    });

    try {
      const unwindBP = PushThreadBuildPhaseUntilUnwind(new BuildPhase(3));

      try {
        const parseResult = usingLexbufForParsing(StringAsLexbuf(addNewLine(source)), fileName, function (lexbuf) {
          const lexfun = createLexerFunction(fileName, options, lexbuf, errHandler);
          const isLastCompiland = compare_1(fileName, options.LastFileName, 5) === 0 ? true : IsScript(fileName);

          try {
            return ParseInput(lexfun, errHandler.ErrorLogger, lexbuf, null, fileName, [isLastCompiland, options.IsExe]);
          } catch (e) {
            ErrorLoggerExtensions["ErrorLogger.ErrorR"].bind(errHandler.ErrorLogger)(e);
            return null;
          }
        });
        return [errHandler.CollectedDiagnostics, parseResult, errHandler.AnyErrors];
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
  };

  const TypeCheckAborted = __exports.TypeCheckAborted = class TypeCheckAborted {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.Parser.TypeCheckAborted",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Yes"], ["No", TypeCheckInfo]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.Parser.TypeCheckAborted", TypeCheckAborted);

  const CheckOneFile = __exports.CheckOneFile = function (parseResults, source, mainInputFileName, projectFileName, tcConfig, tcGlobals, tcImports, tcState, loadClosure, backgroundDiagnostics, reactorOps, checkAlive, textSnapshotInfo, userOpName) {
    const matchValue = parseResults.ParseTree;

    if (matchValue != null) {
      const errHandler = new ErrorHandler(true, mainInputFileName, tcConfig.errorSeverityOptions, source);

      const _unwindEL = PushErrorLoggerPhaseUntilUnwind(function (_oldLogger) {
        return errHandler.ErrorLogger;
      });

      try {
        const _unwindBP = PushThreadBuildPhaseUntilUnwind(new BuildPhase(4));

        try {
          errHandler.ErrorSeverityOptions = tcConfig.errorSeverityOptions;

          for (let idx = 0; idx <= backgroundDiagnostics.length - 1; idx++) {
            const forLoopVar = backgroundDiagnostics[idx];
            diagnosticSink(forLoopVar[0], forLoopVar[1].Equals(new FSharpErrorSeverity(1)));
          }

          tcState.NiceNameGenerator.Reset();
          const sink = TcResultsSinkImpl[".ctor"](tcGlobals, source);
          userOpName;
          let resOpt;

          try {
            const ctok = AssumeCompilationThreadWithoutEvidence();

            const checkForErrors = function () {
              return parseResults.ParseHadErrors ? true : errHandler.ErrorCount > 0;
            };

            const patternInput = function (e) {
              return EventuallyModule.force(ctok, e);
            }(TypeCheckOneInputAndFinishEventually(checkForErrors, tcConfig, tcImports, tcGlobals, null, TcResultsSink.WithSink(sink), tcState, getValue(matchValue)));

            const tcEnvAtEnd = patternInput[0][0];
            const implFiles = patternInput[0][2];
            const ccuSigsForFiles = patternInput[0][3];
            resOpt = [tcEnvAtEnd, implFiles, ccuSigsForFiles, patternInput[1]];
          } catch (e_1) {
            errorR(e_1);
            resOpt = [tcState.TcEnvFromSignatures, new List(), ofArray([NewEmptyModuleOrNamespaceType(new ModuleOrNamespaceKind(2))]), tcState];
          }

          const errors = errHandler.CollectedDiagnostics;

          if (resOpt == null) {
            return [errors, new TypeCheckAborted(0)];
          } else {
            const tcState_1 = getValue(resOpt)[3];
            const tcEnvAtEnd_1 = getValue(resOpt)[0];
            const implFiles_1 = getValue(resOpt)[1];
            const ccuSigsForFiles_1 = getValue(resOpt)[2];
            const scope = new TypeCheckInfo(tcConfig, tcGlobals, ccuSigsForFiles_1.head, tcState_1.Ccu, tcImports, tcEnvAtEnd_1.AccessRights, projectFileName, mainInputFileName, sink.GetResolutions(), sink.GetSymbolUses(), tcEnvAtEnd_1.NameEnv, loadClosure, reactorOps, checkAlive, textSnapshotInfo, tryHead(implFiles_1), sink.GetOpenDeclarations());
            return [errors, new TypeCheckAborted(1, scope)];
          }
        } finally {
          if (hasInterface(_unwindBP, "System.IDisposable")) {
            _unwindBP.Dispose();
          }
        }
      } finally {
        if (hasInterface(_unwindEL, "System.IDisposable")) {
          _unwindEL.Dispose();
        }
      }
    } else {
      return [[], new TypeCheckAborted(0)];
    }
  };

  return __exports;
}({});
export class UnresolvedReferencesSet {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.UnresolvedReferencesSet",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["UnresolvedReferencesSet", makeGeneric(List, {
        T: UnresolvedAssemblyReference
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.UnresolvedReferencesSet", UnresolvedReferencesSet);
export class FSharpProjectOptions {
  constructor(projectFileName, sourceFiles, otherOptions, referencedProjects, isIncompleteTypeCheckEnvironment, useScriptResolutionRules, loadTime, unresolvedReferences, originalLoadReferences, extraProjectInfo, stamp) {
    this.ProjectFileName = projectFileName;
    this.SourceFiles = sourceFiles;
    this.OtherOptions = otherOptions;
    this.ReferencedProjects = referencedProjects;
    this.IsIncompleteTypeCheckEnvironment = isIncompleteTypeCheckEnvironment;
    this.UseScriptResolutionRules = useScriptResolutionRules;
    this.LoadTime = loadTime;
    this.UnresolvedReferences = unresolvedReferences;
    this.OriginalLoadReferences = originalLoadReferences;
    this.ExtraProjectInfo = extraProjectInfo;
    this.Stamp = stamp;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpProjectOptions",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        ProjectFileName: "string",
        SourceFiles: _Array("string"),
        OtherOptions: _Array("string"),
        ReferencedProjects: _Array(Tuple(["string", FSharpProjectOptions])),
        IsIncompleteTypeCheckEnvironment: "boolean",
        UseScriptResolutionRules: "boolean",
        LoadTime: Date,
        UnresolvedReferences: Option(UnresolvedReferencesSet),
        OriginalLoadReferences: makeGeneric(List, {
          T: Tuple([range_1, "string"])
        }),
        ExtraProjectInfo: Option(Any),
        Stamp: Option(Long)
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  get ProjectOptions() {
    return this.OtherOptions;
  }

  static UseSameProjectFileName(options1, options2) {
    return options1.ProjectFileName === options2.ProjectFileName;
  }

  static AreSameForChecking(options1, options2) {
    const matchValue = [options1.Stamp, options2.Stamp];
    const $var70 = matchValue[0] != null ? matchValue[1] != null ? [0, getValue(matchValue[0]), getValue(matchValue[1])] : [1] : [1];

    switch ($var70[0]) {
      case 0:
        return $var70[1].Equals($var70[2]);

      case 1:
        if ((((((options1.ProjectFileName === options2.ProjectFileName ? equals(options1.SourceFiles, options2.SourceFiles) : false) ? equals(options1.OtherOptions, options2.OtherOptions) : false) ? equals(options1.UnresolvedReferences, options2.UnresolvedReferences) : false) ? options1.OriginalLoadReferences.Equals(options2.OriginalLoadReferences) : false) ? options1.ReferencedProjects.length === options2.ReferencedProjects.length : false) ? forAll2(function (tupledArg, tupledArg_1) {
          return tupledArg[0] === tupledArg_1[0] ? FSharpProjectOptions.AreSameForChecking(tupledArg[1], tupledArg_1[1]) : false;
        }, options1.ReferencedProjects, options2.ReferencedProjects) : false) {
          return equals_1(options1.LoadTime, options2.LoadTime);
        } else {
          return false;
        }

    }
  }

  get ProjectDirectory() {
    return System.IO.Path.GetDirectoryName(this.ProjectFileName);
  }

  ToString() {
    return "FSharpProjectOptions(" + this.ProjectFileName + ")";
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpProjectOptions", FSharpProjectOptions);
export class FSharpProjectContext {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpProjectContext",
      properties: {
        AccessibilityRights: FSharpAccessibilityRights
      }
    };
  }

  constructor(thisCcu, assemblies, ad) {
    this.thisCcu = thisCcu;
    this.assemblies = assemblies;
    this.ad = ad;
  }

  GetReferencedAssemblies() {
    return this.assemblies;
  }

  get AccessibilityRights() {
    return FSharpAccessibilityRights[".ctor"](this.thisCcu, this.ad);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpProjectContext", FSharpProjectContext);
export class FSharpCheckProjectResults {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpCheckProjectResults",
      properties: {
        AssemblyContents: FSharpAssemblyContents,
        AssemblyFullName: "string",
        AssemblySignature: FSharpAssemblySignature,
        DependencyFiles: _Array("string"),
        Errors: _Array(FSharpErrorInfo),
        HasCriticalErrors: "boolean",
        ProjectContext: FSharpProjectContext,
        RawFSharpAssemblyData: Option(Interface("Microsoft.FSharp.Compiler.CompileOps.IRawFSharpAssemblyData")),
        TypedImplementionFiles: Tuple([TcGlobals, CcuThunk, TcImports, makeGeneric(List, {
          T: TypedImplFile
        })])
      }
    };
  }

  constructor(projectFileName, tcConfigOption, keepAssemblyContents, errors, details) {
    this.projectFileName = projectFileName;
    this.tcConfigOption = tcConfigOption;
    this.keepAssemblyContents = keepAssemblyContents;
    this.errors = errors;
    this.details = details;
  }

  static [".ctor"](projectFileName, tcConfigOption, keepAssemblyContents, errors, details, _arg1) {
    return new FSharpCheckProjectResults(projectFileName, tcConfigOption, keepAssemblyContents, errors, details);
  }

  get Errors() {
    return this.errors;
  }

  get HasCriticalErrors() {
    return CurriedLambda(() => this.details == null)();
  }

  get AssemblySignature() {
    const patternInput = this.getDetails();
    return FSharpAssemblySignature[".ctor_1"](patternInput[0], patternInput[2], patternInput[3], patternInput[1], patternInput[5], patternInput[3]);
  }

  get TypedImplementionFiles() {
    if (!this.keepAssemblyContents) {
      throw new Error("The 'keepAssemblyContents' flag must be set to true on the FSharpChecker in order to access the checked contents of assemblies");
    }

    const patternInput = this.getDetails();
    const mimpls = patternInput[9] != null ? getValue(patternInput[9]) : new List();
    return [patternInput[0], patternInput[2], patternInput[1], mimpls];
  }

  get AssemblyContents() {
    if (!this.keepAssemblyContents) {
      throw new Error("The 'keepAssemblyContents' flag must be set to true on the FSharpChecker in order to access the checked contents of assemblies");
    }

    const patternInput = this.getDetails();
    const mimpls = patternInput[9] != null ? getValue(patternInput[9]) : new List();
    return FSharpAssemblyContents[".ctor"](patternInput[0], patternInput[2], patternInput[3], patternInput[1], mimpls);
  }

  GetOptimizedAssemblyContents() {
    if (!this.keepAssemblyContents) {
      throw new Error("The 'keepAssemblyContents' flag must be set to true on the FSharpChecker in order to access the checked contents of assemblies");
    }

    const patternInput = this.getDetails();
    const mimpls = patternInput[9] != null ? getValue(patternInput[9]) : new List();
    const importMap = patternInput[1].GetImportMap();
    const optEnv0 = GetInitialOptimizationEnv(patternInput[1], patternInput[0]);
    const tcConfig = this.getTcConfig();
    const patternInput_1 = ApplyAllOptimizations(tcConfig, patternInput[0], (vref, vrefFlags, vrefTypeInst, m) => LightweightTcValForUsingInBuildMethodCall(patternInput[0], vref, vrefFlags, vrefTypeInst, m), "", importMap, false, optEnv0, patternInput[2], mimpls);
    const mimpls_1 = map(tuple => tuple[0], patternInput_1[0].data);
    return FSharpAssemblyContents[".ctor"](patternInput[0], patternInput[2], patternInput[3], patternInput[1], mimpls_1);
  }

  GetUsesOfSymbol(symbol) {
    const patternInput = this.getDetails();
    return (arg00 => singleton.Return(arg00))(Array.from(map_1(symbolUse => FSharpSymbolUse[".ctor"](patternInput[0], symbolUse.DisplayEnv, symbol, symbolUse.ItemOccurence, symbolUse.Range), filter_1(symbolUse_1 => !symbolUse_1.ItemOccurence.Equals(new ItemOccurence(6)), distinctBy(symbolUse_2 => [symbolUse_2.ItemOccurence, symbolUse_2.Range], collect_1(r => r.GetUsesOfSymbol(symbol.Item), patternInput[4]))))));
  }

  GetAllUsesOfAllSymbols() {
    const patternInput = this.getDetails();
    return (arg00 => singleton.Return(arg00))(Array.from(delay(() => collect_1(r => collect_1(symbolUse => {
      if (!symbolUse.ItemOccurence.Equals(new ItemOccurence(6))) {
        const symbol = FSharpSymbol.Create_0(patternInput[0], patternInput[2], patternInput[3], patternInput[1], symbolUse.Item);
        return singleton_1(FSharpSymbolUse[".ctor"](patternInput[0], symbolUse.DisplayEnv, symbol, symbolUse.ItemOccurence, symbolUse.Range));
      } else {
        return empty();
      }
    }, r.AllUsesOfSymbols), patternInput[4]))));
  }

  get ProjectContext() {
    const patternInput = this.getDetails();
    const assemblies = toList(delay(() => map_1(x => FSharpAssembly[".ctor"](patternInput[0], patternInput[1], x.FSharpViewOfMetadata), patternInput[1].GetImportedAssemblies())));
    return new FSharpProjectContext(patternInput[2], assemblies, patternInput[8]);
  }

  get RawFSharpAssemblyData() {
    const patternInput = this.getDetails();
    return patternInput[6];
  }

  get DependencyFiles() {
    const patternInput = this.getDetails();
    return patternInput[10];
  }

  get AssemblyFullName() {
    const patternInput = this.getDetails();
    return patternInput[7].QualifiedName;
  }

  ToString() {
    return "FSharpCheckProjectResults(" + this.projectFileName + ")";
  }

  getDetails() {
    const matchValue = this.details;

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      throw new Error("The project has no results due to critical errors in the project options. Check the HasCriticalErrors before accessing the detailed results. Errors: " + join("\n", toList(delay(() => map_1(e => e.Message, this.errors)))));
    }
  }

  getTcConfig() {
    const matchValue = this.tcConfigOption;

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      throw new Error("The project has no results due to critical errors in the project options. Check the HasCriticalErrors before accessing the detailed results. Errors: " + join("\n", toList(delay(() => map_1(e => e.Message, this.errors)))));
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpCheckProjectResults", FSharpCheckProjectResults);
export class FSharpCheckFileResults {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpCheckFileResults",
      properties: {
        DependencyFiles: _Array("string"),
        Errors: _Array(FSharpErrorInfo),
        HasFullTypeCheckInfo: "boolean",
        ImplementationFile: Option(FSharpImplementationFileContents),
        OpenDeclarations: _Array(FSharpOpenDeclaration),
        PartialAssemblySignature: FSharpAssemblySignature,
        ProjectContext: FSharpProjectContext
      }
    };
  }

  constructor(filename, errors, scopeOptX, dependencyFiles, builderX, reactorOpsX, keepAssemblyContents) {
    this.filename = filename;
    this.errors = errors;
    this.scopeOptX = scopeOptX;
    this.dependencyFiles = dependencyFiles;
    this.keepAssemblyContents = keepAssemblyContents;
    const matchValue = this.scopeOptX;

    if (matchValue != null) {
      this.details = [getValue(matchValue), builderX, reactorOpsX];
    } else {
      this.details = null;
    }

    const matchValue_1 = this.details;

    if (matchValue_1 != null) {
      const builderOpt = getValue(matchValue_1)[1];
      this.decrementer = IncrementalBuilder.KeepBuilderAlive(builderOpt);
    } else {
      const $var71 = this;
      this.decrementer = {
        Dispose() {},

        [_Symbol.reflection]() {
          return {
            interfaces: ["System.IDisposable"]
          };
        }

      };
    }

    this.disposed = false;
  }

  static [".ctor"](filename, errors, scopeOptX, dependencyFiles, builderX, reactorOpsX, keepAssemblyContents, _arg1) {
    return new FSharpCheckFileResults(filename, errors, scopeOptX, dependencyFiles, builderX, reactorOpsX, keepAssemblyContents);
  }

  Finalize() {
    this.dispose();
  }

  get Errors() {
    return this.errors;
  }

  get HasFullTypeCheckInfo() {
    return CurriedLambda(() => this.details != null)();
  }

  GetDeclarationListInfo(parseResultsOpt, line, lineStr, partialName, getAllEntities, hasTextChangedSinceLastTypecheck, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const getAllEntities_1 = getAllEntities != null ? getAllEntities : () => new List();
    const hasTextChangedSinceLastTypecheck_1 = hasTextChangedSinceLastTypecheck != null ? hasTextChangedSinceLastTypecheck : _arg1 => false;
    const dflt = FSharpDeclarationListInfo.Empty;

    const f = (ctok, scope) => {
      return scope.GetDeclarations(ctok, parseResultsOpt, line, lineStr, partialName, getAllEntities_1, hasTextChangedSinceLastTypecheck_1);
    };

    return this.reactorOp(userOpName_1, "GetDeclarations", dflt, f);
  }

  GetDeclarationListSymbols(parseResultsOpt, line, lineStr, partialName, getAllEntities, hasTextChangedSinceLastTypecheck, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const hasTextChangedSinceLastTypecheck_1 = hasTextChangedSinceLastTypecheck != null ? hasTextChangedSinceLastTypecheck : _arg2 => false;
    const getAllEntities_1 = getAllEntities != null ? getAllEntities : () => new List();
    const dflt = new List();

    const f = (ctok, scope) => {
      return scope.GetDeclarationListSymbols(ctok, parseResultsOpt, line, lineStr, partialName, getAllEntities_1, hasTextChangedSinceLastTypecheck_1);
    };

    return this.reactorOp(userOpName_1, "GetDeclarationListSymbols", dflt, f);
  }

  GetStructuredToolTipText(line, colAtEndOfNames, lineStr, names, tokenTag, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const dflt = new FSharpToolTipText(0, new List());
    const matchValue = tokenTagToTokenId(tokenTag);
    const $var72 = matchValue.tag === 189 ? [0] : matchValue.tag === 191 ? [1] : matchValue.tag === 9 ? [1] : [2];

    switch ($var72[0]) {
      case 0:
        const f = (ctok, scope) => {
          return scope.GetStructuredToolTipText(ctok, line, lineStr, colAtEndOfNames, names);
        };

        return this.reactorOp(userOpName_1, "GetStructuredToolTipText", dflt, f);

      case 1:
        const f_1 = (ctok_1, scope_1) => {
          return scope_1.GetReferenceResolutionStructuredToolTipText(ctok_1, line, colAtEndOfNames);
        };

        return this.reactorOp(userOpName_1, "GetReferenceResolutionToolTipText", dflt, f_1);

      case 2:
        return singleton.Return(dflt);
    }
  }

  GetToolTipText(line, colAtEndOfNames, lineStr, names, tokenTag, userOpName) {
    return (a => Tooltips.Map(arg00_ => Tooltips.ToFSharpToolTipText(arg00_), a))(this.GetStructuredToolTipText(line, colAtEndOfNames, lineStr, names, tokenTag, userOpName));
  }

  GetF1Keyword(line, colAtEndOfNames, lineStr, names, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const dflt = null;

    const f = (ctok, scope) => {
      return scope.GetF1Keyword(ctok, line, lineStr, colAtEndOfNames, names);
    };

    return this.reactorOp(userOpName_1, "GetF1Keyword", dflt, f);
  }

  GetMethods(line, colAtEndOfNames, lineStr, names, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const dflt = FSharpMethodGroup[".ctor"]("", []);

    const f = (ctok, scope) => {
      return scope.GetMethods(ctok, line, lineStr, colAtEndOfNames, names);
    };

    return this.reactorOp(userOpName_1, "GetMethods", dflt, f);
  }

  GetDeclarationLocation(line, colAtEndOfNames, lineStr, names, preferFlag, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const dflt = new FSharpFindDeclResult(0, new FSharpFindDeclFailureReason(0, ""));

    const f = (ctok, scope) => {
      return scope.GetDeclarationLocation(ctok, line, lineStr, colAtEndOfNames, names, preferFlag);
    };

    return this.reactorOp(userOpName_1, "GetDeclarationLocation", dflt, f);
  }

  GetSymbolUseAtLocation(line, colAtEndOfNames, lineStr, names, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const dflt = null;

    const f = (ctok, scope) => {
      return defaultArg(scope.GetSymbolUseAtLocation(ctok, line, lineStr, colAtEndOfNames, names), null, tupledArg => FSharpSymbolUse[".ctor"](scope.TcGlobals, tupledArg[1], tupledArg[0], new ItemOccurence(1), tupledArg[2]));
    };

    return this.reactorOp(userOpName_1, "GetSymbolUseAtLocation", dflt, f);
  }

  GetMethodsAsSymbols(line, colAtEndOfNames, lineStr, names, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const dflt = null;

    const f = (ctok, scope) => {
      return defaultArg(scope.GetMethodsAsSymbols(ctok, line, lineStr, colAtEndOfNames, names), null, tupledArg => map(sym => FSharpSymbolUse[".ctor"](scope.TcGlobals, tupledArg[1], sym, new ItemOccurence(1), tupledArg[2]), tupledArg[0]));
    };

    return this.reactorOp(userOpName_1, "GetMethodsAsSymbols", dflt, f);
  }

  GetSymbolAtLocation(line, colAtEndOfNames, lineStr, names, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";
    const dflt = null;

    const f = (ctok, scope) => {
      return defaultArg(scope.GetSymbolUseAtLocation(ctok, line, lineStr, colAtEndOfNames, names), null, tupledArg => tupledArg[0]);
    };

    return this.reactorOp(userOpName_1, "GetSymbolAtLocation", dflt, f);
  }

  GetFormatSpecifierLocations() {
    return map_2(tuple => tuple[0], this.GetFormatSpecifierLocationsAndArity(), Array);
  }

  GetFormatSpecifierLocationsAndArity() {
    const dflt = () => [];

    const f = scope => {
      return scope.GetFormatSpecifierLocationsAndArity();
    };

    return this.threadSafeOp(dflt, f);
  }

  GetSemanticClassification(range) {
    const dflt = () => [];

    const f = scope => {
      return scope.GetSemanticClassification(range);
    };

    return this.threadSafeOp(dflt, f);
  }

  get PartialAssemblySignature() {
    const dflt = () => {
      throw new Error("not available");
    };

    const f = scope => {
      return scope.PartialAssemblySignatureForFile;
    };

    return this.threadSafeOp(dflt, f);
  }

  get ProjectContext() {
    const dflt = () => {
      throw new Error("not available");
    };

    const f = scope => {
      return new FSharpProjectContext(scope.ThisCcu, scope.GetReferencedAssemblies(), scope.AccessRights);
    };

    return this.threadSafeOp(dflt, f);
  }

  get DependencyFiles() {
    return this.dependencyFiles;
  }

  GetAllUsesOfAllSymbolsInFile() {
    var dflt;
    var f;
    return (arg00 => singleton.Return(arg00))((dflt = () => [], f = scope => Array.from(delay(() => collect_1(symbolUse => {
      if (!symbolUse.ItemOccurence.Equals(new ItemOccurence(6))) {
        const symbol = FSharpSymbol.Create_0(scope.TcGlobals, scope.ThisCcu, scope.CcuSigForFile, scope.TcImports, symbolUse.Item);
        return singleton_1(FSharpSymbolUse[".ctor"](scope.TcGlobals, symbolUse.DisplayEnv, symbol, symbolUse.ItemOccurence, symbolUse.Range));
      } else {
        return empty();
      }
    }, scope.ScopeSymbolUses.AllUsesOfSymbols))), this.threadSafeOp(dflt, f)));
  }

  GetUsesOfSymbolInFile(symbol) {
    var dflt;
    var f;
    return (arg00 => singleton.Return(arg00))((dflt = () => [], f = scope => Array.from(delay(() => collect_1(symbolUse => !symbolUse.ItemOccurence.Equals(new ItemOccurence(6)) ? singleton_1(FSharpSymbolUse[".ctor"](scope.TcGlobals, symbolUse.DisplayEnv, symbol, symbolUse.ItemOccurence, symbolUse.Range)) : empty(), distinctBy(symbolUse_1 => [symbolUse_1.ItemOccurence, symbolUse_1.Range], scope.ScopeSymbolUses.GetUsesOfSymbol(symbol.Item))))), this.threadSafeOp(dflt, f)));
  }

  GetVisibleNamespacesAndModulesAtPoint(pos) {
    var dflt;
    var f;
    return (arg00 => singleton.Return(arg00))((dflt = () => [], f = scope => Array.from(scope.GetVisibleNamespacesAndModulesAtPosition(pos)), this.threadSafeOp(dflt, f)));
  }

  IsRelativeNameResolvable(pos, plid, item, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";

    const f = (ctok, scope) => {
      RequireCompilationThread(ctok);
      return scope.IsRelativeNameResolvable(pos, plid, item);
    };

    return this.reactorOp(userOpName_1, "IsRelativeNameResolvable", true, f);
  }

  IsRelativeNameResolvableFromSymbol(pos, plid, symbol, userOpName) {
    const userOpName_1 = userOpName != null ? userOpName : "Unknown";

    const f = (ctok, scope) => {
      RequireCompilationThread(ctok);
      return scope.IsRelativeNameResolvableFromSymbol(pos, plid, symbol);
    };

    return this.reactorOp(userOpName_1, "IsRelativeNameResolvableFromSymbol", true, f);
  }

  get ImplementationFile() {
    if (!this.keepAssemblyContents) {
      throw new Error("The 'keepAssemblyContents' flag must be set to true on the FSharpChecker in order to access the checked contents of assemblies");
    }

    return defaultArg(defaultArg(this.scopeOptX, null, scope => {
      const cenv = SymbolEnv[".ctor"](scope.TcGlobals, scope.ThisCcu, scope.CcuSigForFile, scope.TcImports);
      return defaultArg(scope.ImplementationFile, null, implFile => FSharpImplementationFileContents[".ctor"](cenv, implFile));
    }), null);
  }

  get OpenDeclarations() {
    return defaultArg(defaultArg(this.scopeOptX, null, scope => {
      const cenv = SymbolEnv[".ctor"](scope.TcGlobals, scope.ThisCcu, scope.CcuSigForFile, scope.TcImports);
      return map_2(x => FSharpOpenDeclaration[".ctor"](x.LongId, x.Range, map(x_1 => FSharpEntity[".ctor"](cenv, x_1), x.Modules), x.AppliedScope, x.IsOwnNamespace), scope.OpenDeclarations, Array);
    }), []);
  }

  ToString() {
    return "FSharpCheckFileResults(" + this.filename + ")";
  }

  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      const matchValue = this.details;

      if (matchValue != null) {
        const reactor = getValue(matchValue)[2];
        this.details = null;
        reactor.EnqueueOp("GCFinalizer", "FSharpCheckFileResults.DecrementUsageCountOnIncrementalBuilder", this.filename, ctok => {
          RequireCompilationThread(ctok);
          this.decrementer.Dispose();
        });
      }
    }
  }

  reactorOp(userOpName, opName, dflt, f) {
    return (builder_ => builder_.Delay(() => {
      var builder;
      const matchValue = this.details;
      const $var73 = matchValue != null ? getValue(matchValue)[1] != null ? (builder = getValue(getValue(matchValue)[1]), !builder.IsAlive) ? [1, getValue(getValue(matchValue)[1])] : [2] : [2] : [0];

      switch ($var73[0]) {
        case 0:
          return builder_.Return(dflt);

        case 1:
          return builder_.Return(dflt);

        case 2:
          if (matchValue != null) {
            const scope = getValue(matchValue)[0];
            const reactor = getValue(matchValue)[2];
            const builderOpt = getValue(matchValue)[1];
            return builder_.Using(IncrementalBuilder.KeepBuilderAlive(builderOpt), _arg2 => builder_.Bind(reactor.EnqueueAndAwaitOpAsync(userOpName, opName, this.filename, ctok => (arg00 => cancellable.Return(arg00))(f(ctok, scope))), _arg3 => builder_.Return(_arg3)));
          } else {
            throw new Error("C:/projects/fcs/src/fsharp/service/service.fs", 1993, 14);
          }

      }
    }))(singleton);
  }

  threadSafeOp(dflt, f) {
    const matchValue = this.details;

    if (matchValue != null) {
      const scope = getValue(matchValue)[0];
      const _ops = getValue(matchValue)[2];
      const _builderOpt = getValue(matchValue)[1];
      return f(scope);
    } else {
      return dflt();
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpCheckFileResults", FSharpCheckFileResults);