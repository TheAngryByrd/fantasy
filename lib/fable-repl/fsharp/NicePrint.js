import { tupleL, listL, bufferL, spaceListL, op_MinusMinusMinus, semiListL, op_PlusPlus, op_AtAtMinusMinus, op_AtAt, aboveListL, showL, sepListL, WordL, commaListL, SepL, mkNav, op_MinusMinus, emptyL, wordL, leftL, rightL, TaggedTextOps, sepL, RightL, LeftL, op_HatHat, bracketL } from "./layout";
import { join, endsWith, printf, toText } from "../fable-core/String";
import { map2, exists, foldBack, sortWith, toList, forAll, item, last, fold } from "../fable-core/Seq";
import { valsOfBinds, isClassTy, isInterfaceTy, isStructTy, generalizeTyconRef, PartitionValTyparsForApparentEnclosingType, mkRefTupledTy, op_MinusMinusGreater, DisplayEnv, StripSelfRefCell, CollectTyparsNoCaching, freeInType, GetTopTauTypeInFSharpForm, isUnitTy, GetTypeOfMemberInFSharpForm, emptyTyparInst, PartitionValRefTypars, instType, tryDestTyparTy, PrettyTypes, tryDestOptionTy, SimplifyTypes, evalTupInfoIsStruct, reduceTyconRefMeasureableOrProvided, isDimensionless, ListMeasureConOccsWithNonZeroExponents, ListMeasureVarOccsWithNonZeroExponents, typeEquiv, TypeEquivEnv, traitsAEquiv, prefixOfRigidTypar, prefixOfStaticReq, HasFSharpAttribute, isRecdTy, isUnionTy, isStructRecordOrUnionTyconTy, IsMatchingFSharpAttribute, IsMatchingFSharpAttributeOpt, tcrefOfAppTy, GetFSharpViewOfReturnType, GetTypeOfMemberInMemberForm, $7C$EnumExpr$7C$_$7C$ as _EnumExpr___, $7C$AttribBitwiseOrExpr$7C$_$7C$ as _AttribBitwiseOrExpr___, $7C$TypeDefOfExpr$7C$_$7C$ as _TypeDefOfExpr___, $7C$TypeOfExpr$7C$_$7C$ as _TypeOfExpr___, isRefTy, TryFindILAttribute, trimPathByDisplayEnv, tagEntityRefName, isDelegateTy, isEnumTy } from "./TastOps";
import { MethInfo, ExistsHeadTypeInEntireHierarchy } from "./infos";
import { defaultArg, getValue } from "../fable-core/Option";
import { concat, mapIndexed, partition, groupBy, filter, choose, reverse, collect, map, ofArray, slice, append } from "../fable-core/List";
import List from "../fable-core/List";
import { Keywords } from "./lexhelp";
import { SR } from "../codegen/FSComp";
import { List as List_1, String as _String } from "../absil/illib";
import { ILTypeRef, mkILEvents, mkILProperties, mkILMethods, mkILFields, resolveILMethodRef, ILMemberAccess, ILThisConvention, ungenericizeTypeName, splitNamespace } from "../absil/il";
import { DemangleOperatorNameAsLayout, SplitNamesForILPath, DemangleOperatorName, IsMangledOpName } from "./PrettyNaming";
import { tryParse } from "../fable-core/Int32";
import { compare, comparePrimitives, toString } from "../fable-core/Util";
import { fromValue, fromNumber } from "../fable-core/Long";
import { System } from "../fcs-fable/adapters";
import { create } from "../fable-core/Set";
import Comparer from "../fable-core/Comparer";
import Choice from "../fable-core/Choice";
import { MemberKind } from "./ast";
import { ZmapModule } from "../absil/zmap";
import { ZsetModule } from "../absil/zset";
import { bufs, map1Of2, ListSet } from "./lib";
import { NegRational, OneRational, RationalToString, SignRational } from "./rational";
import { ModuleOrNamespaceKind, fullCompPathOfModuleOrNamespace, ModuleOrNamespaceExprWithSig, mkLocalTyconRef, TyparKind, arityOfVal, mkLocalValRef, mkTyparTy, ValReprInfoModule, typarEq, stripTyparEqns } from "./tast";
import { Error as _Error, errorR } from "./ErrorLogger";
import CurriedLambda from "../fable-core/CurriedLambda";
import { CheckFSharpAttributesForObsolete, CheckFSharpAttributesForHidden } from "./AttributeChecking";
export const PrintUtilities = function (__exports) {
  const bracketIfL = __exports.bracketIfL = function (x, lyt) {
    if (x) {
      return bracketL(lyt);
    } else {
      return lyt;
    }
  };

  const squareAngleL = __exports.squareAngleL = function (x) {
    return op_HatHat(LeftL.leftBracketAngle, op_HatHat(x, RightL.rightBracketAngle));
  };

  const angleL = __exports.angleL = function (x) {
    return op_HatHat(sepL(TaggedTextOps.Literals.leftAngle), op_HatHat(x, rightL(TaggedTextOps.Literals.rightAngle)));
  };

  const braceL = __exports.braceL = function (x) {
    return op_HatHat(leftL(TaggedTextOps.Literals.leftBrace), op_HatHat(x, rightL(TaggedTextOps.Literals.rightBrace)));
  };

  const comment = __exports.comment = function (str) {
    return wordL(TaggedTextOps.tagText(toText(printf("(* %s *)"))(str)));
  };

  const layoutsL = __exports.layoutsL = function (ls) {
    if (ls.tail != null) {
      if (ls.tail.tail == null) {
        return ls.head;
      } else {
        return fold(function (arg00_, arg10_) {
          return op_HatHat(arg00_, arg10_);
        }, ls.head, ls.tail);
      }
    } else {
      return emptyL;
    }
  };

  const suppressInheritanceAndInterfacesForTyInSimplifiedDisplays = __exports.suppressInheritanceAndInterfacesForTyInSimplifiedDisplays = function (g, amap, m, ty) {
    if ((isEnumTy(g, ty) ? true : isDelegateTy(g, ty)) ? true : ExistsHeadTypeInEntireHierarchy(g, amap, m, ty, g.exn_tcr)) {
      return true;
    } else {
      return ExistsHeadTypeInEntireHierarchy(g, amap, m, ty, g.tcref_System_Attribute);
    }
  };

  const applyMaxMembers = __exports.applyMaxMembers = function (maxMembers, alldecls) {
    const $var1 = maxMembers != null ? alldecls.length > getValue(maxMembers) ? [0, getValue(maxMembers)] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return append(function (list) {
          return slice(0, $var1[1] - 1, list);
        }(alldecls), ofArray([wordL(TaggedTextOps.tagPunctuation("..."))]));

      case 1:
        return alldecls;
    }
  };

  const adjustILName = __exports.adjustILName = function (n) {
    return Keywords.QuoteIdentifierIfNeeded(n);
  };

  const shrinkOverloads = __exports.shrinkOverloads = function (layoutFunction, resultFunction, group) {
    var matchValue;

    if (group.tail != null) {
      if (group.tail.tail == null) {
        return ofArray([resultFunction(group.head, layoutFunction(group.head))]);
      } else {
        return ofArray([resultFunction(group.head, op_MinusMinus(layoutFunction(group.head), leftL(TaggedTextOps.tagText((matchValue = group.tail.length | 0, matchValue === 1 ? SR.nicePrintOtherOverloads1() : SR.nicePrintOtherOverloadsN(matchValue))))))]);
      }
    } else {
      return new List();
    }
  };

  const layoutTyconRefImpl = __exports.layoutTyconRefImpl = function (isAttribute, denv, tcref) {
    let demangled;
    const name = denv.includeStaticParametersInTypeNames ? tcref.DisplayNameWithStaticParameters : tcref.DisplayName === tcref.DisplayNameWithStaticParameters ? tcref.DisplayName : tcref.DisplayName + "<...>";

    if (isAttribute ? endsWith(name, "Attribute") : false) {
      demangled = _String.dropSuffix(name, "Attribute");
    } else {
      demangled = name;
    }

    const tyconTextL = wordL(mkNav(tcref.DefinitionRange, tagEntityRefName(tcref, demangled)));

    if (denv.shortTypeNames) {
      return tyconTextL;
    } else {
      const path = tcref.CompilationPath.DemangledPath;
      const path_1 = denv.includeStaticParametersInTypeNames ? path : map(function (s) {
        const i = s.indexOf(",") | 0;

        if (i !== -1) {
          return s.substr(0, i) + "<...>";
        } else {
          return s;
        }
      }, path);
      const pathText = trimPathByDisplayEnv(denv, path_1);

      if (pathText === "") {
        return tyconTextL;
      } else {
        return op_HatHat(leftL(TaggedTextOps.tagUnknownEntity(pathText)), tyconTextL);
      }
    }
  };

  const layoutBuiltinAttribute = __exports.layoutBuiltinAttribute = function (denv, attrib) {
    const tcref = attrib.TyconRef;
    return squareAngleL(layoutTyconRefImpl(true, denv, tcref));
  };

  return __exports;
}({});

