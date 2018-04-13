import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives } from "../fable-core/Util";
import { Array as _Array } from "../absil/illib";
import { mkILTypeDefs, ILDefaultPInvokeEncoding, emptyILSecurityDecls, emptyILProperties, emptyILMethodImpls, emptyILMethods, ILTypeDefLayout, ILTypeDef, ILFieldInit, mkILLiteralField, mkNormalStsfld, prependInstrsToClassCtor, mkILSimpleStorageCtor, mkILParamAnon, mkILFormalNamedTy, mkILCustomAttrs, mkILStorageCtor, ILTypeInit, emptyILEvents, mkILProperties, emptyILTypeDefs, mkILFields, mkILMethods, ILTypeDefAccess, mkILGenericClass, mkILCtor, mkILInstanceField, mkILNestedTyRef, mkILBoxedTy, ILMemberAccess, mkILStaticField, mkILParamNamed, emptyILCustomAttrs, mkLdarg0, mkILNonGenericStaticMethod, mkLdarg, nonBranchingInstrsToCode, mkMethodBody, mkILReturn, mkILNonGenericInstanceMethod, ILThisConvention, ILCallingConv, mkILMethRef, ILPropertyDef, mkLdloc, mkStloc, ILCode, generateCodeLabel, mkNormalStfld, mkILCtorMethSpecForTy, mkNormalNewobj, ILVolatility, mkLdcInt32, ILComparisonInstr, mkILNonGenericStaticMethSpecInTy, mkNormalLdflda, mkNormalLdfld, ILInstr, mkILNonGenericInstanceMethSpecInTy, mkNormalCall, mkILTyvarTy, mkILFieldSpecInTy, mkILTyRefInTyRef, ILBoxity, mkILNamedTy } from "../absil/il";
import { IlxUnionRef, IlxUnionSpec, IlxUnionHasHelpers } from "../absil/ilx";
import { unzip3, concat, collect as collect_1, map as map_1, append, ofArray, mapIndexed } from "../fable-core/List";
import List from "../fable-core/List";
import { printf, toText } from "../fable-core/String";
import { tryGetValue, countBy } from "../fable-core/Map";
import { empty, append as append_1, singleton, collect, delay, rangeStep, iterate, toList } from "../fable-core/Seq";
import { makeSome, getValue, defaultArg } from "../fable-core/Option";
import { indexed, map, mapIndexed as mapIndexed_1 } from "../fable-core/Array";
export class DiscriminationTechnique {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseUnions.DiscriminationTechnique",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["TailOrNull"], ["RuntimeTypes"], ["SingleCase"], ["IntegerTag"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseUnions.DiscriminationTechnique", DiscriminationTechnique);
export class UnionReprDecisions {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseUnions.UnionReprDecisions",
      properties: {}
    };
  }

  constructor(getAlternatives, nullPermitted, isNullary, isList, isStruct, nameOfAlt, makeRootType, makeNestedType) {
    this.getAlternatives = getAlternatives;
    this.nullPermitted = nullPermitted;
    this.isNullary = isNullary;
    this.isList = isList;
    this.isStruct = isStruct;
    this.nameOfAlt = nameOfAlt;
    this.makeRootType = makeRootType;
    this.makeNestedType = makeNestedType;
  }

  static [".cctor"]() {
    UnionReprDecisions.TaggingThresholdFixedConstant = 4;
  }

  RepresentAllAlternativesAsConstantFieldsInRootClass(cu) {
    return this.getAlternatives(cu).every(this.isNullary);
  }

  DiscriminationTechnique(cu) {
    if (this.isList(cu)) {
      return new DiscriminationTechnique(0);
    } else {
      const alts = this.getAlternatives(cu);

      if (alts.length === 1) {
        return new DiscriminationTechnique(2);
      } else if ((!this.isStruct(cu) ? alts.length < UnionReprDecisions.TaggingThresholdFixedConstant : false) ? !this.RepresentAllAlternativesAsConstantFieldsInRootClass(cu) : false) {
        return new DiscriminationTechnique(1);
      } else {
        return new DiscriminationTechnique(3);
      }
    }
  }

  RepresentAlternativeAsNull(cu, alt) {
    const alts = this.getAlternatives(cu);

    if (((this.nullPermitted(cu) ? this.DiscriminationTechnique(cu).Equals(new DiscriminationTechnique(1)) : false) ? _Array.existsOne(this.isNullary, alts) : false) ? alts.some($var1 => (value => !value)(this.isNullary($var1))) : false) {
      return this.isNullary(alt);
    } else {
      return false;
    }
  }

  RepresentOneAlternativeAsNull(cu) {
    const alts = this.getAlternatives(cu);

    if (this.nullPermitted(cu)) {
      return _Array.existsOne(alt => this.RepresentAlternativeAsNull(cu, alt), alts);
    } else {
      return false;
    }
  }

  RepresentSingleNonNullaryAlternativeAsInstancesOfRootClassAndAnyOtherAlternativesAsNull(cu, alt) {
    const alts = this.getAlternatives(cu);

    if ((!this.isStruct(cu) ? !this.isNullary(alt) : false) ? alts.every(alt2 => !this.isNullary(alt2) ? true : this.RepresentAlternativeAsNull(cu, alt2)) : false) {
      return _Array.existsOne($var2 => (value => !value)(this.isNullary($var2)), alts);
    } else {
      return false;
    }
  }

  RepresentAlternativeAsStructValue(cu) {
    return this.isStruct(cu);
  }

  RepresentAlternativeAsFreshInstancesOfRootClass(cu, alt) {
    if (!this.isStruct(cu)) {
      if (this.isList(cu) ? this.nameOfAlt(alt) === "Cons" : false) {
        return true;
      } else {
        return this.RepresentSingleNonNullaryAlternativeAsInstancesOfRootClassAndAnyOtherAlternativesAsNull(cu, alt);
      }
    } else {
      return false;
    }
  }

  RepresentAlternativeAsConstantFieldInTaggedRootClass(cu, alt) {
    if ((!this.isStruct(cu) ? this.isNullary(alt) : false) ? !this.RepresentAlternativeAsNull(cu, alt) : false) {
      return !this.DiscriminationTechnique(cu).Equals(new DiscriminationTechnique(1));
    } else {
      return false;
    }
  }

  Flatten(cu) {
    return this.isStruct(cu);
  }

  OptimizeAlternativeToRootClass(cu, alt) {
    if ((((this.isList(cu) ? true : this.Flatten(cu)) ? true : this.RepresentAllAlternativesAsConstantFieldsInRootClass(cu)) ? true : this.RepresentAlternativeAsConstantFieldInTaggedRootClass(cu, alt)) ? true : this.RepresentAlternativeAsStructValue(cu)) {
      return true;
    } else {
      return this.RepresentAlternativeAsFreshInstancesOfRootClass(cu, alt);
    }
  }

  MaintainPossiblyUniqueConstantFieldForAlternative(cu, alt) {
    if (!this.isStruct(cu) ? !this.RepresentAlternativeAsNull(cu, alt) : false) {
      return this.isNullary(alt);
    } else {
      return false;
    }
  }

  TypeForAlternative(cuspec, alt) {
    if (this.OptimizeAlternativeToRootClass(cuspec, alt) ? true : this.RepresentAlternativeAsNull(cuspec, alt)) {
      return this.makeRootType(cuspec);
    } else {
      const altName = this.nameOfAlt(alt);
      const nm = (this.isNullary(alt) ? true : this.isList(cuspec)) ? "_" + altName : altName;
      return this.makeNestedType([cuspec, nm]);
    }
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseUnions.UnionReprDecisions", UnionReprDecisions);
UnionReprDecisions[".cctor"]();
export function baseTyOfUnionSpec(cuspec) {
  return mkILNamedTy(cuspec.Boxity, cuspec.TypeRef, cuspec.GenericArgs);
}
export function mkMakerName(cuspec, nm) {
  const matchValue = cuspec.HasHelpers;
  const $var3 = matchValue.tag === 3 ? [0] : matchValue.tag === 1 ? [1] : matchValue.tag === 0 ? [1] : [0];

  switch ($var3[0]) {
    case 0:
      return nm;

    case 1:
      return "New" + nm;
  }
}
export function mkCasesTypeRef(cuspec) {
  return cuspec.TypeRef;
}
export const cuspecRepr = new UnionReprDecisions(function (cuspec) {
  return cuspec.AlternativesArray;
}, function (cuspec_1) {
  return cuspec_1.IsNullPermitted;
}, function (alt) {
  return alt.IsNullary;
}, function (cuspec_2) {
  return cuspec_2.HasHelpers.Equals(new IlxUnionHasHelpers(2));
}, function (cuspec_3) {
  return cuspec_3.Boxity.Equals(new ILBoxity(1));
}, function (alt_1) {
  return alt_1.Name;
}, function (cuspec_4) {
  return cuspec_4.DeclaringType;
}, function (tupledArg) {
  return mkILNamedTy(tupledArg[0].Boxity, mkILTyRefInTyRef(mkCasesTypeRef(tupledArg[0]), tupledArg[1]), tupledArg[0].GenericArgs);
});
export class NoTypesGeneratedViaThisReprDecider {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseUnions.NoTypesGeneratedViaThisReprDecider",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NoTypesGeneratedViaThisReprDecider"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseUnions.NoTypesGeneratedViaThisReprDecider", NoTypesGeneratedViaThisReprDecider);
export const cudefRepr = new UnionReprDecisions(function (tupledArg) {
  return tupledArg[1].cudAlternatives;
}, function (tupledArg_1) {
  return tupledArg_1[1].cudNullPermitted;
}, function (alt) {
  return alt.IsNullary;
}, function (tupledArg_2) {
  return tupledArg_2[1].cudHasHelpers.Equals(new IlxUnionHasHelpers(2));
}, function (tupledArg_3) {
  return tupledArg_3[0].IsStruct;
}, function (alt_1) {
  return alt_1.Name;
}, function (tupledArg_4) {
  return new NoTypesGeneratedViaThisReprDecider(0);
}, function (tupledArg_5) {
  return new NoTypesGeneratedViaThisReprDecider(0);
});
export function mkTesterName(nm) {
  return "Is" + nm;
}
export const tagPropertyName = "Tag";
export function mkUnionCaseFieldId(fdef) {
  return [fdef.LowerName, fdef.Type];
}
export function refToFieldInTy(ty, nm, fldTy) {
  return mkILFieldSpecInTy(ty, nm, fldTy);
}
export function formalTypeArgs(baseTy) {
  return mapIndexed(function (i, _arg1) {
    return mkILTyvarTy(i & 0xFFFF);
  }, baseTy.GenericArgs);
}
export function constFieldName(nm) {
  return "_unique_" + nm;
}
export function constFormalFieldTy(baseTy) {
  return mkILNamedTy(baseTy.Boxity, baseTy.TypeRef, formalTypeArgs(baseTy));
}
export function mkConstFieldSpecFromId(baseTy, constFieldId_0, constFieldId_1) {
  const constFieldId = [constFieldId_0, constFieldId_1];
  return refToFieldInTy(baseTy, constFieldId[0], constFieldId[1]);
}
export function mkConstFieldSpec(nm, baseTy) {
  return mkConstFieldSpecFromId(baseTy, constFieldName(nm), constFormalFieldTy(baseTy));
}
export function tyForAlt(cuspec, alt) {
  return cuspecRepr.TypeForAlternative(cuspec, alt);
}
export function GetILTypeForAlternative(cuspec, alt) {
  return cuspecRepr.TypeForAlternative(cuspec, cuspec.Alternative(alt));
}
export function mkTagFieldType(ilg, _cuspec) {
  return ilg.typ_Int32;
}
export function mkTagFieldFormalType(ilg, _cuspec) {
  return ilg.typ_Int32;
}
export function mkTagFieldId(ilg, cuspec) {
  return ["_tag", mkTagFieldType(ilg, cuspec)];
}
export function mkTailOrNullId(baseTy) {
  return ["tail", constFormalFieldTy(baseTy)];
}
export function altOfUnionSpec(cuspec, cidx) {
  try {
    return cuspec.Alternative(cidx);
  } catch (matchValue) {
    throw new Error("alternative " + cidx.toString() + " not found");
  }
}
export function doesRuntimeTypeDiscriminateUseHelper(avoidHelpers, cuspec, alt) {
  if (!avoidHelpers ? alt.IsNullary : false) {
    return cuspec.HasHelpers.Equals(new IlxUnionHasHelpers(1));
  } else {
    return false;
  }
}
export function mkRuntimeTypeDiscriminate(ilg, avoidHelpers, cuspec, alt, altName, altTy) {
  const useHelper = doesRuntimeTypeDiscriminateUseHelper(avoidHelpers, cuspec, alt);

  if (useHelper) {
    const baseTy = baseTyOfUnionSpec(cuspec);
    return ofArray([mkNormalCall(mkILNonGenericInstanceMethSpecInTy(baseTy, "get_" + mkTesterName(altName), new List(), ilg.typ_Bool))]);
  } else {
    return ofArray([new ILInstr(66, altTy), new ILInstr(29), new ILInstr(8)]);
  }
}
export function mkRuntimeTypeDiscriminateThen(ilg, avoidHelpers, cuspec, alt, altName, altTy, after) {
  const useHelper = doesRuntimeTypeDiscriminateUseHelper(avoidHelpers, cuspec, alt);
  const $var4 = after.tag === 45 ? after.data[0].tag === 10 ? !useHelper ? [0] : [1] : after.data[0].tag === 11 ? !useHelper ? [0] : [1] : [1] : [1];

  switch ($var4[0]) {
    case 0:
      return ofArray([new ILInstr(66, altTy), after]);

    case 1:
      return append(mkRuntimeTypeDiscriminate(ilg, avoidHelpers, cuspec, alt, altName, altTy), ofArray([after]));
  }
}
export function mkGetTagFromField(ilg, cuspec, baseTy) {
  var tupledArg;
  return ofArray([mkNormalLdfld((tupledArg = mkTagFieldId(ilg, cuspec), refToFieldInTy(baseTy, tupledArg[0], tupledArg[1])))]);
}
export function adjustFieldName(hasHelpers, nm) {
  const matchValue = [hasHelpers, nm];
  const $var5 = matchValue[0].tag === 2 ? matchValue[1] === "Head" ? [0] : matchValue[1] === "Tail" ? [1] : [2] : [2];

  switch ($var5[0]) {
    case 0:
      return "HeadOrDefault";

    case 1:
      return "TailOrNull";

    case 2:
      return nm;
  }
}
export function mkLdData(avoidHelpers, cuspec, cidx, fidx) {
  const alt = altOfUnionSpec(cuspec, cidx);
  const altTy = tyForAlt(cuspec, alt);
  const fieldDef = alt.FieldDef(fidx);

  if (avoidHelpers) {
    return ofArray([mkNormalLdfld(mkILFieldSpecInTy(altTy, fieldDef.LowerName, fieldDef.Type))]);
  } else {
    return ofArray([mkNormalCall(mkILNonGenericInstanceMethSpecInTy(altTy, "get_" + adjustFieldName(cuspec.HasHelpers, fieldDef.Name), new List(), fieldDef.Type))]);
  }
}
export function mkLdDataAddr(avoidHelpers, cuspec, cidx, fidx) {
  const alt = altOfUnionSpec(cuspec, cidx);
  const altTy = tyForAlt(cuspec, alt);
  const fieldDef = alt.FieldDef(fidx);

  if (avoidHelpers) {
    return ofArray([mkNormalLdflda(mkILFieldSpecInTy(altTy, fieldDef.LowerName, fieldDef.Type))]);
  } else {
    throw new Error(toText(printf("can't load address using helpers, for fieldDef %s"))(fieldDef.LowerName));
  }
}
export function mkGetTailOrNull(avoidHelpers, cuspec) {
  return mkLdData(avoidHelpers, cuspec, 1, 1);
}
export function mkGetTagFromHelpers(ilg, cuspec) {
  const baseTy = baseTyOfUnionSpec(cuspec);

  if (cuspecRepr.RepresentOneAlternativeAsNull(cuspec)) {
    return mkNormalCall(mkILNonGenericStaticMethSpecInTy(baseTy, "Get" + tagPropertyName, ofArray([baseTy]), mkTagFieldFormalType(ilg, cuspec)));
  } else {
    return mkNormalCall(mkILNonGenericInstanceMethSpecInTy(baseTy, "get_" + tagPropertyName, new List(), mkTagFieldFormalType(ilg, cuspec)));
  }
}
export function mkGetTag(ilg, cuspec) {
  const matchValue = cuspec.HasHelpers;

  if (matchValue.tag === 1) {
    return ofArray([mkGetTagFromHelpers(ilg, cuspec)]);
  } else {
    return mkGetTagFromField(ilg, cuspec, baseTyOfUnionSpec(cuspec));
  }
}
export function mkCeqThen(after) {
  const $var6 = after.tag === 45 ? after.data[0].tag === 10 ? [0, after.data[1]] : after.data[0].tag === 11 ? [1, after.data[1]] : [2] : [2];

  switch ($var6[0]) {
    case 0:
      return ofArray([new ILInstr(45, [new ILComparisonInstr(9), $var6[1]])]);

    case 1:
      return ofArray([new ILInstr(45, [new ILComparisonInstr(0), $var6[1]])]);

    case 2:
      return ofArray([new ILInstr(6), after]);
  }
}
export function mkTagDiscriminate(ilg, cuspec, _baseTy, cidx) {
  return append(mkGetTag(ilg, cuspec), ofArray([mkLdcInt32(cidx), new ILInstr(6)]));
}
export function mkTagDiscriminateThen(ilg, cuspec, cidx, after) {
  return append(mkGetTag(ilg, cuspec), append(ofArray([mkLdcInt32(cidx)]), mkCeqThen(after)));
}
export function extraTysAndInstrsForStructCtor(ilg, cidx) {
  switch (cidx) {
    case 0:
      return [ofArray([ilg.typ_Bool]), ofArray([mkLdcInt32(0)])];

    case 1:
      return [ofArray([ilg.typ_Byte]), ofArray([mkLdcInt32(0)])];

    case 2:
      return [ofArray([ilg.typ_SByte]), ofArray([mkLdcInt32(0)])];

    case 3:
      return [ofArray([ilg.typ_Char]), ofArray([mkLdcInt32(0)])];

    case 4:
      return [ofArray([ilg.typ_Int16]), ofArray([mkLdcInt32(0)])];

    case 5:
      return [ofArray([ilg.typ_Int32]), ofArray([mkLdcInt32(0)])];

    case 6:
      return [ofArray([ilg.typ_UInt16]), ofArray([mkLdcInt32(0)])];

    default:
      const patternInput = extraTysAndInstrsForStructCtor(ilg, cidx - 7);
      return [new List(ilg.typ_UInt32, patternInput[0]), new List(mkLdcInt32(0), patternInput[1])];
  }
}
export function takesExtraParams(alts) {
  if (alts.length > 1) {
    if (alts.some(function (d) {
      return d.FieldDefs.length > 0;
    })) {
      return true;
    } else {
      return Array.from(countBy(function (d_1) {
        return d_1.FieldDefs.length;
      }, alts)).length !== alts.length;
    }
  } else {
    return false;
  }
}
export function convNewDataInstrInternal(ilg, cuspec, cidx) {
  const alt = altOfUnionSpec(cuspec, cidx);
  const altTy = tyForAlt(cuspec, alt);
  const altName = alt.Name;

  if (cuspecRepr.RepresentAlternativeAsNull(cuspec, alt)) {
    return ofArray([new ILInstr(29)]);
  } else if (cuspecRepr.MaintainPossiblyUniqueConstantFieldForAlternative(cuspec, alt)) {
    const baseTy = baseTyOfUnionSpec(cuspec);
    return ofArray([new ILInstr(59, [new ILVolatility(1), mkConstFieldSpec(altName, baseTy)])]);
  } else if (cuspecRepr.RepresentAlternativeAsFreshInstancesOfRootClass(cuspec, alt)) {
    const baseTy_1 = baseTyOfUnionSpec(cuspec);
    let patternInput;
    const matchValue = cuspecRepr.DiscriminationTechnique(cuspec);

    if (matchValue.tag === 3) {
      patternInput = [ofArray([mkLdcInt32(cidx)]), ofArray([mkTagFieldType(ilg, cuspec)])];
    } else {
      patternInput = [new List(), new List()];
    }

    const ctorFieldTys = toList(alt.FieldTypes);
    return append(patternInput[0], ofArray([mkNormalNewobj(mkILCtorMethSpecForTy(baseTy_1, append(ctorFieldTys, patternInput[1])))]));
  } else if (cuspecRepr.RepresentAlternativeAsStructValue(cuspec)) {
    const baseTy_2 = baseTyOfUnionSpec(cuspec);
    let patternInput_1;
    const matchValue_1 = cuspecRepr.DiscriminationTechnique(cuspec);

    if (matchValue_1.tag === 3) {
      patternInput_1 = [ofArray([mkLdcInt32(cidx)]), ofArray([mkTagFieldType(ilg, cuspec)])];
    } else {
      patternInput_1 = [new List(), new List()];
    }

    const ctorFieldTys_1 = toList(alt.FieldTypes);
    const patternInput_2 = takesExtraParams(cuspec.AlternativesArray) ? extraTysAndInstrsForStructCtor(ilg, cidx) : [new List(), new List()];
    return append(patternInput_1[0], append(patternInput_2[1], ofArray([mkNormalNewobj(mkILCtorMethSpecForTy(baseTy_2, append(ctorFieldTys_1, append(patternInput_1[1], patternInput_2[0]))))])));
  } else {
    return ofArray([mkNormalNewobj(mkILCtorMethSpecForTy(altTy, toList(alt.FieldTypes)))]);
  }
}
export function mkStData(cuspec, cidx, fidx) {
  const alt = altOfUnionSpec(cuspec, cidx);
  const altTy = tyForAlt(cuspec, alt);
  const fieldDef = alt.FieldDef(fidx);
  return ofArray([mkNormalStfld(mkILFieldSpecInTy(altTy, fieldDef.LowerName, fieldDef.Type))]);
}
export function mkNewData(ilg, cuspec, cidx) {
  const alt = altOfUnionSpec(cuspec, cidx);
  const altName = alt.Name;
  const baseTy = baseTyOfUnionSpec(cuspec);
  const matchValue = cuspec.HasHelpers;
  const $var7 = matchValue.tag === 2 ? [0] : matchValue.tag === 3 ? [0] : matchValue.tag === 0 ? [1] : [0];

  switch ($var7[0]) {
    case 0:
      if (cuspecRepr.RepresentAlternativeAsNull(cuspec, alt)) {
        return ofArray([new ILInstr(29)]);
      } else if (alt.IsNullary) {
        return ofArray([mkNormalCall(mkILNonGenericStaticMethSpecInTy(baseTy, "get_" + altName, new List(), constFormalFieldTy(baseTy)))]);
      } else {
        return ofArray([mkNormalCall(mkILNonGenericStaticMethSpecInTy(baseTy, mkMakerName(cuspec, altName), toList(alt.FieldTypes), constFormalFieldTy(baseTy)))]);
      }

    case 1:
      if (cuspecRepr.MaintainPossiblyUniqueConstantFieldForAlternative(cuspec, alt)) {
        return ofArray([mkNormalCall(mkILNonGenericStaticMethSpecInTy(baseTy, "get_" + altName, new List(), constFormalFieldTy(baseTy)))]);
      } else {
        return convNewDataInstrInternal(ilg, cuspec, cidx);
      }

  }
}
export function mkIsData(ilg, avoidHelpers, cuspec, cidx) {
  const alt = altOfUnionSpec(cuspec, cidx);
  const altTy = tyForAlt(cuspec, alt);
  const altName = alt.Name;

  if (cuspecRepr.RepresentAlternativeAsNull(cuspec, alt)) {
    return ofArray([new ILInstr(29), new ILInstr(6)]);
  } else if (cuspecRepr.RepresentSingleNonNullaryAlternativeAsInstancesOfRootClassAndAnyOtherAlternativesAsNull(cuspec, alt)) {
    return ofArray([new ILInstr(29), new ILInstr(8)]);
  } else {
    const matchValue = cuspecRepr.DiscriminationTechnique(cuspec);

    if (matchValue.tag === 1) {
      return mkRuntimeTypeDiscriminate(ilg, avoidHelpers, cuspec, alt, altName, altTy);
    } else if (matchValue.tag === 3) {
      return mkTagDiscriminate(ilg, cuspec, baseTyOfUnionSpec(cuspec), cidx);
    } else if (matchValue.tag === 0) {
      if (cidx === 0) {
        return append(mkGetTailOrNull(avoidHelpers, cuspec), ofArray([new ILInstr(29), new ILInstr(6)]));
      } else if (cidx === 1) {
        return append(mkGetTailOrNull(avoidHelpers, cuspec), ofArray([new ILInstr(29), new ILInstr(8)]));
      } else {
        throw new Error("unexpected");
      }
    } else {
      return ofArray([mkLdcInt32(1)]);
    }
  }
}
export function genWith(g) {
  const instrs = [];
  const lab2pc = new Map();
  g({
    CodeLabel(m) {
      return m | 0;
    },

    GenerateDelayMark() {
      return generateCodeLabel();
    },

    GenLocal(ilty) {
      throw new Error("not needed");
    },

    SetMarkToHere(m) {
      lab2pc.set(m, instrs.length);
    },

    EmitInstr(x) {
      instrs.push(x);
    },

    EmitInstrs(xs) {
      for (let i of xs) {
        this.EmitInstr(i);
      }
    },

    MkInvalidCastExnNewobj() {
      throw new Error("not needed");
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseUnions.ICodeGen"]
      };
    }

  });
  return new ILCode(lab2pc, Array.from(instrs), new List(), new List());
}
export function mkBrIsData(ilg, sense, avoidHelpers, cuspec, cidx, tg) {
  const neg = sense ? new ILComparisonInstr(10) : new ILComparisonInstr(11);
  const pos = sense ? new ILComparisonInstr(11) : new ILComparisonInstr(10);
  const alt = altOfUnionSpec(cuspec, cidx);
  const altTy = tyForAlt(cuspec, alt);
  const altName = alt.Name;

  if (cuspecRepr.RepresentAlternativeAsNull(cuspec, alt)) {
    return ofArray([new ILInstr(45, [neg, tg])]);
  } else if (cuspecRepr.RepresentSingleNonNullaryAlternativeAsInstancesOfRootClassAndAnyOtherAlternativesAsNull(cuspec, alt)) {
    return ofArray([new ILInstr(45, [pos, tg])]);
  } else {
    const matchValue = cuspecRepr.DiscriminationTechnique(cuspec);

    if (matchValue.tag === 1) {
      return mkRuntimeTypeDiscriminateThen(ilg, avoidHelpers, cuspec, alt, altName, altTy, new ILInstr(45, [pos, tg]));
    } else if (matchValue.tag === 3) {
      return mkTagDiscriminateThen(ilg, cuspec, cidx, new ILInstr(45, [pos, tg]));
    } else if (matchValue.tag === 0) {
      if (cidx === 0) {
        return append(mkGetTailOrNull(avoidHelpers, cuspec), ofArray([new ILInstr(45, [neg, tg])]));
      } else if (cidx === 1) {
        return append(mkGetTailOrNull(avoidHelpers, cuspec), ofArray([new ILInstr(45, [pos, tg])]));
      } else {
        throw new Error("unexpected");
      }
    } else {
      return new List();
    }
  }
}
export function emitLdDataTagPrim(ilg, ldOpt, cg, avoidHelpers, cuspec) {
  const matchValue = cuspec.HasHelpers;
  const $var8 = matchValue.tag === 2 ? !avoidHelpers ? [0] : [1] : matchValue.tag === 1 ? !avoidHelpers ? [0] : [1] : [1];

  switch ($var8[0]) {
    case 0:
      iterate(function (arg00) {
        cg.EmitInstr(arg00);
      }, defaultArg(ldOpt, [], $var9 => [$var9]));
      cg.EmitInstr(mkGetTagFromHelpers(ilg, cuspec));
      break;

    case 1:
      const alts = cuspec.Alternatives;
      const matchValue_1 = cuspecRepr.DiscriminationTechnique(cuspec);

      if (matchValue_1.tag === 3) {
        const baseTy = baseTyOfUnionSpec(cuspec);
        iterate(function (arg00_1) {
          cg.EmitInstr(arg00_1);
        }, defaultArg(ldOpt, [], $var10 => [$var10]));
        cg.EmitInstrs(mkGetTagFromField(ilg, cuspec, baseTy));
      } else if (matchValue_1.tag === 2) {
        iterate(function (arg00_2) {
          cg.EmitInstr(arg00_2);
        }, defaultArg(ldOpt, [], $var11 => [$var11]));
        cg.EmitInstrs(ofArray([new ILInstr(31), mkLdcInt32(0)]));
      } else if (matchValue_1.tag === 1) {
        const baseTy_1 = baseTyOfUnionSpec(cuspec);
        let ld;

        if (ldOpt != null) {
          ld = getValue(ldOpt);
        } else {
          const locn = cg.GenLocal(baseTy_1);
          cg.EmitInstr(mkStloc(locn));
          ld = mkLdloc(locn);
        }

        const outlab = cg.GenerateDelayMark();

        const emitCase = function (cidx) {
          const alt = altOfUnionSpec(cuspec, cidx);
          const internalLab = cg.GenerateDelayMark();
          const failLab = cg.GenerateDelayMark();
          const cmpNull = cuspecRepr.RepresentAlternativeAsNull(cuspec, alt);
          const test = new ILInstr(45, [cmpNull ? new ILComparisonInstr(11) : new ILComparisonInstr(10), cg.CodeLabel(failLab)]);
          let testBlock;

          if (cmpNull ? true : cuspecRepr.RepresentAlternativeAsFreshInstancesOfRootClass(cuspec, alt)) {
            testBlock = ofArray([test]);
          } else {
            const altName = alt.Name;
            const altTy = tyForAlt(cuspec, alt);
            testBlock = mkRuntimeTypeDiscriminateThen(ilg, avoidHelpers, cuspec, alt, altName, altTy, test);
          }

          cg.EmitInstrs(new List(ld, testBlock));
          cg.SetMarkToHere(internalLab);
          cg.EmitInstrs(ofArray([mkLdcInt32(cidx), new ILInstr(43, cg.CodeLabel(outlab))]));
          cg.SetMarkToHere(failLab);
        };

        const inputSequence = rangeStep(alts.length - 1, -1, 1);

        for (let n of inputSequence) {
          emitCase(n);
        }

        cg.EmitInstr(mkLdcInt32(0));
        cg.SetMarkToHere(outlab);
      } else {
        iterate(function (arg00_3) {
          cg.EmitInstr(arg00_3);
        }, defaultArg(ldOpt, [], $var12 => [$var12]));
        cg.EmitInstrs(append(mkGetTailOrNull(avoidHelpers, cuspec), ofArray([new ILInstr(29), new ILInstr(8)])));
      }

      break;
  }
}
export function emitLdDataTag(ilg, cg, avoidHelpers, cuspec) {
  emitLdDataTagPrim(ilg, null, cg, avoidHelpers, cuspec);
}
export function emitCastData(ilg, cg, canfail, avoidHelpers, cuspec, cidx) {
  const alt = altOfUnionSpec(cuspec, cidx);

  if (cuspecRepr.RepresentAlternativeAsNull(cuspec, alt)) {
    if (canfail) {
      const outlab = cg.GenerateDelayMark();
      const internal1 = cg.GenerateDelayMark();
      cg.EmitInstrs(ofArray([new ILInstr(30), new ILInstr(45, [new ILComparisonInstr(10), cg.CodeLabel(outlab)])]));
      cg.SetMarkToHere(internal1);
      cg.EmitInstrs(ofArray([cg.MkInvalidCastExnNewobj(), new ILInstr(54)]));
      cg.SetMarkToHere(outlab);
    }
  } else if (cuspecRepr.Flatten(cuspec)) {
    if (canfail) {
      const outlab_1 = cg.GenerateDelayMark();
      const internal1_1 = cg.GenerateDelayMark();
      cg.EmitInstrs(ofArray([new ILInstr(30)]));
      emitLdDataTagPrim(ilg, null, cg, avoidHelpers, cuspec);
      cg.EmitInstrs(ofArray([mkLdcInt32(cidx), new ILInstr(45, [new ILComparisonInstr(0), cg.CodeLabel(outlab_1)])]));
      cg.SetMarkToHere(internal1_1);
      cg.EmitInstrs(ofArray([cg.MkInvalidCastExnNewobj(), new ILInstr(54)]));
      cg.SetMarkToHere(outlab_1);
    }
  } else if (cuspecRepr.OptimizeAlternativeToRootClass(cuspec, alt)) {} else {
    const altTy = tyForAlt(cuspec, alt);
    cg.EmitInstr(new ILInstr(67, altTy));
  }
}
export function emitDataSwitch(ilg, cg, avoidHelpers, cuspec, cases) {
  const baseTy = baseTyOfUnionSpec(cuspec);
  const matchValue = cuspecRepr.DiscriminationTechnique(cuspec);

  if (matchValue.tag === 3) {
    if (cases.tail == null) {
      cg.EmitInstrs(ofArray([new ILInstr(31)]));
    } else {
      const dict = new Map();

      for (let forLoopVar of cases) {
        dict.set(forLoopVar[0], forLoopVar[1]);
      }

      const failLab = cg.GenerateDelayMark();

      const emitCase = function (i, _arg1) {
        const patternInput = tryGetValue(dict, i, 0);

        if (patternInput[0]) {
          return patternInput[1] | 0;
        } else {
          return cg.CodeLabel(failLab) | 0;
        }
      };

      const dests = mapIndexed_1(emitCase, cuspec.AlternativesArray, Int32Array);
      cg.EmitInstrs(mkGetTag(ilg, cuspec));
      cg.EmitInstr(new ILInstr(46, toList(dests)));
      cg.SetMarkToHere(failLab);
    }
  } else if (matchValue.tag === 2) {
    const $var13 = cases.tail == null ? [1] : cases.head[0] === 0 ? cases.tail.tail == null ? [0, cases.head[1]] : [2] : [2];

    switch ($var13[0]) {
      case 0:
        cg.EmitInstrs(ofArray([new ILInstr(31), new ILInstr(43, $var13[1])]));
        break;

      case 1:
        cg.EmitInstrs(ofArray([new ILInstr(31)]));
        break;

      case 2:
        throw new Error("unexpected: strange switch on single-case unions should not be present");
        break;
    }
  } else if (matchValue.tag === 0) {
    throw new Error("unexpected: switches on lists should have been eliminated to brisdata tests");
  } else {
    const locn = cg.GenLocal(baseTy);
    cg.EmitInstr(mkStloc(locn));

    for (let forLoopVar_1 of cases) {
      const alt = altOfUnionSpec(cuspec, forLoopVar_1[0]);
      const altTy = tyForAlt(cuspec, alt);
      const altName = alt.Name;
      const failLab_1 = cg.GenerateDelayMark();
      const cmpNull = cuspecRepr.RepresentAlternativeAsNull(cuspec, alt);
      cg.EmitInstr(mkLdloc(locn));
      const testInstr = new ILInstr(45, [cmpNull ? new ILComparisonInstr(10) : new ILComparisonInstr(11), forLoopVar_1[1]]);

      if (cmpNull ? true : cuspecRepr.RepresentAlternativeAsFreshInstancesOfRootClass(cuspec, alt)) {
        cg.EmitInstr(testInstr);
      } else {
        cg.EmitInstrs(mkRuntimeTypeDiscriminateThen(ilg, avoidHelpers, cuspec, alt, altName, altTy, testInstr));
      }

      cg.SetMarkToHere(failLab_1);
    }
  }
}
export function mkMethodsAndPropertiesForFields(addMethodGeneratedAttrs, addPropertyGeneratedAttrs, access, attr, hasHelpers, typ, fields) {
  const basicProps = toList(map(function (field) {
    return addPropertyGeneratedAttrs(ILPropertyDef.Create(adjustFieldName(hasHelpers, field.Name), 0, null, mkILMethRef(typ.TypeRef, ILCallingConv.Instance, "get_" + adjustFieldName(hasHelpers, field.Name), 0, new List(), field.Type), new ILThisConvention(0), field.Type, null, new List(), field.ILField.CustomAttrs));
  }, fields, Array));
  const basicMethods = toList(delay(function () {
    return collect(function (field_1) {
      const fspec = mkILFieldSpecInTy(typ, field_1.LowerName, field_1.Type);
      return singleton(addMethodGeneratedAttrs(mkILNonGenericInstanceMethod("get_" + adjustFieldName(hasHelpers, field_1.Name), access, new List(), mkILReturn(field_1.Type), mkMethodBody(true, new List(), 2, nonBranchingInstrsToCode(ofArray([mkLdarg(0), mkNormalLdfld(fspec)])), attr))));
    }, fields);
  }));
  return [basicProps, basicMethods];
}
export function convAlternativeDef(addMethodGeneratedAttrs, addPropertyGeneratedAttrs, addPropertyNeverAttrs, addFieldGeneratedAttrs, addFieldNeverAttrs, mkDebuggerTypeProxyAttribute, ilg, num, td, cud, info_0, info_1, cuspec, baseTy, alt) {
  const info = [info_0, info_1];
  const altName = alt.Name;
  const fields = alt.FieldDefs;
  const altTy = tyForAlt(cuspec, alt);
  const repr = cudefRepr;

  const addAltAttribs = function (mdef) {
    return mdef.With(null, null, null, null, null, null, null, null, null, null, alt.altCustomAttrs);
  };

  const isTotallyImmutable = !cud.cudHasHelpers.Equals(new IlxUnionHasHelpers(2));
  let altUniqObjMeths;
  const $var14 = cud.cudHasHelpers.tag === 1 ? [0] : cud.cudHasHelpers.tag === 3 ? [0] : cud.cudHasHelpers.tag === 2 ? [0] : [1];

  switch ($var14[0]) {
    case 0:
      altUniqObjMeths = new List();
      break;

    case 1:
      if (alt.IsNullary ? repr.MaintainPossiblyUniqueConstantFieldForAlternative(info, alt) : false) {
        const methName = "get_" + altName;
        const meth = addMethodGeneratedAttrs(mkILNonGenericStaticMethod(methName, cud.cudReprAccess, new List(), mkILReturn(baseTy), mkMethodBody(true, new List(), fields.length, nonBranchingInstrsToCode(ofArray([new ILInstr(59, [new ILVolatility(1), mkConstFieldSpec(altName, baseTy)])])), cud.cudWhere)));
        altUniqObjMeths = ofArray([meth]);
      } else {
        altUniqObjMeths = new List();
      }

      break;
  }

  let patternInput_2;
  const $var15 = cud.cudHasHelpers.tag === 3 ? [0] : cud.cudHasHelpers.tag === 2 ? [0] : cud.cudHasHelpers.tag === 0 ? [1] : [0];

  switch ($var15[0]) {
    case 0:
      const patternInput = cud.cudAlternatives.length <= 1 ? [new List(), new List()] : repr.RepresentOneAlternativeAsNull(info) ? [new List(), new List()] : [ofArray([addMethodGeneratedAttrs(mkILNonGenericInstanceMethod("get_" + mkTesterName(altName), cud.cudHelpersAccess, new List(), mkILReturn(ilg.typ_Bool), mkMethodBody(true, new List(), 2, nonBranchingInstrsToCode(append(ofArray([mkLdarg0]), mkIsData(ilg, true, cuspec, num))), cud.cudWhere)))]), ofArray([addPropertyNeverAttrs(addPropertyGeneratedAttrs(ILPropertyDef.Create(mkTesterName(altName), 0, null, mkILMethRef(baseTy.TypeRef, ILCallingConv.Instance, "get_" + mkTesterName(altName), 0, new List(), ilg.typ_Bool), new ILThisConvention(0), ilg.typ_Bool, null, new List(), emptyILCustomAttrs)))])];
      let patternInput_1;

      if (alt.IsNullary) {
        const nullaryMeth = addAltAttribs(addMethodGeneratedAttrs(mkILNonGenericStaticMethod("get_" + altName, cud.cudHelpersAccess, new List(), mkILReturn(baseTy), mkMethodBody(true, new List(), fields.length, nonBranchingInstrsToCode(convNewDataInstrInternal(ilg, cuspec, num)), cud.cudWhere))));
        const nullaryProp = addPropertyNeverAttrs(addPropertyGeneratedAttrs(ILPropertyDef.Create(altName, 0, null, mkILMethRef(baseTy.TypeRef, ILCallingConv.Static, "get_" + altName, 0, new List(), baseTy), new ILThisConvention(2), baseTy, null, new List(), emptyILCustomAttrs)));
        patternInput_1 = [ofArray([nullaryMeth]), ofArray([nullaryProp])];
      } else {
        const mdef_1 = addAltAttribs(addMethodGeneratedAttrs(mkILNonGenericStaticMethod(mkMakerName(cuspec, altName), cud.cudHelpersAccess, toList(map(function (fd) {
          return mkILParamNamed(fd.LowerName, fd.Type);
        }, fields, Array)), mkILReturn(baseTy), mkMethodBody(true, new List(), fields.length, nonBranchingInstrsToCode(append(toList(mapIndexed_1(function (i, _arg1) {
          return mkLdarg(i & 0xFFFF);
        }, fields, Array)), convNewDataInstrInternal(ilg, cuspec, num))), cud.cudWhere))));
        patternInput_1 = [ofArray([mdef_1]), new List()];
      }

      patternInput_2 = [append(patternInput_1[0], patternInput[0]), append(patternInput_1[1], patternInput[1])];
      break;

    case 1:
      patternInput_2 = [new List(), new List()];
      break;
  }

  let patternInput_8;

  if (repr.RepresentAlternativeAsNull(info, alt)) {
    patternInput_8 = [new List(), new List(), new List()];
  } else if (repr.RepresentAlternativeAsFreshInstancesOfRootClass(info, alt)) {
    patternInput_8 = [new List(), new List(), new List()];
  } else if (repr.RepresentAlternativeAsStructValue(info)) {
    patternInput_8 = [new List(), new List(), new List()];
  } else {
    let altNullaryFields;

    if (repr.MaintainPossiblyUniqueConstantFieldForAlternative(info, alt)) {
      const basic = addFieldGeneratedAttrs(addFieldNeverAttrs(mkILStaticField(constFieldName(altName), baseTy, null, null, new ILMemberAccess(0))));
      const uniqObjField = basic.WithInitOnly(true);
      const inRootClass = cuspecRepr.OptimizeAlternativeToRootClass(cuspec, alt);
      altNullaryFields = ofArray([[info, alt, altTy, num, uniqObjField, inRootClass]]);
    } else {
      altNullaryFields = new List();
    }

    let patternInput_7;

    if (repr.OptimizeAlternativeToRootClass(info, alt)) {
      patternInput_7 = [new List(), new List()];
    } else {
      let patternInput_4;

      if (!cud.cudDebugProxies) {
        patternInput_4 = [new List(), new List()];
      } else {
        const debugProxyTypeName = altTy.TypeSpec.Name + "@DebugTypeProxy";
        const debugProxyTy = mkILBoxedTy(mkILNestedTyRef(altTy.TypeSpec.Scope, altTy.TypeSpec.Enclosing, debugProxyTypeName), altTy.GenericArgs);
        const debugProxyFields = ofArray([addFieldGeneratedAttrs(addFieldNeverAttrs(mkILInstanceField("_obj", altTy, null, new ILMemberAccess(0))))]);
        const debugProxyCtor = addMethodGeneratedAttrs(mkILCtor(new ILMemberAccess(5), ofArray([mkILParamNamed("obj", altTy)]), mkMethodBody(false, new List(), 3, nonBranchingInstrsToCode(toList(delay(function () {
          return append_1(singleton(mkLdarg0), delay(function () {
            return append_1(singleton(mkNormalCall(mkILCtorMethSpecForTy(ilg.typ_Object, new List()))), delay(function () {
              return append_1(singleton(mkLdarg0), delay(function () {
                return append_1(singleton(mkLdarg(1)), delay(function () {
                  return singleton(mkNormalStfld(mkILFieldSpecInTy(debugProxyTy, "_obj", altTy)));
                }));
              }));
            }));
          }));
        }))), null)));
        const debugProxyGetterMeths = toList(map(function (field) {
          const patternInput_3 = mkUnionCaseFieldId(field);
          return addMethodGeneratedAttrs(mkILNonGenericInstanceMethod("get_" + field.Name, new ILMemberAccess(5), new List(), mkILReturn(field.Type), mkMethodBody(true, new List(), 2, nonBranchingInstrsToCode(ofArray([mkLdarg0, (td.IsStruct ? function (arg00_) {
            return mkNormalLdflda(arg00_);
          } : function (arg00__1) {
            return mkNormalLdfld(arg00__1);
          })(mkILFieldSpecInTy(debugProxyTy, "_obj", altTy)), mkNormalLdfld(mkILFieldSpecInTy(altTy, patternInput_3[0], patternInput_3[1]))])), null)));
        }, fields, Array));
        const debugProxyGetterProps = toList(map(function (fdef) {
          return addPropertyGeneratedAttrs(ILPropertyDef.Create(fdef.Name, 0, null, mkILMethRef(debugProxyTy.TypeRef, ILCallingConv.Instance, "get_" + fdef.Name, 0, new List(), fdef.Type), new ILThisConvention(0), fdef.Type, null, new List(), fdef.ILField.CustomAttrs));
        }, fields, Array));
        const debugProxyTypeDef = mkILGenericClass(debugProxyTypeName, new ILTypeDefAccess(2, new ILMemberAccess(0)), td.GenericParams, ilg.typ_Object, new List(), mkILMethods(append(ofArray([debugProxyCtor]), debugProxyGetterMeths)), mkILFields(debugProxyFields), emptyILTypeDefs, mkILProperties(debugProxyGetterProps), emptyILEvents, emptyILCustomAttrs, new ILTypeInit(0));
        patternInput_4 = [ofArray([debugProxyTypeDef.WithSpecialName(true)]), append(ofArray([mkDebuggerTypeProxyAttribute(debugProxyTy)]), cud.cudDebugDisplayAttributes)];
      }

      let altTypeDef_1;
      const basicFields = toList(map(function (field_1) {
        const patternInput_5 = mkUnionCaseFieldId(field_1);
        const fdef_1 = addFieldGeneratedAttrs(addFieldNeverAttrs(mkILInstanceField(patternInput_5[0], patternInput_5[1], null, new ILMemberAccess(0))));
        return fdef_1.WithInitOnly(isTotallyImmutable);
      }, fields, Array));
      const patternInput_6 = mkMethodsAndPropertiesForFields(addMethodGeneratedAttrs, addPropertyGeneratedAttrs, cud.cudReprAccess, cud.cudWhere, cud.cudHasHelpers, altTy, fields);
      const basicCtorMeth = addMethodGeneratedAttrs(mkILStorageCtor(cud.cudWhere, toList(delay(function () {
        return append_1(singleton(mkLdarg0), delay(function () {
          const matchValue = repr.DiscriminationTechnique(info);
          const $var16 = matchValue.tag === 2 ? [1] : matchValue.tag === 1 ? [1] : matchValue.tag === 0 ? [2] : [0];

          switch ($var16[0]) {
            case 0:
              return append_1(singleton(mkLdcInt32(num)), delay(function () {
                return singleton(mkNormalCall(mkILCtorMethSpecForTy(baseTy, ofArray([mkTagFieldType(ilg, cuspec)]))));
              }));

            case 1:
              return singleton(mkNormalCall(mkILCtorMethSpecForTy(baseTy, new List())));

            case 2:
              throw new Error("unreachable");
              return empty();
          }
        }));
      })), altTy, map_1(function (fdef_2) {
        return [fdef_2.Name, fdef_2.FieldType];
      }, basicFields), cuspec.HasHelpers.Equals(new IlxUnionHasHelpers(1)) ? new ILMemberAccess(0) : cud.cudReprAccess));
      const altTypeDef = mkILGenericClass(altTy.TypeSpec.Name, new ILTypeDefAccess(2, (alt.IsNullary ? cud.cudHasHelpers.Equals(new IlxUnionHasHelpers(1)) : false) ? new ILMemberAccess(0) : cud.cudReprAccess), td.GenericParams, baseTy, new List(), mkILMethods(append(ofArray([basicCtorMeth]), patternInput_6[1])), mkILFields(basicFields), emptyILTypeDefs, mkILProperties(patternInput_6[0]), emptyILEvents, mkILCustomAttrs(patternInput_4[1]), new ILTypeInit(0));
      altTypeDef_1 = altTypeDef.WithSpecialName(true).WithSerializable(td.IsSerializable);
      patternInput_7 = [ofArray([altTypeDef_1]), patternInput_4[0]];
    }

    patternInput_8 = [patternInput_7[0], patternInput_7[1], altNullaryFields];
  }

  return [patternInput_2[0], patternInput_2[1], altUniqObjMeths, patternInput_8[0], patternInput_8[1], patternInput_8[2]];
}
export function mkClassUnionDef(addMethodGeneratedAttrs, addPropertyGeneratedAttrs, addPropertyNeverAttrs, addFieldGeneratedAttrs, addFieldNeverAttrs, mkDebuggerTypeProxyAttribute, ilg, tref, td, cud) {
  var matchValue_4;
  var matchValue_7;
  const boxity = td.IsStruct ? new ILBoxity(1) : new ILBoxity(0);
  const baseTy = mkILFormalNamedTy(boxity, tref, td.GenericParams);
  const cuspec = new IlxUnionSpec(0, [new IlxUnionRef(0, [boxity, baseTy.TypeRef, cud.cudAlternatives, cud.cudNullPermitted, cud.cudHasHelpers]), baseTy.GenericArgs]);
  const info = [td, cud];
  const repr = cudefRepr;
  const isTotallyImmutable = !cud.cudHasHelpers.Equals(new IlxUnionHasHelpers(2));
  const results = mapIndexed(function (i, alt) {
    return convAlternativeDef(addMethodGeneratedAttrs, addPropertyGeneratedAttrs, addPropertyNeverAttrs, addFieldGeneratedAttrs, addFieldNeverAttrs, mkDebuggerTypeProxyAttribute, ilg, i, td, cud, info[0], info[1], cuspec, baseTy, alt);
  }, ofArray(cud.cudAlternatives));
  const baseMethsFromAlt = collect_1(function (tupledArg) {
    return tupledArg[0];
  }, results);
  const basePropsFromAlt = collect_1(function (tupledArg_1) {
    return tupledArg_1[1];
  }, results);
  const altUniqObjMeths = collect_1(function (tupledArg_2) {
    return tupledArg_2[2];
  }, results);
  const altTypeDefs = collect_1(function (tupledArg_3) {
    return tupledArg_3[3];
  }, results);
  const altDebugTypeDefs = collect_1(function (tupledArg_4) {
    return tupledArg_4[4];
  }, results);
  const altNullaryFields = collect_1(function (tupledArg_5) {
    return tupledArg_5[5];
  }, results);
  let tagFieldsInObject;
  const matchValue = repr.DiscriminationTechnique(info);
  const $var17 = matchValue.tag === 1 ? [0] : matchValue.tag === 0 ? [0] : matchValue.tag === 3 ? [1] : [0];

  switch ($var17[0]) {
    case 0:
      tagFieldsInObject = new List();
      break;

    case 1:
      tagFieldsInObject = ofArray([mkTagFieldId(ilg, cuspec)]);
      break;
  }

  const isStruct = td.IsStruct;

  const patternInput_2 = function (tupledArg_6) {
    return [concat(tupledArg_6[0]), concat(tupledArg_6[1]), concat(tupledArg_6[2])];
  }(unzip3(toList(delay(function () {
    return collect(function (matchValue_1) {
      if (repr.RepresentAlternativeAsFreshInstancesOfRootClass(info, matchValue_1[1]) ? true : repr.RepresentAlternativeAsStructValue(info)) {
        const fields = toList(function (array) {
          return map(function (fdef) {
            return mkUnionCaseFieldId(fdef);
          }, array, Array);
        }(matchValue_1[1].FieldDefs));
        let baseInit;

        if (isStruct) {
          baseInit = null;
        } else {
          const matchValue_2 = td.Extends;

          if (matchValue_2 != null) {
            baseInit = getValue(matchValue_2).TypeSpec;
          } else {
            baseInit = ilg.typ_Object.TypeSpec;
          }
        }

        let extraParamsForCtor;

        if (isStruct ? takesExtraParams(cud.cudAlternatives) : false) {
          const patternInput = extraTysAndInstrsForStructCtor(ilg, matchValue_1[0]);
          extraParamsForCtor = map_1(function (arg00_) {
            return mkILParamAnon(arg00_);
          }, patternInput[0]);
        } else {
          extraParamsForCtor = new List();
        }

        const ctor = addMethodGeneratedAttrs(mkILSimpleStorageCtor(cud.cudWhere, baseInit, baseTy, extraParamsForCtor, append(fields, tagFieldsInObject), cuspec.HasHelpers.Equals(new IlxUnionHasHelpers(1)) ? new ILMemberAccess(0) : cud.cudReprAccess));
        const patternInput_1 = mkMethodsAndPropertiesForFields(addMethodGeneratedAttrs, addPropertyGeneratedAttrs, cud.cudReprAccess, cud.cudWhere, cud.cudHasHelpers, baseTy, matchValue_1[1].FieldDefs);
        return singleton([fields, append(ofArray([ctor]), patternInput_1[1]), patternInput_1[0]]);
      } else {
        return empty();
      }
    }, indexed(cud.cudAlternatives));
  }))));

  const selfAndTagFields = toList(delay(function () {
    return collect(function (matchValue_3) {
      const fdef_1 = addFieldGeneratedAttrs(addFieldNeverAttrs(mkILInstanceField(matchValue_3[0], matchValue_3[1], null, new ILMemberAccess(0))));
      return singleton(fdef_1.WithInitOnly(!isStruct ? isTotallyImmutable : false));
    }, append(patternInput_2[0], tagFieldsInObject));
  }));
  const ctorMeths = ((((patternInput_2[0].tail == null ? tagFieldsInObject.tail == null : false) ? !(patternInput_2[1].tail == null) : false) ? true : isStruct) ? true : cud.cudAlternatives.every(function (alt_1) {
    return repr.RepresentAlternativeAsFreshInstancesOfRootClass(info, alt_1);
  })) ? new List() : ofArray([addMethodGeneratedAttrs(mkILSimpleStorageCtor(cud.cudWhere, (matchValue_4 = td.Extends, matchValue_4 != null ? getValue(matchValue_4) : ilg.typ_Object).TypeSpec, baseTy, new List(), tagFieldsInObject, new ILMemberAccess(0)))]);

  const addConstFieldInit = function (cd) {
    if (altNullaryFields.tail == null) {
      return cd;
    } else {
      return prependInstrsToClassCtor(toList(delay(function () {
        return collect(function (matchValue_5) {
          const constFieldId = [matchValue_5[4].Name, baseTy];
          const constFieldSpec = mkConstFieldSpecFromId(baseTy, constFieldId[0], constFieldId[1]);
          return append_1((() => {
            const matchValue_6 = repr.DiscriminationTechnique(matchValue_5[0]);
            const $var18 = matchValue_6.tag === 1 ? [0] : matchValue_6.tag === 0 ? [0] : matchValue_6.tag === 3 ? [1] : [0];

            switch ($var18[0]) {
              case 0:
                return singleton(mkNormalNewobj(mkILCtorMethSpecForTy(matchValue_5[2], new List())));

              case 1:
                if (matchValue_5[5]) {
                  return append_1(singleton(mkLdcInt32(matchValue_5[3])), delay(function () {
                    return singleton(mkNormalNewobj(mkILCtorMethSpecForTy(matchValue_5[2], ofArray([mkTagFieldType(ilg, cuspec)]))));
                  }));
                } else {
                  return singleton(mkNormalNewobj(mkILCtorMethSpecForTy(matchValue_5[2], new List())));
                }

            }
          })(), delay(function () {
            return singleton(mkNormalStsfld(constFieldSpec));
          }));
        }, altNullaryFields);
      })), cud.cudWhere, cd);
    }
  };

  let patternInput_4;
  const tagFieldType = mkTagFieldType(ilg, cuspec);
  const tagEnumFields = toList(mapIndexed_1(function (num, alt_2) {
    return mkILLiteralField(alt_2.Name, tagFieldType, new ILFieldInit(5, num), null, new ILMemberAccess(5));
  }, cud.cudAlternatives, Array));
  let patternInput_3;
  const body = mkMethodBody(true, new List(), 2, genWith(function (cg) {
    emitLdDataTagPrim(ilg, mkLdarg0, cg, true, cuspec);
    cg.EmitInstr(new ILInstr(47));
  }), cud.cudWhere);

  if (repr.RepresentOneAlternativeAsNull(info)) {
    patternInput_3 = [ofArray([addMethodGeneratedAttrs(mkILNonGenericStaticMethod("Get" + tagPropertyName, cud.cudHelpersAccess, ofArray([mkILParamAnon(baseTy)]), mkILReturn(tagFieldType), body))]), new List()];
  } else {
    patternInput_3 = [ofArray([addMethodGeneratedAttrs(mkILNonGenericInstanceMethod("get_" + tagPropertyName, cud.cudHelpersAccess, new List(), mkILReturn(tagFieldType), body))]), ofArray([addPropertyNeverAttrs(addPropertyGeneratedAttrs(ILPropertyDef.Create(tagPropertyName, 0, null, mkILMethRef(baseTy.TypeRef, ILCallingConv.Instance, "get_" + tagPropertyName, 0, new List(), tagFieldType), new ILThisConvention(0), tagFieldType, null, new List(), emptyILCustomAttrs)))])];
  }

  patternInput_4 = [patternInput_3[0], patternInput_3[1], tagEnumFields];
  const isAbstract = altTypeDefs.length === cud.cudAlternatives.length;
  const existingMeths = td.Methods.AsList;
  const existingProps = td.Properties.AsList;
  let enumTypeDef;

  if (patternInput_4[2].length <= 1) {
    enumTypeDef = null;
  } else {
    const tdef = ILTypeDef.Create("Tags", 0, new ILTypeDefLayout(0), new List(), td.GenericParams, ilg.typ_Object, emptyILMethods, emptyILTypeDefs, mkILFields(patternInput_4[2]), emptyILMethodImpls, emptyILEvents, emptyILProperties, emptyILSecurityDecls, emptyILCustomAttrs).WithNestedAccess(cud.cudReprAccess).WithAbstract(true).WithSealed(true).WithImport(false).WithEncoding(new ILDefaultPInvokeEncoding(0)).WithHasSecurity(false);
    enumTypeDef = tdef;
  }

  const baseTypeDef = addConstFieldInit(td.WithInitSemantics(new ILTypeInit(0)).With(null, null, null, null, null, makeSome((matchValue_7 = td.Extends, matchValue_7 == null ? ilg.typ_Object : td.Extends)), mkILMethods(append(ctorMeths, append(baseMethsFromAlt, append(patternInput_2[1], append(patternInput_4[0], append(altUniqObjMeths, existingMeths)))))), mkILTypeDefs(append(toList(defaultArg(enumTypeDef, [], $var19 => [$var19])), append(altTypeDefs, append(altDebugTypeDefs, td.NestedTypes.AsList)))), mkILFields(append(selfAndTagFields, append(map_1(function (tupledArg_7) {
    return tupledArg_7[4];
  }, altNullaryFields), td.Fields.AsList))), null, null, mkILProperties(append(patternInput_4[1], append(basePropsFromAlt, append(patternInput_2[2], existingProps))))));
  return baseTypeDef.WithAbstract(isAbstract).WithSealed(altTypeDefs.tail == null);
}