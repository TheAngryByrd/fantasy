import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { toString, Function as _Function, Option, Any, Interface, equals, compareRecords, equalsRecords, comparePrimitives, Tuple, GenericParam, makeGeneric } from "../fable-core/Util";
import { tryGetValue, find, isEmpty, remove, tryFind, create, add } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import Long from "../fable-core/Long";
import Comparer from "../fable-core/Comparer";
import { map3, mapIndexed2, mapFoldBack, map as map_3, reduce, range as range_1, initialize, iterateIndexed, replicate, item, empty, collect as collect_1, singleton, append as append_1, delay, mapFold, iterate, tryFind as tryFind_1, find as find_1, tryPick, sortWith, last, tryFindIndex, fold, forAll2, foldBack2, forAll, exists, iterate2, map2, zip, toList, foldBack } from "../fable-core/Seq";
import { unzip3, mapIndexed, filter, partition, collect, concat, reverse, unzip, ofArray, append, choose as choose_1, map } from "../fable-core/List";
import List from "../fable-core/List";
import { SpecialWhileLoopMarker, ForLoopStyle, NewModifiedTycon, mapTImplFile, arityOfVal, SequentialOpKind, mkRecdFieldRef, foldTImplFile, valRefInThisAssembly, mapAccImplFile, ModuleOrNamespaceExprWithSig, EntityOptionalData, NewClonedTycon, ValMemberInfo, ExceptionInfo, TyconAugmentation, TyconRepresentation, TyconObjModelKind, TyconObjModelData, MakeUnionCases, UnionCase, MakeRecdFieldsTable, RecdField, ObjExprMethod, StaticOptimization, entityRefInThisAssembly, NewModifiedVal, ModuleOrNamespaceType, ValOptionalData, AttribExpr, AttribNamedArg, Attrib, AttribKind, ValReprInfo, ArgReprInfo, RecordConstructionInfo, FreeVars, canAccessFromEverywhere, mkLocalTyconRef, Entity, ModuleOrNamespaceBinding, ModuleOrNamespaceExpr, NewModuleOrNamespaceType, mkUnionCaseRef, $7C$VRefLocal$7C$VRefNonLocal$7C$ as _VRefLocal_VRefNonLocal_, $7C$ERefLocal$7C$ERefNonLocal$7C$ as _ERefLocal_ERefNonLocal_, combineAccess, fullCompPathOfModuleOrNamespace, Val, Accessibility, unassignedTyparName, TyparDynamicReq, NewTypar, TyparRigidity, FreeTyvars as FreeTyvars_1, TILObjectReprData, ValReprInfoModule, tupInfoRef, rescopePubPathToParent, mkNonLocalValRef, rescopePubPath, ERefNonLocal, LValueOperation, TOp, typarRefEq, NewFreeVarsCache, Binding, newUnique, ValMutability, ParentRef, ValInline, ValBaseOrThisInfo, ValRecursiveScopeInfo, NewVal, mkLocalValRef, ValUseFlag, Const, DecisionTreeTest, DecisionTreeTarget, DecisionTree, Expr, DecisionTreeCase, ModuleOrNamespaceKind, NewEmptyModuleOrNamespaceType, MaybeLazy, taccessPublic, CompilationPath, NewModuleOrNamespace, typesOfVals, mkRawRefTupleTy, stripTyparEqnsAux, TupInfo, stripUnitEqns, stripUnitEqnsAux, primValRefEq, primEntityRefEq, SlotSig, SlotParam, VRefNonLocal, NonLocalValOrMemberRef, ValLinkageFullKey, copyTypars, TraitConstraintInfo, TraitConstraintSln, TyparConstraint, Measure, stripTyparEqns, mkTyparTy, RecdFieldRef, UnionCaseRef, typarEq, EntityRef, ValRef, TType, Typar } from "./tast";
import { makeSome, defaultArg, getValue } from "../fable-core/Option";
import { toText, join, printf, toFail } from "../fable-core/String";
import { Zset, map1Of3, nullableSlotFull, mapQuadruple, foldQuadruple, mapTriple, foldTriple, map1Of2, fold1Of2, mapPair, foldPair, verbose, ListSet, ListAssoc } from "./lib";
import { NameMultiMapModule, Array as _Array, LazyWithContext, Option as Option_1, MultiMapModule, NameMapModule, notlazy, foldOn, String as _String, List as List_1 } from "../absil/illib";
import { intToRational, MulRational, AddRational, NegRational, ZeroRational, OneRational } from "./rational";
import { warning, InternalError, error, Error as _Error, errorR } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import { map as map_2, toList as toList_1 } from "../utils/ResizeArray";
import { SequencePointInfoForWhileLoop, SequencePointInfoForForLoop, FSharpLib, SequencePointInfoForSeq, SequencePointInfoForWith, SequencePointInfoForFinally, SequencePointInfoForTry, MemberKind, textOfPath, ident, SynTypar, SequencePointInfoForTarget, SequencePointInfoForBinding, XmlDoc } from "./ast";
import CurriedLambda from "../fable-core/CurriedLambda";
import { mkNormalCall, mkNormalLdfld, ILFieldInit, splitILTypeName, mkILArr1DTy, ILAttribElem, mkILNonGenericValueTy, mkILCustomAttribute, mkILTyRef, ILBasicType, mkILCtorMethSpecForTy, mkNormalNewobj, ILType, mkILNonGenericBoxedTy, mkILFieldSpecInTy, mkILNonGenericInstanceMethSpecInTy, mkILNonGenericStaticMethSpecInTy, mkLdarg0, ILReadonly, ILArrayShape, getTyOfILEnumInfo, computeILEnumInfo, decodeILAttribData, mkILTyvarTy, ILInstr } from "../absil/il";
import { ZsetModule } from "../absil/zset";
import { dprintf } from "../absil/ildiag";
import { ZmapModule } from "../absil/zmap";
import { Map as _Map_1, Set as _Set } from "../utils/TaggedCollections";
import { ValRefForIntrinsic, TcGlobals } from "./TcGlobals";
import { Layout } from "../utils/sformat";
import Lazy from "../fable-core/Lazy";
import { showL, op_AtAtMinus, semiListL, spaceListL, op_AtAtMinusMinus, listL, optionL, op_MinusMinus, commaListL, aboveListL, op_MinusMinusMinus, tupleL, op_PlusPlus, bracketL, emptyL, op_AtAt, WordL, leftL, rightL, sepL, RightL, LeftL, op_HatHat, mkNav, TaggedTextOps, wordL, SepL, sepListL } from "./layout";
import { QueueListModule } from "./QueueList";
import { range, unionRanges, stringOfRange } from "./range";
import { ActivePatternInfoOfValName, DemangleGenericTypeName, CompilerGeneratedName, DemangleOperatorName, DecompileOpName } from "./PrettyNaming";
import { Microsoft, System } from "../fcs-fable/adapters";
import { sortInPlaceBy, mapIndexed as mapIndexed_1, map as map_1 } from "../fable-core/Array";
import { ilxFsharpCoreLibScopeRef } from "../ilx/ilxsettings";
import { create as create_1, add as add_1 } from "../fable-core/Set";
export class TyparMap {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.TyparMap",
      interfaces: ["FSharpUnion"],
      cases: [["TPMap", makeGeneric(_Map, {
        Key: Long,
        Value: GenericParam("T")
      })]]
    };
  }

  get_Item(v) {
    return this.data.get(v.Stamp);
  }

  ContainsKey(v) {
    return this.data.has(v.Stamp);
  }

  Add(v, x) {
    return new TyparMap(0, add(v.Stamp, x, this.data));
  }

  static get Empty() {
    return new TyparMap(0, create(null, new Comparer((x, y) => x.CompareTo(y))));
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.TyparMap", TyparMap);
export class TyconRefMap {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.TyconRefMap",
      properties: {
        Empty: makeGeneric(TyconRefMap, {
          T: GenericParam("T")
        }),
        IsEmpty: "boolean",
        Item: GenericParam("T")
      }
    };
  }

  constructor(imap) {
    this.imap = imap;
  }

  get_Item(v) {
    return this.imap.get(v.Stamp);
  }

  TryFind(v) {
    return tryFind(v.Stamp, this.imap);
  }

  ContainsKey(v) {
    return this.imap.has(v.Stamp);
  }

  Add(v, x) {
    return new TyconRefMap(add(v.Stamp, x, this.imap));
  }

  Remove(v) {
    return new TyconRefMap(remove(v.Stamp, this.imap));
  }

  get IsEmpty() {
    return isEmpty(this.imap, null);
  }

  static get Empty() {
    return new TyconRefMap(create(null, new Comparer((x, y) => x.CompareTo(y))));
  }

  static OfList(vs) {
    return foldBack(function (tupledArg, acc) {
      return function (arg00, arg10) {
        return acc.Add(arg00, arg10);
      }(tupledArg[0], tupledArg[1]);
    }, vs, TyconRefMap.Empty);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.TyconRefMap", TyconRefMap);
export class ValMap {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.ValMap",
      interfaces: ["FSharpRecord"],
      properties: {
        imap: makeGeneric(_Map, {
          Key: Long,
          Value: GenericParam("T")
        })
      }
    };
  }

  constructor(imap) {
    this.imap = imap;
  }

  get Contents() {
    return this.imap;
  }

  get_Item(v) {
    return this.imap.get(v.Stamp);
  }

  TryFind(v) {
    return tryFind(v.Stamp, this.imap);
  }

  ContainsVal(v) {
    return this.imap.has(v.Stamp);
  }

  Add(v, x) {
    return new ValMap(add(v.Stamp, x, this.imap));
  }

  Remove(v) {
    return new ValMap(remove(v.Stamp, this.imap));
  }

  static get Empty() {
    return new ValMap(create(null, new Comparer((x, y) => x.CompareTo(y))));
  }

  get IsEmpty() {
    return isEmpty(this.imap, null);
  }

  static OfList(vs) {
    return foldBack(function (tupledArg, acc) {
      return function (arg00, arg10) {
        return acc.Add(arg00, arg10);
      }(tupledArg[0], tupledArg[1]);
    }, vs, ValMap.Empty);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.ValMap", ValMap);
export const emptyTyconRefRemap = TyconRefMap.Empty;
export const emptyTyparInst = new List();
export class Remap {
  constructor(tpinst, valRemap, tyconRefRemap, removeTraitSolutions) {
    this.tpinst = tpinst;
    this.valRemap = valRemap;
    this.tyconRefRemap = tyconRefRemap;
    this.removeTraitSolutions = removeTraitSolutions;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.Remap",
      interfaces: ["FSharpRecord"],
      properties: {
        tpinst: makeGeneric(List, {
          T: Tuple([Typar, TType])
        }),
        valRemap: makeGeneric(ValMap, {
          T: ValRef
        }),
        tyconRefRemap: makeGeneric(TyconRefMap, {
          T: EntityRef
        }),
        removeTraitSolutions: "boolean"
      }
    };
  }

  static get Empty() {
    return emptyRemap;
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.Remap", Remap);
export const emptyRemap = new Remap(emptyTyparInst, ValMap.Empty, emptyTyconRefRemap, false);
export function addTyconRefRemap(tcref1, tcref2, tmenv) {
  const tyconRefRemap = function (arg00, arg10) {
    return tmenv.tyconRefRemap.Add(arg00, arg10);
  }(tcref1, tcref2);

  return new Remap(tmenv.tpinst, tmenv.valRemap, tyconRefRemap, tmenv.removeTraitSolutions);
}
export function isRemapEmpty(remap) {
  if (remap.tpinst.tail == null ? remap.tyconRefRemap.IsEmpty : false) {
    return remap.valRemap.IsEmpty;
  } else {
    return false;
  }
}
export function instTyparRef(tpinst, ty, tp) {
  instTyparRef: while (true) {
    if (tpinst.tail != null) {
      const ty_ = tpinst.head[1];
      const tp_ = tpinst.head[0];

      if (typarEq(tp, tp_)) {
        return ty_;
      } else {
        tpinst = tpinst.tail;
        ty = ty;
        tp = tp;
        continue instTyparRef;
      }
    } else {
      return ty;
    }
  }
}
export function instMeasureTyparRef(tpinst, unt, tp) {
  const matchValue = tp.Kind;

  if (matchValue.tag === 1) {
    const loop = function (tpinst_1) {
      loop: while (true) {
        if (tpinst_1.tail != null) {
          const ty_ = tpinst_1.head[1];
          const tp_ = tpinst_1.head[0];

          if (typarEq(tp, tp_)) {
            if (ty_.tag === 6) {
              return ty_.data;
            } else {
              throw new Error("instMeasureTyparRef incorrect kind");
            }
          } else {
            tpinst_1 = tpinst_1.tail;
            continue loop;
          }
        } else {
          return unt;
        }
      }
    };

    return loop(tpinst);
  } else {
    throw new Error("instMeasureTyparRef: kind=Type");
  }
}
export function remapTyconRef(tcmap, tcr) {
  const matchValue = tcmap.TryFind(tcr);

  if (matchValue == null) {
    return tcr;
  } else {
    return getValue(matchValue);
  }
}
export function remapUnionCaseRef(tcmap, _arg1) {
  return new UnionCaseRef(0, [remapTyconRef(tcmap, _arg1.data[0]), _arg1.data[1]]);
}
export function remapRecdFieldRef(tcmap, _arg1) {
  return new RecdFieldRef(0, [remapTyconRef(tcmap, _arg1.data[0]), _arg1.data[1]]);
}
export function mkTyparInst(typars, tyargs) {
  return toList(zip(typars, tyargs));
}
export function generalizeTypar(tp) {
  return mkTyparTy(tp);
}
export function generalizeTypars(tps) {
  return map(function (tp) {
    return generalizeTypar(tp);
  }, tps);
}
export function remapTypeAux(tyenv, ty) {
  const ty_1 = stripTyparEqns(ty);

  switch (ty_1.tag) {
    case 1:
      const matchValue = tyenv.tyconRefRemap.TryFind(ty_1.data[0]);

      if (matchValue == null) {
        if (ty_1.data[1].tail == null) {
          return ty_1;
        } else {
          const tinst_ = remapTypesAux(tyenv, ty_1.data[1]);

          if (ty_1.data[1] === tinst_) {
            return ty_1;
          } else {
            return new TType(1, [ty_1.data[0], tinst_]);
          }
        }
      } else {
        return new TType(1, [getValue(matchValue), remapTypesAux(tyenv, ty_1.data[1])]);
      }

    case 4:
      const tcr = ty_1.data[0].data[0];
      const n = ty_1.data[0].data[1];
      const matchValue_1 = tyenv.tyconRefRemap.TryFind(tcr);

      if (matchValue_1 == null) {
        return new TType(4, [new UnionCaseRef(0, [tcr, n]), remapTypesAux(tyenv, ty_1.data[1])]);
      } else {
        return new TType(4, [new UnionCaseRef(0, [getValue(matchValue_1), n]), remapTypesAux(tyenv, ty_1.data[1])]);
      }

    case 2:
      const tupInfo_ = remapTupInfoAux(tyenv, ty_1.data[0]);
      const l_ = remapTypesAux(tyenv, ty_1.data[1]);

      if (ty_1.data[0] === tupInfo_ ? ty_1.data[1] === l_ : false) {
        return ty_1;
      } else {
        return new TType(2, [tupInfo_, l_]);
      }

    case 3:
      const d_ = remapTypeAux(tyenv, ty_1.data[0]);
      const r_ = remapTypeAux(tyenv, ty_1.data[1]);

      if (ty_1.data[0] === d_ ? ty_1.data[1] === r_ : false) {
        return ty_1;
      } else {
        return new TType(3, [d_, r_]);
      }

    case 0:
      const patternInput = copyAndRemapAndBindTypars(tyenv, ty_1.data[0]);
      return new TType(0, [patternInput[0], remapTypeAux(patternInput[1], ty_1.data[1])]);

    case 6:
      return new TType(6, remapMeasureAux(tyenv, ty_1.data));

    default:
      return instTyparRef(tyenv.tpinst, ty_1, ty_1.data);
  }
}
export function remapMeasureAux(tyenv, unt) {
  remapMeasureAux: while (true) {
    switch (unt.tag) {
      case 1:
        const matchValue = tyenv.tyconRefRemap.TryFind(unt.data);

        if (matchValue == null) {
          return unt;
        } else {
          return new Measure(1, getValue(matchValue));
        }

      case 2:
        return new Measure(2, [remapMeasureAux(tyenv, unt.data[0]), remapMeasureAux(tyenv, unt.data[1])]);

      case 5:
        return new Measure(5, [remapMeasureAux(tyenv, unt.data[0]), unt.data[1]]);

      case 3:
        return new Measure(3, remapMeasureAux(tyenv, unt.data));

      case 0:
        const matchValue_1 = unt.data.Solution;

        if (matchValue_1 != null) {
          if (getValue(matchValue_1).tag === 6) {
            tyenv = tyenv;
            unt = getValue(matchValue_1).data;
            continue remapMeasureAux;
          } else {
            return toFail(printf("incorrect kinds: %A"))(getValue(matchValue_1));
          }
        } else if (ListAssoc.containsKey(function (lv1, lv2) {
          return typarEq(lv1, lv2);
        }, unt.data, tyenv.tpinst)) {
          const matchValue_2 = ListAssoc.find(function (lv1_1, lv2_1) {
            return typarEq(lv1_1, lv2_1);
          }, unt.data, tyenv.tpinst);

          if (matchValue_2.tag === 6) {
            return matchValue_2.data;
          } else {
            throw new Error("remapMeasureAux: incorrect kinds");
          }
        } else {
          return unt;
        }

      default:
        return unt;
    }
  }
}
export function remapTupInfoAux(_tyenv, unt) {
  return unt;
}
export function remapTypesAux(tyenv, types) {
  return List_1.mapq(function (ty) {
    return remapTypeAux(tyenv, ty);
  }, types);
}
export function remapTyparConstraintsAux(tyenv, cs) {
  return choose_1(function (x) {
    switch (x.tag) {
      case 3:
        return new TyparConstraint(3, [remapTraitAux(tyenv, x.data[0]), x.data[1]]);

      case 1:
        return new TyparConstraint(1, [x.data[0], remapTypeAux(tyenv, x.data[1]), x.data[2]]);

      case 8:
        return new TyparConstraint(8, [remapTypeAux(tyenv, x.data[0]), x.data[1]]);

      case 11:
        return new TyparConstraint(11, [remapTypeAux(tyenv, x.data[0]), remapTypeAux(tyenv, x.data[1]), x.data[2]]);

      case 6:
        return new TyparConstraint(6, [remapTypesAux(tyenv, x.data[0]), x.data[1]]);

      case 9:
      case 10:
      case 2:
      case 12:
      case 4:
      case 5:
      case 7:
        return x;

      default:
        return new TyparConstraint(0, [remapTypeAux(tyenv, x.data[0]), x.data[1]]);
    }
  }, cs);
}
export function remapTraitAux(tyenv, _arg1) {
  let slnCell;
  const matchValue = _arg1.data[5].contents;

  if (matchValue == null) {
    slnCell = null;
  } else if (tyenv.removeTraitSolutions) {
    slnCell = null;
  } else if (matchValue != null) {
    let sln;

    switch (getValue(matchValue).tag) {
      case 0:
        sln = new TraitConstraintSln(0, [remapTypeAux(tyenv, getValue(matchValue).data[0]), remapValRef(tyenv, getValue(matchValue).data[1]), remapTypesAux(tyenv, getValue(matchValue).data[2])]);
        break;

      case 1:
        sln = new TraitConstraintSln(1, [remapTypesAux(tyenv, getValue(matchValue).data[0]), remapRecdFieldRef(tyenv.tyconRefRemap, getValue(matchValue).data[1]), getValue(matchValue).data[2]]);
        break;

      case 4:
        sln = new TraitConstraintSln(4);
        break;

      case 3:
        sln = new TraitConstraintSln(3, getValue(matchValue).data);
        break;

      default:
        sln = new TraitConstraintSln(2, [remapTypeAux(tyenv, getValue(matchValue).data[0]), getValue(matchValue).data[1], getValue(matchValue).data[2], remapTypesAux(tyenv, getValue(matchValue).data[3])]);
    }

    slnCell = sln;
  } else {
    throw new Error("C:/projects/fcs/src/fsharp/TastOps.fs", 253, 14);
  }

  return new TraitConstraintInfo(0, [remapTypesAux(tyenv, _arg1.data[0]), _arg1.data[1], _arg1.data[2], remapTypesAux(tyenv, _arg1.data[3]), defaultArg(_arg1.data[4], null, function (ty) {
    return remapTypeAux(tyenv, ty);
  }), {
    contents: slnCell
  }]);
}
export function bindTypars(tps, tyargs, tpinst) {
  if (tps.tail == null) {
    return tpinst;
  } else {
    return append(toList(map2(function (tp, tyarg) {
      return [tp, tyarg];
    }, tps, tyargs)), tpinst);
  }
}
export function copyAndRemapAndBindTyparsFull(remapAttrib, tyenv, tps) {
  if (tps.tail == null) {
    return [tps, tyenv];
  } else {
    const tps_ = copyTypars(tps);
    const tyenv_1 = new Remap(bindTypars(tps, generalizeTypars(tps_), tyenv.tpinst), tyenv.valRemap, tyenv.tyconRefRemap, tyenv.removeTraitSolutions);
    iterate2(function (tporig, tp) {
      tp.FixupConstraints(remapTyparConstraintsAux(tyenv_1, tporig.Constraints));
      tp.typar_attribs = remapAttrib(tporig.typar_attribs);
    }, tps, tps_);
    return [tps_, tyenv_1];
  }
}
export function copyAndRemapAndBindTypars(tyenv, tps) {
  return copyAndRemapAndBindTyparsFull(function (_arg1) {
    return new List();
  }, tyenv, tps);
}
export function remapValLinkage(tyenv, vlink) {
  const tyOpt = vlink.TypeForLinkage;
  let tyOpt_;

  if (tyOpt != null) {
    const ty_ = remapTypeAux(tyenv, getValue(tyOpt));

    if (getValue(tyOpt) === ty_) {
      tyOpt_ = tyOpt;
    } else {
      tyOpt_ = ty_;
    }
  } else {
    tyOpt_ = tyOpt;
  }

  if (tyOpt === tyOpt_) {
    return vlink;
  } else {
    return new ValLinkageFullKey(vlink.PartialKey, tyOpt_);
  }
}
export function remapNonLocalValRef(tyenv, nlvref) {
  const eref_ = remapTyconRef(tyenv.tyconRefRemap, nlvref.EnclosingEntity);
  const vlink_ = remapValLinkage(tyenv, nlvref.ItemKey);

  if (nlvref.EnclosingEntity === eref_ ? nlvref.ItemKey === vlink_ : false) {
    return nlvref;
  } else {
    return new NonLocalValOrMemberRef(eref_, vlink_);
  }
}
export function remapValRef(tmenv, vref) {
  const matchValue = tmenv.valRemap.TryFind(vref.Deref);

  if (matchValue != null) {
    return getValue(matchValue);
  } else if (vref.IsLocalRef) {
    return vref;
  } else {
    const nlvref_ = remapNonLocalValRef(tmenv, vref.nlr);

    if (vref.nlr === nlvref_) {
      return vref;
    } else {
      return VRefNonLocal(nlvref_);
    }
  }
}
export function remapType(tyenv, x) {
  if (isRemapEmpty(tyenv)) {
    return x;
  } else {
    return remapTypeAux(tyenv, x);
  }
}
export function remapTypes(tyenv, x) {
  if (isRemapEmpty(tyenv)) {
    return x;
  } else {
    return remapTypesAux(tyenv, x);
  }
}
export function remapTypeFull(remapAttrib, tyenv, ty) {
  if (isRemapEmpty(tyenv)) {
    return ty;
  } else {
    const matchValue = stripTyparEqns(ty);

    if (matchValue.tag === 0) {
      const patternInput = copyAndRemapAndBindTyparsFull(remapAttrib, tyenv, matchValue.data[0]);
      return new TType(0, [patternInput[0], remapType(patternInput[1], matchValue.data[1])]);
    } else {
      return remapType(tyenv, ty);
    }
  }
}
export function remapParam(tyenv, _arg1) {
  if (isRemapEmpty(tyenv)) {
    return _arg1;
  } else {
    return new SlotParam(0, [_arg1.data[0], remapTypeAux(tyenv, _arg1.data[1]), _arg1.data[2], _arg1.data[3], _arg1.data[4], _arg1.data[5]]);
  }
}
export function remapSlotSig(remapAttrib, tyenv, _arg1) {
  if (isRemapEmpty(tyenv)) {
    return _arg1;
  } else {
    const typ_ = remapTypeAux(tyenv, _arg1.data[1]);
    const patternInput = copyAndRemapAndBindTyparsFull(remapAttrib, tyenv, _arg1.data[2]);
    const patternInput_1 = copyAndRemapAndBindTyparsFull(remapAttrib, patternInput[1], _arg1.data[3]);
    return new SlotSig(0, [_arg1.data[0], typ_, patternInput[0], patternInput_1[0], List_1.mapSquared(function (arg10_) {
      return remapParam(patternInput_1[1], arg10_);
    }, _arg1.data[4]), defaultArg(_arg1.data[5], null, function (ty) {
      return remapTypeAux(patternInput_1[1], ty);
    })]);
  }
}
export function mkInstRemap(tpinst) {
  return new Remap(tpinst, ValMap.Empty, emptyTyconRefRemap, false);
}
export function instType(tpinst, x) {
  if (tpinst.tail == null) {
    return x;
  } else {
    return remapTypeAux(mkInstRemap(tpinst), x);
  }
}
export function instTypes(tpinst, x) {
  if (tpinst.tail == null) {
    return x;
  } else {
    return remapTypesAux(mkInstRemap(tpinst), x);
  }
}
export function instTrait(tpinst, x) {
  if (tpinst.tail == null) {
    return x;
  } else {
    return remapTraitAux(mkInstRemap(tpinst), x);
  }
}
export function instTyparConstraints(tpinst, x) {
  if (tpinst.tail == null) {
    return x;
  } else {
    return remapTyparConstraintsAux(mkInstRemap(tpinst), x);
  }
}
export function instSlotSig(tpinst, ss) {
  return remapSlotSig(function (_arg1) {
    return new List();
  }, mkInstRemap(tpinst), ss);
}
export function copySlotSig(ss) {
  return remapSlotSig(function (_arg1) {
    return new List();
  }, Remap.Empty, ss);
}
export function mkTyparToTyparRenaming(tpsOrig, tps) {
  const tinst = generalizeTypars(tps);
  return [mkTyparInst(tpsOrig, tinst), tinst];
}
export function mkTyconInst(tycon, tinst) {
  return mkTyparInst(tycon.TyparsNoRange, tinst);
}
export function mkTyconRefInst(tcref, tinst) {
  return mkTyconInst(tcref.Deref, tinst);
}
export function tyconRefEq(g, tcref1, tcref2) {
  return primEntityRefEq(g.compilingFslib, g.fslibCcu, tcref1, tcref2);
}
export function valRefEq(g, vref1, vref2) {
  return primValRefEq(g.compilingFslib, g.fslibCcu, vref1, vref2);
}
export function reduceTyconRefAbbrevMeasureable(tcref) {
  const abbrev = tcref.TypeAbbrev;
  const $var1 = abbrev != null ? getValue(abbrev).tag === 6 ? [0, getValue(abbrev).data] : [1] : [1];

  switch ($var1[0]) {
    case 0:
      return $var1[1];

    case 1:
      throw new Error("not a measure abbreviation, or incorrect kind" + "\nParameter name: " + "tcref");
  }
}
export function stripUnitEqnsFromMeasureAux(canShortcut, unt) {
  stripUnitEqnsFromMeasureAux: while (true) {
    const matchValue = stripUnitEqnsAux(canShortcut, unt);
    const $var2 = matchValue.tag === 1 ? matchValue.data.IsTypeAbbrev ? [0, matchValue.data] : [1] : [1];

    switch ($var2[0]) {
      case 0:
        canShortcut = canShortcut;
        unt = reduceTyconRefAbbrevMeasureable($var2[1]);
        continue stripUnitEqnsFromMeasureAux;

      case 1:
        return matchValue;
    }
  }
}
export function stripUnitEqnsFromMeasure(m) {
  return stripUnitEqnsFromMeasureAux(false, m);
}
export function MeasureExprConExponent(g, abbrev, ucref, unt) {
  const matchValue = abbrev ? stripUnitEqnsFromMeasure(unt) : stripUnitEqns(unt);

  switch (matchValue.tag) {
    case 1:
      if (tyconRefEq(g, matchValue.data, ucref)) {
        return OneRational;
      } else {
        return ZeroRational;
      }

    case 3:
      return NegRational(MeasureExprConExponent(g, abbrev, ucref, matchValue.data));

    case 2:
      return AddRational(MeasureExprConExponent(g, abbrev, ucref, matchValue.data[0]), MeasureExprConExponent(g, abbrev, ucref, matchValue.data[1]));

    case 5:
      return MulRational(MeasureExprConExponent(g, abbrev, ucref, matchValue.data[0]), matchValue.data[1]);

    default:
      return ZeroRational;
  }
}
export function MeasureConExponentAfterRemapping(g, r, ucref, unt) {
  const matchValue = stripUnitEqnsFromMeasure(unt);

  switch (matchValue.tag) {
    case 1:
      if (tyconRefEq(g, r(matchValue.data), ucref)) {
        return OneRational;
      } else {
        return ZeroRational;
      }

    case 3:
      return NegRational(MeasureConExponentAfterRemapping(g, r, ucref, matchValue.data));

    case 2:
      return AddRational(MeasureConExponentAfterRemapping(g, r, ucref, matchValue.data[0]), MeasureConExponentAfterRemapping(g, r, ucref, matchValue.data[1]));

    case 5:
      return MulRational(MeasureConExponentAfterRemapping(g, r, ucref, matchValue.data[0]), matchValue.data[1]);

    default:
      return ZeroRational;
  }
}
export function MeasureVarExponent(tp, unt) {
  const matchValue = stripUnitEqnsFromMeasure(unt);

  switch (matchValue.tag) {
    case 0:
      if (typarEq(tp, matchValue.data)) {
        return OneRational;
      } else {
        return ZeroRational;
      }

    case 3:
      return NegRational(MeasureVarExponent(tp, matchValue.data));

    case 2:
      return AddRational(MeasureVarExponent(tp, matchValue.data[0]), MeasureVarExponent(tp, matchValue.data[1]));

    case 5:
      return MulRational(MeasureVarExponent(tp, matchValue.data[0]), matchValue.data[1]);

    default:
      return ZeroRational;
  }
}
export function ListMeasureVarOccs(unt) {
  const gather = function (acc, unt_1) {
    gather: while (true) {
      const matchValue = stripUnitEqnsFromMeasure(unt_1);

      switch (matchValue.tag) {
        case 0:
          if (exists(function (lv2) {
            return typarEq(matchValue.data, lv2);
          }, acc)) {
            return acc;
          } else {
            return new List(matchValue.data, acc);
          }

        case 2:
          acc = gather(acc, matchValue.data[0]);
          unt_1 = matchValue.data[1];
          continue gather;

        case 5:
          acc = acc;
          unt_1 = matchValue.data[0];
          continue gather;

        case 3:
          acc = acc;
          unt_1 = matchValue.data;
          continue gather;

        default:
          return acc;
      }
    }
  };

  return gather(new List(), unt);
}
export function ListMeasureVarOccsWithNonZeroExponents(untexpr) {
  const gather = function (acc, unt) {
    gather: while (true) {
      const matchValue = stripUnitEqnsFromMeasure(unt);

      switch (matchValue.tag) {
        case 0:
          if (exists(function (tupledArg) {
            return typarEq(matchValue.data, tupledArg[0]);
          }, acc)) {
            return acc;
          } else {
            const e = MeasureVarExponent(matchValue.data, untexpr);

            if (e.Equals(ZeroRational)) {
              return acc;
            } else {
              return new List([matchValue.data, e], acc);
            }
          }

        case 2:
          acc = gather(acc, matchValue.data[0]);
          unt = matchValue.data[1];
          continue gather;

        case 3:
          acc = acc;
          unt = matchValue.data;
          continue gather;

        case 5:
          acc = acc;
          unt = matchValue.data[0];
          continue gather;

        default:
          return acc;
      }
    }
  };

  return gather(new List(), untexpr);
}
export function ListMeasureConOccsWithNonZeroExponents(g, eraseAbbrevs, untexpr) {
  const gather = function (acc, unt) {
    gather: while (true) {
      const matchValue = eraseAbbrevs ? stripUnitEqnsFromMeasure(unt) : stripUnitEqns(unt);

      switch (matchValue.tag) {
        case 1:
          if (exists(function (tupledArg) {
            return tyconRefEq(g, matchValue.data, tupledArg[0]);
          }, acc)) {
            return acc;
          } else {
            const e = MeasureExprConExponent(g, eraseAbbrevs, matchValue.data, untexpr);

            if (e.Equals(ZeroRational)) {
              return acc;
            } else {
              return new List([matchValue.data, e], acc);
            }
          }

        case 2:
          acc = gather(acc, matchValue.data[0]);
          unt = matchValue.data[1];
          continue gather;

        case 3:
          acc = acc;
          unt = matchValue.data;
          continue gather;

        case 5:
          acc = acc;
          unt = matchValue.data[0];
          continue gather;

        default:
          return acc;
      }
    }
  };

  return gather(new List(), untexpr);
}
export function ListMeasureConOccsAfterRemapping(g, r, unt) {
  const gather = function (acc, unt_1) {
    var arg10_;

    gather: while (true) {
      const matchValue = stripUnitEqnsFromMeasure(unt_1);

      switch (matchValue.tag) {
        case 1:
          if (exists((arg10_ = r(matchValue.data), function (arg20_) {
            return tyconRefEq(g, arg10_, arg20_);
          }), acc)) {
            return acc;
          } else {
            return new List(r(matchValue.data), acc);
          }

        case 2:
          acc = gather(acc, matchValue.data[0]);
          unt_1 = matchValue.data[1];
          continue gather;

        case 5:
          acc = acc;
          unt_1 = matchValue.data[0];
          continue gather;

        case 3:
          acc = acc;
          unt_1 = matchValue.data;
          continue gather;

        default:
          return acc;
      }
    }
  };

  return gather(new List(), unt);
}
export function MeasurePower(u, n) {
  if (n === 1) {
    return u;
  } else if (n === 0) {
    return new Measure(4);
  } else {
    return new Measure(5, [u, intToRational(n)]);
  }
}
export function MeasureProdOpt(m1, m2) {
  const matchValue = [m1, m2];

  if (matchValue[0].tag === 4) {
    return m2;
  } else if (matchValue[1].tag === 4) {
    return m1;
  } else {
    return new Measure(2, [m1, m2]);
  }
}
export function ProdMeasures(ms) {
  if (ms.tail != null) {
    return foldBack(function (m1, m2) {
      return MeasureProdOpt(m1, m2);
    }, ms.tail, ms.head);
  } else {
    return new Measure(4);
  }
}
export function isDimensionless(g, tyarg) {
  const matchValue = stripTyparEqns(tyarg);

  if (matchValue.tag === 6) {
    if (ListMeasureVarOccsWithNonZeroExponents(matchValue.data).tail == null) {
      return ListMeasureConOccsWithNonZeroExponents(g, true, matchValue.data).tail == null;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export function destUnitParMeasure(g, unt) {
  var v;
  var e;
  const vs = ListMeasureVarOccsWithNonZeroExponents(unt);
  const cs = ListMeasureConOccsWithNonZeroExponents(g, true, unt);
  const matchValue = [vs, cs];
  const $var3 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail == null ? (v = matchValue[0].head[0], e = matchValue[0].head[1], e.Equals(OneRational)) ? [0, matchValue[0].head[1], matchValue[0].head[0]] : [1] : [1] : [1] : [1];

  switch ($var3[0]) {
    case 0:
      return $var3[2];

    case 1:
      throw new Error("destUnitParMeasure: not a unit-of-measure parameter");
  }
}
export function isUnitParMeasure(g, unt) {
  var e;
  const vs = ListMeasureVarOccsWithNonZeroExponents(unt);
  const cs = ListMeasureConOccsWithNonZeroExponents(g, true, unt);
  const matchValue = [vs, cs];
  const $var4 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail == null ? (e = matchValue[0].head[1], e.Equals(OneRational)) ? [0, matchValue[0].head[1]] : [1] : [1] : [1] : [1];

  switch ($var4[0]) {
    case 0:
      return true;

    case 1:
      return false;
  }
}
export function normalizeMeasure(g, ms) {
  var v;
  var e;
  const vs = ListMeasureVarOccsWithNonZeroExponents(ms);
  const cs = ListMeasureConOccsWithNonZeroExponents(g, false, ms);
  const matchValue = [vs, cs];
  const $var5 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail == null ? (v = matchValue[0].head[0], e = matchValue[0].head[1], e.Equals(OneRational)) ? [1, matchValue[0].head[1], matchValue[0].head[0]] : [2] : [2] : [2] : matchValue[1].tail == null ? [0] : [2];

  switch ($var5[0]) {
    case 0:
      return new Measure(4);

    case 1:
      return new Measure(0, $var5[2]);

    case 2:
      return foldBack(function (tupledArg, m) {
        return new Measure(2, [new Measure(5, [new Measure(0, tupledArg[0]), tupledArg[1]]), m]);
      }, matchValue[0], foldBack(function (tupledArg_1, m_1) {
        return new Measure(2, [new Measure(5, [new Measure(1, tupledArg_1[0]), tupledArg_1[1]]), m_1]);
      }, matchValue[1], new Measure(4)));
  }
}
export function tryNormalizeMeasureInType(g, ty) {
  const $var6 = ty.tag === 6 ? ty.data.tag === 0 ? [0, ty.data.data] : [1] : [1];

  switch ($var6[0]) {
    case 0:
      const matchValue = $var6[1].Solution;
      const $var7 = matchValue != null ? getValue(matchValue).tag === 6 ? [0, getValue(matchValue).data] : [1] : [1];

      switch ($var7[0]) {
        case 0:
          $var6[1].typar_solution = new TType(6, normalizeMeasure(g, $var7[1]));
          return ty;

        case 1:
          return ty;
      }

    case 1:
      return ty;
  }
}
export function mkNativePtrTy(g, ty) {
  return new TType(1, [g.nativeptr_tcr, ofArray([ty])]);
}
export function mkByrefTy(g, ty) {
  return new TType(1, [g.byref_tcr, ofArray([ty])]);
}
export function mkArrayTy(g, rank, ty, m) {
  if (rank < 1 ? true : rank > 32) {
    errorR(new _Error(SR.tastopsMaxArrayThirtyTwo(rank), m));
    return new TType(1, [g.il_arr_tcr_map[3], ofArray([ty])]);
  } else {
    return new TType(1, [g.il_arr_tcr_map[rank - 1], ofArray([ty])]);
  }
}
export const maxTuple = 8;
export const goodTupleFields = maxTuple - 1;
export function isCompiledTupleTyconRef(g, tcref) {
  if ((((((((((((((tyconRefEq(g, g.ref_tuple1_tcr, tcref) ? true : tyconRefEq(g, g.ref_tuple2_tcr, tcref)) ? true : tyconRefEq(g, g.ref_tuple3_tcr, tcref)) ? true : tyconRefEq(g, g.ref_tuple4_tcr, tcref)) ? true : tyconRefEq(g, g.ref_tuple5_tcr, tcref)) ? true : tyconRefEq(g, g.ref_tuple6_tcr, tcref)) ? true : tyconRefEq(g, g.ref_tuple7_tcr, tcref)) ? true : tyconRefEq(g, g.ref_tuple8_tcr, tcref)) ? true : tyconRefEq(g, g.struct_tuple1_tcr, tcref)) ? true : tyconRefEq(g, g.struct_tuple2_tcr, tcref)) ? true : tyconRefEq(g, g.struct_tuple3_tcr, tcref)) ? true : tyconRefEq(g, g.struct_tuple4_tcr, tcref)) ? true : tyconRefEq(g, g.struct_tuple5_tcr, tcref)) ? true : tyconRefEq(g, g.struct_tuple6_tcr, tcref)) ? true : tyconRefEq(g, g.struct_tuple7_tcr, tcref)) {
    return true;
  } else {
    return tyconRefEq(g, g.struct_tuple8_tcr, tcref);
  }
}
export function mkCompiledTupleTyconRef(g, isStruct, n) {
  if (n === 1) {
    if (isStruct) {
      return g.struct_tuple1_tcr;
    } else {
      return g.ref_tuple1_tcr;
    }
  } else if (n === 2) {
    if (isStruct) {
      return g.struct_tuple2_tcr;
    } else {
      return g.ref_tuple2_tcr;
    }
  } else if (n === 3) {
    if (isStruct) {
      return g.struct_tuple3_tcr;
    } else {
      return g.ref_tuple3_tcr;
    }
  } else if (n === 4) {
    if (isStruct) {
      return g.struct_tuple4_tcr;
    } else {
      return g.ref_tuple4_tcr;
    }
  } else if (n === 5) {
    if (isStruct) {
      return g.struct_tuple5_tcr;
    } else {
      return g.ref_tuple5_tcr;
    }
  } else if (n === 6) {
    if (isStruct) {
      return g.struct_tuple6_tcr;
    } else {
      return g.ref_tuple6_tcr;
    }
  } else if (n === 7) {
    if (isStruct) {
      return g.struct_tuple7_tcr;
    } else {
      return g.ref_tuple7_tcr;
    }
  } else if (n === 8) {
    if (isStruct) {
      return g.struct_tuple8_tcr;
    } else {
      return g.ref_tuple8_tcr;
    }
  } else {
    return toFail(printf("mkCompiledTupleTyconRef, n = %d"))(n);
  }
}
export function mkCompiledTupleTy(g, isStruct, tupElemTys) {
  const n = tupElemTys.length | 0;

  if (n < maxTuple) {
    return new TType(1, [mkCompiledTupleTyconRef(g, isStruct, n), tupElemTys]);
  } else {
    const patternInput = List_1.splitAfter(goodTupleFields, tupElemTys);
    return new TType(1, [isStruct ? g.struct_tuple8_tcr : g.ref_tuple8_tcr, append(patternInput[0], ofArray([mkCompiledTupleTy(g, isStruct, patternInput[1])]))]);
  }
}
export function mkOuterCompiledTupleTy(g, isStruct, tupElemTys) {
  const n = tupElemTys.length | 0;

  if (n < maxTuple) {
    return new TType(1, [mkCompiledTupleTyconRef(g, isStruct, n), tupElemTys]);
  } else {
    const patternInput = List_1.splitAfter(goodTupleFields, tupElemTys);
    const tcref = isStruct ? g.struct_tuple8_tcr : g.ref_tuple8_tcr;
    const $var8 = patternInput[1].tail != null ? patternInput[1].tail.tail == null ? [0, patternInput[1].head] : [1] : [1];

    switch ($var8[0]) {
      case 0:
        const marker = new TType(1, [mkCompiledTupleTyconRef(g, isStruct, 1), ofArray([$var8[1]])]);
        return new TType(1, [tcref, append(patternInput[0], ofArray([marker]))]);

      case 1:
        return new TType(1, [tcref, append(patternInput[0], ofArray([new TType(2, [new TupInfo(0, isStruct), patternInput[1]])]))]);
    }
  }
}
export function applyTyconAbbrev(abbrevTy, tycon, tyargs) {
  if (tyargs.tail == null) {
    return abbrevTy;
  } else {
    return instType(mkTyconInst(tycon, tyargs), abbrevTy);
  }
}
export function reduceTyconAbbrev(tycon, tyargs) {
  const abbrev = tycon.TypeAbbrev;

  if (abbrev != null) {
    return applyTyconAbbrev(getValue(abbrev), tycon, tyargs);
  } else {
    throw new Error("this type definition is not an abbreviation" + "\nParameter name: " + "tycon");
  }
}
export function reduceTyconRefAbbrev(tcref, tyargs) {
  return reduceTyconAbbrev(tcref.Deref, tyargs);
}
export function reduceTyconMeasureableOrProvided(g, tycon, tyargs) {
  g;
  const repr = tycon.TypeReprInfo;

  if (repr.tag === 5) {
    if (tyargs.tail == null) {
      return repr.data;
    } else {
      return instType(mkTyconInst(tycon, tyargs), repr.data);
    }
  } else {
    throw new Error("this type definition is not a refinement" + "\nParameter name: " + "tc");
  }
}
export function reduceTyconRefMeasureableOrProvided(g, tcref, tyargs) {
  return reduceTyconMeasureableOrProvided(g, tcref.Deref, tyargs);
}
export function stripTyEqnsA(g, canShortcut, ty) {
  stripTyEqnsA: while (true) {
    const ty_1 = stripTyparEqnsAux(canShortcut, ty);

    if (ty_1.tag === 1) {
      const tycon = ty_1.data[0].Deref;
      const matchValue = tycon.TypeAbbrev;

      if (matchValue == null) {
        if (tycon.IsMeasureableReprTycon ? forAll(function (arg10_) {
          return isDimensionless(g, arg10_);
        }, ty_1.data[1]) : false) {
          const $var208 = g;
          canShortcut = canShortcut;
          ty = reduceTyconMeasureableOrProvided(g, tycon, ty_1.data[1]);
          g = $var208;
          continue stripTyEqnsA;
        } else {
          return ty_1;
        }
      } else {
        g = g;
        canShortcut = canShortcut;
        ty = applyTyconAbbrev(getValue(matchValue), tycon, ty_1.data[1]);
        continue stripTyEqnsA;
      }
    } else {
      return ty_1;
    }
  }
}
export function stripTyEqns(g, ty) {
  return stripTyEqnsA(g, false, ty);
}
export function evalTupInfoIsStruct(aexpr) {
  return aexpr.data;
}
export function stripTyEqnsAndErase(eraseFuncAndTuple, g, ty) {
  stripTyEqnsAndErase: while (true) {
    const ty_1 = stripTyEqns(g, ty);
    const $var9 = ty_1.tag === 1 ? [0, ty_1.data[1], ty_1.data[0]] : ty_1.tag === 3 ? eraseFuncAndTuple ? [1, ty_1.data[0], ty_1.data[1]] : [2] : [2];

    switch ($var9[0]) {
      case 0:
        const tycon = $var9[2].Deref;

        if (tycon.IsErased) {
          eraseFuncAndTuple = eraseFuncAndTuple;
          const $var209 = g;
          ty = reduceTyconMeasureableOrProvided(g, tycon, $var9[1]);
          g = $var209;
          continue stripTyEqnsAndErase;
        } else if (tyconRefEq(g, $var9[2], g.nativeptr_tcr) ? eraseFuncAndTuple : false) {
          eraseFuncAndTuple = eraseFuncAndTuple;
          const $var210 = g;
          ty = g.nativeint_ty;
          g = $var210;
          continue stripTyEqnsAndErase;
        } else {
          return ty_1;
        }

      case 1:
        return new TType(1, [g.fastFunc_tcr, ofArray([$var9[1], $var9[2]])]);

      case 2:
        const $var10 = ty_1.tag === 2 ? eraseFuncAndTuple ? [0, ty_1.data[1], ty_1.data[0]] : [1] : [1];

        switch ($var10[0]) {
          case 0:
            return mkCompiledTupleTy(g, evalTupInfoIsStruct($var10[2]), $var10[1]);

          case 1:
            return ty_1;
        }

    }
  }
}
export function stripTyEqnsAndMeasureEqns(g, ty) {
  return stripTyEqnsAndErase(false, g, ty);
}
export class Erasure {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.Erasure",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["EraseAll"], ["EraseMeasures"], ["EraseNone"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.Erasure", Erasure);
export function stripTyEqnsWrtErasure(erasureFlag, g, ty) {
  if (erasureFlag.tag === 0) {
    return stripTyEqnsAndErase(true, g, ty);
  } else if (erasureFlag.tag === 1) {
    return stripTyEqnsAndErase(false, g, ty);
  } else {
    return stripTyEqns(g, ty);
  }
}
export function stripExnEqns(eref) {
  stripExnEqns: while (true) {
    const exnc = eref.Deref;
    const matchValue = exnc.ExceptionInfo;

    if (matchValue.tag === 0) {
      eref = matchValue.data;
      continue stripExnEqns;
    } else {
      return exnc;
    }
  }
}
export function primDestForallTy(g, ty) {
  return function (_arg1) {
    if (_arg1.tag === 0) {
      return [_arg1.data[0], _arg1.data[1]];
    } else {
      throw new Error("primDestForallTy: not a forall type");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function destFunTy(g, ty) {
  return function (_arg1) {
    if (_arg1.tag === 3) {
      return [_arg1.data[0], _arg1.data[1]];
    } else {
      throw new Error("destFunTy: not a function type");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function destAnyTupleTy(g, ty) {
  return function (_arg1) {
    if (_arg1.tag === 2) {
      return [_arg1.data[0], _arg1.data[1]];
    } else {
      throw new Error("destAnyTupleTy: not a tuple type");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function destRefTupleTy(g, ty) {
  return function (_arg1) {
    const $var11 = _arg1.tag === 2 ? !evalTupInfoIsStruct(_arg1.data[0]) ? [0, _arg1.data[1], _arg1.data[0]] : [1] : [1];

    switch ($var11[0]) {
      case 0:
        return $var11[1];

      case 1:
        throw new Error("destRefTupleTy: not a reference tuple type");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function destStructTupleTy(g, ty) {
  return function (_arg1) {
    const $var12 = _arg1.tag === 2 ? evalTupInfoIsStruct(_arg1.data[0]) ? [0, _arg1.data[1], _arg1.data[0]] : [1] : [1];

    switch ($var12[0]) {
      case 0:
        return $var12[1];

      case 1:
        throw new Error("destStructTupleTy: not a struct tuple type");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function destTyparTy(g, ty) {
  return function (_arg1) {
    if (_arg1.tag === 5) {
      return _arg1.data;
    } else {
      throw new Error("destTyparTy: not a typar type");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function destAnyParTy(g, ty) {
  return function (_arg1) {
    if (_arg1.tag === 5) {
      return _arg1.data;
    } else if (_arg1.tag === 6) {
      return destUnitParMeasure(g, _arg1.data);
    } else {
      throw new Error("destAnyParTy: not a typar or unpar type");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function destMeasureTy(g, ty) {
  return function (_arg1) {
    if (_arg1.tag === 6) {
      return _arg1.data;
    } else {
      throw new Error("destMeasureTy: not a unit-of-measure type");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isFunTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 3 ? true : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isForallTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 0 ? true : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isAnyTupleTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 2 ? true : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isRefTupleTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 2 ? !evalTupInfoIsStruct(_arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isStructTupleTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 2 ? evalTupInfoIsStruct(_arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isUnionTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[0].IsUnionTycon : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isReprHiddenTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[0].IsHiddenReprTycon : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isFSharpObjModelTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[0].IsFSharpObjectModelTycon : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isRecdTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[0].IsRecordTycon : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isFSharpStructOrEnumTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[0].IsFSharpStructOrEnumTycon : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isFSharpEnumTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[0].IsFSharpEnumTycon : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isTyparTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 5 ? true : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isAnyParTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 5 ? true : _arg1.tag === 6 ? isUnitParMeasure(g, _arg1.data) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isMeasureTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 6 ? true : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isProvenUnionCaseTy(ty) {
  if (ty.tag === 4) {
    return true;
  } else {
    return false;
  }
}
export function mkAppTy(tcref, tyargs) {
  return new TType(1, [tcref, tyargs]);
}
export function mkProvenUnionCaseTy(ucref, tyargs) {
  return new TType(4, [ucref, tyargs]);
}
export function isAppTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? true : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function destAppTy(g, ty) {
  return function (_arg1) {
    if (_arg1.tag === 1) {
      return [_arg1.data[0], _arg1.data[1]];
    } else {
      throw new Error("destAppTy");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function tcrefOfAppTy(g, ty) {
  return function (_arg1) {
    if (_arg1.tag === 1) {
      return _arg1.data[0];
    } else {
      throw new Error("tcrefOfAppTy");
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function argsOfAppTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[1] : new List();
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function tryDestTyparTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 5 ? _arg1.data : null;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function tryDestFunTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 3 ? [_arg1.data[0], _arg1.data[1]] : null;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function tryDestAppTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[0] : null;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function tryAnyParTy(g, ty) {
  return function (_arg1) {
    const $var13 = _arg1.tag === 5 ? [0, _arg1.data] : _arg1.tag === 6 ? isUnitParMeasure(g, _arg1.data) ? [1, _arg1.data] : [2] : [2];

    switch ($var13[0]) {
      case 0:
        return $var13[1];

      case 1:
        return destUnitParMeasure(g, $var13[1]);

      case 2:
        return null;
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}

function _AppTy___(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? [_arg1.data[0], _arg1.data[1]] : null;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}

export { _AppTy___ as $7C$AppTy$7C$_$7C$ };

function _RefTupleTy___(g, ty) {
  return function (_arg1) {
    const $var14 = _arg1.tag === 2 ? !evalTupInfoIsStruct(_arg1.data[0]) ? [0, _arg1.data[0], _arg1.data[1]] : [1] : [1];

    switch ($var14[0]) {
      case 0:
        return $var14[2];

      case 1:
        return null;
    }
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}

export { _RefTupleTy___ as $7C$RefTupleTy$7C$_$7C$ };

function _FunTy___(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 3 ? [_arg1.data[0], _arg1.data[1]] : null;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}

export { _FunTy___ as $7C$FunTy$7C$_$7C$ };
export function tryNiceEntityRefOfTy(ty) {
  const ty_1 = stripTyparEqnsAux(false, ty);
  const $var15 = ty_1.tag === 1 ? [0, ty_1.data[0]] : ty_1.tag === 6 ? ty_1.data.tag === 1 ? [1, ty_1.data.data] : [2] : [2];

  switch ($var15[0]) {
    case 0:
      return $var15[1];

    case 1:
      return $var15[1];

    case 2:
      return null;
  }
}

function _NullableTy___(g, ty) {
  var tyarg;
  var tcr;
  let $var16;

  const activePatternResult25853 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(ty);

  if (activePatternResult25853 != null) {
    if (getValue(activePatternResult25853)[1].tail != null) {
      if (getValue(activePatternResult25853)[1].tail.tail == null) {
        if (tyarg = getValue(activePatternResult25853)[1].head, tcr = getValue(activePatternResult25853)[0], tyconRefEq(g, tcr, g.system_Nullable_tcref)) {
          $var16 = [0, getValue(activePatternResult25853)[0], getValue(activePatternResult25853)[1].head];
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
      return $var16[2];

    case 1:
      return null;
  }
}

export { _NullableTy___ as $7C$NullableTy$7C$_$7C$ };

function _StripNullableTy_(g, ty) {
  var tyarg;
  var tcr;
  let $var17;

  const activePatternResult25857 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(ty);

  if (activePatternResult25857 != null) {
    if (getValue(activePatternResult25857)[1].tail != null) {
      if (getValue(activePatternResult25857)[1].tail.tail == null) {
        if (tyarg = getValue(activePatternResult25857)[1].head, tcr = getValue(activePatternResult25857)[0], tyconRefEq(g, tcr, g.system_Nullable_tcref)) {
          $var17 = [0, getValue(activePatternResult25857)[0], getValue(activePatternResult25857)[1].head];
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
      return $var17[2];

    case 1:
      return ty;
  }
}

export { _StripNullableTy_ as $7C$StripNullableTy$7C$ };

function _ByrefTy___(g, ty) {
  var tyarg;
  var tcr;
  let $var18;

  const activePatternResult25861 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(ty);

  if (activePatternResult25861 != null) {
    if (getValue(activePatternResult25861)[1].tail != null) {
      if (getValue(activePatternResult25861)[1].tail.tail == null) {
        if (tyarg = getValue(activePatternResult25861)[1].head, tcr = getValue(activePatternResult25861)[0], tyconRefEq(g, tcr, g.byref_tcr)) {
          $var18 = [0, getValue(activePatternResult25861)[0], getValue(activePatternResult25861)[1].head];
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
      return $var18[2];

    case 1:
      return null;
  }
}

export { _ByrefTy___ as $7C$ByrefTy$7C$_$7C$ };
export function mkInstForAppTy(g, typ) {
  const activePatternResult25865 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(typ);

  if (activePatternResult25865 != null) {
    return mkTyconRefInst(getValue(activePatternResult25865)[0], getValue(activePatternResult25865)[1]);
  } else {
    return new List();
  }
}
export function domainOfFunTy(g, ty) {
  return destFunTy(g, ty)[0];
}
export function rangeOfFunTy(g, ty) {
  return destFunTy(g, ty)[1];
}
export function helpEnsureTypeHasMetadata(g, ty) {
  if (isAnyTupleTy(g, ty)) {
    const patternInput = destAnyTupleTy(g, ty);
    return mkOuterCompiledTupleTy(g, evalTupInfoIsStruct(patternInput[0]), patternInput[1]);
  } else {
    return ty;
  }
}
export class TypeEquivEnv {
  constructor(equivTypars, equivTycons) {
    this.EquivTypars = equivTypars;
    this.EquivTycons = equivTycons;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.TypeEquivEnv",
      interfaces: ["FSharpRecord"],
      properties: {
        EquivTypars: makeGeneric(TyparMap, {
          T: TType
        }),
        EquivTycons: makeGeneric(TyconRefMap, {
          T: EntityRef
        })
      }
    };
  }

  static get Empty() {
    return typeEquivEnvEmpty;
  }

  BindTyparsToTypes(tps1, tys2) {
    return new TypeEquivEnv(foldBack2((tp, ty, tpmap) => tpmap.Add(tp, ty), tps1, tys2, this.EquivTypars), this.EquivTycons);
  }

  BindEquivTypars(tps1, tps2) {
    return ((arg00, arg10) => this.BindTyparsToTypes(arg00, arg10))(tps1, map(tp => mkTyparTy(tp), tps2));
  }

  static FromTyparInst(tpinst) {
    var objectArg;
    const patternInput = unzip(tpinst);
    return (objectArg = TypeEquivEnv.Empty, function (arg00, arg10) {
      return objectArg.BindTyparsToTypes(arg00, arg10);
    })(patternInput[0], patternInput[1]);
  }

  static FromEquivTypars(tps1, tps2) {
    var objectArg;
    return (objectArg = TypeEquivEnv.Empty, function (arg00, arg10) {
      return objectArg.BindEquivTypars(arg00, arg10);
    })(tps1, tps2);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.TypeEquivEnv", TypeEquivEnv);
export const typeEquivEnvEmpty = new TypeEquivEnv(TyparMap.Empty, emptyTyconRefRemap);
export function traitsAEquivAux(erasureFlag, g, aenv, _arg2, _arg1) {
  if (((_arg2.data[2].Equals(_arg1.data[2]) ? _arg2.data[1] === _arg1.data[1] : false) ? ListSet.equals(function (arg30_, arg40_) {
    return typeAEquivAux(erasureFlag, g, aenv, arg30_, arg40_);
  }, _arg2.data[0], _arg1.data[0]) : false) ? returnTypesAEquivAux(erasureFlag, g, aenv, _arg2.data[4], _arg1.data[4]) : false) {
    return List_1.lengthsEqAndForall2(function (arg30__1, arg40__1) {
      return typeAEquivAux(erasureFlag, g, aenv, arg30__1, arg40__1);
    }, _arg2.data[3], _arg1.data[3]);
  } else {
    return false;
  }
}
export function returnTypesAEquivAux(erasureFlag, g, aenv, rty, rty2) {
  const matchValue = [rty, rty2];
  const $var19 = matchValue[0] != null ? matchValue[1] != null ? [1, getValue(matchValue[0]), getValue(matchValue[1])] : [2] : matchValue[1] == null ? [0] : [2];

  switch ($var19[0]) {
    case 0:
      return true;

    case 1:
      return typeAEquivAux(erasureFlag, g, aenv, $var19[1], $var19[2]);

    case 2:
      return false;
  }
}
export function typarConstraintsAEquivAux(erasureFlag, g, aenv, tpc1, tpc2) {
  const matchValue = [tpc1, tpc2];
  const $var20 = matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [1, matchValue[0].data[0], matchValue[1].data[0]] : [7] : matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [2, matchValue[0].data[1], matchValue[1].data[1]] : [7] : matchValue[0].tag === 8 ? matchValue[1].tag === 8 ? [3, matchValue[0].data[0], matchValue[1].data[0]] : [7] : matchValue[0].tag === 11 ? matchValue[1].tag === 11 ? [4, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [7] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [5, matchValue[0].data[0], matchValue[1].data[0]] : [7] : matchValue[0].tag === 9 ? matchValue[1].tag === 9 ? [6] : [7] : matchValue[0].tag === 10 ? matchValue[1].tag === 10 ? [6] : [7] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [6] : [7] : matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? [6] : [7] : matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? [6] : [7] : matchValue[0].tag === 12 ? matchValue[1].tag === 12 ? [6] : [7] : matchValue[0].tag === 7 ? matchValue[1].tag === 7 ? [6] : [7] : matchValue[1].tag === 0 ? [0, matchValue[0].data[0], matchValue[1].data[0]] : [7];

  switch ($var20[0]) {
    case 0:
      return typeAEquivAux(erasureFlag, g, aenv, $var20[1], $var20[2]);

    case 1:
      return traitsAEquivAux(erasureFlag, g, aenv, $var20[1], $var20[2]);

    case 2:
      return typeAEquivAux(erasureFlag, g, aenv, $var20[1], $var20[2]);

    case 3:
      return typeAEquivAux(erasureFlag, g, aenv, $var20[1], $var20[2]);

    case 4:
      if (typeAEquivAux(erasureFlag, g, aenv, $var20[1], $var20[2])) {
        return typeAEquivAux(erasureFlag, g, aenv, $var20[3], $var20[4]);
      } else {
        return false;
      }

    case 5:
      return ListSet.equals(function (arg30_, arg40_) {
        return typeAEquivAux(erasureFlag, g, aenv, arg30_, arg40_);
      }, $var20[1], $var20[2]);

    case 6:
      return true;

    case 7:
      return false;
  }
}
export function typarConstraintSetsAEquivAux(erasureFlag, g, aenv, tp1, tp2) {
  if (tp1.StaticReq.Equals(tp2.StaticReq)) {
    return ListSet.equals(function (arg30_, arg40_) {
      return typarConstraintsAEquivAux(erasureFlag, g, aenv, arg30_, arg40_);
    }, tp1.Constraints, tp2.Constraints);
  } else {
    return false;
  }
}
export function typarsAEquivAux(erasureFlag, g, aenv, tps1, tps2) {
  if (tps1.length === tps2.length) {
    const aenv_1 = function (arg00, arg10) {
      return aenv.BindEquivTypars(arg00, arg10);
    }(tps1, tps2);

    return forAll2(function (tp1, tp2) {
      return typarConstraintSetsAEquivAux(erasureFlag, g, aenv_1, tp1, tp2);
    }, tps1, tps2);
  } else {
    return false;
  }
}
export function tcrefAEquiv(g, aenv, tc1, tc2) {
  if (tyconRefEq(g, tc1, tc2)) {
    return true;
  } else if (aenv.EquivTycons.ContainsKey(tc1)) {
    return tyconRefEq(g, aenv.EquivTycons.get_Item(tc1), tc2);
  } else {
    return false;
  }
}
export function typeAEquivAux(erasureFlag, g, aenv, ty1, ty2) {
  var tp2;
  var tp1_1;
  var tp1;

  typeAEquivAux: while (true) {
    const ty1_1 = stripTyEqnsWrtErasure(erasureFlag, g, ty1);
    const ty2_1 = stripTyEqnsWrtErasure(erasureFlag, g, ty2);
    const matchValue = [ty1_1, ty2_1];
    const $var21 = matchValue[0].tag === 0 ? matchValue[1].tag === 0 ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [2] : matchValue[0].tag === 5 ? matchValue[1].tag === 5 ? (tp2 = matchValue[1].data, tp1_1 = matchValue[0].data, typarEq(tp1_1, tp2)) ? [1, matchValue[0].data, matchValue[1].data] : [2] : [2] : [2];

    switch ($var21[0]) {
      case 0:
        if (typarsAEquivAux(erasureFlag, g, aenv, $var21[3], $var21[4])) {
          erasureFlag = erasureFlag;
          g = g;

          aenv = function (arg00, arg10) {
            return aenv.BindEquivTypars(arg00, arg10);
          }($var21[3], $var21[4]);

          ty1 = $var21[1];
          ty2 = $var21[2];
          continue typeAEquivAux;
        } else {
          return false;
        }

      case 1:
        return true;

      case 2:
        const $var22 = matchValue[0].tag === 5 ? (tp1 = matchValue[0].data, aenv.EquivTypars.ContainsKey(tp1)) ? [0, matchValue[0].data] : [1] : [1];

        switch ($var22[0]) {
          case 0:
            return typeEquivAux(erasureFlag, g, aenv.EquivTypars.get_Item($var22[1]), ty2_1);

          case 1:
            const $var23 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [0, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [5] : matchValue[0].tag === 4 ? matchValue[1].tag === 4 ? [1, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0].data[1], matchValue[1].data[0].data[1], matchValue[0].data[0].data[0], matchValue[1].data[0].data[0]] : [5] : matchValue[0].tag === 2 ? matchValue[1].tag === 2 ? [2, matchValue[0].data[1], matchValue[1].data[1], matchValue[0].data[0], matchValue[1].data[0]] : [5] : matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [3, matchValue[0].data[0], matchValue[1].data[0], matchValue[0].data[1], matchValue[1].data[1]] : [5] : matchValue[0].tag === 6 ? matchValue[1].tag === 6 ? [4, matchValue[0].data, matchValue[1].data] : [5] : [5];

            switch ($var23[0]) {
              case 0:
                if (tcrefAEquiv(g, aenv, $var23[3], $var23[4])) {
                  return typesAEquivAux(erasureFlag, g, aenv, $var23[1], $var23[2]);
                } else {
                  return false;
                }

              case 1:
                if ($var23[3] === $var23[4] ? tcrefAEquiv(g, aenv, $var23[5], $var23[6]) : false) {
                  return typesAEquivAux(erasureFlag, g, aenv, $var23[1], $var23[2]);
                } else {
                  return false;
                }

              case 2:
                if (structnessAEquiv($var23[3], $var23[4])) {
                  return typesAEquivAux(erasureFlag, g, aenv, $var23[1], $var23[2]);
                } else {
                  return false;
                }

              case 3:
                if (typeAEquivAux(erasureFlag, g, aenv, $var23[1], $var23[2])) {
                  erasureFlag = erasureFlag;
                  g = g;
                  aenv = aenv;
                  ty1 = $var23[3];
                  ty2 = $var23[4];
                  continue typeAEquivAux;
                } else {
                  return false;
                }

              case 4:
                if (erasureFlag.tag === 2) {
                  return measureAEquiv(g, aenv, $var23[1], $var23[2]);
                } else {
                  return true;
                }

              case 5:
                return false;
            }

        }

    }
  }
}
export function structnessAEquiv(un1, un2) {
  const matchValue = [un1, un2];
  const b2 = matchValue[1].data;
  const b1 = matchValue[0].data;
  return b1 === b2;
}
export function measureAEquiv(g, aenv, un1, un2) {
  const vars1 = ListMeasureVarOccs(un1);

  const trans = function (tp1) {
    if (aenv.EquivTypars.ContainsKey(tp1)) {
      return destAnyParTy(g, aenv.EquivTypars.get_Item(tp1));
    } else {
      return tp1;
    }
  };

  const remapTyconRef_1 = function (tc) {
    if (aenv.EquivTycons.ContainsKey(tc)) {
      return aenv.EquivTycons.get_Item(tc);
    } else {
      return tc;
    }
  };

  const vars1_ = map(trans, vars1);
  const vars2 = ListSet.subtract(function (lv1, lv2) {
    return typarEq(lv1, lv2);
  }, ListMeasureVarOccs(un2), vars1_);
  const cons1 = ListMeasureConOccsAfterRemapping(g, remapTyconRef_1, un1);
  const cons2 = ListMeasureConOccsAfterRemapping(g, remapTyconRef_1, un2);

  if (forAll(function (v) {
    return MeasureVarExponent(v, un1).Equals(MeasureVarExponent(trans(v), un2));
  }, vars1) ? forAll(function (v_1) {
    return MeasureVarExponent(v_1, un1).Equals(MeasureVarExponent(v_1, un2));
  }, vars2) : false) {
    return forAll(function (c) {
      return MeasureConExponentAfterRemapping(g, remapTyconRef_1, c, un1).Equals(MeasureConExponentAfterRemapping(g, remapTyconRef_1, c, un2));
    }, append(cons1, cons2));
  } else {
    return false;
  }
}
export function typesAEquivAux(erasureFlag, g, aenv, l1, l2) {
  return List_1.lengthsEqAndForall2(function (arg30_, arg40_) {
    return typeAEquivAux(erasureFlag, g, aenv, arg30_, arg40_);
  }, l1, l2);
}
export function typeEquivAux(erasureFlag, g, ty1, ty2) {
  return typeAEquivAux(erasureFlag, g, TypeEquivEnv.Empty, ty1, ty2);
}
export function typeAEquiv(g, aenv, ty1, ty2) {
  return typeAEquivAux(new Erasure(2), g, aenv, ty1, ty2);
}
export function typeEquiv(g, ty1, ty2) {
  return typeEquivAux(new Erasure(2), g, ty1, ty2);
}
export function traitsAEquiv(g, aenv, t1, t2) {
  return traitsAEquivAux(new Erasure(2), g, aenv, t1, t2);
}
export function typarConstraintsAEquiv(g, aenv, c1, c2) {
  return typarConstraintsAEquivAux(new Erasure(2), g, aenv, c1, c2);
}
export function typarsAEquiv(g, aenv, d1, d2) {
  return typarsAEquivAux(new Erasure(2), g, aenv, d1, d2);
}
export function returnTypesAEquiv(g, aenv, t1, t2) {
  return returnTypesAEquivAux(new Erasure(2), g, aenv, t1, t2);
}
export function measureEquiv(g, m1, m2) {
  return measureAEquiv(g, TypeEquivEnv.Empty, m1, m2);
}
export function isErasedType(g, ty) {
  const matchValue = stripTyEqns(g, ty);
  return false;
}
export function getErasedTypes(g, ty) {
  getErasedTypes: while (true) {
    const ty_1 = stripTyEqns(g, ty);

    if (isErasedType(g, ty_1)) {
      return ofArray([ty_1]);
    } else {
      const $var24 = ty_1.tag === 5 ? [1] : ty_1.tag === 1 ? [2, ty_1.data[1]] : ty_1.tag === 4 ? [2, ty_1.data[1]] : ty_1.tag === 2 ? [2, ty_1.data[1]] : ty_1.tag === 3 ? [3] : ty_1.tag === 6 ? [4] : [0];

      switch ($var24[0]) {
        case 0:
          g = g;
          ty = ty_1.data[1];
          continue getErasedTypes;

        case 1:
          if (ty_1.data.IsErased) {
            return ofArray([ty_1]);
          } else {
            return new List();
          }

        case 2:
          return foldBack(function (ty_2, tys) {
            return append(getErasedTypes(g, ty_2), tys);
          }, $var24[1], new List());

        case 3:
          return append(getErasedTypes(g, ty_1.data[0]), getErasedTypes(g, ty_1.data[1]));

        case 4:
          return ofArray([ty_1]);
      }
    }
  }
}
export const valOrder = {
  Compare(v1, v2) {
    return v1.Stamp.CompareTo(v2.Stamp) | 0;
  },

  [_Symbol.reflection]() {
    return {
      interfaces: ["System.Collections.Generic.IComparer"]
    };
  }

};
export const tyconOrder = {
  Compare(tc1, tc2) {
    return tc1.Stamp.CompareTo(tc2.Stamp) | 0;
  },

  [_Symbol.reflection]() {
    return {
      interfaces: ["System.Collections.Generic.IComparer"]
    };
  }

};
export const recdFieldRefOrder = {
  Compare(_arg1, _arg2) {
    const c = tyconOrder.Compare(_arg1.data[0].Deref, _arg2.data[0].Deref) | 0;

    if (c !== 0) {
      return c | 0;
    } else {
      return comparePrimitives(_arg1.data[1], _arg2.data[1]) | 0;
    }
  },

  [_Symbol.reflection]() {
    return {
      interfaces: ["System.Collections.Generic.IComparer"]
    };
  }

};
export const unionCaseRefOrder = {
  Compare(_arg1, _arg2) {
    const c = tyconOrder.Compare(_arg1.data[0].Deref, _arg2.data[0].Deref) | 0;

    if (c !== 0) {
      return c | 0;
    } else {
      return comparePrimitives(_arg1.data[1], _arg2.data[1]) | 0;
    }
  },

  [_Symbol.reflection]() {
    return {
      interfaces: ["System.Collections.Generic.IComparer"]
    };
  }

};
export function mkFunTy(d, r) {
  return new TType(3, [d, r]);
}
export function op_MinusMinusGreater(d, r) {
  return mkFunTy(d, r);
}
export function mkForallTy(d, r) {
  return new TType(0, [d, r]);
}
export function tryMkForallTy(d, r) {
  if (d.tail == null) {
    return r;
  } else {
    return mkForallTy(d, r);
  }
}
export function op_PlusMinusGreater(d, r) {
  return tryMkForallTy(d, r);
}
export function mkIteratedFunTy(dl, r) {
  return foldBack(function (arg00_, arg10_) {
    return op_MinusMinusGreater(arg00_, arg10_);
  }, dl, r);
}
export function mkLambdaArgTy(m, tys) {
  if (tys.tail != null) {
    if (tys.tail.tail == null) {
      return tys.head;
    } else {
      return mkRawRefTupleTy(tys);
    }
  } else {
    return error(new InternalError("mkLambdaArgTy", m));
  }
}
export function typeOfLambdaArg(m, vs) {
  return mkLambdaArgTy(m, typesOfVals(vs));
}
export function mkMultiLambdaTy(m, vs, rty) {
  return mkFunTy(typeOfLambdaArg(m, vs), rty);
}
export function mkLambdaTy(tps, tys, rty) {
  return tryMkForallTy(tps, mkIteratedFunTy(tys, rty));
}
export function ensureCcuHasModuleOrNamespaceAtPath(ccu, path, _arg1, xml) {
  const scoref = ccu.ILScopeRef;

  const loop = function (prior_cpath, path_1, cpath, modul) {
    const mtype = modul.ModuleOrNamespaceType;
    const matchValue = [path_1, cpath];
    const $var25 = matchValue[0].tail != null ? matchValue[1].tail != null ? [0, matchValue[0].head, matchValue[1].head[1], matchValue[1].tail, matchValue[0].tail] : [1] : [1];

    switch ($var25[0]) {
      case 0:
        const modName = $var25[1].idText;

        if (!mtype.AllEntitiesByCompiledAndLogicalMangledNames.has(modName)) {
          const smodul = NewModuleOrNamespace(new CompilationPath(0, [scoref, prior_cpath]), taccessPublic, $var25[1], xml, new List(), new MaybeLazy(0, NewEmptyModuleOrNamespaceType($var25[2])));
          mtype.AddModuleOrNamespaceByMutation(smodul);
        }

        const modul_1 = find(modName, mtype.AllEntitiesByCompiledAndLogicalMangledNames);
        loop(append(prior_cpath, ofArray([[modName, new ModuleOrNamespaceKind(2)]])), $var25[4], $var25[3], modul_1);
        break;

      case 1:
        break;
    }
  };

  loop(new List(), path, _arg1.data[1], ccu.Contents);
}
export function stripExpr(e) {
  stripExpr: while (true) {
    if (e.tag === 14) {
      e = e.data.contents;
      continue stripExpr;
    } else {
      return e;
    }
  }
}
export function mkCase(a, b) {
  return new DecisionTreeCase(0, [a, b]);
}
export function isRefTupleExpr(e) {
  const $var26 = e.tag === 11 ? e.data[0].tag === 2 ? [0, e.data[0].data] : [1] : [1];

  switch ($var26[0]) {
    case 0:
      return !evalTupInfoIsStruct($var26[1]);

    case 1:
      return false;
  }
}
export function tryDestRefTupleExpr(e) {
  var tupInfo;
  const $var27 = e.tag === 11 ? e.data[0].tag === 2 ? (tupInfo = e.data[0].data, !evalTupInfoIsStruct(tupInfo)) ? [0, e.data[2], e.data[0].data] : [1] : [1] : [1];

  switch ($var27[0]) {
    case 0:
      return $var27[1];

    case 1:
      return ofArray([e]);
  }
}
export function rangeOfExpr(x) {
  rangeOfExpr: while (true) {
    const $var28 = x.tag === 11 ? [0, x.data[3]] : x.tag === 0 ? [0, x.data[1]] : x.tag === 12 ? [0, x.data[3]] : x.tag === 8 ? [0, x.data[6]] : x.tag === 5 ? [0, x.data[4]] : x.tag === 2 ? [0, x.data[4]] : x.tag === 10 ? [0, x.data[3]] : x.tag === 3 ? [0, x.data[5]] : x.tag === 4 ? [0, x.data[3]] : x.tag === 13 ? [0, x.data[2]] : x.tag === 6 ? [0, x.data[2]] : x.tag === 7 ? [0, x.data[2]] : x.tag === 9 ? [0, x.data[4]] : x.tag === 14 ? [1] : [0, x.data[2]];

    switch ($var28[0]) {
      case 0:
        return $var28[1];

      case 1:
        x = x.data.contents;
        continue rangeOfExpr;
    }
  }
}

function Expr_get_Range() {
  return rangeOfExpr(this);
}

export { Expr_get_Range as Expr$2E$get_Range };
export function primMkMatch(spBind, exprm, tree, targets, matchm, ty) {
  return new Expr(9, [spBind, exprm, tree, targets, matchm, ty]);
}
export class MatchBuilder {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.MatchBuilder",
      properties: {}
    };
  }

  constructor(spBind, inpRange) {
    this.spBind = spBind;
    this.inpRange = inpRange;
    this.targets = [];
  }

  static [".ctor"](spBind, inpRange, _arg1) {
    return new MatchBuilder(spBind, inpRange);
  }

  AddTarget(tg) {
    const n = this.targets.length | 0;
    this.targets.push(tg);
    return n | 0;
  }

  AddResultTarget(e, spTarget) {
    return new DecisionTree(1, [new List(), this.AddTarget(new DecisionTreeTarget(0, [new List(), e, spTarget]))]);
  }

  CloseTargets() {
    return toList_1(this.targets);
  }

  Close(dtree, m, ty) {
    return primMkMatch(this.spBind, this.inpRange, dtree, Array.from(this.targets), m, ty);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.MatchBuilder", MatchBuilder);
export function mkBoolSwitch(m, g, t, e) {
  return new DecisionTree(0, [g, ofArray([new DecisionTreeCase(0, [new DecisionTreeTest(2, new Const(0, true)), t])]), e, m]);
}
export function primMkCond(spBind, spTarget1, spTarget2, m, ty, e1, e2, e3) {
  const mbuilder = new MatchBuilder(spBind, m);
  const dtree = mkBoolSwitch(m, e1, mbuilder.AddResultTarget(e2, spTarget1), mbuilder.AddResultTarget(e3, spTarget2));
  return mbuilder.Close(dtree, m, ty);
}
export function mkCond(spBind, spTarget, m, ty, e1, e2, e3) {
  return primMkCond(spBind, spTarget, spTarget, m, ty, e1, e2, e3);
}
export function exprForValRef(m, vref) {
  return new Expr(1, [vref, new ValUseFlag(1), m]);
}
export function exprForVal(m, v) {
  return exprForValRef(m, mkLocalValRef(v));
}
export function mkLocalAux(m, s, ty, mut, compgen) {
  const thisv = NewVal(s, m, null, ty, mut, compgen, null, taccessPublic, new ValRecursiveScopeInfo(1), null, new ValBaseOrThisInfo(2), new List(), new ValInline(2), XmlDoc.Empty, false, false, false, false, false, false, null, new ParentRef(1));
  return [thisv, exprForVal(m, thisv)];
}
export function mkLocal(m, s, ty) {
  return mkLocalAux(m, s, ty, new ValMutability(0), false);
}
export function mkCompGenLocal(m, s, ty) {
  return mkLocalAux(m, s, ty, new ValMutability(0), true);
}
export function mkMutableCompGenLocal(m, s, ty) {
  return mkLocalAux(m, s, ty, new ValMutability(1), true);
}
export function mkMultiLambda(m, vs, b, rty) {
  return new Expr(3, [newUnique(), null, null, vs, b, m, rty]);
}
export function rebuildLambda(m, ctorThisValOpt, baseValOpt, vs, b, rty) {
  return new Expr(3, [newUnique(), ctorThisValOpt, baseValOpt, vs, b, m, rty]);
}
export function mkLambda(m, v, b, rty) {
  return mkMultiLambda(m, ofArray([v]), b, rty);
}
export function mkTypeLambda(m, vs, b, tau_ty) {
  if (vs.tail == null) {
    return b;
  } else {
    return new Expr(4, [newUnique(), vs, b, m, tau_ty]);
  }
}
export function mkTypeChoose(m, vs, b) {
  if (vs.tail == null) {
    return b;
  } else {
    return new Expr(13, [vs, b, m]);
  }
}
export function mkObjExpr(ty, basev, basecall, overrides, iimpls, m) {
  return new Expr(8, [newUnique(), ty, basev, basecall, overrides, iimpls, m]);
}
export function mkLambdas(m, tps, vs, b, rty) {
  const tupledArg_1 = foldBack(function (v, tupledArg) {
    return [mkLambda(m, v, tupledArg[0], tupledArg[1]), op_MinusMinusGreater(v.Type, tupledArg[1])];
  }, vs, [b, rty]);
  return mkTypeLambda(m, tps, tupledArg_1[0], tupledArg_1[1]);
}
export function mkMultiLambdasCore(m, vsl, b, rty) {
  return foldBack(function (v, tupledArg) {
    return [mkMultiLambda(m, v, tupledArg[0], tupledArg[1]), op_MinusMinusGreater(typeOfLambdaArg(m, v), tupledArg[1])];
  }, vsl, [b, rty]);
}
export function mkMultiLambdas(m, tps, vsl, b, rty) {
  const tupledArg = mkMultiLambdasCore(m, vsl, b, rty);
  return mkTypeLambda(m, tps, tupledArg[0], tupledArg[1]);
}
export function mkMemberLambdas(m, tps, ctorThisValOpt, baseValOpt, vsl, b, rty) {
  let expr;
  const matchValue = [ctorThisValOpt, baseValOpt];
  const $var29 = matchValue[0] == null ? matchValue[1] == null ? [0] : [1] : [1];

  switch ($var29[0]) {
    case 0:
      expr = mkMultiLambdasCore(m, vsl, b, rty);
      break;

    case 1:
      if (vsl.tail != null) {
        const patternInput = mkMultiLambdasCore(m, vsl.tail, b, rty);
        expr = [rebuildLambda(m, ctorThisValOpt, baseValOpt, vsl.head, patternInput[0], patternInput[1]), op_MinusMinusGreater(typeOfLambdaArg(m, vsl.head), patternInput[1])];
      } else {
        expr = error(new InternalError("mk_basev_multi_lambdas_core: can't attach a basev to a non-lambda expression", m));
      }

      break;
  }

  return mkTypeLambda(m, tps, expr[0], expr[1]);
}
export function mkMultiLambdaBind(v, letSeqPtOpt, m, tps, vsl, b, rty) {
  return new Binding(0, [v, mkMultiLambdas(m, tps, vsl, b, rty), letSeqPtOpt]);
}
export function mkBind(seqPtOpt, v, e) {
  return new Binding(0, [v, e, seqPtOpt]);
}
export function mkLetBind(m, bind, body) {
  return new Expr(7, [bind, body, m, NewFreeVarsCache()]);
}
export function mkLetsBind(m, binds, body) {
  return foldBack(function (arg10_, arg20_) {
    return mkLetBind(m, arg10_, arg20_);
  }, binds, body);
}
export function mkLetsFromBindings(m, binds, body) {
  return foldBack(function (arg10_, arg20_) {
    return mkLetBind(m, arg10_, arg20_);
  }, binds, body);
}
export function mkLet(seqPtOpt, m, v, x, body) {
  return mkLetBind(m, mkBind(seqPtOpt, v, x), body);
}
export function mkCompGenBind(v, e) {
  return new Binding(0, [v, e, new SequencePointInfoForBinding(3)]);
}
export function mkCompGenBinds(vs, es) {
  return toList(map2(function (arg00_, arg10_) {
    return mkCompGenBind(arg00_, arg10_);
  }, vs, es));
}
export function mkCompGenLet(m, v, x, body) {
  return mkLetBind(m, mkCompGenBind(v, x), body);
}
export function mkCompGenLets(m, vs, xs, body) {
  return mkLetsBind(m, mkCompGenBinds(vs, xs), body);
}
export function mkCompGenLetsFromBindings(m, vs, xs, body) {
  return mkLetsFromBindings(m, mkCompGenBinds(vs, xs), body);
}
export function mkInvisibleBind(v, e) {
  return new Binding(0, [v, e, new SequencePointInfoForBinding(4)]);
}
export function mkInvisibleBinds(vs, es) {
  return toList(map2(function (arg00_, arg10_) {
    return mkInvisibleBind(arg00_, arg10_);
  }, vs, es));
}
export function mkInvisibleLet(m, v, x, body) {
  return mkLetBind(m, mkInvisibleBind(v, x), body);
}
export function mkInvisibleLets(m, vs, xs, body) {
  return mkLetsBind(m, mkInvisibleBinds(vs, xs), body);
}
export function mkInvisibleLetsFromBindings(m, vs, xs, body) {
  return mkLetsFromBindings(m, mkInvisibleBinds(vs, xs), body);
}
export function mkLetRecBinds(m, binds, body) {
  if (binds.tail == null) {
    return body;
  } else {
    return new Expr(6, [binds, body, m, NewFreeVarsCache()]);
  }
}
export function NormalizeDeclaredTyparsForEquiRecursiveInference(g, tps) {
  if (tps.tail == null) {
    return new List();
  } else {
    return map(function (tp) {
      const ty = mkTyparTy(tp);
      const matchValue = tryAnyParTy(g, ty);

      if (matchValue == null) {
        return tp;
      } else {
        return getValue(matchValue);
      }
    }, tps);
  }
}
export class TypeScheme {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.TypeScheme",
      interfaces: ["FSharpUnion"],
      cases: [["TypeScheme", makeGeneric(List, {
        T: Typar
      }), TType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.TypeScheme", TypeScheme);
export function mkGenericBindRhs(g, m, generalizedTyparsForRecursiveBlock, typeScheme, bodyExpr) {
  const generalizedTypars = NormalizeDeclaredTyparsForEquiRecursiveInference(g, typeScheme.data[0]);
  const freeChoiceTypars = ListSet.subtract(function (lv1, lv2) {
    return typarEq(lv1, lv2);
  }, generalizedTyparsForRecursiveBlock, generalizedTypars);
  return mkTypeLambda(m, generalizedTypars, mkTypeChoose(m, freeChoiceTypars, bodyExpr), typeScheme.data[1]);
}
export function isBeingGeneralized(tp, typeScheme) {
  return exists(CurriedLambda(function (tp1, tp2) {
    return typarRefEq(tp1, tp2);
  })(tp), typeScheme.data[0]);
}
export function mkLazyAnd(g, m, e1, e2) {
  return mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.bool_ty, e1, e2, new Expr(0, [new Const(0, false), m, g.bool_ty]));
}
export function mkLazyOr(g, m, e1, e2) {
  return mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.bool_ty, e1, new Expr(0, [new Const(0, true), m, g.bool_ty]), e2);
}
export function mkCoerceExpr(e, to_ty, m, from_ty) {
  return new Expr(11, [new TOp(24), ofArray([to_ty, from_ty]), ofArray([e]), m]);
}
export function mkAsmExpr(code, tinst, args, rettys, m) {
  return new Expr(11, [new TOp(22, [code, rettys]), tinst, args, m]);
}
export function mkUnionCaseExpr(uc, tinst, args, m) {
  return new Expr(11, [new TOp(0, uc), tinst, args, m]);
}
export function mkExnExpr(uc, args, m) {
  return new Expr(11, [new TOp(1, uc), new List(), args, m]);
}
export function mkTupleFieldGetViaExprAddr(tupInfo, e, tinst, i, m) {
  return new Expr(11, [new TOp(21, [tupInfo, i]), tinst, ofArray([e]), m]);
}
export function mkRecdFieldGetViaExprAddr(e, fref, tinst, m) {
  return new Expr(11, [new TOp(12, fref), tinst, ofArray([e]), m]);
}
export function mkRecdFieldGetAddrViaExprAddr(e, fref, tinst, m) {
  return new Expr(11, [new TOp(13, fref), tinst, ofArray([e]), m]);
}
export function mkStaticRecdFieldGetAddr(fref, tinst, m) {
  return new Expr(11, [new TOp(13, fref), tinst, new List(), m]);
}
export function mkStaticRecdFieldGet(fref, tinst, m) {
  return new Expr(11, [new TOp(12, fref), tinst, new List(), m]);
}
export function mkStaticRecdFieldSet(fref, tinst, e, m) {
  return new Expr(11, [new TOp(11, fref), tinst, ofArray([e]), m]);
}
export function mkArrayElemAddress(g, readonly, isNativePtr, shape, elemTy, aexpr, nexpr, m) {
  return new Expr(11, [new TOp(22, [ofArray([new ILInstr(80, [readonly, isNativePtr, shape, mkILTyvarTy(0)])]), ofArray([mkByrefTy(g, elemTy)])]), ofArray([elemTy]), ofArray([aexpr, nexpr]), m]);
}
export function mkRecdFieldSetViaExprAddr(e1, fref, tinst, e2, m) {
  return new Expr(11, [new TOp(11, fref), tinst, ofArray([e1, e2]), m]);
}
export function mkUnionCaseTagGetViaExprAddr(e1, cref, tinst, m) {
  return new Expr(11, [new TOp(14, cref), tinst, ofArray([e1]), m]);
}
export function mkUnionCaseProof(e1, cref, tinst, m) {
  if (cref.Tycon.IsStructOrEnumTycon) {
    return e1;
  } else {
    return new Expr(11, [new TOp(15, cref), tinst, ofArray([e1]), m]);
  }
}
export function mkUnionCaseFieldGetProvenViaExprAddr(e1, cref, tinst, j, m) {
  return new Expr(11, [new TOp(16, [cref, j]), tinst, ofArray([e1]), m]);
}
export function mkUnionCaseFieldGetAddrProvenViaExprAddr(e1, cref, tinst, j, m) {
  return new Expr(11, [new TOp(17, [cref, j]), tinst, ofArray([e1]), m]);
}
export function mkUnionCaseFieldGetUnprovenViaExprAddr(e1, cref, tinst, j, m) {
  return mkUnionCaseFieldGetProvenViaExprAddr(mkUnionCaseProof(e1, cref, tinst, m), cref, tinst, j, m);
}
export function mkUnionCaseFieldSet(e1, cref, tinst, j, e2, m) {
  return new Expr(11, [new TOp(18, [cref, j]), tinst, ofArray([e1, e2]), m]);
}
export function mkExnCaseFieldGet(e1, ecref, j, m) {
  return new Expr(11, [new TOp(19, [ecref, j]), new List(), ofArray([e1]), m]);
}
export function mkExnCaseFieldSet(e1, ecref, j, e2, m) {
  return new Expr(11, [new TOp(20, [ecref, j]), new List(), ofArray([e1, e2]), m]);
}
export function mkDummyLambda(g, e, ety) {
  const m = Expr_get_Range.bind(e)();
  return mkLambda(m, mkCompGenLocal(m, "unitVar", g.unit_ty)[0], e, ety);
}
export function mkWhile(g, spWhile, marker, e1, e2, m) {
  return new Expr(11, [new TOp(6, [spWhile, marker]), new List(), ofArray([mkDummyLambda(g, e1, g.bool_ty), mkDummyLambda(g, e2, g.unit_ty)]), m]);
}
export function mkFor(g, spFor, v, e1, dir, e2, e3, m) {
  return new Expr(11, [new TOp(7, [spFor, dir]), new List(), ofArray([mkDummyLambda(g, e1, g.int_ty), mkDummyLambda(g, e2, g.int_ty), mkLambda(Expr_get_Range.bind(e3)(), v, e3, g.unit_ty)]), m]);
}
export function mkTryWith(g, e1, vf, ef, vh, eh, m, ty, spTry, spWith) {
  return new Expr(11, [new TOp(8, [spTry, spWith]), ofArray([ty]), ofArray([mkDummyLambda(g, e1, ty), mkLambda(Expr_get_Range.bind(ef)(), vf, ef, ty), mkLambda(Expr_get_Range.bind(eh)(), vh, eh, ty)]), m]);
}
export function mkTryFinally(g, e1, e2, m, ty, spTry, spFinally) {
  return new Expr(11, [new TOp(9, [spTry, spFinally]), ofArray([ty]), ofArray([mkDummyLambda(g, e1, ty), mkDummyLambda(g, e2, g.unit_ty)]), m]);
}
export function mkDefault(m, ty) {
  return new Expr(0, [new Const(17), m, ty]);
}
export function mkValSet(m, v, e) {
  return new Expr(11, [new TOp(30, [new LValueOperation(2), v]), new List(), ofArray([e]), m]);
}
export function mkAddrSet(m, v, e) {
  return new Expr(11, [new TOp(30, [new LValueOperation(3), v]), new List(), ofArray([e]), m]);
}
export function mkAddrGet(m, v) {
  return new Expr(11, [new TOp(30, [new LValueOperation(1), v]), new List(), new List(), m]);
}
export function mkValAddr(m, v) {
  return new Expr(11, [new TOp(30, [new LValueOperation(0), v]), new List(), new List(), m]);
}
export class ValHash {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.ValHash",
      interfaces: ["FSharpUnion"],
      cases: [["ValHash", makeGeneric(Map, {
        TKey: Long,
        TValue: GenericParam("T")
      })]]
    };
  }

  get Values() {
    return this.data.values();
  }

  TryFind(v) {
    const matchValue = tryGetValue(this.data, v.Stamp, null);

    if (matchValue[0]) {
      return makeSome(matchValue[1]);
    } else {
      return null;
    }
  }

  Add(v, x) {
    this.data.set(v.Stamp, x);
  }

  static Create() {
    return new ValHash(0, create());
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.ValHash", ValHash);
export class ValMultiMap {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.ValMultiMap",
      interfaces: ["FSharpRecord"],
      properties: {
        contents: makeGeneric(_Map, {
          Key: Long,
          Value: makeGeneric(List, {
            T: GenericParam("T")
          })
        })
      }
    };
  }

  constructor(contents) {
    this.contents = contents;
  }

  Find(v) {
    const matchValue = tryFind(v.Stamp, this.contents);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return new List();
    }
  }

  Add(v, x) {
    return new ValMultiMap(add(v.Stamp, new List(x, this.Find(v)), this.contents));
  }

  Remove(v) {
    return new ValMultiMap(remove(v.Stamp, this.contents));
  }

  get Contents() {
    return this.contents;
  }

  static get Empty() {
    return new ValMultiMap(create(null, new Comparer((x, y) => x.CompareTo(y))));
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.ValMultiMap", ValMultiMap);
export class TyconRefMultiMap {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.TyconRefMultiMap",
      interfaces: ["FSharpRecord"],
      properties: {
        contents: makeGeneric(TyconRefMap, {
          T: makeGeneric(List, {
            T: GenericParam("T")
          })
        })
      }
    };
  }

  constructor(contents) {
    this.contents = contents;
  }

  Find(v) {
    const matchValue = this.contents.TryFind(v);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return new List();
    }
  }

  Add(v, x) {
    return new TyconRefMultiMap(((arg00, arg10) => this.contents.Add(arg00, arg10))(v, new List(x, this.Find(v))));
  }

  static get Empty() {
    return new TyconRefMultiMap(TyconRefMap.Empty);
  }

  static OfList(vs) {
    return foldBack(function (tupledArg, acc) {
      return acc.Add(tupledArg[0], tupledArg[1]);
    }, vs, TyconRefMultiMap.Empty);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.TyconRefMultiMap", TyconRefMultiMap);
export function tryRescopeEntity(viewedCcu, entity) {
  const matchValue = entity.PublicPath;

  if (matchValue == null) {
    return null;
  } else {
    return ERefNonLocal(rescopePubPath(viewedCcu, getValue(matchValue)));
  }
}
export function tryRescopeVal(viewedCcu, entityRemap, vspec) {
  const matchValue = vspec.PublicPath;

  if (matchValue == null) {
    return null;
  } else {
    const p = getValue(matchValue).data[0];
    const fullLinkageKey = getValue(matchValue).data[1];
    const entityRemap_1 = new Remap(entityRemap.tpinst, entityRemap.valRemap, entityRemap.tyconRefRemap, true);
    const fullLinkageKey_1 = remapValLinkage(entityRemap_1, fullLinkageKey);
    const vref = vspec.IsIntrinsicMember ? mkNonLocalValRef(rescopePubPathToParent(viewedCcu, p), fullLinkageKey_1) : mkNonLocalValRef(rescopePubPath(viewedCcu, p), fullLinkageKey_1);
    return vref;
  }
}
export function actualTyOfRecdField(inst, fspec) {
  return instType(inst, fspec.FormalType);
}
export function actualTysOfRecdFields(inst, rfields) {
  return map(function (arg10_) {
    return actualTyOfRecdField(inst, arg10_);
  }, rfields);
}
export function actualTysOfInstanceRecdFields(inst, tcref) {
  return function (rfields) {
    return actualTysOfRecdFields(inst, rfields);
  }(tcref.AllInstanceFieldsAsList);
}
export function actualTysOfUnionCaseFields(inst, x) {
  return actualTysOfRecdFields(inst, x.AllFieldsAsList);
}
export function actualResultTyOfUnionCase(tinst, x) {
  return instType(mkTyconRefInst(x.TyconRef, tinst), x.ReturnType);
}
export function recdFieldsOfExnDefRef(x) {
  return stripExnEqns(x).TrueInstanceFieldsAsList;
}
export function recdFieldOfExnDefRefByIdx(x, n) {
  return stripExnEqns(x).GetFieldByIndex(n);
}
export function recdFieldTysOfExnDefRef(x) {
  return actualTysOfRecdFields(new List(), recdFieldsOfExnDefRef(x));
}
export function recdFieldTyOfExnDefRefByIdx(x, j) {
  return actualTyOfRecdField(new List(), recdFieldOfExnDefRefByIdx(x, j));
}
export function actualTyOfRecdFieldForTycon(tycon, tinst, fspec) {
  return instType(mkTyconInst(tycon, tinst), fspec.FormalType);
}
export function actualTyOfRecdFieldRef(fref, tinst) {
  return actualTyOfRecdFieldForTycon(fref.Tycon, tinst, fref.RecdField);
}
export function actualTyOfUnionFieldRef(fref, n, tinst) {
  return actualTyOfRecdFieldForTycon(fref.Tycon, tinst, fref.FieldByIndex(n));
}
export function destForallTy(g, ty) {
  const patternInput = primDestForallTy(g, ty);
  const tps = NormalizeDeclaredTyparsForEquiRecursiveInference(g, patternInput[0]);
  return [tps, patternInput[1]];
}
export function tryDestForallTy(g, ty) {
  if (isForallTy(g, ty)) {
    return destForallTy(g, ty);
  } else {
    return [new List(), ty];
  }
}
export function stripFunTy(g, ty) {
  if (isFunTy(g, ty)) {
    const patternInput = destFunTy(g, ty);
    const patternInput_1 = stripFunTy(g, patternInput[1]);
    return [new List(patternInput[0], patternInput_1[0]), patternInput_1[1]];
  } else {
    return [new List(), ty];
  }
}
export function applyForallTy(g, ty, tyargs) {
  const patternInput = destForallTy(g, ty);
  return instType(mkTyparInst(patternInput[0], tyargs), patternInput[1]);
}
export function reduceIteratedFunTy(g, ty, args) {
  return fold(function (ty_1, _arg1) {
    if (!isFunTy(g, ty_1)) {
      throw new Error("reduceIteratedFunTy");
    }

    return destFunTy(g, ty_1)[1];
  }, ty, args);
}
export function applyTyArgs(g, functy, tyargs) {
  if (isForallTy(g, functy)) {
    return applyForallTy(g, functy, tyargs);
  } else {
    return functy;
  }
}
export function applyTys(g, functy, tyargs, argtys) {
  const afterTyappTy = applyTyArgs(g, functy, tyargs);
  return reduceIteratedFunTy(g, afterTyappTy, argtys);
}
export function formalApplyTys(g, functy, tyargs, args) {
  return reduceIteratedFunTy(g, tyargs.tail == null ? functy : destForallTy(g, functy)[1], args);
}
export function stripFunTyN(g, n, ty) {
  if (n > 0 ? isFunTy(g, ty) : false) {
    const patternInput = destFunTy(g, ty);
    const patternInput_1 = stripFunTyN(g, n - 1, patternInput[1]);
    return [new List(patternInput[0], patternInput_1[0]), patternInput_1[1]];
  } else {
    return [new List(), ty];
  }
}
export function tryDestAnyTupleTy(g, ty) {
  if (isAnyTupleTy(g, ty)) {
    return destAnyTupleTy(g, ty);
  } else {
    return [tupInfoRef, ofArray([ty])];
  }
}
export function tryDestRefTupleTy(g, ty) {
  if (isRefTupleTy(g, ty)) {
    return destRefTupleTy(g, ty);
  } else {
    return ofArray([ty]);
  }
}
export function GetTopTauTypeInFSharpForm(g, curriedArgInfos, tau, m) {
  const nArgInfos = curriedArgInfos.length | 0;
  const patternInput = stripFunTyN(g, nArgInfos, tau);

  if (nArgInfos !== patternInput[0].length) {
    error(new _Error(SR.tastInvalidMemberSignature(), m));
  }

  const argtysl = toList(map2(function (argInfos, argty) {
    return argInfos.tail != null ? argInfos.tail.tail == null ? ofArray([[argty, argInfos.head]]) : toList(zip(destRefTupleTy(g, argty), argInfos)) : ofArray([[g.unit_ty, ValReprInfoModule.unnamedTopArg1]]);
  }, curriedArgInfos, patternInput[0]));
  return [argtysl, patternInput[1]];
}
export function destTopForallTy(g, _arg1, ty) {
  const patternInput = _arg1.data[0].tail == null ? [new List(), ty] : tryDestForallTy(g, ty);
  const tps = NormalizeDeclaredTyparsForEquiRecursiveInference(g, patternInput[0]);
  return [tps, patternInput[1]];
}
export function GetTopValTypeInFSharpForm(g, _arg1, ty, m) {
  const patternInput = destTopForallTy(g, _arg1, ty);
  const patternInput_1 = GetTopTauTypeInFSharpForm(g, _arg1.data[1], patternInput[1], m);
  return [patternInput[0], patternInput_1[0], patternInput_1[1], _arg1.data[2]];
}
export function IsCompiledAsStaticProperty(g, v) {
  const matchValue = v.ValReprInfo;

  if (matchValue != null) {
    const matchValue_1 = GetTopValTypeInFSharpForm(g, getValue(matchValue), v.Type, v.Range);
    const $var30 = matchValue_1[0].tail == null ? matchValue_1[1].tail == null ? !v.IsMember ? [0] : [1] : [1] : [1];

    switch ($var30[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  } else {
    return false;
  }
}
export function IsCompiledAsStaticPropertyWithField(g, v) {
  if (!v.IsCompiledAsStaticPropertyWithoutField) {
    return IsCompiledAsStaticProperty(g, v);
  } else {
    return false;
  }
}
export function isArrayTyconRef(g, tcr) {
  return g.il_arr_tcr_map.some(function (arg20_) {
    return tyconRefEq(g, tcr, arg20_);
  });
}
export function rankOfArrayTyconRef(g, tcr) {
  const matchValue = tryFindIndex(function (arg20_) {
    return tyconRefEq(g, tcr, arg20_);
  }, g.il_arr_tcr_map);

  if (matchValue == null) {
    throw new Error("rankOfArrayTyconRef: unsupported array rank");
  } else {
    return getValue(matchValue) + 1 | 0;
  }
}
export function destArrayTy(g, ty) {
  var ty_1;
  var tcref;
  let $var31;

  const activePatternResult26403 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(ty);

  if (activePatternResult26403 != null) {
    if (getValue(activePatternResult26403)[1].tail != null) {
      if (getValue(activePatternResult26403)[1].tail.tail == null) {
        if (ty_1 = getValue(activePatternResult26403)[1].head, tcref = getValue(activePatternResult26403)[0], isArrayTyconRef(g, tcref)) {
          $var31 = [0, getValue(activePatternResult26403)[0], getValue(activePatternResult26403)[1].head];
        } else {
          $var31 = [1];
        }
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
      return $var31[2];

    case 1:
      throw new Error("destArrayTy");
  }
}
export function destListTy(g, ty) {
  var ty_1;
  var tcref;
  let $var32;

  const activePatternResult26407 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(ty);

  if (activePatternResult26407 != null) {
    if (getValue(activePatternResult26407)[1].tail != null) {
      if (getValue(activePatternResult26407)[1].tail.tail == null) {
        if (ty_1 = getValue(activePatternResult26407)[1].head, tcref = getValue(activePatternResult26407)[0], tyconRefEq(g, tcref, g.list_tcr_canon)) {
          $var32 = [0, getValue(activePatternResult26407)[0], getValue(activePatternResult26407)[1].head];
        } else {
          $var32 = [1];
        }
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
      return $var32[2];

    case 1:
      throw new Error("destListTy");
  }
}
export function isTypeConstructorEqualToOptional(g, tcOpt, tc) {
  if (tcOpt != null) {
    return tyconRefEq(g, getValue(tcOpt), tc);
  } else {
    return false;
  }
}
export function isByrefLikeTyconRef(g, tcref) {
  if ((tyconRefEq(g, g.byref_tcr, tcref) ? true : isTypeConstructorEqualToOptional(g, g.system_TypedReference_tcref, tcref)) ? true : isTypeConstructorEqualToOptional(g, g.system_ArgIterator_tcref, tcref)) {
    return true;
  } else {
    return isTypeConstructorEqualToOptional(g, g.system_RuntimeArgumentHandle_tcref, tcref);
  }
}
export function isStringTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? tyconRefEq(g, _arg1.data[0], g.system_String_tcref) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isListTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? tyconRefEq(g, _arg1.data[0], g.list_tcr_canon) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isArrayTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? isArrayTyconRef(g, _arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isArray1DTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? tyconRefEq(g, _arg1.data[0], g.il_arr_tcr_map[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isUnitTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? tyconRefEq(g, g.unit_tcr_canon, _arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isObjTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? tyconRefEq(g, g.system_Object_tcref, _arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isVoidTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? tyconRefEq(g, g.system_Void_tcref, _arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isILAppTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? _arg1.data[0].IsILTycon : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isNativePtrTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? tyconRefEq(g, g.nativeptr_tcr, _arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isByrefTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? tyconRefEq(g, g.byref_tcr, _arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export function isByrefLikeTy(g, ty) {
  return function (_arg1) {
    return _arg1.tag === 1 ? isByrefLikeTyconRef(g, _arg1.data[0]) : false;
  }(function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty));
}
export class TypeDefMetadata {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.TypeDefMetadata",
      interfaces: ["FSharpUnion"],
      cases: [["ILTypeMetadata", TILObjectReprData], ["FSharpOrArrayOrByrefOrTupleOrExnTypeMetadata"]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.TypeDefMetadata", TypeDefMetadata);
export function metadataOfTycon(tycon) {
  if (tycon.IsILTycon) {
    return new TypeDefMetadata(0, tycon.ILTyconInfo);
  } else {
    return new TypeDefMetadata(1);
  }
}
export function metadataOfTy(g, ty) {
  if (isILAppTy(g, ty)) {
    const tcref = tcrefOfAppTy(g, ty);
    return new TypeDefMetadata(0, tcref.ILTyconInfo);
  } else {
    return new TypeDefMetadata(1);
  }
}
export function isILReferenceTy(g, ty) {
  const matchValue = metadataOfTy(g, ty);

  if (matchValue.tag === 1) {
    return isArrayTy(g, ty);
  } else {
    const td = matchValue.data.data[2];
    return !td.IsStructOrEnum;
  }
}
export function isILInterfaceTycon(tycon) {
  const matchValue = metadataOfTycon(tycon);

  if (matchValue.tag === 1) {
    return false;
  } else {
    const td = matchValue.data.data[2];
    return td.IsInterface;
  }
}
export function rankOfArrayTy(g, ty) {
  return rankOfArrayTyconRef(g, tcrefOfAppTy(g, ty)) | 0;
}
export function isFSharpObjModelRefTy(g, ty) {
  if (isFSharpObjModelTy(g, ty)) {
    const patternInput = destAppTy(g, ty);
    const matchValue = patternInput[0].FSharpObjectModelTypeInfo.fsobjmodel_kind;

    switch (matchValue.tag) {
      case 1:
      case 3:
        return true;

      case 2:
      case 4:
        return false;

      default:
        return true;
    }
  } else {
    return false;
  }
}
export function isFSharpClassTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return getValue(matchValue).Deref.IsFSharpClassTycon;
  } else {
    return false;
  }
}
export function isFSharpStructTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return getValue(matchValue).Deref.IsFSharpStructOrEnumTycon;
  } else {
    return false;
  }
}
export function isFSharpInterfaceTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return getValue(matchValue).Deref.IsFSharpInterfaceTycon;
  } else {
    return false;
  }
}
export function isDelegateTy(g, ty) {
  const matchValue = metadataOfTy(g, ty);

  if (matchValue.tag === 1) {
    const matchValue_1 = tryDestAppTy(g, ty);

    if (matchValue_1 != null) {
      return getValue(matchValue_1).Deref.IsFSharpDelegateTycon;
    } else {
      return false;
    }
  } else {
    const td = matchValue.data.data[2];
    return td.IsDelegate;
  }
}
export function isInterfaceTy(g, ty) {
  const matchValue = metadataOfTy(g, ty);

  if (matchValue.tag === 1) {
    return isFSharpInterfaceTy(g, ty);
  } else {
    const td = matchValue.data.data[2];
    return td.IsInterface;
  }
}
export function isClassTy(g, ty) {
  const matchValue = metadataOfTy(g, ty);

  if (matchValue.tag === 1) {
    return isFSharpClassTy(g, ty);
  } else {
    const td = matchValue.data.data[2];
    return td.IsClass;
  }
}
export function isStructOrEnumTyconTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return getValue(matchValue).Deref.IsStructOrEnumTycon;
  } else {
    return false;
  }
}
export function isStructRecordOrUnionTyconTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return getValue(matchValue).Deref.IsStructRecordOrUnionTycon;
  } else {
    return false;
  }
}
export function isStructTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    const tycon = getValue(matchValue).Deref;

    if (tycon.IsStructRecordOrUnionTycon) {
      return true;
    } else {
      return tycon.IsStructOrEnumTycon;
    }
  } else {
    return false;
  }
}
export function isRefTy(g, ty) {
  if (!isStructOrEnumTyconTy(g, ty)) {
    if ((((((isUnionTy(g, ty) ? true : isRefTupleTy(g, ty)) ? true : isRecdTy(g, ty)) ? true : isILReferenceTy(g, ty)) ? true : isFunTy(g, ty)) ? true : isReprHiddenTy(g, ty)) ? true : isFSharpObjModelRefTy(g, ty)) {
      return true;
    } else {
      return isUnitTy(g, ty);
    }
  } else {
    return false;
  }
}
export function isUnmanagedTy(g, ty) {
  const ty_1 = stripTyEqnsAndMeasureEqns(g, ty);
  const matchValue = tryDestAppTy(g, ty_1);

  if (matchValue == null) {
    return false;
  } else {
    const isEq = function (tcref2) {
      return tyconRefEq(g, getValue(matchValue), tcref2);
    };

    if ((((((((((((((isEq(g.nativeptr_tcr) ? true : isEq(g.nativeint_tcr)) ? true : isEq(g.sbyte_tcr)) ? true : isEq(g.byte_tcr)) ? true : isEq(g.int16_tcr)) ? true : isEq(g.uint16_tcr)) ? true : isEq(g.int32_tcr)) ? true : isEq(g.uint32_tcr)) ? true : isEq(g.int64_tcr)) ? true : isEq(g.uint64_tcr)) ? true : isEq(g.char_tcr)) ? true : isEq(g.float32_tcr)) ? true : isEq(g.float_tcr)) ? true : isEq(g.decimal_tcr)) ? true : isEq(g.bool_tcr)) {
      return true;
    } else {
      const tycon = getValue(matchValue).Deref;

      if (tycon.IsEnumTycon) {
        return true;
      } else if (tycon.IsStructOrEnumTycon) {
        const matchValue_1 = tycon.TyparsNoRange;

        if (matchValue_1.tail == null) {
          return forAll(function (r) {
            return isUnmanagedTy(g, r.rfield_type);
          }, tycon.AllInstanceFieldsAsList);
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
}
export function isInterfaceTycon(x) {
  if (isILInterfaceTycon(x)) {
    return true;
  } else {
    return x.IsFSharpInterfaceTycon;
  }
}
export function isInterfaceTyconRef(tcref) {
  return isInterfaceTycon(tcref.Deref);
}
export function isEnumTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return getValue(matchValue).IsEnumTycon;
  } else {
    return false;
  }
}
export function actualReturnTyOfSlotSig(parentTyInst, methTyInst, _arg1) {
  var arg00_;
  const methTyInst_1 = mkTyparInst(_arg1.data[3], methTyInst);
  const parentTyInst_1 = mkTyparInst(_arg1.data[2], parentTyInst);
  return defaultArg(_arg1.data[5], null, (arg00_ = append(parentTyInst_1, methTyInst_1), function (arg10_) {
    return instType(arg00_, arg10_);
  }));
}
export function slotSigHasVoidReturnTy(_arg1) {
  return _arg1.data[5] == null;
}
export function returnTyOfMethod(g, _arg1) {
  const parentTy = _arg1.data[0].data[1];
  const tinst = argsOfAppTy(g, parentTy);
  const methTyInst = generalizeTypars(_arg1.data[2]);
  return actualReturnTyOfSlotSig(tinst, methTyInst, _arg1.data[0]);
}
export function isAbstractTycon(tycon) {
  if (tycon.IsFSharpObjectModelTycon) {
    if (!tycon.IsFSharpDelegateTycon) {
      return tycon.TypeContents.tcaug_abstract;
    } else {
      return false;
    }
  } else if (tycon.IsILTycon) {
    return tycon.ILTyconRawMetadata.IsAbstract;
  } else {
    return false;
  }
}
export function MemberIsExplicitImpl(g, membInfo) {
  if (membInfo.MemberFlags.IsOverrideOrExplicitImpl) {
    const matchValue = membInfo.ImplementedSlotSigs;

    if (matchValue.tail == null) {
      return false;
    } else {
      return forAll(function (slotsig) {
        return isInterfaceTy(g, slotsig.ImplementedType);
      }, matchValue);
    }
  } else {
    return false;
  }
}
export function ValIsExplicitImpl(g, v) {
  const matchValue = v.MemberInfo;

  if (matchValue != null) {
    return MemberIsExplicitImpl(g, getValue(matchValue));
  } else {
    return false;
  }
}
export function ValRefIsExplicitImpl(g, vref) {
  return ValIsExplicitImpl(g, vref.Deref);
}
export const emptyFreeLocals = ZsetModule.empty(valOrder);
export function unionFreeLocals(s1, s2) {
  if (s1 === emptyFreeLocals) {
    return s2;
  } else if (s2 === emptyFreeLocals) {
    return s1;
  } else {
    return ZsetModule.union(s1, s2);
  }
}
export const emptyFreeRecdFields = ZsetModule.empty(recdFieldRefOrder);
export function unionFreeRecdFields(s1, s2) {
  if (s1 === emptyFreeRecdFields) {
    return s2;
  } else if (s2 === emptyFreeRecdFields) {
    return s1;
  } else {
    return ZsetModule.union(s1, s2);
  }
}
export const emptyFreeUnionCases = ZsetModule.empty(unionCaseRefOrder);
export function unionFreeUnionCases(s1, s2) {
  if (s1 === emptyFreeUnionCases) {
    return s2;
  } else if (s2 === emptyFreeUnionCases) {
    return s1;
  } else {
    return ZsetModule.union(s1, s2);
  }
}
export const emptyFreeTycons = ZsetModule.empty(tyconOrder);
export function unionFreeTycons(s1, s2) {
  if (s1 === emptyFreeTycons) {
    return s2;
  } else if (s2 === emptyFreeTycons) {
    return s1;
  } else {
    return ZsetModule.union(s1, s2);
  }
}
export const typarOrder = {
  Compare(v1, v2) {
    return v1.Stamp.CompareTo(v2.Stamp) | 0;
  },

  [_Symbol.reflection]() {
    return {
      interfaces: ["System.Collections.Generic.IComparer"]
    };
  }

};
export const emptyFreeTypars = ZsetModule.empty(typarOrder);
export function unionFreeTypars(s1, s2) {
  if (s1 === emptyFreeTypars) {
    return s2;
  } else if (s2 === emptyFreeTypars) {
    return s1;
  } else {
    return ZsetModule.union(s1, s2);
  }
}
export const emptyFreeTyvars = new FreeTyvars_1(emptyFreeTycons, emptyFreeLocals, emptyFreeTypars);
export function unionFreeTyvars(fvs1, fvs2) {
  if (fvs1 === emptyFreeTyvars) {
    return fvs2;
  } else if (fvs2 === emptyFreeTyvars) {
    return fvs1;
  } else {
    return new FreeTyvars_1(unionFreeTycons(fvs1.FreeTycons, fvs2.FreeTycons), unionFreeLocals(fvs1.FreeTraitSolutions, fvs2.FreeTraitSolutions), unionFreeTypars(fvs1.FreeTypars, fvs2.FreeTypars));
  }
}
export class FreeVarOptions {
  constructor(canCache, collectInTypes, includeLocalTycons, includeTypars, includeLocalTyconReprs, includeRecdFields, includeUnionCases, includeLocals) {
    this.canCache = canCache;
    this.collectInTypes = collectInTypes;
    this.includeLocalTycons = includeLocalTycons;
    this.includeTypars = includeTypars;
    this.includeLocalTyconReprs = includeLocalTyconReprs;
    this.includeRecdFields = includeRecdFields;
    this.includeUnionCases = includeUnionCases;
    this.includeLocals = includeLocals;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.FreeVarOptions",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        canCache: "boolean",
        collectInTypes: "boolean",
        includeLocalTycons: "boolean",
        includeTypars: "boolean",
        includeLocalTyconReprs: "boolean",
        includeRecdFields: "boolean",
        includeUnionCases: "boolean",
        includeLocals: "boolean"
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
setType("Microsoft.FSharp.Compiler.Tastops.FreeVarOptions", FreeVarOptions);
export const CollectAllNoCaching = new FreeVarOptions(false, true, true, true, true, true, true, true);
export const CollectTyparsNoCaching = new FreeVarOptions(false, true, false, true, false, false, false, false);
export const CollectLocalsNoCaching = new FreeVarOptions(false, false, false, false, false, false, false, true);
export const CollectTyparsAndLocalsNoCaching = new FreeVarOptions(false, true, false, true, false, false, false, true);
export const CollectAll = new FreeVarOptions(false, true, true, true, true, true, true, true);
export const CollectTyparsAndLocals = new FreeVarOptions(true, true, false, true, false, false, false, true);
export const CollectTypars = CollectTyparsAndLocals;
export const CollectLocals = CollectTyparsAndLocals;
export function accFreeLocalTycon(opts, x, acc) {
  if (!opts.includeLocalTycons) {
    return acc;
  } else if (ZsetModule.contains(x, acc.FreeTycons)) {
    return acc;
  } else {
    return new FreeTyvars_1(ZsetModule.add(x, acc.FreeTycons), acc.FreeTraitSolutions, acc.FreeTypars);
  }
}
export function accFreeTycon(opts, tcr, acc) {
  if (!opts.includeLocalTycons) {
    return acc;
  } else if (tcr.IsLocalRef) {
    return accFreeLocalTycon(opts, tcr.PrivateTarget, acc);
  } else {
    return acc;
  }
}
export function boundTypars(opts, tps, acc) {
  const acc_2 = foldBack(function (tp, acc_1) {
    return accFreeInTyparConstraints(opts, tp.Constraints, acc_1);
  }, tps, acc);
  return foldBack(function (tp_1, acc_3) {
    const FreeTypars = ZsetModule.remove(tp_1, acc_3.FreeTypars);
    return new FreeTyvars_1(acc_3.FreeTycons, acc_3.FreeTraitSolutions, FreeTypars);
  }, tps, acc_2);
}
export function accFreeInTyparConstraints(opts, cxs, acc) {
  return foldBack(function (tpc, acc_1) {
    return accFreeInTyparConstraint(opts, tpc, acc_1);
  }, cxs, acc);
}
export function accFreeInTyparConstraint(opts, tpc, acc) {
  switch (tpc.tag) {
    case 3:
      return accFreeInTrait(opts, tpc.data[0], acc);

    case 1:
      return accFreeInType(opts, tpc.data[1], acc);

    case 6:
      return accFreeInTypes(opts, tpc.data[0], acc);

    case 8:
      return accFreeInType(opts, tpc.data[0], acc);

    case 11:
      return accFreeInType(opts, tpc.data[0], accFreeInType(opts, tpc.data[1], acc));

    case 9:
    case 10:
    case 2:
    case 4:
    case 5:
    case 12:
    case 7:
      return acc;

    default:
      return accFreeInType(opts, tpc.data[0], acc);
  }
}
export function accFreeInTrait(opts, _arg1, acc) {
  return foldBack(function (sln, acc_1) {
    return accFreeInTraitSln(opts, sln, acc_1);
  }, defaultArg(_arg1.data[5].contents, [], $var34 => [$var34]), accFreeInTypes(opts, _arg1.data[0], accFreeInTypes(opts, _arg1.data[3], foldBack(function (arg10_, arg20_) {
    return accFreeInType(opts, arg10_, arg20_);
  }, defaultArg(_arg1.data[4], [], $var33 => [$var33]), acc))));
}
export function accFreeInTraitSln(opts, sln, acc) {
  switch (sln.tag) {
    case 0:
      return accFreeInType(opts, sln.data[0], accFreeValRefInTraitSln(opts, sln.data[1], accFreeInTypes(opts, sln.data[2], acc)));

    case 1:
      return accFreeInTypes(opts, sln.data[0], acc);

    case 4:
      return acc;

    case 3:
      return acc;

    default:
      return accFreeInType(opts, sln.data[0], accFreeInTypes(opts, sln.data[3], acc));
  }
}
export function accFreeLocalValInTraitSln(_opts, v, fvs) {
  if (ZsetModule.contains(v, fvs.FreeTraitSolutions)) {
    return fvs;
  } else {
    const FreeTraitSolutions = ZsetModule.add(v, fvs.FreeTraitSolutions);
    return new FreeTyvars_1(fvs.FreeTycons, FreeTraitSolutions, fvs.FreeTypars);
  }
}
export function accFreeValRefInTraitSln(opts, vref, fvs) {
  if (vref.IsLocalRef) {
    return accFreeLocalValInTraitSln(opts, vref.PrivateTarget, fvs);
  } else {
    return fvs;
  }
}
export function accFreeTyparRef(opts, tp, acc) {
  var FreeTypars;

  if (!opts.includeTypars) {
    return acc;
  } else if (ZsetModule.contains(tp, acc.FreeTypars)) {
    return acc;
  } else {
    return accFreeInTyparConstraints(opts, tp.Constraints, (FreeTypars = ZsetModule.add(tp, acc.FreeTypars), new FreeTyvars_1(acc.FreeTycons, acc.FreeTraitSolutions, FreeTypars)));
  }
}
export function accFreeInType(opts, ty, acc) {
  accFreeInType: while (true) {
    const matchValue = stripTyparEqns(ty);

    switch (matchValue.tag) {
      case 1:
        const acc_1 = accFreeTycon(opts, matchValue.data[0], acc);

        if (matchValue.data[1].tail != null) {
          if (matchValue.data[1].tail.tail == null) {
            opts = opts;
            ty = matchValue.data[1].head;
            acc = acc_1;
            continue accFreeInType;
          } else {
            return accFreeInTypes(opts, matchValue.data[1], acc_1);
          }
        } else {
          return acc_1;
        }

      case 4:
        const tc = matchValue.data[0].data[0];
        return accFreeInTypes(opts, matchValue.data[1], accFreeTycon(opts, tc, acc));

      case 3:
        const $var211 = opts;
        ty = matchValue.data[0];
        acc = accFreeInType(opts, matchValue.data[1], acc);
        opts = $var211;
        continue accFreeInType;

      case 5:
        return accFreeTyparRef(opts, matchValue.data, acc);

      case 0:
        return unionFreeTyvars(boundTypars(opts, matchValue.data[0], freeInType(opts, matchValue.data[1])), acc);

      case 6:
        return accFreeInMeasure(opts, matchValue.data, acc);

      default:
        return accFreeInTypes(opts, matchValue.data[1], accFreeInTupInfo(opts, matchValue.data[0], acc));
    }
  }
}
export function accFreeInTupInfo(_opts, unt, acc) {
  return acc;
}
export function accFreeInMeasure(opts, unt, acc) {
  return foldBack(function (tupledArg, acc_1) {
    return accFreeTyparRef(opts, tupledArg[0], acc_1);
  }, ListMeasureVarOccsWithNonZeroExponents(unt), acc);
}
export function accFreeInTypes(opts, tys, acc) {
  accFreeInTypes: while (true) {
    if (tys.tail != null) {
      const $var212 = opts;
      const $var213 = tys.tail;
      acc = accFreeInType(opts, tys.head, acc);
      opts = $var212;
      tys = $var213;
      continue accFreeInTypes;
    } else {
      return acc;
    }
  }
}
export function freeInType(opts, ty) {
  return accFreeInType(opts, ty, emptyFreeTyvars);
}
export function accFreeInVal(opts, v, acc) {
  return accFreeInType(opts, v.val_type, acc);
}
export function freeInTypes(opts, tys) {
  return accFreeInTypes(opts, tys, emptyFreeTyvars);
}
export function freeInVal(opts, v) {
  return accFreeInVal(opts, v, emptyFreeTyvars);
}
export function freeInTyparConstraints(opts, v) {
  return accFreeInTyparConstraints(opts, v, emptyFreeTyvars);
}
export function accFreeInTypars(opts, tps, acc) {
  return foldBack(function (tp, acc_1) {
    return accFreeTyparRef(opts, tp, acc_1);
  }, tps, acc);
}
export function emptyFreeTyparsLeftToRight() {
  return new List();
}
export function unionFreeTyparsLeftToRight(fvs1, fvs2) {
  return ListSet.unionFavourRight(function (lv1, lv2) {
    return typarEq(lv1, lv2);
  }, fvs1, fvs2);
}
export function boundTyparsLeftToRight(g, cxFlag, thruFlag, acc, tps) {
  return fold(function (acc_1, tp) {
    return accFreeInTyparConstraintsLeftToRight(g, cxFlag, thruFlag, acc_1, tp.Constraints);
  }, tps, acc);
}
export function accFreeInTyparConstraintsLeftToRight(g, cxFlag, thruFlag, acc, cxs) {
  return fold(function (acc_1, tpc) {
    return accFreeInTyparConstraintLeftToRight(g, cxFlag, thruFlag, acc_1, tpc);
  }, acc, cxs);
}
export function accFreeInTyparConstraintLeftToRight(g, cxFlag, thruFlag, acc, tpc) {
  switch (tpc.tag) {
    case 3:
      return accFreeInTraitLeftToRight(g, cxFlag, thruFlag, acc, tpc.data[0]);

    case 1:
      return accFreeInTypeLeftToRight(g, cxFlag, thruFlag, acc, tpc.data[1]);

    case 6:
      return accFreeInTypesLeftToRight(g, cxFlag, thruFlag, acc, tpc.data[0]);

    case 8:
      return accFreeInTypeLeftToRight(g, cxFlag, thruFlag, acc, tpc.data[0]);

    case 11:
      return accFreeInTypeLeftToRight(g, cxFlag, thruFlag, accFreeInTypeLeftToRight(g, cxFlag, thruFlag, acc, tpc.data[0]), tpc.data[1]);

    case 9:
    case 10:
    case 2:
    case 4:
    case 12:
    case 5:
    case 7:
      return acc;

    default:
      return accFreeInTypeLeftToRight(g, cxFlag, thruFlag, acc, tpc.data[0]);
  }
}
export function accFreeInTraitLeftToRight(g, cxFlag, thruFlag, acc, _arg1) {
  const acc_1 = accFreeInTypesLeftToRight(g, cxFlag, thruFlag, acc, _arg1.data[0]);
  const acc_2 = accFreeInTypesLeftToRight(g, cxFlag, thruFlag, acc_1, _arg1.data[3]);
  const acc_4 = fold(function (acc_3, ty) {
    return accFreeInTypeLeftToRight(g, cxFlag, thruFlag, acc_3, ty);
  }, acc_2, defaultArg(_arg1.data[4], [], $var35 => [$var35]));
  return acc_4;
}
export function accFreeTyparRefLeftToRight(g, cxFlag, thruFlag, acc, tp) {
  if (exists(CurriedLambda(function (lv1, lv2) {
    return typarEq(lv1, lv2);
  })(tp), acc)) {
    return acc;
  } else {
    const acc_1 = ListSet.insert(function (lv1_1, lv2_1) {
      return typarEq(lv1_1, lv2_1);
    }, tp, acc);

    if (cxFlag) {
      return accFreeInTyparConstraintsLeftToRight(g, cxFlag, thruFlag, acc_1, tp.Constraints);
    } else {
      return acc_1;
    }
  }
}
export function accFreeInTypeLeftToRight(g, cxFlag, thruFlag, acc, ty) {
  accFreeInTypeLeftToRight: while (true) {
    if (verbose) {
      dprintf(printf("--> accFreeInTypeLeftToRight \n"));
    }

    const matchValue = thruFlag ? stripTyEqns(g, ty) : stripTyparEqns(ty);

    switch (matchValue.tag) {
      case 1:
        return accFreeInTypesLeftToRight(g, cxFlag, thruFlag, acc, matchValue.data[1]);

      case 4:
        return accFreeInTypesLeftToRight(g, cxFlag, thruFlag, acc, matchValue.data[1]);

      case 3:
        const $var214 = g;
        const $var215 = cxFlag;
        const $var216 = thruFlag;
        acc = accFreeInTypeLeftToRight(g, cxFlag, thruFlag, acc, matchValue.data[0]);
        ty = matchValue.data[1];
        cxFlag = $var215;
        g = $var214;
        thruFlag = $var216;
        continue accFreeInTypeLeftToRight;

      case 5:
        return accFreeTyparRefLeftToRight(g, cxFlag, thruFlag, acc, matchValue.data);

      case 0:
        return unionFreeTyparsLeftToRight(boundTyparsLeftToRight(g, cxFlag, thruFlag, matchValue.data[0], accFreeInTypeLeftToRight(g, cxFlag, thruFlag, emptyFreeTyparsLeftToRight(), matchValue.data[1])), acc);

      case 6:
        return foldBack(function (tupledArg, acc_1) {
          return accFreeTyparRefLeftToRight(g, cxFlag, thruFlag, acc_1, tupledArg[0]);
        }, ListMeasureVarOccsWithNonZeroExponents(matchValue.data), acc);

      default:
        const acc_2 = accFreeInTupInfoLeftToRight(g, cxFlag, thruFlag, acc, matchValue.data[0]);
        return accFreeInTypesLeftToRight(g, cxFlag, thruFlag, acc_2, matchValue.data[1]);
    }
  }
}
export function accFreeInTupInfoLeftToRight(_g, _cxFlag, _thruFlag, acc, unt) {
  return acc;
}
export function accFreeInTypesLeftToRight(g, cxFlag, thruFlag, acc, tys) {
  accFreeInTypesLeftToRight: while (true) {
    if (tys.tail != null) {
      const $var217 = g;
      const $var218 = cxFlag;
      const $var219 = thruFlag;
      acc = accFreeInTypeLeftToRight(g, cxFlag, thruFlag, acc, tys.head);
      tys = tys.tail;
      cxFlag = $var218;
      g = $var217;
      thruFlag = $var219;
      continue accFreeInTypesLeftToRight;
    } else {
      return acc;
    }
  }
}
export function freeInTypeLeftToRight(g, thruFlag, ty) {
  return reverse(accFreeInTypeLeftToRight(g, true, thruFlag, emptyFreeTyparsLeftToRight(), ty));
}
export function freeInTypesLeftToRight(g, thruFlag, ty) {
  return reverse(accFreeInTypesLeftToRight(g, true, thruFlag, emptyFreeTyparsLeftToRight(), ty));
}
export function freeInTypesLeftToRightSkippingConstraints(g, ty) {
  return reverse(accFreeInTypesLeftToRight(g, false, true, emptyFreeTyparsLeftToRight(), ty));
}
export function valOfBind(b) {
  return b.Var;
}
export function valsOfBinds(binds) {
  return map(function (b) {
    return b.Var;
  }, binds);
}
export function GetMemberTypeInFSharpForm(g, memberFlags, arities, ty, m) {
  const patternInput = GetTopValTypeInFSharpForm(g, arities, ty, m);
  let argInfos;

  if (memberFlags.IsInstance) {
    if (patternInput[1].tail != null) {
      argInfos = patternInput[1].tail;
    } else {
      errorR(new InternalError("value does not have a valid member type", m));
      argInfos = patternInput[1];
    }
  } else {
    argInfos = patternInput[1];
  }

  return [patternInput[0], argInfos, patternInput[2], patternInput[3]];
}
export function checkMemberVal(membInfo, arity, m) {
  const matchValue = [membInfo, arity];

  if (matchValue[0] != null) {
    if (matchValue[1] != null) {
      return [getValue(matchValue[0]), getValue(matchValue[1])];
    } else {
      return error(new InternalError("checkMemberVal - no arity", m));
    }
  } else {
    return error(new InternalError("checkMemberVal - no membInfo", m));
  }
}
export function checkMemberValRef(vref) {
  return checkMemberVal(vref.MemberInfo, vref.ValReprInfo, vref.Range);
}
export function GetTopValTypeInCompiledForm(g, topValInfo, typ, m) {
  const patternInput = GetTopValTypeInFSharpForm(g, topValInfo, typ, m);
  let paramArgInfos;
  const matchValue = [patternInput[1], topValInfo.ArgInfos];
  const $var36 = matchValue[0].tail != null ? matchValue[0].head.tail != null ? matchValue[0].head.tail.tail == null ? matchValue[0].tail.tail != null ? matchValue[0].tail.head.tail != null ? matchValue[0].tail.head.tail.tail == null ? matchValue[0].tail.tail.tail == null ? matchValue[1].tail != null ? matchValue[1].head.tail != null ? matchValue[1].head.tail.tail == null ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tail == null ? matchValue[1].tail.tail.tail == null ? [1, matchValue[0].tail.head.head[0], matchValue[1].head.head, matchValue[0].head] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : matchValue[1].tail != null ? matchValue[1].head.tail == null ? matchValue[1].tail.tail == null ? [0, matchValue[0].head.head[0]] : [2] : [2] : [2] : matchValue[0].tail.tail != null ? matchValue[0].tail.head.tail != null ? matchValue[0].tail.head.tail.tail == null ? matchValue[0].tail.tail.tail == null ? matchValue[1].tail != null ? matchValue[1].head.tail != null ? matchValue[1].head.tail.tail == null ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tail == null ? matchValue[1].tail.tail.tail == null ? [1, matchValue[0].tail.head.head[0], matchValue[1].head.head, matchValue[0].head] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : matchValue[0].tail.tail != null ? matchValue[0].tail.head.tail != null ? matchValue[0].tail.head.tail.tail == null ? matchValue[0].tail.tail.tail == null ? matchValue[1].tail != null ? matchValue[1].head.tail != null ? matchValue[1].head.tail.tail == null ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tail == null ? matchValue[1].tail.tail.tail == null ? [1, matchValue[0].tail.head.head[0], matchValue[1].head.head, matchValue[0].head] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [2];

  switch ($var36[0]) {
    case 0:
      paramArgInfos = ofArray([new List()]);
      break;

    case 1:
      paramArgInfos = ofArray([$var36[3], new List()]);
      break;

    case 2:
      paramArgInfos = patternInput[1];
      break;
  }

  const rty = isUnitTy(g, patternInput[2]) ? null : patternInput[2];
  return [patternInput[0], paramArgInfos, rty, patternInput[3]];
}
export function GetMemberTypeInMemberForm(g, memberFlags, topValInfo, typ, m) {
  const patternInput = GetMemberTypeInFSharpForm(g, memberFlags, topValInfo, typ, m);
  let paramArgInfos;
  const matchValue = [patternInput[1], topValInfo.ArgInfos];
  const $var37 = matchValue[0].tail != null ? matchValue[0].head.tail != null ? matchValue[0].head.tail.tail == null ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].head.tail != null ? matchValue[1].head.tail.tail == null ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tail == null ? matchValue[1].tail.tail.tail == null ? [1, matchValue[1].head.head, matchValue[0].head.head[0]] : [2] : [2] : [2] : [2] : matchValue[1].tail.tail == null ? [0, matchValue[0].head.head[0]] : [2] : [2] : [2] : [2] : [2] : [2];

  switch ($var37[0]) {
    case 0:
      paramArgInfos = ofArray([new List()]);
      break;

    case 1:
      paramArgInfos = ofArray([new List()]);
      break;

    case 2:
      paramArgInfos = patternInput[1];
      break;
  }

  const rty = isUnitTy(g, patternInput[2]) ? null : patternInput[2];
  return [patternInput[0], paramArgInfos, rty, patternInput[3]];
}
export function GetTypeOfMemberInMemberForm(g, vref) {
  const patternInput = checkMemberValRef(vref);
  return GetMemberTypeInMemberForm(g, patternInput[0].MemberFlags, patternInput[1], vref.Type, vref.Range);
}
export function GetTypeOfMemberInFSharpForm(g, vref) {
  const patternInput = checkMemberValRef(vref);
  return GetMemberTypeInFSharpForm(g, patternInput[0].MemberFlags, patternInput[1], vref.Type, vref.Range);
}
export function PartitionValTyparsForApparentEnclosingType(g, v) {
  const matchValue = v.ValReprInfo;

  if (matchValue != null) {
    const patternInput = destTopForallTy(g, getValue(matchValue), v.Type);
    const parent = v.MemberApparentEntity;
    const parentTypars = parent.TyparsNoRange;
    const nparentTypars = parentTypars.length | 0;

    if (nparentTypars <= patternInput[0].length) {
      const patternInput_1 = List_1.chop(nparentTypars, patternInput[0]);
      const patternInput_2 = mkTyparToTyparRenaming(patternInput_1[0], parentTypars);
      return [parentTypars, patternInput_1[0], patternInput_1[1], patternInput_2[0], patternInput_2[1]];
    } else {
      return null;
    }
  } else {
    return error(new InternalError("PartitionValTypars: not a top value", v.Range));
  }
}
export function PartitionValTypars(g, v) {
  const matchValue = v.ValReprInfo;

  if (matchValue != null) {
    if (v.IsExtensionMember) {
      const patternInput = destTopForallTy(g, getValue(matchValue), v.Type);
      return [new List(), new List(), patternInput[0], emptyTyparInst, new List()];
    } else {
      return PartitionValTyparsForApparentEnclosingType(g, v);
    }
  } else {
    return error(new InternalError("PartitionValTypars: not a top value", v.Range));
  }
}
export function PartitionValRefTypars(g, vref) {
  return PartitionValTypars(g, vref.Deref);
}
export function ArgInfosOfMemberVal(g, v) {
  const patternInput = checkMemberVal(v.MemberInfo, v.ValReprInfo, v.Range);
  const patternInput_1 = GetMemberTypeInMemberForm(g, patternInput[0].MemberFlags, patternInput[1], v.Type, v.Range);
  return patternInput_1[1];
}
export function ArgInfosOfMember(g, vref) {
  return ArgInfosOfMemberVal(g, vref.Deref);
}
export function GetFSharpViewOfReturnType(g, retTy) {
  if (retTy != null) {
    return getValue(retTy);
  } else {
    return g.unit_ty;
  }
}
export function ReturnTypeOfPropertyVal(g, v) {
  const patternInput = checkMemberVal(v.MemberInfo, v.ValReprInfo, v.Range);
  const matchValue = patternInput[0].MemberFlags.MemberKind;

  if (matchValue.tag === 4) {
    const patternInput_1 = GetMemberTypeInMemberForm(g, patternInput[0].MemberFlags, patternInput[1], v.Type, v.Range);

    if (!(patternInput_1[1].tail == null) ? !(patternInput_1[1].head.tail == null) : false) {
      return last(patternInput_1[1].head)[0];
    } else {
      return error(new _Error(SR.tastValueDoesNotHaveSetterType(), v.Range));
    }
  } else if (matchValue.tag === 3) {
    const patternInput_2 = GetMemberTypeInMemberForm(g, patternInput[0].MemberFlags, patternInput[1], v.Type, v.Range);
    return GetFSharpViewOfReturnType(g, patternInput_2[2]);
  } else {
    return error(new InternalError("ReturnTypeOfPropertyVal", v.Range));
  }
}
export function ArgInfosOfPropertyVal(g, v) {
  const patternInput = checkMemberVal(v.MemberInfo, v.ValReprInfo, v.Range);
  const matchValue = patternInput[0].MemberFlags.MemberKind;

  if (matchValue.tag === 3) {
    return concat(ArgInfosOfMemberVal(g, v));
  } else if (matchValue.tag === 4) {
    const patternInput_1 = GetMemberTypeInMemberForm(g, patternInput[0].MemberFlags, patternInput[1], v.Type, v.Range);

    if (!(patternInput_1[1].tail == null) ? !(patternInput_1[1].head.tail == null) : false) {
      return List_1.frontAndBack(patternInput_1[1].head)[0];
    } else {
      return error(new _Error(SR.tastValueDoesNotHaveSetterType(), v.Range));
    }
  } else {
    return error(new InternalError("ArgInfosOfPropertyVal", v.Range));
  }
}
export function generalTyconRefInst(tc) {
  return generalizeTypars(tc.TyparsNoRange);
}
export function generalizeTyconRef(tc) {
  const tinst = generalTyconRefInst(tc);
  return [tinst, new TType(1, [tc, tinst])];
}
export function generalizedTyconRef(tc) {
  return new TType(1, [tc, generalTyconRefInst(tc)]);
}
export function isTTyparSupportsStaticMethod(_arg1) {
  if (_arg1.tag === 3) {
    return true;
  } else {
    return false;
  }
}
export function isTTyparCoercesToType(_arg1) {
  if (_arg1.tag === 0) {
    return true;
  } else {
    return false;
  }
}
export function prefixOfStaticReq(s) {
  if (s.tag === 1) {
    return " ^";
  } else {
    return "'";
  }
}
export function prefixOfRigidTypar(typar) {
  if (!typar.Rigidity.Equals(new TyparRigidity(0))) {
    return "_";
  } else {
    return "";
  }
}
export const PrettyTypes = function (__exports) {
  const newPrettyTypar = __exports.newPrettyTypar = function (tp, nm) {
    return NewTypar(tp.Kind, tp.Rigidity, new SynTypar(0, [ident(nm, tp.Range), tp.StaticReq, false]), false, new TyparDynamicReq(1), new List(), false, false);
  };

  const NewPrettyTypars = __exports.NewPrettyTypars = function (renaming, tps, names) {
    const niceTypars = toList(map2(function (tp, nm) {
      return newPrettyTypar(tp, nm);
    }, tps, names));
    const patternInput = mkTyparToTyparRenaming(tps, niceTypars);
    const renaming_1 = append(renaming, patternInput[0]);
    iterate2(function (tp_1, tpnice) {
      tpnice.FixupConstraints(instTyparConstraints(renaming_1, tp_1.Constraints));
    }, tps, niceTypars);
    return [niceTypars, renaming_1];
  };

  const NeedsPrettyTyparName = __exports.NeedsPrettyTyparName = function (tp) {
    if (tp.IsCompilerGenerated ? CurriedLambda(() => tp.typar_il_name == null)() : false) {
      return tp.typar_id.idText === unassignedTyparName;
    } else {
      return false;
    }
  };

  const PrettyTyparNames = __exports.PrettyTyparNames = function (pred, alreadyInUse, tps) {
    const choose = function (tps_1, tupledArg, acc) {
      if (tps_1.tail != null) {
        const useThisName = function (tupledArg_1) {
          return choose(tps_1.tail, [tupledArg_1[1], tupledArg_1[2]], new List(tupledArg_1[0], acc));
        };

        const tryAgain = function (tupledArg_2) {
          return choose(new List(tps_1.head, tps_1.tail), [tupledArg_2[0], tupledArg_2[1]], acc);
        };

        const tryName = function (tupledArg_3, f) {
          if (exists($var38 => equals(tupledArg_3[0], $var38), alreadyInUse)) {
            return f();
          } else {
            return useThisName([tupledArg_3[0], tupledArg_3[1], tupledArg_3[2]]);
          }
        };

        if (pred(tps_1.head)) {
          if (NeedsPrettyTyparName(tps_1.head)) {
            let patternInput;
            const matchValue = tps_1.head.Kind;

            if (matchValue.tag === 1) {
              patternInput = [tupledArg[0], tupledArg[1] + 1, "u", 6, tupledArg[1]];
            } else {
              patternInput = [tupledArg[0] + 1, tupledArg[1], "a", 20, tupledArg[0]];
            }

            const nm = patternInput[4] < patternInput[3] ? _String.make(1, String.fromCharCode(patternInput[2].charCodeAt(0) + patternInput[4])) : _String.make(1, patternInput[2]) + (patternInput[4] - patternInput[3] + 1).toString();
            return tryName([nm, patternInput[0], patternInput[1]], function () {
              return tryAgain([patternInput[0], patternInput[1]]);
            });
          } else {
            return tryName([tps_1.head.Name, tupledArg[0], tupledArg[1]], function () {
              let patternInput_1;
              const matchValue_1 = tps_1.head.Kind;

              if (matchValue_1.tag === 1) {
                patternInput_1 = [tupledArg[0], tupledArg[1] + 1, tps_1.head.Name + tupledArg[1].toString()];
              } else {
                patternInput_1 = [tupledArg[0] + 1, tupledArg[1], tps_1.head.Name + tupledArg[0].toString()];
              }

              return tryName([patternInput_1[2], patternInput_1[0], patternInput_1[1]], function () {
                return tryAgain([patternInput_1[0], patternInput_1[1]]);
              });
            });
          }
        } else {
          return useThisName([tps_1.head.Name, tupledArg[0], tupledArg[1]]);
        }
      } else {
        return reverse(acc);
      }
    };

    return choose(tps, [0, 0], new List());
  };

  const PrettifyThings = __exports.PrettifyThings = function (g, foldTys, mapTys, things) {
    const ftps = foldTys(function (acc, ty) {
      return accFreeInTypeLeftToRight(g, true, false, acc, ty);
    }, emptyFreeTyparsLeftToRight(), things);
    const ftps_1 = reverse(ftps);

    const computeKeep = function (keep, change, tps) {
      computeKeep: while (true) {
        if (tps.tail != null) {
          if (!NeedsPrettyTyparName(tps.head) ? !exists(function (tp2) {
            return tps.head.Name === tp2.Name;
          }, keep) : false) {
            keep = new List(tps.head, keep);
            change = change;
            tps = tps.tail;
            continue computeKeep;
          } else {
            keep = keep;
            change = new List(tps.head, change);
            tps = tps.tail;
            continue computeKeep;
          }
        } else {
          return [reverse(keep), reverse(change)];
        }
      }
    };

    const patternInput = computeKeep(new List(), new List(), ftps_1);
    const alreadyInUse = map(function (x) {
      return x.Name;
    }, patternInput[0]);
    const names = PrettyTyparNames(function (x_1) {
      return List_1.memq(x_1, patternInput[1]);
    }, alreadyInUse, ftps_1);
    const patternInput_1 = NewPrettyTypars(new List(), ftps_1, names);

    const getTauStayTau = function (t) {
      if (t.tag === 0) {
        return t.data[1];
      } else {
        return t;
      }
    };

    const tauThings = mapTys(getTauStayTau, things);
    const prettyThings = mapTys(function (arg10_) {
      return instType(patternInput_1[1], arg10_);
    }, tauThings);
    const tpconstraints = collect(function (tpnice) {
      return map(function (tpc) {
        return [tpnice, tpc];
      }, tpnice.Constraints);
    }, patternInput_1[0]);
    return [prettyThings, tpconstraints];
  };

  const PrettifyType = __exports.PrettifyType = function (g, x) {
    return PrettifyThings(g, CurriedLambda(function (x_1) {
      return CurriedLambda(x_1);
    }), CurriedLambda(function (x_2) {
      return x_2;
    }), x);
  };

  const PrettifyTypePair = __exports.PrettifyTypePair = function (g, x_0, x_1) {
    const x = [x_0, x_1];
    return PrettifyThings(g, function (f, acc, tupledArg) {
      return foldPair(f, f, acc, tupledArg[0], tupledArg[1]);
    }, function (f_1, tupledArg_1) {
      return mapPair(f_1, f_1, tupledArg_1[0], tupledArg_1[1]);
    }, x);
  };

  const PrettifyTypes = __exports.PrettifyTypes = function (g, x) {
    return PrettifyThings(g, function (folder, state, list) {
      return fold(folder, state, list);
    }, function (mapping, list_1) {
      return map(mapping, list_1);
    }, x);
  };

  const PrettifyCurriedTypes = __exports.PrettifyCurriedTypes = function (g, x) {
    return PrettifyThings(g, CurriedLambda(function (f) {
      const folder = function (state, list) {
        return fold(f, state, list);
      };

      return function (state_1, list_1) {
        return fold(folder, state_1, list_1);
      };
    }), function (f_1, xss) {
      return List_1.mapSquared(f_1, xss);
    }, x);
  };

  const PrettifyCurriedSigTypes = __exports.PrettifyCurriedSigTypes = function (g, x_0, x_1) {
    const x = [x_0, x_1];
    return PrettifyThings(g, CurriedLambda(function (f) {
      let f1;

      const folder = function (state, list) {
        return fold(f, state, list);
      };

      f1 = function (state_1, list_1) {
        return fold(folder, state_1, list_1);
      };

      return function (acc, tupledArg) {
        return foldPair(f1, f, acc, tupledArg[0], tupledArg[1]);
      };
    }), CurriedLambda(function (f_1) {
      const f1_1 = function (xss) {
        return List_1.mapSquared(f_1, xss);
      };

      return function (tupledArg_1) {
        return mapPair(f1_1, f_1, tupledArg_1[0], tupledArg_1[1]);
      };
    }), x);
  };

  const safeDestAnyParTy = __exports.safeDestAnyParTy = function (orig, g, ty) {
    const matchValue = tryAnyParTy(g, ty);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return orig;
    }
  };

  const tee = __exports.tee = function (f, x) {
    return f(x, x);
  };

  const foldUnurriedArgInfos = __exports.foldUnurriedArgInfos = function (f, z, x) {
    return fold(function (acc, tupledArg) {
      return fold1Of2(f, acc, tupledArg[0], tupledArg[1]);
    }, z, x);
  };

  const mapUnurriedArgInfos = __exports.mapUnurriedArgInfos = function (f, x) {
    return map(function (tupledArg) {
      return map1Of2(f, tupledArg[0], tupledArg[1]);
    }, x);
  };

  const foldTypar = __exports.foldTypar = function (f, z, x) {
    return foldOn(function (tp) {
      return mkTyparTy(tp);
    }, f, z, x);
  };

  const mapTypar = __exports.mapTypar = function (g, f, x) {
    return ($var40 => function (ty) {
      return safeDestAnyParTy(x, g, ty);
    }(($var39 => f(function (tp) {
      return mkTyparTy(tp);
    }($var39)))($var40)))(x);
  };

  const foldTypars = __exports.foldTypars = function (f, z, x) {
    return fold(function (z_1, x_1) {
      return foldTypar(f, z_1, x_1);
    }, z, x);
  };

  const mapTypars = __exports.mapTypars = function (g, f, x) {
    return map(function (x_1) {
      return mapTypar(g, f, x_1);
    }, x);
  };

  const foldTyparInst = __exports.foldTyparInst = function (f, z, x) {
    var f1;
    return fold((f1 = function (z_1, x_1) {
      return foldTypar(f, z_1, x_1);
    }, function (acc, tupledArg) {
      return foldPair(f1, f, acc, tupledArg[0], tupledArg[1]);
    }), z, x);
  };

  const mapTyparInst = __exports.mapTyparInst = function (g, f, x) {
    var f1;
    return map((f1 = function (x_1) {
      return mapTypar(g, f, x_1);
    }, function (tupledArg) {
      return mapPair(f1, f, tupledArg[0], tupledArg[1]);
    }), x);
  };

  const PrettifyInstAndTyparsAndType = __exports.PrettifyInstAndTyparsAndType = function (g, x_0, x_1, x_2) {
    const x = [x_0, x_1, x_2];
    return PrettifyThings(g, CurriedLambda(function (f) {
      const f1 = function (z, x_3) {
        return foldTyparInst(f, z, x_3);
      };

      const f2 = function (z_1, x_4) {
        return foldTypars(f, z_1, x_4);
      };

      return function (acc, tupledArg) {
        return foldTriple(f1, f2, f, acc, tupledArg[0], tupledArg[1], tupledArg[2]);
      };
    }), CurriedLambda(function (f_1) {
      const f1_1 = function (x_5) {
        return mapTyparInst(g, f_1, x_5);
      };

      const f2_1 = function (x_6) {
        return mapTypars(g, f_1, x_6);
      };

      return function (tupledArg_1) {
        return mapTriple(f1_1, f2_1, f_1, tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]);
      };
    }), x);
  };

  const PrettifyInstAndUncurriedSig = __exports.PrettifyInstAndUncurriedSig = function (g, x_0, x_1, x_2) {
    const x = [x_0, x_1, x_2];
    return PrettifyThings(g, CurriedLambda(function (f) {
      const f1 = function (z, x_3) {
        return foldTyparInst(f, z, x_3);
      };

      const f2 = function (z_1, x_4) {
        return foldUnurriedArgInfos(f, z_1, x_4);
      };

      return function (acc, tupledArg) {
        return foldTriple(f1, f2, f, acc, tupledArg[0], tupledArg[1], tupledArg[2]);
      };
    }), CurriedLambda(function (f_1) {
      const f1_1 = function (x_5) {
        return mapTyparInst(g, f_1, x_5);
      };

      let f2_1;

      const mapping = function (tupledArg_1) {
        return map1Of2(f_1, tupledArg_1[0], tupledArg_1[1]);
      };

      f2_1 = function (list) {
        return map(mapping, list);
      };

      return function (tupledArg_2) {
        return mapTriple(f1_1, f2_1, f_1, tupledArg_2[0], tupledArg_2[1], tupledArg_2[2]);
      };
    }), x);
  };

  const PrettifyInstAndCurriedSig = __exports.PrettifyInstAndCurriedSig = function (g, x_0, x_1, x_2, x_3) {
    const x = [x_0, x_1, x_2, x_3];
    return PrettifyThings(g, CurriedLambda(function (f) {
      const f1 = function (z, x_4) {
        return foldTyparInst(f, z, x_4);
      };

      const f2 = function (state, list) {
        return fold(f, state, list);
      };

      let f3;
      let folder_1;

      const folder = function (acc, tupledArg) {
        return fold1Of2(f, acc, tupledArg[0], tupledArg[1]);
      };

      folder_1 = function (state_1, list_1) {
        return fold(folder, state_1, list_1);
      };

      f3 = function (state_2, list_2) {
        return fold(folder_1, state_2, list_2);
      };

      return function (acc_1, tupledArg_1) {
        return foldQuadruple(f1, f2, f3, f, acc_1, tupledArg_1[0], tupledArg_1[1], tupledArg_1[2], tupledArg_1[3]);
      };
    }), CurriedLambda(function (f_1) {
      const f1_1 = function (x_5) {
        return mapTyparInst(g, f_1, x_5);
      };

      const f2_1 = function (list_3) {
        return map(f_1, list_3);
      };

      let f3_1;

      const f_2 = function (tupledArg_2) {
        return map1Of2(f_1, tupledArg_2[0], tupledArg_2[1]);
      };

      f3_1 = function (xss) {
        return List_1.mapSquared(f_2, xss);
      };

      return function (tupledArg_3) {
        return mapQuadruple(f1_1, f2_1, f3_1, f_1, tupledArg_3[0], tupledArg_3[1], tupledArg_3[2], tupledArg_3[3]);
      };
    }), x);
  };

  const PrettifyInstAndSig = __exports.PrettifyInstAndSig = function (g, x_0, x_1, x_2) {
    const x = [x_0, x_1, x_2];
    return PrettifyThings(g, CurriedLambda(function (f) {
      const f1 = function (z, x_3) {
        return foldTyparInst(f, z, x_3);
      };

      const f2 = function (state, list) {
        return fold(f, state, list);
      };

      return function (acc, tupledArg) {
        return foldTriple(f1, f2, f, acc, tupledArg[0], tupledArg[1], tupledArg[2]);
      };
    }), CurriedLambda(function (f_1) {
      const f1_1 = function (x_4) {
        return mapTyparInst(g, f_1, x_4);
      };

      const f2_1 = function (list_1) {
        return map(f_1, list_1);
      };

      return function (tupledArg_1) {
        return mapTriple(f1_1, f2_1, f_1, tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]);
      };
    }), x);
  };

  const PrettifyInstAndTypes = __exports.PrettifyInstAndTypes = function (g, x_0, x_1) {
    const x = [x_0, x_1];
    return PrettifyThings(g, CurriedLambda(function (f) {
      const f1 = function (z, x_2) {
        return foldTyparInst(f, z, x_2);
      };

      const f2 = function (state, list) {
        return fold(f, state, list);
      };

      return function (acc, tupledArg) {
        return foldPair(f1, f2, acc, tupledArg[0], tupledArg[1]);
      };
    }), CurriedLambda(function (f_1) {
      const f1_1 = function (x_3) {
        return mapTyparInst(g, f_1, x_3);
      };

      const f2_1 = function (list_1) {
        return map(f_1, list_1);
      };

      return function (tupledArg_1) {
        return mapPair(f1_1, f2_1, tupledArg_1[0], tupledArg_1[1]);
      };
    }), x);
  };

  const PrettifyInstAndType = __exports.PrettifyInstAndType = function (g, x_0, x_1) {
    const x = [x_0, x_1];
    return PrettifyThings(g, CurriedLambda(function (f) {
      const f1 = function (z, x_2) {
        return foldTyparInst(f, z, x_2);
      };

      return function (acc, tupledArg) {
        return foldPair(f1, f, acc, tupledArg[0], tupledArg[1]);
      };
    }), CurriedLambda(function (f_1) {
      const f1_1 = function (x_3) {
        return mapTyparInst(g, f_1, x_3);
      };

      return function (tupledArg_1) {
        return mapPair(f1_1, f_1, tupledArg_1[0], tupledArg_1[1]);
      };
    }), x);
  };

  const PrettifyInst = __exports.PrettifyInst = function (g, x) {
    return PrettifyThings(g, function (f, z, x_1) {
      return foldTyparInst(f, z, x_1);
    }, function (f_1, x_2) {
      return mapTyparInst(g, f_1, x_2);
    }, x);
  };

  return __exports;
}({});
export const SimplifyTypes = function (__exports) {
  const foldTypeButNotConstraints = __exports.foldTypeButNotConstraints = function ($var254, $var255, $var256) {
    foldTypeButNotConstraints: while (true) {
      const f = $var254;
      const z = $var255;
      const typ = $var256;
      const typ_1 = stripTyparEqns(typ);
      const z_1 = f(z, typ_1);

      switch (typ_1.tag) {
        case 1:
          return fold(function (z_2, typ_2) {
            return foldTypeButNotConstraints(f, z_2, typ_2);
          }, z_1, typ_1.data[1]);

        case 4:
          return fold(function (z_3, typ_3) {
            return foldTypeButNotConstraints(f, z_3, typ_3);
          }, z_1, typ_1.data[1]);

        case 2:
          return fold(function (z_4, typ_4) {
            return foldTypeButNotConstraints(f, z_4, typ_4);
          }, z_1, typ_1.data[1]);

        case 3:
          $var254 = f;
          $var255 = foldTypeButNotConstraints(f, z_1, typ_1.data[0]);
          $var256 = typ_1.data[1];
          continue foldTypeButNotConstraints;

        case 5:
          return z_1;

        case 6:
          return z_1;

        default:
          $var254 = f;
          $var255 = z_1;
          $var256 = typ_1.data[1];
          continue foldTypeButNotConstraints;
      }
    }
  };

  const incM = __exports.incM = function (x, m) {
    if (ZmapModule.mem(x, m)) {
      return ZmapModule.add(x, 1 + ZmapModule.find(x, m), m);
    } else {
      return ZmapModule.add(x, 1, m);
    }
  };

  const accTyparCounts = __exports.accTyparCounts = function (z, typ) {
    return foldTypeButNotConstraints(function (z_1, typ_1) {
      const $var41 = typ_1.tag === 5 ? typ_1.data.Rigidity.Equals(new TyparRigidity(0)) ? [0, typ_1.data] : [1] : [1];

      switch ($var41[0]) {
        case 0:
          return incM($var41[1], z_1);

        case 1:
          return z_1;
      }
    }, z, typ);
  };

  const emptyTyparCounts = __exports.emptyTyparCounts = ZmapModule.empty(typarOrder);

  const accTyparCountsMulti = __exports.accTyparCountsMulti = function (acc, l) {
    return fold(function (z, typ) {
      return accTyparCounts(z, typ);
    }, acc, l);
  };

  const TypeSimplificationInfo = __exports.TypeSimplificationInfo = class TypeSimplificationInfo {
    constructor(singletons, inplaceConstraints, postfixConstraints) {
      this.singletons = singletons;
      this.inplaceConstraints = inplaceConstraints;
      this.postfixConstraints = postfixConstraints;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.Tastops.SimplifyTypes.TypeSimplificationInfo",
        interfaces: ["FSharpRecord"],
        properties: {
          singletons: makeGeneric(_Set, {
            T: Typar,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          inplaceConstraints: makeGeneric(_Map_1, {
            Key: Typar,
            Value: TType,
            ComparerTag: Interface("System.Collections.Generic.IComparer")
          }),
          postfixConstraints: makeGeneric(List, {
            T: Tuple([Typar, TyparConstraint])
          })
        }
      };
    }

  };
  setType("Microsoft.FSharp.Compiler.Tastops.SimplifyTypes.TypeSimplificationInfo", TypeSimplificationInfo);
  const typeSimplificationInfo0 = __exports.typeSimplificationInfo0 = new TypeSimplificationInfo(ZsetModule.empty(typarOrder), ZmapModule.empty(typarOrder), new List());

  const categorizeConstraints = __exports.categorizeConstraints = function (simplify, m, cxs) {
    const singletons = simplify ? ZmapModule.chooseL(function (tp, n) {
      return n === 1 ? tp : null;
    }, m) : new List();
    const singletons_1 = ZsetModule.addList(singletons, ZsetModule.empty(typarOrder));
    const constraintTypars = freeInTyparConstraints(CollectTyparsNoCaching, map(function (tuple) {
      return tuple[1];
    }, cxs)).FreeTypars;

    const usedInTypeConstraint = function (typar) {
      return ZsetModule.contains(typar, constraintTypars);
    };

    const singletons_2 = ZsetModule.filter($var42 => function (value) {
      return !value;
    }(usedInTypeConstraint($var42)), singletons_1);
    const patternInput = partition(function (tupledArg) {
      return ((simplify ? isTTyparCoercesToType(tupledArg[1]) : false) ? ZsetModule.contains(tupledArg[0], singletons_2) : false) ? tupledArg[0].Constraints.length === 1 : false;
    }, cxs);
    const inplace = map(function (_arg1) {
      if (_arg1[1].tag === 0) {
        const ty = _arg1[1].data[0];
        return [_arg1[0], ty];
      } else {
        throw new Error("not isTTyparCoercesToType");
      }
    }, patternInput[0]);
    return new TypeSimplificationInfo(singletons_2, ZmapModule.ofList(typarOrder, inplace), patternInput[1]);
  };

  const CollectInfo = __exports.CollectInfo = function (simplify, tys, cxs) {
    return categorizeConstraints(simplify, accTyparCountsMulti(emptyTyparCounts, tys), cxs);
  };

  return __exports;
}({});
export class DisplayEnv {
  constructor(includeStaticParametersInTypeNames, openTopPathsSorted, openTopPathsRaw, shortTypeNames, suppressNestedTypes, maxMembers, showObsoleteMembers, showHiddenMembers, showTyparBinding, showImperativeTyparAnnotations, suppressInlineKeyword, suppressMutableKeyword, showMemberContainers, shortConstraints, useColonForReturnType, showAttributes, showOverrides, showConstraintTyparAnnotations, abbreviateAdditionalConstraints, showTyparDefaultConstraints, g, contextAccessibility, generatedValueLayout) {
    this.includeStaticParametersInTypeNames = includeStaticParametersInTypeNames;
    this.openTopPathsSorted = openTopPathsSorted;
    this.openTopPathsRaw = openTopPathsRaw;
    this.shortTypeNames = shortTypeNames;
    this.suppressNestedTypes = suppressNestedTypes;
    this.maxMembers = maxMembers;
    this.showObsoleteMembers = showObsoleteMembers;
    this.showHiddenMembers = showHiddenMembers;
    this.showTyparBinding = showTyparBinding;
    this.showImperativeTyparAnnotations = showImperativeTyparAnnotations;
    this.suppressInlineKeyword = suppressInlineKeyword;
    this.suppressMutableKeyword = suppressMutableKeyword;
    this.showMemberContainers = showMemberContainers;
    this.shortConstraints = shortConstraints;
    this.useColonForReturnType = useColonForReturnType;
    this.showAttributes = showAttributes;
    this.showOverrides = showOverrides;
    this.showConstraintTyparAnnotations = showConstraintTyparAnnotations;
    this.abbreviateAdditionalConstraints = abbreviateAdditionalConstraints;
    this.showTyparDefaultConstraints = showTyparDefaultConstraints;
    this.g = g;
    this.contextAccessibility = contextAccessibility;
    this.generatedValueLayout = generatedValueLayout;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.DisplayEnv",
      interfaces: ["FSharpRecord"],
      properties: {
        includeStaticParametersInTypeNames: "boolean",
        openTopPathsSorted: Any,
        openTopPathsRaw: makeGeneric(List, {
          T: makeGeneric(List, {
            T: "string"
          })
        }),
        shortTypeNames: "boolean",
        suppressNestedTypes: "boolean",
        maxMembers: Option("number"),
        showObsoleteMembers: "boolean",
        showHiddenMembers: "boolean",
        showTyparBinding: "boolean",
        showImperativeTyparAnnotations: "boolean",
        suppressInlineKeyword: "boolean",
        suppressMutableKeyword: "boolean",
        showMemberContainers: "boolean",
        shortConstraints: "boolean",
        useColonForReturnType: "boolean",
        showAttributes: "boolean",
        showOverrides: "boolean",
        showConstraintTyparAnnotations: "boolean",
        abbreviateAdditionalConstraints: "boolean",
        showTyparDefaultConstraints: "boolean",
        g: TcGlobals,
        contextAccessibility: Accessibility,
        generatedValueLayout: _Function([Val, Option(Layout)])
      }
    };
  }

  SetOpenPaths(paths) {
    const openTopPathsSorted = new Lazy(() => toList(sortWith((p1, p2) => -p1.CompareTo(p2), paths)));
    return new DisplayEnv(this.includeStaticParametersInTypeNames, openTopPathsSorted, paths, this.shortTypeNames, this.suppressNestedTypes, this.maxMembers, this.showObsoleteMembers, this.showHiddenMembers, this.showTyparBinding, this.showImperativeTyparAnnotations, this.suppressInlineKeyword, this.suppressMutableKeyword, this.showMemberContainers, this.shortConstraints, this.useColonForReturnType, this.showAttributes, this.showOverrides, this.showConstraintTyparAnnotations, this.abbreviateAdditionalConstraints, this.showTyparDefaultConstraints, this.g, this.contextAccessibility, this.generatedValueLayout);
  }

  static Empty(tcGlobals) {
    const openTopPathsRaw = new List();
    const openTopPathsSorted = notlazy(new List());
    const maxMembers = null;
    return new DisplayEnv(false, openTopPathsSorted, openTopPathsRaw, false, false, maxMembers, false, false, false, false, false, false, false, false, false, false, true, true, false, false, tcGlobals, taccessPublic, function (_arg1) {
      return null;
    });
  }

  AddOpenPath(path) {
    return this.SetOpenPaths(new List(path, this.openTopPathsRaw));
  }

  AddOpenModuleOrNamespace(modref) {
    return this.AddOpenPath(fullCompPathOfModuleOrNamespace(modref.Deref).DemangledPath);
  }

  AddAccessibility(access) {
    const contextAccessibility = combineAccess(this.contextAccessibility, access);
    return new DisplayEnv(this.includeStaticParametersInTypeNames, this.openTopPathsSorted, this.openTopPathsRaw, this.shortTypeNames, this.suppressNestedTypes, this.maxMembers, this.showObsoleteMembers, this.showHiddenMembers, this.showTyparBinding, this.showImperativeTyparAnnotations, this.suppressInlineKeyword, this.suppressMutableKeyword, this.showMemberContainers, this.shortConstraints, this.useColonForReturnType, this.showAttributes, this.showOverrides, this.showConstraintTyparAnnotations, this.abbreviateAdditionalConstraints, this.showTyparDefaultConstraints, this.g, contextAccessibility, this.generatedValueLayout);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.DisplayEnv", DisplayEnv);
export function op_PlusDotPlus(s1, s2) {
  if (s1 === "") {
    return s2;
  } else {
    return s1 + "." + s2;
  }
}
export function layoutOfPath(p) {
  return sepListL(SepL.dot, map($var43 => function (arg00_) {
    return wordL(arg00_);
  }(TaggedTextOps.tagNamespace($var43)), p));
}
export function fullNameOfParentOfPubPath(pp) {
  if (pp.data.length === 1) {
    return null;
  } else {
    return textOfPath(pp.EnclosingPath);
  }
}
export function fullNameOfParentOfPubPathAsLayout(pp) {
  if (pp.data.length === 1) {
    return null;
  } else {
    return layoutOfPath(toList(pp.EnclosingPath));
  }
}
export function fullNameOfPubPath(_arg1) {
  return textOfPath(_arg1.data);
}
export function fullNameOfPubPathAsLayout(_arg1) {
  return layoutOfPath(toList(_arg1.data));
}
export function fullNameOfParentOfNonLocalEntityRef(nlr) {
  if (nlr.Path.length < 2) {
    return null;
  } else {
    return textOfPath(nlr.EnclosingMangledPath);
  }
}
export function fullNameOfParentOfNonLocalEntityRefAsLayout(nlr) {
  if (nlr.Path.length < 2) {
    return null;
  } else {
    return layoutOfPath(ofArray(nlr.EnclosingMangledPath));
  }
}
export function fullNameOfParentOfEntityRef(eref) {
  const activePatternResult26856 = _ERefLocal_ERefNonLocal_(eref);

  if (activePatternResult26856.tag === 1) {
    return fullNameOfParentOfNonLocalEntityRef(activePatternResult26856.data);
  } else {
    const matchValue = activePatternResult26856.data.PublicPath;

    if (matchValue != null) {
      return fullNameOfParentOfPubPath(getValue(matchValue));
    } else {
      return null;
    }
  }
}
export function fullNameOfParentOfEntityRefAsLayout(eref) {
  const activePatternResult26858 = _ERefLocal_ERefNonLocal_(eref);

  if (activePatternResult26858.tag === 1) {
    return fullNameOfParentOfNonLocalEntityRefAsLayout(activePatternResult26858.data);
  } else {
    const matchValue = activePatternResult26858.data.PublicPath;

    if (matchValue != null) {
      return fullNameOfParentOfPubPathAsLayout(getValue(matchValue));
    } else {
      return null;
    }
  }
}
export function fullNameOfEntityRef(nmF, xref) {
  const matchValue = fullNameOfParentOfEntityRef(xref);

  if (matchValue != null) {
    return op_PlusDotPlus(getValue(matchValue), nmF(xref));
  } else {
    return nmF(xref);
  }
}
export function tagEntityRefName(xref, name) {
  if (xref.IsNamespace) {
    return TaggedTextOps.tagNamespace(name);
  } else if (xref.IsModule) {
    return TaggedTextOps.tagModule(name);
  } else if (xref.IsTypeAbbrev) {
    return TaggedTextOps.tagAlias(name);
  } else if (xref.IsFSharpDelegateTycon) {
    return TaggedTextOps.tagDelegate(name);
  } else if (xref.IsILEnumTycon ? true : xref.IsFSharpEnumTycon) {
    return TaggedTextOps.tagEnum(name);
  } else if (xref.IsStructOrEnumTycon) {
    return TaggedTextOps.tagStruct(name);
  } else if (xref.IsFSharpInterfaceTycon) {
    return TaggedTextOps.tagInterface(name);
  } else if (xref.IsUnionTycon) {
    return TaggedTextOps.tagUnion(name);
  } else if (xref.IsRecordTycon) {
    return TaggedTextOps.tagRecord(name);
  } else {
    return TaggedTextOps.tagClass(name);
  }
}
export function fullDisplayTextOfTyconRef(r) {
  return fullNameOfEntityRef(function (tc) {
    return tc.DisplayNameWithStaticParametersAndUnderscoreTypars;
  }, r);
}
export function fullNameOfEntityRefAsLayout(nmF, xref) {
  const navigableText = wordL(mkNav(xref.DefinitionRange, tagEntityRefName(xref, nmF(xref))));
  const matchValue = fullNameOfParentOfEntityRefAsLayout(xref);

  if (matchValue != null) {
    return op_HatHat(getValue(matchValue), op_HatHat(SepL.dot, navigableText));
  } else {
    return navigableText;
  }
}
export function fullNameOfParentOfValRef(vref) {
  const activePatternResult26869 = _VRefLocal_VRefNonLocal_(vref);

  if (activePatternResult26869.tag === 1) {
    return fullNameOfEntityRef(function (x) {
      return x.DemangledModuleOrNamespaceName;
    }, activePatternResult26869.data.EnclosingEntity);
  } else {
    const matchValue = activePatternResult26869.data.PublicPath;

    if (matchValue != null) {
      const pp = getValue(matchValue).data[0];
      return fullNameOfPubPath(pp);
    } else {
      return null;
    }
  }
}
export function fullNameOfParentOfValRefAsLayout(vref) {
  const activePatternResult26872 = _VRefLocal_VRefNonLocal_(vref);

  if (activePatternResult26872.tag === 1) {
    return fullNameOfEntityRefAsLayout(function (x) {
      return x.DemangledModuleOrNamespaceName;
    }, activePatternResult26872.data.EnclosingEntity);
  } else {
    const matchValue = activePatternResult26872.data.PublicPath;

    if (matchValue != null) {
      const pp = getValue(matchValue).data[0];
      return fullNameOfPubPathAsLayout(pp);
    } else {
      return null;
    }
  }
}
export function fullDisplayTextOfParentOfModRef(r) {
  return fullNameOfParentOfEntityRef(r);
}
export function fullDisplayTextOfModRef(r) {
  return fullNameOfEntityRef(function (x) {
    return x.DemangledModuleOrNamespaceName;
  }, r);
}
export function fullDisplayTextOfTyconRefAsLayout(r) {
  return fullNameOfEntityRefAsLayout(function (tc) {
    return tc.DisplayNameWithStaticParametersAndUnderscoreTypars;
  }, r);
}
export function fullDisplayTextOfExnRef(r) {
  return fullNameOfEntityRef(function (tc) {
    return tc.DisplayNameWithStaticParametersAndUnderscoreTypars;
  }, r);
}
export function fullDisplayTextOfExnRefAsLayout(r) {
  return fullNameOfEntityRefAsLayout(function (tc) {
    return tc.DisplayNameWithStaticParametersAndUnderscoreTypars;
  }, r);
}
export function fullDisplayTextOfUnionCaseRef(ucref) {
  return op_PlusDotPlus(fullDisplayTextOfTyconRef(ucref.TyconRef), ucref.CaseName);
}
export function fullDisplayTextOfRecdFieldRef(rfref) {
  return op_PlusDotPlus(fullDisplayTextOfTyconRef(rfref.TyconRef), rfref.FieldName);
}
export function fullDisplayTextOfValRef(vref) {
  const matchValue = fullNameOfParentOfValRef(vref);

  if (matchValue != null) {
    return op_PlusDotPlus(getValue(matchValue), vref.DisplayName);
  } else {
    return vref.DisplayName;
  }
}
export function fullDisplayTextOfValRefAsLayout(vref) {
  let n;
  const matchValue = vref.MemberInfo;

  if (matchValue != null) {
    const matchValue_1 = getValue(matchValue).MemberFlags.MemberKind;

    switch (matchValue_1.tag) {
      case 4:
      case 5:
        n = TaggedTextOps.tagProperty(vref.DisplayName);
        break;

      case 0:
      case 1:
        n = TaggedTextOps.tagMethod(vref.DisplayName);
        break;

      case 2:
        n = TaggedTextOps.tagMember(vref.DisplayName);
        break;

      default:
        n = TaggedTextOps.tagProperty(vref.DisplayName);
    }
  } else if (vref.IsModuleBinding) {
    n = TaggedTextOps.tagModuleBinding(vref.DisplayName);
  } else {
    n = TaggedTextOps.tagUnknownEntity(vref.DisplayName);
  }

  const matchValue_2 = fullNameOfParentOfValRefAsLayout(vref);

  if (matchValue_2 != null) {
    return op_HatHat(getValue(matchValue_2), op_HatHat(SepL.dot, wordL(n)));
  } else {
    return wordL(n);
  }
}
export function fullMangledPathToTyconRef(tcref) {
  const activePatternResult26887 = _ERefLocal_ERefNonLocal_(tcref);

  if (activePatternResult26887.tag === 1) {
    return activePatternResult26887.data.EnclosingMangledPath;
  } else {
    const matchValue = tcref.PublicPath;

    if (matchValue != null) {
      return getValue(matchValue).EnclosingPath;
    } else {
      return [];
    }
  }
}
export function qualifiedMangledNameOfTyconRef(tcref, nm) {
  return join("-", append(toList(fullMangledPathToTyconRef(tcref)), ofArray([tcref.LogicalName + "-" + nm])));
}
export function firstEq(p1, p2) {
  firstEq: while (true) {
    if (p1.tail != null) {
      if (p2.tail != null) {
        if (equals(p1.head, p2.head)) {
          p1 = p1.tail;
          p2 = p2.tail;
          continue firstEq;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
export function firstRem(p1, p2) {
  firstRem: while (true) {
    if (p1.tail != null) {
      p1 = p1.tail;
      p2 = p2.tail;
      continue firstRem;
    } else {
      return p2;
    }
  }
}
export function trimPathByDisplayEnv(denv, path) {
  const findOpenedNamespace = function (openedPath) {
    if (firstEq(openedPath, path)) {
      const t2 = firstRem(openedPath, path);

      if (!t2.Equals(new List())) {
        return textOfPath(t2) + ".";
      } else {
        return "";
      }
    } else {
      return null;
    }
  };

  const matchValue = tryPick(findOpenedNamespace, denv.openTopPathsSorted.value);

  if (matchValue == null) {
    if (path.tail == null) {
      return "";
    } else {
      return textOfPath(path) + ".";
    }
  } else {
    return getValue(matchValue);
  }
}
export function superOfTycon(g, tycon) {
  const matchValue = tycon.TypeContents.tcaug_super;

  if (matchValue != null) {
    return getValue(matchValue);
  } else {
    return g.obj_ty;
  }
}
export function isILAttribByName(tencl, tname, attr) {
  if (attr.Method.DeclaringType.TypeSpec.Name === tname) {
    return attr.Method.DeclaringType.TypeSpec.Enclosing.Equals(tencl);
  } else {
    return false;
  }
}
export function isILAttrib(tref, attr) {
  return isILAttribByName(tref.Enclosing, tref.Name, attr);
}
export function HasILAttribute(tref, attrs) {
  return attrs.AsArray.some(function (attr) {
    return isILAttrib(tref, attr);
  });
}
export function HasILAttributeByName(tname, attrs) {
  var tencl;
  return attrs.AsArray.some((tencl = new List(), function (attr) {
    return isILAttribByName(tencl, tname, attr);
  }));
}
export function TryDecodeILAttribute(g, tref, attrs) {
  return tryPick(function (x) {
    return isILAttrib(tref, x) ? decodeILAttribData(g.ilg, x) : null;
  }, attrs.AsArray);
}
export function ILThingHasExtensionAttribute(attrs) {
  return attrs.AsArray.some(function (attr) {
    return attr.Method.DeclaringType.TypeSpec.Name === "System.Runtime.CompilerServices.ExtensionAttribute";
  });
}
export function IsMatchingFSharpAttribute(g, _arg2, _arg1) {
  return tyconRefEq(g, _arg2.data[1], _arg1.data[0]);
}
export function HasFSharpAttribute(g, tref, attrs) {
  return exists(function (arg20_) {
    return IsMatchingFSharpAttribute(g, tref, arg20_);
  }, attrs);
}
export function findAttrib(g, tref, attrs) {
  return find_1(function (arg20_) {
    return IsMatchingFSharpAttribute(g, tref, arg20_);
  }, attrs);
}
export function TryFindFSharpAttribute(g, tref, attrs) {
  return tryFind_1(function (arg20_) {
    return IsMatchingFSharpAttribute(g, tref, arg20_);
  }, attrs);
}
export function TryFindFSharpAttributeOpt(g, tref, attrs) {
  if (tref != null) {
    return tryFind_1(function (arg20_) {
      return IsMatchingFSharpAttribute(g, getValue(tref), arg20_);
    }, attrs);
  } else {
    return null;
  }
}
export function HasFSharpAttributeOpt(g, trefOpt, attrs) {
  if (trefOpt != null) {
    return exists(function (arg20_) {
      return IsMatchingFSharpAttribute(g, getValue(trefOpt), arg20_);
    }, attrs);
  } else {
    return false;
  }
}
export function IsMatchingFSharpAttributeOpt(g, attrOpt, _arg1) {
  if (attrOpt != null) {
    const tcref = getValue(attrOpt).data[1];
    return tyconRefEq(g, tcref, _arg1.data[0]);
  } else {
    return false;
  }
}

function _ExtractAttribNamedArg___(nm, args) {
  return tryPick(function (_arg1) {
    var v;
    var nm2;

    if (v = _arg1.data[3], nm2 = _arg1.data[0], nm === nm2) {
      const v_1 = _arg1.data[3];
      const nm2_1 = _arg1.data[0];
      return v_1;
    } else {
      return null;
    }
  }, args);
}

export { _ExtractAttribNamedArg___ as $7C$ExtractAttribNamedArg$7C$_$7C$ };

function _AttribInt32Arg___(_arg1) {
  const $var44 = _arg1.data[1].tag === 0 ? _arg1.data[1].data[0].tag === 5 ? [0, _arg1.data[1].data[0].data] : [1] : [1];

  switch ($var44[0]) {
    case 0:
      return $var44[1];

    case 1:
      return null;
  }
}

export { _AttribInt32Arg___ as $7C$AttribInt32Arg$7C$_$7C$ };

function _AttribInt16Arg___(_arg1) {
  const $var45 = _arg1.data[1].tag === 0 ? _arg1.data[1].data[0].tag === 3 ? [0, _arg1.data[1].data[0].data] : [1] : [1];

  switch ($var45[0]) {
    case 0:
      return $var45[1];

    case 1:
      return null;
  }
}

export { _AttribInt16Arg___ as $7C$AttribInt16Arg$7C$_$7C$ };

function _AttribBoolArg___(_arg1) {
  const $var46 = _arg1.data[1].tag === 0 ? _arg1.data[1].data[0].tag === 0 ? [0, _arg1.data[1].data[0].data] : [1] : [1];

  switch ($var46[0]) {
    case 0:
      return $var46[1];

    case 1:
      return null;
  }
}

export { _AttribBoolArg___ as $7C$AttribBoolArg$7C$_$7C$ };

function _AttribStringArg___(_arg1) {
  const $var47 = _arg1.data[1].tag === 0 ? _arg1.data[1].data[0].tag === 14 ? [0, _arg1.data[1].data[0].data] : [1] : [1];

  switch ($var47[0]) {
    case 0:
      return $var47[1];

    case 1:
      return null;
  }
}

export { _AttribStringArg___ as $7C$AttribStringArg$7C$_$7C$ };
export function TryFindFSharpBoolAttributeWithDefault(dflt, g, nm, attrs) {
  const matchValue = TryFindFSharpAttribute(g, nm, attrs);
  let $var48;

  if (matchValue != null) {
    if (getValue(matchValue).data[2].tail != null) {
      const activePatternResult26944 = _AttribBoolArg___(getValue(matchValue).data[2].head);

      if (activePatternResult26944 != null) {
        if (getValue(matchValue).data[2].tail.tail == null) {
          $var48 = [1, getValue(activePatternResult26944)];
        } else {
          $var48 = [2];
        }
      } else {
        $var48 = [2];
      }
    } else {
      $var48 = [0];
    }
  } else {
    $var48 = [2];
  }

  switch ($var48[0]) {
    case 0:
      return dflt;

    case 1:
      return $var48[1];

    case 2:
      return null;
  }
}
export function TryFindFSharpBoolAttribute(g, nm, attrs) {
  return TryFindFSharpBoolAttributeWithDefault(true, g, nm, attrs);
}
export function TryFindFSharpBoolAttributeAssumeFalse(g, nm, attrs) {
  return TryFindFSharpBoolAttributeWithDefault(false, g, nm, attrs);
}
export function TryFindFSharpInt32Attribute(g, nm, attrs) {
  const matchValue = TryFindFSharpAttribute(g, nm, attrs);
  let $var49;

  if (matchValue != null) {
    if (getValue(matchValue).data[2].tail != null) {
      const activePatternResult26955 = _AttribInt32Arg___(getValue(matchValue).data[2].head);

      if (activePatternResult26955 != null) {
        if (getValue(matchValue).data[2].tail.tail == null) {
          $var49 = [0, getValue(activePatternResult26955)];
        } else {
          $var49 = [1];
        }
      } else {
        $var49 = [1];
      }
    } else {
      $var49 = [1];
    }
  } else {
    $var49 = [1];
  }

  switch ($var49[0]) {
    case 0:
      return $var49[1];

    case 1:
      return null;
  }
}
export function TryFindFSharpStringAttribute(g, nm, attrs) {
  const matchValue = TryFindFSharpAttribute(g, nm, attrs);
  let $var50;

  if (matchValue != null) {
    if (getValue(matchValue).data[2].tail != null) {
      const activePatternResult26959 = _AttribStringArg___(getValue(matchValue).data[2].head);

      if (activePatternResult26959 != null) {
        if (getValue(matchValue).data[2].tail.tail == null) {
          $var50 = [0, getValue(activePatternResult26959)];
        } else {
          $var50 = [1];
        }
      } else {
        $var50 = [1];
      }
    } else {
      $var50 = [1];
    }
  } else {
    $var50 = [1];
  }

  switch ($var50[0]) {
    case 0:
      return $var50[1];

    case 1:
      return null;
  }
}
export function TryFindILAttribute(_arg1, attrs) {
  return HasILAttribute(_arg1.data[0], attrs);
}
export function TryFindILAttributeOpt(attr, attrs) {
  if (attr != null) {
    const atref = getValue(attr).data[0];
    return HasILAttribute(atref, attrs);
  } else {
    return false;
  }
}
export function TryBindTyconRefAttribute(g, m, _arg1, tcref, f1, f2, f3) {
  m;
  f3;
  const matchValue = metadataOfTycon(tcref.Deref);

  if (matchValue.tag === 1) {
    const matchValue_1 = TryFindFSharpAttribute(g, _arg1, tcref.Attribs);

    if (matchValue_1 != null) {
      return f2(getValue(matchValue_1));
    } else {
      return null;
    }
  } else {
    const tdef = matchValue.data.data[2];
    const matchValue_2 = TryDecodeILAttribute(g, _arg1.data[0], tdef.CustomAttrs);

    if (matchValue_2 != null) {
      return f1(getValue(matchValue_2));
    } else {
      return null;
    }
  }
}
export function TryFindTyconRefBoolAttribute(g, m, attribSpec, tcref) {
  return TryBindTyconRefAttribute(g, m, attribSpec, tcref, function (_arg1) {
    const $var51 = _arg1[0].tail != null ? _arg1[0].head.tag === 1 ? _arg1[0].tail.tail == null ? [1, _arg1[0].head.data] : [2] : [2] : [0];

    switch ($var51[0]) {
      case 0:
        return true;

      case 1:
        return $var51[1];

      case 2:
        return null;
    }
  }, function (_arg2) {
    let $var52;

    if (_arg2.data[2].tail != null) {
      const activePatternResult26976 = _AttribBoolArg___(_arg2.data[2].head);

      if (activePatternResult26976 != null) {
        if (_arg2.data[2].tail.tail == null) {
          $var52 = [1, getValue(activePatternResult26976)];
        } else {
          $var52 = [2];
        }
      } else {
        $var52 = [2];
      }
    } else {
      $var52 = [0];
    }

    switch ($var52[0]) {
      case 0:
        return true;

      case 1:
        return $var52[1];

      case 2:
        return null;
    }
  }, function (_arg3) {
    const $var53 = _arg3[0].tail != null ? _arg3[0].head != null ? typeof getValue(_arg3[0].head) === "boolean" ? _arg3[0].tail.tail == null ? [1, getValue(_arg3[0].head)] : [2] : [2] : [2] : [0];

    switch ($var53[0]) {
      case 0:
        return true;

      case 1:
        return $var53[1];

      case 2:
        return null;
    }
  });
}
export function TryFindAttributeUsageAttribute(g, m, tcref) {
  return TryBindTyconRefAttribute(g, m, g.attrib_AttributeUsageAttribute, tcref, function (tupledArg) {
    return tryPick(function (_arg1) {
      const $var54 = _arg1[0] === "AllowMultiple" ? _arg1[3].tag === 1 ? [0] : [1] : [1];

      switch ($var54[0]) {
        case 0:
          const res = _arg1[3].data;
          return res;

        case 1:
          return null;
      }
    }, tupledArg[1]);
  }, function (_arg2) {
    return tryPick(function (_arg2_1) {
      let $var55;

      if (_arg2_1.data[0] === "AllowMultiple") {
        const activePatternResult26985 = _AttribBoolArg___(_arg2_1.data[3]);

        if (activePatternResult26985 != null) {
          $var55 = [0, getValue(activePatternResult26985)];
        } else {
          $var55 = [1];
        }
      } else {
        $var55 = [1];
      }

      switch ($var55[0]) {
        case 0:
          return $var55[1];

        case 1:
          return null;
      }
    }, _arg2.data[3]);
  }, function (tupledArg_1) {
    return tryPick(function (_arg3) {
      const $var56 = _arg3[0] === "AllowMultiple" ? _arg3[1] != null ? typeof getValue(_arg3[1]) === "boolean" ? [0, getValue(_arg3[1])] : [1] : [1] : [1];

      switch ($var56[0]) {
        case 0:
          return $var56[1];

        case 1:
          return null;
      }
    }, tupledArg_1[1]);
  });
}
export function TryFindTyconRefStringAttribute(g, m, attribSpec, tcref) {
  return TryBindTyconRefAttribute(g, m, attribSpec, tcref, function (_arg1) {
    const $var57 = _arg1[0].tail != null ? _arg1[0].head.tag === 0 ? _arg1[0].head.data != null ? _arg1[0].tail.tail == null ? [0, getValue(_arg1[0].head.data)] : [1] : [1] : [1] : [1];

    switch ($var57[0]) {
      case 0:
        return $var57[1];

      case 1:
        return null;
    }
  }, function (_arg2) {
    let $var58;

    if (_arg2.data[2].tail != null) {
      const activePatternResult26994 = _AttribStringArg___(_arg2.data[2].head);

      if (activePatternResult26994 != null) {
        if (_arg2.data[2].tail.tail == null) {
          $var58 = [0, getValue(activePatternResult26994)];
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
        return $var58[1];

      case 1:
        return null;
    }
  }, function (_arg3) {
    const $var59 = _arg3[0].tail != null ? _arg3[0].head != null ? typeof getValue(_arg3[0].head) === "string" ? _arg3[0].tail.tail == null ? [0, getValue(_arg3[0].head)] : [1] : [1] : [1] : [1];

    switch ($var59[0]) {
      case 0:
        return $var59[1];

      case 1:
        return null;
    }
  });
}
export function TyconRefHasAttribute(g, m, attribSpec, tcref) {
  return TryBindTyconRefAttribute(g, m, attribSpec, tcref, function (_arg1) {
    return makeSome();
  }, function (_arg2) {
    return makeSome();
  }, function (_arg3) {
    return makeSome();
  }) != null;
}
export function destByrefTy(g, ty) {
  var x;

  const matchValue = function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty);

  const $var60 = matchValue.tag === 1 ? matchValue.data[1].tail != null ? matchValue.data[1].tail.tail == null ? (x = matchValue.data[1].head, tyconRefEq(g, g.byref_tcr, matchValue.data[0])) ? [0, matchValue.data[0], matchValue.data[1].head] : [1] : [1] : [1] : [1];

  switch ($var60[0]) {
    case 0:
      return $var60[2];

    case 1:
      throw new Error("destByrefTy: not a byref type");
  }
}
export function destNativePtrTy(g, ty) {
  var x;

  const matchValue = function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty);

  const $var61 = matchValue.tag === 1 ? matchValue.data[1].tail != null ? matchValue.data[1].tail.tail == null ? (x = matchValue.data[1].head, tyconRefEq(g, g.nativeptr_tcr, matchValue.data[0])) ? [0, matchValue.data[0], matchValue.data[1].head] : [1] : [1] : [1] : [1];

  switch ($var61[0]) {
    case 0:
      return $var61[2];

    case 1:
      throw new Error("destNativePtrTy: not a native ptr type");
  }
}
export function isRefCellTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return tyconRefEq(g, g.refcell_tcr_canon, getValue(matchValue));
  } else {
    return false;
  }
}
export function destRefCellTy(g, ty) {
  var x;

  const matchValue = function (arg10_) {
    return stripTyEqns(g, arg10_);
  }(ty);

  const $var62 = matchValue.tag === 1 ? matchValue.data[1].tail != null ? matchValue.data[1].tail.tail == null ? (x = matchValue.data[1].head, tyconRefEq(g, g.refcell_tcr_canon, matchValue.data[0])) ? [0, matchValue.data[0], matchValue.data[1].head] : [1] : [1] : [1] : [1];

  switch ($var62[0]) {
    case 0:
      return $var62[2];

    case 1:
      throw new Error("destRefCellTy: not a ref type");
  }
}
export function StripSelfRefCell(g, baseOrThisInfo, tau) {
  if (baseOrThisInfo.Equals(new ValBaseOrThisInfo(0)) ? isRefCellTy(g, tau) : false) {
    return destRefCellTy(g, tau);
  } else {
    return tau;
  }
}
export function mkRefCellTy(g, ty) {
  return new TType(1, [g.refcell_tcr_nice, ofArray([ty])]);
}
export function mkLazyTy(g, ty) {
  return new TType(1, [g.lazy_tcr_nice, ofArray([ty])]);
}
export function mkPrintfFormatTy(g, aty, bty, cty, dty, ety) {
  return new TType(1, [g.format_tcr, ofArray([aty, bty, cty, dty, ety])]);
}
export function mkOptionTy(g, ty) {
  return new TType(1, [g.option_tcr_nice, ofArray([ty])]);
}
export function mkListTy(g, ty) {
  return new TType(1, [g.list_tcr_nice, ofArray([ty])]);
}
export function isOptionTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return tyconRefEq(g, g.option_tcr_canon, getValue(matchValue));
  } else {
    return false;
  }
}
export function tryDestOptionTy(g, ty) {
  const matchValue = argsOfAppTy(g, ty);
  const $var63 = matchValue.tail != null ? matchValue.tail.tail == null ? isOptionTy(g, ty) ? [0, matchValue.head] : [1] : [1] : [1];

  switch ($var63[0]) {
    case 0:
      return $var63[1];

    case 1:
      return null;
  }
}
export function destOptionTy(g, ty) {
  const matchValue = tryDestOptionTy(g, ty);

  if (matchValue == null) {
    throw new Error("destOptionTy: not an option type");
  } else {
    return getValue(matchValue);
  }
}
export function isLinqExpressionTy(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    return tyconRefEq(g, g.system_LinqExpression_tcref, getValue(matchValue));
  } else {
    return false;
  }
}
export function tryDestLinqExpressionTy(g, ty) {
  const matchValue = argsOfAppTy(g, ty);
  const $var64 = matchValue.tail != null ? matchValue.tail.tail == null ? isLinqExpressionTy(g, ty) ? [0, matchValue.head] : [1] : [1] : [1];

  switch ($var64[0]) {
    case 0:
      return $var64[1];

    case 1:
      return null;
  }
}
export function destLinqExpressionTy(g, ty) {
  const matchValue = tryDestLinqExpressionTy(g, ty);

  if (matchValue == null) {
    throw new Error("destLinqExpressionTy: not an expression type");
  } else {
    return getValue(matchValue);
  }
}
export function mkNoneCase(g) {
  return mkUnionCaseRef(g.option_tcr_canon, "None");
}
export function mkSomeCase(g) {
  return mkUnionCaseRef(g.option_tcr_canon, "Some");
}

function ValRef_get_IsDispatchSlot() {
  const matchValue = this.MemberInfo;

  if (matchValue == null) {
    return false;
  } else {
    return getValue(matchValue).MemberFlags.IsDispatchSlot;
  }
}

export { ValRef_get_IsDispatchSlot as ValRef$2E$get_IsDispatchSlot };

function _UnopExpr___(_g, expr) {
  const $var65 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[3].tail != null ? expr.data[3].tail.tail == null ? [0, expr.data[3].head, expr.data[0].data[0]] : [1] : [1] : [1] : [1];

  switch ($var65[0]) {
    case 0:
      return [$var65[2], $var65[1]];

    case 1:
      return null;
  }
}

export { _UnopExpr___ as $7C$UnopExpr$7C$_$7C$ };

function _BinopExpr___(_g, expr) {
  const $var66 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[3].tail != null ? expr.data[3].tail.tail != null ? expr.data[3].tail.tail.tail == null ? [0, expr.data[3].head, expr.data[3].tail.head, expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1];

  switch ($var66[0]) {
    case 0:
      return [$var66[3], $var66[1], $var66[2]];

    case 1:
      return null;
  }
}

export { _BinopExpr___ as $7C$BinopExpr$7C$_$7C$ };

function _SpecificUnopExpr___(g, vrefReqd, expr) {
  var vref;
  var arg1;
  let $var67;

  const activePatternResult27054 = _UnopExpr___(g, expr);

  if (activePatternResult27054 != null) {
    if (vref = getValue(activePatternResult27054)[0], arg1 = getValue(activePatternResult27054)[1], valRefEq(g, vref, vrefReqd)) {
      $var67 = [0, getValue(activePatternResult27054)[1], getValue(activePatternResult27054)[0]];
    } else {
      $var67 = [1];
    }
  } else {
    $var67 = [1];
  }

  switch ($var67[0]) {
    case 0:
      return $var67[1];

    case 1:
      return null;
  }
}

export { _SpecificUnopExpr___ as $7C$SpecificUnopExpr$7C$_$7C$ };

function _SpecificBinopExpr___(g, vrefReqd, expr) {
  var vref;
  var arg2;
  var arg1;
  let $var68;

  const activePatternResult27059 = _BinopExpr___(g, expr);

  if (activePatternResult27059 != null) {
    if (vref = getValue(activePatternResult27059)[0], arg2 = getValue(activePatternResult27059)[2], arg1 = getValue(activePatternResult27059)[1], valRefEq(g, vref, vrefReqd)) {
      $var68 = [0, getValue(activePatternResult27059)[1], getValue(activePatternResult27059)[2], getValue(activePatternResult27059)[0]];
    } else {
      $var68 = [1];
    }
  } else {
    $var68 = [1];
  }

  switch ($var68[0]) {
    case 0:
      return [$var68[1], $var68[2]];

    case 1:
      return null;
  }
}

export { _SpecificBinopExpr___ as $7C$SpecificBinopExpr$7C$_$7C$ };

function _EnumExpr___(g, expr) {
  const matchValue = _SpecificUnopExpr___(g, g.enum_vref, expr);

  if (matchValue == null) {
    return _SpecificUnopExpr___(g, g.enumOfValue_vref, expr);
  } else {
    return matchValue;
  }
}

export { _EnumExpr___ as $7C$EnumExpr$7C$_$7C$ };

function _BitwiseOrExpr___(g, expr) {
  return _SpecificBinopExpr___(g, g.bitwise_or_vref, expr);
}

export { _BitwiseOrExpr___ as $7C$BitwiseOrExpr$7C$_$7C$ };

function _AttribBitwiseOrExpr___(g, expr) {
  var arg2;
  var arg1;

  const activePatternResult27068 = function (expr_1) {
    return _BitwiseOrExpr___(g, expr_1);
  }(expr);

  if (activePatternResult27068 != null) {
    return [getValue(activePatternResult27068)[0], getValue(activePatternResult27068)[1]];
  } else {
    const $var69 = expr.tag === 5 ? expr.data[0].tag === 3 ? expr.data[3].tail != null ? expr.data[3].tail.tail != null ? expr.data[3].tail.tail.tail == null ? (arg2 = expr.data[3].tail.head, arg1 = expr.data[3].head, g.compilingFslib) ? [0, expr.data[3].head, expr.data[3].tail.head] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var69[0]) {
      case 0:
        return [$var69[1], $var69[2]];

      case 1:
        return null;
    }
  }
}

export { _AttribBitwiseOrExpr___ as $7C$AttribBitwiseOrExpr$7C$_$7C$ };
export function isUncheckedDefaultOfValRef(g, vref) {
  if (valRefEq(g, vref, g.unchecked_defaultof_vref)) {
    return true;
  } else if (g.compilingFslib) {
    return vref.LogicalName === "defaultof";
  } else {
    return false;
  }
}
export function isTypeOfValRef(g, vref) {
  if (valRefEq(g, vref, g.typeof_vref)) {
    return true;
  } else if (g.compilingFslib) {
    return vref.LogicalName === "typeof";
  } else {
    return false;
  }
}
export function isSizeOfValRef(g, vref) {
  if (valRefEq(g, vref, g.sizeof_vref)) {
    return true;
  } else if (g.compilingFslib) {
    return vref.LogicalName === "sizeof";
  } else {
    return false;
  }
}
export function isTypeDefOfValRef(g, vref) {
  if (valRefEq(g, vref, g.typedefof_vref)) {
    return true;
  } else if (g.compilingFslib) {
    return vref.LogicalName === "typedefof";
  } else {
    return false;
  }
}

function _UncheckedDefaultOfExpr___(g, expr) {
  var vref;
  var ty;
  const $var70 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? expr.data[3].tail == null ? (vref = expr.data[0].data[0], ty = expr.data[2].head, isUncheckedDefaultOfValRef(g, vref)) ? [0, expr.data[2].head, expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var70[0]) {
    case 0:
      return $var70[1];

    case 1:
      return null;
  }
}

export { _UncheckedDefaultOfExpr___ as $7C$UncheckedDefaultOfExpr$7C$_$7C$ };

function _TypeOfExpr___(g, expr) {
  var vref;
  var ty;
  const $var71 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? expr.data[3].tail == null ? (vref = expr.data[0].data[0], ty = expr.data[2].head, isTypeOfValRef(g, vref)) ? [0, expr.data[2].head, expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var71[0]) {
    case 0:
      return $var71[1];

    case 1:
      return null;
  }
}

export { _TypeOfExpr___ as $7C$TypeOfExpr$7C$_$7C$ };

function _SizeOfExpr___(g, expr) {
  var vref;
  var ty;
  const $var72 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? expr.data[3].tail == null ? (vref = expr.data[0].data[0], ty = expr.data[2].head, isSizeOfValRef(g, vref)) ? [0, expr.data[2].head, expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var72[0]) {
    case 0:
      return $var72[1];

    case 1:
      return null;
  }
}

export { _SizeOfExpr___ as $7C$SizeOfExpr$7C$_$7C$ };

function _TypeDefOfExpr___(g, expr) {
  var vref;
  var ty;
  const $var73 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? expr.data[3].tail == null ? (vref = expr.data[0].data[0], ty = expr.data[2].head, isTypeDefOfValRef(g, vref)) ? [0, expr.data[2].head, expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var73[0]) {
    case 0:
      return $var73[1];

    case 1:
      return null;
  }
}

export { _TypeDefOfExpr___ as $7C$TypeDefOfExpr$7C$_$7C$ };
export const DebugPrint = function (__exports) {
  const layoutRanges = __exports.layoutRanges = {
    contents: false
  };

  const squareAngleL = __exports.squareAngleL = function (x) {
    return op_HatHat(LeftL.leftBracketAngle, op_HatHat(x, RightL.rightBracketAngle));
  };

  const angleL = __exports.angleL = function (x) {
    return op_HatHat(sepL(TaggedTextOps.Literals.leftAngle), op_HatHat(x, rightL(TaggedTextOps.Literals.rightAngle)));
  };

  const braceL = __exports.braceL = function (x) {
    return op_HatHat(leftL(TaggedTextOps.Literals.leftBrace), op_HatHat(x, rightL(TaggedTextOps.Literals.rightBrace)));
  };

  const boolL = __exports.boolL = function (_arg1) {
    if (_arg1) {
      return WordL.keywordTrue;
    } else {
      return WordL.keywordFalse;
    }
  };

  const intL = __exports.intL = function (n) {
    return wordL(TaggedTextOps.tagNumericLiteral(n.toString()));
  };

  const int64L = __exports.int64L = function (n) {
    return wordL(TaggedTextOps.tagNumericLiteral(n.toString()));
  };

  const jlistL = __exports.jlistL = function (xL, xmap) {
    return QueueListModule.foldBack(function (x, z) {
      return op_AtAt(z, xL(x));
    }, xmap, emptyL);
  };

  const bracketIfL = __exports.bracketIfL = function (x, lyt) {
    if (x) {
      return bracketL(lyt);
    } else {
      return lyt;
    }
  };

  const lvalopL = __exports.lvalopL = function (x) {
    if (x.tag === 1) {
      return wordL(TaggedTextOps.tagText("LByrefGet"));
    } else if (x.tag === 2) {
      return wordL(TaggedTextOps.tagText("LSet"));
    } else if (x.tag === 3) {
      return wordL(TaggedTextOps.tagText("LByrefSet"));
    } else {
      return wordL(TaggedTextOps.tagText("LGetAddr"));
    }
  };

  const angleBracketL = __exports.angleBracketL = function (l) {
    return op_HatHat(leftL(TaggedTextOps.tagText("<")), op_HatHat(l, rightL(TaggedTextOps.tagText(">"))));
  };

  const angleBracketListL = __exports.angleBracketListL = function (l) {
    return angleBracketL(sepListL(sepL(TaggedTextOps.tagText(",")), l));
  };

  const layoutMemberFlags = __exports.layoutMemberFlags = function (memFlags) {
    const stat = (memFlags.IsInstance ? true : memFlags.MemberKind.Equals(new MemberKind(1))) ? emptyL : wordL(TaggedTextOps.tagText("static"));
    const stat_1 = memFlags.IsDispatchSlot ? op_PlusPlus(stat, wordL(TaggedTextOps.tagText("abstract"))) : memFlags.IsOverrideOrExplicitImpl ? op_PlusPlus(stat, wordL(TaggedTextOps.tagText("override"))) : stat;
    return stat_1;
  };

  const stampL = __exports.stampL = function (_n, w) {
    return w;
  };

  const layoutTyconRef = __exports.layoutTyconRef = function (tc) {
    return stampL(tc.Stamp, wordL(TaggedTextOps.tagText(tc.DisplayNameWithStaticParameters)));
  };

  const auxTypeL = __exports.auxTypeL = function (env, typ) {
    return auxTypeWrapL(env, false, typ);
  };

  const auxTypeAtomL = __exports.auxTypeAtomL = function (env, typ) {
    return auxTypeWrapL(env, true, typ);
  };

  const auxTyparsL = __exports.auxTyparsL = function (env, tcL, prefix, tinst) {
    if (tinst.tail != null) {
      if (tinst.tail.tail == null) {
        const tL = auxTypeAtomL(env, tinst.head);

        if (prefix) {
          return op_HatHat(tcL, angleBracketL(tL));
        } else {
          return op_HatHat(tL, tcL);
        }
      } else {
        const tinstL = map(function (typ) {
          return auxTypeL(env, typ);
        }, tinst);

        if (prefix) {
          return op_HatHat(tcL, angleBracketListL(tinstL));
        } else {
          return op_HatHat(tupleL(tinstL), tcL);
        }
      }
    } else {
      return tcL;
    }
  };

  const auxTypeWrapL = __exports.auxTypeWrapL = function (env, isAtomic, typ) {
    const wrap = function (x) {
      return bracketIfL(isAtomic, x);
    };

    const matchValue = stripTyparEqns(typ);
    const $var74 = matchValue.tag === 4 ? [1, matchValue.data[0].data[0], matchValue.data[1]] : matchValue.tag === 1 ? [1, matchValue.data[0], matchValue.data[1]] : matchValue.tag === 2 ? [2] : matchValue.tag === 3 ? [3] : matchValue.tag === 5 ? [4] : matchValue.tag === 6 ? [5] : [0];

    switch ($var74[0]) {
      case 0:
        return wrap(op_HatHat(leftL(TaggedTextOps.tagText("!")), op_MinusMinusMinus(layoutTyparDecls(matchValue.data[0]), auxTypeL(env, matchValue.data[1]))));

      case 1:
        const prefix = $var74[1].IsPrefixDisplay;
        const tcL = layoutTyconRef($var74[1]);
        return auxTyparsL(env, tcL, prefix, $var74[2]);

      case 2:
        return wrap(sepListL(wordL(TaggedTextOps.tagText("*")), map(function (typ_1) {
          return auxTypeAtomL(env, typ_1);
        }, matchValue.data[1])));

      case 3:
        return wrap(op_MinusMinusMinus(op_HatHat(auxTypeAtomL(env, matchValue.data[0]), wordL(TaggedTextOps.tagText("->"))), auxTypeL(env, matchValue.data[1])));

      case 4:
        return auxTyparWrapL(env, isAtomic, matchValue.data);

      case 5:
        matchValue.data;
        return wordL(TaggedTextOps.tagText("<measure>"));
    }
  };

  const auxTyparWrapL = __exports.auxTyparWrapL = function (env, isAtomic, typar) {
    const wrap = function (x) {
      return bracketIfL(isAtomic, x);
    };

    const tpL = wordL(TaggedTextOps.tagText(prefixOfStaticReq(typar.StaticReq) + prefixOfRigidTypar(typar) + typar.DisplayName));
    const varL = stampL(typar.Stamp, tpL);
    const matchValue = ZmapModule.tryFind(typar, env.inplaceConstraints);

    if (matchValue != null) {
      if (ZsetModule.contains(typar, env.singletons)) {
        return op_HatHat(leftL(TaggedTextOps.tagText("#")), auxTyparConstraintTypL(env, getValue(matchValue)));
      } else {
        return wrap(op_HatHat(varL, op_HatHat(sepL(TaggedTextOps.tagText(":>")), auxTyparConstraintTypL(env, getValue(matchValue)))));
      }
    } else {
      return varL;
    }
  };

  const auxTypar2L = __exports.auxTypar2L = function (env, typar) {
    return auxTyparWrapL(env, false, typar);
  };

  const auxTyparAtomL = __exports.auxTyparAtomL = function (env, typar) {
    return auxTyparWrapL(env, true, typar);
  };

  const auxTyparConstraintTypL = __exports.auxTyparConstraintTypL = function (env, ty) {
    return auxTypeL(env, ty);
  };

  const auxTraitL = __exports.auxTraitL = function (env, ttrait) {
    [env, ttrait];
    return wordL(TaggedTextOps.tagText("trait"));
  };

  const auxTyparConstraintL = __exports.auxTyparConstraintL = function (env, tp, tpc) {
    const constraintPrefix = function (l) {
      return op_HatHat(auxTypar2L(env, tp), op_HatHat(wordL(TaggedTextOps.tagText(":")), l));
    };

    switch (tpc.tag) {
      case 3:
        return op_HatHat(auxTypar2L(env, tp), op_MinusMinusMinus(wordL(TaggedTextOps.tagText(":")), auxTraitL(env, tpc.data[0])));

      case 1:
        return op_HatHat(wordL(TaggedTextOps.tagText("default")), op_HatHat(auxTypar2L(env, tp), op_HatHat(wordL(TaggedTextOps.tagText(":")), auxTypeL(env, tpc.data[1]))));

      case 8:
        return constraintPrefix(auxTyparsL(env, wordL(TaggedTextOps.tagText("enum")), true, ofArray([tpc.data[0]])));

      case 11:
        return constraintPrefix(auxTyparsL(env, wordL(TaggedTextOps.tagText("delegate")), true, ofArray([tpc.data[0], tpc.data[1]])));

      case 2:
        return constraintPrefix(wordL(TaggedTextOps.tagText("null")));

      case 9:
        return constraintPrefix(wordL(TaggedTextOps.tagText("comparison")));

      case 10:
        return constraintPrefix(wordL(TaggedTextOps.tagText("equality")));

      case 4:
        return constraintPrefix(wordL(TaggedTextOps.tagText("struct")));

      case 5:
        return constraintPrefix(wordL(TaggedTextOps.tagText("not struct")));

      case 12:
        return constraintPrefix(wordL(TaggedTextOps.tagText("unmanaged")));

      case 6:
        return constraintPrefix(bracketL(sepListL(sepL(TaggedTextOps.tagText("|")), map(function (typ) {
          return auxTypeL(env, typ);
        }, tpc.data[0]))));

      case 7:
        return constraintPrefix(bracketL(op_HatHat(wordL(TaggedTextOps.tagText("new : unit -> ")), auxTypar2L(env, tp))));

      default:
        return op_HatHat(auxTypar2L(env, tp), op_MinusMinusMinus(wordL(TaggedTextOps.tagText(":>")), auxTyparConstraintTypL(env, tpc.data[0])));
    }
  };

  const auxTyparConstraintsL = __exports.auxTyparConstraintsL = function (env, x) {
    if (x.tail == null) {
      return emptyL;
    } else {
      return op_MinusMinusMinus(wordL(TaggedTextOps.tagText("when")), aboveListL(map(function (tupledArg) {
        return auxTyparConstraintL(env, tupledArg[0], tupledArg[1]);
      }, x)));
    }
  };

  const typarL = __exports.typarL = function (tp) {
    return auxTypar2L(SimplifyTypes.typeSimplificationInfo0, tp);
  };

  const typarAtomL = __exports.typarAtomL = function (tp) {
    return auxTyparAtomL(SimplifyTypes.typeSimplificationInfo0, tp);
  };

  const typeAtomL = __exports.typeAtomL = function (tau) {
    const patternInput = [tau, new List()];
    const tau_1 = patternInput[0];
    const cxs = patternInput[1];
    const env = SimplifyTypes.CollectInfo(false, ofArray([tau_1]), cxs);

    if (env.postfixConstraints.tail == null) {
      return auxTypeAtomL(env, tau_1);
    } else {
      return bracketL(op_MinusMinusMinus(auxTypeL(env, tau_1), auxTyparConstraintsL(env, env.postfixConstraints)));
    }
  };

  const typeL = __exports.typeL = function (tau) {
    const patternInput = [tau, new List()];
    const tau_1 = patternInput[0];
    const cxs = patternInput[1];
    const env = SimplifyTypes.CollectInfo(false, ofArray([tau_1]), cxs);

    if (env.postfixConstraints.tail == null) {
      return auxTypeL(env, tau_1);
    } else {
      return op_MinusMinusMinus(auxTypeL(env, tau_1), auxTyparConstraintsL(env, env.postfixConstraints));
    }
  };

  const typarDeclL = __exports.typarDeclL = function (tp) {
    const patternInput = [mkTyparTy(tp), map(function (x) {
      return [tp, x];
    }, tp.Constraints)];
    const env = SimplifyTypes.CollectInfo(false, ofArray([patternInput[0]]), patternInput[1]);

    if (env.postfixConstraints.tail == null) {
      return auxTypeL(env, patternInput[0]);
    } else {
      return op_MinusMinusMinus(auxTypeL(env, patternInput[0]), auxTyparConstraintsL(env, env.postfixConstraints));
    }
  };

  const layoutTyparDecls = __exports.layoutTyparDecls = function (tps) {
    return angleBracketListL(map(function (arg00_) {
      return typarDeclL(arg00_);
    }, tps));
  };

  const rangeL = __exports.rangeL = function (m) {
    return wordL(TaggedTextOps.tagText(stringOfRange(m)));
  };

  const instL = __exports.instL = function (tyL, tys) {
    if (tys.tail == null) {
      return emptyL;
    } else {
      return op_HatHat(sepL(TaggedTextOps.tagText("@[")), op_HatHat(commaListL(map(tyL, tys)), rightL(TaggedTextOps.tagText("]"))));
    }
  };

  const valRefL = __exports.valRefL = function (vr) {
    return stampL(vr.Stamp, wordL(TaggedTextOps.tagText(vr.LogicalName)));
  };

  const layoutAttrib = __exports.layoutAttrib = function (_arg1) {
    return op_HatHat(leftL(TaggedTextOps.tagText("[<")), op_HatHat(_arg1.data[1].tag === 1 ? valRefL(_arg1.data[1].data) : wordL(TaggedTextOps.tagText(_arg1.data[1].data.Name)), rightL(TaggedTextOps.tagText(">]"))));
  };

  const layoutAttribs = __exports.layoutAttribs = function (attribs) {
    return aboveListL(map(function (arg00_) {
      return layoutAttrib(arg00_);
    }, attribs));
  };

  const arityInfoL = __exports.arityInfoL = function (_arg1) {
    const ns = _arg1.AritiesOfArgs;
    return op_HatHat(leftL(TaggedTextOps.tagText("arity<")), op_HatHat(intL(_arg1.data[0].length), op_HatHat(sepL(TaggedTextOps.tagText(">[")), op_HatHat(commaListL(map(function (arg00_) {
      return intL(arg00_);
    }, ns)), rightL(TaggedTextOps.tagText("]"))))));
  };

  const valL = __exports.valL = function (vspec) {
    const vsL = stampL(vspec.Stamp, wordL(TaggedTextOps.tagText(DecompileOpName(vspec.LogicalName))));
    const vsL_1 = op_MinusMinus(vsL, layoutAttribs(vspec.Attribs));
    return vsL_1;
  };

  const typeOfValL = __exports.typeOfValL = function (v) {
    return op_MinusMinus(op_HatHat(valL(v), op_HatHat(v.MustInline ? wordL(TaggedTextOps.tagText("inline ")) : emptyL, op_HatHat(v.IsMutable ? wordL(TaggedTextOps.tagText("mutable ")) : emptyL, wordL(TaggedTextOps.tagText(":"))))), typeL(v.Type));
  };

  const tslotparamL = __exports.tslotparamL = function (_arg1) {
    return op_HatHat(optionL($var75 => function (arg00_) {
      return wordL(arg00_);
    }(TaggedTextOps.tagText($var75)), _arg1.data[0]), op_HatHat(wordL(TaggedTextOps.tagText(":")), op_HatHat(typeL(_arg1.data[1]), op_HatHat(_arg1.data[2] ? wordL(TaggedTextOps.tagText("[in]")) : emptyL, op_HatHat(_arg1.data[3] ? wordL(TaggedTextOps.tagText("[out]")) : emptyL, _arg1.data[2] ? wordL(TaggedTextOps.tagText("[opt]")) : emptyL)))));
  };

  const slotSigL = __exports.slotSigL = function (slotsig) {
    slotsig;
    return wordL(TaggedTextOps.tagText("slotsig"));
  };

  const MemberL = __exports.MemberL = function (v, membInfo) {
    return aboveListL(ofArray([op_HatHat(wordL(TaggedTextOps.tagText("compiled_name! = ")), wordL(TaggedTextOps.tagText(v.CompiledName))), op_HatHat(wordL(TaggedTextOps.tagText("membInfo-slotsig! = ")), listL(function (arg00_) {
      return slotSigL(arg00_);
    }, membInfo.ImplementedSlotSigs))]));
  };

  const vspecAtBindL = __exports.vspecAtBindL = function (v) {
    var matchValue;
    var matchValue_1;
    const vL = valL(v);
    const mutL = v.IsMutable ? op_PlusPlus(wordL(TaggedTextOps.tagText("mutable")), vL) : vL;
    return op_MinusMinusMinus(mutL, aboveListL(concat(ofArray([ofArray([op_HatHat(wordL(TaggedTextOps.tagText(":")), typeL(v.Type))]), (matchValue = v.MemberInfo, matchValue != null ? ofArray([op_HatHat(wordL(TaggedTextOps.tagText("!")), MemberL(v, getValue(matchValue)))]) : new List()), (matchValue_1 = v.ValReprInfo, matchValue_1 != null ? ofArray([op_HatHat(wordL(TaggedTextOps.tagText("#")), arityInfoL(getValue(matchValue_1)))]) : new List())]))));
  };

  const unionCaseRefL = __exports.unionCaseRefL = function (ucr) {
    return wordL(TaggedTextOps.tagText(ucr.CaseName));
  };

  const recdFieldRefL = __exports.recdFieldRefL = function (rfref) {
    return wordL(TaggedTextOps.tagText(rfref.FieldName));
  };

  const identL = __exports.identL = function (id) {
    return wordL(TaggedTextOps.tagText(id.idText));
  };

  const constL = __exports.constL = function (c) {
    let str;

    switch (c.tag) {
      case 1:
        str = c.data.toString() + "y";
        break;

      case 2:
        str = c.data.toString() + "uy";
        break;

      case 3:
        str = c.data.toString() + "s";
        break;

      case 4:
        str = c.data.toString() + "us";
        break;

      case 5:
        str = c.data.toString();
        break;

      case 6:
        str = c.data.toString() + "u";
        break;

      case 7:
        str = c.data.toString() + "L";
        break;

      case 8:
        str = c.data.toString() + "UL";
        break;

      case 9:
        str = c.data.toString() + "n";
        break;

      case 10:
        str = c.data.toString() + "un";
        break;

      case 11:
        const s = c.data.toString();
        str = (forAll(function (c_1) {
          return System.Char.IsDigit(c_1) ? true : c_1 === "-";
        }, s) ? s + ".0" : s) + "f";
        break;

      case 12:
        const s_1 = c.data.toString();

        if (forAll(function (c_2) {
          return System.Char.IsDigit(c_2) ? true : c_2 === "-";
        }, s_1)) {
          str = s_1 + ".0";
        } else {
          str = s_1;
        }

        break;

      case 13:
        str = "'" + toString(c.data) + "'";
        break;

      case 14:
        str = "\"" + c.data + "\"";
        break;

      case 16:
        str = "()";
        break;

      case 15:
        str = c.data.toString() + "M";
        break;

      case 17:
        str = "default";
        break;

      default:
        if (c.data) {
          str = "true";
        } else {
          str = "false";
        }

    }

    return wordL(TaggedTextOps.tagText(str));
  };

  const tyconL = __exports.tyconL = function (tycon) {
    var matchValue;

    if (tycon.IsModuleOrNamespace) {
      return entityL(tycon);
    } else {
      const lhsL = op_HatHat(wordL(TaggedTextOps.tagText((matchValue = tycon.TypeOrMeasureKind, matchValue.tag === 0 ? "type" : "[<Measure>] type"))), op_HatHat(wordL(TaggedTextOps.tagText(tycon.DisplayName)), layoutTyparDecls(tycon.TyparsNoRange)));
      const lhsL_1 = op_MinusMinusMinus(lhsL, layoutAttribs(tycon.Attribs));
      let memberLs;
      const adhoc = filter(function (v) {
        return getValue(v.MemberInfo).ImplementedSlotSigs.tail == null;
      }, filter(function (v_1) {
        return !v_1.Deref.IsClassConstructor;
      }, filter(function (v_2) {
        return !v_2.IsDispatchSlot;
      }, tycon.MembersOfFSharpTyconSorted)));
      let iimpls;
      const matchValue_1 = tycon.TypeReprInfo;
      const $var76 = matchValue_1.tag === 0 ? (matchValue_1.data.fsobjmodel_kind.tag === 1 ? true : false) ? [0, matchValue_1.data] : [1] : [1];

      switch ($var76[0]) {
        case 0:
          iimpls = new List();
          break;

        case 1:
          iimpls = tycon.ImmediateInterfacesOfFSharpTycon;
          break;
      }

      const iimpls_1 = filter(function (tupledArg) {
        return !tupledArg[1];
      }, iimpls);

      if (adhoc.tail == null ? iimpls_1.tail == null : false) {
        memberLs = emptyL;
      } else {
        const iimplsLs = map(function (tupledArg_1) {
          return op_MinusMinusMinus(wordL(TaggedTextOps.tagText("interface")), typeL(tupledArg_1[0]));
        }, iimpls_1);
        const adhocLs = map(function (vref) {
          return vspecAtBindL(vref.Deref);
        }, adhoc);
        memberLs = op_AtAt(op_AtAtMinusMinus(wordL(TaggedTextOps.tagText("with")), aboveListL(append(iimplsLs, adhocLs))), wordL(TaggedTextOps.tagText("end")));
      }

      const layoutUnionCaseArgTypes = function (argtys) {
        return sepListL(wordL(TaggedTextOps.tagText("*")), map(function (arg00_) {
          return typeL(arg00_);
        }, argtys));
      };

      const ucaseL = function (prefixL, ucase) {
        const nmL = wordL(TaggedTextOps.tagText(DemangleOperatorName(ucase.Id.idText)));
        const matchValue_2 = map(function (rfld) {
          return rfld.FormalType;
        }, ucase.RecdFields);

        if (matchValue_2.tail == null) {
          return op_HatHat(prefixL, nmL);
        } else {
          return op_MinusMinusMinus(op_HatHat(prefixL, op_HatHat(nmL, wordL(TaggedTextOps.tagText("of")))), layoutUnionCaseArgTypes(matchValue_2));
        }
      };

      const layoutUnionCases = function (ucases) {
        const prefixL_1 = !(() => {
          const $var77 = ucases.tail != null ? ucases.tail.tail == null ? [0] : [1] : [0];

          switch ($var77[0]) {
            case 0:
              return true;

            case 1:
              return false;
          }
        })() ? wordL(TaggedTextOps.tagText("|")) : emptyL;
        return map(CurriedLambda(ucaseL)(prefixL_1), ucases);
      };

      const layoutRecdField = function (fld) {
        const lhs = wordL(TaggedTextOps.tagText(fld.Name));
        const lhs_1 = fld.IsMutable ? op_MinusMinusMinus(wordL(TaggedTextOps.tagText("mutable")), lhs) : lhs;
        return op_MinusMinusMinus(op_HatHat(lhs_1, rightL(TaggedTextOps.tagText(":"))), typeL(fld.FormalType));
      };

      const tyconReprL = function (tupledArg_2) {
        switch (tupledArg_2[0].tag) {
          case 1:
            return aboveListL(map(function (fld_1) {
              return op_HatHat(layoutRecdField(fld_1), rightL(TaggedTextOps.tagText(";")));
            }, tupledArg_2[1].TrueFieldsAsList));

          case 0:
            if (tupledArg_2[0].data.fsobjmodel_kind.tag === 3) {
              return wordL(TaggedTextOps.tagText("delegate ..."));
            } else {
              let start;

              switch (tupledArg_2[0].data.fsobjmodel_kind.tag) {
                case 0:
                  start = "class";
                  break;

                case 1:
                  start = "interface";
                  break;

                case 2:
                  start = "struct";
                  break;

                case 4:
                  start = "enum";
                  break;

                default:
                  throw new Error("???");
              }

              let inherits;
              const matchValue_3 = [tupledArg_2[0].data.fsobjmodel_kind, tupledArg_2[1].TypeContents.tcaug_super];
              const $var78 = matchValue_3[0].tag === 0 ? matchValue_3[1] != null ? [0] : [2] : matchValue_3[0].tag === 1 ? [1] : [2];

              switch ($var78[0]) {
                case 0:
                  const _super = getValue(matchValue_3[1]);

                  inherits = ofArray([op_HatHat(wordL(TaggedTextOps.tagText("inherit")), typeL(_super))]);
                  break;

                case 1:
                  inherits = map(function (tupledArg_3) {
                    return op_HatHat(wordL(TaggedTextOps.tagText("inherit")), typeL(tupledArg_3[0]));
                  }, filter(function (tupledArg_4) {
                    return !tupledArg_4[1];
                  }, tupledArg_2[1].ImmediateInterfacesOfFSharpTycon));
                  break;

                case 2:
                  inherits = new List();
                  break;
              }

              const vsprs = map(function (vref_1) {
                return vspecAtBindL(vref_1.Deref);
              }, filter(function (v_3) {
                return v_3.IsDispatchSlot;
              }, tupledArg_2[1].MembersOfFSharpTyconSorted));
              const vals = map(function (f) {
                return op_HatHat(f.IsStatic ? wordL(TaggedTextOps.tagText("static")) : emptyL, op_HatHat(wordL(TaggedTextOps.tagText("val")), layoutRecdField(f)));
              }, tupledArg_2[1].TrueFieldsAsList);
              const alldecls = append(inherits, append(vsprs, vals));
              let emptyMeasure;
              const matchValue_4 = tupledArg_2[1].TypeOrMeasureKind;

              if (matchValue_4.tag === 1) {
                emptyMeasure = alldecls.tail == null;
              } else {
                emptyMeasure = false;
              }

              if (emptyMeasure) {
                return emptyL;
              } else {
                return op_AtAt(op_AtAtMinusMinus(wordL(TaggedTextOps.tagText(start)), aboveListL(alldecls)), wordL(TaggedTextOps.tagText("end")));
              }
            }

          case 2:
            return aboveListL(layoutUnionCases(tupledArg_2[1].UnionCasesAsList));

          case 4:
            return wordL(TaggedTextOps.tagText("(# ... #)"));

          case 5:
            return typeL(tupledArg_2[0].data);

          case 3:
            const td = tupledArg_2[0].data.data[2];
            return wordL(TaggedTextOps.tagText(td.Name));

          default:
            throw new Error("unreachable");
        }
      };

      let reprL;
      const matchValue_5 = tycon.TypeReprInfo;

      if (matchValue_5.tag === 6) {
        const matchValue_6 = tycon.TypeAbbrev;

        if (matchValue_6 != null) {
          reprL = op_MinusMinusMinus(op_HatHat(lhsL_1, wordL(TaggedTextOps.tagText("="))), op_AtAt(typeL(getValue(matchValue_6)), memberLs));
        } else {
          reprL = op_AtAtMinusMinus(lhsL_1, memberLs);
        }
      } else {
        const rhsL = op_AtAt(tyconReprL([matchValue_5, tycon]), memberLs);
        reprL = op_AtAtMinusMinus(op_HatHat(lhsL_1, wordL(TaggedTextOps.tagText("="))), rhsL);
      }

      return reprL;
    }
  };

  const bindingL = __exports.bindingL = function (_arg1) {
    return op_MinusMinusMinus(vspecAtBindL(_arg1.data[0]), op_HatHat(wordL(TaggedTextOps.tagText("=")), exprL(_arg1.data[1])));
  };

  const exprL = __exports.exprL = function (expr) {
    return exprWrapL(false, expr);
  };

  const atomL = __exports.atomL = function (expr) {
    return exprWrapL(true, expr);
  };

  const letRecL = __exports.letRecL = function (binds, bodyL) {
    const eqnsL = List_1.mapHeadTail(function (bind) {
      return op_HatHat(wordL(TaggedTextOps.tagText("rec")), op_HatHat(bindingL(bind), wordL(TaggedTextOps.tagText("in"))));
    }, function (bind_1) {
      return op_HatHat(wordL(TaggedTextOps.tagText("and")), op_HatHat(bindingL(bind_1), wordL(TaggedTextOps.tagText("in"))));
    }, binds);
    return op_AtAt(aboveListL(eqnsL), bodyL);
  };

  const letL = __exports.letL = function (bind, bodyL) {
    const eqnL = op_HatHat(wordL(TaggedTextOps.tagText("let")), op_HatHat(bindingL(bind), wordL(TaggedTextOps.tagText("in"))));
    return op_AtAt(eqnL, bodyL);
  };

  const exprWrapL = __exports.exprWrapL = function (isAtomic, expr) {
    const wrap = function (lyt) {
      return bracketIfL(isAtomic, lyt);
    };

    let lay_1;
    const $var79 = expr.tag === 1 ? [1, expr.data[1], expr.data[0]] : expr.tag === 2 ? [2, expr.data[2], expr.data[0], expr.data[1]] : expr.tag === 3 ? [3, expr.data[3], expr.data[2], expr.data[4]] : expr.tag === 4 ? [4, expr.data[1], expr.data[2]] : expr.tag === 13 ? [5, expr.data[0], expr.data[1]] : expr.tag === 5 ? [6, expr.data[3], expr.data[0], expr.data[2]] : expr.tag === 6 ? [7, expr.data[0], expr.data[1]] : expr.tag === 7 ? [8, expr.data[0], expr.data[1]] : expr.tag === 14 ? [9, expr.data] : expr.tag === 9 ? [10, expr.data[2], expr.data[3]] : expr.tag === 11 ? expr.data[0].tag === 0 ? [11, expr.data[2], expr.data[0].data] : expr.data[0].tag === 1 ? [12, expr.data[2], expr.data[0].data] : expr.data[0].tag === 2 ? [13, expr.data[2]] : expr.data[0].tag === 10 ? [14, expr.data[0].data[0], expr.data[0].data[1], expr.data[2]] : expr.data[0].tag === 11 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? [16, expr.data[0].data, expr.data[2].head] : expr.data[2].tail.tail.tail == null ? [15, expr.data[0].data, expr.data[2].head, expr.data[2].tail.head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 12 ? expr.data[2].tail == null ? [18, expr.data[0].data] : expr.data[2].tail.tail == null ? [17, expr.data[0].data, expr.data[2].head] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 13 ? expr.data[2].tail == null ? [20, expr.data[0].data] : expr.data[2].tail.tail == null ? [19, expr.data[0].data, expr.data[2].head] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 14 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? [21, expr.data[0].data, expr.data[2].head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 15 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? [22, expr.data[0].data, expr.data[2].head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 16 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? [23, expr.data[0].data[0], expr.data[0].data[1], expr.data[2].head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 18 ? expr.data[2].tail != null ? expr.data[2].tail.tail != null ? expr.data[2].tail.tail.tail == null ? [24, expr.data[0].data[0], expr.data[0].data[1], expr.data[2].head, expr.data[2].tail.head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 21 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? [25, expr.data[0].data[1], expr.data[2].head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 24 ? expr.data[1].tail != null ? expr.data[1].tail.tail != null ? expr.data[1].tail.tail.tail == null ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? [26, expr.data[1].head, expr.data[2].head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 25 ? expr.data[1].tail != null ? expr.data[1].tail.tail == null ? expr.data[2].tail == null ? [27] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 22 ? [28, expr.data[0].data[0], expr.data[2], expr.data[1], expr.data[0].data[1]] : expr.data[0].tag === 30 ? [29, expr.data[2], expr.data[0].data[0], expr.data[0].data[1]] : expr.data[0].tag === 31 ? [30, expr.data[0].data[3], expr.data[0].data[5], expr.data[0].data[1], expr.data[0].data[0], expr.data[0].data[6], expr.data[0].data[10], expr.data[0].data[4], expr.data[0].data[2], expr.data[2], expr.data[0].data[7], expr.data[0].data[9], expr.data[0].data[8], expr.data[1]] : expr.data[0].tag === 3 ? expr.data[1].tail != null ? expr.data[1].tail.tail == null ? [31, expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 6 ? expr.data[1].tail == null ? expr.data[2].tail != null ? expr.data[2].tail.tail != null ? expr.data[2].tail.tail.tail == null ? [32, expr.data[2].head, expr.data[2].tail.head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 7 ? expr.data[1].tail == null ? expr.data[2].tail != null ? expr.data[2].tail.tail != null ? expr.data[2].tail.tail.tail != null ? expr.data[2].tail.tail.tail.tail == null ? [33, expr.data[2].head, expr.data[2].tail.head, expr.data[2].tail.tail.head] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : [44, expr.data[1], expr.data[2]] : expr.data[0].tag === 8 ? expr.data[1].tail != null ? expr.data[1].tail.tail == null ? expr.data[2].tail != null ? expr.data[2].tail.tail != null ? expr.data[2].tail.tail.tail == null ? [34, expr.data[2].head, expr.data[2].tail.head] : [43, expr.data[2], expr.data[1]] : [43, expr.data[2], expr.data[1]] : [43, expr.data[2], expr.data[1]] : [43, expr.data[2], expr.data[1]] : [43, expr.data[2], expr.data[1]] : expr.data[0].tag === 9 ? expr.data[1].tail != null ? expr.data[1].tail.tail == null ? expr.data[2].tail != null ? expr.data[2].tail.tail != null ? expr.data[2].tail.tail.tail == null ? [35, expr.data[2].head, expr.data[2].tail.head] : [42, expr.data[2], expr.data[1]] : [42, expr.data[2], expr.data[1]] : [42, expr.data[2], expr.data[1]] : [42, expr.data[2], expr.data[1]] : [42, expr.data[2], expr.data[1]] : expr.data[0].tag === 4 ? [36] : expr.data[0].tag === 5 ? [37] : expr.data[0].tag === 23 ? [38, expr.data[2], expr.data[1]] : expr.data[0].tag === 29 ? [39, expr.data[2], expr.data[1]] : expr.data[0].tag === 19 ? [40, expr.data[2], expr.data[1]] : expr.data[0].tag === 20 ? [41, expr.data[2], expr.data[1]] : [44, expr.data[1], expr.data[2]] : expr.tag === 12 ? [45, expr.data[0]] : expr.tag === 8 ? [46, expr.data[0], expr.data[2], expr.data[3], expr.data[5], expr.data[4], expr.data[1]] : expr.tag === 10 ? [47, expr.data[0], expr.data[1], expr.data[2]] : [0, expr.data[0]];

    switch ($var79[0]) {
      case 0:
        lay_1 = constL($var79[1]);
        break;

      case 1:
        const xL = valL($var79[2].Deref);
        let xL_1;

        switch ($var79[1].tag) {
          case 3:
            xL_1 = op_HatHat(xL, rightL(TaggedTextOps.tagText("<selfinit>")));
            break;

          case 2:
            xL_1 = op_HatHat(xL, rightL(TaggedTextOps.tagText("<superinit>")));
            break;

          case 4:
            xL_1 = op_HatHat(xL, rightL(TaggedTextOps.tagText("<vdirect>")));
            break;

          case 1:
            xL_1 = xL;
            break;

          default:
            xL_1 = op_HatHat(xL, rightL(TaggedTextOps.tagText("<constrained>")));
        }

        lay_1 = xL_1;
        break;

      case 2:
        const flag = $var79[1].tag === 1 ? "; (*ThenDo*)" : "; (*Seq*)";
        lay_1 = wrap(op_AtAt(op_HatHat(exprL($var79[2]), rightL(TaggedTextOps.tagText(flag))), exprL($var79[3])));
        break;

      case 3:
        const formalsL = spaceListL(map(function (arg00_) {
          return vspecAtBindL(arg00_);
        }, $var79[1]));
        const bindingL_1 = $var79[2] != null ? op_HatHat(wordL(TaggedTextOps.tagText("lam")), op_HatHat(op_MinusMinusMinus(op_HatHat(leftL(TaggedTextOps.tagText("base=")), vspecAtBindL(getValue($var79[2]))), formalsL), rightL(TaggedTextOps.tagText(".")))) : op_HatHat(wordL(TaggedTextOps.tagText("lam")), op_HatHat(formalsL, rightL(TaggedTextOps.tagText("."))));
        lay_1 = wrap(op_PlusPlus(bindingL_1, exprL($var79[3])));
        break;

      case 4:
        lay_1 = wrap(op_PlusPlus(op_HatHat(wordL(TaggedTextOps.tagText("LAM")), op_HatHat(spaceListL(map(function (arg00__1) {
          return typarL(arg00__1);
        }, $var79[1])), rightL(TaggedTextOps.tagText(".")))), exprL($var79[2])));
        break;

      case 5:
        lay_1 = wrap(op_PlusPlus(op_HatHat(wordL(TaggedTextOps.tagText("CHOOSE")), op_HatHat(spaceListL(map(function (arg00__2) {
          return typarL(arg00__2);
        }, $var79[1])), rightL(TaggedTextOps.tagText(".")))), exprL($var79[2])));
        break;

      case 6:
        const flayout = atomL($var79[2]);
        lay_1 = wrap(appL(flayout, $var79[3], $var79[1]));
        break;

      case 7:
        lay_1 = wrap(letRecL($var79[1], exprL($var79[2])));
        break;

      case 8:
        lay_1 = wrap(letL($var79[1], exprL($var79[2])));
        break;

      case 9:
        lay_1 = wrap(op_MinusMinusMinus(wordL(TaggedTextOps.tagText("RecLink")), atomL($var79[1].contents)));
        break;

      case 10:
        lay_1 = op_HatHat(leftL(TaggedTextOps.tagText("[")), op_AtAt(decisionTreeL($var79[1]), op_HatHat(aboveListL(mapIndexed(function (i, arg10_) {
          return targetL(i, arg10_);
        }, toList($var79[2]))), rightL(TaggedTextOps.tagText("]")))));
        break;

      case 11:
        lay_1 = wrap(op_PlusPlus(unionCaseRefL($var79[2]), spaceListL(map(function (expr_1) {
          return atomL(expr_1);
        }, $var79[1]))));
        break;

      case 12:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText($var79[2].LogicalName)), bracketL(commaListL(map(function (expr_2) {
          return atomL(expr_2);
        }, $var79[1]))));
        break;

      case 13:
        lay_1 = tupleL(map(function (arg00__3) {
          return exprL(arg00__3);
        }, $var79[1]));
        break;

      case 14:
        const fields = $var79[2].TrueInstanceFieldsAsList;

        const lay = function (fs, x) {
          return op_MinusMinusMinus(op_HatHat(wordL(TaggedTextOps.tagText(fs.rfield_id.idText)), sepL(TaggedTextOps.tagText("="))), exprL(x));
        };

        const ctorL = $var79[1].tag === 0 ? wordL(TaggedTextOps.tagText("(new)")) : emptyL;
        lay_1 = op_HatHat(leftL(TaggedTextOps.tagText("{")), op_HatHat(semiListL(toList(map2(lay, fields, $var79[3]))), op_HatHat(rightL(TaggedTextOps.tagText("}")), ctorL)));
        break;

      case 15:
        lay_1 = op_HatHat(op_MinusMinusMinus(atomL($var79[2]), wordL(TaggedTextOps.tagText("."))), op_HatHat(recdFieldRefL($var79[1]), op_MinusMinusMinus(wordL(TaggedTextOps.tagText("<-")), exprL($var79[3]))));
        break;

      case 16:
        lay_1 = op_HatHat(recdFieldRefL($var79[1]), op_MinusMinusMinus(wordL(TaggedTextOps.tagText("<-")), exprL($var79[2])));
        break;

      case 17:
        lay_1 = op_HatHat(atomL($var79[2]), op_HatHat(rightL(TaggedTextOps.tagText(".#")), recdFieldRefL($var79[1])));
        break;

      case 18:
        lay_1 = recdFieldRefL($var79[1]);
        break;

      case 19:
        lay_1 = op_HatHat(leftL(TaggedTextOps.tagText("&")), bracketL(op_HatHat(atomL($var79[2]), op_HatHat(rightL(TaggedTextOps.tagText(".!")), recdFieldRefL($var79[1])))));
        break;

      case 20:
        lay_1 = op_HatHat(leftL(TaggedTextOps.tagText("&")), recdFieldRefL($var79[1]));
        break;

      case 21:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText("#" + $var79[1].LogicalName + ".tag")), atomL($var79[2]));
        break;

      case 22:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText("#" + $var79[1].CaseName + ".cast")), atomL($var79[2]));
        break;

      case 23:
        lay_1 = op_MinusMinusMinus(wordL(TaggedTextOps.tagText("#" + $var79[1].CaseName + "." + $var79[2].toString())), atomL($var79[3]));
        break;

      case 24:
        lay_1 = op_MinusMinusMinus(op_HatHat(op_MinusMinusMinus(atomL($var79[3]), rightL(TaggedTextOps.tagText("#" + $var79[1].CaseName + "." + $var79[2].toString()))), wordL(TaggedTextOps.tagText(":="))), exprL($var79[4]));
        break;

      case 25:
        lay_1 = op_MinusMinusMinus(wordL(TaggedTextOps.tagText("#" + $var79[1].toString())), atomL($var79[2]));
        break;

      case 26:
        lay_1 = op_MinusMinusMinus(atomL($var79[2]), op_HatHat(wordL(TaggedTextOps.tagText(":>")), typeL($var79[1])));
        break;

      case 27:
        lay_1 = wordL(TaggedTextOps.tagText("Rethrow!"));
        break;

      case 28:
        const instrs = spaceListL(map($var81 => function (arg00__4) {
          return wordL(arg00__4);
        }(($var80 => TaggedTextOps.tagText(toText(printf("%+A"))($var80)))($var81)), $var79[1]));
        const instrs_1 = op_HatHat(leftL(TaggedTextOps.tagText("(#")), op_HatHat(instrs, rightL(TaggedTextOps.tagText("#)"))));
        lay_1 = wrap(op_HatHat(op_MinusMinusMinus(appL(instrs_1, $var79[3], $var79[2]), wordL(TaggedTextOps.tagText(":"))), spaceListL(map(function (tau) {
          return typeAtomL(tau);
        }, $var79[4]))));
        break;

      case 29:
        lay_1 = wrap(op_HatHat(lvalopL($var79[2]), op_MinusMinusMinus(valRefL($var79[3]), bracketL(commaListL(map(function (expr_3) {
          return atomL(expr_3);
        }, $var79[1]))))));
        break;

      case 30:
        const meth = $var79[10].Name;
        lay_1 = wrap(op_HatHat(wordL(TaggedTextOps.tagText("ILCall")), aboveListL(ofArray([op_HatHat(op_MinusMinusMinus(wordL(TaggedTextOps.tagText("meth  ")), wordL(TaggedTextOps.tagText($var79[10].DeclaringTypeRef.FullName))), op_HatHat(sepL(TaggedTextOps.tagText(".")), wordL(TaggedTextOps.tagText(meth)))), op_MinusMinusMinus(wordL(TaggedTextOps.tagText("tinst ")), listL(function (arg00__5) {
          return typeL(arg00__5);
        }, $var79[12])), op_MinusMinusMinus(wordL(TaggedTextOps.tagText("minst ")), listL(function (arg00__6) {
          return typeL(arg00__6);
        }, $var79[11])), op_MinusMinusMinus(wordL(TaggedTextOps.tagText("tyargs")), listL(function (arg00__7) {
          return typeL(arg00__7);
        }, $var79[13])), op_MinusMinusMinus(wordL(TaggedTextOps.tagText("args  ")), listL(function (arg00__8) {
          return exprL(arg00__8);
        }, $var79[9]))]))));
        break;

      case 31:
        lay_1 = op_HatHat(leftL(TaggedTextOps.tagText("[|")), op_HatHat(commaListL(map(function (arg00__9) {
          return exprL(arg00__9);
        }, $var79[1])), rightL(TaggedTextOps.tagText("|]"))));
        break;

      case 32:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText("while")), op_HatHat(exprL($var79[1]), op_HatHat(wordL(TaggedTextOps.tagText("do")), op_HatHat(exprL($var79[2]), rightL(TaggedTextOps.tagText("}"))))));
        break;

      case 33:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText("for")), op_HatHat(aboveListL(ofArray([op_HatHat(exprL($var79[1]), op_HatHat(wordL(TaggedTextOps.tagText("to")), op_HatHat(exprL($var79[2]), wordL(TaggedTextOps.tagText("do"))))), exprL($var79[3])])), rightL(TaggedTextOps.tagText("done"))));
        break;

      case 34:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText("try")), op_HatHat(exprL($var79[1]), op_HatHat(wordL(TaggedTextOps.tagText("with")), op_HatHat(exprL($var79[2]), rightL(TaggedTextOps.tagText("}"))))));
        break;

      case 35:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText("try")), op_HatHat(exprL($var79[1]), op_HatHat(wordL(TaggedTextOps.tagText("finally")), op_HatHat(exprL($var79[2]), rightL(TaggedTextOps.tagText("}"))))));
        break;

      case 36:
        lay_1 = wordL(TaggedTextOps.tagText("bytes++"));
        break;

      case 37:
        lay_1 = wordL(TaggedTextOps.tagText("uint16++"));
        break;

      case 38:
        lay_1 = wordL(TaggedTextOps.tagText("GetRefLVal..."));
        break;

      case 39:
        lay_1 = wordL(TaggedTextOps.tagText("traitcall..."));
        break;

      case 40:
        lay_1 = wordL(TaggedTextOps.tagText("TOp.ExnFieldGet..."));
        break;

      case 41:
        lay_1 = wordL(TaggedTextOps.tagText("TOp.ExnFieldSet..."));
        break;

      case 42:
        lay_1 = wordL(TaggedTextOps.tagText("TOp.TryFinally..."));
        break;

      case 43:
        lay_1 = wordL(TaggedTextOps.tagText("TOp.TryCatch..."));
        break;

      case 44:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText("Expr.Op ...")), bracketL(commaListL(map(function (expr_4) {
          return atomL(expr_4);
        }, $var79[2]))));
        break;

      case 45:
        lay_1 = op_HatHat(leftL(TaggedTextOps.tagText("<@")), op_HatHat(atomL($var79[1]), rightL(TaggedTextOps.tagText("@>"))));
        break;

      case 46:
        lay_1 = op_HatHat(wordL(TaggedTextOps.tagText("OBJ:")), aboveListL(ofArray([typeL($var79[6]), exprL($var79[3]), optionL(function (arg00__10) {
          return vspecAtBindL(arg00__10);
        }, $var79[2]), aboveListL(map(function (tmeth) {
          return overrideL(tmeth);
        }, $var79[5])), aboveListL(map(function (tupledArg) {
          return iimplL(tupledArg[0], tupledArg[1]);
        }, $var79[4]))])));
        break;

      case 47:
        lay_1 = op_AtAtMinusMinus(op_AtAtMinus(wordL(TaggedTextOps.tagText("opt")), exprL($var79[3])), op_HatHat(wordL(TaggedTextOps.tagText("|")), op_MinusMinusMinus(exprL($var79[2]), wordL(TaggedTextOps.tagText("when...")))));
        break;
    }

    if (layoutRanges.contents) {
      return op_HatHat(leftL(TaggedTextOps.tagText("{")), op_HatHat(op_PlusPlus(op_HatHat(rangeL(Expr_get_Range.bind(expr)()), rightL(TaggedTextOps.tagText(":"))), lay_1), rightL(TaggedTextOps.tagText("}"))));
    } else {
      return lay_1;
    }
  };

  const implFilesL = __exports.implFilesL = function (implFiles) {
    return aboveListL(map(function (arg00_) {
      return implFileL(arg00_);
    }, implFiles));
  };

  const appL = __exports.appL = function (flayout, tys, args) {
    const z = op_HatHat(flayout, instL(function (arg00_) {
      return typeL(arg00_);
    }, tys));
    const z_1 = op_MinusMinusMinus(op_MinusMinusMinus(z, sepL(TaggedTextOps.tagText("`"))), spaceListL(map(function (expr) {
      return atomL(expr);
    }, args)));
    return z_1;
  };

  const implFileL = __exports.implFileL = function (_arg2) {
    return aboveListL(ofArray([op_AtAtMinusMinus(wordL(TaggedTextOps.tagText("top implementation ")), mexprL(_arg2.data[2]))]));
  };

  const mexprL = __exports.mexprL = function (x) {
    return op_AtAtMinus(mdefL(x.data[1]), op_AtAtMinus(wordL(TaggedTextOps.tagText(":")), entityTypeL(x.data[0])));
  };

  const mdefsL = __exports.mdefsL = function (defs) {
    return op_AtAtMinusMinus(wordL(TaggedTextOps.tagText("Module Defs")), aboveListL(map(function (x) {
      return mdefL(x);
    }, defs)));
  };

  const mdefL = __exports.mdefL = function (x) {
    switch (x.tag) {
      case 2:
        return letL(x.data[0], emptyL);

      case 3:
        return exprL(x.data[0]);

      case 1:
        return mdefsL(x.data);

      case 0:
        return mexprL(x.data);

      default:
        return aboveListL(append(map(function (arg00_) {
          return tyconL(arg00_);
        }, x.data[1]), map(function (x_1) {
          return mbindL(x_1);
        }, x.data[2])));
    }
  };

  const mbindL = __exports.mbindL = function (x) {
    if (x.tag === 1) {
      return op_AtAtMinusMinus(op_HatHat(wordL(TaggedTextOps.tagText(x.data[0].IsNamespace ? "namespace" : "module")), stampL(x.data[0].Stamp, wordL(TaggedTextOps.tagText(x.data[0].DemangledModuleOrNamespaceName)))), mdefL(x.data[1]));
    } else {
      return letL(x.data, emptyL);
    }
  };

  const entityTypeL = __exports.entityTypeL = function (mtyp) {
    return aboveListL(ofArray([jlistL(function (arg00_) {
      return typeOfValL(arg00_);
    }, mtyp.AllValsAndMembers), jlistL(function (arg00__1) {
      return tyconL(arg00__1);
    }, mtyp.AllEntities)]));
  };

  const entityL = __exports.entityL = function (ms) {
    const header = op_HatHat(wordL(TaggedTextOps.tagText("module")), op_HatHat(stampL(ms.Stamp, wordL(TaggedTextOps.tagText(ms.DemangledModuleOrNamespaceName))), wordL(TaggedTextOps.tagText(":"))));
    const footer = wordL(TaggedTextOps.tagText("end"));
    const body = entityTypeL(ms.ModuleOrNamespaceType);
    return op_AtAt(op_AtAtMinusMinus(header, body), footer);
  };

  const ccuL = __exports.ccuL = function (ccu) {
    return entityL(ccu.Contents);
  };

  const decisionTreeL = __exports.decisionTreeL = function (x) {
    if (x.tag === 1) {
      return op_HatHat(wordL(TaggedTextOps.tagText("Success")), op_HatHat(leftL(TaggedTextOps.tagText("T")), op_HatHat(intL(x.data[1]), tupleL(map(function (arg00_) {
        return exprL(arg00_);
      }, x.data[0])))));
    } else if (x.tag === 0) {
      return op_AtAtMinusMinus(op_MinusMinusMinus(wordL(TaggedTextOps.tagText("Switch")), exprL(x.data[0])), op_AtAt(aboveListL(map(function (arg00__1) {
        return dcaseL(arg00__1);
      }, x.data[1])), x.data[2] != null ? op_MinusMinusMinus(wordL(TaggedTextOps.tagText("dflt:")), decisionTreeL(getValue(x.data[2]))) : emptyL));
    } else {
      const bind = op_HatHat(wordL(TaggedTextOps.tagText("let")), op_HatHat(bindingL(x.data[0]), wordL(TaggedTextOps.tagText("in"))));
      return op_AtAt(bind, decisionTreeL(x.data[1]));
    }
  };

  const dcaseL = __exports.dcaseL = function (_arg3) {
    return op_MinusMinusMinus(op_HatHat(dtestL(_arg3.data[0]), wordL(TaggedTextOps.tagText("//"))), decisionTreeL(_arg3.data[1]));
  };

  const dtestL = __exports.dtestL = function (x) {
    switch (x.tag) {
      case 1:
        return op_HatHat(wordL(TaggedTextOps.tagText("length")), op_HatHat(intL(x.data[0]), typeL(x.data[1])));

      case 2:
        return op_HatHat(wordL(TaggedTextOps.tagText("is")), constL(x.data));

      case 3:
        return wordL(TaggedTextOps.tagText("isnull"));

      case 4:
        return op_HatHat(wordL(TaggedTextOps.tagText("isinst")), typeL(x.data[1]));

      case 5:
        return op_HatHat(wordL(TaggedTextOps.tagText("query")), exprL(x.data[0]));

      default:
        return op_HatHat(wordL(TaggedTextOps.tagText("is")), op_HatHat(unionCaseRefL(x.data[0]), instL(function (arg00_) {
          return typeL(arg00_);
        }, x.data[1])));
    }
  };

  const targetL = __exports.targetL = function (i, _arg4) {
    return op_HatHat(leftL(TaggedTextOps.tagText("T")), op_HatHat(intL(i), op_HatHat(tupleL(flatValsL(_arg4.data[0])), op_MinusMinusMinus(rightL(TaggedTextOps.tagText(":")), exprL(_arg4.data[1])))));
  };

  const flatValsL = __exports.flatValsL = function (vs) {
    return function (list) {
      return map(function (arg00_) {
        return valL(arg00_);
      }, list);
    }(vs);
  };

  const tmethodL = __exports.tmethodL = function (_arg5) {
    const nm = _arg5.data[0].data[0];
    return op_MinusMinusMinus(op_MinusMinusMinus(op_MinusMinus(op_HatHat(op_MinusMinusMinus(wordL(TaggedTextOps.tagText("TObjExprMethod")), wordL(TaggedTextOps.tagText(nm))), wordL(TaggedTextOps.tagText("="))), op_HatHat(op_MinusMinusMinus(wordL(TaggedTextOps.tagText("METH-LAM")), angleBracketListL(map(function (arg00_) {
      return typarL(arg00_);
    }, _arg5.data[2]))), rightL(TaggedTextOps.tagText(".")))), op_HatHat(op_MinusMinusMinus(wordL(TaggedTextOps.tagText("meth-lam")), tupleL(map($var82 => function (arg00__2) {
      return tupleL(arg00__2);
    }(function (list) {
      return map(function (arg00__1) {
        return vspecAtBindL(arg00__1);
      }, list);
    }($var82)), _arg5.data[3]))), rightL(TaggedTextOps.tagText(".")))), atomL(_arg5.data[4]));
  };

  const overrideL = __exports.overrideL = function (tmeth) {
    return op_HatHat(wordL(TaggedTextOps.tagText("with")), tmethodL(tmeth));
  };

  const iimplL = __exports.iimplL = function (typ, tmeths) {
    return op_HatHat(wordL(TaggedTextOps.tagText("impl")), aboveListL(new List(typeL(typ), map(function (arg00_) {
      return tmethodL(arg00_);
    }, tmeths))));
  };

  const showType = __exports.showType = function (x) {
    return showL(typeL(x));
  };

  const showExpr = __exports.showExpr = function (x) {
    return showL(exprL(x));
  };

  const traitL = __exports.traitL = function (x) {
    return auxTraitL(SimplifyTypes.typeSimplificationInfo0, x);
  };

  const typarsL = __exports.typarsL = function (x) {
    return layoutTyparDecls(x);
  };

  return __exports;
}({});
export function wrapModuleOrNamespaceType(id, cpath, mtyp) {
  return NewModuleOrNamespace(cpath, taccessPublic, id, XmlDoc.Empty, new List(), new MaybeLazy(0, mtyp));
}
export function wrapModuleOrNamespaceTypeInNamespace(id, cpath, mtyp) {
  const mspec = wrapModuleOrNamespaceType(id, cpath, mtyp);
  return [NewModuleOrNamespaceType(new ModuleOrNamespaceKind(2), ofArray([mspec]), new List()), mspec];
}
export function wrapModuleOrNamespaceExprInNamespace(id, cpath, mexpr) {
  const mspec = wrapModuleOrNamespaceType(id, cpath, NewEmptyModuleOrNamespaceType(new ModuleOrNamespaceKind(2)));
  return new ModuleOrNamespaceExpr(4, [false, new List(), ofArray([new ModuleOrNamespaceBinding(1, [mspec, mexpr])]), id.idRange]);
}
export function SigTypeOfImplFile(_arg1) {
  return _arg1.data[2].Type;
}
export class SignatureRepackageInfo {
  constructor(mrpiVals, mrpiEntities) {
    this.mrpiVals = mrpiVals;
    this.mrpiEntities = mrpiEntities;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.SignatureRepackageInfo",
      interfaces: ["FSharpRecord"],
      properties: {
        mrpiVals: makeGeneric(List, {
          T: Tuple([ValRef, ValRef])
        }),
        mrpiEntities: makeGeneric(List, {
          T: Tuple([EntityRef, EntityRef])
        })
      }
    };
  }

  get ImplToSigMapping() {
    const inputRecord = TypeEquivEnv.Empty;
    const EquivTycons = TyconRefMap.OfList(this.mrpiEntities);
    return new TypeEquivEnv(inputRecord.EquivTypars, EquivTycons);
  }

  static get Empty() {
    return new SignatureRepackageInfo(new List(), new List());
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.SignatureRepackageInfo", SignatureRepackageInfo);
export class SignatureHidingInfo {
  constructor(mhiTycons, mhiTyconReprs, mhiVals, mhiRecdFields, mhiUnionCases) {
    this.mhiTycons = mhiTycons;
    this.mhiTyconReprs = mhiTyconReprs;
    this.mhiVals = mhiVals;
    this.mhiRecdFields = mhiRecdFields;
    this.mhiUnionCases = mhiUnionCases;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.SignatureHidingInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        mhiTycons: makeGeneric(_Set, {
          T: Entity,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        mhiTyconReprs: makeGeneric(_Set, {
          T: Entity,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        mhiVals: makeGeneric(_Set, {
          T: Val,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        mhiRecdFields: makeGeneric(_Set, {
          T: RecdFieldRef,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        }),
        mhiUnionCases: makeGeneric(_Set, {
          T: UnionCaseRef,
          ComparerTag: Interface("System.Collections.Generic.IComparer")
        })
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static get Empty() {
    return new SignatureHidingInfo(ZsetModule.empty(tyconOrder), ZsetModule.empty(tyconOrder), ZsetModule.empty(valOrder), ZsetModule.empty(recdFieldRefOrder), ZsetModule.empty(unionCaseRefOrder));
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.SignatureHidingInfo", SignatureHidingInfo);
export function addValRemap(v, v_, tmenv) {
  const valRemap = function (arg00, arg10) {
    return tmenv.valRemap.Add(arg00, arg10);
  }(v, mkLocalValRef(v_));

  return new Remap(tmenv.tpinst, valRemap, tmenv.tyconRefRemap, tmenv.removeTraitSolutions);
}
export function mkRepackageRemapping(mrpi) {
  const valRemap = ValMap.OfList(map(function (tupledArg) {
    return [tupledArg[0].Deref, tupledArg[1]];
  }, mrpi.mrpiVals));
  return new Remap(emptyTyparInst, valRemap, TyconRefMap.OfList(mrpi.mrpiEntities), false);
}
export function accEntityRemap(msigty, entity, mrpi, mhi) {
  var matchValue;
  var matchValue_1;
  const sigtyconOpt = NameMapModule.tryFind(entity.LogicalName, msigty.AllEntitiesByCompiledAndLogicalMangledNames);

  if (sigtyconOpt != null) {
    const sigtcref = mkLocalTyconRef(getValue(sigtyconOpt));
    const tcref = mkLocalTyconRef(entity);
    let mrpi_1;
    const mrpiEntities = new List([tcref, sigtcref], mrpi.mrpiEntities);
    mrpi_1 = new SignatureRepackageInfo(mrpi.mrpiVals, mrpiEntities);
    let mhi_3;

    if ((matchValue = entity.TypeReprInfo, matchValue.tag === 6 ? false : true) ? (matchValue_1 = getValue(sigtyconOpt).TypeReprInfo, matchValue_1.tag === 6 ? true : false) : false) {
      const mhiTyconReprs = ZsetModule.add(entity, mhi.mhiTyconReprs);
      mhi_3 = new SignatureHidingInfo(mhi.mhiTycons, mhiTyconReprs, mhi.mhiVals, mhi.mhiRecdFields, mhi.mhiUnionCases);
    } else {
      mhi_3 = foldBack(function (ucase, mhi_1) {
        const matchValue_2 = getValue(sigtyconOpt).GetUnionCaseByName(ucase.DisplayName);

        if (matchValue_2 != null) {
          return mhi_1;
        } else {
          const ucref = tcref.MakeNestedUnionCaseRef(ucase);
          const mhiUnionCases = ZsetModule.add(ucref, mhi_1.mhiUnionCases);
          return new SignatureHidingInfo(mhi_1.mhiTycons, mhi_1.mhiTyconReprs, mhi_1.mhiVals, mhi_1.mhiRecdFields, mhiUnionCases);
        }
      }, entity.UnionCasesAsList, foldBack(function (rfield, mhi_2) {
        const matchValue_3 = getValue(sigtyconOpt).GetFieldByName(rfield.Name);

        if (matchValue_3 != null) {
          return mhi_2;
        } else {
          const rfref = tcref.MakeNestedRecdFieldRef(rfield);
          const mhiRecdFields = ZsetModule.add(rfref, mhi_2.mhiRecdFields);
          return new SignatureHidingInfo(mhi_2.mhiTycons, mhi_2.mhiTyconReprs, mhi_2.mhiVals, mhiRecdFields, mhi_2.mhiUnionCases);
        }
      }, entity.AllFieldsArray, mhi));
    }

    return [mrpi_1, mhi_3];
  } else {
    const mhi_4 = new SignatureHidingInfo(ZsetModule.add(entity, mhi.mhiTycons), mhi.mhiTyconReprs, mhi.mhiVals, mhi.mhiRecdFields, mhi.mhiUnionCases);
    return [mrpi, mhi_4];
  }
}
export function accSubEntityRemap(msigty, entity, mrpi, mhi) {
  const sigtyconOpt = NameMapModule.tryFind(entity.LogicalName, msigty.AllEntitiesByCompiledAndLogicalMangledNames);

  if (sigtyconOpt != null) {
    const sigtcref = mkLocalTyconRef(getValue(sigtyconOpt));
    const tcref = mkLocalTyconRef(entity);
    let mrpi_1;
    const mrpiEntities = new List([tcref, sigtcref], mrpi.mrpiEntities);
    mrpi_1 = new SignatureRepackageInfo(mrpi.mrpiVals, mrpiEntities);
    return [mrpi_1, mhi];
  } else {
    const mhi_1 = new SignatureHidingInfo(ZsetModule.add(entity, mhi.mhiTycons), mhi.mhiTyconReprs, mhi.mhiVals, mhi.mhiRecdFields, mhi.mhiUnionCases);
    return [mrpi, mhi_1];
  }
}
export function valLinkageAEquiv(g, aenv, v1, v2) {
  if (v1.LinkagePartialKey.Equals(v2.LinkagePartialKey)) {
    if (v1.IsMember ? v2.IsMember : false) {
      return typeAEquivAux(new Erasure(0), g, aenv, v1.Type, v2.Type);
    } else {
      return true;
    }
  } else {
    return false;
  }
}
export function accValRemap(g, aenv, msigty, implVal, mrpi, mhi) {
  const sigValOpt = tryFind_1(function (sigVal) {
    return valLinkageAEquiv(g, aenv, implVal, sigVal);
  }, MultiMapModule.find(implVal.LinkagePartialKey, msigty.AllValsAndMembersByPartialLinkageKey));
  const vref = mkLocalValRef(implVal);

  if (sigValOpt != null) {
    const mrpi_1 = new SignatureRepackageInfo(new List([vref, mkLocalValRef(getValue(sigValOpt))], mrpi.mrpiVals), mrpi.mrpiEntities);
    return [mrpi_1, mhi];
  } else {
    if (verbose) {
      dprintf(printf("accValRemap, hide = %s#%d\n"))(implVal.LogicalName, implVal.Stamp);
    }

    let mhi_1;
    const mhiVals = ZsetModule.add(implVal, mhi.mhiVals);
    mhi_1 = new SignatureHidingInfo(mhi.mhiTycons, mhi.mhiTyconReprs, mhiVals, mhi.mhiRecdFields, mhi.mhiUnionCases);
    return [mrpi, mhi_1];
  }
}
export function getCorrespondingSigTy(nm, msigty) {
  const matchValue = NameMapModule.tryFind(nm, msigty.AllEntitiesByCompiledAndLogicalMangledNames);

  if (matchValue != null) {
    return getValue(matchValue).ModuleOrNamespaceType;
  } else {
    return NewEmptyModuleOrNamespaceType(new ModuleOrNamespaceKind(1));
  }
}
export function accEntityRemapFromModuleOrNamespaceType(mty, msigty, acc_0, acc_1) {
  const acc = [acc_0, acc_1];
  const acc_3 = QueueListModule.foldBack(function (e, acc_2) {
    const mty_1 = e.ModuleOrNamespaceType;
    const msigty_1 = getCorrespondingSigTy(e.LogicalName, msigty);
    return accEntityRemapFromModuleOrNamespaceType(mty_1, msigty_1, acc_2[0], acc_2[1]);
  }, mty.AllEntities, acc);
  const acc_4 = QueueListModule.foldBack(function (entity, tupledArg) {
    return accEntityRemap(msigty, entity, tupledArg[0], tupledArg[1]);
  }, mty.AllEntities, acc_3);
  return acc_4;
}
export function accValRemapFromModuleOrNamespaceType(g, aenv, mty, msigty, acc_0, acc_1) {
  const acc = [acc_0, acc_1];
  const acc_3 = QueueListModule.foldBack(function (e, acc_2) {
    const mty_1 = e.ModuleOrNamespaceType;
    const msigty_1 = getCorrespondingSigTy(e.LogicalName, msigty);
    return accValRemapFromModuleOrNamespaceType(g, aenv, mty_1, msigty_1, acc_2[0], acc_2[1]);
  }, mty.AllEntities, acc);
  const acc_4 = QueueListModule.foldBack(function (implVal, tupledArg) {
    return accValRemap(g, aenv, msigty, implVal, tupledArg[0], tupledArg[1]);
  }, mty.AllValsAndMembers, acc_3);
  return acc_4;
}
export function ComputeRemappingFromInferredSignatureToExplicitSignature(g, mty, msigty) {
  const entityRemap = accEntityRemapFromModuleOrNamespaceType(mty, msigty, SignatureRepackageInfo.Empty, SignatureHidingInfo.Empty);
  const aenv = entityRemap[0].ImplToSigMapping;
  const valAndEntityRemap = accValRemapFromModuleOrNamespaceType(g, aenv, mty, msigty, entityRemap[0], entityRemap[1]);
  return valAndEntityRemap;
}
export function abstractSlotValsOfTycons(tycons) {
  return map(function (v) {
    return v.Deref;
  }, collect(function (tycon) {
    return tycon.IsFSharpObjectModelTycon ? tycon.FSharpObjectModelTypeInfo.fsobjmodel_vslots : new List();
  }, tycons));
}
export function accEntityRemapFromModuleOrNamespace(msigty, x, acc_0, acc_1) {
  const acc = [acc_0, acc_1];

  switch (x.tag) {
    case 2:
      return acc;

    case 3:
      return acc;

    case 1:
      return accEntityRemapFromModuleOrNamespaceDefs(msigty, x.data, acc[0], acc[1]);

    case 0:
      const mty = x.data.Type;
      return accEntityRemapFromModuleOrNamespaceType(mty, msigty, acc[0], acc[1]);

    default:
      const acc_2 = foldBack(function (x_1, tupledArg) {
        return accEntityRemapFromModuleOrNamespaceBind(msigty, x_1, tupledArg[0], tupledArg[1]);
      }, x.data[2], acc);
      const acc_3 = foldBack(function (entity, tupledArg_1) {
        return accEntityRemap(msigty, entity, tupledArg_1[0], tupledArg_1[1]);
      }, x.data[1], acc_2);
      const acc_5 = foldBack(function (e, acc_4) {
        const mty_1 = e.ModuleOrNamespaceType;
        const msigty_1 = getCorrespondingSigTy(e.LogicalName, msigty);
        return accEntityRemapFromModuleOrNamespaceType(mty_1, msigty_1, acc_4[0], acc_4[1]);
      }, x.data[1], acc_3);
      return acc_5;
  }
}
export function accEntityRemapFromModuleOrNamespaceDefs(msigty, mdefs, acc_0, acc_1) {
  const acc = [acc_0, acc_1];
  return foldBack(function (x, tupledArg) {
    return accEntityRemapFromModuleOrNamespace(msigty, x, tupledArg[0], tupledArg[1]);
  }, mdefs, acc);
}
export function accEntityRemapFromModuleOrNamespaceBind(msigty, x, acc_0, acc_1) {
  const acc = [acc_0, acc_1];

  if (x.tag === 1) {
    let tupledArg;
    const msigty_1 = getCorrespondingSigTy(x.data[0].LogicalName, msigty);
    tupledArg = accEntityRemapFromModuleOrNamespace(msigty_1, x.data[1], acc[0], acc[1]);
    return accSubEntityRemap(msigty, x.data[0], tupledArg[0], tupledArg[1]);
  } else {
    return acc;
  }
}
export function accValRemapFromModuleOrNamespace(g, aenv, msigty, x, acc_0, acc_1) {
  const acc = [acc_0, acc_1];

  switch (x.tag) {
    case 2:
      const implVal = x.data[0].Var;
      return accValRemap(g, aenv, msigty, implVal, acc[0], acc[1]);

    case 3:
      return acc;

    case 1:
      return accValRemapFromModuleOrNamespaceDefs(g, aenv, msigty, x.data, acc[0], acc[1]);

    case 0:
      const mty = x.data.Type;
      return accValRemapFromModuleOrNamespaceType(g, aenv, mty, msigty, acc[0], acc[1]);

    default:
      const acc_2 = foldBack(function (x_1, tupledArg) {
        return accValRemapFromModuleOrNamespaceBind(g, aenv, msigty, x_1, tupledArg[0], tupledArg[1]);
      }, x.data[2], acc);
      const vslotvs = abstractSlotValsOfTycons(x.data[1]);
      const acc_3 = foldBack(function (implVal_1, tupledArg_1) {
        return accValRemap(g, aenv, msigty, implVal_1, tupledArg_1[0], tupledArg_1[1]);
      }, vslotvs, acc_2);
      return acc_3;
  }
}
export function accValRemapFromModuleOrNamespaceBind(g, aenv, msigty, x, acc_0, acc_1) {
  const acc = [acc_0, acc_1];

  if (x.tag === 1) {
    let tupledArg;
    const msigty_1 = getCorrespondingSigTy(x.data[0].LogicalName, msigty);
    tupledArg = accValRemapFromModuleOrNamespace(g, aenv, msigty_1, x.data[1], acc[0], acc[1]);
    return accSubEntityRemap(msigty, x.data[0], tupledArg[0], tupledArg[1]);
  } else {
    const implVal = x.data.Var;
    return accValRemap(g, aenv, msigty, implVal, acc[0], acc[1]);
  }
}
export function accValRemapFromModuleOrNamespaceDefs(g, aenv, msigty, mdefs, acc_0, acc_1) {
  const acc = [acc_0, acc_1];
  return foldBack(function (x, tupledArg) {
    return accValRemapFromModuleOrNamespace(g, aenv, msigty, x, tupledArg[0], tupledArg[1]);
  }, mdefs, acc);
}
export function ComputeRemappingFromImplementationToSignature(g, mdef, msigty) {
  const entityRemap = accEntityRemapFromModuleOrNamespace(msigty, mdef, SignatureRepackageInfo.Empty, SignatureHidingInfo.Empty);
  const aenv = entityRemap[0].ImplToSigMapping;
  const valAndEntityRemap = accValRemapFromModuleOrNamespace(g, aenv, msigty, mdef, entityRemap[0], entityRemap[1]);
  return valAndEntityRemap;
}
export function accTyconHidingInfoAtAssemblyBoundary(tycon, mhi) {
  if (!canAccessFromEverywhere(tycon.Accessibility)) {
    return new SignatureHidingInfo(ZsetModule.add(tycon, mhi.mhiTycons), mhi.mhiTyconReprs, mhi.mhiVals, mhi.mhiRecdFields, mhi.mhiUnionCases);
  } else if (!canAccessFromEverywhere(tycon.TypeReprAccessibility)) {
    const mhiTyconReprs = ZsetModule.add(tycon, mhi.mhiTyconReprs);
    return new SignatureHidingInfo(mhi.mhiTycons, mhiTyconReprs, mhi.mhiVals, mhi.mhiRecdFields, mhi.mhiUnionCases);
  } else {
    return foldBack(function (ucase, mhi_1) {
      if (!canAccessFromEverywhere(ucase.Accessibility)) {
        const tcref = mkLocalTyconRef(tycon);
        const ucref = tcref.MakeNestedUnionCaseRef(ucase);
        const mhiUnionCases = ZsetModule.add(ucref, mhi_1.mhiUnionCases);
        return new SignatureHidingInfo(mhi_1.mhiTycons, mhi_1.mhiTyconReprs, mhi_1.mhiVals, mhi_1.mhiRecdFields, mhiUnionCases);
      } else {
        return mhi_1;
      }
    }, tycon.UnionCasesAsList, foldBack(function (rfield, mhi_2) {
      if (!canAccessFromEverywhere(rfield.Accessibility)) {
        const tcref_1 = mkLocalTyconRef(tycon);
        const rfref = tcref_1.MakeNestedRecdFieldRef(rfield);
        const mhiRecdFields = ZsetModule.add(rfref, mhi_2.mhiRecdFields);
        return new SignatureHidingInfo(mhi_2.mhiTycons, mhi_2.mhiTyconReprs, mhi_2.mhiVals, mhiRecdFields, mhi_2.mhiUnionCases);
      } else {
        return mhi_2;
      }
    }, tycon.AllFieldsArray, mhi));
  }
}
export function accValHidingInfoAtAssemblyBoundary(vspec, mhi) {
  if ((!canAccessFromEverywhere(vspec.Accessibility) ? true : vspec.IsIncrClassGeneratedMember) ? true : !vspec.IsMemberOrModuleBinding) {
    const mhiVals = ZsetModule.add(vspec, mhi.mhiVals);
    return new SignatureHidingInfo(mhi.mhiTycons, mhi.mhiTyconReprs, mhiVals, mhi.mhiRecdFields, mhi.mhiUnionCases);
  } else {
    return mhi;
  }
}
export function accModuleOrNamespaceHidingInfoAtAssemblyBoundary(mty, acc) {
  const acc_2 = QueueListModule.foldBack(function (e, acc_1) {
    return accModuleOrNamespaceHidingInfoAtAssemblyBoundary(e.ModuleOrNamespaceType, acc_1);
  }, mty.AllEntities, acc);
  const acc_3 = QueueListModule.foldBack(function (tycon, mhi) {
    return accTyconHidingInfoAtAssemblyBoundary(tycon, mhi);
  }, mty.AllEntities, acc_2);
  const acc_4 = QueueListModule.foldBack(function (vspec, mhi_1) {
    return accValHidingInfoAtAssemblyBoundary(vspec, mhi_1);
  }, mty.AllValsAndMembers, acc_3);
  return acc_4;
}
export function ComputeHidingInfoAtAssemblyBoundary(mty, acc) {
  return accModuleOrNamespaceHidingInfoAtAssemblyBoundary(mty, acc);
}
export function IsHidden(setF, accessF, remapF, debugF) {
  var check;
  return CurriedLambda((check = function (mrmi, x) {
    if (verbose) {
      dprintf(printf("IsHidden %s ??\n"))(showL(debugF(x)));
    }

    if (!canAccessFromEverywhere(accessF(x))) {
      return true;
    } else if (mrmi.tail != null) {
      const rpi = mrmi.head[0];
      const mhi = mrmi.head[1];

      if (ZsetModule.contains(x, setF(mhi))) {
        return true;
      } else {
        return check(mrmi.tail, remapF(rpi, x));
      }
    } else {
      return false;
    }
  }, function (mrmi_1, x_1) {
    const res = check(mrmi_1, x_1);

    if (verbose) {
      dprintf(printf("IsHidden, #mrmi = %d, %s = %b\n"))(mrmi_1.length, showL(debugF(x_1)), res);
    }

    return res;
  }));
}
export function IsHiddenTycon(mrmi, x) {
  return IsHidden(function (mhi) {
    return mhi.mhiTycons;
  }, function (tc) {
    return tc.Accessibility;
  }, function (rpi, x_1) {
    return remapTyconRef(rpi.tyconRefRemap, mkLocalTyconRef(x_1)).Deref;
  }, function (arg00_) {
    return DebugPrint.tyconL(arg00_);
  })(mrmi, x);
}
export function IsHiddenTyconRepr(mrmi, x) {
  return IsHidden(function (mhi) {
    return mhi.mhiTyconReprs;
  }, function (v) {
    return v.TypeReprAccessibility;
  }, function (rpi, x_1) {
    return remapTyconRef(rpi.tyconRefRemap, mkLocalTyconRef(x_1)).Deref;
  }, function (arg00_) {
    return DebugPrint.tyconL(arg00_);
  })(mrmi, x);
}
export function IsHiddenVal(mrmi, x) {
  return IsHidden(function (mhi) {
    return mhi.mhiVals;
  }, function (v) {
    return v.Accessibility;
  }, function (rpi, x_1) {
    return remapValRef(rpi, mkLocalValRef(x_1)).Deref;
  }, function (arg00_) {
    return DebugPrint.valL(arg00_);
  })(mrmi, x);
}
export function IsHiddenRecdField(mrmi, x) {
  return IsHidden(function (mhi) {
    return mhi.mhiRecdFields;
  }, function (rfref) {
    return rfref.RecdField.Accessibility;
  }, function (rpi, x_1) {
    return remapRecdFieldRef(rpi.tyconRefRemap, x_1);
  }, function (arg00_) {
    return DebugPrint.recdFieldRefL(arg00_);
  })(mrmi, x);
}
export function foldModuleOrNamespaceTy(ft, fv, mty, acc) {
  const go = function (mty_1, acc_1) {
    const acc_3 = QueueListModule.foldBack(function (e, acc_2) {
      return go(e.ModuleOrNamespaceType, acc_2);
    }, mty_1.AllEntities, acc_1);
    const acc_4 = QueueListModule.foldBack(ft, mty_1.AllEntities, acc_3);
    const acc_5 = QueueListModule.foldBack(fv, mty_1.AllValsAndMembers, acc_4);
    return acc_5;
  };

  return go(mty, acc);
}
export function allValsOfModuleOrNamespaceTy(m) {
  return foldModuleOrNamespaceTy(function (_arg1, acc) {
    return acc;
  }, function (v, acc_1) {
    return new List(v, acc_1);
  }, m, new List());
}
export function allEntitiesOfModuleOrNamespaceTy(m) {
  return foldModuleOrNamespaceTy(function (ft, acc) {
    return new List(ft, acc);
  }, function (_arg1, acc_1) {
    return acc_1;
  }, m, new List());
}
export function isPublicVal(lv) {
  return lv.Accessibility.Equals(taccessPublic);
}
export function isPublicUnionCase(ucr) {
  return ucr.UnionCase.Accessibility.Equals(taccessPublic);
}
export function isPublicRecdField(rfr) {
  return rfr.RecdField.Accessibility.Equals(taccessPublic);
}
export function isPublicTycon(tcr) {
  return tcr.Accessibility.Equals(taccessPublic);
}
export function freeVarsAllPublic(fvs) {
  if ((ZsetModule.forall(function (lv) {
    return isPublicVal(lv);
  }, fvs.FreeLocals) ? ZsetModule.forall(function (ucr) {
    return isPublicUnionCase(ucr);
  }, fvs.FreeUnionCases) : false) ? ZsetModule.forall(function (rfr) {
    return isPublicRecdField(rfr);
  }, fvs.FreeRecdFields) : false) {
    return ZsetModule.forall(function (tcr) {
      return isPublicTycon(tcr);
    }, fvs.FreeTyvars.FreeTycons);
  } else {
    return false;
  }
}
export function freeTyvarsAllPublic(tyvars) {
  return ZsetModule.forall(function (tcr) {
    return isPublicTycon(tcr);
  }, tyvars.FreeTycons);
}

function _LinearMatchExpr___(expr) {
  const $var83 = expr.tag === 9 ? expr.data[3].length === 2 ? expr.data[3][1].data[0].tail == null ? [0, expr.data[2], expr.data[3][1].data[1], expr.data[1], expr.data[4], expr.data[0], expr.data[3][1].data[2], expr.data[3][0], expr.data[5]] : [1] : [1] : [1];

  switch ($var83[0]) {
    case 0:
      return [$var83[5], $var83[3], $var83[1], $var83[7], $var83[2], $var83[6], $var83[4], $var83[8]];

    case 1:
      return null;
  }
}

export { _LinearMatchExpr___ as $7C$LinearMatchExpr$7C$_$7C$ };
export function rebuildLinearMatchExpr(tupledArg) {
  return primMkMatch(tupledArg[0], tupledArg[1], tupledArg[2], [tupledArg[3], new DecisionTreeTarget(0, [new List(), tupledArg[4], tupledArg[5]])], tupledArg[6], tupledArg[7]);
}
export const emptyFreeVars = new FreeVars(emptyFreeLocals, false, false, emptyFreeTycons, emptyFreeRecdFields, emptyFreeUnionCases, emptyFreeTyvars);
export function unionFreeVars(fvs1, fvs2) {
  if (fvs1 === emptyFreeVars) {
    return fvs2;
  } else if (fvs2 === emptyFreeVars) {
    return fvs1;
  } else {
    const FreeLocals = unionFreeLocals(fvs1.FreeLocals, fvs2.FreeLocals);
    const FreeTyvars = unionFreeTyvars(fvs1.FreeTyvars, fvs2.FreeTyvars);
    return new FreeVars(FreeLocals, fvs1.UsesMethodLocalConstructs ? true : fvs2.UsesMethodLocalConstructs, fvs1.UsesUnboundRethrow ? true : fvs2.UsesUnboundRethrow, unionFreeTycons(fvs1.FreeLocalTyconReprs, fvs2.FreeLocalTyconReprs), unionFreeRecdFields(fvs1.FreeRecdFields, fvs2.FreeRecdFields), unionFreeUnionCases(fvs1.FreeUnionCases, fvs2.FreeUnionCases), FreeTyvars);
  }
}
export function accFreeVarsInTy(opts, ty, acc) {
  if (!opts.collectInTypes) {
    return acc;
  } else {
    const ftyvs_ = function (arg00_, arg10_, arg20_) {
      return accFreeInType(arg00_, arg10_, arg20_);
    }(opts, ty, acc.FreeTyvars);

    if (acc.FreeTyvars === ftyvs_) {
      return acc;
    } else {
      return new FreeVars(acc.FreeLocals, acc.UsesMethodLocalConstructs, acc.UsesUnboundRethrow, acc.FreeLocalTyconReprs, acc.FreeRecdFields, acc.FreeUnionCases, ftyvs_);
    }
  }
}
export function accFreeVarsInTys(opts, tys, acc) {
  if (tys.tail == null) {
    return acc;
  } else if (!opts.collectInTypes) {
    return acc;
  } else {
    const ftyvs_ = function (arg00_, arg10_, arg20_) {
      return accFreeInTypes(arg00_, arg10_, arg20_);
    }(opts, tys, acc.FreeTyvars);

    if (acc.FreeTyvars === ftyvs_) {
      return acc;
    } else {
      return new FreeVars(acc.FreeLocals, acc.UsesMethodLocalConstructs, acc.UsesUnboundRethrow, acc.FreeLocalTyconReprs, acc.FreeRecdFields, acc.FreeUnionCases, ftyvs_);
    }
  }
}
export function accFreevarsInTycon(opts, tcref, acc) {
  if (!opts.collectInTypes) {
    return acc;
  } else {
    const ftyvs_ = function (opts_1, tcr, acc_1) {
      return accFreeTycon(opts_1, tcr, acc_1);
    }(opts, tcref, acc.FreeTyvars);

    if (acc.FreeTyvars === ftyvs_) {
      return acc;
    } else {
      return new FreeVars(acc.FreeLocals, acc.UsesMethodLocalConstructs, acc.UsesUnboundRethrow, acc.FreeLocalTyconReprs, acc.FreeRecdFields, acc.FreeUnionCases, ftyvs_);
    }
  }
}
export function accFreevarsInVal(opts, v, acc) {
  if (!opts.collectInTypes) {
    return acc;
  } else {
    const ftyvs_ = function (opts_1, v_1, acc_1) {
      return accFreeInVal(opts_1, v_1, acc_1);
    }(opts, v, acc.FreeTyvars);

    if (acc.FreeTyvars === ftyvs_) {
      return acc;
    } else {
      return new FreeVars(acc.FreeLocals, acc.UsesMethodLocalConstructs, acc.UsesUnboundRethrow, acc.FreeLocalTyconReprs, acc.FreeRecdFields, acc.FreeUnionCases, ftyvs_);
    }
  }
}
export function accFreeVarsInTraitSln(opts, tys, acc) {
  if (!opts.collectInTypes) {
    return acc;
  } else {
    const ftyvs_ = function (opts_1, sln, acc_1) {
      return accFreeInTraitSln(opts_1, sln, acc_1);
    }(opts, tys, acc.FreeTyvars);

    if (acc.FreeTyvars === ftyvs_) {
      return acc;
    } else {
      return new FreeVars(acc.FreeLocals, acc.UsesMethodLocalConstructs, acc.UsesUnboundRethrow, acc.FreeLocalTyconReprs, acc.FreeRecdFields, acc.FreeUnionCases, ftyvs_);
    }
  }
}
export function boundLocalVal(opts, v, fvs) {
  if (!opts.includeLocals) {
    return fvs;
  } else {
    const fvs_1 = accFreevarsInVal(opts, v, fvs);

    if (!ZsetModule.contains(v, fvs_1.FreeLocals)) {
      return fvs_1;
    } else {
      return new FreeVars(ZsetModule.remove(v, fvs_1.FreeLocals), fvs_1.UsesMethodLocalConstructs, fvs_1.UsesUnboundRethrow, fvs_1.FreeLocalTyconReprs, fvs_1.FreeRecdFields, fvs_1.FreeUnionCases, fvs_1.FreeTyvars);
    }
  }
}
export function boundProtect(fvs) {
  if (fvs.UsesMethodLocalConstructs) {
    return new FreeVars(fvs.FreeLocals, false, fvs.UsesUnboundRethrow, fvs.FreeLocalTyconReprs, fvs.FreeRecdFields, fvs.FreeUnionCases, fvs.FreeTyvars);
  } else {
    return fvs;
  }
}
export function accUsesFunctionLocalConstructs(flg, fvs) {
  if (flg ? !fvs.UsesMethodLocalConstructs : false) {
    return new FreeVars(fvs.FreeLocals, true, fvs.UsesUnboundRethrow, fvs.FreeLocalTyconReprs, fvs.FreeRecdFields, fvs.FreeUnionCases, fvs.FreeTyvars);
  } else {
    return fvs;
  }
}
export function bound_rethrow(fvs) {
  if (fvs.UsesUnboundRethrow) {
    return new FreeVars(fvs.FreeLocals, fvs.UsesMethodLocalConstructs, false, fvs.FreeLocalTyconReprs, fvs.FreeRecdFields, fvs.FreeUnionCases, fvs.FreeTyvars);
  } else {
    return fvs;
  }
}
export function accUsesRethrow(flg, fvs) {
  if (flg ? !fvs.UsesUnboundRethrow : false) {
    return new FreeVars(fvs.FreeLocals, fvs.UsesMethodLocalConstructs, true, fvs.FreeLocalTyconReprs, fvs.FreeRecdFields, fvs.FreeUnionCases, fvs.FreeTyvars);
  } else {
    return fvs;
  }
}
export function boundLocalVals(opts, vs, fvs) {
  return foldBack(function (v, fvs_1) {
    return boundLocalVal(opts, v, fvs_1);
  }, vs, fvs);
}
export function bindLhs(opts, bind, fvs) {
  return boundLocalVal(opts, bind.Var, fvs);
}
export function freeVarsCacheCompute(opts, cache, f) {
  if (opts.canCache) {
    const matchValue = cache.cacheVal;

    if (matchValue == null) {
      const res = f();
      cache.cacheVal = nullableSlotFull(res);
      return res;
    } else {
      return cache.cacheVal;
    }
  } else {
    return f();
  }
}
export function accBindRhs(opts, _arg1, acc) {
  return accFreeInExpr(opts, _arg1.data[1], acc);
}
export function accFreeInSwitchCases(opts, csl, dflt, acc) {
  return foldBack(function (arg10_, arg20_) {
    return accFreeInDecisionTree(opts, arg10_, arg20_);
  }, defaultArg(dflt, [], $var84 => [$var84]), foldBack(function (arg10__1, acc_1) {
    return accFreeInSwitchCase(opts, arg10__1, acc_1);
  }, csl, acc));
}
export function accFreeInSwitchCase(opts, _arg2, acc) {
  return accFreeInDecisionTree(opts, _arg2.data[1], accFreeInTest(opts, _arg2.data[0], acc));
}
export function accFreeInTest(opts, discrim, acc) {
  switch (discrim.tag) {
    case 1:
      return accFreeVarsInTy(opts, discrim.data[1], acc);

    case 2:
    case 3:
      return acc;

    case 4:
      return accFreeVarsInTy(opts, discrim.data[0], accFreeVarsInTy(opts, discrim.data[1], acc));

    case 5:
      return accFreeInExpr(opts, discrim.data[0], accFreeVarsInTys(opts, discrim.data[1], foldBack(function (tupledArg, acc_1) {
        return accFreeValRef(opts, tupledArg[0], accFreeVarsInTys(opts, tupledArg[1], acc_1));
      }, defaultArg(discrim.data[2], [], $var85 => [$var85]), acc)));

    default:
      return accFreeUnionCaseRef(opts, discrim.data[0], accFreeVarsInTys(opts, discrim.data[1], acc));
  }
}
export function accFreeInDecisionTree(opts, x, acc) {
  if (x.tag === 1) {
    return accFreeInFlatExprs(opts, x.data[0], acc);
  } else if (x.tag === 2) {
    return unionFreeVars(bindLhs(opts, x.data[0], accBindRhs(opts, x.data[0], freeInDecisionTree(opts, x.data[1]))), acc);
  } else {
    return accFreeInExpr(opts, x.data[0], accFreeInSwitchCases(opts, x.data[1], x.data[2], acc));
  }
}
export function accFreeInValFlags(opts, flag, acc) {
  let isMethLocal;

  switch (flag.tag) {
    case 3:
    case 2:
      isMethLocal = true;
      break;

    case 0:
    case 1:
      isMethLocal = false;
      break;

    default:
      isMethLocal = true;
  }

  const acc_1 = accUsesFunctionLocalConstructs(isMethLocal, acc);

  if (flag.tag === 0) {
    if (!opts.collectInTypes) {
      return acc_1;
    } else {
      const ftyvs_ = function (arg00_, arg10_, arg20_) {
        return accFreeInType(arg00_, arg10_, arg20_);
      }(opts, flag.data, acc_1.FreeTyvars);

      if (acc_1.FreeTyvars === ftyvs_) {
        return acc_1;
      } else {
        return new FreeVars(acc_1.FreeLocals, acc_1.UsesMethodLocalConstructs, acc_1.UsesUnboundRethrow, acc_1.FreeLocalTyconReprs, acc_1.FreeRecdFields, acc_1.FreeUnionCases, ftyvs_);
      }
    }
  } else {
    return acc_1;
  }
}
export function accFreeLocalVal(opts, v, fvs) {
  if (!opts.includeLocals) {
    return fvs;
  } else if (ZsetModule.contains(v, fvs.FreeLocals)) {
    return fvs;
  } else {
    const fvs_1 = accFreevarsInVal(opts, v, fvs);
    return new FreeVars(ZsetModule.add(v, fvs_1.FreeLocals), fvs_1.UsesMethodLocalConstructs, fvs_1.UsesUnboundRethrow, fvs_1.FreeLocalTyconReprs, fvs_1.FreeRecdFields, fvs_1.FreeUnionCases, fvs_1.FreeTyvars);
  }
}
export function accLocalTyconRepr(opts, b, fvs) {
  if (!opts.includeLocalTyconReprs) {
    return fvs;
  } else if (ZsetModule.contains(b, fvs.FreeLocalTyconReprs)) {
    return fvs;
  } else {
    const FreeLocalTyconReprs = ZsetModule.add(b, fvs.FreeLocalTyconReprs);
    return new FreeVars(fvs.FreeLocals, fvs.UsesMethodLocalConstructs, fvs.UsesUnboundRethrow, FreeLocalTyconReprs, fvs.FreeRecdFields, fvs.FreeUnionCases, fvs.FreeTyvars);
  }
}
export function accUsedRecdOrUnionTyconRepr(opts, tc, fvs) {
  if ((() => {
    const matchValue = tc.TypeReprInfo;
    const $var86 = matchValue.tag === 0 ? [0] : matchValue.tag === 1 ? [0] : matchValue.tag === 2 ? [0] : [1];

    switch ($var86[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  })()) {
    return accLocalTyconRepr(opts, tc, fvs);
  } else {
    return fvs;
  }
}
export function accFreeUnionCaseRef(opts, cr, fvs) {
  var tc;
  var tcref;

  if (!opts.includeUnionCases) {
    return fvs;
  } else if (ZsetModule.contains(cr, fvs.FreeUnionCases)) {
    return fvs;
  } else {
    const fvs_2 = (tc = cr.Tycon, function (fvs_1) {
      return accUsedRecdOrUnionTyconRepr(opts, tc, fvs_1);
    })(fvs);
    const fvs_3 = (tcref = cr.TyconRef, function (acc) {
      return accFreevarsInTycon(opts, tcref, acc);
    })(fvs_2);
    const FreeUnionCases = ZsetModule.add(cr, fvs_3.FreeUnionCases);
    return new FreeVars(fvs_3.FreeLocals, fvs_3.UsesMethodLocalConstructs, fvs_3.UsesUnboundRethrow, fvs_3.FreeLocalTyconReprs, fvs_3.FreeRecdFields, FreeUnionCases, fvs_3.FreeTyvars);
  }
}
export function accFreeRecdFieldRef(opts, rfref, fvs) {
  var tc;
  var tcref;

  if (!opts.includeRecdFields) {
    return fvs;
  } else if (ZsetModule.contains(rfref, fvs.FreeRecdFields)) {
    return fvs;
  } else {
    const fvs_2 = (tc = rfref.Tycon, function (fvs_1) {
      return accUsedRecdOrUnionTyconRepr(opts, tc, fvs_1);
    })(fvs);
    const fvs_3 = (tcref = rfref.TyconRef, function (acc) {
      return accFreevarsInTycon(opts, tcref, acc);
    })(fvs_2);
    const FreeRecdFields = ZsetModule.add(rfref, fvs_3.FreeRecdFields);
    return new FreeVars(fvs_3.FreeLocals, fvs_3.UsesMethodLocalConstructs, fvs_3.UsesUnboundRethrow, fvs_3.FreeLocalTyconReprs, FreeRecdFields, fvs_3.FreeUnionCases, fvs_3.FreeTyvars);
  }
}
export function accFreeExnRef(_exnc, fvs) {
  return fvs;
}
export function accFreeValRef(opts, vref, fvs) {
  const matchValue = vref.IsLocalRef;

  if (matchValue) {
    return accFreeLocalVal(opts, vref.PrivateTarget, fvs);
  } else {
    return fvs;
  }
}
export function accFreeInMethod(opts, _arg3, acc) {
  return accFreeInSlotSig(opts, _arg3.data[0], unionFreeVars((() => {
    const $var87 = foldBack(function (vs, fvs) {
      return boundLocalVals(opts, vs, fvs);
    }, _arg3.data[3], freeInExpr(opts, _arg3.data[4]));

    if (!opts.collectInTypes) {
      return $var87;
    } else {
      const ftyvs_ = function (opts_1, tps, acc_1) {
        return boundTypars(opts_1, tps, acc_1);
      }(opts, _arg3.data[2], $var87.FreeTyvars);

      if ($var87.FreeTyvars === ftyvs_) {
        return $var87;
      } else {
        return new FreeVars($var87.FreeLocals, $var87.UsesMethodLocalConstructs, $var87.UsesUnboundRethrow, $var87.FreeLocalTyconReprs, $var87.FreeRecdFields, $var87.FreeUnionCases, ftyvs_);
      }
    }
  })(), acc));
}
export function accFreeInMethods(opts, methods, acc) {
  return foldBack(function (arg10_, acc_1) {
    return accFreeInMethod(opts, arg10_, acc_1);
  }, methods, acc);
}
export function accFreeInInterfaceImpl(opts, ty, overrides, acc) {
  return accFreeVarsInTy(opts, ty, accFreeInMethods(opts, overrides, acc));
}
export function accFreeInExpr(opts, x, acc) {
  if (x.tag === 7) {
    return accFreeInExprLinear(opts, x, acc, function (e) {
      return e;
    });
  } else {
    return accFreeInExprNonLinear(opts, x, acc);
  }
}
export function accFreeInExprLinear($var306, $var307, $var308, $var309) {
  accFreeInExprLinear: while (true) {
    const opts = $var306;
    const x = $var307;
    const acc = $var308;
    const contf = $var309;

    if (x.tag === 7) {
      const contf_1 = $var88 => {
        return contf(function (free) {
          return unionFreeVars(freeVarsCacheCompute(opts, x.data[3], function () {
            return bindLhs(opts, x.data[0], accBindRhs(opts, x.data[0], free));
          }), acc);
        }($var88));
      };

      $var306 = opts;
      $var307 = x.data[1];
      $var308 = emptyFreeVars;
      $var309 = contf_1;
      continue accFreeInExprLinear;
    } else {
      return contf(accFreeInExpr(opts, x, acc));
    }
  }
}
export function accFreeInExprNonLinear(opts, x, acc) {
  const $var89 = x.tag === 4 ? [1, x.data[2], x.data[4], x.data[1]] : x.tag === 13 ? [2, x.data[1], x.data[0]] : x.tag === 6 ? [3, x.data[0], x.data[3], x.data[1]] : x.tag === 7 ? [4] : x.tag === 8 ? [5, x.data[3], x.data[2], x.data[5], x.data[4], x.data[1]] : x.tag === 0 ? [6] : x.tag === 1 ? [7, x.data[1], x.data[0]] : x.tag === 12 ? x.data[1].contents == null ? [9, x.data[0], x.data[4]] : [8, getValue(x.data[1].contents)[3], getValue(x.data[1].contents)[2], getValue(x.data[1].contents)[1], x.data[0], x.data[4]] : x.tag === 5 ? [10, x.data[3], x.data[0], x.data[1], x.data[2]] : x.tag === 14 ? [11, x.data] : x.tag === 2 ? [12, x.data[0], x.data[1]] : x.tag === 10 ? [13, x.data[1], x.data[2]] : x.tag === 9 ? [14, x.data[2], x.data[3]] : x.tag === 11 ? x.data[0].tag === 8 ? x.data[2].tail != null ? x.data[2].tail.tail != null ? x.data[2].tail.tail.tail != null ? x.data[2].tail.tail.tail.tail == null ? [15, x.data[2].head, x.data[2].tail.head, x.data[2].tail.tail.head, x.data[1]] : [16, x.data[2], x.data[0], x.data[1]] : [16, x.data[2], x.data[0], x.data[1]] : [16, x.data[2], x.data[0], x.data[1]] : [16, x.data[2], x.data[0], x.data[1]] : [16, x.data[2], x.data[0], x.data[1]] : [0, x.data[4], x.data[2], x.data[1], x.data[6], x.data[3]];

  switch ($var89[0]) {
    case 0:
      return unionFreeVars(foldBack(function (v, fvs) {
        return boundLocalVal(opts, v, fvs);
      }, defaultArg($var89[3], [], $var91 => [$var91]), foldBack(function (v_1, fvs_1) {
        return boundLocalVal(opts, v_1, fvs_1);
      }, defaultArg($var89[2], [], $var90 => [$var90]), boundLocalVals(opts, $var89[5], accFreeVarsInTy(opts, $var89[4], freeInExpr(opts, $var89[1]))))), acc);

    case 1:
      return unionFreeVars((() => {
        const $var92 = accFreeVarsInTy(opts, $var89[2], freeInExpr(opts, $var89[1]));

        if (!opts.collectInTypes) {
          return $var92;
        } else {
          const ftyvs_ = function (opts_1, tps, acc_1) {
            return boundTypars(opts_1, tps, acc_1);
          }(opts, $var89[3], $var92.FreeTyvars);

          if ($var92.FreeTyvars === ftyvs_) {
            return $var92;
          } else {
            return new FreeVars($var92.FreeLocals, $var92.UsesMethodLocalConstructs, $var92.UsesUnboundRethrow, $var92.FreeLocalTyconReprs, $var92.FreeRecdFields, $var92.FreeUnionCases, ftyvs_);
          }
        }
      })(), acc);

    case 2:
      return unionFreeVars((() => {
        const $var93 = freeInExpr(opts, $var89[1]);

        if (!opts.collectInTypes) {
          return $var93;
        } else {
          const ftyvs__1 = function (opts_2, tps_1, acc_2) {
            return boundTypars(opts_2, tps_1, acc_2);
          }(opts, $var89[2], $var93.FreeTyvars);

          if ($var93.FreeTyvars === ftyvs__1) {
            return $var93;
          } else {
            return new FreeVars($var93.FreeLocals, $var93.UsesMethodLocalConstructs, $var93.UsesUnboundRethrow, $var93.FreeLocalTyconReprs, $var93.FreeRecdFields, $var93.FreeUnionCases, ftyvs__1);
          }
        }
      })(), acc);

    case 3:
      return unionFreeVars(freeVarsCacheCompute(opts, $var89[2], function () {
        return foldBack(function (bind, fvs_2) {
          return bindLhs(opts, bind, fvs_2);
        }, $var89[1], foldBack(function (arg10_, acc_3) {
          return accBindRhs(opts, arg10_, acc_3);
        }, $var89[1], freeInExpr(opts, $var89[3])));
      }), acc);

    case 4:
      throw new Error("unreachable - linear expr");

    case 5:
      return unionFreeVars(boundProtect(foldBack(function (v_2, fvs_3) {
        return boundLocalVal(opts, v_2, fvs_3);
      }, defaultArg($var89[2], [], $var94 => [$var94]), accFreeVarsInTy(opts, $var89[5], accFreeInExpr(opts, $var89[1], accFreeInMethods(opts, $var89[4], foldBack(function (tupledArg, acc_4) {
        return accFreeInInterfaceImpl(opts, tupledArg[0], tupledArg[1], acc_4);
      }, $var89[3], emptyFreeVars)))))), acc);

    case 6:
      return acc;

    case 7:
      return accFreeInValFlags(opts, $var89[1], accFreeValRef(opts, $var89[2], acc));

    case 8:
      return accFreeInExpr(opts, $var89[4], accFreeInExprs(opts, $var89[2], accFreeVarsInTys(opts, $var89[3], accFreeVarsInTy(opts, $var89[5], acc))));

    case 9:
      return accFreeInExpr(opts, $var89[1], accFreeVarsInTy(opts, $var89[2], acc));

    case 10:
      return accFreeVarsInTy(opts, $var89[3], accFreeInExpr(opts, $var89[2], accFreeVarsInTys(opts, $var89[4], accFreeInExprs(opts, $var89[1], acc))));

    case 11:
      return accFreeInExpr(opts, $var89[1].contents, acc);

    case 12:
      const acc_5 = accFreeInExpr(opts, $var89[1], acc);
      return accFreeInExpr(opts, $var89[2], acc_5);

    case 13:
      return accFreeInExpr(opts, $var89[1], accFreeInExpr(opts, $var89[2], acc));

    case 14:
      const activePatternResult27510 = _LinearMatchExpr___(x);

      if (activePatternResult27510 != null) {
        const acc_6 = accFreeInDecisionTree(opts, getValue(activePatternResult27510)[2], acc);
        const acc_7 = accFreeInTarget(opts, getValue(activePatternResult27510)[3], acc_6);
        return accFreeInExpr(opts, getValue(activePatternResult27510)[4], acc_7);
      } else {
        const acc_8 = accFreeInDecisionTree(opts, $var89[1], acc);
        return accFreeInTargets(opts, $var89[2], acc_8);
      }

    case 15:
      return unionFreeVars(accFreeVarsInTys(opts, $var89[4], accFreeInExprs(opts, ofArray([$var89[1], $var89[2]]), acc)), bound_rethrow(accFreeInExpr(opts, $var89[3], emptyFreeVars)));

    case 16:
      const acc_9 = accFreeInOp(opts, $var89[2], acc);
      const acc_10 = accFreeVarsInTys(opts, $var89[3], acc_9);
      return accFreeInExprs(opts, $var89[1], acc_10);
  }
}
export function accFreeInOp(opts, op, acc) {
  var ftyvs__1;
  const $var95 = op.tag === 5 ? [0] : op.tag === 8 ? [0] : op.tag === 9 ? [0] : op.tag === 7 ? [0] : op.tag === 24 ? [0] : op.tag === 23 ? [0] : op.tag === 3 ? [0] : op.tag === 6 ? [0] : op.tag === 27 ? [0] : op.tag === 28 ? [0] : op.tag === 26 ? [0] : op.tag === 21 ? [0] : op.tag === 2 ? [1] : op.tag === 14 ? [2] : op.tag === 15 ? [3, op.data] : op.tag === 0 ? [3, op.data] : op.tag === 17 ? [3, op.data[0]] : op.tag === 16 ? [3, op.data[0]] : op.tag === 18 ? [3, op.data[0]] : op.tag === 1 ? [4, op.data] : op.tag === 19 ? [4, op.data[0]] : op.tag === 20 ? [4, op.data[0]] : op.tag === 12 ? [5, op.data] : op.tag === 13 ? [5, op.data] : op.tag === 11 ? [5, op.data] : op.tag === 10 ? [6] : op.tag === 22 ? [7] : op.tag === 25 ? [8] : op.tag === 29 ? [9] : op.tag === 30 ? [10] : op.tag === 31 ? [11] : [0];

  switch ($var95[0]) {
    case 0:
      return acc;

    case 1:
      if (!opts.collectInTypes) {
        return acc;
      } else {
        const ftyvs_ = function (_opts, unt, acc_1) {
          return accFreeInTupInfo(_opts, unt, acc_1);
        }(opts, op.data, acc.FreeTyvars);

        if (acc.FreeTyvars === ftyvs_) {
          return acc;
        } else {
          return new FreeVars(acc.FreeLocals, acc.UsesMethodLocalConstructs, acc.UsesUnboundRethrow, acc.FreeLocalTyconReprs, acc.FreeRecdFields, acc.FreeUnionCases, ftyvs_);
        }
      }

    case 2:
      return accUsedRecdOrUnionTyconRepr(opts, op.data.Deref, acc);

    case 3:
      return accFreeUnionCaseRef(opts, $var95[1], acc);

    case 4:
      return accFreeExnRef($var95[1], acc);

    case 5:
      return accFreeRecdFieldRef(opts, $var95[1], acc);

    case 6:
      const acc_2 = accUsesFunctionLocalConstructs(op.data[0].Equals(new RecordConstructionInfo(0)), acc);
      return accUsedRecdOrUnionTyconRepr(opts, op.data[1].Deref, !opts.collectInTypes ? acc_2 : (ftyvs__1 = function (opts_1, tcr, acc_3) {
        return accFreeTycon(opts_1, tcr, acc_3);
      }(opts, op.data[1], acc_2.FreeTyvars), acc_2.FreeTyvars === ftyvs__1 ? acc_2 : new FreeVars(acc_2.FreeLocals, acc_2.UsesMethodLocalConstructs, acc_2.UsesUnboundRethrow, acc_2.FreeLocalTyconReprs, acc_2.FreeRecdFields, acc_2.FreeUnionCases, ftyvs__1)));

    case 7:
      return accFreeVarsInTys(opts, op.data[1], acc);

    case 8:
      return accUsesRethrow(true, acc);

    case 9:
      const tys = op.data.data[0];
      const sln = op.data.data[5];
      const rty = op.data.data[4];
      const argtys = op.data.data[3];
      return foldBack(function (tys_1, acc_4) {
        return accFreeVarsInTraitSln(opts, tys_1, acc_4);
      }, defaultArg(sln.contents, [], $var97 => [$var97]), accFreeVarsInTys(opts, tys, accFreeVarsInTys(opts, argtys, foldBack(function (ty, acc_5) {
        return accFreeVarsInTy(opts, ty, acc_5);
      }, defaultArg(rty, [], $var96 => [$var96]), acc))));

    case 10:
      return accFreeValRef(opts, op.data[1], acc);

    case 11:
      return accFreeVarsInTys(opts, op.data[8], accFreeVarsInTys(opts, op.data[9], accFreeInValFlags(opts, op.data[4], accFreeVarsInTys(opts, op.data[10], accUsesFunctionLocalConstructs(op.data[1], acc)))));
  }
}
export function accFreeInTargets(opts, targets, acc) {
  return foldBack(function (arg10_, acc_1) {
    return accFreeInTarget(opts, arg10_, acc_1);
  }, targets, acc);
}
export function accFreeInTarget(opts, _arg4, acc) {
  return foldBack(function (v, fvs) {
    return boundLocalVal(opts, v, fvs);
  }, _arg4.data[0], accFreeInExpr(opts, _arg4.data[1], acc));
}
export function accFreeInFlatExprs(opts, es, acc) {
  return foldBack(function (x, acc_1) {
    return accFreeInExpr(opts, x, acc_1);
  }, es, acc);
}
export function accFreeInExprs(opts, es, acc) {
  accFreeInExprs: while (true) {
    if (es.tail != null) {
      const acc_1 = accFreeInExpr(opts, es.head, acc);
      opts = opts;
      es = es.tail;
      acc = acc_1;
      continue accFreeInExprs;
    } else {
      return acc;
    }
  }
}
export function accFreeInSlotSig(opts, _arg5, acc) {
  return accFreeVarsInTy(opts, _arg5.data[1], acc);
}
export function freeInDecisionTree(opts, e) {
  return accFreeInDecisionTree(opts, e, emptyFreeVars);
}
export function freeInExpr(opts, e) {
  return accFreeInExpr(opts, e, emptyFreeVars);
}
export function accFreeInModuleOrNamespace(opts, x, acc) {
  accFreeInModuleOrNamespace: while (true) {
    switch (x.tag) {
      case 2:
        return accBindRhs(opts, x.data[0], acc);

      case 3:
        return accFreeInExpr(opts, x.data[0], acc);

      case 1:
        return accFreeInModuleOrNamespaces(opts, x.data, acc);

      case 0:
        const mdef = x.data.data[1];
        opts = opts;
        x = mdef;
        acc = acc;
        continue accFreeInModuleOrNamespace;

      default:
        return foldBack(function (x_1, acc_1) {
          return accFreeInModuleOrNamespaceBind(opts, x_1, acc_1);
        }, x.data[2], acc);
    }
  }
}
export function accFreeInModuleOrNamespaceBind(opts, x, acc) {
  if (x.tag === 1) {
    return accFreeInModuleOrNamespace(opts, x.data[1], acc);
  } else {
    return accBindRhs(opts, x.data, acc);
  }
}
export function accFreeInModuleOrNamespaces(opts, x, acc) {
  return foldBack(function (x_1, acc_1) {
    return accFreeInModuleOrNamespace(opts, x_1, acc_1);
  }, x, acc);
}
export function freeInBindingRhs(opts, bind) {
  return accBindRhs(opts, bind, emptyFreeVars);
}
export function freeInModuleOrNamespace(opts, mdef) {
  return accFreeInModuleOrNamespace(opts, mdef, emptyFreeVars);
}
export function stripLambda(e, ty) {
  if (e.tag === 3) {
    if (e.data[1] != null) {
      errorR(new InternalError("skipping ctorThisValOpt", Expr_get_Range.bind(e)()));
    }

    if (e.data[2] != null) {
      errorR(new InternalError("skipping baseValOpt", Expr_get_Range.bind(e)()));
    }

    const patternInput = stripLambda(e.data[4], e.data[6]);
    return [new List(e.data[3], patternInput[0]), patternInput[1], patternInput[2]];
  } else {
    return [new List(), e, ty];
  }
}
export function stripLambdaN(n, e) {
  const $var98 = e.tag === 3 ? n > 0 ? [0, e.data[2], e.data[4], e.data[1], e.data[3]] : [1] : [1];

  switch ($var98[0]) {
    case 0:
      if ($var98[3] != null) {
        errorR(new InternalError("skipping ctorThisValOpt", Expr_get_Range.bind(e)()));
      }

      if ($var98[1] != null) {
        errorR(new InternalError("skipping baseValOpt", Expr_get_Range.bind(e)()));
      }

      const patternInput = stripLambdaN(n - 1, $var98[2]);
      return [new List($var98[4], patternInput[0]), patternInput[1], patternInput[2]];

    case 1:
      return [new List(), e, n];
  }
}
export function tryStripLambdaN(n, e) {
  const $var99 = e.tag === 3 ? e.data[1] == null ? e.data[2] == null ? [0] : [1] : [1] : [1];

  switch ($var99[0]) {
    case 0:
      const patternInput = stripLambdaN(n, e);

      if (patternInput[2] === 0) {
        return [patternInput[0], patternInput[1]];
      } else {
        return null;
      }

    case 1:
      return null;
  }
}
export function stripTopLambda(e, ty) {
  const patternInput = e.tag === 4 ? [e.data[1], e.data[2], e.data[4]] : [new List(), e, ty];
  const patternInput_1 = stripLambda(patternInput[1], patternInput[2]);
  return [patternInput[0], patternInput_1[0], patternInput_1[1], patternInput_1[2]];
}
export class AllowTypeDirectedDetupling {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.AllowTypeDirectedDetupling",
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
setType("Microsoft.FSharp.Compiler.Tastops.AllowTypeDirectedDetupling", AllowTypeDirectedDetupling);
export function InferArityOfExpr(g, allowTypeDirectedDetupling, ty, partialArgAttribsL, retAttribs, e) {
  const stripLambda_notypes = function (e_1) {
    stripLambda_notypes: while (true) {
      if (e_1.tag === 3) {
        const patternInput = stripLambda_notypes(e_1.data[4]);
        return [new List(e_1.data[3], patternInput[0]), patternInput[1]];
      } else if (e_1.tag === 13) {
        e_1 = e_1.data[1];
        continue stripLambda_notypes;
      } else {
        return [new List(), e_1];
      }
    }
  };

  const stripTopLambdaNoTypes = function (e_2) {
    const patternInput_1 = e_2.tag === 4 ? [e_2.data[1], e_2.data[2]] : [new List(), e_2];
    const patternInput_2 = stripLambda_notypes(patternInput_1[1]);
    return [patternInput_1[0], patternInput_2[0], patternInput_2[1]];
  };

  const patternInput_3 = stripTopLambdaNoTypes(e);
  const fun_arity = patternInput_3[1].length | 0;
  const patternInput_4 = stripFunTyN(g, fun_arity, tryDestForallTy(g, ty)[1]);
  const partialArgAttribsL_1 = Array.from(partialArgAttribsL);
  const curriedArgInfos = mapIndexed(function (i, tupledArg) {
    const partialAttribs = i < partialArgAttribsL_1.length ? partialArgAttribsL_1[i] : new List();
    const tys = allowTypeDirectedDetupling.tag === 0 ? (i === 0 ? isUnitTy(g, tupledArg[1]) : false) ? new List() : tryDestRefTupleTy(g, tupledArg[1]) : ofArray([tupledArg[1]]);
    const ids = tupledArg[0].length === tys.length ? map(function (v) {
      return v.Id;
    }, tupledArg[0]) : map(function (_arg1) {
      return null;
    }, tys);
    const attribs = partialAttribs.length === tys.length ? partialAttribs : map(function (_arg2) {
      return new List();
    }, tys);
    return toList(map2(function (id, attribs_1) {
      return new ArgReprInfo(attribs_1, id);
    }, ids, attribs));
  }, toList(zip(patternInput_3[1], patternInput_4[0])));
  const retInfo = new ArgReprInfo(retAttribs, null);
  return new ValReprInfo(0, [ValReprInfoModule.InferTyparInfo(patternInput_3[0]), curriedArgInfos, retInfo]);
}
export function InferArityOfExprBinding(g, allowTypeDirectedDetupling, v, e) {
  const matchValue = v.ValReprInfo;

  if (matchValue == null) {
    return InferArityOfExpr(g, allowTypeDirectedDetupling, v.Type, new List(), new List(), e);
  } else {
    return getValue(matchValue);
  }
}
export function underlyingTypeOfEnumTy(g, typ) {
  const matchValue = metadataOfTy(g, typ);

  if (matchValue.tag === 1) {
    const tycon = tcrefOfAppTy(g, typ).Deref;
    const matchValue_1 = tycon.GetFieldByName("value__");

    if (matchValue_1 == null) {
      return error(new InternalError("no 'value__' field found for enumeration type " + tycon.LogicalName, tycon.Range));
    } else {
      return getValue(matchValue_1).FormalType;
    }
  } else {
    const tdef = matchValue.data.data[2];
    const info = computeILEnumInfo(tdef.Name, tdef.Fields);
    const ilTy = getTyOfILEnumInfo(info);
    const matchValue_2 = ilTy.TypeSpec.Name;

    switch (matchValue_2) {
      case "System.Byte":
        return g.byte_ty;

      case "System.SByte":
        return g.sbyte_ty;

      case "System.Int16":
        return g.int16_ty;

      case "System.Int32":
        return g.int32_ty;

      case "System.Int64":
        return g.int64_ty;

      case "System.UInt16":
        return g.uint16_ty;

      case "System.UInt32":
        return g.uint32_ty;

      case "System.UInt64":
        return g.uint64_ty;

      case "System.Single":
        return g.float32_ty;

      case "System.Double":
        return g.float_ty;

      case "System.Char":
        return g.char_ty;

      case "System.Boolean":
        return g.bool_ty;

      default:
        return g.int32_ty;
    }
  }
}
export function setValHasNoArity(f) {
  f.SetValReprInfo(null);
  return f;
}
export function normalizeEnumTy(g, ty) {
  if (isEnumTy(g, ty)) {
    return underlyingTypeOfEnumTy(g, ty);
  } else {
    return ty;
  }
}
export function decideStaticOptimizationConstraint(g, c) {
  if (c.tag === 1) {
    const a = normalizeEnumTy(g, stripTyEqnsAndMeasureEqns(g, c.data));
    const matchValue = tryDestAppTy(g, a);

    if (matchValue == null) {
      return 0;
    } else if (getValue(matchValue).IsStructOrEnumTycon) {
      return 1;
    } else {
      return -1;
    }
  } else {
    const checkTypes = function (a_1, b) {
      const a_2 = normalizeEnumTy(g, stripTyEqnsAndMeasureEqns(g, a_1));

      const activePatternResult27619 = function (arg10_) {
        return _AppTy___(g, arg10_);
      }(a_2);

      if (activePatternResult27619 != null) {
        const b_1 = normalizeEnumTy(g, stripTyEqnsAndMeasureEqns(g, b));

        const activePatternResult27601 = function (arg10__1) {
          return _AppTy___(g, arg10__1);
        }(b_1);

        if (activePatternResult27601 != null) {
          if (tyconRefEq(g, getValue(activePatternResult27619)[0], getValue(activePatternResult27601)[0])) {
            return 1;
          } else {
            return -1;
          }
        } else {
          let $var100;

          const activePatternResult27598 = function (ty) {
            return _RefTupleTy___(g, ty);
          }(b_1);

          if (activePatternResult27598 != null) {
            $var100 = [0];
          } else {
            const activePatternResult27599 = function (ty_1) {
              return _FunTy___(g, ty_1);
            }(b_1);

            if (activePatternResult27599 != null) {
              $var100 = [0];
            } else {
              $var100 = [1];
            }
          }

          switch ($var100[0]) {
            case 0:
              return -1;

            case 1:
              return 0;
          }
        }
      } else {
        const activePatternResult27617 = function (ty_2) {
          return _FunTy___(g, ty_2);
        }(a_2);

        if (activePatternResult27617 != null) {
          const b_2 = normalizeEnumTy(g, stripTyEqnsAndMeasureEqns(g, b));

          const activePatternResult27607 = function (ty_3) {
            return _FunTy___(g, ty_3);
          }(b_2);

          if (activePatternResult27607 != null) {
            return 1;
          } else {
            let $var101;

            const activePatternResult27604 = function (arg10__2) {
              return _AppTy___(g, arg10__2);
            }(b_2);

            if (activePatternResult27604 != null) {
              $var101 = [0];
            } else {
              const activePatternResult27605 = function (ty_4) {
                return _RefTupleTy___(g, ty_4);
              }(b_2);

              if (activePatternResult27605 != null) {
                $var101 = [0];
              } else {
                $var101 = [1];
              }
            }

            switch ($var101[0]) {
              case 0:
                return -1;

              case 1:
                return 0;
            }
          }
        } else {
          const activePatternResult27615 = function (ty_5) {
            return _RefTupleTy___(g, ty_5);
          }(a_2);

          if (activePatternResult27615 != null) {
            const b_3 = normalizeEnumTy(g, stripTyEqnsAndMeasureEqns(g, b));

            const activePatternResult27613 = function (ty_6) {
              return _RefTupleTy___(g, ty_6);
            }(b_3);

            if (activePatternResult27613 != null) {
              if (getValue(activePatternResult27615).length === getValue(activePatternResult27613).length) {
                return 1;
              } else {
                return -1;
              }
            } else {
              let $var102;

              const activePatternResult27610 = function (arg10__3) {
                return _AppTy___(g, arg10__3);
              }(b_3);

              if (activePatternResult27610 != null) {
                $var102 = [0];
              } else {
                const activePatternResult27611 = function (ty_7) {
                  return _FunTy___(g, ty_7);
                }(b_3);

                if (activePatternResult27611 != null) {
                  $var102 = [0];
                } else {
                  $var102 = [1];
                }
              }

              switch ($var102[0]) {
                case 0:
                  return -1;

                case 1:
                  return 0;
              }
            }
          } else {
            return 0;
          }
        }
      }
    };

    return checkTypes(c.data[0], c.data[1]) | 0;
  }
}
export function DecideStaticOptimizations(g, cs) {
  DecideStaticOptimizations: while (true) {
    if (cs.tail != null) {
      const d = decideStaticOptimizationConstraint(g, cs.head) | 0;

      if (d === -1) {
        return -1;
      } else if (d === 1) {
        g = g;
        cs = cs.tail;
        continue DecideStaticOptimizations;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  }
}
export function mkStaticOptimizationExpr(g, cs, e1, e2, m) {
  const d = DecideStaticOptimizations(g, cs) | 0;

  if (d === -1) {
    return e2;
  } else if (d === 1) {
    return e1;
  } else {
    return new Expr(10, [cs, e1, e2, m]);
  }
}
export class ValCopyFlag {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.ValCopyFlag",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["CloneAll"], ["CloneAllAndMarkExprValsAsCompilerGenerated"], ["OnlyCloneExprVals"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.ValCopyFlag", ValCopyFlag);
export function fixValCopyFlagForQuotations(_arg1) {
  if (_arg1.tag === 1) {
    return new ValCopyFlag(0);
  } else {
    return _arg1;
  }
}
export function markAsCompGen(compgen, d) {
  const compgen_1 = compgen.tag === 1 ? true : false;
  const val_flags = d.val_flags.SetIsCompilerGenerated(d.val_flags.IsCompilerGenerated ? true : compgen_1);
  return new Val(d.val_logical_name, d.val_range, d.val_type, d.val_stamp, val_flags, d.val_opt_data);
}
export function bindLocalVal(v, v_, tmenv) {
  const valRemap = function (arg00, arg10) {
    return tmenv.valRemap.Add(arg00, arg10);
  }(v, mkLocalValRef(v_));

  return new Remap(tmenv.tpinst, valRemap, tmenv.tyconRefRemap, tmenv.removeTraitSolutions);
}
export function bindLocalVals(vs, vs_, tmenv) {
  const valRemap = foldBack2(function (v, v_, acc) {
    return function (arg00, arg10) {
      return acc.Add(arg00, arg10);
    }(v, mkLocalValRef(v_));
  }, vs, vs_, tmenv.valRemap);
  return new Remap(tmenv.tpinst, valRemap, tmenv.tyconRefRemap, tmenv.removeTraitSolutions);
}
export function bindTycon(tc, tc_, tyenv) {
  const tyconRefRemap = function (arg00, arg10) {
    return tyenv.tyconRefRemap.Add(arg00, arg10);
  }(mkLocalTyconRef(tc), mkLocalTyconRef(tc_));

  return new Remap(tyenv.tpinst, tyenv.valRemap, tyconRefRemap, tyenv.removeTraitSolutions);
}
export function bindTycons(tcs, tcs_, tyenv) {
  const tyconRefRemap = foldBack2(function (tc, tc_, acc) {
    return function (arg00, arg10) {
      return acc.Add(arg00, arg10);
    }(mkLocalTyconRef(tc), mkLocalTyconRef(tc_));
  }, tcs, tcs_, tyenv.tyconRefRemap);
  return new Remap(tyenv.tpinst, tyenv.valRemap, tyconRefRemap, tyenv.removeTraitSolutions);
}
export function remapAttribKind(tmenv, k) {
  if (k.tag === 1) {
    return new AttribKind(1, remapValRef(tmenv, k.data));
  } else {
    return k;
  }
}
export function tmenvCopyRemapAndBindTypars(remapAttrib, tmenv, tps) {
  const patternInput = copyAndRemapAndBindTyparsFull(remapAttrib, tmenv, tps);
  return [patternInput[0], patternInput[1]];
}
export function remapAttrib(g, tmenv, _arg1) {
  return new Attrib(0, [remapTyconRef(tmenv.tyconRefRemap, _arg1.data[0]), remapAttribKind(tmenv, _arg1.data[1]), map(function (arg20_) {
    return remapAttribExpr(g, tmenv, arg20_);
  }, _arg1.data[2]), map(function (_arg1_1) {
    const ty = _arg1_1.data[1];
    const nm = _arg1_1.data[0];
    const flg = _arg1_1.data[2];
    const expr = _arg1_1.data[3];
    return new AttribNamedArg(0, [nm, remapType(tmenv, ty), flg, remapAttribExpr(g, tmenv, expr)]);
  }, _arg1.data[3]), _arg1.data[4], _arg1.data[5], _arg1.data[6]]);
}
export function remapAttribExpr(g, tmenv, _arg2) {
  return new AttribExpr(0, [remapExpr(g, new ValCopyFlag(0), tmenv, _arg2.data[0]), remapExpr(g, new ValCopyFlag(0), tmenv, _arg2.data[1])]);
}
export function remapAttribs(g, tmenv, xs) {
  return map(function (arg20_) {
    return remapAttrib(g, tmenv, arg20_);
  }, xs);
}
export function remapPossibleForallTy(g, tmenv, ty) {
  return remapTypeFull(function (xs) {
    return remapAttribs(g, tmenv, xs);
  }, tmenv, ty);
}
export function remapArgData(g, tmenv, argInfo) {
  return new ArgReprInfo(remapAttribs(g, tmenv, argInfo.Attribs), argInfo.Name);
}
export function remapValReprInfo(g, tmenv, _arg3) {
  return new ValReprInfo(0, [_arg3.data[0], List_1.mapSquared(function (argInfo) {
    return remapArgData(g, tmenv, argInfo);
  }, _arg3.data[1]), remapArgData(g, tmenv, _arg3.data[2])]);
}
export function remapValData(g, tmenv, d) {
  var m;
  const ty = d.val_type;
  const topValInfo = d.ValReprInfo;

  const tyR = function (arg20_) {
    return remapPossibleForallTy(g, tmenv, arg20_);
  }(ty);

  const declaringEntityR = function (p) {
    return remapParentRef(tmenv, p);
  }(d.DeclaringEntity);

  const reprInfoR = defaultArg(d.ValReprInfo, null, function (arg20__1) {
    return remapValReprInfo(g, tmenv, arg20__1);
  });
  const memberInfoR = defaultArg(d.MemberInfo, null, (m = d.val_range, function (x) {
    return remapMemberInfo(g, m, topValInfo, ty, tyR, tmenv, x);
  }));

  const attribsR = function (xs) {
    return remapAttribs(g, tmenv, xs);
  }(d.Attribs);

  let val_opt_data;
  const matchValue = d.val_opt_data;

  if (matchValue == null) {
    val_opt_data = null;
  } else {
    val_opt_data = new ValOptionalData(getValue(matchValue).val_compiled_name, getValue(matchValue).val_other_range, getValue(matchValue).val_const, getValue(matchValue).val_defn, reprInfoR, getValue(matchValue).val_access, getValue(matchValue).val_xmldoc, memberInfoR, declaringEntityR, getValue(matchValue).val_xmldocsig, attribsR);
  }

  return new Val(d.val_logical_name, d.val_range, tyR, d.val_stamp, d.val_flags, val_opt_data);
}
export function remapParentRef(tyenv, p) {
  if (p.tag === 0) {
    return new ParentRef(0, remapTyconRef(tyenv.tyconRefRemap, p.data));
  } else {
    return new ParentRef(1);
  }
}
export function mapImmediateValsAndTycons(ft, fv, x) {
  const vals = function (x_1) {
    return QueueListModule.map(fv, x_1);
  }(x.AllValsAndMembers);

  const tycons = function (x_2) {
    return QueueListModule.map(ft, x_2);
  }(x.AllEntities);

  return new ModuleOrNamespaceType(x.ModuleOrNamespaceKind, vals, tycons);
}
export function copyVal(compgen, v) {
  const $var103 = compgen.tag === 2 ? v.IsMemberOrModuleBinding ? [0] : [1] : [1];

  switch ($var103[0]) {
    case 0:
      return v;

    case 1:
      return NewModifiedVal(function (x) {
        return x;
      }, v);
  }
}
export function fixupValData(g, compgen, tmenv, v2) {
  const $var104 = compgen.tag === 2 ? v2.IsMemberOrModuleBinding ? [0] : [1] : [1];

  switch ($var104[0]) {
    case 0:
      break;

    case 1:
      const newData = function (d) {
        return markAsCompGen(compgen, d);
      }(remapValData(g, tmenv, v2));

      v2.SetData(newData);
      break;
  }
}
export function copyAndRemapAndBindVals(g, compgen, tmenv, vs) {
  const vs2 = map(function (v) {
    return copyVal(compgen, v);
  }, vs);
  const tmenvinner = bindLocalVals(vs, vs2, tmenv);
  iterate(function (v2) {
    fixupValData(g, compgen, tmenvinner, v2);
  }, vs2);
  return [vs2, tmenvinner];
}
export function copyAndRemapAndBindVal(g, compgen, tmenv, v) {
  const v2 = function (v_1) {
    return copyVal(compgen, v_1);
  }(v);

  const tmenvinner = bindLocalVal(v, v2, tmenv);
  fixupValData(g, compgen, tmenvinner, v2);
  return [v2, tmenvinner];
}
export function remapExpr(g, compgen, tmenv, x) {
  var rfref;
  var arg_3;
  var uref;
  var cidx;
  var arg_2;

  remapExpr: while (true) {
    const $var105 = x.tag === 3 ? [0, x.data[4], x.data[2], x.data[1], x.data[5], x.data[6], x.data[3]] : x.tag === 4 ? [1, x.data[2], x.data[3], x.data[4], x.data[1]] : x.tag === 13 ? [2, x.data[1], x.data[2], x.data[0]] : x.tag === 6 ? [3, x.data[0], x.data[1], x.data[2]] : x.tag === 2 ? [4] : x.tag === 7 ? [4] : x.tag === 9 ? [5, x.data[1], x.data[4], x.data[2], x.data[0], x.data[3], x.data[5]] : x.tag === 1 ? [6, x.data[2], x.data[1], x.data[0]] : x.tag === 12 ? x.data[1].contents == null ? [8, x.data[0], x.data[2], x.data[3], x.data[4]] : [7, x.data[0], getValue(x.data[1].contents)[2], getValue(x.data[1].contents)[1], getValue(x.data[1].contents)[3], x.data[2], x.data[3], x.data[4], getValue(x.data[1].contents)[0]] : x.tag === 8 ? [9, x.data[3], x.data[2], x.data[5], x.data[6], x.data[4], x.data[1]] : x.tag === 11 ? x.data[0].tag === 13 ? x.data[2].tail != null ? x.data[2].tail.tail == null ? (rfref = x.data[0].data, arg_3 = x.data[2].head, !rfref.RecdField.IsMutable ? !entityRefInThisAssembly(g.compilingFslib, rfref.TyconRef) : false) ? [10, x.data[2].head, x.data[3], x.data[0].data, x.data[1]] : [11] : [11] : [11] : [11] : [11];

    switch ($var105[0]) {
      case 0:
        const patternInput = Option_1.mapFold(function (tmenv_1, v) {
          return copyAndRemapAndBindVal(g, compgen, tmenv_1, v);
        }, tmenv, $var105[3]);
        const patternInput_1 = Option_1.mapFold(function (tmenv_2, v_1) {
          return copyAndRemapAndBindVal(g, compgen, tmenv_2, v_1);
        }, patternInput[1], $var105[2]);
        const patternInput_2 = copyAndRemapAndBindVals(g, compgen, patternInput_1[1], $var105[6]);
        const b = remapExpr(g, compgen, patternInput_2[1], $var105[1]);
        const rty = remapType(patternInput_2[1], $var105[5]);
        return new Expr(3, [newUnique(), patternInput[0], patternInput_1[0], patternInput_2[0], b, $var105[4], rty]);

      case 1:
        const patternInput_3 = tmenvCopyRemapAndBindTypars(function (xs) {
          return remapAttribs(g, tmenv, xs);
        }, tmenv, $var105[4]);
        return mkTypeLambda($var105[2], patternInput_3[0], remapExpr(g, compgen, patternInput_3[1], $var105[1]), remapType(patternInput_3[1], $var105[3]));

      case 2:
        const patternInput_4 = tmenvCopyRemapAndBindTypars(function (xs_1) {
          return remapAttribs(g, tmenv, xs_1);
        }, tmenv, $var105[3]);
        return new Expr(13, [patternInput_4[0], remapExpr(g, compgen, patternInput_4[1], $var105[1]), $var105[2]]);

      case 3:
        const patternInput_5 = copyAndRemapAndBindBindings(g, compgen, tmenv, $var105[1]);
        return new Expr(6, [patternInput_5[0], remapExpr(g, compgen, patternInput_5[1], $var105[2]), $var105[3], NewFreeVarsCache()]);

      case 4:
        return remapLinearExpr(g, compgen, tmenv, x, function (x_1) {
          return x_1;
        });

      case 5:
        return primMkMatch($var105[4], $var105[1], remapDecisionTree(g, compgen, tmenv, $var105[3]), map_1(function (arg30_) {
          return remapTarget(g, compgen, tmenv, arg30_);
        }, $var105[5], Array), $var105[2], remapType(tmenv, $var105[6]));

      case 6:
        const vr_ = remapValRef(tmenv, $var105[3]);
        const vf_ = remapValFlags(tmenv, $var105[2]);

        if ($var105[3] === vr_ ? $var105[2] === vf_ : false) {
          return x;
        } else {
          return new Expr(1, [vr_, vf_, $var105[1]]);
        }

      case 7:
        const compgen_1 = fixValCopyFlagForQuotations(compgen);
        return new Expr(12, [remapExpr(g, compgen_1, tmenv, $var105[1]), {
          contents: [$var105[8], remapTypesAux(tmenv, $var105[3]), remapExprs(g, compgen_1, tmenv, $var105[2]), $var105[4]]
        }, $var105[5], $var105[6], remapType(tmenv, $var105[7])]);

      case 8:
        return new Expr(12, [remapExpr(g, fixValCopyFlagForQuotations(compgen), tmenv, $var105[1]), {
          contents: null
        }, $var105[2], $var105[3], remapType(tmenv, $var105[4])]);

      case 9:
        const patternInput_6 = Option_1.mapFold(function (tmenv_3, v_2) {
          return copyAndRemapAndBindVal(g, compgen, tmenv_3, v_2);
        }, tmenv, $var105[2]);
        return mkObjExpr(remapType(tmenv, $var105[6]), patternInput_6[0], remapExpr(g, compgen, tmenv, $var105[1]), map(function (arg30__1) {
          return remapMethod(g, compgen, patternInput_6[1], arg30__1);
        }, $var105[5]), map(function (tupledArg) {
          return remapInterfaceImpl(g, compgen, patternInput_6[1], tupledArg[0], tupledArg[1]);
        }, $var105[3]), $var105[4]);

      case 10:
        const tinst = remapTypes(tmenv, $var105[4]);
        const arg = remapExpr(g, compgen, tmenv, $var105[1]);
        const patternInput_7 = mkMutableCompGenLocal($var105[2], "copyOfStruct", actualTyOfRecdFieldRef($var105[3], tinst));
        return mkCompGenLet($var105[2], patternInput_7[0], mkRecdFieldGetViaExprAddr(arg, $var105[3], tinst, $var105[2]), mkValAddr($var105[2], mkLocalValRef(patternInput_7[0])));

      case 11:
        const $var106 = x.tag === 11 ? x.data[0].tag === 17 ? x.data[2].tail != null ? x.data[2].tail.tail == null ? (uref = x.data[0].data[0], cidx = x.data[0].data[1] | 0, arg_2 = x.data[2].head, !uref.FieldByIndex(cidx).IsMutable ? !entityRefInThisAssembly(g.compilingFslib, uref.TyconRef) : false) ? [0, x.data[2].head, x.data[0].data[1], x.data[3], x.data[1], x.data[0].data[0]] : [1] : [1] : [1] : [1] : [1];

        switch ($var106[0]) {
          case 0:
            const tinst_1 = remapTypes(tmenv, $var106[4]);
            const arg_1 = remapExpr(g, compgen, tmenv, $var106[1]);
            const patternInput_8 = mkMutableCompGenLocal($var106[3], "copyOfStruct", actualTyOfUnionFieldRef($var106[5], $var106[2], tinst_1));
            return mkCompGenLet($var106[3], patternInput_8[0], mkUnionCaseFieldGetProvenViaExprAddr(arg_1, $var106[5], tinst_1, $var106[2], $var106[3]), mkValAddr($var106[3], mkLocalValRef(patternInput_8[0])));

          case 1:
            switch (x.tag) {
              case 11:
                const op_ = remapOp(tmenv, x.data[0]);
                const tinst_ = remapTypes(tmenv, x.data[1]);
                const args_ = remapExprs(g, compgen, tmenv, x.data[2]);

                if ((x.data[0] === op_ ? x.data[1] === tinst_ : false) ? x.data[2] === args_ : false) {
                  return x;
                } else {
                  return new Expr(11, [op_, tinst_, args_, x.data[3]]);
                }

              case 5:
                const e1_ = remapExpr(g, compgen, tmenv, x.data[0]);
                const e1ty_ = remapPossibleForallTy(g, tmenv, x.data[1]);
                const tyargs_ = remapTypes(tmenv, x.data[2]);
                const args__1 = remapExprs(g, compgen, tmenv, x.data[3]);

                if (((x.data[0] === e1_ ? x.data[1] === e1ty_ : false) ? x.data[2] === tyargs_ : false) ? x.data[3] === args__1 : false) {
                  return x;
                } else {
                  return new Expr(5, [e1_, e1ty_, tyargs_, args__1, x.data[4]]);
                }

              case 14:
                g = g;
                compgen = compgen;
                tmenv = tmenv;
                x = x.data.contents;
                continue remapExpr;

              case 10:
                return mkStaticOptimizationExpr(g, map(function (c) {
                  return remapConstraint(tmenv, c);
                }, x.data[0]), remapExpr(g, compgen, tmenv, x.data[1]), remapExpr(g, compgen, tmenv, x.data[2]), x.data[3]);

              case 0:
                const ty_ = remapType(tmenv, x.data[2]);

                if (x.data[2] === ty_) {
                  return x;
                } else {
                  return new Expr(0, [x.data[0], x.data[1], ty_]);
                }

              default:
                throw new Error("C:/projects/fcs/src/fsharp/TastOps.fs", 4706, 10);
            }

        }

    }
  }
}
export function remapTarget(g, compgen, tmenv, _arg4) {
  const patternInput = copyAndRemapAndBindVals(g, compgen, tmenv, _arg4.data[0]);
  return new DecisionTreeTarget(0, [patternInput[0], remapExpr(g, compgen, patternInput[1], _arg4.data[1]), _arg4.data[2]]);
}
export function remapLinearExpr($var316, $var317, $var318, $var319, $var320) {
  remapLinearExpr: while (true) {
    const g = $var316;
    const compgen = $var317;
    const tmenv = $var318;
    const e = $var319;
    const contf = $var320;

    if (e.tag === 7) {
      const patternInput = copyAndRemapAndBindBinding(g, compgen, tmenv, e.data[0]);
      $var316 = g;
      $var317 = compgen;
      $var318 = patternInput[1];
      $var319 = e.data[1];

      $var320 = $var107 => contf(function (arg20_) {
        return mkLetBind(e.data[2], patternInput[0], arg20_);
      }($var107));

      continue remapLinearExpr;
    } else if (e.tag === 2) {
      const e1_ = remapExpr(g, compgen, tmenv, e.data[0]);
      $var316 = g;
      $var317 = compgen;
      $var318 = tmenv;
      $var319 = e.data[1];

      $var320 = $var108 => contf(function (e2_) {
        return (e.data[0] === e1_ ? e.data[1] === e2_ : false) ? e : new Expr(2, [e1_, e2_, e.data[2], e.data[3], e.data[4]]);
      }($var108));

      continue remapLinearExpr;
    } else {
      const activePatternResult27730 = _LinearMatchExpr___(e);

      if (activePatternResult27730 != null) {
        const dtree = remapDecisionTree(g, compgen, tmenv, getValue(activePatternResult27730)[2]);
        const tg1 = remapTarget(g, compgen, tmenv, getValue(activePatternResult27730)[3]);
        const ty = remapType(tmenv, getValue(activePatternResult27730)[7]);
        $var316 = g;
        $var317 = compgen;
        $var318 = tmenv;
        $var319 = getValue(activePatternResult27730)[4];

        $var320 = $var109 => contf(function (e2) {
          return rebuildLinearMatchExpr([getValue(activePatternResult27730)[0], getValue(activePatternResult27730)[1], dtree, tg1, e2, getValue(activePatternResult27730)[5], getValue(activePatternResult27730)[6], ty]);
        }($var109));

        continue remapLinearExpr;
      } else {
        return contf(remapExpr(g, compgen, tmenv, e));
      }
    }
  }
}
export function remapConstraint(tyenv, c) {
  if (c.tag === 1) {
    return new StaticOptimization(1, remapType(tyenv, c.data));
  } else {
    return new StaticOptimization(0, [remapType(tyenv, c.data[0]), remapType(tyenv, c.data[1])]);
  }
}
export function remapOp(tmenv, op) {
  switch (op.tag) {
    case 10:
      return new TOp(10, [op.data[0], remapTyconRef(tmenv.tyconRefRemap, op.data[1])]);

    case 14:
      return new TOp(14, remapTyconRef(tmenv.tyconRefRemap, op.data));

    case 0:
      return new TOp(0, remapUnionCaseRef(tmenv.tyconRefRemap, op.data));

    case 15:
      return new TOp(15, remapUnionCaseRef(tmenv.tyconRefRemap, op.data));

    case 1:
      return new TOp(1, remapTyconRef(tmenv.tyconRefRemap, op.data));

    case 19:
      return new TOp(19, [remapTyconRef(tmenv.tyconRefRemap, op.data[0]), op.data[1]]);

    case 20:
      return new TOp(20, [remapTyconRef(tmenv.tyconRefRemap, op.data[0]), op.data[1]]);

    case 11:
      return new TOp(11, remapRecdFieldRef(tmenv.tyconRefRemap, op.data));

    case 12:
      return new TOp(12, remapRecdFieldRef(tmenv.tyconRefRemap, op.data));

    case 13:
      return new TOp(13, remapRecdFieldRef(tmenv.tyconRefRemap, op.data));

    case 16:
      return new TOp(16, [remapUnionCaseRef(tmenv.tyconRefRemap, op.data[0]), op.data[1]]);

    case 18:
      return new TOp(18, [remapUnionCaseRef(tmenv.tyconRefRemap, op.data[0]), op.data[1]]);

    case 22:
      const tys2 = remapTypes(tmenv, op.data[1]);

      if (op.data[1] === tys2) {
        return op;
      } else {
        return new TOp(22, [op.data[0], tys2]);
      }

    case 29:
      return new TOp(29, remapTraitAux(tmenv, op.data));

    case 30:
      return new TOp(30, [op.data[0], remapValRef(tmenv, op.data[1])]);

    case 31:
      return new TOp(31, [op.data[0], op.data[1], op.data[2], op.data[3], remapValFlags(tmenv, op.data[4]), op.data[5], op.data[6], op.data[7], remapTypes(tmenv, op.data[8]), remapTypes(tmenv, op.data[9]), remapTypes(tmenv, op.data[10])]);

    default:
      return op;
  }
}
export function remapValFlags(tmenv, x) {
  if (x.tag === 0) {
    return new ValUseFlag(0, remapType(tmenv, x.data));
  } else {
    return x;
  }
}
export function remapExprs(g, compgen, tmenv, es) {
  return List_1.mapq(function (arg30_) {
    return remapExpr(g, compgen, tmenv, arg30_);
  }, es);
}
export function remapFlatExprs(g, compgen, tmenv, es) {
  return List_1.mapq(function (arg30_) {
    return remapExpr(g, compgen, tmenv, arg30_);
  }, es);
}
export function remapDecisionTree(g, compgen, tmenv, x) {
  if (x.tag === 1) {
    return new DecisionTree(1, [remapFlatExprs(g, compgen, tmenv, x.data[0]), x.data[1]]);
  } else if (x.tag === 2) {
    const patternInput = copyAndRemapAndBindBinding(g, compgen, tmenv, x.data[0]);
    return new DecisionTree(2, [patternInput[0], remapDecisionTree(g, compgen, patternInput[1], x.data[1])]);
  } else {
    return new DecisionTree(0, [remapExpr(g, compgen, tmenv, x.data[0]), map(function (_arg2) {
      let test_;

      switch (_arg2.data[0].tag) {
        case 1:
          test_ = new DecisionTreeTest(1, [_arg2.data[0].data[0], remapType(tmenv, _arg2.data[0].data[1])]);
          break;

        case 2:
          test_ = _arg2.data[0];
          break;

        case 4:
          test_ = new DecisionTreeTest(4, [remapType(tmenv, _arg2.data[0].data[0]), remapType(tmenv, _arg2.data[0].data[1])]);
          break;

        case 3:
          test_ = new DecisionTreeTest(3);
          break;

        case 5:
          throw new Error("DecisionTreeTest.ActivePatternCase should only be used during pattern match compilation");
          break;

        default:
          test_ = new DecisionTreeTest(0, [remapUnionCaseRef(tmenv.tyconRefRemap, _arg2.data[0].data[0]), remapTypes(tmenv, _arg2.data[0].data[1])]);
      }

      return new DecisionTreeCase(0, [test_, remapDecisionTree(g, compgen, tmenv, _arg2.data[1])]);
    }, x.data[1]), defaultArg(x.data[2], null, function (x_1) {
      return remapDecisionTree(g, compgen, tmenv, x_1);
    }), x.data[3]]);
  }
}
export function copyAndRemapAndBindBinding(g, compgen, tmenv, bind) {
  const v = bind.Var;
  const patternInput = copyAndRemapAndBindVal(g, compgen, tmenv, v);
  return [remapAndRenameBind(g, compgen, patternInput[1], bind, patternInput[0]), patternInput[1]];
}
export function copyAndRemapAndBindBindings(g, compgen, tmenv, binds) {
  const patternInput = copyAndRemapAndBindVals(g, compgen, tmenv, valsOfBinds(binds));
  return [remapAndRenameBinds(g, compgen, patternInput[1], binds, patternInput[0]), patternInput[1]];
}
export function remapAndRenameBinds(g, compgen, tmenvinner, binds, vs_) {
  return toList(map2(function (arg30_, v_) {
    return remapAndRenameBind(g, compgen, tmenvinner, arg30_, v_);
  }, binds, vs_));
}
export function remapAndRenameBind(g, compgen, tmenvinner, _arg5, v_) {
  return new Binding(0, [v_, remapExpr(g, compgen, tmenvinner, _arg5.data[1]), _arg5.data[2]]);
}
export function remapMethod(g, compgen, tmenv, _arg6) {
  const attribs2 = function (xs) {
    return remapAttribs(g, tmenv, xs);
  }(_arg6.data[1]);

  const slotsig2 = remapSlotSig(function (xs_1) {
    return remapAttribs(g, tmenv, xs_1);
  }, tmenv, _arg6.data[0]);
  const patternInput = tmenvCopyRemapAndBindTypars(function (xs_2) {
    return remapAttribs(g, tmenv, xs_2);
  }, tmenv, _arg6.data[2]);
  const patternInput_1 = mapFold(function (tmenv_1, vs) {
    return copyAndRemapAndBindVals(g, compgen, tmenv_1, vs);
  }, patternInput[1], _arg6.data[3], ofArray);
  const e2 = remapExpr(g, compgen, patternInput_1[1], _arg6.data[4]);
  return new ObjExprMethod(0, [slotsig2, attribs2, patternInput[0], patternInput_1[0], e2, _arg6.data[5]]);
}
export function remapInterfaceImpl(g, compgen, tmenv, ty, overrides) {
  return [remapType(tmenv, ty), map(function (arg30_) {
    return remapMethod(g, compgen, tmenv, arg30_);
  }, overrides)];
}
export function remapRecdField(g, tmenv, x) {
  const rfield_type = function (arg20_) {
    return remapPossibleForallTy(g, tmenv, arg20_);
  }(x.rfield_type);

  const rfield_pattribs = function (xs) {
    return remapAttribs(g, tmenv, xs);
  }(x.rfield_pattribs);

  const rfield_fattribs = function (xs_1) {
    return remapAttribs(g, tmenv, xs_1);
  }(x.rfield_fattribs);

  return new RecdField(x.rfield_mutable, x.rfield_xmldoc, x.rfield_xmldocsig, rfield_type, x.rfield_static, x.rfield_volatile, x.rfield_secret, x.rfield_const, x.rfield_access, rfield_pattribs, rfield_fattribs, x.rfield_id, x.rfield_name_generated, x.rfield_other_range);
}
export function remapRecdFields(g, tmenv, x) {
  return MakeRecdFieldsTable(map(function (x_1) {
    return remapRecdField(g, tmenv, x_1);
  }, x.AllFieldsAsList));
}
export function remapUnionCase(g, tmenv, x) {
  const FieldTable = function (x_1) {
    return remapRecdFields(g, tmenv, x_1);
  }(x.FieldTable);

  const ReturnType = function (x_2) {
    return remapType(tmenv, x_2);
  }(x.ReturnType);

  const Attribs = function (xs) {
    return remapAttribs(g, tmenv, xs);
  }(x.Attribs);

  return new UnionCase(FieldTable, ReturnType, x.CompiledName, x.XmlDoc, x.XmlDocSig, x.Id, x.OtherRangeOpt, x.Accessibility, Attribs);
}
export function remapUnionCases(g, tmenv, x) {
  return MakeUnionCases(map(function (x_1) {
    return remapUnionCase(g, tmenv, x_1);
  }, x.UnionCasesAsList));
}
export function remapFsObjData(g, tmenv, x) {
  return new TyconObjModelData((() => {
    switch (x.fsobjmodel_kind.tag) {
      case 0:
      case 1:
      case 2:
      case 4:
        return x.fsobjmodel_kind;

      default:
        return new TyconObjModelKind(3, remapSlotSig(function (xs) {
          return remapAttribs(g, tmenv, xs);
        }, tmenv, x.fsobjmodel_kind.data));
    }
  })(), map(function (arg10_) {
    return remapValRef(tmenv, arg10_);
  }, x.fsobjmodel_vslots), function (x_1) {
    return remapRecdFields(g, tmenv, x_1);
  }(x.fsobjmodel_rfields));
}
export function remapTyconRepr(g, tmenv, repr) {
  switch (repr.tag) {
    case 1:
      return new TyconRepresentation(1, remapRecdFields(g, tmenv, repr.data));

    case 2:
      return new TyconRepresentation(2, remapUnionCases(g, tmenv, repr.data));

    case 3:
      throw new Error("cannot remap IL type definitions");

    case 6:
      return repr;

    case 4:
      return repr;

    case 5:
      return new TyconRepresentation(5, remapType(tmenv, repr.data));

    default:
      return new TyconRepresentation(0, remapFsObjData(g, tmenv, repr.data));
  }
}
export function remapTyconAug(tmenv, x) {
  var f1;
  var f2;
  var f1_1;
  var f2_1;
  var f1_2;
  var f2_2;
  var f3;
  var mapping;
  var f;
  const tcaug_equals = defaultArg(x.tcaug_equals, null, (f1 = function (arg10_) {
    return remapValRef(tmenv, arg10_);
  }, f2 = function (arg10__1) {
    return remapValRef(tmenv, arg10__1);
  }, function (tupledArg) {
    return mapPair(f1, f2, tupledArg[0], tupledArg[1]);
  }));
  const tcaug_compare = defaultArg(x.tcaug_compare, null, (f1_1 = function (arg10__2) {
    return remapValRef(tmenv, arg10__2);
  }, f2_1 = function (arg10__3) {
    return remapValRef(tmenv, arg10__3);
  }, function (tupledArg_1) {
    return mapPair(f1_1, f2_1, tupledArg_1[0], tupledArg_1[1]);
  }));
  const tcaug_compare_withc = defaultArg(x.tcaug_compare_withc, null, function (arg10__4) {
    return remapValRef(tmenv, arg10__4);
  });
  const tcaug_hash_and_equals_withc = defaultArg(x.tcaug_hash_and_equals_withc, null, (f1_2 = function (arg10__5) {
    return remapValRef(tmenv, arg10__5);
  }, f2_2 = function (arg10__6) {
    return remapValRef(tmenv, arg10__6);
  }, f3 = function (arg10__7) {
    return remapValRef(tmenv, arg10__7);
  }, function (tupledArg_2) {
    return mapTriple(f1_2, f2_2, f3, tupledArg_2[0], tupledArg_2[1], tupledArg_2[2]);
  }));
  const tcaug_adhoc = NameMapModule.map((mapping = function (arg10__8) {
    return remapValRef(tmenv, arg10__8);
  }, function (list) {
    return map(mapping, list);
  }), x.tcaug_adhoc);
  const tcaug_adhoc_list = map_2(function (tupledArg_3) {
    return [tupledArg_3[0], remapValRef(tmenv, tupledArg_3[1])];
  }, x.tcaug_adhoc_list);
  const tcaug_super = defaultArg(x.tcaug_super, null, function (x_1) {
    return remapType(tmenv, x_1);
  });
  const tcaug_interfaces = map((f = function (x_2) {
    return remapType(tmenv, x_2);
  }, function (tupledArg_4) {
    return map1Of3(f, tupledArg_4[0], tupledArg_4[1], tupledArg_4[2]);
  }), x.tcaug_interfaces);
  return new TyconAugmentation(tcaug_compare, tcaug_compare_withc, tcaug_equals, tcaug_hash_and_equals_withc, x.tcaug_hasObjectGetHashCode, tcaug_adhoc_list, tcaug_adhoc, tcaug_interfaces, tcaug_super, x.tcaug_closed, x.tcaug_abstract);
}
export function remapTyconExnInfo(g, tmenv, inp) {
  const $var110 = inp.tag === 2 ? [1] : inp.tag === 1 ? [2] : inp.tag === 3 ? [2] : [0];

  switch ($var110[0]) {
    case 0:
      return new ExceptionInfo(0, remapTyconRef(tmenv.tyconRefRemap, inp.data));

    case 1:
      return new ExceptionInfo(2, remapRecdFields(g, tmenv, inp.data));

    case 2:
      return inp;
  }
}
export function remapMemberInfo(g, m, topValInfo, ty, ty_, tmenv, x) {
  var remapAttrib_1;
  const patternInput = GetMemberTypeInFSharpForm(g, x.MemberFlags, getValue(topValInfo), ty, m);
  const patternInput_1 = GetMemberTypeInFSharpForm(g, x.MemberFlags, getValue(topValInfo), ty_, m);
  const patternInput_2 = mkTyparToTyparRenaming(patternInput[0], patternInput_1[0]);
  const tmenv_1 = new Remap(append(tmenv.tpinst, patternInput_2[0]), tmenv.valRemap, tmenv.tyconRefRemap, tmenv.removeTraitSolutions);
  return new ValMemberInfo(remapTyconRef(tmenv_1.tyconRefRemap, x.ApparentEnclosingEntity), map((remapAttrib_1 = function (xs) {
    return remapAttribs(g, tmenv_1, xs);
  }, function (arg20_) {
    return remapSlotSig(remapAttrib_1, tmenv_1, arg20_);
  }), x.ImplementedSlotSigs), x.IsImplemented, x.MemberFlags);
}
export function copyAndRemapAndBindModTy(g, compgen, tmenv, mty) {
  const tycons = allEntitiesOfModuleOrNamespaceTy(mty);
  const vs = allValsOfModuleOrNamespaceTy(mty);
  const patternInput = copyAndRemapAndBindTyconsAndVals(g, compgen, tmenv, tycons, vs);
  return [remapModTy(g, compgen, patternInput[2], mty), patternInput[2]];
}
export function remapModTy(_g, _compgen, tmenv, mty) {
  return mapImmediateValsAndTycons(function (x) {
    return renameTycon(tmenv, x);
  }, function (x_1) {
    return renameVal(tmenv, x_1);
  }, mty);
}
export function renameTycon(tyenv, x) {
  let tcref;

  try {
    const res = tyenv.tyconRefRemap.get_Item(mkLocalTyconRef(x));
    tcref = res;
  } catch (matchValue) {
    if (matchValue instanceof Error) {
      errorR(new InternalError("couldn't remap internal tycon " + showL(DebugPrint.tyconL(x)), x.Range));
      tcref = mkLocalTyconRef(x);
    } else {
      throw matchValue;
    }
  }

  return tcref.Deref;
}
export function renameVal(tmenv, x) {
  const matchValue = tmenv.valRemap.TryFind(x);

  if (matchValue == null) {
    return x;
  } else {
    return getValue(matchValue).Deref;
  }
}
export function copyTycon(compgen, tycon) {
  if (compgen.tag === 2) {
    return tycon;
  } else {
    return NewClonedTycon(tycon);
  }
}
export function copyAndRemapAndBindTyconsAndVals(g, compgen, tmenv, tycons, vs) {
  const tycons_ = map(function (tycon) {
    return copyTycon(compgen, tycon);
  }, tycons);
  const tmenvinner = bindTycons(tycons, tycons_, tmenv);
  const patternInput = copyAndRemapAndBindVals(g, compgen, tmenvinner, vs);

  const lookupVal = function (v) {
    let vref;

    try {
      const res = patternInput[1].valRemap.get_Item(v);
      vref = res;
    } catch (matchValue) {
      if (matchValue instanceof Error) {
        errorR(new InternalError(toText(printf("couldn't remap internal value '%s'"))(v.LogicalName), v.Range));
        vref = mkLocalValRef(v);
      } else {
        throw matchValue;
      }
    }

    return vref.Deref;
  };

  const lookupTycon = function (tycon_1) {
    let tcref;

    try {
      const res_1 = patternInput[1].tyconRefRemap.get_Item(mkLocalTyconRef(tycon_1));
      tcref = res_1;
    } catch (matchValue_1) {
      if (matchValue_1 instanceof Error) {
        errorR(new InternalError("couldn't remap internal tycon " + showL(DebugPrint.tyconL(tycon_1)), tycon_1.Range));
        tcref = mkLocalTyconRef(tycon_1);
      } else {
        throw matchValue_1;
      }
    }

    return tcref.Deref;
  };

  iterate2(function (tcd, tcd_) {
    const patternInput_1 = tmenvCopyRemapAndBindTypars(function (xs) {
      return remapAttribs(g, patternInput[1], xs);
    }, patternInput[1], tcd.entity_typars.Force(tcd.entity_range));
    tcd_.entity_typars = LazyWithContext.NotLazy(patternInput_1[0]);

    tcd_.entity_attribs = function (xs_1) {
      return remapAttribs(g, patternInput_1[1], xs_1);
    }(tcd.entity_attribs);

    tcd_.entity_tycon_repr = function (repr) {
      return remapTyconRepr(g, patternInput_1[1], repr);
    }(tcd.entity_tycon_repr);

    const typeAbbrevR = defaultArg(tcd.TypeAbbrev, null, function (x) {
      return remapType(patternInput_1[1], x);
    });

    tcd_.entity_tycon_tcaug = function (x_1) {
      return remapTyconAug(patternInput_1[1], x_1);
    }(tcd.entity_tycon_tcaug);

    tcd_.entity_modul_contents = new MaybeLazy(0, function (x_2) {
      return mapImmediateValsAndTycons(lookupTycon, lookupVal, x_2);
    }(tcd.entity_modul_contents.Value));

    const exnInfoR = function (inp) {
      return remapTyconExnInfo(g, patternInput_1[1], inp);
    }(tcd.ExceptionInfo);

    const matchValue_2 = tcd_.entity_opt_data;

    if (matchValue_2 != null) {
      tcd_.entity_opt_data = new EntityOptionalData(getValue(matchValue_2).entity_compiled_name, getValue(matchValue_2).entity_other_range, getValue(matchValue_2).entity_kind, getValue(matchValue_2).entity_xmldoc, getValue(matchValue_2).entity_xmldocsig, typeAbbrevR, getValue(matchValue_2).entity_tycon_repr_accessibility, getValue(matchValue_2).entity_accessiblity, exnInfoR);
    } else {
      tcd_.SetTypeAbbrev(typeAbbrevR);
      tcd_.SetExceptionInfo(exnInfoR);
    }
  }, tycons, tycons_);
  return [tycons_, patternInput[0], patternInput[1]];
}
export function allTyconsOfTycon(tycon) {
  return delay(function () {
    return append_1(singleton(tycon), delay(function () {
      return collect_1(function (nestedTycon) {
        return allTyconsOfTycon(nestedTycon);
      }, tycon.ModuleOrNamespaceType.AllEntities);
    }));
  });
}
export function allEntitiesOfModDef(mdef) {
  return delay(function () {
    switch (mdef.tag) {
      case 2:
        return empty();

      case 3:
        return empty();

      case 1:
        return collect_1(function (def) {
          return allEntitiesOfModDef(def);
        }, mdef.data);

      case 0:
        const mty = mdef.data.data[0];
        return allEntitiesOfModuleOrNamespaceTy(mty);

      default:
        return append_1(collect_1(function (tycon) {
          return allTyconsOfTycon(tycon);
        }, mdef.data[1]), delay(function () {
          return collect_1(function (mbind) {
            return mbind.tag === 1 ? append_1(singleton(mbind.data[0]), delay(function () {
              return allEntitiesOfModDef(mbind.data[1]);
            })) : empty();
          }, mdef.data[2]);
        }));
    }
  });
}
export function allValsOfModDef(mdef) {
  return delay(function () {
    switch (mdef.tag) {
      case 2:
        return singleton(mdef.data[0].Var);

      case 3:
        return empty();

      case 1:
        return collect_1(function (def) {
          return allValsOfModDef(def);
        }, mdef.data);

      case 0:
        const mty = mdef.data.data[0];
        return allValsOfModuleOrNamespaceTy(mty);

      default:
        return append_1(abstractSlotValsOfTycons(mdef.data[1]), delay(function () {
          return collect_1(function (mbind) {
            return mbind.tag === 1 ? allValsOfModDef(mbind.data[1]) : singleton(mbind.data.Var);
          }, mdef.data[2]);
        }));
    }
  });
}
export function remapAndBindModuleOrNamespaceExprWithSig(g, compgen, tmenv, _arg7) {
  const mdef = copyAndRemapModDef(g, compgen, tmenv, _arg7.data[1]);
  const patternInput = copyAndRemapAndBindModTy(g, compgen, tmenv, _arg7.data[0]);
  return [new ModuleOrNamespaceExprWithSig(0, [patternInput[0], mdef, _arg7.data[2]]), patternInput[1]];
}
export function remapModuleOrNamespaceExprWithSig(g, compgen, tmenv, _arg8) {
  const mdef = copyAndRemapModDef(g, compgen, tmenv, _arg8.data[1]);
  const mty = remapModTy(g, compgen, tmenv, _arg8.data[0]);
  return new ModuleOrNamespaceExprWithSig(0, [mty, mdef, _arg8.data[2]]);
}
export function copyAndRemapModDef(g, compgen, tmenv, mdef) {
  const tycons = toList(allEntitiesOfModDef(mdef));
  const vs = toList(allValsOfModDef(mdef));
  const patternInput = copyAndRemapAndBindTyconsAndVals(g, compgen, tmenv, tycons, vs);
  return remapAndRenameModDef(g, compgen, patternInput[2], mdef);
}
export function remapAndRenameModDefs(g, compgen, tmenv, x) {
  return map(function (mdef) {
    return remapAndRenameModDef(g, compgen, tmenv, mdef);
  }, x);
}
export function remapAndRenameModDef(g, compgen, tmenv, mdef) {
  switch (mdef.tag) {
    case 2:
      const v = mdef.data[0].Var;
      const bind = remapAndRenameBind(g, compgen, tmenv, mdef.data[0], renameVal(tmenv, v));
      return new ModuleOrNamespaceExpr(2, [bind, mdef.data[1]]);

    case 3:
      const e = remapExpr(g, compgen, tmenv, mdef.data[0]);
      return new ModuleOrNamespaceExpr(3, [e, mdef.data[1]]);

    case 1:
      const defs = remapAndRenameModDefs(g, compgen, tmenv, mdef.data);
      return new ModuleOrNamespaceExpr(1, defs);

    case 0:
      const mexpr = remapModuleOrNamespaceExprWithSig(g, compgen, tmenv, mdef.data);
      return new ModuleOrNamespaceExpr(0, mexpr);

    default:
      const tycons = map(function (x) {
        return renameTycon(tmenv, x);
      }, mdef.data[1]);
      const mbinds = map(function (x_1) {
        return remapAndRenameModBind(g, compgen, tmenv, x_1);
      }, mdef.data[2]);
      return new ModuleOrNamespaceExpr(4, [mdef.data[0], tycons, mbinds, mdef.data[3]]);
  }
}
export function remapAndRenameModBind(g, compgen, tmenv, x) {
  if (x.tag === 1) {
    const mspec = renameTycon(tmenv, x.data[0]);
    const def = remapAndRenameModDef(g, compgen, tmenv, x.data[1]);
    return new ModuleOrNamespaceBinding(1, [mspec, def]);
  } else {
    const v2 = function (x_1) {
      return renameVal(tmenv, x_1);
    }(valOfBind(x.data));

    const bind2 = remapAndRenameBind(g, compgen, tmenv, x.data, v2);
    return new ModuleOrNamespaceBinding(0, bind2);
  }
}
export function remapImplFile(g, compgen, tmenv, mv) {
  return mapAccImplFile(function (tmenv_1, arg30_) {
    return remapAndBindModuleOrNamespaceExprWithSig(g, compgen, tmenv_1, arg30_);
  }, tmenv, mv);
}
export function copyModuleOrNamespaceType(g, compgen, mtyp) {
  return copyAndRemapAndBindModTy(g, compgen, Remap.Empty, mtyp)[0];
}
export function copyExpr(g, compgen, e) {
  return remapExpr(g, compgen, Remap.Empty, e);
}
export function copyImplFile(g, compgen, e) {
  return remapImplFile(g, compgen, Remap.Empty, e)[0];
}
export function instExpr(g, tpinst, e) {
  return remapExpr(g, new ValCopyFlag(0), mkInstRemap(tpinst), e);
}
export function remarkExpr(m, x) {
  switch (x.tag) {
    case 4:
      return new Expr(4, [x.data[0], x.data[1], remarkExpr(m, x.data[2]), m, x.data[4]]);

    case 13:
      return new Expr(13, [x.data[0], remarkExpr(m, x.data[1]), m]);

    case 6:
      return new Expr(6, [remarkBinds(m, x.data[0]), remarkExpr(m, x.data[1]), m, x.data[3]]);

    case 7:
      return new Expr(7, [remarkBind(m, x.data[0]), remarkExpr(m, x.data[1]), m, x.data[3]]);

    case 9:
      return primMkMatch(new SequencePointInfoForBinding(4), m, remarkDecisionTree(m, x.data[2]), map_1(function (_arg1) {
        return new DecisionTreeTarget(0, [_arg1.data[0], remarkExpr(m, _arg1.data[1]), new SequencePointInfoForTarget(1)]);
      }, x.data[3], Array), m, x.data[5]);

    case 1:
      return new Expr(1, [x.data[0], x.data[1], m]);

    case 12:
      return new Expr(12, [remarkExpr(m, x.data[0]), x.data[1], x.data[2], m, x.data[4]]);

    case 8:
      return new Expr(8, [x.data[0], x.data[1], x.data[2], remarkExpr(m, x.data[3]), map(function (arg10_) {
        return remarkObjExprMethod(m, arg10_);
      }, x.data[4]), map(function (tupledArg) {
        return remarkInterfaceImpl(m, tupledArg[0], tupledArg[1]);
      }, x.data[5]), m]);

    case 11:
      const op = x.data[0].tag === 9 ? new TOp(9, [new SequencePointInfoForTry(2), new SequencePointInfoForFinally(1)]) : x.data[0].tag === 8 ? new TOp(8, [new SequencePointInfoForTry(2), new SequencePointInfoForWith(1)]) : x.data[0];
      return new Expr(11, [op, x.data[1], remarkExprs(m, x.data[2]), m]);

    case 14:
      x.data.contents = remarkExpr(m, x.data.contents);
      return x;

    case 5:
      return new Expr(5, [remarkExpr(m, x.data[0]), x.data[1], x.data[2], remarkExprs(m, x.data[3]), m]);

    case 2:
      return new Expr(2, [remarkExpr(m, x.data[0]), remarkExpr(m, x.data[1]), x.data[2], new SequencePointInfoForSeq(1), m]);

    case 10:
      return new Expr(10, [x.data[0], remarkExpr(m, x.data[1]), remarkExpr(m, x.data[2]), m]);

    case 0:
      return new Expr(0, [x.data[0], m, x.data[2]]);

    default:
      return new Expr(3, [x.data[0], x.data[1], x.data[2], x.data[3], remarkExpr(m, x.data[4]), m, x.data[6]]);
  }
}
export function remarkObjExprMethod(m, _arg1) {
  return new ObjExprMethod(0, [_arg1.data[0], _arg1.data[1], _arg1.data[2], _arg1.data[3], remarkExpr(m, _arg1.data[4]), m]);
}
export function remarkInterfaceImpl(m, ty, overrides) {
  return [ty, map(function (arg10_) {
    return remarkObjExprMethod(m, arg10_);
  }, overrides)];
}
export function remarkExprs(m, es) {
  return map(function (arg10_) {
    return remarkExpr(m, arg10_);
  }, es);
}
export function remarkFlatExprs(m, es) {
  return map(function (arg10_) {
    return remarkExpr(m, arg10_);
  }, es);
}
export function remarkDecisionTree(m, x) {
  if (x.tag === 1) {
    return new DecisionTree(1, [remarkFlatExprs(m, x.data[0]), x.data[1]]);
  } else if (x.tag === 2) {
    return new DecisionTree(2, [remarkBind(m, x.data[0]), remarkDecisionTree(m, x.data[1])]);
  } else {
    return new DecisionTree(0, [remarkExpr(m, x.data[0]), map(function (_arg2) {
      return new DecisionTreeCase(0, [_arg2.data[0], remarkDecisionTree(m, _arg2.data[1])]);
    }, x.data[1]), defaultArg(x.data[2], null, function (x_1) {
      return remarkDecisionTree(m, x_1);
    }), m]);
  }
}
export function remarkBinds(m, binds) {
  return map(function (arg10_) {
    return remarkBind(m, arg10_);
  }, binds);
}
export function remarkBind(m, _arg2) {
  return new Binding(0, [_arg2.data[0], remarkExpr(m, _arg2.data[1]), new SequencePointInfoForBinding(3)]);
}
export function isRecdOrStructFieldAllocObservable(f) {
  if (!f.IsStatic) {
    return f.IsMutable;
  } else {
    return false;
  }
}
export function isUnionCaseAllocObservable(uc) {
  return function (array) {
    return array.some(function (f) {
      return isRecdOrStructFieldAllocObservable(f);
    });
  }(uc.FieldTable.FieldsByIndex);
}
export function isUnionCaseRefAllocObservable(uc) {
  return isUnionCaseAllocObservable(uc.UnionCase);
}
export function isRecdOrUnionOrStructTyconAllocObservable(_g, tycon) {
  if (tycon.IsUnionTycon) {
    return function (array) {
      return array.some(function (uc) {
        return isUnionCaseAllocObservable(uc);
      });
    }(tycon.UnionCasesArray);
  } else if (tycon.IsRecordTycon ? true : tycon.IsStructOrEnumTycon) {
    return function (array_1) {
      return array_1.some(function (f) {
        return isRecdOrStructFieldAllocObservable(f);
      });
    }(tycon.AllFieldsArray);
  } else {
    return false;
  }
}
export function isRecdOrUnionOrStructTyconRefAllocObservable(g, tcr) {
  return isRecdOrUnionOrStructTyconAllocObservable(g, tcr.Deref);
}
export function isExnAllocObservable(_ecref) {
  return true;
}
export function isUnionCaseFieldMutable(g, ucref, n) {
  if ((g.compilingFslib ? tyconRefEq(g, ucref.TyconRef, g.list_tcr_canon) : false) ? n === 1 : false) {
    return true;
  } else {
    return ucref.FieldByIndex(n).IsMutable;
  }
}
export function isExnFieldMutable(ecref, n) {
  if (n < 0 ? true : n >= recdFieldsOfExnDefRef(ecref).length) {
    errorR(new InternalError(toText(printf("isExnFieldMutable, exnc = %s, n = %d"))(ecref.LogicalName, n), ecref.Range));
  }

  return recdFieldOfExnDefRefByIdx(ecref, n).IsMutable;
}
export function useGenuineField(tycon, f) {
  if ((f.LiteralValue != null ? true : tycon.IsEnumTycon) ? true : f.rfield_secret) {
    return true;
  } else if (!f.IsStatic ? f.rfield_mutable : false) {
    return !tycon.IsRecordTycon;
  } else {
    return false;
  }
}
export function ComputeFieldName(tycon, f) {
  if (useGenuineField(tycon, f)) {
    return f.rfield_id.idText;
  } else {
    return CompilerGeneratedName(f.rfield_id.idText);
  }
}
export function isQuotedExprTy(g, ty) {
  const activePatternResult27936 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(ty);

  if (activePatternResult27936 != null) {
    return tyconRefEq(g, getValue(activePatternResult27936)[0], g.expr_tcr);
  } else {
    return false;
  }
}
export function destQuotedExprTy(g, ty) {
  let $var111;

  const activePatternResult27940 = function (arg10_) {
    return _AppTy___(g, arg10_);
  }(ty);

  if (activePatternResult27940 != null) {
    if (getValue(activePatternResult27940)[1].tail != null) {
      if (getValue(activePatternResult27940)[1].tail.tail == null) {
        $var111 = [0, getValue(activePatternResult27940)[1].head];
      } else {
        $var111 = [1];
      }
    } else {
      $var111 = [1];
    }
  } else {
    $var111 = [1];
  }

  switch ($var111[0]) {
    case 0:
      return $var111[1];

    case 1:
      throw new Error("destQuotedExprTy");
  }
}
export function mkQuotedExprTy(g, ty) {
  return new TType(1, [g.expr_tcr, ofArray([ty])]);
}
export function mkRawQuotedExprTy(g) {
  return new TType(1, [g.raw_expr_tcr, new List()]);
}
export function mkAnyTupledTy(g, tupInfo, tys) {
  if (tys.tail != null) {
    if (tys.tail.tail == null) {
      return tys.head;
    } else {
      return new TType(2, [tupInfo, tys]);
    }
  } else {
    return g.unit_ty;
  }
}
export function mkRefTupledTy(g, tys) {
  return mkAnyTupledTy(g, tupInfoRef, tys);
}
export function mkRefTupledVarsTy(g, vs) {
  return mkRefTupledTy(g, typesOfVals(vs));
}
export function mkMethodTy(g, argtys, rty) {
  return mkIteratedFunTy(map(function (arg10_) {
    return mkRefTupledTy(g, arg10_);
  }, argtys), rty);
}
export function mkArrayType(g, ty) {
  return new TType(1, [g.array_tcr_nice, ofArray([ty])]);
}
export function mkByteArrayTy(g) {
  return mkArrayType(g, g.byte_ty);
}
export function tyOfExpr(g, e) {
  tyOfExpr: while (true) {
    const $var112 = e.tag === 8 ? [1, e.data[1]] : e.tag === 9 ? [1, e.data[5]] : e.tag === 12 ? [1, e.data[4]] : e.tag === 0 ? [1, e.data[2]] : e.tag === 1 ? [2] : e.tag === 2 ? [3] : e.tag === 3 ? [4] : e.tag === 4 ? [5] : e.tag === 7 ? [6, e.data[1]] : e.tag === 13 ? [6, e.data[1]] : e.tag === 14 ? [6, e.data.contents] : e.tag === 10 ? [6, e.data[2]] : e.tag === 6 ? [6, e.data[1]] : e.tag === 11 ? [7] : [0];

    switch ($var112[0]) {
      case 0:
        return applyTys(g, e.data[1], e.data[2], e.data[3]);

      case 1:
        return $var112[1];

      case 2:
        return e.data[0].Type;

      case 3:
        g = g;
        e = e.data[2].tag === 1 ? e.data[0] : e.data[1];
        continue tyOfExpr;

      case 4:
        return op_MinusMinusGreater(mkRefTupledVarsTy(g, e.data[3]), e.data[6]);

      case 5:
        return op_PlusMinusGreater(e.data[1], e.data[4]);

      case 6:
        g = g;
        e = $var112[1];
        continue tyOfExpr;

      case 7:
        const $var113 = e.data[0].tag === 31 ? [1, e.data[0].data[10]] : e.data[0].tag === 22 ? [1, e.data[0].data[1]] : e.data[0].tag === 0 ? [2, e.data[0].data] : e.data[0].tag === 15 ? [3, e.data[0].data] : e.data[0].tag === 10 ? [4, e.data[0].data[1]] : e.data[0].tag === 1 ? [5] : e.data[0].tag === 4 ? [6] : e.data[0].tag === 5 ? [7] : e.data[0].tag === 21 ? [8, e.data[0].data[1]] : e.data[0].tag === 2 ? [9, e.data[0].data] : e.data[0].tag === 7 ? [10] : e.data[0].tag === 6 ? [10] : e.data[0].tag === 3 ? [11] : e.data[0].tag === 8 ? [12] : e.data[0].tag === 9 ? [12] : e.data[0].tag === 13 ? [13, e.data[0].data] : e.data[0].tag === 12 ? [14, e.data[0].data] : e.data[0].tag === 11 ? [15] : e.data[0].tag === 18 ? [15] : e.data[0].tag === 20 ? [15] : e.data[0].tag === 30 ? e.data[0].data[0].tag === 3 ? [15] : e.data[0].data[0].tag === 1 ? [20, e.data[0].data[1]] : e.data[0].data[0].tag === 0 ? [21, e.data[0].data[1]] : [15] : e.data[0].tag === 14 ? [16] : e.data[0].tag === 17 ? [17, e.data[0].data[0], e.data[0].data[1]] : e.data[0].tag === 16 ? [18, e.data[0].data[0], e.data[0].data[1]] : e.data[0].tag === 19 ? [19, e.data[0].data[0], e.data[0].data[1]] : e.data[0].tag === 23 ? [22] : e.data[0].tag === 29 ? [23, e.data[0].data.data[4]] : e.data[0].tag === 25 ? [24] : e.data[0].tag === 27 ? [25] : e.data[0].tag === 28 ? [25] : e.data[0].tag === 26 ? [25] : [0];

        switch ($var113[0]) {
          case 0:
            const $var114 = e.data[1].tail != null ? e.data[1].tail.tail != null ? e.data[1].tail.tail.tail == null ? [0, e.data[1].tail.head, e.data[1].head] : [1] : [1] : [1];

            switch ($var114[0]) {
              case 0:
                return $var114[2];

              case 1:
                throw new Error("bad TOp.Coerce node");
            }

          case 1:
            const $var115 = $var113[1].tail != null ? $var113[1].tail.tail == null ? [0, $var113[1].head] : [1] : [1];

            switch ($var115[0]) {
              case 0:
                return $var115[1];

              case 1:
                return g.unit_ty;
            }

          case 2:
            return actualResultTyOfUnionCase(e.data[1], $var113[1]);

          case 3:
            return mkProvenUnionCaseTy($var113[1], e.data[1]);

          case 4:
            return mkAppTy($var113[1], e.data[1]);

          case 5:
            return g.exn_ty;

          case 6:
            return mkByteArrayTy(g);

          case 7:
            return mkArrayType(g, g.uint16_ty);

          case 8:
            return item($var113[1], e.data[1]);

          case 9:
            return mkAnyTupledTy(g, $var113[1], e.data[1]);

          case 10:
            return g.unit_ty;

          case 11:
            const $var116 = e.data[1].tail != null ? e.data[1].tail.tail == null ? [0, e.data[1].head] : [1] : [1];

            switch ($var116[0]) {
              case 0:
                return mkArrayType(g, $var116[1]);

              case 1:
                throw new Error("bad TOp.Array node");
            }

          case 12:
            const $var117 = e.data[1].tail != null ? e.data[1].tail.tail == null ? [0, e.data[1].head] : [1] : [1];

            switch ($var117[0]) {
              case 0:
                return $var117[1];

              case 1:
                throw new Error("bad TOp_try node");
            }

          case 13:
            return mkByrefTy(g, actualTyOfRecdFieldRef($var113[1], e.data[1]));

          case 14:
            return actualTyOfRecdFieldRef($var113[1], e.data[1]);

          case 15:
            return g.unit_ty;

          case 16:
            return g.int_ty;

          case 17:
            return mkByrefTy(g, actualTyOfRecdField(mkTyconRefInst($var113[1].TyconRef, e.data[1]), $var113[1].FieldByIndex($var113[2])));

          case 18:
            return actualTyOfRecdField(mkTyconRefInst($var113[1].TyconRef, e.data[1]), $var113[1].FieldByIndex($var113[2]));

          case 19:
            return recdFieldTyOfExnDefRefByIdx($var113[1], $var113[2]);

          case 20:
            return destByrefTy(g, $var113[1].Type);

          case 21:
            return mkByrefTy(g, $var113[1].Type);

          case 22:
            const $var118 = e.data[1].tail != null ? e.data[1].tail.tail == null ? [0, e.data[1].head] : [1] : [1];

            switch ($var118[0]) {
              case 0:
                return mkByrefTy(g, $var118[1]);

              case 1:
                throw new Error("bad TOp.RefAddrGet node");
            }

          case 23:
            return GetFSharpViewOfReturnType(g, $var113[1]);

          case 24:
            const $var119 = e.data[1].tail != null ? e.data[1].tail.tail == null ? [0, e.data[1].head] : [1] : [1];

            switch ($var119[0]) {
              case 0:
                return $var119[1];

              case 1:
                throw new Error("bad TOp.Reraise node");
            }

          case 25:
            return g.unit_ty;
        }

    }
  }
}
export function primMkApp(tupledArg, tyargs, argsl, m) {
  return new Expr(5, [tupledArg[0], tupledArg[1], tyargs, argsl, m]);
}
export function isExpansiveUnderInstantiation(g, fty0, tyargs, pargs, argsl) {
  if (isForallTy(g, fty0)) {
    const fty1 = formalApplyTys(g, fty0, tyargs, pargs);

    if (!isFunTy(g, fty1)) {
      return true;
    } else {
      const loop = function (fty, xs) {
        loop: while (true) {
          if (xs.tail != null) {
            if (!isFunTy(g, fty)) {
              return true;
            } else {
              fty = rangeOfFunTy(g, fty);
              xs = xs.tail;
              continue loop;
            }
          } else {
            return false;
          }
        }
      };

      return loop(fty1, argsl);
    }
  } else {
    return false;
  }
}
export function mkExprApplAux(g, f, fty, argsl, m) {
  if (argsl.tail == null) {
    return f;
  } else {
    const $var120 = f.tag === 5 ? ((f.data[3].tail == null ? true : (() => {
      const matchValue = stripExpr(f.data[0]);

      if (matchValue.tag === 1) {
        const matchValue_1 = matchValue.data[0].ValReprInfo;

        if (matchValue_1 == null) {
          return false;
        } else {
          return getValue(matchValue_1).NumCurriedArgs > f.data[3].length;
        }
      } else {
        return false;
      }
    })()) ? !isExpansiveUnderInstantiation(g, f.data[1], f.data[2], f.data[3], argsl) : false) ? [0, f.data[0], f.data[1], f.data[4], f.data[3], f.data[2]] : [1] : [1];

    switch ($var120[0]) {
      case 0:
        return primMkApp([$var120[1], $var120[2]], $var120[5], append($var120[4], argsl), unionRanges($var120[3], m));

      case 1:
        if (!isFunTy(g, fty)) {
          error(new InternalError("expected a function type", m));
        }

        return primMkApp([f, fty], new List(), argsl, m);
    }
  }
}
export function mkAppsAux(g, f, fty, tyargsl, argsl, m) {
  mkAppsAux: while (true) {
    if (tyargsl.tail == null) {
      return mkExprApplAux(g, f, fty, argsl, m);
    } else if (tyargsl.head.tail == null) {
      g = g;
      f = f;
      fty = fty;
      tyargsl = tyargsl.tail;
      argsl = argsl;
      m = m;
      continue mkAppsAux;
    } else {
      const arfty = applyForallTy(g, fty, tyargsl.head);
      g = g;
      f = primMkApp([f, fty], tyargsl.head, new List(), m);
      fty = arfty;
      tyargsl = tyargsl.tail;
      argsl = argsl;
      m = m;
      continue mkAppsAux;
    }
  }
}
export function mkApps(g, _arg1, tyargsl, argl, m) {
  return mkAppsAux(g, _arg1[0], _arg1[1], tyargsl, argl, m);
}
export function mkTyAppExpr(m, f, fty, tyargs) {
  if (tyargs.tail == null) {
    return f;
  } else {
    return primMkApp([f, fty], tyargs, new List(), m);
  }
}
export function accTargetsOfDecisionTree(tree, acc) {
  accTargetsOfDecisionTree: while (true) {
    if (tree.tag === 1) {
      return new List(tree.data[1], acc);
    } else if (tree.tag === 2) {
      tree = tree.data[1];
      acc = acc;
      continue accTargetsOfDecisionTree;
    } else {
      return foldBack(CurriedLambda(function (c) {
        const arg00_ = c.CaseTree;
        return function (arg10_) {
          return accTargetsOfDecisionTree(arg00_, arg10_);
        };
      }), tree.data[1], foldBack(function (arg00__1, arg10__1) {
        return accTargetsOfDecisionTree(arg00__1, arg10__1);
      }, defaultArg(tree.data[2], [], $var121 => [$var121]), acc));
    }
  }
}
export function mapAccTipsOfDecisionTree(f, tree) {
  if (tree.tag === 1) {
    return f(tree.data[0], tree.data[1]);
  } else if (tree.tag === 2) {
    return new DecisionTree(2, [tree.data[0], mapAccTipsOfDecisionTree(f, tree.data[1])]);
  } else {
    return new DecisionTree(0, [tree.data[0], map(function (arg10_) {
      return mapAccTipsOfEdge(f, arg10_);
    }, tree.data[1]), defaultArg(tree.data[2], null, function (tree_1) {
      return mapAccTipsOfDecisionTree(f, tree_1);
    }), tree.data[3]]);
  }
}
export function mapAccTipsOfEdge(f, _arg1) {
  return new DecisionTreeCase(0, [_arg1.data[0], mapAccTipsOfDecisionTree(f, _arg1.data[1])]);
}
export function mapTargetsOfDecisionTree(f, tree) {
  return mapAccTipsOfDecisionTree(function (es, i) {
    return new DecisionTree(1, [es, f(i)]);
  }, tree);
}
export function eliminateDeadTargetsFromMatch(tree, targets) {
  const used = Int32Array.from(ListSet.setify(function (x, y) {
    return x === y;
  }, accTargetsOfDecisionTree(tree, new List())));

  if (used.length < targets.length) {
    used.sort();
    const ntargets = targets.length | 0;
    let tree_;
    const remap = Int32Array.from(replicate(ntargets, -1));
    iterateIndexed(function (i, tgn) {
      remap[tgn] = i | 0;
    }, used);
    tree_ = mapTargetsOfDecisionTree(function (tgn_1) {
      if (remap[tgn_1] === -1) {
        throw new Error("eliminateDeadTargetsFromMatch: failure while eliminating unused targets");
      }

      return remap[tgn_1] | 0;
    }, tree);
    const targets_ = map_1(function (index) {
      return targets[index];
    }, used, Array);
    return [tree_, targets_];
  } else {
    return [tree, targets];
  }
}
export function targetOfSuccessDecisionTree(tree) {
  targetOfSuccessDecisionTree: while (true) {
    if (tree.tag === 1) {
      return tree.data[1];
    } else if (tree.tag === 2) {
      tree = tree.data[1];
      continue targetOfSuccessDecisionTree;
    } else {
      return null;
    }
  }
}
export function decisionTreeHasNonTrivialBindings(tree) {
  if (tree.tag === 1) {
    return false;
  } else if (tree.tag === 2) {
    return targetOfSuccessDecisionTree(tree.data[1]) == null;
  } else if (exists(function (c) {
    return decisionTreeHasNonTrivialBindings(c.CaseTree);
  }, tree.data[1])) {
    return true;
  } else {
    return exists(function (tree_1) {
      return decisionTreeHasNonTrivialBindings(tree_1);
    }, defaultArg(tree.data[2], [], $var122 => [$var122]));
  }
}
export function foldLinearBindingTargetsOfMatch(tree, targets) {
  if (decisionTreeHasNonTrivialBindings(tree)) {
    return [tree, targets];
  } else {
    const branchesToTargets = Array.from(replicate(targets.length, new List()));

    const accumulateTipsOfDecisionTree = function (accBinds, tree_1) {
      if (tree_1.tag === 1) {
        branchesToTargets[tree_1.data[1]] = new List([reverse(accBinds), tree_1.data[0]], branchesToTargets[tree_1.data[1]]);
      } else if (tree_1.tag === 2) {
        accumulateTipsOfDecisionTree(new List(tree_1.data[0], accBinds), tree_1.data[1]);
      } else {
        for (let edge of tree_1.data[1]) {
          accumulateTipsOfDecisionTree(accBinds, edge.CaseTree);
        }

        if (tree_1.data[2] != null) {
          accumulateTipsOfDecisionTree(accBinds, getValue(tree_1.data[2]));
        }
      }
    };

    accumulateTipsOfDecisionTree(new List(), tree);

    const isLinearTarget = function (bs) {
      const $var123 = bs.tail != null ? bs.tail.tail == null ? [0] : [1] : [1];

      switch ($var123[0]) {
        case 0:
          return true;

        case 1:
          return false;
      }
    };

    const isLinearTgtIdx = function (i) {
      return isLinearTarget(branchesToTargets[i]);
    };

    const getLinearTgtIdx = function (i_1) {
      return branchesToTargets[i_1].head;
    };

    const hasLinearTgtIdx = branchesToTargets.some(isLinearTarget);

    if (!hasLinearTgtIdx) {
      return [tree, targets];
    } else {
      const rebuildDecisionTree = function (tree_2) {
        const matchValue = targetOfSuccessDecisionTree(tree_2);
        const $var124 = matchValue != null ? isLinearTgtIdx(getValue(matchValue)) ? [0, getValue(matchValue)] : [1] : [1];

        switch ($var124[0]) {
          case 0:
            return new DecisionTree(1, [new List(), $var124[1]]);

          case 1:
            if (tree_2.tag === 1) {
              return tree_2;
            } else if (tree_2.tag === 2) {
              return tree_2;
            } else {
              return new DecisionTree(0, [tree_2.data[0], map(rebuildDecisionTreeEdge, tree_2.data[1]), defaultArg(tree_2.data[2], null, rebuildDecisionTree), tree_2.data[3]]);
            }

        }
      };

      const rebuildDecisionTreeEdge = function (_arg1) {
        return new DecisionTreeCase(0, [_arg1.data[0], rebuildDecisionTree(_arg1.data[1])]);
      };

      const tree_ = rebuildDecisionTree(tree);
      const targets_ = mapIndexed_1(function (i_2, _arg1_1) {
        if (isLinearTgtIdx(i_2)) {
          const patternInput = getLinearTgtIdx(i_2);
          const mTarget = Expr_get_Range.bind(_arg1_1.data[1])();
          const es = map(function (arg10_) {
            return remarkExpr(mTarget, arg10_);
          }, patternInput[1]);
          return new DecisionTreeTarget(0, [new List(), mkLetsBind(mTarget, patternInput[0], mkInvisibleLetsFromBindings(mTarget, _arg1_1.data[0], es, _arg1_1.data[1])), _arg1_1.data[2]]);
        } else {
          return _arg1_1;
        }
      }, targets, Array);
      return [tree_, targets_];
    }
  }
}
export function simplifyTrivialMatch(spBind, exprm, matchm, ty, tree, targets) {
  if (tree.tag === 1) {
    if (tree.data[1] >= targets.length) {
      throw new Error("simplifyTrivialMatch: target out of range");
    }

    const patternInput = targets[tree.data[1]];

    if (patternInput.data[0].length !== tree.data[0].length) {
      throw new Error("simplifyTrivialMatch: invalid argument, n = " + tree.data[1].toString() + ", List.length targets = " + targets.length.toString());
    }

    return mkInvisibleLetsFromBindings(Expr_get_Range.bind(patternInput.data[1])(), patternInput.data[0], tree.data[0], patternInput.data[1]);
  } else {
    return primMkMatch(spBind, exprm, tree, targets, matchm, ty);
  }
}
export function mkAndSimplifyMatch(spBind, exprm, matchm, ty, tree, targets) {
  const targets_1 = Array.from(targets);

  if (tree.tag === 1) {
    return simplifyTrivialMatch(spBind, exprm, matchm, ty, tree, targets_1);
  } else {
    const patternInput = eliminateDeadTargetsFromMatch(tree, targets_1);
    const patternInput_1 = foldLinearBindingTargetsOfMatch(patternInput[0], patternInput[1]);
    return simplifyTrivialMatch(spBind, exprm, matchm, ty, patternInput_1[0], patternInput_1[1]);
  }
}
export class Mutates {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.Mutates",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["DefinitelyMutates"], ["PossiblyMutates"], ["NeverMutates"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.Mutates", Mutates);
export class DefensiveCopyWarning extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, DefensiveCopyWarning.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.DefensiveCopyWarning",
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
setType("Microsoft.FSharp.Compiler.Tastops.DefensiveCopyWarning", DefensiveCopyWarning);
export function isRecdOrStructTyImmutable(g, ty) {
  const matchValue = tryDestAppTy(g, ty);

  if (matchValue != null) {
    if (!isRecdOrUnionOrStructTyconRefAllocObservable(g, getValue(matchValue)) ? true : tyconRefEq(g, getValue(matchValue), g.decimal_tcr)) {
      return true;
    } else {
      return tyconRefEq(g, getValue(matchValue), g.date_tcr);
    }
  } else {
    return false;
  }
}
export function CanTakeAddressOfImmutableVal(g, v, mut) {
  if (!v.IsMutable ? !v.IsMemberOrModuleBinding : false) {
    if (mut.tag === 1) {
      return isRecdOrStructTyImmutable(g, v.Type);
    } else if (mut.tag === 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
export function MustTakeAddressOfVal(g, v) {
  if (v.IsMutable) {
    return valRefInThisAssembly(g.compilingFslib, v);
  } else {
    return false;
  }
}
export function MustTakeAddressOfRecdField(rf) {
  if (!rf.IsStatic) {
    return rf.IsMutable;
  } else {
    return false;
  }
}
export function MustTakeAddressOfRecdFieldRef(rfref) {
  return MustTakeAddressOfRecdField(rfref.RecdField);
}
export function CanTakeAddressOfRecdFieldRef(g, rfref, mut, tinst) {
  if (!mut.Equals(new Mutates(0)) ? entityRefInThisAssembly(g.compilingFslib, rfref.TyconRef) : false) {
    return isRecdOrStructTyImmutable(g, actualTyOfRecdFieldRef(rfref, tinst));
  } else {
    return false;
  }
}
export function CanTakeAddressOfUnionFieldRef(g, uref, mut, tinst, cidx) {
  if (!mut.Equals(new Mutates(0)) ? entityRefInThisAssembly(g.compilingFslib, uref.TyconRef) : false) {
    return isRecdOrStructTyImmutable(g, actualTyOfUnionFieldRef(uref, cidx, tinst));
  } else {
    return false;
  }
}
export function mkExprAddrOfExprAux(g, mustTakeAddress, useReadonlyForGenericArrayAddress, mut, e, addrExprVal, m) {
  var rfref_1;
  var e_2;
  var uref;
  var e_1;
  var cidx;
  var rfref;
  var vf_1;
  var nexpr;
  var elemTy_1;
  var aexpr_1;
  var vf;
  var elemTy;
  var args;
  var aexpr;

  if (!mustTakeAddress) {
    return [null, e];
  } else {
    const $var125 = e.tag === 11 ? e.data[0].tag === 30 ? e.data[0].data[0].tag === 1 ? e.data[2].tail == null ? [0, e.data[3], e.data[0].data[1]] : [2] : [2] : [2] : e.tag === 1 ? (MustTakeAddressOfVal(g, e.data[0]) ? true : CanTakeAddressOfImmutableVal(g, e.data[0], mut)) ? [1, e.data[2], e.data[0]] : [2] : [2];

    switch ($var125[0]) {
      case 0:
        return [null, exprForValRef($var125[1], $var125[2])];

      case 1:
        return [null, mkValAddr($var125[1], $var125[2])];

      case 2:
        const $var126 = e.tag === 11 ? e.data[0].tag === 12 ? e.data[2].tail != null ? e.data[2].tail.tail == null ? (rfref_1 = e.data[0].data, e_2 = e.data[2].head, MustTakeAddressOfRecdFieldRef(rfref_1) ? true : CanTakeAddressOfRecdFieldRef(g, rfref_1, mut, e.data[1])) ? [0, e.data[2].head, e.data[3], e.data[0].data, e.data[1]] : [1] : [1] : [1] : [1] : [1];

        switch ($var126[0]) {
          case 0:
            const exprty = tyOfExpr(g, $var126[1]);
            const patternInput = mkExprAddrOfExprAux(g, isStructTy(g, exprty), false, mut, $var126[1], null, $var126[2]);
            return [patternInput[0], mkRecdFieldGetAddrViaExprAddr(patternInput[1], $var126[3], $var126[4], $var126[2])];

          case 1:
            const $var127 = e.tag === 11 ? e.data[0].tag === 16 ? e.data[2].tail != null ? e.data[2].tail.tail == null ? (uref = e.data[0].data[0], e_1 = e.data[2].head, cidx = e.data[0].data[1] | 0, MustTakeAddressOfRecdField(uref.FieldByIndex(cidx)) ? true : CanTakeAddressOfUnionFieldRef(g, uref, mut, e.data[1], cidx)) ? [0, e.data[0].data[1], e.data[2].head, e.data[3], e.data[1], e.data[0].data[0]] : [1] : [1] : [1] : [1] : [1];

            switch ($var127[0]) {
              case 0:
                const exprty_1 = tyOfExpr(g, $var127[2]);
                const patternInput_1 = mkExprAddrOfExprAux(g, isStructTy(g, exprty_1), false, mut, $var127[2], null, $var127[3]);
                return [patternInput_1[0], mkUnionCaseFieldGetAddrProvenViaExprAddr(patternInput_1[1], $var127[5], $var127[4], $var127[1], $var127[3])];

              case 1:
                const $var128 = e.tag === 11 ? e.data[0].tag === 22 ? e.data[0].data[0].tail != null ? e.data[0].data[0].head.tag === 59 ? e.data[0].data[0].tail.tail == null ? e.data[0].data[1].tail != null ? e.data[0].data[1].tail.tail == null ? e.data[2].tail == null ? [0, e.data[0].data[0].head.data[0], e.data[0].data[0].head.data[1], e.data[3], e.data[1], e.data[0].data[1].head] : [3] : [3] : [3] : [3] : e.data[0].data[0].head.tag === 60 ? e.data[0].data[0].tail.tail == null ? e.data[0].data[1].tail != null ? e.data[0].data[1].tail.tail == null ? e.data[2].tail != null ? e.data[2].tail.tail == null ? [1, e.data[0].data[0].head.data[0], e.data[0].data[0].head.data[1], e.data[2].head, e.data[0].data[0].head.data[2], e.data[3], e.data[1], e.data[0].data[1].head] : [3] : [3] : [3] : [3] : [3] : [3] : [3] : e.data[0].tag === 12 ? e.data[2].tail == null ? (rfref = e.data[0].data, MustTakeAddressOfRecdFieldRef(rfref) ? true : CanTakeAddressOfRecdFieldRef(g, rfref, mut, e.data[1])) ? [2, e.data[3], e.data[0].data, e.data[1]] : [3] : [3] : [3] : [3];

                switch ($var128[0]) {
                  case 0:
                    return [null, new Expr(11, [new TOp(22, [ofArray([new ILInstr(61, $var128[2])]), ofArray([mkByrefTy(g, $var128[5])])]), $var128[4], new List(), $var128[3]])];

                  case 1:
                    const exprty_2 = tyOfExpr(g, $var128[3]);
                    const patternInput_2 = mkExprAddrOfExprAux(g, isStructTy(g, exprty_2), false, mut, $var128[3], null, $var128[5]);
                    return [patternInput_2[0], new Expr(11, [new TOp(22, [ofArray([new ILInstr(62, $var128[4])]), ofArray([mkByrefTy(g, $var128[7])])]), $var128[6], ofArray([patternInput_2[1]]), $var128[5]])];

                  case 2:
                    return [null, mkStaticRecdFieldGetAddr($var128[2], $var128[3], $var128[1])];

                  case 3:
                    const $var129 = e.tag === 5 ? e.data[0].tag === 1 ? e.data[2].tail != null ? e.data[2].tail.tail == null ? e.data[3].tail != null ? e.data[3].tail.tail != null ? e.data[3].tail.tail.tail == null ? (vf_1 = e.data[0].data[0], nexpr = e.data[3].tail.head, elemTy_1 = e.data[2].head, aexpr_1 = e.data[3].head, valRefEq(g, vf_1, g.array_get_vref)) ? [0, e.data[3].head, e.data[2].head, e.data[3].tail.head, e.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

                    switch ($var129[0]) {
                      case 0:
                        const shape = ILArrayShape.SingleDimensional;
                        const readonly = (isTyparTy(g, $var129[2]) ? useReadonlyForGenericArrayAddress : false) ? new ILReadonly(0) : new ILReadonly(1);
                        const isNativePtr = addrExprVal != null ? valRefEq(g, getValue(addrExprVal), g.addrof2_vref) : false;
                        return [null, mkArrayElemAddress(g, readonly, isNativePtr, shape, $var129[2], $var129[1], $var129[3], m)];

                      case 1:
                        const $var130 = e.tag === 5 ? e.data[0].tag === 1 ? e.data[2].tail != null ? e.data[2].tail.tail == null ? e.data[3].tail != null ? (vf = e.data[0].data[0], elemTy = e.data[2].head, args = e.data[3].tail, aexpr = e.data[3].head, (valRefEq(g, vf, g.array2D_get_vref) ? true : valRefEq(g, vf, g.array3D_get_vref)) ? true : valRefEq(g, vf, g.array4D_get_vref)) ? [0, e.data[3].head, e.data[3].tail, e.data[2].head, e.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

                        switch ($var130[0]) {
                          case 0:
                            const shape_1 = ILArrayShape.FromRank($var130[2].length);
                            const readonly_1 = (isTyparTy(g, $var130[3]) ? useReadonlyForGenericArrayAddress : false) ? new ILReadonly(0) : new ILReadonly(1);
                            const isNativePtr_1 = addrExprVal != null ? valRefEq(g, getValue(addrExprVal), g.addrof2_vref) : false;
                            return [null, new Expr(11, [new TOp(22, [ofArray([new ILInstr(80, [readonly_1, isNativePtr_1, shape_1, mkILTyvarTy(0)])]), ofArray([mkByrefTy(g, $var130[3])])]), ofArray([$var130[3]]), new List($var130[1], $var130[2]), m])];

                          case 1:
                            const $var131 = e.tag === 1 ? mut.Equals(new Mutates(0)) ? [0, e.data[2], e.data[0]] : [1] : [1];

                            switch ($var131[0]) {
                              case 0:
                                if (isByrefTy(g, $var131[2].Type)) {
                                  error(new _Error(SR.tastUnexpectedByRef(), $var131[1]));
                                }

                                if ($var131[2].IsMutable) {
                                  return error(new _Error(SR.tastInvalidAddressOfMutableAcrossAssemblyBoundary(), $var131[1]));
                                } else {
                                  return error(new _Error(SR.tastValueMustBeLocalAndMutable(), $var131[1]));
                                }

                              case 1:
                                const ty = tyOfExpr(g, e);

                                if (isStructTy(g, ty)) {
                                  if (mut.tag === 0) {
                                    errorR(new _Error(SR.tastInvalidMutationOfConstant(), m));
                                  } else if (mut.tag === 1) {
                                    warning(new DefensiveCopyWarning(SR.tastValueHasBeenCopied(), m));
                                  }
                                }

                                const patternInput_3 = mut.tag === 2 ? mkCompGenLocal(m, "copyOfStruct", ty) : mkMutableCompGenLocal(m, "copyOfStruct", ty);
                                return [[patternInput_3[0], e], mkValAddr(m, mkLocalValRef(patternInput_3[0]))];
                            }

                        }

                    }

                }

            }

        }

    }
  }
}
export function mkExprAddrOfExpr(g, mustTakeAddress, useReadonlyForGenericArrayAddress, mut, e, addrExprVal, m) {
  const patternInput = mkExprAddrOfExprAux(g, mustTakeAddress, useReadonlyForGenericArrayAddress, mut, e, addrExprVal, m);

  if (patternInput[0] != null) {
    const tmp = getValue(patternInput[0])[0];
    const rval = getValue(patternInput[0])[1];
    return [function (x) {
      return mkCompGenLet(m, tmp, rval, x);
    }, patternInput[1]];
  } else {
    return [function (x_1) {
      return x_1;
    }, patternInput[1]];
  }
}
export function mkTupleFieldGet(g, tupInfo, e, tinst, i, m) {
  const patternInput = mkExprAddrOfExpr(g, evalTupInfoIsStruct(tupInfo), false, new Mutates(2), e, null, m);
  return patternInput[0](mkTupleFieldGetViaExprAddr(tupInfo, patternInput[1], tinst, i, m));
}
export function mkRecdFieldGet(g, e, fref, tinst, m) {
  const patternInput = mkExprAddrOfExpr(g, fref.Tycon.IsStructOrEnumTycon, false, new Mutates(2), e, null, m);
  return patternInput[0](mkRecdFieldGetViaExprAddr(patternInput[1], fref, tinst, m));
}
export function mkUnionCaseFieldGetUnproven(g, e, cref, tinst, j, m) {
  const patternInput = mkExprAddrOfExpr(g, cref.Tycon.IsStructOrEnumTycon, false, new Mutates(2), e, null, m);
  return patternInput[0](mkUnionCaseFieldGetUnprovenViaExprAddr(patternInput[1], cref, tinst, j, m));
}
export function mkArray(argty, args, m) {
  return new Expr(11, [new TOp(3), ofArray([argty]), args, m]);
}
export function IterateRecursiveFixups(g, selfv, rvs, access, set, exprToFix) {
  var tupInfo;
  const exprToFix_1 = stripExpr(exprToFix);
  const $var132 = exprToFix_1.tag === 0 ? [0] : exprToFix_1.tag === 11 ? exprToFix_1.data[0].tag === 2 ? (tupInfo = exprToFix_1.data[0].data, !evalTupInfoIsStruct(tupInfo)) ? [1, exprToFix_1.data[2], exprToFix_1.data[1], exprToFix_1.data[3], exprToFix_1.data[0].data] : [2] : [2] : [2];

  switch ($var132[0]) {
    case 0:
      break;

    case 1:
      iterateIndexed(CurriedLambda(function (n) {
        const arg10_ = null;
        const arg30_ = mkTupleFieldGet(g, $var132[4], access, $var132[2], n, $var132[3]);

        const arg31_ = function (e) {
          errorR(new _Error(SR.tastRecursiveValuesMayNotBeInConstructionOfTuple(), $var132[3]));
          return e;
        };

        return function (arg40_) {
          IterateRecursiveFixups(g, arg10_, rvs, arg30_, arg31_, arg40_);
        };
      }), $var132[1]);
      break;

    case 2:
      const $var133 = exprToFix_1.tag === 11 ? exprToFix_1.data[0].tag === 0 ? [0, exprToFix_1.data[2], exprToFix_1.data[0].data, exprToFix_1.data[3], exprToFix_1.data[1]] : exprToFix_1.data[0].tag === 10 ? [1, exprToFix_1.data[2], exprToFix_1.data[3], exprToFix_1.data[0].data[1], exprToFix_1.data[1]] : [3] : exprToFix_1.tag === 1 ? [2] : exprToFix_1.tag === 3 ? [2] : exprToFix_1.tag === 8 ? [2] : exprToFix_1.tag === 13 ? [2] : exprToFix_1.tag === 4 ? [2] : [3];

      switch ($var133[0]) {
        case 0:
          iterateIndexed(CurriedLambda(function (n_1) {
            const arg10__1 = null;
            const arg30__1 = mkUnionCaseFieldGetUnprovenViaExprAddr(access, $var133[2], $var133[4], n_1, $var133[3]);

            const arg31__1 = function (e_1) {
              const tcref = $var133[2].TyconRef;

              if (!$var133[2].FieldByIndex(n_1).IsMutable ? !entityRefInThisAssembly(g.compilingFslib, tcref) : false) {
                errorR(new _Error(SR.tastRecursiveValuesMayNotAppearInConstructionOfType(tcref.LogicalName), $var133[3]));
              }

              return mkUnionCaseFieldSet(access, $var133[2], $var133[4], n_1, e_1, $var133[3]);
            };

            return function (arg40__1) {
              IterateRecursiveFixups(g, arg10__1, rvs, arg30__1, arg31__1, arg40__1);
            };
          }), $var133[1]);
          break;

        case 1:
          iterate2(function (fref, arg) {
            const fspec = fref.RecdField;
            IterateRecursiveFixups(g, null, rvs, mkRecdFieldGetViaExprAddr(access, fref, $var133[4], $var133[2]), function (e_2) {
              if (!fspec.IsMutable ? !entityRefInThisAssembly(g.compilingFslib, $var133[3]) : false) {
                errorR(new _Error(SR.tastRecursiveValuesMayNotBeAssignedToNonMutableField(fspec.rfield_id.idText, $var133[3].LogicalName), $var133[2]));
              }

              return mkRecdFieldSetViaExprAddr(access, fref, $var133[4], e_2, $var133[2]);
            }, arg);
          }, $var133[3].TrueInstanceFieldsAsRefList, $var133[1]);
          break;

        case 2:
          rvs(selfv, access, set, exprToFix_1);
          break;

        case 3:
          break;
      }

      break;
  }
}
export function JoinTyparStaticReq(r1, r2) {
  const matchValue = [r1, r2];
  const $var134 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [1] : [0, matchValue[0]] : [0, matchValue[1]];

  switch ($var134[0]) {
    case 0:
      return $var134[1];

    case 1:
      return matchValue[1];
  }
}
export class ExprFolder {
  constructor(exprIntercept, valBindingSiteIntercept, nonRecBindingsIntercept, recBindingsIntercept, dtreeIntercept, targetIntercept, tmethodIntercept) {
    this.exprIntercept = exprIntercept;
    this.valBindingSiteIntercept = valBindingSiteIntercept;
    this.nonRecBindingsIntercept = nonRecBindingsIntercept;
    this.recBindingsIntercept = recBindingsIntercept;
    this.dtreeIntercept = dtreeIntercept;
    this.targetIntercept = targetIntercept;
    this.tmethodIntercept = tmethodIntercept;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.ExprFolder",
      interfaces: ["FSharpRecord"],
      properties: {
        exprIntercept: _Function([_Function([GenericParam("State"), Expr, GenericParam("State")]), GenericParam("State"), Expr, Option(GenericParam("State"))]),
        valBindingSiteIntercept: _Function([GenericParam("State"), Tuple(["boolean", Val]), GenericParam("State")]),
        nonRecBindingsIntercept: _Function([GenericParam("State"), Binding, GenericParam("State")]),
        recBindingsIntercept: _Function([GenericParam("State"), makeGeneric(List, {
          T: Binding
        }), GenericParam("State")]),
        dtreeIntercept: _Function([GenericParam("State"), DecisionTree, GenericParam("State")]),
        targetIntercept: _Function([_Function([GenericParam("State"), Expr, GenericParam("State")]), GenericParam("State"), DecisionTreeTarget, Option(GenericParam("State"))]),
        tmethodIntercept: _Function([_Function([GenericParam("State"), Expr, GenericParam("State")]), GenericParam("State"), ObjExprMethod, Option(GenericParam("State"))])
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.ExprFolder", ExprFolder);
export function ExprFolder0() {
  return new ExprFolder(function (_exprF, _z, _x) {
    return null;
  }, function (z, _b) {
    return z;
  }, function (z_1, _bs) {
    return z_1;
  }, function (z_2, _bs_1) {
    return z_2;
  }, function (z_3, _dt) {
    return z_3;
  }, function (_exprF_1, _z_1, _x_1) {
    return null;
  }, function (_exprF_2, _z_2, _x_2) {
    return null;
  });
}
export class ExprFolders {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.ExprFolders",
      properties: {
        FoldExpr: GenericParam("State"),
        FoldImplFile: GenericParam("State")
      }
    };
  }

  constructor(folders) {
    this.folders = folders;
    this.exprFClosure = null;

    this.exprFClosure = (z, x) => this.exprF(z, x);
  }

  get FoldExpr() {
    return CurriedLambda((z, x) => this.exprF(z, x));
  }

  get FoldImplFile() {
    return CurriedLambda((z, x) => this.implF(z, x));
  }

  exprsF(z, xs) {
    return fold(this.exprFClosure, z, xs);
  }

  exprF(z, x) {
    var p;
    var f;
    var folder;
    const matchValue = this.folders.exprIntercept(this.exprFClosure, z, x);

    if (matchValue == null) {
      if (x.tag === 1) {
        return z;
      } else if (x.tag === 11) {
        return ((z_1, xs) => this.exprsF(z_1, xs))(z, x.data[2]);
      } else if (x.tag === 2) {
        return ((z_2, xs_1) => this.exprsF(z_2, xs_1))(z, ofArray([x.data[0], x.data[1]]));
      } else if (x.tag === 3) {
        return ((z_3, x_1) => this.exprF(z_3, x_1))(z, x.data[4]);
      } else if (x.tag === 4) {
        return ((z_4, x_2) => this.exprF(z_4, x_2))(z, x.data[2]);
      } else if (x.tag === 13) {
        return ((z_5, x_3) => this.exprF(z_5, x_3))(z, x.data[1]);
      } else if (x.tag === 5) {
        const z_7 = ((z_6, x_4) => this.exprF(z_6, x_4))(z, x.data[0]);

        const z_9 = ((z_8, xs_2) => this.exprsF(z_8, xs_2))(z_7, x.data[3]);

        return z_9;
      } else if (x.tag === 6) {
        const z_11 = ((dtree, z_10, binds) => this.valBindsF(dtree, z_10, binds))(false, z, x.data[0]);

        const z_13 = ((z_12, x_5) => this.exprF(z_12, x_5))(z_11, x.data[1]);

        return z_13;
      } else if (x.tag === 7) {
        const z_15 = ((dtree_1, z_14, bind) => this.valBindF(dtree_1, z_14, bind))(false, z, x.data[0]);

        const z_17 = ((z_16, x_6) => this.exprF(z_16, x_6))(z_15, x.data[1]);

        return z_17;
      } else if (x.tag === 14) {
        return ((z_18, x_7) => this.exprF(z_18, x_7))(z, x.data.contents);
      } else if (x.tag === 9) {
        const z_20 = ((z_19, dtree_2) => this.dtreeF(z_19, dtree_2))(z, x.data[2]);

        const z_22 = fold((z_21, x_8) => this.targetF(z_21, x_8), z_20, x.data[3]);
        return z_22;
      } else if (x.tag === 12) {
        if (x.data[1].contents == null) {
          return ((z_23, x_9) => this.exprF(z_23, x_9))(z, x.data[0]);
        } else {
          const z_25 = ((z_24, x_10) => this.exprF(z_24, x_10))(z, x.data[0]);

          return ((z_26, xs_3) => this.exprsF(z_26, xs_3))(z_25, getValue(x.data[1].contents)[2]);
        }
      } else if (x.tag === 8) {
        const z_28 = ((z_27, x_11) => this.exprF(z_27, x_11))(z, x.data[3]);

        const z_30 = fold((z_29, x_12) => this.tmethodF(z_29, x_12), z_28, x.data[4]);
        const z_33 = fold((p = tuple => tuple[1], f = (folder = (z_31, x_13) => this.tmethodF(z_31, x_13), (state, list) => fold(folder, state, list)), (z_32, x_14) => foldOn(p, f, z_32, x_14)), z_30, x.data[5]);
        return z_33;
      } else if (x.tag === 10) {
        return ((z_34, xs_4) => this.exprsF(z_34, xs_4))(z, ofArray([x.data[1], x.data[2]]));
      } else {
        return z;
      }
    } else {
      return getValue(matchValue);
    }
  }

  valBindF(dtree, z, bind) {
    const z_1 = this.folders.nonRecBindingsIntercept(z, bind);
    return ((dtree_1, z_2, bind_1) => this.bindF(dtree_1, z_2, bind_1))(dtree, z_1, bind);
  }

  valBindsF(dtree, z, binds) {
    const z_1 = this.folders.recBindingsIntercept(z, binds);
    return fold(CurriedLambda((dtree_1, z_2, bind) => this.bindF(dtree_1, z_2, bind))(dtree), z_1, binds);
  }

  bindF(dtree, z, bind) {
    const z_1 = this.folders.valBindingSiteIntercept(z, [dtree, bind.Var]);
    return ((z_2, x) => this.exprF(z_2, x))(z_1, bind.Expr);
  }

  dtreeF(z, dtree) {
    const z_1 = this.folders.dtreeIntercept(z, dtree);

    if (dtree.tag === 1) {
      return ((z_2, xs) => this.exprsF(z_2, xs))(z_1, dtree.data[0]);
    } else if (dtree.tag === 0) {
      const z_4 = ((z_3, x) => this.exprF(z_3, x))(z_1, dtree.data[0]);

      const z_6 = fold((z_5, _arg1) => this.dcaseF(z_5, _arg1), z_4, dtree.data[1]);
      const z_8 = fold((z_7, dtree_1) => this.dtreeF(z_7, dtree_1), z_6, defaultArg(dtree.data[2], [], $var135 => [$var135]));
      return z_8;
    } else {
      const z_10 = ((dtree_2, z_9, bind) => this.valBindF(dtree_2, z_9, bind))(true, z_1, dtree.data[0]);

      return ((z_11, dtree_3) => this.dtreeF(z_11, dtree_3))(z_10, dtree.data[1]);
    }
  }

  dcaseF(z, _arg1) {
    return ((z_1, dtree) => this.dtreeF(z_1, dtree))(z, _arg1.data[1]);
  }

  targetF(z, x) {
    const matchValue = this.folders.targetIntercept(this.exprFClosure, z, x);

    if (matchValue == null) {
      return ((z_1, x_1) => this.exprF(z_1, x_1))(z, x.data[1]);
    } else {
      return getValue(matchValue);
    }
  }

  tmethodF(z, x) {
    const matchValue = this.folders.tmethodIntercept(this.exprFClosure, z, x);

    if (matchValue == null) {
      return ((z_1, x_1) => this.exprF(z_1, x_1))(z, x.data[4]);
    } else {
      return getValue(matchValue);
    }
  }

  mexprF(z, x) {
    return ((z_1, x_1) => this.mdefF(z_1, x_1))(z, x.data[1]);
  }

  mdefF(z, x) {
    switch (x.tag) {
      case 2:
        return ((dtree, z_1, bind) => this.valBindF(dtree, z_1, bind))(false, z, x.data[0]);

      case 3:
        return ((z_2, x_1) => this.exprF(z_2, x_1))(z, x.data[0]);

      case 1:
        return fold((z_3, x_2) => this.mdefF(z_3, x_2), z, x.data);

      case 0:
        return ((z_4, x_3) => this.mexprF(z_4, x_3))(z, x.data);

      default:
        const z_6 = fold((z_5, x_4) => this.mbindF(z_5, x_4), z, x.data[2]);
        return z_6;
    }
  }

  mbindF(z, x) {
    if (x.tag === 1) {
      return ((z_1, x_1) => this.mdefF(z_1, x_1))(z, x.data[1]);
    } else {
      return ((dtree, z_2, bind) => this.valBindF(dtree, z_2, bind))(false, z, x.data);
    }
  }

  implF(z, x) {
    return foldTImplFile((z_1, x_1) => this.mexprF(z_1, x_1), z, x);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.ExprFolders", ExprFolders);
export function FoldExpr(folders) {
  return CurriedLambda(function (state, expr) {
    return new ExprFolders(folders).FoldExpr(state, expr);
  });
}
export function FoldImplFile(folders) {
  return CurriedLambda(function (state, implFile) {
    return new ExprFolders(folders).FoldImplFile(state, implFile);
  });
}
export function mkString(g, m, n) {
  return new Expr(0, [new Const(14, n), m, g.string_ty]);
}
export function mkBool(g, m, b) {
  return new Expr(0, [new Const(0, b), m, g.bool_ty]);
}
export function mkByte(g, m, b) {
  return new Expr(0, [new Const(2, b), m, g.byte_ty]);
}
export function mkUInt16(g, m, b) {
  return new Expr(0, [new Const(4, b), m, g.uint16_ty]);
}
export function mkTrue(g, m) {
  return mkBool(g, m, true);
}
export function mkFalse(g, m) {
  return mkBool(g, m, false);
}
export function mkUnit(g, m) {
  return new Expr(0, [new Const(16), m, g.unit_ty]);
}
export function mkInt32(g, m, n) {
  return new Expr(0, [new Const(5, n), m, g.int32_ty]);
}
export function mkInt(g, m, n) {
  return mkInt32(g, m, n);
}
export function mkZero(g, m) {
  return mkInt(g, m, 0);
}
export function mkOne(g, m) {
  return mkInt(g, m, 1);
}
export function mkTwo(g, m) {
  return mkInt(g, m, 2);
}
export function mkMinusOne(g, m) {
  return mkInt(g, m, -1);
}
export function destInt32(_arg1) {
  const $var136 = _arg1.tag === 0 ? _arg1.data[0].tag === 5 ? [0, _arg1.data[0].data] : [1] : [1];

  switch ($var136[0]) {
    case 0:
      return $var136[1];

    case 1:
      return null;
  }
}
export function isIDelegateEventType(g, ty) {
  if (isAppTy(g, ty)) {
    return tyconRefEq(g, g.fslib_IDelegateEvent_tcr, tcrefOfAppTy(g, ty));
  } else {
    return false;
  }
}
export function destIDelegateEventType(g, ty) {
  if (isIDelegateEventType(g, ty)) {
    const matchValue = argsOfAppTy(g, ty);
    const $var137 = matchValue.tail != null ? matchValue.tail.tail == null ? [0, matchValue.head] : [1] : [1];

    switch ($var137[0]) {
      case 0:
        return $var137[1];

      case 1:
        throw new Error("destIDelegateEventType: internal error");
    }
  } else {
    throw new Error("destIDelegateEventType: not an IDelegateEvent type");
  }
}
export function mkIEventType(g, ty1, ty2) {
  return new TType(1, [g.fslib_IEvent2_tcr, ofArray([ty1, ty2])]);
}
export function mkIObservableType(g, ty1) {
  return new TType(1, [g.tcref_IObservable, ofArray([ty1])]);
}
export function mkIObserverType(g, ty1) {
  return new TType(1, [g.tcref_IObserver, ofArray([ty1])]);
}
export function mkRefCellContentsRef(g) {
  return mkRecdFieldRef(g.refcell_tcr_canon, "contents");
}
export function mkSequential(spSeq, m, e1, e2) {
  return new Expr(2, [e1, e2, new SequentialOpKind(0), spSeq, m]);
}
export function mkCompGenSequential(m, e1, e2) {
  return mkSequential(new SequencePointInfoForSeq(1), m, e1, e2);
}
export function mkSequentials(spSeq, g, m, es) {
  if (es.tail == null) {
    return mkUnit(g, m);
  } else if (es.tail.tail == null) {
    return es.head;
  } else {
    return mkSequential(spSeq, m, es.head, mkSequentials(spSeq, g, m, es.tail));
  }
}
export function mkGetArg0(m, ty) {
  return mkAsmExpr(ofArray([mkLdarg0]), new List(), new List(), ofArray([ty]), m);
}
export function mkAnyTupled(g, m, tupInfo, es, tys) {
  if (es.tail != null) {
    if (es.tail.tail == null) {
      return es.head;
    } else {
      return new Expr(11, [new TOp(2, tupInfo), tys, es, m]);
    }
  } else {
    return mkUnit(g, m);
  }
}
export function mkRefTupled(g, m, es, tys) {
  return mkAnyTupled(g, m, tupInfoRef, es, tys);
}
export function mkRefTupledNoTypes(g, m, args) {
  return mkRefTupled(g, m, args, map(function (arg10_) {
    return tyOfExpr(g, arg10_);
  }, args));
}
export function mkRefTupledVars(g, m, vs) {
  return mkRefTupled(g, m, map(function (arg10_) {
    return exprForVal(m, arg10_);
  }, vs), typesOfVals(vs));
}
export function inversePerm(sigma) {
  const n = sigma.length | 0;
  const invSigma = Int32Array.from(replicate(n, -1));

  for (let i = 0; i <= n - 1; i++) {
    const sigma_i = sigma[i] | 0;
    invSigma[sigma_i] = i | 0;
  }

  return invSigma;
}
export function permute(sigma, data) {
  const n = sigma.length | 0;
  const invSigma = inversePerm(sigma);
  return Array.from(initialize(n, function (i) {
    return data[invSigma[i]];
  }));
}
export function existsR($var340, $var341, $var342) {
  existsR: while (true) {
    const a = $var340;
    const b = $var341;
    const pred = $var342;

    if (a <= b) {
      if (pred(a)) {
        return true;
      } else {
        $var340 = a + 1;
        $var341 = b;
        $var342 = pred;
        continue existsR;
      }
    } else {
      return false;
    }
  }
}
export function liftAllBefore(sigma) {
  const invSigma = inversePerm(sigma);
  const lifted = toList(delay(function () {
    return collect_1(function (i) {
      const i_ = sigma[i] | 0;

      if (existsR(0, i_ - 1, function (j_) {
        return invSigma[j_] > i;
      })) {
        return singleton(i);
      } else {
        return empty();
      }
    }, range_1(0, sigma.length - 1));
  }));

  if (lifted.tail == null) {
    return 0;
  } else {
    return reduce((x, y) => Math.max(x, y), lifted) + 1 | 0;
  }
}
export function permuteExprList(sigma, exprs, typ, names) {
  const patternInput = [Array.from(typ), Array.from(names)];
  const liftLim = liftAllBefore(sigma) | 0;

  const rewrite = function (rbinds, tupledArg) {
    if (tupledArg[0] < liftLim) {
      const patternInput_1 = mkCompGenLocal(Expr_get_Range.bind(tupledArg[1])(), patternInput[1][tupledArg[0]], patternInput[0][tupledArg[0]]);
      const bindi = mkCompGenBind(patternInput_1[0], tupledArg[1]);
      return [patternInput_1[1], new List(bindi, rbinds)];
    } else {
      return [tupledArg[1], rbinds];
    }
  };

  const patternInput_2 = mapFold(rewrite, new List(), Microsoft.FSharp.Collections.List.indexed(exprs), ofArray);
  const binds = reverse(patternInput_2[1]);
  const reorderedExprs = permute(sigma, Array.from(patternInput_2[0]));
  return [binds, toList(reorderedExprs)];
}
export function mkRecordExpr(g, lnk, tcref, tinst, rfrefs, args, m) {
  const patternInput = destAppTy(g, mkAppTy(tcref, tinst));
  const rfrefsArray = Array.from(Microsoft.FSharp.Collections.List.indexed(rfrefs));
  sortInPlaceBy(function (tupledArg) {
    return tupledArg[1].Index;
  }, rfrefsArray);
  const sigma = Int32Array.from(replicate(rfrefsArray.length, -1));
  iterateIndexed(function (j, tupledArg_1) {
    if (sigma[tupledArg_1[0]] !== -1) {
      error(new InternalError("bad permutation", m));
    }

    sigma[tupledArg_1[0]] = j | 0;
  }, rfrefsArray);
  const argTyps = map(function (rfref) {
    return actualTyOfRecdFieldRef(rfref, patternInput[1]);
  }, rfrefs);
  const names = map(function (rfref_1) {
    return rfref_1.FieldName;
  }, rfrefs);
  const patternInput_1 = permuteExprList(sigma, args, argTyps, names);
  return mkLetsBind(m, patternInput_1[0], new Expr(11, [new TOp(10, [lnk, patternInput[0]]), patternInput[1], patternInput_1[1], m]));
}
export function mkRefCell(g, m, ty, e) {
  return mkRecordExpr(g, new RecordConstructionInfo(1), g.refcell_tcr_canon, ofArray([ty]), ofArray([mkRefCellContentsRef(g)]), ofArray([e]), m);
}
export function mkRefCellGet(g, m, ty, e) {
  return mkRecdFieldGetViaExprAddr(e, mkRefCellContentsRef(g), ofArray([ty]), m);
}
export function mkRefCellSet(g, m, ty, e1, e2) {
  return mkRecdFieldSetViaExprAddr(e1, mkRefCellContentsRef(g), ofArray([ty]), e2, m);
}
export function mkNil(g, m, ty) {
  return mkUnionCaseExpr(g.nil_ucref, ofArray([ty]), new List(), m);
}
export function mkCons(g, ty, h, t) {
  return mkUnionCaseExpr(g.cons_ucref, ofArray([ty]), ofArray([h, t]), unionRanges(Expr_get_Range.bind(h)(), Expr_get_Range.bind(t)()));
}
export function mkCompGenLocalAndInvisbleBind(g, nm, m, e) {
  const patternInput = mkCompGenLocal(m, nm, tyOfExpr(g, e));
  return [patternInput[0], patternInput[1], mkInvisibleBind(patternInput[0], e)];
}
export const box = new ILInstr(74, mkILTyvarTy(0));
export const isinst = new ILInstr(66, mkILTyvarTy(0));
export const unbox = new ILInstr(76, mkILTyvarTy(0));
export function mkUnbox(ty, e, m) {
  return mkAsmExpr(ofArray([unbox]), ofArray([ty]), ofArray([e]), ofArray([ty]), m);
}
export function mkBox(ty, e, m) {
  return mkAsmExpr(ofArray([box]), new List(), ofArray([e]), ofArray([ty]), m);
}
export function mkIsInst(ty, e, m) {
  return mkAsmExpr(ofArray([isinst]), ofArray([ty]), ofArray([e]), ofArray([ty]), m);
}
export function mspec_Type_GetTypeFromHandle(g) {
  return mkILNonGenericStaticMethSpecInTy(g.ilg.typ_Type, "GetTypeFromHandle", ofArray([g.iltyp_RuntimeTypeHandle]), g.ilg.typ_Type);
}
export function mspec_String_Length(g) {
  return mkILNonGenericInstanceMethSpecInTy(g.ilg.typ_String, "get_Length", new List(), g.ilg.typ_Int32);
}
export function fspec_Missing_Value(g) {
  return mkILFieldSpecInTy(g.iltyp_Missing, "Value", g.iltyp_Missing);
}
export function mkInitializeArrayMethSpec(g) {
  return mkILNonGenericStaticMethSpecInTy(mkILNonGenericBoxedTy(g.FindSysILTypeRef("System.Runtime.CompilerServices.RuntimeHelpers")), "InitializeArray", ofArray([g.ilg.typ_Array, g.iltyp_RuntimeFieldHandle]), new ILType(0));
}
export function mkInvalidCastExnNewobj(g) {
  return mkNormalNewobj(mkILCtorMethSpecForTy(mkILNonGenericBoxedTy(g.FindSysILTypeRef("System.InvalidCastException")), new List()));
}
export function typedExprForIntrinsic(_g, m, _arg1) {
  const vref = ValRefForIntrinsic(_arg1);
  return [exprForValRef(m, vref), _arg1.data[3]];
}
export function mkCallGetGenericComparer(g, m) {
  return typedExprForIntrinsic(g, m, g.get_generic_comparer_info)[0];
}
export function mkCallGetGenericEREqualityComparer(g, m) {
  return typedExprForIntrinsic(g, m, g.get_generic_er_equality_comparer_info)[0];
}
export function mkCallGetGenericPEREqualityComparer(g, m) {
  return typedExprForIntrinsic(g, m, g.get_generic_per_equality_comparer_info)[0];
}
export function mkCallUnbox(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unbox_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallUnboxFast(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unbox_fast_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallTypeTest(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.istype_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallTypeOf(g, m, ty) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.typeof_info), ofArray([ofArray([ty])]), new List(), m);
}
export function mkCallTypeDefOf(g, m, ty) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.typedefof_info), ofArray([ofArray([ty])]), new List(), m);
}
export function mkCallDispose(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.dispose_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallSeq(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallCreateInstance(g, m, ty) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.create_instance_info), ofArray([ofArray([ty])]), ofArray([mkUnit(g, m)]), m);
}
export function mkCallGetQuerySourceAsEnumerable(g, m, ty1, ty2, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.query_source_as_enum_info), ofArray([ofArray([ty1, ty2])]), ofArray([e1, mkUnit(g, m)]), m);
}
export function mkCallNewQuerySource(g, m, ty1, ty2, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.new_query_source_info), ofArray([ofArray([ty1, ty2])]), ofArray([e1]), m);
}
export function mkCallCreateEvent(g, m, ty1, ty2, e1, e2, e3) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.create_event_info), ofArray([ofArray([ty1, ty2])]), ofArray([e1, e2, e3]), m);
}
export function mkCallGenericComparisonWithComparerOuter(g, m, ty, comp, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.generic_comparison_withc_outer_info), ofArray([ofArray([ty])]), ofArray([comp, e1, e2]), m);
}
export function mkCallGenericEqualityEROuter(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.generic_equality_er_outer_info), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallGenericEqualityWithComparerOuter(g, m, ty, comp, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.generic_equality_withc_outer_info), ofArray([ofArray([ty])]), ofArray([comp, e1, e2]), m);
}
export function mkCallGenericHashWithComparerOuter(g, m, ty, comp, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.generic_hash_withc_outer_info), ofArray([ofArray([ty])]), ofArray([comp, e1]), m);
}
export function mkCallEqualsOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.equals_operator_info), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallNotEqualsOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.not_equals_operator), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallLessThanOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.less_than_operator), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallLessThanOrEqualsOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.less_than_or_equals_operator), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallGreaterThanOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.greater_than_operator), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallGreaterThanOrEqualsOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.greater_than_or_equals_operator), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallAdditionOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unchecked_addition_info), ofArray([ofArray([ty, ty, ty])]), ofArray([e1, e2]), m);
}
export function mkCallSubtractionOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unchecked_subtraction_info), ofArray([ofArray([ty, ty, ty])]), ofArray([e1, e2]), m);
}
export function mkCallMultiplyOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unchecked_multiply_info), ofArray([ofArray([ty, ty, ty])]), ofArray([e1, e2]), m);
}
export function mkCallDivisionOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unchecked_division_info), ofArray([ofArray([ty, ty, ty])]), ofArray([e1, e2]), m);
}
export function mkCallModulusOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unchecked_modulus_info), ofArray([ofArray([ty, ty, ty])]), ofArray([e1, e2]), m);
}
export function mkCallBitwiseAndOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.bitwise_and_info), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallBitwiseOrOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.bitwise_or_info), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallBitwiseXorOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.bitwise_xor_info), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallShiftLeftOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.bitwise_shift_left_info), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallShiftRightOperator(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.bitwise_shift_right_info), ofArray([ofArray([ty])]), ofArray([e1, e2]), m);
}
export function mkCallUnaryNegOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unchecked_unary_minus_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallUnaryNotOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.bitwise_unary_not_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallAdditionChecked(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.checked_addition_info), ofArray([ofArray([ty, ty, ty])]), ofArray([e1, e2]), m);
}
export function mkCallSubtractionChecked(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.checked_subtraction_info), ofArray([ofArray([ty, ty, ty])]), ofArray([e1, e2]), m);
}
export function mkCallMultiplyChecked(g, m, ty, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.checked_multiply_info), ofArray([ofArray([ty, ty, ty])]), ofArray([e1, e2]), m);
}
export function mkCallUnaryNegChecked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.checked_unary_minus_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToByteChecked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.byte_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToSByteChecked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.sbyte_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToInt16Checked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.int16_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToUInt16Checked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.uint16_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToIntChecked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.int_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToInt32Checked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.int32_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToUInt32Checked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.uint32_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToInt64Checked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.int64_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToUInt64Checked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.uint64_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToIntPtrChecked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.nativeint_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToUIntPtrChecked(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unativeint_checked_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToByteOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.byte_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToSByteOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.sbyte_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToInt16Operator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.int16_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToUInt16Operator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.uint16_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToIntOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.int_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToInt32Operator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.int32_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToUInt32Operator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.uint32_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToInt64Operator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.int64_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToUInt64Operator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.uint64_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToSingleOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.float32_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToDoubleOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.float_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToIntPtrOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.nativeint_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToUIntPtrOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.unativeint_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToCharOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.char_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallToEnumOperator(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.enum_operator_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallArrayLength(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array_length_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallArrayGet(g, m, ty, e1, idx1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array_get_info), ofArray([ofArray([ty])]), ofArray([e1, idx1]), m);
}
export function mkCallArray2DGet(g, m, ty, e1, idx1, idx2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array2D_get_info), ofArray([ofArray([ty])]), ofArray([e1, idx1, idx2]), m);
}
export function mkCallArray3DGet(g, m, ty, e1, idx1, idx2, idx3) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array3D_get_info), ofArray([ofArray([ty])]), ofArray([e1, idx1, idx2, idx3]), m);
}
export function mkCallArray4DGet(g, m, ty, e1, idx1, idx2, idx3, idx4) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array4D_get_info), ofArray([ofArray([ty])]), ofArray([e1, idx1, idx2, idx3, idx4]), m);
}
export function mkCallArraySet(g, m, ty, e1, idx1, v) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array_set_info), ofArray([ofArray([ty])]), ofArray([e1, idx1, v]), m);
}
export function mkCallArray2DSet(g, m, ty, e1, idx1, idx2, v) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array2D_set_info), ofArray([ofArray([ty])]), ofArray([e1, idx1, idx2, v]), m);
}
export function mkCallArray3DSet(g, m, ty, e1, idx1, idx2, idx3, v) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array3D_set_info), ofArray([ofArray([ty])]), ofArray([e1, idx1, idx2, idx3, v]), m);
}
export function mkCallArray4DSet(g, m, ty, e1, idx1, idx2, idx3, idx4, v) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.array4D_set_info), ofArray([ofArray([ty])]), ofArray([e1, idx1, idx2, idx3, idx4, v]), m);
}
export function mkCallHash(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.hash_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallBox(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.box_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallIsNull(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.isnull_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallIsNotNull(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.isnotnull_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallRaise(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.raise_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallNewDecimal(g, m, e1, e2, e3, e4, e5) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.new_decimal_info), new List(), ofArray([e1, e2, e3, e4, e5]), m);
}
export function mkCallNewFormat(g, m, aty, bty, cty, dty, ety, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.new_format_info), ofArray([ofArray([aty, bty, cty, dty, ety])]), ofArray([e1]), m);
}
export function TryEliminateDesugaredConstants(_g, _m, _c) {
  return null;
}
export function mkSeqTy(g, ty) {
  return mkAppTy(g.seq_tcr, ofArray([ty]));
}
export function mkIEnumeratorTy(g, ty) {
  return mkAppTy(g.tcref_System_Collections_Generic_IEnumerator, ofArray([ty]));
}
export function mkCallSeqCollect(g, m, alphaTy, betaTy, arg1, arg2) {
  let enumty2;

  try {
    enumty2 = rangeOfFunTy(g, tyOfExpr(g, arg1));
  } catch (matchValue) {
    enumty2 = mkSeqTy(g, betaTy);
  }

  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_collect_info), ofArray([ofArray([alphaTy, enumty2, betaTy])]), ofArray([arg1, arg2]), m);
}
export function mkCallSeqUsing(g, m, resourceTy, elemTy, arg1, arg2) {
  let enumty;

  try {
    enumty = rangeOfFunTy(g, tyOfExpr(g, arg2));
  } catch (matchValue) {
    enumty = mkSeqTy(g, elemTy);
  }

  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_using_info), ofArray([ofArray([resourceTy, enumty, elemTy])]), ofArray([arg1, arg2]), m);
}
export function mkCallSeqDelay(g, m, elemTy, arg1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_delay_info), ofArray([ofArray([elemTy])]), ofArray([arg1]), m);
}
export function mkCallSeqAppend(g, m, elemTy, arg1, arg2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_append_info), ofArray([ofArray([elemTy])]), ofArray([arg1, arg2]), m);
}
export function mkCallSeqGenerated(g, m, elemTy, arg1, arg2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_generated_info), ofArray([ofArray([elemTy])]), ofArray([arg1, arg2]), m);
}
export function mkCallSeqFinally(g, m, elemTy, arg1, arg2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_finally_info), ofArray([ofArray([elemTy])]), ofArray([arg1, arg2]), m);
}
export function mkCallSeqOfFunctions(g, m, ty1, ty2, arg1, arg2, arg3) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_of_functions_info), ofArray([ofArray([ty1, ty2])]), ofArray([arg1, arg2, arg3]), m);
}
export function mkCallSeqToArray(g, m, elemTy, arg1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_to_array_info), ofArray([ofArray([elemTy])]), ofArray([arg1]), m);
}
export function mkCallSeqToList(g, m, elemTy, arg1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_to_list_info), ofArray([ofArray([elemTy])]), ofArray([arg1]), m);
}
export function mkCallSeqMap(g, m, inpElemTy, genElemTy, arg1, arg2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_map_info), ofArray([ofArray([inpElemTy, genElemTy])]), ofArray([arg1, arg2]), m);
}
export function mkCallSeqSingleton(g, m, ty1, arg1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_singleton_info), ofArray([ofArray([ty1])]), ofArray([arg1]), m);
}
export function mkCallSeqEmpty(g, m, ty1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.seq_empty_info), ofArray([ofArray([ty1])]), new List(), m);
}
export function mkCallDeserializeQuotationFSharp20Plus(g, m, e1, e2, e3, e4) {
  const args = ofArray([e1, e2, e3, e4]);
  return mkApps(g, typedExprForIntrinsic(g, m, g.deserialize_quoted_FSharp_20_plus_info), new List(), ofArray([mkRefTupledNoTypes(g, m, args)]), m);
}
export function mkCallDeserializeQuotationFSharp40Plus(g, m, e1, e2, e3, e4, e5) {
  const args = ofArray([e1, e2, e3, e4, e5]);
  return mkApps(g, typedExprForIntrinsic(g, m, g.deserialize_quoted_FSharp_40_plus_info), new List(), ofArray([mkRefTupledNoTypes(g, m, args)]), m);
}
export function mkCallCastQuotation(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.cast_quotation_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallLiftValueWithName(g, m, ty, nm, e1) {
  const vref = ValRefForIntrinsic(g.lift_value_with_name_info);
  const matchValue = vref.TryDeref;

  if (matchValue.tag === 1) {
    return mkApps(g, typedExprForIntrinsic(g, m, g.lift_value_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
  } else {
    return mkApps(g, typedExprForIntrinsic(g, m, g.lift_value_with_name_info), ofArray([ofArray([ty])]), ofArray([mkRefTupledNoTypes(g, m, ofArray([e1, mkString(g, m, nm)]))]), m);
  }
}
export function mkCallLiftValueWithDefn(g, m, qty, e1) {
  const ty = destQuotedExprTy(g, qty);
  const vref = ValRefForIntrinsic(g.lift_value_with_defn_info);
  const matchValue = vref.TryDeref;

  if (matchValue.tag === 1) {
    return new Expr(12, [e1, {
      contents: null
    }, false, m, qty]);
  } else {
    const copyOfExpr = copyExpr(g, new ValCopyFlag(0), e1);
    const quoteOfCopyOfExpr = new Expr(12, [copyOfExpr, {
      contents: null
    }, false, m, qty]);
    return mkApps(g, typedExprForIntrinsic(g, m, g.lift_value_with_defn_info), ofArray([ofArray([ty])]), ofArray([mkRefTupledNoTypes(g, m, ofArray([e1, quoteOfCopyOfExpr]))]), m);
  }
}
export function mkCallCheckThis(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.check_this_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkCallFailInit(g, m) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.fail_init_info), new List(), ofArray([mkUnit(g, m)]), m);
}
export function mkCallFailStaticInit(g, m) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.fail_static_init_info), new List(), ofArray([mkUnit(g, m)]), m);
}
export function mkCallQuoteToLinqLambdaExpression(g, m, ty, e1) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.quote_to_linq_lambda_info), ofArray([ofArray([ty])]), ofArray([e1]), m);
}
export function mkLazyDelayed(g, m, ty, f) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.lazy_create_info), ofArray([ofArray([ty])]), ofArray([f]), m);
}
export function mkLazyForce(g, m, ty, e) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.lazy_force_info), ofArray([ofArray([ty])]), ofArray([e, mkUnit(g, m)]), m);
}
export function mkGetString(g, m, e1, e2) {
  return mkApps(g, typedExprForIntrinsic(g, m, g.getstring_info), new List(), ofArray([e1, e2]), m);
}
export const mkGetStringChar = CurriedLambda(function (g, m, e1, e2) {
  return mkGetString(g, m, e1, e2);
});
export function mkGetStringLength(g, m, e) {
  const mspec = mspec_String_Length(g);
  return new Expr(11, [new TOp(31, [false, false, false, false, new ValUseFlag(1), true, false, mspec.MethodRef, new List(), new List(), ofArray([g.int32_ty])]), new List(), ofArray([e]), m]);
}
export function mkDecr(g, m, e) {
  return mkAsmExpr(ofArray([new ILInstr(22)]), new List(), ofArray([e, mkOne(g, m)]), ofArray([g.int_ty]), m);
}
export function mkIncr(g, m, e) {
  return mkAsmExpr(ofArray([new ILInstr(0)]), new List(), ofArray([mkOne(g, m), e]), ofArray([g.int_ty]), m);
}
export function mkLdlen(g, m, arre) {
  return mkAsmExpr(ofArray([new ILInstr(84), new ILInstr(11, new ILBasicType(5))]), new List(), ofArray([arre]), ofArray([g.int_ty]), m);
}
export function mkLdelem(_g, m, ty, arre, idxe) {
  return mkAsmExpr(ofArray([new ILInstr(81, [ILArrayShape.SingleDimensional, mkILTyvarTy(0)])]), ofArray([ty]), ofArray([arre, idxe]), ofArray([ty]), m);
}
export function mkILAsmCeq(g, m, e1, e2) {
  return mkAsmExpr(ofArray([new ILInstr(6)]), new List(), ofArray([e1, e2]), ofArray([g.bool_ty]), m);
}
export function mkILAsmClt(g, m, e1, e2) {
  return mkAsmExpr(ofArray([new ILInstr(9)]), new List(), ofArray([e1, e2]), ofArray([g.bool_ty]), m);
}
export function mkNull(m, ty) {
  return new Expr(0, [new Const(17), m, ty]);
}
export function mkThrow(m, ty, e) {
  return mkAsmExpr(ofArray([new ILInstr(54)]), new List(), ofArray([e]), ofArray([ty]), m);
}
export function destThrow(_arg1) {
  const $var138 = _arg1.tag === 11 ? _arg1.data[0].tag === 22 ? _arg1.data[0].data[0].tail != null ? _arg1.data[0].data[0].head.tag === 54 ? _arg1.data[0].data[0].tail.tail == null ? _arg1.data[0].data[1].tail != null ? _arg1.data[0].data[1].tail.tail == null ? _arg1.data[1].tail == null ? _arg1.data[2].tail != null ? _arg1.data[2].tail.tail == null ? [0, _arg1.data[2].head, _arg1.data[3], _arg1.data[0].data[1].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var138[0]) {
    case 0:
      return [$var138[2], $var138[3], $var138[1]];

    case 1:
      return null;
  }
}
export function isThrow(x) {
  return destThrow(x) != null;
}
export function mkReraiseLibCall(g, ty, m) {
  const patternInput = typedExprForIntrinsic(g, m, g.reraise_info);
  return new Expr(5, [patternInput[0], patternInput[1], ofArray([ty]), ofArray([mkUnit(g, m)]), m]);
}
export function mkReraise(m, returnTy) {
  return new Expr(11, [new TOp(25), ofArray([returnTy]), new List(), m]);
}
export const tnameCompilationSourceNameAttr = FSharpLib.Core + ".CompilationSourceNameAttribute";
export const tnameCompilationArgumentCountsAttr = FSharpLib.Core + ".CompilationArgumentCountsAttribute";
export const tnameCompilationMappingAttr = FSharpLib.Core + ".CompilationMappingAttribute";
export const tnameSourceConstructFlags = FSharpLib.Core + ".SourceConstructFlags";
export function tref_CompilationArgumentCountsAttr(g) {
  return mkILTyRef(g.fslibCcu.ILScopeRef, tnameCompilationArgumentCountsAttr);
}
export function tref_CompilationMappingAttr(g) {
  return mkILTyRef(g.fslibCcu.ILScopeRef, tnameCompilationMappingAttr);
}
export function tref_CompilationSourceNameAttr(g) {
  return mkILTyRef(g.fslibCcu.ILScopeRef, tnameCompilationSourceNameAttr);
}
export function tref_SourceConstructFlags(g) {
  return mkILTyRef(g.fslibCcu.ILScopeRef, tnameSourceConstructFlags);
}
export function mkCompilationMappingAttrPrim(g, k, nums) {
  return mkILCustomAttribute(g.ilg, tref_CompilationMappingAttr(g), new List(mkILNonGenericValueTy(tref_SourceConstructFlags(g)), map(function (_arg1) {
    return g.ilg.typ_Int32;
  }, nums)), map(function (n) {
    return new ILAttribElem(5, n);
  }, new List(k, nums)), new List());
}
export function mkCompilationMappingAttr(g, kind) {
  return mkCompilationMappingAttrPrim(g, kind, new List());
}
export function mkCompilationMappingAttrWithSeqNum(g, kind, seqNum) {
  return mkCompilationMappingAttrPrim(g, kind, ofArray([seqNum]));
}
export function mkCompilationMappingAttrWithVariantNumAndSeqNum(g, kind, varNum, seqNum) {
  return mkCompilationMappingAttrPrim(g, kind, ofArray([varNum, seqNum]));
}
export function mkCompilationArgumentCountsAttr(g, nums) {
  return mkILCustomAttribute(g.ilg, tref_CompilationArgumentCountsAttr(g), ofArray([mkILArr1DTy(g.ilg.typ_Int32)]), ofArray([new ILAttribElem(16, [g.ilg.typ_Int32, map(function (n) {
    return new ILAttribElem(5, n);
  }, nums)])]), new List());
}
export function mkCompilationSourceNameAttr(g, n) {
  return mkILCustomAttribute(g.ilg, tref_CompilationSourceNameAttr(g), ofArray([g.ilg.typ_String]), ofArray([new ILAttribElem(0, n)]), new List());
}
export function mkCompilationMappingAttrForQuotationResource(g, nm, tys) {
  return mkILCustomAttribute(g.ilg, tref_CompilationMappingAttr(g), ofArray([g.ilg.typ_String, mkILArr1DTy(g.ilg.typ_Type)]), ofArray([new ILAttribElem(0, nm), new ILAttribElem(16, [g.ilg.typ_Type, toList(delay(function () {
    return map_3(function (ty) {
      return new ILAttribElem(15, ty);
    }, tys);
  }))])]), new List());
}
export const tname_SignatureDataVersionAttr = FSharpLib.Core + ".FSharpInterfaceDataVersionAttribute";
export const tnames_SignatureDataVersionAttr = splitILTypeName(tname_SignatureDataVersionAttr);
export function tref_SignatureDataVersionAttr() {
  return mkILTyRef(ilxFsharpCoreLibScopeRef(), tname_SignatureDataVersionAttr);
}
export function mkSignatureDataVersionAttr(g, _arg1) {
  return mkILCustomAttribute(g.ilg, tref_SignatureDataVersionAttr(), ofArray([g.ilg.typ_Int32, g.ilg.typ_Int32, g.ilg.typ_Int32]), ofArray([new ILAttribElem(5, ~~_arg1[0]), new ILAttribElem(5, ~~_arg1[1]), new ILAttribElem(5, ~~_arg1[2])]), new List());
}
export const tname_AutoOpenAttr = FSharpLib.Core + ".AutoOpenAttribute";
export function IsSignatureDataVersionAttr(cattr) {
  return isILAttribByName(new List(), tname_SignatureDataVersionAttr, cattr);
}
export function TryFindAutoOpenAttr(ilg, cattr) {
  if (isILAttribByName(new List(), tname_AutoOpenAttr, cattr)) {
    const matchValue = decodeILAttribData(ilg, cattr);
    const $var139 = matchValue[0].tail == null ? [1] : matchValue[0].head.tag === 0 ? matchValue[0].tail.tail == null ? [0, matchValue[0].head.data] : [2] : [2];

    switch ($var139[0]) {
      case 0:
        return $var139[1];

      case 1:
        return null;

      case 2:
        warning(Microsoft.FSharp.Core.Operators.Failure(SR.tastUnexpectedDecodeOfAutoOpenAttribute()));
        return null;
    }
  } else {
    return null;
  }
}
export const tname_InternalsVisibleToAttr = "System.Runtime.CompilerServices.InternalsVisibleToAttribute";
export function TryFindInternalsVisibleToAttr(ilg, cattr) {
  if (isILAttribByName(new List(), tname_InternalsVisibleToAttr, cattr)) {
    const matchValue = decodeILAttribData(ilg, cattr);
    const $var140 = matchValue[0].tail == null ? [1] : matchValue[0].head.tag === 0 ? matchValue[0].tail.tail == null ? [0, matchValue[0].head.data] : [2] : [2];

    switch ($var140[0]) {
      case 0:
        return $var140[1];

      case 1:
        return null;

      case 2:
        warning(Microsoft.FSharp.Core.Operators.Failure(SR.tastUnexpectedDecodeOfInternalsVisibleToAttribute()));
        return null;
    }
  } else {
    return null;
  }
}
export function IsMatchingSignatureDataVersionAttr(ilg, _arg1, cattr) {
  if (IsSignatureDataVersionAttr(cattr)) {
    const matchValue = decodeILAttribData(ilg, cattr);
    const $var141 = matchValue[0].tail != null ? matchValue[0].head.tag === 5 ? matchValue[0].tail.tail != null ? matchValue[0].tail.head.tag === 5 ? matchValue[0].tail.tail.tail != null ? matchValue[0].tail.tail.head.tag === 5 ? matchValue[0].tail.tail.tail.tail == null ? [0, matchValue[0].head.data, matchValue[0].tail.head.data, matchValue[0].tail.tail.head.data] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var141[0]) {
      case 0:
        if (_arg1[0] === ($var141[1] & 0xFFFF) ? _arg1[1] === ($var141[2] & 0xFFFF) : false) {
          return _arg1[2] === ($var141[3] & 0xFFFF);
        } else {
          return false;
        }

      case 1:
        warning(Microsoft.FSharp.Core.Operators.Failure(SR.tastUnexpectedDecodeOfInterfaceDataVersionAttribute()));
        return false;
    }
  } else {
    return false;
  }
}
export function mkCompilerGeneratedAttr(g, n) {
  return mkILCustomAttribute(g.ilg, tref_CompilationMappingAttr(g), ofArray([mkILNonGenericValueTy(tref_SourceConstructFlags(g))]), ofArray([new ILAttribElem(5, n)]), new List());
}
export function untupledToRefTupled(g, vs) {
  const untupledTys = typesOfVals(vs);
  const m = vs.head.Range;
  const patternInput = mkCompGenLocal(m, "tupledArg", mkRefTupledTy(g, untupledTys));
  const untupling_es = mapIndexed(function (i, _arg1) {
    return mkTupleFieldGet(g, tupInfoRef, patternInput[1], untupledTys, i, m);
  }, untupledTys);
  return [patternInput[0], function (body) {
    return mkInvisibleLets(m, vs, untupling_es, body);
  }];
}
export function AdjustArityOfLambdaBody(g, arity, vs, body) {
  const nvs = vs.length | 0;

  if (!((nvs === arity ? true : nvs === 1) ? true : arity === 1)) {
    throw new Error("lengths don't add up");
  }

  if (arity === 0) {
    return [vs, body];
  } else if (nvs === arity) {
    return [vs, body];
  } else if (nvs === 1) {
    const v = vs.head;
    const untupledTys = destRefTupleTy(g, v.Type);

    if (untupledTys.length !== arity) {
      throw new Error("length untupledTys <> arity");
    }

    const patternInput = unzip(mapIndexed(function (i, ty) {
      return mkCompGenLocal(v.Range, v.LogicalName + "_" + i.toString(), ty);
    }, untupledTys));
    const body_1 = mkInvisibleLet(v.Range, v, mkRefTupled(g, v.Range, patternInput[1], untupledTys), body);
    return [patternInput[0], body_1];
  } else {
    const patternInput_1 = untupledToRefTupled(g, vs);
    return [ofArray([patternInput_1[0]]), patternInput_1[1](body)];
  }
}
export function MultiLambdaToTupledLambda(g, vs, body) {
  if (vs.tail != null) {
    if (vs.tail.tail == null) {
      return [vs.head, body];
    } else {
      const patternInput = untupledToRefTupled(g, vs);
      return [patternInput[0], patternInput[1](body)];
    }
  } else {
    throw new Error("MultiLambdaToTupledLambda: expected some argments");
  }
}

function _RefTuple___(expr) {
  const $var142 = expr.tag === 11 ? expr.data[0].tag === 2 ? expr.data[0].data.data ? [1] : [0, expr.data[2]] : [1] : [1];

  switch ($var142[0]) {
    case 0:
      return $var142[1];

    case 1:
      return null;
  }
}

export { _RefTuple___ as $7C$RefTuple$7C$_$7C$ };
export function MultiLambdaToTupledLambdaIfNeeded(g, vs, arg, body) {
  const matchValue = [vs, arg];
  let $var143;

  if (matchValue[0].tail != null) {
    if (matchValue[0].tail.tail == null) {
      $var143 = [1, matchValue[0].head];
    } else {
      const activePatternResult29304 = _RefTuple___(matchValue[1]);

      if (activePatternResult29304 != null) {
        if (getValue(activePatternResult29304).length === matchValue[0].length) {
          $var143 = [2, getValue(activePatternResult29304), matchValue[0]];
        } else {
          $var143 = [3];
        }
      } else {
        $var143 = [3];
      }
    }
  } else {
    $var143 = [0];
  }

  switch ($var143[0]) {
    case 0:
      throw new Error("MultiLambdaToTupledLambda: expected some argments");

    case 1:
      return [ofArray([[$var143[1], arg]]), body];

    case 2:
      return [toList(zip($var143[2], $var143[1])), body];

    case 3:
      const patternInput = untupledToRefTupled(g, matchValue[0]);
      return [ofArray([[patternInput[0], arg]]), patternInput[1](body)];
  }
}
export function MakeApplicationAndBetaReduceAux(g, f, fty, tyargsl, argsl, m) {
  MakeApplicationAndBetaReduceAux: while (true) {
    if (f.tag === 7) {
      return mkLetBind(f.data[2], f.data[0], MakeApplicationAndBetaReduceAux(g, f.data[1], fty, tyargsl, argsl, m));
    } else if (tyargsl.tail == null) {
      if (argsl.tail == null) {
        return f;
      } else {
        const matchValue = tryStripLambdaN(argsl.length, f);

        if (matchValue != null) {
          const body = getValue(matchValue)[1];
          const argvsl = getValue(matchValue)[0];
          const patternInput = mapFoldBack(function (tupledArg, body_1) {
            return MultiLambdaToTupledLambdaIfNeeded(g, tupledArg[0], tupledArg[1], body_1);
          }, toList(zip(argvsl, argsl)), body, ofArray);
          const patternInput_1 = unzip(concat(patternInput[0]));
          return mkLetsBind(m, mkCompGenBinds(patternInput_1[0], patternInput_1[1]), patternInput[1]);
        } else {
          return mkExprApplAux(g, f, fty, argsl, m);
        }
      }
    } else if (tyargsl.head.tail == null) {
      g = g;
      f = f;
      fty = fty;
      tyargsl = tyargsl.tail;
      argsl = argsl;
      m = m;
      continue MakeApplicationAndBetaReduceAux;
    } else {
      const $var144 = f.tag === 4 ? f.data[1].length === tyargsl.head.length ? [0, f.data[2], f.data[4], f.data[1]] : [1] : [1];

      switch ($var144[0]) {
        case 0:
          const tpenv = bindTypars($var144[3], tyargsl.head, emptyTyparInst);
          const body_2 = remarkExpr(m, instExpr(g, tpenv, $var144[1]));
          const bodyty_ = instType(tpenv, $var144[2]);
          g = g;
          f = body_2;
          fty = bodyty_;
          tyargsl = tyargsl.tail;
          argsl = argsl;
          m = m;
          continue MakeApplicationAndBetaReduceAux;

        case 1:
          const f_1 = mkAppsAux(g, f, fty, ofArray([tyargsl.head]), new List(), m);
          const fty_1 = applyTyArgs(g, fty, tyargsl.head);
          g = g;
          f = f_1;
          fty = fty_1;
          tyargsl = tyargsl.tail;
          argsl = argsl;
          m = m;
          continue MakeApplicationAndBetaReduceAux;
      }
    }
  }
}
export function MakeApplicationAndBetaReduce(g, f, fty, tyargsl, argl, m) {
  return MakeApplicationAndBetaReduceAux(g, f, fty, tyargsl, argl, m);
}
export function MakeArgsForTopArgs(_g, m, argtysl, tpenv) {
  return mapIndexed(function (i, argtys) {
    return mapIndexed(function (j, tupledArg) {
      const ty = instType(tpenv, tupledArg[0]);
      let nm;
      const matchValue = tupledArg[1].Name;

      if (matchValue != null) {
        nm = getValue(matchValue).idText;
      } else {
        nm = CompilerGeneratedName("arg" + i.toString() + j.toString());
      }

      return mkCompGenLocal(m, nm, ty)[0];
    }, argtys);
  }, argtysl);
}
export function AdjustValForExpectedArity(g, m, vref, flags, topValInfo) {
  const patternInput = GetTopValTypeInFSharpForm(g, topValInfo, vref.Type, m);
  const tps_ = copyTypars(patternInput[0]);
  const tyargs_ = map(function (tp) {
    return mkTyparTy(tp);
  }, tps_);
  const tpenv = bindTypars(patternInput[0], tyargs_, emptyTyparInst);
  const rty_ = instType(tpenv, patternInput[2]);
  const vsl = MakeArgsForTopArgs(g, m, patternInput[1], tpenv);
  const call = MakeApplicationAndBetaReduce(g, new Expr(1, [vref, flags, m]), vref.Type, ofArray([tyargs_]), map(function (arg20_) {
    return mkRefTupledVars(g, m, arg20_);
  }, vsl), m);
  const patternInput_1 = foldBack(function (vs, tupledArg) {
    return [mkMultiLambda(m, vs, tupledArg[0], tupledArg[1]), op_MinusMinusGreater(mkRefTupledVarsTy(g, vs), tupledArg[1])];
  }, vsl, [call, rty_]);
  return [mkTypeLambda(m, tps_, patternInput_1[0], patternInput_1[1]), op_PlusMinusGreater(tps_, patternInput_1[1])];
}
export function IsSubsumptionExpr(g, expr) {
  const $var145 = expr.tag === 11 ? expr.data[0].tag === 24 ? expr.data[1].tail != null ? expr.data[1].tail.tail != null ? expr.data[1].tail.tail.tail == null ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? [0, expr.data[1].tail.head, expr.data[1].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var145[0]) {
    case 0:
      if (isFunTy(g, $var145[1])) {
        return isFunTy(g, $var145[2]);
      } else {
        return false;
      }

    case 1:
      return false;
  }
}
export function stripTupledFunTy(g, ty) {
  const patternInput = stripFunTy(g, ty);
  const curriedArgTys = map(function (arg10_) {
    return tryDestRefTupleTy(g, arg10_);
  }, patternInput[0]);
  return [curriedArgTys, patternInput[1]];
}

function _ExprValWithPossibleTypeInst___(expr) {
  const $var146 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[3].tail == null ? [0, expr.data[1], expr.data[0].data[1], expr.data[0].data[2], expr.data[2], expr.data[0].data[0]] : [2] : [2] : expr.tag === 1 ? [1, expr.data[1], expr.data[2], expr.data[0]] : [2];

  switch ($var146[0]) {
    case 0:
      return [$var146[5], $var146[2], $var146[4], $var146[3]];

    case 1:
      return [$var146[3], $var146[1], new List(), $var146[2]];

    case 2:
      return null;
  }
}

export { _ExprValWithPossibleTypeInst___ as $7C$ExprValWithPossibleTypeInst$7C$_$7C$ };
export function mkCoerceIfNeeded(g, tgtTy, srcTy, expr) {
  if (typeEquiv(g, tgtTy, srcTy)) {
    return expr;
  } else {
    return mkCoerceExpr(expr, tgtTy, Expr_get_Range.bind(expr)(), srcTy);
  }
}
export function mkCompGenLetIn(m, nm, ty, e, f) {
  const patternInput = mkCompGenLocal(m, nm, ty);
  return mkCompGenLet(m, patternInput[0], e, f([patternInput[0], patternInput[1]]));
}
export function AdjustPossibleSubsumptionExpr(g, expr, suppliedArgs) {
  var inputTy;
  var exprWithActualTy;
  var actualTy_1;
  var vref;
  const $var147 = expr.tag === 11 ? expr.data[0].tag === 24 ? expr.data[1].tail != null ? expr.data[1].tail.tail != null ? expr.data[1].tail.tail.tail == null ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? (inputTy = expr.data[1].head, exprWithActualTy = expr.data[2].head, actualTy_1 = expr.data[1].tail.head, isFunTy(g, actualTy_1) ? isFunTy(g, inputTy) : false) ? [0, expr.data[1].tail.head, expr.data[2].head, expr.data[1].head, expr.data[3]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var147[0]) {
    case 0:
      if (typeEquiv(g, $var147[1], $var147[3])) {
        return [$var147[2], suppliedArgs];
      } else {
        const patternInput = stripTupledFunTy(g, $var147[1]);
        const patternInput_1 = stripFunTy(g, $var147[3]);
        const argTys = toList(mapIndexed2(function (i, x, y) {
          return [i, x, y];
        }, patternInput_1[0], patternInput[0]));
        let curriedNiceNames;
        const matchValue = stripExpr($var147[2]);
        let $var148;

        const activePatternResult29349 = _ExprValWithPossibleTypeInst___(matchValue);

        if (activePatternResult29349 != null) {
          if (vref = getValue(activePatternResult29349)[0], CurriedLambda(() => vref.ValReprInfo != null)()) {
            $var148 = [0, getValue(activePatternResult29349)[0]];
          } else {
            $var148 = [1];
          }
        } else {
          $var148 = [1];
        }

        switch ($var148[0]) {
          case 0:
            const patternInput_2 = GetTopValTypeInFSharpForm(g, getValue($var148[1].ValReprInfo), $var148[1].Type, Expr_get_Range.bind(expr)());
            curriedNiceNames = mapIndexed(function (i_1, argtys) {
              return mapIndexed(function (j, tupledArg) {
                const matchValue_1 = tupledArg[1].Name;

                if (matchValue_1 != null) {
                  return getValue(matchValue_1).idText;
                } else {
                  return CompilerGeneratedName("arg" + i_1.toString() + j.toString());
                }
              }, argtys);
            }, patternInput_2[1]);
            break;

          case 1:
            curriedNiceNames = new List();
            break;
        }

        const patternInput_3 = List_1.chop(curriedNiceNames.length, argTys);
        const patternInput_4 = List_1.chop(suppliedArgs.length < curriedNiceNames.length ? suppliedArgs.length : curriedNiceNames.length, suppliedArgs);
        const appm = fold(function (m, e) {
          return unionRanges(m, Expr_get_Range.bind(e)());
        }, $var147[4], patternInput_4[0]);
        const buildingLambdas = patternInput_4[0].length !== curriedNiceNames.length;

        const CoerceDetupled = function (argTys_1, detupledArgs, actualTys) {
          const argm = reduce(function (arg00_, arg10_) {
            return unionRanges(arg00_, arg10_);
          }, map(function (e_1) {
            return Expr_get_Range.bind(e_1)();
          }, detupledArgs));
          return mkRefTupled(g, argm, toList(map3(function (tgtTy, srcTy, arg30_) {
            return mkCoerceIfNeeded(g, tgtTy, srcTy, arg30_);
          }, actualTys, argTys_1, detupledArgs)), actualTys);
        };

        const CoerceBoundTuple = function (tupleVar, argTys_2, actualTys_1) {
          return mkRefTupled(g, appm, toList(mapIndexed2(function (i_2, actualTy, dummyTy) {
            const argExprElement = mkTupleFieldGet(g, tupInfoRef, tupleVar, argTys_2, i_2, appm);
            return mkCoerceIfNeeded(g, actualTy, dummyTy, argExprElement);
          }, actualTys_1, argTys_2)), actualTys_1);
        };

        const CoerceTupled = function (niceNames, argExpr, actualTys_2) {
          const argExprTy = tyOfExpr(g, argExpr);
          let argTys_3;
          const $var149 = actualTys_2.tail != null ? actualTys_2.tail.tail == null ? [0] : [1] : [1];

          switch ($var149[0]) {
            case 0:
              argTys_3 = ofArray([tyOfExpr(g, argExpr)]);
              break;

            case 1:
              argTys_3 = tryDestRefTupleTy(g, argExprTy);
              break;
          }

          let nm;
          const $var150 = niceNames.tail != null ? niceNames.tail.tail == null ? [0, niceNames.head] : [1] : [1];

          switch ($var150[0]) {
            case 0:
              nm = $var150[1];
              break;

            case 1:
              nm = "arg";
              break;
          }

          if (buildingLambdas) {
            const patternInput_5 = mkCompGenLocal(appm, nm, argExprTy);

            const binderBuilder = function (tm) {
              return mkCompGenLet(appm, patternInput_5[0], argExpr, tm);
            };

            let expr_1;
            const matchValue_2 = [actualTys_2, argTys_3];
            const $var151 = matchValue_2[0].tail != null ? matchValue_2[0].tail.tail == null ? matchValue_2[1].tail != null ? matchValue_2[1].tail.tail == null ? [0, matchValue_2[0].head, matchValue_2[1].head] : [1] : [1] : [1] : [1];

            switch ($var151[0]) {
              case 0:
                expr_1 = mkCoerceIfNeeded(g, $var151[1], $var151[2], patternInput_5[1]);
                break;

              case 1:
                expr_1 = CoerceBoundTuple(patternInput_5[1], argTys_3, actualTys_2);
                break;
            }

            return [binderBuilder, expr_1];
          } else if (typeEquiv(g, mkRefTupledTy(g, actualTys_2), argExprTy)) {
            return [function (tm_1) {
              return tm_1;
            }, argExpr];
          } else {
            let patternInput_6;
            const $var152 = actualTys_2.tail != null ? actualTys_2.tail.tail == null ? [0, actualTys_2.head] : [1] : [1];

            switch ($var152[0]) {
              case 0:
                patternInput_6 = [ofArray([argExpr]), ofArray([tyOfExpr(g, argExpr)])];
                break;

              case 1:
                patternInput_6 = [tryDestRefTupleExpr(argExpr), tryDestRefTupleTy(g, argExprTy)];
                break;
            }

            if (patternInput_6[0].length === actualTys_2.length) {
              return [function (tm_2) {
                return tm_2;
              }, CoerceDetupled(patternInput_6[1], patternInput_6[0], actualTys_2)];
            } else {
              const patternInput_7 = mkCompGenLocal(appm, nm, argExprTy);

              const binderBuilder_1 = function (tm_3) {
                return mkCompGenLet(appm, patternInput_7[0], argExpr, tm_3);
              };

              const expr_2 = CoerceBoundTuple(patternInput_7[1], patternInput_6[1], actualTys_2);
              return [binderBuilder_1, expr_2];
            }
          }
        };

        const patternInput_8 = mkCompGenLocal(appm, "result", patternInput[1]);
        const N = argTys.length | 0;
        const patternInput_11 = foldBack(function (tupledArg_1, tupledArg_2) {
          let inpArgTys;
          const $var153 = tupledArg_1[2].tail != null ? tupledArg_1[2].tail.tail == null ? [0] : [1] : [1];

          switch ($var153[0]) {
            case 0:
              inpArgTys = ofArray([tupledArg_1[1]]);
              break;

            case 1:
              inpArgTys = destRefTupleTy(g, tupledArg_1[1]);
              break;
          }

          const patternInput_9 = unzip(mapIndexed(function (j_1, ty) {
            return mkCompGenLocal(appm, "arg" + tupledArg_1[0].toString() + j_1.toString(), ty);
          }, inpArgTys));
          const inpsAsActualArg = CoerceDetupled(inpArgTys, patternInput_9[1], tupledArg_1[2]);
          const inpCloVarType = mkFunTy(mkRefTupledTy(g, tupledArg_1[2]), tupledArg_2[0].Type);
          const newResTy = mkFunTy(tupledArg_1[1], tupledArg_2[2]);
          const patternInput_10 = mkCompGenLocal(appm, "clo" + tupledArg_1[0].toString(), inpCloVarType);
          const newRes = tupledArg_1[0] === N - 1 ? mkMultiLambda(appm, patternInput_9[0], mkApps(g, [patternInput_10[1], inpCloVarType], new List(), ofArray([inpsAsActualArg]), appm), tupledArg_2[2]) : mkMultiLambda(appm, patternInput_9[0], mkCompGenLet(appm, tupledArg_2[0], mkApps(g, [patternInput_10[1], inpCloVarType], new List(), ofArray([inpsAsActualArg]), appm), tupledArg_2[1]), tupledArg_2[2]);
          return [patternInput_10[0], newRes, newResTy];
        }, patternInput_3[1], [patternInput_8[0], patternInput_8[1], patternInput[1]]);
        const suppliedArgs_1 = append(map(function (arg0) {
          return arg0;
        }, patternInput_4[0]), ofArray(Array.from(replicate(curriedNiceNames.length - patternInput_4[0].length, null))));
        let exprForAllArgs;

        if (patternInput_3[0].tail == null) {
          exprForAllArgs = mkCompGenLet(appm, patternInput_11[0], $var147[2], patternInput_11[1]);
        } else {
          const patternInput_14 = unzip3(toList(map3(function (tupledArg_3, niceNames_1, suppliedArg) {
            let inpArgTys_1;
            const $var154 = tupledArg_3[2].tail != null ? tupledArg_3[2].tail.tail == null ? [0] : [1] : [1];

            switch ($var154[0]) {
              case 0:
                inpArgTys_1 = ofArray([tupledArg_3[1]]);
                break;

              case 1:
                inpArgTys_1 = destRefTupleTy(g, tupledArg_3[1]);
                break;
            }

            let niceNames_2;

            if (niceNames_1.length === inpArgTys_1.length) {
              niceNames_2 = niceNames_1;
            } else {
              const $var155 = niceNames_1.tail != null ? niceNames_1.tail.tail == null ? [0, niceNames_1.head] : [1, niceNames_1] : [1, niceNames_1];

              switch ($var155[0]) {
                case 0:
                  niceNames_2 = mapIndexed(function (i_3, _arg2) {
                    return $var155[1] + i_3.toString();
                  }, inpArgTys_1);
                  break;

                case 1:
                  niceNames_2 = $var155[1];
                  break;
              }
            }

            if (suppliedArg == null) {
              const patternInput_12 = unzip(toList(map2(function (nm_1, ty_1) {
                return mkCompGenLocal(appm, nm_1, ty_1);
              }, niceNames_2, inpArgTys_1)));
              const inpsAsActualArg_1 = CoerceDetupled(inpArgTys_1, patternInput_12[1], tupledArg_3[2]);

              const lambdaBuilder = function (tm_4) {
                return mkMultiLambda(appm, patternInput_12[0], tm_4, tyOfExpr(g, tm_4));
              };

              const binderBuilder_2 = function (tm_5) {
                return tm_5;
              };

              return [lambdaBuilder, binderBuilder_2, inpsAsActualArg_1];
            } else {
              const patternInput_13 = CoerceTupled(niceNames_2, getValue(suppliedArg), tupledArg_3[2]);

              const lambdaBuilder_1 = function (tm_6) {
                return tm_6;
              };

              return [lambdaBuilder_1, patternInput_13[0], patternInput_13[1]];
            }
          }, patternInput_3[0], curriedNiceNames, suppliedArgs_1)));
          const exprApp = patternInput_3[1].tail == null ? mkApps(g, [$var147[2], $var147[1]], new List(), patternInput_14[2], appm) : mkCompGenLet(appm, patternInput_11[0], mkApps(g, [$var147[2], $var147[1]], new List(), patternInput_14[2], appm), patternInput_11[1]);
          exprForAllArgs = foldBack(function (f, acc) {
            return f(acc);
          }, patternInput_14[1], foldBack(function (f_1, acc_1) {
            return f_1(acc_1);
          }, patternInput_14[0], exprApp));
        }

        return [exprForAllArgs, patternInput_4[1]];
      }

    case 1:
      return null;
  }
}
export function NormalizeAndAdjustPossibleSubsumptionExprs(g, inputExpr) {
  let patternInput;
  const matchValue = stripExpr(inputExpr);
  const $var156 = matchValue.tag === 5 ? matchValue.data[2].tail == null ? [0, matchValue.data[1], matchValue.data[3], matchValue.data[0]] : [1] : [1];

  switch ($var156[0]) {
    case 0:
      patternInput = [$var156[3], $var156[2]];
      break;

    case 1:
      patternInput = [inputExpr, new List()];
      break;
  }

  const matchValue_1 = AdjustPossibleSubsumptionExpr(g, patternInput[0], patternInput[1]);

  if (matchValue_1 != null) {
    if (getValue(matchValue_1)[1].tail == null) {
      return getValue(matchValue_1)[0];
    } else {
      return new Expr(5, [getValue(matchValue_1)[0], tyOfExpr(g, getValue(matchValue_1)[0]), new List(), getValue(matchValue_1)[1], Expr_get_Range.bind(inputExpr)()]);
    }
  } else {
    return inputExpr;
  }
}
export function etaExpandTypeLambda(g, m, tps, tm, ty) {
  if (tps.tail == null) {
    return tm;
  } else {
    return mkTypeLambda(m, tps, mkApps(g, [tm, ty], ofArray([map(function (tp) {
      return mkTyparTy(tp);
    }, tps)]), new List(), m), ty);
  }
}
export function AdjustValToTopVal(tmp, parent, valData) {
  tmp.SetValReprInfo(valData);
  tmp.SetDeclaringEntity(parent);
  tmp.SetIsMemberOrModuleBinding();
}
export function LinearizeTopMatchAux(g, parent, spBind, m, tree, targets, m2, ty) {
  const targetsL = toList(targets);

  const itemsProj = function (tys, i, x) {
    if (tys.tail != null) {
      if (tys.tail.tail == null) {
        return x;
      } else {
        return new Expr(11, [new TOp(21, [tupInfoRef, i]), tys, ofArray([x]), m]);
      }
    } else {
      throw new Error("itemsProj: no items?");
    }
  };

  const isThrowingTarget = function (_arg1) {
    return isThrow(_arg1.data[1]);
  };

  if (1 + List_1.count(isThrowingTarget, targetsL) === targetsL.length) {
    const patternInput = getValue(tryFind_1($var157 => function (value) {
      return !value;
    }(isThrowingTarget($var157)), targetsL));
    const fvs = map(function (v) {
      return mkLocal(v.Range, v.LogicalName, v.Type)[0];
    }, patternInput.data[0]);
    const vtys = map(function (v_1) {
      return v_1.Type;
    }, patternInput.data[0]);
    const tmpTy = mkRefTupledVarsTy(g, patternInput.data[0]);
    const patternInput_1 = mkCompGenLocal(m, "matchResultHolder", tmpTy);
    AdjustValToTopVal(patternInput_1[0], parent, ValReprInfoModule.emptyValData);
    const newTg = new DecisionTreeTarget(0, [fvs, mkRefTupledVars(g, m, fvs), patternInput.data[2]]);

    const fixup = function (_arg2) {
      const matchValue = destThrow(_arg2.data[1]);

      if (matchValue == null) {
        return newTg;
      } else {
        const m_1 = getValue(matchValue)[0];
        const e = getValue(matchValue)[2];
        const tx = mkThrow(m_1, tmpTy, e);
        return new DecisionTreeTarget(0, [_arg2.data[0], tx, _arg2.data[2]]);
      }
    };

    const targets_1 = map_1(fixup, targets, Array);
    const binds = mapIndexed(function (i_1, v_2) {
      const ty_1 = v_2.Type;
      const rhs = etaExpandTypeLambda(g, m, v_2.Typars, itemsProj(vtys, i_1, patternInput_1[1]), ty_1);
      v_2.SetValReprInfo(InferArityOfExpr(g, new AllowTypeDirectedDetupling(0), ty_1, new List(), new List(), rhs));
      return mkInvisibleBind(v_2, rhs);
    }, patternInput.data[0]);
    return mkCompGenLet(m, patternInput_1[0], primMkMatch(spBind, m, tree, targets_1, m2, tmpTy), mkLetsFromBindings(m, binds, patternInput.data[1]));
  } else {
    return primMkMatch(spBind, m, tree, targets, m2, ty);
  }
}
export function LinearizeTopMatch(g, parent, _arg1) {
  if (_arg1.tag === 9) {
    return LinearizeTopMatchAux(g, parent, _arg1.data[0], _arg1.data[1], _arg1.data[2], _arg1.data[3], _arg1.data[4], _arg1.data[5]);
  } else {
    return _arg1;
  }
}
export function commaEncs(strs) {
  return join(",", strs);
}
export function angleEnc(str) {
  return "{" + str + "}";
}
export function ticksAndArgCountTextOfTyconRef(tcref) {
  const path = append(toList(fullMangledPathToTyconRef(tcref)), ofArray([tcref.CompiledName]));
  return textOfPath(path);
}
export function typarEnc(_g, gtpsType, gtpsMethod, typar) {
  const matchValue = tryFindIndex(function (lv2) {
    return typarEq(typar, lv2);
  }, gtpsType);

  if (matchValue == null) {
    const matchValue_1 = tryFindIndex(function (lv2_1) {
      return typarEq(typar, lv2_1);
    }, gtpsMethod);

    if (matchValue_1 == null) {
      warning(new InternalError("Typar not found during XmlDoc generation", typar.Range));
      return "``0";
    } else {
      return "``" + getValue(matchValue_1).toString();
    }
  } else {
    return "`" + getValue(matchValue).toString();
  }
}
export function typeEnc(g, gtpsType, gtpsMethod, ty) {
  if (verbose) {
    dprintf(printf("--> typeEnc"));
  }

  const stripped = stripTyEqnsAndMeasureEqns(g, ty);

  if (stripped.tag === 0) {
    return "Microsoft.FSharp.Core.FSharpTypeFunc";
  } else if (isArrayTy(g, ty)) {
    const patternInput = destAppTy(g, ty);
    let arraySuffix;
    const matchValue = rankOfArrayTyconRef(g, patternInput[0]) | 0;

    switch (matchValue) {
      case 1:
        arraySuffix = "[]";
        break;

      case 2:
        arraySuffix = "[0:, 0:]";
        break;

      case 3:
        arraySuffix = "[0:, 0:, 0:]";
        break;

      case 4:
        arraySuffix = "[0:, 0:, 0:, 0:]";
        break;

      default:
        throw new Error("impossible: rankOfArrayTyconRef: unsupported array rank");
    }

    return typeEnc(g, gtpsType, gtpsMethod, patternInput[1].head) + arraySuffix;
  } else {
    const $var158 = stripped.tag === 4 ? [0, stripped.data[0].data[0], stripped.data[1]] : stripped.tag === 1 ? [0, stripped.data[0], stripped.data[1]] : stripped.tag === 2 ? [1] : stripped.tag === 3 ? [2] : stripped.tag === 5 ? [3] : stripped.tag === 6 ? [4] : [5];

    switch ($var158[0]) {
      case 0:
        if (tyconRefEq(g, g.byref_tcr, $var158[1])) {
          return typeEnc(g, gtpsType, gtpsMethod, $var158[2].head) + "@";
        } else if (tyconRefEq(g, $var158[1], g.nativeptr_tcr)) {
          return typeEnc(g, gtpsType, gtpsMethod, $var158[2].head) + "*";
        } else {
          let tyName;
          const ty_1 = stripTyEqnsAndMeasureEqns(g, ty);

          if (ty_1.tag === 1) {
            const path = append(toList(fullMangledPathToTyconRef(ty_1.data[0])), ofArray([ty_1.data[0].CompiledName]));
            tyName = textOfPath(map(function (n) {
              return DemangleGenericTypeName(n);
            }, path));
          } else {
            throw new Error("impossible");
          }

          return tyName + tyargsEnc(g, gtpsType, gtpsMethod, $var158[2]);
        }

      case 1:
        if (evalTupInfoIsStruct(stripped.data[0])) {
          return toText(printf("System.ValueTuple%s"))(tyargsEnc(g, gtpsType, gtpsMethod, stripped.data[1]));
        } else {
          return toText(printf("System.Tuple%s"))(tyargsEnc(g, gtpsType, gtpsMethod, stripped.data[1]));
        }

      case 2:
        return "Microsoft.FSharp.Core.FSharpFunc" + tyargsEnc(g, gtpsType, gtpsMethod, ofArray([stripped.data[0], stripped.data[1]]));

      case 3:
        return typarEnc(g, gtpsType, gtpsMethod, stripped.data);

      case 4:
        return "?";

      case 5:
        throw new Error("C:/projects/fcs/src/fsharp/TastOps.fs", 7122, 10);
    }
  }
}
export function tyargsEnc(g, gtpsType, gtpsMethod, args) {
  var matchValue;
  const $var159 = args.tail != null ? args.tail.tail == null ? (matchValue = stripTyEqns(g, args.head), matchValue.tag === 6 ? true : false) ? [1, args.head] : [2] : [2] : [0];

  switch ($var159[0]) {
    case 0:
      return "";

    case 1:
      return "";

    case 2:
      return angleEnc(commaEncs(map(function (ty) {
        return typeEnc(g, gtpsType, gtpsMethod, ty);
      }, args)));
  }
}
export function XmlDocArgsEnc(g, gtpsType, gtpsMethod, argTs) {
  if (argTs.tail == null) {
    return "";
  } else {
    return "(" + join(",", map(function (ty) {
      return typeEnc(g, gtpsType, gtpsMethod, ty);
    }, argTs)) + ")";
  }
}
export function buildAccessPath(cp) {
  if (cp == null) {
    return "Extension Type";
  } else {
    const ap = Array.from(map(function (tuple) {
      return tuple[0];
    }, getValue(cp).AccessPath));
    return join(".", ...ap);
  }
}
export function prependPath(path, name) {
  if (path === "") {
    return name;
  } else {
    return path + "." + name;
  }
}
export function XmlDocSigOfVal(g, path, v) {
  let patternInput_4;
  const matchValue = v.MemberInfo;
  const $var160 = matchValue != null ? !v.IsExtensionMember ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var160[0]) {
    case 0:
      const patternInput = GetMemberTypeInMemberForm(g, $var160[1].MemberFlags, getValue(v.ValReprInfo), v.Type, v.Range);
      let patternInput_1;
      const matchValue_1 = $var160[1].MemberFlags.MemberKind;

      switch (matchValue_1.tag) {
        case 1:
          patternInput_1 = ["M:", "#ctor"];
          break;

        case 2:
          patternInput_1 = ["M:", v.CompiledName];
          break;

        case 5:
        case 4:
        case 3:
          patternInput_1 = ["P:", v.PropertyName];
          break;

        default:
          patternInput_1 = ["M:", "#ctor"];
      }

      const path_1 = v.HasDeclaringEntity ? prependPath(path, v.TopValDeclaringEntity.CompiledName) : path;
      let patternInput_2;
      const matchValue_2 = PartitionValTypars(g, v);

      if (matchValue_2 == null) {
        patternInput_2 = [new List(), patternInput[0]];
      } else {
        const memberParentTypars = getValue(matchValue_2)[1];
        const memberMethodTypars = getValue(matchValue_2)[2];
        patternInput_2 = [memberParentTypars, memberMethodTypars];
      }

      patternInput_4 = [patternInput_2[0], patternInput_2[1], patternInput[1], patternInput_1[0], path_1, patternInput_1[1]];
      break;

    case 1:
      const w = arityOfVal(v);
      const patternInput_3 = GetTopValTypeInCompiledForm(g, w, v.Type, v.Range);
      const name = v.CompiledName;
      const prefix = (w.NumCurriedArgs === 0 ? patternInput_3[0].tail == null : false) ? "P:" : "M:";
      patternInput_4 = [new List(), patternInput_3[0], patternInput_3[1], prefix, path, name];
      break;
  }

  const argTs = map(function (tuple) {
    return tuple[0];
  }, concat(patternInput_4[2]));
  const args = XmlDocArgsEnc(g, patternInput_4[0], patternInput_4[1], argTs);
  const arity = patternInput_4[1].length | 0;
  const genArity = arity === 0 ? "" : toText(printf("``%d"))(arity);
  return patternInput_4[3] + prependPath(patternInput_4[4], patternInput_4[5]) + genArity + args;
}
export function BuildXmlDocSig(prefix, paths) {
  return prefix + fold(function (path, name) {
    return prependPath(path, name);
  }, "", paths);
}
export const XmlDocSigOfUnionCase = CurriedLambda(function (paths) {
  return BuildXmlDocSig("T:", paths);
});
export const XmlDocSigOfField = CurriedLambda(function (paths) {
  return BuildXmlDocSig("F:", paths);
});
export const XmlDocSigOfProperty = CurriedLambda(function (paths) {
  return BuildXmlDocSig("P:", paths);
});
export const XmlDocSigOfTycon = CurriedLambda(function (paths) {
  return BuildXmlDocSig("T:", paths);
});
export const XmlDocSigOfSubModul = CurriedLambda(function (paths) {
  return BuildXmlDocSig("T:", paths);
});
export function XmlDocSigOfEntity(eref) {
  return XmlDocSigOfTycon(ofArray([buildAccessPath(eref.CompilationPathOpt), eref.Deref.CompiledName]));
}
export const enum_CompilationRepresentationAttribute_Static = 1;
export const enum_CompilationRepresentationAttribute_Instance = 2;
export const enum_CompilationRepresentationAttribute_StaticInstanceMask = 3;
export const enum_CompilationRepresentationAttribute_ModuleSuffix = 4;
export const enum_CompilationRepresentationAttribute_PermitNull = 8;
export function HasUseNullAsTrueValueAttribute(g, attribs) {
  const matchValue = TryFindFSharpInt32Attribute(g, g.attrib_CompilationRepresentationAttribute, attribs);

  if (matchValue != null) {
    return (getValue(matchValue) & enum_CompilationRepresentationAttribute_PermitNull) !== 0;
  } else {
    return false;
  }
}
export function TyconHasUseNullAsTrueValueAttribute(g, tycon) {
  return HasUseNullAsTrueValueAttribute(g, tycon.Attribs);
}
export function CanHaveUseNullAsTrueValueAttribute(_g, tycon) {
  if (tycon.IsUnionTycon) {
    const ucs = tycon.UnionCasesArray;

    if (ucs.length === 0) {
      return true;
    } else if (_Array.existsOne(function (uc) {
      return uc.IsNullary;
    }, ucs)) {
      return ucs.some(function (uc_1) {
        return !uc_1.IsNullary;
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export function IsUnionTypeWithNullAsTrueValue(g, tycon) {
  if (tycon.IsUnionTycon) {
    const ucs = tycon.UnionCasesArray;

    if (ucs.length === 0) {
      return true;
    } else if (TyconHasUseNullAsTrueValueAttribute(g, tycon) ? _Array.existsOne(function (uc) {
      return uc.IsNullary;
    }, ucs) : false) {
      return ucs.some(function (uc_1) {
        return !uc_1.IsNullary;
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export function TyconCompilesInstanceMembersAsStatic(g, tycon) {
  return IsUnionTypeWithNullAsTrueValue(g, tycon);
}
export function TcrefCompilesInstanceMembersAsStatic(g, tcref) {
  return TyconCompilesInstanceMembersAsStatic(g, tcref.Deref);
}
export function TypeNullNever(g, ty) {
  const underlyingTy = stripTyEqnsAndMeasureEqns(g, ty);

  if (isStructTy(g, underlyingTy)) {
    return true;
  } else {
    return isByrefTy(g, underlyingTy);
  }
}
export function TypeNullIsExtraValue(g, m, ty) {
  if (isILReferenceTy(g, ty) ? true : isDelegateTy(g, ty)) {
    return !(isAppTy(g, ty) ? equals(TryFindTyconRefBoolAttribute(g, m, g.attrib_AllowNullLiteralAttribute, tcrefOfAppTy(g, ty)), false) : false);
  } else if (TypeNullNever(g, ty)) {
    return false;
  } else if (isAppTy(g, ty)) {
    return equals(TryFindTyconRefBoolAttribute(g, m, g.attrib_AllowNullLiteralAttribute, tcrefOfAppTy(g, ty)), true);
  } else {
    return false;
  }
}
export function TypeNullIsTrueValue(g, ty) {
  var matchValue;

  if (matchValue = tryDestAppTy(g, ty), matchValue != null ? IsUnionTypeWithNullAsTrueValue(g, getValue(matchValue).Deref) : false) {
    return true;
  } else {
    return isUnitTy(g, ty);
  }
}
export function TypeNullNotLiked(g, m, ty) {
  if (!TypeNullIsExtraValue(g, m, ty) ? !TypeNullIsTrueValue(g, ty) : false) {
    return !TypeNullNever(g, ty);
  } else {
    return false;
  }
}
export function TypeSatisfiesNullConstraint(g, m, ty) {
  return TypeNullIsExtraValue(g, m, ty);
}
export function TypeHasDefaultValue(g, m, ty) {
  const ty_1 = stripTyEqnsAndMeasureEqns(g, ty);

  if (TypeSatisfiesNullConstraint(g, m, ty_1)) {
    return true;
  } else if (isStructTy(g, ty_1)) {
    if (isFSharpStructTy(g, ty_1)) {
      const patternInput = destAppTy(g, ty_1);
      const flds = filter(function (fld) {
        return !equals(TryFindFSharpBoolAttribute(g, g.attrib_DefaultValueAttribute, fld.FieldAttribs), false);
      }, patternInput[0].AllInstanceFieldsAsList);
      return forAll($var161 => {
        var arg00_;
        return function (arg20_) {
          return TypeHasDefaultValue(g, m, arg20_);
        }((arg00_ = mkTyconRefInst(patternInput[0], patternInput[1]), function (arg10_) {
          return actualTyOfRecdField(arg00_, arg10_);
        })($var161));
      }, flds);
    } else if (isStructTupleTy(g, ty_1)) {
      return forAll(function (arg20__1) {
        return TypeHasDefaultValue(g, m, arg20__1);
      }, destStructTupleTy(g, ty_1));
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function _SpecialComparableHeadType___(g, ty) {
  if (isAnyTupleTy(g, ty)) {
    const patternInput = destAnyTupleTy(g, ty);
    return patternInput[1];
  } else {
    const activePatternResult29476 = function (arg10_) {
      return _AppTy___(g, arg10_);
    }(ty);

    if (activePatternResult29476 != null) {
      if ((isArrayTyconRef(g, getValue(activePatternResult29476)[0]) ? true : tyconRefEq(g, getValue(activePatternResult29476)[0], g.system_UIntPtr_tcref)) ? true : tyconRefEq(g, getValue(activePatternResult29476)[0], g.system_IntPtr_tcref)) {
        return getValue(activePatternResult29476)[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

export { _SpecialComparableHeadType___ as $7C$SpecialComparableHeadType$7C$_$7C$ };

function _SpecialEquatableHeadType___(g, ty) {
  return _SpecialComparableHeadType___(g, ty);
}

export { _SpecialEquatableHeadType___ as $7C$SpecialEquatableHeadType$7C$_$7C$ };

function _SpecialNotEquatableHeadType___(g, ty) {
  if (isFunTy(g, ty)) {
    return makeSome();
  } else {
    return null;
  }
}

export { _SpecialNotEquatableHeadType___ as $7C$SpecialNotEquatableHeadType$7C$_$7C$ };
export function canUseTypeTestFast(g, ty) {
  if (!isTyparTy(g, ty) ? !TypeNullIsTrueValue(g, ty) : false) {
    return !TypeNullNever(g, ty);
  } else {
    return false;
  }
}
export function canUseUnboxFast(g, m, ty) {
  if (!isTyparTy(g, ty)) {
    return !TypeNullNotLiked(g, m, ty);
  } else {
    return false;
  }
}
export function mkIsInstConditional(g, m, tgty, vinpe, v, e2, e3) {
  if (canUseTypeTestFast(g, tgty)) {
    const mbuilder = new MatchBuilder(new SequencePointInfoForBinding(4), m);
    const tg2 = mbuilder.AddResultTarget(e2, new SequencePointInfoForTarget(1));
    const tg3 = mbuilder.AddResultTarget(e3, new SequencePointInfoForTarget(1));
    const dtree = new DecisionTree(0, [exprForVal(m, v), ofArray([new DecisionTreeCase(0, [new DecisionTreeTest(3), tg3])]), tg2, m]);
    const expr = mbuilder.Close(dtree, m, tyOfExpr(g, e2));
    return mkCompGenLet(m, v, mkIsInst(tgty, vinpe, m), expr);
  } else {
    const mbuilder_1 = new MatchBuilder(new SequencePointInfoForBinding(4), m);
    const tg2_1 = new DecisionTree(1, [ofArray([mkCallUnbox(g, m, tgty, vinpe)]), mbuilder_1.AddTarget(new DecisionTreeTarget(0, [ofArray([v]), e2, new SequencePointInfoForTarget(1)]))]);
    const tg3_1 = mbuilder_1.AddResultTarget(e3, new SequencePointInfoForTarget(1));
    const dtree_1 = new DecisionTree(0, [vinpe, ofArray([new DecisionTreeCase(0, [new DecisionTreeTest(4, [tyOfExpr(g, vinpe), tgty]), tg2_1])]), tg3_1, m]);
    const expr_1 = mbuilder_1.Close(dtree_1, m, tyOfExpr(g, e2));
    return expr_1;
  }
}
export function mkNullTest(g, m, e1, e2, e3) {
  const mbuilder = new MatchBuilder(new SequencePointInfoForBinding(4), m);
  const tg2 = mbuilder.AddResultTarget(e2, new SequencePointInfoForTarget(1));
  const tg3 = mbuilder.AddResultTarget(e3, new SequencePointInfoForTarget(1));
  const dtree = new DecisionTree(0, [e1, ofArray([new DecisionTreeCase(0, [new DecisionTreeTest(3), tg3])]), tg2, m]);
  const expr = mbuilder.Close(dtree, m, tyOfExpr(g, e2));
  return expr;
}
export function mkNonNullTest(g, m, e) {
  return mkAsmExpr(ofArray([new ILInstr(29), new ILInstr(8)]), new List(), ofArray([e]), ofArray([g.bool_ty]), m);
}
export function mkNonNullCond(g, m, ty, e1, e2, e3) {
  return mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, ty, mkNonNullTest(g, m, e1), e2, e3);
}
export function mkIfThen(g, m, e1, e2) {
  return mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.unit_ty, e1, e2, mkUnit(g, m));
}
export function ModuleNameIsMangled(g, attrs) {
  const matchValue = TryFindFSharpInt32Attribute(g, g.attrib_CompilationRepresentationAttribute, attrs);

  if (matchValue != null) {
    return (getValue(matchValue) & enum_CompilationRepresentationAttribute_ModuleSuffix) !== 0;
  } else {
    return false;
  }
}
export function CompileAsEvent(g, attrs) {
  return HasFSharpAttribute(g, g.attrib_CLIEventAttribute, attrs);
}
export function MemberIsCompiledAsInstance(g, parent, isExtensionMember, membInfo, attrs) {
  if (isExtensionMember) {
    return false;
  } else if (membInfo.MemberFlags.IsOverrideOrExplicitImpl) {
    return true;
  } else if (!(membInfo.ImplementedSlotSigs.tail == null)) {
    return true;
  } else {
    let patternInput;
    const matchValue = TryFindFSharpInt32Attribute(g, g.attrib_CompilationRepresentationAttribute, attrs);

    if (matchValue != null) {
      patternInput = [(getValue(matchValue) & enum_CompilationRepresentationAttribute_Instance) !== 0, (getValue(matchValue) & enum_CompilationRepresentationAttribute_Static) !== 0];
    } else {
      patternInput = [false, false];
    }

    if (patternInput[0]) {
      return true;
    } else if (membInfo.MemberFlags.IsInstance ? !patternInput[1] : false) {
      return !TcrefCompilesInstanceMembersAsStatic(g, parent);
    } else {
      return false;
    }
  }
}
export function isSealedTy(g, ty) {
  const ty_1 = stripTyEqnsAndMeasureEqns(g, ty);

  if ((!isRefTy(g, ty_1) ? true : isUnitTy(g, ty_1)) ? true : isArrayTy(g, ty_1)) {
    return true;
  } else {
    const matchValue = metadataOfTy(g, ty_1);

    if (matchValue.tag === 1) {
      if (isFSharpInterfaceTy(g, ty_1) ? true : isFSharpClassTy(g, ty_1)) {
        const patternInput = destAppTy(g, ty_1);
        return equals(TryFindFSharpBoolAttribute(g, g.attrib_SealedAttribute, patternInput[0].Attribs), true);
      } else {
        return true;
      }
    } else {
      const td = matchValue.data.data[2];
      return td.IsSealed;
    }
  }
}
export function isComInteropTy(g, ty) {
  const patternInput = destAppTy(g, ty);
  const matchValue = g.attrib_ComImportAttribute;

  if (matchValue != null) {
    return equals(TryFindFSharpBoolAttribute(g, getValue(matchValue), patternInput[0].Attribs), true);
  } else {
    return false;
  }
}
export function ValSpecIsCompiledAsInstance(g, v) {
  const matchValue = v.MemberInfo;

  if (matchValue != null) {
    return MemberIsCompiledAsInstance(g, v.MemberApparentEntity, v.IsExtensionMember, getValue(matchValue), v.Attribs);
  } else {
    return false;
  }
}
export function ValRefIsCompiledAsInstanceMember(g, vref) {
  return ValSpecIsCompiledAsInstance(g, vref.Deref);
}
export function GetMemberCallInfo(g, vref, vFlags) {
  const matchValue = vref.MemberInfo;
  const $var162 = matchValue != null ? !vref.IsExtensionMember ? [0, getValue(matchValue)] : [1] : [1];

  switch ($var162[0]) {
    case 0:
      const numEnclTypeArgs = vref.MemberApparentEntity.TyparsNoRange.length | 0;
      const virtualCall = (($var162[1].MemberFlags.IsOverrideOrExplicitImpl ? true : $var162[1].MemberFlags.IsDispatchSlot) ? !$var162[1].MemberFlags.IsFinal : false) ? vFlags.tag === 4 ? false : true : false;
      const isNewObj = $var162[1].MemberFlags.MemberKind.Equals(new MemberKind(1)) ? vFlags.tag === 1 ? true : false : false;
      const isSuperInit = $var162[1].MemberFlags.MemberKind.Equals(new MemberKind(1)) ? vFlags.tag === 2 ? true : false : false;
      const isSelfInit = $var162[1].MemberFlags.MemberKind.Equals(new MemberKind(1)) ? vFlags.tag === 3 ? true : false : false;
      const isCompiledAsInstance = ValRefIsCompiledAsInstanceMember(g, vref);
      const takesInstanceArg = isCompiledAsInstance ? !isNewObj : false;
      const isPropGet = $var162[1].MemberFlags.MemberKind.Equals(new MemberKind(3)) ? $var162[1].MemberFlags.IsInstance === isCompiledAsInstance : false;
      const isPropSet = $var162[1].MemberFlags.MemberKind.Equals(new MemberKind(4)) ? $var162[1].MemberFlags.IsInstance === isCompiledAsInstance : false;
      return [numEnclTypeArgs, virtualCall, isNewObj, isSuperInit, isSelfInit, takesInstanceArg, isPropGet, isPropSet];

    case 1:
      return [0, false, false, false, false, false, false, false];
  }
}
export function TryGetActivePatternInfo(vref) {
  const logicalName = vref.LogicalName;

  if (logicalName.length === 0 ? true : logicalName[0] !== "|") {
    return null;
  } else {
    return ActivePatternInfoOfValName(vref.CoreDisplayName, vref.Range);
  }
}

function ActivePatternElemRef_get_Name() {
  const matchValue = TryGetActivePatternInfo(this.data[1]);

  if (matchValue != null) {
    const nms = getValue(matchValue).ActiveTags;

    if (this.data[2] < 0 ? true : this.data[2] >= nms.length) {
      error(new InternalError("name_of_apref: index out of range for active pattern reference", this.data[1].Range));
    }

    return item(this.data[2], nms);
  } else {
    return error(new InternalError("not an active pattern name", this.data[1].Range));
  }
}

export { ActivePatternElemRef_get_Name as ActivePatternElemRef$2E$get_Name };
export function mkChoiceTyconRef(g, m, n) {
  switch (n) {
    case 0:
    case 1:
      return error(new InternalError("mkChoiceTyconRef", m));

    case 2:
      return g.choice2_tcr;

    case 3:
      return g.choice3_tcr;

    case 4:
      return g.choice4_tcr;

    case 5:
      return g.choice5_tcr;

    case 6:
      return g.choice6_tcr;

    case 7:
      return g.choice7_tcr;

    default:
      return error(new _Error(SR.tastActivePatternsLimitedToSeven(), m));
  }
}
export function mkChoiceTy(g, m, tinst) {
  const matchValue = tinst.length | 0;

  if (matchValue === 0) {
    return g.unit_ty;
  } else if (matchValue === 1) {
    return tinst.head;
  } else {
    return mkAppTy(mkChoiceTyconRef(g, m, matchValue), tinst);
  }
}
export function mkChoiceCaseRef(g, m, n, i) {
  return mkUnionCaseRef(mkChoiceTyconRef(g, m, n), "Choice" + (i + 1).toString() + "Of" + n.toString());
}

function ActivePatternInfo_get_Names() {
  return this.ActiveTags;
}

export { ActivePatternInfo_get_Names as ActivePatternInfo$2E$get_Names };

function ActivePatternInfo_ResultType(g, m, rtys) {
  const choicety = mkChoiceTy(g, m, rtys);

  if (this.IsTotal) {
    return choicety;
  } else {
    return mkOptionTy(g, choicety);
  }
}

export { ActivePatternInfo_ResultType as ActivePatternInfo$2E$ResultType };

function ActivePatternInfo_OverallType(g, m, dty, rtys) {
  return mkFunTy(dty, ((arg00, arg10, arg20) => ActivePatternInfo_ResultType.bind(this)(arg00, arg10, arg20))(g, m, rtys));
}

export { ActivePatternInfo_OverallType as ActivePatternInfo$2E$OverallType };
export function doesActivePatternHaveFreeTypars(g, v) {
  const vty = v.TauType;

  const vtps = function (xs) {
    return Zset.ofList(typarOrder, xs);
  }(v.Typars);

  if (!isFunTy(g, v.TauType)) {
    errorR(new _Error(SR.activePatternIdentIsNotFunctionTyped(v.LogicalName), v.Range));
  }

  const patternInput = stripFunTy(g, vty);
  const patternInput_1 = [freeInTypes(CollectTypars, patternInput[0]).FreeTypars, freeInType(CollectTypars, patternInput[1]).FreeTypars];
  return !ZsetModule.isEmpty(ZsetModule.inter(ZsetModule.diff(patternInput_1[1], patternInput_1[0]), vtps));
}
export class ExprRewritingEnv {
  constructor(preIntercept, postTransform, preInterceptBinding, isUnderQuotations) {
    this.PreIntercept = preIntercept;
    this.PostTransform = postTransform;
    this.PreInterceptBinding = preInterceptBinding;
    this.IsUnderQuotations = isUnderQuotations;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.ExprRewritingEnv",
      interfaces: ["FSharpRecord"],
      properties: {
        PreIntercept: Option(_Function([_Function([Expr, Expr]), Expr, Option(Expr)])),
        PostTransform: _Function([Expr, Option(Expr)]),
        PreInterceptBinding: Option(_Function([_Function([Expr, Expr]), Binding, Option(Binding)])),
        IsUnderQuotations: "boolean"
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.ExprRewritingEnv", ExprRewritingEnv);
export function rewriteBind(env, bind) {
  if (env.PreInterceptBinding == null) {
    return rewriteBindStructure(env, bind);
  } else {
    const matchValue = getValue(env.PreInterceptBinding)(function (arg10_) {
      return RewriteExpr(env, arg10_);
    }, bind);

    if (matchValue == null) {
      return rewriteBindStructure(env, bind);
    } else {
      return getValue(matchValue);
    }
  }
}
export function rewriteBindStructure(env, _arg1) {
  return new Binding(0, [_arg1.data[0], RewriteExpr(env, _arg1.data[1]), _arg1.data[2]]);
}
export function rewriteBinds(env, binds) {
  return map(function (bind) {
    return rewriteBind(env, bind);
  }, binds);
}
export function RewriteExpr(env, expr) {
  const $var163 = expr.tag === 7 ? [0] : expr.tag === 2 ? [0] : [1];

  switch ($var163[0]) {
    case 0:
      return rewriteLinearExpr(env, expr, function (e) {
        return e;
      });

    case 1:
      let expr_1;
      const matchValue = preRewriteExpr(env, expr);

      if (matchValue == null) {
        expr_1 = rewriteExprStructure(env, expr);
      } else {
        expr_1 = getValue(matchValue);
      }

      return postRewriteExpr(env, expr_1);
  }
}
export function preRewriteExpr(env, expr) {
  if (env.PreIntercept == null) {
    return null;
  } else {
    return getValue(env.PreIntercept)(function (arg10_) {
      return RewriteExpr(env, arg10_);
    }, expr);
  }
}
export function postRewriteExpr(env, expr) {
  const matchValue = env.PostTransform(expr);

  if (matchValue != null) {
    return getValue(matchValue);
  } else {
    return expr;
  }
}
export function rewriteExprStructure(env, expr) {
  const $var164 = expr.tag === 1 ? [0] : expr.tag === 5 ? [1, expr.data[3], expr.data[0], expr.data[1], expr.data[4], expr.data[2]] : expr.tag === 12 ? expr.data[1].contents == null ? [3, expr.data[0], expr.data[2], expr.data[3], expr.data[4]] : [2, getValue(expr.data[1].contents)[2], getValue(expr.data[1].contents)[1], expr.data[0], getValue(expr.data[1].contents)[3], expr.data[2], expr.data[3], expr.data[4], getValue(expr.data[1].contents)[0]] : expr.tag === 8 ? [4, expr.data[3], expr.data[2], expr.data[5], expr.data[6], expr.data[4], expr.data[1]] : expr.tag === 14 ? [5, expr.data] : expr.tag === 11 ? [6, expr.data[2], expr.data[0], expr.data[3], expr.data[1]] : expr.tag === 3 ? [7, expr.data[0], expr.data[3], expr.data[2], expr.data[4], expr.data[1], expr.data[5], expr.data[6]] : expr.tag === 4 ? [8, expr.data[0], expr.data[1], expr.data[2], expr.data[3], expr.data[4]] : expr.tag === 9 ? [9, expr.data[2], expr.data[1], expr.data[4], expr.data[0], expr.data[3], expr.data[5]] : expr.tag === 6 ? [10, expr.data[0], expr.data[1], expr.data[2]] : expr.tag === 7 ? [11] : expr.tag === 2 ? [12] : expr.tag === 10 ? [13, expr.data[0], expr.data[1], expr.data[2], expr.data[3]] : expr.tag === 13 ? [14, expr.data[0], expr.data[1], expr.data[2]] : [0];

  switch ($var164[0]) {
    case 0:
      return expr;

    case 1:
      const f0_ = RewriteExpr(env, $var164[2]);
      const args_ = rewriteExprs(env, $var164[1]);

      if ($var164[2] === f0_ ? $var164[1] === args_ : false) {
        return expr;
      } else {
        return new Expr(5, [f0_, $var164[3], $var164[5], args_, $var164[4]]);
      }

    case 2:
      return new Expr(12, [env.IsUnderQuotations ? RewriteExpr(env, $var164[3]) : $var164[3], {
        contents: [$var164[8], $var164[2], rewriteExprs(env, $var164[1]), $var164[4]]
      }, $var164[5], $var164[6], $var164[7]]);

    case 3:
      return new Expr(12, [env.IsUnderQuotations ? RewriteExpr(env, $var164[1]) : $var164[1], {
        contents: null
      }, $var164[2], $var164[3], $var164[4]]);

    case 4:
      return mkObjExpr($var164[6], $var164[2], RewriteExpr(env, $var164[1]), map(function (arg10_) {
        return rewriteObjExprOverride(env, arg10_);
      }, $var164[5]), map(function (tupledArg) {
        return rewriteObjExprInterfaceImpl(env, tupledArg[0], tupledArg[1]);
      }, $var164[3]), $var164[4]);

    case 5:
      return RewriteExpr(env, $var164[1].contents);

    case 6:
      const args__1 = rewriteExprs(env, $var164[1]);

      if ($var164[1] === args__1) {
        return expr;
      } else {
        return new Expr(11, [$var164[2], $var164[4], args__1, $var164[3]]);
      }

    case 7:
      const body = RewriteExpr(env, $var164[4]);
      return rebuildLambda($var164[6], $var164[5], $var164[3], $var164[2], body, $var164[7]);

    case 8:
      const body_1 = RewriteExpr(env, $var164[3]);
      return mkTypeLambda($var164[4], $var164[2], body_1, $var164[5]);

    case 9:
      const dtree_ = rewriteDecisionTree(env, $var164[1]);
      const targets_ = rewriteTargets(env, $var164[5]);
      return mkAndSimplifyMatch($var164[4], $var164[2], $var164[3], $var164[6], dtree_, targets_);

    case 10:
      const binds = rewriteBinds(env, $var164[1]);
      const e_ = RewriteExpr(env, $var164[2]);
      return new Expr(6, [binds, e_, $var164[3], NewFreeVarsCache()]);

    case 11:
      throw new Error("unreachable - linear let");

    case 12:
      throw new Error("unreachable - linear seq");

    case 13:
      const e2_ = RewriteExpr(env, $var164[2]);
      const e3_ = RewriteExpr(env, $var164[3]);
      return new Expr(10, [$var164[1], e2_, e3_, $var164[4]]);

    case 14:
      return new Expr(13, [$var164[1], RewriteExpr(env, $var164[2]), $var164[3]]);
  }
}
export function rewriteLinearExpr($var352, $var353, $var354) {
  rewriteLinearExpr: while (true) {
    const env = $var352;
    const expr = $var353;
    const contf = $var354;

    const contf_1 = $var165 => {
      return contf(function (expr_1) {
        return postRewriteExpr(env, expr_1);
      }($var165));
    };

    const matchValue = preRewriteExpr(env, expr);

    if (matchValue == null) {
      if (expr.tag === 7) {
        const bind = rewriteBind(env, expr.data[0]);
        $var352 = env;
        $var353 = expr.data[1];

        $var354 = $var166 => contf_1(function (body_) {
          return mkLetBind(expr.data[2], bind, body_);
        }($var166));

        continue rewriteLinearExpr;
      } else if (expr.tag === 2) {
        const e1_ = RewriteExpr(env, expr.data[0]);
        $var352 = env;
        $var353 = expr.data[1];

        $var354 = $var167 => contf_1(function (e2_) {
          return (expr.data[0] === e1_ ? expr.data[1] === e2_ : false) ? expr : new Expr(2, [e1_, e2_, expr.data[2], expr.data[3], expr.data[4]]);
        }($var167));

        continue rewriteLinearExpr;
      } else {
        const activePatternResult29579 = _LinearMatchExpr___(expr);

        if (activePatternResult29579 != null) {
          const dtree = rewriteDecisionTree(env, getValue(activePatternResult29579)[2]);
          const tg1 = rewriteTarget(env, getValue(activePatternResult29579)[3]);
          $var352 = env;
          $var353 = getValue(activePatternResult29579)[4];

          $var354 = $var168 => contf_1(function (e2) {
            return rebuildLinearMatchExpr([getValue(activePatternResult29579)[0], getValue(activePatternResult29579)[1], dtree, tg1, e2, getValue(activePatternResult29579)[5], getValue(activePatternResult29579)[6], getValue(activePatternResult29579)[7]]);
          }($var168));

          continue rewriteLinearExpr;
        } else {
          return contf_1(RewriteExpr(env, expr));
        }
      }
    } else {
      return contf_1(getValue(matchValue));
    }
  }
}
export function rewriteExprs(env, exprs) {
  return List_1.mapq(function (arg10_) {
    return RewriteExpr(env, arg10_);
  }, exprs);
}
export function rewriteFlatExprs(env, exprs) {
  return List_1.mapq(function (arg10_) {
    return RewriteExpr(env, arg10_);
  }, exprs);
}
export function rewriteDecisionTree(env, x) {
  if (x.tag === 0) {
    const e_ = RewriteExpr(env, x.data[0]);
    const cases_ = map(function (_arg1) {
      return new DecisionTreeCase(0, [_arg1.data[0], rewriteDecisionTree(env, _arg1.data[1])]);
    }, x.data[1]);
    const dflt_ = defaultArg(x.data[2], null, function (x_1) {
      return rewriteDecisionTree(env, x_1);
    });
    return new DecisionTree(0, [e_, cases_, dflt_, x.data[3]]);
  } else if (x.tag === 2) {
    const bind_ = rewriteBind(env, x.data[0]);
    const body = rewriteDecisionTree(env, x.data[1]);
    return new DecisionTree(2, [bind_, body]);
  } else {
    const es_ = rewriteFlatExprs(env, x.data[0]);

    if (x.data[0] === es_) {
      return x;
    } else {
      return new DecisionTree(1, [es_, x.data[1]]);
    }
  }
}
export function rewriteTarget(env, _arg2) {
  return new DecisionTreeTarget(0, [_arg2.data[0], RewriteExpr(env, _arg2.data[1]), _arg2.data[2]]);
}
export function rewriteTargets(env, targets) {
  return map(function (arg10_) {
    return rewriteTarget(env, arg10_);
  }, toList(targets));
}
export function rewriteObjExprOverride(env, _arg3) {
  return new ObjExprMethod(0, [_arg3.data[0], _arg3.data[1], _arg3.data[2], _arg3.data[3], RewriteExpr(env, _arg3.data[4]), _arg3.data[5]]);
}
export function rewriteObjExprInterfaceImpl(env, ty, overrides) {
  return [ty, map(function (arg10_) {
    return rewriteObjExprOverride(env, arg10_);
  }, overrides)];
}
export function rewriteModuleOrNamespaceExpr(env, x) {
  return new ModuleOrNamespaceExprWithSig(0, [x.data[0], rewriteModuleOrNamespaceDef(env, x.data[1]), x.data[2]]);
}
export function rewriteModuleOrNamespaceDefs(env, x) {
  return map(function (x_1) {
    return rewriteModuleOrNamespaceDef(env, x_1);
  }, x);
}
export function rewriteModuleOrNamespaceDef(env, x) {
  switch (x.tag) {
    case 2:
      return new ModuleOrNamespaceExpr(2, [rewriteBind(env, x.data[0]), x.data[1]]);

    case 3:
      return new ModuleOrNamespaceExpr(3, [RewriteExpr(env, x.data[0]), x.data[1]]);

    case 1:
      return new ModuleOrNamespaceExpr(1, rewriteModuleOrNamespaceDefs(env, x.data));

    case 0:
      return new ModuleOrNamespaceExpr(0, rewriteModuleOrNamespaceExpr(env, x.data));

    default:
      return new ModuleOrNamespaceExpr(4, [x.data[0], x.data[1], rewriteModuleOrNamespaceBindings(env, x.data[2]), x.data[3]]);
  }
}
export function rewriteModuleOrNamespaceBinding(env, x) {
  if (x.tag === 1) {
    return new ModuleOrNamespaceBinding(1, [x.data[0], rewriteModuleOrNamespaceDef(env, x.data[1])]);
  } else {
    return new ModuleOrNamespaceBinding(0, rewriteBind(env, x.data));
  }
}
export function rewriteModuleOrNamespaceBindings(env, mbinds) {
  return map(function (x) {
    return rewriteModuleOrNamespaceBinding(env, x);
  }, mbinds);
}
export function RewriteImplFile(env, mv) {
  return mapTImplFile(function (x) {
    return rewriteModuleOrNamespaceExpr(env, x);
  }, mv);
}
export function MakeExportRemapping(viewedCcu, mspec) {
  const accEntityRemap_1 = function (entity, acc) {
    const matchValue = tryRescopeEntity(viewedCcu, entity);

    if (matchValue == null) {
      if (entity.IsNamespace) {
        return acc;
      } else {
        return error(new InternalError("Unexpected entity without a pubpath when remapping assembly data", entity.Range));
      }
    } else {
      return addTyconRefRemap(mkLocalTyconRef(entity), getValue(matchValue), acc);
    }
  };

  const accValRemap_1 = function (vspec, acc_1) {
    const matchValue_1 = tryRescopeVal(viewedCcu, acc_1, vspec);

    if (matchValue_1 == null) {
      return error(new InternalError("Unexpected value without a pubpath when remapping assembly data", vspec.Range));
    } else {
      const valRemap = function (arg00, arg10) {
        return acc_1.valRemap.Add(arg00, arg10);
      }(vspec, getValue(matchValue_1));

      return new Remap(acc_1.tpinst, valRemap, acc_1.tyconRefRemap, acc_1.removeTraitSolutions);
    }
  };

  const mty = mspec.ModuleOrNamespaceType;
  const entities = allEntitiesOfModuleOrNamespaceTy(mty);
  const vs = allValsOfModuleOrNamespaceTy(mty);
  const acc_2 = foldBack(accEntityRemap_1, entities, Remap.Empty);
  const allRemap = foldBack(accValRemap_1, vs, acc_2);
  return allRemap;
}
export function remapEntityDataToNonLocal(g, tmenv, d) {
  const patternInput = tmenvCopyRemapAndBindTypars(function (xs) {
    return remapAttribs(g, tmenv, xs);
  }, tmenv, d.entity_typars.Force(d.entity_range));
  const typarsR = LazyWithContext.NotLazy(patternInput[0]);

  const attribsR = function (xs_1) {
    return remapAttribs(g, patternInput[1], xs_1);
  }(d.entity_attribs);

  const tyconReprR = function (repr) {
    return remapTyconRepr(g, patternInput[1], repr);
  }(d.entity_tycon_repr);

  const tyconAbbrevR = defaultArg(d.TypeAbbrev, null, function (x) {
    return remapType(patternInput[1], x);
  });

  const tyconTcaugR = function (x_1) {
    return remapTyconAug(patternInput[1], x_1);
  }(d.entity_tycon_tcaug);

  const modulContentsR = new MaybeLazy(0, mapImmediateValsAndTycons(function (x_2) {
    return remapTyconToNonLocal(g, tmenv, x_2);
  }, function (inp) {
    return remapValToNonLocal(g, tmenv, inp);
  }, d.entity_modul_contents.Value));

  const exnInfoR = function (inp_1) {
    return remapTyconExnInfo(g, patternInput[1], inp_1);
  }(d.ExceptionInfo);

  let entity_opt_data;
  const matchValue = d.entity_opt_data;

  if (matchValue != null) {
    entity_opt_data = new EntityOptionalData(getValue(matchValue).entity_compiled_name, getValue(matchValue).entity_other_range, getValue(matchValue).entity_kind, getValue(matchValue).entity_xmldoc, getValue(matchValue).entity_xmldocsig, tyconAbbrevR, getValue(matchValue).entity_tycon_repr_accessibility, getValue(matchValue).entity_accessiblity, exnInfoR);
  } else {
    entity_opt_data = null;
  }

  return new Entity(typarsR, d.entity_flags, d.entity_stamp, d.entity_logical_name, d.entity_range, attribsR, tyconReprR, tyconTcaugR, modulContentsR, d.entity_pubpath, d.entity_cpath, d.entity_il_repr_cache, entity_opt_data);
}
export function remapTyconToNonLocal(g, tmenv, x) {
  return NewModifiedTycon(function (d) {
    return remapEntityDataToNonLocal(g, tmenv, d);
  }, x);
}
export function remapValToNonLocal(g, tmenv, inp) {
  return NewModifiedVal(function (d) {
    return remapValData(g, tmenv, d);
  }, inp);
}
export function ApplyExportRemappingToEntity(g, tmenv, x) {
  return remapTyconToNonLocal(g, tmenv, x);
}
export function isCompiledConstraint(cx) {
  switch (cx.tag) {
    case 2:
    case 5:
    case 4:
    case 7:
    case 0:
      return true;

    default:
      return false;
  }
}
export function IsGenericValWithGenericContraints(g, v) {
  if (isForallTy(g, v.Type)) {
    return exists(function (tp) {
      return exists(function (cx) {
        return isCompiledConstraint(cx);
      }, tp.Constraints);
    }, function (arg10_) {
      return destForallTy(g, arg10_);
    }(v.Type)[0]);
  } else {
    return false;
  }
}

function Entity_HasInterface(g, ty) {
  return exists(tupledArg => typeEquiv(g, ty, tupledArg[0]), this.TypeContents.tcaug_interfaces);
}

export { Entity_HasInterface as Entity$2E$HasInterface };

function Entity_HasOverride(g, nm, argtys) {
  return exists(vref => {
    const matchValue = vref.MemberInfo;

    if (matchValue != null) {
      const argInfos = ArgInfosOfMember(g, vref);

      if (argInfos.length === 1 ? List_1.lengthsEqAndForall2((arg10_, arg20_) => typeEquiv(g, arg10_, arg20_), map(tuple => tuple[0], argInfos.head), argtys) : false) {
        return getValue(matchValue).MemberFlags.IsOverrideOrExplicitImpl;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }, (m => NameMultiMapModule.find(nm, m))(this.TypeContents.tcaug_adhoc));
}

export { Entity_HasOverride as Entity$2E$HasOverride };

function Entity_HasMember(g, nm, argtys) {
  return exists(vref => {
    const matchValue = vref.MemberInfo;

    if (matchValue == null) {
      return false;
    } else {
      const argInfos = ArgInfosOfMember(g, vref);

      if (argInfos.length === 1) {
        return List_1.lengthsEqAndForall2((arg10_, arg20_) => typeEquiv(g, arg10_, arg20_), map(tuple => tuple[0], argInfos.head), argtys);
      } else {
        return false;
      }
    }
  }, (m => NameMultiMapModule.find(nm, m))(this.TypeContents.tcaug_adhoc));
}

export { Entity_HasMember as Entity$2E$HasMember };

function EntityRef_HasInterface(g, ty) {
  var objectArg;
  return (objectArg = this.Deref, (arg00, arg10) => Entity_HasInterface.bind(objectArg)(arg00, arg10))(g, ty);
}

export { EntityRef_HasInterface as EntityRef$2E$HasInterface };

function EntityRef_HasOverride(g, nm, argtys) {
  var objectArg;
  return (objectArg = this.Deref, (arg00, arg10, arg20) => Entity_HasOverride.bind(objectArg)(arg00, arg10, arg20))(g, nm, argtys);
}

export { EntityRef_HasOverride as EntityRef$2E$HasOverride };

function EntityRef_HasMember(g, nm, argtys) {
  var objectArg;
  return (objectArg = this.Deref, (arg00, arg10, arg20) => Entity_HasMember.bind(objectArg)(arg00, arg10, arg20))(g, nm, argtys);
}

export { EntityRef_HasMember as EntityRef$2E$HasMember };
export function mkFastForLoop(g, spLet, m, idv, start, dir, finish, body) {
  const dir_1 = dir ? new ForLoopStyle(0) : new ForLoopStyle(1);
  return mkFor(g, spLet, idv, start, dir_1, finish, body, m);
}
export function IsSimpleSyntacticConstantExpr(g, inputExpr) {
  const checkExpr = function (vrefs, x) {
    var vref_1;
    var arg;
    var vref_2;
    var arg_1;
    var vref_3;
    var arg_2;
    var vref_4;
    var arg_3;
    var vref;
    var arg2;
    var arg1;

    checkExpr: while (true) {
      const matchValue = stripExpr(x);
      let $var169;

      if (matchValue.tag === 11) {
        if (matchValue.data[0].tag === 24) {
          if (matchValue.data[2].tail != null) {
            if (matchValue.data[2].tail.tail == null) {
              $var169 = [0, matchValue.data[2].head];
            } else {
              const activePatternResult29684 = _UnopExpr___(g, matchValue);

              if (activePatternResult29684 != null) {
                if (vref_1 = getValue(activePatternResult29684)[0], arg = getValue(activePatternResult29684)[1], (((valRefEq(g, vref_1, g.unchecked_unary_minus_vref) ? true : valRefEq(g, vref_1, g.unchecked_unary_plus_vref)) ? true : valRefEq(g, vref_1, g.unchecked_unary_not_vref)) ? true : valRefEq(g, vref_1, g.bitwise_unary_not_vref)) ? true : valRefEq(g, vref_1, g.enum_vref)) {
                  $var169 = [1, getValue(activePatternResult29684)[1], getValue(activePatternResult29684)[0]];
                } else {
                  $var169 = [2];
                }
              } else {
                $var169 = [2];
              }
            }
          } else {
            const activePatternResult29685 = _UnopExpr___(g, matchValue);

            if (activePatternResult29685 != null) {
              if (vref_2 = getValue(activePatternResult29685)[0], arg_1 = getValue(activePatternResult29685)[1], (((valRefEq(g, vref_2, g.unchecked_unary_minus_vref) ? true : valRefEq(g, vref_2, g.unchecked_unary_plus_vref)) ? true : valRefEq(g, vref_2, g.unchecked_unary_not_vref)) ? true : valRefEq(g, vref_2, g.bitwise_unary_not_vref)) ? true : valRefEq(g, vref_2, g.enum_vref)) {
                $var169 = [1, getValue(activePatternResult29685)[1], getValue(activePatternResult29685)[0]];
              } else {
                $var169 = [2];
              }
            } else {
              $var169 = [2];
            }
          }
        } else {
          const activePatternResult29686 = _UnopExpr___(g, matchValue);

          if (activePatternResult29686 != null) {
            if (vref_3 = getValue(activePatternResult29686)[0], arg_2 = getValue(activePatternResult29686)[1], (((valRefEq(g, vref_3, g.unchecked_unary_minus_vref) ? true : valRefEq(g, vref_3, g.unchecked_unary_plus_vref)) ? true : valRefEq(g, vref_3, g.unchecked_unary_not_vref)) ? true : valRefEq(g, vref_3, g.bitwise_unary_not_vref)) ? true : valRefEq(g, vref_3, g.enum_vref)) {
              $var169 = [1, getValue(activePatternResult29686)[1], getValue(activePatternResult29686)[0]];
            } else {
              $var169 = [2];
            }
          } else {
            $var169 = [2];
          }
        }
      } else {
        const activePatternResult29687 = _UnopExpr___(g, matchValue);

        if (activePatternResult29687 != null) {
          if (vref_4 = getValue(activePatternResult29687)[0], arg_3 = getValue(activePatternResult29687)[1], (((valRefEq(g, vref_4, g.unchecked_unary_minus_vref) ? true : valRefEq(g, vref_4, g.unchecked_unary_plus_vref)) ? true : valRefEq(g, vref_4, g.unchecked_unary_not_vref)) ? true : valRefEq(g, vref_4, g.bitwise_unary_not_vref)) ? true : valRefEq(g, vref_4, g.enum_vref)) {
            $var169 = [1, getValue(activePatternResult29687)[1], getValue(activePatternResult29687)[0]];
          } else {
            $var169 = [2];
          }
        } else {
          $var169 = [2];
        }
      }

      switch ($var169[0]) {
        case 0:
          vrefs = vrefs;
          x = $var169[1];
          continue checkExpr;

        case 1:
          vrefs = vrefs;
          x = $var169[1];
          continue checkExpr;

        case 2:
          let $var170;

          const activePatternResult29682 = _BinopExpr___(g, matchValue);

          if (activePatternResult29682 != null) {
            if (vref = getValue(activePatternResult29682)[0], arg2 = getValue(activePatternResult29682)[2], arg1 = getValue(activePatternResult29682)[1], (((((((((((((((valRefEq(g, vref, g.equals_operator_vref) ? true : valRefEq(g, vref, g.compare_operator_vref)) ? true : valRefEq(g, vref, g.unchecked_addition_vref)) ? true : valRefEq(g, vref, g.less_than_operator_vref)) ? true : valRefEq(g, vref, g.less_than_or_equals_operator_vref)) ? true : valRefEq(g, vref, g.greater_than_operator_vref)) ? true : valRefEq(g, vref, g.greater_than_or_equals_operator_vref)) ? true : valRefEq(g, vref, g.not_equals_operator_vref)) ? true : valRefEq(g, vref, g.unchecked_addition_vref)) ? true : valRefEq(g, vref, g.unchecked_multiply_vref)) ? true : valRefEq(g, vref, g.unchecked_subtraction_vref)) ? true : valRefEq(g, vref, g.bitwise_shift_left_vref)) ? true : valRefEq(g, vref, g.bitwise_shift_right_vref)) ? true : valRefEq(g, vref, g.bitwise_xor_vref)) ? true : valRefEq(g, vref, g.bitwise_and_vref)) ? true : valRefEq(g, vref, g.bitwise_or_vref)) ? !typeEquiv(g, tyOfExpr(g, arg1), g.string_ty) ? !typeEquiv(g, tyOfExpr(g, arg1), g.decimal_ty) : false : false) {
              $var170 = [0, getValue(activePatternResult29682)[1], getValue(activePatternResult29682)[2], getValue(activePatternResult29682)[0]];
            } else {
              $var170 = [1];
            }
          } else {
            $var170 = [1];
          }

          switch ($var170[0]) {
            case 0:
              if (checkExpr(vrefs, $var170[1])) {
                vrefs = vrefs;
                x = $var170[2];
                continue checkExpr;
              } else {
                return false;
              }

            case 1:
              let $var171;

              if (matchValue.tag === 1) {
                $var171 = [0, matchValue.data[0]];
              } else if (matchValue.tag === 9) {
                $var171 = [1, matchValue.data[2], matchValue.data[3]];
              } else if (matchValue.tag === 7) {
                $var171 = [2, matchValue.data[0], matchValue.data[1]];
              } else if (matchValue.tag === 13) {
                $var171 = [3, matchValue.data[1]];
              } else if (matchValue.tag === 0) {
                $var171 = [4];
              } else if (matchValue.tag === 11) {
                if (matchValue.data[0].tag === 0) {
                  if (matchValue.data[2].tail == null) {
                    $var171 = [4];
                  } else {
                    const activePatternResult29672 = function (expr) {
                      return _UncheckedDefaultOfExpr___(g, expr);
                    }(matchValue);

                    if (activePatternResult29672 != null) {
                      $var171 = [4];
                    } else {
                      const activePatternResult29673 = function (expr_1) {
                        return _SizeOfExpr___(g, expr_1);
                      }(matchValue);

                      if (activePatternResult29673 != null) {
                        $var171 = [4];
                      } else {
                        const activePatternResult29674 = function (arg10_) {
                          return _TypeOfExpr___(g, arg10_);
                        }(matchValue);

                        if (activePatternResult29674 != null) {
                          $var171 = [4];
                        } else {
                          $var171 = [5];
                        }
                      }
                    }
                  }
                } else {
                  const activePatternResult29675 = function (expr_2) {
                    return _UncheckedDefaultOfExpr___(g, expr_2);
                  }(matchValue);

                  if (activePatternResult29675 != null) {
                    $var171 = [4];
                  } else {
                    const activePatternResult29676 = function (expr_3) {
                      return _SizeOfExpr___(g, expr_3);
                    }(matchValue);

                    if (activePatternResult29676 != null) {
                      $var171 = [4];
                    } else {
                      const activePatternResult29677 = function (arg10__1) {
                        return _TypeOfExpr___(g, arg10__1);
                      }(matchValue);

                      if (activePatternResult29677 != null) {
                        $var171 = [4];
                      } else {
                        $var171 = [5];
                      }
                    }
                  }
                }
              } else {
                const activePatternResult29678 = function (expr_4) {
                  return _UncheckedDefaultOfExpr___(g, expr_4);
                }(matchValue);

                if (activePatternResult29678 != null) {
                  $var171 = [4];
                } else {
                  const activePatternResult29679 = function (expr_5) {
                    return _SizeOfExpr___(g, expr_5);
                  }(matchValue);

                  if (activePatternResult29679 != null) {
                    $var171 = [4];
                  } else {
                    const activePatternResult29680 = function (arg10__2) {
                      return _TypeOfExpr___(g, arg10__2);
                    }(matchValue);

                    if (activePatternResult29680 != null) {
                      $var171 = [4];
                    } else {
                      $var171 = [5];
                    }
                  }
                }
              }

              switch ($var171[0]) {
                case 0:
                  if ($var171[1].Deref.IsCompiledAsStaticPropertyWithoutField) {
                    return true;
                  } else {
                    return vrefs.has($var171[1].Stamp);
                  }

                case 1:
                  if (checkDecisionTree(vrefs, $var171[1])) {
                    return $var171[2].every(CurriedLambda(checkDecisionTreeTarget)(vrefs));
                  } else {
                    return false;
                  }

                case 2:
                  if (checkExpr(vrefs, $var171[1].Expr)) {
                    vrefs = add_1($var171[1].Var.Stamp, vrefs);
                    x = $var171[2];
                    continue checkExpr;
                  } else {
                    return false;
                  }

                case 3:
                  vrefs = vrefs;
                  x = $var171[1];
                  continue checkExpr;

                case 4:
                  return true;

                case 5:
                  return false;
              }

          }

      }
    }
  };

  const checkDecisionTree = function (vrefs_1, x_1) {
    checkDecisionTree: while (true) {
      if (x_1.tag === 0) {
        if (checkExpr(vrefs_1, x_1.data[0]) ? forAll(CurriedLambda(checkDecisionTreeCase)(vrefs_1), x_1.data[1]) : false) {
          return forAll(CurriedLambda(checkDecisionTree)(vrefs_1), defaultArg(x_1.data[2], [], $var172 => [$var172]));
        } else {
          return false;
        }
      } else if (x_1.tag === 2) {
        if (checkExpr(vrefs_1, x_1.data[0].Expr)) {
          vrefs_1 = add_1(x_1.data[0].Var.Stamp, vrefs_1);
          x_1 = x_1.data[1];
          continue checkDecisionTree;
        } else {
          return false;
        }
      } else {
        return forAll(CurriedLambda(checkExpr)(vrefs_1), x_1.data[0]);
      }
    }
  };

  const checkDecisionTreeCase = function (vrefs_2, _arg1) {
    if (_arg1.data[0].tag === 2 ? true : false) {
      return checkDecisionTree(vrefs_2, _arg1.data[1]);
    } else {
      return false;
    }
  };

  const checkDecisionTreeTarget = function (vrefs_3, _arg2) {
    const vrefs_4 = fold(function (s, v) {
      return add_1(v.Stamp, s);
    }, vrefs_3, _arg2.data[0]);
    return checkExpr(vrefs_4, _arg2.data[1]);
  };

  return checkExpr(create_1(null, new Comparer((x, y) => x.CompareTo(y))), inputExpr);
}
export function EvalArithBinOp(opInt8, opInt16, opInt32, opInt64, opUInt8, opUInt16, opUInt32, opUInt64, arg1, arg2) {
  const m = unionRanges(Expr_get_Range.bind(arg1)(), Expr_get_Range.bind(arg2)());

  try {
    const matchValue = [arg1, arg2];
    const $var173 = matchValue[0].tag === 0 ? matchValue[0].data[0].tag === 5 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 5 ? [0, matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [8] : [8] : matchValue[0].data[0].tag === 1 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 1 ? [1, matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [8] : [8] : matchValue[0].data[0].tag === 3 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 3 ? [2, matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [8] : [8] : matchValue[0].data[0].tag === 7 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 7 ? [3, matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [8] : [8] : matchValue[0].data[0].tag === 2 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 2 ? [4, matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [8] : [8] : matchValue[0].data[0].tag === 4 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 4 ? [5, matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [8] : [8] : matchValue[0].data[0].tag === 6 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 6 ? [6, matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [8] : [8] : matchValue[0].data[0].tag === 8 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 8 ? [7, matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [8] : [8] : [8] : [8];

    switch ($var173[0]) {
      case 0:
        return new Expr(0, [new Const(5, opInt32($var173[2], $var173[3])), m, $var173[1]]);

      case 1:
        return new Expr(0, [new Const(1, opInt8($var173[2], $var173[3])), m, $var173[1]]);

      case 2:
        return new Expr(0, [new Const(3, opInt16($var173[2], $var173[3])), m, $var173[1]]);

      case 3:
        return new Expr(0, [new Const(7, opInt64($var173[2], $var173[3])), m, $var173[1]]);

      case 4:
        return new Expr(0, [new Const(2, opUInt8($var173[2], $var173[3])), m, $var173[1]]);

      case 5:
        return new Expr(0, [new Const(4, opUInt16($var173[2], $var173[3])), m, $var173[1]]);

      case 6:
        return new Expr(0, [new Const(6, opUInt32($var173[2], $var173[3])), m, $var173[1]]);

      case 7:
        return new Expr(0, [new Const(8, opUInt64($var173[2], $var173[3])), m, $var173[1]]);

      case 8:
        return error(new _Error(SR.tastNotAConstantExpression(), m));
    }
  } catch (matchValue_1) {
    if (matchValue_1 instanceof Error) {
      return error(new _Error(SR.tastConstantExpressionOverflow(), m));
    } else {
      throw matchValue_1;
    }
  }
}
export function EvalAttribArgExpr(g, x) {
  var vrefReqd;

  EvalAttribArgExpr: while (true) {
    if (x.tag === 0) {
      switch (x.data[0].tag) {
        case 5:
        case 1:
        case 3:
        case 7:
        case 2:
        case 4:
        case 6:
        case 8:
        case 12:
        case 11:
        case 13:
        case 17:
        case 14:
          return x;

        case 15:
        case 9:
        case 10:
        case 16:
          errorR(new _Error(SR.tastNotAConstantExpression(), x.data[1]));
          return x;

        default:
          return x;
      }
    } else {
      const activePatternResult29718 = function (arg10_) {
        return _TypeOfExpr___(g, arg10_);
      }(x);

      if (activePatternResult29718 != null) {
        return x;
      } else {
        const activePatternResult29716 = function (arg10__1) {
          return _TypeDefOfExpr___(g, arg10__1);
        }(x);

        if (activePatternResult29716 != null) {
          return x;
        } else {
          let $var174;

          if (x.tag === 11) {
            if (x.data[0].tag === 24) {
              if (x.data[2].tail != null) {
                if (x.data[2].tail.tail == null) {
                  $var174 = [0, x.data[2].head];
                } else {
                  const activePatternResult29711 = function (arg10__3) {
                    return _EnumExpr___(g, arg10__3);
                  }(x);

                  if (activePatternResult29711 != null) {
                    $var174 = [1, getValue(activePatternResult29711)];
                  } else {
                    $var174 = [2];
                  }
                }
              } else {
                const activePatternResult29712 = function (arg10__4) {
                  return _EnumExpr___(g, arg10__4);
                }(x);

                if (activePatternResult29712 != null) {
                  $var174 = [1, getValue(activePatternResult29712)];
                } else {
                  $var174 = [2];
                }
              }
            } else {
              const activePatternResult29713 = function (arg10__5) {
                return _EnumExpr___(g, arg10__5);
              }(x);

              if (activePatternResult29713 != null) {
                $var174 = [1, getValue(activePatternResult29713)];
              } else {
                $var174 = [2];
              }
            }
          } else {
            const activePatternResult29714 = function (arg10__6) {
              return _EnumExpr___(g, arg10__6);
            }(x);

            if (activePatternResult29714 != null) {
              $var174 = [1, getValue(activePatternResult29714)];
            } else {
              $var174 = [2];
            }
          }

          switch ($var174[0]) {
            case 0:
              g = g;
              x = $var174[1];
              continue EvalAttribArgExpr;

            case 1:
              g = g;
              x = $var174[1];
              continue EvalAttribArgExpr;

            case 2:
              const activePatternResult29709 = function (arg10__2) {
                return _AttribBitwiseOrExpr___(g, arg10__2);
              }(x);

              if (activePatternResult29709 != null) {
                return EvalArithBinOp(function (x_1, y) {
                  return x_1 | y;
                }, function (x_2, y_1) {
                  return x_2 | y_1;
                }, function (x_3, y_2) {
                  return x_3 | y_2;
                }, function (x_4, y_3) {
                  return x_4.or(y_3);
                }, function (x_5, y_4) {
                  return x_5 | y_4;
                }, function (x_6, y_5) {
                  return x_6 | y_5;
                }, function (x_7, y_6) {
                  return x_7 | y_6;
                }, function (x_8, y_7) {
                  return x_8.or(y_7);
                }, EvalAttribArgExpr(g, getValue(activePatternResult29709)[0]), EvalAttribArgExpr(g, getValue(activePatternResult29709)[1]));
              } else {
                const activePatternResult29707 = (vrefReqd = g.unchecked_addition_vref, function (expr) {
                  return _SpecificBinopExpr___(g, vrefReqd, expr);
                })(x);

                if (activePatternResult29707 != null) {
                  const patternInput = [EvalAttribArgExpr(g, getValue(activePatternResult29707)[0]), EvalAttribArgExpr(g, getValue(activePatternResult29707)[1])];
                  const matchValue = [patternInput[0], patternInput[1]];
                  const $var175 = matchValue[0].tag === 0 ? matchValue[0].data[0].tag === 14 ? matchValue[1].tag === 0 ? matchValue[1].data[0].tag === 14 ? [0, matchValue[0].data[1], matchValue[0].data[2], matchValue[0].data[0].data, matchValue[1].data[0].data] : [1] : [1] : [1] : [1];

                  switch ($var175[0]) {
                    case 0:
                      return new Expr(0, [new Const(14, $var175[3] + $var175[4]), $var175[1], $var175[2]]);

                    case 1:
                      errorR(new _Error(SR.tastNotAConstantExpression(), Expr_get_Range.bind(x)()));
                      return x;
                  }
                } else {
                  errorR(new _Error(SR.tastNotAConstantExpression(), Expr_get_Range.bind(x)()));
                  return x;
                }
              }

          }
        }
      }
    }
  }
}
export function EvaledAttribExprEquality(g, e1, e2) {
  const matchValue = [e1, e2];
  let $var176;

  if (matchValue[0].tag === 0) {
    if (matchValue[1].tag === 0) {
      $var176 = [0, matchValue[0].data[0], matchValue[1].data[0]];
    } else {
      const activePatternResult29727 = function (arg10__2) {
        return _TypeOfExpr___(g, arg10__2);
      }(matchValue[0]);

      if (activePatternResult29727 != null) {
        const activePatternResult29728 = function (arg10__3) {
          return _TypeOfExpr___(g, arg10__3);
        }(matchValue[1]);

        if (activePatternResult29728 != null) {
          $var176 = [1, getValue(activePatternResult29727), getValue(activePatternResult29728)];
        } else {
          $var176 = [2];
        }
      } else {
        $var176 = [2];
      }
    }
  } else {
    const activePatternResult29729 = function (arg10__4) {
      return _TypeOfExpr___(g, arg10__4);
    }(matchValue[0]);

    if (activePatternResult29729 != null) {
      const activePatternResult29730 = function (arg10__5) {
        return _TypeOfExpr___(g, arg10__5);
      }(matchValue[1]);

      if (activePatternResult29730 != null) {
        $var176 = [1, getValue(activePatternResult29729), getValue(activePatternResult29730)];
      } else {
        $var176 = [2];
      }
    } else {
      $var176 = [2];
    }
  }

  switch ($var176[0]) {
    case 0:
      return $var176[1].Equals($var176[2]);

    case 1:
      return typeEquiv(g, $var176[1], $var176[2]);

    case 2:
      let $var177;

      const activePatternResult29723 = function (arg10_) {
        return _TypeDefOfExpr___(g, arg10_);
      }(matchValue[0]);

      if (activePatternResult29723 != null) {
        const activePatternResult29724 = function (arg10__1) {
          return _TypeDefOfExpr___(g, arg10__1);
        }(matchValue[1]);

        if (activePatternResult29724 != null) {
          $var177 = [0, getValue(activePatternResult29723), getValue(activePatternResult29724)];
        } else {
          $var177 = [1];
        }
      } else {
        $var177 = [1];
      }

      switch ($var177[0]) {
        case 0:
          return typeEquiv(g, $var177[1], $var177[2]);

        case 1:
          return false;
      }

  }
}

function _ConstToILFieldInit___(c) {
  switch (c.tag) {
    case 1:
      return new ILFieldInit(3, c.data);

    case 3:
      return new ILFieldInit(4, c.data);

    case 5:
      return new ILFieldInit(5, c.data);

    case 7:
      return new ILFieldInit(6, c.data);

    case 2:
      return new ILFieldInit(7, c.data);

    case 4:
      return new ILFieldInit(8, c.data);

    case 6:
      return new ILFieldInit(9, c.data);

    case 8:
      return new ILFieldInit(10, c.data);

    case 0:
      return new ILFieldInit(1, c.data);

    case 13:
      return new ILFieldInit(2, c.data.charCodeAt(0));

    case 11:
      return new ILFieldInit(11, c.data);

    case 12:
      return new ILFieldInit(12, c.data);

    case 14:
      return new ILFieldInit(0, c.data);

    case 17:
      return new ILFieldInit(13);

    default:
      return null;
  }
}

export { _ConstToILFieldInit___ as $7C$ConstToILFieldInit$7C$_$7C$ };
export function EvalLiteralExprOrAttribArg(g, x) {
  const $var178 = x.tag === 11 ? x.data[0].tag === 24 ? x.data[2].tail != null ? x.data[2].head.tag === 11 ? x.data[2].head.data[0].tag === 3 ? x.data[2].head.data[1].tail != null ? x.data[2].head.data[1].tail.tail == null ? x.data[2].tail.tail == null ? [0, x.data[2].head.data[2], x.data[2].head.data[1].head, x.data[2].head.data[3]] : [1] : [1] : [1] : [1] : [1] : [1] : x.data[0].tag === 3 ? x.data[1].tail != null ? x.data[1].tail.tail == null ? [0, x.data[2], x.data[1].head, x.data[3]] : [1] : [1] : [1] : [1];

  switch ($var178[0]) {
    case 0:
      const args = map(function (x_1) {
        return EvalAttribArgExpr(g, x_1);
      }, $var178[1]);
      return new Expr(11, [new TOp(3), ofArray([$var178[2]]), args, $var178[3]]);

    case 1:
      return EvalAttribArgExpr(g, x);
  }
}
export function GetTypeOfIntrinsicMemberInCompiledForm(g, vref) {
  const patternInput = checkMemberValRef(vref);
  const patternInput_1 = GetTypeOfMemberInMemberForm(g, vref);
  let argInfos;

  if (patternInput[0].MemberFlags.IsInstance ? !ValRefIsCompiledAsInstanceMember(g, vref) : false) {
    const patternInput_2 = GetTopValTypeInFSharpForm(g, patternInput[1], vref.Type, vref.Range);

    if (patternInput_2[1].tail != null) {
      argInfos = new List(patternInput_2[1].head, patternInput_1[1]);
    } else {
      errorR(new InternalError("value does not have a valid member type", vref.Range));
      argInfos = patternInput_1[1];
    }
  } else {
    argInfos = patternInput_1[1];
  }

  return [patternInput_1[0], argInfos, patternInput_1[2], patternInput_1[3]];
}
export function mkCompiledTuple(g, isStruct, argtys, args, m) {
  const n = argtys.length | 0;

  if (n <= 0) {
    throw new Error("mkCompiledTuple");
  } else if (n < maxTuple) {
    return [mkCompiledTupleTyconRef(g, isStruct, n), argtys, args, m];
  } else {
    const patternInput = List_1.splitAfter(goodTupleFields, argtys);
    const patternInput_1 = List_1.splitAfter(goodTupleFields, args);
    let patternInput_3;
    const matchValue = [patternInput[1], patternInput_1[1]];
    const $var179 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [0, matchValue[1].head, matchValue[0].head] : [1] : [1] : [1] : [1];

    switch ($var179[0]) {
      case 0:
        const $var180 = $var179[2].tag === 1 ? isCompiledTupleTyconRef(g, $var179[2].data[0]) ? [0, $var179[2].data[0]] : [1] : [1];

        switch ($var180[0]) {
          case 0:
            patternInput_3 = [$var179[2], $var179[1]];
            break;

          case 1:
            const ty8enc = new TType(1, [isStruct ? g.struct_tuple1_tcr : g.ref_tuple1_tcr, ofArray([$var179[2]])]);
            const v8enc = new Expr(11, [new TOp(2, new TupInfo(0, isStruct)), ofArray([$var179[2]]), ofArray([$var179[1]]), m]);
            patternInput_3 = [ty8enc, v8enc];
            break;
        }

        break;

      case 1:
        const patternInput_2 = mkCompiledTuple(g, isStruct, patternInput[1], patternInput_1[1], m);
        const ty8plus = new TType(1, [patternInput_2[0], patternInput_2[1]]);
        const v8plus = new Expr(11, [new TOp(2, new TupInfo(0, isStruct)), patternInput_2[1], patternInput_2[2], patternInput_2[3]]);
        patternInput_3 = [ty8plus, v8plus];
        break;
    }

    const argtysAB = append(patternInput[0], ofArray([patternInput_3[0]]));
    return [mkCompiledTupleTyconRef(g, isStruct, argtysAB.length), argtysAB, append(patternInput_1[0], ofArray([patternInput_3[1]])), m];
  }
}
export function mkILMethodSpecForTupleItem(_g, typ, n) {
  var copyOfStruct;
  return mkILNonGenericInstanceMethSpecInTy(typ, n < goodTupleFields ? "get_Item" + (copyOfStruct = n + 1 | 0, toString(copyOfStruct)) : "get_Rest", new List(), mkILTyvarTy(n & 0xFFFF));
}
export function mkILFieldSpecForTupleItem(typ, n) {
  var copyOfStruct;
  return mkILFieldSpecInTy(typ, n < goodTupleFields ? "Item" + (copyOfStruct = n + 1 | 0, toString(copyOfStruct)) : "Rest", mkILTyvarTy(n & 0xFFFF));
}
export function mkGetTupleItemN(g, m, n, typ, isStruct, te, retty) {
  if (isStruct) {
    return mkAsmExpr(ofArray([mkNormalLdfld(mkILFieldSpecForTupleItem(typ, n))]), new List(), ofArray([te]), ofArray([retty]), m);
  } else {
    return mkAsmExpr(ofArray([mkNormalCall(mkILMethodSpecForTupleItem(g, typ, n))]), new List(), ofArray([te]), ofArray([retty]), m);
  }
}

function _Int32Expr___(expr) {
  const $var181 = expr.tag === 0 ? expr.data[0].tag === 5 ? [0, expr.data[0].data] : [1] : [1];

  switch ($var181[0]) {
    case 0:
      return $var181[1];

    case 1:
      return null;
  }
}

export { _Int32Expr___ as $7C$Int32Expr$7C$_$7C$ };

function _TryFinally___(expr) {
  const $var182 = expr.tag === 11 ? expr.data[0].tag === 9 ? expr.data[1].tail != null ? expr.data[1].tail.tail == null ? expr.data[2].tail != null ? expr.data[2].head.tag === 3 ? expr.data[2].head.data[3].tail != null ? expr.data[2].head.data[3].tail.tail == null ? expr.data[2].tail.tail != null ? expr.data[2].tail.head.tag === 3 ? expr.data[2].tail.head.data[3].tail != null ? expr.data[2].tail.head.data[3].tail.tail == null ? expr.data[2].tail.tail.tail == null ? [0, expr.data[1].head, expr.data[2].head.data[4], expr.data[2].tail.head.data[4]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var182[0]) {
    case 0:
      return [$var182[2], $var182[3]];

    case 1:
      return null;
  }
}

export { _TryFinally___ as $7C$TryFinally$7C$_$7C$ };

function _WhileLoopForCompiledForEachExpr___(expr) {
  const $var183 = expr.tag === 11 ? expr.data[0].tag === 6 ? expr.data[0].data[1].tag === 1 ? expr.data[2].tail != null ? expr.data[2].head.tag === 3 ? expr.data[2].head.data[3].tail != null ? expr.data[2].head.data[3].tail.tail == null ? expr.data[2].tail.tail != null ? expr.data[2].tail.head.tag === 3 ? expr.data[2].tail.head.data[3].tail != null ? expr.data[2].tail.head.data[3].tail.tail == null ? expr.data[2].tail.tail.tail == null ? [0, expr.data[2].head.data[4], expr.data[2].tail.head.data[4], expr.data[3]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var183[0]) {
    case 0:
      return [$var183[1], $var183[2], $var183[3]];

    case 1:
      return null;
  }
}

export { _WhileLoopForCompiledForEachExpr___ as $7C$WhileLoopForCompiledForEachExpr$7C$_$7C$ };

function _Let___(expr) {
  if (expr.tag === 7) {
    const v = expr.data[0].data[0];
    const sp = expr.data[0].data[2];
    const e1 = expr.data[0].data[1];
    return [v, e1, sp, expr.data[1]];
  } else {
    return null;
  }
}

export { _Let___ as $7C$Let$7C$_$7C$ };

function _RangeInt32Step___(g, expr) {
  var vf_1;
  var tyarg;
  var startExpr_1;
  var finishExpr_1;
  var vf;
  var startExpr;
  var finishExpr;
  const $var184 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[2].tail != null ? expr.data[2].tail.tail == null ? expr.data[3].tail != null ? expr.data[3].tail.tail != null ? expr.data[3].tail.tail.tail == null ? (vf_1 = expr.data[0].data[0], tyarg = expr.data[2].head, startExpr_1 = expr.data[3].head, finishExpr_1 = expr.data[3].tail.head, valRefEq(g, vf_1, g.range_op_vref) ? typeEquiv(g, tyarg, g.int_ty) : false) ? [0, expr.data[3].tail.head, expr.data[3].head, expr.data[2].head, expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var184[0]) {
    case 0:
      return [$var184[2], 1, $var184[1]];

    case 1:
      let $var185;

      if (expr.tag === 5) {
        if (expr.data[0].tag === 1) {
          if (expr.data[2].tail == null) {
            if (expr.data[3].tail != null) {
              if (expr.data[3].tail.tail != null) {
                const activePatternResult29758 = _Int32Expr___(expr.data[3].tail.head);

                if (activePatternResult29758 != null) {
                  if (expr.data[3].tail.tail.tail != null) {
                    if (expr.data[3].tail.tail.tail.tail == null) {
                      if (vf = expr.data[0].data[0], startExpr = expr.data[3].head, finishExpr = expr.data[3].tail.tail.head, valRefEq(g, vf, g.range_int32_op_vref)) {
                        $var185 = [0, expr.data[3].tail.tail.head, getValue(activePatternResult29758), expr.data[3].head, expr.data[0].data[0]];
                      } else {
                        $var185 = [1];
                      }
                    } else {
                      $var185 = [1];
                    }
                  } else {
                    $var185 = [1];
                  }
                } else {
                  $var185 = [1];
                }
              } else {
                $var185 = [1];
              }
            } else {
              $var185 = [1];
            }
          } else {
            $var185 = [1];
          }
        } else {
          $var185 = [1];
        }
      } else {
        $var185 = [1];
      }

      switch ($var185[0]) {
        case 0:
          return [$var185[3], $var185[2], $var185[1]];

        case 1:
          return null;
      }

  }
}

export { _RangeInt32Step___ as $7C$RangeInt32Step$7C$_$7C$ };

function _GetEnumeratorCall___(expr) {
  const $var186 = expr.tag === 11 ? expr.data[0].tag === 31 ? expr.data[2].tail != null ? expr.data[2].head.tag === 1 ? expr.data[2].tail.tail == null ? [0, expr.data[0].data[7], expr.data[2].head.data[0]] : [1] : expr.data[2].head.tag === 11 ? expr.data[2].head.data[2].tail != null ? expr.data[2].head.data[2].head.tag === 1 ? expr.data[2].head.data[2].head.data[1].tag === 1 ? expr.data[2].head.data[2].tail.tail == null ? expr.data[2].tail.tail == null ? [0, expr.data[0].data[7], expr.data[2].head.data[2].head.data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var186[0]) {
    case 0:
      if ($var186[1].Name === "GetEnumerator") {
        return $var186[2];
      } else {
        return null;
      }

    case 1:
      return null;
  }
}

export { _GetEnumeratorCall___ as $7C$GetEnumeratorCall$7C$_$7C$ };

function _CompiledForEachExpr___(g, expr) {
  let $var187;

  const activePatternResult29762 = _Let___(expr);

  if (activePatternResult29762 != null) {
    const activePatternResult29763 = _Let___(getValue(activePatternResult29762)[3]);

    if (activePatternResult29763 != null) {
      const activePatternResult29764 = _GetEnumeratorCall___(getValue(activePatternResult29763)[1]);

      if (activePatternResult29764 != null) {
        const activePatternResult29765 = _TryFinally___(getValue(activePatternResult29763)[3]);

        if (activePatternResult29765 != null) {
          const activePatternResult29766 = _WhileLoopForCompiledForEachExpr___(getValue(activePatternResult29765)[0]);

          if (activePatternResult29766 != null) {
            const activePatternResult29767 = _Let___(getValue(activePatternResult29766)[1]);

            if (activePatternResult29767 != null) {
              if ((() => {
                const enumeratorVar = getValue(activePatternResult29763)[0];
                const enumeratorBind = getValue(activePatternResult29763)[2];
                const enumerableVar = getValue(activePatternResult29762)[0];
                const enumerableExpr = getValue(activePatternResult29762)[1];
                const elemVar = getValue(activePatternResult29767)[0];
                const bodyExpr = getValue(activePatternResult29767)[3];

                if ((valRefEq(g, mkLocalValRef(enumerableVar), getValue(activePatternResult29764)) ? enumerableVar.IsCompilerGenerated : false) ? enumeratorVar.IsCompilerGenerated : false) {
                  const fvs = freeInExpr(CollectLocals, bodyExpr);

                  if (!ZsetModule.contains(enumerableVar, fvs.FreeLocals)) {
                    return !ZsetModule.contains(enumeratorVar, fvs.FreeLocals);
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              })()) {
                $var187 = [0, getValue(activePatternResult29767)[3], getValue(activePatternResult29767)[0], getValue(activePatternResult29762)[1], getValue(activePatternResult29762)[0], getValue(activePatternResult29764), getValue(activePatternResult29763)[2], getValue(activePatternResult29763)[0]];
              } else {
                $var187 = [1];
              }
            } else {
              $var187 = [1];
            }
          } else {
            $var187 = [1];
          }
        } else {
          $var187 = [1];
        }
      } else {
        $var187 = [1];
      }
    } else {
      $var187 = [1];
    }
  } else {
    $var187 = [1];
  }

  switch ($var187[0]) {
    case 0:
      const mEnumExpr = Expr_get_Range.bind($var187[3])();
      const mBody = Expr_get_Range.bind($var187[1])();
      const mWholeExpr = Expr_get_Range.bind(expr)();
      const patternInput = $var187[6].tag === 0 ? [new SequencePointInfoForForLoop(0, $var187[6].data), $var187[6].data] : [new SequencePointInfoForForLoop(1), mEnumExpr];
      const spWhileLoop = $var187[6].tag === 0 ? new SequencePointInfoForWhileLoop(0, $var187[6].data) : new SequencePointInfoForWhileLoop(1);
      const enumerableTy = tyOfExpr(g, $var187[3]);
      return [enumerableTy, $var187[3], $var187[2], $var187[1], [mEnumExpr, mBody, patternInput[0], patternInput[1], spWhileLoop, mWholeExpr]];

    case 1:
      return null;
  }
}

export { _CompiledForEachExpr___ as $7C$CompiledForEachExpr$7C$_$7C$ };

function _CompiledInt32RangeForEachExpr___(g, expr) {
  let $var188;

  const activePatternResult29771 = function (expr_1) {
    return _CompiledForEachExpr___(g, expr_1);
  }(expr);

  if (activePatternResult29771 != null) {
    const activePatternResult29773 = function (expr_2) {
      return _RangeInt32Step___(g, expr_2);
    }(getValue(activePatternResult29771)[1]);

    if (activePatternResult29773 != null) {
      $var188 = [0, getValue(activePatternResult29771)[3], getValue(activePatternResult29771)[2], getValue(activePatternResult29773)[2], getValue(activePatternResult29771)[4], getValue(activePatternResult29773)[0], getValue(activePatternResult29773)[1]];
    } else {
      $var188 = [1];
    }
  } else {
    $var188 = [1];
  }

  switch ($var188[0]) {
    case 0:
      return [$var188[5], $var188[6], $var188[3], $var188[2], $var188[1], $var188[4]];

    case 1:
      return null;
  }
}

export { _CompiledInt32RangeForEachExpr___ as $7C$CompiledInt32RangeForEachExpr$7C$_$7C$ };
export class OptimizeForExpressionOptions {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.Tastops.OptimizeForExpressionOptions",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["OptimizeIntRangesOnly"], ["OptimizeAllForExpressions"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.Tastops.OptimizeForExpressionOptions", OptimizeForExpressionOptions);
export function DetectAndOptimizeForExpression(g, option, expr) {
  const matchValue = [option, expr];
  let $var189;

  const activePatternResult29795 = function (expr_4) {
    return _CompiledInt32RangeForEachExpr___(g, expr_4);
  }(matchValue[1]);

  if (activePatternResult29795 != null) {
    if (getValue(activePatternResult29795)[1] === -1) {
      $var189 = [0, getValue(activePatternResult29795)[4], getValue(activePatternResult29795)[3], getValue(activePatternResult29795)[2], getValue(activePatternResult29795)[5], getValue(activePatternResult29795)[0], getValue(activePatternResult29795)[1]];
    } else if (getValue(activePatternResult29795)[1] === 1) {
      $var189 = [0, getValue(activePatternResult29795)[4], getValue(activePatternResult29795)[3], getValue(activePatternResult29795)[2], getValue(activePatternResult29795)[5], getValue(activePatternResult29795)[0], getValue(activePatternResult29795)[1]];
    } else {
      $var189 = [1];
    }
  } else {
    $var189 = [1];
  }

  switch ($var189[0]) {
    case 0:
      return mkFastForLoop(g, $var189[4][2], $var189[4][5], $var189[2], $var189[5], $var189[6] === 1, $var189[3], $var189[1]);

    case 1:
      let $var190;

      if (matchValue[0].tag === 1) {
        const activePatternResult29793 = function (expr_3) {
          return _CompiledForEachExpr___(g, expr_3);
        }(matchValue[1]);

        if (activePatternResult29793 != null) {
          $var190 = [0, getValue(activePatternResult29793)[3], getValue(activePatternResult29793)[2], getValue(activePatternResult29793)[1], getValue(activePatternResult29793)[0], getValue(activePatternResult29793)[4]];
        } else {
          $var190 = [1];
        }
      } else {
        $var190 = [1];
      }

      switch ($var190[0]) {
        case 0:
          if (isStringTy(g, $var190[4])) {
            const patternInput = mkCompGenLocal($var190[5][0], "str", $var190[4]);
            const patternInput_1 = mkCompGenLocal($var190[2].Range, "idx", g.int32_ty);
            const lengthExpr = mkGetStringLength(g, $var190[5][3], patternInput[1]);
            const charExpr = mkGetStringChar(g, $var190[5][3], patternInput[1], patternInput_1[1]);
            const startExpr = mkZero(g, $var190[5][3]);
            const finishExpr = mkDecr(g, $var190[5][3], lengthExpr);
            const loopItemExpr = mkCoerceIfNeeded(g, $var190[2].Type, g.char_ty, charExpr);
            const bodyExpr = mkCompGenLet($var190[5][3], $var190[2], loopItemExpr, $var190[1]);
            const forExpr = mkFastForLoop(g, $var190[5][2], $var190[5][5], patternInput_1[0], startExpr, true, finishExpr, bodyExpr);
            const expr_1 = mkCompGenLet($var190[5][0], patternInput[0], $var190[3], forExpr);
            return expr_1;
          } else if (isListTy(g, $var190[4])) {
            const patternInput_2 = mkMutableCompGenLocal($var190[5][0], "current", $var190[4]);
            const patternInput_3 = mkMutableCompGenLocal($var190[5][0], "next", $var190[4]);
            const elemTy = destListTy(g, $var190[4]);
            const guardExpr = mkNonNullTest(g, $var190[5][3], patternInput_3[1]);
            const headOrDefaultExpr = mkUnionCaseFieldGetUnprovenViaExprAddr(patternInput_2[1], g.cons_ucref, ofArray([elemTy]), 0, $var190[5][3]);
            const tailOrNullExpr = mkUnionCaseFieldGetUnprovenViaExprAddr(patternInput_2[1], g.cons_ucref, ofArray([elemTy]), 1, $var190[5][3]);
            const bodyExpr_1 = mkCompGenLet($var190[5][3], $var190[2], headOrDefaultExpr, mkCompGenSequential($var190[5][3], $var190[1], mkCompGenSequential($var190[5][3], mkValSet($var190[5][3], mkLocalValRef(patternInput_2[0]), patternInput_3[1]), mkValSet($var190[5][3], mkLocalValRef(patternInput_3[0]), tailOrNullExpr))));
            let expr_2;
            const spBind = $var190[5][2].tag === 1 ? new SequencePointInfoForBinding(3) : new SequencePointInfoForBinding(0, $var190[5][2].data);
            expr_2 = mkLet(spBind, $var190[5][0], patternInput_2[0], $var190[3], mkCompGenLet($var190[5][3], patternInput_3[0], tailOrNullExpr, mkWhile(g, $var190[5][4], new SpecialWhileLoopMarker(1), guardExpr, bodyExpr_1, $var190[5][1])));
            return expr_2;
          } else {
            return expr;
          }

        case 1:
          return expr;
      }

  }
}

function _InnerExprPat_(expr) {
  return stripExpr(expr);
}

export { _InnerExprPat_ as $7C$InnerExprPat$7C$ };
export function BindUnitVars(g, tupledArg) {
  const matchValue = [tupledArg[0], tupledArg[1]];
  const $var191 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail == null ? [0, matchValue[0].head] : [1] : [1] : [1];

  switch ($var191[0]) {
    case 0:
      return [new List(), mkLet(new SequencePointInfoForBinding(4), $var191[1].Range, $var191[1], mkUnit(g, $var191[1].Range), tupledArg[2])];

    case 1:
      return [tupledArg[0], tupledArg[2]];
  }
}