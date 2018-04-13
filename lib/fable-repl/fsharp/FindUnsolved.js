import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { makeGeneric, comparePrimitives } from "../fable-core/Util";
import { TcGlobals } from "./TcGlobals";
import { ImportMap } from "./import";
import { abstractSlotValsOfTycons, tryMkForallTy, mkMultiLambdaTy, stripExpr, tryNormalizeMeasureInType, CollectTyparsNoCaching, freeInType, DisplayEnv } from "./TastOps";
import { reverse, map, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { ValReprInfoModule, ValReprInfo, TyparRigidity, Typar } from "./tast";
import { ZsetModule } from "../absil/zset";
import { iterate } from "../fable-core/Seq";
import { List as List_1 } from "../absil/illib";
import { getValue, defaultArg } from "../fable-core/Option";
import { destTopLambda } from "./TypeRelations";
export class env {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.FindUnsolved.env",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Nix"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.FindUnsolved.env", env);
export class cenv {
  constructor(g, amap, denv, unsolved) {
    this.g = g;
    this.amap = amap;
    this.denv = denv;
    this.unsolved = unsolved;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.FindUnsolved.cenv",
      interfaces: ["FSharpRecord"],
      properties: {
        g: TcGlobals,
        amap: ImportMap,
        denv: DisplayEnv,
        unsolved: makeGeneric(List, {
          T: Typar
        })
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.FindUnsolved.cenv", cenv);
export function accTy(cenv_1, _env, ty) {
  ZsetModule.iter(function (tp) {
    if (!tp.Rigidity.Equals(new TyparRigidity(0))) {
      cenv_1.unsolved = new List(tp, cenv_1.unsolved);
    }
  }, freeInType(CollectTyparsNoCaching, tryNormalizeMeasureInType(cenv_1.g, ty)).FreeTypars);
}
export function accTypeInst(cenv_1, env_1, tyargs) {
  iterate(function (ty) {
    accTy(cenv_1, env_1, ty);
  }, tyargs);
}
export function accExpr(cenv_1, env_1, expr) {
  const expr_1 = stripExpr(expr);

  switch (expr_1.tag) {
    case 7:
      accBind(cenv_1, env_1, expr_1.data[0]);
      accExpr(cenv_1, env_1, expr_1.data[1]);
      break;

    case 0:
      accTy(cenv_1, env_1, expr_1.data[2]);
      break;

    case 1:
      break;

    case 12:
      accExpr(cenv_1, env_1, expr_1.data[0]);
      accTy(cenv_1, env_1, expr_1.data[4]);
      break;

    case 8:
      accTy(cenv_1, env_1, expr_1.data[1]);
      accExpr(cenv_1, env_1, expr_1.data[3]);
      accMethods(cenv_1, env_1, expr_1.data[2], expr_1.data[4]);
      accIntfImpls(cenv_1, env_1, expr_1.data[2], expr_1.data[5]);
      break;

    case 11:
      accOp(cenv_1, env_1, expr_1.data[0], expr_1.data[1], expr_1.data[2], expr_1.data[3]);
      break;

    case 5:
      accTy(cenv_1, env_1, expr_1.data[1]);
      accTypeInst(cenv_1, env_1, expr_1.data[2]);
      accExpr(cenv_1, env_1, expr_1.data[0]);
      accExprs(cenv_1, env_1, expr_1.data[3]);
      break;

    case 3:
      const topValInfo = new ValReprInfo(0, [new List(), ofArray([map(function (_arg1) {
        return ValReprInfoModule.unnamedTopArg1;
      }, expr_1.data[3])]), ValReprInfoModule.unnamedRetVal]);
      const ty = mkMultiLambdaTy(expr_1.data[5], expr_1.data[3], expr_1.data[6]);
      accLambdas(cenv_1, env_1, topValInfo, expr_1, ty);
      break;

    case 4:
      const topValInfo_1 = new ValReprInfo(0, [ValReprInfoModule.InferTyparInfo(expr_1.data[1]), new List(), ValReprInfoModule.unnamedRetVal]);
      accTy(cenv_1, env_1, expr_1.data[4]);
      const ty_1 = tryMkForallTy(expr_1.data[1], expr_1.data[4]);
      accLambdas(cenv_1, env_1, topValInfo_1, expr_1, ty_1);
      break;

    case 13:
      accExpr(cenv_1, env_1, expr_1.data[1]);
      break;

    case 9:
      accTy(cenv_1, env_1, expr_1.data[5]);
      accDTree(cenv_1, env_1, expr_1.data[2]);
      accTargets(cenv_1, env_1, expr_1.data[4], expr_1.data[5], expr_1.data[3]);
      break;

    case 6:
      accBinds(cenv_1, env_1, expr_1.data[0]);
      accExpr(cenv_1, env_1, expr_1.data[1]);
      break;

    case 10:
      accExpr(cenv_1, env_1, expr_1.data[1]);
      accExpr(cenv_1, env_1, expr_1.data[2]);
      iterate(function (_arg5) {
        if (_arg5.tag === 1) {
          accTy(cenv_1, env_1, _arg5.data);
        } else {
          accTy(cenv_1, env_1, _arg5.data[0]);
          accTy(cenv_1, env_1, _arg5.data[1]);
        }
      }, expr_1.data[0]);
      break;

    case 14:
      throw new Error("Unexpected reclink");
      break;

    default:
      accExpr(cenv_1, env_1, expr_1.data[0]);
      accExpr(cenv_1, env_1, expr_1.data[1]);
  }
}
export function accMethods(cenv_1, env_1, baseValOpt, l) {
  iterate(function (arg30_) {
    accMethod(cenv_1, env_1, baseValOpt, arg30_);
  }, l);
}
export function accMethod(cenv_1, env_1, _baseValOpt, _arg1) {
  List_1.iterSquared(function (v) {
    accVal(cenv_1, env_1, v);
  }, _arg1.data[3]);
  accExpr(cenv_1, env_1, _arg1.data[4]);
}
export function accIntfImpls(cenv_1, env_1, baseValOpt, l) {
  iterate(function (tupledArg) {
    accIntfImpl(cenv_1, env_1, baseValOpt, tupledArg[0], tupledArg[1]);
  }, l);
}
export function accIntfImpl(cenv_1, env_1, baseValOpt, ty, overrides) {
  accTy(cenv_1, env_1, ty);
  accMethods(cenv_1, env_1, baseValOpt, overrides);
}
export function accOp(cenv_1, env_1, op, tyargs, args, _m) {
  accTypeInst(cenv_1, env_1, tyargs);
  accExprs(cenv_1, env_1, args);

  if (op.tag === 31) {
    accTypeInst(cenv_1, env_1, op.data[8]);
    accTypeInst(cenv_1, env_1, op.data[9]);
    accTypeInst(cenv_1, env_1, op.data[10]);
  } else if (op.tag === 29) {
    const tys = op.data.data[0];
    const rty = op.data.data[4];
    const argtys = op.data.data[3];
    const _sln = op.data.data[5];
    const _nm = op.data.data[1];

    (function (tyargs_1) {
      accTypeInst(cenv_1, env_1, tyargs_1);
    })(argtys);

    iterate(function (ty) {
      accTy(cenv_1, env_1, ty);
    }, defaultArg(rty, [], $var1 => [$var1]));
    iterate(function (ty_1) {
      accTy(cenv_1, env_1, ty_1);
    }, tys);
  } else if (op.tag === 22) {
    accTypeInst(cenv_1, env_1, op.data[1]);
  }
}
export function accLambdas(cenv_1, env_1, topValInfo, e, ety) {
  const $var2 = e.tag === 13 ? [0] : e.tag === 3 ? [1] : e.tag === 4 ? [1] : [2];

  switch ($var2[0]) {
    case 0:
      accLambdas(cenv_1, env_1, topValInfo, e.data[1], ety);
      break;

    case 1:
      const patternInput = destTopLambda(cenv_1.g, cenv_1.amap, topValInfo, e, ety);
      accTy(cenv_1, env_1, patternInput[5]);
      List_1.iterSquared(function (v) {
        accVal(cenv_1, env_1, v);
      }, patternInput[3]);
      iterate(function (v_1) {
        accVal(cenv_1, env_1, v_1);
      }, defaultArg(patternInput[2], [], $var3 => [$var3]));
      iterate(function (v_2) {
        accVal(cenv_1, env_1, v_2);
      }, defaultArg(patternInput[1], [], $var4 => [$var4]));
      accExpr(cenv_1, env_1, patternInput[4]);
      break;

    case 2:
      accExpr(cenv_1, env_1, e);
      break;
  }
}
export function accExprs(cenv_1, env_1, exprs) {
  iterate(function (expr) {
    accExpr(cenv_1, env_1, expr);
  }, exprs);
}
export function accTargets(cenv_1, env_1, m, ty, targets) {
  targets.forEach(function (arg40_) {
    accTarget(cenv_1, env_1, m, ty, arg40_);
  });
}
export function accTarget(cenv_1, env_1, _m, _ty, _arg2) {
  accExpr(cenv_1, env_1, _arg2.data[1]);
}
export function accDTree(cenv_1, env_1, x) {
  if (x.tag === 2) {
    accBind(cenv_1, env_1, x.data[0]);
    accDTree(cenv_1, env_1, x.data[1]);
  } else if (x.tag === 0) {
    accSwitch(cenv_1, env_1, x.data[0], x.data[1], x.data[2], x.data[3]);
  } else {
    accExprs(cenv_1, env_1, x.data[0]);
  }
}
export function accSwitch(cenv_1, env_1, e, cases, dflt, _m) {
  accExpr(cenv_1, env_1, e);
  iterate(function (_arg2) {
    accDiscrim(cenv_1, env_1, _arg2.data[0]);
    accDTree(cenv_1, env_1, _arg2.data[1]);
  }, cases);
  iterate(function (x) {
    accDTree(cenv_1, env_1, x);
  }, defaultArg(dflt, [], $var5 => [$var5]));
}
export function accDiscrim(cenv_1, env_1, d) {
  switch (d.tag) {
    case 1:
      accTy(cenv_1, env_1, d.data[1]);
      break;

    case 2:
    case 3:
      break;

    case 4:
      accTy(cenv_1, env_1, d.data[0]);
      accTy(cenv_1, env_1, d.data[1]);
      break;

    case 5:
      accExpr(cenv_1, env_1, d.data[0]);
      accTypeInst(cenv_1, env_1, d.data[1]);
      break;

    default:
      accTypeInst(cenv_1, env_1, d.data[1]);
  }
}
export function accAttrib(cenv_1, env_1, _arg3) {
  iterate(function (_arg3_1) {
    accExpr(cenv_1, env_1, _arg3_1.data[0]);
    accExpr(cenv_1, env_1, _arg3_1.data[1]);
  }, _arg3.data[2]);
  iterate(function (_arg4) {
    const ty = _arg4.data[1];
    const expr2 = _arg4.data[3].data[1];
    const expr = _arg4.data[3].data[0];
    const _nm = _arg4.data[0];
    const _flg = _arg4.data[2];
    accExpr(cenv_1, env_1, expr);
    accExpr(cenv_1, env_1, expr2);
    accTy(cenv_1, env_1, ty);
  }, _arg3.data[3]);
}
export function accAttribs(cenv_1, env_1, attribs) {
  iterate(function (arg20_) {
    accAttrib(cenv_1, env_1, arg20_);
  }, attribs);
}
export function accValReprInfo(cenv_1, env_1, _arg4) {
  List_1.iterSquared(function (argInfo) {
    accArgReprInfo(cenv_1, env_1, argInfo);
  }, _arg4.data[1]);

  (function (argInfo_1) {
    accArgReprInfo(cenv_1, env_1, argInfo_1);
  })(_arg4.data[2]);
}
export function accArgReprInfo(cenv_1, env_1, argInfo) {
  accAttribs(cenv_1, env_1, argInfo.Attribs);
}
export function accVal(cenv_1, env_1, v) {
  (function (attribs) {
    accAttribs(cenv_1, env_1, attribs);
  })(v.Attribs);

  iterate(function (arg20_) {
    accValReprInfo(cenv_1, env_1, arg20_);
  }, defaultArg(v.ValReprInfo, [], $var6 => [$var6]));

  (function (ty) {
    accTy(cenv_1, env_1, ty);
  })(v.Type);
}
export function accBind(cenv_1, env_1, bind) {
  accVal(cenv_1, env_1, bind.Var);
  let topValInfo;
  const matchValue = bind.Var.ValReprInfo;

  if (matchValue != null) {
    topValInfo = getValue(matchValue);
  } else {
    topValInfo = ValReprInfoModule.emptyValData;
  }

  accLambdas(cenv_1, env_1, topValInfo, bind.Expr, bind.Var.Type);
}
export function accBinds(cenv_1, env_1, xs) {
  iterate(function (bind) {
    accBind(cenv_1, env_1, bind);
  }, xs);
}
export function accTyconRecdField(cenv_1, env_1, _tycon, rfield) {
  accAttribs(cenv_1, env_1, rfield.PropertyAttribs);
  accAttribs(cenv_1, env_1, rfield.FieldAttribs);
}
export function accTycon(cenv_1, env_1, tycon) {
  accAttribs(cenv_1, env_1, tycon.Attribs);
  iterate(function (v) {
    accVal(cenv_1, env_1, v);
  }, abstractSlotValsOfTycons(ofArray([tycon])));
  tycon.AllFieldsArray.forEach(function (rfield) {
    accTyconRecdField(cenv_1, env_1, tycon, rfield);
  });

  if (tycon.IsUnionTycon) {
    iterate(function (uc) {
      accAttribs(cenv_1, env_1, uc.Attribs);
      iterate(function (rfield_1) {
        accTyconRecdField(cenv_1, env_1, tycon, rfield_1);
      }, uc.RecdFields);
    }, tycon.UnionCasesAsList);
  }
}
export function accTycons(cenv_1, env_1, tycons) {
  iterate(function (tycon) {
    accTycon(cenv_1, env_1, tycon);
  }, tycons);
}
export function accModuleOrNamespaceExpr(cenv_1, env_1, x) {
  accModuleOrNamespaceDef(cenv_1, env_1, x.data[1]);
}
export function accModuleOrNamespaceDefs(cenv_1, env_1, x) {
  iterate(function (x_1) {
    accModuleOrNamespaceDef(cenv_1, env_1, x_1);
  }, x);
}
export function accModuleOrNamespaceDef(cenv_1, env_1, x) {
  switch (x.tag) {
    case 2:
      accBind(cenv_1, env_1, x.data[0]);
      break;

    case 3:
      accExpr(cenv_1, env_1, x.data[0]);
      break;

    case 0:
      accModuleOrNamespaceExpr(cenv_1, env_1, x.data);
      break;

    case 1:
      accModuleOrNamespaceDefs(cenv_1, env_1, x.data);
      break;

    default:
      accTycons(cenv_1, env_1, x.data[1]);
      accModuleOrNamespaceBinds(cenv_1, env_1, x.data[2]);
  }
}
export function accModuleOrNamespaceBinds(cenv_1, env_1, xs) {
  iterate(function (x) {
    accModuleOrNamespaceBind(cenv_1, env_1, x);
  }, xs);
}
export function accModuleOrNamespaceBind(cenv_1, env_1, x) {
  if (x.tag === 1) {
    accTycon(cenv_1, env_1, x.data[0]);
    accModuleOrNamespaceDef(cenv_1, env_1, x.data[1]);
  } else {
    accBind(cenv_1, env_1, x.data);
  }
}
export function UnsolvedTyparsOfModuleDef(g, amap, denv, mdef, extraAttribs) {
  const cenv_1 = new cenv(g, amap, denv, new List());
  accModuleOrNamespaceDef(cenv_1, new env(0), mdef);
  accAttribs(cenv_1, new env(0), extraAttribs);
  return reverse(cenv_1.unsolved);
}