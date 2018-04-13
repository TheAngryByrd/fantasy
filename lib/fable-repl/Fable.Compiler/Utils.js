import { tryGetValue } from "../fable-core/Map";
import CurriedLambda from "../fable-core/CurriedLambda";
import { printf, toText } from "../fable-core/String";
import { getValue } from "../fable-core/Option";
import { tryPick } from "../fable-core/Seq";
export const Extensions = function (__exports) {
  const Dictionary_2_GetOrAdd = __exports["Dictionary`2.GetOrAdd"] = function (key, addFn) {
    const matchValue = tryGetValue(this, key, null);

    if (matchValue[0]) {
      return matchValue[1];
    } else {
      const v = addFn();
      this.set(key, v);
      return v;
    }
  };

  const Dictionary_2_AddOrUpdate = __exports["Dictionary`2.AddOrUpdate"] = function (key, addFn, updateFn) {
    let v;
    const matchValue = tryGetValue(this, key, null);

    if (matchValue[0]) {
      this.delete(key);
      v = updateFn(key, matchValue[1]);
    } else {
      v = addFn(key);
    }

    this.set(key, v);
    return v;
  };

  return __exports;
}({});
export const Plugins = function (__exports) {
  const tryPlugin = __exports.tryPlugin = function (r, f) {
    var chooser;
    return CurriedLambda((chooser = function (tupledArg) {
      try {
        return f(tupledArg[1]);
      } catch (matchValue) {
        if (r != null) {
          throw new Error(toText(printf("Error in plugin %s: %s %O"))(tupledArg[0], matchValue.message, getValue(r)), matchValue);
        } else {
          throw new Error(toText(printf("Error in plugin %s: %s"))(tupledArg[0], matchValue.message), matchValue);
        }
      }
    }, function (source) {
      return tryPick(chooser, source);
    }));
  };

  return __exports;
}({});