const PrintIL = function (__exports) {
  const fullySplitILTypeRef = __exports.fullySplitILTypeRef = function (tref) {
    return collect(function (arg00_) {
      return splitNamespace(arg00_);
    }, append(tref.Enclosing, ofArray([ungenericizeTypeName(tref.Name)])));
  };

  const layoutILTypeRefName = __exports.layoutILTypeRefName = function (denv, path) {
    let path_1;
    const $var2 = path.tail != null ? path.head === "System" ? path.tail.tail != null ? path.tail.head === "Void" ? path.tail.tail.tail == null ? [0] : [18] : path.tail.head === "Object" ? path.tail.tail.tail == null ? [1] : [18] : path.tail.head === "String" ? path.tail.tail.tail == null ? [2] : [18] : path.tail.head === "Single" ? path.tail.tail.tail == null ? [3] : [18] : path.tail.head === "Double" ? path.tail.tail.tail == null ? [4] : [18] : path.tail.head === "Decimal" ? path.tail.tail.tail == null ? [5] : [18] : path.tail.head === "Char" ? path.tail.tail.tail == null ? [6] : [18] : path.tail.head === "Byte" ? path.tail.tail.tail == null ? [7] : [18] : path.tail.head === "SByte" ? path.tail.tail.tail == null ? [8] : [18] : path.tail.head === "Int16" ? path.tail.tail.tail == null ? [9] : [18] : path.tail.head === "Int32" ? path.tail.tail.tail == null ? [10] : [18] : path.tail.head === "Int64" ? path.tail.tail.tail == null ? [11] : [18] : path.tail.head === "UInt16" ? path.tail.tail.tail == null ? [12] : [18] : path.tail.head === "UInt32" ? path.tail.tail.tail == null ? [13] : [18] : path.tail.head === "UInt64" ? path.tail.tail.tail == null ? [14] : [18] : path.tail.head === "IntPtr" ? path.tail.tail.tail == null ? [15] : [18] : path.tail.head === "UIntPtr" ? path.tail.tail.tail == null ? [16] : [18] : path.tail.head === "Boolean" ? path.tail.tail.tail == null ? [17] : [18] : [18] : [18] : [18] : [18];

    switch ($var2[0]) {
      case 0:
        path_1 = ofArray(["unit"]);
        break;

      case 1:
        path_1 = ofArray(["obj"]);
        break;

      case 2:
        path_1 = ofArray(["string"]);
        break;

      case 3:
        path_1 = ofArray(["float32"]);
        break;

      case 4:
        path_1 = ofArray(["float"]);
        break;

      case 5:
        path_1 = ofArray(["decimal"]);
        break;

      case 6:
        path_1 = ofArray(["char"]);
        break;

      case 7:
        path_1 = ofArray(["byte"]);
        break;

      case 8:
        path_1 = ofArray(["sbyte"]);
        break;

      case 9:
        path_1 = ofArray(["int16"]);
        break;

      case 10:
        path_1 = ofArray(["int"]);
        break;

      case 11:
        path_1 = ofArray(["int64"]);
        break;

      case 12:
        path_1 = ofArray(["uint16"]);
        break;

      case 13:
        path_1 = ofArray(["uint32"]);
        break;

      case 14:
        path_1 = ofArray(["uint64"]);
        break;

      case 15:
        path_1 = ofArray(["nativeint"]);
        break;

      case 16:
        path_1 = ofArray(["unativeint"]);
        break;

      case 17:
        path_1 = ofArray(["bool"]);
        break;

      case 18:
        path_1 = path;
        break;
    }

    const patternInput = List_1.frontAndBack(path_1);
    const tagged = (patternInput[1] === "obj" ? true : patternInput[1] === "string") ? TaggedTextOps.tagClass(patternInput[1]) : TaggedTextOps.tagStruct(patternInput[1]);

    if (denv.shortTypeNames) {
      return wordL(tagged);
    } else {
      return op_HatHat(leftL(TaggedTextOps.tagNamespace(trimPathByDisplayEnv(denv, patternInput[0]))), wordL(tagged));
    }
  };

  const layoutILTypeRef = __exports.layoutILTypeRef = function (denv, tref) {
    const path = fullySplitILTypeRef(tref);
    return layoutILTypeRefName(denv, path);
  };

  const adjustILMethodName = __exports.adjustILMethodName = function (n) {
    const demangleOperatorNameIfNeeded = function (s) {
      if (IsMangledOpName(s)) {
        return DemangleOperatorName(s);
      } else {
        return s;
      }
    };

    return demangleOperatorNameIfNeeded(Keywords.QuoteIdentifierIfNeeded(n));
  };

  const isStaticILEvent = __exports.isStaticILEvent = function (e) {
    if (e.AddMethod.CallingSignature.CallingConv.IsStatic) {
      return true;
    } else {
      return e.RemoveMethod.CallingSignature.CallingConv.IsStatic;
    }
  };

  const layoutILArrayShape = __exports.layoutILArrayShape = function (_arg1) {
    return op_HatHat(SepL.leftBracket, op_HatHat(wordL(TaggedTextOps.tagPunctuation(join("", map(function (_arg1_1) {
      return ",";
    }, _arg1.data.tail)))), RightL.rightBracket));
  };

  const layoutILGenericParameterDefs = __exports.layoutILGenericParameterDefs = function (ps) {
    return map(function (x) {
      return ($var3 => function (arg00_) {
        return wordL(arg00_);
      }(TaggedTextOps.tagTypeParameter($var3)))("'" + x.Name);
    }, ps);
  };

  const paramsL = __exports.paramsL = function (ps) {
    if (ps.tail == null) {
      return emptyL;
    } else {
      const body = commaListL(ps);
      return op_HatHat(SepL.leftAngle, op_HatHat(body, RightL.rightAngle));
    }
  };

  const pruneParms = __exports.pruneParms = function (className, ilTyparSubst) {
    let numParms;
    const rightMost = last(SplitNamesForILPath(className));
    const matchValue = tryParse(rightMost, 10, 0);

    if (matchValue[0]) {
      numParms = matchValue[1] | 0;
    } else {
      numParms = 0;
    }

    return reverse(function (l) {
      return List_1.take(numParms, l);
    }(reverse(ilTyparSubst)));
  };

  const layoutILType = __exports.layoutILType = function (denv, ilTyparSubst, typ) {
    layoutILType: while (true) {
      const $var4 = typ.tag === 1 ? [1] : typ.tag === 2 ? [2, typ.data] : typ.tag === 3 ? [2, typ.data] : typ.tag === 4 ? [3, typ.data] : typ.tag === 5 ? [3, typ.data] : typ.tag === 6 ? [4] : typ.tag === 7 ? [5] : typ.tag === 8 ? [6] : [0];

      switch ($var4[0]) {
        case 0:
          return WordL.structUnit;

        case 1:
          return op_HatHat(layoutILType(denv, ilTyparSubst, typ.data[1]), layoutILArrayShape(typ.data[0]));

        case 2:
          return op_HatHat(layoutILTypeRef(denv, $var4[1].TypeRef), paramsL(map(function (typ_1) {
            return layoutILType(denv, ilTyparSubst, typ_1);
          }, $var4[1].GenericArgs)));

        case 3:
          denv = denv;
          ilTyparSubst = ilTyparSubst;
          typ = $var4[1];
          continue layoutILType;

        case 4:
          return layoutILCallingSignature(denv, ilTyparSubst, null, typ.data);

        case 5:
          return item(~~typ.data, ilTyparSubst);

        case 6:
          denv = denv;
          ilTyparSubst = ilTyparSubst;
          typ = typ.data[2];
          continue layoutILType;
      }
    }
  };

  const layoutILCallingSignature = __exports.layoutILCallingSignature = function (denv, ilTyparSubst, cons, signatur) {
    const args = map(function (typ) {
      return layoutILType(denv, ilTyparSubst, typ);
    }, signatur.ArgTypes);
    const res = cons == null ? function (typ_1) {
      return layoutILType(denv, ilTyparSubst, typ_1);
    }(signatur.ReturnType) : op_HatHat(layoutILTypeRefName(denv, SplitNamesForILPath(ungenericizeTypeName(getValue(cons)))), paramsL(pruneParms(getValue(cons), ilTyparSubst)));

    if (args.tail != null) {
      if (args.tail.tail == null) {
        return op_HatHat(args.head, op_HatHat(WordL.arrow, res));
      } else {
        return op_HatHat(sepListL(WordL.star, args), op_HatHat(WordL.arrow, res));
      }
    } else {
      return op_HatHat(WordL.structUnit, op_HatHat(WordL.arrow, res));
    }
  };

  const layoutILParameter = __exports.layoutILParameter = function (denv, ilTyparSubst, p) {
    let preL;
    const isParamArray = TryFindILAttribute(denv.g.attrib_ParamArrayAttribute, p.CustomAttrs);
    const matchValue = [isParamArray, p.Name, p.IsOptional];

    if (matchValue[1] == null) {
      preL = LeftL.colon;
    } else if (matchValue[2]) {
      preL = op_HatHat(LeftL.questionMark, op_HatHat(sepL(TaggedTextOps.tagParameter(getValue(matchValue[1]))), SepL.colon));
    } else if (matchValue[0]) {
      preL = op_HatHat(PrintUtilities.layoutBuiltinAttribute(denv, denv.g.attrib_ParamArrayAttribute), op_HatHat(wordL(TaggedTextOps.tagParameter(getValue(matchValue[1]))), SepL.colon));
    } else {
      preL = op_HatHat(leftL(TaggedTextOps.tagParameter(getValue(matchValue[1]))), SepL.colon);
    }

    return op_HatHat(preL, layoutILType(denv, ilTyparSubst, p.Type));
  };

  const layoutILParameters = __exports.layoutILParameters = function (denv, ilTyparSubst, cons, parameters, retType) {
    const res = cons == null ? function (typ) {
      return layoutILType(denv, ilTyparSubst, typ);
    }(retType) : op_HatHat(layoutILTypeRefName(denv, SplitNamesForILPath(ungenericizeTypeName(getValue(cons)))), paramsL(pruneParms(getValue(cons), ilTyparSubst)));

    if (parameters.tail != null) {
      if (parameters.tail.tail == null) {
        return op_HatHat(layoutILParameter(denv, ilTyparSubst, parameters.head), op_HatHat(WordL.arrow, res));
      } else {
        return op_HatHat(sepListL(WordL.star, map(function (p) {
          return layoutILParameter(denv, ilTyparSubst, p);
        }, parameters)), op_HatHat(WordL.arrow, res));
      }
    } else {
      return op_HatHat(WordL.structUnit, op_HatHat(WordL.arrow, res));
    }
  };

  const layoutILMethodDef = __exports.layoutILMethodDef = function (denv, ilTyparSubst, className, m) {
    const myParms = layoutILGenericParameterDefs(m.GenericParams);
    const ilTyparSubst_1 = append(ilTyparSubst, myParms);
    const name = adjustILMethodName(m.Name);
    const patternInput = m.IsConstructor ? [WordL.keywordNew, className] : m.IsStatic ? [op_HatHat(WordL.keywordStatic, op_HatHat(WordL.keywordMember, op_HatHat(wordL(TaggedTextOps.tagMethod(name)), paramsL(myParms)))), null] : [op_HatHat(WordL.keywordMember, op_HatHat(wordL(TaggedTextOps.tagMethod(name)), paramsL(myParms))), null];

    const signaturL = function (tupledArg) {
      return layoutILParameters(denv, ilTyparSubst_1, patternInput[1], tupledArg[0], tupledArg[1]);
    }([m.Parameters, m.Return.Type]);

    return op_HatHat(patternInput[0], op_HatHat(WordL.colon, signaturL));
  };

  const layoutILFieldDef = __exports.layoutILFieldDef = function (denv, ilTyparSubst, f) {
    const staticL = f.IsStatic ? WordL.keywordStatic : emptyL;
    const name = PrintUtilities.adjustILName(f.Name);
    const nameL = wordL(TaggedTextOps.tagField(name));
    const typL = layoutILType(denv, ilTyparSubst, f.FieldType);
    return op_HatHat(staticL, op_HatHat(WordL.keywordVal, op_HatHat(nameL, op_HatHat(WordL.colon, typL))));
  };

  const layoutILEventDef = __exports.layoutILEventDef = function (denv, ilTyparSubst, e) {
    const staticL = isStaticILEvent(e) ? WordL.keywordStatic : emptyL;
    const name = PrintUtilities.adjustILName(e.Name);
    const nameL = wordL(TaggedTextOps.tagEvent(name));
    let typL;
    const matchValue = e.EventType;

    if (matchValue != null) {
      typL = layoutILType(denv, ilTyparSubst, getValue(matchValue));
    } else {
      typL = emptyL;
    }

    return op_HatHat(staticL, op_HatHat(WordL.keywordEvent, op_HatHat(nameL, op_HatHat(WordL.colon, typL))));
  };

  const layoutILPropertyDef = __exports.layoutILPropertyDef = function (denv, ilTyparSubst, p) {
    const staticL = p.CallingConv.Equals(new ILThisConvention(2)) ? WordL.keywordStatic : emptyL;
    const name = PrintUtilities.adjustILName(p.Name);
    const nameL = wordL(TaggedTextOps.tagProperty(name));

    const layoutGetterType = function (getterRef) {
      if (getterRef.ArgTypes.tail == null) {
        return layoutILType(denv, ilTyparSubst, getterRef.ReturnType);
      } else {
        return layoutILCallingSignature(denv, ilTyparSubst, null, getterRef.CallingSignature);
      }
    };

    const layoutSetterType = function (setterRef) {
      const argTypes = setterRef.ArgTypes;

      if (argTypes.tail == null) {
        return emptyL;
      } else {
        const patternInput = List_1.frontAndBack(argTypes);

        const argsL = function (arg10_) {
          return sepListL(WordL.star, arg10_);
        }(map(function (typ) {
          return layoutILType(denv, ilTyparSubst, typ);
        }, patternInput[0]));

        return op_HatHat(argsL, op_HatHat(WordL.arrow, layoutILType(denv, ilTyparSubst, patternInput[1])));
      }
    };

    let typL;
    const matchValue = [p.GetMethod, p.SetMethod];

    if (matchValue[0] != null) {
      const getterRef_1 = getValue(matchValue[0]);
      typL = layoutGetterType(getterRef_1);
    } else if (matchValue[1] != null) {
      const setterRef_1 = getValue(matchValue[1]);
      typL = layoutSetterType(setterRef_1);
    } else {
      typL = layoutILType(denv, ilTyparSubst, p.PropertyType);
    }

    let specGetSetL;
    const matchValue_1 = [p.GetMethod, p.SetMethod];
    const $var5 = matchValue_1[0] != null ? matchValue_1[1] != null ? [2] : [0] : matchValue_1[1] != null ? [1] : [0];

    switch ($var5[0]) {
      case 0:
        specGetSetL = emptyL;
        break;

      case 1:
        specGetSetL = op_HatHat(WordL.keywordWith, WordL.keywordSet);
        break;

      case 2:
        specGetSetL = op_HatHat(WordL.keywordWith, op_HatHat(WordL.keywordGet, op_HatHat(RightL.comma, WordL.keywordSet)));
        break;
    }

    return op_HatHat(staticL, op_HatHat(WordL.keywordMember, op_HatHat(nameL, op_HatHat(WordL.colon, op_HatHat(typL, specGetSetL)))));
  };

  const layoutILFieldInit = __exports.layoutILFieldInit = function (x) {
    var copyOfStruct;
    let textOpt;

    if (x == null) {
      textOpt = null;
    } else {
      switch (getValue(x).tag) {
        case 1:
          if (getValue(x).data) {
            textOpt = TaggedTextOps.Literals.keywordTrue;
          } else {
            textOpt = TaggedTextOps.Literals.keywordFalse;
          }

          break;

        case 2:
          textOpt = ($var6 => function (arg0) {
            return arg0;
          }(TaggedTextOps.tagStringLiteral($var6)))("'" + (copyOfStruct = String.fromCharCode(getValue(x).data), toString(copyOfStruct)) + "'");

          break;

        case 3:
          textOpt = ($var7 => function (arg0_1) {
            return arg0_1;
          }(TaggedTextOps.tagNumericLiteral($var7)))(getValue(x).data.toString() + "y");

          break;

        case 4:
          textOpt = ($var8 => function (arg0_2) {
            return arg0_2;
          }(TaggedTextOps.tagNumericLiteral($var8)))(getValue(x).data.toString() + "s");

          break;

        case 5:
          textOpt = ($var10 => function (arg0_3) {
            return arg0_3;
          }(($var9 => TaggedTextOps.tagNumericLiteral(function (value) {
            return value.toString();
          }($var9)))($var10)))(getValue(x).data);

          break;

        case 6:
          textOpt = ($var11 => function (arg0_4) {
            return arg0_4;
          }(TaggedTextOps.tagNumericLiteral($var11)))(getValue(x).data.toString() + "L");

          break;

        case 7:
          textOpt = ($var12 => function (arg0_5) {
            return arg0_5;
          }(TaggedTextOps.tagNumericLiteral($var12)))((~~getValue(x).data).toString() + "uy");

          break;

        case 8:
          textOpt = ($var13 => function (arg0_6) {
            return arg0_6;
          }(TaggedTextOps.tagNumericLiteral($var13)))((~~getValue(x).data).toString() + "us");

          break;

        case 9:
          textOpt = ($var14 => function (arg0_7) {
            return arg0_7;
          }(TaggedTextOps.tagNumericLiteral($var14)))(fromNumber(getValue(x).data, false).toString() + "u");

          break;

        case 10:
          textOpt = ($var15 => function (arg0_8) {
            return arg0_8;
          }(TaggedTextOps.tagNumericLiteral($var15)))(fromValue(getValue(x).data).toString() + "UL");

          break;

        case 11:
          const s = getValue(x).data.toString();
          const s_1 = forAll(function (c) {
            return System.Char.IsDigit(c) ? true : c === "-";
          }, s) ? s + ".0" : s;

          textOpt = ($var16 => function (arg0_9) {
            return arg0_9;
          }(TaggedTextOps.tagNumericLiteral($var16)))(s_1 + "f");

          break;

        case 12:
          const s_2 = getValue(x).data.toString();
          const s_3 = forAll(function (c_1) {
            return System.Char.IsDigit(c_1) ? true : c_1 === "-";
          }, s_2) ? s_2 + ".0" : s_2;

          textOpt = ($var17 => function (arg0_10) {
            return arg0_10;
          }(TaggedTextOps.tagNumericLiteral($var17)))(s_3);

          break;

        default:
          textOpt = null;
      }
    }

    if (textOpt != null) {
      return op_HatHat(WordL.equals, wordL(getValue(textOpt)));
    } else {
      return op_HatHat(WordL.equals, PrintUtilities.comment("value unavailable"));
    }
  };

  const layoutILEnumDefParts = __exports.layoutILEnumDefParts = function (nm, litVal) {
    return op_HatHat(WordL.bar, op_HatHat(wordL(TaggedTextOps.tagEnum(PrintUtilities.adjustILName(nm))), layoutILFieldInit(litVal)));
  };

  const layoutILEnumDef = __exports.layoutILEnumDef = function (f) {
    return layoutILEnumDefParts(f.Name, f.LiteralValue);
  };

  const isStaticILProperty = __exports.isStaticILProperty = function (p) {
    const matchValue = [p.GetMethod, p.SetMethod];

    if (matchValue[0] == null) {
      if (matchValue[1] == null) {
        return true;
      } else {
        const setter = getValue(matchValue[1]);
        return setter.CallingSignature.CallingConv.IsStatic;
      }
    } else {
      const getter = getValue(matchValue[0]);
      return getter.CallingSignature.CallingConv.IsStatic;
    }
  };

  const isPublicILMethod = __exports.isPublicILMethod = function (m) {
    return m.Access.Equals(new ILMemberAccess(5));
  };

  const isPublicILEvent = __exports.isPublicILEvent = function (typeDef, e) {
    try {
      if (isPublicILMethod(resolveILMethodRef(typeDef, e.AddMethod))) {
        return isPublicILMethod(resolveILMethodRef(typeDef, e.RemoveMethod));
      } else {
        return false;
      }
    } catch (matchValue) {
      return false;
    }
  };

  const isPublicILProperty = __exports.isPublicILProperty = function (typeDef, m) {
    try {
      const matchValue = m.GetMethod;

      if (matchValue == null) {
        const matchValue_1 = m.SetMethod;

        if (matchValue_1 != null) {
          return isPublicILMethod(resolveILMethodRef(typeDef, getValue(matchValue_1)));
        } else {
          return false;
        }
      } else {
        return isPublicILMethod(resolveILMethodRef(typeDef, getValue(matchValue)));
      }
    } catch (matchValue_2) {
      return false;
    }
  };

  const isPublicILCtor = __exports.isPublicILCtor = function (m) {
    if (m.Access.Equals(new ILMemberAccess(5))) {
      return m.IsConstructor;
    } else {
      return false;
    }
  };

  const isNotSpecialName = __exports.isNotSpecialName = function (m) {
    return !m.IsSpecialName;
  };

  const isPublicILField = __exports.isPublicILField = function (f) {
    return f.Access.Equals(new ILMemberAccess(5));
  };

  const isPublicILTypeDef = __exports.isPublicILTypeDef = function (c) {
    const matchValue = c.Access;
    const $var18 = matchValue.tag === 0 ? [0] : matchValue.tag === 2 ? matchValue.data.tag === 5 ? [0] : [1] : [1];

    switch ($var18[0]) {
      case 0:
        return true;

      case 1:
        return false;
    }
  };

  const isShowEnumField = __exports.isShowEnumField = function (f) {
    return f.Name !== "value__";
  };

  const noShow = __exports.noShow = create(ofArray(["System.Object", "Object", "System.ValueType", "ValueType", "obj"]), new Comparer(comparePrimitives));

  const isShowBase = __exports.isShowBase = function (n) {
    return !noShow.has(showL(n));
  };

  const layoutILTypeDef = __exports.layoutILTypeDef = function (denv, typeDef) {
    const ilTyparSubst = layoutILGenericParameterDefs(typeDef.GenericParams);

    const renderL = function (pre, body, post) {
      if (pre == null) {
        return aboveListL(body);
      } else if (body.tail == null) {
        return emptyL;
      } else {
        return op_AtAt(op_AtAtMinusMinus(getValue(pre), aboveListL(body)), post);
      }
    };

    if ((typeDef.IsClass ? true : typeDef.IsStruct) ? true : typeDef.IsInterface) {
      const pre_1 = typeDef.IsStruct ? WordL.keywordStruct : null;
      let baseT;
      const matchValue = typeDef.Extends;

      if (matchValue == null) {
        if (typeDef.IsInterface) {
          baseT = choose(function (b) {
            const baseName = layoutILType(denv, ilTyparSubst, b);

            if (isShowBase(baseName)) {
              return op_HatHat(WordL.keywordInherit, baseName);
            } else {
              return null;
            }
          }, typeDef.Implements);
        } else {
          baseT = new List();
        }
      } else {
        const baseName_1 = layoutILType(denv, ilTyparSubst, getValue(matchValue));

        if (isShowBase(baseName_1)) {
          baseT = ofArray([op_HatHat(WordL.keywordInherit, baseName_1)]);
        } else {
          baseT = new List();
        }
      }

      const memberBlockLs = function (tupledArg) {
        var className;
        const ctors = PrintUtilities.shrinkOverloads((className = typeDef.Name, function (m) {
          return layoutILMethodDef(denv, ilTyparSubst, className, m);
        }), function (_arg1, xL) {
          return xL;
        }, toList(sortWith(($var19, $var20) => compare(function (md) {
          return md.Parameters.length;
        }($var19), function (md) {
          return md.Parameters.length;
        }($var20)), function (list) {
          return filter(function (m_1) {
            return isPublicILCtor(m_1);
          }, list);
        }(tupledArg[1].AsList))));
        const fields = map(function (f) {
          return layoutILFieldDef(denv, ilTyparSubst, f);
        }, function (list_1) {
          return filter(function (f_1) {
            return isPublicILField(f_1);
          }, list_1);
        }(tupledArg[0].AsList));
        const props = map(function (pd) {
          return [[pd.Name, pd.Args.length], layoutILPropertyDef(denv, ilTyparSubst, pd)];
        }, filter(function (m_2) {
          return isPublicILProperty(typeDef, m_2);
        }, tupledArg[2].AsList));
        const events = map(function (e) {
          return layoutILEventDef(denv, ilTyparSubst, e);
        }, filter(function (e_1) {
          return isPublicILEvent(typeDef, e_1);
        }, tupledArg[3].AsList));
        const meths = collect(function (tupledArg_1) {
          return PrintUtilities.shrinkOverloads($var21 => {
            var className_1;
            return (className_1 = typeDef.Name, function (m_3) {
              return layoutILMethodDef(denv, ilTyparSubst, className_1, m_3);
            })(function (tuple) {
              return tuple[1];
            }($var21));
          }, function (x, xL_1) {
            return [x[0], xL_1];
          }, toList(sortWith(($var22, $var23) => compare(function (tuple_1) {
            return tuple_1[0];
          }($var22), function (tuple_1) {
            return tuple_1[0];
          }($var23)), tupledArg_1[1])));
        }, groupBy($var24 => $var24[0][0], map(function (md_1) {
          return [[md_1.Name, md_1.Parameters.length], md_1];
        }, function (list_2) {
          return filter(function (m_4) {
            return isNotSpecialName(m_4);
          }, list_2);
        }(function (list_3) {
          return filter(function (m_5) {
            return isPublicILMethod(m_5);
          }, list_3);
        }(tupledArg[1].AsList)))));
        const members = map(function (tuple_2) {
          return tuple_2[1];
        }, toList(sortWith(($var25, $var26) => compare(function (tuple_3) {
          return tuple_3[0];
        }($var25), function (tuple_3) {
          return tuple_3[0];
        }($var26)), append(props, meths))));
        return append(ctors, append(fields, append(members, events)));
      };

      const bodyStatic = memberBlockLs([mkILFields(filter(function (fd) {
        return fd.IsStatic;
      }, typeDef.Fields.AsList)), mkILMethods(filter(function (md_2) {
        return md_2.IsStatic;
      }, typeDef.Methods.AsList)), mkILProperties(filter(function (pd_1) {
        return isStaticILProperty(pd_1);
      }, typeDef.Properties.AsList)), mkILEvents(filter(function (ed) {
        return isStaticILEvent(ed);
      }, typeDef.Events.AsList))]);
      const bodyInstance = memberBlockLs([mkILFields(filter(function (fd_1) {
        return !fd_1.IsStatic;
      }, typeDef.Fields.AsList)), mkILMethods(filter(function (md_3) {
        return !md_3.IsStatic;
      }, typeDef.Methods.AsList)), mkILProperties(filter(function (pd_2) {
        return !isStaticILProperty(pd_2);
      }, typeDef.Properties.AsList)), mkILEvents(filter(function (ed_1) {
        return !isStaticILEvent(ed_1);
      }, typeDef.Events.AsList))]);
      const body_1 = append(bodyInstance, bodyStatic);
      const body_2 = PrintUtilities.applyMaxMembers(denv.maxMembers, body_1);
      const types = map(function (typeDef_1) {
        return layoutILNestedClassDef(denv, typeDef_1);
      }, toList(sortWith(($var27, $var28) => compare(function (t) {
        return PrintUtilities.adjustILName(t.Name);
      }($var27), function (t) {
        return PrintUtilities.adjustILName(t.Name);
      }($var28)), function (list_4) {
        return filter(function (c) {
          return isPublicILTypeDef(c);
        }, list_4);
      }(typeDef.NestedTypes.AsList))));
      const post_1 = WordL.keywordEnd;
      return renderL(pre_1, append(baseT, append(body_2, types)), post_1);
    } else if (typeDef.IsEnum) {
      const fldsL = PrintUtilities.applyMaxMembers(denv.maxMembers, function (list_5) {
        return map(function (f_2) {
          return layoutILEnumDef(f_2);
        }, list_5);
      }(function (list_6) {
        return filter(function (f_3) {
          return isShowEnumField(f_3);
        }, list_6);
      }(typeDef.Fields.AsList)));
      return renderL(null, fldsL, emptyL);
    } else {
      let rhs;
      const matchValue_1 = filter(function (m_6) {
        return m_6.Name === "Invoke";
      }, typeDef.Methods.AsList);

      if (matchValue_1.tail != null) {
        rhs = layoutILCallingSignature(denv, ilTyparSubst, null, matchValue_1.head.CallingSignature);
      } else {
        rhs = PrintUtilities.comment("`Invoke` method could not be found");
      }

      return op_HatHat(WordL.keywordDelegate, op_HatHat(WordL.keywordOf, rhs));
    }
  };

  const layoutILNestedClassDef = __exports.layoutILNestedClassDef = function (denv, typeDef) {
    const name = PrintUtilities.adjustILName(typeDef.Name);
    const nameL = wordL(TaggedTextOps.tagClass(name));
    const ilTyparSubst = layoutILGenericParameterDefs(typeDef.GenericParams);
    const paramsL_1 = paramsL(pruneParms(typeDef.Name, ilTyparSubst));

    if (denv.suppressNestedTypes) {
      return op_HatHat(WordL.keywordNested, op_HatHat(WordL.keywordType, op_HatHat(nameL, paramsL_1)));
    } else {
      const pre = op_HatHat(WordL.keywordNested, op_HatHat(WordL.keywordType, op_HatHat(nameL, paramsL_1)));
      const body = layoutILTypeDef(denv, typeDef);
      return op_AtAtMinusMinus(op_HatHat(pre, WordL.equals), body);
    }
  };

  return __exports;
}({});

