import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { ImportSpecifier, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportDeclaration, Program, ExportAllDeclaration, ModuleDeclaration, InterfaceDeclaration, ObjectTypeAnnotation, ExportSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, FunctionDeclaration, ClassDeclaration, ClassMethodKind, ClassBody, ClassExpression, ClassMethod, ClassProperty, LabeledStatement, ContinueStatement, SequenceExpression, ConditionalExpression, DebuggerStatement, ThrowStatement, WhileStatement, UpdateExpression, ForStatement, ForOfStatement, IfStatement, TryStatement, CatchClause, SwitchStatement, SwitchCase, BreakStatement, LogicalExpression, ObjectProperty, ObjectMethodKind, ObjectMethod, ObjectExpression, RegExpLiteral, BooleanLiteral, UnaryExpression, NullLiteral, Super, ThisExpression, FunctionExpression, ExpressionStatement, BinaryExpression, NumericLiteral, ReturnStatement, BlockStatement, RestElement, TypeParameter, TypeParameterDeclaration, TypeAnnotation, MacroExpression, VariableDeclaration, VariableDeclarationKind, ArrowFunctionExpression, AssignmentExpression, NewExpression, ArrayExpression, AnyTypeAnnotation, NullableTypeAnnotation, FunctionTypeParam, FunctionTypeAnnotation, TupleTypeAnnotation, TypeParameterInstantiation, GenericTypeAnnotation, NumberTypeAnnotation, StringTypeAnnotation, BooleanTypeAnnotation, VoidTypeAnnotation, CallExpression, EmptyExpression, MemberExpression, StringLiteral, Identifier, SpreadElement, Expression } from "../AST/AST.Babel";
import { hasInterface, comparePrimitives, Interface, Unit, Function as _Function, makeGeneric as makeGeneric_1, compareRecords, equalsRecords, Option, equals } from "../fable-core/Util";
import { mapIndexed as mapIndexed_1, choose as choose_1, foldBack, singleton as singleton_1, collect as collect_1, append as append_1, delay, last, take, zip, item, toList, tryPick, fold, exists } from "../fable-core/Seq";
import { choose, concat, collect, singleton, mapIndexed, append, ofArray, reverse, map } from "../fable-core/List";
import List from "../fable-core/List";
import { ApplyKind, Declaration, ArrayConsKind, Type, MemberLoc, MemberKind, Member, ImportKind, ValueKind, Expr, Ident, File } from "../AST/AST.Fable";
import { groupBy, tryGetValue, tryFind, create, add } from "../fable-core/Map";
import _Map from "../fable-core/Map";
import CurriedLambda from "../fable-core/CurriedLambda";
import { Patterns, SourceLocation, List as List_1, Path, Naming } from "../Fable.Core/Util";
import { defaultArg, getValue } from "../fable-core/Option";
import { toText, trim, printf, toFail, split as split_1 } from "../fable-core/String";
import { tryReplaceEntity } from "./Replacements";
import { deepExists, addError, attachRange, getTypedArrayName } from "../AST/AST.Fable.Util";
import { NumberKind, UpdateOperator, UnaryOperator, BinaryOperator, AssignmentOperator } from "../AST/AST.Common";
import Comparer from "../fable-core/Comparer";
import { distinct, distinctBy } from "../fable-core/Set";
import { Plugins } from "./Utils";
export class ReturnStrategy {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Fable2Babel.ReturnStrategy",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Return"], ["Assign", Expression]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}
setType("Fable.Fable2Babel.ReturnStrategy", ReturnStrategy);
export class Import {
  constructor(path, selector, localIdent, internalFile) {
    this.path = path;
    this.selector = selector;
    this.localIdent = localIdent;
    this.internalFile = internalFile;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Fable2Babel.Import",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        path: "string",
        selector: "string",
        localIdent: Option("string"),
        internalFile: Option("string")
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
setType("Fable.Fable2Babel.Import", Import);

function getTailCallArgIds(com, args) {
  const replaceArgs = exists(function (arg) {
    const matchValue = arg.Type;

    if (matchValue.tag === 11) {
      return true;
    } else {
      return false;
    }
  }, args);
  return [replaceArgs, map(function (arg_1) {
    return replaceArgs ? com.GetUniqueVar() : arg_1.Name;
  }, args)];
}

export class ClassTailCallOpportunity {
  [_Symbol.reflection]() {
    return {
      type: "Fable.Fable2Babel.ClassTailCallOpportunity",
      interfaces: ["Fable.Fable2Babel.ITailCallOpportunity"],
      properties: {}
    };
  }

  constructor(com, name, args) {
    this.name = name;
    const patternInput = getTailCallArgIds(com, args);
    this.replaceArgs = patternInput[0];
    this.argIds = patternInput[1];
  }

  get Label() {
    return this.name;
  }

  get Args() {
    return this.argIds;
  }

  get ReplaceArgs() {
    return this.replaceArgs;
  }

  IsRecursiveRef(e) {
    const $var1 = e.tag === 3 ? e.data[0].tag === 0 ? e.data[0].data.tag === 1 ? e.data[1].tail != null ? e.data[1].head.tag === 0 ? e.data[1].head.data.tag === 8 ? e.data[1].tail.tail == null ? e.data[2].tag === 1 ? [0, e.data[1].head.data.data] : [1] : [1] : [1] : [1] : [1] : [1] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return this.name === $var1[1];

      case 1:
        return false;
    }
  }

}
setType("Fable.Fable2Babel.ClassTailCallOpportunity", ClassTailCallOpportunity);
export class NamedTailCallOpportunity {
  [_Symbol.reflection]() {
    return {
      type: "Fable.Fable2Babel.NamedTailCallOpportunity",
      interfaces: ["Fable.Fable2Babel.ITailCallOpportunity"],
      properties: {}
    };
  }

  constructor(com, name, args) {
    this.name = name;
    const patternInput = getTailCallArgIds(com, args);
    this.replaceArgs = patternInput[0];
    this.argIds = patternInput[1];
  }

  get Label() {
    return this.name;
  }

  get Args() {
    return this.argIds;
  }

  get ReplaceArgs() {
    return this.replaceArgs;
  }

