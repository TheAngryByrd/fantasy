import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compare, toString, hasInterface, equals, makeGeneric, Function as _Function, Option as Option_1, Array as _Array_1, comparePrimitives, compareRecords, equalsRecords } from "../fable-core/Util";
import { printf, toText, endsWith, split, join } from "../fable-core/String";
import { getValue, defaultArg } from "../fable-core/Option";
import { Array as _Array, Option } from "../absil/illib";
import { range as range_1, tryPick, sortWith, toList, map as map_2, iterate, tryLast, choose, empty, forAll, filter } from "../fable-core/Seq";
import { Microsoft, System } from "../fcs-fable/adapters";
import { FSharpSymbol } from "../symbols/Symbols";
import { EntityKind } from "./ServiceUntypedParse";
import { map } from "../fable-core/Array";
import { mapIndexed, filter as filter_1, append, concat, map as map_1, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { tryGetValue } from "../fable-core/Map";
import { Line, mkPos, range, pos as pos_1 } from "../fsharp/range";
import { ErrorScope } from "../symbols/SymbolHelpers";
import CurriedLambda from "../fable-core/CurriedLambda";
export class MaybeUnresolvedIdent {
  constructor(ident, resolved) {
    this.Ident = ident;
    this.Resolved = resolved;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.MaybeUnresolvedIdent",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        Ident: "string",
        Resolved: "boolean"
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
setType("Microsoft.FSharp.Compiler.SourceCodeServices.MaybeUnresolvedIdent", MaybeUnresolvedIdent);
export const Extensions = function (__exports) {
  const FSharpEntity_TryGetFullName = __exports["FSharpEntity.TryGetFullName"] = function () {
    try {
      return this.TryFullName;
    } catch (matchValue) {
      try {
        return join(".", this.AccessPath, this.DisplayName);
      } catch (matchValue_1) {
        return null;
      }
    }
  };

  const FSharpEntity_TryGetFullDisplayName = __exports["FSharpEntity.TryGetFullDisplayName"] = function () {
    const fullName_1 = defaultArg(FSharpEntity_TryGetFullName.bind(this)(), null, fullName => split(fullName, "."));
    const res = defaultArg(fullName_1 == null ? null : (() => {
      var index;
      const matchValue = Option.attempt(() => this.DisplayName);
      const $var1 = matchValue != null ? !(getValue(matchValue).indexOf(".") >= 0) ? [0, getValue(matchValue)] : [1] : [1];

      switch ($var1[0]) {
        case 0:
          return (index = getValue(fullName_1).length - 1 | 0, array => _Array.replace(index, $var1[1], array))(getValue(fullName_1));

        case 1:
          return getValue(fullName_1);
      }
    })(), null, fullDisplayName => join(".", ...fullDisplayName));
    return res;
  };

  const FSharpEntity_TryGetFullCompiledName = __exports["FSharpEntity.TryGetFullCompiledName"] = function () {
    const fullName_1 = defaultArg(FSharpEntity_TryGetFullName.bind(this)(), null, fullName => split(fullName, "."));
    const res = defaultArg(fullName_1 == null ? null : (() => {
      var index;
      const matchValue = Option.attempt(() => this.CompiledName);
      const $var2 = matchValue != null ? !(getValue(matchValue).indexOf(".") >= 0) ? [0, getValue(matchValue)] : [1] : [1];

      switch ($var2[0]) {
        case 0:
          return (index = getValue(fullName_1).length - 1 | 0, array => _Array.replace(index, $var2[1], array))(getValue(fullName_1));

        case 1:
          return getValue(fullName_1);
      }
    })(), null, fullDisplayName => join(".", ...fullDisplayName));
    return res;
  };

  const FSharpEntity_get_PublicNestedEntities = __exports["FSharpEntity.get_PublicNestedEntities"] = function () {
    return filter(entity => entity.Accessibility.IsPublic, this.NestedEntities);
  };

  const FSharpEntity_get_TryGetMembersFunctionsAndValues = __exports["FSharpEntity.get_TryGetMembersFunctionsAndValues"] = function () {
    try {
      return this.MembersFunctionsAndValues;
    } catch (matchValue) {
      return [];
    }
  };

  const isOperator = __exports.isOperator = function (name) {
    if ((name.indexOf("( ") === 0 ? endsWith(name, " )") : false) ? name.length > 4 : false) {
      return forAll(function (c) {
        return c !== " " ? !System.Char.IsLetter(c) : false;
      }, name.substr(2, name.length - 4));
    } else {
      return false;
    }
  };

  const FSharpMemberOrFunctionOrValue_get_FullTypeSafe = __exports["FSharpMemberOrFunctionOrValue.get_FullTypeSafe"] = function () {
    return Option.attempt(() => this.FullType);
  };

  const FSharpMemberOrFunctionOrValue_TryGetFullDisplayName = __exports["FSharpMemberOrFunctionOrValue.TryGetFullDisplayName"] = function () {
    const fullName = Option.attempt(() => split(this.FullName, "."));
    return defaultArg(fullName == null ? null : (() => {
      var index;
      const matchValue = Option.attempt(() => this.DisplayName);
      const $var3 = matchValue != null ? !(getValue(matchValue).indexOf(".") >= 0) ? [0, getValue(matchValue)] : [1] : [1];

      switch ($var3[0]) {
        case 0:
          return (index = getValue(fullName).length - 1 | 0, array => _Array.replace(index, $var3[1], array))(getValue(fullName));

        case 1:
          return getValue(fullName);
      }
    })(), null, fullDisplayName => join(".", ...fullDisplayName));
  };

  const FSharpMemberOrFunctionOrValue_TryGetFullCompiledOperatorNameIdents = __exports["FSharpMemberOrFunctionOrValue.TryGetFullCompiledOperatorNameIdents"] = function () {
    return (isOperator(this.DisplayName) ? this.DisplayName !== this.CompiledName : false) ? defaultArg(defaultArg(this.DeclaringEntity, null, e => FSharpEntity_TryGetFullName.bind(e)()), null, enclosingEntityFullName => split(enclosingEntityFullName, ".").concat([this.CompiledName])) : null;
  };

  const FSharpAssemblySignature_TryGetEntities = __exports["FSharpAssemblySignature.TryGetEntities"] = function () {
    try {
      return this.Entities;
    } catch (matchValue) {
      return empty();
    }
  };

  return __exports;
}({});
export class LookupType {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.LookupType",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Fuzzy"], ["Precise"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.LookupType", LookupType);
export class AssemblySymbol {
  constructor(fullName, cleanedIdents, namespace, nearestRequireQualifiedAccessParent, topRequireQualifiedAccessParent, autoOpenParent, symbol, kind) {
    this.FullName = fullName;
    this.CleanedIdents = cleanedIdents;
    this.Namespace = namespace;
    this.NearestRequireQualifiedAccessParent = nearestRequireQualifiedAccessParent;
    this.TopRequireQualifiedAccessParent = topRequireQualifiedAccessParent;
    this.AutoOpenParent = autoOpenParent;
    this.Symbol = symbol;
    this.Kind = kind;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.AssemblySymbol",
      interfaces: ["FSharpRecord"],
      properties: {
        FullName: "string",
        CleanedIdents: _Array_1("string"),
        Namespace: Option_1(_Array_1("string")),
        NearestRequireQualifiedAccessParent: Option_1(_Array_1("string")),
        TopRequireQualifiedAccessParent: Option_1(_Array_1("string")),
        AutoOpenParent: Option_1(_Array_1("string")),
        Symbol: FSharpSymbol,
        Kind: _Function([LookupType, EntityKind])
      }
    };
  }

  ToString() {
    return toText(printf("%A"))(this);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.AssemblySymbol", AssemblySymbol);
export class AssemblyContentType {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.AssemblyContentType",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Public"], ["Full"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.AssemblyContentType", AssemblyContentType);
export class Parent {
  constructor(namespace, thisRequiresQualifiedAccess, topRequiresQualifiedAccess, autoOpen, withModuleSuffix, isModule) {
    this.Namespace = namespace;
    this.ThisRequiresQualifiedAccess = thisRequiresQualifiedAccess;
    this.TopRequiresQualifiedAccess = topRequiresQualifiedAccess;
    this.AutoOpen = autoOpen;
    this.WithModuleSuffix = withModuleSuffix;
    this.IsModule = isModule;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.Parent",
      interfaces: ["FSharpRecord"],
      properties: {
        Namespace: Option_1(_Array_1("string")),
        ThisRequiresQualifiedAccess: _Function(["boolean", Option_1(_Array_1("string"))]),
        TopRequiresQualifiedAccess: _Function(["boolean", Option_1(_Array_1("string"))]),
        AutoOpen: Option_1(_Array_1("string")),
        WithModuleSuffix: Option_1(_Array_1("string")),
        IsModule: "boolean"
      }
    };
  }

  static get Empty() {
    return new Parent(null, function (_arg4) {
      return null;
    }, function (_arg5) {
      return null;
    }, null, null, true);
  }

  static RewriteParentIdents(parentIdents, idents) {
    const $var4 = parentIdents != null ? getValue(parentIdents).length <= idents.length ? [0, getValue(parentIdents)] : [1] : [1];

    switch ($var4[0]) {
      case 0:
        for (let i = 0; i <= $var4[1].length - 1; i++) {
          idents[i] = $var4[1][i];
        }

        break;

      case 1:
        break;
    }

    return idents;
  }

  FixParentModuleSuffix(idents) {
    return ((arg00, arg10) => Parent.RewriteParentIdents(arg00, arg10))(this.WithModuleSuffix, idents);
  }

  FormatEntityFullName(entity) {
    const removeGenericParamsCount = idents => {
      return map(ident => {
        if (ident.length > 0 ? System.Char.IsDigit(ident[ident.length - 1]) : false) {
          const lastBacktickIndex = ident.lastIndexOf("`") | 0;

          if (lastBacktickIndex !== -1) {
            return ident.substr(0, lastBacktickIndex);
          } else {
            return ident;
          }
        } else {
          return ident;
        }
      }, idents, Array);
    };

    const removeModuleSuffix = idents_1 => {
      if (entity.IsFSharpModule ? idents_1.length > 0 : false) {
        const lastIdent = idents_1[idents_1.length - 1];

        if (lastIdent !== entity.DisplayName) {
          return _Array.replace(idents_1.length - 1, entity.DisplayName, idents_1);
        } else {
          return idents_1;
        }
      } else {
        return idents_1;
      }
    };

    return defaultArg(Extensions["FSharpEntity.TryGetFullName"].bind(entity)(), null, fullName => defaultArg(Extensions["FSharpEntity.TryGetFullDisplayName"].bind(entity)(), null, fullDisplayName => [fullName, removeModuleSuffix(removeGenericParamsCount(split(fullDisplayName, ".")))]));
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.Parent", Parent);
export class AssemblyContentCacheEntry {
  constructor(fileWriteTime, contentType, symbols) {
    this.FileWriteTime = fileWriteTime;
    this.ContentType = contentType;
    this.Symbols = symbols;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.AssemblyContentCacheEntry",
      interfaces: ["FSharpRecord"],
      properties: {
        FileWriteTime: Date,
        ContentType: AssemblyContentType,
        Symbols: makeGeneric(List, {
          T: AssemblySymbol
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.AssemblyContentCacheEntry", AssemblyContentCacheEntry);
export class EntityCache {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.EntityCache",
      interfaces: ["Microsoft.FSharp.Compiler.SourceCodeServices.IAssemblyContentCache"],
      properties: {}
    };
  }

  constructor() {
    this.dic = new Map();
  }

  Clear() {
    this.dic.clear();
  }

  Locking(f) {
    return Microsoft.FSharp.Core.Operators.lock(this.dic, () => f(this));
  }

  TryGet(assembly) {
    const matchValue = tryGetValue(this.dic, assembly, null);

    if (matchValue[0]) {
      return matchValue[1];
    } else {
      return null;
    }
  }

  Set(assembly, entry) {
    this.dic.set(assembly, entry);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.EntityCache", EntityCache);
export class Entity {
  constructor(fullRelativeName, qualifier, namespace, name, lastIdent) {
    this.FullRelativeName = fullRelativeName;
    this.Qualifier = qualifier;
    this.Namespace = namespace;
    this.Name = name;
    this.LastIdent = lastIdent;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.Entity",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        FullRelativeName: "string",
        Qualifier: "string",
        Namespace: Option_1("string"),
        Name: "string",
        LastIdent: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  ToString() {
    return toText(printf("%A"))(this);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.Entity", Entity);
export const EntityModule = function (__exports) {
  const getRelativeNamespace = __exports.getRelativeNamespace = function (targetNs, sourceNs) {
    const loop = function (index) {
      loop: while (true) {
        if (index > targetNs.length - 1) {
          return sourceNs.slice(index, sourceNs.length);
        } else if (index > sourceNs.length - 1) {
          return sourceNs;
        } else if (targetNs[index] === sourceNs[index]) {
          index = index + 1;
          continue loop;
        } else {
          return sourceNs.slice(index, sourceNs.length);
        }
      }
    };

    if (sourceNs.length === 0 ? true : targetNs.length === 0) {
      return sourceNs;
    } else {
      return loop(0);
    }
  };

  const cutAutoOpenModules = __exports.cutAutoOpenModules = function (autoOpenParent, candidateNs) {
    let nsCount;
    const $var5 = autoOpenParent != null ? getValue(autoOpenParent).length > 0 ? [0, getValue(autoOpenParent)] : [1] : [1];

    switch ($var5[0]) {
      case 0:
        if ($var5[1].length - 1 < candidateNs.length) {
          nsCount = $var5[1].length - 1 | 0;
        } else {
          nsCount = candidateNs.length | 0;
        }

        break;

      case 1:
        nsCount = candidateNs.length | 0;
        break;
    }

    return candidateNs.slice(0, nsCount - 1 + 1);
  };

  const tryCreate = __exports.tryCreate = function (targetNamespace, targetScope, partiallyQualifiedName, requiresQualifiedAccessParent, autoOpenParent, candidateNamespace, candidate) {
    if (candidate.length === 0) {
      return [];
    } else {
      return Array.from(choose(function (parts) {
        const parts_1 = map(function (x) {
          return x.Ident;
        }, parts, Array);

        if (!function (whole) {
          return _Array.endsWith(parts_1, whole);
        }(candidate)) {
          return null;
        } else {
          const identCount = parts_1.length | 0;
          let patternInput;
          const openableNsCount = (requiresQualifiedAccessParent == null ? candidate.length : getValue(requiresQualifiedAccessParent).length < candidate.length ? getValue(requiresQualifiedAccessParent).length : candidate.length) | 0;
          patternInput = [candidate.slice(0, openableNsCount - 2 + 1), candidate.slice(openableNsCount - 1, candidate.length)];
          const openableNs = cutAutoOpenModules(autoOpenParent, patternInput[0]);

          const getRelativeNs = function (ns) {
            var targetNs;
            var candidateNs;
            const matchValue = [targetNamespace, candidateNamespace];
            const $var6 = matchValue[0] != null ? matchValue[1] != null ? (targetNs = getValue(matchValue[0]), candidateNs = getValue(matchValue[1]), equals(candidateNs, targetNs)) ? [0, getValue(matchValue[1]), getValue(matchValue[0])] : [1] : [1] : [1];

            switch ($var6[0]) {
              case 0:
                return getRelativeNamespace(targetScope, ns);

              case 1:
                if (matchValue[0] == null) {
                  return getRelativeNamespace(targetScope, ns);
                } else {
                  return ns;
                }

            }
          };

          const relativeNs = getRelativeNs(openableNs);
          const matchValue_1 = [relativeNs, patternInput[1]];
          const $var7 = matchValue_1[0].length === 0 ? matchValue_1[1].length === 0 ? [0] : matchValue_1[1].length === 1 ? [1] : [2] : [2];

          switch ($var7[0]) {
            case 0:
              return null;

            case 1:
              return null;

            case 2:
              const fullRelativeName = getRelativeNs(patternInput[0]).concat(patternInput[1]);
              const ns_1 = relativeNs.length === 0 ? null : (identCount > 1 ? relativeNs.length >= identCount : false) ? join(".", relativeNs.slice(0, relativeNs.length - identCount + 1)) : join(".", relativeNs);
              const qualifier = (fullRelativeName.length > 1 ? fullRelativeName.length >= identCount : false) ? fullRelativeName.slice(0, fullRelativeName.length - identCount + 1) : fullRelativeName;
              return new Entity(join(".", fullRelativeName), join(".", qualifier), ns_1, patternInput[1].length === 1 ? "" : join(".", patternInput[1]), defaultArg(tryLast(patternInput[1]), ""));
          }
        }
      }, _Array.heads(partiallyQualifiedName).filter(function (x_1) {
        return x_1.some(function (x_2) {
          return !x_2.Resolved;
        });
      })));
    }
  };

  return __exports;
}({});
export class ScopeKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.ScopeKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Namespace"], ["TopModule"], ["NestedModule"], ["OpenDeclaration"], ["HashDirective"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

  ToString() {
    return toText(printf("%A"))(this);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.ScopeKind", ScopeKind);
export class InsertContext {
  constructor(scopeKind, pos) {
    this.ScopeKind = scopeKind;
    this.Pos = pos;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.InsertContext",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        ScopeKind: ScopeKind,
        Pos: pos_1
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.InsertContext", InsertContext);
export class Module {
  constructor(idents, range) {
    this.Idents = idents;
    this.Range = range;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.Module",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        Idents: _Array_1("string"),
        Range: range
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.Module", Module);
export class OpenStatementInsertionPoint {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.OpenStatementInsertionPoint",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["TopLevel"], ["Nearest"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.OpenStatementInsertionPoint", OpenStatementInsertionPoint);
export const ParsedInput = function (__exports) {
  const _Sequentials___ = __exports["|Sequentials|_|"] = function (_arg1) {
    let $var8;

    if (_arg1.tag === 26) {
      const activePatternResult54581 = _Sequentials___(_arg1.data[3]);

      if (activePatternResult54581 != null) {
        $var8 = [0, _arg1.data[2], getValue(activePatternResult54581)];
      } else {
        $var8 = [1];
      }
    } else {
      $var8 = [1];
    }

    switch ($var8[0]) {
      case 0:
        return new List($var8[1], $var8[2]);

      case 1:
        if (_arg1.tag === 26) {
          return ofArray([_arg1.data[2], _arg1.data[3]]);
        } else {
          return null;
        }

    }
  };

  const _ConstructorPats_ = __exports["|ConstructorPats|"] = function (_arg1) {
    if (_arg1.tag === 1) {
      return map_1(function (tuple) {
        return tuple[1];
      }, _arg1.data[0]);
    } else {
      return _arg1.data;
    }
  };

  const getLongIdents = __exports.getLongIdents = function (input) {
    const identsByEndPos = new Map();

    const addLongIdent = function (longIdent) {
      var copyOfStruct;

      for (let ident of longIdent) {
        identsByEndPos.set((copyOfStruct = ident.idRange, copyOfStruct.End), longIdent);
      }
    };

    const addLongIdentWithDots = function (_arg1) {
      var copyOfStruct_1;
      var copyOfStruct_2;

      if (_arg1.data[0].tail != null) {
        if (_arg1.data[0].tail.tail == null) {
          identsByEndPos.set((copyOfStruct_1 = _arg1.Range, copyOfStruct_1.End), _arg1.data[0]);
        } else {
          for (let dotRange of _arg1.data[1]) {
            identsByEndPos.set(mkPos(dotRange.EndLine, dotRange.EndColumn - 1), _arg1.data[0]);
          }

          identsByEndPos.set((copyOfStruct_2 = _arg1.Range, copyOfStruct_2.End), _arg1.data[0]);
        }
      }
    };

    const addIdent = function (ident_1) {
      var copyOfStruct_3;
      identsByEndPos.set((copyOfStruct_3 = ident_1.idRange, copyOfStruct_3.End), ofArray([ident_1]));
    };

    const walkImplFileInput = function (_arg2) {
      iterate(walkSynModuleOrNamespace, _arg2.data[5]);
    };

    const walkSynModuleOrNamespace = function (_arg3) {
      iterate(walkAttribute, _arg3.data[5]);
      iterate(walkSynModuleDecl, _arg3.data[3]);
    };

    const walkAttribute = function (attr) {
      addLongIdentWithDots(attr.TypeName);
      walkExpr(attr.ArgExpr);
    };

    const walkTyparDecl = function (_arg4) {
      iterate(walkAttribute, _arg4.data[0]);
      walkTypar(_arg4.data[1]);
    };

    const walkTypeConstraint = function (_arg15) {
      const $var9 = _arg15.tag === 1 ? [0, _arg15.data[0]] : _arg15.tag === 2 ? [0, _arg15.data[0]] : _arg15.tag === 3 ? [0, _arg15.data[0]] : _arg15.tag === 4 ? [0, _arg15.data[0]] : _arg15.tag === 5 ? [0, _arg15.data[0]] : _arg15.tag === 6 ? [1, _arg15.data[0], _arg15.data[1]] : _arg15.tag === 7 ? [1, _arg15.data[0], _arg15.data[1]] : _arg15.tag === 9 ? [2, _arg15.data[0], _arg15.data[1]] : _arg15.tag === 10 ? [2, _arg15.data[0], _arg15.data[1]] : _arg15.tag === 8 ? [3] : [0, _arg15.data[0]];

      switch ($var9[0]) {
        case 0:
          walkTypar($var9[1]);
          break;

        case 1:
          walkTypar($var9[1]);
          walkType($var9[2]);
          break;

        case 2:
          walkTypar($var9[1]);
          iterate(walkType, $var9[2]);
          break;

        case 3:
          iterate(walkType, _arg15.data[0]);
          walkMemberSig(_arg15.data[1]);
          break;
      }
    };

    const walkPat = function (_arg16) {
      const $var10 = _arg16.tag === 8 ? [0, _arg16.data[0]] : _arg16.tag === 11 ? [0, _arg16.data[1]] : _arg16.tag === 6 ? [0, _arg16.data[0]] : _arg16.tag === 2 ? [1] : _arg16.tag === 3 ? [2] : _arg16.tag === 4 ? [3] : _arg16.tag === 5 ? [4] : _arg16.tag === 7 ? [5] : _arg16.tag === 10 ? [6] : _arg16.tag === 15 ? [7] : _arg16.tag === 16 ? [8] : [9];

      switch ($var10[0]) {
        case 0:
          iterate(walkPat, $var10[1]);
          break;

        case 1:
          walkPat(_arg16.data[0]);
          addIdent(_arg16.data[1]);
          break;

        case 2:
          walkPat(_arg16.data[0]);
          walkType(_arg16.data[1]);
          break;

        case 3:
          walkPat(_arg16.data[0]);
          iterate(walkAttribute, _arg16.data[1]);
          break;

        case 4:
          iterate(walkPat, ofArray([_arg16.data[0], _arg16.data[1]]));
          break;

        case 5:
          const activePatternResult54601 = _ConstructorPats_(_arg16.data[3]);

          addLongIdentWithDots(_arg16.data[0]);
          iterate(function (_arg1_1) {
            iterate(walkTyparDecl, _arg1_1.data[0]);
            iterate(walkTypeConstraint, _arg1_1.data[2]);
          }, defaultArg(_arg16.data[2], [], $var11 => [$var11]));
          iterate(walkPat, activePatternResult54601);
          break;

        case 6:
          walkPat(_arg16.data[0]);
          break;

        case 7:
          walkType(_arg16.data[0]);
          break;

        case 8:
          walkExpr(_arg16.data[0]);
          break;

        case 9:
          break;
      }
    };

    const walkTypar = function (_arg5) {};

    const walkBinding = function (_arg6) {
      iterate(walkAttribute, _arg6.data[4]);
      walkPat(_arg6.data[7]);
      walkExpr(_arg6.data[9]);
      iterate(function (_arg2_1) {
        walkType(_arg2_1.data[0]);
      }, defaultArg(_arg6.data[8], [], $var12 => [$var12]));
    };

    const walkInterfaceImpl = function (_arg7) {
      iterate(walkBinding, _arg7.data[1]);
    };

    const walkIndexerArg = function (_arg17) {
      if (_arg17.tag === 0) {
        iterate(walkExpr, ofArray([_arg17.data[0], _arg17.data[1]]));
      } else {
        walkExpr(_arg17.data);
      }
    };

    const walkType = function (_arg18) {
      const $var13 = _arg18.tag === 5 ? [0, _arg18.data[1]] : _arg18.tag === 10 ? [0, _arg18.data[0]] : _arg18.tag === 12 ? [0, _arg18.data[0]] : _arg18.tag === 6 ? [1, _arg18.data[0], _arg18.data[1]] : _arg18.tag === 11 ? [1, _arg18.data[0], _arg18.data[1]] : _arg18.tag === 0 ? [2] : _arg18.tag === 1 ? [3] : _arg18.tag === 2 ? [4] : _arg18.tag === 3 ? [5] : _arg18.tag === 9 ? [6] : [7];

      switch ($var13[0]) {
        case 0:
          walkType($var13[1]);
          break;

        case 1:
          walkType($var13[1]);
          walkType($var13[2]);
          break;

        case 2:
          addLongIdentWithDots(_arg18.data);
          break;

        case 3:
          walkType(_arg18.data[0]);
          iterate(walkType, _arg18.data[2]);
          break;

        case 4:
          iterate(walkType, _arg18.data[3]);
          break;

        case 5:
          iterate(function (tupledArg) {
            walkType(tupledArg[1]);
          }, _arg18.data[0]);
          break;

        case 6:
          walkType(_arg18.data[0]);
          iterate(walkTypeConstraint, _arg18.data[1]);
          break;

        case 7:
          break;
      }
    };

    const walkClause = function (_arg8) {
      walkPat(_arg8.data[0]);
      walkExpr(_arg8.data[2]);
      iterate(walkExpr, defaultArg(_arg8.data[1], [], $var14 => [$var14]));
    };

    const walkSimplePats = function (_arg19) {
      if (_arg19.tag === 1) {
        walkSimplePats(_arg19.data[0]);
        walkType(_arg19.data[1]);
      } else {
        iterate(walkSimplePat, _arg19.data[0]);
      }
    };

    const walkExpr = function (_arg20) {
      let $var15;

      if (_arg20.tag === 0) {
        $var15 = [0, _arg20.data[0]];
      } else if (_arg20.tag === 1) {
        $var15 = [0, _arg20.data[2]];
      } else if (_arg20.tag === 3) {
        $var15 = [0, _arg20.data[0]];
      } else if (_arg20.tag === 40) {
        $var15 = [0, _arg20.data[0]];
      } else if (_arg20.tag === 41) {
        $var15 = [0, _arg20.data[0]];
      } else if (_arg20.tag === 43) {
        $var15 = [0, _arg20.data[1]];
      } else if (_arg20.tag === 50) {
        $var15 = [0, _arg20.data[0]];
      } else if (_arg20.tag === 47) {
        $var15 = [0, _arg20.data[1]];
      } else if (_arg20.tag === 13) {
        $var15 = [0, _arg20.data[1]];
      } else if (_arg20.tag === 14) {
        $var15 = [0, _arg20.data[2]];
      } else if (_arg20.tag === 18) {
        $var15 = [0, _arg20.data[0]];
      } else if (_arg20.tag === 19) {
        $var15 = [0, _arg20.data[0]];
      } else if (_arg20.tag === 25) {
        $var15 = [0, _arg20.data[0]];
      } else if (_arg20.tag === 48) {
        $var15 = [0, _arg20.data[1]];
      } else if (_arg20.tag === 15) {
        $var15 = [1, _arg20.data[3], _arg20.data[2]];
      } else if (_arg20.tag === 8) {
        $var15 = [2, _arg20.data[2], _arg20.data[1]];
      } else if (_arg20.tag === 37) {
        $var15 = [2, _arg20.data[0], _arg20.data[1]];
      } else if (_arg20.tag === 38) {
        $var15 = [2, _arg20.data[0], _arg20.data[1]];
      } else if (_arg20.tag === 39) {
        $var15 = [2, _arg20.data[0], _arg20.data[1]];
      } else if (_arg20.tag === 4) {
        $var15 = [3, _arg20.data[0]];
      } else if (_arg20.tag === 6) {
        const activePatternResult54614 = _Sequentials___(_arg20);

        if (activePatternResult54614 != null) {
          $var15 = [3, getValue(activePatternResult54614)];
        } else {
          $var15 = [3, _arg20.data[1]];
        }
      } else {
        const activePatternResult54615 = _Sequentials___(_arg20);

        if (activePatternResult54615 != null) {
          $var15 = [3, getValue(activePatternResult54615)];
        } else {
          $var15 = [4];
        }
      }

      switch ($var15[0]) {
        case 0:
          walkExpr($var15[1]);
          break;

        case 1:
          walkSimplePats($var15[2]);
          walkExpr($var15[1]);
          break;

        case 2:
          walkExpr($var15[1]);
          walkType($var15[2]);
          break;

        case 3:
          iterate(walkExpr, $var15[1]);
          break;

        case 4:
          const $var16 = _arg20.tag === 20 ? [0, _arg20.data[2], _arg20.data[3]] : _arg20.tag === 24 ? [0, _arg20.data[0], _arg20.data[1]] : _arg20.tag === 10 ? [0, _arg20.data[1], _arg20.data[2]] : _arg20.tag === 7 ? [1, _arg20.data[2]] : _arg20.tag === 28 ? [2, _arg20.data] : _arg20.tag === 9 ? [3, _arg20.data[1], _arg20.data[2], _arg20.data[3], _arg20.data[0]] : _arg20.tag === 29 ? [4, _arg20.data[1]] : _arg20.tag === 11 ? [5, _arg20.data[2], _arg20.data[4], _arg20.data[5], _arg20.data[1]] : _arg20.tag === 12 ? [6, _arg20.data[4], _arg20.data[5], _arg20.data[3]] : _arg20.tag === 16 ? [7, _arg20.data[2]] : _arg20.tag === 17 ? [8, _arg20.data[1], _arg20.data[2]] : _arg20.tag === 21 ? [9, _arg20.data[0], _arg20.data[2]] : _arg20.tag === 22 ? [10, _arg20.data[2], _arg20.data[3]] : _arg20.tag === 23 ? [11, _arg20.data[2], _arg20.data[0]] : _arg20.tag === 27 ? [12, _arg20.data[0], _arg20.data[1], _arg20.data[2]] : _arg20.tag === 30 ? [13, _arg20.data[1], _arg20.data[0]] : _arg20.tag === 31 ? [13, _arg20.data[0], _arg20.data[2]] : _arg20.tag === 32 ? [14, _arg20.data[0], _arg20.data[2], _arg20.data[1]] : _arg20.tag === 33 ? [15, _arg20.data[1], _arg20.data[0]] : _arg20.tag === 34 ? [16, _arg20.data[1], _arg20.data[0], _arg20.data[2]] : _arg20.tag === 35 ? [17, _arg20.data[1], _arg20.data[2], _arg20.data[0]] : _arg20.tag === 36 ? [18, _arg20.data[0], _arg20.data[2], _arg20.data[3], _arg20.data[1]] : _arg20.tag === 45 ? [19, _arg20.data[0], _arg20.data[2]] : _arg20.tag === 49 ? [20, _arg20.data[4], _arg20.data[5], _arg20.data[3]] : _arg20.tag === 44 ? [21, _arg20.data[2], _arg20.data[1], _arg20.data[0]] : _arg20.tag === 2 ? _arg20.data[0].tag === 20 ? [22, _arg20.data[0].data[1]] : [23] : [23];

          switch ($var16[0]) {
            case 0:
              iterate(walkExpr, ofArray([$var16[1], $var16[2]]));
              break;

            case 1:
              iterate(function (tupledArg_1) {
                addLongIdentWithDots(tupledArg_1[0][0]);
                iterate(walkExpr, defaultArg(tupledArg_1[1], [], $var17 => [$var17]));
              }, $var16[1]);
              break;

            case 2:
              addIdent($var16[1]);
              break;

            case 3:
              iterate(function (tupledArg_2) {
                walkExpr(tupledArg_2[0]);

                (function (option) {
                  iterate(addIdent, defaultArg(option, [], $var18 => [$var18]));
                })(tupledArg_2[1]);
              }, defaultArg($var16[1], [], $var19 => [$var19]));
              walkType($var16[4]);
              iterate(walkBinding, $var16[2]);
              iterate(walkInterfaceImpl, $var16[3]);
              break;

            case 4:
              addLongIdentWithDots($var16[1]);
              break;

            case 5:
              addIdent($var16[4]);
              iterate(walkExpr, ofArray([$var16[1], $var16[2], $var16[3]]));
              break;

            case 6:
              walkPat($var16[3]);
              iterate(walkExpr, ofArray([$var16[1], $var16[2]]));
              break;

            case 7:
              iterate(walkClause, $var16[1]);
              break;

            case 8:
              walkExpr($var16[1]);
              iterate(walkClause, $var16[2]);
              break;

            case 9:
              iterate(walkType, $var16[2]);
              walkExpr($var16[1]);
              break;

            case 10:
              iterate(walkBinding, $var16[1]);
              walkExpr($var16[2]);
              break;

            case 11:
              iterate(walkClause, $var16[1]);
              walkExpr($var16[2]);
              break;

            case 12:
              iterate(walkExpr, ofArray([$var16[1], $var16[2]]));
              iterate(walkExpr, defaultArg($var16[3], [], $var20 => [$var20]));
              break;

            case 13:
              addLongIdentWithDots($var16[2]);
              walkExpr($var16[1]);
              break;

            case 14:
              walkExpr($var16[1]);
              addLongIdentWithDots($var16[3]);
              walkExpr($var16[2]);
              break;

            case 15:
              walkExpr($var16[2]);
              iterate(walkIndexerArg, $var16[1]);
              break;

            case 16:
              walkExpr($var16[2]);
              iterate(walkIndexerArg, $var16[1]);
              walkExpr($var16[3]);
              break;

            case 17:
              addLongIdentWithDots($var16[3]);
              iterate(walkExpr, ofArray([$var16[1], $var16[2]]));
              break;

            case 18:
              addLongIdentWithDots($var16[4]);
              iterate(walkExpr, ofArray([$var16[1], $var16[2], $var16[3]]));
              break;

            case 19:
              iterate(walkExpr, ofArray([$var16[1], $var16[2]]));
              break;

            case 20:
              walkPat($var16[3]);
              iterate(walkExpr, ofArray([$var16[1], $var16[2]]));
              break;

            case 21:
              iterate(walkTypar, $var16[3]);
              walkMemberSig($var16[2]);
              walkExpr($var16[1]);
              break;

            case 22:
              walkMeasure($var16[1]);
              break;

            case 23:
              break;
          }

          break;
      }
    };

    const walkMeasure = function (_arg21) {
      switch (_arg21.tag) {
        case 3:
          walkMeasure(_arg21.data[0]);
          walkMeasure(_arg21.data[1]);
          break;

        case 0:
          addLongIdent(_arg21.data[0]);
          break;

        case 2:
          iterate(walkMeasure, _arg21.data[0]);
          break;

        case 4:
          walkMeasure(_arg21.data[0]);
          break;

        case 7:
          walkTypar(_arg21.data[0]);
          break;

        case 5:
        case 6:
          break;

        default:
          walkMeasure(_arg21.data[0]);
          walkMeasure(_arg21.data[1]);
      }
    };

    const walkSimplePat = function (_arg22) {
      if (_arg22.tag === 2) {
        walkSimplePat(_arg22.data[0]);
        iterate(walkAttribute, _arg22.data[1]);
      } else if (_arg22.tag === 1) {
        walkSimplePat(_arg22.data[0]);
        walkType(_arg22.data[1]);
      }
    };

    const walkField = function (_arg9) {
      iterate(walkAttribute, _arg9.data[0]);
      walkType(_arg9.data[3]);
    };

    const walkValSig = function (_arg10) {
      const argInfos = _arg10.data[4].data[0];
      const argInfo = _arg10.data[4].data[1];
      iterate(walkAttribute, _arg10.data[0]);
      walkType(_arg10.data[3]);
      iterate(walkAttribute, concat(map_1(function (_arg6_1) {
        return _arg6_1.data[0];
      }, new List(argInfo, concat(argInfos)))));
    };

    const walkMemberSig = function (_arg23) {
      switch (_arg23.tag) {
        case 1:
          walkType(_arg23.data[0]);
          break;

        case 0:
          walkValSig(_arg23.data[0]);
          break;

        case 3:
          walkField(_arg23.data[0]);
          break;

        case 4:
          const repr = _arg23.data[0].data[1];
          const memberSigs = _arg23.data[0].data[2];
          const info = _arg23.data[0].data[0];
          let isTypeExtensionOrAlias;
          const $var21 = repr.tag === 1 ? repr.data[0].tag === 5 ? [0] : [1] : repr.tag === 0 ? repr.data[0].tag === 6 ? [0] : repr.data[0].tag === 8 ? [0] : [1] : [1];

          switch ($var21[0]) {
            case 0:
              isTypeExtensionOrAlias = true;
              break;

            case 1:
              isTypeExtensionOrAlias = false;
              break;
          }

          walkComponentInfo(isTypeExtensionOrAlias, info);
          walkTypeDefnSigRepr(repr);
          iterate(walkMemberSig, memberSigs);
          break;

        default:
          walkType(_arg23.data[0]);
      }
    };

    const walkMember = function (_arg24) {
      switch (_arg24.tag) {
        case 5:
          walkValSig(_arg24.data[0]);
          break;

        case 1:
          walkBinding(_arg24.data[0]);
          break;

        case 2:
          iterate(walkAttribute, _arg24.data[1]);
          iterate(walkSimplePat, _arg24.data[2]);
          break;

        case 3:
          walkType(_arg24.data[0]);
          walkExpr(_arg24.data[1]);
          break;

        case 4:
          iterate(walkBinding, _arg24.data[0]);
          break;

        case 6:
          walkType(_arg24.data[0]);
          iterate(function (list) {
            iterate(walkMember, list);
          }, defaultArg(_arg24.data[1], [], $var22 => [$var22]));
          break;

        case 7:
          walkType(_arg24.data[0]);
          break;

        case 8:
          walkField(_arg24.data[0]);
          break;

        case 9:
          walkTypeDefn(_arg24.data[0]);
          break;

        case 10:
          iterate(walkAttribute, _arg24.data[0]);
          iterate(walkType, defaultArg(_arg24.data[3], [], $var23 => [$var23]));
          walkExpr(_arg24.data[8]);
          break;

        default:}
    };

    const walkEnumCase = function (_arg11) {
      iterate(walkAttribute, _arg11.data[0]);
    };

    const walkUnionCaseType = function (_arg25) {
      if (_arg25.tag === 1) {
        const t = _arg25.data[0];
        walkType(t);
      } else {
        iterate(walkField, _arg25.data);
      }
    };

    const walkUnionCase = function (_arg12) {
      iterate(walkAttribute, _arg12.data[0]);
      walkUnionCaseType(_arg12.data[2]);
    };

    const walkTypeDefnSimple = function (_arg26) {
      switch (_arg26.tag) {
        case 1:
          iterate(walkEnumCase, _arg26.data[0]);
          break;

        case 0:
          iterate(walkUnionCase, _arg26.data[1]);
          break;

        case 2:
          iterate(walkField, _arg26.data[1]);
          break;

        case 5:
          walkType(_arg26.data[1]);
          break;

        default:}
    };

    const walkComponentInfo = function (isTypeExtensionOrAlias_1, _arg13) {
      iterate(walkAttribute, _arg13.data[0]);
      iterate(walkTyparDecl, _arg13.data[1]);
      iterate(walkTypeConstraint, _arg13.data[2]);

      if (isTypeExtensionOrAlias_1) {
        addLongIdent(_arg13.data[3]);
      }
    };

    const walkTypeDefnRepr = function (_arg27) {
      if (_arg27.tag === 1) {
        walkTypeDefnSimple(_arg27.data[0]);
      } else if (_arg27.tag === 2) {} else {
        iterate(walkMember, _arg27.data[1]);
      }
    };

    const walkTypeDefnSigRepr = function (_arg28) {
      if (_arg28.tag === 1) {
        walkTypeDefnSimple(_arg28.data[0]);
      } else if (_arg28.tag === 2) {} else {
        iterate(walkMemberSig, _arg28.data[1]);
      }
    };

    const walkTypeDefn = function (_arg14) {
      let isTypeExtensionOrAlias_2;
      const $var24 = _arg14.data[1].tag === 0 ? _arg14.data[1].data[0].tag === 8 ? [0] : _arg14.data[1].data[0].tag === 6 ? [0] : [1] : _arg14.data[1].tag === 1 ? _arg14.data[1].data[0].tag === 5 ? [0] : [1] : [1];

      switch ($var24[0]) {
        case 0:
          isTypeExtensionOrAlias_2 = true;
          break;

        case 1:
          isTypeExtensionOrAlias_2 = false;
          break;
      }

      walkComponentInfo(isTypeExtensionOrAlias_2, _arg14.data[0]);
      walkTypeDefnRepr(_arg14.data[1]);
      iterate(walkMember, _arg14.data[2]);
    };

    const walkSynModuleDecl = function (decl) {
      switch (decl.tag) {
        case 9:
          walkSynModuleOrNamespace(decl.data);
          break;

        case 1:
          walkComponentInfo(false, decl.data[0]);
          iterate(walkSynModuleDecl, decl.data[2]);
          break;

        case 2:
          iterate(walkBinding, decl.data[1]);
          break;

        case 3:
          walkExpr(decl.data[1]);
          break;

        case 4:
          iterate(walkTypeDefn, decl.data[0]);
          break;

        case 7:
          iterate(walkAttribute, decl.data[0]);
          break;

        default:}
    };

    const $var25 = input != null ? getValue(input).tag === 0 ? [0, getValue(input).data] : [1] : [1];

    switch ($var25[0]) {
      case 0:
        walkImplFileInput($var25[1]);
        break;

      case 1:
        break;
    }

    return identsByEndPos;
  };

  const getLongIdentAt = __exports.getLongIdentAt = function (ast, pos) {
    const idents = getLongIdents(ast);
    const matchValue = tryGetValue(idents, pos, null);

    if (matchValue[0]) {
      return matchValue[1];
    } else {
      return null;
    }
  };

  const Scope = __exports.Scope = class Scope {
    constructor(idents, kind) {
      this.Idents = idents;
      this.Kind = kind;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.ParsedInput.Scope",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Idents: _Array_1("string"),
          Kind: ScopeKind
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

    CompareTo(other) {
      return compareRecords(this, other) | 0;
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.ParsedInput.Scope", Scope);

  const tryFindNearestPointAndModules = __exports.tryFindNearestPointAndModules = function (currentLine, ast, insertionPoint) {
    const _ignoreAllDiagnostics = ErrorScope[".ctor"]();

    try {
      const result = {
        contents: null
      };
      const ns = {
        contents: null
      };
      const modules = [];

      const addModule = function (tupledArg) {
        modules.push(new Module(Array.from(map_1(function (value) {
          return toString(value);
        }, tupledArg[0])), tupledArg[1]));
      };

      const doRange = function (kind, scope, line, col) {
        var oldScope_1;
        var oldPos_1;

        if (line <= currentLine) {
          const matchValue = [result.contents, insertionPoint];
          const $var26 = matchValue[0] != null ? getValue(matchValue[0])[2] ? [1] : matchValue[1].tag === 0 ? (oldScope_1 = getValue(matchValue[0])[0], oldPos_1 = getValue(matchValue[0])[1], !kind.Equals(new ScopeKind(3))) ? [2, getValue(matchValue[0])[1], getValue(matchValue[0])[0]] : [3] : [3] : [0];

          switch ($var26[0]) {
            case 0:
              result.contents = [new Scope(function (ident) {
                return Array.from(map_2(function (x) {
                  return toString(x);
                }, ident));
              }(scope), kind), mkPos(line, col), false];
              break;

            case 1:
              break;

            case 2:
              result.contents = [$var26[2], $var26[1], true];
              break;

            case 3:
              if (matchValue[0] != null) {
                const oldScope = getValue(matchValue[0])[0];
                const oldPos = getValue(matchValue[0])[1];
                const matchValue_1 = [kind, oldScope.Kind];
                const $var27 = matchValue_1[0].tag === 0 ? matchValue_1[1].tag === 3 ? oldPos.Line <= line ? [0] : oldPos.Line <= line ? [0] : [1] : oldPos.Line <= line ? [0] : [1] : matchValue_1[0].tag === 2 ? matchValue_1[1].tag === 3 ? oldPos.Line <= line ? [0] : oldPos.Line <= line ? [0] : [1] : oldPos.Line <= line ? [0] : [1] : matchValue_1[0].tag === 1 ? matchValue_1[1].tag === 3 ? oldPos.Line <= line ? [0] : oldPos.Line <= line ? [0] : [1] : oldPos.Line <= line ? [0] : [1] : oldPos.Line <= line ? [0] : [1];

                switch ($var27[0]) {
                  case 0:
                    result.contents = [new Scope(scope.tail == null ? oldScope.Idents : function (ident_1) {
                      return Array.from(map_2(function (x_1) {
                        return toString(x_1);
                      }, ident_1));
                    }(scope), kind), mkPos(line, col), false];
                    break;

                  case 1:
                    break;
                }
              } else {
                throw new Error("C:/projects/fcs/src/fsharp/service/ServiceAssemblyContent.fs", 856, 22);
              }

              break;
          }
        }
      };

      const getMinColumn = function (decls) {
        if (decls.tail != null) {
          return defaultArg((() => {
            const $var28 = decls.head.tag === 1 ? [0, decls.head.data[4]] : decls.head.tag === 2 ? [0, decls.head.data[2]] : decls.head.tag === 3 ? [0, decls.head.data[2]] : decls.head.tag === 4 ? [0, decls.head.data[1]] : decls.head.tag === 5 ? [0, decls.head.data[1]] : decls.head.tag === 6 ? [0, decls.head.data[1]] : decls.head.tag === 8 ? [0, decls.head.data[1]] : [1];

            switch ($var28[0]) {
              case 0:
                return $var28[1];

              case 1:
                return null;
            }
          })(), null, function (r) {
            return r.StartColumn;
          });
        } else {
          return null;
        }
      };

      const walkImplFileInput = function (_arg1) {
        iterate(CurriedLambda(walkSynModuleOrNamespace)(new List()), _arg1.data[5]);
      };

      const walkSynModuleOrNamespace = function (parent, _arg2) {
        if (_arg2.data[7].EndLine >= currentLine) {
          const matchValue_2 = [_arg2.data[2], parent, _arg2.data[0]];
          const $var29 = matchValue_2[0] ? matchValue_2[1].tail == null ? matchValue_2[2].tail != null ? matchValue_2[2].tail.tail != null ? [1, matchValue_2[2].head, matchValue_2[2].tail.head] : [2] : [2] : [2] : [0];

          switch ($var29[0]) {
            case 0:
              ns.contents = function (ident_2) {
                return Array.from(map_2(function (x_2) {
                  return toString(x_2);
                }, ident_2));
              }(_arg2.data[0]);

              break;

            case 1:
              const ident_4 = function (ident_3) {
                return Array.from(map_2(function (x_3) {
                  return toString(x_3);
                }, ident_3));
              }(_arg2.data[0]);

              ns.contents = ident_4.slice(0, ident_4.length - 2 + 1);
              break;

            case 2:
              break;
          }

          const fullIdent = append(parent, _arg2.data[0]);
          const startLine = (_arg2.data[2] ? _arg2.data[7].StartLine : _arg2.data[7].StartLine - 1) | 0;
          let scopeKind;
          const matchValue_3 = [_arg2.data[2], parent];

          if (matchValue_3[0]) {
            if (matchValue_3[1].tail == null) {
              scopeKind = new ScopeKind(1);
            } else {
              scopeKind = new ScopeKind(2);
            }
          } else {
            scopeKind = new ScopeKind(0);
          }

          doRange(scopeKind, fullIdent, startLine, _arg2.data[7].StartColumn);
          addModule([fullIdent, _arg2.data[7]]);
          iterate(CurriedLambda(walkSynModuleDecl)(fullIdent), _arg2.data[3]);
        }
      };

      const walkSynModuleDecl = function (parent_1, decl) {
        switch (decl.tag) {
          case 9:
            walkSynModuleOrNamespace(parent_1, decl.data);
            break;

          case 1:
            const ident_5 = decl.data[0].data[3];
            const fullIdent_1 = append(parent_1, ident_5);
            addModule([fullIdent_1, decl.data[4]]);

            if (decl.data[4].EndLine >= currentLine) {
              const moduleBodyIdentation = defaultArg(getMinColumn(decl.data[2]), decl.data[4].StartColumn + 4) | 0;
              doRange(new ScopeKind(2), fullIdent_1, decl.data[4].StartLine, moduleBodyIdentation);
              iterate(CurriedLambda(walkSynModuleDecl)(fullIdent_1), decl.data[2]);
            }

            break;

          case 6:
            doRange(new ScopeKind(3), new List(), decl.data[1].EndLine, decl.data[1].StartColumn - 5);
            break;

          case 8:
            doRange(new ScopeKind(4), new List(), decl.data[1].EndLine, decl.data[1].StartColumn);
            break;

          default:}
      };

      if (ast.tag === 0) {
        walkImplFileInput(ast.data);
      }

      const res = defaultArg(result.contents, null, function (tupledArg_1) {
        const ns_1 = defaultArg(ns.contents, null, function (ident_6) {
          return Array.from(map_2(function (x_4) {
            return x_4;
          }, ident_6));
        });
        return [tupledArg_1[0], ns_1, mkPos(tupledArg_1[1].Line + 1, tupledArg_1[1].Column)];
      });
      const modules_1 = toList(sortWith(($var30, $var31) => compare(function (x_5) {
        return -x_5.Idents.length;
      }($var30), function (x_5) {
        return -x_5.Idents.length;
      }($var31)), filter(function (x_6) {
        return x_6.Range.EndLine < currentLine;
      }, modules)));
      return [res, modules_1];
    } finally {
      if (hasInterface(_ignoreAllDiagnostics, "System.IDisposable")) {
        _ignoreAllDiagnostics.Dispose();
      }
    }
  };

  const findBestPositionToInsertOpenDeclaration = __exports.findBestPositionToInsertOpenDeclaration = function (modules, scope, pos, entity) {
    const matchValue = filter_1(function (x) {
      return _Array.startsWith(x.Idents, entity);
    }, modules);

    if (matchValue.tail != null) {
      const scopeKind = scope.Kind.tag === 1 ? new ScopeKind(2) : scope.Kind;
      return new InsertContext(scopeKind, mkPos(Line.fromZ(matchValue.head.Range.EndLine), matchValue.head.Range.StartColumn));
    } else {
      return new InsertContext(scope.Kind, pos);
    }
  };

  const tryFindInsertionContext = __exports.tryFindInsertionContext = function (currentLine, ast, partiallyQualifiedName, insertionPoint) {
    var patternInput;
    return CurriedLambda((patternInput = tryFindNearestPointAndModules(currentLine, ast, insertionPoint), function (tupledArg) {
      const _ignoreAllDiagnostics = ErrorScope[".ctor"]();

      try {
        if (patternInput[0] != null) {
          const scope = getValue(patternInput[0])[0];
          const pos = getValue(patternInput[0])[2];
          const ns = getValue(patternInput[0])[1];
          return map(function (e) {
            return [e, findBestPositionToInsertOpenDeclaration(patternInput[1], scope, pos, tupledArg[3])];
          }, EntityModule.tryCreate(ns, scope.Idents, partiallyQualifiedName, tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3]), Array);
        } else {
          return [];
        }
      } finally {
        if (hasInterface(_ignoreAllDiagnostics, "System.IDisposable")) {
          _ignoreAllDiagnostics.Dispose();
        }
      }
    }));
  };

  const adjustInsertionPoint = __exports.adjustInsertionPoint = function (getLineStr, ctx) {
    let line_2;

    if (ctx.ScopeKind.tag === 1) {
      if (ctx.Pos.Line > 1) {
        const line = getLineStr(ctx.Pos.Line - 2);
        const isImpliciteTopLevelModule = !(line.indexOf("module") === 0 ? !endsWith(line, "=") : false);

        if (isImpliciteTopLevelModule) {
          line_2 = 1;
        } else {
          line_2 = ctx.Pos.Line | 0;
        }
      } else {
        line_2 = 1;
      }
    } else if (ctx.ScopeKind.tag === 0) {
      if (ctx.Pos.Line > 1) {
        line_2 = function (_arg1) {
          return _arg1 == null ? ctx.Pos.Line : getValue(_arg1) + 2;
        }(tryPick(function (tupledArg) {
          return tupledArg[1].indexOf("namespace") === 0 ? tupledArg[0] : null;
        }, mapIndexed(function (i, line_1) {
          return [i, getLineStr(line_1)];
        }, toList(range_1(0, ctx.Pos.Line - 1))))) | 0;
      } else {
        line_2 = 1;
      }
    } else {
      line_2 = ctx.Pos.Line | 0;
    }

    return mkPos(line_2, ctx.Pos.Column);
  };

  const tryFindNearestPointToInsertOpenDeclaration = __exports.tryFindNearestPointToInsertOpenDeclaration = function (currentLine, ast, entity, insertionPoint) {
    const matchValue = tryFindNearestPointAndModules(currentLine, ast, insertionPoint);

    if (matchValue[0] != null) {
      const scope = getValue(matchValue[0])[0];
      const point = getValue(matchValue[0])[2];
      return findBestPositionToInsertOpenDeclaration(matchValue[1], scope, point, entity);
    } else {
      return null;
    }
  };

  return __exports;
}({});