const PrintTypes = function (__exports) {
  const layoutConst = __exports.layoutConst = function (g, ty, c) {
    var s;
    let str;

    switch (c.tag) {
      case 1:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "y");
        break;

      case 2:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "uy");
        break;

      case 3:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "s");
        break;

      case 4:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "us");
        break;

      case 5:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString());
        break;

      case 6:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "u");
        break;

      case 7:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "L");
        break;

      case 8:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "UL");
        break;

      case 9:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "n");
        break;

      case 10:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "un");
        break;

      case 11:
        str = TaggedTextOps.tagNumericLiteral((s = c.data.toString(), forAll(function (c_1) {
          return System.Char.IsDigit(c_1) ? true : c_1 === "-";
        }, s) ? s + ".0" : s) + "f");
        break;

      case 12:
        const s_1 = c.data.toString();
        str = TaggedTextOps.tagNumericLiteral(forAll(function (c_2) {
          return System.Char.IsDigit(c_2) ? true : c_2 === "-";
        }, s_1) ? s_1 + ".0" : s_1);
        break;

      case 13:
        str = TaggedTextOps.tagStringLiteral("'" + toString(c.data) + "'");
        break;

      case 14:
        str = TaggedTextOps.tagNumericLiteral("\"" + c.data + "\"");
        break;

      case 16:
        str = TaggedTextOps.tagPunctuation("()");
        break;

      case 15:
        str = TaggedTextOps.tagNumericLiteral(c.data.toString() + "M");
        break;

      case 17:
        str = TaggedTextOps.tagKeyword(isRefTy(g, ty) ? "null" : "default");
        break;

      default:
        if (c.data) {
          str = TaggedTextOps.Literals.keywordTrue;
        } else {
          str = TaggedTextOps.Literals.keywordFalse;
        }

    }

    return wordL(str);
  };

  const layoutAccessibility = __exports.layoutAccessibility = function (denv, accessibility, itemL) {
    const isInternalCompPath = function (x) {
      const $var29 = x.data[0].tag === 0 ? x.data[1].tail == null ? [0] : [1] : [1];

      switch ($var29[0]) {
        case 0:
          return true;

        case 1:
          return false;
      }
    };

    const _Public_Internal_Private_ = function (_arg1) {
      if (_arg1.data.tail == null) {
        return new Choice(0, null);
      } else if (forAll(isInternalCompPath, _arg1.data)) {
        return new Choice(1, null);
      } else {
        return new Choice(2, null);
      }
    };

    const matchValue = [denv.contextAccessibility, accessibility];
    let $var30;

    const activePatternResult33111 = _Public_Internal_Private_(matchValue[0]);

    if (activePatternResult33111.tag === 0) {
      const activePatternResult33112 = _Public_Internal_Private_(matchValue[1]);

      if (activePatternResult33112.tag === 1) {
        $var30 = [0];
      } else if (activePatternResult33112.tag === 2) {
        $var30 = [1];
      } else {
        $var30 = [3];
      }
    } else if (activePatternResult33111.tag === 1) {
      const activePatternResult33113 = _Public_Internal_Private_(matchValue[1]);

      if (activePatternResult33113.tag === 2) {
        $var30 = [2];
      } else {
        $var30 = [3];
      }
    } else {
      $var30 = [3];
    }

    switch ($var30[0]) {
      case 0:
        return op_PlusPlus(WordL.keywordInternal, itemL);

      case 1:
        return op_PlusPlus(WordL.keywordPrivate, itemL);

      case 2:
        return op_PlusPlus(WordL.keywordPrivate, itemL);

      case 3:
        return itemL;
    }
  };

  const layoutTyconRef = __exports.layoutTyconRef = function (denv, tycon) {
    return PrintUtilities.layoutTyconRefImpl(false, denv, tycon);
  };

  const layoutMemberFlags = __exports.layoutMemberFlags = function (memFlags) {
    const stat = (memFlags.IsInstance ? true : memFlags.MemberKind.Equals(new MemberKind(1))) ? emptyL : WordL.keywordStatic;
    const stat_1 = memFlags.IsDispatchSlot ? op_PlusPlus(stat, WordL.keywordAbstract) : memFlags.IsOverrideOrExplicitImpl ? op_PlusPlus(stat, WordL.keywordOverride) : stat;
    let stat_2;

    if (memFlags.IsOverrideOrExplicitImpl) {
      stat_2 = stat_1;
    } else {
      switch (memFlags.MemberKind.tag) {
        case 1:
        case 5:
          stat_2 = stat_1;
          break;

        case 2:
        case 3:
        case 4:
          stat_2 = op_PlusPlus(stat_1, WordL.keywordMember);
          break;

        default:
          stat_2 = stat_1;
      }
    }

    return stat_2;
  };

  const layoutAttribArg = __exports.layoutAttribArg = function (denv, arg) {
    let $var31;

    if (arg.tag === 0) {
      $var31 = [0, arg.data[0], arg.data[2]];
    } else if (arg.tag === 11) {
      if (arg.data[0].tag === 3) {
        if (arg.data[1].tail != null) {
          if (arg.data[1].tail.tail == null) {
            $var31 = [1, arg.data[1].head, arg.data[2]];
          } else {
            const activePatternResult33133 = function (arg10__9) {
              return _TypeOfExpr___(denv.g, arg10__9);
            }(arg);

            if (activePatternResult33133 != null) {
              $var31 = [2, getValue(activePatternResult33133)];
            } else {
              $var31 = [3];
            }
          }
        } else {
          const activePatternResult33134 = function (arg10__10) {
            return _TypeOfExpr___(denv.g, arg10__10);
          }(arg);

          if (activePatternResult33134 != null) {
            $var31 = [2, getValue(activePatternResult33134)];
          } else {
            $var31 = [3];
          }
        }
      } else {
        const activePatternResult33135 = function (arg10__11) {
          return _TypeOfExpr___(denv.g, arg10__11);
        }(arg);

        if (activePatternResult33135 != null) {
          $var31 = [2, getValue(activePatternResult33135)];
        } else {
          $var31 = [3];
        }
      }
    } else {
      const activePatternResult33136 = function (arg10__12) {
        return _TypeOfExpr___(denv.g, arg10__12);
      }(arg);

      if (activePatternResult33136 != null) {
        $var31 = [2, getValue(activePatternResult33136)];
      } else {
        $var31 = [3];
      }
    }

    switch ($var31[0]) {
      case 0:
        if (isEnumTy(denv.g, $var31[2])) {
          return op_HatHat(WordL.keywordEnum, op_HatHat(PrintUtilities.angleL(layoutType(denv, $var31[2])), bracketL(layoutConst(denv.g, $var31[2], $var31[1]))));
        } else {
          return layoutConst(denv.g, $var31[2], $var31[1]);
        }

      case 1:
        return op_HatHat(LeftL.leftBracketBar, op_HatHat(semiListL(map(function (arg_1) {
          return layoutAttribArg(denv, arg_1);
        }, $var31[2])), RightL.rightBracketBar));

      case 2:
        return op_HatHat(LeftL.keywordTypeof, op_HatHat(wordL(TaggedTextOps.tagPunctuation("<")), op_HatHat(layoutType(denv, $var31[1]), rightL(TaggedTextOps.tagPunctuation(">")))));

      case 3:
        const activePatternResult33131 = function (arg10_) {
          return _TypeDefOfExpr___(denv.g, arg10_);
        }(arg);

        if (activePatternResult33131 != null) {
          return op_HatHat(LeftL.keywordTypedefof, op_HatHat(wordL(TaggedTextOps.tagPunctuation("<")), op_HatHat(layoutType(denv, getValue(activePatternResult33131)), rightL(TaggedTextOps.tagPunctuation(">")))));
        } else {
          let $var32;

          if (arg.tag === 11) {
            if (arg.data[0].tag === 24) {
              if (arg.data[1].tail != null) {
                if (arg.data[1].tail.tail != null) {
                  if (arg.data[1].tail.tail.tail == null) {
                    if (arg.data[2].tail != null) {
                      if (arg.data[2].tail.tail == null) {
                        $var32 = [0, arg.data[2].head, arg.data[1].head];
                      } else {
                        const activePatternResult33123 = function (arg10__2) {
                          return _AttribBitwiseOrExpr___(denv.g, arg10__2);
                        }(arg);

                        if (activePatternResult33123 != null) {
                          $var32 = [1, getValue(activePatternResult33123)[0], getValue(activePatternResult33123)[1]];
                        } else {
                          $var32 = [2];
                        }
                      }
                    } else {
                      const activePatternResult33124 = function (arg10__3) {
                        return _AttribBitwiseOrExpr___(denv.g, arg10__3);
                      }(arg);

                      if (activePatternResult33124 != null) {
                        $var32 = [1, getValue(activePatternResult33124)[0], getValue(activePatternResult33124)[1]];
                      } else {
                        $var32 = [2];
                      }
                    }
                  } else {
                    const activePatternResult33125 = function (arg10__4) {
                      return _AttribBitwiseOrExpr___(denv.g, arg10__4);
                    }(arg);

                    if (activePatternResult33125 != null) {
                      $var32 = [1, getValue(activePatternResult33125)[0], getValue(activePatternResult33125)[1]];
                    } else {
                      $var32 = [2];
                    }
                  }
                } else {
                  const activePatternResult33126 = function (arg10__5) {
                    return _AttribBitwiseOrExpr___(denv.g, arg10__5);
                  }(arg);

                  if (activePatternResult33126 != null) {
                    $var32 = [1, getValue(activePatternResult33126)[0], getValue(activePatternResult33126)[1]];
                  } else {
                    $var32 = [2];
                  }
                }
              } else {
                const activePatternResult33127 = function (arg10__6) {
                  return _AttribBitwiseOrExpr___(denv.g, arg10__6);
                }(arg);

                if (activePatternResult33127 != null) {
                  $var32 = [1, getValue(activePatternResult33127)[0], getValue(activePatternResult33127)[1]];
                } else {
                  $var32 = [2];
                }
              }
            } else {
              const activePatternResult33128 = function (arg10__7) {
                return _AttribBitwiseOrExpr___(denv.g, arg10__7);
              }(arg);

              if (activePatternResult33128 != null) {
                $var32 = [1, getValue(activePatternResult33128)[0], getValue(activePatternResult33128)[1]];
              } else {
                $var32 = [2];
              }
            }
          } else {
            const activePatternResult33129 = function (arg10__8) {
              return _AttribBitwiseOrExpr___(denv.g, arg10__8);
            }(arg);

            if (activePatternResult33129 != null) {
              $var32 = [1, getValue(activePatternResult33129)[0], getValue(activePatternResult33129)[1]];
            } else {
              $var32 = [2];
            }
          }

          switch ($var32[0]) {
            case 0:
              return op_HatHat(leftL(TaggedTextOps.tagPunctuation("(")), op_HatHat(layoutAttribArg(denv, $var32[1]), op_HatHat(wordL(TaggedTextOps.tagPunctuation(":>")), op_HatHat(layoutType(denv, $var32[2]), rightL(TaggedTextOps.tagPunctuation(")"))))));

            case 1:
              return op_HatHat(layoutAttribArg(denv, $var32[1]), op_HatHat(wordL(TaggedTextOps.tagPunctuation("|||")), layoutAttribArg(denv, $var32[2])));

            case 2:
              const activePatternResult33121 = function (arg10__1) {
                return _EnumExpr___(denv.g, arg10__1);
              }(arg);

              if (activePatternResult33121 != null) {
                return op_PlusPlus(WordL.keywordEnum, bracketL(layoutAttribArg(denv, getValue(activePatternResult33121))));
              } else {
                return PrintUtilities.comment("(* unsupported attribute argument *)");
              }

          }
        }

    }
  };

  const layoutAttribArgs = __exports.layoutAttribArgs = function (denv, args) {
    return sepListL(rightL(TaggedTextOps.tagPunctuation(",")), map(function (_arg1) {
      return layoutAttribArg(denv, _arg1.data[0]);
    }, args));
  };

  const layoutAttrib = __exports.layoutAttrib = function (denv, _arg1) {
    const argsL = bracketL(layoutAttribArgs(denv, _arg1.data[2]));

    if (_arg1.data[1].tag === 1) {
      const patternInput = GetTypeOfMemberInMemberForm(denv.g, _arg1.data[1].data);
      const rty = GetFSharpViewOfReturnType(denv.g, patternInput[2]);
      const tcref = tcrefOfAppTy(denv.g, rty);
      return op_PlusPlus(layoutTyconRef(denv, tcref), argsL);
    } else {
      let trimmedName;
      const name = _arg1.data[1].data.DeclaringTypeRef.Name;

      if (endsWith(name, "Attribute")) {
        trimmedName = _String.dropSuffix(name, "Attribute");
      } else {
        trimmedName = name;
      }

      const tref = _arg1.data[1].data.DeclaringTypeRef;
      const tref_1 = ILTypeRef.Create(tref.Scope, tref.Enclosing, trimmedName);
      return op_PlusPlus(PrintIL.layoutILTypeRef(denv, tref_1), argsL);
    }
  };

  const layoutILAttribElement = __exports.layoutILAttribElement = function (denv, arg) {
    if (arg.tag === 1) {
      if (arg.data) {
        return WordL.keywordTrue;
      } else {
        return WordL.keywordFalse;
      }
    } else if (arg.tag === 2) {
      return wordL(TaggedTextOps.tagStringLiteral("'" + toString(arg.data) + "'"));
    } else if (arg.tag === 3) {
      return wordL(TaggedTextOps.tagNumericLiteral(arg.data.toString() + "y"));
    } else if (arg.tag === 4) {
      return wordL(TaggedTextOps.tagNumericLiteral(arg.data.toString() + "s"));
    } else if (arg.tag === 5) {
      return wordL(TaggedTextOps.tagNumericLiteral(arg.data.toString()));
    } else if (arg.tag === 6) {
      return wordL(TaggedTextOps.tagNumericLiteral(arg.data.toString() + "L"));
    } else if (arg.tag === 7) {
      return wordL(TaggedTextOps.tagNumericLiteral(arg.data.toString() + "uy"));
    } else if (arg.tag === 8) {
      return wordL(TaggedTextOps.tagNumericLiteral(arg.data.toString() + "us"));
    } else if (arg.tag === 9) {
      return wordL(TaggedTextOps.tagNumericLiteral(arg.data.toString() + "u"));
    } else if (arg.tag === 10) {
      return wordL(TaggedTextOps.tagNumericLiteral(arg.data.toString() + "UL"));
    } else if (arg.tag === 11) {
      let str;
      const s = arg.data.toString();
      str = (forAll(function (c) {
        return System.Char.IsDigit(c) ? true : c === "-";
      }, s) ? s + ".0" : s) + "f";
      return wordL(TaggedTextOps.tagNumericLiteral(str));
    } else if (arg.tag === 12) {
      let str_1;
      const s_1 = arg.data.toString();

      if (forAll(function (c_1) {
        return System.Char.IsDigit(c_1) ? true : c_1 === "-";
      }, s_1)) {
        str_1 = s_1 + ".0";
      } else {
        str_1 = s_1;
      }

      return wordL(TaggedTextOps.tagNumericLiteral(str_1));
    } else if (arg.tag === 13) {
      return wordL(TaggedTextOps.tagKeyword("null"));
    } else if (arg.tag === 16) {
      return op_HatHat(leftL(TaggedTextOps.tagPunctuation("[|")), op_HatHat(semiListL(map(function (arg_1) {
        return layoutILAttribElement(denv, arg_1);
      }, arg.data[1])), RightL.rightBracketBar));
    } else if (arg.tag === 14) {
      if (arg.data == null) {
        return wordL(TaggedTextOps.tagText(""));
      } else {
        return op_HatHat(LeftL.keywordTypeof, op_HatHat(SepL.leftAngle, op_HatHat(PrintIL.layoutILType(denv, new List(), getValue(arg.data)), RightL.rightAngle)));
      }
    } else if (arg.tag === 15) {
      if (arg.data == null) {
        return emptyL;
      } else {
        return op_HatHat(LeftL.keywordTypedefof, op_HatHat(SepL.leftAngle, op_HatHat(PrintIL.layoutILTypeRef(denv, getValue(arg.data)), RightL.rightAngle)));
      }
    } else if (arg.data == null) {
      return wordL(TaggedTextOps.tagStringLiteral(""));
    } else {
      return wordL(TaggedTextOps.tagStringLiteral("\"" + getValue(arg.data) + "\""));
    }
  };

  const layoutILAttrib = __exports.layoutILAttrib = function (denv, ty, args) {
    const argsL = bracketL(sepListL(rightL(TaggedTextOps.tagPunctuation(",")), map(function (arg) {
      return layoutILAttribElement(denv, arg);
    }, args)));
    return op_PlusPlus(PrintIL.layoutILType(denv, new List(), ty), argsL);
  };

  const layoutAttribs = __exports.layoutAttribs = function (denv, ty, kind, attrs, restL) {
    if (denv.showAttributes) {
      const attrs_1 = filter($var33 => !IsMatchingFSharpAttributeOpt(denv.g, denv.g.attrib_DllImportAttribute, $var33), attrs);
      const attrs_2 = filter($var34 => !IsMatchingFSharpAttributeOpt(denv.g, denv.g.attrib_ContextStaticAttribute, $var34), attrs_1);
      const attrs_3 = filter($var35 => !IsMatchingFSharpAttributeOpt(denv.g, denv.g.attrib_ThreadStaticAttribute, $var35), attrs_2);
      const attrs_4 = filter($var36 => !IsMatchingFSharpAttribute(denv.g, denv.g.attrib_EntryPointAttribute, $var36), attrs_3);
      const attrs_5 = filter($var37 => !IsMatchingFSharpAttributeOpt(denv.g, denv.g.attrib_MarshalAsAttribute, $var37), attrs_4);
      const attrs_6 = filter($var38 => !IsMatchingFSharpAttribute(denv.g, denv.g.attrib_ReflectedDefinitionAttribute, $var38), attrs_5);
      const attrs_7 = filter($var39 => !IsMatchingFSharpAttribute(denv.g, denv.g.attrib_StructLayoutAttribute, $var39), attrs_6);
      const attrs_8 = filter($var40 => !IsMatchingFSharpAttribute(denv.g, denv.g.attrib_AutoSerializableAttribute, $var40), attrs_7);

      if (attrs_8.tail == null) {
        return restL;
      } else {
        return op_AtAt(PrintUtilities.squareAngleL(sepListL(rightL(TaggedTextOps.tagPunctuation(";")), map(function (arg10_) {
          return layoutAttrib(denv, arg10_);
        }, attrs_8))), restL);
      }
    } else if (isStructRecordOrUnionTyconTy(denv.g, ty) ? true : (isUnionTy(denv.g, ty) ? true : isRecdTy(denv.g, ty)) ? HasFSharpAttribute(denv.g, denv.g.attrib_StructAttribute, attrs) : false) {
      return op_AtAt(PrintUtilities.squareAngleL(wordL(TaggedTextOps.tagClass("Struct"))), restL);
    } else if (kind.tag === 1) {
      return op_AtAt(PrintUtilities.squareAngleL(wordL(TaggedTextOps.tagClass("Measure"))), restL);
    } else {
      return restL;
    }
  };

  const layoutTyparAttribs = __exports.layoutTyparAttribs = function (denv, kind, attrs, restL) {
    const matchValue = [attrs, kind];
    const $var41 = matchValue[0].tail == null ? matchValue[1].tag === 0 ? [0] : [1] : [1];

    switch ($var41[0]) {
      case 0:
        return restL;

      case 1:
        return op_HatHat(PrintUtilities.squareAngleL(sepListL(rightL(TaggedTextOps.tagPunctuation(";")), append(kind.tag === 1 ? ofArray([wordL(TaggedTextOps.tagText("Measure"))]) : new List(), map(function (arg10_) {
          return layoutAttrib(denv, arg10_);
        }, attrs)))), restL);
    }
  };

  const layoutTyparRef = __exports.layoutTyparRef = function (denv, typar) {
    return wordL(TaggedTextOps.tagTypeParameter(toText(printf("%s%s%s"))(denv.showConstraintTyparAnnotations ? prefixOfStaticReq(typar.StaticReq) : "'", denv.showImperativeTyparAnnotations ? prefixOfRigidTypar(typar) : "", typar.DisplayName)));
  };

  const layoutTyparRefWithInfo = __exports.layoutTyparRefWithInfo = function (denv, env, typar) {
    const varL = layoutTyparRef(denv, typar);
    const varL_1 = denv.showAttributes ? layoutTyparAttribs(denv, typar.Kind, typar.Attribs, varL) : varL;
    const matchValue = ZmapModule.tryFind(typar, env.inplaceConstraints);

    if (matchValue != null) {
      if (ZsetModule.contains(typar, env.singletons)) {
        return op_HatHat(leftL(TaggedTextOps.tagPunctuation("#")), layoutTypeWithInfo(denv, env, getValue(matchValue)));
      } else {
        return bracketL(op_HatHat(varL_1, op_HatHat(sepL(TaggedTextOps.tagPunctuation(":>")), layoutTypeWithInfo(denv, env, getValue(matchValue)))));
      }
    } else {
      return varL_1;
    }
  };

  const layoutConstraintsWithInfo = __exports.layoutConstraintsWithInfo = function (denv, env, cxs) {
    const cxs_1 = ListSet.setify(function (tupledArg, tupledArg_1) {
      const matchValue = [tupledArg[1], tupledArg_1[1]];
      const $var42 = matchValue[0].tag === 3 ? matchValue[1].tag === 3 ? [0, matchValue[0].data[0], matchValue[1].data[0]] : [1] : [1];

      switch ($var42[0]) {
        case 0:
          return traitsAEquiv(denv.g, TypeEquivEnv.Empty, $var42[1], $var42[2]);

        case 1:
          return false;
      }
    }, cxs);
    const cxsL = collect(function (tupledArg_2) {
      return layoutConstraintWithInfo(denv, env, tupledArg_2[0], tupledArg_2[1]);
    }, cxs_1);

    if (cxsL.tail == null) {
      return emptyL;
    } else if (denv.abbreviateAdditionalConstraints) {
      return op_HatHat(wordL(TaggedTextOps.tagKeyword("when")), wordL(TaggedTextOps.tagText("<constraints>")));
    } else if (denv.shortConstraints) {
      return op_HatHat(leftL(TaggedTextOps.tagPunctuation("(")), op_HatHat(wordL(TaggedTextOps.tagKeyword("requires")), op_HatHat(sepListL(wordL(TaggedTextOps.tagKeyword("and")), cxsL), rightL(TaggedTextOps.tagPunctuation(")")))));
    } else {
      return op_HatHat(wordL(TaggedTextOps.tagKeyword("when")), sepListL(wordL(TaggedTextOps.tagKeyword("and")), cxsL));
    }
  };

  const layoutConstraintWithInfo = __exports.layoutConstraintWithInfo = function (denv, env, tp, tpc) {
    const longConstraintPrefix = function (l) {
      return op_HatHat(layoutTyparRefWithInfo(denv, env, tp), op_HatHat(WordL.colon, l));
    };

    switch (tpc.tag) {
      case 3:
        return ofArray([layoutTraitWithInfo(denv, env, tpc.data[0])]);

      case 1:
        if (denv.showTyparDefaultConstraints) {
          return ofArray([op_HatHat(wordL(TaggedTextOps.tagKeyword("default")), op_HatHat(layoutTyparRefWithInfo(denv, env, tp), op_HatHat(WordL.colon, layoutTypeWithInfo(denv, env, tpc.data[1]))))]);
        } else {
          return new List();
        }

      case 8:
        if (denv.shortConstraints) {
          return ofArray([wordL(TaggedTextOps.tagKeyword("enum"))]);
        } else {
          return ofArray([longConstraintPrefix(layoutTypeAppWithInfoAndPrec(denv, env, wordL(TaggedTextOps.tagKeyword("enum")), 2, true, ofArray([tpc.data[0]])))]);
        }

      case 9:
        if (denv.shortConstraints) {
          return ofArray([wordL(TaggedTextOps.tagKeyword("comparison"))]);
        } else {
          return ofArray([longConstraintPrefix(wordL(TaggedTextOps.tagKeyword("comparison")))]);
        }

      case 10:
        if (denv.shortConstraints) {
          return ofArray([wordL(TaggedTextOps.tagKeyword("equality"))]);
        } else {
          return ofArray([longConstraintPrefix(wordL(TaggedTextOps.tagKeyword("equality")))]);
        }

      case 11:
        if (denv.shortConstraints) {
          return ofArray([WordL.keywordDelegate]);
        } else {
          return ofArray([longConstraintPrefix(layoutTypeAppWithInfoAndPrec(denv, env, WordL.keywordDelegate, 2, true, ofArray([tpc.data[0], tpc.data[1]])))]);
        }

      case 2:
        return ofArray([longConstraintPrefix(wordL(TaggedTextOps.tagKeyword("null")))]);

      case 4:
        if (denv.shortConstraints) {
          return ofArray([wordL(TaggedTextOps.tagText("value type"))]);
        } else {
          return ofArray([longConstraintPrefix(WordL.keywordStruct)]);
        }

      case 12:
        if (denv.shortConstraints) {
          return ofArray([wordL(TaggedTextOps.tagKeyword("unmanaged"))]);
        } else {
          return ofArray([longConstraintPrefix(wordL(TaggedTextOps.tagKeyword("unmanaged")))]);
        }

      case 5:
        if (denv.shortConstraints) {
          return ofArray([wordL(TaggedTextOps.tagText("reference type"))]);
        } else {
          return ofArray([longConstraintPrefix(op_HatHat(wordL(TaggedTextOps.tagKeyword("not")), wordL(TaggedTextOps.tagKeyword("struct"))))]);
        }

      case 6:
        return ofArray([longConstraintPrefix(bracketL(sepListL(sepL(TaggedTextOps.tagPunctuation("|")), map(function (typ) {
          return layoutTypeWithInfo(denv, env, typ);
        }, tpc.data[0]))))]);

      case 7:
        if (denv.shortConstraints) {
          return ofArray([op_HatHat(wordL(TaggedTextOps.tagKeyword("default")), wordL(TaggedTextOps.tagKeyword("constructor")))]);
        } else {
          return ofArray([longConstraintPrefix(bracketL(op_HatHat(wordL(TaggedTextOps.tagKeyword("new")), op_HatHat(wordL(TaggedTextOps.tagPunctuation(":")), op_HatHat(WordL.structUnit, op_HatHat(WordL.arrow, layoutTyparRefWithInfo(denv, env, tp)))))))]);
        }

      default:
        return ofArray([op_HatHat(layoutTyparRefWithInfo(denv, env, tp), op_MinusMinusMinus(wordL(TaggedTextOps.tagOperator(":>")), layoutTypeWithInfo(denv, env, tpc.data[0])))]);
    }
  };

  const layoutTraitWithInfo = __exports.layoutTraitWithInfo = function (denv, env, _arg2) {
    const nm = DemangleOperatorName(_arg2.data[1]);

    if (denv.shortConstraints) {
      return op_HatHat(WordL.keywordMember, wordL(TaggedTextOps.tagMember(nm)));
    } else {
      const rty = GetFSharpViewOfReturnType(denv.g, _arg2.data[4]);
      const stat = layoutMemberFlags(_arg2.data[2]);
      const tys = ListSet.setify(function (arg10_, arg20_) {
        return typeEquiv(denv.g, arg10_, arg20_);
      }, _arg2.data[0]);
      let tysL;
      const $var43 = tys.tail != null ? tys.tail.tail == null ? [0, tys.head] : [1, tys] : [1, tys];

      switch ($var43[0]) {
        case 0:
          tysL = layoutTypeWithInfo(denv, env, $var43[1]);
          break;

        case 1:
          tysL = bracketL(layoutTypesWithInfoAndPrec(denv, env, 2, wordL(TaggedTextOps.tagKeyword("or")), $var43[1]));
          break;
      }

      return op_HatHat(tysL, op_MinusMinusMinus(wordL(TaggedTextOps.tagPunctuation(":")), bracketL(op_HatHat(op_PlusPlus(stat, wordL(TaggedTextOps.tagMember(nm))), op_MinusMinusMinus(wordL(TaggedTextOps.tagPunctuation(":")), op_MinusMinusMinus(op_MinusMinusMinus(layoutTypesWithInfoAndPrec(denv, env, 2, wordL(TaggedTextOps.tagPunctuation("*")), _arg2.data[3]), wordL(TaggedTextOps.tagPunctuation("->"))), layoutTypeWithInfo(denv, env, rty)))))));
    }
  };

  const layoutMeasure = __exports.layoutMeasure = function (denv, unt) {
    const sortVars = function (vs) {
      return toList(sortWith(($var44, $var45) => compare(function (tupledArg) {
        return tupledArg[0].DisplayName;
      }($var44), function (tupledArg) {
        return tupledArg[0].DisplayName;
      }($var45)), vs));
    };

    const sortCons = function (cs) {
      return toList(sortWith(($var46, $var47) => compare(function (tupledArg_1) {
        return tupledArg_1[0].DisplayName;
      }($var46), function (tupledArg_1) {
        return tupledArg_1[0].DisplayName;
      }($var47)), cs));
    };

    const patternInput = partition(function (tupledArg_2) {
      return SignRational(tupledArg_2[1]) < 0;
    }, sortVars(ListMeasureVarOccsWithNonZeroExponents(unt)));
    const patternInput_1 = partition(function (tupledArg_3) {
      return SignRational(tupledArg_3[1]) < 0;
    }, sortCons(ListMeasureConOccsWithNonZeroExponents(denv.g, false, unt)));

    const unparL = function (uv) {
      return layoutTyparRef(denv, uv);
    };

    const unconL = function (tc) {
      return layoutTyconRef(denv, tc);
    };

    const rationalL = function (e) {
      return wordL(TaggedTextOps.tagNumericLiteral(RationalToString(e)));
    };

    const measureToPowerL = function (x, e_1) {
      if (e_1.Equals(OneRational)) {
        return x;
      } else {
        return op_MinusMinus(op_MinusMinus(x, wordL(TaggedTextOps.tagPunctuation("^"))), rationalL(e_1));
      }
    };

    const prefix = spaceListL(append(map(function (tupledArg_4) {
      return measureToPowerL(unparL(tupledArg_4[0]), tupledArg_4[1]);
    }, patternInput[1]), map(function (tupledArg_5) {
      return measureToPowerL(unconL(tupledArg_5[0]), tupledArg_5[1]);
    }, patternInput_1[1])));
    const postfix = spaceListL(append(map(function (tupledArg_6) {
      return measureToPowerL(unparL(tupledArg_6[0]), NegRational(tupledArg_6[1]));
    }, patternInput[0]), map(function (tupledArg_7) {
      return measureToPowerL(unconL(tupledArg_7[0]), NegRational(tupledArg_7[1]));
    }, patternInput_1[0])));
    const matchValue = [patternInput[0], patternInput_1[0]];
    const $var48 = matchValue[0].tail == null ? matchValue[1].tail == null ? [0] : [1] : [1];

    switch ($var48[0]) {
      case 0:
        const matchValue_1 = [patternInput[1], patternInput_1[1]];
        const $var49 = matchValue_1[0].tail == null ? matchValue_1[1].tail == null ? [0] : [1] : [1];

        switch ($var49[0]) {
          case 0:
            return wordL(TaggedTextOps.tagNumericLiteral("1"));

          case 1:
            return prefix;
        }

      case 1:
        return op_HatHat(prefix, op_HatHat(sepL(TaggedTextOps.tagPunctuation("/")), patternInput[0].length + patternInput_1[0].length > 1 ? op_HatHat(sepL(TaggedTextOps.tagPunctuation("(")), op_HatHat(postfix, sepL(TaggedTextOps.tagPunctuation(")")))) : postfix));
    }
  };

  const layoutTypeAppWithInfoAndPrec = __exports.layoutTypeAppWithInfoAndPrec = function (denv, env, tcL, prec, prefix, args) {
    if (prefix) {
      if (args.tail != null) {
        if (args.tail.tail == null) {
          return op_HatHat(tcL, op_HatHat(sepL(TaggedTextOps.tagPunctuation("<")), op_HatHat(layoutTypeWithInfoAndPrec(denv, env, 4, args.head), rightL(TaggedTextOps.tagPunctuation(">")))));
        } else {
          return PrintUtilities.bracketIfL(prec <= 1, op_HatHat(tcL, PrintUtilities.angleL(layoutTypesWithInfoAndPrec(denv, env, 2, sepL(TaggedTextOps.tagPunctuation(",")), args))));
        }
      } else {
        return tcL;
      }
    } else if (args.tail != null) {
      if (args.tail.tail == null) {
        return op_HatHat(layoutTypeWithInfoAndPrec(denv, env, 2, args.head), tcL);
      } else {
        return PrintUtilities.bracketIfL(prec <= 1, op_MinusMinusMinus(bracketL(layoutTypesWithInfoAndPrec(denv, env, 2, sepL(TaggedTextOps.tagPunctuation(",")), args)), tcL));
      }
    } else {
      return tcL;
    }
  };

  const layoutTypeWithInfoAndPrec = __exports.layoutTypeWithInfoAndPrec = function (denv, env, prec, typ) {
    layoutTypeWithInfoAndPrec: while (true) {
      const matchValue = stripTyparEqns(typ);
      const $var50 = matchValue.tag === 1 ? (matchValue.data[0].IsMeasureableReprTycon ? forAll(function (arg10_) {
        return isDimensionless(denv.g, arg10_);
      }, matchValue.data[1]) : false) ? [0, matchValue.data[1], matchValue.data[0]] : [1] : [1];

      switch ($var50[0]) {
        case 0:
          const $var76 = denv;
          env = env;
          prec = prec;
          typ = reduceTyconRefMeasureableOrProvided(denv.g, $var50[2], $var50[1]);
          denv = $var76;
          continue layoutTypeWithInfoAndPrec;

        case 1:
          switch (matchValue.tag) {
            case 4:
              const tc = matchValue.data[0].data[0];
              return layoutTypeAppWithInfoAndPrec(denv, env, layoutTyconRef(denv, tc), prec, tc.IsPrefixDisplay, matchValue.data[1]);

            case 2:
              if (evalTupInfoIsStruct(matchValue.data[0])) {
                return op_MinusMinusMinus(WordL.keywordStruct, bracketL(layoutTypesWithInfoAndPrec(denv, env, 2, wordL(TaggedTextOps.tagPunctuation("*")), matchValue.data[1])));
              } else {
                return PrintUtilities.bracketIfL(prec <= 2, layoutTypesWithInfoAndPrec(denv, env, 2, wordL(TaggedTextOps.tagPunctuation("*")), matchValue.data[1]));
              }

            case 0:
              const tauL = layoutTypeWithInfoAndPrec(denv, env, prec, matchValue.data[1]);

              if (matchValue.data[0].tail != null) {
                if (matchValue.data[0].tail.tail == null) {
                  return op_HatHat(layoutTyparRefWithInfo(denv, env, matchValue.data[0].head), op_MinusMinusMinus(rightL(TaggedTextOps.tagPunctuation(".")), tauL));
                } else {
                  return op_HatHat(spaceListL(map(function (typar) {
                    return layoutTyparRefWithInfo(denv, env, typar);
                  }, new List(matchValue.data[0].head, matchValue.data[0].tail))), op_MinusMinusMinus(rightL(TaggedTextOps.tagPunctuation(".")), tauL));
                }
              } else {
                return tauL;
              }

            case 3:
              const loop = function (soFarL, ty) {
                loop: while (true) {
                  const matchValue_1 = stripTyparEqns(ty);

                  if (matchValue_1.tag === 3) {
                    soFarL = op_MinusMinusMinus(soFarL, op_HatHat(layoutTypeWithInfoAndPrec(denv, env, 4, matchValue_1.data[0]), wordL(TaggedTextOps.tagPunctuation("->"))));
                    ty = matchValue_1.data[1];
                    continue loop;
                  } else {
                    return op_MinusMinusMinus(soFarL, layoutTypeWithInfoAndPrec(denv, env, 5, matchValue_1));
                  }
                }
              };

              return PrintUtilities.bracketIfL(prec <= 4, loop(emptyL, typ));

            case 5:
              return layoutTyparRefWithInfo(denv, env, matchValue.data);

            case 6:
              return layoutMeasure(denv, matchValue.data);

            default:
              return layoutTypeAppWithInfoAndPrec(denv, env, layoutTyconRef(denv, matchValue.data[0]), prec, matchValue.data[0].IsPrefixDisplay, matchValue.data[1]);
          }

      }
    }
  };

  const layoutTypesWithInfoAndPrec = __exports.layoutTypesWithInfoAndPrec = function (denv, env, prec, sep, typl) {
    return sepListL(sep, map(function (typ) {
      return layoutTypeWithInfoAndPrec(denv, env, prec, typ);
    }, typl));
  };

  const layoutTypeWithInfo = __exports.layoutTypeWithInfo = function (denv, env, typ) {
    return layoutTypeWithInfoAndPrec(denv, env, 5, typ);
  };

  const layoutType = __exports.layoutType = function (denv, typ) {
    return layoutTypeWithInfo(denv, SimplifyTypes.typeSimplificationInfo0, typ);
  };

  const layoutTopType = __exports.layoutTopType = function (denv, env, argInfos, rty, cxs) {
    var arg00_;
    const rtyL = layoutTypeWithInfoAndPrec(denv, env, 4, rty);
    const cxsL = layoutConstraintsWithInfo(denv, env, cxs);

    if (argInfos.tail == null) {
      return op_MinusMinusMinus(rtyL, cxsL);
    } else {
      const argL = function (tupledArg) {
        const isOptionalArg = HasFSharpAttribute(denv.g, denv.g.attrib_OptionalArgumentAttribute, tupledArg[1].Attribs);
        const isParamArray = HasFSharpAttribute(denv.g, denv.g.attrib_ParamArrayAttribute, tupledArg[1].Attribs);
        const matchValue = [tupledArg[1].Name, isOptionalArg, isParamArray, tryDestOptionTy(denv.g, tupledArg[0])];
        const $var51 = matchValue[0] == null ? [1] : matchValue[1] ? matchValue[3] != null ? [0, getValue(matchValue[0]), getValue(matchValue[3])] : [2, getValue(matchValue[0]), matchValue[2]] : [2, getValue(matchValue[0]), matchValue[2]];

        switch ($var51[0]) {
          case 0:
            return op_HatHat(leftL(TaggedTextOps.tagPunctuation("?")), op_HatHat(sepL(TaggedTextOps.tagParameter($var51[1].idText)), op_HatHat(SepL.colon, layoutTypeWithInfoAndPrec(denv, env, 2, $var51[2]))));

          case 1:
            return layoutTypeWithInfoAndPrec(denv, env, 2, tupledArg[0]);

          case 2:
            const prefix = $var51[2] ? op_HatHat(PrintUtilities.layoutBuiltinAttribute(denv, denv.g.attrib_ParamArrayAttribute), leftL(TaggedTextOps.tagParameter($var51[1].idText))) : leftL(TaggedTextOps.tagParameter($var51[1].idText));
            return op_HatHat(prefix, op_HatHat(SepL.colon, layoutTypeWithInfoAndPrec(denv, env, 2, tupledArg[0])));
        }
      };

      const delimitReturnValue = TaggedTextOps.tagPunctuation(denv.useColonForReturnType ? ":" : "->");
      const allArgsL = map(function (x) {
        return op_HatHat(x, wordL(delimitReturnValue));
      }, map((arg00_ = wordL(TaggedTextOps.tagPunctuation("*")), function (arg10_) {
        return sepListL(arg00_, arg10_);
      }), function (xss) {
        return List_1.mapSquared(argL, xss);
      }(argInfos)));
      return op_MinusMinusMinus(foldBack(function (arg00__1, arg10__1) {
        return op_MinusMinusMinus(arg00__1, arg10__1);
      }, allArgsL, rtyL), cxsL);
    }
  };

  const layoutTyparDecls = __exports.layoutTyparDecls = function (denv, nmL, prefix, typars) {
    var h;
    const env = SimplifyTypes.typeSimplificationInfo0;
    const tpcs = collect(function (tp) {
      return map(function (tpc) {
        return [tp, tpc];
      }, tp.Constraints);
    }, typars);
    const matchValue = [typars, tpcs];
    const $var52 = matchValue[0].tail != null ? matchValue[0].tail.tail == null ? matchValue[1].tail == null ? (h = matchValue[0].head, !prefix) ? [1, matchValue[0].head] : [2] : [2] : [2] : matchValue[1].tail == null ? [0] : [2];

    switch ($var52[0]) {
      case 0:
        return nmL;

      case 1:
        return op_MinusMinusMinus(layoutTyparRefWithInfo(denv, env, $var52[1]), nmL);

      case 2:
        const tpcsL = layoutConstraintsWithInfo(denv, env, tpcs);
        const coreL = sepListL(sepL(TaggedTextOps.tagPunctuation(",")), map(function (typar) {
          return layoutTyparRefWithInfo(denv, env, typar);
        }, typars));

        if (prefix ? true : !(tpcs.tail == null)) {
          return op_HatHat(nmL, PrintUtilities.angleL(op_MinusMinusMinus(coreL, tpcsL)));
        } else {
          return op_MinusMinusMinus(bracketL(coreL), nmL);
        }

    }
  };

  const layoutTyparConstraint = __exports.layoutTyparConstraint = function (denv, tp, tpc) {
    const matchValue = layoutConstraintWithInfo(denv, SimplifyTypes.typeSimplificationInfo0, tp, tpc);

    if (matchValue.tail == null) {
      return emptyL;
    } else {
      return matchValue.head;
    }
  };

  const prettyLayoutOfInstAndSig = __exports.prettyLayoutOfInstAndSig = function (denv, typarInst, tys, retTy) {
    const patternInput = PrettyTypes.PrettifyInstAndSig(denv.g, typarInst, tys, retTy);
    const prettyTys = patternInput[0][1];
    const prettyTyparInst = patternInput[0][0];
    const prettyRetTy = patternInput[0][2];
    const env = SimplifyTypes.CollectInfo(true, new List(prettyRetTy, prettyTys), patternInput[1]);
    const prettyTysL = map(function (typ) {
      return layoutTypeWithInfo(denv, env, typ);
    }, prettyTys);
    const prettyRetTyL = layoutTopType(denv, env, ofArray([new List()]), prettyRetTy, new List());
    return [prettyTyparInst, [prettyTys, prettyRetTy], [prettyTysL, prettyRetTyL], layoutConstraintsWithInfo(denv, env, env.postfixConstraints)];
  };

  const prettyLayoutOfTopTypeInfoAux = __exports.prettyLayoutOfTopTypeInfoAux = function (denv, prettyArgInfos, prettyRetTy, cxs) {
    var mapping;
    const env = SimplifyTypes.CollectInfo(true, new List(prettyRetTy, collect((mapping = function (tuple) {
      return tuple[0];
    }, function (list) {
      return map(mapping, list);
    }), prettyArgInfos)), cxs);
    return layoutTopType(denv, env, prettyArgInfos, prettyRetTy, env.postfixConstraints);
  };

  const prettyLayoutOfUncurriedSig = __exports.prettyLayoutOfUncurriedSig = function (denv, typarInst, argInfos, retTy) {
    const patternInput = PrettyTypes.PrettifyInstAndUncurriedSig(denv.g, typarInst, argInfos, retTy);
    const prettyTyparInst = patternInput[0][0];
    const prettyRetTy = patternInput[0][2];
    const prettyArgInfos = patternInput[0][1];
    return [prettyTyparInst, prettyLayoutOfTopTypeInfoAux(denv, ofArray([prettyArgInfos]), prettyRetTy, patternInput[1])];
  };

  const prettyLayoutOfCurriedMemberSig = __exports.prettyLayoutOfCurriedMemberSig = function (denv, typarInst, argInfos, retTy, parentTyparTys) {
    const patternInput = PrettyTypes.PrettifyInstAndCurriedSig(denv.g, typarInst, parentTyparTys, argInfos, retTy);
    const retTy_1 = patternInput[0][3];
    const prettyTyparInst = patternInput[0][0];
    const parentTyparTys_1 = patternInput[0][1];
    const argInfos_1 = patternInput[0][2];
    const cxs = filter(function (tupledArg) {
      return !exists(function (ty) {
        const matchValue = tryDestTyparTy(denv.g, ty);

        if (matchValue == null) {
          return false;
        } else {
          return typarEq(tupledArg[0], getValue(matchValue));
        }
      }, parentTyparTys_1);
    }, patternInput[1]);
    return [prettyTyparInst, prettyLayoutOfTopTypeInfoAux(denv, argInfos_1, retTy_1, cxs)];
  };

  const prettyLayoutOfMemberSigCore = __exports.prettyLayoutOfMemberSigCore = function (denv, memberToParentInst, typarInst, methTypars, argInfos, retTy) {
    let patternInput;
    const methTyparNames = mapIndexed(function (i, tp) {
      return PrettyTypes.NeedsPrettyTyparName(tp) ? toText(printf("a%d"))(memberToParentInst.length + i) : tp.Name;
    }, methTypars);
    patternInput = PrettyTypes.NewPrettyTypars(memberToParentInst, methTypars, methTyparNames);
    const retTy_1 = instType(patternInput[1], retTy);
    const argInfos_1 = map(function (infos) {
      var f;
      return infos.tail == null ? ofArray([[denv.g.unit_ty, ValReprInfoModule.unnamedTopArg1]]) : map((f = function (arg10_) {
        return instType(patternInput[1], arg10_);
      }, function (tupledArg) {
        return map1Of2(f, tupledArg[0], tupledArg[1]);
      }), infos);
    }, argInfos);
    const memberParentTypars = map(function (tuple) {
      return tuple[0];
    }, memberToParentInst);
    const parentTyparTys = map($var53 => function (arg10__1) {
      return instType(patternInput[1], arg10__1);
    }(function (tp_1) {
      return mkTyparTy(tp_1);
    }($var53)), memberParentTypars);
    const patternInput_1 = prettyLayoutOfCurriedMemberSig(denv, typarInst, argInfos_1, retTy_1, parentTyparTys);
    return [patternInput_1[0], patternInput[0], patternInput_1[1]];
  };

  const prettyLayoutOfMemberType = __exports.prettyLayoutOfMemberType = function (denv, v, typarInst, argInfos, retTy) {
    const matchValue = PartitionValRefTypars(denv.g, v);

    if (matchValue == null) {
      const patternInput = prettyLayoutOfUncurriedSig(denv, typarInst, concat(argInfos), retTy);
      return [patternInput[0], new List(), patternInput[1]];
    } else {
      const memberToParentInst = getValue(matchValue)[3];
      const memberMethodTypars = getValue(matchValue)[2];
      return prettyLayoutOfMemberSigCore(denv, memberToParentInst, typarInst, memberMethodTypars, argInfos, retTy);
    }
  };

  const prettyLayoutOfMemberSig = __exports.prettyLayoutOfMemberSig = function (denv, memberToParentInst, nm, methTypars, argInfos, retTy) {
    const patternInput = prettyLayoutOfMemberSigCore(denv, memberToParentInst, emptyTyparInst, methTypars, argInfos, retTy);
    let nameL_2;
    const nameL = DemangleOperatorNameAsLayout(TaggedTextOps.tagMember, nm);
    const nameL_1 = denv.showTyparBinding ? layoutTyparDecls(denv, nameL, true, patternInput[1]) : nameL;
    nameL_2 = nameL_1;
    return op_HatHat(nameL_2, op_HatHat(wordL(TaggedTextOps.tagPunctuation(":")), patternInput[2]));
  };

  const prettyLayoutOfType = __exports.prettyLayoutOfType = function (denv, typ) {
    const patternInput = PrettyTypes.PrettifyType(denv.g, typ);
    const env = SimplifyTypes.CollectInfo(true, ofArray([patternInput[0]]), patternInput[1]);
    const cxsL = layoutConstraintsWithInfo(denv, env, env.postfixConstraints);
    return op_MinusMinusMinus(layoutTypeWithInfoAndPrec(denv, env, 2, patternInput[0]), cxsL);
  };

  const prettyLayoutOfTypeNoConstraints = __exports.prettyLayoutOfTypeNoConstraints = function (denv, typ) {
    const patternInput = PrettyTypes.PrettifyType(denv.g, typ);
    return layoutTypeWithInfoAndPrec(denv, SimplifyTypes.typeSimplificationInfo0, 5, patternInput[0]);
  };

  const layoutAssemblyName = __exports.layoutAssemblyName = function (_denv, typ) {
    return typ.GetAssemblyName();
  };

  return __exports;
}({});

