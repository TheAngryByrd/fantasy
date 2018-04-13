import { mkIEventType, mkRefTupledTy, isByrefTy, isObjTy, mkIteratedFunTy, stripTyEqns, argsOfAppTy, tyconRefEq, generalizeTyconRef, isListTy, isArray1DTy, Erasure, tryDestAppTy, helpEnsureTypeHasMetadata, isAnyTupleTy, metadataOfTy, ValRefIsExplicitImpl } from "./TastOps";
import { getValue } from "../fable-core/Option";
import { concat, reverse, append, ofArray, filter, map, choose } from "../fable-core/List";
import List from "../fable-core/List";
import { MemoizationTable, NameMultiMapModule } from "../absil/illib";
import { nonStandardEventError, MethInfosEquivByNameAndPartialSig, PropInfosEquivByNameAndSig, MethInfosEquivByNameAndSig, FoldEntireHierarchyOfType, AllowMultiIntfInstantiations, FoldPrimaryHierarchyOfType, ILEventInfo, ILFieldInfo, EventInfo, RecdFieldInfo, ILPropInfo, PropInfo, PropInfosEquivByNameAndPartialSig, ILTypeInfo, MethInfo } from "./infos";
import { IsILEventInfoAccessible, IsILFieldInfoAccessible, AccessorDomain, IsPropInfoAccessible, IsMethInfoAccessible } from "./AccessibilityLogic";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { GenericParam, comparePrimitives, equals, makeGeneric, hash } from "../fable-core/Util";
import { create } from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import { forAll, foldBack, empty, exists, singleton, collect, delay, toList } from "../fable-core/Seq";
import { range0 } from "./range";
import { ImportMap } from "./import";
import { TcGlobals } from "./TcGlobals";
import { CommitOperationResult, InternalError, warning, Error as _Error, error, UnresolvedPathReferenceNoRange } from "./ErrorLogger";
import { MemberKind } from "./ast";
import CurriedLambda from "../fable-core/CurriedLambda";
import { TType } from "./tast";
import { SR } from "../codegen/FSComp";
import { CheckMethInfoAttributes } from "./AttributeChecking";

function SelectImmediateMemberVals(g, optFilter, f, tcref) {
  const chooser = function (vref) {
    const matchValue = vref.MemberInfo;
    const $var1 = matchValue != null ? !ValRefIsExplicitImpl(g, vref) ? [0, getValue(matchValue)] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return f($var1[1], vref);

      case 1:
        return null;
    }
  };

  if (optFilter != null) {
    return function (list) {
      return choose(chooser, list);
    }(function (m) {
      return NameMultiMapModule.find(getValue(optFilter), m);
    }(tcref.MembersOfFSharpTyconByName));
  } else {
    return function (m_1) {
      return NameMultiMapModule.chooseRange(chooser, m_1);
    }(tcref.MembersOfFSharpTyconByName);
  }
}

function checkFilter(optFilter, nm) {
  if (optFilter != null) {
    return nm === getValue(optFilter);
  } else {
    return true;
  }
}

