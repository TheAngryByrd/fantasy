import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { unpickleCcuInfo, unpickleObjWithDanglingCcus } from "../fsharp/TastPickle";
import { u_CcuOptimizationInfo } from "../fsharp/Optimizer";
import { GetInitialTcState, ImportedAssembly, GetOptimizationDataResourceName, IsOptimizationDataResource, GetSignatureDataResourceName, IsSignatureDataResource, TcImports, TcConfig } from "../fsharp/CompileOps";
import { mkILExportedTypes, mkSimpleAssRef, ILScopeRef, EcmaMscorlibILGlobals } from "../absil/il";
import { append as append_1, fold, find, iterate, tryFind, exists, empty, singleton, collect, delay, toList } from "../fable-core/Seq";
import { OpenILModuleReaderFromBytes, ILReaderOptions, ReduceMemoryFlag, MetadataOnlyFlag } from "../absil/ilread";
import { CancellableModule, CompilationThreadToken, notlazy, MemoizationTable } from "../absil/illib";
import { comparePrimitives, equals, hash } from "../fable-core/Util";
import { defaultArg, getValue } from "../fable-core/Option";
import { append, filter, ofArray, map, choose } from "../fable-core/List";
import List from "../fable-core/List";
import { Erasure, typeEquivAux, IsSignatureDataVersionAttr, TryFindInternalsVisibleToAttr, TryFindAutoOpenAttr } from "../fsharp/TastOps";
import _Event from "../fable-core/Event";
import { ImportILAssemblyTypeForwarders, ImportILAssembly } from "../fsharp/import";
import { CcuThunk, CcuData, newStamp } from "../fsharp/tast";
import Lazy from "../fable-core/Lazy";
import { rangeStartup, rangeN, range } from "../fsharp/range";
import CurriedLambda from "../fable-core/CurriedLambda";
import { tryFind as tryFind_1, create } from "../fable-core/Map";
import Comparer from "../fable-core/Comparer";
import { join, printf, toConsole } from "../fable-core/String";
import { TcGlobals } from "../fsharp/TcGlobals";
import { NiceNameGenerator } from "../fsharp/ast";
import { stdinMockFilename } from "../fsharp/lexhelp";
import { CreateInitialTcEnv } from "../fsharp/TypeChecker";
import { singleton as singleton_1 } from "../fable-core/AsyncBuilder";
import { FSharpCheckProjectResults, FSharpCheckFileResults, Parser, FSharpParsingOptions } from "../service/service";
import { FSharpParseFileResults } from "../service/ServiceUntypedParse";
export class InteractiveChecker {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.InteractiveChecker",
      properties: {}
    };
  }

  constructor(tcConfig, tcGlobals, tcImports, tcState, ctok, reactorOps) {
    this.tcConfig = tcConfig;
    this.tcGlobals = tcGlobals;
    this.tcImports = tcImports;
    this.tcState = tcState;
    this.reactorOps = reactorOps;
  }

  static Create(references, readAllBytes) {
    const GetSignatureData = function (tupledArg) {
      return unpickleObjWithDanglingCcus(tupledArg[0], tupledArg[1], tupledArg[2], function (arg00_) {
        return unpickleCcuInfo(arg00_);
      }, tupledArg[3]);
    };

    const GetOptimizationData = function (tupledArg_1) {
      return unpickleObjWithDanglingCcus(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2], function (arg00__1) {
        return u_CcuOptimizationInfo(arg00__1);
      }, tupledArg_1[3]);
    };

    const tcConfig = new TcConfig(true);
    const tcImports = new TcImports();
    const ilGlobals = EcmaMscorlibILGlobals;

    const sigDataReaders = function (ilModule) {
      return toList(delay(function () {
        return collect(function (resource) {
          if (IsSignatureDataResource(resource)) {
            const ccuName = GetSignatureDataResourceName(resource);
            return singleton(resource.GetBytes());
          } else {
            return empty();
          }
        }, ilModule.Resources.AsList);
      }));
    };

    const optDataReaders = function (ilModule_1) {
      return toList(delay(function () {
        return collect(function (resource_1) {
          if (IsOptimizationDataResource(resource_1)) {
            const ccuName_1 = GetOptimizationDataResourceName(resource_1);
            return singleton(resource_1.GetBytes());
          } else {
            return empty();
          }
        }, ilModule_1.Resources.AsList);
      }));
    };

    const LoadMod = function (ccuName_2) {
      const fileName = ccuName_2 + ".dll";
      const bytes = readAllBytes(fileName);
      let opts;
      const metadataOnly = new MetadataOnlyFlag(0);
      const reduceMemoryUsage = new ReduceMemoryFlag(0);
      opts = new ILReaderOptions(null, ilGlobals, reduceMemoryUsage, metadataOnly, function (_arg1) {
        return null;
      });
      const reader = OpenILModuleReaderFromBytes(fileName, bytes, opts);
      return reader.ILModuleDef;
    };

    const memoize_mod = new MemoizationTable(LoadMod, {
      GetHashCode(x) {
        return function (obj) {
          return hash(obj);
        }(x) | 0;
      },

      Equals(x, y) {
        return function (e1, e2) {
          return equals(e1, e2);
        }(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    });

    const LoadSigData = function (ccuName_3) {
      const fileName_1 = ccuName_3 + ".dll";
      const ilScopeRef = new ILScopeRef(2, mkSimpleAssRef(ccuName_3));
      const ilModule_2 = memoize_mod.Apply(ccuName_3);
      const matchValue = sigDataReaders(ilModule_2);

      if (matchValue.tail != null) {
        return GetSignatureData([fileName_1, ilScopeRef, ilModule_2, matchValue.head]);
      } else {
        return null;
      }
    };

    const LoadOptData = function (ccuName_4) {
      const fileName_2 = ccuName_4 + ".dll";
      const ilScopeRef_1 = new ILScopeRef(2, mkSimpleAssRef(ccuName_4));
      const ilModule_3 = memoize_mod.Apply(ccuName_4);
      const matchValue_1 = optDataReaders(ilModule_3);

      if (matchValue_1.tail != null) {
        return GetOptimizationData([fileName_2, ilScopeRef_1, ilModule_3, matchValue_1.head]);
      } else {
        return null;
      }
    };

    const memoize_sig = new MemoizationTable(LoadSigData, {
      GetHashCode(x) {
        return function (obj_1) {
          return hash(obj_1);
        }(x) | 0;
      },

      Equals(x, y) {
        return function (e1_1, e2_1) {
          return equals(e1_1, e2_1);
        }(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    });
    const memoize_opt = new MemoizationTable(LoadOptData, {
      GetHashCode(x) {
        return function (obj_2) {
          return hash(obj_2);
        }(x) | 0;
      },

      Equals(x, y) {
        return function (e1_2, e2_2) {
          return equals(e1_2, e2_2);
        }(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    });

    const GetCustomAttributesOfIlModule = function (ilModule_4) {
      let copyOfStruct = ilModule_4.Manifest == null ? ilModule_4.CustomAttrs : getValue(ilModule_4.Manifest).CustomAttrs;
      return copyOfStruct.AsList;
    };

    const GetAutoOpenAttributes = function (ilg, ilModule_5) {
      return choose(function (arg10_) {
        return TryFindAutoOpenAttr(ilg, arg10_);
      }, GetCustomAttributesOfIlModule(ilModule_5));
    };

    const GetInternalsVisibleToAttributes = function (ilg_1, ilModule_6) {
      return choose(function (arg10__1) {
        return TryFindInternalsVisibleToAttr(ilg_1, arg10__1);
      }, GetCustomAttributesOfIlModule(ilModule_6));
    };

    const HasAnyFSharpSignatureDataAttribute = function (ilModule_7) {
      const attrs = GetCustomAttributesOfIlModule(ilModule_7);
      return exists(function (arg00__2) {
        return IsSignatureDataVersionAttr(arg00__2);
      }, attrs);
    };

    const mkCcuInfo = function (ilg_2, ilScopeRef_2, ilModule_8, ccu) {
      return new ImportedAssembly(ilScopeRef_2, ccu, GetAutoOpenAttributes(ilg_2, ilModule_8), GetInternalsVisibleToAttributes(ilg_2, ilModule_8), notlazy(null));
    };

    const GetCcuIL = function (m, ccuName_5) {
      const auxModuleLoader = function (_arg1_1) {
        if (_arg1_1.tag === 1) {
          return memoize_mod.Apply(_arg1_1.data.Name);
        } else if (_arg1_1.tag === 2) {
          return memoize_mod.Apply(_arg1_1.data.Name);
        } else {
          throw new Error("Unsupported reference");
        }
      };

      const ilModule_9 = memoize_mod.Apply(ccuName_5);
      const ilScopeRef_3 = new ILScopeRef(2, mkSimpleAssRef(ccuName_5));
      const invalidateCcu = new _Event();
      const ccu_1 = ImportILAssembly(function () {
        return tcImports.GetImportMap();
      }, m, auxModuleLoader, ilScopeRef_3, tcConfig.implicitIncludeDir, ilModule_9.Name, ilModule_9, invalidateCcu.Publish);
      const ccuInfo = mkCcuInfo(ilGlobals, ilScopeRef_3, ilModule_9, ccu_1);
      return [ccuInfo, null];
    };

    const GetCcuFS = function (m_1, ccuName_6) {
      const sigdata = memoize_sig.Apply(ccuName_6);
      const ilModule_10 = memoize_mod.Apply(ccuName_6);
      const ilScopeRef_4 = new ILScopeRef(2, mkSimpleAssRef(ccuName_6));

      const GetRawTypeForwarders = function (ilModule_11) {
        if (ilModule_11.Manifest == null) {
          return mkILExportedTypes(new List());
        } else {
          return getValue(ilModule_11.Manifest).ExportedTypes;
        }
      };

      const minfo = getValue(sigdata).RawData;
      let ccuData;
      const Stamp = newStamp();
      const FileName = ilModule_10.Name;
      const QualifiedName = ilScopeRef_4.QualifiedName;

      const MemberSignatureEquality = function (ty1, ty2) {
        return typeEquivAux(new Erasure(0), tcImports.GetTcGlobals(), ty1, ty2);
      };

      ccuData = new CcuData(FileName, ilScopeRef_4, Stamp, QualifiedName, minfo.compileTimeWorkingDir, true, minfo.usesQuotations, minfo.mspec, function () {
        return ilModule_10;
      }, MemberSignatureEquality, ImportILAssemblyTypeForwarders(function () {
        return tcImports.GetImportMap();
      }, m_1, GetRawTypeForwarders(ilModule_10)));
      const optdata = new Lazy(function () {
        const matchValue_2 = memoize_opt.Apply(ccuName_6);

        if (matchValue_2 != null) {
          const findCcuInfo = function (name) {
            return tcImports.FindCcu(m_1, name);
          };

          return getValue(matchValue_2).OptionalFixup(findCcuInfo);
        } else {
          return null;
        }
      });
      const ccu_2 = CcuThunk.Create(ccuName_6, ccuData);
      const ccuInfo_1 = mkCcuInfo(ilGlobals, ilScopeRef_4, ilModule_10, ccu_2);
      const ccuOptInfo = new ImportedAssembly(ccuInfo_1.ILScopeRef, ccuInfo_1.FSharpViewOfMetadata, ccuInfo_1.AssemblyAutoOpenAttributes, ccuInfo_1.AssemblyInternalsVisibleToAttributes, optdata);
      return [ccuOptInfo, sigdata];
    };

    const GetCcu = function (m_2, ccuName_7) {
      const ilModule_12 = memoize_mod.Apply(ccuName_7);

      if (HasAnyFSharpSignatureDataAttribute(ilModule_12)) {
        return GetCcuFS(m_2, ccuName_7);
      } else {
        return GetCcuIL(m_2, ccuName_7);
      }
    };

    const fixupCcuInfo = function (refCcusUnfixed) {
      const refCcus = map(function (tuple) {
        return tuple[0];
      }, refCcusUnfixed);

      const findCcuInfo_1 = function (name_1) {
        return defaultArg(tryFind(function (x_1) {
          return x_1.FSharpViewOfMetadata.AssemblyName === name_1;
        }, refCcus), null, function (x) {
          return x.FSharpViewOfMetadata;
        });
      };

      const fixup = function (data) {
        data.OptionalFixup(findCcuInfo_1);
      };

      iterate(fixup, choose(function (tuple_1) {
        return tuple_1[1];
      }, refCcusUnfixed));
      return refCcus;
    };

    const m_3 = range.Zero;
    const refCcusUnfixed_1 = map(CurriedLambda(GetCcu)(m_3), ofArray(references));
    const refCcus_1 = fixupCcuInfo(refCcusUnfixed_1);
    const sysCcus = filter(function (x_2) {
      return x_2.FSharpViewOfMetadata.AssemblyName !== "FSharp.Core";
    }, refCcus_1);
    const fslibCcu = find(function (x_3) {
      return x_3.FSharpViewOfMetadata.AssemblyName === "FSharp.Core";
    }, refCcus_1);
    const ccuInfos = append(ofArray([fslibCcu]), sysCcus);
    const ccuMap = create(map(function (ccuInfo_2) {
      return [ccuInfo_2.FSharpViewOfMetadata.AssemblyName, ccuInfo_2];
    }, ccuInfos), new Comparer(comparePrimitives));

    const ccuHasType = function (ccu_3, nsname, tname) {
      const matchValue_3 = fold(function (entityOpt, n) {
        return entityOpt != null ? tryFind_1(n, getValue(entityOpt).ModuleOrNamespaceType.AllEntitiesByCompiledAndLogicalMangledNames) : null;
      }, ccu_3.Contents, nsname);

      if (matchValue_3 == null) {
        return false;
      } else {
        const matchValue_4 = tryFind_1(tname, getValue(matchValue_3).ModuleOrNamespaceType.TypesByMangledName);

        if (matchValue_4 == null) {
          return false;
        } else {
          return true;
        }
      }
    };

    const tryFindSysTypeCcu = function (nsname_1, typeName) {
      const search = tryFind(function (ccuInfo_3) {
        return ccuHasType(ccuInfo_3.FSharpViewOfMetadata, nsname_1, typeName);
      }, sysCcus);

      if (search == null) {
        toConsole(printf("Cannot find type %s.%s"))(join(".", nsname_1), typeName);
        return null;
      } else {
        return getValue(search).FSharpViewOfMetadata;
      }
    };

    const tcGlobals = new TcGlobals(tcConfig.compilingFslib, ilGlobals, fslibCcu.FSharpViewOfMetadata, tcConfig.implicitIncludeDir, tcConfig.mlCompatibility, tcConfig.isInteractive, tryFindSysTypeCcu, tcConfig.emitDebugInfoInQuotations, tcConfig.noDebugData);
    tcImports.SetCcuMap(ccuMap);
    tcImports.SetTcGlobals(tcGlobals);
    const niceNameGen = new NiceNameGenerator();
    const amap = tcImports.GetImportMap();
    const rng = rangeN(stdinMockFilename, 0);
    const ccus = map(function (x_4) {
      return [x_4.FSharpViewOfMetadata, x_4.AssemblyAutoOpenAttributes, x_4.AssemblyInternalsVisibleToAttributes];
    }, ccuInfos);
    const tcEnv = CreateInitialTcEnv(tcGlobals, amap, rng, "Project", ccus);
    const tcState = GetInitialTcState(rangeStartup, "Project", tcConfig, tcGlobals, tcImports, niceNameGen, tcEnv);
    const ctok = new CompilationThreadToken();
    const reactorOps = {
      EnqueueAndAwaitOpAsync(userOpName, opName, opArg, op) {
        return singleton_1.Return(CancellableModule.runWithoutCancellation(op(ctok)));
      },

      EnqueueOp(userOpName, opName, opArg, op) {
        op(ctok);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.SourceCodeServices.IReactorOperations"]
        };
      }

    };
    return new InteractiveChecker(tcConfig, tcGlobals, tcImports, tcState, ctok, reactorOps);
  }

  ParseScript(mainInputFileName, source) {
    const parsingOptions = FSharpParsingOptions.FromTcConfig(this.tcConfig, [mainInputFileName], false);
    const patternInput = Parser.parseFile(source, mainInputFileName, parsingOptions, "Unknown");
    const dependencyFiles = [];
    const parseResults = FSharpParseFileResults[".ctor"](patternInput[0], patternInput[1], patternInput[2], dependencyFiles);
    return parseResults;
  }

  ParseAndCheckScript(mainInputFileName, source) {
    const parseResults = this.ParseScript(mainInputFileName, source);
    const loadClosure = null;
    const backgroundErrors = [];
    const tcResults = Parser.CheckOneFile(parseResults, source, mainInputFileName, "project", this.tcConfig, this.tcGlobals, this.tcImports, this.tcState, loadClosure, backgroundErrors, this.reactorOps, () => true, null, "");

    if (tcResults[1].tag === 1) {
      const scope = tcResults[1].data;
      const errors = Array.from(delay(() => append_1(parseResults.Errors, delay(() => tcResults[0]))));
      let tcImplFiles;
      const matchValue = scope.ImplementationFile;

      if (matchValue == null) {
        tcImplFiles = null;
      } else {
        tcImplFiles = ofArray([getValue(matchValue)]);
      }

      const typeCheckResults = FSharpCheckFileResults[".ctor"](mainInputFileName, errors, scope, parseResults.DependencyFiles, null, this.reactorOps, true);
      const projectResults = FSharpCheckProjectResults[".ctor"](mainInputFileName, this.tcConfig, true, errors, [this.tcGlobals, this.tcImports, scope.ThisCcu, scope.CcuSigForFile, ofArray([scope.ScopeSymbolUses]), null, null, mkSimpleAssRef("stdin"), this.tcState.TcEnvFromImpls.AccessRights, tcImplFiles, parseResults.DependencyFiles]);
      return [parseResults, typeCheckResults, projectResults];
    } else {
      throw new Error("unexpected aborted");
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.InteractiveChecker", InteractiveChecker);