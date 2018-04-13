import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Option, makeGeneric } from "../fable-core/Util";
import { ofArray, append } from "../fable-core/List";
import List from "../fable-core/List";
import { canAccessFromOneOf, canAccessFromEverywhere, canAccessFrom, canAccessFromSomewhere, EntityRef, CompilationPath } from "./tast";
import { getValue } from "../fable-core/Option";
import { destAppTy, isAppTy, generalizedTyconRef, tyconRefEq } from "./TastOps";
import { forAll, exists } from "../fable-core/Seq";
import { resolveILMethodRef, mkRefForNestedILTypeDef, ILTypeDefAccess, ILMemberAccess } from "../absil/il";
import { ILTypeInfo, ExistsHeadTypeInEntireHierarchy } from "./infos";
import { ImportILTypeRef } from "./import";
import { Error as _Error, errorR } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
export class AccessorDomain {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AccessibilityLogic.AccessorDomain",
      interfaces: ["FSharpUnion"],
      cases: [["AccessibleFrom", makeGeneric(List, {
        T: CompilationPath
      }), Option(EntityRef)], ["AccessibleFromEverywhere"], ["AccessibleFromSomeFSharpCode"], ["AccessibleFromSomewhere"]]
    };
  }

  static CustomGetHashCode(ad) {
    if (ad.tag === 1) {
      return 2;
    } else if (ad.tag === 2) {
      return 3;
    } else if (ad.tag === 3) {
      return 4;
    } else {
      return 1;
    }
  }

  static CustomEquals(g, ad1, ad2) {
    const matchValue = [ad1, ad2];
    const $var1 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [1] : [4] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [2] : [4] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [3] : [4] : matchValue[1].tag === 0 ? [0, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [4];

    switch ($var1[0]) {
      case 0:
        if ($var1[1].Equals($var1[2])) {
          const matchValue_1 = [$var1[3], $var1[4]];
          const $var2 = matchValue_1[0] != null ? matchValue_1[1] != null ? [1, getValue(matchValue_1[0]), getValue(matchValue_1[1])] : [2] : matchValue_1[1] == null ? [0] : [2];

          switch ($var2[0]) {
            case 0:
              return true;

            case 1:
              return tyconRefEq(g, $var2[1], $var2[2]);

            case 2:
              return false;
          }
        } else {
          return false;
        }

      case 1:
        return true;

      case 2:
        return true;

      case 3:
        return true;

      case 4:
        return false;
    }
  }

}
setType("Microsoft.FSharp.Compiler.AccessibilityLogic.AccessorDomain", AccessorDomain);
export function IsAccessible(ad, taccess) {
  if (ad.tag === 2) {
    return canAccessFromSomewhere(taccess);
  } else if (ad.tag === 3) {
    return true;
  } else if (ad.tag === 0) {
    return exists(function (cpath) {
      return canAccessFrom(taccess, cpath);
    }, ad.data[0]);
  } else {
    return canAccessFromEverywhere(taccess);
  }
}

function IsILMemberAccessible(g, amap, m, tcrefOfViewedItem, ad, access) {
  if (ad.tag === 2) {
    if (access.Equals(new ILMemberAccess(5)) ? true : access.Equals(new ILMemberAccess(3))) {
      return true;
    } else {
      return access.Equals(new ILMemberAccess(2));
    }
  } else if (ad.tag === 0) {
    const accessibleByFamily = (access.Equals(new ILMemberAccess(3)) ? true : access.Equals(new ILMemberAccess(2))) ? ad.data[1] != null ? ExistsHeadTypeInEntireHierarchy(g, amap, m, generalizedTyconRef(getValue(ad.data[1])), tcrefOfViewedItem) : false : false;
    const accessibleByInternalsVisibleTo = (access.Equals(new ILMemberAccess(0)) ? true : access.Equals(new ILMemberAccess(2))) ? canAccessFromOneOf(ad.data[0], tcrefOfViewedItem.CompilationPath) : false;
    const accessibleByFamilyAndAssembly = (access.Equals(new ILMemberAccess(1)) ? canAccessFromOneOf(ad.data[0], tcrefOfViewedItem.CompilationPath) : false) ? ad.data[1] != null ? ExistsHeadTypeInEntireHierarchy(g, amap, m, generalizedTyconRef(getValue(ad.data[1])), tcrefOfViewedItem) : false : false;

    if ((access.Equals(new ILMemberAccess(5)) ? true : accessibleByFamily) ? true : accessibleByInternalsVisibleTo) {
      return true;
    } else {
      return accessibleByFamilyAndAssembly;
    }
  } else if (ad.tag === 3) {
    return true;
  } else {
    return access.Equals(new ILMemberAccess(5));
  }
}

