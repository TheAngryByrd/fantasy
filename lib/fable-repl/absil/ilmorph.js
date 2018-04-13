import { equals, hash, createAtom } from "../fable-core/Util";
import { map } from "../fable-core/Array";
import { ILModuleDef, ILAssemblyManifest, mkILMethodImpls, mkILEvents, mkILProperties, ILMethodImplDef, ILOverridesSpec, mkMethBodyAux, MethodBody, ILMethodBody, mkILTypeDefsFromArray, mkILFields, mkILMethods, ILParameter, ILReturn, storeILCustomAttrs, ILToken, ILInstr, ILLocal, mkILCustomAttrs, mkILCustomAttribMethRef, decodeILAttribData, ILAttribute, ILAttribElem, ILFieldSpec, ILFieldRef, mkILMethSpecForMethRefInTy, mkILNonGenericTySpec, ILMethodRef, ILGenericParameterDef, ILTypeRef, ILTypeSpec, mkILTySpec, mkILBoxedType, ILCallingSignature, ILType, ILExceptionSpec, ILExceptionClause, ILCode } from "./il";
import { create } from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import _Symbol from "../fable-core/Symbol";
import { ofArray, append, map as map_1 } from "../fable-core/List";
import List from "../fable-core/List";
import CurriedLambda from "../fable-core/CurriedLambda";
import Choice from "../fable-core/Choice";
import { makeSome, defaultArg, getValue } from "../fable-core/Option";
import { Tables } from "./illib";
export let morphCustomAttributeData = createAtom(false);
export function enableMorphCustomAttributeData() {
  return morphCustomAttributeData(true);
}
export function disableMorphCustomAttributeData() {
  return morphCustomAttributeData(false);
}
export function code_instr2instr(f, code) {
  const Instrs = map(f, code.Instrs, Array);
  return new ILCode(code.Labels, Instrs, code.Exceptions, code.Locals);
}
export function code_instr2instrs(f, code) {
  const codebuf = [];
  const adjust = new Map();
  let old = 0;
  let nw = 0;

  for (let idx = 0; idx <= code.Instrs.length - 1; idx++) {
    const instr = code.Instrs[idx];
    adjust.set(old, nw);
    const instrs = f(instr);

    for (let instr2 of instrs) {
      codebuf.push(instr2);
      nw = nw + 1 | 0;
    }

    old = old + 1 | 0;
  }

  adjust.set(old, nw);
  let labels;
  const dict = create(null, fromEqualityComparer({
    GetHashCode(x) {
      return function (obj) {
        return hash(obj);
      }(x) | 0;
    },

    Equals(x, y) {
      return function (e1, e2) {
        return equals(e1, e2);
      }(x, y);
    },

    [_Symbol.reflection]() {
      return {
        interfaces: ["System.Collections.Generic.IEqualityComparer"]
      };
    }

  }));

  for (let kvp of code.Labels) {
    dict.set(kvp[0], adjust.get(kvp[1]));
  }

  labels = dict;
  const Instrs = Array.from(codebuf);
  return new ILCode(labels, Instrs, code.Exceptions, code.Locals);
}
export function code_instr2instr_typ2typ(finstr, fty, c) {
  const c_1 = code_instr2instr(finstr, c);
  const Exceptions = map_1(function (e) {
    const Clause = function (_arg1) {
      return _arg1.tag === 3 ? new ILExceptionClause(3, [fty(_arg1.data[0]), _arg1.data[1]]) : _arg1;
    }(e.Clause);

    return new ILExceptionSpec(e.Range, Clause);
  }, c_1.Exceptions);
  return new ILCode(c_1.Labels, c_1.Instrs, Exceptions, c_1.Locals);
}
export function typ_tref2tref(f, x) {
  var ArgTypes;
  var ReturnType;

  switch (x.tag) {
    case 6:
      return new ILType(6, (ArgTypes = map_1(function (x_1) {
        return typ_tref2tref(f, x_1);
      }, x.data.ArgTypes), ReturnType = typ_tref2tref(f, x.data.ReturnType), new ILCallingSignature(x.data.CallingConv, ArgTypes, ReturnType)));

    case 5:
      return new ILType(5, typ_tref2tref(f, x.data));

    case 3:
      return mkILBoxedType(tspec_tref2tref(f, x.data));

    case 2:
      return new ILType(2, tspec_tref2tref(f, x.data));

    case 1:
      return new ILType(1, [x.data[0], typ_tref2tref(f, x.data[1])]);

    case 7:
      return new ILType(7, x.data);

    case 8:
      return new ILType(8, [x.data[0], f(x.data[1]), typ_tref2tref(f, x.data[2])]);

    case 0:
      return new ILType(0);

    default:
      return new ILType(4, typ_tref2tref(f, x.data));
  }
}
export function tspec_tref2tref(f, x) {
  return mkILTySpec(f(x.TypeRef), map_1(function (x_1) {
    return typ_tref2tref(f, x_1);
  }, x.GenericArgs));
}
export function typ_scoref2scoref_tyvar2typ(_arg1_0, _arg1_1, x) {
  const _arg1 = [_arg1_0, _arg1_1];

  switch (x.tag) {
    case 4:
      return new ILType(4, typ_scoref2scoref_tyvar2typ(_arg1[0], _arg1[1], x.data));

    case 6:
      return new ILType(6, callsig_scoref2scoref_tyvar2typ(_arg1[0], _arg1[1], x.data));

    case 5:
      return new ILType(5, typ_scoref2scoref_tyvar2typ(_arg1[0], _arg1[1], x.data));

    case 3:
      return mkILBoxedType(tspec_scoref2scoref_tyvar2typ(_arg1[0], _arg1[1], x.data));

    case 2:
      return new ILType(2, tspec_scoref2scoref_tyvar2typ(_arg1[0], _arg1[1], x.data));

    case 1:
      return new ILType(1, [x.data[0], typ_scoref2scoref_tyvar2typ(_arg1[0], _arg1[1], x.data[1])]);

    case 7:
      return _arg1[1](x.data);

    default:
      return x;
  }
}
export function tspec_scoref2scoref_tyvar2typ(fs_0, fs_1, x) {
  var i;
  const fs = [fs_0, fs_1];
  return ILTypeSpec.Create(morphILScopeRefsInILTypeRef(fs[0], x.TypeRef), (i = x.GenericArgs, typs_scoref2scoref_tyvar2typ(fs[0], fs[1], i)));
}
export function callsig_scoref2scoref_tyvar2typ(f_0, f_1, x) {
  const f = [f_0, f_1];
  const ArgTypes = map_1(function (x_1) {
    return typ_scoref2scoref_tyvar2typ(f[0], f[1], x_1);
  }, x.ArgTypes);
  const ReturnType = typ_scoref2scoref_tyvar2typ(f[0], f[1], x.ReturnType);
  return new ILCallingSignature(x.CallingConv, ArgTypes, ReturnType);
}
export function typs_scoref2scoref_tyvar2typ(f_0, f_1, i) {
  const f = [f_0, f_1];
  return map_1(function (x) {
    return typ_scoref2scoref_tyvar2typ(f[0], f[1], x);
  }, i);
}
export function gparams_scoref2scoref_tyvar2typ(f, i) {
  return map_1(function (i_1) {
    return gparam_scoref2scoref_tyvar2typ(f, i_1);
  }, i);
}
export function gparam_scoref2scoref_tyvar2typ(_f, i) {
  return i;
}
export function morphILScopeRefsInILTypeRef(fscope, x) {
  return ILTypeRef.Create(fscope(x.Scope), x.Enclosing, x.Name);
}
export function callsig_typ2typ(f, x) {
  return new ILCallingSignature(x.CallingConv, map_1(f, x.ArgTypes), f(x.ReturnType));
}
export function gparam_typ2typ(f, gf) {
  const Constraints = map_1(f, gf.Constraints);
  return new ILGenericParameterDef(gf.Name, Constraints, gf.Variance, gf.HasReferenceTypeConstraint, gf.HasNotNullableValueTypeConstraint, gf.HasDefaultConstructorConstraint, gf.CustomAttrsStored, gf.MetadataIndex);
}
export function gparams_typ2typ(f, gfs) {
  return map_1(function (gf) {
    return gparam_typ2typ(f, gf);
  }, gfs);
}
export function typs_typ2typ(f, x) {
  return map_1(f, x);
}
export function mref_typ2typ(f, x) {
  return ILMethodRef.Create(f(mkILBoxedType(mkILNonGenericTySpec(x.DeclaringTypeRef))).TypeRef, x.CallingConv, x.Name, x.GenericArity, map_1(f, x.ArgTypes), f(x.ReturnType));
}
export function mspec_typ2typ(_arg1_0, _arg1_1, x) {
  const _arg1 = [_arg1_0, _arg1_1];
  return mkILMethSpecForMethRefInTy(mref_typ2typ(CurriedLambda(_arg1[1])(new Choice(0, x)), x.MethodRef), _arg1[0](x.DeclaringType), typs_typ2typ(_arg1[0], x.GenericArgs));
}
export function fref_typ2typ(f, x) {
  const DeclaringTypeRef = f(mkILBoxedType(mkILNonGenericTySpec(x.DeclaringTypeRef))).TypeRef;
  const Type = f(x.Type);
  return new ILFieldRef(DeclaringTypeRef, x.Name, Type);
}
export function fspec_typ2typ(_arg1_0, _arg1_1, x) {
  const _arg1 = [_arg1_0, _arg1_1];
  return new ILFieldSpec(fref_typ2typ(CurriedLambda(_arg1[1])(new Choice(1, x)), x.FieldRef), _arg1[0](x.DeclaringType));
}
export function celem_typ2typ(f, celem) {
  const $var1 = celem.tag === 14 ? celem.data != null ? [0, getValue(celem.data)] : [3] : celem.tag === 15 ? celem.data != null ? [1, getValue(celem.data)] : [3] : celem.tag === 16 ? [2, celem.data[0], celem.data[1]] : [3];

  switch ($var1[0]) {
    case 0:
      return new ILAttribElem(14, f($var1[1]));

    case 1:
      return new ILAttribElem(15, f(mkILBoxedType(mkILNonGenericTySpec($var1[1]))).TypeRef);

    case 2:
      return new ILAttribElem(16, [f($var1[1]), map_1(function (celem_1) {
        return celem_typ2typ(f, celem_1);
      }, $var1[2])]);

    case 3:
      return celem;
  }
}
export function cnamedarg_typ2typ(f, _arg1_0, _arg1_1, _arg1_2, _arg1_3) {
  const _arg1 = [_arg1_0, _arg1_1, _arg1_2, _arg1_3];
  return [_arg1[0], f(_arg1[1]), _arg1[2], celem_typ2typ(f, _arg1[3])];
}
export function cattr_typ2typ(ilg, f, c) {
  const meth = mspec_typ2typ(f, CurriedLambda(function (_arg1) {
    return f;
  }), c.Method);

  if (morphCustomAttributeData()) {
    try {
      const patternInput = decodeILAttribData(ilg, c);
      const elems = map_1(function (celem) {
        return celem_typ2typ(f, celem);
      }, patternInput[0]);
      const namedArgs = map_1(function (tupledArg) {
        return cnamedarg_typ2typ(f, tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3]);
      }, patternInput[1]);
      return mkILCustomAttribMethRef(ilg, meth, elems, namedArgs);
    } catch (matchValue) {
      return new ILAttribute(meth, c.Data, c.Elements);
    }
  } else {
    return new ILAttribute(meth, c.Data, c.Elements);
  }
}
export function cattrs_typ2typ(ilg, f, cs) {
  return mkILCustomAttrs(map_1(function (c) {
    return cattr_typ2typ(ilg, f, c);
  }, cs.AsList));
}
export function fdef_typ2typ(ilg, ftype, fd) {
  return fd.With(null, ftype(fd.FieldType), null, null, null, null, null, cattrs_typ2typ(ilg, ftype, fd.CustomAttrs));
}
export function local_typ2typ(f, l) {
  return new ILLocal(f(l.Type), l.IsPinned, l.DebugInfo);
}
export function varargs_typ2typ(f, varargs) {
  return defaultArg(varargs, null, function (list) {
    return map_1(f, list);
  });
}
export function morphILTypesInILInstr(_arg1_0, _arg1_1, i) {
  const _arg1 = [_arg1_0, _arg1_1];
  const factualty = CurriedLambda(_arg1[0])(i);

  const conv_fspec = function (fr) {
    return fspec_typ2typ(factualty, CurriedLambda(_arg1[1])(i), fr);
  };

  const conv_mspec = function (mr) {
    return mspec_typ2typ(factualty, CurriedLambda(_arg1[1])(i), mr);
  };

  switch (i.tag) {
    case 51:
      return new ILInstr(51, [i.data[0], callsig_typ2typ(factualty, i.data[1]), varargs_typ2typ(factualty, i.data[2])]);

    case 48:
      return new ILInstr(48, [i.data[0], conv_mspec(i.data[1]), varargs_typ2typ(factualty, i.data[2])]);

    case 49:
      return new ILInstr(49, [i.data[0], conv_mspec(i.data[1]), varargs_typ2typ(factualty, i.data[2])]);

    case 50:
      return new ILInstr(50, [i.data[0], factualty(i.data[1]), conv_mspec(i.data[2]), varargs_typ2typ(factualty, i.data[3])]);

    case 53:
      return new ILInstr(53, [conv_mspec(i.data[0]), varargs_typ2typ(factualty, i.data[1])]);

    case 52:
      return new ILInstr(52, conv_mspec(i.data));

    case 69:
      return new ILInstr(69, conv_mspec(i.data));

    case 60:
      return new ILInstr(60, [i.data[0], i.data[1], conv_fspec(i.data[2])]);

    case 59:
      return new ILInstr(59, [i.data[0], conv_fspec(i.data[1])]);

    case 61:
      return new ILInstr(61, conv_fspec(i.data));

    case 62:
      return new ILInstr(62, conv_fspec(i.data));

    case 64:
      return new ILInstr(64, [i.data[0], i.data[1], conv_fspec(i.data[2])]);

    case 63:
      return new ILInstr(63, [i.data[0], conv_fspec(i.data[1])]);

    case 67:
      return new ILInstr(67, factualty(i.data));

    case 66:
      return new ILInstr(66, factualty(i.data));

    case 71:
      return new ILInstr(71, factualty(i.data));

    case 70:
      return new ILInstr(70, factualty(i.data));

    case 73:
      return new ILInstr(73, [i.data[0], i.data[1], factualty(i.data[2])]);

    case 72:
      return new ILInstr(72, [i.data[0], i.data[1], factualty(i.data[2])]);

    case 74:
      return new ILInstr(74, factualty(i.data));

    case 75:
      return new ILInstr(75, factualty(i.data));

    case 76:
      return new ILInstr(76, factualty(i.data));

    case 81:
      return new ILInstr(81, [i.data[0], factualty(i.data[1])]);

    case 82:
      return new ILInstr(82, [i.data[0], factualty(i.data[1])]);

    case 83:
      return new ILInstr(83, [i.data[0], factualty(i.data[1])]);

    case 80:
      return new ILInstr(80, [i.data[0], i.data[1], i.data[2], factualty(i.data[3])]);

    case 77:
      return new ILInstr(77, factualty(i.data));

    case 68:
      if (i.data.tag === 1) {
        return new ILInstr(68, new ILToken(1, conv_mspec(i.data.data)));
      } else if (i.data.tag === 2) {
        return new ILInstr(68, new ILToken(2, conv_fspec(i.data.data)));
      } else {
        return new ILInstr(68, new ILToken(0, factualty(i.data.data)));
      }

    default:
      return i;
  }
}
export function return_typ2typ(ilg, f, r) {
  const Type = f(r.Type);
  const CustomAttrsStored = storeILCustomAttrs(cattrs_typ2typ(ilg, f, r.CustomAttrs));
  return new ILReturn(r.Marshal, Type, CustomAttrsStored, r.MetadataIndex);
}
export function param_typ2typ(ilg, f, p) {
  const Type = f(p.Type);
  const CustomAttrsStored = storeILCustomAttrs(cattrs_typ2typ(ilg, f, p.CustomAttrs));
  return new ILParameter(p.Name, Type, p.Default, p.Marshal, p.IsIn, p.IsOut, p.IsOptional, CustomAttrsStored, p.MetadataIndex);
}
export function morphILMethodDefs(f, m) {
  return mkILMethods(map_1(f, m.AsList));
}
export function fdefs_fdef2fdef(f, m) {
  return mkILFields(map_1(f, m.AsList));
}
export function morphILTypeDefs(f, m) {
  return mkILTypeDefsFromArray(map(f, m.AsArray, Array));
}
export function locals_typ2typ(f, ls) {
  return map_1(function (l) {
    return local_typ2typ(f, l);
  }, ls);
}
export function ilmbody_instr2instr_typ2typ(fs_0, fs_1, il) {
  const fs = [fs_0, fs_1];
  const Code = code_instr2instr_typ2typ(fs[0], fs[1], il.Code);
  const Locals = locals_typ2typ(fs[1], il.Locals);
  return new ILMethodBody(il.IsZeroInit, il.MaxStack, il.NoInlining, il.AggressiveInlining, Locals, Code, il.SourceMarker);
}
export function morphILMethodBody(filmbody, x) {
  let c;
  const matchValue = x.Contents;

  if (matchValue.tag === 0) {
    c = new MethodBody(0, filmbody(matchValue.data));
  } else {
    c = matchValue;
  }

  return mkMethBodyAux(c);
}
export function ospec_typ2typ(f, _arg1) {
  return new ILOverridesSpec(0, [mref_typ2typ(f, _arg1.data[0]), f(_arg1.data[1])]);
}
export function mdef_typ2typ_ilmbody2ilmbody(ilg, fs_0, fs_1, md) {
  const fs = [fs_0, fs_1];
  const ftype_ = CurriedLambda(fs[0])(md);
  const body_ = morphILMethodBody(CurriedLambda(fs[1])(md), md.Body);
  return md.With(null, null, null, null, map_1(function (p) {
    return param_typ2typ(ilg, ftype_, p);
  }, md.Parameters), return_typ2typ(ilg, ftype_, md.Return), body_, null, null, gparams_typ2typ(ftype_, md.GenericParams), cattrs_typ2typ(ilg, ftype_, md.CustomAttrs));
}
export function fdefs_typ2typ(ilg, f, x) {
  return fdefs_fdef2fdef(function (fd) {
    return fdef_typ2typ(ilg, f, fd);
  }, x);
}
export function mdefs_typ2typ_ilmbody2ilmbody(ilg, fs_0, fs_1, x) {
  const fs = [fs_0, fs_1];
  return morphILMethodDefs(function (md) {
    return mdef_typ2typ_ilmbody2ilmbody(ilg, fs[0], fs[1], md);
  }, x);
}
export function mimpl_typ2typ(f, e) {
  return new ILMethodImplDef(ospec_typ2typ(f, e.Overrides), mspec_typ2typ(f, CurriedLambda(function (_arg1) {
    return f;
  }), e.OverrideBy));
}
export function edef_typ2typ(ilg, f, e) {
  return e.With(makeSome(defaultArg(e.EventType, null, f)), null, null, mref_typ2typ(f, e.AddMethod), mref_typ2typ(f, e.RemoveMethod), makeSome(defaultArg(e.FireMethod, null, function (x) {
    return mref_typ2typ(f, x);
  })), map_1(function (x_1) {
    return mref_typ2typ(f, x_1);
  }, e.OtherMethods), cattrs_typ2typ(ilg, f, e.CustomAttrs));
}
export function pdef_typ2typ(ilg, f, p) {
  return p.With(null, null, makeSome(defaultArg(p.SetMethod, null, function (x) {
    return mref_typ2typ(f, x);
  })), makeSome(defaultArg(p.GetMethod, null, function (x_1) {
    return mref_typ2typ(f, x_1);
  })), null, f(p.PropertyType), null, map_1(f, p.Args), cattrs_typ2typ(ilg, f, p.CustomAttrs));
}
export function pdefs_typ2typ(ilg, f, pdefs) {
  return mkILProperties(map_1(function (p) {
    return pdef_typ2typ(ilg, f, p);
  }, pdefs.AsList));
}
export function edefs_typ2typ(ilg, f, edefs) {
  return mkILEvents(map_1(function (e) {
    return edef_typ2typ(ilg, f, e);
  }, edefs.AsList));
}
export function mimpls_typ2typ(f, mimpls) {
  return mkILMethodImpls(map_1(function (e) {
    return mimpl_typ2typ(f, e);
  }, mimpls.AsList));
}
export function tdef_typ2typ_ilmbody2ilmbody_mdefs2mdefs(ilg, enc, fs_0, fs_1, td) {
  var enc_1;
  var tdefs;
  const fs = [fs_0, fs_1];
  const ftype_ = CurriedLambda(fs[0])([enc, td], null);
  const mdefs_ = fs[1]([enc, td], td.Methods);
  const fdefs_ = fdefs_typ2typ(ilg, ftype_, td.Fields);
  return td.With(null, null, null, map_1(ftype_, td.Implements), gparams_typ2typ(ftype_, td.GenericParams), makeSome(defaultArg(td.Extends, null, ftype_)), mdefs_, (enc_1 = append(enc, ofArray([td])), tdefs = td.NestedTypes, tdefs_typ2typ_ilmbody2ilmbody_mdefs2mdefs(ilg, enc_1, fs[0], fs[1], tdefs)), fdefs_, mimpls_typ2typ(ftype_, td.MethodImpls), edefs_typ2typ(ilg, ftype_, td.Events), pdefs_typ2typ(ilg, ftype_, td.Properties), cattrs_typ2typ(ilg, ftype_, td.CustomAttrs));
}
export function tdefs_typ2typ_ilmbody2ilmbody_mdefs2mdefs(ilg, enc, fs_0, fs_1, tdefs) {
  const fs = [fs_0, fs_1];
  return morphILTypeDefs(function (td) {
    return tdef_typ2typ_ilmbody2ilmbody_mdefs2mdefs(ilg, enc, fs[0], fs[1], td);
  }, tdefs);
}
export function manifest_typ2typ(ilg, f, m) {
  const CustomAttrsStored = storeILCustomAttrs(cattrs_typ2typ(ilg, f, m.CustomAttrs));
  return new ILAssemblyManifest(m.Name, m.AuxModuleHashAlgorithm, m.SecurityDeclsStored, m.PublicKey, m.Version, m.Locale, CustomAttrsStored, m.AssemblyLongevity, m.DisableJitOptimizations, m.JitTracking, m.IgnoreSymbolStoreSequencePoints, m.Retargetable, m.ExportedTypes, m.EntrypointElsewhere, m.MetadataIndex);
}
export function morphILTypeInILModule_ilmbody2ilmbody_mdefs2mdefs(ilg, ftype, fmdefs, m) {
  var f;
  let ftdefs;
  const enc = new List();
  const arg20_ = CurriedLambda(ftype)(m);
  const arg21_ = CurriedLambda(fmdefs)(m);

  ftdefs = function (tdefs) {
    return tdefs_typ2typ_ilmbody2ilmbody_mdefs2mdefs(ilg, enc, arg20_, arg21_, tdefs);
  };

  const TypeDefs = ftdefs(m.TypeDefs);
  const CustomAttrsStored = storeILCustomAttrs(cattrs_typ2typ(ilg, CurriedLambda(ftype)(m, null, null), m.CustomAttrs));
  return new ILModuleDef(defaultArg(m.Manifest, null, (f = CurriedLambda(ftype)(m, null, null), function (m_1) {
    return manifest_typ2typ(ilg, f, m_1);
  })), m.Name, TypeDefs, m.SubsystemVersion, m.UseHighEntropyVA, m.SubSystemFlags, m.IsDLL, m.IsILOnly, m.Platform, m.StackReserveSize, m.Is32Bit, m.Is32BitPreferred, m.Is64Bit, m.VirtualAlignment, m.PhysicalAlignment, m.ImageBase, m.MetadataVersion, m.Resources, m.NativeResources, CustomAttrsStored, m.MetadataIndex);
}
export function module_instr2instr_typ2typ(ilg, fs_0, fs_1, x) {
  const fs = [fs_0, fs_1];
  const filmbody = CurriedLambda(function (modCtxt, tdefCtxt, mdefCtxt) {
    const arg00_ = CurriedLambda(fs[0])(modCtxt, tdefCtxt, mdefCtxt);
    const arg01_ = CurriedLambda(fs[1])(modCtxt, tdefCtxt, mdefCtxt);
    return function (il) {
      return ilmbody_instr2instr_typ2typ(arg00_, arg01_, il);
    };
  });
  const fmdefs = CurriedLambda(function (modCtxt_1, tdefCtxt_1) {
    const arg10_ = CurriedLambda(fs[1])(modCtxt_1, tdefCtxt_1);
    const arg11_ = CurriedLambda(filmbody)(modCtxt_1, tdefCtxt_1);
    return function (x_1) {
      return mdefs_typ2typ_ilmbody2ilmbody(ilg, arg10_, arg11_, x_1);
    };
  });
  return morphILTypeInILModule_ilmbody2ilmbody_mdefs2mdefs(ilg, fs[1], fmdefs, x);
}
export function morphILInstrsAndILTypesInILModule(ilg, f1, f2, x) {
  return module_instr2instr_typ2typ(ilg, f1, f2, x);
}
export function morphILInstrsInILCode(f, x) {
  return code_instr2instrs(f, x);
}
export function morphILTypeInILModule(ilg, ftype, y) {
  const finstr = CurriedLambda(function (modCtxt, tdefCtxt, mdefCtxt) {
    const fty = CurriedLambda(ftype)(modCtxt, tdefCtxt, mdefCtxt);

    const arg00_ = function (_instrCtxt) {
      return fty;
    };

    const arg01_ = function (_instrCtxt_1, _formalCtxt) {
      return fty;
    };

    return function (i) {
      return morphILTypesInILInstr(($var2, $var3) => arg00_($var2)($var3), ($var4, $var5, $var6) => arg01_($var4, $var5)($var6), i);
    };
  });
  return morphILInstrsAndILTypesInILModule(ilg, finstr, ftype, y);
}
export function morphILTypeRefsInILModuleMemoized(ilg, f, modul) {
  const fty = Tables.memoize(function (x) {
    return typ_tref2tref(f, x);
  });
  return morphILTypeInILModule(ilg, function (_arg3, _arg2, _arg1, ty) {
    return fty(ty);
  }, modul);
}
export function morphILScopeRefsInILModuleMemoized(ilg, f, modul) {
  return morphILTypeRefsInILModuleMemoized(ilg, function (arg10_) {
    return morphILScopeRefsInILTypeRef(f, arg10_);
  }, modul);
}