import { createFromValue } from "../fable-core/Lazy";
import { collect, concat, reverse, mapIndexed, append, map, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { IlxClosureInfo, IlxClosureLambdas, mkILFormalCloRef, IlxClosureRef, mkILFreeVar, instAppsAux, destTyFuncApp } from "../absil/ilx";
import { mkNormalStfld, mkMethodBody, mkILParamNamed, mkILCtor, mkILNonGenericEmptyCtor, mkILNonGenericVirtualMethod, ILDefaultPInvokeEncoding, ILTypeInit, emptyILCustomAttrs, emptyILSecurityDecls, emptyILProperties, emptyILEvents, emptyILMethodImpls, mkILFields, emptyILTypeDefs, ILTypeDefLayout, ILTypeDef, mkILCtorMethSpecForTy, mkNormalCall, mkILStorageCtor, mkILReturn, mkILGenericVirtualMethod, nonBranchingInstrsToCode, mkILMethodBody, prependInstrsToCode, mkLdarg, mkILFormalBoxedTy, ILScopeRef, ILMemberAccess, mkILInstanceField, mkILLocal, mkMethBodyAux, MethodBody, ILMethodBody, ILTailcall, andTailness, mkLdloc, mkStloc, mkILFieldSpecInTy, mkNormalLdfld, mkLdarg0, mkILInstanceMethSpecInTy, typesOfILParams, ILInstr, mkILStaticMethSpecInTy, mkILNonGenericInstanceMethSpecInTy, mkILBoxedTy, mkILNonGenericTySpec, mkILMethods, ILMethodDef, ILFieldDef, ILType, ILTypeRef, ILGlobals, mkILNestedTyRef, mkILTyRef } from "../absil/il";
import { ilxNamespace, ilxFsharpCoreLibScopeRef } from "./ilxsettings";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Function as _Function, Array as _Array } from "../fable-core/Util";
import { toList, fold, item, foldBack, initialize } from "../fable-core/Seq";
import { morphILInstrsInILCode } from "../absil/ilmorph";
import { makeSome, getValue } from "../fable-core/Option";
import { map as map_1 } from "../fable-core/Array";
import { Lazy } from "../absil/illib";
import { CompilerGeneratedName } from "../fsharp/PrettyNaming";
export function notlazy(v) {
  return createFromValue(v);
}
export function stripUpTo(n, test, dest, x) {
  if (n === 0) {
    return [new List(), x];
  } else if (test(x)) {
    const patternInput = dest(x);
    const patternInput_1 = stripUpTo(n - 1, test, dest, patternInput[1]);
    return [new List(patternInput[0], patternInput_1[0]), patternInput_1[1]];
  } else {
    return [new List(), x];
  }
}
export function destTyLambda(_arg1) {
  if (_arg1.tag === 0) {
    return [_arg1.data[0], _arg1.data[1]];
  } else {
    throw new Error("no");
  }
}
export function isTyLambda(_arg1) {
  if (_arg1.tag === 0) {
    return true;
  } else {
    return false;
  }
}
export function isTyApp(_arg1) {
  if (_arg1.tag === 0) {
    return true;
  } else {
    return false;
  }
}
export function stripTyLambdasUpTo(n, lambdas) {
  return stripUpTo(n, function (_arg1) {
    return isTyLambda(_arg1);
  }, function (_arg1_1) {
    return destTyLambda(_arg1_1);
  }, lambdas);
}
export function stripSupportedIndirectCall(apps) {
  if (apps.tag === 1) {
    if (apps.data[1].tag === 1) {
      if (apps.data[1].data[1].tag === 1) {
        if (apps.data[1].data[1].data[1].tag === 1) {
          if (apps.data[1].data[1].data[1].data[1].tag === 1) {
            return [new List(), ofArray([apps.data[0], apps.data[1].data[0], apps.data[1].data[1].data[0], apps.data[1].data[1].data[1].data[0], apps.data[1].data[1].data[1].data[1].data[0]]), apps.data[1].data[1].data[1].data[1].data[1]];
          } else {
            return [new List(), ofArray([apps.data[0], apps.data[1].data[0], apps.data[1].data[1].data[0], apps.data[1].data[1].data[1].data[0]]), apps.data[1].data[1].data[1].data[1]];
          }
        } else {
          return [new List(), ofArray([apps.data[0], apps.data[1].data[0], apps.data[1].data[1].data[0]]), apps.data[1].data[1].data[1]];
        }
      } else {
        return [new List(), ofArray([apps.data[0], apps.data[1].data[0]]), apps.data[1].data[1]];
      }
    } else {
      return [new List(), ofArray([apps.data[0]]), apps.data[1]];
    }
  } else if (apps.tag === 0) {
    const patternInput = stripUpTo(1, function (_arg1) {
      return isTyApp(_arg1);
    }, function (arg00_) {
      return destTyFuncApp(arg00_);
    }, apps);
    return [patternInput[0], new List(), patternInput[1]];
  } else {
    return [new List(), new List(), apps];
  }
}
export function stripSupportedAbstraction(lambdas) {
  if (lambdas.tag === 1) {
    if (lambdas.data[1].tag === 1) {
      if (lambdas.data[1].data[1].tag === 1) {
        if (lambdas.data[1].data[1].data[1].tag === 1) {
          if (lambdas.data[1].data[1].data[1].data[1].tag === 1) {
            return [new List(), ofArray([lambdas.data[0], lambdas.data[1].data[0], lambdas.data[1].data[1].data[0], lambdas.data[1].data[1].data[1].data[0], lambdas.data[1].data[1].data[1].data[1].data[0]]), lambdas.data[1].data[1].data[1].data[1].data[1]];
          } else {
            return [new List(), ofArray([lambdas.data[0], lambdas.data[1].data[0], lambdas.data[1].data[1].data[0], lambdas.data[1].data[1].data[1].data[0]]), lambdas.data[1].data[1].data[1].data[1]];
          }
        } else {
          return [new List(), ofArray([lambdas.data[0], lambdas.data[1].data[0], lambdas.data[1].data[1].data[0]]), lambdas.data[1].data[1].data[1]];
        }
      } else {
        return [new List(), ofArray([lambdas.data[0], lambdas.data[1].data[0]]), lambdas.data[1].data[1]];
      }
    } else {
      return [new List(), ofArray([lambdas.data[0]]), lambdas.data[1]];
    }
  } else if (lambdas.tag === 0) {
    const patternInput = stripTyLambdasUpTo(1, lambdas);
    return [patternInput[0], new List(), patternInput[1]];
  } else {
    return [new List(), new List(), lambdas];
  }
}
export function isSupportedDirectCall(apps) {
  const $var1 = apps.tag === 1 ? apps.data[1].tag === 2 ? [0] : apps.data[1].tag === 1 ? apps.data[1].data[1].tag === 2 ? [1] : apps.data[1].data[1].tag === 1 ? apps.data[1].data[1].data[1].tag === 2 ? [2] : apps.data[1].data[1].data[1].tag === 1 ? apps.data[1].data[1].data[1].data[1].tag === 2 ? [3] : [5] : [5] : [5] : [5] : apps.tag === 0 ? [4] : [5];

  switch ($var1[0]) {
    case 0:
      return true;

    case 1:
      return true;

    case 2:
      return true;

    case 3:
      return true;

    case 4:
      return false;

    case 5:
      return false;
  }
}
export function mkFuncTypeRef(n) {
  if (n === 1) {
    return mkILTyRef(ilxFsharpCoreLibScopeRef(), ilxNamespace() + ".FSharpFunc`2");
  } else {
    return mkILNestedTyRef(ilxFsharpCoreLibScopeRef(), ofArray([ilxNamespace() + ".OptimizedClosures"]), "FSharpFunc`" + (n + 1).toString());
  }
}
export class cenv {
  constructor(ilg, tref_Func, mkILTyFuncTy, addFieldGeneratedAttrs, addFieldNeverAttrs, addMethodGeneratedAttrs) {
    this.ilg = ilg;
    this.tref_Func = tref_Func;
    this.mkILTyFuncTy = mkILTyFuncTy;
    this.addFieldGeneratedAttrs = addFieldGeneratedAttrs;
    this.addFieldNeverAttrs = addFieldNeverAttrs;
    this.addMethodGeneratedAttrs = addMethodGeneratedAttrs;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseClosures.cenv",
      interfaces: ["FSharpRecord"],
      properties: {
        ilg: ILGlobals,
        tref_Func: _Array(ILTypeRef),
        mkILTyFuncTy: ILType,
        addFieldGeneratedAttrs: _Function([ILFieldDef, ILFieldDef]),
        addFieldNeverAttrs: _Function([ILFieldDef, ILFieldDef]),
        addMethodGeneratedAttrs: _Function([ILMethodDef, ILMethodDef])
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.EraseClosures.cenv", cenv);
export function addMethodGeneratedAttrsToTypeDef(cenv_1, tdef) {
  return tdef.With(null, null, null, null, null, null, mkILMethods(map(function (md) {
    return cenv_1.addMethodGeneratedAttrs(md);
  }, tdef.Methods.AsList)));
}
export function newIlxPubCloEnv(ilg, addMethodGeneratedAttrs, addFieldGeneratedAttrs, addFieldNeverAttrs) {
  const tref_Func = Array.from(initialize(10, function (i) {
    return mkFuncTypeRef(i + 1);
  }));
  const mkILTyFuncTy = new ILType(3, mkILNonGenericTySpec(mkILTyRef(ilxFsharpCoreLibScopeRef(), ilxNamespace() + ".FSharpTypeFunc")));
  return new cenv(ilg, tref_Func, mkILTyFuncTy, addFieldGeneratedAttrs, addFieldNeverAttrs, addMethodGeneratedAttrs);
}
export function mkILTyFuncTy(cenv_1) {
  return cenv_1.mkILTyFuncTy;
}
export function mkILFuncTy(cenv_1, dty, rty) {
  return mkILBoxedTy(cenv_1.tref_Func[0], ofArray([dty, rty]));
}
export function mkILCurriedFuncTy(cenv_1, dtys, rty) {
  return foldBack(function (arg10_, arg20_) {
    return mkILFuncTy(cenv_1, arg10_, arg20_);
  }, dtys, rty);
}
export function typ_Func(cenv_1, dtys, rty) {
  const n = dtys.length | 0;
  const tref = n <= 10 ? cenv_1.tref_Func[n - 1] : mkFuncTypeRef(n);
  return mkILBoxedTy(tref, append(dtys, ofArray([rty])));
}
export function mkTyOfApps(cenv_1, apps) {
  if (apps.tag === 1) {
    return mkILFuncTy(cenv_1, apps.data[0], mkTyOfApps(cenv_1, apps.data[1]));
  } else if (apps.tag === 2) {
    return apps.data;
  } else {
    return cenv_1.mkILTyFuncTy;
  }
}
export function mkTyOfLambdas(cenv_1, lam) {
  if (lam.tag === 1) {
    return mkILFuncTy(cenv_1, lam.data[0].Type, mkTyOfLambdas(cenv_1, lam.data[1]));
  } else if (lam.tag === 0) {
    return cenv_1.mkILTyFuncTy;
  } else {
    return lam.data;
  }
}
export function mkMethSpecForMultiApp(cenv_1, argtys_, rty) {
  const n = argtys_.length | 0;
  const formalArgTys = mapIndexed(function (i, _arg1) {
    return new ILType(7, i & 0xFFFF);
  }, argtys_);
  const formalRetTy = new ILType(7, n & 0xFFFF);
  const inst = append(argtys_, ofArray([rty]));

  if (n === 1) {
    return [true, mkILNonGenericInstanceMethSpecInTy(mkILBoxedTy(cenv_1.tref_Func[0], inst), "Invoke", formalArgTys, formalRetTy)];
  } else {
    return [false, mkILStaticMethSpecInTy(mkILFuncTy(cenv_1, item(0, inst), item(1, inst)), "InvokeFast", append(ofArray([mkILCurriedFuncTy(cenv_1, formalArgTys, formalRetTy)]), formalArgTys), formalRetTy, inst.tail.tail)];
  }
}
export function mkCallBlockForMultiValueApp(cenv_1, doTailCall, args_, rty_) {
  const patternInput = mkMethSpecForMultiApp(cenv_1, args_, rty_);
  return ofArray([patternInput[0] ? new ILInstr(49, [doTailCall, patternInput[1], null]) : new ILInstr(48, [doTailCall, patternInput[1], null])]);
}
export function mkMethSpecForClosureCall(cenv_1, clospec) {
  const patternInput = stripSupportedAbstraction(clospec.FormalLambdas);

  if (!(patternInput[0].tail == null)) {
    throw new Error("mkMethSpecForClosureCall: internal error");
  }

  const rty_ = mkTyOfLambdas(cenv_1, patternInput[2]);
  const argtys_ = typesOfILParams(patternInput[1]);
  const minst_ = clospec.GenericArgs;
  return mkILInstanceMethSpecInTy(clospec.ILType, "Invoke", argtys_, rty_, minst_);
}
export function mkLdFreeVar(clospec, fv) {
  return ofArray([mkLdarg0, mkNormalLdfld(mkILFieldSpecInTy(clospec.ILType, fv.fvName, fv.fvType))]);
}
export function mkCallFunc(cenv_1, allocLocal, numThisGenParams, tl, apps) {
  const unwind = function (apps_1) {
    if (apps_1.tag === 1) {
      const patternInput = unwind(apps_1.data[1]);
      let patternInput_1;
      const locn = allocLocal(apps_1.data[0]);
      patternInput_1 = [ofArray([mkStloc(locn)]), ofArray([mkLdloc(locn)])];
      return [new List(patternInput_1[0], patternInput[0]), new List(patternInput_1[1], patternInput[1])];
    } else if (apps_1.tag === 2) {
      return [new List(), new List()];
    } else {
      const rest = instAppsAux(numThisGenParams, ofArray([apps_1.data[0]]), apps_1.data[1]);
      const patternInput_2 = unwind(rest);
      return [new List(new List(), patternInput_2[0]), new List(new List(), patternInput_2[1])];
    }
  };

  const computePreCall = function (fst, n, rest_1, loaders) {
    if (fst) {
      const patternInput_3 = unwind(rest_1);
      return [reverse(concat(patternInput_3[0])), concat(patternInput_3[1])];
    } else {
      return stripUpTo(n, function (_arg1) {
        return _arg1.tail != null ? true : false;
      }, function (_arg2) {
        if (_arg2.tail != null) {
          return [_arg2.head, _arg2.tail];
        } else {
          throw new Error("no!");
        }
      }, loaders);
    }
  };

  const buildApp = function (fst_1, loaders_1, apps_2) {
    const matchValue = stripSupportedIndirectCall(apps_2);
    const $var2 = matchValue[1].tail == null ? !(matchValue[0].tail == null) ? [0] : [1] : [1];

    switch ($var2[0]) {
      case 0:
        const patternInput_5 = fold(function (tupledArg, _arg1_1) {
          const patternInput_4 = destTyFuncApp(tupledArg[1]);
          const rest__ = instAppsAux(numThisGenParams, ofArray([patternInput_4[0]]), patternInput_4[1]);
          return [new List(patternInput_4[0], tupledArg[0]), rest__];
        }, [new List(), apps_2], matchValue[0]);
        const instTyargs = reverse(patternInput_5[0]);
        const patternInput_6 = computePreCall(fst_1, 0, patternInput_5[1], loaders_1);
        const doTailCall = andTailness(tl, false);
        const instrs1 = append(patternInput_6[0], ofArray([new ILInstr(49, [doTailCall, mkILInstanceMethSpecInTy(cenv_1.mkILTyFuncTy, "Specialize", new List(), cenv_1.ilg.typ_Object, instTyargs), null])]));
        let instrs1_1;
        const rtnTy = mkTyOfApps(cenv_1, patternInput_5[1]);
        instrs1_1 = append(instrs1, ofArray([new ILInstr(76, rtnTy)]));

        if (doTailCall.Equals(new ILTailcall(0))) {
          return instrs1_1;
        } else {
          return append(instrs1_1, buildApp(false, patternInput_6[1], patternInput_5[1]));
        }

      case 1:
        const $var3 = matchValue[0].tail == null ? !(matchValue[1].tail == null) ? [0] : [1] : [1];

        switch ($var3[0]) {
          case 0:
            const patternInput_7 = computePreCall(fst_1, matchValue[1].length, matchValue[2], loaders_1);
            const isLast = matchValue[2].tag === 2 ? true : false;
            const rty = mkTyOfApps(cenv_1, matchValue[2]);
            const doTailCall_1 = andTailness(tl, isLast);

            if (doTailCall_1.Equals(new ILTailcall(0))) {
              const callBlock = mkCallBlockForMultiValueApp(cenv_1, doTailCall_1, matchValue[1], rty);
              return append(patternInput_7[0], callBlock);
            } else {
              const callBlock_1 = mkCallBlockForMultiValueApp(cenv_1, doTailCall_1, matchValue[1], rty);
              const restBlock = buildApp(false, patternInput_7[1], matchValue[2]);
              return append(patternInput_7[0], append(callBlock_1, restBlock));
            }

          case 1:
            const $var4 = matchValue[0].tail == null ? matchValue[1].tail == null ? matchValue[2].tag === 2 ? [0] : [1] : [1] : [1];

            switch ($var4[0]) {
              case 0:
                const _rty = matchValue[2].data;
                return new List();

              case 1:
                throw new Error("*** Error: internal error: unknown indirect calling convention returned by stripSupportedIndirectCall");
            }

        }

    }
  };

  return buildApp(true, new List(), apps);
}
export function convReturnInstr(ty, instr) {
  switch (instr.tag) {
    case 47:
      return ofArray([new ILInstr(74, ty), new ILInstr(47)]);

    case 48:
      return ofArray([new ILInstr(48, [new ILTailcall(1), instr.data[1], instr.data[2]])]);

    case 49:
      return ofArray([new ILInstr(49, [new ILTailcall(1), instr.data[1], instr.data[2]])]);

    case 50:
      return ofArray([new ILInstr(50, [new ILTailcall(1), instr.data[1], instr.data[2], instr.data[3]])]);

    case 51:
      return ofArray([new ILInstr(51, [new ILTailcall(1), instr.data[1], instr.data[2]])]);

    default:
      return ofArray([instr]);
  }
}
export function convILMethodBody(thisClo, boxReturnTy, il) {
  const newMax = (thisClo == null ? il.MaxStack : il.MaxStack + 2) | 0;
  const code = boxReturnTy != null ? morphILInstrsInILCode(function (instr) {
    return convReturnInstr(getValue(boxReturnTy), instr);
  }, il.Code) : il.Code;
  return new ILMethodBody(true, newMax, il.NoInlining, il.AggressiveInlining, il.Locals, code, il.SourceMarker);
}
export function convMethodBody(thisClo, _arg1) {
  if (_arg1.tag === 0) {
    return new MethodBody(0, convILMethodBody(thisClo, null, _arg1.data));
  } else {
    return _arg1;
  }
}
export function convMethodDef(thisClo, md) {
  const b_ = convMethodBody(thisClo, md.Body.Contents);
  return md.With(null, null, null, null, null, null, mkMethBodyAux(b_));
}
export function mkILFreeVarForParam(p) {
  let nm;

  if (p.Name == null) {
    throw new Error("closure parameters must be given names");
  } else {
    nm = getValue(p.Name);
  }

  return mkILFreeVar(nm, false, p.Type);
}
export function mkILLocalForFreeVar(p) {
  return mkILLocal(p.fvType, null);
}
export function mkILCloFldSpecs(_cenv, flds) {
  return toList(map_1(function (fv) {
    return [fv.fvName, fv.fvType];
  }, flds, Array));
}
export function mkILCloFldDefs(cenv_1, flds) {
  return map(function (fv) {
    const fdef = mkILInstanceField(fv.fvName, fv.fvType, null, new ILMemberAccess(5));

    if (fv.fvCompilerGenerated) {
      return cenv_1.addFieldGeneratedAttrs(cenv_1.addFieldNeverAttrs(fdef));
    } else {
      return fdef;
    }
  }, toList(flds));
}
export function convIlxClosureDef(cenv_1, encl, td, clo) {
  var cloCode;
  var cloCode_1;
  var matchValue_2;
  var thisClo;
  let newTypeDefs;
  const nowTypeRef = mkILNestedTyRef(new ILScopeRef(0), encl, td.Name);
  const nowTy = mkILFormalBoxedTy(nowTypeRef, td.GenericParams);
  const nowCloRef = new IlxClosureRef(0, [nowTypeRef, clo.cloStructure, clo.cloFreeVars]);
  const nowCloSpec = mkILFormalCloRef(td.GenericParams, nowCloRef);
  const tagApp = Lazy.force(clo.cloCode).SourceMarker;
  const patternInput = stripSupportedAbstraction(clo.cloStructure);

  const rewriteCodeToAccessArgsFromEnv = function (laterCloSpec, argToFreeVarMap) {
    const il = Lazy.force(clo.cloCode);
    const numLocals = il.Locals.length | 0;

    const rewriteInstrToAccessArgsFromEnv = function (instr) {
      const fixupArg = function (mkEnv, mkArg, n) {
        const findMatchingArg = function (l, c) {
          findMatchingArg: while (true) {
            if (l.tail == null) {
              return mkArg(n - argToFreeVarMap.length + 1);
            } else {
              const m = l.head[0] | 0;

              if (n === m) {
                return mkEnv(c);
              } else {
                l = l.tail;
                c = c + 1;
                continue findMatchingArg;
              }
            }
          }
        };

        return findMatchingArg(argToFreeVarMap, 0);
      };

      if (instr.tag === 35) {
        return fixupArg(function (x) {
          return ofArray([mkLdloc(x + numLocals & 0xFFFF)]);
        }, function (x_1) {
          return ofArray([mkLdarg(x_1 & 0xFFFF)]);
        }, ~~instr.data);
      } else if (instr.tag === 40) {
        return fixupArg(function (x_2) {
          return ofArray([mkStloc(x_2 + numLocals & 0xFFFF)]);
        }, function (x_3) {
          return ofArray([new ILInstr(40, x_3 & 0xFFFF)]);
        }, ~~instr.data);
      } else if (instr.tag === 36) {
        return fixupArg(function (x_4) {
          return ofArray([new ILInstr(39, x_4 + numLocals & 0xFFFF)]);
        }, function (x_5) {
          return ofArray([new ILInstr(36, x_5 & 0xFFFF)]);
        }, ~~instr.data);
      } else {
        return ofArray([instr]);
      }
    };

    const mainCode = morphILInstrsInILCode(rewriteInstrToAccessArgsFromEnv, il.Code);
    const ldenvCode = concat(mapIndexed(function (n_1, tupledArg) {
      return append(mkLdFreeVar(laterCloSpec, tupledArg[1]), ofArray([mkStloc(n_1 + numLocals & 0xFFFF)]));
    }, argToFreeVarMap));
    const code = prependInstrsToCode(ldenvCode, mainCode);
    const Locals = append(il.Locals, map($var5 => mkILLocalForFreeVar($var5[1]), argToFreeVarMap));
    const MaxStack = il.MaxStack + 1 | 0;
    return new ILMethodBody(il.IsZeroInit, MaxStack, il.NoInlining, il.AggressiveInlining, Locals, code, il.SourceMarker);
  };

  const matchValue = [patternInput[0], patternInput[1], patternInput[2]];
  const $var6 = matchValue[0].tail == null ? matchValue[1].tail == null ? matchValue[2].tag === 2 ? [2] : [3, matchValue[0], matchValue[1]] : [1, matchValue[1]] : matchValue[1].tail == null ? [0] : [3, matchValue[0], matchValue[1]];

  switch ($var6[0]) {
    case 0:
      const nowReturnTy = mkTyOfLambdas(cenv_1, patternInput[2]);

      if (patternInput[2].tag === 2 ? false : true) {
        const nowStruct = foldBack(function (x_6, y) {
          return new IlxClosureLambdas(0, [x_6, y]);
        }, patternInput[0], new IlxClosureLambdas(2, nowReturnTy));
        const laterTypeName = td.Name + "T";
        const laterTypeRef = mkILNestedTyRef(new ILScopeRef(0), encl, laterTypeName);
        const laterGenericParams = append(td.GenericParams, patternInput[0]);
        const selfFreeVar = mkILFreeVar(CompilerGeneratedName("self" + clo.cloFreeVars.length.toString()), true, nowCloSpec.ILType);
        const laterFields = clo.cloFreeVars.concat([selfFreeVar]);
        const laterCloRef = new IlxClosureRef(0, [laterTypeRef, patternInput[2], laterFields]);
        const laterCloSpec_1 = mkILFormalCloRef(laterGenericParams, laterCloRef);
        const laterCode = rewriteCodeToAccessArgsFromEnv(laterCloSpec_1, ofArray([[0, selfFreeVar]]));
        const laterTypeDefs = convIlxClosureDef(cenv_1, encl, td.With(laterTypeName, null, null, null, laterGenericParams), new IlxClosureInfo(patternInput[2], laterFields, notlazy(laterCode)));
        const nowCode = mkILMethodBody(false, new List(), clo.cloFreeVars.length + 1, nonBranchingInstrsToCode(append(collect(function (fv) {
          return mkLdFreeVar(nowCloSpec, fv);
        }, toList(clo.cloFreeVars)), append(ofArray([mkLdarg0]), ofArray([new ILInstr(53, [laterCloSpec_1.Constructor, null])])))), tagApp);
        const nowTypeDefs = convIlxClosureDef(cenv_1, encl, td, (cloCode = notlazy(nowCode), new IlxClosureInfo(nowStruct, clo.cloFreeVars, cloCode)));
        const nowTypeDefs_1 = map(function (tdef) {
          return addMethodGeneratedAttrsToTypeDef(cenv_1, tdef);
        }, nowTypeDefs);
        newTypeDefs = append(nowTypeDefs_1, laterTypeDefs);
      } else {
        const boxReturnTy = nowReturnTy;
        const nowApplyMethDef = mkILGenericVirtualMethod("Specialize", new ILMemberAccess(5), patternInput[0], new List(), mkILReturn(cenv_1.ilg.typ_Object), new MethodBody(0, convILMethodBody(nowCloSpec, boxReturnTy, Lazy.force(clo.cloCode))));
        const ctorMethodDef = cenv_1.addMethodGeneratedAttrs(mkILStorageCtor(null, ofArray([mkLdarg0, mkNormalCall(mkILCtorMethSpecForTy(cenv_1.mkILTyFuncTy, new List()))]), nowTy, mkILCloFldSpecs(cenv_1, clo.cloFreeVars), new ILMemberAccess(0)));
        const cloTypeDef = ILTypeDef.Create(td.Name, td.Attributes, new ILTypeDefLayout(0), new List(), td.GenericParams, cenv_1.mkILTyFuncTy, mkILMethods(append(ofArray([ctorMethodDef]), ofArray([nowApplyMethDef]))), emptyILTypeDefs, mkILFields(mkILCloFldDefs(cenv_1, clo.cloFreeVars)), emptyILMethodImpls, emptyILEvents, emptyILProperties, emptyILSecurityDecls, emptyILCustomAttrs).WithSpecialName(false).WithImport(false).WithHasSecurity(false).WithAbstract(false).WithSealed(true).WithInitSemantics(new ILTypeInit(0)).WithEncoding(new ILDefaultPInvokeEncoding(0));
        newTypeDefs = ofArray([cloTypeDef]);
      }

      break;

    case 1:
      const nowReturnTy_1 = mkTyOfLambdas(cenv_1, patternInput[2]);

      if (patternInput[2].tag === 2 ? false : true) {
        const nowStruct_1 = foldBack(function (l_1, r) {
          return new IlxClosureLambdas(1, [l_1, r]);
        }, $var6[1], new IlxClosureLambdas(2, nowReturnTy_1));
        const laterTypeName_1 = td.Name + "D";
        const laterTypeRef_1 = mkILNestedTyRef(new ILScopeRef(0), encl, laterTypeName_1);
        const laterGenericParams_1 = td.GenericParams;
        const selfFreeVar_1 = mkILFreeVar(CompilerGeneratedName("self"), true, nowCloSpec.ILType);
        const argToFreeVarMap_1 = new List([0, selfFreeVar_1], mapIndexed(function (i, p) {
          return [i + 1, mkILFreeVarForParam(p)];
        }, $var6[1]));
        const laterFreeVars = Array.from(map(function (tuple) {
          return tuple[1];
        }, argToFreeVarMap_1));
        const laterFields_1 = clo.cloFreeVars.concat(laterFreeVars);
        const laterCloRef_1 = new IlxClosureRef(0, [laterTypeRef_1, patternInput[2], laterFields_1]);
        const laterCloSpec_2 = mkILFormalCloRef(laterGenericParams_1, laterCloRef_1);
        const nowCode_1 = mkILMethodBody(false, new List(), argToFreeVarMap_1.length + clo.cloFreeVars.length, nonBranchingInstrsToCode(append(collect(function (fv_1) {
          return mkLdFreeVar(nowCloSpec, fv_1);
        }, toList(clo.cloFreeVars)), append(map(function (tupledArg_1) {
          return mkLdarg(tupledArg_1[0] & 0xFFFF);
        }, argToFreeVarMap_1), ofArray([new ILInstr(53, [laterCloSpec_2.Constructor, null])])))), tagApp);
        const nowTypeDefs_2 = convIlxClosureDef(cenv_1, encl, td, (cloCode_1 = notlazy(nowCode_1), new IlxClosureInfo(nowStruct_1, clo.cloFreeVars, cloCode_1)));
        const laterCode_1 = rewriteCodeToAccessArgsFromEnv(laterCloSpec_2, argToFreeVarMap_1);
        const laterTypeDefs_1 = convIlxClosureDef(cenv_1, encl, td.With(laterTypeName_1, null, null, null, laterGenericParams_1), new IlxClosureInfo(patternInput[2], laterFields_1, notlazy(laterCode_1)));
        const nowTypeDefs_3 = map(function (tdef_1) {
          return addMethodGeneratedAttrsToTypeDef(cenv_1, tdef_1);
        }, nowTypeDefs_2);
        newTypeDefs = append(nowTypeDefs_3, laterTypeDefs_1);
      } else {
        const nowEnvParentClass = typ_Func(cenv_1, typesOfILParams($var6[1]), nowReturnTy_1);
        let cloTypeDef_1;
        const nowApplyMethDef_1 = mkILNonGenericVirtualMethod("Invoke", new ILMemberAccess(5), $var6[1], mkILReturn(nowReturnTy_1), new MethodBody(0, convILMethodBody(nowCloSpec, null, Lazy.force(clo.cloCode))));
        const ctorMethodDef_1 = cenv_1.addMethodGeneratedAttrs(mkILStorageCtor(null, ofArray([mkLdarg0, mkNormalCall(mkILCtorMethSpecForTy(nowEnvParentClass, new List()))]), nowTy, mkILCloFldSpecs(cenv_1, clo.cloFreeVars), new ILMemberAccess(0)));
        cloTypeDef_1 = ILTypeDef.Create(td.Name, td.Attributes, new ILTypeDefLayout(0), new List(), td.GenericParams, nowEnvParentClass, mkILMethods(append(ofArray([ctorMethodDef_1]), ofArray([nowApplyMethDef_1]))), emptyILTypeDefs, mkILFields(mkILCloFldDefs(cenv_1, clo.cloFreeVars)), emptyILMethodImpls, emptyILEvents, emptyILProperties, emptyILSecurityDecls, emptyILCustomAttrs).WithHasSecurity(false).WithSpecialName(false).WithAbstract(false).WithImport(false).WithEncoding(new ILDefaultPInvokeEncoding(0)).WithSealed(true).WithInitSemantics(new ILTypeInit(0));
        newTypeDefs = ofArray([cloTypeDef_1]);
      }

      break;

    case 2:
      let cloCode_;
      const matchValue_1 = td.Extends;

      if (matchValue_1 != null) {
        cloCode_ = convILMethodBody(nowCloSpec, null, Lazy.force(clo.cloCode));
      } else {
        cloCode_ = mkILNonGenericEmptyCtor(null, cenv_1.ilg.typ_Object).MethodBody;
      }

      let ctorMethodDef_2;
      const flds = mkILCloFldSpecs(cenv_1, clo.cloFreeVars);
      ctorMethodDef_2 = mkILCtor(new ILMemberAccess(5), map(function (tupledArg_2) {
        return mkILParamNamed(tupledArg_2[0], tupledArg_2[1]);
      }, flds), mkMethodBody(cloCode_.IsZeroInit, cloCode_.Locals, cloCode_.MaxStack, prependInstrsToCode(concat(mapIndexed(function (n_2, tupledArg_3) {
        return ofArray([mkLdarg0, mkLdarg(n_2 + 1 & 0xFFFF), mkNormalStfld(mkILFieldSpecInTy(nowTy, tupledArg_3[0], tupledArg_3[1]))]);
      }, flds)), cloCode_.Code), null));
      const cloTypeDef_2 = td.With(td.Name, null, null, td.Implements, td.GenericParams, makeSome((matchValue_2 = td.Extends, matchValue_2 != null ? getValue(matchValue_2) : cenv_1.ilg.typ_Object)), mkILMethods(new List(ctorMethodDef_2, map((thisClo = nowCloSpec, function (md) {
        return convMethodDef(thisClo, md);
      }), td.Methods.AsList))), null, mkILFields(append(mkILCloFldDefs(cenv_1, clo.cloFreeVars), td.Fields.AsList)));
      newTypeDefs = ofArray([cloTypeDef_2]);
      break;

    case 3:
      throw new Error("Unexpected unsupported abstraction sequence, #tyabs = " + $var6[1].length.toString() + ", #tmabs = " + $var6[2].length.toString());
      break;
  }

  return newTypeDefs;
}