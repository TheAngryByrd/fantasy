import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives } from "../fable-core/Util";
export class FSharpGlyph {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGlyph",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Class"], ["Constant"], ["Delegate"], ["Enum"], ["EnumMember"], ["Event"], ["Exception"], ["Field"], ["Interface"], ["Method"], ["OverridenMethod"], ["Module"], ["NameSpace"], ["Property"], ["Struct"], ["Typedef"], ["Type"], ["Union"], ["Variable"], ["ExtensionMethod"], ["Error"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpGlyph", FSharpGlyph);