const PrintTastMemberOrVals = function (__exports) {
  const prettyLayoutOfMember = __exports.prettyLayoutOfMember = function (denv, typarInst, v) {
    var copyOfStruct;
    var ty;
    var copyOfStruct_1;
    const v_1 = mkLocalValRef(v);
    const membInfo = getValue(v_1.MemberInfo);
    const stat = PrintTypes.layoutMemberFlags(membInfo.MemberFlags);
    const patternInput = GetTypeOfMemberInFSharpForm(denv.g, v_1);

    const mkNameL = function (niceMethodTypars, tagFunction, name) {
      const nameL = DemangleOperatorNameAsLayout($var54 => {
        var arg00_;
        return (arg00_ = v_1.DefinitionRange, function (arg10_) {
          return mkNav(arg00_, arg10_);
        })(tagFunction($var54));
      }, name);
      const nameL_1 = denv.showMemberContainers ? op_HatHat(PrintTypes.layoutTyconRef(denv, v_1.MemberApparentEntity), op_HatHat(SepL.dot, nameL)) : nameL;
      const nameL_2 = denv.showTyparBinding ? PrintTypes.layoutTyparDecls(denv, nameL_1, true, niceMethodTypars) : nameL_1;
      const nameL_3 = PrintTypes.layoutAccessibility(denv, v_1.Accessibility, nameL_2);
      return nameL_3;
    };

    const matchValue = membInfo.MemberFlags.MemberKind;

    switch (matchValue.tag) {
      case 0:
      case 1:
        const patternInput_1 = PrintTypes.prettyLayoutOfMemberType(denv, v_1, typarInst, patternInput[1], patternInput[2]);
        const newL = PrintTypes.layoutAccessibility(denv, v_1.Accessibility, WordL.keywordNew);
        const resL = op_HatHat(op_PlusPlus(stat, newL), op_HatHat(wordL(TaggedTextOps.tagPunctuation(":")), patternInput_1[2]));
        return [patternInput_1[0], resL];

      case 5:
        return [emptyTyparInst, stat];

      case 3:
        if (patternInput[1].tail == null) {
          errorR(new _Error(SR.tastInvalidFormForPropertyGetter(), (copyOfStruct = v_1.Id, copyOfStruct.idRange)));
          const nameL_4 = mkNameL(new List(), TaggedTextOps.tagProperty, v_1.CoreDisplayName);
          const resL_1 = op_MinusMinusMinus(op_MinusMinusMinus(stat, nameL_4), op_HatHat(WordL.keywordWith, WordL.keywordGet));
          return [emptyTyparInst, resL_1];
        } else {
          let argInfos;
          const $var55 = patternInput[1].tail != null ? patternInput[1].head.tail != null ? patternInput[1].head.tail.tail == null ? patternInput[1].tail.tail == null ? (ty = patternInput[1].head.head[0], isUnitTy(denv.g, ty)) ? [0, patternInput[1].head.head[0]] : [1] : [1] : [1] : [1] : [1];

          switch ($var55[0]) {
            case 0:
              argInfos = new List();
              break;

            case 1:
              argInfos = patternInput[1];
              break;
          }

          const patternInput_2 = PrintTypes.prettyLayoutOfMemberType(denv, v_1, typarInst, argInfos, patternInput[2]);
          const nameL_5 = mkNameL(patternInput_2[1], TaggedTextOps.tagProperty, v_1.CoreDisplayName);
          const resL_2 = op_MinusMinusMinus(stat, op_HatHat(nameL_5, op_HatHat(WordL.colon, argInfos.tail == null ? patternInput_2[2] : op_MinusMinusMinus(patternInput_2[2], op_HatHat(WordL.keywordWith, WordL.keywordGet)))));
          return [patternInput_2[0], resL_2];
        }

      case 4:
        if (patternInput[1].length !== 1 ? true : patternInput[1].head.tail == null) {
          errorR(new _Error(SR.tastInvalidFormForPropertySetter(), (copyOfStruct_1 = v_1.Id, copyOfStruct_1.idRange)));
          const nameL_6 = mkNameL(new List(), TaggedTextOps.tagProperty, v_1.CoreDisplayName);
          const resL_3 = op_MinusMinusMinus(op_MinusMinusMinus(stat, nameL_6), op_HatHat(WordL.keywordWith, WordL.keywordSet));
          return [emptyTyparInst, resL_3];
        } else {
          const patternInput_3 = List_1.frontAndBack(patternInput[1].head);
          const patternInput_4 = PrintTypes.prettyLayoutOfMemberType(denv, v_1, typarInst, patternInput_3[0].tail == null ? new List() : ofArray([patternInput_3[0]]), patternInput_3[1][0]);
          const nameL_7 = mkNameL(patternInput_4[1], TaggedTextOps.tagProperty, v_1.CoreDisplayName);
          const resL_4 = op_MinusMinusMinus(stat, op_HatHat(nameL_7, op_HatHat(wordL(TaggedTextOps.tagPunctuation(":")), op_MinusMinusMinus(patternInput_4[2], op_HatHat(WordL.keywordWith, WordL.keywordSet)))));
          return [patternInput_4[0], resL_4];
        }

      default:
        const patternInput_5 = PrintTypes.prettyLayoutOfMemberType(denv, v_1, typarInst, patternInput[1], patternInput[2]);
        const nameL_8 = mkNameL(patternInput_5[1], TaggedTextOps.tagMember, v_1.LogicalName);
        const resL_5 = op_MinusMinusMinus(stat, op_HatHat(nameL_8, op_HatHat(WordL.colon, patternInput_5[2])));
        return [patternInput_5[0], resL_5];
    }
  };

  const layoutNonMemberVal = __exports.layoutNonMemberVal = function (denv, tps, v, tau, cxs) {
    const env = SimplifyTypes.CollectInfo(true, ofArray([tau]), cxs);
    const patternInput = GetTopTauTypeInFSharpForm(denv.g, arityOfVal(v).ArgInfos, tau, v.Range);
    const nameL = wordL(mkNav(v.DefinitionRange, (v.IsModuleBinding ? TaggedTextOps.tagModuleBinding : TaggedTextOps.tagUnknownEntity)(v.DisplayName)));
    const nameL_1 = PrintTypes.layoutAccessibility(denv, v.Accessibility, nameL);
    const nameL_2 = (v.IsMutable ? !denv.suppressMutableKeyword : false) ? op_PlusPlus(wordL(TaggedTextOps.tagKeyword("mutable")), nameL_1) : nameL_1;
    const nameL_3 = (v.MustInline ? !denv.suppressInlineKeyword : false) ? op_PlusPlus(wordL(TaggedTextOps.tagKeyword("inline")), nameL_2) : nameL_2;
    const isOverGeneric = ZsetModule.elements(freeInType(CollectTyparsNoCaching, tau).FreeTypars).length < tps.length;
    const isTyFunction = v.IsTypeFunction;
    const typarBindingsL = ((isTyFunction ? true : isOverGeneric) ? true : denv.showTyparBinding) ? PrintTypes.layoutTyparDecls(denv, nameL_3, true, tps) : nameL_3;
    const valAndTypeL = op_MinusMinusMinus(op_HatHat(WordL.keywordVal, op_MinusMinusMinus(typarBindingsL, wordL(TaggedTextOps.tagPunctuation(":")))), PrintTypes.layoutTopType(denv, env, patternInput[0], patternInput[1], env.postfixConstraints));
    const matchValue = denv.generatedValueLayout(v);

    if (matchValue != null) {
      return op_MinusMinusMinus(op_PlusPlus(valAndTypeL, wordL(TaggedTextOps.tagPunctuation("="))), getValue(matchValue));
    } else {
      return valAndTypeL;
    }
  };

  const prettyLayoutOfValOrMember = __exports.prettyLayoutOfValOrMember = function (denv, typarInst, v) {
    let patternInput_2;
    const matchValue = v.MemberInfo;

    if (matchValue != null) {
      patternInput_2 = prettyLayoutOfMember(denv, typarInst, v);
    } else {
      const patternInput = v.TypeScheme;
      const tau = StripSelfRefCell(denv.g, v.BaseOrThisInfo, patternInput[1]);
      const patternInput_1 = PrettyTypes.PrettifyInstAndTyparsAndType(denv.g, typarInst, patternInput[0], tau);
      const prettyTypars = patternInput_1[0][1];
      const prettyTyparInst = patternInput_1[0][0];
      const prettyTauTy = patternInput_1[0][2];
      const resL = layoutNonMemberVal(denv, prettyTypars, v, prettyTauTy, patternInput_1[1]);
      patternInput_2 = [prettyTyparInst, resL];
    }

    return [patternInput_2[0], PrintTypes.layoutAttribs(denv, v.Type, new TyparKind(0), v.Attribs, patternInput_2[1])];
  };

  const prettyLayoutOfValOrMemberNoInst = __exports.prettyLayoutOfValOrMemberNoInst = function (denv, v) {
    return prettyLayoutOfValOrMember(denv, emptyTyparInst, v)[1];
  };

  return __exports;
}({});

