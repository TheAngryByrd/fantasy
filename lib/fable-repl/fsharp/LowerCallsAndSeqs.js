import { mkThrow, mkNonNullCond, mkTryWith, mkLocal, mkCase, MatchBuilder, mkZero, mkByrefTy, mkMutableCompGenLocal, mkCallSeqCollect, mkTwo, mkAddrSet, argsOfAppTy, tcrefOfAppTy, tyconRefEq, isAppTy, mkFalse, primMkMatch, mkLetBind, IsGenericValWithGenericContraints, mkUnit, mkTrue, ValCopyFlag, copyExpr, mkInvisibleLet, mkCallSeqGenerated, mkSeqTy, mkCallSeqUsing, mkIEnumeratorTy, exprForVal, mkCallDispose, mkCallSeqFinally, mkLet, mkWhile, mkBool, mkOne, mkInt32, mkDefault, mkValSet, mkSequential, mkCompGenSequential, Expr$2E$get_Range as Expr_get_Range, mkCallSeqSingleton, valRefEq, CollectTyparsAndLocals, freeInExpr, mkCompGenLocal, tyOfExpr, mkLambda, ExprRewritingEnv, RewriteImplFile, MakeApplicationAndBetaReduce, AdjustValForExpectedArity } from "./TastOps";
import { getValue } from "../fable-core/Option";
import { mapIndexed, unzip3, collect, append, ofArray, map } from "../fable-core/List";
import List from "../fable-core/List";
import { InfoReader, TryFindIntrinsicMethInfo } from "./InfoReader";
import { AccessorDomain } from "./AccessibilityLogic";
import { BuildILMethInfoCall } from "./MethodCalls";
import { LValueOperation, Const, DecisionTreeTest, DecisionTree, DecisionTreeTarget, SequentialOpKind, SpecialWhileLoopMarker, TOp, mkLocalValRef, Expr, ValRef, ValUseFlag } from "./tast";
import { InternalError, error } from "./ErrorLogger";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, makeGeneric, Tuple, Function as _Function } from "../fable-core/Util";
import { create } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import { ZsetModule } from "../absil/zset";
import { SequencePointInfoForWith, SequencePointInfoForTry, SequencePointInfoForTarget, SequencePointInfoForBinding, SequencePointInfoForWhileLoop, SequencePointInfoForSeq } from "./ast";
import { generateCodeLabel } from "../absil/il";
import { map as map_2, empty, singleton, append as append_1, delay, zip, reduce, map2, exists, forAll, toList } from "../fable-core/Seq";
import { map as map_1 } from "../fable-core/Array";
import { SearchEntireHierarchyOfType } from "./infos";
import CurriedLambda from "../fable-core/CurriedLambda";
import Comparer from "../fable-core/Comparer";
export function InterceptExpr(g, cont, expr) {
  if (expr.tag === 1) {
    const matchValue = expr.data[0].ValReprInfo;

    if (matchValue == null) {
      return null;
    } else {
      return AdjustValForExpectedArity(g, expr.data[2], expr.data[0], expr.data[1], getValue(matchValue))[0];
    }
  } else if (expr.tag === 5) {
    if (expr.data[0].tag === 1) {
      const matchValue_1 = expr.data[0].data[0].ValReprInfo;

      if (matchValue_1 == null) {
        return null;
      } else {
        const argsl = map(cont, expr.data[3]);
        const f0 = getValue(matchValue_1).AritiesOfArgs.length > argsl.length ? AdjustValForExpectedArity(g, expr.data[4], expr.data[0].data[0], expr.data[0].data[1], getValue(matchValue_1))[0] : expr.data[0];
        return MakeApplicationAndBetaReduce(g, f0, expr.data[1], ofArray([expr.data[2]]), argsl, expr.data[4]);
      }
    } else {
      return MakeApplicationAndBetaReduce(g, expr.data[0], expr.data[1], ofArray([expr.data[2]]), expr.data[3], expr.data[4]);
    }
  } else {
    return null;
  }
}
export function LowerImplFile(g, ass) {
  var PreIntercept;
  var PreInterceptBinding;
  return RewriteImplFile((PreIntercept = function (cont, expr) {
    return InterceptExpr(g, cont, expr);
  }, PreInterceptBinding = null, new ExprRewritingEnv(PreIntercept, function (_arg1) {
    return null;
  }, PreInterceptBinding, false)), ass);
}
export function mkLambdaNoType(g, m, uv, e) {
  return mkLambda(m, uv, e, tyOfExpr(g, e));
}
export function mkUnitDelayLambda(g, m, e) {
  const patternInput = mkCompGenLocal(m, "unitVar", g.unit_ty);
  return mkLambdaNoType(g, m, patternInput[0], e);
}
export function callNonOverloadedMethod(g, amap, m, methName, ty, args) {
  const matchValue = TryFindIntrinsicMethInfo(new InfoReader(g, amap), m, new AccessorDomain(2), methName, ty);

  if (matchValue.tail != null) {
    if (matchValue.head.tag === 1) {
      return BuildILMethInfoCall(matchValue.head.data[0], amap, m, false, matchValue.head.data[1], new ValUseFlag(1), new List(), false, args)[0];
    } else {
      return error(new InternalError("The method called '" + methName + "' resolved to a non-IL type", m));
    }
  } else {
    return error(new InternalError("No method called '" + methName + "' was found", m));
  }
}
export class LoweredSeqFirstPhaseResult {
  constructor(phase2, labels, significantClose, stateVars) {
    this.phase2 = phase2;
    this.labels = labels;
    this.significantClose = significantClose;
    this.stateVars = stateVars;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.LowerCallsAndSeqs.LoweredSeqFirstPhaseResult",
      interfaces: ["FSharpRecord"],
      properties: {
        phase2: _Function([Tuple([ValRef, ValRef, ValRef, makeGeneric(_Map, {
          Key: "number",
          Value: "number"
        })]), Tuple([Expr, Expr, Expr])]),
        labels: makeGeneric(List, {
          T: "number"
        }),
        significantClose: "boolean",
        stateVars: makeGeneric(List, {
          T: ValRef
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.LowerCallsAndSeqs.LoweredSeqFirstPhaseResult", LoweredSeqFirstPhaseResult);
export function isVarFreeInExpr(v, e) {
  return ZsetModule.contains(v, freeInExpr(CollectTyparsAndLocals, e).FreeLocals);
}
export function LowerSeqExpr(g, amap, overallExpr) {
  const _SeqYield___ = function (expr) {
    var vref;
    var arg;
    const $var1 = expr.tag === 5 ? expr.data[0].tag === 1 ? expr.data[3].tail != null ? expr.data[3].tail.tail == null ? (vref = expr.data[0].data[0], arg = expr.data[3].head, valRefEq(g, vref, g.seq_singleton_vref)) ? [0, expr.data[1], expr.data[2], expr.data[3].head, expr.data[4], expr.data[0].data[0]] : [1] : [1] : [1] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return [$var1[3], $var1[4]];

      case 1:
        return null;
    }
  };

  const _SeqAppend___ = function (expr_1) {
    var vref_1;
    var arg2;
    var arg1;
    const $var2 = expr_1.tag === 5 ? expr_1.data[0].tag === 1 ? expr_1.data[3].tail != null ? expr_1.data[3].tail.tail != null ? expr_1.data[3].tail.tail.tail == null ? (vref_1 = expr_1.data[0].data[0], arg2 = expr_1.data[3].tail.head, arg1 = expr_1.data[3].head, valRefEq(g, vref_1, g.seq_append_vref)) ? [0, expr_1.data[1], expr_1.data[2], expr_1.data[3].head, expr_1.data[3].tail.head, expr_1.data[4], expr_1.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var2[0]) {
      case 0:
        return [$var2[3], $var2[4], $var2[5]];

      case 1:
        return null;
    }
  };

  const _SeqWhile___ = function (expr_2) {
    var vref_2;
    var gd;
    var dummyv;
    var arg2_1;
    const $var3 = expr_2.tag === 5 ? expr_2.data[0].tag === 1 ? expr_2.data[3].tail != null ? expr_2.data[3].head.tag === 3 ? expr_2.data[3].head.data[3].tail != null ? expr_2.data[3].head.data[3].tail.tail == null ? expr_2.data[3].tail.tail != null ? expr_2.data[3].tail.tail.tail == null ? (vref_2 = expr_2.data[0].data[0], gd = expr_2.data[3].head.data[4], dummyv = expr_2.data[3].head.data[3].head, arg2_1 = expr_2.data[3].tail.head, valRefEq(g, vref_2, g.seq_generated_vref) ? !isVarFreeInExpr(dummyv, gd) : false) ? [0, expr_2.data[1], expr_2.data[2], expr_2.data[3].tail.head, expr_2.data[3].head.data[3].head, expr_2.data[3].head.data[4], expr_2.data[4], expr_2.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var3[0]) {
      case 0:
        return [$var3[5], $var3[3], $var3[6]];

      case 1:
        return null;
    }
  };

  const _SeqTryFinally___ = function (expr_3) {
    var vref_3;
    var dummyv_1;
    var compensation;
    var arg1_1;
    const $var4 = expr_3.tag === 5 ? expr_3.data[0].tag === 1 ? expr_3.data[3].tail != null ? expr_3.data[3].tail.tail != null ? expr_3.data[3].tail.head.tag === 3 ? expr_3.data[3].tail.head.data[3].tail != null ? expr_3.data[3].tail.head.data[3].tail.tail == null ? expr_3.data[3].tail.tail.tail == null ? (vref_3 = expr_3.data[0].data[0], dummyv_1 = expr_3.data[3].tail.head.data[3].head, compensation = expr_3.data[3].tail.head.data[4], arg1_1 = expr_3.data[3].head, valRefEq(g, vref_3, g.seq_finally_vref) ? !isVarFreeInExpr(dummyv_1, compensation) : false) ? [0, expr_3.data[1], expr_3.data[2], expr_3.data[3].head, expr_3.data[3].tail.head.data[4], expr_3.data[3].tail.head.data[3].head, expr_3.data[4], expr_3.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var4[0]) {
      case 0:
        return [$var4[3], $var4[4], $var4[6]];

      case 1:
        return null;
    }
  };

  const _SeqUsing___ = function (expr_4) {
    var vref_4;
    var v;
    var resource;
    var elemTy;
    var body;
    const $var5 = expr_4.tag === 5 ? expr_4.data[0].tag === 1 ? expr_4.data[2].tail != null ? expr_4.data[2].tail.tail != null ? expr_4.data[2].tail.tail.tail != null ? expr_4.data[2].tail.tail.tail.tail == null ? expr_4.data[3].tail != null ? expr_4.data[3].tail.tail != null ? expr_4.data[3].tail.head.tag === 3 ? expr_4.data[3].tail.head.data[3].tail != null ? expr_4.data[3].tail.head.data[3].tail.tail == null ? expr_4.data[3].tail.tail.tail == null ? (vref_4 = expr_4.data[0].data[0], v = expr_4.data[3].tail.head.data[3].head, resource = expr_4.data[3].head, elemTy = expr_4.data[2].tail.tail.head, body = expr_4.data[3].tail.head.data[4], valRefEq(g, vref_4, g.seq_using_vref)) ? [0, expr_4.data[1], expr_4.data[3].tail.head.data[4], expr_4.data[2].tail.tail.head, expr_4.data[4], expr_4.data[3].head, expr_4.data[3].tail.head.data[3].head, expr_4.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var5[0]) {
      case 0:
        return [$var5[5], $var5[6], $var5[2], $var5[3], $var5[4]];

      case 1:
        return null;
    }
  };

  const _SeqFor___ = function (expr_5) {
    var vref_6;
    var v_2;
    var inp_1;
    var genElemTy_1;
    var body_2;

    var _inpElemTy_1;

    var _enumty2;

    var vref_5;
    var v_1;
    var inp;
    var genElemTy;
    var body_1;

    var _inpElemTy;

    const $var6 = expr_5.tag === 5 ? expr_5.data[0].tag === 1 ? expr_5.data[2].tail != null ? expr_5.data[2].tail.tail != null ? expr_5.data[2].tail.tail.tail != null ? expr_5.data[2].tail.tail.tail.tail == null ? expr_5.data[3].tail != null ? expr_5.data[3].head.tag === 3 ? expr_5.data[3].head.data[3].tail != null ? expr_5.data[3].head.data[3].tail.tail == null ? expr_5.data[3].tail.tail != null ? expr_5.data[3].tail.tail.tail == null ? (vref_6 = expr_5.data[0].data[0], v_2 = expr_5.data[3].head.data[3].head, inp_1 = expr_5.data[3].tail.head, genElemTy_1 = expr_5.data[2].tail.tail.head, body_2 = expr_5.data[3].head.data[4], _inpElemTy_1 = expr_5.data[2].head, _enumty2 = expr_5.data[2].tail.head, valRefEq(g, vref_6, g.seq_collect_vref)) ? [0, expr_5.data[2].tail.head, expr_5.data[1], expr_5.data[2].head, expr_5.data[3].head.data[4], expr_5.data[2].tail.tail.head, expr_5.data[3].tail.head, expr_5.data[4], expr_5.data[3].head.data[3].head, expr_5.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var6[0]) {
      case 0:
        return [$var6[6], $var6[8], $var6[4], $var6[5], $var6[7]];

      case 1:
        const $var7 = expr_5.tag === 5 ? expr_5.data[0].tag === 1 ? expr_5.data[2].tail != null ? expr_5.data[2].tail.tail != null ? expr_5.data[2].tail.tail.tail == null ? expr_5.data[3].tail != null ? expr_5.data[3].head.tag === 3 ? expr_5.data[3].head.data[3].tail != null ? expr_5.data[3].head.data[3].tail.tail == null ? expr_5.data[3].tail.tail != null ? expr_5.data[3].tail.tail.tail == null ? (vref_5 = expr_5.data[0].data[0], v_1 = expr_5.data[3].head.data[3].head, inp = expr_5.data[3].tail.head, genElemTy = expr_5.data[2].tail.head, body_1 = expr_5.data[3].head.data[4], _inpElemTy = expr_5.data[2].head, valRefEq(g, vref_5, g.seq_map_vref)) ? [0, expr_5.data[1], expr_5.data[2].head, expr_5.data[3].head.data[4], expr_5.data[2].tail.head, expr_5.data[3].tail.head, expr_5.data[4], expr_5.data[3].head.data[3].head, expr_5.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

        switch ($var7[0]) {
          case 0:
            return [$var7[5], $var7[7], mkCallSeqSingleton(g, Expr_get_Range.bind($var7[3])(), $var7[4], $var7[3]), $var7[4], $var7[6]];

          case 1:
            return null;
        }

    }
  };

  const _SeqDelay___ = function (expr_6) {
    var vref_7;
    var v_3;
    var elemTy_1;
    var e;
    const $var8 = expr_6.tag === 5 ? expr_6.data[0].tag === 1 ? expr_6.data[2].tail != null ? expr_6.data[2].tail.tail == null ? expr_6.data[3].tail != null ? expr_6.data[3].head.tag === 3 ? expr_6.data[3].head.data[3].tail != null ? expr_6.data[3].head.data[3].tail.tail == null ? expr_6.data[3].tail.tail == null ? (vref_7 = expr_6.data[0].data[0], v_3 = expr_6.data[3].head.data[3].head, elemTy_1 = expr_6.data[2].head, e = expr_6.data[3].head.data[4], valRefEq(g, vref_7, g.seq_delay_vref) ? !isVarFreeInExpr(v_3, e) : false) ? [0, expr_6.data[1], expr_6.data[4], expr_6.data[3].head.data[4], expr_6.data[2].head, expr_6.data[3].head.data[3].head, expr_6.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var8[0]) {
      case 0:
        return [$var8[3], $var8[4]];

      case 1:
        return null;
    }
  };

  const _SeqEmpty___ = function (expr_7) {
    var vref_8;
    const $var9 = expr_7.tag === 5 ? expr_7.data[0].tag === 1 ? expr_7.data[3].tail == null ? (vref_8 = expr_7.data[0].data[0], valRefEq(g, vref_8, g.seq_empty_vref)) ? [0, expr_7.data[1], expr_7.data[2], expr_7.data[4], expr_7.data[0].data[0]] : [1] : [1] : [1] : [1];

    switch ($var9[0]) {
      case 0:
        return $var9[3];

      case 1:
        return null;
    }
  };

  const _Seq___ = function (expr_8) {
    var vref_9;
    var elemTy_2;
    var e_1;
    const $var10 = expr_8.tag === 5 ? expr_8.data[0].tag === 1 ? expr_8.data[2].tail != null ? expr_8.data[2].tail.tail == null ? expr_8.data[3].tail != null ? expr_8.data[3].tail.tail == null ? (vref_9 = expr_8.data[0].data[0], elemTy_2 = expr_8.data[2].head, e_1 = expr_8.data[3].head, valRefEq(g, vref_9, g.seq_vref)) ? [0, expr_8.data[1], expr_8.data[4], expr_8.data[3].head, expr_8.data[2].head, expr_8.data[0].data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var10[0]) {
      case 0:
        return [$var10[3], $var10[4]];

      case 1:
        return null;
    }
  };

  const RepresentBindingAsStateMachineLocal = function (bind, res2, m) {
    const patternInput = bind.data[2].tag === 0 ? [new SequencePointInfoForSeq(0), bind.data[2].data] : [new SequencePointInfoForSeq(1), Expr_get_Range.bind(bind.data[1])()];
    const vref_10 = mkLocalValRef(bind.data[0]);

    const phase2 = function (ctxt) {
      const patternInput_1 = res2.phase2(ctxt);
      const generate = mkCompGenSequential(m, mkSequential(patternInput[0], m, mkValSet(patternInput[1], vref_10, bind.data[1]), patternInput_1[0]), mkValSet(m, vref_10, mkDefault(m, vref_10.Type)));
      return [generate, patternInput_1[1], patternInput_1[2]];
    };

    const stateVars = new List(vref_10, res2.stateVars);
    return new LoweredSeqFirstPhaseResult(phase2, res2.labels, res2.significantClose, stateVars);
  };

  const RepresentBindingsAsLifted = function (mkBinds, res2_1) {
    return new LoweredSeqFirstPhaseResult(function (ctxt_1) {
      const patternInput_2 = res2_1.phase2(ctxt_1);
      const generate_1 = mkBinds(patternInput_2[0]);
      return [generate_1, patternInput_2[1], patternInput_2[2]];
    }, res2_1.labels, res2_1.significantClose, res2_1.stateVars);
  };

  const Lower = function (isWholeExpr, isTailCall, noDisposeContinuationLabel, currentDisposeContinuationLabel, expr_9) {
    var phase2_1;
    var labels;
    var stateVars_1;
    var phase2_2;
    var labels_1;
    var stateVars_2;
    var phase2_3;
    var phase2_4;
    var labels_2;
    var phase2_5;
    var labels_3;
    var stateVars_3;
    var phase2_6;
    var phase2_7;
    var labels_4;
    var stateVars_5;

    Lower: while (true) {
      const activePatternResult45621 = _SeqYield___(expr_9);

      if (activePatternResult45621 != null) {
        const label = generateCodeLabel() | 0;
        return phase2_1 = function (tupledArg) {
          const generate_2 = mkCompGenSequential(getValue(activePatternResult45621)[1], mkValSet(getValue(activePatternResult45621)[1], tupledArg[0], mkInt32(g, getValue(activePatternResult45621)[1], tupledArg[3].get(label))), mkSequential(new SequencePointInfoForSeq(0), getValue(activePatternResult45621)[1], mkValSet(getValue(activePatternResult45621)[1], tupledArg[1], getValue(activePatternResult45621)[0]), mkCompGenSequential(getValue(activePatternResult45621)[1], new Expr(11, [new TOp(26), new List(), ofArray([mkOne(g, getValue(activePatternResult45621)[1])]), getValue(activePatternResult45621)[1]]), new Expr(11, [new TOp(28, label), new List(), new List(), getValue(activePatternResult45621)[1]]))));
          const dispose = mkCompGenSequential(getValue(activePatternResult45621)[1], new Expr(11, [new TOp(28, label), new List(), new List(), getValue(activePatternResult45621)[1]]), new Expr(11, [new TOp(27, currentDisposeContinuationLabel), new List(), new List(), getValue(activePatternResult45621)[1]]));
          const checkDispose = mkCompGenSequential(getValue(activePatternResult45621)[1], new Expr(11, [new TOp(28, label), new List(), new List(), getValue(activePatternResult45621)[1]]), new Expr(11, [new TOp(26), new List(), ofArray([mkBool(g, getValue(activePatternResult45621)[1], !(noDisposeContinuationLabel === currentDisposeContinuationLabel))]), getValue(activePatternResult45621)[1]]));
          return [generate_2, dispose, checkDispose];
        }, labels = ofArray([label]), stateVars_1 = new List(), new LoweredSeqFirstPhaseResult(phase2_1, labels, false, stateVars_1);
      } else {
        const activePatternResult45620 = _SeqDelay___(expr_9);

        if (activePatternResult45620 != null) {
          isWholeExpr = isWholeExpr;
          isTailCall = isTailCall;
          noDisposeContinuationLabel = noDisposeContinuationLabel;
          currentDisposeContinuationLabel = currentDisposeContinuationLabel;
          expr_9 = getValue(activePatternResult45620)[0];
          continue Lower;
        } else {
          const activePatternResult45619 = _SeqAppend___(expr_9);

          if (activePatternResult45619 != null) {
            const matchValue = [Lower(false, false, noDisposeContinuationLabel, currentDisposeContinuationLabel, getValue(activePatternResult45619)[0]), Lower(false, isTailCall, noDisposeContinuationLabel, currentDisposeContinuationLabel, getValue(activePatternResult45619)[1])];
            const $var11 = matchValue[0] != null ? matchValue[1] != null ? [0, getValue(matchValue[0]), getValue(matchValue[1])] : [1] : [1];

            switch ($var11[0]) {
              case 0:
                return phase2_2 = function (ctxt_2) {
                  const patternInput_3 = $var11[1].phase2(ctxt_2);
                  const patternInput_4 = $var11[2].phase2(ctxt_2);
                  const generate_3 = mkCompGenSequential(getValue(activePatternResult45619)[2], patternInput_3[0], patternInput_4[0]);
                  const dispose_1 = mkCompGenSequential(getValue(activePatternResult45619)[2], patternInput_4[1], patternInput_3[1]);
                  const checkDispose_1 = mkCompGenSequential(getValue(activePatternResult45619)[2], patternInput_4[2], patternInput_3[2]);
                  return [generate_3, dispose_1, checkDispose_1];
                }, labels_1 = append($var11[1].labels, $var11[2].labels), stateVars_2 = append($var11[1].stateVars, $var11[2].stateVars), new LoweredSeqFirstPhaseResult(phase2_2, labels_1, $var11[1].significantClose ? true : $var11[2].significantClose, stateVars_2);

              case 1:
                return null;
            }
          } else {
            const activePatternResult45618 = _SeqWhile___(expr_9);

            if (activePatternResult45618 != null) {
              const matchValue_1 = Lower(false, false, noDisposeContinuationLabel, currentDisposeContinuationLabel, getValue(activePatternResult45618)[1]);

              if (matchValue_1 != null) {
                return phase2_3 = function (ctxt_3) {
                  const patternInput_5 = getValue(matchValue_1).phase2(ctxt_3);
                  const generate_4 = mkWhile(g, new SequencePointInfoForWhileLoop(0, Expr_get_Range.bind(getValue(activePatternResult45618)[0])()), new SpecialWhileLoopMarker(0), getValue(activePatternResult45618)[0], patternInput_5[0], getValue(activePatternResult45618)[2]);
                  return [generate_4, patternInput_5[1], patternInput_5[2]];
                }, new LoweredSeqFirstPhaseResult(phase2_3, getValue(matchValue_1).labels, getValue(matchValue_1).significantClose, getValue(matchValue_1).stateVars);
              } else {
                return null;
              }
            } else {
              const activePatternResult45617 = _SeqUsing___(expr_9);

              if (activePatternResult45617 != null) {
                isWholeExpr = false;
                isTailCall = isTailCall;
                noDisposeContinuationLabel = noDisposeContinuationLabel;
                currentDisposeContinuationLabel = currentDisposeContinuationLabel;
                expr_9 = mkLet(new SequencePointInfoForBinding(0, Expr_get_Range.bind(getValue(activePatternResult45617)[2])()), getValue(activePatternResult45617)[4], getValue(activePatternResult45617)[1], getValue(activePatternResult45617)[0], mkCallSeqFinally(g, getValue(activePatternResult45617)[4], getValue(activePatternResult45617)[3], getValue(activePatternResult45617)[2], mkUnitDelayLambda(g, getValue(activePatternResult45617)[4], mkCallDispose(g, getValue(activePatternResult45617)[4], getValue(activePatternResult45617)[1].Type, exprForVal(getValue(activePatternResult45617)[4], getValue(activePatternResult45617)[1])))));
                continue Lower;
              } else {
                const activePatternResult45616 = _SeqFor___(expr_9);

                if (activePatternResult45616 != null) {
                  const inpElemTy = getValue(activePatternResult45616)[1].Type;
                  const inpEnumTy = mkIEnumeratorTy(g, inpElemTy);
                  const patternInput_6 = mkCompGenLocal(getValue(activePatternResult45616)[4], "enum", inpEnumTy);
                  isWholeExpr = false;
                  isTailCall = isTailCall;
                  noDisposeContinuationLabel = noDisposeContinuationLabel;
                  currentDisposeContinuationLabel = currentDisposeContinuationLabel;
                  expr_9 = mkCallSeqUsing(g, getValue(activePatternResult45616)[4], inpEnumTy, getValue(activePatternResult45616)[3], callNonOverloadedMethod(g, amap, getValue(activePatternResult45616)[4], "GetEnumerator", mkSeqTy(g, inpElemTy), ofArray([getValue(activePatternResult45616)[0]])), mkLambdaNoType(g, getValue(activePatternResult45616)[4], patternInput_6[0], mkCallSeqGenerated(g, getValue(activePatternResult45616)[4], getValue(activePatternResult45616)[3], mkUnitDelayLambda(g, getValue(activePatternResult45616)[4], callNonOverloadedMethod(g, amap, getValue(activePatternResult45616)[4], "MoveNext", inpEnumTy, ofArray([patternInput_6[1]]))), mkInvisibleLet(getValue(activePatternResult45616)[4], getValue(activePatternResult45616)[1], callNonOverloadedMethod(g, amap, getValue(activePatternResult45616)[4], "get_Current", inpEnumTy, ofArray([patternInput_6[1]])), getValue(activePatternResult45616)[2]))));
                  continue Lower;
                } else {
                  const activePatternResult45615 = _SeqTryFinally___(expr_9);

                  if (activePatternResult45615 != null) {
                    const innerDisposeContinuationLabel = generateCodeLabel() | 0;
                    const matchValue_2 = Lower(false, false, noDisposeContinuationLabel, innerDisposeContinuationLabel, getValue(activePatternResult45615)[0]);

                    if (matchValue_2 != null) {
                      return phase2_4 = function (_arg1) {
                        const patternInput_7 = getValue(matchValue_2).phase2(_arg1);
                        let generate_5;
                        const compensation_1 = copyExpr(g, new ValCopyFlag(1), getValue(activePatternResult45615)[1]);
                        generate_5 = mkCompGenSequential(getValue(activePatternResult45615)[2], mkCompGenSequential(getValue(activePatternResult45615)[2], mkValSet(getValue(activePatternResult45615)[2], _arg1[0], mkInt32(g, getValue(activePatternResult45615)[2], _arg1[3].get(innerDisposeContinuationLabel))), patternInput_7[0]), mkCompGenSequential(getValue(activePatternResult45615)[2], new Expr(11, [new TOp(28, innerDisposeContinuationLabel), new List(), new List(), getValue(activePatternResult45615)[2]]), mkCompGenSequential(getValue(activePatternResult45615)[2], mkValSet(getValue(activePatternResult45615)[2], _arg1[0], mkInt32(g, getValue(activePatternResult45615)[2], _arg1[3].get(currentDisposeContinuationLabel))), compensation_1)));
                        const dispose_2 = mkCompGenSequential(getValue(activePatternResult45615)[2], patternInput_7[1], mkCompGenSequential(getValue(activePatternResult45615)[2], new Expr(11, [new TOp(28, innerDisposeContinuationLabel), new List(), new List(), getValue(activePatternResult45615)[2]]), mkCompGenSequential(getValue(activePatternResult45615)[2], mkValSet(getValue(activePatternResult45615)[2], _arg1[0], mkInt32(g, getValue(activePatternResult45615)[2], _arg1[3].get(currentDisposeContinuationLabel))), mkCompGenSequential(getValue(activePatternResult45615)[2], getValue(activePatternResult45615)[1], new Expr(11, [new TOp(27, currentDisposeContinuationLabel), new List(), new List(), getValue(activePatternResult45615)[2]])))));
                        const checkDispose_2 = mkCompGenSequential(getValue(activePatternResult45615)[2], patternInput_7[2], mkCompGenSequential(getValue(activePatternResult45615)[2], new Expr(11, [new TOp(28, innerDisposeContinuationLabel), new List(), new List(), getValue(activePatternResult45615)[2]]), new Expr(11, [new TOp(26), new List(), ofArray([mkTrue(g, getValue(activePatternResult45615)[2])]), getValue(activePatternResult45615)[2]])));
                        return [generate_5, dispose_2, checkDispose_2];
                      }, labels_2 = new List(innerDisposeContinuationLabel, getValue(matchValue_2).labels), new LoweredSeqFirstPhaseResult(phase2_4, labels_2, true, getValue(matchValue_2).stateVars);
                    } else {
                      return null;
                    }
                  } else {
                    const activePatternResult45614 = _SeqEmpty___(expr_9);

                    if (activePatternResult45614 != null) {
                      return phase2_5 = function (_arg2) {
                        const generate_6 = mkUnit(g, getValue(activePatternResult45614));
                        const dispose_3 = new Expr(11, [new TOp(27, currentDisposeContinuationLabel), new List(), new List(), getValue(activePatternResult45614)]);
                        const checkDispose_3 = new Expr(11, [new TOp(27, currentDisposeContinuationLabel), new List(), new List(), getValue(activePatternResult45614)]);
                        return [generate_6, dispose_3, checkDispose_3];
                      }, labels_3 = new List(), stateVars_3 = new List(), new LoweredSeqFirstPhaseResult(phase2_5, labels_3, false, stateVars_3);
                    } else {
                      const $var12 = expr_9.tag === 2 ? expr_9.data[2].tag === 0 ? [0, expr_9.data[4], expr_9.data[3], expr_9.data[0], expr_9.data[1]] : [2] : expr_9.tag === 7 ? (expr_9.data[0].Var.IsCompiledAsTopLevel ? true : !IsGenericValWithGenericContraints(g, expr_9.data[0].Var)) ? [1, expr_9.data[0], expr_9.data[1], expr_9.data[2]] : [2] : [2];

                      switch ($var12[0]) {
                        case 0:
                          const matchValue_3 = Lower(false, isTailCall, noDisposeContinuationLabel, currentDisposeContinuationLabel, $var12[4]);

                          if (matchValue_3 == null) {
                            return null;
                          } else {
                            return new LoweredSeqFirstPhaseResult(function (ctxt_4) {
                              const patternInput_8 = getValue(matchValue_3).phase2(ctxt_4);
                              const generate_7 = new Expr(2, [$var12[3], patternInput_8[0], new SequentialOpKind(0), $var12[2], $var12[1]]);
                              return [generate_7, patternInput_8[1], patternInput_8[2]];
                            }, getValue(matchValue_3).labels, getValue(matchValue_3).significantClose, getValue(matchValue_3).stateVars);
                          }

                        case 1:
                          const matchValue_4 = Lower(false, isTailCall, noDisposeContinuationLabel, currentDisposeContinuationLabel, $var12[2]);

                          if (matchValue_4 == null) {
                            return null;
                          } else if ($var12[1].Var.IsCompiledAsTopLevel) {
                            return RepresentBindingsAsLifted(function (arg20_) {
                              return mkLetBind($var12[3], $var12[1], arg20_);
                            }, getValue(matchValue_4));
                          } else {
                            return RepresentBindingAsStateMachineLocal($var12[1], getValue(matchValue_4), $var12[3]);
                          }

                        case 2:
                          const $var13 = expr_9.tag === 9 ? expr_9.data[3].every(function (_arg3) {
                            return _arg3.data[0].tail == null;
                          }) ? [0, expr_9.data[1], expr_9.data[4], expr_9.data[2], expr_9.data[0], expr_9.data[3], expr_9.data[5]] : [1] : [1];

                          switch ($var13[0]) {
                            case 0:
                              const tgl = toList(map_1(function (_arg4) {
                                return Lower(false, isTailCall, noDisposeContinuationLabel, currentDisposeContinuationLabel, _arg4.data[1]);
                              }, $var13[5], Array));

                              if (forAll(function (option) {
                                return option != null;
                              }, tgl)) {
                                const tgl_1 = map(function (option_1) {
                                  return getValue(option_1);
                                }, tgl);
                                const labs = collect(function (res) {
                                  return res.labels;
                                }, tgl_1);
                                const stateVars_4 = collect(function (res_1) {
                                  return res_1.stateVars;
                                }, tgl_1);
                                const significantClose = exists(function (res_2) {
                                  return res_2.significantClose;
                                }, tgl_1);
                                return phase2_6 = function (ctxt_5) {
                                  const patternInput_10 = unzip3(toList(map2(function (_arg5, res_3) {
                                    const patternInput_9 = res_3.phase2(ctxt_5);
                                    const gtg = new DecisionTreeTarget(0, [_arg5.data[0], patternInput_9[0], _arg5.data[2]]);
                                    return [gtg, patternInput_9[1], patternInput_9[2]];
                                  }, toList($var13[5]), tgl_1)));
                                  const generate_8 = primMkMatch($var13[4], $var13[1], $var13[3], Array.from(patternInput_10[0]), $var13[2], $var13[6]);
                                  const dispose_4 = patternInput_10[1].tail == null ? mkUnit(g, $var13[2]) : reduce(function (arg10_, arg20__1) {
                                    return mkCompGenSequential($var13[2], arg10_, arg20__1);
                                  }, patternInput_10[1]);
                                  const checkDispose_4 = patternInput_10[2].tail == null ? mkFalse(g, $var13[2]) : reduce(function (arg10__1, arg20__2) {
                                    return mkCompGenSequential($var13[2], arg10__1, arg20__2);
                                  }, patternInput_10[2]);
                                  return [generate_8, dispose_4, checkDispose_4];
                                }, new LoweredSeqFirstPhaseResult(phase2_6, labs, significantClose, stateVars_4);
                              } else {
                                return null;
                              }

                            case 1:
                              const m_1 = Expr_get_Range.bind(expr_9)();

                              if (isWholeExpr) {
                                return null;
                              } else {
                                const tyConfirmsToSeq = function (g_1, ty) {
                                  if (isAppTy(g_1, ty)) {
                                    return tyconRefEq(g_1, tcrefOfAppTy(g_1, ty), g_1.tcref_System_Collections_Generic_IEnumerable);
                                  } else {
                                    return false;
                                  }
                                };

                                const matchValue_5 = SearchEntireHierarchyOfType(CurriedLambda(tyConfirmsToSeq)(g), g, amap, m_1, tyOfExpr(g, expr_9));

                                if (matchValue_5 != null) {
                                  const inpElemTy_1 = argsOfAppTy(g, getValue(matchValue_5)).head;

                                  if (isTailCall) {
                                    const label_1 = generateCodeLabel() | 0;
                                    return phase2_7 = function (tupledArg_1) {
                                      const generate_9 = mkCompGenSequential(m_1, mkValSet(m_1, tupledArg_1[0], mkInt32(g, m_1, tupledArg_1[3].get(label_1))), mkSequential(new SequencePointInfoForSeq(0), m_1, mkAddrSet(m_1, tupledArg_1[2], expr_9), mkCompGenSequential(m_1, new Expr(11, [new TOp(26), new List(), ofArray([mkTwo(g, m_1)]), m_1]), new Expr(11, [new TOp(28, label_1), new List(), new List(), m_1]))));
                                      const dispose_5 = mkCompGenSequential(m_1, new Expr(11, [new TOp(28, label_1), new List(), new List(), m_1]), new Expr(11, [new TOp(27, currentDisposeContinuationLabel), new List(), new List(), m_1]));
                                      const checkDispose_5 = mkCompGenSequential(m_1, new Expr(11, [new TOp(28, label_1), new List(), new List(), m_1]), new Expr(11, [new TOp(26), new List(), ofArray([mkFalse(g, m_1)]), m_1]));
                                      return [generate_9, dispose_5, checkDispose_5];
                                    }, labels_4 = ofArray([label_1]), stateVars_5 = new List(), new LoweredSeqFirstPhaseResult(phase2_7, labels_4, false, stateVars_5);
                                  } else {
                                    const patternInput_11 = mkCompGenLocal(m_1, "v", inpElemTy_1);
                                    isWholeExpr = false;
                                    isTailCall = isTailCall;
                                    noDisposeContinuationLabel = noDisposeContinuationLabel;
                                    currentDisposeContinuationLabel = currentDisposeContinuationLabel;
                                    expr_9 = mkCallSeqCollect(g, m_1, inpElemTy_1, inpElemTy_1, mkLambdaNoType(g, m_1, patternInput_11[0], mkCallSeqSingleton(g, m_1, inpElemTy_1, patternInput_11[1])), expr_9);
                                    continue Lower;
                                  }
                                } else {
                                  return null;
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
        }
      }
    }
  };

  const activePatternResult45638 = _Seq___(overallExpr);

  if (activePatternResult45638 != null) {
    const m_2 = Expr_get_Range.bind(getValue(activePatternResult45638)[0])();
    const initLabel = generateCodeLabel() | 0;
    const noDisposeContinuationLabel_1 = generateCodeLabel() | 0;
    const matchValue_6 = Lower(true, true, noDisposeContinuationLabel_1, noDisposeContinuationLabel_1, getValue(activePatternResult45638)[0]);

    if (matchValue_6 == null) {
      return null;
    } else {
      const patternInput_12 = mkMutableCompGenLocal(m_2, "pc", g.int32_ty);
      const patternInput_13 = mkMutableCompGenLocal(m_2, "current", getValue(activePatternResult45638)[1]);
      const patternInput_14 = mkMutableCompGenLocal(m_2, "next", mkByrefTy(g, mkSeqTy(g, getValue(activePatternResult45638)[1])));
      const nextvref = mkLocalValRef(patternInput_14[0]);
      const pcvref = mkLocalValRef(patternInput_12[0]);
      const currvref = mkLocalValRef(patternInput_13[0]);
      const pcs = mapIndexed(function (i, _arg6) {
        return i + 1;
      }, getValue(matchValue_6).labels);
      const pcDone = getValue(matchValue_6).labels.length + 1 | 0;
      const pc2lab = create(ofArray([[0, initLabel], [pcDone, noDisposeContinuationLabel_1]], toList(zip(pcs, getValue(matchValue_6).labels))), new Comparer(comparePrimitives));
      const lab2pc = create(ofArray([[initLabel, 0], [noDisposeContinuationLabel_1, pcDone]], toList(zip(getValue(matchValue_6).labels, pcs))), new Comparer(comparePrimitives));
      const patternInput_15 = getValue(matchValue_6).phase2([pcvref, currvref, nextvref, lab2pc]);
      const stateMachineExpr = mkCompGenSequential(m_2, patternInput_15[0], mkCompGenSequential(m_2, mkValSet(m_2, pcvref, mkInt32(g, m_2, pcDone)), mkCompGenSequential(m_2, new Expr(11, [new TOp(28, noDisposeContinuationLabel_1), new List(), new List(), m_2]), mkCompGenSequential(m_2, mkValSet(m_2, currvref, mkDefault(m_2, currvref.Type)), new Expr(11, [new TOp(26), new List(), ofArray([mkZero(g, m_2)]), m_2])))));
      const checkDisposeExpr = mkCompGenSequential(m_2, patternInput_15[2], mkCompGenSequential(m_2, new Expr(11, [new TOp(28, noDisposeContinuationLabel_1), new List(), new List(), m_2]), new Expr(11, [new TOp(26), new List(), ofArray([mkFalse(g, m_2)]), m_2])));

      const addJumpTable = function (isDisposal, expr_10) {
        const mbuilder = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m_2);

        const mkGotoLabelTarget = function (lab) {
          return mbuilder.AddResultTarget(new Expr(11, [new TOp(27, lab), new List(), new List(), m_2]), new SequencePointInfoForTarget(1));
        };

        const dtree = new DecisionTree(0, [patternInput_12[1], toList(delay(function () {
          return append_1(isDisposal ? singleton(mkCase(new DecisionTreeTest(2, new Const(5, 0)), mkGotoLabelTarget(noDisposeContinuationLabel_1))) : empty(), delay(function () {
            return append_1(map_2(function (pc) {
              return mkCase(new DecisionTreeTest(2, new Const(5, pc)), mkGotoLabelTarget(pc2lab.get(pc)));
            }, pcs), delay(function () {
              return singleton(mkCase(new DecisionTreeTest(2, new Const(5, pcDone)), mkGotoLabelTarget(noDisposeContinuationLabel_1)));
            }));
          }));
        })), mkGotoLabelTarget(pc2lab.get(0)), m_2]);
        const table = mbuilder.Close(dtree, m_2, g.int_ty);
        return mkCompGenSequential(m_2, table, mkCompGenSequential(m_2, new Expr(11, [new TOp(28, initLabel), new List(), new List(), m_2]), expr_10));
      };

      const handleExeceptionsInDispose = function (disposalExpr) {
        const patternInput_16 = mkMutableCompGenLocal(m_2, "exn", g.exn_ty);
        const exnVref = mkLocalValRef(patternInput_16[0]);
        const startLabel = generateCodeLabel() | 0;
        const doneLabel = generateCodeLabel() | 0;
        const patternInput_17 = mkLocal(m_2, "e", g.exn_ty);
        const patternInput_18 = mkLocal(m_2, "ef", g.exn_ty);
        const assignToExn = new Expr(11, [new TOp(30, [new LValueOperation(2), exnVref]), new List(), ofArray([patternInput_17[1]]), m_2]);
        const exceptionCatcher = mkTryWith(g, disposalExpr, patternInput_18[0], new Expr(0, [new Const(0, true), m_2, g.bool_ty]), patternInput_17[0], assignToExn, m_2, g.unit_ty, new SequencePointInfoForTry(2), new SequencePointInfoForWith(1));
        let whileLoop;
        const mbuilder_1 = MatchBuilder[".ctor"](new SequencePointInfoForBinding(4), m_2);

        const addResultTarget = function (e_2) {
          return mbuilder_1.AddResultTarget(e_2, new SequencePointInfoForTarget(1));
        };

        const dtree_1 = new DecisionTree(0, [patternInput_12[1], ofArray([mkCase(new DecisionTreeTest(2, new Const(5, pcDone)), addResultTarget(new Expr(11, [new TOp(27, doneLabel), new List(), new List(), m_2])))]), addResultTarget(mkUnit(g, m_2)), m_2]);
        const pcIsEndStateComparison = mbuilder_1.Close(dtree_1, m_2, g.unit_ty);
        whileLoop = mkCompGenSequential(m_2, new Expr(11, [new TOp(28, startLabel), new List(), new List(), m_2]), mkCompGenSequential(m_2, pcIsEndStateComparison, mkCompGenSequential(m_2, exceptionCatcher, mkCompGenSequential(m_2, new Expr(11, [new TOp(27, startLabel), new List(), new List(), m_2]), new Expr(11, [new TOp(28, doneLabel), new List(), new List(), m_2])))));
        const doRaise = mkNonNullCond(g, m_2, g.unit_ty, patternInput_16[1], mkThrow(m_2, g.unit_ty, patternInput_16[1]), new Expr(0, [new Const(16), m_2, g.unit_ty]));
        return mkLet(new SequencePointInfoForBinding(2), m_2, patternInput_16[0], new Expr(0, [new Const(17), m_2, g.exn_ty]), mkCompGenSequential(m_2, whileLoop, doRaise));
      };

      const stateMachineExprWithJumpTable = addJumpTable(false, stateMachineExpr);
      let disposalExpr_2;

      if (getValue(matchValue_6).significantClose) {
        const disposalExpr_1 = mkCompGenSequential(m_2, patternInput_15[1], mkCompGenSequential(m_2, new Expr(11, [new TOp(28, noDisposeContinuationLabel_1), new List(), new List(), m_2]), mkCompGenSequential(m_2, mkValSet(m_2, pcvref, mkInt32(g, m_2, pcDone)), mkValSet(m_2, currvref, mkDefault(m_2, currvref.Type)))));
        disposalExpr_2 = handleExeceptionsInDispose(CurriedLambda(addJumpTable)(true)(disposalExpr_1));
      } else {
        disposalExpr_2 = mkValSet(m_2, pcvref, mkInt32(g, m_2, pcDone));
      }

      const checkDisposeExprWithJumpTable = addJumpTable(true, checkDisposeExpr);
      return [nextvref, pcvref, currvref, getValue(matchValue_6).stateVars, stateMachineExprWithJumpTable, disposalExpr_2, checkDisposeExprWithJumpTable, getValue(activePatternResult45638)[1], m_2];
    }
  } else {
    return null;
  }
}