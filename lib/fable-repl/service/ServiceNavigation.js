import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { compareRecords, equalsRecords, equals, Array as _Array, Option, comparePrimitives } from "../fable-core/Util";
import { rangeOfLid, textOfLid, SynAccess } from "../fsharp/ast";
import { unionRanges, range as range_1 } from "../fsharp/range";
import { FSharpGlyph } from "./ServiceConstants";
import { concat, groupBy, collect as collect_1, append, ofArray, map } from "../fable-core/List";
import List from "../fable-core/List";
import { iterate, map as map_1, empty as empty_1, singleton, collect, delay, toList, fold } from "../fable-core/Seq";
import CurriedLambda from "../fable-core/CurriedLambda";
import { find, add, tryFind, create } from "../fable-core/Map";
import Comparer from "../fable-core/Comparer";
import { getValue, defaultArg } from "../fable-core/Option";
import { isNullOrEmpty, join, printf, toText } from "../fable-core/String";
import { map as map_2 } from "../fable-core/Array";
import { distinctBy } from "../fable-core/Set";
export class FSharpNavigationDeclarationItemKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNavigationDeclarationItemKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["NamespaceDecl"], ["ModuleFileDecl"], ["ExnDecl"], ["ModuleDecl"], ["TypeDecl"], ["MethodDecl"], ["PropertyDecl"], ["FieldDecl"], ["OtherDecl"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNavigationDeclarationItemKind", FSharpNavigationDeclarationItemKind);
export class FSharpEnclosingEntityKind {
  constructor(tag) {
    this.tag = tag | 0;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpEnclosingEntityKind",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Namespace"], ["Module"], ["Class"], ["Exception"], ["Interface"], ["Record"], ["Enum"], ["DU"]]
    };
  }

  Equals(other) {
    return this.tag === other.tag;
  }

  CompareTo(other) {
    return comparePrimitives(this.tag, other.tag);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpEnclosingEntityKind", FSharpEnclosingEntityKind);
export class FSharpNavigationDeclarationItem {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNavigationDeclarationItem",
      properties: {
        Access: Option(SynAccess),
        BodyRange: range_1,
        EnclosingEntityKind: FSharpEnclosingEntityKind,
        Glyph: FSharpGlyph,
        IsAbstract: "boolean",
        IsSingleTopLevel: "boolean",
        Kind: FSharpNavigationDeclarationItemKind,
        Name: "string",
        Range: range_1,
        UniqueName: "string",
        bodyRange: range_1
      }
    };
  }

  constructor(uniqueName, name, kind, glyph, range, bodyRange, singleTopLevel, enclosingEntityKind, isAbstract, access) {
    this.uniqueName = uniqueName;
    this.name = name;
    this.kind = kind;
    this.glyph = glyph;
    this.range = range;
    this["bodyRange@39"] = bodyRange;
    this.singleTopLevel = singleTopLevel;
    this.enclosingEntityKind = enclosingEntityKind;
    this.isAbstract = isAbstract;
    this.access = access;
  }

  get bodyRange() {
    return this["bodyRange@39"];
  }

  get UniqueName() {
    return this.uniqueName;
  }

  get Name() {
    return this.name;
  }

  get Glyph() {
    return this.glyph;
  }

  get Kind() {
    return this.kind;
  }

  get Range() {
    return this.range;
  }

  get BodyRange() {
    return this["bodyRange@39"];
  }

  get IsSingleTopLevel() {
    return this.singleTopLevel;
  }

  get EnclosingEntityKind() {
    return this.enclosingEntityKind;
  }

  get IsAbstract() {
    return this.isAbstract;
  }

  get Access() {
    return this.access;
  }

  WithUniqueName(uniqueName) {
    return new FSharpNavigationDeclarationItem(uniqueName, this.name, this.kind, this.glyph, this.range, this["bodyRange@39"], this.singleTopLevel, this.enclosingEntityKind, this.isAbstract, this.access);
  }

  static Create(name, kind, glyph, range, bodyRange, singleTopLevel, enclosingEntityKind, isAbstract, access) {
    return new FSharpNavigationDeclarationItem("", name, kind, glyph, range, bodyRange, singleTopLevel, enclosingEntityKind, isAbstract, access);
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNavigationDeclarationItem", FSharpNavigationDeclarationItem);
export class FSharpNavigationTopLevelDeclaration {
  constructor(declaration, nested) {
    this.Declaration = declaration;
    this.Nested = nested;
  }

  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNavigationTopLevelDeclaration",
      interfaces: ["FSharpRecord"],
      properties: {
        Declaration: FSharpNavigationDeclarationItem,
        Nested: _Array(FSharpNavigationDeclarationItem)
      }
    };
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNavigationTopLevelDeclaration", FSharpNavigationTopLevelDeclaration);
export class FSharpNavigationItems {
  [_Symbol.reflection]() {
    return {
      type: "Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNavigationItems",
      properties: {
        Declarations: _Array(FSharpNavigationTopLevelDeclaration)
      }
    };
  }

  constructor(declarations) {
    this.declarations = declarations;
  }

  get Declarations() {
    return this.declarations;
  }

}
setType("Microsoft.FSharp.Compiler.SourceCodeServices.FSharpNavigationItems", FSharpNavigationItems);
export const NavigationImpl = function (__exports) {
  const unionRangesChecked = __exports.unionRangesChecked = function (r1, r2) {
    if (equals(r1, range_1.Zero)) {
      return r2;
    } else if (equals(r2, range_1.Zero)) {
      return r1;
    } else {
      return unionRanges(r1, r2);
    }
  };

  const rangeOfDecls2 = __exports.rangeOfDecls2 = function (f, decls) {
    const matchValue = map($var1 => function (d) {
      return d.bodyRange;
    }(f($var1)), decls);

    if (matchValue.tail == null) {
      return range_1.Zero;
    } else {
      return function (list) {
        return fold(function (r1, r2) {
          return unionRangesChecked(r1, r2);
        }, matchValue.head, list);
      }(matchValue.tail);
    }
  };

  const rangeOfDecls = __exports.rangeOfDecls = CurriedLambda((() => {
    const f = function (tuple) {
      return tuple[0];
    };

    return function (decls) {
      return rangeOfDecls2(f, decls);
    };
  })());

  const moduleRange = __exports.moduleRange = function (idm, others) {
    return unionRangesChecked(idm.EndRange, rangeOfDecls2(function (tupledArg) {
      return tupledArg[0];
    }, others));
  };

  const fldspecRange = __exports.fldspecRange = function (fldspec) {
    if (fldspec.tag === 1) {
      const ty = fldspec.data[0];
      return ty.Range;
    } else {
      return fold(function (st, _arg1) {
        return unionRangesChecked(_arg1.data[7], st);
      }, range_1.Zero, fldspec.data);
    }
  };

  const bodyRange = __exports.bodyRange = function (mb, decls) {
    return unionRangesChecked(rangeOfDecls(decls), mb);
  };

  const getNavigationFromImplFile = __exports.getNavigationFromImplFile = function (modules) {
    const nameMap = {
      contents: create(null, new Comparer(comparePrimitives))
    };

    const addItemName = function (name) {
      const count = defaultArg(function (table) {
        return tryFind(name, table);
      }(nameMap.contents), 0) | 0;
      nameMap.contents = add(name, count + 1, nameMap.contents);
      return count + 1 | 0;
    };

    const uniqueName = function (name_1, idx) {
      const total = find(name_1, nameMap.contents) | 0;
      return toText(printf("%s_%d_of_%d"))(name_1, idx, total);
    };

    const createDeclLid = function (tupledArg) {
      const name_2 = (tupledArg[0] !== "" ? tupledArg[0] + "." : "") + textOfLid(tupledArg[1]);
      return [FSharpNavigationDeclarationItem.Create(name_2, tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], false, tupledArg[7], tupledArg[8], tupledArg[9]), addItemName(name_2), tupledArg[6]];
    };

    const createDecl = function (tupledArg_1) {
      const name_3 = (tupledArg_1[0] !== "" ? tupledArg_1[0] + "." : "") + tupledArg_1[1].idText;
      return [FSharpNavigationDeclarationItem.Create(name_3, tupledArg_1[2], tupledArg_1[3], tupledArg_1[4], tupledArg_1[5], false, tupledArg_1[7], tupledArg_1[8], tupledArg_1[9]), addItemName(name_3), tupledArg_1[6]];
    };

    const createMemberLid = function (tupledArg_2) {
      return [FSharpNavigationDeclarationItem.Create(textOfLid(tupledArg_2[0]), tupledArg_2[1], tupledArg_2[2], tupledArg_2[3], tupledArg_2[3], false, tupledArg_2[4], tupledArg_2[5], tupledArg_2[6]), addItemName(textOfLid(tupledArg_2[0]))];
    };

    const createMember = function (tupledArg_3) {
      return [FSharpNavigationDeclarationItem.Create(tupledArg_3[0].idText, tupledArg_3[1], tupledArg_3[2], tupledArg_3[3], tupledArg_3[3], false, tupledArg_3[4], tupledArg_3[5], tupledArg_3[6]), addItemName(tupledArg_3[0].idText)];
    };

    const processBinding = function (isMember, enclosingEntityKind, isAbstract, _arg1) {
      var lid_1;
      var flags;
      var access_2;
      var copyOfStruct;
      const memebrOpt = _arg1.data[6].data[0];
      const m = _arg1.data[9].tag === 3 ? _arg1.data[9].data[0].Range : _arg1.data[9].Range;
      const matchValue = [_arg1.data[7], memebrOpt];
      const $var2 = matchValue[0].tag === 7 ? matchValue[1] != null ? (lid_1 = matchValue[0].data[0].data[0], flags = getValue(matchValue[1]), access_2 = matchValue[0].data[4], isMember) ? [0, matchValue[0].data[4], getValue(matchValue[1]), matchValue[0].data[0].data[0]] : [1] : [1] : [1];

      switch ($var2[0]) {
        case 0:
          let patternInput;

          switch ($var2[2].MemberKind.tag) {
            case 1:
            case 2:
              patternInput = [$var2[2].IsOverrideOrExplicitImpl ? new FSharpGlyph(10) : new FSharpGlyph(9), new FSharpNavigationDeclarationItemKind(5)];
              break;

            case 5:
            case 4:
            case 3:
              patternInput = [new FSharpGlyph(13), new FSharpNavigationDeclarationItemKind(6)];
              break;

            default:
              patternInput = [$var2[2].IsOverrideOrExplicitImpl ? new FSharpGlyph(10) : new FSharpGlyph(9), new FSharpNavigationDeclarationItemKind(5)];
          }

          const patternInput_1 = $var2[3].tail != null ? $var2[3].tail.tail != null ? [$var2[3].tail, $var2[3].tail.head.idRange] : [$var2[3], $var2[3].head.idRange] : [$var2[3], m];
          return ofArray([createMemberLid([patternInput_1[0], patternInput[1], patternInput[0], unionRanges(patternInput_1[1], m), enclosingEntityKind, isAbstract, $var2[1]])]);

        case 1:
          if (matchValue[0].tag === 7) {
            const lid = matchValue[0].data[0].data[0];
            const access = matchValue[0].data[4];
            return ofArray([createMemberLid([lid, new FSharpNavigationDeclarationItemKind(7), new FSharpGlyph(7), unionRanges((copyOfStruct = lid.head, copyOfStruct.idRange), m), enclosingEntityKind, isAbstract, access])]);
          } else if (matchValue[0].tag === 2) {
            const id = matchValue[0].data[1];
            const access_1 = matchValue[0].data[3];
            const glyph = isMember ? new FSharpGlyph(9) : new FSharpGlyph(7);
            return ofArray([createMember([id, new FSharpNavigationDeclarationItemKind(7), glyph, unionRanges(id.idRange, m), enclosingEntityKind, isAbstract, access_1])]);
          } else {
            return new List();
          }

      }
    };

    const processExnDefnRepr = function (baseName, nested, _arg2) {
      const id_1 = _arg2.data[1].data[1];
      const fldspec = _arg2.data[1].data[2];
      return ofArray([createDecl([baseName, id_1, new FSharpNavigationDeclarationItemKind(2), new FSharpGlyph(6), _arg2.data[5], fldspecRange(fldspec), nested, new FSharpEnclosingEntityKind(3), false, _arg2.data[4]])]);
    };

    const processExnDefn = function (baseName_1, _arg3) {
      const nested_1 = processMembers(_arg3.data[1], new FSharpEnclosingEntityKind(3))[1];
      return processExnDefnRepr(baseName_1, nested_1, _arg3.data[0]);
    };

    const processTycon = function (baseName_2, _arg4) {
      const lid_2 = _arg4.data[0].data[3];
      const access_3 = _arg4.data[0].data[6];
      const topMembers = processMembers(_arg4.data[2], new FSharpEnclosingEntityKind(2))[1];

      if (_arg4.data[1].tag === 0) {
        const members = processMembers(_arg4.data[1].data[1], new FSharpEnclosingEntityKind(2))[1];
        const nested_2 = append(members, topMembers);
        return ofArray([createDeclLid([baseName_2, lid_2, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(0), _arg4.data[3], bodyRange(_arg4.data[1].data[2], nested_2), nested_2, new FSharpEnclosingEntityKind(2), false, access_3])]);
      } else if (_arg4.data[1].tag === 1) {
        switch (_arg4.data[1].data[0].tag) {
          case 0:
            const cases = toList(delay(function () {
              return collect(function (matchValue_1) {
                return singleton(createMember([matchValue_1.data[1], new FSharpNavigationDeclarationItemKind(8), new FSharpGlyph(14), unionRanges(fldspecRange(matchValue_1.data[2]), matchValue_1.data[1].idRange), new FSharpEnclosingEntityKind(7), false, access_3]));
              }, _arg4.data[1].data[0].data[1]);
            }));
            const nested_3 = append(cases, topMembers);
            return ofArray([createDeclLid([baseName_2, lid_2, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(17), _arg4.data[3], bodyRange(_arg4.data[1].data[0].data[2], nested_3), nested_3, new FSharpEnclosingEntityKind(7), false, access_3])]);

          case 1:
            const cases_1 = toList(delay(function () {
              return collect(function (matchValue_2) {
                return singleton(createMember([matchValue_2.data[1], new FSharpNavigationDeclarationItemKind(7), new FSharpGlyph(4), matchValue_2.data[4], new FSharpEnclosingEntityKind(6), false, access_3]));
              }, _arg4.data[1].data[0].data[0]);
            }));
            const nested_4 = append(cases_1, topMembers);
            return ofArray([createDeclLid([baseName_2, lid_2, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(3), _arg4.data[3], bodyRange(_arg4.data[1].data[0].data[1], nested_4), nested_4, new FSharpEnclosingEntityKind(6), false, access_3])]);

          case 2:
            const fields = toList(delay(function () {
              return collect(function (matchValue_3) {
                return CurriedLambda(() => matchValue_3.data[2] != null)() ? singleton(createMember([getValue(matchValue_3.data[2]), new FSharpNavigationDeclarationItemKind(7), new FSharpGlyph(7), matchValue_3.data[7], new FSharpEnclosingEntityKind(5), false, access_3])) : empty_1();
              }, _arg4.data[1].data[0].data[1]);
            }));
            const nested_5 = append(fields, topMembers);
            return ofArray([createDeclLid([baseName_2, lid_2, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(16), _arg4.data[3], bodyRange(_arg4.data[1].data[0].data[2], nested_5), nested_5, new FSharpEnclosingEntityKind(5), false, access_3])]);

          case 5:
            return ofArray([createDeclLid([baseName_2, lid_2, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(15), _arg4.data[3], bodyRange(_arg4.data[1].data[0].data[2], topMembers), topMembers, new FSharpEnclosingEntityKind(2), false, access_3])]);

          default:
            return new List();
        }
      } else {
        return processExnDefnRepr(baseName_2, new List(), _arg4.data[1].data);
      }
    };

    const processMembers = function (members_1, enclosingEntityKind_1) {
      var state;
      const members_2 = map(function (tupledArg_4) {
        return [tupledArg_4[0], (() => {
          const $var3 = tupledArg_4[1].tail != null ? tupledArg_4[1].tail.tail != null ? tupledArg_4[1].tail.head.tag === 1 ? tupledArg_4[1].tail.head.data[0].data[7].tag === 7 ? tupledArg_4[1].tail.head.data[0].data[7].data[1] != null ? tupledArg_4[1].tail.tail.tail == null ? tupledArg_4[1].head.tag === 1 ? tupledArg_4[1].head.data[0].data[7].tag === 7 ? tupledArg_4[1].head.data[0].data[7].data[1] != null ? [1, tupledArg_4[1].head.data[0], tupledArg_4[1].tail.head.data[0], getValue(tupledArg_4[1].head.data[0].data[7].data[1]), getValue(tupledArg_4[1].tail.head.data[0].data[7].data[1]), tupledArg_4[1].head.data[0].data[7].data[0], tupledArg_4[1].tail.head.data[0].data[7].data[0]] : [2] : [2] : [2] : [2] : [2] : [2] : [2] : [0, tupledArg_4[1].head] : [2];

          switch ($var3[0]) {
            case 0:
              const $var4 = $var3[1].tag === 4 ? [0, $var3[1].data[0]] : $var3[1].tag === 1 ? [1, $var3[1].data[0]] : $var3[1].tag === 8 ? $var3[1].data[0].data[2] != null ? [2, $var3[1].data[0].data[6], getValue($var3[1].data[0].data[2]), $var3[1].data[0].data[3]] : [7] : $var3[1].tag === 10 ? [3, $var3[1].data[0], $var3[1].data[1], $var3[1].data[4], $var3[1].data[8], $var3[1].data[3], $var3[1].data[6], $var3[1].data[7], $var3[1].data[2]] : $var3[1].tag === 5 ? [4, $var3[1].data[0].data[8], $var3[1].data[0].data[1], $var3[1].data[0].data[3]] : $var3[1].tag === 9 ? [5] : $var3[1].tag === 6 ? $var3[1].data[1] != null ? [6, getValue($var3[1].data[1])] : [7] : [7];

              switch ($var4[0]) {
                case 0:
                  return collect_1(CurriedLambda(processBinding)(false, enclosingEntityKind_1, false), $var4[1]);

                case 1:
                  return processBinding(true, enclosingEntityKind_1, false, $var4[1]);

                case 2:
                  return ofArray([createMember([$var4[2], new FSharpNavigationDeclarationItemKind(7), new FSharpGlyph(7), $var4[3].Range, enclosingEntityKind_1, false, $var4[1]])]);

                case 3:
                  return ofArray([createMember([$var4[8], new FSharpNavigationDeclarationItemKind(7), new FSharpGlyph(7), $var4[8].idRange, enclosingEntityKind_1, false, $var4[7]])]);

                case 4:
                  return ofArray([createMember([$var4[2], new FSharpNavigationDeclarationItemKind(5), new FSharpGlyph(10), $var4[3].Range, enclosingEntityKind_1, true, $var4[1]])]);

                case 5:
                  throw new Error("tycon as member????");

                case 6:
                  return processMembers($var4[1], enclosingEntityKind_1)[1];

                case 7:
                  return new List();
              }

            case 1:
              const matchValue_4 = processBinding(true, enclosingEntityKind_1, false, $var3[1]);

              if (matchValue_4.tail == null) {
                return processBinding(true, enclosingEntityKind_1, false, $var3[2]);
              } else {
                return matchValue_4;
              }

            case 2:
              return new List();
          }
        })()];
      }, groupBy(function (x) {
        return x.Range;
      }, members_1));
      return [(state = range_1.Zero, function (source) {
        return fold(function (r1, r2) {
          return unionRangesChecked(r1, r2);
        }, state, source);
      })(map_1(function (tuple) {
        return tuple[0];
      }, members_2)), concat(map(function (tuple_1) {
        return tuple_1[1];
      }, members_2))];
    };

    const processNestedDeclarations = function (decls) {
      return collect_1(function (_arg5) {
        return _arg5.tag === 2 ? collect_1(CurriedLambda(processBinding)(false, new FSharpEnclosingEntityKind(1), false), _arg5.data[1]) : new List();
      }, decls);
    };

    const processFSharpNavigationTopLevelDeclarations = function (tupledArg_5) {
      return collect_1(function (_arg6) {
        switch (_arg6.tag) {
          case 0:
            return ofArray([createDecl([tupledArg_5[0], _arg6.data[0], new FSharpNavigationDeclarationItemKind(3), new FSharpGlyph(11), _arg6.data[2], rangeOfLid(_arg6.data[1]), new List(), new FSharpEnclosingEntityKind(0), false, null])]);

          case 1:
            const lid_3 = _arg6.data[0].data[3];
            const access_4 = _arg6.data[0].data[6];
            const nested_6 = processNestedDeclarations(_arg6.data[2]);
            const newBaseName = (tupledArg_5[0] === "" ? "" : tupledArg_5[0] + ".") + textOfLid(lid_3);
            const other = processFSharpNavigationTopLevelDeclarations([newBaseName, _arg6.data[2]]);
            return new List(createDeclLid([tupledArg_5[0], lid_3, new FSharpNavigationDeclarationItemKind(3), new FSharpGlyph(11), _arg6.data[4], unionRangesChecked(rangeOfDecls(nested_6), moduleRange(rangeOfLid(lid_3), other)), nested_6, new FSharpEnclosingEntityKind(1), false, access_4]), other);

          case 4:
            return collect_1(CurriedLambda(processTycon)(tupledArg_5[0]), _arg6.data[0]);

          case 5:
            return processExnDefn(tupledArg_5[0], _arg6.data[0]);

          default:
            return new List();
        }
      }, tupledArg_5[1]);
    };

    let items;
    const singleTopLevel = modules.length === 1;
    items = collect_1(function (_arg1_1) {
      const baseName_3 = !singleTopLevel ? textOfLid(_arg1_1.data[0]) : "";
      const nested_7 = processNestedDeclarations(_arg1_1.data[3]);
      const other_1 = processFSharpNavigationTopLevelDeclarations([baseName_3, _arg1_1.data[3]]);

      if (_arg1_1.data[0].tail == null) {
        return other_1;
      } else {
        const decl = [FSharpNavigationDeclarationItem.Create(textOfLid(_arg1_1.data[0]), _arg1_1.data[2] ? new FSharpNavigationDeclarationItemKind(1) : new FSharpNavigationDeclarationItemKind(0), new FSharpGlyph(11), _arg1_1.data[7], unionRangesChecked(rangeOfDecls(nested_7), moduleRange(rangeOfLid(_arg1_1.data[0]), other_1)), singleTopLevel, new FSharpEnclosingEntityKind(1), false, _arg1_1.data[6]), addItemName(textOfLid(_arg1_1.data[0])), nested_7];
        return new List(decl, other_1);
      }
    }, modules);
    const items_1 = map_2(function (tupledArg_6) {
      const nest = map_2(function (tupledArg_7) {
        return tupledArg_7[0].WithUniqueName(uniqueName(tupledArg_6[0].Name, tupledArg_7[1]));
      }, Array.from(tupledArg_6[2]), Array);
      nest.sort(function (a, b) {
        return comparePrimitives(a.Name, b.Name);
      });
      return new FSharpNavigationTopLevelDeclaration(tupledArg_6[0].WithUniqueName(uniqueName(tupledArg_6[0].Name, tupledArg_6[1])), nest);
    }, Array.from(items), Array);
    items_1.sort(function (a_1, b_1) {
      return comparePrimitives(a_1.Declaration.Name, b_1.Declaration.Name);
    });
    return new FSharpNavigationItems(items_1);
  };

  const getNavigationFromSigFile = __exports.getNavigationFromSigFile = function (modules) {
    const nameMap = {
      contents: create(null, new Comparer(comparePrimitives))
    };

    const addItemName = function (name) {
      const count = defaultArg(function (table) {
        return tryFind(name, table);
      }(nameMap.contents), 0) | 0;
      nameMap.contents = add(name, count + 1, nameMap.contents);
      return count + 1 | 0;
    };

    const uniqueName = function (name_1, idx) {
      const total = find(name_1, nameMap.contents) | 0;
      return toText(printf("%s_%d_of_%d"))(name_1, idx, total);
    };

    const createDeclLid = function (tupledArg) {
      const name_2 = (tupledArg[0] !== "" ? tupledArg[0] + "." : "") + textOfLid(tupledArg[1]);
      return [FSharpNavigationDeclarationItem.Create(name_2, tupledArg[2], tupledArg[3], tupledArg[4], tupledArg[5], false, tupledArg[7], tupledArg[8], tupledArg[9]), addItemName(name_2), tupledArg[6]];
    };

    const createDecl = function (tupledArg_1) {
      const name_3 = (tupledArg_1[0] !== "" ? tupledArg_1[0] + "." : "") + tupledArg_1[1].idText;
      return [FSharpNavigationDeclarationItem.Create(name_3, tupledArg_1[2], tupledArg_1[3], tupledArg_1[4], tupledArg_1[5], false, tupledArg_1[7], tupledArg_1[8], tupledArg_1[9]), addItemName(name_3), tupledArg_1[6]];
    };

    const createMember = function (tupledArg_2) {
      return [FSharpNavigationDeclarationItem.Create(tupledArg_2[0].idText, tupledArg_2[1], tupledArg_2[2], tupledArg_2[3], tupledArg_2[3], false, tupledArg_2[4], tupledArg_2[5], tupledArg_2[6]), addItemName(tupledArg_2[0].idText)];
    };

    const processExnRepr = function (baseName, nested, _arg1) {
      const id = _arg1.data[1].data[1];
      const fldspec = _arg1.data[1].data[2];
      return ofArray([createDecl([baseName, id, new FSharpNavigationDeclarationItemKind(2), new FSharpGlyph(6), _arg1.data[5], fldspecRange(fldspec), nested, new FSharpEnclosingEntityKind(3), false, _arg1.data[4]])]);
    };

    const processExnSig = function (baseName_1, _arg2) {
      const nested_1 = processSigMembers(_arg2.data[1]);
      return processExnRepr(baseName_1, nested_1, _arg2.data[0]);
    };

    const processTycon = function (baseName_2, _arg3) {
      const lid = _arg3.data[0].data[3];
      const access = _arg3.data[0].data[6];
      const topMembers = processSigMembers(_arg3.data[2]);

      if (_arg3.data[1].tag === 0) {
        const members = processSigMembers(_arg3.data[1].data[1]);
        const nested_2 = append(members, topMembers);
        return ofArray([createDeclLid([baseName_2, lid, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(0), _arg3.data[3], bodyRange(_arg3.data[1].data[2], nested_2), nested_2, new FSharpEnclosingEntityKind(2), false, access])]);
      } else if (_arg3.data[1].tag === 1) {
        switch (_arg3.data[1].data[0].tag) {
          case 0:
            const cases = toList(delay(function () {
              return collect(function (matchValue) {
                return singleton(createMember([matchValue.data[1], new FSharpNavigationDeclarationItemKind(8), new FSharpGlyph(14), unionRanges(fldspecRange(matchValue.data[2]), matchValue.data[1].idRange), new FSharpEnclosingEntityKind(7), false, access]));
              }, _arg3.data[1].data[0].data[1]);
            }));
            const nested_3 = append(cases, topMembers);
            return ofArray([createDeclLid([baseName_2, lid, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(17), _arg3.data[3], bodyRange(_arg3.data[1].data[0].data[2], nested_3), nested_3, new FSharpEnclosingEntityKind(7), false, access])]);

          case 1:
            const cases_1 = toList(delay(function () {
              return collect(function (matchValue_1) {
                return singleton(createMember([matchValue_1.data[1], new FSharpNavigationDeclarationItemKind(7), new FSharpGlyph(4), matchValue_1.data[4], new FSharpEnclosingEntityKind(6), false, access]));
              }, _arg3.data[1].data[0].data[0]);
            }));
            const nested_4 = append(cases_1, topMembers);
            return ofArray([createDeclLid([baseName_2, lid, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(3), _arg3.data[3], bodyRange(_arg3.data[1].data[0].data[1], nested_4), nested_4, new FSharpEnclosingEntityKind(6), false, access])]);

          case 2:
            const fields = toList(delay(function () {
              return collect(function (matchValue_2) {
                return CurriedLambda(() => matchValue_2.data[2] != null)() ? singleton(createMember([getValue(matchValue_2.data[2]), new FSharpNavigationDeclarationItemKind(7), new FSharpGlyph(7), matchValue_2.data[7], new FSharpEnclosingEntityKind(5), false, access])) : empty_1();
              }, _arg3.data[1].data[0].data[1]);
            }));
            const nested_5 = append(fields, topMembers);
            return ofArray([createDeclLid([baseName_2, lid, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(16), _arg3.data[3], bodyRange(_arg3.data[1].data[0].data[2], nested_5), nested_5, new FSharpEnclosingEntityKind(5), false, access])]);

          case 5:
            return ofArray([createDeclLid([baseName_2, lid, new FSharpNavigationDeclarationItemKind(4), new FSharpGlyph(15), _arg3.data[3], bodyRange(_arg3.data[1].data[0].data[2], topMembers), topMembers, new FSharpEnclosingEntityKind(2), false, access])]);

          default:
            return new List();
        }
      } else {
        return processExnRepr(baseName_2, new List(), _arg3.data[1].data);
      }
    };

    const processSigMembers = function (members_1) {
      return toList(delay(function () {
        return collect(function (memb) {
          const $var5 = memb.tag === 0 ? [0, memb.data[0].data[8], memb.data[0].data[1], memb.data[0].data[10]] : memb.tag === 3 ? memb.data[0].data[2] != null ? [1, memb.data[0].data[6], getValue(memb.data[0].data[2]), memb.data[0].data[3]] : [2] : [2];

          switch ($var5[0]) {
            case 0:
              return singleton(createMember([$var5[2], new FSharpNavigationDeclarationItemKind(5), new FSharpGlyph(9), $var5[3], new FSharpEnclosingEntityKind(2), false, $var5[1]]));

            case 1:
              return singleton(createMember([$var5[2], new FSharpNavigationDeclarationItemKind(7), new FSharpGlyph(7), $var5[3].Range, new FSharpEnclosingEntityKind(2), false, $var5[1]]));

            case 2:
              return empty_1();
          }
        }, members_1);
      }));
    };

    const processNestedSigDeclarations = function (decls) {
      return collect_1(function (_arg4) {
        if (_arg4.tag === 2) {
          const m = _arg4.data[0].data[10];
          const id_1 = _arg4.data[0].data[1];
          const access_1 = _arg4.data[0].data[8];
          return ofArray([createMember([id_1, new FSharpNavigationDeclarationItemKind(5), new FSharpGlyph(9), m, new FSharpEnclosingEntityKind(1), false, access_1])]);
        } else {
          return new List();
        }
      }, decls);
    };

    const processFSharpNavigationTopLevelSigDeclarations = function (tupledArg_3) {
      return collect_1(function (_arg5) {
        switch (_arg5.tag) {
          case 0:
            return ofArray([createDecl([tupledArg_3[0], _arg5.data[0], new FSharpNavigationDeclarationItemKind(3), new FSharpGlyph(11), _arg5.data[2], rangeOfLid(_arg5.data[1]), new List(), new FSharpEnclosingEntityKind(1), false, null])]);

          case 1:
            const lid_1 = _arg5.data[0].data[3];
            const access_2 = _arg5.data[0].data[6];
            const nested_6 = processNestedSigDeclarations(_arg5.data[2]);
            const newBaseName = (tupledArg_3[0] === "" ? "" : tupledArg_3[0] + ".") + textOfLid(lid_1);
            const other = processFSharpNavigationTopLevelSigDeclarations([newBaseName, _arg5.data[2]]);
            return new List(createDeclLid([tupledArg_3[0], lid_1, new FSharpNavigationDeclarationItemKind(3), new FSharpGlyph(11), _arg5.data[3], unionRangesChecked(rangeOfDecls(nested_6), moduleRange(rangeOfLid(lid_1), other)), nested_6, new FSharpEnclosingEntityKind(1), false, access_2]), other);

          case 3:
            return collect_1(CurriedLambda(processTycon)(tupledArg_3[0]), _arg5.data[0]);

          case 4:
            return processExnSig(tupledArg_3[0], _arg5.data[0]);

          default:
            return new List();
        }
      }, tupledArg_3[1]);
    };

    let items;
    const singleTopLevel = modules.length === 1;
    items = collect_1(function (_arg1_1) {
      const baseName_3 = !singleTopLevel ? textOfLid(_arg1_1.data[0]) : "";
      const nested_7 = processNestedSigDeclarations(_arg1_1.data[3]);
      const other_1 = processFSharpNavigationTopLevelSigDeclarations([baseName_3, _arg1_1.data[3]]);
      const decl = [FSharpNavigationDeclarationItem.Create(textOfLid(_arg1_1.data[0]), _arg1_1.data[2] ? new FSharpNavigationDeclarationItemKind(1) : new FSharpNavigationDeclarationItemKind(0), new FSharpGlyph(11), _arg1_1.data[7], unionRangesChecked(rangeOfDecls(nested_7), moduleRange(rangeOfLid(_arg1_1.data[0]), other_1)), singleTopLevel, new FSharpEnclosingEntityKind(1), false, _arg1_1.data[6]), addItemName(textOfLid(_arg1_1.data[0])), nested_7];
      return new List(decl, other_1);
    }, modules);
    const items_1 = map_2(function (tupledArg_4) {
      const nest = map_2(function (tupledArg_5) {
        return tupledArg_5[0].WithUniqueName(uniqueName(tupledArg_4[0].Name, tupledArg_5[1]));
      }, Array.from(tupledArg_4[2]), Array);
      nest.sort(function (a, b) {
        return comparePrimitives(a.Name, b.Name);
      });
      const nest_1 = Array.from(distinctBy(function (x) {
        return [x.Range, x.BodyRange, x.Name, x.Kind];
      }, nest));
      return new FSharpNavigationTopLevelDeclaration(tupledArg_4[0].WithUniqueName(uniqueName(tupledArg_4[0].Name, tupledArg_4[1])), nest_1);
    }, Array.from(items), Array);
    items_1.sort(function (a_1, b_1) {
      return comparePrimitives(a_1.Declaration.Name, b_1.Declaration.Name);
    });
    return new FSharpNavigationItems(items_1);
  };

  const getNavigation = __exports.getNavigation = function (parsedInput) {
    if (parsedInput.tag === 0) {
      const modules = parsedInput.data.data[5];
      return getNavigationFromImplFile(modules);
    } else {
      const modules_1 = parsedInput.data.data[4];
      return getNavigationFromSigFile(modules_1);
    }
  };

  const empty = __exports.empty = new FSharpNavigationItems([]);
  return __exports;
}({});
export const NavigateTo = function (__exports) {
  const NavigableItemKind = __exports.NavigableItemKind = class NavigableItemKind {
    constructor(tag) {
      this.tag = tag | 0;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.NavigateTo.NavigableItemKind",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Module"], ["ModuleAbbreviation"], ["Exception"], ["Type"], ["ModuleValue"], ["Field"], ["Property"], ["Constructor"], ["Member"], ["EnumCase"], ["UnionCase"]]
      };
    }

    Equals(other) {
      return this.tag === other.tag;
    }

    CompareTo(other) {
      return comparePrimitives(this.tag, other.tag);
    }

    ToString() {
      return toText(printf("%+A"))(this);
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.NavigateTo.NavigableItemKind", NavigableItemKind);
  const ContainerType = __exports.ContainerType = class ContainerType {
    constructor(tag) {
      this.tag = tag | 0;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.NavigateTo.ContainerType",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["File"], ["Namespace"], ["Module"], ["Type"], ["Exception"]]
      };
    }

    Equals(other) {
      return this.tag === other.tag;
    }

    CompareTo(other) {
      return comparePrimitives(this.tag, other.tag);
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.NavigateTo.ContainerType", ContainerType);
  const Container = __exports.Container = class Container {
    constructor(type, name) {
      this.Type = type;
      this.Name = name;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.NavigateTo.Container",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Type: ContainerType,
          Name: "string"
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

    CompareTo(other) {
      return compareRecords(this, other) | 0;
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.NavigateTo.Container", Container);
  const NavigableItem = __exports.NavigableItem = class NavigableItem {
    constructor(name, range, isSignature, kind, container) {
      this.Name = name;
      this.Range = range;
      this.IsSignature = isSignature;
      this.Kind = kind;
      this.Container = container;
    }

    [_Symbol.reflection]() {
      return {
        type: "Microsoft.FSharp.Compiler.SourceCodeServices.NavigateTo.NavigableItem",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          Name: "string",
          Range: range_1,
          IsSignature: "boolean",
          Kind: NavigableItemKind,
          Container: Container
        }
      };
    }

    Equals(other) {
      return equalsRecords(this, other);
    }

  };
  setType("Microsoft.FSharp.Compiler.SourceCodeServices.NavigateTo.NavigableItem", NavigableItem);

  const getNavigableItems = __exports.getNavigableItems = function (parsedInput) {
    const lastInLid = function (lid) {
      lastInLid: while (true) {
        if (lid.tail != null) {
          if (lid.tail.tail == null) {
            return lid.head;
          } else {
            lid = lid.tail;
            continue lastInLid;
          }
        } else {
          return null;
        }
      }
    };

    const formatLongIdent = function (lid_1) {
      return join(".", map(function (id) {
        return id.idText;
      }, lid_1));
    };

    const result = [];

    const addIdent = function (kind, id_1, isSignature, container) {
      if (!isNullOrEmpty(id_1.idText)) {
        const item = new NavigableItem(id_1.idText, id_1.idRange, isSignature, kind, container);
        result.push(item);
      }
    };

    const addModule = function (lid_2, isSig, container_1) {
      const matchValue = lastInLid(lid_2);

      if (matchValue != null) {
        addIdent(new NavigableItemKind(0), getValue(matchValue), isSig, container_1);
      }
    };

    const addModuleAbbreviation = function (id_2, isSig_1, container_2) {
      addIdent(new NavigableItemKind(1), id_2, isSig_1, container_2);
    };

    const addExceptionRepr = function (_arg1, isSig_2, container_3) {
      const id_3 = _arg1.data[1].data[1];
      addIdent(new NavigableItemKind(2), id_3, isSig_2, container_3);
      return new Container(new ContainerType(4), id_3.idText);
    };

    const addComponentInfo = function (containerType, kind_1, _arg2, isSig_3, container_4) {
      const matchValue_1 = lastInLid(_arg2.data[3]);

      if (matchValue_1 != null) {
        addIdent(kind_1, getValue(matchValue_1), isSig_3, container_4);
      }

      return new Container(containerType, formatLongIdent(_arg2.data[3]));
    };

    const addValSig = function (kind_2, _arg3, isSig_4, container_5) {
      addIdent(kind_2, _arg3.data[1], isSig_4, container_5);
    };

    const addField = function (_arg4, isSig_5, container_6) {
      if (_arg4.data[2] != null) {
        addIdent(new NavigableItemKind(5), getValue(_arg4.data[2]), isSig_5, container_6);
      }
    };

    const addEnumCase = CurriedLambda(function (_arg5, isSig_6) {
      return CurriedLambda(addIdent)(new NavigableItemKind(9), _arg5.data[1], isSig_6);
    });

    const addUnionCase = function (_arg6, isSig_7, container_7) {
      addIdent(new NavigableItemKind(10), _arg6.data[1], isSig_7, container_7);
    };

    const mapMemberKind = function (mk) {
      switch (mk.tag) {
        case 1:
          return new NavigableItemKind(7);

        case 3:
        case 4:
        case 5:
          return new NavigableItemKind(6);

        case 2:
          return new NavigableItemKind(8);

        default:
          return new NavigableItemKind(7);
      }
    };

    const addBinding = function (_arg7, itemKind, container_8) {
      const kind_3 = itemKind != null ? getValue(itemKind) : _arg7.data[6].data[0] != null ? mapMemberKind(getValue(_arg7.data[6].data[0]).MemberKind) : new NavigableItemKind(4);
      const $var6 = _arg7.data[7].tag === 7 ? _arg7.data[7].data[0].data[0].tail != null ? _arg7.data[7].data[0].data[0].tail.tail == null ? [1, _arg7.data[7].data[0].data[0].head] : _arg7.data[7].data[0].data[0].tail.tail.tail == null ? [0, _arg7.data[7].data[4], _arg7.data[7].data[0].data[0].tail.head] : [3] : [3] : _arg7.data[7].tag === 2 ? [2, _arg7.data[7].data[1]] : [3];

      switch ($var6[0]) {
        case 0:
          addIdent(kind_3, $var6[2], false, container_8);
          break;

        case 1:
          addIdent(kind_3, $var6[1], false, container_8);
          break;

        case 2:
          addIdent(kind_3, $var6[1], false, container_8);
          break;

        case 3:
          break;
      }
    };

    const addMember = function (valSig, memberFlags, isSig_8, container_9) {
      const ctor = mapMemberKind(memberFlags.MemberKind);
      addValSig(ctor, valSig, isSig_8, container_9);
    };

    const walkSigFileInput = function (_arg8) {
      for (let item_1 of _arg8.data[4]) {
        walkSynModuleOrNamespaceSig(item_1, new Container(new ContainerType(0), _arg8.data[0]));
      }
    };

    const walkSynModuleOrNamespaceSig = function (_arg9, container_10) {
      if (_arg9.data[2]) {
        addModule(_arg9.data[0], true, container_10);
      }

      const container_11 = new Container(_arg9.data[2] ? new ContainerType(2) : new ContainerType(1), formatLongIdent(_arg9.data[0]));

      for (let decl of _arg9.data[3]) {
        walkSynModuleSigDecl(decl, container_11);
      }
    };

    const walkSynModuleSigDecl = function (decl_1, container_12) {
      switch (decl_1.tag) {
        case 4:
          const representation = decl_1.data[0].data[0];
          addExceptionRepr(representation, true, container_12);
          break;

        case 7:
          walkSynModuleOrNamespaceSig(decl_1.data, container_12);
          break;

        case 1:
          const container_13 = addComponentInfo(new ContainerType(2), new NavigableItemKind(0), decl_1.data[0], true, container_12);

          for (let decl_2 of decl_1.data[2]) {
            walkSynModuleSigDecl(decl_2, container_13);
          }

          break;

        case 3:
          for (let ty of decl_1.data[0]) {
            walkSynTypeDefnSig(ty, container_12);
          }

          break;

        case 2:
          addValSig(new NavigableItemKind(4), decl_1.data[0], true, container_12);
          break;

        case 6:
        case 5:
          break;

        default:
          addModuleAbbreviation(decl_1.data[0], true, container_12);
      }
    };

    const walkSynTypeDefnSig = function (_arg10, container_14) {
      const container_15 = addComponentInfo(new ContainerType(3), new NavigableItemKind(3), _arg10.data[0], true, container_14);

      for (let m of _arg10.data[2]) {
        walkSynMemberSig(m, container_15);
      }

      if (_arg10.data[1].tag === 1) {
        walkSynTypeDefnSimpleRepr(_arg10.data[1].data[0], true, container_15);
      } else if (_arg10.data[1].tag === 2) {} else {
        for (let m_1 of _arg10.data[1].data[1]) {
          walkSynMemberSig(m_1, container_15);
        }
      }
    };

    const walkSynMemberSig = function (synMemberSig, container_16) {
      switch (synMemberSig.tag) {
        case 3:
          addField(synMemberSig.data[0], true, container_16);
          break;

        case 4:
          walkSynTypeDefnSig(synMemberSig.data[0], container_16);
          break;

        case 2:
        case 1:
          break;

        default:
          addMember(synMemberSig.data[0], synMemberSig.data[1], true, container_16);
      }
    };

    const walkImplFileInpit = function (_arg11) {
      const container_17 = new Container(new ContainerType(0), _arg11.data[0]);

      for (let item_2 of _arg11.data[5]) {
        walkSynModuleOrNamespace(item_2, container_17);
      }
    };

    const walkSynModuleOrNamespace = function (_arg12, container_18) {
      if (_arg12.data[2]) {
        addModule(_arg12.data[0], false, container_18);
      }

      const container_19 = new Container(_arg12.data[2] ? new ContainerType(2) : new ContainerType(1), formatLongIdent(_arg12.data[0]));

      for (let decl_3 of _arg12.data[3]) {
        walkSynModuleDecl(decl_3, container_19);
      }
    };

    const walkSynModuleDecl = function (decl_4, container_20) {
      switch (decl_4.tag) {
        case 2:
          for (let binding of decl_4.data[1]) {
            addBinding(binding, null, container_20);
          }

          break;

        case 0:
          addModuleAbbreviation(decl_4.data[0], false, container_20);
          break;

        case 9:
          walkSynModuleOrNamespace(decl_4.data, container_20);
          break;

        case 1:
          const container_21 = addComponentInfo(new ContainerType(2), new NavigableItemKind(0), decl_4.data[0], false, container_20);

          for (let m_2 of decl_4.data[2]) {
            walkSynModuleDecl(m_2, container_21);
          }

          break;

        case 4:
          for (let t of decl_4.data[0]) {
            walkSynTypeDefn(t, container_20);
          }

          break;

        case 7:
        case 3:
        case 8:
        case 6:
          break;

        default:
          const synMembers = decl_4.data[0].data[1];
          const repr = decl_4.data[0].data[0];
          const container_22 = addExceptionRepr(repr, false, container_20);

          for (let m_3 of synMembers) {
            walkSynMemberDefn(m_3, container_22);
          }

      }
    };

    const walkSynTypeDefn = function (_arg13, container_23) {
      const container_24 = addComponentInfo(new ContainerType(3), new NavigableItemKind(3), _arg13.data[0], false, container_23);
      walkSynTypeDefnRepr(_arg13.data[1], container_24);

      for (let m_4 of _arg13.data[2]) {
        walkSynMemberDefn(m_4, container_24);
      }
    };

    const walkSynTypeDefnRepr = function (typeDefnRepr, container_25) {
      if (typeDefnRepr.tag === 1) {
        walkSynTypeDefnSimpleRepr(typeDefnRepr.data[0], false, container_25);
      } else if (typeDefnRepr.tag === 2) {} else {
        for (let m_5 of typeDefnRepr.data[1]) {
          walkSynMemberDefn(m_5, container_25);
        }
      }
    };

    const walkSynTypeDefnSimpleRepr = function (repr_1, isSig_9, container_26) {
      switch (repr_1.tag) {
        case 2:
          for (let f of repr_1.data[1]) {
            addField(f, isSig_9, container_26);
          }

          break;

        case 0:
          for (let uc of repr_1.data[1]) {
            addUnionCase(uc, isSig_9, container_26);
          }

          break;

        case 3:
        case 4:
        case 6:
        case 5:
        case 7:
          break;

        default:
          for (let c of repr_1.data[0]) {
            addEnumCase(c, isSig_9, container_26);
          }

      }
    };

    const walkSynMemberDefn = function (memberDefn, container_27) {
      switch (memberDefn.tag) {
        case 10:
          addIdent(new NavigableItemKind(6), memberDefn.data[2], false, container_27);
          break;

        case 6:
          if (memberDefn.data[1] == null) {} else {
            for (let m_6 of getValue(memberDefn.data[1])) {
              walkSynMemberDefn(m_6, container_27);
            }
          }

          break;

        case 1:
          addBinding(memberDefn.data[0], null, container_27);
          break;

        case 9:
          walkSynTypeDefn(memberDefn.data[0], container_27);
          break;

        case 8:
          addField(memberDefn.data[0], false, container_27);
          break;

        case 4:
          iterate(function (binding_1) {
            addBinding(binding_1, new NavigableItemKind(5), container_27);
          }, memberDefn.data[0]);
          break;

        case 0:
        case 3:
        case 7:
        case 2:
          break;

        default:
          addMember(memberDefn.data[0], memberDefn.data[1], false, container_27);
      }
    };

    if (parsedInput.tag === 0) {
      walkImplFileInpit(parsedInput.data);
    } else {
      walkSigFileInput(parsedInput.data);
    }

    return Array.from(result);
  };

  return __exports;
}({});