export function TrySelectMemberVal(g, optFilter, typ, pri, _membInfo, vref) {
  if (checkFilter(optFilter, vref.LogicalName)) {
    return new MethInfo(0, [g, typ, vref, pri]);
  } else {
    return null;
  }
}
export function GetImmediateIntrinsicMethInfosOfTypeAux(optFilter, ad, g, amap, m, origTy, metadataTy) {
  var pri;
  let minfos;
  const matchValue = metadataOfTy(g, metadataTy);

  if (matchValue.tag === 1) {
    if (isAnyTupleTy(g, metadataTy)) {
      const betterMetadataTy = helpEnsureTypeHasMetadata(g, metadataTy);
      minfos = GetImmediateIntrinsicMethInfosOfTypeAux(optFilter, ad, g, amap, m, origTy, betterMetadataTy);
    } else {
      const matchValue_1 = tryDestAppTy(g, metadataTy);

      if (matchValue_1 != null) {
        minfos = SelectImmediateMemberVals(g, optFilter, (pri = null, function (_membInfo, vref) {
          return TrySelectMemberVal(g, optFilter, origTy, pri, _membInfo, vref);
        }), getValue(matchValue_1));
      } else {
        minfos = new List();
      }
    }
  } else {
    const tinfo = function (arg00, arg10) {
      return ILTypeInfo.FromType(arg00, arg10);
    }(g, origTy);

    const mdefs = tinfo.RawMetadata.Methods;
    const mdefs_1 = optFilter != null ? mdefs.FindByName(getValue(optFilter)) : mdefs.AsList;
    minfos = map(function (mdef) {
      return MethInfo.CreateILMeth(amap, m, origTy, mdef);
    }, mdefs_1);
  }

  const minfos_1 = filter(function (minfo) {
    return IsMethInfoAccessible(amap, m, ad, minfo);
  }, minfos);
  return minfos_1;
}
export function GetImmediateIntrinsicMethInfosOfType(optFilter, ad, g, amap, m, typ) {
  return GetImmediateIntrinsicMethInfosOfTypeAux(optFilter, ad, g, amap, m, typ, typ);
}
export class PropertyCollector {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InfoReader.PropertyCollector",
      properties: {}
    };
  }

  constructor(g, amap, m, typ, optFilter, ad) {
    this.g = g;
    this.amap = amap;
    this.m = m;
    this.typ = typ;
    this.optFilter = optFilter;
    this.ad = ad;
    let hashIdentity;

    const $var2 = (pinfo1, pinfo2) => {
      if (pinfo1.IsStatic === pinfo2.IsStatic ? PropInfosEquivByNameAndPartialSig(new Erasure(2), this.g, this.amap, this.m, pinfo1, pinfo2) : false) {
        return pinfo1.IsDefiniteFSharpOverride === pinfo2.IsDefiniteFSharpOverride;
      } else {
        return false;
      }
    };

    const $var3 = this;
    hashIdentity = {
      GetHashCode(x) {
        return (pinfo => hash(pinfo.PropertyName))(x) | 0;
      },

      Equals(x, y) {
        return $var2(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    };
    this.props = create(null, fromEqualityComparer(hashIdentity));
  }

  Collect(membInfo, vref) {
    const matchValue = membInfo.MemberFlags.MemberKind;

    if (matchValue.tag === 3) {
      const pinfo = new PropInfo(0, [this.g, this.typ, vref, null]);

      if (checkFilter(this.optFilter, vref.PropertyName) ? IsPropInfoAccessible(this.g, this.amap, this.m, this.ad, pinfo) : false) {
        this.add(pinfo);
      }
    } else if (matchValue.tag === 4) {
      const pinfo_1 = new PropInfo(0, [this.g, this.typ, null, vref]);

      if (checkFilter(this.optFilter, vref.PropertyName) ? IsPropInfoAccessible(this.g, this.amap, this.m, this.ad, pinfo_1) : false) {
        this.add(pinfo_1);
      }
    }
  }

  Close() {
    return toList(delay(() => collect(matchValue => {
      const activePatternResult32379 = matchValue;
      return singleton(activePatternResult32379[1]);
    }, this.props)));
  }

  add(pinfo) {
    if (this.props.has(pinfo)) {
      const matchValue = [this.props.get(pinfo), pinfo];
      const $var4 = matchValue[0].tag === 0 ? matchValue[0].data[2] != null ? matchValue[1].tag === 0 ? matchValue[1].data[3] != null ? [0, matchValue[0].data[1], getValue(matchValue[0].data[2]), getValue(matchValue[1].data[3])] : matchValue[1].data[2] != null ? matchValue[0].data[3] != null ? [0, matchValue[0].data[1], getValue(matchValue[1].data[2]), getValue(matchValue[0].data[3])] : [1] : [1] : [1] : matchValue[0].data[3] != null ? matchValue[1].tag === 0 ? matchValue[1].data[2] != null ? [0, matchValue[0].data[1], getValue(matchValue[1].data[2]), getValue(matchValue[0].data[3])] : [1] : [1] : [1] : [1];

      switch ($var4[0]) {
        case 0:
          const pinfo_1 = new PropInfo(0, [this.g, $var4[1], $var4[2], $var4[3]]);
          this.props.set(pinfo_1, pinfo_1);
          break;

        case 1:
          break;
      }
    } else {
      this.props.set(pinfo, pinfo);
    }
  }

}
setType("Microsoft.FSharp.Compiler.InfoReader.PropertyCollector", PropertyCollector);
export function GetImmediateIntrinsicPropInfosOfTypeAux(optFilter, ad, g, amap, m, origTy, metadataTy) {
  let pinfos;
  const matchValue = metadataOfTy(g, metadataTy);

  if (matchValue.tag === 1) {
    if (isAnyTupleTy(g, metadataTy)) {
      const betterMetadataTy = helpEnsureTypeHasMetadata(g, metadataTy);
      pinfos = GetImmediateIntrinsicPropInfosOfTypeAux(optFilter, ad, g, amap, m, origTy, betterMetadataTy);
    } else {
      const matchValue_1 = tryDestAppTy(g, metadataTy);

      if (matchValue_1 != null) {
        const propCollector = new PropertyCollector(g, amap, m, origTy, optFilter, ad);
        SelectImmediateMemberVals(g, null, function (membInfo, vref) {
          propCollector.Collect(membInfo, vref);
          return null;
        }, getValue(matchValue_1));
        pinfos = propCollector.Close();
      } else {
        pinfos = new List();
      }
    }
  } else {
    const tinfo = function (arg00, arg10) {
      return ILTypeInfo.FromType(arg00, arg10);
    }(g, origTy);

    const pdefs = tinfo.RawMetadata.Properties;
    const pdefs_1 = optFilter != null ? pdefs.LookupByName(getValue(optFilter)) : pdefs.AsList;
    pinfos = map(function (pdef) {
      return new PropInfo(1, new ILPropInfo(0, [tinfo, pdef]));
    }, pdefs_1);
  }

  const pinfos_1 = filter(function (_arg1) {
    return IsPropInfoAccessible(g, amap, m, ad, _arg1);
  }, pinfos);
  return pinfos_1;
}
export function GetImmediateIntrinsicPropInfosOfType(optFilter, ad, g, amap, m, typ) {
  return GetImmediateIntrinsicPropInfosOfTypeAux(optFilter, ad, g, amap, m, typ, typ);
}
export function IsIndexerType(g, amap, typ) {
  if (isArray1DTy(g, typ) ? true : isListTy(g, typ)) {
    return true;
  } else {
    const matchValue = tryDestAppTy(g, typ);

    if (matchValue == null) {
      return false;
    } else {
      const patternInput = generalizeTyconRef(getValue(matchValue));
      const props = GetImmediateIntrinsicPropInfosOfType(null, new AccessorDomain(2), g, amap, range0, patternInput[1]);
      return exists(function (x) {
        return x.PropertyName === "Item";
      }, props);
    }
  }
}
export class HierarchyItem {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InfoReader.HierarchyItem",
      interfaces: ["FSharpUnion"],
      cases: [["MethodItem", makeGeneric(List, {
        T: makeGeneric(List, {
          T: MethInfo
        })
      })], ["PropertyItem", makeGeneric(List, {
        T: makeGeneric(List, {
          T: PropInfo
        })
      })], ["RecdFieldItem", RecdFieldInfo], ["EventItem", makeGeneric(List, {
        T: EventInfo
      })], ["ILFieldItem", makeGeneric(List, {
        T: ILFieldInfo
      })]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.InfoReader.HierarchyItem", HierarchyItem);
export class InfoReader {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InfoReader.InfoReader",
      properties: {
        amap: ImportMap,
        g: TcGlobals
      }
    };
  }

  constructor(g, amap) {
    var $var7;
    var $var8;
    this["g@209"] = g;
    this["amap@209"] = amap;
    let hashFlags1;
    const $var5 = this;
    hashFlags1 = {
      GetHashCode(_arg13) {
        return hash(_arg13[0]) + AccessorDomain.CustomGetHashCode(_arg13[1]) | 0;
      },

      Equals(_arg14, _arg15) {
        if (equals(_arg14[0], _arg15[0])) {
          return AccessorDomain.CustomEquals($var5["g@209"], _arg14[1], _arg15[1]);
        } else {
          return false;
        }
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    };
    let hashFlags2;
    const $var6 = this;
    hashFlags2 = {
      GetHashCode(_arg16) {
        return hash(_arg16[0]) + AccessorDomain.CustomGetHashCode(_arg16[1]) | 0;
      },

      Equals(_arg17, _arg18) {
        if (_arg17[0] === _arg18[0]) {
          return AccessorDomain.CustomEquals($var6["g@209"], _arg17[1], _arg18[1]);
        } else {
          return false;
        }
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    };

    this.methodInfoCache = ((f, flagsEq) => this.MakeInfoCache(f, flagsEq))(tupledArg => this.GetIntrinsicMethodSetsUncached(tupledArg[0], tupledArg[1], tupledArg[2]), this.hashFlags0());

    this.propertyInfoCache = ((f_1, flagsEq_1) => this.MakeInfoCache(f_1, flagsEq_1))(tupledArg_1 => this.GetIntrinsicPropertySetsUncached(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]), this.hashFlags0());

    this.recdOrClassFieldInfoCache = ((f_2, flagsEq_2) => this.MakeInfoCache(f_2, flagsEq_2))(tupledArg_2 => this.GetIntrinsicRecdOrClassFieldInfosUncached(tupledArg_2[0], tupledArg_2[1], tupledArg_2[2]), hashFlags1);

    this.ilFieldInfoCache = ((f_3, flagsEq_3) => this.MakeInfoCache(f_3, flagsEq_3))(tupledArg_3 => this.GetIntrinsicILFieldInfosUncached(tupledArg_3[0], tupledArg_3[1], tupledArg_3[2]), hashFlags1);

    this.eventInfoCache = ((f_4, flagsEq_4) => this.MakeInfoCache(f_4, flagsEq_4))(tupledArg_4 => this.GetIntrinsicEventInfosUncached(tupledArg_4[0], tupledArg_4[1], tupledArg_4[2]), hashFlags1);

    this.namedItemsCache = ((f_5, flagsEq_5) => this.MakeInfoCache(f_5, flagsEq_5))(tupledArg_5 => this.GetIntrinsicNamedItemsUncached(tupledArg_5[0], tupledArg_5[1], tupledArg_5[2]), hashFlags2);

    this.entireTypeHierarchyCache = ((f_6, flagsEq_6) => this.MakeInfoCache(f_6, flagsEq_6))(tupledArg_6 => this.GetEntireTypeHierachyUncached(tupledArg_6[0], tupledArg_6[1], tupledArg_6[2]), ($var7 = this, {
      GetHashCode(x) {
        return (obj => hash(obj))(x) | 0;
      },

      Equals(x, y) {
        return ((e1, e2) => equals(e1, e2))(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    }));

    this.primaryTypeHierarchyCache = ((f_7, flagsEq_7) => this.MakeInfoCache(f_7, flagsEq_7))(tupledArg_7 => this.GetPrimaryTypeHierachyUncached(tupledArg_7[0], tupledArg_7[1], tupledArg_7[2]), ($var8 = this, {
      GetHashCode(x) {
        return (obj_1 => hash(obj_1))(x) | 0;
      },

      Equals(x, y) {
        return ((e1_1, e2_1) => equals(e1_1, e2_1))(x, y);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    }));
  }

  get g() {
    return this["g@209"];
  }

  get amap() {
    return this["amap@209"];
  }

  GetRawIntrinsicMethodSetsOfType(optFilter, ad, allowMultiIntfInst, m, typ) {
    return this.methodInfoCache.Apply([[optFilter, ad, allowMultiIntfInst], m, typ]);
  }

  GetRawIntrinsicPropertySetsOfType(optFilter, ad, allowMultiIntfInst, m, typ) {
    return this.propertyInfoCache.Apply([[optFilter, ad, allowMultiIntfInst], m, typ]);
  }

  GetRecordOrClassFieldsOfType(optFilter, ad, m, typ) {
    return this.recdOrClassFieldInfoCache.Apply([[optFilter, ad], m, typ]);
  }

  GetILFieldInfosOfType(optFilter, ad, m, typ) {
    return this.ilFieldInfoCache.Apply([[optFilter, ad], m, typ]);
  }

  GetImmediateIntrinsicEventsOfType(optFilter, ad, m, typ) {
    return this.ComputeImmediateIntrinsicEventsOfType(optFilter, ad, m, typ);
  }

  GetEventInfosOfType(optFilter, ad, m, typ) {
    return this.eventInfoCache.Apply([[optFilter, ad], m, typ]);
  }

  TryFindRecdOrClassFieldInfoOfType(nm, m, typ) {
    const matchValue = this.recdOrClassFieldInfoCache.Apply([[nm, new AccessorDomain(3)], m, typ]);

    if (matchValue.tail != null) {
      if (matchValue.tail.tail == null) {
        return matchValue.head;
      } else {
        const matchValue_1 = tryDestAppTy(this["g@209"], typ);

        if (matchValue_1 != null) {
          const matchValue_2 = filter(rfinfo => tyconRefEq(this["g@209"], getValue(matchValue_1), rfinfo.TyconRef), matchValue);

          if (matchValue_2.tail != null) {
            if (matchValue_2.tail.tail == null) {
              return matchValue_2.head;
            } else {
              throw new Error("unexpected multiple fields with same name");
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  }

  TryFindNamedItemOfType(nm, ad, m, typ) {
    return this.namedItemsCache.Apply([[nm, ad], m, typ]);
  }

  GetEntireTypeHierachy(allowMultiIntfInst, m, typ) {
    return this.entireTypeHierarchyCache.Apply([allowMultiIntfInst, m, typ]);
  }

  GetPrimaryTypeHierachy(allowMultiIntfInst, m, typ) {
    return this.primaryTypeHierarchyCache.Apply([allowMultiIntfInst, m, typ]);
  }

  GetImmediateIntrinsicILFieldsOfType(optFilter, ad, m, typ) {
    var g;
    var amap;
    let infos;
    const matchValue = metadataOfTy(this["g@209"], typ);

    if (matchValue.tag === 1) {
      infos = new List();
    } else {
      const tinfo = ((arg00, arg10) => ILTypeInfo.FromType(arg00, arg10))(this["g@209"], typ);

      const fdefs = tinfo.RawMetadata.Fields;
      const fdefs_1 = optFilter != null ? fdefs.LookupByName(getValue(optFilter)) : fdefs.AsList;
      infos = map(pd => new ILFieldInfo(0, [tinfo, pd]), fdefs_1);
    }

    const infos_1 = filter((g = this["g@209"], amap = this["amap@209"], x => IsILFieldInfoAccessible(g, amap, m, ad, x)), infos);
    return infos_1;
  }

  ComputeImmediateIntrinsicEventsOfType(optFilter, ad, m, typ) {
    let infos;
    const matchValue = metadataOfTy(this["g@209"], typ);

    if (matchValue.tag === 1) {
      infos = new List();
    } else {
      const tinfo = ((arg00, arg10) => ILTypeInfo.FromType(arg00, arg10))(this["g@209"], typ);

      const edefs = tinfo.RawMetadata.Events;
      const edefs_1 = optFilter != null ? edefs.LookupByName(getValue(optFilter)) : edefs.AsList;
      infos = toList(delay(() => collect(edef => {
        const ileinfo = new ILEventInfo(0, [tinfo, edef]);

        if (IsILEventInfoAccessible(this["g@209"], this["amap@209"], m, ad, ileinfo)) {
          return singleton(new EventInfo(1, ileinfo));
        } else {
          return empty();
        }
      }, edefs_1)));
    }

    return infos;
  }

  MakeRecdFieldInfo(g, typ, tcref, fspec) {
    return new RecdFieldInfo(0, [argsOfAppTy(g, typ), tcref.MakeNestedRecdFieldRef(fspec)]);
  }

  GetImmediateIntrinsicRecdOrClassFieldsOfType(optFilter, _ad, _m, typ) {
    const matchValue = tryDestAppTy(this["g@209"], typ);

    if (matchValue != null) {
      if (optFilter == null) {
        return toList(delay(() => collect(fdef => !fdef.IsCompilerGenerated ? singleton(((g, typ_1, tcref, fspec) => this.MakeRecdFieldInfo(g, typ_1, tcref, fspec))(this["g@209"], typ, getValue(matchValue), fdef)) : empty(), getValue(matchValue).AllFieldsArray)));
      } else {
        const matchValue_1 = getValue(matchValue).GetFieldByName(getValue(optFilter));
        const $var9 = matchValue_1 != null ? !getValue(matchValue_1).IsCompilerGenerated ? [0, getValue(matchValue_1)] : [1] : [1];

        switch ($var9[0]) {
          case 0:
            return ofArray([((g_1, typ_2, tcref_1, fspec_1) => this.MakeRecdFieldInfo(g_1, typ_2, tcref_1, fspec_1))(this["g@209"], typ, getValue(matchValue), $var9[1])]);

          case 1:
            return new List();
        }
      }
    } else {
      return new List();
    }
  }

  GetIntrinsicMethodSetsUncached(_arg1, m, typ) {
    return FoldPrimaryHierarchyOfType((typ_1, acc) => new List(GetImmediateIntrinsicMethInfosOfType(_arg1[0], _arg1[1], this["g@209"], this["amap@209"], m, typ_1), acc), this["g@209"], this["amap@209"], m, _arg1[2], typ, new List());
  }

  GetIntrinsicPropertySetsUncached(_arg2, m, typ) {
    return FoldPrimaryHierarchyOfType((typ_1, acc) => new List(GetImmediateIntrinsicPropInfosOfType(_arg2[0], _arg2[1], this["g@209"], this["amap@209"], m, typ_1), acc), this["g@209"], this["amap@209"], m, _arg2[2], typ, new List());
  }

  GetIntrinsicILFieldInfosUncached(_arg3, m, typ) {
    return FoldPrimaryHierarchyOfType((typ_1, acc) => append(this.GetImmediateIntrinsicILFieldsOfType(_arg3[0], _arg3[1], m, typ_1), acc), this["g@209"], this["amap@209"], m, new AllowMultiIntfInstantiations(0), typ, new List());
  }

  GetIntrinsicEventInfosUncached(_arg4, m, typ) {
    return FoldPrimaryHierarchyOfType((typ_1, acc) => append(this.ComputeImmediateIntrinsicEventsOfType(_arg4[0], _arg4[1], m, typ_1), acc), this["g@209"], this["amap@209"], m, new AllowMultiIntfInstantiations(0), typ, new List());
  }

  GetIntrinsicRecdOrClassFieldInfosUncached(_arg5, m, typ) {
    return FoldPrimaryHierarchyOfType((typ_1, acc) => append(this.GetImmediateIntrinsicRecdOrClassFieldsOfType(_arg5[0], _arg5[1], m, typ_1), acc), this["g@209"], this["amap@209"], m, new AllowMultiIntfInstantiations(0), typ, new List());
  }

  GetEntireTypeHierachyUncached(allowMultiIntfInst, m, typ) {
    return FoldEntireHierarchyOfType((typ_1, acc) => new List(typ_1, acc), this["g@209"], this["amap@209"], m, allowMultiIntfInst, typ, new List());
  }

  GetPrimaryTypeHierachyUncached(allowMultiIntfInst, m, typ) {
    return FoldPrimaryHierarchyOfType((typ_1, acc) => new List(typ_1, acc), this["g@209"], this["amap@209"], m, allowMultiIntfInst, typ, new List());
  }

  GetIntrinsicNamedItemsUncached(_arg6, m, typ) {
    if (_arg6[0] === ".ctor") {
      return null;
    } else {
      const optFilter = _arg6[0];
      return FoldPrimaryHierarchyOfType((typ_1, acc) => {
        var inheritedMethSets;
        var inheritedPropSets;
        const minfos = GetImmediateIntrinsicMethInfosOfType(optFilter, _arg6[1], this["g@209"], this["amap@209"], m, typ_1);
        const pinfos = GetImmediateIntrinsicPropInfosOfType(optFilter, _arg6[1], this["g@209"], this["amap@209"], m, typ_1);
        const finfos = this.GetImmediateIntrinsicILFieldsOfType(optFilter, _arg6[1], m, typ_1);
        const einfos = this.ComputeImmediateIntrinsicEventsOfType(optFilter, _arg6[1], m, typ_1);
        const rfinfos = this.GetImmediateIntrinsicRecdOrClassFieldsOfType(optFilter, _arg6[1], m, typ_1);
        const $var10 = acc != null ? getValue(acc).tag === 0 ? (inheritedMethSets = getValue(acc).data, !(minfos.tail == null)) ? [0, getValue(acc).data] : [1] : [1] : [1];

        switch ($var10[0]) {
          case 0:
            return new HierarchyItem(0, new List(minfos, $var10[1]));

          case 1:
            if (!(minfos.tail == null)) {
              return new HierarchyItem(0, ofArray([minfos]));
            } else {
              const $var11 = acc != null ? getValue(acc).tag === 1 ? (inheritedPropSets = getValue(acc).data, !(pinfos.tail == null)) ? [0, getValue(acc).data] : [1] : [1] : [1];

              switch ($var11[0]) {
                case 0:
                  return new HierarchyItem(1, new List(pinfos, $var11[1]));

                case 1:
                  if (!(pinfos.tail == null)) {
                    return new HierarchyItem(1, ofArray([pinfos]));
                  } else if (!(finfos.tail == null)) {
                    return new HierarchyItem(4, finfos);
                  } else if (!(einfos.tail == null)) {
                    return new HierarchyItem(3, einfos);
                  } else if (!(rfinfos.tail == null)) {
                    const $var12 = rfinfos.tail != null ? rfinfos.tail.tail == null ? [0, rfinfos.head] : [1] : [1];

                    switch ($var12[0]) {
                      case 0:
                        return new HierarchyItem(2, $var12[1]);

                      case 1:
                        throw new Error("Unexpected multiple fields with the same name");
                    }
                  } else {
                    return acc;
                  }

              }
            }

        }
      }, this["g@209"], this["amap@209"], m, new AllowMultiIntfInstantiations(0), typ, null);
    }
  }

  MakeInfoCache(f, flagsEq) {
    var $var13;
    return new MemoizationTable(f, ($var13 = this, {
      Equals(_arg7, _arg8) {
        if (flagsEq.Equals(_arg7[0], _arg8[0])) {
          const matchValue = [stripTyEqns($var13["g@209"], _arg7[2]), stripTyEqns($var13["g@209"], _arg8[2])];
          const $var14 = matchValue[0].tag === 1 ? matchValue[0].data[1].tail == null ? matchValue[1].tag === 1 ? matchValue[1].data[1].tail == null ? [0, matchValue[0].data[0], matchValue[1].data[0]] : [1] : [1] : [1] : [1];

          switch ($var14[0]) {
            case 0:
              return tyconRefEq($var13["g@209"], $var14[1], $var14[2]);

            case 1:
              return false;
          }
        } else {
          return false;
        }
      },

      GetHashCode(_arg9) {
        return flagsEq.GetHashCode(_arg9[0]) + (() => {
          const matchValue = stripTyEqns($var13["g@209"], _arg9[2]);
          const $var15 = matchValue.tag === 1 ? matchValue.data[1].tail == null ? [0, matchValue.data[0]] : [1] : [1];

          switch ($var15[0]) {
            case 0:
              return hash($var15[1].LogicalName) | 0;

            case 1:
              return 0;
          }
        })() | 0;
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    }), tupledArg => {
      const matchValue = stripTyEqns(this["g@209"], tupledArg[2]);
      const $var16 = matchValue.tag === 1 ? matchValue.data[1].tail == null ? [0, matchValue.data[0]] : [1] : [1];

      switch ($var16[0]) {
        case 0:
          return $var16[1].TypeContents.tcaug_closed;

        case 1:
          return false;
      }
    });
  }

  hashFlags0() {
    const $var17 = this;
    return {
      GetHashCode(_arg10) {
        return hash(_arg10[0]) + AccessorDomain.CustomGetHashCode(_arg10[1]) | 0;
      },

      Equals(_arg11, _arg12) {
        if (equals(_arg11[0], _arg12[0]) ? AccessorDomain.CustomEquals($var17["g@209"], _arg11[1], _arg12[1]) : false) {
          return equals(_arg11[2], _arg12[2]);
        } else {
          return false;
        }
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.Collections.Generic.IEqualityComparer"]
        };
      }

    };
  }

}
setType("Microsoft.FSharp.Compiler.InfoReader.InfoReader", InfoReader);
export function GetIntrinsicConstructorInfosOfTypeAux(infoReader, m, origTy, metadataTy) {
  try {
    return function () {
      const g = infoReader.g;
      const amap = infoReader.amap;
      const matchValue = metadataOfTy(g, metadataTy);

      if (matchValue.tag === 1) {
        if (isAnyTupleTy(g, metadataTy)) {
          const betterMetadataTy = helpEnsureTypeHasMetadata(g, metadataTy);
          return GetIntrinsicConstructorInfosOfTypeAux(infoReader, m, origTy, betterMetadataTy);
        } else {
          const matchValue_1 = tryDestAppTy(g, metadataTy);

          if (matchValue_1 != null) {
            return map(function (x) {
              return new MethInfo(0, [g, origTy, x, null]);
            }, choose(function (vref) {
              const matchValue_2 = vref.MemberInfo;
              const $var18 = matchValue_2 != null ? getValue(matchValue_2).MemberFlags.MemberKind.Equals(new MemberKind(1)) ? [0, getValue(matchValue_2)] : [1] : [1];

              switch ($var18[0]) {
                case 0:
                  return vref;

                case 1:
                  return null;
              }
            }, NameMultiMapModule.find(".ctor", getValue(matchValue_1).MembersOfFSharpTyconByName)));
          } else {
            return new List();
          }
        }
      } else {
        const tinfo = function (arg00, arg10) {
          return ILTypeInfo.FromType(arg00, arg10);
        }(g, origTy);

        return map(function (mdef) {
          return MethInfo.CreateILMeth(amap, m, origTy, mdef);
        }, filter(function (md) {
          return md.IsConstructor;
        }, tinfo.RawMetadata.Methods.FindByName(".ctor")));
      }
    }();
  } catch (matchValue_3) {
    if (matchValue_3 instanceof UnresolvedPathReferenceNoRange) {
      return new List();
    } else {
      throw matchValue_3;
    }
  }
}
export function GetIntrinsicConstructorInfosOfType(infoReader, m, typ) {
  return GetIntrinsicConstructorInfosOfTypeAux(infoReader, m, typ, typ);
}
export class FindMemberFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InfoReader.FindMemberFlag",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["IgnoreOverrides"], ["PreferOverrides"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.InfoReader.FindMemberFlag", FindMemberFlag);

class IndexedList {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InfoReader.IndexedList",
      properties: {
        Empty: makeGeneric(IndexedList, {
          T: GenericParam("T")
        }),
        Items: makeGeneric(List, {
          T: makeGeneric(List, {
            T: GenericParam("T")
          })
        })
      }
    };
  }

  constructor(itemLists, itemsByName) {
    this.itemLists = itemLists;
    this.itemsByName = itemsByName;
  }

  get Items() {
    return this.itemLists;
  }

  ItemsWithName(nm) {
    return NameMultiMapModule.find(nm, this.itemsByName);
  }

  AddItems(items, nmf) {
    return new IndexedList(new List(items, this.itemLists), foldBack((x, acc) => NameMultiMapModule.add(nmf(x), x, acc), items, this.itemsByName));
  }

  static get Empty() {
    return new IndexedList(new List(), NameMultiMapModule.empty());
  }

  FilterNewItems(keepTest, nmf, itemsToAdd) {
    return filter(item => forAll(CurriedLambda(keepTest)(item), this.ItemsWithName(nmf(item))), itemsToAdd);
  }

}

setType("Microsoft.FSharp.Compiler.InfoReader.IndexedList", IndexedList);

function FilterItemsInSubTypesBasedOnItemsInSuperTypes(nmf, keepTest, itemLists) {
  const loop = function (itemLists_1) {
    if (itemLists_1.tail != null) {
      const ilist = loop(itemLists_1.tail);

      const itemsToAdd = function (arg00, arg10, arg20) {
        return ilist.FilterNewItems(arg00, arg10, arg20);
      }(keepTest, nmf, itemLists_1.head);

      return ilist.AddItems(itemsToAdd, nmf);
    } else {
      return IndexedList.Empty;
    }
  };

  return loop(itemLists).Items;
}

function FilterItemsInSuperTypesBasedOnItemsInSubTypes(nmf, keepTest, itemLists) {
  const loop = function (itemLists_1, indexedItemsInSubTypes) {
    loop: while (true) {
      if (itemLists_1.tail != null) {
        const itemsToAdd = filter(function (item) {
          return keepTest(item, indexedItemsInSubTypes.ItemsWithName(nmf(item)));
        }, itemLists_1.head);
        const ilist = indexedItemsInSubTypes.AddItems(itemsToAdd, nmf);
        itemLists_1 = itemLists_1.tail;
        indexedItemsInSubTypes = ilist;
        continue loop;
      } else {
        return reverse(indexedItemsInSubTypes.Items);
      }
    }
  };

  return loop(itemLists, IndexedList.Empty);
}

function ExcludeItemsInSuperTypesBasedOnEquivTestWithItemsInSubTypes(nmf, equivTest, itemLists) {
  return FilterItemsInSuperTypesBasedOnItemsInSubTypes(nmf, function (item1, items) {
    return !exists(function (item2) {
      return equivTest(item1, item2);
    }, items);
  }, itemLists);
}

function FilterOverrides(findFlag, isVirt, isNewSlot, isDefiniteOverride, isFinal, equivSigs, nmf, items) {
  var keepTest;
  var keepTest_1;
  var predicate;

  const equivVirts = function (x, y) {
    if (isVirt(x) ? isVirt(y) : false) {
      return equivSigs(x, y);
    } else {
      return false;
    }
  };

  if (findFlag.tag === 0) {
    const equivNewSlots = function (x_1, y_1) {
      if (isNewSlot(x_1) ? isNewSlot(y_1) : false) {
        return equivSigs(x_1, y_1);
      } else {
        return false;
      }
    };

    return (keepTest = function (item1, superTypeItems) {
      return !((isNewSlot(item1) ? exists(CurriedLambda(equivNewSlots)(item1), superTypeItems) : false) ? exists(function (item2) {
        return isDefiniteOverride(item1) ? equivVirts(item1, item2) : false;
      }, superTypeItems) : false);
    }, function (itemLists) {
      return FilterItemsInSuperTypesBasedOnItemsInSubTypes(nmf, keepTest, itemLists);
    })((keepTest_1 = function (newItem, priorItem) {
      return (((isVirt(newItem) ? isFinal(newItem) : false) ? true : !isVirt(newItem)) ? true : isNewSlot(newItem)) ? true : !equivVirts(newItem, priorItem);
    }, function (itemLists_1) {
      return FilterItemsInSubTypesBasedOnItemsInSuperTypes(nmf, keepTest_1, itemLists_1);
    })(map((predicate = function (x_2) {
      return !isDefiniteOverride(x_2);
    }, function (list) {
      return filter(predicate, list);
    }), items)));
  } else {
    return function (itemLists_2) {
      return ExcludeItemsInSuperTypesBasedOnEquivTestWithItemsInSubTypes(nmf, equivVirts, itemLists_2);
    }(map(function (items_1) {
      const definiteOverrides = function (list_1) {
        return filter(isDefiniteOverride, list_1);
      }(items_1);

      return filter(function (item) {
        return isDefiniteOverride(item) ? true : !exists(CurriedLambda(equivVirts)(item), definiteOverrides);
      }, items_1);
    }, items));
  }
}

function FilterOverridesOfMethInfos(findFlag, g, amap, m, minfos) {
  var erasureFlag;
  return FilterOverrides(findFlag, function (minfo) {
    return minfo.IsVirtual;
  }, function (minfo_1) {
    return minfo_1.IsNewSlot;
  }, function (minfo_2) {
    return minfo_2.IsDefiniteFSharpOverride;
  }, function (minfo_3) {
    return minfo_3.IsFinal;
  }, (erasureFlag = new Erasure(2), function (minfo_4, minfo2) {
    return MethInfosEquivByNameAndSig(erasureFlag, true, g, amap, m, minfo_4, minfo2);
  }), function (minfo_5) {
    return minfo_5.LogicalName;
  }, minfos);
}

function FilterOverridesOfPropInfos(findFlag, g, amap, m, props) {
  var erasureFlag;
  return FilterOverrides(findFlag, function (pinfo) {
    return pinfo.IsVirtualProperty;
  }, function (pinfo_1) {
    return pinfo_1.IsNewSlot;
  }, function (pinfo_2) {
    return pinfo_2.IsDefiniteFSharpOverride;
  }, function (_arg1) {
    return false;
  }, (erasureFlag = new Erasure(2), function (pinfo_3, pinfo2) {
    return PropInfosEquivByNameAndSig(erasureFlag, g, amap, m, pinfo_3, pinfo2);
  }), function (pinfo_4) {
    return pinfo_4.PropertyName;
  }, props);
}

export function ExcludeHiddenOfMethInfos(g, amap, m, minfos) {
  return concat(ExcludeItemsInSuperTypesBasedOnEquivTestWithItemsInSubTypes(function (minfo) {
    return minfo.LogicalName;
  }, function (m1, m2) {
    return !tyconRefEq(g, m1.DeclaringTyconRef, m2.DeclaringTyconRef) ? MethInfosEquivByNameAndPartialSig(new Erasure(2), true, g, amap, m, m1, m2) : false;
  }, minfos));
}
export function ExcludeHiddenOfPropInfos(g, amap, m, pinfos) {
  var erasureFlag;
  return concat(ExcludeItemsInSuperTypesBasedOnEquivTestWithItemsInSubTypes(function (pinfo) {
    return pinfo.PropertyName;
  }, (erasureFlag = new Erasure(2), function (pinfo_1, pinfo2) {
    return PropInfosEquivByNameAndPartialSig(erasureFlag, g, amap, m, pinfo_1, pinfo2);
  }), pinfos));
}
export function GetIntrinsicMethInfoSetsOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, m, typ) {
  var g;
  var amap;
  return (g = infoReader.g, amap = infoReader.amap, function (minfos) {
    return FilterOverridesOfMethInfos(findFlag, g, amap, m, minfos);
  })(infoReader.GetRawIntrinsicMethodSetsOfType(optFilter, ad, allowMultiIntfInst, m, typ));
}
export function GetIntrinsicPropInfoSetsOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, m, typ) {
  var g;
  var amap;
  return (g = infoReader.g, amap = infoReader.amap, function (props) {
    return FilterOverridesOfPropInfos(findFlag, g, amap, m, props);
  })(infoReader.GetRawIntrinsicPropertySetsOfType(optFilter, ad, allowMultiIntfInst, m, typ));
}
export function GetIntrinsicMethInfosOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, m, typ) {
  return concat(GetIntrinsicMethInfoSetsOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, m, typ));
}
export function GetIntrinsicPropInfosOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, m, typ) {
  return concat(GetIntrinsicPropInfoSetsOfType(infoReader, optFilter, ad, allowMultiIntfInst, findFlag, m, typ));
}
export function TryFindIntrinsicNamedItemOfType(infoReader, nm, ad, findFlag, m, typ) {
  var g;
  var amap;
  var g_1;
  var amap_1;
  const matchValue = infoReader.TryFindNamedItemOfType(nm, ad, m, typ);

  if (matchValue == null) {
    return null;
  } else if (getValue(matchValue).tag === 1) {
    return new HierarchyItem(1, (g = infoReader.g, amap = infoReader.amap, function (props) {
      return FilterOverridesOfPropInfos(findFlag, g, amap, m, props);
    })(getValue(matchValue).data));
  } else if (getValue(matchValue).tag === 0) {
    return new HierarchyItem(0, (g_1 = infoReader.g, amap_1 = infoReader.amap, function (minfos) {
      return FilterOverridesOfMethInfos(findFlag, g_1, amap_1, m, minfos);
    })(getValue(matchValue).data));
  } else {
    return getValue(matchValue);
  }
}
export function TryFindIntrinsicMethInfo(infoReader, m, ad, nm, ty) {
  return GetIntrinsicMethInfosOfType(infoReader, nm, ad, new AllowMultiIntfInstantiations(0), new FindMemberFlag(0), m, ty);
}
export function TryFindPropInfo(infoReader, m, ad, nm, ty) {
  return GetIntrinsicPropInfosOfType(infoReader, nm, ad, new AllowMultiIntfInstantiations(0), new FindMemberFlag(0), m, ty);
}
export class SigOfFunctionForDelegate {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.InfoReader.SigOfFunctionForDelegate",
      interfaces: ["FSharpUnion"],
      cases: [["SigOfFunctionForDelegate", MethInfo, makeGeneric(List, {
        T: TType
      }), TType, TType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.InfoReader.SigOfFunctionForDelegate", SigOfFunctionForDelegate);
export function GetSigOfFunctionForDelegate(infoReader, delty, m, ad) {
  const g = infoReader.g;
  const amap = infoReader.amap;
  let invokeMethInfo;
  const matchValue = GetIntrinsicMethInfosOfType(infoReader, "Invoke", ad, new AllowMultiIntfInstantiations(0), new FindMemberFlag(0), m, delty);

  if (matchValue.tail == null) {
    invokeMethInfo = error(new _Error(SR.noInvokeMethodsFound(), m));
  } else if (matchValue.tail.tail == null) {
    invokeMethInfo = matchValue.head;
  } else {
    warning(new InternalError(SR.moreThanOneInvokeMethodFound(), m));
    invokeMethInfo = matchValue.head;
  }

  const minst = new List();
  let compiledViewOfDelArgTys;
  const matchValue_1 = invokeMethInfo.GetParamTypes(amap, m, minst);
  const $var19 = matchValue_1.tail != null ? matchValue_1.tail.tail == null ? [0, matchValue_1.head] : [1] : [1];

  switch ($var19[0]) {
    case 0:
      compiledViewOfDelArgTys = $var19[1];
      break;

    case 1:
      compiledViewOfDelArgTys = error(new _Error(SR.delegatesNotAllowedToHaveCurriedSignatures(), m));
      break;
  }

  const fsharpViewOfDelArgTys = compiledViewOfDelArgTys.tail == null ? ofArray([g.unit_ty]) : compiledViewOfDelArgTys;
  const delRetTy = invokeMethInfo.GetFSharpReturnTy(amap, m, minst);
  CommitOperationResult(CheckMethInfoAttributes(g, m, null, invokeMethInfo));
  const fty = mkIteratedFunTy(fsharpViewOfDelArgTys, delRetTy);
  return new SigOfFunctionForDelegate(0, [invokeMethInfo, compiledViewOfDelArgTys, delRetTy, fty]);
}
export function TryDestStandardDelegateTyp(infoReader, m, ad, delTy) {
  const g = infoReader.g;
  const patternInput = GetSigOfFunctionForDelegate(infoReader, delTy, m, ad);
  const $var20 = patternInput.data[1].tail != null ? (isObjTy(g, patternInput.data[1].head) ? !exists(function (arg10_) {
    return isByrefTy(g, arg10_);
  }, patternInput.data[1].tail) : false) ? [0, patternInput.data[1].tail, patternInput.data[1].head] : [1] : [1];

  switch ($var20[0]) {
    case 0:
      return [mkRefTupledTy(g, $var20[1]), patternInput.data[2]];

    case 1:
      return null;
  }
}
export function IsStandardEventInfo(infoReader, m, ad, einfo) {
  const dty = einfo.GetDelegateType(infoReader.amap, m);
  const matchValue = TryDestStandardDelegateTyp(infoReader, m, ad, dty);

  if (matchValue == null) {
    return false;
  } else {
    return true;
  }
}
export function ArgsTypOfEventInfo(infoReader, m, ad, einfo) {
  const amap = infoReader.amap;
  const dty = einfo.GetDelegateType(amap, m);
  const matchValue = TryDestStandardDelegateTyp(infoReader, m, ad, dty);

  if (matchValue == null) {
    return error(nonStandardEventError(einfo.EventName, m));
  } else {
    const argtys = getValue(matchValue)[0];
    return argtys;
  }
}
export function PropTypOfEventInfo(infoReader, m, ad, einfo) {
  const g = infoReader.g;
  const amap = infoReader.amap;
  const delTy = einfo.GetDelegateType(amap, m);
  const argsTy = ArgsTypOfEventInfo(infoReader, m, ad, einfo);
  return mkIEventType(g, delTy, argsTy);
}