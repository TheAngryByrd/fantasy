import { setType } from "../fable-core/Symbol";
import _Symbol from "../fable-core/Symbol";
import { File, EntityKind, LoopKind, Ident, MemberLoc, Member, MemberKind, Type, ArrayConsKind, LambdaInfo, ApplyKind, ValueKind, Expr, Entity, Declaration } from "../AST/AST.Fable";
import { comparePrimitives, hasInterface, makeGeneric, equals, Option, Array as _Array } from "../fable-core/Util";
import { Patterns as Patterns_1, Option as Option_1, List as List_1, Path, Naming, SourceLocation } from "../Fable.Core/Util";
import { EnclosingModule, MemberInfo, Patterns, ThisAvailability, Context, Identifiers, Util, Atts, Helpers, Types } from "./FSharp2Fable.Util";
import { defaultArg, getValue } from "../fable-core/Option";
import { map2, foldBack, mapIndexed, findIndex, fold2, item, singleton, empty, append as append_1, delay, tryFind, filter, concat, count, tryHead, tryPick, zip, fold, iterate, collect, exists, last, map as map_2, toList } from "../fable-core/Seq";
import { makeImport, makeRecordCompareMethod, makeRecordEqualMethod, makeRecordCons, makeUnionCompareMethodNoData, makeUnionEqualMethodNoData, makeUnionConsNoData, makeUnionCompareMethod, makeUnionEqualMethod, makeReflectionMethod, makeUnionCons, makeIteratorMethod, makeArray, makeTypeConst, makeEqOp, makeLambdaExpr, makeApply, makeLoop, makeTypeTest, makeBinOp, makeGet, makeIdent, makeReflectionMethodArgsAndBody, makeIteratorMethodArgsAndBody, makeIdentExpr, compareDeclaredAndAppliedArgs, makeNonGenTypeRef, addWarning, ensureArity, makeJsObject, addErrorAndReturnNull, makeDynamicCurriedLambda, setProto, makeSequential, makeDecConst, CallKind, makeCall as makeCall_1, makeIntConst, makeStrConst, addError } from "../AST/AST.Fable.Util";
import { replace, toFail, isNullOrEmpty, join, printf, toText } from "../fable-core/String";
import { Extensions } from "../service/ServiceAssemblyContent";
import { filter as filter_1, where, collect as collect_1, append, reverse, map as map_3, choose, ofArray } from "../fable-core/List";
import List from "../fable-core/List";
import { distinct, addInPlace, create } from "../fable-core/Set";
import _Set from "../fable-core/Set";
import Comparer from "../fable-core/Comparer";
import { BasicPatterns } from "../symbols/Exprs";
import CurriedLambda from "../fable-core/CurriedLambda";
import { MemberKind as MemberKind_1 } from "../fsharp/ast";
import Choice from "../fable-core/Choice";
import { map as map_4, exists as exists_1, create as create_1, add, tryFind as tryFind_1 } from "../fable-core/Map";
import { BinaryOperator, NumberKind } from "../AST/AST.Common";
import { checkLiteral } from "./Replacements";