function layoutTyparConstraint_1(denv, x_0, x_1) {
  const x = [x_0, x_1];
  return function (tupledArg) {
    return PrintTypes.layoutTyparConstraint(denv, tupledArg[0], tupledArg[1]);
  }(x);
}

export { layoutTyparConstraint_1 as layoutTyparConstraint };
export function outputType(denv, os, x) {
  (function (arg10_) {
    bufferL(os, arg10_);
  })(function (typ) {
    return PrintTypes.layoutType(denv, typ);
  }(x));
}

function layoutType_1(denv, x) {
  return function (typ) {
    return PrintTypes.layoutType(denv, typ);
  }(x);
}

export { layoutType_1 as layoutType };
export function outputTypars(denv, nm, os, x) {
  var nmL;

  (function (arg10_) {
    bufferL(os, arg10_);
  })((nmL = wordL(nm), function (typars) {
    return PrintTypes.layoutTyparDecls(denv, nmL, true, typars);
  })(x));
}
export function outputTyconRef(denv, os, x) {
  (function (arg10_) {
    bufferL(os, arg10_);
  })(function (tycon) {
    return PrintTypes.layoutTyconRef(denv, tycon);
  }(x));
}

function layoutTyconRef_1(denv, x) {
  return function (tycon) {
    return PrintTypes.layoutTyconRef(denv, tycon);
  }(x);
}