function IsILTypeDefAccessible(amap, m, ad, encTyconRefOpt, tdef) {
  const matchValue = tdef.Access;

  if (matchValue.tag === 2) {
    if (encTyconRefOpt != null) {
      return IsILMemberAccessible(amap.g, amap, m, getValue(encTyconRefOpt), ad, matchValue.data);
    } else {
      return true;
    }
  } else {
    const $var3 = ad.tag === 1 ? [1] : ad.tag === 2 ? [1] : ad.tag === 0 ? [1] : [0];

    switch ($var3[0]) {
      case 0:
        return true;

      case 1:
        return tdef.Access.Equals(new ILTypeDefAccess(0));
    }
  }
}

function IsTyconAccessibleViaVisibleTo(ad, tcrefOfViewedItem) {
  const $var4 = ad.tag === 3 ? [0] : ad.tag === 2 ? [0] : ad.tag === 0 ? [1] : [0];

  switch ($var4[0]) {
    case 0:
      return false;

    case 1:
      return canAccessFromOneOf(ad.data[0], tcrefOfViewedItem.CompilationPath);
  }
}

function IsILTypeInfoAccessible(amap, m, ad, tcrefOfViewedItem) {
  const patternInput = tcrefOfViewedItem.ILTyconInfo;

  const check = function (parentTycon, path) {
    let ilTypeDefAccessible;

    if (parentTycon != null) {
      const parentTycon_1 = getValue(parentTycon)[0];
      const parentPath = getValue(parentTycon)[1];

      if (path.tail != null) {
        if (IsILTypeDefAccessible(amap, m, ad, parentTycon_1, path.head)) {
          const parentILTyRef = mkRefForNestedILTypeDef(patternInput.data[0], parentPath, path.head);
          const parentTycon_2 = ImportILTypeRef(amap, m, parentILTyRef);
          ilTypeDefAccessible = check([parentTycon_2, append(parentPath, ofArray([path.head]))], path.tail);
        } else {
          ilTypeDefAccessible = false;
        }
      } else {
        ilTypeDefAccessible = true;
      }
    } else if (path.tail != null) {
      if (path.tail.tail == null) {
        ilTypeDefAccessible = IsILTypeDefAccessible(amap, m, ad, null, path.head);
      } else if (IsILTypeDefAccessible(amap, m, ad, null, path.head)) {
        const parentILTyRef_1 = mkRefForNestedILTypeDef(patternInput.data[0], new List(), path.head);
        const parentTycon_3 = ImportILTypeRef(amap, m, parentILTyRef_1);
        ilTypeDefAccessible = check([parentTycon_3, ofArray([path.head])], path.tail);
      } else {
        ilTypeDefAccessible = false;
      }
    } else {
      ilTypeDefAccessible = true;
    }

    if (ilTypeDefAccessible) {
      return true;
    } else {
      return IsTyconAccessibleViaVisibleTo(ad, tcrefOfViewedItem);
    }
  };

  return check(null, append(patternInput.data[1], ofArray([patternInput.data[2]])));
}

function IsILTypeAndMemberAccessible(g, amap, m, adType, ad, typ, access) {
  if (IsILTypeInfoAccessible(amap, m, adType, typ.TyconRefOfRawMetadata)) {
    return IsILMemberAccessible(g, amap, m, typ.TyconRefOfRawMetadata, ad, access);
  } else {
    return false;
  }
}

