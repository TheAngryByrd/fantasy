import { mapIndexed, reverse, filter, map, choose, collect as collect_1, ofArray, append } from "../fable-core/List";
import List from "../fable-core/List";
import { FSharpScriptFileSuffixes, FSharpImplFileSuffixes, FSharpSigFileSuffixes } from "../fsharp/CompileOps";
import { System } from "../fcs-fable/adapters";
import { filter as filter_1, forAll, last as last_1, tryPick, item, tryFind, takeWhile, map as map_1, tryLast, tryHead, collect as collect_2, append as append_1, empty, singleton, delay, toList, exists } from "../fable-core/Seq";
import { trim, join, printf, toText, compare } from "../fable-core/String";
import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareUnions, compareRecords, equalsRecords, Array as _Array, equals, Option, makeGeneric, Tuple, comparePrimitives } from "../fable-core/Util";
import { posLt, mkPos, posEq, mkRange, posGt, unionRanges, posGeq, rangeBeforePos, rangeContainsPos, range0, pos as pos_2, range as range_20 } from "../fsharp/range";
import { ErrorScope, FSharpErrorInfo } from "../symbols/SymbolHelpers";
import { rangeOfLid, IsControlFlowExpression, ParsedInput } from "../fsharp/ast";
import { FSharpNoteworthyParamInfoLocations } from "./ServiceParamInfoLocations";
import { defaultArgWith, makeSome, defaultArg, getValue } from "../fable-core/Option";
import { NavigationImpl } from "./ServiceNavigation";
import CurriedLambda from "../fable-core/CurriedLambda";
import { pick as pick_2, dive as dive_1, rangeContainsPosLeftEdgeInclusive, AstVisitorBase, Traverse } from "./ServiceParseTreeWalk";
import Choice from "../fable-core/Choice";
import { addInPlace } from "../fable-core/Set";
import { IsIdentifierPartCharacter } from "../fsharp/PrettyNaming";
export const SourceFile = function (__exports) {
  const compilableExtensions = append(FSharpSigFileSuffixes, append(FSharpImplFileSuffixes, FSharpScriptFileSuffixes));
  const singleFileProjectExtensions = FSharpScriptFileSuffixes;

  const IsCompilable = __exports.IsCompilable = function (file) {
    const ext = System.IO.Path.GetExtension(file);
    return exists(function (e) {
      return 0 === compare(e, ext, 5);
    }, compilableExtensions);
  };

  const MustBeSingleFileProject = __exports.MustBeSingleFileProject = function (file) {
    const ext = System.IO.Path.GetExtension(file);
    return exists(function (e) {
      return 0 === compare(e, ext, 5);
    }, singleFileProjectExtensions);
  };

  return __exports;
}({});
export const SourceFileImpl = function (__exports) {
  const IsInterfaceFile = __exports.IsInterfaceFile = function (file) {
    const ext = System.IO.Path.GetExtension(file);
    return 0 === compare(".fsi", ext, 5);
  };

  const AdditionalDefinesForUseInEditor = __exports.AdditionalDefinesForUseInEditor = function (isInteractive) {
    if (isInteractive) {
      return ofArray(["INTERACTIVE", "EDITING"]);
    } else {
      return ofArray(["COMPILED", "EDITING"]);
    }
  };

  return __exports;
}({});
export class InheritanceOrigin {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.InheritanceOrigin",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Class"], ["Interface"], ["Unknown"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.InheritanceOrigin", InheritanceOrigin);
export class InheritanceContext {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.InheritanceContext",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Class"], ["Interface"], ["Unknown"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.InheritanceContext", InheritanceContext);
export class RecordContext {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.RecordContext",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["CopyOnUpdate", range_20, Tuple([makeGeneric(List, {
        T: "string"
      }), Option("string")])], ["Constructor", "string"], ["New", Tuple([makeGeneric(List, {
        T: "string"
      }), Option("string")])]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.RecordContext", RecordContext);