export { layoutTyconRef_1 as layoutTyconRef };

function layoutConst_1(g, ty, c) {
  return PrintTypes.layoutConst(g, ty, c);
}

export { layoutConst_1 as layoutConst };

function prettyLayoutOfMemberSig_1(denv, x_0, x_1, x_2, x_3, x_4) {
  const x = [x_0, x_1, x_2, x_3, x_4];
  return function (tupledArg) {
    return PrintTypes.prettyLayoutOfMemberSig(denv, tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3], tupledArg[4]);
  }(x);
}

export { prettyLayoutOfMemberSig_1 as prettyLayoutOfMemberSig };

function prettyLayoutOfUncurriedSig_1(denv, argInfos, tau) {
  return CurriedLambda(function (retTy) {
    return PrintTypes.prettyLayoutOfUncurriedSig(denv, argInfos, tau, retTy);
  });
}

export { prettyLayoutOfUncurriedSig_1 as prettyLayoutOfUncurriedSig };
export const InfoMemberPrinting = function (__exports) {
  const layoutParamData = __exports.layoutParamData = function (denv, _arg1) {
    const isOptArg = _arg1.data[2].IsOptional;
    const matchValue = [_arg1.data[0], _arg1.data[4], isOptArg, tryDestOptionTy(denv.g, _arg1.data[6])];

    if (matchValue[1] == null) {
      return PrintTypes.layoutType(denv, _arg1.data[6]);
    } else if (matchValue[2]) {
      const pty = defaultArg(matchValue[3], _arg1.data[6]);
      return op_HatHat(SepL.questionMark, op_HatHat(wordL(TaggedTextOps.tagParameter(getValue(matchValue[1]).idText)), op_HatHat(RightL.colon, PrintTypes.layoutType(denv, pty))));
    } else if (matchValue[0]) {
      return op_HatHat(PrintUtilities.layoutBuiltinAttribute(denv, denv.g.attrib_ParamArrayAttribute), op_HatHat(wordL(TaggedTextOps.tagParameter(getValue(matchValue[1]).idText)), op_HatHat(RightL.colon, PrintTypes.layoutType(denv, _arg1.data[6]))));
    } else {
      return op_HatHat(wordL(TaggedTextOps.tagParameter(getValue(matchValue[1]).idText)), op_HatHat(RightL.colon, PrintTypes.layoutType(denv, _arg1.data[6])));
    }
  };

  const formatParamDataToBuffer = __exports.formatParamDataToBuffer = function (denv, os, pd) {
    (function (arg10_) {
      bufferL(os, arg10_);
    })(layoutParamData(denv, pd));
  };

  const layoutMethInfoFSharpStyleCore = function (amap, m, denv, minfo, minst) {
    const layout = (!minfo.IsConstructor ? !minfo.IsInstance : false) ? WordL.keywordStatic : emptyL;
    const layout_1 = op_HatHat(layout, op_HatHat(minfo.IsConstructor ? wordL(TaggedTextOps.tagKeyword("new")) : op_HatHat(WordL.keywordMember, PrintTypes.layoutTyparDecls(denv, wordL(TaggedTextOps.tagMethod(minfo.LogicalName)), true, minfo.FormalMethodTypars)), WordL.colon));
    const paramDatas = minfo.GetParamDatas(amap, m, minst);
    const layout_2 = op_HatHat(layout_1, forAll(function (l) {
      return l.tail == null;
    }, paramDatas) ? WordL.structUnit : sepListL(WordL.arrow, map($var56 => {
      var mapping;
      return function (arg10__1) {
        return sepListL(WordL.star, arg10__1);
      }((mapping = function (arg10_) {
        return layoutParamData(denv, arg10_);
      }, function (list) {
        return map(mapping, list);
      })($var56));
    }, paramDatas)));
    const retTy = minfo.GetFSharpReturnTy(amap, m, minst);
    return op_HatHat(layout_2, op_HatHat(WordL.arrow, PrintTypes.layoutType(denv, retTy)));
  };

  const layoutMethInfoCSharpStyle = function (amap, m, denv, minfo, minst) {
    var tcref;
    const retTy = minfo.IsConstructor ? minfo.ApparentEnclosingType : minfo.GetFSharpReturnTy(amap, m, minst);
    const layout = minfo.IsExtensionMember ? op_HatHat(LeftL.leftParen, op_HatHat(wordL(TaggedTextOps.tagKeyword(SR.typeInfoExtension())), RightL.rightParen)) : emptyL;
    const layout_1 = op_HatHat(layout, (tcref = minfo.ApparentEnclosingTyconRef, PrintTypes.layoutTyconRef(denv, tcref)));
    const layout_2 = op_HatHat(layout_1, minfo.IsConstructor ? SepL.leftParen : op_HatHat(SepL.dot, op_HatHat(PrintTypes.layoutTyparDecls(denv, wordL(TaggedTextOps.tagMethod(minfo.LogicalName)), true, minfo.FormalMethodTypars), SepL.leftParen)));
    const paramDatas = minfo.GetParamDatas(amap, m, minst);
    const layout_3 = op_HatHat(layout_2, sepListL(RightL.comma, ($var57 => map(function (arg10_) {
      return layoutParamData(denv, arg10_);
    }, concat($var57)))(paramDatas)));
    return op_HatHat(layout_3, op_HatHat(RightL.rightParen, op_HatHat(WordL.colon, PrintTypes.layoutType(denv, retTy))));
  };

  const prettifyILMethInfo = __exports.prettifyILMethInfo = function (amap, m, minfo, typarInst, ilMethInfo) {
    const patternInput = PrettyTypes.PrettifyInstAndTypes(amap.g, typarInst, new List(ilMethInfo.data[1], minfo.FormalMethodInst));
    const prettyTys = patternInput[0][1];
    const prettyTyparInst = patternInput[0][0];
    const patternInput_1 = List_1.headAndTail(prettyTys);
    const prettyMethInfo = ilMethInfo.data[2] != null ? MethInfo.CreateILExtensionMeth(amap, m, patternInput_1[0], getValue(ilMethInfo.data[2]), minfo.ExtensionMemberPriorityOption, ilMethInfo.data[3]) : MethInfo.CreateILMeth(amap, m, patternInput_1[0], ilMethInfo.data[3]);
    return [prettyTyparInst, prettyMethInfo, patternInput_1[1]];
  };

  const prettyLayoutOfMethInfoFreeStyle = __exports.prettyLayoutOfMethInfoFreeStyle = function (amap, m, denv, typarInst, methInfo) {
    if (methInfo.tag === 0) {
      const patternInput = PrintTastMemberOrVals.prettyLayoutOfValOrMember(new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, denv.showImperativeTyparAnnotations, denv.suppressInlineKeyword, denv.suppressMutableKeyword, true, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, denv.showConstraintTyparAnnotations, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout), typarInst, methInfo.data[2].Deref);
      return [patternInput[0], patternInput[1]];
    } else if (methInfo.tag === 1) {
      const patternInput_1 = prettifyILMethInfo(amap, m, methInfo, typarInst, methInfo.data[1]);
      const resL = layoutMethInfoCSharpStyle(amap, m, denv, patternInput_1[1], patternInput_1[2]);
      return [patternInput_1[0], resL];
    } else {
      const patternInput_2 = PrettyTypes.PrettifyInst(amap.g, typarInst);
      return [patternInput_2[0], op_HatHat(PrintTypes.layoutTyconRef(denv, methInfo.ApparentEnclosingTyconRef), wordL(TaggedTextOps.tagPunctuation("()")))];
    }
  };

  const prettyLayoutOfPropInfoFreeStyle = __exports.prettyLayoutOfPropInfoFreeStyle = function (g, amap, m, denv, pinfo) {
    const rty = pinfo.GetPropertyType(amap, m);
    const rty_1 = pinfo.IsIndexer ? op_MinusMinusGreater(mkRefTupledTy(g, pinfo.GetParamTypes(amap, m)), rty) : rty;
    const patternInput = PrettyTypes.PrettifyType(g, rty_1);
    let tagProp;
    const matchValue = pinfo.ArbitraryValRef;

    if (matchValue != null) {
      tagProp = $var58 => {
        var arg00_;
        return (arg00_ = getValue(matchValue).DefinitionRange, function (arg10_) {
          return mkNav(arg00_, arg10_);
        })(TaggedTextOps.tagProperty($var58));
      };
    } else {
      tagProp = TaggedTextOps.tagProperty;
    }

    const nameL = DemangleOperatorNameAsLayout(tagProp, pinfo.PropertyName);
    return op_HatHat(wordL(TaggedTextOps.tagText(SR.typeInfoProperty())), op_HatHat(layoutTyconRef_1(denv, pinfo.ApparentEnclosingTyconRef), op_HatHat(SepL.dot, op_HatHat(nameL, op_HatHat(RightL.colon, layoutType_1(denv, patternInput[0]))))));
  };

  const formatMethInfoToBufferFreeStyle = __exports.formatMethInfoToBufferFreeStyle = function (amap, m, denv, os, minfo) {
    const patternInput = prettyLayoutOfMethInfoFreeStyle(amap, m, denv, emptyTyparInst, minfo);

    (function (arg10_) {
      bufferL(os, arg10_);
    })(patternInput[1]);
  };

  const layoutMethInfoFSharpStyle = __exports.layoutMethInfoFSharpStyle = function (amap, m, denv, minfo) {
    return layoutMethInfoFSharpStyleCore(amap, m, denv, minfo, minfo.FormalMethodInst);
  };

  return __exports;
}({});

