import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { System } from "../fcs-fable/adapters";
import { ILScopeRef, mkILPreTypeDefComputed, splitILTypeName, rescopeILType, splitILTypeNameWithPossibleStaticArguments, ILTypeRef } from "../absil/il";
import { CcuThunk, CcuData, newStamp, NewCcuContents, CombineCcuContentFragments, CompilationPath, NewModuleOrNamespaceType, taccessPublic, NewModuleOrNamespace, MaybeLazy, NewILTycon, ModuleOrNamespaceKind, TyparConstraint, mkTyparTy, NewRigidTypar, mkNonLocalEntityRef, mkNonLocalTyconRef, EntityRef } from "./tast";
import { compare, Interface, makeGeneric } from "../fable-core/Util";
import { TcGlobals } from "./TcGlobals";
import { notlazy, LazyWithContext, AssumeCompilationThreadWithoutEvidence } from "../absil/illib";
import { findOriginalException, Error as _Error, InternalError, error } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import { join } from "../fable-core/String";
import { Erasure, typeEquivAux, mkNativePtrTy, mkByrefTy, mkArrayTy, tryRescopeEntity } from "./TastOps";
import { getValue } from "../fable-core/Option";
import { map, ofArray, append } from "../fable-core/List";
import List from "../fable-core/List";
import { empty, collect, iterate2, forAll, item, singleton, append as append_1, delay, toList } from "../fable-core/Seq";
import Lazy from "../fable-core/Lazy";
import { XmlDoc, mkSynId } from "./ast";
import { map as map_1 } from "../fable-core/Array";
import { create } from "../fable-core/Map";
import Comparer from "../fable-core/Comparer";
export class ImportMap {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Import.ImportMap",
      properties: {
        ILTypeRefToTyconRefCache: makeGeneric(System.Collections.Concurrent.ConcurrentDictionary, {
          TKey: ILTypeRef,
          TValue: EntityRef
        }),
        assemblyLoader: Interface("Microsoft.FSharp.Compiler.Import.AssemblyLoader"),
        g: TcGlobals
      }
    };
  }

  constructor(g, assemblyLoader) {
    this["g@59"] = g;
    this["assemblyLoader@59"] = assemblyLoader;
    this.typeRefToTyconRefCache = System.Collections.Concurrent.ConcurrentDictionary[".ctor_0"]();
  }

  static [".ctor"](g, assemblyLoader, _arg1) {
    return new ImportMap(g, assemblyLoader);
  }

  get g() {
    return this["g@59"];
  }

  get assemblyLoader() {
    return this["assemblyLoader@59"];
  }

  get ILTypeRefToTyconRefCache() {
    return this.typeRefToTyconRefCache;
  }

}
setType("Microsoft.FSharp.Compiler.Import.ImportMap", ImportMap);
export function CanImportILScopeRef(env, m, scoref) {
  if (scoref.tag === 1) {
    return true;
  } else if (scoref.tag === 2) {
    const ctok = AssumeCompilationThreadWithoutEvidence();
    const matchValue = env.assemblyLoader.FindCcuFromAssemblyRef(ctok, m, scoref.data);

    if (matchValue.tag === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
export function ImportTypeRefData(env, m, scoref, path, typeName) {
  const ctok = AssumeCompilationThreadWithoutEvidence();
  const ccu = scoref.tag === 1 ? error(new InternalError("ImportILTypeRef: reference found to a type in an auxiliary module", m)) : scoref.tag === 2 ? env.assemblyLoader.FindCcuFromAssemblyRef(ctok, m, scoref.data) : error(new InternalError("ImportILTypeRef: unexpected local scope", m));
  const ccu_1 = ccu.tag === 1 ? error(new _Error(SR.impTypeRequiredUnavailable(typeName, ccu.data), m)) : ccu.data;
  const fakeTyconRef = mkNonLocalTyconRef(mkNonLocalEntityRef(ccu_1, path), typeName);
  let tycon;

  try {
    tycon = fakeTyconRef.Deref;
  } catch (matchValue) {
    tycon = error(new _Error(SR.impReferencedTypeCouldNotBeFoundInAssembly(join(".", path.concat([typeName])), ccu_1.AssemblyName), m));
  }

  const matchValue_1 = tryRescopeEntity(ccu_1, tycon);

  if (matchValue_1 != null) {
    return getValue(matchValue_1);
  } else {
    return error(new _Error(SR.impImportedAssemblyUsesNotPublicType(join(".", append(toList(path), ofArray([typeName])))), m));
  }
}
export function ImportILTypeRefUncached(env, m, tref) {
  let patternInput_1;
  const matchValue = tref.Enclosing;

  if (matchValue.tail != null) {
    const patternInput = splitILTypeNameWithPossibleStaticArguments(matchValue.head);
    patternInput_1 = [Array.from(delay(function () {
      return append_1(patternInput[0], delay(function () {
        return append_1(singleton(patternInput[1]), delay(function () {
          return matchValue.tail;
        }));
      }));
    })), tref.Name];
  } else {
    patternInput_1 = splitILTypeNameWithPossibleStaticArguments(tref.Name);
  }

  return ImportTypeRefData(env, m, tref.Scope, patternInput_1[0], patternInput_1[1]);
}
export function ImportILTypeRef(env, m, tref) {
  if (env.ILTypeRefToTyconRefCache.has(tref)) {
    return env.ILTypeRefToTyconRefCache.get(tref);
  } else {
    const tcref = ImportILTypeRefUncached(env, m, tref);
    env.ILTypeRefToTyconRefCache.set(tref, tcref);
    return tcref;
  }
}
export function CanImportILTypeRef(env, m, tref) {
  if (env.ILTypeRefToTyconRefCache.has(tref)) {
    return true;
  } else {
    return CanImportILScopeRef(env, m, tref.Scope);
  }
}
export function ImportTyconRefApp(env, tcref, tyargs) {
  var objectArg;
  return (objectArg = env.g, function (arg00, arg10) {
    return objectArg.improveType(arg00, arg10);
  })(tcref, tyargs);
}
export function ImportILType(env, m, tinst, typ) {
  ImportILType: while (true) {
    const $var1 = typ.tag === 1 ? [1] : typ.tag === 3 ? [2, typ.data] : typ.tag === 2 ? [2, typ.data] : typ.tag === 5 ? [3] : typ.tag === 4 ? [4] : typ.tag === 6 ? [5] : typ.tag === 8 ? [6] : typ.tag === 7 ? [7] : [0];

    switch ($var1[0]) {
      case 0:
        return env.g.unit_ty;

      case 1:
        const n = typ.data[0].Rank | 0;
        const elementType = ImportILType(env, m, tinst, typ.data[1]);
        return mkArrayTy(env.g, n, elementType, m);

      case 2:
        const tcref = ImportILTypeRef(env, m, $var1[1].TypeRef);
        const inst = map(function (arg30_) {
          return ImportILType(env, m, tinst, arg30_);
        }, $var1[1].GenericArgs);
        return ImportTyconRefApp(env, tcref, inst);

      case 3:
        return mkByrefTy(env.g, ImportILType(env, m, tinst, typ.data));

      case 4:
        return mkNativePtrTy(env.g, ImportILType(env, m, tinst, typ.data));

      case 5:
        return env.g.nativeint_ty;

      case 6:
        env = env;
        m = m;
        tinst = tinst;
        typ = typ.data[2];
        continue ImportILType;

      case 7:
        try {
          return item(~~typ.data, tinst);
        } catch (matchValue) {
          return error(new _Error(SR.impNotEnoughTypeParamsInScopeWhileImporting(), m));
        }

    }
  }
}
export function CanImportILType(env, m, typ) {
  CanImportILType: while (true) {
    const $var2 = typ.tag === 1 ? [1] : typ.tag === 3 ? [2, typ.data] : typ.tag === 2 ? [2, typ.data] : typ.tag === 5 ? [3] : typ.tag === 4 ? [4] : typ.tag === 6 ? [5] : typ.tag === 8 ? [6] : typ.tag === 7 ? [7] : [0];

    switch ($var2[0]) {
      case 0:
        return true;

      case 1:
        env = env;
        m = m;
        typ = typ.data[1];
        continue CanImportILType;

      case 2:
        if (CanImportILTypeRef(env, m, $var2[1].TypeRef)) {
          return forAll(function (arg20_) {
            return CanImportILType(env, m, arg20_);
          }, $var2[1].GenericArgs);
        } else {
          return false;
        }

      case 3:
        env = env;
        m = m;
        typ = typ.data;
        continue CanImportILType;

      case 4:
        env = env;
        m = m;
        typ = typ.data;
        continue CanImportILType;

      case 5:
        return true;

      case 6:
        env = env;
        m = m;
        typ = typ.data[2];
        continue CanImportILType;

      case 7:
        return true;
    }
  }
}
export function ImportILGenericParameters(amap, m, scoref, tinst, gps) {
  if (gps.tail == null) {
    return new List();
  } else {
    const amap_1 = amap();
    const tps = map(function (gp) {
      return NewRigidTypar(gp.Name, m);
    }, gps);

    const tptys = function (list) {
      return map(function (tp) {
        return mkTyparTy(tp);
      }, list);
    }(tps);

    const importInst = append(tinst, tptys);
    iterate2(function (tp_1, gp_1) {
      const constraints = map(function (ilty) {
        return new TyparConstraint(0, [ImportILType(amap_1, m, importInst, rescopeILType(scoref, ilty)), m]);
      }, gp_1.Constraints);
      const constraints_1 = gp_1.HasReferenceTypeConstraint ? new List(new TyparConstraint(5, m), constraints) : constraints;
      const constraints_2 = gp_1.HasNotNullableValueTypeConstraint ? new List(new TyparConstraint(4, m), constraints_1) : constraints_1;
      const constraints_3 = gp_1.HasDefaultConstructorConstraint ? new List(new TyparConstraint(7, m), constraints_2) : constraints_2;
      tp_1.FixupConstraints(constraints_3);
    }, tps, gps);
    return tps;
  }
}
export function multisetDiscriminateAndMap(nodef, tipf, items) {
  const tips = toList(delay(function () {
    return collect(function (matchValue) {
      return matchValue[0].tail == null ? singleton(tipf(matchValue[1])) : empty();
    }, items);
  }));
  let nodes;
  const buckets = new Map();

  for (let forLoopVar of items) {
    if (forLoopVar[0].tail != null) {
      buckets.set(forLoopVar[0].head, new List([forLoopVar[0].tail, forLoopVar[1]], buckets.has(forLoopVar[0].head) ? buckets.get(forLoopVar[0].head) : new List()));
    }
  }

  nodes = toList(delay(function () {
    return collect(function (matchValue_1) {
      const activePatternResult31162 = matchValue_1;
      return singleton(nodef(activePatternResult31162[0], activePatternResult31162[1]));
    }, buckets);
  }));
  return append(tips, nodes);
}
export function ImportILTypeDef(amap, m, scoref, cpath, enc, nm, tdef) {
  const lazyModuleOrNamespaceTypeForNestedTypes = new Lazy(function () {
    const cpath_1 = function (arg00, arg10) {
      return cpath.NestedCompPath(arg00, arg10);
    }(nm, new ModuleOrNamespaceKind(1));

    return ImportILTypeDefs(amap, m, scoref, cpath_1, append(enc, ofArray([tdef])), tdef.NestedTypes);
  });
  return NewILTycon(cpath, nm, m, LazyWithContext.Create(function (m_1) {
    return ImportILGenericParameters(amap, m_1, scoref, new List(), tdef.GenericParams);
  }, function (err) {
    return findOriginalException(err);
  }), scoref, enc, tdef, new MaybeLazy(1, lazyModuleOrNamespaceTypeForNestedTypes));
}
export function ImportILTypeDefList(amap, m, cpath, enc, items) {
  const entities = multisetDiscriminateAndMap(function (n, tgs) {
    const modty = new Lazy(function () {
      return ImportILTypeDefList(amap, m, function (arg00, arg10) {
        return cpath.NestedCompPath(arg00, arg10);
      }(n, new ModuleOrNamespaceKind(2)), enc, tgs);
    });
    return NewModuleOrNamespace(cpath, taccessPublic, mkSynId(m, n), XmlDoc.Empty, new List(), new MaybeLazy(1, modty));
  }, function (tupledArg) {
    const patternInput = tupledArg[1].value;
    return ImportILTypeDef(amap, m, patternInput[0], cpath, enc, tupledArg[0], patternInput[2].GetTypeDef());
  }, items);
  const kind = enc.tail == null ? new ModuleOrNamespaceKind(2) : new ModuleOrNamespaceKind(1);
  return NewModuleOrNamespaceType(kind, entities, new List());
}
export function ImportILTypeDefs(amap, m, scoref, cpath, enc, tdefs) {
  return function (items) {
    return ImportILTypeDefList(amap, m, cpath, enc, items);
  }(toList(map_1(function (pre) {
    return [pre.Namespace, [pre.Name, notlazy([scoref, pre.MetadataIndex, pre])]];
  }, tdefs.AsArrayOfPreTypeDefs, Array)));
}
export function ImportILAssemblyMainTypeDefs(amap, m, scoref, modul) {
  var cpath;
  var enc;
  return (cpath = new CompilationPath(0, [scoref, new List()]), enc = new List(), function (tdefs) {
    return ImportILTypeDefs(amap, m, scoref, cpath, enc, tdefs);
  })(modul.TypeDefs);
}
export function ImportILAssemblyExportedType(amap, m, auxModLoader, scoref, exportedType) {
  if (exportedType.IsForwarder) {
    return new List();
  } else {
    const patternInput = splitILTypeName(exportedType.Name);
    const info = new Lazy(function () {
      let matchValue_1;

      try {
        const modul = auxModLoader(exportedType.ScopeRef);
        const ptd = mkILPreTypeDefComputed(patternInput[0], patternInput[1], function () {
          return modul.TypeDefs.FindByName(exportedType.Name);
        });
        matchValue_1 = ptd;
      } catch (matchValue) {
        if (matchValue instanceof Error) {
          matchValue_1 = null;
        } else {
          throw matchValue;
        }
      }

      if (matchValue_1 != null) {
        return [scoref, -1, getValue(matchValue_1)];
      } else {
        return error(new _Error(SR.impReferenceToDllRequiredByAssembly(exportedType.ScopeRef.QualifiedName, scoref.QualifiedName, exportedType.Name), m));
      }
    });
    return ofArray([ImportILTypeDefList(amap, m, new CompilationPath(0, [scoref, new List()]), new List(), ofArray([[patternInput[0], [patternInput[1], info]]]))]);
  }
}
export function ImportILAssemblyExportedTypes(amap, m, auxModLoader, scoref, exportedTypes) {
  return toList(delay(function () {
    return collect(function (exportedType) {
      return ImportILAssemblyExportedType(amap, m, auxModLoader, scoref, exportedType);
    }, exportedTypes.AsList);
  }));
}
export function ImportILAssemblyTypeDefs(amap, m, auxModLoader, aref, mainmod) {
  const scoref = new ILScopeRef(2, aref);
  const mtypsForExportedTypes = ImportILAssemblyExportedTypes(amap, m, auxModLoader, scoref, mainmod.ManifestOfAssembly.ExportedTypes);
  const mainmod_1 = ImportILAssemblyMainTypeDefs(amap, m, scoref, mainmod);
  return CombineCcuContentFragments(m, new List(mainmod_1, mtypsForExportedTypes));
}
export function ImportILAssemblyTypeForwarders(amap, m, exportedTypes) {
  return create(toList(delay(function () {
    return collect(function (exportedType) {
      const patternInput = splitILTypeName(exportedType.Name);
      const tcref = new Lazy(function () {
        return ImportILTypeRefUncached(amap(), m, ILTypeRef.Create(exportedType.ScopeRef, new List(), exportedType.Name));
      });
      return append_1(singleton([[Array.from(patternInput[0]), patternInput[1]], tcref]), delay(function () {
        const nested = function (nets, enc) {
          return toList(delay(function () {
            return collect(function (net) {
              const tcref_1 = new Lazy(function () {
                return ImportILTypeRefUncached(amap(), m, ILTypeRef.Create(exportedType.ScopeRef, enc, net.Name));
              });
              return append_1(singleton([[Array.from(enc), exportedType.Name], tcref_1]), delay(function () {
                return nested(net.Nested, append(enc, ofArray([net.Name])));
              }));
            }, nets.AsList);
          }));
        };

        return nested(exportedType.Nested, append(patternInput[0], ofArray([patternInput[1]])));
      }));
    }, exportedTypes.AsList);
  })), new Comparer(compare));
}
export function ImportILAssembly(amap, m, auxModuleLoader, ilScopeRef, sourceDir, filename, ilModule, invalidateCcu) {
  invalidateCcu;
  const aref = ilScopeRef.tag === 2 ? ilScopeRef.data : error(new InternalError("ImportILAssembly: cannot reference .NET netmodules directly, reference the containing assembly instead", m));
  const nm = aref.Name;
  const mty = ImportILAssemblyTypeDefs(amap, m, auxModuleLoader, aref, ilModule);
  let ccuData;
  const QualifiedName = ilScopeRef.QualifiedName;
  const Contents = NewCcuContents(ilScopeRef, m, nm, mty);
  const Stamp = newStamp();

  const MemberSignatureEquality = function (ty1, ty2) {
    return typeEquivAux(new Erasure(0), amap().g, ty1, ty2);
  };

  ccuData = new CcuData(filename, ilScopeRef, Stamp, QualifiedName, sourceDir, false, false, Contents, function () {
    return ilModule;
  }, MemberSignatureEquality, ilModule.Manifest != null ? ImportILAssemblyTypeForwarders(amap, m, getValue(ilModule.Manifest).ExportedTypes) : create(null, new Comparer(compare)));
  return CcuThunk.Create(nm, ccuData);
}