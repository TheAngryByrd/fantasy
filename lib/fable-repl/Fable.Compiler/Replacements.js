import { makeDefaultCoreRef, makeNonDeclaredTypeRef, makeTypeRefFrom, makeTypedIdent, attachRange, makeBinOp, makeArray, makeTypeTest, makeLogOp, makeNumConst, addErrorAndReturnNull, makeApply, makeIdent, addError, makeJsObject, flattenSequential, makeCoreRef, makeEqOp, makeUnOp, makeDecConst, makeStrConst, makeGet, getTypedArrayName, $7C$CoreCons$7C$_$7C$ as _CoreCons___, $7C$CoreMeth$7C$_$7C$ as _CoreMeth___, makeIdentExpr, makeBoolConst, makeIntConst, makeLambdaExpr, makeEmit, CallKind, makeCall, makeTypeRef, addWarning, GenericInfo, $7C$MaybeWrapped$7C$ as _MaybeWrapped_ } from "../AST/AST.Fable.Util";
import { zip, exists, last as last_1, take, toList as toList_1, item, fold, tryItem } from "../fable-core/Seq";
import { defaultArg, defaultArgWith, makeSome, getValue } from "../fable-core/Option";
import { Patterns, Naming, List } from "../Fable.Core/Util";
import { reverse, singleton, append, map, ofArray } from "../fable-core/List";
import List_1 from "../fable-core/List";
import Choice from "../fable-core/Choice";
import { NonDeclaredType, ApplyInfo, EntityKind, Entity, ImportKind, MemberLoc, MemberKind, ArrayConsKind, ApplyKind, ValueKind, Expr, Type } from "../AST/AST.Fable";
import { LogicalOperator, UnaryOperator, BinaryOperator, ExtendedNumberKind, NumberKind } from "../AST/AST.Common";
import CurriedLambda from "../fable-core/CurriedLambda";
import { create } from "../fable-core/Set";
import Comparer from "../fable-core/Comparer";
import { equals as equals_1, comparePrimitives } from "../fable-core/Util";
import { replace, toText, printf, toFail } from "../fable-core/String";
import Lazy from "../fable-core/Lazy";
import { fromNumber } from "../fable-core/Long";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { tryFindKey, create as create_1 } from "../fable-core/Map";
export const Util = function (__exports) {
  const _FloatToInt_ = __exports["|FloatToInt|"] = function (x) {
    return ~~x | 0;
  };

  const _StringLiteral___ = __exports["|StringLiteral|_|"] = function (_arg1) {
    let $var1;

    const activePatternResult59920 = _MaybeWrapped_(_arg1);

    if (activePatternResult59920.tag === 0) {
      if (activePatternResult59920.data.tag === 8) {
        $var1 = [0, activePatternResult59920.data.data];
      } else {
        $var1 = [1];
      }
    } else {
      $var1 = [1];
    }

    switch ($var1[0]) {
      case 0:
        return $var1[1];

      case 1:
        return null;
    }
  };

  const _Int32Literal___ = __exports["|Int32Literal|_|"] = function (_arg1) {
    let $var2;

    const activePatternResult59922 = _MaybeWrapped_(_arg1);

    if (activePatternResult59922.tag === 0) {
      if (activePatternResult59922.data.tag === 7) {
        const activePatternResult59923 = _FloatToInt_(activePatternResult59922.data.data[0]) | 0;

        if (activePatternResult59922.data.data[1].tag === 4) {
          $var2 = [0, activePatternResult59923];
        } else {
          $var2 = [1];
        }
      } else {
        $var2 = [1];
      }
    } else {
      $var2 = [1];
    }

    switch ($var2[0]) {
      case 0:
        return $var2[1];

      case 1:
        return null;
    }
  };

  const _UnionCons___ = __exports["|UnionCons|_|"] = function (expr) {
    var fields;

    const hasMultipleFields = function (tag, cases) {
      const matchValue = tryItem(tag, cases);

      if (matchValue == null) {
        return false;
      } else {
        const fieldTypes = getValue(matchValue)[1];
        return List.isMultiple(fieldTypes);
      }
    };

    let $var3;

    const activePatternResult59930 = _MaybeWrapped_(expr);

    if (activePatternResult59930.tag === 3) {
      if (activePatternResult59930.data[2].tag === 2) {
        if (activePatternResult59930.data[3].tag === 14) {
          $var3 = [0, activePatternResult59930.data[1], activePatternResult59930.data[3].data[0]];
        } else {
          $var3 = [1];
        }
      } else {
        $var3 = [1];
      }
    } else {
      $var3 = [1];
    }

    switch ($var3[0]) {
      case 0:
        const matchValue_1 = $var3[2].Kind;

        if (matchValue_1.tag === 1) {
          let $var4;

          if ($var3[1].tail != null) {
            if ($var3[1].head.tag === 0) {
              if ($var3[1].head.data.tag === 7) {
                const activePatternResult59929 = _FloatToInt_($var3[1].head.data.data[0]) | 0;

                if ($var3[1].tail.tail != null) {
                  if ($var3[1].tail.head.tag === 0) {
                    if ($var3[1].tail.head.data.tag === 11) {
                      if ($var3[1].tail.head.data.data[0].tag === 0) {
                        if ($var3[1].tail.tail.tail == null) {
                          if (fields = $var3[1].tail.head.data.data[0].data, hasMultipleFields(activePatternResult59929, matchValue_1.data)) {
                            $var4 = [1, $var3[1].tail.head.data.data[0].data, activePatternResult59929];
                          } else {
                            $var4 = [2];
                          }
                        } else {
                          $var4 = [2];
                        }
                      } else {
                        $var4 = [2];
                      }
                    } else {
                      $var4 = [2];
                    }
                  } else {
                    $var4 = [2];
                  }
                } else {
                  $var4 = [0, activePatternResult59929];
                }
              } else {
                $var4 = [2];
              }
            } else {
              $var4 = [2];
            }
          } else {
            $var4 = [2];
          }

          switch ($var4[0]) {
            case 0:
              return [$var4[1], new List_1(), matchValue_1.data];

            case 1:
              return [$var4[2], $var4[1], matchValue_1.data];

            case 2:
              let $var5;

              if ($var3[1].tail != null) {
                if ($var3[1].head.tag === 0) {
                  if ($var3[1].head.data.tag === 7) {
                    const activePatternResult59928 = _FloatToInt_($var3[1].head.data.data[0]) | 0;

                    if ($var3[1].tail.tail != null) {
                      if ($var3[1].tail.tail.tail == null) {
                        $var5 = [0, $var3[1].tail.head, activePatternResult59928];
                      } else {
                        $var5 = [1];
                      }
                    } else {
                      $var5 = [1];
                    }
                  } else {
                    $var5 = [1];
                  }
                } else {
                  $var5 = [1];
                }
              } else {
                $var5 = [1];
              }

              switch ($var5[0]) {
                case 0:
                  return [$var5[2], ofArray([$var5[1]]), matchValue_1.data];

                case 1:
                  return null;
              }

          }
        } else {
          return null;
        }

      case 1:
        return null;
    }
  };

  const _Null___ = __exports["|Null|_|"] = function (_arg1) {
    let $var6;

    const activePatternResult59932 = _MaybeWrapped_(_arg1);

    if (activePatternResult59932.tag === 0) {
      if (activePatternResult59932.data.tag === 0) {
        $var6 = [0];
      } else {
        $var6 = [1];
      }
    } else {
      $var6 = [1];
    }

    switch ($var6[0]) {
      case 0:
        return makeSome();

      case 1:
        return null;
    }
  };

  const _Type_ = __exports["|Type|"] = function (expr) {
    return expr.Type;
  };

  const _NumberType___ = __exports["|NumberType|_|"] = function (_arg1) {
    if (_arg1.tag === 6) {
      return _arg1.data;
    } else {
      return null;
    }
  };

  const _Number_ExtNumber_NoNumber_ = __exports["|Number|ExtNumber|NoNumber|"] = function (_arg1) {
    if (_arg1.tag === 6) {
      return new Choice(0, _arg1.data);
    } else if (_arg1.tag === 7) {
      return new Choice(1, _arg1.data);
    } else {
      return new Choice(2, null);
    }
  };

  const _EntFullName___ = __exports["|EntFullName|_|"] = function (typ) {
    if (typ.tag === 14) {
      return typ.data[0].FullName;
    } else {
      return null;
    }
  };

  const _IDictionary___ = __exports["|IDictionary|_|"] = function (_arg1) {
    let $var7;

    const activePatternResult59938 = _EntFullName___(_arg1);

    if (activePatternResult59938 != null) {
      if (getValue(activePatternResult59938) === "System.Collections.Generic.IDictionary") {
        $var7 = [0];
      } else {
        $var7 = [1];
      }
    } else {
      $var7 = [1];
    }

    switch ($var7[0]) {
      case 0:
        return makeSome();

      case 1:
        return null;
    }
  };

  const _IEnumerable___ = __exports["|IEnumerable|_|"] = function (_arg1) {
    let $var8;

    const activePatternResult59940 = _EntFullName___(_arg1);

    if (activePatternResult59940 != null) {
      if (getValue(activePatternResult59940) === "System.Collections.Generic.IEnumerable") {
        $var8 = [0];
      } else {
        $var8 = [1];
      }
    } else {
      $var8 = [1];
    }

    switch ($var8[0]) {
      case 0:
        return makeSome();

      case 1:
        return null;
    }
  };

  const _IEqualityComparer___ = __exports["|IEqualityComparer|_|"] = function (_arg1) {
    let $var9;

    const activePatternResult59942 = _EntFullName___(_arg1);

    if (activePatternResult59942 != null) {
      if (getValue(activePatternResult59942) === "System.Collections.Generic.IEqualityComparer") {
        $var9 = [0];
      } else {
        $var9 = [1];
      }
    } else {
      $var9 = [1];
    }

    switch ($var9[0]) {
      case 0:
        return makeSome();

      case 1:
        return null;
    }
  };

  const _DeclaredKind___ = __exports["|DeclaredKind|_|"] = function (typ) {
    if (typ.tag === 14) {
      return typ.data[0].Kind;
    } else {
      return null;
    }
  };

  const _KeyValue___ = __exports["|KeyValue|_|"] = function (key, value, s) {
    if (s === key) {
      return value;
    } else {
      return null;
    }
  };

  const _OneArg___ = __exports["|OneArg|_|"] = function (callee, args) {
    const matchValue = [callee, args];
    const $var10 = matchValue[0] == null ? matchValue[1].tail != null ? [0] : [1] : [1];

    switch ($var10[0]) {
      case 0:
        const arg = matchValue[1].head;
        return arg;

      case 1:
        return null;
    }
  };

  const _TwoArgs___ = __exports["|TwoArgs|_|"] = function (callee, args) {
    const matchValue = [callee, args];
    const $var11 = matchValue[0] == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? [0, matchValue[1].head, matchValue[1].tail.head] : [1] : [1] : [1];

    switch ($var11[0]) {
      case 0:
        return [$var11[1], $var11[2]];

      case 1:
        return null;
    }
  };

  const _ThreeArgs___ = __exports["|ThreeArgs|_|"] = function (callee, args) {
    const matchValue = [callee, args];
    const $var12 = matchValue[0] == null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail != null ? [0, matchValue[1].head, matchValue[1].tail.head, matchValue[1].tail.tail.head] : [1] : [1] : [1] : [1];

    switch ($var12[0]) {
      case 0:
        return [$var12[1], $var12[2], $var12[3]];

      case 1:
        return null;
    }
  };

  const _Integer_Float_ = __exports["|Integer|Float|"] = function (_arg1) {
    switch (_arg1.tag) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return new Choice(0, null);

      case 6:
      case 7:
        return new Choice(1, null);

      default:
        return new Choice(0, null);
    }
  };

  const _Nameof___ = __exports["|Nameof|_|"] = function (_arg1) {
    const $var13 = _arg1.tag === 0 ? _arg1.data.tag === 5 ? [0, _arg1.data.data] : _arg1.data.tag === 4 ? [2, _arg1.data.data[0]] : [3] : _arg1.tag === 3 ? _arg1.data[1].tail != null ? _arg1.data[1].head.tag === 0 ? _arg1.data[1].head.data.tag === 8 ? _arg1.data[1].tail.tail == null ? _arg1.data[2].tag === 1 ? [1, _arg1.data[1].head.data.data] : [3] : [3] : [3] : [3] : [3] : [3];

    switch ($var13[0]) {
      case 0:
        return $var13[1].Name;

      case 1:
        return $var13[1];

      case 2:
        return $var13[1].Name;

      case 3:
        return null;
    }
  };

  const resolveTypeRef = __exports.resolveTypeRef = function (com, info, generic, t) {
    const genInfo = new GenericInfo(generic, info.genericAvailability);
    const $var14 = t.tag === 12 ? !info.genericAvailability ? [0] : [1] : [1];

    switch ($var14[0]) {
      case 0:
        (function (warning) {
          addWarning(com, info.fileName, info.range, warning);
        })("`typeof` is being called on a generic parameter, consider inlining the method (for `internal` members) or using `PassGenericsAttribute`.");

        return makeTypeRef(com, genInfo, t);

      case 1:
        return makeTypeRef(com, genInfo, t);
    }
  };

  const instanceArgs = __exports.instanceArgs = function (callee, args) {
    if (callee == null) {
      return [args.head, args.tail];
    } else {
      return [getValue(callee), args];
    }
  };

  const staticArgs = __exports.staticArgs = function (callee, args) {
    if (callee == null) {
      return args;
    } else {
      return new List_1(getValue(callee), args);
    }
  };

  const chainCall = __exports.chainCall = function (meth, args, t, e) {
    var range;
    return (range = e.Range, function (kind) {
      return makeCall(range, t, kind);
    })(new CallKind(0, [e, meth, args]));
  };

  const icall = __exports.icall = function (i, meth) {
    const patternInput = instanceArgs(i.callee, i.args);
    return makeCall(i.range, i.returnType, new CallKind(0, [patternInput[0], meth, patternInput[1]]));
  };

  const ccall = __exports.ccall = function (i, cmod, meth, args) {
    return makeCall(i.range, i.returnType, new CallKind(2, [cmod, meth, false, args]));
  };

  const ccall_ = __exports.ccall_ = function (r, t, cmod, meth, args) {
    return function (kind) {
      return makeCall(r, t, kind);
    }(new CallKind(2, [cmod, meth, false, args]));
  };

  const emit = __exports.emit = function (i, emit_1, args) {
    return makeEmit(i.range, i.returnType, args, emit_1);
  };

  const emitNoInfo = __exports.emitNoInfo = function (emit_1, args) {
    return makeEmit(null, new Type(1), args, emit_1);
  };

  const wrap = __exports.wrap = function (typ, expr) {
    return new Expr(13, [expr, typ]);
  };

  const wrapInLambda = __exports.wrapInLambda = function (args, f) {
    return function (body) {
      return makeLambdaExpr(args, body);
    }(f(map($var15 => new Expr(0, new ValueKind(5, $var15)), args)));
  };

  const genArg = __exports.genArg = function (t) {
    const matchValue = t.GenericArgs;
    const $var16 = matchValue.tail != null ? matchValue.tail.tail == null ? [0, matchValue.head] : [1] : [1];

    switch ($var16[0]) {
      case 0:
        return $var16[1];

      case 1:
        return new Type(1);
    }
  };

  const defaultof = __exports.defaultof = function (t) {
    if (t.tag === 6) {
      return makeIntConst(0);
    } else if (t.tag === 3) {
      return makeBoolConst(false);
    } else {
      return new Expr(0, new ValueKind(0));
    }
  };

  const getProp = __exports.getProp = function (r, t, callee, prop) {
    return new Expr(3, [callee, ofArray([new Expr(0, new ValueKind(8, prop))]), new ApplyKind(1), t, r]);
  };

  const newError = __exports.newError = function (r, t, args) {
    return new Expr(3, [makeIdentExpr("Error"), args, new ApplyKind(2), t, r]);
  };

  const toChar = __exports.toChar = function (i, sourceType, args) {
    const $var17 = sourceType.tag === 4 ? [0] : sourceType.tag === 5 ? [0] : [1];

    switch ($var17[0]) {
      case 0:
        return args.head;

      case 1:
        return makeCall(i.range, i.returnType, new CallKind(3, ["String", "fromCharCode", false, ofArray([args.head])]));
    }
  };

  const toString = __exports.toString = function (i, sourceType, args) {
    const $var18 = sourceType.tag === 5 ? [0] : sourceType.tag === 2 ? [1] : sourceType.tag === 3 ? [1] : sourceType.tag === 9 ? [1] : sourceType.tag === 10 ? [1] : sourceType.tag === 11 ? [1] : sourceType.tag === 13 ? [1] : sourceType.tag === 6 ? [2] : sourceType.tag === 7 ? sourceType.data.tag === 1 ? [2] : sourceType.data.tag === 2 ? [2] : sourceType.data.tag === 3 ? [3] : [2] : sourceType.tag === 0 ? [3] : sourceType.tag === 1 ? [3] : sourceType.tag === 12 ? [3] : sourceType.tag === 14 ? [3] : sourceType.tag === 8 ? [3] : [0];

    switch ($var18[0]) {
      case 0:
        return args.head;

      case 1:
        return makeCall(i.range, i.returnType, new CallKind(3, ["String", null, false, ofArray([args.head])]));

      case 2:
        let arg;
        const matchValue = [sourceType, args.tail];
        const $var19 = matchValue[0].tag === 6 ? matchValue[0].data.tag === 2 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [0] : [3] : [3] : matchValue[0].data.tag === 4 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [1] : [3] : [3] : [3] : matchValue[0].tag === 7 ? matchValue[0].data.tag === 0 ? matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [2] : [3] : [3] : [3] : [3];

        switch ($var19[0]) {
          case 0:
            arg = emit(i, "((x,y) => x < 0 && y !== 10 ? 0xFFFF + x + 1 : x)($0,$1)", args);
            break;

          case 1:
            arg = emit(i, "((x,y) => x < 0 && y !== 10 ? 0xFFFFFFFF + x + 1 : x)($0,$1)", args);
            break;

          case 2:
            arg = emit(i, "((x,y) => x.isNegative() && y !== 10 ? x.toUnsigned() : x)($0,$1)", args);
            break;

          case 3:
            arg = args.head;
            break;
        }

        return makeCall(i.range, i.returnType, new CallKind(0, [arg, "toString", args.tail]));

      case 3:
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "toString", false, ofArray([args.head])]));
    }
  };

  const toFloat = __exports.toFloat = function (range, sourceType, targetType, args) {
    var typ;
    const $var20 = sourceType.tag === 5 ? [0] : sourceType.tag === 7 ? sourceType.data.tag === 0 ? [1] : sourceType.data.tag === 1 ? [1] : sourceType.data.tag === 3 ? [2] : [3] : [3];

    switch ($var20[0]) {
      case 0:
        return function (kind) {
          return makeCall(range, targetType, kind);
        }(new CallKind(2, ["Double", "parse", false, args]));

      case 1:
        return (typ = new Type(6, new NumberKind(7)), function (kind_1) {
          return makeCall(range, typ, kind_1);
        })(new CallKind(0, [args.head, "toNumber", args.tail]));

      case 2:
        let meth;
        let $var21;

        const activePatternResult60003 = _Number_ExtNumber_NoNumber_(targetType);

        if (activePatternResult60003.tag === 0) {
          if (activePatternResult60003.data.tag === 6) {
            $var21 = [0];
          } else if (activePatternResult60003.data.tag === 7) {
            $var21 = [1];
          } else {
            $var21 = [3];
          }
        } else if (activePatternResult60003.tag === 1) {
          if (activePatternResult60003.data.tag === 2) {
            $var21 = [2];
          } else {
            $var21 = [3];
          }
        } else {
          $var21 = [3];
        }

        switch ($var21[0]) {
          case 0:
            meth = "toSingle";
            break;

          case 1:
            meth = "toDouble";
            break;

          case 2:
            meth = "toDecimal";
            break;

          case 3:
            throw new Error("Unexpected conversion");
            break;
        }

        return function (kind_2) {
          return makeCall(range, targetType, kind_2);
        }(new CallKind(2, ["BigInt", meth, false, args]));

      case 3:
        return wrap(targetType, args.head);
    }
  };

  const toInt = __exports.toInt = function (round, range, sourceType, targetType, args) {
    const kindIndex = function (t) {
      const activePatternResult60008 = _Number_ExtNumber_NoNumber_(t);

      if (activePatternResult60008.tag === 1) {
        if (activePatternResult60008.data.tag === 1) {
          return 7;
        } else if (activePatternResult60008.data.tag === 2) {
          return 10;
        } else if (activePatternResult60008.data.tag === 3) {
          return 11;
        } else {
          return 3;
        }
      } else if (activePatternResult60008.tag === 2) {
        throw new Error("Unexpected non-number type");
      } else if (activePatternResult60008.data.tag === 2) {
        return 1;
      } else if (activePatternResult60008.data.tag === 4) {
        return 2;
      } else if (activePatternResult60008.data.tag === 1) {
        return 4;
      } else if (activePatternResult60008.data.tag === 3) {
        return 5;
      } else if (activePatternResult60008.data.tag === 5) {
        return 6;
      } else if (activePatternResult60008.data.tag === 6) {
        return 8;
      } else if (activePatternResult60008.data.tag === 7) {
        return 9;
      } else {
        return 0;
      }
    };

    const needToCast = function (typeFrom, typeTo) {
      const v = kindIndex(typeFrom) | 0;
      const h = kindIndex(typeTo) | 0;

      if ((v > h ? true : v < 4 ? h > 3 : false) ? h < 8 : false) {
        return true;
      } else if (h !== v) {
        if (h === 11) {
          return true;
        } else {
          return v === 11;
        }
      } else {
        return false;
      }
    };

    const emitLong = function (unsigned, args_1) {
      return function (kind) {
        return makeCall(range, targetType, kind);
      }((() => {
        let $var22;

        const activePatternResult60012 = _Number_ExtNumber_NoNumber_(sourceType);

        if (activePatternResult60012.tag === 1) {
          if (activePatternResult60012.data.tag === 0) {
            $var22 = [0];
          } else if (activePatternResult60012.data.tag === 1) {
            $var22 = [0];
          } else {
            $var22 = [1];
          }
        } else {
          $var22 = [1];
        }

        switch ($var22[0]) {
          case 0:
            return new CallKind(2, ["Long", "fromValue", false, args_1]);

          case 1:
            return new CallKind(2, ["Long", "fromNumber", false, append(args_1, ofArray([makeBoolConst(unsigned)]))]);
        }
      })());
    };

    const emitBigInt = function (args_2) {
      return function (kind_1) {
        return makeCall(range, targetType, kind_1);
      }((() => {
        let $var23;

        const activePatternResult60015 = _Number_ExtNumber_NoNumber_(sourceType);

        if (activePatternResult60015.tag === 1) {
          if (activePatternResult60015.data.tag === 0) {
            $var23 = [0];
          } else if (activePatternResult60015.data.tag === 1) {
            $var23 = [0];
          } else {
            $var23 = [1];
          }
        } else {
          $var23 = [1];
        }

        switch ($var23[0]) {
          case 0:
            return new CallKind(2, ["BigInt", "fromInt64", false, args_2]);

          case 1:
            return new CallKind(2, ["BigInt", "fromInt32", false, args_2]);
        }
      })());
    };

    const emitCast = function (typeTo_1, args_3) {
      const activePatternResult60017 = _Number_ExtNumber_NoNumber_(typeTo_1);

      if (activePatternResult60017.tag === 0) {
        if (activePatternResult60017.data.tag === 2) {
          return makeEmit(range, targetType, args_3, "($0 + 0x8000 & 0xFFFF) - 0x8000");
        } else if (activePatternResult60017.data.tag === 4) {
          return makeEmit(range, targetType, args_3, "~~$0");
        } else if (activePatternResult60017.data.tag === 1) {
          return makeEmit(range, targetType, args_3, "$0 & 0xFF");
        } else if (activePatternResult60017.data.tag === 3) {
          return makeEmit(range, targetType, args_3, "$0 & 0xFFFF");
        } else if (activePatternResult60017.data.tag === 5) {
          return makeEmit(range, targetType, args_3, "$0 >>> 0");
        } else if (activePatternResult60017.data.tag === 6) {
          return makeEmit(range, targetType, args_3, "$0");
        } else if (activePatternResult60017.data.tag === 7) {
          return makeEmit(range, targetType, args_3, "$0");
        } else {
          return makeEmit(range, targetType, args_3, "($0 + 0x80 & 0xFF) - 0x80");
        }
      } else if (activePatternResult60017.tag === 2) {
        throw new Error("Unexpected non-number type");
      } else if (activePatternResult60017.data.tag === 1) {
        return emitLong(true, args_3);
      } else if (activePatternResult60017.data.tag === 0) {
        return emitLong(false, args_3);
      } else if (activePatternResult60017.data.tag === 2) {
        return makeEmit(range, targetType, args_3, "$0");
      } else {
        return emitBigInt(args_3);
      }
    };

    const castBigIntMethod = function (typeTo_2) {
      const activePatternResult60020 = _Number_ExtNumber_NoNumber_(typeTo_2);

      if (activePatternResult60020.tag === 0) {
        if (activePatternResult60020.data.tag === 2) {
          return "toInt16";
        } else if (activePatternResult60020.data.tag === 4) {
          return "toInt32";
        } else if (activePatternResult60020.data.tag === 1) {
          return "toByte";
        } else if (activePatternResult60020.data.tag === 3) {
          return "toUInt16";
        } else if (activePatternResult60020.data.tag === 5) {
          return "toUInt32";
        } else if (activePatternResult60020.data.tag === 6) {
          return "toSingle";
        } else if (activePatternResult60020.data.tag === 7) {
          return "toDouble";
        } else {
          return "toSByte";
        }
      } else if (activePatternResult60020.tag === 2) {
        throw new Error("Unexpected non-number type");
      } else if (activePatternResult60020.data.tag === 0) {
        return "toInt64";
      } else if (activePatternResult60020.data.tag === 1) {
        return "toUInt64";
      } else if (activePatternResult60020.data.tag === 2) {
        return "toDecimal";
      } else {
        throw new Error("Unexpected conversion");
      }
    };

    const sourceType_1 = sourceType.tag === 13 ? new Type(6, new NumberKind(4)) : sourceType;
    let $var24;

    if (sourceType_1.tag === 4) {
      $var24 = [0];
    } else if (sourceType_1.tag === 5) {
      $var24 = [1];
    } else {
      const activePatternResult60041 = _Number_ExtNumber_NoNumber_(sourceType_1);

      if (activePatternResult60041.tag === 1) {
        if (activePatternResult60041.data.tag === 3) {
          $var24 = [2];
        } else {
          $var24 = [3, sourceType_1];
        }
      } else if (activePatternResult60041.tag === 0) {
        $var24 = [3, sourceType_1];
      } else {
        $var24 = [4];
      }
    }

    switch ($var24[0]) {
      case 0:
        return function (kind_2) {
          return makeCall(range, targetType, kind_2);
        }(new CallKind(0, [args.head, "charCodeAt", ofArray([makeIntConst(0)])]));

      case 1:
        const $var25 = targetType.tag === 7 ? targetType.data.tag === 0 ? [0, targetType.data] : targetType.data.tag === 1 ? [0, targetType.data] : [1] : [1];

        switch ($var25[0]) {
          case 0:
            const unsigned_1 = $var25[1].Equals(new ExtendedNumberKind(1));
            const args_4 = append(ofArray([args.head]), append(ofArray([makeBoolConst(unsigned_1)]), args.tail));
            return function (kind_3) {
              return makeCall(range, targetType, kind_3);
            }(new CallKind(2, ["Long", "fromString", false, args_4]));

          case 1:
            return function (kind_4) {
              return makeCall(range, targetType, kind_4);
            }(new CallKind(2, ["Int32", "parse", false, args]));
        }

      case 2:
        const meth = castBigIntMethod(targetType);
        return function (kind_5) {
          return makeCall(range, targetType, kind_5);
        }(new CallKind(2, ["BigInt", meth, false, args]));

      case 3:
        let $var26;

        const activePatternResult60040 = _Number_ExtNumber_NoNumber_(targetType);

        if (activePatternResult60040.tag === 0) {
          if (needToCast($var24[1], targetType)) {
            $var26 = [0, targetType];
          } else {
            $var26 = [1];
          }
        } else if (activePatternResult60040.tag === 1) {
          if (needToCast($var24[1], targetType)) {
            $var26 = [0, targetType];
          } else {
            $var26 = [1];
          }
        } else {
          $var26 = [1];
        }

        switch ($var26[0]) {
          case 0:
            return CurriedLambda(emitCast)($var26[1])(singleton((() => {
              var typ;
              const matchValue = [$var24[1], $var26[1]];
              let $var27;

              const activePatternResult60030 = _Number_ExtNumber_NoNumber_(matchValue[0]);

              if (activePatternResult60030.tag === 1) {
                if (activePatternResult60030.data.tag === 1) {
                  const activePatternResult60031 = _Number_ExtNumber_NoNumber_(matchValue[1]);

                  if (activePatternResult60031.tag === 1) {
                    if (activePatternResult60031.data.tag === 2) {
                      $var27 = [0];
                    } else {
                      $var27 = [2];
                    }
                  } else if (activePatternResult60031.tag === 0) {
                    $var27 = [0];
                  } else {
                    $var27 = [2];
                  }
                } else if (activePatternResult60030.data.tag === 0) {
                  const activePatternResult60032 = _Number_ExtNumber_NoNumber_(matchValue[1]);

                  if (activePatternResult60032.tag === 1) {
                    if (activePatternResult60032.data.tag === 2) {
                      $var27 = [0];
                    } else {
                      $var27 = [2];
                    }
                  } else if (activePatternResult60032.tag === 0) {
                    $var27 = [0];
                  } else {
                    $var27 = [2];
                  }
                } else if (activePatternResult60030.data.tag === 2) {
                  const activePatternResult60033 = _Number_ExtNumber_NoNumber_(matchValue[1]);

                  if (activePatternResult60033.tag === 0) {
                    const activePatternResult60034 = _Integer_Float_(activePatternResult60033.data);

                    if (activePatternResult60034.tag === 0) {
                      if (round) {
                        $var27 = [1];
                      } else {
                        $var27 = [2];
                      }
                    } else {
                      $var27 = [2];
                    }
                  } else if (activePatternResult60033.tag === 1) {
                    if (activePatternResult60033.data.tag === 0) {
                      if (round) {
                        $var27 = [1];
                      } else {
                        $var27 = [2];
                      }
                    } else if (activePatternResult60033.data.tag === 1) {
                      if (round) {
                        $var27 = [1];
                      } else {
                        $var27 = [2];
                      }
                    } else {
                      $var27 = [2];
                    }
                  } else {
                    $var27 = [2];
                  }
                } else {
                  $var27 = [2];
                }
              } else if (activePatternResult60030.tag === 0) {
                const activePatternResult60035 = _Integer_Float_(activePatternResult60030.data);

                if (activePatternResult60035.tag === 1) {
                  const activePatternResult60036 = _Number_ExtNumber_NoNumber_(matchValue[1]);

                  if (activePatternResult60036.tag === 0) {
                    const activePatternResult60037 = _Integer_Float_(activePatternResult60036.data);

                    if (activePatternResult60037.tag === 0) {
                      if (round) {
                        $var27 = [1];
                      } else {
                        $var27 = [2];
                      }
                    } else {
                      $var27 = [2];
                    }
                  } else if (activePatternResult60036.tag === 1) {
                    if (activePatternResult60036.data.tag === 0) {
                      if (round) {
                        $var27 = [1];
                      } else {
                        $var27 = [2];
                      }
                    } else if (activePatternResult60036.data.tag === 1) {
                      if (round) {
                        $var27 = [1];
                      } else {
                        $var27 = [2];
                      }
                    } else {
                      $var27 = [2];
                    }
                  } else {
                    $var27 = [2];
                  }
                } else {
                  $var27 = [2];
                }
              } else {
                $var27 = [2];
              }

              switch ($var27[0]) {
                case 0:
                  return (typ = new Type(6, new NumberKind(7)), function (kind_6) {
                    return makeCall(range, typ, kind_6);
                  })(new CallKind(0, [args.head, "toNumber", args.tail]));

                case 1:
                  return function (kind_7) {
                    return makeCall(range, targetType, kind_7);
                  }(new CallKind(2, ["Util", "round", false, args]));

                case 2:
                  return args.head;
              }
            })()));

          case 1:
            let $var28;

            const activePatternResult60039 = _Number_ExtNumber_NoNumber_(targetType);

            if (activePatternResult60039.tag === 1) {
              if (activePatternResult60039.data.tag === 1) {
                $var28 = [0, activePatternResult60039.data];
              } else if (activePatternResult60039.data.tag === 0) {
                $var28 = [0, activePatternResult60039.data];
              } else {
                $var28 = [2];
              }
            } else if (activePatternResult60039.tag === 0) {
              $var28 = [1];
            } else {
              $var28 = [2];
            }

            switch ($var28[0]) {
              case 0:
                return emitLong($var28[1].Equals(new ExtendedNumberKind(1)), ofArray([args.head]));

              case 1:
                return makeEmit(range, targetType, ofArray([args.head]), "$0");

              case 2:
                return wrap(targetType, args.head);
            }

        }

      case 4:
        return wrap(targetType, args.head);
    }
  };

  const toList = __exports.toList = function (com, i, expr) {
    return makeCall(i.range, i.returnType, new CallKind(2, ["Seq", "toList", false, ofArray([expr])]));
  };

  const toArray = __exports.toArray = function (com, i, expr) {
    var numberKind;

    const arrayFrom = function (arrayCons, expr_1) {
      return makeCall(i.range, i.returnType, new CallKind(3, [arrayCons, "from", false, ofArray([expr_1])]));
    };

    const matchValue = [expr, i.returnType];
    let $var29;

    const activePatternResult60057 = _CoreMeth___("List", "ofArray", matchValue[0]);

    if (activePatternResult60057 != null) {
      if (getValue(activePatternResult60057).tail != null) {
        if (getValue(activePatternResult60057).tail.tail == null) {
          $var29 = [0, getValue(activePatternResult60057).head];
        } else {
          $var29 = [1];
        }
      } else {
        $var29 = [1];
      }
    } else {
      $var29 = [1];
    }

    switch ($var29[0]) {
      case 0:
        return $var29[1];

      case 1:
        let $var30;

        const activePatternResult60055 = _CoreCons___("List", "default", matchValue[0]);

        if (activePatternResult60055 != null) {
          if (getValue(activePatternResult60055).tail == null) {
            $var30 = [0];
          } else {
            $var30 = [1];
          }
        } else {
          $var30 = [1];
        }

        switch ($var30[0]) {
          case 0:
            return new Expr(0, new ValueKind(11, [new ArrayConsKind(0, new List_1()), genArg(i.returnType)]));

          case 1:
            const $var31 = matchValue[1].tag === 9 ? matchValue[1].data.tag === 6 ? (numberKind = matchValue[1].data.data, com.Options.typedArrays) ? [0, matchValue[1].data.data] : [1] : [1] : [1];

            switch ($var31[0]) {
              case 0:
                return arrayFrom(getTypedArrayName(com, $var31[1]), expr);

              case 1:
                return arrayFrom("Array", expr);
            }

        }

    }
  };

  const getZero = __exports.getZero = function (_arg1) {
    switch (_arg1.tag) {
      case 14:
        const matchValue = _arg1.data[0].FullName;

        switch (matchValue) {
          case "System.TimeSpan":
            return makeIntConst(0);

          case "System.DateTime":
            return ccall_(null, _arg1, "Date", "minValue", new List_1());

          case "System.DateTimeOffset":
            return ccall_(null, _arg1, "DateOffset", "minValue", new List_1());

          case "Microsoft.FSharp.Collections.FSharpSet":
            return ccall_(null, _arg1, "Set", "create", new List_1());

          default:
            const callee = new Expr(0, new ValueKind(4, [_arg1.data[0], new List_1()]));
            return makeGet(null, _arg1, callee, makeStrConst("Zero"));
        }

      case 7:
        const $var32 = _arg1.data.tag === 1 ? [0] : _arg1.data.tag === 2 ? [1] : _arg1.data.tag === 3 ? [2] : [0];

        switch ($var32[0]) {
          case 0:
            return ccall_(null, _arg1, "Long", "fromInt", ofArray([makeIntConst(0)]));

          case 1:
            return makeDecConst(0);

          case 2:
            return ccall_(null, _arg1, "BigInt", "fromInt32", ofArray([makeIntConst(0)]));
        }

      case 4:
      case 5:
        return makeStrConst("");

      default:
        return makeIntConst(0);
    }
  };

  const applyOpReplacedEntities = __exports.applyOpReplacedEntities = create(ofArray(["System.TimeSpan", "System.DateTime", "System.DateTimeOffset", "Microsoft.FSharp.Collections.FSharpSet"]), new Comparer(comparePrimitives));

  const applyOp = __exports.applyOp = function (range, returnType, args, meth) {
    const _CustomOp___ = function (meth_1, argTypes, ent) {
      if (applyOpReplacedEntities.has(ent.FullName)) {
        return null;
      } else {
        return function (_arg1) {
          return _arg1 != null ? [ent, getValue(_arg1)] : null;
        }(ent.TryGetMember(meth_1, new MemberKind(1), new MemberLoc(1), argTypes));
      }
    };

    const apply = function (op, args_1) {
      return new Expr(3, [new Expr(0, op), args_1, new ApplyKind(0), returnType, range]);
    };

    const nativeOp = function (leftOperand, _arg2) {
      switch (_arg2) {
        case "op_Addition":
          return new ValueKind(14, new BinaryOperator(12));

        case "op_Subtraction":
          return new ValueKind(14, new BinaryOperator(11));

        case "op_Multiply":
          return new ValueKind(14, new BinaryOperator(13));

        case "op_Division":
          return new ValueKind(14, new BinaryOperator(14));

        case "op_Modulus":
          return new ValueKind(14, new BinaryOperator(15));

        case "op_LeftShift":
          return new ValueKind(14, new BinaryOperator(8));

        case "op_RightShift":
          const $var33 = leftOperand.tag === 6 ? leftOperand.data.tag === 5 ? [0] : [1] : [1];

          switch ($var33[0]) {
            case 0:
              return new ValueKind(14, new BinaryOperator(10));

            case 1:
              return new ValueKind(14, new BinaryOperator(9));
          }

        case "op_BitwiseAnd":
          return new ValueKind(14, new BinaryOperator(19));

        case "op_BitwiseOr":
          return new ValueKind(14, new BinaryOperator(17));

        case "op_ExclusiveOr":
          return new ValueKind(14, new BinaryOperator(18));

        case "op_LogicalNot":
          return new ValueKind(13, new UnaryOperator(3));

        case "op_UnaryNegation":
          return new ValueKind(13, new UnaryOperator(0));

        case "op_BooleanAnd":
          return new ValueKind(15, new LogicalOperator(1));

        case "op_BooleanOr":
          return new ValueKind(15, new LogicalOperator(0));

        default:
          return toFail(printf("Unknown operator: %s"))(meth);
      }
    };

    const argTypes_1 = map(function (arg00) {
      return Expr.getType(arg00);
    }, args);
    let $var34;

    if (argTypes_1.tail != null) {
      if (argTypes_1.head.tag === 14) {
        const activePatternResult60085 = _CustomOp___(meth, argTypes_1, argTypes_1.head.data[0]);

        if (activePatternResult60085 != null) {
          $var34 = [0, getValue(activePatternResult60085)[0], getValue(activePatternResult60085)[1]];
        } else if (argTypes_1.tail.tail != null) {
          if (argTypes_1.tail.head.tag === 14) {
            const activePatternResult60087 = _CustomOp___(meth, argTypes_1, argTypes_1.tail.head.data[0]);

            if (activePatternResult60087 != null) {
              if (argTypes_1.tail.tail.tail == null) {
                $var34 = [0, getValue(activePatternResult60087)[0], getValue(activePatternResult60087)[1]];
              } else {
                $var34 = [1];
              }
            } else {
              $var34 = [1];
            }
          } else {
            $var34 = [1];
          }
        } else {
          $var34 = [1];
        }
      } else if (argTypes_1.tail.tail != null) {
        if (argTypes_1.tail.head.tag === 14) {
          const activePatternResult60089 = _CustomOp___(meth, argTypes_1, argTypes_1.tail.head.data[0]);

          if (activePatternResult60089 != null) {
            if (argTypes_1.tail.tail.tail == null) {
              $var34 = [0, getValue(activePatternResult60089)[0], getValue(activePatternResult60089)[1]];
            } else {
              $var34 = [1];
            }
          } else {
            $var34 = [1];
          }
        } else {
          $var34 = [1];
        }
      } else {
        $var34 = [1];
      }
    } else {
      $var34 = [1];
    }

    switch ($var34[0]) {
      case 0:
        const typRef = new Expr(0, new ValueKind(4, [$var34[1], new List_1()]));
        return function (kind) {
          return makeCall(range, returnType, kind);
        }(new CallKind(0, [typRef, $var34[2].OverloadName, args]));

      case 1:
        let $var35;

        if (argTypes_1.tail != null) {
          if (argTypes_1.head.tag === 7) {
            if (argTypes_1.head.data.tag === 3) {
              $var35 = [0];
            } else if (argTypes_1.head.data.tag === 0) {
              $var35 = [1];
            } else if (argTypes_1.head.data.tag === 1) {
              $var35 = [1];
            } else {
              $var35 = [3];
            }
          } else if (argTypes_1.head.tag === 6) {
            const activePatternResult60083 = _Integer_Float_(argTypes_1.head.data);

            if (activePatternResult60083.tag === 0) {
              if (meth === "op_Division") {
                $var35 = [2];
              } else {
                $var35 = [3];
              }
            } else {
              $var35 = [3];
            }
          } else {
            $var35 = [3];
          }
        } else {
          $var35 = [3];
        }

        switch ($var35[0]) {
          case 0:
            return function (kind_1) {
              return makeCall(range, returnType, kind_1);
            }(new CallKind(2, ["BigInt", meth, false, args]));

          case 1:
            let meth_2;

            switch (meth) {
              case "op_Addition":
                meth_2 = "add";
                break;

              case "op_Subtraction":
                meth_2 = "sub";
                break;

              case "op_Multiply":
                meth_2 = "mul";
                break;

              case "op_Division":
                meth_2 = "div";
                break;

              case "op_Modulus":
                meth_2 = "mod";
                break;

              case "op_LeftShift":
                meth_2 = "shl";
                break;

              case "op_RightShift":
                meth_2 = "shr";
                break;

              case "op_BitwiseAnd":
                meth_2 = "and";
                break;

              case "op_BitwiseOr":
                meth_2 = "or";
                break;

              case "op_ExclusiveOr":
                meth_2 = "xor";
                break;

              case "op_LogicalNot":
                meth_2 = "not";
                break;

              case "op_UnaryNegation":
                meth_2 = "neg";
                break;

              default:
                meth_2 = toFail(printf("Unknown operator: %s"))(meth);
            }

            return function (kind_2) {
              return makeCall(range, returnType, kind_2);
            }(new CallKind(0, [args.head, meth_2, args.tail]));

          case 2:
            return CurriedLambda(apply)(new ValueKind(13, new UnaryOperator(3)))(singleton(CurriedLambda(apply)(new ValueKind(13, new UnaryOperator(3)))(singleton(apply(new ValueKind(14, new BinaryOperator(14)), args)))));

          case 3:
            let $var36;

            if (argTypes_1.tail != null) {
              const activePatternResult60076 = _EntFullName___(argTypes_1.head);

              if (activePatternResult60076 != null) {
                const activePatternResult60080 = _KeyValue___("System.DateTime", "Date", getValue(activePatternResult60076));

                if (activePatternResult60080 != null) {
                  $var36 = [0, getValue(activePatternResult60080)];
                } else {
                  const activePatternResult60081 = _KeyValue___("System.DateTimeOffset", "DateOffset", getValue(activePatternResult60076));

                  if (activePatternResult60081 != null) {
                    $var36 = [0, getValue(activePatternResult60081)];
                  } else {
                    const activePatternResult60082 = _KeyValue___("Microsoft.FSharp.Collections.FSharpSet", "Set", getValue(activePatternResult60076));

                    if (activePatternResult60082 != null) {
                      $var36 = [0, getValue(activePatternResult60082)];
                    } else {
                      $var36 = [1];
                    }
                  }
                }
              } else {
                $var36 = [1];
              }
            } else {
              $var36 = [1];
            }

            switch ($var36[0]) {
              case 0:
                return function (kind_3) {
                  return makeCall(range, returnType, kind_3);
                }(new CallKind(2, [$var36[1], meth, false, args]));

              case 1:
                let $var37;

                if (argTypes_1.tail != null) {
                  const activePatternResult60075 = _EntFullName___(argTypes_1.head);

                  if (activePatternResult60075 != null) {
                    if (getValue(activePatternResult60075) === "System.TimeSpan") {
                      $var37 = [0];
                    } else if (argTypes_1.head.tag === 3) {
                      $var37 = [0];
                    } else if (argTypes_1.head.tag === 4) {
                      $var37 = [0];
                    } else if (argTypes_1.head.tag === 5) {
                      $var37 = [0];
                    } else if (argTypes_1.head.tag === 6) {
                      $var37 = [0];
                    } else if (argTypes_1.head.tag === 13) {
                      $var37 = [0];
                    } else {
                      $var37 = [1];
                    }
                  } else if (argTypes_1.head.tag === 3) {
                    $var37 = [0];
                  } else if (argTypes_1.head.tag === 4) {
                    $var37 = [0];
                  } else if (argTypes_1.head.tag === 5) {
                    $var37 = [0];
                  } else if (argTypes_1.head.tag === 6) {
                    $var37 = [0];
                  } else if (argTypes_1.head.tag === 13) {
                    $var37 = [0];
                  } else {
                    $var37 = [1];
                  }
                } else {
                  $var37 = [1];
                }

                switch ($var37[0]) {
                  case 0:
                    return apply(nativeOp(argTypes_1.head, meth), args);

                  case 1:
                    return ccall_(range, returnType, "Util", "applyOperator", append(args, ofArray([makeStrConst(meth)])));
                }

            }

        }

    }
  };

  const tryOptimizeLiteralAddition = __exports.tryOptimizeLiteralAddition = function (r, t, args) {
    let $var38;

    if (args.tail != null) {
      const activePatternResult60096 = _StringLiteral___(args.head);

      if (activePatternResult60096 != null) {
        if (args.tail.tail != null) {
          const activePatternResult60097 = _StringLiteral___(args.tail.head);

          if (activePatternResult60097 != null) {
            if (args.tail.tail.tail == null) {
              $var38 = [0, getValue(activePatternResult60096), getValue(activePatternResult60097)];
            } else {
              $var38 = [1];
            }
          } else {
            $var38 = [1];
          }
        } else {
          $var38 = [1];
        }
      } else {
        $var38 = [1];
      }
    } else {
      $var38 = [1];
    }

    switch ($var38[0]) {
      case 0:
        const e = new Expr(0, new ValueKind(8, $var38[1] + $var38[2]));

        if (t.tag === 5) {
          return e;
        } else {
          return new Expr(13, [e, t]);
        }

      case 1:
        let $var39;

        if (args.tail != null) {
          const activePatternResult60094 = _Int32Literal___(args.head);

          if (activePatternResult60094 != null) {
            if (args.tail.tail != null) {
              const activePatternResult60095 = _Int32Literal___(args.tail.head);

              if (activePatternResult60095 != null) {
                if (args.tail.tail.tail == null) {
                  $var39 = [0, getValue(activePatternResult60094), getValue(activePatternResult60095)];
                } else {
                  $var39 = [1];
                }
              } else {
                $var39 = [1];
              }
            } else {
              $var39 = [1];
            }
          } else {
            $var39 = [1];
          }
        } else {
          $var39 = [1];
        }

        switch ($var39[0]) {
          case 0:
            const e_1 = new Expr(0, new ValueKind(7, [$var39[1] + $var39[2], new NumberKind(4)]));

            if (t.tag === 5) {
              return e_1;
            } else {
              return new Expr(13, [e_1, t]);
            }

          case 1:
            return applyOp(r, t, args, "op_Addition");
        }

    }
  };

  const equals = __exports.equals = function (equal, com, i, args) {
    const op = function (equal_1) {
      return new Expr(0, new ValueKind(14, equal_1 ? new BinaryOperator(2) : new BinaryOperator(3)));
    };

    const is = function (equal_2, expr) {
      if (equal_2) {
        return expr;
      } else {
        return makeUnOp(i.range, i.returnType, ofArray([expr]), new UnaryOperator(2));
      }
    };

    const icall_1 = function (args_1, equal_3) {
      return CurriedLambda(is)(equal_3)(makeCall(i.range, i.returnType, new CallKind(0, [args_1.head, "Equals", args_1.tail])));
    };

    const matchValue = args.head.Type;
    let $var40;

    const activePatternResult60113 = _EntFullName___(matchValue);

    if (activePatternResult60113 != null) {
      if (getValue(activePatternResult60113) === "System.DateTime") {
        $var40 = [0];
      } else if (getValue(activePatternResult60113) === "System.DateTimeOffset") {
        $var40 = [0];
      } else {
        $var40 = [1];
      }
    } else {
      $var40 = [1];
    }

    switch ($var40[0]) {
      case 0:
        return CurriedLambda(is)(equal)(ccall(i, "Date", "equals", args));

      case 1:
        const $var41 = matchValue.tag === 14 ? (((((matchValue.data[0].HasInterface("System.IEquatable") ? matchValue.data[0].FullName !== "System.Guid" : false) ? matchValue.data[0].FullName !== "System.TimeSpan" : false) ? true : matchValue.data[0].FullName === "Microsoft.FSharp.Collections.FSharpList") ? true : matchValue.data[0].FullName === "Microsoft.FSharp.Collections.FSharpMap") ? true : matchValue.data[0].FullName === "Microsoft.FSharp.Collections.FSharpSet") ? [0, matchValue.data[0]] : [1] : [1];

        switch ($var41[0]) {
          case 0:
            return icall_1(args, equal);

          case 1:
            let $var42;

            const activePatternResult60112 = _EntFullName___(matchValue);

            if (activePatternResult60112 != null) {
              if (getValue(activePatternResult60112) === "System.Guid") {
                $var42 = [0];
              } else if (getValue(activePatternResult60112) === "System.TimeSpan") {
                $var42 = [0];
              } else if (matchValue.tag === 7) {
                if (matchValue.data.tag === 2) {
                  $var42 = [0];
                } else {
                  $var42 = [1];
                }
              } else if (matchValue.tag === 3) {
                $var42 = [0];
              } else if (matchValue.tag === 4) {
                $var42 = [0];
              } else if (matchValue.tag === 5) {
                $var42 = [0];
              } else if (matchValue.tag === 6) {
                $var42 = [0];
              } else if (matchValue.tag === 13) {
                $var42 = [0];
              } else {
                $var42 = [1];
              }
            } else if (matchValue.tag === 7) {
              if (matchValue.data.tag === 2) {
                $var42 = [0];
              } else {
                $var42 = [1];
              }
            } else if (matchValue.tag === 3) {
              $var42 = [0];
            } else if (matchValue.tag === 4) {
              $var42 = [0];
            } else if (matchValue.tag === 5) {
              $var42 = [0];
            } else if (matchValue.tag === 6) {
              $var42 = [0];
            } else if (matchValue.tag === 13) {
              $var42 = [0];
            } else {
              $var42 = [1];
            }

            switch ($var42[0]) {
              case 0:
                return new Expr(3, [op(equal), args, new ApplyKind(0), i.returnType, i.range]);

              case 1:
                const $var43 = matchValue.tag === 7 ? matchValue.data.tag === 0 ? [0] : matchValue.data.tag === 1 ? [0] : matchValue.data.tag === 3 ? [0] : [2] : matchValue.tag === 9 ? [1] : matchValue.tag === 10 ? [1] : matchValue.tag === 2 ? [1] : matchValue.tag === 1 ? [1] : matchValue.tag === 0 ? [1] : matchValue.tag === 14 ? [1] : matchValue.tag === 12 ? [1] : matchValue.tag === 8 ? [1] : matchValue.tag === 11 ? [1] : [2];

                switch ($var43[0]) {
                  case 0:
                    return icall_1(args, equal);

                  case 1:
                    return CurriedLambda(is)(equal)(makeCall(i.range, i.returnType, new CallKind(2, ["Util", "equals", false, args])));

                  case 2:
                    throw new Error("C:/projects/fable/src/dotnet/Fable.Compiler/Replacements.fs", 460, 14);
                }

            }

        }

    }
  };

  const compareReplacedEntities = __exports.compareReplacedEntities = create(ofArray(["System.Guid", "System.TimeSpan", "System.DateTime", "System.DateTimeOffset"]), new Comparer(comparePrimitives));

  const compare = __exports.compare = function (com, r, args, op) {
    const wrapWith = function (op_1, comparison) {
      if (op_1 != null) {
        return makeEqOp(r, ofArray([comparison, makeIntConst(0)]), getValue(op_1));
      } else {
        return comparison;
      }
    };

    const icall_1 = function (args_1, op_2) {
      var typ;
      return CurriedLambda(wrapWith)(op_2)((typ = new Type(6, new NumberKind(4)), function (kind) {
        return makeCall(r, typ, kind);
      })(new CallKind(0, [args_1.head, "CompareTo", args_1.tail])));
    };

    const matchValue = args.head.Type;
    const $var44 = matchValue.tag === 14 ? (matchValue.data[0].HasInterface("System.IComparable") ? !compareReplacedEntities.has(matchValue.data[0].FullName) : false) ? [0, matchValue.data[0]] : [1] : [1];

    switch ($var44[0]) {
      case 0:
        return icall_1(args, op);

      case 1:
        let $var45;

        const activePatternResult60124 = _EntFullName___(matchValue);

        if (activePatternResult60124 != null) {
          if (getValue(activePatternResult60124) === "System.DateTime") {
            $var45 = [0];
          } else if (getValue(activePatternResult60124) === "System.DateTimeOffset") {
            $var45 = [0];
          } else {
            $var45 = [1];
          }
        } else {
          $var45 = [1];
        }

        switch ($var45[0]) {
          case 0:
            return CurriedLambda(wrapWith)(op)(ccall_(r, new Type(6, new NumberKind(4)), "Date", "compare", args));

          case 1:
            let $var46;

            const activePatternResult60123 = _EntFullName___(matchValue);

            if (activePatternResult60123 != null) {
              if (getValue(activePatternResult60123) === "System.Guid") {
                $var46 = [0];
              } else if (getValue(activePatternResult60123) === "System.TimeSpan") {
                $var46 = [0];
              } else if (matchValue.tag === 7) {
                if (matchValue.data.tag === 2) {
                  $var46 = [0];
                } else {
                  $var46 = [1];
                }
              } else if (matchValue.tag === 3) {
                $var46 = [0];
              } else if (matchValue.tag === 4) {
                $var46 = [0];
              } else if (matchValue.tag === 5) {
                $var46 = [0];
              } else if (matchValue.tag === 6) {
                $var46 = [0];
              } else if (matchValue.tag === 13) {
                $var46 = [0];
              } else {
                $var46 = [1];
              }
            } else if (matchValue.tag === 7) {
              if (matchValue.data.tag === 2) {
                $var46 = [0];
              } else {
                $var46 = [1];
              }
            } else if (matchValue.tag === 3) {
              $var46 = [0];
            } else if (matchValue.tag === 4) {
              $var46 = [0];
            } else if (matchValue.tag === 5) {
              $var46 = [0];
            } else if (matchValue.tag === 6) {
              $var46 = [0];
            } else if (matchValue.tag === 13) {
              $var46 = [0];
            } else {
              $var46 = [1];
            }

            switch ($var46[0]) {
              case 0:
                if (op == null) {
                  return ccall_(r, new Type(6, new NumberKind(4)), "Util", "comparePrimitives", args);
                } else {
                  return makeEqOp(r, args, getValue(op));
                }

              case 1:
                const $var47 = matchValue.tag === 7 ? matchValue.data.tag === 0 ? [0] : matchValue.data.tag === 1 ? [0] : matchValue.data.tag === 3 ? [0] : [2] : matchValue.tag === 9 ? [1] : matchValue.tag === 10 ? [1] : matchValue.tag === 2 ? [1] : matchValue.tag === 1 ? [1] : matchValue.tag === 0 ? [1] : matchValue.tag === 14 ? [1] : matchValue.tag === 12 ? [1] : matchValue.tag === 8 ? [1] : matchValue.tag === 11 ? [1] : [2];

                switch ($var47[0]) {
                  case 0:
                    return icall_1(args, op);

                  case 1:
                    return CurriedLambda(wrapWith)(op)(ccall_(r, new Type(6, new NumberKind(4)), "Util", "compare", args));

                  case 2:
                    throw new Error("C:/projects/fable/src/dotnet/Fable.Compiler/Replacements.fs", 497, 14);
                }

            }

        }

    }
  };

  const makeComparer = __exports.makeComparer = function (typArg) {
    var ent;
    let f;
    let $var48;

    if (typArg != null) {
      const activePatternResult60131 = _EntFullName___(getValue(typArg));

      if (activePatternResult60131 != null) {
        if (getValue(activePatternResult60131) === "System.Guid") {
          $var48 = [0];
        } else if (getValue(activePatternResult60131) === "System.TimeSpan") {
          $var48 = [0];
        } else if (getValue(typArg).tag === 3) {
          $var48 = [0];
        } else if (getValue(typArg).tag === 4) {
          $var48 = [0];
        } else if (getValue(typArg).tag === 5) {
          $var48 = [0];
        } else if (getValue(typArg).tag === 6) {
          $var48 = [0];
        } else if (getValue(typArg).tag === 13) {
          $var48 = [0];
        } else {
          $var48 = [1];
        }
      } else if (getValue(typArg).tag === 3) {
        $var48 = [0];
      } else if (getValue(typArg).tag === 4) {
        $var48 = [0];
      } else if (getValue(typArg).tag === 5) {
        $var48 = [0];
      } else if (getValue(typArg).tag === 6) {
        $var48 = [0];
      } else if (getValue(typArg).tag === 13) {
        $var48 = [0];
      } else {
        $var48 = [1];
      }
    } else {
      $var48 = [1];
    }

    switch ($var48[0]) {
      case 0:
        f = makeCoreRef("Util", "comparePrimitives");
        break;

      case 1:
        let $var49;

        if (typArg != null) {
          const activePatternResult60130 = _EntFullName___(getValue(typArg));

          if (activePatternResult60130 != null) {
            if (getValue(activePatternResult60130) === "System.DateTime") {
              $var49 = [0];
            } else if (getValue(activePatternResult60130) === "System.DateTimeOffset") {
              $var49 = [0];
            } else {
              $var49 = [1];
            }
          } else {
            $var49 = [1];
          }
        } else {
          $var49 = [1];
        }

        switch ($var49[0]) {
          case 0:
            f = emitNoInfo("(x,y) => x = x.getTime(), y = y.getTime(), x === y ? 0 : (x < y ? -1 : 1)", new List_1());
            break;

          case 1:
            const $var50 = typArg != null ? getValue(typArg).tag === 7 ? getValue(typArg).data.tag === 0 ? [0] : getValue(typArg).data.tag === 1 ? [0] : getValue(typArg).data.tag === 3 ? [0] : [2] : getValue(typArg).tag === 14 ? (ent = getValue(typArg).data[0], ent.HasInterface("System.IComparable")) ? [1, getValue(typArg).data[0]] : [2] : [2] : [2];

            switch ($var50[0]) {
              case 0:
                f = emitNoInfo("(x,y) => x.CompareTo(y)", new List_1());
                break;

              case 1:
                f = emitNoInfo("(x,y) => x.CompareTo(y)", new List_1());
                break;

              case 2:
                const $var51 = typArg == null ? [0] : [0];

                switch ($var51[0]) {
                  case 0:
                    f = makeCoreRef("Util", "compare");
                    break;
                }

                break;
            }

            break;
        }

        break;
    }

    return makeCall(null, new Type(1), new CallKind(2, ["Comparer", null, true, ofArray([f])]));
  };

  const makeMapOrSetCons = __exports.makeMapOrSetCons = function (com, i, modName, args) {
    let typArg;
    const matchValue = [i.calleeTypeArgs, i.methodTypeArgs];
    const $var52 = matchValue[0].tail == null ? matchValue[1].tail == null ? [1] : [0, matchValue[1].head] : [0, matchValue[0].head];

    switch ($var52[0]) {
      case 0:
        typArg = $var52[1];
        break;

      case 1:
        typArg = null;
        break;
    }

    const args_1 = append(args.tail == null ? ofArray([new Expr(0, new ValueKind(0))]) : args, ofArray([makeComparer(typArg)]));
    return makeCall(i.range, i.returnType, new CallKind(2, [modName, "create", false, args_1]));
  };

  const makeDictionaryOrHashSet = __exports.makeDictionaryOrHashSet = function (r, t, modName, forceFSharp, typArg, args) {
    const makeFSharp = function (typArg_1, args_1) {
      return function (args_2) {
        return ccall_(r, t, modName, "create", args_2);
      }((() => {
        const $var53 = args_1.tail != null ? args_1.tail.tail == null ? [0, args_1.head] : [1, args_1] : [1, args_1];

        switch ($var53[0]) {
          case 0:
            return ofArray([$var53[1], makeComparer(typArg_1)]);

          case 1:
            return $var53[1];
        }
      })());
    };

    if (forceFSharp) {
      return makeFSharp(typArg, args);
    } else {
      const $var54 = typArg.tag === 7 ? typArg.data.tag === 0 ? [0] : typArg.data.tag === 1 ? [0] : typArg.data.tag === 3 ? [0] : [2] : typArg.tag === 9 ? [0] : typArg.tag === 10 ? [0] : typArg.tag === 14 ? ((typArg.data[0].HasInterface("System.IComparable") ? typArg.data[0].FullName !== "System.TimeSpan" : false) ? typArg.data[0].FullName !== "System.Guid" : false) ? [1, typArg.data[0]] : [2] : [2];

      switch ($var54[0]) {
        case 0:
          return makeFSharp(typArg, args);

        case 1:
          return makeFSharp(typArg, args);

        case 2:
          return function (kind) {
            return makeCall(r, t, kind);
          }(new CallKind(3, [modName, null, true, args]));
      }
    }
  };

  const makeJsLiteralFromLambda = __exports.makeJsLiteralFromLambda = function (r, arg) {
    return defaultArgWith(defaultArg((() => {
      const $var55 = arg.tag === 0 ? arg.data.tag === 16 ? [0, arg.data.data[0], arg.data.data[1]] : [1] : [1];

      switch ($var55[0]) {
        case 0:
          return fold(function (acc, statement) {
            const matchValue = [acc, statement];
            const $var56 = matchValue[0] != null ? matchValue[1].tag === 9 ? matchValue[1].data[1] != null ? getValue(matchValue[1].data[1]).tag === 0 ? getValue(matchValue[1].data[1]).data.tag === 8 ? [0, getValue(matchValue[0]), getValue(matchValue[1].data[1]).data.data, matchValue[1].data[2]] : [1] : [1] : [1] : [1] : [1];

            switch ($var56[0]) {
              case 0:
                return new List_1([$var56[2], $var56[3]], $var56[1]);

              case 1:
                return null;
            }
          }, new List_1(), flattenSequential($var55[2]));

        case 1:
          return null;
      }
    })(), null, function (props) {
      return makeJsObject(r, props);
    }), function () {
      return ccall_(r, new Type(1), "Util", "jsOptions", ofArray([arg]));
    });
  };

  const makeJsLiteral = __exports.makeJsLiteral = function (r, caseRule, keyValueList) {
    const _Fields___ = function (caseRule_1, _arg1) {
      const $var57 = _arg1.tag === 0 ? _arg1.data.tag === 11 ? _arg1.data.data[0].tag === 0 ? [0, _arg1.data.data[0].data] : [1] : [1] : [1];

      switch ($var57[0]) {
        case 0:
          return defaultArg(fold(function (acc, e) {
            return defaultArg(acc, null, function (acc_1) {
              let $var58;

              if (e.tag === 0) {
                if (e.data.tag === 12) {
                  if (e.data.data.tail != null) {
                    if (e.data.data.head.tag === 0) {
                      if (e.data.data.head.data.tag === 8) {
                        if (e.data.data.tail.tail != null) {
                          if (e.data.data.tail.tail.tail == null) {
                            $var58 = [0, e.data.data.head.data.data, e.data.data.tail.head];
                          } else {
                            const activePatternResult60164 = _UnionCons___(e);

                            if (activePatternResult60164 != null) {
                              $var58 = [1, getValue(activePatternResult60164)[2], getValue(activePatternResult60164)[1], getValue(activePatternResult60164)[0]];
                            } else {
                              $var58 = [2];
                            }
                          }
                        } else {
                          const activePatternResult60165 = _UnionCons___(e);

                          if (activePatternResult60165 != null) {
                            $var58 = [1, getValue(activePatternResult60165)[2], getValue(activePatternResult60165)[1], getValue(activePatternResult60165)[0]];
                          } else {
                            $var58 = [2];
                          }
                        }
                      } else {
                        const activePatternResult60166 = _UnionCons___(e);

                        if (activePatternResult60166 != null) {
                          $var58 = [1, getValue(activePatternResult60166)[2], getValue(activePatternResult60166)[1], getValue(activePatternResult60166)[0]];
                        } else {
                          $var58 = [2];
                        }
                      }
                    } else {
                      const activePatternResult60167 = _UnionCons___(e);

                      if (activePatternResult60167 != null) {
                        $var58 = [1, getValue(activePatternResult60167)[2], getValue(activePatternResult60167)[1], getValue(activePatternResult60167)[0]];
                      } else {
                        $var58 = [2];
                      }
                    }
                  } else {
                    const activePatternResult60168 = _UnionCons___(e);

                    if (activePatternResult60168 != null) {
                      $var58 = [1, getValue(activePatternResult60168)[2], getValue(activePatternResult60168)[1], getValue(activePatternResult60168)[0]];
                    } else {
                      $var58 = [2];
                    }
                  }
                } else {
                  const activePatternResult60169 = _UnionCons___(e);

                  if (activePatternResult60169 != null) {
                    $var58 = [1, getValue(activePatternResult60169)[2], getValue(activePatternResult60169)[1], getValue(activePatternResult60169)[0]];
                  } else {
                    $var58 = [2];
                  }
                }
              } else {
                const activePatternResult60170 = _UnionCons___(e);

                if (activePatternResult60170 != null) {
                  $var58 = [1, getValue(activePatternResult60170)[2], getValue(activePatternResult60170)[1], getValue(activePatternResult60170)[0]];
                } else {
                  $var58 = [2];
                }
              }

              switch ($var58[0]) {
                case 0:
                  return new List_1([$var58[1], $var58[2]], acc_1);

                case 1:
                  let key_1;

                  const key = function (list_1) {
                    return item($var58[3], list_1);
                  }($var58[1])[0];

                  if (caseRule_1 === 1) {
                    key_1 = Naming.lowerFirst(key);
                  } else {
                    key_1 = key;
                  }

                  let value;
                  let $var59;

                  if ($var58[2].tail != null) {
                    const activePatternResult60162 = _CoreCons___("List", "default", $var58[2].head);

                    if (activePatternResult60162 != null) {
                      if (getValue(activePatternResult60162).tail == null) {
                        if ($var58[2].tail.tail == null) {
                          $var59 = [1];
                        } else {
                          $var59 = [2];
                        }
                      } else {
                        $var59 = [2];
                      }
                    } else {
                      $var59 = [2];
                    }
                  } else {
                    $var59 = [0];
                  }

                  switch ($var59[0]) {
                    case 0:
                      value = new Expr(0, new ValueKind(9, true));
                      break;

                    case 1:
                      value = makeJsObject(r, new List_1());
                      break;

                    case 2:
                      let $var60;

                      if ($var58[2].tail != null) {
                        const activePatternResult60158 = _CoreMeth___("List", "ofArray", $var58[2].head);

                        if (activePatternResult60158 != null) {
                          if (getValue(activePatternResult60158).tail != null) {
                            const activePatternResult60160 = _Fields___(caseRule_1, getValue(activePatternResult60158).head);

                            if (activePatternResult60160 != null) {
                              if (getValue(activePatternResult60158).tail.tail == null) {
                                if ($var58[2].tail.tail == null) {
                                  $var60 = [0, getValue(activePatternResult60160)];
                                } else {
                                  $var60 = [1];
                                }
                              } else {
                                $var60 = [1];
                              }
                            } else {
                              $var60 = [1];
                            }
                          } else {
                            $var60 = [1];
                          }
                        } else {
                          $var60 = [1];
                        }
                      } else {
                        $var60 = [1];
                      }

                      switch ($var60[0]) {
                        case 0:
                          value = makeJsObject(r, $var60[1]);
                          break;

                        case 1:
                          const $var61 = $var58[2].tail != null ? $var58[2].tail.tail == null ? [0, $var58[2].head] : [1, $var58[2]] : [1, $var58[2]];

                          switch ($var61[0]) {
                            case 0:
                              const matchValue = $var61[1].Type;
                              const $var62 = matchValue.tag === 14 ? matchValue.data[0].FullName === "Microsoft.FSharp.Collections.FSharpList" ? [0, matchValue.data[0]] : [1] : [1];

                              switch ($var62[0]) {
                                case 0:
                                  value = null;
                                  break;

                                case 1:
                                  value = $var61[1];
                                  break;
                              }

                              break;

                            case 1:
                              value = new Expr(0, new ValueKind(11, [new ArrayConsKind(0, $var61[1]), new Type(1)]));
                              break;
                          }

                          break;
                      }

                      break;
                  }

                  return defaultArg(value, null, function (value_1) {
                    return new List_1([key_1, value_1], acc_1);
                  });

                case 2:
                  return null;
              }
            });
          }, new List_1(), $var57[1]), null, function (list) {
            return reverse(list);
          });

        case 1:
          return null;
      }
    };

    let $var63;

    const activePatternResult60181 = _CoreCons___("List", "default", keyValueList);

    if (activePatternResult60181 != null) {
      if (getValue(activePatternResult60181).tail == null) {
        $var63 = [0];
      } else {
        $var63 = [1];
      }
    } else {
      $var63 = [1];
    }

    switch ($var63[0]) {
      case 0:
        return makeJsObject(r, new List_1());

      case 1:
        let $var64;

        const activePatternResult60177 = _CoreMeth___("List", "ofArray", keyValueList);

        if (activePatternResult60177 != null) {
          if (getValue(activePatternResult60177).tail != null) {
            const activePatternResult60179 = _Fields___(caseRule, getValue(activePatternResult60177).head);

            if (activePatternResult60179 != null) {
              if (getValue(activePatternResult60177).tail.tail == null) {
                $var64 = [0, getValue(activePatternResult60179)];
              } else {
                $var64 = [1];
              }
            } else {
              $var64 = [1];
            }
          } else {
            $var64 = [1];
          }
        } else {
          $var64 = [1];
        }

        switch ($var64[0]) {
          case 0:
            return makeJsObject(r, $var64[1]);

          case 1:
            return ccall_(r, new Type(1), "Util", "createObj", ofArray([keyValueList, makeIntConst(caseRule)]));
        }

    }
  };

  return __exports;
}({});
export const AstPass = function (__exports) {
  const fableCoreLib = __exports.fableCoreLib = function (com, i) {
    var args_2;

    fableCoreLib: while (true) {
      const destruct = function (_arg1) {
        const $var65 = _arg1.tag === 0 ? _arg1.data.tag === 12 ? [0, _arg1.data.data] : _arg1.Type.Equals(new Type(2)) ? [1, _arg1] : [2] : _arg1.Type.Equals(new Type(2)) ? [1, _arg1] : [2];

        switch ($var65[0]) {
          case 0:
            return $var65[1];

          case 1:
            return new List_1();

          case 2:
            return ofArray([_arg1]);
        }
      };

      if (i.methodName === "importDynamic") {
        return makeCall(i.range, i.returnType, new CallKind(3, ["import", null, false, i.args]));
      } else {
        const activePatternResult60223 = Naming["|StartsWith|_|"]("import", i.methodName);

        if (activePatternResult60223 != null) {
          const fail = function () {
            (function (warning) {
              addError(com, i.fileName, i.range, warning);
            })(toText(printf("%s.%s only accepts literal strings"))(i.ownerFullName, i.methodName));
          };

          let patternInput;

          switch (i.methodName) {
            case "import":
              const $var66 = i.args.tail != null ? i.args.head.tag === 0 ? i.args.head.data.tag === 8 ? [0, i.args.tail, i.args.head.data.data] : [1] : [1] : [1];

              switch ($var66[0]) {
                case 0:
                  patternInput = [$var66[2], $var66[1]];
                  break;

                case 1:
                  fail();
                  patternInput = ["*", ofArray([makeStrConst("unknown")])];
                  break;
              }

              break;

            case "importMember":
              patternInput = ["__PLACE-HOLDER__", i.args];
              break;

            case "importDefault":
              patternInput = ["default", i.args];
              break;

            case "importSideEffects":
              patternInput = ["", i.args];
              break;

            default:
              patternInput = ["*", i.args];
          }

          let path;
          const $var67 = patternInput[1].tail != null ? patternInput[1].head.tag === 0 ? patternInput[1].head.data.tag === 8 ? patternInput[1].tail.tail == null ? [0, patternInput[1].head.data.data] : [1] : [1] : [1] : [1];

          switch ($var67[0]) {
            case 0:
              path = $var67[1];
              break;

            case 1:
              fail();
              path = "unknown";
              break;
          }

          return new Expr(0, new ValueKind(6, [patternInput[0], path, new ImportKind(2)]));
        } else {
          switch (i.methodName) {
            case "op_BangBang":
              return new Expr(13, [i.args.head, i.methodTypeArgs.head]);

            case "op_BangHat":
              return i.args.head;

            case "op_Dynamic":
              const expr = makeGet(i.range, i.returnType, i.args.head, i.args.tail.head);
              let appType;
              const ent = new Entity(new Lazy(function () {
                return new EntityKind(5);
              }), null, "Fable.Core.Applicable", new Lazy(function () {
                return new List_1();
              }));
              appType = new Type(14, [ent, ofArray([new Type(1), new Type(1)])]);
              return new Expr(13, [expr, appType]);

            case "op_DynamicAssignment":
              const matchValue = [i.callee, i.args];
              const activePatternResult60196 = Util["|ThreeArgs|_|"](matchValue[0], matchValue[1]);

              if (activePatternResult60196 != null) {
                return new Expr(9, [getValue(activePatternResult60196)[0], getValue(activePatternResult60196)[1], getValue(activePatternResult60196)[2], i.range]);
              } else {
                return null;
              }

            case "op_Dollar":
            case "createNew":
              const args = destruct(i.args.tail.head);
              const applyMeth = i.methodName === "createNew" ? new ApplyKind(2) : new ApplyKind(0);
              return new Expr(3, [i.args.head, args, applyMeth, i.returnType, i.range]);

            case "op_EqualsEqualsGreater":
              return new Expr(0, new ValueKind(12, toList_1(take(2, i.args))));

            case "createObj":
              return Util.makeJsLiteral(i.range, 0, i.args.head);

            case "keyValueList":
              const $var68 = i.args.tail != null ? i.args.head.tag === 13 ? i.args.head.data[0].tag === 0 ? i.args.head.data[0].data.tag === 7 ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [0, i.args.tail.head, i.args.head.data[0].data.data[0]] : [2] : [2] : i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [1, i.args.head, i.args.tail.head] : [2] : [2] : i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [1, i.args.head, i.args.tail.head] : [2] : [2] : i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [1, i.args.head, i.args.tail.head] : [2] : [2] : [2];

              switch ($var68[0]) {
                case 0:
                  const caseRule = ~~$var68[2] | 0;
                  return Util.makeJsLiteral(i.range, caseRule, $var68[1]);

                case 1:
                  return Util.ccall_(i.range, new Type(1), "Util", "createObj", ofArray([$var68[2], $var68[1]]));

                case 2:
                  return null;
              }

            case "jsOptions":
              const $var69 = i.args.tail != null ? i.args.tail.tail == null ? [0, i.args.head] : [1] : [1];

              switch ($var69[0]) {
                case 0:
                  return Util.makeJsLiteralFromLambda(i.range, $var69[1]);

                case 1:
                  return null;
              }

            case "createEmpty":
              return Util.wrap(i.returnType, new Expr(1, [new List_1(), new List_1(), null, i.range]));

            case "nameof":
              return makeStrConst((() => {
                let $var70;

                if (i.args.tail != null) {
                  const activePatternResult60205 = Util["|Nameof|_|"](i.args.head);

                  if (activePatternResult60205 != null) {
                    if (i.args.tail.tail == null) {
                      $var70 = [0, getValue(activePatternResult60205)];
                    } else {
                      $var70 = [1];
                    }
                  } else {
                    $var70 = [1];
                  }
                } else {
                  $var70 = [1];
                }

                switch ($var70[0]) {
                  case 0:
                    return $var70[1];

                  case 1:
                    (function (warning_1) {
                      addError(com, i.fileName, i.range, warning_1);
                    })("Cannot infer name of expression");

                    return "unknown";
                }
              })());

            case "nameofLambda":
              return makeStrConst((() => {
                let $var71;

                if (i.args.tail != null) {
                  if (i.args.head.tag === 0) {
                    if (i.args.head.data.tag === 16) {
                      const activePatternResult60207 = Util["|Nameof|_|"](i.args.head.data.data[1]);

                      if (activePatternResult60207 != null) {
                        if (i.args.tail.tail == null) {
                          $var71 = [0, getValue(activePatternResult60207)];
                        } else {
                          $var71 = [1];
                        }
                      } else {
                        $var71 = [1];
                      }
                    } else {
                      $var71 = [1];
                    }
                  } else {
                    $var71 = [1];
                  }
                } else {
                  $var71 = [1];
                }

                switch ($var71[0]) {
                  case 0:
                    return $var71[1];

                  case 1:
                    (function (warning_2) {
                      addError(com, i.fileName, i.range, warning_2);
                    })("Cannot infer name of expression");

                    return "unknown";
                }
              })());

            case "areEqual":
              return defaultArg((() => {
                const $var72 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail != null ? i.args.tail.tail.tail.tail == null ? [1, i.args.tail.head, i.args.head, i.args.tail.tail.head] : [2] : [0, i.args.tail.head, i.args.head] : [2] : [2];

                switch ($var72[0]) {
                  case 0:
                    return ofArray([$var72[1], $var72[2]]);

                  case 1:
                    return ofArray([$var72[1], $var72[2], $var72[3]]);

                  case 2:
                    return null;
                }
              })(), null, function (args_1) {
                return makeCall(i.range, i.returnType, new CallKind(2, ["Assert", "equal", false, args_1]));
              });

            case "async.AwaitPromise.Static":
            case "async.StartAsPromise.Static":
              const meth = i.methodName === "async.AwaitPromise.Static" ? "awaitPromise" : "startAsPromise";
              return makeCall(i.range, i.returnType, new CallKind(2, ["Async", meth, false, i.args]));

            case "ofJsonAsType":
              const $var73 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [0, i.args.head, i.args.tail.head] : [1] : [1] : [1];

              switch ($var73[0]) {
                case 0:
                  com = com;
                  i = (args_2 = ofArray([$var73[1], makeJsObject(null, ofArray([["T", $var73[2]]]))]), new ApplyInfo(i.ownerType, i.ownerFullName, "ofJson", i.methodKind, i.callee, args_2, i.returnType, i.range, i.fileName, i.decorators, i.calleeTypeArgs, i.methodTypeArgs, i.methodArgTypes, i.genericAvailability, i.caughtException));
                  continue fableCoreLib;

                case 1:
                  return toFail(printf("Unexpected number of arguments for %s"))(i.methodName);
              }

            case "toJson":
            case "ofJson":
            case "deflate":
            case "inflate":
            case "toPlainJsObj":
            case "toJsonWithTypeInfo":
            case "ofJsonWithTypeInfo":
              const modName = i.methodName === "toPlainJsObj" ? "Util" : "Serialize";
              return makeCall(i.range, i.returnType, new CallKind(2, [modName, i.methodName, false, i.args]));

            case "jsNative":
              addWarning(com, i.fileName, i.range, "jsNative is being compiled without replacement, this will fail at runtime.");
              return function (err) {
                return new Expr(5, [err, i.returnType, i.range]);
              }(Util.newError(i.range, i.returnType, singleton(new Expr(0, new ValueKind(8, "A function supposed to be replaced by JS native code has been called, please check.")))));

            case "applySpread":
              let patternInput_1;
              const $var74 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.head.tag === 0 ? i.args.tail.head.data.tag === 12 ? i.args.tail.tail.tail == null ? [0, i.args.tail.head.data.data, i.args.head] : [2] : i.args.tail.tail.tail == null ? [1, i.args.tail.head, i.args.head] : [2] : i.args.tail.tail.tail == null ? [1, i.args.tail.head, i.args.head] : [2] : [2] : [2];

              switch ($var74[0]) {
                case 0:
                  patternInput_1 = [$var74[2], $var74[1]];
                  break;

                case 1:
                  patternInput_1 = [$var74[2], ofArray([$var74[1]])];
                  break;

                case 2:
                  (function (warning_3) {
                    addError(com, i.fileName, i.range, warning_3);
                  })("Unexpected args passed to JsInterop.applySpread");

                  patternInput_1 = [null, new List_1()];
                  break;
              }

              let args_3;
              const matchValue_1 = reverse(patternInput_1[1]);
              let $var75;

              if (matchValue_1.tail != null) {
                const activePatternResult60219 = _CoreCons___("List", "default", matchValue_1.head);

                if (activePatternResult60219 != null) {
                  if (getValue(activePatternResult60219).tail == null) {
                    $var75 = [1, matchValue_1.tail];
                  } else {
                    $var75 = [2];
                  }
                } else {
                  $var75 = [2];
                }
              } else {
                $var75 = [0];
              }

              switch ($var75[0]) {
                case 0:
                  args_3 = new List_1();
                  break;

                case 1:
                  args_3 = reverse($var75[1]);
                  break;

                case 2:
                  let $var76;

                  if (matchValue_1.tail != null) {
                    const activePatternResult60217 = _CoreMeth___("List", "ofArray", matchValue_1.head);

                    if (activePatternResult60217 != null) {
                      if (getValue(activePatternResult60217).tail != null) {
                        if (getValue(activePatternResult60217).head.tag === 0) {
                          if (getValue(activePatternResult60217).head.data.tag === 11) {
                            if (getValue(activePatternResult60217).head.data.data[0].tag === 0) {
                              if (getValue(activePatternResult60217).tail.tail == null) {
                                $var76 = [0, matchValue_1.tail, getValue(activePatternResult60217).head.data.data[0].data];
                              } else {
                                $var76 = [1];
                              }
                            } else {
                              $var76 = [1];
                            }
                          } else {
                            $var76 = [1];
                          }
                        } else {
                          $var76 = [1];
                        }
                      } else {
                        $var76 = [1];
                      }
                    } else {
                      $var76 = [1];
                    }
                  } else {
                    $var76 = [1];
                  }

                  switch ($var76[0]) {
                    case 0:
                      args_3 = append(reverse($var76[1]), $var76[2]);
                      break;

                    case 1:
                      if (matchValue_1.tail != null) {
                        args_3 = append(reverse(matchValue_1.tail), ofArray([new Expr(0, new ValueKind(3, matchValue_1.head))]));
                      } else {
                        throw new Error("C:/projects/fable/src/dotnet/Fable.Compiler/Replacements.fs", 737, 22);
                      }

                      break;
                  }

                  break;
              }

              if (patternInput_1[0] == null) {
                return new Expr(0, new ValueKind(0));
              } else {
                return new Expr(3, [getValue(patternInput_1[0]), args_3, new ApplyKind(0), i.returnType, i.range]);
              }

            default:
              return null;
          }
        }
      }
    }
  };

  const references = __exports.references = function (com, i) {
    const $var77 = i.methodName === ".ctor" ? [0] : i.methodName === "contents" ? [1] : i.methodName === "value" ? [1] : [2];

    switch ($var77[0]) {
      case 0:
        return makeJsObject(i.range, ofArray([["contents", i.args.head]]));

      case 1:
        const prop = makeStrConst("contents");

        if (i.methodKind.tag === 2) {
          return makeGet(i.range, i.returnType, getValue(i.callee), prop);
        } else if (i.methodKind.tag === 3) {
          return new Expr(9, [getValue(i.callee), prop, i.args.head, i.range]);
        } else {
          return null;
        }

      case 2:
        return null;
    }
  };

  const fsFormat = __exports.fsFormat = function (com, i) {
    switch (i.methodName) {
      case "value":
        return makeGet(null, i.returnType, getValue(i.callee), makeStrConst("input"));

      case "printFormatToStringThen":
        const $var78 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [1, i.args.head, i.args.tail.head] : [2] : [0] : [2];

        switch ($var78[0]) {
          case 0:
            return Util.ccall(i, "String", "toText", i.args);

          case 1:
            return makeCall(i.range, i.returnType, new CallKind(0, [$var78[2], "cont", ofArray([$var78[1]])]));

          case 2:
            return null;
        }

      case "printFormatToString":
        return Util.ccall(i, "String", "toText", i.args);

      case "printFormatLine":
        return Util.ccall(i, "String", "toConsole", i.args);

      case "printFormatToTextWriter":
      case "printFormatLineToTextWriter":
        return Util.ccall(i, "String", "toConsole", i.args.tail);

      case "printFormatToError":
      case "printFormatLineToError":
        return Util.ccall(i, "String", "toConsoleError", i.args);

      case "printFormat":
        return Util.ccall(i, "String", "toConsole", i.args);

      case "printFormatThen":
        const cont = makeGet(null, i.returnType, i.args.tail.head, makeStrConst("cont"));
        return new Expr(3, [cont, ofArray([i.args.head]), new ApplyKind(0), i.returnType, i.range]);

      case "printFormatToStringThenFail":
        return Util.ccall(i, "String", "toFail", i.args);

      case ".ctor":
        return Util.ccall(i, "String", "printf", ofArray([i.args.head]));

      default:
        return null;
    }
  };

  const operators = __exports.operators = function (com, info) {
    var callee;
    var generic;

    const math = function (range, typ, args, methName) {
      const matchValue = [methName, typ];
      const $var79 = matchValue[0] === "abs" ? matchValue[1].tag === 7 ? matchValue[1].data.tag === 0 ? [0] : matchValue[1].data.tag === 3 ? [1] : [2] : [2] : [2];

      switch ($var79[0]) {
        case 0:
          return function (kind) {
            return makeCall(range, typ, kind);
          }(new CallKind(0, [args.head, "abs", args.tail]));

        case 1:
          return Util.ccall(info, "BigInt", "abs", info.args);

        case 2:
          return function (kind_1) {
            return makeCall(range, typ, kind_1);
          }(new CallKind(3, ["Math", methName, false, args]));
      }
    };

    const patternInput = [info.range, info.returnType, info.args];

    switch (info.methodName) {
      case "keyValuePattern":
        return info.args.head;

      case "defaultArg":
        const $var80 = patternInput[2].tail != null ? patternInput[2].head.tag === 0 ? patternInput[2].head.data.tag === 5 ? patternInput[2].tail.tail != null ? patternInput[2].tail.tail.tail == null ? [0, patternInput[2].head, patternInput[2].tail.head] : [1, patternInput[2]] : [1, patternInput[2]] : [1, patternInput[2]] : [1, patternInput[2]] : [1, patternInput[2]];

        switch ($var80[0]) {
          case 0:
            const cond = makeEqOp(patternInput[0], ofArray([$var80[1], new Expr(0, new ValueKind(0))]), new BinaryOperator(1));
            return new Expr(2, [cond, $var80[1], $var80[2], patternInput[0]]);

          case 1:
            return Util.ccall(info, "Option", "defaultArg", $var80[1]);
        }

      case "defaultAsyncBuilder":
        return makeCoreRef("AsyncBuilder", "singleton");

      case "not":
        return makeUnOp(patternInput[0], info.returnType, patternInput[2], new UnaryOperator(2));

      case "op_Inequality":
      case "neq":
        const $var81 = patternInput[2].tail != null ? patternInput[2].head.tag === 0 ? patternInput[2].head.data.tag === 0 ? patternInput[2].tail.tail != null ? patternInput[2].tail.tail.tail == null ? [0] : [1] : [1] : patternInput[2].tail.tail != null ? patternInput[2].tail.head.tag === 0 ? patternInput[2].tail.head.data.tag === 0 ? patternInput[2].tail.tail.tail == null ? [0] : [1] : [1] : [1] : [1] : patternInput[2].tail.tail != null ? patternInput[2].tail.head.tag === 0 ? patternInput[2].tail.head.data.tag === 0 ? patternInput[2].tail.tail.tail == null ? [0] : [1] : [1] : [1] : [1] : [1];

        switch ($var81[0]) {
          case 0:
            return makeEqOp(patternInput[0], patternInput[2], new BinaryOperator(1));

          case 1:
            return Util.equals(false, com, info, patternInput[2]);
        }

      case "op_Equality":
      case "eq":
        const $var82 = patternInput[2].tail != null ? patternInput[2].head.tag === 0 ? patternInput[2].head.data.tag === 0 ? patternInput[2].tail.tail != null ? patternInput[2].tail.tail.tail == null ? [0] : [1] : [1] : patternInput[2].tail.tail != null ? patternInput[2].tail.head.tag === 0 ? patternInput[2].tail.head.data.tag === 0 ? patternInput[2].tail.tail.tail == null ? [0] : [1] : [1] : [1] : [1] : patternInput[2].tail.tail != null ? patternInput[2].tail.head.tag === 0 ? patternInput[2].tail.head.data.tag === 0 ? patternInput[2].tail.tail.tail == null ? [0] : [1] : [1] : [1] : [1] : [1];

        switch ($var82[0]) {
          case 0:
            return makeEqOp(patternInput[0], patternInput[2], new BinaryOperator(0));

          case 1:
            return Util.equals(true, com, info, patternInput[2]);
        }

      case "isNull":
        return makeEqOp(patternInput[0], ofArray([patternInput[2].head, new Expr(0, new ValueKind(0))]), new BinaryOperator(0));

      case "hash":
        return Util.ccall(info, "Util", "hash", patternInput[2]);

      case "compare":
        return Util.compare(com, info.range, patternInput[2], null);

      case "op_LessThan":
      case "lt":
        return Util.compare(com, info.range, patternInput[2], new BinaryOperator(4));

      case "op_LessThanOrEqual":
      case "lte":
        return Util.compare(com, info.range, patternInput[2], new BinaryOperator(5));

      case "op_GreaterThan":
      case "gt":
        return Util.compare(com, info.range, patternInput[2], new BinaryOperator(6));

      case "op_GreaterThanOrEqual":
      case "gte":
        return Util.compare(com, info.range, patternInput[2], new BinaryOperator(7));

      case "min":
      case "max":
        const op = info.methodName === "min" ? new BinaryOperator(4) : new BinaryOperator(6);
        const comparison = Util.compare(com, info.range, patternInput[2], op);
        return new Expr(2, [comparison, patternInput[2].head, patternInput[2].tail.head, info.range]);

      case "op_Addition":
        return Util.tryOptimizeLiteralAddition(info.range, info.returnType, patternInput[2]);

      case "op_Subtraction":
      case "op_Multiply":
      case "op_Division":
      case "op_Modulus":
      case "op_LeftShift":
      case "op_RightShift":
      case "op_BitwiseAnd":
      case "op_BitwiseOr":
      case "op_ExclusiveOr":
      case "op_LogicalNot":
      case "op_UnaryNegation":
      case "op_BooleanAnd":
      case "op_BooleanOr":
        return Util.applyOp(info.range, info.returnType, patternInput[2], info.methodName);

      case "log":
        const $var83 = info.args.tail != null ? info.args.tail.tail != null ? info.args.tail.tail.tail == null ? [1] : [2] : [0] : [2];

        switch ($var83[0]) {
          case 0:
            return math(patternInput[0], patternInput[1], patternInput[2], info.methodName);

          case 1:
            return Util.emit(info, "Math.log($0) / Math.log($1)", info.args);

          case 2:
            return null;
        }

      case "pow":
      case "powInteger":
      case "op_Exponentiation":
        return math(patternInput[0], patternInput[1], patternInput[2], "pow");

      case "ceil":
      case "ceiling":
        return math(patternInput[0], patternInput[1], patternInput[2], "ceil");

      case "abs":
      case "acos":
      case "asin":
      case "atan":
      case "atan2":
      case "cos":
      case "exp":
      case "floor":
      case "log10":
      case "sin":
      case "sqrt":
      case "tan":
        return math(patternInput[0], patternInput[1], patternInput[2], info.methodName);

      case "round":
        return Util.ccall(info, "Util", "round", patternInput[2]);

      case "sign":
        let args_1;
        let $var84;

        if (patternInput[2].tail != null) {
          const activePatternResult60272 = Util["|Type|"](patternInput[2].head);

          if (activePatternResult60272.tag === 7) {
            $var84 = [0, patternInput[2].head, activePatternResult60272];
          } else {
            $var84 = [1];
          }
        } else {
          $var84 = [1];
        }

        switch ($var84[0]) {
          case 0:
            args_1 = singleton(Util.toFloat($var84[1].Range, $var84[2], new Type(6, new NumberKind(7)), ofArray([$var84[1]])));
            break;

          case 1:
            args_1 = patternInput[2];
            break;
        }

        return Util.ccall(info, "Util", "sign", args_1);

      case "infinity":
      case "infinitySingle":
        return Util.emit(info, "Number.POSITIVE_INFINITY", new List_1());

      case "naN":
      case "naNSingle":
        return Util.emit(info, "Number.NaN", new List_1());

      case "op_ComposeRight":
      case "op_ComposeLeft":
        return defaultArg((() => {
          const matchValue_1 = [patternInput[2], info.methodName];
          const $var85 = matchValue_1[0].tail != null ? matchValue_1[0].tail.tail != null ? matchValue_1[0].tail.tail.tail == null ? matchValue_1[1] === "op_ComposeRight" ? [0, matchValue_1[0].head, matchValue_1[0].tail.head] : matchValue_1[1] === "op_ComposeLeft" ? [1, matchValue_1[0].head, matchValue_1[0].tail.head] : [2] : [2] : [2] : [2];

          switch ($var85[0]) {
            case 0:
              return [$var85[1], $var85[2]];

            case 1:
              return [$var85[2], $var85[1]];

            case 2:
              return null;
          }
        })(), null, function (tupledArg) {
          var typ_1;
          var typ_2;
          const tempVar = makeIdent(com.GetUniqueVar());
          return makeLambdaExpr(ofArray([tempVar]), (typ_1 = new Type(1), function (args_2) {
            return makeApply(com, info.range, typ_1, tupledArg[1], args_2);
          })(singleton((typ_2 = new Type(1), function (args_3) {
            return makeApply(com, info.range, typ_2, tupledArg[0], args_3);
          })(ofArray([new Expr(0, new ValueKind(5, tempVar))])))));
        });

      case "op_Dereference":
        return makeGet(patternInput[0], info.returnType, patternInput[2].head, makeStrConst("contents"));

      case "op_ColonEquals":
        return new Expr(9, [patternInput[2].head, makeStrConst("contents"), patternInput[2].tail.head, patternInput[0]]);

      case "ref":
        return makeJsObject(patternInput[0], ofArray([["contents", patternInput[2].head]]));

      case "increment":
      case "decrement":
        return CurriedLambda(function (emit_1, args_4) {
          return Util.emit(info, emit_1, args_4);
        })(toText(printf("void($0.contents%s)"))(info.methodName === "increment" ? "++" : "--"))(patternInput[2]);

      case "createSequence":
      case "identity":
      case "box":
      case "unbox":
        return Util.wrap(patternInput[1], patternInput[2].head);

      case "toSByte":
      case "toByte":
      case "toInt8":
      case "toUInt8":
      case "toInt16":
      case "toUInt16":
      case "toInt":
      case "toUInt":
      case "toInt32":
      case "toUInt32":
      case "toInt64":
      case "toUInt64":
        return Util.toInt(false, info.range, info.methodTypeArgs.head, info.returnType, patternInput[2]);

      case "toSingle":
      case "toDouble":
      case "toDecimal":
        return Util.toFloat(info.range, info.methodTypeArgs.head, info.returnType, patternInput[2]);

      case "toChar":
        return Util.toChar(info, info.methodTypeArgs.head, patternInput[2]);

      case "toString":
        return Util.toString(info, info.methodTypeArgs.head, patternInput[2]);

      case "toEnum":
        return patternInput[2].head;

      case "createDictionary":
        return Util.makeDictionaryOrHashSet(patternInput[0], patternInput[1], "Map", false, info.methodTypeArgs.head, patternInput[2]);

      case "createSet":
        return Util.makeMapOrSetCons(com, info, "Set", patternInput[2]);

      case "ignore":
        return makeEmit(patternInput[0], new Type(2), patternInput[2], "$0, void 0");

      case "op_Range":
      case "op_RangeStep":
        let meth;
        const matchValue_2 = info.methodTypeArgs.head;

        if (matchValue_2.tag === 4) {
          meth = "rangeChar";
        } else if (info.methodName === "op_Range") {
          meth = "range";
        } else {
          meth = "rangeStep";
        }

        return Util.ccall(info, "Seq", meth, patternInput[2]);

      case "fst":
      case "snd":
        return (callee = patternInput[2].head, function (propExpr) {
          return makeGet(patternInput[0], patternInput[1], callee, propExpr);
        })(makeIntConst(info.methodName === "fst" ? 0 : 1));

      case "printFormatToString":
      case "printFormatToStringThen":
      case "printFormat":
      case "printFormatLine":
      case "printFormatThen":
      case "printFormatToStringThenFail":
        return fsFormat(com, info);

      case "printFormatToError":
      case "printFormatLineToError":
        return Util.ccall(info, "String", "toConsoleError", info.args);

      case "raise":
        return new Expr(5, [patternInput[2].head, patternInput[1], patternInput[0]]);

      case "reraise":
        if (info.caughtException == null) {
          (function (warning) {
            addError(com, info.fileName, info.range, warning);
          })("`reraise` used in context where caught exception is not available, please report");

          return new Expr(5, [Util.newError(null, new Type(1), new List_1()), patternInput[1], patternInput[0]]);
        } else {
          const ex = new Expr(0, new ValueKind(5, getValue(info.caughtException)));
          return new Expr(5, [ex, patternInput[1], patternInput[0]]);
        }

      case "failWith":
      case "invalidOp":
      case "invalidArg":
        const args_5 = info.methodName === "invalidArg" ? ofArray([makeEmit(null, new Type(5), patternInput[2], "$1 + '\\nParameter name: ' + $0")]) : patternInput[2];
        return new Expr(5, [Util.newError(null, new Type(1), args_5), patternInput[1], patternInput[0]]);

      case "typeOf":
      case "typeDefOf":
        return (generic = info.methodName === "typeOf", function (t) {
          return Util.resolveTypeRef(com, info, generic, t);
        })(info.methodTypeArgs.head);

      case "op_Append":
        return Util.ccall(info, "List", "append", patternInput[2]);

      default:
        return null;
    }
  };

  const chars = __exports.chars = function (com, i) {
    switch (i.methodName) {
      case "toUpper":
        return Util.icall(i, "toLocaleUpperCase");

      case "toUpperInvariant":
        return Util.icall(i, "toUpperCase");

      case "toLower":
        return Util.icall(i, "toLocaleLowerCase");

      case "toLowerInvariant":
        return Util.icall(i, "toLowerCase");

      case "isLetter":
      case "isNumber":
      case "isDigit":
      case "isLetterOrDigit":
      case "isWhiteSpace":
      case "isUpper":
      case "isLower":
      case "parse":
        let methName;

        if (i.methodName === "isNumber") {
          addWarning(com, i.fileName, i.range, "Char.IsNumber is compiled as Char.IsDigit");
          methName = "isDigit";
        } else {
          methName = i.methodName;
        }

        return function (args) {
          return Util.ccall(i, "Char", methName, args);
        }((() => {
          const $var86 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [0, i.args.tail.head, i.args.head] : [1, i.args] : [1, i.args] : [1, i.args];

          switch ($var86[0]) {
            case 0:
              return ofArray([makeGet(null, new Type(4), $var86[2], $var86[1])]);

            case 1:
              return $var86[1];
          }
        })());

      default:
        return null;
    }
  };

  const strings = __exports.strings = function (com, i) {
    const icall2 = function (meth, tupledArg) {
      return makeCall(i.range, i.returnType, new CallKind(0, [tupledArg[0], meth, tupledArg[1]]));
    };

    switch (i.methodName) {
      case ".ctor":
        const matchValue = i.args.head.Type;

        if (matchValue.tag === 5) {
          const $var87 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [0, i.args.head, i.args.tail.head] : [1] : [1] : [1];

          switch ($var87[0]) {
            case 0:
              return Util.emit(i, "Array($1 + 1).join($0)", i.args);

            case 1:
              throw new Error("Unexpected arguments in System.String constructor.");
          }
        } else if (matchValue.tag === 9) {
          const $var88 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail != null ? i.args.tail.tail.tail.tail == null ? [1, i.args.head, i.args.tail.tail.head, i.args.tail.head] : [2] : [2] : [0, i.args.head] : [2];

          switch ($var88[0]) {
            case 0:
              return Util.emit(i, "$0.join('')", i.args);

            case 1:
              return Util.emit(i, "$0.join('').substr($1, $2)", i.args);

            case 2:
              throw new Error("Unexpected arguments in System.String constructor.");
          }
        } else {
          return fsFormat(com, i);
        }

      case "length":
        const patternInput = Util.instanceArgs(i.callee, i.args);
        return makeGet(i.range, i.returnType, patternInput[0], makeStrConst("length"));

      case "equals":
        const matchValue_1 = [i.callee, i.args];
        const $var89 = matchValue_1[0] == null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail != null ? matchValue_1[1].tail.tail.tail != null ? matchValue_1[1].tail.tail.tail.tail == null ? [1, matchValue_1[1].tail.tail.head, matchValue_1[1].head, matchValue_1[1].tail.head] : [2] : [0, matchValue_1[1].head, matchValue_1[1].tail.head] : [2] : [2] : matchValue_1[1].tail != null ? matchValue_1[1].tail.tail != null ? matchValue_1[1].tail.tail.tail == null ? [1, matchValue_1[1].tail.head, getValue(matchValue_1[0]), matchValue_1[1].head] : [2] : [0, getValue(matchValue_1[0]), matchValue_1[1].head] : [2];

        switch ($var89[0]) {
          case 0:
            return makeEqOp(i.range, ofArray([$var89[1], $var89[2]]), new BinaryOperator(2));

          case 1:
            return makeEqOp(i.range, ofArray([Util.ccall(i, "String", "compare", ofArray([$var89[2], $var89[3], $var89[1]])), makeIntConst(0)]), new BinaryOperator(2));

          case 2:
            return null;
        }

      case "contains":
        if (i.args.length > 1) {
          addWarning(com, i.fileName, i.range, "String.Contains: second argument is ignored");
        }

        return makeEqOp(i.range, ofArray([icall2("indexOf", [getValue(i.callee), ofArray([i.args.head])]), makeIntConst(0)]), new BinaryOperator(7));

      case "startsWith":
        const $var90 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [1, i.args.tail.head, i.args.head] : [2] : [0, i.args.head] : [2];

        switch ($var90[0]) {
          case 0:
            return makeEqOp(i.range, ofArray([icall2("indexOf", [getValue(i.callee), ofArray([i.args.head])]), makeIntConst(0)]), new BinaryOperator(2));

          case 1:
            return Util.ccall(i, "String", "startsWith", new List_1(getValue(i.callee), i.args));

          case 2:
            return null;
        }

      case "substring":
        return Util.icall(i, "substr");

      case "toUpper":
        return Util.icall(i, "toLocaleUpperCase");

      case "toUpperInvariant":
        return Util.icall(i, "toUpperCase");

      case "toLower":
        return Util.icall(i, "toLocaleLowerCase");

      case "toLowerInvariant":
        return Util.icall(i, "toLowerCase");

      case "chars":
        return makeCall(i.range, i.returnType, new CallKind(2, ["String", "getCharAtIndex", false, new List_1(getValue(i.callee), i.args)]));

      case "indexOf":
      case "lastIndexOf":
        let $var91;

        if (i.args.tail != null) {
          const activePatternResult60329 = Util["|Type|"](i.args.head);

          if (activePatternResult60329.tag === 4) {
            if (i.args.tail.tail != null) {
              const activePatternResult60330 = Util["|Type|"](i.args.tail.head);

              if (activePatternResult60330.tag === 6) {
                if (activePatternResult60330.data.tag === 4) {
                  if (i.args.tail.tail.tail == null) {
                    $var91 = [0];
                  } else {
                    $var91 = [1];
                  }
                } else {
                  $var91 = [1];
                }
              } else {
                $var91 = [1];
              }
            } else {
              $var91 = [0];
            }
          } else if (activePatternResult60329.tag === 5) {
            if (i.args.tail.tail != null) {
              const activePatternResult60331 = Util["|Type|"](i.args.tail.head);

              if (activePatternResult60331.tag === 6) {
                if (activePatternResult60331.data.tag === 4) {
                  if (i.args.tail.tail.tail == null) {
                    $var91 = [0];
                  } else {
                    $var91 = [1];
                  }
                } else {
                  $var91 = [1];
                }
              } else {
                $var91 = [1];
              }
            } else {
              $var91 = [0];
            }
          } else {
            $var91 = [1];
          }
        } else {
          $var91 = [1];
        }

        switch ($var91[0]) {
          case 0:
            return Util.icall(i, i.methodName);

          case 1:
            return function (error) {
              return addErrorAndReturnNull(com, i.fileName, i.range, error);
            }("The only extra argument accepted for String.IndexOf/LastIndexOf is startIndex.");
        }

      case "trim":
      case "trimStart":
      case "trimEnd":
        const side = i.methodName === "trimStart" ? "start" : i.methodName === "trimEnd" ? "end" : "both";
        return makeCall(i.range, i.returnType, new CallKind(2, ["String", "trim", false, ofArray([getValue(i.callee), makeStrConst(side)], i.args)]));

      case "toCharArray":
        return makeCall(i.range, i.returnType, new CallKind(0, [getValue(i.callee), "split", ofArray([makeStrConst("")])]));

      case "iterate":
      case "iterateIndexed":
      case "forAll":
      case "exists":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Seq", i.methodName, false, i.args]));

      case "map":
      case "mapIndexed":
      case "collect":
        return function (args) {
          return Util.emit(i, "Array.from($0).join('')", args);
        }(singleton(makeCall(i.range, new Type(1), new CallKind(2, ["Seq", i.methodName, false, i.args]))));

      case "concat":
        const args_1 = i.ownerFullName === "System.String" ? new List_1(makeStrConst(""), i.args) : i.args;
        return makeCall(i.range, i.returnType, new CallKind(2, ["String", "join", false, args_1]));

      case "split":
        return makeCall(i.range, new Type(5), (() => {
          let $var92;

          if (i.args.tail != null) {
            if (i.args.tail.tail != null) {
              const activePatternResult60337 = Util["|Type|"](i.args.tail.head);

              if (activePatternResult60337.tag === 13) {
                if (i.args.tail.tail.tail == null) {
                  $var92 = [1, i.args.head, i.args.tail.head];
                } else {
                  $var92 = [2, i.args];
                }
              } else {
                $var92 = [2, i.args];
              }
            } else {
              $var92 = [2, i.args];
            }
          } else {
            $var92 = [0];
          }

          switch ($var92[0]) {
            case 0:
              return new CallKind(0, [getValue(i.callee), "split", ofArray([new Expr(0, new ValueKind(8, " "))])]);

            case 1:
              let arg1;
              const matchValue_2 = $var92[1].Type;

              if (matchValue_2.tag === 9) {
                arg1 = $var92[1];
              } else {
                arg1 = new Expr(0, new ValueKind(11, [new ArrayConsKind(0, ofArray([$var92[1]])), new Type(5)]));
              }

              const args_2 = ofArray([arg1, new Expr(0, new ValueKind(0)), $var92[2]]);
              return new CallKind(2, ["String", "split", false, new List_1(getValue(i.callee), args_2)]);

            case 2:
              return new CallKind(2, ["String", "split", false, new List_1(getValue(i.callee), $var92[1])]);
          }
        })());

      case "filter":
        return Util.ccall(i, "String", "filter", i.args);

      default:
        return null;
    }
  };

  const log = __exports.log = function (com, i) {
    let v;

    if (i.args.tail != null) {
      if (i.args.tail.tail == null) {
        v = i.args.head;
      } else {
        const activePatternResult60342 = Util["|Type|"](i.args.head);

        if (activePatternResult60342.tag === 5) {
          v = makeCall(i.range, new Type(5), new CallKind(2, ["String", "format", false, i.args]));
        } else {
          v = i.args.head;
        }
      }
    } else {
      v = new Expr(0, new ValueKind(0));
    }

    return makeCall(i.range, i.returnType, new CallKind(3, ["console", "log", false, ofArray([v])]));
  };

  const bitConvert = __exports.bitConvert = function (com, i) {
    let methodName;

    if (i.methodName === "getBytes") {
      const matchValue = i.args.head.Type;
      const $var93 = matchValue.tag === 3 ? [0] : matchValue.tag === 4 ? [1] : matchValue.tag === 6 ? matchValue.data.tag === 2 ? [2] : matchValue.data.tag === 4 ? [3] : matchValue.data.tag === 3 ? [5] : matchValue.data.tag === 5 ? [6] : matchValue.data.tag === 6 ? [8] : matchValue.data.tag === 7 ? [9] : [10, matchValue] : matchValue.tag === 7 ? matchValue.data.tag === 0 ? [4] : matchValue.data.tag === 1 ? [7] : [10, matchValue] : [10, matchValue];

      switch ($var93[0]) {
        case 0:
          methodName = "getBytesBoolean";
          break;

        case 1:
          methodName = "getBytesChar";
          break;

        case 2:
          methodName = "getBytesInt16";
          break;

        case 3:
          methodName = "getBytesInt32";
          break;

        case 4:
          methodName = "getBytesInt64";
          break;

        case 5:
          methodName = "getBytesUInt16";
          break;

        case 6:
          methodName = "getBytesUInt32";
          break;

        case 7:
          methodName = "getBytesUInt64";
          break;

        case 8:
          methodName = "getBytesSingle";
          break;

        case 9:
          methodName = "getBytesDouble";
          break;

        case 10:
          methodName = toFail(printf("Unsupported type in BitConverter.GetBytes(): %A"))($var93[1]);
          break;
      }
    } else {
      methodName = i.methodName;
    }

    return makeCall(i.range, i.returnType, new CallKind(2, ["BitConverter", methodName, false, i.args]));
  };

  const parse = __exports.parse = function (com, i, isFloat) {
    const numberModule = isFloat ? "Double" : "Int32";
    const $var94 = i.methodName === "isNaN" ? isFloat ? [0] : [1] : [1];

    switch ($var94[0]) {
      case 0:
        const $var95 = i.args.tail != null ? i.args.tail.tail == null ? [0, i.args.head] : [1] : [1];

        switch ($var95[0]) {
          case 0:
            return makeCall(i.range, new Type(6, new NumberKind(7)), new CallKind(3, ["Number", "isNaN", false, i.args]));

          case 1:
            return null;
        }

      case 1:
        const $var96 = i.methodName === "parse" ? [0] : i.methodName === "tryParse" ? [0] : i.methodName === "toString" ? [1] : [2];

        switch ($var96[0]) {
          case 0:
            const hexConst = 515;
            const matchValue = [i.methodName, i.args];
            const $var97 = matchValue[0] === "parse" ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 13 ? matchValue[1].tail.head.data[0].tag === 0 ? matchValue[1].tail.head.data[0].data.tag === 7 ? matchValue[1].tail.head.data[1].tag === 13 ? matchValue[1].tail.tail.tail == null ? [1, matchValue[1].tail.head.data[0].data.data[0], matchValue[1].head] : [5] : matchValue[1].tail.tail.tail == null ? [3, matchValue[1].head] : [5] : matchValue[1].tail.head.data[1].tag === 13 ? matchValue[1].tail.tail.tail == null ? [2, matchValue[1].head, matchValue[1].tail.head.data[0]] : [5] : matchValue[1].tail.tail.tail == null ? [3, matchValue[1].head] : [5] : matchValue[1].tail.head.data[1].tag === 13 ? matchValue[1].tail.tail.tail == null ? [2, matchValue[1].head, matchValue[1].tail.head.data[0]] : [5] : matchValue[1].tail.tail.tail == null ? [3, matchValue[1].head] : [5] : matchValue[1].tail.tail.tail == null ? [3, matchValue[1].head] : [5] : [0, matchValue[1].head] : [5] : matchValue[0] === "tryParse" ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [4, matchValue[1].tail.head, matchValue[1].head] : [5] : [5] : [5] : [5];

            switch ($var97[0]) {
              case 0:
                return makeCall(i.range, i.returnType, new CallKind(2, [numberModule, "parse", false, ofArray([$var97[1], isFloat ? makeNumConst(10) : makeIntConst(10)])]));

              case 1:
                return makeCall(i.range, i.returnType, new CallKind(2, [numberModule, "parse", false, ofArray([$var97[2], isFloat ? makeNumConst(16) : makeIntConst(16)])]));

              case 2:
                return null;

              case 3:
                return makeCall(i.range, i.returnType, new CallKind(2, [numberModule, "parse", false, ofArray([$var97[1], isFloat ? makeNumConst(10) : makeIntConst(10)])]));

              case 4:
                return makeCall(i.range, i.returnType, new CallKind(2, [numberModule, "tryParse", false, ofArray([$var97[2], isFloat ? makeNumConst(10) : makeIntConst(10), $var97[1]])]));

              case 5:
                return function (error) {
                  return addErrorAndReturnNull(com, i.fileName, i.range, error);
                }(toText(printf("%s.%s only accepts a single argument"))(i.ownerFullName, i.methodName));
            }

          case 1:
            let $var98;

            if (i.args.tail != null) {
              const activePatternResult60358 = Util["|Type|"](i.args.head);

              if (activePatternResult60358.tag === 5) {
                if (i.args.tail.tail == null) {
                  $var98 = [0, i.args.head];
                } else {
                  $var98 = [1];
                }
              } else {
                $var98 = [1];
              }
            } else {
              $var98 = [1];
            }

            switch ($var98[0]) {
              case 0:
                const format = Util.emitNoInfo("'{0:' + $0 + '}'", ofArray([$var98[1]]));
                return makeCall(i.range, i.returnType, new CallKind(2, ["String", "format", false, ofArray([format, getValue(i.callee)])]));

              case 1:
                return Util.ccall(i, "Util", "toString", ofArray([getValue(i.callee)]));
            }

          case 2:
            return null;
        }

    }
  };

  const convert = __exports.convert = function (com, i) {
    switch (i.methodName) {
      case "toSByte":
      case "toByte":
      case "toInt16":
      case "toUInt16":
      case "toInt32":
      case "toUInt32":
      case "toInt64":
      case "toUInt64":
        return Util.toInt(true, i.range, i.methodArgTypes.head, i.returnType, i.args);

      case "toSingle":
      case "toDouble":
      case "toDecimal":
        return Util.toFloat(i.range, i.methodArgTypes.head, i.returnType, i.args);

      case "toChar":
        return Util.toChar(i, i.methodArgTypes.head, i.args);

      case "toString":
        return Util.toString(i, i.methodArgTypes.head, i.args);

      case "toBase64String":
      case "fromBase64String":
        if (!List.isSingle(i.args)) {
          (function (warning) {
            addWarning(com, i.fileName, i.range, warning);
          })(toText(printf("Convert.%s only accepts one single argument"))(Naming.upperFirst(i.methodName)));
        }

        return Util.ccall(i, "String", i.methodName, i.args);

      default:
        return null;
    }
  };

  const console = __exports.console = function (com, i) {
    if (i.methodName === "out") {
      if (i.methodKind.tag === 2) {
        return new Expr(0, new ValueKind(0));
      } else {
        return null;
      }
    } else if (i.methodName === "write") {
      addWarning(com, i.fileName, i.range, "Write will behave as WriteLine");
      return log(com, i);
    } else if (i.methodName === "writeLine") {
      return log(com, i);
    } else {
      return null;
    }
  };

  const decimals = __exports.decimals = function (com, i) {
    const matchValue = [i.methodName, i.args];
    const $var99 = matchValue[0] === ".ctor" ? matchValue[1].tail != null ? matchValue[1].head.tag === 0 ? matchValue[1].head.data.tag === 7 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 0 ? matchValue[1].tail.head.data.tag === 7 ? matchValue[1].tail.head.data.data[1].tag === 4 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 0 ? matchValue[1].tail.tail.head.data.tag === 7 ? matchValue[1].tail.tail.head.data.data[1].tag === 4 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 0 ? matchValue[1].tail.tail.tail.head.data.tag === 9 ? matchValue[1].tail.tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.tail.head.tag === 0 ? matchValue[1].tail.tail.tail.tail.head.data.tag === 7 ? matchValue[1].tail.tail.tail.tail.head.data.data[1].tag === 1 ? matchValue[1].tail.tail.tail.tail.tail.tail == null ? matchValue[1].head.data.data[1].tag === 4 ? [2, matchValue[1].tail.tail.head.data.data[0], matchValue[1].tail.tail.tail.head.data.data, matchValue[1].head.data.data[0], matchValue[1].tail.head.data.data[0], matchValue[1].tail.tail.tail.tail.head.data.data[0]] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [0, matchValue[1].head.data.data[0]] : matchValue[1].head.data.tag === 11 ? matchValue[1].head.data.data[0].tag === 0 ? matchValue[1].tail.tail == null ? [1, matchValue[1].head.data.data[0].data] : [5] : [5] : matchValue[1].head.data.tag === 5 ? matchValue[1].tail.tail == null ? [3] : [5] : [5] : [5] : [5] : matchValue[0] === "makeDecimal" ? matchValue[1].tail != null ? matchValue[1].head.tag === 0 ? matchValue[1].head.data.tag === 7 ? matchValue[1].head.data.data[1].tag === 4 ? matchValue[1].tail.tail != null ? matchValue[1].tail.head.tag === 0 ? matchValue[1].tail.head.data.tag === 7 ? matchValue[1].tail.head.data.data[1].tag === 4 ? matchValue[1].tail.tail.tail != null ? matchValue[1].tail.tail.head.tag === 0 ? matchValue[1].tail.tail.head.data.tag === 7 ? matchValue[1].tail.tail.head.data.data[1].tag === 4 ? matchValue[1].tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.head.tag === 0 ? matchValue[1].tail.tail.tail.head.data.tag === 9 ? matchValue[1].tail.tail.tail.tail.tail != null ? matchValue[1].tail.tail.tail.tail.head.tag === 0 ? matchValue[1].tail.tail.tail.tail.head.data.tag === 7 ? matchValue[1].tail.tail.tail.tail.head.data.data[1].tag === 1 ? matchValue[1].tail.tail.tail.tail.tail.tail == null ? [2, matchValue[1].tail.tail.head.data.data[0], matchValue[1].tail.tail.tail.head.data.data, matchValue[1].head.data.data[0], matchValue[1].tail.head.data.data[0], matchValue[1].tail.tail.tail.tail.head.data.data[0]] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : [5] : matchValue[0] === "parse" ? [4] : matchValue[0] === "tryParse" ? [4] : [5];

    switch ($var99[0]) {
      case 0:
        return makeNumConst($var99[1]);

      case 1:
        const $var100 = $var99[1].tail != null ? $var99[1].head.tag === 0 ? $var99[1].head.data.tag === 7 ? $var99[1].head.data.data[1].tag === 4 ? $var99[1].tail.tail != null ? $var99[1].tail.head.tag === 0 ? $var99[1].tail.head.data.tag === 7 ? $var99[1].tail.head.data.data[1].tag === 4 ? $var99[1].tail.tail.tail != null ? $var99[1].tail.tail.head.tag === 0 ? $var99[1].tail.tail.head.data.tag === 7 ? $var99[1].tail.tail.head.data.data[1].tag === 4 ? $var99[1].tail.tail.tail.tail != null ? $var99[1].tail.tail.tail.head.tag === 0 ? $var99[1].tail.tail.tail.head.data.tag === 7 ? $var99[1].tail.tail.tail.head.data.data[1].tag === 4 ? $var99[1].tail.tail.tail.tail.tail == null ? [0, $var99[1].tail.tail.head.data.data[0], $var99[1].head.data.data[0], $var99[1].tail.head.data.data[0], $var99[1].tail.tail.tail.head.data.data[0]] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

        switch ($var100[0]) {
          case 0:
            const x = fromNumber($var100[3] >>> 0, true).shl(32).or(fromNumber($var100[2] >>> 0, true)).toNumber() / Math.pow(10, ~~$var100[4] >> 16 & 255);
            return makeNumConst($var100[4] < 0 ? -x : x);

          case 1:
            return null;
        }

      case 2:
        const x_1 = fromNumber($var99[4] >>> 0, true).shl(32).or(fromNumber($var99[3] >>> 0, true)).toNumber() / Math.pow(10, $var99[5]);
        return makeNumConst($var99[2] ? -x_1 : x_1);

      case 3:
        addWarning(com, i.fileName, i.range, "Decimals are implemented with floats.");
        return Util.wrap(i.returnType, i.args.head);

      case 4:
        return parse(com, i, true);

      case 5:
        return null;
    }
  };

  const debug = __exports.debug = function (com, i) {
    switch (i.methodName) {
      case "write":
        addWarning(com, i.fileName, i.range, "Write will behave as WriteLine");
        return log(com, i);

      case "writeLine":
        return log(com, i);

      case "break":
        return new Expr(6, i.range);

      case "assert":
        const cond = new Expr(3, [new Expr(0, new ValueKind(13, new UnaryOperator(2))), i.args, new ApplyKind(0), new Type(3), i.range]);
        return new Expr(2, [cond, new Expr(6, i.range), new Expr(0, new ValueKind(0)), i.range]);

      default:
        return null;
    }
  };

  const regex = __exports.regex = function (com, i) {
    const propInt = function (p, callee) {
      return makeGet(i.range, i.returnType, callee, makeIntConst(p));
    };

    const propStr = function (p_1, callee_1) {
      return makeGet(i.range, i.returnType, callee_1, makeStrConst(p_1));
    };

    let isGroup;
    let $var101;

    if (i.callee != null) {
      const activePatternResult60392 = Util["|Type|"](getValue(i.callee));
      const activePatternResult60393 = Util["|EntFullName|_|"](activePatternResult60392);

      if (activePatternResult60393 != null) {
        if (getValue(activePatternResult60393) === "System.Text.RegularExpressions.Group") {
          $var101 = [0];
        } else {
          $var101 = [1];
        }
      } else {
        $var101 = [1];
      }
    } else {
      $var101 = [1];
    }

    switch ($var101[0]) {
      case 0:
        isGroup = true;
        break;

      case 1:
        isGroup = false;
        break;
    }

    switch (i.methodName) {
      case ".ctor":
        return makeCall(i.range, i.returnType, new CallKind(2, ["RegExp", "create", false, i.args]));

      case "options":
        return makeCall(i.range, i.returnType, new CallKind(2, ["RegExp", "options", false, ofArray([getValue(i.callee)])]));

      case "index":
        if (!isGroup) {
          return propStr("index", getValue(i.callee));
        } else {
          return function (error) {
            return addErrorAndReturnNull(com, i.fileName, i.range, error);
          }("Accessing index of Regex groups is not supported");
        }

      case "value":
        if (isGroup) {
          const value = Util.wrap(i.returnType, getValue(i.callee));
          return makeLogOp(i.range, ofArray([value, makeStrConst("")]), new LogicalOperator(0));
        } else {
          return propInt(0, getValue(i.callee));
        }

      case "length":
        if (isGroup) {
          return propStr("length", getValue(i.callee));
        } else {
          return CurriedLambda(propStr)("length")(propInt(0, getValue(i.callee)));
        }

      case "success":
        return makeEqOp(i.range, ofArray([getValue(i.callee), new Expr(0, new ValueKind(0))]), new BinaryOperator(1));

      case "groups":
        return Util.wrap(i.returnType, getValue(i.callee));

      case "item":
        return makeGet(i.range, i.returnType, getValue(i.callee), i.args.head);

      case "count":
        return propStr("length", getValue(i.callee));

      default:
        return null;
    }
  };

  const errorStrings = __exports.errorStrings = function (com, i) {
    if (i.methodName === "inputArrayEmptyString") {
      return makeStrConst("The input array was empty");
    } else if (i.methodName === "inputSequenceEmptyString") {
      return makeStrConst("The input sequence was empty");
    } else if (i.methodName === "inputMustBeNonNegativeString") {
      return makeStrConst("The input must be non-negative");
    } else {
      return null;
    }
  };

  const languagePrimitives = __exports.languagePrimitives = function (com, i) {
    switch (i.methodName) {
      case "enumOfValue":
        const matchValue = [i.callee, i.args];
        const activePatternResult60415 = Util["|OneArg|_|"](matchValue[0], matchValue[1]);

        if (activePatternResult60415 != null) {
          return getValue(activePatternResult60415);
        } else {
          return null;
        }

      case "genericHash":
      case "genericHashIntrinsic":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "hash", false, i.args]));

      case "genericComparison":
      case "genericComparisonIntrinsic":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "compare", false, i.args]));

      case "genericLessThan":
      case "genericLessThanIntrinsic":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "lessThan", false, i.args]));

      case "genericLessOrEqual":
      case "genericLessOrEqualIntrinsic":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "lessOrEqual", false, i.args]));

      case "genericGreaterThan":
      case "genericGreaterThanIntrinsic":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "greaterThan", false, i.args]));

      case "genericGreaterOrEqual":
      case "genericGreaterOrEqualIntrinsic":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "greaterOrEqual", false, i.args]));

      case "genericEquality":
      case "genericEqualityIntrinsic":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "equals", false, i.args]));

      case "physicalEquality":
      case "physicalEqualityIntrinsic":
        return makeEqOp(i.range, i.args, new BinaryOperator(2));

      case "physicalHash":
      case "physicalHashIntrinsic":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Util", "getHashCode", false, i.args]));

      default:
        return null;
    }
  };

  const intrinsicFunctions = __exports.intrinsicFunctions = function (com, i) {
    const matchValue = [i.methodName, [i.callee, i.args]];
    let $var102;

    if (matchValue[0] === "checkThis") {
      if (matchValue[1][0] == null) {
        if (matchValue[1][1].tail != null) {
          if (matchValue[1][1].tail.tail == null) {
            $var102 = [0, matchValue[1][1].head];
          } else {
            $var102 = [2];
          }
        } else {
          $var102 = [2];
        }
      } else {
        $var102 = [2];
      }
    } else if (matchValue[0] === "unboxFast") {
      const activePatternResult60447 = Util["|OneArg|_|"](matchValue[1][0], matchValue[1][1]);

      if (activePatternResult60447 != null) {
        $var102 = [1, getValue(activePatternResult60447)];
      } else {
        $var102 = [2];
      }
    } else {
      $var102 = [2];
    }

    switch ($var102[0]) {
      case 0:
        return $var102[1];

      case 1:
        return Util.wrap(i.returnType, $var102[1]);

      case 2:
        let $var103;

        if (matchValue[0] === "unboxGeneric") {
          const activePatternResult60446 = Util["|OneArg|_|"](matchValue[1][0], matchValue[1][1]);

          if (activePatternResult60446 != null) {
            $var103 = [0, getValue(activePatternResult60446)];
          } else {
            $var103 = [1];
          }
        } else {
          $var103 = [1];
        }

        switch ($var103[0]) {
          case 0:
            return Util.wrap(i.returnType, $var103[1]);

          case 1:
            let $var104;

            if (matchValue[0] === "makeDecimal") {
              $var104 = [0];
            } else if (matchValue[0] === "getString") {
              const activePatternResult60444 = Util["|TwoArgs|_|"](matchValue[1][0], matchValue[1][1]);

              if (activePatternResult60444 != null) {
                $var104 = [1, getValue(activePatternResult60444)[0], getValue(activePatternResult60444)[1]];
              } else {
                $var104 = [2];
              }
            } else if (matchValue[0] === "getArray") {
              const activePatternResult60445 = Util["|TwoArgs|_|"](matchValue[1][0], matchValue[1][1]);

              if (activePatternResult60445 != null) {
                $var104 = [1, getValue(activePatternResult60445)[0], getValue(activePatternResult60445)[1]];
              } else {
                $var104 = [2];
              }
            } else {
              $var104 = [2];
            }

            switch ($var104[0]) {
              case 0:
                return decimals(com, i);

              case 1:
                return makeGet(i.range, i.returnType, $var104[1], $var104[2]);

              case 2:
                let $var105;

                if (matchValue[0] === "setArray") {
                  const activePatternResult60443 = Util["|ThreeArgs|_|"](matchValue[1][0], matchValue[1][1]);

                  if (activePatternResult60443 != null) {
                    $var105 = [0, getValue(activePatternResult60443)[0], getValue(activePatternResult60443)[1], getValue(activePatternResult60443)[2]];
                  } else {
                    $var105 = [1];
                  }
                } else {
                  $var105 = [1];
                }

                switch ($var105[0]) {
                  case 0:
                    return new Expr(9, [$var105[1], $var105[2], $var105[3], i.range]);

                  case 1:
                    let $var106;

                    if (matchValue[0] === "getArraySlice") {
                      const activePatternResult60441 = Util["|ThreeArgs|_|"](matchValue[1][0], matchValue[1][1]);

                      if (activePatternResult60441 != null) {
                        $var106 = [0, getValue(activePatternResult60441)[0], getValue(activePatternResult60441)[1], getValue(activePatternResult60441)[2]];
                      } else {
                        $var106 = [1];
                      }
                    } else if (matchValue[0] === "getStringSlice") {
                      const activePatternResult60442 = Util["|ThreeArgs|_|"](matchValue[1][0], matchValue[1][1]);

                      if (activePatternResult60442 != null) {
                        $var106 = [0, getValue(activePatternResult60442)[0], getValue(activePatternResult60442)[1], getValue(activePatternResult60442)[2]];
                      } else {
                        $var106 = [1];
                      }
                    } else {
                      $var106 = [1];
                    }

                    switch ($var106[0]) {
                      case 0:
                        let upper;
                        const t = new Type(6, new NumberKind(4));
                        const activePatternResult60432 = Util["|Null|_|"]($var106[3]);

                        if (activePatternResult60432 != null) {
                          upper = makeGet(null, t, $var106[1], makeStrConst("length"));
                        } else {
                          upper = new Expr(3, [new Expr(0, new ValueKind(14, new BinaryOperator(12))), ofArray([$var106[3], makeIntConst(1)]), new ApplyKind(0), t, null]);
                        }

                        return makeCall(i.range, i.returnType, new CallKind(0, [$var106[1], "slice", ofArray([$var106[2], upper])]));

                      case 1:
                        const $var107 = matchValue[0] === "setArraySlice" ? matchValue[1][0] == null ? [0, matchValue[1][1]] : [7] : matchValue[0] === "typeTestGeneric" ? matchValue[1][0] == null ? matchValue[1][1].tail != null ? matchValue[1][1].tail.tail == null ? [1, matchValue[1][1].head] : [7] : [7] : [7] : matchValue[0] === "createInstance" ? matchValue[1][0] == null ? [2] : [7] : matchValue[0] === "rangeInt32" ? matchValue[1][0] == null ? [3, matchValue[1][1]] : [7] : matchValue[0] === "powDouble" ? matchValue[1][0] == null ? [4] : [7] : matchValue[0] === "rangeChar" ? matchValue[1][0] == null ? [5] : [7] : matchValue[0] === "rangeDouble" ? matchValue[1][0] == null ? [6] : [7] : [7];

                        switch ($var107[0]) {
                          case 0:
                            return makeCall(i.range, i.returnType, new CallKind(2, ["Array", "setSlice", false, $var107[1]]));

                          case 1:
                            return makeTypeTest(com, i.fileName, i.range, $var107[1], i.methodTypeArgs.head);

                          case 2:
                            const patternInput = [Util.resolveTypeRef(com, i, false, i.methodTypeArgs.head), new List_1()];
                            return new Expr(3, [patternInput[0], patternInput[1], new ApplyKind(2), i.returnType, i.range]);

                          case 3:
                            return makeCall(i.range, i.returnType, new CallKind(2, ["Seq", "rangeStep", false, $var107[1]]));

                          case 4:
                            return makeCall(i.range, i.returnType, new CallKind(3, ["Math", "pow", false, i.args]));

                          case 5:
                            return makeCall(i.range, i.returnType, new CallKind(2, ["Seq", "rangeChar", false, i.args]));

                          case 6:
                            return makeCall(i.range, i.returnType, new CallKind(2, ["Seq", "rangeStep", false, i.args]));

                          case 7:
                            return null;
                        }

                    }

                }

            }

        }

    }
  };

  const activator = __exports.activator = function (com, i) {
    const matchValue = [i.methodName, i.callee, i.args];
    const $var108 = matchValue[0] === "createInstance" ? matchValue[1] == null ? matchValue[2].tail != null ? [0] : [1] : [1] : [1];

    switch ($var108[0]) {
      case 0:
        const typRef = matchValue[2].head;
        const args = matchValue[2].tail;
        return new Expr(3, [typRef, args, new ApplyKind(2), i.returnType, i.range]);

      case 1:
        return null;
    }
  };

  const funcs = __exports.funcs = function (com, i) {
    const matchValue = [i.methodName, i.callee];
    const $var109 = matchValue[0] === "adapt" ? [0] : matchValue[0] === "invoke" ? matchValue[1] != null ? [1] : [2] : [2];

    switch ($var109[0]) {
      case 0:
        return Util.wrap(i.returnType, i.args.head);

      case 1:
        const callee = getValue(matchValue[1]);
        return new Expr(3, [callee, i.args, new ApplyKind(0), i.returnType, i.range]);

      case 2:
        return null;
    }
  };

  const options = __exports.options = function (com, i) {
    const toArray_1 = function (r, t, arg) {
      const ident = makeIdent(com.GetUniqueVar());
      const f = makeLambdaExpr(ofArray([ident]), makeArray(new Type(1), ofArray([new Expr(0, new ValueKind(5, ident))])));
      return Util.ccall_(r, t, "Option", "defaultArg", ofArray([arg, makeArray(new Type(1), new List_1()), f]));
    };

    const getCallee = function (i_1) {
      if (i_1.callee == null) {
        return i_1.args.head;
      } else {
        return getValue(i_1.callee);
      }
    };

    switch (i.methodName) {
      case "none":
        return new Expr(0, new ValueKind(0));

      case "value":
      case "getValue":
        return Util.ccall(i, "Option", "getValue", ofArray([getCallee(i)]));

      case "toObj":
      case "toNullable":
      case "flatten":
        return Util.ccall(i, "Option", "getValue", ofArray([getCallee(i), makeBoolConst(true)]));

      case "ofObj":
      case "ofNullable":
        return Util.wrap(i.returnType, getCallee(i));

      case "isSome":
      case "isNone":
        const op = i.methodName === "isSome" ? new BinaryOperator(1) : new BinaryOperator(0);
        const comp = makeEqOp(i.range, ofArray([getCallee(i), new Expr(0, new ValueKind(0))]), op);

        if (i.returnType.tag === 3) {
          return comp;
        } else {
          return makeLambdaExpr(new List_1(), comp);
        }

      case "map":
      case "bind":
        const patternInput = [i.args.head, i.args.tail.head];
        return function (args) {
          return Util.ccall(i, "Option", "defaultArg", args);
        }(ofArray([patternInput[1], new Expr(0, new ValueKind(0)), patternInput[0]]));

      case "filter":
        return Util.ccall(i, "Option", "filter", i.args);

      case "toArray":
        return toArray_1(i.range, i.returnType, i.args.head);

      case "foldBack":
        const opt = toArray_1(null, new Type(1), i.args.tail.head);
        const args_1 = ofArray([i.args.head, opt], i.args.tail.tail);
        return Util.ccall(i, "Seq", "foldBack", args_1);

      case "defaultValue":
      case "orElse":
        return function (args_2) {
          return Util.ccall(i, "Option", "defaultArg", args_2);
        }(reverse(i.args));

      case "defaultWith":
      case "orElseWith":
        return function (args_3) {
          return Util.ccall(i, "Option", "defaultArgWith", args_3);
        }(reverse(i.args));

      case "count":
      case "contains":
      case "exists":
      case "fold":
      case "forAll":
      case "iterate":
      case "toList":
        let args_5;
        const args_4 = reverse(i.args);
        const opt_1 = toArray_1(null, new Type(1), args_4.head);
        args_5 = reverse(new List_1(opt_1, args_4.tail));
        return Util.ccall(i, "Seq", i.methodName, args_5);

      default:
        return null;
    }
  };

  const timeSpans = __exports.timeSpans = function (com, i) {
    if (i.methodName === ".ctor") {
      return makeCall(i.range, i.returnType, new CallKind(2, ["TimeSpan", "create", false, i.args]));
    } else if (i.methodName === "fromMilliseconds") {
      return Util.wrap(i.returnType, i.args.head);
    } else if (i.methodName === "totalMilliseconds") {
      return Util.wrap(i.returnType, getValue(i.callee));
    } else {
      return null;
    }
  };

  const systemEnv = __exports.systemEnv = function (com, i) {
    if (i.methodName === "newLine") {
      return new Expr(0, new ValueKind(8, "\n"));
    } else {
      return null;
    }
  };

  const dates = __exports.dates = function (com, i) {
    var e_1;

    const getTime = function (e) {
      return makeCall(e.Range, new Type(6, new NumberKind(7)), new CallKind(0, [e, "getTime", new List_1()]));
    };

    const moduleName = i.ownerFullName === "System.DateTime" ? "Date" : "DateOffset";
    const $var110 = i.methodName === ".ctor" ? [0] : i.methodName === "toString" ? [1] : i.methodName === "kind" ? [2] : i.methodName === "offset" ? [2] : i.methodName === "dateTime" ? [3, i.methodName] : i.methodName === "localDateTime" ? [3, i.methodName] : i.methodName === "utcDateTime" ? [3, i.methodName] : i.methodName === "fromUnixTimeSeconds" ? [4] : i.methodName === "fromUnixTimeMilliseconds" ? [4] : i.methodName === "toUnixTimeSeconds" ? [5] : i.methodName === "toUnixTimeMilliseconds" ? [5] : i.methodName === "ticks" ? [6] : i.methodName === "utcTicks" ? [6] : i.methodName === "toBinary" ? [6] : i.methodName === "addTicks" ? [7] : [8];

    switch ($var110[0]) {
      case 0:
        const $var111 = i.methodArgTypes.tail != null ? i.methodArgTypes.head.tag === 7 ? i.methodArgTypes.head.data.tag === 0 ? [1] : [3] : i.methodArgTypes.head.tag === 14 ? i.methodArgTypes.head.data[1].tail == null ? (e_1 = i.methodArgTypes.head.data[0], e_1.FullName === "System.DateTime") ? [2, i.methodArgTypes.head.data[0]] : [3] : [3] : [3] : [0];

        switch ($var111[0]) {
          case 0:
            return Util.ccall(i, moduleName, "minValue", new List_1());

          case 1:
            if (i.args.tail != null) {
              const ms = Util.ccall_(i.args.head.Range, new Type(6, new NumberKind(7)), "Long", "ticksToUnixEpochMilliseconds", ofArray([i.args.head]));
              return Util.ccall(i, moduleName, "default", new List_1(ms, i.args.tail));
            } else {
              return null;
            }

          case 2:
            return Util.ccall(i, "DateOffset", "fromDate", i.args);

          case 3:
            const last = last_1(i.args);
            const matchValue = [i.args.length, last.Type];
            const $var112 = matchValue[0] === 7 ? matchValue[1].tag === 13 ? matchValue[1].data === "System.DateTimeKind" ? [0] : [1] : [1] : [1];

            switch ($var112[0]) {
              case 0:
                return function (args) {
                  return Util.ccall(i, "Date", "create", args);
                }(append(toList_1(take(6, i.args)), ofArray([makeIntConst(0), last])));

              case 1:
                return Util.ccall(i, moduleName, "create", i.args);
            }

        }

      case 1:
        return Util.ccall(i, "Date", "toString", new List_1(getValue(i.callee), i.args));

      case 2:
        return makeGet(i.range, i.returnType, getValue(i.callee), makeStrConst(i.methodName));

      case 3:
        const ms_1 = getTime(getValue(i.callee));
        const kind = makeIntConst($var110[1] === "localDateTime" ? 2 : $var110[1] === "utcDateTime" ? 1 : 0);
        return Util.ccall(i, "Date", "default", ofArray([ms_1, kind]));

      case 4:
        const value = Util.chainCall("toNumber", new List_1(), new Type(6, new NumberKind(7)), i.args.head);
        const value_1 = i.methodName === "fromUnixTimeSeconds" ? makeBinOp(i.range, i.returnType, ofArray([value, makeIntConst(1000)]), new BinaryOperator(13)) : value;
        return Util.ccall(i, "DateOffset", "default", ofArray([value_1, makeIntConst(0)]));

      case 5:
        const ms_2 = getTime(getValue(i.callee));
        return function (args_1) {
          return Util.ccall(i, "Long", "fromNumber", args_1);
        }(i.methodName === "toUnixTimeSeconds" ? ofArray([makeBinOp(i.range, i.returnType, ofArray([ms_2, makeIntConst(1000)]), new BinaryOperator(14))]) : ofArray([ms_2]));

      case 6:
        const ms_3 = getTime(getValue(i.callee));
        const offset = i.methodName === "utcTicks" ? makeIntConst(0) : Util.ccall_(null, new Type(6, new NumberKind(7)), "Date", "offset", ofArray([getValue(i.callee)]));
        return Util.ccall(i, "Long", "unixEpochMillisecondsToTicks", ofArray([ms_3, offset]));

      case 7:
        const matchValue_1 = [i.callee, i.args];
        const $var113 = matchValue_1[0] != null ? matchValue_1[1].tail != null ? matchValue_1[1].tail.tail == null ? [0, getValue(matchValue_1[0]), matchValue_1[1].head] : [1] : [1] : [1];

        switch ($var113[0]) {
          case 0:
            const ms_4 = Util.chainCall("toNumber", new List_1(), new Type(6, new NumberKind(7)), Util.chainCall("div", ofArray([makeIntConst(10000)]), new Type(7, new ExtendedNumberKind(0)), $var113[2]));
            return Util.ccall(i, moduleName, "addMilliseconds", ofArray([$var113[1], ms_4]));

          case 1:
            return null;
        }

      case 8:
        return null;
    }
  };

  const keyValuePairs = __exports.keyValuePairs = function (com, i) {
    const get = function (k) {
      return makeGet(i.range, i.returnType, getValue(i.callee), makeIntConst(k));
    };

    if (i.methodName === ".ctor") {
      return new Expr(0, new ValueKind(12, i.args));
    } else if (i.methodName === "key") {
      return get(0);
    } else if (i.methodName === "value") {
      return get(1);
    } else {
      return null;
    }
  };

  const dictionaries = __exports.dictionaries = function (com, i) {
    const makeComparer_1 = function (e) {
      return Util.ccall_(e.Range, e.Type, "Comparer", "fromEqualityComparer", ofArray([e]));
    };

    const makeDic = function (forceFSharpMap, args) {
      return Util.makeDictionaryOrHashSet(i.range, i.returnType, "Map", forceFSharpMap, i.calleeTypeArgs.head, args);
    };

    switch (i.methodName) {
      case ".ctor":
        let $var114;

        if (i.methodArgTypes.tail != null) {
          const activePatternResult60521 = Util["|IDictionary|_|"](i.methodArgTypes.head);

          if (activePatternResult60521 != null) {
            if (i.methodArgTypes.tail.tail == null) {
              $var114 = [0];
            } else {
              $var114 = [1];
            }
          } else {
            $var114 = [1];
          }
        } else {
          $var114 = [0];
        }

        switch ($var114[0]) {
          case 0:
            return makeDic(false, i.args);

          case 1:
            let $var115;

            if (i.methodArgTypes.tail != null) {
              const activePatternResult60519 = Util["|IDictionary|_|"](i.methodArgTypes.head);

              if (activePatternResult60519 != null) {
                if (i.methodArgTypes.tail.tail != null) {
                  const activePatternResult60520 = Util["|IEqualityComparer|_|"](i.methodArgTypes.tail.head);

                  if (activePatternResult60520 != null) {
                    if (i.methodArgTypes.tail.tail.tail == null) {
                      $var115 = [0];
                    } else {
                      $var115 = [1];
                    }
                  } else {
                    $var115 = [1];
                  }
                } else {
                  $var115 = [1];
                }
              } else {
                $var115 = [1];
              }
            } else {
              $var115 = [1];
            }

            switch ($var115[0]) {
              case 0:
                return makeDic(true, ofArray([i.args.head, makeComparer_1(i.args.tail.head)]));

              case 1:
                let $var116;

                if (i.methodArgTypes.tail != null) {
                  const activePatternResult60518 = Util["|IEqualityComparer|_|"](i.methodArgTypes.head);

                  if (activePatternResult60518 != null) {
                    if (i.methodArgTypes.tail.tail == null) {
                      $var116 = [0];
                    } else {
                      $var116 = [1];
                    }
                  } else {
                    $var116 = [1];
                  }
                } else {
                  $var116 = [1];
                }

                switch ($var116[0]) {
                  case 0:
                    return makeDic(true, ofArray([new Expr(0, new ValueKind(0)), makeComparer_1(i.args.head)]));

                  case 1:
                    let $var117;

                    if (i.methodArgTypes.tail != null) {
                      if (i.methodArgTypes.head.tag === 6) {
                        if (i.methodArgTypes.tail.tail != null) {
                          const activePatternResult60517 = Util["|IEqualityComparer|_|"](i.methodArgTypes.tail.head);

                          if (activePatternResult60517 != null) {
                            if (i.methodArgTypes.tail.tail.tail == null) {
                              $var117 = [1];
                            } else {
                              $var117 = [2];
                            }
                          } else {
                            $var117 = [2];
                          }
                        } else {
                          $var117 = [0];
                        }
                      } else {
                        $var117 = [2];
                      }
                    } else {
                      $var117 = [2];
                    }

                    switch ($var117[0]) {
                      case 0:
                        return makeDic(false, new List_1());

                      case 1:
                        return makeDic(true, ofArray([new Expr(0, new ValueKind(0)), makeComparer_1(i.args.tail.head)]));

                      case 2:
                        return null;
                    }

                }

            }

        }

      case "isReadOnly":
        return new Expr(0, new ValueKind(9, false));

      case "count":
        return makeGet(i.range, i.returnType, getValue(i.callee), makeStrConst("size"));

      case "containsValue":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Map", "containsValue", false, ofArray([i.args.head, getValue(i.callee)])]));

      case "item":
        return Util.icall(i, i.args.length === 1 ? "get" : "set");

      case "keys":
        return Util.icall(i, "keys");

      case "values":
        return Util.icall(i, "values");

      case "containsKey":
        return Util.icall(i, "has");

      case "clear":
        return Util.icall(i, "clear");

      case "add":
        return Util.icall(i, "set");

      case "remove":
        return Util.icall(i, "delete");

      case "tryGetValue":
        const matchValue = [i.callee, i.args];
        const $var118 = matchValue[0] != null ? matchValue[1].tail != null ? matchValue[1].tail.tail != null ? matchValue[1].tail.tail.tail == null ? [0, matchValue[1].tail.head, getValue(matchValue[0]), matchValue[1].head] : [1] : [1] : [1] : [1];

        switch ($var118[0]) {
          case 0:
            return makeCall(i.range, i.returnType, new CallKind(2, ["Map", "tryGetValue", false, ofArray([$var118[2], $var118[3], $var118[1]])]));

          case 1:
            return null;
        }

      default:
        return null;
    }
  };

  const hashSets = __exports.hashSets = function (com, i) {
    const makeHashSet = function (forceFSharp, args) {
      return Util.makeDictionaryOrHashSet(i.range, i.returnType, "Set", forceFSharp, i.calleeTypeArgs.head, args);
    };

    switch (i.methodName) {
      case ".ctor":
        const makeComparer_1 = function (e) {
          return Util.ccall_(e.Range, e.Type, "Comparer", "fromEqualityComparer", ofArray([e]));
        };

        let $var119;

        if (i.methodArgTypes.tail != null) {
          const activePatternResult60545 = Util["|IEnumerable|_|"](i.methodArgTypes.head);

          if (activePatternResult60545 != null) {
            if (i.methodArgTypes.tail.tail == null) {
              $var119 = [0];
            } else {
              $var119 = [1];
            }
          } else {
            $var119 = [1];
          }
        } else {
          $var119 = [0];
        }

        switch ($var119[0]) {
          case 0:
            return makeHashSet(false, i.args);

          case 1:
            let $var120;

            if (i.methodArgTypes.tail != null) {
              const activePatternResult60543 = Util["|IEnumerable|_|"](i.methodArgTypes.head);

              if (activePatternResult60543 != null) {
                if (i.methodArgTypes.tail.tail != null) {
                  const activePatternResult60544 = Util["|IEqualityComparer|_|"](i.methodArgTypes.tail.head);

                  if (activePatternResult60544 != null) {
                    if (i.methodArgTypes.tail.tail.tail == null) {
                      $var120 = [0];
                    } else {
                      $var120 = [1];
                    }
                  } else {
                    $var120 = [1];
                  }
                } else {
                  $var120 = [1];
                }
              } else {
                $var120 = [1];
              }
            } else {
              $var120 = [1];
            }

            switch ($var120[0]) {
              case 0:
                return CurriedLambda(makeHashSet)(true)(ofArray([i.args.head, makeComparer_1(i.args.tail.head)]));

              case 1:
                let $var121;

                if (i.methodArgTypes.tail != null) {
                  const activePatternResult60542 = Util["|IEqualityComparer|_|"](i.methodArgTypes.head);

                  if (activePatternResult60542 != null) {
                    if (i.methodArgTypes.tail.tail == null) {
                      $var121 = [0];
                    } else {
                      $var121 = [1];
                    }
                  } else {
                    $var121 = [1];
                  }
                } else {
                  $var121 = [1];
                }

                switch ($var121[0]) {
                  case 0:
                    return CurriedLambda(makeHashSet)(true)(ofArray([new Expr(0, new ValueKind(0)), makeComparer_1(i.args.head)]));

                  case 1:
                    return null;
                }

            }

        }

      case "count":
        return makeGet(i.range, i.returnType, getValue(i.callee), makeStrConst("size"));

      case "isReadOnly":
        return new Expr(0, new ValueKind(9, false));

      case "clear":
        return Util.icall(i, "clear");

      case "contains":
        return Util.icall(i, "has");

      case "remove":
        return Util.icall(i, "delete");

      case "isProperSubsetOf":
      case "isProperSupersetOf":
      case "add":
        return makeCall(i.range, i.returnType, new CallKind(2, ["Set", "addInPlace", false, ofArray([i.args.head, getValue(i.callee)])]));

      case "unionWith":
      case "intersectWith":
      case "exceptWith":
      case "isSubsetOf":
      case "isSupersetOf":
      case "copyTo":
        let meth;
        const m = i.methodName === "exceptWith" ? "differenceWith" : i.methodName;
        meth = replace(m, "With", "InPlace");
        return makeCall(i.range, i.returnType, new CallKind(2, ["Set", meth, false, new List_1(getValue(i.callee), i.args)]));

      default:
        return null;
    }
  };

  const mapAndSets = __exports.mapAndSets = function (com, i) {
    const instanceArgs_1 = function () {
      return i.callee == null ? [last_1(i.args), toList_1(take(i.args.length - 1, i.args))] : [getValue(i.callee), i.args];
    };

    const prop_1 = function (prop) {
      const patternInput = instanceArgs_1();
      return makeGet(i.range, i.returnType, patternInput[0], makeStrConst(prop));
    };

    const icall_1 = function (meth) {
      const patternInput_1 = instanceArgs_1();
      return makeCall(i.range, i.returnType, new CallKind(0, [patternInput_1[0], meth, patternInput_1[1]]));
    };

    const modName = i.ownerFullName.indexOf("Map") >= 0 ? "Map" : "Set";

    switch (i.methodName) {
      case "count":
        return prop_1("size");

      case "contains":
      case "containsKey":
        return icall_1("has");

      case "add":
      case "remove":
      case "isEmpty":
      case "find":
      case "tryFind":
      case "maximumElement":
      case "minimumElement":
      case "maxElement":
      case "minElement":
        let args;

        switch (i.methodName) {
          case "isEmpty":
          case "maximumElement":
          case "minimumElement":
          case "maxElement":
          case "minElement":
            args = Util.staticArgs(i.callee, i.args);
            break;

          default:
            args = append(i.args, toList_1(defaultArg(i.callee, [], $var122 => [$var122])));
        }

        return makeCall(i.range, i.returnType, new CallKind(2, [modName, i.methodName, false, args]));

      case "item":
        return icall_1("get");

      case "empty":
        return Util.makeMapOrSetCons(com, i, modName, new List_1());

      case ".ctor":
        return Util.makeMapOrSetCons(com, i, modName, i.args);

      case "toArray":
        return Util.toArray(com, i, i.args.head);

      case "toList":
        return Util.toList(com, i, i.args.head);

      case "toSeq":
        return i.args.head;

      case "ofArray":
        return Util.makeMapOrSetCons(com, i, modName, i.args);

      case "ofList":
      case "ofSeq":
        return Util.makeMapOrSetCons(com, i, modName, i.args);

      case "exists":
      case "fold":
      case "foldBack":
      case "forAll":
      case "iterate":
      case "filter":
      case "map":
      case "partition":
      case "findKey":
      case "tryFindKey":
      case "pick":
      case "tryPick":
        return makeCall(i.range, i.returnType, new CallKind(2, [modName, i.methodName, false, i.args]));

      case "singleton":
        return function (args_1) {
          return Util.makeMapOrSetCons(com, i, modName, args_1);
        }(ofArray([makeArray(new Type(1), i.args)]));

      default:
        return null;
    }
  };

  const CollectionKind = __exports.CollectionKind = class CollectionKind {
    constructor(tag) {
      this.tag = tag | 0;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Replacements.AstPass.CollectionKind",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Seq"], ["List"], ["Array"]]
      };
    }

    Equals(other) {
      return this.tag === other.tag;
    }

    CompareTo(other) {
      return comparePrimitives(this.tag, other.tag);
    }

  };
  setType("Fable.Replacements.AstPass.CollectionKind", CollectionKind);
  const implementedSeqNonBuildFunctions = __exports.implementedSeqNonBuildFunctions = create(ofArray(["average", "averageBy", "compareWith", "empty", "exactlyOne", "exists", "exists2", "fold", "fold2", "foldBack", "foldBack2", "forAll", "forAll2", "head", "tryHead", "item", "tryItem", "iterate", "iterateIndexed", "iterate2", "iterateIndexed2", "isEmpty", "last", "tryLast", "length", "mapFold", "mapFoldBack", "max", "maxBy", "min", "minBy", "reduce", "reduceBack", "sum", "sumBy", "tail", "toList", "tryFind", "find", "tryFindIndex", "findIndex", "tryPick", "pick", "tryFindBack", "findBack", "tryFindIndexBack", "findIndexBack"]), new Comparer(comparePrimitives));
  const implementedSeqBuildFunctions = __exports.implementedSeqBuildFunctions = create(ofArray(["append", "choose", "collect", "concat", "countBy", "distinct", "distinctBy", "except", "filter", "where", "groupBy", "initialize", "map", "mapIndexed", "indexed", "map2", "mapIndexed2", "map3", "ofArray", "pairwise", "permute", "replicate", "reverse", "scan", "scanBack", "singleton", "skip", "skipWhile", "take", "takeWhile", "sortWith", "unfold", "zip", "zip3"]), new Comparer(comparePrimitives));
  const seqFunctionsImplementedOutside = __exports.seqFunctionsImplementedOutside = create_1(ofArray([["Map", ofArray(["groupBy", "countBy"])], ["Set", ofArray(["distinct", "distinctBy"])]]), new Comparer(comparePrimitives));
  const implementedListFunctions = __exports.implementedListFunctions = create(ofArray(["append", "choose", "collect", "concat", "filter", "groupBy", "where", "initialize", "map", "mapIndexed", "indexed", "ofArray", "partition", "replicate", "reverse", "singleton", "unzip", "unzip3"]), new Comparer(comparePrimitives));
  const implementedArrayFunctions = __exports.implementedArrayFunctions = create(ofArray(["chunkBySize", "copyTo", "partition", "permute", "sortInPlaceBy", "unzip", "unzip3"]), new Comparer(comparePrimitives));
  const nativeArrayFunctions = __exports.nativeArrayFunctions = new Map(ofArray([["exists", "some"], ["filter", "filter"], ["find", "find"], ["findIndex", "findIndex"], ["forAll", "every"], ["iterate", "forEach"], ["reduce", "reduce"], ["reduceBack", "reduceRight"], ["sortInPlace", "sort"], ["sortInPlaceWith", "sort"]]));

  const collectionsSecondPass = __exports.collectionsSecondPass = function (com, i, kind) {
    var patternInput_1;
    var patternInput_3;
    var seqMeth;

    const prop = function (meth, callee) {
      return makeGet(i.range, i.returnType, callee, makeStrConst(meth));
    };

    const icall_1 = function (meth_1, tupledArg) {
      return makeCall(i.range, i.returnType, new CallKind(0, [tupledArg[0], meth_1, tupledArg[1]]));
    };

    const ccall_1 = function (modName, meth_2, args) {
      return makeCall(i.range, i.returnType, new CallKind(2, [modName, meth_2, false, args]));
    };

    const patternInput = [i.methodName, i.callee, i.args];
    const $var123 = patternInput[0] === "cast" ? [0] : patternInput[0] === "cache" ? [1] : patternInput[0] === "isEmpty" ? [2] : patternInput[0] === "head" ? [3] : patternInput[0] === "tail" ? [3] : patternInput[0] === "length" ? [3] : patternInput[0] === "count" ? [3] : patternInput[0] === "item" ? [4] : patternInput[0] === "sort" ? [5] : patternInput[0] === "sortDescending" ? [5] : patternInput[0] === "sortBy" ? [5] : patternInput[0] === "sortByDescending" ? [5] : patternInput[0] === "splitAt" ? [6] : patternInput[0] === "empty" ? [7] : patternInput[0] === "cons" ? [7] : patternInput[0] === "zeroCreate" ? [8] : patternInput[0] === "create" ? [9] : patternInput[0] === ".ctor" ? [10] : patternInput[0] === "find" ? patternInput[1] != null ? [11] : [12] : [12];

    switch ($var123[0]) {
      case 0:
        return i.args.head;

      case 1:
        return Util.toArray(com, i, patternInput[2].head);

      case 2:
        return kind.tag === 2 ? makeEqOp(i.range, ofArray([prop("length", patternInput[2].head), makeIntConst(0)]), new BinaryOperator(2)) : kind.tag === 1 ? (patternInput_1 = Util.instanceArgs(patternInput[1], patternInput[2]), makeEqOp(i.range, ofArray([prop("tail", patternInput_1[0]), new Expr(0, new ValueKind(0))]), new BinaryOperator(0))) : ccall_1("Seq", patternInput[0], patternInput[2]);

      case 3:
        const meth_3 = patternInput[0] === "count" ? "length" : patternInput[0];
        return kind.tag === 1 ? (() => {
          const $var124 = meth_3 === "head" ? [0] : meth_3 === "tail" ? [0] : [1];

          switch ($var124[0]) {
            case 0:
              const matchValue = [patternInput[1], patternInput[2]];
              const $var125 = matchValue[0] != null ? [0, getValue(matchValue[0])] : matchValue[1].tail != null ? matchValue[1].tail.tail == null ? [1] : [2] : [2];

              switch ($var125[0]) {
                case 0:
                  return ccall_1("List", meth_3, ofArray([$var125[1]]));

                case 1:
                  return ccall_1("List", meth_3, patternInput[2]);

                case 2:
                  return addErrorAndReturnNull(com, i.fileName, i.range, "WTF?");
              }

            case 1:
              const patternInput_2 = Util.instanceArgs(patternInput[1], patternInput[2]);
              return prop(meth_3, patternInput_2[0]);
          }
        })() : kind.tag === 2 ? (patternInput_3 = Util.instanceArgs(patternInput[1], patternInput[2]), meth_3 === "head" ? makeGet(i.range, i.returnType, patternInput_3[0], makeIntConst(0)) : meth_3 === "tail" ? icall_1("slice", [patternInput_3[0], ofArray([makeIntConst(1)])]) : prop("length", patternInput_3[0])) : (seqMeth = meth_3 === "length" ? "count" : meth_3, ccall_1("Seq", seqMeth, Util.staticArgs(patternInput[1], patternInput[2])));

      case 4:
        return (() => {
          const matchValue_1 = [i.callee, kind];
          const $var126 = matchValue_1[0] != null ? matchValue_1[1].tag === 0 ? [1] : matchValue_1[1].tag === 1 ? [3] : [0, getValue(matchValue_1[0])] : matchValue_1[1].tag === 2 ? [2] : matchValue_1[1].tag === 1 ? [3] : [1];

          switch ($var126[0]) {
            case 0:
              if (i.args.length === 1) {
                return makeGet(i.range, i.returnType, $var126[1], i.args.head);
              } else {
                return new Expr(9, [getValue(i.callee), i.args.head, i.args.tail.head, i.range]);
              }

            case 1:
              return ccall_1("Seq", patternInput[0], patternInput[2]);

            case 2:
              return makeGet(i.range, i.returnType, patternInput[2].tail.head, patternInput[2].head);

            case 3:
              return CurriedLambda(ccall_1)("Seq", patternInput[0])(i.callee == null ? i.args : append(i.args, ofArray([getValue(i.callee)])));
          }
        })();

      case 5:
        const patternInput_4 = (patternInput[0] === "sortBy" ? true : patternInput[0] === "sortByDescending") ? [patternInput[2].head, patternInput[2].tail] : [null, patternInput[2]];
        let compareFn;
        const fnArgs = ofArray([makeIdent(com.GetUniqueVar()), makeIdent(com.GetUniqueVar())]);

        const identValue = function (x) {
          const x_1 = new Expr(0, new ValueKind(5, x));

          if (patternInput_4[0] == null) {
            return x_1;
          } else {
            return new Expr(3, [getValue(patternInput_4[0]), ofArray([x_1]), new ApplyKind(0), new Type(1), null]);
          }
        };

        let comparison_1;
        const comparison = Util.compare(com, null, map(identValue, fnArgs), null);

        if (patternInput[0] === "sortDescending" ? true : patternInput[0] === "sortByDescending") {
          comparison_1 = makeUnOp(null, new Type(6, new NumberKind(4)), ofArray([comparison]), new UnaryOperator(0));
        } else {
          comparison_1 = comparison;
        }

        compareFn = makeLambdaExpr(fnArgs, comparison_1);
        const matchValue_2 = [patternInput[1], kind];

        if (matchValue_2[0] == null) {
          if (matchValue_2[1].tag === 1) {
            return function (expr) {
              return Util.toList(com, i, expr);
            }(ccall_1("Seq", "sortWith", new List_1(compareFn, patternInput_4[1])));
          } else if (matchValue_2[1].tag === 2) {
            return function (expr_1) {
              return Util.toArray(com, i, expr_1);
            }(ccall_1("Seq", "sortWith", new List_1(compareFn, patternInput_4[1])));
          } else {
            return ccall_1("Seq", "sortWith", new List_1(compareFn, patternInput_4[1]));
          }
        } else {
          const c = getValue(matchValue_2[0]);
          let $var127;

          if (patternInput_4[1].tail != null) {
            const activePatternResult60604 = Util["|Type|"](patternInput_4[1].head);

            if (activePatternResult60604.tag === 11) {
              if (patternInput_4[1].tail.tail == null) {
                $var127 = [1];
              } else {
                $var127 = [2];
              }
            } else {
              $var127 = [2];
            }
          } else {
            $var127 = [0];
          }

          switch ($var127[0]) {
            case 0:
              return icall_1("sort", [c, ofArray([compareFn])]);

            case 1:
              return icall_1("sort", [c, patternInput_4[1]]);

            case 2:
              return null;
          }
        }

      case 6:
        if (kind.tag === 1) {
          return ccall_1("List", patternInput[0], patternInput[2]);
        } else if (kind.tag === 2) {
          return ccall_1("Array", patternInput[0], patternInput[2]);
        } else {
          return null;
        }

      case 7:
        return kind.tag === 2 ? i.returnType.tag === 9 ? new Expr(0, new ValueKind(11, [new ArrayConsKind(1, makeIntConst(0)), i.returnType.data])) : (() => {
          throw new Error(attachRange(i.range, "Expecting array type but got " + i.returnType.FullName));
        })() : kind.tag === 1 ? makeCall(i.range, i.returnType, new CallKind(2, ["List", null, true, patternInput[2]])) : ccall_1("Seq", patternInput[0], patternInput[2]);

      case 8:
        const matchValue_3 = Util.genArg(i.returnType);

        if (matchValue_3.tag === 6) {
          return new Expr(0, new ValueKind(11, [new ArrayConsKind(1, i.args.head), matchValue_3]));
        } else if (matchValue_3.tag === 3) {
          return Util.emit(i, "new Array($0).fill(false)", i.args);
        } else {
          return Util.emit(i, "new Array($0).fill(null)", i.args);
        }

      case 9:
        return function (expr_2) {
          return Util.toArray(com, i, expr_2);
        }(ccall_1("Seq", "replicate", patternInput[2]));

      case 10:
        const makeJsArray = function (arVals) {
          const ar = new Expr(0, new ValueKind(11, [new ArrayConsKind(0, arVals), new Type(1)]));
          return new Expr(13, [ar, i.returnType]);
        };

        if (i.args.tail == null) {
          return makeJsArray(new List_1());
        } else {
          const matchValue_4 = i.args.head;
          let $var128;
          const activePatternResult60620 = Util["|Type|"](matchValue_4);

          if (activePatternResult60620.tag === 6) {
            if (activePatternResult60620.data.tag === 4) {
              $var128 = [0];
            } else if (matchValue_4.tag === 0) {
              if (matchValue_4.data.tag === 11) {
                if (matchValue_4.data.data[0].tag === 0) {
                  $var128 = [1, matchValue_4.data.data[0].data];
                } else {
                  $var128 = [2];
                }
              } else {
                $var128 = [2];
              }
            } else {
              $var128 = [2];
            }
          } else if (matchValue_4.tag === 0) {
            if (matchValue_4.data.tag === 11) {
              if (matchValue_4.data.data[0].tag === 0) {
                $var128 = [1, matchValue_4.data.data[0].data];
              } else {
                $var128 = [2];
              }
            } else {
              $var128 = [2];
            }
          } else {
            $var128 = [2];
          }

          switch ($var128[0]) {
            case 0:
              return makeJsArray(new List_1());

            case 1:
              return makeJsArray($var128[1]);

            case 2:
              return Util.emit(i, "Array.from($0)", i.args);
          }
        }

      case 11:
        const defaultValue = Util.defaultof(i.calleeTypeArgs.head);
        return ccall_1("Option", "getValue", ofArray([ccall_1("Seq", "tryFind", ofArray([patternInput[2].head, getValue(patternInput[1]), defaultValue])), new Expr(0, new ValueKind(9, true))]));

      case 12:
        const $var129 = patternInput[0] === "findAll" ? patternInput[1] != null ? [0] : [1] : [1];

        switch ($var129[0]) {
          case 0:
            return function (expr_3) {
              return Util.toArray(com, i, expr_3);
            }(ccall_1("Seq", "filter", ofArray([patternInput[2].head, getValue(patternInput[1])])));

          case 1:
            const $var130 = patternInput[0] === "findLast" ? patternInput[1] != null ? [0] : [1] : [1];

            switch ($var130[0]) {
              case 0:
                const defaultValue_1 = Util.defaultof(i.calleeTypeArgs.head);
                return ccall_1("Option", "getValue", ofArray([ccall_1("Seq", "tryFindBack", ofArray([patternInput[2].head, getValue(patternInput[1]), defaultValue_1])), new Expr(0, new ValueKind(9, true))]));

              case 1:
                const $var131 = patternInput[0] === "add" ? [0] : patternInput[0] === "addRange" ? [1] : patternInput[0] === "clear" ? [2] : patternInput[0] === "contains" ? [3] : patternInput[0] === "indexOf" ? [4] : patternInput[0] === "insert" ? [5] : patternInput[0] === "remove" ? [6] : patternInput[0] === "removeRange" ? [7] : patternInput[0] === "removeAt" ? [8] : patternInput[0] === "reverse" ? kind.Equals(new CollectionKind(2)) ? [9] : [10] : [10];

                switch ($var131[0]) {
                  case 0:
                    return icall_1("push", [getValue(patternInput[1]), patternInput[2]]);

                  case 1:
                    return ccall_1("Array", "addRangeInPlace", ofArray([patternInput[2].head, getValue(patternInput[1])]));

                  case 2:
                    return ccall_1("Util", "clear", ofArray([getValue(patternInput[1])]));

                  case 3:
                    const matchValue_5 = [patternInput[1], patternInput[2]];
                    const $var132 = matchValue_5[0] == null ? matchValue_5[1].tail != null ? matchValue_5[1].tail.tail != null ? matchValue_5[1].tail.tail.tail == null ? [1, matchValue_5[1].head, matchValue_5[1].tail.head] : [2] : [2] : [2] : [0, matchValue_5[1], getValue(matchValue_5[0])];

                    switch ($var132[0]) {
                      case 0:
                        return Util.emit(i, "$0.indexOf($1) > -1", new List_1($var132[2], $var132[1]));

                      case 1:
                        const f = Util.wrapInLambda(ofArray([makeIdent(com.GetUniqueVar())]), function (exprs) {
                          return makeCall(null, new Type(3), new CallKind(2, ["Util", "equals", false, new List_1($var132[1], exprs)]));
                        });
                        return ccall_1("Seq", "exists", ofArray([f, $var132[2]]));

                      case 2:
                        return null;
                    }

                  case 4:
                    return icall_1("indexOf", [getValue(patternInput[1]), patternInput[2]]);

                  case 5:
                    return icall_1("splice", [getValue(patternInput[1]), ofArray([patternInput[2].head, makeIntConst(0), patternInput[2].tail.head])]);

                  case 6:
                    return ccall_1("Array", "removeInPlace", ofArray([patternInput[2].head, getValue(patternInput[1])]));

                  case 7:
                    return icall_1("splice", [getValue(patternInput[1]), patternInput[2]]);

                  case 8:
                    return icall_1("splice", [getValue(patternInput[1]), ofArray([patternInput[2].head, makeIntConst(1)])]);

                  case 9:
                    if (i.returnType.tag === 9) {
                      return Util.emit(i, "$0.slice().reverse()", i.args);
                    } else {
                      return icall_1("reverse", Util.instanceArgs(patternInput[1], i.args));
                    }

                  case 10:
                    let $var133;

                    if (patternInput[0] === "toSeq") {
                      $var133 = [0];
                    } else if (patternInput[0] === "ofSeq") {
                      $var133 = [0];
                    } else if (patternInput[0] === "toArray") {
                      $var133 = [1];
                    } else if (patternInput[0] === "ofList") {
                      $var133 = [2];
                    } else if (patternInput[0] === "sum") {
                      $var133 = [3];
                    } else if (patternInput[0] === "sumBy") {
                      $var133 = [3];
                    } else if (patternInput[0] === "min") {
                      $var133 = [4];
                    } else if (patternInput[0] === "minBy") {
                      $var133 = [4];
                    } else if (patternInput[0] === "max") {
                      $var133 = [4];
                    } else if (patternInput[0] === "maxBy") {
                      $var133 = [4];
                    } else {
                      const activePatternResult60656 = Patterns["|SetContains|_|"](implementedSeqNonBuildFunctions, patternInput[0]);

                      if (activePatternResult60656 != null) {
                        $var133 = [5, getValue(activePatternResult60656)];
                      } else {
                        $var133 = [6];
                      }
                    }

                    switch ($var133[0]) {
                      case 0:
                        return kind.tag === 1 ? ccall_1("Seq", patternInput[0] === "toSeq" ? "ofList" : "toList", patternInput[2]) : kind.tag === 2 ? patternInput[0] === "toSeq" ? ccall_1("Seq", "ofArray", patternInput[2]) : Util.toArray(com, i, patternInput[2].head) : (() => {
                          throw new Error(attachRange(i.range, "Unexpected method called on seq: " + patternInput[0]));
                        })();

                      case 1:
                        return patternInput[1] == null ? Util.toArray(com, i, i.args.head) : Util.toArray(com, i, getValue(patternInput[1]));

                      case 2:
                        return kind.tag === 0 ? ccall_1("Seq", "ofList", patternInput[2]) : kind.tag === 2 ? Util.toArray(com, i, i.args.head) : (() => {
                          throw new Error(attachRange(i.range, "Unexpected method called on list: " + patternInput[0]));
                        })();

                      case 3:
                        switch (i.returnType.tag) {
                          case 3:
                          case 4:
                          case 5:
                          case 6:
                          case 13:
                            return ccall_1("Seq", patternInput[0], patternInput[2]);

                          default:
                            const zero = Util.getZero(i.returnType);
                            const fargs = ofArray([makeTypedIdent(com.GetUniqueVar(), i.returnType), makeTypedIdent(com.GetUniqueVar(), i.returnType)]);
                            const addFn = Util.wrapInLambda(fargs, function (args_1) {
                              return Util.applyOp(null, new Type(1), args_1, "op_Addition");
                            });
                            return function (tupledArg_1) {
                              return ccall_1("Seq", "fold", ofArray([tupledArg_1[0], zero, tupledArg_1[1]]));
                            }(patternInput[0] === "sum" ? [addFn, patternInput[2].head] : [Util.emitNoInfo("((f,add)=>(x,y)=>add(x,f(y)))($0,$1)", ofArray([patternInput[2].head, addFn])), patternInput[2].tail.head]);
                        }

                      case 4:
                        const reduce = function (macro, macroArgs, xs) {
                          return ccall_1("Seq", "reduce", ofArray([Util.emitNoInfo(macro, macroArgs), xs]));
                        };

                        const matchValue_6 = [patternInput[0], i.methodTypeArgs];
                        const $var134 = matchValue_6[0] === "min" ? matchValue_6[1].tail != null ? matchValue_6[1].head.tag === 6 ? matchValue_6[1].tail.tail == null ? [0] : [4] : [4] : [4] : matchValue_6[0] === "max" ? matchValue_6[1].tail != null ? matchValue_6[1].head.tag === 6 ? matchValue_6[1].tail.tail == null ? [1] : [4] : [4] : [4] : matchValue_6[0] === "minBy" ? matchValue_6[1].tail != null ? matchValue_6[1].tail.tail != null ? matchValue_6[1].tail.head.tag === 6 ? matchValue_6[1].tail.tail.tail == null ? [2] : [4] : [4] : [4] : [4] : matchValue_6[0] === "maxBy" ? matchValue_6[1].tail != null ? matchValue_6[1].tail.tail != null ? matchValue_6[1].tail.head.tag === 6 ? matchValue_6[1].tail.tail.tail == null ? [3] : [4] : [4] : [4] : [4] : [4];

                        switch ($var134[0]) {
                          case 0:
                            return reduce("(x,y) => Math.min(x,y)", new List_1(), patternInput[2].head);

                          case 1:
                            return reduce("(x,y) => Math.max(x,y)", new List_1(), patternInput[2].head);

                          case 2:
                            return reduce("(f=>(x,y)=>f(x)<f(y)?x:y)($0)", ofArray([patternInput[2].head]), patternInput[2].tail.head);

                          case 3:
                            return reduce("(f=>(x,y)=>f(x)>f(y)?x:y)($0)", ofArray([patternInput[2].head]), patternInput[2].tail.head);

                          case 4:
                            return ccall_1("Seq", patternInput[0], patternInput[2]);
                        }

                      case 5:
                        let args_2;
                        const matchValue_7 = [$var133[1], kind];
                        const $var135 = matchValue_7[0] === "mapFold" ? matchValue_7[1].tag === 1 ? [0] : [1] : matchValue_7[0] === "mapFoldBack" ? matchValue_7[1].tag === 1 ? [0] : [1] : [1];

                        switch ($var135[0]) {
                          case 0:
                            args_2 = append(patternInput[2], ofArray([makeCoreRef("List", "ofArray")]));
                            break;

                          case 1:
                            args_2 = patternInput[2];
                            break;
                        }

                        return ccall_1("Seq", $var133[1], args_2);

                      case 6:
                        const activePatternResult60654 = Patterns["|SetContains|_|"](implementedSeqBuildFunctions, patternInput[0]);

                        if (activePatternResult60654 != null) {
                          const mod_ = CurriedLambda(function (arg, defaultValue_2) {
                            return arg != null ? arg : defaultValue_2;
                          })(tryFindKey(function (_arg1, v) {
                            return exists($var136 => equals_1(getValue(activePatternResult60654), $var136), v);
                          }, seqFunctionsImplementedOutside))("Seq");
                          return kind.tag === 1 ? function (expr_4) {
                            return Util.toList(com, i, expr_4);
                          }(ccall_1(mod_, getValue(activePatternResult60654), patternInput[2])) : kind.tag === 2 ? function (expr_5) {
                            return Util.toArray(com, i, expr_5);
                          }(ccall_1(mod_, getValue(activePatternResult60654), patternInput[2])) : ccall_1(mod_, getValue(activePatternResult60654), patternInput[2]);
                        } else {
                          return null;
                        }

                    }

                }

            }

        }

    }
  };

  const collectionsFirstPass = __exports.collectionsFirstPass = function (com, i, kind) {
    const icall_1 = function (meth, tupledArg) {
      return makeCall(i.range, i.returnType, new CallKind(0, [tupledArg[0], meth, tupledArg[1]]));
    };

    return function (_arg1) {
      return _arg1 == null ? collectionsSecondPass(com, i, kind) : _arg1;
    }(kind.tag === 1 ? (() => {
      const listMeth = function (meth_1, args) {
        return makeCall(i.range, i.returnType, new CallKind(2, ["List", meth_1, false, args]));
      };

      if (i.methodName === "getSlice") {
        return listMeth("slice", append(i.args, ofArray([getValue(i.callee)])));
      } else if (i.methodName === "truncate") {
        const $var137 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [0, i.args.head, i.args.tail.head] : [1] : [1] : [1];

        switch ($var137[0]) {
          case 0:
            const arg1 = makeBinOp(null, new Type(6, new NumberKind(4)), ofArray([$var137[1], makeIntConst(1)]), new BinaryOperator(11));
            return listMeth("slice", ofArray([makeIntConst(0), arg1, $var137[2]]));

          case 1:
            return null;
        }
      } else {
        const activePatternResult60667 = Patterns["|SetContains|_|"](implementedListFunctions, i.methodName);

        if (activePatternResult60667 != null) {
          return listMeth(getValue(activePatternResult60667), i.args);
        } else if (i.callee != null) {
          if (i.methodName === "equals") {
            return icall_1("Equals", [getValue(i.callee), i.args]);
          } else if (i.methodName === "compareTo") {
            return icall_1("CompareTo", [getValue(i.callee), i.args]);
          } else if (i.methodName === "getHashCode") {
            return null;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    })() : kind.tag === 2 ? (() => {
      var numberKind;
      let $var138;

      if (i.methodName === "get") {
        $var138 = [0];
      } else if (i.methodName === "set") {
        $var138 = [1];
      } else if (i.methodName === "take") {
        $var138 = [2];
      } else if (i.methodName === "skip") {
        $var138 = [3];
      } else if (i.methodName === "copy") {
        $var138 = [4];
      } else if (i.methodName === "getSubArray") {
        $var138 = [5];
      } else if (i.methodName === "fill") {
        $var138 = [5];
      } else if (i.methodName === "truncate") {
        $var138 = [6];
      } else if (i.methodName === "map") {
        $var138 = [7];
      } else if (i.methodName === "mapIndexed") {
        $var138 = [7];
      } else if (i.methodName === "indexed") {
        $var138 = [8];
      } else if (i.methodName === "append") {
        $var138 = [9];
      } else {
        const activePatternResult60681 = Patterns["|SetContains|_|"](implementedArrayFunctions, i.methodName);

        if (activePatternResult60681 != null) {
          $var138 = [10, getValue(activePatternResult60681)];
        } else {
          $var138 = [11];
        }
      }

      switch ($var138[0]) {
        case 0:
          const matchValue = [i.callee, i.args];
          const activePatternResult60669 = Util["|TwoArgs|_|"](matchValue[0], matchValue[1]);

          if (activePatternResult60669 != null) {
            return makeGet(i.range, i.returnType, getValue(activePatternResult60669)[0], getValue(activePatternResult60669)[1]);
          } else {
            return null;
          }

        case 1:
          const matchValue_1 = [i.callee, i.args];
          const activePatternResult60671 = Util["|ThreeArgs|_|"](matchValue_1[0], matchValue_1[1]);

          if (activePatternResult60671 != null) {
            return new Expr(9, [getValue(activePatternResult60671)[0], getValue(activePatternResult60671)[1], getValue(activePatternResult60671)[2], i.range]);
          } else {
            return null;
          }

        case 2:
          return icall_1("slice", [i.args.tail.head, ofArray([makeIntConst(0), i.args.head])]);

        case 3:
          return icall_1("slice", [i.args.tail.head, ofArray([i.args.head])]);

        case 4:
          return icall_1("slice", [i.args.head, new List_1()]);

        case 5:
          return Util.ccall(i, "Array", i.methodName, i.args);

        case 6:
          return Util.emit(i, "$1.slice(0, $0)", i.args);

        case 7:
          let arrayCons;
          const $var139 = i.returnType.tag === 9 ? i.returnType.data.tag === 6 ? (numberKind = i.returnType.data.data, com.Options.typedArrays) ? [0, i.returnType.data.data] : [1] : [1] : [1];

          switch ($var139[0]) {
            case 0:
              arrayCons = getTypedArrayName(com, $var139[1]);
              break;

            case 1:
              arrayCons = "Array";
              break;
          }

          return Util.ccall(i, "Array", i.methodName, append(i.args, ofArray([makeIdentExpr(arrayCons)])));

        case 8:
          return Util.ccall(i, "Array", i.methodName, i.args);

        case 9:
          let $var140;

          if (i.methodTypeArgs.tail != null) {
            if (i.methodTypeArgs.head.tag === 1) {
              if (i.methodTypeArgs.tail.tail == null) {
                $var140 = [0];
              } else {
                $var140 = [1];
              }
            } else {
              const activePatternResult60676 = Util["|Number|ExtNumber|NoNumber|"](i.methodTypeArgs.head);

              if (activePatternResult60676.tag === 0) {
                if (i.methodTypeArgs.tail.tail == null) {
                  $var140 = [0];
                } else {
                  $var140 = [1];
                }
              } else {
                $var140 = [1];
              }
            }
          } else {
            $var140 = [1];
          }

          switch ($var140[0]) {
            case 0:
              return null;

            case 1:
              return icall_1("concat", [i.args.head, i.args.tail]);
          }

        case 10:
          return makeCall(i.range, i.returnType, new CallKind(2, ["Array", $var138[1], false, i.args]));

        case 11:
          const activePatternResult60679 = function (key) {
            return Patterns["|DicContains|_|"](nativeArrayFunctions, key);
          }(i.methodName);

          if (activePatternResult60679 != null) {
            const revArgs = reverse(i.args);
            return icall_1(getValue(activePatternResult60679), [revArgs.head, reverse(revArgs.tail)]);
          } else {
            return null;
          }

      }
    })() : null);
  };

  const exceptions = __exports.exceptions = function (com, i) {
    const matchValue = [i.methodName, i.callee];
    const $var141 = matchValue[0] === ".ctor" ? [0] : matchValue[0] === "message" ? matchValue[1] != null ? [1] : [3] : matchValue[0] === "stackTrace" ? matchValue[1] != null ? [2] : [3] : [3];

    switch ($var141[0]) {
      case 0:
        return new Expr(3, [makeIdentExpr("Error"), i.args, new ApplyKind(2), i.returnType, i.range]);

      case 1:
        const e = getValue(matchValue[1]);
        return Util.getProp(i.range, i.returnType, e, "message");

      case 2:
        const e_1 = getValue(matchValue[1]);
        return Util.getProp(i.range, i.returnType, e_1, "stack");

      case 3:
        return null;
    }
  };

  const cancels = __exports.cancels = function (com, i) {
    switch (i.methodName) {
      case ".ctor":
        return Util.ccall(i, "Async", "createCancellationToken", i.args);

      case "token":
        return i.callee;

      case "cancel":
      case "cancelAfter":
      case "isCancellationRequested":
        return function (args) {
          return Util.ccall(i, "Async", i.methodName, args);
        }(i.callee == null ? i.args : new List_1(getValue(i.callee), i.args));

      case "dispose":
        return new Expr(0, new ValueKind(0));

      default:
        return null;
    }
  };

  const objects = __exports.objects = function (com, i) {
    switch (i.methodName) {
      case "getHashCode":
        return Util.ccall(i, "Util", "getHashCode", ofArray([getValue(i.callee)]));

      case ".ctor":
        return new Expr(1, [new List_1(), new List_1(), null, i.range]);

      case "referenceEquals":
        return makeEqOp(i.range, i.args, new BinaryOperator(2));

      case "toString":
        return Util.ccall(i, "Util", "toString", ofArray([getValue(i.callee)]));

      case "equals":
        return function (args) {
          return Util.equals(true, com, i, args);
        }(Util.staticArgs(i.callee, i.args));

      case "getType":
        const matchValue = getValue(i.callee).Type;
        const $var142 = matchValue.tag === 1 ? [0] : matchValue.tag === 12 ? [0] : [1];

        switch ($var142[0]) {
          case 0:
            (function (warning) {
              addWarning(com, i.fileName, i.range, warning);
            })(toText(printf("%s %s"))("Cannot resolve .GetType() at compile time.", "The type created at runtime won't contain generic information."));

            return makeCall(i.range, i.returnType, new CallKind(2, ["Reflection", "getType", false, ofArray([getValue(i.callee)])]));

          case 1:
            const genInfo = new GenericInfo(true, false);
            return makeTypeRef(com, genInfo, matchValue);
        }

      default:
        return null;
    }
  };

  const types = __exports.types = function (com, info) {
    const str = function (x) {
      return new Expr(0, new ValueKind(8, x));
    };

    const common = function (com_1, info_1) {
      if (info_1.methodName === "getTypeInfo") {
        return info_1.callee;
      } else if (info_1.methodName === "genericTypeArguments") {
        return Util.ccall(info_1, "Reflection", "getGenericArguments", ofArray([getValue(info_1.callee)]));
      } else {
        return null;
      }
    };

    const $var143 = info.callee != null ? getValue(info.callee).tag === 0 ? getValue(info.callee).data.tag === 4 ? [0, getValue(info.callee).data.data[0]] : [1] : [1] : [1];

    switch ($var143[0]) {
      case 0:
        switch (info.methodName) {
          case "namespace":
            return str($var143[1].Namespace);

          case "fullName":
            return str($var143[1].FullName);

          case "name":
            return str($var143[1].Name);

          case "isGenericType":
            return makeBoolConst($var143[1].GenericParameters.length > 0);

          case "getGenericTypeDefinition":
            return makeTypeRefFrom(com, $var143[1]);

          case "makeGenericType":
            if (!List.sameLength($var143[1].GenericParameters, info.args)) {
              return function (error) {
                return addErrorAndReturnNull(com, info.fileName, info.range, error);
              }("Arguments have different length than generic parameters");
            } else {
              const genArgs2 = makeJsObject(null, toList_1(zip($var143[1].GenericParameters, info.args)));
              return makeCall(null, new Type(0), new CallKind(2, ["Util", "makeGeneric", false, ofArray([getValue(info.callee), genArgs2])]));
            }

          default:
            return common(com, info);
        }

      case 1:
        const getTypeFullName = function (args) {
          return defaultArg(args, null, function (args_1) {
            return makeCall(info.range, info.returnType, new CallKind(2, ["Reflection", "getTypeFullName", false, args_1]));
          });
        };

        switch (info.methodName) {
          case "fullName":
            return getTypeFullName(ofArray([getValue(info.callee)]));

          case "name":
            return getTypeFullName(ofArray([getValue(info.callee), str("name")]));

          case "namespace":
            return getTypeFullName(ofArray([getValue(info.callee), str("namespace")]));

          case "isGenericType":
            return makeCall(info.range, info.returnType, new CallKind(2, ["Util", "isGeneric", false, ofArray([getValue(info.callee)])]));

          case "getGenericTypeDefinition":
            return makeCall(info.range, info.returnType, new CallKind(2, ["Util", "getDefinition", false, ofArray([getValue(info.callee)])]));

          case "makeGenericType":
            return function (error_1) {
              return addErrorAndReturnNull(com, info.fileName, info.range, error_1);
            }("MakeGenericType won't work if type is not known at compile-time");

          default:
            return common(com, info);
        }

    }
  };

  const unchecked = __exports.unchecked = function (com, info) {
    switch (info.methodName) {
      case "defaultOf":
        return Util.defaultof(info.methodTypeArgs.head);

      case "hash":
        return makeCall(info.range, info.returnType, new CallKind(2, ["Util", "hash", false, info.args]));

      case "equals":
        return makeCall(info.range, info.returnType, new CallKind(2, ["Util", "equals", false, info.args]));

      case "compare":
        return makeCall(info.range, info.returnType, new CallKind(2, ["Util", "compare", false, info.args]));

      default:
        return null;
    }
  };

  const random = __exports.random = function (com, info) {
    if (info.methodName === ".ctor") {
      const o = new Expr(1, [new List_1(), new List_1(), null, info.range]);
      return new Expr(13, [o, info.returnType]);
    } else if (info.methodName === "next") {
      let patternInput;

      if (info.args.tail != null) {
        if (info.args.tail.tail != null) {
          if (info.args.tail.tail.tail == null) {
            patternInput = [info.args.head, info.args.tail.head];
          } else {
            throw new Error("Unexpected arg count for Random.Next");
          }
        } else {
          patternInput = [makeIntConst(0), info.args.head];
        }
      } else {
        patternInput = [makeIntConst(0), makeIntConst(2147483647)];
      }

      return Util.ccall(info, "Util", "randomNext", ofArray([patternInput[0], patternInput[1]]));
    } else if (info.methodName === "nextDouble") {
      return makeCall(info.range, info.returnType, new CallKind(3, ["Math", "random", false, new List_1()]));
    } else {
      return null;
    }
  };

  const enumerable = __exports.enumerable = function (com, info) {
    const matchValue = [info.callee, info.methodName];
    const $var144 = matchValue[0] != null ? matchValue[1] === "getEnumerator" ? [0, getValue(matchValue[0])] : [1] : [1];

    switch ($var144[0]) {
      case 0:
        return Util.ccall(info, "Seq", "getEnumerator", ofArray([$var144[1]]));

      case 1:
        return null;
    }
  };

  const mailbox = __exports.mailbox = function (com, info) {
    if (info.callee != null) {
      switch (info.methodName) {
        case "start":
        case "receive":
        case "postAndAsyncReply":
        case "post":
        case "reply":
          return makeCall(info.range, info.returnType, new CallKind(0, [getValue(info.callee), info.methodName, info.args]));

        default:
          return null;
      }
    } else {
      return defaultArg(info.methodName === ".ctor" ? new CallKind(2, ["MailboxProcessor", null, true, info.args]) : info.methodName === "start" ? new CallKind(2, ["MailboxProcessor", "start", false, info.args]) : null, null, function (kind) {
        return makeCall(info.range, info.returnType, kind);
      });
    }
  };

  const guids = __exports.guids = function (com, info) {
    switch (info.methodName) {
      case "newGuid":
        return makeCall(info.range, info.returnType, new CallKind(2, ["String", "newGuid", false, new List_1()]));

      case "parse":
        return Util.ccall(info, "String", "validateGuid", info.args);

      case "tryParse":
        return Util.ccall(info, "String", "validateGuid", ofArray([info.args.head, makeBoolConst(true)]));

      case "toByteArray":
        return Util.ccall(info, "String", "guidToArray", ofArray([getValue(info.callee)]));

      case ".ctor":
        let $var145;

        if (info.args.tail != null) {
          const activePatternResult60756 = Util["|Type|"](info.args.head);

          if (activePatternResult60756.tag === 9) {
            if (info.args.tail.tail == null) {
              $var145 = [1];
            } else {
              $var145 = [3];
            }
          } else if (activePatternResult60756.tag === 5) {
            if (info.args.tail.tail == null) {
              $var145 = [2, info.args.head];
            } else {
              $var145 = [3];
            }
          } else {
            $var145 = [3];
          }
        } else {
          $var145 = [0];
        }

        switch ($var145[0]) {
          case 0:
            return new Expr(13, [makeStrConst("00000000-0000-0000-0000-000000000000"), info.returnType]);

          case 1:
            return Util.ccall(info, "String", "arrayToGuid", info.args);

          case 2:
            return Util.ccall(info, "String", "validateGuid", info.args);

          case 3:
            return null;
        }

      default:
        return null;
    }
  };

  const uris = __exports.uris = function (com, info) {
    if (info.methodName === "unescapeDataString") {
      return makeCall(info.range, info.returnType, new CallKind(2, ["Util", "unescapeDataString", false, info.args]));
    } else if (info.methodName === "escapeDataString") {
      return makeCall(info.range, info.returnType, new CallKind(2, ["Util", "escapeDataString", false, info.args]));
    } else if (info.methodName === "escapeUriString") {
      return makeCall(info.range, info.returnType, new CallKind(2, ["Util", "escapeUriString", false, info.args]));
    } else {
      return null;
    }
  };

  const laziness = __exports.laziness = function (com, info) {
    const coreCall = function (meth, isCons, args) {
      return makeCall(info.range, info.returnType, new CallKind(2, ["Lazy", meth, isCons, args]));
    };

    switch (info.methodName) {
      case ".ctor":
      case "create":
        return coreCall(null, true, info.args);

      case "createFromValue":
        return coreCall(info.methodName, false, info.args);

      case "force":
      case "value":
      case "isValueCreated":
        const patternInput = Util.instanceArgs(info.callee, info.args);
        return function (prop) {
          return Util.getProp(info.range, info.returnType, patternInput[0], prop);
        }(info.methodName === "force" ? "value" : info.methodName);

      default:
        return null;
    }
  };

  const controlExtensions = __exports.controlExtensions = function (com, info) {
    return defaultArg(info.methodName === "addToObservable" ? "add" : info.methodName === "subscribeToObservable" ? "subscribe" : null, null, function (meth) {
      const args = reverse(Util.staticArgs(info.callee, info.args));
      return makeCall(info.range, info.returnType, new CallKind(2, ["Observable", meth, false, args]));
    });
  };

  const asyncs = __exports.asyncs = function (com, info) {
    const asyncMeth = function (meth, args) {
      return makeCall(info.range, info.returnType, new CallKind(2, ["Async", meth, false, args]));
    };

    if (info.methodName === "start") {
      (function (warning) {
        addWarning(com, info.fileName, info.range, warning);
      })("Async.Start will behave as StartImmediate");

      return null;
    } else if (info.methodName === "cancellationToken") {
      return asyncMeth("cancellationToken", new List_1());
    } else if (info.methodName === "catch") {
      return asyncMeth("catchAsync", info.args);
    } else {
      return null;
    }
  };

  const enums = __exports.enums = function (com, appInfo) {
    const matchValue = [appInfo.callee, appInfo.methodName, appInfo.args];
    const $var146 = matchValue[0] != null ? matchValue[1] === "hasFlag" ? matchValue[2].tail != null ? matchValue[2].tail.tail == null ? [0, matchValue[2].head, getValue(matchValue[0])] : [1] : [1] : [1] : [1];

    switch ($var146[0]) {
      case 0:
        return function (bitwise) {
          return makeEqOp(appInfo.range, ofArray([bitwise, makeIntConst(0)]), new BinaryOperator(1));
        }(makeBinOp(appInfo.range, new Type(6, new NumberKind(4)), ofArray([$var146[2], $var146[1]]), new BinaryOperator(19)));

      case 1:
        return null;
    }
  };

  const globalization = __exports.globalization = function (com, i) {
    if (i.methodName === "invariantCulture") {
      return makeJsObject(i.range, new List_1());
    } else {
      return null;
    }
  };

  const bigint = __exports.bigint = function (com, i) {
    const matchValue = [i.callee, i.methodName];
    const $var147 = matchValue[0] == null ? matchValue[1] === ".ctor" ? [1] : matchValue[1] === "zero" ? [2] : matchValue[1] === "one" ? [2] : matchValue[1] === "two" ? [2] : matchValue[1] === "fromZero" ? [3] : matchValue[1] === "fromOne" ? [3] : matchValue[1] === "fromString" ? [4] : [5] : [0];

    switch ($var147[0]) {
      case 0:
        const callee = getValue(matchValue[0]);
        return Util.icall(i, matchValue[1]);

      case 1:
        return (() => {
          let $var148;

          if (i.args.tail != null) {
            const activePatternResult60793 = Util["|Type|"](i.args.head);

            if (activePatternResult60793.tag === 7) {
              if (activePatternResult60793.data.tag === 0) {
                if (i.args.tail.tail == null) {
                  $var148 = [0];
                } else {
                  $var148 = [2];
                }
              } else if (activePatternResult60793.data.tag === 1) {
                if (i.args.tail.tail == null) {
                  $var148 = [0];
                } else {
                  $var148 = [2];
                }
              } else if (i.args.tail.tail == null) {
                $var148 = [1];
              } else {
                $var148 = [2];
              }
            } else if (i.args.tail.tail == null) {
              $var148 = [1];
            } else {
              $var148 = [2];
            }
          } else {
            $var148 = [2];
          }

          switch ($var148[0]) {
            case 0:
              return Util.ccall(i, "BigInt", "fromInt64", i.args);

            case 1:
              return Util.ccall(i, "BigInt", "fromInt32", i.args);

            case 2:
              return makeCall(i.range, i.returnType, new CallKind(2, ["BigInt", null, true, i.args]));
          }
        })();

      case 2:
        return Util.wrap(i.returnType, makeCoreRef("BigInt", i.methodName));

      case 3:
        const fi = i.methodName === "fromZero" ? "zero" : "one";
        return Util.wrap(i.returnType, makeCoreRef("BigInt", fi));

      case 4:
        return Util.ccall(i, "BigInt", "parse", i.args);

      case 5:
        return Util.ccall(i, "BigInt", matchValue[1], i.args);
    }
  };

  const fsharpType = __exports.fsharpType = function (com, i, methName) {
    const hasInterface = function (ifc, typRef) {
      const proto = Util.ccall_(typRef.Range, new Type(1), "Reflection", "getPrototypeOfType", ofArray([typRef]));
      return Util.ccall(i, "Util", "hasInterface", ofArray([proto, new Expr(0, new ValueKind(8, ifc))]));
    };

    switch (methName) {
      case "getRecordFields":
      case "getExceptionFields":
        return Util.ccall(i, "Reflection", "getProperties", i.args);

      case "getUnionCases":
        return Util.ccall(i, "Reflection", "getUnionCases", i.args);

      case "getTupleElements":
        return Util.ccall(i, "Reflection", "getTupleElements", i.args);

      case "getFunctionElements":
        return Util.ccall(i, "Reflection", "getFunctionElements", i.args);

      case "isUnion":
        return hasInterface("FSharpUnion", i.args.head);

      case "isRecord":
        return hasInterface("FSharpRecord", i.args.head);

      case "isExceptionRepresentation":
        return hasInterface("FSharpException", i.args.head);

      case "isTuple":
        return Util.ccall(i, "Reflection", "isTupleType", i.args);

      case "isFunction":
        return Util.ccall(i, "Reflection", "isFunctionType", i.args);

      default:
        return null;
    }
  };

  const fsharpValue = __exports.fsharpValue = function (com, i, methName) {
    switch (methName) {
      case "getUnionFields":
        return Util.ccall(i, "Reflection", "getUnionFields", i.args);

      case "getRecordFields":
      case "getExceptionFields":
        return Util.ccall(i, "Reflection", "getPropertyValues", i.args);

      case "getTupleFields":
        return i.args.head;

      case "getTupleField":
        return makeGet(i.range, i.returnType, i.args.head, i.args.tail.head);

      case "getRecordField":
        const $var149 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [0, i.args.tail.head, i.args.head] : [1] : [1] : [1];

        switch ($var149[0]) {
          case 0:
            const prop = makeGet($var149[1].Range, new Type(5), $var149[1], new Expr(0, new ValueKind(8, "name")));
            return makeGet(i.range, i.returnType, $var149[2], prop);

          case 1:
            return null;
        }

      case "makeUnion":
        return Util.ccall(i, "Reflection", "makeUnion", i.args);

      case "makeRecord":
        const $var150 = i.args.tail != null ? i.args.tail.tail != null ? i.args.tail.tail.tail == null ? [0, i.args.head, i.args.tail.head] : [1] : [1] : [1];

        switch ($var150[0]) {
          case 0:
            const typ = Util.ccall_($var150[1].Range, new Type(0), "Util", "getDefinition", ofArray([$var150[1]]));
            const spread = new Expr(0, new ValueKind(3, $var150[2]));
            return new Expr(3, [typ, ofArray([spread]), new ApplyKind(2), i.returnType, i.range]);

          case 1:
            return null;
        }

      case "makeTuple":
        return i.args.head;

      default:
        return null;
    }
  };

  const tryReplace = __exports.tryReplace = function (com, info) {
    const activePatternResult60835 = Naming["|StartsWith|_|"]("Fable.Core.", info.ownerFullName);

    if (activePatternResult60835 != null) {
      return fableCoreLib(com, info);
    } else {
      const activePatternResult60833 = Naming["|EndsWith|_|"]("Exception", info.ownerFullName);

      if (activePatternResult60833 != null) {
        return exceptions(com, info);
      } else {
        switch (info.ownerFullName) {
          case "System.Object":
            return objects(com, info);

          case "System.Timers.ElapsedEventArgs":
            return info.callee;

          case "System.Char":
            return chars(com, info);

          case "System.Enum":
            return enums(com, info);

          case "System.String":
          case "Microsoft.FSharp.Core.StringModule":
            return strings(com, info);

          case "Microsoft.FSharp.Core.PrintfModule":
          case "Microsoft.FSharp.Core.PrintfFormat":
            return fsFormat(com, info);

          case "System.BitConverter":
            return bitConvert(com, info);

          case "System.Int32":
            return parse(com, info, false);

          case "System.Single":
          case "System.Double":
            return parse(com, info, true);

          case "System.Convert":
            return convert(com, info);

          case "System.Console":
            return console(com, info);

          case "System.Decimal":
            return decimals(com, info);

          case "System.Diagnostics.Debug":
          case "System.Diagnostics.Debugger":
            return debug(com, info);

          case "System.DateTime":
          case "System.DateTimeOffset":
            return dates(com, info);

          case "System.TimeSpan":
            return timeSpans(com, info);

          case "System.Environment":
            return systemEnv(com, info);

          case "System.Globalization.CultureInfo":
            return globalization(com, info);

          case "System.Action":
          case "System.Func":
          case "Microsoft.FSharp.Core.FSharpFunc":
          case "Microsoft.FSharp.Core.OptimizedClosures.FSharpFunc":
            return funcs(com, info);

          case "System.Random":
            return random(com, info);

          case "Microsoft.FSharp.Core.FSharpOption":
          case "Microsoft.FSharp.Core.OptionModule":
            return options(com, info);

          case "System.Threading.CancellationToken":
          case "System.Threading.CancellationTokenSource":
            return cancels(com, info);

          case "System.Math":
          case "Microsoft.FSharp.Core.Operators":
          case "Microsoft.FSharp.Core.LanguagePrimitives.IntrinsicOperators":
          case "Microsoft.FSharp.Core.ExtraTopLevelOperators":
            return operators(com, info);

          case "Microsoft.FSharp.Core.FSharpRef":
            return references(com, info);

          case "System.Activator":
            return activator(com, info);

          case "Microsoft.FSharp.Core.LanguagePrimitives.ErrorStrings":
            return errorStrings(com, info);

          case "Microsoft.FSharp.Core.LanguagePrimitives.HashCompare":
          case "Microsoft.FSharp.Core.LanguagePrimitives":
            return languagePrimitives(com, info);

          case "Microsoft.FSharp.Core.LanguagePrimitives.IntrinsicFunctions":
          case "Microsoft.FSharp.Core.Operators.OperatorIntrinsics":
            return intrinsicFunctions(com, info);

          case "System.Text.RegularExpressions.Capture":
          case "System.Text.RegularExpressions.Match":
          case "System.Text.RegularExpressions.Group":
          case "System.Text.RegularExpressions.MatchCollection":
          case "System.Text.RegularExpressions.GroupCollection":
          case "System.Text.RegularExpressions.Regex":
            return regex(com, info);

          case "System.Collections.Generic.IEnumerable":
          case "System.Collections.IEnumerable":
            return enumerable(com, info);

          case "System.Collections.Generic.Dictionary":
          case "System.Collections.Generic.IDictionary":
            return dictionaries(com, info);

          case "System.Collections.Generic.HashSet":
          case "System.Collections.Generic.ISet":
            return hashSets(com, info);

          case "System.Collections.Generic.KeyValuePair":
            return keyValuePairs(com, info);

          case "System.Collections.Generic.Dictionary.KeyCollection":
          case "System.Collections.Generic.Dictionary.ValueCollection":
          case "System.Collections.Generic.ICollection":
            return collectionsSecondPass(com, info, new CollectionKind(0));

          case "System.Array":
          case "System.Collections.Generic.List":
          case "System.Collections.Generic.IList":
            return collectionsSecondPass(com, info, new CollectionKind(2));

          case "Microsoft.FSharp.Collections.ArrayModule":
            return collectionsFirstPass(com, info, new CollectionKind(2));

          case "Microsoft.FSharp.Collections.FSharpList":
          case "Microsoft.FSharp.Collections.ListModule":
            return collectionsFirstPass(com, info, new CollectionKind(1));

          case "Microsoft.FSharp.Collections.SeqModule":
            return collectionsSecondPass(com, info, new CollectionKind(0));

          case "Microsoft.FSharp.Collections.FSharpMap":
          case "Microsoft.FSharp.Collections.MapModule":
          case "Microsoft.FSharp.Collections.FSharpSet":
          case "Microsoft.FSharp.Collections.SetModule":
            return mapAndSets(com, info);

          case "System.Type":
            return types(com, info);

          case "Microsoft.FSharp.Core.Operators.Unchecked":
            return unchecked(com, info);

          case "Microsoft.FSharp.Control.FSharpMailboxProcessor":
          case "Microsoft.FSharp.Control.FSharpAsyncReplyChannel":
            return mailbox(com, info);

          case "Microsoft.FSharp.Control.FSharpAsync":
            return asyncs(com, info);

          case "System.Guid":
            return guids(com, info);

          case "System.Uri":
            return uris(com, info);

          case "System.Lazy":
          case "Microsoft.FSharp.Control.Lazy":
          case "Microsoft.FSharp.Control.LazyExtensions":
            return laziness(com, info);

          case "Microsoft.FSharp.Control.CommonExtensions":
            return controlExtensions(com, info);

          case "System.Numerics.BigInteger":
          case "Microsoft.FSharp.Core.NumericLiterals.NumericLiteralI":
            return bigint(com, info);

          case "Microsoft.FSharp.Reflection.FSharpType":
            return fsharpType(com, info, info.methodName);

          case "Microsoft.FSharp.Reflection.FSharpValue":
            return fsharpValue(com, info, info.methodName);

          case "Microsoft.FSharp.Reflection.FSharpReflectionExtensions":
            const isFSharpType = info.methodName.indexOf("fSharpType") === 0;
            const methName = Naming.lowerFirst(Naming.extensionMethodName(info.methodName));

            if (isFSharpType) {
              return fsharpType(com, info, methName);
            } else {
              return fsharpValue(com, info, methName);
            }

          case "Microsoft.FSharp.Reflection.UnionCaseInfo":
          case "System.Reflection.PropertyInfo":
          case "System.Reflection.MemberInfo":
            const matchValue = [info.callee, info.methodName];
            const $var151 = matchValue[1] === "getFields" ? [0] : matchValue[1] === "name" ? matchValue[0] != null ? [1] : [3] : matchValue[1] === "tag" ? matchValue[0] != null ? [2, getValue(matchValue[0])] : [3] : matchValue[1] === "propertyType" ? matchValue[0] != null ? [2, getValue(matchValue[0])] : [3] : [3];

            switch ($var151[0]) {
              case 0:
                return Util.icall(info, "getUnionFields");

              case 1:
                const c = getValue(matchValue[0]);
                return Util.ccall(info, "Reflection", "getName", ofArray([c]));

              case 2:
                const prop = new Expr(0, new ValueKind(8, info.methodName === "tag" ? "index" : info.methodName));
                return makeGet(info.range, info.returnType, $var151[1], prop);

              case 3:
                return null;
            }

          default:
            return null;
        }
      }
    }
  };

  return __exports;
}({});
export const CoreLibPass = function (__exports) {
  const MapKind = __exports.MapKind = class MapKind {
    constructor(tag) {
      this.tag = tag | 0;
    }

    [_Symbol.reflection]() {
      return {
        type: "Fable.Replacements.CoreLibPass.MapKind",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Static"], ["Both"]]
      };
    }

    Equals(other) {
      return this.tag === other.tag;
    }

    CompareTo(other) {
      return comparePrimitives(this.tag, other.tag);
    }

  };
  setType("Fable.Replacements.CoreLibPass.MapKind", MapKind);
  const mappings = __exports.mappings = new Map(ofArray([["System.DateTime", ["Date", new MapKind(0)]], ["System.DateTimeOffset", ["DateOffset", new MapKind(0)]], ["System.TimeSpan", ["TimeSpan", new MapKind(0)]], ["System.Timers.Timer", ["Timer", new MapKind(1)]], ["Microsoft.FSharp.Control.FSharpAsync", ["Async", new MapKind(0)]], ["Microsoft.FSharp.Control.FSharpAsyncBuilder", ["AsyncBuilder", new MapKind(1)]], ["Microsoft.FSharp.Control.ObservableModule", ["Observable", new MapKind(0)]], ["Microsoft.FSharp.Core.CompilerServices.RuntimeHelpers", ["Seq", new MapKind(0)]], ["System.String", ["String", new MapKind(0)]], ["Microsoft.FSharp.Core.StringModule", ["String", new MapKind(0)]], ["System.Text.RegularExpressions.Regex", ["RegExp", new MapKind(0)]], ["Microsoft.FSharp.Collections.SeqModule", ["Seq", new MapKind(0)]], ["Microsoft.FSharp.Collections.FSharpSet", ["Set", new MapKind(0)]], ["Microsoft.FSharp.Collections.SetModule", ["Set", new MapKind(0)]], ["Microsoft.FSharp.Core.FSharpChoice", ["Choice", new MapKind(1)]], ["Microsoft.FSharp.Core.FSharpResult", ["Result", new MapKind(1)]], ["Microsoft.FSharp.Core.ResultModule", ["Result", new MapKind(0)]], ["Microsoft.FSharp.Control.FSharpEvent", ["Event", new MapKind(1)]], ["Microsoft.FSharp.Control.EventModule", ["Event", new MapKind(0)]]]));
  return __exports;
}({});

function coreLibPass(com, info) {
  const activePatternResult60861 = function (key) {
    return Patterns["|DicContains|_|"](CoreLibPass.mappings, key);
  }(info.ownerFullName);

  if (activePatternResult60861 != null) {
    if (getValue(activePatternResult60861)[1].tag === 0) {
      const meth = info.methodName === ".ctor" ? "create" : info.methodName;
      return makeCall(info.range, info.returnType, new CallKind(2, [getValue(activePatternResult60861)[0], meth, false, Util.staticArgs(info.callee, info.args)]));
    } else {
      const matchValue = [info.methodName, info.methodKind, info.callee];
      const $var152 = matchValue[0] === ".ctor" ? matchValue[2] != null ? matchValue[1].tag === 2 ? [1, getValue(matchValue[2])] : matchValue[1].tag === 3 ? [2, getValue(matchValue[2])] : [3, getValue(matchValue[2])] : [0] : matchValue[1].tag === 0 ? matchValue[2] != null ? [3, getValue(matchValue[2])] : [0] : matchValue[1].tag === 2 ? matchValue[2] == null ? [4] : [1, getValue(matchValue[2])] : matchValue[1].tag === 3 ? matchValue[2] == null ? [4] : [2, getValue(matchValue[2])] : matchValue[2] == null ? [4] : [3, getValue(matchValue[2])];

      switch ($var152[0]) {
        case 0:
          return makeCall(info.range, info.returnType, new CallKind(2, [getValue(activePatternResult60861)[0], null, true, info.args]));

        case 1:
          const prop = makeStrConst(Naming.upperFirst(info.methodName));
          return new Expr(3, [$var152[1], ofArray([prop]), new ApplyKind(1), info.returnType, info.range]);

        case 2:
          const prop_1 = makeStrConst(Naming.upperFirst(info.methodName));
          return new Expr(9, [$var152[1], prop_1, info.args.head, info.range]);

        case 3:
          return makeCall(info.range, info.returnType, new CallKind(0, [$var152[1], Naming.upperFirst(info.methodName), info.args]));

        case 4:
          return makeCall(info.range, info.returnType, new CallKind(2, [getValue(activePatternResult60861)[0], info.methodName, false, Util.staticArgs(info.callee, info.args)]));
      }
    }
  } else {
    return null;
  }
}

function tryReplace_1(com, info) {
  const info_1 = function (methName) {
    return new ApplyInfo(info.ownerType, info.ownerFullName, methName, info.methodKind, info.callee, info.args, info.returnType, info.range, info.fileName, info.decorators, info.calleeTypeArgs, info.methodTypeArgs, info.methodArgTypes, info.genericAvailability, info.caughtException);
  }(Naming.lowerFirst(Naming.removeGetSetPrefix(info.methodName)));

  const matchValue = AstPass.tryReplace(com, info_1);

  if (matchValue == null) {
    return coreLibPass(com, info_1);
  } else {
    return matchValue;
  }
}

export { tryReplace_1 as tryReplace };
export function tryReplaceEntity(com, ent, genArgs) {
  const makeGeneric = function (genArgs_1, expr) {
    if (genArgs_1.tail == null) {
      return expr;
    } else {
      const genArgs_2 = makeJsObject(null, genArgs_1);
      return makeCall(null, new Type(1), new CallKind(2, ["Util", "makeGeneric", false, ofArray([expr, genArgs_2])]));
    }
  };

  const matchValue = ent.FullName;
  let $var153;

  if (matchValue === "System.Guid") {
    $var153 = [0];
  } else if (matchValue === "System.TimeSpan") {
    $var153 = [1];
  } else if (matchValue === "System.DateTime") {
    $var153 = [2];
  } else if (matchValue === "System.DateTimeOffset") {
    $var153 = [3, matchValue];
  } else if (matchValue === "System.Timers.Timer") {
    $var153 = [4];
  } else if (matchValue === "System.Text.RegularExpressions.Regex") {
    $var153 = [5];
  } else if (matchValue === "System.Collections.Generic.Dictionary") {
    $var153 = [6];
  } else if (matchValue === "System.Collections.Generic.HashSet") {
    $var153 = [7];
  } else if (matchValue === "System.Collections.Generic.KeyValuePair") {
    $var153 = [8];
  } else {
    const activePatternResult60904 = Util["|KeyValue|_|"]("Microsoft.FSharp.Core.FSharpChoice", "Choice", matchValue);

    if (activePatternResult60904 != null) {
      $var153 = [9, getValue(activePatternResult60904)];
    } else {
      const activePatternResult60905 = Util["|KeyValue|_|"]("Microsoft.FSharp.Core.FSharpResult", "Result", matchValue);

      if (activePatternResult60905 != null) {
        $var153 = [9, getValue(activePatternResult60905)];
      } else {
        const activePatternResult60906 = Util["|KeyValue|_|"]("Microsoft.FSharp.Control.FSharpAsync", "Async", matchValue);

        if (activePatternResult60906 != null) {
          $var153 = [9, getValue(activePatternResult60906)];
        } else {
          const activePatternResult60907 = Util["|KeyValue|_|"]("Microsoft.FSharp.Collections.FSharpSet", "Set", matchValue);

          if (activePatternResult60907 != null) {
            $var153 = [9, getValue(activePatternResult60907)];
          } else {
            const activePatternResult60908 = Util["|KeyValue|_|"]("Microsoft.FSharp.Collections.FSharpMap", "Map", matchValue);

            if (activePatternResult60908 != null) {
              $var153 = [9, getValue(activePatternResult60908)];
            } else {
              const activePatternResult60909 = Util["|KeyValue|_|"]("Microsoft.FSharp.Collections.FSharpList", "List", matchValue);

              if (activePatternResult60909 != null) {
                $var153 = [9, getValue(activePatternResult60909)];
              } else {
                $var153 = [10];
              }
            }
          }
        }
      }
    }
  }

  switch ($var153[0]) {
    case 0:
      return new Expr(0, new ValueKind(8, "string"));

    case 1:
      return new Expr(0, new ValueKind(8, "number"));

    case 2:
      return makeIdentExpr("Date");

    case 3:
      return makeNonDeclaredTypeRef(new NonDeclaredType(7, $var153[1]));

    case 4:
      return makeDefaultCoreRef("Timer");

    case 5:
      return makeIdentExpr("RegExp");

    case 6:
      return CurriedLambda(makeGeneric)(genArgs)(makeIdentExpr("Map"));

    case 7:
      return CurriedLambda(makeGeneric)(genArgs)(makeIdentExpr("Set"));

    case 8:
      if (genArgs.tail == null) {
        return makeIdentExpr("Array");
      } else {
        return makeNonDeclaredTypeRef(new NonDeclaredType(4, map(function (tuple) {
          return tuple[1];
        }, genArgs)));
      }

    case 9:
      return CurriedLambda(makeGeneric)(genArgs)(makeDefaultCoreRef($var153[1]));

    case 10:
      const activePatternResult60897 = Naming["|EndsWith|_|"]("Exception", matchValue);

      if (activePatternResult60897 != null) {
        return makeIdentExpr("Error");
      } else {
        let $var154;

        if (matchValue === "Fable.Core.JsInterop.JsConstructor") {
          $var154 = [0];
        } else {
          const activePatternResult60895 = Naming["|StartsWith|_|"]("Fable.Core.JsInterop.JsFunc", matchValue);

          if (activePatternResult60895 != null) {
            $var154 = [0];
          } else {
            $var154 = [1];
          }
        }

        switch ($var154[0]) {
          case 0:
            return new Expr(0, new ValueKind(8, "function"));

          case 1:
            let $var155;
            const activePatternResult60891 = Naming["|StartsWith|_|"]("System.", matchValue);

            if (activePatternResult60891 != null) {
              $var155 = [0];
            } else {
              const activePatternResult60892 = Naming["|StartsWith|_|"]("Fable.Core.", matchValue);

              if (activePatternResult60892 != null) {
                $var155 = [0];
              } else {
                const activePatternResult60893 = Naming["|StartsWith|_|"]("Microsoft.FSharp.", matchValue);

                if (activePatternResult60893 != null) {
                  $var155 = [0];
                } else {
                  $var155 = [1];
                }
              }
            }

            switch ($var155[0]) {
              case 0:
                return makeNonDeclaredTypeRef(new NonDeclaredType(0));

              case 1:
                return null;
            }

        }
      }

  }
}
export function checkLiteral(com, fileName, range, value, typ) {
  var i_1;
  const $var156 = typ.tag === 13 ? typ.data === "System.Text.RegularExpressions.RegexOptions" ? [0] : [1] : [1];

  switch ($var156[0]) {
    case 0:
      const $var157 = typeof value === "number" ? (i_1 = value | 0, (i_1 === 1 ? true : i_1 === 2) ? true : i_1 === 256) ? [0] : [1] : [1];

      switch ($var157[0]) {
        case 0:
          const i = value | 0;
          break;

        case 1:
          addWarning(com, fileName, range, "Multiline and IgnoreCase are the only RegexOptions available");
          break;
      }

      break;

    case 1:
      break;
  }
}