export class CompletionContext {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.CompletionContext",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Invalid"], ["Inherit", InheritanceContext, Tuple([makeGeneric(List, {
        T: "string"
      }), Option("string")])], ["RecordField", RecordContext], ["RangeOperator"], ["ParameterList", pos_2, makeGeneric(Set, {
        T: "string"
      })], ["AttributeApplication"], ["OpenDeclaration"], ["PatternType"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.CompletionContext", CompletionContext);
export class FSharpParseFileResults {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpParseFileResults",
      properties: {
        DependencyFiles: _Array("string"),
        Errors: _Array(FSharpErrorInfo),
        FileName: "string",
        ParseHadErrors: "boolean",
        ParseTree: Option(ParsedInput)
      }
    };
  }

  constructor(errors, input, parseHadErrors, dependencyFiles) {
    this.errors = errors;
    this.input = input;
    this.parseHadErrors = parseHadErrors;
    this.dependencyFiles = dependencyFiles;
  }

  static [".ctor"](errors, input, parseHadErrors, dependencyFiles, _arg1) {
    return new FSharpParseFileResults(errors, input, parseHadErrors, dependencyFiles);
  }

  get Errors() {
    return this.errors;
  }

  get ParseHadErrors() {
    return this.parseHadErrors;
  }

  get ParseTree() {
    return this.input;
  }

  FindNoteworthyParamInfoLocations(pos) {
    if (this.input != null) {
      return FSharpNoteworthyParamInfoLocations.Find(pos, getValue(this.input));
    } else {
      return null;
    }
  }

  GetNavigationItemsImpl() {
    return ((arg00, arg10, arg20) => ErrorScope.Protect(arg00, arg10, arg20))(range0, () => this.input != null ? getValue(this.input).tag === 1 ? NavigationImpl.empty : NavigationImpl.getNavigationFromImplFile(getValue(this.input).data.data[5]) : NavigationImpl.empty, err => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in GetNavigationItemsImpl: '%s'"))(err));
      return NavigationImpl.empty;
    });
  }

  ValidateBreakpointLocationImpl(pos) {
    const isMatchRange = m => {
      if (rangeContainsPos(m, pos)) {
        return true;
      } else {
        return m.StartLine === pos.Line;
      }
    };

    const findBreakPoints = () => {
      const checkRange = m_1 => {
        return toList(delay(() => isMatchRange(m_1) ? singleton(m_1) : empty()));
      };

      const walkBindSeqPt = sp => {
        return toList(delay(() => sp.tag === 0 ? checkRange(sp.data) : empty()));
      };

      const walkForSeqPt = sp_1 => {
        return toList(delay(() => sp_1.tag === 0 ? checkRange(sp_1.data) : empty()));
      };

      const walkWhileSeqPt = sp_2 => {
        return toList(delay(() => sp_2.tag === 0 ? checkRange(sp_2.data) : empty()));
      };

      const walkTrySeqPt = sp_3 => {
        return toList(delay(() => sp_3.tag === 0 ? checkRange(sp_3.data) : empty()));
      };

      const walkWithSeqPt = sp_4 => {
        return toList(delay(() => sp_4.tag === 0 ? checkRange(sp_4.data) : empty()));
      };

      const walkFinallySeqPt = sp_5 => {
        return toList(delay(() => sp_5.tag === 0 ? checkRange(sp_5.data) : empty()));
      };

      const walkBind = _arg2 => {
        const memFlagsOpt = _arg2.data[6].data[0];
        return toList(delay(() => {
          var args;
          let isFunction;

          if (memFlagsOpt != null) {
            isFunction = true;
          } else {
            const $var1 = _arg2.data[7].tag === 7 ? _arg2.data[7].data[3].tag === 0 ? (args = _arg2.data[7].data[3].data, !(args.tail == null)) ? [0, _arg2.data[7].data[3].data] : [1] : [1] : [1];

            switch ($var1[0]) {
              case 0:
                isFunction = true;
                break;

              case 1:
                isFunction = false;
                break;
            }
          }

          return append_1(!isFunction ? walkBindSeqPt(_arg2.data[11]) : empty(), delay(() => walkExpr(isFunction ? true : _arg2.data[11].tag === 0 ? false : true, _arg2.data[9])));
        }));
      };

      const walkExprs = es => {
        return collect_1(CurriedLambda(walkExpr)(false), es);
      };

      const walkBinds = es_1 => {
        return collect_1(walkBind, es_1);
      };

      const walkMatchClauses = cl => {
        return toList(delay(() => collect_2(matchValue => append_1(matchValue.data[1] != null ? walkExpr(false, getValue(matchValue.data[1])) : empty(), delay(() => walkExpr(true, matchValue.data[2]))), cl)));
      };

      const walkExprOpt = (spAlways, eOpt) => {
        return toList(delay(() => eOpt != null ? walkExpr(spAlways, getValue(eOpt)) : empty()));
      };

      const IsBreakableExpression = e => {
        switch (e.tag) {
          case 17:
          case 27:
          case 11:
          case 12:
          case 10:
            return true;

          default:
            return !IsControlFlowExpression(e);
        }
      };

      const walkExpr = (spAlways_1, e_1) => {
        const m_2 = e_1.Range;

        if (!isMatchRange(m_2)) {
          return new List();
        } else {
          return toList(delay(() => append_1((spAlways_1 ? IsBreakableExpression(e_1) : false) ? checkRange(m_2) : empty(), delay(() => {
            var e_2;
            const $var2 = e_1.tag === 29 ? [0] : e_1.tag === 51 ? [0] : e_1.tag === 52 ? [0] : e_1.tag === 42 ? [0] : e_1.tag === 28 ? [0] : e_1.tag === 46 ? [0] : e_1.tag === 2 ? [0] : e_1.tag === 1 ? [1, e_1.data[2]] : e_1.tag === 37 ? [1, e_1.data[0]] : e_1.tag === 38 ? [1, e_1.data[0]] : e_1.tag === 43 ? [1, e_1.data[1]] : e_1.tag === 14 ? [1, e_1.data[2]] : e_1.tag === 13 ? [1, e_1.data[1]] : e_1.tag === 3 ? [1, e_1.data[0]] : e_1.tag === 56 ? [1, e_1.data[0]] : e_1.tag === 57 ? [1, e_1.data[0]] : e_1.tag === 18 ? [1, e_1.data[0]] : e_1.tag === 19 ? [1, e_1.data[0]] : e_1.tag === 58 ? [1, e_1.data[0]] : e_1.tag === 31 ? [1, e_1.data[0]] : e_1.tag === 30 ? [1, e_1.data[1]] : e_1.tag === 8 ? [1, e_1.data[2]] : e_1.tag === 21 ? [1, e_1.data[0]] : e_1.tag === 53 ? [1, e_1.data[0]] : e_1.tag === 39 ? [1, e_1.data[0]] : e_1.tag === 40 ? [1, e_1.data[0]] : e_1.tag === 41 ? [1, e_1.data[0]] : e_1.tag === 25 ? [1, e_1.data[0]] : e_1.tag === 44 ? [1, e_1.data[2]] : e_1.tag === 0 ? [1, e_1.data[0]] : e_1.tag === 47 ? [2, e_1.data[1]] : e_1.tag === 48 ? [2, e_1.data[1]] : e_1.tag === 50 ? [2, e_1.data[0]] : e_1.tag === 35 ? [3, e_1.data[1], e_1.data[2]] : e_1.tag === 32 ? [3, e_1.data[0], e_1.data[2]] : e_1.tag === 54 ? [3, e_1.data[0], e_1.data[3]] : e_1.tag === 20 ? [3, e_1.data[2], e_1.data[3]] : e_1.tag === 6 ? [4, e_1.data[1]] : e_1.tag === 4 ? [4, e_1.data[0]] : e_1.tag === 5 ? [4, e_1.data[0]] : e_1.tag === 7 ? [5] : e_1.tag === 9 ? [6] : e_1.tag === 10 ? [7] : e_1.tag === 45 ? [8] : e_1.tag === 11 ? [9] : e_1.tag === 12 ? [10] : e_1.tag === 16 ? [11] : e_1.tag === 15 ? [12] : e_1.tag === 17 ? [13] : e_1.tag === 22 ? [14] : e_1.tag === 23 ? [15] : e_1.tag === 24 ? [16] : e_1.tag === 26 ? [17] : e_1.tag === 27 ? [18] : e_1.tag === 33 ? [19] : e_1.tag === 34 ? [20] : e_1.tag === 36 ? [21] : e_1.tag === 49 ? [22] : [0];

            switch ($var2[0]) {
              case 0:
                return empty();

              case 1:
                return walkExpr(false, $var2[1]);

              case 2:
                return append_1(checkRange($var2[1].Range), delay(() => walkExpr(false, $var2[1])));

              case 3:
                return append_1(walkExpr(false, $var2[1]), delay(() => walkExpr(false, $var2[2])));

              case 4:
                return walkExprs($var2[1]);

              case 5:
                return append_1(e_1.data[1] == null ? empty() : (e_2 = getValue(e_1.data[1])[0], walkExpr(true, e_2)), delay(() => walkExprs(choose(x => x, map(tupledArg => tupledArg[1], e_1.data[2])))));

              case 6:
                return append_1(walkBinds(e_1.data[2]), delay(() => collect_2(matchValue_1 => walkBinds(matchValue_1.data[1]), e_1.data[3])));

              case 7:
                return append_1(walkWhileSeqPt(e_1.data[0]), delay(() => append_1(walkExpr(false, e_1.data[1]), delay(() => walkExpr(true, e_1.data[2])))));

              case 8:
                return append_1(walkExpr(false, e_1.data[0]), delay(() => walkExpr(false, e_1.data[2])));

              case 9:
                return append_1(walkForSeqPt(e_1.data[0]), delay(() => append_1(walkExpr(false, e_1.data[2]), delay(() => append_1(walkExpr(true, e_1.data[4]), delay(() => walkExpr(true, e_1.data[5])))))));

              case 10:
                return append_1(walkForSeqPt(e_1.data[0]), delay(() => append_1(walkExpr(false, e_1.data[4]), delay(() => walkExpr(true, e_1.data[5])))));

              case 11:
                return append_1(walkBindSeqPt(e_1.data[3]), delay(() => collect_2(matchValue_2 => append_1(walkExprOpt(false, matchValue_2.data[1]), delay(() => walkExpr(true, matchValue_2.data[2]))), e_1.data[2])));

              case 12:
                return walkExpr(true, e_1.data[3]);

              case 13:
                return append_1(walkBindSeqPt(e_1.data[0]), delay(() => append_1(walkExpr(false, e_1.data[1]), delay(() => collect_2(matchValue_3 => append_1(walkExprOpt(false, matchValue_3.data[1]), delay(() => walkExpr(true, matchValue_3.data[2]))), e_1.data[2])))));

              case 14:
                return append_1(walkBinds(e_1.data[2]), delay(() => walkExpr(true, e_1.data[3])));

              case 15:
                return append_1(walkTrySeqPt(e_1.data[5]), delay(() => append_1(walkWithSeqPt(e_1.data[6]), delay(() => append_1(walkExpr(true, e_1.data[0]), delay(() => (arg00 => walkMatchClauses(arg00))(e_1.data[2])))))));

              case 16:
                return append_1(walkExpr(true, e_1.data[0]), delay(() => append_1(walkExpr(true, e_1.data[1]), delay(() => append_1(walkTrySeqPt(e_1.data[3]), delay(() => walkFinallySeqPt(e_1.data[4])))))));

              case 17:
                return append_1(walkExpr(e_1.data[0].tag === 2 ? false : true, e_1.data[2]), delay(() => walkExpr(e_1.data[0].tag === 1 ? false : true, e_1.data[3])));

              case 18:
                return append_1(walkBindSeqPt(e_1.data[3]), delay(() => append_1(walkExpr(false, e_1.data[0]), delay(() => append_1(walkExpr(true, e_1.data[1]), delay(() => walkExprOpt(true, e_1.data[2])))))));

              case 19:
                return append_1(walkExpr(false, e_1.data[0]), delay(() => walkExprs(toList(delay(() => collect_2(e_3 => e_3.Exprs, e_1.data[1]))))));

              case 20:
                return append_1(walkExpr(false, e_1.data[0]), delay(() => append_1(walkExprs(toList(delay(() => collect_2(e_4 => e_4.Exprs, e_1.data[1])))), delay(() => walkExpr(false, e_1.data[2])))));

              case 21:
                return append_1(walkExpr(false, e_1.data[0]), delay(() => append_1(walkExpr(false, e_1.data[2]), delay(() => walkExpr(false, e_1.data[3])))));

              case 22:
                return append_1(walkBindSeqPt(e_1.data[0]), delay(() => append_1(walkExpr(true, e_1.data[4]), delay(() => walkExpr(true, e_1.data[5])))));
            }
          }))));
        }
      };

      const walkTycon = _arg3 => {
        if (!isMatchRange(_arg3.data[3])) {
          return new List();
        } else {
          return toList(delay(() => append_1(collect_2(memb => walkMember(memb), _arg3.data[2]), delay(() => _arg3.data[1].tag === 0 ? collect_2(memb_1 => walkMember(memb_1), _arg3.data[1].data[1]) : empty()))));
        }
      };

      const walkMember = memb_2 => {
        if (!rangeContainsPos(memb_2.Range, pos)) {
          return new List();
        } else {
          return toList(delay(() => {
            const $var3 = memb_2.tag === 4 ? [0, memb_2.data[0]] : memb_2.tag === 10 ? [1, memb_2.data[7], memb_2.data[0], memb_2.data[2], memb_2.data[1], memb_2.data[4], memb_2.data[3], memb_2.data[6], memb_2.data[8]] : memb_2.tag === 2 ? [2, memb_2.data[4]] : memb_2.tag === 1 ? [3, memb_2.data[0]] : memb_2.tag === 6 ? memb_2.data[1] != null ? [4, memb_2.data[0], getValue(memb_2.data[1])] : [6] : memb_2.tag === 7 ? [5, memb_2.data[2]] : [6];

            switch ($var3[0]) {
              case 0:
                return walkBinds($var3[1]);

              case 1:
                return walkExpr(true, $var3[8]);

              case 2:
                return checkRange($var3[1]);

              case 3:
                return walkBind($var3[1]);

              case 4:
                return collect_2(m_3 => walkMember(m_3), $var3[2]);

              case 5:
                return checkRange($var3[1]);

              case 6:
                return empty();
            }
          }));
        }
      };

      const walkDecl = decl => {
        return toList(delay(() => {
          var membDefns;
          const $var4 = decl.tag === 2 ? isMatchRange(decl.data[2]) ? [0, decl.data[1], decl.data[2]] : [1] : [1];

          switch ($var4[0]) {
            case 0:
              return walkBinds($var4[1]);

            case 1:
              const $var5 = decl.tag === 3 ? isMatchRange(decl.data[2]) ? [0, decl.data[1], decl.data[2], decl.data[0]] : [1] : [1];

              switch ($var5[0]) {
                case 0:
                  return append_1(walkBindSeqPt($var5[3]), delay(() => walkExpr(false, $var5[1])));

                case 1:
                  const $var6 = decl.tag === 0 ? [0] : decl.tag === 1 ? isMatchRange(decl.data[4]) ? [1, decl.data[1], decl.data[2], decl.data[4]] : [2] : [2];

                  switch ($var6[0]) {
                    case 0:
                      return empty();

                    case 1:
                      return collect_2(d => walkDecl(d), $var6[2]);

                    case 2:
                      const $var7 = decl.tag === 4 ? isMatchRange(decl.data[1]) ? [0, decl.data[1], decl.data[0]] : [1] : [1];

                      switch ($var7[0]) {
                        case 0:
                          return collect_2(d_1 => walkTycon(d_1), $var7[2]);

                        case 1:
                          const $var8 = decl.tag === 5 ? (membDefns = decl.data[0].data[1], isMatchRange(decl.data[1])) ? [0, decl.data[1], decl.data[0].data[1]] : [1] : [1];

                          switch ($var8[0]) {
                            case 0:
                              return collect_2(m_4 => walkMember(m_4), $var8[2]);

                            case 1:
                              return empty();
                          }

                      }

                  }

              }

          }
        }));
      };

      const walkModule = _arg4 => {
        if (isMatchRange(_arg4.data[7])) {
          return collect_1(walkDecl, _arg4.data[3]);
        } else {
          return new List();
        }
      };

      const walkImplFile = modules => {
        return collect_1(walkModule, modules);
      };

      const $var9 = this.input != null ? getValue(this.input).tag === 0 ? [0, getValue(this.input).data.data[5]] : [1] : [1];

      switch ($var9[0]) {
        case 0:
          return walkImplFile($var9[1]);

        case 1:
          return new List();
      }
    };

    return ((arg00_1, arg10, arg20) => ErrorScope.Protect(arg00_1, arg10, arg20))(range0, () => {
      const locations = findBreakPoints();

      if (pos.Column === 0) {
        const matchValue_4 = filter(m_5 => m_5.StartLine === m_5.EndLine ? pos.Line === m_5.StartLine : false, locations);

        if (matchValue_4.tail == null) {
          const matchValue_5 = filter(m_6 => rangeContainsPos(m_6, pos), locations);

          if (matchValue_5.tail == null) {
            const matchValue_6 = filter(m_7 => !rangeBeforePos(m_7, pos), locations);

            if (matchValue_6.tail == null) {
              return tryHead(locations);
            } else {
              return tryHead(matchValue_6);
            }
          } else {
            return tryLast(matchValue_5);
          }
        } else {
          return tryHead(matchValue_4);
        }
      } else {
        const matchValue_7 = filter(m_8 => rangeContainsPos(m_8, pos), locations);

        if (matchValue_7.tail == null) {
          const matchValue_8 = filter(m_9 => !rangeBeforePos(m_9, pos), locations);

          if (matchValue_8.tail == null) {
            return tryHead(locations);
          } else {
            return tryHead(matchValue_8);
          }
        } else {
          return tryLast(matchValue_7);
        }
      }
    }, msg => {
      System.Diagnostics.Trace.TraceInformation(toText(printf("FCS: recovering from error in ValidateBreakpointLocationImpl: '%s'"))(msg));
      return null;
    });
  }

  get DependencyFiles() {
    return this.dependencyFiles;
  }

  get FileName() {
    const $var10 = this.input != null ? getValue(this.input).tag === 1 ? [0, getValue(this.input).data.data[0]] : [0, getValue(this.input).data.data[0]] : [1];

    switch ($var10[0]) {
      case 0:
        return $var10[1];

      case 1:
        return "";
    }
  }

  GetNavigationItems() {
    return this.GetNavigationItemsImpl();
  }

  ValidateBreakpointLocation(pos) {
    return this.ValidateBreakpointLocationImpl(pos);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpParseFileResults", FSharpParseFileResults);
export class ModuleKind {
  constructor(isAutoOpen, hasModuleSuffix) {
    this.IsAutoOpen = isAutoOpen;
    this.HasModuleSuffix = hasModuleSuffix;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.ModuleKind",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        IsAutoOpen: "boolean",
        HasModuleSuffix: "boolean"
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
setType("Microsoft.FSharp.Compiler.SourceCodeServices.ModuleKind", ModuleKind);
export class EntityKind {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.EntityKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Attribute"], ["Type"], ["FunctionOrValue", "boolean"], ["Module", ModuleKind]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  ToString() {
    return toText(printf("%A"))(this);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.EntityKind", EntityKind);
export const UntypedParseImpl = function (__exports) {
  const emptyStringSet = __exports.emptyStringSet = new Set();

  const GetRangeOfExprLeftOfDot = __exports.GetRangeOfExprLeftOfDot = function (pos, parseTreeOpt) {
    if (parseTreeOpt != null) {
      const CheckLongIdent = function (longIdent) {
        var copyOfStruct_1;
        let r;
        let copyOfStruct = longIdent.head;
        r = copyOfStruct.idRange;
        let couldBeBeforeFront = true;

        for (let i of longIdent) {
          if (posGeq(pos, (copyOfStruct_1 = i.idRange, copyOfStruct_1.End))) {
            r = unionRanges(r, i.idRange);
            couldBeBeforeFront = false;
          }
        }

        return [couldBeBeforeFront, r];
      };

      return Traverse(pos, getValue(parseTreeOpt), new class extends AstVisitorBase {
        constructor() {
          return super();
        }

        VisitExpr(_path, traverseSynExpr, defaultTraverse, expr) {
          var ident;
          const $var11 = expr.tag === 29 ? [0, expr.data[2], expr.data[3], expr.data[1].data[0]] : expr.tag === 30 ? [1, expr.data[2], expr.data[0].data[0], expr.data[1]] : expr.tag === 31 ? [2, expr.data[1], expr.data[3], expr.data[2].data[0], expr.data[0]] : expr.tag === 32 ? [3, expr.data[3], expr.data[1].data[0], expr.data[0], expr.data[2]] : expr.tag === 36 ? [4, expr.data[4], expr.data[1].data[0], expr.data[0], expr.data[2], expr.data[3]] : expr.tag === 57 ? [5, expr.data[1], expr.data[0]] : expr.tag === 56 ? [6, expr.data[1], expr.data[0]] : expr.tag === 20 ? expr.data[0] === 1 ? expr.data[1] ? expr.data[2].tag === 28 ? (ident = expr.data[2].data, ident.idText === "op_ArrayLookup" ? !rangeContainsPosLeftEdgeInclusive(expr.data[3].Range, pos) : false) ? [7, expr.data[2].data, expr.data[3]] : [8] : [8] : [8] : [8] : [8];

          switch ($var11[0]) {
            case 0:
              const patternInput = CheckLongIdent($var11[3]);
              return patternInput[1];

            case 1:
              if (rangeContainsPosLeftEdgeInclusive($var11[3].Range, pos)) {
                return traverseSynExpr($var11[3]);
              } else {
                const patternInput_1 = CheckLongIdent($var11[2]);
                return patternInput_1[1];
              }

            case 2:
              if (rangeContainsPosLeftEdgeInclusive($var11[4].Range, pos)) {
                return traverseSynExpr($var11[4]);
              } else {
                const patternInput_2 = CheckLongIdent($var11[3]);

                if (patternInput_2[0]) {
                  return $var11[4].Range;
                } else {
                  return unionRanges($var11[4].Range, patternInput_2[1]);
                }
              }

            case 3:
              if (rangeContainsPosLeftEdgeInclusive($var11[3].Range, pos)) {
                return traverseSynExpr($var11[3]);
              } else if (rangeContainsPosLeftEdgeInclusive($var11[4].Range, pos)) {
                return traverseSynExpr($var11[4]);
              } else {
                const patternInput_3 = CheckLongIdent($var11[2]);

                if (patternInput_3[0]) {
                  return $var11[3].Range;
                } else {
                  return unionRanges($var11[3].Range, patternInput_3[1]);
                }
              }

            case 4:
              if (rangeContainsPosLeftEdgeInclusive($var11[3].Range, pos)) {
                return traverseSynExpr($var11[3]);
              } else if (rangeContainsPosLeftEdgeInclusive($var11[4].Range, pos)) {
                return traverseSynExpr($var11[4]);
              } else if (rangeContainsPosLeftEdgeInclusive($var11[5].Range, pos)) {
                return traverseSynExpr($var11[5]);
              } else {
                const patternInput_4 = CheckLongIdent($var11[2]);

                if (patternInput_4[0]) {
                  return $var11[3].Range;
                } else {
                  return unionRanges($var11[3].Range, patternInput_4[1]);
                }
              }

            case 5:
              if (rangeContainsPosLeftEdgeInclusive($var11[2].Range, pos)) {
                return traverseSynExpr($var11[2]);
              } else {
                return $var11[2].Range;
              }

            case 6:
              if (rangeContainsPosLeftEdgeInclusive($var11[2].Range, pos)) {
                return traverseSynExpr($var11[2]);
              } else {
                return $var11[1];
              }

            case 7:
              const matchValue = defaultTraverse(expr);

              if (matchValue == null) {
                return expr.Range;
              } else {
                return matchValue;
              }

            case 8:
              const $var12 = expr.tag === 2 ? expr.data[0].tag === 13 ? [0, expr.data[1]] : [1] : [1];

              switch ($var12[0]) {
                case 0:
                  return $var12[1];

                case 1:
                  return defaultTraverse(expr);
              }

          }
        }

        [_Symbol.reflection]() {
          return {
            interfaces: ["Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.AstVisitorBase"]
          };
        }

      }());
    } else {
      return null;
    }
  };

  const TryFindExpressionIslandInPosition = __exports.TryFindExpressionIslandInPosition = function (pos, parseTreeOpt) {
    if (parseTreeOpt != null) {
      const getLidParts = function (lid) {
        return toList(map_1(function (i) {
          return i.idText;
        }, takeWhile(function (i_1) {
          var copyOfStruct;
          return posGeq(pos, (copyOfStruct = i_1.idRange, copyOfStruct.Start));
        }, lid)));
      };

      const TryGetExpression = function (foundCandidate, expr) {
        var lid_1;

        TryGetExpression: while (true) {
          const $var13 = expr.tag === 0 ? foundCandidate ? [0, expr.data[0]] : [1] : [1];

          switch ($var13[0]) {
            case 0:
              foundCandidate = foundCandidate;
              expr = $var13[1];
              continue TryGetExpression;

            case 1:
              const $var14 = expr.tag === 29 ? [0, expr.data[2], expr.data[0], expr.data[3], expr.data[1].data[0]] : expr.tag === 31 ? (lid_1 = expr.data[2].data[0], rangeContainsPos(rangeOfLid(lid_1), pos) ? true : foundCandidate) ? [1, expr.data[0], expr.data[2].data[0]] : [2] : [2];

              switch ($var14[0]) {
                case 0:
                  return getLidParts($var14[4]);

                case 1:
                  const leftPartResult = TryGetExpression(true, $var14[1]);

                  if (leftPartResult == null) {
                    return null;
                  } else {
                    return toList(delay(function () {
                      return append_1(getValue(leftPartResult), delay(function () {
                        return getLidParts($var14[2]);
                      }));
                    }));
                  }

                case 2:
                  if (expr.tag === 56) {
                    foundCandidate = foundCandidate;
                    expr = expr.data[0];
                    continue TryGetExpression;
                  } else {
                    return null;
                  }

              }

          }
        }
      };

      const walker = new class extends AstVisitorBase {
        constructor() {
          return super();
        }

        VisitExpr(_path, traverseSynExpr, defaultTraverse, expr_1) {
          if (rangeContainsPos(expr_1.Range, pos)) {
            const matchValue = TryGetExpression(false, expr_1);

            if (matchValue != null) {
              return join(".", getValue(matchValue));
            } else {
              return defaultTraverse(expr_1);
            }
          } else {
            return null;
          }
        }

        [_Symbol.reflection]() {
          return {
            interfaces: ["Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.AstVisitorBase"]
          };
        }

      }();
      return Traverse(pos, getValue(parseTreeOpt), walker);
    } else {
      return null;
    }
  };

  const TryFindExpressionASTLeftOfDotLeftOfCursor = __exports.TryFindExpressionASTLeftOfDotLeftOfCursor = function (pos, parseTreeOpt) {
    if (parseTreeOpt != null) {
      const dive = function (x, range, project) {
        return dive_1(x, range, project);
      };

      const pick = function (x_1, _debugObj, diveResults) {
        return pick_2(pos, x_1, _debugObj, diveResults);
      };

      const walker = new class extends AstVisitorBase {
        constructor() {
          return super();
        }

        VisitExpr(_path, traverseSynExpr, defaultTraverse, expr) {
          var copyOfStruct;
          var ident;
          var copyOfStruct_7;
          var copyOfStruct_9;
          var copyOfStruct_10;
          const pick_1 = CurriedLambda(pick)(expr.Range);
          const patternInput = [traverseSynExpr, defaultTraverse, expr];

          if (!rangeContainsPos(patternInput[2].Range, pos)) {
            if (patternInput[2].tag === 57) {
              const matchValue = patternInput[0](patternInput[2].data[0]);

              if (matchValue == null) {
                return [(copyOfStruct = patternInput[2].data[0].Range, copyOfStruct.End), false];
              } else {
                return matchValue;
              }
            } else {
              return null;
            }
          } else {
            const traverseLidOrElse = (optExprIfLeftOfLongId, _arg1) => {
              var copyOfStruct_1;
              var copyOfStruct_2;
              var copyOfStruct_4;
              var copyOfStruct_3;
              var copyOfStruct_6;
              var copyOfStruct_5;
              const resultIfLeftOfLongId = optExprIfLeftOfLongId != null ? [(copyOfStruct_1 = getValue(optExprIfLeftOfLongId).Range, copyOfStruct_1.End), posGeq((copyOfStruct_2 = _arg1.Range, copyOfStruct_2.Start), pos)] : null;
              const matchValue_1 = tryFind(tupledArg => posGt(pos, tupledArg[1].Start), reverse(mapIndexed((i, x_2) => [i, x_2], _arg1.data[1])));

              if (matchValue_1 != null) {
                const n = getValue(matchValue_1)[0] | 0;
                return [(copyOfStruct_4 = (copyOfStruct_3 = item(n, _arg1.data[0]), copyOfStruct_3.idRange), copyOfStruct_4.End), _arg1.data[0].length === n + 1 ? true : posGeq((copyOfStruct_6 = (copyOfStruct_5 = item(n + 1, _arg1.data[0]), copyOfStruct_5.idRange), copyOfStruct_6.Start), pos)];
              } else {
                return resultIfLeftOfLongId;
              }
            };

            const $var15 = patternInput[2].tag === 29 ? [0, patternInput[2].data[2], patternInput[2].data[0], patternInput[2].data[3], patternInput[2].data[1]] : patternInput[2].tag === 30 ? [1, patternInput[2].data[2], patternInput[2].data[1], patternInput[2].data[0]] : patternInput[2].tag === 31 ? [2, patternInput[2].data[3], patternInput[2].data[1], patternInput[2].data[0], patternInput[2].data[2]] : patternInput[2].tag === 32 ? [3, patternInput[2].data[3], patternInput[2].data[0], patternInput[2].data[2], patternInput[2].data[1]] : patternInput[2].tag === 35 ? [4, patternInput[2].data[3], patternInput[2].data[1], patternInput[2].data[2], patternInput[2].data[0]] : patternInput[2].tag === 36 ? [5, patternInput[2].data[4], patternInput[2].data[2], patternInput[2].data[0], patternInput[2].data[3], patternInput[2].data[1]] : patternInput[2].tag === 2 ? patternInput[2].data[0].tag === 13 ? [6, patternInput[2].data[1]] : [9] : patternInput[2].tag === 57 ? [7, patternInput[2].data[0], patternInput[2].data[1]] : patternInput[2].tag === 20 ? patternInput[2].data[0] === 1 ? patternInput[2].data[1] ? patternInput[2].data[2].tag === 28 ? (ident = patternInput[2].data[2].data, ident.idText === "op_ArrayLookup" ? !rangeContainsPosLeftEdgeInclusive(patternInput[2].data[3].Range, pos) : false) ? [8, patternInput[2].data[4], patternInput[2].data[2].data, patternInput[2].data[3]] : [9] : [9] : [9] : [9] : [9];

            switch ($var15[0]) {
              case 0:
                return traverseLidOrElse(null, $var15[4]);

              case 1:
                return CurriedLambda(pick_1)(patternInput[2])(ofArray([dive($var15[3], $var15[3].Range, CurriedLambda(traverseLidOrElse)(null)), dive($var15[2], $var15[2].Range, patternInput[0])]));

              case 2:
                const afterDotBeforeLid = mkRange($var15[2].FileName, $var15[2].End, (copyOfStruct_7 = $var15[4].Range, copyOfStruct_7.Start));
                return CurriedLambda(pick_1)(patternInput[2])(ofArray([dive($var15[3], $var15[3].Range, patternInput[0]), dive($var15[3], afterDotBeforeLid, e => {
                  var copyOfStruct_8;
                  return [(copyOfStruct_8 = e.Range, copyOfStruct_8.End), true];
                }), dive($var15[4], $var15[4].Range, CurriedLambda(traverseLidOrElse)($var15[3]))]));

              case 3:
                return CurriedLambda(pick_1)(patternInput[2])(ofArray([dive($var15[2], $var15[2].Range, patternInput[0]), dive($var15[4], $var15[4].Range, CurriedLambda(traverseLidOrElse)($var15[2])), dive($var15[3], $var15[3].Range, patternInput[0])]));

              case 4:
                return CurriedLambda(pick_1)(patternInput[2])(ofArray([dive($var15[4], $var15[4].Range, CurriedLambda(traverseLidOrElse)(null)), dive($var15[2], $var15[2].Range, patternInput[0]), dive($var15[3], $var15[3].Range, patternInput[0])]));

              case 5:
                return CurriedLambda(pick_1)(patternInput[2])(ofArray([dive($var15[3], $var15[3].Range, patternInput[0]), dive($var15[5], $var15[5].Range, CurriedLambda(traverseLidOrElse)($var15[3])), dive($var15[2], $var15[2].Range, patternInput[0]), dive($var15[4], $var15[4].Range, patternInput[0])]));

              case 6:
                if (posEq($var15[1].End, pos)) {
                  return [$var15[1].End, false];
                } else {
                  return null;
                }

              case 7:
                const matchValue_2 = patternInput[0]($var15[1]);

                if (matchValue_2 == null) {
                  if (posEq($var15[2].End, pos)) {
                    return [(copyOfStruct_9 = $var15[1].Range, copyOfStruct_9.End), false];
                  } else {
                    return null;
                  }
                } else {
                  return matchValue_2;
                }

              case 8:
                const matchValue_3 = patternInput[1](patternInput[2]);

                if (matchValue_3 == null) {
                  return [(copyOfStruct_10 = $var15[3].Range, copyOfStruct_10.End), false];
                } else {
                  return matchValue_3;
                }

              case 9:
                return patternInput[1](patternInput[2]);
            }
          }
        }

        [_Symbol.reflection]() {
          return {
            interfaces: ["Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.AstVisitorBase"]
          };
        }

      }();
      return Traverse(pos, getValue(parseTreeOpt), walker);
    } else {
      return null;
    }
  };

  const GetEntityKind = __exports.GetEntityKind = function (pos, input) {
    const _ConstructorPats_ = function (_arg1) {
      if (_arg1.tag === 1) {
        return map(function (tuple) {
          return tuple[1];
        }, _arg1.data[0]);
      } else {
        return _arg1.data;
      }
    };

    const _Sequentials___ = function (_arg2) {
      let $var16;

      if (_arg2.tag === 26) {
        const activePatternResult53952 = _Sequentials___(_arg2.data[3]);

        if (activePatternResult53952 != null) {
          $var16 = [0, _arg2.data[2], getValue(activePatternResult53952)];
        } else {
          $var16 = [1];
        }
      } else {
        $var16 = [1];
      }

      switch ($var16[0]) {
        case 0:
          return new List($var16[1], $var16[2]);

        case 1:
          if (_arg2.tag === 26) {
            return ofArray([_arg2.data[2], _arg2.data[3]]);
          } else {
            return null;
          }

      }
    };

    const walkImplFileInput = function (_arg3) {
      return tryPick(CurriedLambda(walkSynModuleOrNamespace)(true), _arg3.data[5]);
    };

    const walkSynModuleOrNamespace = function (isTopLevel, _arg4) {
      return defaultArg(tryPick(walkAttribute, _arg4.data[5]), function (range, f) {
        return function (range_1) {
          return rangeContainsPos(range_1, pos);
        }(range) ? f() : null;
      }(_arg4.data[7], function () {
        return tryPick(CurriedLambda(walkSynModuleDecl)(isTopLevel), _arg4.data[3]);
      }));
    };

    const walkAttribute = function (attr) {
      return defaultArg(function (range_2) {
        return rangeContainsPos(range_2, pos);
      }(attr.Range) ? new EntityKind(0) : null, walkExprWithKind(new EntityKind(1), attr.ArgExpr));
    };

    const walkTypar = function (_arg5) {
      return function (range_3, f_1) {
        return function (range_4) {
          return rangeContainsPos(range_4, pos);
        }(range_3) ? f_1() : null;
      }(_arg5.data[0].idRange, function () {
        return new EntityKind(1);
      });
    };

    const walkTyparDecl = function (_arg6) {
      return defaultArg(tryPick(walkAttribute, _arg6.data[0]), walkTypar(_arg6.data[1]));
    };

    const walkTypeConstraint = function (_arg16) {
      switch (_arg16.tag) {
        case 0:
          return walkTypar(_arg16.data[0]);

        case 1:
          return walkTypar(_arg16.data[0]);

        case 2:
          return walkTypar(_arg16.data[0]);

        case 3:
          return walkTypar(_arg16.data[0]);

        case 4:
          return walkTypar(_arg16.data[0]);

        case 5:
          return walkTypar(_arg16.data[0]);

        case 7:
          return defaultArg(walkTypar(_arg16.data[0]), walkType(_arg16.data[1]));

        case 8:
          return defaultArg(tryPick(walkType, _arg16.data[0]), walkMemberSig(_arg16.data[1]));

        case 9:
          return defaultArg(walkTypar(_arg16.data[0]), tryPick(walkType, _arg16.data[1]));

        case 10:
          return defaultArg(walkTypar(_arg16.data[0]), tryPick(walkType, _arg16.data[1]));

        default:
          return defaultArg(walkTypar(_arg16.data[0]), walkType(_arg16.data[1]));
      }
    };

    const walkPatWithKind = function (kind, _arg17) {
      let $var17;

      if (_arg17.tag === 6) {
        $var17 = [0, _arg17.data[0]];
      } else if (_arg17.tag === 2) {
        if (_arg17.data[0].tag === 1) {
          $var17 = [1, _arg17.data[0].data, _arg17.data[0]];
        } else {
          $var17 = [11];
        }
      } else if (_arg17.tag === 3) {
        $var17 = [2, _arg17.data[0], _arg17.data[1]];
      } else if (_arg17.tag === 4) {
        $var17 = [3, _arg17.data[1], _arg17.data[0]];
      } else if (_arg17.tag === 5) {
        $var17 = [4, _arg17.data[0], _arg17.data[1]];
      } else if (_arg17.tag === 7) {
        const activePatternResult53969 = _ConstructorPats_(_arg17.data[3]);

        $var17 = [5, activePatternResult53969, _arg17.data[5], _arg17.data[2]];
      } else if (_arg17.tag === 8) {
        $var17 = [6, _arg17.data[0]];
      } else if (_arg17.tag === 10) {
        $var17 = [7, _arg17.data[0]];
      } else if (_arg17.tag === 11) {
        $var17 = [8, _arg17.data[1]];
      } else if (_arg17.tag === 15) {
        $var17 = [9, _arg17.data[0]];
      } else if (_arg17.tag === 16) {
        $var17 = [10, _arg17.data[0]];
      } else {
        $var17 = [11];
      }

      switch ($var17[0]) {
        case 0:
          return tryPick(walkPat, $var17[1]);

        case 1:
          if (function (range_5) {
            return rangeContainsPos(range_5, pos);
          }($var17[1])) {
            return null;
          } else {
            return walkPat($var17[2]);
          }

        case 2:
          return defaultArg(walkPat($var17[1]), walkType($var17[2]));

        case 3:
          return defaultArg(walkPat($var17[2]), tryPick(walkAttribute, $var17[1]));

        case 4:
          return tryPick(walkPat, ofArray([$var17[1], $var17[2]]));

        case 5:
          return defaultArg(defaultArg(function (range_6, f_2) {
            return function (range_7) {
              return rangeContainsPos(range_7, pos);
            }(range_6) ? f_2() : null;
          }($var17[2], function () {
            return kind;
          }), defaultArg($var17[3], null, function (_arg4_1) {
            return defaultArg(tryPick(walkTyparDecl, _arg4_1.data[0]), tryPick(walkTypeConstraint, _arg4_1.data[2]));
          })), tryPick(walkPat, $var17[1]));

        case 6:
          return tryPick(walkPat, $var17[1]);

        case 7:
          return walkPat($var17[1]);

        case 8:
          return tryPick(walkPat, $var17[1]);

        case 9:
          return walkType($var17[1]);

        case 10:
          return walkExpr($var17[1]);

        case 11:
          return null;
      }
    };

    const walkPat = CurriedLambda(walkPatWithKind)(null);

    const walkBinding = function (_arg7) {
      var t;
      return defaultArg(defaultArg(defaultArg(tryPick(walkAttribute, _arg7.data[4]), walkPat(_arg7.data[7])), walkExpr(_arg7.data[9])), _arg7.data[8] == null ? null : (t = getValue(_arg7.data[8]).data[0], walkType(t)));
    };

    const walkInterfaceImpl = function (_arg8) {
      return tryPick(walkBinding, _arg8.data[1]);
    };

    const walkIndexerArg = function (_arg18) {
      if (_arg18.tag === 0) {
        return tryPick(walkExpr, ofArray([_arg18.data[0], _arg18.data[1]]));
      } else {
        return walkExpr(_arg18.data);
      }
    };

    const walkType = function (_arg19) {
      walkType: while (true) {
        switch (_arg19.tag) {
          case 0:
            try {
              return function (range_8, f_3) {
                return function (range_9) {
                  return rangeContainsPos(range_9, pos);
                }(range_8) ? f_3() : null;
              }(_arg19.data.Range, function () {
                return new EntityKind(1);
              });
            } catch (matchValue) {
              return null;
            }

          case 1:
            return defaultArg(walkType(_arg19.data[0]), tryPick(walkType, _arg19.data[2]));

          case 2:
            return tryPick(walkType, _arg19.data[3]);

          case 3:
            return tryPick(function (tupledArg) {
              return walkType(tupledArg[1]);
            }, _arg19.data[0]);

          case 5:
            _arg19 = _arg19.data[1];
            continue walkType;

          case 6:
            return defaultArg(walkType(_arg19.data[0]), walkType(_arg19.data[1]));

          case 9:
            _arg19 = _arg19.data[0];
            continue walkType;

          case 10:
            _arg19 = _arg19.data[0];
            continue walkType;

          case 11:
            return defaultArg(walkType(_arg19.data[0]), walkType(_arg19.data[1]));

          case 12:
            _arg19 = _arg19.data[0];
            continue walkType;

          default:
            return null;
        }
      }
    };

    const walkClause = function (_arg9) {
      return defaultArg(defaultArg(walkPatWithKind(new EntityKind(1), _arg9.data[0]), walkExpr(_arg9.data[2])), defaultArg(_arg9.data[1], null, walkExpr));
    };

    const walkExprWithKind = function (parentKind, _arg20) {
      walkExprWithKind: while (true) {
        if (_arg20.tag === 29) {
          const $var18 = _arg20.data[1].data[1].tail == null ? function (range_11) {
            return rangeContainsPos(range_11, pos);
          }(_arg20.data[3]) ? [0] : [1] : [1];

          switch ($var18[0]) {
            case 0:
              return defaultArg(parentKind, new EntityKind(2, false));

            case 1:
              if (_arg20.data[1].data[1].tail != null) {
                const firstPartRange = mkRange("", _arg20.data[3].Start, mkPos(_arg20.data[1].data[1].head.StartLine, _arg20.data[1].data[1].head.StartColumn - 1));

                if (function (range_10) {
                  return rangeContainsPos(range_10, pos);
                }(firstPartRange)) {
                  return defaultArg(parentKind, new EntityKind(2, false));
                } else {
                  return null;
                }
              } else {
                return null;
              }

          }
        } else if (_arg20.tag === 0) {
          parentKind = parentKind;
          _arg20 = _arg20.data[0];
          continue walkExprWithKind;
        } else if (_arg20.tag === 1) {
          parentKind = parentKind;
          _arg20 = _arg20.data[2];
          continue walkExprWithKind;
        } else if (_arg20.tag === 3) {
          parentKind = parentKind;
          _arg20 = _arg20.data[0];
          continue walkExprWithKind;
        } else if (_arg20.tag === 4) {
          return tryPick(CurriedLambda(walkExprWithKind)(parentKind), _arg20.data[0]);
        } else if (_arg20.tag === 6) {
          return tryPick(CurriedLambda(walkExprWithKind)(parentKind), _arg20.data[1]);
        } else if (_arg20.tag === 7) {
          return function (range_12, f_4) {
            return function (range_13) {
              return rangeContainsPos(range_13, pos);
            }(range_12) ? f_4() : null;
          }(_arg20.data[3], function () {
            return tryPick(function (tupledArg_1) {
              return defaultArg(tupledArg_1[1], null, CurriedLambda(walkExprWithKind)(parentKind));
            }, _arg20.data[2]);
          });
        } else if (_arg20.tag === 8) {
          return defaultArg(walkExprWithKind(parentKind, _arg20.data[2]), walkType(_arg20.data[1]));
        } else if (_arg20.tag === 9) {
          return defaultArg(defaultArg(walkType(_arg20.data[0]), tryPick(walkBinding, _arg20.data[2])), tryPick(walkInterfaceImpl, _arg20.data[3]));
        } else if (_arg20.tag === 10) {
          return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[1], _arg20.data[2]]));
        } else if (_arg20.tag === 11) {
          return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[2], _arg20.data[4], _arg20.data[5]]));
        } else if (_arg20.tag === 12) {
          return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[4], _arg20.data[5]]));
        } else if (_arg20.tag === 13) {
          parentKind = parentKind;
          _arg20 = _arg20.data[1];
          continue walkExprWithKind;
        } else if (_arg20.tag === 14) {
          parentKind = parentKind;
          _arg20 = _arg20.data[2];
          continue walkExprWithKind;
        } else if (_arg20.tag === 15) {
          parentKind = parentKind;
          _arg20 = _arg20.data[3];
          continue walkExprWithKind;
        } else if (_arg20.tag === 16) {
          return tryPick(walkClause, _arg20.data[2]);
        } else if (_arg20.tag === 17) {
          return defaultArg(walkExprWithKind(parentKind, _arg20.data[1]), tryPick(walkClause, _arg20.data[2]));
        } else if (_arg20.tag === 18) {
          parentKind = parentKind;
          _arg20 = _arg20.data[0];
          continue walkExprWithKind;
        } else if (_arg20.tag === 19) {
          parentKind = parentKind;
          _arg20 = _arg20.data[0];
          continue walkExprWithKind;
        } else if (_arg20.tag === 20) {
          return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[2], _arg20.data[3]]));
        } else if (_arg20.tag === 21) {
          return defaultArg(walkExprWithKind(new EntityKind(1), _arg20.data[0]), tryPick(walkType, _arg20.data[2]));
        } else if (_arg20.tag === 22) {
          return defaultArg(tryPick(walkBinding, _arg20.data[2]), walkExprWithKind(parentKind, _arg20.data[3]));
        } else if (_arg20.tag === 23) {
          return defaultArg(walkExprWithKind(parentKind, _arg20.data[0]), tryPick(walkClause, _arg20.data[2]));
        } else if (_arg20.tag === 24) {
          return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[0], _arg20.data[1]]));
        } else if (_arg20.tag === 25) {
          parentKind = parentKind;
          _arg20 = _arg20.data[0];
          continue walkExprWithKind;
        } else {
          const activePatternResult53985 = _Sequentials___(_arg20);

          if (activePatternResult53985 != null) {
            return tryPick(CurriedLambda(walkExprWithKind)(parentKind), getValue(activePatternResult53985));
          } else {
            switch (_arg20.tag) {
              case 27:
                return defaultArg(tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[0], _arg20.data[1]])), _arg20.data[2] != null ? walkExprWithKind(parentKind, getValue(_arg20.data[2])) : null);

              case 28:
                return function (range_14, f_5) {
                  return function (range_15) {
                    return rangeContainsPos(range_15, pos);
                  }(range_14) ? f_5() : null;
                }(_arg20.data.idRange, function () {
                  return new EntityKind(2, false);
                });

              case 30:
                parentKind = parentKind;
                _arg20 = _arg20.data[1];
                continue walkExprWithKind;

              case 31:
                parentKind = parentKind;
                _arg20 = _arg20.data[0];
                continue walkExprWithKind;

              case 32:
                parentKind = parentKind;
                _arg20 = _arg20.data[0];
                continue walkExprWithKind;

              case 33:
                return defaultArg(walkExprWithKind(parentKind, _arg20.data[0]), tryPick(walkIndexerArg, _arg20.data[1]));

              case 34:
                return defaultArg(walkExprWithKind(parentKind, _arg20.data[0]), tryPick(walkIndexerArg, _arg20.data[1]));

              case 35:
                return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[1], _arg20.data[2]]));

              case 36:
                return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[0], _arg20.data[2], _arg20.data[3]]));

              case 37:
                return defaultArg(walkExprWithKind(parentKind, _arg20.data[0]), walkType(_arg20.data[1]));

              case 38:
                return defaultArg(walkExprWithKind(parentKind, _arg20.data[0]), walkType(_arg20.data[1]));

              case 39:
                return defaultArg(walkExprWithKind(parentKind, _arg20.data[0]), walkType(_arg20.data[1]));

              case 40:
                parentKind = parentKind;
                _arg20 = _arg20.data[0];
                continue walkExprWithKind;

              case 41:
                parentKind = parentKind;
                _arg20 = _arg20.data[0];
                continue walkExprWithKind;

              case 43:
                parentKind = parentKind;
                _arg20 = _arg20.data[1];
                continue walkExprWithKind;

              case 45:
                return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[0], _arg20.data[2]]));

              case 47:
                parentKind = parentKind;
                _arg20 = _arg20.data[1];
                continue walkExprWithKind;

              case 48:
                parentKind = parentKind;
                _arg20 = _arg20.data[1];
                continue walkExprWithKind;

              case 49:
                return tryPick(CurriedLambda(walkExprWithKind)(parentKind), ofArray([_arg20.data[4], _arg20.data[5]]));

              case 50:
                parentKind = parentKind;
                _arg20 = _arg20.data[0];
                continue walkExprWithKind;

              case 44:
                return defaultArg(defaultArg(tryPick(walkTypar, _arg20.data[0]), walkMemberSig(_arg20.data[1])), walkExprWithKind(parentKind, _arg20.data[2]));

              default:
                return null;
            }
          }
        }
      }
    };

    const walkExpr = CurriedLambda(walkExprWithKind)(null);

    const walkSimplePat = function (_arg21) {
      if (_arg21.tag === 2) {
        return defaultArg(walkSimplePat(_arg21.data[0]), tryPick(walkAttribute, _arg21.data[1]));
      } else if (_arg21.tag === 1) {
        return defaultArg(walkSimplePat(_arg21.data[0]), walkType(_arg21.data[1]));
      } else {
        return null;
      }
    };

    const walkField = function (_arg10_1) {
      return defaultArg(tryPick(walkAttribute, _arg10_1.data[0]), walkType(_arg10_1.data[3]));
    };

    const walkValSig = function (_arg11) {
      return defaultArg(tryPick(walkAttribute, _arg11.data[0]), walkType(_arg11.data[3]));
    };

    const walkMemberSig = function (_arg22) {
      switch (_arg22.tag) {
        case 0:
          return walkValSig(_arg22.data[0]);

        case 1:
          return walkType(_arg22.data[0]);

        case 3:
          return walkField(_arg22.data[0]);

        case 4:
          const repr = _arg22.data[0].data[1];
          const memberSigs = _arg22.data[0].data[2];
          const info = _arg22.data[0].data[0];
          return defaultArg(defaultArg(walkComponentInfo(false, info), walkTypeDefnSigRepr(repr)), tryPick(walkMemberSig, memberSigs));

        default:
          return walkType(_arg22.data[0]);
      }
    };

    const walkMember = function (_arg23) {
      switch (_arg23.tag) {
        case 5:
          return walkValSig(_arg23.data[0]);

        case 1:
          return walkBinding(_arg23.data[0]);

        case 2:
          return defaultArg(tryPick(walkAttribute, _arg23.data[1]), tryPick(walkSimplePat, _arg23.data[2]));

        case 3:
          return defaultArg(walkType(_arg23.data[0]), walkExpr(_arg23.data[1]));

        case 4:
          return tryPick(walkBinding, _arg23.data[0]);

        case 6:
          return defaultArg(walkType(_arg23.data[0]), defaultArg(_arg23.data[1], null, function (list) {
            return tryPick(walkMember, list);
          }));

        case 7:
          return walkType(_arg23.data[0]);

        case 8:
          return walkField(_arg23.data[0]);

        case 9:
          return walkTypeDefn(_arg23.data[0]);

        case 10:
          return defaultArg(defaultArg(tryPick(walkAttribute, _arg23.data[0]), defaultArg(_arg23.data[3], null, walkType)), walkExpr(_arg23.data[8]));

        default:
          return null;
      }
    };

    const walkEnumCase = function (_arg12) {
      return tryPick(walkAttribute, _arg12.data[0]);
    };

    const walkUnionCaseType = function (_arg24) {
      if (_arg24.tag === 1) {
        const t_1 = _arg24.data[0];
        return walkType(t_1);
      } else {
        return tryPick(walkField, _arg24.data);
      }
    };

    const walkUnionCase = function (_arg13) {
      return defaultArg(tryPick(walkAttribute, _arg13.data[0]), walkUnionCaseType(_arg13.data[2]));
    };

    const walkTypeDefnSimple = function (_arg25) {
      switch (_arg25.tag) {
        case 1:
          return tryPick(walkEnumCase, _arg25.data[0]);

        case 0:
          return tryPick(walkUnionCase, _arg25.data[1]);

        case 2:
          return tryPick(walkField, _arg25.data[1]);

        case 5:
          return walkType(_arg25.data[1]);

        default:
          return null;
      }
    };

    const walkComponentInfo = function (isModule, _arg14) {
      return defaultArg(isModule ? null : function (range_16, f_6) {
        return function (range_17) {
          return rangeContainsPos(range_17, pos);
        }(range_16) ? f_6() : null;
      }(_arg14.data[7], function () {
        return new EntityKind(1);
      }), defaultArg(defaultArg(tryPick(walkAttribute, _arg14.data[0]), tryPick(walkTyparDecl, _arg14.data[1])), tryPick(walkTypeConstraint, _arg14.data[2])));
    };

    const walkTypeDefnRepr = function (_arg26) {
      if (_arg26.tag === 1) {
        return walkTypeDefnSimple(_arg26.data[0]);
      } else if (_arg26.tag === 2) {
        return null;
      } else {
        return tryPick(walkMember, _arg26.data[1]);
      }
    };

    const walkTypeDefnSigRepr = function (_arg27) {
      if (_arg27.tag === 1) {
        return walkTypeDefnSimple(_arg27.data[0]);
      } else if (_arg27.tag === 2) {
        return null;
      } else {
        return tryPick(walkMemberSig, _arg27.data[1]);
      }
    };

    const walkTypeDefn = function (_arg15) {
      return defaultArg(defaultArg(walkComponentInfo(false, _arg15.data[0]), walkTypeDefnRepr(_arg15.data[1])), tryPick(walkMember, _arg15.data[2]));
    };

    const walkSynModuleDecl = function (isTopLevel_1, decl) {
      switch (decl.tag) {
        case 9:
          return walkSynModuleOrNamespace(isTopLevel_1, decl.data);

        case 1:
          return defaultArg(walkComponentInfo(true, decl.data[0]), function (range_18, f_7) {
            return function (range_19) {
              return rangeContainsPos(range_19, pos);
            }(range_18) ? f_7() : null;
          }(decl.data[4], function () {
            return tryPick(CurriedLambda(walkSynModuleDecl)(false), decl.data[2]);
          }));

        case 6:
          return null;

        case 2:
          return tryPick(walkBinding, decl.data[1]);

        case 3:
          return walkExpr(decl.data[1]);

        case 4:
          return tryPick(walkTypeDefn, decl.data[0]);

        default:
          return null;
      }
    };

    if (input.tag === 0) {
      return walkImplFileInput(input.data);
    } else {
      return null;
    }
  };

  const findMatches = __exports.findMatches = function (prefix, suffix, str, startIndex) {
    return delay(function () {
      const i1 = str.indexOf(prefix, startIndex) | 0;

      if (i1 >= 0) {
        const i2 = str.indexOf(suffix, i1 + prefix.length) | 0;

        if (i2 >= 0) {
          const index = i1 + prefix.length | 0;
          const count = i2 - index | 0;
          const start = i2 + suffix.length | 0;
          return append_1(singleton([index, count]), delay(function () {
            return findMatches(prefix, suffix, str, start);
          }));
        } else {
          return empty();
        }
      } else {
        return empty();
      }
    });
  };

  const TryGetCompletionContext = __exports.TryGetCompletionContext = function (pos, parsedInput, lineStr) {
    const matchValue = GetEntityKind(pos, parsedInput);
    const $var19 = matchValue != null ? getValue(matchValue).tag === 0 ? [0] : [1] : [1];

    switch ($var19[0]) {
      case 0:
        return new CompletionContext(5);

      case 1:
        const parseLid = function (_arg1) {
          const collect = function (plid, parts, dots) {
            var copyOfStruct_1;
            var copyOfStruct;
            var copyOfStruct_2;

            collect: while (true) {
              const matchValue_1 = [parts, dots];

              if (matchValue_1[0].tail != null) {
                const xs = matchValue_1[0].tail;
                const x = matchValue_1[0].head;

                if (rangeContainsPos(x.idRange, pos)) {
                  const s = x.idText.substr(0, pos.Column - (copyOfStruct_1 = (copyOfStruct = x.idRange, copyOfStruct.Start), copyOfStruct_1.Column));
                  const residue = s.length !== 0 ? s : null;
                  return [plid, residue];
                } else if (posGt((copyOfStruct_2 = x.idRange, copyOfStruct_2.Start), pos)) {
                  return [plid, null];
                } else if (matchValue_1[1].tail != null) {
                  if (posGeq(pos, matchValue_1[1].head.End)) {
                    plid = new List(x.idText, plid);
                    parts = xs;
                    dots = matchValue_1[1].tail;
                    continue collect;
                  } else {
                    return null;
                  }
                } else {
                  return [plid, x.idText];
                }
              } else {
                return [plid, null];
              }
            }
          };

          const matchValue_2 = collect(new List(), _arg1.data[0], _arg1.data[1]);

          if (matchValue_2 == null) {
            return null;
          } else {
            const residue_1 = getValue(matchValue_2)[1];
            const parts_1 = getValue(matchValue_2)[0];
            return [reverse(parts_1), residue_1];
          }
        };

        const _Class_Interface_Struct_Unknown_Invalid_ = function (synAttributes) {
          const _SynAttr___ = function (name, attr) {
            var x_1;
            const $var20 = attr.TypeName.data[0].tail != null ? attr.TypeName.data[0].tail.tail == null ? (x_1 = attr.TypeName.data[0].head, x_1.idText === name) ? [0, attr.TypeName.data[0].head] : [1] : [1] : [1];

            switch ($var20[0]) {
              case 0:
                return makeSome();

              case 1:
                return null;
            }
          };

          const getKind = function (isClass, isInterface, isStruct, _arg2) {
            getKind: while (true) {
              if (_arg2.tail != null) {
                const activePatternResult54026 = _SynAttr___("Class", _arg2.head);

                if (activePatternResult54026 != null) {
                  isClass = true;
                  isInterface = isInterface;
                  isStruct = isStruct;
                  _arg2 = _arg2.tail;
                  continue getKind;
                } else {
                  let $var21;

                  if (_arg2.tail != null) {
                    const activePatternResult54024 = _SynAttr___("AbstractClass", _arg2.head);

                    if (activePatternResult54024 != null) {
                      $var21 = [0, _arg2.tail];
                    } else {
                      $var21 = [1];
                    }
                  } else {
                    $var21 = [1];
                  }

                  switch ($var21[0]) {
                    case 0:
                      isClass = true;
                      isInterface = isInterface;
                      isStruct = isStruct;
                      _arg2 = $var21[1];
                      continue getKind;

                    case 1:
                      let $var22;

                      if (_arg2.tail != null) {
                        const activePatternResult54022 = _SynAttr___("Interface", _arg2.head);

                        if (activePatternResult54022 != null) {
                          $var22 = [0, _arg2.tail];
                        } else {
                          $var22 = [1];
                        }
                      } else {
                        $var22 = [1];
                      }

                      switch ($var22[0]) {
                        case 0:
                          isClass = isClass;
                          isInterface = true;
                          isStruct = isStruct;
                          _arg2 = $var22[1];
                          continue getKind;

                        case 1:
                          let $var23;

                          if (_arg2.tail != null) {
                            const activePatternResult54020 = _SynAttr___("Struct", _arg2.head);

                            if (activePatternResult54020 != null) {
                              $var23 = [0, _arg2.tail];
                            } else {
                              $var23 = [1];
                            }
                          } else {
                            $var23 = [1];
                          }

                          switch ($var23[0]) {
                            case 0:
                              isClass = isClass;
                              isInterface = isInterface;
                              isStruct = true;
                              _arg2 = $var23[1];
                              continue getKind;

                            case 1:
                              if (_arg2.tail != null) {
                                isClass = isClass;
                                isInterface = isInterface;
                                isStruct = isStruct;
                                _arg2 = _arg2.tail;
                                continue getKind;
                              } else {
                                throw new Error("C:/projects/fcs/src/fsharp/service/ServiceUntypedParse.fs", 1008, 16);
                              }

                          }

                      }

                  }
                }
              } else {
                return [isClass, isInterface, isStruct];
              }
            }
          };

          const matchValue_3 = getKind(false, false, false, synAttributes);
          const $var24 = matchValue_3[0] ? matchValue_3[1] ? [4] : matchValue_3[2] ? [4] : [1] : matchValue_3[1] ? matchValue_3[2] ? [4] : [2] : matchValue_3[2] ? [3] : [0];

          switch ($var24[0]) {
            case 0:
              return new Choice(3, null);

            case 1:
              return new Choice(0, null);

            case 2:
              return new Choice(1, null);

            case 3:
              return new Choice(2, null);

            case 4:
              return new Choice(4, null);
          }
        };

        const GetCompletionContextForInheritSynMember = function (tupledArg) {
          const success = function (k) {
            return new CompletionContext(1, [k, tupledArg[2]]);
          };

          switch (tupledArg[1].tag) {
            case 1:
              let $var25;

              const activePatternResult54033 = _Class_Interface_Struct_Unknown_Invalid_(tupledArg[0].data[0]);

              if (activePatternResult54033.tag === 0) {
                $var25 = [0];
              } else if (activePatternResult54033.tag === 3) {
                $var25 = [0];
              } else {
                $var25 = [1];
              }

              switch ($var25[0]) {
                case 0:
                  return success(new InheritanceContext(0));

                case 1:
                  return new CompletionContext(0);
              }

            case 2:
              let $var26;

              const activePatternResult54034 = _Class_Interface_Struct_Unknown_Invalid_(tupledArg[0].data[0]);

              if (activePatternResult54034.tag === 1) {
                $var26 = [0];
              } else if (activePatternResult54034.tag === 3) {
                $var26 = [0];
              } else {
                $var26 = [1];
              }

              switch ($var26[0]) {
                case 0:
                  return success(new InheritanceContext(1));

                case 1:
                  return new CompletionContext(0);
              }

            case 3:
              return new CompletionContext(0);

            case 0:
              const activePatternResult54035 = _Class_Interface_Struct_Unknown_Invalid_(tupledArg[0].data[0]);

              if (activePatternResult54035.tag === 0) {
                return success(new InheritanceContext(0));
              } else if (activePatternResult54035.tag === 1) {
                return success(new InheritanceContext(1));
              } else if (activePatternResult54035.tag === 3) {
                return success(new InheritanceContext(2));
              } else {
                return new CompletionContext(0);
              }

            default:
              return null;
          }
        };

        const _Operator___ = function (name_1, e) {
          var lhs;
          var ident;
          const $var27 = e.tag === 20 ? e.data[0] === 1 ? e.data[1] ? [1] : e.data[2].tag === 20 ? e.data[2].data[0] === 1 ? e.data[2].data[1] ? e.data[2].data[2].tag === 28 ? (lhs = e.data[2].data[3], ident = e.data[2].data[2].data, ident.idText === name_1) ? [0, e.data[2].data[2].data, e.data[2].data[3], e.data[3]] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

          switch ($var27[0]) {
            case 0:
              return [$var27[2], $var27[3]];

            case 1:
              return null;
          }
        };

        const isInRhsOfRangeOp = function (p) {
          let $var28;

          if (p.tail != null) {
            if (p.head.tag === 0) {
              const activePatternResult54040 = _Operator___("op_Range", p.head.data);

              if (activePatternResult54040 != null) {
                $var28 = [0];
              } else {
                $var28 = [1];
              }
            } else {
              $var28 = [1];
            }
          } else {
            $var28 = [1];
          }

          switch ($var28[0]) {
            case 0:
              return true;

            case 1:
              return false;
          }
        };

        const _Setter___ = function (e_1) {
          let $var29;

          const activePatternResult54043 = _Operator___("op_Equality", e_1);

          if (activePatternResult54043 != null) {
            if (getValue(activePatternResult54043)[0].tag === 28) {
              $var29 = [0, getValue(activePatternResult54043)[0].data];
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
              return null;
          }
        };

        const findSetters = function (argList) {
          const $var30 = argList.tag === 0 ? argList.data[0].tag === 4 ? [0, argList.data[0].data[0]] : [1] : [1];

          switch ($var30[0]) {
            case 0:
              const setters = new Set();

              for (let p_1 of $var30[1]) {
                const activePatternResult54045 = _Setter___(p_1);

                if (activePatternResult54045 != null) {
                  addInPlace(getValue(activePatternResult54045).idText, setters);
                }
              }

              return setters;

            case 1:
              return emptyStringSet;
          }
        };

        const endOfLastIdent = function (lid) {
          const last = last_1(lid.Lid);
          let copyOfStruct_3 = last.idRange;
          return copyOfStruct_3.End;
        };

        const endOfClosingTokenOrLastIdent = function (mClosing, lid_1) {
          if (mClosing == null) {
            return endOfLastIdent(lid_1);
          } else {
            return getValue(mClosing).End;
          }
        };

        const endOfClosingTokenOrIdent = function (mClosing_1, id) {
          if (mClosing_1 == null) {
            let copyOfStruct_4 = id.idRange;
            return copyOfStruct_4.End;
          } else {
            return getValue(mClosing_1).End;
          }
        };

        const _NewObjectOrMethodCall___ = function (e_2) {
          var copyOfStruct_5;
          const $var31 = e_2.tag === 8 ? e_2.data[1].tag === 0 ? [0, e_2.data[2], e_2.data[1].data] : e_2.data[1].tag === 1 ? e_2.data[1].data[0].tag === 0 ? [1, e_2.data[2], e_2.data[1].data[4], e_2.data[1].data[0].data] : [6] : [6] : e_2.tag === 20 ? e_2.data[1] ? [6] : e_2.data[2].tag === 28 ? [2, e_2.data[3], e_2.data[2].data] : e_2.data[2].tag === 21 ? e_2.data[2].data[0].tag === 28 ? [3, e_2.data[3], e_2.data[2].data[0].data, e_2.data[2].data[4]] : e_2.data[2].data[0].tag === 29 ? [5, e_2.data[3], e_2.data[2].data[0].data[1], e_2.data[2].data[4]] : [6] : e_2.data[2].tag === 29 ? [4, e_2.data[3], e_2.data[2].data[1]] : [6] : [6];

          switch ($var31[0]) {
            case 0:
              return [endOfLastIdent($var31[2]), findSetters($var31[1])];

            case 1:
              return [endOfClosingTokenOrLastIdent($var31[2], $var31[3]), findSetters($var31[1])];

            case 2:
              return [(copyOfStruct_5 = $var31[2].idRange, copyOfStruct_5.End), findSetters($var31[1])];

            case 3:
              return [endOfClosingTokenOrIdent($var31[3], $var31[2]), findSetters($var31[1])];

            case 4:
              return [endOfLastIdent($var31[2]), findSetters($var31[1])];

            case 5:
              return [endOfClosingTokenOrLastIdent($var31[3], $var31[2]), findSetters($var31[1])];

            case 6:
              return null;
          }
        };

        const isOnTheRightOfComma = function (elements, commas, current) {
          const loop = function (elements_1, commas_1) {
            loop: while (true) {
              if (elements_1.tail != null) {
                if (commas_1.tail != null) {
                  if (elements_1.head === current) {
                    if (posLt(commas_1.head.End, pos)) {
                      return true;
                    } else {
                      return posEq(commas_1.head.End, pos);
                    }
                  } else {
                    elements_1 = elements_1.tail;
                    commas_1 = commas_1.tail;
                    continue loop;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            }
          };

          return loop(elements, commas);
        };

        const _PartOfParameterList___ = function (precedingArgument, path) {
          let $var32;

          if (path.tail != null) {
            if (path.head.tag === 0) {
              if (path.head.data.tag === 0) {
                if (path.tail.tail != null) {
                  if (path.tail.head.tag === 0) {
                    const activePatternResult54063 = _NewObjectOrMethodCall___(path.tail.head.data);

                    if (activePatternResult54063 != null) {
                      $var32 = [0, getValue(activePatternResult54063)];
                    } else {
                      $var32 = [1];
                    }
                  } else {
                    $var32 = [1];
                  }
                } else {
                  $var32 = [1];
                }
              } else {
                $var32 = [1];
              }
            } else {
              $var32 = [1];
            }
          } else {
            $var32 = [1];
          }

          switch ($var32[0]) {
            case 0:
              if (precedingArgument != null) {
                return null;
              } else {
                return $var32[1];
              }

            case 1:
              let $var33;

              if (path.tail != null) {
                if (path.head.tag === 0) {
                  if (path.head.data.tag === 4) {
                    if (path.tail.tail != null) {
                      if (path.tail.head.tag === 0) {
                        if (path.tail.head.data.tag === 0) {
                          if (path.tail.tail.tail != null) {
                            if (path.tail.tail.head.tag === 0) {
                              const activePatternResult54062 = _NewObjectOrMethodCall___(path.tail.tail.head.data);

                              if (activePatternResult54062 != null) {
                                $var33 = [0, getValue(activePatternResult54062), path.head.data.data[1], path.head.data.data[0]];
                              } else {
                                $var33 = [1];
                              }
                            } else {
                              $var33 = [1];
                            }
                          } else {
                            $var33 = [1];
                          }
                        } else {
                          $var33 = [1];
                        }
                      } else {
                        $var33 = [1];
                      }
                    } else {
                      $var33 = [1];
                    }
                  } else {
                    $var33 = [1];
                  }
                } else {
                  $var33 = [1];
                }
              } else {
                $var33 = [1];
              }

              switch ($var33[0]) {
                case 0:
                  if (precedingArgument != null) {
                    if (isOnTheRightOfComma($var33[3], $var33[2], getValue(precedingArgument))) {
                      return $var33[1];
                    } else {
                      return null;
                    }
                  } else {
                    return $var33[1];
                  }

                case 1:
                  return null;
              }

          }
        };

        const walker = new class extends AstVisitorBase {
          constructor() {
            return super();
          }

          VisitExpr(path_1, _arg4, defaultTraverse, expr) {
            var copyOfStruct_8;
            var copyOfStruct_7;
            var copyOfStruct_6;

            if (isInRhsOfRangeOp(path_1)) {
              const matchValue_4 = defaultTraverse(expr);

              if (matchValue_4 == null) {
                return new CompletionContext(3);
              } else {
                return matchValue_4;
              }
            } else {
              const $var34 = expr.tag === 2 ? expr.data[0].tag === 0 ? rangeContainsPos(expr.data[1], pos) ? [0, expr.data[1]] : [1] : [1] : [1];

              switch ($var34[0]) {
                case 0:
                  let $var35;

                  if (path_1.tail != null) {
                    if (path_1.head.tag === 0) {
                      const activePatternResult54067 = _NewObjectOrMethodCall___(path_1.head.data);

                      if (activePatternResult54067 != null) {
                        $var35 = [0, getValue(activePatternResult54067)];
                      } else {
                        $var35 = [1];
                      }
                    } else {
                      $var35 = [1];
                    }
                  } else {
                    $var35 = [1];
                  }

                  switch ($var35[0]) {
                    case 0:
                      return (tupledArg_1 => new CompletionContext(4, [tupledArg_1[0], tupledArg_1[1]]))($var35[1]);

                    case 1:
                      return defaultTraverse(expr);
                  }

                case 1:
                  const $var36 = expr.tag === 28 ? equals((copyOfStruct_8 = expr.data.idRange, copyOfStruct_8.End), pos) ? [0, expr.data] : [1] : [1];

                  switch ($var36[0]) {
                    case 0:
                      const activePatternResult54070 = _PartOfParameterList___(null, path_1);

                      if (activePatternResult54070 != null) {
                        return (tupledArg_2 => new CompletionContext(4, [tupledArg_2[0], tupledArg_2[1]]))(getValue(activePatternResult54070));
                      } else {
                        return defaultTraverse(expr);
                      }

                    case 1:
                      let $var37;

                      const activePatternResult54074 = _Setter___(expr);

                      if (activePatternResult54074 != null) {
                        if (equals((copyOfStruct_7 = getValue(activePatternResult54074).idRange, copyOfStruct_7.End), pos) ? true : rangeBeforePos(expr.Range, pos)) {
                          $var37 = [0, getValue(activePatternResult54074)];
                        } else {
                          $var37 = [1];
                        }
                      } else {
                        $var37 = [1];
                      }

                      switch ($var37[0]) {
                        case 0:
                          const precedingArgument_1 = equals((copyOfStruct_6 = $var37[1].idRange, copyOfStruct_6.End), pos) ? null : expr;

                          const activePatternResult54073 = _PartOfParameterList___(precedingArgument_1, path_1);

                          if (activePatternResult54073 != null) {
                            return (tupledArg_3 => new CompletionContext(4, [tupledArg_3[0], tupledArg_3[1]]))(getValue(activePatternResult54073));
                          } else {
                            return defaultTraverse(expr);
                          }

                        case 1:
                          return defaultTraverse(expr);
                      }

                  }

              }
            }
          }

          VisitRecordField(path_1, copyOpt, field) {
            const contextFromTreePath = completionPath => {
              const $var38 = path_1.tail != null ? path_1.head.tag === 0 ? path_1.tail.tail != null ? path_1.tail.head.tag === 6 ? path_1.tail.tail.tail != null ? path_1.tail.tail.head.tag === 4 ? path_1.tail.tail.tail.tail != null ? path_1.tail.tail.tail.head.tag === 3 ? path_1.tail.tail.tail.head.data.data[0].data[3].tail != null ? path_1.tail.tail.tail.head.data.data[0].data[3].tail.tail == null ? [0, path_1.tail.tail.tail.head.data.data[0].data[3].head] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

              switch ($var38[0]) {
                case 0:
                  return new RecordContext(1, $var38[1].idText);

                case 1:
                  return new RecordContext(2, completionPath);
              }
            };

            if (field == null) {
              const recordContext = copyOpt == null ? contextFromTreePath([new List(), null]) : new RecordContext(0, [getValue(copyOpt).Range, [new List(), null]]);
              return new CompletionContext(2, recordContext);
            } else {
              const matchValue_4 = parseLid(getValue(field));

              if (matchValue_4 == null) {
                return null;
              } else {
                const recordContext_1 = copyOpt == null ? contextFromTreePath(getValue(matchValue_4)) : new RecordContext(0, [getValue(copyOpt).Range, getValue(matchValue_4)]);
                return new CompletionContext(2, recordContext_1);
              }
            }
          }

          VisitInheritSynMemberDefn(componentInfo, typeDefnKind, synType, _members, _range) {
            if (synType.tag === 0) {
              const matchValue_4 = parseLid(synType.data);

              if (matchValue_4 == null) {
                return new CompletionContext(0);
              } else {
                return GetCompletionContextForInheritSynMember([componentInfo, typeDefnKind, getValue(matchValue_4)]);
              }
            } else {
              return null;
            }
          }

          VisitBinding(defaultTraverse, _arg5) {
            const visitParam = _arg8 => {
              var range;
              const $var39 = _arg8.tag === 2 ? rangeContainsPos(_arg8.data[4], pos) ? [0, _arg8.data[4]] : [1] : [1];

              switch ($var39[0]) {
                case 0:
                  return new CompletionContext(0);

                case 1:
                  const $var40 = _arg8.tag === 3 ? _arg8.data[0].tag === 2 ? _arg8.data[0].data[0].tag === 1 ? (range = _arg8.data[0].data[0].data, rangeContainsPos(range, pos)) ? [0, _arg8.data[0].data[0].data] : [1] : [1] : [1] : [1];

                  switch ($var40[0]) {
                    case 0:
                      return new CompletionContext(0);

                    case 1:
                      return defaultTraverse(_arg5);
                  }

              }
            };

            if (_arg5.data[7].tag === 7) {
              if (_arg5.data[7].data[3].tag === 0) {
                return tryPick(pat => {
                  const $var41 = pat.tag === 10 ? [0, pat.data[0]] : pat.tag === 1 ? rangeContainsPos(pat.data, pos) ? [1, pat.data] : [2] : [2];

                  switch ($var41[0]) {
                    case 0:
                      if ($var41[1].tag === 8) {
                        return (list => tryPick(visitParam, list))($var41[1].data[0]);
                      } else {
                        return visitParam($var41[1]);
                      }

                    case 1:
                      return new CompletionContext(0);

                    case 2:
                      return visitParam(pat);
                  }
                }, _arg5.data[7].data[3].data);
              } else {
                return defaultTraverse(_arg5);
              }
            } else {
              return defaultTraverse(_arg5);
            }
          }

          VisitHashDirective(range) {
            if (rangeContainsPos(range, pos)) {
              return new CompletionContext(0);
            } else {
              return null;
            }
          }

          VisitModuleOrNamespace(_arg6) {
            var copyOfStruct_7;
            var copyOfStruct_8;
            var copyOfStruct_6;
            const matchValue_4 = tryLast(_arg6.data[0]);
            const $var42 = matchValue_4 != null ? ((pos.Line === (copyOfStruct_7 = getValue(matchValue_4).idRange, copyOfStruct_7.EndLine) ? (copyOfStruct_8 = getValue(matchValue_4).idRange, copyOfStruct_8.EndColumn) >= 0 : false) ? pos.Column <= lineStr.length : false) ? [0, getValue(matchValue_4)] : [1] : [1];

            switch ($var42[0]) {
              case 0:
                const stringBetweenModuleNameAndPos = lineStr.slice((copyOfStruct_6 = $var42[1].idRange, copyOfStruct_6.EndColumn), pos.Column - 1 + 1);

                if (forAll(x_2 => x_2 === " " ? true : x_2 === ".", stringBetweenModuleNameAndPos)) {
                  return new CompletionContext(0);
                } else {
                  return null;
                }

              case 1:
                return null;
            }
          }

          VisitComponentInfo(_arg7) {
            if (rangeContainsPos(_arg7.data[7], pos)) {
              return new CompletionContext(0);
            } else {
              return null;
            }
          }

          VisitLetOrUse(bindings, range) {
            const $var43 = bindings.tail == null ? range.StartLine === pos.Line ? [0] : [1] : [1];

            switch ($var43[0]) {
              case 0:
                return new CompletionContext(0);

              case 1:
                return null;
            }
          }

          VisitSimplePats(pats) {
            return tryPick(pat => {
              var range;
              const $var44 = pat.tag === 0 ? rangeContainsPos(pat.data[5], pos) ? [0, pat.data[5]] : [1] : pat.tag === 1 ? pat.data[0].tag === 0 ? (range = pat.data[0].data[5], rangeContainsPos(range, pos)) ? [0, pat.data[0].data[5]] : [1] : [1] : [1];

              switch ($var44[0]) {
                case 0:
                  return new CompletionContext(0);

                case 1:
                  return null;
              }
            }, pats);
          }

          VisitModuleDecl(defaultTraverse, decl) {
            if (decl.tag === 6) {
              const pos_1 = mkPos(pos.Line, pos.Column - 1);

              if (rangeContainsPos(decl.data[1], pos_1)) {
                return new CompletionContext(6);
              } else {
                return null;
              }
            } else {
              return defaultTraverse(decl);
            }
          }

          VisitType(defaultTraverse, ty) {
            const $var45 = ty.tag === 0 ? rangeContainsPos(ty.Range, pos) ? [0] : [1] : [1];

            switch ($var45[0]) {
              case 0:
                return new CompletionContext(7);

              case 1:
                return defaultTraverse(ty);
            }
          }

          [_Symbol.reflection]() {
            return {
              interfaces: ["Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.AstVisitorBase"]
            };
          }

        }();
        return defaultArgWith(Traverse(pos, parsedInput, walker), function () {
          const cutLeadingAttributes = function (str) {
            const matchValue_4 = str.lastIndexOf(";") | 0;

            if (matchValue_4 === -1) {
              return str;
            } else if (matchValue_4 < str.length) {
              return trim(str.slice(matchValue_4 + 1, str.length), "start");
            } else {
              return "";
            }
          };

          let isLongIdent;

          const predicate = function (c) {
            if (IsIdentifierPartCharacter(c) ? true : c === ".") {
              return true;
            } else {
              return c === ":";
            }
          };

          isLongIdent = function (source) {
            return forAll(predicate, source);
          };

          const matches = Array.from(filter_1(function (tupledArg_1) {
            return tupledArg_1[0] <= pos.Column ? tupledArg_1[0] + tupledArg_1[1] >= pos.Column : false;
          }, findMatches("[<", ">]", lineStr, 0)));

          if (!(matches.length === 0)) {
            return tryPick(function (tupledArg_2) {
              const col = pos.Column - tupledArg_2[0] | 0;

              if (col >= 0 ? col < tupledArg_2[1] : false) {
                const str_1 = lineStr.substr(tupledArg_2[0], tupledArg_2[1]);
                const str_2 = trim(str_1.substr(0, col), "start");
                const str_3 = cutLeadingAttributes(str_2);

                if (isLongIdent(str_3)) {
                  return new CompletionContext(5);
                } else {
                  return null;
                }
              } else {
                return null;
              }
            }, matches);
          } else {
            const matchValue_5 = lineStr.lastIndexOf("[<") | 0;

            if (matchValue_5 === -1) {
              return null;
            } else if (pos.Column >= matchValue_5 + 2) {
              const str_4 = trim(lineStr.slice(matchValue_5 + 2, pos.Column - 1 + 1), "start");
              const str_5 = cutLeadingAttributes(str_4);

              if (isLongIdent(str_5)) {
                return new CompletionContext(5);
              } else {
                return null;
              }
            } else {
              return null;
            }
          }
        });
    }
  };

  const GetFullNameOfSmallestModuleOrNamespaceAtPoint = __exports.GetFullNameOfSmallestModuleOrNamespaceAtPoint = function (parsedInput, pos) {
    let path = new List();
    const visitor = new class extends AstVisitorBase {
      constructor() {
        return super();
      }

      VisitExpr(_path, _traverseSynExpr, defaultTraverse, expr) {
        return null;
      }

      VisitModuleOrNamespace(_arg1) {
        if (rangeContainsPos(_arg1.data[7], pos)) {
          path = append(path, _arg1.data[0]);
        }

        return null;
      }

      [_Symbol.reflection]() {
        return {
          interfaces: ["Microsoft.FSharp.Compiler.SourceCodeServices.AstTraversal.AstVisitorBase"]
        };
      }

    }();
    Traverse(pos, parsedInput, visitor);
    return Array.from(map(function (x) {
      return x.idText;
    }, path));
  };

  return __exports;
}({});