export function IsEntityAccessible(amap, m, ad, tcref) {
  if (tcref.IsILTycon) {
    return IsILTypeInfoAccessible(amap, m, ad, tcref);
  } else {
    return function (taccess) {
      return IsAccessible(ad, taccess);
    }(tcref.Accessibility);
  }
}
export function CheckTyconAccessible(amap, m, ad, tcref) {
  const res = IsEntityAccessible(amap, m, ad, tcref);

  if (!res) {
    errorR(new _Error(SR.typeIsNotAccessible(tcref.DisplayName), m));
  }

  return res;
}
export function IsTyconReprAccessible(amap, m, ad, tcref) {
  if (IsEntityAccessible(amap, m, ad, tcref)) {
    return IsAccessible(ad, tcref.TypeReprAccessibility);
  } else {
    return false;
  }
}
export function CheckTyconReprAccessible(amap, m, ad, tcref) {
  if (CheckTyconAccessible(amap, m, ad, tcref)) {
    const res = IsAccessible(ad, tcref.TypeReprAccessibility);

    if (!res) {
      errorR(new _Error(SR.unionCasesAreNotAccessible(tcref.DisplayName), m));
    }

    return res;
  } else {
    return false;
  }
}
export function IsTypeAccessible(g, amap, m, ad, ty) {
  if (!isAppTy(g, ty)) {
    return true;
  } else {
    const patternInput = destAppTy(g, ty);

    if (IsEntityAccessible(amap, m, ad, patternInput[0])) {
      return IsTypeInstAccessible(g, amap, m, ad, patternInput[1]);
    } else {
      return false;
    }
  }
}
export function IsTypeInstAccessible(g, amap, m, ad, tinst) {
  if (tinst.tail == null) {
    return true;
  } else {
    return forAll(function (ty) {
      return IsTypeAccessible(g, amap, m, ad, ty);
    }, tinst);
  }
}
export function IsProvidedMemberAccessible(amap, m, ad, ty, access) {
  const g = amap.g;
  const isTyAccessible = IsTypeAccessible(g, amap, m, ad, ty);

  if (!isTyAccessible) {
    return false;
  } else if (!isAppTy(g, ty)) {
    return true;
  } else {
    const patternInput = destAppTy(g, ty);
    return IsILMemberAccessible(g, amap, m, patternInput[0], ad, access);
  }
}
export function ComputeILAccess(isPublic, isFamily, isFamilyOrAssembly, isFamilyAndAssembly) {
  if (isPublic) {
    return new ILMemberAccess(5);
  } else if (isFamily) {
    return new ILMemberAccess(3);
  } else if (isFamilyOrAssembly) {
    return new ILMemberAccess(2);
  } else if (isFamilyAndAssembly) {
    return new ILMemberAccess(1);
  } else {
    return new ILMemberAccess(4);
  }
}
export function IsILFieldInfoAccessible(g, amap, m, ad, x) {
  return IsILTypeAndMemberAccessible(g, amap, m, ad, ad, x.data[0], x.data[1].Access);
}
export function GetILAccessOfILEventInfo(_arg1) {
  return resolveILMethodRef(_arg1.data[0].RawMetadata, _arg1.data[1].AddMethod).Access;
}
export function IsILEventInfoAccessible(g, amap, m, ad, einfo) {
  const access = GetILAccessOfILEventInfo(einfo);
  return IsILTypeAndMemberAccessible(g, amap, m, ad, ad, einfo.ILTypeInfo, access);
}

function IsILMethInfoAccessible(g, amap, m, adType, ad, ilminfo) {
  if (ilminfo.data[2] != null) {
    const declaringTyconRef = getValue(ilminfo.data[2]);
    return IsILMemberAccessible(g, amap, m, declaringTyconRef, ad, ilminfo.data[3].Access);
  } else {
    return IsILTypeAndMemberAccessible(g, amap, m, adType, ad, function (arg00, arg10) {
      return ILTypeInfo.FromType(arg00, arg10);
    }(g, ilminfo.data[1]), ilminfo.data[3].Access);
  }
}

