import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { stripTyparEqns, $7C$VRefLocal$7C$VRefNonLocal$7C$ as _VRefLocal_VRefNonLocal_, ValBaseOrThisInfo, ValRef, typarRefEq, Typar, RecdFieldRef, UnionCaseRef, ccuEq, ccuOfTyconRef, mkRecdFieldRef, TType, mkNestedValRef, ModuleOrNamespaceKind, TyparKind, EntityRef, ArgReprInfo, taccessPublic, CompilationPath, taccessPrivate, $7C$ERefLocal$7C$ERefNonLocal$7C$ as _ERefLocal_ERefNonLocal_, mkLocalEntityRef, ModuleOrNamespaceType, CcuThunk, getNameOfScopeRef, Accessibility } from "../fsharp/tast";
import { Ident, mkSynId, TyparStaticReq, XmlDoc, textOfPath } from "../fsharp/ast";
import { filter, mapIndexed, reverse, ofArray, map } from "../fable-core/List";
import List from "../fable-core/List";
import { printf, toText, join } from "../fable-core/String";
import Choice from "../fable-core/Choice";
import { fold, tryPick, map2, sumBy, item as item_1, singleton, collect, empty as empty_1, append, map as map_1, delay, toList, exists, forAll } from "../fable-core/Seq";
import { ImportMap } from "../fsharp/import";
import { TcGlobals } from "../fsharp/TcGlobals";
import { PropTypOfEventInfo, TryDestStandardDelegateTyp, GetImmediateIntrinsicPropInfosOfType, GetImmediateIntrinsicMethInfosOfType, InfoReader } from "../fsharp/InfoReader";
import { TcImports } from "../fsharp/CompileOps";
import { Tuple, isArray, comparePrimitives, Any, Interface, makeGeneric, extendInfo, hash, equals, Option } from "../fable-core/Util";
import { UnresolvedPathReferenceNoRange } from "../fsharp/ErrorLogger";
import { PrettyTypes, Erasure, stripTyEqnsWrtErasure, typeEquiv, instType, stripTyEqns, evalTupInfoIsStruct, valRefEq, tryDestRefTupleTy, isRefTupleTy, stripFunTy, isFunTy, isByrefTy, HasFSharpAttribute, GetTopTauTypeInFSharpForm, ValRefIsCompiledAsInstanceMember, mkRefTupledTy, mkIteratedFunTy, ActivePatternInfo$2E$get_Names as ActivePatternInfo_get_Names, recdFieldRefOrder, generalizeTypars, generalizeTyconRef, generalizedTyconRef, isInterfaceTyconRef, tyconRefEq, rankOfArrayTyconRef, isArrayTyconRef, buildAccessPath, DisplayEnv, metadataOfTycon, tryRescopeEntity } from "../fsharp/TastOps";
import { defaultArg, getValue } from "../fable-core/Option";
import CurriedLambda from "../fable-core/CurriedLambda";
import { SymbolHelpers } from "./SymbolHelpers";
import { Range as _Range, range0, range as range_3 } from "../fsharp/range";
import { ItemOccurence, ActivePatternElemsOfModuleOrNamespace, $7C$AbbrevOrAppTy$7C$_$7C$ as _AbbrevOrAppTy___, ItemsAreEffectivelyEqualHash, ItemsAreEffectivelyEqual, Item } from "../fsharp/NameResolution";
import { ValRef$2E$get_ImplementedSlotSignatures as ValRef_get_ImplementedSlotSignatures, ValRef$2E$IsFSharpExplicitInterfaceImplementation as ValRef_IsFSharpExplicitInterfaceImplementation, ValRef$2E$get_IsDefiniteFSharpOverrideMember as ValRef_get_IsDefiniteFSharpOverrideMember, EventInfo, RecdFieldInfo, UnionCaseInfo, ILFieldInfo, ILTypeInfo, PropInfo, MethInfo, GetSuperTypeOfType, ExistsHeadTypeInEntireHierarchy, AllowMultiIntfInstantiations, AllInterfacesOfType, SkipUnrefInterfaces, GetImmediateInterfacesOfType } from "../fsharp/infos";
import { GetILAccessOfILPropInfo, GetILAccessOfILEventInfo, AccessorDomain } from "../fsharp/AccessibilityLogic";
import { QueueListModule } from "../fsharp/QueueList";
import { AttribInfosOfIL, GetAttribInfosOfMethod, GetAttribInfosOfProp, GetAttribInfosOfEvent, AttribInfo, GetAttribInfosOfEntity } from "../fsharp/AttributeChecking";
import { ActivePatternInfoOfValName, ChopPropertyName } from "../fsharp/PrettyNaming";
import { stringOfFSAttrib, stringOfILAttrib, prettyStringOfTyNoCx } from "../fsharp/NicePrint";
import { List as List_1 } from "../absil/illib";
import { decodeILAttribData } from "../absil/il";
import { map as map_2 } from "../fable-core/Array";
import { tryFind } from "../fable-core/Map";
export class FSharpAccessibility {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAccessibility",
      properties: {
        Contents: Accessibility,
        IsInternal: "boolean",
        IsPrivate: "boolean",
        IsProtected: "boolean",
        IsPublic: "boolean"
      }
    };
  }

  constructor(a, isProtected) {
    this.a = a;

    if (isProtected != null) {
      this["isProtected@24"] = isProtected;
    } else {
      this["isProtected@24"] = false;
    }
  }

  static [".ctor"](a, _arg1) {
    return new FSharpAccessibility(a);
  }

  get IsPublic() {
    if (!this["isProtected@24"]) {
      const activePatternResult49514 = this["|Public|Internal|Private|"](this.a);

      if (activePatternResult49514.tag === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get IsPrivate() {
    if (!this["isProtected@24"]) {
      const activePatternResult49517 = this["|Public|Internal|Private|"](this.a);

      if (activePatternResult49517.tag === 2) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get IsInternal() {
    if (!this["isProtected@24"]) {
      const activePatternResult49520 = this["|Public|Internal|Private|"](this.a);

      if (activePatternResult49520.tag === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get IsProtected() {
    return this["isProtected@24"];
  }

  get Contents() {
    return this.a;
  }

  ToString() {
    const mangledTextOfCompPath = _arg3 => {
      return getNameOfScopeRef(_arg3.data[0]) + "/" + textOfPath(map(tuple => tuple[0], _arg3.data[1]));
    };

    return join(";", map(mangledTextOfCompPath, this.a.data));
  }

  isInternalCompPath(x) {
    const $var1 = x.data[0].tag === 0 ? x.data[1].tail == null ? [0] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  }

  ["|Public|Internal|Private|"](_arg2) {
    return _arg2.data.tail == null ? new Choice(0, null) : forAll(x => this.isInternalCompPath(x), _arg2.data) ? new Choice(1, null) : new Choice(2, null);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAccessibility", FSharpAccessibility);
export class SymbolEnv {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.SymbolEnv",
      properties: {
        amap: ImportMap,
        g: TcGlobals,
        infoReader: InfoReader,
        tcImports: TcImports,
        thisCcu: CcuThunk,
        thisCcuTyp: Option(ModuleOrNamespaceType)
      }
    };
  }

  constructor(g, thisCcu, thisCcuTyp, tcImports) {
    this["g@56"] = g;
    this["thisCcu@56"] = thisCcu;
    this["thisCcuTyp@56"] = thisCcuTyp;
    this["tcImports@56"] = tcImports;
    this.amapV = this["tcImports@56"].GetImportMap();
    this.infoReaderV = new InfoReader(this["g@56"], this.amapV);
  }

  static [".ctor"](g, thisCcu, thisCcuTyp, tcImports, _arg1) {
    return new SymbolEnv(g, thisCcu, thisCcuTyp, tcImports);
  }

  get g() {
    return this["g@56"];
  }

  get amap() {
    return this.amapV;
  }

  get thisCcu() {
    return this["thisCcu@56"];
  }

  get thisCcuTyp() {
    return this["thisCcuTyp@56"];
  }

  get infoReader() {
    return this.infoReaderV;
  }

  get tcImports() {
    return this["tcImports@56"];
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.SymbolEnv", SymbolEnv);
export const Impl = function (__exports) {
  const protect = __exports.protect = function (f) {
    try {
      return f();
    } catch (matchValue) {
      if (matchValue instanceof UnresolvedPathReferenceNoRange) {
        return function (tupledArg) {
          throw new Error(toText(printf("The entity or value '%s' does not exist or is in an unresolved assembly. You may need to add a reference to assembly '%s'"))(tupledArg[1], tupledArg[0]));
        }([matchValue.Data0, matchValue.Data1]);
      } else {
        throw matchValue;
      }
    }
  };

  const makeReadOnlyCollection = __exports.makeReadOnlyCollection = function (arr) {
    return Array.from(Array.from(arr));
  };

  const makeXmlDoc = __exports.makeXmlDoc = function (_arg1) {
    return makeReadOnlyCollection(_arg1.data);
  };

  const rescopeEntity = __exports.rescopeEntity = function (optViewedCcu, entity) {
    if (optViewedCcu != null) {
      const matchValue = tryRescopeEntity(getValue(optViewedCcu), entity);

      if (matchValue != null) {
        return getValue(matchValue);
      } else {
        return mkLocalEntityRef(entity);
      }
    } else {
      return mkLocalEntityRef(entity);
    }
  };

  const entityIsUnresolved = __exports.entityIsUnresolved = function (entity) {
    const activePatternResult49593 = _ERefLocal_ERefNonLocal_(entity);

    if (activePatternResult49593.tag === 1) {
      if (activePatternResult49593.data.data[0].IsUnresolvedReference) {
        let copyOfStruct = entity.TryDeref;
        return copyOfStruct.IsNone;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const checkEntityIsResolved = __exports.checkEntityIsResolved = function (entity) {
    if (entityIsUnresolved(entity)) {
      const poorQualifiedName = entity.nlr.AssemblyName === "mscorlib" ? entity.nlr.DisplayName + ", mscorlib" : entity.nlr.DisplayName + ", " + entity.nlr.Ccu.AssemblyName;
      throw new Error(toText(printf("The entity '%s' does not exist or is in an unresolved assembly."))(poorQualifiedName));
    }
  };

  const checkForCrossProjectAccessibility = __exports.checkForCrossProjectAccessibility = function (thisCcu2, ad2, thisCcu1, taccess1) {
    if (ad2.tag === 0) {
      const nameOfScoRef = function (thisCcu, scoref) {
        if (scoref.tag === 2) {
          return scoref.data.Name;
        } else if (scoref.tag === 1) {
          return scoref.data.Name;
        } else {
          return thisCcu.AssemblyName;
        }
      };

      const canAccessCompPathFromCrossProject = function (_arg2, _arg1) {
        const loop = function (p1, p2) {
          loop: while (true) {
            const matchValue = [p1, p2];

            if (matchValue[0].tail == null) {
              return true;
            } else if (matchValue[1].tail != null) {
              if (equals(matchValue[0].head[0], matchValue[1].head[0]) ? equals(matchValue[0].head[1], matchValue[1].head[1]) : false) {
                p1 = matchValue[0].tail;
                p2 = matchValue[1].tail;
                continue loop;
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
        };

        if (loop(_arg2.data[1], _arg1.data[1])) {
          return nameOfScoRef(thisCcu1, _arg2.data[0]) === nameOfScoRef(thisCcu2, _arg1.data[0]);
        } else {
          return false;
        }
      };

      const canAccessFromCrossProject = function (_arg3, cpath2) {
        return forAll(function (cpath1) {
          return canAccessCompPathFromCrossProject(cpath1, cpath2);
        }, _arg3.data);
      };

      return exists(CurriedLambda(canAccessFromCrossProject)(taccess1), ad2.data[0]);
    } else {
      return true;
    }
  };

  const getApproxFSharpAccessibilityOfMember = __exports.getApproxFSharpAccessibilityOfMember = function (declaringEntity, ilAccess) {
    switch (ilAccess.tag) {
      case 0:
        return taccessPrivate(new CompilationPath(0, [declaringEntity.CompilationPath.ILScopeRef, new List()]));

      case 4:
        return taccessPrivate(declaringEntity.CompilationPath);

      case 5:
      case 2:
      case 3:
        return taccessPublic;

      default:
        return taccessPrivate(new CompilationPath(0, [declaringEntity.CompilationPath.ILScopeRef, new List()]));
    }
  };

  const getApproxFSharpAccessibilityOfEntity = __exports.getApproxFSharpAccessibilityOfEntity = function (entity) {
    const matchValue = metadataOfTycon(entity.Deref);

    if (matchValue.tag === 1) {
      return entity.Accessibility;
    } else {
      const td = matchValue.data.data[2];
      const matchValue_1 = td.Access;
      const $var2 = matchValue_1.tag === 2 ? matchValue_1.data.tag === 5 ? [0] : [2, matchValue_1.data] : matchValue_1.tag === 1 ? [1] : [0];

      switch ($var2[0]) {
        case 0:
          return taccessPublic;

        case 1:
          return taccessPrivate(new CompilationPath(0, [entity.CompilationPath.ILScopeRef, new List()]));

        case 2:
          return getApproxFSharpAccessibilityOfMember(entity, $var2[1]);
      }
    }
  };

  const getLiteralValue = __exports.getLiteralValue = function (_arg1) {
    if (_arg1 == null) {
      return null;
    } else {
      switch (getValue(_arg1).tag) {
        case 1:
          return getValue(_arg1).data;

        case 2:
          return getValue(_arg1).data;

        case 3:
          return getValue(_arg1).data;

        case 4:
          return getValue(_arg1).data;

        case 5:
          return getValue(_arg1).data;

        case 6:
          return getValue(_arg1).data;

        case 7:
          return getValue(_arg1).data;

        case 8:
          return getValue(_arg1).data;

        case 9:
          return getValue(_arg1).data;

        case 10:
          return getValue(_arg1).data;

        case 11:
          return getValue(_arg1).data;

        case 12:
          return getValue(_arg1).data;

        case 13:
          return getValue(_arg1).data;

        case 14:
          return getValue(_arg1).data;

        case 15:
          return getValue(_arg1).data;

        case 16:
        case 17:
          return null;

        default:
          return getValue(_arg1).data;
      }
    }
  };

  const getXmlDocSigForEntity = __exports.getXmlDocSigForEntity = function (cenv, ent) {
    const matchValue = SymbolHelpers.GetXmlDocSigOfEntityRef(cenv.infoReader, ent.Range, ent);

    if (matchValue != null) {
      const docsig = getValue(matchValue)[1];
      return docsig;
    } else {
      return "";
    }
  };

  return __exports;
}({});
export class FSharpDisplayContext {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpDisplayContext",
      properties: {
        Empty: FSharpDisplayContext
      }
    };
  }

  constructor(denv) {
    this.denv = denv;
  }

  Contents(g) {
    return this.denv(g);
  }

  static get Empty() {
    return new FSharpDisplayContext(function (g) {
      return DisplayEnv.Empty(g);
    });
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpDisplayContext", FSharpDisplayContext);
export class FSharpSymbol {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpSymbol",
      properties: {
        Assembly: FSharpAssembly,
        DeclarationLocation: Option(range_3),
        DisplayName: "string",
        FullName: "string",
        ImplementationLocation: Option(range_3),
        IsExplicitlySuppressed: "boolean",
        Item: Item,
        SignatureLocation: Option(range_3)
      }
    };
  }

  constructor(cenv, item, access) {
    this.cenv = cenv;
    this.item = item;
    this.access = access;
  }

  get Assembly() {
    const ccu = defaultArg(SymbolHelpers.ccuOfItem(this.cenv.g, this.Item), this.cenv.thisCcu);
    return new FSharpAssembly(this.cenv, ccu);
  }

  IsAccessible(rights) {
    return this.access(this, rights.ThisCcu, rights.Contents);
  }

  get IsExplicitlySuppressed() {
    return SymbolHelpers.IsExplicitlySuppressed(this.cenv.g, this.Item);
  }

  get FullName() {
    return SymbolHelpers.FullNameOfItem(this.cenv.g, this.Item);
  }

  get DeclarationLocation() {
    return SymbolHelpers.rangeOfItem(this.cenv.g, null, this.Item);
  }

  get ImplementationLocation() {
    return SymbolHelpers.rangeOfItem(this.cenv.g, false, this.Item);
  }

  get SignatureLocation() {
    return SymbolHelpers.rangeOfItem(this.cenv.g, true, this.Item);
  }

  IsEffectivelySameAs(y) {
    if (equals(this, y)) {
      return true;
    } else {
      return ItemsAreEffectivelyEqual(this.cenv.g, this.Item, y.Item);
    }
  }

  GetEffectivelySameAsHash() {
    return ItemsAreEffectivelyEqualHash(this.cenv.g, this.Item);
  }

  get Item() {
    return this.item();
  }

  get DisplayName() {
    return this.item().DisplayName;
  }

  Equals(other) {
    var $var3;

    if ($var3 = this, $var3 === other) {
      return true;
    } else if (other instanceof FSharpSymbol) {
      return ItemsAreEffectivelyEqual(this.cenv.g, this.Item, other.Item);
    } else {
      return false;
    }
  }

  GetHashCode() {
    return hash(this.ImplementationLocation);
  }

  ToString() {
    return "symbol " + (() => {
      try {
        return this.item().DisplayName;
      } catch (matchValue) {
        return "?";
      }
    })();
  }

  static Create_0(g, thisCcu, thisCcuType, tcImports, item) {
    return FSharpSymbol.Create_1(new SymbolEnv(g, thisCcu, thisCcuType, tcImports), item);
  }

  static Create_1(cenv, item) {
    const dflt = function () {
      return new FSharpSymbol(cenv, function () {
        return item;
      }, function (_arg3, _arg2, _arg1) {
        return true;
      });
    };

    let $var4;

    if (item.tag === 0) {
      $var4 = [0, item.data];
    } else if (item.tag === 1) {
      $var4 = [1, item.data[0]];
    } else if (item.tag === 4) {
      $var4 = [2, item.data];
    } else if (item.tag === 5) {
      $var4 = [3, item.data];
    } else if (item.tag === 7) {
      $var4 = [4, item.data];
    } else if (item.tag === 8) {
      $var4 = [5, item.data];
    } else if (item.tag === 9) {
      if (item.data[1].tail != null) {
        $var4 = [6, item.data[1].head];
      } else {
        $var4 = [10];
      }
    } else if (item.tag === 10) {
      if (item.data[1].tail != null) {
        $var4 = [7, item.data[1].head];
      } else {
        $var4 = [10];
      }
    } else if (item.tag === 11) {
      if (item.data[1].tail != null) {
        $var4 = [8, item.data[1].head];
      } else {
        $var4 = [10];
      }
    } else if (item.tag === 13) {
      const activePatternResult49661 = _AbbrevOrAppTy___(item.data);

      if (activePatternResult49661 != null) {
        $var4 = [9, getValue(activePatternResult49661)];
      } else {
        $var4 = [10];
      }
    } else {
      $var4 = [10];
    }

    switch ($var4[0]) {
      case 0:
        return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(4, $var4[1]), item);

      case 1:
        return new FSharpUnionCase(cenv, $var4[1].UnionCaseRef);

      case 2:
        return new FSharpEntity(cenv, $var4[1]);

      case 3:
        return new FSharpField(cenv, new FSharpFieldData(1, $var4[1].RecdFieldRef));

      case 4:
        return new FSharpField(cenv, new FSharpFieldData(0, $var4[1]));

      case 5:
        return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(0, $var4[1]), item);

      case 6:
        return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(1, $var4[1]), item);

      case 7:
        return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(2, $var4[1]), item);

      case 8:
        return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(3, $var4[1]), item);

      case 9:
        return new FSharpEntity(cenv, $var4[1]);

      case 10:
        let $var5;

        if (item.tag === 22) {
          if (item.data.tail != null) {
            $var5 = [0, item.data.head];
          } else {
            $var5 = [1];
          }
        } else if (item.tag === 14) {
          if (item.data[1].tail != null) {
            const activePatternResult49660 = _AbbrevOrAppTy___(item.data[1].head);

            if (activePatternResult49660 != null) {
              $var5 = [0, getValue(activePatternResult49660)];
            } else {
              $var5 = [1];
            }
          } else {
            $var5 = [1];
          }
        } else {
          $var5 = [1];
        }

        switch ($var5[0]) {
          case 0:
            return new FSharpEntity(cenv, $var5[1]);

          case 1:
            const $var6 = item.tag === 18 ? item.data.tail == null ? [9] : [0, item.data.head] : item.tag === 21 ? [1, item.data[0], item.data[1]] : item.tag === 15 ? item.data[2] == null ? [9] : [2, item.data[0], getValue(item.data[2])] : item.tag === 16 ? [3, item.data[1]] : item.tag === 17 ? [4, item.data[1]] : item.tag === 3 ? [5, item.data] : item.tag === 2 ? [6, item.data[0], item.data[2], item.data[1]] : item.tag === 20 ? [7, item.data[0], item.data[1]] : item.tag === 19 ? [8] : item.tag === 7 ? [8] : item.tag === 12 ? [8] : item.tag === 6 ? [8] : item.tag === 22 ? item.data.tail == null ? [9] : [10] : item.tag === 9 ? item.data[1].tail == null ? [9] : [10] : item.tag === 10 ? item.data[1].tail == null ? [9] : [10] : item.tag === 11 ? item.data[1].tail == null ? [9] : [10] : item.tag === 14 ? [9] : item.tag === 13 ? [9] : [10];

            switch ($var6[0]) {
              case 0:
                return new FSharpEntity(cenv, $var6[1]);

              case 1:
                return FSharpSymbol.Create_1(cenv, $var6[2]);

              case 2:
                return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(2, $var6[2]), item);

              case 3:
                return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(4, $var6[1]), item);

              case 4:
                return new FSharpGenericParameter(cenv, $var6[1]);

              case 5:
                return new FSharpActivePatternCase(cenv, $var6[1].ActivePatternInfo, $var6[1].ActivePatternVal.Type, $var6[1].CaseIndex, $var6[1].ActivePatternVal, item);

              case 6:
                return new FSharpActivePatternCase(cenv, $var6[1], $var6[3], $var6[2], null, item);

              case 7:
                return new FSharpParameter(cenv, $var6[2], new ArgReprInfo(new List(), $var6[1]), $var6[1].idRange, false, false, false);

              case 8:
                return dflt();

              case 9:
                return dflt();

              case 10:
                throw new Error("C:/projects/fcs/src/fsharp/symbols/Symbols.fs", 247, 14);
            }

        }

    }
  }

  static GetAccessibility(symbol) {
    if (symbol instanceof FSharpEntity) {
      return symbol.Accessibility;
    } else if (symbol instanceof FSharpField) {
      return symbol.Accessibility;
    } else if (symbol instanceof FSharpUnionCase) {
      return symbol.Accessibility;
    } else if (symbol instanceof FSharpMemberOrFunctionOrValue) {
      return symbol.Accessibility;
    } else {
      return null;
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpSymbol", FSharpSymbol);
export class FSharpEntity extends FSharpSymbol {
  [_Symbol.reflection]() {
    return extendInfo(FSharpEntity, {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpEntity",
      interfaces: [],
      properties: {
        AbbreviatedType: FSharpType,
        AccessPath: "string",
        Accessibility: FSharpAccessibility,
        ActivePatternCases: makeGeneric(List, {
          T: FSharpActivePatternCase
        }),
        AllCompilationPaths: makeGeneric(List, {
          T: "string"
        }),
        AllInterfaces: Interface("System.Collections.Generic.IList"),
        ArrayRank: "number",
        Attributes: Interface("System.Collections.Generic.IList"),
        BaseType: Option(FSharpType),
        CompiledName: "string",
        DeclarationLocation: range_3,
        DeclaredInterfaces: Interface("System.Collections.Generic.IList"),
        DeclaringEntity: Option(FSharpEntity),
        DisplayName: "string",
        Entity: EntityRef,
        FSharpDelegateSignature: FSharpDelegateSignature,
        FSharpFields: Interface("System.Collections.Generic.IList"),
        FullName: "string",
        GenericParameters: Interface("System.Collections.Generic.IList"),
        HasAssemblyCodeRepresentation: "boolean",
        HasFSharpModuleSuffix: "boolean",
        IsArrayType: "boolean",
        IsAttributeType: "boolean",
        IsByRef: "boolean",
        IsClass: "boolean",
        IsDelegate: "boolean",
        IsDisposableType: "boolean",
        IsEnum: "boolean",
        IsFSharp: "boolean",
        IsFSharpAbbreviation: "boolean",
        IsFSharpExceptionDeclaration: "boolean",
        IsFSharpModule: "boolean",
        IsFSharpRecord: "boolean",
        IsFSharpUnion: "boolean",
        IsInterface: "boolean",
        IsMeasure: "boolean",
        IsNamespace: "boolean",
        IsOpaque: "boolean",
        IsUnresolved: "boolean",
        IsValueType: "boolean",
        LogicalName: "string",
        MembersFunctionsAndValues: Interface("System.Collections.Generic.IList"),
        MembersOrValues: Interface("System.Collections.Generic.IList"),
        Namespace: Option("string"),
        NestedEntities: Interface("System.Collections.Generic.IList"),
        QualifiedName: "string",
        RecordFields: Interface("System.Collections.Generic.IList"),
        RepresentationAccessibility: FSharpAccessibility,
        StaticParameters: Interface("System.Collections.Generic.IList"),
        TryFullName: Option("string"),
        UnionCases: Interface("System.Collections.Generic.IList"),
        UsesPrefixDisplay: "boolean",
        XmlDoc: Interface("System.Collections.Generic.IList"),
        XmlDocSig: "string"
      }
    });
  }

  constructor(cenv, entity) {
    super(cenv, () => {
      Impl.checkEntityIsResolved(entity);

      if (entity.IsModuleOrNamespace) {
        return new Item(18, ofArray([entity]));
      } else {
        return new Item(22, ofArray([entity]));
      }
    }, (_this, thisCcu2, ad) => Impl.checkForCrossProjectAccessibility(thisCcu2, ad, cenv.thisCcu, Impl.getApproxFSharpAccessibilityOfEntity(entity)));
    this.cenv = cenv;
    this.entity = entity;
  }

  static [".ctor"](cenv, entity, _arg1) {
    return new FSharpEntity(cenv, entity);
  }

  get Entity() {
    return this.entity;
  }

  get LogicalName() {
    this.checkIsResolved();
    return this.entity.LogicalName;
  }

  get CompiledName() {
    this.checkIsResolved();
    return this.entity.CompiledName;
  }

  get DisplayName() {
    this.checkIsResolved();

    if (this.entity.IsModuleOrNamespace) {
      return this.entity.DemangledModuleOrNamespaceName;
    } else {
      return this.entity.DisplayName;
    }
  }

  get AccessPath() {
    this.checkIsResolved();
    const matchValue = this.entity.CompilationPathOpt;

    if (matchValue != null) {
      if (getValue(matchValue).data[1].tail == null) {
        return "global";
      } else {
        return buildAccessPath(getValue(matchValue));
      }
    } else {
      return "global";
    }
  }

  get DeclaringEntity() {
    const matchValue = this.entity.CompilationPathOpt;

    if (matchValue != null) {
      if (getValue(matchValue).data[1].tail == null) {
        return null;
      } else {
        const matchValue_1 = this.Assembly.Contents.FindEntityByPath(getValue(matchValue).MangledPath);

        if (matchValue_1 == null) {
          const matchValue_2 = this.cenv.thisCcuTyp;

          if (matchValue_2 == null) {
            return null;
          } else {
            const s = new FSharpAssemblySignature(this.cenv, null, null, getValue(matchValue_2));
            return s.FindEntityByPath(getValue(matchValue).MangledPath);
          }
        } else {
          return getValue(matchValue_1);
        }
      }
    } else {
      return null;
    }
  }

  get Namespace() {
    this.checkIsResolved();
    const matchValue = this.entity.CompilationPathOpt;

    if (matchValue != null) {
      if (getValue(matchValue).data[1].tail == null) {
        return null;
      } else if (forAll(_arg6 => _arg6[1].tag === 2 ? true : false, getValue(matchValue).AccessPath)) {
        return buildAccessPath(getValue(matchValue));
      } else if (matchValue != null) {
        return null;
      } else {
        throw new Error("C:/projects/fcs/src/fsharp/symbols/Symbols.fs", 391, 14);
      }
    } else {
      return null;
    }
  }

  get QualifiedName() {
    this.checkIsResolved();

    const fail = () => {
      throw new Error(toText(printf("the type '%s' does not have a qualified name"))(this.LogicalName));
    };

    if (this.entity.IsTypeAbbrev ? true : this.entity.IsNamespace) {
      fail();
    }

    const matchValue = this.entity.CompiledRepresentation;

    if (matchValue.tag === 1) {
      return fail();
    } else {
      return matchValue.data[0].QualifiedName;
    }
  }

  get FullName() {
    this.checkIsResolved();
    const matchValue = this.TryFullName;

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      throw new Error(toText(printf("the type '%s' does not have a qualified name"))(this.LogicalName));
    }
  }

  get TryFullName() {
    if (this.isUnresolved()) {
      return null;
    } else if (this.entity.IsTypeAbbrev) {
      return null;
    } else if (this.entity.IsNamespace) {
      return this.entity.DemangledModuleOrNamespaceName;
    } else {
      const matchValue = this.entity.CompiledRepresentation;

      if (matchValue.tag === 1) {
        return null;
      } else {
        return matchValue.data[0].FullName;
      }
    }
  }

  get DeclarationLocation() {
    this.checkIsResolved();
    return this.entity.Range;
  }

  get GenericParameters() {
    this.checkIsResolved();
    return Impl.makeReadOnlyCollection(map(tp => new FSharpGenericParameter(this.cenv, tp), this.entity.TyparsNoRange));
  }

  get IsMeasure() {
    return this.isResolvedAndFSharp() ? this.entity.TypeOrMeasureKind.Equals(new TyparKind(1)) : false;
  }

  get IsFSharpModule() {
    return this.isResolvedAndFSharp() ? this.entity.IsModule : false;
  }

  get HasFSharpModuleSuffix() {
    return (this.isResolvedAndFSharp() ? this.entity.IsModule : false) ? this.entity.ModuleOrNamespaceType.ModuleOrNamespaceKind.Equals(new ModuleOrNamespaceKind(0)) : false;
  }

  get IsValueType() {
    return this.isResolved() ? this.entity.IsStructOrEnumTycon : false;
  }

  get IsArrayType() {
    return this.isResolved() ? isArrayTyconRef(this.cenv.g, this.entity) : false;
  }

  get ArrayRank() {
    this.checkIsResolved();
    return rankOfArrayTyconRef(this.cenv.g, this.entity) | 0;
  }

  get IsClass() {
    if (this.isResolved()) {
      const matchValue = metadataOfTycon(this.entity.Deref);

      if (matchValue.tag === 1) {
        return this.entity.Deref.IsFSharpClassTycon;
      } else {
        const td = matchValue.data.data[2];
        return td.IsClass;
      }
    } else {
      return false;
    }
  }

  get IsByRef() {
    return this.isResolved() ? tyconRefEq(this.cenv.g, this.cenv.g.byref_tcr, this.entity) : false;
  }

  get IsOpaque() {
    return this.isResolved() ? this.entity.IsHiddenReprTycon : false;
  }

  get IsInterface() {
    return this.isResolved() ? isInterfaceTyconRef(this.entity) : false;
  }

  get IsDelegate() {
    if (this.isResolved()) {
      const matchValue = metadataOfTycon(this.entity.Deref);

      if (matchValue.tag === 1) {
        return this.entity.IsFSharpDelegateTycon;
      } else {
        const td = matchValue.data.data[2];
        return td.IsDelegate;
      }
    } else {
      return false;
    }
  }

  get IsEnum() {
    return this.isResolved() ? this.entity.IsEnumTycon : false;
  }

  get IsFSharpExceptionDeclaration() {
    return this.isResolvedAndFSharp() ? this.entity.IsExceptionDecl : false;
  }

  get IsUnresolved() {
    return this.isUnresolved();
  }

  get IsFSharp() {
    return this.isResolvedAndFSharp();
  }

  get IsFSharpAbbreviation() {
    return this.isResolvedAndFSharp() ? this.entity.IsTypeAbbrev : false;
  }

  get IsFSharpRecord() {
    return this.isResolvedAndFSharp() ? this.entity.IsRecordTycon : false;
  }

  get IsFSharpUnion() {
    return this.isResolvedAndFSharp() ? this.entity.IsUnionTycon : false;
  }

  get HasAssemblyCodeRepresentation() {
    return this.isResolvedAndFSharp() ? this.entity.IsAsmReprTycon ? true : this.entity.IsMeasureableReprTycon : false;
  }

  get FSharpDelegateSignature() {
    this.checkIsResolved();
    const matchValue = this.entity.TypeReprInfo;
    const $var7 = matchValue.tag === 0 ? this.entity.IsFSharpDelegateTycon ? [0, matchValue.data] : [1] : [1];

    switch ($var7[0]) {
      case 0:
        if ($var7[1].fsobjmodel_kind.tag === 3) {
          return new FSharpDelegateSignature(this.cenv, $var7[1].fsobjmodel_kind.data);
        } else {
          throw new Error("not a delegate type");
        }

      case 1:
        throw new Error("not a delegate type");
    }
  }

  get Accessibility() {
    return this.isUnresolved() ? new FSharpAccessibility(taccessPublic) : new FSharpAccessibility(Impl.getApproxFSharpAccessibilityOfEntity(this.entity));
  }

  get RepresentationAccessibility() {
    return this.isUnresolved() ? new FSharpAccessibility(taccessPublic) : new FSharpAccessibility(this.entity.TypeReprAccessibility);
  }

  get DeclaredInterfaces() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection((() => {
      const $var8 = () => toList(delay(() => map_1(ty => new FSharpType(this.cenv, ty), GetImmediateInterfacesOfType(new SkipUnrefInterfaces(0), this.cenv.g, this.cenv.amap, range0, generalizedTyconRef(this.entity)))));

      try {
        return $var8();
      } catch (matchValue) {
        if (matchValue instanceof UnresolvedPathReferenceNoRange) {
          return new List();
        } else {
          throw matchValue;
        }
      }
    })());
  }

  get AllInterfaces() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection((() => {
      const $var9 = () => toList(delay(() => map_1(ty => new FSharpType(this.cenv, ty), AllInterfacesOfType(this.cenv.g, this.cenv.amap, range0, new AllowMultiIntfInstantiations(0), generalizedTyconRef(this.entity)))));

      try {
        return $var9();
      } catch (matchValue) {
        if (matchValue instanceof UnresolvedPathReferenceNoRange) {
          return new List();
        } else {
          throw matchValue;
        }
      }
    })());
  }

  get IsAttributeType() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const ty = generalizedTyconRef(this.entity);

      const $var10 = () => ExistsHeadTypeInEntireHierarchy(this.cenv.g, this.cenv.amap, range0, ty, this.cenv.g.tcref_System_Attribute);

      try {
        return $var10();
      } catch (matchValue) {
        if (matchValue instanceof UnresolvedPathReferenceNoRange) {
          return false;
        } else {
          throw matchValue;
        }
      }
    }
  }

  get IsDisposableType() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const ty = generalizedTyconRef(this.entity);

      const $var11 = () => ExistsHeadTypeInEntireHierarchy(this.cenv.g, this.cenv.amap, range0, ty, this.cenv.g.tcref_System_IDisposable);

      try {
        return $var11();
      } catch (matchValue) {
        if (matchValue instanceof UnresolvedPathReferenceNoRange) {
          return false;
        } else {
          throw matchValue;
        }
      }
    }
  }

  get BaseType() {
    this.checkIsResolved();
    return defaultArg(GetSuperTypeOfType(this.cenv.g, this.cenv.amap, range0, generalizedTyconRef(this.entity)), null, ty => new FSharpType(this.cenv, ty));
  }

  get UsesPrefixDisplay() {
    return this.isUnresolved() ? true : !this.isResolvedAndFSharp() ? true : this.entity.Deref.IsPrefixDisplay;
  }

  get IsNamespace() {
    return this.entity.IsNamespace;
  }

  get MembersOrValues() {
    return this.MembersFunctionsAndValues;
  }

  get MembersFunctionsAndValues() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.protect(() => Impl.makeReadOnlyCollection(toList(delay(() => {
      const patternInput = generalizeTyconRef(this.entity);

      const createMember = minfo => {
        if (minfo.IsConstructor) {
          return new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(3, minfo), new Item(11, [minfo.DisplayName, ofArray([minfo])]));
        } else {
          return new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(2, minfo), new Item(10, [minfo.DisplayName, ofArray([minfo]), null]));
        }
      };

      return append(this.IsFSharpAbbreviation ? empty_1() : this.IsFSharp ? collect(v => !v.Deref.IsClassConstructor ? singleton(createMember(new MethInfo(0, [this.cenv.g, patternInput[1], v, null]))) : empty_1(), this.entity.MembersOfFSharpTyconSorted) : map_1(minfo_1 => createMember(minfo_1), GetImmediateIntrinsicMethInfosOfType(null, new AccessorDomain(2), this.cenv.g, this.cenv.amap, range0, patternInput[1])), delay(() => {
        const props = GetImmediateIntrinsicPropInfosOfType(null, new AccessorDomain(2), this.cenv.g, this.cenv.amap, range0, patternInput[1]);
        const events = this.cenv.infoReader.GetImmediateIntrinsicEventsOfType(null, new AccessorDomain(2), range0, patternInput[1]);
        return append(map_1(pinfo => new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(1, pinfo), new Item(9, [pinfo.PropertyName, ofArray([pinfo])])), props), delay(() => append(map_1(einfo => new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(0, einfo), new Item(8, einfo)), events), delay(() => collect(v_1 => {
          if (v_1.IsExtensionMember) {
            const vref = mkNestedValRef(this.entity, v_1);
            return append(singleton(new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(4, vref), new Item(0, vref))), delay(() => {
              const matchValue = [getValue(v_1.MemberInfo).MemberFlags.MemberKind, v_1.ApparentEnclosingEntity];
              const $var12 = matchValue[0].tag === 3 ? matchValue[1].tag === 0 ? [0] : [2] : matchValue[0].tag === 4 ? matchValue[1].tag === 0 ? [1] : [2] : [2];

              switch ($var12[0]) {
                case 0:
                  const p = matchValue[1].data;
                  const pinfo_1 = new PropInfo(0, [this.cenv.g, generalizedTyconRef(p), vref, null]);
                  return singleton(new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(1, pinfo_1), new Item(9, [pinfo_1.PropertyName, ofArray([pinfo_1])])));

                case 1:
                  const p_1 = matchValue[1].data;
                  const pinfo_2 = new PropInfo(0, [this.cenv.g, generalizedTyconRef(p_1), null, vref]);
                  return singleton(new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(1, pinfo_2), new Item(9, [pinfo_2.PropertyName, ofArray([pinfo_2])])));

                case 2:
                  return empty_1();
              }
            }));
          } else if (!v_1.IsMember) {
            const vref_1 = mkNestedValRef(this.entity, v_1);
            return singleton(new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(4, vref_1), new Item(0, vref_1)));
          } else {
            return empty_1();
          }
        }, this.entity.ModuleOrNamespaceType.AllValsAndMembers)))));
      }));
    }))));
  }

  get XmlDocSig() {
    this.checkIsResolved();
    return Impl.getXmlDocSigForEntity(this.cenv, this.entity);
  }

  get XmlDoc() {
    return this.isUnresolved() ? Impl.makeXmlDoc(XmlDoc.Empty) : Impl.makeXmlDoc(this.entity.XmlDoc);
  }

  get StaticParameters() {
    var matchValue;
    return Impl.makeReadOnlyCollection((matchValue = this.entity.TypeReprInfo, []));
  }

  get NestedEntities() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection(map(x => new FSharpEntity(this.cenv, this.entity.NestedTyconRef(x)), QueueListModule.toList(this.entity.ModuleOrNamespaceType.AllEntities)));
  }

  get UnionCases() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection(map(x => new FSharpUnionCase(this.cenv, x), this.entity.UnionCasesAsRefList));
  }

  get RecordFields() {
    return this.FSharpFields;
  }

  get FSharpFields() {
    if (this.isUnresolved()) {
      return Impl.makeReadOnlyCollection(new List());
    } else if (this.entity.IsILEnumTycon) {
      const patternInput = this.entity.ILTyconInfo;
      const formalTypars = this.entity.Typars(range_3.Zero);
      const formalTypeInst = generalizeTypars(formalTypars);
      const ty = new TType(1, [this.entity, formalTypeInst]);

      const formalTypeInfo = ((arg00, arg10) => ILTypeInfo.FromType(arg00, arg10))(this.cenv.g, ty);

      return Impl.makeReadOnlyCollection(map(tdef => {
        const ilFieldInfo = new ILFieldInfo(0, [formalTypeInfo, tdef]);
        return new FSharpField(this.cenv, new FSharpFieldData(0, ilFieldInfo));
      }, patternInput.data[2].Fields.AsList));
    } else {
      return Impl.makeReadOnlyCollection(map(x => FSharpField[".ctor_1"](this.cenv, mkRecdFieldRef(this.entity, x.Name)), this.entity.AllFieldsAsList));
    }
  }

  get AbbreviatedType() {
    this.checkIsResolved();
    const matchValue = this.entity.TypeAbbrev;

    if (matchValue != null) {
      return new FSharpType(this.cenv, getValue(matchValue));
    } else {
      throw new Error("not a type abbreviation");
    }
  }

  get Attributes() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection(map(a => new FSharpAttribute(this.cenv, a), GetAttribInfosOfEntity(this.cenv.g, this.cenv.amap, range0, this.entity)));
  }

  get AllCompilationPaths() {
    this.checkIsResolved();
    const patternInput = this.entity.CompilationPath;
    const partsList = toList(delay(() => append(singleton(patternInput.data[1]), delay(() => {
      const $var13 = patternInput.data[1].tail != null ? patternInput.data[1].head[0] === "Microsoft" ? patternInput.data[1].head[1].tag === 2 ? this.isDefinedInFSharpCore() ? [0, patternInput.data[1].tail] : [1] : [1] : [1] : [1];

      switch ($var13[0]) {
        case 0:
          return singleton($var13[1]);

        case 1:
          return empty_1();
      }
    }))));

    const mapEachCurrentPath = (paths, path) => {
      if (paths.tail == null) {
        return ofArray([ofArray([path])]);
      } else {
        return map(x => new List(path, x), paths);
      }
    };

    const walkParts = parts => {
      const loop = (currentPaths, parts_1) => {
        loop: while (true) {
          if (parts_1.tail != null) {
            const name = parts_1.head[0];
            const kind = parts_1.head[1];

            if (kind.tag === 0) {
              return toList(delay(() => append(loop(mapEachCurrentPath(currentPaths, name), parts_1.tail), delay(() => loop(mapEachCurrentPath(currentPaths, name.slice(null, name.length - 7 + 1)), parts_1.tail)))));
            } else {
              currentPaths = mapEachCurrentPath(currentPaths, name);
              parts_1 = parts_1.tail;
              continue loop;
            }
          } else {
            return currentPaths;
          }
        }
      };

      return map($var14 => join(".", reverse($var14)), loop(new List(), parts));
    };

    const res = toList(delay(() => collect(parts_2 => walkParts(parts_2), partsList)));
    return res;
  }

  get ActivePatternCases() {
    return Impl.protect(() => map(tupledArg => {
      const item = new Item(3, tupledArg[1]);
      return new FSharpActivePatternCase(this.cenv, tupledArg[1].ActivePatternInfo, tupledArg[1].ActivePatternVal.Type, tupledArg[1].CaseIndex, tupledArg[1].ActivePatternVal, item);
    }, toList(ActivePatternElemsOfModuleOrNamespace(this.Entity))));
  }

  Equals(other) {
    var $var15;

    if ($var15 = this, $var15 === other) {
      return true;
    } else if (other instanceof FSharpEntity) {
      return tyconRefEq(this.cenv.g, this.entity, other.Entity);
    } else {
      return false;
    }
  }

  GetHashCode() {
    this.checkIsResolved();
    return (hash(this.entity.Stamp) << 1) + 1 | 0;
  }

  ToString() {
    return this.CompiledName;
  }

  isResolvedAndFSharp() {
    const matchValue = this.entity;

    const activePatternResult49668 = _ERefLocal_ERefNonLocal_(matchValue);

    if (activePatternResult49668.tag === 1) {
      if (!activePatternResult49668.data.data[0].IsUnresolvedReference) {
        return activePatternResult49668.data.data[0].IsFSharp;
      } else {
        return false;
      }
    } else {
      return this.cenv.thisCcu.IsFSharp;
    }
  }

  isUnresolved() {
    return Impl.entityIsUnresolved(this.entity);
  }

  isResolved() {
    return !this.isUnresolved();
  }

  checkIsResolved() {
    Impl.checkEntityIsResolved(this.entity);
  }

  isDefinedInFSharpCore() {
    const matchValue = ccuOfTyconRef(this.entity);

    if (matchValue != null) {
      return ccuEq(getValue(matchValue), this.cenv.g.fslibCcu);
    } else {
      return false;
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpEntity", FSharpEntity);
export class FSharpUnionCase extends FSharpSymbol {
  [_Symbol.reflection]() {
    return extendInfo(FSharpUnionCase, {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpUnionCase",
      interfaces: [],
      properties: {
        Accessibility: FSharpAccessibility,
        Attributes: Interface("System.Collections.Generic.IList"),
        CompiledName: "string",
        DeclarationLocation: range_3,
        IsUnresolved: "boolean",
        Name: "string",
        ReturnType: FSharpType,
        UnionCaseFields: Interface("System.Collections.Generic.IList"),
        V: UnionCaseRef,
        XmlDoc: Interface("System.Collections.Generic.IList"),
        XmlDocSig: "string"
      }
    });
  }

  constructor(cenv, v) {
    super(cenv, () => {
      Impl.checkEntityIsResolved(v.TyconRef);
      return new Item(1, [new UnionCaseInfo(0, [generalizeTypars(v.TyconRef.TyparsNoRange), v]), false]);
    }, (_this, thisCcu2, ad) => Impl.checkForCrossProjectAccessibility(thisCcu2, ad, cenv.thisCcu, v.UnionCase.Accessibility));
    this.cenv = cenv;
    this.v = v;
  }

  static [".ctor"](cenv, v, _arg2) {
    return new FSharpUnionCase(cenv, v);
  }

  get IsUnresolved() {
    return this.isUnresolved();
  }

  get Name() {
    this.checkIsResolved();
    return this.v.UnionCase.DisplayName;
  }

  get DeclarationLocation() {
    this.checkIsResolved();
    return this.v.Range;
  }

  get UnionCaseFields() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection(mapIndexed((i, _arg5) => new FSharpField(this.cenv, new FSharpFieldData(2, [this.v, i])), this.v.UnionCase.RecdFields));
  }

  get ReturnType() {
    this.checkIsResolved();
    return new FSharpType(this.cenv, this.v.ReturnType);
  }

  get CompiledName() {
    this.checkIsResolved();
    return this.v.UnionCase.CompiledName;
  }

  get XmlDocSig() {
    this.checkIsResolved();
    const unionCase = new UnionCaseInfo(0, [generalizeTypars(this.v.TyconRef.TyparsNoRange), this.v]);
    const matchValue = SymbolHelpers.GetXmlDocSigOfUnionCaseInfo(unionCase);

    if (matchValue != null) {
      const docsig = getValue(matchValue)[1];
      return docsig;
    } else {
      return "";
    }
  }

  get XmlDoc() {
    return this.isUnresolved() ? Impl.makeXmlDoc(XmlDoc.Empty) : Impl.makeXmlDoc(this.v.UnionCase.XmlDoc);
  }

  get Attributes() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection(map(a => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a])), this.v.Attribs));
  }

  get Accessibility() {
    return this.isUnresolved() ? new FSharpAccessibility(taccessPublic) : new FSharpAccessibility(this.v.UnionCase.Accessibility);
  }

  get V() {
    return this.v;
  }

  Equals(other) {
    var $var16;

    if ($var16 = this, $var16 === other) {
      return true;
    } else if (other instanceof FSharpUnionCase) {
      const $var17 = this.v;
      return $var17 === other.V;
    } else {
      return false;
    }
  }

  GetHashCode() {
    return hash(this.v.CaseName);
  }

  ToString() {
    return this.CompiledName;
  }

  isUnresolved() {
    if (Impl.entityIsUnresolved(this.v.TyconRef)) {
      return true;
    } else {
      let copyOfStruct = this.v.TryUnionCase;
      return copyOfStruct.IsNone;
    }
  }

  checkIsResolved() {
    var copyOfStruct;
    Impl.checkEntityIsResolved(this.v.TyconRef);

    if (copyOfStruct = this.v.TryUnionCase, copyOfStruct.IsNone) {
      throw new Error(toText(printf("The union case '%s' could not be found in the target type"))(this.v.CaseName));
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpUnionCase", FSharpUnionCase);
export class FSharpFieldData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpFieldData",
      interfaces: ["FSharpUnion"],
      cases: [["ILField", ILFieldInfo], ["RecdOrClass", RecdFieldRef], ["Union", UnionCaseRef, "number"]]
    };
  }

  get TryRecdField() {
    return this.tag === 2 ? new Choice(0, this.data[0].FieldByIndex(this.data[1])) : this.tag === 0 ? new Choice(1, this.data) : new Choice(0, this.data.RecdField);
  }

  get DeclaringTyconRef() {
    return this.tag === 2 ? this.data[0].TyconRef : this.tag === 0 ? this.data.DeclaringTyconRef : this.data.TyconRef;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpFieldData", FSharpFieldData);
export class FSharpField extends FSharpSymbol {
  [_Symbol.reflection]() {
    return extendInfo(FSharpField, {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpField",
      interfaces: [],
      properties: {
        Accessibility: FSharpAccessibility,
        DeclarationLocation: range_3,
        DeclaringEntity: FSharpEntity,
        FieldAttributes: Interface("System.Collections.Generic.IList"),
        FieldType: FSharpType,
        IsCompilerGenerated: "boolean",
        IsDefaultValue: "boolean",
        IsLiteral: "boolean",
        IsMutable: "boolean",
        IsNameGenerated: "boolean",
        IsStatic: "boolean",
        IsUnresolved: "boolean",
        IsVolatile: "boolean",
        LiteralValue: Option(Any),
        Name: "string",
        PropertyAttributes: Interface("System.Collections.Generic.IList"),
        V: FSharpFieldData,
        XmlDoc: Interface("System.Collections.Generic.IList"),
        XmlDocSig: "string"
      }
    });
  }

  constructor(cenv, d) {
    super(cenv, () => {
      if (d.tag === 2) {
        return new Item(1, [new UnionCaseInfo(0, [generalizeTypars(d.data[0].TyconRef.TyparsNoRange), d.data[0]]), false]);
      } else if (d.tag === 0) {
        return new Item(7, d.data);
      } else {
        Impl.checkEntityIsResolved(d.data.TyconRef);
        return new Item(5, new RecdFieldInfo(0, [generalizeTypars(d.data.TyconRef.TyparsNoRange), d.data]));
      }
    }, (_this, thisCcu2, ad) => Impl.checkForCrossProjectAccessibility(thisCcu2, ad, cenv.thisCcu, _this.Accessibility.Contents));
    this.cenv = cenv;
    this.d = d;
  }

  static [".ctor_0"](cenv, ucref, n) {
    return new FSharpField(cenv, new FSharpFieldData(2, [ucref, n]));
  }

  static [".ctor_1"](cenv, rfref) {
    return new FSharpField(cenv, new FSharpFieldData(1, rfref));
  }

  get DeclaringEntity() {
    return new FSharpEntity(this.cenv, this.d.DeclaringTyconRef);
  }

  get IsUnresolved() {
    return this.isUnresolved();
  }

  get IsMutable() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 1) {
        if (!matchValue.data.IsInitOnly) {
          return CurriedLambda(() => matchValue.data.LiteralValue == null)();
        } else {
          return false;
        }
      } else {
        return matchValue.data.IsMutable;
      }
    }
  }

  get IsLiteral() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 1) {
        return CurriedLambda(() => matchValue.data.LiteralValue != null)();
      } else {
        return CurriedLambda(() => matchValue.data.LiteralValue != null)();
      }
    }
  }

  get LiteralValue() {
    if (this.isUnresolved()) {
      return null;
    } else {
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 1) {
        return null;
      } else {
        return Impl.getLiteralValue(matchValue.data.LiteralValue);
      }
    }
  }

  get IsVolatile() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 1) {
        return false;
      } else {
        return matchValue.data.IsVolatile;
      }
    }
  }

  get IsDefaultValue() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 1) {
        return false;
      } else {
        return matchValue.data.IsZeroInit;
      }
    }
  }

  get XmlDocSig() {
    this.checkIsResolved();
    let xmlsig;

    if (this.d.tag === 2) {
      const unionCase = new UnionCaseInfo(0, [generalizeTypars(this.d.data[0].TyconRef.TyparsNoRange), this.d.data[0]]);
      xmlsig = SymbolHelpers.GetXmlDocSigOfUnionCaseInfo(unionCase);
    } else if (this.d.tag === 0) {
      xmlsig = SymbolHelpers.GetXmlDocSigOfILFieldInfo(this.cenv.infoReader, range0, this.d.data);
    } else {
      const recd = new RecdFieldInfo(0, [generalizeTypars(this.d.data.TyconRef.TyparsNoRange), this.d.data]);
      xmlsig = SymbolHelpers.GetXmlDocSigOfRecdFieldInfo(recd);
    }

    if (xmlsig != null) {
      const docsig = getValue(xmlsig)[1];
      return docsig;
    } else {
      return "";
    }
  }

  get XmlDoc() {
    var matchValue;
    return this.isUnresolved() ? Impl.makeXmlDoc(XmlDoc.Empty) : Impl.makeXmlDoc((matchValue = this.d.TryRecdField, matchValue.tag === 1 ? XmlDoc.Empty : matchValue.data.XmlDoc));
  }

  get FieldType() {
    this.checkIsResolved();
    let fty;
    const matchValue = this.d.TryRecdField;

    if (matchValue.tag === 1) {
      fty = matchValue.data.FieldType(this.cenv.amap, range0);
    } else {
      fty = matchValue.data.FormalType;
    }

    return new FSharpType(this.cenv, fty);
  }

  get IsStatic() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 1) {
        return matchValue.data.IsStatic;
      } else {
        return matchValue.data.IsStatic;
      }
    }
  }

  get Name() {
    this.checkIsResolved();
    const matchValue = this.d.TryRecdField;

    if (matchValue.tag === 1) {
      return matchValue.data.FieldName;
    } else {
      return matchValue.data.Name;
    }
  }

  get IsCompilerGenerated() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 1) {
        return false;
      } else {
        return matchValue.data.IsCompilerGenerated;
      }
    }
  }

  get IsNameGenerated() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 0) {
        return matchValue.data.rfield_name_generated;
      } else {
        return false;
      }
    }
  }

  get DeclarationLocation() {
    this.checkIsResolved();
    const matchValue = this.d.TryRecdField;

    if (matchValue.tag === 1) {
      return range0;
    } else {
      return matchValue.data.Range;
    }
  }

  get FieldAttributes() {
    var matchValue;
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection((matchValue = this.d.TryRecdField, matchValue.tag === 1 ? new List() : map(a => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a])), matchValue.data.FieldAttribs)));
  }

  get PropertyAttributes() {
    var matchValue;
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection((matchValue = this.d.TryRecdField, matchValue.tag === 1 ? new List() : map(a => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a])), matchValue.data.PropertyAttribs)));
  }

  get Accessibility() {
    if (this.isUnresolved()) {
      return new FSharpAccessibility(taccessPublic);
    } else {
      let access;
      const matchValue = this.d.TryRecdField;

      if (matchValue.tag === 1) {
        access = taccessPublic;
      } else {
        access = matchValue.data.Accessibility;
      }

      return new FSharpAccessibility(access);
    }
  }

  get V() {
    return this.d;
  }

  Equals(other) {
    var $var18;
    var objectArg;

    if ($var18 = this, $var18 === other) {
      return true;
    } else if (other instanceof FSharpField) {
      const matchValue = [this.d, other.V];
      const $var19 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [0, matchValue[0].data, matchValue[1].data] : [2] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [1, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [2] : [2];

      switch ($var19[0]) {
        case 0:
          return recdFieldRefOrder.Compare($var19[1], $var19[2]) === 0;

        case 1:
          if ((objectArg = this.cenv.g, (arg00, arg10) => objectArg.unionCaseRefEq(arg00, arg10))($var19[3], $var19[4])) {
            return $var19[1] === $var19[2];
          } else {
            return false;
          }

        case 2:
          return false;
      }
    } else {
      return false;
    }
  }

  GetHashCode() {
    return hash(this.Name);
  }

  ToString() {
    return "field " + this.Name;
  }

  isUnresolved() {
    if (Impl.entityIsUnresolved(this.d.DeclaringTyconRef)) {
      return true;
    } else {
      const matchValue = this.d;

      if (matchValue.tag === 2) {
        let copyOfStruct = matchValue.data[0].TryUnionCase;
        return copyOfStruct.IsNone;
      } else if (matchValue.tag === 0) {
        return false;
      } else {
        let copyOfStruct_1 = matchValue.data.TryRecdField;
        return copyOfStruct_1.IsNone;
      }
    }
  }

  checkIsResolved() {
    var copyOfStruct;
    var copyOfStruct_1;
    Impl.checkEntityIsResolved(this.d.DeclaringTyconRef);
    const matchValue = this.d;

    if (matchValue.tag === 2) {
      if (copyOfStruct = matchValue.data[0].TryUnionCase, copyOfStruct.IsNone) {
        throw new Error(toText(printf("The union case '%s' could not be found in the target type"))(matchValue.data[0].CaseName));
      }
    } else if (matchValue.tag === 0) {} else if (copyOfStruct_1 = matchValue.data.TryRecdField, copyOfStruct_1.IsNone) {
      throw new Error(toText(printf("The record field '%s' could not be found in the target type"))(matchValue.data.FieldName));
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpField", FSharpField);
export class FSharpAccessibilityRights {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAccessibilityRights",
      properties: {
        Contents: AccessorDomain,
        ThisCcu: CcuThunk
      }
    };
  }

  constructor(thisCcu, ad) {
    this.thisCcu = thisCcu;
    this.ad = ad;
  }

  get ThisCcu() {
    return this.thisCcu;
  }

  get Contents() {
    return this.ad;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAccessibilityRights", FSharpAccessibilityRights);
export class FSharpActivePatternCase extends FSharpSymbol {
  [_Symbol.reflection]() {
    return extendInfo(FSharpActivePatternCase, {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpActivePatternCase",
      interfaces: [],
      properties: {
        DeclarationLocation: range_3,
        Group: FSharpActivePatternGroup,
        Index: "number",
        Name: "string",
        XmlDoc: Interface("System.Collections.Generic.IList"),
        XmlDocSig: "string"
      }
    });
  }

  constructor(cenv, apinfo, typ, n, valOpt, item2) {
    super(cenv, () => item2, (_arg8, _arg7, _arg6) => true);
    this.cenv = cenv;
    this.apinfo = apinfo;
    this.typ = typ;
    this.n = n | 0;
    this.valOpt = valOpt;
  }

  get Name() {
    return item_1(this.n, this.apinfo.ActiveTags);
  }

  get Index() {
    return this.n;
  }

  get DeclarationLocation() {
    return item_1(this.n, this.apinfo.ActiveTagsWithRanges)[1];
  }

  get Group() {
    return new FSharpActivePatternGroup(this.cenv, this.apinfo, this.typ, this.valOpt);
  }

  get XmlDoc() {
    return Impl.makeXmlDoc(defaultArg(defaultArg(this.valOpt, null, vref => vref.XmlDoc), XmlDoc.Empty));
  }

  get XmlDocSig() {
    const xmlsig = this.valOpt == null ? null : SymbolHelpers.GetXmlDocSigOfValRef(this.cenv.g, getValue(this.valOpt));

    if (xmlsig != null) {
      const docsig = getValue(xmlsig)[1];
      return docsig;
    } else {
      return "";
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpActivePatternCase", FSharpActivePatternCase);
export class FSharpActivePatternGroup {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpActivePatternGroup",
      properties: {
        DeclaringEntity: Option(FSharpEntity),
        IsTotal: "boolean",
        Name: Option("string"),
        Names: Interface("System.Collections.Generic.IList"),
        OverallType: FSharpType
      }
    };
  }

  constructor(cenv, apinfo, typ, valOpt) {
    this.cenv = cenv;
    this.apinfo = apinfo;
    this.typ = typ;
    this.valOpt = valOpt;
  }

  get Name() {
    return defaultArg(this.valOpt, null, vref => vref.LogicalName);
  }

  get Names() {
    return Impl.makeReadOnlyCollection(ActivePatternInfo_get_Names.bind(this.apinfo)());
  }

  get IsTotal() {
    return this.apinfo.IsTotal;
  }

  get OverallType() {
    return new FSharpType(this.cenv, this.typ);
  }

  get DeclaringEntity() {
    return defaultArg(this.valOpt, null, vref => {
      const matchValue = vref.DeclaringEntity;

      if (matchValue.tag === 0) {
        return new FSharpEntity(this.cenv, matchValue.data);
      } else {
        return null;
      }
    });
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpActivePatternGroup", FSharpActivePatternGroup);
export class FSharpGenericParameter extends FSharpSymbol {
  [_Symbol.reflection]() {
    return extendInfo(FSharpGenericParameter, {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameter",
      interfaces: [],
      properties: {
        Attributes: Interface("System.Collections.Generic.IList"),
        Constraints: Interface("System.Collections.Generic.IList"),
        DeclarationLocation: range_3,
        IsCompilerGenerated: "boolean",
        IsMeasure: "boolean",
        IsSolveAtCompileTime: "boolean",
        Name: "string",
        V: Typar,
        XmlDoc: Interface("System.Collections.Generic.IList")
      }
    });
  }

  constructor(cenv, v) {
    super(cenv, () => new Item(17, [v.Name, v]), (_arg10, _arg9, _ad) => true);
    this.cenv = cenv;
    this.v = v;
  }

  static [".ctor"](cenv, v, _arg3) {
    return new FSharpGenericParameter(cenv, v);
  }

  get Name() {
    return this.v.DisplayName;
  }

  get DeclarationLocation() {
    return this.v.Range;
  }

  get IsCompilerGenerated() {
    return this.v.IsCompilerGenerated;
  }

  get IsMeasure() {
    return this.v.Kind.Equals(new TyparKind(1));
  }

  get XmlDoc() {
    return Impl.makeXmlDoc(this.v.typar_xmldoc);
  }

  get IsSolveAtCompileTime() {
    return this.v.StaticReq.Equals(new TyparStaticReq(1));
  }

  get Attributes() {
    return Impl.makeReadOnlyCollection(map(a => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a])), this.v.Attribs));
  }

  get Constraints() {
    return Impl.makeReadOnlyCollection(map(a => new FSharpGenericParameterConstraint(this.cenv, a), this.v.Constraints));
  }

  get V() {
    return this.v;
  }

  Equals(other) {
    var $var20;

    if ($var20 = this, $var20 === other) {
      return true;
    } else if (other instanceof FSharpGenericParameter) {
      return typarRefEq(this.v, other.V);
    } else {
      return false;
    }
  }

  GetHashCode() {
    return hash(this.v.Stamp);
  }

  ToString() {
    return "generic parameter " + this.Name;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameter", FSharpGenericParameter);
export class FSharpDelegateSignature {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpDelegateSignature",
      properties: {
        DelegateArguments: Interface("System.Collections.Generic.IList"),
        DelegateReturnType: FSharpType
      }
    };
  }

  constructor(cenv, info) {
    this.cenv = cenv;
    this.info = info;
  }

  get DelegateArguments() {
    return Impl.makeReadOnlyCollection(map(_arg11 => [_arg11.data[0], new FSharpType(this.cenv, _arg11.data[1])], this.info.FormalParams.head));
  }

  get DelegateReturnType() {
    const matchValue = this.info.FormalReturnType;

    if (matchValue != null) {
      return new FSharpType(this.cenv, getValue(matchValue));
    } else {
      return new FSharpType(this.cenv, this.cenv.g.unit_ty);
    }
  }

  ToString() {
    return "<delegate signature>";
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpDelegateSignature", FSharpDelegateSignature);
export class FSharpAbstractParameter {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAbstractParameter",
      properties: {
        Attributes: Interface("System.Collections.Generic.IList"),
        IsInArg: "boolean",
        IsOptionalArg: "boolean",
        IsOutArg: "boolean",
        Name: Option("string"),
        Type: FSharpType
      }
    };
  }

  constructor(cenv, info) {
    this.cenv = cenv;
    this.info = info;
  }

  get Name() {
    return this.info.data[0];
  }

  get Type() {
    return new FSharpType(this.cenv, this.info.Type);
  }

  get IsInArg() {
    return this.info.data[2];
  }

  get IsOutArg() {
    return this.info.data[3];
  }

  get IsOptionalArg() {
    return this.info.data[4];
  }

  get Attributes() {
    return Impl.makeReadOnlyCollection(map(a => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a])), this.info.data[5]));
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAbstractParameter", FSharpAbstractParameter);
export class FSharpAbstractSignature {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAbstractSignature",
      properties: {
        AbstractArguments: Interface("System.Collections.Generic.IList"),
        AbstractReturnType: FSharpType,
        DeclaringType: FSharpType,
        DeclaringTypeGenericParameters: Interface("System.Collections.Generic.IList"),
        MethodGenericParameters: Interface("System.Collections.Generic.IList"),
        Name: "string"
      }
    };
  }

  constructor(cenv, info) {
    this.cenv = cenv;
    this.info = info;
  }

  static [".ctor"](cenv, info, _arg4) {
    return new FSharpAbstractSignature(cenv, info);
  }

  get AbstractArguments() {
    return Impl.makeReadOnlyCollection(map($var21 => Impl.makeReadOnlyCollection(map(p => new FSharpAbstractParameter(this.cenv, p), $var21)), this.info.FormalParams));
  }

  get AbstractReturnType() {
    const matchValue = this.info.FormalReturnType;

    if (matchValue != null) {
      return new FSharpType(this.cenv, getValue(matchValue));
    } else {
      return new FSharpType(this.cenv, this.cenv.g.unit_ty);
    }
  }

  get DeclaringTypeGenericParameters() {
    return Impl.makeReadOnlyCollection(map(t => new FSharpGenericParameter(this.cenv, t), this.info.ClassTypars));
  }

  get MethodGenericParameters() {
    return Impl.makeReadOnlyCollection(map(t => new FSharpGenericParameter(this.cenv, t), this.info.MethodTypars));
  }

  get Name() {
    return this.info.Name;
  }

  get DeclaringType() {
    return new FSharpType(this.cenv, this.info.ImplementedType);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAbstractSignature", FSharpAbstractSignature);
export class FSharpGenericParameterMemberConstraint {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameterMemberConstraint",
      properties: {
        MemberArgumentTypes: Interface("System.Collections.Generic.IList"),
        MemberIsStatic: "boolean",
        MemberName: "string",
        MemberReturnType: FSharpType,
        MemberSources: Interface("System.Collections.Generic.IList")
      }
    };
  }

  constructor(cenv, info) {
    this.cenv = cenv;
    this.tys = info.data[0];
    this.rty = info.data[4];
    this.nm = info.data[1];
    this.flags = info.data[2];
    this.atys = info.data[3];
  }

  get MemberSources() {
    return Impl.makeReadOnlyCollection(map(ty => new FSharpType(this.cenv, ty), this.tys));
  }

  get MemberName() {
    return this.nm;
  }

  get MemberIsStatic() {
    return !this.flags.IsInstance;
  }

  get MemberArgumentTypes() {
    return Impl.makeReadOnlyCollection(map(ty => new FSharpType(this.cenv, ty), this.atys));
  }

  get MemberReturnType() {
    return this.rty != null ? new FSharpType(this.cenv, getValue(this.rty)) : new FSharpType(this.cenv, this.cenv.g.unit_ty);
  }

  ToString() {
    return "<member constraint info>";
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameterMemberConstraint", FSharpGenericParameterMemberConstraint);
export class FSharpGenericParameterDelegateConstraint {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameterDelegateConstraint",
      properties: {
        DelegateReturnType: FSharpType,
        DelegateTupledArgumentType: FSharpType
      }
    };
  }

  constructor(cenv, tupledArgTyp, rty) {
    this.cenv = cenv;
    this.tupledArgTyp = tupledArgTyp;
    this.rty = rty;
  }

  get DelegateTupledArgumentType() {
    return new FSharpType(this.cenv, this.tupledArgTyp);
  }

  get DelegateReturnType() {
    return new FSharpType(this.cenv, this.rty);
  }

  ToString() {
    return "<delegate constraint info>";
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameterDelegateConstraint", FSharpGenericParameterDelegateConstraint);
export class FSharpGenericParameterDefaultsToConstraint {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameterDefaultsToConstraint",
      properties: {
        DefaultsToPriority: "number",
        DefaultsToTarget: FSharpType
      }
    };
  }

  constructor(cenv, pri, ty) {
    this.cenv = cenv;
    this.pri = pri | 0;
    this.ty = ty;
  }

  get DefaultsToPriority() {
    return this.pri;
  }

  get DefaultsToTarget() {
    return new FSharpType(this.cenv, this.ty);
  }

  ToString() {
    return "<defaults-to constraint info>";
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameterDefaultsToConstraint", FSharpGenericParameterDefaultsToConstraint);
export class FSharpGenericParameterConstraint {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameterConstraint",
      properties: {
        CoercesToTarget: FSharpType,
        DefaultsToConstraintData: FSharpGenericParameterDefaultsToConstraint,
        DelegateConstraintData: FSharpGenericParameterDelegateConstraint,
        EnumConstraintTarget: FSharpType,
        IsCoercesToConstraint: "boolean",
        IsComparisonConstraint: "boolean",
        IsDefaultsToConstraint: "boolean",
        IsDelegateConstraint: "boolean",
        IsEnumConstraint: "boolean",
        IsEqualityConstraint: "boolean",
        IsMemberConstraint: "boolean",
        IsNonNullableValueTypeConstraint: "boolean",
        IsReferenceTypeConstraint: "boolean",
        IsRequiresDefaultConstructorConstraint: "boolean",
        IsSimpleChoiceConstraint: "boolean",
        IsSupportsNullConstraint: "boolean",
        IsUnmanagedConstraint: "boolean",
        MemberConstraintData: FSharpGenericParameterMemberConstraint,
        SimpleChoices: Interface("System.Collections.Generic.IList")
      }
    };
  }

  constructor(cenv, cx) {
    this.cenv = cenv;
    this.cx = cx;
  }

  get IsCoercesToConstraint() {
    return this.cx.tag === 0 ? true : false;
  }

  get CoercesToTarget() {
    if (this.cx.tag === 0) {
      return new FSharpType(this.cenv, this.cx.data[0]);
    } else {
      throw new Error("not a coerces-to constraint");
    }
  }

  get IsDefaultsToConstraint() {
    return this.cx.tag === 1 ? true : false;
  }

  get DefaultsToConstraintData() {
    if (this.cx.tag === 1) {
      return new FSharpGenericParameterDefaultsToConstraint(this.cenv, this.cx.data[0], this.cx.data[1]);
    } else {
      throw new Error("not a 'defaults-to' constraint");
    }
  }

  get IsSupportsNullConstraint() {
    return this.cx.tag === 2 ? true : false;
  }

  get IsMemberConstraint() {
    return this.cx.tag === 3 ? true : false;
  }

  get MemberConstraintData() {
    if (this.cx.tag === 3) {
      return new FSharpGenericParameterMemberConstraint(this.cenv, this.cx.data[0]);
    } else {
      throw new Error("not a member constraint");
    }
  }

  get IsNonNullableValueTypeConstraint() {
    return this.cx.tag === 4 ? true : false;
  }

  get IsReferenceTypeConstraint() {
    return this.cx.tag === 5 ? true : false;
  }

  get IsSimpleChoiceConstraint() {
    return this.cx.tag === 6 ? true : false;
  }

  get SimpleChoices() {
    if (this.cx.tag === 6) {
      return Impl.makeReadOnlyCollection(map(ty => new FSharpType(this.cenv, ty), this.cx.data[0]));
    } else {
      throw new Error("incorrect constraint kind");
    }
  }

  get IsRequiresDefaultConstructorConstraint() {
    return this.cx.tag === 7 ? true : false;
  }

  get IsEnumConstraint() {
    return this.cx.tag === 8 ? true : false;
  }

  get EnumConstraintTarget() {
    if (this.cx.tag === 8) {
      return new FSharpType(this.cenv, this.cx.data[0]);
    } else {
      throw new Error("incorrect constraint kind");
    }
  }

  get IsComparisonConstraint() {
    return this.cx.tag === 9 ? true : false;
  }

  get IsEqualityConstraint() {
    return this.cx.tag === 10 ? true : false;
  }

  get IsUnmanagedConstraint() {
    return this.cx.tag === 12 ? true : false;
  }

  get IsDelegateConstraint() {
    return this.cx.tag === 11 ? true : false;
  }

  get DelegateConstraintData() {
    if (this.cx.tag === 11) {
      return new FSharpGenericParameterDelegateConstraint(this.cenv, this.cx.data[0], this.cx.data[1]);
    } else {
      throw new Error("not a delegate constraint");
    }
  }

  ToString() {
    return "<type constraint>";
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGenericParameterConstraint", FSharpGenericParameterConstraint);
export class FSharpInlineAnnotation {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpInlineAnnotation",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["PseudoValue"], ["AlwaysInline"], ["OptionalInline"], ["NeverInline"], ["AggressiveInline"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpInlineAnnotation", FSharpInlineAnnotation);
export class FSharpMemberOrValData {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMemberOrValData",
      interfaces: ["FSharpUnion"],
      cases: [["E", EventInfo], ["P", PropInfo], ["M", MethInfo], ["C", MethInfo], ["V", ValRef]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMemberOrValData", FSharpMemberOrValData);
export class FSharpMemberOrFunctionOrValue extends FSharpSymbol {
  [_Symbol.reflection]() {
    return extendInfo(FSharpMemberOrFunctionOrValue, {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMemberOrFunctionOrValue",
      interfaces: [],
      properties: {
        Accessibility: FSharpAccessibility,
        ApparentEnclosingEntity: FSharpEntity,
        Attributes: Interface("System.Collections.Generic.IList"),
        CompiledName: "string",
        CurriedParameterGroups: Interface("System.Collections.Generic.IList"),
        Data: FSharpMemberOrValData,
        DeclarationLocation: range_3,
        DeclarationLocationOpt: Option(range_3),
        DeclaringEntity: Option(FSharpEntity),
        DisplayName: "string",
        EventAddMethod: FSharpMemberOrFunctionOrValue,
        EventDelegateType: FSharpType,
        EventForFSharpProperty: Option(FSharpMemberOrFunctionOrValue),
        EventIsStandard: "boolean",
        EventRemoveMethod: FSharpMemberOrFunctionOrValue,
        FullType: FSharpType,
        GenericParameters: Interface("System.Collections.Generic.IList"),
        GetterMethod: FSharpMemberOrFunctionOrValue,
        HasGetterMethod: "boolean",
        HasSetterMethod: "boolean",
        ImplementedAbstractSignatures: Interface("System.Collections.Generic.IList"),
        InlineAnnotation: FSharpInlineAnnotation,
        IsActivePattern: "boolean",
        IsBaseValue: "boolean",
        IsCompilerGenerated: "boolean",
        IsConstructor: "boolean",
        IsConstructorThisValue: "boolean",
        IsDispatchSlot: "boolean",
        IsEvent: "boolean",
        IsEventAddMethod: "boolean",
        IsEventRemoveMethod: "boolean",
        IsExplicitInterfaceImplementation: "boolean",
        IsExtensionMember: "boolean",
        IsGetterMethod: "boolean",
        IsImplicitConstructor: "boolean",
        IsInstanceMember: "boolean",
        IsInstanceMemberInCompiledCode: "boolean",
        IsMember: "boolean",
        IsMemberThisValue: "boolean",
        IsModuleValueOrMember: "boolean",
        IsMutable: "boolean",
        IsOverrideOrExplicitInterfaceImplementation: "boolean",
        IsOverrideOrExplicitMember: "boolean",
        IsProperty: "boolean",
        IsPropertyGetterMethod: "boolean",
        IsPropertySetterMethod: "boolean",
        IsSetterMethod: "boolean",
        IsTypeFunction: "boolean",
        IsUnresolved: "boolean",
        IsValCompiledAsMethod: "boolean",
        IsValue: "boolean",
        LiteralValue: Option(Any),
        LogicalName: "string",
        ReturnParameter: FSharpParameter,
        SetterMethod: FSharpMemberOrFunctionOrValue,
        XmlDoc: Interface("System.Collections.Generic.IList"),
        XmlDocSig: "string"
      }
    });
  }

  constructor(cenv, d, item2) {
    super(cenv, () => item2, (_this, thisCcu2, ad) => {
      const _this_1 = _this;
      return Impl.checkForCrossProjectAccessibility(thisCcu2, ad, cenv.thisCcu, _this_1.Accessibility.Contents);
    });
    this.cenv = cenv;
    this.d = d;
    this.item2 = item2;
  }

  static [".ctor_0"](cenv, vref) {
    return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(4, vref), new Item(0, vref));
  }

  static [".ctor_1"](cenv, minfo) {
    return new FSharpMemberOrFunctionOrValue(cenv, new FSharpMemberOrValData(2, minfo), new Item(10, [minfo.LogicalName, ofArray([minfo]), null]));
  }

  get IsUnresolved() {
    return this.isUnresolved();
  }

  get DeclarationLocationOpt() {
    this.checkIsResolved();
    const matchValue = this.fsharpInfo();

    if (matchValue == null) {
      return super.DeclarationLocation;
    } else {
      return getValue(matchValue).Range;
    }
  }

  Overloads(matchParameterNumber) {
    this.checkIsResolved();

    if (this.d.tag === 2) {
      if (this.item2.tag === 10) {
        const methods = matchParameterNumber ? filter(methodInfo => !methodInfo.NumArgs.Equals(this.d.data.NumArgs), this.item2.data[1]) : this.item2.data[1];
        return Impl.makeReadOnlyCollection(map(mi => new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(2, mi), this.item2), methods));
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  get DeclarationLocation() {
    this.checkIsResolved();
    const matchValue = this.DeclarationLocationOpt;

    if (matchValue == null) {
      throw new Error("DeclarationLocation property not available");
    } else {
      return getValue(matchValue);
    }
  }

  get DeclaringEntity() {
    this.checkIsResolved();
    const $var22 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var22[0]) {
      case 0:
        return new FSharpEntity(this.cenv, this.d.data.DeclaringTyconRef);

      case 1:
        return new FSharpEntity(this.cenv, this.d.data.DeclaringTyconRef);

      case 2:
        return new FSharpEntity(this.cenv, $var22[1].DeclaringTyconRef);

      case 3:
        const matchValue = this.d.data.DeclaringEntity;

        if (matchValue.tag === 0) {
          return new FSharpEntity(this.cenv, matchValue.data);
        } else {
          return null;
        }

    }
  }

  get ApparentEnclosingEntity() {
    this.checkIsResolved();
    const $var23 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var23[0]) {
      case 0:
        return new FSharpEntity(this.cenv, this.d.data.ApparentEnclosingTyconRef);

      case 1:
        return new FSharpEntity(this.cenv, this.d.data.ApparentEnclosingTyconRef);

      case 2:
        return new FSharpEntity(this.cenv, $var23[1].ApparentEnclosingTyconRef);

      case 3:
        const matchValue = this.d.data.ApparentEnclosingEntity;

        if (matchValue.tag === 0) {
          return new FSharpEntity(this.cenv, matchValue.data);
        } else {
          throw new Error("the value or member doesn't have a logical parent");
        }

    }
  }

  get GenericParameters() {
    this.checkIsResolved();
    let tps;
    const $var24 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var24[0]) {
      case 0:
        tps = new List();
        break;

      case 1:
        tps = new List();
        break;

      case 2:
        tps = $var24[1].FormalMethodTypars;
        break;

      case 3:
        tps = this.d.data.Typars;
        break;
    }

    return Impl.makeReadOnlyCollection(map(tp => new FSharpGenericParameter(this.cenv, tp), tps));
  }

  get FullType() {
    var arg00_;
    this.checkIsResolved();
    let ty;
    const $var25 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var25[0]) {
      case 0:
        ty = this.d.data.GetDelegateType(this.cenv.amap, range0);
        break;

      case 1:
        ty = this.d.data.GetPropertyType(this.cenv.amap, range0);
        break;

      case 2:
        const rty = $var25[1].GetFSharpReturnTy(this.cenv.amap, range0, $var25[1].FormalMethodInst);
        const argtysl = $var25[1].GetParamTypes(this.cenv.amap, range0, $var25[1].FormalMethodInst);
        ty = mkIteratedFunTy(map((arg00_ = this.cenv.g, arg10_ => mkRefTupledTy(arg00_, arg10_)), argtysl), rty);
        break;

      case 3:
        ty = this.d.data.TauType;
        break;
    }

    return new FSharpType(this.cenv, ty);
  }

  get HasGetterMethod() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 0:
        case 2:
        case 3:
        case 4:
          return false;

        default:
          return this.d.data.HasGetter;
      }
    }
  }

  get GetterMethod() {
    this.checkIsResolved();

    switch (this.d.tag) {
      case 0:
      case 2:
      case 3:
      case 4:
        throw new Error("the value or member doesn't have an associated getter method");

      default:
        const minfo = this.d.data.GetterMethod;
        return this.mkMethSym(minfo);
    }
  }

  get HasSetterMethod() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 0:
        case 2:
        case 3:
        case 4:
          return false;

        default:
          return this.d.data.HasSetter;
      }
    }
  }

  get SetterMethod() {
    this.checkIsResolved();

    switch (this.d.tag) {
      case 0:
      case 2:
      case 3:
      case 4:
        throw new Error("the value or member doesn't have an associated setter method");

      default:
        const minfo = this.d.data.SetterMethod;
        return this.mkMethSym(minfo);
    }
  }

  get EventAddMethod() {
    this.checkIsResolved();

    switch (this.d.tag) {
      case 1:
      case 2:
      case 3:
      case 4:
        throw new Error("the value or member doesn't have an associated add method");

      default:
        const minfo = this.d.data.AddMethod;
        return this.mkMethSym(minfo);
    }
  }

  get EventRemoveMethod() {
    this.checkIsResolved();

    switch (this.d.tag) {
      case 1:
      case 2:
      case 3:
      case 4:
        throw new Error("the value or member doesn't have an associated remove method");

      default:
        const minfo = this.d.data.RemoveMethod;
        return this.mkMethSym(minfo);
    }
  }

  get EventDelegateType() {
    this.checkIsResolved();

    switch (this.d.tag) {
      case 1:
      case 2:
      case 3:
      case 4:
        throw new Error("the value or member doesn't have an associated event delegate type");

      default:
        return new FSharpType(this.cenv, this.d.data.GetDelegateType(this.cenv.amap, range0));
    }
  }

  get EventIsStandard() {
    this.checkIsResolved();

    switch (this.d.tag) {
      case 1:
      case 2:
      case 3:
      case 4:
        throw new Error("the value or member is not an event");

      default:
        const dty = this.d.data.GetDelegateType(this.cenv.amap, range0);
        return TryDestStandardDelegateTyp(this.cenv.infoReader, range0, new AccessorDomain(3), dty) != null;
    }
  }

  get IsCompilerGenerated() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.fsharpInfo();

      if (matchValue != null) {
        return getValue(matchValue).IsCompilerGenerated;
      } else {
        return false;
      }
    }
  }

  get InlineAnnotation() {
    if (this.isUnresolved()) {
      return new FSharpInlineAnnotation(2);
    } else {
      const matchValue = this.fsharpInfo();

      if (matchValue != null) {
        const matchValue_1 = getValue(matchValue).InlineInfo;

        if (matchValue_1.tag === 1) {
          return new FSharpInlineAnnotation(1);
        } else if (matchValue_1.tag === 2) {
          return new FSharpInlineAnnotation(2);
        } else if (matchValue_1.tag === 3) {
          return new FSharpInlineAnnotation(3);
        } else {
          return new FSharpInlineAnnotation(0);
        }
      } else {
        return new FSharpInlineAnnotation(2);
      }
    }
  }

  get IsMutable() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 3:
        case 1:
        case 0:
          return false;

        case 4:
          return this.d.data.IsMutable;

        default:
          return false;
      }
    }
  }

  get IsModuleValueOrMember() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 3:
        case 1:
        case 0:
          return true;

        case 4:
          if (this.d.data.IsMember) {
            return true;
          } else {
            return this.d.data.IsModuleBinding;
          }

        default:
          return true;
      }
    }
  }

  get IsMember() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 3:
        case 1:
        case 0:
          return true;

        case 4:
          return this.d.data.IsMember;

        default:
          return true;
      }
    }
  }

  get IsDispatchSlot() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const $var26 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

      switch ($var26[0]) {
        case 0:
          return this.d.data.AddMethod.IsDispatchSlot;

        case 1:
          return this.d.data.IsDispatchSlot;

        case 2:
          return $var26[1].IsDispatchSlot;

        case 3:
          return this.d.data.IsDispatchSlot;
      }
    }
  }

  get IsProperty() {
    return this.d.tag === 1 ? true : false;
  }

  get IsEvent() {
    return this.d.tag === 0 ? true : false;
  }

  get EventForFSharpProperty() {
    var einfo;
    const $var27 = this.d.tag === 1 ? this.d.data.IsFSharpEventProperty ? [0, this.d.data] : [1] : [1];

    switch ($var27[0]) {
      case 0:
        const minfos1 = GetImmediateIntrinsicMethInfosOfType("add_" + $var27[1].PropertyName, new AccessorDomain(2), this.cenv.g, this.cenv.amap, range0, $var27[1].ApparentEnclosingType);
        const minfos2 = GetImmediateIntrinsicMethInfosOfType("remove_" + $var27[1].PropertyName, new AccessorDomain(2), this.cenv.g, this.cenv.amap, range0, $var27[1].ApparentEnclosingType);
        const matchValue = [minfos1, minfos2];
        const $var28 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [0, matchValue[0].head, matchValue[1].head] : [1] : [1] : [1] : [1];

        switch ($var28[0]) {
          case 0:
            const matchValue_1 = [$var28[1].ArbitraryValRef, $var28[2].ArbitraryValRef];
            const $var29 = matchValue_1[0] != null ? matchValue_1[1] != null ? [0, getValue(matchValue_1[0]), getValue(matchValue_1[1])] : [1] : [1];

            switch ($var29[0]) {
              case 0:
                return einfo = new EventInfo(0, [this.cenv.g, $var27[1], $var29[1], $var29[2]]), this.mkEventSym(einfo);

              case 1:
                return null;
            }

          case 1:
            return null;
        }

      case 1:
        return null;
    }
  }

  get IsEventAddMethod() {
    var $var31;

    if (this.isUnresolved()) {
      return false;
    } else {
      const $var30 = this.d.tag === 2 ? this.d.data.LogicalName.indexOf("add_") === 0 ? [0, this.d.data] : [1] : [1];

      switch ($var30[0]) {
        case 0:
          const eventName = $var30[1].LogicalName.slice(4, $var30[1].LogicalName.length);
          const entityTy = generalizedTyconRef($var30[1].DeclaringTyconRef);

          if (!($var31 = this.cenv.infoReader.GetImmediateIntrinsicEventsOfType(eventName, new AccessorDomain(2), range0, entityTy), $var31.tail == null)) {
            return true;
          } else {
            const declaringTy = generalizedTyconRef($var30[1].DeclaringTyconRef);
            const matchValue = GetImmediateIntrinsicPropInfosOfType(eventName, new AccessorDomain(2), this.cenv.g, this.cenv.amap, range0, declaringTy);

            if (matchValue.tail != null) {
              return matchValue.head.IsFSharpEventProperty;
            } else {
              return false;
            }
          }

        case 1:
          return false;
      }
    }
  }

  get IsEventRemoveMethod() {
    var $var33;

    if (this.isUnresolved()) {
      return false;
    } else {
      const $var32 = this.d.tag === 2 ? this.d.data.LogicalName.indexOf("remove_") === 0 ? [0, this.d.data] : [1] : [1];

      switch ($var32[0]) {
        case 0:
          const eventName = $var32[1].LogicalName.slice(7, $var32[1].LogicalName.length);
          const entityTy = generalizedTyconRef($var32[1].DeclaringTyconRef);

          if (!($var33 = this.cenv.infoReader.GetImmediateIntrinsicEventsOfType(eventName, new AccessorDomain(2), range0, entityTy), $var33.tail == null)) {
            return true;
          } else {
            const declaringTy = generalizedTyconRef($var32[1].DeclaringTyconRef);
            const matchValue = GetImmediateIntrinsicPropInfosOfType(eventName, new AccessorDomain(2), this.cenv.g, this.cenv.amap, range0, declaringTy);

            if (matchValue.tail != null) {
              return matchValue.head.IsFSharpEventProperty;
            } else {
              return false;
            }
          }

        case 1:
          return false;
      }
    }
  }

  get IsGetterMethod() {
    if (this.isUnresolved()) {
      return false;
    } else if (this.IsPropertyGetterMethod) {
      return true;
    } else {
      const matchValue = this.fsharpInfo();

      if (matchValue != null) {
        return getValue(matchValue).IsPropertyGetterMethod;
      } else {
        return false;
      }
    }
  }

  get IsSetterMethod() {
    if (this.isUnresolved()) {
      return false;
    } else if (this.IsPropertySetterMethod) {
      return true;
    } else {
      const matchValue = this.fsharpInfo();

      if (matchValue != null) {
        return getValue(matchValue).IsPropertySetterMethod;
      } else {
        return false;
      }
    }
  }

  get IsPropertyGetterMethod() {
    var $var35;

    if (this.isUnresolved()) {
      return false;
    } else {
      const $var34 = this.d.tag === 2 ? this.d.data.LogicalName.indexOf("get_") === 0 ? [0, this.d.data] : [1] : [1];

      switch ($var34[0]) {
        case 0:
          const propName = ChopPropertyName($var34[1].LogicalName);
          const declaringTy = generalizedTyconRef($var34[1].DeclaringTyconRef);
          return !($var35 = GetImmediateIntrinsicPropInfosOfType(propName, new AccessorDomain(2), this.cenv.g, this.cenv.amap, range0, declaringTy), $var35.tail == null);

        case 1:
          if (this.d.tag === 4) {
            return this.d.data.IsPropertyGetterMethod;
          } else {
            return false;
          }

      }
    }
  }

  get IsPropertySetterMethod() {
    var $var37;

    if (this.isUnresolved()) {
      return false;
    } else {
      const $var36 = this.d.tag === 2 ? this.d.data.LogicalName.indexOf("set_") === 0 ? [0, this.d.data] : [1] : [1];

      switch ($var36[0]) {
        case 0:
          const propName = ChopPropertyName($var36[1].LogicalName);
          const declaringTy = generalizedTyconRef($var36[1].DeclaringTyconRef);
          return !($var37 = GetImmediateIntrinsicPropInfosOfType(propName, new AccessorDomain(2), this.cenv.g, this.cenv.amap, range0, declaringTy), $var37.tail == null);

        case 1:
          if (this.d.tag === 4) {
            return this.d.data.IsPropertySetterMethod;
          } else {
            return false;
          }

      }
    }
  }

  get IsInstanceMember() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const $var38 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

      switch ($var38[0]) {
        case 0:
          return !this.d.data.IsStatic;

        case 1:
          return !this.d.data.IsStatic;

        case 2:
          return $var38[1].IsInstance;

        case 3:
          return this.d.data.IsInstanceMember;
      }
    }
  }

  get IsInstanceMemberInCompiledCode() {
    if (this.isUnresolved()) {
      return false;
    } else if (this.IsInstanceMember) {
      const $var39 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

      switch ($var39[0]) {
        case 0:
          const matchValue = this.d.data.ArbitraryValRef;

          if (matchValue == null) {
            return true;
          } else {
            return ValRefIsCompiledAsInstanceMember(this.cenv.g, getValue(matchValue));
          }

        case 1:
          const matchValue_1 = this.d.data.ArbitraryValRef;

          if (matchValue_1 == null) {
            return true;
          } else {
            return ValRefIsCompiledAsInstanceMember(this.cenv.g, getValue(matchValue_1));
          }

        case 2:
          const matchValue_2 = $var39[1].ArbitraryValRef;

          if (matchValue_2 == null) {
            return true;
          } else {
            return ValRefIsCompiledAsInstanceMember(this.cenv.g, getValue(matchValue_2));
          }

        case 3:
          return ValRefIsCompiledAsInstanceMember(this.cenv.g, this.d.data);
      }
    } else {
      return false;
    }
  }

  get IsExtensionMember() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 1:
          return this.d.data.IsExtensionMember;

        case 2:
          return this.d.data.IsExtensionMember;

        case 4:
          return this.d.data.IsExtensionMember;

        case 3:
          return false;

        default:
          return this.d.data.AddMethod.IsExtensionMember;
      }
    }
  }

  get IsOverrideOrExplicitMember() {
    return this.IsOverrideOrExplicitInterfaceImplementation;
  }

  get IsOverrideOrExplicitInterfaceImplementation() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 1:
          return this.d.data.IsDefiniteFSharpOverride;

        case 2:
          return this.d.data.IsDefiniteFSharpOverride;

        case 4:
          if (CurriedLambda(() => this.d.data.MemberInfo != null)()) {
            return ValRef_get_IsDefiniteFSharpOverrideMember.bind(this.d.data)();
          } else {
            return false;
          }

        case 3:
          return false;

        default:
          return this.d.data.AddMethod.IsDefiniteFSharpOverride;
      }
    }
  }

  get IsExplicitInterfaceImplementation() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 1:
          return this.d.data.IsFSharpExplicitInterfaceImplementation;

        case 2:
          return this.d.data.IsFSharpExplicitInterfaceImplementation;

        case 4:
          return ValRef_IsFSharpExplicitInterfaceImplementation.bind(this.d.data)(this.cenv.g);

        case 3:
          return false;

        default:
          return this.d.data.AddMethod.IsFSharpExplicitInterfaceImplementation;
      }
    }
  }

  get ImplementedAbstractSignatures() {
    this.checkIsResolved();
    let sigs;
    const $var40 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var40[0]) {
      case 0:
        sigs = this.d.data.AddMethod.ImplementedSlotSignatures;
        break;

      case 1:
        sigs = this.d.data.ImplementedSlotSignatures;
        break;

      case 2:
        sigs = $var40[1].ImplementedSlotSignatures;
        break;

      case 3:
        sigs = ValRef_get_ImplementedSlotSignatures.bind(this.d.data)();
        break;
    }

    return Impl.makeReadOnlyCollection(map(s => new FSharpAbstractSignature(this.cenv, s), sigs));
  }

  get IsImplicitConstructor() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.fsharpInfo();

      if (matchValue != null) {
        return getValue(matchValue).IsIncrClassConstructor;
      } else {
        return false;
      }
    }
  }

  get IsTypeFunction() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.fsharpInfo();

      if (matchValue != null) {
        return getValue(matchValue).IsTypeFunction;
      } else {
        return false;
      }
    }
  }

  get IsActivePattern() {
    if (this.isUnresolved()) {
      return false;
    } else {
      const matchValue = this.fsharpInfo();

      if (matchValue == null) {
        return false;
      } else {
        return ActivePatternInfoOfValName(getValue(matchValue).CoreDisplayName, getValue(matchValue).Range) != null;
      }
    }
  }

  get CompiledName() {
    this.checkIsResolved();
    const matchValue = this.fsharpInfo();

    if (matchValue == null) {
      return this.LogicalName;
    } else {
      return getValue(matchValue).CompiledName;
    }
  }

  get LogicalName() {
    this.checkIsResolved();
    const $var41 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var41[0]) {
      case 0:
        return this.d.data.EventName;

      case 1:
        return this.d.data.PropertyName;

      case 2:
        return $var41[1].LogicalName;

      case 3:
        return this.d.data.LogicalName;
    }
  }

  get DisplayName() {
    this.checkIsResolved();
    const $var42 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var42[0]) {
      case 0:
        return this.d.data.EventName;

      case 1:
        return this.d.data.PropertyName;

      case 2:
        return $var42[1].DisplayName;

      case 3:
        return this.d.data.DisplayName;
    }
  }

  get XmlDocSig() {
    this.checkIsResolved();
    const $var43 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var43[0]) {
      case 0:
        const range = defaultArg(this.DeclarationLocationOpt, range0);
        const matchValue = SymbolHelpers.GetXmlDocSigOfEvent(this.cenv.infoReader, range, this.d.data);

        if (matchValue != null) {
          const docsig = getValue(matchValue)[1];
          return docsig;
        } else {
          return "";
        }

      case 1:
        const range_1 = defaultArg(this.DeclarationLocationOpt, range0);
        const matchValue_1 = SymbolHelpers.GetXmlDocSigOfProp(this.cenv.infoReader, range_1, this.d.data);

        if (matchValue_1 != null) {
          const docsig_1 = getValue(matchValue_1)[1];
          return docsig_1;
        } else {
          return "";
        }

      case 2:
        const range_2 = defaultArg(this.DeclarationLocationOpt, range0);
        const matchValue_2 = SymbolHelpers.GetXmlDocSigOfMethInfo(this.cenv.infoReader, range_2, $var43[1]);

        if (matchValue_2 != null) {
          const docsig_2 = getValue(matchValue_2)[1];
          return docsig_2;
        } else {
          return "";
        }

      case 3:
        const matchValue_3 = this.d.data.DeclaringEntity;

        if (matchValue_3.tag === 1) {
          return "";
        } else {
          const matchValue_4 = SymbolHelpers.GetXmlDocSigOfScopedValRef(this.cenv.g, matchValue_3.data, this.d.data);

          if (matchValue_4 != null) {
            const docsig_3 = getValue(matchValue_4)[1];
            return docsig_3;
          } else {
            return "";
          }
        }

    }
  }

  get XmlDoc() {
    if (this.isUnresolved()) {
      return Impl.makeXmlDoc(XmlDoc.Empty);
    } else {
      const $var44 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

      switch ($var44[0]) {
        case 0:
          return Impl.makeXmlDoc(this.d.data.XmlDoc);

        case 1:
          return Impl.makeXmlDoc(this.d.data.XmlDoc);

        case 2:
          return Impl.makeXmlDoc($var44[1].XmlDoc);

        case 3:
          return Impl.makeXmlDoc(this.d.data.XmlDoc);
      }
    }
  }

  get CurriedParameterGroups() {
    this.checkIsResolved();
    const $var45 = this.d.tag === 0 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var45[0]) {
      case 0:
        return Impl.makeReadOnlyCollection(ofArray([Impl.makeReadOnlyCollection(toList(delay(() => collect(matchValue => {
          const argInfo = new ArgReprInfo(new List(), matchValue.data[4]);
          return singleton(new FSharpParameter(this.cenv, matchValue.data[6], argInfo, this.DeclarationLocationOpt, matchValue.data[0], matchValue.data[1], matchValue.data[2].IsOptional));
        }, this.d.data.GetParamDatas(this.cenv.amap, range0)))))]));

      case 1:
        return Impl.makeReadOnlyCollection(new List());

      case 2:
        return Impl.makeReadOnlyCollection(toList(delay(() => map_1(argtys => Impl.makeReadOnlyCollection(toList(delay(() => collect(matchValue_1 => {
          const argInfo_1 = new ArgReprInfo(new List(), matchValue_1.data[4]);
          return singleton(new FSharpParameter(this.cenv, matchValue_1.data[6], argInfo_1, this.DeclarationLocationOpt, matchValue_1.data[0], matchValue_1.data[1], matchValue_1.data[2].IsOptional));
        }, argtys)))), $var45[1].GetParamDatas(this.cenv.amap, range0, $var45[1].FormalMethodInst)))));

      case 3:
        const matchValue_2 = this.d.data.ValReprInfo;

        if (matchValue_2 != null) {
          const curriedArgInfos = getValue(matchValue_2).data[1];
          const _typars = getValue(matchValue_2).data[0];
          const _retInfo = getValue(matchValue_2).data[2];
          const tau = this.d.data.TauType;
          const patternInput = GetTopTauTypeInFSharpForm(this.cenv.g, curriedArgInfos, tau, range0);
          const argtysl = this.d.data.IsInstanceMember ? patternInput[0].tail : patternInput[0];
          return Impl.makeReadOnlyCollection(toList(delay(() => map_1(argtys_1 => Impl.makeReadOnlyCollection(toList(delay(() => collect(matchValue_3 => {
            const isParamArrayArg = HasFSharpAttribute(this.cenv.g, this.cenv.g.attrib_ParamArrayAttribute, matchValue_3[1].Attribs);
            const isOutArg = HasFSharpAttribute(this.cenv.g, this.cenv.g.attrib_OutAttribute, matchValue_3[1].Attribs) ? isByrefTy(this.cenv.g, matchValue_3[0]) : false;
            const isOptionalArg = HasFSharpAttribute(this.cenv.g, this.cenv.g.attrib_OptionalArgumentAttribute, matchValue_3[1].Attribs);
            return singleton(new FSharpParameter(this.cenv, matchValue_3[0], matchValue_3[1], this.DeclarationLocationOpt, isParamArrayArg, isOutArg, isOptionalArg));
          }, argtys_1)))), argtysl))));
        } else {
          const patternInput_1 = this.d.data.TypeScheme;

          if (isFunTy(this.cenv.g, patternInput_1[1])) {
            const patternInput_2 = stripFunTy(this.cenv.g, patternInput_1[1]);
            return Impl.makeReadOnlyCollection(toList(delay(() => collect(typ => {
              const allArguments = isRefTupleTy(this.cenv.g, typ) ? tryDestRefTupleTy(this.cenv.g, typ) : ofArray([typ]);
              return singleton(Impl.makeReadOnlyCollection(map(arg => {
                var Name;
                return new FSharpParameter(this.cenv, arg, (Name = null, new ArgReprInfo(new List(), Name)), this.DeclarationLocationOpt, false, false, false);
              }, allArguments)));
            }, patternInput_2[0]))));
          } else {
            return Impl.makeReadOnlyCollection(new List());
          }
        }

    }
  }

  get ReturnParameter() {
    this.checkIsResolved();
    const $var46 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

    switch ($var46[0]) {
      case 0:
        let retInfo;
        const Name = null;
        retInfo = new ArgReprInfo(new List(), Name);
        let rty;

        try {
          rty = PropTypOfEventInfo(this.cenv.infoReader, range0, new AccessorDomain(3), this.d.data);
        } catch (matchValue) {
          rty = this.d.data.GetDelegateType(this.cenv.amap, range0);
        }

        return new FSharpParameter(this.cenv, rty, retInfo, this.DeclarationLocationOpt, false, false, false);

      case 1:
        let retInfo_1;
        const Name_1 = null;
        retInfo_1 = new ArgReprInfo(new List(), Name_1);
        const rty_1 = this.d.data.GetPropertyType(this.cenv.amap, range0);
        return new FSharpParameter(this.cenv, rty_1, retInfo_1, this.DeclarationLocationOpt, false, false, false);

      case 2:
        let retInfo_2;
        const Name_2 = null;
        retInfo_2 = new ArgReprInfo(new List(), Name_2);
        const rty_2 = $var46[1].GetFSharpReturnTy(this.cenv.amap, range0, $var46[1].FormalMethodInst);
        return new FSharpParameter(this.cenv, rty_2, retInfo_2, this.DeclarationLocationOpt, false, false, false);

      case 3:
        const matchValue_1 = this.d.data.ValReprInfo;

        if (matchValue_1 != null) {
          const retInfo_3 = getValue(matchValue_1).data[2];
          const argInfos = getValue(matchValue_1).data[1];
          const _typars = getValue(matchValue_1).data[0];
          const tau = this.d.data.TauType;
          const patternInput = GetTopTauTypeInFSharpForm(this.cenv.g, argInfos, tau, range0);
          return new FSharpParameter(this.cenv, patternInput[1], retInfo_3, this.DeclarationLocationOpt, false, false, false);
        } else {
          const patternInput_1 = this.d.data.TypeScheme;
          const patternInput_2 = stripFunTy(this.cenv.g, patternInput_1[1]);
          let empty;
          const Name_3 = null;
          empty = new ArgReprInfo(new List(), Name_3);
          return new FSharpParameter(this.cenv, patternInput_2[1], empty, this.DeclarationLocationOpt, false, false, false);
        }

    }
  }

  get Attributes() {
    if (this.isUnresolved()) {
      return Impl.makeReadOnlyCollection(new List());
    } else {
      const m = range0;
      return Impl.makeReadOnlyCollection((() => {
        const $var47 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

        switch ($var47[0]) {
          case 0:
            return map(a => new FSharpAttribute(this.cenv, a), GetAttribInfosOfEvent(this.cenv.amap, m, this.d.data));

          case 1:
            return map(a_1 => new FSharpAttribute(this.cenv, a_1), GetAttribInfosOfProp(this.cenv.amap, m, this.d.data));

          case 2:
            return map(a_2 => new FSharpAttribute(this.cenv, a_2), GetAttribInfosOfMethod(this.cenv.amap, m, $var47[1]));

          case 3:
            return map(a_3 => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a_3])), this.d.data.Attribs);
        }
      })());
    }
  }

  get IsBaseValue() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 3:
        case 1:
        case 0:
          return false;

        case 4:
          return this.d.data.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(1));

        default:
          return false;
      }
    }
  }

  get IsConstructorThisValue() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 3:
        case 1:
        case 0:
          return false;

        case 4:
          return this.d.data.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(0));

        default:
          return false;
      }
    }
  }

  get IsMemberThisValue() {
    if (this.isUnresolved()) {
      return false;
    } else {
      switch (this.d.tag) {
        case 3:
        case 1:
        case 0:
          return false;

        case 4:
          return this.d.data.BaseOrThisInfo.Equals(new ValBaseOrThisInfo(3));

        default:
          return false;
      }
    }
  }

  get LiteralValue() {
    if (this.isUnresolved()) {
      return null;
    } else {
      switch (this.d.tag) {
        case 3:
        case 1:
        case 0:
          return null;

        case 4:
          return Impl.getLiteralValue(this.d.data.LiteralValue);

        default:
          return null;
      }
    }
  }

  get Accessibility() {
    if (this.isUnresolved()) {
      return new FSharpAccessibility(taccessPublic);
    } else {
      const matchValue = this.fsharpInfo();

      if (matchValue == null) {
        const $var48 = this.d.tag === 1 ? [1] : this.d.tag === 2 ? [2, this.d.data] : this.d.tag === 3 ? [2, this.d.data] : this.d.tag === 4 ? [3] : [0];

        switch ($var48[0]) {
          case 0:
            let access;

            if (this.d.data.tag === 1) {
              const ilAccess = GetILAccessOfILEventInfo(this.d.data.data);
              access = Impl.getApproxFSharpAccessibilityOfMember(getValue(this.DeclaringEntity).Entity, ilAccess);
            } else {
              access = taccessPublic;
            }

            return new FSharpAccessibility(access);

          case 1:
            let access_1;

            if (this.d.data.tag === 1) {
              const ilAccess_1 = GetILAccessOfILPropInfo(this.d.data.data);
              access_1 = Impl.getApproxFSharpAccessibilityOfMember(getValue(this.DeclaringEntity).Entity, ilAccess_1);
            } else {
              access_1 = taccessPublic;
            }

            return new FSharpAccessibility(access_1);

          case 2:
            const access_2 = $var48[1].tag === 1 ? Impl.getApproxFSharpAccessibilityOfMember($var48[1].data[1].DeclaringTyconRef, $var48[1].data[1].RawMetadata.Access) : taccessPublic;
            return new FSharpAccessibility(access_2, $var48[1].IsProtectedAccessiblity);

          case 3:
            return new FSharpAccessibility(this.d.data.Accessibility);
        }
      } else {
        return new FSharpAccessibility(getValue(matchValue).Accessibility);
      }
    }
  }

  get IsConstructor() {
    return this.d.tag === 3 ? true : this.d.tag === 4 ? this.d.data.IsConstructor : false;
  }

  get Data() {
    return this.d;
  }

  get IsValCompiledAsMethod() {
    return false;
  }

  get IsValue() {
    return this.d.tag === 4 ? !SymbolHelpers.isFunction(this.cenv.g, this.d.data.Type) : false;
  }

  Equals(other) {
    var $var49;

    if ($var49 = this, $var49 === other) {
      return true;
    } else if (other instanceof FSharpMemberOrFunctionOrValue) {
      const matchValue = [this.d, other.Data];
      const $var50 = matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [0, matchValue[0].data, matchValue[1].data] : [4] : matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [1, matchValue[0].data, matchValue[1].data] : [4] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [2, matchValue[0].data, matchValue[1].data] : [4] : matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? [3, matchValue[0].data, matchValue[1].data] : [4] : [4];

      switch ($var50[0]) {
        case 0:
          return ((arg00, arg10) => EventInfo.EventInfosUseIdenticalDefintions(arg00, arg10))($var50[1], $var50[2]);

        case 1:
          return ((arg00_1, arg10_1) => PropInfo.PropInfosUseIdenticalDefinitions(arg00_1, arg10_1))($var50[1], $var50[2]);

        case 2:
          return ((arg00_2, arg10_2) => MethInfo.MethInfosUseIdenticalDefinitions(arg00_2, arg10_2))($var50[1], $var50[2]);

        case 3:
          return valRefEq(this.cenv.g, $var50[1], $var50[2]);

        case 4:
          return false;
      }
    } else {
      return false;
    }
  }

  GetHashCode() {
    return hash(this.LogicalName);
  }

  ToString() {
    try {
      const prefix = this.IsEvent ? "event " : this.IsProperty ? "property " : this.IsMember ? "member " : "val ";
      return prefix + this.LogicalName;
    } catch (matchValue) {
      return "??";
    }
  }

  fsharpInfo() {
    const matchValue = this.d;

    switch (matchValue.tag) {
      case 3:
        return matchValue.data.ArbitraryValRef;

      case 1:
        return matchValue.data.ArbitraryValRef;

      case 0:
        return matchValue.data.ArbitraryValRef;

      case 4:
        return matchValue.data;

      default:
        return matchValue.data.ArbitraryValRef;
    }
  }

  isUnresolved() {
    const matchValue = this.fsharpInfo();

    if (matchValue != null) {
      let copyOfStruct = getValue(matchValue).TryDeref;
      return copyOfStruct.IsNone;
    } else {
      return false;
    }
  }

  checkIsResolved() {
    if (this.isUnresolved()) {
      const v = getValue(this.fsharpInfo());
      let nm;

      const activePatternResult50115 = _VRefLocal_VRefNonLocal_(v);

      if (activePatternResult50115.tag === 1) {
        nm = activePatternResult50115.data.ItemKey.PartialKey.LogicalName;
      } else {
        nm = "<local>";
      }

      throw new Error(toText(printf("The value or member '%s' does not exist or is in an unresolved assembly."))(nm));
    }
  }

  mkMethSym(minfo) {
    return new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(2, minfo), new Item(10, [minfo.DisplayName, ofArray([minfo]), null]));
  }

  mkEventSym(einfo) {
    return new FSharpMemberOrFunctionOrValue(this.cenv, new FSharpMemberOrValData(0, einfo), new Item(8, einfo));
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpMemberOrFunctionOrValue", FSharpMemberOrFunctionOrValue);
export class FSharpType {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpType",
      properties: {
        AbbreviatedType: FSharpType,
        AllInterfaces: Interface("System.Collections.Generic.IList"),
        BaseType: Option(FSharpType),
        GenericArguments: Interface("System.Collections.Generic.IList"),
        GenericParameter: FSharpGenericParameter,
        HasTypeDefinition: "boolean",
        IsAbbreviation: "boolean",
        IsFunctionType: "boolean",
        IsGenericParameter: "boolean",
        IsNamedType: "boolean",
        IsStructTupleType: "boolean",
        IsTupleType: "boolean",
        IsUnresolved: "boolean",
        NamedEntity: FSharpEntity,
        TypeDefinition: FSharpEntity,
        V: TType,
        cenv: SymbolEnv
      }
    };
  }

  constructor(cenv, typ) {
    this["cenv@1991"] = cenv;
    this.typ = typ;
  }

  static [".ctor"](cenv, typ, _arg5) {
    return new FSharpType(cenv, typ);
  }

  get IsUnresolved() {
    return this.isUnresolved();
  }

  get HasTypeDefinition() {
    return this.isResolved() ? Impl.protect(() => {
      const matchValue = stripTyparEqns(this.typ);
      const $var51 = matchValue.tag === 1 ? [0] : matchValue.tag === 6 ? matchValue.data.tag === 1 ? [0] : matchValue.data.tag === 2 ? [0] : matchValue.data.tag === 3 ? [0] : matchValue.data.tag === 4 ? [0] : [1] : [1];

      switch ($var51[0]) {
        case 0:
          return true;

        case 1:
          return false;
      }
    }) : false;
  }

  get IsTupleType() {
    return this.isResolved() ? Impl.protect(() => {
      const matchValue = stripTyparEqns(this.typ);

      if (matchValue.tag === 2) {
        return true;
      } else {
        return false;
      }
    }) : false;
  }

  get IsStructTupleType() {
    return this.isResolved() ? Impl.protect(() => {
      const matchValue = stripTyparEqns(this.typ);

      if (matchValue.tag === 2) {
        return evalTupInfoIsStruct(matchValue.data[0]);
      } else {
        return false;
      }
    }) : false;
  }

  get IsNamedType() {
    return this.HasTypeDefinition;
  }

  get NamedEntity() {
    return this.TypeDefinition;
  }

  get TypeDefinition() {
    return Impl.protect(() => {
      const matchValue = stripTyparEqns(this.typ);
      const $var52 = matchValue.tag === 1 ? [0, matchValue.data[0]] : matchValue.tag === 6 ? matchValue.data.tag === 1 ? [1, matchValue.data.data] : matchValue.data.tag === 2 ? [2] : matchValue.data.tag === 4 ? [3] : matchValue.data.tag === 3 ? [4] : [5] : [5];

      switch ($var52[0]) {
        case 0:
          return new FSharpEntity(this["cenv@1991"], $var52[1]);

        case 1:
          return new FSharpEntity(this["cenv@1991"], $var52[1]);

        case 2:
          return new FSharpEntity(this["cenv@1991"], this["cenv@1991"].g.measureproduct_tcr);

        case 3:
          return new FSharpEntity(this["cenv@1991"], this["cenv@1991"].g.measureone_tcr);

        case 4:
          return new FSharpEntity(this["cenv@1991"], this["cenv@1991"].g.measureinverse_tcr);

        case 5:
          throw new Error("not a named type");
      }
    });
  }

  get GenericArguments() {
    return Impl.protect(() => {
      const matchValue = stripTyparEqns(this.typ);
      const $var53 = matchValue.tag === 1 ? [0, matchValue.data[1]] : matchValue.tag === 2 ? [0, matchValue.data[1]] : matchValue.tag === 3 ? [1, matchValue.data[0], matchValue.data[1]] : matchValue.tag === 6 ? matchValue.data.tag === 1 ? [2] : matchValue.data.tag === 2 ? [3, matchValue.data.data[0], matchValue.data.data[1]] : matchValue.data.tag === 4 ? [4] : matchValue.data.tag === 3 ? [5, matchValue.data.data] : [6] : [6];

      switch ($var53[0]) {
        case 0:
          return Impl.makeReadOnlyCollection(map(ty => new FSharpType(this["cenv@1991"], ty), $var53[1]));

        case 1:
          return Impl.makeReadOnlyCollection([new FSharpType(this["cenv@1991"], $var53[1]), new FSharpType(this["cenv@1991"], $var53[2])]);

        case 2:
          return Impl.makeReadOnlyCollection([]);

        case 3:
          return Impl.makeReadOnlyCollection([new FSharpType(this["cenv@1991"], new TType(6, $var53[1])), new FSharpType(this["cenv@1991"], new TType(6, $var53[2]))]);

        case 4:
          return Impl.makeReadOnlyCollection([]);

        case 5:
          return Impl.makeReadOnlyCollection([new FSharpType(this["cenv@1991"], new TType(6, $var53[1]))]);

        case 6:
          throw new Error("not a named type");
      }
    });
  }

  get IsAbbreviation() {
    return (this.isResolved() ? this.HasTypeDefinition : false) ? this.TypeDefinition.IsFSharpAbbreviation : false;
  }

  get AbbreviatedType() {
    return Impl.protect(() => new FSharpType(this["cenv@1991"], stripTyEqns(this["cenv@1991"].g, this.typ)));
  }

  get IsFunctionType() {
    return this.isResolved() ? Impl.protect(() => {
      const matchValue = stripTyparEqns(this.typ);

      if (matchValue.tag === 3) {
        return true;
      } else {
        return false;
      }
    }) : false;
  }

  get IsGenericParameter() {
    return Impl.protect(() => {
      const matchValue = stripTyparEqns(this.typ);
      const $var54 = matchValue.tag === 5 ? [0] : matchValue.tag === 6 ? matchValue.data.tag === 0 ? [1] : [2] : [2];

      switch ($var54[0]) {
        case 0:
          return true;

        case 1:
          return true;

        case 2:
          return false;
      }
    });
  }

  get GenericParameter() {
    return Impl.protect(() => {
      const matchValue = stripTyparEqns(this.typ);
      const $var55 = matchValue.tag === 5 ? [0, matchValue.data] : matchValue.tag === 6 ? matchValue.data.tag === 0 ? [0, matchValue.data.data] : [1] : [1];

      switch ($var55[0]) {
        case 0:
          return new FSharpGenericParameter(this["cenv@1991"], $var55[1]);

        case 1:
          throw new Error("not a generic parameter type");
      }
    });
  }

  get AllInterfaces() {
    return this.isUnresolved() ? Impl.makeReadOnlyCollection(new List()) : Impl.makeReadOnlyCollection(toList(delay(() => map_1(ty => new FSharpType(this["cenv@1991"], ty), AllInterfacesOfType(this["cenv@1991"].g, this["cenv@1991"].amap, range0, new AllowMultiIntfInstantiations(0), this.typ)))));
  }

  get BaseType() {
    return defaultArg(GetSuperTypeOfType(this["cenv@1991"].g, this["cenv@1991"].amap, range0, this.typ), null, ty => new FSharpType(this["cenv@1991"], ty));
  }

  Instantiate(instantiation) {
    const typI = instType(map(tupledArg => [tupledArg[0].V, tupledArg[1].V], instantiation), this.typ);
    return new FSharpType(this["cenv@1991"], typI);
  }

  get V() {
    return this.typ;
  }

  get cenv() {
    return this["cenv@1991"];
  }

  AdjustType(t) {
    return new FSharpType(this.cenv, t);
  }

  Equals(other) {
    var $var56;

    if ($var56 = this, $var56 === other) {
      return true;
    } else if (other instanceof FSharpType) {
      return typeEquiv(this["cenv@1991"].g, this.typ, other.V);
    } else {
      return false;
    }
  }

  GetHashCode() {
    const hashType = typ => {
      const typ_1 = stripTyEqnsWrtErasure(new Erasure(2), this["cenv@1991"].g, typ);

      switch (typ_1.tag) {
        case 5:
          return 10100 + ~~typ_1.data.Stamp.toNumber() | 0;

        case 1:
          return 10200 + ~~typ_1.data[0].Stamp.toNumber() + sumBy(hashType, typ_1.data[1]) | 0;

        case 4:
          return 10300;

        case 2:
          return 10400 + sumBy(hashType, typ_1.data[1]) | 0;

        case 3:
          return 10500 + hashType(typ_1.data[0]) + hashType(typ_1.data[1]) | 0;

        case 6:
          return 10600;

        default:
          return 10000;
      }
    };

    return hashType(this.typ) | 0;
  }

  Format(denv) {
    return Impl.protect(() => prettyStringOfTyNoCx(denv.Contents(this["cenv@1991"].g), this.typ));
  }

  ToString() {
    return Impl.protect(() => "type " + prettyStringOfTyNoCx(DisplayEnv.Empty(this["cenv@1991"].g), this.typ));
  }

  static Prettify_0(typ) {
    const ty = PrettyTypes.PrettifyType(typ.cenv.g, typ.V)[0];
    return typ.AdjustType(ty);
  }

  static Prettify_1(typs) {
    var cenv;
    var prettyTyps;
    const xs = toList(typs);
    return Impl.makeReadOnlyCollection(xs.tail != null ? (cenv = xs.head.cenv, prettyTyps = PrettyTypes.PrettifyTypes(cenv.g, toList(delay(function () {
      return map_1(function (t) {
        return t.V;
      }, xs);
    })))[0], toList(map2(function (p, pty) {
      return p.AdjustType(pty);
    }, xs, prettyTyps))) : new List());
  }

  static Prettify_2(parameter) {
    const prettyTyp = PrettyTypes.PrettifyType(parameter.cenv2.g, parameter.V)[0];
    return parameter.AdjustType(prettyTyp);
  }

  static Prettify_3(parameters) {
    var cenv;
    var prettyTyps;
    const parameters_1 = toList(parameters);
    return Impl.makeReadOnlyCollection(parameters_1.tail != null ? (cenv = parameters_1.head.cenv2, prettyTyps = PrettyTypes.PrettifyTypes(cenv.g, map(function (p) {
      return p.V;
    }, parameters_1))[0], toList(map2(function (p_1, pty) {
      return p_1.AdjustType(pty);
    }, parameters_1, prettyTyps))) : new List());
  }

  static Prettify_4(parameters) {
    var cenv;
    var prettyTyps;
    var mapping;
    const xs = map(function (source) {
      return toList(source);
    }, toList(parameters));
    const hOpt = tryPick(function (_arg7) {
      return _arg7.tail != null ? _arg7.head : null;
    }, xs);
    return Impl.makeReadOnlyCollection(map(function (arr) {
      return Impl.makeReadOnlyCollection(arr);
    }, hOpt != null ? (cenv = getValue(hOpt).cenv2, prettyTyps = PrettyTypes.PrettifyCurriedTypes(cenv.g, List_1.mapSquared(function (p) {
      return p.V;
    }, xs))[0], toList(map2((mapping = function (p_1, pty) {
      return p_1.AdjustType(pty);
    }, function (list1, list2) {
      return toList(map2(mapping, list1, list2));
    }), xs, prettyTyps))) : xs));
  }

  static Prettify_5(parameters, returnParameter) {
    var mapping;
    const xs = map(function (source) {
      return toList(source);
    }, toList(parameters));
    const cenv = returnParameter.cenv2;

    const patternInput = function (tys) {
      return PrettyTypes.PrettifyCurriedSigTypes(cenv.g, tys, returnParameter.V);
    }(List_1.mapSquared(function (p) {
      return p.V;
    }, xs))[0];

    const ps = Impl.makeReadOnlyCollection(map(function (arr) {
      return Impl.makeReadOnlyCollection(arr);
    }, toList(map2((mapping = function (p_1, pty) {
      return p_1.AdjustType(pty);
    }, function (list1, list2) {
      return toList(map2(mapping, list1, list2));
    }), xs, patternInput[0]))));
    return [ps, returnParameter.AdjustType(patternInput[1])];
  }

  isUnresolved() {
    const $var58 = () => {
      const matchValue = stripTyparEqns(this.typ);
      const $var57 = matchValue.tag === 1 ? [0, matchValue.data[0]] : matchValue.tag === 6 ? matchValue.data.tag === 1 ? [1, matchValue.data.data] : matchValue.data.tag === 2 ? [2] : matchValue.data.tag === 4 ? [3] : matchValue.data.tag === 3 ? [4] : [5] : [5];

      switch ($var57[0]) {
        case 0:
          return new FSharpEntity(this["cenv@1991"], $var57[1]).IsUnresolved;

        case 1:
          return new FSharpEntity(this["cenv@1991"], $var57[1]).IsUnresolved;

        case 2:
          return new FSharpEntity(this["cenv@1991"], this["cenv@1991"].g.measureproduct_tcr).IsUnresolved;

        case 3:
          return new FSharpEntity(this["cenv@1991"], this["cenv@1991"].g.measureone_tcr).IsUnresolved;

        case 4:
          return new FSharpEntity(this["cenv@1991"], this["cenv@1991"].g.measureinverse_tcr).IsUnresolved;

        case 5:
          return false;
      }
    };

    try {
      return $var58();
    } catch (matchValue_1) {
      if (matchValue_1 instanceof UnresolvedPathReferenceNoRange) {
        return true;
      } else {
        throw matchValue_1;
      }
    }
  }

  isResolved() {
    return !this.isUnresolved();
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpType", FSharpType);
export class FSharpAttribute {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAttribute",
      properties: {
        AttributeType: FSharpEntity,
        ConstructorArguments: Interface("System.Collections.Generic.IList"),
        IsUnresolved: "boolean",
        NamedArguments: Interface("System.Collections.Generic.IList")
      }
    };
  }

  constructor(cenv, attrib) {
    this.cenv = cenv;
    this.attrib = attrib;
  }

  get AttributeType() {
    return new FSharpEntity(this.cenv, this.attrib.TyconRef);
  }

  get IsUnresolved() {
    return Impl.entityIsUnresolved(this.attrib.TyconRef);
  }

  get ConstructorArguments() {
    return Impl.makeReadOnlyCollection(map(tupledArg => [new FSharpType(this.cenv, tupledArg[0]), (arg => this.resolveArgObj(arg))(tupledArg[1])], this.attrib.ConstructorArguments));
  }

  get NamedArguments() {
    return Impl.makeReadOnlyCollection(map(tupledArg => [new FSharpType(this.cenv, tupledArg[0]), tupledArg[1], tupledArg[2], (arg => this.resolveArgObj(arg))(tupledArg[3])], this.attrib.NamedArguments));
  }

  Format(denv) {
    return Impl.protect(() => {
      if (this.attrib.tag === 1) {
        const patternInput = decodeILAttribData(this.attrib.data[0].ilg, this.attrib.data[3]);
        return stringOfILAttrib(denv.Contents(this.attrib.data[0]), this.attrib.data[3].Method.DeclaringType, patternInput[0]);
      } else {
        return stringOfFSAttrib(denv.Contents(this.attrib.data[0]), this.attrib.data[1]);
      }
    });
  }

  ToString() {
    return Impl.entityIsUnresolved(this.attrib.TyconRef) ? "attribute ???" : "attribute " + this.attrib.TyconRef.CompiledName + "(...)";
  }

  resolveArgObj(arg) {
    if (arg instanceof TType) {
      return new FSharpType(this.cenv, arg);
    } else if (isArray(arg)) {
      return map_2(arg_1 => this.resolveArgObj(arg_1), arg, Array);
    } else {
      return arg;
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAttribute", FSharpAttribute);
export class FSharpParameter extends FSharpSymbol {
  [_Symbol.reflection]() {
    return extendInfo(FSharpParameter, {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpParameter",
      interfaces: [],
      properties: {
        Attributes: Interface("System.Collections.Generic.IList"),
        DeclarationLocation: range_3,
        IsOptionalArg: "boolean",
        IsOutArg: "boolean",
        IsParamArrayArg: "boolean",
        Name: Option("string"),
        Type: FSharpType,
        V: TType,
        ValReprInfo: ArgReprInfo,
        cenv2: SymbolEnv
      }
    });
  }

  constructor(cenv, typ, topArgInfo, mOpt, isParamArrayArg, isOutArg, isOptionalArg) {
    super(cenv, () => {
      var matchValue_1;
      const m = mOpt == null ? range0 : getValue(mOpt);
      return new Item(20, [(matchValue_1 = topArgInfo.Name, matchValue_1 != null ? getValue(matchValue_1) : mkSynId(m, "")), typ, null]);
    }, (_arg14, _arg13, _arg12) => true);
    this.cenv = cenv;
    this.typ = typ;
    this.topArgInfo = topArgInfo;
    this.mOpt = mOpt;
    this.isParamArrayArg = isParamArrayArg;
    this.isOutArg = isOutArg;
    this.isOptionalArg = isOptionalArg;
    this.attribs = this.topArgInfo.Attribs;
    this.idOpt = this.topArgInfo.Name;
    const matchValue = this.mOpt;

    if (matchValue == null) {
      this.m = range0;
    } else {
      this.m = getValue(matchValue);
    }
  }

  get Name() {
    return this.idOpt != null ? getValue(this.idOpt).idText : null;
  }

  get cenv2() {
    return this.cenv;
  }

  AdjustType(t) {
    return new FSharpParameter(this.cenv, t, this.topArgInfo, this.mOpt, this.isParamArrayArg, this.isOutArg, this.isOptionalArg);
  }

  get Type() {
    return new FSharpType(this.cenv, this.typ);
  }

  get V() {
    return this.typ;
  }

  get DeclarationLocation() {
    return this.idOpt != null ? getValue(this.idOpt).idRange : this.m;
  }

  get Attributes() {
    return Impl.makeReadOnlyCollection(map(a => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a])), this.attribs));
  }

  get IsParamArrayArg() {
    return this.isParamArrayArg;
  }

  get IsOutArg() {
    return this.isOutArg;
  }

  get IsOptionalArg() {
    return this.isOptionalArg;
  }

  get ValReprInfo() {
    return this.topArgInfo;
  }

  Equals(other) {
    var $var59;

    if ($var59 = this, $var59 === other) {
      return true;
    } else if (other instanceof FSharpParameter) {
      if (equals(this.Name, other.Name)) {
        return equals(this.DeclarationLocation, other.DeclarationLocation);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  GetHashCode() {
    return hash(this.topArgInfo);
  }

  ToString() {
    var matchValue;
    return "parameter " + (matchValue = this.Name, matchValue != null ? getValue(matchValue) : "<unnamed");
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpParameter", FSharpParameter);
export class FSharpAssemblySignature {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAssemblySignature",
      properties: {
        Attributes: Interface("System.Collections.Generic.IList"),
        Entities: Interface("System.Collections.Generic.IList")
      }
    };
  }

  constructor(cenv, topAttribs, optViewedCcu, mtyp) {
    this.cenv = cenv;
    this.topAttribs = topAttribs;
    this.optViewedCcu = optViewedCcu;
    this.mtyp = mtyp;
  }

  static [".ctor_0"](cenv, ccu) {
    const cenv_1 = ccu.IsUnresolvedReference ? cenv : new SymbolEnv(cenv.g, ccu, null, cenv.tcImports);
    return new FSharpAssemblySignature(cenv_1, null, ccu, ccu.Contents.ModuleOrNamespaceType);
  }

  static [".ctor_1"](g, thisCcu, thisCcuTyp, tcImports, topAttribs, mtyp) {
    return new FSharpAssemblySignature(new SymbolEnv(g, thisCcu, thisCcuTyp, tcImports), topAttribs, null, mtyp);
  }

  get Entities() {
    const loop = rmtyp => {
      return Array.from(delay(() => collect(entity => {
        if (entity.IsNamespace) {
          return loop(entity.ModuleOrNamespaceType);
        } else {
          const entityRef = Impl.rescopeEntity(this.optViewedCcu, entity);
          return singleton(new FSharpEntity(this.cenv, entityRef));
        }
      }, rmtyp.AllEntities)));
    };

    return Impl.makeReadOnlyCollection(loop(this.mtyp));
  }

  get Attributes() {
    return Impl.makeReadOnlyCollection(toList(delay(() => {
      if (this.optViewedCcu == null) {
        if (this.topAttribs != null) {
          return map_1(a => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a])), getValue(this.topAttribs).assemblyAttrs);
        } else {
          return empty_1();
        }
      } else {
        const matchValue = getValue(this.optViewedCcu).TryGetILModuleDef();

        if (matchValue == null) {
          if (getValue(this.optViewedCcu).IsFSharp) {
            return map_1(a_1 => new FSharpAttribute(this.cenv, new AttribInfo(0, [this.cenv.g, a_1])), getValue(this.optViewedCcu).Contents.Attribs);
          } else {
            return empty_1();
          }
        } else if (getValue(matchValue).Manifest != null) {
          return map_1(a_2 => new FSharpAttribute(this.cenv, a_2), AttribInfosOfIL(this.cenv.g, this.cenv.amap, this.cenv.thisCcu.ILScopeRef, range0, getValue(getValue(matchValue).Manifest).CustomAttrs));
        } else {
          return empty_1();
        }
      }
    })));
  }

  FindEntityByPath(path) {
    const findNested = (name, entity) => {
      if (entity != null) {
        return tryFind(name, getValue(entity).ModuleOrNamespaceType.AllEntitiesByCompiledAndLogicalMangledNames);
      } else {
        return null;
      }
    };

    if (path.tail != null) {
      return defaultArg(fold((a, x) => findNested(x, a), tryFind(path.head, this.mtyp.AllEntitiesByCompiledAndLogicalMangledNames), path.tail), null, e => new FSharpEntity(this.cenv, Impl.rescopeEntity(this.optViewedCcu, e)));
    } else {
      return null;
    }
  }

  ToString() {
    return "<assembly signature>";
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAssemblySignature", FSharpAssemblySignature);
export class FSharpAssembly {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAssembly",
      properties: {
        CodeLocation: "string",
        Contents: FSharpAssemblySignature,
        FileName: Option("string"),
        QualifiedName: "string",
        RawCcuThunk: CcuThunk,
        SimpleName: "string"
      }
    };
  }

  constructor(cenv, ccu) {
    this.cenv = cenv;
    this.ccu = ccu;
  }

  static [".ctor"](g, tcImports, ccu) {
    return new FSharpAssembly(new SymbolEnv(g, ccu, null, tcImports), ccu);
  }

  get RawCcuThunk() {
    return this.ccu;
  }

  get QualifiedName() {
    const matchValue = this.ccu.QualifiedName;

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return "";
    }
  }

  get CodeLocation() {
    return this.ccu.SourceCodeDirectory;
  }

  get FileName() {
    return this.ccu.FileName;
  }

  get SimpleName() {
    return this.ccu.AssemblyName;
  }

  get Contents() {
    return FSharpAssemblySignature[".ctor_0"](this.cenv, this.ccu);
  }

  ToString() {
    return this.ccu.ILScopeRef.QualifiedName;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpAssembly", FSharpAssembly);
export class FSharpOpenDeclaration {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpOpenDeclaration",
      properties: {
        AppliedScope: range_3,
        IsOwnNamespace: "boolean",
        LongId: makeGeneric(List, {
          T: Ident
        }),
        Modules: makeGeneric(List, {
          T: FSharpEntity
        }),
        Range: Option(range_3)
      }
    };
  }

  constructor(longId, range, modules, appliedScope, isOwnNamespace) {
    this.longId = longId;
    this.range = range;
    this.modules = modules;
    this.appliedScope = appliedScope;
    this.isOwnNamespace = isOwnNamespace;
  }

  get LongId() {
    return this.longId;
  }

  get Range() {
    return this.range;
  }

  get Modules() {
    return this.modules;
  }

  get AppliedScope() {
    return this.appliedScope;
  }

  get IsOwnNamespace() {
    return this.isOwnNamespace;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpOpenDeclaration", FSharpOpenDeclaration);
export class FSharpSymbolUse {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpSymbolUse",
      properties: {
        DisplayContext: FSharpDisplayContext,
        FileName: "string",
        IsDefinition: "boolean",
        IsFromAttribute: "boolean",
        IsFromComputationExpression: "boolean",
        IsFromDefinition: "boolean",
        IsFromDispatchSlotImplementation: "boolean",
        IsFromOpenStatement: "boolean",
        IsFromPattern: "boolean",
        IsFromType: "boolean",
        Range: Tuple([Tuple(["number", "number"]), Tuple(["number", "number"])]),
        RangeAlternate: range_3,
        Symbol: FSharpSymbol
      }
    };
  }

  constructor(g, denv, symbol, itemOcc, range) {
    this.g = g;
    this.denv = denv;
    this.symbol = symbol;
    this.itemOcc = itemOcc;
    this.range = range;
  }

  get Symbol() {
    return this.symbol;
  }

  get DisplayContext() {
    return new FSharpDisplayContext(_arg15 => this.denv);
  }

  get IsDefinition() {
    return this.IsFromDefinition;
  }

  get IsFromDefinition() {
    return this.itemOcc.Equals(new ItemOccurence(0));
  }

  get IsFromPattern() {
    return this.itemOcc.Equals(new ItemOccurence(4));
  }

  get IsFromType() {
    return this.itemOcc.Equals(new ItemOccurence(2));
  }

  get IsFromAttribute() {
    return this.itemOcc.Equals(new ItemOccurence(3));
  }

  get IsFromDispatchSlotImplementation() {
    return this.itemOcc.Equals(new ItemOccurence(5));
  }

  get IsFromComputationExpression() {
    var vref;
    const matchValue = [this.symbol.Item, this.itemOcc];
    const $var60 = matchValue[0].tag === 0 ? matchValue[1].tag === 1 ? (vref = matchValue[0].data, valRefEq(this.g, this.g.seq_vref, vref)) ? [0, matchValue[0].data] : [1] : [1] : [1];

    switch ($var60[0]) {
      case 0:
        return true;

      case 1:
        const $var61 = matchValue[0].tag === 16 ? matchValue[1].tag === 1 ? [0] : [1] : matchValue[0].tag === 15 ? matchValue[1].tag === 1 ? [0] : [1] : [1];

        switch ($var61[0]) {
          case 0:
            return true;

          case 1:
            return false;
        }

    }
  }

  get IsFromOpenStatement() {
    return this.itemOcc.Equals(new ItemOccurence(7));
  }

  get FileName() {
    return this.range.FileName;
  }

  get Range() {
    return _Range.toZ(this.range);
  }

  get RangeAlternate() {
    return this.range;
  }

  ToString() {
    return toText(printf("%O, %O, %O"))(this.symbol, this.itemOcc, this.range);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpSymbolUse", FSharpSymbolUse);