  IsRecursiveRef(e) {
    const $var2 = e.tag === 0 ? e.data.tag === 5 ? [0, e.data.data] : [1] : [1];

    switch ($var2[0]) {
      case 0:
        return this.name === $var2[1].Name;

      case 1:
        return false;
    }
  }

}
setType("Fable.Fable2Babel.NamedTailCallOpportunity", NamedTailCallOpportunity);
export class Context {
  constructor(file, moduleFullName, rootEntitiesPrivateNames, isFunctionBody, addDeclaredVar, tailCallOpportunity, optimizeTailCall) {
    this.file = file;
    this.moduleFullName = moduleFullName;
    this.rootEntitiesPrivateNames = rootEntitiesPrivateNames;
    this.isFunctionBody = isFunctionBody;
    this.addDeclaredVar = addDeclaredVar;
    this.tailCallOpportunity = tailCallOpportunity;
    this.optimizeTailCall = optimizeTailCall;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.Fable2Babel.Context",
      interfaces: ["FSharpRecord"],
      properties: {
        file: File,
        moduleFullName: "string",
        rootEntitiesPrivateNames: makeGeneric_1(_Map, {
          Key: "string",
          Value: "string"
        }),
        isFunctionBody: "boolean",
        addDeclaredVar: _Function([Ident, Unit]),
        tailCallOpportunity: Option(Interface("Fable.Fable2Babel.ITailCallOpportunity")),
        optimizeTailCall: _Function([Unit, Unit])
      }
    };
  }

}
setType("Fable.Fable2Babel.Context", Context);
export const Util = function (__exports) {
  const _Assignments___ = __exports["|Assignments|_|"] = function (ctx, e) {
    const $var3 = e.tag === 10 ? ctx.isFunctionBody ? [0, e.data[0], e.data[1]] : [1] : [1];

    switch ($var3[0]) {
      case 0:
        const length = $var3[1].length | 0;
        return function (_arg1) {
          return _arg1[0] ? [reverse(_arg1[1]), reverse(_arg1[2]), $var3[2]] : null;
        }(fold(function (tupledArg, e_1) {
          var value;
          var r;
          var ident;
          const matchValue = [tupledArg[0], e_1];
          const $var4 = matchValue[0] ? matchValue[1].tag === 9 ? tupledArg[3] < length ? [1] : [2] : [2] : [0];

          switch ($var4[0]) {
            case 0:
              return [false, new List(), new List(), 0];

            case 1:
              return [true, tupledArg[1], new List(e_1, tupledArg[2]), tupledArg[3] + 1];

            case 2:
              const $var5 = matchValue[1].tag === 8 ? (value = matchValue[1].data[1], r = matchValue[1].data[3], ident = matchValue[1].data[0], tupledArg[3] < length) ? [0, matchValue[1].data[0], matchValue[1].data[3], matchValue[1].data[1]] : [1] : [1];

              switch ($var5[0]) {
                case 0:
                  const setExpr = new Expr(9, [new Expr(0, new ValueKind(5, $var5[1])), null, $var5[3], $var5[2]]);
                  return [true, new List($var5[1], tupledArg[1]), new List(setExpr, tupledArg[2]), tupledArg[3] + 1];

                case 1:
                  if (!matchValue[1].IsJsStatement) {
                    return [true, tupledArg[1], new List(matchValue[1], tupledArg[2]), tupledArg[3] + 1];
                  } else {
                    return [false, new List(), new List(), 0];
                  }

              }

          }
        }, [true, new List(), new List(), 1], $var3[1]));

      case 1:
        return null;
    }
  };

  const consBack = __exports.consBack = function (tail, head) {
    return new List(head, tail);
  };

  const prepareArgs = __exports.prepareArgs = function (com, ctx) {
    var mapping;
    return CurriedLambda((mapping = function (_arg1) {
      const $var6 = _arg1.tag === 0 ? _arg1.data.tag === 3 ? [0, _arg1.data.data] : [1, _arg1] : [1, _arg1];

      switch ($var6[0]) {
        case 0:
          return new SpreadElement(function (arg00, arg10) {
            return com.TransformExpr(arg00, arg10);
          }(ctx, $var6[1]));

        case 1:
          return function (arg00_1, arg10_1) {
            return com.TransformExpr(arg00_1, arg10_1);
          }(ctx, $var6[1]);
      }
    }, function (list) {
      return map(mapping, list);
    }));
  };

  const ident = __exports.ident = function (id) {
    return new Identifier(id.Name);
  };

  const identFromName = __exports.identFromName = function (name) {
    const name_1 = Naming.sanitizeIdent(function (_arg1) {
      return false;
    }, name);
    return new Identifier(name_1);
  };

  const sanitizeName = __exports.sanitizeName = function (propName) {
    if (Naming.hasIdentForbiddenChars(propName)) {
      return [new StringLiteral(propName), true];
    } else {
      return [new Identifier(propName), false];
    }
  };

  const sanitizeProp = __exports.sanitizeProp = function (com, ctx, _arg1) {
    var name;
    const $var7 = _arg1.tag === 0 ? _arg1.data.tag === 8 ? (name = _arg1.data.data, !Naming.hasIdentForbiddenChars(name)) ? [0, _arg1.data.data] : [1] : [1] : [1];

    switch ($var7[0]) {
      case 0:
        return [new Identifier($var7[1]), false];

      case 1:
        const activePatternResult62795 = function (e) {
          return function (arg00, arg10) {
            return com.TransformExpr(arg00, arg10);
          }(ctx, e);
        }(_arg1);

        return [activePatternResult62795, true];
    }
  };

  const getCoreLibImport = __exports.getCoreLibImport = function (com, ctx, coreModule, memb) {
    return function (arg00, arg10, arg20, arg30) {
      return com.GetImportExpr(arg00, arg10, arg20, arg30);
    }(ctx, memb, coreModule, new ImportKind(0));
  };

  const getSymbol = __exports.getSymbol = function (com, ctx, name) {
    return function (tupledArg) {
      return new MemberExpression(tupledArg[0], tupledArg[1]);
    }([getCoreLibImport(com, ctx, "Symbol", "default"), new Identifier(name)]);
  };

  const get = __exports.get = function (left, propName) {
    const patternInput = sanitizeName(propName);
    return new MemberExpression(left, patternInput[0], patternInput[1]);
  };

  const getExpr = __exports.getExpr = function (com, ctx, _arg1, property) {
    const activePatternResult62814 = function (e) {
      return function (arg00, arg10) {
        return com.TransformExpr(arg00, arg10);
      }(ctx, e);
    }(_arg1);

    const patternInput = sanitizeProp(com, ctx, property);

    if (activePatternResult62814 instanceof EmptyExpression) {
      if (patternInput[0] instanceof StringLiteral) {
        return identFromName(patternInput[0].value);
      } else {
        return patternInput[0];
      }
    } else {
      return new MemberExpression(activePatternResult62814, patternInput[0], patternInput[1]);
    }
  };

  const tryFindMember = __exports.tryFindMember = function (ownerName, membName, entName, decls) {
    return tryPick(function (_arg1) {
      const $var8 = _arg1.tag === 1 ? ownerName.indexOf(_arg1.data[0].FullName) === 0 ? [0, _arg1.data[0], _arg1.data[3]] : [1] : [1];

      switch ($var8[0]) {
        case 0:
          return tryFindMember(ownerName, membName, $var8[1].FullName, $var8[2]);

        case 1:
          const $var9 = _arg1.tag === 2 ? (ownerName === entName ? _arg1.data[0].Name === membName : false) ? [0, _arg1.data[0], _arg1.data[2]] : [1] : [1];

          switch ($var9[0]) {
            case 0:
              return [$var9[1], $var9[2]];

            case 1:
              return null;
          }

      }
    }, decls);
  };

  const accessExpr = __exports.accessExpr = function (members, baseExpr) {
    if (baseExpr == null) {
      if (members.tail != null) {
        return function (baseExpr_1) {
          return accessExpr(members.tail, baseExpr_1);
        }(identFromName(members.head));
      } else {
        return new EmptyExpression();
      }
    } else if (members.tail != null) {
      return function (baseExpr_2) {
        return accessExpr(members.tail, baseExpr_2);
      }(get(getValue(baseExpr), members.head));
    } else {
      return getValue(baseExpr);
    }
  };

  const typeRef = __exports.typeRef = function (com, ctx, ent, genArgs, memb) {
    const makeGeneric = function (expr) {
      const matchValue = [genArgs, memb];

      if (matchValue[0].tail == null) {
        return expr;
      } else if (matchValue[1] == null) {
        return function (genArgs_1) {
          return new CallExpression(getCoreLibImport(com, ctx, "Util", "makeGeneric"), map(function (arg0) {
            return arg0;
          }, ofArray([expr, genArgs_1])));
        }(function (ms) {
          return function (arg00, arg10, arg20, arg30) {
            return com.TransformObjectExpr(arg00, arg10, arg20, arg30);
          }(ctx, ms, null, null);
        }(map(function (tupledArg) {
          const m = new Member(tupledArg[0], new MemberKind(4), new MemberLoc(0), new List(), new Type(1));
          return [m, new List(), tupledArg[1]];
        }, matchValue[0])));
      } else {
        return expr;
      }
    };

    const getParts = function (ns, fullName, memb_1) {
      const split = function (s) {
        return toList(split_1(s, "."));
      };

      const removeCommon = function (xs1, xs2) {
        var xs2_1;
        var xs1_1;
        var x2;
        var x1;

        removeCommon: while (true) {
          const matchValue_1 = [xs1, xs2];
          const $var10 = matchValue_1[0].tail != null ? matchValue_1[1].tail != null ? (xs2_1 = matchValue_1[1].tail, xs1_1 = matchValue_1[0].tail, x2 = matchValue_1[1].head, x1 = matchValue_1[0].head, x1 === x2) ? [0, matchValue_1[0].head, matchValue_1[1].head, matchValue_1[0].tail, matchValue_1[1].tail] : [1] : [1] : [1];

          switch ($var10[0]) {
            case 0:
              xs1 = $var10[3];
              xs2 = $var10[4];
              continue removeCommon;

            case 1:
              return xs2;
          }
        }
      };

      return append(removeCommon(split(ns), split(fullName)), memb_1 == null ? new List() : ofArray([getValue(memb_1)]));
    };

    const matchValue_2 = ent.File;

    if (matchValue_2 != null) {
      if (ctx.file.SourcePath !== getValue(matchValue_2)) {
        const rootModule = com.GetRootModule(getValue(matchValue_2));
        const importPath = Path.getRelativeFileOrDirPath(false, ctx.file.SourcePath, false, getValue(matchValue_2));
        return makeGeneric(function (_arg1) {
          return _arg1.tail != null ? function (baseExpr) {
            return accessExpr(_arg1.tail, baseExpr);
          }(function (arg00_1, arg10_1, arg20_1, arg30_1) {
            return com.GetImportExpr(arg00_1, arg10_1, arg20_1, arg30_1);
          }(ctx, _arg1.head, importPath, new ImportKind(1, getValue(matchValue_2)))) : function (arg00_2, arg10_2, arg20_2, arg30_2) {
            return com.GetImportExpr(arg00_2, arg10_2, arg20_2, arg30_2);
          }(ctx, "*", importPath, new ImportKind(1, getValue(matchValue_2)));
        }(getParts(rootModule, ent.FullName, memb)));
      } else {
        return makeGeneric((() => {
          const matchValue_3 = getParts(ctx.moduleFullName, ent.FullName, memb);
          const $var11 = matchValue_3.tail != null ? matchValue_3.tail.tail == null ? memb != null ? [0, matchValue_3.head] : [1] : [1] : [1];

          switch ($var11[0]) {
            case 0:
              const matchValue_4 = tryFindMember(ent.FullName, $var11[1], ctx.file.Root.FullName, ctx.file.Declarations);
              const $var12 = matchValue_4 != null ? getValue(matchValue_4)[1] != null ? [0, getValue(getValue(matchValue_4)[1])] : [1] : [1];

              switch ($var12[0]) {
                case 0:
                  return accessExpr(ofArray([$var12[1]]), null);

                case 1:
                  return accessExpr(ofArray([$var11[1]]), null);
              }

            case 1:
              const $var13 = matchValue_3.tail != null ? Naming.hasIdentForbiddenChars(matchValue_3.head) ? [0, matchValue_3.tail, matchValue_3.head] : [1] : [1];

              switch ($var13[0]) {
                case 0:
                  return function (rootMemb) {
                    return accessExpr(new List(rootMemb, $var13[1]), null);
                  }(ctx.rootEntitiesPrivateNames.has($var13[2]) ? ctx.rootEntitiesPrivateNames.get($var13[2]) : $var13[2]);

                case 1:
                  return accessExpr(matchValue_3, null);
              }

          }
        })());
      }
    } else {
      const matchValue_5 = tryReplaceEntity(com, ent, genArgs);

      if (matchValue_5 == null) {
        return toFail(printf("Cannot access type: %s"))(ent.FullName);
      } else {
        return function (arg00_3, arg10_3) {
          return com.TransformExpr(arg00_3, arg10_3);
        }(ctx, getValue(matchValue_5));
      }
    }
  };

  const typeAnnotation = __exports.typeAnnotation = function (com, ctx, typ) {
    const _FullName_ = function (ent) {
      return ent.FullName;
    };

    let $var14;

    if (typ.tag === 2) {
      $var14 = [0];
    } else if (typ.tag === 3) {
      $var14 = [1];
    } else if (typ.tag === 5) {
      $var14 = [2];
    } else if (typ.tag === 6) {
      $var14 = [3];
    } else if (typ.tag === 9) {
      $var14 = [4, typ.data];
    } else if (typ.tag === 10) {
      $var14 = [5, typ.data];
    } else if (typ.tag === 11) {
      $var14 = [6, typ.data[0], typ.data[1]];
    } else if (typ.tag === 12) {
      $var14 = [7, typ.data];
    } else if (typ.tag === 13) {
      $var14 = [8];
    } else if (typ.tag === 8) {
      $var14 = [9, typ.data];
    } else if (typ.tag === 14) {
      const activePatternResult62870 = _FullName_(typ.data[0]);

      if (activePatternResult62870 === "System.Collections.Generic.IEnumerable") {
        if (typ.data[1].tail != null) {
          if (typ.data[1].tail.tail == null) {
            $var14 = [10, typ.data[1].head];
          } else {
            $var14 = [11, typ.data[0], typ.data[1]];
          }
        } else {
          $var14 = [11, typ.data[0], typ.data[1]];
        }
      } else {
        $var14 = [11, typ.data[0], typ.data[1]];
      }
    } else {
      $var14 = [12];
    }

    switch ($var14[0]) {
      case 0:
        return new VoidTypeAnnotation();

      case 1:
        return new BooleanTypeAnnotation();

      case 2:
        return new StringTypeAnnotation();

      case 3:
        return new NumberTypeAnnotation();

      case 4:
        return new GenericTypeAnnotation(new Identifier("Array"), new TypeParameterInstantiation(ofArray([typeAnnotation(com, ctx, $var14[1])])));

      case 5:
        return new TupleTypeAnnotation(map(function (typ_1) {
          return typeAnnotation(com, ctx, typ_1);
        }, $var14[1]));

      case 6:
        return function (argTypes) {
          return new FunctionTypeAnnotation(argTypes, typeAnnotation(com, ctx, $var14[2]));
        }(mapIndexed(function (i, argType) {
          return new FunctionTypeParam(new Identifier("arg" + i.toString()), typeAnnotation(com, ctx, argType));
        }, $var14[1]));

      case 7:
        return new GenericTypeAnnotation(new Identifier($var14[1]));

      case 8:
        return new NumberTypeAnnotation();

      case 9:
        return new NullableTypeAnnotation(typeAnnotation(com, ctx, $var14[1]));

      case 10:
        return new GenericTypeAnnotation(new Identifier("Iterable"), new TypeParameterInstantiation(ofArray([typeAnnotation(com, ctx, $var14[1])])));

      case 11:
        try {
          const matchValue = typeRef(com, ctx, $var14[1], new List(), null);

          if (matchValue instanceof StringLiteral) {
            const matchValue_1 = matchValue.value;

            if (matchValue_1 === "number") {
              return new NumberTypeAnnotation();
            } else if (matchValue_1 === "boolean") {
              return new BooleanTypeAnnotation();
            } else if (matchValue_1 === "string") {
              return new StringTypeAnnotation();
            } else {
              return new AnyTypeAnnotation();
            }
          } else if (matchValue instanceof Identifier) {
            let typeParams;
            const matchValue_2 = map(function (typ_2) {
              return typeAnnotation(com, ctx, typ_2);
            }, $var14[2]);

            if (matchValue_2.tail == null) {
              typeParams = null;
            } else {
              typeParams = new TypeParameterInstantiation(matchValue_2);
            }

            return new GenericTypeAnnotation(matchValue, typeParams);
          } else {
            return new AnyTypeAnnotation();
          }
        } catch (matchValue_3) {
          return new AnyTypeAnnotation();
        }

      case 12:
        return new AnyTypeAnnotation();
    }
  };

  const buildArray = __exports.buildArray = function (com, ctx, consKind, typ) {
    const $var15 = typ.tag === 6 ? com.Options.typedArrays ? [0, typ.data] : [1] : [1];

    switch ($var15[0]) {
      case 0:
        const cons = function (arg00) {
          return new Identifier(arg00);
        }(getTypedArrayName(com, $var15[1]));

        const args = consKind.tag === 1 ? ofArray([function (arg00_1, arg10) {
          return com.TransformExpr(arg00_1, arg10);
        }(ctx, consKind.data)]) : singleton(function (arg00_2) {
          return new ArrayExpression(arg00_2);
        }(map($var17 => function (arg0_1) {
          return arg0_1;
        }(($var16 => function (arg0) {
          return arg0;
        }(CurriedLambda(function (arg00_3, arg10_1) {
          return com.TransformExpr(arg00_3, arg10_1);
        })(ctx)($var16)))($var17)), consKind.data)));
        return new NewExpression(cons, args);

      case 1:
        if (consKind.tag === 1) {
          const activePatternResult62889 = function (e) {
            return function (arg00_4, arg10_2) {
              return com.TransformExpr(arg00_4, arg10_2);
            }(ctx, e);
          }(consKind.data);

          return new NewExpression(new Identifier("Array"), ofArray([activePatternResult62889]));
        } else {
          return function (arg00_5) {
            return new ArrayExpression(arg00_5);
          }(map($var19 => function (arg0_3) {
            return arg0_3;
          }(($var18 => function (arg0_2) {
            return arg0_2;
          }(CurriedLambda(function (arg00_6, arg10_3) {
            return com.TransformExpr(arg00_6, arg10_3);
          })(ctx)($var18)))($var19)), consKind.data));
        }

    }
  };

  const buildStringArray = __exports.buildStringArray = function (strings) {
    return function (arg00) {
      return new ArrayExpression(arg00);
    }(map(function (x) {
      return new StringLiteral(x);
    }, strings));
  };

  const assign = __exports.assign = function (range, left, right) {
    return new AssignmentExpression(new AssignmentOperator(0), left, right, range);
  };

  const iife = __exports.iife = function (com, ctx, expr) {
    const patternInput = function (arg00, arg10, arg20, arg30) {
      return com.TransformFunction(arg00, arg10, arg20, arg30);
    }(ctx, null, new List(), expr);

    return new CallExpression(new ArrowFunctionExpression(new List(), patternInput[1], null, expr.Range), new List(), expr.Range);
  };

  const varDeclaration = __exports.varDeclaration = function (range, _var, isMutable, value) {
    const kind = isMutable ? new VariableDeclarationKind(1) : new VariableDeclarationKind(2);
    return VariableDeclaration[".ctor"](_var, value, kind, range);
  };

  const macroExpression = __exports.macroExpression = function (range, txt, args) {
    return new MacroExpression(txt, args, range);
  };

  const getMemberArgsAndBody = __exports.getMemberArgsAndBody = function (com, ctx, tc, args, body, typeParams, hasRestParams) {
    const patternInput = function (arg00, arg10, arg20, arg30) {
      return com.TransformFunction(arg00, arg10, arg20, arg30);
    }(ctx, tc, args, body);

    const patternInput_1 = com.Options.declaration ? [mapIndexed(function (i, arg) {
      return arg instanceof Identifier ? new Identifier(arg.name, new TypeAnnotation(typeAnnotation(com, ctx, item(i, args).Type))) : arg;
    }, patternInput[0]), new TypeAnnotation(typeAnnotation(com, ctx, body.Type)), new TypeParameterDeclaration(map(function (arg00_1) {
      return new TypeParameter(arg00_1);
    }, typeParams))] : [patternInput[0], null, null];
    let args_2;

    if (!hasRestParams) {
      args_2 = patternInput_1[0];
    } else {
      const args_1 = reverse(patternInput_1[0]);
      args_2 = reverse(new List(new RestElement(args_1.head), args_1.tail));
    }

    const body_1 = patternInput[1] instanceof Expression ? new BlockStatement(ofArray([new ReturnStatement(patternInput[1], patternInput[1].loc)]), null, patternInput[1].loc) : patternInput[1];
    return [args_2, body_1, patternInput_1[1], patternInput_1[2]];
  };

  const wrapIntExpression = __exports.wrapIntExpression = function (typ, e) {
    const matchValue = [e, typ];
    const $var20 = matchValue[0] instanceof NumericLiteral ? [0] : matchValue[1].tag === 6 ? matchValue[1].data.tag === 0 ? [1] : matchValue[1].data.tag === 2 ? [1] : matchValue[1].data.tag === 4 ? [1] : [2] : matchValue[1].tag === 13 ? [1] : [2];

    switch ($var20[0]) {
      case 0:
        return e;

      case 1:
        return new BinaryExpression(new BinaryOperator(17), e, new NumericLiteral(0), e.loc);

      case 2:
        return e;
    }
  };

  const getRemovableLambda = __exports.getRemovableLambda = function (args, body) {
    const listAll = function (predicate, lst) {
      return !exists($var21 => function (value) {
        return !value;
      }(predicate($var21)), lst);
    };

    const hasSameArgs = function (callExpr) {
      if (callExpr.arguments.length === args.length) {
        const argNames = map(function (_arg1) {
          return _arg1 instanceof Identifier ? _arg1.name : "";
        }, args);
        return CurriedLambda(listAll)(function (tupledArg) {
          const $var22 = tupledArg[1] instanceof Expression ? tupledArg[1].type === "Identifier" ? [0, tupledArg[1]] : [1] : [1];

          switch ($var22[0]) {
            case 0:
              const argIdentifier = $var22[1];
              return argIdentifier.name === tupledArg[0];

            case 1:
              return false;
          }
        })(toList(zip(argNames, callExpr.arguments)));
      } else {
        return false;
      }
    };

    const getRemovableCall = function (e, loc) {
      if (e instanceof CallExpression) {
        if (hasSameArgs(e)) {
          const matchValue = e.callee;

          if (matchValue instanceof Identifier) {
            return new Identifier(matchValue.name, matchValue.typeAnnotation, loc);
          } else if (matchValue instanceof MemberExpression) {
            if (!matchValue.computed ? matchValue.object.type === "Identifier" : false) {
              return new CallExpression(new MemberExpression(matchValue, new Identifier("bind"), false, e.loc), ofArray([matchValue.object]), loc);
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    };

    if (body instanceof Expression) {
      return getRemovableCall(body, body.loc);
    } else {
      const matchValue_1 = body.body;
      const $var23 = matchValue_1.tail != null ? matchValue_1.tail.tail == null ? [0, matchValue_1.head] : [1] : [1];

      switch ($var23[0]) {
        case 0:
          if ($var23[1] instanceof ExpressionStatement) {
            return getRemovableCall($var23[1].expression, body.loc);
          } else {
            return null;
          }

        case 1:
          return null;
      }
    }
  };

  const transformLambda = __exports.transformLambda = function (r, info, args, body) {
    if (info.CaptureThis) {
      return new ArrowFunctionExpression(args, body, null, r);
    } else {
      const matchValue = getRemovableLambda(args, body);

      if (matchValue != null) {
        return getValue(matchValue);
      } else {
        return function (body_1) {
          return new FunctionExpression(args, body_1, null, null, null, null, null, r);
        }(body instanceof Expression ? new BlockStatement(ofArray([new ReturnStatement(body, body.loc)]), null, body.loc) : body);
      }
    }
  };

  const transformValue = __exports.transformValue = function (com, ctx, r, _arg1) {
    switch (_arg1.tag) {
      case 1:
        return new ThisExpression();

      case 2:
        return new Super();

      case 0:
        return new NullLiteral();

      case 5:
        return new Identifier(_arg1.data.Name);

      case 7:
        if (_arg1.data[0] < 0) {
          return new UnaryExpression(new UnaryOperator(0), new NumericLiteral(_arg1.data[0] * -1));
        } else {
          return new NumericLiteral(_arg1.data[0]);
        }

      case 8:
        return new StringLiteral(_arg1.data);

      case 9:
        return new BooleanLiteral(_arg1.data);

      case 10:
        return new RegExpLiteral(_arg1.data[0], _arg1.data[1]);

      case 16:
        const tupledArg = function (arg00, arg10, arg20, arg30) {
          return com.TransformFunction(arg00, arg10, arg20, arg30);
        }(ctx, null, _arg1.data[0], _arg1.data[1]);

        const func = function (args, body) {
          return transformLambda(r, _arg1.data[2], args, body);
        };

        return func(tupledArg[0], tupledArg[1]);

      case 11:
        return buildArray(com, ctx, _arg1.data[0], _arg1.data[1]);

      case 12:
        return buildArray(com, ctx, new ArrayConsKind(0, _arg1.data), new Type(1));

      case 17:
        return macroExpression(null, _arg1.data, new List());

      case 4:
        return typeRef(com, ctx, _arg1.data[0], _arg1.data[1], null);

      case 3:
        throw new Error(function (msg) {
          return attachRange(r, msg);
        }("Unexpected array spread"));

      case 15:
      case 14:
      case 13:
        throw new Error(function (msg_1) {
          return attachRange(r, msg_1);
        }("Unexpected stand-alone operator detected"));

      default:
        let patternInput;
        const parts = toList(split_1(_arg1.data[0], "."));
        patternInput = [parts.head, parts.tail];
        return function (baseExpr) {
          return accessExpr(patternInput[1], baseExpr);
        }(function (arg00_1, arg10_1, arg20_1, arg30_1) {
          return com.GetImportExpr(arg00_1, arg10_1, arg20_1, arg30_1);
        }(ctx, patternInput[0], _arg1.data[1], _arg1.data[2]));
    }
  };

  const transformObjectExpr = __exports.transformObjectExpr = function (com, ctx, members, baseClass, range) {
    if (baseClass == null) {
      return function (props) {
        return new ObjectExpression(props, range);
      }(map(function (tupledArg) {
        let patternInput;
        const matchValue = tupledArg[0].Computed;

        if (matchValue == null) {
          patternInput = sanitizeName(tupledArg[0].Name);
        } else {
          patternInput = [function (arg00, arg10) {
            return com.TransformExpr(arg00, arg10);
          }(ctx, getValue(matchValue)), true];
        }

        const makeMethod = function (kind) {
          let patternInput_1;
          const tc = patternInput[0] instanceof Identifier ? new ClassTailCallOpportunity(com, patternInput[0].name, tupledArg[1]) : null;
          patternInput_1 = getMemberArgsAndBody(com, ctx, tc, tupledArg[1], tupledArg[2], tupledArg[0].GenericParameters, tupledArg[0].HasRestParams);
          return new ObjectMethod(kind, patternInput[0], patternInput_1[0], patternInput_1[1], patternInput[1], null, null, patternInput_1[2], patternInput_1[3], tupledArg[2].Range);
        };

        const matchValue_1 = tupledArg[0].Kind;

        switch (matchValue_1.tag) {
          case 1:
            return makeMethod(new ObjectMethodKind(2));

          case 3:
            return makeMethod(new ObjectMethodKind(1));

          case 2:
            return makeMethod(new ObjectMethodKind(0));

          case 4:
            return new ObjectProperty(patternInput[0], function (arg00_1, arg10_1) {
              return com.TransformExpr(arg00_1, arg10_1);
            }(ctx, tupledArg[2]), null, patternInput[1], tupledArg[2].Range);

          default:
            throw new Error(function (msg) {
              return attachRange(range, msg);
            }("Unexpected constructor in Object Expression"));
        }
      }, members));
    } else {
      return function (c) {
        return new NewExpression(c, new List(), range);
      }(CurriedLambda(function (arg00_2, arg10_2, arg20, arg30) {
        return com.TransformClass(arg00_2, arg10_2, arg20, arg30);
      })(ctx, range, baseClass)(map(function (tupledArg_1) {
        return new Declaration(2, [tupledArg_1[0], true, null, tupledArg_1[1], tupledArg_1[2], tupledArg_1[2].Range]);
      }, members)));
    }
  };

  const transformApply = __exports.transformApply = function (com, ctx, callee, args, kind, range) {
    var typEnt;
    var memb;
    let args_1;
    const $var24 = args.tail != null ? args.tail.tail == null ? (args.head.Type.Equals(new Type(2)) ? args.head.IsNull : false) ? [0, args.head] : [1] : [1] : [1];

    switch ($var24[0]) {
      case 0:
        args_1 = new List();
        break;

      case 1:
        args_1 = args;
        break;
    }

    const matchValue = [callee, args_1];
    let $var25;

    if (matchValue[0].tag === 0) {
      if (matchValue[0].data.tag === 15) {
        if (matchValue[1].tail != null) {
          const activePatternResult63002 = function (e) {
            return function (arg00_4, arg10_4) {
              return com.TransformExpr(arg00_4, arg10_4);
            }(ctx, e);
          }(matchValue[1].head);

          if (matchValue[1].tail.tail != null) {
            const activePatternResult63004 = function (e_1) {
              return function (arg00_5, arg10_5) {
                return com.TransformExpr(arg00_5, arg10_5);
              }(ctx, e_1);
            }(matchValue[1].tail.head);

            $var25 = [0, activePatternResult63002, matchValue[0].data.data, activePatternResult63004];
          } else {
            $var25 = [5];
          }
        } else {
          $var25 = [5];
        }
      } else if (matchValue[0].data.tag === 13) {
        if (matchValue[1].tail != null) {
          const activePatternResult63006 = function (e_2) {
            return function (arg00_6, arg10_6) {
              return com.TransformExpr(arg00_6, arg10_6);
            }(ctx, e_2);
          }(matchValue[1].head);

          $var25 = [1, matchValue[0].data.data, activePatternResult63006];
        } else {
          $var25 = [5];
        }
      } else if (matchValue[0].data.tag === 14) {
        if (matchValue[1].tail != null) {
          const activePatternResult63008 = function (e_3) {
            return function (arg00_7, arg10_7) {
              return com.TransformExpr(arg00_7, arg10_7);
            }(ctx, e_3);
          }(matchValue[1].head);

          if (matchValue[1].tail.tail != null) {
            const activePatternResult63010 = function (e_4) {
              return function (arg00_8, arg10_8) {
                return com.TransformExpr(arg00_8, arg10_8);
              }(ctx, e_4);
            }(matchValue[1].tail.head);

            $var25 = [2, activePatternResult63008, matchValue[0].data.data, activePatternResult63010];
          } else {
            $var25 = [5];
          }
        } else {
          $var25 = [5];
        }
      } else if (matchValue[0].data.tag === 17) {
        $var25 = [3, matchValue[1], matchValue[0].data.data];
      } else if (matchValue[0].data.tag === 4) {
        if (matchValue[1].tail != null) {
          if (matchValue[1].head.tag === 0) {
            if (matchValue[1].head.data.tag === 8) {
              if (matchValue[1].tail.tail == null) {
                if (typEnt = matchValue[0].data.data[0], memb = matchValue[1].head.data.data, kind.Equals(new ApplyKind(1))) {
                  $var25 = [4, matchValue[1].head.data.data, matchValue[0].data.data[0]];
                } else {
                  $var25 = [5];
                }
              } else {
                $var25 = [5];
              }
            } else {
              $var25 = [5];
            }
          } else {
            $var25 = [5];
          }
        } else {
          $var25 = [5];
        }
      } else {
        $var25 = [5];
      }
    } else {
      $var25 = [5];
    }

    switch ($var25[0]) {
      case 0:
        return new LogicalExpression($var25[2], $var25[1], $var25[3], range);

      case 1:
        return new UnaryExpression($var25[1], $var25[2], null, range);

      case 2:
        return new BinaryExpression($var25[2], $var25[1], $var25[3], range);

      case 3:
        return function (args_2) {
          return macroExpression(range, $var25[2], args_2);
        }(map(function (_arg1) {
          const $var26 = _arg1.tag === 0 ? _arg1.data.tag === 3 ? [0, _arg1.data.data] : [1, _arg1] : [1, _arg1];

          switch ($var26[0]) {
            case 0:
              return new SpreadElement(function (arg00, arg10) {
                return com.TransformExpr(arg00, arg10);
              }(ctx, $var26[1]), $var26[1].Range);

            case 1:
              return function (arg00_1, arg10_1) {
                return com.TransformExpr(arg00_1, arg10_1);
              }(ctx, $var26[1]);
          }
        }, $var25[1]));

      case 4:
        return typeRef(com, ctx, $var25[2], new List(), $var25[1]);

      case 5:
        if (kind.tag === 2) {
          return new NewExpression(function (arg00_2, arg10_2) {
            return com.TransformExpr(arg00_2, arg10_2);
          }(ctx, callee), prepareArgs(com, ctx)(args_1), range);
        } else if (kind.tag === 1) {
          if (args_1.length === 1) {
            return getExpr(com, ctx, callee, args_1.head);
          } else {
            return toFail(printf("Getter with none or multiple arguments detected at %A"))(range);
          }
        } else {
          return new CallExpression(function (arg00_3, arg10_3) {
            return com.TransformExpr(arg00_3, arg10_3);
          }(ctx, callee), prepareArgs(com, ctx)(args_1), range);
        }

    }
  };

  const block = __exports.block = function (r, statements) {
    return new BlockStatement(statements, null, r);
  };

  const transformBlock = __exports.transformBlock = function (com, ctx, ret, expr) {
    if (ret != null) {
      return block(expr.Range, function (arg00, arg10, arg20) {
        return com.TransformExprAndResolve(arg00, arg10, arg20);
      }(ctx, getValue(ret), expr));
    } else {
      return block(expr.Range, function (arg00_1, arg10_1) {
        return com.TransformStatement(arg00_1, arg10_1);
      }(ctx, expr));
    }
  };

  const transformSwitch = __exports.transformSwitch = function (com, ctx, range, returnStrategy, matchValue, cases, defaultCase) {
    const transformCase = function (test, branch) {
      let patternInput;
      const statements = returnStrategy == null ? function (arg00, arg10) {
        return com.TransformStatement(arg00, arg10);
      }(ctx, branch) : function (arg00_1, arg10_1, arg20) {
        return com.TransformExprAndResolve(arg00_1, arg10_1, arg20);
      }(ctx, getValue(returnStrategy), branch);

      if (test == null) {
        patternInput = [statements, null];
      } else {
        const activePatternResult63031 = function (e) {
          return function (arg00_2, arg10_2) {
            return com.TransformExpr(arg00_2, arg10_2);
          }(ctx, e);
        }(getValue(test));

        const $var27 = returnStrategy != null ? getValue(returnStrategy).tag === 0 ? [0] : [1] : [1];

        switch ($var27[0]) {
          case 0:
            patternInput = [statements, activePatternResult63031];
            break;

          case 1:
            patternInput = [append(statements, ofArray([new BreakStatement()])), activePatternResult63031];
            break;
        }
      }

      return new SwitchCase(patternInput[0], patternInput[1], branch.Range);
    };

    const cases_1 = collect(function (tupledArg) {
      let prev;
      const matchValue_1 = tupledArg[0].length | 0;

      if (matchValue_1 > 1) {
        prev = map(function (test_1) {
          return new SwitchCase(new List(), function (arg00_3, arg10_3) {
            return com.TransformExpr(arg00_3, arg10_3);
          }(ctx, test_1));
        }, toList(take(matchValue_1 - 1, tupledArg[0])));
      } else {
        prev = new List();
      }

      const _case = transformCase(last(tupledArg[0]), tupledArg[1]);

      return append(prev, ofArray([_case]));
    }, cases);
    const cases_2 = defaultCase == null ? cases_1 : append(cases_1, ofArray([transformCase(null, getValue(defaultCase))]));
    return new SwitchStatement(function (arg00_4, arg10_4) {
      return com.TransformExpr(arg00_4, arg10_4);
    }(ctx, matchValue), cases_2, range);
  };

  const transformTryCatch = __exports.transformTryCatch = function (com, ctx, range, returnStrategy, body, _catch, finalizer) {
    var ret;
    let ctx_1;
    const tailCallOpportunity = null;
    ctx_1 = new Context(ctx.file, ctx.moduleFullName, ctx.rootEntitiesPrivateNames, ctx.isFunctionBody, ctx.addDeclaredVar, tailCallOpportunity, ctx.optimizeTailCall);
    const handler = defaultArg(_catch, null, function (tupledArg) {
      return new CatchClause(ident(tupledArg[0]), transformBlock(com, ctx_1, returnStrategy, tupledArg[1]), tupledArg[1].Range);
    });
    const finalizer_1 = defaultArg(finalizer, null, (ret = null, function (expr) {
      return transformBlock(com, ctx_1, ret, expr);
    }));
    return ofArray([new TryStatement(transformBlock(com, ctx_1, returnStrategy, body), handler, finalizer_1, range)]);
  };

  const transformIfStatement = __exports.transformIfStatement = function (com, ctx, r, ret, guardExpr, thenStmnt, elseStmnt) {
    const guardExpr_1 = function (arg00, arg10) {
      return com.TransformExpr(arg00, arg10);
    }(ctx, guardExpr);

    const thenStmnt_1 = transformBlock(com, ctx, ret, thenStmnt);
    const elseStmnt_1 = (ret == null ? elseStmnt.IsNull : false) ? null : elseStmnt.tag === 2 ? transformIfStatement(com, ctx, elseStmnt.data[3], ret, elseStmnt.data[0], elseStmnt.data[1], elseStmnt.data[2]) : transformBlock(com, ctx, ret, elseStmnt);
    return new IfStatement(guardExpr_1, thenStmnt_1, elseStmnt_1, r);
  };

  const transformQuote = __exports.transformQuote = function (com, ctx, r, _expr) {
    var fileName;
    (fileName = ctx.file.SourcePath, function (warning) {
      addError(com, fileName, r, warning);
    })("Quotations are not supported");
    return new NullLiteral();
  };

  const transformStatement = __exports.transformStatement = function (com, ctx, expr) {
    var activePatternResult63073;

    var _var;

    var activePatternResult63076;
    var activePatternResult63077;
    var patternInput;
    var activePatternResult63071;
    let $var28;

    if (expr.tag === 9) {
      $var28 = [1, expr.data[0], expr.data[1], expr.data[2]];
    } else if (expr.tag === 8) {
      if (expr.data[1].tag === 0) {
        if (expr.data[1].data.tag === 6) {
          if (expr.data[1].data.data[0] === "__PLACE-HOLDER__") {
            $var28 = [2, expr.data[2], expr.data[1].data.data[2], expr.data[1].data.data[1], expr.data[3], expr.data[0]];
          } else {
            $var28 = [4, expr.data[2], expr.data[3], expr.data[1], expr.data[0]];
          }
        } else if (expr.data[1].data.tag === 16) {
          if (expr.data[2]) {
            $var28 = [4, expr.data[2], expr.data[3], expr.data[1], expr.data[0]];
          } else {
            $var28 = [3, expr.data[1].data.data[0], expr.data[1].data.data[1], expr.data[1].data.data[2], expr.data[3], expr.data[0]];
          }
        } else {
          $var28 = [4, expr.data[2], expr.data[3], expr.data[1], expr.data[0]];
        }
      } else {
        $var28 = [4, expr.data[2], expr.data[3], expr.data[1], expr.data[0]];
      }
    } else if (expr.tag === 11) {
      $var28 = [5, expr.data[0], expr.data[1], expr.data[2], expr.data[3]];
    } else if (expr.tag === 5) {
      const activePatternResult63104 = function (e_4) {
        return function (arg00_13, arg10_13) {
          return com.TransformExpr(arg00_13, arg10_13);
        }(ctx, e_4);
      }(expr.data[0]);

      $var28 = [6, activePatternResult63104, expr.data[2]];
    } else if (expr.tag === 6) {
      $var28 = [7, expr.data];
    } else if (expr.tag === 2) {
      $var28 = [8, expr.data[2], expr.data[0], expr.data[3], expr.data[1]];
    } else if (expr.tag === 12) {
      $var28 = [9, expr.data[1], expr.data[2], expr.data[0], expr.data[4]];
    } else if (expr.tag === 10) {
      $var28 = [10, expr.data[0]];
    } else if (expr.tag === 13) {
      $var28 = [11, expr.data[0]];
    } else if (expr.tag === 0) {
      $var28 = [12];
    } else if (expr.tag === 3) {
      $var28 = [12];
    } else if (expr.tag === 1) {
      $var28 = [12];
    } else if (expr.tag === 4) {
      $var28 = [12];
    } else {
      $var28 = [0, expr.data[0], expr.data[1]];
    }

    switch ($var28[0]) {
      case 0:
        return singleton($var28[1].tag === 2 ? (activePatternResult63073 = function (e) {
          return function (arg00, arg10) {
            return com.TransformExpr(arg00, arg10);
          }(ctx, e);
        }($var28[1].data[1]), _var = VariableDeclaration[".ctor"](ident($var28[1].data[0]), null, new VariableDeclarationKind(1)), new ForOfStatement(_var, activePatternResult63073, transformBlock(com, ctx, null, $var28[1].data[2]), $var28[2])) : $var28[1].tag === 1 ? (activePatternResult63076 = function (e_1) {
          return function (arg00_1, arg10_1) {
            return com.TransformExpr(arg00_1, arg10_1);
          }(ctx, e_1);
        }($var28[1].data[1]), activePatternResult63077 = function (e_2) {
          return function (arg00_2, arg10_2) {
            return com.TransformExpr(arg00_2, arg10_2);
          }(ctx, e_2);
        }($var28[1].data[2]), patternInput = $var28[1].data[4] ? [new BinaryOperator(5), new UpdateOperator(1)] : [new BinaryOperator(7), new UpdateOperator(0)], new ForStatement(transformBlock(com, ctx, null, $var28[1].data[3]), varDeclaration(null, ident($var28[1].data[0]), true, activePatternResult63076), new BinaryExpression(patternInput[0], ident($var28[1].data[0]), activePatternResult63077), new UpdateExpression(patternInput[1], false, ident($var28[1].data[0])), $var28[2])) : (activePatternResult63071 = function (e_3) {
          return function (arg00_3, arg10_3) {
            return com.TransformExpr(arg00_3, arg10_3);
          }(ctx, e_3);
        }($var28[1].data[0]), new WhileStatement(activePatternResult63071, transformBlock(com, ctx, null, $var28[1].data[1]), $var28[2])));

      case 1:
        const ret = $var28[2] != null ? new ReturnStrategy(1, getExpr(com, ctx, $var28[1], getValue($var28[2]))) : new ReturnStrategy(1, function (arg00_4, arg10_4) {
          return com.TransformExpr(arg00_4, arg10_4);
        }(ctx, $var28[1]));
        return function (arg00_5, arg10_5, arg20) {
          return com.TransformExprAndResolve(arg00_5, arg10_5, arg20);
        }(ctx, ret, $var28[3]);

      case 2:
        const value = function (arg00_6, arg10_6, arg20_1, arg30) {
          return com.GetImportExpr(arg00_6, arg10_6, arg20_1, arg30);
        }(ctx, $var28[5].Name, $var28[3], $var28[2]);

        return ofArray([varDeclaration($var28[4], ident($var28[5]), $var28[1], value)]);

      case 3:
        let value_1;
        const tc = new NamedTailCallOpportunity(com, $var28[5].Name, $var28[1]);

        const tupledArg = function (arg00_7, arg10_7, arg20_2, arg30_1) {
          return com.TransformFunction(arg00_7, arg10_7, arg20_2, arg30_1);
        }(ctx, tc, $var28[1], $var28[2]);

        let func;
        const r = $var28[2].Range;

        func = function (args, body) {
          return transformLambda(r, $var28[3], args, body);
        };

        value_1 = func(tupledArg[0], tupledArg[1]);
        return ofArray([varDeclaration($var28[4], ident($var28[5]), false, value_1)]);

      case 4:
        if ($var28[3].IsJsStatement) {
          const _var_1 = ident($var28[4]);

          const decl = VariableDeclaration[".ctor"](_var_1);

          const body_1 = function (arg00_8, arg10_8, arg20_3) {
            return com.TransformExprAndResolve(arg00_8, arg10_8, arg20_3);
          }(ctx, new ReturnStrategy(1, _var_1), $var28[3]);

          return new List(decl, body_1);
        } else {
          const value_2 = wrapIntExpression($var28[3].Type, function (arg00_9, arg10_9) {
            return com.TransformExpr(arg00_9, arg10_9);
          }(ctx, $var28[3]));
          return ofArray([varDeclaration($var28[2], ident($var28[4]), $var28[1], value_2)]);
        }

      case 5:
        return transformTryCatch(com, ctx, $var28[4], null, $var28[1], $var28[2], $var28[3]);

      case 6:
        return ofArray([new ThrowStatement($var28[1], $var28[2])]);

      case 7:
        return ofArray([new DebuggerStatement($var28[1])]);

      case 8:
        return ofArray([transformIfStatement(com, ctx, $var28[3], null, $var28[2], $var28[4], $var28[1])]);

      case 9:
        return ofArray([transformSwitch(com, ctx, $var28[4], null, $var28[3], $var28[1], $var28[2])]);

      case 10:
        return collect(CurriedLambda(function (arg00_10, arg10_10) {
          return com.TransformStatement(arg00_10, arg10_10);
        })(ctx), $var28[1]);

      case 11:
        return function (arg00_11, arg10_11) {
          return com.TransformStatement(arg00_11, arg10_11);
        }(ctx, $var28[1]);

      case 12:
        return ofArray([new ExpressionStatement(function (arg00_12, arg10_12) {
          return com.TransformExpr(arg00_12, arg10_12);
        }(ctx, expr), expr.Range)]);
    }
  };

  const transformExpr = __exports.transformExpr = function (com, ctx, expr) {
    if (expr.tag === 0) {
      return transformValue(com, ctx, expr.Range, expr.data);
    } else if (expr.tag === 1) {
      return transformObjectExpr(com, ctx, expr.data[0], expr.data[2], expr.Range);
    } else if (expr.tag === 13) {
      const activePatternResult63128 = function (e) {
        return function (arg00, arg10) {
          return com.TransformExpr(arg00, arg10);
        }(ctx, e);
      }(expr.data[0]);

      return activePatternResult63128;
    } else if (expr.tag === 3) {
      return transformApply(com, ctx, expr.data[0], expr.data[1], expr.data[2], expr.data[4]);
    } else if (expr.tag === 2) {
      const activePatternResult63132 = function (e_1) {
        return function (arg00_1, arg10_1) {
          return com.TransformExpr(arg00_1, arg10_1);
        }(ctx, e_1);
      }(expr.data[0]);

      const activePatternResult63133 = function (e_2) {
        return function (arg00_2, arg10_2) {
          return com.TransformExpr(arg00_2, arg10_2);
        }(ctx, e_2);
      }(expr.data[1]);

      const activePatternResult63134 = function (e_3) {
        return function (arg00_3, arg10_3) {
          return com.TransformExpr(arg00_3, arg10_3);
        }(ctx, e_3);
      }(expr.data[2]);

      return new ConditionalExpression(activePatternResult63132, activePatternResult63133, activePatternResult63134, expr.data[3]);
    } else if (expr.tag === 9) {
      const value = wrapIntExpression(expr.data[2].Type, function (arg00_4, arg10_4) {
        return com.TransformExpr(arg00_4, arg10_4);
      }(ctx, expr.data[2]));
      return CurriedLambda(function (left, right) {
        return assign(expr.data[3], left, right);
      })(expr.data[1] != null ? getExpr(com, ctx, expr.data[0], getValue(expr.data[1])) : function (arg00_5, arg10_5) {
        return com.TransformExpr(arg00_5, arg10_5);
      }(ctx, expr.data[0]))(value);
    } else {
      const activePatternResult63135 = _Assignments___(ctx, expr);

      if (activePatternResult63135 != null) {
        for (let _var of getValue(activePatternResult63135)[0]) {
          ctx.addDeclaredVar(_var);
        }

        const exprs = map(CurriedLambda(function (arg00_6, arg10_6) {
          return com.TransformExpr(arg00_6, arg10_6);
        })(ctx), getValue(activePatternResult63135)[1]);
        return new SequenceExpression(exprs, getValue(activePatternResult63135)[2]);
      } else {
        switch (expr.tag) {
          case 10:
          case 11:
          case 5:
          case 6:
          case 7:
          case 12:
            return iife(com, ctx, expr);

          case 8:
            throw new Error(attachRange(expr.Range, "Unexpected variable declaration"));

          case 4:
            return transformQuote(com, ctx, expr.Range, expr.data);

          default:
            throw new Error("C:/projects/fable/src/dotnet/Fable.Compiler/Fable2Babel.fs", 766, 14);
        }
      }
    }
  };

  const transformExprAndResolve = __exports.transformExprAndResolve = function (com, ctx, ret, expr) {
    var tc;

    const resolve = function (strategy, expr_1) {
      if (strategy.tag === 1) {
        return new ExpressionStatement(assign(expr_1.loc, strategy.data, expr_1), expr_1.loc);
      } else {
        return new ReturnStatement(expr_1, expr_1.loc);
      }
    };

    switch (expr.tag) {
      case 1:
        return singleton(CurriedLambda(resolve)(ret)(transformObjectExpr(com, ctx, expr.data[0], expr.data[2], expr.Range)));

      case 13:
        const activePatternResult63163 = function (e) {
          return function (arg00, arg10) {
            return com.TransformExpr(arg00, arg10);
          }(ctx, e);
        }(expr.data[0]);

        return singleton(resolve(ret, activePatternResult63163));

      case 3:
        const matchValue = [ctx.tailCallOpportunity, expr.data[2], ret];
        const $var29 = matchValue[0] != null ? matchValue[1].tag === 0 ? matchValue[2].tag === 0 ? (tc = getValue(matchValue[0]), tc.Args.length === expr.data[1].length ? tc.IsRecursiveRef(expr.data[0]) : false) ? [0, getValue(matchValue[0])] : [1] : [1] : [1] : [1];

        switch ($var29[0]) {
          case 0:
            ctx.optimizeTailCall();
            const zippedArgs = toList(zip($var29[1].Args, expr.data[1]));
            let tempVars;

            const checkCrossRefs = function (acc, _arg1) {
              const $var30 = _arg1.tail != null ? _arg1.tail.tail == null ? [0] : [1, _arg1.head[1], _arg1.head[0], _arg1.tail] : [0];

              switch ($var30[0]) {
                case 0:
                  return acc;

                case 1:
                  return CurriedLambda(checkCrossRefs)(function (_arg3) {
                    return _arg3 ? add($var30[2], com.GetUniqueVar(), acc) : acc;
                  }(exists($var31 => deepExists(function (_arg2) {
                    const $var32 = _arg2.tag === 0 ? _arg2.data.tag === 5 ? [0, _arg2.data.data] : [1] : [1];

                    switch ($var32[0]) {
                      case 0:
                        return $var30[2] === $var32[1].Name;

                      case 1:
                        return false;
                    }
                  }, $var31[1]), $var30[3])))($var30[3]);
              }
            };

            tempVars = checkCrossRefs(create(null, new Comparer(comparePrimitives)), zippedArgs);
            return toList(delay(function () {
              return append_1(collect_1(function (matchValue_1) {
                const arg = transformExpr(com, ctx, matchValue_1[1]);
                const matchValue_2 = tryFind(matchValue_1[0], tempVars);

                if (matchValue_2 == null) {
                  return singleton_1(function (arg00_1) {
                    return new ExpressionStatement(arg00_1);
                  }(assign(null, new Identifier(matchValue_1[0]), arg)));
                } else {
                  return singleton_1(varDeclaration(null, new Identifier(getValue(matchValue_2)), false, arg));
                }
              }, zippedArgs), delay(function () {
                return append_1(collect_1(function (matchValue_3) {
                  const activePatternResult63148 = matchValue_3;
                  return singleton_1(function (arg00_2) {
                    return new ExpressionStatement(arg00_2);
                  }(assign(null, new Identifier(activePatternResult63148[0]), new Identifier(activePatternResult63148[1]))));
                }, tempVars), delay(function () {
                  return singleton_1(new ContinueStatement(new Identifier($var29[1].Label)));
                }));
              }));
            }));

          case 1:
            return singleton(CurriedLambda(resolve)(ret)(wrapIntExpression(expr.Type, transformApply(com, ctx, expr.data[0], expr.data[1], expr.data[2], expr.data[4]))));
        }

      case 2:
        return ofArray([transformIfStatement(com, ctx, expr.data[3], ret, expr.data[0], expr.data[1], expr.data[2])]);

      case 10:
        const lasti = expr.data[0].length - 1 | 0;
        return concat(mapIndexed(function (i, statement) {
          return i < lasti ? function (arg00_3, arg10_1) {
            return com.TransformStatement(arg00_3, arg10_1);
          }(ctx, statement) : function (arg00_4, arg10_2, arg20) {
            return com.TransformExprAndResolve(arg00_4, arg10_2, arg20);
          }(ctx, ret, statement);
        }, expr.data[0]));

      case 11:
        return transformTryCatch(com, ctx, expr.data[3], ret, expr.data[0], expr.data[1], expr.data[2]);

      case 12:
        return ofArray([transformSwitch(com, ctx, expr.data[4], ret, expr.data[0], expr.data[1], expr.data[2])]);

      case 5:
      case 6:
      case 7:
      case 9:
      case 8:
        return function (arg00_5, arg10_3) {
          return com.TransformStatement(arg00_5, arg10_3);
        }(ctx, expr);

      case 4:
        return singleton(CurriedLambda(resolve)(ret)(transformQuote(com, ctx, expr.Range, expr.data)));

      default:
        return singleton(CurriedLambda(resolve)(ret)(wrapIntExpression(expr.Type, transformValue(com, ctx, expr.Range, expr.data))));
    }
  };

  const transformFunction = __exports.transformFunction = function (com, ctx, tailcallChance, args, body) {
    let patternInput;
    const $var33 = args.tail != null ? args.tail.tail == null ? args.head.Type.Equals(new Type(2)) ? [0, args.head] : [1] : [1] : [1];

    switch ($var33[0]) {
      case 0:
        patternInput = [null, new List()];
        break;

      case 1:
        patternInput = [tailcallChance, map(function (id) {
          return ident(id);
        }, args)];
        break;
    }

    const declaredVars = [];
    let isTailCallOptimized = false;
    let ctx_1;

    const addDeclaredVar = function (arg00) {
      declaredVars.push(arg00);
    };

    const optimizeTailCall = function () {
      isTailCallOptimized = true;
    };

    ctx_1 = new Context(ctx.file, ctx.moduleFullName, ctx.rootEntitiesPrivateNames, true, addDeclaredVar, patternInput[0], optimizeTailCall);
    let body_1;
    let $var34;
    const activePatternResult63176 = body.Type;

    if (activePatternResult63176.tag === 2) {
      $var34 = [0];
    } else if (body.tag === 5) {
      $var34 = [0];
    } else if (body.tag === 6) {
      $var34 = [0];
    } else if (body.tag === 7) {
      $var34 = [0];
    } else if (body.tag === 9) {
      $var34 = [0];
    } else if (body.tag === 10) {
      $var34 = [1];
    } else if (body.tag === 11) {
      $var34 = [1];
    } else if (body.tag === 12) {
      $var34 = [1];
    } else if (body.tag === 2) {
      if (body.IsJsStatement) {
        $var34 = [2];
      } else {
        $var34 = [3];
      }
    } else {
      $var34 = [3];
    }

    switch ($var34[0]) {
      case 0:
        body_1 = transformBlock(com, ctx_1, null, body);
        break;

      case 1:
        body_1 = transformBlock(com, ctx_1, new ReturnStrategy(0), body);
        break;

      case 2:
        body_1 = transformBlock(com, ctx_1, new ReturnStrategy(0), body);
        break;

      case 3:
        if (patternInput[0] != null) {
          body_1 = transformBlock(com, ctx_1, new ReturnStrategy(0), body);
        } else {
          body_1 = transformExpr(com, ctx_1, body);
        }

        break;
    }

    let patternInput_2;
    const matchValue = [isTailCallOptimized, patternInput[0], body_1];
    const $var35 = matchValue[0] ? matchValue[1] != null ? matchValue[2] instanceof BlockStatement ? [0, matchValue[2], getValue(matchValue[1])] : [1] : [1] : [1];

    switch ($var35[0]) {
      case 0:
        let patternInput_1;

        if ($var35[2].ReplaceArgs) {
          const statements = foldBack(function (tupledArg, acc) {
            return new List(varDeclaration(null, tupledArg[0], false, new Identifier(tupledArg[1])), acc);
          }, toList(zip(patternInput[1], $var35[2].Args)), new List());
          patternInput_1 = [map(function (arg00_1) {
            return new Identifier(arg00_1);
          }, $var35[2].Args), block($var35[1].loc, append(statements, $var35[1].body))];
        } else {
          patternInput_1 = [patternInput[1], $var35[1]];
        }

        patternInput_2 = [patternInput_1[0], block(patternInput_1[1].loc, singleton(new LabeledStatement(new Identifier($var35[2].Label), new WhileStatement(new BooleanLiteral(true), patternInput_1[1], patternInput_1[1].loc), patternInput_1[1].loc)))];
        break;

      case 1:
        patternInput_2 = [patternInput[1], body_1];
        break;
    }

    let body_2;

    if (declaredVars.length === 0) {
      body_2 = patternInput_2[1];
    } else {
      const varDeclStatements = map(function (_var) {
        return VariableDeclaration[".ctor"](ident(_var), null, new VariableDeclarationKind(0));
      }, toList(distinctBy(function (_var_1) {
        return _var_1.Name;
      }, toList(declaredVars))));
      let patternInput_3;

      if (patternInput_2[1] instanceof Expression) {
        const returnStatement = new ReturnStatement(patternInput_2[1], patternInput_2[1].loc);
        patternInput_3 = [patternInput_2[1].loc, ofArray([returnStatement])];
      } else {
        patternInput_3 = [patternInput_2[1].loc, patternInput_2[1].body];
      }

      body_2 = block(patternInput_3[0], append(varDeclStatements, patternInput_3[1]));
    }

    return [map(function (x) {
      return x;
    }, patternInput_2[0]), body_2];
  };

  const transformClass = __exports.transformClass = function (com, ctx, range, ent, baseClass, decls) {
    const declareProperty = function (com_1, ctx_1, name, typ) {
      const typ_1 = com_1.Options.declaration ? new TypeAnnotation(typeAnnotation(com_1, ctx_1, typ)) : null;
      return new ClassProperty(new Identifier(name), null, typ_1);
    };

    const declareMethod = function (range_1, kind, name_1, args, body, typeParams, hasRestParams, isStatic, computed) {
      const patternInput = computed == null ? sanitizeName(name_1) : [transformExpr(com, ctx, getValue(computed)), true];
      let patternInput_1;
      const tc = patternInput[0] instanceof Identifier ? new ClassTailCallOpportunity(com, patternInput[0].name, args) : null;
      patternInput_1 = getMemberArgsAndBody(com, ctx, tc, args, body, typeParams, hasRestParams);
      return new ClassMethod(kind, patternInput[0], patternInput_1[0], patternInput_1[1], patternInput[1], isStatic, patternInput_1[2], patternInput_1[3], range_1);
    };

    const baseClass_1 = defaultArg(baseClass, null, function (expr) {
      return transformExpr(com, ctx, expr);
    });
    return function (members) {
      const id = defaultArg(ent, null, function (x) {
        return identFromName(x.Name);
      });
      let patternInput_2;
      const matchValue = [com.Options.declaration, ent];
      const $var36 = matchValue[0] ? matchValue[1] != null ? [0] : [1] : [1];

      switch ($var36[0]) {
        case 0:
          const ent_1 = getValue(matchValue[1]);
          const typeParams_1 = new TypeParameterDeclaration(map(function (arg00) {
            return new TypeParameter(arg00);
          }, ent_1.GenericParameters));
          let props;
          const matchValue_1 = ent_1.Kind;
          const $var37 = matchValue_1.tag === 1 ? [0] : matchValue_1.tag === 2 ? [1, matchValue_1.data] : matchValue_1.tag === 3 ? [1, matchValue_1.data] : [2];

          switch ($var37[0]) {
            case 0:
              props = map(function (tupledArg) {
                return declareProperty(com, ctx, tupledArg[0], tupledArg[1]);
              }, ofArray([["tag", new Type(6, new NumberKind(4))]]));
              break;

            case 1:
              props = map(function (tupledArg_1) {
                return declareProperty(com, ctx, tupledArg_1[0], tupledArg_1[1]);
              }, $var37[1]);
              break;

            case 2:
              props = new List();
              break;
          }

          patternInput_2 = [typeParams_1, append(props, members)];
          break;

        case 1:
          patternInput_2 = [null, members];
          break;
      }

      return new ClassExpression(new ClassBody(patternInput_2[1], range), id, baseClass_1, patternInput_2[0], range);
    }(map(function (_arg1) {
      const $var38 = _arg1.tag === 0 ? [1, _arg1] : _arg1.tag === 1 ? [1, _arg1] : [0];

      switch ($var38[0]) {
        case 0:
          let patternInput_3;
          const matchValue_2 = _arg1.data[0].Kind;

          switch (matchValue_2.tag) {
            case 1:
              patternInput_3 = [new ClassMethodKind(1), _arg1.data[0].OverloadName, _arg1.data[0].Location, _arg1.data[0].Computed, _arg1.data[4]];
              break;

            case 2:
            case 4:
              patternInput_3 = [new ClassMethodKind(2), _arg1.data[0].OverloadName, _arg1.data[0].Location, _arg1.data[0].Computed, _arg1.data[4]];
              break;

            case 3:
              patternInput_3 = [new ClassMethodKind(3), _arg1.data[0].OverloadName, _arg1.data[0].Location, _arg1.data[0].Computed, _arg1.data[4]];
              break;

            default:
              patternInput_3 = [new ClassMethodKind(0), "constructor", new MemberLoc(0), null, _arg1.data[4]];
          }

          const isStatic_1 = patternInput_3[2].Equals(new MemberLoc(1));
          return declareMethod(_arg1.data[5], patternInput_3[0], patternInput_3[1], _arg1.data[3], patternInput_3[4], _arg1.data[0].GenericParameters, _arg1.data[0].HasRestParams, isStatic_1, patternInput_3[3]);

        case 1:
          return toFail(printf("Unexpected declaration in class: %A"))($var38[1]);
      }
    }, decls));
  };

  const declareType = __exports.declareType = function (com, ctx, ent) {
    return function (arg00) {
      return new ExpressionStatement(arg00);
    }(new CallExpression(getCoreLibImport(com, ctx, "Symbol", "setType"), ofArray([new StringLiteral(ent.FullName), typeRef(com, ctx, ent, new List(), null)])));
  };

  const declareEntryPoint = __exports.declareEntryPoint = function (_com, _ctx, funcExpr) {
    const argv = macroExpression(null, "process.argv.slice(2)", new List());
    const main = new CallExpression(funcExpr, ofArray([argv]), funcExpr.loc);
    return new ExpressionStatement(main, funcExpr.loc);
  };

  const declareNestedModMember = __exports.declareNestedModMember = function (range, publicName, privateName, isPublic, isMutable, modIdent, expr) {
    var _var;

    const privateName_1 = privateName != null ? privateName : publicName;
    return singleton((_var = identFromName(privateName_1), function (value) {
      return varDeclaration(range, _var, isMutable, value);
    })((() => {
      const matchValue = [isPublic, modIdent];
      const $var39 = matchValue[0] ? matchValue[1] != null ? [0] : [1] : [1];

      switch ($var39[0]) {
        case 0:
          const modIdent_1 = getValue(matchValue[1]);
          return assign(range, get(modIdent_1, publicName), expr);

        case 1:
          return expr;
      }
    })()));
  };

  const declareRootModMember = __exports.declareRootModMember = function (range, publicName, privateName, isPublic, isMutable, _arg1, expr) {
    var varDecl;
    const privateName_1 = privateName != null ? privateName : publicName;
    const privateIdent = identFromName(privateName_1);
    const decl = expr instanceof ClassExpression ? new ClassDeclaration(expr.body, privateIdent, expr.superClass, expr.typeParameters, expr.loc) : expr instanceof FunctionExpression ? new FunctionDeclaration(privateIdent, expr.params, expr.body, null, null, expr.returnType, expr.typeParameters, expr.loc) : varDeclaration(range, privateIdent, isMutable, expr);

    if (!isPublic) {
      return singleton(decl);
    } else if (publicName === "default") {
      let exported;
      const $var40 = decl instanceof VariableDeclaration ? (varDecl = decl, List_1.isSingle(varDecl.declarations)) ? [0, decl] : [1] : [1];

      switch ($var40[0]) {
        case 0:
          const matchValue = item(0, $var40[1].declarations).init;

          if (matchValue == null) {
            exported = decl;
          } else {
            exported = getValue(matchValue);
          }

          break;

        case 1:
          exported = decl;
          break;
      }

      return singleton(new ExportDefaultDeclaration(exported, range));
    } else if (publicName === privateName_1) {
      return singleton(new ExportNamedDeclaration(decl, null, null, range));
    } else {
      const publicName_1 = Naming.replaceIdentForbiddenChars(publicName);
      const expSpec = new ExportSpecifier(privateIdent, new Identifier(publicName_1));
      const expDecl = new ExportNamedDeclaration(null, ofArray([expSpec]));
      return ofArray([expDecl, decl]);
    }
  };

  const transformModMember = __exports.transformModMember = function (com, ctx, helper, modIdent, m, isPublic, privName, args, body, range) {
    let expr_1;
    const matchValue = m.Kind;
    const $var41 = matchValue.tag === 2 ? [0] : matchValue.tag === 4 ? [0] : matchValue.tag === 1 ? m.IsMutable ? [1] : [2] : [2];

    switch ($var41[0]) {
      case 0:
        expr_1 = transformExpr(com, ctx, body);
        break;

      case 1:
        const expr = transformExpr(com, ctx, body);

        const _import = getCoreLibImport(com, ctx, "Util", "createAtom");

        expr_1 = new CallExpression(_import, ofArray([expr]));
        break;

      case 2:
        const $var42 = matchValue.tag === 1 ? [0] : matchValue.tag === 0 ? [1] : matchValue.tag === 3 ? [1] : [2];

        switch ($var42[0]) {
          case 0:
            const bodyRange = body.Range;
            const id = privName != null ? privName : m.OverloadName;
            let patternInput;
            const tc = new NamedTailCallOpportunity(com, id, args);
            patternInput = getMemberArgsAndBody(com, ctx, tc, args, body, m.GenericParameters, false);
            expr_1 = new FunctionExpression(patternInput[0], patternInput[1], null, null, null, patternInput[2], patternInput[3], bodyRange);
            break;

          case 1:
            expr_1 = toFail(printf("Unexpected member in module %O: %A"))(modIdent, m.Kind);
            break;

          case 2:
            throw new Error("C:/projects/fable/src/dotnet/Fable.Compiler/Fable2Babel.fs", 1063, 18);
            break;
        }

        break;
    }

    let memberRange;
    const matchValue_1 = [range, expr_1.loc];
    const $var43 = matchValue_1[0] != null ? matchValue_1[1] != null ? [0, getValue(matchValue_1[0]), getValue(matchValue_1[1])] : [1] : [1];

    switch ($var43[0]) {
      case 0:
        memberRange = SourceLocation.op_Addition($var43[1], $var43[2]);
        break;

      case 1:
        memberRange = null;
        break;
    }

    if (m.HasDecorator("EntryPoint")) {
      return singleton(declareEntryPoint(com, ctx, expr_1));
    } else {
      const publicName = m.HasDecorator("ExportDefault") ? "default" : m.OverloadName;
      return helper.DeclareMember(memberRange, publicName, privName, isPublic, m.IsMutable, modIdent, expr_1);
    }
  };

  const declareInterfaceEntity = __exports.declareInterfaceEntity = function (com, ent) {
    if (!com.Options.declaration) {
      return new List();
    } else {
      const id = new Identifier(ent.Name);
      const body = new ObjectTypeAnnotation(new List());
      return singleton(new InterfaceDeclaration(body, id, new List()));
    }
  };

  const declareClass = __exports.declareClass = function (com, ctx, helper, modIdent, ent, isPublic, privateName, entDecls, entRange, baseClass) {
    let classDecl;
    const classExpr = transformClass(com, ctx, entRange, ent, baseClass, entDecls);
    const publicName = ent.HasDecorator("ExportDefault") ? "default" : ent.Name;
    classDecl = helper.DeclareMember(entRange, publicName, privateName, isPublic, false, modIdent, classExpr);
    const classDecl_1 = new List(declareType(com, ctx, ent), classDecl);
    return function (_arg2) {
      if (_arg2) {
        const cctor = new MemberExpression(typeRef(com, ctx, ent, new List(), null), new StringLiteral(".cctor"), true);
        return function (head) {
          return consBack(classDecl_1, head);
        }(new ExpressionStatement(new CallExpression(cctor, new List())));
      } else {
        return classDecl_1;
      }
    }(exists(function (_arg1) {
      if (_arg1.tag === 2) {
        const matchValue = [_arg1.data[0].Name, _arg1.data[0].Kind, _arg1.data[0].Location];
        const $var44 = matchValue[0] === ".cctor" ? matchValue[1].tag === 1 ? matchValue[2].tag === 1 ? [0] : [1] : [1] : [1];

        switch ($var44[0]) {
          case 0:
            return true;

          case 1:
            return false;
        }
      } else {
        return false;
      }
    }, entDecls));
  };

  const transformNestedModule = __exports.transformNestedModule = function (com, ctx, ent, entDecls, entRange) {
    const modIdent = new Identifier("__exports");
    let modDecls;
    let ctx_1;
    const moduleFullName = ent.FullName;
    ctx_1 = new Context(ctx.file, moduleFullName, ctx.rootEntitiesPrivateNames, ctx.isFunctionBody, ctx.addDeclaredVar, ctx.tailCallOpportunity, ctx.optimizeTailCall);
    const helper = {
      DeclareMember(a, b, c, d, e, f, g) {
        return declareNestedModMember(a, b, c, d, e, f, g);
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Fable.Fable2Babel.IDeclareMember"]
        };
      }

    };
    modDecls = map(function (_arg1) {
      if (_arg1 instanceof ModuleDeclaration) {
        throw new Error("Unexpected export in nested module");
      } else {
        return _arg1;
      }
    }, transformModDecls(com, ctx_1, helper, modIdent, entDecls));
    return new CallExpression(new FunctionExpression(ofArray([modIdent]), block(entRange, modDecls), null, null, null, null, null, entRange), ofArray([new ObjectExpression(new List())]), entRange);
  };

  const transformModDecls = __exports.transformModDecls = function (com, ctx, helper, modIdent, decls) {
    const pluginDeclare = function (decl) {
      return Plugins.tryPlugin(decl.Range, function (p) {
        return function (arg00, arg10, arg20) {
          return p.TryDeclare(arg00, arg10, arg20);
        }(com, ctx, decl);
      })(com.DeclarePlugins);
    };

    return function (decls_1) {
      return reverse(modIdent != null ? function (head) {
        return consBack(decls_1, head);
      }(new ReturnStatement(getValue(modIdent))) : decls_1);
    }(fold(function (acc, decl_1) {
      const activePatternResult63287 = Patterns["|Try|_|"](pluginDeclare, decl_1);

      if (activePatternResult63287 != null) {
        return append(map(function (arg0) {
          return arg0;
        }, getValue(activePatternResult63287)), acc);
      } else if (decl_1.tag === 2) {
        const matchValue = decl_1.data[0].Kind;
        const $var45 = matchValue.tag === 0 ? [0] : matchValue.tag === 3 ? [0] : [1];

        switch ($var45[0]) {
          case 0:
            return acc;

          case 1:
            return append(transformModMember(com, ctx, helper, modIdent, decl_1.data[0], decl_1.data[1], decl_1.data[2], decl_1.data[3], decl_1.data[4], decl_1.data[5]), acc);
        }
      } else if (decl_1.tag === 1) {
        return CurriedLambda(function (list1, list2) {
          return append(list1, list2);
        })((() => {
          const matchValue_1 = decl_1.data[0].Kind;

          switch (matchValue_1.tag) {
            case 4:
              const baseClass = defaultArg(matchValue_1.data[0], null, function (tuple) {
                return tuple[1];
              });
              return declareClass(com, ctx, helper, modIdent, decl_1.data[0], decl_1.data[1], decl_1.data[2], decl_1.data[3], decl_1.data[4], baseClass);

            case 3:
              const baseClass_1 = new Expr(0, new ValueKind(5, new Ident("Error")));
              return declareClass(com, ctx, helper, modIdent, decl_1.data[0], decl_1.data[1], decl_1.data[2], decl_1.data[3], decl_1.data[4], baseClass_1);

            case 1:
            case 2:
              return declareClass(com, ctx, helper, modIdent, decl_1.data[0], decl_1.data[1], decl_1.data[2], decl_1.data[3], decl_1.data[4], null);

            case 0:
              const m = transformNestedModule(com, ctx, decl_1.data[0], decl_1.data[3], decl_1.data[4]);
              const publicName = decl_1.data[0].HasDecorator("ExportDefault") ? "default" : decl_1.data[0].Name;
              return helper.DeclareMember(decl_1.data[4], publicName, decl_1.data[2], decl_1.data[1], false, modIdent, m);

            default:
              return declareInterfaceEntity(com, decl_1.data[0]);
          }
        })())(acc);
      } else {
        return CurriedLambda(function (list1_1, list2_1) {
          return append(list1_1, list2_1);
        })(reverse(map(function (arg0_1) {
          return arg0_1;
        }, transformStatement(com, ctx, decl_1.data[0]))))(acc);
      }
    }, new List(), decls));
  };

  const makeCompiler = __exports.makeCompiler = function (com, state) {
    const imports = new Map();
    const declarePlugins = choose(function (_arg1) {
      return hasInterface(_arg1.plugin, "Fable.Fable2Babel.IDeclarePlugin") ? [_arg1.path, _arg1.plugin] : null;
    }, com.Plugins);
    return {
      get DeclarePlugins() {
        return declarePlugins;
      },

      GetRootModule(file) {
        return state.GetRootModule(file);
      },

      GetImportExpr(ctx, selector, path, kind) {
        const sanitizeSelector = selector_1 => {
          var fileName;
          var range;

          if (selector_1 === "*") {
            return selector_1;
          } else if (selector_1 === "__PLACE-HOLDER__") {
            (fileName = ctx.file.SourcePath, range = null, warning => {
              addError(this, fileName, range, warning);
            })("`importMember` must be assigned to a variable");
            return selector_1;
          } else {
            return Naming.replaceIdentForbiddenChars(selector_1);
          }
        };

        const getLocalIdent = (ctx_1, selector_2) => {
          var conflicts;
          return defaultArg((() => {
            const $var46 = selector_2 === "" ? [0] : selector_2 === "*" ? [1] : selector_2 === "default" ? [1] : [2];

            switch ($var46[0]) {
              case 0:
                return null;

              case 1:
                const x = trim(path, "end", "/");
                return x.substr(x.lastIndexOf("/") + 1);

              case 2:
                return selector_2;
            }
          })(), null, (conflicts = s => ctx_1.file.UsedVarNames.has(s) ? true : exists(i => equals(i.localIdent, s), imports.values()), name => Naming.sanitizeIdent(conflicts, name)));
        };

        const $var47 = kind.tag === 0 ? com.Options.fableCore.indexOf("var ") === 0 ? [0] : [1] : [1];

        switch ($var47[0]) {
          case 0:
            const ident_1 = new Identifier(com.Options.fableCore.slice(4, com.Options.fableCore.length));
            return get(get(ident_1, path), selector);

          case 1:
            const matchValue = tryGetValue(imports, path + "::" + selector, null);

            if (matchValue[0]) {
              if (matchValue[1].localIdent == null) {
                return new NullLiteral();
              } else {
                return new Identifier(getValue(matchValue[1].localIdent));
              }
            } else {
              const localId = getLocalIdent(ctx, selector);
              let i_1;
              const selector_3 = sanitizeSelector(selector);
              const internalFile = kind.tag === 1 ? kind.data : null;
              i_1 = new Import((() => {
                const $var48 = kind.tag === 1 ? [0] : kind.tag === 0 ? [1] : [0];

                switch ($var48[0]) {
                  case 0:
                    return path;

                  case 1:
                    return com.Options.fableCore + "/" + path + Naming.targetFileExtension;
                }
              })(), selector_3, localId, internalFile);
              imports.set(path + "::" + selector, i_1);

              if (localId == null) {
                return new NullLiteral();
              } else {
                return new Identifier(getValue(localId));
              }
            }

        }
      },

      GetAllImports() {
        return imports.values();
      },

      TransformExpr(ctx, e) {
        return transformExpr(this, ctx, e);
      },

      TransformStatement(ctx, e) {
        return transformStatement(this, ctx, e);
      },

      TransformExprAndResolve(ctx, ret, e) {
        return transformExprAndResolve(this, ctx, ret, e);
      },

      TransformFunction(ctx, tc, args, body) {
        return transformFunction(this, ctx, tc, args, body);
      },

      TransformClass(ctx, r, baseClass, members) {
        return transformClass(this, ctx, r, null, baseClass, members);
      },

      TransformObjectExpr(ctx, membs, baseClass, r) {
        return transformObjectExpr(this, ctx, membs, baseClass, r);
      },

      get Options() {
        return com.Options;
      },

      get Plugins() {
        return com.Plugins;
      },

      AddLog(msg, severity, range, fileName, tag) {
        com.AddLog(msg, severity, range, fileName, tag);
      },

      GetUniqueVar() {
        return com.GetUniqueVar();
      },

      [_Symbol.reflection]() {
        return {
          interfaces: ["Fable.Fable2Babel.IBabelCompiler", "Fable.ICompiler"]
        };
      }

    };
  };

  return __exports;
}({});
export const Compiler = function (__exports) {
  const createFacade = __exports.createFacade = function (sourceFiles, facadeFile) {
    let decls;
    const importFile = last(sourceFiles);
    decls = singleton(function (arg00) {
      return new ExportAllDeclaration(arg00);
    }(new StringLiteral(Path.getRelativeFileOrDirPath(false, facadeFile, false, importFile))));
    return new Program(facadeFile, SourceLocation.Empty, decls, null, null, null, sourceFiles);
  };

  const transformFile = __exports.transformFile = function (com, state, file) {
    try {
      const com_1 = Util.makeCompiler(com, state);
      const ctx = new Context(file, state.GetRootModule(file.SourcePath), create(choose_1(function (_arg1) {
        const $var49 = _arg1.tag === 1 ? _arg1.data[0].Name !== _arg1.data[2] ? [0, _arg1.data[0], _arg1.data[2]] : [1] : [1];

        switch ($var49[0]) {
          case 0:
            return [$var49[1].Name, $var49[2]];

          case 1:
            return null;
        }
      }, file.Declarations), new Comparer(comparePrimitives)), false, function (_arg1_1) {}, null, function () {});

      const rootDecls = function (_arg2) {
        if (_arg2 == null) {
          const helper = {
            DeclareMember(a, b, c, d, e, f, g) {
              return Util.declareRootModMember(a, b, c, d, e, f, g);
            },

            [_Symbol.reflection]() {
              return {
                interfaces: ["Fable.Fable2Babel.IDeclareMember"]
              };
            }

          };
          return Util.transformModDecls(com_1, ctx, helper, null, file.Declarations);
        } else {
          return getValue(_arg2);
        }
      }(Plugins.tryPlugin(file.Range, function (p) {
        return function (arg00, arg10, arg20) {
          return p.TryDeclareRoot(arg00, arg10, arg20);
        }(com_1, ctx, file);
      })(com_1.DeclarePlugins));

      const dependencies = Array.from(append_1(file.Dependencies, distinct(choose_1(function (i) {
        return i.internalFile;
      }, com_1.GetAllImports()))));
      return function (importDecls) {
        return new Program(file.SourcePath, file.Range, append(toList(importDecls), rootDecls), null, null, dependencies);
      }(collect_1(function (tupledArg) {
        const patternInput = fold(function (tupledArg_1, x) {
          const matchValue = x.type;

          if (matchValue === "ImportNamespaceSpecifier") {
            return [tupledArg_1[0], tupledArg_1[1], new List(x, tupledArg_1[2])];
          } else if (matchValue === "ImportDefaultSpecifier") {
            return [tupledArg_1[0], new List(x, tupledArg_1[1]), tupledArg_1[2]];
          } else {
            return [new List(x, tupledArg_1[0]), tupledArg_1[1], tupledArg_1[2]];
          }
        }, [new List(), new List(), new List()], choose_1(function (tuple) {
          return tuple[1];
        }, tupledArg[1]));
        const matchValue_1 = ofArray([patternInput[0], patternInput[1], patternInput[2]]);
        const $var50 = matchValue_1.tail != null ? matchValue_1.head.tail == null ? matchValue_1.tail.tail != null ? matchValue_1.tail.head.tail == null ? matchValue_1.tail.tail.tail != null ? matchValue_1.tail.tail.head.tail == null ? matchValue_1.tail.tail.tail.tail == null ? [0] : [1, matchValue_1] : [1, matchValue_1] : [1, matchValue_1] : [1, matchValue_1] : [1, matchValue_1] : [1, matchValue_1] : [1, matchValue_1];

        switch ($var50[0]) {
          case 0:
            return ofArray([new ImportDeclaration(new List(), new StringLiteral(tupledArg[0]))]);

          case 1:
            return choose(function (_arg3) {
              return _arg3.tail == null ? null : new ImportDeclaration(_arg3, new StringLiteral(tupledArg[0]));
            }, $var50[1]);
        }
      }, groupBy(function (tupledArg_2) {
        return tupledArg_2[0];
      }, mapIndexed_1(function (_ident, _import) {
        const specifier = defaultArg(_import.localIdent, null, function (localId) {
          const localId_1 = new Identifier(localId);
          const $var51 = _import.selector === "*" ? [0] : _import.selector === "default" ? [1] : _import.selector === "" ? [1] : [2];

          switch ($var51[0]) {
            case 0:
              return new ImportNamespaceSpecifier(localId_1);

            case 1:
              return new ImportDefaultSpecifier(localId_1);

            case 2:
              return new ImportSpecifier(localId_1, new Identifier(_import.selector));
          }
        });
        return [_import.path, specifier];
      }, com_1.GetAllImports()))));
    } catch (ex) {
      throw new Error(toText(printf("%s (%s)"))(ex.message, file.SourcePath), ex);
    }
  };

  return __exports;
}({});