const TastDefinitionPrinting = function (__exports) {
  const layoutExtensionMember = __exports.layoutExtensionMember = function (denv, v) {
    const tycon = v.MemberApparentEntity.Deref;
    const nameL = wordL(mkNav(v.DefinitionRange, TaggedTextOps.tagMethod(tycon.DisplayName)));
    const nameL_1 = PrintTypes.layoutAccessibility(denv, tycon.Accessibility, nameL);
    let tps;
    const matchValue = PartitionValTyparsForApparentEnclosingType(denv.g, v);

    if (matchValue == null) {
      tps = new List();
    } else {
      const memberParentTypars = getValue(matchValue)[1];
      tps = memberParentTypars;
    }

    const lhsL = op_HatHat(WordL.keywordType, PrintTypes.layoutTyparDecls(denv, nameL_1, tycon.IsPrefixDisplay, tps));
    const memberL = PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv, v);
    return op_AtAtMinusMinus(op_HatHat(lhsL, WordL.keywordWith), memberL);
  };

  const layoutExtensionMembers = __exports.layoutExtensionMembers = function (denv, vs) {
    return aboveListL(map(function (v) {
      return layoutExtensionMember(denv, v);
    }, vs));
  };

  const layoutRecdField = __exports.layoutRecdField = function (addAccess, denv, fld) {
    const lhs = wordL(mkNav(fld.DefinitionRange, TaggedTextOps.tagRecordField(fld.Name)));
    const lhs_1 = addAccess ? PrintTypes.layoutAccessibility(denv, fld.Accessibility, lhs) : lhs;
    const lhs_2 = fld.IsMutable ? op_MinusMinusMinus(wordL(TaggedTextOps.tagKeyword("mutable")), lhs_1) : lhs_1;
    return op_MinusMinusMinus(op_HatHat(lhs_2, RightL.colon), PrintTypes.layoutType(denv, fld.FormalType));
  };

  const layoutUnionOrExceptionField = __exports.layoutUnionOrExceptionField = function (denv, isGenerated, i, fld) {
    if (isGenerated(i, fld)) {
      return PrintTypes.layoutTypeWithInfoAndPrec(denv, SimplifyTypes.typeSimplificationInfo0, 2, fld.FormalType);
    } else {
      return layoutRecdField(false, denv, fld);
    }
  };

  const isGeneratedUnionCaseField = __exports.isGeneratedUnionCaseField = function (pos, f) {
    if (pos < 0) {
      return f.Name === "Item";
    } else {
      return f.Name === "Item" + (pos + 1).toString();
    }
  };

  const isGeneratedExceptionField = __exports.isGeneratedExceptionField = function (pos, f) {
    return f.Name === "Data" + pos.toString();
  };

  const layoutUnionCaseFields = __exports.layoutUnionCaseFields = function (denv, isUnionCase, fields) {
    const $var59 = fields.tail != null ? fields.tail.tail == null ? isUnionCase ? [0, fields.head] : [1] : [1] : [1];

    switch ($var59[0]) {
      case 0:
        return layoutUnionOrExceptionField(denv, function (pos, f) {
          return isGeneratedUnionCaseField(pos, f);
        }, -1, $var59[1]);

      case 1:
        const isGenerated = isUnionCase ? function (pos_1, f_1) {
          return isGeneratedUnionCaseField(pos_1, f_1);
        } : function (pos_2, f_2) {
          return isGeneratedExceptionField(pos_2, f_2);
        };
        return sepListL(wordL(TaggedTextOps.tagPunctuation("*")), mapIndexed(function (i, fld) {
          return layoutUnionOrExceptionField(denv, isGenerated, i, fld);
        }, fields));
    }
  };

  const layoutUnionCase = __exports.layoutUnionCase = function (denv, prefixL, ucase) {
    const nmL = DemangleOperatorNameAsLayout($var60 => {
      var arg00_;
      return (arg00_ = ucase.DefinitionRange, function (arg10_) {
        return mkNav(arg00_, arg10_);
      })(TaggedTextOps.tagUnionCase($var60));
    }, ucase.Id.idText);
    const matchValue = ucase.RecdFields;

    if (matchValue.tail == null) {
      return op_HatHat(prefixL, nmL);
    } else {
      return op_MinusMinusMinus(op_HatHat(prefixL, op_HatHat(nmL, WordL.keywordOf)), layoutUnionCaseFields(denv, true, matchValue));
    }
  };

  const layoutUnionCases = __exports.layoutUnionCases = function (denv, ucases) {
    const prefixL = WordL.bar;
    return map(function (ucase) {
      return layoutUnionCase(denv, prefixL, ucase);
    }, ucases);
  };

  const breakTypeDefnEqn = __exports.breakTypeDefnEqn = function (repr) {
    switch (repr.tag) {
      case 2:
        return !(() => {
          const $var61 = repr.data.CasesTable.UnionCasesAsList;
          const $var62 = $var61.tail != null ? $var61.tail.tail == null ? [0] : [1] : [0];

          switch ($var62[0]) {
            case 0:
              return true;

            case 1:
              return false;
          }
        })();

      case 1:
        return true;

      case 4:
      case 3:
      case 5:
      case 6:
        return false;

      default:
        return true;
    }
  };

  const layoutTycon = __exports.layoutTycon = function (denv, infoReader, ad, m, simplified, typewordL, tycon) {
    const patternInput = generalizeTyconRef(mkLocalTyconRef(tycon));
    let patternInput_1;
    const n = tycon.DisplayName;

    if (isStructTy(denv.g, patternInput[1])) {
      patternInput_1 = ["struct", TaggedTextOps.tagStruct(n)];
    } else if (isInterfaceTy(denv.g, patternInput[1])) {
      patternInput_1 = ["interface", TaggedTextOps.tagInterface(n)];
    } else if (isClassTy(denv.g, patternInput[1])) {
      patternInput_1 = [simplified ? null : "class", TaggedTextOps.tagClass(n)];
    } else {
      patternInput_1 = [null, TaggedTextOps.tagUnknownType(n)];
    }

    const name = mkNav(tycon.DefinitionRange, patternInput_1[1]);
    const nameL = PrintTypes.layoutAccessibility(denv, tycon.Accessibility, wordL(name));
    const denv_1 = denv.AddAccessibility(tycon.Accessibility);
    let lhsL;
    const tps = tycon.TyparsNoRange;
    const tpsL = PrintTypes.layoutTyparDecls(denv_1, nameL, tycon.IsPrefixDisplay, tps);
    lhsL = op_HatHat(typewordL, tpsL);
    const start = defaultArg(patternInput_1[0], null, TaggedTextOps.tagKeyword);
    [infoReader, ad, m];
    let patternInput_2;
    const adhoc = filter(function (v) {
      return denv_1.showHiddenMembers ? true : !CheckFSharpAttributesForHidden(denv_1.g, v.Attribs);
    }, filter(function (v_1) {
      return denv_1.showObsoleteMembers ? true : !CheckFSharpAttributesForObsolete(denv_1.g, v_1.Attribs);
    }, filter(function (v_2) {
      const matchValue = getValue(v_2.MemberInfo).ImplementedSlotSigs;

      if (matchValue.tail == null) {
        return true;
      } else {
        const oty = matchValue.head.data[1];

        if (denv_1.showOverrides) {
          return !isInterfaceTy(denv_1.g, oty);
        } else {
          return false;
        }
      }
    }, filter(function (v_3) {
      return !v_3.Deref.IsClassConstructor;
    }, filter(function (v_4) {
      return !v_4.IsDispatchSlot;
    }, tycon.MembersOfFSharpTyconSorted)))));

    const sortKey = function (v_5) {
      var copyOfStruct;
      return [!v_5.IsConstructor, (copyOfStruct = v_5.Id, copyOfStruct.idText), v_5.IsCompiledAsTopLevel ? getValue(v_5.ValReprInfo).NumCurriedArgs : 0, v_5.IsCompiledAsTopLevel ? getValue(v_5.ValReprInfo).AritiesOfArgs : new List()];
    };

    const adhoc_1 = function (list) {
      return toList(sortWith(($var63, $var64) => compare(sortKey($var63), sortKey($var64)), list));
    }(adhoc);

    let iimpls;
    const matchValue_1 = tycon.TypeReprInfo;
    const $var65 = matchValue_1.tag === 0 ? (matchValue_1.data.fsobjmodel_kind.tag === 1 ? true : false) ? [0, matchValue_1.data] : [1] : [1];

    switch ($var65[0]) {
      case 0:
        iimpls = new List();
        break;

      case 1:
        iimpls = tycon.ImmediateInterfacesOfFSharpTycon;
        break;
    }

    const iimpls_1 = filter(function (tupledArg) {
      return !tupledArg[1];
    }, iimpls);
    const iimplsLs = map(function (tupledArg_1) {
      return op_MinusMinusMinus(wordL(TaggedTextOps.tagKeyword("interface")), PrintTypes.layoutType(denv_1, tupledArg_1[0]));
    }, iimpls_1);
    const adhocCtorsLs = map(function (vref) {
      return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv_1, vref.Deref);
    }, filter(function (v_6) {
      return v_6.IsConstructor;
    }, adhoc_1));
    const adhocInstanceLs = map(function (vref_1) {
      return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv_1, vref_1.Deref);
    }, filter(function (v_7) {
      return !v_7.IsConstructor ? v_7.IsInstanceMember : false;
    }, adhoc_1));
    const adhocStaticLs = map(function (vref_2) {
      return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv_1, vref_2.Deref);
    }, filter(function (v_8) {
      return !v_8.IsConstructor ? !v_8.IsInstanceMember : false;
    }, adhoc_1));
    patternInput_2 = [iimplsLs, adhocCtorsLs, adhocInstanceLs, adhocStaticLs];
    const memberLs = append(patternInput_2[0], append(patternInput_2[1], append(patternInput_2[2], patternInput_2[3])));

    const addMembersAsWithEnd = function (reprL) {
      if (memberLs.tail == null) {
        return reprL;
      } else {
        const memberLs_1 = PrintUtilities.applyMaxMembers(denv_1.maxMembers, memberLs);

        if (simplified) {
          return op_AtAtMinusMinus(reprL, aboveListL(memberLs_1));
        } else {
          return op_AtAt(reprL, op_AtAt(op_AtAtMinusMinus(WordL.keywordWith, aboveListL(memberLs_1)), WordL.keywordEnd));
        }
      }
    };

    let reprL_1;
    const repr = tycon.TypeReprInfo;

    switch (repr.tag) {
      case 1:
      case 2:
      case 0:
      case 4:
      case 5:
      case 3:
        const brk = !(memberLs.tail == null) ? true : breakTypeDefnEqn(repr);
        let rhsL;

        const addReprAccessL = function (l) {
          return PrintTypes.layoutAccessibility(denv_1, tycon.TypeReprAccessibility, l);
        };

        const denv_2 = denv_1.AddAccessibility(tycon.TypeReprAccessibility);

        switch (repr.tag) {
          case 1:
            const recdFieldRefL = function (fld) {
              return op_HatHat(layoutRecdField(false, denv_2, fld), rightL(TaggedTextOps.tagPunctuation(";")));
            };

            const recdL = PrintUtilities.braceL(aboveListL(PrintUtilities.applyMaxMembers(denv_2.maxMembers, function (list_1) {
              return map(recdFieldRefL, list_1);
            }(tycon.TrueFieldsAsList))));
            rhsL = addMembersAsWithEnd(addReprAccessL(recdL));
            break;

          case 0:
            if (repr.data.fsobjmodel_kind.tag === 3) {
              const rty = repr.data.fsobjmodel_kind.data.data[5];
              const paraml = repr.data.fsobjmodel_kind.data.data[4];
              const rty_1 = GetFSharpViewOfReturnType(denv_2.g, rty);
              rhsL = op_HatHat(WordL.keywordDelegate, op_MinusMinusMinus(WordL.keywordOf, PrintTypes.layoutTopType(denv_2, SimplifyTypes.typeSimplificationInfo0, List_1.mapSquared(function (sp) {
                return [sp.Type, ValReprInfoModule.unnamedTopArg1];
              }, paraml), rty_1, new List())));
            } else if (repr.data.fsobjmodel_kind.tag === 4) {
              rhsL = aboveListL(map(function (f) {
                const matchValue_2 = f.LiteralValue;

                if (matchValue_2 != null) {
                  return op_HatHat(WordL.bar, op_HatHat(wordL(TaggedTextOps.tagField(f.Name)), op_HatHat(WordL.equals, PrintTypes.layoutConst(denv_2.g, patternInput[1], getValue(matchValue_2)))));
                } else {
                  return emptyL;
                }
              }, tycon.TrueFieldsAsList));
            } else {
              let inherits;
              const matchValue_3 = [repr.data.fsobjmodel_kind, tycon.TypeContents.tcaug_super];
              const $var66 = matchValue_3[0].tag === 0 ? matchValue_3[1] != null ? [0] : [2] : matchValue_3[0].tag === 1 ? [1] : [2];

              switch ($var66[0]) {
                case 0:
                  const _super = getValue(matchValue_3[1]);

                  inherits = ofArray([op_HatHat(wordL(TaggedTextOps.tagKeyword("inherit")), PrintTypes.layoutType(denv_2, _super))]);
                  break;

                case 1:
                  inherits = map(function (tupledArg_2) {
                    return op_HatHat(wordL(TaggedTextOps.tagKeyword("inherit")), PrintTypes.layoutType(denv_2, tupledArg_2[0]));
                  }, filter(function (tupledArg_3) {
                    return !tupledArg_3[1];
                  }, tycon.ImmediateInterfacesOfFSharpTycon));
                  break;

                case 2:
                  inherits = new List();
                  break;
              }

              const vsprs = map(function (vref_3) {
                return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv_2, vref_3.Deref);
              }, filter(function (v_9) {
                return v_9.IsDispatchSlot;
              }, filter(function (v_10) {
                return getValue(v_10.MemberInfo).ImplementedSlotSigs.tail == null;
              }, tycon.MembersOfFSharpTyconSorted)));
              const staticValsLs = map(function (f_1) {
                return op_HatHat(WordL.keywordStatic, op_HatHat(WordL.keywordVal, layoutRecdField(true, denv_2, f_1)));
              }, filter(function (f_2) {
                return f_2.IsStatic;
              }, tycon.TrueFieldsAsList));
              const instanceValsLs = map(function (f_3) {
                return op_HatHat(WordL.keywordVal, layoutRecdField(true, denv_2, f_3));
              }, filter(function (f_4) {
                return !f_4.IsStatic;
              }, tycon.TrueFieldsAsList));
              const alldecls = append(inherits, append(patternInput_2[0], append(patternInput_2[1], append(instanceValsLs, append(vsprs, append(patternInput_2[2], append(staticValsLs, patternInput_2[3])))))));

              if (alldecls.tail == null) {
                rhsL = null;
              } else {
                const alldecls_1 = PrintUtilities.applyMaxMembers(denv_2.maxMembers, alldecls);
                let emptyMeasure;
                const matchValue_4 = tycon.TypeOrMeasureKind;

                if (matchValue_4.tag === 1) {
                  emptyMeasure = alldecls_1.tail == null;
                } else {
                  emptyMeasure = false;
                }

                if (emptyMeasure) {
                  rhsL = null;
                } else {
                  const declsL = aboveListL(alldecls_1);
                  const declsL_1 = start == null ? declsL : op_AtAt(op_AtAtMinusMinus(wordL(getValue(start)), declsL), wordL(TaggedTextOps.tagKeyword("end")));
                  rhsL = declsL_1;
                }
              }
            }

            break;

          case 2:
            const layoutUnionCases_1 = aboveListL(PrintUtilities.applyMaxMembers(denv_2.maxMembers, function (ucases) {
              return layoutUnionCases(denv_2, ucases);
            }(tycon.UnionCasesAsList)));
            rhsL = addMembersAsWithEnd(addReprAccessL(layoutUnionCases_1));
            break;

          case 4:
            rhsL = wordL(TaggedTextOps.tagText("(# \"<Common IL Type Omitted>\" #)"));
            break;

          case 5:
            rhsL = PrintTypes.layoutType(denv_2, repr.data);
            break;

          case 3:
            const td = tycon.ILTyconRawMetadata;
            rhsL = PrintIL.layoutILTypeDef(denv_2, td);
            break;

          default:
            rhsL = null;
        }

        let brk_1;
        const matchValue_5 = tycon.TypeReprInfo;

        if (matchValue_5.tag === 3) {
          brk_1 = true;
        } else {
          brk_1 = brk;
        }

        if (rhsL != null) {
          if (brk_1) {
            reprL_1 = op_AtAtMinusMinus(op_HatHat(lhsL, WordL.equals), getValue(rhsL));
          } else {
            reprL_1 = op_MinusMinusMinus(op_HatHat(lhsL, WordL.equals), getValue(rhsL));
          }
        } else {
          reprL_1 = lhsL;
        }

        break;

      default:
        const matchValue_6 = tycon.TypeAbbrev;

        if (matchValue_6 != null) {
          reprL_1 = op_MinusMinusMinus(op_HatHat(lhsL, WordL.equals), PrintTypes.layoutType(new DisplayEnv(denv_1.includeStaticParametersInTypeNames, denv_1.openTopPathsSorted, denv_1.openTopPathsRaw, false, denv_1.suppressNestedTypes, denv_1.maxMembers, denv_1.showObsoleteMembers, denv_1.showHiddenMembers, denv_1.showTyparBinding, denv_1.showImperativeTyparAnnotations, denv_1.suppressInlineKeyword, denv_1.suppressMutableKeyword, denv_1.showMemberContainers, denv_1.shortConstraints, denv_1.useColonForReturnType, denv_1.showAttributes, denv_1.showOverrides, denv_1.showConstraintTyparAnnotations, denv_1.abbreviateAdditionalConstraints, denv_1.showTyparDefaultConstraints, denv_1.g, denv_1.contextAccessibility, denv_1.generatedValueLayout), getValue(matchValue_6)));
        } else {
          reprL_1 = addMembersAsWithEnd(op_HatHat(lhsL, WordL.equals));
        }

    }

    return PrintTypes.layoutAttribs(denv_1, patternInput[1], tycon.TypeOrMeasureKind, tycon.Attribs, reprL_1);
  };

  const layoutExnDefn = __exports.layoutExnDefn = function (denv, exnc) {
    const nm = exnc.LogicalName;
    const nmL = wordL(TaggedTextOps.tagClass(nm));
    const nmL_1 = PrintTypes.layoutAccessibility(denv, exnc.TypeReprAccessibility, nmL);
    const exnL = op_HatHat(wordL(TaggedTextOps.tagKeyword("exception")), nmL_1);
    let reprL;
    const matchValue = exnc.ExceptionInfo;

    if (matchValue.tag === 1) {
      reprL = op_MinusMinusMinus(WordL.equals, wordL(TaggedTextOps.tagText("(# ... #)")));
    } else if (matchValue.tag === 3) {
      reprL = emptyL;
    } else if (matchValue.tag === 2) {
      const matchValue_1 = matchValue.data.TrueFieldsAsList;

      if (matchValue_1.tail == null) {
        reprL = emptyL;
      } else {
        reprL = op_MinusMinusMinus(WordL.keywordOf, layoutUnionCaseFields(denv, false, matchValue_1));
      }
    } else {
      reprL = op_MinusMinusMinus(WordL.equals, PrintTypes.layoutTyconRef(denv, matchValue.data));
    }

    return op_HatHat(exnL, reprL);
  };

  const layoutTyconDefns = __exports.layoutTyconDefns = function (denv, infoReader, ad, m, tycons) {
    var typewordL;
    const $var67 = tycons.tail != null ? tycons.tail.tail == null ? tycons.head.IsExceptionDecl ? [1, tycons.head] : [2] : [2] : [0];

    switch ($var67[0]) {
      case 0:
        return emptyL;

      case 1:
        return layoutExnDefn(denv, $var67[1]);

      case 2:
        if (tycons.tail != null) {
          const x = layoutTycon(denv, infoReader, ad, m, false, WordL.keywordType, tycons.head);
          const xs = map((typewordL = wordL(TaggedTextOps.tagKeyword("and")), function (tycon) {
            return layoutTycon(denv, infoReader, ad, m, false, typewordL, tycon);
          }), tycons.tail);
          return aboveListL(new List(x, xs));
        } else {
          throw new Error("C:/projects/fcs/src/fsharp/NicePrint.fs", 1834, 14);
        }

    }
  };

  return __exports;
}({});

const InferredSigPrinting = function (__exports) {
  const layoutInferredSigOfModuleExpr = __exports.layoutInferredSigOfModuleExpr = function (showHeader, denv, infoReader, ad, m, expr) {
    const isConcreteNamespace = function (x) {
      isConcreteNamespace: while (true) {
        switch (x.tag) {
          case 2:
            return true;

          case 3:
            return true;

          case 1:
            return exists(isConcreteNamespace, x.data);

          case 0:
            const def = x.data.data[1];
            x = def;
            continue isConcreteNamespace;

          default:
            if (!(x.data[1].tail == null)) {
              return true;
            } else {
              return exists(function (_arg1) {
                return _arg1.tag === 1 ? !_arg1.data[0].IsNamespace : true;
              }, x.data[2]);
            }

        }
      }
    };

    const imexprLP = function (denv_1, _arg2) {
      return imdefL(denv_1, _arg2.data[1]);
    };

    const imexprL = function (denv_2, _arg3) {
      return imexprLP(denv_2, new ModuleOrNamespaceExprWithSig(0, [_arg3.data[0], _arg3.data[1], _arg3.data[2]]));
    };

    const imdefsL = function (denv_3, x_1) {
      return aboveListL(map(CurriedLambda(imdefL)(denv_3), x_1));
    };

    const imdefL = function (denv_4, x_2) {
      const filterVal = function (v) {
        if (!v.IsCompilerGenerated) {
          return v.MemberInfo == null;
        } else {
          return false;
        }
      };

      const filterExtMem = function (v_1) {
        return v_1.IsExtensionMember;
      };

      switch (x_2.tag) {
        case 2:
          return aboveListL(map(function (v_2) {
            return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv_4, v_2);
          }, function (list) {
            return filter(filterVal, list);
          }(ofArray([x_2.data[0].Var]))));

        case 1:
          return imdefsL(denv_4, x_2.data);

        case 3:
          return emptyL;

        case 0:
          return imexprLP(denv_4, x_2.data);

        default:
          return op_AtAt(TastDefinitionPrinting.layoutTyconDefns(denv_4, infoReader, ad, m, x_2.data[1]), op_AtAt(function (vs) {
            return TastDefinitionPrinting.layoutExtensionMembers(denv_4, vs);
          }(function (list_1) {
            return filter(filterExtMem, list_1);
          }(valsOfBinds(choose(function (_arg4) {
            return _arg4.tag === 0 ? _arg4.data : null;
          }, x_2.data[2])))), op_AtAt(aboveListL(map(function (v_3) {
            return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv_4, v_3);
          }, function (list_2) {
            return filter(filterVal, list_2);
          }(valsOfBinds(choose(function (_arg5) {
            return _arg5.tag === 0 ? _arg5.data : null;
          }, x_2.data[2]))))), aboveListL(map(CurriedLambda(imbindL)(denv_4), choose(function (_arg6) {
            return _arg6.tag === 1 ? [_arg6.data[0], _arg6.data[1]] : null;
          }, x_2.data[2]))))));
      }
    };

    const imbindL = function (denv_5, tupledArg) {
      const nm = tupledArg[0].DemangledModuleOrNamespaceName;
      const innerPath = fullCompPathOfModuleOrNamespace(tupledArg[0]).AccessPath;
      const outerPath = tupledArg[0].CompilationPath.AccessPath;
      const denv_6 = denv_5.AddOpenPath(map(function (tuple) {
        return tuple[0];
      }, innerPath));

      if (tupledArg[0].IsNamespace) {
        const basic = imdefL(denv_6, tupledArg[1]);

        if (isConcreteNamespace(tupledArg[1])) {
          const headerL = op_HatHat(wordL(TaggedTextOps.tagKeyword("namespace")), sepListL(SepL.dot, map($var69 => function (arg00_) {
            return wordL(arg00_);
          }(($var68 => TaggedTextOps.tagNamespace(function (tuple_1) {
            return tuple_1[0];
          }($var68)))($var69)), innerPath)));
          return op_AtAtMinusMinus(headerL, basic);
        } else {
          return basic;
        }
      } else {
        const nmL = PrintTypes.layoutAccessibility(denv_6, tupledArg[0].Accessibility, wordL(TaggedTextOps.tagModule(nm)));
        const denv_7 = denv_6.AddAccessibility(tupledArg[0].Accessibility);
        const basic_1 = imdefL(denv_7, tupledArg[1]);

        if (forAll(function (tupledArg_1) {
          return tupledArg_1[1].Equals(new ModuleOrNamespaceKind(2));
        }, outerPath)) {
          if (showHeader) {
            if (outerPath.tail == null) {
              return op_AtAt(op_HatHat(wordL(TaggedTextOps.tagKeyword("module")), nmL), basic_1);
            } else {
              return op_AtAt(op_AtAtMinusMinus(op_HatHat(wordL(TaggedTextOps.tagKeyword("module")), op_HatHat(nmL, op_HatHat(WordL.equals, wordL(TaggedTextOps.tagKeyword("begin"))))), basic_1), WordL.keywordEnd);
            }
          } else {
            return basic_1;
          }
        } else {
          return op_AtAt(op_AtAtMinusMinus(op_HatHat(wordL(TaggedTextOps.tagKeyword("module")), op_HatHat(nmL, op_HatHat(WordL.equals, wordL(TaggedTextOps.tagKeyword("begin"))))), basic_1), WordL.keywordEnd);
        }
      }
    };

    return imexprL(denv, expr);
  };

  return __exports;
}({});