class TmpDecl {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Fable.FSharp2Fable.Compiler.TmpDecl",
      interfaces: ["FSharpUnion", "System.IEquatable"],
      cases: [["Decl", Declaration], ["Ent", Entity, "boolean", "string", _Array(Declaration), Option(SourceLocation)], ["IgnoredEnt"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

}

setType("Fable.FSharp2Fable.Compiler.TmpDecl", TmpDecl);

class DeclInfo {
  [_Symbol.reflection]() {
    return {
      type: "Fable.FSharp2Fable.Compiler.DeclInfo",
      properties: {}
    };
  }

  constructor(com, fileName) {
    this.com = com;
    this.fileName = fileName;
    this.publicNames = [];
    this.decls = [];
    this.children = new Map();
  }

  IsIgnoredEntity(ent) {
    if ((ent.IsInterface ? true : ent.IsFSharpAbbreviation) ? true : Types.isAttributeEntity(ent)) {
      return true;
    } else {
      return (ent_1 => this.isErasedEntity(ent_1))(ent);
    }
  }

  IsIgnoredMethod(meth) {
    if ((((meth.IsCompilerGenerated ? Naming.ignoredCompilerGenerated.has(meth.CompiledName) : false) ? true : meth.LiteralValue != null) ? true : Helpers.tryFindAtt(name => ((name === Atts.import ? true : name === Atts.global_) ? true : name === Atts.emit) ? true : name === Atts.erase, meth.Attributes) != null) ? true : Naming.ignoredInterfaceMethods.has(meth.CompiledName)) {
      return true;
    } else {
      const matchValue = (meth_1 => this.tryFindChild(meth_1))(meth);

      const $var32 = matchValue != null ? getValue(matchValue).tag === 2 ? [0] : [1] : [1];

      switch ($var32[0]) {
        case 0:
          return true;

        case 1:
          return false;
      }
    }
  }

  AddMethod(meth, methDecl) {
    const matchValue = (meth_1 => this.tryFindChild(meth_1))(meth);

    if (matchValue != null) {
      if (getValue(matchValue).tag === 1) {
        getValue(matchValue).data[3].push(methDecl);
      }
    } else {
      let conflicts;

      if (((meth.IsModuleValueOrMember ? Helpers.isPublicMethod(meth) : false) ? !meth.IsCompilerGenerated : false) ? !meth.IsExtensionMember : false) {
        const name = meth.CompiledName;
        conflicts = this.publicNameConflicts(name);
      } else {
        conflicts = false;
      }

      if (!conflicts) {
        this.decls.push(new TmpDecl(0, methDecl));
      }
    }
  }

  AddDeclaration(decl, publicName) {
    const conflicts = publicName == null ? false : this.publicNameConflicts(getValue(publicName));

    if (!conflicts) {
      this.decls.push(new TmpDecl(0, decl));
    }
  }

  AddChild(com, ctx, newChild, privateName, newChildDecls) {
    const isPublic = Helpers.isPublicEntity(ctx, newChild);
    let conflicts;

    if (isPublic) {
      const name = Helpers.sanitizeEntityName(newChild);
      conflicts = this.publicNameConflicts(name);
    } else {
      conflicts = false;
    }

    if (!conflicts) {
      const ent = new TmpDecl(1, [com.GetEntity(newChild), isPublic, privateName, Array.from(newChildDecls), Helpers.makeRange(Helpers.getEntityLocation(newChild))]);
      this.children.set(newChild.FullName, ent);
      this.decls.push(ent);
    }
  }

  AddIgnoredChild(ent) {
    const matchValue = ent.TryFullName;

    if (matchValue == null) {} else {
      this.children.set(getValue(matchValue), new TmpDecl(2));
    }
  }

  TryGetOwner(meth) {
    const matchValue = (meth_1 => this.tryFindChild(meth_1))(meth);

    const $var33 = matchValue != null ? getValue(matchValue).tag === 1 ? [0, getValue(matchValue).data[0]] : [1] : [1];

    switch ($var33[0]) {
      case 0:
        return $var33[1];

      case 1:
        return null;
    }
  }

  GetDeclarations(com) {
    return toList(map_2(_arg14 => {
      if (_arg14.tag === 0) {
        return _arg14.data;
      } else if (_arg14.tag === 1) {
        let range;
        const matchValue = [_arg14.data[3].length, _arg14.data[4]];
        const $var34 = matchValue[0] === 0 ? [0] : matchValue[1] != null ? [1] : [0];

        switch ($var34[0]) {
          case 0:
            range = _arg14.data[4];
            break;

          case 1:
            const r1 = getValue(matchValue[1]);

            range = (_arg15 => _arg15 == null ? _arg14.data[4] : SourceLocation.op_Addition(r1, getValue(_arg15)))(last(_arg14.data[3]).Range);

            break;
        }

        return new Declaration(1, [_arg14.data[0], _arg14.data[1], _arg14.data[2], processMemberDecls(com, _arg14.data[0], _arg14.data[3]), range]);
      } else {
        throw new Error("Unexpected ignored entity");
      }
    }, this.decls));
  }

  publicNameConflicts(name) {
    const conflicts = this.publicNames.indexOf(name) > -1;

    if (conflicts) {
      addError(this.com, this.fileName, null, "Public namespaces, modules, types or functions with same name at same level are not supported: " + name);
    } else {
      this.publicNames.push(name);
    }

    return conflicts;
  }

  isErasedEntity(ent) {
    const fail = (ent_1, msg) => {
      addError(this.com, this.fileName, Helpers.makeRange(Helpers.getEntityLocation(ent_1)), msg);
      return false;
    };

    const check = (ent_2, name, att, expected) => {
      if (name !== att) {
        return false;
      } else if ((exists($var35 => equals("union", $var35), expected) ? !ent_2.IsFSharpUnion : false) ? exists($var36 => equals("record", $var36), expected) ? !ent_2.IsFSharpRecord : false : false) {
        return fail(ent_2, toText(printf("%s can only decorate %s types"))(att, join("/", expected)));
      } else if (exists(m => !m.IsCompilerGenerated, Extensions["FSharpEntity.get_TryGetMembersFunctionsAndValues"].bind(ent_2)())) {
        return fail(ent_2, "Erased types cannot contain members");
      } else {
        return true;
      }
    };

    return Helpers.tryFindAtt(name_1 => (((name_1 === Atts.import ? true : name_1 === Atts.global_) ? true : name_1 === Atts.erase) ? true : check(ent, name_1, Atts.stringEnum, ofArray(["union"]))) ? true : check(ent, name_1, Atts.pojo, ofArray(["union", "record"])), ent.Attributes) != null;
  }

  tryFindChild(meth) {
    return defaultArg(Helpers.tryEnclosingEntity(meth), null, ent => this.children.has(ent.FullName) ? this.children.get(ent.FullName) : null);
  }

}

setType("Fable.FSharp2Fable.Compiler.DeclInfo", DeclInfo);
export class FableCompiler {
  [_Symbol.reflection]() {
    return {
      type: "Fable.FSharp2Fable.Compiler.FableCompiler",
      interfaces: ["Fable.ICompiler", "Fable.FSharp2Fable.IFableCompiler"],
      properties: {
        Dependencies: makeGeneric(_Set, {
          T: "string"
        }),
        UsedVarNames: makeGeneric(_Set, {
          T: "string"
        })
      }
    };
  }

  constructor(com, state, currentFile, implFiles) {
    this.com = com;
    this.state = state;
    this.currentFile = currentFile;
    this.implFiles = implFiles;
    this.replacePlugins = choose(_arg19 => hasInterface(_arg19.plugin, "Fable.IReplacePlugin") ? [_arg19.path, _arg19.plugin] : null, this.com.Plugins);
    this.usedVarNames = new Set();
    this.dependencies = new Set();
  }

  get UsedVarNames() {
    return create(this.usedVarNames, new Comparer(comparePrimitives));
  }

  get Dependencies() {
    return create(this.dependencies, new Comparer(comparePrimitives));
  }

  Transform(ctx, fsExpr) {
    return transformExpr(this, ctx, fsExpr);
  }

  IsReplaceCandidate(ent) {
    var fullName_1;
    var fullName;
    var asmPath;
    const matchValue = [ent.TryFullName, ent.Assembly.FileName];
    const $var45 = matchValue[0] != null ? (fullName_1 = getValue(matchValue[0]), fullName_1.indexOf("Fable.Import") === 0) ? [0, getValue(matchValue[0])] : [1] : [1];

    switch ($var45[0]) {
      case 0:
        return false;

      case 1:
        const $var46 = matchValue[0] != null ? (fullName = getValue(matchValue[0]), fullName.indexOf("Fable.Core.JsInterop") === 0) ? [0, getValue(matchValue[0])] : [1] : [1];

        switch ($var46[0]) {
          case 0:
            return true;

          case 1:
            const $var47 = matchValue[1] != null ? (asmPath = getValue(matchValue[1]), !isNullOrEmpty(asmPath)) ? [0, getValue(matchValue[1])] : [1] : [1];

            switch ($var47[0]) {
              case 0:
                return true;

              case 1:
                return false;
            }

        }

    }
  }

  TryGetInternalFile(tdef) {
    var copyOfStruct;

    if (this.IsReplaceCandidate(tdef)) {
      return null;
    } else {
      return copyOfStruct = Helpers.getEntityLocation(tdef), copyOfStruct.FileName;
    }
  }

  GetEntity(tdef) {
    return this.state.GetOrAddEntity(Helpers.getEntityFullName(tdef), () => {
      const matchValue = tryGetEntityImplementation(this.implFiles, tdef);

      if (matchValue == null) {
        throw new Error("Cannot find implementation of " + Helpers.getEntityFullName(tdef));
      } else {
        return Types.makeEntity(this, getValue(matchValue));
      }
    });
  }

  GetInlineExpr(meth) {
    var copyOfStruct;
    const fileName = Path.normalizePath((copyOfStruct = Helpers.getMethLocation(meth), copyOfStruct.FileName));

    if (fileName !== this.currentFile) {
      addInPlace(fileName, this.dependencies);
    }

    return this.state.GetOrAddInlineExpr(Helpers.fullNameAndArgCount(meth), () => {
      const matchValue = tryGetMethodArgsAndBody(this.implFiles, fileName, meth);

      if (matchValue == null) {
        throw new Error("Cannot find inline method " + meth.FullName);
      } else {
        const body = getValue(matchValue)[1];
        const args = getValue(matchValue)[0];

        const args_1 = (vars => Util.countRefs(body, vars))(collect(x => x, args));

        return [args_1, body];
      }
    });
  }

  AddInlineExpr(fullName, inlineExpr) {
    this.state.GetOrAddInlineExpr(fullName, () => inlineExpr);
  }

  AddUsedVarName(varName) {
    addInPlace(varName, this.usedVarNames);
  }

  get ReplacePlugins() {
    return this.replacePlugins;
  }

  get Options() {
    return this.com.Options;
  }

  get Plugins() {
    return this.com.Plugins;
  }

  AddLog(msg, severity, range, fileName, tag) {
    this.com.AddLog(msg, severity, range, fileName, tag);
  }

  GetUniqueVar() {
    return this.com.GetUniqueVar();
  }

}
setType("Fable.FSharp2Fable.Compiler.FableCompiler", FableCompiler);

function _SpecialValue___(com, ctx, _arg2) {
  var typ;
  var fieldName;
  let $var1;
  const activePatternResult61694 = BasicPatterns["|ILFieldGet|_|"](_arg2);

  if (activePatternResult61694 != null) {
    if (getValue(activePatternResult61694)[0] == null) {
      if (typ = getValue(activePatternResult61694)[1], fieldName = getValue(activePatternResult61694)[2], typ.HasTypeDefinition) {
        $var1 = [0, getValue(activePatternResult61694)[2], _arg2, getValue(activePatternResult61694)[1]];
      } else {
        $var1 = [1];
      }
    } else {
      $var1 = [1];
    }
  } else {
    $var1 = [1];
  }

  switch ($var1[0]) {
    case 0:
      const matchValue = [$var1[3].TypeDefinition.TryFullName, $var1[1]];
      const $var2 = matchValue[0] != null ? getValue(matchValue[0]) === "System.String" ? matchValue[1] === "Empty" ? [0] : [6] : getValue(matchValue[0]) === "System.Guid" ? matchValue[1] === "Empty" ? [1] : [6] : getValue(matchValue[0]) === "System.TimeSpan" ? matchValue[1] === "Zero" ? [2] : [6] : getValue(matchValue[0]) === "System.DateTime" ? matchValue[1] === "MaxValue" ? [3, getValue(matchValue[0])] : matchValue[1] === "MinValue" ? [3, getValue(matchValue[0])] : [6] : getValue(matchValue[0]) === "System.DateTimeOffset" ? matchValue[1] === "MaxValue" ? [3, getValue(matchValue[0])] : matchValue[1] === "MinValue" ? [3, getValue(matchValue[0])] : [6] : getValue(matchValue[0]) === "System.Decimal" ? matchValue[1] === "Zero" ? [4] : matchValue[1] === "One" ? [5] : [6] : [6] : [6];

      switch ($var2[0]) {
        case 0:
          return makeStrConst("");

        case 1:
          return makeStrConst("00000000-0000-0000-0000-000000000000");

        case 2:
          return new Expr(13, [makeIntConst(0), Types.makeType(com, ctx.typeArgs, $var1[2].Type)]);

        case 3:
          const m = $var2[1] === "System.DateTime" ? "Date" : "DateOffset";
          return makeCall_1(Helpers.makeRangeFrom($var1[2]), Types.makeType(com, ctx.typeArgs, $var1[2].Type), new CallKind(2, [m, Naming.lowerFirst($var1[1]), false, new List()]));

        case 4:
          return makeDecConst(0);

        case 5:
          return makeDecConst(1);

        case 6:
          return null;
      }

    case 1:
      return null;
  }
}

function compileDerivedConstructor(com, ctx, ent, baseFullName, fsExpr) {
  var range_1;

  const equalsEntName = function (meth, entName) {
    const matchValue = Helpers.tryEnclosingEntity(meth);

    if (matchValue == null) {
      return false;
    } else {
      return Helpers.sanitizeEntityFullName(getValue(matchValue)) === entName;
    }
  };

  const validateGenArgs_ = function (typArgs) {
    iterate(function (tdef) {
      Util.validateGenArgs(com, ctx, Helpers.makeRangeFrom(fsExpr), tdef.GenericParameters, typArgs);
    }, defaultArg(Helpers.tryDefinition(fsExpr.Type), [], $var3 => [$var3]));
  };

  const tryBaseCons = function (com_1, ctx_1, baseFullName_1, tail, _arg3) {
    var second;
    var first;
    var typArgs_2;
    var meth_2;
    var args_1;
    var typArgs_1;
    var meth_1;
    var args;
    var range;

    tryBaseCons: while (true) {
      let $var4;
      const activePatternResult61706 = BasicPatterns["|Sequential|_|"](_arg3);

      if (activePatternResult61706 != null) {
        if (second = getValue(activePatternResult61706)[1], first = getValue(activePatternResult61706)[0], tail == null) {
          $var4 = [0, getValue(activePatternResult61706)[0], getValue(activePatternResult61706)[1]];
        } else {
          $var4 = [1];
        }
      } else {
        $var4 = [1];
      }

      switch ($var4[0]) {
        case 0:
          const matchValue_1 = tryBaseCons(com_1, ctx_1, baseFullName_1, $var4[2], $var4[1]);

          if (matchValue_1 == null) {
            com_1 = com_1;
            ctx_1 = ctx_1;
            baseFullName_1 = baseFullName_1;
            tail = null;
            _arg3 = $var4[2];
            continue tryBaseCons;
          } else {
            return getValue(matchValue_1);
          }

        case 1:
          const activePatternResult61705 = BasicPatterns["|Let|_|"](_arg3);

          if (activePatternResult61705 != null) {
            com_1 = com_1;
            ctx_1 = ctx_1;
            baseFullName_1 = baseFullName_1;
            tail = tail;
            _arg3 = getValue(activePatternResult61705)[1];
            continue tryBaseCons;
          } else {
            let $var5;
            const activePatternResult61704 = BasicPatterns["|NewObject|_|"](_arg3);

            if (activePatternResult61704 != null) {
              if (typArgs_2 = getValue(activePatternResult61704)[1], meth_2 = getValue(activePatternResult61704)[0], args_1 = getValue(activePatternResult61704)[2], equalsEntName(meth_2, baseFullName_1)) {
                $var5 = [0, getValue(activePatternResult61704)[2], getValue(activePatternResult61704)[0], getValue(activePatternResult61704)[1]];
              } else {
                $var5 = [1];
              }
            } else {
              $var5 = [1];
            }

            switch ($var5[0]) {
              case 0:
                (function (arg00) {
                  validateGenArgs_(arg00);
                })($var5[3]);

                return [$var5[2], $var5[1], tail];

              case 1:
                let $var6;
                const activePatternResult61703 = BasicPatterns["|Call|_|"](_arg3);

                if (activePatternResult61703 != null) {
                  if (getValue(activePatternResult61703)[0] == null) {
                    if (typArgs_1 = getValue(activePatternResult61703)[2], meth_1 = getValue(activePatternResult61703)[1], args = getValue(activePatternResult61703)[4], meth_1.CompiledName === ".ctor" ? equalsEntName(meth_1, baseFullName_1) : false) {
                      $var6 = [0, getValue(activePatternResult61703)[4], getValue(activePatternResult61703)[1], getValue(activePatternResult61703)[2]];
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
                    if (!$var6[2].IsImplicitConstructor) {
                      (range = Helpers.makeRange(fsExpr.Range), function (warning) {
                        addError(com_1, ctx_1.fileName, range, warning);
                      })("Inheritance is only possible with base class primary constructor: " + baseFullName_1);
                    }

                    (function (arg00_1) {
                      validateGenArgs_(arg00_1);
                    })($var6[3]);

                    return [$var6[2], $var6[1], tail];

                  case 1:
                    return null;
                }

            }
          }

      }
    }
  };

  const matchValue_2 = CurriedLambda(function (arg00_2) {
    return CurriedLambda(tryBaseCons)(arg00_2);
  })(com, ctx, baseFullName, null, fsExpr);

  if (matchValue_2 == null) {
    (range_1 = Helpers.makeRange(fsExpr.Range), function (warning_1) {
      addError(com, ctx.fileName, range_1, warning_1);
    })("Cannot find super call in derived constructor");
    return new Expr(0, new ValueKind(0));
  } else {
    const tail_1 = getValue(matchValue_2)[2];
    const meth_3 = getValue(matchValue_2)[0];
    const args_2 = getValue(matchValue_2)[1];
    let tail_2;

    if (tail_1 == null) {
      tail_2 = new List();
    } else {
      const activePatternResult61713 = CurriedLambda(function (arg00_3, arg10) {
        return com.Transform(arg00_3, arg10);
      })(ctx)(getValue(tail_1));
      tail_2 = ofArray([activePatternResult61713]);
    }

    const args_3 = map_3(function (fsExpr_1) {
      return transformExpr(com, ctx, fsExpr_1);
    }, args_2);
    const patternInput = [Types.makeType(com, ctx.typeArgs, fsExpr.Type), Helpers.makeRangeFrom(fsExpr)];
    const superCall = new Expr(3, [new Expr(0, new ValueKind(2)), args_3, new ApplyKind(0), patternInput[0], patternInput[1]]);
    return makeSequential(Helpers.makeRangeFrom(fsExpr), baseFullName === "System.Exception" ? ofArray([superCall, setProto(com, ent)], tail_2) : new List(superCall, tail_2));
  }
}

function transformLambda(com, ctx, fsExpr, args, tupleDestructs, body, isDelegate) {
  const lambdaType = Types.makeType(com, ctx.typeArgs, fsExpr.Type);
  const patternInput = Util.makeLambdaArgs(com, ctx, args);
  const ctx_2 = fold(function (ctx_1, tupledArg) {
    return function (expr) {
      return Identifiers.bindExpr(ctx_1, tupledArg[0], expr);
    }(transformExpr(com, ctx_1, tupledArg[1]));
  }, patternInput[0], tupleDestructs);
  const isDynamicCurried = (!isDelegate ? !ctx_2.isDynamicCurriedLambda : false) ? lambdaType.tag === 11 ? lambdaType.data[0].length > patternInput[1].length : false : false;
  let body_1;
  let ctx_3;
  const isDynamicCurriedLambda = isDynamicCurried ? true : ctx_2.isDynamicCurriedLambda;
  ctx_3 = new Context(ctx_2.fileName, ctx_2.enclosingModule, ctx_2.scope, ctx_2.scopedInlines, ctx_2.varNames, ctx_2.typeArgs, ctx_2.decisionTargets, ctx_2.thisAvailability, ctx_2.genericAvailability, isDynamicCurriedLambda, ctx_2.caughtException);
  body_1 = transformExpr(com, ctx_3, body);
  let lambda;
  const captureThis = !ctx_2.thisAvailability.Equals(new ThisAvailability(0));
  lambda = new Expr(0, new ValueKind(16, [patternInput[1], body_1, new LambdaInfo(captureThis, isDelegate)]));

  if (isDynamicCurried) {
    return makeDynamicCurriedLambda(Helpers.makeRangeFrom(fsExpr), lambdaType, lambda);
  } else {
    return lambda;
  }
}

function transformNewList(com, ctx, fsExpr, fsType, argExprs) {
  var range;

  const flattenList = function (r, accArgs, _arg4) {
    flattenList: while (true) {
      let $var7;

      if (_arg4.tail != null) {
        if (_arg4.tail.tail != null) {
          const activePatternResult61730 = BasicPatterns["|NewUnionCase|_|"](_arg4.tail.head);

          if (activePatternResult61730 != null) {
            if (_arg4.tail.tail.tail == null) {
              $var7 = [1, _arg4.head, getValue(activePatternResult61730)[2]];
            } else {
              $var7 = [2];
            }
          } else {
            $var7 = [2];
          }
        } else {
          $var7 = [2];
        }
      } else {
        $var7 = [0];
      }

      switch ($var7[0]) {
        case 0:
          return [accArgs, null];

        case 1:
          r = r;
          accArgs = new List($var7[1], accArgs);
          _arg4 = $var7[2];
          continue flattenList;

        case 2:
          const $var8 = _arg4.tail != null ? _arg4.tail.tail != null ? _arg4.tail.tail.tail == null ? [0, _arg4.head, _arg4.tail.head] : [1] : [1] : [1];

          switch ($var8[0]) {
            case 0:
              return [new List($var8[1], accArgs), $var8[2]];

            case 1:
              return toFail(printf("Unexpected List constructor %O: %A"))(r, fsExpr);
          }

      }
    }
  };

  const patternInput = [Types.makeType(com, ctx.typeArgs, fsType), Helpers.makeRange(fsExpr.Range)];

  const buildArgs = function (tupledArg) {
    const args = map_3(function (fsExpr_1) {
      return transformExpr(com, ctx, fsExpr_1);
    }, reverse(tupledArg[0]));
    const ar = new Expr(0, new ValueKind(11, [new ArrayConsKind(0, args), new Type(1)]));
    return new List(ar, tupledArg[1] == null ? new List() : ofArray([transformExpr(com, ctx, getValue(tupledArg[1]))]));
  };

  return (range = patternInput[1], function (kind) {
    return makeCall_1(range, patternInput[0], kind);
  })(argExprs.tail == null ? new CallKind(2, ["List", null, true, new List()]) : (() => {
    const matchValue = flattenList(patternInput[1], new List(), argExprs);
    const $var9 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1] != null ? [0, matchValue[0].head, getValue(matchValue[1])] : [1, matchValue[0], matchValue[1]] : [1, matchValue[0], matchValue[1]] : [1, matchValue[0], matchValue[1]];

    switch ($var9[0]) {
      case 0:
        const args_1 = map_3(function (fsExpr_2) {
          return transformExpr(com, ctx, fsExpr_2);
        }, ofArray([$var9[1], $var9[2]]));
        return new CallKind(2, ["List", null, true, args_1]);

      case 1:
        const args_2 = buildArgs([$var9[1], $var9[2]]);
        return new CallKind(2, ["List", "ofArray", false, args_2]);
    }
  })());
}

function transformNonListNewUnionCase(com, ctx, fsExpr, fsType, unionCase, argExprs) {
  var range;
  var range_1;
  var range_2;
  var ent;
  var range_3;
  const patternInput = [Types.makeType(com, ctx.typeArgs, fsType), Helpers.makeRange(fsExpr.Range)];
  const activePatternResult61745 = Patterns["|OptionUnion|ListUnion|ErasedUnion|StringEnum|PojoUnion|OtherType|"](fsType);

  if (activePatternResult61745.tag === 2) {
    if (argExprs.tail != null) {
      if (argExprs.tail.tail == null) {
        return new Expr(13, [argExprs.head, patternInput[0]]);
      } else {
        return (range = patternInput[1], function (error) {
          return addErrorAndReturnNull(com, ctx.fileName, range, error);
        })("Erased Union Cases must have one single field: " + patternInput[0].FullName);
      }
    } else {
      return new Expr(13, [new Expr(0, new ValueKind(0)), patternInput[0]]);
    }
  } else if (activePatternResult61745.tag === 3) {
    if (!(argExprs.tail == null)) {
      return (range_1 = patternInput[1], function (error_1) {
        return addErrorAndReturnNull(com, ctx.fileName, range_1, error_1);
      })("StringEnum types cannot have fields: " + patternInput[0].FullName);
    } else {
      return Helpers.lowerCaseName(unionCase);
    }
  } else if (activePatternResult61745.tag === 4) {
    return makeJsObject(patternInput[1], append(ofArray([["type", makeStrConst(unionCase.Name)]]), map_3(function (tupledArg) {
      return [tupledArg[0].Name, tupledArg[1]];
    }, toList(zip(toList(unionCase.UnionCaseFields), argExprs)))));
  } else if (activePatternResult61745.tag === 1) {
    return toFail(printf("transformNonListNewUnionCase must not be used with List %O"))(patternInput[1]);
  } else if (activePatternResult61745.tag === 5) {
    const tag = makeIntConst(Helpers.getUnionCaseIndex(fsType, unionCase.Name));
    let argExprs_1;
    const argTypes = toList(map_2(function (x) {
      return Types.makeType(com, new List(), x.FieldType);
    }, unionCase.UnionCaseFields));
    argExprs_1 = ensureArity(com, argTypes, argExprs);
    let erasedUnion;

    if (Helpers.hasAtt(Atts.erase, unionCase.Attributes)) {
      const $var10 = argExprs_1.tail != null ? argExprs_1.head.tag === 0 ? argExprs_1.head.data.tag === 8 ? argExprs_1.tail.tail != null ? argExprs_1.tail.tail.tail == null ? [0, argExprs_1.head.data.data, argExprs_1.tail.head] : [1] : [1] : [1] : [1] : [1];

      switch ($var10[0]) {
        case 0:
          erasedUnion = new Expr(0, new ValueKind(12, ofArray([new Expr(0, new ValueKind(8, $var10[1])), $var10[2]])));
          break;

        case 1:
          (range_2 = Helpers.makeRange(fsExpr.Range), function (warning) {
            addWarning(com, ctx.fileName, range_2, warning);
          })(toText(printf("Case %s from %s is decorated with %s, but the fields are not a key-value pair"))(unionCase.Name, patternInput[0].FullName, Atts.erase));
          erasedUnion = null;
          break;
      }
    } else {
      erasedUnion = null;
    }

    if (erasedUnion == null) {
      const argExprs_2 = argExprs_1.tail != null ? argExprs_1.tail.tail == null ? ofArray([tag, argExprs_1.head]) : ofArray([tag, new Expr(0, new ValueKind(11, [new ArrayConsKind(0, argExprs_1), new Type(1)]))]) : ofArray([tag]);
      return function (_arg5) {
        return _arg5 == null ? new Expr(3, [makeNonGenTypeRef(com, patternInput[0]), argExprs_2, new ApplyKind(2), patternInput[0], patternInput[1]]) : getValue(_arg5);
      }(Helpers.tryBoth(function (info) {
        return Util.tryPlugin(com, info);
      }, (ent = Helpers.tryDefinition(fsType), function (info_1) {
        return Util.tryReplace(com, ctx, ent, info_1);
      }), Util.buildApplyInfo(com, ctx, patternInput[1], patternInput[0], patternInput[0], patternInput[0].FullName, ".ctor", new MemberKind(0), new List(), new List(), new List(), new List(), null, argExprs_2)));
    } else {
      return getValue(erasedUnion);
    }
  } else if (argExprs.tail != null) {
    const matchValue = argExprs.head.Type;
    const $var11 = matchValue.tag === 2 ? [0] : matchValue.tag === 12 ? [0] : matchValue.tag === 8 ? [0] : [1];

    switch ($var11[0]) {
      case 0:
        return (range_3 = patternInput[1], function (kind) {
          return makeCall_1(range_3, patternInput[0], kind);
        })(new CallKind(2, ["Option", "makeSome", false, ofArray([argExprs.head])]));

      case 1:
        return new Expr(13, [argExprs.head, patternInput[0]]);
    }
  } else {
    return new Expr(13, [new Expr(0, new ValueKind(0)), patternInput[0]]);
  }
}

function transformComposableExpr(com, ctx, fsExpr, argExprs) {
  let $var12;
  const activePatternResult61755 = BasicPatterns["|Call|_|"](fsExpr);

  if (activePatternResult61755 != null) {
    if (getValue(activePatternResult61755)[0] == null) {
      $var12 = [0, getValue(activePatternResult61755)[1], getValue(activePatternResult61755)[3], getValue(activePatternResult61755)[2]];
    } else {
      $var12 = [1];
    }
  } else {
    $var12 = [1];
  }

  switch ($var12[0]) {
    case 0:
      const patternInput = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
      return Util.makeCallFrom(com, ctx, patternInput[0], patternInput[1], $var12[1], $var12[3], $var12[2], null, argExprs);

    case 1:
      const activePatternResult61754 = BasicPatterns["|NewObject|_|"](fsExpr);

      if (activePatternResult61754 != null) {
        const patternInput_1 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
        iterate(function (tdef) {
          Util.validateGenArgs(com, ctx, patternInput_1[0], tdef.GenericParameters, getValue(activePatternResult61754)[1]);
        }, defaultArg(Helpers.tryDefinition(fsExpr.Type), [], $var13 => [$var13]));
        return Util.makeCallFrom(com, ctx, patternInput_1[0], patternInput_1[1], getValue(activePatternResult61754)[0], getValue(activePatternResult61754)[1], new List(), null, argExprs);
      } else {
        const activePatternResult61753 = BasicPatterns["|NewUnionCase|_|"](fsExpr);

        if (activePatternResult61753 != null) {
          return transformNonListNewUnionCase(com, ctx, fsExpr, getValue(activePatternResult61753)[0], getValue(activePatternResult61753)[1], argExprs);
        } else {
          return toFail(printf("Expected ComposableExpr %O"))(Helpers.makeRange(fsExpr.Range));
        }
      }

  }
}

function transformTraitCall(com, ctx, r, typ, sourceTypes, traitName, flags, argTypes, argExprs) {
  const giveUp = function () {
    return function (error) {
      return addErrorAndReturnNull(com, ctx.fileName, r, error);
    }("Cannot resolve trait call " + traitName);
  };

  const tryFields = function (tdef) {
    if (flags.MemberKind.Equals(new MemberKind_1(3)) ? tdef.IsFSharpRecord : false) {
      const traitName_1 = replace(traitName, "get_", "");
      return tryPick(function (fi) {
        if (fi.Name === traitName_1) {
          const matchValue = tryHead(argExprs);

          if (matchValue != null) {
            const activePatternResult61764 = CurriedLambda(function (arg00, arg10) {
              return com.Transform(arg00, arg10);
            })(ctx)(getValue(matchValue));
            return Util.makeGetFrom(r, typ, activePatternResult61764, makeStrConst(fi.Name));
          } else {
            return giveUp();
          }
        } else {
          return null;
        }
      }, tdef.FSharpFields);
    } else {
      return null;
    }
  };

  const makeCall = function (meth) {
    const patternInput = flags.IsInstance ? [transformExpr(com, ctx, argExprs.head), map_3(function (fsExpr) {
      return transformExpr(com, ctx, fsExpr);
    }, argExprs.tail)] : [null, map_3(function (fsExpr_1) {
      return transformExpr(com, ctx, fsExpr_1);
    }, argExprs)];
    return Util.makeCallFrom(com, ctx, r, typ, meth, new List(), new List(), patternInput[0], patternInput[1]);
  };

  return function (_arg7) {
    const $var14 = _arg7 == null ? [3] : getValue(_arg7).tag === 1 ? getValue(_arg7).data[2].tail != null ? getValue(_arg7).data[2].tail.tail == null ? [1, getValue(_arg7).data[2].head] : [2, getValue(_arg7).data[2], getValue(_arg7).data[1], getValue(_arg7).data[0]] : [2, getValue(_arg7).data[2], getValue(_arg7).data[1], getValue(_arg7).data[0]] : [0, getValue(_arg7).data];

    switch ($var14[0]) {
      case 0:
        return $var14[1];

      case 1:
        return makeCall($var14[1]);

      case 2:
        const genArgs = count($var14[2].GenericParameters) === count($var14[3].GenericArguments) ? toList(zip(map_2(function (p) {
          return p.Name;
        }, $var14[2].GenericParameters), $var14[3].GenericArguments)) : null;
        const argTypes_1 = map_3(function (arg20_) {
          return Types.makeType(com, ctx.typeArgs, arg20_);
        }, !flags.IsInstance ? argTypes : argTypes.tail);
        return function (_arg9) {
          return _arg9 == null ? giveUp() : makeCall(getValue(_arg9));
        }(tryPick(function (meth_1) {
          var typeArgs;
          let methTypes_1;
          const methTypes = map_2(function (x) {
            return x.Type;
          }, concat(meth_1.CurriedParameterGroups));
          methTypes_1 = toList(map_2((typeArgs = new List(), function (arg20__1) {
            return Types.makeType(com, typeArgs, arg20__1);
          }), genArgs == null ? methTypes : map_2(function (_arg8) {
            const activePatternResult61780 = function (t) {
              return Util["|ResolveGeneric|"](getValue(genArgs), t);
            }(_arg8);

            return activePatternResult61780;
          }, methTypes)));

          if (compareDeclaredAndAppliedArgs(methTypes_1, argTypes_1)) {
            return meth_1;
          } else {
            return null;
          }
        }, $var14[1]));

      case 3:
        return giveUp();
    }
  }(tryPick(function (_arg1) {
    const activePatternResult61773 = function (t_1) {
      return Util["|ResolveGeneric|"](ctx.typeArgs, t_1);
    }(_arg1);

    const activePatternResult61774 = Helpers.nonAbbreviatedType(activePatternResult61773);

    if (activePatternResult61774.HasTypeDefinition) {
      const tdef_1 = activePatternResult61774.TypeDefinition;
      return function (_arg6) {
        return _arg6.tail == null ? defaultArg(tryFields(tdef_1), null, function (arg0) {
          return new Choice(0, arg0);
        }) : new Choice(1, [activePatternResult61774, tdef_1, _arg6]);
      }(toList(filter(function (m) {
        return (!(m.IsProperty ? !(m.IsPropertyGetterMethod ? true : m.IsPropertySetterMethod) : false) ? m.IsInstanceMember === flags.IsInstance : false) ? m.CompiledName === traitName : false;
      }, Types.getOwnAndInheritedFsharpMembers(tdef_1))));
    } else {
      return null;
    }
  }, sourceTypes));
}

function transformObjExpr(com, ctx, fsExpr, objType, baseCallExpr, overrides, otherOverrides) {
  const capturedThis = ctx.thisAvailability.tag === 1 ? ofArray([[null, makeIdentExpr(com.GetUniqueVar())]]) : ctx.thisAvailability.tag === 2 ? new List([ctx.thisAvailability.data[0], makeIdentExpr(com.GetUniqueVar())], ctx.thisAvailability.data[1]) : null;
  let patternInput_1;
  let $var15;
  const activePatternResult61798 = BasicPatterns["|Call|_|"](baseCallExpr);

  if (activePatternResult61798 != null) {
    if (getValue(activePatternResult61798)[0] == null) {
      $var15 = [0, getValue(activePatternResult61798)[4], getValue(activePatternResult61798)[1]];
    } else {
      $var15 = [1];
    }
  } else {
    $var15 = [1];
  }

  switch ($var15[0]) {
    case 0:
      const args = map_3(CurriedLambda(function (arg00, arg10) {
        return com.Transform(arg00, arg10);
      })(ctx), $var15[1]);
      const patternInput = [Types.makeType(com, ctx.typeArgs, baseCallExpr.Type), Helpers.makeRange(baseCallExpr.Range)];
      const baseClass = defaultArg(Helpers.tryEnclosingEntity($var15[2]), null, function (ent) {
        return function (typ) {
          return makeNonGenTypeRef(com, typ);
        }(Types.makeTypeFromDef(com, ctx.typeArgs, ent, new List()));
      });
      let baseCons;
      const c = new Expr(3, [new Expr(0, new ValueKind(2)), args, new ApplyKind(0), patternInput[0], patternInput[1]]);
      const m = new Member(".ctor", new MemberKind(0), new MemberLoc(0), new List(), new Type(1));
      baseCons = [m, new List(), c];
      patternInput_1 = [baseClass, baseCons];
      break;

    case 1:
      patternInput_1 = [null, null];
      break;
  }

  const members = collect_1(function (tupledArg) {
    let overrides_1;

    if (!tupledArg[0].HasTypeDefinition) {
      overrides_1 = tupledArg[1];
    } else {
      const typName = replace(tupledArg[0].TypeDefinition.FullName, ".", "-");
      overrides_1 = where(function (x) {
        return !function (arg00_1) {
          return Naming.ignoredInterfaceMethods.has(arg00_1);
        }(typName + "-" + x.Signature.Name);
      }, tupledArg[1]);
    }

    return map_3(function (over) {
      const info = new MemberInfo(true, false);
      const patternInput_2 = [over.CurriedParameterGroups, Helpers.makeRange(fsExpr.Range)];
      const patternInput_3 = Util.bindMemberArgs(com, ctx, info, patternInput_2[0]);
      const args_ = append(patternInput_3[2], patternInput_3[3]);
      let ctx_1;
      const matchValue = [capturedThis, patternInput_3[1]];

      if (matchValue[0] != null) {
        if (matchValue[1] == null) {
          ctx_1 = toFail(printf("Unexpected Object Expression method withouth `this` argument %O"))(patternInput_2[1]);
        } else {
          const thisAvailability = new ThisAvailability(2, [getValue(matchValue[1]), getValue(matchValue[0])]);
          ctx_1 = new Context(patternInput_3[0].fileName, patternInput_3[0].enclosingModule, patternInput_3[0].scope, patternInput_3[0].scopedInlines, patternInput_3[0].varNames, patternInput_3[0].typeArgs, patternInput_3[0].decisionTargets, thisAvailability, patternInput_3[0].genericAvailability, patternInput_3[0].isDynamicCurriedLambda, patternInput_3[0].caughtException);
        }
      } else {
        const thisAvailability_1 = new ThisAvailability(1);
        ctx_1 = new Context(patternInput_3[0].fileName, patternInput_3[0].enclosingModule, patternInput_3[0].scope, patternInput_3[0].scopedInlines, patternInput_3[0].varNames, patternInput_3[0].typeArgs, patternInput_3[0].decisionTargets, thisAvailability_1, patternInput_3[0].genericAvailability, patternInput_3[0].isDynamicCurriedLambda, patternInput_3[0].caughtException);
      }

      const typ_1 = over.Signature.DeclaringType.HasTypeDefinition ? over.Signature.DeclaringType.TypeDefinition : null;
      const name = Naming.removeGetSetPrefix(over.Signature.Name);
      let kind;
      const matchValue_1 = over.Signature.Name;
      const activePatternResult61804 = Naming["|StartsWith|_|"]("get_", matchValue_1);

      if (activePatternResult61804 != null) {
        kind = new MemberKind(2);
      } else {
        const activePatternResult61802 = Naming["|StartsWith|_|"]("set_", matchValue_1);

        if (activePatternResult61802 != null) {
          kind = new MemberKind(3);
        } else {
          kind = new MemberKind(1);
        }
      }

      const hasRestParams = typ_1 != null ? function (_arg10) {
        return _arg10 == null ? false : Helpers.hasRestParams(getValue(_arg10));
      }(tryFind(function (x_1) {
        return x_1.CompiledName === over.Signature.Name;
      }, Extensions["FSharpEntity.get_TryGetMembersFunctionsAndValues"].bind(getValue(typ_1))())) : false;
      const body = transformExpr(com, ctx_1, over.Body);
      const args_1 = map_3(function (arg00_2) {
        return Ident.getType(arg00_2);
      }, args_);
      const m_1 = new Member(name, kind, new MemberLoc(0), args_1, body.Type, null, map_3(function (x_2) {
        return x_2.Name;
      }, over.GenericParameters), null, null, null, hasRestParams);
      return [m_1, args_, body];
    }, overrides_1);
  }, new List([objType, overrides], otherOverrides));
  const interfaces = toList(distinct(filter_1($var16 => function (value) {
    return !value;
  }(function (arg00_3) {
    return Naming.ignoredInterfaces.has(arg00_3);
  }($var16)), map_3(function (x_3) {
    return Helpers.sanitizeEntityFullName(x_3.TypeDefinition);
  }, new List(objType, map_3(function (tuple) {
    return tuple[0];
  }, otherOverrides))))));
  const members_1 = toList(delay(function () {
    return append_1(patternInput_1[1] == null ? empty() : singleton(getValue(patternInput_1[1])), delay(function () {
      return append_1(members, delay(function () {
        return append_1(exists($var17 => equals("System.Collections.Generic.IEnumerable", $var17), interfaces) ? singleton(makeIteratorMethodArgsAndBody()) : empty(), delay(function () {
          return singleton(makeReflectionMethodArgsAndBody(com, null, false, false, interfaces, null, null));
        }));
      }));
    }));
  }));
  const range = Helpers.makeRangeFrom(fsExpr);
  const objExpr = new Expr(1, [members_1, interfaces, patternInput_1[0], range]);
  const $var18 = capturedThis != null ? getValue(capturedThis).tail != null ? getValue(capturedThis).head[1].tag === 0 ? getValue(capturedThis).head[1].data.tag === 5 ? [0, getValue(capturedThis).head[1].data.data] : [1] : [1] : [1] : [1];

  switch ($var18[0]) {
    case 0:
      const varDecl = new Expr(8, [$var18[1], new Expr(0, new ValueKind(1)), false, range]);
      return new Expr(10, [ofArray([varDecl, objExpr]), range]);

    case 1:
      return objExpr;
  }
}

function transformDecisionTree(com, ctx, fsExpr, decisionExpr, decisionTargets) {
  const getTargetRefsCount = function (map, _arg11) {
    getTargetRefsCount: while (true) {
      let $var19;
      const activePatternResult61826 = BasicPatterns["|IfThenElse|_|"](_arg11);

      if (activePatternResult61826 != null) {
        $var19 = [0, getValue(activePatternResult61826)[2], getValue(activePatternResult61826)[1]];
      } else {
        const activePatternResult61827 = BasicPatterns["|Let|_|"](_arg11);

        if (activePatternResult61827 != null) {
          const activePatternResult61828 = BasicPatterns["|IfThenElse|_|"](getValue(activePatternResult61827)[1]);

          if (activePatternResult61828 != null) {
            $var19 = [0, getValue(activePatternResult61828)[2], getValue(activePatternResult61828)[1]];
          } else {
            $var19 = [1];
          }
        } else {
          $var19 = [1];
        }
      }

      switch ($var19[0]) {
        case 0:
          const map_1 = getTargetRefsCount(map, $var19[2]);
          map = map_1;
          _arg11 = $var19[1];
          continue getTargetRefsCount;

        case 1:
          const activePatternResult61825 = BasicPatterns["|Let|_|"](_arg11);

          if (activePatternResult61825 != null) {
            map = map;
            _arg11 = getValue(activePatternResult61825)[1];
            continue getTargetRefsCount;
          } else {
            const activePatternResult61824 = BasicPatterns["|DecisionTreeSuccess|_|"](_arg11);

            if (activePatternResult61824 != null) {
              const matchValue = tryFind_1(getValue(activePatternResult61824)[0], map);

              if (matchValue == null) {
                return add(getValue(activePatternResult61824)[0], 1, map);
              } else {
                return add(getValue(activePatternResult61824)[0], getValue(matchValue) + 1, map);
              }
            } else {
              return toFail(printf("Unexpected DecisionTree branch %O: %A"))(Helpers.makeRange(_arg11.Range), _arg11);
            }
          }

      }
    }
  };

  const targetRefsCount = getTargetRefsCount(create_1(null, new Comparer(comparePrimitives)), decisionExpr);

  if (exists_1(function (_arg1, v) {
    return v > 1;
  }, targetRefsCount)) {
    let ctx_1;
    const decisionTargets_1 = null;
    ctx_1 = new Context(ctx.fileName, ctx.enclosingModule, ctx.scope, ctx.scopedInlines, ctx.varNames, ctx.typeArgs, decisionTargets_1, ctx.thisAvailability, ctx.genericAvailability, ctx.isDynamicCurriedLambda, ctx.caughtException);
    const patternInput = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx_1.typeArgs, fsExpr.Type)];
    const tempVar = makeIdent(com.GetUniqueVar());
    const tempVarFirstItem = makeGet(null, new Type(6, new NumberKind(4)), new Expr(0, new ValueKind(5, tempVar)), makeIntConst(0));
    const cases = toList(map_2(function (kv) {
      const patternInput_1 = item(kv[0], decisionTargets);
      let ctx_3;
      let i = 0;
      ctx_3 = fold(function (ctx_2, _var) {
        i = i + 1 | 0;
        return function (expr) {
          return Identifiers.bindExpr(ctx_2, _var, expr);
        }(makeGet(null, Types.makeType(com, ctx_2.typeArgs, _var.FullType), new Expr(0, new ValueKind(5, tempVar)), makeIntConst(i)));
      }, ctx_1, patternInput_1[0]);
      return [ofArray([makeIntConst(kv[0])]), transformExpr(com, ctx_3, patternInput_1[1])];
    }, targetRefsCount));
    return function (statements) {
      return makeSequential(patternInput[0], statements);
    }(ofArray([new Expr(8, [tempVar, transformExpr(com, ctx_1, decisionExpr), false, null]), new Expr(12, [tempVarFirstItem, cases, null, patternInput[1], patternInput[0]])]));
  } else {
    const targets = map_4(function (k, _arg2) {
      return item(k, decisionTargets);
    }, targetRefsCount);
    let ctx_4;
    const decisionTargets_2 = targets;
    ctx_4 = new Context(ctx.fileName, ctx.enclosingModule, ctx.scope, ctx.scopedInlines, ctx.varNames, ctx.typeArgs, decisionTargets_2, ctx.thisAvailability, ctx.genericAvailability, ctx.isDynamicCurriedLambda, ctx.caughtException);
    return transformExpr(com, ctx_4, decisionExpr);
  }
}

function transformDecisionTreeSuccess(com, ctx, range, decisionTargets, decIndex, decBindings) {
  const matchValue = tryFind_1(decIndex, decisionTargets);

  if (matchValue != null) {
    if (getValue(matchValue)[0].tail == null) {
      const activePatternResult61849 = CurriedLambda(function (arg00, arg10) {
        return com.Transform(arg00, arg10);
      })(ctx)(getValue(matchValue)[1]);
      return activePatternResult61849;
    } else {
      if (!List_1.sameLength(getValue(matchValue)[0], decBindings)) {
        toFail(printf("Variables and bindings have different length %O"))(range);
      }

      const ctx_2 = fold2(function (ctx_1, _var, _arg1) {
        const activePatternResult61844 = CurriedLambda(function (arg00_1, arg10_1) {
          return com.Transform(arg00_1, arg10_1);
        })(ctx_1)(_arg1);
        return Identifiers.bindExpr(ctx_1, _var, activePatternResult61844);
      }, ctx, getValue(matchValue)[0], decBindings);
      return transformExpr(com, ctx_2, getValue(matchValue)[1]);
    }
  } else {
    return toFail(printf("Missing decision target %O"))(range);
  }
}

function transformDelegate(com, ctx, delegateType, fsExpr) {
  var v;
  var args_2;
  var args_3;
  var args_4;
  var args_5;
  var args_6;
  var args_7;
  var args_8;
  var args_9;
  var args_10;
  var args_11;
  var args_12;
  var args_13;
  var args_14;
  var args_15;
  var args_16;
  var args_17;

  const wrapInZeroArgsLambda = function (r, typ, args, fref) {
    const args_1 = map_3(function (fsExpr_1) {
      return transformExpr(com, ctx, fsExpr_1);
    }, args);
    const captureThis = !ctx.thisAvailability.Equals(new ThisAvailability(0));
    const body = new Expr(3, [fref, args_1, new ApplyKind(0), typ, r]);
    return new Expr(0, new ValueKind(16, [new List(), body, new LambdaInfo(captureThis)]));
  };

  const isSpecialCase = function (t) {
    return Option_1.toBool(function (name) {
      return name === "System.Func`1" ? true : name === "System.Action";
    }, defaultArg(Helpers.tryDefinition(t), null, function (tdef) {
      return tdef.TryFullName;
    }));
  };

  let $var20;
  const activePatternResult61865 = BasicPatterns["|Call|_|"](fsExpr);

  if (activePatternResult61865 != null) {
    if (getValue(activePatternResult61865)[0] == null) {
      if (getValue(activePatternResult61865)[2].tail == null) {
        if (getValue(activePatternResult61865)[3].tail == null) {
          if (v = getValue(activePatternResult61865)[1], args_2 = getValue(activePatternResult61865)[4], isSpecialCase(delegateType)) {
            $var20 = [0, getValue(activePatternResult61865)[4], getValue(activePatternResult61865)[1]];
          } else {
            const activePatternResult61866 = BasicPatterns["|Application|_|"](fsExpr);

            if (activePatternResult61866 != null) {
              const activePatternResult61867 = BasicPatterns["|Value|_|"](getValue(activePatternResult61866)[0]);

              if (activePatternResult61867 != null) {
                if (args_3 = getValue(activePatternResult61866)[2], isSpecialCase(delegateType)) {
                  $var20 = [0, getValue(activePatternResult61866)[2], getValue(activePatternResult61867)];
                } else {
                  const activePatternResult61868 = BasicPatterns["|Application|_|"](getValue(activePatternResult61866)[0]);

                  if (activePatternResult61868 != null) {
                    const activePatternResult61869 = BasicPatterns["|Value|_|"](getValue(activePatternResult61868)[0]);

                    if (activePatternResult61869 != null) {
                      if (args_4 = getValue(activePatternResult61868)[2], isSpecialCase(delegateType)) {
                        $var20 = [0, getValue(activePatternResult61868)[2], getValue(activePatternResult61869)];
                      } else {
                        $var20 = [1];
                      }
                    } else {
                      $var20 = [1];
                    }
                  } else {
                    $var20 = [1];
                  }
                }
              } else {
                const activePatternResult61870 = BasicPatterns["|Application|_|"](getValue(activePatternResult61866)[0]);

                if (activePatternResult61870 != null) {
                  const activePatternResult61871 = BasicPatterns["|Value|_|"](getValue(activePatternResult61870)[0]);

                  if (activePatternResult61871 != null) {
                    if (args_5 = getValue(activePatternResult61870)[2], isSpecialCase(delegateType)) {
                      $var20 = [0, getValue(activePatternResult61870)[2], getValue(activePatternResult61871)];
                    } else {
                      $var20 = [1];
                    }
                  } else {
                    $var20 = [1];
                  }
                } else {
                  $var20 = [1];
                }
              }
            } else {
              $var20 = [1];
            }
          }
        } else {
          const activePatternResult61872 = BasicPatterns["|Application|_|"](fsExpr);

          if (activePatternResult61872 != null) {
            const activePatternResult61873 = BasicPatterns["|Value|_|"](getValue(activePatternResult61872)[0]);

            if (activePatternResult61873 != null) {
              if (args_6 = getValue(activePatternResult61872)[2], isSpecialCase(delegateType)) {
                $var20 = [0, getValue(activePatternResult61872)[2], getValue(activePatternResult61873)];
              } else {
                const activePatternResult61874 = BasicPatterns["|Application|_|"](getValue(activePatternResult61872)[0]);

                if (activePatternResult61874 != null) {
                  const activePatternResult61875 = BasicPatterns["|Value|_|"](getValue(activePatternResult61874)[0]);

                  if (activePatternResult61875 != null) {
                    if (args_7 = getValue(activePatternResult61874)[2], isSpecialCase(delegateType)) {
                      $var20 = [0, getValue(activePatternResult61874)[2], getValue(activePatternResult61875)];
                    } else {
                      $var20 = [1];
                    }
                  } else {
                    $var20 = [1];
                  }
                } else {
                  $var20 = [1];
                }
              }
            } else {
              const activePatternResult61876 = BasicPatterns["|Application|_|"](getValue(activePatternResult61872)[0]);

              if (activePatternResult61876 != null) {
                const activePatternResult61877 = BasicPatterns["|Value|_|"](getValue(activePatternResult61876)[0]);

                if (activePatternResult61877 != null) {
                  if (args_8 = getValue(activePatternResult61876)[2], isSpecialCase(delegateType)) {
                    $var20 = [0, getValue(activePatternResult61876)[2], getValue(activePatternResult61877)];
                  } else {
                    $var20 = [1];
                  }
                } else {
                  $var20 = [1];
                }
              } else {
                $var20 = [1];
              }
            }
          } else {
            $var20 = [1];
          }
        }
      } else {
        const activePatternResult61878 = BasicPatterns["|Application|_|"](fsExpr);

        if (activePatternResult61878 != null) {
          const activePatternResult61879 = BasicPatterns["|Value|_|"](getValue(activePatternResult61878)[0]);

          if (activePatternResult61879 != null) {
            if (args_9 = getValue(activePatternResult61878)[2], isSpecialCase(delegateType)) {
              $var20 = [0, getValue(activePatternResult61878)[2], getValue(activePatternResult61879)];
            } else {
              const activePatternResult61880 = BasicPatterns["|Application|_|"](getValue(activePatternResult61878)[0]);

              if (activePatternResult61880 != null) {
                const activePatternResult61881 = BasicPatterns["|Value|_|"](getValue(activePatternResult61880)[0]);

                if (activePatternResult61881 != null) {
                  if (args_10 = getValue(activePatternResult61880)[2], isSpecialCase(delegateType)) {
                    $var20 = [0, getValue(activePatternResult61880)[2], getValue(activePatternResult61881)];
                  } else {
                    $var20 = [1];
                  }
                } else {
                  $var20 = [1];
                }
              } else {
                $var20 = [1];
              }
            }
          } else {
            const activePatternResult61882 = BasicPatterns["|Application|_|"](getValue(activePatternResult61878)[0]);

            if (activePatternResult61882 != null) {
              const activePatternResult61883 = BasicPatterns["|Value|_|"](getValue(activePatternResult61882)[0]);

              if (activePatternResult61883 != null) {
                if (args_11 = getValue(activePatternResult61882)[2], isSpecialCase(delegateType)) {
                  $var20 = [0, getValue(activePatternResult61882)[2], getValue(activePatternResult61883)];
                } else {
                  $var20 = [1];
                }
              } else {
                $var20 = [1];
              }
            } else {
              $var20 = [1];
            }
          }
        } else {
          $var20 = [1];
        }
      }
    } else {
      const activePatternResult61884 = BasicPatterns["|Application|_|"](fsExpr);

      if (activePatternResult61884 != null) {
        const activePatternResult61885 = BasicPatterns["|Value|_|"](getValue(activePatternResult61884)[0]);

        if (activePatternResult61885 != null) {
          if (args_12 = getValue(activePatternResult61884)[2], isSpecialCase(delegateType)) {
            $var20 = [0, getValue(activePatternResult61884)[2], getValue(activePatternResult61885)];
          } else {
            const activePatternResult61886 = BasicPatterns["|Application|_|"](getValue(activePatternResult61884)[0]);

            if (activePatternResult61886 != null) {
              const activePatternResult61887 = BasicPatterns["|Value|_|"](getValue(activePatternResult61886)[0]);

              if (activePatternResult61887 != null) {
                if (args_13 = getValue(activePatternResult61886)[2], isSpecialCase(delegateType)) {
                  $var20 = [0, getValue(activePatternResult61886)[2], getValue(activePatternResult61887)];
                } else {
                  $var20 = [1];
                }
              } else {
                $var20 = [1];
              }
            } else {
              $var20 = [1];
            }
          }
        } else {
          const activePatternResult61888 = BasicPatterns["|Application|_|"](getValue(activePatternResult61884)[0]);

          if (activePatternResult61888 != null) {
            const activePatternResult61889 = BasicPatterns["|Value|_|"](getValue(activePatternResult61888)[0]);

            if (activePatternResult61889 != null) {
              if (args_14 = getValue(activePatternResult61888)[2], isSpecialCase(delegateType)) {
                $var20 = [0, getValue(activePatternResult61888)[2], getValue(activePatternResult61889)];
              } else {
                $var20 = [1];
              }
            } else {
              $var20 = [1];
            }
          } else {
            $var20 = [1];
          }
        }
      } else {
        $var20 = [1];
      }
    }
  } else {
    const activePatternResult61890 = BasicPatterns["|Application|_|"](fsExpr);

    if (activePatternResult61890 != null) {
      const activePatternResult61891 = BasicPatterns["|Value|_|"](getValue(activePatternResult61890)[0]);

      if (activePatternResult61891 != null) {
        if (args_15 = getValue(activePatternResult61890)[2], isSpecialCase(delegateType)) {
          $var20 = [0, getValue(activePatternResult61890)[2], getValue(activePatternResult61891)];
        } else {
          const activePatternResult61892 = BasicPatterns["|Application|_|"](getValue(activePatternResult61890)[0]);

          if (activePatternResult61892 != null) {
            const activePatternResult61893 = BasicPatterns["|Value|_|"](getValue(activePatternResult61892)[0]);

            if (activePatternResult61893 != null) {
              if (args_16 = getValue(activePatternResult61892)[2], isSpecialCase(delegateType)) {
                $var20 = [0, getValue(activePatternResult61892)[2], getValue(activePatternResult61893)];
              } else {
                $var20 = [1];
              }
            } else {
              $var20 = [1];
            }
          } else {
            $var20 = [1];
          }
        }
      } else {
        const activePatternResult61894 = BasicPatterns["|Application|_|"](getValue(activePatternResult61890)[0]);

        if (activePatternResult61894 != null) {
          const activePatternResult61895 = BasicPatterns["|Value|_|"](getValue(activePatternResult61894)[0]);

          if (activePatternResult61895 != null) {
            if (args_17 = getValue(activePatternResult61894)[2], isSpecialCase(delegateType)) {
              $var20 = [0, getValue(activePatternResult61894)[2], getValue(activePatternResult61895)];
            } else {
              $var20 = [1];
            }
          } else {
            $var20 = [1];
          }
        } else {
          $var20 = [1];
        }
      }
    } else {
      $var20 = [1];
    }
  }

  switch ($var20[0]) {
    case 0:
      const patternInput = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
      return CurriedLambda(wrapInZeroArgsLambda)(patternInput[0], patternInput[1], $var20[1])(Util.makeValueFrom(com, ctx, patternInput[0], patternInput[1], false, $var20[2]));

    case 1:
      const activePatternResult61864 = Patterns["|FlattenedLambda|_|"](fsExpr);

      if (activePatternResult61864 != null) {
        return transformLambda(com, ctx, fsExpr, getValue(activePatternResult61864)[0], getValue(activePatternResult61864)[1], getValue(activePatternResult61864)[2], true);
      } else {
        return transformExpr(com, ctx, fsExpr);
      }

  }
}

function transformUnionCaseTest(com, ctx, fsExpr, unionExpr, _arg1, unionCase) {
  var range;
  var range_1;
  var name;
  var index;
  const activePatternResult61905 = Helpers.nonAbbreviatedType(_arg1);
  const unionExpr_1 = transformExpr(com, ctx, unionExpr);

  const checkCase = function (propName, right) {
    const left = makeGet(null, new Type(5), unionExpr_1, makeStrConst(propName));
    return makeBinOp(Helpers.makeRangeFrom(fsExpr), new Type(3), ofArray([left, right]), new BinaryOperator(2));
  };

  const activePatternResult61904 = Patterns["|OptionUnion|ListUnion|ErasedUnion|StringEnum|PojoUnion|OtherType|"](activePatternResult61905);

  if (activePatternResult61904.tag === 0) {
    const opKind = unionCase.Name === "None" ? new BinaryOperator(0) : new BinaryOperator(1);
    return makeBinOp(Helpers.makeRangeFrom(fsExpr), new Type(3), ofArray([unionExpr_1, new Expr(0, new ValueKind(0))]), opKind);
  } else if (activePatternResult61904.tag === 1) {
    const opKind_1 = unionCase.CompiledName === "Empty" ? new BinaryOperator(0) : new BinaryOperator(1);
    const expr = makeGet(null, new Type(1), unionExpr_1, makeStrConst("tail"));
    return makeBinOp(Helpers.makeRangeFrom(fsExpr), new Type(3), ofArray([expr, new Expr(0, new ValueKind(0))]), opKind_1);
  } else if (activePatternResult61904.tag === 3) {
    return makeBinOp(Helpers.makeRangeFrom(fsExpr), new Type(3), ofArray([unionExpr_1, Helpers.lowerCaseName(unionCase)]), new BinaryOperator(2));
  } else if (activePatternResult61904.tag === 4) {
    return CurriedLambda(checkCase)("type")(makeStrConst(unionCase.Name));
  } else if (activePatternResult61904.tag === 5) {
    return CurriedLambda(checkCase)("tag")(makeIntConst(Helpers.getUnionCaseIndex(activePatternResult61905, unionCase.Name)));
  } else {
    const unionName = defaultArg(activePatternResult61905.TypeDefinition.TryFullName, "unknown");

    if (count(unionCase.UnionCaseFields) !== 1) {
      return (range = Helpers.makeRange(fsExpr.Range), function (error) {
        return addErrorAndReturnNull(com, ctx.fileName, range, error);
      })("Erased Union Cases must have one single field: " + unionName);
    } else {
      const fi = unionCase.UnionCaseFields[0];
      return (range_1 = Helpers.makeRangeFrom(fsExpr), function (typ) {
        return makeTypeTest(com, ctx.fileName, range_1, unionExpr_1, typ);
      })(function (arg20_) {
        return Types.makeType(com, ctx.typeArgs, arg20_);
      }(fi.FieldType.IsGenericParameter ? (name = fi.FieldType.GenericParameter.Name, index = findIndex(function (arg) {
        return arg.Name === name;
      }, activePatternResult61905.TypeDefinition.GenericParameters) | 0, function (source) {
        return item(index, source);
      }(activePatternResult61905.GenericArguments)) : fi.FieldType));
    }
  }
}

function transformSwitch(com, ctx, fsExpr, matchValue, isUnionType, cases, defaultCase, defaultBindings, decisionTargets) {
  const decisionTargets_1 = create_1(mapIndexed(function (i, d) {
    return [i, d];
  }, decisionTargets), new Comparer(comparePrimitives));
  const patternInput = [Helpers.makeRange(fsExpr.Range), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
  const cases_2 = toList(map_2(function (_arg1) {
    const activePatternResult61916 = _arg1;
    const cases_1 = activePatternResult61916[1][1];
    const bindings = activePatternResult61916[1][0];
    const labels = map_3(function (_arg12) {
      return _arg12.tag === 1 ? makeStrConst(_arg12.data) : makeIntConst(_arg12.data);
    }, cases_1);
    const body = transformDecisionTreeSuccess(com, ctx, patternInput[0], decisionTargets_1, activePatternResult61916[0], bindings);
    return [labels, body];
  }, cases));
  const defaultCase_1 = transformDecisionTreeSuccess(com, ctx, patternInput[0], decisionTargets_1, defaultCase, defaultBindings);
  let matchValue_2;
  const matchValueType = Types.makeType(com, ctx.typeArgs, matchValue.FullType);
  const matchValue_1 = Util.makeValueFrom(com, ctx, null, matchValueType, false, matchValue);

  if (isUnionType) {
    matchValue_2 = makeGet(null, new Type(5), matchValue_1, makeStrConst("tag"));
  } else {
    matchValue_2 = matchValue_1;
  }

  return new Expr(12, [matchValue_2, cases_2, defaultCase_1, patternInput[1], patternInput[0]]);
}

function transformExpr(com, ctx, fsExpr) {
  var range;
  var r_1;
  var range_1;
  var mapping;
  var typeArgs_1;
  var args_5;
  var range_4;
  var methTypArgs;
  var callee_6;

  transformExpr: while (true) {
    const activePatternResult62112 = function (_arg2) {
      return _SpecialValue___(com, ctx, _arg2);
    }(fsExpr);

    if (activePatternResult62112 != null) {
      return getValue(activePatternResult62112);
    } else {
      const activePatternResult62106 = Patterns["|ForOf|_|"](fsExpr);

      if (activePatternResult62106 != null) {
        const activePatternResult62109 = Identifiers["|BindIdent|"](com, ctx, getValue(activePatternResult62106)[0]);
        const activePatternResult62110 = CurriedLambda(function (arg00, arg10) {
          return com.Transform(arg00, arg10);
        })(ctx)(getValue(activePatternResult62106)[1]);
        return makeLoop(Helpers.makeRangeFrom(fsExpr), new LoopKind(2, [activePatternResult62109[1], activePatternResult62110, transformExpr(com, activePatternResult62109[0], getValue(activePatternResult62106)[2])]));
      } else {
        const activePatternResult62105 = Patterns["|ErasableLambda|_|"](fsExpr);

        if (activePatternResult62105 != null) {
          return function (argExprs) {
            return transformComposableExpr(com, ctx, getValue(activePatternResult62105)[0], argExprs);
          }(map_3(function (fsExpr_1) {
            return transformExpr(com, ctx, fsExpr_1);
          }, getValue(activePatternResult62105)[1]));
        } else {
          const activePatternResult62102 = Patterns["|Pipe|_|"](fsExpr);

          if (activePatternResult62102 != null) {
            const activePatternResult62104 = CurriedLambda(function (arg00_1, arg10_1) {
              return com.Transform(arg00_1, arg10_1);
            })(ctx)(getValue(activePatternResult62102)[0]);
            const patternInput = [Types.makeType(com, ctx.typeArgs, fsExpr.Type), Helpers.makeRangeFrom(fsExpr)];
            return makeApply(com, patternInput[1], patternInput[0], activePatternResult62104, map_3(function (fsExpr_2) {
              return transformExpr(com, ctx, fsExpr_2);
            }, getValue(activePatternResult62102)[1]));
          } else {
            const activePatternResult62101 = Patterns["|Composition|_|"](fsExpr);

            if (activePatternResult62101 != null) {
              const lambdaArg = makeIdent(com.GetUniqueVar());

              const expr1 = function (argExprs_1) {
                return transformComposableExpr(com, ctx, getValue(activePatternResult62101)[0], argExprs_1);
              }(append(map_3(function (fsExpr_3) {
                return transformExpr(com, ctx, fsExpr_3);
              }, getValue(activePatternResult62101)[1]), ofArray([new Expr(0, new ValueKind(5, lambdaArg))])));

              const expr2 = function (argExprs_2) {
                return transformComposableExpr(com, ctx, getValue(activePatternResult62101)[2], argExprs_2);
              }(append(map_3(function (fsExpr_4) {
                return transformExpr(com, ctx, fsExpr_4);
              }, getValue(activePatternResult62101)[3]), ofArray([expr1])));

              return makeLambdaExpr(ofArray([lambdaArg]), expr2);
            } else {
              const activePatternResult62100 = Patterns["|TryGetValue|_|"](fsExpr);

              if (activePatternResult62100 != null) {
                const patternInput_1 = [defaultArg(getValue(activePatternResult62100)[0], null, CurriedLambda(function (arg00_2, arg10_2) {
                  return com.Transform(arg00_2, arg10_2);
                })(ctx)), map_3(CurriedLambda(function (arg00_3, arg10_3) {
                  return com.Transform(arg00_3, arg10_3);
                })(ctx), getValue(activePatternResult62100)[4])];
                const patternInput_2 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                return Util.makeCallFrom(com, ctx, patternInput_2[0], patternInput_2[1], getValue(activePatternResult62100)[1], getValue(activePatternResult62100)[2], getValue(activePatternResult62100)[3], patternInput_1[0], patternInput_1[1]);
              } else {
                const activePatternResult62099 = Patterns["|CreateEvent|_|"](fsExpr);

                if (activePatternResult62099 != null) {
                  const patternInput_3 = [function (arg00_4, arg10_4) {
                    return com.Transform(arg00_4, arg10_4);
                  }(ctx, getValue(activePatternResult62099)[0]), map_3(CurriedLambda(function (arg00_5, arg10_5) {
                    return com.Transform(arg00_5, arg10_5);
                  })(ctx), getValue(activePatternResult62099)[5])];
                  const callee = new Expr(3, [patternInput_3[0], ofArray([makeStrConst(getValue(activePatternResult62099)[1])]), new ApplyKind(1), new Type(1), null]);
                  const patternInput_4 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                  return Util.makeCallFrom(com, ctx, patternInput_4[0], patternInput_4[1], getValue(activePatternResult62099)[2], getValue(activePatternResult62099)[3], getValue(activePatternResult62099)[4], callee, patternInput_3[1]);
                } else {
                  const activePatternResult62094 = Patterns["|CheckArrayLength|_|"](fsExpr);

                  if (activePatternResult62094 != null) {
                    const activePatternResult62097 = CurriedLambda(function (arg00_6, arg10_6) {
                      return com.Transform(arg00_6, arg10_6);
                    })(ctx)(getValue(activePatternResult62094)[0]);

                    const activePatternResult62098 = function (t) {
                      return Types.makeType(com, ctx.typeArgs, t);
                    }(getValue(activePatternResult62094)[2]);

                    const r = Helpers.makeRangeFrom(fsExpr);
                    const lengthExpr = new Expr(3, [activePatternResult62097, ofArray([makeStrConst("length")]), new ApplyKind(1), new Type(6, new NumberKind(4)), r]);
                    return makeEqOp(r, ofArray([lengthExpr, makeTypeConst(activePatternResult62098, getValue(activePatternResult62094)[1])]), new BinaryOperator(2));
                  } else {
                    const activePatternResult62093 = Patterns["|JsThis|_|"](fsExpr);

                    if (activePatternResult62093 != null) {
                      if (!ctx.thisAvailability.Equals(new ThisAvailability(0))) {
                        (range = Helpers.makeRange(fsExpr.Range), function (warning) {
                          addWarning(com, ctx.fileName, range, warning);
                        })("JS `this` is already captured in this context, try to use it in a module function");
                      }

                      return new Expr(0, new ValueKind(1));
                    } else {
                      const activePatternResult62090 = Patterns["|ErasableClosure|_|"](fsExpr);

                      if (activePatternResult62090 != null) {
                        const activePatternResult62092 = CurriedLambda(function (arg00_7, arg10_7) {
                          return com.Transform(arg00_7, arg10_7);
                        })(ctx)(getValue(activePatternResult62090));
                        return activePatternResult62092;
                      } else {
                        const activePatternResult62087 = BasicPatterns["|Coerce|_|"](fsExpr);

                        if (activePatternResult62087 != null) {
                          const activePatternResult62089 = CurriedLambda(function (arg00_8, arg10_8) {
                            return com.Transform(arg00_8, arg10_8);
                          })(ctx)(getValue(activePatternResult62087)[1]);
                          return activePatternResult62089;
                        } else {
                          const activePatternResult62084 = BasicPatterns["|TypeLambda|_|"](fsExpr);

                          if (activePatternResult62084 != null) {
                            const activePatternResult62086 = CurriedLambda(function (arg00_9, arg10_9) {
                              return com.Transform(arg00_9, arg10_9);
                            })(ctx)(getValue(activePatternResult62084)[1]);
                            return activePatternResult62086;
                          } else {
                            const activePatternResult62081 = BasicPatterns["|AddressOf|_|"](fsExpr);

                            if (activePatternResult62081 != null) {
                              const activePatternResult62083 = CurriedLambda(function (arg00_10, arg10_10) {
                                return com.Transform(arg00_10, arg10_10);
                              })(ctx)(getValue(activePatternResult62081));
                              return activePatternResult62083;
                            } else {
                              const activePatternResult62076 = BasicPatterns["|FastIntegerForLoop|_|"](fsExpr);

                              if (activePatternResult62076 != null) {
                                const activePatternResult62079 = CurriedLambda(function (arg00_11, arg10_11) {
                                  return com.Transform(arg00_11, arg10_11);
                                })(ctx)(getValue(activePatternResult62076)[0]);
                                const activePatternResult62080 = CurriedLambda(function (arg00_12, arg10_12) {
                                  return com.Transform(arg00_12, arg10_12);
                                })(ctx)(getValue(activePatternResult62076)[1]);
                                const activePatternResult61937 = BasicPatterns["|Lambda|_|"](getValue(activePatternResult62076)[2]);

                                if (activePatternResult61937 != null) {
                                  const activePatternResult61939 = Identifiers["|BindIdent|"](com, ctx, getValue(activePatternResult61937)[0]);
                                  return makeLoop(Helpers.makeRangeFrom(fsExpr), new LoopKind(1, [activePatternResult61939[1], activePatternResult62079, activePatternResult62080, function (arg00_13, arg10_13) {
                                    return com.Transform(arg00_13, arg10_13);
                                  }(activePatternResult61939[0], getValue(activePatternResult61937)[1]), getValue(activePatternResult62076)[3]]));
                                } else {
                                  return toFail(printf("Unexpected loop %O: %A"))(Helpers.makeRange(fsExpr.Range), fsExpr);
                                }
                              } else {
                                const activePatternResult62071 = BasicPatterns["|WhileLoop|_|"](fsExpr);

                                if (activePatternResult62071 != null) {
                                  const activePatternResult62074 = CurriedLambda(function (arg00_14, arg10_14) {
                                    return com.Transform(arg00_14, arg10_14);
                                  })(ctx)(getValue(activePatternResult62071)[0]);
                                  const activePatternResult62075 = CurriedLambda(function (arg00_15, arg10_15) {
                                    return com.Transform(arg00_15, arg10_15);
                                  })(ctx)(getValue(activePatternResult62071)[1]);
                                  return makeLoop(Helpers.makeRangeFrom(fsExpr), new LoopKind(0, [activePatternResult62074, activePatternResult62075]));
                                } else {
                                  const activePatternResult62068 = BasicPatterns["|Const|_|"](fsExpr);

                                  if (activePatternResult62068 != null) {
                                    const activePatternResult62070 = function (t_1) {
                                      return Types.makeType(com, ctx.typeArgs, t_1);
                                    }(getValue(activePatternResult62068)[1]);

                                    const e = makeTypeConst(activePatternResult62070, getValue(activePatternResult62068)[0]);

                                    if (e.Type.Equals(activePatternResult62070)) {
                                      return e;
                                    } else {
                                      checkLiteral(com, ctx.fileName, Helpers.makeRangeFrom(fsExpr), getValue(activePatternResult62068)[0], activePatternResult62070);
                                      return new Expr(13, [e, activePatternResult62070]);
                                    }
                                  } else {
                                    const activePatternResult62067 = BasicPatterns["|BaseValue|_|"](fsExpr);

                                    if (activePatternResult62067 != null) {
                                      return new Expr(0, new ValueKind(2));
                                    } else {
                                      const activePatternResult62066 = BasicPatterns["|ThisValue|_|"](fsExpr);

                                      if (activePatternResult62066 != null) {
                                        return Util.makeThisRef(com, ctx, Helpers.makeRangeFrom(fsExpr), null);
                                      } else {
                                        const activePatternResult62065 = BasicPatterns["|Value|_|"](fsExpr);

                                        if (activePatternResult62065 != null) {
                                          if (getValue(activePatternResult62065).IsMemberThisValue) {
                                            return (r_1 = Helpers.makeRangeFrom(fsExpr), function (v) {
                                              return Util.makeThisRef(com, ctx, r_1, v);
                                            })(getValue(activePatternResult62065));
                                          } else if (Helpers.isInline(getValue(activePatternResult62065))) {
                                            const matchValue = tryFind(function (tupledArg) {
                                              return equals(tupledArg[0], getValue(activePatternResult62065));
                                            }, ctx.scopedInlines);

                                            if (matchValue == null) {
                                              return (range_1 = Helpers.makeRange(fsExpr.Range), function (error) {
                                                return addErrorAndReturnNull(com, ctx.fileName, range_1, error);
                                              })("Cannot resolve locally inlined value: " + getValue(activePatternResult62065).DisplayName);
                                            } else {
                                              const fsExpr_5 = getValue(matchValue)[1];
                                              return function (arg00_16, arg10_16) {
                                                return com.Transform(arg00_16, arg10_16);
                                              }(ctx, fsExpr_5);
                                            }
                                          } else {
                                            const patternInput_5 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                                            return Util.makeValueFrom(com, ctx, patternInput_5[0], patternInput_5[1], true, getValue(activePatternResult62065));
                                          }
                                        } else {
                                          const activePatternResult62062 = BasicPatterns["|DefaultValue|_|"](fsExpr);

                                          if (activePatternResult62062 != null) {
                                            const activePatternResult62064 = function (t_2) {
                                              return Types.makeType(com, ctx.typeArgs, t_2);
                                            }(getValue(activePatternResult62062));

                                            const valueKind = activePatternResult62064.tag === 3 ? new ValueKind(9, false) : activePatternResult62064.tag === 6 ? new ValueKind(7, [0, activePatternResult62064.data]) : new ValueKind(0);
                                            return new Expr(0, valueKind);
                                          } else {
                                            const activePatternResult62061 = Patterns["|ImmutableBinding|_|"](fsExpr);

                                            if (activePatternResult62061 != null) {
                                              return CurriedLambda(function (ctx_1, fsExpr_6) {
                                                return transformExpr(com, ctx_1, fsExpr_6);
                                              })(function (expr) {
                                                return Identifiers.bindExpr(ctx, getValue(activePatternResult62061)[0][0], expr);
                                              }(transformExpr(com, ctx, getValue(activePatternResult62061)[0][1])))(getValue(activePatternResult62061)[1]);
                                            } else {
                                              const activePatternResult62060 = BasicPatterns["|Let|_|"](fsExpr);

                                              if (activePatternResult62060 != null) {
                                                if (Helpers.isInline(getValue(activePatternResult62060)[0][0])) {
                                                  let ctx_2;
                                                  const scopedInlines = new List([getValue(activePatternResult62060)[0][0], getValue(activePatternResult62060)[0][1]], ctx.scopedInlines);
                                                  ctx_2 = new Context(ctx.fileName, ctx.enclosingModule, ctx.scope, scopedInlines, ctx.varNames, ctx.typeArgs, ctx.decisionTargets, ctx.thisAvailability, ctx.genericAvailability, ctx.isDynamicCurriedLambda, ctx.caughtException);
                                                  com = com;
                                                  ctx = ctx_2;
                                                  fsExpr = getValue(activePatternResult62060)[1];
                                                  continue transformExpr;
                                                } else {
                                                  const r_2 = Helpers.makeRangeFrom(fsExpr);
                                                  const value = transformExpr(com, ctx, getValue(activePatternResult62060)[0][1]);
                                                  const patternInput_6 = Identifiers.bindIdent(com, ctx, value.Type, getValue(activePatternResult62060)[0][0], getValue(activePatternResult62060)[0][0].CompiledName);
                                                  const body = transformExpr(com, patternInput_6[0], getValue(activePatternResult62060)[1]);
                                                  const assignment = new Expr(8, [patternInput_6[1], value, getValue(activePatternResult62060)[0][0].IsMutable, r_2]);
                                                  return makeSequential(r_2, ofArray([assignment, body]));
                                                }
                                              } else {
                                                const activePatternResult62059 = BasicPatterns["|LetRec|_|"](fsExpr);

                                                if (activePatternResult62059 != null) {
                                                  const range_2 = Helpers.makeRangeFrom(fsExpr);
                                                  const patternInput_7 = foldBack(function (tupledArg_1, tupledArg_2) {
                                                    const activePatternResult61946 = Identifiers["|BindIdent|"](com, tupledArg_2[0], tupledArg_1[0]);
                                                    return [activePatternResult61946[0], new List(activePatternResult61946[1], tupledArg_2[1])];
                                                  }, getValue(activePatternResult62059)[0], [ctx, new List()]);
                                                  const assignments = (mapping = function (ident, tupledArg_3) {
                                                    const activePatternResult61950 = CurriedLambda(function (arg00_17, arg10_17) {
                                                      return com.Transform(arg00_17, arg10_17);
                                                    })(patternInput_7[0])(tupledArg_3[1]);
                                                    return new Expr(8, [ident, activePatternResult61950, tupledArg_3[0].IsMutable, range_2]);
                                                  }, function (list2) {
                                                    return toList(map2(mapping, patternInput_7[1], list2));
                                                  })(getValue(activePatternResult62059)[0]);
                                                  return function (statements) {
                                                    return makeSequential(range_2, statements);
                                                  }(append(assignments, ofArray([transformExpr(com, patternInput_7[0], getValue(activePatternResult62059)[1])])));
                                                } else {
                                                  const activePatternResult62058 = BasicPatterns["|TraitCall|_|"](fsExpr);

                                                  if (activePatternResult62058 != null) {
                                                    const patternInput_8 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                                                    return transformTraitCall(com, ctx, patternInput_8[0], patternInput_8[1], getValue(activePatternResult62058)[0], getValue(activePatternResult62058)[1], getValue(activePatternResult62058)[2], getValue(activePatternResult62058)[3], getValue(activePatternResult62058)[5]);
                                                  } else {
                                                    const activePatternResult62057 = BasicPatterns["|Call|_|"](fsExpr);

                                                    if (activePatternResult62057 != null) {
                                                      const callee_1 = defaultArg(getValue(activePatternResult62057)[0], null, CurriedLambda(function (arg00_18, arg10_18) {
                                                        return com.Transform(arg00_18, arg10_18);
                                                      })(ctx));
                                                      const args = map_3(function (fsExpr_7) {
                                                        return transformExpr(com, ctx, fsExpr_7);
                                                      }, getValue(activePatternResult62057)[4]);
                                                      const patternInput_9 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                                                      return Util.makeCallFrom(com, ctx, patternInput_9[0], patternInput_9[1], getValue(activePatternResult62057)[1], getValue(activePatternResult62057)[2], getValue(activePatternResult62057)[3], callee_1, args);
                                                    } else {
                                                      let $var21;
                                                      const activePatternResult62055 = BasicPatterns["|Application|_|"](fsExpr);

                                                      if (activePatternResult62055 != null) {
                                                        const activePatternResult62056 = BasicPatterns["|Value|_|"](getValue(activePatternResult62055)[0]);

                                                        if (activePatternResult62056 != null) {
                                                          if (typeArgs_1 = getValue(activePatternResult62055)[1], args_5 = getValue(activePatternResult62055)[2], Helpers.isInline(getValue(activePatternResult62056))) {
                                                            $var21 = [0, getValue(activePatternResult62055)[2], getValue(activePatternResult62055)[1], getValue(activePatternResult62056)];
                                                          } else {
                                                            $var21 = [1];
                                                          }
                                                        } else {
                                                          $var21 = [1];
                                                        }
                                                      } else {
                                                        $var21 = [1];
                                                      }

                                                      switch ($var21[0]) {
                                                        case 0:
                                                          const range_3 = Helpers.makeRange(fsExpr.Range);
                                                          const matchValue_1 = tryFind(function (tupledArg_4) {
                                                            return equals(tupledArg_4[0], $var21[3]);
                                                          }, ctx.scopedInlines);

                                                          if (matchValue_1 == null) {
                                                            return (range_4 = range_3, function (error_1) {
                                                              return addErrorAndReturnNull(com, ctx.fileName, range_4, error_1);
                                                            })("Cannot resolve locally inlined value: " + $var21[3].DisplayName);
                                                          } else {
                                                            const fsExpr_8 = getValue(matchValue_1)[1];
                                                            let resolvedCtx;
                                                            const typeArgs = Util.matchGenericParams(com, ctx, $var21[3], new List(), $var21[2]);
                                                            resolvedCtx = new Context(ctx.fileName, ctx.enclosingModule, ctx.scope, ctx.scopedInlines, ctx.varNames, typeArgs, ctx.decisionTargets, ctx.thisAvailability, ctx.genericAvailability, ctx.isDynamicCurriedLambda, ctx.caughtException);

                                                            const callee_2 = function (arg00_19, arg10_19) {
                                                              return com.Transform(arg00_19, arg10_19);
                                                            }(resolvedCtx, fsExpr_8);

                                                            if ($var21[1].tail == null) {
                                                              return callee_2;
                                                            } else {
                                                              const typ = Types.makeType(com, ctx.typeArgs, fsExpr_8.Type);
                                                              const args_1 = map_3(function (fsExpr_9) {
                                                                return transformExpr(com, ctx, fsExpr_9);
                                                              }, $var21[1]);
                                                              return makeApply(com, range_3, typ, callee_2, args_1);
                                                            }
                                                          }

                                                        case 1:
                                                          const activePatternResult62052 = Patterns["|FlattenedApplication|_|"](fsExpr);

                                                          if (activePatternResult62052 != null) {
                                                            const activePatternResult62054 = CurriedLambda(function (arg00_20, arg10_20) {
                                                              return com.Transform(arg00_20, arg10_20);
                                                            })(ctx)(getValue(activePatternResult62052)[0]);

                                                            if (getValue(activePatternResult62052)[2].length === 0) {
                                                              return activePatternResult62054;
                                                            } else {
                                                              const patternInput_10 = [Types.makeType(com, ctx.typeArgs, fsExpr.Type), Helpers.makeRangeFrom(fsExpr)];
                                                              const args_2 = map_3(function (fsExpr_10) {
                                                                return transformExpr(com, ctx, fsExpr_10);
                                                              }, getValue(activePatternResult62052)[2]);
                                                              const matchValue_2 = activePatternResult62054.Type;
                                                              const $var22 = matchValue_2.tag === 14 ? matchValue_2.data[0].FullName === "Fable.Core.Applicable" ? [0, matchValue_2.data[0]] : [1] : [1];

                                                              switch ($var22[0]) {
                                                                case 0:
                                                                  let args_3;
                                                                  const $var23 = args_2.tail != null ? args_2.head.tag === 0 ? args_2.head.data.tag === 12 ? args_2.tail.tail == null ? [0, args_2.head.data.data] : [1, args_2] : [1, args_2] : [1, args_2] : [1, args_2];

                                                                  switch ($var23[0]) {
                                                                    case 0:
                                                                      args_3 = $var23[1];
                                                                      break;

                                                                    case 1:
                                                                      args_3 = $var23[1];
                                                                      break;
                                                                  }

                                                                  return new Expr(3, [activePatternResult62054, args_3, new ApplyKind(0), patternInput_10[0], patternInput_10[1]]);

                                                                case 1:
                                                                  return makeApply(com, patternInput_10[1], patternInput_10[0], activePatternResult62054, args_2);
                                                              }
                                                            }
                                                          } else {
                                                            const activePatternResult62045 = BasicPatterns["|IfThenElse|_|"](fsExpr);

                                                            if (activePatternResult62045 != null) {
                                                              const activePatternResult62049 = CurriedLambda(function (arg00_21, arg10_21) {
                                                                return com.Transform(arg00_21, arg10_21);
                                                              })(ctx)(getValue(activePatternResult62045)[0]);
                                                              const activePatternResult62050 = CurriedLambda(function (arg00_22, arg10_22) {
                                                                return com.Transform(arg00_22, arg10_22);
                                                              })(ctx)(getValue(activePatternResult62045)[1]);
                                                              const activePatternResult62051 = CurriedLambda(function (arg00_23, arg10_23) {
                                                                return com.Transform(arg00_23, arg10_23);
                                                              })(ctx)(getValue(activePatternResult62045)[2]);
                                                              return new Expr(2, [activePatternResult62049, activePatternResult62050, activePatternResult62051, Helpers.makeRangeFrom(fsExpr)]);
                                                            } else {
                                                              let $var24;
                                                              const activePatternResult62043 = BasicPatterns["|TryFinally|_|"](fsExpr);

                                                              if (activePatternResult62043 != null) {
                                                                const activePatternResult62044 = BasicPatterns["|TryWith|_|"](getValue(activePatternResult62043)[0]);

                                                                if (activePatternResult62044 != null) {
                                                                  $var24 = [0, getValue(activePatternResult62044)[0], getValue(activePatternResult62044)[4], getValue(activePatternResult62044)[3], getValue(activePatternResult62043)[1]];
                                                                } else {
                                                                  $var24 = [1];
                                                                }
                                                              } else {
                                                                $var24 = [1];
                                                              }

                                                              switch ($var24[0]) {
                                                                case 0:
                                                                  return Util.makeTryCatch(com, ctx, fsExpr, $var24[1], [$var24[3], $var24[2]], $var24[4]);

                                                                case 1:
                                                                  const activePatternResult62042 = BasicPatterns["|TryFinally|_|"](fsExpr);

                                                                  if (activePatternResult62042 != null) {
                                                                    return Util.makeTryCatch(com, ctx, fsExpr, getValue(activePatternResult62042)[0], null, getValue(activePatternResult62042)[1]);
                                                                  } else {
                                                                    const activePatternResult62041 = BasicPatterns["|TryWith|_|"](fsExpr);

                                                                    if (activePatternResult62041 != null) {
                                                                      return Util.makeTryCatch(com, ctx, fsExpr, getValue(activePatternResult62041)[0], [getValue(activePatternResult62041)[3], getValue(activePatternResult62041)[4]], null);
                                                                    } else {
                                                                      const activePatternResult62036 = BasicPatterns["|Sequential|_|"](fsExpr);

                                                                      if (activePatternResult62036 != null) {
                                                                        const activePatternResult62039 = CurriedLambda(function (arg00_24, arg10_24) {
                                                                          return com.Transform(arg00_24, arg10_24);
                                                                        })(ctx)(getValue(activePatternResult62036)[0]);
                                                                        const activePatternResult62040 = CurriedLambda(function (arg00_25, arg10_25) {
                                                                          return com.Transform(arg00_25, arg10_25);
                                                                        })(ctx)(getValue(activePatternResult62036)[1]);
                                                                        return makeSequential(Helpers.makeRangeFrom(fsExpr), ofArray([activePatternResult62039, activePatternResult62040]));
                                                                      } else {
                                                                        const activePatternResult62035 = BasicPatterns["|NewDelegate|_|"](fsExpr);

                                                                        if (activePatternResult62035 != null) {
                                                                          return transformDelegate(com, ctx, getValue(activePatternResult62035)[0], getValue(activePatternResult62035)[1]);
                                                                        } else {
                                                                          const activePatternResult62034 = Patterns["|FlattenedLambda|_|"](fsExpr);

                                                                          if (activePatternResult62034 != null) {
                                                                            return transformLambda(com, ctx, fsExpr, getValue(activePatternResult62034)[0], getValue(activePatternResult62034)[1], getValue(activePatternResult62034)[2], false);
                                                                          } else {
                                                                            let $var25;
                                                                            const activePatternResult62028 = BasicPatterns["|FSharpFieldGet|_|"](fsExpr);

                                                                            if (activePatternResult62028 != null) {
                                                                              if (getValue(activePatternResult62028)[0] != null) {
                                                                                const activePatternResult62029 = Patterns["|ThisVar|_|"](getValue(getValue(activePatternResult62028)[0]));

                                                                                if (activePatternResult62029 != null) {
                                                                                  const activePatternResult62030 = Patterns["|RefType|_|"](getValue(activePatternResult62028)[1]);

                                                                                  if (activePatternResult62030 != null) {
                                                                                    $var25 = [0];
                                                                                  } else {
                                                                                    $var25 = [1];
                                                                                  }
                                                                                } else {
                                                                                  const activePatternResult62031 = BasicPatterns["|FSharpFieldGet|_|"](getValue(getValue(activePatternResult62028)[0]));

                                                                                  if (activePatternResult62031 != null) {
                                                                                    if (getValue(activePatternResult62031)[0] != null) {
                                                                                      const activePatternResult62032 = Patterns["|ThisVar|_|"](getValue(getValue(activePatternResult62031)[0]));

                                                                                      if (activePatternResult62032 != null) {
                                                                                        const activePatternResult62033 = Patterns["|RefType|_|"](getValue(activePatternResult62028)[1]);

                                                                                        if (activePatternResult62033 != null) {
                                                                                          $var25 = [0];
                                                                                        } else {
                                                                                          $var25 = [1];
                                                                                        }
                                                                                      } else {
                                                                                        $var25 = [1];
                                                                                      }
                                                                                    } else {
                                                                                      $var25 = [1];
                                                                                    }
                                                                                  } else {
                                                                                    $var25 = [1];
                                                                                  }
                                                                                }
                                                                              } else {
                                                                                $var25 = [1];
                                                                              }
                                                                            } else {
                                                                              $var25 = [1];
                                                                            }

                                                                            switch ($var25[0]) {
                                                                              case 0:
                                                                                return Util.makeThisRef(com, ctx, Helpers.makeRangeFrom(fsExpr), null);

                                                                              case 1:
                                                                                const activePatternResult62026 = BasicPatterns["|FSharpFieldGet|_|"](fsExpr);

                                                                                if (activePatternResult62026 != null) {
                                                                                  const activePatternResult62027 = getValue(activePatternResult62026)[2].Name;
                                                                                  let callee_3;

                                                                                  if (getValue(activePatternResult62026)[0] == null) {
                                                                                    callee_3 = function (typ_1) {
                                                                                      return makeNonGenTypeRef(com, typ_1);
                                                                                    }(Types.makeType(com, ctx.typeArgs, getValue(activePatternResult62026)[1]));
                                                                                  } else {
                                                                                    const activePatternResult61959 = CurriedLambda(function (arg00_26, arg10_26) {
                                                                                      return com.Transform(arg00_26, arg10_26);
                                                                                    })(ctx)(getValue(getValue(activePatternResult62026)[0]));
                                                                                    callee_3 = activePatternResult61959;
                                                                                  }

                                                                                  const patternInput_11 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                                                                                  return Util.makeGetFrom(patternInput_11[0], patternInput_11[1], callee_3, makeStrConst(activePatternResult62027));
                                                                                } else {
                                                                                  const activePatternResult62023 = BasicPatterns["|TupleGet|_|"](fsExpr);

                                                                                  if (activePatternResult62023 != null) {
                                                                                    const activePatternResult62025 = CurriedLambda(function (arg00_27, arg10_27) {
                                                                                      return com.Transform(arg00_27, arg10_27);
                                                                                    })(ctx)(getValue(activePatternResult62023)[2]);
                                                                                    const patternInput_12 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                                                                                    return Util.makeGetFrom(patternInput_12[0], patternInput_12[1], activePatternResult62025, makeIntConst(getValue(activePatternResult62023)[1]));
                                                                                  } else {
                                                                                    const activePatternResult62019 = BasicPatterns["|UnionCaseGet|_|"](fsExpr);

                                                                                    if (activePatternResult62019 != null) {
                                                                                      const activePatternResult62021 = CurriedLambda(function (arg00_28, arg10_28) {
                                                                                        return com.Transform(arg00_28, arg10_28);
                                                                                      })(ctx)(getValue(activePatternResult62019)[0]);
                                                                                      const activePatternResult62022 = getValue(activePatternResult62019)[3].Name;
                                                                                      const patternInput_13 = [Types.makeType(com, ctx.typeArgs, fsExpr.Type), Helpers.makeRangeFrom(fsExpr)];
                                                                                      const activePatternResult61961 = Patterns["|OptionUnion|ListUnion|ErasedUnion|StringEnum|PojoUnion|OtherType|"](getValue(activePatternResult62019)[1]);

                                                                                      if (activePatternResult61961.tag === 0) {
                                                                                        return function (kind) {
                                                                                          return makeCall_1(patternInput_13[1], patternInput_13[0], kind);
                                                                                        }(new CallKind(2, ["Option", "getValue", false, ofArray([activePatternResult62021])]));
                                                                                      } else if (activePatternResult61961.tag === 1) {
                                                                                        return makeGet(patternInput_13[1], patternInput_13[0], activePatternResult62021, makeStrConst(Naming.lowerFirst(activePatternResult62022)));
                                                                                      } else if (activePatternResult61961.tag === 4) {
                                                                                        return function (propExpr) {
                                                                                          return makeGet(patternInput_13[1], patternInput_13[0], activePatternResult62021, propExpr);
                                                                                        }(makeStrConst(activePatternResult62022));
                                                                                      } else if (activePatternResult61961.tag === 3) {
                                                                                        return function (error_2) {
                                                                                          return addErrorAndReturnNull(com, ctx.fileName, patternInput_13[1], error_2);
                                                                                        }("StringEnum types cannot have fields");
                                                                                      } else if (activePatternResult61961.tag === 5) {
                                                                                        if (count(getValue(activePatternResult62019)[2].UnionCaseFields) > 1) {
                                                                                          const i = findIndex(function (x) {
                                                                                            return x.Name === activePatternResult62022;
                                                                                          }, getValue(activePatternResult62019)[2].UnionCaseFields) | 0;
                                                                                          const data = makeGet(patternInput_13[1], patternInput_13[0], activePatternResult62021, makeStrConst("data"));
                                                                                          return makeGet(patternInput_13[1], patternInput_13[0], data, makeIntConst(i));
                                                                                        } else {
                                                                                          return makeGet(patternInput_13[1], patternInput_13[0], activePatternResult62021, makeStrConst("data"));
                                                                                        }
                                                                                      } else {
                                                                                        return new Expr(13, [activePatternResult62021, patternInput_13[0]]);
                                                                                      }
                                                                                    } else {
                                                                                      const activePatternResult62018 = BasicPatterns["|ILFieldSet|_|"](fsExpr);

                                                                                      if (activePatternResult62018 != null) {
                                                                                        return toFail(printf("Unsupported ILField reference %O: %A"))(Helpers.makeRange(fsExpr.Range), fsExpr);
                                                                                      } else {
                                                                                        let $var26;
                                                                                        const activePatternResult62012 = BasicPatterns["|FSharpFieldSet|_|"](fsExpr);

                                                                                        if (activePatternResult62012 != null) {
                                                                                          if (getValue(activePatternResult62012)[0] != null) {
                                                                                            const activePatternResult62013 = Patterns["|ThisVar|_|"](getValue(getValue(activePatternResult62012)[0]));

                                                                                            if (activePatternResult62013 != null) {
                                                                                              const activePatternResult62014 = Patterns["|RefType|_|"](getValue(activePatternResult62012)[1]);

                                                                                              if (activePatternResult62014 != null) {
                                                                                                $var26 = [0];
                                                                                              } else {
                                                                                                $var26 = [1];
                                                                                              }
                                                                                            } else {
                                                                                              const activePatternResult62015 = BasicPatterns["|FSharpFieldGet|_|"](getValue(getValue(activePatternResult62012)[0]));

                                                                                              if (activePatternResult62015 != null) {
                                                                                                if (getValue(activePatternResult62015)[0] != null) {
                                                                                                  const activePatternResult62016 = Patterns["|ThisVar|_|"](getValue(getValue(activePatternResult62015)[0]));

                                                                                                  if (activePatternResult62016 != null) {
                                                                                                    const activePatternResult62017 = Patterns["|RefType|_|"](getValue(activePatternResult62012)[1]);

                                                                                                    if (activePatternResult62017 != null) {
                                                                                                      $var26 = [0];
                                                                                                    } else {
                                                                                                      $var26 = [1];
                                                                                                    }
                                                                                                  } else {
                                                                                                    $var26 = [1];
                                                                                                  }
                                                                                                } else {
                                                                                                  $var26 = [1];
                                                                                                }
                                                                                              } else {
                                                                                                $var26 = [1];
                                                                                              }
                                                                                            }
                                                                                          } else {
                                                                                            $var26 = [1];
                                                                                          }
                                                                                        } else {
                                                                                          $var26 = [1];
                                                                                        }

                                                                                        switch ($var26[0]) {
                                                                                          case 0:
                                                                                            return new Expr(0, new ValueKind(0));

                                                                                          case 1:
                                                                                            const activePatternResult62008 = BasicPatterns["|FSharpFieldSet|_|"](fsExpr);

                                                                                            if (activePatternResult62008 != null) {
                                                                                              const activePatternResult62010 = getValue(activePatternResult62008)[2].Name;
                                                                                              const activePatternResult62011 = CurriedLambda(function (arg00_29, arg10_29) {
                                                                                                return com.Transform(arg00_29, arg10_29);
                                                                                              })(ctx)(getValue(activePatternResult62008)[3]);
                                                                                              let callee_4;

                                                                                              if (getValue(activePatternResult62008)[0] == null) {
                                                                                                const calleeType = Types.makeType(com, ctx.typeArgs, getValue(activePatternResult62008)[1]);
                                                                                                callee_4 = makeNonGenTypeRef(com, calleeType);
                                                                                              } else {
                                                                                                const activePatternResult61963 = CurriedLambda(function (arg00_30, arg10_30) {
                                                                                                  return com.Transform(arg00_30, arg10_30);
                                                                                                })(ctx)(getValue(getValue(activePatternResult62008)[0]));
                                                                                                callee_4 = activePatternResult61963;
                                                                                              }

                                                                                              return new Expr(9, [callee_4, makeStrConst(activePatternResult62010), activePatternResult62011, Helpers.makeRangeFrom(fsExpr)]);
                                                                                            } else {
                                                                                              const activePatternResult62005 = BasicPatterns["|UnionCaseTag|_|"](fsExpr);

                                                                                              if (activePatternResult62005 != null) {
                                                                                                const activePatternResult62007 = CurriedLambda(function (arg00_31, arg10_31) {
                                                                                                  return com.Transform(arg00_31, arg10_31);
                                                                                                })(ctx)(getValue(activePatternResult62005)[0]);
                                                                                                const patternInput_14 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                                                                                                return Util.makeGetFrom(patternInput_14[0], patternInput_14[1], activePatternResult62007, makeStrConst("tag"));
                                                                                              } else {
                                                                                                const activePatternResult62002 = BasicPatterns["|UnionCaseSet|_|"](fsExpr);

                                                                                                if (activePatternResult62002 != null) {
                                                                                                  const activePatternResult62004 = CurriedLambda(function (arg00_32, arg10_32) {
                                                                                                    return com.Transform(arg00_32, arg10_32);
                                                                                                  })(ctx)(getValue(activePatternResult62002)[0]);
                                                                                                  return toFail(printf("Unexpected UnionCaseSet %O"))(Helpers.makeRange(fsExpr.Range));
                                                                                                } else {
                                                                                                  const activePatternResult61999 = BasicPatterns["|ValueSet|_|"](fsExpr);

                                                                                                  if (activePatternResult61999 != null) {
                                                                                                    const activePatternResult62001 = CurriedLambda(function (arg00_33, arg10_33) {
                                                                                                      return com.Transform(arg00_33, arg10_33);
                                                                                                    })(ctx)(getValue(activePatternResult61999)[1]);
                                                                                                    const patternInput_15 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, getValue(activePatternResult61999)[0].FullType)];
                                                                                                    const matchValue_3 = Helpers.tryEnclosingEntity(getValue(activePatternResult61999)[0]);
                                                                                                    const $var27 = matchValue_3 != null ? getValue(matchValue_3).IsFSharpModule ? [0, getValue(matchValue_3)] : [1] : [1];

                                                                                                    switch ($var27[0]) {
                                                                                                      case 0:
                                                                                                        const callee_5 = function (typ_2) {
                                                                                                          return makeNonGenTypeRef(com, typ_2);
                                                                                                        }(Types.makeTypeFromDef(com, ctx.typeArgs, $var27[1], new List()));

                                                                                                        const m = makeGet(patternInput_15[0], new Type(1), callee_5, makeStrConst(Helpers.sanitizeMethodName(getValue(activePatternResult61999)[0])));
                                                                                                        return new Expr(3, [m, ofArray([activePatternResult62001]), new ApplyKind(0), patternInput_15[1], patternInput_15[0]]);

                                                                                                      case 1:
                                                                                                        const valToSet = Util.makeValueFrom(com, ctx, patternInput_15[0], patternInput_15[1], false, getValue(activePatternResult61999)[0]);
                                                                                                        return new Expr(9, [valToSet, null, activePatternResult62001, patternInput_15[0]]);
                                                                                                    }
                                                                                                  } else {
                                                                                                    const activePatternResult61996 = BasicPatterns["|NewArray|_|"](fsExpr);

                                                                                                    if (activePatternResult61996 != null) {
                                                                                                      const activePatternResult61998 = function (t_3) {
                                                                                                        return Types.makeType(com, ctx.typeArgs, t_3);
                                                                                                      }(getValue(activePatternResult61996)[0]);

                                                                                                      return makeArray(activePatternResult61998, map_3(function (fsExpr_11) {
                                                                                                        return transformExpr(com, ctx, fsExpr_11);
                                                                                                      }, getValue(activePatternResult61996)[1]));
                                                                                                    } else {
                                                                                                      const activePatternResult61995 = BasicPatterns["|NewTuple|_|"](fsExpr);

                                                                                                      if (activePatternResult61995 != null) {
                                                                                                        return new Expr(0, new ValueKind(12, map_3(function (fsExpr_12) {
                                                                                                          return transformExpr(com, ctx, fsExpr_12);
                                                                                                        }, getValue(activePatternResult61995)[1])));
                                                                                                      } else {
                                                                                                        const activePatternResult61994 = BasicPatterns["|ObjectExpr|_|"](fsExpr);

                                                                                                        if (activePatternResult61994 != null) {
                                                                                                          return transformObjExpr(com, ctx, fsExpr, getValue(activePatternResult61994)[0], getValue(activePatternResult61994)[1], getValue(activePatternResult61994)[2], getValue(activePatternResult61994)[3]);
                                                                                                        } else {
                                                                                                          const activePatternResult61993 = BasicPatterns["|NewObject|_|"](fsExpr);

                                                                                                          if (activePatternResult61993 != null) {
                                                                                                            const patternInput_16 = [Helpers.makeRangeFrom(fsExpr), Types.makeType(com, ctx.typeArgs, fsExpr.Type)];
                                                                                                            iterate(function (tdef) {
                                                                                                              Util.validateGenArgs(com, ctx, patternInput_16[0], tdef.GenericParameters, getValue(activePatternResult61993)[1]);
                                                                                                            }, defaultArg(Helpers.tryDefinition(fsExpr.Type), [], $var28 => [$var28]));
                                                                                                            return (methTypArgs = new List(), callee_6 = null, function (args_4) {
                                                                                                              return Util.makeCallFrom(com, ctx, patternInput_16[0], patternInput_16[1], getValue(activePatternResult61993)[0], getValue(activePatternResult61993)[1], methTypArgs, callee_6, args_4);
                                                                                                            })(map_3(CurriedLambda(function (arg00_34, arg10_34) {
                                                                                                              return com.Transform(arg00_34, arg10_34);
                                                                                                            })(ctx), getValue(activePatternResult61993)[2]));
                                                                                                          } else {
                                                                                                            const activePatternResult61992 = BasicPatterns["|NewRecord|_|"](fsExpr);

                                                                                                            if (activePatternResult61992 != null) {
                                                                                                              const range_5 = Helpers.makeRangeFrom(fsExpr);
                                                                                                              const argExprs_3 = map_3(function (fsExpr_13) {
                                                                                                                return transformExpr(com, ctx, fsExpr_13);
                                                                                                              }, getValue(activePatternResult61992)[1]);
                                                                                                              const matchValue_4 = Helpers.tryDefinition(getValue(activePatternResult61992)[0]);
                                                                                                              const $var29 = matchValue_4 != null ? function (atts) {
                                                                                                                return Helpers.hasAtt(Atts.pojo, atts);
                                                                                                              }(getValue(matchValue_4).Attributes) ? [0, getValue(matchValue_4)] : [1] : [1];

                                                                                                              switch ($var29[0]) {
                                                                                                                case 0:
                                                                                                                  return function (props) {
                                                                                                                    return makeJsObject(range_5, props);
                                                                                                                  }(map_3(function (tupledArg_5) {
                                                                                                                    return [tupledArg_5[0].Name, tupledArg_5[1]];
                                                                                                                  }, toList(zip(toList($var29[1].FSharpFields), argExprs_3))));

                                                                                                                case 1:
                                                                                                                  const argExprs_4 = matchValue_4 == null ? argExprs_3 : function (argTypes) {
                                                                                                                    return ensureArity(com, toList(argTypes), argExprs_3);
                                                                                                                  }(map_2(function (x_1) {
                                                                                                                    return Types.makeType(com, new List(), x_1.FieldType);
                                                                                                                  }, getValue(matchValue_4).FSharpFields));
                                                                                                                  const recordType = Types.makeType(com, ctx.typeArgs, getValue(activePatternResult61992)[0]);
                                                                                                                  return function (_arg13) {
                                                                                                                    return _arg13 == null ? new Expr(3, [makeNonGenTypeRef(com, recordType), argExprs_4, new ApplyKind(2), Types.makeType(com, ctx.typeArgs, fsExpr.Type), range_5]) : getValue(_arg13);
                                                                                                                  }(Helpers.tryBoth(function (info) {
                                                                                                                    return Util.tryPlugin(com, info);
                                                                                                                  }, function (info_1) {
                                                                                                                    return Util.tryReplace(com, ctx, matchValue_4, info_1);
                                                                                                                  }, Util.buildApplyInfo(com, ctx, range_5, recordType, recordType, recordType.FullName, ".ctor", new MemberKind(0), new List(), new List(), new List(), new List(), null, argExprs_4)));
                                                                                                              }
                                                                                                            } else {
                                                                                                              const activePatternResult61991 = BasicPatterns["|NewUnionCase|_|"](fsExpr);

                                                                                                              if (activePatternResult61991 != null) {
                                                                                                                const activePatternResult61975 = Patterns["|ListType|_|"](getValue(activePatternResult61991)[0]);

                                                                                                                if (activePatternResult61975 != null) {
                                                                                                                  return transformNewList(com, ctx, fsExpr, getValue(activePatternResult61991)[0], getValue(activePatternResult61991)[2]);
                                                                                                                } else {
                                                                                                                  return function (argExprs_5) {
                                                                                                                    return transformNonListNewUnionCase(com, ctx, fsExpr, getValue(activePatternResult61991)[0], getValue(activePatternResult61991)[1], argExprs_5);
                                                                                                                  }(map_3(CurriedLambda(function (arg00_35, arg10_35) {
                                                                                                                    return com.Transform(arg00_35, arg10_35);
                                                                                                                  })(ctx), getValue(activePatternResult61991)[2]));
                                                                                                                }
                                                                                                              } else {
                                                                                                                const activePatternResult61986 = BasicPatterns["|TypeTest|_|"](fsExpr);

                                                                                                                if (activePatternResult61986 != null) {
                                                                                                                  const activePatternResult61989 = function (t_4) {
                                                                                                                    return Types.makeType(com, ctx.typeArgs, t_4);
                                                                                                                  }(getValue(activePatternResult61986)[0]);

                                                                                                                  const activePatternResult61990 = CurriedLambda(function (arg00_36, arg10_36) {
                                                                                                                    return com.Transform(arg00_36, arg10_36);
                                                                                                                  })(ctx)(getValue(activePatternResult61986)[1]);
                                                                                                                  return makeTypeTest(com, ctx.fileName, Helpers.makeRangeFrom(fsExpr), activePatternResult61990, activePatternResult61989);
                                                                                                                } else {
                                                                                                                  const activePatternResult61985 = BasicPatterns["|UnionCaseTest|_|"](fsExpr);

                                                                                                                  if (activePatternResult61985 != null) {
                                                                                                                    return transformUnionCaseTest(com, ctx, fsExpr, getValue(activePatternResult61985)[0], getValue(activePatternResult61985)[1], getValue(activePatternResult61985)[2]);
                                                                                                                  } else {
                                                                                                                    const activePatternResult61984 = Patterns["|Switch|_|"](fsExpr);

                                                                                                                    if (activePatternResult61984 != null) {
                                                                                                                      const cases = getValue(activePatternResult61984)[2];
                                                                                                                      const decisionTargets = getValue(activePatternResult61984)[4];
                                                                                                                      return transformSwitch(com, ctx, fsExpr, getValue(activePatternResult61984)[0], getValue(activePatternResult61984)[1], cases, getValue(activePatternResult61984)[3][0], getValue(activePatternResult61984)[3][1], decisionTargets);
                                                                                                                    } else {
                                                                                                                      const activePatternResult61983 = BasicPatterns["|DecisionTree|_|"](fsExpr);

                                                                                                                      if (activePatternResult61983 != null) {
                                                                                                                        return transformDecisionTree(com, ctx, fsExpr, getValue(activePatternResult61983)[0], getValue(activePatternResult61983)[1]);
                                                                                                                      } else {
                                                                                                                        const activePatternResult61982 = BasicPatterns["|DecisionTreeSuccess|_|"](fsExpr);

                                                                                                                        if (activePatternResult61982 != null) {
                                                                                                                          if (ctx.decisionTargets == null) {
                                                                                                                            return makeArray(new Type(1), append(ofArray([makeIntConst(getValue(activePatternResult61982)[0])]), map_3(function (fsExpr_14) {
                                                                                                                              return transformExpr(com, ctx, fsExpr_14);
                                                                                                                            }, getValue(activePatternResult61982)[1])));
                                                                                                                          } else {
                                                                                                                            return transformDecisionTreeSuccess(com, ctx, Helpers.makeRange(fsExpr.Range), getValue(ctx.decisionTargets), getValue(activePatternResult61982)[0], getValue(activePatternResult61982)[1]);
                                                                                                                          }
                                                                                                                        } else {
                                                                                                                          const activePatternResult61979 = BasicPatterns["|Quote|_|"](fsExpr);

                                                                                                                          if (activePatternResult61979 != null) {
                                                                                                                            const activePatternResult61981 = CurriedLambda(function (arg00_37, arg10_37) {
                                                                                                                              return com.Transform(arg00_37, arg10_37);
                                                                                                                            })(ctx)(getValue(activePatternResult61979));
                                                                                                                            return new Expr(4, activePatternResult61981);
                                                                                                                          } else {
                                                                                                                            let $var30;
                                                                                                                            const activePatternResult61976 = BasicPatterns["|ILAsm|_|"](fsExpr);

                                                                                                                            if (activePatternResult61976 != null) {
                                                                                                                              $var30 = [0];
                                                                                                                            } else {
                                                                                                                              const activePatternResult61977 = BasicPatterns["|ILFieldGet|_|"](fsExpr);

                                                                                                                              if (activePatternResult61977 != null) {
                                                                                                                                $var30 = [0];
                                                                                                                              } else {
                                                                                                                                const activePatternResult61978 = BasicPatterns["|AddressSet|_|"](fsExpr);

                                                                                                                                if (activePatternResult61978 != null) {
                                                                                                                                  $var30 = [0];
                                                                                                                                } else {
                                                                                                                                  $var30 = [0];
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }

                                                                                                                            switch ($var30[0]) {
                                                                                                                              case 0:
                                                                                                                                return toFail(printf("Cannot compile expression in %O: %A"))(Helpers.makeRange(fsExpr.Range), fsExpr);
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }

                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }

                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }

                                                              }
                                                            }
                                                          }

                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function processMemberDecls(com, fableEnt, childDecls) {
  if (fableEnt.Kind.Equals(new EntityKind(0))) {
    return toList(childDecls);
  } else {
    let isException;
    const matchValue = fableEnt.Kind;

    if (matchValue.tag === 3) {
      isException = true;
    } else {
      isException = false;
    }

    const needsEqImpl = (fableEnt.HasInterface("System.IEquatable") ? true : isException) ? CurriedLambda(() => fableEnt.TryGetFullDecorator("Microsoft.FSharp.Core.CustomEquality") == null)() : false;
    const needsCompImpl = fableEnt.HasInterface("System.IComparable") ? CurriedLambda(() => fableEnt.TryGetFullDecorator("Microsoft.FSharp.Core.CustomComparison") == null)() : false;
    const nullable = CurriedLambda(() => fableEnt.TryGetFullDecorator("Microsoft.FSharp.Core.AllowNullLiteral") != null)();
    const fableType = new Type(14, [fableEnt, map_3(function (arg0) {
      return new Type(12, arg0);
    }, fableEnt.GenericParameters)]);
    return function (autoMeths) {
      return toList(delay(function () {
        return append_1(autoMeths, delay(function () {
          return append_1(fableEnt.HasInterface("System.Collections.Generic.IEnumerable") ? singleton(makeIteratorMethod()) : empty(), delay(function () {
            return childDecls;
          }));
        }));
      }));
    }((() => {
      const matchValue_1 = fableEnt.Kind;
      const $var31 = matchValue_1.tag === 1 ? [0] : matchValue_1.tag === 2 ? [1, matchValue_1.data] : matchValue_1.tag === 3 ? [1, matchValue_1.data] : matchValue_1.tag === 4 ? [2] : [3];

      switch ($var31[0]) {
        case 0:
          const hasFields = fold(function (hasField, tupledArg) {
            return hasField ? true : !(tupledArg[1].tail == null);
          }, false, matchValue_1.data);

          if (hasFields) {
            return toList(delay(function () {
              return append_1(singleton(makeUnionCons()), delay(function () {
                return append_1(singleton(makeReflectionMethod(com, fableEnt, false, nullable, matchValue_1.data, null)), delay(function () {
                  return append_1(needsEqImpl ? singleton(makeUnionEqualMethod(fableType)) : empty(), delay(function () {
                    return needsCompImpl ? singleton(makeUnionCompareMethod(fableType)) : empty();
                  }));
                }));
              }));
            }));
          } else {
            return toList(delay(function () {
              return append_1(singleton(makeUnionConsNoData()), delay(function () {
                return append_1(singleton(makeReflectionMethod(com, fableEnt, false, nullable, matchValue_1.data, null)), delay(function () {
                  return append_1(needsEqImpl ? singleton(makeUnionEqualMethodNoData(fableType)) : empty(), delay(function () {
                    return needsCompImpl ? singleton(makeUnionCompareMethodNoData(fableType)) : empty();
                  }));
                }));
              }));
            }));
          }

        case 1:
          return toList(delay(function () {
            return append_1(!exists(function (m) {
              return m.Kind.Equals(new MemberKind(0));
            }, fableEnt.Members) ? singleton(makeRecordCons(com, fableEnt, $var31[1])) : empty(), delay(function () {
              return append_1(singleton(makeReflectionMethod(com, fableEnt, false, nullable, null, $var31[1])), delay(function () {
                return append_1(needsEqImpl ? singleton(makeRecordEqualMethod(fableType)) : empty(), delay(function () {
                  return needsCompImpl ? singleton(makeRecordCompareMethod(fableType)) : empty();
                }));
              }));
            }));
          }));

        case 2:
          return ofArray([makeReflectionMethod(com, fableEnt, CurriedLambda(() => matchValue_1.data[0] != null)(), nullable, null, matchValue_1.data[1])]);

        case 3:
          return new List();
      }
    })());
  }
}

function tryGetImport(com, ctx, r, atts) {
  try {
    return defaultArg(Helpers.tryFindAtt(function (y) {
      return Atts.import === y;
    }, atts), null, function (att) {
      if (count(att.ConstructorArguments) === 2) {
        const matchValue = [att.ConstructorArguments[0], att.ConstructorArguments[1]];
        const $var37 = typeof matchValue[0][1] === "string" ? typeof matchValue[1][1] === "string" ? [0, matchValue[1][1], matchValue[0][1]] : [1] : [1];

        switch ($var37[0]) {
          case 0:
            return [$var37[2], $var37[1]];

          case 1:
            return null;
        }
      } else {
        return null;
      }
    });
  } catch (matchValue_1) {
    return null;
  }
}

function _MultiArgFunction___(com, ctx, r, meth, body, fableBody) {
  const hasNoTupledArgs = function (meth_1) {
    return !fold(function (hasTuple, g) {
      return hasTuple ? true : count(g) > 1;
    }, false, meth_1.CurriedParameterGroups);
  };

  const funcBodyArgs = (body.Type.IsFunctionType ? Types.getFunctionGenericArgs(new List(), ctx.typeArgs, true, body.Type).length : 0) | 0;

  if (funcBodyArgs > 0) {
    if (funcBodyArgs > 1) {
      return makeDynamicCurriedLambda(fableBody.Range, fableBody.Type, fableBody);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function addMethodToDeclInfo(com, ctx, declInfo, range, _import, meth, args, body) {
  const memberName = Helpers.sanitizeMethodName(meth);
  const memberLoc = Helpers.getMemberLoc(meth);
  let patternInput_1;

  if (Helpers.isModuleMember(meth)) {
    const typ = Types.makeType(com, ctx.typeArgs, meth.FullType);
    const patternInput = Identifiers.bindIdent(com, ctx, typ, meth, memberName);
    patternInput_1 = [patternInput[0], patternInput[1].Name];
  } else {
    patternInput_1 = [ctx, null];
  }

  let patternInput_3;

  if (_import == null) {
    const info = new MemberInfo(meth.IsInstanceMember, Helpers.hasPassGenericsAtt(com, patternInput_1[0], meth));
    const patternInput_2 = Util.bindMemberArgs(com, patternInput_1[0], info, args);
    let ctx_1;

    if (!memberLoc.Equals(new MemberLoc(1))) {
      const thisAvailability = new ThisAvailability(1);
      ctx_1 = new Context(patternInput_2[0].fileName, patternInput_2[0].enclosingModule, patternInput_2[0].scope, patternInput_2[0].scopedInlines, patternInput_2[0].varNames, patternInput_2[0].typeArgs, patternInput_2[0].decisionTargets, thisAvailability, patternInput_2[0].genericAvailability, patternInput_2[0].isDynamicCurriedLambda, patternInput_2[0].caughtException);
    } else {
      ctx_1 = patternInput_2[0];
    }

    if (meth.IsImplicitConstructor) {
      let body_1;
      const matchValue = declInfo.TryGetOwner(meth);
      let $var38;

      if (matchValue != null) {
        const activePatternResult62190 = getValue(matchValue).Kind;

        if (activePatternResult62190.tag === 4) {
          if (activePatternResult62190.data[0] != null) {
            $var38 = [0, getValue(activePatternResult62190.data[0])[0], getValue(matchValue)];
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
          body_1 = compileDerivedConstructor(com, ctx_1, $var38[2], $var38[1], body);
          break;

        case 1:
          body_1 = transformExpr(com, ctx_1, body);
          break;
      }

      patternInput_3 = [new MemberKind(0), patternInput_2[2], patternInput_2[3], body_1];
    } else {
      const fableBody = transformExpr(com, ctx_1, body);
      let $var39;

      if (fableBody.tag === 0) {
        if (fableBody.data.tag === 6) {
          $var39 = [0, fableBody.data.data[2], fableBody.data.data[1], fableBody.data.data[0]];
        } else {
          const activePatternResult62192 = function (fableBody_2) {
            return _MultiArgFunction___(com, ctx_1, range, meth, body, fableBody_2);
          }(fableBody);

          if (activePatternResult62192 != null) {
            $var39 = [1, getValue(activePatternResult62192)];
          } else {
            $var39 = [2];
          }
        }
      } else {
        const activePatternResult62193 = function (fableBody_3) {
          return _MultiArgFunction___(com, ctx_1, range, meth, body, fableBody_3);
        }(fableBody);

        if (activePatternResult62193 != null) {
          $var39 = [1, getValue(activePatternResult62193)];
        } else {
          $var39 = [2];
        }
      }

      switch ($var39[0]) {
        case 0:
          const fableBody_1 = $var39[3] === "__PLACE-HOLDER__" ? new Expr(0, new ValueKind(6, [meth.DisplayName, $var39[2], $var39[1]])) : fableBody;
          patternInput_3 = [new MemberKind(4), new List(), new List(), fableBody_1];
          break;

        case 1:
          patternInput_3 = [Helpers.getMemberKind(meth), patternInput_2[2], patternInput_2[3], $var39[1]];
          break;

        case 2:
          patternInput_3 = [Helpers.getMemberKind(meth), patternInput_2[2], patternInput_2[3], fableBody];
          break;
      }
    }
  } else {
    const selector = getValue(_import)[0];
    const path = getValue(_import)[1];
    patternInput_3 = [new MemberKind(4), new List(), new List(), makeImport(selector, path)];
  }

  let entMember;
  const argTypes = map_3(function (arg00) {
    return Ident.getType(arg00);
  }, patternInput_3[1]);
  const fullTyp = Types.makeOriginalCurriedType(com, meth.CurriedParameterGroups, patternInput_3[3].Type);

  const tryGetMember = function (e) {
    return e.TryGetMember(memberName, patternInput_3[0], memberLoc, argTypes);
  };

  const matchValue_1 = Helpers.tryEnclosingEntity(meth);
  let $var40;

  if (matchValue_1 != null) {
    const activePatternResult62199 = function (e_1) {
      return com.GetEntity(e_1);
    }(getValue(matchValue_1));

    const activePatternResult62201 = Patterns_1["|Try|_|"](tryGetMember, activePatternResult62199);

    if (activePatternResult62201 != null) {
      $var40 = [0, getValue(activePatternResult62201)];
    } else {
      $var40 = [1];
    }
  } else {
    $var40 = [1];
  }

  switch ($var40[0]) {
    case 0:
      entMember = $var40[1];
      break;

    case 1:
      entMember = Types.makeMethodFrom(com, memberName, patternInput_3[0], memberLoc, argTypes, patternInput_3[3].Type, fullTyp, null, meth);
      break;
  }

  const entMember_1 = new Declaration(2, [entMember, Helpers.isPublicMethod(meth), patternInput_1[1], append(patternInput_3[1], patternInput_3[2]), patternInput_3[3], range]);
  declInfo.AddMethod(meth, entMember_1);
  return patternInput_1[0];
}

function transformMemberDecl(com, ctx, declInfo, meth, args, body) {
  var range_1;
  const range = Helpers.makeRange(Helpers.getMethLocation(meth));

  const _import = tryGetImport(com, ctx, range, meth.Attributes);

  if (_import != null) {
    return addMethodToDeclInfo(com, ctx, declInfo, range, _import, meth, args, body);
  } else if (declInfo.IsIgnoredMethod(meth)) {
    return ctx;
  } else if (Helpers.isInline(meth)) {
    if (!Helpers.isModuleMember(meth) ? meth.CompiledName.indexOf("op_") === 0 : false) {
      (range_1 = range, function (warning) {
        addWarning(com, ctx.fileName, range_1, warning);
      })(toText(printf("Custom type operators cannot be inlined: %s"))(meth.FullName));
      return addMethodToDeclInfo(com, ctx, declInfo, range, null, meth, args, body);
    } else {
      const args_1 = function (vars) {
        return Util.countRefs(body, vars);
      }(collect(function (x) {
        return x;
      }, args));

      com.AddInlineExpr(Helpers.fullNameAndArgCount(meth), [args_1, body]);
      return ctx;
    }
  } else {
    return addMethodToDeclInfo(com, ctx, declInfo, range, null, meth, args, body);
  }
}

function transformEntityDecl(com, ctx, declInfo, ent, subDecls) {
  var typ;
  var fsRef;
  const range = Helpers.makeRange(Helpers.getEntityLocation(ent));

  const _import = tryGetImport(com, ctx, range, ent.Attributes);

  if (_import != null) {
    const patternInput = getValue(_import);
    const isPublic = Helpers.isPublicEntity(ctx, ent);
    const patternInput_1 = [Helpers.sanitizeEntityName(ent), makeImport(patternInput[0], patternInput[1])];
    const patternInput_2 = Identifiers.bindIdentWithExactName(com, ctx, new Type(1), null, patternInput_1[0]);
    const m = new Member(patternInput_1[0], new MemberKind(4), new MemberLoc(1), new List(), patternInput_1[1].Type);
    const decl = new Declaration(2, [m, isPublic, patternInput_2[1].Name, new List(), patternInput_1[1], range]);
    const publicName = isPublic ? patternInput_1[0] : null;
    declInfo.AddIgnoredChild(ent);
    declInfo.AddDeclaration(decl, publicName);
    return patternInput_2[0];
  } else if (declInfo.IsIgnoredEntity(ent)) {
    declInfo.AddIgnoredChild(ent);
    return ctx;
  } else if (ent.IsEnum) {
    return ctx;
  } else {
    let childDecls;
    let ctx_1;
    const enclosingModule = new EnclosingModule(com.GetEntity(ent), Helpers.isPublicEntity(ctx, ent));
    ctx_1 = new Context(ctx.fileName, enclosingModule, ctx.scope, ctx.scopedInlines, ctx.varNames, ctx.typeArgs, ctx.decisionTargets, ctx.thisAvailability, ctx.genericAvailability, ctx.isDynamicCurriedLambda, ctx.caughtException);
    childDecls = transformDeclarations(com, ctx_1, subDecls);

    if (childDecls.tail == null ? ent.IsFSharpModule : false) {
      return ctx;
    } else {
      const patternInput_3 = (typ = new Type(1), fsRef = null, function (name) {
        return Identifiers.bindIdentWithExactName(com, ctx, typ, fsRef, name);
      })(Helpers.sanitizeEntityName(ent));
      declInfo.AddChild(com, patternInput_3[0], ent, patternInput_3[1].Name, childDecls);
      return patternInput_3[0];
    }
  }
}

function transformDeclarations(com, ctx, decls) {
  const declInfo = new DeclInfo(com, ctx.fileName);
  fold(function (ctx_1, decl) {
    if (decl.tag === 1) {
      return transformMemberDecl(com, ctx_1, declInfo, decl.data[0], decl.data[1], decl.data[2]);
    } else if (decl.tag === 2) {
      const e = function (arg00, arg10) {
        return com.Transform(arg00, arg10);
      }(ctx_1, decl.data);

      declInfo.AddDeclaration(new Declaration(0, [e, Helpers.makeRangeFrom(decl.data)]));
      return ctx_1;
    } else {
      return transformEntityDecl(com, ctx_1, declInfo, decl.data[0], decl.data[1]);
    }
  }, ctx, decls);
  return declInfo.GetDeclarations(com);
}

function getRootModuleAndDecls(decls) {
  const _CommonNamespace___ = function (_arg16) {
    var subDecls_1;
    var ent;
    const $var41 = _arg16.tail != null ? _arg16.head.tag === 0 ? (subDecls_1 = _arg16.head.data[1], ent = _arg16.head.data[0], ent.IsNamespace) ? [0, _arg16.head.data[0], _arg16.tail, _arg16.head.data[1]] : [1] : [1] : [1];

    switch ($var41[0]) {
      case 0:
        const commonName = $var41[1].CompiledName;
        return defaultArg(fold(function (acc, decl) {
          const matchValue = [acc, decl];
          const $var42 = matchValue[0] != null ? matchValue[1].tag === 0 ? [0, matchValue[1].data[0], getValue(matchValue[0]), matchValue[1].data[1]] : [1] : [1];

          switch ($var42[0]) {
            case 0:
              if ($var42[1].CompiledName === commonName) {
                return append($var42[2], $var42[3]);
              } else {
                return null;
              }

            case 1:
              return null;
          }
        }, $var41[3], $var41[2]), null, function (subDecls) {
          return [$var41[1], subDecls];
        });

      case 1:
        return null;
    }
  };

  const getRootModuleAndDecls_1 = function (outerEnt, decls_1) {
    var ent_1;
    var decls_2;

    getRootModuleAndDecls_1: while (true) {
      const $var43 = decls_1.tail != null ? decls_1.head.tag === 0 ? decls_1.tail.tail == null ? (ent_1 = decls_1.head.data[0], decls_2 = decls_1.head.data[1], ent_1.IsFSharpModule ? true : ent_1.IsNamespace) ? [0, decls_1.head.data[1], decls_1.head.data[0]] : [1] : [1] : [1] : [1];

      switch ($var43[0]) {
        case 0:
          outerEnt = $var43[2];
          decls_1 = $var43[1];
          continue getRootModuleAndDecls_1;

        case 1:
          const activePatternResult62232 = _CommonNamespace___(decls_1);

          if (activePatternResult62232 != null) {
            outerEnt = getValue(activePatternResult62232)[0];
            decls_1 = getValue(activePatternResult62232)[1];
            continue getRootModuleAndDecls_1;
          } else {
            return [outerEnt, decls_1];
          }

      }
    }
  };

  return getRootModuleAndDecls_1(null, decls);
}

function tryGetMethodArgsAndBody(implFiles, fileName, meth) {
  const tryGetMethodArgsAndBody_ = function (methFullName, _arg17) {
    if (_arg17.tag === 1) {
      if (methFullName === _arg17.data[0].FullName) {
        return [_arg17.data[1], _arg17.data[2]];
      } else {
        return null;
      }
    } else if (_arg17.tag === 2) {
      return null;
    } else {
      const entFullName = Helpers.getEntityFullName(_arg17.data[0]);

      if (methFullName.indexOf(entFullName) === 0) {
        return tryPick(CurriedLambda(tryGetMethodArgsAndBody_)(methFullName), _arg17.data[1]);
      } else {
        return null;
      }
    }
  };

  return defaultArg(tryFind_1(fileName, implFiles), null, function (f) {
    return tryPick(CurriedLambda(tryGetMethodArgsAndBody_)(meth.FullName), f.Declarations);
  });
}

function tryGetEntityImplementation(implFiles, ent) {
  var loc;
  var copyOfStruct;

  const tryGetEntityImplementation_ = function (entFullName, _arg18) {
    if (_arg18.tag === 0) {
      const entFullName2 = Helpers.getEntityFullName(_arg18.data[0]);

      if (entFullName === entFullName2) {
        return _arg18.data[0];
      } else if (entFullName.indexOf(entFullName2) === 0) {
        return tryPick(CurriedLambda(tryGetEntityImplementation_)(entFullName), _arg18.data[1]);
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const matchValue = [ent.Assembly.FileName, ent.ImplementationLocation];
  const $var44 = matchValue[0] == null ? matchValue[1] != null ? (loc = getValue(matchValue[1]), (copyOfStruct = ent.DeclarationLocation, copyOfStruct.FileName) !== loc.FileName) ? [0, getValue(matchValue[1])] : [1] : [1] : [1];

  switch ($var44[0]) {
    case 0:
      const fileName = Path.normalizePath($var44[1].FileName);
      return defaultArg(tryFind_1(fileName, implFiles), null, function (f) {
        const entFullName_1 = Helpers.getEntityFullName(ent);
        return tryPick(CurriedLambda(tryGetEntityImplementation_)(entFullName_1), f.Declarations);
      });

    case 1:
      return ent;
  }
}

export function getRootModuleFullName(file) {
  const patternInput = getRootModuleAndDecls(file.Declarations);

  if (patternInput[0] == null) {
    return "";
  } else {
    return Helpers.sanitizeEntityFullName(getValue(patternInput[0]));
  }
}
export function transformFile(com, state, implFiles, fileName) {
  try {
    let file;
    const fileName_1 = Path.normalizeFullPath(fileName);
    const matchValue = tryFind_1(fileName_1, implFiles);

    if (matchValue == null) {
      file = toFail(printf("File %s doesn't belong to parsed project %s"))(fileName_1, state.ProjectFile);
    } else {
      file = getValue(matchValue);
    }

    const fcom = new FableCompiler(com, state, fileName, implFiles);
    let patternInput_1;
    const fcom_1 = fcom;
    const patternInput = getRootModuleAndDecls(file.Declarations);

    if (patternInput[0] == null) {
      const emptyRootEnt = Entity.CreateRootModule(fileName);
      const ctx = Context.Create(fileName, emptyRootEnt);
      patternInput_1 = [emptyRootEnt, transformDeclarations(fcom_1, ctx, patternInput[1])];
    } else {
      const rootEnt = fcom_1.GetEntity(getValue(patternInput[0]));
      const ctx_1 = Context.Create(fileName, rootEnt);
      patternInput_1 = [rootEnt, transformDeclarations(fcom_1, ctx_1, patternInput[1])];
    }

    return new File(fileName, patternInput_1[0], patternInput_1[1], fcom.UsedVarNames, fcom.Dependencies);
  } catch (ex) {
    throw new Error(toText(printf("%s (%s)"))(ex.message, fileName), ex);
  }
}