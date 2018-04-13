import { ParentRef, ValBaseOrThisInfo, ValRecursiveScopeInfo, ValMutability, NewVal, ValReprInfo, ValInline, ValReprInfoModule, ValMemberInfo, mkLocalTyconRef, DecisionTree, DecisionTreeTest, mkLocalValRef, SlotParam, SlotSig } from "./tast";
import { partition, mapIndexed, map, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { destAppTy, $7C$SpecialNotEquatableHeadType$7C$_$7C$ as _SpecialNotEquatableHeadType___, $7C$SpecialEquatableHeadType$7C$_$7C$ as _SpecialEquatableHeadType___, destTyparTy, isTyparTy, tcrefOfAppTy, HasFSharpAttribute, isAppTy, mkMultiLambdas, mkCompGenBind, mkLambdas, exprForValRef, mkApps, mkCoerceExpr, isUnitTy, op_PlusMinusGreater, isRecdTy, isUnionTy, Entity$2E$HasOverride as Entity_HasOverride, generalizedTyconRef, TryFindFSharpBoolAttribute, mkCallGenericHashWithComparerOuter, mkUnionCaseTagGetViaExprAddr, mkILAsmCeq, mkUnionCaseProof, mkProvenUnionCaseTy, mkUnionCaseFieldGetProvenViaExprAddr, mkCase as mkCase_1, MatchBuilder, mkExnCaseFieldGet, mkIsInstConditional, mkCallGenericEqualityWithComparerOuter, mkCallGenericEqualityEROuter, mkRecdFieldGetViaExprAddr, mkCallGenericComparisonWithComparerOuter, mkTrue, mkMinusOne, mkNonNullCond, generalizeTyconRef, mkOne, mkFalse, mkZero, mkCond, mkAddrGet, isByrefTy, mkValAddr, mkCompGenLet, mkMutableCompGenLocal, mkCompGenSequential, mkValSet, mkInt, mkCompGenLocal, mkAsmExpr, op_MinusMinusGreater, mkByrefTy, isStructTy, mkRefTupledTy, mkAppTy } from "./TastOps";
import { mkNormalCall, mkILNonGenericStaticMethSpecInTy, mkILNonGenericBoxedTy, ILInstr } from "../absil/il";
import { forAll, exists, foldBack, fold } from "../fable-core/Seq";
import { getValue } from "../fable-core/Option";
import { List as List_1 } from "../absil/illib";
import { XmlDoc, MemberKind, MemberFlags as MemberFlags_1, SequencePointInfoForTarget, SequencePointInfoForBinding } from "./ast";
import CurriedLambda from "../fable-core/CurriedLambda";
import { warning, Error as _Error, errorR } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
import { ExistsHeadTypeInEntireHierarchy } from "./infos";
export function mkIComparableCompareToSlotSig(g) {
  return new SlotSig(0, ["CompareTo", g.mk_IComparable_ty, new List(), new List(), ofArray([ofArray([new SlotParam(0, ["obj", g.obj_ty, false, false, false, new List()])])]), g.int_ty]);
}
export function mkGenericIComparableCompareToSlotSig(g, typ) {
  return new SlotSig(0, ["CompareTo", mkAppTy(g.system_GenericIComparable_tcref, ofArray([typ])), new List(), new List(), ofArray([ofArray([new SlotParam(0, ["obj", typ, false, false, false, new List()])])]), g.int_ty]);
}
export function mkIStructuralComparableCompareToSlotSig(g) {
  return new SlotSig(0, ["CompareTo", g.mk_IStructuralComparable_ty, new List(), new List(), ofArray([ofArray([new SlotParam(0, [null, mkRefTupledTy(g, ofArray([g.obj_ty, g.IComparer_ty])), false, false, false, new List()])])]), g.int_ty]);
}
export function mkGenericIEquatableEqualsSlotSig(g, typ) {
  return new SlotSig(0, ["Equals", mkAppTy(g.system_GenericIEquatable_tcref, ofArray([typ])), new List(), new List(), ofArray([ofArray([new SlotParam(0, ["obj", typ, false, false, false, new List()])])]), g.bool_ty]);
}
export function mkIStructuralEquatableEqualsSlotSig(g) {
  return new SlotSig(0, ["Equals", g.mk_IStructuralEquatable_ty, new List(), new List(), ofArray([ofArray([new SlotParam(0, [null, mkRefTupledTy(g, ofArray([g.obj_ty, g.IEqualityComparer_ty])), false, false, false, new List()])])]), g.bool_ty]);
}
export function mkIStructuralEquatableGetHashCodeSlotSig(g) {
  return new SlotSig(0, ["GetHashCode", g.mk_IStructuralEquatable_ty, new List(), new List(), ofArray([ofArray([new SlotParam(0, [null, g.IEqualityComparer_ty, false, false, false, new List()])])]), g.int_ty]);
}
export function mkGetHashCodeSlotSig(g) {
  return new SlotSig(0, ["GetHashCode", g.obj_ty, new List(), new List(), ofArray([new List()]), g.int_ty]);
}
export function mkEqualsSlotSig(g) {
  return new SlotSig(0, ["Equals", g.obj_ty, new List(), new List(), ofArray([ofArray([new SlotParam(0, ["obj", g.obj_ty, false, false, false, new List()])])]), g.bool_ty]);
}
export function mkThisTy(g, ty) {
  if (isStructTy(g, ty)) {
    return mkByrefTy(g, ty);
  } else {
    return ty;
  }
}
export function mkCompareObjTy(g, ty) {
  return op_MinusMinusGreater(mkThisTy(g, ty), op_MinusMinusGreater(g.obj_ty, g.int_ty));
}
export function mkCompareTy(g, ty) {
  return op_MinusMinusGreater(mkThisTy(g, ty), op_MinusMinusGreater(ty, g.int_ty));
}
export function mkCompareWithComparerTy(g, ty) {
  return op_MinusMinusGreater(mkThisTy(g, ty), op_MinusMinusGreater(mkRefTupledTy(g, ofArray([g.obj_ty, g.IComparer_ty])), g.int_ty));
}
export function mkEqualsObjTy(g, ty) {
  return op_MinusMinusGreater(mkThisTy(g, ty), op_MinusMinusGreater(g.obj_ty, g.bool_ty));
}
export function mkEqualsTy(g, ty) {
  return op_MinusMinusGreater(mkThisTy(g, ty), op_MinusMinusGreater(ty, g.bool_ty));
}
export function mkEqualsWithComparerTy(g, ty) {
  return op_MinusMinusGreater(mkThisTy(g, ty), op_MinusMinusGreater(mkRefTupledTy(g, ofArray([g.obj_ty, g.IEqualityComparer_ty])), g.bool_ty));
}
export function mkHashTy(g, ty) {
  return op_MinusMinusGreater(mkThisTy(g, ty), op_MinusMinusGreater(g.unit_ty, g.int_ty));
}
export function mkHashWithComparerTy(g, ty) {
  return op_MinusMinusGreater(mkThisTy(g, ty), op_MinusMinusGreater(g.IEqualityComparer_ty, g.int_ty));
}
export function mkRelBinOp(g, op, m, e1, e2) {
  return mkAsmExpr(ofArray([op]), new List(), ofArray([e1, e2]), ofArray([g.bool_ty]), m);
}
export function mkClt(g, m, e1, e2) {
  return mkRelBinOp(g, new ILInstr(9), m, e1, e2);
}
export function mkCgt(g, m, e1, e2) {
  return mkRelBinOp(g, new ILInstr(7), m, e1, e2);
}
export function mkILLangPrimTy(g) {
  return mkILNonGenericBoxedTy(g.tcref_LanguagePrimitives.CompiledRepresentationForNamedType);
}
export function mkILCallGetComparer(g, m) {
  const ty = mkILNonGenericBoxedTy(g.tcref_System_Collections_IComparer.CompiledRepresentationForNamedType);
  const mspec = mkILNonGenericStaticMethSpecInTy(mkILLangPrimTy(g), "get_GenericComparer", new List(), ty);
  return mkAsmExpr(ofArray([mkNormalCall(mspec)]), new List(), new List(), ofArray([g.IComparer_ty]), m);
}
export function mkILCallGetEqualityComparer(g, m) {
  const ty = mkILNonGenericBoxedTy(g.tcref_System_Collections_IEqualityComparer.CompiledRepresentationForNamedType);
  const mspec = mkILNonGenericStaticMethSpecInTy(mkILLangPrimTy(g), "get_GenericEqualityComparer", new List(), ty);
  return mkAsmExpr(ofArray([mkNormalCall(mspec)]), new List(), new List(), ofArray([g.IEqualityComparer_ty]), m);
}
export function mkThisVar(g, m, ty) {
  return mkCompGenLocal(m, "this", mkThisTy(g, ty));
}
export function mkShl(g, m, acce, n) {
  return mkAsmExpr(ofArray([new ILInstr(19)]), new List(), ofArray([acce, mkInt(g, m, n)]), ofArray([g.int_ty]), m);
}
export function mkShr(g, m, acce, n) {
  return mkAsmExpr(ofArray([new ILInstr(20)]), new List(), ofArray([acce, mkInt(g, m, n)]), ofArray([g.int_ty]), m);
}
export function mkAdd(g, m, e1, e2) {
  return mkAsmExpr(ofArray([new ILInstr(0)]), new List(), ofArray([e1, e2]), ofArray([g.int_ty]), m);
}
export function mkAddToHashAcc(g, m, e, accv, acce) {
  return mkValSet(m, accv, mkAdd(g, m, mkInt(g, m, -1640531527), mkAdd(g, m, e, mkAdd(g, m, mkShl(g, m, acce, 6), mkShr(g, m, acce, 2)))));
}
export function mkCombineHashGenerators(g, m, exprs, accv, acce) {
  return fold(function (tm, e) {
    return mkCompGenSequential(m, mkAddToHashAcc(g, m, e, accv, acce), tm);
  }, acce, exprs);
}
export function mkThatAddrLocal(g, m, ty) {
  return mkCompGenLocal(m, "obj", mkThisTy(g, ty));
}
export function mkThatAddrLocalIfNeeded(g, m, tcve, ty) {
  if (isStructTy(g, ty)) {
    const patternInput = mkCompGenLocal(m, "obj", mkThisTy(g, ty));
    return [patternInput[0], patternInput[1]];
  } else {
    return [null, tcve];
  }
}
export function mkThisVarThatVar(g, m, ty) {
  const patternInput = mkThisVar(g, m, ty);
  const patternInput_1 = mkThatAddrLocal(g, m, ty);
  return [patternInput[0], patternInput_1[0], patternInput[1], patternInput_1[1]];
}
export function mkThatVarBind(g, m, ty, thataddrv, expr) {
  if (isStructTy(g, ty)) {
    const patternInput = mkMutableCompGenLocal(m, "obj", ty);
    return [patternInput[0], mkCompGenLet(m, thataddrv, mkValAddr(m, mkLocalValRef(patternInput[0])), expr)];
  } else {
    return [thataddrv, expr];
  }
}
export function mkBindThatAddr(g, m, ty, thataddrv, thatv, thate, expr) {
  if (isStructTy(g, ty)) {
    return mkCompGenLet(m, thataddrv, mkValAddr(m, mkLocalValRef(thatv)), expr);
  } else {
    return mkCompGenLet(m, thataddrv, thate, expr);
  }
}
export function mkBindThatAddrIfNeeded(m, thataddrvOpt, thatv, expr) {
  if (thataddrvOpt != null) {
    return mkCompGenLet(m, getValue(thataddrvOpt), mkValAddr(m, mkLocalValRef(thatv)), expr);
  } else {
    return expr;
  }
}
export function mkDerefThis(g, m, thisv, thise) {
  if (isByrefTy(g, thisv.Type)) {
    return mkAddrGet(m, mkLocalValRef(thisv));
  } else {
    return thise;
  }
}
export function mkCompareTestConjuncts(g, m, exprs) {
  if (exprs.tail != null) {
    if (exprs.tail.tail == null) {
      return exprs.head;
    } else {
      const patternInput = List_1.frontAndBack(exprs);
      return foldBack(function (e, acc) {
        const patternInput_1 = mkCompGenLocal(m, "n", g.int_ty);
        return mkCompGenLet(m, patternInput_1[0], e, mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.int_ty, mkClt(g, m, patternInput_1[1], mkZero(g, m)), patternInput_1[1], mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.int_ty, mkCgt(g, m, patternInput_1[1], mkZero(g, m)), patternInput_1[1], acc)));
      }, patternInput[0], patternInput[1]);
    }
  } else {
    return mkZero(g, m);
  }
}
export function mkEqualsTestConjuncts(g, m, exprs) {
  if (exprs.tail != null) {
    if (exprs.tail.tail == null) {
      return exprs.head;
    } else {
      const patternInput = List_1.frontAndBack(exprs);
      return foldBack(function (e, acc) {
        return mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.bool_ty, e, acc, mkFalse(g, m));
      }, patternInput[0], patternInput[1]);
    }
  } else {
    return mkOne(g, m);
  }
}
export function mkMinimalTy(g, tcref) {
  if (tcref.Deref.IsExceptionDecl) {
    return [new List(), g.exn_ty];
  } else {
    return generalizeTyconRef(tcref);
  }
}
export function mkBindNullComparison(g, m, thise, thate, expr) {
  const expr_1 = mkNonNullCond(g, m, g.int_ty, thate, expr, mkOne(g, m));
  const expr_2 = mkNonNullCond(g, m, g.int_ty, thise, expr_1, mkNonNullCond(g, m, g.int_ty, thate, mkMinusOne(g, m), mkZero(g, m)));
  return expr_2;
}
export function mkBindThisNullEquals(g, m, thise, thate, expr) {
  const expr_1 = mkNonNullCond(g, m, g.bool_ty, thise, expr, mkNonNullCond(g, m, g.int_ty, thate, mkFalse(g, m), mkTrue(g, m)));
  return expr_1;
}
export function mkBindThatNullEquals(g, m, thise, thate, expr) {
  const expr_1 = mkNonNullCond(g, m, g.bool_ty, thate, expr, mkFalse(g, m));
  const expr_2 = mkBindThisNullEquals(g, m, thise, thate, expr_1);
  return expr_2;
}
export function mkBindNullHash(g, m, thise, expr) {
  const expr_1 = mkNonNullCond(g, m, g.int_ty, thise, expr, mkZero(g, m));
  return expr_1;
}
export function mkRecdCompare(g, tcref, tycon) {
  const m = tycon.Range;
  const fields = tycon.AllInstanceFieldsAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkThisVarThatVar(g, m, patternInput[1]);
  const compe = mkILCallGetComparer(g, m);

  const mkTest = function (fspec) {
    const fty = fspec.FormalType;
    const fref = tcref.MakeNestedRecdFieldRef(fspec);
    const m_1 = fref.Range;
    return mkCallGenericComparisonWithComparerOuter(g, m_1, fty, compe, mkRecdFieldGetViaExprAddr(patternInput_1[2], fref, patternInput[0], m_1), mkRecdFieldGetViaExprAddr(patternInput_1[3], fref, patternInput[0], m_1));
  };

  const expr = mkCompareTestConjuncts(g, m, map(mkTest, fields));
  const expr_1 = tycon.IsStructOrEnumTycon ? expr : mkBindNullComparison(g, m, patternInput_1[2], patternInput_1[3], expr);
  const patternInput_2 = mkThatVarBind(g, m, patternInput[1], patternInput_1[1], expr_1);
  return [patternInput_1[0], patternInput_2[0], patternInput_2[1]];
}
export function mkRecdCompareWithComparer(g, tcref, tycon, _thisv, thise, _arg1, thate, compe) {
  const m = tycon.Range;
  const fields = tycon.AllInstanceFieldsAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkCompGenLocal(m, "objTemp", patternInput[1]);
  const patternInput_2 = mkThatAddrLocal(g, m, patternInput[1]);

  const mkTest = function (fspec) {
    const fty = fspec.FormalType;
    const fref = tcref.MakeNestedRecdFieldRef(fspec);
    const m_1 = fref.Range;
    return mkCallGenericComparisonWithComparerOuter(g, m_1, fty, compe, mkRecdFieldGetViaExprAddr(thise, fref, patternInput[0], m_1), mkRecdFieldGetViaExprAddr(patternInput_2[1], fref, patternInput[0], m_1));
  };

  const expr = mkCompareTestConjuncts(g, m, map(mkTest, fields));
  const expr_1 = tycon.IsStructOrEnumTycon ? expr : mkBindNullComparison(g, m, thise, thate, expr);
  const expr_2 = mkBindThatAddr(g, m, patternInput[1], patternInput_2[0], patternInput_1[0], patternInput_1[1], expr_1);
  const expr_3 = mkCompGenLet(m, patternInput_1[0], thate, expr_2);
  return expr_3;
}
export function mkRecdEquality(g, tcref, tycon) {
  const m = tycon.Range;
  const fields = tycon.AllInstanceFieldsAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkThisVarThatVar(g, m, patternInput[1]);

  const mkTest = function (fspec) {
    const fty = fspec.FormalType;
    const fref = tcref.MakeNestedRecdFieldRef(fspec);
    const m_1 = fref.Range;
    return mkCallGenericEqualityEROuter(g, m_1, fty, mkRecdFieldGetViaExprAddr(patternInput_1[2], fref, patternInput[0], m_1), mkRecdFieldGetViaExprAddr(patternInput_1[3], fref, patternInput[0], m_1));
  };

  const expr = mkEqualsTestConjuncts(g, m, map(mkTest, fields));
  const expr_1 = tycon.IsStructOrEnumTycon ? expr : mkBindThatNullEquals(g, m, patternInput_1[2], patternInput_1[3], expr);
  const patternInput_2 = mkThatVarBind(g, m, patternInput[1], patternInput_1[1], expr_1);
  return [patternInput_1[0], patternInput_2[0], patternInput_2[1]];
}
export function mkRecdEqualityWithComparer(g, tcref, tycon, _thisv, thise, thatobje, thatv, thate, compe) {
  const m = tycon.Range;
  const fields = tycon.AllInstanceFieldsAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkThatAddrLocal(g, m, patternInput[1]);

  const mkTest = function (fspec) {
    const fty = fspec.FormalType;
    const fref = tcref.MakeNestedRecdFieldRef(fspec);
    const m_1 = fref.Range;
    return mkCallGenericEqualityWithComparerOuter(g, m_1, fty, compe, mkRecdFieldGetViaExprAddr(thise, fref, patternInput[0], m_1), mkRecdFieldGetViaExprAddr(patternInput_1[1], fref, patternInput[0], m_1));
  };

  const expr = mkEqualsTestConjuncts(g, m, map(mkTest, fields));
  const expr_1 = mkBindThatAddr(g, m, patternInput[1], patternInput_1[0], thatv, thate, expr);
  const expr_2 = mkIsInstConditional(g, m, patternInput[1], thatobje, thatv, expr_1, mkFalse(g, m));
  const expr_3 = tycon.IsStructOrEnumTycon ? expr_2 : mkBindThisNullEquals(g, m, thise, thatobje, expr_2);
  return expr_3;
}
export function mkExnEquality(g, exnref, exnc) {
  const m = exnc.Range;
  const patternInput = mkCompGenLocal(m, "obj", g.exn_ty);
  const patternInput_1 = mkThisVar(g, m, g.exn_ty);

  const mkTest = function (i, rfield) {
    const fty = rfield.FormalType;
    return mkCallGenericEqualityEROuter(g, m, fty, mkExnCaseFieldGet(patternInput_1[1], exnref, i, m), mkExnCaseFieldGet(patternInput[1], exnref, i, m));
  };

  const expr = mkEqualsTestConjuncts(g, m, mapIndexed(mkTest, exnc.AllInstanceFieldsAsList));
  let expr_1;
  const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m);
  const cases = ofArray([mkCase_1(new DecisionTreeTest(4, [g.exn_ty, mkAppTy(exnref, new List())]), mbuilder.AddResultTarget(expr, new SequencePointInfoForTarget(1)))]);
  const dflt = mbuilder.AddResultTarget(mkFalse(g, m), new SequencePointInfoForTarget(1));
  const dtree = new DecisionTree(0, [patternInput[1], cases, dflt, m]);
  expr_1 = mbuilder.Close(dtree, m, g.bool_ty);
  const expr_2 = mkBindThatNullEquals(g, m, patternInput_1[1], patternInput[1], expr_1);
  return [patternInput_1[0], patternInput[0], expr_2];
}
export function mkExnEqualityWithComparer(g, exnref, exnc, _thisv, thise, thatobje, thatv, thate, compe) {
  const m = exnc.Range;
  const patternInput = mkThatAddrLocal(g, m, g.exn_ty);

  const mkTest = function (i, rfield) {
    const fty = rfield.FormalType;
    return mkCallGenericEqualityWithComparerOuter(g, m, fty, compe, mkExnCaseFieldGet(thise, exnref, i, m), mkExnCaseFieldGet(patternInput[1], exnref, i, m));
  };

  const expr = mkEqualsTestConjuncts(g, m, mapIndexed(mkTest, exnc.AllInstanceFieldsAsList));
  let expr_1;
  const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m);
  const cases = ofArray([mkCase_1(new DecisionTreeTest(4, [g.exn_ty, mkAppTy(exnref, new List())]), mbuilder.AddResultTarget(expr, new SequencePointInfoForTarget(1)))]);
  const dflt = mbuilder.AddResultTarget(mkFalse(g, m), new SequencePointInfoForTarget(1));
  const dtree = new DecisionTree(0, [thate, cases, dflt, m]);
  expr_1 = mbuilder.Close(dtree, m, g.bool_ty);
  const expr_2 = mkBindThatAddr(g, m, g.exn_ty, patternInput[0], thatv, thate, expr_1);
  const expr_3 = mkIsInstConditional(g, m, g.exn_ty, thatobje, thatv, expr_2, mkFalse(g, m));
  const expr_4 = exnc.IsStructOrEnumTycon ? expr_3 : mkBindThisNullEquals(g, m, thise, thatobje, expr_3);
  return expr_4;
}
export function mkUnionCompare(g, tcref, tycon) {
  const m = tycon.Range;
  const ucases = tycon.UnionCasesAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkThisVarThatVar(g, m, patternInput[1]);
  const patternInput_2 = mkCompGenLocal(m, "thisTag", g.int_ty);
  const patternInput_3 = mkCompGenLocal(m, "thatTag", g.int_ty);
  const compe = mkILCallGetComparer(g, m);
  let expr;
  const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m);

  const mkCase = function (ucase) {
    const cref = tcref.MakeNestedUnionCaseRef(ucase);
    const m_1 = cref.Range;
    const rfields = ucase.RecdFields;

    if (rfields.tail == null) {
      return null;
    } else {
      const mkTest = function (thise, thataddre, j, argty) {
        return mkCallGenericComparisonWithComparerOuter(g, m_1, argty.FormalType, compe, mkUnionCaseFieldGetProvenViaExprAddr(thise, cref, patternInput[0], j, m_1), mkUnionCaseFieldGetProvenViaExprAddr(thataddre, cref, patternInput[0], j, m_1));
      };

      let test;

      if (cref.Tycon.IsStructOrEnumTycon) {
        test = mkCompareTestConjuncts(g, m_1, mapIndexed(CurriedLambda(mkTest)(patternInput_1[2], patternInput_1[3]), rfields));
      } else {
        const patternInput_4 = mkCompGenLocal(m_1, "thisCast", mkProvenUnionCaseTy(cref, patternInput[0]));
        const patternInput_5 = mkCompGenLocal(m_1, "objCast", mkProvenUnionCaseTy(cref, patternInput[0]));
        test = mkCompGenLet(m_1, patternInput_4[0], mkUnionCaseProof(patternInput_1[2], cref, patternInput[0], m_1), mkCompGenLet(m_1, patternInput_5[0], mkUnionCaseProof(patternInput_1[3], cref, patternInput[0], m_1), mkCompareTestConjuncts(g, m_1, mapIndexed(CurriedLambda(mkTest)(patternInput_4[1], patternInput_5[1]), rfields))));
      }

      return mkCase_1(new DecisionTreeTest(0, [cref, patternInput[0]]), mbuilder.AddResultTarget(test, new SequencePointInfoForTarget(1)));
    }
  };

  const patternInput_6 = partition(function (option) {
    return option == null;
  }, map(mkCase, ucases));

  if (patternInput_6[1].tail == null) {
    expr = mkZero(g, m);
  } else {
    const cases = map(function (_arg1) {
      if (_arg1 == null) {
        throw new Error("mkUnionCompare");
      } else {
        return getValue(_arg1);
      }
    }, patternInput_6[1]);
    const dflt = patternInput_6[0].tail == null ? null : mbuilder.AddResultTarget(mkZero(g, m), new SequencePointInfoForTarget(1));
    const dtree = new DecisionTree(0, [patternInput_1[2], cases, dflt, m]);
    expr = mbuilder.Close(dtree, m, g.int_ty);
  }

  let expr_1;

  if (ucases.length === 1) {
    expr_1 = expr;
  } else {
    const tagsEqTested = mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.int_ty, mkILAsmCeq(g, m, patternInput_2[1], patternInput_3[1]), expr, mkAsmExpr(ofArray([new ILInstr(22)]), new List(), ofArray([patternInput_2[1], patternInput_3[1]]), ofArray([g.int_ty]), m));
    expr_1 = mkCompGenLet(m, patternInput_2[0], mkUnionCaseTagGetViaExprAddr(patternInput_1[2], tcref, patternInput[0], m), mkCompGenLet(m, patternInput_3[0], mkUnionCaseTagGetViaExprAddr(patternInput_1[3], tcref, patternInput[0], m), tagsEqTested));
  }

  const expr_2 = tycon.IsStructOrEnumTycon ? expr_1 : mkBindNullComparison(g, m, patternInput_1[2], patternInput_1[3], expr_1);
  const patternInput_7 = mkThatVarBind(g, m, patternInput[1], patternInput_1[1], expr_2);
  return [patternInput_1[0], patternInput_7[0], patternInput_7[1]];
}
export function mkUnionCompareWithComparer(g, tcref, tycon, _thisv, thise, _thatobjv, thatcaste, compe) {
  const m = tycon.Range;
  const ucases = tycon.UnionCasesAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkCompGenLocal(m, "objTemp", patternInput[1]);
  const patternInput_2 = mkThatAddrLocalIfNeeded(g, m, patternInput_1[1], patternInput[1]);
  const patternInput_3 = mkCompGenLocal(m, "thisTag", g.int_ty);
  const patternInput_4 = mkCompGenLocal(m, "thatTag", g.int_ty);
  let expr;
  const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m);

  const mkCase = function (ucase) {
    const cref = tcref.MakeNestedUnionCaseRef(ucase);
    const m_1 = cref.Range;
    const rfields = ucase.RecdFields;

    if (rfields.tail == null) {
      return null;
    } else {
      const mkTest = function (thise_1, thataddre, j, argty) {
        return mkCallGenericComparisonWithComparerOuter(g, m_1, argty.FormalType, compe, mkUnionCaseFieldGetProvenViaExprAddr(thise_1, cref, patternInput[0], j, m_1), mkUnionCaseFieldGetProvenViaExprAddr(thataddre, cref, patternInput[0], j, m_1));
      };

      let test;

      if (cref.Tycon.IsStructOrEnumTycon) {
        test = mkCompareTestConjuncts(g, m_1, mapIndexed(CurriedLambda(mkTest)(thise, patternInput_2[1]), rfields));
      } else {
        const patternInput_5 = mkCompGenLocal(m_1, "thisCastu", mkProvenUnionCaseTy(cref, patternInput[0]));
        const patternInput_6 = mkCompGenLocal(m_1, "thatCastu", mkProvenUnionCaseTy(cref, patternInput[0]));
        test = mkCompGenLet(m_1, patternInput_5[0], mkUnionCaseProof(thise, cref, patternInput[0], m_1), mkCompGenLet(m_1, patternInput_6[0], mkUnionCaseProof(patternInput_2[1], cref, patternInput[0], m_1), mkCompareTestConjuncts(g, m_1, mapIndexed(CurriedLambda(mkTest)(patternInput_5[1], patternInput_6[1]), rfields))));
      }

      return mkCase_1(new DecisionTreeTest(0, [cref, patternInput[0]]), mbuilder.AddResultTarget(test, new SequencePointInfoForTarget(1)));
    }
  };

  const patternInput_7 = partition(function (option) {
    return option == null;
  }, map(mkCase, ucases));

  if (patternInput_7[1].tail == null) {
    expr = mkZero(g, m);
  } else {
    const cases = map(function (_arg1) {
      if (_arg1 == null) {
        throw new Error("mkUnionCompare");
      } else {
        return getValue(_arg1);
      }
    }, patternInput_7[1]);
    const dflt = patternInput_7[0].tail == null ? null : mbuilder.AddResultTarget(mkZero(g, m), new SequencePointInfoForTarget(1));
    const dtree = new DecisionTree(0, [thise, cases, dflt, m]);
    expr = mbuilder.Close(dtree, m, g.int_ty);
  }

  let expr_1;

  if (ucases.length === 1) {
    expr_1 = expr;
  } else {
    const tagsEqTested = mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.int_ty, mkILAsmCeq(g, m, patternInput_3[1], patternInput_4[1]), expr, mkAsmExpr(ofArray([new ILInstr(22)]), new List(), ofArray([patternInput_3[1], patternInput_4[1]]), ofArray([g.int_ty]), m));
    expr_1 = mkCompGenLet(m, patternInput_3[0], mkUnionCaseTagGetViaExprAddr(thise, tcref, patternInput[0], m), mkCompGenLet(m, patternInput_4[0], mkUnionCaseTagGetViaExprAddr(patternInput_2[1], tcref, patternInput[0], m), tagsEqTested));
  }

  const expr_2 = tycon.IsStructOrEnumTycon ? expr_1 : mkBindNullComparison(g, m, thise, thatcaste, expr_1);
  const expr_3 = mkBindThatAddrIfNeeded(m, patternInput_2[0], patternInput_1[0], expr_2);
  const expr_4 = mkCompGenLet(m, patternInput_1[0], thatcaste, expr_3);
  return expr_4;
}
export function mkUnionEquality(g, tcref, tycon) {
  const m = tycon.Range;
  const ucases = tycon.UnionCasesAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkThisVarThatVar(g, m, patternInput[1]);
  const patternInput_2 = mkCompGenLocal(m, "thisTag", g.int_ty);
  const patternInput_3 = mkCompGenLocal(m, "thatTag", g.int_ty);
  let expr;
  const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m);

  const mkCase = function (ucase) {
    const cref = tcref.MakeNestedUnionCaseRef(ucase);
    const m_1 = cref.Range;
    const rfields = ucase.RecdFields;

    if (rfields.tail == null) {
      return null;
    } else {
      const mkTest = function (thise, thataddre, j, argty) {
        return mkCallGenericEqualityEROuter(g, m_1, argty.FormalType, mkUnionCaseFieldGetProvenViaExprAddr(thise, cref, patternInput[0], j, m_1), mkUnionCaseFieldGetProvenViaExprAddr(thataddre, cref, patternInput[0], j, m_1));
      };

      let test;

      if (cref.Tycon.IsStructOrEnumTycon) {
        test = mkEqualsTestConjuncts(g, m_1, mapIndexed(CurriedLambda(mkTest)(patternInput_1[2], patternInput_1[3]), rfields));
      } else {
        const patternInput_4 = mkCompGenLocal(m_1, "thisCast", mkProvenUnionCaseTy(cref, patternInput[0]));
        const patternInput_5 = mkCompGenLocal(m_1, "objCast", mkProvenUnionCaseTy(cref, patternInput[0]));
        test = mkCompGenLet(m_1, patternInput_4[0], mkUnionCaseProof(patternInput_1[2], cref, patternInput[0], m_1), mkCompGenLet(m_1, patternInput_5[0], mkUnionCaseProof(patternInput_1[3], cref, patternInput[0], m_1), mkEqualsTestConjuncts(g, m_1, mapIndexed(CurriedLambda(mkTest)(patternInput_4[1], patternInput_5[1]), rfields))));
      }

      return mkCase_1(new DecisionTreeTest(0, [cref, patternInput[0]]), mbuilder.AddResultTarget(test, new SequencePointInfoForTarget(1)));
    }
  };

  const patternInput_6 = partition(function (option) {
    return option == null;
  }, map(mkCase, ucases));

  if (patternInput_6[1].tail == null) {
    expr = mkTrue(g, m);
  } else {
    const cases = map(function (_arg1) {
      if (_arg1 == null) {
        throw new Error("mkUnionEquality");
      } else {
        return getValue(_arg1);
      }
    }, patternInput_6[1]);
    const dflt = patternInput_6[0].tail == null ? null : mbuilder.AddResultTarget(mkTrue(g, m), new SequencePointInfoForTarget(1));
    const dtree = new DecisionTree(0, [patternInput_1[2], cases, dflt, m]);
    expr = mbuilder.Close(dtree, m, g.bool_ty);
  }

  let expr_1;

  if (ucases.length === 1) {
    expr_1 = expr;
  } else {
    const tagsEqTested = mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.bool_ty, mkILAsmCeq(g, m, patternInput_2[1], patternInput_3[1]), expr, mkFalse(g, m));
    expr_1 = mkCompGenLet(m, patternInput_2[0], mkUnionCaseTagGetViaExprAddr(patternInput_1[2], tcref, patternInput[0], m), mkCompGenLet(m, patternInput_3[0], mkUnionCaseTagGetViaExprAddr(patternInput_1[3], tcref, patternInput[0], m), tagsEqTested));
  }

  const patternInput_7 = mkThatVarBind(g, m, patternInput[1], patternInput_1[1], expr_1);
  const expr_2 = tycon.IsStructOrEnumTycon ? patternInput_7[1] : mkBindThatNullEquals(g, m, patternInput_1[2], patternInput_1[3], patternInput_7[1]);
  return [patternInput_1[0], patternInput_7[0], expr_2];
}
export function mkUnionEqualityWithComparer(g, tcref, tycon, _thisv, thise, thatobje, thatv, thate, compe) {
  const m = tycon.Range;
  const ucases = tycon.UnionCasesAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkCompGenLocal(m, "thisTag", g.int_ty);
  const patternInput_2 = mkCompGenLocal(m, "thatTag", g.int_ty);
  const patternInput_3 = mkThatAddrLocal(g, m, patternInput[1]);
  let expr;
  const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m);

  const mkCase = function (ucase) {
    const cref = tcref.MakeNestedUnionCaseRef(ucase);
    const m_1 = cref.Range;
    const rfields = ucase.RecdFields;

    if (rfields.tail == null) {
      return null;
    } else {
      const mkTest = function (thise_1, thataddre, j, argty) {
        return mkCallGenericEqualityWithComparerOuter(g, m_1, argty.FormalType, compe, mkUnionCaseFieldGetProvenViaExprAddr(thise_1, cref, patternInput[0], j, m_1), mkUnionCaseFieldGetProvenViaExprAddr(thataddre, cref, patternInput[0], j, m_1));
      };

      let test;

      if (cref.Tycon.IsStructOrEnumTycon) {
        test = mkEqualsTestConjuncts(g, m_1, mapIndexed(CurriedLambda(mkTest)(thise, patternInput_3[1]), rfields));
      } else {
        const patternInput_4 = mkCompGenLocal(m_1, "thisCastu", mkProvenUnionCaseTy(cref, patternInput[0]));
        const patternInput_5 = mkCompGenLocal(m_1, "thatCastu", mkProvenUnionCaseTy(cref, patternInput[0]));
        test = mkCompGenLet(m_1, patternInput_4[0], mkUnionCaseProof(thise, cref, patternInput[0], m_1), mkCompGenLet(m_1, patternInput_5[0], mkUnionCaseProof(patternInput_3[1], cref, patternInput[0], m_1), mkEqualsTestConjuncts(g, m_1, mapIndexed(CurriedLambda(mkTest)(patternInput_4[1], patternInput_5[1]), rfields))));
      }

      return mkCase_1(new DecisionTreeTest(0, [cref, patternInput[0]]), mbuilder.AddResultTarget(test, new SequencePointInfoForTarget(1)));
    }
  };

  const patternInput_6 = partition(function (option) {
    return option == null;
  }, map(mkCase, ucases));

  if (patternInput_6[1].tail == null) {
    expr = mkTrue(g, m);
  } else {
    const cases = map(function (_arg1) {
      if (_arg1 == null) {
        throw new Error("mkUnionEquality");
      } else {
        return getValue(_arg1);
      }
    }, patternInput_6[1]);
    const dflt = patternInput_6[0].tail == null ? null : mbuilder.AddResultTarget(mkTrue(g, m), new SequencePointInfoForTarget(1));
    const dtree = new DecisionTree(0, [thise, cases, dflt, m]);
    expr = mbuilder.Close(dtree, m, g.bool_ty);
  }

  let expr_1;

  if (ucases.length === 1) {
    expr_1 = expr;
  } else {
    const tagsEqTested = mkCond(new SequencePointInfoForBinding(3), new SequencePointInfoForTarget(1), m, g.bool_ty, mkILAsmCeq(g, m, patternInput_1[1], patternInput_2[1]), expr, mkFalse(g, m));
    expr_1 = mkCompGenLet(m, patternInput_1[0], mkUnionCaseTagGetViaExprAddr(thise, tcref, patternInput[0], m), mkCompGenLet(m, patternInput_2[0], mkUnionCaseTagGetViaExprAddr(patternInput_3[1], tcref, patternInput[0], m), tagsEqTested));
  }

  const expr_2 = mkBindThatAddr(g, m, patternInput[1], patternInput_3[0], thatv, thate, expr_1);
  const expr_3 = mkIsInstConditional(g, m, patternInput[1], thatobje, thatv, expr_2, mkFalse(g, m));
  const expr_4 = tycon.IsStructOrEnumTycon ? expr_3 : mkBindThisNullEquals(g, m, thise, thatobje, expr_3);
  return expr_4;
}
export function mkRecdHashWithComparer(g, tcref, tycon, compe) {
  const m = tycon.Range;
  const fields = tycon.AllInstanceFieldsAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkThisVar(g, m, patternInput[1]);

  const mkFieldHash = function (fspec) {
    const fty = fspec.FormalType;
    const fref = tcref.MakeNestedRecdFieldRef(fspec);
    const m_1 = fref.Range;
    const e = mkRecdFieldGetViaExprAddr(patternInput_1[1], fref, patternInput[0], m_1);
    return mkCallGenericHashWithComparerOuter(g, m_1, fty, compe, e);
  };

  const patternInput_2 = mkMutableCompGenLocal(m, "i", g.int_ty);
  const stmt = mkCombineHashGenerators(g, m, map(mkFieldHash, fields), mkLocalValRef(patternInput_2[0]), patternInput_2[1]);
  const expr = mkCompGenLet(m, patternInput_2[0], mkZero(g, m), stmt);
  const expr_1 = tycon.IsStructOrEnumTycon ? expr : mkBindNullHash(g, m, patternInput_1[1], expr);
  return [patternInput_1[0], expr_1];
}
export function mkExnHashWithComparer(g, exnref, exnc, compe) {
  const m = exnc.Range;
  const patternInput = mkThisVar(g, m, g.exn_ty);

  const mkHash = function (i, rfield) {
    const fty = rfield.FormalType;
    const e = mkExnCaseFieldGet(patternInput[1], exnref, i, m);
    return mkCallGenericHashWithComparerOuter(g, m, fty, compe, e);
  };

  const patternInput_1 = mkMutableCompGenLocal(m, "i", g.int_ty);
  const stmt = mkCombineHashGenerators(g, m, mapIndexed(mkHash, exnc.AllInstanceFieldsAsList), mkLocalValRef(patternInput_1[0]), patternInput_1[1]);
  const expr = mkCompGenLet(m, patternInput_1[0], mkZero(g, m), stmt);
  const expr_1 = mkBindNullHash(g, m, patternInput[1], expr);
  return [patternInput[0], expr_1];
}
export function mkUnionHashWithComparer(g, tcref, tycon, compe) {
  const m = tycon.Range;
  const ucases = tycon.UnionCasesAsList;
  const patternInput = mkMinimalTy(g, tcref);
  const patternInput_1 = mkThisVar(g, m, patternInput[1]);
  const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m);
  const patternInput_2 = mkMutableCompGenLocal(m, "i", g.int_ty);

  const mkCase = function (i, ucase1) {
    const c1ref = tcref.MakeNestedUnionCaseRef(ucase1);
    const m_1 = c1ref.Range;

    if (ucase1.IsNullary) {
      return null;
    } else {
      const mkHash = function (thise, j, rfield) {
        const fty = rfield.FormalType;
        const e = mkUnionCaseFieldGetProvenViaExprAddr(thise, c1ref, patternInput[0], j, m_1);
        return mkCallGenericHashWithComparerOuter(g, m_1, fty, compe, e);
      };

      let test;

      if (tycon.IsStructOrEnumTycon) {
        test = mkCompGenSequential(m_1, mkValSet(m_1, mkLocalValRef(patternInput_2[0]), mkInt(g, m_1, i)), mkCombineHashGenerators(g, m_1, mapIndexed(CurriedLambda(mkHash)(patternInput_1[1]), ucase1.RecdFields), mkLocalValRef(patternInput_2[0]), patternInput_2[1]));
      } else {
        const patternInput_3 = mkCompGenLocal(m_1, "unionCase", mkProvenUnionCaseTy(c1ref, patternInput[0]));
        test = mkCompGenLet(m_1, patternInput_3[0], mkUnionCaseProof(patternInput_1[1], c1ref, patternInput[0], m_1), mkCompGenSequential(m_1, mkValSet(m_1, mkLocalValRef(patternInput_2[0]), mkInt(g, m_1, i)), mkCombineHashGenerators(g, m_1, mapIndexed(CurriedLambda(mkHash)(patternInput_3[1]), ucase1.RecdFields), mkLocalValRef(patternInput_2[0]), patternInput_2[1])));
      }

      return mkCase_1(new DecisionTreeTest(0, [c1ref, patternInput[0]]), mbuilder.AddResultTarget(test, new SequencePointInfoForTarget(1)));
    }
  };

  const patternInput_4 = partition(function (i_1) {
    return CurriedLambda(() => i_1 == null)();
  }, function (list) {
    return mapIndexed(mkCase, list);
  }(ucases));
  const cases = map(function (_arg1) {
    if (_arg1 == null) {
      throw new Error("mkUnionHash");
    } else {
      return getValue(_arg1);
    }
  }, patternInput_4[1]);
  let dflt;

  if (patternInput_4[0].tail == null) {
    dflt = null;
  } else {
    const tag = mkUnionCaseTagGetViaExprAddr(patternInput_1[1], tcref, patternInput[0], m);
    dflt = mbuilder.AddResultTarget(tag, new SequencePointInfoForTarget(1));
  }

  const dtree = new DecisionTree(0, [patternInput_1[1], cases, dflt, m]);
  const stmt = mbuilder.Close(dtree, m, g.int_ty);
  const expr = mkCompGenLet(m, patternInput_2[0], mkZero(g, m), stmt);
  const expr_1 = tycon.IsStructOrEnumTycon ? expr : mkBindNullHash(g, m, patternInput_1[1], expr);
  return [patternInput_1[0], expr_1];
}
export function isNominalExnc(exnc) {
  const matchValue = exnc.ExceptionInfo;
  const $var1 = matchValue.tag === 3 ? [0] : matchValue.tag === 1 ? [0] : matchValue.tag === 2 ? [1] : [0];

  switch ($var1[0]) {
    case 0:
      return false;

    case 1:
      return true;
  }
}
export function isTrueFSharpStructTycon(_g, tycon) {
  if (tycon.IsFSharpStructOrEnumTycon) {
    return !tycon.IsFSharpEnumTycon;
  } else {
    return false;
  }
}
export function canBeAugmentedWithEquals(g, tycon) {
  if ((tycon.IsUnionTycon ? true : tycon.IsRecordTycon) ? true : tycon.IsExceptionDecl ? isNominalExnc(tycon) : false) {
    return true;
  } else {
    return isTrueFSharpStructTycon(g, tycon);
  }
}
export function canBeAugmentedWithCompare(g, tycon) {
  if (tycon.IsUnionTycon ? true : tycon.IsRecordTycon) {
    return true;
  } else {
    return isTrueFSharpStructTycon(g, tycon);
  }
}
export function getAugmentationAttribs(g, tycon) {
  return [canBeAugmentedWithEquals(g, tycon), canBeAugmentedWithCompare(g, tycon), TryFindFSharpBoolAttribute(g, g.attrib_NoEqualityAttribute, tycon.Attribs), TryFindFSharpBoolAttribute(g, g.attrib_CustomEqualityAttribute, tycon.Attribs), TryFindFSharpBoolAttribute(g, g.attrib_ReferenceEqualityAttribute, tycon.Attribs), TryFindFSharpBoolAttribute(g, g.attrib_StructuralEqualityAttribute, tycon.Attribs), TryFindFSharpBoolAttribute(g, g.attrib_NoComparisonAttribute, tycon.Attribs), TryFindFSharpBoolAttribute(g, g.attrib_CustomComparisonAttribute, tycon.Attribs), TryFindFSharpBoolAttribute(g, g.attrib_StructuralComparisonAttribute, tycon.Attribs)];
}
export function CheckAugmentationAttribs(isImplementation, g, amap, tycon) {
  const m = tycon.Range;
  const attribs = getAugmentationAttribs(g, tycon);
  const $var2 = attribs[2] != null ? getValue(attribs[2]) ? attribs[3] != null ? attribs[6] == null ? [3] : attribs[0] ? attribs[1] ? attribs[5] != null ? getValue(attribs[5]) ? attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[5] != null ? getValue(attribs[5]) ? [7] : attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? [8] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[4] != null ? attribs[6] == null ? [3] : attribs[0] ? attribs[1] ? attribs[5] != null ? getValue(attribs[5]) ? getValue(attribs[4]) ? [7] : [9] : getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : getValue(attribs[4]) ? attribs[5] != null ? getValue(attribs[5]) ? [7] : attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : getValue(attribs[4]) ? [8] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[5] != null ? attribs[6] == null ? [3] : getValue(attribs[5]) ? attribs[0] ? [9] : [8] : attribs[0] ? [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[6] == null ? [3] : getValue(attribs[6]) ? attribs[7] == null ? attribs[8] != null ? getValue(attribs[8]) ? attribs[0] ? attribs[1] ? [4] : [9] : [8] : [9] : [2] : attribs[0] ? attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[0] ? attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[0] ? attribs[1] ? attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] != null ? attribs[3] != null ? getValue(attribs[3]) ? attribs[7] == null ? [6] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : [5] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[3] != null ? getValue(attribs[3]) ? attribs[6] == null ? attribs[7] == null ? [6] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [4] : attribs[3] != null ? getValue(attribs[3]) ? attribs[6] == null ? attribs[7] == null ? [6] : [9] : [9] : [9] : [9] : attribs[3] != null ? getValue(attribs[3]) ? attribs[6] == null ? attribs[7] == null ? [6] : [9] : [9] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] != null ? attribs[3] != null ? getValue(attribs[3]) ? attribs[7] == null ? [6] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : [5] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[3] != null ? getValue(attribs[3]) ? attribs[6] == null ? attribs[7] == null ? [6] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[3] != null ? getValue(attribs[3]) ? attribs[6] == null ? attribs[7] == null ? [6] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? [8] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[3] != null ? getValue(attribs[3]) ? attribs[0] ? attribs[4] != null ? attribs[1] ? attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] != null ? attribs[7] == null ? [6] : getValue(attribs[4]) ? [7] : [9] : [5] : getValue(attribs[4]) ? [7] : [9] : attribs[6] == null ? attribs[7] == null ? [6] : getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [4] : attribs[6] == null ? attribs[7] == null ? [6] : [9] : [9] : attribs[6] == null ? attribs[7] == null ? [6] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] != null ? attribs[7] == null ? [6] : getValue(attribs[4]) ? [7] : [9] : [5] : getValue(attribs[4]) ? [7] : [9] : attribs[6] == null ? attribs[7] == null ? [6] : getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : attribs[6] == null ? attribs[7] == null ? [6] : getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] == null ? [5] : attribs[7] == null ? [6] : [9] : [9] : attribs[6] == null ? attribs[7] == null ? [6] : [9] : [9] : attribs[6] != null ? getValue(attribs[6]) ? attribs[7] == null ? attribs[8] != null ? getValue(attribs[8]) ? attribs[1] ? [4] : [9] : [9] : [0] : attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : [9] : attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : [9] : attribs[7] == null ? attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [6] : [6] : [6] : getValue(attribs[7]) ? attribs[8] != null ? getValue(attribs[8]) ? attribs[1] ? [4] : [9] : [9] : [0] : attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? [8] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[0] ? attribs[1] ? attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] != null ? attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : [5] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] != null ? attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : [5] : attribs[4] != null ? getValue(attribs[4]) ? [7] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? [8] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[4] != null ? getValue(attribs[4]) ? attribs[0] ? attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] != null ? [7] : [5] : [7] : attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : attribs[6] == null ? attribs[7] == null ? attribs[8] != null ? getValue(attribs[8]) ? attribs[1] ? [4] : [7] : [9] : [1] : attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : getValue(attribs[6]) ? attribs[7] == null ? attribs[8] != null ? getValue(attribs[8]) ? attribs[1] ? [4] : [7] : [9] : [1] : attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [7] : [9] : [9] : [8] : attribs[0] ? attribs[1] ? attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] == null ? [5] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? attribs[6] == null ? attribs[8] == null ? [5] : [9] : [9] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? [8] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[5] != null ? getValue(attribs[5]) ? attribs[0] ? attribs[1] ? attribs[6] != null ? getValue(attribs[6]) ? attribs[7] == null ? attribs[8] == null ? [2] : [9] : [9] : [9] : attribs[7] != null ? getValue(attribs[7]) ? attribs[8] == null ? [2] : [9] : attribs[8] == null ? [5] : [9] : attribs[8] == null ? [5] : getValue(attribs[8]) ? [2] : [9] : attribs[6] == null ? attribs[7] != null ? getValue(attribs[7]) ? attribs[8] == null ? [2] : [9] : attribs[8] == null ? [5] : [9] : attribs[8] == null ? [5] : [9] : getValue(attribs[6]) ? attribs[7] == null ? attribs[8] == null ? [2] : [9] : [9] : [9] : [8] : attribs[0] ? [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[6] != null ? getValue(attribs[6]) ? attribs[7] == null ? attribs[8] != null ? getValue(attribs[8]) ? attribs[0] ? attribs[1] ? [4] : [9] : [8] : [9] : [2] : attribs[0] ? attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[0] ? attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9] : attribs[7] == null ? attribs[8] != null ? getValue(attribs[8]) ? attribs[0] ? attribs[1] ? [4] : [9] : [8] : [9] : [0] : attribs[0] ? attribs[1] ? attribs[8] != null ? getValue(attribs[8]) ? [4] : [9] : [9] : [9] : attribs[8] != null ? getValue(attribs[8]) ? [8] : [9] : [9];

  switch ($var2[0]) {
    case 0:
      break;

    case 1:
      if (isTrueFSharpStructTycon(g, tycon)) {
        errorR(new _Error(SR.augNoRefEqualsOnStruct(), m));
      }

      break;

    case 2:
      break;

    case 3:
      errorR(new _Error(SR.augNoEqualityNeedsNoComparison(), m));
      break;

    case 4:
      errorR(new _Error(SR.augStructCompNeedsStructEquality(), m));
      break;

    case 5:
      errorR(new _Error(SR.augStructEqNeedsNoCompOrStructComp(), m));
      break;

    case 6:
      errorR(new _Error(SR.augCustomEqNeedsNoCompOrCustomComp(), m));
      break;

    case 7:
      errorR(new _Error(SR.augTypeCantHaveRefEqAndStructAttrs(), m));
      break;

    case 8:
      errorR(new _Error(SR.augOnlyCertainTypesCanHaveAttrs(), m));
      break;

    case 9:
      errorR(new _Error(SR.augInvalidAttrs(), m));
      break;
  }

  const hasNominalInterface = function (tcref) {
    const ty = generalizedTyconRef(mkLocalTyconRef(tycon));
    return ExistsHeadTypeInEntireHierarchy(g, amap, tycon.Range, ty, tcref);
  };

  const hasExplicitICompare = hasNominalInterface(g.tcref_System_IStructuralComparable) ? true : hasNominalInterface(g.tcref_System_IComparable);
  const hasExplicitIGenericCompare = hasNominalInterface(g.system_GenericIComparable_tcref);
  const hasExplicitEquals = function (arg00, arg10, arg20) {
    return Entity_HasOverride.bind(tycon)(arg00, arg10, arg20);
  }(g, "Equals", ofArray([g.obj_ty])) ? true : hasNominalInterface(g.tcref_System_IStructuralEquatable);
  const hasExplicitGenericEquals = hasNominalInterface(g.system_GenericIEquatable_tcref);
  const $var3 = attribs[2] != null ? getValue(attribs[2]) ? (hasExplicitEquals ? true : hasExplicitGenericEquals) ? [0] : [1] : [1] : [1];

  switch ($var3[0]) {
    case 0:
      warning(new _Error(SR.augNoEqNeedsNoObjEquals(), m));
      break;

    case 1:
      const $var4 = attribs[6] != null ? getValue(attribs[6]) ? (hasExplicitICompare ? true : hasExplicitIGenericCompare) ? [0] : [1] : [1] : [1];

      switch ($var4[0]) {
        case 0:
          warning(new _Error(SR.augNoCompCantImpIComp(), m));
          break;

        case 1:
          const $var5 = attribs[3] != null ? getValue(attribs[3]) ? ((isImplementation ? !hasExplicitEquals : false) ? !hasExplicitGenericEquals : false) ? [0] : [1] : [1] : [1];

          switch ($var5[0]) {
            case 0:
              errorR(new _Error(SR.augCustomEqNeedsObjEquals(), m));
              break;

            case 1:
              const $var6 = attribs[7] != null ? getValue(attribs[7]) ? ((isImplementation ? !hasExplicitICompare : false) ? !hasExplicitIGenericCompare : false) ? [0] : [1] : [1] : [1];

              switch ($var6[0]) {
                case 0:
                  errorR(new _Error(SR.augCustomCompareNeedsIComp(), m));
                  break;

                case 1:
                  const $var7 = attribs[4] != null ? getValue(attribs[4]) ? (hasExplicitEquals ? true : hasExplicitIGenericCompare) ? [0] : [1] : [1] : [1];

                  switch ($var7[0]) {
                    case 0:
                      errorR(new _Error(SR.augRefEqCantHaveObjEquals(), m));
                      break;

                    case 1:
                      break;
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
export function TyconIsCandidateForAugmentationWithCompare(g, tycon) {
  const isUnit = g.compilingFslib ? tycon.DisplayName === "Unit" : false;

  if (!isUnit) {
    const matchValue = getAugmentationAttribs(g, tycon);
    const $var8 = matchValue[0] ? matchValue[1] ? matchValue[2] == null ? matchValue[3] == null ? matchValue[4] == null ? matchValue[5] != null ? getValue(matchValue[5]) ? matchValue[6] == null ? matchValue[7] == null ? matchValue[8] != null ? getValue(matchValue[8]) ? [0] : [1] : [1] : [1] : [1] : [1] : matchValue[6] == null ? matchValue[7] == null ? matchValue[8] != null ? getValue(matchValue[8]) ? [0] : [1] : [0] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var8[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  } else {
    return false;
  }
}
export function TyconIsCandidateForAugmentationWithEquals(g, tycon) {
  const isUnit = g.compilingFslib ? tycon.DisplayName === "Unit" : false;

  if (!isUnit) {
    const matchValue = getAugmentationAttribs(g, tycon);
    const $var9 = matchValue[0] ? matchValue[2] == null ? matchValue[3] == null ? matchValue[4] == null ? matchValue[5] != null ? getValue(matchValue[5]) ? [0] : [1] : [0] : [1] : [1] : [1] : [1];

    switch ($var9[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  } else {
    return false;
  }
}
export function TyconIsCandidateForAugmentationWithHash(g, tycon) {
  return TyconIsCandidateForAugmentationWithEquals(g, tycon);
}
export function slotImplMethod(_final, c, slotsig) {
  const ImplementedSlotSigs = ofArray([slotsig]);
  const MemberFlags = new MemberFlags_1(true, false, true, _final, new MemberKind(2));
  return new ValMemberInfo(c, ImplementedSlotSigs, false, MemberFlags);
}
export function nonVirtualMethod(c) {
  const ImplementedSlotSigs = new List();
  const MemberFlags = new MemberFlags_1(true, false, false, false, new MemberKind(2));
  return new ValMemberInfo(c, ImplementedSlotSigs, false, MemberFlags);
}
export const unitArg = ValReprInfoModule.unitArgData;
export const unaryArg = ofArray([ValReprInfoModule.unnamedTopArg]);
export const tupArg = ofArray([ofArray([ValReprInfoModule.unnamedTopArg1, ValReprInfoModule.unnamedTopArg1])]);
export function mkValSpec(g, tcref, tmty, vis, slotsig, methn, ty, argData) {
  const m = tcref.Range;
  const tps = tcref.Typars(m);

  const _final = (isUnionTy(g, tmty) ? true : isRecdTy(g, tmty)) ? true : isStructTy(g, tmty);

  const membInfo = slotsig != null ? slotImplMethod(_final, tcref, getValue(slotsig)) : nonVirtualMethod(tcref);
  const inl = new ValInline(2);
  const args = new List(ValReprInfoModule.unnamedTopArg, argData);
  const topValInfo = new ValReprInfo(0, [ValReprInfoModule.InferTyparInfo(tps), args, ValReprInfoModule.unnamedRetVal]);
  return NewVal(methn, m, null, ty, new ValMutability(0), true, topValInfo, vis, new ValRecursiveScopeInfo(1), membInfo, new ValBaseOrThisInfo(2), new List(), inl, XmlDoc.Empty, true, false, false, false, false, false, null, new ParentRef(0, tcref));
}
export function MakeValsForCompareAugmentation(g, tcref) {
  const m = tcref.Range;
  const patternInput = mkMinimalTy(g, tcref);
  const tps = tcref.Typars(m);
  const vis = tcref.TypeReprAccessibility;
  return [mkValSpec(g, tcref, patternInput[1], vis, mkIComparableCompareToSlotSig(g), "CompareTo", op_PlusMinusGreater(tps, mkCompareObjTy(g, patternInput[1])), unaryArg), mkValSpec(g, tcref, patternInput[1], vis, mkGenericIComparableCompareToSlotSig(g, patternInput[1]), "CompareTo", op_PlusMinusGreater(tps, mkCompareTy(g, patternInput[1])), unaryArg)];
}
export function MakeValsForCompareWithComparerAugmentation(g, tcref) {
  const m = tcref.Range;
  const patternInput = mkMinimalTy(g, tcref);
  const tps = tcref.Typars(m);
  const vis = tcref.TypeReprAccessibility;
  return mkValSpec(g, tcref, patternInput[1], vis, mkIStructuralComparableCompareToSlotSig(g), "CompareTo", op_PlusMinusGreater(tps, mkCompareWithComparerTy(g, patternInput[1])), tupArg);
}
export function MakeValsForEqualsAugmentation(g, tcref) {
  const m = tcref.Range;
  const patternInput = mkMinimalTy(g, tcref);
  const vis = tcref.TypeReprAccessibility;
  const tps = tcref.Typars(m);
  const objEqualsVal = mkValSpec(g, tcref, patternInput[1], vis, mkEqualsSlotSig(g), "Equals", op_PlusMinusGreater(tps, mkEqualsObjTy(g, patternInput[1])), unaryArg);
  const nocEqualsVal = mkValSpec(g, tcref, patternInput[1], vis, tcref.Deref.IsExceptionDecl ? null : mkGenericIEquatableEqualsSlotSig(g, patternInput[1]), "Equals", op_PlusMinusGreater(tps, mkEqualsTy(g, patternInput[1])), unaryArg);
  return [objEqualsVal, nocEqualsVal];
}
export function MakeValsForEqualityWithComparerAugmentation(g, tcref) {
  const patternInput = mkMinimalTy(g, tcref);
  const vis = tcref.TypeReprAccessibility;
  const tps = tcref.Typars(tcref.Range);
  const objGetHashCodeVal = mkValSpec(g, tcref, patternInput[1], vis, mkGetHashCodeSlotSig(g), "GetHashCode", op_PlusMinusGreater(tps, mkHashTy(g, patternInput[1])), unitArg);
  const withcGetHashCodeVal = mkValSpec(g, tcref, patternInput[1], vis, mkIStructuralEquatableGetHashCodeSlotSig(g), "GetHashCode", op_PlusMinusGreater(tps, mkHashWithComparerTy(g, patternInput[1])), unaryArg);
  const withcEqualsVal = mkValSpec(g, tcref, patternInput[1], vis, mkIStructuralEquatableEqualsSlotSig(g), "Equals", op_PlusMinusGreater(tps, mkEqualsWithComparerTy(g, patternInput[1])), tupArg);
  return [objGetHashCodeVal, withcGetHashCodeVal, withcEqualsVal];
}
export function MakeBindingsForCompareAugmentation(g, tycon) {
  const tcref = mkLocalTyconRef(tycon);
  const m = tycon.Range;
  const tps = tycon.Typars(tycon.Range);

  const mkCompare = function (comparef) {
    const matchValue = tycon.GeneratedCompareToValues;

    if (matchValue != null) {
      const vref2 = getValue(matchValue)[1];
      const vref1 = getValue(matchValue)[0];
      const vspec1 = vref1.Deref;
      const vspec2 = vref2.Deref;
      let rhs1;
      const patternInput = mkMinimalTy(g, tcref);
      const patternInput_1 = mkThisVar(g, m, patternInput[1]);
      const patternInput_2 = mkCompGenLocal(m, "obj", g.obj_ty);
      let comparee;

      if (isUnitTy(g, patternInput[1])) {
        comparee = mkZero(g, m);
      } else {
        const thate = mkCoerceExpr(patternInput_2[1], patternInput[1], m, g.obj_ty);
        comparee = mkApps(g, [exprForValRef(m, vref2), vref2.Type], patternInput[0].tail == null ? new List() : ofArray([patternInput[0]]), ofArray([patternInput_1[1], thate]), m);
      }

      rhs1 = mkLambdas(m, tps, ofArray([patternInput_1[0], patternInput_2[0]]), comparee, g.int_ty);
      let rhs2;
      const patternInput_3 = comparef(g, tcref, tycon);
      rhs2 = mkLambdas(m, tps, ofArray([patternInput_3[0], patternInput_3[1]]), patternInput_3[2], g.int_ty);
      return ofArray([mkCompGenBind(vspec2, rhs2), mkCompGenBind(vspec1, rhs1)]);
    } else {
      return new List();
    }
  };

  if (tycon.IsUnionTycon) {
    return mkCompare(function (g_1, tcref_1, tycon_1) {
      return mkUnionCompare(g_1, tcref_1, tycon_1);
    });
  } else if (tycon.IsRecordTycon ? true : tycon.IsStructOrEnumTycon) {
    return mkCompare(function (g_2, tcref_2, tycon_2) {
      return mkRecdCompare(g_2, tcref_2, tycon_2);
    });
  } else {
    return new List();
  }
}
export function MakeBindingsForCompareWithComparerAugmentation(g, tycon) {
  const tcref = mkLocalTyconRef(tycon);
  const m = tycon.Range;
  const tps = tycon.Typars(tycon.Range);

  const mkCompare = function (comparef) {
    const matchValue = tycon.GeneratedCompareToWithComparerValues;

    if (matchValue != null) {
      const vspec = getValue(matchValue).Deref;
      const patternInput = mkMinimalTy(g, tcref);
      const patternInput_1 = mkCompGenLocal(m, "comp", g.IComparer_ty);
      const patternInput_2 = mkThisVar(g, m, patternInput[1]);
      const patternInput_3 = mkCompGenLocal(m, "obj", g.obj_ty);
      const thate = mkCoerceExpr(patternInput_3[1], patternInput[1], m, g.obj_ty);
      let rhs;
      const comparee = comparef(g, tcref, tycon, [patternInput_2[0], patternInput_2[1]], [patternInput_3[0], thate], patternInput_1[1]);
      const comparee_1 = isUnitTy(g, patternInput[1]) ? mkZero(g, m) : comparee;
      rhs = mkMultiLambdas(m, tps, ofArray([ofArray([patternInput_2[0]]), ofArray([patternInput_3[0], patternInput_1[0]])]), comparee_1, g.int_ty);
      return ofArray([mkCompGenBind(vspec, rhs)]);
    } else {
      return new List();
    }
  };

  if (tycon.IsUnionTycon) {
    return mkCompare(function (g_1, tcref_1, tycon_1, tupledArg, tupledArg_1, compe) {
      return mkUnionCompareWithComparer(g_1, tcref_1, tycon_1, tupledArg[0], tupledArg[1], tupledArg_1[0], tupledArg_1[1], compe);
    });
  } else if (tycon.IsRecordTycon ? true : tycon.IsStructOrEnumTycon) {
    return mkCompare(function (g_2, tcref_2, tycon_2, tupledArg_2, tupledArg_3, compe_1) {
      return mkRecdCompareWithComparer(g_2, tcref_2, tycon_2, tupledArg_2[0], tupledArg_2[1], tupledArg_3[0], tupledArg_3[1], compe_1);
    });
  } else {
    return new List();
  }
}
export function MakeBindingsForEqualityWithComparerAugmentation(g, tycon) {
  const tcref = mkLocalTyconRef(tycon);
  const m = tycon.Range;
  const tps = tycon.Typars(tycon.Range);

  const mkStructuralEquatable = function (hashf, equalsf) {
    const matchValue = tycon.GeneratedHashAndEqualsWithComparerValues;

    if (matchValue != null) {
      const withcGetHashCodeVal = getValue(matchValue)[1];
      const withcEqualsVal = getValue(matchValue)[2];
      const objGetHashCodeVal = getValue(matchValue)[0];
      let withcGetHashCodeExpr;
      const patternInput = mkCompGenLocal(m, "comp", g.IEqualityComparer_ty);
      const patternInput_1 = hashf(g, tcref, tycon, patternInput[1]);
      withcGetHashCodeExpr = mkLambdas(m, tps, ofArray([patternInput_1[0], patternInput[0]]), patternInput_1[1], g.int_ty);
      let withcEqualsExpr;
      const patternInput_2 = mkMinimalTy(g, tcref);
      const patternInput_3 = mkThisVar(g, m, patternInput_2[1]);
      const patternInput_4 = mkCompGenLocal(m, "obj", g.obj_ty);
      const patternInput_5 = mkCompGenLocal(m, "that", patternInput_2[1]);
      const patternInput_6 = mkCompGenLocal(m, "comp", g.IEqualityComparer_ty);
      const equalse = equalsf(g, tcref, tycon, [patternInput_3[0], patternInput_3[1]], patternInput_4[1], [patternInput_5[0], patternInput_5[1]], patternInput_6[1]);
      withcEqualsExpr = mkMultiLambdas(m, tps, ofArray([ofArray([patternInput_3[0]]), ofArray([patternInput_4[0], patternInput_6[0]])]), equalse, g.bool_ty);
      let objGetHashCodeExpr;
      const patternInput_7 = mkMinimalTy(g, tcref);
      const patternInput_8 = mkThisVar(g, m, patternInput_7[1]);
      const patternInput_9 = mkCompGenLocal(m, "unitArg", g.unit_ty);
      let hashe;

      if (isUnitTy(g, patternInput_7[1])) {
        hashe = mkZero(g, m);
      } else {
        const compe = mkILCallGetEqualityComparer(g, m);
        hashe = mkApps(g, [exprForValRef(m, withcGetHashCodeVal), withcGetHashCodeVal.Type], patternInput_7[0].tail == null ? new List() : ofArray([patternInput_7[0]]), ofArray([patternInput_8[1], compe]), m);
      }

      objGetHashCodeExpr = mkLambdas(m, tps, ofArray([patternInput_8[0], patternInput_9[0]]), hashe, g.int_ty);
      return ofArray([mkCompGenBind(withcGetHashCodeVal.Deref, withcGetHashCodeExpr), mkCompGenBind(objGetHashCodeVal.Deref, objGetHashCodeExpr), mkCompGenBind(withcEqualsVal.Deref, withcEqualsExpr)]);
    } else {
      return new List();
    }
  };

  if (tycon.IsUnionTycon) {
    return mkStructuralEquatable(function (g_1, tcref_1, tycon_1, compe_1) {
      return mkUnionHashWithComparer(g_1, tcref_1, tycon_1, compe_1);
    }, function (g_2, tcref_2, tycon_2, tupledArg, thatobje, tupledArg_1, compe_2) {
      return mkUnionEqualityWithComparer(g_2, tcref_2, tycon_2, tupledArg[0], tupledArg[1], thatobje, tupledArg_1[0], tupledArg_1[1], compe_2);
    });
  } else if (tycon.IsRecordTycon ? true : tycon.IsStructOrEnumTycon) {
    return mkStructuralEquatable(function (g_3, tcref_3, tycon_3, compe_3) {
      return mkRecdHashWithComparer(g_3, tcref_3, tycon_3, compe_3);
    }, function (g_4, tcref_4, tycon_4, tupledArg_2, thatobje_1, tupledArg_3, compe_4) {
      return mkRecdEqualityWithComparer(g_4, tcref_4, tycon_4, tupledArg_2[0], tupledArg_2[1], thatobje_1, tupledArg_3[0], tupledArg_3[1], compe_4);
    });
  } else if (tycon.IsExceptionDecl) {
    return mkStructuralEquatable(function (g_5, exnref, exnc, compe_5) {
      return mkExnHashWithComparer(g_5, exnref, exnc, compe_5);
    }, function (g_6, exnref_1, exnc_1, tupledArg_4, thatobje_2, tupledArg_5, compe_6) {
      return mkExnEqualityWithComparer(g_6, exnref_1, exnc_1, tupledArg_4[0], tupledArg_4[1], thatobje_2, tupledArg_5[0], tupledArg_5[1], compe_6);
    });
  } else {
    return new List();
  }
}
export function MakeBindingsForEqualsAugmentation(g, tycon) {
  const tcref = mkLocalTyconRef(tycon);
  const m = tycon.Range;
  const tps = tycon.Typars(m);

  const mkEquals = function (equalsf) {
    const matchValue = tycon.GeneratedHashAndEqualsValues;

    if (matchValue != null) {
      const objEqualsVal = getValue(matchValue)[0];
      const nocEqualsVal = getValue(matchValue)[1];
      let nocEqualsExpr;
      const patternInput = equalsf(g, tcref, tycon);
      nocEqualsExpr = mkLambdas(m, tps, ofArray([patternInput[0], patternInput[1]]), patternInput[2], g.bool_ty);
      let objEqualsExpr;
      const patternInput_1 = mkMinimalTy(g, tcref);
      const patternInput_2 = mkThisVar(g, m, patternInput_1[1]);
      const patternInput_3 = mkCompGenLocal(m, "obj", g.obj_ty);
      let equalse;

      if (isUnitTy(g, patternInput_1[1])) {
        equalse = mkTrue(g, m);
      } else {
        const patternInput_4 = mkCompGenLocal(m, "that", patternInput_1[1]);
        equalse = mkIsInstConditional(g, m, patternInput_1[1], patternInput_3[1], patternInput_4[0], mkApps(g, [exprForValRef(m, nocEqualsVal), nocEqualsVal.Type], patternInput_1[0].tail == null ? new List() : ofArray([patternInput_1[0]]), ofArray([patternInput_2[1], patternInput_4[1]]), m), mkFalse(g, m));
      }

      objEqualsExpr = mkLambdas(m, tps, ofArray([patternInput_2[0], patternInput_3[0]]), equalse, g.bool_ty);
      return ofArray([mkCompGenBind(nocEqualsVal.Deref, nocEqualsExpr), mkCompGenBind(objEqualsVal.Deref, objEqualsExpr)]);
    } else {
      return new List();
    }
  };

  if (tycon.IsExceptionDecl) {
    return mkEquals(function (g_1, exnref, exnc) {
      return mkExnEquality(g_1, exnref, exnc);
    });
  } else if (tycon.IsUnionTycon) {
    return mkEquals(function (g_2, tcref_1, tycon_1) {
      return mkUnionEquality(g_2, tcref_1, tycon_1);
    });
  } else if (tycon.IsRecordTycon ? true : tycon.IsStructOrEnumTycon) {
    return mkEquals(function (g_3, tcref_2, tycon_2) {
      return mkRecdEquality(g_3, tcref_2, tycon_2);
    });
  } else {
    return new List();
  }
}
export function TypeDefinitelyHasEquality(g, ty) {
  if (isAppTy(g, ty) ? HasFSharpAttribute(g, g.attrib_NoEqualityAttribute, tcrefOfAppTy(g, ty).Attribs) : false) {
    return false;
  } else if (isTyparTy(g, ty) ? exists(function (_arg1) {
    return _arg1.tag === 10 ? true : false;
  }, destTyparTy(g, ty).Constraints) : false) {
    return true;
  } else {
    const activePatternResult33884 = function (arg10_) {
      return _SpecialEquatableHeadType___(g, arg10_);
    }(ty);

    if (activePatternResult33884 != null) {
      return forAll(function (arg10__1) {
        return TypeDefinitelyHasEquality(g, arg10__1);
      }, getValue(activePatternResult33884));
    } else {
      const activePatternResult33882 = function (arg10__2) {
        return _SpecialNotEquatableHeadType___(g, arg10__2);
      }(ty);

      if (activePatternResult33882 != null) {
        return false;
      } else if (isAppTy(g, ty)) {
        const patternInput = destAppTy(g, ty);

        if (!(TyconIsCandidateForAugmentationWithEquals(g, patternInput[0].Deref) ? patternInput[0].GeneratedHashAndEqualsWithComparerValues == null : false)) {
          return List_1.lengthsEqAndForall2(function (ty_1, tp) {
            return !tp.EqualityConditionalOn ? true : TypeDefinitelyHasEquality(g, ty_1);
          }, patternInput[1], patternInput[0].TyparsNoRange);
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
}