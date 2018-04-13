import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equalsRecords } from "../fable-core/Util";
import CurriedLambda from "../fable-core/CurriedLambda";
import { System } from "../fcs-fable/adapters";
import { trim, endsWith } from "../fable-core/String";
import { Shim } from "../absil/illib";
export class IllegalFileNameChar extends Error {
  constructor(data0, data1) {
    super();
    Object.setPrototypeOf(this, IllegalFileNameChar.prototype);
    this.Data0 = data0;
    this.Data1 = data1;
  }

  [_Symbol.reflection]() {
    return {
      type: "Internal.Utilities.Filename.IllegalFileNameChar",
      interfaces: ["FSharpException"],
      properties: {
        Data0: "string",
        Data1: "string"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

}
setType("Internal.Utilities.Filename.IllegalFileNameChar", IllegalFileNameChar);
export const checkPathForIllegalChars = CurriedLambda((() => {
  const chars = new Set(System.IO.Path.GetInvalidPathChars());
  return function (path) {
    for (let c of path) {
      if (chars.has(c)) {
        throw new IllegalFileNameChar(path, c);
      }
    }
  };
})());
export function checkSuffix(x, y) {
  return endsWith(x, y, 4);
}
export function hasExtensionWithValidate(validate, s) {
  if (validate) {
    checkPathForIllegalChars(s);
  }

  const sLen = s.length | 0;

  if (((sLen >= 1 ? s[sLen - 1] === "." : false) ? s !== ".." : false) ? s !== "." : false) {
    return true;
  } else {
    return System.IO.Path.HasExtension(s);
  }
}
export function hasExtension(s) {
  return hasExtensionWithValidate(true, s);
}
export function chopExtension(s) {
  checkPathForIllegalChars(s);

  if (s === ".") {
    return "";
  } else {
    if (!hasExtensionWithValidate(false, s)) {
      throw new Error("chopExtension");
    }

    return System.IO.Path.Combine(System.IO.Path.GetDirectoryName(s), System.IO.Path.GetFileNameWithoutExtension(s));
  }
}
export function directoryName(s) {
  checkPathForIllegalChars(s);

  if (s === "") {
    return ".";
  } else {
    const matchValue = System.IO.Path.GetDirectoryName(s);

    if (matchValue == null) {
      if (Shim.FileSystem().IsPathRootedShim(s)) {
        return s;
      } else {
        return ".";
      }
    } else if (matchValue === "") {
      return ".";
    } else {
      return matchValue;
    }
  }
}
export function fileNameOfPath(s) {
  checkPathForIllegalChars(s);
  return System.IO.Path.GetFileName(s);
}
export function fileNameWithoutExtensionWithValidate(validate, s) {
  if (validate) {
    checkPathForIllegalChars(s);
  }

  return System.IO.Path.GetFileNameWithoutExtension(s);
}
export function fileNameWithoutExtension(s) {
  return fileNameWithoutExtensionWithValidate(true, s);
}
export function trimQuotes(s) {
  return trim(s, "both", " ", "\"");
}