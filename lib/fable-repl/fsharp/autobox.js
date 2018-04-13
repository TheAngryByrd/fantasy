import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { TcGlobals } from "./TcGlobals";
import { ImportMap } from "./import";
import { equalsRecords } from "../fable-core/Util";
import { singleton, collect, delay, toList, fold, exists } from "../fable-core/Seq";
import CurriedLambda from "../fable-core/CurriedLambda";
import { Binding, $7C$ValDeref$7C$ as _ValDeref_, ValReprInfoModule, ValReprInfo, valEq } from "./tast";
import { ExprRewritingEnv, RewriteImplFile, mkLocal, mkCompGenLocal, mkRefCellTy, ValMap, mkRefCell, Expr$2E$get_Range as Expr_get_Range, mkRefCellContentsRef, mkRecdFieldGetAddrViaExprAddr, mkRefCellSet, mkRefCellGet, emptyFreeLocals, FoldImplFile, ExprFolder, ExprFolder0, tryMkForallTy, mkMultiLambdaTy, CollectLocals, freeInExpr } from "./TastOps";
import { ZsetModule } from "../absil/zset";
import { destTopLambda } from "./TypeRelations";
import { map, ofArray, concat } from "../fable-core/List";
import List from "../fable-core/List";
import { makeSome, getValue, defaultArg } from "../fable-core/Option";
import { Error as _Error, warning } from "./ErrorLogger";
import { SR } from "../codegen/FSComp";
export class cenv {
  constructor(g, amap) {
    this.g = g;
    this.amap = amap;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AutoBox.cenv",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        g: TcGlobals,
        amap: ImportMap
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Microsoft.FSharp.Compiler.AutoBox.cenv", cenv);
export function DecideEscapes(syntacticArgs, body) {
  const cantBeFree = function (v) {
    const passedIn = exists(CurriedLambda(function (lv1, lv2) {
      return valEq(lv1, lv2);
    })(v), syntacticArgs);

    if (!passedIn) {
      if (v.IsMutable) {
        return CurriedLambda(() => v.ValReprInfo == null)();
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const frees = freeInExpr(CollectLocals, body);
  return function (arg10_) {
    return ZsetModule.filter(cantBeFree, arg10_);
  }(frees.FreeLocals);
}
export function DecideLambda(exprF, cenv_1, topValInfo, expr, ety, z) {
  const $var1 = expr.tag === 3 ? [0] : expr.tag === 4 ? [0] : [1];

  switch ($var1[0]) {
    case 0:
      const patternInput = destTopLambda(cenv_1.g, cenv_1.amap, topValInfo, expr, ety);

      const snoc = function (x, y) {
        return new List(y, x);
      };

      const args = concat(patternInput[3]);
      const args_1 = fold(snoc, args, defaultArg(patternInput[2], [], $var2 => [$var2]));
      const syntacticArgs = fold(snoc, args_1, defaultArg(patternInput[1], [], $var3 => [$var3]));
      const z_1 = ZsetModule.union(z, DecideEscapes(syntacticArgs, patternInput[4]));
      const z_2 = exprF == null ? z_1 : getValue(exprF)(z_1, patternInput[4]);
      return z_2;

    case 1:
      return z;
  }
}
export function DecideExprOp(exprF, z, op, tyargs, args) {
  const matchValue = [op, tyargs, args];
  const $var4 = matchValue[0].tag === 6 ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail == null ? [0, matchValue[2].head.data[4], matchValue[2].tail.head.data[4]] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : matchValue[0].tag === 9 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail == null ? [1, matchValue[2].head.data[4], matchValue[2].tail.head.data[4]] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : matchValue[0].tag === 7 ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail != null ? matchValue[2].tail.tail.head.tag === 3 ? matchValue[2].tail.tail.head.data[3].tail != null ? matchValue[2].tail.tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail.tail == null ? [2, matchValue[2].head.data[4], matchValue[2].tail.head.data[4], matchValue[2].tail.tail.head.data[4]] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : matchValue[0].tag === 8 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? matchValue[2].tail != null ? matchValue[2].head.tag === 3 ? matchValue[2].head.data[3].tail != null ? matchValue[2].head.data[3].tail.tail == null ? matchValue[2].tail.tail != null ? matchValue[2].tail.head.tag === 3 ? matchValue[2].tail.head.data[3].tail != null ? matchValue[2].tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail != null ? matchValue[2].tail.tail.head.tag === 3 ? matchValue[2].tail.tail.head.data[3].tail != null ? matchValue[2].tail.tail.head.data[3].tail.tail == null ? matchValue[2].tail.tail.tail.tail == null ? [3, matchValue[2].tail.head.data[4], matchValue[2].head.data[4], matchValue[2].tail.tail.head.data[4]] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4] : [4];

  switch ($var4[0]) {
    case 0:
      return makeSome(exprF(exprF(z, $var4[1]), $var4[2]));

    case 1:
      return makeSome(exprF(exprF(z, $var4[1]), $var4[2]));

    case 2:
      return makeSome(exprF(exprF(exprF(z, $var4[1]), $var4[2]), $var4[3]));

    case 3:
      return makeSome(exprF(exprF(exprF(z, $var4[2]), $var4[1]), $var4[3]));

    case 4:
      return null;
  }
}
export function DecideExpr(cenv_1, exprF, z, expr) {
  switch (expr.tag) {
    case 3:
      const topValInfo = new ValReprInfo(0, [new List(), ofArray([map(function (_arg1) {
        return ValReprInfoModule.unnamedTopArg1;
      }, expr.data[3])]), ValReprInfoModule.unnamedRetVal]);
      const ty = mkMultiLambdaTy(expr.data[5], expr.data[3], expr.data[6]);
      const z_1 = DecideLambda(exprF, cenv_1, topValInfo, expr, ty, z);
      return z_1;

    case 4:
      const topValInfo_1 = new ValReprInfo(0, [ValReprInfoModule.InferTyparInfo(expr.data[1]), new List(), ValReprInfoModule.unnamedRetVal]);
      const ty_1 = tryMkForallTy(expr.data[1], expr.data[4]);
      const z_2 = DecideLambda(exprF, cenv_1, topValInfo_1, expr, ty_1, z);
      return z_2;

    case 8:
      const CheckMethod = function (z_3, _arg1_1) {
        const vs = concat(_arg1_1.data[3]);
        const syntacticArgs = expr.data[2] == null ? vs : new List(getValue(expr.data[2]), vs);
        const z_4 = ZsetModule.union(z_3, DecideEscapes(syntacticArgs, _arg1_1.data[4]));
        return exprF(z_4, _arg1_1.data[4]);
      };

      const CheckMethods = function (z_5, l) {
        return function (state, list) {
          return fold(CheckMethod, state, list);
        }(z_5, l);
      };

      const CheckInterfaceImpl = function (z_6, tupledArg) {
        return CheckMethods(z_6, tupledArg[1]);
      };

      const z_7 = exprF(z, expr.data[3]);
      const z_8 = CheckMethods(z_7, expr.data[4]);
      const z_9 = fold(CheckInterfaceImpl, z_8, expr.data[5]);
      return z_9;

    case 11:
      return DecideExprOp(exprF, z, expr.data[0], expr.data[1], expr.data[2]);

    default:
      return null;
  }
}
export function DecideBinding(cenv_1, z, _arg1) {
  let topValInfo;
  const matchValue = _arg1.Var.ValReprInfo;

  if (matchValue != null) {
    topValInfo = getValue(matchValue);
  } else {
    topValInfo = ValReprInfoModule.emptyValData;
  }

  return DecideLambda(null, cenv_1, topValInfo, _arg1.data[1], _arg1.data[0].Type, z);
}
export function DecideBindings(cenv_1, z, binds) {
  return fold(function (z_1, arg20_) {
    return DecideBinding(cenv_1, z_1, arg20_);
  }, z, binds);
}
export function DecideImplFile(g, amap, implFile) {
  const cenv_1 = new cenv(g, amap);
  let folder;
  const inputRecord = ExprFolder0();

  const nonRecBindingsIntercept = function (z, arg20_) {
    return DecideBinding(cenv_1, z, arg20_);
  };

  const recBindingsIntercept = function (z_1, binds) {
    return DecideBindings(cenv_1, z_1, binds);
  };

  folder = new ExprFolder(function (exprF, z_2, expr) {
    return DecideExpr(cenv_1, exprF, z_2, expr);
  }, inputRecord.valBindingSiteIntercept, nonRecBindingsIntercept, recBindingsIntercept, inputRecord.dtreeIntercept, inputRecord.targetIntercept, inputRecord.tmethodIntercept);
  const z_3 = FoldImplFile(folder)(emptyFreeLocals, implFile);
  return z_3;
}
export function TransformExpr(g, nvs, exprF, expr) {
  var arg_1;
  let $var5;

  if (expr.tag === 1) {
    const activePatternResult45694 = _ValDeref_(expr.data[0]);

    if (nvs.ContainsVal(activePatternResult45694)) {
      $var5 = [0, expr.data[2], activePatternResult45694];
    } else {
      $var5 = [1];
    }
  } else {
    $var5 = [1];
  }

  switch ($var5[0]) {
    case 0:
      const patternInput = nvs.get_Item($var5[2]);
      return mkRefCellGet(g, $var5[1], $var5[2].Type, patternInput[1]);

    case 1:
      let $var6;

      if (expr.tag === 11) {
        if (expr.data[0].tag === 30) {
          if (expr.data[0].data[0].tag === 2) {
            const activePatternResult45693 = _ValDeref_(expr.data[0].data[1]);

            if (expr.data[1].tail == null) {
              if (expr.data[2].tail != null) {
                if (expr.data[2].tail.tail == null) {
                  if (arg_1 = expr.data[2].head, nvs.ContainsVal(activePatternResult45693)) {
                    $var6 = [0, expr.data[2].head, expr.data[3], activePatternResult45693];
                  } else {
                    $var6 = [1];
                  }
                } else {
                  $var6 = [1];
                }
              } else {
                $var6 = [1];
              }
            } else {
              $var6 = [1];
            }
          } else {
            $var6 = [1];
          }
        } else {
          $var6 = [1];
        }
      } else {
        $var6 = [1];
      }

      switch ($var6[0]) {
        case 0:
          const patternInput_1 = nvs.get_Item($var6[3]);
          const arg = exprF($var6[1]);
          return mkRefCellSet(g, $var6[2], $var6[3].Type, patternInput_1[1], arg);

        case 1:
          let $var7;

          if (expr.tag === 11) {
            if (expr.data[0].tag === 30) {
              if (expr.data[0].data[0].tag === 0) {
                const activePatternResult45692 = _ValDeref_(expr.data[0].data[1]);

                if (expr.data[1].tail == null) {
                  if (expr.data[2].tail == null) {
                    if (nvs.ContainsVal(activePatternResult45692)) {
                      $var7 = [0, expr.data[3], activePatternResult45692];
                    } else {
                      $var7 = [1];
                    }
                  } else {
                    $var7 = [1];
                  }
                } else {
                  $var7 = [1];
                }
              } else {
                $var7 = [1];
              }
            } else {
              $var7 = [1];
            }
          } else {
            $var7 = [1];
          }

          switch ($var7[0]) {
            case 0:
              const patternInput_2 = nvs.get_Item($var7[2]);
              return mkRecdFieldGetAddrViaExprAddr(patternInput_2[1], mkRefCellContentsRef(g), ofArray([$var7[2].Type]), $var7[1]);

            case 1:
              return null;
          }

      }

  }
}
export function TransformBinding(g, nvs, exprF, _arg1) {
  if (nvs.ContainsVal(_arg1.data[0])) {
    const patternInput = nvs.get_Item(_arg1.data[0]);
    const exprRange = Expr_get_Range.bind(_arg1.data[1])();
    const expr = exprF(_arg1.data[1]);
    return new Binding(0, [patternInput[0], mkRefCell(g, exprRange, _arg1.data[0].Type, expr), _arg1.data[2]]);
  } else {
    return null;
  }
}
export function TransformImplFile(g, amap, implFile) {
  var PreIntercept;
  var PreInterceptBinding;
  const fvs = DecideImplFile(g, amap, implFile);

  if (ZsetModule.isEmpty(fvs)) {
    return implFile;
  } else {
    for (let fv of fvs) {
      warning(new _Error(SR.abImplicitHeapAllocation(fv.DisplayName), fv.Range));
    }

    const nvs = ValMap.OfList(toList(delay(function () {
      return collect(function (fv_1) {
        const nty = mkRefCellTy(g, fv_1.Type);
        const patternInput = fv_1.IsCompilerGenerated ? mkCompGenLocal(fv_1.Range, fv_1.LogicalName, nty) : mkLocal(fv_1.Range, fv_1.LogicalName, nty);
        return singleton([fv_1, [patternInput[0], patternInput[1]]]);
      }, fvs);
    })));
    return RewriteImplFile((PreIntercept = function (exprF, expr) {
      return TransformExpr(g, nvs, exprF, expr);
    }, PreInterceptBinding = function (exprF_1, arg30_) {
      return TransformBinding(g, nvs, exprF_1, arg30_);
    }, new ExprRewritingEnv(PreIntercept, function (_arg1) {
      return null;
    }, PreInterceptBinding, false)), implFile);
  }
}