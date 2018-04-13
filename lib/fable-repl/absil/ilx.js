import { String as _String } from "./illib";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { instILType, mkILFormalGenericArgs, ILSourceMarker, ILAttribute, ILMemberAccess, mkILCtorMethSpecForTy, mkILTySpec, mkILBoxedType, instILTypeAux, ILParameter, ILGenericParameterDef, mkILNamedTy, ILTypeRef, ILBoxity, ILAttributes, ILType, ILFieldDef } from "./il";
import { Option, Any, compareRecords, equalsRecords, compareUnions, equals, makeGeneric, comparePrimitives, Array as _Array } from "../fable-core/Util";
import { map } from "../fable-core/Array";
import List from "../fable-core/List";
import { toList } from "../fable-core/Seq";
export function mkLowerName(nm) {
  const lowerName = _String.uncapitalize(nm);

  if (lowerName === nm) {
    return "_" + nm;
  } else {
    return lowerName;
  }
}
export class IlxUnionField {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionField",
      properties: {
        ILField: ILFieldDef,
        LowerName: "string",
        Name: "string",
        Type: ILType
      }
    };
  }

  constructor(fd) {
    this.fd = fd;
    this.lowerName = mkLowerName(this.fd.Name);
  }

  get ILField() {
    return this.fd;
  }

  get Type() {
    return this.ILField.FieldType;
  }

  get Name() {
    return this.ILField.Name;
  }

  get LowerName() {
    return this.lowerName;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionField", IlxUnionField);
export class IlxUnionAlternative {
  constructor(altName, altFields, altCustomAttrs) {
    this.altName = altName;
    this.altFields = altFields;
    this.altCustomAttrs = altCustomAttrs;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionAlternative",
      interfaces: ["FSharpRecord"],
      properties: {
        altName: "string",
        altFields: _Array(IlxUnionField),
        altCustomAttrs: ILAttributes
      }
    };
  }

  get FieldDefs() {
    return this.altFields;
  }

  FieldDef(n) {
    return this.altFields[n];
  }

  get Name() {
    return this.altName;
  }

  get IsNullary() {
    return this.FieldDefs.length === 0;
  }

  get FieldTypes() {
    return map(fd => fd.Type, this.FieldDefs, Array);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionAlternative", IlxUnionAlternative);
export class IlxUnionHasHelpers {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionHasHelpers",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NoHelpers"], ["AllHelpers"], ["SpecialFSharpListHelpers"], ["SpecialFSharpOptionHelpers"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionHasHelpers", IlxUnionHasHelpers);
export class IlxUnionRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionRef",
      interfaces: ["FSharpUnion"],
      cases: [["IlxUnionRef", ILBoxity, ILTypeRef, _Array(IlxUnionAlternative), "boolean", IlxUnionHasHelpers]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionRef", IlxUnionRef);
export class IlxUnionSpec {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionSpec",
      interfaces: ["FSharpUnion"],
      cases: [["IlxUnionSpec", IlxUnionRef, makeGeneric(List, {
        T: ILType
      })]]
    };
  }

  get DeclaringType() {
    const tref = this.data[0].data[1];
    const bx = this.data[0].data[0];
    return mkILNamedTy(bx, tref, this.data[1]);
  }

  get Boxity() {
    const bx = this.data[0].data[0];
    return bx;
  }

  get TypeRef() {
    const tref = this.data[0].data[1];
    return tref;
  }

  get GenericArgs() {
    return this.data[1];
  }

  get AlternativesArray() {
    const alts = this.data[0].data[2];
    return alts;
  }

  get IsNullPermitted() {
    const np = this.data[0].data[3];
    return np;
  }

  get HasHelpers() {
    const b = this.data[0].data[4];
    return b;
  }

  get Alternatives() {
    return toList(this.AlternativesArray);
  }

  Alternative(idx) {
    return this.AlternativesArray[idx];
  }

  FieldDef(idx, fidx) {
    return this.Alternative(idx).FieldDef(fidx);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionSpec", IlxUnionSpec);
export class IlxClosureLambdas {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureLambdas",
      interfaces: ["FSharpUnion"],
      cases: [["Lambdas_forall", ILGenericParameterDef, IlxClosureLambdas], ["Lambdas_lambda", ILParameter, IlxClosureLambdas], ["Lambdas_return", ILType]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureLambdas", IlxClosureLambdas);
export class IlxClosureApps {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureApps",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Apps_tyapp", ILType, IlxClosureApps], ["Apps_app", ILType, IlxClosureApps], ["Apps_done", ILType]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureApps", IlxClosureApps);
export function instAppsAux(n, inst, _arg1) {
  if (_arg1.tag === 1) {
    return new IlxClosureApps(1, [instILTypeAux(n, inst, _arg1.data[0]), instAppsAux(n, inst, _arg1.data[1])]);
  } else if (_arg1.tag === 2) {
    return new IlxClosureApps(2, instILTypeAux(n, inst, _arg1.data));
  } else {
    return new IlxClosureApps(0, [instILTypeAux(n, inst, _arg1.data[0]), instAppsAux(n, inst, _arg1.data[1])]);
  }
}
export function instLambdasAux(n, inst, _arg1) {
  var Type;

  if (_arg1.tag === 1) {
    return new IlxClosureLambdas(1, [(Type = instILTypeAux(n, inst, _arg1.data[0].Type), new ILParameter(_arg1.data[0].Name, Type, _arg1.data[0].Default, _arg1.data[0].Marshal, _arg1.data[0].IsIn, _arg1.data[0].IsOut, _arg1.data[0].IsOptional, _arg1.data[0].CustomAttrsStored, _arg1.data[0].MetadataIndex)), instLambdasAux(n, inst, _arg1.data[1])]);
  } else if (_arg1.tag === 2) {
    return new IlxClosureLambdas(2, instILTypeAux(n, inst, _arg1.data));
  } else {
    return new IlxClosureLambdas(0, [_arg1.data[0], instLambdasAux(n, inst, _arg1.data[1])]);
  }
}
export function instLambdas(i, t) {
  return instLambdasAux(0, i, t);
}
export class IlxClosureFreeVar {
  constructor(fvName, fvCompilerGenerated, fvType) {
    this.fvName = fvName;
    this.fvCompilerGenerated = fvCompilerGenerated;
    this.fvType = fvType;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureFreeVar",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        fvName: "string",
        fvCompilerGenerated: "boolean",
        fvType: ILType
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
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureFreeVar", IlxClosureFreeVar);
export function mkILFreeVar(name, compgen, ty) {
  return new IlxClosureFreeVar(name, compgen, ty);
}
export class IlxClosureRef {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureRef",
      interfaces: ["FSharpUnion"],
      cases: [["IlxClosureRef", ILTypeRef, IlxClosureLambdas, _Array(IlxClosureFreeVar)]]
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureRef", IlxClosureRef);
export class IlxClosureSpec {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureSpec",
      interfaces: ["FSharpUnion"],
      cases: [["IlxClosureSpec", IlxClosureRef, makeGeneric(List, {
        T: ILType
      }), ILType]]
    };
  }

  get TypeRef() {
    const patternInput = this.ClosureRef;
    return patternInput.data[0];
  }

  get ILType() {
    return this.data[2];
  }

  get ClosureRef() {
    return this.data[0];
  }

  get FormalFreeVars() {
    const patternInput = this.ClosureRef;
    return patternInput.data[2];
  }

  get FormalLambdas() {
    const patternInput = this.ClosureRef;
    return patternInput.data[1];
  }

  get GenericArgs() {
    return this.data[1];
  }

  static Create(cloref, inst) {
    return new IlxClosureSpec(0, [cloref, inst, mkILBoxedType(mkILTySpec(cloref.data[0], inst))]);
  }

  get Constructor() {
    const cloTy = this.ILType;
    const fields = this.FormalFreeVars;
    return mkILCtorMethSpecForTy(cloTy, toList(map(fv => fv.fvType, fields, Array)));
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureSpec", IlxClosureSpec);
export class IlxClosureInfo {
  constructor(cloStructure, cloFreeVars, cloCode) {
    this.cloStructure = cloStructure;
    this.cloFreeVars = cloFreeVars;
    this.cloCode = cloCode;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureInfo",
      interfaces: ["FSharpRecord"],
      properties: {
        cloStructure: IlxClosureLambdas,
        cloFreeVars: _Array(IlxClosureFreeVar),
        cloCode: Any
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxClosureInfo", IlxClosureInfo);
export class IlxUnionInfo {
  constructor(cudReprAccess, cudHelpersAccess, cudHasHelpers, cudDebugProxies, cudDebugDisplayAttributes, cudAlternatives, cudNullPermitted, cudWhere) {
    this.cudReprAccess = cudReprAccess;
    this.cudHelpersAccess = cudHelpersAccess;
    this.cudHasHelpers = cudHasHelpers;
    this.cudDebugProxies = cudDebugProxies;
    this.cudDebugDisplayAttributes = cudDebugDisplayAttributes;
    this.cudAlternatives = cudAlternatives;
    this.cudNullPermitted = cudNullPermitted;
    this.cudWhere = cudWhere;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionInfo",
      interfaces: ["FSharpRecord"],
      properties: {
        cudReprAccess: ILMemberAccess,
        cudHelpersAccess: ILMemberAccess,
        cudHasHelpers: IlxUnionHasHelpers,
        cudDebugProxies: "boolean",
        cudDebugDisplayAttributes: makeGeneric(List, {
          T: ILAttribute
        }),
        cudAlternatives: _Array(IlxUnionAlternative),
        cudNullPermitted: "boolean",
        cudWhere: Option(ILSourceMarker)
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.Types.IlxUnionInfo", IlxUnionInfo);
export function destTyFuncApp(_arg1) {
  if (_arg1.tag === 0) {
    return [_arg1.data[0], _arg1.data[1]];
  } else {
    throw new Error("destTyFuncApp");
  }
}
export function mkILFormalCloRef(gparams, csig) {
  return IlxClosureSpec.Create(csig, mkILFormalGenericArgs(0, gparams));
}
export function actualTypOfIlxUnionField(cuspec, idx, fidx) {
  return instILType(cuspec.GenericArgs, function (arg00, arg10) {
    return cuspec.FieldDef(arg00, arg10);
  }(idx, fidx).Type);
}