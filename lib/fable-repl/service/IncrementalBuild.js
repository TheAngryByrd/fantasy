import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { getValue } from "../fable-core/Option";
export class IncrementalBuilder {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.IncrementalBuilder",
      properties: {
        IsAlive: "boolean"
      }
    };
  }

  constructor() {}

  IncrementUsageCount() {
    const $var1 = this;
    return {
      Dispose() {},

      [_Symbol.reflection]() {
        return {
          interfaces: ["System.IDisposable"]
        };
      }

    };
  }

  get IsAlive() {
    return false;
  }

  static KeepBuilderAlive(builderOpt) {
    if (builderOpt == null) {
      return {
        Dispose() {},

        [_Symbol.reflection]() {
          return {
            interfaces: ["System.IDisposable"]
          };
        }

      };
    } else {
      return getValue(builderOpt).IncrementUsageCount();
    }
  }

}
setType("Microsoft.FSharp.Compiler.IncrementalBuilder", IncrementalBuilder);