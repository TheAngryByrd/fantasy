import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { equals, Tuple, Option, Array as _Array, makeGeneric } from "../fable-core/Util";
import { map, append as append_1, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { mkRange, pos as pos_1 } from "../fsharp/range";
import { map as map_1, forAll, map2, toList, singleton, append, delay } from "../fable-core/Seq";
import { makeSome, getValue } from "../fable-core/Option";
import { $7C$SynExprParen$7C$_$7C$ as _SynExprParen___, pathOfLid } from "../fsharp/ast";
import { AstVisitorBase, Traverse, rangeContainsPosEdgesExclusive } from "./ServiceParseTreeWalk";
import CurriedLambda from "../fable-core/CurriedLambda";
export class FSharpNoteworthyParamInfoLocations {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNoteworthyParamInfoLocations",
      properties: {
        IsThereACloseParen: "boolean",
        LongId: makeGeneric(List, {
          T: "string"
        }),
        LongIdEndLocation: pos_1,
        LongIdStartLocation: pos_1,
        NamedParamNames: _Array(Option("string")),
        OpenParenLocation: pos_1,
        TupleEndLocations: _Array(pos_1)
      }
    };
  }

  constructor(longId, longIdRange, openParenLocation, tupleEndLocations, isThereACloseParen, namedParamNames) {
    this.longId = longId;
    this.longIdRange = longIdRange;
    this.openParenLocation = openParenLocation;
    this.isThereACloseParen = isThereACloseParen;
    this["tupleEndLocations@11"] = Array.from(tupleEndLocations);
    const namedParamNames_1 = Array.from(namedParamNames);

    if (this["tupleEndLocations@11"].length === namedParamNames_1.length) {
      this["namedParamNames@13-1"] = namedParamNames_1;
    } else {
      this["namedParamNames@13-1"] = Array.from(delay(() => append(namedParamNames_1, delay(() => singleton(null)))));
    }
  }

  get LongId() {
    return this.longId;
  }

  get LongIdStartLocation() {
    return this.longIdRange.Start;
  }

  get LongIdEndLocation() {
    return this.longIdRange.End;
  }

  get OpenParenLocation() {
    return this.openParenLocation;
  }

  get TupleEndLocations() {
    return this["tupleEndLocations@11"];
  }

  get IsThereACloseParen() {
    return this.isThereACloseParen;
  }

  get NamedParamNames() {
    return this["namedParamNames@13-1"];
  }

  static Find(pos, parseTree) {
    const matchValue = NoteworthyParamInfoLocationsImpl.traverseInput(pos, parseTree);

    if (matchValue != null) {
      getValue(matchValue);
      return matchValue;
    } else {
      return null;
    }
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNoteworthyParamInfoLocations", FSharpNoteworthyParamInfoLocations);
export const NoteworthyParamInfoLocationsImpl = function (__exports) {
  const isStaticArg = __exports.isStaticArg = function (a) {
    switch (a.tag) {
      case 13:
      case 14:
      case 15:
        return true;

      case 0:
        return true;

      default:
        return false;
    }
  };

  const digOutIdentFromFuncExpr = __exports.digOutIdentFromFuncExpr = function (synExpr) {
    digOutIdentFromFuncExpr: while (true) {
      const $var1 = synExpr.tag === 28 ? [0] : synExpr.tag === 29 ? [1, synExpr.data[1].data[0], synExpr.data[3]] : synExpr.tag === 31 ? [1, synExpr.data[2].data[0], synExpr.data[3]] : synExpr.tag === 21 ? [2] : [3];

      switch ($var1[0]) {
        case 0:
          return [ofArray([synExpr.data.idText]), synExpr.data.idRange];

        case 1:
          return [pathOfLid($var1[1]), $var1[2]];

        case 2:
          synExpr = synExpr.data[0];
          continue digOutIdentFromFuncExpr;

        case 3:
          return null;
      }
    }
  };

  const FindResult = __exports.FindResult = class FindResult {
    constructor(tag, data) {
      this.tag = tag | 0;
      this.data = data;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.NoteworthyParamInfoLocationsImpl.FindResult",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Found", pos_1, makeGeneric(List, {
          T: Tuple([pos_1, Option("string")])
        }), "boolean"], ["NotFound"]]
      };
    }

    Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.NoteworthyParamInfoLocationsImpl.FindResult", FindResult);

  const digOutIdentFromStaticArg = __exports.digOutIdentFromStaticArg = function (synType) {
    const $var2 = synType.tag === 15 ? synType.data[0].tag === 0 ? synType.data[0].data.data[0].tail != null ? synType.data[0].data.data[0].tail.tail == null ? [0, synType.data[0].data.data[0].head] : [2] : [2] : [2] : synType.tag === 0 ? synType.data.data[0].tail != null ? synType.data.data[0].tail.tail == null ? [1, synType.data.data[0].head] : [2] : [2] : [2];

    switch ($var2[0]) {
      case 0:
        return $var2[1].idText;

      case 1:
        return $var2[1].idText;

      case 2:
        return null;
    }
  };

  const getNamedParamName = __exports.getNamedParamName = function (e) {
    var op_1;
    var n_1;

    var _range_1;

    var op;
    var n;

    var _ref;

    var _range;

    var _lidrange;

    const $var3 = e.tag === 20 ? e.data[0] === 1 ? e.data[2].tag === 20 ? e.data[2].data[0] === 1 ? e.data[2].data[1] ? e.data[2].data[2].tag === 28 ? e.data[2].data[3].tag === 28 ? (op_1 = e.data[2].data[2].data, n_1 = e.data[2].data[3].data, _range_1 = e.data[2].data[4], op_1.idText === "op_Equality") ? [0, e.data[2].data[4], e.data[2].data[3].data, e.data[2].data[2].data] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var3[0]) {
      case 0:
        return $var3[2].idText;

      case 1:
        const $var4 = e.tag === 20 ? e.data[0] === 1 ? e.data[2].tag === 20 ? e.data[2].data[0] === 1 ? e.data[2].data[1] ? e.data[2].data[2].tag === 28 ? e.data[2].data[3].tag === 29 ? e.data[2].data[3].data[0] ? e.data[2].data[3].data[1].data[0].tail != null ? e.data[2].data[3].data[1].data[0].tail.tail == null ? (op = e.data[2].data[2].data, n = e.data[2].data[3].data[1].data[0].head, _ref = e.data[2].data[3].data[2], _range = e.data[2].data[4], _lidrange = e.data[2].data[3].data[3], op.idText === "op_Equality") ? [0, e.data[2].data[3].data[3], e.data[2].data[4], e.data[2].data[3].data[2], e.data[2].data[3].data[1].data[0].head, e.data[2].data[2].data] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

        switch ($var4[0]) {
          case 0:
            return $var4[4].idText;

          case 1:
            return null;
        }

    }
  };

  const getTypeName = __exports.getTypeName = function (synType) {
    if (synType.tag === 0) {
      const ids = synType.data.data[0];
      return pathOfLid(ids);
    } else {
      return ofArray([""]);
    }
  };

  const handleSingleArg = __exports.handleSingleArg = function (traverseSynExpr, pos, synExpr, parenRange, rpRangeOpt) {
    const inner = traverseSynExpr(synExpr);

    if (inner == null) {
      if (rangeContainsPosEdgesExclusive(parenRange, pos)) {
        return [new FindResult(0, [parenRange.Start, ofArray([[parenRange.End, getNamedParamName(synExpr)]]), CurriedLambda(() => rpRangeOpt != null)()]), null];
      } else {
        return [new FindResult(1), null];
      }
    } else {
      return [new FindResult(1), null];
    }
  };

  const searchSynArgExpr = __exports.searchSynArgExpr = function (traverseSynExpr, pos, expr) {
    var copyOfStruct;
    var copyOfStruct_1;
    let $var5;

    const activePatternResult53546 = _SynExprParen___(expr);

    if (activePatternResult53546 != null) {
      if (getValue(activePatternResult53546)[0].tag === 4) {
        $var5 = [0, getValue(activePatternResult53546)[1], getValue(activePatternResult53546)[0].data[2], getValue(activePatternResult53546)[0].data[1], getValue(activePatternResult53546)[3], getValue(activePatternResult53546)[2], getValue(activePatternResult53546)[0], getValue(activePatternResult53546)[0].data[0]];
      } else {
        $var5 = [1];
      }
    } else {
      $var5 = [1];
    }

    switch ($var5[0]) {
      case 0:
        const inner = traverseSynExpr($var5[6]);

        if (inner == null) {
          if (rangeContainsPosEdgesExclusive($var5[4], pos)) {
            const commasAndCloseParen = toList(map2(function (e, c) {
              return [c.End, getNamedParamName(e)];
            }, $var5[7], append_1($var5[3], ofArray([$var5[4]]))));
            const r = new FindResult(0, [$var5[4].Start, commasAndCloseParen, CurriedLambda(() => $var5[5] != null)()]);
            return [r, null];
          } else {
            return [new FindResult(1), null];
          }
        } else {
          return [new FindResult(1), null];
        }

      case 1:
        let $var6;

        const activePatternResult53544 = _SynExprParen___(expr);

        if (activePatternResult53544 != null) {
          const activePatternResult53545 = _SynExprParen___(getValue(activePatternResult53544)[0]);

          if (activePatternResult53545 != null) {
            if (getValue(activePatternResult53545)[0].tag === 4) {
              $var6 = [0, getValue(activePatternResult53544)[3], getValue(activePatternResult53544)[2], getValue(activePatternResult53544)[0]];
            } else {
              $var6 = [1];
            }
          } else {
            $var6 = [1];
          }
        } else {
          $var6 = [1];
        }

        switch ($var6[0]) {
          case 0:
            return handleSingleArg(traverseSynExpr, pos, $var6[3], $var6[1], $var6[2]);

          case 1:
            let $var7;

            const activePatternResult53542 = _SynExprParen___(expr);

            if (activePatternResult53542 != null) {
              const activePatternResult53543 = _SynExprParen___(getValue(activePatternResult53542)[0]);

              if (activePatternResult53543 != null) {
                $var7 = [0, getValue(activePatternResult53542)[3], getValue(activePatternResult53542)[0]];
              } else {
                $var7 = [1];
              }
            } else {
              $var7 = [1];
            }

            switch ($var7[0]) {
              case 0:
                const patternInput = searchSynArgExpr(traverseSynExpr, pos, $var7[2]);
                return [patternInput[0], null];

              case 1:
                const activePatternResult53541 = _SynExprParen___(expr);

                if (activePatternResult53541 != null) {
                  return handleSingleArg(traverseSynExpr, pos, getValue(activePatternResult53541)[0], getValue(activePatternResult53541)[3], getValue(activePatternResult53541)[2]);
                } else {
                  const $var8 = expr.tag === 55 ? [0, expr.data[0], expr.data[1]] : expr.tag === 2 ? expr.data[0].tag === 0 ? [1, expr.data[1]] : [2, expr] : [2, expr];

                  switch ($var8[0]) {
                    case 0:
                      if (rangeContainsPosEdgesExclusive($var8[2], pos)) {
                        const r_1 = new FindResult(0, [$var8[2].Start, ofArray([[$var8[2].End, null]]), false]);
                        return [r_1, null];
                      } else {
                        return [new FindResult(1), null];
                      }

                    case 1:
                      if (rangeContainsPosEdgesExclusive($var8[1], pos)) {
                        const r_2 = new FindResult(0, [$var8[1].Start, ofArray([[$var8[1].End, null]]), true]);
                        return [r_2, null];
                      } else {
                        return [new FindResult(1), null];
                      }

                    case 2:
                      const inner_1 = traverseSynExpr($var8[1]);

                      if (inner_1 == null) {
                        if (rangeContainsPosEdgesExclusive($var8[1].Range, pos)) {
                          return [new FindResult(0, [(copyOfStruct = $var8[1].Range, copyOfStruct.Start), ofArray([[(copyOfStruct_1 = $var8[1].Range, copyOfStruct_1.End), null]]), false]), makeSome(inner_1)];
                        } else {
                          return [new FindResult(1), makeSome(inner_1)];
                        }
                      } else {
                        return [new FindResult(1), makeSome(inner_1)];
                      }

                  }
                }

            }

        }

    }
  };

  const traverseInput = __exports.traverseInput = function (pos, parseTree) {
    return Traverse(pos, parseTree, new class extends AstVisitorBase {
      constructor() {
        return super();
      }

      VisitExpr(_path, traverseSynExpr, defaultTraverse, expr) {
        var synExpr;
        var openm;
        var op;
        var copyOfStruct;
        const $var9 = expr.tag === 8 ? [0, expr.data[3], expr.data[2], expr.data[1]] : expr.tag === 20 ? expr.data[2].tag === 20 ? expr.data[2].data[1] ? expr.data[2].data[2].tag === 28 ? expr.data[3].tag === 55 ? (synExpr = expr.data[2].data[3], openm = expr.data[2].data[4], op = expr.data[2].data[2].data, op.idText === "op_LessThan") ? [1, expr.data[2].data[2].data, expr.data[2].data[4], expr.data[2].data[3], expr.data[4]] : [2] : [2] : [2] : [2] : [2] : [2];

        switch ($var9[0]) {
          case 0:
            const patternInput = searchSynArgExpr(traverseSynExpr, pos, $var9[2]);
            const matchValue = [patternInput[0], patternInput[1]];

            if (matchValue[0].tag === 1) {
              if (matchValue[1] != null) {
                const cache = getValue(matchValue[1]);
                return cache;
              } else {
                return traverseSynExpr($var9[2]);
              }
            } else {
              const parenLoc = matchValue[0].data[0];
              const isThereACloseParen = matchValue[0].data[2];
              const args = matchValue[0].data[1];
              const typeName = getTypeName($var9[3]);
              return new FSharpNoteworthyParamInfoLocations(typeName, $var9[3].Range, parenLoc, map(tuple => tuple[0], args), isThereACloseParen, map(tuple_1 => tuple_1[1], args));
            }

          case 1:
            const fResult = traverseSynExpr($var9[3]);

            if (fResult != null) {
              return fResult;
            } else {
              const typeArgsm = mkRange($var9[2].FileName, $var9[2].Start, $var9[4].End);

              if (rangeContainsPosEdgesExclusive(typeArgsm, pos)) {
                const matchValue_1 = digOutIdentFromFuncExpr($var9[3]);

                if (matchValue_1 == null) {
                  return null;
                } else {
                  const lidRange = getValue(matchValue_1)[1];
                  const lid = getValue(matchValue_1)[0];
                  return new FSharpNoteworthyParamInfoLocations(lid, lidRange, (copyOfStruct = $var9[1].idRange, copyOfStruct.Start), ofArray([$var9[4].End]), false, new List());
                }
              } else {
                return null;
              }
            }

          case 2:
            if (expr.tag === 20) {
              const fResult_1 = traverseSynExpr(expr.data[2]);

              if (fResult_1 != null) {
                return fResult_1;
              } else {
                const patternInput_1 = searchSynArgExpr(traverseSynExpr, pos, expr.data[3]);
                const matchValue_2 = [patternInput_1[0], patternInput_1[1]];

                if (matchValue_2[0].tag === 1) {
                  if (matchValue_2[1] != null) {
                    const cache_1 = getValue(matchValue_2[1]);
                    return cache_1;
                  } else {
                    return traverseSynExpr(expr.data[3]);
                  }
                } else {
                  const parenLoc_1 = matchValue_2[0].data[0];
                  const isThereACloseParen_1 = matchValue_2[0].data[2];
                  const args_1 = matchValue_2[0].data[1];
                  const matchValue_3 = digOutIdentFromFuncExpr(expr.data[2]);

                  if (matchValue_3 == null) {
                    return null;
                  } else {
                    const lidRange_1 = getValue(matchValue_3)[1];
                    const lid_1 = getValue(matchValue_3)[0];

                    if (expr.data[1]) {
                      return null;
                    } else {
                      return new FSharpNoteworthyParamInfoLocations(lid_1, lidRange_1, parenLoc_1, map(tuple_2 => tuple_2[0], args_1), isThereACloseParen_1, map(tuple_3 => tuple_3[1], args_1));
                    }
                  }
                }
              }
            } else if (expr.tag === 21) {
              const matchValue_4 = traverseSynExpr(expr.data[0]);

              if (matchValue_4 == null) {
                const typeArgsm_1 = mkRange(expr.data[1].FileName, expr.data[1].Start, expr.data[6].End);

                if (rangeContainsPosEdgesExclusive(typeArgsm_1, pos) ? (list => forAll(a => isStaticArg(a), list))(expr.data[2]) : false) {
                  const commasAndCloseParen = append_1(toList(delay(() => map_1(c => c.End, expr.data[3]))), ofArray([expr.data[6].End]));
                  const r = new FSharpNoteworthyParamInfoLocations(ofArray(["dummy"]), expr.data[0].Range, expr.data[1].Start, commasAndCloseParen, CurriedLambda(() => expr.data[4] != null)(), (list_1 => map(synType => digOutIdentFromStaticArg(synType), list_1))(expr.data[2]));
                  return r;
                } else {
                  return null;
                }
              } else {
                return matchValue_4;
              }
            } else {
              return defaultTraverse(expr);
            }

        }
      }

      VisitTypeAbbrev(tyAbbrevRhs, _m) {
        const $var10 = tyAbbrevRhs.tag === 1 ? tyAbbrevRhs.data[0].tag === 0 ? tyAbbrevRhs.data[1] != null ? [0, tyAbbrevRhs.data[5], tyAbbrevRhs.data[2], tyAbbrevRhs.data[4], tyAbbrevRhs.data[3], tyAbbrevRhs.data[0].data.data[0], tyAbbrevRhs.data[0].data, getValue(tyAbbrevRhs.data[1]), tyAbbrevRhs.data[6]] : [1] : [1] : [1];

        switch ($var10[0]) {
          case 0:
            const lidm = $var10[6].Range;
            const betweenTheBrackets = mkRange($var10[8].FileName, $var10[7].Start, $var10[8].End);

            if (rangeContainsPosEdgesExclusive(betweenTheBrackets, pos) ? (list => forAll(a => isStaticArg(a), list))($var10[2]) : false) {
              const commasAndCloseParen = append_1(toList(delay(() => map_1(c => c.End, $var10[4]))), ofArray([$var10[8].End]));
              return new FSharpNoteworthyParamInfoLocations(pathOfLid($var10[5]), lidm, $var10[7].Start, commasAndCloseParen, CurriedLambda(() => $var10[3] != null)(), (list_1 => map(synType => digOutIdentFromStaticArg(synType), list_1))($var10[2]));
            } else {
              return null;
            }

          case 1:
            return null;
        }
      }

      VisitImplicitInherit(defaultTraverse, ty, expr, m) {
        const matchValue = defaultTraverse(expr);

        if (matchValue == null) {
          const inheritm = mkRange(m.FileName, m.Start, m.End);

          if (rangeContainsPosEdgesExclusive(inheritm, pos)) {
            const patternInput = searchSynArgExpr(defaultTraverse, pos, expr);

            if (patternInput[0].tag === 1) {
              return null;
            } else {
              const typeName = getTypeName(ty);
              const r = new FSharpNoteworthyParamInfoLocations(typeName, ty.Range, patternInput[0].data[0], map(tuple => tuple[0], patternInput[0].data[1]), patternInput[0].data[2], map(tuple_1 => tuple_1[1], patternInput[0].data[1]));
              return r;
            }
          } else {
            return null;
          }
        } else {
          return matchValue;
        }
      }

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.AstVisitorBase"]
        };
      }

    }());
  };

  return __exports;
}({});