const PrintData = function (__exports) {
  const dataExprL = __exports.dataExprL = function (denv, expr) {
    return dataExprWrapL(denv, false, expr);
  };

  const dataExprWrapL = __exports.dataExprWrapL = function (denv, isAtomic, expr) {
    dataExprWrapL: while (true) {
      const $var70 = expr.tag === 0 ? [0, expr.data[0], expr.data[2]] : expr.tag === 1 ? [1, expr.data[0]] : expr.tag === 14 ? [2, expr.data] : expr.tag === 11 ? expr.data[0].tag === 0 ? [3, expr.data[2], expr.data[0].data] : expr.data[0].tag === 1 ? [4, expr.data[2], expr.data[0].data] : expr.data[0].tag === 2 ? [5, expr.data[2]] : expr.data[0].tag === 10 ? [6, expr.data[0].data[1], expr.data[2]] : expr.data[0].tag === 3 ? expr.data[1].tail != null ? expr.data[1].tail.tail == null ? [7, expr.data[2]] : [8] : [8] : [8] : [8];

      switch ($var70[0]) {
        case 0:
          if (isEnumTy(denv.g, $var70[2])) {
            return op_HatHat(wordL(TaggedTextOps.tagKeyword("enum")), op_HatHat(PrintUtilities.angleL(PrintTypes.layoutType(denv, $var70[2])), bracketL(PrintTypes.layoutConst(denv.g, $var70[2], $var70[1]))));
          } else {
            return PrintTypes.layoutConst(denv.g, $var70[2], $var70[1]);
          }

        case 1:
          return wordL(TaggedTextOps.tagLocal($var70[1].DisplayName));

        case 2:
          denv = denv;
          isAtomic = isAtomic;
          expr = $var70[1].contents;
          continue dataExprWrapL;

        case 3:
          if (function (arg00, arg10) {
            return denv.g.unionCaseRefEq(arg00, arg10);
          }($var70[2], denv.g.nil_ucref)) {
            return wordL(TaggedTextOps.tagPunctuation("[]"));
          } else if (function (arg00_1, arg10_1) {
            return denv.g.unionCaseRefEq(arg00_1, arg10_1);
          }($var70[2], denv.g.cons_ucref)) {
            const strip = function (_arg1) {
              const $var71 = _arg1.tag === 11 ? _arg1.data[0].tag === 0 ? _arg1.data[2].tail != null ? _arg1.data[2].tail.tail != null ? _arg1.data[2].tail.tail.tail == null ? [0, _arg1.data[2].head, _arg1.data[2].tail.head] : [1] : [1] : [1] : [1] : [1];

              switch ($var71[0]) {
                case 0:
                  return new List($var71[1], strip($var71[2]));

                case 1:
                  return new List();
              }
            };

            return listL(function (expr_1) {
              return dataExprL(denv, expr_1);
            }, strip(expr));
          } else if ($var70[1].tail == null) {
            return wordL(TaggedTextOps.tagUnionCase($var70[2].CaseName));
          } else {
            return op_PlusPlus(wordL(TaggedTextOps.tagUnionCase($var70[2].CaseName)), bracketL(commaListL(dataExprsL(denv, $var70[1]))));
          }

        case 4:
          return op_PlusPlus(wordL(TaggedTextOps.tagMethod($var70[2].LogicalName)), bracketL(commaListL(dataExprsL(denv, $var70[1]))));

        case 5:
          return tupleL(dataExprsL(denv, $var70[1]));

        case 6:
          const fields = $var70[1].TrueInstanceFieldsAsList;

          const lay = function (fs, x) {
            return op_MinusMinusMinus(op_HatHat(wordL(TaggedTextOps.tagRecordField(fs.rfield_id.idText)), sepL(TaggedTextOps.tagPunctuation("="))), dataExprL(denv, x));
          };

          return op_HatHat(leftL(TaggedTextOps.tagPunctuation("{")), op_HatHat(semiListL(toList(map2(lay, fields, $var70[2]))), rightL(TaggedTextOps.tagPunctuation("}"))));

        case 7:
          return op_HatHat(leftL(TaggedTextOps.tagPunctuation("[|")), op_HatHat(semiListL(dataExprsL(denv, $var70[1])), RightL.rightBracketBar));

        case 8:
          return wordL(TaggedTextOps.tagPunctuation("?"));
      }
    }
  };

  const dataExprsL = __exports.dataExprsL = function (denv, xs) {
    return map(function (expr) {
      return dataExprL(denv, expr);
    }, xs);
  };

  return __exports;
}({});

function dataExprL_1(denv, expr) {
  return PrintData.dataExprL(denv, expr);
}

export { dataExprL_1 as dataExprL };
export function outputValOrMember(denv, os, x) {
  (function (arg10_) {
    bufferL(os, arg10_);
  })(function (v) {
    return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv, v);
  }(x));
}
export function stringValOrMember(denv, x) {
  return showL(function (v) {
    return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv, v);
  }(x));
}
export function layoutQualifiedValOrMember(denv, typarInst, v) {
  return PrintTastMemberOrVals.prettyLayoutOfValOrMember(new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, denv.showImperativeTyparAnnotations, denv.suppressInlineKeyword, denv.suppressMutableKeyword, true, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, denv.showConstraintTyparAnnotations, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout), typarInst, v);
}
export function outputQualifiedValOrMember(denv, os, v) {
  outputValOrMember(new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, denv.showImperativeTyparAnnotations, denv.suppressInlineKeyword, denv.suppressMutableKeyword, true, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, denv.showConstraintTyparAnnotations, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout), os, v);
}
export function outputQualifiedValSpec(denv, os, v) {
  outputQualifiedValOrMember(denv, os, v);
}
export function stringOfQualifiedValOrMember(denv, v) {
  return showL(PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, denv.showImperativeTyparAnnotations, denv.suppressInlineKeyword, denv.suppressMutableKeyword, true, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, denv.showConstraintTyparAnnotations, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout), v));
}

function formatMethInfoToBufferFreeStyle_1(amap, m, denv, buf, d) {
  InfoMemberPrinting.formatMethInfoToBufferFreeStyle(amap, m, denv, buf, d);
}

export { formatMethInfoToBufferFreeStyle_1 as formatMethInfoToBufferFreeStyle };

function prettyLayoutOfMethInfoFreeStyle_1(amap, m, denv, typarInst, minfo) {
  return InfoMemberPrinting.prettyLayoutOfMethInfoFreeStyle(amap, m, denv, typarInst, minfo);
}

export { prettyLayoutOfMethInfoFreeStyle_1 as prettyLayoutOfMethInfoFreeStyle };

function prettyLayoutOfPropInfoFreeStyle_1(g, amap, m, denv, d) {
  return InfoMemberPrinting.prettyLayoutOfPropInfoFreeStyle(g, amap, m, denv, d);
}

export { prettyLayoutOfPropInfoFreeStyle_1 as prettyLayoutOfPropInfoFreeStyle };
export function stringOfMethInfo(amap, m, denv, d) {
  return bufs(function (buf) {
    InfoMemberPrinting.formatMethInfoToBufferFreeStyle(amap, m, denv, buf, d);
  });
}
export function stringOfParamData(denv, paramData) {
  return bufs(function (buf) {
    InfoMemberPrinting.formatParamDataToBuffer(denv, buf, paramData);
  });
}
export function layoutOfParamData(denv, paramData) {
  return InfoMemberPrinting.layoutParamData(denv, paramData);
}
export function outputILTypeRef(denv, os, x) {
  (function (arg10_) {
    bufferL(os, arg10_);
  })(function (tref) {
    return PrintIL.layoutILTypeRef(denv, tref);
  }(x));
}

function layoutILTypeRef_1(denv, x) {
  return function (tref) {
    return PrintIL.layoutILTypeRef(denv, tref);
  }(x);
}

export { layoutILTypeRef_1 as layoutILTypeRef };
export function outputExnDef(denv, os, x) {
  (function (arg10_) {
    bufferL(os, arg10_);
  })(function (exnc) {
    return TastDefinitionPrinting.layoutExnDefn(denv, exnc);
  }(x));
}
export function layoutExnDef(denv, x) {
  return function (exnc) {
    return TastDefinitionPrinting.layoutExnDefn(denv, exnc);
  }(x);
}
export function stringOfTyparConstraints(denv, x) {
  return showL(function (cxs) {
    return PrintTypes.layoutConstraintsWithInfo(denv, SimplifyTypes.typeSimplificationInfo0, cxs);
  }(x));
}
export function outputTycon(denv, infoReader, ad, m, os, x) {
  (function (arg10_) {
    bufferL(os, arg10_);
  })(TastDefinitionPrinting.layoutTycon(denv, infoReader, ad, m, true, WordL.keywordType, x));
}

function layoutTycon_1(denv, infoReader, ad, m, x) {
  return TastDefinitionPrinting.layoutTycon(denv, infoReader, ad, m, true, WordL.keywordType, x);
}

export { layoutTycon_1 as layoutTycon };

function layoutUnionCases_1(denv, x) {
  return function (fields) {
    return TastDefinitionPrinting.layoutUnionCaseFields(denv, true, fields);
  }(x);
}

export { layoutUnionCases_1 as layoutUnionCases };
export function outputUnionCases(denv, os, x) {
  (function (arg10_) {
    bufferL(os, arg10_);
  })(function (fields) {
    return TastDefinitionPrinting.layoutUnionCaseFields(denv, true, fields);
  }(x));
}

function isGeneratedUnionCaseField_1(pos, f) {
  return TastDefinitionPrinting.isGeneratedUnionCaseField(pos, f);
}

export { isGeneratedUnionCaseField_1 as isGeneratedUnionCaseField };

function isGeneratedExceptionField_1(pos, f) {
  return TastDefinitionPrinting.isGeneratedExceptionField(pos, f);
}

export { isGeneratedExceptionField_1 as isGeneratedExceptionField };
export function stringOfTyparConstraint(denv, tpc_0, tpc_1) {
  const tpc = [tpc_0, tpc_1];
  return stringOfTyparConstraints(denv, ofArray([tpc]));
}
export function stringOfTy(denv, x) {
  return showL(function (typ) {
    return PrintTypes.layoutType(denv, typ);
  }(x));
}

function prettyLayoutOfType_1(denv, x) {
  return function (typ) {
    return PrintTypes.prettyLayoutOfType(denv, typ);
  }(x);
}

export { prettyLayoutOfType_1 as prettyLayoutOfType };
export function prettyStringOfTy(denv, x) {
  return showL(function (typ) {
    return PrintTypes.prettyLayoutOfType(denv, typ);
  }(x));
}
export function prettyStringOfTyNoCx(denv, x) {
  return showL(function (typ) {
    return PrintTypes.prettyLayoutOfTypeNoConstraints(denv, typ);
  }(x));
}
export function stringOfRecdField(denv, x) {
  return showL(function (fld) {
    return TastDefinitionPrinting.layoutRecdField(false, denv, fld);
  }(x));
}
export function stringOfUnionCase(denv, x) {
  return showL(function (ucase) {
    return TastDefinitionPrinting.layoutUnionCase(denv, WordL.bar, ucase);
  }(x));
}
export function stringOfExnDef(denv, x) {
  return showL(function (exnc) {
    return TastDefinitionPrinting.layoutExnDefn(denv, exnc);
  }(x));
}
export function stringOfFSAttrib(denv, x) {
  return showL(PrintUtilities.squareAngleL(function (arg10_) {
    return PrintTypes.layoutAttrib(denv, arg10_);
  }(x)));
}
export function stringOfILAttrib(denv, x_0, x_1) {
  const x = [x_0, x_1];
  return showL(PrintUtilities.squareAngleL(function (tupledArg) {
    return PrintTypes.layoutILAttrib(denv, tupledArg[0], tupledArg[1]);
  }(x)));
}

function layoutInferredSigOfModuleExpr_1(showHeader, denv, infoReader, ad, m, expr) {
  return InferredSigPrinting.layoutInferredSigOfModuleExpr(showHeader, denv, infoReader, ad, m, expr);
}

export { layoutInferredSigOfModuleExpr_1 as layoutInferredSigOfModuleExpr };

function prettyLayoutOfValOrMember_1(denv, typarInst, v) {
  return PrintTastMemberOrVals.prettyLayoutOfValOrMember(denv, typarInst, v);
}

export { prettyLayoutOfValOrMember_1 as prettyLayoutOfValOrMember };

function prettyLayoutOfValOrMemberNoInst_1(denv, v) {
  return PrintTastMemberOrVals.prettyLayoutOfValOrMemberNoInst(denv, v);
}

export { prettyLayoutOfValOrMemberNoInst_1 as prettyLayoutOfValOrMemberNoInst };

function prettyLayoutOfInstAndSig_1(denv, x_0, x_1, x_2) {
  const x = [x_0, x_1, x_2];
  return PrintTypes.prettyLayoutOfInstAndSig(denv, x[0], x[1], x[2]);
}

export { prettyLayoutOfInstAndSig_1 as prettyLayoutOfInstAndSig };
export function minimalStringsOfTwoTypes(denv, t1, t2) {
  const patternInput = PrettyTypes.PrettifyTypePair(denv.g, t1, t2);
  const t2_1 = patternInput[0][1];
  const t1_1 = patternInput[0][0];
  let attempt1;
  const denv_1 = new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, false, denv.suppressInlineKeyword, denv.suppressMutableKeyword, denv.showMemberContainers, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, false, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout);
  const min1 = stringOfTy(denv_1, t1_1);
  const min2 = stringOfTy(denv_1, t2_1);

  if (min1 !== min2) {
    attempt1 = [min1, min2, ""];
  } else {
    attempt1 = null;
  }

  if (attempt1 == null) {
    let attempt2;
    const denv_2 = new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, false, denv.suppressInlineKeyword, denv.suppressMutableKeyword, denv.showMemberContainers, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, false, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout).SetOpenPaths(new List());
    const min1_1 = stringOfTy(denv_2, t1_1);
    const min2_1 = stringOfTy(denv_2, t2_1);

    if (min1_1 !== min2_1) {
      attempt2 = [min1_1, min2_1, ""];
    } else {
      attempt2 = null;
    }

    if (attempt2 == null) {
      let attempt3;
      const min1_2 = stringOfTy(denv, t1_1);
      const min2_2 = stringOfTy(denv, t2_1);

      if (min1_2 !== min2_2) {
        attempt3 = [min1_2, min2_2, stringOfTyparConstraints(denv, patternInput[1])];
      } else {
        attempt3 = null;
      }

      if (attempt3 == null) {
        let attempt4;
        const denv_3 = denv.SetOpenPaths(new List());
        const denv_4 = new DisplayEnv(true, denv_3.openTopPathsSorted, denv_3.openTopPathsRaw, denv_3.shortTypeNames, denv_3.suppressNestedTypes, denv_3.maxMembers, denv_3.showObsoleteMembers, denv_3.showHiddenMembers, denv_3.showTyparBinding, denv_3.showImperativeTyparAnnotations, denv_3.suppressInlineKeyword, denv_3.suppressMutableKeyword, denv_3.showMemberContainers, denv_3.shortConstraints, denv_3.useColonForReturnType, denv_3.showAttributes, denv_3.showOverrides, denv_3.showConstraintTyparAnnotations, denv_3.abbreviateAdditionalConstraints, denv_3.showTyparDefaultConstraints, denv_3.g, denv_3.contextAccessibility, denv_3.generatedValueLayout);
        const min1_3 = stringOfTy(denv_4, t1_1);
        const min2_3 = stringOfTy(denv_4, t2_1);

        if (min1_3 !== min2_3) {
          attempt4 = [min1_3, min2_3, stringOfTyparConstraints(denv_4, patternInput[1])];
        } else {
          attempt4 = null;
        }

        if (attempt4 == null) {
          const denv_5 = denv.SetOpenPaths(new List());
          const denv_6 = new DisplayEnv(true, denv_5.openTopPathsSorted, denv_5.openTopPathsRaw, denv_5.shortTypeNames, denv_5.suppressNestedTypes, denv_5.maxMembers, denv_5.showObsoleteMembers, denv_5.showHiddenMembers, denv_5.showTyparBinding, denv_5.showImperativeTyparAnnotations, denv_5.suppressInlineKeyword, denv_5.suppressMutableKeyword, denv_5.showMemberContainers, denv_5.shortConstraints, denv_5.useColonForReturnType, denv_5.showAttributes, denv_5.showOverrides, denv_5.showConstraintTyparAnnotations, denv_5.abbreviateAdditionalConstraints, denv_5.showTyparDefaultConstraints, denv_5.g, denv_5.contextAccessibility, denv_5.generatedValueLayout);

          const makeName = function (t) {
            const assemblyName = function (_arg1) {
              const $var72 = _arg1 == null ? [0] : _arg1 === "" ? [0] : [1];

              switch ($var72[0]) {
                case 0:
                  return "";

                case 1:
                  return toText(printf(" (%s)"))(_arg1);
              }
            }(PrintTypes.layoutAssemblyName(denv_6, t));

            return toText(printf("%s%s"))(stringOfTy(denv_6, t1_1), assemblyName);
          };

          return [makeName(t1_1), makeName(t2_1), stringOfTyparConstraints(denv_6, patternInput[1])];
        } else {
          return getValue(attempt4);
        }
      } else {
        return getValue(attempt3);
      }
    } else {
      return getValue(attempt2);
    }
  } else {
    return getValue(attempt1);
  }
}
export function minimalStringsOfTwoValues(denv, v1, v2) {
  const denvMin = new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, true, denv.suppressInlineKeyword, denv.suppressMutableKeyword, denv.showMemberContainers, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, false, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout);
  const min1 = bufs(function (buf) {
    outputQualifiedValOrMember(denvMin, buf, v1);
  });
  const min2 = bufs(function (buf_1) {
    outputQualifiedValOrMember(denvMin, buf_1, v2);
  });

  if (min1 !== min2) {
    return [min1, min2];
  } else {
    const denvMax = new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, true, denv.suppressInlineKeyword, denv.suppressMutableKeyword, denv.showMemberContainers, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, true, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout);
    const max1 = bufs(function (buf_2) {
      outputQualifiedValOrMember(denvMax, buf_2, v1);
    });
    const max2 = bufs(function (buf_3) {
      outputQualifiedValOrMember(denvMax, buf_3, v2);
    });
    return [max1, max2];
  }
}
export function minimalStringOfType(denv, ty) {
  const patternInput = PrettyTypes.PrettifyType(denv.g, ty);
  const denvMin = new DisplayEnv(denv.includeStaticParametersInTypeNames, denv.openTopPathsSorted, denv.openTopPathsRaw, denv.shortTypeNames, denv.suppressNestedTypes, denv.maxMembers, denv.showObsoleteMembers, denv.showHiddenMembers, denv.showTyparBinding, false, denv.suppressInlineKeyword, denv.suppressMutableKeyword, denv.showMemberContainers, denv.shortConstraints, denv.useColonForReturnType, denv.showAttributes, denv.showOverrides, false, denv.abbreviateAdditionalConstraints, denv.showTyparDefaultConstraints, denv.g, denv.contextAccessibility, denv.generatedValueLayout);
  return showL(PrintTypes.layoutTypeWithInfoAndPrec(denvMin, SimplifyTypes.typeSimplificationInfo0, 2, patternInput[0]));
}