import { Severity } from "../Fable.Core/Compiler";
import { Declaration, EntityKind, NonDeclaredType, MemberLoc, MemberKind, Member, ArrayConsKind, Type, ApplyKind, ImportKind, LambdaInfo, Ident, ValueKind, Expr } from "./AST.Fable";
import { fold2, take, skip, singleton as singleton_1, empty, append as append_1, delay, fold, zip, tryPick, toList, exists } from "../fable-core/Seq";
import { reverse, singleton, map as map_1, append, ofArray, collect } from "../fable-core/List";
import List from "../fable-core/List";
import { compareRecords, equalsRecords, isArray, equals, Option, makeGeneric, toString } from "../fable-core/Util";
import { makeSome, getValue } from "../fable-core/Option";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { printf, toFail, trim } from "../fable-core/String";
import { LogicalOperator, BinaryOperator, UnaryOperator, NumberKind } from "./AST.Common";
import { fromValue } from "../fable-core/Long";
import Long from "../fable-core/Long";
import { map } from "../fable-core/Array";
import CurriedLambda from "../fable-core/CurriedLambda";
import Lazy from "../fable-core/Lazy";
import { List as List_1, Naming } from "../Fable.Core/Util";

function _MaybeWrapped_(_arg1) {
  if (_arg1.tag === 13) {
    return _arg1.data[0];
  } else {
    return _arg1;
  }
}

export { _MaybeWrapped_ as $7C$MaybeWrapped$7C$ };

function _CoreMeth___(coreMod, meth, expr) {
  var meth_;
  var coreMod_;
  const $var1 = expr.tag === 3 ? expr.data[0].tag === 0 ? expr.data[0].data.tag === 6 ? expr.data[0].data.data[2].tag === 0 ? expr.data[2].tag === 0 ? (meth_ = expr.data[0].data.data[0], coreMod_ = expr.data[0].data.data[1], meth_ === meth ? coreMod_ === coreMod : false) ? [0, expr.data[1], expr.data[0].data.data[1], expr.data[0].data.data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var1[0]) {
    case 0:
      return $var1[1];

    case 1:
      return null;
  }
}

export { _CoreMeth___ as $7C$CoreMeth$7C$_$7C$ };

function _CoreCons___(coreMod, meth, expr) {
  var meth_;
  var coreMod_;
  const $var2 = expr.tag === 3 ? expr.data[0].tag === 0 ? expr.data[0].data.tag === 6 ? expr.data[0].data.data[2].tag === 0 ? expr.data[2].tag === 2 ? (meth_ = expr.data[0].data.data[0], coreMod_ = expr.data[0].data.data[1], meth_ === meth ? coreMod_ === coreMod : false) ? [0, expr.data[1], expr.data[0].data.data[1], expr.data[0].data.data[0]] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var2[0]) {
    case 0:
      return $var2[1];

    case 1:
      return null;
  }
}

export { _CoreCons___ as $7C$CoreCons$7C$_$7C$ };
export function addWarning(com, fileName, range, warning) {
  com.AddLog(warning, new Severity(0), range, fileName);
}
export function addError(com, fileName, range, warning) {
  com.AddLog(warning, new Severity(1), range, fileName);
}
export function addErrorAndReturnNull(com, fileName, range, error) {
  com.AddLog(error, new Severity(1), range, fileName);
  return new Expr(0, new ValueKind(0));
}
export function deepExists(f, expr) {
  if (f(expr)) {
    return true;
  } else {
    return exists(function (expr_1) {
      return deepExists(f, expr_1);
    }, expr.ImmediateSubExpressions);
  }
}
export function flattenSequential(_arg1) {
  if (_arg1.tag === 10) {
    return collect(function (_arg1_1) {
      return flattenSequential(_arg1_1);
    }, _arg1.data[0]);
  } else {
    return ofArray([_arg1]);
  }
}
export function attachRange(range, msg) {
  if (range == null) {
    return msg;
  } else {
    return msg + " " + toString(getValue(range));
  }
}
export function attachRangeAndFile(range, fileName, msg) {
  if (range == null) {
    return msg + " (" + fileName + ")";
  } else {
    return msg + " " + toString(getValue(range)) + " (" + fileName + ")";
  }
}
export class CallKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Util.CallKind",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["InstanceCall", Expr, "string", makeGeneric(List, {
        T: Expr
      })], ["ImportCall", "string", "string", Option("string"), "boolean", makeGeneric(List, {
        T: Expr
      })], ["CoreLibCall", "string", Option("string"), "boolean", makeGeneric(List, {
        T: Expr
      })], ["GlobalCall", "string", Option("string"), "boolean", makeGeneric(List, {
        T: Expr
      })]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Fable.AST.Fable.Util.CallKind", CallKind);
export function makeLoop(range, loopKind) {
  return new Expr(7, [loopKind, range]);
}
export function makeIdent(name) {
  return new Ident(name);
}
export function makeTypedIdent(name, typ) {
  return new Ident(name, typ);
}
export function makeIdentExpr(name) {
  return new Expr(0, new ValueKind(5, makeIdent(name)));
}
export function makeLambdaExpr(args, body) {
  return new Expr(0, new ValueKind(16, [args, body, new LambdaInfo(true)]));
}
export function makeCoreRef(modname, prop) {
  return new Expr(0, new ValueKind(6, [prop, modname, new ImportKind(0)]));
}
export function makeDefaultCoreRef(modname) {
  return new Expr(0, new ValueKind(6, ["default", modname, new ImportKind(0)]));
}
export function makeImport(selector, path) {
  return new Expr(0, new ValueKind(6, [trim(selector, "both"), trim(path, "both"), new ImportKind(2)]));
}

function makeOp(range, typ, args, op) {
  return new Expr(3, [new Expr(0, op), args, new ApplyKind(0), typ, range]);
}

