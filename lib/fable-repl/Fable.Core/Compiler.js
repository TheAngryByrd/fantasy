import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { Interface, comparePrimitives, compareRecords, equalsRecords, makeGeneric } from "../fable-core/Util";
import _Map from "../fable-core/Map";
export class CompilerOptions {
  constructor(fableCore, emitReplacements, typedArrays, clampByteArrays, declaration) {
    this.fableCore = fableCore;
    this.emitReplacements = emitReplacements;
    this.typedArrays = typedArrays;
    this.clampByteArrays = clampByteArrays;
    this.declaration = declaration;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.CompilerOptions",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        fableCore: "string",
        emitReplacements: makeGeneric(_Map, {
          Key: "string",
          Value: "string"
        }),
        typedArrays: "boolean",
        clampByteArrays: "boolean",
        declaration: "boolean"
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
setType("Fable.CompilerOptions", CompilerOptions);
export class Severity {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Severity",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Warning"], ["Error"], ["Info"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Fable.Severity", Severity);
export class PluginInfo {
  constructor(path, plugin) {
    this.path = path;
    this.plugin = plugin;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.PluginInfo",
      interfaces: ["FSharpRecord", "System.IEquatable"],
      properties: {
        path: "string",
        plugin: Interface("Fable.IPlugin")
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Fable.PluginInfo", PluginInfo);