export function GetILAccessOfILPropInfo(_arg1) {
  const tdef = _arg1.data[0].RawMetadata;
  let ilAccess;
  const matchValue = _arg1.data[1].GetMethod;

  if (matchValue == null) {
    const matchValue_1 = _arg1.data[1].SetMethod;

    if (matchValue_1 != null) {
      ilAccess = resolveILMethodRef(tdef, getValue(matchValue_1)).Access;
    } else {
      ilAccess = new ILMemberAccess(5);
    }
  } else {
    ilAccess = resolveILMethodRef(tdef, getValue(matchValue)).Access;
  }

  return ilAccess;
}
export function IsILPropInfoAccessible(g, amap, m, ad, pinfo) {
  const ilAccess = GetILAccessOfILPropInfo(pinfo);
  return IsILTypeAndMemberAccessible(g, amap, m, ad, ad, pinfo.ILTypeInfo, ilAccess);
}
export function IsValAccessible(ad, vref) {
  return function (taccess) {
    return IsAccessible(ad, taccess);
  }(vref.Accessibility);
}
export function CheckValAccessible(m, ad, vref) {
  if (!IsValAccessible(ad, vref)) {
    errorR(new _Error(SR.valueIsNotAccessible(vref.DisplayName), m));
  }
}
export function IsUnionCaseAccessible(amap, m, ad, ucref) {
  if (IsTyconReprAccessible(amap, m, ad, ucref.TyconRef)) {
    return IsAccessible(ad, ucref.UnionCase.Accessibility);
  } else {
    return false;
  }
}
export function CheckUnionCaseAccessible(amap, m, ad, ucref) {
  if (CheckTyconReprAccessible(amap, m, ad, ucref.TyconRef)) {
    const res = IsAccessible(ad, ucref.UnionCase.Accessibility);

    if (!res) {
      errorR(new _Error(SR.unionCaseIsNotAccessible(ucref.CaseName), m));
    }

    return res;
  } else {
    return false;
  }
}
export function IsRecdFieldAccessible(amap, m, ad, rfref) {
  if (IsTyconReprAccessible(amap, m, ad, rfref.TyconRef)) {
    return IsAccessible(ad, rfref.RecdField.Accessibility);
  } else {
    return false;
  }
}
export function CheckRecdFieldAccessible(amap, m, ad, rfref) {
  if (CheckTyconReprAccessible(amap, m, ad, rfref.TyconRef)) {
    const res = IsAccessible(ad, rfref.RecdField.Accessibility);

    if (!res) {
      errorR(new _Error(SR.fieldIsNotAccessible(rfref.FieldName), m));
    }

    return res;
  } else {
    return false;
  }
}
export function CheckRecdFieldInfoAccessible(amap, m, ad, rfinfo) {
  CheckRecdFieldAccessible(amap, m, ad, rfinfo.RecdFieldRef);
}
export function CheckILFieldInfoAccessible(g, amap, m, ad, finfo) {
  if (!IsILFieldInfoAccessible(g, amap, m, ad, finfo)) {
    errorR(new _Error(SR.structOrClassFieldIsNotAccessible(finfo.FieldName), m));
  }
}
export function IsTypeAndMethInfoAccessible(amap, m, adTyp, ad, _arg1) {
  if (_arg1.tag === 0) {
    return IsValAccessible(ad, _arg1.data[2]);
  } else if (_arg1.tag === 2) {
    return IsTypeAccessible(_arg1.data[0], amap, m, ad, _arg1.data[1]);
  } else {
    return IsILMethInfoAccessible(_arg1.data[0], amap, m, adTyp, ad, _arg1.data[1]);
  }
}
export function IsMethInfoAccessible(amap, m, ad, minfo) {
  return IsTypeAndMethInfoAccessible(amap, m, ad, ad, minfo);
}
export function IsPropInfoAccessible(g, amap, m, ad, _arg1) {
  const $var5 = _arg1.tag === 0 ? _arg1.data[2] != null ? [1, getValue(_arg1.data[2])] : _arg1.data[3] != null ? [1, getValue(_arg1.data[3])] : [2] : [0, _arg1.data];

  switch ($var5[0]) {
    case 0:
      return IsILPropInfoAccessible(g, amap, m, ad, $var5[1]);

    case 1:
      return IsValAccessible(ad, $var5[1]);

    case 2:
      return false;
  }
}
export function IsFieldInfoAccessible(ad, rfref) {
  return IsAccessible(ad, rfref.RecdField.Accessibility);
}