export function makeBinOp(range, typ, args, op) {
  return makeOp(range, typ, args, new ValueKind(14, op));
}
export function makeUnOp(range, typ, args, op) {
  return makeOp(range, typ, args, new ValueKind(13, op));
}
export function makeLogOp(range, args, op) {
  return makeOp(range, new Type(3), args, new ValueKind(15, op));
}
export function makeEqOp(range, args, op) {
  return makeOp(range, new Type(3), args, new ValueKind(14, op));
}
export function makeSequential(range, statements) {
  makeSequential: while (true) {
    if (statements.tail != null) {
      if (statements.tail.tail == null) {
        return statements.head;
      } else {
        const matchValue = [statements.head, statements.tail];

        if (matchValue[0].IsNull) {
          range = range;
          statements = statements.tail;
          continue makeSequential;
        } else {
          const $var3 = matchValue[0].tag === 10 ? [0, matchValue[0].data[0]] : matchValue[0].tag === 1 ? matchValue[1].tail != null ? matchValue[1].head.tag === 10 ? matchValue[1].tail.tail == null ? [1, matchValue[1].head.data[0]] : matchValue[0].data[0].tail == null ? matchValue[0].data[1].tail == null ? [2] : [3] : [3] : matchValue[0].data[0].tail == null ? matchValue[0].data[1].tail == null ? [2] : [3] : [3] : matchValue[0].data[0].tail == null ? matchValue[0].data[1].tail == null ? [2] : [3] : [3] : matchValue[1].tail != null ? matchValue[1].head.tag === 10 ? matchValue[1].tail.tail == null ? [1, matchValue[1].head.data[0]] : [3] : [3] : [3];

          switch ($var3[0]) {
            case 0:
              range = range;
              statements = append($var3[1], statements.tail);
              continue makeSequential;

            case 1:
              range = range;
              statements = new List(statements.head, $var3[1]);
              continue makeSequential;

            case 2:
              range = range;
              statements = statements.tail;
              continue makeSequential;

            case 3:
              return new Expr(10, [statements, range]);
          }
        }
      }
    } else {
      return new Expr(0, new ValueKind(0));
    }
  }
}
export function makeLongInt(x, unsigned) {
  const lowBits = new ValueKind(7, [x.toNumber() >>> 0, new NumberKind(7)]);
  const highBits = new ValueKind(7, [x.shr(32).toNumber(), new NumberKind(7)]);
  const unsigned_1 = new ValueKind(9, unsigned);
  const args = ofArray([new Expr(0, lowBits), new Expr(0, highBits), new Expr(0, unsigned_1)]);
  return new Expr(3, [makeCoreRef("Long", "fromBits"), args, new ApplyKind(0), new Type(1), null]);
}
export function makeFloat32(x) {
  const args = ofArray([new Expr(0, new ValueKind(7, [x, new NumberKind(6)]))]);
  const callee = new Expr(3, [makeIdentExpr("Math"), ofArray([new Expr(0, new ValueKind(8, "fround"))]), new ApplyKind(1), new Type(1), null]);
  return new Expr(3, [callee, args, new ApplyKind(0), new Type(1), null]);
}
export function makeBoolConst(x) {
  return new Expr(0, new ValueKind(9, x));
}
export function makeStrConst(x) {
  return new Expr(0, new ValueKind(8, x));
}
export function makeIntConst(x) {
  return new Expr(0, new ValueKind(7, [x, new NumberKind(4)]));
}
export function makeNumConst(x) {
  return new Expr(0, new ValueKind(7, [x, new NumberKind(7)]));
}
export function makeDecConst(x) {
  return new Expr(0, new ValueKind(7, [x, new NumberKind(7)]));
}
export function makeTypeConst(typ, value) {
  const matchValue = [typ, value];
  const $var4 = matchValue[0].tag === 7 ? matchValue[0].data.tag === 0 ? matchValue[1] instanceof Long ? [0, matchValue[1]] : [6] : matchValue[0].data.tag === 1 ? matchValue[1] instanceof Long ? [1, matchValue[1]] : [6] : matchValue[0].data.tag === 2 ? typeof matchValue[1] === "number" ? [2, matchValue[1]] : [6] : [6] : matchValue[0].tag === 13 ? matchValue[1] instanceof Long ? [3, matchValue[1]] : matchValue[1] instanceof Long ? [4, matchValue[1]] : [6] : matchValue[0].tag === 6 ? matchValue[0].data.tag === 6 ? typeof matchValue[1] === "number" ? [5, matchValue[1]] : [6] : [6] : [6];

  switch ($var4[0]) {
    case 0:
      return makeLongInt(fromValue($var4[1]), false);

    case 1:
      return makeLongInt($var4[1], true);

    case 2:
      return makeDecConst($var4[1]);

    case 3:
      return makeLongInt(fromValue($var4[1]), false);

    case 4:
      return makeLongInt($var4[1], true);

    case 5:
      return makeFloat32($var4[1]);

    case 6:
      return new Expr(0, (() => {
        const matchValue_1 = [typ, value];
        const $var5 = matchValue_1[0].tag === 3 ? typeof matchValue_1[1] === "boolean" ? [0, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].tag === 5 ? typeof matchValue_1[1] === "string" ? [1, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].tag === 4 ? typeof matchValue_1[1] === "string" ? [2, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].tag === 6 ? matchValue_1[0].data.tag === 1 ? typeof matchValue_1[1] === "number" ? [3, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].data.tag === 0 ? typeof matchValue_1[1] === "number" ? [4, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].data.tag === 2 ? typeof matchValue_1[1] === "number" ? [5, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].data.tag === 3 ? typeof matchValue_1[1] === "number" ? [6, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].data.tag === 4 ? typeof matchValue_1[1] === "number" ? [7, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].data.tag === 5 ? typeof matchValue_1[1] === "number" ? [8, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].data.tag === 7 ? typeof matchValue_1[1] === "number" ? [9, matchValue_1[1]] : value == null ? [16] : [17] : value == null ? [16] : [17] : matchValue_1[0].tag === 13 ? typeof matchValue_1[1] === "number" ? [10, matchValue_1[1]] : typeof matchValue_1[1] === "number" ? [11, matchValue_1[1]] : typeof matchValue_1[1] === "number" ? [12, matchValue_1[1]] : typeof matchValue_1[1] === "number" ? [13, matchValue_1[1]] : typeof matchValue_1[1] === "number" ? [14, matchValue_1[1]] : typeof matchValue_1[1] === "number" ? [15, matchValue_1[1]] : value == null ? [16] : [17] : matchValue_1[0].tag === 2 ? matchValue_1[1] == null ? value == null ? [16] : value == null ? [16] : [17] : value == null ? [16] : [17] : value == null ? [16] : [17];

        switch ($var5[0]) {
          case 0:
            return new ValueKind(9, $var5[1]);

          case 1:
            return new ValueKind(8, $var5[1]);

          case 2:
            return new ValueKind(8, $var5[1]);

          case 3:
            return new ValueKind(7, [$var5[1], new NumberKind(1)]);

          case 4:
            return new ValueKind(7, [$var5[1], new NumberKind(0)]);

          case 5:
            return new ValueKind(7, [$var5[1], new NumberKind(2)]);

          case 6:
            return new ValueKind(7, [$var5[1], new NumberKind(3)]);

          case 7:
            return new ValueKind(7, [$var5[1], new NumberKind(4)]);

          case 8:
            return new ValueKind(7, [$var5[1], new NumberKind(5)]);

          case 9:
            return new ValueKind(7, [$var5[1], new NumberKind(7)]);

          case 10:
            return new ValueKind(7, [$var5[1], new NumberKind(1)]);

          case 11:
            return new ValueKind(7, [$var5[1], new NumberKind(0)]);

          case 12:
            return new ValueKind(7, [$var5[1], new NumberKind(2)]);

          case 13:
            return new ValueKind(7, [$var5[1], new NumberKind(3)]);

          case 14:
            return new ValueKind(7, [$var5[1], new NumberKind(4)]);

          case 15:
            return new ValueKind(7, [$var5[1], new NumberKind(5)]);

          case 16:
            return new ValueKind(0);

          case 17:
            const $var6 = matchValue_1[0].tag === 9 ? matchValue_1[0].data.tag === 6 ? isArray(matchValue_1[1]) ? [0, matchValue_1[1], matchValue_1[0].data.data] : isArray(matchValue_1[1]) ? [1, matchValue_1[1], matchValue_1[0].data.data] : [2] : [2] : [2];

            switch ($var6[0]) {
              case 0:
                const values = toList(map(function (x) {
                  return new Expr(0, new ValueKind(7, [x, $var6[2]]));
                }, $var6[1], Array));
                return new ValueKind(11, [new ArrayConsKind(0, values), new Type(6, $var6[2])]);

              case 1:
                const values_1 = toList(map(function (x_1) {
                  return new Expr(0, new ValueKind(7, [x_1, $var6[2]]));
                }, $var6[1], Array));
                return new ValueKind(11, [new ArrayConsKind(0, values_1), new Type(6, $var6[2])]);

              case 2:
                return toFail(printf("Unexpected type %A, literal %O"))(typ, value);
            }

        }
      })());
  }
}
export function makeGet(range, typ, callee, propExpr) {
  return new Expr(3, [callee, ofArray([propExpr]), new ApplyKind(1), typ, range]);
}
export function makeUntypedGet(callee, prop) {
  return new Expr(3, [callee, ofArray([new Expr(0, new ValueKind(8, prop))]), new ApplyKind(1), new Type(1), null]);
}
export function makeArray(elementType, arrExprs) {
  return new Expr(0, new ValueKind(11, [new ArrayConsKind(0, arrExprs), elementType]));
}
export function tryImported(name, decs) {
  return tryPick(function (x) {
    var path;
    var memb;
    const matchValue = [x.Name, x.Arguments];
    const $var7 = matchValue[0] === "Global" ? matchValue[1].tail != null ? typeof matchValue[1].head === "string" ? matchValue[1].tail.tail == null ? [0, matchValue[1].head] : [1] : [1] : [1] : matchValue[0] === "Import" ? matchValue[1].tail != null ? typeof matchValue[1].head === "string" ? matchValue[1].tail.tail != null ? typeof matchValue[1].tail.head === "string" ? matchValue[1].tail.tail.tail == null ? (path = matchValue[1].tail.head, memb = matchValue[1].head, !(path.indexOf(".") === 0)) ? [2, matchValue[1].head, matchValue[1].tail.head] : [3] : [3] : [3] : [3] : [3] : [3] : [3];

    switch ($var7[0]) {
      case 0:
        return new Expr(0, new ValueKind(5, makeIdent($var7[1])));

      case 1:
        return new Expr(0, new ValueKind(5, makeIdent(name.value)));

      case 2:
        return new Expr(0, new ValueKind(6, [trim($var7[1], "both"), trim($var7[2], "both"), new ImportKind(2)]));

      case 3:
        return null;
    }
  }, decs);
}
export function makeJsObject(range, props) {
  const membs = map_1(function (tupledArg) {
    const m = new Member(tupledArg[0], new MemberKind(4), new MemberLoc(0), new List(), tupledArg[1].Type);
    return [m, new List(), tupledArg[1]];
  }, props);
  return new Expr(1, [membs, new List(), null, range]);
}
export function getTypedArrayName(com, numberKind) {
  switch (numberKind.tag) {
    case 1:
      if (com.Options.clampByteArrays) {
        return "Uint8ClampedArray";
      } else {
        return "Uint8Array";
      }

    case 2:
      return "Int16Array";

    case 3:
      return "Uint16Array";

    case 4:
      return "Int32Array";

    case 5:
      return "Uint32Array";

    case 6:
      return "Float32Array";

    case 7:
      return "Float64Array";

    default:
      return "Int8Array";
  }
}
export function makeNonDeclaredTypeRef(nonDeclType) {
  const get = function (t) {
    return new Expr(13, [makeCoreRef("Util", t), new Type(0)]);
  };

  const call = function (t_1, args) {
    return new Expr(3, [makeCoreRef("Util", t_1), args, new ApplyKind(0), new Type(0), null]);
  };

  switch (nonDeclType.tag) {
    case 1:
      return get("Unit");

    case 2:
      return call("Option", ofArray([nonDeclType.data]));

    case 3:
      return call("Array", ofArray([nonDeclType.data]));

    case 4:
      return CurriedLambda(call)("Tuple")(singleton(new Expr(0, new ValueKind(11, [new ArrayConsKind(0, nonDeclType.data), new Type(1)]))));

    case 5:
      return CurriedLambda(call)("Function")(singleton(new Expr(0, new ValueKind(11, [new ArrayConsKind(0, nonDeclType.data), new Type(1)]))));

    case 6:
      return call("GenericParam", ofArray([new Expr(0, new ValueKind(8, nonDeclType.data))]));

    case 7:
      return call("Interface", ofArray([new Expr(0, new ValueKind(8, nonDeclType.data))]));

    default:
      return get("Any");
  }
}
export class GenericInfo {
  constructor(makeGeneric, genericAvailability) {
    this.makeGeneric = makeGeneric;
    this.genericAvailability = genericAvailability;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.AST.Fable.Util.GenericInfo",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        makeGeneric: "boolean",
        genericAvailability: "boolean"
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
setType("Fable.AST.Fable.Util.GenericInfo", GenericInfo);
export function makeTypeRef(com, genInfo, typ) {
  var kind;

  const str = function (s) {
    return new Expr(13, [new Expr(0, new ValueKind(8, s)), new Type(0)]);
  };

  const $var8 = typ.tag === 3 ? [0] : typ.tag === 4 ? [1] : typ.tag === 5 ? [1] : typ.tag === 6 ? [2] : typ.tag === 13 ? [2] : typ.tag === 7 ? [3, typ.data] : typ.tag === 11 ? [4, typ.data[0], typ.data[1]] : typ.tag === 0 ? [5] : typ.tag === 1 ? [5] : typ.tag === 2 ? [6] : typ.tag === 9 ? typ.data.tag === 6 ? (kind = typ.data.data, com.Options.typedArrays) ? [7, typ.data.data] : [8] : [8] : [8];

  switch ($var8[0]) {
    case 0:
      return str("boolean");

    case 1:
      return str("string");

    case 2:
      return str("number");

    case 3:
      const $var9 = $var8[1].tag === 1 ? [0] : $var8[1].tag === 2 ? [1] : $var8[1].tag === 3 ? [2] : [0];

      switch ($var9[0]) {
        case 0:
          return makeDefaultCoreRef("Long");

        case 1:
          return str("number");

        case 2:
          return makeDefaultCoreRef("BigInt");
      }

    case 4:
      return makeNonDeclaredTypeRef(new NonDeclaredType(5, map_1(function (typ_1) {
        return makeTypeRef(com, genInfo, typ_1);
      }, append($var8[1], ofArray([$var8[2]])))));

    case 5:
      return makeNonDeclaredTypeRef(new NonDeclaredType(0));

    case 6:
      return makeNonDeclaredTypeRef(new NonDeclaredType(1));

    case 7:
      const def = new Expr(0, new ValueKind(5, new Ident(getTypedArrayName(com, $var8[1]), new Type(0))));
      return new Expr(3, [makeCoreRef("Util", "Array"), ofArray([def, makeBoolConst(true)]), new ApplyKind(0), new Type(0), null]);

    case 8:
      const $var10 = typ.tag === 9 ? [0, typ.data] : typ.tag === 8 ? [1, typ.data] : typ.tag === 10 ? [2, typ.data] : typ.tag === 12 ? [3, typ.data] : typ.tag === 14 ? typ.data[0].Kind.Equals(new EntityKind(5)) ? [4, typ.data[0]] : [5] : [5];

      switch ($var10[0]) {
        case 0:
          return makeNonDeclaredTypeRef(new NonDeclaredType(3, makeTypeRef(com, genInfo, $var10[1])));

        case 1:
          return makeNonDeclaredTypeRef(new NonDeclaredType(2, makeTypeRef(com, genInfo, $var10[1])));

        case 2:
          return makeNonDeclaredTypeRef(new NonDeclaredType(4, map_1(function (typ_2) {
            return makeTypeRef(com, genInfo, typ_2);
          }, $var10[1])));

        case 3:
          if (genInfo.genericAvailability) {
            return makeGet(null, new Type(0), makeIdentExpr("_genArgs"), new Expr(0, new ValueKind(8, $var10[1])));
          } else {
            return makeNonDeclaredTypeRef(new NonDeclaredType(6, $var10[1]));
          }

        case 4:
          return makeNonDeclaredTypeRef(new NonDeclaredType(7, $var10[1].FullName));

        case 5:
          if (typ.tag === 14) {
            const matchValue = tryImported(new Lazy(function () {
              return typ.data[0].Name;
            }), typ.data[0].Decorators);

            if (matchValue == null) {
              if (!genInfo.makeGeneric ? true : typ.data[1].tail == null) {
                return new Expr(0, new ValueKind(4, [typ.data[0], new List()]));
              } else if (matchValue == null) {
                return function (genArgs) {
                  return new Expr(0, new ValueKind(4, [typ.data[0], genArgs]));
                }(toList(zip(typ.data[0].GenericParameters, map_1(function (typ_3) {
                  return makeTypeRef(com, genInfo, typ_3);
                }, typ.data[1]))));
              } else {
                throw new Error("C:/projects/fable/src/dotnet/Fable.Core/AST/AST.Fable.Util.fs", 272, 14);
              }
            } else {
              return getValue(matchValue);
            }
          } else {
            throw new Error("C:/projects/fable/src/dotnet/Fable.Core/AST/AST.Fable.Util.fs", 231, 10);
          }

      }

  }
}
export function makeCall(range, typ, kind) {
  const getCallee = function (meth, args, returnType, owner) {
    if (meth != null) {
      return new Expr(3, [owner, ofArray([makeStrConst(getValue(meth))]), new ApplyKind(1), new Type(1), null]);
    } else {
      return owner;
    }
  };

  const apply = function (kind_1, args_1, callee) {
    return new Expr(3, [callee, args_1, kind_1, typ, range]);
  };

  const getKind = function (isCons) {
    if (isCons) {
      return new ApplyKind(2);
    } else {
      return new ApplyKind(0);
    }
  };

  if (kind.tag === 1) {
    return CurriedLambda(apply)(getKind(kind.data[3]), kind.data[4])(CurriedLambda(getCallee)(kind.data[2], kind.data[4], typ)(new Expr(0, new ValueKind(6, [kind.data[1], kind.data[0], new ImportKind(2)]))));
  } else if (kind.tag === 2) {
    return CurriedLambda(apply)(getKind(kind.data[2]), kind.data[3])(kind.data[1] == null ? makeDefaultCoreRef(kind.data[0]) : makeCoreRef(kind.data[0], getValue(kind.data[1])));
  } else if (kind.tag === 3) {
    return CurriedLambda(apply)(getKind(kind.data[2]), kind.data[3])(CurriedLambda(getCallee)(kind.data[1], kind.data[3], typ)(makeIdentExpr(kind.data[0])));
  } else {
    return CurriedLambda(apply)(new ApplyKind(0), kind.data[2])(new Expr(3, [kind.data[0], ofArray([makeStrConst(kind.data[1])]), new ApplyKind(1), new Type(1), null]));
  }
}
export function makeNonGenTypeRef(com, typ) {
  return makeTypeRef(com, new GenericInfo(false, false), typ);
}
export function makeTypeRefFrom(com, ent) {
  const genInfo = new GenericInfo(false, false);
  return function (typ) {
    return makeTypeRef(com, genInfo, typ);
  }(new Type(14, [ent, new List()]));
}
export function makeEmit(r, t, args, macro) {
  return new Expr(3, [new Expr(0, new ValueKind(17, macro)), args, new ApplyKind(0), t, r]);
}
export function makeTypeTest(com, fileName, range, expr, typ) {
  var typ_1;
  var typ_2;

  const jsTypeof = function (primitiveType, expr_1) {
    const typof = makeUnOp(null, new Type(5), ofArray([expr_1]), new UnaryOperator(4));
    return makeBinOp(range, new Type(3), ofArray([typof, makeStrConst(primitiveType)]), new BinaryOperator(2));
  };

  const $var11 = typ.tag === 4 ? [1] : typ.tag === 5 ? [1] : typ.tag === 6 ? [2] : typ.tag === 13 ? [2] : typ.tag === 7 ? typ.data.tag === 1 ? [3] : typ.data.tag === 2 ? [4] : typ.data.tag === 3 ? [5] : [3] : typ.tag === 3 ? [6] : typ.tag === 2 ? [7] : typ.tag === 11 ? [8] : typ.tag === 9 ? [9] : typ.tag === 10 ? [9] : typ.tag === 1 ? [10] : typ.tag === 14 ? [11, typ.data[0]] : typ.tag === 8 ? [12] : typ.tag === 12 ? [12] : [0];

  switch ($var11[0]) {
    case 0:
      return new Expr(0, new ValueKind(9, false));

    case 1:
      return jsTypeof("string", expr);

    case 2:
      return jsTypeof("number", expr);

    case 3:
      return makeBinOp(range, new Type(3), ofArray([expr, makeDefaultCoreRef("Long")]), new BinaryOperator(21));

    case 4:
      return jsTypeof("number", expr);

    case 5:
      return makeBinOp(range, new Type(3), ofArray([expr, makeDefaultCoreRef("BigInt")]), new BinaryOperator(21));

    case 6:
      return jsTypeof("boolean", expr);

    case 7:
      return makeBinOp(range, new Type(3), ofArray([expr, new Expr(0, new ValueKind(0))]), new BinaryOperator(0));

    case 8:
      return jsTypeof("function", expr);

    case 9:
      return (typ_1 = new Type(3), function (kind) {
        return makeCall(range, typ_1, kind);
      })(new CallKind(2, ["Util", "isArray", false, ofArray([expr])]));

    case 10:
      return makeBoolConst(true);

    case 11:
      const matchValue = $var11[1].Kind;

      if (matchValue.tag === 5) {
        return (typ_2 = new Type(3), function (kind_1) {
          return makeCall(range, typ_2, kind_1);
        })(new CallKind(2, ["Util", "hasInterface", false, ofArray([expr, makeStrConst($var11[1].FullName)])]));
      } else {
        return makeBinOp(range, new Type(3), ofArray([expr, makeNonGenTypeRef(com, typ)]), new BinaryOperator(21));
      }

    case 12:
      return function (error) {
        return addErrorAndReturnNull(com, fileName, range, error);
      }("Cannot type test options or generic parameters");
  }
}
export function makeUnionCons() {
  const tagArg = new Ident("tag", new Type(6, new NumberKind(4)));
  const dataArg = new Ident("data", new Type(1));
  const args = ofArray([tagArg, dataArg]);
  const argTypes = map_1(function (arg00) {
    return Ident.getType(arg00);
  }, args);
  const setter1 = new Expr(9, [new Expr(0, new ValueKind(1)), makeStrConst("tag"), new Expr(0, new ValueKind(5, tagArg)), null]);
  const setter2 = new Expr(9, [new Expr(0, new ValueKind(1)), makeStrConst("data"), new Expr(0, new ValueKind(5, dataArg)), null]);
  const body = new Expr(10, [ofArray([setter1, setter2]), null]);
  return new Declaration(2, [new Member(".ctor", new MemberKind(0), new MemberLoc(0), argTypes, new Type(1)), true, null, args, body, null]);
}
export function makeUnionConsNoData() {
  const tagArg = new Ident("tag", new Type(6, new NumberKind(4)));
  const setter1 = new Expr(9, [new Expr(0, new ValueKind(1)), makeStrConst("tag"), new Expr(0, new ValueKind(5, tagArg)), null]);
  return new Declaration(2, [new Member(".ctor", new MemberKind(0), new MemberLoc(0), ofArray([tagArg.Type]), new Type(1)), true, null, ofArray([tagArg]), setter1, null]);
}
export function setProto(com, ent) {
  const meth = makeUntypedGet(makeIdentExpr("Object"), "setPrototypeOf");
  return new Expr(3, [meth, ofArray([new Expr(0, new ValueKind(1)), makeUntypedGet(function (typ) {
    return makeNonGenTypeRef(com, typ);
  }(new Type(14, [ent, new List()])), "prototype")]), new ApplyKind(0), new Type(1), null]);
}
export function makeRecordCons(com, ent, props) {
  const args_1 = reverse(fold(function (args, tupledArg) {
    const name = Naming.sanitizeIdent(function (x) {
      return exists(function (y) {
        return y.Name === x;
      }, args);
    }, Naming.lowerFirst(tupledArg[0]));
    return new List(new Ident(name, tupledArg[1]), args);
  }, new List(), props));

  const body = function (setters) {
    const matchValue = ent.Kind;

    if (matchValue.tag === 3) {
      const superCall = new Expr(3, [new Expr(0, new ValueKind(2)), new List(), new ApplyKind(0), new Type(1), null]);
      return new Expr(10, [ofArray([superCall, setProto(com, ent)], setters), null]);
    } else {
      return new Expr(10, [setters, null]);
    }
  }(map_1(function (tupledArg_1) {
    return new Expr(9, [new Expr(0, new ValueKind(1)), makeStrConst(tupledArg_1[1][0]), new Expr(0, new ValueKind(5, tupledArg_1[0])), null]);
  }, toList(zip(args_1, props))));

  return new Declaration(2, [new Member(".ctor", new MemberKind(0), new MemberLoc(0), map_1(function (arg00) {
    return Ident.getType(arg00);
  }, args_1), new Type(1)), true, null, args_1, body, null]);
}

function makeMeth(argType, returnType, name, coreMeth) {
  var range;
  const arg = new Ident("other", argType);
  const body = (range = null, function (kind) {
    return makeCall(range, returnType, kind);
  })(new CallKind(2, ["Util", coreMeth, false, ofArray([new Expr(0, new ValueKind(1)), new Expr(0, new ValueKind(5, arg))])]));
  return new Declaration(2, [new Member(name, new MemberKind(1), new MemberLoc(0), ofArray([arg.Type]), returnType), true, null, ofArray([arg]), body, null]);
}

export function makeUnionEqualMethod(argType) {
  const _this = new Expr(0, new ValueKind(1));

  const arg = new Ident("other", argType);
  const argValue = new Expr(0, new ValueKind(5, arg));
  const equalsTag = makeEqOp(null, ofArray([makeUntypedGet(_this, "tag"), makeUntypedGet(argValue, "tag")]), new BinaryOperator(2));
  const equalsData = makeCall(null, new Type(3), new CallKind(2, ["Util", "equals", false, ofArray([makeUntypedGet(_this, "data"), makeUntypedGet(argValue, "data")])]));
  const andOp = new Expr(3, [new Expr(0, new ValueKind(15, new LogicalOperator(1))), ofArray([equalsTag, equalsData]), new ApplyKind(0), new Type(3), null]);
  const body = new Expr(3, [new Expr(0, new ValueKind(15, new LogicalOperator(0))), ofArray([makeEqOp(null, ofArray([_this, argValue]), new BinaryOperator(2)), andOp]), new ApplyKind(0), new Type(3), null]);
  return new Declaration(2, [new Member("Equals", new MemberKind(1), new MemberLoc(0), ofArray([arg.Type]), new Type(3)), true, null, ofArray([arg]), body, null]);
}
export function makeUnionCompareMethod(argType) {
  return makeMeth(argType, new Type(6, new NumberKind(4)), "CompareTo", "compareUnions");
}
export function makeUnionEqualMethodNoData(argType) {
  const arg = new Ident("other", argType);
  const equalsArgs = ofArray([makeUntypedGet(new Expr(0, new ValueKind(1)), "tag"), makeUntypedGet(new Expr(0, new ValueKind(5, arg)), "tag")]);
  const equalsOp = makeEqOp(null, equalsArgs, new BinaryOperator(2));
  return new Declaration(2, [new Member("Equals", new MemberKind(1), new MemberLoc(0), ofArray([arg.Type]), new Type(3)), true, null, ofArray([arg]), equalsOp, null]);
}
export function makeUnionCompareMethodNoData(argType) {
  const arg = new Ident("other", argType);
  const compareArgs = ofArray([makeUntypedGet(new Expr(0, new ValueKind(1)), "tag"), makeUntypedGet(new Expr(0, new ValueKind(5, arg)), "tag")]);
  const compareCall = makeCall(null, new Type(3), new CallKind(2, ["Util", "comparePrimitives", false, compareArgs]));
  return new Declaration(2, [new Member("CompareTo", new MemberKind(1), new MemberLoc(0), ofArray([arg.Type]), new Type(3)), true, null, ofArray([arg]), compareCall, null]);
}
export function makeRecordEqualMethod(argType) {
  return makeMeth(argType, new Type(3), "Equals", "equalsRecords");
}
export function makeRecordCompareMethod(argType) {
  return makeMeth(argType, new Type(6, new NumberKind(4)), "CompareTo", "compareRecords");
}
export function makeIteratorMethodArgsAndBody() {
  let body;
  const arg = new Expr(3, [makeUntypedGet(new Expr(0, new ValueKind(1)), "GetEnumerator"), new List(), new ApplyKind(0), new Type(1), null]);
  body = makeCall(null, new Type(1), new CallKind(2, ["Seq", "toIterator", false, ofArray([arg])]));
  const comp = makeUntypedGet(makeIdentExpr("Symbol"), "iterator");
  return [new Member("Symbol.iterator", new MemberKind(1), new MemberLoc(0), new List(), new Type(1), null, null, null, null, comp), new List(), body];
}
export function makeIteratorMethod() {
  const patternInput = makeIteratorMethodArgsAndBody();
  return new Declaration(2, [patternInput[0], true, null, patternInput[1], patternInput[2], null]);
}
export function makeReflectionMethodArgsAndBody(com, ent, extend, nullable, interfaces, cases, properties) {
  const members = toList(delay(function () {
    return append_1(ent == null ? empty() : singleton_1(["type", new Expr(0, new ValueKind(8, getValue(ent).FullName))]), delay(function () {
      return append_1(nullable ? singleton_1(["nullable", new Expr(0, new ValueKind(9, true))]) : empty(), delay(function () {
        var interfaces_1;
        return append_1((extend ? true : !(interfaces.tail == null)) ? (interfaces_1 = map_1($var12 => new Expr(0, new ValueKind(8, $var12)), interfaces), singleton_1(["interfaces", new Expr(0, new ValueKind(11, [new ArrayConsKind(0, interfaces_1), new Type(5)]))])) : empty(), delay(function () {
          return append_1(function (_arg1) {
            if (_arg1 == null) {
              return new List();
            } else {
              const genInfo = new GenericInfo(true, false);
              return function (decls) {
                return ofArray([["properties", new Expr(1, [decls, new List(), null, null])]]);
              }(map_1(function (tupledArg) {
                const body = makeTypeRef(com, genInfo, tupledArg[1]);
                return [new Member(tupledArg[0], new MemberKind(4), new MemberLoc(0), new List(), new Type(1)), new List(), body];
              }, getValue(_arg1)));
            }
          }(properties), delay(function () {
            return function (_arg2) {
              if (_arg2 == null) {
                return new List();
              } else {
                const genInfo_1 = new GenericInfo(true, false);
                return function (cases_1) {
                  return ofArray([["cases", new Expr(0, new ValueKind(11, [new ArrayConsKind(0, cases_1), new Type(1)]))]]);
                }(map_1(function (tupledArg_1) {
                  const tag = new Expr(0, new ValueKind(8, tupledArg_1[0]));
                  const typs = map_1(function (typ) {
                    return makeTypeRef(com, genInfo_1, typ);
                  }, tupledArg_1[1]);
                  return new Expr(0, new ValueKind(11, [new ArrayConsKind(0, new List(tag, typs)), new Type(1)]));
                }, getValue(_arg2)));
              }
            }(cases);
          }));
        }));
      }));
    }));
  }));
  let info;
  const matchValue = [ent, extend];
  const $var13 = matchValue[0] != null ? matchValue[1] ? [0, getValue(matchValue[0])] : [1] : [1];

  switch ($var13[0]) {
    case 0:
      info = makeCall(null, new Type(1), new CallKind(2, ["Util", "extendInfo", false, ofArray([makeTypeRefFrom(com, $var13[1]), makeJsObject(null, members)])]));
      break;

    case 1:
      info = makeJsObject(null, members);
      break;
  }

  const comp = makeUntypedGet(makeDefaultCoreRef("Symbol"), "reflection");
  return [new Member("FSymbol.reflection", new MemberKind(1), new MemberLoc(0), new List(), new Type(1), null, null, null, null, comp), new List(), info];
}
export function makeReflectionMethod(com, ent, extend, nullable, cases, properties) {
  let interfaces;
  const matchValue = ent.Kind;

  if (matchValue.tag === 1) {
    interfaces = new List("FSharpUnion", ent.Interfaces);
  } else if (matchValue.tag === 2) {
    interfaces = new List("FSharpRecord", ent.Interfaces);
  } else if (matchValue.tag === 3) {
    interfaces = new List("FSharpException", ent.Interfaces);
  } else {
    interfaces = ent.Interfaces;
  }

  const patternInput = makeReflectionMethodArgsAndBody(com, ent, extend, nullable, interfaces, cases, properties);
  return new Declaration(2, [patternInput[0], true, null, patternInput[1], patternInput[2], null]);
}

function _Type_(expr) {
  return expr.Type;
}

export { _Type_ as $7C$Type$7C$ };
export function argIdentToExpr(id) {
  const matchValue = id.Type;

  if (matchValue.tag === 2) {
    return new Expr(0, new ValueKind(0));
  } else {
    return new Expr(0, new ValueKind(5, id));
  }
}
export function makeDynamicCurriedLambda(range, typ, lambda) {
  return function (kind) {
    return makeCall(range, typ, kind);
  }(new CallKind(2, ["CurriedLambda", null, false, ofArray([lambda])]));
}
export function makeDynamicCurriedLambdaAndApply(range, typ, lambda, args) {
  const lambda_1 = makeDynamicCurriedLambda(lambda.Range, new Type(11, [ofArray([new Type(1)]), new Type(1), true]), lambda);
  return new Expr(3, [lambda_1, args, new ApplyKind(0), typ, range]);
}

function _CurriedLambda___(_arg1) {
  const $var14 = _arg1.tag === 3 ? _arg1.data[0].tag === 0 ? _arg1.data[0].data.tag === 6 ? _arg1.data[0].data.data[0] === "default" ? _arg1.data[0].data.data[1] === "CurriedLambda" ? _arg1.data[0].data.data[2].tag === 0 ? [0] : [1] : [1] : [1] : [1] : [1] : [1];

  switch ($var14[0]) {
    case 0:
      return makeSome();

    case 1:
      return null;
  }
}

export { _CurriedLambda___ as $7C$CurriedLambda$7C$_$7C$ };
export function ensureArity(com, argTypes, args) {
  const needsWrapping = function (_arg1) {
    const $var15 = _arg1[0].tag === 8 ? _arg1[0].data.tag === 11 ? _arg1[1].tag === 8 ? _arg1[1].data.tag === 11 ? [0, _arg1[1].data.data[0], _arg1[0].data.data[0], _arg1[1].data.data[1]] : [1] : [1] : [1] : _arg1[0].tag === 11 ? _arg1[1].tag === 11 ? [0, _arg1[1].data[0], _arg1[0].data[0], _arg1[1].data[1]] : [1] : [1];

    switch ($var15[0]) {
      case 0:
        const expectedLength = $var15[2].length | 0;
        const actualLength = $var15[1].length | 0;

        if ((expectedLength < actualLength ? true : expectedLength > actualLength) ? true : exists($var16 => function (option) {
          return option != null;
        }(needsWrapping($var16)), toList(zip($var15[2], $var15[1])))) {
          return [$var15[2], $var15[1], $var15[3]];
        } else {
          return null;
        }

      case 1:
        return null;
    }
  };

  const _NeedsWrapping___ = function (tupledArg) {
    return needsWrapping([tupledArg[0], tupledArg[1].Type]);
  };

  const wrap = function (com_1, typ, f, expectedArgs, actualArgs) {
    var innerArgs_1;
    var outerArgs_1;
    var innerApply;
    var range;
    const outerArgs = map_1(function (t) {
      return makeTypedIdent(com_1.GetUniqueVar(), t);
    }, expectedArgs);
    const expectedArgsLength = expectedArgs.length | 0;
    const actualArgsLength = actualArgs.length | 0;
    return function (body) {
      return makeLambdaExpr(outerArgs, body);
    }(expectedArgsLength < actualArgsLength ? (() => {
      const matchValue = toList(skip(expectedArgsLength, actualArgs));

      if (matchValue.tail != null) {
        if (matchValue.tail.tail == null) {
          const innerArgs = ofArray([makeTypedIdent(com_1.GetUniqueVar(), matchValue.head)]);
          const args_1 = map_1(function (id) {
            return argIdentToExpr(id);
          }, append(outerArgs, innerArgs));
          return function (body_1) {
            return makeLambdaExpr(innerArgs, body_1);
          }(new Expr(3, [f, args_1, new ApplyKind(0), typ, f.Range]));
        } else {
          return makeDynamicCurriedLambdaAndApply(f.Range, typ, f, map_1(function (id_1) {
            return argIdentToExpr(id_1);
          }, outerArgs));
        }
      } else {
        throw new Error("Unexpected empty innerArgs list");
      }
    })() : expectedArgsLength > actualArgsLength ? (innerArgs_1 = map_1(function (id_2) {
      return argIdentToExpr(id_2);
    }, toList(take(actualArgsLength, outerArgs))), outerArgs_1 = map_1(function (id_3) {
      return argIdentToExpr(id_3);
    }, toList(skip(actualArgsLength, outerArgs))), innerApply = makeApply(com_1, f.Range, new Type(11, [map_1(function (arg00) {
      return Expr.getType(arg00);
    }, outerArgs_1), typ, true]), f, innerArgs_1), makeApply(com_1, f.Range, typ, innerApply, outerArgs_1)) : (range = f.Range, function (args_2) {
      return makeApply(com_1, range, typ, f, args_2);
    })(map_1(function (id_4) {
      return argIdentToExpr(id_4);
    }, outerArgs)));
  };

  if (!List_1.sameLength(argTypes, args)) {
    return args;
  } else {
    return map_1(function (tupledArg_1) {
      const matchValue_1 = [tupledArg_1[0], tupledArg_1[1]];

      const activePatternResult58263 = _CurriedLambda___(matchValue_1[1]);

      if (activePatternResult58263 != null) {
        return matchValue_1[1];
      } else {
        let $var17;

        if (matchValue_1[0].tag === 12) {
          const activePatternResult58262 = _Type_(matchValue_1[1]);

          if (activePatternResult58262.tag === 11) {
            if (activePatternResult58262.data[2] ? List_1.isMultiple(activePatternResult58262.data[0]) : false) {
              $var17 = [0, activePatternResult58262.data[0], activePatternResult58262.data[2], matchValue_1[1]];
            } else {
              $var17 = [1];
            }
          } else {
            $var17 = [1];
          }
        } else {
          $var17 = [1];
        }

        switch ($var17[0]) {
          case 0:
            return makeDynamicCurriedLambda($var17[3].Range, $var17[3].Type, $var17[3]);

          case 1:
            const activePatternResult58261 = _NeedsWrapping___(matchValue_1);

            if (activePatternResult58261 != null) {
              return wrap(com, getValue(activePatternResult58261)[2], tupledArg_1[1], getValue(activePatternResult58261)[0], getValue(activePatternResult58261)[1]);
            } else {
              return tupledArg_1[1];
            }

        }
      }
    }, toList(zip(argTypes, args)));
  }
}
export function makeApply(com, range, typ, callee, args) {
  const activePatternResult58271 = _MaybeWrapped_(callee);

  const activePatternResult58272 = _CurriedLambda___(activePatternResult58271);

  if (activePatternResult58272 != null) {
    return new Expr(3, [callee, args, new ApplyKind(0), typ, range]);
  } else {
    const activePatternResult58270 = _Type_(callee);

    if (activePatternResult58270.tag === 11) {
      const argsLength = args.length | 0;
      const argTypesLength = activePatternResult58270.data[0].length | 0;

      if (argTypesLength !== argsLength) {
        const patternInput = argTypesLength < argsLength ? [toList(take(argTypesLength, args)), toList(skip(argTypesLength, args))] : [args, new List()];
        const innerArgs = ensureArity(com, activePatternResult58270.data[0], patternInput[0]);
        return makeDynamicCurriedLambdaAndApply(range, typ, callee, append(innerArgs, patternInput[1]));
      } else {
        return new Expr(3, [callee, ensureArity(com, activePatternResult58270.data[0], args), new ApplyKind(0), typ, range]);
      }
    } else {
      return new Expr(3, [callee, args, new ApplyKind(0), typ, range]);
    }
  }
}
export function compareDeclaredAndAppliedArgs(declaredArgs, appliedArgs) {
  const funcTypesEqual = function ($var23, $var24, $var25) {
    funcTypesEqual: while (true) {
      const eq = $var23;
      const types1 = $var24;
      const types2 = $var25;
      const matchValue = [types1, types2];
      const $var18 = matchValue[0].tail != null ? matchValue[0].head.tag === 12 ? matchValue[0].tail.tail == null ? [1] : matchValue[1].tail != null ? [2, matchValue[0].head, matchValue[1].head, matchValue[0].tail, matchValue[1].tail] : [3] : matchValue[1].tail != null ? [2, matchValue[0].head, matchValue[1].head, matchValue[0].tail, matchValue[1].tail] : [3] : matchValue[1].tail == null ? [0] : [3];

      switch ($var18[0]) {
        case 0:
          return true;

        case 1:
          return true;

        case 2:
          if (eq($var18[1], $var18[2])) {
            $var23 = eq;
            $var24 = $var18[3];
            $var25 = $var18[4];
            continue funcTypesEqual;
          } else {
            return false;
          }

        case 3:
          return false;
      }
    }
  };

  const listsEqual = function (eq_1, li1, li2) {
    if (!List_1.sameLength(li1, li2)) {
      return false;
    } else {
      return fold2(function (b, x, y) {
        return b ? eq_1(x, y) : false;
      }, true, li1, li2);
    }
  };

  const argEqual = function (x_1, y_1) {
    argEqual: while (true) {
      const matchValue_1 = [x_1, y_1];
      const $var19 = matchValue_1[0].tag === 8 ? matchValue_1[1].tag === 8 ? [0, matchValue_1[0].data, matchValue_1[1].data] : [5, matchValue_1[0], matchValue_1[1]] : matchValue_1[0].tag === 9 ? matchValue_1[1].tag === 9 ? [0, matchValue_1[0].data, matchValue_1[1].data] : [5, matchValue_1[0], matchValue_1[1]] : matchValue_1[0].tag === 10 ? matchValue_1[1].tag === 10 ? [1, matchValue_1[0].data, matchValue_1[1].data] : [5, matchValue_1[0], matchValue_1[1]] : matchValue_1[0].tag === 11 ? matchValue_1[1].tag === 11 ? [2, matchValue_1[0].data[0], matchValue_1[1].data[0], matchValue_1[0].data[2], matchValue_1[1].data[2], matchValue_1[0].data[1], matchValue_1[1].data[1]] : [5, matchValue_1[0], matchValue_1[1]] : matchValue_1[0].tag === 14 ? matchValue_1[1].tag === 14 ? [3, matchValue_1[0].data[0], matchValue_1[1].data[0], matchValue_1[0].data[1], matchValue_1[1].data[1]] : [5, matchValue_1[0], matchValue_1[1]] : matchValue_1[0].tag === 12 ? [4] : [5, matchValue_1[0], matchValue_1[1]];

      switch ($var19[0]) {
        case 0:
          x_1 = $var19[1];
          y_1 = $var19[2];
          continue argEqual;

        case 1:
          return listsEqual(argEqual, $var19[1], $var19[2]);

        case 2:
          if ($var19[3]) {
            if ($var19[4]) {
              const matchValue_2 = [$var19[1], $var19[2]];
              const $var20 = matchValue_2[0].tail != null ? matchValue_2[1].tail != null ? [1, matchValue_2[0].head, matchValue_2[1].head, matchValue_2[0].tail, matchValue_2[1].tail] : [2] : matchValue_2[1].tail == null ? [0] : [2];

              switch ($var20[0]) {
                case 0:
                  x_1 = $var19[5];
                  y_1 = $var19[6];
                  continue argEqual;

                case 1:
                  if (argEqual($var20[1], $var20[2])) {
                    const types1_1 = append($var20[3], ofArray([$var19[5]]));
                    const types2_1 = append($var20[4], ofArray([$var19[6]]));
                    return funcTypesEqual(argEqual, types1_1, types2_1);
                  } else {
                    return false;
                  }

                case 2:
                  return false;
              }
            } else {
              return false;
            }
          } else if (!$var19[4] ? argEqual($var19[5], $var19[6]) : false) {
            return listsEqual(argEqual, $var19[1], $var19[2]);
          } else {
            return false;
          }

        case 3:
          if (equals($var19[1], $var19[2])) {
            return listsEqual(argEqual, $var19[3], $var19[4]);
          } else {
            return false;
          }

        case 4:
          return true;

        case 5:
          return $var19[1].Equals($var19[2]);
      }
    }
  };

  return listsEqual(argEqual, declaredArgs, appliedArgs);
}