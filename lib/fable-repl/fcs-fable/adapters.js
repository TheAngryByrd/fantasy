import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { toText, split, join, format as format_1, replace, trim, printf, toFail, compare } from "../fable-core/String";
import { GenericParam, compare as compare_1, getHashCode, toString, extendInfo, hash } from "../fable-core/Util";
import { tryGetValue, create } from "../fable-core/Map";
import { fromEqualityComparer } from "../fable-core/Comparer";
import { categoryForLatin1 } from "./unicode";
import { getValue } from "../fable-core/Option";
import { map } from "../fable-core/Array";
import CurriedLambda from "../fable-core/CurriedLambda";
import { collect, rangeStep } from "../fable-core/Seq";
import { mapIndexed } from "../fable-core/List";
import { resources } from "./fsstrings";
export const System = function (__exports) {
  const Decimal = __exports.Decimal = function (__exports) {
    const GetBits = __exports.GetBits = function (d) {
      return new Int32Array([0, 0, 0, 0]);
    };

    return __exports;
  }({});

  const Diagnostics = __exports.Diagnostics = function (__exports) {
    const Trace = __exports.Trace = class Trace {
      [_Symbol.reflection]() {
        return {
          type: "Internal.Utilities.System.Diagnostics.Trace",
          properties: {}
        };
      }

      constructor() {}

      static TraceInformation(s) {}

    };
    setType("Internal.Utilities.System.Diagnostics.Trace", Trace);
    return __exports;
  }({});

  const Reflection = __exports.Reflection = function (__exports) {
    const AssemblyName = __exports.AssemblyName = class AssemblyName {
      [_Symbol.reflection]() {
        return {
          type: "Internal.Utilities.System.Reflection.AssemblyName",
          properties: {
            Name: "string"
          }
        };
      }

      constructor(assemblyName) {
        this.assemblyName = assemblyName;
      }

      get Name() {
        return this.assemblyName;
      }

    };
    setType("Internal.Utilities.System.Reflection.AssemblyName", AssemblyName);
    return __exports;
  }({});

  const WeakReference = __exports.WeakReference = class WeakReference {
    [_Symbol.reflection]() {
      return {
        type: "Internal.Utilities.System.WeakReference",
        properties: {}
      };
    }

    constructor(v) {
      this.v = v;
    }

    TryGetTarget() {
      return [true, this.v];
    }

  };
  setType("Internal.Utilities.System.WeakReference", WeakReference);
  const StringComparer = __exports.StringComparer = class StringComparer {
    [_Symbol.reflection]() {
      return {
        type: "Internal.Utilities.System.StringComparer",
        interfaces: ["System.Collections.Generic.IComparer", "System.Collections.Generic.IEqualityComparer"],
        properties: {
          Ordinal: StringComparer,
          OrdinalIgnoreCase: StringComparer
        }
      };
    }

    constructor(comp) {
      this.comp = comp | 0;
    }

    static get Ordinal() {
      return new StringComparer(4);
    }

    static get OrdinalIgnoreCase() {
      return new StringComparer(5);
    }

    Equals(a, b) {
      return compare(a, b, this.comp) === 0;
    }

    GetHashCode(a) {
      if (this.comp === 4) {
        return hash(a) | 0;
      } else if (this.comp === 5) {
        return hash(a.toLowerCase()) | 0;
      } else {
        return toFail(printf("Unsupported StringComparison: %A"))(this.comp) | 0;
      }
    }

    Compare(a, b) {
      return compare(a, b, this.comp) | 0;
    }

  };
  setType("Internal.Utilities.System.StringComparer", StringComparer);

  const Collections = __exports.Collections = function (__exports) {
    const Concurrent = __exports.Concurrent = function (__exports) {
      const ConcurrentDictionary = __exports.ConcurrentDictionary = class ConcurrentDictionary extends Map {
        [_Symbol.reflection]() {
          return extendInfo(ConcurrentDictionary, {
            type: "Internal.Utilities.System.Collections.Concurrent.ConcurrentDictionary",
            interfaces: [],
            properties: {}
          });
        }

        static [".ctor_0"]() {
          new Map();
          return new ConcurrentDictionary();
        }

        static [".ctor_1"](comparer) {
          create(null, fromEqualityComparer(comparer));
          return new ConcurrentDictionary();
        }

        TryAdd(key, value) {
          this.set(key, value);
          return true;
        }

        GetOrAdd(key, valueFactory) {
          const matchValue = tryGetValue(this, key, null);

          if (matchValue[0]) {
            return matchValue[1];
          } else {
            const v = valueFactory(key);
            this.set(key, v);
            return v;
          }
        }

      };
      setType("Internal.Utilities.System.Collections.Concurrent.ConcurrentDictionary", ConcurrentDictionary);
      return __exports;
    }({});

    return __exports;
  }({});

  const IO = __exports.IO = function (__exports) {
    const Directory = __exports.Directory = function (__exports) {
      const GetCurrentDirectory = __exports.GetCurrentDirectory = function () {
        return ".";
      };

      return __exports;
    }({});

    const Path = __exports.Path = function (__exports) {
      const Combine = __exports.Combine = function (path1, path2) {
        const path1_1 = path1.length === 0 ? path1 : trim(path1, "end", "\\", "/") + "/";
        return path1_1 + trim(path2, "start", "\\", "/");
      };

      const ChangeExtension = __exports.ChangeExtension = function (path, ext) {
        const i = path.lastIndexOf(".") | 0;

        if (i < 0) {
          return path;
        } else {
          return path.substr(0, i) + ext;
        }
      };

      const HasExtension = __exports.HasExtension = function (path) {
        const i = path.lastIndexOf(".") | 0;
        return i >= 0;
      };

      const GetExtension = __exports.GetExtension = function (path) {
        const i = path.lastIndexOf(".") | 0;

        if (i < 0) {
          return "";
        } else {
          return path.substr(i);
        }
      };

      const GetInvalidPathChars = __exports.GetInvalidPathChars = function () {
        return Array.from("<>:\"|\\/?*\b\t");
      };

      const GetInvalidFileNameChars = __exports.GetInvalidFileNameChars = function () {
        return Array.from("<>:\"|\\/?*\b\t");
      };

      const GetFullPath = __exports.GetFullPath = function (path) {
        return path;
      };

      const GetFileName = __exports.GetFileName = function (path) {
        const normPath = trim(replace(path, "\\", "/"), "end", "/");
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
        const normPath = replace(path, "\\", "/");
        const i = normPath.lastIndexOf("/") | 0;

        if (i <= 0) {
          return "";
        } else {
          return path.substr(0, i);
        }
      };

      const IsPathRooted = __exports.IsPathRooted = function (path) {
        const normPath = trim(replace(path, "\\", "/"), "end", "/");
        return path.indexOf("/") === 0;
      };

      return __exports;
    }({});

    return __exports;
  }({});

  const Char = __exports.Char = function (__exports) {
    const GetUnicodeCategory = __exports.GetUnicodeCategory = function (c) {
      return ~~categoryForLatin1[c.charCodeAt(0)] | 0;
    };

    const IsControl = __exports.IsControl = function (c) {
      return GetUnicodeCategory(c) === 14;
    };

    const IsDigit = __exports.IsDigit = function (c) {
      return GetUnicodeCategory(c) === 8;
    };

    const IsLetter = __exports.IsLetter = function (c) {
      const matchValue = GetUnicodeCategory(c) | 0;

      switch (matchValue) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
          return true;

        default:
          return false;
      }
    };

    const IsLetterOrDigit = __exports.IsLetterOrDigit = function (c) {
      if (IsLetter(c)) {
        return true;
      } else {
        return IsDigit(c);
      }
    };

    const IsWhiteSpace = __exports.IsWhiteSpace = function (c) {
      if ((c === " " ? true : c >= "\t" ? c <= "\r" : false) ? true : c === " ") {
        return true;
      } else {
        return c === "";
      }
    };

    const IsUpper = __exports.IsUpper = function (c) {
      return GetUnicodeCategory(c) === 0;
    };

    const IsLower = __exports.IsLower = function (c) {
      return GetUnicodeCategory(c) === 1;
    };

    const IsPunctuation = __exports.IsPunctuation = function (c) {
      const matchValue = GetUnicodeCategory(c) | 0;

      switch (matchValue) {
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
          return true;

        default:
          return false;
      }
    };

    const IsSurrogatePair = __exports.IsSurrogatePair = function (s, i) {
      return false;
    };

    const ToUpper = __exports.ToUpper = function (c) {
      if (IsLower(c)) {
        return String.fromCharCode("A".charCodeAt(0) + (c.charCodeAt(0) - "a".charCodeAt(0)));
      } else {
        return c;
      }
    };

    const ToLower = __exports.ToLower = function (c) {
      if (IsUpper(c)) {
        return String.fromCharCode("a".charCodeAt(0) + (c.charCodeAt(0) - "A".charCodeAt(0)));
      } else {
        return c;
      }
    };

    const ToUpperInvariant = __exports.ToUpperInvariant = function (c) {
      return ToUpper(c);
    };

    const ToLowerInvariant = __exports.ToLowerInvariant = function (c) {
      return ToLower(c);
    };

    const ToString = __exports.ToString = function (c) {
      return c;
    };

    return __exports;
  }({});

  const _Text = __exports.Text = function (__exports) {
    const StringBuilder = __exports.StringBuilder = class StringBuilder {
      [_Symbol.reflection]() {
        return {
          type: "Internal.Utilities.System.Text.StringBuilder",
          properties: {}
        };
      }

      constructor(s) {
        this.buf = [];

        if (s != null) {
          this.buf.push(getValue(s));
        }
      }

      static [".ctor_0"](capacity, maxCapacity) {
        return new StringBuilder();
      }

      static [".ctor_1"](s, maxCapacity) {
        return new StringBuilder(s);
      }

      Append(s) {
        this.buf.push(s);
        return this;
      }

      AppendFormat(fmt, o) {
        this.buf.push(format_1(fmt, o));
        return this;
      }

      ToString() {
        return join("", this.buf);
      }

    };
    setType("Internal.Utilities.System.Text.StringBuilder", StringBuilder);

    const Encoding = __exports.Encoding = function (__exports) {
      const Unicode = __exports.Unicode = function (__exports) {
        const GetBytes = __exports.GetBytes = function (s) {
          const addUnicodeChar = function (buf, c) {
            const i = c.charCodeAt(0) | 0;
            buf.push(i % 256 & 0xFF);
            buf.push(~~(i / 256) & 0xFF);
          };

          const buf_1 = [];
          map(CurriedLambda(addUnicodeChar)(buf_1), s.split(""), Array);
          return Uint8Array.from(buf_1);
        };

        const GetString = __exports.GetString = function (bytes, index, count) {
          const sb = new StringBuilder();
          const inputSequence = rangeStep(0, 2, count - 1);

          for (let i of inputSequence) {
            const c = String.fromCharCode(~~bytes[index + i + 1] << 8 | ~~bytes[index + i]);
            sb.Append(c);
          }

          return toString(sb);
        };

        return __exports;
      }({});

      const UTF8 = __exports.UTF8 = function (__exports) {
        const GetBytes_1 = __exports.GetBytes = function (s) {
          const buf = [];

          const encodeUtf8 = function (c) {
            const i = c.charCodeAt(0) | 0;

            if (i < 128) {
              buf.push(i & 0xFF);
            } else if (i < 2048) {
              buf.push((192 | i >> 6 & 31) & 0xFF);
              buf.push((128 | i & 63) & 0xFF);
            } else if (i < 65536) {
              buf.push((224 | i >> 12 & 15) & 0xFF);
              buf.push((128 | i >> 6 & 63) & 0xFF);
              buf.push((128 | i & 63) & 0xFF);
            }
          };

          (function (array) {
            return map(encodeUtf8, array, Array);
          })(s.split(""));

          return Uint8Array.from(buf);
        };

        const GetString_1 = __exports.GetString = function (bytes, index, count) {
          const decodeUtf8 = function (pos) {
            const i1 = ~~bytes[pos] | 0;

            if ((i1 & 128) === 0) {
              return [i1 & 127, 1];
            } else if ((i1 & 224) === 192) {
              const i2 = ~~bytes[pos + 1] | 0;
              return [(i1 & 31) << 6 | i2 & 63, 2];
            } else if ((i1 & 240) === 224) {
              const i2_1 = ~~bytes[pos + 1] | 0;
              const i3 = ~~bytes[pos + 2] | 0;
              return [(i1 & 31) << 12 | (i2_1 & 63) << 6 | i3 & 63, 3];
            } else {
              return [0, 1];
            }
          };

          const sb = new StringBuilder();
          let pos_1 = index | 0;
          const last = index + count | 0;

          while (pos_1 < last) {
            const patternInput = decodeUtf8(pos_1);
            sb.Append(String.fromCharCode(patternInput[0]));
            pos_1 = pos_1 + patternInput[1] | 0;
          }

          return toString(sb);
        };

        return __exports;
      }({});

      return __exports;
    }({});

    return __exports;
  }({});

  return __exports;
}({});
export const Microsoft = function (__exports) {
  const FSharp = __exports.FSharp = function (__exports) {
    const Collections = __exports.Collections = function (__exports) {
      const HashIdentity = __exports.HashIdentity = function (__exports) {
        const Reference = __exports.Reference = function () {
          return {
            GetHashCode(x) {
              return function (obj) {
                return getHashCode(obj);
              }(x) | 0;
            },

            Equals(x, y) {
              return function (e1, e2) {
                return e1 === e2;
              }(x, y);
            },

            [_Symbol.reflection]() {
              return {
                interfaces: ["System.Collections.Generic.IEqualityComparer"]
              };
            }

          };
        };

        return __exports;
      }({});

      const List = __exports.List = function (__exports) {
        const indexed = __exports.indexed = function (source) {
          return mapIndexed(function (i, x) {
            return [i, x];
          }, source);
        };

        return __exports;
      }({});

      return __exports;
    }({});

    const Core = __exports.Core = function (__exports) {
      const LanguagePrimitives = __exports.LanguagePrimitives = function (__exports) {
        const FastGenericComparer = __exports.FastGenericComparer = function () {
          return {
            Compare(x, y) {
              return function (e1, e2) {
                return compare_1(e1, e2);
              }(x, y) | 0;
            },

            [_Symbol.reflection]() {
              return {
                interfaces: ["System.Collections.Generic.IComparer"]
              };
            }

          };
        };

        return __exports;
      }({});

      const Operators = __exports.Operators = function (__exports) {
        const _Failure___ = __exports["|Failure|_|"] = function (exn) {
          return exn.message;
        };

        const Failure = __exports.Failure = function (message) {
          return new Error(message);
        };

        const nullArg = __exports.nullArg = function (x) {
          throw new Error(x);
        };

        const lock = __exports.lock = function (_lockObj, action) {
          return action();
        };

        return __exports;
      }({});

      const Printf = __exports.Printf = function (__exports) {
        const bprintf = __exports.bprintf = function (sb) {
          var f;
          return CurriedLambda((f = function (s) {
            sb.Append(s);
          }, function (format) {
            return format.cont(f);
          }));
        };

        const fprintf = __exports.fprintf = function (os) {
          var f;
          return CurriedLambda((f = function (s) {
            console.log(s);
          }, function (format) {
            return format.cont(f);
          }));
        };

        return __exports;
      }({});

      const XmlAdapters = __exports.XmlAdapters = function (__exports) {
        const s_escapeChars = __exports.s_escapeChars = ["<", ">", "\"", "'", "&"];

        const getEscapeSequence = __exports.getEscapeSequence = function (c) {
          if (c === "\"") {
            return "&quot;";
          } else if (c === "&") {
            return "&amp;";
          } else if (c === "'") {
            return "&apos;";
          } else if (c === "<") {
            return "&lt;";
          } else if (c === ">") {
            return "&gt;";
          } else {
            return toString(c);
          }
        };

        const escape = __exports.escape = function (str) {
          return Array.from(collect(function (c) {
            return getEscapeSequence(c);
          }, str)).join("");
        };

        return __exports;
      }({});

      return __exports;
    }({});

    const Compiler = __exports.Compiler = function (__exports) {
      const SR = __exports.SR = function (__exports) {
        const GetString_2 = __exports.GetString = function (name) {
          const patternInput = tryGetValue(resources, name, null);

          if (patternInput[0]) {
            return patternInput[1];
          } else {
            return "Missing FSStrings error message for: " + name;
          }
        };

        return __exports;
      }({});

      const DiagnosticMessage = __exports.DiagnosticMessage = function (__exports) {
        const ResourceString = __exports.ResourceString = class ResourceString {
          [_Symbol.reflection]() {
            return {
              type: "Internal.Utilities.Microsoft.FSharp.Compiler.DiagnosticMessage.ResourceString",
              properties: {
                Format: GenericParam("T")
              }
            };
          }

          constructor(sfmt, fmt) {
            this.sfmt = sfmt;
            this.fmt = fmt;
          }

          get Format() {
            const ar = map(s => "%" + s, split(this.fmt, "%").filter(s_1 => s_1.length > 0), Array);
            const tmp = format_1(this.sfmt, ...ar);
            const fmt = printf(tmp);
            return toText(fmt);
          }

        };
        setType("Internal.Utilities.Microsoft.FSharp.Compiler.DiagnosticMessage.ResourceString", ResourceString);

        const postProcessString = __exports.postProcessString = function (s) {
          return replace(replace(s, "\\n", "\n"), "\\t", "\t");
        };

        const DeclareResourceString = __exports.DeclareResourceString = function (messageID, fmt) {
          const messageString = postProcessString(SR.GetString(messageID));
          return new ResourceString(messageString, fmt);
        };

        return __exports;
      }({});

      return __exports;
    }({});

    return __exports;
  }({});

  return __exports;
}({});