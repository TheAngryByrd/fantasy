import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, toString, compareRecords, equalsRecords, equals, Tuple, makeGeneric, Option } from "../fable-core/Util";
import { FSharpType, FSharpMemberOrFunctionOrValue } from "../symbols/Symbols";
import { splitAt, ofArray, append, reverse, map as map_3 } from "../fable-core/List";
import List from "../fable-core/List";
import { ApplyInfo, ApplyKind, ValueKind, EntityKind, Member, Type, Decorator, MemberKind, MemberLoc, Ident, Entity, Expr } from "../AST/AST.Fable";
import { BasicPatterns, FSharpExpr } from "../symbols/Exprs";
import { tryGetValue, groupBy, create, add, tryFind } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { makeSome, defaultArg, getValue } from "../fable-core/Option";
import { Patterns as Patterns_1, List as List_1, Option as Option_1, Position, SourceLocation, Naming } from "../Fable.Core/Util";
import { pick, fold2, foldBack, fold, iterate, collect, filter, exists, reduceBack, concat, empty, append as append_1, delay, tryHead, last, take, head, tryFind as tryFind_1, map as map_4, choose, forAll2, zip, toList, tryLast, sumBy, count, findIndex, tryPick } from "../fable-core/Seq";
import { toText, endsWith, replace, printf, toFail } from "../fable-core/String";
import { $7C$CoreMeth$7C$_$7C$ as _CoreMeth___, $7C$CoreCons$7C$_$7C$ as _CoreCons___, ensureArity, makeJsObject, makeSequential, deepExists, tryImported, attachRange, makeGet, makeTypeRef, addWarning, GenericInfo, addErrorAndReturnNull, makeEmit, makeIdent, makeNonGenTypeRef, addError, makeStrConst } from "../AST/AST.Fable.Util";
import CurriedLambda from "../fable-core/CurriedLambda";
import { ExtendedNumberKind, NumberKind } from "../AST/AST.Common";
import Choice from "../fable-core/Choice";
import Comparer from "../fable-core/Comparer";
import { Extensions } from "../service/ServiceAssemblyContent";
import { mapIndexed } from "../fable-core/Array";
import { addInPlace, distinct } from "../fable-core/Set";
import Lazy from "../fable-core/Lazy";
import { Plugins } from "./Utils";
import { tryReplace as tryReplace_1 } from "./Replacements";
export class ThisAvailability {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.FSharp2Fable.ThisAvailability",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["ThisUnavailable"], ["ThisAvailable"], ["ThisCaptured", Option(FSharpMemberOrFunctionOrValue), makeGeneric(List, {
        T: Tuple([Option(FSharpMemberOrFunctionOrValue), Expr])
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Fable.FSharp2Fable.ThisAvailability", ThisAvailability);
export class MemberInfo {
  constructor(isInstance, passGenerics) {
    this.isInstance = isInstance;
    this.passGenerics = passGenerics;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.FSharp2Fable.MemberInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        isInstance: "boolean",
        passGenerics: "boolean"
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
setType("Fable.FSharp2Fable.MemberInfo", MemberInfo);
export class EnclosingModule {
  [_Symbol.reflection]() {
    return {
      type: "Fable.FSharp2Fable.EnclosingModule",
      properties: {
        Entity: Entity,
        IsPublic: "boolean"
      }
    };
  }

  constructor(entity, isPublic) {
    this["Entity@"] = entity;
    this["IsPublic@"] = isPublic;
  }

  get Entity() {
    return this["Entity@"];
  }

  get IsPublic() {
    return this["IsPublic@"];
  }

}
setType("Fable.FSharp2Fable.EnclosingModule", EnclosingModule);
export class Context {
  constructor(fileName, enclosingModule, scope, scopedInlines, varNames, typeArgs, decisionTargets, thisAvailability, genericAvailability, isDynamicCurriedLambda, caughtException) {
    this.fileName = fileName;
    this.enclosingModule = enclosingModule;
    this.scope = scope;
    this.scopedInlines = scopedInlines;
    this.varNames = varNames;
    this.typeArgs = typeArgs;
    this.decisionTargets = decisionTargets;
    this.thisAvailability = thisAvailability;
    this.genericAvailability = genericAvailability;
    this.isDynamicCurriedLambda = isDynamicCurriedLambda;
    this.caughtException = caughtException;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.FSharp2Fable.Context",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        fileName: "string",
        enclosingModule: EnclosingModule,
        scope: makeGeneric(List, {
          T: Tuple([Option(FSharpMemberOrFunctionOrValue), Expr])
        }),
        scopedInlines: makeGeneric(List, {
          T: Tuple([FSharpMemberOrFunctionOrValue, FSharpExpr])
        }),
        varNames: makeGeneric(Set, {
          T: "string"
        }),
        typeArgs: makeGeneric(List, {
          T: Tuple(["string", FSharpType])
        }),
        decisionTargets: Option(makeGeneric(_Map, {
          Key: "number",
          Value: Tuple([makeGeneric(List, {
            T: FSharpMemberOrFunctionOrValue
          }), FSharpExpr])
        })),
        thisAvailability: ThisAvailability,
        genericAvailability: "boolean",
        isDynamicCurriedLambda: "boolean",
        caughtException: Option(Ident)
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  static Create(fileName, enclosingModule) {
    return new Context(fileName, new EnclosingModule(enclosingModule, true), new List(), new List(), new Set(), new List(), null, new ThisAvailability(0), false, false, null);
  }

}
setType("Fable.FSharp2Fable.Context", Context);
export const Atts = function (__exports) {
  const abstractClass = __exports.abstractClass = "Microsoft.FSharp.Core.AbstractClassAttribute";
  const compiledName = __exports.compiledName = "Microsoft.FSharp.Core.CompiledNameAttribute";
  const emit = __exports.emit = "Fable.Core.EmitAttribute";

  const _import = __exports.import = "Fable.Core.ImportAttribute";

  const global_ = __exports.global_ = "Fable.Core.GlobalAttribute";
  const erase = __exports.erase = "Fable.Core.EraseAttribute";
  const pojo = __exports.pojo = "Fable.Core.PojoAttribute";
  const stringEnum = __exports.stringEnum = "Fable.Core.StringEnumAttribute";
  const passGenerics = __exports.passGenerics = "Fable.Core.PassGenericsAttribute";
  const paramList = __exports.paramList = "Fable.Core.ParamListAttribute";
  return __exports;
}({});
export const Helpers = function (__exports) {
  const tryBoth = __exports.tryBoth = function (f1, f2, x) {
    const matchValue = f1(x);

    if (matchValue == null) {
      const matchValue_1 = f2(x);

      if (matchValue_1 == null) {
        return null;
      } else {
        return matchValue_1;
      }
    } else {
      return matchValue;
    }
  };

  const nonAbbreviatedType = __exports.nonAbbreviatedType = function (t) {
    nonAbbreviatedType: while (true) {
      if (t.IsAbbreviation) {
        t = t.AbbreviatedType;
        continue nonAbbreviatedType;
      } else {
        return t;
      }
    }
  };

  const nonAbbreviatedEntity = __exports.nonAbbreviatedEntity = function (ent) {
    if (ent.IsFSharpAbbreviation) {
      return nonAbbreviatedType(ent.AbbreviatedType).TypeDefinition;
    } else {
      return ent;
    }
  };

  const getEntityFullName = __exports.getEntityFullName = function (ent) {
    if (ent.IsNamespace) {
      const matchValue = ent.Namespace;

      if (matchValue == null) {
        return ent.CompiledName;
      } else {
        return getValue(matchValue) + "." + ent.CompiledName;
      }
    } else {
      return defaultArg(ent.TryFullName, ent.CompiledName);
    }
  };

  const sanitizeEntityName = __exports.sanitizeEntityName = function (ent) {
    return Naming.replaceGenericArgsCount(ent.CompiledName, "");
  };

  const sanitizeEntityFullName = __exports.sanitizeEntityFullName = function (ent) {
    return Naming.replaceGenericArgsCount(getEntityFullName(ent), "");
  };

  const tryFindAtt = __exports.tryFindAtt = function (f, atts) {
    return tryPick(function (att) {
      const matchValue = att.AttributeType.TryFullName;

      if (matchValue == null) {
        return null;
      } else if (f(getValue(matchValue))) {
        return att;
      } else {
        return null;
      }
    }, atts);
  };

  const hasAtt = __exports.hasAtt = function (name, atts) {
    return tryFindAtt(function (y) {
      return name === y;
    }, atts) != null;
  };

  const tryDefinition = __exports.tryDefinition = function (typ) {
    const typ_1 = nonAbbreviatedType(typ);

    if (typ_1.HasTypeDefinition) {
      return typ_1.TypeDefinition;
    } else {
      return null;
    }
  };

  const tryEnclosingEntity = __exports.tryEnclosingEntity = function (meth) {
    try {
      return meth.DeclaringEntity;
    } catch (matchValue) {
      return null;
    }
  };

  const isModuleMember = __exports.isModuleMember = function (meth) {
    const matchValue = tryEnclosingEntity(meth);

    if (matchValue == null) {
      return false;
    } else {
      return getValue(matchValue).IsFSharpModule;
    }
  };

  const isInline = __exports.isInline = function (meth) {
    const matchValue = meth.InlineAnnotation;

    switch (matchValue.tag) {
      case 2:
        return false;

      case 0:
      case 1:
        return true;

      case 4:
        throw new Error("Not Implemented");

      default:
        return false;
    }
  };

  const isPublicMethod = __exports.isPublicMethod = function (meth) {
    if (meth.IsCompilerGenerated) {
      return false;
    } else {
      const matchValue = tryEnclosingEntity(meth);
      const $var1 = matchValue != null ? getValue(matchValue).Accessibility.IsPrivate ? [0, getValue(matchValue)] : [1] : [1];

      switch ($var1[0]) {
        case 0:
          return true;

        case 1:
          return !meth.Accessibility.IsPrivate;
      }
    }
  };

  const isPublicEntity = __exports.isPublicEntity = function (ctx, ent) {
    if (!ctx.enclosingModule.IsPublic) {
      return true;
    } else {
      return !ent.RepresentationAccessibility.IsPrivate;
    }
  };

  const isUnit = __exports.isUnit = function (typ) {
    const typ_1 = nonAbbreviatedType(typ);

    if (typ_1.HasTypeDefinition) {
      return equals(typ_1.TypeDefinition.TryFullName, "Microsoft.FSharp.Core.Unit");
    } else {
      return false;
    }
  };

  const belongsToInterfaceOrImportedEntity = __exports.belongsToInterfaceOrImportedEntity = function (meth) {
    if (meth.FullName.indexOf("Fable.Import.Node") === 0) {
      return true;
    } else {
      const matchValue = tryEnclosingEntity(meth);

      if (matchValue == null) {
        return false;
      } else if (meth.IsExplicitInterfaceImplementation ? true : getValue(matchValue).IsInterface) {
        return true;
      } else {
        return tryFindAtt(function (name) {
          return name === Atts.import ? true : name === Atts.global_;
        }, getValue(matchValue).Attributes) != null;
      }
    }
  };

  const sameMemberLoc = __exports.sameMemberLoc = function (memberLoc1, memberLoc2) {
    const matchValue = [memberLoc1, memberLoc2];
    const $var2 = matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [1] : [3] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [2] : [3] : matchValue[1].tag === 1 ? [0] : [3];

    switch ($var2[0]) {
      case 0:
        return true;

      case 1:
        return true;

      case 2:
        return true;

      case 3:
        return false;
    }
  };

  const makeRange = __exports.makeRange = function (r) {
    return new SourceLocation(new Position(r.StartLine, r.StartColumn), new Position(r.EndLine, r.EndColumn));
  };

  const makeRangeFrom = __exports.makeRangeFrom = function (fsExpr) {
    return makeRange(fsExpr.Range);
  };

  const getEntityLocation = __exports.getEntityLocation = function (ent) {
    const matchValue = ent.ImplementationLocation;

    if (matchValue == null) {
      return ent.DeclarationLocation;
    } else {
      return getValue(matchValue);
    }
  };

  const getMethLocation = __exports.getMethLocation = function (meth) {
    const matchValue = meth.ImplementationLocation;

    if (matchValue == null) {
      return meth.DeclarationLocation;
    } else {
      return getValue(matchValue);
    }
  };

  const getUnionCaseIndex = __exports.getUnionCaseIndex = function (fsType, unionCaseName) {
    const matchValue = tryDefinition(fsType);

    if (matchValue != null) {
      return findIndex(function (uc) {
        return uc.Name === unionCaseName;
      }, getValue(matchValue).UnionCases) | 0;
    } else {
      return toFail(printf("Cannot find Type definition for union case %s"))(unionCaseName) | 0;
    }
  };

  const lowerCaseName = __exports.lowerCaseName = function (unionCase) {
    return makeStrConst(function (_arg1) {
      return _arg1 == null ? Naming.lowerFirst(unionCase.DisplayName) : toString(getValue(_arg1).ConstructorArguments[0][1]);
    }(tryFindAtt(function (y) {
      return Atts.compiledName === y;
    }, unionCase.Attributes)));
  };

  const tryGetInterfaceFromMethod = __exports.tryGetInterfaceFromMethod = function (meth) {
    if (meth.IsExplicitInterfaceImplementation) {
      if (count(meth.ImplementedAbstractSignatures) > 0) {
        const x = meth.ImplementedAbstractSignatures[0].DeclaringType;

        if (x.HasTypeDefinition) {
          return x.TypeDefinition;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      const matchValue = tryEnclosingEntity(meth);
      const $var3 = matchValue != null ? getValue(matchValue).IsInterface ? [0, getValue(matchValue)] : [1] : [1];

      switch ($var3[0]) {
        case 0:
          return $var3[1];

        case 1:
          return null;
      }
    }
  };

  const getMemberLoc = __exports.getMemberLoc = function (meth) {
    if (!meth.IsInstanceMember ? !meth.IsImplicitConstructor : false) {
      return new MemberLoc(1);
    } else {
      return CurriedLambda(function (arg, defaultValue) {
        return arg != null ? arg : defaultValue;
      })(defaultArg(tryGetInterfaceFromMethod(meth), null, $var4 => new MemberLoc(2, sanitizeEntityFullName($var4))))(new MemberLoc(0));
    }
  };

  const getArgCount = __exports.getArgCount = function (meth) {
    const args = meth.CurriedParameterGroups;

    if (count(args) === 0) {
      return 0;
    } else if (count(args) === 1 ? count(args[0]) === 1 : false) {
      if (isUnit(args[0][0].Type)) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return sumBy(function (li) {
        return count(li);
      }, args) | 0;
    }
  };

  const getMemberKind = __exports.getMemberKind = function (meth) {
    const ent = tryEnclosingEntity(meth);

    if (CurriedLambda(() => ent == null)() ? true : getValue(ent).IsFSharpModule) {
      if ((count(meth.CurriedParameterGroups) === 0 ? count(meth.GenericParameters) === 0 : false) ? !meth.IsMutable : false) {
        return new MemberKind(4);
      } else {
        return new MemberKind(1);
      }
    } else if (meth.IsImplicitConstructor) {
      return new MemberKind(0);
    } else if (meth.IsPropertyGetterMethod ? getArgCount(meth) === 0 : false) {
      return new MemberKind(2);
    } else if (meth.IsPropertySetterMethod ? getArgCount(meth) === 1 : false) {
      return new MemberKind(3);
    } else {
      return new MemberKind(1);
    }
  };

  const fullNameAndArgCount = __exports.fullNameAndArgCount = function (meth) {
    return meth.FullName + "(" + getArgCount(meth).toString() + ")";
  };

  const sanitizeMethodName = __exports.sanitizeMethodName = function (meth) {
    const isInterface = meth.IsExplicitInterfaceImplementation ? true : meth.IsInstanceMember ? Option_1.toBool(function (ent) {
      return ent.IsInterface;
    }, tryEnclosingEntity(meth)) : false;

    if (isInterface) {
      return meth.DisplayName;
    } else {
      const matchValue = getMemberKind(meth);
      const $var5 = matchValue.tag === 2 ? [0] : matchValue.tag === 3 ? [0] : [1];

      switch ($var5[0]) {
        case 0:
          return meth.DisplayName;

        case 1:
          return meth.CompiledName;
      }
    }
  };

  const hasRestParams = __exports.hasRestParams = function (meth) {
    if (count(meth.CurriedParameterGroups) !== 1) {
      return false;
    } else {
      const args = meth.CurriedParameterGroups[0];

      if (count(args) > 0) {
        return args[count(args) - 1].IsParamArrayArg;
      } else {
        return false;
      }
    }
  };

  const hasListParam = __exports.hasListParam = function (meth) {
    return defaultArg(defaultArg(defaultArg(tryLast(meth.CurriedParameterGroups), null, function (source) {
      return tryLast(source);
    }), null, function (lastParam) {
      return hasAtt(Atts.paramList, lastParam.Attributes);
    }), false);
  };

  const hasPassGenericsAtt = __exports.hasPassGenericsAtt = function (com, ctx, meth) {
    var range;
    const matchValue = hasAtt(Atts.passGenerics, meth.Attributes);
    const $var6 = matchValue ? hasRestParams(meth) ? [0] : [1] : [1];

    switch ($var6[0]) {
      case 0:
        (range = makeRange(getMethLocation(meth)), function (warning) {
          addError(com, ctx.fileName, range, warning);
        })(Atts.passGenerics + " is not compatible with ParamArrayAttribute");
        return false;

      case 1:
        return matchValue;
    }
  };

  const removeOmittedOptionalArguments = __exports.removeOmittedOptionalArguments = function (meth, args) {
    const removeArgs = function (args_1) {
      removeArgs: while (true) {
        if (args_1.tail != null) {
          const p = args_1.head[1];
          const arg = args_1.head[0];

          if (arg.IsNull ? p.IsOptionalArg : false) {
            args_1 = args_1.tail;
            continue removeArgs;
          } else {
            return args_1;
          }
        } else {
          return args_1;
        }
      }
    };

    if (count(meth.CurriedParameterGroups) !== 1) {
      return args;
    } else if (count(meth.CurriedParameterGroups[0]) !== args.length) {
      return args;
    } else {
      return map_3(function (tuple) {
        return tuple[0];
      }, reverse(removeArgs(reverse(toList(zip(args, toList(meth.CurriedParameterGroups[0])))))));
    }
  };

  return __exports;
}({});
export const Patterns = function (__exports) {
  const _TypeDefinition___ = __exports["|TypeDefinition|_|"] = function (_arg1) {
    const activePatternResult61036 = Helpers.nonAbbreviatedType(_arg1);

    if (activePatternResult61036.HasTypeDefinition) {
      return activePatternResult61036.TypeDefinition;
    } else {
      return null;
    }
  };

  const _RefType___ = __exports["|RefType|_|"] = function (_arg1) {
    let $var7;
    const activePatternResult61039 = Helpers.nonAbbreviatedType(_arg1);

    const activePatternResult61040 = _TypeDefinition___(activePatternResult61039);

    if (activePatternResult61040 != null) {
      if (equals(getValue(activePatternResult61040).TryFullName, "Microsoft.FSharp.Core.FSharpRef`1")) {
        $var7 = [0, _arg1, getValue(activePatternResult61040)];
      } else {
        $var7 = [1];
      }
    } else {
      $var7 = [1];
    }

    switch ($var7[0]) {
      case 0:
        return makeSome($var7[1]);

      case 1:
        return null;
    }
  };

  const _ListType___ = __exports["|ListType|_|"] = function (_arg1) {
    let $var8;
    const activePatternResult61044 = Helpers.nonAbbreviatedType(_arg1);

    const activePatternResult61045 = _TypeDefinition___(activePatternResult61044);

    if (activePatternResult61045 != null) {
      if (equals(getValue(activePatternResult61045).TryFullName, "Microsoft.FSharp.Collections.FSharpList`1")) {
        $var8 = [0, _arg1, getValue(activePatternResult61045)];
      } else {
        $var8 = [1];
      }
    } else {
      $var8 = [1];
    }

    switch ($var8[0]) {
      case 0:
        return makeSome($var8[1]);

      case 1:
        return null;
    }
  };

  const _ThisVar___ = __exports["|ThisVar|_|"] = function (_arg1) {
    const activePatternResult61049 = BasicPatterns["|ThisValue|_|"](_arg1);

    if (activePatternResult61049 != null) {
      return makeSome();
    } else {
      let $var9;
      const activePatternResult61048 = BasicPatterns["|Value|_|"](_arg1);

      if (activePatternResult61048 != null) {
        if (getValue(activePatternResult61048).IsMemberThisValue ? true : getValue(activePatternResult61048).IsConstructorThisValue) {
          $var9 = [0, getValue(activePatternResult61048)];
        } else {
          $var9 = [1];
        }
      } else {
        $var9 = [1];
      }

      switch ($var9[0]) {
        case 0:
          return makeSome();

        case 1:
          return null;
      }
    }
  };

  const _ForOf___ = __exports["|ForOf|_|"] = function (_arg1) {
    var value;
    var meth;
    var ident;
    var body;
    var value_1;
    var meth_1;
    var ident_1;
    var body_1;
    var value_2;
    var meth_2;
    var ident_2;
    var body_2;
    var value_3;
    var meth_3;
    var ident_3;
    var body_3;
    var value_4;
    var meth_4;
    var ident_4;
    var body_4;
    var value_5;
    var meth_5;
    var ident_5;
    var body_5;
    var value_6;
    var meth_6;
    var ident_6;
    var body_6;
    var value_7;
    var meth_7;
    var ident_7;
    var body_7;
    var value_8;
    var meth_8;
    var ident_8;
    var body_8;
    var value_9;
    var meth_9;
    var ident_9;
    var body_9;
    let $var10;
    const activePatternResult61051 = BasicPatterns["|Let|_|"](_arg1);

    if (activePatternResult61051 != null) {
      const activePatternResult61052 = BasicPatterns["|Let|_|"](getValue(activePatternResult61051)[1]);

      if (activePatternResult61052 != null) {
        const activePatternResult61053 = BasicPatterns["|Call|_|"](getValue(activePatternResult61052)[0][1]);

        if (activePatternResult61053 != null) {
          if (getValue(activePatternResult61053)[0] == null) {
            if (getValue(activePatternResult61053)[3].tail == null) {
              if (getValue(activePatternResult61053)[4].tail == null) {
                const activePatternResult61054 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61052)[1]);

                if (activePatternResult61054 != null) {
                  const activePatternResult61055 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61054)[0]);

                  if (activePatternResult61055 != null) {
                    const activePatternResult61056 = BasicPatterns["|Let|_|"](getValue(activePatternResult61055)[1]);

                    if (activePatternResult61056 != null) {
                      if (value = getValue(activePatternResult61051)[0][1], meth = getValue(activePatternResult61053)[1], ident = getValue(activePatternResult61056)[0][0], body = getValue(activePatternResult61056)[1], meth.CompiledName === "GetEnumerator") {
                        $var10 = [0, getValue(activePatternResult61056)[1], getValue(activePatternResult61056)[0][0], getValue(activePatternResult61053)[1], getValue(activePatternResult61051)[0][1]];
                      } else {
                        const activePatternResult61057 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

                        if (activePatternResult61057 != null) {
                          if (getValue(activePatternResult61057)[0] != null) {
                            if (getValue(activePatternResult61057)[3].tail == null) {
                              if (getValue(activePatternResult61057)[4].tail == null) {
                                const activePatternResult61058 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                                if (activePatternResult61058 != null) {
                                  const activePatternResult61059 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61058)[0]);

                                  if (activePatternResult61059 != null) {
                                    const activePatternResult61060 = BasicPatterns["|Let|_|"](getValue(activePatternResult61059)[1]);

                                    if (activePatternResult61060 != null) {
                                      if (value_1 = getValue(getValue(activePatternResult61057)[0]), meth_1 = getValue(activePatternResult61057)[1], ident_1 = getValue(activePatternResult61060)[0][0], body_1 = getValue(activePatternResult61060)[1], meth_1.CompiledName === "GetEnumerator") {
                                        $var10 = [0, getValue(activePatternResult61060)[1], getValue(activePatternResult61060)[0][0], getValue(activePatternResult61057)[1], getValue(getValue(activePatternResult61057)[0])];
                                      } else {
                                        $var10 = [1];
                                      }
                                    } else {
                                      $var10 = [1];
                                    }
                                  } else {
                                    $var10 = [1];
                                  }
                                } else {
                                  $var10 = [1];
                                }
                              } else {
                                $var10 = [1];
                              }
                            } else {
                              $var10 = [1];
                            }
                          } else {
                            $var10 = [1];
                          }
                        } else {
                          $var10 = [1];
                        }
                      }
                    } else {
                      const activePatternResult61061 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

                      if (activePatternResult61061 != null) {
                        if (getValue(activePatternResult61061)[0] != null) {
                          if (getValue(activePatternResult61061)[3].tail == null) {
                            if (getValue(activePatternResult61061)[4].tail == null) {
                              const activePatternResult61062 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                              if (activePatternResult61062 != null) {
                                const activePatternResult61063 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61062)[0]);

                                if (activePatternResult61063 != null) {
                                  const activePatternResult61064 = BasicPatterns["|Let|_|"](getValue(activePatternResult61063)[1]);

                                  if (activePatternResult61064 != null) {
                                    if (value_2 = getValue(getValue(activePatternResult61061)[0]), meth_2 = getValue(activePatternResult61061)[1], ident_2 = getValue(activePatternResult61064)[0][0], body_2 = getValue(activePatternResult61064)[1], meth_2.CompiledName === "GetEnumerator") {
                                      $var10 = [0, getValue(activePatternResult61064)[1], getValue(activePatternResult61064)[0][0], getValue(activePatternResult61061)[1], getValue(getValue(activePatternResult61061)[0])];
                                    } else {
                                      $var10 = [1];
                                    }
                                  } else {
                                    $var10 = [1];
                                  }
                                } else {
                                  $var10 = [1];
                                }
                              } else {
                                $var10 = [1];
                              }
                            } else {
                              $var10 = [1];
                            }
                          } else {
                            $var10 = [1];
                          }
                        } else {
                          $var10 = [1];
                        }
                      } else {
                        $var10 = [1];
                      }
                    }
                  } else {
                    const activePatternResult61065 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

                    if (activePatternResult61065 != null) {
                      if (getValue(activePatternResult61065)[0] != null) {
                        if (getValue(activePatternResult61065)[3].tail == null) {
                          if (getValue(activePatternResult61065)[4].tail == null) {
                            const activePatternResult61066 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                            if (activePatternResult61066 != null) {
                              const activePatternResult61067 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61066)[0]);

                              if (activePatternResult61067 != null) {
                                const activePatternResult61068 = BasicPatterns["|Let|_|"](getValue(activePatternResult61067)[1]);

                                if (activePatternResult61068 != null) {
                                  if (value_3 = getValue(getValue(activePatternResult61065)[0]), meth_3 = getValue(activePatternResult61065)[1], ident_3 = getValue(activePatternResult61068)[0][0], body_3 = getValue(activePatternResult61068)[1], meth_3.CompiledName === "GetEnumerator") {
                                    $var10 = [0, getValue(activePatternResult61068)[1], getValue(activePatternResult61068)[0][0], getValue(activePatternResult61065)[1], getValue(getValue(activePatternResult61065)[0])];
                                  } else {
                                    $var10 = [1];
                                  }
                                } else {
                                  $var10 = [1];
                                }
                              } else {
                                $var10 = [1];
                              }
                            } else {
                              $var10 = [1];
                            }
                          } else {
                            $var10 = [1];
                          }
                        } else {
                          $var10 = [1];
                        }
                      } else {
                        $var10 = [1];
                      }
                    } else {
                      $var10 = [1];
                    }
                  }
                } else {
                  const activePatternResult61069 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

                  if (activePatternResult61069 != null) {
                    if (getValue(activePatternResult61069)[0] != null) {
                      if (getValue(activePatternResult61069)[3].tail == null) {
                        if (getValue(activePatternResult61069)[4].tail == null) {
                          const activePatternResult61070 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                          if (activePatternResult61070 != null) {
                            const activePatternResult61071 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61070)[0]);

                            if (activePatternResult61071 != null) {
                              const activePatternResult61072 = BasicPatterns["|Let|_|"](getValue(activePatternResult61071)[1]);

                              if (activePatternResult61072 != null) {
                                if (value_4 = getValue(getValue(activePatternResult61069)[0]), meth_4 = getValue(activePatternResult61069)[1], ident_4 = getValue(activePatternResult61072)[0][0], body_4 = getValue(activePatternResult61072)[1], meth_4.CompiledName === "GetEnumerator") {
                                  $var10 = [0, getValue(activePatternResult61072)[1], getValue(activePatternResult61072)[0][0], getValue(activePatternResult61069)[1], getValue(getValue(activePatternResult61069)[0])];
                                } else {
                                  $var10 = [1];
                                }
                              } else {
                                $var10 = [1];
                              }
                            } else {
                              $var10 = [1];
                            }
                          } else {
                            $var10 = [1];
                          }
                        } else {
                          $var10 = [1];
                        }
                      } else {
                        $var10 = [1];
                      }
                    } else {
                      $var10 = [1];
                    }
                  } else {
                    $var10 = [1];
                  }
                }
              } else {
                const activePatternResult61073 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

                if (activePatternResult61073 != null) {
                  if (getValue(activePatternResult61073)[0] != null) {
                    if (getValue(activePatternResult61073)[3].tail == null) {
                      if (getValue(activePatternResult61073)[4].tail == null) {
                        const activePatternResult61074 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                        if (activePatternResult61074 != null) {
                          const activePatternResult61075 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61074)[0]);

                          if (activePatternResult61075 != null) {
                            const activePatternResult61076 = BasicPatterns["|Let|_|"](getValue(activePatternResult61075)[1]);

                            if (activePatternResult61076 != null) {
                              if (value_5 = getValue(getValue(activePatternResult61073)[0]), meth_5 = getValue(activePatternResult61073)[1], ident_5 = getValue(activePatternResult61076)[0][0], body_5 = getValue(activePatternResult61076)[1], meth_5.CompiledName === "GetEnumerator") {
                                $var10 = [0, getValue(activePatternResult61076)[1], getValue(activePatternResult61076)[0][0], getValue(activePatternResult61073)[1], getValue(getValue(activePatternResult61073)[0])];
                              } else {
                                $var10 = [1];
                              }
                            } else {
                              $var10 = [1];
                            }
                          } else {
                            $var10 = [1];
                          }
                        } else {
                          $var10 = [1];
                        }
                      } else {
                        $var10 = [1];
                      }
                    } else {
                      $var10 = [1];
                    }
                  } else {
                    $var10 = [1];
                  }
                } else {
                  $var10 = [1];
                }
              }
            } else {
              const activePatternResult61077 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

              if (activePatternResult61077 != null) {
                if (getValue(activePatternResult61077)[0] != null) {
                  if (getValue(activePatternResult61077)[3].tail == null) {
                    if (getValue(activePatternResult61077)[4].tail == null) {
                      const activePatternResult61078 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                      if (activePatternResult61078 != null) {
                        const activePatternResult61079 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61078)[0]);

                        if (activePatternResult61079 != null) {
                          const activePatternResult61080 = BasicPatterns["|Let|_|"](getValue(activePatternResult61079)[1]);

                          if (activePatternResult61080 != null) {
                            if (value_6 = getValue(getValue(activePatternResult61077)[0]), meth_6 = getValue(activePatternResult61077)[1], ident_6 = getValue(activePatternResult61080)[0][0], body_6 = getValue(activePatternResult61080)[1], meth_6.CompiledName === "GetEnumerator") {
                              $var10 = [0, getValue(activePatternResult61080)[1], getValue(activePatternResult61080)[0][0], getValue(activePatternResult61077)[1], getValue(getValue(activePatternResult61077)[0])];
                            } else {
                              $var10 = [1];
                            }
                          } else {
                            $var10 = [1];
                          }
                        } else {
                          $var10 = [1];
                        }
                      } else {
                        $var10 = [1];
                      }
                    } else {
                      $var10 = [1];
                    }
                  } else {
                    $var10 = [1];
                  }
                } else {
                  $var10 = [1];
                }
              } else {
                $var10 = [1];
              }
            }
          } else {
            const activePatternResult61081 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

            if (activePatternResult61081 != null) {
              if (getValue(activePatternResult61081)[0] != null) {
                if (getValue(activePatternResult61081)[3].tail == null) {
                  if (getValue(activePatternResult61081)[4].tail == null) {
                    const activePatternResult61082 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                    if (activePatternResult61082 != null) {
                      const activePatternResult61083 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61082)[0]);

                      if (activePatternResult61083 != null) {
                        const activePatternResult61084 = BasicPatterns["|Let|_|"](getValue(activePatternResult61083)[1]);

                        if (activePatternResult61084 != null) {
                          if (value_7 = getValue(getValue(activePatternResult61081)[0]), meth_7 = getValue(activePatternResult61081)[1], ident_7 = getValue(activePatternResult61084)[0][0], body_7 = getValue(activePatternResult61084)[1], meth_7.CompiledName === "GetEnumerator") {
                            $var10 = [0, getValue(activePatternResult61084)[1], getValue(activePatternResult61084)[0][0], getValue(activePatternResult61081)[1], getValue(getValue(activePatternResult61081)[0])];
                          } else {
                            $var10 = [1];
                          }
                        } else {
                          $var10 = [1];
                        }
                      } else {
                        $var10 = [1];
                      }
                    } else {
                      $var10 = [1];
                    }
                  } else {
                    $var10 = [1];
                  }
                } else {
                  $var10 = [1];
                }
              } else {
                $var10 = [1];
              }
            } else {
              $var10 = [1];
            }
          }
        } else {
          const activePatternResult61085 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

          if (activePatternResult61085 != null) {
            if (getValue(activePatternResult61085)[0] != null) {
              if (getValue(activePatternResult61085)[3].tail == null) {
                if (getValue(activePatternResult61085)[4].tail == null) {
                  const activePatternResult61086 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                  if (activePatternResult61086 != null) {
                    const activePatternResult61087 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61086)[0]);

                    if (activePatternResult61087 != null) {
                      const activePatternResult61088 = BasicPatterns["|Let|_|"](getValue(activePatternResult61087)[1]);

                      if (activePatternResult61088 != null) {
                        if (value_8 = getValue(getValue(activePatternResult61085)[0]), meth_8 = getValue(activePatternResult61085)[1], ident_8 = getValue(activePatternResult61088)[0][0], body_8 = getValue(activePatternResult61088)[1], meth_8.CompiledName === "GetEnumerator") {
                          $var10 = [0, getValue(activePatternResult61088)[1], getValue(activePatternResult61088)[0][0], getValue(activePatternResult61085)[1], getValue(getValue(activePatternResult61085)[0])];
                        } else {
                          $var10 = [1];
                        }
                      } else {
                        $var10 = [1];
                      }
                    } else {
                      $var10 = [1];
                    }
                  } else {
                    $var10 = [1];
                  }
                } else {
                  $var10 = [1];
                }
              } else {
                $var10 = [1];
              }
            } else {
              $var10 = [1];
            }
          } else {
            $var10 = [1];
          }
        }
      } else {
        const activePatternResult61089 = BasicPatterns["|Call|_|"](getValue(activePatternResult61051)[0][1]);

        if (activePatternResult61089 != null) {
          if (getValue(activePatternResult61089)[0] != null) {
            if (getValue(activePatternResult61089)[3].tail == null) {
              if (getValue(activePatternResult61089)[4].tail == null) {
                const activePatternResult61090 = BasicPatterns["|TryFinally|_|"](getValue(activePatternResult61051)[1]);

                if (activePatternResult61090 != null) {
                  const activePatternResult61091 = BasicPatterns["|WhileLoop|_|"](getValue(activePatternResult61090)[0]);

                  if (activePatternResult61091 != null) {
                    const activePatternResult61092 = BasicPatterns["|Let|_|"](getValue(activePatternResult61091)[1]);

                    if (activePatternResult61092 != null) {
                      if (value_9 = getValue(getValue(activePatternResult61089)[0]), meth_9 = getValue(activePatternResult61089)[1], ident_9 = getValue(activePatternResult61092)[0][0], body_9 = getValue(activePatternResult61092)[1], meth_9.CompiledName === "GetEnumerator") {
                        $var10 = [0, getValue(activePatternResult61092)[1], getValue(activePatternResult61092)[0][0], getValue(activePatternResult61089)[1], getValue(getValue(activePatternResult61089)[0])];
                      } else {
                        $var10 = [1];
                      }
                    } else {
                      $var10 = [1];
                    }
                  } else {
                    $var10 = [1];
                  }
                } else {
                  $var10 = [1];
                }
              } else {
                $var10 = [1];
              }
            } else {
              $var10 = [1];
            }
          } else {
            $var10 = [1];
          }
        } else {
          $var10 = [1];
        }
      }
    } else {
      $var10 = [1];
    }

    switch ($var10[0]) {
      case 0:
        return [$var10[2], $var10[4], $var10[1]];

      case 1:
        return null;
    }
  };

  const _ComposableExpr___ = __exports["|ComposableExpr|_|"] = function (e) {
    let $var11;
    const activePatternResult61097 = BasicPatterns["|Call|_|"](e);

    if (activePatternResult61097 != null) {
      if (getValue(activePatternResult61097)[0] == null) {
        $var11 = [0, getValue(activePatternResult61097)[4]];
      } else {
        $var11 = [1];
      }
    } else {
      $var11 = [1];
    }

    switch ($var11[0]) {
      case 0:
        return [e, $var11[1]];

      case 1:
        const activePatternResult61096 = BasicPatterns["|NewObject|_|"](e);

        if (activePatternResult61096 != null) {
          return [e, getValue(activePatternResult61096)[2]];
        } else {
          const activePatternResult61095 = BasicPatterns["|NewUnionCase|_|"](e);

          if (activePatternResult61095 != null) {
            const activePatternResult61094 = _ListType___(getValue(activePatternResult61095)[0]);

            if (activePatternResult61094 != null) {
              return null;
            } else {
              return [e, getValue(activePatternResult61095)[2]];
            }
          } else {
            return null;
          }
        }

    }
  };

  const _Closure___ = __exports["|Closure|_|"] = function (fsExpr) {
    var marg1_2;
    var larg1_2;
    var e_2;
    var marg2_1;
    var marg1_1;
    var larg2_1;
    var larg1_1;
    var e_1;
    var marg3;
    var marg2;
    var marg1;
    var larg3;
    var larg2;
    var larg1;
    var e;

    const checkArgs = function (identAndRepls, args) {
      if (!List_1.sameLength(identAndRepls, args)) {
        return false;
      } else {
        return forAll2(function (arg, tupledArg) {
          if (tupledArg[0].IsMutable) {
            return false;
          } else {
            let $var12;
            const activePatternResult61099 = BasicPatterns["|Coerce|_|"](arg);

            if (activePatternResult61099 != null) {
              const activePatternResult61100 = BasicPatterns["|Value|_|"](getValue(activePatternResult61099)[1]);

              if (activePatternResult61100 != null) {
                $var12 = [0, getValue(activePatternResult61100)];
              } else {
                const activePatternResult61101 = BasicPatterns["|Value|_|"](arg);

                if (activePatternResult61101 != null) {
                  $var12 = [0, getValue(activePatternResult61101)];
                } else {
                  $var12 = [1];
                }
              }
            } else {
              const activePatternResult61102 = BasicPatterns["|Value|_|"](arg);

              if (activePatternResult61102 != null) {
                $var12 = [0, getValue(activePatternResult61102)];
              } else {
                $var12 = [1];
              }
            }

            switch ($var12[0]) {
              case 0:
                return equals(tupledArg[0], $var12[1]);

              case 1:
                return false;
            }
          }
        }, args, identAndRepls);
      }
    };

    const checkArgs2 = function (lambdaArgs, methArgs) {
      return forAll2(function (larg, marg) {
        let $var13;
        const activePatternResult61107 = BasicPatterns["|Coerce|_|"](marg);

        if (activePatternResult61107 != null) {
          const activePatternResult61108 = BasicPatterns["|Value|_|"](getValue(activePatternResult61107)[1]);

          if (activePatternResult61108 != null) {
            $var13 = [0, getValue(activePatternResult61108)];
          } else {
            const activePatternResult61109 = BasicPatterns["|Value|_|"](marg);

            if (activePatternResult61109 != null) {
              $var13 = [0, getValue(activePatternResult61109)];
            } else {
              $var13 = [1];
            }
          }
        } else {
          const activePatternResult61110 = BasicPatterns["|Value|_|"](marg);

          if (activePatternResult61110 != null) {
            $var13 = [0, getValue(activePatternResult61110)];
          } else {
            $var13 = [1];
          }
        }

        switch ($var13[0]) {
          case 0:
            return equals($var13[1], larg);

          case 1:
            return false;
        }
      }, lambdaArgs, methArgs);
    };

    const visit = function (identAndRepls_1, _arg1) {
      visit: while (true) {
        const activePatternResult61127 = BasicPatterns["|Let|_|"](_arg1);

        if (activePatternResult61127 != null) {
          const identAndRepls_2 = append(identAndRepls_1, ofArray([[getValue(activePatternResult61127)[0][0], getValue(activePatternResult61127)[0][1]]]));
          let $var14;
          const activePatternResult61124 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61127)[1]);

          if (activePatternResult61124 != null) {
            const activePatternResult61125 = _ComposableExpr___(getValue(activePatternResult61124)[1]);

            if (activePatternResult61125 != null) {
              const activePatternResult61126 = reverse(getValue(activePatternResult61125)[1]);

              if (activePatternResult61126.tail != null) {
                $var14 = [0, activePatternResult61126.tail, getValue(activePatternResult61125)[0], getValue(activePatternResult61124)[0], activePatternResult61126.head];
              } else {
                $var14 = [1];
              }
            } else {
              $var14 = [1];
            }
          } else {
            $var14 = [1];
          }

          switch ($var14[0]) {
            case 0:
              if (checkArgs(identAndRepls_2, reverse($var14[1])) ? checkArgs2(ofArray([$var14[3]]), ofArray([$var14[4]])) : false) {
                return [1, $var14[2], map_3(function (tuple) {
                  return tuple[1];
                }, identAndRepls_2)];
              } else {
                return null;
              }

            case 1:
              let $var15;
              const activePatternResult61120 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61127)[1]);

              if (activePatternResult61120 != null) {
                const activePatternResult61121 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61120)[1]);

                if (activePatternResult61121 != null) {
                  const activePatternResult61122 = _ComposableExpr___(getValue(activePatternResult61121)[1]);

                  if (activePatternResult61122 != null) {
                    const activePatternResult61123 = reverse(getValue(activePatternResult61122)[1]);

                    if (activePatternResult61123.tail != null) {
                      if (activePatternResult61123.tail.tail != null) {
                        $var15 = [0, activePatternResult61123.tail.tail, getValue(activePatternResult61122)[0], getValue(activePatternResult61120)[0], getValue(activePatternResult61121)[0], activePatternResult61123.tail.head, activePatternResult61123.head];
                      } else {
                        $var15 = [1];
                      }
                    } else {
                      $var15 = [1];
                    }
                  } else {
                    $var15 = [1];
                  }
                } else {
                  $var15 = [1];
                }
              } else {
                $var15 = [1];
              }

              switch ($var15[0]) {
                case 0:
                  if (checkArgs(identAndRepls_2, reverse($var15[1])) ? checkArgs2(ofArray([$var15[3], $var15[4]]), ofArray([$var15[5], $var15[6]])) : false) {
                    return [2, $var15[2], map_3(function (tuple_1) {
                      return tuple_1[1];
                    }, identAndRepls_2)];
                  } else {
                    return null;
                  }

                case 1:
                  let $var16;
                  const activePatternResult61115 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61127)[1]);

                  if (activePatternResult61115 != null) {
                    const activePatternResult61116 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61115)[1]);

                    if (activePatternResult61116 != null) {
                      const activePatternResult61117 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61116)[1]);

                      if (activePatternResult61117 != null) {
                        const activePatternResult61118 = _ComposableExpr___(getValue(activePatternResult61117)[1]);

                        if (activePatternResult61118 != null) {
                          const activePatternResult61119 = reverse(getValue(activePatternResult61118)[1]);

                          if (activePatternResult61119.tail != null) {
                            if (activePatternResult61119.tail.tail != null) {
                              if (activePatternResult61119.tail.tail.tail != null) {
                                $var16 = [0, activePatternResult61119.tail.tail.tail, getValue(activePatternResult61118)[0], getValue(activePatternResult61115)[0], getValue(activePatternResult61116)[0], getValue(activePatternResult61117)[0], activePatternResult61119.tail.tail.head, activePatternResult61119.tail.head, activePatternResult61119.head];
                              } else {
                                $var16 = [1];
                              }
                            } else {
                              $var16 = [1];
                            }
                          } else {
                            $var16 = [1];
                          }
                        } else {
                          $var16 = [1];
                        }
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
                      if (checkArgs(identAndRepls_2, reverse($var16[1])) ? checkArgs2(ofArray([$var16[3], $var16[4], $var16[5]]), ofArray([$var16[6], $var16[7], $var16[8]])) : false) {
                        return [3, $var16[2], map_3(function (tuple_2) {
                          return tuple_2[1];
                        }, identAndRepls_2)];
                      } else {
                        return null;
                      }

                    case 1:
                      identAndRepls_1 = identAndRepls_2;
                      _arg1 = getValue(activePatternResult61127)[1];
                      continue visit;
                  }

              }

          }
        } else {
          return null;
        }
      }
    };

    let $var17;
    const activePatternResult61137 = BasicPatterns["|Lambda|_|"](fsExpr);

    if (activePatternResult61137 != null) {
      const activePatternResult61138 = _ComposableExpr___(getValue(activePatternResult61137)[1]);

      if (activePatternResult61138 != null) {
        if (getValue(activePatternResult61138)[1].tail != null) {
          if (getValue(activePatternResult61138)[1].tail.tail == null) {
            if (marg1_2 = getValue(activePatternResult61138)[1].head, larg1_2 = getValue(activePatternResult61137)[0], e_2 = getValue(activePatternResult61138)[0], checkArgs2(ofArray([larg1_2]), ofArray([marg1_2]))) {
              $var17 = [0, getValue(activePatternResult61138)[0], getValue(activePatternResult61137)[0], getValue(activePatternResult61138)[1].head];
            } else {
              $var17 = [1];
            }
          } else {
            $var17 = [1];
          }
        } else {
          $var17 = [1];
        }
      } else {
        $var17 = [1];
      }
    } else {
      $var17 = [1];
    }

    switch ($var17[0]) {
      case 0:
        return [1, $var17[1], new List()];

      case 1:
        let $var18;
        const activePatternResult61134 = BasicPatterns["|Lambda|_|"](fsExpr);

        if (activePatternResult61134 != null) {
          const activePatternResult61135 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61134)[1]);

          if (activePatternResult61135 != null) {
            const activePatternResult61136 = _ComposableExpr___(getValue(activePatternResult61135)[1]);

            if (activePatternResult61136 != null) {
              if (getValue(activePatternResult61136)[1].tail != null) {
                if (getValue(activePatternResult61136)[1].tail.tail != null) {
                  if (getValue(activePatternResult61136)[1].tail.tail.tail == null) {
                    if (marg2_1 = getValue(activePatternResult61136)[1].tail.head, marg1_1 = getValue(activePatternResult61136)[1].head, larg2_1 = getValue(activePatternResult61135)[0], larg1_1 = getValue(activePatternResult61134)[0], e_1 = getValue(activePatternResult61136)[0], checkArgs2(ofArray([larg1_1, larg2_1]), ofArray([marg1_1, marg2_1]))) {
                      $var18 = [0, getValue(activePatternResult61136)[0], getValue(activePatternResult61134)[0], getValue(activePatternResult61135)[0], getValue(activePatternResult61136)[1].head, getValue(activePatternResult61136)[1].tail.head];
                    } else {
                      $var18 = [1];
                    }
                  } else {
                    $var18 = [1];
                  }
                } else {
                  $var18 = [1];
                }
              } else {
                $var18 = [1];
              }
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
            return [2, $var18[1], new List()];

          case 1:
            let $var19;
            const activePatternResult61130 = BasicPatterns["|Lambda|_|"](fsExpr);

            if (activePatternResult61130 != null) {
              const activePatternResult61131 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61130)[1]);

              if (activePatternResult61131 != null) {
                const activePatternResult61132 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61131)[1]);

                if (activePatternResult61132 != null) {
                  const activePatternResult61133 = _ComposableExpr___(getValue(activePatternResult61132)[1]);

                  if (activePatternResult61133 != null) {
                    if (getValue(activePatternResult61133)[1].tail != null) {
                      if (getValue(activePatternResult61133)[1].tail.tail != null) {
                        if (getValue(activePatternResult61133)[1].tail.tail.tail != null) {
                          if (getValue(activePatternResult61133)[1].tail.tail.tail.tail == null) {
                            if (marg3 = getValue(activePatternResult61133)[1].tail.tail.head, marg2 = getValue(activePatternResult61133)[1].tail.head, marg1 = getValue(activePatternResult61133)[1].head, larg3 = getValue(activePatternResult61132)[0], larg2 = getValue(activePatternResult61131)[0], larg1 = getValue(activePatternResult61130)[0], e = getValue(activePatternResult61133)[0], checkArgs2(ofArray([larg1, larg2, larg3]), ofArray([marg1, marg2, marg3]))) {
                              $var19 = [0, getValue(activePatternResult61133)[0], getValue(activePatternResult61130)[0], getValue(activePatternResult61131)[0], getValue(activePatternResult61132)[0], getValue(activePatternResult61133)[1].head, getValue(activePatternResult61133)[1].tail.head, getValue(activePatternResult61133)[1].tail.tail.head];
                            } else {
                              $var19 = [1];
                            }
                          } else {
                            $var19 = [1];
                          }
                        } else {
                          $var19 = [1];
                        }
                      } else {
                        $var19 = [1];
                      }
                    } else {
                      $var19 = [1];
                    }
                  } else {
                    $var19 = [1];
                  }
                } else {
                  $var19 = [1];
                }
              } else {
                $var19 = [1];
              }
            } else {
              $var19 = [1];
            }

            switch ($var19[0]) {
              case 0:
                return [3, $var19[1], new List()];

              case 1:
                return visit(new List(), fsExpr);
            }

        }

    }
  };

  const _PrintFormat___ = __exports["|PrintFormat|_|"] = function (fsExpr) {
    var v;
    var e;
    var args;
    let $var20;
    const activePatternResult61140 = BasicPatterns["|Let|_|"](fsExpr);

    if (activePatternResult61140 != null) {
      const activePatternResult61141 = BasicPatterns["|Call|_|"](getValue(activePatternResult61140)[0][1]);

      if (activePatternResult61141 != null) {
        if (getValue(activePatternResult61141)[0] == null) {
          if (v = getValue(activePatternResult61140)[0][0], e = getValue(activePatternResult61140)[0][1], args = getValue(activePatternResult61141)[4], v.IsCompilerGenerated) {
            $var20 = [0, getValue(activePatternResult61141)[4], getValue(activePatternResult61140)[0][1], getValue(activePatternResult61140)[0][0]];
          } else {
            $var20 = [1];
          }
        } else {
          $var20 = [1];
        }
      } else {
        $var20 = [1];
      }
    } else {
      $var20 = [1];
    }

    switch ($var20[0]) {
      case 0:
        const matchValue = tryLast($var20[1]);

        if (matchValue == null) {
          return null;
        } else if (getValue(matchValue).Type.HasTypeDefinition ? getValue(matchValue).Type.TypeDefinition.AccessPath === "Microsoft.FSharp.Core.PrintfModule" : false) {
          return $var20[2];
        } else {
          return null;
        }

      case 1:
        return null;
    }
  };

  const _Pipe___ = __exports["|Pipe|_|"] = function (_arg1) {
    let $var21;
    const activePatternResult61145 = BasicPatterns["|Call|_|"](_arg1);

    if (activePatternResult61145 != null) {
      if (getValue(activePatternResult61145)[0] == null) {
        if (getValue(activePatternResult61145)[4].tail != null) {
          if (getValue(activePatternResult61145)[4].tail.tail != null) {
            if (getValue(activePatternResult61145)[4].tail.tail.tail == null) {
              $var21 = [0, getValue(activePatternResult61145)[4].head, getValue(activePatternResult61145)[4].tail.head, getValue(activePatternResult61145)[1]];
            } else {
              $var21 = [1];
            }
          } else {
            $var21 = [1];
          }
        } else {
          $var21 = [1];
        }
      } else {
        $var21 = [1];
      }
    } else {
      $var21 = [1];
    }

    switch ($var21[0]) {
      case 0:
        const matchValue = $var21[3].FullName;

        if (matchValue === "Microsoft.FSharp.Core.Operators.( |> )") {
          return [$var21[2], ofArray([$var21[1]])];
        } else if (matchValue === "Microsoft.FSharp.Core.Operators.( <| )") {
          return [$var21[1], ofArray([$var21[2]])];
        } else {
          return null;
        }

      case 1:
        let $var22;
        const activePatternResult61144 = BasicPatterns["|Call|_|"](_arg1);

        if (activePatternResult61144 != null) {
          if (getValue(activePatternResult61144)[0] == null) {
            if (getValue(activePatternResult61144)[4].tail != null) {
              if (getValue(activePatternResult61144)[4].tail.tail != null) {
                if (getValue(activePatternResult61144)[4].tail.tail.tail != null) {
                  if (getValue(activePatternResult61144)[4].tail.tail.tail.tail == null) {
                    $var22 = [0, getValue(activePatternResult61144)[4].head, getValue(activePatternResult61144)[4].tail.head, getValue(activePatternResult61144)[4].tail.tail.head, getValue(activePatternResult61144)[1]];
                  } else {
                    $var22 = [1];
                  }
                } else {
                  $var22 = [1];
                }
              } else {
                $var22 = [1];
              }
            } else {
              $var22 = [1];
            }
          } else {
            $var22 = [1];
          }
        } else {
          $var22 = [1];
        }

        switch ($var22[0]) {
          case 0:
            const matchValue_1 = $var22[4].FullName;

            if (matchValue_1 === "Microsoft.FSharp.Core.Operators.( ||> )") {
              return [$var22[3], ofArray([$var22[1], $var22[2]])];
            } else if (matchValue_1 === "Microsoft.FSharp.Core.Operators.( <|| )") {
              return [$var22[1], ofArray([$var22[2], $var22[3]])];
            } else {
              return null;
            }

          case 1:
            let $var23;
            const activePatternResult61143 = BasicPatterns["|Call|_|"](_arg1);

            if (activePatternResult61143 != null) {
              if (getValue(activePatternResult61143)[0] == null) {
                if (getValue(activePatternResult61143)[4].tail != null) {
                  if (getValue(activePatternResult61143)[4].tail.tail != null) {
                    if (getValue(activePatternResult61143)[4].tail.tail.tail != null) {
                      if (getValue(activePatternResult61143)[4].tail.tail.tail.tail != null) {
                        if (getValue(activePatternResult61143)[4].tail.tail.tail.tail.tail == null) {
                          $var23 = [0, getValue(activePatternResult61143)[4].head, getValue(activePatternResult61143)[4].tail.head, getValue(activePatternResult61143)[4].tail.tail.head, getValue(activePatternResult61143)[4].tail.tail.tail.head, getValue(activePatternResult61143)[1]];
                        } else {
                          $var23 = [1];
                        }
                      } else {
                        $var23 = [1];
                      }
                    } else {
                      $var23 = [1];
                    }
                  } else {
                    $var23 = [1];
                  }
                } else {
                  $var23 = [1];
                }
              } else {
                $var23 = [1];
              }
            } else {
              $var23 = [1];
            }

            switch ($var23[0]) {
              case 0:
                const matchValue_2 = $var23[5].FullName;

                if (matchValue_2 === "Microsoft.FSharp.Core.Operators.( |||> )") {
                  return [$var23[4], ofArray([$var23[1], $var23[2], $var23[3]])];
                } else if (matchValue_2 === "Microsoft.FSharp.Core.Operators.( <||| )") {
                  return [$var23[1], ofArray([$var23[2], $var23[3], $var23[4]])];
                } else {
                  return null;
                }

              case 1:
                return null;
            }

        }

    }
  };

  const _Composition___ = __exports["|Composition|_|"] = function (_arg1) {
    let $var24;
    const activePatternResult61147 = BasicPatterns["|Call|_|"](_arg1);

    if (activePatternResult61147 != null) {
      if (getValue(activePatternResult61147)[0] == null) {
        if (getValue(activePatternResult61147)[4].tail != null) {
          const activePatternResult61148 = _Closure___(getValue(activePatternResult61147)[4].head);

          if (activePatternResult61148 != null) {
            if (getValue(activePatternResult61148)[0] === 1) {
              if (getValue(activePatternResult61147)[4].tail.tail != null) {
                const activePatternResult61149 = _Closure___(getValue(activePatternResult61147)[4].tail.head);

                if (activePatternResult61149 != null) {
                  if (getValue(activePatternResult61149)[0] === 1) {
                    if (getValue(activePatternResult61147)[4].tail.tail.tail == null) {
                      $var24 = [0, getValue(activePatternResult61148)[2], getValue(activePatternResult61149)[2], getValue(activePatternResult61147)[1], getValue(activePatternResult61148)[1], getValue(activePatternResult61149)[1]];
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
        const matchValue = $var24[3].FullName;

        if (matchValue === "Microsoft.FSharp.Core.Operators.( >> )") {
          return [$var24[4], $var24[1], $var24[5], $var24[2]];
        } else if (matchValue === "Microsoft.FSharp.Core.Operators.( << )") {
          return [$var24[5], $var24[2], $var24[4], $var24[1]];
        } else {
          return null;
        }

      case 1:
        return null;
    }
  };

  const _ErasableLambda___ = __exports["|ErasableLambda|_|"] = function (fsExpr) {
    var exprs;
    var e;
    var arity;
    var args;
    let $var25;

    const activePatternResult61151 = _Pipe___(fsExpr);

    if (activePatternResult61151 != null) {
      const activePatternResult61152 = _Closure___(getValue(activePatternResult61151)[0]);

      if (activePatternResult61152 != null) {
        if (exprs = getValue(activePatternResult61151)[1], e = getValue(activePatternResult61152)[1], arity = getValue(activePatternResult61152)[0] | 0, args = getValue(activePatternResult61152)[2], arity === exprs.length) {
          $var25 = [0, getValue(activePatternResult61152)[2], getValue(activePatternResult61152)[0], getValue(activePatternResult61152)[1], getValue(activePatternResult61151)[1]];
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
        return [$var25[3], append($var25[1], $var25[4])];

      case 1:
        return null;
    }
  };

  const _MaybeCoerced_ = __exports["|MaybeCoerced|"] = function (_arg1) {
    const activePatternResult61154 = BasicPatterns["|Coerce|_|"](_arg1);

    if (activePatternResult61154 != null) {
      return getValue(activePatternResult61154)[1];
    } else {
      return _arg1;
    }
  };

  const _ErasableClosure___ = __exports["|ErasableClosure|_|"] = function (fsExpr) {
    var nested_1;
    var e_1;
    var clo0_1;
    var arg0_1;

    const erasableClosure = function (e, clo0, arg0, _arg1) {
      var nested;
      var clo1;
      var arg1;

      erasableClosure: while (true) {
        let $var26;
        const activePatternResult61161 = BasicPatterns["|Application|_|"](_arg1);

        if (activePatternResult61161 != null) {
          const activePatternResult61162 = BasicPatterns["|Value|_|"](getValue(activePatternResult61161)[0]);

          if (activePatternResult61162 != null) {
            if (getValue(activePatternResult61161)[2].tail != null) {
              const activePatternResult61163 = _MaybeCoerced_(getValue(activePatternResult61161)[2].head);

              const activePatternResult61164 = BasicPatterns["|Value|_|"](activePatternResult61163);

              if (activePatternResult61164 != null) {
                if (getValue(activePatternResult61161)[2].tail.tail == null) {
                  if (equals(clo0, getValue(activePatternResult61162)) ? equals(arg0, getValue(activePatternResult61164)) : false) {
                    $var26 = [0, getValue(activePatternResult61164), getValue(activePatternResult61162)];
                  } else {
                    $var26 = [1];
                  }
                } else {
                  $var26 = [1];
                }
              } else {
                $var26 = [1];
              }
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
            return makeSome(e);

          case 1:
            let $var27;
            const activePatternResult61156 = BasicPatterns["|Let|_|"](_arg1);

            if (activePatternResult61156 != null) {
              const activePatternResult61157 = BasicPatterns["|Application|_|"](getValue(activePatternResult61156)[0][1]);

              if (activePatternResult61157 != null) {
                const activePatternResult61158 = BasicPatterns["|Value|_|"](getValue(activePatternResult61157)[0]);

                if (activePatternResult61158 != null) {
                  if (getValue(activePatternResult61157)[2].tail != null) {
                    const activePatternResult61159 = BasicPatterns["|Value|_|"](getValue(activePatternResult61157)[2].head);

                    if (activePatternResult61159 != null) {
                      if (getValue(activePatternResult61157)[2].tail.tail == null) {
                        const activePatternResult61160 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61156)[1]);

                        if (activePatternResult61160 != null) {
                          if (nested = getValue(activePatternResult61160)[1], clo1 = getValue(activePatternResult61156)[0][0], arg1 = getValue(activePatternResult61160)[0], (clo1.IsCompilerGenerated ? equals(clo0, getValue(activePatternResult61158)) : false) ? equals(arg0, getValue(activePatternResult61159)) : false) {
                            $var27 = [0, getValue(activePatternResult61159), getValue(activePatternResult61160)[0], getValue(activePatternResult61158), getValue(activePatternResult61156)[0][0], getValue(activePatternResult61160)[1]];
                          } else {
                            $var27 = [1];
                          }
                        } else {
                          $var27 = [1];
                        }
                      } else {
                        $var27 = [1];
                      }
                    } else {
                      $var27 = [1];
                    }
                  } else {
                    $var27 = [1];
                  }
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
                e = e;
                clo0 = $var27[4];
                arg0 = $var27[2];
                _arg1 = $var27[5];
                continue erasableClosure;

              case 1:
                return null;
            }

        }
      }
    };

    let $var28;
    const activePatternResult61170 = BasicPatterns["|Let|_|"](fsExpr);

    if (activePatternResult61170 != null) {
      const activePatternResult61171 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61170)[1]);

      if (activePatternResult61171 != null) {
        if (nested_1 = getValue(activePatternResult61171)[1], e_1 = getValue(activePatternResult61170)[0][1], clo0_1 = getValue(activePatternResult61170)[0][0], arg0_1 = getValue(activePatternResult61171)[0], clo0_1.IsCompilerGenerated) {
          $var28 = [0, getValue(activePatternResult61171)[0], getValue(activePatternResult61170)[0][0], getValue(activePatternResult61170)[0][1], getValue(activePatternResult61171)[1]];
        } else {
          $var28 = [1];
        }
      } else {
        $var28 = [1];
      }
    } else {
      $var28 = [1];
    }

    switch ($var28[0]) {
      case 0:
        return erasableClosure($var28[3], $var28[2], $var28[1], $var28[4]);

      case 1:
        return null;
    }
  };

  const _Applicable___ = __exports["|Applicable|_|"] = function (_arg1) {
    let $var29;
    const activePatternResult61173 = BasicPatterns["|Let|_|"](_arg1);

    if (activePatternResult61173 != null) {
      const activePatternResult61174 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61173)[1]);

      if (activePatternResult61174 != null) {
        const activePatternResult61175 = BasicPatterns["|Application|_|"](getValue(activePatternResult61174)[1]);

        if (activePatternResult61175 != null) {
          $var29 = [0, getValue(activePatternResult61175)[0], getValue(activePatternResult61173)[0][1]];
        } else {
          $var29 = [1];
        }
      } else {
        $var29 = [1];
      }
    } else {
      $var29 = [1];
    }

    switch ($var29[0]) {
      case 0:
        const ctyp = $var29[2].Type;

        if (((ctyp.IsAbbreviation ? ctyp.HasTypeDefinition : false) ? ctyp.TypeDefinition.AccessPath === "Fable.Core" : false) ? ctyp.TypeDefinition.CompiledName === "Applicable" : false) {
          return $var29[2];
        } else {
          return null;
        }

      case 1:
        return null;
    }
  };

  const _JsThis___ = __exports["|JsThis|_|"] = function (_arg1) {
    var jsThis;
    let $var30;
    const activePatternResult61177 = BasicPatterns["|Call|_|"](_arg1);

    if (activePatternResult61177 != null) {
      if (getValue(activePatternResult61177)[0] == null) {
        if (getValue(activePatternResult61177)[4].tail == null) {
          if (jsThis = getValue(activePatternResult61177)[1], jsThis.FullName.indexOf("Fable.Core.JsInterop.jsThis") === 0) {
            $var30 = [0, getValue(activePatternResult61177)[1]];
          } else {
            $var30 = [1];
          }
        } else {
          $var30 = [1];
        }
      } else {
        $var30 = [1];
      }
    } else {
      $var30 = [1];
    }

    switch ($var30[0]) {
      case 0:
        return makeSome();

      case 1:
        return null;
    }
  };

  const _FlattenedApplication___ = __exports["|FlattenedApplication|_|"] = function (fsExpr) {
    const flattenApplication = function (typeArgs, args, _arg1) {
      flattenApplication: while (true) {
        const activePatternResult61179 = BasicPatterns["|Application|_|"](_arg1);

        if (activePatternResult61179 != null) {
          typeArgs = append(getValue(activePatternResult61179)[1], typeArgs);
          args = append(getValue(activePatternResult61179)[2], args);
          _arg1 = getValue(activePatternResult61179)[0];
          continue flattenApplication;
        } else {
          return [_arg1, typeArgs, args];
        }
      }
    };

    const activePatternResult61183 = BasicPatterns["|Application|_|"](fsExpr);

    if (activePatternResult61183 != null) {
      return flattenApplication(getValue(activePatternResult61183)[1], getValue(activePatternResult61183)[2], getValue(activePatternResult61183)[0]);
    } else {
      return null;
    }
  };

  const _FlattenedLambda___ = __exports["|FlattenedLambda|_|"] = function (fsExpr) {
    const flattenDestructs = function (tupleDestructs, _arg1) {
      flattenDestructs: while (true) {
        let $var31;
        const activePatternResult61185 = BasicPatterns["|Let|_|"](_arg1);

        if (activePatternResult61185 != null) {
          const activePatternResult61186 = BasicPatterns["|TupleGet|_|"](getValue(activePatternResult61185)[0][1]);

          if (activePatternResult61186 != null) {
            const activePatternResult61187 = BasicPatterns["|Value|_|"](getValue(activePatternResult61186)[2]);

            if (activePatternResult61187 != null) {
              $var31 = [0, getValue(activePatternResult61185)[0][1], getValue(activePatternResult61185)[1], getValue(activePatternResult61185)[0][0]];
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
            tupleDestructs = new List([$var31[3], $var31[1]], tupleDestructs);
            _arg1 = $var31[2];
            continue flattenDestructs;

          case 1:
            return [tupleDestructs, _arg1];
        }
      }
    };

    const flattenLambda = function (args, tupleDestructs_1, _arg2) {
      flattenLambda: while (true) {
        const activePatternResult61190 = BasicPatterns["|Lambda|_|"](_arg2);

        if (activePatternResult61190 != null) {
          const patternInput = ((getValue(activePatternResult61190)[0].FullType.IsTupleType ? getValue(activePatternResult61190)[0].IsCompilerGenerated : false) ? getValue(activePatternResult61190)[0].CompiledName === "tupledArg" : false) ? flattenDestructs(tupleDestructs_1, getValue(activePatternResult61190)[1]) : [tupleDestructs_1, getValue(activePatternResult61190)[1]];
          args = new List(getValue(activePatternResult61190)[0], args);
          tupleDestructs_1 = patternInput[0];
          _arg2 = patternInput[1];
          continue flattenLambda;
        } else if (args.tail == null) {
          return null;
        } else {
          return [reverse(args), reverse(tupleDestructs_1), _arg2];
        }
      }
    };

    return flattenLambda(new List(), new List(), fsExpr);
  };

  const _MaybeErased_ = __exports["|MaybeErased|"] = function (_arg1) {
    let $var32;
    const activePatternResult61196 = BasicPatterns["|Application|_|"](_arg1);

    if (activePatternResult61196 != null) {
      if (getValue(activePatternResult61196)[2].tail == null) {
        $var32 = [0, getValue(activePatternResult61196)[0]];
      } else {
        $var32 = [1];
      }
    } else {
      $var32 = [1];
    }

    switch ($var32[0]) {
      case 0:
        return $var32[1];

      case 1:
        const activePatternResult61195 = BasicPatterns["|AddressOf|_|"](_arg1);

        if (activePatternResult61195 != null) {
          return getValue(activePatternResult61195);
        } else {
          return _arg1;
        }

    }
  };

  const _ImmutableBinding___ = __exports["|ImmutableBinding|_|"] = function (_arg1) {
    var _var_4;

    var body_4;

    var _var_3;

    var value_3;
    var body_3;

    var _var_2;

    var value_2;
    var body_2;

    var _var_1;

    var value_1;
    var body_1;

    var _var;

    var value;
    var fi;
    var body;
    let $var33;
    const activePatternResult61210 = BasicPatterns["|Let|_|"](_arg1);

    if (activePatternResult61210 != null) {
      const activePatternResult61211 = _MaybeErased_(getValue(activePatternResult61210)[0][1]);

      const activePatternResult61212 = BasicPatterns["|Value|_|"](activePatternResult61211);

      if (activePatternResult61212 != null) {
        if (_var_4 = getValue(activePatternResult61210)[0][0], body_4 = getValue(activePatternResult61210)[1], (!_var_4.IsMutable ? !getValue(activePatternResult61212).IsMutable : false) ? !getValue(activePatternResult61212).IsMemberThisValue : false) {
          $var33 = [0, getValue(activePatternResult61210)[1], getValue(activePatternResult61212), activePatternResult61211, getValue(activePatternResult61210)[0][0]];
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
        return [[$var33[4], $var33[3]], $var33[1]];

      case 1:
        let $var34;
        const activePatternResult61208 = BasicPatterns["|Let|_|"](_arg1);

        if (activePatternResult61208 != null) {
          const activePatternResult61209 = BasicPatterns["|Const|_|"](getValue(activePatternResult61208)[0][1]);

          if (activePatternResult61209 != null) {
            if (_var_3 = getValue(activePatternResult61208)[0][0], value_3 = getValue(activePatternResult61208)[0][1], body_3 = getValue(activePatternResult61208)[1], !_var_3.IsMutable) {
              $var34 = [0, getValue(activePatternResult61208)[1], getValue(activePatternResult61208)[0][1], getValue(activePatternResult61208)[0][0]];
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
            return [[$var34[3], $var34[2]], $var34[1]];

          case 1:
            let $var35;
            const activePatternResult61204 = BasicPatterns["|Let|_|"](_arg1);

            if (activePatternResult61204 != null) {
              const activePatternResult61205 = BasicPatterns["|UnionCaseGet|_|"](getValue(activePatternResult61204)[0][1]);

              if (activePatternResult61205 != null) {
                const activePatternResult61206 = _MaybeErased_(getValue(activePatternResult61205)[0]);

                const activePatternResult61207 = BasicPatterns["|Value|_|"](activePatternResult61206);

                if (activePatternResult61207 != null) {
                  if (_var_2 = getValue(activePatternResult61204)[0][0], value_2 = getValue(activePatternResult61204)[0][1], body_2 = getValue(activePatternResult61204)[1], !_var_2.IsMutable ? !getValue(activePatternResult61207).IsMutable : false) {
                    $var35 = [0, getValue(activePatternResult61204)[1], getValue(activePatternResult61207), getValue(activePatternResult61204)[0][1], getValue(activePatternResult61204)[0][0]];
                  } else {
                    $var35 = [1];
                  }
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
                return [[$var35[4], $var35[3]], $var35[1]];

              case 1:
                let $var36;
                const activePatternResult61201 = BasicPatterns["|Let|_|"](_arg1);

                if (activePatternResult61201 != null) {
                  const activePatternResult61202 = BasicPatterns["|TupleGet|_|"](getValue(activePatternResult61201)[0][1]);

                  if (activePatternResult61202 != null) {
                    const activePatternResult61203 = BasicPatterns["|Value|_|"](getValue(activePatternResult61202)[2]);

                    if (activePatternResult61203 != null) {
                      if (_var_1 = getValue(activePatternResult61201)[0][0], value_1 = getValue(activePatternResult61201)[0][1], body_1 = getValue(activePatternResult61201)[1], !_var_1.IsMutable ? !getValue(activePatternResult61203).IsMutable : false) {
                        $var36 = [0, getValue(activePatternResult61201)[1], getValue(activePatternResult61203), getValue(activePatternResult61201)[0][1], getValue(activePatternResult61201)[0][0]];
                      } else {
                        $var36 = [1];
                      }
                    } else {
                      $var36 = [1];
                    }
                  } else {
                    $var36 = [1];
                  }
                } else {
                  $var36 = [1];
                }

                switch ($var36[0]) {
                  case 0:
                    return [[$var36[4], $var36[3]], $var36[1]];

                  case 1:
                    let $var37;
                    const activePatternResult61198 = BasicPatterns["|Let|_|"](_arg1);

                    if (activePatternResult61198 != null) {
                      const activePatternResult61199 = BasicPatterns["|FSharpFieldGet|_|"](getValue(activePatternResult61198)[0][1]);

                      if (activePatternResult61199 != null) {
                        if (getValue(activePatternResult61199)[0] != null) {
                          const activePatternResult61200 = BasicPatterns["|Value|_|"](getValue(getValue(activePatternResult61199)[0]));

                          if (activePatternResult61200 != null) {
                            if (_var = getValue(activePatternResult61198)[0][0], value = getValue(activePatternResult61198)[0][1], fi = getValue(activePatternResult61199)[2], body = getValue(activePatternResult61198)[1], (!_var.IsMutable ? !getValue(activePatternResult61200).IsMutable : false) ? !fi.IsMutable : false) {
                              $var37 = [0, getValue(activePatternResult61198)[1], getValue(activePatternResult61199)[2], getValue(activePatternResult61200), getValue(activePatternResult61198)[0][1], getValue(activePatternResult61198)[0][0]];
                            } else {
                              $var37 = [1];
                            }
                          } else {
                            $var37 = [1];
                          }
                        } else {
                          $var37 = [1];
                        }
                      } else {
                        $var37 = [1];
                      }
                    } else {
                      $var37 = [1];
                    }

                    switch ($var37[0]) {
                      case 0:
                        return [[$var37[5], $var37[4]], $var37[1]];

                      case 1:
                        return null;
                    }

                }

            }

        }

    }
  };

  const _TryGetValue___ = __exports["|TryGetValue|_|"] = function (_arg1) {
    var typArgs;
    var outArg1;
    var methTypArgs;
    var meth;
    var def;
    var callee;
    var arg;
    let $var38;
    const activePatternResult61214 = BasicPatterns["|Let|_|"](_arg1);

    if (activePatternResult61214 != null) {
      const activePatternResult61215 = BasicPatterns["|DefaultValue|_|"](getValue(activePatternResult61214)[0][1]);

      if (activePatternResult61215 != null) {
        const activePatternResult61216 = BasicPatterns["|NewTuple|_|"](getValue(activePatternResult61214)[1]);

        if (activePatternResult61216 != null) {
          if (getValue(activePatternResult61216)[1].tail != null) {
            const activePatternResult61217 = BasicPatterns["|Call|_|"](getValue(activePatternResult61216)[1].head);

            if (activePatternResult61217 != null) {
              if (getValue(activePatternResult61217)[4].tail != null) {
                if (getValue(activePatternResult61217)[4].tail.tail != null) {
                  const activePatternResult61218 = BasicPatterns["|AddressOf|_|"](getValue(activePatternResult61217)[4].tail.head);

                  if (activePatternResult61218 != null) {
                    const activePatternResult61219 = BasicPatterns["|Value|_|"](getValue(activePatternResult61218));

                    if (activePatternResult61219 != null) {
                      if (getValue(activePatternResult61217)[4].tail.tail.tail == null) {
                        if (getValue(activePatternResult61216)[1].tail.tail != null) {
                          const activePatternResult61220 = BasicPatterns["|Value|_|"](getValue(activePatternResult61216)[1].tail.head);

                          if (activePatternResult61220 != null) {
                            if (getValue(activePatternResult61216)[1].tail.tail.tail == null) {
                              if (typArgs = getValue(activePatternResult61217)[2], outArg1 = getValue(activePatternResult61214)[0][0], methTypArgs = getValue(activePatternResult61217)[3], meth = getValue(activePatternResult61217)[1], def = getValue(activePatternResult61214)[0][1], callee = getValue(activePatternResult61217)[0], arg = getValue(activePatternResult61217)[4].head, equals(outArg1, getValue(activePatternResult61219)) ? equals(outArg1, getValue(activePatternResult61220)) : false) {
                                $var38 = [0, getValue(activePatternResult61217)[4].head, getValue(activePatternResult61217)[0], getValue(activePatternResult61214)[0][1], getValue(activePatternResult61217)[1], getValue(activePatternResult61217)[3], getValue(activePatternResult61214)[0][0], getValue(activePatternResult61219), getValue(activePatternResult61220), getValue(activePatternResult61217)[2]];
                              } else {
                                $var38 = [1];
                              }
                            } else {
                              $var38 = [1];
                            }
                          } else {
                            $var38 = [1];
                          }
                        } else {
                          $var38 = [1];
                        }
                      } else {
                        $var38 = [1];
                      }
                    } else {
                      $var38 = [1];
                    }
                  } else {
                    $var38 = [1];
                  }
                } else {
                  $var38 = [1];
                }
              } else {
                $var38 = [1];
              }
            } else {
              $var38 = [1];
            }
          } else {
            $var38 = [1];
          }
        } else {
          $var38 = [1];
        }
      } else {
        $var38 = [1];
      }
    } else {
      $var38 = [1];
    }

    switch ($var38[0]) {
      case 0:
        return [$var38[2], $var38[4], $var38[9], $var38[5], ofArray([$var38[1], $var38[3]])];

      case 1:
        return null;
    }
  };

  const _CreateEvent___ = __exports["|CreateEvent|_|"] = function (_arg1) {
    var typArgs;
    var removeEvent;
    var methTypArgs;
    var meth;
    var eventDelegate2;
    var eventDelegate;
    var delegateArg1;
    var delegateArg0;
    var createEvent;
    var callee2;
    var callee;
    var callback;
    var args;
    var addEvent;
    let $var39;
    const activePatternResult61222 = BasicPatterns["|Call|_|"](_arg1);

    if (activePatternResult61222 != null) {
      if (getValue(activePatternResult61222)[0] != null) {
        const activePatternResult61223 = BasicPatterns["|Call|_|"](getValue(getValue(activePatternResult61222)[0]));

        if (activePatternResult61223 != null) {
          if (getValue(activePatternResult61223)[0] == null) {
            if (getValue(activePatternResult61223)[4].tail != null) {
              const activePatternResult61224 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61223)[4].head);

              if (activePatternResult61224 != null) {
                const activePatternResult61225 = BasicPatterns["|Call|_|"](getValue(activePatternResult61224)[1]);

                if (activePatternResult61225 != null) {
                  if (getValue(activePatternResult61225)[0] != null) {
                    if (getValue(activePatternResult61225)[2].tail == null) {
                      if (getValue(activePatternResult61225)[3].tail == null) {
                        if (getValue(activePatternResult61225)[4].tail != null) {
                          const activePatternResult61226 = BasicPatterns["|Value|_|"](getValue(activePatternResult61225)[4].head);

                          if (activePatternResult61226 != null) {
                            if (getValue(activePatternResult61225)[4].tail.tail == null) {
                              if (getValue(activePatternResult61223)[4].tail.tail != null) {
                                const activePatternResult61227 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61223)[4].tail.head);

                                if (activePatternResult61227 != null) {
                                  const activePatternResult61228 = BasicPatterns["|Call|_|"](getValue(activePatternResult61227)[1]);

                                  if (activePatternResult61228 != null) {
                                    if (getValue(activePatternResult61228)[0] != null) {
                                      if (getValue(activePatternResult61228)[2].tail == null) {
                                        if (getValue(activePatternResult61228)[3].tail == null) {
                                          if (getValue(activePatternResult61228)[4].tail != null) {
                                            const activePatternResult61229 = BasicPatterns["|Value|_|"](getValue(activePatternResult61228)[4].head);

                                            if (activePatternResult61229 != null) {
                                              if (getValue(activePatternResult61228)[4].tail.tail == null) {
                                                if (getValue(activePatternResult61223)[4].tail.tail.tail != null) {
                                                  const activePatternResult61230 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61223)[4].tail.tail.head);

                                                  if (activePatternResult61230 != null) {
                                                    const activePatternResult61231 = BasicPatterns["|NewDelegate|_|"](getValue(activePatternResult61230)[1]);

                                                    if (activePatternResult61231 != null) {
                                                      const activePatternResult61232 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61231)[1]);

                                                      if (activePatternResult61232 != null) {
                                                        const activePatternResult61233 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult61232)[1]);

                                                        if (activePatternResult61233 != null) {
                                                          const activePatternResult61234 = BasicPatterns["|Application|_|"](getValue(activePatternResult61233)[1]);

                                                          if (activePatternResult61234 != null) {
                                                            const activePatternResult61235 = BasicPatterns["|Value|_|"](getValue(activePatternResult61234)[0]);

                                                            if (activePatternResult61235 != null) {
                                                              if (getValue(activePatternResult61234)[1].tail == null) {
                                                                if (getValue(activePatternResult61234)[2].tail != null) {
                                                                  const activePatternResult61236 = BasicPatterns["|Value|_|"](getValue(activePatternResult61234)[2].head);

                                                                  if (activePatternResult61236 != null) {
                                                                    if (getValue(activePatternResult61234)[2].tail.tail != null) {
                                                                      const activePatternResult61237 = BasicPatterns["|Value|_|"](getValue(activePatternResult61234)[2].tail.head);

                                                                      if (activePatternResult61237 != null) {
                                                                        if (getValue(activePatternResult61234)[2].tail.tail.tail == null) {
                                                                          if (getValue(activePatternResult61223)[4].tail.tail.tail.tail == null) {
                                                                            if (typArgs = getValue(activePatternResult61222)[2], removeEvent = getValue(activePatternResult61228)[1], methTypArgs = getValue(activePatternResult61222)[3], meth = getValue(activePatternResult61222)[1], eventDelegate2 = getValue(activePatternResult61227)[0], eventDelegate = getValue(activePatternResult61224)[0], delegateArg1 = getValue(activePatternResult61233)[0], delegateArg0 = getValue(activePatternResult61232)[0], createEvent = getValue(activePatternResult61223)[1], callee2 = getValue(getValue(activePatternResult61228)[0]), callee = getValue(getValue(activePatternResult61225)[0]), callback = getValue(activePatternResult61230)[0], args = getValue(activePatternResult61222)[4], addEvent = getValue(activePatternResult61225)[1], createEvent.FullName === "Microsoft.FSharp.Core.CompilerServices.RuntimeHelpers.CreateEvent") {
                                                                              $var39 = [0, getValue(activePatternResult61225)[1], getValue(activePatternResult61222)[4], getValue(activePatternResult61230)[0], getValue(activePatternResult61235), getValue(getValue(activePatternResult61225)[0]), getValue(getValue(activePatternResult61228)[0]), getValue(activePatternResult61223)[1], getValue(activePatternResult61232)[0], getValue(activePatternResult61236), getValue(activePatternResult61233)[0], getValue(activePatternResult61237), getValue(activePatternResult61224)[0], getValue(activePatternResult61226), getValue(activePatternResult61227)[0], getValue(activePatternResult61229), getValue(activePatternResult61222)[1], getValue(activePatternResult61222)[3], getValue(activePatternResult61228)[1], getValue(activePatternResult61222)[2]];
                                                                            } else {
                                                                              $var39 = [1];
                                                                            }
                                                                          } else {
                                                                            $var39 = [1];
                                                                          }
                                                                        } else {
                                                                          $var39 = [1];
                                                                        }
                                                                      } else {
                                                                        $var39 = [1];
                                                                      }
                                                                    } else {
                                                                      $var39 = [1];
                                                                    }
                                                                  } else {
                                                                    $var39 = [1];
                                                                  }
                                                                } else {
                                                                  $var39 = [1];
                                                                }
                                                              } else {
                                                                $var39 = [1];
                                                              }
                                                            } else {
                                                              $var39 = [1];
                                                            }
                                                          } else {
                                                            $var39 = [1];
                                                          }
                                                        } else {
                                                          $var39 = [1];
                                                        }
                                                      } else {
                                                        $var39 = [1];
                                                      }
                                                    } else {
                                                      $var39 = [1];
                                                    }
                                                  } else {
                                                    $var39 = [1];
                                                  }
                                                } else {
                                                  $var39 = [1];
                                                }
                                              } else {
                                                $var39 = [1];
                                              }
                                            } else {
                                              $var39 = [1];
                                            }
                                          } else {
                                            $var39 = [1];
                                          }
                                        } else {
                                          $var39 = [1];
                                        }
                                      } else {
                                        $var39 = [1];
                                      }
                                    } else {
                                      $var39 = [1];
                                    }
                                  } else {
                                    $var39 = [1];
                                  }
                                } else {
                                  $var39 = [1];
                                }
                              } else {
                                $var39 = [1];
                              }
                            } else {
                              $var39 = [1];
                            }
                          } else {
                            $var39 = [1];
                          }
                        } else {
                          $var39 = [1];
                        }
                      } else {
                        $var39 = [1];
                      }
                    } else {
                      $var39 = [1];
                    }
                  } else {
                    $var39 = [1];
                  }
                } else {
                  $var39 = [1];
                }
              } else {
                $var39 = [1];
              }
            } else {
              $var39 = [1];
            }
          } else {
            $var39 = [1];
          }
        } else {
          $var39 = [1];
        }
      } else {
        $var39 = [1];
      }
    } else {
      $var39 = [1];
    }

    switch ($var39[0]) {
      case 0:
        const eventName = replace($var39[1].CompiledName, "add_", "");
        return [$var39[5], eventName, $var39[16], $var39[19], $var39[17], $var39[2]];

      case 1:
        return null;
    }
  };

  const _CheckArrayLength___ = __exports["|CheckArrayLength|_|"] = function (_arg1) {
    let $var40;
    const activePatternResult61239 = BasicPatterns["|IfThenElse|_|"](_arg1);

    if (activePatternResult61239 != null) {
      const activePatternResult61240 = BasicPatterns["|ILAsm|_|"](getValue(activePatternResult61239)[0]);

      if (activePatternResult61240 != null) {
        if (getValue(activePatternResult61240)[0] === "[AI_ldnull; AI_cgt_un]") {
          if (getValue(activePatternResult61240)[1].tail == null) {
            if (getValue(activePatternResult61240)[2].tail != null) {
              if (getValue(activePatternResult61240)[2].tail.tail == null) {
                const activePatternResult61241 = BasicPatterns["|Call|_|"](getValue(activePatternResult61239)[1]);

                if (activePatternResult61241 != null) {
                  if (getValue(activePatternResult61241)[0] == null) {
                    if (getValue(activePatternResult61241)[2].tail == null) {
                      if (getValue(activePatternResult61241)[3].tail != null) {
                        if (getValue(activePatternResult61241)[3].tail.tail == null) {
                          if (getValue(activePatternResult61241)[4].tail != null) {
                            const activePatternResult61242 = BasicPatterns["|ILAsm|_|"](getValue(activePatternResult61241)[4].head);

                            if (activePatternResult61242 != null) {
                              if (getValue(activePatternResult61242)[0] === "[I_ldlen; AI_conv DT_I4]") {
                                if (getValue(activePatternResult61242)[1].tail == null) {
                                  if (getValue(activePatternResult61242)[2].tail != null) {
                                    if (getValue(activePatternResult61242)[2].tail.tail == null) {
                                      if (getValue(activePatternResult61241)[4].tail.tail != null) {
                                        const activePatternResult61243 = BasicPatterns["|Const|_|"](getValue(activePatternResult61241)[4].tail.head);

                                        if (activePatternResult61243 != null) {
                                          if (getValue(activePatternResult61241)[4].tail.tail.tail == null) {
                                            const activePatternResult61244 = BasicPatterns["|Const|_|"](getValue(activePatternResult61239)[2]);

                                            if (activePatternResult61244 != null) {
                                              $var40 = [0, getValue(activePatternResult61244)[0], getValue(activePatternResult61242)[2].head, getValue(activePatternResult61241)[1], getValue(activePatternResult61244)[1], getValue(activePatternResult61241)[3].head, getValue(activePatternResult61243)[1], getValue(activePatternResult61243)[0], getValue(activePatternResult61240)[2].head];
                                            } else {
                                              $var40 = [1];
                                            }
                                          } else {
                                            $var40 = [1];
                                          }
                                        } else {
                                          $var40 = [1];
                                        }
                                      } else {
                                        $var40 = [1];
                                      }
                                    } else {
                                      $var40 = [1];
                                    }
                                  } else {
                                    $var40 = [1];
                                  }
                                } else {
                                  $var40 = [1];
                                }
                              } else {
                                $var40 = [1];
                              }
                            } else {
                              $var40 = [1];
                            }
                          } else {
                            $var40 = [1];
                          }
                        } else {
                          $var40 = [1];
                        }
                      } else {
                        $var40 = [1];
                      }
                    } else {
                      $var40 = [1];
                    }
                  } else {
                    $var40 = [1];
                  }
                } else {
                  $var40 = [1];
                }
              } else {
                $var40 = [1];
              }
            } else {
              $var40 = [1];
            }
          } else {
            $var40 = [1];
          }
        } else {
          $var40 = [1];
        }
      } else {
        $var40 = [1];
      }
    } else {
      $var40 = [1];
    }

    switch ($var40[0]) {
      case 0:
        return [$var40[8], $var40[7], $var40[6]];

      case 1:
        return null;
    }
  };

  const _NumberKind___ = __exports["|NumberKind|_|"] = function (_arg1) {
    if (_arg1 === "System.SByte") {
      return new NumberKind(0);
    } else if (_arg1 === "System.Byte") {
      return new NumberKind(1);
    } else if (_arg1 === "System.Int16") {
      return new NumberKind(2);
    } else if (_arg1 === "System.UInt16") {
      return new NumberKind(3);
    } else if (_arg1 === "System.Int32") {
      return new NumberKind(4);
    } else if (_arg1 === "System.UInt32") {
      return new NumberKind(5);
    } else if (_arg1 === "System.Single") {
      return new NumberKind(6);
    } else if (_arg1 === "System.Double") {
      return new NumberKind(7);
    } else {
      const activePatternResult61255 = Naming["|StartsWith|_|"]("Microsoft.FSharp.Core.sbyte", _arg1);

      if (activePatternResult61255 != null) {
        return new NumberKind(0);
      } else {
        const activePatternResult61253 = Naming["|StartsWith|_|"]("Microsoft.FSharp.Core.int16", _arg1);

        if (activePatternResult61253 != null) {
          return new NumberKind(2);
        } else {
          const activePatternResult61251 = Naming["|StartsWith|_|"]("Microsoft.FSharp.Core.int", _arg1);

          if (activePatternResult61251 != null) {
            return new NumberKind(4);
          } else {
            const activePatternResult61249 = Naming["|StartsWith|_|"]("Microsoft.FSharp.Core.float32", _arg1);

            if (activePatternResult61249 != null) {
              return new NumberKind(6);
            } else {
              const activePatternResult61247 = Naming["|StartsWith|_|"]("Microsoft.FSharp.Core.float", _arg1);

              if (activePatternResult61247 != null) {
                return new NumberKind(7);
              } else {
                return null;
              }
            }
          }
        }
      }
    }
  };

  const _ExtendedNumberKind___ = __exports["|ExtendedNumberKind|_|"] = function (_arg1) {
    if (_arg1 === "System.Int64") {
      return new ExtendedNumberKind(0);
    } else if (_arg1 === "System.UInt64") {
      return new ExtendedNumberKind(1);
    } else if (_arg1 === "System.Decimal") {
      return new ExtendedNumberKind(2);
    } else if (_arg1 === "System.Numerics.BigInteger") {
      return new ExtendedNumberKind(3);
    } else {
      const activePatternResult61260 = Naming["|StartsWith|_|"]("Microsoft.FSharp.Core.int64", _arg1);

      if (activePatternResult61260 != null) {
        return new ExtendedNumberKind(0);
      } else {
        const activePatternResult61258 = Naming["|StartsWith|_|"]("Microsoft.FSharp.Core.decimal", _arg1);

        if (activePatternResult61258 != null) {
          return new ExtendedNumberKind(2);
        } else {
          return null;
        }
      }
    }
  };

  const _OptionUnion_ListUnion_ErasedUnion_StringEnum_PojoUnion_OtherType_ = __exports["|OptionUnion|ListUnion|ErasedUnion|StringEnum|PojoUnion|OtherType|"] = function (_arg1) {
    const activePatternResult61264 = Helpers.nonAbbreviatedType(_arg1);
    const matchValue = Helpers.tryDefinition(activePatternResult61264);

    if (matchValue != null) {
      const matchValue_1 = defaultArg(getValue(matchValue).TryFullName, getValue(matchValue).CompiledName);

      if (matchValue_1 === "Microsoft.FSharp.Core.FSharpOption`1") {
        return new Choice(0, null);
      } else if (matchValue_1 === "Microsoft.FSharp.Collections.FSharpList`1") {
        return new Choice(1, null);
      } else {
        return CurriedLambda(function (arg, defaultValue) {
          return arg != null ? arg : defaultValue;
        })(tryPick(function (name) {
          return name === Atts.erase ? new Choice(2, null) : name === Atts.stringEnum ? new Choice(3, null) : name === Atts.pojo ? new Choice(4, null) : null;
        }, choose(function (att) {
          return att.AttributeType.TryFullName;
        }, getValue(matchValue).Attributes)))(new Choice(5, null));
      }
    } else {
      return new Choice(5, null);
    }
  };

  const _Switch___ = __exports["|Switch|_|"] = function (fsExpr) {
    var size_1;
    var matchValue_8;
    var isUnionType_2;
    var defaultCase;
    var cases_1;

    const isStringOrNumber = function (_arg1) {
      const activePatternResult61267 = Helpers.nonAbbreviatedType(_arg1);

      if (!activePatternResult61267.HasTypeDefinition) {
        return false;
      } else {
        const matchValue = activePatternResult61267.TypeDefinition.TryFullName;
        let $var41;

        if (matchValue != null) {
          if (getValue(matchValue) === "System.String") {
            $var41 = [0];
          } else {
            const activePatternResult61266 = _NumberKind___(getValue(matchValue));

            if (activePatternResult61266 != null) {
              $var41 = [1, getValue(activePatternResult61266)];
            } else {
              $var41 = [2];
            }
          }
        } else {
          $var41 = [2];
        }

        switch ($var41[0]) {
          case 0:
            return true;

          case 1:
            return true;

          case 2:
            if (activePatternResult61267.TypeDefinition.IsEnum) {
              return true;
            } else {
              return false;
            }

        }
      }
    };

    const makeSwitch = function (isUnionType, size, map, matchValue_1, e) {
      return function (_arg2) {
        var cases;

        if (_arg2 == null) {
          return null;
        } else {
          const matchValue_2 = getValue(_arg2)[0];
          const isUnionType_1 = getValue(_arg2)[1];
          const idx = getValue(_arg2)[2] | 0;
          const elseExpr = getValue(_arg2)[5];
          const _case = getValue(_arg2)[4];
          const bindings = getValue(_arg2)[3];
          let map_1;
          const matchValue_3 = tryFind(idx, map);
          const $var42 = matchValue_3 != null ? getValue(matchValue_3)[0].tail == null ? (cases = getValue(matchValue_3)[1], bindings.tail == null) ? [1, getValue(matchValue_3)[1]] : [2] : [2] : [0];

          switch ($var42[0]) {
            case 0:
              map_1 = add(idx, [bindings, ofArray([_case])], map);
              break;

            case 1:
              map_1 = add(idx, [bindings, append($var42[1], ofArray([_case]))], map);
              break;

            case 2:
              if (matchValue_3 != null) {
                map_1 = null;
              } else {
                throw new Error("C:/projects/fable/src/dotnet/Fable.Compiler/FSharp2Fable.Util.fs", 678, 30);
              }

              break;
          }

          const matchValue_4 = [map_1, elseExpr];
          let $var43;

          if (matchValue_4[0] != null) {
            const activePatternResult61284 = BasicPatterns["|DecisionTreeSuccess|_|"](matchValue_4[1]);

            if (activePatternResult61284 != null) {
              $var43 = [0, getValue(activePatternResult61284)[1], getValue(activePatternResult61284)[0], getValue(matchValue_4[0])];
            } else {
              $var43 = [1];
            }
          } else {
            $var43 = [1];
          }

          switch ($var43[0]) {
            case 0:
              return [matchValue_2, isUnionType_1, size + 1, $var43[3], [$var43[2], $var43[1]]];

            case 1:
              if (matchValue_4[0] == null) {
                return null;
              } else {
                const map_2 = getValue(matchValue_4[0]);
                return makeSwitch(isUnionType_1, size + 1, map_2, matchValue_2, matchValue_4[1]);
              }

          }
        }
      }((() => {
        var op_Equality;
        var idx_1;
        var elseExpr_1;

        var _case_5;

        var bindings_1;
        var matchValue_6;

        var _case_3;

        var _case_2;

        let $var44;
        const activePatternResult61277 = BasicPatterns["|IfThenElse|_|"](e);

        if (activePatternResult61277 != null) {
          const activePatternResult61278 = BasicPatterns["|Call|_|"](getValue(activePatternResult61277)[0]);

          if (activePatternResult61278 != null) {
            if (getValue(activePatternResult61278)[0] == null) {
              if (getValue(activePatternResult61278)[2].tail == null) {
                if (getValue(activePatternResult61278)[4].tail != null) {
                  const activePatternResult61279 = BasicPatterns["|Value|_|"](getValue(activePatternResult61278)[4].head);

                  if (activePatternResult61279 != null) {
                    if (getValue(activePatternResult61278)[4].tail.tail != null) {
                      const activePatternResult61280 = BasicPatterns["|Const|_|"](getValue(activePatternResult61278)[4].tail.head);

                      if (activePatternResult61280 != null) {
                        if (getValue(activePatternResult61278)[4].tail.tail.tail == null) {
                          const activePatternResult61281 = BasicPatterns["|DecisionTreeSuccess|_|"](getValue(activePatternResult61277)[1]);

                          if (activePatternResult61281 != null) {
                            if (op_Equality = getValue(activePatternResult61278)[1], idx_1 = getValue(activePatternResult61281)[0] | 0, elseExpr_1 = getValue(activePatternResult61277)[2], _case_5 = getValue(activePatternResult61280)[0], bindings_1 = getValue(activePatternResult61281)[1], op_Equality.CompiledName === "op_Equality") {
                              $var44 = [0, getValue(activePatternResult61281)[1], getValue(activePatternResult61280)[0], getValue(activePatternResult61277)[2], getValue(activePatternResult61281)[0], getValue(activePatternResult61278)[1], getValue(activePatternResult61279)];
                            } else {
                              $var44 = [1];
                            }
                          } else {
                            $var44 = [1];
                          }
                        } else {
                          $var44 = [1];
                        }
                      } else {
                        $var44 = [1];
                      }
                    } else {
                      $var44 = [1];
                    }
                  } else {
                    $var44 = [1];
                  }
                } else {
                  $var44 = [1];
                }
              } else {
                $var44 = [1];
              }
            } else {
              $var44 = [1];
            }
          } else {
            $var44 = [1];
          }
        } else {
          $var44 = [1];
        }

        switch ($var44[0]) {
          case 0:
            const _case_1 = typeof $var44[2] === "number" ? new Choice(0, $var44[2]) : typeof $var44[2] === "string" ? new Choice(1, $var44[2]) : null;

            const matchValue_5 = [_case_1, matchValue_1];
            const $var45 = matchValue_5[0] != null ? matchValue_5[1] != null ? (matchValue_6 = getValue(matchValue_5[1]), _case_3 = getValue(matchValue_5[0]), equals(matchValue_6, $var44[6])) ? [0, getValue(matchValue_5[0]), getValue(matchValue_5[1])] : [1] : [1] : [1];

            switch ($var45[0]) {
              case 0:
                return [$var45[2], false, $var44[4], $var44[1], $var45[1], $var44[3]];

              case 1:
                const $var46 = matchValue_5[0] != null ? matchValue_5[1] == null ? (_case_2 = getValue(matchValue_5[0]), (isStringOrNumber($var44[6].FullType) ? !$var44[6].IsMemberThisValue : false) ? !Helpers.isInline($var44[6]) : false) ? [0, getValue(matchValue_5[0])] : [1] : [1] : [1];

                switch ($var46[0]) {
                  case 0:
                    return [$var44[6], false, $var44[4], $var44[1], $var46[1], $var44[3]];

                  case 1:
                    return null;
                }

            }

          case 1:
            let $var47;
            const activePatternResult61273 = BasicPatterns["|IfThenElse|_|"](e);

            if (activePatternResult61273 != null) {
              const activePatternResult61274 = BasicPatterns["|UnionCaseTest|_|"](getValue(activePatternResult61273)[0]);

              if (activePatternResult61274 != null) {
                const activePatternResult61275 = BasicPatterns["|Value|_|"](getValue(activePatternResult61274)[0]);

                if (activePatternResult61275 != null) {
                  const activePatternResult61276 = BasicPatterns["|DecisionTreeSuccess|_|"](getValue(activePatternResult61273)[1]);

                  if (activePatternResult61276 != null) {
                    $var47 = [0, getValue(activePatternResult61276)[1], getValue(activePatternResult61274)[2], getValue(activePatternResult61273)[2], getValue(activePatternResult61276)[0], getValue(activePatternResult61274)[1], getValue(activePatternResult61275)];
                  } else {
                    $var47 = [1];
                  }
                } else {
                  $var47 = [1];
                }
              } else {
                $var47 = [1];
              }
            } else {
              $var47 = [1];
            }

            switch ($var47[0]) {
              case 0:
                const _case_4 = new Choice(0, Helpers.getUnionCaseIndex($var47[5], $var47[2].Name));

                const $var48 = matchValue_1 != null ? equals(getValue(matchValue_1), $var47[6]) ? [0, getValue(matchValue_1)] : [1] : [1];

                switch ($var48[0]) {
                  case 0:
                    return [$var48[1], true, $var47[4], $var47[1], _case_4, $var47[3]];

                  case 1:
                    const $var49 = matchValue_1 == null ? (!$var47[6].IsMemberThisValue ? !Helpers.isInline($var47[6]) : false) ? [0] : [1] : [1];

                    switch ($var49[0]) {
                      case 0:
                        let $var50;

                        const activePatternResult61272 = _OptionUnion_ListUnion_ErasedUnion_StringEnum_PojoUnion_OtherType_($var47[5]);

                        if (activePatternResult61272.tag === 1) {
                          $var50 = [0];
                        } else if (activePatternResult61272.tag === 2) {
                          $var50 = [0];
                        } else if (activePatternResult61272.tag === 3) {
                          $var50 = [0];
                        } else if (activePatternResult61272.tag === 4) {
                          $var50 = [0];
                        } else if (activePatternResult61272.tag === 5) {
                          $var50 = [1];
                        } else {
                          $var50 = [0];
                        }

                        switch ($var50[0]) {
                          case 0:
                            return null;

                          case 1:
                            return [$var47[6], true, $var47[4], $var47[1], _case_4, $var47[3]];
                        }

                      case 1:
                        return null;
                    }

                }

              case 1:
                return null;
            }

        }
      })());
    };

    const activePatternResult61291 = BasicPatterns["|DecisionTree|_|"](fsExpr);

    if (activePatternResult61291 != null) {
      const matchValue_7 = makeSwitch(false, 0, create(null, new Comparer(comparePrimitives)), null, getValue(activePatternResult61291)[0]);
      const $var51 = matchValue_7 != null ? (size_1 = getValue(matchValue_7)[2] | 0, matchValue_8 = getValue(matchValue_7)[0], isUnionType_2 = getValue(matchValue_7)[1], defaultCase = getValue(matchValue_7)[4], cases_1 = getValue(matchValue_7)[3], size_1 > 3) ? [0, getValue(matchValue_7)[3], getValue(matchValue_7)[4], getValue(matchValue_7)[1], getValue(matchValue_7)[0], getValue(matchValue_7)[2]] : [1] : [1];

      switch ($var51[0]) {
        case 0:
          return [$var51[4], $var51[3], $var51[1], $var51[2], getValue(activePatternResult61291)[1]];

        case 1:
          return null;
      }
    } else {
      return null;
    }
  };

  const _ContainsAtt___ = __exports["|ContainsAtt|_|"] = function (name, atts) {
    return defaultArg(Helpers.tryFindAtt(function (y) {
      return name === y;
    }, atts), null, function (att) {
      return toList(map_4(function (tuple) {
        return tuple[1];
      }, att.ConstructorArguments));
    });
  };

  return __exports;
}({});
export const Types = function (__exports) {
  const isAttributeEntity = __exports.isAttributeEntity = function (ent) {
    isAttributeEntity: while (true) {
      const matchValue = ent.BaseType;
      let $var52;

      if (matchValue != null) {
        const activePatternResult61298 = Helpers.nonAbbreviatedType(getValue(matchValue));

        if (activePatternResult61298.HasTypeDefinition) {
          $var52 = [0, activePatternResult61298];
        } else {
          $var52 = [1];
        }
      } else {
        $var52 = [1];
      }

      switch ($var52[0]) {
        case 0:
          const matchValue_1 = $var52[1].TypeDefinition.TryFullName;
          const $var53 = matchValue_1 != null ? getValue(matchValue_1) === "System.Attribute" ? [0] : [1] : [1];

          switch ($var53[0]) {
            case 0:
              return true;

            case 1:
              ent = $var52[1].TypeDefinition;
              continue isAttributeEntity;
          }

        case 1:
          return false;
      }
    }
  };

  const makeDecorator = __exports.makeDecorator = function (com, att) {
    try {
      const args = toList(map_4(function (tuple) {
        return tuple[1];
      }, att.ConstructorArguments));
      let fullName_1;
      const fullName = Helpers.sanitizeEntityFullName(att.AttributeType);

      if (endsWith(fullName, "Attribute")) {
        fullName_1 = fullName.substr(0, fullName.length - 9);
      } else {
        fullName_1 = fullName;
      }

      return new Decorator(0, [fullName_1, args]);
    } catch (matchValue) {
      return null;
    }
  };

  const getFunctionGenericArgs = __exports.getFunctionGenericArgs = function (acc, typeArgs, isFunctionType, typ) {
    getFunctionGenericArgs: while (true) {
      if (isFunctionType) {
        const genArg0 = Helpers.nonAbbreviatedType(typ.GenericArguments[0]);
        const genArg1 = Helpers.nonAbbreviatedType(typ.GenericArguments[1]);
        acc = new List(genArg0, acc);
        typeArgs = typeArgs;
        isFunctionType = genArg1.IsFunctionType;
        typ = genArg1;
        continue getFunctionGenericArgs;
      } else if (typ.IsGenericParameter) {
        return function (_arg1) {
          var typ2;
          const $var54 = _arg1 != null ? (typ2 = getValue(_arg1)[1], typ2.IsFunctionType) ? [0, getValue(_arg1)[1]] : [1] : [1];

          switch ($var54[0]) {
            case 0:
              return getFunctionGenericArgs(new List(), typeArgs, true, $var54[1]);

            case 1:
              return new List(typ, acc);
          }
        }(tryFind_1(function (tupledArg) {
          return tupledArg[0] === typ.GenericParameter.Name;
        }, typeArgs));
      } else {
        return new List(typ, acc);
      }
    }
  };

  const makeTypeFromDef = __exports.makeTypeFromDef = function (com, typeArgs, tdef, genArgs) {
    var matchValue;
    const tdef_1 = Helpers.nonAbbreviatedEntity(tdef);
    const fullName = Helpers.getEntityFullName(tdef_1);

    if (tdef_1.IsArrayType) {
      return new Type(9, function (arg20_) {
        return makeType(com, typeArgs, arg20_);
      }(head(genArgs)));
    } else if (tdef_1.IsEnum) {
      return new Type(13, fullName);
    } else if (tdef_1.IsDelegate) {
      if (fullName.indexOf("System.Action") === 0) {
        return function (tupledArg) {
          return new Type(11, [tupledArg[0], tupledArg[1], tupledArg[2]]);
        }(count(genArgs) === 1 ? [ofArray([function (arg20__1) {
          return makeType(com, typeArgs, arg20__1);
        }(head(genArgs))]), new Type(2), false] : [ofArray([new Type(2)]), new Type(2), false]);
      } else if (fullName.indexOf("System.Func") === 0) {
        return function (tupledArg_1) {
          return new Type(11, [tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]]);
        }((matchValue = count(genArgs) | 0, matchValue === 0 ? [ofArray([new Type(2)]), new Type(2), false] : matchValue === 1 ? [ofArray([new Type(2)]), function (arg20__2) {
          return makeType(com, typeArgs, arg20__2);
        }(head(genArgs)), false] : [toList(map_4(function (arg20__3) {
          return makeType(com, typeArgs, arg20__3);
        }, take(matchValue - 1, genArgs))), function (arg20__4) {
          return makeType(com, typeArgs, arg20__4);
        }(last(genArgs)), false]));
      } else {
        try {
          const argTypes = toList(map_4($var55 => function (arg20__5) {
            return makeType(com, typeArgs, arg20__5);
          }(function (tuple) {
            return tuple[1];
          }($var55)), tdef_1.FSharpDelegateSignature.DelegateArguments));
          const retType = makeType(com, typeArgs, tdef_1.FSharpDelegateSignature.DelegateReturnType);
          return new Type(11, [argTypes, retType, false]);
        } catch (matchValue_1) {
          return new Type(11, [ofArray([new Type(1)]), new Type(1), false]);
        }
      }
    } else if (fullName === "System.Object") {
      return new Type(1);
    } else {
      let $var56;

      if (fullName === "System.Boolean") {
        $var56 = [0];
      } else if (fullName === "System.Char") {
        $var56 = [1];
      } else if (fullName === "System.String") {
        $var56 = [2];
      } else if (fullName === "System.Guid") {
        $var56 = [2];
      } else if (fullName === "Microsoft.FSharp.Core.Unit") {
        $var56 = [3];
      } else if (fullName === "Microsoft.FSharp.Core.FSharpOption`1") {
        $var56 = [4];
      } else if (fullName === "System.Collections.Generic.List`1") {
        $var56 = [5];
      } else {
        const activePatternResult61320 = Patterns["|NumberKind|_|"](fullName);

        if (activePatternResult61320 != null) {
          $var56 = [6, getValue(activePatternResult61320)];
        } else {
          $var56 = [7];
        }
      }

      switch ($var56[0]) {
        case 0:
          return new Type(3);

        case 1:
          return new Type(4);

        case 2:
          return new Type(5);

        case 3:
          return new Type(2);

        case 4:
          const t = defaultArg(tryHead(genArgs), null, function (arg20__6) {
            return makeType(com, typeArgs, arg20__6);
          });
          return new Type(8, t != null ? t : new Type(1));

        case 5:
          const t_1 = defaultArg(tryHead(genArgs), null, function (arg20__7) {
            return makeType(com, typeArgs, arg20__7);
          });
          return new Type(9, t_1 != null ? t_1 : new Type(1));

        case 6:
          return new Type(6, $var56[1]);

        case 7:
          const activePatternResult61319 = Patterns["|ExtendedNumberKind|_|"](fullName);

          if (activePatternResult61319 != null) {
            return new Type(7, getValue(activePatternResult61319));
          } else {
            return CurriedLambda(function (arg, defaultValue) {
              return arg != null ? arg : defaultValue;
            })(tryPick(function (name) {
              return name === Atts.stringEnum ? new Type(5) : (name === Atts.erase ? true : name === Atts.pojo) ? new Type(1) : null;
            }, choose(function (att) {
              return att.AttributeType.TryFullName;
            }, tdef_1.Attributes)))(new Type(14, [com.GetEntity(tdef_1), toList(map_4(function (arg20__8) {
              return makeType(com, typeArgs, arg20__8);
            }, genArgs))]));
          }

      }
    }
  };

  const makeType = __exports.makeType = function (com, typeArgs, _arg1) {
    const activePatternResult61329 = Helpers.nonAbbreviatedType(_arg1);

    const makeGenArgs = function (genArgs) {
      return toList(map_4(function (arg20_) {
        return makeType(com, typeArgs, arg20_);
      }, genArgs));
    };

    const resolveGenParam = function (genParam) {
      const matchValue = tryFind_1(function (tupledArg) {
        return tupledArg[0] === genParam.Name;
      }, typeArgs);

      if (matchValue == null) {
        return new Type(12, genParam.Name);
      } else {
        const typ = getValue(matchValue)[1];
        return makeType(com, new List(), typ);
      }
    };

    if (activePatternResult61329.IsGenericParameter) {
      return resolveGenParam(activePatternResult61329.GenericParameter);
    } else if (activePatternResult61329.IsTupleType) {
      return new Type(10, makeGenArgs(activePatternResult61329.GenericArguments));
    } else if (activePatternResult61329.IsFunctionType) {
      const gs = getFunctionGenericArgs(new List(), typeArgs, true, activePatternResult61329);
      const argTypes = map_3(function (arg20__1) {
        return makeType(com, typeArgs, arg20__1);
      }, reverse(gs.tail));
      const returnType = makeType(com, typeArgs, gs.head);
      return new Type(11, [argTypes, returnType, true]);
    } else if (activePatternResult61329.HasTypeDefinition) {
      return makeTypeFromDef(com, typeArgs, activePatternResult61329.TypeDefinition, activePatternResult61329.GenericArguments);
    } else {
      return new Type(1);
    }
  };

  const getBaseClass = __exports.getBaseClass = function (com, tdef) {
    const matchValue = tdef.BaseType;
    let $var57;

    if (matchValue != null) {
      const activePatternResult61333 = Patterns["|TypeDefinition|_|"](getValue(matchValue));

      if (activePatternResult61333 != null) {
        if (!equals(getValue(activePatternResult61333).TryFullName, "System.Object")) {
          $var57 = [0, getValue(activePatternResult61333)];
        } else {
          $var57 = [1];
        }
      } else {
        $var57 = [1];
      }
    } else {
      $var57 = [1];
    }

    switch ($var57[0]) {
      case 0:
        const typeRef = function (typ) {
          return makeNonGenTypeRef(com, typ);
        }(makeTypeFromDef(com, new List(), $var57[1], new List()));

        return [Helpers.sanitizeEntityFullName($var57[1]), typeRef];

      case 1:
        return null;
    }
  };

  const getOwnAndInheritedFsharpMembers = __exports.getOwnAndInheritedFsharpMembers = function (tdef) {
    return delay(function () {
      return append_1(Extensions["FSharpEntity.get_TryGetMembersFunctionsAndValues"].bind(tdef)(), delay(function () {
        const matchValue = tdef.BaseType;
        let $var58;

        if (matchValue != null) {
          const activePatternResult61336 = Patterns["|TypeDefinition|_|"](getValue(matchValue));

          if (activePatternResult61336 != null) {
            if (!equals(tdef.TryFullName, "System.Object")) {
              $var58 = [0, getValue(activePatternResult61336)];
            } else {
              $var58 = [1];
            }
          } else {
            $var58 = [1];
          }
        } else {
          $var58 = [1];
        }

        switch ($var58[0]) {
          case 0:
            return getOwnAndInheritedFsharpMembers($var58[1]);

          case 1:
            return empty();
        }
      }));
    });
  };

  const makeMethodFrom = __exports.makeMethodFrom = function (com, name, kind, loc, argTypes, returnType, originalTyp, overloadIndex, meth) {
    return new Member(name, kind, loc, argTypes, returnType, originalTyp, toList(map_4(function (x) {
      return x.Name;
    }, meth.GenericParameters)), toList(choose(function (att) {
      return makeDecorator(com, att);
    }, meth.Attributes)), meth.IsMutable, null, Helpers.hasRestParams(meth), overloadIndex);
  };

  const getArgTypes = __exports.getArgTypes = function (com, args) {
    return toList(map_4(function (x) {
      return makeType(com, new List(), x.Type);
    }, concat(args)));
  };

  const makeOriginalCurriedType = __exports.makeOriginalCurriedType = function (com, args, returnType) {
    const tys = map_4(function (tuple) {
      const tuple_1 = map_4(function (t) {
        return makeType(com, new List(), t.Type);
      }, tuple);
      const matchValue = toList(tuple_1);
      const $var59 = matchValue.tail != null ? matchValue.tail.tail == null ? [0, matchValue.head] : [1, matchValue] : [1, matchValue];

      switch ($var59[0]) {
        case 0:
          return $var59[1];

        case 1:
          return new Type(10, $var59[1]);
      }
    }, args);
    return reduceBack(function (a, b) {
      return new Type(11, [ofArray([a]), b, true]);
    }, append_1(tys, ofArray([returnType])));
  };

  const getMembers = __exports.getMembers = function (com, tdef) {
    const isAbstract = Helpers.hasAtt(Atts.abstractClass, tdef.Attributes);

    const isDefaultImplementation = function (x) {
      if (isAbstract ? x.IsOverrideOrExplicitInterfaceImplementation : false) {
        return !x.IsExplicitInterfaceImplementation;
      } else {
        return false;
      }
    };

    const isFakeAbstractMethod = function (x_1) {
      if (!isAbstract ? !tdef.IsInterface : false) {
        return x_1.IsDispatchSlot;
      } else {
        return false;
      }
    };

    const existsInterfaceMember = function (name) {
      return exists(function (ifc) {
        return !ifc.HasTypeDefinition ? false : exists(function (m) {
          return m.DisplayName === name;
        }, Extensions["FSharpEntity.get_TryGetMembersFunctionsAndValues"].bind(ifc.TypeDefinition)());
      }, tdef.AllInterfaces);
    };

    const members = Array.from(map_4(function (meth) {
      return [Helpers.sanitizeMethodName(meth), Helpers.getMemberKind(meth), Helpers.getMemberLoc(meth), meth];
    }, filter(function (x_2) {
      return (!isDefaultImplementation(x_2) ? !(x_2.IsProperty ? !(x_2.IsPropertyGetterMethod ? true : x_2.IsPropertySetterMethod) : false) : false) ? !isFakeAbstractMethod(x_2) : false;
    }, Extensions["FSharpEntity.get_TryGetMembersFunctionsAndValues"].bind(tdef)())));

    const getMembers_ = function (loc, tdef_1) {
      return toList(collect(function (tupledArg) {
        const activePatternResult61371 = Array.from(tupledArg[1]);
        const isOverloaded = tdef_1.IsInterface ? false : loc.tag === 0 ? activePatternResult61371.length > 1 ? true : existsInterfaceMember(tupledArg[0][0]) : loc.tag === 1 ? activePatternResult61371.length > 1 : false;
        return mapIndexed(function (i, tupledArg_1) {
          const argTypes = getArgTypes(com, tupledArg_1[3].CurriedParameterGroups);
          const returnType = makeType(com, new List(), tupledArg_1[3].ReturnParameter.Type);
          const originalTyp = makeOriginalCurriedType(com, tupledArg_1[3].CurriedParameterGroups, returnType);
          const overloadIndex = isOverloaded ? i : null;
          return makeMethodFrom(com, tupledArg[0][0], tupledArg[0][1], tupledArg_1[2], argTypes, returnType, originalTyp, overloadIndex, tupledArg_1[3]);
        }, activePatternResult61371, Array);
      }, groupBy(function (tupledArg_2) {
        return [tupledArg_2[0], tupledArg_2[1]];
      }, filter(function (tupledArg_3) {
        return Helpers.sameMemberLoc(loc, tupledArg_3[2]);
      }, members))));
    };

    const instanceMembers = getMembers_(new MemberLoc(0), tdef);
    const staticMembers = getMembers_(new MemberLoc(1), tdef);
    const interfaceMembers = getMembers_(new MemberLoc(2, ""), tdef);
    return append(instanceMembers, append(interfaceMembers, staticMembers));
  };

  const makeEntity = __exports.makeEntity = function (com, tdef) {
    const makeFields = function (tdef_1) {
      return toList(map_4(function (x) {
        return [x.Name, makeType(com, new List(), x.FieldType)];
      }, tdef_1.FSharpFields));
    };

    const makeProperties = function (tdef_2) {
      return toList(choose(function (x_1) {
        if (!x_1.IsPropertyGetterMethod ? true : x_1.IsExplicitInterfaceImplementation) {
          return null;
        } else {
          const matchValue = makeType(com, new List(), x_1.FullType);

          if (matchValue.tag === 11) {
            return [x_1.DisplayName, matchValue.data[1]];
          } else {
            return null;
          }
        }
      }, Extensions["FSharpEntity.get_TryGetMembersFunctionsAndValues"].bind(tdef_2)()));
    };

    const makeCases = function (tdef_3) {
      return toList(map_4(function (uci) {
        const name = function (_arg1) {
          return _arg1 == null ? uci.Name : toString(getValue(_arg1).ConstructorArguments[0][1]);
        }(Helpers.tryFindAtt(function (y) {
          return Atts.compiledName === y;
        }, uci.Attributes));

        return [name, toList(delay(function () {
          return map_4(function (fi) {
            return makeType(com, new List(), fi.FieldType);
          }, uci.UnionCaseFields);
        }))];
      }, tdef_3.UnionCases));
    };

    const getKind = function () {
      return tdef.IsInterface ? new EntityKind(5) : tdef.IsFSharpUnion ? new EntityKind(1, makeCases(tdef)) : (tdef.IsFSharpRecord ? true : tdef.IsValueType) ? new EntityKind(2, makeFields(tdef)) : tdef.IsFSharpExceptionDeclaration ? new EntityKind(3, makeFields(tdef)) : (tdef.IsFSharpModule ? true : tdef.IsNamespace) ? new EntityKind(0) : new EntityKind(4, [getBaseClass(com, tdef), makeProperties(tdef)]);
    };

    const genParams = toList(map_4(function (x_2) {
      return x_2.Name;
    }, tdef.GenericParameters));
    const infcs = toList(distinct(filter($var60 => function (value) {
      return !value;
    }(function (arg00) {
      return Naming.ignoredInterfaces.has(arg00);
    }($var60)), map_4(function (x_3) {
      return Helpers.sanitizeEntityFullName(x_3.TypeDefinition);
    }, tdef.DeclaredInterfaces))));
    const decs = toList(choose(function (att) {
      return makeDecorator(com, att);
    }, tdef.Attributes));
    return new Entity(new Lazy(function () {
      return getKind();
    }), com.TryGetInternalFile(tdef), Helpers.sanitizeEntityFullName(tdef), new Lazy(function () {
      return getMembers(com, tdef);
    }), genParams, infcs, decs);
  };

  return __exports;
}({});
export const Identifiers = function (__exports) {
  const bindExpr = __exports.bindExpr = function (ctx, fsRef, expr) {
    const scope = new List([fsRef, expr], ctx.scope);
    return new Context(ctx.fileName, ctx.enclosingModule, scope, ctx.scopedInlines, ctx.varNames, ctx.typeArgs, ctx.decisionTargets, ctx.thisAvailability, ctx.genericAvailability, ctx.isDynamicCurriedLambda, ctx.caughtException);
  };

  const bindIdentPrivate = function (com, ctx, typ, fsRef, force, name) {
    var scope;
    const sanitizedName = Naming.sanitizeIdent(function (x) {
      return !force ? ctx.varNames.has(x) : false;
    }, name);
    addInPlace(sanitizedName, ctx.varNames);
    com.AddUsedVarName(sanitizedName);
    const ident = new Ident(sanitizedName, typ);
    const identValue = new Expr(0, new ValueKind(5, ident));
    return [(scope = new List([fsRef, identValue], ctx.scope), new Context(ctx.fileName, ctx.enclosingModule, scope, ctx.scopedInlines, ctx.varNames, ctx.typeArgs, ctx.decisionTargets, ctx.thisAvailability, ctx.genericAvailability, ctx.isDynamicCurriedLambda, ctx.caughtException)), ident];
  };

  const bindIdentWithExactName = __exports.bindIdentWithExactName = function (com, ctx, typ, fsRef, name) {
    return bindIdentPrivate(com, ctx, typ, fsRef, true, name);
  };

  const bindIdent = __exports.bindIdent = function (com, ctx, typ, fsRef, tentativeName) {
    return bindIdentPrivate(com, ctx, typ, fsRef, false, tentativeName);
  };

  const bindIdentFrom = __exports.bindIdentFrom = function (com, ctx, fsRef) {
    return bindIdent(com, ctx, Types.makeType(com, ctx.typeArgs, fsRef.FullType), fsRef, fsRef.CompiledName);
  };

  const _BindIdent_ = __exports["|BindIdent|"] = CurriedLambda(function (com, ctx, fsRef) {
    return bindIdentFrom(com, ctx, fsRef);
  });

  const tryGetBoundExpr = __exports.tryGetBoundExpr = function (ctx, r, fsRef) {
    return function (_arg2) {
      if (_arg2 == null) {
        return null;
      } else {
        const boundExpr = getValue(_arg2)[1];
        return boundExpr;
      }
    }(tryFind_1($var61 => function (_arg1) {
      return _arg1 == null ? false : equals(fsRef, getValue(_arg1));
    }(function (tuple) {
      return tuple[0];
    }($var61)), ctx.scope));
  };

  return __exports;
}({});
export const Util = function (__exports) {
  const validateGenArgs = __exports.validateGenArgs = function (com, ctx, r, genParams, typArgs) {
    const fail = function (typName, genName) {
      const typName_1 = typName != null ? typName : "";

      (function (warning) {
        addError(com, ctx.fileName, r, warning);
      })(toText(printf("Type %s passed as generic param '%s must be decorated with %s or be `obj`/interface"))(typName_1, genName, Atts.pojo));
    };

    if (count(genParams) === count(typArgs)) {
      iterate(function (tupledArg) {
        if (Helpers.hasAtt(Atts.pojo, tupledArg[0].Attributes)) {
          const matchValue = Helpers.tryDefinition(tupledArg[1]);
          const $var62 = matchValue != null ? getValue(matchValue).IsInterface ? [0, getValue(matchValue)] : [1] : [1];

          switch ($var62[0]) {
            case 0:
              break;

            case 1:
              const $var63 = matchValue != null ? equals(getValue(matchValue).TryFullName, "System.Object") ? [0, getValue(matchValue)] : [1] : [1];

              switch ($var63[0]) {
                case 0:
                  break;

                case 1:
                  const $var64 = matchValue != null ? Helpers.hasAtt(Atts.pojo, getValue(matchValue).Attributes) ? [0, getValue(matchValue)] : [1] : [1];

                  switch ($var64[0]) {
                    case 0:
                      break;

                    case 1:
                      const $var65 = matchValue == null ? (tupledArg[1].IsGenericParameter ? Helpers.hasAtt(Atts.pojo, tupledArg[1].GenericParameter.Attributes) : false) ? [0] : [1] : [1];

                      switch ($var65[0]) {
                        case 0:
                          break;

                        case 1:
                          if (matchValue == null) {
                            fail(null, tupledArg[0].Name);
                          } else {
                            fail(getValue(matchValue).DisplayName, tupledArg[0].Name);
                          }

                          break;
                      }

                      break;
                  }

                  break;
              }

              break;
          }
        }
      }, zip(genParams, typArgs));
    }
  };

  const countRefs = __exports.countRefs = function (fsExpr, vars) {
    const varsDic = new Map();

    for (let _var of vars) {
      varsDic.set(_var, 0);
    }

    const countRefs_1 = function (_arg1) {
      let $var66;
      const activePatternResult61443 = BasicPatterns["|Value|_|"](_arg1);

      if (activePatternResult61443 != null) {
        if (!getValue(activePatternResult61443).IsModuleValueOrMember) {
          $var66 = [0, getValue(activePatternResult61443)];
        } else {
          $var66 = [1];
        }
      } else {
        $var66 = [1];
      }

      switch ($var66[0]) {
        case 0:
          const matchValue = tryGetValue(varsDic, $var66[1], 0);

          if (matchValue[0]) {
            varsDic.set($var66[1], matchValue[1] + 1);
          }

          break;

        case 1:
          iterate(countRefs_1, _arg1.ImmediateSubExpressions);
          break;
      }
    };

    countRefs_1(fsExpr);
    return varsDic;
  };

  const makeLambdaArgs = __exports.makeLambdaArgs = function (com, ctx, vars) {
    const patternInput_1 = fold(function (tupledArg, _var) {
      const patternInput = Identifiers.bindIdentFrom(com, tupledArg[0], _var);
      return [patternInput[0], new List(patternInput[1], tupledArg[1])];
    }, [ctx, new List()], vars);
    return [patternInput_1[0], reverse(patternInput_1[1])];
  };

  const bindMemberArgs = __exports.bindMemberArgs = function (com, ctx, info, args) {
    var thisArg;
    let ctx_1;
    const varNames = new Set(ctx.varNames);
    ctx_1 = new Context(ctx.fileName, ctx.enclosingModule, ctx.scope, ctx.scopedInlines, varNames, ctx.typeArgs, ctx.decisionTargets, ctx.thisAvailability, ctx.genericAvailability, ctx.isDynamicCurriedLambda, ctx.caughtException);
    let patternInput;
    const $var67 = args.tail != null ? args.head.tail != null ? args.head.tail.tail == null ? (thisArg = args.head.head, info.isInstance) ? [0, args.tail, args.head.head] : [1] : [1] : [1] : [1];

    switch ($var67[0]) {
      case 0:
        patternInput = [$var67[2], $var67[1]];
        break;

      case 1:
        patternInput = [null, args];
        break;
    }

    return function (tupledArg) {
      return info.passGenerics ? [new Context(tupledArg[0].fileName, tupledArg[0].enclosingModule, tupledArg[0].scope, tupledArg[0].scopedInlines, tupledArg[0].varNames, tupledArg[0].typeArgs, tupledArg[0].decisionTargets, tupledArg[0].thisAvailability, true, tupledArg[0].isDynamicCurriedLambda, tupledArg[0].caughtException), tupledArg[1], tupledArg[2], ofArray([makeIdent("_genArgs")])] : [tupledArg[0], tupledArg[1], tupledArg[2], new List()];
    }(foldBack(function (tupledArg_1, tupledArg_2) {
      const patternInput_1 = makeLambdaArgs(com, tupledArg_2[0], tupledArg_1);
      return [patternInput_1[0], tupledArg_2[1], append(patternInput_1[1], tupledArg_2[2])];
    }, patternInput[1], [ctx_1, patternInput[0], new List()]));
  };

  const makeTryCatch = __exports.makeTryCatch = function (com, ctx, fsExpr, _arg1, catchClause, finalBody) {
    const activePatternResult61467 = CurriedLambda(function (arg00, arg10) {
      return com.Transform(arg00, arg10);
    })(ctx)(_arg1);
    let catchClause_1;

    if (catchClause == null) {
      catchClause_1 = null;
    } else {
      const activePatternResult61463 = CurriedLambda(function (arg00_1) {
        return CurriedLambda(Identifiers["|BindIdent|"])(arg00_1);
      })(com, ctx, getValue(catchClause)[0]);
      const catchBody = getValue(catchClause)[1];
      let catchContext;
      const caughtException = activePatternResult61463[1];
      catchContext = new Context(activePatternResult61463[0].fileName, activePatternResult61463[0].enclosingModule, activePatternResult61463[0].scope, activePatternResult61463[0].scopedInlines, activePatternResult61463[0].varNames, activePatternResult61463[0].typeArgs, activePatternResult61463[0].decisionTargets, activePatternResult61463[0].thisAvailability, activePatternResult61463[0].genericAvailability, activePatternResult61463[0].isDynamicCurriedLambda, caughtException);
      catchClause_1 = [activePatternResult61463[1], function (arg00_2, arg10_1) {
        return com.Transform(arg00_2, arg10_1);
      }(catchContext, catchBody)];
    }

    let finalizer;

    if (finalBody == null) {
      finalizer = null;
    } else {
      const activePatternResult61465 = CurriedLambda(function (arg00_3, arg10_2) {
        return com.Transform(arg00_3, arg10_2);
      })(ctx)(getValue(finalBody));
      finalizer = activePatternResult61465;
    }

    return new Expr(11, [activePatternResult61467, catchClause_1, finalizer, Helpers.makeRangeFrom(fsExpr)]);
  };

  const makeGetFrom = __exports.makeGetFrom = function (r, typ, callee, propExpr) {
    return new Expr(3, [callee, ofArray([propExpr]), new ApplyKind(1), typ, r]);
  };

  const buildApplyInfo = __exports.buildApplyInfo = function (com, ctx, r, typ, ownerType, ownerFullName, methName, methKind, atts, typArgs, methTypArgs, methArgTypes, callee, args) {
    return new ApplyInfo(ownerType, ownerFullName, methName, methKind, callee, args, typ, r, ctx.fileName, toList(choose(function (att) {
      return Types.makeDecorator(com, att);
    }, atts)), map_3(function (arg20_) {
      return Types.makeType(com, ctx.typeArgs, arg20_);
    }, typArgs), map_3(function (arg20__1) {
      return Types.makeType(com, ctx.typeArgs, arg20__1);
    }, methTypArgs), methArgTypes, ctx.genericAvailability, ctx.caughtException);
  };

  const buildApplyInfoFrom = __exports.buildApplyInfoFrom = function (com, ctx, r, typ, typArgs, methTypArgs, methArgTypes, callee, args, owner, meth) {
    const patternInput = owner == null ? [new Type(1), "System.Object"] : [Types.makeTypeFromDef(com, ctx.typeArgs, getValue(owner), new List()), Helpers.sanitizeEntityFullName(getValue(owner))];
    return buildApplyInfo(com, ctx, r, typ, patternInput[0], patternInput[1], Helpers.sanitizeMethodName(meth), Helpers.getMemberKind(meth), meth.Attributes, typArgs, methTypArgs, methArgTypes, callee, args);
  };

  const tryPlugin = __exports.tryPlugin = function (com, info) {
    return Plugins.tryPlugin(info.range, function (p) {
      return function (arg00, arg10) {
        return p.TryReplace(arg00, arg10);
      }(com, info);
    })(com.ReplacePlugins);
  };

  const _Plugin___ = __exports["|Plugin|_|"] = function (com, info, _arg1) {
    return tryPlugin(com, info);
  };

  const _EmitReplacement___ = __exports["|EmitReplacement|_|"] = function (com, info, _arg1) {
    const fullName = info.ownerFullName + "." + info.methodName;
    const matchValue = tryFind(fullName, com.Options.emitReplacements);

    if (matchValue == null) {
      return null;
    } else {
      const args = info.callee == null ? info.args : new List(getValue(info.callee), info.args);
      return makeEmit(info.range, info.returnType, args, getValue(matchValue));
    }
  };

  const tryReplace = __exports.tryReplace = function (com, ctx, ent, info) {
    const isInterface = function (_arg1) {
      const $var68 = _arg1.tag === 14 ? _arg1.data[0].Kind.Equals(new EntityKind(5)) ? [0, _arg1.data[0]] : [1] : [1];

      switch ($var68[0]) {
        case 0:
          return true;

        case 1:
          return false;
      }
    };

    const $var69 = ent != null ? com.IsReplaceCandidate(getValue(ent)) ? [0, getValue(ent)] : [1] : [1];

    switch ($var69[0]) {
      case 0:
        const matchValue = tryReplace_1(com, info);

        if (matchValue == null) {
          if (isInterface(info.ownerType)) {
            return null;
          } else if (matchValue == null) {
            return function (error) {
              return addErrorAndReturnNull(com, ctx.fileName, info.range, error);
            }(toText(printf("Cannot find replacement for %s::%s"))(info.ownerFullName, info.methodName));
          } else {
            throw new Error("C:/projects/fable/src/dotnet/Fable.Compiler/FSharp2Fable.Util.fs", 1166, 18);
          }
        } else {
          return matchValue;
        }

      case 1:
        return null;
    }
  };

  const _Replaced___ = __exports["|Replaced|_|"] = function (com, ctx, owner, i, _arg1) {
    return tryReplace(com, ctx, owner, i);
  };

  const _ResolveGeneric_ = __exports["|ResolveGeneric|"] = function (genArgs, t) {
    if (!t.IsGenericParameter) {
      return t;
    } else {
      const genParam = t.GenericParameter;
      return function (option) {
        return defaultArg(option, t);
      }(tryPick(function (tupledArg) {
        return genParam.Name === tupledArg[0] ? tupledArg[1] : null;
      }, genArgs));
    }
  };

  const matchGenericParams = __exports.matchGenericParams = function (com, ctx, meth, typArgs, methTypArgs) {
    return reverse(fold2(function (acc, genPar, _arg1) {
      const activePatternResult61526 = function (t) {
        return _ResolveGeneric_(ctx.typeArgs, t);
      }(_arg1);

      return new List([genPar.Name, activePatternResult61526], acc);
    }, new List(), meth.GenericParameters, append(typArgs, methTypArgs)));
  };

  const emittedGenericArguments = __exports.emittedGenericArguments = function (com, ctx, r, meth, typArgs, methTypArgs, macro, args) {
    var genArgs;
    var genInfo;
    let extraArgs = new List();

    const addExtraArg = function (arg) {
      const pos = args.length + extraArgs.length | 0;
      extraArgs = new List(arg, extraArgs);
      return "$" + pos.toString();
    };

    return function (macro_1) {
      return [macro_1, append(args, reverse(extraArgs))];
    }(Naming.hasGenericPlaceholder(macro) ? (genArgs = create(matchGenericParams(com, ctx, meth, typArgs, methTypArgs), new Comparer(comparePrimitives)), genInfo = new GenericInfo(false, ctx.genericAvailability), Naming.replaceGenericPlaceholder(macro, function (m) {
      const matchValue = tryFind(m, genArgs);

      if (matchValue == null) {
        (function (warning) {
          addWarning(com, ctx.fileName, r, warning);
        })(toText(printf("Couldn't find generic argument %s requested by Emit expression: %s"))(m, macro));

        return m;
      } else {
        return addExtraArg(function (typ) {
          return makeTypeRef(com, genInfo, typ);
        }(Types.makeType(com, ctx.typeArgs, getValue(matchValue))));
      }
    })) : macro);
  };

  const _Erased___ = __exports["|Erased|_|"] = function (com, ctx, r, typ, owner, callee, args, meth) {
    if (owner == null) {
      return null;
    } else {
      const matchValue = getValue(owner).Attributes;
      const activePatternResult61550 = Patterns["|ContainsAtt|_|"](Atts.erase, matchValue);

      if (activePatternResult61550 != null) {
        if (callee == null) {
          return function (error) {
            return addErrorAndReturnNull(com, ctx.fileName, r, error);
          }("Cannot call a static method of an erased type: " + meth.DisplayName);
        } else {
          const methName = meth.DisplayName;
          return (() => {
            const matchValue_1 = Helpers.getMemberKind(meth);

            switch (matchValue_1.tag) {
              case 4:
                return makeGetFrom(r, typ, getValue(callee), makeStrConst(methName));

              case 3:
                return new Expr(9, [getValue(callee), makeStrConst(methName), args.head, r]);

              case 1:
                const m = makeGet(r, new Type(1), getValue(callee), makeStrConst(methName));
                return new Expr(3, [m, args, new ApplyKind(0), typ, r]);

              case 0:
                return function (error_1) {
                  return addErrorAndReturnNull(com, ctx.fileName, r, error_1);
                }("Erased type cannot have constructors");

              default:
                return makeGetFrom(r, typ, getValue(callee), makeStrConst(methName));
            }
          })();
        }
      } else {
        return null;
      }
    }
  };

  const _Emitted___ = __exports["|Emitted|_|"] = function (com, ctx, r, typ, i, typArgs, methTypArgs, callee, args, meth) {
    const matchValue = meth.Attributes;
    const activePatternResult61561 = Patterns["|ContainsAtt|_|"](Atts.emit, matchValue);

    if (activePatternResult61561 != null) {
      const $var70 = getValue(activePatternResult61561).tail != null ? typeof getValue(activePatternResult61561).head === "string" ? getValue(activePatternResult61561).tail.tail == null ? [0, getValue(activePatternResult61561).head] : [1] : [1] : [1];

      switch ($var70[0]) {
        case 0:
          const args_1 = callee != null ? new List(getValue(callee), args) : args;
          const patternInput = emittedGenericArguments(com, ctx, r, meth, typArgs, methTypArgs, $var70[1], args_1);
          return new Expr(3, [new Expr(0, new ValueKind(17, patternInput[0])), patternInput[1], new ApplyKind(0), typ, r]);

        case 1:
          throw new Error(function (msg) {
            return attachRange(r, msg);
          }("EmitAttribute must receive a string or Type argument"));
      }
    } else {
      return null;
    }
  };

  const _Imported___ = __exports["|Imported|_|"] = function (com, ctx, r, typ, i, typArgs, methTypArgs, args, meth) {
    return function (_arg1) {
      if (_arg1 == null) {
        return null;
      } else {
        return (() => {
          var callee;
          var args_1;
          const activePatternResult61573 = (callee = null, args_1 = new List(getValue(_arg1), args), function (meth_1) {
            return _Emitted___(com, ctx, r, typ, i, typArgs, methTypArgs, callee, args_1, meth_1);
          })(meth);

          if (activePatternResult61573 != null) {
            return getValue(activePatternResult61573);
          } else {
            const matchValue = Helpers.getMemberKind(meth);

            switch (matchValue.tag) {
              case 4:
                return getValue(_arg1);

              case 3:
                return new Expr(9, [getValue(_arg1), null, args.head, r]);

              case 0:
              case 1:
                return new Expr(3, [getValue(_arg1), args, new ApplyKind(0), typ, r]);

              default:
                return getValue(_arg1);
            }
          }
        })();
      }
    }(tryImported(new Lazy(function () {
      return Helpers.sanitizeMethodName(meth);
    }), choose(function (att) {
      return Types.makeDecorator(com, att);
    }, meth.Attributes)));
  };

  const _Inlined___ = __exports["|Inlined|_|"] = function (com, ctx, r, typArgs, methTypArgs, callee, args, meth) {
    var folder;

    const hasDoubleEvalRisk = function (_arg1) {
      if (_arg1.tag === 0) {
        return _arg1.data.HasDoubleEvalRisk;
      } else {
        return true;
      }
    };

    const hasThisReference = function (e) {
      return deepExists(function (_arg2) {
        const $var71 = _arg2.tag === 0 ? _arg2.data.tag === 1 ? [0] : [1] : [1];

        switch ($var71[0]) {
          case 0:
            return true;

          case 1:
            return false;
        }
      }, e);
    };

    const addCallee = function (ctx_1, callee_1, replacement) {
      if (callee_1 == null) {
        return ctx_1;
      } else {
        const callee_2 = replacement != null ? replacement : getValue(callee_1);
        const thisAvailability = new ThisAvailability(2, [null, ofArray([[null, callee_2]])]);
        return new Context(ctx_1.fileName, ctx_1.enclosingModule, ctx_1.scope, ctx_1.scopedInlines, ctx_1.varNames, ctx_1.typeArgs, ctx_1.decisionTargets, thisAvailability, ctx_1.genericAvailability, ctx_1.isDynamicCurriedLambda, ctx_1.caughtException);
      }
    };

    if (!Helpers.isInline(meth)) {
      return null;
    } else {
      const patternInput = com.GetInlineExpr(meth);
      const args_1 = callee == null ? args : new List(getValue(callee), args);
      const patternInput_1 = (folder = function (tupledArg, _arg1_1, arg) {
        const activePatternResult61591 = _arg1_1;

        if ((activePatternResult61591[1] > 1 ? hasDoubleEvalRisk(arg) : false) ? true : hasThisReference(arg)) {
          const tmpVar = makeIdent(com.GetUniqueVar());
          const tmpVarExp = new Expr(0, new ValueKind(5, tmpVar));
          const assign = new Expr(8, [tmpVar, arg, false, null]);
          let ctx_2;
          const scope = new List([activePatternResult61591[0], tmpVarExp], tupledArg[0].scope);
          ctx_2 = new Context(tupledArg[0].fileName, tupledArg[0].enclosingModule, scope, tupledArg[0].scopedInlines, tupledArg[0].varNames, tupledArg[0].typeArgs, tupledArg[0].decisionTargets, tupledArg[0].thisAvailability, tupledArg[0].genericAvailability, tupledArg[0].isDynamicCurriedLambda, tupledArg[0].caughtException);
          const ctx_3 = tupledArg[2] === 0 ? addCallee(ctx_2, callee, tmpVarExp) : ctx_2;
          return [ctx_3, new List(assign, tupledArg[1]), tupledArg[2] + 1];
        } else {
          let ctx_4;
          const scope_1 = new List([activePatternResult61591[0], arg], tupledArg[0].scope);
          ctx_4 = new Context(tupledArg[0].fileName, tupledArg[0].enclosingModule, scope_1, tupledArg[0].scopedInlines, tupledArg[0].varNames, tupledArg[0].typeArgs, tupledArg[0].decisionTargets, tupledArg[0].thisAvailability, tupledArg[0].genericAvailability, tupledArg[0].isDynamicCurriedLambda, tupledArg[0].caughtException);
          const ctx_5 = tupledArg[2] === 0 ? addCallee(ctx_4, callee, null) : ctx_4;
          return [ctx_5, tupledArg[1], tupledArg[2] + 1];
        }
      }, function (tupledArg_1, source1, source2) {
        return fold2(folder, [tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]], source1, source2);
      })([ctx, new List(), 0], patternInput[0], args_1);
      const typeArgs = matchGenericParams(com, patternInput_1[0], meth, typArgs, methTypArgs);
      const ctx_6 = new Context(patternInput_1[0].fileName, patternInput_1[0].enclosingModule, patternInput_1[0].scope, patternInput_1[0].scopedInlines, patternInput_1[0].varNames, typeArgs, patternInput_1[0].decisionTargets, patternInput_1[0].thisAvailability, patternInput_1[0].genericAvailability, patternInput_1[0].isDynamicCurriedLambda, patternInput_1[0].caughtException);

      const expr = function (arg00, arg10) {
        return com.Transform(arg00, arg10);
      }(ctx_6, patternInput[1]);

      if (patternInput_1[1].tail == null) {
        return expr;
      } else {
        return makeSequential(r, append(patternInput_1[1], ofArray([expr])));
      }
    }
  };

  const passGenerics_1 = __exports.passGenerics = function (com, ctx, r, typArgs, methTypArgs, meth) {
    const hasUnresolvedGenerics = function (_arg1) {
      hasUnresolvedGenerics: while (true) {
        switch (_arg1.tag) {
          case 12:
            return _arg1.data;

          case 8:
            _arg1 = _arg1.data;
            continue hasUnresolvedGenerics;

          case 9:
            _arg1 = _arg1.data;
            continue hasUnresolvedGenerics;

          case 10:
            return tryPick(hasUnresolvedGenerics, _arg1.data);

          case 11:
            return tryPick(hasUnresolvedGenerics, new List(_arg1.data[1], _arg1.data[0]));

          case 14:
            return tryPick(hasUnresolvedGenerics, _arg1.data[1]);

          default:
            return null;
        }
      }
    };

    const genInfo = new GenericInfo(true, ctx.genericAvailability);
    return makeJsObject(null, map_3(function (tupledArg) {
      const activePatternResult61607 = function (t) {
        return Types.makeType(com, ctx.typeArgs, t);
      }(tupledArg[1]);

      if (!ctx.genericAvailability) {
        const matchValue = hasUnresolvedGenerics(activePatternResult61607);

        if (matchValue == null) {} else {
          (function (warning) {
            addWarning(com, ctx.fileName, r, warning);
          })("An unresolved generic argument ('" + getValue(matchValue) + ") is being passed " + "to a function with `PassGenericsAttribute`. This will likely fail " + "at runtime. Try adding `PassGenericsAttribute` to the calling method " + "or using concrete types.");
        }
      }

      return [tupledArg[0], makeTypeRef(com, genInfo, activePatternResult61607)];
    }, matchGenericParams(com, ctx, meth, typArgs, methTypArgs)));
  };

  const _ExtensionMember___ = __exports["|ExtensionMember|_|"] = function (com, ctx, r, typ, callee, args, argTypes, owner, meth) {
    const matchValue = [meth.IsExtensionMember, callee, owner];
    const $var72 = matchValue[0] ? matchValue[1] != null ? matchValue[2] != null ? [0, getValue(matchValue[1]), getValue(matchValue[2])] : [1] : [1] : [1];

    switch ($var72[0]) {
      case 0:
        const typRef = function (typ_1) {
          return makeNonGenTypeRef(com, typ_1);
        }(Types.makeTypeFromDef(com, ctx.typeArgs, $var72[2], new List()));

        let methName_1;
        const methName = Helpers.sanitizeMethodName(meth);
        const ent = com.GetEntity($var72[2]);
        const loc = meth.IsInstanceMember ? new MemberLoc(0) : new MemberLoc(1);
        const matchValue_1 = ent.TryGetMember(methName, Helpers.getMemberKind(meth), loc, argTypes);

        if (matchValue_1 == null) {
          methName_1 = methName;
        } else {
          methName_1 = getValue(matchValue_1).OverloadName;
        }

        const ext = makeGet(r, new Type(1), typRef, makeStrConst(methName_1));
        let bind;
        const meth_1 = makeGet(null, new Type(1), ext, makeStrConst("bind"));
        bind = new Expr(3, [meth_1, ofArray([$var72[1]]), new ApplyKind(0), new Type(1), null]);
        return new Expr(3, [bind, args, new ApplyKind(0), typ, r]);

      case 1:
        return null;
    }
  };

  const getOverloadedName = __exports.getOverloadedName = function (com, owner, meth, kind, methArgTypes, methName) {
    if (owner == null) {
      return methName;
    } else {
      const ent = com.GetEntity(getValue(owner));
      return function (_arg1) {
        return _arg1 == null ? methName : getValue(_arg1).OverloadName;
      }(ent.TryGetMember(methName, kind, Helpers.getMemberLoc(meth), methArgTypes));
    }
  };

  const makeCallFrom = __exports.makeCallFrom = function (com, ctx, r, typ, meth, typArgs, methTypArgs, callee, args) {
    var arg;
    validateGenArgs(com, ctx, r, meth.GenericParameters, methTypArgs);
    const methArgTypes = Types.getArgTypes(com, meth.CurriedParameterGroups);
    let args_3;
    const args_1 = ensureArity(com, methArgTypes, args);

    if (Helpers.hasRestParams(meth)) {
      const args_2 = reverse(args_1);
      const matchValue = args_2.head;
      const $var73 = matchValue.tag === 0 ? matchValue.data.tag === 11 ? matchValue.data.data[0].tag === 0 ? [0, matchValue.data.data[0].data] : [1] : [1] : [1];

      switch ($var73[0]) {
        case 0:
          args_3 = append(reverse(args_2.tail), $var73[1]);
          break;

        case 1:
          args_3 = reverse(new List(new Expr(0, new ValueKind(3, args_2.head)), args_2.tail));
          break;
      }
    } else if (Helpers.hasListParam(meth)) {
      const matchValue_1 = splitAt(args_1.length - 1, args_1);
      const $var74 = matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? [0, matchValue_1[1].head, matchValue_1[0]] : [1] : [1];

      switch ($var74[0]) {
        case 0:
          let $var75;

          const activePatternResult61636 = _CoreCons___("List", "default", $var74[1]);

          if (activePatternResult61636 != null) {
            if (getValue(activePatternResult61636).tail == null) {
              $var75 = [0];
            } else {
              $var75 = [1];
            }
          } else {
            $var75 = [1];
          }

          switch ($var75[0]) {
            case 0:
              args_3 = $var74[2];
              break;

            case 1:
              let $var76;

              const activePatternResult61634 = _CoreMeth___("List", "ofArray", $var74[1]);

              if (activePatternResult61634 != null) {
                if (getValue(activePatternResult61634).tail != null) {
                  if (getValue(activePatternResult61634).head.tag === 0) {
                    if (getValue(activePatternResult61634).head.data.tag === 11) {
                      if (getValue(activePatternResult61634).head.data.data[0].tag === 0) {
                        if (getValue(activePatternResult61634).tail.tail == null) {
                          $var76 = [0, getValue(activePatternResult61634).head.data.data[0].data];
                        } else {
                          $var76 = [1];
                        }
                      } else {
                        $var76 = [1];
                      }
                    } else {
                      $var76 = [1];
                    }
                  } else {
                    $var76 = [1];
                  }
                } else {
                  $var76 = [1];
                }
              } else {
                $var76 = [1];
              }

              switch ($var76[0]) {
                case 0:
                  args_3 = append($var74[2], $var76[1]);
                  break;

                case 1:
                  args_3 = append($var74[2], ofArray([new Expr(0, new ValueKind(3, $var74[1]))]));
                  break;
              }

              break;
          }

          break;

        case 1:
          args_3 = args_1;
          break;
      }
    } else if (Helpers.hasAtt(Atts.passGenerics, meth.Attributes)) {
      args_3 = append(args_1, ofArray([passGenerics_1(com, ctx, r, typArgs, methTypArgs, meth)]));
    } else {
      args_3 = Helpers.removeOmittedOptionalArguments(meth, args_1);
    }

    const owner = Helpers.tryEnclosingEntity(meth);
    const i = buildApplyInfoFrom(com, ctx, r, typ, typArgs, methTypArgs, methArgTypes, callee, args_3, owner, meth);

    const activePatternResult61655 = function (arg20_) {
      return _EmitReplacement___(com, i, arg20_);
    }(meth);

    if (activePatternResult61655 != null) {
      return getValue(activePatternResult61655);
    } else {
      const activePatternResult61653 = function (arg20__1) {
        return _Plugin___(com, i, arg20__1);
      }(meth);

      if (activePatternResult61653 != null) {
        return getValue(activePatternResult61653);
      } else {
        const activePatternResult61651 = function (meth_1) {
          return _Imported___(com, ctx, r, typ, i, typArgs, methTypArgs, args_3, meth_1);
        }(meth);

        if (activePatternResult61651 != null) {
          return getValue(activePatternResult61651);
        } else {
          const activePatternResult61649 = function (meth_2) {
            return _Emitted___(com, ctx, r, typ, i, typArgs, methTypArgs, callee, args_3, meth_2);
          }(meth);

          if (activePatternResult61649 != null) {
            return getValue(activePatternResult61649);
          } else {
            const activePatternResult61647 = (arg = [callee, args_3], function (meth_3) {
              return _Erased___(com, ctx, r, typ, owner, arg[0], arg[1], meth_3);
            })(meth);

            if (activePatternResult61647 != null) {
              return getValue(activePatternResult61647);
            } else {
              const activePatternResult61645 = function (arg40_) {
                return _Replaced___(com, ctx, owner, i, arg40_);
              }(meth);

              if (activePatternResult61645 != null) {
                return getValue(activePatternResult61645);
              } else {
                const activePatternResult61643 = function (meth_4) {
                  return _Inlined___(com, ctx, r, typArgs, methTypArgs, callee, args_3, meth_4);
                }(meth);

                if (activePatternResult61643 != null) {
                  return getValue(activePatternResult61643);
                } else {
                  const activePatternResult61641 = function (meth_5) {
                    return _ExtensionMember___(com, ctx, r, typ, callee, args_3, methArgTypes, owner, meth_5);
                  }(meth);

                  if (activePatternResult61641 != null) {
                    return getValue(activePatternResult61641);
                  } else {
                    const activePatternResult61639 = Patterns_1["|Try|_|"](function (fsRef) {
                      return Identifiers.tryGetBoundExpr(ctx, r, fsRef);
                    }, meth);

                    if (activePatternResult61639 != null) {
                      const matchValue_2 = Helpers.getMemberKind(meth);
                      const $var77 = matchValue_2.tag === 2 ? [0] : matchValue_2.tag === 4 ? [0] : matchValue_2.tag === 3 ? [1] : [2];

                      switch ($var77[0]) {
                        case 0:
                          return getValue(activePatternResult61639);

                        case 1:
                          return new Expr(9, [getValue(activePatternResult61639), null, args_3.head, r]);

                        case 2:
                          return new Expr(3, [getValue(activePatternResult61639), args_3, new ApplyKind(0), typ, r]);
                      }
                    } else {
                      let callee_2;
                      const matchValue_3 = [callee, owner];

                      if (matchValue_3[0] == null) {
                        if (matchValue_3[1] != null) {
                          const ent = getValue(matchValue_3[1]);

                          callee_2 = function (typ_1) {
                            return makeNonGenTypeRef(com, typ_1);
                          }(Types.makeTypeFromDef(com, ctx.typeArgs, ent, new List()));
                        } else {
                          callee_2 = function (typ_2) {
                            return makeNonGenTypeRef(com, typ_2);
                          }(new Type(14, [ctx.enclosingModule.Entity, new List()]));
                        }
                      } else {
                        const callee_1 = getValue(matchValue_3[0]);
                        callee_2 = callee_1;
                      }

                      const methName = Helpers.sanitizeMethodName(meth);
                      const matchValue_4 = Helpers.getMemberKind(meth);

                      switch (matchValue_4.tag) {
                        case 4:
                          const methName_1 = getOverloadedName(com, owner, meth, matchValue_4, methArgTypes, methName);
                          return makeGetFrom(r, typ, callee_2, makeStrConst(methName_1));

                        case 3:
                          const methName_2 = getOverloadedName(com, owner, meth, matchValue_4, methArgTypes, methName);
                          return new Expr(9, [callee_2, makeStrConst(methName_2), args_3.head, r]);

                        case 0:
                          return new Expr(3, [callee_2, args_3, new ApplyKind(2), typ, r]);

                        case 1:
                          const applyMeth = function (methName_3) {
                            const m = makeGet(r, new Type(1), callee_2, makeStrConst(methName_3));
                            return new Expr(3, [m, args_3, new ApplyKind(0), typ, r]);
                          };

                          if (Helpers.belongsToInterfaceOrImportedEntity(meth)) {
                            if (methName === ".ctor") {
                              return new Expr(3, [callee_2, args_3, new ApplyKind(2), typ, r]);
                            } else {
                              return applyMeth(methName);
                            }
                          } else {
                            const methName_4 = getOverloadedName(com, owner, meth, matchValue_4, methArgTypes, methName);
                            return applyMeth(methName_4);
                          }

                        default:
                          const methName_5 = getOverloadedName(com, owner, meth, matchValue_4, methArgTypes, methName);
                          return makeGetFrom(r, typ, callee_2, makeStrConst(methName_5));
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
  };

  const makeThisRef = __exports.makeThisRef = function (com, ctx, r, v) {
    var v_2;
    var currentThis;

    if (ctx.thisAvailability.tag === 2) {
      const matchValue = [v, ctx.thisAvailability.data[0]];
      const $var78 = matchValue[0] != null ? matchValue[1] != null ? (v_2 = getValue(matchValue[0]), currentThis = getValue(matchValue[1]), equals(currentThis, v_2)) ? [0, getValue(matchValue[1]), getValue(matchValue[0])] : [1] : [1] : [1];

      switch ($var78[0]) {
        case 0:
          return new Expr(0, new ValueKind(1));

        case 1:
          if (matchValue[0] == null) {
            return last(ctx.thisAvailability.data[1])[1];
          } else {
            const v_1 = getValue(matchValue[0]);
            return pick(function (_arg1) {
              var fsRef;
              const $var79 = _arg1[0] != null ? (fsRef = getValue(_arg1[0]), equals(v_1, fsRef)) ? [0, getValue(_arg1[0]), _arg1[1]] : [1] : [1];

              switch ($var79[0]) {
                case 0:
                  return $var79[2];

                case 1:
                  if (_arg1[0] == null) {
                    return _arg1[1];
                  } else {
                    return null;
                  }

              }
            }, ctx.thisAvailability.data[1]);
          }

      }
    } else if (ctx.thisAvailability.tag === 0) {
      (function (warning) {
        addWarning(com, ctx.fileName, r, warning);
      })("`this` seems to be used in a context where it's not available, please check.");

      return new Expr(0, new ValueKind(1));
    } else {
      return new Expr(0, new ValueKind(1));
    }
  };

  const makeValueFrom = __exports.makeValueFrom = function (com, ctx, r, typ, eraseUnit, v) {
    var typArgs;
    var methTypArgs;
    var args;
    var typArgs_1;
    var methTypArgs_1;
    var callee;
    var args_1;

    const resolveValue = function (com_1, ctx_1, r_1, typ_1, owner, v_1) {
      const matchValue = Identifiers.tryGetBoundExpr(ctx_1, r_1, v_1);

      if (matchValue == null) {
        const patternInput = owner == null ? [new Type(1), function (typ_2) {
          return makeNonGenTypeRef(com_1, typ_2);
        }(new Type(14, [ctx_1.enclosingModule.Entity, new List()]))] : [typ_1, function (typ_3) {
          return makeNonGenTypeRef(com_1, typ_3);
        }(Types.makeTypeFromDef(com_1, ctx_1.typeArgs, getValue(owner), new List()))];
        return new Expr(3, [patternInput[1], ofArray([makeStrConst(v_1.CompiledName)]), new ApplyKind(1), patternInput[0], r_1]);
      } else {
        return getValue(matchValue);
      }
    };

    if (eraseUnit ? typ.Equals(new Type(2)) : false) {
      return new Expr(13, [new Expr(0, new ValueKind(0)), new Type(2)]);
    } else if (v.IsModuleValueOrMember) {
      const owner_1 = Helpers.tryEnclosingEntity(v);
      const i = buildApplyInfoFrom(com, ctx, r, typ, new List(), new List(), new List(), null, new List(), owner_1, v);

      const activePatternResult61683 = function (arg20_) {
        return _Plugin___(com, i, arg20_);
      }(v);

      if (activePatternResult61683 != null) {
        return getValue(activePatternResult61683);
      } else {
        const activePatternResult61681 = (typArgs = new List(), methTypArgs = new List(), args = new List(), function (meth) {
          return _Imported___(com, ctx, r, typ, i, typArgs, methTypArgs, args, meth);
        })(v);

        if (activePatternResult61681 != null) {
          return getValue(activePatternResult61681);
        } else {
          const activePatternResult61679 = (typArgs_1 = new List(), methTypArgs_1 = new List(), callee = null, args_1 = new List(), function (meth_1) {
            return _Emitted___(com, ctx, r, typ, i, typArgs_1, methTypArgs_1, callee, args_1, meth_1);
          })(v);

          if (activePatternResult61679 != null) {
            return getValue(activePatternResult61679);
          } else {
            const activePatternResult61677 = function (arg40_) {
              return _Replaced___(com, ctx, owner_1, i, arg40_);
            }(v);

            if (activePatternResult61677 != null) {
              return getValue(activePatternResult61677);
            } else {
              return resolveValue(com, ctx, r, typ, owner_1, v);
            }
          }
        }
      }
    } else {
      return resolveValue(com, ctx, r, typ, null, v);
    }
  };

  return __exports;
}({});