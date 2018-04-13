import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives } from "../fable-core/Util";
import { parseILVersion, PublicKey, ILAssemblyRef, ILScopeRef } from "../absil/il";
import { Bytes } from "../absil/bytes";
import { getValue } from "../fable-core/Option";
export class IlxCallImplementation {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.IlxSettings.IlxCallImplementation",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["VirtEntriesVirtCode"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.AbstractIL.Extensions.ILX.IlxSettings.IlxCallImplementation", IlxCallImplementation);
export const ilxCompilingFSharpCoreLib = {
  contents: false
};
export const ilxFsharpCoreLibAssemRef = {
  contents: null
};
export function ilxFsharpCoreLibScopeRef() {
  if (ilxCompilingFSharpCoreLib.contents) {
    return new ILScopeRef(0);
  } else {
    let assref;
    const matchValue = ilxFsharpCoreLibAssemRef.contents;

    if (matchValue == null) {
      assref = ILAssemblyRef.Create("FSharp.Core", null, new PublicKey(1, Bytes.ofInt32Array(new Int32Array([176, 63, 95, 127, 17, 213, 10, 58]))), false, parseILVersion("0.0.0.0"), null);
    } else {
      assref = getValue(matchValue);
    }

    return new ILScopeRef(2, assref);
  }
}
export function ilxNamespace() {
  return "Microsoft.FSharp.Core";
}