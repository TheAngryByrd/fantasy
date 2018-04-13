import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { comparePrimitives, compareRecords, equalsRecords } from "../fable-core/Util";
import { split as split_1, isNullOrWhiteSpace, replace as replace_1, trim, join, endsWith, printf, toText } from "../fable-core/String";
import { tryGetValue, tryFind } from "../fable-core/Map";
import { makeSome, getValue } from "../fable-core/Option";
import { create } from "../fable-core/Set";
import { ofArray } from "../fable-core/List";
import Comparer from "../fable-core/Comparer";
import { isDigit, isLetterOrDigit } from "../fable-core/Char";
import { toList, map, delay } from "../fable-core/Seq";
export class Position {
  constructor(line, column) {
    this.line = line | 0;
    this.column = column | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Position",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        line: "number",
        column: "number"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static get Empty() {
    return new Position(1, 0);
  }

}
setType("Fable.Position", Position);
export class SourceLocation {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.SourceLocation",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        start: Position,
        end: Position
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  Collapse() {
    return new SourceLocation(this.start, this.start);
  }

  static op_Addition(r1, r2) {
    return new SourceLocation(r1.start, r2.end);
  }

  static get Empty() {
    return new SourceLocation(Position.Empty, Position.Empty);
  }

  ToString() {
    return toText(printf("(L%i,%i-L%i,%i)"))(this.start.line, this.start.column, this.end.line, this.end.column);
  }

}
setType("Fable.SourceLocation", SourceLocation);

const _Map = function (__exports) {
  const findOrRun = __exports.findOrRun = function (f, k, m) {
    const matchValue = tryFind(k, m);

    if (matchValue != null) {
      return getValue(matchValue);
    } else {
      return f();
    }
  };

  return __exports;
}({});

export { _Map as Map };
export const Option = function (__exports) {
  const toBool = __exports.toBool = function (f, opt) {
    const $var1 = opt != null ? f(getValue(opt)) ? [0, getValue(opt)] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  };

  return __exports;
}({});
export const List = function (__exports) {
  const isSingle = __exports.isSingle = function (_arg1) {
    const $var2 = _arg1.tail != null ? _arg1.tail.tail == null ? [0, _arg1.head] : [1] : [1];

    switch ($var2[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  };

  const isMultiple = __exports.isMultiple = function (_arg1) {
    const $var3 = _arg1.tail != null ? _arg1.tail.tail == null ? [0] : [1] : [0];

    switch ($var3[0]) {
      case 0:
        return false;

      case 1:
        return true;
    }
  };

  const sameLength = __exports.sameLength = function (xs1, xs2) {
    sameLength: while (true) {
      const matchValue = [xs1, xs2];
      const $var4 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [1] : [2, matchValue[0].tail, matchValue[1].tail] : [3] : matchValue[1].tail != null ? [2, matchValue[0].tail, matchValue[1].tail] : [3] : matchValue[1].tail == null ? [0] : [3];

      switch ($var4[0]) {
        case 0:
          return true;

        case 1:
          return true;

        case 2:
          xs1 = $var4[1];
          xs2 = $var4[2];
          continue sameLength;

        case 3:
          return false;
      }
    }
  };

  return __exports;
}({});
export const Patterns = function (__exports) {
  const _Try___ = __exports["|Try|_|"] = function (f, a) {
    return f(a);
  };

  const _DicContains___ = __exports["|DicContains|_|"] = function (dic, key) {
    const patternInput = tryGetValue(dic, key, null);

    if (patternInput[0]) {
      return makeSome(patternInput[1]);
    } else {
      return null;
    }
  };

  const _SetContains___ = __exports["|SetContains|_|"] = function (set, item) {
    if (set.has(item)) {
      return makeSome(item);
    } else {
      return null;
    }
  };

  return __exports;
}({});
export const Naming = function (__exports) {
  const _StartsWith___ = __exports["|StartsWith|_|"] = function (pattern, txt) {
    if (txt.indexOf(pattern) === 0) {
      return pattern;
    } else {
      return null;
    }
  };

  const _EndsWith___ = __exports["|EndsWith|_|"] = function (pattern, txt) {
    if (endsWith(txt, pattern)) {
      return pattern;
    } else {
      return null;
    }
  };

  const targetFileExtension = __exports.targetFileExtension = "";
  const replacedInterfaces = __exports.replacedInterfaces = create(ofArray(["System.Collections.IEnumerable", "System.Collections.Generic.IEnumerable", "System.Collections.IEnumerator", "System.Collections.Generic.IEnumerator", "System.Collections.Generic.ICollection", "System.Collections.Generic.IList", "System.Collections.Generic.IDictionary", "System.Collections.Generic.ISet"]), new Comparer(comparePrimitives));
  const ignoredInterfaces = __exports.ignoredInterfaces = create(ofArray(["System.Collections.IStructuralEquatable", "System.Collections.IStructuralComparable", "System.Collections.IEnumerable", "System.Collections.IEnumerator"]), new Comparer(comparePrimitives));
  const ignoredInterfaceMethods = __exports.ignoredInterfaceMethods = create(ofArray(["System-Collections-IEnumerable-GetEnumerator", "System-Collections-IEnumerator-get_Current"]), new Comparer(comparePrimitives));
  const ignoredCompilerGenerated = __exports.ignoredCompilerGenerated = create(ofArray(["CompareTo", "Equals", "GetHashCode"]), new Comparer(comparePrimitives));
  const umdModules = __exports.umdModules = create(ofArray(["commonjs", "amd", "umd"]), new Comparer(comparePrimitives));

  const isIdentChar = __exports.isIdentChar = function (c) {
    if (isLetterOrDigit(c)) {
      return true;
    } else {
      return c === "_";
    }
  };

  const hasIdentForbiddenChars = __exports.hasIdentForbiddenChars = function (ident) {
    let i = 0;

    while (i < ident.length ? isIdentChar(ident[i]) : false) {
      i = i + 1 | 0;
    }

    return i < ident.length;
  };

  const replaceIdentForbiddenChars = __exports.replaceIdentForbiddenChars = function (ident) {
    return join("", delay(function () {
      return map(function (c) {
        return isIdentChar(c) ? c : toText(printf("$%X$"))(c.charCodeAt(0));
      }, ident);
    }));
  };

  const sanitizeIdentForbiddenChars = __exports.sanitizeIdentForbiddenChars = function (ident) {
    return Array.from(delay(function () {
      return map(function (c) {
        return isIdentChar(c) ? c : "_";
      }, ident);
    })).join("");
  };

  const hasGenericPlaceholder = __exports.hasGenericPlaceholder = function (ident) {
    const i = ident.indexOf("\\$'") | 0;

    if (i >= 0 ? i + 2 < ident.length : false) {
      return isIdentChar(ident[i + 2]);
    } else {
      return false;
    }
  };

  const replacePattern = __exports.replacePattern = function (prefix, cond, repl, str) {
    const replace = function (acc, s) {
      replace: while (true) {
        const i = s.indexOf(prefix) | 0;
        let i2 = i + prefix.length | 0;

        while ((i >= 0 ? i2 < s.length : false) ? cond(s[i2]) : false) {
          i2 = i2 + 1 | 0;
        }

        if (i2 === i + prefix.length) {
          if (acc.length > 0) {
            return acc + s;
          } else {
            return s;
          }
        } else {
          const pattern = s.substr(i, i2 - i);
          acc = acc + s.substr(0, i) + repl(pattern);
          s = s.substr(i2);
          continue replace;
        }
      }
    };

    return replace("", str);
  };

  const replaceGenericPlaceholder = __exports.replaceGenericPlaceholder = function (ident, onMatch) {
    return replacePattern("\\$'", function (c) {
      return isIdentChar(c);
    }, onMatch, ident);
  };

  const replaceGenericArgsCount = __exports.replaceGenericArgsCount = function (ident, replacement) {
    return replacePattern("`", function (arg00) {
      return isDigit(arg00);
    }, function (_arg1) {
      return replacement;
    }, ident);
  };

  const removeGetSetPrefix = __exports.removeGetSetPrefix = function (s) {
    if (s.indexOf("get_") === 0 ? true : s.indexOf("set_") === 0) {
      return s.substr(4);
    } else {
      return s;
    }
  };

  const extensionMethodName = __exports.extensionMethodName = function (s) {
    const i1 = s.indexOf(".") | 0;

    if (i1 < 0) {
      return s;
    } else {
      const i2 = s.indexOf(".", i1 + 1) | 0;

      if (i2 < 0) {
        return s;
      } else {
        return s.substr(i1 + 1, i2 - i1 - 1);
      }
    }
  };

  const lowerFirst = __exports.lowerFirst = function (s) {
    return s.substr(0, 1).toLowerCase() + s.substr(1);
  };

  const upperFirst = __exports.upperFirst = function (s) {
    return s.substr(0, 1).toUpperCase() + s.substr(1);
  };

  const jsKeywords = __exports.jsKeywords = create(ofArray(["__exports", "_genArgs", "abstract", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "self", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "undefined", "var", "void", "volatile", "while", "with", "yield", "Object", "Function", "Boolean", "Symbol", "Map", "Set", "NaN", "Number", "Math", "Date", "String", "RegExp", "JSON", "Promise", "Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "Attr", "CharacterData", "Comment", "CustomEvent", "Document", "DocumentFragment", "DocumentType", "DOMError", "DOMException", "DOMImplementation", "DOMString", "DOMTimeStamp", "DOMSettableTokenList", "DOMStringList", "DOMTokenList", "Element", "Event", "EventTarget", "Error", "HTMLCollection", "MutationObserver", "MutationRecord", "Node", "NodeFilter", "NodeIterator", "NodeList", "ProcessingInstruction", "Range", "Text", "TreeWalker", "URL", "Window", "Worker", "XMLDocument", "arguments", "fetch", "eval", "window", "console", "global"]), new Comparer(comparePrimitives));

  const preventConflicts = __exports.preventConflicts = function (conflicts, name) {
    const check = function (n) {
      check: while (true) {
        const name_1 = n > 0 ? name + "_" + n.toString() : name;

        if (!conflicts(name_1)) {
          return name_1;
        } else {
          n = n + 1;
          continue check;
        }
      }
    };

    return check(0);
  };

  const sanitizeIdent = __exports.sanitizeIdent = function (conflicts, name) {
    const sanitizedName = sanitizeIdentForbiddenChars(name);
    return function (name_1) {
      return preventConflicts(conflicts, name_1);
    }(function (_arg1) {
      return _arg1 ? "_" + sanitizedName : sanitizedName;
    }(jsKeywords.has(sanitizedName)));
  };

  return __exports;
}({});
export const Path = function (__exports) {
  const Combine = __exports.Combine = function (path1, path2) {
    return trim(path1, "end", "\\", "/") + "/" + trim(path2, "start", "\\", "/");
  };

  const Combine3 = __exports.Combine3 = function (path1, path2, path3) {
    return trim(path1, "end", "\\", "/") + "/" + trim(path2, "both", "\\", "/") + "/" + trim(path3, "start", "\\", "/");
  };

  const ChangeExtension = __exports.ChangeExtension = function (path, ext) {
    const i = path.lastIndexOf(".") | 0;

    if (i < 0) {
      return path;
    } else {
      return path.substr(0, i) + ext;
    }
  };

  const GetExtension = __exports.GetExtension = function (path) {
    const i = path.lastIndexOf(".") | 0;

    if (i < 0) {
      return "";
    } else {
      return path.substr(i);
    }
  };

  const GetFileName = __exports.GetFileName = function (path) {
    const normPath = trim(replace_1(path, "\\", "/"), "end", "/");
    const i = normPath.lastIndexOf("/") | 0;
    return path.substr(i + 1);
  };

  const GetFileNameWithoutExtension = __exports.GetFileNameWithoutExtension = function (path) {
    const filename = GetFileName(path);
    const i = filename.lastIndexOf(".") | 0;

    if (i < 0) {
      return filename;
    } else {
      return filename.substr(0, i);
    }
  };

  const GetDirectoryName = __exports.GetDirectoryName = function (path) {
    const normPath = replace_1(path, "\\", "/");
    const i = normPath.lastIndexOf("/") | 0;

    if (i < 0) {
      return "";
    } else {
      return path.substr(0, i);
    }
  };

  const GetFullPath = __exports.GetFullPath = function (path) {
    return path;
  };

  const normalizePath = __exports.normalizePath = function (path) {
    return replace_1(path, "\\", "/");
  };

  const normalizeFullPath = __exports.normalizeFullPath = function (path) {
    return normalizePath(GetFullPath(path));
  };

  const getRelativeFileOrDirPath = __exports.getRelativeFileOrDirPath = function (fromIsDir, fromFullPath, toIsDir, toFullPath) {
    const pathDifference = function (path1, path2) {
      let c = 0;
      let d = -1 | 0;

      while ((c < path1.length ? c < path2.length : false) ? path1[c] === path2[c] : false) {
        if (path1[c] === "/") {
          d = c | 0;
        }

        c = c + 1 | 0;
      }

      if (c === 0) {
        return path2;
      } else if (c === path1.length ? c === path2.length : false) {
        return "";
      } else {
        let builder = "";

        while (c < path1.length) {
          if (path1[c] === "/") {
            builder = builder + "../";
          }

          c = c + 1 | 0;
        }

        if (builder.length === 0 ? path2.length - 1 === d : false) {
          return "./";
        } else {
          return builder + path2.substr(d + 1);
        }
      }
    };

    const addDummyFile = function (isDir, path) {
      if (isDir) {
        return Combine(path, "__DUMMY-FILE__.txt");
      } else {
        return path;
      }
    };

    const fromFullPath_1 = normalizePath(fromFullPath);
    const toFullPath_1 = normalizePath(toFullPath);

    if (fromFullPath_1[0] !== toFullPath_1[0]) {
      return toFullPath_1;
    } else {
      const fromPath = addDummyFile(fromIsDir, fromFullPath_1);
      const toPath = addDummyFile(toIsDir, toFullPath_1);
      const matchValue = replace_1(pathDifference(fromPath, toPath), "__DUMMY-FILE__.txt", "");

      if (matchValue.indexOf(".") === 0) {
        return matchValue;
      } else {
        return "./" + matchValue;
      }
    }
  };

  const getRelativePath = __exports.getRelativePath = function (fromFullPath, toFullPath) {
    const isDir = $var5 => {
      return isNullOrWhiteSpace(GetExtension($var5));
    };

    return getRelativeFileOrDirPath(isDir(fromFullPath), fromFullPath, isDir(toFullPath), toFullPath);
  };

  const getCommonPrefix = __exports.getCommonPrefix = function (xs) {
    const getCommonPrefix_1 = function (prefix, _arg1) {
      getCommonPrefix_1: while (true) {
        if (_arg1.tail != null) {
          let i = 0;

          while ((i < prefix.length ? i < _arg1.head.length : false) ? _arg1.head[i] === prefix[i] : false) {
            i = i + 1 | 0;
          }

          prefix = prefix.slice(0, i - 1 + 1);
          _arg1 = _arg1.tail;
          continue getCommonPrefix_1;
        } else {
          return prefix;
        }
      }
    };

    if (xs.tail != null) {
      return getCommonPrefix_1(xs.head, xs.tail);
    } else {
      return [];
    }
  };

  const isChildPath = __exports.isChildPath = function (parent, child) {
    const split = function (x) {
      return split_1(normalizeFullPath(x), "/").filter($var6 => !isNullOrWhiteSpace($var6));
    };

    const parent_1 = split(parent);
    const child_1 = split(child);
    const commonPrefix = getCommonPrefix(ofArray([parent_1, child_1]));
    return commonPrefix.length >= parent_1.length;
  };

  const getCommonBaseDir = __exports.getCommonBaseDir = function (filePaths) {
    return join("/", getCommonPrefix(toList(map(function (filePath) {
      return function (path) {
        return split_1(path, "/").filter($var7 => !isNullOrWhiteSpace($var7));
      }(normalizePath(GetDirectoryName(filePath)));
    }, filePaths))));
  };

  return __exports;
}({});