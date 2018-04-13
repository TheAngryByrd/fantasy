import { tryItem, forAll } from "../fable-core/Seq";
import { map } from "../fable-core/List";
import List from "../fable-core/List";
import { defaultArg, getValue } from "../fable-core/Option";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { toString, compareUnions, equals, makeGeneric } from "../fable-core/Util";
import { join, printf, toText } from "../fable-core/String";
import CurriedLambda from "../fable-core/CurriedLambda";
import { getName, getUnionFields } from "../fable-core/Reflection";

const Option = function (__exports) {
  const ofOptionList = __exports.ofOptionList = function (xs) {
    if (forAll(function (option) {
      return option != null;
    }, xs)) {
      return map(function (option_1) {
        return getValue(option_1);
      }, xs);
    } else {
      return null;
    }
  };

  return __exports;
}({});

export class ExternalType {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.ExternalType",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Type", "string", makeGeneric(List, {
        T: ExternalType
      })], ["Array", ExternalType], ["Pointer", ExternalType], ["TypeVar", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  ToString() {
    return this.tag === 1 ? toText(printf("%O[]"))(this.data) : this.tag === 2 ? toText(printf("&%O"))(this.data) : this.tag === 3 ? toText(printf("'%s"))(this.data) : CurriedLambda(toText(printf("%s%s")))(this.data[0])(this.data[1].tail == null ? "" : toText(printf("<%s>"))(join(", ", map(toText(printf("%O")), this.data[1]))));
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.ExternalType", ExternalType);
export const ExternalTypeModule = function (__exports) {
  const tryOfILType = __exports.tryOfILType = function (typeVarNames, ilType) {
    const $var1 = ilType.tag === 1 ? [0] : ilType.tag === 3 ? [1, ilType.data] : ilType.tag === 2 ? [1, ilType.data] : ilType.tag === 4 ? [2] : ilType.tag === 7 ? [3] : [4];

    switch ($var1[0]) {
      case 0:
        return defaultArg(tryOfILType(typeVarNames, ilType.data[1]), null, function (arg0) {
          return new ExternalType(1, arg0);
        });

      case 1:
        return defaultArg(Option.ofOptionList(map(function (arg10_) {
          return tryOfILType(typeVarNames, arg10_);
        }, $var1[1].GenericArgs)), null, function (genericArgs) {
          return new ExternalType(0, [$var1[1].FullName, genericArgs]);
        });

      case 2:
        return defaultArg(tryOfILType(typeVarNames, ilType.data), null, function (arg0_1) {
          return new ExternalType(2, arg0_1);
        });

      case 3:
        return defaultArg(tryItem(~~ilType.data, typeVarNames), null, function (typeVarName) {
          return new ExternalType(3, typeVarName);
        });

      case 4:
        return null;
    }
  };

  return __exports;
}({});
export class ParamTypeSymbol {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.ParamTypeSymbol",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Param", ExternalType], ["Byref", ExternalType]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  ToString() {
    return this.tag === 1 ? toText(printf("ref %O"))(this.data) : toString(this.data);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.ParamTypeSymbol", ParamTypeSymbol);
export const ParamTypeSymbolModule = function (__exports) {
  const tryOfILType_1 = __exports.tryOfILType = function (typeVarNames, _arg1) {
    if (_arg1.tag === 5) {
      return defaultArg(ExternalTypeModule.tryOfILType(typeVarNames, _arg1.data), null, function (arg0) {
        return new ParamTypeSymbol(1, arg0);
      });
    } else {
      return defaultArg(ExternalTypeModule.tryOfILType(typeVarNames, _arg1), null, function (arg0_1) {
        return new ParamTypeSymbol(0, arg0_1);
      });
    }
  };

  const tryOfILTypes = __exports.tryOfILTypes = function (typeVarNames, ilTypes) {
    return Option.ofOptionList(map(function (arg10_) {
      return tryOfILType_1(typeVarNames, arg10_);
    }, ilTypes));
  };

  return __exports;
}({});
export class ExternalSymbol {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.ExternalSymbol",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Type", "string"], ["Constructor", "string", makeGeneric(List, {
        T: ParamTypeSymbol
      })], ["Method", "string", "string", makeGeneric(List, {
        T: ParamTypeSymbol
      }), "number"], ["Field", "string", "string"], ["Event", "string", "string"], ["Property", "string", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  ToString() {
    const $var2 = this.tag === 1 ? [1] : this.tag === 2 ? [2] : this.tag === 3 ? [3, this.data[1], this.data[0]] : this.tag === 4 ? [3, this.data[1], this.data[0]] : this.tag === 5 ? [3, this.data[1], this.data[0]] : [0];

    switch ($var2[0]) {
      case 0:
        return this.data;

      case 1:
        return CurriedLambda(toText(printf("%s..ctor(%s)")))(this.data[0])(join(", ", map(toText(printf("%O")), this.data[1])));

      case 2:
        const genericAritySuffix = this.data[3] > 0 ? toText(printf("`%d"))(this.data[3]) : "";
        return CurriedLambda(toText(printf("%s.%s%s(%s)")))(this.data[0], this.data[1], genericAritySuffix)(join(", ", map(toText(printf("%O")), this.data[2])));

      case 3:
        return toText(printf("%s.%s"))($var2[2], $var2[1]);
    }
  }

  ToDebuggerDisplay() {
    const patternInput = getUnionFields(this, ExternalSymbol);
    return toText(printf("%s %O"))(getName(patternInput[0]), this);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.ExternalSymbol", ExternalSymbol);